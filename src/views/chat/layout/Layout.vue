<script setup lang='ts'>
import { computed, h, onMounted, ref } from 'vue'
import { NButton, NInput, NLayout, NLayoutContent, useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'
import Sider from './sider/index.vue'
// import Permission from './Permission.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAppStore, useChatStore, useKeyStore } from '@/store'
// import group2Img from '@/assets/group2.jpg'
// import group3Img from '@/assets/group3.jpg'
// import group4Img from '@/assets/group4.jpg'
// import keyImg from '@/assets/key.jpg'

const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()
// const authStore = useAuthStore()
const keyStore = useKeyStore()
const dialog = useDialog()

router.replace({ name: 'Chat', params: { uuid: chatStore.active } })

const { isMobile } = useBasicLayout()

const collapsed = computed(() => appStore.siderCollapsed)
const chatKey = ref(keyStore.chatKey)
if (chatKey.value)
  keyStore.recordState(chatKey.value)

// const needPermission = computed(() => !!authStore.session?.auth && !authStore.token)

const getMobileClass = computed(() => {
  if (isMobile.value)
    return ['rounded-none', 'shadow-none']
  return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800']
})

const getContainerClass = computed(() => {
  return [
    'h-full',
    { 'pl-[260px]': !isMobile.value && !collapsed.value },
  ]
})
onMounted(() => {
  // const now = new Date().getTime()
  if (!keyStore.chatKey) {
    dialog.success({
      title: '获取卡密使用，如需帮助请在左下角添加管理员QQxxx',
      content: () => h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '16px',
        },
      },
        [
          h('p', {
            style: {
              textAlign: 'center',
              fontWeight: 'bold',
            },
          }, [
            h('p', {
              style: {
                margin: '20px 0',
              },
            },
              ['获取卡密: ', h('a', {
                href: 'https://dwz.cn/EgY7bwVr',
                target: '_blank',
                style: {
                  color: 'blue',
                  fontSzie: '18px',
                  textDecoration: 'underline',
                },
              }, 'https://dwz.cn/EgY7bwVr')]),
            h('p', [h('span', { style: { color: 'red ' } }, '遇到问题请先刷新网页!')]),
            // h('p', [h('span', { style: { color: 'red ' } }, '为了不迷路，请在右侧下载客户端(手机App稍后推出)')]),
            // window.location.hostname === 'gitopenchina.gitee.io'
            //   ? [h('span', { style: { color: 'red ' } }, '为了稳定与速度请尽快收藏与访问永久域名：'), h('a', {
            //     href: 'http://newb.site/chatpay',
            //     target: '_self',
            //     style: {
            //       color: 'blue',
            //       fontSzie: '18px',
            //       textDecoration: 'underline',
            //     },
            //   }, 'http://newb.site/chatpay')]
            //   : '',
            // h('p', { style: { fontSize: '14px'} },'购买提问字数，字数扣除规则如下: (<= 200字，按实际字数扣除，200—500，扣除(字数/5)字数，>500，扣除(字数/10)字数)，扣除不包含回答字数')
          ]),
        ]),
      positiveText: 'OK',
    })
  }
})
</script>

<template>
  <div class="h-full dark:bg-[#24272e] transition-all" :class="[isMobile ? 'p-0' : 'p-4']">
    <div v-if="!keyStore.chatKey && !isMobile" class="text-[red] text-center text-lg">
      卡密为空，请填入卡密，如需帮助请联系管理员QQxxx
    </div>
    <div v-if="isMobile" class="flex justify-center items-center" :class="[isMobile ? 'pb-0 text-xs' : 'pb-2']">
      <span class="block w-[43px] text-right">卡密:</span>
      <div class="w-[250px] px-2">
        <NInput v-model:value="chatKey" clearable size="small" placeholder="请输入卡密" />
      </div>
      <NButton type="primary" size="small" @click="keyStore.recordState(chatKey.trim())">
        确定
      </NButton>
      <span class="mx-2">{{ isMobile ? '剩余' : '剩余提问字数' }}：{{ keyStore.count }}</span>
      <NButton v-if="!isMobile" type="primary" size="small" @click="keyStore.recordState(chatKey)">
        查询
      </NButton>
      <!-- <div v-if="!isMobile" class="ml-2">
        <span>访问人数：</span>
        <span>{{ keyStore.ipCount }}</span>
      </div> -->
    </div>
    <div class="overflow-hidden" :class="[isMobile ? 'h-[95%]' : 'h-full', ...getMobileClass]">
      <NLayout class="z-40 transition" :class="getContainerClass" has-sider>
        <Sider />
        <NLayoutContent class="h-full">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </NLayoutContent>
      </NLayout>
    </div>
    <!-- <Permission :visible="needPermission" /> -->
  </div>
</template>
