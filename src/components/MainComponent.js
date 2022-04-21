import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import {
  createUser,
  deleteUser,
  fetchQuizzes
} from "../redux/ActionCreators";
import { connect } from "react-redux";
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Quizzes from './QuizzesComponent';
import Login from "./LoginComponent";
import { Route } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    quizzes:state.quizzes
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
  createUser: (name, surname) => dispatch(createUser(name, surname)),
  fetchQuizzes: () =>  dispatch(fetchQuizzes()),
});


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    };
  }
  componentDidMount() {
    this.props.fetchQuizzes();
}

  render() {
    if (this.props.user.isAuthUser) {
      <Header />
    }
    return (
      <div className="App">
        <Switch >
          <Route path="/login"><Login user={this.props.user} createUser={this.props.createUser}></Login></Route>
          <Route path="/home"><Home></Home></Route>
          <Route path="/quizzes"><Quizzes
                  quizzes={this.props.quizzes}
            ></Quizzes></Route>
        </Switch >
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));