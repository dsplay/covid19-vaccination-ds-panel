import React from 'react';
import PropTypes from 'prop-types';

function Line({ country }) {
  console.log(country);
  return (
    <tr>
      <td>
        { `${country.flag} ${country.location}` }
      </td>
      <td>
        { country.population }
      </td>
      <td>
        { country.total_vaccinations }
      </td>
      <td>
        { country.people_vaccinated }
      </td>
      <td>
        { country.people_fully_vaccinated }
      </td>
    </tr>
  );
}

Line.propTypes = {
  country: PropTypes.objectOf(Array).isRequired,
};

export default Line;
