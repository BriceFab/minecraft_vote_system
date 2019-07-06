import { ACTIONS } from "../actions/actions-types";

const initialState = {
    all: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
        case ACTIONS.TYPE.GET_ALL:
            state.all.push(action.payload);
            return { ...state };
    }
}