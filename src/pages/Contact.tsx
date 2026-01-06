import { useState } from 'react'
import './Contact.css'
import { Icons } from '../components/Icons'
import { addEnquiry } from '../firebase/firestore'
import { getWhatsAppUrl } from '../utils/contactUtils'
import { useToast } from '../components/Toast'

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

const Contact = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation (optional but must be valid if provided)
        if (formData.phone.trim() && !/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const result = await addEnquiry({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim()
        });

        setIsSubmitting(false);

        if (result.success) {
            setIsSubmitted(true);
            showToast('Your enquiry has been submitted successfully!', 'success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            showToast('Failed to submit enquiry. Please try again.', 'error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        setIsSubmitted(false);
    };

    if (isSubmitted) {
        return (
            <section className="contact-section">
                <div className="contact-container">
                    <div className="success-message">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2>Thank You!</h2>
                        <p>Your message has been received. Our team will get back to you within 24 hours.</p>
                        <button className="btn-primary" onClick={resetForm}>Send Another Message</button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <div className="contact-header">
                    <span className="section-badge">Get In Touch</span>
                    <h2>Contact Us</h2>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-primary-actions">
                            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp full-width">
                                <span className="btn-icon">{Icons.whatsapp}</span>
                                <span>Message Us on WhatsApp</span>
                            </a>
                        </div>

                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <div>
                                <h4>Main Office</h4>
                                <p>Flat No 103 Sr No 3/21 Parthavi Emarald, Bhairvnath Nagar, Narhe, Pune 411041</p>
                            </div>
                        </div>
                        <div className="contact-info-card">
                            <div className="contact-info-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p><a href="mailto:iseelevator@gmail.com">iseelevator@gmail.com</a></p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'input-error' : ''}
                                disabled={isSubmitting}
                            />
                            {errors.name && <span className="field-error">{errors.name}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'input-error' : ''}
                                    disabled={isSubmitting}
                                />
                                {errors.email && <span className="field-error">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'input-error' : ''}
                                    disabled={isSubmitting}
                                />
                                {errors.phone && <span className="field-error">{errors.phone}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Tell us about your elevator requirements..."
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className={errors.message ? 'input-error' : ''}
                                disabled={isSubmitting}
                            />
                            {errors.message && <span className="field-error">{errors.message}</span>}
                        </div>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
