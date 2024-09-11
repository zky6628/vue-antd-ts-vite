export interface Servers {
  /**
   * 当前服务
   */
  server: string
}

export interface ApiServers {
  /**
   * DEV: Development System，开发系统
   */
  DEV: Servers
  /**
   * QAS: Quality Assurance System，质量保证系统
   */
  QAS: Servers
  /**
   * UAT: User Acceptance Test，用户验收测试
   */
  UAT: Servers
  /**
   * PRD: Production System，生产系统
   */
  PRD: Servers
}
