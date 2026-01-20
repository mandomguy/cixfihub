/** @format */

// api/steam-players.js
export default async function handler(req, res) {
  // Allow CORS for configured origin
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "";
  if (allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Steam Application ID for PoE 2
  const appId = 2694490;
  const corsProxy = "https://crossorigin.me/";
  const steamApiUrl = `${corsProxy}https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;

  try {
    const response = await fetch(steamApiUrl);
    if (!response.ok) throw new Error(`Steam API error: ${response.status}`);

    const data = await response.json();

    // Cache for 60 seconds
    console.error("Failed to fetch Steam player count:", error);
    res.status(200).json(data);
  } catch (error) {
    console.error("Steam API Fail:", error);
    res.status(500).json({ error: "Failed to fetch player count" });
  }
}
