import types from '../types/types';
import axios from 'axios';

axios.defaults.withCredentials = true;

//@ URL
const url = 'http://localhost:3301';

//@ CRETAE TICKET
export const createTicket = (ticket) => {
  return (dispatch) => {
    axios
      .post(`${url}/createTcket`, ticket, { withCredentials: true })
      .then((res) => {
        if (res.error.data) {
          dispatch({
            type: types.AUTH_ERROR,
            payload: res.error.data,
          });
        } else {
          dispatch({
            type: types.CREATETICKET,
            payload: res.message.data,
          });
        }
      });
  };
};

//@ GET ALL TICKET ASSIGNED BY ID
export const getTocketAssignById = () => {
  return (dispatch) => {
    axios.get(`${url}/getAssign`, { withCredentials: true }).then((res) => {
      dispatch({
        type: types.GETTICKENASSIGNTICH,
        payload: res.data,
      });
    });
  };
};

//@ REASSIGNED TICKET OR RESERVED 

export const reassidnedOrRederved = (ticket) => {
    return (dispatch) => {
      axios
        .put(`${url}/changeEtatTicket`, ticket, { withCredentials: true })
        .then((res) => {
          if (res.error.data) {
            dispatch({
              type: types.AUTH_ERROR,
              payload: res.error.data,
            });
          } else {
            dispatch({
              type: types.REASSIGNEDORRESERVED,
              payload: res.message.data,
            });
          }
        });
    };