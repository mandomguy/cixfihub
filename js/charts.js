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
    const appId = 2694490; // Path of Exile 2 App ID
    try {
        // Using a public CORS proxy to bypass CORS issues on client-side.
        // For a production environment, it is recommended to use your own backend proxy.
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const apiUrl = `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`;
        
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch Steam player count:", error);
        return null; // Return null to handle the error gracefully
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