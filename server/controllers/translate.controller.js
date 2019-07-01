const response = require('../services/response');
const log = require('../services/log');
const fs = require('fs');

module.exports.get = async (req, res) => {
    const lng = req.params['lng'];
    const filePath = `./translates/${lng}.json`;

    const exists = fs.existsSync(filePath);
    if (!exists) return response.sendError(res, 'translate not found', 'translate');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            log.logError(err);
            return response.sendError(res, err, 'translate');
        }

        res.json(JSON.parse(data));
    });
};

module.exports.post = async (req, res) => {
    const lng = req.params['lng'];
    const filePath = `./translates/${lng}.json`;

    const exists = fs.existsSync(filePath);
    if (!exists) return response.sendError(res, 'translate not found', 'translate');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            log.logError(err);
            return response.sendError(res, err, 'translate');
        }

        let json_translate = JSON.parse(data);
        const { term } = req.body;
        if (!json_translate[term]) {
            json_translate[term] = `t_${lng}_${term}`;
            fs.writeFileSync(filePath, JSON.stringify(json_translate, null, '\t'));

            response.sendSuccess(res, `term ${term} add`);
        } else {
            response.sendError(res, `term ${term} already exist`, 'translate');
        }
    });
};