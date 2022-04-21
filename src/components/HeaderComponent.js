import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.Logout = this.Logout.bind(this);

    this.state = {
      isNavOpen: false,
      user: this.props.user,
      deleteUser: this.props.deleteUser,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  Logout() {
    this.props.deleteUser(this.props.user.id);
  }

  render() {
    if (this.props.user.isAuthUser)
      return (
        <div>
          <Navbar dark expand="md">
            <div className="container">
              <NavbarToggler onClick={this.toggleNav} />
              <div className="row align-navbar">
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink className="nav-link" to="/home">
                        <span className="fa fa-home fa-lg"></span> Home
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to="/quizzes">
                        <span className="fa fa-address-card fa-lg"></span>{" "}
                        Quizzes
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                <div className="" navbar>
                  <Button outline onClick={this.Logout}>
                    <span className="fa fa-sign-in fa-lg"></span>Logout
                  </Button>
                </div>
              </div>
            </div>
          </Navbar>
        </div>
      );
  }
}
export default Header;
