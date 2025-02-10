<template>
  <!--  新建文章弹出框-->
  <el-dialog width="80vw" v-model="editorVisible" align-center="align-center"
             fullscreen="fullscreen"
             :close-on-click-modal="false"
             @close="closeEditor()">
    <template #header>
      <el-row align="middle" style="margin-bottom: 10px">
        <span id="title" style="font-weight: bolder;font-size: 24px;color: #666666">Editor</span>

        <el-input style="width: 30%;margin-left: 15px" v-model="draft.topic" clearable min="1">
          <template #prepend>标题</template>
        </el-input>
        <el-input style="width: 30%;margin-left: 15px" v-model="draft.intro" clearable show-word-limit>
          <template #prepend>简介</template>
        </el-input>
        <el-input style="width: 20%;margin-left: 15px" v-model="draft.assort" clearable maxlength="8"
                  show-word-limit>
          <template #prepend>分类</template>
        </el-input>
      </el-row>
    </template>
    <el-row justify="space-evenly" style="margin-bottom: 10px">
    </el-row>
    <v-md-editor v-model="draft.content" height="77vh" @save="Save"></v-md-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="large" type="default" @click="buttonSave">
          存入草稿箱
        </el-button>
        <el-button size="large" type="primary" @click="releaseArticle">
          投送
        </el-button>
      </span>
    </template>
  </el-dialog>


  <!--  修改密码弹出框-->
  <el-dialog custom-class="changePassword" v-model="ChangeTableVisible" title="修改密码ing" align-center width="500"
             @close="close">
    <el-row class="about">
      <el-input v-model="Old" clearable type="password">
        <template style="width: min-content" #prepend>旧密码</template>
      </el-input>
    </el-row>
    <el-row class="about">
      <el-input v-model="New" clearable type="password">
        <template style="width: min-content" #prepend>新密码</template>
      </el-input>
    </el-row>
    <el-row class="about">
      <el-input v-model="Repeat" clearable type="password">
        <template style="width: min-content" #prepend>重复密码</template>
      </el-input>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ChangeTableVisible = false">不改了</el-button>
        <el-button type="primary" @click="changePassword">
          改
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-card id="personCard">
    <el-tabs v-model="activeName" class="tabs" :before-leave="tabLeave">
      <el-tab-pane class="ele" label="HOME" name="first">
        <el-avatar id="photo"
                   :src="globalProperties.$userInfo.value.qq===''?globalProperties.$avator.value:`https://q2.qlogo.cn/headimg_dl?dst_uin=${globalProperties.$userInfo.value.qq}&spec=100`"
        />
        <el-divider style="margin-top: 45%; margin-bottom: 12px" border-style="dashed" content-position="left"/>
        <div style="margin-bottom: 6px"><span id="name">Hi, {{ globalProperties.$userInfo.value.username }}</span></div>
        <el-row justify="center" style="height: 42px" align="middle">
          <span id="intro"
                v-text="globalProperties.$userInfo.value.intro===''?yan:globalProperties.$userInfo.value.intro"></span>
        </el-row>
        <el-row justify="center" align="middle" style="height: 42px;margin-top: 10px;">

          <el-badge v-if="globalProperties.$userInfo.value.id!=='admin'" style=""
                    :value="globalProperties.$userInfo.value.articles" type="primary">
            <el-button @click="router.push({
             name:'Author'
          })" style="font-size: 1.3vw" type="primary" link>已投送
            </el-button>
          </el-badge>

          <el-badge v-if="globalProperties.$userInfo.value.id==='admin'" style=""
                    :value="globalProperties.$allHas.value" type="primary">
            <el-button @click="router.push({
             name:'Admin'
          })" style="font-size: 1.3vw" type="primary" link>管理页
            </el-button>
          </el-badge>
          &nbsp;
          <el-divider direction="vertical" border-style="dashed"/>
          &nbsp;
          <el-badge style="" :value="globalProperties.$userInfo.value.draft" type="warning">
            <el-button @click="router.push({
             name:'Draft'
          })" style="font-size: 1.3vw" type="warning" link>草稿箱
            </el-button>
          </el-badge>
        </el-row>
        <el-row justify="center" align="middle" class="userLine">
          <a :href="globalProperties.$userInfo.value.qq!=='' ? 'https://api.liitk.com/s/qrcode/api?text='+globalProperties.$userInfo.value.qq+'&size=300px':''">
            <img class="social" src="https://cdn.jsdelivr.net/gh/Astral-Cyber/PicImg/blog/QQ-circle-fill.svg"/>
          </a>
          &#12288;
          &nbsp;
          <a :href="globalProperties.$userInfo.value.music">
            <img class="social" src="https://cdn.jsdelivr.net/gh/Astral-Cyber/PicImg/blog/%E5%94%B1%E7%89%87.svg"/>
          </a>
          &#12288;
          &nbsp;
          <a :href="globalProperties.$userInfo.value.github">
            <img href="www.baidu.com" class="social"
                 src="https://cdn.jsdelivr.net/gh/Astral-Cyber/PicImg/blog/github-fill.svg"/>
          </a>
          &#12288;
          &nbsp;

          <a :href="globalProperties.$userInfo.value.telegram">
            <img class="social"
                 src="https://cdn.jsdelivr.net/gh/Astral-Cyber/PicImg/blog/%E5%93%81%E7%89%8C%E6%A0%87%E8%AF%86_telegram.svg"/>
          </a>
        </el-row>
        <el-divider style="margin:12px 0 !important;"/>
        <div id="operate">

          <el-button type="danger" size="large" @click="exit">退出</el-button>
        </div>
      </el-tab-pane>


      <el-tab-pane class="ele" label="ABOUT" name="second">
        <el-avatar id="photo"
                   :src="globalProperties.$userInfo.value.qq===''?globalProperties.$avator.value:`https://q2.qlogo.cn/headimg_dl?dst_uin=${globalProperties.$userInfo.value.qq}&spec=100`"
        />
        <el-divider style="margin-top: 45%; margin-bottom: 12px" border-style="dashed" content-position="left"/>

        <el-row justify="center" align="middle" class="about">
          <el-input v-model="globalProperties.$userInfo.value.username" clearable maxlength="8" show-word-limit>
            <template style="width: min-content" #prepend>昵称</template>
          </el-input>
        </el-row>
        <el-row justify="center" align="middle" class="about">
          <el-input v-model="globalProperties.$userInfo.value.intro" clearable placeholder="不填则随机一言">
            <template style="width: min-content" #prepend>个签</template>
          </el-input>
        </el-row>
        <el-row justify="center" align="middle" class="about">
          <el-input v-model="globalProperties.$userInfo.value.qq" clearable placeholder="填写QQ号将获取头像">
            <template style="width: min-content" #prepend>QQ</template>
          </el-input>
        </el-row>
        <el-row justify="center" align="middle" class="about">
          <el-input v-model="globalProperties.$userInfo.value.music" clearable placeholder="主页链接">
            <template style="width: min-content" #prepend>Music</template>
          </el-input>
        </el-row>
        <el-row justify="center" align="middle" class="about">
          <el-input v-model="globalProperties.$userInfo.value.github" clearable placeholder="主页链接">
            <template style="width: min-content" #prepend>Github</template>
          </el-input>
        </el-row>
        <el-row justify="center" align="middle" class="about">
          <el-input v-model="globalProperties.$userInfo.value.telegram" clearable placeholder="主页链接">
            <template style="width: min-content" #prepend>Telegram</template>
          </el-input>
        </el-row>
        <el-divider style="margin:11px 0 12px 0 !important;"/>
        <div id="operate">
          <el-link type="danger" style="margin-right: 10px" @click="ChangeTableVisible=!ChangeTableVisible">修改密码
          </el-link>
          <el-button type="primary" size="large" @click="submitChange">提交</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane class="ele" name="third">
        <template #label>
          <!--          <el-icon style="transform: translate(0,4px)" size="18"><MessageBox /></el-icon>-->
          稿纸(新建文章)
        </template>
      </el-tab-pane>


    </el-tabs>
  </el-card>
