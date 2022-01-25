const sortListData = (list, sortBy) => {
    if (sortBy === 'alphabetical') {
      // for alpha sorts it is flipped - earlier letter in the alphabet is higher
      return list.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        } else {
          return 0
        }
      })
    } else if (sortBy === 'bgg-rank') {
      return list.sort((a, b) => {
        if (a.bggRank > b.bggRank) {
          return 1
        } else if (a.bggRank < b.bggRank) {
          return -1
        } else {
          return 0
        }
      })
    } else {
      return list
    }
  }

  export { sortListData }