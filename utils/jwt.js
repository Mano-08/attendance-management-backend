const jwt = require("jsonwebtoken");

const encode = (data) => {
  return jwt.sign(data, "Mamoor");
};

const decode = (token) => {
  return jwt.decode(token);
};

const verify = (token) => {
  return jwt.verify(token, "Mamoor");
};

module.exports = { encode, decode, verify };
