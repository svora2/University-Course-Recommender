import React from "react";
import "./App.css";
import CourseArea from "./CourseArea";
import Accordion from "react-bootstrap/Accordion";

class PreviousCourses extends React.Component{
    render(){
        let prev = {};
        for (let i = 0; i < this.props.data2.length; i++){
            prev[this.props.data2[i]] = this.props.data[this.props.data2[i]];
        }
        return(
            <CourseArea 
            {...this.props}
              data={prev}
              likeFlag={true}

              />
        );
    }
}

export default PreviousCourses;


