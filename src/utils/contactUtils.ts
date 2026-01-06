import { useState } from 'react';

// Phone number details
export const PHONE_NUMBER = "8390091984";
export const FORMATTED_PHONE = "+91 83900 91984";
export const WHATSAPP_NUMBER = "918390091984";

// Pre-written WhatsApp message
export const WHATSAPP_MESSAGE = encodeURIComponent(
    `Hi ISE Elevator Team!\n\nI'm interested in your elevator solutions and would like to learn more about your services.\n\nPlease share details about:\n• Available elevator types\n• Installation process\n• Pricing and quotation\n\nLooking forward to hearing from you!\n\nThank you.`
);

// Get WhatsApp URL with pre-written message
export const getWhatsAppUrl = (customMessage?: string) => {
    const message = customMessage ? encodeURIComponent(customMessage) : WHATSAPP_MESSAGE;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

// Detect if device supports calling (mobile/tablet)
export const isMobileDevice = (): boolean => {
    if (typeof navigator === 'undefined') return false;
    const isTouchDevice = navigator.maxTouchPoints !== undefined && navigator.maxTouchPoints > 2;
    return /Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent) || isTouchDevice;
};

// Hook for call button with tooltip
export const useCallButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCallClick = (e: React.MouseEvent) => {
        if (isMobileDevice()) {
            // Mobile: redirect to dial pad
            window.location.href = `tel:+91${PHONE_NUMBER}`;
        } else {
            // Desktop: show tooltip with number
            e.preventDefault();
            setShowTooltip(true);

            // Copy to clipboard
            navigator.clipboard.writeText(FORMATTED_PHONE).catch(() => {
                // Fallback if clipboard fails
            });

            // Hide tooltip after 3 seconds
            setTimeout(() => setShowTooltip(false), 3000);
        }
    };

    return { showTooltip, handleCallClick, formattedPhone: FORMATTED_PHONE };
};
