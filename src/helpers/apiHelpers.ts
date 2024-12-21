import axios from 'axios';

export const handleError = (error: unknown): Error => {
    if (axios.isAxiosError(error)) {
        return new Error(error.response?.data?.message || 'An error occurred');
    }
    return new Error('An unexpected error occurred');
};
