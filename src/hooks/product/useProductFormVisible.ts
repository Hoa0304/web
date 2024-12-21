import { useState } from 'react';
import { Product } from '../../types/product.types';

export const useProductForm = () => {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    const handleToggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleFormSubmit = (product: Product) => {
        console.log('Product submitted:', product);
        setIsFormVisible(false);
    };

    return {
        isFormVisible,
        handleToggleForm,
        handleFormSubmit,
    };
};
