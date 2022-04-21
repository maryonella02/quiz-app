import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import { DEV_TOKEN } from "../shared/variable";

const usersUrl = baseUrl + "users/";
const quizzesUrl = baseUrl + "quizzes/";

const postOptions = (data) => {
  var acceptedHeaders = new Headers();
  acceptedHeaders.append("X-Access-Token", DEV_TOKEN);
  acceptedHeaders.append("Content-Type", "application/json");
  acceptedHeaders.append("Connection", "keep-alive");

  return {
    method: "POST",
    headers: acceptedHeaders,
    body: data,
    redirect: "follow",
  };
};

const deleteOptions = () => {
  var acceptedHeaders = new Headers();
  acceptedHeaders.append("X-Access-Token", DEV_TOKEN);
  acceptedHeaders.append("Content-Type", "application/json");
  acceptedHeaders.append("Connection", "keep-alive");

  return {
    method: "DELETE",
    headers: acceptedHeaders,
    redirect: "follow",
  };
};

const getOptions = () => {
  var myHeaders = new Headers();
  myHeaders.append("X-Access-Token", DEV_TOKEN);
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Connection", "keep-alive");
  return {
    headers: myHeaders,
  };
};

export const createUser = (name, surname) => (dispatch) => {
  var raw = JSON.stringify({
    data: {
      name: name,
      surname: surname,
    },
  });

  return fetch(usersUrl, postOptions(raw))
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addUser(response)))
    .catch((error) => {
      error.response.json().then((errorA) => {
        error.response = errorA;
        console.log("post error", error.message);
        dispatch(userFailed(error));
      });
      throw new Error("");
    });
};

export const addUser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const userFailed = (error) => ({
  type: ActionTypes.USER_FAILED,
  payload: {
    errMess: error.message,
    response: error.response,
  },
});

export const deleteUser = (id) => (dispatch) => {
  return fetch(usersUrl + id, deleteOptions())
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(deleteSpecificUser(response)))
    .catch((error) => console.log(error.message));
};

export const deleteSpecificUser = () => ({
  type: ActionTypes.DELETE_USER,
});

// .

export const fetchQuizzes = () => (dispatch) => {
  dispatch(quizzesLoading(true));

  return fetch(quizzesUrl, getOptions())
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((quizzes) => dispatch(addQuizzes(quizzes)))
    .catch((error) => dispatch(quizzesFailed(error.message)));
};

export const quizzesLoading = () => ({
  type: ActionTypes.QUIZZES_LOADING,
});

export const quizzesFailed = (errmess) => ({
  type: ActionTypes.QUIZZES_FAILED,
  payload: errmess,
});

export const addQuizzes = (quizzes) => ({
  type: ActionTypes.GET_QUIZZES,
  payload: quizzes,
});

//.

export const fetchQuiz = (id) => (dispatch) => {
  dispatch(quizLoading(true));

  return fetch(quizzesUrl + id, getOptions())
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((quiz) => {
      dispatch(addQuiz(quiz));
    })
    .catch((error) => dispatch(quizFailed(error.message)));
};

export const quizLoading = () => ({
  type: ActionTypes.QUIZ_LOADING,
});

export const quizFailed = (errmess) => ({
  type: ActionTypes.QUIZ_FAILED,
  payload: errmess,
});

export const addQuiz = (quiz) => ({
  type: ActionTypes.GET_QUIZ,
  payload: quiz,
});

//.

export const submitAnswer = (answer, quizId) => (dispatch) => {
  dispatch(answerLoading(true));

  var raw = JSON.stringify({
    data: answer,
  });

  return fetch(quizzesUrl + quizId + "/submit", postOptions(raw))
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(getAnswer(response)))
    .catch((error) =>
      error.response.json().then((errorA) => {
        error.response = errorA;
        dispatch(answerFailed(error));
      })
    );
};

export const answerLoading = () => ({
  type: ActionTypes.ANSWER_LOADING,
});

export const answerFailed = (errmess) => ({
  type: ActionTypes.ANSWER_FAILED,
  payload: errmess,
});

export const getAnswer = (answer) => ({
  type: ActionTypes.GET_ANSWER,
  payload: answer,
});
