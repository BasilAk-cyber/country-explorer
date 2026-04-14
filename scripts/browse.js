const countryGrid = document.querySelector('#countries-grid');
let allCountries = [];

function createCountryCard(country) {
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

async function fetchAllCountries() {
    const url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3';
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const countries = await response.json();
        allCountries = countries;
        console.log(`✅ Loaded ${countries.length} countries successfully`);
        return countries;
    } catch (error) {
        console.error('❌ Fetch error:', error);
        countryGrid.innerHTML = `<p style="color:red; grid-column:1/-1;">Failed to load countries. Please try again.</p>`;
        throw error;
    }
}

function renderCountries(countries) {
    countryGrid.innerHTML = '';
    
    if (countries.length === 0) {
        countryGrid.innerHTML = `<p style="color:orange; grid-column:1/-1;">No countries found.</p>`;
        return;
    }

    let html = '';
    countries.forEach(country => {
        html += createCountryCard(country);
    });
    countryGrid.innerHTML = html;   // ← single DOM update (much faster)
}

async function displayCountries() {
    try {
        countryGrid.innerHTML = '<p>Loading countries...</p>';
        await fetchAllCountries();
        renderCountries(allCountries);
    } catch (error) {
        console.error('Display error:', error);
    }
}

function filterByContinent(region) {
    if (!allCountries.length) {
        console.warn("⚠️ Data not loaded yet! Click filters after page fully loads.");
        return;
    }

    console.log(`🧭 Filter requested: "${region}"`);

    const filtered = region.toLowerCase() === 'all' 
        ? allCountries 
        : allCountries.filter(country => 
            country.region.toLowerCase() === region.toLowerCase()
          );

    console.log(`📊 Found ${filtered.length} countries in ${region}`);
    renderCountries(filtered);
}

// Button listeners
document.querySelectorAll('.filter-btn-item').forEach(button => {
    button.addEventListener('click', () => {
        const region = button.getAttribute('data-region');
        filterByContinent(region);
    });
});

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Page loaded - starting country app");
    displayCountries();
});