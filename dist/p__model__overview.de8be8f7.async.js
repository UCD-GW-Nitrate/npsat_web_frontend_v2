(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{gUIs:function(e,t,a){"use strict";a.r(t);a("OaEy");var n=a("2fM7"),r=a("oBTY"),l=(a("cIOH"),a("Q9mQ"),a("+L6B"),a("q1tI")),i=a.n(l),o=a("sKbD"),c=a.n(o),s=a("4IlW"),u=a("3S7+"),d=a("2/Rp"),p=a("zvFY"),m=a("YMnH"),f=a("ZvpZ"),b=a("H84U"),v=a("bogI"),y=a("0n0R"),h=void 0;function g(){return g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},g.apply(this,arguments)}function w(e,t){return j(e)||x(e,t)||k(e,t)||E()}function E(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function k(e,t){if(e){if("string"===typeof e)return O(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?O(e,t):void 0}}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function x(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,l=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done);n=!0)if(a.push(i.value),t&&a.length===t)break}catch(c){r=!0,l=c}finally{try{n||null==o["return"]||o["return"]()}finally{if(r)throw l}}return a}}function j(e){if(Array.isArray(e))return e}var C=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},T=l["forwardRef"]((function(e,t){var a=l["useState"](e.visible),n=w(a,2),r=n[0],i=n[1];l["useEffect"]((function(){"visible"in e&&i(e.visible)}),[e.visible]),l["useEffect"]((function(){"defaultVisible"in e&&i(e.defaultVisible)}),[e.defaultVisible]);var o=function(t,a){"visible"in e||i(t),e.onVisibleChange&&e.onVisibleChange(t,a)},c=function(t){o(!1,t),e.onConfirm&&e.onConfirm.call(h,t)},E=function(t){o(!1,t),e.onCancel&&e.onCancel.call(h,t)},k=function(e){e.keyCode===s["a"].ESC&&r&&o(!1,e)},O=function(t){var a=e.disabled;a||o(t)},x=function(t,a){var n=e.okButtonProps,r=e.cancelButtonProps,i=e.title,o=e.cancelText,s=e.okText,u=e.okType,m=e.icon;return l["createElement"]("div",{className:"".concat(t,"-inner-content")},l["createElement"]("div",{className:"".concat(t,"-message")},m,l["createElement"]("div",{className:"".concat(t,"-message-title")},Object(v["a"])(i))),l["createElement"]("div",{className:"".concat(t,"-buttons")},l["createElement"](d["a"],g({onClick:E,size:"small"},r),o||a.cancelText),l["createElement"](d["a"],g({onClick:c},Object(p["a"])(u),{size:"small"},n),s||a.okText)))},j=l["useContext"](b["b"]),T=j.getPrefixCls,S=e.prefixCls,I=e.placement,D=e.children,A=C(e,["prefixCls","placement","children"]),P=T("popover",S),R=l["createElement"](m["a"],{componentName:"Popconfirm",defaultLocale:f["a"].Popconfirm},(function(e){return x(P,e)}));return l["createElement"](u["a"],g({},A,{prefixCls:P,placement:I,onVisibleChange:O,visible:r,overlay:R,ref:t}),Object(y["a"])(D,{onKeyDown:function(e){var t,a;null===(a=null===D||void 0===D?void 0:(t=D.props).onKeyDown)||void 0===a||a.call(t,e),k(e)}}))}));T.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:l["createElement"](c.a,null),disabled:!1};var S=T,I=(a("/zsF"),a("PArb")),D=(a("5Dmo"),a("tJVT")),A=a("WmNS"),P=a.n(A),R=(a("miYZ"),a("tsqr")),q=a("9og8"),M=(a("+BJd"),a("mr32")),N={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},_=N,z=a("6VBw"),B=function(e,t){return l["createElement"](z["a"],Object.assign({},e,{ref:t,icon:_}))};B.displayName="PlusOutlined";var V=l["forwardRef"](B),Y=a("9kvl"),H=a("/MKj"),K=a("Hx5s"),U=a("Qiat"),J=a("k1fw"),W=a("t3Un");function F(e,t,a){return L.apply(this,arguments)}function L(){return L=Object(q["a"])(P.a.mark((function e(t,a,n){var r,l,i,o,c,s,u,d,p=arguments;return P.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(r=t.pageSize,l=t.current,i=p.length,o=new Array(i>3?i-3:0),c=3;c<i;c++)o[c-3]=p[c];return s=o[0],u=o[1],d={},0!==s.length&&(d.sorter=s),e.abrupt("return",Object(W["a"])("/api/model_run",{headers:{Authorization:"Token ".concat(n)},params:Object(J["a"])({limit:r,offset:r*(l-1),public:a.includes("public"),isBase:a.includes("base"),origin:a.includes("original"),status:u.join(",")},d)}));case 6:case"end":return e.stop()}}),e)}))),L.apply(this,arguments)}function Q(e,t){return Z.apply(this,arguments)}function Z(){return Z=Object(q["a"])(P.a.mark((function e(t,a){return P.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(W["a"])("/api/model_run/".concat(t.id),{method:"DELETE",headers:{Authorization:"Token ".concat(a)}}));case 1:case"end":return e.stop()}}),e)}))),Z.apply(this,arguments)}var $=function(){Y["b"].push("/model/create")},G=function(e){var t,a=e.value,n=e.closable,r=e.onClose;switch(a){default:case"original":t="volcano";break;case"public":t="geekblue";break;case"base":t="green"}return i.a.createElement(M["a"],{color:t,closable:n,onClose:r,style:{marginRight:3}},a)},X=function(e,t){var a=e.results,n=[];return a.forEach((function(e){var a=e;a.key=a.id,a.tags=[],a.public&&a.tags.push("public"),a.is_base&&a.tags.push("base"),a.user===t&&a.tags.push("original"),n.push(a)})),{data:n,total:e.count}},ee=function(){var e=Object(q["a"])(P.a.mark((function e(t,a,n){var r;return P.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=R["a"].loading("Deleting..."),e.prev=1,e.next=4,Q({id:t},a);case 4:r(),R["a"].success("Model deleted. Refreshing..."),n.current.reload(),e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](1),r(),R["a"].error("Model deletion failed, please try again");case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,a,n){return e.apply(this,arguments)}}(),te=function(e){var t=e.user,a=t.token,o=t.user_id,c=Object(l["useState"])(""),s=Object(D["a"])(c,2),p=s[0],m=s[1],f=Object(l["useState"])([0,1,2,3,4]),b=Object(D["a"])(f,2),v=b[0],y=b[1],h=Object(l["useState"])(["public","base","original"]),g=Object(D["a"])(h,2),w=g[0],E=g[1],k=Object(l["useRef"])(),O=[{title:"Model Name",dataIndex:"name",valueType:"textarea"},{title:"Description",dataIndex:"description",valueType:"textarea",ellipsis:!0,width:250},{title:"Status",dataIndex:"status",filters:!0,valueEnum:{0:{text:"Not ready",status:"Warning"},1:{text:"In queue",status:"Default"},2:{text:"Running",status:"Processing"},3:{text:"Complete",status:"Success"},4:{text:"Error",status:"Error"}}},{title:"Date Created",dataIndex:"date_submitted",sorter:function(e,t){return new Date(e.date_submitted)>new Date(t.date_submitted)},valueType:"dateTime"},{title:"Date Completed",dataIndex:"date_completed",sorter:function(e,t){return new Date(e.date_completed)>new Date(t.date_completed)},valueType:"dateTime"},{title:"Types",key:"tags",dataIndex:"tags",render:function(e,t){return i.a.createElement("span",null,e.map((function(e){var a,n;switch(e){default:case"original":a="volcano",n="created by you";break;case"public":a="geekblue",n="accessible by everyone";break;case"base":a="green",n="base model of ".concat(t.scenario.name)}return i.a.createElement(u["a"],{title:n,key:t.key+e},i.a.createElement(M["a"],{color:a,key:e},e))})))}},{title:"Action",dataIndex:"option",valueType:"option",render:function(e,t){return i.a.createElement(i.a.Fragment,null,i.a.createElement(u["a"],{title:"view details"},i.a.createElement("a",{href:"/model/view?id=".concat(t.id)},"Details")),i.a.createElement(I["a"],{type:"vertical"}),i.a.createElement(u["a"],{title:t.is_base?"This a base model":"compare with base model",style:{pointerEvents:"all"}},i.a.createElement(d["a"],{style:{padding:0},href:"/charts/compare?id=".concat(t.id),disabled:t.is_base,type:"link"},"Compare")),i.a.createElement(I["a"],{type:"vertical"}),i.a.createElement(S,{title:"Are you sure deleting this model?",okText:"Yes",cancelText:"No",onConfirm:function(){return ee(t.id,a,k)}},i.a.createElement(u["a"],{title:"delete model"},i.a.createElement(d["a"],{type:"link",danger:!0,style:{padding:0}},"Delete"))))}}];return i.a.createElement(K["b"],{subTitle:"The table of all models available to you.",content:"This table includes the models you created, all public models and base scenario models. You can check them in details, compare their results, or delete the models created by you. Some features will be disabled if you view this page with a mobile device"},i.a.createElement(U["a"],{value:{intl:U["c"]}},i.a.createElement(K["d"].Consumer,null,(function(e){var t=e.isMobile;return i.a.createElement(U["b"],{scroll:{x:"max-content"},headerTitle:"Model Overview",actionRef:k,rowKey:"key",onChange:function(e,t,a){var n=a,r=t;n.order?m("".concat(n.field,",").concat(n.order)):m(""),r.status?y(r.status.map((function(e){return parseInt(e,10)}))):y([0,1,2,3,4])},toolBarRender:!t&&function(e,t){t.selectedRows;return[i.a.createElement(d["a"],{type:"primary",onClick:$},i.a.createElement(V,null)," New Model"),i.a.createElement(n["a"],{mode:"multiple",showArrow:!0,placeholder:"Select model types",style:{minWidth:240},tagRender:G,value:w,onChange:function(t){E(Object(r["a"])(t)),e.reload()},options:[{label:"include public models",value:"public"},{label:"include self-created models",value:"original"},{label:"include base scenario models",value:"base"}]})]},tableAlertRender:!1,request:function(e){return F(e,w,a,p,v).then((function(e){return X(e,o)}))},columns:O,rowSelection:!1,search:!1})}))))};t["default"]=Object(H["c"])((function(e){var t=e.user;return{user:t.currentUser}}))(te)}}]);