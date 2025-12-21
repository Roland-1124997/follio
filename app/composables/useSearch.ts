import type { LocationQueryValue } from 'vue-router';

const search = ref<string | null>(null);

export const useSearch = () => {

    const router = useRouter();
    const route = useRoute();

    search.value = route.query.search as string || null;

    watch(() => route.path, () => {
        search.value = null
    });

    const setSearch = (value: string | LocationQueryValue[] | null) => {

        if (!value) {
            search.value = null;

            const query = { ...route.query };
            delete query.search;

            router.replace({ query });
        }

        else {
            search.value = value as string;
            router.replace({ query: { ...route.query, search: value } });
        }
    }


    const context = (path: string) => searchConfig.find(config => config.path === path);

    return {
        search,
        setSearch,
        context
    };

};


type SearchConfig = {
    path: string;
    label: string;
    placeholder: string;
}

const searchConfig: SearchConfig[] = [
    {
        path: "/articles",
        label: "Zoek in artikelen",
        placeholder: "Zoek artikelen...",
    },
    {
        path: "/storage",
        label: "Zoek in bestanden",
        placeholder: "Zoek bestanden...",
    },
    {
        path: "/notifications",
        label: "Zoek in notificaties",
        placeholder: "Zoek notificaties...",
    }
]

