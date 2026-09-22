import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Block-DbEB_BUz.js";import{n as i,t as a}from"./Button-C2iwwSd1.js";import{a as o,i as s}from"./react-CUNW4J_l.js";import{n as c,t as l}from"./Panel-CbZ9rSYw.js";import{a as u,l as d,n as f,s as p,t as m}from"./scene-vMGmAOon.js";var h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{p(),m(),n(),i(),c(),o(),h=t(),g={title:`OREditor/Layout`,component:s},_=(e,t=f)=>({args:{editorData:t,panels:e},decorators:[e=>(0,h.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,h.jsx)(e,{})}),d(u)]}),v=_(),y=_(void 0,{...f,panelLayout:{type:`split`,id:`root`,direction:`horizontal`,children:[{ratio:.2,node:{type:`pane`,id:`left`,tabs:[`hierarchy`,`timeline`],active:`timeline`}},{ratio:.55,node:{type:`pane`,id:`center`,tabs:[`viewport:main`,`scene`],active:`viewport:main`}},{ratio:.25,node:{type:`split`,id:`right`,direction:`vertical`,children:[{ratio:.6,node:{type:`pane`,id:`rightTop`,tabs:[`property`,`textures`],active:`textures`}},{ratio:.4,node:{type:`pane`,id:`rightBottom`,tabs:[`timer`],active:`timer`}}]}}]}}),b=[{id:`my-tool`,title:`My Tool`,content:(0,h.jsx)(l,{children:(0,h.jsx)(r,{label:`My Tool`,children:(0,h.jsx)(a,{children:`Run`})})})}],x=_(b,{...f,panelLayout:{type:`split`,id:`root`,direction:`horizontal`,children:[{ratio:.2,node:{type:`pane`,id:`left`,tabs:[`hierarchy`,`scene`],active:`hierarchy`}},{ratio:.55,node:{type:`pane`,id:`center`,tabs:[`viewport:main`],active:`viewport:main`}},{ratio:.25,node:{type:`pane`,id:`right`,tabs:[`property`,`my-tool`],active:`my-tool`}}]}}),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`fullscreen()`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`fullscreen(undefined, {
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
})`,...y.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`fullscreen(userPanels, {
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
})`,...x.parameters?.docs?.source}}},S=[`Default`,`SavedLayout`,`UserPanel`]})))()}C();export{v as Default,y as SavedLayout,x as UserPanel,S as __namedExportsOrder,g as default};