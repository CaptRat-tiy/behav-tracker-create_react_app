import React from 'react';

export default class Action extends React.Component {
  constructor(){
    super();
    this.handleBehaviorClick=this.handleBehaviorClick.bind(this)
    this.handleStudentClick=this.handleStudentClick.bind(this)

    this.state = {
      courseData: {},
      students: [],
      teacherInfo: {},
      behaviors: [],
    }
  }

  componentWillMount(){
    database.on("child_added", (snapshot)=>{
      const courseData = this.changeIntoArray(snapshot.val())
      const teacherInfo = snapshot.val().teacherID
      const students = this.changeIntoArray(snapshot.val().studentArray)
      const behaviors = this.changeIntoArray(snapshot.val().behaviors)
      const analytics = this.changeIntoArray(snapshot.val().analytics)

      this.setState({
        courseData: courseData,
        students: students,
        teacherInfo: teacherInfo,
        behaviors: behaviors,
      })
    })
  }

  handleStudentClick(student){
  }

  handleBehaviorClick(behavior, behaviorImage, studentID){
      let d=new Date()
      const month = d.getMonth() + 1
      const date = d.getDate()
      const year = d.getFullYear()
      const militaryTime=d.getHours() +":" + d.getMinutes()

      let timestamp = Date.now()

     const behaviorIdentifier=database.push().key
     let behaviorUpdate={}
     behaviorUpdate["courseID/studentArray/" +studentID+"/behaviorHistory/" +behaviorIdentifier] = {
       month: month,
       date: date,
       time: militaryTime,
       year: year,
       behavior:behavior,
       behaviorImage: behaviorImage
     }
     database.update(behaviorUpdate)
  }

  render () {
    const students=this.state.students
    const courseData=this.state.courseData
    const teacherInfo=this.state.teacherInfo
    const behaviors=this.state.behaviors

    return (
      <div className="body">
        <div className="mainChalkboard">
          <div className="courseInfoLightGreen">
            <h1>{teacherInfo.firstName} {teacherInfo.lastName}'s Grade {teacherInfo.gradeLevel} Class</h1>
          </div>
          {/*<div>
            {students.map((student)=>{
            return <Student
                key={student.studentID}
                student={student}
                behaviors={behaviors}
                handleBehaviorClick={this.handleBehaviorClick}/>
              }
            )}
          </div>*/}

          <div className="footer">
            <a href="https://github.com/CaptRat-tiy/Behavioral-Tracker">https://github.com/CaptRat-tiy/Behavioral-Tracker</a>
          </div>
        </div>
      </div>
  )}
}


// {/*<div className="studentSelectorButtonsPinkBackground">
// <p>Please select the student you wish to monitor:</p>
//
// {students.map((studentObject)=>{
// return <button key={studentObject.lastName} onClick={() => this.handleStudentClick(studentObject.firstName)} >{studentObject.firstName} {studentObject.lastName}</button>
// }
// )}
// </div>*/}
