import React from 'react';

import './App.css';
import Header from './components/Header/Header';
import Graph from './components/Graph/Graph';
import CardList from './components/CardList/CardList';

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
      backgroundColor: 'rgba(226, 106, 106, 1)',
    },
  ],
};

function App() {
  return (
    <div className="App">
      <Header />
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
