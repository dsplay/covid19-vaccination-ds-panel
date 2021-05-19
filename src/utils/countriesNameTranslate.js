import enIsoCountries from 'i18n-iso-countries/langs/en.json';
import ptIsoCountries from 'i18n-iso-countries/langs/pt.json';
import deIsoCountries from 'i18n-iso-countries/langs/de.json';
import nlIsoCountries from 'i18n-iso-countries/langs/nl.json';
import itIsoCountries from 'i18n-iso-countries/langs/it.json';
import esIsoCountries from 'i18n-iso-countries/langs/es.json';
import i18nIsoCountries from 'i18n-iso-countries';
import { useTranslation } from 'react-i18next';

i18nIsoCountries.registerLocale(enIsoCountries);
i18nIsoCountries.registerLocale(ptIsoCountries);
i18nIsoCountries.registerLocale(deIsoCountries);
i18nIsoCountries.registerLocale(nlIsoCountries);
i18nIsoCountries.registerLocale(itIsoCountries);
i18nIsoCountries.registerLocale(esIsoCountries);

function formatAbbreviationLanguage(language) {
  return language.split('-')[0];
}

export default function translateCountryName(language, codeCountry) {
  return i18nIsoCountries.getName(codeCountry, formatAbbreviationLanguage(language));
}

export function translateManyNameCountries(language, countries) {
  const { t } = useTranslation();

  return countries.map((country) => ({
    ...country,
    location: translateCountryName(language, country.code) || t(country.location),
  }));
}
