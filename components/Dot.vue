<script setup>
const props = defineProps(['color'])
const bg = [`bg-${props.color ?? green}`]
</script>

<template>
    <div class="rounded-full w-4 h-4" :class="bg"></div>
</template>