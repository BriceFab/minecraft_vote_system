import { ACTIONS } from "../actions/actions-types";

const initialState = {
    loggedIn: false,
    token: null,
    current: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
        case ACTIONS.USER.LOGIN:
            state.loggedIn = true;
            return { ...state };
        case ACTIONS.USER.SET_TOKEN:
            const token = action.payload;
            if (!localStorage.getItem('token')) {
                localStorage.setItem('token', token);
            }
            state.token = token;
            state.loggedIn = true;
            return {...state};
        case ACTIONS.USER.LOGOUT:
            localStorage.removeItem('token');
            state.loggedIn = false;
            state.token = null;
            state.current = null;
            return {...state};
    }
}