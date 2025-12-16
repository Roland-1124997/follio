<template>
	<Form :validation-schema="schema" @submit="handleSubmit" class="space-y-6">
		<slot :loading="loading"></slot>
	</Form>
</template>

<script setup lang="ts">

	const { request, appendToBody } = defineProps<{
		schema: SchemaType;
		request: requestOptions<any>;
		appendToBody?: (values: Record<string, unknown>) => Promise<Record<string, unknown>>
	}>();

	const { loading, handleSubmit } = useHandleForm(request, appendToBody);

</script>
