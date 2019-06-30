import axios from 'axios';
// import jwt_decode from 'jwt-decode';

let instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') || "not set",
    }
});

instance.interceptors.request.use((config) => {
    // console.log("axios config", config)
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

    return config;
}, (error) => {
    // console.log("axios error", error)
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
