<script>
</script>

<style>
    div {
        display: flex;
        justify-content: center;
        padding: 3rem;
        background-color: #eee;
        margin: 1rem 0 1rem 0;
        border-radius: 2px;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
        --webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
        /* width: 100%; */
        margin: 1rem;
    }

    p {
        font-size: 1.5rem;
    }

</style>

<div>
    <p><slot></slot></p>
</div>