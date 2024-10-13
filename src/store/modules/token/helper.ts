export function getLocalState() {
  const chatKey = localStorage.getItem('chatKey')
  return {
    chatKey: chatKey || '',
    count: 0,
    ipCount: 0,
    serverUrl: 'http://34.134.159.84:3001/api',
    type: 'text',
    showVersion: true,
    versionInfo: {
      version: '1.0.2',
      winurl: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/app/chatgpt_setup_v1.0.2_win-x64.exe',
      macurl: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/app/chatgpt_setup_v1.0.2_mac-arm64.dmg',
      macurl_intel: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/app/chatgpt_setup_v1.0.1_mac-x64.dmg'    
    }
  }
}

export function setLocalState(chatKey: string) {
  localStorage.setItem('chatKey', chatKey)
}

