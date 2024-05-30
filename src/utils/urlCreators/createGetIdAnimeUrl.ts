const baseIdUrl = 'https://corsproxy.io/?https://api.jikan.moe/v4/anime/'

export function createGetIdAnimeUrl(id: number) {
  return baseIdUrl + id
}
