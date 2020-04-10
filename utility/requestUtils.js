const getInvalidRequestParamErrorMessage = (errorObj) => {
  if (!errorObj) {
    return null;
  } else if (errorObj.value === undefined) {
    return `${errorObj.param} is a required field`;
  } else if (errorObj.msg === "Email already in use") {
    return errorObj.msg;
  } else {
    return `${errorObj.param} : ${errorObj.msg}`;
  }
};

module.exports = { getInvalidRequestParamErrorMessage };
