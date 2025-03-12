export type formData = {
    dateIn: Date,
    dateInVisible: boolean,
    dateOut: Date,
    dateOutVisible: boolean,
    visitorQuantity: number,
    selectedCabins: number[],
    price: number,
    clientName: string,
    isSecondPhase: boolean
}

export type fetchAvailableCabinsData = {
    dateIn: Date,
    dateOut: Date,
    visitorQuantity: number
}

export type createReservationData = {
    dateIn: Date,
    dateOut: Date,
    visitorQuantity: number,
    price: number,
    clientName: string,
    cabins: number[],
}