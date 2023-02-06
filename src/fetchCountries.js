const ENDPOINT = 'https://restcountries.com/v3/name/';

function fetchCountries(name) {
  return fetch(
    `${ENDPOINT}${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
export default { fetchCountries };
