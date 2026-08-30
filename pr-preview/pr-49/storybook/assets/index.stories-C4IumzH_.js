import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r}from"./react-BXyAfn97.js";import{a as i,l as a,n as o,s,t as c}from"./scene-BeXR4M0-.js";var l,u,d,f,p,m,h;function g(){return(g=e((()=>{s(),c(),n(),l=t(),u={title:`OREditor/Layout`,component:r},d=(e,t=o)=>({args:{editorData:t,customTabs:e},decorators:[e=>(0,l.jsx)(`div`,{style:{width:`100vw`,height:`100vh`},children:(0,l.jsx)(e,{})}),a(i)]}),f=d(),p=d(void 0,{...o,panelLayout:{type:`split`,id:`root`,direction:`horizontal`,children:[{ratio:.2,node:{type:`pane`,id:`left`,tabs:[`scene`,`timeline`],active:`timeline`}},{ratio:.55,node:{type:`pane`,id:`center`,tabs:[`screen`,`project`],active:`screen`}},{ratio:.25,node:{type:`split`,id:`right`,direction:`vertical`,children:[{ratio:.6,node:{type:`pane`,id:`rightTop`,tabs:[`property`,`textures`],active:`textures`}},{ratio:.4,node:{type:`pane`,id:`rightBottom`,tabs:[`timer`],active:`timer`}}]}}]}}),m=d({leftTop:[{title:`Assets`,content:(0,l.jsx)(`div`,{children:`custom leftTop`})}],mainBottom:[{title:`Console`,content:(0,l.jsx)(`div`,{children:`custom mainBottom 1`}),default:!0},{title:`Log`,content:(0,l.jsx)(`div`,{children:`custom mainBottom 2`})}],rightTop:[{title:`Custom`,content:(0,l.jsx)(`div`,{children:`custom rightTop`}),default:!0}],footer:[{title:`Notes`,content:(0,l.jsx)(`div`,{children:`custom footer`})}]}),f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`fullscreen()`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`fullscreen(undefined, {
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
        tabs: ["scene", "timeline"],
        active: "timeline"
      }
    }, {
      ratio: 0.55,
      node: {
        type: "pane",
        id: "center",
        tabs: ["screen", "project"],
        active: "screen"
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
})`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`fullscreen({
  leftTop: [{
    title: 'Assets',
    content: <div>custom leftTop</div>
  }],
  mainBottom: [{
    title: 'Console',
    content: <div>custom mainBottom 1</div>,
    default: true
  }, {
    title: 'Log',
    content: <div>custom mainBottom 2</div>
  }],
  rightTop: [{
    title: 'Custom',
    content: <div>custom rightTop</div>,
    default: true
  }],
  footer: [{
    title: 'Notes',
    content: <div>custom footer</div>
  }]
})`,...m.parameters?.docs?.source}}},h=[`Default`,`SavedLayout`,`CustomTabs`]})))()}g();export{m as CustomTabs,f as Default,p as SavedLayout,h as __namedExportsOrder,u as default};