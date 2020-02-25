import React from "react"
import { useDispatch } from "react-redux"
import { useActions } from "hooks"

const UseSampleData = () => {
	const dispatch = useDispatch()
	const { appActions } = useActions()

	const handleClick = () => {
		dispatch(appActions.useSampleData())
	}

	return (
		<div className="UseSampleData">
			<button className="button subtle" onClick={handleClick}>Use sample data</button>
		</div>
	)
}

export default UseSampleData
