export var setSearchRepo = (searchRepo) => {
  return {
    type: "SET_SEARCH_REPO",
    searchRepo
  };
};

export var setOption1 = (option) => {
  return {
    type: "SET_OPTION_1",
    payload: option
  };
};

export var setOption2 = (option) => {
  return {
    type: "SET_OPTION_2",
    payload: option
  };
};

export var setOption3 = (option) => {
  return {
    type: "SET_OPTION_3",
    payload: option
  };
};

export var getRepos = (queryString, sort, order) => {
  return {
    type: "GET_REPOS",
    payload: { queryString, sort, order }
  }
}
