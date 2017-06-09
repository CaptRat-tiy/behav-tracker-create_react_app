this.state = {
  courseData: {},
  students: [],
  teacherInfo: {},
  behaviors: [],
}

componentDidMount(){
  base.syncState('courses', {
   context: this,
   state: 'courses',
  })

  base.syncState('behaviors', {
   context: this,
   state: 'behaviors',
  })
}

componentWillUnmount(){
 base.removeBinding(this.ref);
}

handleBehaviorClick(behavior, behaviorImage, studentID){

    const revisedStudents = {...this.state.courses.courseID.students}

    console.log("revisedStudents is/are: ", revisedStudents);

    const now = new Date()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const year = now.getFullYear()
    const militaryTime = now.getHours() + ":" + (now.getMinutes()<10?'0':'')

    const behaviorIdentifier = this.generateGuid()
    const student = revisedStudents[studentID]
    // this seems to work.  (Strangely, === doesn't.)
    // but Firebase still isn't working, after switching states (line 29 - 95).  It says line 136 courseID isn't defined...?
    if ( student["behaviorHistory"] == null ) {
      student["behaviorHistory"] = {}
    }

    student["behaviorHistory"][behaviorIdentifier] = {
       month: month,
       date: date,
       time: militaryTime,
       year: year,
       behavior: behavior,
       behaviorImage: behaviorImage
    }
    console.log(revisedStudents);
    this.setState({students: revisedStudents})
  }

  render () {
    const students=this.state.courses.courseID.students

    const teacherInfo=this.state.courses.courseID.teacherInfo
    const behaviors=this.state.behaviors

    return (
      <div className="body">
        <div className="mainChalkboard">
          <div className="courseInfoLightGreen">
            <h1>{teacherInfo.firstName} {teacherInfo.lastName}'s Grade {teacherInfo.gradeLevel} Class</h1>
          </div>

          <div>
            {_.map(students, (student) => {
              return <Student
                key={student.studentID}
                student={student}
                behaviors={behaviors}
                handleBehaviorClick={this.handleBehaviorClick}/>
              }
            )}
          </div>

          {/*<div className="studentSelectorButtonsPinkBackground">
            <p>Please select the student you wish to monitor:</p>

            {students.map((studentObject)=>{
              return <button key={studentObject.lastName} onClick={() => this.handleStudentClick(studentObject.firstName)} >{studentObject.firstName} {studentObject.lastName}</button>
              }
            )}
          </div>*/}

          <div className="analytics">
            <Analytics
              students={students}
            />
          </div>

          <div className="footer">
          <a href="https://github.com/CaptRat-tiy/Behavioral-Tracker">https://github.com/CaptRat-tiy/Behavioral-Tracker</a>
          </div>
        </div>
      </div>
    )
  }
}
