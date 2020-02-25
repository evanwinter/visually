import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks/index"
import { X } from "react-feather"
import T from "types"

const ModalToggle = ({ children, modalID }) => {
	// State
	const { modalOpen, modalID: _modalID } = useSelector((state) => state.app)

	// Actions
	const dispatch = useDispatch()
	const { searchActions, appActions } = useActions()

	// Handlers
	const handleClick = (e) => {
		e.preventDefault()
		dispatch(appActions.toggleModal(modalID))
	}

	const thisModalIsOpen = () => {
		return modalOpen && modalID === _modalID
	}

	return (
		<div className="ModalToggle" data-modal-open={thisModalIsOpen()}>
			<button onClick={handleClick}>
				{thisModalIsOpen() ? <X /> : children}
			</button>
		</div>
	)
}

export default ModalToggle
