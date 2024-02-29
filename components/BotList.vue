<script setup>
const props = defineProps(['list'])

const botInfos = props.list.records

const commonDropDown = [[{
  label: ''
}]]

for (let botInfo of botInfos) {
  let dropdown = []
  if (botInfo.state.value !== '114.04') {
    dropdown.push([{
      label: '上线',
      click: async () => {
        await navigateTo(`/robot/qr/${botInfo.id}`, {
          open: {
            target: '_blank',
            windowFeatures: {
              width: 500,
              height: 500
            }
          }
        })
      }
    }])
  }
  botInfo.dropdown = dropdown
}

</script>

<template>
  <div class="flex flex-col space-y-3">
    <div v-for="item in botInfos">
      <UCard>
        <div class="flex justify-between items-center">
          <div class="basis-4/12">
            <h2 class="antialiased">{{ item.name }}</h2>
            <div>
              <UBadge size="xs" variant="soft">{{ item.type.key }}</UBadge>
            </div>
          </div>
          <div class="basis-1/12">
            <p>
              <!--                            <Dot color="green" />-->
              <span>{{ item.state.key }}</span>
            </p>
            <!--                        <p>{{ 'item.time' }}</p>-->
          </div>
          <div class="basis-3/12">
            <div class="flex items-center space-x-1">
              <UIcon name="i-heroicons-information-circle"/>
              <span>{{ item.remark }}</span>
            </div>
          </div>
          <div class="basis-3/12">
            <ul class="flex space-x-3">
              <li>
                <div class="space-x-1">
                  <UBadge color="gray" variant="solid">
                    <UIcon name="i-heroicons-cube-transparent"/>
                  </UBadge>
                  <span>{{ item.functions.length }}</span>
                </div>
              </li>
              <li>
                <div class="space-x-1">
                  <UBadge color="gray" variant="solid">
                    <UIcon name="i-heroicons-code-bracket"/>
                  </UBadge>
                  <span>{{ item.cmdPrefix }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="basis-1/12 flex justify-end">
            <UDropdown :items="item.dropdown" :popper="{ placement: 'bottom-start' }">
              <UButton color="white" trailing-icon="i-heroicons-ellipsis-horizontal"/>
            </UDropdown>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>