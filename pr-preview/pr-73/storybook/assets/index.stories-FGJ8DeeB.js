import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{r as t}from"./iframe-Bc2eeoad.js";import{A as n,T as r,c as i,i as a,j as o,s,t as c,v as l,w as u,y as d}from"./scene-B0L9lwiA.js";import{t as f}from"./jsx-runtime-DeHZSEgm.js";var p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{p=t(),s(),c(),r(),n(),d(),m=f(),h={title:`OREditor/MouseMenu`,component:l},g=({specs:e})=>{let{pushContent:t}=o();return(0,p.useEffect)(()=>{let n=0,r=0,i=()=>{let a=e[n++];a&&(window.dispatchEvent(new PointerEvent(`pointermove`,{clientX:a.x*window.innerWidth,clientY:a.y*window.innerHeight})),t(a.elm),r=requestAnimationFrame(i))};return r=requestAnimationFrame(i),()=>cancelAnimationFrame(r)},[e,t]),null},_=e=>({render:()=>(0,m.jsx)(g,{specs:e}),decorators:[i(a)]}),v=(0,m.jsx)(u,{label:`OREngineCube`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),y=_([{elm:v,x:.25,y:.25}]),b=_([{elm:(0,m.jsx)(u,{label:`Components`,list:[`Camera`,`CameraController`,`Light`,`PostProcess`,`Bloom`,`FXAA`,`SSR`,`Fog`,`Mesh`,`Skybox`,`YakiSoba`,`RotateAnimation`].map(e=>({label:e}))}),x:.25,y:.3}]),x=_([{elm:v,x:.25,y:.25},{elm:(0,m.jsx)(u,{label:`Add Entity`,list:[{label:`Empty`},{label:`Cube`}]}),x:.38,y:.33}]),S=_([{elm:(0,m.jsx)(u,{label:`right-bottom`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.25,y:.25},{elm:(0,m.jsx)(u,{label:`left-bottom`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.75,y:.25},{elm:(0,m.jsx)(u,{label:`right-top`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.25,y:.75},{elm:(0,m.jsx)(u,{label:`left-top`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.75,y:.75}]),y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`pattern([{
  elm: entityMenu,
  x: 0.25,
  y: 0.25
}])`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`pattern([{
  elm: <Picker label="Components" list={['Camera', 'CameraController', 'Light', 'PostProcess', 'Bloom', 'FXAA', 'SSR', 'Fog', 'Mesh', 'Skybox', 'YakiSoba', 'RotateAnimation'].map(label => ({
    label
  }))} />,
  x: 0.25,
  y: 0.3
}])`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`pattern([{
  elm: entityMenu,
  x: 0.25,
  y: 0.25
}, {
  elm: <Picker label="Add Entity" list={[{
    label: 'Empty'
  }, {
    label: 'Cube'
  }]} />,
  x: 0.38,
  y: 0.33
}])`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`pattern([{
  elm: <Picker label="right-bottom" list={[{
    label: 'Add Entity'
  }, {
    label: 'Delete Entity'
  }]} />,
  x: 0.25,
  y: 0.25
}, {
  elm: <Picker label="left-bottom" list={[{
    label: 'Add Entity'
  }, {
    label: 'Delete Entity'
  }]} />,
  x: 0.75,
  y: 0.25
}, {
  elm: <Picker label="right-top" list={[{
    label: 'Add Entity'
  }, {
    label: 'Delete Entity'
  }]} />,
  x: 0.25,
  y: 0.75
}, {
  elm: <Picker label="left-top" list={[{
    label: 'Add Entity'
  }, {
    label: 'Delete Entity'
  }]} />,
  x: 0.75,
  y: 0.75
}])`,...S.parameters?.docs?.source}}},C=[`Default`,`LongList`,`Nested`,`Directions`]})))()}w();export{y as Default,S as Directions,b as LongList,x as Nested,C as __namedExportsOrder,h as default};