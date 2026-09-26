import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./Menu-NHiC30Ak.js";var r,i,a,o,s;function c(){return(c=e((()=>{t(),r={title:`ui/Menu`,component:n},i={args:{title:`OREngineCube`,items:[{label:`Add Entity`},{label:`Delete Entity`}]}},a={args:{items:[{label:`General`,children:[{label:`Hierarchy`},{label:`Property`}]},{label:`Rendering`,children:[{label:`Timer`},{label:`Textures`}]},{label:`Timeline`}]}},o={args:{title:`Add Entity`,items:[{label:`Empty`},{label:`Built-in`,children:[{label:`Light`},{label:`Camera`}]},{label:`Camera`,children:[{label:`LookAt`},{label:`OrbitControls`}]},{label:`Samples`,children:[{label:`Lines`,children:[{label:`SpiralLine`}]}]}]},play:async({canvas:e,userEvent:t})=>{await t.type(e.getByPlaceholderText(`Search`),`li`)}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'OREngineCube',
    items: [{
      label: 'Add Entity'
    }, {
      label: 'Delete Entity'
    }]
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'General',
      children: [{
        label: 'Hierarchy'
      }, {
        label: 'Property'
      }]
    }, {
      label: 'Rendering',
      children: [{
        label: 'Timer'
      }, {
        label: 'Textures'
      }]
    }, {
      label: 'Timeline'
    }]
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Add Entity',
    items: [{
      label: 'Empty'
    }, {
      label: 'Built-in',
      children: [{
        label: 'Light'
      }, {
        label: 'Camera'
      }]
    }, {
      label: 'Camera',
      children: [{
        label: 'LookAt'
      }, {
        label: 'OrbitControls'
      }]
    }, {
      label: 'Samples',
      children: [{
        label: 'Lines',
        children: [{
          label: 'SpiralLine'
        }]
      }]
    }]
  },
  play: async ({
    canvas,
    userEvent
  }) => {
    await userEvent.type(canvas.getByPlaceholderText('Search'), 'li');
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`,`Branches`,`Search`]})))()}c();export{a as Branches,i as Default,o as Search,s as __namedExportsOrder,r as default};