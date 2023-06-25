import { useEffect, useRef } from 'react'

export const useOutsideClick = (handler, listenCapturing = true) => {
  const ref = useRef(null)

  // Close the modal window when the user clicks outside of it
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener('click', handleClick, listenCapturing)

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing)
    }
  }, [handler, listenCapturing])

  return ref
}
