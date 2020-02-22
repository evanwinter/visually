import React from "react"
import Search from "./Search"
import { useDispatch, useSelector } from "react-redux"
import T from "types"

const TopMenu = () => {
	const { searchOpen, step } = useSelector((state) => state.app)

	if (step === T.STEP_INITIAL) {
		return ""
	}

	return (
		<div className="TopMenu" data-show={searchOpen}>
			<Search />
		</div>
	)
}

export default TopMenu
