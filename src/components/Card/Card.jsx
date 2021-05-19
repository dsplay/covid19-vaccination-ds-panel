import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

import NumberFormatter from '../../utils/NumberFormatter';
import './Card.css';

function Card({ title, value, detail }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h3>{ t(title) }</h3>
      <CountUp
        className="card-value"
        start={0}
        end={Number(value)}
        duration={2}
        formattingFn={NumberFormatter}
      />
      <h5 className="card-detail">
        { detail ? `(${Number(detail).toFixed(1)}%)` : '' }
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