</template>

<script setup>
import {getCurrentInstance, onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import useGetGlobalProperties from "../hook/useGlobal.js";
import md5 from "js-md5"
import {ElMessage, ElMessageBox} from "element-plus";


const globalProperties = useGetGlobalProperties();
const activeName = ref('first')
const host = 'https://server.asgardion.space'
const route = useRoute()
const router = useRouter()
const ChangeTableVisible = ref(false)
const Old = ref('')
const New = ref('')
const Repeat = ref('')
const alertSave = ref(true);
const {ctx: that, proxy} = getCurrentInstance()
const yan = ref('')
const allHas = ref(localStorage.getItem('allHas'))

/*稿纸功能变量及其函数实现*/
const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")
const editorVisible = ref(false)
const draft = ref()

function flashUser() {
  let request = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  }
  request.body = JSON.stringify(globalProperties.$userInfo.value);
  fetch(`${host}/users/${globalProperties.$userInfo.value.id}`, request)
}

async function releaseArticle() {
  if (draft.value.topic === '') {
    ElMessage({
      message: '标题不能为空！',
      type: 'error',
    });
    return;
  }
  if (draft.value.intro === '') {
    draft.value.intro = draft.value.content.substring(0, 155)
  }
  let requestDelete = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  }
  let requestPost = {
    method: "Post",
    headers: myHeaders,
    redirect: "follow",
  }
  //移入已发布列表
  const newArticle = draft.value;
  newArticle.id = ''
  newArticle.assort = "Default"
  newArticle.createDate = newArticle.changeDate = new Date()
  requestPost.body = JSON.stringify(newArticle);
  await fetch(`${host}/article`, requestPost)
      .then(() => {
        globalProperties.$reload.value = !globalProperties.$reload.value;
        globalProperties.$reloadHot.value=!globalProperties.$reloadHot.value;
        if (globalProperties.$userInfo.value.id !== 'admin')
          globalProperties.$userInfo.value.articles++;
        else
          globalProperties.$allHas.value++;
        alertSave.value = false
        editorVisible.value = false
        ElMessage({
          message: "稿纸投送成功～",
          type: 'success',
        })
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
      }))
  //更新数据
  flashUser();
}


