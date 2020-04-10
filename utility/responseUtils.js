const userDetailsResponseObject = (userObj) => {
  return {
    createdAt: userObj.createdAt,
    email: userObj.email,
    firstName: userObj.firstName,
    id: userObj.id,
    lastName: userObj.firstName,
    updatedAt: userObj.updatedAt,
  };
};

module.exports = { userDetailsResponseObject };
