import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Foot({ date }) {
  return (
    <div className="wrapper-footer align-text-center">
      {`From Our World in Data - Last Updated: ${moment(date).fromNow()}`}
    </div>
  );
}

Foot.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Foot;
