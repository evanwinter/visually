import React from "react"
import { useActions } from "hooks"
import { useSelector, useDispatch } from "react-redux"
import Utils from "core/utils"
import T from "types"

export const UpdateYAxis = () => {
	const dispatch = useDispatch()
	const { chart } = useSelector((state) => state)
	const { chartActions } = useActions()

	const handleYUnitsChange = (e) => {
		dispatch(chartActions.updateParams({ yUnits: e.target.value }))
	}

	const group = Utils.getGroupStr(chart.parameters.groupUnits)

	return (
		<select value={chart.parameters.yUnits} onChange={handleYUnitsChange}>
			<option value={T.FREQ_DISCRETE}>Number of uses</option>
			<option value={T.FREQ_PERCENT_GROUP}>
				Percent used relative to all words
			</option>
			<option value={T.FREQ_PERCENT_GROUP_WORDS}>
				Percent used relative to all visible words
			</option>
		</select>
	)
}

export const UpdateSortBy = () => {
	const dispatch = useDispatch()
	const { chart } = useSelector((state) => state)
	const { chartActions } = useActions()

	const handleSortByChange = (e) => {
		dispatch(chartActions.updateParams({ sortBy: e.target.value }))
	}

	return (
		<select value={chart.parameters.sortBy} onChange={handleSortByChange}>
			<option value={T.SORT_BY_TOP}>Most frequent</option>
			<option value={T.SORT_BY_BOTTOM}>Least frequent</option>
		</select>
	)
}
