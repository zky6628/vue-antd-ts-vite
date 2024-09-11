<!-- <script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomeTest'
})
</script> -->
<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import { theme } from 'ant-design-vue'
import { fetchRoleList } from '@/services/role'

const { useToken } = theme
const { token } = useToken()
const test = () => {
  fetchRoleList({ code: 'test' })
}
</script>

<template>
  <main>
    <TheWelcome />
    <div :style="{ backgroundColor: token.colorPrimary }" @click="$router.push('/login')">吸食</div>
    <a-button type="primary" @click="test">哈哈</a-button>
    <a-date-picker></a-date-picker>
  </main>
</template>
@/services/role/role