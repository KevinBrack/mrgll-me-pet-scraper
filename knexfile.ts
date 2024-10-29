import dotenv from "dotenv";
import type { Knex } from "knex";

dotenv.config();

interface KnexConfig {
    [key: string]: Knex.Config;
}

const config: KnexConfig = {
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
            port: Number(process.env.DB_PORT) || 5432,
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

export default config;
