require("dotenv").config();

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./db/mrgll-me.sqlite3",
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./db/migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL || {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            database: "mrgll-me",
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: "./db/migrations",
        },
        seeds: {
            directory: "./db/seeds",
        },
    },
};
