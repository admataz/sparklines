import React from 'react';
import ReactDom from 'react-dom';
import App from './js/App';
import style from './style/main.scss';

const d = document.getElementById('app');


if (d) {
  ReactDom.render(React.createElement(App), d);
}
