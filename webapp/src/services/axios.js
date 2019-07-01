import axios from 'axios';
import CONFIG from '../config';
import jwt from 'jsonwebtoken';
// import jwt_decode from 'jwt-decode';

let instance = axios.create({
    baseURL: CONFIG.API.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') || "not set",
    }
});

instance.interceptors.request.use((config) => {
    // console.log("axios config", config);
    try {
        // const token = localStorage.getItem("token");
        // // console.log("token", token)

        // if (token) {
        //     let decoded = jwt_decode(token);
        //     // console.log("decoded", decoded)
        //     // console.log("check time", Date.now() / 1000)

        //     if (Date.now() / 1000 > decoded.exp) {
        //         console.log("token expired");

        //         clearToken();
        //         window.location.href = '/login';
        //         window.location.reload(true);
        //     } else {
        //         // console.log("not expired")
        //     }
        // }
    } catch (err) {
        console.log("no token", err)
    }

    //encrypt request
    if (process.env.NODE_ENV !== 'development') {
        try {
            config.data = {
                encrypted: true,
                data: jwt.sign(config.data, CONFIG.API.SECRET_ENCRYPTION)
            }
        } catch (err) {
            console.log('error when encrypt request', err);
        }
    }

    return config;
}, (error) => {
    // console.log("axios error", error)
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    if (response.data.encrypted) {
        try {
            response.data = jwt.verify(response.data.data, CONFIG.API.SECRET_ENCRYPTION);
        } catch (err) {
            console.log('error when decrypt response', err);
        }
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export const axiosGet = (url) => {
    return instance.get(url);
};

export const axiosPost = (url, data) => {
    return instance.post(url, data);
};

export const axiosPut = (url, data) => {
    return instance.put(url, data)
};

export const axiosDelete = (url, data) => {
    return instance.delete(url, { data: data })
};
