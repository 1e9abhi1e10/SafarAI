import streamlit as st
from gemini_model import GeminiModel
from fpdf import FPDF
import datetime

# CSS Styling
def apply_custom_css():
    st.markdown(
        """
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;600&display=swap');

        body {
            font-family: 'Overpass', sans-serif;
            background-color: #D3BCE3;
            color: #FFD700;
        }
        .title {
            font-size: 2.5em;
            color: #FFD700;
            text-align: center;
        }
        .subtitle {
            font-size: 1.5em;
            background: linear-gradient(90deg, #FFDD00 0%, #FFEA70 100%);
            -webkit-background-clip: text;
            color: transparent;
            text-align: left;
            margin-bottom: 20px;
        }
        .container {
            padding: 20px;
            border-radius: 10px;
            background-color: #FFEA70;
        }
        .stButton>button {
            background: linear-gradient(90deg, #FFC300 0%, #FFDD00 100%) !important;
            border: none;
            color: white;
            padding: 10px 20px;
            text-align: center;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 8px;
        }
        .itinerary {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            color: #2B2D42;
        }
        .itinerary h3 {
            color: #FFD700;
        }
        .itinerary h4 {
            color: #6A0DAD;
        }
        .itinerary p {
            font-style: italic;
        }
        .question {
            font-size: 1.3em;
            color: #FFD700;
        }
        .question-input {
            font-size: 0.9em;
            padding: 10px;
        }
        .input-blink {
            animation: blink 1s step-end 3;
        }
        @keyframes blink {
            50% {
                border-color: #FF0000;
            }
        }
        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #6A0DAD;
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
        }
        </style>
        """,
        unsafe_allow_html=True
    )

# Function to initialize session state
def initialize_session_state():
    if 'responses' not in st.session_state:
        st.session_state['responses'] = {}
    if 'page' not in st.session_state:
        st.session_state['page'] = 0
    if 'itinerary' not in st.session_state:
        st.session_state['itinerary'] = ""
    if 'invalid_msg' not in st.session_state:
        st.session_state['invalid_msg'] = ""

# Function to generate PDF
def generate_pdf(itinerary_text, logo_path):
    itinerary_text = itinerary_text.replace('\u2013', '-').replace('\u2014', '--')
    subtitle = "\n\nNote: This itinerary is AI-generated and may be subject to change."
    complete_text = itinerary_text + subtitle

    class PDF(FPDF):
        def header(self):
            self.image(logo_path, 10, 8, 33)
            self.set_font("Arial", 'B', 12)
            self.cell(0, 10, 'Itinerary', ln=True, align='C')
            self.ln(20)

    pdf = PDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, complete_text.encode('latin-1', 'replace').decode('latin-1'))
    
    return pdf.output(dest='S').encode('latin-1')

# Function to format itinerary
def format_itinerary(itinerary):
    days = itinerary.split('##')
    formatted_itinerary = ""
    for day in days:
        if day.strip():
            formatted_itinerary += f"<div class='itinerary'>{day.strip()}</div>"
    formatted_itinerary += "<div class='itinerary'><p><em>Note: This itinerary is AI-generated and may be subject to change.</em></p></div>"
    return formatted_itinerary

# Function to handle the form and page navigation
def handle_form_navigation(questions):
    if st.session_state.page < len(questions):
        question, key, input_type = questions[st.session_state.page]

        with st.form(key=f'form_{st.session_state.page}'):
            st.markdown(f'<div class="question">{question}</div>', unsafe_allow_html=True)
            response = st.date_input("", key=key, label_visibility="collapsed") if input_type == "date" else st.text_input("", key=key, label_visibility="collapsed")

            if st.session_state['invalid_msg']:
                st.markdown(f'<div style="color: red; font-weight: bold;">{st.session_state["invalid_msg"]}</div>', unsafe_allow_html=True)

            next_clicked = st.form_submit_button('Next')

            if next_clicked:
                if response:
                    st.session_state.responses[key] = response
                    st.session_state.page += 1
                    st.session_state['invalid_msg'] = ""
                    st.experimental_rerun()
                else:
                    st.session_state['invalid_msg'] = "This field is required! Please enter a valid response."
                    st.experimental_rerun()
    else:
        display_itinerary()

# Function to display the itinerary
def display_itinerary():
    st.write("Thank you for sharing the details! I'm now crafting the perfect, most realistic itinerary just for you...")
    responses = st.session_state.responses
    prompt = gemini_model.create_prompt(responses)
    st.session_state.itinerary = gemini_model.generate_itinerary(prompt)

    if st.session_state.itinerary:
        formatted_itinerary = format_itinerary(st.session_state.itinerary)
        st.markdown(f'<div class="itinerary"><h4>Itinerary for {responses["locations"]}, {int(responses["nights"])+1} days</h4>{formatted_itinerary}</div>', unsafe_allow_html=True)

        pdf_content = generate_pdf(st.session_state.itinerary, "logo/logo.png")
        st.download_button(
            label="Download Itinerary as PDF",
            data=pdf_content,
            file_name=f"itinerary_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf",
            mime="application/pdf"
        )
    else:
        st.error("There was an issue generating the itinerary. Please try again.")

# Main app structure
def main():
    apply_custom_css()
    initialize_session_state()

    st.image("logo/safar.ai.png", use_column_width=False, width=75)
    st.markdown('<div class="subtitle">&#127760;✨ Let AI design your dream adventure in seconds!</div>', unsafe_allow_html=True)

    with st.expander("Instructions"):
        st.write("""
        1. Enter the travel destination.
        2. Enter the starting location.
        3. Enter the start date.
        4. Enter the number of nights.
        5. Select the type of accommodation.
        6. Specify the type of trip.
        7. Enter the group size.
        """)

    questions = [
        ("Where do you want to travel in the World? (You can enter multiple locations.)", 'locations', 'text'),
        ("What is your starting location?", 'starting_location', 'text'),
        ("When does your trip start?", 'start_date', 'date'),
        ("How many nights will you be traveling?", 'nights', 'text'),
        ("Do you prefer high-end or economy accommodations?", 'accommodations', 'text'),
        ("Would you like the trip to be adventure-centric or laid-back?", 'type', 'text'),
        ("How many people are in your group?", 'group_size', 'text')
    ]

    handle_form_navigation(questions)

    if st.session_state.page > 0 and st.session_state.page < len(questions):
        if st.button('Previous'):
            st.session_state.page -= 1
            st.session_state['invalid_msg'] = ""
            st.experimental_rerun()

st.markdown('<div class="footer">All rights reserved | Created by Abhishek 😊</div>', unsafe_allow_html=True)


if __name__ == "__main__":
    main()
