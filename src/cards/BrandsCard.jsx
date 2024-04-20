import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const BrandsCard = ({ brand }) => {
    const { image, brand: brandName } = brand;
    // console.log(brandName);
    // console.log(brand)
    const handleBrand = () => {
        console.log("clicked")
    }
    return (
        <NavLink to={`/brands/${brandName}`}>
            <div>
                <div className="lg:w-72 lg:h-72 rounded-none shadow-md border border-red-100">
                    <figure><img className='h-48 w-full bg-red-300' src={image} alt="car!" /></figure>
                    <hr />
                    <div className="card-body">
                        <h2 className="card-title justify-center text-red-500">{brandName}</h2>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default BrandsCard;