import axios from 'axios';
import moment from 'moment';
import { readString as CSVtoJSON } from 'react-papaparse';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { flag, code } from 'country-emoji';

const KEY_DATA = 'data';
const KEY_SELECTED = 'selected';
const KEY_UPDATED = 'updated';
const KEY_VERSION = 'version';
const VERSION = '1.1';

const COUNTRIES_LIMIT = 18;

const countriesMap = {
  World: 'World',
};

const forbiddenCode = ['EU'];

async function downloadInfoCountries() {
  const response = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv');
  return CSVtoJSON(response.data, { header: true }).data;
}

function orderCountries(countries) {
  return countries.sort(
    (countryA, countryB) => countryB.totalVaccinations - countryA.totalVaccinations,
  ).slice(0, COUNTRIES_LIMIT);
}

function filterInfoCountries(countriesInfoJSON, codeSelectedCountry) {
  const countries = new Map();
  const selectedCountryVaccinationRecord = [];

  countriesInfoJSON.forEach(({
    location,
    date,
    total_vaccinations: totalVaccinations,
    people_vaccinated: peopleVaccinated = '',
    people_vaccinated_per_hundred: peopleVaccinatedPerHundred = '',
    people_fully_vaccinated: peopleFullyVaccinated,
    people_fully_vaccinated_per_hundred: peopleFullyVaccinatedPerHundred,
  }) => {
    const codeCountry = code(location) || countriesMap[location];

    if (
      !countries.has(codeCountry)
      && peopleVaccinated.trim() !== ''
      && peopleVaccinatedPerHundred.trim() !== ''
      && Number(peopleVaccinatedPerHundred) !== 0
      && codeCountry
      && !forbiddenCode.includes(codeCountry)
    ) {
      countries.set(codeCountry, {
        location,
        date,
        code: codeCountry,
        population: (Number(peopleVaccinated)
        / (Number(peopleVaccinatedPerHundred) / 100)).toFixed(0),
        flag: flag(location) || '🌐',
        peopleVaccinated,
        peopleFullyVaccinated,
        totalVaccinations,
        peopleVaccinatedPerHundred,
        peopleFullyVaccinatedPerHundred,
      });
    }

    if (peopleVaccinated !== '0' && peopleVaccinated !== '' && codeCountry === codeSelectedCountry) {
      selectedCountryVaccinationRecord.push({
        date,
        peopleVaccinated,
        peopleFullyVaccinated,
      });
    }
  });

  const selectedCountry = countries.get(codeSelectedCountry);
  selectedCountry.people_vaccinated_report = selectedCountryVaccinationRecord.reverse();
  countries.delete(codeSelectedCountry);

  return { countries: orderCountries([...countries].map(([_, value]) => value)), selectedCountry };
}

function getDataLocalStorage() {
  const cache = localStorage.getItem(KEY_DATA);
  const countriesInfoFiltered = cache && JSON.parse(decompressFromUTF16(cache));
  return countriesInfoFiltered;
}

function setDataLocalStorage(codeSelectedCountry, countriesInfoFiltered) {
  localStorage.setItem(KEY_DATA, compressToUTF16(JSON.stringify(countriesInfoFiltered)));
  localStorage.setItem(KEY_UPDATED, moment().utc().toISOString());
  localStorage.setItem(KEY_SELECTED, codeSelectedCountry);
  localStorage.setItem(KEY_VERSION, VERSION);
}

function dataLocalStorageIsValid(codeSelectedCountry) {
  const lastUpdate = localStorage.getItem(KEY_UPDATED);
  const previouscodeSelectedCountry = localStorage.getItem(KEY_SELECTED);
  const version = localStorage.getItem(KEY_VERSION);
  if (!lastUpdate) return false;
  if (!previouscodeSelectedCountry) return false;
  if (previouscodeSelectedCountry !== codeSelectedCountry) return false;
  if (moment().diff(lastUpdate, 'days') > 1) return false;
  if (version !== VERSION) return false;
  return true;
}

export default async function getInfoCountries(codeSelectedCountry) {
  if (dataLocalStorageIsValid()) {
    return getDataLocalStorage();
  }

  const countriesInfoJSON = await downloadInfoCountries();
  if (countriesInfoJSON) {
    const countriesInfoFiltered = filterInfoCountries(
      countriesInfoJSON.reverse(), codeSelectedCountry,
    );
    setDataLocalStorage(codeSelectedCountry, countriesInfoFiltered);
    console.log(countriesInfoFiltered);
    return countriesInfoFiltered;
  }

  return getDataLocalStorage();
}
