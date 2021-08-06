import React from 'react';
import PropTypes from 'prop-types';
import { osVersion, isAndroid } from 'react-device-detect';
import locationSchema from '../../schemas/location';
import GraphForOldVersionAndroid from './UnderSixVersionAndroid';
import GraphDefault from './default';

const regex = /^0*[1-6]./;

function Graph({ className, country }) {
  if (isAndroid && regex.test(osVersion)) {
  // if (!isAndroid || (isAndroid && regex.test(osVersion))) {
    return <GraphForOldVersionAndroid className={className} country={country} />;
  }

  return <GraphDefault className={className} country={country} />;
}

Graph.propTypes = {
  country: PropTypes.shape(locationSchema).isRequired,
  className: PropTypes.string,
};

Graph.defaultProps = {
  className: '',
};

export default Graph;
