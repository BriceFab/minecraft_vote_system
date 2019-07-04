import { axiosPost } from '../services/axios';
import { ACTIONS } from './actions-types';
import { toast } from 'react-toastify';
import CONFIG from '../config';
import moment from 'moment';

export const setToken = (token) => (dispatch) => {
    dispatch({
        type: ACTIONS.USER.SET_TOKEN,
        payload: token
    });
}

export const register = (user) => (dispatch) => {
    return axiosPost(`user/register`, user).then((res) => {
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: 'Compte créer avec succès. Confirmez votre adresse email'
            }
        });
        dispatch({
            type: ACTIONS.USER.REGISTER,
            payload: res.data
        });
        return res.data;
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};

export const login = (user) => dispatch => {
    return axiosPost(`user/login`, user).then((res) => {
        dispatch(setToken(res.data.data.token));
        dispatch({
            type: ACTIONS.USER.LOGIN,
            payload: res.data
        });
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: 'Vous êtes connecté'
            }
        });
        return res.data;
    }, (error) => {
        const act_date = moment(new Date());
        
        if (error.response && error.response.data.error.type === 'limit') {
            const last_try = localStorage.getItem(CONFIG.STORAGE.LOGIN_LAST_TRY);
            const last_try_date = moment(last_try).add(CONFIG.API.LOGIN.RETRY_TIME, 'minutes');
            let retry_in = last_try_date.diff(act_date, 'minutes');

            if (retry_in > CONFIG.API.LOGIN.RETRY_TIME || retry_in < 0) {
                retry_in = CONFIG.API.LOGIN.RETRY_TIME;
                localStorage.setItem(CONFIG.STORAGE.LOGIN_LAST_TRY, act_date);
            }

            if (!last_try) {
                localStorage.setItem(CONFIG.STORAGE.LOGIN_LAST_TRY, act_date);
            }

            toast.error(`Vous avez dépassé la limite d'essai de connexion. Réssayer dans ${retry_in ? retry_in : CONFIG.API.LOGIN.RETRY_TIME} minutes`);
            localStorage.removeItem(CONFIG.STORAGE.LOGIN_TRY_COUNT);
        } else {
            let login_try = localStorage.getItem(CONFIG.STORAGE.LOGIN_TRY_COUNT);

            if (!login_try) {
                localStorage.setItem(CONFIG.STORAGE.LOGIN_TRY_COUNT, 1);
            } else {
                if (login_try < CONFIG.API.LOGIN.MAX_TRY) {
                    login_try++;
                    toast.warn(`Essai de connexion n°${login_try}/${CONFIG.API.LOGIN.MAX_TRY}`);
                    localStorage.setItem(CONFIG.STORAGE.LOGIN_TRY_COUNT, login_try);

                    localStorage.removeItem(CONFIG.STORAGE.LOGIN_LAST_TRY);
                    if (login_try >= CONFIG.API.LOGIN.MAX_TRY) {
                        localStorage.setItem(CONFIG.STORAGE.LOGIN_LAST_TRY, act_date);
                    }
                }
            }
            dispatch({
                type: ACTIONS.API.ERROR,
                payload: error
            });
        }
    });
};

export const logout = () => dispatch => {
    dispatch({
        type: ACTIONS.USER.LOGOUT,
    });
};