(this["webpackJsonp@react-bratus/app"]=this["webpackJsonp@react-bratus/app"]||[]).push([[0],{275:function(e,t,n){var o={"./da/messages.js":[513,3],"./en/messages.js":[514,4]};function a(e){if(!n.o(o,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],a=t[0];return n.e(t[1]).then((function(){return n.t(a,7)}))}a.keys=function(){return Object.keys(o)},a.id=275,e.exports=a},512:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),i=n(19),c=n.n(i),r=n(172),s=n(258),l=n(42),d=(n(267),n(60)),u=n(136),h=n(519),b=n(524),p=n(29),j=n(88),g=n.n(j),m=n(247);function f(){return(f=Object(m.a)(g.a.mark((function e(t){var o,a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(275)("./".concat(t,"/messages.js"));case 2:o=e.sent,a=o.messages,d.a.load(t,a),d.a.activate(t);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var O="react-bratus:settings:locale",x=function(){var e,t=Object(o.useState)(null!==(e=localStorage.getItem(O))&&void 0!==e?e:(navigator.languages&&navigator.languages[0]||navigator.language||navigator.userLanguage).split("-")[0]),n=Object(l.a)(t,2),a=n[0],i=n[1];return{locale:a,updateLocale:function(e){localStorage.setItem(O,e),i(e)}}},v=Object(o.createContext)({highlightedComponent:{componentName:null,locked:!1}}),y=n(5),w=function(e){var t=e.children,n=Object(o.useState)({componentName:null,locked:!1}),a=Object(l.a)(n,2),i=a[0],c=a[1];return Object(y.jsx)(v.Provider,{value:{highlightedComponent:i,setHighlightedComponent:c},children:t})},k=n(173),C=n(248),S=n.n(C);d.a.loadLocaleData("en",{plurals:k.b}),d.a.loadLocaleData("da",{plurals:k.a});var D=function(e){var t=e.children;return Object(u.b)().i18n.locale?Object(y.jsx)(y.Fragment,{children:t}):null};D.propTypes={children:S.a.any};var N,B,F,H,U,L,T,I,E,P,_,R,M,G,J=D,V=n(25),q=n(24),z={primary:"#00D8FF",secondary:"#001529"},A=Object(q.b)(N||(N=Object(V.a)(["\n"]))),$=function(e){var t=e.children;return Object(y.jsxs)(q.a,{theme:z,children:[Object(y.jsx)(A,{}),t]})},W=12,Y=172,K=q.c.div(B||(B=Object(V.a)(["\n  height: ","px;\n  width: ","px;\n  padding: ","px;\n  border-radius: ","px;\n  border: ",";\n  background-color: white;\n"])),(function(e){return 44+e.linesOfCode}),Y,W,8,(function(e){return e.isHighlighted?"3px dotted red":"1px solid black"})),Q=function(e){var t=e.id,n=e.data,a=Object(o.useContext)(v).highlightedComponent;return Object(y.jsxs)(K,{linesOfCode:n.linesOfCode,isHighlighted:!!a.componentName&&t.match("".concat(a.componentName,":+.+|").concat(a.componentName,"$")),children:[n.inDegree>0&&Object(y.jsx)(p.b,{type:"target",position:"left"}),Object(y.jsxs)("div",{children:[n.label,n.component.timesUsed>1&&"(".concat(n.component.timesUsed,")")]}),n.outDegree>0&&Object(y.jsx)(p.b,{type:"source",position:"right"})]})},X=Object(q.c)(p.c)(F||(F=Object(V.a)(["\n  position: absolute;\n  right: ","px;\n  top: ","px;\n"])),W,W),Z=function(e){var t=e.elements,n=Object(o.useContext)(v),a=n.highlightedComponent,i=n.setHighlightedComponent,c=Object(p.h)((function(e){return e.nodes})),r=Object(p.g)((function(e){return e.setSelectedElements})),s=function(e,t){var n=e?e.data.label:null;t?(i({componentName:n,locked:t}),r(c.filter((function(t){return t.id.includes(e.id)})))):a.locked||i({componentName:n,locked:a.locked})};return Object(y.jsx)(y.Fragment,{children:t&&Object(y.jsxs)(p.e,{elements:t,nodeTypes:{reactComponent:Q},onNodeMouseEnter:function(e,t){return s(t,!1)},onNodeMouseLeave:function(){a.locked||i({componentName:null,locked:!1})},onElementClick:function(e,t){return s(t,!0)},onPaneClick:function(){return i({componentName:null,locked:!1})},children:[Object(y.jsx)(X,{nodeColor:function(e){return a.componentName&&e.id.match("".concat(a.componentName,":+.+|").concat(a.componentName,"$"))?"red":"black"}}),Object(y.jsx)(p.a,{})]})})},ee=n(525),te=n(518),ne=n(522),oe=function(e,t){var n=Object(o.useState)((function(){var n=window.localStorage.getItem(t);return null!==n?JSON.parse(n):e})),a=Object(l.a)(n,2),i=a[0],c=a[1];return Object(o.useEffect)((function(){console.log(i),window.localStorage.setItem(t,JSON.stringify(i))}),[t,i]),[i,c]},ae=n(520),ie=n(521),ce=n(517),re=n(169),se=n.n(re),le=n(174),de=n.n(le),ue=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"LR",n=new de.a.graphlib.Graph;n.setDefaultEdgeLabel((function(){return{}}));var o="LR"===t;n.setGraph({rankdir:t});var a=2;return e.forEach((function(e){Object(p.f)(e)?n.setNode(e.id,{width:Y*a,height:44+e.data.linesOfCode}):n.setEdge(e.source,e.target)})),de.a.layout(n),e.map((function(e){if(Object(p.f)(e)){var t=n.node(e.id);e.targetPosition=o?"left":"top",e.sourcePosition=o?"right":"bottom",e.position={x:t.x-Y*a/2+Math.random()/1e3,y:t.y-(36+e.data.linesOfCode)/2}}return e}))},he=q.c.div(H||(H=Object(V.a)(["\n  width: 600px;\n  height: 500px;\n"]))),be=ae.a.Title,pe=ae.a.Paragraph,je=ae.a.Link,ge=[{id:"node-1",type:"reactComponent",data:{label:"I am a component",component:{timesUsed:1},linesOfCode:1,outDegree:1,inDegree:0},position:{x:0,y:0}},{id:"node-2",type:"reactComponent",data:{label:"Solid connections denote components that are rendered by default",component:{timesUsed:1},linesOfCode:80,outDegree:0,inDegree:1},position:{x:0,y:0}},{id:"node-3",type:"reactComponent",data:{label:"My height is proportional to how many lines of code I have.",component:{timesUsed:1},linesOfCode:120,outDegree:1,inDegree:0},position:{x:0,y:0}},{id:"node-4",type:"reactComponent",data:{label:"Blue dashed connections denote a Route.",component:{timesUsed:1},linesOfCode:120,outDegree:0,inDegree:1},position:{x:0,y:0}},{id:"node-5",type:"reactComponent",data:{label:"This is how many times I have been used ->",component:{timesUsed:6},linesOfCode:40,outDegree:1,inDegree:0},position:{x:0,y:0}},{id:"node-6",type:"reactComponent",data:{label:"Black dashed connection denote a component rendered within an if-statement",component:{timesUsed:1},linesOfCode:240,outDegree:0,inDegree:1},position:{x:0,y:0}},{id:"edge-1",source:"node-1",target:"node-2"},{id:"edge-2",source:"node-3",target:"node-4",label:"/route_to_rendered_component",animated:!0,labelBgPadding:[8,4],labelBgBorderRadius:4,labelBgStyle:{fill:"#001529",fillOpacity:.7},labelStyle:{fill:"#fff"},style:{stroke:"#00D8FF"}},{id:"edge-3",source:"node-5",target:"node-6",animated:!0}],me=function(e){var t=e.isHelpVisible,n=e.hideHelpOnStartUp,a=e.setIsHelpVisible,i=e.setHideHelpOnStartUp,c=Object(p.i)().setCenter;return Object(o.useEffect)((function(){return c(350,350,.7)})),Object(y.jsxs)(ie.a,{width:720,onClose:function(){return a(!1)},visible:t,bodyStyle:{paddingBottom:80},children:[Object(y.jsx)(be,{level:3,children:"Thank you for installing react-bratus"}),Object(y.jsx)(pe,{children:"Hopefully this tool can help you navigate your React.js code base. Below this paragraph you can find the elements that are displayed and what they represent."}),Object(y.jsx)(pe,{children:"You can always click the Help button in navigation pane on the right to see this window again."}),Object(y.jsx)(se.a,{checked:n,onChange:function(e){return i(e.target.checked)},children:"Don't show me this again"}),Object(y.jsx)(ce.a,{}),Object(y.jsx)(be,{level:3,children:"Feedback"}),Object(y.jsxs)(pe,{children:["I hope that you have time to give me feedback. Any feature ideas, constructive criticism, or bugs are welcomed in the"," ",Object(y.jsx)(je,{href:"https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=feedback&template=feedback.md&title=%5BFeedback%5D",children:"GitHub repository."})]}),Object(y.jsx)(ce.a,{}),Object(y.jsx)(be,{level:3,children:"Legend"}),Object(y.jsx)(he,{children:Object(y.jsx)(p.e,{elements:ue(ge),nodeTypes:{reactComponent:Q},paneMoveable:!1,zoomOnScroll:!1})})]})},fe=n(262),Oe=n(523),xe=q.c.div(U||(U=Object(V.a)(["\n  padding-top: ","px;\n  padding-bottom: ","px;\n  padding-left: ","px;\n"])),24,W,24),ve=q.c.h2(L||(L=Object(V.a)(["\n  color: white;\n  font-weight: 400;\n  text-align: right;\n  margin-bottom: ","px;\n  padding-right: ","px;\n"])),W,W),ye=q.c.hr(T||(T=Object(V.a)(["\n  width: ","px;\n  color: blue;\n  margin: 0;\n  margin-left: auto;\n"])),230),we=function(e){var t=e.children;return Object(y.jsxs)(xe,{children:[Object(y.jsx)(ve,{children:t}),Object(y.jsx)(ye,{})]})},ke=q.c.div(I||(I=Object(V.a)(["\n  display: flex;\n  flex-direction: column;\n  height: auto;\n"]))),Ce=function(e){var t=e.children,n=e.title;return Object(y.jsxs)(ke,{children:[Object(y.jsx)(we,{children:n}),t]})},Se=ae.a.Paragraph,De=ae.a.Title,Ne=Object(q.c)(De)(E||(E=Object(V.a)(["\n  color: #fff !important;\n  text-align: center;\n"]))),Be=Object(q.c)(Se)(P||(P=Object(V.a)(["\n  color: #fff;\n  line-height: ","px;\n  font-size: ","px;\n  text-align: right;\n  padding: 0 ","px;\n"])),24,14,W),Fe=q.c.span(_||(_=Object(V.a)(["\n  color: ",";\n"])),(function(e){return e.theme.primary})),He=q.c.div(R||(R=Object(V.a)(["\n  display: flex;\n  flex-direction: row-reverse;\n  flex-wrap: wrap;\n  padding: ","px;\n  margin-left: auto;\n  width: 100%;\n\n  > * {\n    &:not(:last-child) {\n      margin-left: ","px;\n      margin-bottom: ","px;\n    }\n  }\n"])),W,W,W),Ue=te.a.Sider,Le=function(e){var t=e.info;return Object(y.jsxs)(Ue,{width:250,style:{overflow:"auto",height:"100vh",position:"fixed",left:0},children:[Object(y.jsx)(Ne,{level:1,children:"react-bratus"}),Object(y.jsxs)(Oe.a,{theme:"dark",mode:"inline",children:[t&&Object(y.jsxs)(Ce,{title:"Info",children:[Object(y.jsxs)(Be,{children:["your tree contains"," ",Object(y.jsxs)(Fe,{children:[t.uniqueComponents," "]}),"unique components"]}),Object(y.jsxs)(Be,{children:["your components are on average reused",Object(y.jsxs)(Fe,{children:[" ",t.averageTimesUsed.toFixed(2)," "]}),"times"]}),Object(y.jsxs)(Be,{children:["your average component consist of",Object(y.jsxs)(Fe,{children:[" ",t.averageLinesOfCode.toFixed(0)," "]}),"lines of code"]})]}),Object(y.jsx)(Ce,{title:"Actions",children:Object(y.jsxs)(He,{children:[Object(y.jsx)(ne.a,{onClick:function(){fetch("http://localhost:4444/compile",{method:"POST"}).then((function(){var e=fe.b.loading("Recompiling. Window will refresh soon..",0);setTimeout((function(){return e}),2e3),setTimeout((function(){location.reload()}),4e3)})).catch((function(e){return console.log("An error occurred ",e)}))},ghost:!0,children:"Recompile"}),Object(y.jsx)(ne.a,{target:"_blank",href:"https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=feedback&template=feedback.md&title=%5BFeedback%5D",ghost:!0,children:"Give feedback"}),Object(y.jsx)(ne.a,{target:"_blank",href:"https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BBUG%5D+",ghost:!0,children:"Submit bug"}),Object(y.jsx)(ne.a,{target:"_blank",href:"https://github.com/stephanboersma/react-bratus/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=%5BFeature%5D",ghost:!0,children:"Suggest new feature"})]})}),Object(y.jsxs)(Ce,{title:"Controls",children:[Object(y.jsx)(Be,{children:"hover components with your mouse to highlight"}),Object(y.jsx)(Be,{children:"click a component to lock the highlight"})]})]})]})},Te=Object(q.c)(te.a)(M||(M=Object(V.a)(["\n  margin-left: ","px;\n  padding: 1rem;\n  height: 100vh;\n"])),250),Ie=Object(q.c)(ne.a)(G||(G=Object(V.a)(["\n  position: absolute;\n  bottom: ","px;\n  left: ","px;\n"])),24,24),Ee=function(e){var t=e.children,n=e.info,a=oe(!1,"react-bratus:hide-help"),i=Object(l.a)(a,2),c=i[0],r=i[1],s=Object(o.useState)(!c),d=Object(l.a)(s,2),u=d[0],h=d[1];return Object(y.jsxs)(te.a,{children:[Object(y.jsx)(Le,{info:n}),Object(y.jsx)(Te,{children:t}),Object(y.jsx)(p.d,{children:Object(y.jsx)(me,{isHelpVisible:u,setIsHelpVisible:h,hideHelpOnStartUp:c,setHideHelpOnStartUp:r})}),Object(y.jsx)(Ie,{type:"primary",shape:"round",size:"large",icon:Object(y.jsx)(ee.a,{}),onClick:function(){return h(!0)},children:"Open help"})]})},Pe=function(){var e=x().locale,t=Object(o.useState)(null),n=Object(l.a)(t,2),a=n[0],i=n[1],c=Object(o.useState)(null),j=Object(l.a)(c,2),g=j[0],m=j[1];return Object(o.useEffect)((function(){!function(e){f.apply(this,arguments)}(e),fetch("http://localhost:4444/parsedData").then((function(e){return e.json()})).then((function(e){m(e.info);var t=Object(s.a)(new Set(e.nodes.map((function(e){return e.data.label}))));console.log(t),i(ue([].concat(e.nodes,e.edges.map((function(e){return Object(r.a)(Object(r.a)({},e),{},{labelBgPadding:[8,4],labelBgBorderRadius:4,labelBgStyle:{fill:"#001529",fillOpacity:.7},labelStyle:{fill:"#fff"},style:{stroke:e.label?"#00D8FF":"#000"}})})))))})).catch(console.log)}),[e]),Object(y.jsx)(u.a,{i18n:d.a,children:Object(y.jsx)(J,{children:Object(y.jsx)($,{children:Object(y.jsx)(w,{children:Object(y.jsx)(Ee,{info:g,children:a?Object(y.jsx)(p.d,{children:Object(y.jsx)(Z,{elements:a})}):Object(y.jsx)(h.a,{spinning:!0,children:Object(y.jsx)(b.a,{message:"Nothing to show",description:"Could not find any components to display",type:"warning"})})})})})})})},_e=function(e){e&&e instanceof Function&&n.e(5).then(n.bind(null,526)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),o(e),a(e),i(e),c(e)}))};c.a.render(Object(y.jsx)(a.a.StrictMode,{children:Object(y.jsx)(Pe,{})}),document.getElementById("root")),_e()}},[[512,1,2]]]);
//# sourceMappingURL=main.43f64c06.chunk.js.map