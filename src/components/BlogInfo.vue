<template>
  <el-card class="blogInfo" style="max-height: 200px;height: max-content;">
    <el-row><span style="font-size: 20px;font-weight: bolder">🎉 公告</span>
    </el-row>
    <el-divider style="margin: 10px 0"/>
    <span style="color: #666666;
      font-weight: bolder;
      font-size: 16px;
      word-break:break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      line-height: 20px;
      text-align: center;
      word-wrap:break-word">船靠岸啦，欢迎登陆思量DAO(岛)
    </span>
  </el-card>
  <el-card class="blogInfo" style="height: 281px;">
    <el-row><span style="font-size: 20px;font-weight: bolder">🔥 热门文章</span>
    </el-row>
    <el-divider style="margin: 10px 0 0 0"/>
    <span v-for="(article,index) in tableData" style="color: #666666;
      font-weight: bolder;
      word-break:break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      line-height: 40px;
      border-bottom: 1px #b7b9be dashed;
      word-wrap:break-word;">
      <el-button type="danger" @click="toHot(article.id)" link style="font-size: 16px">{{ index + 1 }}. {{
          article.topic
        }}</el-button>
    </span>
  </el-card>

  <el-card class="blogInfo" style="height: 281px">
    <el-row><span style="font-size: 20px;font-weight: bolder">🚀 最新投送</span>
    </el-row>
    <el-divider style="margin: 10px 0 0 0"/>
    <span v-for="(article,index) in lateData" style="color: #666666;
      font-weight: bolder;
      word-break:break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      line-height: 40px;
      border-bottom: 1px #b7b9be dashed;
      word-wrap:break-word;">
      <el-button type="danger" @click="toHot(article.id)" link style="font-size: 16px">{{ index + 1 }}. {{
          article.topic
        }}</el-button>
    </span>
  </el-card>

</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";
import useGetGlobalProperties from "../hook/useGlobal.js";

const tableData = ref('');
const lateData = ref('');
const router = useRouter()
const globalProperties = useGetGlobalProperties();

async function toHot(id) {
  await router.push({name: 'Article', params: {articleId: id}})
  globalProperties.$reload.value = !globalProperties.$reload.value;
}


function getHot() {
  const host = "https://server.asgardion.space";
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/article?_sort=like.length&_order=desc&_page=1&_limit=5`, requestOptions)
      .then(response => response.json())
      .then(data => {
        tableData.value = data
      })
}

function getLate() {
  const host = "https://server.asgardion.space";
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/article/?_sort=createDate&_order=desc&_limit=5`, requestOptions)
      .then(response => response.json())
      .then(data => {
        lateData.value = data
      })
}

onBeforeMount(() => {
  getHot();
  getLate();
})
</script>

<style scoped>
.blogInfo {
  box-shadow: 0 1px 20px -6px rgb(0 0 0 / 50%);
  margin: 15px;
  width: 20vw;
  border-radius: 10px !important;
  position: relative;
  transition: all 1s;
  overflow: hidden;
}

.blogInfo:hover {
  box-shadow: 0 5px 10px 5px rgb(110 110 110 / 40%) !important;
  border-color: rgba(255 255 255 / 100%) !important;
}
</style>