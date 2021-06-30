import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Helmet } from 'react-helmet';

import i18n from '../../i18n';

import locationSchema from '../../schemas/location';
import { translateCountryNames } from '../../utils/country-name-translator';

import Graph from '../../components/graph';
import CardList from '../../components/card-list';
import Table from '../../components/table';
import Footer from '../../components/footer';

import './style.sass';

import logo from '../../images/vaccine.png';

function MainPage({ selectedCountry = {}, countries = [], pageDuration }) {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <div className="main-page">
        <Helmet>
          <title>
            {t('Covid-19 Vaccination')}
          </title>
        </Helmet>
        <div className="flex wrapper-title">
          <h1>{t('Covid-19 Vaccination')}</h1>
          <img className="logo" alt={t('Covid-19 Vaccination')} src={logo} />
        </div>
        <div className="wrapper-main-content flex elements-in-row">
          <CardList className="wrapper-card-list" country={selectedCountry} />
          <Graph className="wrapper-graph" country={selectedCountry} />
        </div>
        <div className="h-20 flex elements-in-row">
          <Table
            countries={translateCountryNames(i18n.language, countries)}
            duration={pageDuration}
          />
          <QRCode className="qr-code" value={`https://news.google.com/covid19/map?hl=${i18n.language}`} />
          <Footer date={selectedCountry.date} />
        </div>
      </div>
    </div>
  );
}

MainPage.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape(locationSchema)).isRequired,
  selectedCountry: PropTypes.shape(locationSchema).isRequired,
  pageDuration: PropTypes.number.isRequired,
};

export default MainPage;
