<template>
	<div class="overflow-auto" role="region" :aria-label="`${title} tabel`">
		<table class="w-full table-auto min-w-[640px]" role="table" :aria-label="`${title} statistieken`">
			<caption class="sr-only">
				{{ title }} statistieken overzicht met {{ headers.map((h) => h.name).join(", ") }}
			</caption>
			<thead>
				<tr class="text-left border-b-2 border-gray-200">
					<th scope="col" class="sticky left-0 pt-2 pb-4 pr-4 text-sm font-bold tracking-wide text-gray-900 uppercase bg-white md:pr-6">
						{{ title }}
					</th>
					<th v-for="value in headers" :key="value.name" scope="col" class="pt-2 pb-4 pr-2 text-sm font-bold tracking-wide text-right uppercase md:pr-6" :style="{ color: value.color }">
						{{ value.name }}
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				<tr v-for="page in data" :key="page.path" class="group hover:bg-gray-50">
					<th scope="row" class="py-3 pr-2 font-medium text-gray-900 bg-white first:pr-0 first:sticky first:left-0 first:z-20 md:py-4 md:pr-6 group-hover:text-gray-950 group-hover:bg-gray-50">
						<div class="flex items-center gap-1 md:gap-2">
							<span class="pl-2 text-xs md:text-sm">{{ page.label }}</span>
						</div>
					</th>
					<td v-for="header in headers" :key="header.name" class="py-3 pr-4 text-right md:py-4 md:pr-6" :data-label="header.name">
						<span class="inline-flex items-center justify-center min-w-[2.5rem] md:min-w-[3rem] px-1.5 md:px-2.5 py-0.5 md:py-1 text-xs md:text-sm font-semibold rounded-md transition-all group-hover:brightness-95" :style="{ backgroundColor: `${header.color}10`, color: header.color }" role="text">
							{{ page[header.name.toLowerCase()] }}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts" setup>
	const { data, categories } = defineProps({
		data: {
			type: Object as () => Record<string, any>[],
			required: true,
		},
		title: {
			type: String,
			default: "Table",
		},
		categories: {
			type: Object as () => Record<string, { name: string; color: string }>,
			required: true,
		},
	});

	const headers = Object.values(categories).map((category) => {
		return category;
	});
</script>
