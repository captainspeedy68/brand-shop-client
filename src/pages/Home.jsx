import React, { useEffect, useState } from 'react';
import BrandsCard from '../cards/BrandsCard';

const Home = () => {
    const [brands, setBrands] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/brands/")
            .then(res => res.json())
            .then(data => setBrands(data))
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    return (
        <div>
            <div className='lg:grid grid-cols-3 gap-x-10 gap-y-5 w-fit my-5 mx-auto'>
                {brands && brands.map(brand => (
                    <BrandsCard key={brand._id} brand={brand} />
                ))}
            </div>
        </div>
    );
};

export default Home;
