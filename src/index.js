import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';
import './styles/App.css';

const config = {
  apiKey: "AIzaSyAjB5xxpo_eOVJ7LFoDJUN51TGXyhkq1IQ",
  authDomain: "behavioral-tracker-app.firebaseapp.com",
  databaseURL: "https://behavioral-tracker-app.firebaseio.com",
  storageBucket: "behavioral-tracker-app.appspot.com"
};

const database = firebase
  .initializeApp(config)
  .database()
  .ref();

const addBehavior = data => database.child('behaviors').push(data, response => response);

const updateBehaviors = (id, data) => database.child(`behaviors/${id}`).update(data, response => response);

const addStudent = data => database.child('students').push(data, response => response);

const actions = {
  addBehavior,
  addStudent,
  updateBehaviors,
  database,
};

console.log(database);
database.on('value', snapshot => {
  const store = snapshot.val();

    ReactDOM.render(
      <App
        {...actions}
        {...store}
      />,
      document.getElementById('root')
    )
  }
)

registerServiceWorker()
