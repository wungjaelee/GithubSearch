var redux = require('redux');
var { searchRepoReducer, radioReducer, githubReducer } = require('reducers');

export var configureStore = () => {
  var reducer = redux.combineReducers({
    searchRepo: searchRepoReducer,
    radio: radioReducer,
    repos: githubReducer,
  });

  var store = redux.createStore(reducer);

  return store;
};
