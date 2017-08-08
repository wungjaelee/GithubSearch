export var searchRepoReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_REPO':
      return action.searchRepo;
    default:
      return state;
  };
};

export var radioReducer = (state = { option1: "name", option2: "desc", option3: 10 }, action) => {
  switch (action.type) {
    case 'SET_OPTION_1':
      return {
        ...state,
        option1: action.payload
      };
    case 'SET_OPTION_2':
      return {
        ...state,
        option2: action.payload
      };
    case 'SET_OPTION_3':
      return {
        ...state,
        option3: parseInt(action.payload)
      };
    default:
      return state;
  };
};

export var githubReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_REPOS':
      return action.payload;
    default:
      return state;
  };
};
