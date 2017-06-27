import React, { Component } from 'react';
import './styles/App.css';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      students: [],
      behaviors: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    this.setState({
      students: this.props.students,
      behaviors: this.props.behaviors
    })
  }

  handleChange(e) {
    this.setState({
      newStudent: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>My App talking with Firebase</h1>
        <button
          onClick={() => this.props.addBehavior({ name: 'applies new ideas'})}>
          Add new "behavior" to Firebase database
        </button>
        <input type="text" id="behaviorName" placeholder="enter new behavior"/>
        <br/>
        <br/>

        <button type="Submit"
          onClick={(e) => this.props.addStudent({name: this.state.newStudent})}>
          Add new student to Firebase database
        </button>
        <input type="text"
                id="studentName"
                placeholder="enter student name"
                onChange={this.handleChange}/>

        <ul>
          {
            Object.keys(this.props.behaviors).map((key, index) => {
              return <li key={index}>{this.props.behaviors[key].name}
                <img src={this.props.behaviors[key].image} alt={this.props.behaviors[key].alt} /></li>
              }
            )
          }
        </ul>
      </div>
    )}
  };
