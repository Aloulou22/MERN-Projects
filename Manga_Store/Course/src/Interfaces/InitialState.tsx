import {Manga} from "./Manga"

export interface InitialState {
    cartItem : Manga[],
    quantity: number,
    total: number
}