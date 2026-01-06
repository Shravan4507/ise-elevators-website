import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Products.css'
import { Icons } from '../components/Icons'
import { getWhatsAppUrl } from '../utils/contactUtils'
import { useQuoteModal } from '../App'

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    features: string[];
    applications: string[];
}

const products: Product[] = [
    {
        id: 1,
        name: "Manual Door Elevator",
        description: "Economical and reliable solution for residential and commercial buildings. Customizable based on shaft size, speed, and amenities.",
        image: "/products/manual-door.jpg",
        features: [
            "Manual door systems",
            "Customizable based on shaft size",
            "Variable speed options",
            "Reliable and economical"
        ],
        applications: ["Residential buildings", "Small commercial buildings", "Budget-friendly projects"]
    },
    {
        id: 2,
        name: "Automatic Door Elevator",
        description: "Advanced safety features with center-opening and telescopic door options. Designed for smooth, modern, and safe operation.",
        image: "/products/automatic-door.jpg",
        features: [
            "Center-opening doors",
            "Telescopic door options",
            "Advanced safety features",
            "Smooth & quiet operation"
        ],
        applications: ["Commercial buildings", "Office complexes", "Shopping centers", "Hotels"]
    },
    {
        id: 3,
        name: "Capsule / Panoramic Elevator",
        description: "Premium full-glass elevators perfect for hotels, shopping malls, offices, and multiplexes. High aesthetic value with smooth operation.",
        image: "/products/capsule.jpg",
        features: [
            "Full-glass design",
            "Multiple car models",
            "Premium interior options",
            "Smooth & comfortable travel"
        ],
        applications: ["Hotels", "Shopping malls", "Office buildings", "Multiplexes", "Exhibition centers"]
    },
    {
        id: 4,
        name: "MRL (Machine Room-Less) Elevator",
        description: "Space-saving, energy-efficient design with gearless machines. Latest global technology for smooth travel and reduced electricity consumption.",
        image: "/products/mrl.jpg",
        features: [
            "No machine room required",
            "Gearless traction machines",
            "Energy efficient (~30% savings)",
            "Latest global technology"
        ],
        applications: ["High-rise buildings", "Space-constrained projects", "Green buildings", "Modern offices"]
    },
    {
        id: 5,
        name: "Home Elevator",
        description: "Custom-built for private homes, bungalows, villas, and penthouses. Focus on comfort, space efficiency, and up to 30% energy savings.",
        image: "/products/home.jpg",
        features: [
            "Compact design",
            "Custom interior options",
            "Energy saving (~30%)",
            "Multiple control panel designs"
        ],
        applications: ["Private homes", "Bungalows", "Villas", "Penthouses", "Duplexes"]
    },
    {
        id: 6,
        name: "Hospital Elevator",
        description: "Designed for healthcare environments with priority on safety and smooth vertical transport. Suitable for stretchers and medical equipment.",
        image: "/products/hospital.jpg",
        features: [
            "Stretcher compatible",
            "Smooth & safe operation",
            "Priority control systems",
            "Antibacterial interiors"
        ],
        applications: ["Hospitals", "Clinics", "Medical centers", "Nursing homes", "Healthcare facilities"]
    },
    {
        id: 7,
        name: "Goods Elevator",
        description: "Heavy-duty industrial solution for transporting goods and materials. High load-bearing capacity with durable cabin structures.",
        image: "/products/goods.jpg",
        features: [
            "High load capacity",
            "Durable cabin structure",
            "Heavy-duty components",
            "Industrial-grade safety"
        ],
        applications: ["Factories", "Warehouses", "Industrial facilities", "Logistics centers", "Service areas"]
    },
    {
        id: 8,
        name: "Hydraulic Elevator",
        description: "Green and eco-friendly solution with low noise and energy-efficient operation. Perfect for low-rise buildings.",
        image: "/products/hydraulic.jpg",
        features: [
            "Low noise operation",
            "Energy efficient",
            "Eco-friendly hydraulic system",
            "Ideal for low-rise buildings"
        ],
        applications: ["Low-rise buildings", "Residential complexes", "Small commercial spaces", "Retrofit projects"]
    },
    {
        id: 9,
        name: "Escalators",
        description: "Commercial escalators for hotels, offices, supermarkets, and airports. Customizable step width and inclination for heavy usage.",
        image: "/products/escalator.jpg",
        features: [
            "Customizable step width",
            "Variable inclination angles",
            "Continuous heavy usage",
            "Energy-saving modes"
        ],
        applications: ["Hotels", "Offices", "Shopping centers", "Supermarkets", "Airports", "Metro stations"]
    }
];

// Modal Component using Portal
const ProductModal = ({ product, onClose, onRequestQuote }: { product: Product; onClose: () => void; onRequestQuote: () => void }) => {
    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Handle escape key
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return createPortal(
        <div className="product-modal-overlay" onClick={onClose}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    {Icons.close}
                </button>

                <div className="modal-content">
                    <div className="modal-image">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="modal-details">
                        <h2>{product.name}</h2>
                        <p className="modal-description">{product.description}</p>

                        <div className="modal-section">
                            <h4>Key Features</h4>
                            <ul className="modal-list">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-section">
                            <h4>Applications</h4>
                            <div className="modal-tags">
                                {product.applications.map((app, index) => (
                                    <span key={index} className="modal-tag">{app}</span>
                                ))}
                            </div>
                        </div>

                        <div className="modal-cta-group">
                            <a
                                href={getWhatsAppUrl(`Hi ISE Elevator Team!\n\nI'm interested in the ${product.name}.\n\nPlease share more details about:\n• Specifications & features\n• Pricing information\n• Installation timeline\n\nThank you!`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp"
                            >
                                <span className="btn-icon">{Icons.whatsapp}</span>
                                <span>Query on WhatsApp</span>
                            </a>
                        </div>
                        <button
                            className="modal-secondary-cta"
                            onClick={() => {
                                onClose();
                                onRequestQuote();
                            }}
                        >
                            Request a Detailed Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { openQuoteModal } = useQuoteModal();

    return (
        <section id="products" className="products-section">
            <div className="products-container">
                <div className="products-header">
                    <span className="section-badge">Product Range</span>
                    <h2>Our Elevator Solutions</h2>
                </div>

                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <button className="product-btn" onClick={() => setSelectedProduct(product)}>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Modal - Rendered via Portal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onRequestQuote={openQuoteModal}
                />
            )}
        </section>
    )
}

export default Products
