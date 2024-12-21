export interface Product {
    id?: string;
    image: string;
    name: string;
    amount: number;
    price: number;
    branch: string;
    star: number;
}

export interface FormProps {
    productToEdit?: Product | null;
    onFormSubmit: (product: Product) => void;
}
