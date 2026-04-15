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
  return data[0];
}