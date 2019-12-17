/* eslint-disable react/prop-types */
import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from "reactstrap";

import ChildTable from "../tables/ChildTable";

import withAuth from "../../components/withAuth";
import API from "../../utils/API";

class UserProfile extends React.Component {

  state = {
    name: "",
    email: "",
    children: [],
    address: "",
    role: "",
    phoneNumber: ""
  }

  componentDidMount() {

    API.getUser(this.props.user.id).then(res => {
      this.setState({
        name: res.data.name,
        email: res.data.email,
        address: res.data.address,
        role: res.data.role,
        phoneNumber: res.data.phoneNumber,
        children: res.data.children,
      });
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/bg/profilebg.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <a >
                      <img
                        alt="User Avatar"
                        className="avatar border-gray"
                        src={require("assets/img/onepunch.jpg")}
                      />
                      <h3 className="title" style={{marginBottom: "0px"}}>{this.state.name}</h3>
                    </a>
                    <h5 style={{fontStyle: "italic"}}>{this.state.role} </h5>
                  </div>

                  <ListGroup flush>

                    <ListGroupItem><p className="text-center" style={{
                      fontSize: "1rem",
                      marginBottom: "0px"
                    }}>
                      <i className="nc-icon nc-email-85 mx-2" />    {this.state.email}</p>
                    </ListGroupItem>

                    <ListGroupItem><p className="text-center" style={{
                      fontSize: "1rem",
                      marginBottom: "0px"
                    }}>
                      <i className="nc-icon nc-mobile mx-2" /> 
                      {this.state.phoneNumber}</p>
                    </ListGroupItem>

                    <ListGroupItem><p className="text-center" style={{
                      fontSize: "1rem",
                      marginBottom: "0px"
                    }}>
                      <i className="nc-icon nc-pin-3 mx-2" /> 
                      {this.state.address} </p>
                    </ListGroupItem>

                  </ListGroup>
                </CardBody>

              </Card>
          
            </Col>

            <Col md="8">
              <ChildTable/>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withAuth(UserProfile);
