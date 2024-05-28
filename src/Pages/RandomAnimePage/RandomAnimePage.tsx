import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import AnimeBigCard from '../../components/AnimeBigCard'
import { DispatchType } from '../../types'
import requestRandomPageData from '../../redux/thunk/requestRandomPageData'
import ContentLoading from '../../components/Loadings/ContentLoading'
import ContentError from '../../components/Errors/ContentError'
import CaseComponent from '../../components/CaseComponent'
import { fetchAnimePageRequest } from '../../redux/thunk/thunkActionCreators'
import ContentEmpty from '../../components/Errors/ContentEmpty'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'

function RandomAnimePage() {
  const dispatch: DispatchType = useDispatch()
  const isLoading = useTypedSelector((state) => state.isLoadingAnimePage)
  const isError = useTypedSelector((state) => state.isAnimePageError)
  const isEmpty = useTypedSelector((state) => state.isEmptyPage)
  const data = useTypedSelector((state) => state.animePageData)
  const isSpinnerActive = isLoading || !data

  useEffect(() => {
    dispatch(requestRandomPageData())

    return () => {
      dispatch(fetchAnimePageRequest())
    }
  }, [dispatch])

  return (
    <div className="random-container">
      <CaseComponent
        isError={isError}
        isSpinnerActive={isSpinnerActive}
        isEmpty={isEmpty}
        errorElement={
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
        }
        loadingElement={<ContentLoading />}
        emptyElement={<ContentEmpty type="byId" />}
      >
        {data && <AnimeBigCard data={data} />}
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

export default RandomAnimePage
