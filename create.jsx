// src/components/create.jsx
import React, { useState } from 'react';

const Create = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        preferredDate: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email Address is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
        if (!formData.address.trim()) newErrors.address = 'Delivery Address is required';
        if (!formData.preferredDate) newErrors.preferredDate = 'Preferred Date is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage(null);
        setErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitMessage({ type: 'error', text: 'Please correct the errors in the form.' });
            return;
        }

        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Form Submitted:', formData);
            setSubmitMessage({ type: 'success', text: 'Booking successfully submitted! We will contact you shortly.' });
            clearForm();
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitMessage({ type: 'error', text: 'There was an error submitting your booking. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearForm = () => {
        setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            preferredDate: '',
        });
        setErrors({});
        setSubmitMessage(null);
    };

    return (
        <div className="create-container">
            <h2>Enter Your Booking Details</h2>
            <p>Please provide the necessary information for your skip hire.</p>

            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="form-input"
                        aria-invalid={errors.fullName ? "true" : "false"}
                    />
                    {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="form-input"
                        pattern="[0-9]{10,15}"
                        title="Phone number must be 10-15 digits"
                        aria-invalid={errors.phoneNumber ? "true" : "false"}
                    />
                    {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Delivery Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        required
                        className="form-textarea"
                        aria-invalid={errors.address ? "true" : "false"}
                    ></textarea>
                    {errors.address && <p className="error-text">{errors.address}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="preferredDate">Preferred Delivery Date:</label>
                    <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        className="form-input"
                        aria-invalid={errors.preferredDate ? "true" : "false"}
                    />
                    {errors.preferredDate && <p className="error-text">{errors.preferredDate}</p>}
                </div>

                {submitMessage && (
                    <div className={`submit-message ${submitMessage.type}`}>
                        {submitMessage.text}
                    </div>
                )}

                <div className="form-actions">
                    <button
                        type="submit"
                        className="create-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </button>
                    <button
                        type="button"
                        className="clear-button"
                        onClick={clearForm}
                        disabled={isSubmitting}
                    >
                        Clear Form
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
