import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";

const SignInPage = () => (
  <div>
    <h1>Home Page</h1>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  render() {
    return (
      <h1>Welcome to Home Page: {this.props.auth && this.props.auth.email}</h1>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
  connect(({ firebase: { auth } }) => ({
    auth
  }))
)(SignInFormBase);

export default SignInPage;
