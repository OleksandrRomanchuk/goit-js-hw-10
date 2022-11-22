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
      checkingResponseAndRender(countriesList);
    })
    .catch(() => {
      cleanUpEl(searchingResultsList);
      cleanUpEl(finalResultInfo);

      Notify.failure('Oops, there is no country with that name');
    });
}

function checkingResponseAndRender(data) {
  if (data.length > 10) {
    cleanUpEl(searchingResultsList);
    cleanUpEl(finalResultInfo);
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (data.length >= 2 && data.length <= 10) {
    cleanUpEl(finalResultInfo);
    renderItems(searchingResultsList, createListItemsMarkup, data);
    chooseCountryFromSearchList(searchingResultsList);
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
  for (let i = 0; i < data.length; i += 1) {
    let populationToArray = data[i].population.toString().split('');

    if (populationToArray.length > 9) {
      populationToArray.splice(-3, 0, ' ');
      populationToArray.splice(-7, 0, ' ');
      populationToArray.splice(-11, 0, ' ');
      populationToArray = populationToArray.join('');
      data[i].population = populationToArray;
    }
    if (populationToArray.length > 6 && populationToArray.length <= 9) {
      populationToArray.splice(-3, 0, ' ');
      populationToArray.splice(-7, 0, ' ');
      populationToArray = populationToArray.join('');
      data[i].population = populationToArray;
    }
    if (populationToArray.length > 3 && populationToArray.length <= 6) {
      populationToArray.splice(-3, 0, ' ');
      populationToArray = populationToArray.join('');
      data[i].population = populationToArray;
    }
  }
}

function changeFormatOfLanguages(data) {
  for (let i = 0; i < data.length; i += 1) {
    data[i].languages = Object.values(data[i].languages).join(', ');
  }
}

function chooseCountryFromSearchList(parentElement) {
  Notify.success(
    'Select the required country from the list below or continue to enter the name.'
  );

  parentElement.addEventListener('click', getSelectedCountry);
}

function checkEventNode(event) {
  if (event.target.nodeName !== 'A' && event.target.nodeName !== 'P') {
    return;
  }
}

function fetcSelectedCountry(text) {
  fetchCountries(text).then(data => {
    changeFormatOfLanguages(data);
    changeFormatOfPopulation(data);
    renderItems(finalResultInfo, createFinalResultCardMarkup, data);
  });
}

function getSelectedCountry(event) {
  checkEventNode(event);

  if (event.target.nodeName === 'A') {
    [...event.target.children].forEach(child => {
      if (child.classList.value.includes('country-list__name')) {
        inputEl.value = child.textContent;
        cleanUpEl(searchingResultsList);
        fetcSelectedCountry(child.textContent);
      }
    });
  }

  if (event.target.nodeName === 'P') {
    inputEl.value = event.target.textContent;
    cleanUpEl(searchingResultsList);
    fetcSelectedCountry(event.target.textContent);
  }
}
