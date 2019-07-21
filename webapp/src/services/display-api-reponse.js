import { toast } from "react-toastify";
import i18next from 'i18next';

export const displayError = (error) => {
    let messages = [];

    if (error.response) {
        console.log('error response', error.response);
        if (error.response.status === 401) {
            messages = [`Vous n'êtes pas autorisé à effectuer cette action`];
        } else if (error.response.data.error && error.response.data.error.messages) {
            messages = error.response.data.error.messages;
        } else {
            messages = [`Une erreur est survenue`];
        }
    } else if (error.request) {
        console.log('error request', error.request);
        messages = ['connection refused'];
    } else {
        console.log('error message', error.message);
        messages = error.message ? [error.message] : ['error message'];
    }

    // messages.forEach(message => {
        // toast.error(i18next.t(message.toString()));
    // });

    if (messages.length > 0) {
        toast.error(i18next.t(messages[0].toString()));
    }

    return messages;
};

export const displaySuccess = (messages) => {
    messages = typeof messages === 'string' ? messages.split() : messages;

    messages.forEach(message => {
        toast.success(i18next.t(message.toString()));
    });

    return messages;
};