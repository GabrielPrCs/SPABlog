// React
import React, { Component } from 'react';
// React Router Link
import { Link } from 'react-router-dom';
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux Categories Actions
import { CategoriesActions } from '../../redux/actions.js';

const Category = ({id, name, slug, posts_count, description}) => {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="jumbotron hoverable" data-toggle="collapse" href={ `#category-collapse-${id}` } aria-expanded="false" aria-controls={ `category-collapse-${id}` }>
        <h5> { name } </h5>
          <h5>
            <Link to = { `/categories/${ slug }/show?page=1` }>
              <span className="badge cyan hoverable">Show { posts_count } posts</span>
            </Link>
          </h5>
        <div className="collapse" id={ `category-collapse-${id}` }>
          <hr/>
          <p>{ description }</p>
        </div>
      </div>
    </div>
  );
}

class Index extends Component {
  componentWillMount() {
    this.props.fetchRequest(); // Indicates that the fetching has begun
    axios.get('/categories').then( response => {
      this.props.fetchSuccess(response.data); // Indicates that the fetching has been success
    }).catch( error => {
      this.props.fetchFail(error.response.status, error.response.statusText, error.response.data.message); // Indicates that the fetching has failed
    });
  }

  render() {
    return(
      <div className="row">
        {
          this.props.list.map(function(category, key) {
            return <Category key = { key } id = { key } name = { category.name } slug = { category.slug } posts_count = { category.posts_count } description = { category.description } />
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.categories.list,
  }
}

const mapDispatchToProps = dispatch => {
  return {

    fetchRequest() {
      dispatch(CategoriesActions.fetchRequest());
    },

    fetchSuccess(list) {
      dispatch(CategoriesActions.fetchSuccess(list));
    },

    fetchFail(status, status_text, message) {
      dispatch(CategoriesActions.fetchFail(status, status_text, message));
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
