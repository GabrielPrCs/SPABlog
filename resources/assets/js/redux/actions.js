const UIActions = {
  errorReaded: () => {
    console.log("UIActions/errorReaded");
    return {
      type: "ERROR_READED"
    }
  },
};

const AccountActions = {

  loginRequest: () => {
    console.log("AccountActions/loginRequest");
    return {
      type: "ACCOUNT_LOGIN_REQUEST",
    }
  },

  loginSuccess: (user) => {
    console.log("AccountActions/loginSuccess");
    return {
      type: "ACCOUNT_LOGIN_SUCCESS",
      payload: {
        email: user.email,
        name: user.name,
        created_at: user.created_at
      }
    }
  },

  loginFail: (status, status_text, message) => {
    console.log("AccountActions/loginFail");
    return {
      type: "ACCOUNT_LOGIN_FAIL",
      payload: { status, status_text, message }
    }
  },

  logoutRequest: () => {
    console.log("AccountActions/logoutRequest");
    return {
      type: "ACCOUNT_LOGOUT_REQUEST"
    }
  },

  logoutSuccess: () => {
    console.log("AccountActions/logoutSuccess");
    return {
      type: "ACCOUNT_LOGOUT_SUCCESS"
    }
  },

  logoutFail: (status, status_text, message) => {
    console.log("AccountActions/logoutFail");
    return {
      type: "ACCOUNT_LOGOUT_FAIL",
      payload: { status, status_text, message }
    }
  },

  registerRequest: () => {
    console.log("AccountActions/registerRequest");
    return {
      type: "ACCOUNT_REGISTER_REQUEST",
    }
  },

  registerSuccess: (user) => {
    console.log("AccountActions/registerSuccess");
    return {
      type: "ACCOUNT_REGISTER_SUCCESS",
      payload: {
        email: user.email,
        name: user.name,
        created_at: user.created_at
      }
    }
  },

  registerFail: (status, status_text, message) => {
    console.log("AccountActions/registerFail");
    return {
      type: "ACCOUNT_REGISTER_FAIL",
      payload: { status, status_text, message }
    }
  }

};

const CurrentPostActions = {

  fetchRequest: () => {
    console.log("CurrentPostActions/fetchRequest");
    return {
      type: "FETCHING_POST_REQUEST",
    };
  },

  fetchSuccess: post => {
    console.log("CurrentPostActions/fetchSuccess");
    return {
      type: "FETCHING_POST_SUCCESS",
      payload: { post }
    };
  },

  fetchFail: (status, status_text, message) => {
    console.log("CurrentPostActions/fetchFail");
    return {
      type: "FETCHING_POST_FAIL",
      payload: { status, status_text, message }
    };
  }

};

const PaginatorActions = {

  fetchRequest: () => {
    console.log("PaginatorActions/fetchRequest");
    return {
      type: "FETCHING_PAGINATOR_POSTS_REQUEST",
    }
  },

  fetchSuccess: (list, current_page, last_page) => {
    console.log("PaginatorActions/fetchSuccess");
    return {
      type: "FETCHING_PAGINATOR_POSTS_SUCCESS",
      payload: { list, current_page, last_page }
    }
  },

  fetchFail: (status, status_text, message) => {
    console.log("PaginatorActions/fetchFail");
    return {
      type: "FETCHING_PAGINATOR_POSTS_FAIL",
      payload: { status, status_text, message }
    }
  }

};

const CategoriesActions = {

  fetchRequest: () => {
    console.log("CategoriesActions/fetchRequest");
    return {
      type: "FETCHING_CATEGORIES_REQUEST"
    }
  },

  fetchSuccess: list => {
    console.log("CategoriesActions/fetchSuccess");
    return {
      type: "FETCHING_CATEGORIES_SUCCESS",
      payload: { list }
    }
  },

  fetchFail: (status, status_text, message) => {
    console.log("CategoriesActions/fetchFail");
    return {
      type: "FETCHING_CATEGORIES_FAIL",
      payload: { status, status_text, message }
    }
  }

};

const ProfileActions = {

  fetchRequest: () => {
    console.log("ProfileActions/fetchRequest");
    return {
      type: "FETCHING_PROFILE_REQUEST"
    }
  },

  fetchSuccess: (user_data, user_posts) => {
    console.log("ProfileActions/fetchSuccess");
    return {
      type: "FETCHING_PROFILE_SUCCESS",
      payload: { user_data, user_posts }
    }
  },

  fetchFail: (status, status_text, message) => {
    console.log("ProfileActions/fetchFail");
    return {
      type: "FETCHING_PROFILE_FAIL",
      payload: { status, status_text, message }
    }
  }

};

export {
  UIActions,
  CurrentPostActions,
  PaginatorActions,
  AccountActions,
  CategoriesActions,
  ProfileActions
};
