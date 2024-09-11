/// <reference types="vite/client" />

type ApiEnv = 'DEV' | 'QAS' | 'UAT' | 'PRD'

interface ImportMetaEnv {
  /**
   * 接口服务环境
   */
  readonly VITE_API: ApiEnv
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}