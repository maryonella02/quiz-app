import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { deleteUser, fetchQuizzes } from "../redux/ActionCreators";
import { connect } from "react-redux";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Quizzes from "./QuizzesComponent";
import Login from "./LoginComponent";
import { Route } from "react-router-dom";
import PrivateRoute, { ProvideAuth } from "../shared/PrivateRoute";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    quizzes: state.quizzes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
  fetchQuizzes: () => dispatch(fetchQuizzes()),
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
    };
  }
  componentDidMount() {
    this.props.fetchQuizzes();
  }

  render() {
    return (
      <ProvideAuth>
        <div className="App">
          <Switch>
            {/* <PrivateRoute>
              <Header />
            </PrivateRoute> */}
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/home">
              <Home></Home>
            </PrivateRoute>
            <PrivateRoute path="/quizzes">
              <Quizzes quizzes={this.props.quizzes}></Quizzes>
            </PrivateRoute>
            <Route path="*">
              <div>this route is not here</div>
            </Route>
            {/* <Route
              exact
              path="/quiz/:id"
              render={({ match }) => (
                <Quiz
                  id={match.params.id}
                  quiz={this.props.quiz}
                  user={this.props.user}
                  fetchQuiz={this.props.fetchQuiz}
                  submitAnswer={this.props.submitAnswer}
                  answer={this.props.answer}
                />
              )}
            /> */}
          </Switch>
        </div>
      </ProvideAuth>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
