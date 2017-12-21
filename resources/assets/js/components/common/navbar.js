// React
import React from 'react';
// React Router Link
import { Link } from 'react-router-dom'
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux User Actions
import { UserActions } from '../../redux/actions.js';

/**
 * Function that determines the class of an item based on the current url and the url associated with that item.
 * @param  [String] currentURL [the current url]
 * @param  [String] itemURL    [the url associated with the item]
 * @return [String]            [the correct class]
 */
const itemClass = function(currentURL, itemURL) {
  return currentURL.startsWith(itemURL) ? "nav-item active" : "nav-item";
}

const Navbar = ({match, authenticated, name}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
      <div className="container">

        <Link to = "/" >
          <span className="navbar-brand">React Blog App</span>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          {/* Items on the left side of the navbar  */}
          <ul className="navbar-nav mr-auto">

            <Link to = "/posts?page=1">
              <li className={ itemClass(match.url, '/posts') }>
                <span className="nav-link">Posts</span>
              </li>
            </Link>

            <Link to = "/categories">
              <li className={ itemClass(match.url, '/categories') }>
                <span className="nav-link">Categories</span>
              </li>
            </Link>

          </ul>

          {/* Items on the right side of the navbar  */}
          <ul className="navbar-nav ml-auto">
            <Link to = "/account">
              <li className={ itemClass(match.url, '/account') }>
                <span className="nav-link">{ authenticated ? `Hi ${name}` : "Login" }</span>
              </li>
            </Link>
          </ul>

        </div>

      </div>
    </nav>
  );
}

const mapStateToProps = state => {
  return {
    authenticated: state.user.authenticated,
    name: state.user.name
  }
}

export default connect(mapStateToProps)(Navbar);
