import './About.css'
import { Icons } from '../components/Icons'
import { getWhatsAppUrl } from '../utils/contactUtils'

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <div className="about-header">
                    <span className="section-badge">Who We Are</span>
                    <h2>About ISE Elevator</h2>
                    <p className="about-intro">
                        ISE Elevator is a trusted manufacturer and full-service elevator solution provider.
                        We handle everything from manufacturing to new installations, modernization, and
                        long-term maintenance – delivering unmatched quality, safety, and reliability on every level.
                    </p>
                </div>

                <div className="about-cards">
                    <div className="about-card">
                        <div className="about-card-icon">
                            {Icons.mission}
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To provide cutting-edge elevator technology with a focus on safety, reliability,
                            and innovation. We are committed to delivering complete vertical transportation
                            solutions that enhance building efficiency and passenger comfort.
                        </p>
                    </div>
                    <div className="about-card">
                        <div className="about-card-icon">
                            {Icons.vision}
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            To be the most trusted name in the elevator industry across India, recognized
                            for our manufacturing excellence, exceptional service, and commitment to
                            technological advancement in vertical transportation.
                        </p>
                    </div>
                </div>

                <div className="about-leadership">
                    <div className="leadership-content">
                        <h3>Our Leadership</h3>
                        <p>
                            Led by <strong>Suraj Mulik</strong>, ISE Elevator has grown into a reliable name in the
                            Maharashtra elevator industry. With deep technical expertise and a customer-first
                            philosophy, our leadership ensures that every project meets the highest standards of
                            safety and engineering excellence.
                        </p>
                        <div className="leadership-cta">
                            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                                <span className="btn-icon">{Icons.whatsapp}</span>
                                <span>Chat with Us on WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
