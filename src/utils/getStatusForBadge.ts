export function getStatusForBadge(status: string) {
  switch (status) {
    case 'Finished Airing':
      return 'success'
    case 'Currently Airing':
      return 'processing'
    case 'Not yet aired':
      return 'warning'
    case 'G - All Ages':
      return 'processing'
    case 'PG - Children':
      return 'processing'
    case 'PG-13 - Teens 13 or older':
      return 'success'
    case 'R - 17+ (violence & profanity)':
      return 'warning'
    case 'R+ - Mild Nudity':
      return 'warning'
    case 'Rx - Hentai':
      return 'error'
    default:
      return 'default'
  }
}
