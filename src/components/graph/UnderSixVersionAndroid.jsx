import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import 'chartjs-adapter-date-fns';

import locationSchema from '../../schemas/location';
import { formatBigValue } from '../../utils/number';

function GraphForOldVersionAndroid({ className, country }) {
  const { t } = useTranslation();
  const fontSize = Number(document.querySelector('html').style.fontSize.toString().replace('px', ''));

  const countryVaccinationRecord = (country) ? country.people_vaccinated_report : [];
  const dates = countryVaccinationRecord
    .map((record) => new Date(record.date));

  const peopleVaccinated = countryVaccinationRecord.map((record) => record.peopleVaccinated);

  const peopleFullyVaccinated = countryVaccinationRecord
    .map((record) => record.peopleFullyVaccinated);

  const data = {
    labels: dates,
    countryVaccinationRecord,
    fill: false,
    datasets: [
      {
        label: t('people fully vaccinated'),
        fill: true,
        data: peopleFullyVaccinated,
        borderColor: 'rgba(13, 115, 13, 1)',
        backgroundColor: 'rgba(13, 115, 13, 1)',
        elements: {
          point: {
            radius: 2,
            borderWidth: 1,
            borderColor: 'black',
          },
        },
      },
      {
        label: t('people with at least 1 dose'),
        fill: true,
        data: peopleVaccinated,
        borderColor: 'rgba( 124, 252, 0, 1 )',
        backgroundColor: 'rgba( 124, 252, 0, 1 )',
        elements: {
          point: {
            radius: 2,
            borderWidth: 1,
          },
        },
      },
    ],
  };

  return (
    <div className={className}>
      <Line
        height={500}
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          interaction: {
            intersect: false,
          },
          title: {
            display: true,
            text: t('vaccination over the time'),
            fontSize,
          },
          legend: {
            display: true,
            position: 'chartArea',
            labels: {
              fontSize: fontSize * 1.3,
            },
          },

          scales: {
            xAxes: [{
              // scaleLabel: {
              //   display: true,
              //   labelString: 'Date',
              // },
              type: 'time',
              time: {
                parser: 'YYYY-MM-DD HH:mm:ss',
                unit: 'month',
                displayFormats: {
                  month: 'MMM',
                },
              },
              ticks: {
                autoSkip: true,
                margin: 10,
                maxRotation: 0,
                minRotation: 0,
                fontSize,
                fontStyle: 'bold',
                callback(value) {
                  return t(value);
                },
              },
            }],
            yAxes: [{
              ticks: {
                fontStyle: 'bold',
                fontSize,
                callback(value) {
                  if (value === 0) return 0;
                  return formatBigValue(value);
                },
              },
            }],
          },
        }}
      />
    </div>
  );
}

GraphForOldVersionAndroid.propTypes = {
  country: PropTypes.shape(locationSchema).isRequired,
  className: PropTypes.string,
};

GraphForOldVersionAndroid.defaultProps = {
  className: '',
};

export default GraphForOldVersionAndroid;
