import React from "react"
import Main from "./Main"
import Menu from "./Menu"
import Toggles from "./Toggles"
import Chart from "./charts/Chart"
import Welcome from "./Welcome"

const App = () => {
	return (
		<div className="App">
			<Toggles />
			<Menu />
			<Main>
				{/* <Welcome /> */}
				<Chart />
			</Main>
		</div>
	)
}

export default App
