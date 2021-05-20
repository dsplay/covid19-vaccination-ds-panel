import React from 'react';
import PropTypes from 'prop-types';

import numberFormatter from '../../utils/NumberFormatter';

function Line({ country }) {
  const {
    flag,
    location = 0,
    population = 0,
    totalVaccinations = 0,
    peopleVaccinatedPerHundred = '-',
    peopleFullyVaccinatedPerHundred = '-',
  } = country;

  return (
    <tr>
      <td>
        { `${flag} ${location}` }
      </td>
      <td>
        { numberFormatter(population)}
      </td>
      <td>
        { numberFormatter(totalVaccinations) }
      </td>
      <td>
        { `${peopleVaccinatedPerHundred}%` }
      </td>
      <td>
        { `${peopleFullyVaccinatedPerHundred}%` }
      </td>
    </tr>
  );
}

Line.propTypes = {
  country: PropTypes.objectOf(Array).isRequired,
};

export default Line;
