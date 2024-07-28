export function createListShareUrl(animeIds: number[]) {
  let pathname = window.location.pathname
  const startIndex = pathname.indexOf('/lists')
  if (startIndex !== -1) {
    pathname = pathname.substring(0, startIndex)
  }
  pathname = pathname + '/shared'
  return (
    window.location.protocol +
    '//' +
    window.location.host +
    pathname +
    '?ids=' +
    animeIds.join(',')
  )
}
