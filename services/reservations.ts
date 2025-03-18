import { fetchReservationListData } from "@/lib/types/reservations";

export async function fetchReservationList(data: fetchReservationListData) {
    try {
        const API_URL = process.env.EXPO_PUBLIC_API_URL;
        const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

        const queryParams = new URLSearchParams({
            month: data.month.toString(),
            year: data.year.toString(),
        });

        const response = await fetch(`${API_URL}reservations?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
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