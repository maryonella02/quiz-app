import { Card, CardTitle, CardText, Button, CardBody } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { VIEW_QUIZ, DO_QUIZ, END_QUIZ } from "../redux/ActionTypes";
import React, { Component } from "react";
import { submitAnswer } from "../redux/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
  submitAnswer: (answer, quizId) => dispatch(submitAnswer(answer, quizId)),
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
    quiz: state.quiz,
    answer: state.answer,
  };
};

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizActions: VIEW_QUIZ,
      numberOfAnsweredQuestions: 0,
    };
  }

  render() {
    const action = this.state.quizActions;
    if (action === VIEW_QUIZ)
      return (
        <div className="quiz">
          <Card>
            <CardBody>
              <CardTitle> {this.props.quiz.title}</CardTitle>
              <CardText>
                {" "}
                This quiz contains: {this.props.quiz.questions.length}{" "}
                questions.
              </CardText>
            </CardBody>
          </Card>

          <Button onClick={() => this.setState({ quizStage: DO_QUIZ })}>
            Start
          </Button>
        </div>
      );

    if (action === DO_QUIZ) {
      if (
        this.state.numberOfAnsweredQuestions ===
        this.props.quiz.quiz.questions.length
      ) {
        this.setState({
          quizStage: END_QUIZ,
        });
        return <div className="quiz"></div>;
      }

      const question = this.state.quiz.questions[this.state.questionN];
      return (
        <div className="quiz">
          <Card>
            <CardTitle variant="h6" component="div">
              Question {this.state.numberOfAnsweredQuestions + 1}/
              {this.props.quiz.quiz.questions.length}
            </CardTitle>
            <CardBody>
              <CardTitle variant="h6" component="div">
                {question.question.name}
              </CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    }

    if (action === END_QUIZ)
      return (
        <div className="quiz">
          <div className="home-content">
            <h1>Finish!</h1>
            <CardTitle>
              Your score is: {this.state.rightAns}/
              {this.props.quiz.quiz.questions.length}
            </CardTitle>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("/quizzes")}
            >
              Go back To Quizzes!
            </Button>
          </div>
        </div>
      );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz));
