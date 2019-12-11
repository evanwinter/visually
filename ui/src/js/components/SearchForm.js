import React, { useState } from "react"
import { ArrowRight } from "react-feather"
import { useActions } from "../hooks/index"
import { useDispatch, useSelector } from "react-redux"

const SearchForm = () => {
	// State
	const [query, setQuery] = useState("")
	const { searchOpen } = useSelector((state) => state.app)

	// Actions
	const dispatch = useDispatch()
	const { searchActions } = useActions()

	// Handlers
	const handleChange = (e) => {
		setQuery(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (query && query.trim()) {
			dispatch(searchActions.handleQuery(query))
		}
	}

	// Output
	return (
		<div className="SearchForm" data-search-open={searchOpen}>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Look up an artist</label>
					<div className="input-group">
						<input onChange={handleChange} type="text" />
						<button className="button">
							<ArrowRight width={16} height={15} />
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default SearchForm
