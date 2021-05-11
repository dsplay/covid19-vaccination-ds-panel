import PropTypes from 'prop-types';
import React from 'react';
import Card from '../Card/Card';

function CardList({ country }) {
  return (
    <>
      <Card key={1} title="Population" value={(country) ? country.population : 0} />
      <Card key={2} title="Doses Given" value={(country) ? country.total_vaccinations : 0} />
      <Card key={3} title="people with at least 1 dose" value={(country) ? country.people_vaccinated : 0} />
      <Card key={4} title="people fully vaccinated" value={(country) ? country.people_fully_vaccinated : 0} />
    </>
  );
}

CardList.propTypes = {
  country: PropTypes.objectOf(Array).isRequired,
};

export default CardList;
