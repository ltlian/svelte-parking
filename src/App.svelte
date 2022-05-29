<script lang="ts">
	import ParkeringReportItemList from './Components/ParkeringReportItemList.svelte';
	import * as openComClient from './openComClient';
</script>

<main>
	{#await openComClient.getParking()}
		<p>Fetching ...</p>
	{:then items}
		<ParkeringReportItemList {items} />
	{:catch err}
		<h5>Error</h5>
		<p>{err}</p>
	{/await}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
