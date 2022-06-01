import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Form, Button, Row, Col} from 'react-bootstrap'
import React, { useState } from 'react';
import { login, resetPassword, updateRegisterForm } from '../../store/actions/loginActions';
import PostLoginRequest from '../../common/types/messages/PostLoginRequest';
import PostResetPasswordRequest from '../../common/types/messages/PostResetPasswordRequest';
import { VerifyError } from '../VerifyErrorComponent/VerifyError';
import { VerifyProp } from '../VerifyPropComponent/VerifyProp';
import './LoginForm.css';

interface DispatchProps {
  login: (payload: PostLoginRequest) => void;
  resetPassword: (payload: PostResetPasswordRequest) => void;
  updateRegisterForm: (payload: string) => void;
}

interface StateProps {
  uplandUsername: string,
  isLoading: boolean,
  hasError: boolean,
  errorMessage: string,
  verifyPropAddress: string,
  verifyPropPrice: number,
  authTokenSet: boolean,
  mustEnterCode: boolean,
  otpCode: string,
}

export type LoginFormProps = DispatchProps & StateProps;

export const LoginForm = (props: LoginFormProps) => {
  const [password, setPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('123456');
  const [formValidMessage, setFormValidMessage] = useState('');
  const [isResetState, setIsResetState] = useState(false);

  const updateUsernameInState = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setIsResetState(false);
    props.updateRegisterForm(changeEvent.currentTarget.value);
  } 

  const handleErrorRegisterClick = () => {
    props.updateRegisterForm(props.uplandUsername);
  }

  const renderError = () => {
    if (props.mustEnterCode) {
      return (
        <div className="verify-prop-container bg-danger shadow-sm">
          <div>Enter 3rd Party Code in Upland: {props.otpCode}</div>
        </div>
      );
    }
  }

  const renderFormError = () => {
    if (isResetState && formValidMessage !== '') {
      return (
        <VerifyError message={formValidMessage} />
      );
    }
  }

  const renderOTP = () => {
    if (props.mustEnterCode) {
      <VerifyError message={"Enter 3rd Party Link in Upland: " + props.otpCode} />
    }
  }

  const validatePasswords = () => {
    if (props.uplandUsername === '') {
      setFormValidMessage('Username required');
      return false;
    }
    if (password !== '' && confirmPassword !== '') {
      if (password === confirmPassword) {
        setFormValidMessage('');
        return true;
      } else {
        setFormValidMessage('Passwords must match');
      }
    } else {
      setFormValidMessage('Passwords must not be empty');
    }

    return false;
  }

  const updatePassword = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(changeEvent.currentTarget.value);
  } 

  const updateConfirmPassword = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(changeEvent.currentTarget.value);
  } 

  const handleEnterKeyPress = (changeEvent: React.KeyboardEvent<HTMLInputElement>) => {
    if (changeEvent.key === 'Enter') {
      callLogin();
    }
  }

  const getResetPasswordButtonText = () => {
    if (isResetState) {
      return "Clear";
    } else {
      return "Reset Password";
    }
  }

  const getLoginButtonText = () => {
    if (isResetState) {
      return "Verify";
    } else {
      return "Login";
    }
  }
  
  const callLogin = () => {
    if (isResetState) {
      if (validatePasswords()) {
        props.resetPassword({ username: props.uplandUsername, password: password, isClearRequest: false } as PostResetPasswordRequest);
      }
    } else {
      props.login({username: props.uplandUsername, password: password} as PostLoginRequest);
    }
  }

  const callResetPassword = () => {
    if (isResetState) {
      props.resetPassword({ username: props.uplandUsername, password: "empty", isClearRequest: true } as PostResetPasswordRequest);
    } else {
      props.resetPassword({ username: props.uplandUsername, password: "empty", isClearRequest: false } as PostResetPasswordRequest);
      setIsResetState(true);
    }
  }

  return (
    <Row>
      <Col xs></Col>
      <Col xs>
        {renderError()}
        {renderFormError()}
        {renderOTP()}
        <Form>
          <Form.Group className="login-margin formGroup-padding">
            <Form.Label>Upland Username</Form.Label>
            <Form.Control type="text" value={props.uplandUsername} onChange={updateUsernameInState} onKeyPress={handleEnterKeyPress}/>
          </Form.Group>
          <Form.Group className="login-margin formGroup-padding">
            <Button variant="dark" disabled={props.isLoading} onClick={callLogin}>{getLoginButtonText()}</Button>
            <Button className="float-end" variant="dark" disabled={props.isLoading || props.uplandUsername.length < 1} onClick={callResetPassword}>{getResetPasswordButtonText()}</Button>
          </Form.Group>
        </Form>
      </Col>
      <Col xs></Col>
    </Row>
  );
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    uplandUsername: state.LoginState.uplandUsername,
    isLoading: state.LoginState.isLoading,
    hasError: state.LoginState.hasError,
    errorMessage: state.LoginState.errorMessage,
    verifyPropAddress: state.LoginState.verifyPropAddress,
    verifyPropPrice: state.LoginState.verifyPropPrice,
    authTokenSet: state.LoginState.authTokenSet,
    mustEnterCode: state.LoginState.mustEnterCode,
    otpCode: state.LoginState.otpCode,
  }
  return stateProps;
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    login: (payload: PostLoginRequest) => dispatch(login(payload)),
    resetPassword: (payload: PostResetPasswordRequest) => dispatch(resetPassword(payload)),
    updateRegisterForm: (payload: string) => dispatch(updateRegisterForm(payload))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
