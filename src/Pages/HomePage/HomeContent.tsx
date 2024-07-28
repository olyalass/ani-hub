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
import { determineCardsAmountByViewport } from '../../utils'
import { requestHomeCardsData } from '../../redux/slices/homeCards/thunk'
import { usePageResize, useTypedSelector } from '../../hooks'

const initialCardsAmount = determineCardsAmountByViewport()

function HomeContent() {
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount)
  const dispatch: DispatchType = useDispatch()
  const cards = useTypedSelector((state) => state.homeCards.data)
  const filters = useTypedSelector((state) => state.homeCards.filters)
  const isLoading = useTypedSelector((state) => state.homeCards.isLoading)
  const isError = useTypedSelector((state) => state.homeCards.isError)
  const isSpinnerActive = isLoading || !cards
  const isEmpty = false

  const onResize = useCallback(
    (totalPages: number) => setCardsAmount(totalPages),
    [],
  )
  usePageResize(onResize)

  useEffect(() => {
    dispatch(requestHomeCardsData(filters, 1, cardsAmount))
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
              return (
                <AnimeCard
                  key={cardData.id}
                  cardData={cardData}
                  isDeletable={false}
                />
              )
            })}
        </CaseComponent>
      </Flex>
    </Content>
  )
}

export default HomeContent
