import React from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "./App.css";
import "./index.css";

const addbutton = {
   borderRadius:'15px',
  backgroundColor:"#061283",
  border:"none",
  border:"none", 
  padding: '10px',
  boxShadow: '1px 1px 2px #888888',
  marginRight:"10px"

};
const removebutton = {
   borderRadius:'15px',
  backgroundColor:"#061283",
  border:"none" ,
  border:"none", 
  padding: '10px',
  boxShadow: '1px 1px 2px #888888',
  marginRight:"10px"
};
const lecturedetails = {
  borderRadius:'20px',
  backgroundColor: "#92AAC7",
  border:"none",
  textAlign:"center",
  color: "white",
  boxShadow: '2px 2px 4px #888888'
};
const likebutton = {
backgroundColor: "#ED5752",
color: "white",
border:"none", 

};

const dislikebutton = {
  backgroundColor: "#A1BE95",
  color: "white",
  border:"none", 
  
};



class Course extends React.Component {
  reqs() {
    const numReqs = this.props.data.requisites.length;
    let reqs = this.props.data.requisites;
    let reqsStr = "";
    if (numReqs === 0) {
      return "None";
    }
    for (var i = 0; i < numReqs; i++) {
      if (i !== 0) {
        reqsStr += " AND ";
      }
      reqsStr += "[";
      for (var j = 0; j < reqs[i].length; j++) {
        if (j !== 0 && reqs[i].length > j) {
          reqsStr += " OR " + reqs[i][j];
        } else {
          reqsStr += reqs[i][j];
        }
      }
      reqsStr += "]";
    }
    return reqsStr;
  }


  render() {
    let sec = [];
    for (const section of Object.entries(this.props.data.sections)) {
      //lecture times

      if (section[1]) {
        sec.push(
          <div>
            <b>Lecture Times:</b>
          </div>
        );
        for (const times of Object.entries(section[1].time)) {
          sec.push(
            <div>
              Time: {times[0]} {times[1]}
            </div>
          );
        }

        sec.push(<p></p>);
        sec.push(
          <div>
            <b>
              <h6>
                {this.props.addSecToCart && (
                  <Button
                  class="default btn-sml"
                    style={addbutton}
                    onClick={() =>
                      this.props.addSecToCart(
                        section[0],
                        this.props.courseId,
                        this.props.data
                      )
                    }
                  >
                      add   
                  </Button>
                )}

{this.props.removeSecFromCart && (
                  <Button
                  class="default btn-sml"
                    //variant='outline-primary'
                    size="sm"
                    style={removebutton}
                    onClick={() =>
                      this.props.removeSecFromCart(
                        section[0],
                        this.props.courseId,
                        this.props.data
                      )
                    }
                  >
                      remove   
                  </Button>
                )}
                {section[0]}
                
              </h6>
            </b>
          </div>
        );
        sec.push(<div><div >Instructor: {section[1].instructor}</div><div>Location: {section[1].location}</div></div>);
        sec.push(<p></p>);
        for (const details of Object.entries(section[1].subsections)) {
          if (details[1]) {
            sec.push(
              <div>
                {" "}
                {this.props.addSubSecToCart && (
                  <Button
                    class="default btn-sml"
                    style={addbutton}
                    onClick={() =>
                      this.props.addSubSecToCart(
                        details[0],
                        section[0],
                        this.props.courseId,
                        this.props.data
                      )
                    }
                  >
                    add   
                  </Button>
                )}
                {this.props.removeSubSecFromCart && (
                  <Button
                  class="default btn-sml"
                    style={removebutton}
                    onClick={() =>
                      this.props.removeSubSecFromCart(
                        details[0],
                        section[0],
                        this.props.courseId,
                        this.props.data
                      )
                    }
                  >
                       remove     
                  </Button>
                )}
                Discussion/Lab: <b>{details[0]}</b>
                
              </div>
            );
            sec.push(<div> Location: {details[1].location}</div>);
            for (const discussions of Object.entries(details[1].time)) {
              sec.push(
                <div>
                  {discussions[0]} {discussions[1]}
                </div>
              );
            }
            sec.push(<p></p>);
          }
        }
        sec.join(" ");
      }
    }

    return (
      <div>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="text" eventKey="0">
                {this.props.data.number}{" "}
                {this.props.likeFlag && (
                  <div>
                    <Button
                      variant="outline-danger"
                      style={dislikebutton}
                      onClick={event => {
                        this.props.dislikeCourse(this.props.courseId);
                        event.stopPropagation();
                      }}
                    >
                      dislike
                    </Button>{" "}
                    <Button
                      variant="outline-success"
                      style={likebutton}
                      onClick={event => {
                        this.props.likeCourse(this.props.courseId);
                        event.stopPropagation();
                      }}
                    >
                      like
                    </Button>
                  </div>
                )}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Card.Title>
                  {this.props.addCourseToCart && (
                    <Button
                    class="btn btn-outline-primary mr-1 btn-sml"
                    style={addbutton}
                      onClick={() =>
                        this.props.addCourseToCart(
                          this.props.courseId,
                          this.props.data
                        )
                      }
                    >
                        add   
                    </Button>
                  )}
                  {this.props.removeCourseFromCart && (
                    <Button
                    class="default btn-sml"
                      style={removebutton}
                      onClick={() =>
                        this.props.removeCourseFromCart(this.props.courseId)
                      }
                    >
                         remove      
                    </Button>
                  )}
                  {this.props.data.name}
                  
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <div>Credits: {this.props.data.credits}</div>
                  <p>
                    <div>Requisites: {this.reqs()}</div>
                  </p>
                </Card.Subtitle>
                <p>{this.props.data.description}</p>

                {/* Lecture Details/Sections */}
                {this.props.showSections && (
                  <Accordion>
                    <Card style={{border:"none"}}>
                      <Accordion.Toggle as={Button} variant="text" eventKey="0">
                        <div align="left">
                    
                          <Card.Header  style={lecturedetails}>Lecture Details</Card.Header>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <p>
                            <div>{sec}</div>
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default Course;
