(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{114:function(e,n,t){},115:function(e,n,t){},123:function(e,n,t){},124:function(e,n,t){},134:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t.n(c),i=t(18),r=t.n(i),a=(t(95),t(17)),l=t(59),s=t.n(l),j=t(139),u=(t(114),t(79)),d=t(60),b=(t(115),function(e){var n=Object(c.useState)(!1),t=Object(a.a)(n,2),o=t[0],i=t[1];return Object(c.useEffect)((function(){var n=window.matchMedia(e);n.matches!==o&&i(n.matches);var t=function(){i(n.matches)};return n.addListener(t),function(){return n.removeListener(t)}}),[o,e]),o}),h=t(5),O=[{label:"C++",value:"clike"},{label:"Rust",value:"rust"},{label:"Python",value:"python"}],x=function(e){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("select",{value:e.value,onClick:e.onElection,children:O.map((function(e){return Object(h.jsx)("option",{value:e.value,children:e.label})}))})})};t(117),t(118),t(120),t(121),t(122);var p=function(e){var n=b("(max-width: 800px)"),t=Object(c.useState)("python"),o=Object(a.a)(t,2),i=o[0],r=o[1],l=Object(c.useState)("python"),s=Object(a.a)(l,2),j=s[0],O=s[1];return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{className:"container",children:[e.display&&Object(h.jsx)(u.a,{direction:n?"s":"e",style:{flexGrow:"1"},children:Object(h.jsxs)("div",{className:"area1",children:[Object(h.jsx)(x,{value:i,onElection:function(e){r(e.target.value),console.log(i)}}),Object(h.jsx)("button",{onClick:function(){e.onDisplay(!1)},children:"Quitar preview"}),Object(h.jsx)("button",{onClick:function(){return e.onNext(0)},children:"\u2190"})," ",Object(h.jsx)("button",{onClick:function(){return e.onNext(1)},children:"frontend\u2192"}),"  ",Object(h.jsx)(d.UnControlled,{value:e.preview,options:{mode:i,theme:"material",lineNumbers:!0,autoCursor:!1,readOnly:"nocursor"},onChange:function(n,t,c){e.onWrite(c,2)}})]})}),Object(h.jsxs)("div",{className:"area1",children:[Object(h.jsx)(x,{value:j,onElection:function(e){O(e.target.value),console.log(j)}}),Object(h.jsx)("button",{onClick:function(){e.onDisplay(!0)},children:"ver preview"}),Object(h.jsx)(d.UnControlled,{options:{mode:j,theme:"material",lineNumbers:!0,autoCursor:!1},value:e.val,onChange:function(n,t,c){e.onWrite(c,1)}})]},"bro")]})})},f=(t(123),function(){return Object(h.jsx)("header",{children:Object(h.jsx)("div",{id:"navbar",children:Object(h.jsxs)("ul",{children:[Object(h.jsx)("input",{}),Object(h.jsx)("li",{children:"Guardar "}),Object(h.jsx)("li",{children:"Subir C\xf3digo "}),Object(h.jsx)("li",{children:"Convertir a PDF "}),Object(h.jsx)("li",{children:"Ajustes"})]})})})}),v=(t(124),t(136)),m=t(138),g=function(e){return Object(h.jsxs)(v.a,{className:"card",children:[Object(h.jsx)("p",{children:" skkdjf"}),Object(h.jsx)("code",{children:e.content?e.content.substr(0,30)+"...":""}),Object(h.jsx)(m.a,{onClick:function(){return e.onRemove(e.id),e.onWrite(e.content,0)},size:"middle",block:!0,type:"dashed",children:" Agregar"}),Object(h.jsx)(m.a,{onClick:function(){return e.onDisplay(!0),e.onWrite(e.content,2)},size:"middle",block:!0,type:"dashed",children:"Preview"})]})},y=[{topic:"binary search",content:"\ncou = 0\nmap = Dict{Int32, Int32}()  \nban = 1\nwhile ban == 1\n    for a in text\n        num= a[2:end]\n        num = parse(Int32,num)\n        if a[1] == '-'\n            num*=-1\n        end\n        global cou += num\n        if haskey(map , cou) == true\n            global ban = 0\n            break\n        else\n            push!(map, cou => 3)\n        end\n    end\nend\nprintln(cou)",id:0,author:"yolo"},{topic:"earch",id:1,content:"l",author:"yolo"},{topic:"earch",content:"o ",id:9,author:"yolo"},{topic:"earch",content:"const Cards = () => ( <Card> <p> skdjfskdjf</p> ",id:7,author:"yolo"},{topic:"earch",content:"const Cards = () => ( <Card> <p> skdjfskdjf</p> ",id:5,author:"yolo"},{topic:"earch",content:"a",id:3,author:"yolo"}],C=j.a.Sider;var k=function(e){var n=o.a.useState(y),t=Object(a.a)(n,2),c=t[0],i=t[1],r=o.a.useState(""),l=Object(a.a)(r,2),j=l[0],u=l[1],d=o.a.useState(""),b=Object(a.a)(d,2),O=b[0],x=b[1],v=o.a.useState(""),m=Object(a.a)(v,2),g=m[0],k=m[1],S=o.a.useState(!1),F=Object(a.a)(S,2),N=F[0],D=F[1],W=o.a.useState(0),P=Object(a.a)(W,2),E=P[0],I=P[1];function R(e,n){var t=O;1===n?x(e):2===n?k(e):(""===t?t=e:t+="\n"+e,u(t))}function L(e){D(e)}return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("body",{children:[Object(h.jsx)(f,{}),Object(h.jsx)(C,{style:{overflowX:"auto",height:"100vh",position:"fixed",left:0},className:"barra",children:c.length?Object(h.jsx)(w,{list:c,onDisplay:L,onWrite:R,onRemove:function(e){var n=c;n.splice(e,1),i(n)}}):Object(h.jsx)("h2",{className:"banner_vacio",children:"vacia"})}),Object(h.jsxs)("main",{children:[Object(h.jsx)("button",{onClick:function(){s()({method:"POST",url:"/api/submit",data:{author:"yollotl",content:j}})},children:"load"}),Object(h.jsx)(p,{display:N,preview:g,onDisplay:L,onWrite:R,val:j,onNext:function(e){var n=0;(n=1===e?(E+1)%c.length:(E%c.length+c.length)%c.length)>=0&&n<c.length&&(I(n),k(c[E].content))}})]})]})})},w=function(e){return Object(h.jsx)(h.Fragment,{children:e.list.map((function(n,t){return Object(h.jsx)(g,{content:n.content,id:t,onRemove:e.onRemove,onDisplay:e.onDisplay,onWrite:e.onWrite})}))})},S=function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("label",{children:["User",Object(h.jsx)("input",{type:"text"})]}),Object(h.jsxs)("label",{children:["Password",Object(h.jsx)("input",{type:"text"})]})]})},F=t(88),N=t(16),D=function(){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(F.a,{children:Object(h.jsxs)(N.c,{children:[Object(h.jsx)(N.a,{path:"/login",children:Object(h.jsx)(S,{})}),Object(h.jsx)(N.a,{path:"/",children:Object(h.jsx)(k,{})})]})})})},W=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,140)).then((function(n){var t=n.getCLS,c=n.getFID,o=n.getFCP,i=n.getLCP,r=n.getTTFB;t(e),c(e),o(e),i(e),r(e)}))};r.a.render(Object(h.jsx)(o.a.StrictMode,{children:Object(h.jsx)(D,{})}),document.getElementById("root")),W()},95:function(e,n,t){}},[[134,1,2]]]);
//# sourceMappingURL=main.78f71033.chunk.js.map