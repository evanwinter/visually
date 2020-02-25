import React from "react"
import SideDrawerToggle from "./SideDrawer/SideDrawerToggle"
import ModalToggle from "./Modal/ModalToggle"
import { Search as SearchIcon } from "react-feather"

const Toggles = () => {
	return (
		<div className="Toggles">
			<ModalToggle modalID="search">
				<SearchIcon />
			</ModalToggle>
		</div>
	)
}

export default Toggles
