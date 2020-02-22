import React from "react"
import Main from "./Main"
import Menu from "./Menu"
import TopMenu from "./TopMenu"
import Profile from "./Profile"
import Toggles from "./Toggles"
import SearchToggle from "./Search/SearchToggle"
import Toolbar from "./Toolbar"
import Chart from "./Chart"
import Welcome from "./Welcome"

const App = () => {
	return (
		<div className="App">
			<TopMenu />
			<Menu />
			<Main>
				<Toggles />
				<Profile />
				<Chart />
				<Welcome />
			</Main>
		</div>
	)
}

export default App
