import React from 'react';
import PropTypes from 'prop-types';

import numberFormatter from '../../utils/NumberFormatter';

function Line({ country }) {
  if (!country) {
    return <tr />;
  }

  const {
    flag,
    location,
    population,
    totalVaccinations,
    peopleVaccinatedPerHundred,
    peopleFullyVaccinatedPerHundred,
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
  country: PropTypes.objectOf(Array),
};

Line.defaultProps = {
  country: null,
};

export default Line;
