import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

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
  const actions = {
    addBehavior,
    updateBehaviors
  };

  const App = props => {
    console.log('snapshot', props);
    return (
      <div>
        <h1>My App talking with Firebase</h1>
        <button
          onClick={() => props.addBehavior({ name: 'Perfect Kid!'})}
        >
          Add new behaviors
        </button>
        <ul>
          {Object.keys(props.behaviors).map((key, index) => <li key={index}>{props.behaviors[key].name} {props.behaviors[key].image}</li>)}
        </ul>
      </div>
    );
  }

  database.on('value', snapshot => {
    const store = snapshot.val();
    ReactDOM.render(
      <App
        {...actions}
        {...store}
      />,
      document.getElementById('root')
    )
  });

registerServiceWorker();
