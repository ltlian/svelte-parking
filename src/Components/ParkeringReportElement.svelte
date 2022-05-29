<script lang="ts">
	export let item: ParkeringReportItem;
</script>

<div>
	<span>
		<a
			href="https://www.google.com/maps/search/?api=1&query={item.Latitude}%2C{item.Longitude}"
			title="Vis i google maps"
		>
			{item.Sted}
		</a>
	</span>
	<span>
		{item.Antall_ledige_plasser}
	</span>
</div>

<style>
	div {
		display: flex;
		justify-content: space-between;
	}
</style>
