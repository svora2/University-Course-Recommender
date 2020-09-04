import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import SearchAndFilter from './SearchAndFilter';
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const tagsstyle = {
    borderRadius:'45px',
    backgroundColor:"#b7a9d6",
    border:"none"
};
const andor={
  backgroundColor:"FFB74C",
 // borderRadius:'40px'
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef();
    this.minimumCredits = React.createRef();
    this.maximumCredits = React.createRef();
    this.search = React.createRef();
    this.state = {
      tagList: [],
      selector: 'AND'
    };
  }

  setCourses() {
    this.props.setCourses(
      this.searchAndFilter.searchAndFilter(
        this.props.courses,
        this.state.tagList, 
        this.subject.current.value,
        this.minimumCredits.current.value,
        this.maximumCredits.current.value,
        this.state.selector
      )
    );
  }

  handleCreditsKeyDown(e) {
    if(['0','1','2','3','4','5','6','7','8','9','Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].indexOf(e.key) === -1)
      e.preventDefault();
  }

  getSubjectOptions() {
    let subjectOptions = [];

    for(const subject of this.props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  }

  addToTagList(target) {
    if (target.charCode === 13) {
      this.setState({
        tagList: Array.from(new Set(this.state.tagList.concat(this.search.current.value)))
      }, () => {
        this.setCourses();
      });
      this.search.current.value = '';
      }
  }

  removeTag(tag) {
    this.setState({
      tagList: this.state.tagList.filter((t) => t !== tag)
    }, () => {
      if (this.state.tagList.length) {
        this.setCourses();
      }
    });
  }

  changeSelector(selector) {
    this.setState({
      selector
    }, () => {
      if (this.state.tagList.length) {
        this.setCourses();
      }
    });
  }

  render() {
    return (
      <>
        <Card style={{width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', position: 'fixed'}}>
          <Card.Body>
            <Card.Title>Search and Filter</Card.Title>
            <Form>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <Form.Group controlId="searchSelector">
                <ButtonGroup style={andor}>
                <Form.Check type="radio" name="searchSelector" label="AND" checked={this.state.selector === 'AND'} onChange={() => this.changeSelector('AND')} />
                <Form.Check type="radio" name="searchSelector" label="OR" checked={this.state.selector === 'OR'} onChange={() => this.changeSelector('OR')}/>
                </ButtonGroup>
              </Form.Group>
</div>
             <Form.Group controlId="formKeywords" onKeyPress={(target) => this.addToTagList(target)} style={{width: '100%'}}>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="enter tag" autoComplete="off" ref={this.search}/>
              </Form.Group>

              {this.state.tagList.length !== 0 && 
                  <ul>
                    {
                      this.state.tagList.map((tag) => <ui>
                         {}&nbsp;
                        <Button
                        style={tagsstyle}
                          onClick={() =>
                            this.removeTag(tag)
                          }
                        >
                          x {tag}
                        </Button>
                     </ui>)
                    }
                  </ul>
              }

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control as="select" ref={this.subject} onClick={() => this.setCourses()}>
                  {this.getSubjectOptions()}
                </Form.Control>
              </Form.Group>

              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Form.Group controlId="minimumCredits" onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Label>Credits</Form.Label>
                  <Form.Control type="text" placeholder="min" autoComplete="off" ref={this.minimumCredits}/>
                </Form.Group>
                <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '38px'}}>to</div>
                <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Control type="text" placeholder="max" autoComplete="off" ref={this.maximumCredits}/>
                </Form.Group>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Sidebar;