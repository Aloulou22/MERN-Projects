import { configureStore } from "@reduxjs/toolkit";
import { mangasApi } from "../Features/mangasApi";
import shopReducer from "../Features/ShopSlice"

// Configuration du store Redux
export const store = configureStore({
    reducer : {
        [mangasApi.reducerPath] : mangasApi.reducer, // Ajout du reducer de l'API mangas
        shop : shopReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mangasApi.middleware) // Ajout du middleware de l'API mangas
});


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>