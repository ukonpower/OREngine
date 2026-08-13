import{i as e,s as t}from"./preload-helper-BdFrVu1K.js";import{n}from"./iframe-iIKVfHB9.js";import{t as r}from"./jsx-runtime-BYwl_lCr.js";import{Bt as i,zt as a}from"./react-BOSJoq71.js";import{n as o,t as s}from"./Label-CCxf_ugT.js";import{c,i as l,o as u,s as d,t as f}from"./scene-B5b59ZO0.js";var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j;e((()=>{p=t(n(),1),d(),f(),o(),i(),m=r(),h={title:`OREditor/SerializableField/ValueArray`},g=`320px`,_=({label:e,initial:t,...n})=>{let[r,i]=(0,p.useState)(t);return(0,m.jsx)(s,{title:e,vertical:!0,children:(0,m.jsx)(a,{value:r,...n,onChange:i})})},v=(0,m.jsx)(_,{label:`weights`,initial:[.25,.5,1],step:.05}),y=(0,m.jsx)(_,{label:`phase`,initial:[`shadowMap`,`deferred`]}),b=(0,m.jsx)(_,{label:`axisLock`,initial:[!0,!1,!1]}),x=(0,m.jsx)(_,{label:`keyframes`,initial:[0,30,60],format:{type:`array`,labels:e=>`frame ${e}`}}),S=(0,m.jsx)(_,{label:`targets`,initial:[]}),C=e=>({render:e,decorators:[e=>(0,m.jsx)(`div`,{style:{width:g},children:(0,m.jsx)(e,{})}),c(l)]}),w=C(()=>v),T=C(()=>y),E=C(()=>b),D=C(()=>x),O=C(()=>S),k=[{label:`number[]`,content:v},{label:`string[]`,content:y},{label:`boolean[]`,content:b},{label:`format: array（labels あり）`,content:x},{label:`空配列`,content:S}],A={render:()=>(0,m.jsx)(u,{fixture:l,children:(0,m.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(3, ${g})`,gap:`16px`,padding:`16px`},children:k.map(({label:e,content:t})=>(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`div`,{style:{color:`#ccc`,fontSize:`12px`,marginBottom:`4px`},children:e}),t]},e))})})},w.__docgenInfo={description:``,methods:[],displayName:`Numbers`},T.__docgenInfo={description:``,methods:[],displayName:`Strings`},E.__docgenInfo={description:``,methods:[],displayName:`Booleans`},D.__docgenInfo={description:``,methods:[],displayName:`Labeled`},O.__docgenInfo={description:``,methods:[],displayName:`Empty`},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`pattern(() => numbers)`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`pattern(() => strings)`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`pattern(() => booleans)`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`pattern(() => labeled)`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`pattern(() => empty)`,...O.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j=[`Numbers`,`Strings`,`Booleans`,`Labeled`,`Empty`,`AllPatterns`]}))();export{A as AllPatterns,E as Booleans,O as Empty,D as Labeled,w as Numbers,T as Strings,j as __namedExportsOrder,h as default};