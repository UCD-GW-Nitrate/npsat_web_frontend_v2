(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"+BJd":function(e,a,t){"use strict";t("cIOH"),t("6MrE")},"2Fcx":function(e,a,t){e.exports={container:"container___1Rq3A"}},"6MrE":function(e,a,t){},bsDN:function(e,a,t){e.exports={menu:"menu___3fMWW",right:"right___2CMz5",action:"action___3ut1O",search:"search___3FPts",account:"account___1r_Ku",avatar:"avatar___1Rx79",dark:"dark___1zu9O",name:"name___2eduw"}},cJ7L:function(e,a,t){"use strict";var n=t("q1tI"),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"}}]},name:"user",theme:"outlined"},c=r,o=t("6VBw"),u=function(e,a){return n["createElement"](o["a"],Object.assign({},e,{ref:a,icon:c}))};u.displayName="UserOutlined";a["a"]=n["forwardRef"](u)},maEh:function(e,a,t){"use strict";t.r(a);var n=t("0Owb"),r=t("oBTY"),c=t("k1fw"),o=(t("J+/v"),t("MoRW")),u=(t("+L6B"),t("2/Rp")),i=t("Hx5s"),s=t("q1tI"),l=t.n(s),m=t("uYtH"),d=t("9kvl"),f=t("HZnN"),h=(t("+BJd"),t("T2oS"),t("W9HT")),p=(t("lUTK"),t("BvKs")),v=t("fWQN"),g=t("mtLc"),b=t("yKVA"),y=t("879j"),_={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"}}]},name:"logout",theme:"outlined"},E=_,O=t("6VBw"),j=function(e,a){return s["createElement"](O["a"],Object.assign({},e,{ref:a,icon:E}))};j.displayName="LogoutOutlined";var k=s["forwardRef"](j),w=t("cJ7L"),N=(t("qVdP"),t("jsC+")),C=t("PpiC"),R=t("TSYQ"),x=t.n(R),M=t("2Fcx"),L=t.n(M),B=function(e){var a=e.overlayClassName,t=Object(C["a"])(e,["overlayClassName"]);return l.a.createElement(N["a"],Object(n["a"])({overlayClassName:x()(L.a.container,a)},t))},T=B,z=t("bsDN"),H=t.n(z),S=function(e){Object(b["a"])(t,e);var a=Object(y["a"])(t);function t(){var e;Object(v["a"])(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return e=a.call.apply(a,[this].concat(r)),e.onMenuClick=function(){var a=e.props.dispatch;a&&a({type:"user/logout"})},e}return Object(g["a"])(t,[{key:"render",value:function(){var e=this.props.currentUser,a=void 0===e?{avatar:"",name:""}:e,t=l.a.createElement(p["a"],{className:H.a.menu,selectedKeys:[],onClick:this.onMenuClick},l.a.createElement(p["a"].Item,{key:"logout"},l.a.createElement(k,null),"Log out"));return a&&a.token?l.a.createElement(T,{overlay:t},l.a.createElement("span",{className:"".concat(H.a.action," ").concat(H.a.account)},l.a.createElement(w["a"],{className:H.a.avatar}),l.a.createElement("span",{className:H.a.name},a.first_name&&a.last_name?"".concat(a.first_name," ").concat(a.last_name):"".concat(a.username)))):l.a.createElement("span",{className:"".concat(H.a.action," ").concat(H.a.account)},l.a.createElement(h["a"],{size:"small",style:{marginLeft:8,marginRight:8}}))}}]),t}(l.a.Component),A=Object(d["a"])((function(e){var a=e.user;return{currentUser:a.currentUser}}))(S),J=function(e){var a=e.theme,t=e.layout,n=H.a.right;return"dark"===a&&"topmenu"===t&&(n="".concat(H.a.right,"  ").concat(H.a.dark)),l.a.createElement("div",{className:n},l.a.createElement(A,null),!1)},U=Object(d["a"])((function(e){var a=e.settings;return{theme:a.navTheme,layout:a.layout}}))(J),D=t("+n12"),I=t("mxmt"),K=t.n(I),W=l.a.createElement(o["a"],{status:403,title:"403",subTitle:"Sorry, you are not authorized to access this page.",extra:l.a.createElement(u["a"],{type:"primary"},l.a.createElement(m["a"],{to:"/user/login"},"Go Login"))}),q=function e(a){return a.map((function(a){var t=Object(c["a"])(Object(c["a"])({},a),{},{children:a.children?e(a.children):void 0});return f["a"].check(a.authority,t,null)}))},F=l.a.createElement(i["a"],{copyright:"".concat((new Date).getFullYear()," Regents of the University of California"),links:[{key:"Division of Agriculture and Natural Resources",title:"Division of Agriculture and Natural Resources",href:"http://ucanr.edu/",blankTarget:!0},{key:"Groundwater",title:"Groundwater",href:"http://groundwater.ucdavis.edu/",blankTarget:!0}]}),V=function(e){var a=e.dispatch,t=e.children,c=e.settings,o=e.location,u=void 0===o?{pathname:"/"}:o;Object(s["useEffect"])((function(){a&&a({type:"user/fetchCurrent"})}),[]);var h=function(e){a&&a({type:"global/changeLayoutCollapsed",payload:e})},p=Object(D["a"])(e.route.routes,u.pathname||"/")||{authority:void 0},v=Object(d["d"])(),g=v.formatMessage;return l.a.createElement(i["e"],Object(n["a"])({logo:K.a,formatMessage:g,menuHeaderRender:function(e,a){return l.a.createElement(m["a"],{to:"/"},e,a)},onCollapse:h,menuItemRender:function(e,a){return e.isUrl||!e.path?a:l.a.createElement(m["a"],{to:e.path},a)},breadcrumbRender:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return[{path:"/",breadcrumbName:g({id:"menu.home"})}].concat(Object(r["a"])(e))},itemRender:function(e,a,t,n){var r=0===t.indexOf(e);return r?l.a.createElement(m["a"],{to:n.join("/")},e.breadcrumbName):l.a.createElement("span",null,e.breadcrumbName)},footerRender:function(){return F},menuDataRender:q,rightContentRender:function(){return l.a.createElement(U,null)}},e,c),l.a.createElement(f["a"],{authority:p.authority,noMatch:W},t))};a["default"]=Object(d["a"])((function(e){var a=e.global,t=e.settings;return{collapsed:a.collapsed,settings:t}}))(V)},mxmt:function(e,a,t){e.exports=t.p+"static/logo.3eac24c1.svg"}}]);