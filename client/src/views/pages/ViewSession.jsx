/* eslint-disable react/prop-types */
import React, { Component } from "react";
import withAuth from "../../components/withAuth";
import API from "../../utils/API";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class ViewSession extends Component {

  state = {
    // new session
    positiveInteractions: 0,
    appropriateRequests: 0,
    appropriateResponse: 0,
    difficultyWith: "",
    successWith: "",
    date: "",
    notes: [],
    note: "",
    author: "",
    noteDate: "",
    alert: null
  };

  //this.props.user.id <<-- GET THE USER ID
  componentDidMount() {
    API.getOneSession(this.props.match.params.id)
      .then(res => {
        this.setState(res.data);
      })
      .then(
        this.setState({
          noteDate: new Date()
        })
      )
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
    API.getUser(this.props.user.id)
      .then(res => {
        this.setState({
          author: res.data.name
        });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  handleClick = event => {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState({
      [name]: parseInt(value) + 1
    });
  }

  handleChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    
    API.postNewNote(this.props.match.params.id, {
      date: this.state.noteDate,
      note: this.state.note,
      author: this.state.author
    })
      .then(() => {
        window.location.reload(false);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }

  render() {
    return (
      <div className="content container">
        <Card className="card-signup">
          <CardHeader className="text-center">
            <CardTitle tag="h4">SESSION ON {this.state.date.slice(0, 10)}</CardTitle>
          </CardHeader>
          <CardBody>
            <hr></hr>
            <Form className="form">
              <Row className="text-center">
                {/* ###########  POSITIVE INTERACTIONS ############## */}
                <Col md="4">
                  <Card>
                    <CardHeader style={{ fontSize: "1rem" }}>Positive Interactions</CardHeader>
                    <CardBody>
                      <h1 style={{
                        marginBlock: "0px",
                        fontSize: "4.5em",
                        color: "#51bcda"
                      }}>{this.state.positiveInteractions}</h1>
                    </CardBody>
                  </Card>


                </Col>
                {/* ###########  APPROPRIATE REQUESTS ############## */}
                <Col md="4">
                  <Card>
                    <CardHeader style={{ fontSize: "1rem" }}>Appropriate Requests</CardHeader>
                    <CardBody>
                      <h1 style={{
                        marginBlock: "0px",
                        fontSize: "4.5em",
                        color: "#51cbce"
                      }}>{this.state.appropriateRequests}</h1>
                    </CardBody>
                  </Card>

                </Col>
                {/* ###########  APPROPRIATE RESPONSES ############## */}
                <Col md="4">
                  <Card>
                    <CardHeader style={{ fontSize: "1rem" }}>Appropriate Responses</CardHeader>
                    <CardBody>
                      <h1 style={{
                        marginBlock: "0px",
                        fontSize: "4.5em",
                        color: "#6bd098"
                      }}>{this.state.appropriateResponse}</h1>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
              {/* ###########  HAD DIFFICULTY WITH ############## */}
              <label style={{ fontSize: "1rem" }}>My child had difficulty with:</label>
              <FormGroup>
                <Input
                  className="form-control"
                  placeholder="Uses this area to record places where you observered your child having difficulty"
                  name="difficultyWith"
                  type="textarea"
                  id="difficultyWith"
                  autoComplete="difficultyWith"
                  value={this.state.difficultyWith}
                  disabled/>
              </FormGroup>


              {/* ###########  HAD SUCCESS WITH ############## */}
              <label style={{ fontSize: "1rem" }}>My child had SUCCESS with:</label>
              <FormGroup>
                <Input
                  className="form-control"
                  placeholder="Uses this area to record places your child's accomplishments today"
                  name="successWith"
                  type="textarea"
                  id="successWith"
                  autoComplete="successWith"
                  value={this.state.successWith}
                  disabled/>
              </FormGroup>

              <label style={{ fontSize: "1rem" }}>NOTES:</label>
              {this.state.notes.map( note => {
                return (
                  <Card key={note._id}>
                    <p key={note._id}></p>
                    <CardBody style={{marginBottom:"0px"}}>
                      <CardSubtitle className="text-muted"><i> Note By: {note.author}</i>
                        <small className="float-right text-muted">
                  Date: {note.date.slice(0, 10)}</small></CardSubtitle>
                      <p>&quot;{note.note}&quot;
                      </p>
                    </CardBody>
                  
                  </Card>
                );
              })}
              <FormGroup>
                <Input
                  className="form-control"
                  placeholder="Use this area to record any notes you may have for a therapist"
                  name="note"
                  type="textarea"
                  id="note"
                  autoComplete="note"
                  value={this.state.note}
                  onChange={this.handleChange}
                />
              </FormGroup>

            
            </Form>
          </CardBody>
          <CardFooter>

            <Button
              type="submit" className="btn btn-primary btn-block" onClick={this.handleFormSubmit}>
              Add Note
            </Button>
          </CardFooter>
        </Card>

      </div>
    );
  }
}

export default withAuth(ViewSession);