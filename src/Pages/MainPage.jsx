import React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { translateManyNameCountries } from '../utils/countriesNameTranslate';
import Graph from '../components/Graph/Graph';
import CardList from '../components/CardList/CardList';
import Table from '../components/Table/Table';

import './MainPage.css';

function MainPage({ selectedCountry = {}, countries = [], language }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="h-15 flex elements-in-center">
        <h1>{t('Covid-19 Vaccination')}</h1>
      </div>
      <div className="h-60 flex elements-in-row">
        <CardList className="w-40 h-100" country={selectedCountry} language={language} />
        <Graph className="w-60 h-100" country={selectedCountry} />
      </div>
      <div className="h-20 flex elements-in-row">
        <Table countries={translateManyNameCountries(language, countries)} language={language} />
        <QRCode className="qr-code" value={`https://news.google.com/covid19/map?hl=${language}`} />
      </div>
    </>
  );
}

MainPage.propTypes = {
  countries: PropTypes.objectOf(Array).isRequired,
  language: PropTypes.string.isRequired,
  selectedCountry: PropTypes.objectOf(Array).isRequired,
};

export default MainPage;
