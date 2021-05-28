import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import 'chartjs-adapter-date-fns';

import ObjectValidateCountry from '../../utils/ObjectValidateCountry';
import numberFormatter from '../../utils/NumberFormatter';

function Graph({ className, country }) {
  const { t } = useTranslation();

  const legendSize = Number(document.querySelector('html').style.fontSize.toString().replace('px', '')) * 1.3;

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
            radius: 0,
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
            radius: 0,
          },
        },
      },
    ],
  };

  return (
    <div className={className}>
      <Line
        width={100}
        height={100}
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          interaction: {
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: t('vaccination over the time'),
            },
            legend: {
              display: true,
              position: 'chartArea',
              labels: {
                font: {
                  size: legendSize,
                },
              },
            },
          },

          scales: {
            x: {
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
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
                fontSize: 20,
                callback(value) {
                  return t(value);
                },
              },
            },
            y: {
              ticks: {
                callback(value) {
                  if (value === 0) return 0;
                  return numberFormatter(value);
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

Graph.propTypes = {
  country: PropTypes.shape(ObjectValidateCountry).isRequired,
  className: PropTypes.string,
};

Graph.defaultProps = {
  className: '',
};

export default Graph;
