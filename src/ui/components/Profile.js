import React from "react"
import T from "types"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks"

const Profile = () => {
	const { app, artist } = useSelector((state) => state)
	const { step } = app

	return (
		<div className="Profile">
			<p>
				Exploring the discography of{" "}
				<span style={{ fontWeight: `600` }}>{artist.name}</span>
			</p>
		</div>
	)
}

export default Profile
