// React
import React, { Component } from 'react';
// React Router Link
import { Link } from 'react-router-dom'
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux Posts Actions
import { CurrentPostActions } from '../../redux/actions.js';
// Component that renders a view of the metadata of a given post
import PostMetadata from './partials/metadata.js';

/**
 * Component that is responsible for displaying all the data about a specific post.
 */
class Show extends Component {

  /**
   * When the component is mounting, fetches the data of the post.
   */
  componentWillMount() {
    this.props.fetchRequest(); // Indicates that the fetching has begun
    axios.get(this.props.match.url).then( response => {
      this.props.fetchSuccess(response.data); // Indicates that the fetching has finished, and pass the resultant data
    }).catch( error => {
      this.props.fetchFail(error.response.status, error.response.statusText, error.response.data.message); // Indicates that the fetching has failed
    });
  }

  /**
   * Renders the view of the post.
   */
  render() {
    var post = this.props.post;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col">
            <h3>{ post.title } <small> by { post.author.name } </small></h3>
            <hr/>
            <p className="text-justify">{ post.content }</p>
            <hr/>
            <PostMetadata post = { post }/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { post: state.current_post }
}

const mapDispatchToProps = dispatch => {
  return {

    fetchRequest() {
      dispatch(CurrentPostActions.fetchRequest());
    },

    fetchSuccess(postData) {
      dispatch(CurrentPostActions.fetchSuccess(postData))
    },

    fetchFail(status, status_text, message) {
      dispatch(CurrentPostActions.fetchFail(status, status_text, message))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Show);
