import logging
import os
import google.generativeai as genai

class GeminiModel:
    def __init__(self):
        self.api_key = 'AIzaSyCX9FaRwZUQxLk32gdrP9wyW0Lx3N0Xdn4'
        
        if not self.api_key:
            raise ValueError("API key not found. Please set the GEMINI_API_KEY environment variable.")
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
        logging.info("GeminiModel initialized.")

    def create_prompt(self, responses):
        logging.debug(f"Creating prompt with responses: {responses}")
        prompt = (
            "You are a seasoned travel consultant with expertise in crafting detailed itineraries for trips in the World. "
            "Based on the provided details, generate a comprehensive and realistic itinerary including travel times, routes, local events, and national holidays. "
            "The itinerary should be practical and enjoyable. Here are the details:\n"
            f"**Locations**: {responses['locations']}\n"
            f"**Starting Location**: {responses['starting_location']}\n"
            f"**Starting Date**: {responses['start_date']}\n"
            f"**Number of Nights**: {responses['nights']}\n"
            f"**Accommodation Type**: {responses['accommodations']}\n"
            f"**Trip Type**: {responses['type']} (Adventure or Laid-back)\n"
            f"**Group Size**: {responses['group_size']}\n"
            "Ensure the itinerary includes the following:\n"
            "1. **Routes and Travel Times**:\n"
            "   - If travel time by road exceeds 12 hours or road conditions are challenging (e.g., during monsoon season), suggest flight options as a practical alternative.\n"
            "   - Use major highways and feasible routes between destinations.\n"
            "   - Calculate realistic travel times, avoiding impractical routes (e.g., mountain roads unless necessary).\n"
            "2. **Daily Activities**:\n"
            "   - Provide detailed daily activities and sightseeing spots.\n"
            "3. **Accommodation**:\n"
            "   - Include accommodation details for each night.\n"
            "4. **Local Events and Festivals**:\n"
            "   - Highlight local events or festivals during the trip dates and their impact on travel plans.\n"
            "5. **Transportation**:\n"
            "   - Specify transportation details between locations, including travel times and routes. For flight options, include flight details, schedules, and alternative ground transportation as needed.\n"
            "6. **Dining Options**:\n"
            "   - Recommend local cuisine and dining options at each stop.\n"
            "7. **Road Conditions**:\n"
            "   - Consider road conditions and possible delays to ensure a smooth travel experience. Suggest flights when road conditions are unfavorable, such as during the monsoon season.\n"
            "Remember to balance the activities with some leisure time, especially for laid-back trips. Ensure the itinerary is both practical and enjoyable."
        )


        logging.debug(f"Prompt created: {prompt}")
        return prompt

    def generate(self, prompt):
        logging.debug(f"Generating itinerary with prompt: {prompt}")
        try:
            response = self.model.generate_content(prompt)
            generated_text = response.text
            logging.info("🗺️Itinerary generated successfully🎉🎉.")
            logging.debug(f"Model response: {generated_text}")

            # Check if the generated text is the same as the prompt and use a fallback if necessary
            if generated_text.strip() == prompt.strip():
                generated_text = (
                    "Oooops! Looks like we've reached our daily limit of giving out free itineraries."
                )
            return generated_text
        except Exception as e:
            logging.error(f"Error generating itinerary: {e}")
            raise
    def create_checklist_prompt(self, responses, num_days, inferred_season):
        logging.debug(f"Creating prompt with responses: {responses}, num_days: {num_days}, inferred_season: {inferred_season}")
        prompt = (
                "You are an experienced travel consultant specialized in creating comprehensive travel checklists for trips in this world. Based on the provided details, generate a detailed and practical checklist for the traveler. The checklist should include essential items to pack, travel documents, health & safety tips, and other recommended items based on the location, season, and trip duration."
            "Here are the details:\n"
            f"**Location**: {responses['location']}\n"
            f"**Destination**: {responses['destination']}\n"
            f"**Start Date**: {responses['start_date']}\n"
            f"**Number of Nights**: {responses['nights']}\n"
            f"**Number of Days**: {num_days}\n"
            f"**Inferred Season**: {inferred_season}\n"
            f"**Trip Type**: {responses['trip_type']} (Adventure or Leisure)\n"
            f"**Group Size**: {responses['group_size']}\n"
            f"**Budget**: {responses['budget']}\n"
            f"**Special Considerations**: {responses['special_considerations']}\n"
            "Ensure the checklist covers the following:\n"
            "1. **Packing List**: Include items specific to the season and activities planned.\n"
            "2. **Travel Documents**: List essential documents needed for the trip.\n"
            "3. **Health & Safety**: Provide health and safety recommendations based on the location and season.\n"
            "4. **Activity Essentials**: Recommend items necessary for the specific activities mentioned.\n"
            "5. **Miscellaneous**: Include any additional items that may be useful for the trip.\n"
            "Ensure the checklist is tailored to the specific needs and preferences of the traveler."
        )

        logging.debug(f"Prompt created: {prompt}")
        return prompt

    def generate_checklist(self, prompt):
        logging.debug(f"Generating checklist with prompt: {prompt}")
        try:
            response = self.model.generate_content(prompt)
            generated_text = response.text
            logging.info("Checklist generated successfully.")
            logging.debug(f"Model response: {generated_text}")

            # Check if the generated text is the same as the prompt and use a fallback if necessary
            if generated_text.strip() == prompt.strip():
                generated_text = (
                    "Oops! It seems we've reached our daily limit for generating checklists."
                )
            return generated_text
        except Exception as e:
            logging.error(f"Error generating checklist: {e}")
            raise
