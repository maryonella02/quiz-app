import * as ActionTypes from "./ActionTypes";

export const Answer = (
  state = { isLoading: false, errMess: null, answer: null },
  action
) => {
  switch (action.type) {
    case ActionTypes.GET_ANSWER:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        answer: action.payload,
      };

    case ActionTypes.ANSWER_LOADING:
      return { ...state, isLoading: true, errMess: null, answer: null };

    case ActionTypes.ANSWER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        answer: null,
      };

    default:
      return state;
  }
};
