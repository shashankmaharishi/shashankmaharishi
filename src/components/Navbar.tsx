import { useState } from 'react';
import { navLinks } from '../constants';
import { motion } from "framer-motion"

const Navbar = () => {

    return (
        <nav className="navbar navbar-dark navbar-expand-lg navbar-custom fixed-top">
            <div className="container">
                <h1>PORTFOLIO</h1>
                <button
                    className="navbar-toggler .navbar-toggler-custom"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav">
                        {navLinks.map(
                            (menu, i) =>
                                menu.isVisible && (
                                    <motion.li
                                        key={i}
                                        className="nav-item nav-item-custom"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <a href={`#${menu.id}`}>{menu.name}</a>
                                    </motion.li>
                                )
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
