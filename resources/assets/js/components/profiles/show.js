// React
import React, { Component } from 'react';
// React Router Link
import { Link } from 'react-router-dom'
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux Posts Actions
import { ProfileActions } from '../../redux/actions.js';

/**
 * Component that is responsible for displaying all the data about a specific profile.
 */
class Show extends Component {

  /**
   * When the component is mounting, fetches the data of the profile.
   */
  componentWillMount() {
    this.props.fetchRequest(); // Indicates that the fetching has begun
    axios.get(this.props.match.url).then( response => {
      this.props.fetchSuccess(response.data.user, response.data.posts); // Indicates that the fetching has finished, and pass the resultant data
    }).catch( error => {
      this.props.fetchFail(error.response.status, error.response.statusText, error.response.data.message); // Indicates that the fetching has failed
    });
  }

  /**
   * Renders the view of the profile.
   */
  render() {
    var profile = this.props.profile;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-12">
            <h1>{ profile.user.name }</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {

    fetchRequest() {
      dispatch(ProfileActions.fetchRequest());
    },

    fetchSuccess(user_data, user_posts) {
      dispatch(ProfileActions.fetchSuccess(user_data, user_posts));
    },

    fetchFail(status, status_text, message) {
      dispatch(ProfileActions.fetchFail(status, status_text, message))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
