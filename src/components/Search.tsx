import { Flex } from 'antd'
import { useSelector } from 'react-redux'

import AnimeCard from './AnimeCard'
import { AnimeCardType, StateType } from '../types'
import CaseComponent from './CaseComponent'
import ContentError from './Errors/ContentError'
import ContentLoading from './Loadings/ContentLoading'
import ContentEmpty from './Errors/ContentEmpty'

function Search() {
  const searchedAnimes: AnimeCardType[] = []
  const isError = useSelector((state: StateType) => state.isAnimeError)
  const isLoading = useSelector((state: StateType) => state.isLoadingAnime)
  const isEmpty = false

  return (
    <Flex>
      <CaseComponent
        isError={isError}
        isLoading={isLoading}
        isEmpty={isEmpty}
        errorElement={<ContentError />}
        loadingElement={<ContentLoading />}
        emptyElement={<ContentEmpty type="byFilters" />}
      >
        {searchedAnimes.map((anime) => (
          <AnimeCard key={anime.id} cardData={anime} />
        ))}
      </CaseComponent>
    </Flex>
  )
}

export default Search
