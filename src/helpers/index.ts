export const TYPES_BARCODES  = {
    EAN: (str: String) => `${str.substr(0, 1)}-${str.substr(1,6)}-${str.substr(7)}`,
    EAN_8: (str: String) => `${str.substr(0, 4)}-${str.substr(4)}`
}