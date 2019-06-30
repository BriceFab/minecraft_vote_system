import { axiosPost } from '../services/axios';
import CONFIG from '../config';
import { ACTIONS } from './actions-types';
import { toast } from 'react-toastify';

export const register = (user) => (dispatch) => {
    // TODO
    axiosPost(`${CONFIG.API.BASE_URL}/user/register`, user).then((res) => {
        toast.success('succes')

        dispatch({
            type: ACTIONS.USER.REGISTER,
            payload: res.data
        })
    }, (error) => {
        toast.error('Erreur')

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