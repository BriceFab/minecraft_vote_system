import { toast } from "react-toastify";

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