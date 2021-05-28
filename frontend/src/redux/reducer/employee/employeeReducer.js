import types from '../../types/types';

const initialState = {
  error: null,
  message: null,
  ticketbytich: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATETICKET:
      return {
        ...state,
        message: action.payload,
      };
    case types.GETTICKENASSIGNTICH:
      return {
        ...state,
        ticketbytich: action.payload,
      };
    case types.REASSIGNEDORRESERVED:
      return {
        ...state,
        message: action.payload,
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
