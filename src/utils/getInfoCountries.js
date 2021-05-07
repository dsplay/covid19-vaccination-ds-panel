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
  const counstriesValidData = {};

  json.forEach((line) => {
    if (!counstriesValidData[line.iso_code]) counstriesValidData[line.iso_code] = [];
    if (line.people_vaccinated !== '0' && line.people_vaccinated !== '') {
      counstriesValidData[line.iso_code].push({
        date: line.date,
        people_vaccinated: line.people_vaccinated,
      });
    }

    if (line.people_vaccinated !== '0' && line.people_vaccinated !== '') {
      counstriesMap.set(line.iso_code, {
        location: line.location,
        date: line.date,
        people_vaccinated: line.people_vaccinated,
        people_fully_vaccinated: line.people_fully_vaccinated,
        total_vaccinations: line.total_vaccinations,
      });
    }
  });

  const countries = {};
  counstriesMap.forEach((value, key) => {
    countries[key] = {
      location: value.location,
      date: value.date,
      people_vaccinated: value.people_vaccinated,
      people_vaccinated_history: counstriesValidData[key],
      people_fully_vaccinated: value.people_fully_vaccinated,
      total_vaccinations: value.total_vaccinations,
    };
  });

  return countries;
}

export default function getInfoCountries(queryCountries) {
  const countries = filterCountries(queryCountries);
  return downloadCSV().then((json) => {
    const countriesOrg = GroupCountryByCode(json);

    countries.forEach((country) => {
      country.location = countriesOrg[country.code].location;
      country.people_vaccinated = countriesOrg[country.code].people_vaccinated;
      country.date = countriesOrg[country.code].date;
      country.people_vaccinated_history = countriesOrg[country.code].people_vaccinated_history;
      country.people_fully_vaccinated = countriesOrg[country.code].people_fully_vaccinated;
      country.total_vaccinations = countriesOrg[country.code].total_vaccinations;
    });

    return countries;
  });
}
