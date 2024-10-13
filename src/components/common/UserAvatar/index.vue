<script setup lang='ts'>
import { computed, h } from 'vue'
import { NAvatar, useDialog } from 'naive-ui'
import { useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'
import qq_min from '@/assets/qq_min.jpg'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const dialog = useDialog()
const showBuy = () => {
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
        }, ['获取卡密链接: ', h('a', {
          href: 'https://dwz.cn/EgY7bwVr',
          target: '_blank',
          style: {
            color: 'blue',
            textDecoration: 'underline',
          },
        }, 'https://dwz.cn/EgY7bwVr')]),
        h('p', [h('span', { style: { color: 'red ' } }, '遇到问题请先刷新网页!')]),
        // h('p', [h('span', { style: { color: 'red ' } }, '为了不迷路，请在右侧下载客户端!')]),
        // window.location.hostname === 'gitopenchina.gitee.io'
        //   ? [h('span', { style: { color: 'red ' } }, '为了稳定与速度请尽快收藏与访问永久域名：'), h('a', {
        //       href: 'http://newb.site/chatpay',
        //       target: '_self',
        //       style: {
        //         color: 'blue',
        //         fontSzie: '18px',
        //         textDecoration: 'underline',
        //       },
        //     }, 'http://newb.site/chatpay')]
        //   : '',
      ]),
    ]),
    positiveText: 'OK',
  })
}
const showWechat = () => {
  dialog.success({
    title: '联系作者',
    content: () => h('img', {
      src: qq_min,
      width: '400',
    }),
    positiveText: 'OK',
  })
}
</script>

<template>
  <div class="flex items-center overflow-hidden">
    <div class="overflow-hidden rounded-full shrink-0">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <span class="text-[32px] dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" width="1em" height="1em">
            <path
              d="M29.71,13.09A8.09,8.09,0,0,0,20.34,2.68a8.08,8.08,0,0,0-13.7,2.9A8.08,8.08,0,0,0,2.3,18.9,8,8,0,0,0,3,25.45a8.08,8.08,0,0,0,8.69,3.87,8,8,0,0,0,6,2.68,8.09,8.09,0,0,0,7.7-5.61,8,8,0,0,0,5.33-3.86A8.09,8.09,0,0,0,29.71,13.09Zm-12,16.82a6,6,0,0,1-3.84-1.39l.19-.11,6.37-3.68a1,1,0,0,0,.53-.91v-9l2.69,1.56a.08.08,0,0,1,.05.07v7.44A6,6,0,0,1,17.68,29.91ZM4.8,24.41a6,6,0,0,1-.71-4l.19.11,6.37,3.68a1,1,0,0,0,1,0l7.79-4.49V22.8a.09.09,0,0,1,0,.08L13,26.6A6,6,0,0,1,4.8,24.41ZM3.12,10.53A6,6,0,0,1,6.28,7.9v7.57a1,1,0,0,0,.51.9l7.75,4.47L11.85,22.4a.14.14,0,0,1-.09,0L5.32,18.68a6,6,0,0,1-2.2-8.18Zm22.13,5.14-7.78-4.52L20.16,9.6a.08.08,0,0,1,.09,0l6.44,3.72a6,6,0,0,1-.9,10.81V16.56A1.06,1.06,0,0,0,25.25,15.67Zm2.68-4-.19-.12-6.36-3.7a1,1,0,0,0-1.05,0l-7.78,4.49V9.2a.09.09,0,0,1,0-.09L19,5.4a6,6,0,0,1,8.91,6.21ZM11.08,17.15,8.38,15.6a.14.14,0,0,1-.05-.08V8.1a6,6,0,0,1,9.84-4.61L18,3.6,11.61,7.28a1,1,0,0,0-.53.91ZM12.54,14,16,12l3.47,2v4L16,20l-3.47-2Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </template>
      <template v-else>
        <NAvatar size="large" round :src="defaultAvatar" />
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2">
      <!-- <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
            打赏作者
          </h2> -->
      <p
        class="ml-4 overflow-hidden text-blue-500 font-bold text-base text-ellipsis whitespace-nowrap underline cursor-pointer"
        @click="showBuy"
      >
        获取卡密
      </p>
      <p
        class="ml-4 overflow-hidden text-blue-500 font-bold text-base text-ellipsis whitespace-nowrap underline cursor-pointer"
        @click="showWechat"
      >
        联系管理员
      </p>
    </div>
  </div>
</template>
