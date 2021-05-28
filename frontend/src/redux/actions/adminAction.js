import types from '../types/types';
import axios from 'axios';

axios.defaults.withCredentials = true;

//@URL
const url = 'http://localhost:3301';

//@ DEPARTEMENY
export const departement = (departement) => {
  return (dispatch) => {
    axios
      .post(`${url}/addDepartment`, departement, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: types.DEPARTEMENT,
          message: res.message.data,
        });
      });
  };
};

//@ CREATE EMPLOYEE
export const createEmployee = (employee) => {
  return (dispatch) => {
    axios
      .post(`${url}/createUser`, employee, { withCredentials: true })
      .then((res) => {
        if (res.error.data) {
          dispatch({
            type: types.AUTH_ERROR,
            payload: res.error.data,
          });
        } else {
          dispatch({
            type: types.CREATECOMPTEEMPLOYEE,
            payload: res.message.data,
          });
        }
      });
  };
};

//@ GET ALL DEPARTEMENT
export const getAllDepartement = () => {
  return (dispatch) => {
    axios.get(`${url}/departements`, { withCredentials: true }).then((res) => {
      dispatch({
        type: types.GETALLDEPARTEMENTS,
        payload: res.data,
      });
    });
  };
};

//@ GET ALL DEPARTEMENT
export const getALLTichniciens = () => {
  return (dispatch) => {
    axios.get(`${url}/departement`, { withCredentials: true }).then((res) => {
      dispatch({
        type: types.GETALLTICHNICIENS,
        payload: res.data,
      });
    });
  };
};

//@ GET ALL TICKET
export const getAllTickets = () => {
  return (dispatch) => {
    axios.get(`${url}/tickets`, { withCredentials: true }).then((res) => {
      dispatch({
        type: types.GETALLTICKES,
        payload: res.data,
      });
    });
  };
};

//@ ASSIGN TICKET
export const assignTicket = (assign) => {
  return (dispatch) => {
    axios
      .post(`${url}/assignTicket`, assign, { withCredentials: true })
      .then((res) => {
        if (res.error.data) {
          dispatch({
            type: types.AUTH_ERROR,
            payload: res.error.data,
          });
        } else {
          dispatch({
            type: types.ASSIGNTICKET,
            payload: res.message.data,
          });
        }
      });
  };
};

//@ TICKET HISTORY
export const ticketHistory = () => {
  return (dispatch) => {
    axios.get(`${url}/histiryTicket`, { withCredentials: true }).then((res) => {
      dispatch({
        type: types.HISTORYTICKET,
        payload: res.data,
      });
    });
  };
};
