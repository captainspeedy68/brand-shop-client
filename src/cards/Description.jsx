import React from 'react';
import { useContext } from 'react';
import { ProductContext } from '../pages/DetailsRoot';

const Description = () => {
    const {shortDescription} = useContext(ProductContext)
    return (
        <div>
            
            {
                shortDescription
            }
        </div>
    );
};

export default Description;