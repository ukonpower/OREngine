import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{n}from"./iframe-iIKVfHB9.js";import{t as r}from"./jsx-runtime-BYwl_lCr.js";import{O as i,an as a,k as o,on as s}from"./react-BOSJoq71.js";import{c,i as l,s as u,t as d}from"./scene-B5b59ZO0.js";var f,p,m,h,g,_,v,y,b,x;e((()=>{f=t(n(),1),u(),d(),a(),o(),p=r(),m={title:`OREditor/InputWindow`,component:i},h=()=>void 0,g=({config:e})=>{let{open:t}=s();return(0,f.useEffect)(()=>{t(e)},[t,e]),null},_=e=>({render:()=>(0,p.jsx)(g,{config:e}),decorators:[c(l)]}),v=_({type:`number`,value:1.5,label:`Position X`,step:.1,onChange:h}),y=_({type:`text`,value:`OREngineCube`,label:`Entity Name`,onChange:h}),b=_({type:`number`,value:0,onChange:h}),v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`pattern({
  type: 'number',
  value: 1.5,
  label: 'Position X',
  step: 0.1,
  onChange
})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`pattern({
  type: 'text',
  value: 'OREngineCube',
  label: 'Entity Name',
  onChange
})`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`pattern({
  type: 'number',
  value: 0,
  onChange
})`,...b.parameters?.docs?.source}}},x=[`NumberValue`,`TextValue`,`NoLabel`]}))();export{b as NoLabel,v as NumberValue,y as TextValue,x as __namedExportsOrder,m as default};