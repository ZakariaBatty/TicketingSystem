import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import adminReducer from './admin/adminReducer';
import employeeReducer from './employee/employeeReducer';

//@ CREATE ROOT
const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  employee: employeeReducer,
});

export default rootReducer;
