import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Block-B2af8lE6.js";var i,a,o,s,c,l,u,d,f;function p(){return(p=e((()=>{n(),i=t(),a={title:`ui/Block`,component:r,decorators:[e=>(0,i.jsx)(`div`,{style:{width:`260px`,padding:`10px`},children:(0,i.jsx)(e,{})})]},o=(0,i.jsx)(`div`,{style:{color:`#777`,padding:`5px`},children:`position / rotation / scale`}),s={args:{label:`Transform`,children:o}},c={args:{label:`Transform`,accordion:!0,children:o}},l={args:{label:`Transform`,accordion:!0,defaultClose:!0,children:o}},u={args:{label:`Transform`,bg:!0,children:o}},d={args:{label:`Entity`,accordion:!0,bg:!0,children:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r,{label:`Transform`,accordion:!0,children:o}),(0,i.jsx)(r,{label:`Material`,accordion:!0,defaultClose:!0,children:o})]})}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Transform',
    children: content
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Transform',
    accordion: true,
    children: content
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Transform',
    accordion: true,
    defaultClose: true,
    children: content
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Transform',
    bg: true,
    children: content
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Entity',
    accordion: true,
    bg: true,
    children: <>
            <Block label="Transform" accordion={true}>{content}</Block>
            <Block label="Material" accordion={true} defaultClose={true}>{content}</Block>
        </>
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Accordion`,`AccordionClosed`,`WithBackground`,`Nested`]})))()}p();export{c as Accordion,l as AccordionClosed,s as Default,d as Nested,u as WithBackground,f as __namedExportsOrder,a as default};