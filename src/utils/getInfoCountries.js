import axios from 'axios';
import moment from 'moment';
import { readString as CSVtoJSON } from 'react-papaparse';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

import CountryBase from '../data/countries.json';

const KEY_DATA = 'data';
const KEY_SELECTED = 'selected';
const KEY_UPDATED = 'updated';

function downloadInfoCountries() {
  return axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv')
    .then((response) => CSVtoJSON(response.data, { header: true }).data)
    .catch(() => null);
}

function FilterInfoCountries(countriesInfoJSON, nameSelectedCountry) {
  const countries = new Map();

  countriesInfoJSON.forEach((line) => {
    if (line.people_vaccinated !== '0' && line.people_vaccinated !== '' && CountryBase[line.location]) {
      countries.set(line.iso_code, {
        location: line.location,
        date: line.date,
        population: CountryBase[line.location].population,
        flag: CountryBase[line.location].flag,
        people_vaccinated: line.people_vaccinated,
        people_fully_vaccinated: line.people_fully_vaccinated,
        total_vaccinations: line.total_vaccinations,
        people_vaccinated_per_hundred: line.people_vaccinated_per_hundred,
        people_fully_vaccinated_per_hundred: line.people_fully_vaccinated_per_hundred,
      });
    }
  });

  const selectedCountryVaccinationRecord = [];

  countriesInfoJSON.forEach((line) => {
    if (line.people_vaccinated !== '0' && line.people_vaccinated !== '' && line.location === nameSelectedCountry) {
      selectedCountryVaccinationRecord.push({
        date: line.date,
        people_vaccinated: line.people_vaccinated,
        people_fully_vaccinated: line.people_fully_vaccinated,
      });
    }
  });

  const codeSelectedCountry = CountryBase[nameSelectedCountry].code;
  const selectedCountry = countries.get(codeSelectedCountry);
  selectedCountry.people_vaccinated_report = selectedCountryVaccinationRecord;
  countries.delete(codeSelectedCountry);

  return { countries: [...countries].map(([_, value]) => value), selectedCountry };
}

function getDataLocalStorage() {
  const cache = localStorage.getItem(KEY_DATA);
  const countriesInfoFiltered = cache && JSON.parse(decompressFromUTF16(cache));
  return countriesInfoFiltered;
}

function setDataLocalStorage(nameSelectedCountry, countriesInfoFiltered) {
  localStorage.setItem(KEY_DATA, compressToUTF16(JSON.stringify(countriesInfoFiltered)));
  localStorage.setItem(KEY_UPDATED, moment().utc().toISOString());
  localStorage.setItem(KEY_SELECTED, nameSelectedCountry);
}

function dataLocalStorageIsValid(nameSelectedCountry) {
  const lastUpdate = localStorage.getItem(KEY_UPDATED);
  const previousNameSelectedCountry = localStorage.getItem(KEY_SELECTED);
  if (!lastUpdate) return false;
  if (!previousNameSelectedCountry) return false;
  if (previousNameSelectedCountry !== nameSelectedCountry) return false;
  if (moment().diff(lastUpdate, 'days') > 1) return false;
  return true;
}

export default async function getInfoCountries(nameSelectedCountry) {
  if (dataLocalStorageIsValid()) {
    return getDataLocalStorage();
  }

  const countriesInfoJSON = await downloadInfoCountries();
  if (countriesInfoJSON) {
    const countriesInfoFiltered = FilterInfoCountries(countriesInfoJSON, nameSelectedCountry);
    setDataLocalStorage(nameSelectedCountry, countriesInfoFiltered);
    return countriesInfoFiltered;
  }

  return getDataLocalStorage();
}
