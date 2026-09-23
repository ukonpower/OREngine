import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./Button-DU166UZk.js";import{n as i,t as a}from"./useAnchoredPosition-CaqCiZNH.js";import{n as o,t as s}from"./Modal-BIKg1tYC.js";var c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{n(),a(),o(),c=t(),l={title:`ui/Modal`,component:s},u=()=>{},d=(0,c.jsx)(`div`,{style:{padding:`2px`,borderRadius:`3px`,background:`var(--or-bg-base)`},children:[`main`,`intro`,`title`].map(e=>(0,c.jsx)(`div`,{style:{height:`var(--or-list-row-height)`,padding:`0 8px`},children:e},e))}),f={args:{title:`Scenes`,note:`demo-webgl`,width:360,onClose:u,children:d,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{children:`Delete`}),(0,c.jsx)(r,{children:`Open`})]})}},p={args:{onClose:u,children:(0,c.jsx)(`input`,{style:{width:`100%`,textAlign:`center`},defaultValue:`1.5`}),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{children:`Cancel`}),(0,c.jsx)(r,{children:`OK`})]})}},m={args:{title:`Scenes`,width:360,onClose:u,children:d}},h={args:{title:`Scenes`,note:`very-long-project-name-that-does-not-fit-in-the-head-row`,width:360,onClose:u,children:d,footer:(0,c.jsx)(r,{children:`Open`})}},g={args:{title:`Scenes`,width:360,onClose:u,anchor:i(200,120),children:d,footer:(0,c.jsx)(r,{children:`Open`})}},_={render:e=>(0,c.jsx)(s,{...e,anchor:i(window.innerWidth-100,window.innerHeight-60)}),args:{title:`Scenes`,width:360,onClose:u,children:d,footer:(0,c.jsx)(r,{children:`Open`})}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Scenes',
    note: 'demo-webgl',
    width: 360,
    onClose,
    children: list,
    footer: <><Button>Delete</Button><Button>Open</Button></>
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    onClose,
    children: <input style={{
      width: '100%',
      textAlign: 'center'
    }} defaultValue="1.5" />,
    footer: <><Button>Cancel</Button><Button>OK</Button></>
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Scenes',
    width: 360,
    onClose,
    children: list
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Scenes',
    note: 'very-long-project-name-that-does-not-fit-in-the-head-row',
    width: 360,
    onClose,
    children: list,
    footer: <Button>Open</Button>
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Scenes',
    width: 360,
    onClose,
    anchor: pointAnchor(200, 120),
    children: list,
    footer: <Button>Open</Button>
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Modal {...args} anchor={pointAnchor(window.innerWidth - 100, window.innerHeight - 60)} />,
  args: {
    title: 'Scenes',
    width: 360,
    onClose,
    children: list,
    footer: <Button>Open</Button>
  }
}`,..._.parameters?.docs?.source}}},v=[`Default`,`NoTitle`,`NoFooter`,`LongNote`,`Anchored`,`AnchoredNearEdge`]})))()}y();export{g as Anchored,_ as AnchoredNearEdge,f as Default,h as LongNote,m as NoFooter,p as NoTitle,v as __namedExportsOrder,l as default};