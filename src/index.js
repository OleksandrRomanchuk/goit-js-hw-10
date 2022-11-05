import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import {
  createListItemsMarkup,
  createFinalResultCardMarkup,
} from './js/createMarkupFunc';
import './css/styles.css';

const { inputEl, searchingResultsList, finalResultInfo } = refs;
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(sendRequest, DEBOUNCE_DELAY));

function sendRequest(event) {
  cleanUpEl(searchingResultsList);
  cleanUpEl(finalResultInfo);

  const enteredCountryName = event.target.value.trim();

  if (!enteredCountryName) {
    cleanUpEl(searchingResultsList);
    return;
  }

  fetchCountries(enteredCountryName)
    .then(countriesList => {
      console.log(
        `We found ${countriesList.length} countries that meet the request`
      );
      checkingLengthOfResponseAndRender(countriesList);
    })
    .catch(() => {
      cleanUpEl(searchingResultsList);
      cleanUpEl(finalResultInfo);

      Notify.failure('Oops, there is no country with that name');
    });
}

function checkingLengthOfResponseAndRender(data) {
  if (data.length > 10) {
    cleanUpEl(searchingResultsList);
    cleanUpEl(finalResultInfo);
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (data.length >= 2 && data.length <= 10) {
    cleanUpEl(finalResultInfo);
    renderItems(searchingResultsList, createListItemsMarkup, data);
  }
  if (data.length === 1) {
    cleanUpEl(searchingResultsList);
    changeFormatOfLanguages(data);
    changeFormatOfPopulation(data);
    renderItems(finalResultInfo, createFinalResultCardMarkup, data);
  }
}

function renderItems(outputEl, markupFunc, data) {
  outputEl.innerHTML = markupFunc(data);
}

function cleanUpEl(element) {
  element.innerHTML = '';
}

function changeFormatOfPopulation(data) {
  let populationToArray = data[0].population.toString().split('');

  if (populationToArray.length > 9) {
    populationToArray.splice(-3, 0, ' ');
    populationToArray.splice(-7, 0, ' ');
    populationToArray.splice(-11, 0, ' ');
    populationToArray = populationToArray.join('');
    data[0].population = populationToArray;
  }
  if (populationToArray.length > 6 && populationToArray.length <= 9) {
    populationToArray.splice(-3, 0, ' ');
    populationToArray.splice(-7, 0, ' ');
    populationToArray = populationToArray.join('');
    data[0].population = populationToArray;
  }
  if (populationToArray.length > 3 && populationToArray.length <= 6) {
    populationToArray.splice(-3, 0, ' ');
    populationToArray = populationToArray.join('');
    data[0].population = populationToArray;
  }
}

function changeFormatOfLanguages(data) {
  const languages = [];

  Object.keys(data[0].languages).map(key => {
    key = ` ${data[0].languages[key]}`;
    languages.push(key);
  });

  data[0].languages = languages;
}
