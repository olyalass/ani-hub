import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { DispatchType, StateType } from '../../types'
import createGetAnimeUrl from '../../utils/createGetAnimeUrl'
import requestAnimePageData from '../../redux/thunk/requestAnimePageData'
import ContentLoading from '../Loadings/ContentLoading'
import ContentError from '../Errors/ContentError'
import AnimeBigCard from '../Content/AnimeBigCard'
import CaseComponent from '../ContentPieces/CaseComponent'
import ContentEmpty from '../Errors/ContentEmpty'

function AnimeByIdPage() {
  const params = useParams()
  const id = Number(params.id)
  const dispatch: DispatchType = useDispatch()
  const data = useSelector((state: StateType) => state.animePageData)
  const isLoading = useSelector((state: StateType) => state.isLoadingAnimePage)
  const isError = useSelector((state: StateType) => state.isAnimePageError)
  const isEmpty = useSelector((state: StateType) => state.isEmptyPage)

  useEffect(() => {
    const url = createGetAnimeUrl('byId', undefined, undefined, undefined, id)
    dispatch(requestAnimePageData(url))
  }, [dispatch, id])

  return (
    <div className="random-container">
      <CaseComponent
        isError={isError}
        isLoading={isLoading}
        isEmpty={isEmpty}
        errorElement={<ContentError />}
        loadingElement={<ContentLoading />}
        emptyElement={<ContentEmpty type="byId" />}
      >
        <AnimeBigCard data={data} />
      </CaseComponent>
    </div>
  )
}

export default AnimeByIdPage
