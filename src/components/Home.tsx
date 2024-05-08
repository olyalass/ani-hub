import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AnimeCard from './AnimeCard'
import { AnimeCardType, StateType, DispatchType } from '../types'
import { clearFilters } from '../redux/actionCreators'
import determineCardsAmountByViewport from '../utils/determineCardsAmountByViewport'
import requestAnimeData from '../redux/thunk/requestAnimeData'
import ContentError from './Errors/ContentError'
import ContentLoading from './Loadings/ContentLoading'
import getUrl from '../utils/getUrl'
import CaseComponent from './CaseComponent'
import ContentEmpty from './Errors/ContentEmpty'

const initialCardsAmount = determineCardsAmountByViewport()

function Home() {
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount)
  const dispatch: DispatchType = useDispatch()
  const cards = useSelector((state: StateType) => state.animeList)
  const filters = useSelector((state: StateType) => state.filters)
  const isLoading = useSelector((state: StateType) => state.isLoadingAnime)
  const isError = useSelector((state: StateType) => state.isAnimeError)
  const isEmpty = false

  useEffect(() => {
    function handleResize() {
      setCardsAmount(determineCardsAmountByViewport())
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      dispatch(clearFilters())
    }
  }, [dispatch])

  useEffect(() => {
    const url = getUrl('top', filters, cardsAmount)
    dispatch(requestAnimeData(url, 1, cardsAmount))
  }, [cardsAmount, dispatch, filters])

  return (
    <Flex wrap="wrap" justify="center" align="center" gap="middle">
      <CaseComponent
        isError={isError}
        isLoading={isLoading}
        isEmpty={isEmpty}
        errorElement={<ContentError />}
        loadingElement={<ContentLoading />}
        emptyElement={<ContentEmpty type="byFilters" />}
      >
        {cards.map((cardData: AnimeCardType) => {
          return <AnimeCard key={cardData.id} cardData={cardData} />
        })}
      </CaseComponent>
    </Flex>
  )
}

export default Home
