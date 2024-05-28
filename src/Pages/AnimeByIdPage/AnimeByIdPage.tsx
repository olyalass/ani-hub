import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { DispatchType } from '../../types'
import requestAnimePageData from '../../redux/thunk/requestAnimePageData'
import ContentLoading from '../../components/Loadings/ContentLoading'
import ContentError from '../../components/Errors/ContentError'
import AnimeBigCard from '../../components/AnimeBigCard'
import CaseComponent from '../../components/CaseComponent'
import ContentEmpty from '../../components/Errors/ContentEmpty'
import createGetIdAnimeUrl from '../../utils/urlCreators/createGetIdAnimeUrl'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'

function AnimeByIdPage() {
  const params = useParams()
  const dispatch: DispatchType = useDispatch()
  const data = useTypedSelector((state) => state.animePageData)
  const isLoading = useTypedSelector((state) => state.isLoadingAnimePage)
  const isError = useTypedSelector((state) => state.isAnimePageError)
  const isEmpty = useTypedSelector((state) => state.isEmptyPage)
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
        {data && <AnimeBigCard data={data} />}
      </CaseComponent>
    </div>
  )
}

export default AnimeByIdPage
