import * as ActionTypes from './ActionTypes';

export const Quizzes = (state = 
  { isLoading: true,
    errMess: null,
    quizzes:[]}, action) => {
  switch (action.type) {
    case ActionTypes.GET_QUIZZES:
        const payload = action.payload.map((quiz) => {
          return({...quiz})
        });
        return {...state, isLoading: false, errMess: null, quizzes: payload};

    case ActionTypes.QUIZZES_LOADING:
        return {...state, isLoading: true, errMess: null, quizzes: []}

    case ActionTypes.QUIZZES_FAILED:
        return {...state, isLoading: false, errMess: action.payload, quizzes: []};

    default:
      return state;
  }
};