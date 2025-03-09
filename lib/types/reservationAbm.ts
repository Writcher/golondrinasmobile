export type formData = {
    dateIn: Date,
    dateInVisible: boolean,
    dateOut: Date,
    dateOutVisible: boolean,
    visitorQuantity: number,
    selectedCabins: number[],
}

export type fetchAvailableCabinsData = {
    dateIn: Date,
    dateOut: Date,
    visitorQuantity: number
}