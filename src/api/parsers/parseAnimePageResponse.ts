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
    img: fetchedData.images.jpg.large_image_url,
    episodes: fetchedData.episodes,
    year: fetchedData.year,
    synopsis: fetchedData.synopsis,
    status: fetchedData.status,
    score: fetchedData.score,
    trailer: fetchedData.trailer.url,
    studios: fetchedData.studios.map((studio) => studio.name),
    themes: fetchedData.themes.map((theme) => theme.name),
    music: {
      openings: fetchedData.theme.openings,
      endings: fetchedData.theme.endings,
    },
    related: fetchedData.relations
      .filter((relation) => relation.relation !== 'Adaptation')
      .map((relation) => ({
        relation: relation.relation,
        entry: relation.entry.map((i) => {
          return { id: i.mal_id, title: i.name }
        }),
      })),
  }
}
