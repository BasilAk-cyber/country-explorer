export async function fetchAllCountries() {
    const url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3';
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const countries = await response.json();
        console.log(`Loaded ${countries.length} countries successfully`);
        return countries;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export async function fetchCountryByCode(code) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const data = await res.json();
  console.log(`Fetched country data for code ${code}:`, data);
  return data[0];
}

// favorites.mjs
const FAVORITES_KEY = 'favoriteCountries';

export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isCountrySaved(code) {
  const favorites = getFavorites();
  return favorites.some(country => country.cca3 === code);
}

export function addToFavorites(country) {
  const favorites = getFavorites();
  
  // Avoid duplicates
  if (!favorites.some(c => c.cca3 === country.cca3)) {
    favorites.push(country);
    saveFavorites(favorites);
    return true;
  }
  return false;
}

export function removeFromFavorites(code) {
  let favorites = getFavorites();
  favorites = favorites.filter(country => country.cca3 !== code);
  saveFavorites(favorites);
}