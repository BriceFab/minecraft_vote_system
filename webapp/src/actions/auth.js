import { axiosPost } from '../services/axios';
import CONFIG from '../config';
import ACTIONS from './actions-types';

export const register = (user) => (dispatch) => {
    axiosPost(`${CONFIG.API.BASE_URL}/register`, user).then((res) => {
        dispatch({
            type: ACTIONS.USER.REGISTER,
            payload: res.data
        })
    }, (error) => {
        console.log('erreur');
    });
};

export const login = (email, password) => dispatch => {
    // axiosPost(`${CONFIG.API.BASE_URL}/login`, JSON.stringify({ email, password }), { headers: { 'Content-Type': 'application/json' } }).then((res) => {
    //     if (!localStorage.getItem('company')) {
    //         if (res.data.app_user.companies.length > 0) {
    //             localStorage.setItem('company', res.data.app_user.companies[0].id_company);
    //         } else {
    //             return alert("Vous n'êtes dans aucune entreprise.");
    //         }
    //         localStorage.setItem('user_id', res.data.app_user.id_user);
    //     }

    //     storeAuthInfo(res.data.token, res.data.app_user, dispatch)
    //     window.location.reload();

    // }, error => {
    //     dispatch(authError(error))
    // });
};