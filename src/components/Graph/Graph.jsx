import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';

import numberFormatter from '../../utils/NumberFormatter';

function Graph({ country }) {
  console.log(country);
  const countryVaccinationRecord = (country) ? country.people_vaccinated_report : [];
  const dates = countryVaccinationRecord.map((record) => record.date);
  const peopleVaccinated = countryVaccinationRecord.map((record) => record.people_vaccinated);
  const peopleFullyVaccinated = countryVaccinationRecord
    .map((record) => record.people_fully_vaccinated);
  const data = {
    labels: dates,
    countryVaccinationRecord,
    fill: false,
    datasets: [
      {
        label: 'people vaccinated',
        fill: false,
        data: peopleVaccinated,
        borderColor: 'rgba( 124, 252, 0, 1 )',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      {
        label: 'people fully vaccinated',
        fill: false,
        data: peopleFullyVaccinated,
        borderColor: 'rgba( 124, 0, 0, 1 )',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    ],
  };

  return (
    <>
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
              max: 80,
              min: 0,
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
    </>
  );
}

Graph.propTypes = {
  country: PropTypes.objectOf(Array).isRequired,
};

export default Graph;
