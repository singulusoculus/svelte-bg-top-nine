<script>
    import { createEventDispatcher } from 'svelte'
    import Button from './Button.svelte'
    import { fade, fly } from 'svelte/transition'

    const dispatch = createEventDispatcher()

    function closeModal() {
        dispatch('cancel')
    }

    export let title
</script>

<style>
    .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 110;
    }

    .modal {
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 200;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    /* overflow: scroll; */
    }

    h1 {
    padding: 1.5rem;
    margin: 0;
    border-bottom: 1px solid #ccc;
    font-family: 'Roboto Slab', sans-serif;
    }

    .content {
    padding: 1.5rem;
    font-size: 1.2rem;
    }

    footer {
    padding: 1.5rem;
    }

    @media (min-width: 768px) {
    .modal {
        width: 50rem;
        left: calc(50% - 20rem);
    }
    }

</style>

<div class="modal-backdrop" on:click={closeModal} transition:fade={{duration: 300}}></div>

<div class="modal" transition:fly={{duration: 500, x: 0, y:-300}}>
    <h1>{title}</h1>
    <div class="content"><slot /></div>
    <footer>
        <slot name="footer">
            <Button on:click={closeModal}>Close</Button>
        </slot>
    </footer>
</div>