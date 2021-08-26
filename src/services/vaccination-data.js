import axios from 'axios';
import moment from 'moment';
import { readString as CSVtoJSON } from 'react-papaparse';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { flag, code } from 'country-emoji';

const KEY_DATA = 'data';
const KEY_SELECTED = 'selected';
const KEY_UPDATED = 'updated';
const KEY_VERSION = 'version';
const VERSION = '1.8.2';

const COUNTRIES_LIMIT = 20;

const countriesMap = {
  World: 'World',
};

const forbiddenCodes = ['EU'];

export const KEY_LOCATION = 'location';

async function fetchVaccinationData() {
  const response = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv');
  return CSVtoJSON(response.data, { header: true }).data;
}

function sortCountries(countries) {
  return countries.map((country) => {
    [country.peopleFullyVaccinatedPerHundred] = country.peopleFullyVaccinatedPerHundred.split('.');
    [country.peopleVaccinatedPerHundred] = country.peopleVaccinatedPerHundred.split('.');
    return country;
  }).sort(
    (countryA, countryB) => {
      if (countryA.code === 'World') return -1;
      if (countryB.code === 'World') return 1;
      if (countryB.peopleFullyVaccinatedPerHundred !== countryA.peopleFullyVaccinatedPerHundred) {
        return countryB.peopleFullyVaccinatedPerHundred - countryA.peopleFullyVaccinatedPerHundred;
      } if (countryB.peopleVaccinatedPerHundred !== countryA.peopleVaccinatedPerHundred) {
        return countryB.peopleVaccinatedPerHundred - countryA.peopleVaccinatedPerHundred;
      }
      return countryB.totalVaccinations - countryA.totalVaccinations;
    },
  ).slice(0, COUNTRIES_LIMIT);
}

function filterVaccinationData(vaccinationData, selectedCountryCode) {
  const countries = new Map();
  const selectedCountryVaccinationRecord = [];
  const worldVaccinationRecord = [];

  vaccinationData.forEach(({
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
      && !forbiddenCodes.includes(codeCountry)
      && parseFloat(peopleVaccinatedPerHundred) < 100
      && parseFloat(peopleFullyVaccinatedPerHundred) < 100
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

    if (peopleVaccinated !== '0' && peopleVaccinated !== '' && (codeCountry === selectedCountryCode)) {
      selectedCountryVaccinationRecord.push({
        date,
        peopleVaccinated,
        peopleFullyVaccinated,
      });
    }

    if (peopleVaccinated !== '0' && peopleVaccinated !== '' && (codeCountry === countriesMap.World)) {
      worldVaccinationRecord.push({
        date,
        peopleVaccinated,
        peopleFullyVaccinated,
      });
    }
  });

  let selectedCountry;
  if (countries.has(selectedCountryCode)) {
    selectedCountry = countries.get(selectedCountryCode);
    selectedCountry.people_vaccinated_report = selectedCountryVaccinationRecord.reverse();
    countries.delete(selectedCountryCode);
  } else {
    selectedCountry = countries.get(countriesMap.World);
    selectedCountry.people_vaccinated_report = worldVaccinationRecord.reverse();
    countries.delete(countriesMap.World);
  }

  return {
    countries: sortCountries([...countries].map(([_, value]) => value)),
    selectedCountry,
  };
}

function getLocalStorageData() {
  const cache = localStorage.getItem(KEY_DATA);
  const countriesInfoFiltered = cache && JSON.parse(decompressFromUTF16(cache));
  return countriesInfoFiltered;
}

function setLocalStorageData(selectedLocationCode, vaccinationData) {
  localStorage.setItem(KEY_DATA, compressToUTF16(JSON.stringify(vaccinationData)));
  localStorage.setItem(KEY_UPDATED, moment().utc().toISOString());
  localStorage.setItem(KEY_SELECTED, selectedLocationCode);
  localStorage.setItem(KEY_VERSION, VERSION);
}

export function isLocalStorageDataValid(selectedCountryCode) {
  const locationCode = localStorage.getItem(KEY_LOCATION);
  if (!locationCode) return false;

  const lastUpdate = localStorage.getItem(KEY_UPDATED);
  if (!lastUpdate) return false;
  if (moment().diff(lastUpdate, 'hours') > 12) return false;

  const previouscodeSelectedCountry = localStorage.getItem(KEY_SELECTED);
  if (!previouscodeSelectedCountry) return false;
  if (previouscodeSelectedCountry !== selectedCountryCode) return false;

  const version = localStorage.getItem(KEY_VERSION);
  if (version !== VERSION) return false;

  return true;
}

export async function getVaccinationData(selectedCountryCode) {
  if (isLocalStorageDataValid(selectedCountryCode)) {
    return getLocalStorageData();
  }

  const vaccinationData = await fetchVaccinationData();
  if (vaccinationData) {
    const filteredVaccinationData = filterVaccinationData(
      vaccinationData.reverse(), selectedCountryCode,
    );
    setLocalStorageData(selectedCountryCode, filteredVaccinationData);
    return filteredVaccinationData;
  }

  return getLocalStorageData();
}
