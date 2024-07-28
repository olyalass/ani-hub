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
import { requestRandomPageData } from '../../redux/slices/animePage/thunk'
//import { fetchAnimePageRequest } from '../../redux/slices'
import { useTypedSelector } from '../../hooks'

export function RandomAnimePage() {
  const dispatch: DispatchType = useDispatch()
  const isLoading = useTypedSelector((state) => state.animePage.isLoading)
  const isError = useTypedSelector((state) => state.animePage.isError)
  const isEmpty = useTypedSelector((state) => state.animePage.isEmpty)
  const data = useTypedSelector((state) => state.animePage.data)
  const isSpinnerActive = isLoading || !data

  useEffect(() => {
    dispatch(requestRandomPageData())

    // return () => {
    //   dispatch(fetchAnimePageRequest())
    // }
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
