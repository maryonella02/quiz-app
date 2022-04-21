import React from "react";
import { Card, CardTitle, CardText, CardBody, Button } from "reactstrap";

import Loading from "./LoadingComponent";
import Error from "./ErrorComponent";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

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
        <Button onClick={handleQuizRedirect}>Go to The Quiz </Button>
      </CardBody>
    </Card>
  );
}

const Quizzes = (props) => {
  const quizzes = (
    <div className="align-quizzes">
      {props.quizzes.quizzes.map((quiz) => {
        return (
          <div className="p-2 bd-highlight" key={quiz.id}>
            <RenderQuizzesItem quiz={quiz} />
          </div>
        );
      })}
    </div>
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
        <div className="">{quizzes}</div>
      </div>
    );
  }
};

export default withRouter(Quizzes);
