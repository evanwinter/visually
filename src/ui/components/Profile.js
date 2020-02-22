import React from "react"
import T from "types"
import { useDispatch, useSelector } from "react-redux"
import { X } from "react-feather"
import { useActions } from "hooks"

const Profile = () => {
	const dispatch = useDispatch()
	const { app, artist, discography, analysis } = useSelector((state) => state)
	const { step } = app
	const { appActions } = useActions()

	if (step === T.STEP_INITIAL) {
		return ""
	}

	return (
		<div className="Profile">
			<p>
				Currently exploring the discography of{" "}
				<span style={{ fontWeight: `600` }}>{artist.name}</span>{" "}
			</p>

			{step === T.STEP_LOADING ? <p>Loading discography...</p> : ""}

			{step === T.STEP_COMPLETED ? (
				<p className="small">
					Indexed {Object.keys(discography.songs).length} songs
				</p>
			) : (
				""
			)}
		</div>
	)
}

export default Profile
