export function detailsPageTemplate(country) {
  const {
    name,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    currencies,
    flags,
    maps,
    borders = [],
    weather = null,
    isSaved = false,
  } = country;

  const nativeName = Object.values(name.nativeName || {})[0]?.common || "";
  const languageList = Object.values(languages || {});
  const currencyList = Object.values(currencies || {}).map(c => `${c.name} (${c.symbol})`);
  const formattedPopulation = population.toLocaleString();
  const formattedArea = area?.toLocaleString();
  const flagCode = flags?.png || flags?.svg || "";
  const googleMapsLink = maps?.googleMaps || `https://maps.google.com/?q=${name.common}`;

  return `
    <div class="container">
      <a href="browse.html" class="back-link">← Back to Browse</a>

      <div class="detail-content">
        <div class="detail-left">
          <img src="${flagCode}" alt="Flag of ${name.common}" class="detail-flag">
          <a href="${googleMapsLink}" target="_blank" rel="noopener noreferrer" class="map-link">
            🗺 View on map
          </a>
        </div>

        <div class="detail-right">
          <h1 class="detail-title">${name.common}</h1>
          <p class="detail-native-name">${nativeName}</p>

          <dl class="detail-list">
            <dt>Capital</dt>
            <dd>${capital?.[0] || "N/A"}</dd>

            <dt>Region</dt>
            <dd>${region}</dd>

            <dt>Subregion</dt>
            <dd>${subregion || "N/A"}</dd>

            <dt>Population</dt>
            <dd>${formattedPopulation}</dd>

            <dt>Area</dt>
            <dd>${formattedArea} km²</dd>
          </dl>

          <div class="detail-section">
            <h3 class="detail-section-title">Languages</h3>
            <div class="chips-container">
              ${languageList.map(lang => `<span class="chip">${lang}</span>`).join("")}
            </div>
          </div>

          <div class="detail-section">
            <h3 class="detail-section-title">Currencies</h3>
            <div class="chips-container">
              ${currencyList.map(c => `<span class="chip">${c}</span>`).join("")}
            </div>
          </div>

          ${weather ? `
          <div class="weather-card">
            <div class="weather-left">
              <span class="weather-icon">${weather.icon}</span>
            </div>
            <div class="weather-right">
              <p class="weather-location">${capital?.[0]} · ${weather.temp}°C</p>
              <p class="weather-condition">${weather.condition}</p>
              <p class="weather-details">Humidity: ${weather.humidity}% · Wind: ${weather.wind} km/h</p>
            </div>
          </div>
          ` : `
          <div class="skeleton-card" style="margin-top: 16px;">
            <div class="skeleton-line" style="width: 60%; height: 16px;"></div>
            <div class="skeleton-line" style="width: 80%; height: 20px; margin-top: 8px;"></div>
            <div class="skeleton-line" style="width: 50%; height: 16px; margin-top: 8px;"></div>
          </div>
          `}
        </div>
      </div>

      ${borders.length > 0 ? `
      <div class="border-countries">
        <h3 class="border-title">Border Countries:</h3>
        <div class="chips-container">
          ${borders.map(b => `
            <a href="detail.html?code=${b.code}" class="chip-link">${b.flag} ${b.name}</a>
          `).join("")}
        </div>
      </div>
      ` : ""}

      <div class="action-bar">
        <button class="btn btn-outline ${isSaved ? "saved" : ""}" id="saveBtn">
          ${isSaved ? "♥ Saved" : "♡ Save to Favorites"}
        </button>
        <button class="btn btn-primary">⇄ Add to Compare</button>
      </div>
    </div>
  `;
}

export function createCountryCard(country) {
    const capital = country.capital ? country.capital[0] : 'N/A';
    return `
        <a href="detail.html?code=${country.cca3}" class="country-card">
            <img src="${country.flags.png}" 
                 alt="Flag of ${country.name.common}" 
                 class="card-flag">
            <div class="card-content">
                <h3 class="card-title">${country.name.common}</h3>
                <p class="card-capital">${capital}</p>
                <span class="card-tag">${country.region}</span> 
                <p class="card-population">${country.population.toLocaleString()}</p>
            </div>
        </a>`;
}

