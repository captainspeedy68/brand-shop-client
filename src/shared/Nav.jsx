import React, { useState } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from '../cards/Loading';
import { AuthContext } from '../providers/AuthProvider';
import 'react-toastify/dist/ReactToastify.css'


const Nav = () => {
    const { logout, user } = useContext(AuthContext);
    const notify = () => toast("User Logged Out!");
    const handleLogOut = () => {
        logout()
            .then(() => {
                notify();
            })
            .catch(error => {
                console.log(error);
            })
    }
    // const [isLoading, setIsLoading] = useState(false);

    // const handleLoad = () => {
    //     setIsLoading(false);
    // }
    const links = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/mycart"}>My Cart</NavLink></li>
        <li><NavLink to={"/addproduct"}>Add Product</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            links
                        }
                    </ul>
                </div>
                <a className="px-4 py-2 font-bold border-none text-xl text-[#FF5733] flex justify-around items-center md:bg-white rounded-full">
                    <img className='h-10 w-10 mr-2 max-md:hidden' src='/brand.png'></img>
                    <span className='uppercase'>Læraðr 2.0</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    !user &&
                    <div>
                        <NavLink to={"/login"}><button className="border btn w-14 min-h-3 h-8 rounded-md p-2">Login</button></NavLink>
                        <NavLink to={"/register"}><button className='border btn w-16 px-5 min-h-3 h-8 rounded-md mx-1'>Register</button></NavLink>
                    </div>

                }
                {
                    user && <div className='flex justify-between align-middle items-center'><div className="avatar">

                        {user?.photoURL &&
                            <div className="rounded-full ring ring-error  ring-offset-base-100 h-12 w-12 ring-offset-2 mx-2">
                                <img className='rounded-full' src={user?.photoURL} />
                            </div>}
                        {
                            !user?.photoURL && <Loading></Loading>
                        }


                    </div>
                        <div className='text-center flex py-2 mr-4 h-full'>{user?.displayName}</div>
                        <button className="border btn p-1 w-14 min-h-3 h-8 rounded-md" onClick={handleLogOut}>Logout</button></div>
                }
            </div>
        </div>
    );
};

export default Nav;