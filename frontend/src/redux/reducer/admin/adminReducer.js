import types from '../../types/types';

const initialState = {
  error: null,
  message: null,
  departments: [],
  tichniciens: [],
  tickets: [],
  history: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DEPARTEMENT:
      return {
        ...state,
        message: action.payload,
      };
    case types.CREATECOMPTEEMPLOYEE:
      return {
        ...state,
        message: action.payload,
      };
    case types.GETALLDEPARTEMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case types.GETALLTICHNICIENS:
      return {
        ...state,
        tichniciens: action.payload,
      };
    case types.GETALLTICKES:
      return {
        ...state,
        tickets: action.payload,
      };
    case types.ASSIGNTICKET:
      return {
        ...state,
        message: action.payload,
      };
    case types.HISTORYTICKET:
      return {
        ...state,
        history: action.payload,
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

export default adminReducer;
