// React
import React from 'react';
// React Router Link
import { Link } from 'react-router-dom'
// Component that renders a view of the metadata of a given post
import PostMetadata from './metadata.js';

/**
 * Function that renders a preview view of a particular post.
 */
export default ({ post }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="jumbotron hoverable waves-effect p-4">
          <Link to={ `/posts/${ post.slug }/show` } style={{ textDecoration: 'none', color: 'black' }}>
            <h4 style={{ color: '#4285F4' }}>{ post.title }</h4>
            <p className="text-justify"> { post.description } </p>
          </Link>
          <PostMetadata post = { post }/>
        </div>
      </div>
    </div>
  );
}
