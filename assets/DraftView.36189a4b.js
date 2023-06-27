import{f as ee,g as te,h as ae,i as oe,m as le,j as se,r as ne,l as re,s as ie,e as ue,d as p}from"./element-plus.448e8a62.js";import{u as pe}from"./vue-router.607d6acb.js";import{_ as ce,u as de,r as w}from"./index.b129c09e.js";import{D as B}from"./Date.43b474cf.js";import{h as _,D as fe,ac as D,o as O,c as S,V as t,T as o,Q as N,ae as me,a5 as d,a as g,X as h,u as k,a8 as ge,b7 as ve,b6 as _e}from"./@vue.7c7276fa.js";import"./@element-plus.411cfd49.js";import"./@vueuse.f9d729fe.js";import"./@popperjs.36402333.js";import"./lodash-es.6aaf5ee5.js";import"./@ctrl.b082b0c1.js";import"./js-md5.60c670bb.js";import"./@babel.102366c7.js";import"./@kangc.37e26c1f.js";import"./vue.5f7a9515.js";import"./@vuepress.0f7d6c54.js";import"./highlight.js.f807e898.js";import"./codemirror.6a7023c3.js";import"./sakana-widget.cafc462e.js";const he=b=>(ve("data-v-657eb362"),b=b(),_e(),b),ye=he(()=>g("span",{id:"title",style:{"font-weight":"bolder","font-size":"24px",color:"#666666"}},"Editor",-1)),we={class:"dialog-footer"},De={style:{"font-weight":"bolder",color:"#666666","font-size":"x-large"}},be=["src"],xe={style:{height:"150px",width:"auto"}},$e={class:"introCard"},Ee={style:{color:"#777777","font-size":"small",bottom:"10px",position:"absolute",width:"55%"}},m="http://astralcyber.top:3000",Ve={__name:"DraftView",setup(b){const x=_(!0),y=_(!1),r=de(),v=pe(),f=_(),U=_([]),$=_([]),I=_(parseInt(v.params.page||1));let F="https://source.unsplash.com/random/900x600/?desktop,wallparper";const a=_({id:"",authorUuid:r.$userInfo.value.id,topic:"",content:"",intro:"",assort:"",author:r.$userInfo.value.username,createDate:new Date,changeDate:new Date,tag:"",like:[],weight:0}),c=new Headers;c.append("Content-Type","application/json");async function j(l){let e={method:"GET",headers:c,redirect:"follow"};await fetch(`${m}/draft/${l}`,e).then(s=>s.json()).then(s=>{origin=s,a.value=s}),y.value=!0,x.value=!0}function C(l){U.value=ge($.value).slice(l*5-5,l*5),l!==1?w.push({name:"DraftPage",params:{page:l}}):w.push({name:"Draft"});let e;cancelAnimationFrame(e),e=requestAnimationFrame(function s(){let i=document.body.scrollTop||document.documentElement.scrollTop;i>0?(scrollTo(0,i-25),e=requestAnimationFrame(s)):cancelAnimationFrame(e)})}async function E(){let l={method:"GET",headers:c,redirect:"follow"};await fetch(`${m}/draft/`,l).then(e=>e.json()).then(e=>{$.value=[];for(let s in e)e[s].authorUuid===r.$userInfo.value.id&&$.value.push(e[s]);f.value=$.value.length}),typeof v.params.page<"u"?C(v.params.page):C(1)}function T(){let l={method:"PATCH",headers:c,redirect:"follow"};l.body=JSON.stringify(r.$userInfo.value),fetch(`${m}/users/${r.$userInfo.value.id}`,l)}async function H(){let l={method:"DELETE",headers:c,redirect:"follow"};const e=a.value;l.body=JSON.stringify(e),await fetch(`${m}/draft/${a.value.id}`,l).then(()=>{p({message:"\u7A3F\u7EB8\u5DF2\u88AB\u6298\u6210\u7EB8\u98DE\u673A\uFF5E",type:"success"}),r.$userInfo.value.draft--,x.value=!1,y.value=!1,f.value--,T()}).catch(s=>p({message:s,type:"error"})),f.value%5===0&&v.params.page>2&&await w.push({name:v.name,params:{page:v.params.page-1}}),f.value%5===0&&v.params.page===2&&await w.push({name:"Draft"}),await E()}async function z(){if(a.value.topic===""){p({message:"\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A\uFF01",type:"error"});return}a.value.intro===""&&(a.value.intro=a.value.content.substring(0,155));let l={method:"DELETE",headers:c,redirect:"follow"},e={method:"Post",headers:c,redirect:"follow"};if(a.value.id!==""){const i=a.value;l.body=JSON.stringify(i),await fetch(`${m}/draft/${a.value.id}`,l).then(()=>{r.$userInfo.value.draft--,f.value--}).catch(P=>p({message:P,type:"error"}))}const s=a.value;s.id="",s.assort="Default",s.createDate=s.changeDate=new Date,e.body=JSON.stringify(s),await fetch(`${m}/article`,e).then(()=>{r.$reloadHot.value=!r.$reloadHot.value,r.$userInfo.value.articles++,r.$allHas.value++,x.value=!1,y.value=!1,p({message:"\u7A3F\u7EB8\u6295\u9001\u6210\u529F\uFF5E",type:"success"})}).catch(i=>p({message:i,type:"error"})),T(),f.value%5===0&&location.replace(location.origin+"/#/draft"),await E()}async function q(){if(a.value.topic===""){p({message:"\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A\uFF01",type:"error"});return}if(a.value.assort===""&&(a.value.assort="Default"),a.value.intro===""&&(a.value.intro=a.value.content.substring(0,155)),a.value.id!==""){let l={method:"PATCH",headers:c,redirect:"follow"};const e=a.value;e.changeDate=new Date,l.body=JSON.stringify(e),await fetch(`${m}/draft/${a.value.id}`,l).then(()=>{p({message:"\u5DF2\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1\uFF01",type:"success"})}).catch(s=>alert(s))}else{let l={method:"POST",headers:c,redirect:"follow"};const e=a.value;e.createDate=e.changeDate=new Date,l.body=JSON.stringify(e),await fetch(`${m}/draft/`,l).then(()=>{p({message:"\u5DF2\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1\uFF01",type:"success"}),r.$userInfo.value.draft++,f.value++,T()}).catch(s=>p({message:s,type:"error"}))}await E()}function J(){(a.value.content!==""||a.value.topic!=="")&&x.value&&ue.confirm("\u5185\u5BB9\u672A\u4FDD\u5B58\uFF0C"+r.$userInfo.value.username+"\u771F\u7684\u8981\u8D70\u5417\uFF1F","Warning",{confirmButtonText:"\u72E0\u5FC3\u79BB\u5F00",cancelButtonText:"\u4FDD\u5B58\u5E76\u79BB\u5F00",type:"warning",showClose:!1,closeOnClickModal:!1,closeOnPressEscape:!1}).catch(()=>{q()})}function M(){w.push({name:"Main"})}fe(()=>{E()});function G(l){return F+","+l+")"}return(l,e)=>{const s=ee,i=te,P=D("v-md-editor"),A=ae,L=oe,u=le,R=se,Q=D("User"),V=ne,W=D("Folder"),X=D("Paperclip"),K=D("EditPen"),Y=re,Z=ie;return O(),S(N,null,[t(L,{width:"80vw",modelValue:y.value,"onUpdate:modelValue":e[4]||(e[4]=n=>y.value=n),"align-center":"align-center",fullscreen:"fullscreen","close-on-click-modal":!1,onClose:J},{header:o(()=>[t(i,{align:"middle",style:{"margin-bottom":"10px"}},{default:o(()=>[ye,t(s,{style:{width:"30%","margin-left":"15px"},modelValue:a.value.topic,"onUpdate:modelValue":e[0]||(e[0]=n=>a.value.topic=n),clearable:"",min:"1"},{prepend:o(()=>[d("\u6807\u9898")]),_:1},8,["modelValue"]),t(s,{style:{width:"30%","margin-left":"15px"},modelValue:a.value.intro,"onUpdate:modelValue":e[1]||(e[1]=n=>a.value.intro=n),clearable:"","show-word-limit":""},{prepend:o(()=>[d("\u7B80\u4ECB")]),_:1},8,["modelValue"]),t(s,{style:{width:"20%","margin-left":"15px"},modelValue:a.value.assort,"onUpdate:modelValue":e[2]||(e[2]=n=>a.value.assort=n),clearable:"",maxlength:"8","show-word-limit":""},{prepend:o(()=>[d("\u5206\u7C7B")]),_:1},8,["modelValue"])]),_:1})]),footer:o(()=>[g("span",we,[t(A,{size:"large",type:"danger",onClick:H},{default:o(()=>[d(" \u5220\u9664 ")]),_:1}),t(A,{size:"large",type:"primary",onClick:z},{default:o(()=>[d(" \u6295\u9001 ")]),_:1})])]),default:o(()=>[t(i,{justify:"space-evenly",style:{"margin-bottom":"10px"}}),t(P,{modelValue:a.value.content,"onUpdate:modelValue":e[3]||(e[3]=n=>a.value.content=n),height:"77vh",onSave:q},null,8,["modelValue"])]),_:1},8,["modelValue"]),t(i,{style:{height:"24px"},justify:"space-between",align:"middle"},{default:o(()=>[t(u,{span:6},{default:o(()=>[g("span",{class:"back",onClick:M}," \u2B05 \u85CF\u5178\u9601 ")]),_:1}),t(u,{span:10,style:{"text-align":"center"}},{default:o(()=>[g("span",De,h(k(r).$userInfo.value.username)+"\u7684\u8349\u7A3F\u7BB1",1)]),_:1}),t(u,{span:6,style:{"text-align":"right"}})]),_:1}),t(R,{id:"divider","border-style":"dashed","content-position":"left"}),(O(!0),S(N,null,me(U.value,n=>(O(),S("div",null,[t(i,{onClick:Ie=>j(n.id),style:{cursor:"pointer"}},{default:o(()=>[t(u,{span:24,style:{"margin-bottom":"20px"}},{default:o(()=>[t(Y,{class:"articleCard"},{default:o(()=>[t(i,null,{default:o(()=>[t(u,{span:10,class:"articleImgBox"},{default:o(()=>[g("img",{src:G(n.topic),class:"articleImg"},null,8,be)]),_:2},1024),t(u,{span:14,style:{padding:"10px 15px 15px 15px"}},{default:o(()=>[g("div",xe,[g("span",$e,h(n.intro),1),g("span",Ee,[t(i,null,{default:o(()=>[t(u,{span:12},{default:o(()=>[t(V,{style:{top:"2px"}},{default:o(()=>[t(Q)]),_:1}),d(" \u4F5C\u8005\uFF1A"+h(n.author),1)]),_:2},1024),t(u,{span:12},{default:o(()=>[t(V,{style:{top:"2px"}},{default:o(()=>[t(W)]),_:1}),d(" \u5206\u7C7B\uFF1A"+h(n.assort),1)]),_:2},1024),t(u,{span:12},{default:o(()=>[t(V,{style:{top:"2px"}},{default:o(()=>[t(X)]),_:1}),d(" \u5EFA\u7ACB\u4E8E\uFF1A"+h(k(B)(new Date(n.createDate))),1)]),_:2},1024),t(u,{span:12},{default:o(()=>[t(V,{style:{top:"2px"}},{default:o(()=>[t(K)]),_:1}),d(" \u4FEE\u6539\u4E8E\uFF1A"+h(k(B)(new Date(n.changeDate))),1)]),_:2},1024)]),_:2},1024)])])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])]))),256)),t(i,{style:{width:"100%"},class:"pagination",align:"middle",justify:"center"},{default:o(()=>[t(Z,{style:{transform:"scale(1.2,1.2)"},"hide-on-single-page":!0,"page-size":5,"current-page":I.value,"onUpdate:currentPage":e[5]||(e[5]=n=>I.value=n),layout:"prev, pager, next",total:f.value,onCurrentChange:e[6]||(e[6]=n=>C(I.value))},null,8,["current-page","total"])]),_:1})],64)}}},Le=ce(Ve,[["__scopeId","data-v-657eb362"]]);export{Le as default};
