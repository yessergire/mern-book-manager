import { useState } from 'react'

export const useField = (type, init='') => {
  const [value, setValue] = useState(init)
  const onChange = (event) => setValue(event.target.value)
  const reset = () => setValue('')
  const field = {
    type,
    value,
    onChange
  }

  return {
    field,
    reset,
    setValue
  }
}
