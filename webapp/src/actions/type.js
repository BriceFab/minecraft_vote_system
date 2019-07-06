import { axiosGet } from '../services/axios';
import { ACTIONS } from './actions-types';

const URI = 'type';

export const getTypes = () => dispatch => {
    return axiosGet(`${URI}`).then((res) => {
        dispatch({
            type: ACTIONS.TYPE.GET_ALL,
            payload: res.data
        });
        return res.data.data;
    }, (error) => {
        dispatch({
            type: ACTIONS.API.ERROR,
            payload: error
        });
    });
};