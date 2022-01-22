const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default Reducer;
