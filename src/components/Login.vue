<script setup>
import {onBeforeMount, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import useGetGlobalProperties from "../hook/useGlobal.js";
import md5 from "js-md5"
import {ElMessage} from "element-plus";

const globalProperties = useGetGlobalProperties()
const router = useRouter()
const route = useRoute()
const user = ref('')
const password = ref('')
const host = 'https://server.asgardion.space'
const yan = ref('')

onBeforeMount(() => {
  fetch('https://v1.hitokoto.cn/?c=j&c=e&c=i&c=k&min_length=17')
      .then(response => response.json())
      .then(data => {
        yan.value = data.hitokoto;
      })
      .catch(console.error)
})

function login() {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/users/${user.value}`, requestOptions)
      .then(response => response.json())
      .then(data => {
            if (data.id === user.value) {   // 验证是否存在该用户return data
            } else {
              throw new Error("用户名不存在～")
            }
            if (data.password === md5(password.value)) {
              ElMessage({
                message: data.username+", 欢迎来到思量DAO",
                type: 'success',
              })
              globalProperties.$userInfo.value = data;
              globalProperties.$station.value = true;
              localStorage.setItem("id", data.id);
            } else {
              throw new Error("密码错误～")
            }
          }
      )
      .catch(err => ElMessage({
        message: err,
        type: 'error',
        // 赋默认值
      }))
  globalProperties.$allHas.value = localStorage.getItem('allHas')
}
</script>

<template>
  <el-avatar id="photo"
             :src="globalProperties.$avator.value"/>
  <el-divider style="margin-top: 45%; margin-bottom: 12px" border-style="dashed" content-position="left"/>
  <el-row>
    <el-input v-model="user" placeholder="用户名" clearable/>
  </el-row>
  <el-row>
    <el-col>
      <el-input
          v-model="password"
          type="password"
          placeholder="密码"
          show-password
      />
    </el-col>
  </el-row>
  <el-row style="line-height: 34px;font-weight: bolder; font-size: 16px;height: 74px;overflow: auto">
    <span v-text="yan" id="yiyan"></span>
  </el-row>
  <el-divider style="margin:12px 0 !important;"/>
  <div id="operate">
    <el-button type="primary" size="large" @click="login(true)">登录</el-button>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 10px;
}

#operate {
  text-align: right;
}

#yiyan {
  margin: 3px 0 3px 0;
  color: #666666;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
</style>
