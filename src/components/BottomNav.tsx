import { NavLink } from 'react-router-dom';
import { useQuoteModal } from '../App';
import { Icons } from './Icons';
import './BottomNav.css';

const BottomNav = () => {
    const { openQuoteModal } = useQuoteModal();

    const navItems = [
        { path: '/', label: 'Home', icon: Icons.home },
        { path: '/products', label: 'Products', icon: Icons.elevator },
        { path: '/services', label: 'Services', icon: Icons.maintenance },
        { path: '/contact', label: 'Contact', icon: Icons.phone },
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
                >
                    <span className="bottom-nav-icon">{item.icon}</span>
                    <span className="bottom-nav-label">{item.label}</span>
                </NavLink>
            ))}
            <button className="bottom-nav-item bottom-nav-quote" onClick={openQuoteModal}>
                <span className="bottom-nav-icon">{Icons.quote}</span>
                <span className="bottom-nav-label">Quote</span>
            </button>
        </nav>
    );
};

export default BottomNav;
