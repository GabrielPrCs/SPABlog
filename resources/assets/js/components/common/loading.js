// React
import React, { Component } from 'react';
// React Redux Connect Function
import { connect } from 'react-redux';
// User Interface Actions
import { UIActions } from '../../redux/actions.js';

class Loading extends Component {

  componentDidUpdate(){
    $('#loading-modal').modal("show");
  }

  render() {
    if(!this.props.loading)
      return null;
    else
      return (
        <div className="modal fade" id="loading-modal" tabIndex="-1" role="dialog" aria-labelledby="loading-modal-label" aria-hidden="true" data-backdrop="false">
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <div className="modal-body text-center">
                <i className="fa fa-refresh fa-spin fa-5x fa-fw"></i>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.ui.loading
  };
};

export default connect(mapStateToProps)(Loading);
