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
					<Suggestions suggestions={results} />
				</div>
			</form>
		</div>
	)
}

const Suggestions = ({ suggestions }) => {
	const dispatch = useDispatch()
	const { appActions } = useActions()

	const handleSubmit = (e) => {
		const { artist } = e.currentTarget.dataset
		dispatch(appActions.startApp(JSON.parse(artist)))
	}

	return (
		<div className="Suggestions">
			<ul className="suggestions-list">
				{suggestions &&
					suggestions.map((suggestion) => {
						const { artist } = suggestion[1]
						return (
							<li
								key={artist.id}
								data-artist={JSON.stringify(artist)}
								onClick={handleSubmit}>
								{artist.name}
							</li>
						)
					})}
			</ul>
		</div>
	)
}

export default SearchForm
