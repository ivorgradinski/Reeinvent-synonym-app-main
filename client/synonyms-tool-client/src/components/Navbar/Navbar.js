import React from 'react';
import { Link } from 'react-router-dom';
import { ADD_SYNONYM, SEARCH_SYNONYM } from '../../constants/routes';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';

const Navbar = () => (
    <nav className={styles.navbar}>

        <ul className={styles.navList}>
            <img className={styles.logo} src={logo} alt="logo"></img>
            <li className={styles.navItem}>
                <Link to={ADD_SYNONYM} className={styles.navLink}>Add Synonyms</Link>
            </li>
            <li className={styles.navItem}>
                <Link to={SEARCH_SYNONYM} className={styles.navLink}>Search Synonyms</Link>
            </li>
        </ul>
    </nav>
);

export default Navbar;
