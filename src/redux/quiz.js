import * as ActionTypes from "./ActionTypes";

export const Quiz = (
  state = {
    isLoading: false,
    errMess: null,
    quiz: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_QUIZ:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        quiz: action.payload,
      };

    case ActionTypes.QUIZ_LOADING:
      return { ...state, isLoading: true, errMess: null, quiz: null };

    case ActionTypes.QUIZ_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        quiz: null,
      };

    default:
      return state;
  }
};
