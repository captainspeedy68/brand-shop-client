import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../cards/Loading';
import { AuthContext } from '../providers/AuthProvider';
import ProductUser from './ProductUser';

const MyCart = () => {
    const {user} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const allProducts = useLoaderData();
    const [userProductIds, setUserProductIds] = useState([]);
    const [products, setProducts] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3000/user/${user?.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUserInfo(data);
            setUserProductIds(userInfo?.products)
            const userProductIds = data?.products || []; // Handle potential undefined products
            const filteredProducts = allProducts.filter(product => userProductIds.includes(product._id));
            // console.log(filteredProducts);
            setProducts(filteredProducts);
        })
    }

    , [])
    return (
        <div>
            {
                products ? products.map(product => <ProductUser key={product?._id} product = {product}></ProductUser>) : <Loading></Loading>
            }
        </div>
    );
};

export default MyCart;