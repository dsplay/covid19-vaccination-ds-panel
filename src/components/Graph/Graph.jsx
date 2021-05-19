import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';

import numberFormatter from '../../utils/NumberFormatter';

function Graph({ className, country }) {
  const countryVaccinationRecord = (country) ? country.people_vaccinated_report : [];
  const dates = countryVaccinationRecord.map((record) => record.date);
  const peopleVaccinated = countryVaccinationRecord.map((record) => record.peopleVaccinated);
  const peopleFullyVaccinated = countryVaccinationRecord
    .map((record) => record.peopleFullyVaccinated);

  const data = {
    labels: dates,
    countryVaccinationRecord,
    fill: false,
    datasets: [
      {
        label: 'people fully vaccinated',
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
        label: 'people vaccinated',
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
          interaction: {
            intersect: false,
          },
          plugins: {
            title: {
              display: true,
              text: 'vaccination over the time',
            },
            legend: {
              display: false,
            },
          },

          scales: {
            x: {
              distribution: 'series',
              ticks: {
                autoSkip: true,
                maxTicksLimit: 6,
                maxRotation: 0,
                minRotation: 0,
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
  country: PropTypes.objectOf(Array).isRequired,
  className: PropTypes.string,
};

Graph.defaultProps = {
  className: '',
};

export default Graph;
