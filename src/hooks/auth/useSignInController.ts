import { useState } from 'react';
import { RootState } from '../../types/auth.types';
import { signInUser } from '../../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../states/userSlice';
import { validateAuth } from '../../helpers/validate';

export const useSignInController = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signInStart());
        const errors = validateAuth(formData, 'signIn');
        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            dispatch(signInFailure('Invalid input'));
            return;
        }

        try {
            if (!formData.email || !formData.password) {
                toast.error("Please fill in both email and password.");
                return;
            }

            const data = await signInUser(formData.email);
            if (data.length === 0 || data[0].password !== formData.password) {
                dispatch(signInFailure('Invalid credentials'));
                toast.error("Invalid email or password.");
                return;
            }

            dispatch(signInSuccess(data[0]));
            toast.success("Login successful!");
            navigate('/home');
        } catch (error) {
            dispatch(signInFailure((error as Error).message));
            toast.error("An error occurred. Please try again.");
        } finally {
            dispatch(signInFailure(''));
        }
    };

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
    };
};
