/* eslint-disable react/prop-types */
import React, { Component } from "react";
import withAuth from "../../components/withAuth";
import API from "../../utils/API";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col
} from "reactstrap";
import resources from "./../../resources.json";

import SessionTable from "../tables/SessionTable";
import SessionsGraph from "../components/SessionsGraph";

class ChildPage extends Component {

  state = {
    // new child
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    hasIEP: "",
    school: "",
    diagnosis: "",
    therapist: "",
    sessions: [],
    _id: "",
    title: "",
    img: "",
    text: [],
    id: "",
    category: "",
    brief: ""
  };

  componentDidMount() {
    API.getOneChild(this.props.match.params.id)
      .then(res => {
        this.setState(res.data);
      })
      .then(() => {
        const { title, img, text, id, brief, category } = resources[this.state.sessions.length];
        this.setState({ title, img, text, id, brief, category });
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }

  showResource(arr) {

    if (arr.length === 0) {
      return (
        <Card className="text-center">
          <CardBody>
            <CardTitle><h3>No Resources At This Time.</h3></CardTitle>
            <CardText>Please visit the resource archive to find the resource you are looking for.</CardText>
            <Button href="/admin/resources" color="primary">View All Resources</Button>
          </CardBody>
        </Card>
      );} else {
      return (
        <Card>
          <Row>
            
            <Col md="4">
              <img src={this.state.img} id="resourceImage" style={{
                height: "270px",
                width: "100%",
                borderRadius: "12px 0px 0px 12px",
                objectFit: "cover"
              }}
              />
            </Col>

            <Col md="8">
              <CardBody>
                <CardHeader style={{ paddingLeft: "0px" }}>
                  <CardTitle>
                    <h2 style={{ marginBottom: "0px" }}><a href={"/admin/resource/" + this.state.id}>{this.state.title}</a></h2>
                    <small className="text-muted">{this.state.category}</small>
                  </CardTitle>
                </CardHeader>
                <p>{this.state.brief}</p>
              </CardBody>
            </Col>

          </Row>
        </Card>
      );
    }
  }


  render() {
    return (
      <div className="content">
        <Container>

          {/* ############# CHILD INFO CARD ################ */}
          <Card>
            <Row>
              <Col md="4">
                <img src={require("../../assets/img/childavatar.jpg")}
                />
              </Col>

              <Col md="8">
                <CardBody>
                  <CardHeader style={{ paddingLeft: "0px" }}>
                    <CardTitle>
                      <h2>{this.state.firstName} {this.state.lastName}</h2>
                    </CardTitle>
                  </CardHeader>

                  <Row>
                    <Col md="6">
                      <span style={{ fontSize: "1.1rem" }}><strong>Date of Birth:</strong> {this.state.dateOfBirth.slice(0, 10)}</span><br />
                      <span style={{ fontSize: "1.1rem" }}><strong>Gender:</strong> {this.state.gender}</span><br />
                      <span style={{ fontSize: "1.1rem" }}><strong>Has IEP?</strong>: {this.state.hasIEP ? "Yes" : "No"}</span><br />
                    </Col>
                    <Col md="6">
                      <span style={{ fontSize: "1.1rem" }}><strong>School:</strong> {this.state.school}</span><br />
                      <span style={{ fontSize: "1.1rem" }}><strong>Diagnosis:</strong> {this.state.diagnosis}</span><br />
                      <span style={{ fontSize: "1.1rem" }}><strong>Therapist:</strong> {this.state.therapist}</span><br />
                    </Col>

                    <Col md="12">
                      <hr></hr>
                      <h4>Is There A Therapy Session Today?</h4>
                      <Button className="btn-block btn-primary" href={`../newSession/${this.state._id}`} name="_id" value={this.state._id} size="lg">
                        Open Session Tracker
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Col>
            </Row>
          </Card>

          {/* ############# CHILD PROGRESS CHART ################ */}
          <SessionsGraph childId={this.props.match.params.id}/>

          {/* ############# CHILD SESSION HISTORY ################ */}
          <SessionTable />

          {/* ############# RESOURCES ################ */}
          {this.showResource(this.state.title)}

        </Container>
      </div>
    );
  }
}
  
export default withAuth(ChildPage);
  