// React
import React, { Component } from 'react';
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux User Actions
import { AccountActions } from '../../../redux/actions.js';

class Register extends Component {

  registerHandler(e) {
    e.preventDefault();

    const data = {
      name: this.nameInput.value,
      email: this.emailInput.value,
      password: this.passwordInput.value,
      password_confirmation: this.passwordConfirmationInput.value,
    }

    if(this.form.checkValidity() && data.password === data.password_confirmation) {
      this.props.registerRequest();
      axios.post('/register',data).then( response => {
        this.props.registerSuccess(response.data);
      }).catch( error => {
        this.props.registerFail(error.response.status, error.response.statusText, error.response.data.errors); // Indicates that the fetching has failed
      });
    } else {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      this.nameError.innerHTML = (data.name === "") ? "The name is required" : "";
      this.emailError.innerHTML = (data.email === "") ? "The email is required" : (!emailReg.test(data.email)) ? "The email format is not valid" : "";
      this.passwordError.innerHTML = (data.password.length < 6) ? "The password must be at least 6 characters long" : "";
      this.passwordError.innerHTML = (data.password === "") ? "The password is required" : "";
      this.passwordConfirmationError.innerHTML = (data.password_confirmation.length < 6) ? "The password confirmation must be at least 6 characters long" : "";
      this.passwordConfirmationError.innerHTML = (data.password_confirmation === "") ? "The password confirmation is required" : "";
      this.passwordConfirmationError.innerHTML = (data.password !== data.password_confirmation) ? "The password and the password confirmation must be the same" : "";
    }

  }

  render() {
    return (
      <div className="col-12 offset-md-3 col-md-6 mt-3">
        <form ref = { (form) => { this.form = form } }>
          <p className="h4 text-center mb-4">Register</p>

          <div className="md-form">
            <i className="fa fa-user prefix grey-text"></i>
            <input required type="text" className="form-control" ref = { (input) => { this.nameInput = input } }/>
            <label>Your name</label>
          </div>

          <div className="text-center red-text mb-4">
            <strong ref = { (strong) => { this.nameError = strong } }></strong>
          </div>

          <div className="md-form">
            <i className="fa fa-envelope prefix grey-text"></i>
            <input required type="email" className="form-control" ref = { (input) => { this.emailInput = input } }/>
            <label>Your email</label>
          </div>

          <div className="text-center red-text mb-4">
            <strong ref = { (strong) => { this.emailError = strong } }></strong>
          </div>

          <div className="md-form">
            <i className="fa fa-lock prefix grey-text"></i>
            <input required type="password" className="form-control" ref = { (input) => { this.passwordInput = input } }/>
            <label>Your password</label>
          </div>

          <div className="text-center red-text mb-4">
            <strong ref = { (strong) => { this.passwordError = strong } }></strong>
          </div>

          <div className="md-form">
            <i className="fa fa-lock prefix grey-text"></i>
            <input required type="password" className="form-control" ref = { (input) => { this.passwordConfirmationInput = input } }/>
            <label>Confirm your password</label>
          </div>

          <div className="text-center red-text mb-4">
            <strong ref = { (strong) => { this.passwordConfirmationError = strong } }></strong>
          </div>

          <div className="text-center">
            <button className="btn btn-deep-orange" onClick = { this.registerHandler.bind(this) }>
              Sign up <i className="fa fa-user-plus" aria-hidden="true"></i>
            </button>
          </div>

        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {

    registerRequest() {
      dispatch(AccountActions.registerRequest());
    },

    registerSuccess(user) {
      dispatch(AccountActions.registerSuccess(user));
    },

    registerFail(status, status_text, message) {
      dispatch(AccountActions.registerFail(status, status_text, message));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
