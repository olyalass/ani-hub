import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { DispatchType } from '../../types'
import { requestAnimePageData } from '../../redux/slices/animePage/thunk'
import {
  ContentLoading,
  ContentEmpty,
  ContentError,
  CaseComponent,
  AnimeBigCard,
} from '../../components'
import { createGetIdAnimeUrl } from '../../utils'
import { useTypedSelector } from '../../hooks'

export function AnimeByIdPage() {
  const { id } = useParams()
  const dispatch: DispatchType = useDispatch()
  const data = useTypedSelector((state) => state.animePage.data)
  const isLoading = useTypedSelector((state) => state.animePage.isLoading)
  const isError = useTypedSelector((state) => state.animePage.isError)
  const isEmpty = useTypedSelector((state) => state.animePage.isEmpty)

  useEffect(() => {
    const url = createGetIdAnimeUrl(Number(id))
    dispatch(requestAnimePageData(url))
  }, [dispatch, id])

  return (
    <div className="random-container">
      <CaseComponent
        isError={isError}
        isSpinnerActive={isLoading}
        isEmpty={isEmpty}
        errorElement={<ContentError />}
        loadingElement={<ContentLoading />}
        emptyElement={<ContentEmpty type="byId" />}
      >
        {data && <AnimeBigCard data={data} />}
      </CaseComponent>
    </div>
  )
}
