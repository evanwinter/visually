import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Utils from "core/utils"
import { ChevronDown } from "react-feather"
import { useActions } from "hooks"
import T from "types"
import { UpdateXRange, ShiftXRange } from "./XAxis"
import { UpdateYAxis } from "./YAxis"

const Toolbar = () => {
	const [open, setOpen] = useState(true)
	const handleToggle = (e) => {
		e.preventDefault()
		setOpen(!open)
	}

	const dispatch = useDispatch()
	const { chart } = useSelector((state) => state)
	const { chartActions } = useActions()

	const handleGroupUnitsChange = (e) => {
		dispatch(chartActions.updateParams({ groupUnits: e.target.value }))
	}

	const handleYUnitsChange = (e) => {
		dispatch(chartActions.updateParams({ yUnits: e.target.value }))
	}

	return (
		<div className="Toolbar" data-open={open}>
			<p>
				Toolbar{" "}
				<span className="Toolbar--toggle-icon" onClick={handleToggle}>
					<ChevronDown width={20} height={20} />
				</span>
			</p>
			{open && (
				<div className="Toolbar-main">
					<section>
						<div>
							<label>
								A line represents...
								<select
									value={chart.parameters.groupUnits}
									onChange={handleGroupUnitsChange}>
									<option value={T.BY_YEAR}>a year</option>
									<option value={T.BY_ALBUM}>an album</option>
								</select>
							</label>
						</div>
						<div>
							<label>
								Show word frequencies by...
								<UpdateYAxis />
							</label>
						</div>
					</section>
				</div>
			)}
		</div>
	)
}

export default Toolbar
