import axios from 'axios';
import { readString as CSVtoJSON } from 'react-papaparse';
import CountryBase from '../data/countries.json';

function downloadCSV() {
  return axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv')
    .then((response) => CSVtoJSON(response.data, { header: true }).data);
}

function filterCountries(queryCountries) {
  const countries = [];
  queryCountries.forEach((queryCountry) => {
    if (CountryBase[queryCountry]) countries.push(CountryBase[queryCountry]);
  });
  return countries;
}

function GroupCountryByCode(json) {
  const counstriesMap = new Map();
  json.forEach((line) => {
    if (line.people_vaccinated !== '0' && line.people_vaccinated !== '0') {
      counstriesMap.set(line.iso_code, {
        location: line.location,
        date: line.date,
        people_vaccinated: line.people_vaccinated,
      });
    }
  });

  return Object.fromEntries(counstriesMap);
}

export default function getInfoCountries(queryCountries) {
  const countries = filterCountries(queryCountries);
  return downloadCSV().then((json) => {
    const countriesOrg = GroupCountryByCode(json);

    countries.forEach((country) => {
      country.location = countriesOrg[country.code].location;
      country.people_vaccinated = countriesOrg[country.code].people_vaccinated;
      country.date = countriesOrg[country.code].date;
    });

    return countries;
  });
}
