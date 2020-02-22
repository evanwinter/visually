import { useState, useEffect } from "react"
import { get } from "idb-keyval"

export const useIndexedDB = (key, initialValue) => {
	const [storedValue, setValue] = useState(initialValue)

	console.log(key)

	useEffect(() => {
		const getValue = async () => {
			try {
				const value = await get(key)
				console.log(value)
				value ? setValue(value) : setValue(initialValue)
			} catch (error) {
				console.log(error)
			}
		}
		getValue()
	}, [])

	return [storedValue, setValue]
}
