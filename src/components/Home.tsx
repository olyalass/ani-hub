import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

import AnimeCard from './Card'
import { AnimeCardType, StateType } from '../types'
import { clearFilters, updateAnimeList } from '../redux/actionCreators'
import reorganizeFetchedAnimes from '../utils/reorganizeFetchedAnimes'
import getCardsAmount from '../utils/getCardsAmount'
import fetchData from '../utils/fetchData'
import replaceDupes from '../utils/replaceDupes'

function Home({ isLightTheme }: { isLightTheme: boolean }) {
  const [cardsAmount, setCardsAmount] = useState(14)
  const dispatch: Dispatch = useDispatch()
  const cards = useSelector((state: StateType) => state.animeList)
  const filters = useSelector((state: StateType) => state.filters)

  useEffect(() => {
    function handleResize() {
      setCardsAmount(getCardsAmount())
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
    fetchData(url)
      .then((data) => replaceDupes(data, url, 1, cardsAmount))
      .then((data) => reorganizeFetchedAnimes(data))
      .then((data) => dispatch(updateAnimeList(data)))
  }, [cardsAmount, dispatch, filters])

  return (
    <Flex wrap="wrap" justify="space-between" align="center" gap="middle">
      {cards.map((cardData: AnimeCardType) => {
        return (
          <AnimeCard
            key={cardData.id}
            cardData={cardData}
            isLightTheme={isLightTheme}
          />
        )
      })}
    </Flex>
  )
}

export default Home
