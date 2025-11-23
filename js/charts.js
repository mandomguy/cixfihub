// const appId = 2694490; // Path of Exile 2

// async function getSteamPlayerCount() {
//   try {
//     // Using a public CORS proxy - replace with your own backend in production
//     const proxyUrl = 'https://api.allorigins.win/raw?url=';
//     const apiUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;
    
//     const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     console.log('Steam API Response:', data);
    
//     if (data.response && data.response.player_count !== undefined) {
//       console.log(`Current players for app ${appId}:`, data.response.player_count);
//       // You can display this in your UI if needed
//       // Example: document.getElementById('playerCount').textContent = data.response.player_count;
//     }
    
//     return data;
//   } catch (error) {
//     console.error('Error fetching Steam data:', error.message);
//     // Fallback: show a message or use cached data
//   }
// }

// // Call the function when page loads
// getSteamPlayerCount();

// Steam API player count
async function getSteamPlayerCount() {
    try {
        // Use your own serverless function endpoint
        // In development: http://localhost:3000/api/steam-players
        // In production: https://your-domain.vercel.app/api/steam-players
        const apiEndpoint = '/api/steam-players';
        
        const response = await fetch(apiEndpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch Steam player count:", error);
        return null;
    }
}

// Fetch player count when the document is loaded and update the UI element
document.addEventListener('DOMContentLoaded', () => {
        getSteamPlayerCount().then(data => {
            if (data && data.response && data.response.player_count !== undefined) {
                currentPlayers.textContent = data.response.player_count.toLocaleString();
            } else {
                currentPlayers.textContent = 'N/A';
            }
        });
});