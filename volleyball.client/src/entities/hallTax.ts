import Hall from "./hall";

export default interface HallTax {
    id?: number,
    hall: Hall,
    isMemberTaxDinamic: boolean,
    memberPlayerTax: number
    regularPlayerTax: number
    isRegularTaxDinamic: boolean
    monthRentTax: number
    gameRentTax: number
}