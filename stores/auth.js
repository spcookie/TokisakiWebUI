import {useLocalStorage} from "@vueuse/core"
import { skipHydrate } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const token = useLocalStorage('Token', '')

    async function loadUserInfo(t) {
        token.value = t
        return Promise.resolve()
    }

    return {
        token: skipHydrate(token),
        loadUserInfo
    }
})