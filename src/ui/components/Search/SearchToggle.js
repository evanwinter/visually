import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks/index"
import { Search, X } from "react-feather"
import T from "types"

const SearchToggle = () => {
	// State
	const { searchOpen, step } = useSelector((state) => state.app)

	// Actions
	const dispatch = useDispatch()
	const { searchActions, appActions } = useActions()

	// Handlers
	const handleClick = (e) => {
		e.preventDefault()
		dispatch(appActions.toggleSearch())
		dispatch(searchActions.hideSuggestions())
	}

	if (step === T.STEP_INITIAL) {
		return ""
	}

	return (
		<div className="SearchToggle">
			<button onClick={handleClick}>{searchOpen ? <X /> : <Search />}</button>
		</div>
	)
}

export default SearchToggle
