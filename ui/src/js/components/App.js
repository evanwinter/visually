import React from "react"
import Main from "./Main"
import Menu from "./Menu"
import MenuToggle from "./MenuToggle"
import Toolbar from "./Toolbar"
import Chart from "./charts/Chart"

const App = () => {
	return (
		<div className="App">
			<Menu />
			<MenuToggle />
			<Main>
				<Toolbar />
				<Chart />
			</Main>
		</div>
	)
}

export default App
