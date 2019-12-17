/* eslint-disable react/prop-types */
import React from "react";
import AuthService from "../../../components/AuthService";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";

class Login extends React.Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  state = {
    modal: false
  }

  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

  handleFormSubmit = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(() => {
        // once user is logged in
        // take them to their profile page
        this.props.history.replace("/admin/user-profile");
      })
      .catch(() => {
        this.toggleModal();
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  toggleModal(){
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="login-page">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form action="" className="form" method="">
                <Card className="card-login">
                  <CardHeader>
                    <CardHeader>
                      <h3 className="header text-center">Login</h3>
                    </CardHeader>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input 
                        placeholder="Email..."
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="pwd"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <br />
                  
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="btn-round mb-3"
                      color="info"
                      type="submit"
                      onClick={this.handleFormSubmit}
                    >
                      LOGIN
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage: `url(${require("assets/img/bg/learning-can-be-real-fun.jpg")})`
          }}
        />

        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <div className="modal-header justify-content-center">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.toggleModal()}>
              <span aria-hidden="true">×</span>
            </button>
            <h5 className="modal-title">Incorrect Login</h5>
          </div>
          <ModalBody>
            <p className="text-center">There was an error with your e-mail/password combination. Please try again.</p>
          </ModalBody>
          <ModalFooter>
            <Button className="mr-2" color="secondary" onClick={() => this.toggleModal()}>
                Close
            </Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default Login;
