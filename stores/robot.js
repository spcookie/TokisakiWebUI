export const useRobotStore = defineStore('robot', () => {
    const botInfos = ref()
    const botStates = ref()

    function initBotInfos(infos) {
        botInfos.value = infos
        botStates.value = infos.records.map(v => v.state.key)
    }

    return {
        botInfos,
        botStates,
        initBotInfos
    }
})