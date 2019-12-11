import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useActions } from "../hooks/index"

const SearchResults = () => {
  // State
  const { showSuggestions, results } = useSelector((state) => state.search)

  // Actions
  const dispatch = useDispatch()
  const { appActions, searchActions } = useActions()

  // Handlers
  const handleClick = (e) => {
    const { artistData } = e.currentTarget.dataset
    const artist = JSON.parse(artistData)
    dispatch(searchActions.hideSuggestions())
    dispatch(appActions.startApp(artist))
  }

  // Output
  return (
    <div className="SearchResults" data-show-suggestions={showSuggestions}>
      {showSuggestions &&
        results.map((result) => {
          const { artist } = result[1]
          return (
            <div
              className="Suggestion"
              onClick={handleClick}
              data-artist-data={JSON.stringify(artist)}
              key={artist.id}
            >
              <div className="Suggestion--image">
                <img src={artist.image_url} />
              </div>
              <p className="Suggestion--name">{artist.name}</p>
            </div>
          )
        })}
    </div>
  )
}

export default SearchResults
