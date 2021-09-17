import React, { useState, useEffect } from "react"
import { ArrowRight, X } from "react-feather"
import { useActions } from "hooks/index"
import { useDispatch, useSelector } from "react-redux"
import { useDebounce } from "hooks"

import ListSuggestions from "./ListSuggestions"

const SearchForm = () => {
  // State
  const [query, setQuery] = useState("")
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

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      if (debouncedQuery.length > 2) {
        dispatch(searchActions.handleQuery(debouncedQuery.trim()))
      }
    }
  }, [debouncedQuery])

  useEffect(() => {
    if (query === "") {
      dispatch(searchActions.clearSearchResults())
    }
  }, [query])

  // Output
  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <label>Enter an artist name here</label>
          <div className="input-group">
            <input onChange={handleChange} type="text" value={query} disabled />
            <button className="button" disabled>
              <ArrowRight />
            </button>
          </div>
          <small style={{ display: `block`, marginTop: `1rem` }}>
            Sorry, the Genius API is not playing nicely. But check out the
            sample data below!
          </small>
          <div>
            <ListSuggestions results={results} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
