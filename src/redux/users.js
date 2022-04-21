import * as ActionTypes from './ActionTypes';

export const User = (state = {
    isAuthUser: !!localStorage.getItem("user"),
    id: null,
    name: null,
    surname: null,
    completedTests: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USER:
            localStorage.setItem("user", JSON.stringify(action.payload.id));
            return { ...state, isAuthUser: true, id: action.payload.id, name: action.payload.name, surname: action.payload.surname, completedTests: [], error: null };

        case ActionTypes.DELETE_USER:
            localStorage.removeItem("user");
            return { ...state,  isAuthUser: false, id: null, name: null, surname: null, completedTests: [], error: null }

        case ActionTypes.USER_FAILED:
            return { ...state, error: action.payload }

        default:
            return state;
    }
};