import React, { useState } from 'react';
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import { Product } from '../types/product.types';
import ProductList from '../components/product/ProductList';
import SearchSection from '../components/dashboard/SearchSection';
import { useProducts } from '../hooks/product/useProducts';
import FormOverlay from '../components/header/FormOverlay';
import { FiSearch } from 'react-icons/fi';
import '../App.css';
import InputField from '../components/common/InputField';
import FaceLogin from '../components/FaceLogin';  // Import FaceLogin component

const Dashboard: React.FC = () => {
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const { products, loading, error, updateProduct, deleteProduct } = useProducts();
  const [selectedView, setSelectedView] = useState<string>('Home');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [faceImageData, setFaceImageData] = useState<string | null>(null);
  const [userId] = useState<string | null>(localStorage.getItem('userId')); // Lấy userId từ localStorage hoặc state quản lý

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setIsFormVisible(true);
  };

  const handleDeleteClick = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.star]) {
      acc[product.star] = [];
    }
    acc[product.star].push(product);
    return acc;
  }, {} as Record<number, Product[]>);

  // Handler function for face capture
  const handleFaceCapture = (imageData: string) => {
    setFaceImageData(imageData);  // Save captured face image data
  };

  return (
    <div className="flex flex-col h-screen ml-20 mr-20">
      <Header />
      <div className="flex flex-1 mt-3">
        <Sidebar setSelectedView={handleViewChange} />
        <main className="flex-1 relative w-[80%] h-full md:w-[50%]">
          {selectedView === 'Home' && (
            <>
              <SearchSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              {loading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="overflow-auto scrollbar-hidden lg:h-[40%] -mt-8 h-full">
                  {searchTerm ? (
                    <div>
                      <h2 className="text-lg font-poppins mb-2 font-semibold text-primary">Search results:</h2>
                      <div className="flex overflow-x-auto space-x-5 mb-2 hidden-scrollbar">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <div key={product.id} className="border-none p-6 bg-component rounded-3xl shadow w-[170px] h-[200px] flex-shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-[125px] object-cover rounded-lg" />
                              <h3 className="mt-3 font-poppins text-primary bg-transparent truncate w-full text-base">{product.name}</h3>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No products match.</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    Array.from({ length: 5 }, (_, index) => 5 - index).map((star) => (
                      <div key={star}>
                        {groupedProducts[star] && groupedProducts[star].length > 0 && (
                          <div className='h-full'>
                            <h2 className="text-lg font-poppins mb-2 font-semibold text-primary">{`Star rating: ${star}`}</h2>
                            <div className="flex overflow-x-auto space-x-5 mb-2 hidden-scrollbar">
                              {groupedProducts[star].map((product) => (
                                <div key={product.id} className="border-none p-6 bg-component rounded-3xl shadow w-[170px] h-[200px] flex-shrink-0">
                                  <img src={product.image} alt={product.name} className="w-full h-[125px] object-cover rounded-lg" />
                                  <h3 className="mt-3 font-poppins text-primary bg-transparent truncate w-full text-base">{product.name}</h3>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}

          {selectedView === 'Product' && (
            <div className='h-full'>
              <InputField
                type="text"
                placeholder="Search"
                id="search"
                icon={<FiSearch />}
                classNamePrefix="w-[30%] ml-10 bg-transparent mb-5"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ProductList
                products={filteredProducts}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            </div>
          )}
          {isFormVisible && productToEdit && (
            <FormOverlay
              onClose={() => setIsFormVisible(false)}
              onFormSubmit={(updatedProduct) => {
                updateProduct(updatedProduct);
                setProductToEdit(undefined);
                setIsFormVisible(false);
              }}
              productToEdit={productToEdit}
            />
          )}

          {selectedView === 'Face setting' && (
            <div className="mt-5 ml-28">              
              <FaceLogin onFaceCapture={handleFaceCapture} userId={userId || "bcad"} />
              {faceImageData && (
                <div className="mt-4">
                  <img
                    src={faceImageData}
                    alt="Captured face"
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
