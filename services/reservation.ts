import { createReservationData } from "@/lib/types/reservationAbm";

export default async function createReservation(data: createReservationData) {
    try {
        const response = await fetch('https://golondrinas-api.vercel.app/api/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'An error occurred while creating the reservation');
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    };
}
