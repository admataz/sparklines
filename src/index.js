import React from 'react';
import ReactDom from 'react-dom';
import App from './js/App';
import style from './style/main.scss';

const d = document.getElementById('app');


if (d) {
  ReactDom.render(<App defaultInput="8.9 7.9 14.2 15.4 18.1 19.1 21.7 20.8 19.6 14.9 10.8 8.8 8.5 10.4 9.3 16.2 17.1 22.0 25.1 23.9 22.8 17.0 10.2 9.2 " />, d);
}
