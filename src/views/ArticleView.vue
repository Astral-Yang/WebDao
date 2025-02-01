<template>
  <el-row style="height: 24px" justify="space-between" align="middle">
    <el-col :span="7">
      <span class="back" @click="back">
      ⬅ 藏典阁
    </span>
    </el-col>
    <el-col :span="10" style="text-align: center">
      <span style="font-weight: bolder;color: #666666;font-size: x-large;">{{ article.topic }}</span>
    </el-col>
    <el-col :span="7">
      <div style="float: right">
        <el-badge :value="article.like.length" type="warning">
          <el-button id="star" type="info" @click="starFunc" link>
            <svg v-if="!starStation" t="1674108775273" class="iconStar" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="https://www.w3.org/2000/svg"
                 p-id="3220" xmlns:xlink="https://www.w3.org/1999/xlink" width="200" height="200">
              <path
                  d="M767.010919 959.838737c-5.332437 0-10.664875-1.376113-15.48127-3.956325l-241.335797-133.826978-241.851839 132.966907c-10.664875 5.84848-23.909961 5.160423-33.88678-1.892155-9.976818-7.052579-15.137242-19.26558-13.073072-31.306568L268.342012 637.140265 71.901898 435.023686c-8.256677-8.428691-11.180917-20.985721-7.396607-32.166639 3.612296-11.352931 13.245087-19.609609 24.942046-21.673778l154.984714-26.662187c17.545439-2.92424 34.058794 8.77272 36.983034 26.146145s-8.77272 33.88678-26.146145 36.983034l-95.123803 16.341341 165.30556 170.121955c7.052579 7.224593 10.320847 17.545439 8.600706 27.522258l-38.875189 235.659331 199.536368-109.745003c9.63279-5.332437 21.32975-5.332437 30.96254 0l199.19234 110.433059-38.015118-235.831346c-1.548127-9.976818 1.548127-20.297665 8.77272-27.522258l164.617504-168.2298L634.732068 401.652948c-10.492861-1.548127-19.609609-8.428691-24.081975-18.061482L511.397951 171.15404l-100.112212 211.74937c-7.568621 15.997312-26.662187 22.877877-42.659499 15.309256-15.997312-7.568621-22.877877-26.662187-15.309256-42.659499l129.182597-273.502436c5.332437-11.180917 16.513355-18.40551 28.898371-18.40551 0 0 0 0 0 0 12.385016 0 23.737947 7.224593 28.898371 18.40551l120.753906 258.537208 270.406182 41.799429c11.868974 1.892155 21.673778 10.148833 25.458088 21.501764 3.78431 11.352931 0.860071 23.909961-7.568621 32.510667l-196.956157 201.256509 45.927768 284.855367c1.892155 12.040988-3.268268 24.25399-13.245087 31.306568C779.911977 957.946582 773.547455 959.838737 767.010919 959.838737z"
                  p-id="3221"></path>
            </svg>
            <svg v-if="starStation" t="1674109108767" class="iconStar" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="https://www.w3.org/2000/svg"
                 p-id="4588" width="200" height="200">
              <path
                  d="M957.258525 404.23316c-3.78431-11.352931-13.589115-19.609609-25.458088-21.501764l-270.406182-41.799429L540.640349 82.394759c-5.332437-11.180917-16.513355-18.40551-28.898371-18.40551 0 0 0 0 0 0-12.385016 0-23.565933 7.052579-28.898371 18.40551l-121.78599 258.021166L90.135394 381.183269c-11.868974 1.720141-21.673778 9.976818-25.630102 21.32975s-1.032085 23.909961 7.396607 32.510667L268.342012 637.140265 221.38216 921.995632c-2.064169 12.040988 3.096254 24.25399 13.073072 31.306568 9.976818 7.052579 23.221905 7.740635 33.88678 1.892155L510.193852 822.227448l241.335797 133.826978c4.816395 2.580212 10.148833 3.956325 15.48127 3.956325 0.172014 0 0.516042 0 0.688056 0 17.717453 0 31.994625-14.277171 31.994625-31.994625 0-3.956325-0.688056-7.740635-2.064169-11.352931l-44.895683-278.662859 196.956157-201.256509C958.118596 428.143121 961.042836 415.586091 957.258525 404.23316z"
                  p-id="4589"></path>
            </svg>
            <span v-text="starStation?' Starred':' Star'"></span>
          </el-button>
        </el-badge>
      </div>
    </el-col>
  </el-row>
  <el-divider id="divider" border-style="dashed" content-position="left"/>
  <!--      @copy-code-success="handleCopyCodeSuccess"-->
  <el-card style="border-radius: 10px !important;--el-card-padding: 0px !important;">
    <v-md-preview :text="article.content"></v-md-preview>
  </el-card>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, ref} from "vue";
