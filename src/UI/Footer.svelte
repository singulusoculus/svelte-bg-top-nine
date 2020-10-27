<script>
    export let version
</script>

<style>
    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4rem;
        background-color: black;
        /* color: rgba(255,255,255,0.8); */
        color: rgba(255,255,255,.6);
        margin-top: 1rem;
    }

    p {
        font-size: 1.3rem;
    }

    a {
        color: #fff;
        text-decoration: none;
    }
</style>

<footer>
    <p>Created by <a href="https://www.briancasey.dev">Brian Casey</a> | v{version} | © 2020 <a href="https://www.pubmeeple.com">Pub Meeple</a></p>
</footer>