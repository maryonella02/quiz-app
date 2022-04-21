import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { fetchQuizzes, deleteUser } from "../redux/ActionCreators";
import { connect } from "react-redux";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Quizzes from "./QuizzesComponent";
import Login from "./LoginComponent";
import Footer from "./FooterComponent";
import { Route } from "react-router-dom";
import PrivateRoute, { ProvideAuth } from "../shared/PrivateRoute";
import RenderQuiz from "./RenderQuizComponent";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
  return {
    quizzes: state.quizzes,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchQuizzes: () => dispatch(fetchQuizzes()),
  deleteUser: (id) => dispatch(deleteUser(id)),
});

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchQuizzes();
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} deleteUser={this.props.deleteUser} />
        <ProvideAuth>
          <div className="App">
            <TransitionGroup>
              <CSSTransition
                key={this.props.location.key}
                classNames="page"
                timeout={300}
              >
                <Switch location={this.props.location}>
                  <PrivateRoute path="/home">
                    <Home></Home>
                  </PrivateRoute>
                  <PrivateRoute path="/quizzes">
                    <Quizzes quizzes={this.props.quizzes}></Quizzes>
                  </PrivateRoute>
                  <Route
                    exact
                    path="/quiz/:id"
                    render={({ match }) => <RenderQuiz id={match.params.id} />}
                  />
                  <Route path="/">
                    <Login></Login>
                  </Route>
                  <Route path="*">
                    <div>this route is not here</div>
                  </Route>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>{" "}
          <Footer />
        </ProvideAuth>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
