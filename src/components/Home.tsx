import { Flex } from 'antd'
import AnimeCard from './Card'
import { useCallback, useEffect, useState } from 'react'
import { FetchedDBType, AnimeCardType, StateType } from '../types'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { updateAnimeList } from '../redux/actionCreators'
import { useSelector } from 'react-redux'

function getCardsAmount() {
  const width = window.innerWidth
  if (width > 1735) {
    return 14
  } else if (width > 1519) {
    return 12
  } else if (width > 1303) {
    return 10
  } else if (width > 1087) {
    return 8
  } else if (width > 871) {
    return 6
  } else {
    return 4
  }
}

function Home({ isLightTheme }: { isLightTheme: boolean }) {
  const [cardsAmount, setCardsAmount] = useState(14)
  const dispatch: Dispatch = useDispatch()
  const cards = useSelector((state: StateType) => state.animeList)

  const updateAnimes = useCallback(
    (newList: AnimeCardType[]) => {
      dispatch(updateAnimeList(newList))
    },
    [dispatch],
  )

  useEffect(() => {
    function handleResize() {
      setCardsAmount(getCardsAmount())
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const url = `https://corsproxy.io/?https://api.jikan.moe/v4/top/anime?limit=${cardsAmount}&sfw`

    fetch(url)
      .then((response) => (response.ok ? response.json() : []))
      .then((data: { data: FetchedDBType[] }) => {
        const mappedData: AnimeCardType[] = data.data.map(
          (item: FetchedDBType) => {
            return {
              titleEnglish: item.title_english,
              id: item.mal_id,
              titleOrig: item.title,
              genres: item.genres.map(
                (genre: { name: string; mal_id: number }) => {
                  return { name: genre.name, id: genre.mal_id }
                },
              ),
              img: item.images.jpg.image_url,
              rating: item.rating,
            }
          },
        )
        updateAnimes(mappedData)
      })
  }, [cardsAmount, updateAnimes])

  return (
    <Flex wrap="wrap" justify="space-between" align="center" gap="middle">
      {cards.map((cardData: AnimeCardType) => {
        return <AnimeCard cardData={cardData} isLightTheme={isLightTheme} />
      })}
    </Flex>
  )
}

export default Home
