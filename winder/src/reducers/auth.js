import * as actions from '../constants/actions';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actions.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actions.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;