import { ACTIONS } from "../actions/actions-types";

const initialState = {
    all: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
        case ACTIONS.SERVER.ADD:
            state.all.push(action.payload);
            return { ...state };
    }
}