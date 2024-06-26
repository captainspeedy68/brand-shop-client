import { async } from '@firebase/util';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Loading from '../cards/Loading';
const AddProduct = () => {
    const notify = () => {
        toast("Product Added Successfully");
    }
    const { loading, setLoading } = useState(false);
    const handleAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const brand = form.brand.value;
        const type = form.type.value;
        const rating = form.rating.value;
        const price = form.price.value;
        const photo = form.photo.value;
        const shortDescription = form.description.value;
        const newProduct = { image: photo, name, brandName: brand, type, price, shortDescription, rating };
        fetch("http://localhost:3000/addproduct", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                console.log(data);
                if (data.acknowledged) {
                    notify();
                }
            })
    }
    return (

        <div className="hero w-full">

            <div className=" w-full lg:flex-row-reverse">
                <h2 className='text-lg font-semibold'>Add Product</h2>
                <div className="card shrink-0 w-full max-w-full rounded-none bg-base-100">
                    <form onSubmit={handleAdd} className="card-body p-0">
                        <div className="form-control w-full justify-center">
                            <label className="input  input-bordered flex items-center gap-2">
                                {/* <span className="label-text">Name</span> */}
                                <input type="text" name='name' className="grow" placeholder="name" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input  input-bordered flex items-center gap-2">
                                {/* <span className="label-text">Brand Name</span> */}
                                <input type="name"
                                    name='brand'
                                    placeholder="brand" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input  input-bordered flex items-center gap-2">
                                {/* <span className="label-text">Type</span> */}
                                <input type="name"
                                    name='type'
                                    placeholder="type" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input  input-bordered flex items-center gap-2">
                                {/* <span className="label-text">Price</span> */}
                                <input type="number"
                                    name='price'
                                    placeholder="price" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input  input-bordered flex items-center gap-2">
                                {/* <span className="label-text">Rating</span> */}
                                <input type="number"
                                    name='rating'
                                    placeholder="rating" className="grow" required />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="input input-bordered flex items-center gap-2">
                                {/* <span className="label-text">Photo URL</span> */}
                                <input type="photo"
                                    name='photo' placeholder="photo url" className="grow" required />
                            </label>

                        </div>
                        <div className="form-control">
                            <textarea name='description' placeholder='descriiption' className="w-full textarea textarea-bordered border rounded-lg flex items-center gap-2" ></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-error text-white">Add</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
};

export default AddProduct;