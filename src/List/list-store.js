import { writable } from 'svelte/store'

const list = writable([])

let order = 1

const customListStore = {
    subscribe: list.subscribe,
    addListItem: (id) => {
        list.update((items) => {
            const index = items.findIndex(i => i.id === id)
            const itemToUpdate = items[index]
            itemToUpdate.addedToList = true
            itemToUpdate.order = order

            // update store item
            const updatedItems = [...items]
            updatedItems[index] = itemToUpdate
            return updatedItems

        })
        order++
    },
    removeListItem: (id) => {
        list.update(items => {
            const index = items.findIndex(i => i.id === id)
            const itemToUpdate = items[index]
            itemToUpdate.addedToList = false
            itemToUpdate.order = null
            const updatedItems = [...items]
            updatedItems[index] = itemToUpdate
            return updatedItems
        })
        order--
    },
    addBGGCollection: (data) => {
        list.update(items => {
            return [ ...data, ...items ]
        })
    },
    resetBGGCollection: () => {
        list.update(items => {
            return items.filter(i => !i.source === 'bgg-collection' || i.addedToList)
        })
    },
    addSearchData: (data) => {
        list.update(items => {
            return [ ...data, ...items ]
        })
    },
    resetSearchData: () => {
        list.update(items => {
            return items.filter(i => !i.source === 'bgg-search' || i.addedToList)
        })
    },
    clearList: () => {
        list.update(items => {
            // let searchExists = items.filter(i => i.source === 'bgg-search' && !i.addedToList).length > 0 ? true : false
            // let collectionExists = items.filter(i => i.source === 'bgg-collection' && !i.addedToList).length > 0 ? true: false
            
            items.forEach(i => {
                i.addedToList = false
            })
            return items
        })
    },
    updateOrder: (oldOrder, newOrder) => {
        list.update(items => {
            // get copy of items
            let filteredItems = items.filter(i => i.addedToList)

            let draggedItem = filteredItems.filter(i => i.order === oldOrder)[0]
            draggedItem = {...draggedItem, order: null}

            let itemsToUpdate

            if (oldOrder > newOrder) {
                // Moving an item up in the list
                itemsToUpdate = filteredItems.filter(i => i.order >= newOrder && i.order !== oldOrder)
                itemsToUpdate.forEach(i => {
                    if (i.order < oldOrder) {
                        i.order++
                    }
                })
            } else {
                // Moving an item down in the list
                itemsToUpdate = filteredItems.filter(i => i.order <= newOrder && i.order !== oldOrder)
                itemsToUpdate.forEach(i => {
                    if (i.order > oldOrder) {
                        i.order--
                    }
                })
            }

            draggedItem = {...draggedItem, order: newOrder}
            itemsToUpdate = [...itemsToUpdate, draggedItem]
            let newItems = [...items]
            
            newItems = newItems.map(item => {
                let item2 = itemsToUpdate.find(i2 => i2.id === item.id)
                return item2 ? { ...item, ...item2 } : item
            })

            return newItems
        })
    },
    updateImage : (id, image) => {
        list.update(items => {
            const index = items.findIndex(i => i.id === id)
            const itemToUpdate = items[index]
            itemToUpdate.processedImage = image
            const updatedItems = [...items]
            updatedItems[index] = itemToUpdate
            return updatedItems
        })
    }
}

export default customListStore