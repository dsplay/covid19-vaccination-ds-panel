import React, { useEffect, useState } from 'react';

import './App.css';
import { useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import Graph from './components/Graph/Graph';
import CardList from './components/CardList/CardList';

import getInfoCountries from './utils/getInfoCountries';

function getQuery(location) {
  const query = queryString.parse(location.search);

  const selectedMode = (query.mode && query.mode === 'WORLDWIDE') ? 'World' : 'LOCATION';

  return { selectedMode };
}

function App() {
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState();

  const location = useLocation();
  // const userCoordinates = navigator.geolocation.getCurrentPosition();

  useEffect(() => {
    const { selectedMode } = getQuery(location);
    console.log(selectedMode);
    getInfoCountries('World').then((response) => {
      const countriesFiltered = response.countries;
      const countrySelectedFiltered = response.selectedCountry;
      console.log(countries);
      setSelectedCountry(countrySelectedFiltered);
      setCountries(countriesFiltered);
    });
  }, []);

  navigator.geolocation.getCurrentPosition((res) => console.log(res));

  return (
    <div className="App">
      <h1> Covid-19 Vaccination </h1>
      <div className="graph-wrapper">
        <Graph country={selectedCountry} />
      </div>
      <div className="cards-wrapper">
        <CardList />
      </div>
    </div>
  );
}

export default App;
