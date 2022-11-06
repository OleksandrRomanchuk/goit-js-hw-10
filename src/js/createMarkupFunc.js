function createListItemsMarkup(data) {
  return data
    .map(
      ({
        name: { official },
        flags: { svg },
      }) => `<li class="country-list__item" style="background-image:url(${svg})">
                <a class="country-list__info-wrapper" href="#">
                  <p class="country-list__name">${official}</p>
                </a>
            </li>`
    )
    .join('');
}

function createFinalResultCardMarkup(data) {
  return data
    .map(
      ({
        name: { common, official },
        flags: { svg },
        population,
        capital,
        languages,
      }) => `<img class="country__final-result" src="${svg}">
              <div class="country-info__wrapper">
                <p class="country-info__name">${common}</p>
                <ul class="country-info__categories">
                  <li class="country-info__item">
                    <p class="country-info__category">Official name:<span class="country-info__category--value"> ${official}</span></p>
                  </li>
                  <li class="country-info__item">
                    <p class="country-info__category">Capital:<span class="country-info__category--value"> ${capital}</span></p>
                  </li>
                  <li class="country-info__item">
                    <p class="country-info__category">Population:<span class="country-info__category--value"> ${population}</span></p>
                  </li>
                  <li class="country-info__item">
                    <p class="country-info__category">Languages:<span class="country-info__category--value"> ${languages}</span></p>
                  </li>
                </ul>
              </div>`
    )
    .join('');
}

export { createListItemsMarkup, createFinalResultCardMarkup };
