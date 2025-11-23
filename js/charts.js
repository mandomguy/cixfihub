// Steam API player count
async function getSteamPlayerCount() {
    try {
        // Use your own serverless function endpoint
        // In development: http://localhost:3000/api/steam-players
        // In production: https://cixfihubpoe2.vercel.app/api/steam-players
        const apiEndpoint = 'https://cixfipoe2.vercel.app/api/steam-players';
        
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