<script>
    export let logo
    
	let navItems = [
		{
			name: 'Pub Meeple Home',
			href: ''
        },
        {
            name: 'Ranking Engine',
            href: ''
        },
        {
            name: 'Podcast',
            href: ''
        },
        {
            name: 'Contact',
            href: ''
        }
	]
</script>

<style>

    nav {
        display: flex;
        justify-content: space-between;
        background-color: #3F5061;
        height: 6rem;
        font-size: 1.5rem;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
        --webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    }

    .title {
        display: flex;
        align-items: center;
        margin: 0 1rem;
    }

    img {
        width: 45px;
    }

    h1 {
        color: white;
        margin: 0 1rem;
    }

    ul {
        display: flex;
        align-items: center;
        margin: 0;
    }

    li {
        display: flex;
        align-items: center;
        text-decoration: none;
        list-style-type: none;
        padding: 0 1rem;
        height: 100%;
    }

    a {
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }

    li:hover {
        background-color: rgba(0,0,0,0.1);
    }

</style>

<nav>
    <div class="title">
        <img src="{logo}" alt="">
        <h1><slot><!-- optional fallback --></slot></h1>
    </div>
    <ul>
        {#each navItems as item}
            <li><a href="{item.href}">{item.name}</a></li>
        {/each}
    </ul>
</nav>