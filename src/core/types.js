// General constant strings
const BY_YEAR = "byYear"
const BY_ALBUM = "byAlbum"
const FREQ_DISCRETE = "frequencyDiscrete"
const FREQ_PERCENT_GROUP = "frequencyPercentGroup"
const FREQ_PERCENT_GROUP_WORDS = "frequencyPercentGroupWords"

// Default chart params
const DEFAULT_NUM_WORDS = 10
const DEFAULT_SORT_BY = "top"
const DEFAULT_GROUP_UNITS = BY_YEAR
const DEFAULT_X_UNITS = ""
const DEFAULT_Y_UNITS = FREQ_DISCRETE
const DEFAULT_X_RANGE = [0, DEFAULT_NUM_WORDS - 1]
const DEFAULT_Y_RANGE = []

// Action types
const GET_CHART_BEGIN = "GET_CHART_BEGIN"
const GET_CHART_SUCCESS = "GET_CHART_SUCCESS"
const UPDATE_CHART_PARAMS = "UPDATE_CHART_PARAMS"
const UPDATE_CHART_DATA = "UPDATE_CHART_DATA"
const UPDATE_CHART_RESULTS = "UPDATE_CHART_RESULTS"

const GET_ANALYSIS_BEGIN = "GET_ANALYSIS_BEGIN"
const GET_ANALYSIS_SUCCESS = "GET_ANALYSIS_SUCCESS"
const GET_ARTIST_BEGIN = "GET_ARTIST_BEGIN"
const GET_ARTIST_SUCCESS = "GET_ARTIST_SUCCESS"
const GET_DISCOGRAPHY_BEGIN = "GET_DISCOGRAPHY_BEGIN"
const GET_DISCOGRAPHY_SUCCESS = "GET_DISCOGRAPHY_SUCCESS"

const HANDLE_QUERY_BEGIN = "HANDLE_QUERY_BEGIN"
const HANDLE_QUERY_SUCCESS = "HANDLE_QUERY_SUCCESS"
const HANDLE_QUERY_ERROR = "HANDLE_QUERY_ERROR"
const SHOW_SUGGESTIONS = "SHOW_SUGGESTIONS"
const HIDE_SUGGESTIONS = "HIDE_SUGGESTIONS"
const CHOOSE_SUGGESTION = "CHOOSE_SUGGESTION"

const GET_APP_DATA_BEGIN = "GET_APP_DATA_BEGIN"
const GET_APP_DATA_SUCCESS = "GET_APP_DATA_SUCCESS"
const TOGGLE_SEARCH = "TOGGLE_SEARCH"
const TOGGLE_MENU = "TOGGLE_MENU"

const SET_ARTIST = "SET_ARTIST"

const SET_SEARCH_STATE = "SET_SEARCH_STATE"

const SET_STEP = "SET_STEP"

const STEP_INITIAL = "STEP_INITIAL"
const STEP_LOADING = "STEP_LOADING"
const STEP_COMPLETED = "STEP_COMPLETED"

const STEP_FETCHING_ARTIST = "STEP_FETCHING_ARTIST"
const STEP_FETCHING_DISCOGRAPHY = "STEP_FETCHING_DISCOGRAPHY"
const STEP_GETTING_ANALYSIS = "STEP_GETTING_ANALYSIS"
const STEP_GETTING_CHART = "STEP_GETTING_CHART"

const Types = {
	BY_YEAR,
	BY_ALBUM,
	FREQ_DISCRETE,
	FREQ_PERCENT_GROUP,
	FREQ_PERCENT_GROUP_WORDS,
	DEFAULT_SORT_BY,
	DEFAULT_GROUP_UNITS,
	DEFAULT_X_UNITS,
	DEFAULT_X_RANGE,
	DEFAULT_Y_UNITS,
	DEFAULT_Y_RANGE,
	GET_CHART_BEGIN,
	GET_CHART_SUCCESS,
	UPDATE_CHART_PARAMS,
	UPDATE_CHART_DATA,
	UPDATE_CHART_RESULTS,
	GET_ANALYSIS_BEGIN,
	GET_ANALYSIS_SUCCESS,
	GET_ARTIST_BEGIN,
	GET_ARTIST_SUCCESS,
	GET_DISCOGRAPHY_BEGIN,
	GET_DISCOGRAPHY_SUCCESS,
	HANDLE_QUERY_BEGIN,
	HANDLE_QUERY_SUCCESS,
	HANDLE_QUERY_ERROR,
	SHOW_SUGGESTIONS,
	HIDE_SUGGESTIONS,
	CHOOSE_SUGGESTION,
	GET_APP_DATA_BEGIN,
	GET_APP_DATA_SUCCESS,
	TOGGLE_SEARCH,
	TOGGLE_MENU,
	SET_ARTIST,
	SET_STEP,
	STEP_INITIAL,
	STEP_LOADING,
	STEP_COMPLETED,
	STEP_FETCHING_ARTIST,
	STEP_FETCHING_DISCOGRAPHY,
	STEP_GETTING_ANALYSIS,
	STEP_GETTING_CHART,
	SET_SEARCH_STATE,
}

export default Types
