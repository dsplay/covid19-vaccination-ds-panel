import React from 'react';
import './style.sass';
import logo from '../../images/vaccine.png';

function Loader() {
  return (
    <div className="loader">
      <img className="logo bounce" src={logo} alt="Covid Vaccination" />
      Loading...
    </div>
  );
}

export default Loader;
