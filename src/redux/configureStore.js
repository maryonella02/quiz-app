import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { User } from "./users";
import { Quizzes } from "./quizzes";
import { Quiz } from "./quiz";
import { Answer } from "./answer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      user: User,
      quizzes: Quizzes,
      quiz: Quiz,
      answer: Answer,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
