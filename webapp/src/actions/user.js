import { axiosPost } from '../services/axios';
import { ACTIONS } from './actions-types';
import { toast } from 'react-toastify';

export const setToken = (token) => (dispatch) => {
    dispatch({
        type: ACTIONS.USER.SET_TOKEN,
        payload: token
    });
}

export const register = (user) => (dispatch) => {
    // TODO
    axiosPost(`user/register`, user).then((res) => {
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

export const login = (user, history = null) => dispatch => {
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
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};