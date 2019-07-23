import { ACTIONS } from "../actions/actions-types";

const initialState = {
    my_all: [],
    all_by_filters: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
        case ACTIONS.SERVER.ADD:
            state.my_all.push(action.payload);
            return { ...state };
        case ACTIONS.SERVER.GET_ALL_MY:
            state.my_all = action.payload.data;
            return { ...state };
        case ACTIONS.SERVER.GET_ALL_BY_FILTERS:
            state.all_by_filters = action.payload.data;
            return { ...state };
        case ACTIONS.SERVER.DELETE_MY:
            state.my_all = state.my_all.filter(server => server.id_server !== action.payload.id_server);
            return { ...state };
        case ACTIONS.SERVER.EDIT_MY:
            state.my_all = state.my_all.map(server => {
                if (server.id_server !== action.payload.id_server) {
                    return action.payload;
                } else {
                    return server;
                }
            });
            return { ...state };
    }
}