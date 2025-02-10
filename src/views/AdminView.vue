<template>
  <el-dialog width="80vw" v-model="editorVisible" align-center="align-center"
             fullscreen="fullscreen"
             :close-on-click-modal="false"
             @close="closeEditor">
    <template #header>
      <el-row align="middle" style="margin-bottom: 10px">
        <span id="title" style="font-weight: bolder;font-size: 24px;color: #666666">Editor</span>

        <el-input style="width: 30%;margin-left: 15px" v-model="article.topic" clearable min="1">
          <template #prepend>标题</template>
        </el-input>
        <el-input style="width: 30%;margin-left: 15px" v-model="article.intro" clearable show-word-limit>
          <template #prepend>简介</template>
        </el-input>
        <el-input style="width: 20%;margin-left: 15px" v-model="article.assort" clearable maxlength="8"
                  show-word-limit>
          <template #prepend>分类</template>
        </el-input>
      </el-row>
    </template>
    <el-row justify="space-evenly" style="margin-bottom: 10px">
    </el-row>
    <v-md-editor v-model="article.content" height="77vh" @save="Save"></v-md-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="large" type="danger" @click="deleteArticle">
          删除
        </el-button>
                <el-button size="large" type="primary" @click="buttonSave">
          修改
        </el-button>
        <el-button v-if="article.weight===0" size="large" type="success" @click="to(9999999999)">
          置顶
        </el-button>
        <el-button v-if="article.weight!==0" size="large" type="warning" @click="to(0)">
          取消置顶
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-row style="height: 24px" justify="space-between" align="middle">
    <el-col :span="6">
      <span class="back" @click="back">
      ⬅ 藏典阁
    </span>
    </el-col>
    <el-col :span="10" style="text-align: center">
      <span style="font-weight: bolder;color: #666666;font-size:x-large;">思量DAO已收到投送{{ total }}篇</span>
    </el-col>
    <el-col :span="6" style="text-align: right">

    </el-col>
  </el-row>
  <el-divider id="divider" border-style="dashed" content-position="left"/>

  <!-- 文章列表-->
  <div v-for="article in tableData">
    <el-row @click="openEditor(article.id)"
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
                           建立于：{{ DateFormat(new Date(article.createDate)) }}
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
import useGetGlobalProperties from "../hook/useGlobal.js";
import {ElMessage, ElMessageBox} from "element-plus";
import DateFormat from "../hook/Date.js";

const alertSave = ref(true);
const editorVisible = ref(false)
const globalProperties = useGetGlobalProperties()
const route = useRoute()
const total = ref()
const tableData = ref([]);
const allData = ref([]);
const page = ref(parseInt(route.params.page || 1))
let imgApi = 'https://api.592.us.kg/api?id=gqbz'

const article = ref({
  id: '',
  authorUuid: globalProperties.$userInfo.value.id,
  topic: "",
  content: "",
  intro: "",
  assort: "",
  author: globalProperties.$userInfo.value.username,
  createDate: new Date(),
  changeDate: new Date(),
  tag: "",
  like: [],
  weight: 0,
})

const host = "https://server.asgardion.space";
const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")


