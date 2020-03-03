<script>
	import Header from './UI/Header.svelte'
	import Card from './UI/Card.svelte'
	import Footer from './UI/Footer.svelte'
	import Collapsible from './UI/Collapsible.svelte'
	import BggCollection from './List/BggCollection.svelte'
	import YourList from './List/YourList.svelte'
	import BggSearch from './List/BggSearch.svelte'
	import YourListGrid from './List/YourListGrid.svelte'
	import list from './List/list-store.js'

	let version = '2.0.0'

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

	@media only screen and (max-width: 600px) {
		.lists {
			flex-direction: column;
		}

		.lists > div {
			width: 92%;
		}
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
		<Card>
			To create your Top Nine: 1) Add 9 games to your list either from your BGG collection or BGG search. 2) Click the Generate Top 9 button that pops up.
		</Card>
		<div class="lists">
			<div>
				<BggCollection list="{$list}" />
				<BggSearch list="{$list}" />
			</div>
			<div>
				<YourList list="{$list}" />
			</div>
		</div>
	</main>
	<YourListGrid list={$list} />

	<Footer version="{version}" />
</div>


