const whitelist = ['/login']

export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return
    if (!whitelist.includes(to.path)) {
        if (!window.localStorage.getItem('Token')) {
            return navigateTo({
                path: '/login',
                query: {
                    redirect: from.fullPath
                }
            })
        }
    }
})
