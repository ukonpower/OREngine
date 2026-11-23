import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,g as r,h as i,i as a,l as o,n as s,o as c,r as l,s as u}from"./scene-BsYMaQbM.js";import{n as d,t as f}from"./music-pGOn9l27.js";var p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{d(),s(),p=(e,t,n=!1)=>({...n?a:c,"timeline/duration":e,"timeline/fps":t}),m={scene:c,editorData:l},h={scene:p(60,30,!0),editorData:l},g={scene:p(7200,60),editorData:l},_={scene:c,editorData:l,setup:e=>e.engine.seek(300)},v={scene:c,editorData:{...l,"frameLoop/enabled":!0,"frameLoop/start":150,"frameLoop/end":450},setup:e=>e.engine.seek(300)},y={scene:c,editorData:l,setup:e=>e.engine.emit(`update/music`,[f(10,1)])},b={scene:c,editorData:l,setup:e=>e.engine.play()},x=[];for(let e of c.scene?.childs||[]){if(e.uuid!=`sb-cube`){x.push(e);continue}x.push({...e,components:[...e.components||[],{name:`Animation`,uuid:`sb-cube-animation`,props:{links:{position:[[`c1`,1,0],[`c2`,1,0],[`c3`,1,0]],scale:[[`c4`,1,0],[`c4`,1,0],[`c4`,1,0]]}}}]})}S={...c,curves:{c1:{k:[[2,[0,0,-40,0,40,0]],[2,[120,2,80,2,160,2]],[2,[180,0,260,0,340,0]]]},c2:{k:[[0,[60,0]],[0,[240,3]]]},c3:{k:[[1,[120,0]],[1,[180,1]]]},c4:{name:`pulse`,k:[[2,[0,1,-50,1,50,1]],[2,[150,1.5,100,1.5,200,1.5]],[2,[150,1,250,1,350,1]]]}},scene:{name:`root`,uuid:`0`,childs:x}},C={scene:S,editorData:{...l,selectedEntityId:`sb-cube`},setup:e=>e.engine.seek(120)}})))()}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{n(),w(),r(),T=t(),E={title:`OREditor/Timeline`,component:i},D=`160px`,O=e=>({decorators:[e=>(0,T.jsx)(`div`,{style:{height:D},children:(0,T.jsx)(e,{})}),o(e)]}),k=O(m),A=O(h),j=O(g),M=O(_),N=O(v),P=O(y),F=O(C),I={...O(b),tags:[`no-vrt`]},L=[{label:`Default（duration 600 / fps 60）`,fixture:m},{label:`Minimal（duration 60 / fps 30・表示物なし）`,fixture:h},{label:`LongDuration（duration 7200）`,fixture:g},{label:`Seeked（current 300）`,fixture:_},{label:`LoopRange（150 - 450）`,fixture:v},{label:`WithMusic（波形あり）`,fixture:y}],R={render:()=>(0,T.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, minmax(0, 1fr))`,gap:`16px`,padding:`16px`},children:L.map(({label:e,fixture:t})=>(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`div`,{style:{color:`#ccc`,fontSize:`12px`,marginBottom:`4px`},children:e}),(0,T.jsx)(`div`,{style:{height:D},children:(0,T.jsx)(u,{fixture:t,children:(0,T.jsx)(i,{})})})]},e))})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`pattern(timelineDefault)`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`pattern(timelineMinimal)`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`pattern(timelineLongDuration)`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`pattern(timelineSeeked)`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`pattern(timelineLoopRange)`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`pattern(timelineWithMusic)`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`pattern(timelineKeyFrames)`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  ...pattern(timelinePlaying),
  tags: ['no-vrt']
}`,...I.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z=[`Default`,`Minimal`,`LongDuration`,`Seeked`,`LoopRange`,`WithMusic`,`KeyFrames`,`Playing`,`AllPatterns`]})))()}B();export{R as AllPatterns,k as Default,F as KeyFrames,j as LongDuration,N as LoopRange,A as Minimal,I as Playing,M as Seeked,P as WithMusic,z as __namedExportsOrder,E as default};