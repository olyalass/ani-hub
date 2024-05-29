import { AnimeBaseResponseType, AnimePageDataType } from '../../types'
import { parseGenre } from './parseGenre'

export function parseAnimePageResponse(
  fetchedData: AnimeBaseResponseType,
): AnimePageDataType {
  return {
    cardTitle: fetchedData.title_english,
    japTitle: fetchedData.title,
    rating: fetchedData.rating,
    genres: fetchedData.genres.map((genre) => parseGenre(genre)),
    id: fetchedData.mal_id,
    img: fetchedData.images.jpg.image_url,
    episodes: fetchedData.episodes,
    year: fetchedData.year,
    synopsis: fetchedData.synopsis,
    status: fetchedData.status,
    score: fetchedData.score,
    producers: fetchedData.producers.map((producer) => producer.name),
  }
}
