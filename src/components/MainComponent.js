import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import {
  createUser,
  deleteUser
} from "../redux/ActionCreators";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Quizzes from './QuizzesComponent';
import AuthRoute from "../shared/AuthRoute";
import Login from "./LoginComponent";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
  createUser: (name, surname) => dispatch(createUser(name, surname))
});


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }

  render() {
    if (this.props.user.isAuthUser) {
      <Header />
    }
    return (
      <div className="App">
        <Switch >
          <Route path="/login"><Login  user={this.props.user}    createUser={this.props.createUser}></Login></Route>
          <Route path="/home"><Home></Home></Route>
          {/* <AuthRoute
            path="/" type="guest"   render ={Login}>
          </AuthRoute>
          <AuthRoute
            path="/home" type="private"
            render ={Home}
          />
          <AuthRoute
            path="/quizzes" type="private"
            render ={Quizzes}
          /> */}
        </Switch >
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));