async function Save() {
  if (draft.value.topic === '') {
    ElMessage({
      message: '标题不能为空！',
      type: 'error',
    });
    return;
  }
  if (draft.value.assort === '') {
    draft.value.assort = "Default"
  }
  if (draft.value.intro === '') {
    draft.value.intro = draft.value.content.substring(0, 155)
  }
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  }
  const newDraft = draft.value;
  newDraft.createDate = newDraft.changeDate = new Date()
  requestOptions.body = JSON.stringify(newDraft);
  await fetch(`${host}/draft/`, requestOptions)
      .then(() => {
        ElMessage({
          message: '已保存到草稿箱！',
          type: 'success',
        });
        globalProperties.$reload.value = !globalProperties.$reload.value;
        globalProperties.$userInfo.value.draft++
        //total.value++
        flashUser()
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
      }));
  //await getDraft()
}

async function buttonSave() {
  if (draft.value.topic === '') {
    ElMessage({
      message: '标题不能为空！',
      type: 'error',
    });
    return;
  }
  if (draft.value.assort === '') {
    draft.value.assort = "Default"
  }
  if (draft.value.intro === '') {
    draft.value.intro = draft.value.content.substring(0, 155)
  }
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  }
  const newDraft = draft.value;
  newDraft.createDate = newDraft.changeDate = new Date()
  requestOptions.body = JSON.stringify(newDraft);
  await fetch(`${host}/draft/`, requestOptions)
      .then(() => {
        ElMessage({
          message: '已保存到草稿箱！',
          type: 'success',
        });
        alertSave.value = false
        editorVisible.value = false;
        globalProperties.$reload.value = !globalProperties.$reload.value;
        globalProperties.$userInfo.value.draft++
        //total.value++
        flashUser()
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
      }));
  //await getDraft()
}

