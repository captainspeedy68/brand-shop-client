import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom';
import BtmNav from '../shared/BtmNav';

const Details = ({product}) => {
    console.log(product)

    // const product = useLoaderData();
    const { image,  name, _id: id, brandName, type, price, rating, shortDescription, features } = product;
    return (
        <div className='flex mb-3 justify-center'>
            <img src={image} alt="" />
            
            {/* <img src={image} /> */}
        </div>
    );
};

export default Details;