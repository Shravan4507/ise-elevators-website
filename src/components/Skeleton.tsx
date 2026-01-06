import './Skeleton.css';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

export const Skeleton = ({ width = '100%', height = '1rem', borderRadius = '4px', className = '' }: SkeletonProps) => (
    <div
        className={`skeleton ${className}`}
        style={{ width, height, borderRadius }}
    />
);

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
    <div className="skeleton-text">
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                height="0.875rem"
                width={i === lines - 1 ? '60%' : '100%'}
            />
        ))}
    </div>
);

export const SkeletonCard = () => (
    <div className="skeleton-card">
        <Skeleton height="200px" borderRadius="12px" />
        <div className="skeleton-card-content">
            <Skeleton height="1.5rem" width="70%" />
            <SkeletonText lines={2} />
            <Skeleton height="2.5rem" width="120px" borderRadius="34px" />
        </div>
    </div>
);

export const SkeletonImage = ({ aspectRatio = '16/9' }: { aspectRatio?: string }) => (
    <div className="skeleton-image" style={{ aspectRatio }}>
        <Skeleton height="100%" borderRadius="12px" />
    </div>
);

// Loading Spinner
export const Spinner = ({ size = 24, color = '#0060c7' }: { size?: number; color?: string }) => (
    <svg
        className="spinner"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ color }}
    >
        <circle
            className="spinner-track"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.2"
        />
        <circle
            className="spinner-circle"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="31.4"
            strokeDashoffset="10"
        />
    </svg>
);

// Full page loading overlay
export const LoadingOverlay = ({ message = 'Loading...' }: { message?: string }) => (
    <div className="loading-overlay">
        <div className="loading-content">
            <Spinner size={48} />
            <span>{message}</span>
        </div>
    </div>
);

// Button loading state
export const ButtonLoader = () => (
    <span className="button-loader">
        <Spinner size={18} color="currentColor" />
    </span>
);
