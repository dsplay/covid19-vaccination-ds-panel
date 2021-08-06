import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine,
} from 'recharts';

import locationSchema from '../../schemas/location';
import { formatBigValue } from '../../utils/number';

const renderColorfulLegendText = (value) => <span style={{ color: 'black', fontWeight: 500 }}>{value}</span>;

function GraphDefault({ className, country }) {
  const { t } = useTranslation();
  const fontSize = Number(document.querySelector('html').style.fontSize.toString().replace('px', ''));

  return (
    <div className={className}>
      <div
        style={{
          textAlign: 'center',
          fontSize,
          fontWeight: 800,
        }}
      >
        {t('vaccination over the time')}
      </div>
      <ResponsiveContainer width="100%" height="95%">
        <AreaChart
          width={500}
          height={400}
          data={country.people_vaccinated_report}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Legend
            layout="vertical"
            wrapperStyle={{ left: '15%', textcolo: 'black' }}
            verticalAlign="middle"
            align="center"
            iconType="rect"
            formatter={renderColorfulLegendText}
          />
          <ReferenceLine label="dede" y="120M" />
          <XAxis
            dataKey="date"
            interval={30}
            tickFormatter={(value) => {
              const date = moment(value, 'YYYY-MM-DD');
              return date.format('MMM');
            }}
            style={{
              fontWeight: 800,
              fontSize,
            }}
          />
          <YAxis
            type="number"
            tickFormatter={(value) => {
              if (value === 0) return 0;
              return formatBigValue(value);
            }}
            style={{
              fontWeight: 800,
              fontSize,
            }}
          />
          <Tooltip />
          <Area
            type="stepAfter"
            dataKey="peopleVaccinated"
            name={t('people with at least 1 dose')}
            stackId={1}
            stroke="#7cfc00"
            fill="#7cfc00"
            fillOpacity="1"
            connectNulls
          />
          <Area
            type="stepBefore"
            dataKey="peopleFullyVaccinated"
            stackId={3}
            name={t('people fully vaccinated')}
            fill="#0d730d"
            stroke="#0d730d"
            fillOpacity="1"
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

GraphDefault.propTypes = {
  country: PropTypes.shape(locationSchema).isRequired,
  className: PropTypes.string,
};

GraphDefault.defaultProps = {
  className: '',
};

export default GraphDefault;
