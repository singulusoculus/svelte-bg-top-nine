<script>
    import { slide, scale } from 'svelte/transition'

    export let icon = "bookmark_border"
    export let title = "Title"
    export let isOpen = false

    const toggleCollapsible = () => {
        isOpen = !isOpen
    }
</script>

<style>
    section {
        -webkit-box-shadow: 0 1px 5px 0 rgba(0,0,0,0.18), 0 0px 11px 0 rgba(0,0,0,0.15);
        box-shadow: 0 1px 5px 0 rgba(0,0,0,0.18), 0 0px 11px 0 rgba(0,0,0,0.15);
        margin: 0 auto;
        width: 95%;
        transition: all .4s;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        line-height: 1.9;
        padding: 1.8rem;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        font-size: 1.8rem;
    }

    i {
        margin-right: 1rem;
    }

    .title {
        flex: 1;
    }

    .body {
        padding: 2.8rem;
        font-size: 1.5rem;
    }

    .active {
        width: 100%;
        -webkit-box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
        box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
        transform: scale(1);
        margin: 2rem 0;
    }
</style>

<section class:active="{isOpen}">
    <div class="header" on:click="{toggleCollapsible}">
        <i class="material-icons">{icon}</i>
        <span class="title">{title}</span>
        <slot name="header-button"></slot>
    </div>

    {#if isOpen}
    <div class="body" transition:slide>
        <slot>This is some body text</slot>
    </div>
    {/if}

</section>