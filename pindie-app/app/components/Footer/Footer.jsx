import Styles from './Footer.module.css';
import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={Styles['footer']}>
            <Link href="/" className={Styles['footer__logo']}>
        <span className={Styles['footer__logo-name']}>pindie</span
        ><span className="footer__logo-copy">, XXI век</span>
            </Link>
            <ul className={Styles['social-list']}>
                <li className="social-list__item">
                    <a href="" className={`button ${Styles['social-list__link']}`}>YT</a>
                </li>
                <li className="social-list__item">
                    <a href="" className={`button ${Styles['social-list__link']}`}>ВК</a>
                </li>
                <li className="social-list__item">
                    <a href="" className={`button ${Styles['social-list__link']}`}>TG</a>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;