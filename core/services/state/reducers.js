import { combineReducers } from "redux"

const appInitialState = {
  isLoading: false,
  searchOpen: true,
  menuOpen: false,
}

export const app = (state = appInitialState, action) => {
  switch (action.type) {
    case "GET_APP_DATA_BEGIN":
      return {
        ...state,
        isLoading: true,
      }
    case "GET_APP_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
      }
    case "GET_APP_DATA_ERROR":
      return state
    case "TOGGLE_SEARCH":
      return {
        ...state,
        searchOpen: !state.searchOpen,
      }
    case "TOGGLE_MENU":
      return {
        ...state,
        menuOpen: !state.menuOpen,
      }
    default:
      return state
  }
}

const artistInitialState = {}

export const artist = (state = artistInitialState, action) => {
  switch (action.type) {
    case "SET_ARTIST":
      return { ...action.artist }
    default:
      return state
  }
}

const searchInitialState = {
  showSuggestions: false,
  results: null,
  isLoading: false,
}

export const search = (state = searchInitialState, action) => {
  switch (action.type) {
    case "HANDLE_QUERY_BEGIN":
      return {
        ...state,
        isLoading: true,
      }
    case "HANDLE_QUERY_SUCCESS":
      return {
        ...state,
        results: action.results,
        isLoading: false,
      }
    case "HANDLE_QUERY_ERROR":
      return state
    case "SHOW_SUGGESTIONS":
      return {
        ...state,
        showSuggestions: true,
      }
    case "HIDE_SUGGESTIONS":
      return {
        ...state,
        showSuggestions: false,
      }
    case "CHOOSE_SUGGESTION":
      return {
        ...state,
        showSuggestions: false,
      }
    default:
      return state
  }
}

const discographyInitialState = {
  songs: {},
  lyrics: {
    all: [],
    filtered: [],
  },
}

export const discography = (state = discographyInitialState, action) => {
  switch (action.type) {
    case "GET_DISCOGRAPHY_BEGIN":
      return state
    case "GET_DISCOGRAPHY_SUCCESS":
      return { ...action.discography }
    case "GET_DISCOGRAPHY_ERROR":
      return state
    default:
      return state
  }
}

const analysisInitialState = {}

export const analysis = (state = analysisInitialState, action) => {
  switch (action.type) {
    case "GET_ANALYSIS_BEGIN":
      return state
    case "GET_ANALYSIS_SUCCESS":
      return { ...action.analysis }
    case "GET_ANALYSIS_ERROR":
      return state
    default:
      return state
  }
}

const chartInitialState = {
  data: null, // data formatted for a chart
}

export const chart = (state = chartInitialState, action) => {
  switch (action.type) {
    case "GET_CHART_BEGIN":
      return state
    case "GET_CHART_SUCCESS":
      return { ...action.chart }
    case "GET_CHART_ERROR":
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  analysis,
  artist,
  app,
  chart,
  discography,
  search,
})

export default rootReducer
