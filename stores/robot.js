export const useRobotStore = defineStore('robot', () => {
    const count = ref(0)

    return {
        count
    }
})