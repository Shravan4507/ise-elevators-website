import { useState } from 'react'
import './AccessibilityTools.css'
import { Icons } from './Icons'

interface AccessibilityState {
    highContrast: boolean;
    normalContrast: boolean;
    highlightLinks: boolean;
    invert: boolean;
    saturation: boolean;
    fontSize: 'normal' | 'increase' | 'decrease';
    textSpacing: boolean;
    lineHeight: boolean;
    hideImages: boolean;
    bigCursor: boolean;
}

const AccessibilityTools = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<AccessibilityState>({
        highContrast: false,
        normalContrast: true,
        highlightLinks: false,
        invert: false,
        saturation: false,
        fontSize: 'normal',
        textSpacing: false,
        lineHeight: false,
        hideImages: false,
        bigCursor: false,
    });

    const applySettings = (newSettings: AccessibilityState) => {
        const root = document.documentElement;

        // High Contrast
        if (newSettings.highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

        // Invert Colors
        if (newSettings.invert) {
            root.classList.add('invert-colors');
        } else {
            root.classList.remove('invert-colors');
        }

        // Saturation (Grayscale)
        if (newSettings.saturation) {
            root.classList.add('grayscale');
        } else {
            root.classList.remove('grayscale');
        }

        // Highlight Links
        if (newSettings.highlightLinks) {
            root.classList.add('highlight-links');
        } else {
            root.classList.remove('highlight-links');
        }

        // Font Size
        root.classList.remove('font-size-increase', 'font-size-decrease');
        if (newSettings.fontSize === 'increase') {
            root.classList.add('font-size-increase');
        } else if (newSettings.fontSize === 'decrease') {
            root.classList.add('font-size-decrease');
        }

        // Text Spacing
        if (newSettings.textSpacing) {
            root.classList.add('text-spacing');
        } else {
            root.classList.remove('text-spacing');
        }

        // Line Height
        if (newSettings.lineHeight) {
            root.classList.add('line-height-increase');
        } else {
            root.classList.remove('line-height-increase');
        }

        // Hide Images
        if (newSettings.hideImages) {
            root.classList.add('hide-images');
        } else {
            root.classList.remove('hide-images');
        }

        // Big Cursor
        if (newSettings.bigCursor) {
            root.classList.add('big-cursor');
        } else {
            root.classList.remove('big-cursor');
        }
    };

    const updateSetting = <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => {
        const newSettings = { ...settings, [key]: value };

        // Handle contrast toggles (mutually exclusive)
        if (key === 'highContrast' && value) {
            newSettings.normalContrast = false;
        }
        if (key === 'normalContrast' && value) {
            newSettings.highContrast = false;
        }

        setSettings(newSettings);
        applySettings(newSettings);
    };

    return (
        <div className="a11y-nav-container">
            <button
                className="a11y-nav-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Accessibility Tools"
                title="Accessibility Tools"
            >
                {Icons.accessibility}
            </button>

            {isOpen && (
                <>
                    <div className="a11y-overlay" onClick={() => setIsOpen(false)}></div>
                    <div className="a11y-panel">
                        <div className="a11y-header">
                            <h3>Accessibility Tools</h3>
                            <button className="a11y-close" onClick={() => setIsOpen(false)}>
                                {Icons.close}
                            </button>
                        </div>

                        <div className="a11y-section">
                            <h4>Color Contrast</h4>
                            <div className="a11y-grid">
                                <button
                                    className={`a11y-btn ${settings.highContrast ? 'active' : ''}`}
                                    onClick={() => updateSetting('highContrast', !settings.highContrast)}
                                >
                                    <span className="a11y-icon">{Icons.contrast}</span>
                                    <span>High Contrast</span>
                                </button>
                                <button
                                    className={`a11y-btn ${settings.normalContrast ? 'active' : ''}`}
                                    onClick={() => updateSetting('normalContrast', true)}
                                >
                                    <span className="a11y-icon">{Icons.sun}</span>
                                    <span>Normal Contrast</span>
                                    {settings.normalContrast && <span className="a11y-check">{Icons.check}</span>}
                                </button>
                                <button
                                    className={`a11y-btn ${settings.highlightLinks ? 'active' : ''}`}
                                    onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                                >
                                    <span className="a11y-icon">{Icons.link}</span>
                                    <span>Highlight Links</span>
                                </button>
                            </div>
                            <div className="a11y-grid a11y-grid-2">
                                <button
                                    className={`a11y-btn ${settings.invert ? 'active' : ''}`}
                                    onClick={() => updateSetting('invert', !settings.invert)}
                                >
                                    <span className="a11y-icon">{Icons.invert}</span>
                                    <span>Invert</span>
                                </button>
                                <button
                                    className={`a11y-btn ${settings.saturation ? 'active' : ''}`}
                                    onClick={() => updateSetting('saturation', !settings.saturation)}
                                >
                                    <span className="a11y-icon">{Icons.contrast}</span>
                                    <span>Saturation</span>
                                </button>
                            </div>
                        </div>

                        <div className="a11y-section">
                            <h4>Text Size</h4>
                            <div className="a11y-grid">
                                <button
                                    className={`a11y-btn ${settings.fontSize === 'increase' ? 'active' : ''}`}
                                    onClick={() => updateSetting('fontSize', 'increase')}
                                >
                                    <span className="a11y-icon">{Icons.fontIncrease}</span>
                                    <span>Font Size Increase</span>
                                </button>
                                <button
                                    className={`a11y-btn ${settings.fontSize === 'decrease' ? 'active' : ''}`}
                                    onClick={() => updateSetting('fontSize', 'decrease')}
                                >
                                    <span className="a11y-icon">{Icons.fontDecrease}</span>
                                    <span>Font Size Decrease</span>
                                </button>
                                <button
                                    className={`a11y-btn ${settings.fontSize === 'normal' ? 'active' : ''}`}
                                    onClick={() => updateSetting('fontSize', 'normal')}
                                >
                                    <span className="a11y-icon">{Icons.fontNormal}</span>
                                    <span>Normal Font</span>
                                    {settings.fontSize === 'normal' && <span className="a11y-check">{Icons.check}</span>}
                                </button>
                            </div>
                            <div className="a11y-grid a11y-grid-2">
                                <button
                                    className={`a11y-btn ${settings.textSpacing ? 'active' : ''}`}
                                    onClick={() => updateSetting('textSpacing', !settings.textSpacing)}
                                >
                                    <span className="a11y-icon">{Icons.textSpacing}</span>
                                    <span>Text Spacing</span>
                                </button>
                                <button
                                    className={`a11y-btn ${settings.lineHeight ? 'active' : ''}`}
                                    onClick={() => updateSetting('lineHeight', !settings.lineHeight)}
                                >
                                    <span className="a11y-icon">{Icons.lineHeight}</span>
                                    <span>Line Height</span>
                                </button>
                            </div>
                        </div>

                        <div className="a11y-section">
                            <h4>Other controls</h4>
                            <div className="a11y-grid a11y-grid-2">
                                <button
                                    className={`a11y-btn ${settings.hideImages ? 'active' : ''}`}
                                    onClick={() => updateSetting('hideImages', !settings.hideImages)}
                                >
                                    <span className="a11y-icon">{Icons.hideImage}</span>
                                    <span>Hide Images</span>
                                </button>
                                <button
                                    className={`a11y-btn ${settings.bigCursor ? 'active' : ''}`}
                                    onClick={() => updateSetting('bigCursor', !settings.bigCursor)}
                                >
                                    <span className="a11y-icon">{Icons.cursor}</span>
                                    <span>Big Cursor</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AccessibilityTools
