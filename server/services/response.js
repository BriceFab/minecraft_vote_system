const httpStatus = require('http-status');

module.exports.success = (res, data, code) => {
  return res.status(code ? code : httpStatus.ACCEPTED).json({
      success: true,
      data
  });
};

module.exports.error = (res, err, code) => {
    return res.status(code ? code : httpStatus.UNAUTHORIZED).json({
        success: false,
        error: err
    });
};