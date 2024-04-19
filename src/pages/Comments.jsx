import React from 'react';
import { useContext } from 'react';
import { ProductContext } from './DetailsRoot';

const Comments = () => {
    const {type} = useContext(ProductContext);
    return (
        <div>
            
            {
                type && <p>{type}</p>
            }
        </div>
    );
};

export default Comments;