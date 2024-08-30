import logging
from cohere_model import CohereModel

def get_user_inputs():
    """Collect user inputs for travel preferences."""
    inputs = {
        'locations': input("Enter the locations you want to travel to (you can specify multiple locations): "),
        'nights': input("How many nights will you be staying? "),
        'accommodations': input("Would you prefer high-end or budget accommodations? "),
        'type': input("Are you looking for an adventure-filled trip or a more relaxed experience? "),
        'group_size': input("How many people are in your travel group? ")
    }
    return inputs

def generate_itinerary(cohere_model, responses):
    """Generate an itinerary based on user responses."""
    prompt = cohere_model.create_prompt(responses)
    logging.debug(f"Generated prompt: {prompt}")

    try:
        itinerary = cohere_model.generate_itinerary(prompt)
        return itinerary
    except Exception as e:
        logging.error(f"Error generating itinerary: {e}")
        return None

def main():
    # Set up logging
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

    # Initialize Cohere model
    api_key = 'AIzaSyCX9FaRwZUQxLk32gdrP9wyW0Lx3N0Xdn4'  # Replace with your actual API key
    cohere_model = CohereModel(api_key)

    # Collect user inputs
    responses = get_user_inputs()
    logging.debug(f"Responses collected: {responses}")

    # Generate itinerary
    itinerary = generate_itinerary(cohere_model, responses)
    
    if itinerary:
        print("Generated Itinerary:")
        print(itinerary)
        logging.info("Itinerary displayed successfully.")
    else:
        print("An error occurred while generating the itinerary. Please try again.")

if __name__ == "__main__":
    main()
