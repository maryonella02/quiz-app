import React from "react";
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardColumns } from "reactstrap";

import Loading from "./LoadingComponent";
import Error from "./ErrorComponent";

function RenderQuizzesItem({ quiz }) {
    return (
        <CardColumns>
        <Card>
            <Link to={`/quiz/${quiz.id}`}>
                <CardTitle > {quiz.title}</CardTitle>
                <CardText > Questions: {quiz.questions_count}</CardText>
            </Link>
        </Card></CardColumns>
    );
}

const Quizzes = (props) => {

    const quizzes = props.quizzes.quizzes.map((quiz) => {
        return (
            <div className="col-12 col-md-5 m-1" key={quiz.id} >
                <RenderQuizzesItem quiz={quiz} />
            </div>
        );
    });
    if (props.quizzes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.quizzes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Error />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    {quizzes}
                </div>
            </div>
        );
    }
}

export default Quizzes;
