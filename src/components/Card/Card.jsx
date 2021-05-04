import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

function Card({ title, value }) {
  return (
    <div className="card">
      <h3>
        { title }
      </h3>
      <h3>
        { value }
      </h3>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Card;
