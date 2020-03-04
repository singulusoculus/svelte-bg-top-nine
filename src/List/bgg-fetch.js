import uuidv4 from 'uuid'
import { sortListData } from './utilities.js'

// Shared Functions
const getBGGData = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => handleErrors(response))
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
        .then(data => {
          const dataJSON = xmlToJson(data)
          let bggJSONData
  
          if (dataJSON.items) {
            bggJSONData = dataJSON.items.item
          } else if (dataJSON.user.top) {
            bggJSONData = dataJSON.user.top.item
          } else {
            bggJSONData = []
          }
  
          if (!Array.isArray(bggJSONData)) {
            if (bggJSONData) {
              bggJSONData = [bggJSONData]
            } else {
              bggJSONData = []
            }
          }
          // Always resolves an array
          resolve(bggJSONData)
        }).catch((error) => {
          console.log(error)
          alert(`There was an error fetching your collection. Check the username you entered. BGG servers may also be busy or you have made too many requests. Please try again in a minute.`)
        // disable loader
        // enable submit button
        })
    })
  }

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

const xmlToJson = (xml) => { // Changes XML to JSON
    // Create the return object
    let obj = {}
  
    if (xml.nodeType === 1) { // element
      // attributes
      if (xml.attributes.length > 0) {
        obj['@attributes'] = {}
        for (let j = 0; j < xml.attributes.length; j++) {
          let attribute = xml.attributes.item(j)
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue
    }
  
    // children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        let item = xml.childNodes.item(i)
        let nodeName = item.nodeName
        if (typeof (obj[nodeName]) === 'undefined') {
          obj[nodeName] = xmlToJson(item)
        } else {
          if (typeof (obj[nodeName].push) === 'undefined') {
            let old = obj[nodeName]
            obj[nodeName] = []
            obj[nodeName].push(old)
          }
          obj[nodeName].push(xmlToJson(item))
        }
      }
    }
    return obj
}

