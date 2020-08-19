<script>
    import { fade, fly, slide } from 'svelte/transition'

	import Header from './UI/Header.svelte'
	import Card from './UI/Card.svelte'
	import Footer from './UI/Footer.svelte'
	import Collapsible from './UI/Collapsible.svelte'
	import BggCollection from './List/BggCollection.svelte'
	import YourList from './List/YourList.svelte'
	import BggSearch from './List/BggSearch.svelte'
	import YourListGrid from './List/YourListGrid.svelte'
	import Modal from './UI/Modal.svelte'
	import Button from './UI/Button.svelte'
	import list from './List/list-store.js'

	let version = '2.0.3'
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
	let modalOpen = false

	$: filteredList = $list.filter(l => l.addedToList).sort((a, b) => (a.order > b.order) ? 1 : -1)
	$: isVisible = filteredList.length > 0 ? true : false

	const toggleModal = () => {
		modalOpen = !modalOpen
	}

</script>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		margin: 0 auto;
		max-width: 1280px;
		flex: 1 0 auto;
		width: 100%;
	}

	.lists {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.lists > div {
		margin: 0 1rem;
		flex-grow: 1;
		width: 100%;
	}

	span {
		display: block;
		padding-bottom: 110px;
	}

	@media only screen and (max-width: 768px) {
		.lists {
			flex-direction: column;
			align-items: center;
		}

		.lists > div {
			width: 92%;
		}
	}

	.modal-buttons {
		display: flex;
		justify-content: space-around;
	}
</style>

<svelte:head>
	<title>Board Game Top Nine Generator</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link rel="icon" type="image/png" href="/favicon.ico">
</svelte:head>

<div class="app-container">
	<Header logo="/images/pm-logo.png">Top Nine Generator</Header>

	<main>
		{#if modalOpen}
			<Modal title="Hey, nice image!" on:cancel={toggleModal}>
				 If you found this tool useful please consider putting something in our tip jar.
				<div slot="footer" class="modal-buttons">
					<Button text="Paypal" linkref="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=pubmeeple@gmail.com&item_name=Friends+of+the+Pub&item_number=For+Top+Nine&currency_code=USD"></Button>
					<Button text="Close" icon="close" on:click={toggleModal}></Button>
				</div>
			</Modal>
		{/if}
		{#if isMobile && isVisible}
        	<span transition:slide></span>
		{:else}
			<Card>
				To create your Top Nine: 1) Add 9 games either from your BGG collection or BGG search. 2) Click the Download button when its available.
			</Card>
    	{/if}
		<div class="lists">
			<div>
				<BggCollection list="{$list}" />
				<BggSearch list="{$list}" />
			</div>
			<div>
				<!-- <YourList list="{$list}" /> -->
			</div>
		</div>
	</main>
	<YourListGrid list={$list} on:downloaded={toggleModal} />

	<Footer version="{version}" />
</div>


