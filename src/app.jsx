import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { name } from 'country-emoji';
import i18n from './i18n';
import getVaccinationData from './services/vaccination-data';
import { detectUserLocation } from './services/location';

import MainPage from './pages/main-page';
import Loader from './components/loader';

const parsedUrl = new URL(window.location.href);

function getQuery(field) {
  const value = parsedUrl.searchParams.get(field);
  return value;
}

function getQueryLocation() {
  const location = getQuery('location');
  if (location && name(location)) {
    return location;
  }
  if (location) {
    return 'World';
  }
  return null;
}

function getQueryDuration() {
  const pageDuration = getQuery('pageDuration');
  return (Number.isInteger(parseInt(pageDuration, 10))) ? pageDuration : null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [locationsData, setLocationsData] = useState([]);
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [pageDuration, setpageDuration] = useState(12);

  useEffect(() => {
    (async () => {
      const loadData = async () => {
        try {
          const queryLocation = getQueryLocation();
          const queryDuration = getQueryDuration();

          let selectedLocation = queryLocation;
          if (!selectedLocation) {
            selectedLocation = await detectUserLocation();
          }

          const {
            countries: countriesFiltered,
            selectedCountry: countrySelectedFiltered,
          } = await getVaccinationData(selectedLocation.toUpperCase());

          if (queryDuration) setpageDuration(queryDuration);
          setSelectedLocationData(countrySelectedFiltered);
          setLocationsData(countriesFiltered);
        } catch (e) {
          setError(e);
        }
      };

      const wait = (delay) => new Promise((resolve) => {
        setTimeout(resolve, delay);
      });

      await Promise.all([loadData(), wait(1000)]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center' }}>Error loading data. Please try again :(</div>
    );
  }

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <MainPage
          countries={locationsData}
          selectedCountry={selectedLocationData}
          pageDuration={pageDuration}
        />
      </I18nextProvider>
    </div>
  );
}

export default App;
