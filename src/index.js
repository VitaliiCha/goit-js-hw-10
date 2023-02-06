import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(function (e) {
    e.preventDefault();
    const inputValue = e.target.value.trim();

    clear();

    fetchCountries.fetchCountries(inputValue).then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (country.length >= 2 && country.length <= 10) {
        const markup = country.map(country => markupList(country)).join('');
        listEl.innerHTML = markup;
      } else if (country.length === 1) {
        const markup = country.map(country => markupInfo(country)).join('');
        infoEl.innerHTML = markup;
      }
      if (country.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    }, DEBOUNCE_DELAY);
  })
);

function markupList({ name, flags }) {
  return `<li>
    <img src="${flags[0]}" alt="${name.official}" width="40" height="20">
    <b>${name.official}</b>
                </li>`;
}

function markupInfo({ flags, name, capital, population, languages }) {
  return `<li>  
  <img src="${flags[0]}" alt="${name.official}" width="40" height="20">
         <b>${name.official}</b>
  <p><b>Capital</b>: ${capital}</p>
  <p><b>Population</b>: ${population}</p>
  <p><b>Languages</b>: ${Object.values(languages)}</p>
  </li>`;
}

function clear() {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
}
