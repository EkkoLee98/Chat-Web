import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post, post2, get } from '@/utils/request'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal,
    chatKey: string,
    type: string,
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  return post2<T>({
    url: '/chat-process',
    data: { prompt: params.prompt, type: params.type, options: params.options, key: params.chatKey },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}
export function getKeyCount<T>(key: string) {
  return post<T>({
    url: '/get-count',
    data: { key },
  })
}

