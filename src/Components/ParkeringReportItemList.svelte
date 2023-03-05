<script lang="ts">
	import ParkeringReportElement from './ParkeringReportElement.svelte';

	export let items: ParkingAvailabilityRecord[];
</script>

<h3>Antall ledige plasser</h3>

<ul>
	{#each items as item}
		<li>
			<ParkeringReportElement {item} />
		</li>
	{/each}
</ul>

{#if items && items.length}
	<p>Sist oppdatert {items[0].timestamp}</p>
{/if}

<style>
	ul {
		padding: 0;
	}
	li {
		list-style: none;
	}
</style>
