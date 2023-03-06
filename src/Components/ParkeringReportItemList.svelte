<script lang="ts">
	import type { ParkingAvailabilityRecord } from '../datasets/stavanger-parkering/ParkingAvailabilityRecord';
	import ParkeringReportElement from './ParkeringReportElement.svelte';

	export let items: ParkingAvailabilityRecord[];

	const options: Intl.DateTimeFormatOptions = {weekday: 'long', hour: '2-digit', minute:'2-digit'};

	const formatDateStringAsString = (arg: string): string => new Date(arg).toLocaleTimeString("no", options);

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
	<p>Sist oppdatert {formatDateStringAsString(items[0].timestamp)}</p>
{/if}

<style>
	ul {
		padding: 0;
	}
	li {
		list-style: none;
	}
</style>
