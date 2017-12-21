// React
import React from 'react';
// React Router Link
import { Link } from 'react-router-dom'

/**
 * Function that renders a view of the metadata of a given post
 */
export default ({ post }) => {
  return (
    <div>
      Posted on <Link to = { `/categories/${ post.category.slug }/show?page=1` }><span className="badge badge-pill badge-primary mx-1 hoverable">{ post.category.name }</span></Link>
      by <Link to = { `/profiles/${post.author.email}/show` }><span className="badge badge-pill badge-secondary mx-1 hoverable">{ post.author.name }</span></Link>
      on { post.updated_at }
    </div>
  );
}
