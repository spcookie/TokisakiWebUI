<script setup>
import {getAllRobot} from "~/api/robot.js"

const {data} = await getAllRobot()

</script>

<template>
      <BotList v-if="data" :list="data"></BotList>
</template>