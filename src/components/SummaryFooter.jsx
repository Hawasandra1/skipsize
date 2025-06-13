// src/components/SummaryFooter.jsx
import React from 'react';
import './SummaryFooter.css';

/**
 * A persistent summary footer that appears when a skip is selected.
 * @param {object} props - The component props.
 * @param {object} props.skip - The currently selected skip object. (Changed from selectedSkip for clarity if you pass 'skip')
 * @param {boolean} props.isOpen - Controls the visibility of the footer.
 * @param {function} props.onBack - Callback for the 'Back' button.
 * @param {function} props.onContinue - Callback for the 'Continue' button.
 */
const SummaryFooter = ({ selectedSkip, isOpen, onBack, onContinue }) => {
    // If no skip is selected or it's not open, don't render anything
    if (!selectedSkip || !isOpen) {
        return null;
    }

    const { name, price, description } = selectedSkip; 

    return (
        <div className={`summary-footer ${isOpen ? 'show' : ''}`}>
            <div className="summary-footer-content">
                {/* Left Section: Disclaimer Text */}
                <div className="footer-disclaimer">
                    <p>Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.</p>
                </div>

                {/* Middle Section: Selected Skip Info */}
                <div className="skip-summary-info">
                    {/* Name on its own line */}
                    <p className="selected-skip-name">{name}</p>
                    {/* Price and description on the line below */}
                    <p className="selected-skip-price-and-hire">
                        <span className="selected-skip-price">£{price}</span> <span className="selected-skip-hire-period">{description}</span>
                    </p>
                </div>

                {/* Right Section: Actions (Buttons) */}
                <div className="summary-footer-actions">
                    <button className="summary-button back-button" onClick={onBack}>
                        Back
                    </button>
                    <button className="summary-button continue-button" onClick={onContinue}>
                        Continue
                        <svg className="button-arrow-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 =0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummaryFooter;
