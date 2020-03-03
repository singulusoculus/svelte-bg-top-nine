<script>
    import { createEventDispatcher } from 'svelte'
    let dispatch = createEventDispatcher()
    export let sliderValue = 5
</script>

<style>
    .slidecontainer {
        width: 100%; /* Width of the outside container */
    }

    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 5px;
        border-radius: 5px;  
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        padding: 0;
    }

    /* .value-label {
        display: none;
    }

    .slider:active + .value-label {
        display: block;
        position: relative;
    } */

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%; 
        background: #527a45;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #527a45;
        cursor: pointer;
    }
    
    .slider:hover {
        opacity: 1;
    }
</style>


<div class="slidecontainer">
    <input type="range" class="slider" min="0" max="10" bind:value="{sliderValue}" on:change="{(event) => dispatch('changed', sliderValue)}" />
    <!-- <span class="value-label">{sliderValue}</span> -->
</div>