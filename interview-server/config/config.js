// THIS FILE IS FOR SEQUELIZE CLI. THIS CONFIG WILL BE USED FOR THE MIGRATIONS.
require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": 12345,
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgresql",
    "logging": false,
    "pool": {
      "min": 0,
      "max": 10,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "production": {
    "username": process.env.secAppEnvdbUser,
    "password": process.env.secAppEnvdbPw,
    "database": process.env.secAppEnvdbDB,
    "host": "127.0.0.1",
    "dialect": "postgresql",
    "logging": false,
    "pool": {
      "min": 0,
      "max": 10,
      "acquire": 30000,
      "idle": 10000
    }}
};
