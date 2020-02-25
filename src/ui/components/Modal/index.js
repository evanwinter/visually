import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks"

const Modal = ({ children, modalID }) => {
	const dispatch = useDispatch()
	const { appActions } = useActions()

	const appState = useSelector((state) => state.app)
	const { modalOpen, modalID: _modalID } = appState

	const handleMaskClick = () => {
		dispatch(appActions.closeModal())
	}

	return (
		<div
			className="Modal"
			data-modal-id={modalID}
			data-modal-open={_modalID === modalID}>
			<div className="Modal--mask" onClick={handleMaskClick}></div>
			<div className="Modal--container">
				<div className="Modal--content">{children}</div>
			</div>
		</div>
	)
}

export default Modal
