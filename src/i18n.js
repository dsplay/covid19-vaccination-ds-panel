import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const FALLBACK = 'en';

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translations: {},
      },
      es: {
        translations: {
          Country: 'País',
          Loading: 'cargando',
          Population: 'población',
          'Covid-19 Vaccination': 'Vacunación Covid-19',
          'Doses Given': 'Dosis administradas',
          'people with at least 1 dose': 'personas con al menos 1 dosis',
          'people fully vaccinated': 'personas completamente vacunadas',
          'vaccination over the time': 'vacunación a lo largo del tiempo',
          '% at least 1 dose': 'at least 1 dose %',
          '% fully vaccinated': 'completamente vacunado %',
        },
      },
      de: {
        translations: {
          Country: 'Land',
          Loading: 'Wird geladen',
          Population: 'Bevölkerung',
          'Covid-19 Vaccination': 'Covid-19-Impfung',
          'Doses Given': 'Dosierungen gegeben',
          'people with at least 1 dose': 'Menschen mit mindestens 1 Dosis',
          'people fully vaccinated': 'Menschen voll geimpft',
          'vaccination over the time': 'Impfung im Laufe der Zeit',
          '% at least 1 dose': 'mindestens 1 Dosis %',
          '% fully vaccinated': 'voll geimpft %',
        },
      },
      nl: {
        translations: {
          Country: 'Land',
          Population: 'bevolking',
          'Covid-19 Vaccination': 'Covid-19-vaccinatie',
          'Doses Given': 'Gegeven doses',
          'people with at least 1 dose': 'mensen met minstens 1 dosis',
          'people fully vaccinated': 'mensen volledig ingeënt',
          'vaccination over the time': 'vaccinatie in de loop van de tijd',
          '% at least 1 dose': 'minstens 1 dosis %',
          '% fully vaccinated': 'volledig gevaccineerd %',
        },
      },
      it: {
        translations: {
          Country: 'Nazione',
          Population: 'popolazione',
          'Covid-19 Vaccination': 'Vaccinazione Covid-19',
          'Doses Given': 'Dosi somministrate',
          'people with at least 1 dose': 'persone con almeno 1 dose',
          'people fully vaccinated': 'persone completamente vaccinate',
          'vaccination over the time': 'vaccinazione nel tempo',
          '% at least 1 dose': 'almeno 1 dose %',
          '% fully vaccinated': 'completamente vaccinato %',
        },
      },
      pt: {
        translations: {
          Country: 'País',
          Loading: 'Carregando',
          Population: 'População',
          'Covid-19 Vaccination': 'Vacinação COVID-19',
          'Doses Given': 'Doses dadas',
          'people with at least 1 dose': 'pessoas com pelo menos 1 dose',
          'people fully vaccinated': 'pessoas totalmente vacinadas',
          'vaccination over the time': 'vacinação ao longo do tempo',
          '% at least 1 dose': 'pelo menos 1 dose %',
          '% fully vaccinated': 'totalmente vacinados %',
        },
      },
    },
    fallbackLng: FALLBACK,
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
    },

    react: {
      wait: true,
    },
  });

export default i18n;
