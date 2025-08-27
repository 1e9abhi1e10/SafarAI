import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  return res.json({ token: 'mock-jwt-token' });
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  return res.status(201).json({ token: 'mock-jwt-token' });
});

app.post('/api/auth/continue', (_req, res) => {
  return res.json({ tempToken: 'mock-temp-token' });
});

// Geocoding proxy to avoid browser-side blocks
app.get('/api/geocode', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ message: 'Missing query param q' });
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;
    const { data } = await axios.get(url, {
      headers: { 'Accept-Language': 'en', 'User-Agent': 'tripmate-local' },
      timeout: 8000,
    });
    return res.json(data);
  } catch (e) {
    return res.status(502).json({ message: 'Geocoding failed', error: String(e) });
  }
});

app.post('/api/getPlaces', (req, res) => {
  const destinationCountry = req.body?.destinationCountry || 'delhi';
  const budget = String(req.body?.budget ?? '0');
  const budgetNum = Number(budget.replace(/[^0-9.]/g, '')) || 0;
  const cheap = budgetNum < 500;
  const mid = budgetNum >= 500 && budgetNum < 2000;
  const dinnerCost = cheap ? '$10' : mid ? '$25' : '$50';
  const cityTourCost = cheap ? '$0' : mid ? '$20' : '$40';
  const museumCost = cheap ? '$5' : mid ? '$10' : '$25';
  const arrivalCost = cheap ? '$0' : mid ? '$5' : '$10';
  const today = new Date();
  const format = (d) => d.toISOString().slice(0, 10);
  const days = Math.max(1, Number(req.body?.tripDuration) || 2);

  const buildDay = (i) => {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    return {
      day: i + 1,
      date: format(date),
      activities: [
        { activity: i === 0 ? 'Arrival and Check-in' : 'Sightseeing', time: '09:00', cost: i === 0 ? arrivalCost : cityTourCost, location: `${destinationCountry} city center` },
        { activity: 'Museum Visit', time: '11:00', cost: museumCost, location: `${destinationCountry} museum` },
        { activity: 'Local Cuisine Dinner', time: '19:00', cost: dinnerCost, location: `${destinationCountry} restaurant` }
      ],
      meals: [
        { mealType: 'Breakfast', restaurant: 'Hotel Buffet', cuisine: 'International', price: cheap ? '$0' : mid ? '$8' : '$15' },
        { mealType: 'Dinner', restaurant: 'Local Diner', cuisine: 'Indian', price: dinnerCost }
      ]
    };
  };
  const mockContent = JSON.stringify({
    destinationCountry,
    budget,
    startLocation: req.body?.startLocation || '',
    itinerary: Array.from({ length: days }, (_, i) => buildDay(i))
  });

  const response = {
    id: 'mock-completion',
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    model: 'mock-model',
    choices: [
      {
        index: 0,
        message: { role: 'assistant', content: mockContent },
        logprobs: null,
        finish_reason: 'stop'
      }
    ],
    usage: null,
    system_fingerprint: null,
    x_groq: null
  };

  return res.json(response);
});

// AI endpoints (mock)
app.post('/api/ai/plan', (req, res) => {
  const {
    startLocation = '',
    destinationCountry = '',
    startDate = '',
    endDate = '',
    budget = '',
    tripDuration = 2,
    travelStyle = '',
    interests = ''
  } = req.body || {};

  const budgetNum = Number(String(budget).replace(/[^0-9.]/g, '')) || 0;
  const tier = budgetNum < 500 ? 'budget' : budgetNum < 2000 ? 'mid' : 'premium';

  const pick = (obj) => obj[tier];

  const flightTemplates = {
    budget: {
      departWindow: 'Depart Tue–Thu 09:00–15:00',
      returnWindow: 'Return Mon–Wed 10:00–16:00'
    },
    mid: {
      departWindow: 'Depart Fri evening or Sat morning',
      returnWindow: 'Return Sun afternoon or Mon morning'
    },
    premium: {
      departWindow: 'Depart Sat–Sun morning non-stop',
      returnWindow: 'Return Sat–Sun afternoon non-stop'
    }
  };

  const hotelAreasCatalog = [
    { area: 'City Center', vibe: 'Walkable, historic', why: 'Close to landmarks and dining' },
    { area: 'Riverside/Waterfront', vibe: 'Scenic, relaxed', why: 'Evening strolls and cafes' },
    { area: 'Arts District', vibe: 'Trendy, nightlife', why: 'Bars, galleries, late-night food' },
  ];

  const themes = ['Arrival + Orientation', 'Iconic Sights', 'Neighborhood Walks', 'Museums + Culture', 'Parks + Views', 'Food Crawl', 'Shopping + Markets'];
  const numDays = Math.max(1, Number(tripDuration) || 2);
  const dayThemes = Array.from({ length: numDays }, (_, i) => ({
    day: i + 1,
    theme: themes[i % themes.length],
    highlights: [
      `Top spot #${(i % 3) + 1} in ${destinationCountry}`,
      `Local experience ${(i % 2) + 1}`
    ]
  }));

  const overview = `Trip from ${startLocation || 'your city'} to ${destinationCountry} for ${numDays} day(s) ${startDate && endDate ? `(${startDate} → ${endDate})` : ''}. Style: ${travelStyle || 'Mixed'}. Interests: ${interests || 'General'}. Budget tier: ${tier}.`;

  const tipsByTier = {
    budget: [
      'Use public transit day passes',
      'Book museum tickets online for discounts',
      'Choose neighborhood eateries over tourist zones'
    ],
    mid: [
      'Mix ride-hailing with metro for efficiency',
      'Prebook timed-entry attractions to skip lines',
      'Target 3–4km walking loops per day'
    ],
    premium: [
      'Prioritize non-stop flights and central hotels',
      'Private guides for 1–2 key days',
      'Book popular restaurants 2–3 weeks ahead'
    ]
  };

  const response = {
    overview,
    flightWindows: [
      { label: 'Suggested windows', ...pick(flightTemplates) }
    ],
    hotelAreas: hotelAreasCatalog,
    dayThemes,
    tips: tipsByTier[tier]
  };

  return res.json(response);
});

app.post('/api/ai/vendor-links', (req, res) => {
  const { startLocation = '', destinationCountry = '', startDate = '', endDate = '' } = req.body || {};
  const q = `${encodeURIComponent(startLocation)}-${encodeURIComponent(destinationCountry)}-${startDate}-${endDate}`;
  return res.json({
    flights: [
      { label: 'Google Flights', url: `https://www.google.com/travel/flights?hl=en#flt=${q}` },
      { label: 'Skyscanner', url: `https://www.skyscanner.net/transport/flights/${encodeURIComponent(startLocation)}/${encodeURIComponent(destinationCountry)}/${startDate}/${endDate}/` }
    ],
    hotels: [
      { label: 'Booking.com', url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destinationCountry)}&checkin=${startDate}&checkout=${endDate}` },
      { label: 'Airbnb', url: `https://www.airbnb.com/s/${encodeURIComponent(destinationCountry)}/homes?checkin=${startDate}&checkout=${endDate}` }
    ]
  });
});

// Convenience GET endpoints for browser checks
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'TripMate Mock API', routes: ['/api/*'] });
});

app.get('/api/auth/continue', (_req, res) => {
  res.json({ ok: true, hint: 'Use POST /api/auth/continue from the app' });
});

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}/api`);
});


