import React, {memo, useCallback} from 'react'; 
import { Product } from '../../types/product.types';
import Button from '../common/Button';
import '../../App.css'

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = memo(({ products, onEdit, onDelete }) => {
  // const renderStars = (starCount: number) => {
  //   return Array.from({ length: starCount }, (_, index) => (
  //     <span key={index} className="text-yellow-500">⭐</span>
  //   ));
  // };
  const renderStars = useCallback((starCount: number) => {
    return Array.from({ length: starCount }, (_, index) => (
      <span key={index} className="text-yellow-500">⭐</span>
    ));
  }, []);
  return (
    <div className="overflow-auto scrollbar-hiddens font-poppins h-full">
      <table className="w-full border border-secondary overflow-scroll h-full">
        <thead>
          <tr className="text-primary uppercase text-base">
            <th className="py-3 px-6 text-left font-medium">Image</th>
            <th className="py-3 px-6 text-left font-medium">Name</th>
            <th className="py-3 px-6 text-left font-medium">Branch</th>
            <th className="py-3 px-6 text-left font-medium">Price</th>
            <th className="py-3 px-6 text-left font-medium">Amount</th>
            <th className="py-3 px-6 text-center font-medium">Star</th>
            <th className="py-3 px-6 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-primary text-sm font-light h-full">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="border-none">
                <td className="py-3 px-6 text-left">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="py-3 px-6 text-left max-h-[4.5rem] overflow-hidden">
  <span className="truncate-lines">{product.name}</span>
</td>
                <td className="py-3 px-6 text-left">{product.branch}</td>
                <td className="py-3 px-6 text-left font-medium max-w-[7rem]">
                <span className="truncate-line ">${product.price}</span>

                </td>
                <td className="py-3 px-6 text-center font-medium max-w-[7rem]">
                <span className="truncate-line ">{product.amount}</span>

                </td>
                <td className="py-3 px-6 text-center font-medium">
                  {renderStars(product.star)}
                </td>
                <td className="py-3 px-6 text-left flex space-x-2">
                  <Button children='Edit' onClick={() => onEdit(product)} className='bg-secondary py-1 px-2 rounded' />
                  <Button 
                    children='Delete' 
                    onClick={() => {
                      if (product.id) {
                        onDelete(product.id);
                      } else {
                        console.error("Product ID is undefined");
                      }
                    }} 
                    className='bg-red-500 text-white py-1 px-2 rounded' 
                  />
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan={7} className="py-3 px-6 text-center bg-transparent">Loading products...</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
});

export default ProductList;
