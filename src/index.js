import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as firebase from 'firebase';

// Make sure you swap this out with your Firebase app's config
const config = {
  apiKey: "AIzaSyAjB5xxpo_eOVJ7LFoDJUN51TGXyhkq1IQ",
  authDomain: "behavioral-tracker-app.firebaseapp.com",
  databaseURL: "https://behavioral-tracker-app.firebaseio.com",
  storageBucket: "behavioral-tracker-app.appspot.com",
};

const fb = firebase
  .initializeApp(config)
  .database()
  .ref();

const App = (props) => {
  console.log('snapshot', props);
  return (
    <div>
      <h1>Parsing into the O-bject!</h1>
      <div>{JSON.stringify(props.courseID.behaviors)} <br/>  <br/> <p>All my Firebase things: <br /> </p>{JSON.stringify(props)}</div>
    </div>
  );
}

fb.on('value', snapshot => {
  const store = snapshot.val();
  ReactDOM.render(
    <App {...store} />,
    document.getElementById('root')
  );
});
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
