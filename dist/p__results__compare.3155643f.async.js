(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12,8],{"35ca":function(e,t,a){e.exports={main:"main___1jTQn",headerList:"headerList___3UM_5",stepDescription:"stepDescription___12TJ3",pageHeader:"pageHeader___20LUe",moreInfo:"moreInfo___3pOcx"}},RE2d:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("WmNS"),r=a.n(n),c=a("9og8"),i=a("t3Un");function o(e,t){return s.apply(this,arguments)}function s(){return s=Object(c["a"])(r.a.mark((function e(t,a){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/model_run/".concat(t.id,"/"),{method:"GET",headers:{Authorization:"Token ".concat(a)},params:{includeBase:!0}}));case 1:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}},ZvZ6:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return u})),a.d(t,"a",(function(){return d})),a.d(t,"c",(function(){return p})),a.d(t,"e",(function(){return b}));var n=a("WmNS"),r=a.n(n),c=a("9og8"),i=a("t3Un");function o(e,t){return s.apply(this,arguments)}function s(){return s=Object(c["a"])(r.a.mark((function e(t,a){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/model_run/".concat(t.id,"/"),{method:"GET",headers:{Authorization:"Token ".concat(a)},data:{id:t.id}}));case 1:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}function u(e){return l.apply(this,arguments)}function l(){return l=Object(c["a"])(r.a.mark((function e(t){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/region/".concat(t.id,"/"),{method:"GET"}));case 1:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}function d(e){return m.apply(this,arguments)}function m(){return m=Object(c["a"])(r.a.mark((function e(t){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/crops/".concat(t.id,"/"),{method:"GET"}));case 1:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}function p(e,t){return f.apply(this,arguments)}function f(){return f=Object(c["a"])(r.a.mark((function e(t,a){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/model_results/".concat(t,"/"),{headers:{Authorization:"Token ".concat(a)},method:"GET"}));case 1:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}function b(e,t,a){return h.apply(this,arguments)}function h(){return h=Object(c["a"])(r.a.mark((function e(t,a,n){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/model_run/".concat(t,"/"),{headers:{Authorization:"Token ".concat(n)},method:"PUT",data:a}));case 1:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}},iD0V:function(e,t,a){"use strict";a.r(t);var n=a("WmNS"),r=a.n(n),c=a("9og8"),i=a("tJVT"),o=a("q1tI"),s=a.n(o),u=a("WHYC"),l=a("9kvl"),d=a("pssB"),m=a("RE2d"),p=(a("Znn+"),a("ZTPi")),f=(a("IzEo"),a("bx4M")),b=(a("5Dmo"),a("3S7+")),h=(a("5GOC"),a("JsLm")),w=a("Hx5s"),E=a("Qiat"),y=a("ZvZ6"),v=a("+n12"),x=a("+YFz"),g=a("tfF3"),j=a("LtsZ"),O=Object(j["dynamic"])({loader:function(){return Object(c["a"])(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([a.e(3),a.e(20)]).then(a.bind(null,"ipbv"));case 2:return t=e.sent,n=t.default,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))()}}),k=Object(j["dynamic"])({loader:function(){return Object(c["a"])(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([a.e(3),a.e(19)]).then(a.bind(null,"YQuU"));case 2:return t=e.sent,n=t.default,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})))()}}),_=a("35ca"),S=a.n(_),T=function(e,t,a,n){return!(!e||!e.results)&&(Promise.all(e.results.map((function(e){return Object(y["c"])(e.id,t)}))).then((function(e){var t={};e.forEach((function(e){t[e.percentile]=e.values.map((function(t,a){return{year:1945+a,value:t,percentile:"".concat(Object(v["c"])(e.percentile)," percentile")}}))})),n(e.map((function(e){return e.percentile}))),a(t)})),!0)},I=function(e){var t=e.customModel,a=e.baseModel,n=e.user,r=n.token,c=Object(o["useState"])([]),u=Object(i["a"])(c,2),l=u[0],d=u[1],m=Object(o["useState"])([]),y=Object(i["a"])(m,2),v=(y[0],y[1]),j=Object(o["useState"])([]),_=Object(i["a"])(j,2),I=_[0],D=_[1],C=Object(o["useState"])([]),R=Object(i["a"])(C,2),B=R[0],L=R[1];return Object(o["useEffect"])((function(){T(a,r,d,v)}),[a]),Object(o["useEffect"])((function(){T(t,r,D,L)}),[t]),s.a.createElement(w["b"],{title:"Base model comparison",subTitle:"Compare a custom model with the base model under same scenario",content:s.a.createElement(h["a"],{affix:!1},s.a.createElement(h["a"].Link,{href:"#settings",title:"Model settings"}),s.a.createElement(h["a"].Link,{href:"#results",title:"Results comparison"}))},s.a.createElement("div",{className:S.a.main},s.a.createElement(f["a"],{title:s.a.createElement(g["a"],{anchor:"settings",title:"Model settings"}),style:{marginBottom:32}},s.a.createElement(E["a"],{value:{intl:E["c"]}},s.a.createElement(E["b"],{columns:[{title:"Name",dataIndex:"name",render:function(e,t){return s.a.createElement(b["a"],{title:"Check model details"},s.a.createElement("a",{href:"/model/view?id=".concat(t.id)},e))},fixed:!0},{title:"Base Model",dataIndex:"is_base",render:function(e){return e?"Yes":"No"}},{title:"Description",dataIndex:"description",ellipsis:!0,width:250},{title:"Scenario",dataIndex:"scenario",render:function(e){return e.name}},{title:"Regions",dataIndex:"regions",render:function(e){return e.map((function(e){return e.name})).join(",")}},{title:"Wells included",dataIndex:"n_wells"},{title:"Year range",dataIndex:"n_years",render:function(e){return"1945 - ".concat(1945+e)},width:100},{title:"Reduction year",dataIndex:"reduction_year"},{title:"Water content",dataIndex:"water_content",render:function(e){return"".concat(100*e,"%")}},{title:"Date Created",dataIndex:"date_submitted",render:function(e){return new Date(e).toLocaleString()}},{title:"Date Completed",dataIndex:"date_completed",render:function(e){return new Date(e).toLocaleString()}}],dataSource:t&&a?[t,a]:[],scroll:{x:"max-content"},rowKey:"id",bordered:!0,search:!1,options:!1,pagination:!1}))),s.a.createElement(f["a"],{title:s.a.createElement(g["a"],{anchor:"results",title:"Results comparison"})},s.a.createElement(p["a"],{tabPosition:"top",centered:!0},s.a.createElement(p["a"].TabPane,{tab:s.a.createElement(b["a"],{title:"Comparison under same percentile"},"Comparison Line Plot ",s.a.createElement(x["a"],null)),key:"LP"},s.a.createElement(k,{baseData:l,customData:I,percentiles:B,reductionYear:t?t.reduction_year:void 0})),s.a.createElement(p["a"].TabPane,{tab:s.a.createElement(b["a"],{title:"Difference between base model and custom model"},"Difference histogram ",s.a.createElement(x["a"],null)),key:"DH"},s.a.createElement(O,{baseData:l,customData:I,percentiles:B,reductionYear:t?t.reduction_year:void 0})),s.a.createElement(p["a"].TabPane,{tab:"Difference heatmap",key:"DHP"})))))},D=Object(l["a"])((function(e){var t=e.user;return{user:t.currentUser}}))(I),C=(a("14J3"),a("BMrR")),R=(a("OaEy"),a("2fM7")),B=(a("jCWc"),a("kPKH")),L=(a("y8nQ"),a("Vl3Y")),M=(a("5NDa"),a("5rEg")),P=(a("+L6B"),a("2/Rp")),W=a("k1fw"),N=(a("+BJd"),a("mr32")),U=a("l+S1"),H=a("/MKj"),A=a("xHr7"),Y=a("tcq8"),z=function(e){var t,a=e.value,n=e.closable,r=e.onClose;switch(a){default:case"original":t="volcano";break;case"public":t="geekblue";break;case"base":t="green"}return s.a.createElement(N["a"],{color:t,closable:n,onClose:r,style:{marginRight:3}},a)},J=function(e,t){var a=e.results,n=[];return a.forEach((function(e){var a=e;a.key=a.id,a.scenario_name=a.scenario.name,a.tags=[],a.public&&a.tags.push("public"),a.is_base&&a.tags.push("base"),a.user===t&&a.tags.push("original"),n.push(a)})),{data:n,total:e.count}},q=function(e){var t=e.user,a=Object(o["useContext"])(w["d"]),n=a.isMobile,r=Object(o["useRef"])(),c="Compare a completed custom model with the base model under same scenario",u=[{title:"Name",dataIndex:"name",fixed:"left",ellipsis:n,width:n?100:200,copyable:!0},{title:"Description",dataIndex:"description",ellipsis:!0,width:250},{title:"Scenario",dataIndex:"scenario_name",copyable:!0},{title:"Year range",dataIndex:"n_years",render:function(e){return"1945 - ".concat(1945+e)},sorter:function(e,t){return e>t}},{title:"Reduction year",dataIndex:"reduction_year",sorter:function(e,t){return e>t}},{title:"Water content",dataIndex:"water_content",render:function(e){return"".concat(100*e,"%")},sorter:function(e,t){return e>t}},{title:"Date Created",dataIndex:"date_submitted",sorter:function(e,t){return new Date(e.date_submitted)>new Date(t.date_submitted)},render:function(e){return new Date(e).toLocaleString()}},{title:"Date Completed",dataIndex:"date_completed",sorter:function(e,t){return new Date(e.date_completed)>new Date(t.date_completed)},render:function(e){return new Date(e).toLocaleString()}},{title:"Types",key:"tags",dataIndex:"tags",render:function(e,t){return s.a.createElement("span",null,e.map((function(e){var a,n;switch(e){default:case"original":a="volcano",n="created by you";break;case"public":a="geekblue",n="accessible by everyone";break;case"base":a="green",n="base model of ".concat(t.scenario.name)}return s.a.createElement(b["a"],{title:n,key:t.key+e},s.a.createElement(N["a"],{color:a,key:e},e))})))}},{title:"Action",dataIndex:"option",valueType:"option",fixed:"right",render:function(e,t){return t.is_base?s.a.createElement(b["a"],{title:"Base model cannot compare with itself, check its detail instead"},s.a.createElement("a",{href:"/model/view?id=".concat(t.id)},"Details")):s.a.createElement(b["a"],{title:"Compare with base model of scenario ".concat(t.scenario.name)},s.a.createElement("a",{href:"/charts/compare?id=".concat(t.id)},"Compare"))},width:100}],d=Object(o["useState"])({types:["public","original","base"],search_text:"",scenarios:[]}),m=Object(i["a"])(d,2),p=m[0],f=m[1],h=Object(o["useState"])(""),y=Object(i["a"])(h,2),v=y[0],x=y[1],g=function(e){f(Object(W["a"])({},e)),r.current.reload()};return s.a.createElement(w["b"],{title:"Base model comparison",subTitle:c,extra:s.a.createElement(P["a"],{href:"/charts/group",onClick:function(){l["b"].push({path:"/charts/group"})},type:"primary"},"Switch to custom models comparison"),content:s.a.createElement(Z,{onSearch:g})},s.a.createElement(E["a"],{value:{intl:E["c"]}},s.a.createElement(E["b"],{headerTitle:"Search results",rowKey:"id",actionRef:r,columns:u,scroll:{x:"max-content"},bordered:!0,onChange:function(e,t,a){var n;n=a.order?"".concat(a.field,",").concat(a.order):"",x(n)},rowSelection:!1,search:!1,request:function(e){return Object(A["a"])(e,p.types,t.token,p.search_text,v,p.scenarios,p.status).then((function(e){return J(e,t.user_id)}))}})))},Z=function(e){var t=e.onSearch,a=Object(o["useState"])([]),n=Object(i["a"])(a,2),u=n[0],l=n[1];return Object(o["useEffect"])((function(){Object(c["a"])(r.a.mark((function e(){var t,a;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(Y["a"])();case 2:t=e.sent,a=t.results,l(a);case 5:case"end":return e.stop()}}),e)})))()}),[]),s.a.createElement(L["a"],{style:{marginTop:20},onFinish:t},s.a.createElement(C["a"],{gutter:16},s.a.createElement(B["a"],{flex:"auto"},s.a.createElement(L["a"].Item,{label:"Name/Description",name:"search_text"},s.a.createElement(M["a"],{placeholder:"Search by model name or description"}))),s.a.createElement(B["a"],{xs:24,sm:8},s.a.createElement(L["a"].Item,{label:"Model types",name:"types",initialValue:["public","original","base"]},s.a.createElement(R["a"],{mode:"multiple",showArrow:!0,placeholder:"Select model types",style:{width:"100%"},tagRender:z,options:[{label:"include public models",value:"public"},{label:"include self-created models",value:"original"},{label:"include base scenario models",value:"base"}]})))),s.a.createElement(C["a"],{gutter:24},s.a.createElement(B["a"],{xs:24,sm:16},s.a.createElement(L["a"].Item,{name:"scenarios",label:"Scenarios"},s.a.createElement(R["a"],{mode:"multiple",showArrow:!0,placeholder:"Filter scenarios",style:{width:"100%"},optionFilterProp:"children"},u.map((function(e){return s.a.createElement(R["a"].Option,{key:e.id,value:e.id},e.name)}))))),s.a.createElement(B["a"],{xs:24,sm:8},s.a.createElement(L["a"].Item,{style:{margin:0}},s.a.createElement(P["a"],{type:"primary",htmlType:"submit",style:{float:"right"}},s.a.createElement(U["a"],null),"Search")))))},F=Object(H["c"])((function(e){var t=e.user;return{user:t.currentUser}}))(q),G=function(e){var t=Object(u["k"])(),a=e.user,n=a.token,l=Object(o["useState"])({}),p=Object(i["a"])(l,2),f=p[0],b=p[1],h=t.query.id,w=void 0===h?null:h;return Object(o["useEffect"])((function(){null!==w&&Object(c["a"])(r.a.mark((function e(){var t;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["a"])({id:w},n);case 2:t=e.sent,"string"===typeof t&&t.startsWith("ERROR")?b({error:"The model you look for is private or cannot be found"}):t.length?b(t):b({error:"Base model is private or cannot be found"});case 4:case"end":return e.stop()}}),e)})))()}),[w]),w?f.error?s.a.createElement(d["default"],{subTitle:"The model(s) is inaccessible",title:f.error,redirection:"/charts/compare",buttonText:"Reselect model"}):s.a.createElement(D,{customModel:f[0],baseModel:f[1]}):s.a.createElement(F,null)};t["default"]=Object(l["a"])((function(e){var t=e.user;return{user:t.currentUser}}))(G)},pssB:function(e,t,a){"use strict";a.r(t);a("J+/v");var n=a("MoRW"),r=(a("+L6B"),a("2/Rp")),c=a("q1tI"),i=a.n(c),o=a("9kvl"),s=function(e){var t=e.redirection,a=void 0===t?"/":t,c=e.title,s=void 0===c?"404":c,u=e.subTitle,l=void 0===u?"Sorry, the page you visited does not exist.":u,d=e.buttonText,m=void 0===d?"Back Home":d;return i.a.createElement(n["a"],{status:"404",title:s,subTitle:l,extra:i.a.createElement(r["a"],{type:"primary",onClick:function(){return o["b"].push(a)}},m)})};t["default"]=s},tcq8:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("WmNS"),r=a.n(n),c=a("9og8"),i=a("t3Un");function o(){return s.apply(this,arguments)}function s(){return s=Object(c["a"])(r.a.mark((function e(){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/scenario/"));case 1:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}},tfF3:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),c=function(e){return r.a.createElement("span",{id:e.anchor},e.title)};t["a"]=c},xHr7:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a("WmNS"),r=a.n(n),c=a("k1fw"),i=a("9og8"),o=a("t3Un");function s(e,t,a,n){return u.apply(this,arguments)}function u(){return u=Object(i["a"])(r.a.mark((function e(t,a,n,i){var s,u,l,d,m,p,f,b,h,w=arguments;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(s=t.pageSize,u=t.current,l=w.length,d=new Array(l>4?l-4:0),m=4;m<l;m++)d[m-4]=w[m];return p=d[0],f=d[1],b=d[2],h={},i&&0!==i.trim().length&&(h.search=i),p&&0!==p.length&&(h.sorter=p),f&&f.length>0&&(h.scenarios=f.join(",")),h.status=b?b.join(","):"3",e.abrupt("return",Object(o["a"])("/api/model_run",{headers:{Authorization:"Token ".concat(n)},params:Object(c["a"])({limit:s,offset:s*(u-1),public:a.includes("public"),isBase:a.includes("base"),origin:a.includes("original"),status:"3"},h)}));case 9:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}}}]);