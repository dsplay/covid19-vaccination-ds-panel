import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

import { translateManyNameCountries } from '../utils/countriesNameTranslate';
import Graph from '../components/Graph/Graph';
import CardList from '../components/CardList/CardList';
import Table from '../components/Table/Table';
import Footer from '../components/Footer/Footer';

import './MainPage.sass';

function MainPage({ selectedCountry = {}, countries = [] }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex wrapper-title">
        <h1>{t('Covid-19 Vaccination')}</h1>
      </div>
      <div className="wrapper-main-content flex elements-in-row">
        <CardList className="wrapper-card-list" country={selectedCountry} />
        <Graph className="wrapper-graph" country={selectedCountry} />
      </div>
      <div className="h-20 flex elements-in-row">
        <Table countries={translateManyNameCountries(i18n.language, countries)} />
        <QRCode className="qr-code" value={`https://news.google.com/covid19/map?hl=${i18n.language}`} />
        <Footer className date={selectedCountry.date} />
      </div>
    </>
  );
}

MainPage.propTypes = {
  countries: PropTypes.objectOf(Array).isRequired,
  selectedCountry: PropTypes.objectOf(Array).isRequired,
};

export default MainPage;
