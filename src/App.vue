<template>
  <el-container style="">
    <el-main>
      <el-container>
        <!--主页左侧-->
        <el-aside class="side" width="8vw">

        </el-aside>
        <!--主页中心-->
        <el-main id="articleBody">
          <router-view :key="globalProperties.$reload.value"/>
        </el-main>
        <!--主页右侧-->
        <el-aside class="side" width="30vw">
          <PersonInfo v-if="globalProperties.$station.value"/>
          <LoginCard v-if="!globalProperties.$station.value"/>
          <BlogInfo :key="globalProperties.$reloadHot.value"/>

        </el-aside>
      </el-container>
    </el-main>
    <el-backtop :right="37" :bottom="150">
      <div style="
                  height: 100%;
                  width: 100%;
                  border-radius: 40px;
                  background-color: #FF9671;
                  box-shadow: var(--el-box-shadow-lighter);
                  text-align: center;
                  line-height: 40px;
                  color: #FFE6D6;">
        ⬆
      </div>
    </el-backtop>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import PersonInfo from "./components/PersonInfo.vue";
import LoginCard from "./components/LoginCard.vue";
import useGetGlobalProperties from "./hook/useGlobal.js";
import {ElMessage} from "element-plus";
import BlogInfo from "./components/BlogInfo.vue";

const globalProperties = useGetGlobalProperties()
const id = ref('')
// const station = ref(globalProperties.$reload.value)
const route = useRoute();
const router = useRouter();
const host = 'https://server.asgardion.space'
const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")

function test() {
  let pattern = /"(Main)+|(Page)+"/
  console.log(pattern.test(route.name.toString()))
}

onBeforeMount(() => {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch('https://api.uomg.com/api/rand.avatar?sort=动漫女&format=json', requestOptions)
      .then(response => response.json())
      .then(data => {
        globalProperties.$avator.value = "https://t.mwm.moe/tx";
        console.log(globalProperties.$avator.value)
      })
  globalProperties.$allHas.value=localStorage.getItem('allHas')
  if (localStorage.getItem("id") !== null) {
    globalProperties.$station.value = true;
    fetch(`${host}/users/${localStorage.getItem("id")}`, requestOptions)
        .then(response => response.json())
        .then(data => {
              globalProperties.$userInfo.value = data;
            }
        )
        .catch(err => ElMessage({
          message: 'err',
          type: 'error',
          // 赋默认值
        }))
  } else {
    ElMessage({
      message: '未登录账号',
      type: 'info',
      // 赋默认值
    })
  }
})

</script>

<style scoped>

</style>