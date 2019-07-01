import {toast} from "react-toastify";

export const displayError = (error) => {
    let messages = error.response.data.error.messages;

    messages.forEach(message => {
        toast.error(message.toString());
    });

    return messages;
};

export const displaySuccess = (messages) => {
    messages = typeof messages === 'string' ? messages.split() : messages;

    messages.forEach(message => {
        toast.success(message.toString());
    });

    return messages;
};