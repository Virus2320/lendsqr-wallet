import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
let baseURL = process.env.LENDSQLR_API_URL;
let myAPIKey = process.env.LENDSQL_ADJUTOR_API_KEY;

const adjutorApi = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${myAPIKey}`,
  },
});

export const checkKarmaBlacklist = async (email: string): Promise<boolean> => {
  try {
    const response = await adjutorApi.get(`${email}`, {
    });

    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.error('Error checking Karma blacklist:', error);
    throw new Error('Error checking Karma blacklist '+ error);
  }
};
