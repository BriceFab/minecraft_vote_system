import { axiosPost, axiosGet, axiosDelete, axiosPut } from '../services/axios';
import { ACTIONS } from './actions-types';

const URI = 'server';

export const addServer = (server) => dispatch => {
    return axiosPost(`${URI}`, server).then((res) => {
        dispatch({
            type: ACTIONS.SERVER.ADD,
            payload: res.data.data
        });
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: 'Votre serveur a été créer'
            }
        });
        return res.data.data;
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};

export const getMyServers = () => dispatch => {
    axiosGet(`${URI}/my`).then((res) => {
        dispatch({
            type: ACTIONS.SERVER.GET_ALL_MY,
            payload: res.data
        });
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: {
                message: 'Erreur lors de la récupération des serveurs'
            }
        });
    });
};

export const deleteMyServer = (server) => dispatch => {
    axiosDelete(`${URI}/my/${server.id_server}`).then((res) => {
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: `${server.name} a été supprimé avec succès`
            }
        });
        dispatch({
            type: ACTIONS.SERVER.DELETE_MY,
            payload: {
                id_server: server.id_server
            }
        });
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};

export const editMyServer = (server) => dispatch => {
    axiosPut(`${URI}/my/${server.id_server}`, server).then((res) => {
        dispatch({
            type: ACTIONS.API.SUCCESS,
            payload: {
                response: res,
                messages: `${server.name} a été modifié avec succès`
            }
        });
        dispatch({
            type: ACTIONS.SERVER.EDIT_MY,
            payload: res.data.data
        });
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};