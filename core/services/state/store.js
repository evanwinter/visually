import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"

import { create } from "../api"
import rootReducer from "./reducers"

// Create authenticated API client
const api = create(process.env.GENIUS_API_TOKEN)

// Create middleware, adding logger if dev environment
const middleware = [thunk.withExtraArgument(api)]
if (process.env.NODE_ENV === "development") {
	middleware.push(logger)
}

// Create store
const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
