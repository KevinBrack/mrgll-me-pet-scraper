import knex from 'knex';
import config from '../../knexfile';

// Determine environment
const environment = process.env.NODE_ENV || 'development';

// Initialize knex with the appropriate configuration
const db = knex(config[environment]);

export default db;
