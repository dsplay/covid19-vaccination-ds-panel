import PropTypes from 'prop-types';
import React from 'react';
import Card from '../Card/Card';

import './CardList.css';

function CardList({ className, country }) {
  return (
    <div className={`cards-wrapper ${className}`}>
      <Card key={1} title="Population" value={(country) ? country.population : 0} />
      <Card key={2} title="Doses Given" value={(country) ? country.total_vaccinations : 0} />
      <Card key={3} title="people with at least 1 dose" value={(country) ? country.people_vaccinated : 0} detail={(country) ? country.people_vaccinated_per_hundred : 0} />
      <Card key={4} title="people fully vaccinated" value={(country) ? country.people_fully_vaccinated : 0} detail={(country) ? country.people_fully_vaccinated_per_hundred : 0} />
    </div>
  );
}

CardList.propTypes = {
  country: PropTypes.objectOf(Array).isRequired,
  className: PropTypes.string,
};

CardList.defaultProps = {
  className: '',
};

export default CardList;
