import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import QRCode from 'qrcode.react';

import getInfoCountries from './utils/getInfoCountries';

import './App.css';
import Graph from './components/Graph/Graph';
import CardList from './components/CardList/CardList';
import Table from './components/Table/Table';

function getQuery(location) {
  const query = queryString.parse(location.search);

  const selectedMode = (query.mode && query.mode === 'WORLDWIDE') ? 'World' : 'LOCATION';

  return { selectedMode };
}

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const location = useLocation();

  useEffect(async () => {
    const { selectedMode } = getQuery(location);
    console.log(selectedMode);
    const response = await getInfoCountries('World');
    const countriesFiltered = response.countries;
    const countrySelectedFiltered = response.selectedCountry;
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
          <QRCode className="qr-code" value="https://news.google.com/covid19/map?hl=en-US" />
        </div>
      </div>
    );
  }
  return <div> Loading </div>;
}

export default App;
