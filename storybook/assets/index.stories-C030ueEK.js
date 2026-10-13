import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{t as n}from"./Block-DNkcNSOJ.js";import{t as r}from"./Button-C0LgJv2v.js";import{t as i}from"./uipower-ZEEVkchZ.js";import{t as a}from"./Panel-h7tqFVYO.js";import{a as o,f as s,l as c,n as l,p as u,s as d,t as f}from"./scene-BKtSnj6A.js";var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{d(),f(),i(),u(),p=t(),m={title:`OREditor/Layout`,component:s},h=(e,t=l)=>({args:{editorData:t,panels:e},decorators:[e=>(0,p.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,p.jsx)(e,{})}),c(o)]}),g=h(),_=h(void 0,{...l,panelLayout:{type:`split`,id:`root`,direction:`horizontal`,children:[{ratio:.2,node:{type:`pane`,id:`left`,tabs:[`hierarchy`,`timeline`],active:`timeline`}},{ratio:.55,node:{type:`pane`,id:`center`,tabs:[`viewport:main`,`scene`],active:`viewport:main`}},{ratio:.25,node:{type:`split`,id:`right`,direction:`vertical`,children:[{ratio:.6,node:{type:`pane`,id:`rightTop`,tabs:[`property`,`textures`],active:`textures`}},{ratio:.4,node:{type:`pane`,id:`rightBottom`,tabs:[`timer`],active:`timer`}}]}}]}}),v=[{id:`my-tool`,title:`My Tool`,category:`Tools/Debug`,content:(0,p.jsx)(a,{children:(0,p.jsx)(n,{label:`My Tool`,children:(0,p.jsx)(r,{children:`Run`})})})}],y=h(v,{...l,panelLayout:{type:`split`,id:`root`,direction:`horizontal`,children:[{ratio:.2,node:{type:`pane`,id:`left`,tabs:[`hierarchy`,`scene`],active:`hierarchy`}},{ratio:.55,node:{type:`pane`,id:`center`,tabs:[`viewport:main`],active:`viewport:main`}},{ratio:.25,node:{type:`pane`,id:`right`,tabs:[`property`,`my-tool`],active:`my-tool`}}]}}),g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`fullscreen()`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`fullscreen(undefined, {
  ...storyEditorData,
  panelLayout: {
    type: "split",
    id: "root",
    direction: "horizontal",
    children: [{
      ratio: 0.2,
      node: {
        type: "pane",
        id: "left",
        tabs: ["hierarchy", "timeline"],
        active: "timeline"
      }
    }, {
      ratio: 0.55,
      node: {
        type: "pane",
        id: "center",
        tabs: ["viewport:main", "scene"],
        active: "viewport:main"
      }
    }, {
      ratio: 0.25,
      node: {
        type: "split",
        id: "right",
        direction: "vertical",
        children: [{
          ratio: 0.6,
          node: {
            type: "pane",
            id: "rightTop",
            tabs: ["property", "textures"],
            active: "textures"
          }
        }, {
          ratio: 0.4,
          node: {
            type: "pane",
            id: "rightBottom",
            tabs: ["timer"],
            active: "timer"
          }
        }]
      }
    }]
  }
})`,..._.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`fullscreen(userPanels, {
  ...storyEditorData,
  panelLayout: {
    type: "split",
    id: "root",
    direction: "horizontal",
    children: [{
      ratio: 0.2,
      node: {
        type: "pane",
        id: "left",
        tabs: ["hierarchy", "scene"],
        active: "hierarchy"
      }
    }, {
      ratio: 0.55,
      node: {
        type: "pane",
        id: "center",
        tabs: ["viewport:main"],
        active: "viewport:main"
      }
    }, {
      ratio: 0.25,
      node: {
        type: "pane",
        id: "right",
        tabs: ["property", "my-tool"],
        active: "my-tool"
      }
    }]
  }
})`,...y.parameters?.docs?.source}}},b=[`Default`,`SavedLayout`,`UserPanel`]})))()}x();export{g as Default,_ as SavedLayout,y as UserPanel,b as __namedExportsOrder,m as default};