import { defineStore } from 'pinia'
import { getLocalState, setLocalState } from './helper'
import { getKeyCount } from '@/api'

export const useKeyStore = defineStore('key-store', {
  state: () => getLocalState(),
  actions: {

    // updateUserInfo(userInfo: Partial<UserInfo>) {
    //   this.userInfo = { ...this.userInfo, ...userInfo }
    //   this.recordState()
    // },

    setChatKey (key: string) {
      this.chatKey = key
      setLocalState(key)
    },
    setServer (api: string) {
      this.serverUrl = api
    },

    setType (type: string) {
      this.type = type
    },
    setDownloadUrl (info: any) {
      if(info.winurl)
      this.versionInfo.winurl = info.winurl
      if(info.macurl)
      this.versionInfo.macurl = info.macurl
      if(info.macurl_intel)
      this.versionInfo.macurl_intel = info.macurl_intel 
    },

    async recordState(key: string, flag?: boolean) {
      this.chatKey = key
      setLocalState(key)
      // @ts-ignore
      const { count, status, ipCount } = await getKeyCount(key)
      if(status === 'Success') {
        this.count = count as number || 0
        this.ipCount = ipCount as number || 0
        if(!flag) {
          // @ts-ignore
          window.$message?.success('有效的卡密')
        }
      }
    },
  },
})
