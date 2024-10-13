<script setup lang="ts">
import { NaiveProvider } from '@/components/common'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { useRoute } from 'vue-router'
import { useKeyStore } from '@/store'

const route = useRoute()
const { theme, themeOverrides } = useTheme()
const keyStore = useKeyStore()
const { language } = useLanguage()
const { key } = route.query as { key: string };
if (key) {
  keyStore.setChatKey(key)
}
</script>

<template>
  <NConfigProviderNConfigProvider
    class="h-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="language"
  >
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProviderNConfigProvider>
</template>
