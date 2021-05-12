import axios from 'axios';
import { readString as CSVtoJSON } from 'react-papaparse';
import CountryBase from '../data/countries.json';

function downloadCSV() {
  return axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv')
    .then((response) => CSVtoJSON(response.data, { header: true }).data);
}

function FilterInfoCountries(json, nameSelectedCountry) {
  const countries = new Map();

  json.forEach((line) => {
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

  json.forEach((line) => {
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

export default function getInfoCountries(selectedCountry) {
  return downloadCSV().then((json) => FilterInfoCountries(json, selectedCountry));
}
