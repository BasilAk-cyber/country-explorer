const countryGrid = document.querySelector('#countries-grid');
function createCountryCard(country) {
    return `<a href="detail.html?code=${country.cca3}" class="country-card">
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" class="card-flag">
        <div class="card-content">
            <h3 class="card-title">${country.name.common}</h3>
            <p class="card-capital">${country.capital ? country.capital[0] : 'N/A'}</p>
            <span class="card-tag">${country.region}</span> 
            <p class="card-population">${country.population.toLocaleString()}</p>
        </div>
    </a>`;
}

async function fetchAllCountries() {
    const url = `https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,region,population,cca3`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch countries');
    }
    const countries = await response.json();
    return countries;   
}

console.log('Fetching all countries...');
console.log(fetchAllCountries());


async function displayCountries() {
    const allCountries = await fetchAllCountries();
    allCountries.forEach(country => {
        countryGrid.innerHTML += createCountryCard(country);
    });
}