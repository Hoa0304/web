import React from 'react';
import { Product } from '../../types/product.types';
import { Form } from '../common/Form';

interface FormOverlayProps {
    onClose: () => void;
    onFormSubmit: (product: Product) => void;
    productToEdit?: Product;
}

const FormOverlay: React.FC<FormOverlayProps> = ({ onClose, onFormSubmit, productToEdit }) => {
    const handleOverlayClick = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
            <div className='bg-transparent p-4 rounded w-1/3' onClick={(e) => e.stopPropagation()}>
                <Form productToEdit={productToEdit} onFormSubmit={onFormSubmit} />
            </div>
        </div>
    );
}

export default FormOverlay;
