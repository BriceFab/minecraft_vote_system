import { ACTIONS } from "../actions/actions-types";

const initialState = {
    all_by_type: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
        case ACTIONS.TAG.GET_ALL_BY_TYPE:
            state.all_by_type = action.payload.data;
            return { ...state };
    }
}