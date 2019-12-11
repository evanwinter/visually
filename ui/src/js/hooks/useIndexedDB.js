import { useState, useEffect } from "react"
import { get, set } from "idb-keyval"

export const useIndexedDB = (key, initialValue) => {
  const [storedValue, setValue] = useState(initialValue)

  useEffect(() => {
    const getValue = async () => {
      try {
        const value = await get(key)
        value ? setValue(value) : setValue(initialValue)
      } catch (error) {
        console.log(error)
      }
    }
    getValue()
  }, [])

  return [storedValue, setValue]
}
