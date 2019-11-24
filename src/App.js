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
import SignIn from "./HOC/SignIn";
import HomePage from "./HOC/MainComponent";

const firebaseConfig = {
  apiKey: "AIzaSyA5jMDKtzG4-xzQepATF62GkyDCsCwyUMw",
  authDomain: "reactjs-firebase-auth-tmplt.firebaseapp.com",
  databaseURL: "https://reactjs-firebase-auth-tmplt.firebaseio.com",
  projectId: "reactjs-firebase-auth-tmplt",
  storageBucket: "reactjs-firebase-auth-tmplt.appspot.com",
  messagingSenderId: "224449628817",
  appId: "1:224449628817:web:dd735d2b744a8d09a18d30",
  measurementId: "G-3HFR5FMZ21"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: null,
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

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
          <Route exact path={"/"} component={HomePage} />
          <Route path={"/signin"} component={SignIn} />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
