import { CREATE, FETCH_ALL, UPDATE, DELETE } from '../constants/actions';

const taskReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE:
      return [...state, action.payload];
    case FETCH_ALL:
      return [...state, action.payload];
    case UPDATE:
      return state.map((task) => (task._id === action.payload._id ? action.payload : task));
    case DELETE:
      return state.filter((task) => task._id !== action.payload);
    default:
      return state;
  }
};

export default taskReducer;