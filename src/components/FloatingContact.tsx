import './FloatingContact.css'
import { Icons } from './Icons'
import { useCallButton, getWhatsAppUrl } from '../utils/contactUtils'

const FloatingContact = () => {
    const { showTooltip, handleCallClick, formattedPhone } = useCallButton();

    return (
        <div className="floating-contact">
            <div className="floating-btn-wrapper">
                <button
                    onClick={handleCallClick}
                    className="floating-btn call-btn"
                    aria-label="Call Us"
                    title="Call Us"
                >
                    <span className="btn-icon">{Icons.phone}</span>
                </button>

                {showTooltip && (
                    <div className="call-tooltip">
                        <span className="tooltip-number">{formattedPhone}</span>
                        <span className="tooltip-copied">Copied to clipboard!</span>
                    </div>
                )}
            </div>

            <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-btn whatsapp-btn"
                aria-label="WhatsApp Us"
                title="WhatsApp Us"
            >
                <span className="btn-icon">{Icons.whatsapp}</span>
            </a>
        </div>
    );
};

export default FloatingContact;
