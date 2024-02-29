<script setup>
import {getDriveId, refreshCode} from "~/api/login.js";
import {useAuthStore} from "~/stores/auth.js";

definePageMeta({
  layout: false
})

const runtimeConfig = useRuntimeConfig()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const cookie = useCookie('token')

const code = ref('')

try {
  const token = cookie.value
  if (token) {
    await getDriveId()
  }
} catch (ignore) {
}

const eventSource = new EventSource(`${runtimeConfig.public.baseURL}/wx/subscript`, {withCredentials: true})

eventSource.addEventListener('open', () => {
  console.log('login sse connection opened')
})

eventSource.addEventListener('message', async (event) => {
  const [tag, value] = event.data.split('#')
  if (tag === 'start' || tag === 'refresh') {
    code.value = value
  } else if (tag === 'end') {
    await authStore.loadUserInfo(value)
    router.replace({path: route.query.redirect})
  }
})

eventSource.addEventListener('error', (event) => {
  if (event.eventPhase === EventSource.CLOSED) {
    eventSource.close()
  } else {
    console.log('login sse connection error', event)
  }
})

const refreshing = ref(false)
const refreshQRCode = async () => {
  try {
    refreshing.value = true
    await refreshCode()
    refreshing.value = false
  } catch (ignore) {
    refreshing.value = false
  }
}

</script>

<template>
  <div class="flex h-screen">
    <UCard class="m-auto w-1/2">
      <div class="flex flex-col space-y-0.5">
        <div>
          <img class="m-auto" src="~/assets/qrcode.jpg" alt="微信公众号二维码">
        </div>
        <div class="text-center">
          Silence Moon
        </div>
        <div class="text-center">
          关注微信公众号，输入验证码登录
        </div>
        <div class="flex justify-center">
          <UBadge v-if="code !== ''" color="green" variant="subtle" size="lg" class="text-2xl">{{ code }}</UBadge>
          <UButton
              icon="i-heroicons-arrow-path"
              size="sm"
              color="green"
              variant="link"
              :loading="refreshing"
              @click="refreshQRCode"
          />
        </div>
      </div>

    </UCard>
  </div>
</template>

<style scoped>

</style>