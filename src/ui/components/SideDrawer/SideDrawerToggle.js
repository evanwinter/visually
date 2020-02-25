import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks"
import { X } from "react-feather"

const SideDrawerToggle = ({ children }) => {
	// State
	const { sideDrawerOpen } = useSelector((state) => state.app)

	// Actions
	const dispatch = useDispatch()
	const { appActions } = useActions()

	// Handlers
	const handleClick = () => {
		dispatch(appActions.toggleSideDrawer())
	}

	// Output
	return (
		<div className="SideDrawerToggle">
			<button onClick={handleClick}>{sideDrawerOpen ? <X /> : children}</button>
		</div>
	)
}

export default SideDrawerToggle
