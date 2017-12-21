// React
import React, { Component } from 'react';
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux User Actions
import { AccountActions } from '../../../redux/actions.js';

/**
 * Component that handles the user login. It renders a login form and sends the data to the serve.
 */
class Login extends Component {

  loginHandler(e) {
    e.preventDefault();

    var data = {
      email: this.emailInput.value,
      password: this.passwordInput.value
    }

    if(this.form.checkValidity()) {
      this.props.loginRequest();
      axios.post('/login', data).then( response => {
        this.props.loginSuccess(response.data);
      }).catch( error => {
        this.props.loginFail(error.response.status, error.response.statusText, error.response.data.errors); // Indicates that the fetching has failed
      });
    } else {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      this.emailError.innerHTML = (data.email === "") ? "The email is required" : (!emailReg.test(data.email)) ? "The email format is not valid" : "";
      this.passwordError.innerHTML = (data.password === "") ? "The password is required" : "";
    }

  }

  render() {
    return (
      <div className="col-12 offset-md-3 col-md-6 mt-3">
        <form ref = { (form) => { this.form = form } }>
          <p className="h4 text-center mb-4">Login</p>

          <div className="md-form">
            <i className="fa fa-envelope prefix grey-text"></i>
            <input required type="email" className="form-control" ref = { (input) => this.emailInput = input }/>
            <label>Your email</label>
          </div>

          <div className="text-center red-text mb-4">
            <strong ref = { (strong) => { this.emailError = strong } }></strong>
          </div>

          <div className="md-form">
            <i className="fa fa-lock prefix grey-text"></i>
            <input required type="password" className="form-control" ref = { (input) => this.passwordInput = input }/>
            <label>Your password</label>
          </div>

          <div className="text-center red-text mb-4">
            <strong ref = { (strong) => { this.passwordError = strong } }></strong>
          </div>

          <br/>

          <div className="text-center">
            <button className="btn btn-default" onClick = { this.loginHandler.bind(this) }>
              Login <i className="fa fa-sign-in" aria-hidden="true"></i>
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
    loginRequest() {
      dispatch(AccountActions.loginRequest());
    },

    loginSuccess(user) {
      dispatch(AccountActions.loginSuccess(user));
    },

    loginFail(status, status_text, message) {
      dispatch(AccountActions.loginFail(status, status_text, message));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
