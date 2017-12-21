import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { connect } from 'react-redux';

import { AccountActions } from '../../redux/actions.js';

const Authenticated = ({ match, user, logout }) => {
  return (
    <div className="jumbotron">

      <h1>{ user.name } <button className="btn btn-danger float-right" onClick = { logout }>Logout <i className="fa fa-sign-out" aria-hidden="true"></i></button></h1>
      <small>Email:</small> <strong>{ user.email }</strong> <br/>
      <small>User since:</small> <strong>{ user.created_at }</strong> <br/>

      <div className="text-right">
        <Link to = { `/profiles/${user.email}/show` }>
          <button className="btn btn-outline-success btn-sm">View My Profile</button>
        </Link>
      </div>



      <hr/>

    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(AccountActions.logoutRequest());
      axios.post('/logout').then( response => {
        dispatch(AccountActions.logoutSuccess());
      }).catch( error => {
        dispatch(AccountActions.logoutFail(error.response.status, error.response.statusText, error.response.data.message));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
