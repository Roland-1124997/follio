export default defineNuxtPlugin({
    hooks: {
        'app:beforeMount': async function () {
            const query = useRoute().query;
            if ('itsMe' in query) {
                const { itsMe, ...otherParams } = query;
                navigateTo({ query: otherParams });
                window.localStorage.setItem('umami.disabled', '1');
            }
        },
    },
});