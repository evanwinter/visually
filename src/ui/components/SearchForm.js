import React, { useState, useEffect } from "react"
import { ArrowRight } from "react-feather"
import { useActions } from "hooks/index"
import { useDispatch, useSelector } from "react-redux"
import { useDebounce } from "hooks"

const SearchForm = () => {
	// State
	const [query, setQuery] = useState("")
	const { searchOpen } = useSelector((state) => state.app)
	const { showSuggestions, results } = useSelector((state) => state.search)

	// Actions
	const dispatch = useDispatch()
	const { searchActions } = useActions()

	// Handlers
	const handleChange = (e) => {
		e.preventDefault()
		setQuery(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (query && query.trim()) {
			dispatch(searchActions.handleQuery(query))
		}
	}

	const handleConfirm = (e) => {
		// const
	}

	const debouncedQuery = useDebounce(query, 500)

	useEffect(() => {
		if (debouncedQuery) {
			if (debouncedQuery.length > 3) {
				console.log("handle query")
				dispatch(searchActions.handleQuery(debouncedQuery.trim()))
			}
		}
	}, [debouncedQuery])

	// Output
	return (
		<div className="SearchForm" data-search-open={searchOpen}>
			<form onSubmit={handleSubmit}>
				<div className="form-wrapper">
					<label>Look up an artist</label>
					<div className="input-group">
						<input onChange={handleChange} type="text" />
						<button className="button">
							<ArrowRight width={16} height={15} />
						</button>
					</div>
					<div onClick={handleConfirm}>
						<Suggestions results={results} />
					</div>
				</div>
			</form>
		</div>
	)
}

const Suggestions = ({ results }) => {
	const dispatch = useDispatch()
	const { appActions } = useActions()

	const artists = results ? Object.values(results) : undefined

	const handleClick = (e) => {
		const { artistId } = e.currentTarget.dataset
		const { artist } = results[artistId]
		console.log(artist)
		dispatch(appActions.startApp(artist))
	}

	return (
		<div className="Suggestions">
			<ul className="suggestions-list">
				{artists &&
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

export default SearchForm
