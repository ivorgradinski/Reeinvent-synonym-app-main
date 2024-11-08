import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>© {currentYear} Synonym Tool. All rights reserved.</p>
            <p className={styles.footerText}>This is staging enviroment.</p>
        </footer>
    );
};

export default Footer;
