import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";

class AuthNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen
    };
    if (!this.state.collapseOpen) {
      newState.color = "bg-white";
    } else {
      newState.color = "navbar-transparent";
    }
    this.setState(newState);
  };
  render() {
    return (
      <Navbar
        className={classnames("navbar-absolute fixed-top", this.state.color)}
        expand="lg"
      >
        <Container>
          <div className="navbar-wrapper">
            <NavbarBrand>
              <img src="https://i.ibb.co/sV4Hhd0/Heremes-Logo-Small.png" alt="Hermes Logo" /> Hermes Therapy Tracker
            </NavbarBrand>
          </div>
          <button
            aria-controls="navigation-index"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-toggle="collapse"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse
            isOpen={this.state.collapseOpen}
            className="justify-content-end"
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink to="/auth/about" className="nav-link">
                  <i className="nc-icon nc-atom" />
                  Dev Team
                </NavLink>
              </NavItem>
              

              <NavItem>
                <NavLink to="/auth/register" className="nav-link">
                  <i className="nc-icon nc-simple-add" />
                  Register
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink to="/auth/login" className="nav-link">
                  <i className="nc-icon nc-circle-10" />
                  Login
                </NavLink>
              </NavItem>

            
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AuthNavbar;
