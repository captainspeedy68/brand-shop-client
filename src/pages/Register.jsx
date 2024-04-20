import { updateCurrentUser, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const Register = () => {
    const { createUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const [errorMessage, setErrorMessage] = useState(null);
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setErrorMessage("");
        const hasUppercase = uppercaseRegex.test(password);
        const hasSpecialChar = specialCharRegex.test(password);
        if (password.length < 6) {
            setErrorMessage("Error: Password cannot be less than 6 characters");
            return;
        }
        else if (!hasUppercase) {
            setErrorMessage("Error: Password should have at least one uppercase letter");
            return;
        }
        else if (!hasSpecialChar) {
            setErrorMessage("Error: Password should have at least one special character");
            return;
        }
        const name = form.name.value;
        const photo = form.photo.value;
        console.log(email, password, name);
        createUser(email, password)
            .then(res => {
                console.log(res.user);
                const newUser = res.user;

                updateProfile(newUser, { displayName: name, photoURL: photo })
                    .then(() => fetch("http://localhost:3000/users", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(newUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            Swal.fire({
                                title: 'Registered Successfully',
                                text: 'Do you want to continue',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            });
                            e.target.reset();
                            navigate(location?.state ? location.state : "/");
                        })
                    )
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="password" name='name' placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" name='photo' placeholder="photo url" className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            {
                                errorMessage &&
                                <p className='text-black'>{errorMessage}</p>
                            }
                            <div><p>Already have an account? <NavLink to={"/login"}>Login</NavLink></p></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;