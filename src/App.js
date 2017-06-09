import React from 'react';
import './styles/App.css';

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
          {
            Object.keys(props.behaviors).map((key, index) => {
              return <li key={index}>{props.behaviors[key].name}
                <img src={props.behaviors[key].image} alt={props.behaviors[key].alt} /></li>
              }
            )
          }
        </ul>
      </div>
    );
  }

export default App;
