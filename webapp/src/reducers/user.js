import { ACTIONS } from "../actions/actions-types";
import CONFIG from "../config";
import { toast } from "react-toastify";

const initialState = {
    loggedIn: false,
    token: null,
    current: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        default: return state;
        case ACTIONS.USER.LOGIN: {
            state.loggedIn = true;
            localStorage.setItem(CONFIG.STORAGE.USERNAME, action.payload.user.username);
            window.location.reload();
            return { ...state };
        }
        case ACTIONS.USER.SET_TOKEN: {
            const token = action.payload;
            localStorage.setItem(CONFIG.STORAGE.TOKEN, token);
            state.token = token;
            state.loggedIn = true;
            const username = localStorage.getItem(CONFIG.STORAGE.USERNAME);
            toast.success(`Bienvenue ${username ? username : ''} !`);
            return { ...state };
        }
        case ACTIONS.USER.LOGOUT:
            localStorage.removeItem(CONFIG.STORAGE.TOKEN);
            localStorage.removeItem(CONFIG.STORAGE.USERNAME);
            state.loggedIn = false;
            state.token = null;
            state.current = null;
            return { ...state };
    }
}