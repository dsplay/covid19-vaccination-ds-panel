import axios from 'axios';

export default async function getUserCountry() {
  const response = await axios.get('http://www.geoplugin.net/json.gp');
  return {
    countryCode: response.data.geoplugin_countryCode,
  };
}
