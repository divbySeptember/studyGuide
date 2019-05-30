const knex = require("knex");
const knexconfig = require("../knexfile");

const dbEnv = process.env.DB_ENV || "development";

module.exports = knex(knexconfig[dbEnv]);