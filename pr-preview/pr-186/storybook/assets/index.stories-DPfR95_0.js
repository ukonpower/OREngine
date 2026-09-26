import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{a as t,c as n,h as r,m as i,n as a,o,r as s,s as c,t as l}from"./scene-D59PbE_h.js";import{t as u}from"./jsx-runtime-DeHZSEgm.js";var d,f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{l(),d=(e,n,r=!1)=>({...r?s:t,"timeline/duration":e,"timeline/fps":n}),f=null,p=e=>{if(f)return f;let t=44100,n=Math.floor(e*t),r=new OfflineAudioContext(1,n,t).createBuffer(1,n,t),i=r.getChannelData(0);for(let r=0;r<n;r++){let n=r/t,a=(1-n%.5/.5)**3*(.3+n/e*.7);i[r]=Math.sin(n*Math.PI*2*220)*a}return f=r,r},m={scene:t,editorData:a},h={scene:d(60,30,!0),editorData:a},g={scene:d(7200,60),editorData:a},_={scene:t,editorData:a,setup:e=>e.engine.seek(300)},v={scene:t,editorData:{...a,"frameLoop/enabled":!0,"frameLoop/start":150,"frameLoop/end":450},setup:e=>e.engine.seek(300)},y={scene:t,editorData:a,setup:e=>e.engine.emit(`update/music`,[p(10)])},b={scene:t,editorData:a,setup:e=>e.engine.play()},x=[];for(let e of t.scene?.childs||[]){if(e.uuid!=`sb-cube`){x.push(e);continue}x.push({...e,components:[...e.components||[],{name:`Animation`,uuid:`sb-cube-animation`,props:{links:{position:[[`c1`,1,0],[`c2`,1,0],[`c3`,1,0]],scale:[[`c4`,1,0],[`c4`,1,0],[`c4`,1,0]]}}}]})}S={...t,curves:{c1:{k:[[2,[0,0,-40,0,40,0]],[2,[120,2,80,2,160,2]],[2,[180,0,260,0,340,0]]]},c2:{k:[[0,[60,0]],[0,[240,3]]]},c3:{k:[[1,[120,0]],[1,[180,1]]]},c4:{name:`pulse`,k:[[2,[0,1,-50,1,50,1]],[2,[150,1.5,100,1.5,200,1.5]],[2,[150,1,250,1,350,1]]]}},scene:{name:`root`,uuid:`0`,childs:x}},C={scene:S,editorData:{...a,selectedEntityId:`sb-cube`},setup:e=>e.engine.seek(120)}})))()}var T,E,D,O,k,A,j,M,N,P,F,I,L,R,z;function B(){return(B=e((()=>{c(),w(),r(),T=u(),E={title:`OREditor/Timeline`,component:i},D=`160px`,O=e=>({decorators:[e=>(0,T.jsx)(`div`,{style:{height:D},children:(0,T.jsx)(e,{})}),n(e)]}),k=O(m),A=O(h),j=O(g),M=O(_),N=O(v),P=O(y),F=O(C),I={...O(b),tags:[`no-vrt`]},L=[{label:`Default（duration 600 / fps 60）`,fixture:m},{label:`Minimal（duration 60 / fps 30・表示物なし）`,fixture:h},{label:`LongDuration（duration 7200）`,fixture:g},{label:`Seeked（current 300）`,fixture:_},{label:`LoopRange（150 - 450）`,fixture:v},{label:`WithMusic（波形あり）`,fixture:y}],R={render:()=>(0,T.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(2, minmax(0, 1fr))`,gap:`16px`,padding:`16px`},children:L.map(({label:e,fixture:t})=>(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`div`,{style:{color:`#ccc`,fontSize:`12px`,marginBottom:`4px`},children:e}),(0,T.jsx)(`div`,{style:{height:D},children:(0,T.jsx)(o,{fixture:t,children:(0,T.jsx)(i,{})})})]},e))})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`pattern(timelineDefault)`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`pattern(timelineMinimal)`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`pattern(timelineLongDuration)`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`pattern(timelineSeeked)`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`pattern(timelineLoopRange)`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`pattern(timelineWithMusic)`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`pattern(timelineKeyFrames)`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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