<script setup lang="ts">
import {getLoginCode} from "~/api/robot"

definePageMeta({
  layout: false
})

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const {data: code} = await getLoginCode(route.params.id)

const qrUrl = ref('')
const qrStatus = ref('')

const eventSource = new EventSource(`${runtimeConfig.public.baseURL}/robot/qq/login/${code.value}`, {withCredentials: true})

eventSource.addEventListener('open', () => {
  console.log('qq qr login sse connection opened')
})

eventSource.addEventListener('message', async (event) => {
  const [tag, value] = event.data.split('#')
  if (tag === 'qr') {
    const base64 = atob(value)
    let n = base64.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = base64.charCodeAt(n)
    }
    let blob = new Blob([u8arr], {type: "image/png"})
    let fileReader = new FileReader()
    fileReader.readAsDataURL(blob);
    fileReader.onload = (event) => {
      if (event.target != null) {
        qrUrl.value = event.target.result as string
      }
    }
    qrStatus.value = '扫码以登录'
  } else if (tag === 'waiting_confirm') {
    qrStatus.value = '待手机上确认'
  } else if (tag === 'confirmed') {
    qrStatus.value = '登录中'
  } else if (tag === 'cancelled') {
    qrStatus.value === '取消登录'
  } else if (tag === 'qr_timeout') {
    qrStatus.value = '二维码超时'
  } else if (tag === 'login_timeout') {
    qrStatus.value === '登录超时'
  } else if (tag === 'success') {
    qrStatus.value = '登录成功'
  } else if (tag === 'fail') {
    qrStatus.value = '登录失败'
  }
})

eventSource.addEventListener('error', (event) => {
  if (event.eventPhase === EventSource.CLOSED) {
    eventSource.close()
  } else {
    console.log('qq qr login sse connection error', event)
  }
})

</script>

<template>
  <div class="flex h-screen">
    <UCard class="m-auto w-1/2">
      <div class="flex flex-col space-y-0.5">
        <div>
          <NuxtImg v-if="qrUrl != ''" class="m-auto" :src="qrUrl" placeholder alt="二维码" sizes="50vw"/>
        </div>
        <div class="text-center">
          {{ qrStatus }}
        </div>
      </div>
    </UCard>
  </div>

</template>

<style scoped>

</style>