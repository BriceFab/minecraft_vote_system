const { body } = require('express-validator');

module.exports = {
    username: [
        body('username')
            .exists().withMessage('Aucun pseudonyme')
            .isLength({ min: 5 }).withMessage('Pseudonyme doit contenir au minimum 5 caractères')
            .isLength({ max: 20 }).withMessage('Pseudonyme doit contenir au maximum 20 caractères')
    ],
    email: [
        body('email')
            .exists().withMessage('Aucune adresse email')
            .isEmail().withMessage('Adresse email invalide'),
    ],
    password: [
        body('password')
            .exists().withMessage('Aucun mot de passe')
            .isLength({ min: 8 }).withMessage('Mot de passe doit contenir au minimum 8 caractères')
            .isLength({ max: 128 }).withMessage('Mot de passe doit contenir au maximum 128 caractères'),
    ]
}