// src/api/skipService.jsx

const generateDescription = () => {

    return `14 day hire period`;
};

/**
 * Fetches skip data from the API and processes it.
 * @returns {Promise<Array>} A promise that resolves to an array of processed skip objects.
 * @throws {Error} If the API response is not OK.
 */
export const fetchSkips = async () => {
    try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Process the fetched data to include 'name' and calculated 'price'
        const processedSkips = data.map(skip => ({
            ...skip,
            name: `${skip.size} Yard Skip`,
            price: (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(0), 
            description: generateDescription(skip.size) 
        }));

        return processedSkips;
    } catch (err) {
        console.error("Failed to fetch skip data:", err);
        throw err; // Re-throw the error to be handled by the calling component
    }
};
