import React from "react"
import { useDispatch, useSelector } from "react-redux"

const BottomDrawer = ({ children }) => {
	const { bottomDrawerOpen } = useSelector((state) => state.app)

	return (
		<div className="BottomDrawer" data-show={bottomDrawerOpen}>
			{children}
		</div>
	)
}

export default BottomDrawer
