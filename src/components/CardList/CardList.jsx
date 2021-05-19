import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import translateCountryName from '../../utils/countriesNameTranslate';
import Card from '../Card/Card';

import './CardList.css';

function CardList({ className, country, language }) {
  const { t } = useTranslation();

  return (
    <div className={`cards-wrapper ${className}`}>
      <div className="w-100">
        <h1 className="title-card-list">
          { `${country.flag}   ${translateCountryName(language, country.code) || t(country.location)}` }
        </h1>
      </div>
      <Card key={1} title="Population" value={(country) ? country.population : 0} />
      <Card key={2} title="Doses Given" value={(country) ? country.totalVaccinations : 0} />
      <Card key={3} title="people with at least 1 dose" value={(country) ? country.peopleVaccinated : 0} detail={(country) ? country.peopleVaccinatedPerHundred : 0} />
      <Card key={4} title="people fully vaccinated" value={(country) ? country.peopleFullyVaccinated : 0} detail={(country) ? country.peopleFullyVaccinatedPerHundred : 0} />
    </div>
  );
}

CardList.propTypes = {
  country: PropTypes.objectOf(Array).isRequired,
  className: PropTypes.string,
  language: PropTypes.string.isRequired,
};

CardList.defaultProps = {
  className: '',
};

export default CardList;
