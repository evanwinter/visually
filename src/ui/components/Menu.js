import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks/index"
import Dashboard from "./Dashboard"

const Menu = () => {
	const dispatch = useDispatch()
	const { appActions } = useActions()

	const appState = useSelector((state) => state.app)
	const { menuOpen } = appState

	const handleMaskClick = () => {
		dispatch(appActions.toggleMenu())
	}

	useEffect(() => {
		if (menuOpen) document.querySelector(".SearchForm input").focus()
	}, [menuOpen])

	return (
		<div className="Menu" data-menu-open={menuOpen}>
			<div className="Menu--mask" onClick={handleMaskClick}></div>
			<div className="Menu--layers">
				<div className="Menu--layer"></div>
				<div className="Menu--layer"></div>
				<div className="Menu--layer">
					<div className="Menu--content">
						<div className="Menu--top">
							<Dashboard />
						</div>
						{/* <div className="Menu--footer">
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

export default Menu
