import React, { createContext } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import BtmNav from '../shared/BtmNav';
import Details from './Details';
export const ProductContext = createContext(null);

const DetailsRoot = () => {
    const product = useLoaderData();
    // console.log(product)
    const { image, name, _id: id, brandName, type, price, rating, shortDescription, features } = product;
    const productInfo = {
        image, name, id, brandName, type, price, rating, shortDescription, features
    }
    return (

        <ProductContext.Provider value={productInfo}>
            <div >
                {/* <img src={image} alt="" /> */}
                {/* <Details></Details> */}
                <div className='grid grid-cols-3'>

                    <div className='col-span-2'>
                        <Details key={id} product={product}></Details>
                        <BtmNav></BtmNav>
                        <Outlet></Outlet>
                    </div>
                    <div className=' min-h-screen'>
                        <div className='text-left text-lg  p-4 font-medium'>
                            <span className='font-bold'>Name:</span> {name} <br></br>
                            <span className='font-bold'>Brand:</span> {brandName} <br></br>
                            <span className='font-bold'>Price</span> {price}$
                            <br />
                            <span className='font-bold'>Type:</span> {type}
                            <br />
                            <span className='font-bold'>Rating:</span> {rating}
                            <br />
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <h2></h2>
                </div>

            </div>
        </ProductContext.Provider>

    );
};

export default DetailsRoot;