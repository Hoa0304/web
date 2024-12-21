import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpUser } from "../../services/authService";
import { User } from "../../types/auth.types";
import { validateAuth, ValidationType } from "../../helpers/validate";

export const useSignUpController = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<User>({ userName: '', email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateAuth(formData, 'signUp' as ValidationType, confirmPassword);
        if (validationErrors.length > 0) {
            toast.error(validationErrors.join(', '));
            return;
        }

        setLoading(true);
        try {
            const data = await signUpUser(formData);
            if (data.success === false) {
                toast.error("Sign up failed!");
                return;
            }
            navigate('/');
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        confirmPassword,
        loading,
        handleInputChange,
        setConfirmPassword,
        handleSubmit,
    };
};
