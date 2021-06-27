import React from 'react';
import PropTypes from 'prop-types';
import './Table.sass';

import numberFormatter from '../../utils/NumberFormatter';
import { getColorFromPct } from '../../utils/color';

function Line({
  country,
  className = '',
}) {
  if (!country) {
    return <tr> &nbsp; </tr>;
  }

  const {
    flag = '',
    location = '',
    population,
    totalVaccinations,
    peopleVaccinatedPerHundred = '-',
    peopleFullyVaccinatedPerHundred = '-',
  } = country;

  return (
    <tr className={className}>
      <td>
        {`${flag} ${location}`}
      </td>
      <td className="value">
        {numberFormatter(population) || '-'}
      </td>
      <td className="value">
        {numberFormatter(totalVaccinations) || '-'}
      </td>
      <td className="value pct">
        {`${Number(peopleVaccinatedPerHundred).toFixed(0)}%`}
        <span
          className="status"
          style={{
            backgroundColor: getColorFromPct(Number(peopleVaccinatedPerHundred / 100), true),
          }}
        />
      </td>
      <td className="value pct">
        <span>{`${Number(peopleFullyVaccinatedPerHundred).toFixed(0)}%`}</span>
        <span
          className="status"
          style={{
            backgroundColor: getColorFromPct(Number(peopleFullyVaccinatedPerHundred / 100), true),
          }}
        />
      </td>
    </tr>
  );
}

Line.propTypes = {
  country: PropTypes.objectOf(Array),
  className: PropTypes.string,
};

Line.defaultProps = {
  country: null,
  className: '',
};

export default Line;
