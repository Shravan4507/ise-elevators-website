import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, onAuthChange } from '../firebase/auth';
import './AdminLogin.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        general: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Check if already logged in
    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (user) {
                navigate('/admin-dashboard', { replace: true });
            }
            setIsCheckingAuth(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '', general: '' };

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear field error on change
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors(prev => ({ ...prev, general: '' }));

        const result = await loginAdmin(formData.email, formData.password);

        if (result.success) {
            navigate('/admin-dashboard', { replace: true });
        } else {
            setErrors(prev => ({ ...prev, general: result.error as string }));
        }

        setIsLoading(false);
    };

    if (isCheckingAuth) {
        return (
            <div className="admin-login-page">
                <div className="login-container">
                    <div className="login-loading">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <div className="login-header">
                    <img src="/logo.png" alt="ISE Elevator" className="login-logo" />
                    <h1>Admin Login</h1>
                    <p>Sign in to access the admin dashboard</p>
                </div>

                {errors.general && (
                    <div className="login-error-banner">
                        {errors.general}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="admin@iseelevator.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                            disabled={isLoading}
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                            disabled={isLoading}
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-footer">
                    <a href="/">Back to Website</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
