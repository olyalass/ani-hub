import { useState, useEffect } from 'react'

import determineCardsAmountByViewport from '../determineCardsAmountByViewport'

const initialTotalCards = determineCardsAmountByViewport()

function usePageResize(onResize: (totalCards: number) => void) {
  const [totalCards, setTotalCards] = useState(initialTotalCards)
  useEffect(() => {
    function handleResize() {
      const newTotalCards = determineCardsAmountByViewport()
      setTotalCards(newTotalCards)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    onResize(totalCards)
  }, [totalCards, onResize])
}

export default usePageResize
