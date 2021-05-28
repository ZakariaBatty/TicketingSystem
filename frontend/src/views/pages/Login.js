import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { login, profile } from '../../redux/actions/authAction';
import types from '../../redux/types/types';
import { Redirect } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';

const Login = ({ error, currentAuth }) => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });

  //---------
  const [auterror, setAutherror] = useState(null);
  // dispatch
  const dispatch = useDispatch();

  // use Effect get data
  useEffect(() => {
    dispatch(profile());
    if (error && error !== null) {
      setAutherror(error);
      dispatch({ type: types.TOGGLE_SUCCESS });
    }
  }, [dispatch, error]);

  // get value
  function handleInputChange(e) {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  }

  // if click submit
  function handleFormSubmit(event) {
    event.preventDefault();
   
  }

  const showError = () => {
    return (
      auterror && <div className="alert alert-danger rounded-0">{auterror}</div>
    );
  };

  const redirectAuth = () => {
    if (currentAuth.profile && currentAuth.profile.role === 'Admin') {
      return <Redirect to="/admin/dashboard" />;
    } else if (currentAuth.profile && currentAuth.profile.role === 'teck') {
      return <Redirect to="/technicien/dashboard" />;
    } else if (currentAuth.profile && currentAuth.profile.role === 'Employee') {
      return <Redirect to="/employee/dashboard" />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        {/* px-lg-5 py-lg-5 */}
        <Card className="bg-secondary shadow border-0">
          {showError()} {redirectAuth()}
          <CardBody className="">
            <div className="text-muted text-center mt-0 mb-3">
              <small>Sign in with</small>
            </div>
            <Form onSubmit={handleFormSubmit} role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    required
                    type="email"
                    name="email"
                    value={auth.email}
                    onChange={(event) => handleInputChange(event)}
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    required
                    autoComplete="new-password"
                    name="password"
                    value={auth.password}
                    onChange={(event) => handleInputChange(event)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = ({ auth: { error, currentAuth } }) => ({
  error,
  currentAuth,
});

export default connect(mapStateToProps, null)(Login);
