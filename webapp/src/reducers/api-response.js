import {ACTIONS} from "../actions/actions-types";
import {displayError, displaySuccess} from "../services/display-api-reponse";

const initialState = {
    response: {},
    messages: []
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
        default:
            return state;
        case ACTIONS.API.ERROR:
            state.messages = displayError(action.payload);
            state.response = action.payload.response;
            return {...state};
        case ACTIONS.API.SUCCESS:
            state.messages = displaySuccess(action.payload.messages);
            state.response = action.payload.response;
            return {...state};
    }

    return state;
}