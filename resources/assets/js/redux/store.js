import { createStore, combineReducers } from 'redux';

const ui_default_state = {
  loading: false,
  error: {
    happening: false,
    status: "",
    status_text: "",
    message: ""
  }
};

const account_default_state = {
  authenticated: false,
  email: "",
  name: "",
  created_at: ""
};

const categories_default_state = {
  list: []
};

const current_post_default_state = {
  id: 0,
  author: {
    name: "",
    email: ""
  },
  title: "",
  slug: "",
  description: "",
  content: "",
  updated_at: "",
  category: {
    name: "",
    slug: "",
    description: "",
    posts_count: 0
  }
};

const paginator_default_state = {
  list: [],
  current_page: 1,
  last_page: 1
};

const profile_default_state = {
  user: {
    email: "",
    name: "",
    created_at: "",
  },
  posts: [],
};

function parseErrorMessage(message) {

  switch (typeof message) {

    case "object":
      var string = "";
      for (var key in message) {
        string += message[key] + " ";
      }
      return string;

    case "string":
      return message;

    default:
      return "Impossible to get the error message. Maybe a parse error?";
  }

}

const uiReducer = (state = ui_default_state, action) => {
  switch (action.type) {

    // When a request starts, puts the ui in loading mode and removes all the errors that may be presents.
    case "ACCOUNT_REGISTER_REQUEST":
    case "ACCOUNT_LOGIN_REQUEST":
    case "ACCOUNT_LOGOUT_REQUEST":
    case "FETCHING_POST_REQUEST":
    case "FETCHING_CATEGORIES_REQUEST":
    case "FETCHING_PAGINATOR_POSTS_REQUEST":
    case "FETCHING_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: {
          happening: false,
          status: "",
          status_text: "",
          message: ""
        }
      };

    // When a request is successful, stops the loading mode and removes all the errors that may be presents.
    case "ERROR_READED":
    case "ACCOUNT_REGISTER_SUCCESS":
    case "ACCOUNT_LOGIN_SUCCESS":
    case "ACCOUNT_LOGOUT_SUCCESS":
    case "FETCHING_POST_SUCCESS":
    case "FETCHING_CATEGORIES_SUCCESS":
    case "FETCHING_PAGINATOR_POSTS_SUCCESS":
    case "FETCHING_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: {
          happening: false,
          status: "",
          status_text: "",
          message: ""
        }
      };

    // When a request fails, stops the loading mode and puts a new error.
    case "ACCOUNT_REGISTER_FAIL":
    case "ACCOUNT_LOGIN_FAIL":
    case "ACCOUNT_LOGOUT_FAIL":
    case "FETCHING_POST_FAIL":
    case "FETCHING_CATEGORIES_FAIL":
    case "FETCHING_PAGINATOR_POSTS_FAIL":
    case "FETCHING_PROFILE_FAIL":
      return {
        ...state,
        loading: false,
        error: {
          happening: true,
          status: action.payload.status,
          status_text: action.payload.status_text,
          message: parseErrorMessage(action.payload.message)
        }
      };

    default:
      return state;
  }

};

const accountReducer = (state = account_default_state, action) => {
  switch (action.type) {

    case "ACCOUNT_REGISTER_SUCCESS":
    case "ACCOUNT_LOGIN_SUCCESS":
      return {
        ...state,
        authenticated: true,
        email: action.payload.email,
        name: action.payload.name,
        created_at: action.payload.created_at
      };

    case "ACCOUNT_LOGOUT_SUCCESS":
      return account_default_state;

    default:
      return state;
  }

};

const currentPostReducer = (state = current_post_default_state, action) => {
  switch (action.type) {

    case 'FETCHING_POST_REQUEST':
    case 'FETCHING_POST_FAIL':
      return current_post_default_state;

    case 'FETCHING_POST_SUCCESS':
      return {
        ...state,
        id: action.payload.post.id,
        author: {
          name: action.payload.post.author.name,
          email: action.payload.post.author.email
        },
        title: action.payload.post.title,
        slug: action.payload.post.slug,
        description: action.payload.post.description,
        content: action.payload.post.content,
        updated_at: action.payload.post.updated_at,
        category: {
          name: action.payload.post.category.name,
          slug: action.payload.post.category.slug,
          description: action.payload.post.category.description,
          posts_count: action.payload.post.category.posts_count
        }
      };

    default:
      return state;
  }

};

const paginatorReducer = (state = paginator_default_state, action) => {
  switch (action.type) {

    case 'FETCHING_PAGINATOR_POSTS_REQUEST':
    case 'FETCHING_PAGINATOR_POSTS_FAIL':
      return paginator_default_state;

    case 'FETCHING_PAGINATOR_POSTS_SUCCESS':
     return {
       ...state,
       list: action.payload.list,
       current_page: action.payload.current_page,
       last_page: action.payload.last_page
     };

    default:
      return state;
  }

};

const categoriesReducer = (state = categories_default_state, action) => {
  switch (action.type) {

    case "FETCHING_CATEGORIES_REQUEST":
    case "FETCHING_CATEGORIES_FAIL":
      return categories_default_state;

    case "FETCHING_CATEGORIES_SUCCESS":
      return {
        ...state,
        list: action.payload.list,
      };

    default:
      return state;
  }

};

const profileReducer = (state = profile_default_state, action) => {
  switch (action.type) {

    case "FETCHING_PROFILE_REQUEST":
    case "FETCHING_PROFILE_FAIL":
      return profile_default_state;

    case "FETCHING_PROFILE_SUCCESS":
      return {
        ...state,
        user: {
          email: action.payload.user_data.email,
          name: action.payload.user_data.name,
          created_at: action.payload.user_data.created_at,
        },
        posts: action.payload.user_posts,
      }

    default:
      return state;
  }

};

export default createStore(combineReducers({
  ui: uiReducer,
  current_post: currentPostReducer,
  paginator: paginatorReducer,
  user: accountReducer,
  categories: categoriesReducer,
  profile: profileReducer,
}));
