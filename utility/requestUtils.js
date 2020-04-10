const getInvalidRequestParamErrorMessage = (errorObj) => {
  if (!errorObj) {
    return null;
  } else if (errorObj.value === undefined) {
    return `${errorObj.param} is a required field`;
  } else {
    return `${errorObj.param} has invalid value`;
  }
};

module.exports = { getInvalidRequestParamErrorMessage };
