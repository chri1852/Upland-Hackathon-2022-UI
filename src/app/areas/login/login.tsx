import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Container, Row, Col, Image} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import LoginForm from '../../components/LoginFormComponent/LoginForm';
import RegisterForm from '../../components/RegisterFormComponent/RegisterForm';
import { useNavigate } from 'react-router-dom';

interface StateProps {
  authTokenSet: boolean
};

export type LoginProps = StateProps;

export const Login = (props: LoginProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (props.authTokenSet) {
      navigate("/Manage");
    }
  })

  const [pageView, setPageView] = useState("");

  const Login = () => {
    setPageView("Login");
  }

  const renderPageView = () => {
    return (
      <LoginForm />
    );
  }

  return (
    <Container fluid={true} className="login-page-height bg-secondary text-light">
      {renderPageView()}
    </Container>
  )
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    authTokenSet: state.LoginState.authTokenSet
  }
  return stateProps;
}

export default connect(mapStateToProps, null)(Login);
