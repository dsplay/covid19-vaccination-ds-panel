import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { name } from 'country-emoji';
import i18n from './i18n';
import getInfoCountries from './utils/getInfoCountries';
import getLocationUser from './utils/getUserCountry';

import MainPage from './Pages/MainPage';

function getQuery() {
  const parsedUrl = new URL(window.location.href);
  const location = parsedUrl.searchParams.get('location');
  if (location && name(location)) {
    return location;
  }
  if (location) {
    return 'World';
  }
  return null;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(async () => {
    const queryCountry = getQuery();
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
  }, []);

  if (countries.length > 1) {
    return (
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <MainPage countries={countries} selectedCountry={selectedCountry} />
        </I18nextProvider>
      </div>
    );
  }
  return (
    <div>Loading</div>
  );
}

export default App;
