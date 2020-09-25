(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12,8],{"35ca":function(e,t,a){e.exports={main:"main___1jTQn",headerList:"headerList___3UM_5",stepDescription:"stepDescription___12TJ3",pageHeader:"pageHeader___20LUe",moreInfo:"moreInfo___3pOcx"}},RE2d:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("WmNS"),r=a.n(n),c=a("9og8"),i=a("t3Un");function o(e,t){return s.apply(this,arguments)}function s(){return s=Object(c["a"])(r.a.mark((function e(t,a){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/model_run/".concat(t.id,"/"),{method:"GET",headers:{Authorization:"Token ".concat(a)},data:{id:t.id}}));case 1:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}},iD0V:function(e,t,a){"use strict";a.r(t);var n=a("WmNS"),r=a.n(n),c=a("9og8"),i=a("tJVT"),o=a("q1tI"),s=a.n(o),l=a("WHYC"),u=a("9kvl"),d=a("pssB"),m=a("RE2d"),p=(a("IzEo"),a("bx4M")),b=a("Hx5s"),f=a("35ca"),h=a.n(f),w=function(e){e.info;return s.a.createElement(b["b"],{title:"Base model comparison",subTitle:"Compare a custom model with the base model under same scenario"},s.a.createElement("div",{className:h.a.main},s.a.createElement(p["a"],null)))},y=w,E=(a("14J3"),a("BMrR")),g=(a("OaEy"),a("2fM7")),v=(a("jCWc"),a("kPKH")),x=(a("y8nQ"),a("Vl3Y")),k=(a("5NDa"),a("5rEg")),j=(a("+L6B"),a("2/Rp")),_=a("k1fw"),O=(a("5Dmo"),a("3S7+")),S=(a("+BJd"),a("mr32")),T=a("l+S1"),I=a("/MKj"),D=a("LQCs"),C=a("Qiat"),R=a("xHr7"),B=a("tcq8"),W=function(e){var t,a=e.value,n=e.closable,r=e.onClose;switch(a){default:case"original":t="volcano";break;case"public":t="geekblue";break;case"base":t="green"}return s.a.createElement(S["a"],{color:t,closable:n,onClose:r,style:{marginRight:3}},a)},H=function(e,t){var a=e.results,n=[];return a.forEach((function(e){var a=e;a.key=a.id,a.scenario_name=a.scenario.name,a.tags=[],a.public&&a.tags.push("public"),a.isBase&&a.tags.push("base"),a.user===t&&a.tags.push("original"),n.push(a)})),{data:n,total:e.count}},L=function(e){var t=e.user,a=Object(o["useContext"])(b["d"]),n=a.isMobile,r=Object(o["useRef"])(),c="Compare a completed custom model with the base model under same scenario",l=[{title:"Name",dataIndex:"name",fixed:"left",ellipsis:n,width:n?100:200,copyable:!0},{title:"Description",dataIndex:"description",ellipsis:!0,width:250},{title:"Scenario",dataIndex:"scenario_name",copyable:!0},{title:"Year range",dataIndex:"n_years",render:function(e){return"1945 - ".concat(1945+e)},sorter:function(e,t){return e>t}},{title:"Reduction year",dataIndex:"reduction_year",sorter:function(e,t){return e>t}},{title:"Water content",dataIndex:"water_content",render:function(e){return"".concat(100*e,"%")},sorter:function(e,t){return e>t}},{title:"Date Created",dataIndex:"date_submitted",sorter:function(e,t){return new Date(e.date_submitted)>new Date(t.date_submitted)},render:function(e){return new Date(e).toLocaleString()}},{title:"Date Completed",dataIndex:"date_completed",sorter:function(e,t){return new Date(e.date_completed)>new Date(t.date_completed)},render:function(e){return new Date(e).toLocaleString()}},{title:"Types",key:"tags",dataIndex:"tags",render:function(e,t){return s.a.createElement("span",null,e.map((function(e){var a,n;switch(e){default:case"original":a="volcano",n="created by you";break;case"public":a="geekblue",n="accessible by everyone";break;case"base":a="green",n="base model of ".concat(t.scenario.name)}return s.a.createElement(O["a"],{title:n,key:t.key+e},s.a.createElement(S["a"],{color:a,key:e},e))})))}},{title:"Action",dataIndex:"option",valueType:"option",fixed:"right",render:function(e,t){return t.isBase?s.a.createElement(O["a"],{title:"Base model cannot compare with itself, check its detail instead"},s.a.createElement("a",{href:"/model/view?id=".concat(t.id)},"Details")):s.a.createElement(O["a"],{title:"Compare with base model of scenario ".concat(t.scenario.name)},s.a.createElement("a",{href:"/charts/compare?id=".concat(t.id)},"Compare"))},width:100}],d=Object(o["useState"])({types:["public","original","base"],search_text:"",scenarios:[]}),m=Object(i["a"])(d,2),p=m[0],f=m[1],h=Object(o["useState"])(""),w=Object(i["a"])(h,2),y=w[0],E=w[1],g=function(e){f(Object(_["a"])({},e)),r.current.reload()};return s.a.createElement(b["b"],{title:"Base model comparison",subTitle:c,extra:s.a.createElement(j["a"],{href:"/charts/group",onClick:function(){u["b"].push({path:"/charts/group"})},type:"primary"},"Switch to custom models comparison"),content:s.a.createElement(M,{onSearch:g})},s.a.createElement(D["a"],{value:{intl:D["c"]}},s.a.createElement(C["a"],{headerTitle:"Search results",rowKey:"id",actionRef:r,columns:l,scroll:{x:"max-content"},bordered:!0,onChange:function(e,t,a){var n;n=a.order?"".concat(a.field,",").concat(a.order):"",E(n)},rowSelection:!1,search:!1,request:function(e){return Object(R["a"])(e,p.types,t.token,p.search_text,y,p.scenarios,p.status).then((function(e){return H(e,t.user_id)}))}})))},M=function(e){var t=e.onSearch,a=Object(o["useState"])([]),n=Object(i["a"])(a,2),l=n[0],u=n[1];return Object(o["useEffect"])((function(){Object(c["a"])(r.a.mark((function e(){var t,a;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(B["a"])();case 2:t=e.sent,a=t.results,u(a);case 5:case"end":return e.stop()}}),e)})))()}),[]),s.a.createElement(x["a"],{style:{marginTop:20},onFinish:t},s.a.createElement(E["a"],{gutter:16},s.a.createElement(v["a"],{flex:"auto"},s.a.createElement(x["a"].Item,{label:"Name/Description",name:"search_text"},s.a.createElement(k["a"],{placeholder:"Search by model name or description"}))),s.a.createElement(v["a"],{xs:24,sm:8},s.a.createElement(x["a"].Item,{label:"Model types",name:"types",initialValue:["public","original","base"]},s.a.createElement(g["a"],{mode:"multiple",showArrow:!0,placeholder:"Select model types",style:{width:"100%"},tagRender:W,options:[{label:"include public models",value:"public"},{label:"include self-created models",value:"original"},{label:"include base scenario models",value:"base"}]})))),s.a.createElement(E["a"],{gutter:24},s.a.createElement(v["a"],{xs:24,sm:16},s.a.createElement(x["a"].Item,{name:"scenarios",label:"Scenarios"},s.a.createElement(g["a"],{mode:"multiple",showArrow:!0,placeholder:"Filter scenarios",style:{width:"100%"},optionFilterProp:"children"},l.map((function(e){return s.a.createElement(g["a"].Option,{key:e.id,value:e.id},e.name)}))))),s.a.createElement(v["a"],{xs:24,sm:8},s.a.createElement(x["a"].Item,{style:{margin:0}},s.a.createElement(j["a"],{type:"primary",htmlType:"submit",style:{float:"right"}},s.a.createElement(T["a"],null),"Search")))))},N=Object(I["c"])((function(e){var t=e.user;return{user:t.currentUser}}))(L),J=function(e){var t=Object(l["k"])(),a=e.user,n=a.token,u=Object(o["useState"])({}),p=Object(i["a"])(u,2),b=p[0],f=p[1],h=t.query.id,w=void 0===h?null:h;return Object(o["useEffect"])((function(){null!==w&&Object(c["a"])(r.a.mark((function e(){var t;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(m["a"])({id:w},n);case 2:if(t=e.sent,"string"!==typeof t||!t.startsWith("ERROR")){e.next=8;break}return f({error:t}),e.abrupt("return",!0);case 8:return f(t),e.abrupt("return",!1);case 10:case"end":return e.stop()}}),e)})))()}),[w]),w?b.error?s.a.createElement(d["default"],{subTitle:"The model id with ".concat(w," inaccessible"),title:"The model you look for is private or cannot be found",redirection:"/charts/compare",buttonText:"Select model"}):s.a.createElement(y,{info:b}):s.a.createElement(N,null)};t["default"]=Object(u["a"])((function(e){var t=e.user;return{user:t.currentUser}}))(J)},pssB:function(e,t,a){"use strict";a.r(t);a("J+/v");var n=a("MoRW"),r=(a("+L6B"),a("2/Rp")),c=a("q1tI"),i=a.n(c),o=a("9kvl"),s=function(e){var t=e.redirection,a=void 0===t?"/":t,c=e.title,s=void 0===c?"404":c,l=e.subTitle,u=void 0===l?"Sorry, the page you visited does not exist.":l,d=e.buttonText,m=void 0===d?"Back Home":d;return i.a.createElement(n["a"],{status:"404",title:s,subTitle:u,extra:i.a.createElement(r["a"],{type:"primary",onClick:function(){return o["b"].push(a)}},m)})};t["default"]=s},tcq8:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a("WmNS"),r=a.n(n),c=a("9og8"),i=a("t3Un");function o(){return s.apply(this,arguments)}function s(){return s=Object(c["a"])(r.a.mark((function e(){return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(i["a"])("/api/scenario/"));case 1:case"end":return e.stop()}}),e)}))),s.apply(this,arguments)}},xHr7:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a("WmNS"),r=a.n(n),c=a("k1fw"),i=a("9og8"),o=a("t3Un");function s(e,t,a,n){return l.apply(this,arguments)}function l(){return l=Object(i["a"])(r.a.mark((function e(t,a,n,i){var s,l,u,d,m,p,b,f,h,w=arguments;return r.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(s=t.pageSize,l=t.current,u=w.length,d=new Array(u>4?u-4:0),m=4;m<u;m++)d[m-4]=w[m];return p=d[0],b=d[1],f=d[2],h={},i&&0!==i.trim().length&&(h.search=i),p&&0!==p.length&&(h.sorter=p),b&&b.length>0&&(h.scenarios=b.join(",")),h.status=f?f.join(","):"3",e.abrupt("return",Object(o["a"])("/api/model_run",{headers:{Authorization:"Token ".concat(n)},params:Object(c["a"])({limit:s,offset:s*(l-1),public:a.includes("public"),isBase:a.includes("base"),origin:a.includes("original"),status:"3"},h)}));case 9:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}}}]);