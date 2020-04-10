"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );

  user.registerUser = ({
    inputEmail,
    inputFirstName,
    inputLastName,
    inputPassword,
  }) =>
    user
      .create({
        email: inputEmail,
        firstName: inputFirstName,
        lastName: inputLastName,
        password: inputPassword,
      })
      .then((response) => {
        return response;
      });

  user.isEmailTaken = (inputEmail) =>
    user.findOne({ where: { email: inputEmail } }).then((response) => response);

  user.checkCredential = (inputEmail, inputPassword) =>
    user
      .findOne({
        where: { email: inputEmail, password: inputPassword },
      })
      .then((response) => response);
  return user;
};
