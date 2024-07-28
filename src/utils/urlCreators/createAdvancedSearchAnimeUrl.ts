const baseSearchUrl =
  'https://corsproxy.io/?https://api.jikan.moe/v4/anime?limit='

export function createAdvancedSearchAnimeUrl(
  cardsPerPage: number,
  filters?: string,
) {
  return filters
    ? baseSearchUrl + cardsPerPage + '&' + filters
    : baseSearchUrl + cardsPerPage
}
