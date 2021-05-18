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
        className="text-secondary-color"
        start={0}
        end={Number(value)}
        duration={2}
        formattingFn={NumberFormatter}
      />
      <h5>
        { detail ? `${Number(detail).toFixed(1)}%` : '' }
      </h5>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
};

export default Card;
