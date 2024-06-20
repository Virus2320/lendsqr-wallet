import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
  },
});

export const connectToDatabase = async () => {
  try {
    await db.raw('SELECT  1');
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1); // Exit the process if unable to connect
  }
};


export default db;