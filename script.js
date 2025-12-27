const API_URL = 'https://mainserver.serv00.net/API/players.php';

// Map API fields to the frontend table columns
function mapPlayerData(player) {
  return {
    country: player.country || 'N/A',
    username: player.nickname || 'Unknown',           // Player
    xp: Number(player.honor_points) || 0,             // XP / Honor Points
    join_date: player.registration_date || 'N/A',     // Join Date
    last_online: player.last_login || 'N/A',           // Last Online
    clan: player.clan || '-'                           // Clan
  };
}

async function loadPlayers() {
  try {
    const response = await fetch(API_URL);
    let playersRaw = await response.json();

    // 🔥 SORT BY XP (HIGHEST FIRST)
    playersRaw.sort((a, b) => {
      const xpA = Number(a.honor_points) || 0;
      const xpB = Number(b.honor_points) || 0;
      return xpB - xpA;
    });

    const tbody = document.getElementById('playerTableBody');
    tbody.innerHTML = '';

    playersRaw.forEach((playerRaw, index) => {
      const player = mapPlayerData(playerRaw);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.country}</td>
        <td>${player.username}</td>
        <td>${player.xp}</td>
        <td>${player.join_date}</td>
        <td>${player.last_online}</td>
        <td>${player.clan}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error('Error loading players:', err);
    document.getElementById('playerTableBody').innerHTML =
      '<tr><td colspan="7">Failed to load player data.</td></tr>';
  }
}

// Load players when the page loads
window.addEventListener('DOMContentLoaded', loadPlayers);
