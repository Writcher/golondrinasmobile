export type formData = {
    dateIn: Date,
    dateInVisible: boolean,
    dateOut: Date,
    dateOutVisible: boolean,
    visitorQuantity: number,
    selectedCabins: number[],
    price: number,
    clientName: string,
    isSecondPhase: boolean,
    alreadySearched: boolean 
}

export type createReservationData = {
    dateIn: Date,
    dateOut: Date,
    visitorQuantity: number,
    price: number,
    clientName: string,
    cabins: number[],
}