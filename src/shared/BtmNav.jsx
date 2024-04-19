import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const BtmNav = () => {
    return (
        <div>
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
                <li>
                    <NavLink to={"description"}>
                        <button >
                            <span className="btm-nav-label">Overview</span>
                        </button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"features"}>

                        <button >
                            <span className="btm-nav-label">Features</span>
                        </button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"Comments"}>
                        <button>
                            <span className="btm-nav-label">Comments</span>
                        </button>
                    </NavLink>
                </li>
            </ul>






            <div className=" menu menu-horizontal relative">




            </div>
        </div>
    );
};

export default BtmNav;