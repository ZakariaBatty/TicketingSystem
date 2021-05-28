import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//@ STYLE CSS
import './assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/argon-dashboard-react.min.css';

//@ IMPORT FROM FOLDER LAYOUTS
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';
import EmployeeLayout from './layouts/Employee';
import TechnicienLayout from './layouts/Technicien';

import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin/dashboard" component={AdminLayout} />
          <Route exact path="/employee/dashboard" component={EmployeeLayout} />
          <Route exact path="/technicien/dashboard" component={TechnicienLayout} />
          <Route path="/auth" component={AuthLayout} />
          <Redirect from="/" to="/auth/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
