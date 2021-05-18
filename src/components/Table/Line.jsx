import React from 'react';
import PropTypes from 'prop-types';

import numberFormatter from '../../utils/NumberFormatter';

function Line({ country }) {
  return (
    <tr>
      <td>
        { `${country.flag} ${country.location}` }
      </td>
      <td>
        { numberFormatter(country.population) || '-'}
      </td>
      <td>
        { numberFormatter(country.totalVaccinations) || '-' }
      </td>
      <td>
        { numberFormatter(country.peopleVaccinated) || '-' }
      </td>
      <td>
        { numberFormatter(country.peopleFullyVaccinated) || '-' }
      </td>
    </tr>
  );
}

Line.propTypes = {
  country: PropTypes.objectOf(Array).isRequired,
};

export default Line;
