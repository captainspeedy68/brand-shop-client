import React from 'react';
import { StarIcon } from 'daisyui';
import { Link, NavLink } from 'react-router-dom';
const ProductCard = ({ product }) => {
    const { image, name, brandName, _id: id, type, price, shortDescription, rating } = product
    // console.log(id);
    return (
        <div>
            <div className="hero my-5 shadow-lg shadow-red-100 text-left">
                <div className="hero-content p-0 pl-5 flex-col  lg:flex-row-reverse">
                    <img src={image} className="min-w-72 w-fit p-0 h-56" />
                    <div>
                        <h1 className="text-2xl font-bold text-red-600">{name}</h1>
                        <h1 className="text-xl font-bold">Brand: {brandName}</h1>
                        
                        <h1 className="text-xl font-bold">Rating: {rating}
                        
                        </h1>
                        <div className='flex'>

                            <p className="py-6 mr-2 font-semibold">{shortDescription}</p>

                            <div>

                            <NavLink to={`/brands/products/${id}`}><button className="btn mx-3 rounded-none bg-red-500 text-white">Details</button></NavLink>
                            <Link to={`/brands/products/update/${id}`}><button className="btn mx-3 rounded-none bg-red-500 text-white">Update</button></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;