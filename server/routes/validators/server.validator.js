const { body } = require('express-validator');

module.exports = {
    name: [
        body('name')
            .exists().withMessage('Aucun nom')
            .isLength({ min: 5 }).withMessage('Nom doit contenir au minimum 5 caractères')
            .isLength({ max: 15 }).withMessage('Nom doit contenir au maximum 15 caractères')
    ],
    url: [
        body('url')
            .exists().withMessage('Aucun url')
            .isURL().withMessage('Url invalide'),
    ],
    ip: [
        body('ip')
            .optional()
            .isIP().withMessage('Ip invalide'),
    ],
    description: [
        body('description')
            .exists().withMessage('Aucune description')
            .isLength({ min: 15 }).withMessage('Description doit contenir au minimum 15 caractères')
            .isLength({ max: 128 }).withMessage('Description doit contenir au maximum 128 caractères'),
    ],
    banner: [
        body('banner')
            .optional()
            .isMimeType('png').withMessage('Type de bannière invalide')
    ],
    type: [
        body('id_type')
            .exists().withMessage('Aucun type')
            .isUUID().withMessage('Type invalide')
    ],
}