import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialState } from "../Interfaces/InitialState"
import { Manga } from "../Interfaces/Manga"

const initialState: InitialState = {
    cartItem : [],
    quantity: 0,
    total: 0
}
const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        addToCart : (state: InitialState, action: PayloadAction<Manga>) => {
            const itemIndex = state.cartItem.findIndex((item) => item.id === action.payload.id)
            if(itemIndex >= 0){
                state.cartItem[itemIndex].quantity += 1
            } else{
                const manga = {...action.payload, quantity: 1}
                state.cartItem.push(manga)
            }
        },
        cartTotal : (state: InitialState) => {
            let quantity = 0
            let total = 0

            state.cartItem.forEach((item) => {
                quantity += item.quantity
                total += item.quantity * item.price
            })
            state.quantity = quantity
            state.total = total 
        },
        removeFromCart: (state: InitialState, action : PayloadAction<number>) => {
            state.cartItem = state.cartItem.filter((item) => item.id !== action.payload)
        },

        increase: (state: InitialState, action: PayloadAction<{id : number}>) => {
            const cartItem = state.cartItem.find((item) => item.id === action.payload.id)
            if (cartItem)
                cartItem.quantity = cartItem.quantity + 1
        },

        decrease: (state: InitialState, action: PayloadAction<{id : number}>) => {
            const cartItem = state.cartItem.find((item) => item.id === action.payload.id)
            if (cartItem)
                cartItem.quantity = cartItem.quantity - 1
        },

        clearCart: (state: InitialState) => {
            return {
                ...state,
                cartItem: []
            }
        }
    }

})


export const {addToCart, cartTotal, removeFromCart, increase, decrease, clearCart} = shopSlice.actions
export default shopSlice.reducer