import React from 'react';
import { useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Update = () => {
    const product = useLoaderData();
    // console.log(id);
    // console.log(product)
    const { image, name, _id: id, brandName, type, price, rating, shortDescription, features } = product;
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const brandName = form.brand.value;
        const type = form.type.value;
        const rating = form.rating.value;
        const price = form.price.value;
        const image = form.photo.value;
        const shortDescription = form.description.value;
        const updatedProduct = {image, name, brandName, type, price, shortDescription, rating};
        console.log(updatedProduct)
        fetch(`http://localhost:3000/update/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.modifiedCount)
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'Modified Successfully',
                    text: 'Do you want to continue',
                    icon: 'success',
                    confirmButtonText: 'okay'
                  })
            }
        })
    }
    return (
        <div className="hero w-full">

            <div className=" w-full lg:flex-row-reverse">
                <h2 className='text-lg font-semibold'>Update Product</h2>
                <div className="card shrink-0 w-full max-w-full rounded-none bg-base-100">
                    <form onSubmit={handleUpdate} className="card-body p-0">
                        <div className="form-control w-full justify-center">
                            <label className="input  input-bordered flex items-center gap-2">
                                <span className="label-text text-gray-400">Name</span>
                                <input type="text" defaultValue={name} name='name' className="grow" placeholder="name" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input input-bordered flex items-center gap-2">
                                <span className="label-text text-gray-400">Brand Name</span>
                                <input type="name"
                                defaultValue={brandName}
                                    name='brand'
                                    placeholder="brand" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input  input-bordered flex items-center gap-2">
                                <span className="label-text text-gray-400">Type</span>
                                <input type="name"
                                defaultValue={type}
                                    name='type'
                                    placeholder="type" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input  input-bordered flex items-center gap-2">
                                <span className="label-text text-gray-400">Price</span>
                                <input type="number"
                                    name='price'
                                    defaultValue={price}
                                    placeholder="price" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input  input-bordered flex items-center gap-2">
                                <span className="label-text  text-gray-400">Rating</span>
                                <input type="number"
                                    name='rating'
                                    defaultValue={rating}
                                    placeholder="rating" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input input-bordered flex items-center gap-2">
                                <span className="label-text text-gray-400">Photo URL</span>
                                <input type="photo"
                                    defaultValue={image}
                                    name='photo' placeholder="photo url" className="grow" required />
                            </label>

                        </div>
                        <div className="form-control">
                            <label className='lebel'>
                        <span className="label-text">Description</span>
                            <textarea name='description' 
                            defaultValue={shortDescription} placeholder='descriiption' className="w-full textarea textarea-bordered border rounded-lg flex items-center gap-2" ></textarea>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-error text-white">Update</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Update;