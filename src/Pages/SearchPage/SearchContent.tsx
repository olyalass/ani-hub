import { Flex, Pagination } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

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

function getPageFromFilters(filters: string | undefined): number {
  if (filters && filters.includes('page=')) {
    const startIndex = filters.indexOf('page=') + 5
    const lastIndex = filters.indexOf('&', startIndex)
    let pageNum

    if (lastIndex > startIndex) {
      pageNum = Number(filters.substring(startIndex, lastIndex))
    } else {
      pageNum = Number(filters.substring(startIndex))
    }

    return pageNum ? pageNum : 1
  }
  return 1
}

function SearchContent() {
  const { filters } = useParams()
  const navigate = useNavigate()
  const [currPage, setCurrPage] = useState(getPageFromFilters(filters))
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
    dispatch(requestSearchCardsData(cardsAmount, currPage, filters))
  }, [dispatch, currPage, filters, cardsAmount])

  useEffect(() => {
    setCurrPage(getPageFromFilters(filters))
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
                <AnimeCard
                  key={anime.id}
                  cardData={anime}
                  isDeletable={false}
                />
              ))}
            </Flex>
          )}
          <Pagination
            showSizeChanger={false}
            current={currPage}
            onChange={(value) => {
              setCurrPage(value)
              navigate('/search/' + setPageNumToFilters(value, filters))
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
