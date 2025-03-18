import { createReservationData } from "@/lib/types/reservation";

export async function createReservation(data: createReservationData) {
    try {
        const API_URL = process.env.EXPO_PUBLIC_API_URL;
        const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
        
        const response = await fetch(`${API_URL}reservation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'An error occurred while creating the reservation');
        };

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    };
}