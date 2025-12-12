const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

let cache = {};
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes

app.get('/api/classes', async (req, res) => {
  const league = req.query.league || 'abyss';

  const now = Date.now();
  if (cache[league] && now - cache[league].time < CACHE_TIME) {
    return res.json(cache[league].data);
  }

  try {
    const response = await axios.get('https://poe2.ninja/api/buildoverview', {
      params: { league, type: 'class' },
      timeout: 30000  // Increased to 30 seconds!
    });

    const cleaned = {
      league: response.data.league,
      totalCharacters: response.data.total,
      updatedAt: new Date().toISOString(),
      classes: response.data.classes.map(c => ({
        name: c.name,
        percentage: c.percentage + '%',
        rawPercentage: c.percentage,
        count: c.count,
        change: c.change,
        icon: c.icon
      })).sort((a, b) => b.rawPercentage - a.rawPercentage)
    };

    cache[league] = { data: cleaned, time: now };
    res.json(cleaned);
  } catch (err) {
    console.error('Error:', err.message);  // Logs the exact error
    res.status(500).json({ error: 'Failed to fetch from poe2.ninja', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send(`<h1>PoE2 Class Popularity API</h1>
    <p><a href="/api/classes">Current Abyss</a> | 
       <a href="/api/classes?league=dawn">Dawn</a> | 
       <a href="/api/classes?league=standard">Standard</a></p>`);
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});