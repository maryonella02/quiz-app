import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { User } from "./users";
import { createForms } from 'react-redux-form';
import { InitialLogin } from "./forms";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      user: User,
      ...createForms({
        login: InitialLogin
    })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
