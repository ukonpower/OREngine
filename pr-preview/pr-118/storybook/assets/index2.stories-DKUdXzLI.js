import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./PanelContainer-oZFanZC7.js";var i,a,o,s,c,l,u;function d(){return(d=e((()=>{n(),i=t(),a={title:`ui/PanelContainer`,component:r,decorators:[e=>(0,i.jsx)(`div`,{style:{width:`320px`,height:`180px`},children:(0,i.jsx)(e,{})})]},o=e=>(0,i.jsxs)(`div`,{style:{padding:`10px`,color:`#777`},children:[e,` の中身`]}),s={render:()=>(0,i.jsxs)(r,{children:[(0,i.jsx)(r.Tab,{title:`Property`,children:o(`Property`)}),(0,i.jsx)(r.Tab,{title:`Hierarchy`,children:o(`Hierarchy`)})]})},c={render:()=>(0,i.jsx)(r,{children:[`Property`,`Hierarchy`,`Textures`,`Renderer`,`Settings`,`GPUTimer`].map(e=>(0,i.jsx)(r.Tab,{title:e,children:o(e)},e))})},l={render:()=>(0,i.jsx)(r,{tabs:[{id:`property`,title:`Property`,content:o(`Property`)},{id:`hierarchy`,title:`Hierarchy`,content:o(`Hierarchy`)}],active:`hierarchy`,onSelect:()=>{},onAddClick:()=>{}})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <PanelContainer>
            <PanelContainer.Tab title="Property">{body('Property')}</PanelContainer.Tab>
            <PanelContainer.Tab title="Hierarchy">{body('Hierarchy')}</PanelContainer.Tab>
        </PanelContainer>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <PanelContainer>
            {['Property', 'Hierarchy', 'Textures', 'Renderer', 'Settings', 'GPUTimer'].map(title => <PanelContainer.Tab key={title} title={title}>{body(title)}</PanelContainer.Tab>)}
        </PanelContainer>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <PanelContainer tabs={[{
    id: 'property',
    title: 'Property',
    content: body('Property')
  }, {
    id: 'hierarchy',
    title: 'Hierarchy',
    content: body('Hierarchy')
  }]} active="hierarchy" onSelect={() => {}} onAddClick={() => {}} />
}`,...l.parameters?.docs?.source}}},u=[`TwoTabs`,`ManyTabs`,`DataDriven`]})))()}d();export{l as DataDriven,c as ManyTabs,s as TwoTabs,u as __namedExportsOrder,a as default};