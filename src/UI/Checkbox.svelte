<script>
    import { createEventDispatcher } from 'svelte'
    export let title = 'Checkbox'
    export let cbClass = ''
    export let isChecked = false

    let dispatch = createEventDispatcher()
</script>


<style>
    label {
        font-size: 1.6rem;
        color: #9e9e9e;
    }

    [type="checkbox"]:not(:checked), [type="checkbox"]:checked {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    [type="checkbox"] {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
    }

    input {
        overflow: visible;
        font-family: sans-serif;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
    }

    [type="checkbox"]+span:not(.lever) {
        margin-right: 5px;
        position: relative;
        padding-left: 27px;
        cursor: pointer;
        display: inline-block;
        height: 25px;
        line-height: 25px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    [type="checkbox"]+span:not(.lever):before, [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        z-index: 0;
        border: 2px solid #5a5a5a;
        border-radius: 1px;
        margin-top: 3px;
        -webkit-transition: .2s;
        transition: .2s;
    }

    [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
        border: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    [type="checkbox"]:checked+span:not(.lever):before {
        top: -4px;
        left: -5px;
        width: 12px;
        height: 22px;
        border-top: 2px solid transparent;
        border-left: 2px solid transparent;
        border-right: 2px solid #527a45;
        border-bottom: 2px solid #527a45;
        -webkit-transform: rotate(40deg);
        transform: rotate(40deg);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform-origin: 100% 100%;
        transform-origin: 100% 100%;
    }

    [type="checkbox"]+span:not(.lever):before, [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        z-index: 0;
        border: 2px solid #5a5a5a;
        border-radius: 1px;
        margin-top: 3px;
        -webkit-transition: .2s;
        transition: .2s;
    }

    [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
        border: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
</style>

<label class="bgg-cb">
    <input class="{cbClass}" type="checkbox" bind:checked={isChecked} on:click="{() => dispatch('clicked', isChecked)}">
    <span>{title}</span>
</label>

<!-- on:click="{() => dispatch('edit', id)} -->