import types from '../types/types';
import axios from 'axios';

axios.defaults.withCredentials = true;

//@ URL
const url = 'http://localhost:3301';

//@ LOGIN
export const login = (auth) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/login`, auth, {
      withCredentials: true,
    });
    if (res) {
      dispatch({
        type: types.AUTH,
      });
    }
  } catch (err) {
    dispatch({
      type: types.AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};

//@ PROFILE
export const profile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/profile`, { withCredentials: true });
    dispatch({
      type: types.CHECKAUTH,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data.error);
  }
};

//@ LOGOUT
export const logout = () => async (dispatch)=>{
  try {
     await  axios.get(`${url}/logout`, { withCredentials: true });
     dispatch({
        type: types.LOGOUT,
      });
  } catch (err) {
      console.log(err.response.data.error);
  }
} 
