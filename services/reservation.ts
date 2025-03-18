import { createReservationData } from "@/lib/types/reservationAbm";

type fetchReservationListData = {
    month: number,
    year: number,
};

export async function createReservation(data: createReservationData) {
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
        };

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    };
}

export async function fetchReservationList(data: fetchReservationListData) {
    try {
        const queryParams = new URLSearchParams({
            month: data.month.toString(),
            year: data.year.toString(),
        });

        const response = await fetch(`https://golondrinas-api.vercel.app/api/reservations?${queryParams.toString()}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'An error occurred while fetching the reservations list');
        };

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error fetching reservation list:', error);
        throw error;
    };
}