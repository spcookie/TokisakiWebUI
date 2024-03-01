<script setup>
import {getAllRobot} from "~/api/robot.js"
import {useRobotStore} from "~/stores/robot.js";

const robotStore = useRobotStore()

const {data, refresh} = await getAllRobot()

// robotStore.initBotInfos(unref(data))
// watch(robotStore.botStates, () => {
//   refresh()
// })

</script>

<template>
  <BotList v-if="data" :list="data"></BotList>
</template>