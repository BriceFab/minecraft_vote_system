module.exports.success = (res, data, code) => {
  return res.status(code ? code : 202).json({
      success:true,
      data
  });
};

module.exports.error = (res, err, code) => {
    return res.status(code ? code : 401).json({
        success:false,
        error: err
    });
};