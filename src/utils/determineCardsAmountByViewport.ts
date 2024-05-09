function determineCardsAmountByViewport() {
  if (window.matchMedia('(min-width: 1767px)').matches) {
    return 14
  } else if (window.matchMedia('(min-width: 1542px)').matches) {
    return 12
  } else if (window.matchMedia('(min-width: 1317px)').matches) {
    return 10
  } else if (window.matchMedia('(min-width: 1092px)').matches) {
    return 8
  } else if (window.matchMedia('(min-width: 867px)').matches) {
    return 6
  } else {
    return 4
  }
}

export default determineCardsAmountByViewport
