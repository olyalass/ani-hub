const baseIdUrl = 'https://corsproxy.io/?https://api.jikan.moe/v4/anime/'

function createGetIdAnimeUrl(id: number) {
  return baseIdUrl + id
}

export default createGetIdAnimeUrl
