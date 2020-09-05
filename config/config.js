module.exports = {
  development: {
    username: "postgres",
    password: null,
    database: "express_database_development",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false,
  },
  test: {
    username: "postgres",
    password: null,
    database: "express_database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false,
  },
  production: {
    username: process.env.DATABASE_URL && process.env.DATABASE_URL.split(":")[1].split("/")[2],
    password: process.env.DATABASE_URL && process.env.DATABASE_URL.split(":")[2].split("@")[0],
    database: process.env.DATABASE_URL && process.env.DATABASE_URL.split(":")[3].split("/")[1],
    host: process.env.DATABASE_URL && process.env.DATABASE_URL.split(":")[2].split("@")[1],
    dialect: "postgres",
    operatorsAliases: false,
  },
};
