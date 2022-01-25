<script>
    import Collapsible from '../UI/Collapsible.svelte'
    import Collection from '../UI/Collection.svelte'
    import Button from '../UI/Button.svelte'
    import listStore from './list-store.js'


    export let list = []

    $: addedList = list.filter(i => i.addedToList)

    const removeListItem = (event) => {
        listStore.removeListItem(event.detail)
    }

    const clearList = () => {
        listStore.clearList()
    }
</script>

<style>

</style>

<Collapsible title="Your List" icon="view_list" isOpen={true}>
    <span slot="header-button">
        <Button icon="delete" text="Clear" on:click="{clearList}" />
    </span>
    <Collection games={addedList} icon="delete" on:add="{removeListItem}" />
</Collapsible>
