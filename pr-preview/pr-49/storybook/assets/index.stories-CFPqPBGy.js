import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{h as n,m as r}from"./react-DhWNY0KL.js";import{a as i,c as a,n as o,o as s,r as c,s as l,t as u}from"./scene-DJKkn5_u.js";var d,f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{u(),d=(e,t,n=!1)=>({...n?c:i,"timeline/duration":e,"timeline/fps":t}),f=null,p=e=>{if(f)return f;let t=44100,n=Math.floor(e*t),r=new OfflineAudioContext(1,n,t).createBuffer(1,n,t),i=r.getChannelData(0);for(let r=0;r<n;r++){let n=r/t,a=(1-n%.5/.5)**3*(.3+n/e*.7);i[r]=Math.sin(n*Math.PI*2*220)*a}return f=r,r},m={scene:i,editorData:o},h={scene:d(60,30,!0),editorData:o},g={scene:d(7200,60),editorData:o},_={scene:i,editorData:o,setup:e=>e.engine.seek(300)},v={scene:i,editorData:{...o,"frameLoop/enabled":!0,"frameLoop/start":150,"frameLoop/end":450},setup:e=>e.engine.seek(300)},y={scene:i,editorData:o,setup:e=>e.engine.emit(`update/music`,[p(10)])},b={scene:i,editorData:o,setup:e=>e.engine.play()}})))()}var S,C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{l(),x(),n(),S=t(),C={title:`OREditor/Timeline`,component:r},w=`160px`,T=e=>({decorators:[e=>(0,S.jsx)(`div`,{style:{height:w},children:(0,S.jsx)(e,{})}),a(e)]}),E=T(m),D=T(h),O=T(g),k=T(_),A=T(v),j=T(y),M={...T(b),tags:[`no-vrt`]},N=[{label:`Default（duration 600 / fps 60）`,fixture:m},{label:`Minimal（duration 60 / fps 30・表示物なし）`,fixture:h},{label:`LongDuration（duration 7200）`,fixture:g},{label:`Seeked（current 300）`,fixture:_},{label:`LoopRange（150 - 450）`,fixture:v},{label:`WithMusic（波形あり）`,fixture:y}],P={render:()=>(0,S.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, minmax(0, 1fr))`,gap:`16px`,padding:`16px`},children:N.map(({label:e,fixture:t})=>(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`div`,{style:{color:`#ccc`,fontSize:`12px`,marginBottom:`4px`},children:e}),(0,S.jsx)(`div`,{style:{height:w},children:(0,S.jsx)(s,{fixture:t,children:(0,S.jsx)(r,{})})})]},e))})},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`pattern(timelineDefault)`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`pattern(timelineMinimal)`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`pattern(timelineLongDuration)`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`pattern(timelineSeeked)`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`pattern(timelineLoopRange)`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`pattern(timelineWithMusic)`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  ...pattern(timelinePlaying),
  tags: ['no-vrt']
}`,...M.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px',
    padding: '16px'
  }}>
            {gridPatterns.map(({
      label,
      fixture
    }) => <div key={label}>
                    <div style={{
        color: '#ccc',
        fontSize: '12px',
        marginBottom: '4px'
      }}>{label}</div>
                    <div style={{
        height: PANEL_HEIGHT
      }}>
                        <OREditorFixtureHost fixture={fixture}>
                            <Timeline />
                        </OREditorFixtureHost>
                    </div>
                </div>)}
        </div>
}`,...P.parameters?.docs?.source}}},F=[`Default`,`Minimal`,`LongDuration`,`Seeked`,`LoopRange`,`WithMusic`,`Playing`,`AllPatterns`]})))()}I();export{P as AllPatterns,E as Default,O as LongDuration,A as LoopRange,D as Minimal,M as Playing,k as Seeked,j as WithMusic,F as __namedExportsOrder,C as default};