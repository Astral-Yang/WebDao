import{m as B,h as P,k as T,g as $,j as D,l as F,d}from"./element-plus.8bd38160.js";import{u as I,a as M}from"./vue-router.acfefc2e.js";import{_ as O,u as V}from"./index.504ae929.js";import{h as _,a0 as H,aa as j,o as u,c as m,L as a,J as s,G as q,a as r,O as g,F as h}from"./@vue.2fe4fb4f.js";import"./@element-plus.6dbc46d1.js";import"./@vueuse.1809dbd0.js";import"./lodash-es.292de2a1.js";import"./@popperjs.36402333.js";import"./@ctrl.b082b0c1.js";import"./js-md5.959ac667.js";import"./@babel.53fad141.js";import"./@kangc.4df2a972.js";import"./vue.02683aef.js";import"./@vuepress.0f7d6c54.js";import"./highlight.js.a44cb2e8.js";import"./codemirror.00ef7f6e.js";import"./sakana-widget.26843129.js";const G={style:{"font-weight":"bolder",color:"#666666","font-size":"x-large"}},N={style:{float:"right"}},z={key:0,t:"1674108775273",class:"iconStar",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"https://www.w3.org/2000/svg","p-id":"3220","xmlns:xlink":"https://www.w3.org/1999/xlink",width:"200",height:"200"},R={key:1,t:"1674109108767",class:"iconStar",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"https://www.w3.org/2000/svg","p-id":"4588",width:"200",height:"200"},J=["textContent"],v="https://server.astralcyber.top",Z={__name:"ArticleView",setup(K){const i=V(),l=_(!1),f=I(),y=M(),o=_({id:0,topic:"Loading",content:"# Loading",intro:"Loading",assort:"Loading",author:"Loading",createDate:new Date,changeDate:new Date,tag:"Loading",like:[],weight:0});let c=-1;const p=new Headers;p.append("Content-Type","application/json");async function w(){let e={method:"GET",headers:p,redirect:"follow"};await fetch(`${v}/article/${f.params.articleId}`,e).then(t=>t.json()).then(t=>{o.value=t}).catch(t=>d({message:t,type:"error"})),c=o.value.like.indexOf(i.$userInfo.value.id),c!==-1?l.value=!0:l.value=!1}H(()=>{w();let e;cancelAnimationFrame(e),e=requestAnimationFrame(function t(){let n=document.body.scrollTop||document.documentElement.scrollTop;n>0?(scrollTo(0,n-25),e=requestAnimationFrame(t)):cancelAnimationFrame(e)})});function x(){let e=document.getElementById("star");if(localStorage.getItem("id")===null){d({message:"\u8BF7\u5148\u767B\u5F55\u540E\u518DStar\uFF5E",type:"warning"}),e.blur();return}l.value?(o.value.like.splice(c,1),e.style.setProperty("--changeColor"," #73767a"),e.style.setProperty("--starColor"," #73767a"),e.style.setProperty("--changeZoom","scale(0.8, 0.8)")):(o.value.like.push(i.$userInfo.value.id),e.style.setProperty("--changeColor","#E6A23C"),e.style.setProperty("--starColor"," #eebe77"),e.style.setProperty("--changeZoom","scale(1.2, 1.2)"));let t={method:"PATCH",headers:p,redirect:"follow"};t.body=JSON.stringify(o.value),fetch(`${v}/article/${o.value.id}`,t).then(()=>{}).catch(n=>{d({message:"Star\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\uFF5E",type:"error"})}),l.value=!l.value,setTimeout(function(){e.blur(),i.$reloadHot.value=!i.$reloadHot.value},500)}function b(){y.push({name:"Main"})}return(e,t)=>{const n=B,C=P,k=T,L=$,E=D,A=j("v-md-preview"),S=F;return u(),m(q,null,[a(L,{style:{height:"24px"},justify:"space-between",align:"middle"},{default:s(()=>[a(n,{span:7},{default:s(()=>[r("span",{class:"back",onClick:b}," \u2B05 \u85CF\u5178\u9601 ")]),_:1}),a(n,{span:10,style:{"text-align":"center"}},{default:s(()=>[r("span",G,g(o.value.topic),1)]),_:1}),a(n,{span:7},{default:s(()=>[r("div",N,[a(k,{value:o.value.like.length,type:"warning"},{default:s(()=>[a(C,{id:"star",type:"info",onClick:x,link:""},{default:s(()=>[l.value?h("",!0):(u(),m("svg",z,t[0]||(t[0]=[r("path",{d:"M767.010919 959.838737c-5.332437 0-10.664875-1.376113-15.48127-3.956325l-241.335797-133.826978-241.851839 132.966907c-10.664875 5.84848-23.909961 5.160423-33.88678-1.892155-9.976818-7.052579-15.137242-19.26558-13.073072-31.306568L268.342012 637.140265 71.901898 435.023686c-8.256677-8.428691-11.180917-20.985721-7.396607-32.166639 3.612296-11.352931 13.245087-19.609609 24.942046-21.673778l154.984714-26.662187c17.545439-2.92424 34.058794 8.77272 36.983034 26.146145s-8.77272 33.88678-26.146145 36.983034l-95.123803 16.341341 165.30556 170.121955c7.052579 7.224593 10.320847 17.545439 8.600706 27.522258l-38.875189 235.659331 199.536368-109.745003c9.63279-5.332437 21.32975-5.332437 30.96254 0l199.19234 110.433059-38.015118-235.831346c-1.548127-9.976818 1.548127-20.297665 8.77272-27.522258l164.617504-168.2298L634.732068 401.652948c-10.492861-1.548127-19.609609-8.428691-24.081975-18.061482L511.397951 171.15404l-100.112212 211.74937c-7.568621 15.997312-26.662187 22.877877-42.659499 15.309256-15.997312-7.568621-22.877877-26.662187-15.309256-42.659499l129.182597-273.502436c5.332437-11.180917 16.513355-18.40551 28.898371-18.40551 0 0 0 0 0 0 12.385016 0 23.737947 7.224593 28.898371 18.40551l120.753906 258.537208 270.406182 41.799429c11.868974 1.892155 21.673778 10.148833 25.458088 21.501764 3.78431 11.352931 0.860071 23.909961-7.568621 32.510667l-196.956157 201.256509 45.927768 284.855367c1.892155 12.040988-3.268268 24.25399-13.245087 31.306568C779.911977 957.946582 773.547455 959.838737 767.010919 959.838737z","p-id":"3221"},null,-1)]))),l.value?(u(),m("svg",R,t[1]||(t[1]=[r("path",{d:"M957.258525 404.23316c-3.78431-11.352931-13.589115-19.609609-25.458088-21.501764l-270.406182-41.799429L540.640349 82.394759c-5.332437-11.180917-16.513355-18.40551-28.898371-18.40551 0 0 0 0 0 0-12.385016 0-23.565933 7.052579-28.898371 18.40551l-121.78599 258.021166L90.135394 381.183269c-11.868974 1.720141-21.673778 9.976818-25.630102 21.32975s-1.032085 23.909961 7.396607 32.510667L268.342012 637.140265 221.38216 921.995632c-2.064169 12.040988 3.096254 24.25399 13.073072 31.306568 9.976818 7.052579 23.221905 7.740635 33.88678 1.892155L510.193852 822.227448l241.335797 133.826978c4.816395 2.580212 10.148833 3.956325 15.48127 3.956325 0.172014 0 0.516042 0 0.688056 0 17.717453 0 31.994625-14.277171 31.994625-31.994625 0-3.956325-0.688056-7.740635-2.064169-11.352931l-44.895683-278.662859 196.956157-201.256509C958.118596 428.143121 961.042836 415.586091 957.258525 404.23316z","p-id":"4589"},null,-1)]))):h("",!0),r("span",{textContent:g(l.value?" Starred":" Star")},null,8,J)]),_:1})]),_:1},8,["value"])])]),_:1})]),_:1}),a(E,{id:"divider","border-style":"dashed","content-position":"left"}),a(S,{style:{"border-radius":"10px !important","--el-card-padding":"0px !important"}},{default:s(()=>[a(A,{text:o.value.content},null,8,["text"])]),_:1})],64)}}},u1=O(Z,[["__scopeId","data-v-b2953150"]]);export{u1 as default};
