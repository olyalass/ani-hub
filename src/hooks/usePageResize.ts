import { useState, useEffect } from 'react'

import { determineCardsAmountByViewport } from '../utils'

const initialTotalCards = determineCardsAmountByViewport()

export function usePageResize(onResize: (totalCards: number) => void) {
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
