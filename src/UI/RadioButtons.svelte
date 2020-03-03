<script>
    import { createEventDispatcher } from 'svelte' 

    export let radioButtons

    let dispatch = createEventDispatcher()

</script>

<style>
    p {
        display: flex;
        justify-content: space-between;
    }

    label {
        font-size: 1.6rem;
        color: #9e9e9e;
        margin-right: 1rem;
    }

    /* Remove default Radio Buttons */
    [type="radio"]:not(:checked),
    [type="radio"]:checked {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    [type="radio"]:not(:checked) + span,
    [type="radio"]:checked + span {
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 1.3rem;
    transition: .28s ease;
    user-select: none;
    }

    [type="radio"] + span:before,
    [type="radio"] + span:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    margin: 4px;
    width: 16px;
    height: 16px;
    z-index: 0;
    transition: .28s ease;
    }

    /* Unchecked styles */
    [type="radio"]:not(:checked) + span:before,
    [type="radio"]:not(:checked) + span:after,
    [type="radio"]:checked + span:before,
    [type="radio"]:checked + span:after,
    [type="radio"].with-gap:checked + span:before,
    [type="radio"].with-gap:checked + span:after {
        border-radius: 50%;
    }

    [type="radio"]:not(:checked) + span:before,
    [type="radio"]:not(:checked) + span:after {
        border: 2px solid #527a45;
    }

    [type="radio"]:not(:checked) + span:after {
    transform: scale(0);
    }

    /* Checked styles */
    [type="radio"]:checked + span:before {
        border: 2px solid #527a45;
    }

    /* [type="radio"]:checked + span:after,
    [type="radio"].with-gap:checked + span:before,
    [type="radio"].with-gap:checked + span:after {
        border: #527a45;
    } */

    [type="radio"]:checked + span:after,
    [type="radio"].with-gap:checked + span:after {
    background-color: #527a45;
    }

    [type="radio"]:checked + span:after {
    transform: scale(1.02);
    }

    /* Radio With gap */
    [type="radio"].with-gap:checked + span:after {
    transform: scale(.5);
    }

    /* Focused styles */
    [type="radio"].tabbed:focus + span:before {
    box-shadow: 0 0 0 10px rgba(0,0,0,.1);
    }

</style>

<div>
    <p class="type-radio">
        {#each radioButtons as rb (rb.id)}
            <label on:click="{() => dispatch('select', rb.id)}">
                <input class="with-gap" id={rb.id} name={rb.name} type="radio" checked="{rb.selected}">
                <span>{rb.title}</span>
            </label>
        {/each}
    </p>
</div>