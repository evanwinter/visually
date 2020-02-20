import { combineReducers } from "redux"

import analysis from "./analysis"
import app from "./app"
import artist from "./artist"
import chart from "./chart"
import discography from "./discography"
import search from "./search"

const rootReducer = combineReducers({
	analysis,
	artist,
	app,
	chart,
	discography,
	search,
})

export default rootReducer
