# SafarAI
This is the Atlan Engineering Fellowship Task - 2024:
SafarAI: Personalized Travel Itinerary Generator.
### Visit the currently deployed version [**here**](https://safar-ai.streamlit.app/)

![atlan-gif](https://github.com/user-attachments/assets/956e33bc-8bee-43d8-b19a-ac5f3cc0915c)

**SafarAI** is a travel planning application designed to generate detailed itineraries and travel checklists using advanced AI models. The application uses the Gemini model from Google Generative AI to create practical and enjoyable travel plans based on user inputs.

## Features

- **Itinerary Generation**: Create comprehensive travel itineraries, including routes, daily activities, accommodation details, local events, and more.
- **Travel Checklist**: Generate detailed checklists covering essential items to pack, travel documents, health & safety tips, and activity-specific items.
- **Customizable Prompts**: Tailor prompts to generate itineraries and checklists according to various travel preferences and requirements.
- **Streamlit Web Application**: A user-friendly interface for generating and downloading travel itineraries and checklists.

## Project Structure

```
SafarAI/
│
├── gemini_travel.py        # Contains the GeminiModel class for generating itineraries and checklists
├── safarAI.py             # Streamlit application for user interaction
├── requirements.txt       # Dependencies for the project
└── README.md              # This file
```

## Setup and Installation

To get started with **SafarAI**, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/1e9abhi1e10/SafarAI.git
    cd SafarAI
    ```

2. **Install Dependencies**:
    Ensure you have Python 3.7 or later installed. Then, create a virtual environment and install the required packages.
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory and add your Gemini API key.
    ```plaintext
    GEMINI_API_KEY=your_api_key_here
    ```

## Usage

### Using the Streamlit Web Application

1. **Run the Application**:
    ```bash
    streamlit run safarAI.py
    ```

2. **Access the Web Interface**:
    Open your browser and navigate to `http://localhost:8501` to interact with the Streamlit application.

3. **Generate Itineraries and Checklists**:
    - Fill in the form with travel details.
    - Submit the form to generate itineraries or checklists.
    - Download the results as a PDF for your trip planning.

### Instructions

With the **Instructions** expander in the web application:

1. Enter the starting location.
2. Enter the travel destination.
3. Provide the starting date.
4. Provide the number of nights.
5. Specify the trip type.
6. Enter the group size.
7. Provide the budget for the trip.
8. Provide any special considerations.

## Example Output

### Here is the output for the 2-Night Mumbai Adventure on a Budget $500 (August 31st, 2024)

![image](https://github.com/user-attachments/assets/84647d5d-4ecc-4427-8749-3c32b5f0634b)

## Contributing

Contributions to **SafarAI** are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request on GitHub.

Please ensure your code adheres to the existing style and includes appropriate tests.

## License

**SafarAI** is licensed under the MIT License. See the [LICENSE](https://github.com/1e9abhi1e10/SafarAI/blob/master/LICENSE) file for more details.

## Acknowledgements

- **Gemini Model**: For providing advanced AI capabilities for travel planning.
- **Streamlit**: For creating a user-friendly web interface.
- **Google Generative AI**: For enabling generative models that power the application.
