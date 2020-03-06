<script>
    import { fly, fade } from 'svelte/transition'

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
    
    let sideNavVisible = false

    const toggleSideNav = () => {
        sideNavVisible = !sideNavVisible
    }
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

    /* MAIN NAV */

    .main-nav {
        display: flex;
        align-items: center;
        margin: 0;
    }

    .main-nav > li {
        display: flex;
        align-items: center;
        text-decoration: none;
        list-style-type: none;
        padding: 0 1rem;
        height: 100%;
    }

    .main-nav > li > a {
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }

    .main-nav > li:hover {
        background-color: rgba(0,0,0,0.1);
    }


    /* SIDENAV */
    .menu-btn {
        color: #fff;
        position: absolute;
        left: 2rem;
        display: none;
    }

    .sidenav {
        transform: translateX(0%);
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #FFF;
        width: 300px;
        position: fixed;
        left: 0;
        top: 0;  
        height: 105%;   
        z-index: 400;
        list-style-type: none;
        padding: 2rem 2rem 0 0;
    }

    .sidenav > li {
        line-height: 4.8rem;
        margin-left : 1.5rem;
        font-size: 2rem;
    }

    .sidenav > li > a {
        color: #000;
        z-index: 401;
        text-decoration: none;
    }

    .sidenav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index:395;
    }

    @media only screen and (max-width: 768px) {
        .main-nav {
            display: none;
        }

        nav {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .menu-btn {
            display: inline-block;
        }
    }

</style>

<nav>
    <div class="title">
        <img src="{logo}" alt="">
        <h1><slot><!-- optional fallback --></slot></h1>
    </div>
    <div class="menu-btn" on:click={toggleSideNav}>
        <i class="material-icons">menu</i>
    </div>
    <ul class="main-nav">
        {#each navItems as item}
            <li><a href="{item.href}">{item.name}</a></li>
        {/each}
    </ul>

    {#if sideNavVisible}
    <ul class="sidenav" transition:fly={{x: -300, duration: 300}}>
        {#each navItems as item}
            <li><a href="{item.href}">{item.name}</a></li>
        {/each}
    </ul>
    {/if}
</nav>

{#if sideNavVisible}
    <div class="sidenav-overlay"  on:click={toggleSideNav} transition:fade></div>
{/if}