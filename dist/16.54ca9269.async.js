(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{hmE6:function(e,t,a){e.exports={linePlot:"linePlot___1mMWu",linePlotSelect:"linePlotSelect___N_qs6",utilityButtons:"utilityButtons___20uyg",noDateEntry:"noDateEntry___HdY94"}},sniF:function(e,t,a){},vIVl:function(e,t,a){"use strict";a.r(t);a("/zsF");var n=a("PArb"),l=(a("OaEy"),a("2fM7")),i=a("tJVT"),r=a("yP6+"),c=a("q1tI"),o=a.n(c),u=a("+n12"),s=(a("sniF"),a("hmE6")),m=a.n(s),p=function(e){var t=e.percentiles,a=e.data,s=e.reductionYear,p=Object(c["useState"])(75),d=Object(i["a"])(p,2),E=d[0],h=d[1],y=Object(c["useState"])(25),v=Object(i["a"])(y,2),f=v[0],b=v[1];return o.a.createElement("div",{className:m.a.linePlot},o.a.createElement("div",{className:m.a.linePlotSelect},o.a.createElement(l["a"],{placeholder:"Select percentile upper bound",onChange:h,value:E},t.map((function(e){return o.a.createElement(l["a"].Option,{value:e,key:e},"".concat(Object(u["c"])(e)," percentile"))}))),o.a.createElement(l["a"],{placeholder:"Select percentile lower bound",onChange:b,value:f},t.map((function(e){return o.a.createElement(l["a"].Option,{value:e,key:e},"".concat(Object(u["c"])(e)," percentile"))}))),o.a.createElement(n["a"],null)),o.a.createElement(r["Chart"],{padding:[10,20,50,60],autoFit:!0,height:500,data:0===Object.keys(a).length||0===E||0===f?[]:a[E].map((function(e,t){return{year:e.year,value:[a[f][t].value,e.value]}})),scale:{value:{min:0,alias:"Amount of Nitrogen"},nice:!0,year:{tickCount:10}},placeholder:o.a.createElement("div",{className:m.a.noDateEntry},"Select from above percentile list"),defaultInteractions:["tooltip","element-highlight","legend-highlight"],pure:!0},o.a.createElement(r["Legend"],{position:"top"}),o.a.createElement(r["Slider"],null),o.a.createElement(r["Area"],{position:"year*value",color:"percentile",style:{fill:"#1890ff"}}),o.a.createElement(r["Tooltip"],{showCrosshairs:!0,shared:!0}),o.a.createElement(r["Axis"],{name:"value",title:!0}),o.a.createElement(r["Axis"],{name:"year"}),s?o.a.createElement(r["Annotation"].Line,{start:[s,"min"],end:[s,"max"],text:{position:"90%",content:"reduction year",style:{fill:"red"},autoRotate:!1}}):null))};t["default"]=p}}]);