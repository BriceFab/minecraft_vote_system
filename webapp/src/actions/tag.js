import { axiosGet } from '../services/axios';
import { ACTIONS } from './actions-types';

const URI = 'tag';

export const getTagsByType = (id_type) => dispatch => {
    return axiosGet(`${URI}/${id_type}`).then((res) => {
        dispatch({
            type: ACTIONS.TAG.GET_ALL_BY_TYPE,
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