import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Form, Button, Row, Col} from 'react-bootstrap'
import React, { useState } from 'react';
import PostRegisterResponse from '../../common/types/messages/PostRegisterRequest';
import { registerUser, updateRegisterForm, clearUser } from '../../store/actions/loginActions';
import { VerifyProp } from '../VerifyPropComponent/VerifyProp';
import './RegisterForm.css';
import PostClearUserRequest from '../../common/types/messages/PostClearUserRequest';
import { VerifyError } from '../VerifyErrorComponent/VerifyError';

interface StateProps {
  uplandUsername: string;
  verifyPropAddress: string;
  verifyPropPrice: number;
  isLoading: boolean;
  verificationNeeded: boolean;
  hasError: boolean;
  errorMessage: string;
}

interface DispatchProps {
  registerUser: (payload: PostRegisterResponse) => void;
  clearUser: (payload: PostClearUserRequest) => void;
  updateRegisterForm: (payload: string) => void;
}

export type RegisterFormProps = DispatchProps & StateProps;

export const RegisterForm = (props: RegisterFormProps) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formValidMessage, setFormValidMessage] = useState('');


  const register = () => {
    if (!props.verificationNeeded) {
      props.registerUser({username: props.uplandUsername, password: "empty"} as PostRegisterResponse);
    } else {
      if (validatePasswords()) {
        props.registerUser({username: props.uplandUsername, password: password} as PostRegisterResponse);
      }
    }
  }

  const validatePasswords = () => {
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

  const renderError = () => {
    if (props.hasError) {
      return (
        <VerifyError message={props.errorMessage} />
      );
    }
  }

  const renderFormError = () => {
    if (formValidMessage !== '') {
      return (
        <VerifyError message={formValidMessage} />
      );
    }
  }

  const handleEnterKeyPress = (changeEvent: React.KeyboardEvent<HTMLInputElement>) => {
    if (changeEvent.key === 'Enter') {
      register();
    }
  }

  const updatePassword = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(changeEvent.currentTarget.value);
  } 

  const updateConfirmPassword = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(changeEvent.currentTarget.value);
  } 

  const renderRegisterPartTwo = () => {
    if (props.verificationNeeded) {
      return (
        <div>
          <VerifyProp uplandUsername={props.uplandUsername} address={props.verifyPropAddress} price={props.verifyPropPrice} />
          <Form.Group className="register-margin">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={updatePassword}/>
          </Form.Group>
          <Form.Group className="register-margin">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" onKeyPress={handleEnterKeyPress} onChange={updateConfirmPassword}/>
          </Form.Group>
          <Form.Group className="register-margin">
            <Button variant="dark" disabled={props.isLoading} onClick={register}>{getRegisterButtonText()}</Button>
            <Button className="float-end" disabled={props.isLoading} variant="dark" onClick={callClearUser}>Clear</Button>
          </Form.Group>
        </div>
      );
    } else {
      return (
        <Form.Group className="register-margin">
          <Button variant="dark" disabled={props.isLoading || formValidMessage !== ''} onClick={register}>{getRegisterButtonText()}</Button>
        </Form.Group>
      );
    }
  }

  const getRegisterButtonText = () => {
    if (props.verificationNeeded) {
      return "Verify";
    } else {
      return "Register";
    }
  }

  const updateUsernameInState = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    props.updateRegisterForm(changeEvent.currentTarget.value);
  } 

  const callClearUser = () => {
    props.clearUser({
      username: props.uplandUsername,
      type: "WEB"
    });
  } 
  
  return (
    <Row>
      <Col xs></Col>
      <Col xs>
        <h1 className="text-center">Register</h1>
        <p className="text-center">Enter Your Upland Username below, Click Register, and Follow the Instructions.</p>
        <Form onSubmit={e => {e.preventDefault()}}>
          <Form.Group className="register-margin">
            <Form.Label>Upland Username</Form.Label>
            <Form.Control type="text" value={props.uplandUsername} onKeyPress={handleEnterKeyPress} onChange={updateUsernameInState}/>
          </Form.Group>
          {renderError()}
          {renderFormError()}
          {renderRegisterPartTwo()}
        </Form>
      </Col>
      <Col xs></Col>
    </Row>
  );
}

export const mapStateToProps = (state: AppState) => {
  const stateProps: StateProps = {
    uplandUsername: state.LoginState.uplandUsername,
    verifyPropAddress: state.LoginState.verifyPropAddress,
    verifyPropPrice: state.LoginState.verifyPropPrice,
    isLoading: state.LoginState.isLoading,
    verificationNeeded: state.LoginState.verificationNeeded,
    hasError: state.LoginState.hasError,
    errorMessage: state.LoginState.errorMessage,
  }
  return stateProps;
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const dispatchProps: DispatchProps = {
    registerUser: (payload: PostRegisterResponse) => dispatch(registerUser(payload)),
    clearUser: (payload: PostClearUserRequest) => dispatch(clearUser(payload)),
    updateRegisterForm: (payload: string) => dispatch(updateRegisterForm(payload))
  }

  return dispatchProps;
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);