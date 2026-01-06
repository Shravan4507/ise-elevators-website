import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthChange, logoutAdmin, changePassword } from '../firebase/auth';
import { getQuotes, getEnquiries, updateQuoteStatus, updateEnquiryStatus, deleteQuote, deleteEnquiry } from '../firebase/firestore';
import type { Quote, Enquiry } from '../firebase/firestore';
import './Admin.css';

type TabType = 'overview' | 'quotes' | 'enquiries' | 'settings';
type StatusType = 'new' | 'read' | 'replied';

// Settings View Component
const SettingsView = ({ userEmail }: { userEmail: string }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!passwordData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }

        if (!passwordData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (passwordData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
        }

        if (!passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your new password';
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setSuccessMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSuccessMessage('');

        const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);

        if (result.success) {
            setSuccessMessage('Password updated successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setErrors({ general: result.error as string });
        }

        setIsSubmitting(false);
    };

    return (
        <div className="settings-grid">
            {/* Account Information */}
            <div className="section-card">
                <h2>Account Information</h2>
                <div className="account-info">
                    <div className="info-row">
                        <span className="info-label">Email</span>
                        <span className="info-value">{userEmail}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Role</span>
                        <span className="info-value">Administrator</span>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="section-card">
                <h2>Change Password</h2>

                {errors.general && (
                    <div className="settings-error">{errors.general}</div>
                )}

                {successMessage && (
                    <div className="settings-success">{successMessage}</div>
                )}

                <form className="password-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Enter current password"
                            value={passwordData.currentPassword}
                            onChange={handleChange}
                            className={errors.currentPassword ? 'input-error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.currentPassword && <span className="field-error">{errors.currentPassword}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            className={errors.newPassword ? 'input-error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.newPassword && <span className="field-error">{errors.newPassword}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'input-error' : ''}
                            disabled={isSubmitting}
                        />
                        {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="update-password-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<Quote | Enquiry | null>(null);
    const [modalType, setModalType] = useState<'quote' | 'enquiry' | null>(null);

    // Check authentication
    useEffect(() => {
        const unsubscribe = onAuthChange((user) => {
            if (!user) {
                navigate('/admin-login', { replace: true });
            } else {
                setUserEmail(user.email || '');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [quotesData, enquiriesData] = await Promise.all([
                getQuotes(),
                getEnquiries()
            ]);
            setQuotes(quotesData);
            setEnquiries(enquiriesData);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        await logoutAdmin();
        navigate('/admin-login', { replace: true });
    };

    const handleStatusChange = async (id: string, status: StatusType, type: 'quote' | 'enquiry') => {
        if (type === 'quote') {
            await updateQuoteStatus(id, status);
            setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
        } else {
            await updateEnquiryStatus(id, status);
            setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
        }
    };

    const handleDelete = async (id: string, type: 'quote' | 'enquiry') => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        if (type === 'quote') {
            await deleteQuote(id);
            setQuotes(prev => prev.filter(q => q.id !== id));
        } else {
            await deleteEnquiry(id);
            setEnquiries(prev => prev.filter(e => e.id !== id));
        }

        setSelectedItem(null);
        setModalType(null);
    };

    const openModal = (item: Quote | Enquiry, type: 'quote' | 'enquiry') => {
        setSelectedItem(item);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setModalType(null);
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '-';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusClass = (status: StatusType) => {
        return `status-badge status-${status}`;
    };

    const stats = [
        { label: 'Total Requests', value: quotes.length + enquiries.length },
        { label: 'Quote Requests', value: quotes.length },
        { label: 'Enquiries', value: enquiries.length },
        { label: 'Pending', value: [...quotes, ...enquiries].filter(i => i.status !== 'replied').length }
    ];

    const renderTable = (data: (Quote | Enquiry)[], type: 'quote' | 'enquiry') => (
        <div className="data-table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {type === 'quote' && <th>Elevator Type</th>}
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={type === 'quote' ? 7 : 6} className="empty-cell">
                                No {type === 'quote' ? 'quotes' : 'enquiries'} found
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                {type === 'quote' && <td>{(item as Quote).elevatorType}</td>}
                                <td>{formatDate(item.createdAt)}</td>
                                <td>
                                    <select
                                        value={item.status}
                                        onChange={(e) => handleStatusChange(item.id!, e.target.value as StatusType, type)}
                                        className={getStatusClass(item.status)}
                                    >
                                        <option value="new">New</option>
                                        <option value="read">Read</option>
                                        <option value="replied">Replied</option>
                                    </select>
                                </td>
                                <td className="action-cell">
                                    <button className="action-btn view-btn" onClick={() => openModal(item, type)}>View</button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(item.id!, type)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    if (isLoading) {
        return (
            <div className="admin-layout">
                <div className="admin-loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <img src="/logo.png" alt="ISE Elevator" />
                    <span>Admin</span>
                </div>
                <nav className="admin-nav">
                    <button
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <span className="nav-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
                            </svg>
                        </span>
                        <span className="nav-text">Overview</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'quotes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('quotes')}
                    >
                        <span className="nav-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                            </svg>
                        </span>
                        <span className="nav-text">Quotes</span>
                        {quotes.filter(q => q.status === 'new').length > 0 && (
                            <span className="nav-badge">{quotes.filter(q => q.status === 'new').length}</span>
                        )}
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('enquiries')}
                    >
                        <span className="nav-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </span>
                        <span className="nav-text">Enquiries</span>
                        {enquiries.filter(e => e.status === 'new').length > 0 && (
                            <span className="nav-badge">{enquiries.filter(e => e.status === 'new').length}</span>
                        )}
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <span className="nav-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                            </svg>
                        </span>
                        <span className="nav-text">Settings</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="nav-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </span>
                        <span className="nav-text">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {activeTab === 'overview' && 'Overview'}
                        {activeTab === 'quotes' && 'Quote Requests'}
                        {activeTab === 'enquiries' && 'Enquiries'}
                        {activeTab === 'settings' && 'Settings'}
                    </h1>
                    <div className="admin-user">
                        <span>{userEmail}</span>
                    </div>
                </header>

                <div className="admin-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="dashboard-view">
                            <div className="stats-grid">
                                {stats.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <div className="stat-info">
                                            <span className="stat-value">{stat.value}</span>
                                            <span className="stat-label">{stat.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="recent-section">
                                <h2>Recent Quote Requests</h2>
                                {renderTable(quotes.slice(0, 5), 'quote')}
                            </div>

                            <div className="recent-section" style={{ marginTop: '1.5rem' }}>
                                <h2>Recent Enquiries</h2>
                                {renderTable(enquiries.slice(0, 5), 'enquiry')}
                            </div>
                        </div>
                    )}

                    {/* Quotes Tab */}
                    {activeTab === 'quotes' && (
                        <div className="section-card">
                            <h2>All Quote Requests</h2>
                            {renderTable(quotes, 'quote')}
                        </div>
                    )}

                    {/* Enquiries Tab */}
                    {activeTab === 'enquiries' && (
                        <div className="section-card">
                            <h2>All Enquiries</h2>
                            {renderTable(enquiries, 'enquiry')}
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <SettingsView userEmail={userEmail} />
                    )}
                </div>
            </main>

            {/* Detail Modal */}
            {selectedItem && modalType && (
                <div className="detail-modal-overlay" onClick={closeModal}>
                    <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="detail-modal-header">
                            <h2>{modalType === 'quote' ? 'Quote Request Details' : 'Enquiry Details'}</h2>
                            <button className="modal-close" onClick={closeModal}>×</button>
                        </div>
                        <div className="detail-modal-body">
                            <div className="detail-row">
                                <span className="detail-label">Name</span>
                                <span className="detail-value">{selectedItem.name}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email</span>
                                <span className="detail-value">
                                    <a href={`mailto:${selectedItem.email}`}>{selectedItem.email}</a>
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Phone</span>
                                <span className="detail-value">
                                    <a href={`tel:${selectedItem.phone}`}>{selectedItem.phone}</a>
                                </span>
                            </div>
                            {modalType === 'quote' && (
                                <>
                                    <div className="detail-row">
                                        <span className="detail-label">Elevator Type</span>
                                        <span className="detail-value">{(selectedItem as Quote).elevatorType}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Number of Floors</span>
                                        <span className="detail-value">{(selectedItem as Quote).floors}</span>
                                    </div>
                                </>
                            )}
                            <div className="detail-row">
                                <span className="detail-label">Date</span>
                                <span className="detail-value">{formatDate(selectedItem.createdAt)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Status</span>
                                <span className="detail-value">
                                    <select
                                        value={selectedItem.status}
                                        onChange={(e) => {
                                            handleStatusChange(selectedItem.id!, e.target.value as StatusType, modalType);
                                            setSelectedItem({ ...selectedItem, status: e.target.value as StatusType });
                                        }}
                                        className={getStatusClass(selectedItem.status)}
                                    >
                                        <option value="new">New</option>
                                        <option value="read">Read</option>
                                        <option value="replied">Replied</option>
                                    </select>
                                </span>
                            </div>
                            <div className="detail-row full-width">
                                <span className="detail-label">Message</span>
                                <p className="detail-message">{selectedItem.message}</p>
                            </div>
                        </div>
                        <div className="detail-modal-footer">
                            <button className="action-btn delete-btn" onClick={() => handleDelete(selectedItem.id!, modalType)}>
                                Delete
                            </button>
                            <a href={`mailto:${selectedItem.email}`} className="action-btn reply-btn">
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
