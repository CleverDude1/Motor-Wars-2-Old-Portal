const API_URL = 'https://mainserver.serv00.net/API/players.php';

// Map API fields to the frontend table columns
function mapPlayerData(player) {
  return {
    country: player.country || 'N/A',
    username: player.nickname || 'Unknown',        // GitHub "Player" column
    xp: player.honor_points || 0,                  // GitHub "Xp" column
    join_date: player['registration date'] || 'N/A', // GitHub "Join Date"
    last_online: player['last login'] || 'N/A',      // GitHub "Last Online"
    clan: player.clan || '-'                        // No API field, default to "-"
  };
}

async function loadPlayers() {
  try {
    const response = await fetch(API_URL);
    const playersRaw = await response.json();

    const tbody = document.getElementById('playerTableBody');
    tbody.innerHTML = ''; // Clear existing rows

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
    const tbody = document.getElementById('playerTableBody');
    tbody.innerHTML = '<tr><td colspan="7">Failed to load player data.</td></tr>';
  }
}

// Load players when the page loads
window.addEventListener('DOMContentLoaded', loadPlayers);
