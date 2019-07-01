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
        });
    }, (error) => {
        toast.error('Erreur')

        console.log('erreur');
    });
};

export const login = (user) => dispatch => {
    axiosPost(`${CONFIG.API.BASE_URL}/user/login`, user).then((res) => {
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
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};