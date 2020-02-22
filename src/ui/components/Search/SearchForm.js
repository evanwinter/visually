import React, { useState, useEffect } from "react"
import { ArrowRight, X } from "react-feather"
import { useActions } from "hooks/index"
import { useDispatch, useSelector } from "react-redux"
import { useDebounce } from "hooks"

import Suggestions from "./Suggestions"

const SearchForm = () => {
	// State
	const [query, setQuery] = useState("")
	const { searchOpen } = useSelector((state) => state.app)
	const { showSuggestions, results } = useSelector((state) => state.search)

	// Actions
	const dispatch = useDispatch()
	const { appActions, searchActions } = useActions()

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

	const closeSearch = () => {
		dispatch(appActions.setSearchState(false))
	}

	const debouncedQuery = useDebounce(query, 500)

	useEffect(() => {
		if (debouncedQuery) {
			if (debouncedQuery.length > 3) {
				dispatch(searchActions.handleQuery(debouncedQuery.trim()))
			}
		}
	}, [debouncedQuery])

	// Output
	return (
		<div className="SearchForm" data-search-open={searchOpen}>
			<form onSubmit={handleSubmit}>
				<div className="form-wrapper">
					<div className="input-group">
						<input onChange={handleChange} type="text" value={query} />
						<button className="button">
							<ArrowRight />
						</button>
					</div>
					<div>
						<Suggestions results={results} />
					</div>
				</div>
			</form>
		</div>
	)
}

export default SearchForm
