import axios from 'axios';
import { User } from '../types/auth.types';
import { handleError } from '../helpers/apiHelpers';

const api = import.meta.env.VITE_API_URL;

export const signUpUser = async (formData: User) => {
    try {
        const response = await axios.post(`${api}users`, formData);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

export const signInUser = async (email: string) => {
    try {
        const response = await axios.get(`${api}users?email=${email}`);
        return response.data;
    } catch (error) {
        throw handleError(error);
    }
};

