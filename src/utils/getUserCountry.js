import axios from 'axios';

import { KEY_SELECTED } from './getInfoCountries';

export default async function getUserCountry() {
  const locationCode = localStorage.getItem(KEY_SELECTED);
  if (locationCode) {
    return {
      countryCode: locationCode,
    };
  }
  const response = await axios.get('http://www.geoplugin.net/json.gp');
  return {
    countryCode: response.data.geoplugin_countryCode,
  };
}
