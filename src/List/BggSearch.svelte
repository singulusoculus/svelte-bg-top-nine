<script>
    import Collapsible from '../UI/Collapsible.svelte'
    import Collection from '../UI/Collection.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import Button from '../UI/Button.svelte'
    import Divider from '../UI/Divider.svelte'
    import RadioButtons from '../UI/RadioButtons.svelte'
    import Loading from '../UI/Loading.svelte'

    import listStore from './list-store.js' 
    import { getBGGCollection, getBGGSearchResults } from './bgg-fetch.js'
    import { processImage } from './top-nine'

    export let list = []
    let searchText = ''
    let searchType = 'boardgames'
    let hasSearchResults = false
    let sortBy = 'bgg-rank' 
    const radioButtons = [
        {
            id: 'boardgames',
            name: 'bgg-search-type',
            title: 'Board Games',
            selected: true
        },
        {
            id: 'expansions',
            name: 'bgg-search-type',
            title: 'Expansions',
            selected: false
        }
    ]
    let isLoading = false

    $: filteredList = list.filter(l => l.source === 'bgg-search' && !l.addedToList)
    $: exactSearch = searchText.charAt(0) === `"` && searchText.charAt(searchText.length -1) === `"` ? true : false
    $: totalAdded = list.filter(l => l.addedToList).length

    const addListItem = (event) => {
        if (totalAdded !== 9) {
            listStore.addListItem(event.detail)

            setTimeout(async () => {
                const item = $listStore.filter(i => i.id === event.detail)[0]
                if (!item.processedImage) {
                    const processedImage = await processImage(event.detail, item.imageOriginal)
                    listStore.updateImage(event.detail, processedImage)
                }
            }, 1000)
        } else {
            alert('You already have 9 games.')
        }
    }

    const handleBGGSearchRequest = async () => {
        isLoading = true
        
        let localSearchText = searchText.replace(/["]+/g, '')

        // Clear search data from store
        listStore.resetSearchData()

        if (exactSearch) {
            localSearchText = localSearchText.replace(/["]+/g, '')
        }

        // gameDetails = await getBGGSearchResults(localSearchText, exactSearch, searchType)

        listStore.addSearchData(await getBGGSearchResults(localSearchText, exactSearch, searchType))

        isLoading = false
        hasSearchResults = true
    }

</script>

<style>
    p {
        font-style: italic;
    }

    .search-controls {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>

<Collapsible title="BGG Search" icon="search" isOpen={false}>
    <p class="center">Note: Each search returns at most 50 results at a time. If you do not see what you are looking for be more specific or try an exact search by wrapping your search text in double quotes. Ex: "Risk". Please keep special characters in mind.</p>
    <form>
        <TextInput label="Search Text" id="bgg-search-text" on:textChange="{(event) => searchText = event.detail}" />
        <div class="search-controls">
            <div>
                <span class="bgg-filter-heading">Search For:</span>
                <RadioButtons {radioButtons} on:select="{(event) => searchType = event.detail}" />
            </div>
            <div>
                <Button text="Search" icon="arrow_forward" on:click={handleBGGSearchRequest} disabled={isLoading}/>
            </div>
        </div>
    </form>
    {#if isLoading}
        <Loading />
    {/if}
    {#if hasSearchResults}
        <Divider />
        <Collection games={filteredList} icon="add" on:add="{addListItem}" />
    {/if}
</Collapsible>