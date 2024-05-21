import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { DispatchType, StateType } from '../../types'
import requestAnimePageData from '../../redux/thunk/requestAnimePageData'
import ContentLoading from '../Loadings/ContentLoading'
import ContentError from '../Errors/ContentError'
import AnimeBigCard from '../Content/AnimeBigCard'
import CaseComponent from '../ContentPieces/CaseComponent'
import ContentEmpty from '../Errors/ContentEmpty'
import createGetIdAnimeUrl from '../../utils/urlCreators/createGetIdAnimeUrl'

function AnimeByIdPage() {
  const params = useParams()
  const dispatch: DispatchType = useDispatch()
  const data = useSelector((state: StateType) => state.animePageData)
  const isLoading = useSelector((state: StateType) => state.isLoadingAnimePage)
  const isError = useSelector((state: StateType) => state.isAnimePageError)
  const isEmpty = useSelector((state: StateType) => state.isEmptyPage)
  const isSpinnerActive = isLoading || !data
  const id = Number(params.id)

  useEffect(() => {
    const url = createGetIdAnimeUrl(id)
    dispatch(requestAnimePageData(url))
  }, [dispatch, id])

  return (
    <div className="random-container">
      <CaseComponent
        isError={isError}
        isSpinnerActive={isSpinnerActive}
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
