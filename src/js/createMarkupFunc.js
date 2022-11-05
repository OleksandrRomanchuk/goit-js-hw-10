function createListItemsMarkup(data) {
  return data
    .map(
      ({
        name: { official },
        flags: { svg },
      }) => `<li class="country-list__item">
  <img src="${svg}" alt="${official} flag" class="country-list__flag">
  <p class="country-list__name">${official}</p>
</li>`
    )
    .join('');
}

function createFinalResultCardMarkup(data) {
  return data
    .map(
      ({
        name: { official },
        flags: { svg },
        population,
        capital,
        languages,
      }) => `<div class="country__final-result">
  <img src="${svg}" alt="${official} flag" class="country__flag">
  <p class="country__name">${official}</p>
  <ul class="country-info">
    <li class="country-info__item">
      <p class="country-info__capital">Capital:<span> ${capital}</span></p>
    </li>
    <li class="country-info__item">
      <p class="country-info__population">Population:<span> ${population}</span></p>
    </li>
    <li class="country-info__item">
      <p class="country-info__languages">Languages:<span> ${languages}</span></p>
    </li>
  </ul>
</div>`
    )
    .join('');
}

export { createListItemsMarkup, createFinalResultCardMarkup };
