import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Utils from "core/utils"
import { Settings as SettingsIcon } from "react-feather"
import { useActions } from "hooks"
import T from "types"
import { UpdateXRange, ShiftXRange, CurrentRange } from "./XAxis"
import { UpdateYAxis, UpdateSortBy } from "./YAxis"
import Modal from "./Modal"

const Toolbar = () => {
	const handleToggle = (e) => {
		e.preventDefault()
		dispatch(appActions.openModal("toolbar"))
	}

	const dispatch = useDispatch()
	const { chart } = useSelector((state) => state)
	const { appActions, chartActions } = useActions()

	const handleGroupUnitsChange = (e) => {
		dispatch(chartActions.updateParams({ groupUnits: e.target.value }))
	}

	const handleYUnitsChange = (e) => {
		dispatch(chartActions.updateParams({ yUnits: e.target.value }))
	}

	return (
		<div className="Toolbar">
			<div className="Toolbar--toggle" onClick={handleToggle}>
				<span className="Toolbar--toggle-label">Chart Options</span>
				<span className="Toolbar--toggle-icon">
					<SettingsIcon width={18} height={16} />
				</span>
			</div>
			<Modal modalID="toolbar">
				<div className="Toolbar--main">
					<section>
						
						<h3>General</h3>

						<div className="Toolbar--dropdown">
							<label>
								A line represents...
								<select
									value={chart.parameters.groupUnits}
									onChange={handleGroupUnitsChange}>
									<option value={T.BY_YEAR}>a year</option>
									<option value={T.BY_ALBUM}>an album</option>
									<option value={T.ALL_TIME}>all time</option>
								</select>
							</label>
						</div>
						<hr />

						<h3>Y Axis</h3>

						<div className="Toolbar--dropdown">
							<label>
								Show word frequencies by...
								<UpdateYAxis />
							</label>
						</div>

						<div className="Toolbar--dropdown">
							<label>
								Sort by...
								<UpdateSortBy />
							</label>
						</div>

						<hr />

						<h3>X Axis</h3>

						<CurrentRange />

						<div>
							<ShiftXRange />
							<UpdateXRange />
						</div>
					</section>
				</div>
			</Modal>
		</div>
	)
}

export default Toolbar
