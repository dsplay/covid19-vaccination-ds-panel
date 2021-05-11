import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import NumberFormatter from '../../utils/NumberFormatter';
import './Card.css';

function Card({ title, value, detail }) {
  return (
    <div className="card">
      <h3>
        { title }
      </h3>
      <CountUp
        start={0}
        end={value}
        duration={2}
        formattingFn={NumberFormatter}
      />
      <h5>
        { detail }
      </h5>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  detail: PropTypes.string.isRequired,
};

export default Card;
