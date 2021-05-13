import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import QRCode from 'qrcode.react';

import getInfoCountries from './utils/getInfoCountries';
import getLocationUser from './utils/getUserCountry';
import globalConsts from './utils/conts';

import './App.css';
import Graph from './components/Graph/Graph';
import CardList from './components/CardList/CardList';
import Table from './components/Table/Table';

function getQuery(location) {
  const query = queryString.parse(location.search);
  return (query.mode && query.mode === globalConsts.params.mode.WORLDWIDE) ? 'World' : null;
}

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [language, setLanguage] = useState('en-US');

  const location = useLocation();

  useEffect(async () => {
    const selectedMode = getQuery(location);
    const { countryName, hasCountry } = await getLocationUser();
    let selectedCountryName;
    if (!selectedMode && hasCountry) {
      selectedCountryName = countryName;
    } else {
      selectedCountryName = selectedMode;
    }
    const response = await getInfoCountries(selectedCountryName);
    const countriesFiltered = response.countries;
    const countrySelectedFiltered = response.selectedCountry;
    const browserLanguage = navigator.language || navigator.userLanguage;

    setLanguage(browserLanguage);
    setSelectedCountry(countrySelectedFiltered);
    setCountries(countriesFiltered);
  }, []);

  if (countries.length > 1) {
    return (
      <div className="App">
        <div className="h-15 flex elements-in-center">
          <h1> Covid-19 Vaccination </h1>
        </div>
        <div className="h-60 flex elements-in-row">
          <CardList className="w-40 h-100" country={selectedCountry} />
          <Graph className="w-60 h-100" country={selectedCountry} />
        </div>
        <div className="h-20 flex elements-in-row">
          <Table countries={countries} />
          <QRCode className="qr-code" value={`https://news.google.com/covid19/map?hl=${language}`} />
        </div>
      </div>
    );
  }
  return <div> Loading </div>;
}

export default App;
