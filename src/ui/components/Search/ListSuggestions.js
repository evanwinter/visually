import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks"

const ArtistSuggestions = ({ results }) => {
	const dispatch = useDispatch()
	const { appActions, searchActions } = useActions()

	const { showSuggestions } = useSelector((state) => state.search)

	const artists = results ? Object.values(results) : undefined

	const handleClick = (e) => {
		const { artistId } = e.currentTarget.dataset
		const { artist } = results[artistId]
		dispatch(appActions.startApp(artist))
		dispatch(appActions.closeModal())

		setTimeout(() => {
			dispatch(searchActions.hideSuggestions())
		}, 500)
	}

	return (
		<div className="ArtistSuggestions">
			{showSuggestions &&
				(!artists ? (
					<p>Loading...</p>
				) : (
					<ul className="suggestions-list">
						{artists.map(({ artist }) => {
							return (
								<li
									key={artist.id}
									data-artist-id={artist.id}
									onClick={handleClick}>
									<div
										style={{ background: `url(${artist.header_image_url}`, width: `100px`, height: `100px`, backgroundPosition: `center`, backgroundSize: `cover` }}></div>
									<span>{artist.name}</span>
								</li>
							)
						})}
					</ul>
				))}
		</div>
	)
}
export default ArtistSuggestions
