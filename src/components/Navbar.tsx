import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import AccessibilityTools from './AccessibilityTools'
import { useQuoteModal } from '../App'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { openQuoteModal } = useQuoteModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Lock body scroll when menu is open
        document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
    };

    const handleQuoteClick = () => {
        closeMenu();
        openQuoteModal();
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="nav-logo-link" onClick={closeMenu}>
                <img src="/logo.png" alt="ISE Elevator Logo" className="nav-logo" />
            </Link>

            {/* Hamburger Menu Button */}
            <button
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            {/* Navigation Links */}
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/about" onClick={closeMenu}>About</Link>
                <Link to="/products" onClick={closeMenu}>Products</Link>
                <Link to="/services" onClick={closeMenu}>Services</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>

                <div className="nav-extras">
                    <AccessibilityTools />
                    <button className="nav-quote-btn" onClick={handleQuoteClick}>Get Quote</button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
        </nav>
    )
}

export default Navbar
