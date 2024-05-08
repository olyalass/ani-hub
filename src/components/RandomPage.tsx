import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import AnimeBigCard from './AnimeBigCard'
import { AnimePageDataType, DispatchType } from '../types'
import { StateType } from '../types'
import requestRandomPageData from '../redux/thunk/requestRandomPageData'
import ContentLoading from './Loadings/ContentLoading'
import ContentError from './Errors/ContentError'
import CaseComponent from './CaseComponent'
import { fetchAnimePageRequest } from '../redux/actionCreators'
import ContentEmpty from './Errors/ContentEmpty'

function RandomPage() {
  const dispatch: DispatchType = useDispatch()
  const isLoading = useSelector((state: StateType) => state.isLoadingAnimePage)
  const isError = useSelector((state: StateType) => state.isAnimePageError)
  const isEmpty = useSelector((state: StateType) => state.isEmptyPage)
  useEffect(() => {
    dispatch(requestRandomPageData())

    return () => {
      dispatch(fetchAnimePageRequest())
    }
  }, [dispatch])

  const data: AnimePageDataType = useSelector(
    (state: StateType) => state.animePageData,
  )

  const errorElement = (
    <ContentError>
      <Button
        className="random-button"
        onClick={() => {
          dispatch(requestRandomPageData())
        }}
      >
        Try again
      </Button>
    </ContentError>
  )

  return (
    <div className="random-container">
      <CaseComponent
        isError={isError}
        isLoading={isLoading}
        isEmpty={isEmpty}
        errorElement={errorElement}
        loadingElement={<ContentLoading />}
        emptyElement={<ContentEmpty type="byId" />}
      >
        <AnimeBigCard data={data} />
        <Button
          className="random-button"
          onClick={() => {
            dispatch(requestRandomPageData())
          }}
        >
          Try again
        </Button>
      </CaseComponent>
    </div>
  )
}

export default RandomPage
