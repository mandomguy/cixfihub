// Serverless function to proxy Steam API requests
export default async function handler(req, res) {
  // Set CORS headers to allow requests from your domain
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change '*' to your domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only GET
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const appId = 2694490; // Path of Exile 2
  const steamApiUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;

  try {
    const response = await fetch(steamApiUrl);
    
    if (!response.ok) {
      throw new Error(`Steam API error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Cache the response for 5 minutes to reduce API calls
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching Steam data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch Steam player count',
      message: error.message 
    });
  }
}
