module.exports = {
  type: "sqlite",
  database: "./src/database/db.sqlite",
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
