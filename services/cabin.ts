import { fetchAvailableCabinsData } from '@/lib/types/cabin';

export default async function fetchAvailableCabins(data: fetchAvailableCabinsData) {
    try {        
        const API_URL = process.env.EXPO_PUBLIC_API_URL;
        const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

        const { dateIn, dateOut, visitorQuantity } = data;

        const queryParams = new URLSearchParams({
            dateIn: dateIn.toISOString(),
            dateOut: dateOut.toISOString(),
            visitorQuantity: visitorQuantity.toString(),
        })

        const response = await fetch(`${API_URL}cabins?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch available cabins');
        };

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        console.error('Error fetching available cabins:', error);
        return { success: false, error: error.message };
    };
}