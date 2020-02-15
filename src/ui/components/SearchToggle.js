import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks/index"
import { Search, X } from "react-feather"

const SearchToggle = () => {
	// State
	const { searchOpen } = useSelector((state) => state.app)

	// Actions
	const dispatch = useDispatch()
	const { appActions } = useActions()

	// Handlers
	const handleClick = (e) => {
		e.preventDefault()
		dispatch(appActions.toggleSearch())
	}

	return (
		<div className="SearchToggle">
			<button onClick={handleClick}>{searchOpen ? <X /> : <Search />}</button>
		</div>
	)
}

export default SearchToggle
