import { ACTIONS } from "../actions/actions-types";
import CONFIG from "../config";

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
            // window.location.href = '/';
            // window.location.reload(true);
            window.location.reload();
            return { ...state };
        case ACTIONS.USER.SET_TOKEN:
            const token = action.payload;
            if (!localStorage.getItem(CONFIG.STORAGE.TOKEN)) {
                localStorage.setItem(CONFIG.STORAGE.TOKEN, token);
            }
            state.token = token;
            state.loggedIn = true;
            return { ...state };
        case ACTIONS.USER.LOGOUT:
            localStorage.removeItem(CONFIG.STORAGE.TOKEN);
            state.loggedIn = false;
            state.token = null;
            state.current = null;
            return { ...state };
    }
}