import React from 'react';

import './Header.css';

function Header() {
  return (
    <div className="header-wrapper">
      <div> COVID-19 </div>
      <div> Brazil </div>
      <div>
        <a href="/settings">
          Settigs
        </a>
      </div>
    </div>
  );
}

export default Header;
