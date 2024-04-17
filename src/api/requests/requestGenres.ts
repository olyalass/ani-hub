import { GenresBaseResponseType } from '../../types'

async function requestGenres() {
  const genres: { data: GenresBaseResponseType[] } = await fetch(
    'https://corsproxy.io/?https://api.jikan.moe/v4/genres/anime',
  ).then((response) => (response.ok ? response.json() : []))
  return genres.data
}

export default requestGenres
