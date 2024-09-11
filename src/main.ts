import '@/assets/style/base.less'

import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import { setRouter } from './router'
// antd组件的按需引入
import Antd from './plugins/antd'
import type { Router } from 'vue-router'

setRouter().then((router: Router) => {
  const app = createApp(App)

  app.use(pinia)
  app.use(router)
  app.use(Antd)

  app.mount('#app')
})
