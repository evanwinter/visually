import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks"

const Suggestions = ({ results }) => {
	const dispatch = useDispatch()
	const { appActions, searchActions } = useActions()

	const { showSuggestions } = useSelector((state) => state.search)

	const artists = results ? Object.values(results) : undefined

	const handleClick = (e) => {
		const { artistId } = e.currentTarget.dataset
		const { artist } = results[artistId]
		dispatch(appActions.startApp(artist))
		dispatch(appActions.setSearchState(false))
		dispatch(searchActions.hideSuggestions())
	}

	return (
		<div className="Suggestions">
			<ul className="suggestions-list">
				{showSuggestions &&
					artists &&
					artists.map(({ artist }) => {
						return (
							<li
								key={artist.id}
								data-artist-id={artist.id}
								onClick={handleClick}>
								{artist.name}
							</li>
						)
					})}
			</ul>
		</div>
	)
}
export default Suggestions