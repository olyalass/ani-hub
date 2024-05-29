import { GenreType, GenresBaseResponseType } from '../../types'

export const parseGenre = (
  fetchedGenre: GenresBaseResponseType,
): GenreType => ({
  label: fetchedGenre.name,
  key: fetchedGenre.mal_id,
})
