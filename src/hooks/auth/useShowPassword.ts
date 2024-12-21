import { useState, useCallback } from 'react';

export const useShowPassword = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    
    const toggleShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const toggleShowConfirmPassword = useCallback(() => {
        setShowConfirmPassword(prev => !prev);
    }, []);
    
    return { showPassword, toggleShowPassword, showConfirmPassword, toggleShowConfirmPassword };
};
