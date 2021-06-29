![DSPLAY - Digital Signage](https://developers.dsplay.tv/assets/images/dsplay-logo.png)

# COVID-19 Vaccination Panel for Digital Signage

This project renders a DigitalSignage-ready Panel with COVID-19 Vaccination data. The panel is responvive (works from 360p to 4k resolutions) and fullscreen without scrolling.

## How to Use

Just copy & paste the panel URL into your Digital Signage software, or even in a web browser.

Panel URL
```
https://covid19-vac.dsplay.tv
```

> If you don't have a Digital Signage software, consider using [DSPLAY - Digital Signage](https://dsplay.tv)

## Configuration

By default the panel will show the vaccination data for the user's country based on it's location/IP, if data for that country is available.

If we do not have data for user's country the world (global) data will be shown instead.

### Specifying the location

You are able to force the location to be shown in the main area by passing the `location` parameter on the query string.

If you want to show data from Portugal, for example, use the following URL:
```
https://covid19-vac.dsplay.tv?location=pt
```

You can get the available locations [here](locations.md)

### Specifying the language

By default the language is set by your locale, if your language is not supported we will use English.

You are able to force the language to be shown in the main area by passing the `lng` parameter on the query string. Available languages and code to use in parameter are: 
- portuguese - pt,
- italian - it,
- dutch - nl,
- french - fr, 
- spanish - es,
- german - de,

Default language is english but 

If you want to show data from Portugal, for example, use the following URL:
```
https://covid19-vac.dsplay.tv?location=pt
```

You can get the available locations [here](locations.md)

### Specifying the page duration for the table

You can modify the page duration (default is 12s) for the complementary table by using the `pageDuration` query string parameter.

If you want to show data from Germany with a 15s page duration, for example, use the following URL:
```
https://covid19-vac.dsplay.tv?location=de&pageDuration=15
```

## References

This project uses data from https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Build status

[![Netlify Status](https://api.netlify.com/api/v1/badges/1d98aafa-b024-4398-8a37-0525521c069e/deploy-status)](https://app.netlify.com/sites/dsplay-covid19-vac/deploys)
