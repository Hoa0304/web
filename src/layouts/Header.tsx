import React from 'react';
import Button from '../components/common/Button';
import Nav from '../components/header/Nav';
import FormOverlay from '../components/header/FormOverlay';
import { useProductForm } from '../hooks/product/useProductFormVisible';

const Header: React.FC = () => {
    const { isFormVisible, handleToggleForm, handleFormSubmit } = useProductForm();

    return (
        <header className="relative flex md:justify-between items-start h-35 p-4 text-primary mt-5">
            <h1 className="w-80 self-center text-6xl font-italianno bg-clip-text text-transparent bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] inline-block min-w-fit">
                VisualVibeAI
            </h1>
            <Nav />
            <Button
                className="bg-gradient-to-r from-[#CD46D9] to-[#27C5C9] px-4 py-2 font-normal font-inter rounded-custom transform -translate-y-3 whitespace-nowrap"
                onClick={handleToggleForm}
            >
                Create a Product
            </Button>

            {isFormVisible && (
                <FormOverlay onFormSubmit={handleFormSubmit} onClose={handleToggleForm} />
            )}
        </header>
    );
}

export default Header;