async function openEditor(id) {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  await fetch(`${host}/article/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        origin = data
        article.value = data
      })
  editorVisible.value = true
  alertSave.value = true;
}

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
            name: "AdminPage",
            params: {
              page: current
            }
          })
        } else {
          router.push({
            name: "Admin",
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
  // fetch(`${host}/article/?_page=${current}&_limit=4`, requestOptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       tableData.value = data
  //       if (current !== 1) {
  //         router.push({
  //           name: "Page",
  //           params: {
  //             id: current
  //           }
  //         })
  //       } else {
  //         router.push({
  //           name: "Main",
  //         })
  //       }
  //     })
}

async function getArticle() {
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  await fetch(`${host}/article/`, requestOptions)
      .then(response => response.json())
      .then(data => {
        total.value = data.length;
      }).catch(err => {
        ElMessage({
          message: err,
          type: 'error',
        })
      })
  if (typeof (route.params.page) !== "undefined") {
    fenye(route.params.page);
  } else {
    fenye(1);
  }
}

async function flashUser(id) {
  let author;
  await fetch(`${host}/users/${id}`, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }).then(response => response.json())
      .then(data => {
        author = data;
      }).catch(err => {
        ElMessage({
          message: err,
          type: 'error',
        })
      })


  let request = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  }
  author.articles--;
  request.body = JSON.stringify(author);
  await fetch(`${host}/users/${author.id}`, request)
}

async function deleteArticle() {
  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  }
  const newArticle = article.value;
  requestOptions.body = JSON.stringify(newArticle);
  await fetch(`${host}/article/${article.value.id}`, requestOptions)
      .then(() => {
        ElMessage({
          message: '稿纸已被折成纸飞机～',
          type: 'success',
        })
        globalProperties.$reload.value = !globalProperties.$reload.value;
        globalProperties.$reloadHot.value=!globalProperties.$reloadHot.value;
        globalProperties.$allHas.value--;
        alertSave.value = false
        editorVisible.value = false
        total.value--;
        //更新数据
        flashUser(article.value.authorUuid)
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
      }))
  if (total.value % 5 === 0 && route.params.page > 2) {
    await router.push({
      name: route.name,
      params: {
        page: route.params.page - 1
      }
    })
  }
  if (total.value % 5 === 0 && route.params.page === 2) {
    await router.push({
      name: "Admin",
    })
  }
  await getArticle()
}

async function Save() {
  if (article.value.topic === '') {
    ElMessage({
      message: '标题不能为空！',
      type: 'error',
    });
    return;
  }
  if (article.value.assort === '') {
    article.value.assort = "Default"
  }
  if (article.value.intro === '') {
    article.value.intro = article.value.content.substring(0, 155)
  }
  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  }
  const newArticle = article.value;
  newArticle.changeDate = new Date()
  requestOptions.body = JSON.stringify(newArticle);
  await fetch(`${host}/article/${article.value.id}`, requestOptions)
      .then(() => {
        ElMessage({
          message: '已保存修改！',
          type: 'success',
        })
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
      }));
  await getArticle()
}

function buttonSave() {
  Save()
  alertSave.value = false;
  editorVisible.value = false;
}

async function to(weight) {
  if (article.value.topic === '') {
    ElMessage({
      message: '标题不能为空！',
      type: 'error',
    });
    return;
  }
  if (article.value.assort === '') {
    article.value.assort = "Default"
  }
  if (article.value.intro === '') {
    article.value.intro = article.value.content.substring(0, 155)
  }
  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  }
  const newArticle = article.value;
  newArticle.weight = weight;
  requestOptions.body = JSON.stringify(newArticle);
  await fetch(`${host}/article/${article.value.id}`, requestOptions)
      .then(() => {
        ElMessage({
          message: weight === 0 ? '已取消置顶～' : '已置顶～',
          type: weight === 0 ? 'warning' : 'success',
        })
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
      }));
  await getArticle()
  alertSave.value = false;
  editorVisible.value = false;
}

function closeEditor() {
  if ((article.value.content !== '' || article.value.topic !== '') && alertSave.value) {
    ElMessageBox.confirm(
        '内容未保存，' + globalProperties.$userInfo.value.username + '真的要走吗？',
        'Warning',
        {
          confirmButtonText: '狠心离开',
          cancelButtonText: '保存并离开',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
        }
    )
        .catch(() => {
          Save()
        })
  }
}

function back() {
  router.push({
    name: "Main"
  })
}

onBeforeMount(() => {
  getArticle();
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

@media screen and (max-width: 840px) {
  #title {
    display: none;
  }
}

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
  --el-card-padding: 0 !important;
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
