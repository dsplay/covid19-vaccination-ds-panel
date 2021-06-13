import axios from 'axios';

import { KEY_LOCATION, dataLocalStorageIsValid } from './getInfoCountries';

export default async function getUserCountry() {
  try {
    const locationCode = localStorage.getItem(KEY_LOCATION);
    if (dataLocalStorageIsValid()) {
      return locationCode;
    }
    const response = await axios.get('http://www.geoplugin.net/json.gp');
    localStorage.setItem(KEY_LOCATION, response.data.geoplugin_countryCode);
    return response.data.geoplugin_countryCode;
  } catch (error) {
    return 'World';
  }
}
