import { Flex, Pagination } from 'antd'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'

import {
  ContentLoading,
  ContentEmpty,
  ContentError,
  CaseComponent,
  AnimeCard,
} from '../../components'
import { DispatchType } from '../../types'
import {
  determineCardsAmountByViewport,
  createAdvancedSearchAnimeUrl,
} from '../../utils'
import { requestAnimeData } from '../../redux/thunk'
import { usePageResize, useTypedSelector } from '../../hooks'

const initialCardsAmount = determineCardsAmountByViewport()

function SearchContent() {
  const [currPage, setCurrPage] = useState(1)
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount)
  const filters = useTypedSelector((state) => state.multiFilters)
  const totalPages = useTypedSelector((state) => state.totalPages)
  const searchedAnimes = useTypedSelector((state) => state.animeList)
  const q = useTypedSelector((state) => state.q)
  const isError = useTypedSelector((state) => state.isAnimeError)
  const isLoading = useTypedSelector((state) => state.isLoadingAnime)
  const isEmpty = useTypedSelector((state) => state.isAnimeListEmpty)
  const dispatch: DispatchType = useDispatch()
  const isSpinnerActive = isLoading || !searchedAnimes

  const onResize = useCallback((totalCards: number) => {
    setCardsAmount(totalCards)
    setCurrPage(1)
  }, [])

  usePageResize(onResize)

  useEffect(() => {
    const url = createAdvancedSearchAnimeUrl(filters, cardsAmount, currPage)
    dispatch(requestAnimeData(url, currPage, cardsAmount))
  }, [dispatch, currPage, q, filters, cardsAmount])

  useEffect(() => {
    setCurrPage(1)
  }, [filters])

  return (
    <Content className="content-container">
      <Flex vertical={true} justify="center" align="center" gap="middle">
        <CaseComponent
          isError={isError}
          isSpinnerActive={isSpinnerActive}
          isEmpty={isEmpty}
          errorElement={<ContentError />}
          loadingElement={<ContentLoading />}
          emptyElement={<ContentEmpty type="byFilters" />}
        >
          {searchedAnimes && (
            <Flex wrap="wrap" justify="center" align="center" gap="middle">
              {searchedAnimes.map((anime) => (
                <AnimeCard key={anime.id} cardData={anime} />
              ))}
            </Flex>
          )}
          <Pagination
            showSizeChanger={false}
            current={currPage}
            onChange={(value) => {
              setCurrPage(value)
            }}
            total={totalPages * cardsAmount}
            pageSize={cardsAmount}
            hideOnSinglePage={true}
          ></Pagination>
        </CaseComponent>
      </Flex>
    </Content>
  )
}

export default SearchContent
