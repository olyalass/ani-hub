import { Flex, Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Content } from 'antd/es/layout/layout'

import AnimeCard from '../ContentPieces/AnimeCard'
import { DispatchType, StateType } from '../../types'
import CaseComponent from '../ContentPieces/CaseComponent'
import ContentError from '../Errors/ContentError'
import ContentLoading from '../Loadings/ContentLoading'
import ContentEmpty from '../Errors/ContentEmpty'
import determineCardsAmountByViewport from '../../utils/determineCardsAmountByViewport'
import requestAnimeData from '../../redux/thunk/requestAnimeData'
import createAdvancedSearchAnimeUrl from '../../utils/urlCreators/createAdvancedSearchAnimeUrl'

const initialCardsAmount = determineCardsAmountByViewport()

function SearchContent() {
  const [currPage, setCurrPage] = useState(1)
  const [cardsAmount, setCardsAmount] = useState(initialCardsAmount)
  const filters = useSelector((state: StateType) => state.multiFilters)
  const totalPages = useSelector((state: StateType) => state.totalPages)
  const searchedAnimes = useSelector((state: StateType) => state.animeList)
  const q = useSelector((state: StateType) => state.q)
  const isError = useSelector((state: StateType) => state.isAnimeError)
  const isLoading = useSelector((state: StateType) => state.isLoadingAnime)
  const isEmpty = useSelector((state: StateType) => state.isAnimeListEmpty)
  const dispatch: DispatchType = useDispatch()
  const isSpinnerActive = isLoading || !searchedAnimes

  useEffect(() => {
    function handleResize() {
      const newCardsAmount = determineCardsAmountByViewport()
      setCurrPage(1)
      setCardsAmount(newCardsAmount)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dispatch])

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
