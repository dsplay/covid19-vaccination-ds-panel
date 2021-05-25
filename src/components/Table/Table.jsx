import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Line from './Line';
import ObjectValidateCountry from '../../utils/ObjectValidateCountry';
import useInterval from '../../utils/useInterval';

import './Table.sass';

function Table({ countries = [] }) {
  const { t } = useTranslation();

  const worldInfoIndex = countries.findIndex((country) => country.code === 'World');

  const ELEMENTS_BY_PAGE = (worldInfoIndex < 0) ? 3 : 2;
  const NUMBER_OF_PAGES = Math.ceil(countries.length / ELEMENTS_BY_PAGE);

  const [currentPage, setCurrentPage] = useState(0);

  useInterval(() => {
    setCurrentPage((currentPage + 1) % NUMBER_OF_PAGES);
  }, countries.length > 1 ? 10000 : null);

  let lineWorld;
  const countriesInfo = [...countries];

  if (!(worldInfoIndex < 0)) {
    lineWorld = <Line key="World" country={countries[worldInfoIndex]} />;
    countriesInfo.splice(worldInfoIndex, 1);
  }

  const lines = [];
  let position;
  for (let i = 0; i < ELEMENTS_BY_PAGE; i += 1) {
    position = (currentPage * ELEMENTS_BY_PAGE) + i;
    lines.push(<Line
      key={i}
      country={(position < countriesInfo.length)
        ? countriesInfo[position]
        : null}
    />);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{t('Country')}</th>
            <th>{t('Population')}</th>
            <th>{t('Doses Given')}</th>
            <th>{t('% at least 1 dose')}</th>
            <th>{t('% fully vaccinated')}</th>
          </tr>
        </thead>
        <tbody>
          { lineWorld }
          { lines }
        </tbody>
      </table>
    </>
  );
}

Table.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape(ObjectValidateCountry)).isRequired,
};

export default Table;
