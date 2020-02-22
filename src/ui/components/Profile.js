import React from "react"
import T from "types"
import { useSelector } from "react-redux"

const Profile = () => {
	const { app, artist, discography, analysis } = useSelector((state) => state)
	const { step } = app

	if (step === T.STEP_INITIAL) {
		return ""
	}

	return (
		<div className="Profile">
			<p>
				Currently exploring the discography of <span>{artist.name}</span>
			</p>

			<p>
				{step === T.STEP_LOADING ? "Loading discography..." : ""}
			</p>

			{step === T.STEP_COMPLETED ? (
				<p className="small">
					Indexed {Object.keys(discography.songs).length} songs
				</p>
			) : ""}

			{/* <div className="discography">
				{discography && (
					<>
						<div>{Object.keys(discography.songs).length} total songs</div>
						<div>{discography.lyrics.length} total words</div>
					</>
				)}
			</div>
			<div className="analysis">
				{analysis && (
					<>
						<div>
							{Object.keys(analysis.byAlbum.frequencies).length} total albums
						</div>
					</>
				)}
			</div> */}
		</div>
	)
}

export default Profile
