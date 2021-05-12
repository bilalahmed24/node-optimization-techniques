"use strict";

const BCrypt = require("bcrypt");

const bcryptHash = async (password) => {
  return await BCrypt.hash(password, 8);
};

exports.bcryptHash = bcryptHash;
