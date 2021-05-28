import types from '../../types/types';

const initialState = {
  currentAuth: [],
  error: null,
  success: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH:
      return {
        ...state,
        error: null,
        success: true,
      };
    case types.CHECKAUTH:
      return {
        ...state,
        currentAuth: action.payload,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case types.TOGGLE_SUCCESS:
      return {
        ...state,
        error: null,
        success: false,
      };
    default:
      return state;
  }
};

export default authReducer;
