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
      headers: { 'Accept-Language': 'en', 'User-Agent': 'safarai-local' },
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

app.listen(PORT, () => {
  console.log(`Mock API running on http://localhost:${PORT}/api`);
});


