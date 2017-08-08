var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var Settings = require('Settings');

var actions = require('actions');
var store = require('configureStore').configureStore();

// console.log(Settings, actions, store);
store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);
});

//Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Settings />
  </Provider>,
  document.getElementById('app')
);
