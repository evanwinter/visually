import React from "react"
import { useSelector } from "react-redux"
import Main from "./Main"
import SideDrawer from "./SideDrawer"
import Profile from "./Profile"
import Toggles from "./Toggles"
import BottomDrawer from "./BottomDrawer"
import Toolbar from "./Toolbar"
import Chart from "./Chart"
import Welcome from "./Welcome"
import Search from "./Search"
import Modal from "./Modal"
import T from "types"

const App = () => {
	const { hasStarted, hasCompleted, isLoading } = useSelector(
		(state) => state.app,
	)

	const artistName = useSelector((state) => state.artist.name)

	const renderMain = () => {
		if (!hasStarted) {
			return <Welcome />
		}

		if (isLoading) {
			return <div>Getting data for {artistName}...</div>
		}

		if (hasCompleted) {
			return (
				<>
					<Profile />
					<Chart />
				</>
			)
		}

		return ""
	}

	return (
		<div className="App">
			{hasStarted && <Toggles />}

			<Main>{renderMain()}</Main>

			<Modal modalID="search">
				<Search />
			</Modal>
		</div>
	)
}

export default App
