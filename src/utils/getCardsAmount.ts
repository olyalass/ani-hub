function getCardsAmount() {
  if (window.matchMedia('(min-width: 1735px)').matches) {
    return 14
  } else if (window.matchMedia('(min-width: 1519px)').matches) {
    return 12
  } else if (window.matchMedia('(min-width: 1303px)').matches) {
    return 10
  } else if (window.matchMedia('(min-width: 1087px)').matches) {
    return 8
  } else if (window.matchMedia('(min-width: 871px)').matches) {
    return 6
  } else {
    return 4
  }
}

export default getCardsAmount
