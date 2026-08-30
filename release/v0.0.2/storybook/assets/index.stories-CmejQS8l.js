import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{r as t}from"./iframe-zg9XQrFh.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{Ft as r,It as i}from"./react-z0VrAOA6.js";import{n as a,t as o}from"./Label-2K4TR047.js";import{c as s,i as c,o as l,s as u,t as d}from"./scene-qdBZiZuV.js";var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{f=t(),u(),d(),a(),i(),p=n(),m={title:`OREditor/SerializableField/ValueArray`},h=`320px`,g=({label:e,initial:t,...n})=>{let[i,a]=(0,f.useState)(t);return(0,p.jsx)(o,{title:e,vertical:!0,children:(0,p.jsx)(r,{value:i,...n,onChange:a})})},_=(0,p.jsx)(g,{label:`weights`,initial:[.25,.5,1],step:.05}),v=(0,p.jsx)(g,{label:`phase`,initial:[`shadowMap`,`deferred`]}),y=(0,p.jsx)(g,{label:`axisLock`,initial:[!0,!1,!1]}),b=(0,p.jsx)(g,{label:`keyframes`,initial:[0,30,60],format:{type:`array`,labels:e=>`frame ${e}`}}),x=(0,p.jsx)(g,{label:`targets`,initial:[]}),S=e=>({render:e,decorators:[e=>(0,p.jsx)(`div`,{style:{width:h},children:(0,p.jsx)(e,{})}),s(c)]}),C=S(()=>_),w=S(()=>v),T=S(()=>y),E=S(()=>b),D=S(()=>x),O=[{label:`number[]`,content:_},{label:`string[]`,content:v},{label:`boolean[]`,content:y},{label:`format: array（labels あり）`,content:b},{label:`空配列`,content:x}],k={render:()=>(0,p.jsx)(l,{fixture:c,children:(0,p.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, ${h})`,gap:`16px`,padding:`16px`},children:O.map(({label:e,content:t})=>(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`div`,{style:{color:`#ccc`,fontSize:`12px`,marginBottom:`4px`},children:e}),t]},e))})})},C.__docgenInfo={description:``,methods:[],displayName:`Numbers`},w.__docgenInfo={description:``,methods:[],displayName:`Strings`},T.__docgenInfo={description:``,methods:[],displayName:`Booleans`},E.__docgenInfo={description:``,methods:[],displayName:`Labeled`},D.__docgenInfo={description:``,methods:[],displayName:`Empty`},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`pattern(() => numbers)`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`pattern(() => strings)`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`pattern(() => booleans)`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`pattern(() => labeled)`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`pattern(() => empty)`,...D.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <OREditorFixtureHost fixture={storyFixture}>
            <div style={{
      display: 'grid',
      gridTemplateColumns: \`repeat(3, \${PANEL_WIDTH})\`,
      gap: '16px',
      padding: '16px'
    }}>
                {gridPatterns.map(({
        label,
        content
      }) => <div key={label}>
                        <div style={{
          color: '#ccc',
          fontSize: '12px',
          marginBottom: '4px'
        }}>{label}</div>
                        {content}
                    </div>)}
            </div>
        </OREditorFixtureHost>
}`,...k.parameters?.docs?.source}}},A=[`Numbers`,`Strings`,`Booleans`,`Labeled`,`Empty`,`AllPatterns`]})))()}j();export{k as AllPatterns,T as Booleans,D as Empty,E as Labeled,C as Numbers,w as Strings,A as __namedExportsOrder,m as default};