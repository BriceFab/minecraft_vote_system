import { ACTIONS } from "../actions/actions-types";
import CONFIG from "../config";
import { logout } from "../actions/user";

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
            localStorage.removeItem(CONFIG.STORAGE.LOGIN_TRY_COUNT);
            localStorage.removeItem(CONFIG.STORAGE.LOGIN_LAST_TRY);
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
            console.log('logout')
            return { ...state };
    }
}