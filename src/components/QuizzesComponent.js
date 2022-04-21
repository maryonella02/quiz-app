import React from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardColumns,
  CardBody,
  Button,
} from "reactstrap";

import Loading from "./LoadingComponent";
import Error from "./ErrorComponent";
import { useHistory } from "react-router-dom";

function RenderQuizzesItem({ quiz }) {
  const history = useHistory();
  const handleQuizRedirect = () => {
    history.push(`/quiz/${quiz.id}`);
  };
  return (
    <Card>
      <CardBody>
        <CardTitle> {quiz.title}</CardTitle>
        <CardText> Questions: {quiz.questions_count}</CardText>
        <Button onClick={handleQuizRedirect}>Go to Quiz </Button>
      </CardBody>
    </Card>
  );
}

const Quizzes = (props) => {
  const quizzes = (
    <CardColumns>
      {props.quizzes.quizzes.map((quiz) => {
        return (
          <div className="col-12 col-md-5 m-1" key={quiz.id}>
            <RenderQuizzesItem quiz={quiz} />
          </div>
        );
      })}
    </CardColumns>
  );
  if (props.quizzes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.quizzes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Error />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">{quizzes}</div>
      </div>
    );
  }
};

export default Quizzes;
