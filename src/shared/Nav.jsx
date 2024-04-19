import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Nav = () => {
    const { logout, user } = useContext(AuthContext);
    const handleLogOut = () => {
        logout()
            .then()
            .catch(error => {
                console.log(error);
            })
    }
    // console.log(user?.email);
    // console.log(user?.displayName);
    // console.log(user?.photoURL);
    
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
                <a className="btn btn-ghost text-xl">Automotive</a>
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
                        <NavLink to={"/login"}><button className="btn">Login</button></NavLink>
                        <NavLink to={"/register"}><button className='btn mx-1'>Register</button></NavLink>
                    </div>
                
                }
                {
                    user && <div className='flex justify-between align-middle items-center'><div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-2">
                      <img src={user?.photoURL} />
                    </div>
                    <div className='text-center flex py-2 mr-4 h-full'>{user?.displayName}</div>
                  </div>
                    <button className="btn" onClick={handleLogOut}>Logout</button></div>
                }
            </div>
        </div>
    );
};

export default Nav;