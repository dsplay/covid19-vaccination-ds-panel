import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Line from './Line';
import useInterval from '../../utils/useInterval';

function Table({ countries = [] }) {
  const { t } = useTranslation();

  const ELEMENTS_BY_PAGE = 3;
  const NUMBER_OF_PAGES = Math.ceil(countries.length / ELEMENTS_BY_PAGE);

  const [currentPage, setCurrentPage] = useState(0);

  useInterval(() => {
    setCurrentPage((currentPage + 1) % NUMBER_OF_PAGES);
  }, countries.length > 1 ? 15000 : null);

  const lines = [];
  let position;
  for (let i = 0; i < ELEMENTS_BY_PAGE; i += 1) {
    position = (currentPage * ELEMENTS_BY_PAGE) + i;
    if (position < countries.length) {
      lines.push(<Line key={i} country={countries[position]} />);
    }
  }

  return (
    <>
      <table>
        <tr>
          <th>{t('Country')}</th>
          <th>{t('Population')}</th>
          <th>{t('Doses Given')}</th>
          <th>{t('% at least 1 dose')}</th>
          <th>{t('% fully vaccinated')}</th>
        </tr>
        { lines }
      </table>
    </>
  );
}

Table.propTypes = {
  countries: PropTypes.objectOf(Array).isRequired,
};

export default Table;
