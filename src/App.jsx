import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';
import getInfoCountries from './utils/getInfoCountries';
import getLocationUser from './utils/getUserCountry';

import MainPage from './Pages/MainPage';

function getQuery() {
  const parsedUrl = new URL(window.location.href);
  const mode = parsedUrl.searchParams.get('mode');
  if (mode && mode === 'WORLDWIDE') {
    return 'World';
  }
  return null;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [language] = useState(i18n.language);

  useEffect(async () => {
    const selectedMode = getQuery();
    const { countryCode } = await getLocationUser();
    let selectedCountryCode;
    if (!selectedMode && countryCode) {
      selectedCountryCode = countryCode;
    } else {
      selectedCountryCode = selectedMode;
    }
    const response = await getInfoCountries(selectedCountryCode);
    const countriesFiltered = response.countries;
    const countrySelectedFiltered = response.selectedCountry;

    setSelectedCountry(countrySelectedFiltered);
    setCountries(countriesFiltered);
  }, []);

  if (countries.length > 1) {
    return (
      <div className="App">
        <I18nextProvider i18n={i18n}>
          <MainPage countries={countries} selectedCountry={selectedCountry} language={language} />
        </I18nextProvider>
      </div>
    );
  }
  return (
    <div>Loading</div>
  );
}

export default App;
