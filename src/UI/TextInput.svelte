<script>
    import { createEventDispatcher } from 'svelte'

    export let label = null
    export let id
    export let icon = null
    export let placeholder = null

    let dispatch = createEventDispatcher()

    let text = ''

    $: isFilled = text.length > 0 ? true : false

</script>

<style>
    .input-field {
        position: relative;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        font-size: 1.6rem;
        flex: 1 0 auto;
    }

    input:not([type]), input[type=text]:not(.browser-default), 
    input[type=password]:not(.browser-default), 
    input[type=email]:not(.browser-default), 
    input[type=url]:not(.browser-default), 
    input[type=time]:not(.browser-default), 
    input[type=date]:not(.browser-default), 
    input[type=datetime]:not(.browser-default), 
    input[type=datetime-local]:not(.browser-default), 
    input[type=tel]:not(.browser-default), 
    input[type=number]:not(.browser-default), 
    input[type=search]:not(.browser-default), 
    textarea.materialize-textarea {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #9e9e9e;
        border-radius: 0;
        outline: none;
        height: 3rem;
        width: 100%;
        font-size: 16px;
        margin: 0 0 8px 0;
        padding: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        -webkit-transition: border .3s, -webkit-box-shadow .3s;
        transition: border .3s, -webkit-box-shadow .3s;
        transition: box-shadow .3s, border .3s;
        transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;
    }

    .input-field > label {
        color: #9e9e9e;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1.4rem;
        cursor: text;
        -webkit-transition: color .2s ease-out, -webkit-transform .2s ease-out;
        transition: color .2s ease-out, -webkit-transform .2s ease-out;
        transition: transform .2s ease-out, color .2s ease-out;
        transition: transform .2s ease-out, color .2s ease-out, -webkit-transform .2s ease-out;
        -webkit-transform-origin: 0% 100%;
        transform-origin: 0% 100%;
        text-align: initial;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
    }

    /* input:not([type])+label:after, 
    input[type=text]:not(.browser-default)+label:after,
    input[type=password]:not(.browser-default)+label:after, 
    input[type=email]:not(.browser-default)+label:after, 
    input[type=url]:not(.browser-default)+label:after, 
    input[type=time]:not(.browser-default)+label:after, 
    input[type=date]:not(.browser-default)+label:after, 
    input[type=datetime]:not(.browser-default)+label:after, 
    input[type=datetime-local]:not(.browser-default)+label:after, 
    input[type=tel]:not(.browser-default)+label:after, 
    input[type=number]:not(.browser-default)+label:after, 
    input[type=search]:not(.browser-default)+label:after, 
    textarea.materialize-textarea+label:after, 
    .select-wrapper+label:after {
        display: block;
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        opacity: 0;
        -webkit-transition: .2s opacity ease-out, .2s color ease-out;
        transition: .2s opacity ease-out, .2s color ease-out;
    } */

    input:focus+label {
        -webkit-transform: translateY(-14px) scale(0.8);
        transform: translateY(-14px) scale(0.8);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        color: #527A45
    }

    input:focus {
        border-bottom: 1px solid #527A45;
    }

    label.is-filled {
        -webkit-transform: translateY(-14px) scale(0.8);
        transform: translateY(-14px) scale(0.8);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }

    .text-input {
        display: flex;
        align-items: center ;
    }

    i {
        margin-right: 1rem;
    }

</style>

<div class="text-input">
    {#if icon}
        <i class="material-icons">{icon}</i>
    {/if}
    <div class="input-field">
        <input id="{id}" type="text" bind:value={text} placeholder="{placeholder}" on:input="{() => dispatch('textChange', text)}">
        {#if label}
        <label for="{id}" class:is-filled="{isFilled}">{label}</label>
        {/if}
    </div>
</div>