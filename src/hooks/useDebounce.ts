import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T, delay = 300): T => {
  const [debouncedValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
