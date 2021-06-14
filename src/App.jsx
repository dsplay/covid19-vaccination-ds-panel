import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { name } from 'country-emoji';
import i18n from './i18n';
import getInfoCountries from './utils/getInfoCountries';
import getLocationUser from './utils/getUserCountry';

import MainPage from './Pages/MainPage';

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
  const duration = getQuery('duration');
  return (Number.isInteger(parseInt(duration, 10))) ? duration : null;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [duration, setDuration] = useState(5);

  useEffect(async () => {
    const queryCountry = getQueryLocation();
    const queryDuration = getQueryDuration();
    console.log(getQueryDuration());
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
    if (queryDuration) setDuration(queryDuration);
  }, []);

  if (countries.length > 1) {
    return (
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <MainPage countries={countries} selectedCountry={selectedCountry} duration={duration} />
        </I18nextProvider>
      </div>
    );
  }
  return (
    <div>Loading</div>
  );
}

export default App;
