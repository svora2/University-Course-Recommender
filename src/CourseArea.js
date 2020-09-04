import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];
    
    for (const course of Object.entries(this.props.data)) {

      if (course[1]) {
        courses.push(
          <Course key={course[0]}
            {...this.props}
            data={course[1]}
            courseId={course[0]}
          />
        )
      }
    }

    return courses;
  }


  render() {
    return (
      <div>
        {this.getCourses()}
        {console.log(this.props)}
      </div>
    )
  }
}

export default CourseArea;