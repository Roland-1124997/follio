const { UMAMI_API_KEY } = useRuntimeConfig();

const headers = { "x-umami-api-key": UMAMI_API_KEY};
const baseUrl = `https://api.umami.is/v1/websites/d10b0ef2-b433-4f78-8f78-724e711e541a`;

export const useFetchMetrics = defineCachedFunction(async (key: string, query: AnalyticsQuery) => {

    const url = `${baseUrl}/metrics/expanded`

    let data: Record<string, any> | null = null;
    let error = null;

    try { data = await $fetch(url, { headers, query }) }
    catch (err) { error = err }

    return { data, error };

}, {
    maxAge: 60 * 10,
    name: 'analytics',
    getKey: (key: string, query: AnalyticsQuery) => (`key-${key}-${query.timezone.split('/').join('-')}`)
})

export const useFetchAnalytics = defineCachedFunction(async (key: string, query: AnalyticsQuery) => {

    const url = `${baseUrl}/stats`

    let data: Record<string, any> | null = null;
    let error = null;
    
    try { data = await $fetch(url, { headers, query }) } 
    catch (err) { error = err }

    return { data, error };

},{
    maxAge: 60 * 10,
    name: 'analytics',
    getKey: (key: string, query: AnalyticsQuery) => (`key-${key}-${query.timezone.split('/').join('-')}`)
});

