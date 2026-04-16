
import { getFavorites } from "./utils.mjs";

import { createCountryCard } from "./templates.mjs";

function renderFavorites() {
  const favorites = getFavorites();
  const container = document.getElementById("favorites-grid");

  if (favorites.length === 0) {
    container.innerHTML = `
      <p class="empty-state">You haven't saved any countries yet.</p>
      <a href="browse.html" class="btn btn-primary">Browse Countries</a>
    `;
    return;
  }

  container.innerHTML = favorites.map(country => createCountryCard(country)).join('');
  
}

renderFavorites();