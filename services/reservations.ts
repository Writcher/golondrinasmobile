import { fetchReservationListData, fetchTodayInsListData, fetchTodayOutsListData } from "@/lib/types/reservations";

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
};

export async function fetchTodayInsList(data: fetchTodayInsListData) {
    try {
        const API_URL = process.env.EXPO_PUBLIC_API_URL;
        const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

        const queryParams = new URLSearchParams({
            dateIn: data.dateIn.toISOString(),
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
};

export async function fetchTodayOutsList(data: fetchTodayOutsListData) {
    try {
        const API_URL = process.env.EXPO_PUBLIC_API_URL;
        const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

        const queryParams = new URLSearchParams({
            dateOut: data.dateOut.toISOString(),
        });

        console.log("dateout se ejecuto")

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
        console.log(responseData[0])
        return responseData;

    } catch (error) {
        console.error('Error fetching reservation list:', error);
        throw error;
    };
};