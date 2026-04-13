const countryGrid = document.querySelector('#countries-grid');

const allCountries = []

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
    // Reduced to 6 fields – safest option (under the limit)
    const url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3';
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        
        const countries = await response.json();
        allCountries.push(...countries);  
        console.log(`✅ Successfully loaded ${countries.length} countries`);
        return countries;
        
    } catch (error) {
        console.error('❌ Error fetching countries:', error);
        countryGrid.innerHTML = `<p style="color:red; grid-column:1/-1;">Failed to load countries. Please try again later.</p>`;
        throw error;
    }
}

async function displayCountries() {
    try {
        countryGrid.innerHTML = '<p>Loading countries...</p>';   // optional loading message
        
        const allCountries = await fetchAllCountries();
        
        countryGrid.innerHTML = '';   // clear loading message
        
        allCountries.forEach(country => {
            countryGrid.innerHTML += createCountryCard(country);
        });
        
    } catch (error) {
        console.error('Display error:', error);
    }
}

async function filterByContinent(region) {
    
    try{
        const filteredCountries = allCountries.filter(country => country.region === region);
        countryGrid.innerHTML = '';   // clear current grid

        filteredCountries.forEach(country => {
            countryGrid.innerHTML += createCountryCard(country);
        });
    } catch (error) {
        console.error('Filter error:', error);
            countryGrid.innerHTML = `<p style="color:red; grid-column:1/-1;">Failed to filter countries. Please try again later.</p>`;
    }
}

document.querySelectorAll('.filter-btn-item').forEach(button => {
    button.addEventListener('click', () => {
        const region = button.getAttribute('data-region');
        if (region === 'all') {
            displayCountries();
            return;
        }
        filterByContinent(region);
    });
});


// Call it when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCountries();
});