import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}

ReactDOM.render(<App />, document.getElementById('root'));
