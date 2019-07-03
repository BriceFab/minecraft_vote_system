import { toast } from "react-toastify";
import i18next from 'i18next';

export const displayError = (error) => {
    let messages = [];

    if (error.response) {
        console.log('error response', error.response);
        messages = error.response.data.error.messages;
    } else if (error.request) {
        console.log('error request', error.request);
        messages = ['connection refused'];
    } else {
        console.log('error message', error.message);
        messages = ['error message'];
    }

    // messages.forEach(message => {
        // toast.error(i18next.t(message.toString()));
    // });

    toast.error(i18next.t(messages[0].toString()));

    return messages;
};

export const displaySuccess = (messages) => {
    messages = typeof messages === 'string' ? messages.split() : messages;

    messages.forEach(message => {
        toast.success(i18next.t(message.toString()));
    });

    return messages;
};