import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import ProductCard from '../cards/ProductCard';

const Products = () => {
    const name = useParams()
    const products = useLoaderData();
    // console.log(brand)
    
    return (
        <div className=' p-2'>
            {
                products.map(product => <ProductCard key={product._id} product = {product}></ProductCard>)
            }
        </div>
    );
};

export default Products;