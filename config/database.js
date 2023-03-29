module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env(
        "DATABASE_HOST",
        "cms-db.cc69hvvdc5ld.us-east-2.rds.amazonaws.com"
      ),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "postgres"),
      user: env("DATABASE_USERNAME", "postgres"),
      password: env("DATABASE_PASSWORD", "postgres"),
      schema: env("DATABASE_SCHEMA", "public"), // Not required
      ssl: false,
    },
    debug: false,
  },
});
