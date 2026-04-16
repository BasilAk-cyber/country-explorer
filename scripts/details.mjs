import { detailsPageTemplate } from "./templates.mjs";
import { fetchCountryByCode } from "./utils.mjs";
<<<<<<< HEAD
import { isCountrySaved } from "./favourite.mjs";   // ← Add this
=======
import { isCountrySaved } from "./favorites.mjs";   // ← Add this
>>>>>>> f55fc903da51c8dde8a5e76b726af9fe66da15dc

async function loadDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) {
    window.location.href = "browse.html";
    return;
  }

  const country = await fetchCountryByCode(code);
  
  const isSaved = isCountrySaved(code);

  document.querySelector(".detail-layout").innerHTML = detailsPageTemplate({
    ...country,
    isSaved: isSaved,        // ← Pass real value
    weather: null,
  });

  // Attach event listener AFTER the template is rendered
  setupSaveButton(code, country);
}

function setupSaveButton(code, countryData) {
  const saveBtn = document.getElementById("saveBtn");
  if (!saveBtn) return;

  saveBtn.addEventListener("click", () => {
    const currentIsSaved = saveBtn.classList.contains("saved");

    if (currentIsSaved) {
      // Remove from favorites
      removeFromFavorites(code);
      saveBtn.classList.remove("saved");
      saveBtn.innerHTML = "♡ Save to Favorites";
    } else {
      // Add to favorites
      const added = addToFavorites(countryData);
      if (added) {
        saveBtn.classList.add("saved");
        saveBtn.innerHTML = "♥ Saved";
      }
    }
  });
}

loadDetailsPage();