// Search Functions
const getBGGSearchResults = (localSearchText, exactSearch, searchType) => new Promise(async (resolve, reject) => {
    let searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${localSearchText}`

    if (exactSearch) {
        searchUrl += `&exact=1`
    }

    let results

    if (searchType === 'boardgames') {
        // when asking for type boardgame, bgg returns both boardgame and boardgameexpansion types but does not label the expansions properly.
        // I have to request expansions explicitly and then filter based on that list
        let searchUrlBG = `${searchUrl}&type=boardgame`
        let bgResults = await getBGGData(searchUrlBG)

        let searchUrlEx = `${searchUrl}&type=boardgameexpansion`
        let exResults = await getBGGData(searchUrlEx)

        let expansionIds = []
        exResults.forEach((item) => {
        expansionIds.push(item['@attributes'].id)
        })

        results = bgResults.filter((i) => expansionIds.indexOf(i['@attributes'].id) < 0, expansionIds)
    } else {
        let searchUrlEx = `${searchUrl}&type=boardgameexpansion`
        results = await getBGGData(searchUrlEx)
    }

    let bggSearchItems = []
    results.forEach((i) => {
        bggSearchItems.push(i)
    })

    // Filter out duplicate bggIds
    bggSearchItems = bggSearchItems.filter((list, index, self) => self.findIndex(l => l['@attributes'].id === list['@attributes'].id) === index)

    // Filter for games with primary names only
    bggSearchItems = bggSearchItems.filter(item => item.name['@attributes'].type === 'primary')

    // Cut list down to 50
    bggSearchItems = bggSearchItems.slice(0, 50)

    let bggIds = []
    bggSearchItems.forEach((item) => {
        if (item.name['@attributes'].type === 'primary') {
        bggIds.push(item['@attributes'].id)
        }
    })

    let gameDetails = await getBGGGameDetailData(bggIds)
    gameDetails = sortListData(gameDetails, 'bgg-rank')

    resolve(gameDetails)
});

const getBGGGameDetailData = (bggIds) => {
  return new Promise(async (resolve, reject) => {
    let dataURL = 'https://boardgamegeek.com/xmlapi2/thing?stats=1&id='
    bggIds.forEach((id) => {
      dataURL += id + ','
    })

    const results = await getBGGData(dataURL)
    let items = []

    results.forEach((i) => {
      items.push(i)
    })

    resolve(createBGGSearchList(items))
  })
}

const createBGGSearchList = (items) => {

  let bggGameData = []
  items.forEach((item) => {
    let bggGameDataDetails = {}

    bggGameDataDetails.id = uuidv4()
    bggGameDataDetails.source = 'bgg-search'
    bggGameDataDetails.imageOriginal = item.image ? item.image['#text'] : ''
    bggGameDataDetails.image = item.thumbnail ? item.thumbnail['#text'] : ''
    bggGameDataDetails.bggId = item['@attributes'].id
    bggGameDataDetails.processedImage = ''

    // Stats
    // .statistics.ratings.average["@attributes"].value
    const stats = item.statistics.ratings
    bggGameDataDetails.averageRating = stats.average['@attributes'].value

    // bggRank
    if (!Array.isArray(stats.ranks.rank)) {
      stats.ranks.rank = [stats.ranks.rank]
    }

    const rank = stats.ranks.rank.find((e) => e['@attributes'].name === 'boardgame')
    if (rank['@attributes'].value === 'Not Ranked') {
      bggGameDataDetails.bggRank = 1000000
    } else {
      bggGameDataDetails.bggRank = parseInt(rank['@attributes'].value)
    }

    // Names
    if (!Array.isArray(item.name)) {
      item.name = [item.name]
    }

    item.name.forEach((name) => {
      if (name['@attributes'].type === 'primary') {
        bggGameDataDetails.name = name['@attributes'].value
      }
    })

    bggGameData.push(bggGameDataDetails)
  })
  return bggGameData
}

// Collection Functions
const getBGGCollection = (user, expansions) => new Promise(async (resolve, reject) => {
  // disable submit button

  let queryUrl = `https://www.boardgamegeek.com/xmlapi2/collection?username=${user}&stats=1`

  if (!expansions) {
      queryUrl += '&excludesubtype=boardgameexpansion'
  }

    let results = await getBGGData(queryUrl)
    let bggList = createBGGCollectionList(results)

    queryUrl += '&played=1'
    let playedResults = await getBGGData(queryUrl)
    let played = createBGGCollectionList(playedResults)

    played.forEach((item) => {
      bggList.push(item)
    })

    bggList = bggList.filter((list, index, self) => self.findIndex(l => l.bggId === list.bggId) === index)
    resolve(bggList)

}) 

const createBGGCollectionList = (data) => {
  let items = data
  let bggList = []

  if (!Array.isArray(items)) {
      items = [items]
  }

  items.forEach((item) => {
      const statusAttributes = item.status['@attributes']

      const obj = {
      id: uuidv4(),
      name: item.name ? item.name['#text'] : 'No Title',
      source: 'bgg-collection',
      // sourceType: 'collection',
      imageOriginal: item.image ? item.image['#text'] : '',
      image: item.thumbnail ? item.thumbnail['#text'] : '',
      processedImage: '',
      // yearPublished: item.yearpublished ? parseInt(item.yearpublished['#text']) : 0,
      bggId: item['@attributes'].objectid,
      own: statusAttributes.own === '1',
      fortrade: statusAttributes.fortrade === '1',
      prevowned: statusAttributes.prevowned === '1',
      want: statusAttributes.want === '1',
      wanttobuy: statusAttributes.wanttobuy === '1',
      wanttoplay: statusAttributes.wanttoplay === '1',
      wishlist: statusAttributes.wishlist === '1',
      played: item.numplays['#text'] > 0,
      plays: item.numplays['#text'],
      rated: item.stats['rating']['@attributes'].value !== 'N/A',
      rating: item.stats['rating']['@attributes'].value === 'N/A' ? 0 : parseInt(item.stats['rating']['@attributes'].value),
      addedToList: false
      }

      // if (listData.map(e => e.bggId).indexOf(obj.bggId) > -1) {
      // obj.addedToList = true
      // }

      bggList.push(obj)
  })

  return bggList
}


export  { getBGGSearchResults, getBGGCollection }