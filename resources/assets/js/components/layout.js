import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './layout.css';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import store from '../redux/store.js';

import { AccountActions } from '../redux/actions.js';
import { UIActions } from '../redux/actions.js';

// Common Components
import Navbar from './common/navbar.js';
import Loading from './common/loading.js';
import ErrorView from './common/error.js';

// Users Components
import GuestUser from './user/guest.js';
import AuthenticatedUser from './user/authenticated.js';

// Posts Components
import PostShow from './posts/show.js';
import PostsPaginator from './posts/paginator.js';

// Categories Components
import CategoriesIndex from './categories/index.js';

// Profile Components
import ProfileShow from './profiles/show.js';

class Layout extends Component {

  refreshSession() {
    axios.get('/currentuser').then( response => {
      var user = response.data;
      if(user)
        this.props.loginSuccess(user);
      else
        this.props.logoutSuccess();
    });
  }

  componentWillMount() {
    console.log("Refreshing session");
    this.refreshSession();
    setInterval(() => {
      this.refreshSession();
      console.log("Refreshing session");
    },1000 * 60 * 60); // Sets the interval to 1 hour (session lasts 2 hours, so the app will work fine if the user is AFK)
  }

  render() {
    return (
      <Router>
        <div id = "layout">
          <Route path="*" component = { Navbar } /> {/* Its placed in a Route so it receives the (necesary) match prop */}
          <div className="container py-4">

            <Loading />
            <ErrorView />

            <Route exact path = "/account" component = { this.props.authenticated ? AuthenticatedUser : GuestUser } />

            <Route exact path = "/posts"  component = { PostsPaginator } />
            <Route exact path = {`/posts/:slug/show`} component = { PostShow }/>

            <Route exact path = "/categories" component = { CategoriesIndex } />
            <Route exact path = {`/categories/:slug/show`}  component = { PostsPaginator } />

            <Route exact path = {`/profiles/:email/show`}  component = { ProfileShow } />

            <Link to = "/posts/create">
              <button className="btn btn-success btn-new-post">+</button>
            </Link>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {

    loginSuccess(user) {
      dispatch(AccountActions.loginSuccess(user));
    },

    logoutSuccess() {
      dispatch(AccountActions.logoutSuccess());
    },

  }
}

const ConnectedLayout = connect(mapStateToProps, mapDispatchToProps)(Layout);

class AppConnected extends Component {
  render() {
    return(
      <Provider store = { store }>
        <ConnectedLayout/>
      </Provider>
    );
  }
}

if (document.getElementById('root')) {
  ReactDOM.render( <AppConnected />, document.getElementById('root'));
}
