import './Services.css'
import { Icons } from '../components/Icons'
import type { ReactNode } from 'react';
import { getWhatsAppUrl } from '../utils/contactUtils'

const services = [
    {
        id: 1,
        icon: "installation",
        title: "New Installation",
        description: "Complete elevator installation services from design to implementation. We handle manufacturing, installation, and commissioning with precision."
    },
    {
        id: 2,
        icon: "modernization",
        title: "Modernization",
        description: "Upgrade your existing elevators with the latest technology, improved safety features, and enhanced energy efficiency."
    },
    {
        id: 3,
        icon: "maintenance",
        title: "Maintenance",
        description: "Comprehensive maintenance programs to ensure optimal performance, safety, and longevity of your elevator systems."
    },
    {
        id: 4,
        icon: "emergency",
        title: "Emergency Repair",
        description: "24/7 emergency repair services with rapid response times. Our technicians are always ready to resolve critical issues."
    },
    {
        id: 5,
        icon: "amc",
        title: "AMC (Annual Maintenance Contract)",
        description: "Hassle-free elevator management with scheduled inspections, preventive maintenance, and priority support."
    },
    {
        id: 6,
        icon: "manufacturing",
        title: "Manufacturing",
        description: "In-house manufacturing of elevator cabins, doors, control panels, machines, and all essential components."
    }
];

// Map icon keys to actual SVG icons
const iconMap: Record<string, ReactNode> = {
    installation: Icons.installation,
    modernization: Icons.modernization,
    maintenance: Icons.maintenance,
    emergency: Icons.emergency,
    amc: Icons.amc,
    manufacturing: Icons.manufacturing
};

const Services = () => {
    return (
        <section id="services" className="services-section">
            <div className="services-container">
                <div className="services-header">
                    <span className="section-badge">Complete Elevator Solutions</span>
                    <h2>Our Services</h2>
                </div>

                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon">
                                {iconMap[service.icon] || Icons.maintenance}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="service-cta">
                                <a
                                    href={getWhatsAppUrl(`Hi ISE Elevator Team!\n\nI'm interested in your ${service.title} service.\n\nPlease provide more details.\n\nThank you!`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="service-btn-whatsapp"
                                    title="WhatsApp Us"
                                >
                                    {Icons.whatsapp}
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
