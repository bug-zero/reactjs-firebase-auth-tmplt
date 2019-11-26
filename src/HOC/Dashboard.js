import React, { Component } from "react";
import { withFirebase } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Dashboard extends Component {
  render() {
    const { auth, profile } = this.props;
    return (
      <div className="container mt-4 mb-4">
        {profile.isEmpty === true && profile.isLoaded === false && (
          <div
            className="jumbotron jumbotron-fluid"
            style={{
              backgroundColor: "#3b3a30",
              textShadow: "0 1px 3px rgba(0,0,0,.5)",
              color: "white"
            }}
          >
            <div className="container text-center">
              {auth.email ? (
                <h1 className="h2">Hello {auth.email}</h1>
              ) : (
                <h1 className="h2">Please login to continue...</h1>
              )}
            </div>
          </div>
        )}

        {profile.isEmpty === true && profile.isLoaded === true && (
          <div
            className="jumbotron jumbotron-fluid"
            style={{
              backgroundColor: "#3b3a30",
              textShadow: "0 1px 3px rgba(0,0,0,.5)",
              color: "white"
            }}
          >
            <div className="container text-center">
              {auth.email ? (
                <h1 className="h2">Hello {auth.email}</h1>
              ) : (
                <h1 className="h2">Please login to continue...</h1>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ firebase: { auth, profile } }) => ({
  auth,
  profile
});

export default compose(
  withRouter,
  withFirebase,
  connect(mapStateToProps)
)(Dashboard);
