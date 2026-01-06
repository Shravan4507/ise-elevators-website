import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: string;
}

const defaultMeta = {
    title: 'ISE Elevator - Trusted Elevator Solutions in Pune, Maharashtra',
    description: 'ISE Elevator provides complete elevator solutions in Pune, Maharashtra. Expert in passenger lifts, goods lifts, hospital elevators, home elevators - installation, maintenance & modernization.',
    keywords: 'elevator, lift, pune, maharashtra, passenger lift, goods lift, hospital elevator, home elevator, elevator installation, elevator maintenance, AMC',
    image: '/logo.png',
    type: 'website'
};

const pageMeta: Record<string, SEOProps> = {
    '/': {
        title: 'ISE Elevator - Trusted Edge Technology on Every Level | Pune',
        description: 'ISE Elevator delivers complete elevator solutions in Pune - from new installations to modernization and maintenance. 500+ successful installations. 24/7 support.',
    },
    '/about': {
        title: 'About ISE Elevator - Leading Elevator Manufacturer in Pune',
        description: 'Learn about ISE Elevator, a trusted elevator manufacturer and service provider in Maharashtra. Led by Suraj Mulik with 15+ years of industry expertise.',
    },
    '/products': {
        title: 'Elevator Products - Passenger, Goods, Hospital, Home Lifts | ISE Elevator',
        description: 'Explore our range of elevators: Passenger Lifts, Goods Lifts, Hospital Elevators, Home Elevators, Capsule Elevators, MRL Elevators & more.',
    },
    '/services': {
        title: 'Elevator Services - Installation, Maintenance, AMC | ISE Elevator',
        description: 'Professional elevator services: New installation, modernization, maintenance, AMC, 24/7 emergency repairs. Serving Pune and Maharashtra.',
    },
    '/contact': {
        title: 'Contact ISE Elevator - Get a Free Quote Today',
        description: 'Contact ISE Elevator for elevator installation, maintenance, or repairs. Call +91 83900 91984 or WhatsApp us for instant support.',
    }
};

// Structured Data for Local Business
const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ISE Elevator",
    "image": "https://iseelevator.com/logo.png",
    "description": "Complete elevator solutions provider in Pune, Maharashtra - installation, maintenance, modernization, and 24/7 emergency repairs.",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Flat No 103 Sr No 3/21 Parthavi Emarald, Bhairvnath Nagar, Narhe",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411041",
        "addressCountry": "IN"
    },
    "telephone": "+918390091984",
    "email": "iseelevator@gmail.com",
    "url": "https://iseelevator.com",
    "openingHours": "Mo-Sa 09:00-18:00",
    "priceRange": "₹₹₹",
    "sameAs": [
        "https://facebook.com/iseelevator",
        "https://instagram.com/iseelevator",
        "https://linkedin.com/company/iseelevator"
    ],
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "18.4529",
        "longitude": "73.8224"
    },
    "areaServed": {
        "@type": "State",
        "name": "Maharashtra"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Elevator Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Elevator Installation"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Elevator Maintenance"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Elevator Modernization"
                }
            }
        ]
    }
};

const SEO = ({ title, description, keywords, image, type }: SEOProps) => {
    const location = useLocation();
    const pathname = location.pathname;

    // Get page-specific meta or use defaults
    const pageSpecificMeta = pageMeta[pathname] || {};
    const finalTitle = title || pageSpecificMeta.title || defaultMeta.title;
    const finalDescription = description || pageSpecificMeta.description || defaultMeta.description;
    const finalKeywords = keywords || defaultMeta.keywords;
    const finalImage = image || defaultMeta.image;
    const finalType = type || defaultMeta.type;

    useEffect(() => {
        // Update document title
        document.title = finalTitle;

        // Helper to update or create meta tag
        const updateMeta = (name: string, content: string, isProperty = false) => {
            const attribute = isProperty ? 'property' : 'name';
            let meta = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attribute, name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        // Basic meta tags
        updateMeta('description', finalDescription);
        updateMeta('keywords', finalKeywords);

        // Open Graph tags
        updateMeta('og:title', finalTitle, true);
        updateMeta('og:description', finalDescription, true);
        updateMeta('og:image', finalImage, true);
        updateMeta('og:type', finalType, true);
        updateMeta('og:url', window.location.href, true);
        updateMeta('og:site_name', 'ISE Elevator', true);

        // Twitter Card tags
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', finalTitle);
        updateMeta('twitter:description', finalDescription);
        updateMeta('twitter:image', finalImage);

        // Structured Data JSON-LD
        let scriptTag = document.querySelector('script[type="application/ld+json"]');
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.setAttribute('type', 'application/ld+json');
            document.head.appendChild(scriptTag);
        }
        scriptTag.textContent = JSON.stringify(structuredData);

    }, [finalTitle, finalDescription, finalKeywords, finalImage, finalType, pathname]);

    return null;
};

export default SEO;
