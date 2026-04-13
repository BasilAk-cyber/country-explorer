const countrySearch = document.querySelector('.search-input');

function createSkeletonCard() {
    return `<a href="detail.html?code=KOR" class="country-card">
        <img src="https://flagcdn.com/w320/kr.webp" alt="Flag of South Korea" class="card-flag">
        <div class="card-content">
            <h3 class="card-title">South Korea</h3>
            <p class="card-capital">Seoul</p>
            <span class="card-tag">Asia</span>
            <p class="card-population">51,784,059</p>
        </div>
    </a>`;
}

function fetchCountries(searchTerm) {
    const url = `https://restcountries.com/v3.1/name/${searchTerm}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

countrySearch.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    fetchCountries(searchValue);
});