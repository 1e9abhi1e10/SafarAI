# SafarAI
Visit the currently deployed version

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
├── gemini_model.py        # Contains the GeminiModel class for generating itineraries and checklists
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

### 6-Night Adventure Trip to Indore from Paris: Summer 2024

**Day 1: August 31st - Paris to Indore (Arrival and Orientation)**

* **Morning:** Depart from Paris Charles de Gaulle Airport (CDG) on a flight to Indore's Devi Ahilya Bai Holkar Airport (IDR).
* **Afternoon:** Upon arrival, settle into your hotel in Indore. Consider a hotel near the central Rajwada area for easy access to sightseeing.
* **Evening:** Take a walk around the bustling Rajwada Market, exploring local shops and experiencing the vibrant atmosphere. Enjoy dinner at one of the many restaurants serving authentic Indian cuisine.

**Day 2: September 1st - Indore's Heritage and Culture**

* **Morning:** Start your day by visiting the majestic Rajwada Palace, a historical marvel showcasing the rich heritage of the Holkar dynasty.
* **Afternoon:** Explore the Khajrana Ganesh Temple, a revered Hindu temple dedicated to Lord Ganesha.
* **Evening:** Indulge in a traditional Indian street food experience at Sarafa Bazaar, known for its delicious snacks and vibrant atmosphere.

**Day 3: September 2nd - The Beauty of Kanha National Park**

* **Morning:** Embark on a day trip to Kanha National Park, a renowned wildlife sanctuary known for its diverse flora and fauna.
* **Afternoon:** Enjoy a jeep safari within the park, witnessing tigers, leopards, deer, and various bird species in their natural habitat.
* **Evening:** Return to Indore and enjoy a peaceful evening at your hotel.

**Day 4: September 3rd - Spirituality and History**

* **Morning:** Visit the serene Jain temple of Shri Digambar Jain Lal Mandir, known for its intricate carvings and peaceful ambience.
* **Afternoon:** Explore the Indore Museum, showcasing a collection of artifacts and exhibits related to the city's history and culture.
* **Evening:** Experience a traditional Indian dance performance at a cultural center in the city.

**Day 5: September 4th - Local Experiences**

* **Morning:** Learn the art of traditional Indian cooking with a hands-on cooking class at a local home.
* **Afternoon:** Visit the vibrant Central Market, known for its lively atmosphere and variety of products.
* **Evening:** Relax and enjoy a delicious dinner at a rooftop restaurant offering panoramic views of the city.

**Day 6: September 5th - Departure**

* **Morning:** Enjoy a leisurely breakfast at your hotel.
* **Afternoon:** Transfer to the airport for your flight back to Paris.

**Notes:**

* This itinerary can be customized based on your individual interests and preferences.
* Be sure to book accommodations and transportation in advance, especially during peak season.
* Pack light and comfortable clothing suitable for the warm Indian climate.
* Always carry a water bottle and stay hydrated, especially during outdoor activities.
* Learn basic Hindi phrases for easier communication with locals.

**Enjoy your adventurous journey to Indore!**

Note: This checklist is AI-generated and may be subject to change.

## Contributing

Contributions to **SafarAI** are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request on GitHub.

Please ensure your code adheres to the existing style and includes appropriate tests.

## License

**SafarAI** is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- **Gemini Model**: For providing advanced AI capabilities for travel planning.
- **Streamlit**: For creating a user-friendly web interface.
- **Google Generative AI**: For enabling generative models that power the application.
