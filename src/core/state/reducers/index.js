import { combineReducers } from "redux"

import analysis from "./analysis"
import app from "./app"
import artist from "./artist"
import charts from "./charts"
import discography from "./discography"
import search from "./search"

const rootReducer = combineReducers({
	analysis,
	artist,
	app,
	charts,
	discography,
	search,
})

export default rootReducer
