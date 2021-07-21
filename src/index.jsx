import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'es6-proxy-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './index.sass';
import './utils/font-size';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
