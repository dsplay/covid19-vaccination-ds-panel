import React, { useEffect, useState } from 'react';

import './App.css';
import { useLocation } from 'react-router-dom';
import * as queryString from 'query-string';
import Graph from './components/Graph/Graph';
import CardList from './components/CardList/CardList';

import getInfoCountries from './utils/getInfoCountries';

const labels = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const GraphDataMock = {
  labels,
  fill: false,
  datasets: [
    {
      label: 'mortes',
      fill: 'start',
      data: [1, 5, 1, 12, 56, 45, 67, 78],
      borderColor: 'rgba(226, 106, 106, 1)',
      backgroundColor: 'rgba(255, 255, 255, 1)', // background padrao
    },
  ],
};

function getQuery(location) {
  const query = queryString.parse(location.search);

  const selectedCountries = (query.countries) ? query.countries.split('2C') : ['world'];
  const selectedDuration = (query.duration) ? query.duration : 15;

  return { selectedCountries, selectedDuration };
}

function App() {
  const [countries, setcountries] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const { selectedCountries } = getQuery(location);
    getInfoCountries(selectedCountries).then((res) => {
      console.log(countries);
      setcountries(res);
    });
  }, []);

  navigator.geolocation.getCurrentPosition((res) => console.log(res));

  return (
    <div className="App">
      <h1> Covid-19 Vaccination </h1>
      <div className="graph-wrapper">
        <Graph data={GraphDataMock} />
      </div>
      <div className="cards-wrapper">
        <CardList />
      </div>
    </div>
  );
}

export default App;
