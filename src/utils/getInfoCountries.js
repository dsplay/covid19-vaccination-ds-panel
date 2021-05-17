import axios from 'axios';
import moment from 'moment';
import { readString as CSVtoJSON } from 'react-papaparse';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { flag, code } from 'country-emoji';

const KEY_DATA = 'data';
const KEY_SELECTED = 'selected';
const KEY_UPDATED = 'updated';

async function downloadInfoCountries() {
  const response = await axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv');
  return CSVtoJSON(response.data, { header: true }).data;
}

function FilterInfoCountries(countriesInfoJSON, codeSelectedCountry) {
  const countries = new Map();

  const selectedCountryVaccinationRecord = [];

  countriesInfoJSON.forEach((line) => {
    if (line.people_vaccinated !== '0' && line.people_vaccinated !== '' && code(line.location)) {
      countries.set(code(line.location), {
        location: line.location,
        date: line.date,
        population: (Number(line.people_vaccinated)
        / (Number(line.people_vaccinated_per_hundred) / 100)).toFixed(0),
        flag: flag(line.location),
        people_vaccinated: line.people_vaccinated,
        people_fully_vaccinated: line.people_fully_vaccinated,
        total_vaccinations: line.total_vaccinations,
        people_vaccinated_per_hundred: line.people_vaccinated_per_hundred,
        people_fully_vaccinated_per_hundred: line.people_fully_vaccinated_per_hundred,
      });
    }

    if (line.people_vaccinated !== '0' && line.people_vaccinated !== '' && code(line.location) === codeSelectedCountry) {
      selectedCountryVaccinationRecord.push({
        date: line.date,
        people_vaccinated: line.people_vaccinated,
        people_fully_vaccinated: line.people_fully_vaccinated,
      });
    }
  });

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

function setDataLocalStorage(codeSelectedCountry, countriesInfoFiltered) {
  localStorage.setItem(KEY_DATA, compressToUTF16(JSON.stringify(countriesInfoFiltered)));
  localStorage.setItem(KEY_UPDATED, moment().utc().toISOString());
  localStorage.setItem(KEY_SELECTED, codeSelectedCountry);
}

function dataLocalStorageIsValid(codeSelectedCountry) {
  const lastUpdate = localStorage.getItem(KEY_UPDATED);
  const previouscodeSelectedCountry = localStorage.getItem(KEY_SELECTED);
  if (!lastUpdate) return false;
  if (!previouscodeSelectedCountry) return false;
  if (previouscodeSelectedCountry !== codeSelectedCountry) return false;
  if (moment().diff(lastUpdate, 'days') > 1) return false;
  return true;
}

export default async function getInfoCountries(codeSelectedCountry) {
  if (dataLocalStorageIsValid()) {
    return getDataLocalStorage();
  }

  const countriesInfoJSON = await downloadInfoCountries();
  if (countriesInfoJSON) {
    const countriesInfoFiltered = FilterInfoCountries(countriesInfoJSON, codeSelectedCountry);
    setDataLocalStorage(codeSelectedCountry, countriesInfoFiltered);
    return countriesInfoFiltered;
  }

  return getDataLocalStorage();
}
