import { GenreType, GenresBaseResponseType } from '../../types'

const parseGenre = (fetchedGenre: GenresBaseResponseType): GenreType => ({
  label: fetchedGenre.name,
  key: fetchedGenre.mal_id,
})

export default parseGenre
