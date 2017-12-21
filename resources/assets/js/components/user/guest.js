import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from './partials/login.js';
import Register from './partials/register.js';


export default () => {
  return(
    <div className="jumbotron">
      <div className="row">

        <Login />

        <div className="col-12">
          <hr/>
        </div>

        <Register />

      </div>
    </div>
  );
}
