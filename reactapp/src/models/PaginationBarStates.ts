export interface ButtonsStates {
    first: boolean,
    previous: boolean,
    next: boolean,
    last: boolean,    
}


export const defaultDisabledButtonStates: ButtonsStates = {
    first: false,
    previous: false,
    next: false,
    last: false
}


export const defaultDisplayButtonStates: ButtonsStates = {
    first: true,
    previous: true,
    next: true,
    last: true
}