import React, { useState } from "react"

const Toolbar = () => {
	const [open, setOpen] = useState(false)
	const [xValue, setXValue] = useState(20)

	const handleToggle = (e) => {
		e.preventDefault()
		setOpen(!open)
	}

	const handleXChange = (e) => {
		setXValue(e.currentTarget.value)
  }
  
  const handleSubmit = (e) => {
    console.log(xValue)
  }

	return (
		<div className="Toolbar" data-open={open}>
			Toolbar
			<button onClick={handleToggle}>v</button>
			{open && (
				<div className="Toolbar-main">
					
          <div className="input-group">
						<label>Number of words</label>
						<div className="slidecontainer">
							<input
								type="range"
								min="1"
								max="100"
								value={xValue}
								className="slider"
								id="myRange"
								onChange={handleXChange}
							/>
						</div>
					</div>

          <button onClick={handleSubmit}>Submit</button>
				</div>
			)}
		</div>
	)
}

export default Toolbar
