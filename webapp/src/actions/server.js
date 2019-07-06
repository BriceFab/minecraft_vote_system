import { axiosPost } from '../services/axios';
import { ACTIONS } from './actions-types';

const URI = 'server';

export const addServer = (server) => dispatch => {
    return axiosPost(`${URI}`, server).then((res) => {
        dispatch({
            type: ACTIONS.SERVER.ADD,
            payload: res.data
        });
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: 'Vous serveur a été créer'
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