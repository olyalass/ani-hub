import { Flex, Pagination } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import {
  ContentLoading,
  ContentEmpty,
  ContentError,
  CaseComponent,
  AnimeCard,
} from '../../components'
import { DispatchType } from '../../types'
import { determineCardsAmountByViewport } from '../../utils'
import { usePageResize, useTypedSelector } from '../../hooks'
import { requestSearchCardsData } from '../../redux/slices'

const initialCardsAmount = determineCardsAmountByViewport()

function setPageNumToFilters(
  page: number,
  filters: string | undefined,
): string {
  if (filters) {
    const startIndex = filters.indexOf('page=')
    if (startIndex >= 0) {
      const lastIndex = filters.indexOf('&', startIndex)
      if (lastIndex > startIndex + 5) {
        return (
          filters.substring(0, startIndex + 5) +
          page +
          filters.substring(lastIndex)
        )
      } else {
        return filters.substring(0, startIndex + 5) + page
      }
    } else {
      return filters + '&page=' + page
    }
  } else return 'page=' + page
}

function SearchContent() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const queryString = searchParams.toString()
  const page = searchParams.get('page')
  const navigate = useNavigate()
  const [currPage, setCurrPage] = useState(Number(page))
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount)

  const totalPages = useTypedSelector((state) => state.searchCards.totalPages)
  const searchedAnimes = useTypedSelector((state) => state.searchCards.data)
  const isError = useTypedSelector((state) => state.searchCards.isError)
  const isLoading = useTypedSelector((state) => state.searchCards.isLoading)
  const isEmpty = useTypedSelector((state) => state.searchCards.isEmpty)
  const dispatch: DispatchType = useDispatch()
  const isSpinnerActive = isLoading || !searchedAnimes

  const onResize = useCallback((totalCards: number) => {
    setCardsAmount(totalCards)
    setCurrPage(1)
  }, [])

  usePageResize(onResize)

  useEffect(() => {
    dispatch(requestSearchCardsData(cardsAmount, currPage, queryString))
  }, [dispatch, currPage, queryString, cardsAmount])

  useEffect(() => {
    setCurrPage(Number(page) ? Number(page) : 1)
  }, [page])

  return (
    <Content className="content-container">
      <Flex
        vertical={true}
        justify="center"
        align="center"
        gap="middle"
        style={{ width: 'fit-content' }}
      >
        <CaseComponent
          isError={isError}
          isSpinnerActive={isSpinnerActive}
          isEmpty={isEmpty}
          errorElement={<ContentError />}
          loadingElement={<ContentLoading />}
          emptyElement={<ContentEmpty type="byFilters" />}
        >
          {searchedAnimes && (
            <div className="content-wrap">
              {searchedAnimes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  cardData={anime}
                  isDeletable={false}
                />
              ))}
            </div>
          )}
          <Pagination
            showSizeChanger={false}
            current={currPage}
            onChange={(value) => {
              setCurrPage(value)
              navigate('/search?' + setPageNumToFilters(value, queryString))
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
