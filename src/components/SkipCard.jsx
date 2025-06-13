// src/components/SkipCard.jsx
import React from 'react';
import './SkipCard.css'; 
import WeWantWasteImage from '../assets/We want waste.jpg'; 

/**
 * A reusable component for displaying a single skip card.
 * @param {object} props - The component props.
 * @param {object} props.skip - The skip object containing details like id, name, price, description, size.
 * @param {boolean} props.isSelected - Indicates if this skip card is currently selected.
 * @param {function} props.onSelect - Callback function to handle selection of this skip.
 */
const SkipCard = ({ skip, isSelected, onSelect }) => {

    return (
        <div
            key={skip.id}
            className={`skip-card ${isSelected ? 'selected' : ''}`}
        >
            {/* Skip Image/Placeholder */}
            <div className="skip-card-image-container">
                <img
                    src={WeWantWasteImage}
                    alt={`${skip.size} Yard Skip`}
                    className="skip-card-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x200/4B5563/D1D5DB?text=Skip+Image+Error'; }}
                />
                {/* Top-right "X Yards" label */}
                <div className="skip-yards-label">
                    {skip.size} Yards
                </div>
                {/* Tick icon for selected skip */}
                {isSelected && (
                    <div className="skip-card-tick-icon">
                        <svg className="tick-svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
            {/* Skip Details */}
            <div className="skip-details">
                <h2 className="skip-name">{skip.name}</h2>
                <p className="skip-description">{skip.description}</p>

                

                <div className="skip-price-button-container">
                    <span className="skip-price">
                        £{skip.price}
                    </span>
                    <button
                        onClick={() => onSelect(skip)}
                        className={`select-skip-button ${isSelected ? 'selected-button' : ''}`}
                        disabled={isSelected}
                    >
                        {isSelected ? 'Selected' : 'Select This Skip'}
                        {!isSelected && ( 
                            <svg className="button-arrow-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SkipCard;