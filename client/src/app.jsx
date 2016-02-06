/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './components/Categories.jsx';
import Items from './components/Items.jsx';
import Cart from './components/Cart.jsx';

ReactDOM.render(
  <Categories />,
  document.getElementById('categories')
);

ReactDOM.render(
  <Items />,
  document.getElementById('items')
);

ReactDOM.render(
  <Cart />,
  document.getElementById('cart')
);