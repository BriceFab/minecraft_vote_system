import { required, length, url, file } from "redux-form-validators";

const serverValidator = {
    name: [
        required(), length({ min: 5, max: 15 })
    ],
    url: [
        required(), url()
    ],
    ip: [
    ],
    description: [
        required(), length({ min: 15, max: 128 })
    ],
    banner: [
        file()
    ],
    id_type: [
        required()
    ]
};
export default serverValidator;