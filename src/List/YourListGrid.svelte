<script>
    import { fade } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import Loading from '../UI/Loading.svelte'
    import listStore from './list-store'
    import { generateTopNine } from './top-nine.js'

    export let list = []
    // export let isLoading = false

    let isActive = false
    let isVisible = false
    let hasNineImages = false
    let hasImages = false

    $: filteredList = list.filter(l => l.addedToList).sort((a, b) => (a.order > b.order) ? 1 : -1)
    $: isVisible = filteredList.length > 0 ? true : false
    $: hasNineImages = filteredList.filter(i => i.processedImage !== '').length === 9 ? true : false
    $: hasImages = filteredList.length < 1 ? false : true
    $: filteredList.length === 0 ? isActive = false : null
    $: filledFilteredList = fillList(filteredList)
    $: isLoading = filteredList.filter(i => i.processedImage === '').length > 0 ? true : false
    $: hasNineImages ? isActive = true : null
    // $: console.log(isLoading);
    // $: console.log(filteredList);
    // $: console.log(isActive, hasImages);

    const fillList = (filteredList) => {
        const length = filteredList.filter(i => i.image).length
        const copyFilteredList = [...filteredList]
        const toFill = 9 - length

        for (let i = 0; i < toFill; i++ ) {
            copyFilteredList.push({id: i})
        }

        return copyFilteredList
    }

    const toggleGrid = () => {
        if (hasImages) {
            isActive = !isActive
        }
    }

    const removeItem = (id) => {
        listStore.removeListItem(id)     
    }

    // Drag and Drop functionality
    const dragstart = (event, order) => {
        event.dataTransfer.setData("order", order)
    }

    const dragover = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }

    const drop = (event, newOrder) => {
        event.preventDefault()
        const oldOrder = parseInt(event.dataTransfer.getData("order"))
        if (filteredList.length > 1) {
            listStore.updateOrder(oldOrder, newOrder)
        }
    }

    const handleDownloadTopNine = () => {
        const list = [...filteredList]
        let newList = []
        list.forEach(i => {
            newList.push({image: i.processedImage})
        })

        generateTopNine(newList)
    }

    const clearList = () => {
        listStore.clearList()
    }

</script>

<style>
    .grid-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10;
    }

    .wrapper {
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .wrapper.active {
        z-index: 10;
    }

    .grid.active {
        /* display: grid;
        grid-gap: 3px;
        padding: 3px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        z-index: 100;
        position: fixed; */
        top: 5vh;
        /* background-color: #fff; */
        transition: top .3s;
        opacity: 1;
    }

    .grid {
        display: grid;
        grid-gap: 1px;
        padding: 1px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        z-index: 100;
        position: fixed;
        top: 80vh;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        transition: all .3s;
        opacity: .7;
    }

    .grid:not(.active):hover {
        transform: translateY(-4px);
        box-shadow: 0 3px 9px rgba(0, 0, 0, 0.35);
        opacity: 1;
    }

    .grid.active > .cell {
        width: 202px;
        height: 202px;
        background-color: #ccc;
        transition: width .3s, height .3s;

    }

    @media only screen and (max-width: 768px) {
        .grid.active > .cell {
            width: 110px;
            height: 110px;
        }

        .grid.active {
            grid-gap: 2px;
            padding: 2px;
        }
    }

    .grid > .cell {
        width: 46px;
        height: 46px;
        background-color: #ccc;
        transition: width .3s, height .3s;
    }

    .grid > .cell > img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .cell {
        position: relative;
    }

    .grid.active > .cell > img:hover {
        opacity: .8;
        transition: opacity, .3s;
    }

    .cell:hover > .delete {
        opacity: 1;
        transition: opacity, .3s;
    }

    .delete {
        opacity: 0;
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
    }

    /* BUTTONS */
    .buttons {
        position: fixed;
        z-index: 100;
        top: calc(2vh + 618px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media only screen and (max-width: 768px) {
        .buttons {
            top: calc(2vh + 368px);
        }
    }

    .btn {
        border-radius: 8px;
        padding: 10px 15px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 1rem;
        font-size: 1.6rem;
    }

    .btn > span {
        margin-left: .6rem;
    }

    .loading-wrapper {
        position: fixed;
        top: 82vh;
        z-index: 200;
    }

</style>

{#if isActive && hasImages}
    <div class="grid-backdrop" on:click={toggleGrid} transition:fade={{duration: 200}}></div>
{/if}

{#if isVisible}
    <div class="wrapper" transition:fade class:active="{isActive}">
        {#if isLoading}
            <div class="loading-wrapper" transition:fade>
                <Loading />
            </div>
        {/if}
        <div class="grid" class:active="{isActive}" on:click|stopPropagation="{!isActive ? toggleGrid : null}">
            {#each filledFilteredList as i (i.id)}
                <div class="cell" on:drop={(event) => drop(event, i.order)} on:dragover={(event) => dragover(event)}>
                    {#if i.processedImage}
                        <img src="{i.processedImage.src}" alt="{i.name}" draggable="true" on:dragstart="{(event) => dragstart(event, i.order)}">
                    {/if}
                    {#if i.image && isActive}
                        <i class="material-icons delete" on:click={removeItem(i.id)}>delete</i>
                    {/if}
                </div>  
            {/each}
        </div>
        {#if isActive}
            <div class="buttons">
                {#if hasNineImages}
                <div class="btn" in:fade={{delay: 200, duration: 200}} out:fade={{duration: 200}} on:click={handleDownloadTopNine}>
                    <i class="material-icons">grid_on</i>
                    <span>Download</span> 
                </div>
                {/if}
                <div class="btn" in:fade={{delay: 200, duration: 200}} out:fade={{duration: 200}} on:click={toggleGrid}>
                    <i class="material-icons">close</i>
                    <span>Close</span>
                </div> 
                <div class="btn" in:fade={{delay: 200, duration: 200}} out:fade={{duration: 200}} on:click={clearList}>
                    <i class="material-icons">delete</i>
                    <span>Clear</span>
                </div> 
            </div>
        {/if}
    </div>
{/if}