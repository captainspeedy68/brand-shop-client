import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2'
const Login = () => {
    const { loginUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null);
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password)
        loginUser(email, password)
            .then(res => {
                console.log(res.user);
                fetch("http://localhost:3000/user/login", {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(res.user)
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire({
                            title: 'Successfully Logged In',
                            text: 'Do you want to continue',
                            icon: 'success',
                            confirmButtonText: 'Done'
                        });
                        e.target.reset();
                        navigate(location?.state ? location.state : "/");
                    })
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.message);
            })
    }
    const handleGoogle = () => {
        googleSignIn()
            .then(res => {
                console.log(res.user);
                fetch("http://localhost:3000/users", {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(res.user)
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire({
                            title: 'Successfully Logged In',
                            text: 'Do you want to continue',
                            icon: 'success',
                            confirmButtonText: 'Done'
                        });
                        // e.target.reset();
                        navigate(location?.state ? location.state : "/");
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="form-control mt-6">

                                <div onClick={handleGoogle} className="btn btn-primary">Google Sign In</div>
                            </div>
                            {
                                errorMessage &&
                                <p className='text-black'>{errorMessage}</p>
                            }
                            <div><p>Don't have an account? <NavLink to={"/register"}>Register</NavLink></p></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;