import React from 'react';
import { useContext } from 'react';
import { ProductContext } from './DetailsRoot';

const Features = () => {
    const {features, type} = useContext(ProductContext);
    console.log(features)
    return (
        <div>
            {
                features ? features.map(feature => <p>{feature}</p>) : <p>{type}</p>
            }
        </div>
    );
};

export default Features;