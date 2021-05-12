import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as queryString from 'query-string';

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
        <div className="h-20 title">
          <h1> Covid-19 Vaccination </h1>
        </div>
        <div className="h-60">
          <div className="cards-wrapper">
            <CardList country={selectedCountry} />
          </div>
          <div className="graph-wrapper">
            <Graph country={selectedCountry} />
          </div>
        </div>
        <div>
          <Table countries={countries} />
        </div>
      </div>
    );
  }
  return <div> Loading </div>;
}

export default App;
