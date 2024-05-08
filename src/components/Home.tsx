import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AnimeCard from './AnimeCard'
import { AnimeCardType, StateType, DispatchType } from '../types'
import { clearFilters } from '../redux/actionCreators'
import determineCardsAmountByViewport from '../utils/determineCardsAmountByViewport'
import requestAnimeData from '../redux/thunk/requestAnimeData'
import AnimeError from './Errors/AnimeError'
import AnimeLoading from './Loadings/AnimeLoading'

function Home() {
  const [cardsAmount, setCardsAmount] = useState(
    determineCardsAmountByViewport(),
  )
  const dispatch: DispatchType = useDispatch()
  const cards = useSelector((state: StateType) => state.animeList)
  const filters = useSelector((state: StateType) => state.filters)
  const isLoading = useSelector((state: StateType) => state.isLoadingAnime)
  const isError = useSelector((state: StateType) => state.isAnimeError)

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
    let baseUrl = `https://corsproxy.io/?https://api.jikan.moe/v4/top/anime?limit=${cardsAmount}`
    let filterQuery = ''
    if (filters.genres[0]) {
      const genreQuery = `&genres=${filters.genres[0]}`
      filterQuery = genreQuery
      baseUrl = `https://corsproxy.io/?https://api.jikan.moe/v4/anime?order_by=popularity&limit=${cardsAmount}`
    }
    if (filters.rating[0]) {
      const ratingQuery = `&rating=${filters.rating[0]}`
      filterQuery = filterQuery + ratingQuery
    }
    const url = baseUrl + filterQuery
    dispatch(requestAnimeData(url, 1, cardsAmount))
  }, [cardsAmount, dispatch, filters])

  return (
    <Flex wrap="wrap" justify="center" align="center" gap="middle">
      {isLoading ? (
        <AnimeLoading />
      ) : isError ? (
        <AnimeError />
      ) : (
        cards.map((cardData: AnimeCardType) => {
          return <AnimeCard key={cardData.id} cardData={cardData} />
        })
      )}
    </Flex>
  )
}

export default Home
