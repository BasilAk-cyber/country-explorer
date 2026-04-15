import { fetchAllCountries } from './utils.js';
import { createCountryCard } from './templates.js';

const countryGrid = document.querySelector('#countries-grid');
const sortBtn = document.querySelectorAll('.sort-btn-item');
let allCountries = [];

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

function sortedCountries(order){

    let sorted = [...allCountries].sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();
        const popA = a.population;
        const popB = b.population;

        switch(order) {
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
            case 'pop-asc':
                return popA - popB;
            case 'pop-desc':
                return popB - popA;
            default: displayCountries();
        }
    });
    return sorted;

}

sortBtn.forEach(button => {
    button.addEventListener('click', () => {
        const order = button.getAttribute('data-sort');
        const sorted = sortedCountries(order);
        renderCountries(sorted);
    });
});

async function displayCountries() {
    try {
        countryGrid.innerHTML = '<p>Loading countries...</p>';
        const countries = await fetchAllCountries();
        allCountries = countries;
        renderCountries(allCountries);
    } catch (error) {
        countryGrid.innerHTML = `<p style="color:red; grid-column:1/-1;">Failed to load countries. Please try again.</p>`;
        console.error('Display error:', error); 
    }
}

function filterByContinent(region) {
    if (!allCountries.length) {
        console.log("Data not loaded yet! Click filters after page fully loads.");
        return;
    }

    console.log(`Filter requested: "${region}"`);

    const filtered = region.toLowerCase() === 'all' 
        ? allCountries 
        : allCountries.filter(country => 
            country.region.toLowerCase() === region.toLowerCase()
          );

    console.log(`Found ${filtered.length} countries in ${region}`);
    renderCountries(filtered);
}

document.querySelectorAll('.filter-btn-item').forEach(button => {
    button.addEventListener('click', () => {
        const region = button.getAttribute('data-region');
        filterByContinent(region);
    });
});

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded - starting country app");
    displayCountries();
});