# TripMate
TripMate is an AI travel planner that helps you plan, visualize, and book trips.

Key capabilities:
- Personalized itineraries based on your inputs (city, dates, budget, interests)
- Cost-aware activity pricing and day-by-day schedules
- Interactive map with geocoding fallbacks (Google → Mapbox → OSM)
- AI vendor linking to propose flight windows and hotel areas
- One-click deep links to Google Flights, Skyscanner, Booking.com, Airbnb

## Features

- Personalized Itineraries: AI-tailored plans by dates, budget, and interests
- Cost-Saving Recommendations: Budget-aware activity suggestions
- Real-Time Visualization: Map view with markers and route polylines
- AI Vendor Linking: AI suggests flight time windows and hotel neighborhoods
- Book Flights & Hotels: Deep links to flight/hotel sites from your plan

## Project Structure (frontend + mock API)

Important folders:
- `src/` React app (Vite)
- `mock-api/` Local Express server with mock endpoints
- `services/api.js` Shared Axios client with auth header
- `src/pages/PlannerPage.jsx` Trip form + AI suggestions + vendor links
- `src/pages/TravelPage.jsx` Itinerary details + map

## Setup

1) Clone and install
```bash
git clone https://github.com/1e9abhi1e10/SafarAI.git
cd TripMate
npm install
```

2) Environment (.env)
```env
VITE_BASE_URL=http://localhost:9000/api
VITE_GOOGLE_MAP_API_KEY=
VITE_MAPBOX_TOKEN=
```

3) Run mock API and frontend
```bash
npm run api   # starts mock API at http://localhost:9000/api
npm run dev   # starts Vite at http://localhost:5173/
```

## Usage

## Usage

- Go to `http://localhost:5173/`
- Sign up or continue as guest
- Open `/new-trip`
- Fill start location, destination, dates, budget, interests
- Click “Ask AI & Vendor Links” for suggestions and booking links
- Click “Create New Trip” to generate itinerary and view the map

Notes
- Map routing starts from your entered start location
- If geocoding keys are missing or network is blocked, the app falls back to coarse city coordinates

## Tech

- React 18 + Vite
- Tailwind + shadcn/ui components
- Axios with auth interceptor
- Google Maps JS API (optional), Mapbox (optional), Leaflet/OSM fallback
- Express mock API (auth, itinerary, geocode proxy, AI suggestions, vendor links)

## Contributing

Contributions to **TripMate** are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request on GitHub.

Please ensure your code adheres to the existing style and includes appropriate tests.

## License

**TripMate** is licensed under the MIT License. See the [LICENSE](https://github.com/1e9abhi1e10/SafarAI/blob/master/LICENSE) file for more details.

## Acknowledgements

- **Gemini Model**: For providing advanced AI capabilities for travel planning.
- **Streamlit**: For creating a user-friendly web interface.
- **Google Generative AI**: For enabling generative models that power the application.
