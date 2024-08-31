import streamlit as st
from gemini_model import GeminiModel  # Placeholder for the actual import
from fpdf import FPDF
import datetime

# Custom CSS for the design system
st.markdown(
    """
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;600&display=swap');
    [data-testid="stSidebar"] {
        background-color: var(--primary-color) !important;
    }

    body {
        font-family: 'Overpass', sans-serif;
    }

    .title {
        font-size: 2.5em;
        color: #0000FF;
        text-align: center;
    }

    .subtitle {
        font-size: 1.5em;
        background: linear-gradient(90deg, #FFD700 0%, #0000FF 10%);
        -webkit-background-clip: text;
        color: transparent;
        text-align: left;
        margin-bottom: 20px;
    }

    .container {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        background-color: #990000 !important; /* White background color */
    }

    /* For regular buttons */
    .stButton>button, .stForm button[type="submit"] {
        background-image: linear-gradient(to right, #E55D87 0%, #5FC3E4 51%, #E55D87 100%) !important;
        background-size: 200% auto !important;
        border: none !important;
        color: white !important;
        padding: 15px 45px !important;
        text-align: center !important;
        text-transform: uppercase !important;
        transition: 0.5s !important;
        border-radius: 10px !important;
        display: block !important;
        box-shadow: 0 0 20px #eee !important;
        margin: 10px !important;
    }

    /* For hovered buttons */
    .stButton>button:hover, .stForm button[type="submit"]:hover {
        background-position: right center !important;
        color: #fff !important;
        text-decoration: none !important;
    }

    .stDownloadButton>button {
        background-image: linear-gradient(to right, #1FA2FF 0%, #12D8FA 51%, #1FA2FF 100%);
        border: none;
        color: white;
        padding: 15px 45px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        box-shadow: 0 0 20px #eee;
        border-radius: 10px;
        display: block;
        font-size: 16px;
        margin: 10px;
        cursor: pointer;
    }

    .itinerary {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        color: #2B2D42;
    }

    .itinerary h3 {
        color: #FA3E01;
    }

    .itinerary h4 {
        color: #1B435A;
    }

    .itinerary p {
        font-style: italic;
    }

    .question {
        font-size: 1.3em;
        color: #990000;
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

    .error {
        border: 2px solid red;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# Display the logo
st.image("logo/safar.ai.png", use_column_width=False, width=105)

# Title and Subtitle
st.markdown('<div class="subtitle">✨Let AI design your dream adventure in seconds!</div>', unsafe_allow_html=True)

# Instructions
with st.expander("Instructions"):
    st.write("""
    1. Enter the starting location.
    2. Enter the travel destination.
    3. Provide the starting date.
    4. Provide the number of nights.
    5. Specify the trip type.
    6. Enter the group size.
    7. Provide budget for the trip.
    8. Provide any special considerations.
    """)

placeholder = st.empty()

# Initialize session state
if 'checklist' not in st.session_state:
    st.session_state['checklist'] = ""

gemini_model = GeminiModel()

# Function to infer season based on date
def infer_season(date):
    if date.month in [12, 1, 2]:
        return "Winter"
    elif date.month in [3, 4, 5]:
        return "Spring"
    elif date.month in [6, 7, 8]:
        return "Summer"
    elif date.month in [9, 10, 11]:
        return "Autumn"

# Generate PDF
def generate_pdf(checklist_text, logo_path):
    # Replace unsupported characters with alternatives
    checklist_text = checklist_text.replace('\u2013', '-').replace('\u2014', '--')

    subtitle = "\n\nNote: This checklist is AI-generated and may be subject to change."
    complete_text = checklist_text + subtitle
    
    class PDF(FPDF):
        def header(self):
            self.image(logo_path, 10, 8, 33)  # Adjust the position and size as needed
            self.set_font("Arial", 'B', 12)
            self.cell(0, 10, 'Itinerary', ln=True, align='C')
            self.ln(20)
    
    pdf = PDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, complete_text.encode('latin-1', 'replace').decode('latin-1'))
    
    return pdf.output(dest='S').encode('latin-1')

def format_checklist(checklist):
    # Splitting the generated checklist by lines and reformatting it as HTML
    items = checklist.split('##')
    formatted_checklist = ""
    for item in items:
        if item.strip():
            formatted_checklist += f"<div class='itinerary'>{item.strip()}</div>"
    formatted_checklist += "<div class='itinerary'><p><em>Note: This checklist is AI-generated and may be subject to change.</em></p></div>"
    return formatted_checklist

# Function to make a field blink red
def blink_field(field_key):
    js_code = f"""
    <script>
    var field = document.querySelectorAll('[key="{field_key}"]');
    if (field.length > 0) {{
        for (var i = 0; i < 3; i++) {{
            setTimeout(function() {{ field[0].classList.add('error'); }}, i * 300);
            setTimeout(function() {{ field[0].classList.remove('error'); }}, i * 600 + 300);
        }}
    }}
    </script>
    """
    st.markdown(js_code, unsafe_allow_html=True)

# Only show the form if the checklist hasn't been generated
if not st.session_state['checklist']:
    with placeholder.form(key='travel_form'):
        st.markdown('<div class="question">Where are you starting your trip from?</div>', unsafe_allow_html=True)
        starting_location = st.text_input("", key="starting_location", label_visibility="hidden")

        st.markdown('<div class="question">What is your travel destination? (You can specify multiple locations.)</div>', unsafe_allow_html=True)
        destination = st.text_input("", key="destination", label_visibility="hidden")

        st.markdown('<div class="question">When will your trip begin?</div>', unsafe_allow_html=True)
        start_date = st.date_input("", key="start_date", label_visibility="hidden")

        st.markdown('<div class="question">How many nights will your stay be?</div>', unsafe_allow_html=True)
        nights = st.number_input("", key="nights", label_visibility="hidden", min_value=1)

        st.markdown('<div class="question">What kind of trip are you planning?</div>', unsafe_allow_html=True)
        trip_type = st.selectbox("", ["Adventure", "Leisure", "Family", "Business"], key="trip_type", label_visibility="hidden")

        st.markdown('<div class="question">How many people will be traveling with you?</div>', unsafe_allow_html=True)
        group_size = st.number_input("", key="group_size", label_visibility="hidden", min_value=1)

        st.markdown('<div class="question">What is your budget for this trip (in USD)?</div>', unsafe_allow_html=True)
        budget = st.number_input("", key="budget", label_visibility="hidden", min_value=0)

        st.markdown('<div class="question">Do you have any special considerations for your trip?</div>', unsafe_allow_html=True)
        special_considerations = st.selectbox("", [
            "None",
            "I have a child with me",
            "I have a motor disability",
            "I have dietary restrictions (e.g., vegetarian, halal, gluten-free)",
            "I require wheelchair access",
            "I need medical assistance (e.g., carrying medications, first aid)",
            "I prefer low-altitude destinations",
            "I am traveling with a pet",
            "I have a fear of heights",
            "I prefer shorter walking distances",
            "I need quiet or noise-sensitive environments"
        ], key="special_considerations", label_visibility="hidden")

        submit_button = st.form_submit_button(label='Generate Checklist')

    if submit_button:
        # Check for missing fields
        missing_fields = [
            key for key in ["starting_location", "destination", "start_date", "nights", "trip_type", "group_size", "budget", "special_considerations"]
            if not st.session_state.get(key)
        ]

        if missing_fields:
            for field_key in missing_fields:
                blink_field(field_key)
            st.error("Please fill out all fields before submitting.")
        else:
            # Process form data
            responses = {
                "starting_location": starting_location,
                "destination": destination,
                "start_date": start_date,
                "nights": nights,
                "trip_type": trip_type,
                "group_size": group_size,
                "budget": budget,
                "special_considerations": special_considerations
            }
            st.session_state['responses'] = responses

            # Calculate the number of days based on start date and nights
            start_date = responses['start_date']
            nights = int(responses['nights'])
            end_date = start_date + datetime.timedelta(days=nights)

            # Infer season
            season = infer_season(start_date)

            # Generate the prompt based on user input
            prompt = (
                f"Starting from {responses['starting_location']}, generate a travel itinerary for a "
                f"{nights}-night {trip_type.lower()} trip to {destination} starting on {start_date}. "
                f"The group size is {group_size} with a budget of {budget} USD. It's {season}. Special considerations: {special_considerations}."
            )
            try:
                st.session_state['checklist'] = gemini_model.generate_checklist(prompt)
                placeholder.empty()
            except Exception as e:
                st.error("Error generating the checklist. Please try again later.")
                st.error(str(e))


# If a checklist has been generated, display and offer to download it as a PDF
if st.session_state['checklist']:
    formatted_checklist = format_checklist(st.session_state['checklist'])
    st.markdown(formatted_checklist, unsafe_allow_html=True)
    download_button = st.download_button(
        label="Download Itinerary as PDF",
        data=generate_pdf(st.session_state['checklist'], "logo/safar.ai.png"),
        file_name="itinerary.pdf",
        mime="application/pdf"
    )
    # Button to plan a new trip
    if st.button("Plan New Trip"):
        st.session_state['checklist'] = ""
        st.rerun()

# Footer with acknowledgment
st.markdown('<div class="footer">All rights reserved | Made with ❤️ by Abhishek</div>', unsafe_allow_html=True)