function closeEditor() {
  if ((draft.value.content !== '' || draft.value.topic !== '') && alertSave.value) {
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
    ).then(() => {
      draft.value = {
        id: '',
        authorUuid: globalProperties.$userInfo.value.id,
        topic: '',
        content: '',
        intro: '',
        assort: '',
        author: globalProperties.$userInfo.value.username,
        createDate: new Date(),
        changeDate: new Date(),
        tag: '',
        like: [],
        weight: 0
      }
    }).catch(() => {
      Save()
    })
  }
}

/***********************************************/

function exit() {
  globalProperties.$station.value = false;
  localStorage.removeItem("id");
  location.replace(location.origin);
}

function tabLeave(activeName, oldActiveName) {
  if (activeName === "third") {
    draft.value = {
      id: "",
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
      weight: 0
    }
    alertSave.value = true;
    editorVisible.value = true;
    return false;
  }
  if (oldActiveName === "second") {
    if (localStorage.getItem("id") !== null) {
      globalProperties.$station.value = true;
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
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
    }
  }
}

function submitChange() {
  if (globalProperties.$userInfo.value.username === '') {
    ElMessage({
      message: "总要有个昵称吧？",
      type: 'error',
    })
    return;
  }
  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    redirect: "follow",
  }
  const userData = globalProperties.$userInfo.value;
  requestOptions.body = JSON.stringify(userData);
  fetch(`${host}/users/${globalProperties.$userInfo.value.id}`, requestOptions)
      .then(() => {
        ElMessage({
          message: "修改成功～",
          type: 'success',
          // 赋默认值
        })
      })
      .catch(err => ElMessage({
        message: err,
        type: 'error',
        // 赋默认值
      }));
}

function close() {
  Old.value = New.value = Repeat.value = ''
}

function changePassword() {
  if (md5(Old.value) === globalProperties.$userInfo.value.password) {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    let requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    }
    if (New.value === Repeat.value) {
      globalProperties.$userInfo.value.password = md5(New.value)
      const userData = globalProperties.$userInfo.value;
      requestOptions.body = JSON.stringify(userData);
      fetch(`${host}/users/${globalProperties.$userInfo.value.id}`, requestOptions)
          .then(() => {
            ElMessage({
              message: "修改成功～",
              type: 'success',
            })
            ChangeTableVisible.value = false;
          })
          .catch(err => ElMessage({
            message: err,
            type: 'error',
          }));
    } else {
      ElMessage({
        message: "两次输入的密码不一致，请检查～",
        type: 'error',
      })
    }
  } else {
    ElMessage({
      message: "原密码错误，请重试～",
      type: 'error',
    })
  }
}

onBeforeMount(() => {
  fetch('https://v1.hitokoto.cn/?c=j&c=e&c=i&c=k&max_length=20')
      .then(response => response.json())
      .then(data => {
        yan.value = data.hitokoto;
      })
      .catch(console.error)

  // if (typeof (route.params.uuid) !== "undefined") {
  //   globalProperties.$station.value = true;
  //   const myHeaders = new Headers()
  //   myHeaders.append("Content-Type", "application/json")
  //   let requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   }
  //   fetch(`${host}/users/${route.params.uuid}`, requestOptions)
  //       .then(response => response.json())
  //       .then(data => {
  //             if (data.id === route.params.uuid) {   // 验证是否存在该用户return data
  //               globalProperties.$userInfo.value = data;
  //             } else {
  //               globalProperties.$station.value = false;
  //             }
  //           }
  //       )
  //       .catch(err => ElMessage({
  //         message: err,
  //         type: 'error',
  //       }))
  // }

})

</script>

<style scoped>
.el-tabs {
  --el-tabs-header-height: 53px !important;
}

.ele {
  padding: 20px;
}

#operate {
  text-align: right;
}

.userLine {
  height: 30px;
  max-height: 30px;
  margin-bottom: 6px;
}

.about {
  height: 36px;
  margin-bottom: 5px;
}

span {
  color: #666666;
}

#name {
  font-weight: bolder;
  font-size: 26px;
}

#intro {
  font-weight: bold;
  font-size: 16px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.social {
  width: 2vw;
  color: #666666;
}

a {
  height: 30px;
}

el-input {
  width: 100px;
}


.data {
  font-weight: bold;
  font-size: 18px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.name {
  font-weight: normal;
}

</style>