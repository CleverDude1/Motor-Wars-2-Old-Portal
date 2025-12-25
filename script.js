const API_URL = 'https://YOURDOMAIN.serv00.com/api/players.php';

async function loadPlayers() {
  try {
    const response = await fetch(API_URL);
    const players = await response.json();

    const tbody = document.getElementById('playerTableBody');
    tbody.innerHTML = ''; // Clear existing rows

    players.forEach((player, index) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.country || 'N/A'}</td>
        <td>${player.username}</td>
        <td>${player.xp}</td>
        <td>${player.join_date}</td>
        <td>${player.last_online}</td>
        <td>${player.clan || '-'}</td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error('Error loading players:', err);
  }
}

// Load players when the page loads
window.addEventListener('DOMContentLoaded', loadPlayers);
