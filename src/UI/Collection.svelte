<script>
    import { createEventDispatcher } from 'svelte'
    import {send, receive} from '../List/crossfade.js';
    import { flip } from 'svelte/animate'
    import { fade } from 'svelte/transition'

    export let icon = 'add'
    export let games

    let dispatch = createEventDispatcher()

</script>

<style>
    .collection {
        margin: 0;
        border: none
    }

    .collection-item {
        background-color: #fff;
        line-height: 2rem;
        padding: 10px 20px;
        margin: 0;
        border-bottom: 1px solid #e0e0e0;

        display: flex;
        justify-content: space-around;
        align-items: center;
        min-height: 71px;
    }

    .image-container {
        width: 50px;
        display: flex;
        justify-content: center;
    }

    .title {
        margin-left: 10px;
        justify-self: start;
        flex-grow: 1;
    }

    .icon {
        color: #527A45;
        cursor: pointer;
    }

    .image {
        max-width: 50px;
        max-height: 50px;
        border-radius: 2px;
    }

    p {
        font-style: italic;
    }
</style>

<div class="collection">
    <!-- {#if games.length === 0}
    <p in:fade="{{delay: 600}}" class="center">No games here!</p>
    {:else} -->
    {#each games as item (item.id)}
    <li class="collection-item" out:send="{{key: item.id}}" in:receive="{{key: item.id}}" animate:flip="{{duration: 200}}">
        <div class="image-container">
            <img alt="{item.name}" class="image" src="{item.image}">
        </div>
        <span class="title">{item.name}</span>
        {#if icon}
            <i class="material-icons icon" on:click="{() => dispatch('add', item.id)}">{icon}</i>
        {/if}
    </li> 
    {/each}
    <!-- {/if} -->
</div>