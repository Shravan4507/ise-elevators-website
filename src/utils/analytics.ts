// Google Analytics 4 Integration
// Replace GA_MEASUREMENT_ID with your actual GA4 measurement ID (e.g., G-XXXXXXXXXX)

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your actual GA4 ID

// Initialize GA4
export const initGA = () => {
    if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.log('Google Analytics not initialized (no measurement ID)');
        return;
    }

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
    });
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title || document.title,
    });
};

// Track events
export const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};

// Pre-defined event trackers
export const analytics = {
    // Quote events
    quoteFormOpened: () => trackEvent('quote_form_opened', 'Engagement'),
    quoteFormSubmitted: () => trackEvent('quote_form_submitted', 'Conversion'),

    // Contact events
    contactFormSubmitted: () => trackEvent('contact_form_submitted', 'Conversion'),

    // CTA events
    ctaClicked: (ctaName: string) => trackEvent('cta_clicked', 'Engagement', ctaName),
    whatsappClicked: () => trackEvent('whatsapp_clicked', 'Contact'),
    callClicked: () => trackEvent('call_clicked', 'Contact'),

    // Product events
    productViewed: (productName: string) => trackEvent('product_viewed', 'Products', productName),

    // Navigation events
    pageViewed: (pageName: string) => trackEvent('page_viewed', 'Navigation', pageName),
};

// Declare global types for gtag
declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
    }
}
