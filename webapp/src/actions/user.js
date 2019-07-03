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
                messages: 'Login avec succès'
            }
        });
        return res.data;
    }, (error) => {
        let login_try = localStorage.getItem('login_try');
        if (error.response && error.response.data.error.type === 'limit') {
            const last_try_date = moment(localStorage.getItem('login_time')).add(CONFIG.API.LOGIN.RETRY_TIME, 'minutes');
            const act_date = moment(new Date());
            const retry_in = last_try_date.diff(act_date, 'minutes');

            toast.error(`Vous avez dépassé la limite d'essai de connexion. Réssayer dans ${retry_in ? retry_in : CONFIG.API.LOGIN.RETRY_TIME} minutes`);
            localStorage.removeItem('login_try');
        } else {
            if (!login_try) {
                localStorage.setItem('login_try', 1);
            } else {
                if (login_try < CONFIG.API.LOGIN.MAX_TRY) {
                    login_try++;
                    toast.warn(`Essai du mot de passe n°${login_try}/${CONFIG.API.LOGIN.MAX_TRY}`);
                    localStorage.setItem('login_try', login_try);

                    localStorage.removeItem('login_time');
                    if (login_try >= CONFIG.API.LOGIN.MAX_TRY) {
                        localStorage.setItem('login_time', moment(new Date()));
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