import React, { Component } from 'react';
import './styles/App.css';
// import Action from './Action'

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      courseData: {},
      students: [],
      teacherInfo: {},
      behaviors: [],
      database: {}
    }
  }

  componentWillMount(){

      this.setState({
        courseData: this.props.courseData,
        students: this.props.students,
        teacherInfo: this.props.teacherInfo,
        behaviors: this.props.behaviors,
      })
  }

  handleChange(e) {
    this.setState({students: e.target.value})
  }

    render() {
    console.log('snapshot', this.props)

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

        <button
          onClick={(e) => this.props.addStudent({ name: e.target.value})}>
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
