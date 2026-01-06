import { useState } from 'react';
import { createPortal } from 'react-dom';
import { addQuote } from '../firebase/firestore';
import { useToast } from './Toast';
import { analytics } from '../utils/analytics';
import './QuoteModal.css';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    elevatorType: string;
    floors: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    elevatorType?: string;
    floors?: string;
    message?: string;
}

const elevatorTypes = [
    'Passenger Lift',
    'Good Lift',
    'Parking Lift',
    'Hydraulic Lift',
    'Capsule Elevator',
    'Home Elevator',
    'Hospital Elevator',
    'Other'
];

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        elevatorType: '',
        floors: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Elevator type validation
        if (!formData.elevatorType) {
            newErrors.elevatorType = 'Please select an elevator type';
        }

        // Floors validation
        if (!formData.floors.trim()) {
            newErrors.floors = 'Number of floors is required';
        } else if (isNaN(Number(formData.floors)) || Number(formData.floors) < 1) {
            newErrors.floors = 'Please enter a valid number of floors';
        }

        // Message validation is now optional
        if (formData.message.trim() && formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const result = await addQuote({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            elevatorType: formData.elevatorType,
            floors: formData.floors.trim(),
            message: formData.message.trim()
        });

        setIsSubmitting(false);

        if (result.success) {
            setIsSuccess(true);
            showToast('Quote request submitted successfully!', 'success');
            analytics.quoteFormSubmitted();
        } else {
            showToast('Failed to submit quote. Please try again.', 'error');
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            elevatorType: '',
            floors: '',
            message: ''
        });
        setErrors({});
        setIsSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="quote-modal-overlay" onClick={handleClose}>
            <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
                <button className="quote-modal-close" onClick={handleClose}>×</button>

                {isSuccess ? (
                    <div className="quote-success">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2>Quote Request Submitted!</h2>
                        <p>Thank you for your interest. Our team will review your requirements and get back to you within 24 hours.</p>
                        <button className="quote-btn-primary" onClick={handleClose}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="quote-modal-header">
                            <h2>Request a Quote</h2>
                            <p>Fill out the form below and we'll get back to you with a customized quote.</p>
                        </div>

                        <form className="quote-form" onSubmit={handleSubmit} noValidate>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="quote-name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="quote-name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'input-error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && <span className="field-error">{errors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quote-email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="quote-email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'input-error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="quote-phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="quote-phone"
                                        name="phone"
                                        placeholder="+91 83900 91984"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={errors.phone ? 'input-error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quote-floors">Number of Floors *</label>
                                    <input
                                        type="number"
                                        id="quote-floors"
                                        name="floors"
                                        placeholder="e.g., 5"
                                        min="1"
                                        value={formData.floors}
                                        onChange={handleChange}
                                        className={errors.floors ? 'input-error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    {errors.floors && <span className="field-error">{errors.floors}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="quote-type">Elevator Type *</label>
                                <select
                                    id="quote-type"
                                    name="elevatorType"
                                    value={formData.elevatorType}
                                    onChange={handleChange}
                                    className={errors.elevatorType ? 'input-error' : ''}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select elevator type</option>
                                    {elevatorTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.elevatorType && <span className="field-error">{errors.elevatorType}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="quote-message">Project Details</label>
                                <textarea
                                    id="quote-message"
                                    name="message"
                                    placeholder="Describe your requirements, building type, specific features needed..."
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={errors.message ? 'input-error' : ''}
                                    disabled={isSubmitting}
                                />
                                {errors.message && <span className="field-error">{errors.message}</span>}
                            </div>

                            <button type="submit" className="quote-btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default QuoteModal;
