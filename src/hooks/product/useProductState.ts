import { useEffect, useState } from 'react';
import { Product } from '../../types/product.types';
import { validateProduct } from '../../helpers/validate';

const useProductState = (productToEdit: Product | null) => {
    const [formData, setFormData] = useState<Product>({
        image: '',
        name: '',
        amount: 0,
        price: 0,
        branch: 'Computer',
        star: 5
    });

    const [branch, setBranch] = useState('Computer');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [star, setStar] = useState(1);
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (productToEdit) {
            setFormData(productToEdit);
            setBranch(productToEdit.branch);
            setAmount(String(productToEdit.amount));
            setPrice(String(productToEdit.price));
            setImageUrl(productToEdit.image);
            setStar(productToEdit.star);
        }
    }, [productToEdit]);

    const validate = () => {
        const newErrors = validateProduct(formData, imageUrl, amount, price);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleBranchChange = (value: string) => {
        setBranch(value);
        setFormData(prev => ({ ...prev, branch: value }));
        setErrors(prev => ({ ...prev, branch: '' }));
    };

    const handleAmountChange = (value: string) => {
        const numericValue = Number(value);
        if (numericValue >= 1) {
            setAmount(value);
            setFormData(prev => ({ ...prev, amount: numericValue }));
            setErrors(prev => ({ ...prev, amount: '' }));
        } else {
            setAmount('');
        }
    };

    const handlePriceChange = (value: string) => {
        setPrice(value);
        setFormData(prev => ({ ...prev, price: Number(value) }));
        setErrors(prev => ({ ...prev, price: '' }));
    };

    const handleUrlChange = (value: string) => {
        setImageUrl(value);
        setFormData(prev => ({ ...prev, image: value }));
        setErrors(prev => ({ ...prev, image: '' }));
    };

    const handleStarChange = (value: number) => {
        setStar(value);
        setFormData(prev => ({ ...prev, star: value }));
    };

    const resetForm = () => {
        setFormData({ image: '', name: '', amount: 0, price: 0, branch: 'Computer', star: 1 });
        setBranch('Computer');
        setAmount('');
        setPrice('');
        setImageUrl('');
        setStar(5);
        setErrors({});
    };

    return {
        formData,
        branch,
        amount,
        price,
        imageUrl,
        star,
        errors,
        validate,
        handleInputChange,
        handleBranchChange,
        handleAmountChange,
        handlePriceChange,
        handleUrlChange,
        handleStarChange,
        resetForm
    };
};

export default useProductState;
