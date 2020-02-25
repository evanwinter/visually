import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks"

const SideDrawer = () => {
	const dispatch = useDispatch()
	const { appActions } = useActions()

	const appState = useSelector((state) => state.app)
	const { sideDrawerOpen } = appState

	const handleMaskClick = () => {
		dispatch(appActions.closeSideDrawer())
	}

	return (
		<div className="SideDrawer" data-drawer-open={sideDrawerOpen}>
			<div className="SideDrawer--mask" onClick={handleMaskClick}></div>
			<div className="SideDrawer--layers">
				<div className="SideDrawer--layer"></div>
				<div className="SideDrawer--layer"></div>
				<div className="SideDrawer--layer">
					<div className="SideDrawer--content">
						<div className="SideDrawer--top"></div>
						{/* <div className="SideDrawer--footer">
              <small>
                created by{" "}
                <a href="https://github.com/evanwinter">@evanwinter</a>
              </small>
            </div> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SideDrawer
