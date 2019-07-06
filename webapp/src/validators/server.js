import { required, length } from "redux-form-validators";

const serverValidator = {
    name: [
        required(), length({ min: 5, max: 20 })
    ],
};
export default serverValidator;