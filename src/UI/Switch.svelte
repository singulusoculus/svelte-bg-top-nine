<script>
    import { createEventDispatcher } from 'svelte'
    export let title = null

    let dispatch = createEventDispatcher()

    let isChecked = false
</script>

<style>
    /* The switch - the box around the slider */
    .switch {
    position: relative;
    display: flex;
    width: 40px;
    height: 16px;
    margin: 0 auto;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #9E9E9E;
    -webkit-transition: .2s;
    transition: .2s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: -1px;
    bottom: -4px;
    background-color: #ccc;
    -webkit-transition: .2s;
    transition: .2s;
        -webkit-box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    }

    input:checked + .slider:before {
        background-color: #527a45;
    }

    input:checked + .slider {
    background-color: #869b7f;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #869b7f;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }

    .left-label {
        position: relative;
        left: -30px;
        top: -3px;
        font-size: 1.4rem;
    }

    .right-label {
        position: relative;
        right: -30px;
        top: -3px;
        font-size: 1.4rem;
    }

    .switch-title {
        text-align: center;
        margin: 1rem 0;
        font-size: 1.6rem;
    }
</style>

<article>
    {#if title}
    <p class="switch-title">{title}</p>
    {/if}
    <label class="switch">
        <span class="left-label">No</span>
            <div>
                <input type="checkbox" bind:checked={isChecked} on:click="{() => dispatch('clicked', !isChecked)}">
                <span class="slider round"></span>
            </div>
        <span class="right-label">Yes</span>
    </label>
</article>