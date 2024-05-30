import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import {
  ContentLoading,
  ContentEmpty,
  ContentError,
  CaseComponent,
  AnimeBigCard,
} from '../../components'
import { DispatchType } from '../../types'
import { requestRandomPageData } from '../../redux/thunk'
import { fetchAnimePageRequest } from '../../redux/thunk/thunkActionCreators'
import { useTypedSelector } from '../../hooks'

export function RandomAnimePage() {
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