import {ElMessage} from "element-plus";
import useGetGlobalProperties from "../hook/useGlobal.js";


const globalProperties = useGetGlobalProperties()
const starStation = ref(false);
const route = useRoute();
const router = useRouter()
const article = ref({
  id: 0,
  topic: "Loading",
  content: "# Loading",
  intro: "Loading",
  assort: "Loading",
  author: "Loading",
  createDate: new Date(),
  changeDate: new Date(),
  tag: "Loading",
  like: [],
  weight: 0,
})
const host = 'https://server.asgardion.space'
let index = -1;

const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")

async function getArticle() {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  await fetch(`${host}/article/${route.params.articleId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        article.value = data;
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
      }))
  index = article.value.like.indexOf(globalProperties.$userInfo.value.id)
  if (index !== -1) {
    starStation.value = true;
  } else {
    starStation.value = false;
  }
}

onBeforeMount(() => {
  getArticle();
  let timer;
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(function fn() {
    let toTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (toTop > 0) {
      scrollTo(0, toTop - 25);
      timer = requestAnimationFrame(fn);
    } else {
      cancelAnimationFrame(timer);
    }
  });
})


function starFunc() {
  let DOM = document.getElementById('star');

  if (localStorage.getItem("id") === null ) {
    ElMessage({
      message: "请先登录后再Star～",
      type: 'warning',
    })
    DOM.blur();
    return;
  }

  if (starStation.value) {
    article.value.like.splice(index, 1);
    DOM.style.setProperty('--changeColor', ' #73767a');
    DOM.style.setProperty('--starColor', ' #73767a');
    DOM.style.setProperty('--changeZoom', 'scale(0.8, 0.8)');
  } else {
    article.value.like.push(globalProperties.$userInfo.value.id);
    DOM.style.setProperty('--changeColor', '#E6A23C');
    DOM.style.setProperty('--starColor', ' #eebe77');
    DOM.style.setProperty('--changeZoom', 'scale(1.2, 1.2)');
  }
  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  }
  requestOptions.body = JSON.stringify(article.value);
  fetch(`${host}/article/${article.value.id}`, requestOptions)
      .then(() => {
      })
      .catch(err => {
        ElMessage({
          message: "Star失败，请检查网络～",
          type: 'error',
        })
        return;
      });
  starStation.value = !starStation.value
  setTimeout(function () {
    DOM.blur();
    globalProperties.$reloadHot.value = !globalProperties.$reloadHot.value;
    //   DOM.style.color = '';
    // DOM.style.setProperty('--starColor', '#3F9EFF');
  }, 500)
}

function back() {
  router.push({
    name: "Main"
  })
}
</script>

<style scoped>
#divider {
  border-top: 2px rgba(129, 129, 129, 0.8) dashed !important;
}

#star {
  font-size: 18px;
  text-align: center;
  transition: 0.5s ease;
  /*transition-delay: 0.5s;*/
  --starColor: #73767a;
}

.iconStar {
  width: 26px;
  height: 20px;
  fill: var(--starColor);
}

#star:focus {
  color: var(--changeColor);
  transform: var(--changeZoom);
}
</style>
