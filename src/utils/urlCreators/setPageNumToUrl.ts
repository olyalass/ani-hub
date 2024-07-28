export function setPageNumToUrl(page: number, url: string | undefined): string {
  if (url) {
    const startIndex = url.indexOf('page=')
    if (startIndex >= 0) {
      const lastIndex = url.indexOf('&', startIndex)
      if (lastIndex > startIndex + 5) {
        return (
          url.substring(0, startIndex + 5) + page + url.substring(lastIndex)
        )
      } else {
        return url.substring(0, startIndex + 5) + page
      }
    } else {
      return url + '&page=' + page
    }
  } else return 'page=' + page
}
