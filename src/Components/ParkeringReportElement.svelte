<script lang="ts">
	import type { ParkingAvailabilityRecord } from "../datasets/stavanger-parkering/ParkingAvailabilityRecord";
	export let item: ParkingAvailabilityRecord;
</script>

<div>
	<span>
		<a
			href="https://www.google.com/maps/search/?api=1&query={item.coordinates.lat}%2C{item.coordinates.lon}"
			title="Vis i google maps"
		>
			{item.area}
		</a>
	</span>
	<span>
		{item.availableSpaces}
	</span>
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
	}
</style>
