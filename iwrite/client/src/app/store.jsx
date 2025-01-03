import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import storiesReducer from "../features/StoriesSlice"

const store = configureStore ({
    reducer: {
        auth: authReducer,
        stories: storiesReducer
    }
})

export default store