import React from "react"
import Main from "./Main"
import Menu from "./Menu"
import MenuToggle from "./MenuToggle"
import Toolbar from "./Toolbar"
import Chart from "./charts/Chart"
import Welcome from "./Welcome"
import SearchToggle from "./SearchToggle"

const App = () => {
	return (
		<div className="App">
			<Toggles />
			<Menu />
			<Main>
				<Welcome />
				<Toolbar />
				<Chart />
			</Main>
		</div>
	)
}

const Toggles = () => {
	return (
		<div className="Toggles">
			<MenuToggle />
			<SearchToggle />
		</div>
	)
}

export default App
