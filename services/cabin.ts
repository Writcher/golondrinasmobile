import { fetchAvailableCabinsData } from "@/lib/types/reservationAbm";

export default async function fetchAvailableCabins(data: fetchAvailableCabinsData) {
    const { dateIn, dateOut, visitorQuantity } = data;

    const dateInFormatted = dateIn.toISOString();
    const dateOutFormatted = dateOut.toISOString();

    try {
        const response = await fetch(`http://192.168.1.35:3000/api/cabin?dateIn=${dateInFormatted}&dateOut=${dateOutFormatted}&visitorQuantity=${visitorQuantity}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch available cabins');
        };

        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        console.error('Error fetching available cabins:', error);
        return { success: false, error: error.message };
    };
}