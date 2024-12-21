import { User } from "../types/auth.types";
import { Product } from "../types/product.types";

export type ValidationType = 'signIn' | 'signUp';

export const validateAuth = (formData: User, type: ValidationType, confirmPassword?: string): string[] => {
    const errors: string[] = [];

    if (type === 'signUp' && !formData.userName) {
        errors.push('Username is required');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        errors.push('Email is invalid');
    }
    if (!formData.password || formData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (type === 'signUp' && formData.password !== confirmPassword) {
        errors.push("Passwords do not match");
    }

    return errors;
};

export const validateProduct = (formData: Product, imageUrl: string, amount: string, price: string) => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name) {
        newErrors.name = 'Name is required';
    }
    
    if (!imageUrl) {
        newErrors.image = 'Image URL is required';
    } else if (!/^https?:\/\//.test(imageUrl)) {
        newErrors.image = 'Invalid image URL';
    }

    if (amount === '' || Number(amount) < 1) {
        newErrors.amount = 'Amount must be greater than or equal to 1';
    }

    if (price === '' || Number(price) <= 0) {
        newErrors.price = 'Price must be greater than 0';
    }

    return newErrors;
};
