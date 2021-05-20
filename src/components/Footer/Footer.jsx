import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Foot({ date }) {
  return (
    <>
      {`From Our World in Data - Last Updated: ${moment(date).fromNow()}`}
    </>
  );
}

Foot.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Foot;