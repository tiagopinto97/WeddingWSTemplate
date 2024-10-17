
const INVITE_DATA_LS_KEY = 'JD26WCI';
const WEDDING_DATA_LS_KEY = 'JD25WDC';
import lzString from "lz-string";

export const loadInvite = () => {
    try {
        return JSON.parse(lzString.decompressFromEncodedURIComponent(localStorage.getItem(INVITE_DATA_LS_KEY)))
    } catch{
        return null;
    }
}

export const setInvite = (data: any) => {
    if (data === null) {
        return localStorage.removeItem(INVITE_DATA_LS_KEY)
    } else {
        return localStorage.setItem(INVITE_DATA_LS_KEY, lzString.compressToEncodedURIComponent(JSON.stringify(data)))
    }
}

export const loadWedding = () => {
    try {
        return JSON.parse( lzString.decompressFromEncodedURIComponent(localStorage.getItem(WEDDING_DATA_LS_KEY)))
    } catch{
        return null;
    }
}

export const setWeddingData = (data: any) => {
    if (data === null) {
        return localStorage.removeItem(WEDDING_DATA_LS_KEY)
    } else {
        return localStorage.setItem(WEDDING_DATA_LS_KEY, lzString.compressToEncodedURIComponent(JSON.stringify(data)))
    }
}