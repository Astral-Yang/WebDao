<template>
  <el-row style="height: 24px" align="middle">
    <el-icon :size="20" style="color: #E57B89;margin-top: 2px">
      <Reading/>
    </el-icon>
    <span style="font-weight: bolder;color: #666666;font-size: larger;margin-left: 4.5px;">思量DAO上的藏典阁</span>
  </el-row>
  <el-divider id="divider" border-style="dashed" content-position="left"/>

  <!-- 文章列表-->
  <div v-for="article in tableData">
    <el-row @click="$router.push({ name: 'Article', params: { articleId: article.id}})"
            style="cursor:pointer;">
      <el-col :span="24" style="margin-bottom: 20px">
        <el-card class="articleCard">
          <el-row>
            <el-col :span="10" class="articleImgBox">
              <img :src="articleImg(article.topic)" class="articleImg">
            </el-col>
            <el-col :span="14" style="padding: 10px 15px 15px 15px">
              <h1 v-if="article.weight===0" style="top: 0; color: #666666;font-weight: bolder;font-size: 24px;
                      word-break:break-all;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 1;
                      -webkit-box-orient: vertical;
                      margin: 0;
                      height: 30px;
                      line-height: 30px;
                      word-wrap:break-word">{{ article.topic }}
              </h1>
<!--              置顶-->
              <h1 v-if="article.weight!==0" style="top: 0; color: #666666;font-weight: bolder;font-size: 24px;
                      word-break:break-all;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 1;
                      -webkit-box-orient: vertical;
                      margin: 0;
                      height: 30px;
                      line-height: 30px;
                      word-wrap:break-word"><span style="color: #F46B6B">「置顶」</span>{{ article.topic }}
              </h1>

              <div style="height: 150px;width: auto;">
                        <span class="introCard"
                        >{{ article.intro }}</span>
                <span style="color: #777777;font-size: small;bottom: 10px;position: absolute;width: 55%">
                        <el-row>
                          <el-col :span="12">
                           <el-icon style="top: 2px">
                             <User/>
                           </el-icon>
                           作者：{{ article.author }}
                         </el-col>
                         <el-col :span="12">
                           <el-icon style="top: 2px">
                             <Folder/>
                           </el-icon>
                           分类：{{ article.assort }}
                         </el-col>
                          <el-col :span="12">
                           <el-icon style="top: 2px">
                             <Paperclip/>
                           </el-icon>
                           投送于：{{ DateFormat(new Date(article.createDate)) }}
                         </el-col>
                          <el-col :span="12">
                           <el-icon style="top: 2px">
                             <EditPen/>
                           </el-icon>
                           修改于：{{ DateFormat(new Date(article.changeDate)) }}
                         </el-col>
                        </el-row>
                      </span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-row style="width: 100%" class="pagination" align="middle" justify="center">
    <el-pagination style="transform:scale(1.2,1.2);" :hide-on-single-page="true"
                   :page-size="5"
                   v-model:current-page="page" layout="prev, pager, next" :total="total"
                   @current-change="fenye(page)"/>
  </el-row>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import router from "../router/index.js";
import DateFormat from "../hook/Date";
import useGetGlobalProperties from "../hook/useGlobal.js";

const globalProperties = useGetGlobalProperties()
const route = useRoute()
const total = ref('')
const tableData = ref('')
const page = ref(parseInt(route.params.page || 1))
let imgApi = 'https://api.592.us.kg/liulan/?id=gqbz'

function fenye(current) {
  const host = "https://server.asgardion.space";
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/article/?_sort=weight&_order=desc&_page=${current}&_limit=5`, requestOptions)
      .then(response => response.json())
      .then(data => {
        tableData.value = data
        if (current !== 1) {
          router.push({
            name: "Page",
            params: {
              page: current
            }
          })
        } else {
          router.push({
            name: "Main",
          })
        }
      })
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
}

function getArticles() {
  const host = "https://server.asgardion.space";
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/article/`, requestOptions)
      .then(response => response.json())
      .then(data => {
        total.value = data.length;
        localStorage.setItem('allHas', total.value);
      })
}


onBeforeMount(() => {
  if (typeof (route.params.page) !== "undefined") {
    fenye(route.params.page);
  } else {
    fenye(1);
  }
  getArticles();
})

function articleImg(id) {
  // let url;
  // await axios.get('https://api.unsplash.com/photos/random?client_id=TYItb6qDXZniRVRgxRVHDym6xMgGUd35Ae4o0bbqq_0')
  //     .then(function (res) {
  //       console.log(res.data.urls.full);
  //       url = res.data.urls.full;
  //     }.bind(this));
  // return url;
  return imgApi + `&time=${id}`;
}

</script>

<style scoped>
pagination + pagination {
  margin-top: 10px;
}

pagination {
  margin-bottom: 16px;
}

#divider {
  border-top: 2px rgba(129, 129, 129, 0.8) dashed !important;
}

.articleCard {
  box-shadow: 0 1px 20px -6px rgb(0 0 0 / 50%);
  border-radius: 10px !important;
  --el-card-padding: 0px !important;
}

.articleCard:hover {
  box-shadow: 0 5px 10px 5px rgb(110 110 110 / 40%) !important;
  border-color: rgba(255 255 255 / 100%) !important;
}

.articleCard:hover .articleImg {
  transform: scale(1.1);
}

.articleImgBox {
  height: 205px;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.articleImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition-duration: 0.6s;
  transition-timing-function: ease;
}
</style>
