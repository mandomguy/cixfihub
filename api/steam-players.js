// api/steam-players.js
export default async function handler(req, res) {
  // Allow simple CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Steam Application ID for PoE 2
  const appId = 2694490; 
  const steamApiUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;

  try {
    const response = await fetch(steamApiUrl);
    if (!response.ok) throw new Error(`Steam API error: ${response.status}`);
    
    const data = await response.json();
    
    // Cache for 60 seconds
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error('Steam API Fail:', error);
    res.status(500).json({ error: 'Failed to fetch player count' });
  }
}