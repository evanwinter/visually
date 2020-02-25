import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks/index"
import { X } from "react-feather"
import T from "types"

const BottomDrawerToggle = ({ children }) => {
	// State
	const { bottomDrawerOpen } = useSelector((state) => state.app)
	const { showSuggestions } = useSelector((state) => state.search)

	// Actions
	const dispatch = useDispatch()
	const { searchActions, appActions } = useActions()

	// Handlers
	const handleClick = (e) => {
		e.preventDefault()
		dispatch(appActions.toggleBottomDrawer())

		if (showSuggestions)
			dispatch(searchActions.hideSuggestions())
	}

	return (
		<div className="BottomDrawerToggle">
			<button onClick={handleClick}>
				{bottomDrawerOpen ? <X /> : children}
			</button>
		</div>
	)
}

export default BottomDrawerToggle
