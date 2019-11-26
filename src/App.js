import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
  getFirebase
} from "react-redux-firebase";
import {
  createFirestoreInstance,
  firestoreReducer,
  getFirestore
} from "redux-firestore";
import thunk from "redux-thunk";
import SignIn from "./HOC/Login";
import Dashboard from "./HOC/Dashboard";
import Header from "./HOC/Header";
import Footer from "./HOC/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { UserIsNotAuthenticated } from "./HOC/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENTID}`
};
// react-redux-firebase config
const rrfConfig = {
  userProfile: null,
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime
  attachAuthIsReady: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

export const firebaseAuth = firebase.auth();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Header />
          <Route exact path={"/"} component={Dashboard} />
          <Route path={"/signin"} component={UserIsNotAuthenticated(SignIn)} />
          <Footer />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
