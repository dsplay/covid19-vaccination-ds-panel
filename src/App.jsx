import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { name } from 'country-emoji';
import i18n from './i18n';
import getInfoCountries from './utils/getInfoCountries';
import getLocationUser from './utils/getUserCountry';

import MainPage from './pages/main-page';

function getQuery(field) {
  const parsedUrl = new URL(window.location.href);
  const value = parsedUrl.searchParams.get(field);
  return value;
}

function getQueryLocation() {
  const location = getQuery('location');
  if (location && name(location)) {
    return location;
  }
  if (location) {
    return 'World';
  }
  return null;
}

function getQueryDuration() {
  const pageDuration = getQuery('pageDuration');
  return (Number.isInteger(parseInt(pageDuration, 10))) ? pageDuration : null;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [pageDuration, setpageDuration] = useState(12);

  useEffect(async () => {
    const queryCountry = getQueryLocation();
    const queryDuration = getQueryDuration();
    const countryCode = await getLocationUser();
    let selectedCountryCode;
    if (!queryCountry && countryCode) {
      selectedCountryCode = countryCode;
    } else {
      selectedCountryCode = queryCountry;
    }

    const response = await getInfoCountries(selectedCountryCode.toUpperCase());
    const countriesFiltered = response.countries;
    const countrySelectedFiltered = response.selectedCountry;

    setSelectedCountry(countrySelectedFiltered);
    setCountries(countriesFiltered);
    if (queryDuration) setpageDuration(queryDuration);
  }, []);

  if (countries.length > 1) {
    return (
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <MainPage
            countries={countries}
            selectedCountry={selectedCountry}
            pageDuration={pageDuration}
          />
        </I18nextProvider>
      </div>
    );
  }
  return (
    <div>Loading</div>
  );
}

export default App;
