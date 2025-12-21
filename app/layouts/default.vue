<template>
	<div class="fixed flex w-full h-screen overflow-hidden bg-gray-50">
		<aside :class="['fixed inset-y-0 left-0 z-[60] w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0', isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full']">
			<div class="flex flex-col h-full">
				<div class="flex items-center justify-between h-16 px-4 border-b">
					<div class="flex items-center space-x-3">
						<div class="flex items-center justify-center w-8 h-8 bg-black rounded-lg">
							<Icon name="akar-icons:briefcase" class="w-5 h-5 text-white" />
						</div>
						<h1 class="text-xl font-bold text-gray-800"> Dashboard </h1>
					</div>

					<button @click="isMobileMenuOpen = false" class="flex items-center justify-center p-2 rounded-lg lg:hidden hover:bg-gray-100">
						<Icon name="akar-icons:cross" class="w-5 h-5" />
						<span class="sr-only">Sluit menu</span>
					</button>
				</div>

				<nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
					<NuxtLink to="/" class="flex items-center gap-3 px-3 py-2 text-gray-700 transition-colors rounded-lg hover:bg-blue-100 hover:text-blue-800" @click="isMobileMenuOpen = false">
						<Icon name="akar-icons:home" class="w-5 h-5" />
						<span>Dashboard</span>
					</NuxtLink>

					<NuxtLink to="/articles" class="flex items-center gap-3 px-3 py-2 text-gray-700 transition-colors rounded-lg hover:bg-blue-100 hover:text-blue-800" @click="isMobileMenuOpen = false">
						<Icon name="akar-icons:newspaper" class="w-5 h-5" />
						<span>Artikelen</span>
					</NuxtLink>

					<NuxtLink to="/storage" class="flex items-center gap-3 px-3 py-2 text-gray-700 transition-colors rounded-lg hover:bg-blue-100 hover:text-blue-800" @click="isMobileMenuOpen = false">
						<Icon name="akar-icons:folder" class="w-5 h-5" />
						<span>Storage</span>
					</NuxtLink>

					<NuxtLink to="/notifications" class="flex items-center gap-3 px-3 py-2 text-gray-700 transition-colors rounded-lg hover:bg-blue-100 hover:text-blue-800" @click="isMobileMenuOpen = false">
						<Icon name="akar-icons:inbox" class="w-5 h-5" />
						<span class="flex-1">Notificaties</span>
						<span v-if="notificationsStore.unseen > 0" class="px-2 py-0.5 flex items-center justify-center text-xs font-medium text-white bg-red-600 rounded-full">
							{{ notificationsStore.unseen }}
						</span>
					</NuxtLink>

					<NuxtLink to="/profile" class="flex items-center gap-3 px-3 py-2 text-gray-700 transition-colors rounded-lg hover:bg-blue-100 hover:text-blue-600" @click="isMobileMenuOpen = false">
						<Icon name="akar-icons:person" class="w-5 h-5" />
						<span>Profiel</span>
					</NuxtLink>
				</nav>

				<div class="p-3 border-t">
					<button @click="logout" class="flex items-center w-full gap-3 px-3 py-2 text-gray-700 transition-colors rounded-lg hover:bg-red-50 hover:text-red-600">
						<Icon name="akar-icons:door" class="w-5 h-5" />
						<span>Uitloggen</span>
					</button>
				</div>
			</div>
		</aside>

		<div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"></div>

		<div class="flex flex-col flex-1 w-full overflow-hidden">
			<header class="z-40 flex items-center justify-between h-16 px-4 bg-white border-b lg:px-6">
				<div class="flex items-center gap-4">
					<button @click="isMobileMenuOpen = true" class="flex items-center justify-center p-2 rounded-lg lg:hidden hover:bg-gray-100">
						<Icon name="akar-icons:text-align-justified" class="w-5 h-5" />
						<span class="sr-only">Open menu</span>
					</button>

					<Breadcrumbs />
				</div>
				<div class="sticky top-0 left-0 flex items-center justify-between w-full gap-2 p-1"></div>

				<div class="flex items-center gap-2 md:hidden">
					<UtilsButton @click="notificationsStore.requestPermission()" to="/notifications" iconName="akar-icons:inbox" :options="{ count: notificationsStore.unseen }" />
				</div>
			</header>

			<div class="hidden">
				<label class="sr-only" for="file">file</label>
				<input id="file" ref="inputRef" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar" @change="handleFileSelect" class="sr-only" />
			</div>

			<div v-if="config" :class="config.path == '/notifications' ? ' flex-col h-[6.8rem] pt-[0.67rem]' : 'h-16 items-center justify-between'" class="z-40 flex gap-2 px-4 bg-white border-b lg:px-4">
				<UtilsInputSearch name="search" :label="config.label" :placeholder="config.placeholder" />
				<UtilsButtonImportant v-if="config.path == '/articles'" to="/articles/compose" icon-name="akar-icons:edit" description="Nieuw artikel schrijven" />
				<UtilsButtonImportant v-if="config.path == '/storage'" @click="triggerFileSelect" icon-name="akar-icons:cloud-upload" description="Bestanden uploaden" :isButton="true" />
				<UtilsButtonImportant v-if="config.path == '/storage'" @click="storageStore.refresh" icon-name="akar-icons:arrow-right-left" description="Bestanden synchroniseren" :isButton="true" />

				<div v-if="config.path == '/notifications'" class="flex items-center gap-[0.35rem]">
					<UtilsButtonImportant to="/compose" icon-name="akar-icons:edit" description="Nieuw bericht schrijven" :isSmall="true" />

					<button type="button" @click="setFilter('all')" :class="['flex items-center justify-center gap-2 px-4 py-[0.60rem] md:py-2 text-sm font-medium transition-colors duration-200 border rounded-lg outline-none w-fit focus:outline-none focus:ring-2', filter === 'all' ? 'bg-neutral-100 text-neutral-800 border-neutral-400 focus:ring-neutral-400' : 'text-gray-700 bg-white border-gray-300 hover:bg-neutral-50 hover:text-neutral-600 focus:text-neutral-600 focus:border-neutral-500 hover:border-neutral-500 focus:ring-neutral-400']" aria-label="Toon alle berichten">
						<icon name="akar-icons:filter" class="w-4 h-4" aria-hidden="true" />
						<span class="hidden md:flex">Alles</span>
					</button>

					<button type="button" @click="setFilter('gelezen')" :class="['flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg outline-none focus:outline-none focus:ring-2', filter === 'gelezen' ? 'bg-blue-100 text-blue-800 border-blue-400 focus:ring-blue-300' : 'text-gray-700 bg-white border-gray-300 hover:bg-blue-50 hover:text-blue-600 focus:text-blue-600 focus:border-blue-500 hover:border-blue-500 focus:ring-blue-300']" aria-label="Zoek gelezen berichten">
						<icon name="akar-icons:open-envelope" class="w-4 h-4" aria-hidden="true" />
						<span> Gelezen </span>
					</button>

					<button type="button" @click="setFilter('ongelezen')" :class="['flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg outline-none focus:outline-none focus:ring-2', filter === 'ongelezen' ? 'bg-red-100 text-red-800 border-red-400 focus:ring-red-300' : 'text-gray-700 bg-white border-gray-300 hover:bg-red-50 focus:text-red-600 hover:text-red-600 focus:border-red-500 hover:border-red-500 focus:ring-red-300']" :aria-pressed="filter === 'ongelezen'" aria-label="Zoek ongelezen berichten">
						<icon name="akar-icons:envelope" class="w-4 h-4" aria-hidden="true" />
						<span> Ongelezen </span>
					</button>
				</div>
			</div>

			<main class="flex-1 p-4 overflow-y-auto bg-white">
				<div class="mx-auto max-w-7xl">
					<UtilsDotPattern class="z-0 opacity-60" :width="20" :height="20" :cx="1" :cy="1" :cr="1" />

					<slot></slot>
				</div>
			</main>
		</div>

		<UtilsToast />
		<div class="fixed z-50 w-screen h-screen pointer-events-none">
			<div class="pointer-events-auto">
				<Modal />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const route = useRoute();
	const current = ref(route.path);

	const { context } = useSearch();
	const { filter, setFilter } = useFilter();

	const config = computed(() => {
		current.value = route.path;
		return context(current.value);
	});

	const { addToast } = useToast();
	const isMobileMenuOpen = ref(false);

	const store = useSessionsStore();
	const storageStore = useStorageStore();
	const notificationsStore = useNotificationsStore();

	const inputRef = ref<HTMLInputElement | null>(null);

	const triggerFileSelect = () => inputRef.value?.click();

	const handleFileSelect = async (event: Event) => {
		const input = event.target as HTMLInputElement;

		if (input.files) {
			await storageStore.upload(input.files);
			input.value = "";
		}
	};

	await storageStore.initialPayload();
	await notificationsStore.initialPayload();

	const { close: closeNotifications } = await notificationsStore.realTime();

	const Request = useApiHandler<ApiResponse<any>>("/api/auth/logout");

	const logout = async () => {
		const { data, error } = await Request.Post();

		if (error)
			return addToast({
				message: "Er is een fout opgetreden bij het uitloggen",
				type: "error",
			});

		const redirect = data.status.redirect;
		store.clearSession();

		addToast({
			message: "Je bent succesvol uitgelogd",
			type: "success",
		});

		return navigateTo(redirect);
	};

	onUnmounted(() => {
		closeNotifications();
	});
</script>

<style scoped>
	.router-link-active {
		@apply text-blue-800 bg-blue-100 hover:bg-blue-100;
	}
</style>
