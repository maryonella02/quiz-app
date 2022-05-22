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
import MusicButton from "./MusicComponent";
import { deleteUser } from "../redux/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./LoginComponent";
import { Route } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isNavOpen: false,
      user: this.props.user,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  logout() {
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
                <div className="flex" navbar>
                  <Button active className="m-1">
                    <MusicButton />
                  </Button>
                  <Button outline onClick={this.logout} className="m-1">
                    <span className="fa fa-sign-in fa-lg"></span>Logout
                  </Button>
                </div>
              </div>
            </div>
          </Navbar>
        </div>
      );
    else {
      return <Route path="/"></Route>;
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
