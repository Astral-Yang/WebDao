import{f as Z,g as ee,h as te,i as ae,m as oe,j as le,r as se,l as ne,s as re,e as ie,d as p}from"./element-plus.45547c91.js";import{u as ue}from"./vue-router.d32d5c8d.js";import{_ as pe,u as de,r as w,D as P}from"./index.7a0af410.js";import{h as v,G as ce,ac as x,o as S,c as T,V as e,T as o,Q as q,ae as fe,a5 as c,a as f,X as _,u as me,a8 as ge,a$ as he,a_ as ve}from"./@vue.e1fd017a.js";import"./@vueuse.ee407e82.js";import"./@element-plus.d2761a05.js";import"./@popperjs.36402333.js";import"./lodash-es.b61273cf.js";import"./@ctrl.fd318bfa.js";import"./js-md5.60c670bb.js";import"./@babel.102366c7.js";import"./@kangc.115eca36.js";import"./vue.f1ba8eca.js";import"./@vuepress.0f7d6c54.js";import"./highlight.js.f882a32c.js";import"./prismjs.0b169443.js";import"./codemirror.a5fd94e6.js";import"./sakana-widget.756df383.js";const _e=b=>(he("data-v-59083738"),b=b(),ve(),b),ye=_e(()=>f("span",{id:"title",style:{"font-weight":"bolder","font-size":"24px",color:"#666666"}},"Editor",-1)),we={class:"dialog-footer"},xe={style:{"font-weight":"bolder",color:"#666666","font-size":"x-large"}},be=["src"],De={style:{top:"0",color:"#666666","font-weight":"bolder","font-size":"24px","word-break":"break-all",overflow:"hidden","text-overflow":"ellipsis",display:"-webkit-box","-webkit-line-clamp":"1","-webkit-box-orient":"vertical",margin:"0",height:"30px","line-height":"30px","word-wrap":"break-word"}},$e={style:{height:"150px",width:"auto"}},Ee={class:"introCard"},Ve={style:{color:"#777777","font-size":"small",bottom:"10px",position:"absolute",width:"55%"}},Ie={__name:"DraftView",setup(b){const D=v(!0),y=v(!1),r=de(),h=ue(),m=v(),U=v([]),$=v([]),I=v(parseInt(h.params.page||1));let j="https://source.unsplash.com/random/900x600/?desktop,wallparper";const a=v({id:"",authorUuid:r.$userInfo.value.id,topic:"",content:"",intro:"",assort:"",author:r.$userInfo.value.username,createDate:"",changeDate:"",tag:"",like:0}),g="http://astralcyber.ml:3000",d=new Headers;d.append("Content-Type","application/json");async function z(l){let t={method:"GET",headers:d,redirect:"follow"};await fetch(`${g}/draft/${l}`,t).then(s=>s.json()).then(s=>{origin=s,a.value=s}),y.value=!0,D.value=!0}function k(l){U.value=ge($.value).slice(l*4-4,l*4),l!==1?w.push({name:"DraftPage",params:{page:l}}):w.push({name:"Draft"})}async function E(){let l={method:"GET",headers:d,redirect:"follow"};await fetch(`${g}/draft/`,l).then(t=>t.json()).then(t=>{$.value=[];for(let s in t)t[s].authorUuid===r.$userInfo.value.id&&$.value.push(t[s]);m.value=$.value.length}),typeof h.params.page<"u"?k(h.params.page):k(1)}function C(){let l={method:"PATCH",headers:d,redirect:"follow"};l.body=JSON.stringify(r.$userInfo.value),fetch(`${g}/users/${r.$userInfo.value.id}`,l)}async function J(){let l={method:"DELETE",headers:d,redirect:"follow"};const t=a.value;l.body=JSON.stringify(t),await fetch(`${g}/draft/${a.value.id}`,l).then(()=>{p({message:"\u7A3F\u7EB8\u5DF2\u88AB\u6298\u6210\u7EB8\u98DE\u673A\uFF5E",type:"success"}),r.$userInfo.value.draft--,D.value=!1,y.value=!1,m.value--,C()}).catch(s=>p({message:s,type:"error"})),m.value%4===0&&h.params.page>2&&await w.push({name:h.name,params:{page:h.params.page-1}}),m.value%4===0&&h.params.page===2&&await w.push({name:"Draft"}),await E()}async function A(){if(a.value.topic===""){p({message:"\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A\uFF01",type:"error"});return}a.value.intro===""&&(a.value.intro=a.value.content.substring(0,155));let l={method:"DELETE",headers:d,redirect:"follow"},t={method:"Post",headers:d,redirect:"follow"};if(a.value.id!==""){const i=a.value;l.body=JSON.stringify(i),await fetch(`${g}/draft/${a.value.id}`,l).then(()=>{r.$userInfo.value.draft--,m.value--}).catch(O=>p({message:O,type:"error"}))}const s=a.value;s.id="",s.assort="Default",s.createDate=s.changeDate=P(new Date),t.body=JSON.stringify(s),await fetch(`${g}/article`,t).then(()=>{r.$userInfo.value.articles++,D.value=!1,y.value=!1,p({message:"\u7A3F\u7EB8\u6295\u9001\u6210\u529F\uFF5E",type:"success"})}).catch(i=>p({message:i,type:"error"})),C(),m.value%4===0&&location.replace(location.origin+"/#/draft"),await E()}async function B(){if(a.value.topic===""){p({message:"\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A\uFF01",type:"error"});return}if(a.value.assort===""&&(a.value.assort="Default"),a.value.intro===""&&(a.value.intro=a.value.content.substring(0,155)),a.value.id!==""){let l={method:"PATCH",headers:d,redirect:"follow"};const t=a.value;t.changeDate=P(new Date),l.body=JSON.stringify(t),await fetch(`${g}/draft/${a.value.id}`,l).then(()=>{p({message:"\u5DF2\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1\uFF01",type:"success"})}).catch(s=>alert(s))}else{let l={method:"POST",headers:d,redirect:"follow"};const t=a.value;t.createDate=t.changeDate=P(new Date),l.body=JSON.stringify(t),await fetch(`${g}/draft/`,l).then(()=>{p({message:"\u5DF2\u4FDD\u5B58\u5230\u8349\u7A3F\u7BB1\uFF01",type:"success"}),r.$userInfo.value.draft++,m.value++,C()}).catch(s=>p({message:s,type:"error"}))}await E()}function G(){(a.value.content!==""||a.value.topic!=="")&&D.value&&ie.confirm("\u5185\u5BB9\u672A\u4FDD\u5B58\uFF0C"+r.$userInfo.value.username+"\u771F\u7684\u8981\u8D70\u5417\uFF1F","Warning",{confirmButtonText:"\u72E0\u5FC3\u79BB\u5F00",cancelButtonText:"\u4FDD\u5B58\u5E76\u79BB\u5F00",type:"warning",showClose:!1,closeOnClickModal:!1,closeOnPressEscape:!1}).catch(()=>{B()})}function M(){w.push({name:"Main"})}ce(()=>{E()});function F(l){return j+","+l+")"}return(l,t)=>{const s=Z,i=ee,O=x("v-md-editor"),N=te,H=ae,u=oe,L=le,R=x("User"),V=se,Q=x("Folder"),W=x("Paperclip"),X=x("EditPen"),K=ne,Y=re;return S(),T(q,null,[e(H,{width:"80vw",modelValue:y.value,"onUpdate:modelValue":t[4]||(t[4]=n=>y.value=n),"align-center":"align-center",fullscreen:"fullscreen","close-on-click-modal":!1,onClose:G},{header:o(()=>[e(i,{align:"middle",style:{"margin-bottom":"10px"}},{default:o(()=>[ye,e(s,{style:{width:"30%","margin-left":"15px"},modelValue:a.value.topic,"onUpdate:modelValue":t[0]||(t[0]=n=>a.value.topic=n),clearable:"",min:"1"},{prepend:o(()=>[c("\u6807\u9898")]),_:1},8,["modelValue"]),e(s,{style:{width:"30%","margin-left":"15px"},modelValue:a.value.intro,"onUpdate:modelValue":t[1]||(t[1]=n=>a.value.intro=n),clearable:"","show-word-limit":""},{prepend:o(()=>[c("\u7B80\u4ECB")]),_:1},8,["modelValue"]),e(s,{style:{width:"20%","margin-left":"15px"},modelValue:a.value.assort,"onUpdate:modelValue":t[2]||(t[2]=n=>a.value.assort=n),clearable:"",maxlength:"8","show-word-limit":""},{prepend:o(()=>[c("\u5206\u7C7B")]),_:1},8,["modelValue"])]),_:1})]),footer:o(()=>[f("span",we,[e(N,{size:"large",type:"danger",onClick:J},{default:o(()=>[c(" \u5220\u9664 ")]),_:1}),e(N,{size:"large",type:"primary",onClick:A},{default:o(()=>[c(" \u6295\u9001 ")]),_:1})])]),default:o(()=>[e(i,{justify:"space-evenly",style:{"margin-bottom":"10px"}}),e(O,{modelValue:a.value.content,"onUpdate:modelValue":t[3]||(t[3]=n=>a.value.content=n),height:"77vh",onSave:B},null,8,["modelValue"])]),_:1},8,["modelValue"]),e(i,{style:{height:"24px"},justify:"space-between",align:"middle"},{default:o(()=>[e(u,{span:6},{default:o(()=>[f("span",{class:"back",onClick:M}," \u2B05 \u85CF\u5178\u9601 ")]),_:1}),e(u,{span:10,style:{"text-align":"center"}},{default:o(()=>[f("span",xe,_(me(r).$userInfo.value.username)+"\u7684\u8349\u7A3F\u7BB1",1)]),_:1}),e(u,{span:6,style:{"text-align":"right"}})]),_:1}),e(L,{id:"divider","border-style":"dashed","content-position":"left"}),(S(!0),T(q,null,fe(U.value,n=>(S(),T("div",null,[e(i,{onClick:ke=>z(n.id),style:{cursor:"pointer"}},{default:o(()=>[e(u,{span:24,style:{"margin-bottom":"20px"}},{default:o(()=>[e(K,{class:"articleCard"},{default:o(()=>[e(i,null,{default:o(()=>[e(u,{span:10,class:"articleImgBox"},{default:o(()=>[f("img",{src:F(n.topic),class:"articleImg"},null,8,be)]),_:2},1024),e(u,{span:14,style:{padding:"10px 15px 15px 15px"}},{default:o(()=>[f("h1",De,_(n.topic),1),f("div",$e,[f("span",Ee,_(n.intro),1),f("span",Ve,[e(i,null,{default:o(()=>[e(u,{span:12},{default:o(()=>[e(V,{style:{top:"2px"}},{default:o(()=>[e(R)]),_:1}),c(" \u4F5C\u8005\uFF1A"+_(n.author),1)]),_:2},1024),e(u,{span:12},{default:o(()=>[e(V,{style:{top:"2px"}},{default:o(()=>[e(Q)]),_:1}),c(" \u5206\u7C7B\uFF1A"+_(n.assort),1)]),_:2},1024),e(u,{span:12},{default:o(()=>[e(V,{style:{top:"2px"}},{default:o(()=>[e(W)]),_:1}),c(" \u5EFA\u7ACB\u4E8E\uFF1A"+_(n.createDate),1)]),_:2},1024),e(u,{span:12},{default:o(()=>[e(V,{style:{top:"2px"}},{default:o(()=>[e(X)]),_:1}),c(" \u4FEE\u6539\u4E8E\uFF1A"+_(n.changeDate),1)]),_:2},1024)]),_:2},1024)])])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])]))),256)),e(i,{style:{width:"100%"},class:"pagination",align:"middle",justify:"center"},{default:o(()=>[e(Y,{style:{transform:"scale(1.2,1.2)"},"hide-on-single-page":!0,"page-size":4,"current-page":I.value,"onUpdate:current-page":t[5]||(t[5]=n=>I.value=n),layout:"prev, pager, next",total:m.value,onCurrentChange:t[6]||(t[6]=n=>k(I.value))},null,8,["current-page","total"])]),_:1})],64)}}},Re=pe(Ie,[["__scopeId","data-v-59083738"]]);export{Re as default};
