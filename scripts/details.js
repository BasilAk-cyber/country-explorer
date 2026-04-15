import { detailsPageTemplate } from "./templates.js";
import { fetchCountryByCode } from "./utils.js";

async function loadDetailsPage() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) {
    window.location.href = "browse.html";
    return;
  }

  const country = await fetchCountryByCode(code);

  document.querySelector(".detail-layout").innerHTML = detailsPageTemplate({
    ...country,
    isSaved: false,
    weather: null,
  });
}

loadDetailsPage();