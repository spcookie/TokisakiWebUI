<script setup>
const links = [
  {
    label: '机器人',
    icon: 'i-heroicons-cube',
    to: '/robot',
  },
  {
    label: '功能配置',
    icon: 'i-heroicons-rocket-launch',
    to: '/a'
  },
  {
    label: '仪表板',
    icon: 'i-heroicons-presentation-chart-line',
    to: '/b'
  }]

const items = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }]
]
</script>

<template>
  <div>
    <div class="border-b border-gray-200 dark:border-gray-800">
      <div class="flex justify-between items-center mx-10">
        <UHorizontalNavigation :links="links" />
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <!-- <UButton color="white" label="用户" trailing-icon="i-heroicons-chevron-down-20-solid" /> -->
          <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />
        </UDropdown>
      </div>
    </div>
    <UContainer class="mt-4">
      <slot />
    </UContainer>
  </div>
</template>
  