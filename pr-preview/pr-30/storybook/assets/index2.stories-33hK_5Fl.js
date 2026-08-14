import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{n}from"./iframe-iIKVfHB9.js";import{t as r}from"./jsx-runtime-BYwl_lCr.js";import{F as i,P as a,R as o,T as s,w as c,z as l}from"./react-BOSJoq71.js";import{c as u,i as d,s as f,t as p}from"./scene-B5b59ZO0.js";var m,h,g,_,v,y,b,x,S,C,w;e((()=>{m=t(n(),1),f(),p(),i(),o(),s(),h=r(),g={title:`OREditor/MouseMenu`,component:c},_=({specs:e})=>{let{pushContent:t}=l();return(0,m.useEffect)(()=>{let n=0,r=0,i=()=>{let a=e[n++];a&&(window.dispatchEvent(new PointerEvent(`pointermove`,{clientX:a.x*window.innerWidth,clientY:a.y*window.innerHeight})),t(a.elm),r=requestAnimationFrame(i))};return r=requestAnimationFrame(i),()=>cancelAnimationFrame(r)},[e,t]),null},v=e=>({render:()=>(0,h.jsx)(_,{specs:e}),decorators:[u(d)]}),y=(0,h.jsx)(a,{label:`OREngineCube`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),b=v([{elm:y,x:.25,y:.25}]),x=v([{elm:(0,h.jsx)(a,{label:`Components`,list:[`Camera`,`CameraController`,`Light`,`PostProcess`,`Bloom`,`FXAA`,`SSR`,`Fog`,`Mesh`,`Skybox`,`YakiSoba`,`RotateAnimation`].map(e=>({label:e}))}),x:.25,y:.3}]),S=v([{elm:y,x:.25,y:.25},{elm:(0,h.jsx)(a,{label:`Add Entity`,list:[{label:`Empty`},{label:`Cube`}]}),x:.38,y:.33}]),C=v([{elm:(0,h.jsx)(a,{label:`right-bottom`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.25,y:.25},{elm:(0,h.jsx)(a,{label:`left-bottom`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.75,y:.25},{elm:(0,h.jsx)(a,{label:`right-top`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.25,y:.75},{elm:(0,h.jsx)(a,{label:`left-top`,list:[{label:`Add Entity`},{label:`Delete Entity`}]}),x:.75,y:.75}]),b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`pattern([{
  elm: entityMenu,
  x: 0.25,
  y: 0.25
}])`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`pattern([{
  elm: <Picker label="Components" list={['Camera', 'CameraController', 'Light', 'PostProcess', 'Bloom', 'FXAA', 'SSR', 'Fog', 'Mesh', 'Skybox', 'YakiSoba', 'RotateAnimation'].map(label => ({
    label
  }))} />,
  x: 0.25,
  y: 0.3
}])`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`pattern([{
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
}])`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`pattern([{
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
}])`,...C.parameters?.docs?.source}}},w=[`Default`,`LongList`,`Nested`,`Directions`]}))();export{b as Default,C as Directions,x as LongList,S as Nested,w as __namedExportsOrder,g as default};