import { createCountryCard, fetchAllCountries } from './utils.js';

const countrySearch = document.querySelector('.search-input');
const countrySearchGrid = document.querySelector('.country-grid');

let allCountries = [];

allCountries = await fetchAllCountries();
console.log(`All countries loaded: ${allCountries.length} total`);

function displaySearchedCountries(countries) {
    countrySearchGrid.innerHTML = '';
    countries.forEach(country => {
        if (country.name.common.toLowerCase().includes(countrySearch.value.toLowerCase())) {
            countrySearchGrid.innerHTML += createCountryCard(country);
        }
    });
}

countrySearch.addEventListener('input', async (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(`Search input: "${searchValue}"`);

    console.log(allCountries);
    countrySearchGrid.innerHTML = '';

    console.log(`Found ${allCountries.length} countries"`);
    console.log(`countrySearchGrid element:`, countrySearchGrid);

   displaySearchedCountries(allCountries);
});