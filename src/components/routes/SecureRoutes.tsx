import { Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react';

// Protected Route wrapper component
interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: ReactNode;
    redirectPath?: string;
}

const ProtectedRoute = ({
    isAuthenticated,
    children,
    redirectPath = '/login'
}: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />
    }
    return <>{children}</>
}

// Placeholder components for secure pages (to be created later)
const Dashboard = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
    </div>
)

const AdminPanel = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Admin Panel</h1>
        <p>Manage your elevator services</p>
    </div>
)

const QuoteRequests = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Quote Requests</h1>
        <p>View and manage quote requests</p>
    </div>
)

interface SecureRoutesProps {
    isAuthenticated: boolean;
    userRole?: 'user' | 'admin';
}

const SecureRoutes = ({ isAuthenticated, userRole = 'user' }: SecureRoutesProps) => {
    return (
        <Routes>
            {/* User protected routes */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Admin only routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated && userRole === 'admin'}>
                        <AdminPanel />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/quotes"
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated && userRole === 'admin'}>
                        <QuoteRequests />
                    </ProtectedRoute>
                }
            />

            {/* Catch unauthorized access */}
            <Route
                path="/unauthorized"
                element={
                    <div style={{ padding: '4rem', textAlign: 'center' }}>
                        <h1>Unauthorized</h1>
                        <p>You don't have permission to access this page.</p>
                    </div>
                }
            />
        </Routes>
    )
}

export { ProtectedRoute }
export default SecureRoutes
