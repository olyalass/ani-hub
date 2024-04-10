import { Flex } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

import AnimeCard from './Card'
import { AnimeCardType, StateType } from '../types'
import { clearFilters, updateAnimeList } from '../redux/actionCreators'
import parseAnimeResponseItem from '../api/parsers/parseAnimeResponseItem'
import determineCardsAmountByViewport from '../utils/determineCardsAmountByViewport'
import requestAnimeData from '../api/requests/requestAnimeData'
import requestDupesReplacement from '../api/requests/requestDupesReplacement'
import ThemeContext from '../shared/ThemeContext'

function Home() {
  const isLightTheme = useContext(ThemeContext)
  const [cardsAmount, setCardsAmount] = useState(14)
  const dispatch: Dispatch = useDispatch()
  const cards = useSelector((state: StateType) => state.animeList)
  const filters = useSelector((state: StateType) => state.filters)

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
    requestAnimeData(url)
      .then((data) => requestDupesReplacement(data, url, 1, cardsAmount))
      .then((data) =>
        dispatch(updateAnimeList(data.map(parseAnimeResponseItem))),
      )
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
