import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';

function Graph({ data }) {
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
        }}
      />
    </>
  );
}

Graph.propTypes = {
  data: PropTypes.objectOf.isRequired,
};

export default Graph;
