import { Link } from 'react-router-dom'
import './Footer.css'
import { Icons } from './Icons'
import { getWhatsAppUrl, FORMATTED_PHONE } from '../utils/contactUtils'
import { useQuoteModal } from '../App'

const Footer = () => {
    const { openQuoteModal } = useQuoteModal();

    const quickLinks = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Products", path: "/products" },
        { label: "Services", path: "/services" },
        { label: "Contact", path: "/contact" }
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Company Info */}
                    <div className="footer-section footer-brand">
                        <Link to="/" className="footer-logo-link">
                            <img src="/logo.png" alt="ISE Elevator" className="footer-logo" />
                        </Link>
                        <p className="footer-tagline">Trusted Edge Technology on Every Level</p>
                        <p className="footer-desc">
                            ISE Elevator is a trusted manufacturer and solution provider delivering complete
                            elevator solutions – from new installations to modernization and maintenance.
                            Experience unmatched quality, safety, and reliability.
                        </p>
                        <div className="footer-social">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><circle cx="17.5" cy="6.5" r="1.5" /></svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1a1a1a" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                            <li>
                                <button className="footer-quote-btn" onClick={openQuoteModal}>Get Quote</button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <div className="footer-contact">
                            <div className="footer-contact-item">
                                <span className="footer-contact-icon">{Icons.location}</span>
                                <span>Flat No 103 Sr No 3/21 Parthavi Emarald, Bhairvnath Nagar, Narhe, Pune 411041</span>
                            </div>
                            <div className="footer-contact-item">
                                <span className="footer-contact-icon">{Icons.phone}</span>
                                <span>{FORMATTED_PHONE}</span>
                            </div>
                            <div className="footer-contact-item">
                                <span className="footer-contact-icon">{Icons.whatsapp}</span>
                                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
                            </div>
                            <div className="footer-contact-item">
                                <span className="footer-contact-icon">{Icons.email}</span>
                                <a href="mailto:iseelevator@gmail.com">iseelevator@gmail.com</a>
                            </div>
                            <div className="footer-contact-item">
                                <span className="footer-contact-icon">{Icons.clock}</span>
                                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>© 2026 ISE Elevator. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
