import React, { Component } from 'react';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      students: [],
      behaviors: [],
      newBehavior: ""
    };

    this.handleChangeStudent = this.handleChangeStudent.bind(this);
    this.handleChangeBehavior = this.handleChangeBehavior.bind(this);
  }
//(lifecycle method)
  componentWillMount(){
    this.setState({
      students: this.props.students,
      behaviors: this.props.behaviors
    })
  }

  handleChangeStudent(e) {
    this.setState({
      newStudent: e.target.value
    });
  }
  handleChangeBehavior(e) {
    this.setState({
      newBehavior: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1 >My App talking with Firebase</h1>
        <button
          onClick={(e) => this.props.addBehavior({behaviorName: this.state.newBehavior})}>
          Add new behavior to Firebase database
        </button>
        <input type="text"
                id="behaviorName"
                placeholder="enter new behavior"
                onChange={this.handleChangeBehavior}/>
        <br/>
        <br/>

        <button
          onClick={(e) => this.props.addStudent({studentName: this.state.newStudent})}>
          Add new student to Firebase database
        </button>
        <input type="text"
                id="studentName"
                placeholder="enter student name"
                onChange={this.handleChangeStudent}/>

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
