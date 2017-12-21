// React
import React, { Component } from 'react';
// React Router Link
import { Link } from 'react-router-dom';
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux Posts Actions
import { PaginatorActions } from '../../redux/actions.js';
// Component that renders a preview of a given post
import Preview from './partials/preview.js';

/**
 * Component that is responsible for obtaining and displaying system posts.
 * It does not show all the posts together, but it uses a page.
 */
class Paginator extends Component {
  /**
   * Function that obtains the posts corresponding to the indicated url.
   * @param  [String] url [the url where the posts are located]
   */
  requestPosts(url) {
    this.props.fetchRequest(); // Indicates that the fetching has begun
    $("html, body").animate({ scrollTop: 0 }, "fast");
    axios.get(url).then( response => {
      this.props.fetchSuccess(response.data.data, response.data.current_page, response.data.last_page); // Indicates that the fetching has been success, and pass the resultant data
      window.history.pushState('','',this.props.match.url + '?page=' + response.data.current_page); // Changes the url to the resultant url after the fetching
      this.previousButton.disabled = response.data.current_page <= 1 ? true : false; // If it's necesary, disables the previous button
      this.nextButton.disabled = response.data.current_page >= response.data.last_page ? true : false; // If it's necesary, disables the next button
    }).catch( error => {
      this.props.fetchFail(error.response.status, error.response.statusText, error.response.data.message); // Indicates that the fetching has failed
    });
  }

  /**
   * Function that advances to the previous page in the paginator.
   */
  previousPage() {
    var previous_page = this.props.current_page - 1;
    if( previous_page > 0 ) {
      this.requestPosts(this.props.match.url + '?page=' + previous_page);
    }
  }

  /**
   * Function that advances to the next page in the paginator.
   */
  nextPage() {
    var next_page = this.props.current_page + 1;
    if( next_page <= this.props.last_page ) {
      this.requestPosts(this.props.match.url + '?page=' + next_page);
    }
  }

  /**
   * When the component is mounting, fetches the initial set of posts based on the current url.
   */
  componentWillMount() {
    const params = new URLSearchParams(this.props.location.search);
    const page = params.get('page');
    var complete_url = this.props.match.url + '?page=' + page;
    this.requestPosts(complete_url);
  }

  /**
   * Renders the view of the paginator.
   */
  render() {
    return (
      <div>
        { this.props.list.map( post => { return <Preview key = { post.id } post = { post } /> }) }
        <div className="row">
          <div className="col-6">
            <button className="btn btn-primary btn-block" onClick = { this.previousPage.bind(this) } ref = { (button) => { this.previousButton = button } }>Previous</button>
          </div>
          <div className="col-6">
            <button className="btn btn-primary btn-block" onClick = { this.nextPage.bind(this) } ref = { (button) => { this.nextButton = button } }>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.paginator.list,
    current_page: state.paginator.current_page,
    last_page: state.paginator.last_page
  }
}

const mapDispatchToProps = dispatch => {
  return {

    fetchRequest() {
      dispatch(PaginatorActions.fetchRequest());
    },

    fetchSuccess(list, current_page, last_page) {
      dispatch(PaginatorActions.fetchSuccess(list, current_page, last_page));
    },

    fetchFail(status, status_text, message) {
      dispatch(PaginatorActions.fetchFail(status, status_text, message));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
