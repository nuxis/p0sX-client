/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './components/Categories.jsx';
import Items from './components/Items.jsx';

ReactDOM.render(
  <Categories />,
  document.getElementById('categories')
);

ReactDOM.render(
  <Items />,
  document.getElementById('items')
);