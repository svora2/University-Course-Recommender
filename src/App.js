import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import PreviousCourses from "./PreviousCourses";
import CourseArea from "./CourseArea";
import InterestAreas from "./InterestAreas";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";


const tabs = {
  paddingTop:"50px",
  backgroundColor: "#92AAC7",
border:"none", 
width:'auto',
color:"white",
boxShadow: '2px 2px #888888'
};




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      cart: {},
      previousCourses: {},
      likedCourses: [], //array of course keys
      recommendedCourses: {},
      activeTab: props.activeTab || 1
    };
    this.addCourseToCart = this.addCourseToCart.bind(this);
    this.addSecToCart = this.addSecToCart.bind(this);
    this.addSubSecToCart = this.addSubSecToCart.bind(this);
    this.removeCourseFromCart = this.removeCourseFromCart.bind(this);
    this.removeSecFromCart = this.removeSecFromCart.bind(this);
    this.removeSubSecFromCart = this.removeSubSecFromCart.bind(this);
    this.likeCourse = this.likeCourse.bind(this);
    this.dislikeCourse = this.dislikeCourse.bind(this);
    this.exists = this.exists.bind(this);
    this.clearLikedCourses = this.clearLikedCourses.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch("https://mysqlcs639.cs.wisc.edu:5000/classes"),
      fetch(
        "https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed"
      )
    ])
      .then(([res, res2]) => Promise.all([res.json(), res2.json()]))
      .then(([data, data2]) => {
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
          previousCourses: data2.data
        });
      })
      .catch(err => {
        // console.log(err);
      });
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  clearLikedCourses() {
    let empty = [];
    this.setState({ likedCourses: empty });
  }

  likeCourse(courseId) {
    if (!this.exists(courseId)) {
      this.setState(
        prevState => ({
          likedCourses: [...prevState.likedCourses, courseId]
        }),
        () => {
          //console.log(this.state.likedCourses);
        }
      );
    }
  }
  //check if
  exists(courseId) {
    return this.state.likedCourses.some(course => courseId === course);
  }
  dislikeCourse(courseId) {
    this.setState(
      prevState => ({
        likedCourses: prevState.likedCourses.filter(
          course => course !== courseId
        )
      }),
      () => {
        console.log(this.state.likedCourses);
      }
    );
  }

  addCourseToCart(courseId, course) {
    this.setState({ cart: { ...this.state.cart, [courseId]: course } });
  }

  addSecToCart(sectionId, courseId, course) {
    this.setState({
      cart: {
        ...this.state.cart,
        [courseId]: {
          ...course,
          sections: {
            ...(this.state.cart[courseId] &&
              this.state.cart[courseId].sections),
            [sectionId]: course.sections[sectionId]
          }
        }
      }
    });
  }

  addSubSecToCart(subSecId, secId, courseId, course) {
    const selectedCourse =
      (this.state.cart && this.state.cart[courseId]) || course;
    const selectedSections =
      this.state.cart[courseId] && this.state.cart[courseId].sections;
    const selectedSubSec =
      selectedSections &&
      selectedSections[secId] &&
      selectedSections[secId].subsections;
    // console.log({ selectedSections, selectedSubSec });
    this.setState({
      cart: {
        ...this.state.cart,
        [courseId]: {
          ...selectedCourse,
          sections: {
            ...selectedSections,
            [secId]: {
              ...((selectedSections && selectedSections[secId]) ||
                course.sections[secId]),
              subsections: {
                ...selectedSubSec,
                [subSecId]: course.sections[secId].subsections[subSecId]
              }
            }
          }
        }
      }
    });
  }

  removeSubSecFromCart(subSecId, secId, courseId) {
    this.setState({
      cart: {
        ...this.state.cart,
        [courseId]: {
          ...this.state.cart[courseId],
          sections: {
            ...this.state.cart[courseId].sections,
            [secId]: {
              ...this.state.cart[courseId].sections[secId],
              subsections: {
                ...this.state.cart[courseId].sections[secId].subsections,
                [subSecId]: null
              }
            }
          }
        }
      }
    });
  }

  removeSecFromCart(secId, courseId) {
    this.setState({
      cart: {
        ...this.state.cart,
        [courseId]: {
          ...this.state.cart[courseId],
          sections: {
            ...this.state.cart[courseId].sections,
            [secId]: null
          }
        }
      }
    });
  }

  removeCourseFromCart(courseId) {
    this.setState({ cart: { ...this.state.cart, [courseId]: null } });
  }

  handleSelect(selectedTab) {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });
    
const tabSelected={
  color:'yellow'
};
return tabSelected;
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Tabs
          className="tabs"
          style={tabs}
          //defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          activeKey={this.state.activeTab}
          onSelect={this.handleSelect}
        >
          >
          <Tab eventKey={1} title="Courses"  >
            <Sidebar
              setCourses={courses => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
            />
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.state.filteredCourses}
                addCourseToCart={this.addCourseToCart}
                addSecToCart={this.addSecToCart}
                addSubSecToCart={this.addSubSecToCart}
                showSections={true}
              />
            </div>
          </Tab>
          <Tab eventKey={2} title="Recommend Courses">
            {/* <Container> */}
            <div class="row">
              <div class="col-sm-6">
                {/* <Container fluid={true}> */}
                <InterestAreas
                  data={this.state.allCourses}
                  previousCourses={this.state.previousCourses}
                  likedCourses={this.state.likedCourses}
                  clearLikedCourses={this.clearLikedCourses}
                  showInterestSidebar={true}
                  showRecCourses={true}
                  addCourseToCart={this.addCourseToCart}
                addSecToCart={this.addSecToCart}
                addSubSecToCart={this.addSubSecToCart}
               
                />
                {/* </Container> */}
              </div>

              <div class="col-sm-5" >
                {/* <Container fluid={true}> */}
                <Card>
                  <Card.Body>
                  <Card.Title> Course History </Card.Title>
                    <PreviousCourses
                      data={this.state.allCourses}
                      data2={this.state.previousCourses}
                      likeCourse={this.likeCourse}
                      dislikeCourse={this.dislikeCourse}

                    //  showRecCourses={false}
                    />
                  </Card.Body>
                </Card>
                {/* </Container> */}
              </div>

              <div class="col-sm">
                    <InterestAreas
                      data={this.state.allCourses}
                      previousCourses={this.state.previousCourses}
                      likedCourses={this.state.likedCourses}
                      clearLikedCourses={this.clearLikedCourses}
                      addCourseToCart={this.addCourseToCart}
                      addSecToCart={this.addSecToCart}
                      addSubSecToCart={this.addSubSecToCart}
                      showInterestSidebar={false}
                      showSections={true}
                    showRecCourses={false}
                    />

              </div>
            </div>
          </Tab>
          <Tab eventKey={3} title="Cart">
            <Card>
              <Card.Body >
            {this.state.cart && (
              <CourseArea
                data={this.state.cart}
                removeCourseFromCart={this.removeCourseFromCart}
                removeSecFromCart={this.removeSecFromCart}
                removeSubSecFromCart={this.removeSubSecFromCart}
                showSections={true}
              />
            )}
            </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;
