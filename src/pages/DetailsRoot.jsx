import { data } from 'autoprefixer';
import React, { createContext } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import BtmNav from '../shared/BtmNav';
import Details from './Details';
import Swal from 'sweetalert2'
export const ProductContext = createContext(null);

const DetailsRoot = () => {
    const product = useLoaderData();
    const {user} = useContext(AuthContext);
    // console.log(user?.uid)
    // console.log(product)
    const [isDesabled, setDesabled] = useState(false);
    const userInfo = {email: user?.email};
    // const [uid, setUid]= useState(user?.uid);
    const { image, name, _id: id, brandName, type, price, rating, shortDescription, features } = product;
    const productInfo = {
        image, name, id, brandName, type, price, rating, shortDescription, features
    };
    const handleAddtoCart = () => {
        // console.log(typeof uid)

        fetch(`http://localhost:3000/addtocart/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.acknowledged){
                // setDesabled(true)
                Swal.fire({
                    title: 'Added Successfully',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
            else if (data.error){
                Swal.fire({
                    title: 'Already Exists',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            }
        })
        .catch(error => {
            console.log(error)
        })
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
                    <div className=' min-h-64 border-2'>
                        <div className='text-left text-lg p-4 font-medium'>
                            <span className='font-bold'>Name:</span> {name} <br></br>
                            <span className='font-bold'>Brand:</span> {brandName} <br></br>
                            <span className='font-bold'>Price</span> {price}$
                            <br />
                            <span className='font-bold'>Type:</span> {type}
                            <br />
                            <span className='font-bold'>Rating:</span> {rating}
                            <br />
                        </div>
                        <hr />
                        <button className='btn btn-success text-white w-full mt-64 mb-1 rounded-none' disabled = {isDesabled} onClick={handleAddtoCart}>Add to Cart</button>
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