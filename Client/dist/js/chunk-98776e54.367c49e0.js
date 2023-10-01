(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98776e54"],{"1c1f":function(e,t,r){"use strict";var a=r("9f45"),i=r.n(a);i.a},6619:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"background"},[r("div",{staticClass:"container"},[e.recipe?r("div",[r("div",{staticClass:"recipe-header mt-3 mb-4"},[r("h1",{staticStyle:{"text-align":"center"}},[e._v(e._s(e.recipe.title))]),r("img",{staticClass:"center img-page",attrs:{src:e.recipe.image}})]),r("div",{staticClass:"recipe-body"},[r("div",{staticClass:"wrapper"},[r("div",{staticClass:"wrapped"},[r("div",{staticClass:"mb-3"},[r("div",[e.recipe.readyInMinutes?r("b-icon",{staticStyle:{width:"15px",height:"15px"},attrs:{icon:"clock"}}):e._e(),r("a",{staticStyle:{"margin-right":"10px","margin-bottom":"20px"}},[e._v(" "+e._s(e.recipe.readyInMinutes)+" minutes")])],1),r("div",[e.recipe.popularity>-1?r("b-icon",{staticStyle:{width:"15px",height:"15px"},attrs:{icon:"heart"}}):e._e(),r("a",{staticStyle:{"margin-right":"10px","margin-bottom":"15px"}},[e._v(" "+e._s(e.recipe.popularity))])],1),r("div",[e._v(" Servings: "+e._s(e.recipe.servings)+" ")]),r("div",[r("watchedFavoriteData",{staticClass:"text-left",staticStyle:{"margin-right":"25%"},attrs:{id:parseInt(this.recipe.id),watched:this.watched,favorite:this.favorite}})],1),r("div",{staticClass:"specialthings"},[e.recipe.vegan?r("b-badge",{staticStyle:{"margin-top":"10px","margin-right":"5px"},attrs:{variant:"success"}},[e._v("Vegan")]):e._e(),e.recipe.vegetarian?r("b-badge",{staticStyle:{"margin-top":"10px","margin-right":"5px"},attrs:{variant:"success"}},[e._v("Vegetarian")]):e._e(),e.recipe.glutenFree?r("b-badge",{staticStyle:{"margin-top":"10px","margin-right":"5px"},attrs:{variant:"success"}},[e._v("Gluten free")]):r("b-badge",{staticStyle:{"margin-top":"10px","margin-right":"5px"},attrs:{variant:"warning"}},[e._v("Have Gluten")])],1)]),r("div",{staticClass:"ingredients"},[r("h2",[e._v("Ingredients:")]),r("ul",e._l(e.recipe.extendedIngredients,(function(t,a){return r("li",{key:"_"+a},[e._v(" "+e._s(t)+" ")])})),0)])]),r("div",{staticClass:"wrapped"},[r("div",{staticClass:"instructions"},[r("h2",[e._v("Instructions:")]),r("ol",e._l(e.recipe._instructions,(function(t){return r("li",{key:t.number},[e._v(" "+e._s(t.description)+" ")])})),0)])])])])]):e._e()])])},i=[],s=(r("96cf"),r("1da1")),n=r("23f4"),c={components:{watchedFavoriteData:n["a"]},data:function(){return{recipe:null,favorite:!1,watched:!1}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a,i,s,n,c,o,p,u,d,l,v,g,h,m,x,f,_,b,w,y;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=e.$route.params.response,a=e.$route.params.recipeId,t.prev=3,t.next=6,e.axios.get(e.$root.store.server_domain+"/recipes/"+a);case 6:r=t.sent,t.next=13;break;case 9:return t.prev=9,t.t0=t["catch"](3),console.log("error.response.status",t.t0.response.status),t.abrupt("return");case 13:for(i=r.data.recipe,s=i.id,n=i.analyzedInstructions,c=i.instructions,o=i.extendedIngredients,p=i.popularity,u=i.readyInMinutes,d=i.image,l=i.title,v=i.servings,g=i.vegan,h=i.vegetarian,m=i.glutenFree,x=[],f=0;f<n.length;f++)x.push(n[f]);if(_={id:s,instructions:c,_instructions:x,analyzedInstructions:n,extendedIngredients:o,popularity:p,readyInMinutes:u,image:d,title:l,servings:v,vegan:g,vegetarian:h,glutenFree:m},e.recipe=_,!e.$root.store.username){t.next=29;break}return t.prev=19,t.next=22,e.axios.post(e.$root.store.server_domain+"/users/AddToWatched",{recipeId:a},{withCredentials:!0});case 22:t.sent,t.next=29;break;case 25:t.prev=25,t.t1=t["catch"](19),console.log(t.t1),401===t.t1.status?(e.$root.store.logout(),e.$router.push("/")["catch"]((function(){e.$forceUpdate()}))):e.$router.push("*")["catch"]((function(){e.$forceUpdate()}));case 29:t.next=34;break;case 31:t.prev=31,t.t2=t["catch"](0),console.log(t.t2);case 34:if(!e.$root.store.username){t.next=48;break}return t.prev=35,b=e.$route.params.recipeId,t.next=39,e.axios.get(e.$root.store.server_domain+"/users/CheckFavoriteWatched/"+b,{withCredentials:!0});case 39:w=t.sent,y=w.data,e.favorite=y[b].favorite,e.watched=y[b].watched,t.next=48;break;case 45:t.prev=45,t.t3=t["catch"](35),console.log(t.t3);case 48:case"end":return t.stop()}}),t,null,[[0,31],[3,9],[19,25],[35,45]])})))()}},o=c,p=(r("1c1f"),r("2877")),u=Object(p["a"])(o,a,i,!1,null,"3f5391f5",null);t["default"]=u.exports},"9f45":function(e,t,r){}}]);
//# sourceMappingURL=chunk-98776e54.367c49e0.js.map