import Validators from 'redux-form-validators';

// console.log('validators messages', Validators.messages);

Object.assign(Validators.messages, {
    tooShort: "minimum {count, number} caractères",
    tooLong: "maximum {count, number} caractères",
    email: "Adresse email invalide",
    presence: "est requis",
});