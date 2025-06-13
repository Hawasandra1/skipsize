
import React, { useState, useEffect } from 'react';
import { fetchSkips } from './api/skipService';
import SkipCard from './components/SkipCard';
import SummaryFooter from './components/SummaryFooter';
import './App.css'; 


import { MapPin, Trash2, Truck, Calendar, CreditCard, Shield } from 'lucide-react';

function App() {
    const [skips, setSkips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSkip, setSelectedSkip] = useState(null);
    const [activeStep, setActiveStep] = useState('Select Skip');
   
    const [showSummaryFooter, setShowSummaryFooter] = useState(false);

    useEffect(() => {
        const getSkips = async () => {
            try {
                const data = await fetchSkips();
                setSkips(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getSkips();
    }, []);

    const handleSelectSkip = (skip) => {
        setSelectedSkip(skip);
        // Set showSummaryFooter to true when a skip is selected
        setShowSummaryFooter(true);
    };

    // Handler for the "Back" button in the footer
    const handleBack = () => {
        setSelectedSkip(null); // Deselect the skip
        setShowSummaryFooter(false); // Hide the footer
    };

    // Handler for the "Continue" button in the footer
    const handleContinue = () => {
        if (selectedSkip) {
            console.log("Continue with selected skip:", selectedSkip);
            alert(`Proceeding with ${selectedSkip.name} for £${selectedSkip.price}.`);
        } else {
            console.warn("Continue clicked, but no skip selected.");
        }
    };

    if (loading) {
        return (
            <div className="app-loading-container">
                <p className="loading-message">Loading skips...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-error-container">
                <p className="error-message">Error: {error.message}</p>
            </div>
        );
    }


    const progressSteps = [
        { name: 'Postcode', icon: MapPin },
        { name: 'Waste Type', icon: Trash2 },
        { name: 'Select Skip', icon: Truck },
        { name: 'Permit Check', icon: Shield },
        { name: 'Choose Date', icon: Calendar },
        { name: 'Payment', icon: CreditCard },
    ];

    return (
        <div className="app-container">
            {/* Inline JSX for the Progress Tracker (Navigation Bar) */}
            <nav className="progress-tracker">
                <ul>
                    {progressSteps.map((step) => {
                        const IconComponent = step.icon;
                        return (
                            <li
                                key={step.name}
                                className={`progress-step ${activeStep === step.name ? 'active' : ''}`}
                                onClick={() => setActiveStep(step.name)}
                            >
                                {IconComponent && <IconComponent size={16} className="step-icon" />}
                                <span className="step-name">{step.name}</span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            {/* End of Inline JSX for Progress Tracker */}

            <header className="page-header">
                <h1 className="header-title">Choose Your Skip Size</h1>
                <p className="header-subtitle">Select the skip size that best suits your needs</p>
            </header>

            <main className="skips-main-content">
                {skips.length === 0 ? (
                    <p className="no-skips-message">No skips available for this location.</p>
                ) : (
                    <div className="skips-grid">
                        {skips.map(skip => (
                            <SkipCard
                                key={skip.id}
                                skip={skip}
                                isSelected={selectedSkip && selectedSkip.id === skip.id}
                                onSelect={handleSelectSkip}
                            />
                        ))}
                    </div>
                )}
            </main>

            <SummaryFooter
                selectedSkip={selectedSkip}
                isOpen={showSummaryFooter}
                onBack={handleBack} 
                onContinue={handleContinue} 
            />
        </div>
    );
}

export default App;
