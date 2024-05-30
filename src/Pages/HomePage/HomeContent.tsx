import { Flex } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  ContentLoading,
  ContentEmpty,
  ContentError,
  CaseComponent,
  AnimeCard,
} from '../../components'
import { AnimeCardType, DispatchType } from '../../types'
import { clearFilters } from '../../redux/actionCreators'
import {
  determineCardsAmountByViewport,
  createGetTopAnimeUrl,
} from '../../utils'
import { requestAnimeData } from '../../redux/thunk'
import { usePageResize, useTypedSelector } from '../../hooks'

const initialCardsAmount = determineCardsAmountByViewport()

function HomeContent() {
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount)
  const dispatch: DispatchType = useDispatch()
  const cards = useTypedSelector((state) => state.animeList)
  const filters = useTypedSelector((state) => state.monoFilter)
  const isLoading = useTypedSelector((state) => state.isLoadingAnime)
  const isError = useTypedSelector((state) => state.isAnimeError)
  const isSpinnerActive = isLoading || !cards
  const isEmpty = false

  const onResize = useCallback(
    (totalPages: number) => setCardsAmount(totalPages),
    [],
  )
  usePageResize(onResize)

  useEffect(() => {
    return () => {
      dispatch(clearFilters())
    }
  }, [dispatch])

  useEffect(() => {
    const url = createGetTopAnimeUrl(filters, cardsAmount)
    dispatch(requestAnimeData(url, 1, cardsAmount))
  }, [cardsAmount, dispatch, filters])

  return (
    <Content className="content-container">
      <Flex wrap="wrap" justify="center" align="center" gap="middle">
        <CaseComponent
          isError={isError}
          isSpinnerActive={isSpinnerActive}
          isEmpty={isEmpty}
          errorElement={<ContentError />}
          loadingElement={<ContentLoading />}
          emptyElement={<ContentEmpty type="byFilters" />}
        >
          {cards &&
            cards.map((cardData: AnimeCardType) => {
              return <AnimeCard key={cardData.id} cardData={cardData} />
            })}
        </CaseComponent>
      </Flex>
    </Content>
  )
}

export default HomeContent
