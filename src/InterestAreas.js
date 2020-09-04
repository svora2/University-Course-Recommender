import React from "react";
import "./App.css";
import CourseArea from "./CourseArea";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class InterestAreas extends React.Component {
  // pass in props.data for the subject
  //get all of the subjects
  //selection component for each subject
  //onclick add all courses with the subject in recommended courses
  //create new obj like pc

  //after the user clicks on a subject, get all of the keys of the courses associated with that subjects and display those(to test) then display the courses

  constructor(props) {
    super(props);
    this.state = {
      subjects: [], //subject keys of the courses from the interest area sidebar buttons
      reccomendedCourses: {}
    };
    this.getSubjects = this.getSubjects.bind(this);
    this.getSubjectKeys = this.getSubjectKeys.bind(this);
    this.deleteDuplicates = this.deleteDuplicates.bind(this);
    this.clearRecommended = this.clearRecommended.bind(this);
    this.getSubjectsOfLikedCourses = this.getSubjectsOfLikedCourses.bind(this);
    this.getRecommendedCourses = this.getRecommendedCourses.bind(this);
    this.setRecommendedCoursesDataState = this.setRecommendedCoursesDataState.bind(
      this
    );
  }

  getSubjectsOfLikedCourses(courseKeys) {
    //passing in this.props.likedCourses array - an array of liked course keys
    //use this.props.data to find the course then its subject
    //return these subjects or add them to the sujects state - make sure there are no repeat subjects
    //then, in render, before retun, get the keys of the courses in that subject
    let subjectsOfLikedCourses = [];
    for (const course of Object.entries(this.props.data)) {
      for (let i = 0; i < courseKeys.length; i++) {
        if (courseKeys[i] === course[0]) {
          subjectsOfLikedCourses.push(course[1].subject);
        }
      }
    }
    //console.log(subjectsOfLikedCourses);
    return subjectsOfLikedCourses;
  }
  getSubjects() {
    let subj = [];
    for (const course of Object.entries(this.props.data)) {
      if (!subj.includes(course[1].subject)) {
        subj.push(course[1].subject);
      }
    }
    return subj;
  }

  getSubjectKeys(subject, stateBool) {
    let subjKeys = [];
    //var subjectString = JSON.stringify(Object.values(subject)); course[1].subject ===
      //    subjectString.substring(2, subjectString.length - 2) ||
    for (const course of Object.entries(this.props.data)) {
      if (
        course[1].subject === subject
      ) {
        subjKeys.push(course[0]);
        if(stateBool){
        this.setState(
          prevState => ({
            subjects: [...prevState.subjects, course[0]]
          }));
        }
      }
    }
    return subjKeys;
  }

  deleteDuplicates(keyArray) {
    let uniqueKeys = Array.from(new Set(keyArray));
    // take out previous course keys
    for (let j = 0; j < this.props.previousCourses.length; j++) {
      uniqueKeys = uniqueKeys.filter(
        uniqueKey => uniqueKey !== this.props.previousCourses[j]
      );
    }

    return uniqueKeys;
  }

  clearRecommended() {
    this.setState({ reccomendedCourses: {} });
    this.setState({subjects: []});
  }

  setRecommendedCoursesDataState(recommededCoursesKeys) {
    let recCourses = {};
    for (let i = 0; i < recommededCoursesKeys.length; i++) {
      recCourses[recommededCoursesKeys[i]] = this.props.data[
        recommededCoursesKeys[i]
      ];
    }

    return recCourses;
  }

  getRecommendedCourses() {
    let recCourses = {};

    //call getSubjectsOfLikedCourses(this.props.likedCourses) and itterate through the array and call getSubjectKeys for each subject
    //could be problematic cause you reset the state every time... change that so it just adds no matter then later check for repeat courses
    //getting subjects of the liked courses
    let likedCoursesSubjects = this.getSubjectsOfLikedCourses(
      this.props.likedCourses
    );
    //getiing the course keys associatted with every liked subject
    let likedSubjectKeys = [];
    for (let i = 0; i < likedCoursesSubjects.length; i++) {
      console.log(typeof likedCoursesSubjects[i]);
      likedSubjectKeys = likedSubjectKeys.concat(
        this.getSubjectKeys(likedCoursesSubjects[i])
      );
    }
    


 likedSubjectKeys = likedSubjectKeys.concat(this.state.subjects);
    console.log(likedSubjectKeys);
    //take out all previous course keys and any repeated keys
    let uniqueKeysOnly = this.deleteDuplicates(likedSubjectKeys);
    //pass the final object into CourseArea - this prob wont work cause its just keys no course info?
    console.log(uniqueKeysOnly);

    recCourses = this.setRecommendedCoursesDataState(uniqueKeysOnly);



    //set state of the obj in state
    // return this.state.recommededCourses;
    this.setState({ reccomendedCourses: recCourses });
  }

  getValue(subj){
let value = subj.length;
if(subj === 'Psychology'){
  return 2
}
    return value;
  }

  render() {
    return (
      <div>
        {this.props.showInterestSidebar && (
          <Card
            style={{
              width: "calc(20vw - 5px)",
              marginLeft: "5px",
              height: "calc(100vh - 10px)",
              position: "fixed",
              color:"#00063b"
            }}
          >
            <Card.Body>
              <Card.Title> Interest Areas </Card.Title>
              <ToggleButtonGroup
                className="d-flex flex-column"
                vertical={true}
                type="checkbox"
                name="options"
                defaultValue={1}
              >
                {this.getSubjects().map(subject => (
                  <ToggleButton
                  variant="outline-dark"
                  class="m-5"
                    value={this.getValue(subject)}
                    onClick={() => {
                      this.getSubjectKeys(subject, true);
                      
                    }}
                  >
                    {subject}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <ButtonGroup className="d-flex flex-row">
              <div>
              <Button 
                variant="info"
                class=".mx-auto"
                onClick={() => {
                  {
                    this.getRecommendedCourses();
                  }
                }}
              >
                Recommend Courses
              </Button>
              </div>
              <div> 
                <Button
                  variant="outline-info"
                  class=".mx-auto m-5 pb-5"
                  onClick={event => {
                    this.clearRecommended();
                    this.props.clearLikedCourses();
                  }}
                >
                  Reset
                </Button>
                </div>
              </ButtonGroup>
            </Card.Body>
          </Card>
        )}

        {this.props.showRecCourses && Object.keys(this.state.reccomendedCourses) && (
         //
          <Card class="col-sm" style={{ marginLeft: '400px'}}>
          <Card.Body>
                <Card.Title>Recommeded Courses</Card.Title>
          
            
               <div style={{ marginLeft: "auto", overflowY: 'auto' }}>
            <CourseArea
              {...this.props}
              addCourseToCart={this.props.addCourseToCart}
              addSecToCart={this.props.addSecToCart}
              addSubSecToCart={this.props.addSubSecToCart}
              data={this.state.reccomendedCourses}
              showSections={true}
              
                />
          </div>
          {console.log(this.props)}
           </Card.Body>
             </Card>
        )}
      </div>
    );
  }
}

export default InterestAreas;
