import { Link } from 'react-router-dom'
import './Home.css'
import { Icons } from '../components/Icons'
import { useQuoteModal } from '../App'
import { useCallButton, getWhatsAppUrl } from '../utils/contactUtils'

const Home = () => {
    const { openQuoteModal } = useQuoteModal();
    const { showTooltip, handleCallClick, formattedPhone } = useCallButton();

    const features = [
        {
            icon: Icons.installation,
            title: "Complete Solutions",
            description: "From manufacturing to installation, modernization, and long-term maintenance."
        },
        {
            icon: Icons.manufacturing,
            title: "In-House Manufacturing",
            description: "Quality control at every step with our own production facility."
        },
        {
            icon: Icons.emergency,
            title: "24/7 Support",
            description: "Round-the-clock emergency repair services with rapid response times."
        }
    ];

    const productHighlights = [
        { name: "Passenger Lift", image: "/products/passenger.jpg" },
        { name: "Good Lift", image: "/products/goods.jpg" },
        { name: "Parking Lift", image: "/products/parking.jpg" },
        { name: "Hydraulic Lift", image: "/products/hydraulic.jpg" }
    ];

    const stats = [
        { number: "500+", label: "Installations" },
        { number: "15+", label: "Years Experience" },
        { number: "24/7", label: "Support" },
        { number: "100%", label: "Safety Record" }
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-text">
                    <span className="badge">Sales • Service • Manufacturer</span>
                    <h1>Trusted Edge Technology <span className="accent">on Every Level</span></h1>
                    <p>
                        ISE Elevator delivers complete elevator solutions – from new installations
                        to modernization and maintenance. Experience unmatched quality, safety, and reliability.
                    </p>
                    <div className="cta-group">
                        <div className="cta-btn-wrapper">
                            <button onClick={handleCallClick} className="btn-call">
                                <span className="btn-icon">{Icons.phone}</span>
                                <span>Call Us</span>
                            </button>
                            {showTooltip && (
                                <div className="cta-tooltip">
                                    <span className="tooltip-number">{formattedPhone}</span>
                                    <span className="tooltip-copied">Copied!</span>
                                </div>
                            )}
                        </div>
                        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                            <span className="btn-icon">{Icons.whatsapp}</span>
                            <span>WhatsApp</span>
                        </a>
                        <button onClick={openQuoteModal} className="btn-secondary">Request Quote</button>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <div className="features-header">
                        <span className="section-badge">Why Choose Us</span>
                        <h2>Complete Elevator Solutions</h2>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Preview Section */}
            <section className="products-preview-section">
                <div className="products-preview-container">
                    <div className="products-preview-header">
                        <span className="section-badge">Our Range</span>
                        <h2>Elevator Solutions for Every Need</h2>
                        <p>
                            From residential homes to commercial buildings, hospitals to industrial facilities –
                            we have the right elevator for your requirements.
                        </p>
                    </div>
                    <div className="products-preview-grid">
                        {productHighlights.map((product, index) => (
                            <div key={index} className="product-preview-card">
                                <div className="product-preview-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <h4>{product.name}</h4>
                            </div>
                        ))}
                    </div>
                    <Link to="/products" className="view-all-btn">View All Products</Link>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <span className="stat-number">{stat.number}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Preview Section */}
            <section className="services-preview-section">
                <div className="services-preview-container">
                    <div className="services-preview-content">
                        <span className="section-badge">Our Services</span>
                        <h2>From Installation to Maintenance</h2>
                        <p>
                            ISE Elevator is a full-service elevator solution provider. We handle everything
                            from new installations and modernization to regular maintenance and emergency repairs.
                        </p>
                        <ul className="services-list">
                            <li>New Elevator Installation</li>
                            <li>Elevator Modernization & Upgrades</li>
                            <li>Preventive Maintenance Programs</li>
                            <li>Annual Maintenance Contracts (AMC)</li>
                            <li>24/7 Emergency Repair Services</li>
                            <li>Safety Inspections & Compliance</li>
                        </ul>
                        <Link to="/services" className="btn-primary">Explore Services</Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2>Ready to Elevate Your Building?</h2>
                    <p>Contact us directly via Call or WhatsApp for immediate assistance and expert consultation.</p>
                    <div className="cta-buttons">
                        <div className="cta-btn-wrapper">
                            <button onClick={handleCallClick} className="btn-call">
                                <span className="btn-icon">{Icons.phone}</span>
                                <span>Call Now</span>
                            </button>
                            {showTooltip && (
                                <div className="cta-tooltip cta-tooltip-bottom">
                                    <span className="tooltip-number">{formattedPhone}</span>
                                    <span className="tooltip-copied">Copied!</span>
                                </div>
                            )}
                        </div>
                        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                            <span className="btn-icon">{Icons.whatsapp}</span>
                            <span>Message on WhatsApp</span>
                        </a>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <button onClick={openQuoteModal} className="btn-outline">Request a Detailed Quote</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
