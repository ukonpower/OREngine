import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{n}from"./iframe-iIKVfHB9.js";import{t as r}from"./jsx-runtime-BYwl_lCr.js";import{n as i,t as a}from"./InputSelect-CFYQ7a5Z.js";var o,s,c,l,u,d,f,p,m,h,g;e((()=>{o=t(n(),1),i(),s=r(),c=e=>{let[t,n]=(0,o.useState)(e.value);return(0,s.jsx)(a,{...e,value:t,onChange:n})},l=[`nearest`,`linear`,`mipmap`],u=[{label:`不透明`,value:`opaque`},{label:`半透明`,value:`transparent`},{label:`加算`,value:`additive`}],d={title:`ui/Input/InputSelect`,component:a,args:{value:`linear`,selectList:l},render:e=>(0,s.jsx)(c,{...e}),decorators:[e=>(0,s.jsx)(`div`,{style:{width:`180px`,padding:`10px`},children:(0,s.jsx)(e,{})})]},f={},p={args:{value:`transparent`,selectList:u}},m={args:{value:`nearest`,selectList:()=>l}},h={args:{readOnly:!0}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'transparent',
    selectList: labeledList
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'nearest',
    selectList: () => stringList
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    readOnly: true
  }
}`,...h.parameters?.docs?.source}}},g=[`StringList`,`LabeledList`,`LazyList`,`ReadOnly`]}))();export{p as LabeledList,m as LazyList,h as ReadOnly,f as StringList,g as __namedExportsOrder,d as default};