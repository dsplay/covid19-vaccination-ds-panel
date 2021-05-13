import axios from 'axios';
import countriesNames from '../data/countries.json';

export default function getUserCountry() {
  return axios.get('http://www.geoplugin.net/json.gp')
    .then((res) => ({
      countryName: res.data.geoplugin_countryName,
      hasCountry: !!(countriesNames[res.data.geoplugin_countryName]),
    }))
    .catch({
      countryName: null,
      hasCountry: false,
    });
}
