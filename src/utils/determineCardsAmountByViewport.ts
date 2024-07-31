export function determineCardsAmountByViewport() {
  if (window.matchMedia('(min-width: 1841px)').matches) {
    return 14
  } else if (window.matchMedia('(min-width: 1581px)').matches) {
    return 12
  } else if (window.matchMedia('(min-width: 1401px)').matches) {
    return 10
  } else if (window.matchMedia('(min-width: 1131px)').matches) {
    return 8
  } else {
    return 6
  }
}
