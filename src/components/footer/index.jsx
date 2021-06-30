import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import 'moment/locale/de';
import 'moment/locale/it';
import 'moment/locale/fr';
import 'moment/locale/nl';
import 'moment/locale/es';
import 'moment/locale/pt';

import './style.sass';

function Foot({ date }) {
  const { t } = useTranslation();
  moment.locale(i18n.language);

  return (
    <div className="wrapper-footer footer align-text-center">
      {t('powered by ')}
      <strong>
        <a href="https://dsplay.tv">dsplay.tv</a>
      </strong>
      {' | from '}
      <a href="https://ourworldindata.org/covid-vaccinations">
        Our World in Data
      </a>
      {` - ${t('Last Updated')}: ${moment(date).fromNow()}`}
    </div>
  );
}

Foot.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Foot;
