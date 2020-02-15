import React from "react"
import Main from "./Main"
import Menu from "./Menu"
import MenuToggle from "./MenuToggle"
import Toolbar from "./Toolbar"
import Chart from "./charts/Chart"
import Welcome from "./Welcome"

const App = () => {
	return (
		<div className="App">
			<Menu />
			<MenuToggle />
			<Main>
				<Welcome />

				<Toolbar />
				<Chart />
			</Main>
		</div>
	)
}

export default App
