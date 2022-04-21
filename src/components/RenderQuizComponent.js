import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Quiz from "./QuizComponent";
import Loading from "./LoadingComponent";
import Error from "./ErrorComponent";
import { fetchQuiz } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchQuiz: (id) => dispatch(fetchQuiz(id)),
});

class RenderQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
    };
  }

  componentDidMount() {
    this.props.fetchQuiz(this.props.id);
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.id;
    let newId = this.props.id;
    if (newId !== oldId) this.props.fetchQuiz(newId);
  }

  render() {
    const isLoading = this.props.quiz.isLoading;

    const errMess = this.props.quiz.errMess;

    if (isLoading)
      return (
        <div className="quiz" style={this.props.bgStyle}>
          <Loading />
        </div>
      );

    if (errMess)
      return (
        <div className="quiz" style={this.props.bgStyle}>
          <Error />
        </div>
      );

    if (this.props.quiz) return <Quiz quiz={this.props.quiz} />;
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RenderQuiz)
);
