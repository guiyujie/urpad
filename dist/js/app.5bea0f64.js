(function(t){function e(e){for(var r,a,u=e[0],s=e[1],l=e[2],d=0,f=[];d<u.length;d++)a=u[d],i[a]&&f.push(i[a][0]),i[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);c&&c(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,u=1;u<n.length;u++){var s=n[u];0!==i[s]&&(r=!1)}r&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},i={app:0},o=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/urpad.github.io/dist/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var c=s;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),i=n.n(r);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r,i,o,a=n("2b0e"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("div",{staticClass:"body"},[n("transition",{attrs:{"enter-active-class":"animated slideInRight","leave-active-class":"animated slideOutLeft"},on:{"after-leave":t.cal}},[n("media",{directives:[{name:"show",rawName:"v-show",value:!t.n,expression:"!n"}],attrs:{url:t.urlCurrent,video:t.current.video},on:{next:t.play}})],1),n("transition",{attrs:{"enter-active-class":"animated slideInRight","leave-active-class":"animated slideOutLeft"},on:{"after-leave":t.cal}},[n("media",{directives:[{name:"show",rawName:"v-show",value:t.n,expression:"n"}],attrs:{url:t.urlNext,video:t.next.video},on:{next:t.play}})],1)],1):t._e()},s=[],l=(n("4b3c"),n("bc3a")),c=n.n(l);i=void 0,r=/\.(mp4|ogg|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i,o=function(){var t;return t=location.search.match(new RegExp("[?&]"+name+"=([^&]+)","i")),null===t||t.length<1?"":t[1]};var d={components:{media:n("d4eb").default},data:function(){return{n:1,show:!1,config:{sideTime:10},current:{},next:{},key:"h_id",index:0,li:[]}},computed:{urlCurrent:function(){return this.current[this.key]},urlNext:function(){return this.next[this.key]}},methods:{timeout:function(){var t;return t=(t=>{return i=setTimeout(this.play,1e3*t)}),0===this.n&&this.current.video||1===this.n&&this.next.video?console.log("stoped"):t(this.config.sideTime)},play:function(){return i&&clearTimeout(i),this.n=!this.n-0,this.index=++this.index%this.li.length,this.timeout()},cal:function(){var t;return t=this.li[this.index],r.test(t[this.key])&&(t.video=!0),1===this.n?this.current=t:this.next=t}},mounted:function(){var t;return t=o("imei")||353114008096366,c.a.get(`https://gyj.urer.top/-api/upad/gg?imei=${t}`).then(t=>{var e;return this.li=t.data,this.li.filter(t=>{return"0"!==t.h_id}),e=this.li[this.index],r.test(e[this.key])&&(e.video=!0),this.current=e,this.next=this.li[(this.index+1)%this.li.length],this.show=!0,this.play()})}};document.addEventListener("keydown",function(t){return t.preventDefault()}),document.addEventListener("keyup",function(t){return t.preventDefault()});var f=d,h=(n("034f"),n("2877")),p=Object(h["a"])(f,u,s,!1,null,null,null),v=p.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(v)}}).$mount("#app")},"64a9":function(t,e,n){},"6aaf":function(t,e,n){},d4eb:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"media"},[t.video?n("video",{attrs:{muted:"",autoplay:"true",poster:"ur.gif"},domProps:{muted:!0},on:{ended:t.next,error:t.next}},[n("source",{attrs:{src:t.prefix+t.url}})]):n("div",{staticClass:"img",style:{backgroundImage:"url("+t.prefix+t.url+")"},on:{error:t.next}})])},i=[],o={props:{url:String,video:Boolean,prefix:{type:String,default:"https://p.gu321.com/"}},methods:{next:function(){return this.$emit("next")}}},a=o,u=(n("f8f2"),n("2877")),s=Object(u["a"])(a,r,i,!1,null,null,null);e["default"]=s.exports},f8f2:function(t,e,n){"use strict";var r=n("6aaf"),i=n.n(r);i.a}});
//# sourceMappingURL=app.5bea0f64.js.map