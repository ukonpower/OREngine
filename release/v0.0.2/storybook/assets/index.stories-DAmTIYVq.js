import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./LayoutSplit-u-e3UiBU.js";var i,a,o,s,c,l,u,d;function f(){return(f=e((()=>{n(),i=t(),a={title:`ui/LayoutSplit`,component:r,decorators:[e=>(0,i.jsx)(`div`,{style:{width:`480px`,height:`240px`},children:(0,i.jsx)(e,{})})]},o=(e,t)=>(0,i.jsx)(`div`,{style:{width:`100%`,height:`100%`,backgroundColor:t,color:`#ccc`,padding:`8px`},children:e}),s={render:()=>(0,i.jsxs)(r,{children:[(0,i.jsx)(r.Item,{flex:1,children:o(`flex 1`,`#181818`)}),(0,i.jsx)(r.Item,{flex:2,children:o(`flex 2`,`#242424`)})]})},c={render:()=>(0,i.jsxs)(r,{direction:`vertical`,children:[(0,i.jsx)(r.Item,{flex:2,children:o(`flex 2`,`#181818`)}),(0,i.jsx)(r.Item,{flex:1,children:o(`flex 1`,`#242424`)})]})},l={render:()=>(0,i.jsxs)(r,{children:[(0,i.jsx)(r.Item,{size:120,children:o(`size 120px`,`#181818`)}),(0,i.jsx)(r.Item,{children:o(`残り`,`#242424`)})]})},u={render:()=>(0,i.jsxs)(r,{children:[(0,i.jsx)(r.Item,{size:140,children:o(`sidebar`,`#181818`)}),(0,i.jsx)(r.Item,{children:(0,i.jsxs)(r,{direction:`vertical`,children:[(0,i.jsx)(r.Item,{flex:2,children:o(`screen`,`#242424`)}),(0,i.jsx)(r.Item,{flex:1,children:o(`timeline`,`#2f2f2f`)})]})})]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <LayoutSplit>
            <LayoutSplit.Item flex={1}>{pane('flex 1', '#181818')}</LayoutSplit.Item>
            <LayoutSplit.Item flex={2}>{pane('flex 2', '#242424')}</LayoutSplit.Item>
        </LayoutSplit>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <LayoutSplit direction="vertical">
            <LayoutSplit.Item flex={2}>{pane('flex 2', '#181818')}</LayoutSplit.Item>
            <LayoutSplit.Item flex={1}>{pane('flex 1', '#242424')}</LayoutSplit.Item>
        </LayoutSplit>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <LayoutSplit>
            <LayoutSplit.Item size={120}>{pane('size 120px', '#181818')}</LayoutSplit.Item>
            <LayoutSplit.Item>{pane('残り', '#242424')}</LayoutSplit.Item>
        </LayoutSplit>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <LayoutSplit>
            <LayoutSplit.Item size={140}>{pane('sidebar', '#181818')}</LayoutSplit.Item>
            <LayoutSplit.Item>
                <LayoutSplit direction="vertical">
                    <LayoutSplit.Item flex={2}>{pane('screen', '#242424')}</LayoutSplit.Item>
                    <LayoutSplit.Item flex={1}>{pane('timeline', '#2f2f2f')}</LayoutSplit.Item>
                </LayoutSplit>
            </LayoutSplit.Item>
        </LayoutSplit>
}`,...u.parameters?.docs?.source}}},d=[`Horizontal`,`Vertical`,`FixedSize`,`Nested`]})))()}f();export{l as FixedSize,s as Horizontal,u as Nested,c as Vertical,d as __namedExportsOrder,a as default};