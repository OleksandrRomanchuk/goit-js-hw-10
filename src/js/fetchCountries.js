const END_POINT = 'https://restcountries.com/v3.1/name';
const filterFields = 'name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${END_POINT}/${name}?fields=${filterFields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };
