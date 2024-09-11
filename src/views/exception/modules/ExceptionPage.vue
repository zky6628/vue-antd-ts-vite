<template>
  <div class="exception">
    <div class="img">
      <img :src="config.img" />
    </div>
    <div class="content">
      <h1>{{ config.title }}</h1>
      <div class="desc">{{ config.desc }}</div>
      <div class="action">
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import types from '../type'
import type { IConfig } from '../types/index.types'

interface IProps {
  type?: '403' | '404' | '500'
}

const props = withDefaults(defineProps<IProps>(), {
  type: '404'
})

let pageConfig = types[props.type]
const router = useRouter()
const handleToHome = () => {
  router.replace({ name: 'home' })
}

const config = reactive<IConfig>(pageConfig)
</script>

<style lang="less" scoped>
.exception {
  align-items: center;
  height: 80%;
  min-height: 500px;
  padding-top: 150px;
  text-align: center;

  .img {
    display: inline-block;
    padding-right: 52px;
    zoom: 1;

    img {
      max-width: 430px;
      height: 360px;
    }
  }

  .content {
    display: inline-block;
    flex: auto;

    h1 {
      margin-bottom: 24px;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      color: #434e59;
    }

    .desc {
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 28px;
      color: rgb(0 0 0 / 45%);
    }
  }
}

.mobile {
  .exception {
    margin-top: 30px;

    .img {
      padding-right: unset;

      img {
        max-width: 80%;
        height: 40%;
      }
    }
  }
}
</style>
