import React from 'react';
import {NavLink} from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo.jsx";
// import Login from "../pages/Login.jsx";

const PageNav = () => {
    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                <il>
                    <NavLink to='/pricing'>Pricing</NavLink>
                </il>
                <il>
                    <NavLink to='/product'>Product</NavLink>
                </il>
                <il>
                    <NavLink to='/login' className={styles.ctaLink}>Login</NavLink>
                </il>
            </ul>
        </nav>
    );
};

export default PageNav;