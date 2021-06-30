/* eslint-disable  import/prefer-default-export */
import axios from 'axios';

import { KEY_LOCATION, isLocalStorageDataValid } from './vaccination-data';

export async function detectUserLocation() {
  try {
    const locationCode = localStorage.getItem(KEY_LOCATION);
    if (isLocalStorageDataValid()) {
      return locationCode;
    }
    const response = await axios.get('https://manager.dsplay.tv/service/getMyIpInfo');
    localStorage.setItem(KEY_LOCATION, response.data.geoplugin_countryCode);
    return response.data.geoplugin_countryCode;
  } catch (error) {
    return 'World';
  }
}
