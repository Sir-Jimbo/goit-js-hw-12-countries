import './css/styles.css';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import countryCardTpl from './templates/country-card.hbs';
import fetchCountries from './js/fetchCountries';

import getRefs from './js/get-refs';

const refs = getRefs();

const debounce = require('lodash.debounce');

refs.searchInput.addEventListener(
    'input',
    debounce((onSearch) , 500)
);

function onSearch(e) { 

    e.preventDefault();
    const searchInput = e.currentTarget;
  const searchQuery = refs.searchInput.value;
    
    fetchCountries(searchQuery)
        .then(
            
            countries => {
            
                if (countries.length > 10) {
                    error({
                        text: 'Too many matches found. Please enter a more specific query!',
                        type: 'info',
                        delay: 800
                    });
                } else if (countries.length >= 2 && countries.length <= 10) {
                    renderContriesList(countries);

                } else if (countries.length < 2) {
                    renderCountryCard(countries[0])
                }
                else
                    return onFetchError()
            })
        .catch(onFetchError)
  //      .finally(clear);
}

function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.cardContainer.innerHTML = markup;
}

function renderContriesList(countries) {
    let markup = '<ul>';
    for (let country of countries) {
        markup += `<li>${country.name}</li>`;
    }
    markup +='</ul>'
    refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('Упс, что-то пошло не так и мы не нашли вашей страны!');
}

function clear() {
    refs.searchInput.value = "";  
}