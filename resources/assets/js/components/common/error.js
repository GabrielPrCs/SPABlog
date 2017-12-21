// React
import React, { Component } from 'react';
// React Redux Connect Function
import { connect } from 'react-redux';
// Redux Posts Actions
import { ProfileActions } from '../../redux/actions.js';
// User Interface Actions
import { UIActions } from '../../redux/actions.js';

class ErrorView extends Component {

  componentDidUpdate(){
    $('#error-modal').modal("show");
  }

  render() {
    if(!this.props.happening)
      return null;
    else
      return (
        <div className="modal fade" id="error-modal" tabIndex="-1" role="dialog" aria-labelledby="error-modal-label" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="error-modal-label">Upssss....</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick = { this.props.errorReaded }>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-center">
                <h4>ERROR { this.props.status } {this.props.status_text}</h4>
                Reason: { this.props.message }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-dismiss="modal" onClick = { this.props.errorReaded }>OK</button>
              </div>
            </div>
          </div>
        </div>
      );
  }

}

const mapStateToProps = state => {
  return {
    happening: state.ui.error.happening,
    status: state.ui.error.status,
    status_text: state.ui.error.status_text,
    message: state.ui.error.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    errorReaded() {
      dispatch(UIActions.errorReaded());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorView);
