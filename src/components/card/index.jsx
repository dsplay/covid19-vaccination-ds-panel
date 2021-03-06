import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

import { getColorFromPct } from '../../utils/color';
import { formatBigValue } from '../../utils/number';
import './style.sass';

function Card({ title, value, detail }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h3 className="card-title">{t(title)}</h3>
      {
        value
          ? (
            <CountUp
              className="card-value"
              start={0}
              end={Number(value)}
              duration={3}
              formattingFn={formatBigValue}
            />
          )
          : (
            <div className="card-value">
              -
            </div>
          )
      }
      {
        detail && (
          <h5
            className="card-detail"
            style={{
              color: getColorFromPct(Number(detail / 100).toFixed(2), true),
            }}
          >
            {Number(detail).toFixed(2)}
            %
          </h5>
        )
      }
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  detail: PropTypes.string,
};

Card.defaultProps = {
  detail: '',
};

export default Card;
