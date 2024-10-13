<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, NInput, NSelect, NLayoutSider, SelectOption } from 'naive-ui'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore, useKeyStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore } from '@/components/common'
// import { changeService } from '@/utils/request/axios'
// const dialog = useDialog()
// const downloadText = ref(' 下载')
const appStore = useAppStore()
const chatStore = useChatStore()
const keyStore = useKeyStore()
// const serverOptions = [
//   {
//     label: '主usa-1',
//     value: 'http://34.134.159.84:3001/api'
//   },
//   {
//     label: '备usa-2',
//     value: 'http://34.172.213.130:3001/api'
//   },
//   {
//     label: '备tw-1',
//     value: 'http://35.201.195.230:3001/api'
//   }]
const typeOptions = [
  {
    label: 'GPT3.5turbo',
    value: 'text'
  },
  {
    label: 'AI绘画',
    value: 'image'
  }]
// const updateServer = (value: string, option: SelectOption) => {
//   changeService(value)
//   keyStore.setServer(value)
//   window.$message?.success('服务器已更换为：' + option.label)
// }


const updateType = (value: string, option: SelectOption) => {
  keyStore.setType(value)
  window.$message?.success('当前聊天已更换为：' + option.label)
}

const { isMobile } = useBasicLayout()
const show = ref(false)
const chatKey = ref(keyStore.chatKey)

const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: '新的对话', uuid: Date.now(), isEdit: false })
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}
const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
  <NLayoutSider :collapsed="collapsed" :collapsed-width="0" :width="260" :show-trigger="isMobile ? false : 'arrow-circle'"
    collapse-mode="transform" position="absolute" bordered :style="getMobileClass"
    @update-collapsed="handleUpdateCollapsed">
    <div class="flex flex-col h-full" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <NButton dashed block @click="handleAdd">
            新建对话
          </NButton>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>
        <div class="ml-7 mb-4 flex" v-if="!isMobile">
          <span>卡密：</span>
          <div class="w-[172px] flex">
            <NInput v-model:value="chatKey" clearable size="small" placeholder="请输入卡密" />
            <NButton type="primary" size="small" @click="keyStore.recordState(chatKey.trim())">
              确定
            </NButton>
          </div>

        </div>
        <div class="ml-7 mb-4 flex font-bold">
          <span>剩余提问字数：</span>
          <div class="w-[120px]">
            {{ keyStore.count }}
          </div>
        </div>
        <div class="ml-7 mb-4">
          <span>累计访问人数：</span>
          <span>{{ keyStore.ipCount }}</span>
        </div>
        <!-- <div class="ml-7 flex items-center mb-4">
          <span class="w-[90px] text-[blue]">切换服务器：</span>
          <NSelect style="width: 120px" :value="keyStore.serverUrl" :options="serverOptions"
            @update:value="updateServer" />
        </div> -->
        <div class="ml-7 flex items-center">
          <span class="w-[90px] text-[blue]">切换模型：</span>
          <NSelect style="width: 120px" :value="keyStore.type" :options="typeOptions" @update:value="updateType" />
        </div>
        <div class="p-4">
          <NButton block @click="show = true">
            对话商城
          </NButton>
        </div>
      </main>
      <Footer />
    </div>
  </NLayoutSider>
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 bg-black/40" @click="handleUpdateCollapsed" />
  </template>
  <PromptStore v-model:visible="show" />
</template>
