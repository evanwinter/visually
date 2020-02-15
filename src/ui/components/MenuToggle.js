import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useActions } from "hooks"
import { Menu as MenuIcon, X } from "react-feather"

const MenuToggle = () => {
  // State
  const { menuOpen } = useSelector((state) => state.app)

  // Actions
  const dispatch = useDispatch()
  const { appActions } = useActions()

  // Handlers
  const handleClick = () => {
    dispatch(appActions.toggleMenu())
  }

  // Output
  return (
    <div className="MenuToggle">
      <button onClick={handleClick}>{menuOpen ? <X /> : <MenuIcon />}</button>
    </div>
  )
}

export default MenuToggle
