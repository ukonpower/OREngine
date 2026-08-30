import{a as e,n as t,r as n,t as r}from"./rolldown-runtime-DkW27tQK.js";import{r as i}from"./iframe-DaJh8qSi.js";import{n as a,t as o}from"./ArrowIcon-BeTfT9xX.js";import{t as s}from"./jsx-runtime-DeHZSEgm.js";import{n as c,t as l}from"./Block-SjHlY0H7.js";import{n as u,t as d}from"./Button-BXzGpppg.js";import{C as f,S as p,_ as m,d as h,g,h as _,m as v,o as y,s as b,t as x,u as S,v as C,y as ee}from"./Icons-C61BEP8T.js";import{n as te,t as ne}from"./InputCheckBox-DBV0VVaB.js";import{n as re,t as ie}from"./InputColor-BCwlYUcx.js";import{n as w,t as ae}from"./LayoutSplit-Bgrfj2jE.js";import{n as oe,t as se}from"./Panel-CbZ9rSYw.js";import{n as ce,t as le}from"./PanelContainer-BP1u8Jd8.js";import{n as ue,t as T}from"./Label-2K4TR047.js";import{i as de,n as fe,r as pe,t as me}from"./InputSelect-DB3bJuI5.js";import{d as he,f as ge,u as _e}from"./scene-DsNhyhRD.js";import{n as ve,t as ye}from"./DragOverlay-CuquWkqQ.js";function be(e=[],t=[]){return e.length!==t.length||e.some((e,n)=>!Object.is(e,t[n]))}var xe,Se,Ce,we;function Te(){return(Te=t((()=>{xe=i(),Se=(0,xe.createContext)(null),Ce={didCatch:!1,error:null},we=class extends xe.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Ce}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(...e){let{error:t}=this.state;t!==null&&(this.props.onReset?.({args:e,reason:`imperative-api`}),this.setState(Ce))}componentDidCatch(e,t){this.props.onError?.(e,t)}componentDidUpdate(e,t){let{didCatch:n}=this.state,{resetKeys:r}=this.props;n&&t.error!==null&&be(e.resetKeys,r)&&(this.props.onReset?.({next:r,prev:e.resetKeys,reason:`keys`}),this.setState(Ce))}render(){let{children:e,fallbackRender:t,FallbackComponent:n,fallback:r}=this.props,{didCatch:i,error:a}=this.state,o=e;if(i){let e={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof t==`function`)o=t(e);else if(n)o=(0,xe.createElement)(n,e);else if(r!==void 0)o=r;else throw a}return(0,xe.createElement)(Se.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},o)}}})))()}var Ee,De,Oe;function ke(){return(ke=t((()=>{Ee=i(),De=900,Oe=()=>{let[e,t]=(0,Ee.useState)(!1);return(0,Ee.useEffect)(()=>{let e=null,n=()=>{let n=window.innerWidth;(e===null||(n-De)*(e-De)<=0)&&t(n<=De),e=n};return n(),window.addEventListener(`resize`,n),()=>{window.removeEventListener(`resize`,n)}},[]),{isPC:!e,isSP:e}}})))()}var Ae,je;function Me(){return(Me=t((()=>{Ae=i(),je=(0,Ae.createContext)(null)})))()}var Ne,Pe;function Fe(){return(Fe=t((()=>{Ne=i(),Me(),Pe=()=>{let e=(0,Ne.useContext)(je);if(e===null)throw Error(`useInputWindow must be used within InputWindowContext`);return e}})))()}var Ie,Le,Re;function ze(){return(ze=t((()=>{Ie=i(),Le=()=>typeof navigator>`u`?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Re=()=>(0,Ie.useMemo)(()=>Le(),[])})))()}var Be,Ve;function He(){return(He=t((()=>{Be=`InputNumber__input___Lmluc`,Ve={input:Be}})))()}var Ue,We,Ge,Ke;function qe(){return(qe=t((()=>{Ue=i(),Fe(),ze(),He(),We=s(),Ge=3,Ke=e=>{let{open:t}=Pe(),n=Re(),r=(0,Ue.useRef)(null),[i,a]=(0,Ue.useState)(!1),[o,s]=(0,Ue.useState)(``),c=(0,Ue.useRef)(!1),l=(0,Ue.useRef)(null),u=(0,Ue.useRef)(!1),d=(0,Ue.useRef)(void 0);d.current=e.onChange;let f=(0,Ue.useRef)(void 0);f.current=e.value;let p=(0,Ue.useCallback)(t=>{let n=f.current;if(c.current===!1)return;let r=l.current;if(r){let e=t.clientX-r.x,n=t.clientY-r.y;Math.sqrt(e*e+n*n)>=Ge&&(u.current=!0)}if(!u.current)return;let i=t.movementX;if(typeof n==`number`){let r=i*.05*(e.step||1);d.current&&d.current(n+r),t.stopPropagation()}t.preventDefault()},[e.step]),m=(0,Ue.useCallback)(()=>{e.readOnly||e.disabled||t({type:`number`,value:f.current??0,step:e.step,min:e.min,max:e.max,precision:e.precision,onChange:e=>{d.current&&d.current(e)}})},[t,e.step,e.min,e.max,e.precision,e.readOnly,e.disabled]),h=(0,Ue.useCallback)(t=>{t.preventDefault(),c.current=!0,l.current={x:t.clientX,y:t.clientY},u.current=!1;let i=()=>{u.current||(n?m():(a(!0),s(String(Number((f.current??0).toFixed(e.precision??3)))),requestAnimationFrame(()=>{r.current?.focus(),r.current?.select()}))),c.current=!1,l.current=null,u.current=!1,window.removeEventListener(`pointerup`,i),n||window.removeEventListener(`pointermove`,p)};window.addEventListener(`pointerup`,i),n||window.addEventListener(`pointermove`,p)},[p,n,m,e.precision]),g=i?o:String(Number((e.value??0).toFixed(e.precision??3)));return(0,We.jsx)(`div`,{className:Ve.inputNumber,children:(0,We.jsx)(`input`,{ref:r,className:Ve.input,type:i?`text`:`number`,inputMode:i?`decimal`:void 0,value:g,disabled:e.disabled,readOnly:n||e.readOnly,"data-lo":e.readOnly,step:e.step||1,min:e.min,max:e.max,onBlur:()=>{if(i&&(a(!1),e.onChange)){let t=Number(o);e.onChange(isNaN(t)?0:t)}},onChange:e=>{s(e.target.value)},onKeyDown:e=>{e.key===`Enter`&&r.current?.blur()},onPointerDown:h})})},Ke.__docgenInfo={description:``,methods:[],displayName:`InputNumber`,props:{value:{required:!0,tsType:{name:`union`,raw:`number | undefined`,elements:[{name:`number`},{name:`undefined`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: number ) => void`,signature:{arguments:[{type:{name:`number`},name:`value`}],return:{name:`void`}}},description:``},step:{required:!1,tsType:{name:`number`},description:``},min:{required:!1,tsType:{name:`number`},description:``},max:{required:!1,tsType:{name:`number`},description:``},precision:{required:!1,tsType:{name:`number`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},readOnly:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var Je,Ye;function Xe(){return(Xe=t((()=>{Je=`InputText__input___Lmluc`,Ye={input:Je}})))()}var Ze,Qe,$e;function et(){return(et=t((()=>{Ze=i(),Fe(),ze(),Xe(),Qe=s(),$e=({onChange:e,value:t,...n})=>{let{open:r}=Pe(),i=Re(),[a,o]=(0,Ze.useState)(t),s=(0,Ze.useCallback)(()=>{e&&e(a)},[a,e]);(0,Ze.useEffect)(()=>{o(t)},[t]);let c=(0,Ze.useCallback)(()=>{!i||n.readOnly||n.disabled||r({type:`text`,value:a,onChange:t=>{e&&e(t)}})},[i,a,e,r,n.readOnly,n.disabled]);return(0,Qe.jsx)(`div`,{className:Ye.container,children:(0,Qe.jsx)(`input`,{className:Ye.input,type:`text`,value:a,placeholder:n.readOnly?`-`:``,disabled:n.disabled,readOnly:i||n.readOnly,"data-lo":n.readOnly,onChange:e=>{o(e.target.value)},onBlur:()=>{s()},onClick:c,onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur()}})})},$e.__docgenInfo={description:``,methods:[],displayName:`InputText`,props:{value:{required:!0,tsType:{name:`string`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: string ) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},readOnly:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var tt;function nt(){return(nt=t((()=>{tt={}})))()}var rt,it,at,ot;function st(){return(st=t((()=>{rt=i(),qe(),ue(),nt(),it=s(),at=[`x`,`y`,`z`,`w`],ot=({onChange:e,disabled:t,...n})=>{let r=(0,rt.useRef)(void 0);r.current=n.value;let i=(0,rt.useCallback)((t,n)=>{if(e&&r.current){let i={};for(let e=0;e<r.current.length;e++)i[e]=r.current[e];i[t]=n,e(i)}},[e]),a=[];for(let e=0;e<n.value.length;e++)a.push((0,it.jsx)(T,{title:at[e],labelAlign:`right`,children:(0,it.jsx)(Ke,{disabled:t,value:n.value[e],step:n.step,onChange:t=>{i(e,t)}})},e));return(0,it.jsx)(`div`,{className:tt.vector,children:a.map(e=>e)})},ot.__docgenInfo={description:``,methods:[],displayName:`Vector`,props:{value:{required:!0,tsType:{name:`Array`,elements:[{name:`number`}],raw:`number[]`},description:``},step:{required:!1,tsType:{name:`number`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: MTP.IVector4 ) => void`,signature:{arguments:[{type:{name:`MTP.IVector4`},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var ct,lt;function ut(){return(ut=t((()=>{ct=i(),lt=(0,ct.createContext)(null)})))()}var dt,E;function D(){return(D=t((()=>{dt=i(),ut(),E=()=>{let e=(0,dt.useContext)(lt);if(e===null)throw Error(`useEditor must be used within a EditorProvider`);return e}})))()}var ft,pt,mt;function ht(){return(ht=t((()=>{ft=i(),de(),D(),pt=s(),mt=e=>{let{engine:t}=E(),n=(0,ft.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{n.components.forEach(r=>{e.push({label:`${n.getScenePath(t.root)} > ${r.constructor.name}`,value:r.uuid})})}),e},[t]),[r,i]=(0,ft.useState)(n);return(0,ft.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,pt.jsx)(`div`,{className:pe.inputSelect,children:(0,pt.jsx)(`select`,{className:pe.input,onChange:t=>{e.onChange&&e.onChange(t.target.value||null)},value:e.value||``,children:r.map((e,t)=>{let n=typeof e==`string`?e:e.label,r=typeof e==`string`?e:e.value;return(0,pt.jsx)(`option`,{value:r,children:n},t)})})})},mt.__docgenInfo={description:``,methods:[],displayName:`InputComponentRef`,props:{value:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: string | null ) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var gt,_t,vt;function yt(){return(yt=t((()=>{gt=i(),de(),D(),_t=s(),vt=e=>{let{engine:t}=E(),n=(0,gt.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{e.push({label:n.getScenePath(t.root),value:n.uuid})}),e},[t]),[r,i]=(0,gt.useState)(n);return(0,gt.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,_t.jsx)(`div`,{className:pe.inputSelect,children:(0,_t.jsx)(`select`,{className:pe.input,onChange:t=>{e.onChange&&e.onChange(t.target.value||null)},value:e.value||``,children:r.map((e,t)=>{let n=typeof e==`string`?e:e.label,r=typeof e==`string`?e:e.value;return(0,_t.jsx)(`option`,{value:r,children:n},t)})})})},vt.__docgenInfo={description:``,methods:[],displayName:`InputEntityRef`,props:{value:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: string | null ) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var bt,xt,St,Ct;function wt(){return(wt=t((()=>{bt=`InputResourceSelect__inputResourceSelect___Lmluc`,xt=`InputResourceSelect__select___Lmluc`,St=`InputResourceSelect__editButton___Lmluc`,Ct={inputResourceSelect:bt,select:xt,editButton:St}})))()}var Tt,Et,Dt;function Ot(){return(Ot=t((()=>{Tt=i(),fe(),D(),wt(),Et=s(),Dt=e=>{let{editor:t}=E(),n=(0,Tt.useCallback)(()=>{e.value&&(t.setField(`navigateAsset`,{assetType:e.resourceType,name:String(e.value)}),t.setField(`selectedAsset`,{name:String(e.value),assetType:e.resourceType}))},[t,e.value,e.resourceType]);return(0,Et.jsxs)(`div`,{className:Ct.inputResourceSelect,children:[(0,Et.jsx)(`div`,{className:Ct.select,children:(0,Et.jsx)(me,{value:e.value,selectList:e.selectList,onChange:e.onChange})}),e.value&&(0,Et.jsx)(`button`,{className:Ct.editButton,onClick:n,title:`Edit resource`,children:`✎`})]})},Dt.__docgenInfo={description:``,methods:[],displayName:`InputResourceSelect`,props:{value:{required:!0,tsType:{name:`T`},description:``},selectList:{required:!0,tsType:{name:`union`,raw:`SelectList | ( () => SelectList )`,elements:[{name:`SelectList`},{name:`unknown`}]},description:``},resourceType:{required:!0,tsType:{name:`union`,raw:`"material" | "texture" | "shader"`,elements:[{name:`literal`,value:`"material"`},{name:`literal`,value:`"texture"`},{name:`literal`,value:`"shader"`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var kt,O;function At(){return(At=t((()=>{i(),u(),te(),re(),qe(),fe(),et(),st(),ht(),yt(),Ot(),kt=s(),O=e=>{let t=null,n=e.onChange,r=e.value,i=e.format,a=e=>{n&&n(e)};if(i&&(i.type==`entity`?t=(0,kt.jsx)(vt,{value:r,onChange:a}):i.type==`component`?t=(0,kt.jsx)(mt,{value:r,onChange:a}):i.type==`vector`&&Array.isArray(r)?t=(0,kt.jsx)(ot,{value:r,onChange:a}):i.type==`color`&&Array.isArray(r)?t=(0,kt.jsx)(ie,{value:r,onChange:a}):i.type==`select`?t=(0,kt.jsx)(me,{value:r,onChange:a,selectList:i.list}):i.type==`resource`&&(t=(0,kt.jsx)(Dt,{value:r,onChange:a,selectList:i.list,resourceType:i.resourceType}))),r==null)return t;if(!t){if(typeof r==`number`)t=(0,kt.jsx)(Ke,{...e,value:r,onChange:a});else if(typeof r==`string`)t=(0,kt.jsx)($e,{...e,value:r,onChange:a});else if(typeof r==`boolean`)t=(0,kt.jsx)(ne,{...e,checked:r,onChange:a});else if(typeof r==`function`){let n=e.label||`Run`;t=(0,kt.jsx)(d,{onClick:()=>{r()},children:n})}else t=(0,kt.jsx)($e,{...e,value:JSON.stringify(r),onChange:()=>{}})}return t}})))()}var jt,Mt,Nt,Pt,Ft,It,Lt,Rt;function zt(){return(zt=t((()=>{jt=i(),Mt={showAudioView:!0},Nt=`orengine-editor-ui-settings`,Pt=()=>{try{let e=localStorage.getItem(Nt);if(e)return{...Mt,...JSON.parse(e)}}catch{}return{...Mt}},Ft=Pt(),It=new Set,Lt=e=>(It.add(e),()=>{It.delete(e)}),Rt=e=>[(0,jt.useSyncExternalStore)(Lt,()=>Ft[e]),(0,jt.useCallback)(t=>{Ft={...Ft,[e]:t};try{localStorage.setItem(Nt,JSON.stringify(Ft))}catch{}It.forEach(e=>e())},[e])]})))()}var Bt,Vt,Ht;function Ut(){return(Ut=t((()=>{Bt=`EditorSettings__editorSettings___LmVka`,Vt=`EditorSettings__editorSettings_inner___LmVka`,Ht={editorSettings:Bt,editorSettings_inner:Vt}})))()}var Wt,Gt;function Kt(){return(Kt=t((()=>{c(),ue(),At(),zt(),Ut(),Wt=s(),Gt=()=>{let[e,t]=Rt(`showAudioView`);return(0,Wt.jsx)(`div`,{className:Ht.editorSettings,children:(0,Wt.jsx)(`div`,{className:Ht.editorSettings_inner,children:(0,Wt.jsx)(l,{label:`View`,accordion:!0,children:(0,Wt.jsx)(T,{title:`AudioView`,children:(0,Wt.jsx)(O,{value:e,onChange:e=>t(e)})})})})})},Gt.__docgenInfo={description:``,methods:[],displayName:`EditorSettings`}})))()}var qt,Jt;function Yt(){return(Yt=t((()=>{qt=i(),Jt=(0,qt.createContext)(void 0)})))()}var Xt,Zt;function Qt(){return(Qt=t((()=>{Xt=i(),Zt=(e,t)=>{let[n,r]=(0,Xt.useState)(()=>e?e.serialize():{}),i=t?[...t]:[],a=(0,Xt.useMemo)(()=>i,i);return(0,Xt.useEffect)(()=>{if(e===void 0)return;r(e.serialize());let t=t=>{let n=a.length==0;for(let e=0;e<a.length;e++)if(t.find(t=>t==a[e])){n=!0;break}n&&r(e.serialize())};return e.on(`fields/update`,t),()=>{e.off(`fields/update`,t)}},[e,a]),{fields:n}}})))()}var $t;function en(){return(en=t((()=>{Qt(),$t=e=>(Zt(e.target),{target:e.target})})))()}var tn,nn;function rn(){return(rn=t((()=>{tn=i(),Yt(),nn=()=>{let e=(0,tn.useContext)(Jt);if(!e)throw Error(`SerializeFieldViewContext is not defined`);return e}})))()}var an,on;function sn(){return(sn=t((()=>{an=`ValueArray__container___LmNvb`,on={container:an}})))()}var cn,ln;function un(){return(un=t((()=>{i(),ue(),At(),sn(),cn=s(),ln=e=>{let t=[],n=e.value,r=e.format,i=r?.type==`array`?r.labels:void 0;if(n===void 0)return null;for(let r=0;r<n.length;r++){let a=n[r],o=r.toString();i&&(o+=`/ `+i(a,r)),t.push((0,cn.jsx)(T,{title:o,children:(0,cn.jsx)(O,{...e,value:a,onChange:t=>{let i=n.concat();i[r]=t,e.onChange&&e.onChange(i)}})},r))}return(0,cn.jsx)(`div`,{className:on.container,children:t})},ln.__docgenInfo={description:``,methods:[],displayName:`ValueArray`,props:{value:{required:!0,tsType:{name:`union`,raw:`T | undefined`,elements:[{name:`T`},{name:`undefined`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}}},description:``},format:{required:!1,tsType:{name:`SerializableFieldFormat`},description:``},label:{required:!1,tsType:{name:`union`,raw:`string | React.ReactNode`,elements:[{name:`string`},{name:`ReactReactNode`,raw:`React.ReactNode`}]},description:``},readOnly:{required:!1,tsType:{name:`boolean`},description:``},step:{required:!1,tsType:{name:`number`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var dn,fn;function pn(){return(pn=t((()=>{i(),re(),ue(),st(),D(),rn(),At(),un(),dn=s(),fn=e=>{let{editor:t}=E(),{target:n}=nn(),r=e.field.value,i=typeof r,a=e.field.opt,o=a?.format,s=a?.label||e.path.split(`/`).pop(),c=o&&o.type==`vector`,l=null;if(Array.isArray(r))l=o?.type==`vector`?(0,dn.jsx)(ot,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):o?.type==`color`?(0,dn.jsx)(ie,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):(0,dn.jsx)(ln,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}});else if(l=(0,dn.jsx)(O,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}),i===`function`)return l;return(0,dn.jsx)(T,{title:s,vertical:c,children:l})},fn.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldViewValue`,props:{path:{required:!0,tsType:{name:`string`},description:``},field:{required:!0,tsType:{name:`SerializeFieldDirectoryValue`},description:``}}}})))()}var mn,hn,gn,_n;function vn(){return(vn=t((()=>{mn=`SerializeFieldViewDir__container___LmNvb`,hn=`SerializeFieldViewDir__field___LmNvb`,gn=`SerializeFieldViewDir__block___LmNvb`,_n={container:mn,field:hn,block:gn}})))()}var yn,bn;function xn(){return(xn=t((()=>{i(),c(),pn(),vn(),yn=s(),bn=e=>{let t=[],n=Object.keys(e.fields.childs);for(let r=0;r<n.length;r++){let i=n[r],a=e.fields.childs[i],{opt:o}=a,s=!1;if(o&&(s=typeof o.hidden==`function`?o.hidden(a.type==`value`?a.value:null):o.hidden||!1),s)continue;let c=`field`+i,u=(e.basePath?e.basePath+`/`:``)+i,d=null;d=a.type===`value`?(0,yn.jsx)(fn,{path:u,field:a},c):(0,yn.jsx)(`div`,{className:_n.block,children:(0,yn.jsx)(l,{accordion:!0,label:i,children:(0,yn.jsx)(bn,{fields:a,basePath:u})},c)},c),d&&t.push(d)}return(0,yn.jsx)(`div`,{className:_n.container,children:t})},bn.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldViewDir`,props:{fields:{required:!0,tsType:{name:`MXP.SerializeFieldDirectoryFolder`},description:``},basePath:{required:!1,tsType:{name:`string`},description:``}}}})))()}var Sn,Cn;function wn(){return(wn=t((()=>{Yt(),en(),xn(),Sn=s(),Cn=e=>{let t=$t(e),n=t.target.serializeToDirectory();if(e.filter){let t=n.childs[e.filter];t&&t.type===`folder`&&(n=t)}return(0,Sn.jsx)(Jt.Provider,{value:t,children:(0,Sn.jsx)(bn,{fields:n,basePath:e.filter})})},Cn.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldView`}})))()}var k;function Tn(){return(Tn=t((()=>{Qt(),k=(e,t)=>{let n=n=>{e?.setField(t,n)},{fields:r}=Zt(e,[t]);return[r&&r[t],n]}})))()}var A;function En(){return(En=t((()=>{A=class e{x;y;z;w;constructor(e,t,n,r){this.x=0,this.y=0,this.z=0,this.w=0,this.set(e,t,n,r)}get isVector(){return!0}set(e,t,n,r){return this.x=e??0,this.y=t??0,this.z=n??0,this.w=r??0,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setFromArray(e){return this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0,this.w=e[3]||0,this}add(e){return typeof e==`number`?(this.x+=e,this.y+=e,this.z+=e,this.w+=e):(this.x+=e.x??0,this.y+=e.y??0,this.z+=e.z??0,this.w+=e.w??0),this}sub(e){return typeof e==`number`?(this.x-=e,this.y-=e,this.z-=e):(this.x-=e.x??0,this.y-=e.y??0,this.z-=e.z??0,this.w-=e.w??0),this}multiply(e){return typeof e==`number`?(this.x*=e,this.y*=e,this.z*=e,this.w*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w),this}divide(e){return typeof e==`number`?(this.x/=e,this.y/=e,this.z/=e,this.w/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return Math.sqrt(t*t+n*n+r*r)}normalize(){let e=this.length()||1;return this.x/=e,this.y/=e,this.z/=e,this}cross(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z;return this.x=n*o-r*a,this.y=r*i-t*o,this.z=t*a-n*i,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}applyMatrix3(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10],d=this.x*n+this.y*a+this.z*c,f=this.x*r+this.y*o+this.z*l,p=this.x*i+this.y*s+this.z*u;return this.x=d,this.y=f,this.z=p,this.w=0,this}applyMatrix4(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=this.x*n+this.y*o+this.z*u+this.w*m,y=this.x*r+this.y*s+this.z*d+this.w*h,b=this.x*i+this.y*c+this.z*f+this.w*g,x=this.x*a+this.y*l+this.z*p+this.w*_;return this.x=v,this.y=y,this.z=b,this.w=x,this}applyMatrix4AsPosition(e){let t=this.w;return this.w=1,this.applyMatrix4(e),this.w=t,this}applyMatrix4AsDirection(e){let t=this.w;return this.w=0,this.applyMatrix4(e),this.w=t,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this}clone(){return new e(this.x,this.y,this.z,this.w)}getElm(e){return e==`vec2`?[this.x,this.y]:e==`vec3`?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}})))()}var j;function Dn(){return(Dn=t((()=>{En(),j=class e{elm;constructor(e){this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e&&this.set(e)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new e().copy(this)}copy(e){return this.set(e.elm),this}perspective(e,t,n,r){let i=1/Math.tan(e*Math.PI/360),a=r-n;return this.elm=[i/t,0,0,0,0,i,0,0,0,0,-(r+n)/a,-1,0,0,-(r*n*2)/a,0],this}orthographic(e,t,n,r){return this.elm=[2/e,0,0,0,0,2/t,0,0,0,0,-2/(r-n),0,0,0,-(r+n)/(r-n),1],this}lookAt(e,t,n){let r=e.clone().sub(t).normalize(),i=n.clone().cross(r).normalize(),a=r.clone().cross(i).normalize();return this.elm=[i.x,i.y,i.z,0,a.x,a.y,a.z,0,r.x,r.y,r.z,0,e.x,e.y,e.z,1],this}inverse(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15],g=e*a-t*i,_=e*o-n*i,v=e*s-r*i,y=t*o-n*a,b=t*s-r*a,x=n*s-r*o,S=c*p-l*f,C=c*m-u*f,ee=c*h-d*f,te=l*m-u*p,ne=l*h-d*p,re=u*h-d*m,ie=g*re-_*ne+v*te+y*ee-b*C+x*S,w=1/ie;return ie==0?this.identity():(this.elm[0]=(a*re-o*ne+s*te)*w,this.elm[1]=(-t*re+n*ne-r*te)*w,this.elm[2]=(p*x-m*b+h*y)*w,this.elm[3]=(-l*x+u*b-d*y)*w,this.elm[4]=(-i*re+o*ee-s*C)*w,this.elm[5]=(e*re-n*ee+r*C)*w,this.elm[6]=(-f*x+m*v-h*_)*w,this.elm[7]=(c*x-u*v+d*_)*w,this.elm[8]=(i*ne-a*ee+s*S)*w,this.elm[9]=(-e*ne+t*ee-r*S)*w,this.elm[10]=(f*b-p*v+h*g)*w,this.elm[11]=(-c*b+l*v-d*g)*w,this.elm[12]=(-i*te+a*C-o*S)*w,this.elm[13]=(e*te-t*C+n*S)*w,this.elm[14]=(-f*y+p*_-m*g)*w,this.elm[15]=(c*y-l*_+u*g)*w,this)}transpose(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15];return this.elm[0]=e,this.elm[1]=i,this.elm[2]=c,this.elm[3]=f,this.elm[4]=t,this.elm[5]=a,this.elm[6]=l,this.elm[7]=p,this.elm[8]=n,this.elm[9]=o,this.elm[10]=u,this.elm[11]=m,this.elm[12]=r,this.elm[13]=s,this.elm[14]=d,this.elm[15]=h,this}set(e){for(let t=0;t<this.elm.length;t++)this.elm[t]=e[t]??0;return this}setFromTransform(e,t,n){return this.identity(),e&&this.applyPosition(e),t&&this.applyQuaternion(t),n&&this.applyScale(n),this}applyPosition(e){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,e.x,e.y,e.z,1]),this}applyQuaternion(e){let t=e.x,n=e.y,r=e.z,i=e.w,a=t*t,o=n*n,s=r*r,c=i*i,l=t*n,u=t*r,d=t*i,f=n*r,p=n*i,m=r*i;return this.matmul([a-o-s+c,2*(l+m),2*(u-p),0,2*(l-m),-a+o-s+c,2*(f+d),0,2*(u+p),2*(f-d),-a-o+s+c,0,0,0,0,1]),this}applyScale(e){return this.matmul([e.x,0,0,0,0,e.y,0,0,0,0,e.z,0,0,0,0,1]),this}matmul(e){let t=Array(16);for(let n=0;n<4;n++)for(let r=0;r<4;r++){let i=0;for(let t=0;t<4;t++)i+=this.elm[t*4+r]*e[t+n*4];t[r+n*4]=i}this.elm=t}setRotationFromDirection(e,t){t||={x:0,y:1,z:0};let n=new A().copy(e).normalize(),r=new A().copy(t).cross(n).normalize();r.length()==0&&(n.x+=.001,r.copy(t).cross(n).normalize());let i=n.clone().cross(r).normalize();return this.set([r.x,r.y,r.z,0,i.x,i.y,i.z,0,n.x,n.y,n.z,0,0,0,0,1]),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set([c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1]),this}multiply(e){return this.matmul(e.elm),this}preMultiply(e){let t=this.copyToArray([]);return this.set(e.elm),this.matmul(t),this}decompose(e,t,n){e&&(e.x=this.elm[12],e.y=this.elm[13],e.z=this.elm[14]),t&&t.setFromMatrix(this)}copyToArray(e){e.length=this.elm.length;for(let t=0;t<this.elm.length;t++)e[t]=this.elm[t];return e}}})))()}var On;function kn(){return(kn=t((()=>{Dn(),En(),On=class extends A{order;constructor(e,t,n,r){super(e,t,n,0),this.order=r||`XYZ`}copy(e){return`order`in e&&(this.order=e.order),super.copy(e)}setFromQuaternion(e){let t=new j().applyQuaternion(e);return this.setFromRotationMatrix(t),this}setFromRotationMatrix(e){let t=e.elm,n=t[0],r=t[4],i=t[8],a=t[5],o=t[9],s=t[6],c=t[10];return this.order=`XYZ`,this.y=Math.asin(Math.min(1,Math.max(-1,i))),Math.abs(i)<.9999999?(this.x=Math.atan2(-o,c),this.z=Math.atan2(-r,n)):(this.x=Math.atan2(s,a),this.z=0),this}}})))()}var An;function jn(){return(jn=t((()=>{An=class e{x;y;z;w;updated=!1;constructor(e,t,n,r){this.x=e||0,this.y=t||0,this.z=n||0,this.w=r||1}set(e,t,n,r){this.x=e??this.x,this.y=t??this.y,this.z=n??this.z,this.w=r??this.w,this.updated=!0}setFromEuler(e,t){let n=t||(`order`in e?e.order:`XYZ`),r=Math.sin(e.x/2),i=Math.sin(e.y/2),a=Math.sin(e.z/2),o=Math.cos(e.x/2),s=Math.cos(e.y/2),c=Math.cos(e.z/2);return n==`XYZ`?(this.x=o*i*a+r*s*c,this.y=-r*s*a+o*i*c,this.z=o*s*a+r*i*c,this.w=-r*i*a+o*s*c):n==`XZY`?(this.x=-o*i*a+r*s*c,this.y=o*i*c-r*s*a,this.z=r*i*c+o*s*a,this.w=r*i*a+o*s*c):n==`YZX`?(this.x=r*s*c+o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=-r*i*a+o*s*c):n==`ZYX`&&(this.x=r*s*c-o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=r*i*a+o*s*c),this.updated=!0,this}setFromMatrix(e){let t=e.elm,n=t[0]+t[5]+t[10],r,i,a,o;if(n>0){let e=Math.sqrt(n+1)*2;o=.25*e,r=(t[6]-t[9])/e,i=(t[8]-t[2])/e,a=(t[1]-t[4])/e}else if(t[0]>t[5]&&t[0]>t[10]){let e=Math.sqrt(1+t[0]-t[5]-t[10])*2;o=(t[6]-t[9])/e,r=.25*e,i=(t[1]+t[4])/e,a=(t[2]+t[8])/e}else if(t[5]>t[10]){let e=Math.sqrt(1+t[5]-t[0]-t[10])*2;o=(t[8]-t[2])/e,r=(t[1]+t[4])/e,i=.25*e,a=(t[6]+t[9])/e}else{let e=Math.sqrt(1+t[10]-t[0]-t[5])*2;o=(t[1]-t[4])/e,r=(t[2]+t[8])/e,i=(t[6]+t[9])/e,a=.25*e}let s=Math.sqrt(r*r+i*i+a*a+o*o);return r/=s,i/=s,a/=s,o/=s,this.x=r,this.y=i,this.z=a,this.w=o,this.updated=!0,this}multiply(e){let t=this.w*e.w-this.x*e.x-this.y*e.y-this.z*e.z,n=this.w*e.x+this.x*e.w+this.y*e.z-this.z*e.y,r=this.w*e.y-this.x*e.z+this.y*e.w+this.z*e.x,i=this.w*e.z+this.x*e.y-this.y*e.x+this.z*e.w;return this.set(n,r,i,t),this.updated=!0,this}preMultiply(e){let t=e.clone().multiply(this);this.set(t.x,t.y,t.z,t.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this.updated=!0,this}clone(){return new e(this.x,this.y,this.z,this.w)}}})))()}var Mn;function Nn(){return(Nn=t((()=>{En(),(function(e){let t=e.gauss=(e,t,n)=>{let r=e-t,i=-(r*r)/(2*n*n);return 1/Math.sqrt(2*Math.PI*n)*Math.exp(i)};e.gaussWeights=e=>{let n=0,r=[];if(e<=1)return[.5];for(let i=0;i<e;i++){let a=i/(e-1),o=t(a,0,1);n+=o*(i>0?2:1),r.push(o)}for(let t=0;t<e;t++)r[t]/=n;return r},e.randomSeed=e=>{e^=e<<13,e^=0,e^=e<<5;let t=123456789^e;e^=e<<13,e^=0,e^=e<<5;let n=362436069^e;e^=e<<13,e^=0,e^=e<<5;let r=521288629^e;e^=e<<13,e^=0,e^=e<<5;let i=88675123^e,a;return()=>(a=t^t<<11,t=n,n=r,r=i,i=(i^i>>>19^(a^a>>>8))>>>0,i/4294967296)};let n=e.randomRange=(e=-1,t=1)=>e+Math.random()*(t-e);e.randomVector=(e=new A(-1,-1,-1,-1),t=new A(1,1,1,1))=>new A(n(e.x,t.x),n(e.y,t.y),n(e.z,t.z),n(e.w,t.w)),e.randomInSphere=(e=1,t=Math.random)=>{let n=t(),r=t(),i=t(),a=2*Math.PI*n,o=Math.acos(2*r-1),s=Math.cbrt(i)*e,c=Math.sin(o);return{x:s*c*Math.cos(a),y:s*c*Math.sin(a),z:s*Math.cos(o)}},e.smoothstep=(e,t,n)=>n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))})(Mn||={})})))()}function M(){return(M=t((()=>{En(),kn(),jn(),Dn(),Nn()})))()}var Pn;function Fn(){return(Fn=t((()=>{Pn=class{gl;vao;program;indexBuffer;attributes;vertCount;indexCount;instanceCount;attribPointerDiect;attribTypeDict;constructor(e,t){this.gl=e,this.program=t,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([[`Float32Array`,this.gl.vertexAttribPointer.bind(this.gl)],[`Int32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int8Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt8Array`,this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([[`Float32Array`,this.gl.FLOAT],[`Int32Array`,this.gl.INT],[`Int16Array`,this.gl.SHORT],[`Int8Array`,this.gl.BYTE],[`UInt32Array`,this.gl.UNSIGNED_INT],[`UInt16Array`,this.gl.UNSIGNED_SHORT],[`UInt8Array`,this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((e,t)=>{e.instanceDivisor==null&&t!=`index`&&(this.vertCount=Math.max(this.vertCount,e.count)),e.instanceDivisor!==void 0&&e.instanceDivisor>0&&(this.instanceCount=this.instanceCount==0?e.count:Math.min(this.instanceCount,e.count))})}setAttribute(e,t,n,r){if(t.array===null)return;let i={buffer:t,size:n,count:t.array?t.array.length/n:0,location:void 0,...r};this.attributes.set(e,i),this.gl.bindVertexArray(this.vao),i.location=this.gl.getAttribLocation(this.program,e);let a=this.attribPointerDiect.get(t.array.constructor.name),o=this.attribTypeDict.get(t.array.constructor.name);if(i.location>-1){if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i.buffer.buffer),i.size==16){for(let e=0;e<4;e++)this.gl.enableVertexAttribArray(i.location+e);for(let e=0;e<4;e++)this.gl.vertexAttribPointer(i.location+e,4,o,!1,64,16*e);if(i.instanceDivisor!==void 0)for(let e=0;e<4;e++)this.gl.vertexAttribDivisor(i.location+e,i.instanceDivisor)}else this.gl.enableVertexAttribArray(i.location),a(i.location,i.size,o,!1,0,0),i.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(i.location,i.instanceDivisor)}return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(e){return this.attributes.delete(e),this.calcVertCount(),this}setIndex(e){this.indexBuffer=e,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(e){this.gl.bindVertexArray(this.vao),e&&e(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(e=>{e.buffer.dispose()})}}})))()}var In,Ln;function Rn(){return(Rn=t((()=>{Fn(),In=new Map,Ln=class{gl;program;name=``;vao;uniforms;constructor(e){this.gl=e,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(e,t,n){if(this.program===null){console.warn(`program is null.`);return}let r=this.createShader(e,this.gl.VERTEX_SHADER),i=this.createShader(t,this.gl.FRAGMENT_SHADER);if(this.name){let e=[];r.error&&e.push(`[VERTEX]
`+r.error),i.error&&e.push(`[FRAGMENT]
`+i.error),e.length>0?In.set(this.name,e.join(`

`)):In.delete(this.name)}if(!(!r.shader||!i.shader)){if(this.gl.attachShader(this.program,r.shader),this.gl.attachShader(this.program,i.shader),n&&n.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,n.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)){let e=this.gl.getProgramInfoLog(this.program);if(console.error(`program link error:`,e),this.name&&e){let t=In.get(this.name);In.set(this.name,(t?t+`

`:``)+`[LINK]
`+e)}}return this}}createShader(e,t){let n=this.gl.createShader(t);return n?(this.gl.shaderSource(n,e),this.gl.compileShader(n),this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS)?{shader:n,error:null}:{shader:null,error:this.gl.getShaderInfoLog(n)||`Unknown shader error`}):{shader:null,error:null}}setUniform(e,t,n){let r=this.uniforms.get(e);if(r){r.type=t;let e=r.value;e.length=n.length;for(let t=0;t<n.length;t++)e[t]=n[t];if(r.cache){if(r.cache.length!==e.length)r.needsUpdate=!0;else for(let t=0;t<e.length;t++)if(r.cache[t]!==e[t]){r.needsUpdate=!0;break}}else r.needsUpdate=!0}else this.uniforms.set(e,{value:n.concat(),type:t,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(e){this.program&&this.uniforms.forEach((t,n)=>{(t.location===null||e)&&(t.location=this.gl.getUniformLocation(this.program,n))})}uploadUniforms(){this.uniforms.forEach(e=>{e.needsUpdate&&e.location!==null&&(/Matrix[2|3|4]fv/.test(e.type)?this.gl[`uniform`+e.type](e.location,!1,e.value):/[1|2|3|4][f|i]$/.test(e.type)?this.gl[`uniform`+e.type](e.location,...e.value):this.gl[`uniform`+e.type](e.location,e.value),e.cache=e.value.concat(),e.needsUpdate=!1)})}getVAO(e=`_`){if(!this.program)return null;let t=this.vao.get(e);return t||(t=new Pn(this.gl,this.program),this.vao.set(e,t),t)}use(e){this.program&&(this.gl.useProgram(this.program),e&&e(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(e=>{e.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}})))()}var zn;function Bn(){return(Bn=t((()=>{zn=class{gl;buffer;array;constructor(e){this.gl=e,this.buffer=this.gl.createBuffer(),this.array=null}setData(e,t=`vbo`,n){let r=t==`vbo`?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(r,this.buffer),this.gl.bufferData(r,e,n||this.gl.STATIC_DRAW),this.gl.bindBuffer(r,null),this.array=e,this}read(e){return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this}dispose(){this.gl.deleteBuffer(this.buffer)}}})))()}var Vn;function Hn(){return(Hn=t((()=>{M(),Vn=class{unit;image;size;gl;glTex;textureType;_setting;constructor(e){this.gl=e,this.image=null,this.unit=0,this.size=new A,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=e.TEXTURE_2D}get isTexture(){return!0}setting(e){return this._setting={...this._setting,...e},this.attach(this.image),this}attach(e,t){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.image){let e=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(e.width,e.height),e instanceof HTMLImageElement||e instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,e):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,e.width,e.height,0,this._setting.format,this._setting.type,e.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}subImage(e,t,n){return this.gl.bindTexture(this.textureType,this.glTex),this.gl.texSubImage2D(this.textureType,0,0,0,t,n,this._setting.format,this._setting.type,e),this.gl.bindTexture(this.textureType,null),this}activate(e){return this.gl.activeTexture(this.gl.TEXTURE0+e),this.gl.bindTexture(this.textureType,this.glTex),this.unit=e,this}load(e,t){let n=new Image;return n.onload=()=>{this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.attach(n),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),t&&t()},n.src=e,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}})))()}var Un;function Wn(){return(Wn=t((()=>{M(),Hn(),Un=class{size;gl;glFrameBuffer;textures;depthTexture;textureAttachmentList;constructor(e,t){this.gl=e,this.size=new A(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!t||!t.disableDepthBuffer)&&this.setDepthTexture(new Vn(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(e){this.depthTexture=e,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((e,t)=>{e.attach({width:this.size.x,height:this.size.y});let n=this.gl.COLOR_ATTACHMENT0+t;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,n,this.gl.TEXTURE_2D,e.getTexture(),0),this.textureAttachmentList.push(n)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(e,t){return typeof e==`number`?(this.size.x=e,t!==void 0&&(this.size.y=t)):this.size.copy(e),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}clear(){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,this.glFrameBuffer),e.drawBuffers(this.textureAttachmentList),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}})))()}var Gn;function Kn(){return(Kn=t((()=>{Wn(),Gn=class extends Un{cubeTarget;textures;currentFace;constructor(e,t){super(e,t),this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this}face(e){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((t,n)=>{let r=this.gl.COLOR_ATTACHMENT0+n;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,r,this.cubeTarget[e],t.getTexture(),0),this.textureAttachmentList.push(r)}),this.currentFace=this.cubeTarget[e],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}})))()}var qn;function Jn(){return(Jn=t((()=>{Hn(),qn=class extends Vn{cubeTarget;constructor(e){super(e),this.textureType=e.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(e){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let e=0;e<6;e++){let t=Array.isArray(this.image)?this.image[e]:this.image;this.size.set(t.width,t.height),t instanceof HTMLImageElement||t instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[e],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t):this.gl.texImage2D(this.cubeTarget[e],0,this._setting.internalFormat,t.width,t.height,0,this._setting.format,this._setting.type,t.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}})))()}function Yn(){return(Yn=t((()=>{Rn(),Bn(),Wn(),Kn(),Hn(),Jn()})))()}var N,Xn;function Zn(){return(Zn=t((()=>{Yn(),N=WebGL2RenderingContext,Xn=class{gl;canvas;_stateCache;_extDisJointTimerQuery;_queryList;_queryListQueued;constructor(e){this.gl=e,this.canvas=e.canvas,this._stateCache={},this._queryList=[],this._queryListQueued=[],e.getExtension(`EXT_color_buffer_float`),e.getExtension(`EXT_color_buffer_half_float`),e.getExtension(`OES_texture_float_linear`),this._extDisJointTimerQuery=e.getExtension(`EXT_disjoint_timer_query_webgl2`),this._extDisJointTimerQuery||console.warn(`[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled.`),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)}createTexture(){return new Vn(this.gl)}createCubeTexture(){return new qn(this.gl)}createFrameBuffer(e){return new Un(this.gl,e)}createCubeFrameBuffer(){return new Gn(this.gl)}createProgram(){return new Ln(this.gl)}_setState(e,t){this._stateCache[e]!==t&&(t?this.gl.enable(e):this.gl.disable(e),this._stateCache[e]=t)}setMaterialState(e,t,n){this._setState(this.gl.CULL_FACE,e),this._setState(this.gl.DEPTH_TEST,t),this.gl.depthMask(n)}setBlendEnabled(e){e?this.gl.enable(this.gl.BLEND):this.gl.disable(this.gl.BLEND)}bindRenderTarget(e,t,n){t?this.gl.viewport(t.x,t.y,t.z,t.w):e?this.gl.viewport(0,0,e.size.x,e.size.y):n&&this.gl.viewport(0,0,n.x,n.y),e?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e.getFrameBuffer()),this.gl.drawBuffers(e.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}clear(e,t){let n=0;e&&(this.gl.clearColor(e.x,e.y,e.z,e.w),n|=this.gl.COLOR_BUFFER_BIT),t!==null&&(this.gl.clearDepth(t),n|=this.gl.DEPTH_BUFFER_BIT),n!==0&&this.gl.clear(n)}blit(e,t,n,r,i,a){let o=this.gl;o.bindFramebuffer(o.READ_FRAMEBUFFER,e?e.getFrameBuffer():null),a&&o.readBuffer(o.COLOR_ATTACHMENT0),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,t?t.getFrameBuffer():null),a&&t&&o.drawBuffers([o.COLOR_ATTACHMENT0]),o.blitFramebuffer(0,0,n,r,0,0,n,r,o.COLOR_BUFFER_BIT,i?o.LINEAR:o.NEAREST)}draw(e,t,n,r,i){e.use(e=>{e.uploadUniforms(),this.gl.bindVertexArray(t.getVAO());let i=t.indexBuffer,a=this.gl.UNSIGNED_SHORT;i&&i.array&&i.array.BYTES_PER_ELEMENT==4&&(a=this.gl.UNSIGNED_INT),r==`NORMAL`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):r==`ADD`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):r==`DIFF`&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);let o=this.gl[n];t.instanceCount>0?i?this.gl.drawElementsInstanced(o,t.indexCount,a,0,t.instanceCount):this.gl.drawArraysInstanced(o,0,t.vertCount,t.instanceCount):i?this.gl.drawElements(o,t.indexCount,a,0):this.gl.drawArrays(o,0,t.vertCount),this.gl.bindVertexArray(null)})}collectTimerQueries(){if(!this._extDisJointTimerQuery)return null;if(this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))return this._queryList.forEach(e=>this.gl.deleteQuery(e)),this._queryList.length=0,null;let e=[];if(this._queryListQueued.length>0){let t=this._queryListQueued.length;for(let n=t-1;n>=0;n--){let t=this._queryListQueued[n];if(this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT_AVAILABLE)){let r=this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT);e.push({name:t.name,duration:r/1e3/1e3}),this._queryList.push(t.query),this._queryListQueued.splice(n,1)}}}return e}}})))()}var Qn,$n,er,tr;function nr(){return(nr=t((()=>{Qn=(e,t)=>{if(!t)return e;let n=Object.keys(t),r=``;for(let e=0;e<n.length;e++)r+=`#define `+n[e]+` `+t[n[e]]+`
`;return r+=e,r},$n=(e,t)=>(e=e.replaceAll(`NUM_LIGHT_DIR`,t?t.directional.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_DIR`,t?Math.min(2,t.directional.filter(e=>e.component.castShadow).length).toString():`0`),e=e.replaceAll(`NUM_LIGHT_SPOT`,t?t.spot.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_SPOT`,t?Math.min(2,t.spot.filter(e=>e.component.castShadow).length).toString():`0`),e),er=e=>(e=e.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(e,t,n)=>{let r=``;for(let e=0;e<Number(t);e++)r+=n.replaceAll(`LOOP_INDEX`,e.toString());return r}),e),tr=(e,t,n)=>(e=Qn(e,t),e=`#version 300 es
precision highp float;
`+e,e=$n(e,n),e=er(e),e)})))()}var rr;function ir(){return(ir=t((()=>{rr=class{listeners;constructor(){this.listeners=[]}on(e,t){this.listeners.push({event:e,cb:t})}once(e,t){this.listeners.push({event:e,cb:t,once:!0})}off(e,t){this.listeners=this.listeners.filter(n=>t==null?n.event!=e:n.event!=e||n.cb!=t)}emit(e,t){let n=this.listeners.concat();for(let r=0;r<n.length;r++){let i=n[r];i.event==e&&(i.cb.apply(this,t||[]),i.once&&this.off(e,i.cb))}}hasEvent(e){return this.listeners.some(t=>t.event==e)}}})))()}var ar;function or(){return(or=t((()=>{(function(e){function t(){let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``);return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}e.genUUID=t})(ar||={})})))()}function P(){return(P=t((()=>{ir(),or()})))()}var sr;function cr(){return(cr=t((()=>{(function(e){let t=e.NEWTON_ITERATIONS=4;e.NEWTON_MIN_SLOPE=.001,e.SUBDIVISION_PRECISION=1e-7;let n=e.SUBDIVISION_MAX_ITERATIONS=10,r=e.BEZIER_EASING_CACHE_SIZE=11,i=e.BEZIER_EASING_SAMPLE_STEP_SIZE=1/r;function a(e){return-e.p0+3*e.p1-3*e.p2+e.p3}function o(e){return 3*e.p0-6*e.p1+3*e.p2}function s(e){return-3*e.p0+3*e.p1}function c(e,t){return 3*a(e)*t*t+2*o(e)*t+s(e)}e.calcBezierSlope=c;function l(e,t){return((a(e)*t+o(e))*t+s(e))*t+e.p0}e.calcBezier=l;function u(e,t,r,i){let a=0,o=0;for(let s=0;s<n;s++)o=t+(r-t)/2,a=l(i,o),a>e?r=o:t=o;return o}function d(e,n,r){for(let i=0;i<t;i++){let t=c(n,r);if(t==0)return r;let i=l(n,r)-e;r-=i/t}return r}function f(e,t,n){e.p1=Math.max(e.p0,Math.min(e.p3,e.p1)),e.p2=Math.max(e.p0,Math.min(e.p3,e.p2));let a=0;for(let e=1;e<n.length&&(a=e-1,!(t<n[e]));e++);let o=a/(r-1),s=c(e,o)/(e.p3-e.p0);return s==0?o:s>.01?d(t,e,o):u(t,o,o+i,e)}e.getBezierTfromX=f})(sr||={})})))()}function lr(e,t,n,r){let i=Array(sr.BEZIER_EASING_CACHE_SIZE);for(let a=0;a<sr.BEZIER_EASING_CACHE_SIZE;++a)i[a]=sr.calcBezier({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a/(sr.BEZIER_EASING_CACHE_SIZE-1));return a=>a<=e.x?e.y:r.x<=a?r.y:sr.calcBezier({p0:e.y,p1:t.y,p2:n.y,p3:r.y},sr.getBezierTfromX({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a,i))}function ur(){return(ur=t((()=>{cr()})))()}var dr;function fr(){return(fr=t((()=>{(function(e){e.number=(e,t,n)=>e+(t-e)*n,e.vector=(e,t,n)=>e.lerp(t,n)})(dr||={})})))()}function pr(){return(pr=t((()=>{P(),ur(),fr()})))()}var mr;function hr(){return(hr=t((()=>{P(),mr=class extends rr{keyframes=[];cache={frame:NaN,value:NaN};frameStart;frameEnd;frameDuration;constructor(e){super(),this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes=[],e.forEach(e=>{this.addKeyFrame(e)}))}addKeyFrame(e){let t=0;for(let n=0;n<this.keyframes.length&&this.keyframes[n].coordinate.x<e.coordinate.x;n++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let n=0;n<this.keyframes.length;n++){let r=this.keyframes[n];if(e<r.coordinate.x){let i=this.keyframes[n-1];t=i?i.to(r,e):r.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t===null?0:(this.cache={frame:e,value:t},t)}}})))()}var gr;function _r(){return(_r=t((()=>{P(),M(),gr=class extends rr{name;curves;frameStart;frameEnd;frameDuration;updatedFrame=-1;value;constructor(e,t,n,r,i){super(),this.name=e||``,this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new A,t&&this.setFCurve(t,`x`),n&&this.setFCurve(n,`y`),r&&this.setFCurve(r,`z`),i&&this.setFCurve(i,`w`)}setFCurve(e,t){this.curves.set(t,e);let n=1/0,r=-1/0;this.curves.forEach(e=>{e.frameStart<n&&(n=e.frameStart),e.frameEnd>r&&(r=e.frameEnd)}),(n==-1/0||r==1/0)&&(n=0,r=1),this.frameStart=n,this.frameEnd=r,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(e){return this.curves.get(e)||null}setFrame(e){if(e==this.updatedFrame)return this;let t=this.curves.get(`x`),n=this.curves.get(`y`),r=this.curves.get(`z`),i=this.curves.get(`w`);return t&&(this.value.x=t.getValue(e)),n&&(this.value.y=n.getValue(e)),r&&(this.value.z=r.getValue(e)),i&&(this.value.w=i.getValue(e)),this.updatedFrame=e,this}}})))()}var vr;function yr(){return(yr=t((()=>{P(),ur(),vr=class extends rr{coordinate={x:0,y:0};handleLeft={x:0,y:0};handleRight={x:0,y:0};interpolation=`BEZIER`;easing=null;nextFrame=null;constructor(e,t,n,r){super(),this.set(e,t,n,r)}set(e,t,n,r){this.coordinate=e,this.handleLeft=t||e,this.handleRight=n||e,this.interpolation=r||`BEZIER`}getEasing(e,t){return e==`BEZIER`?lr(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):e==`CONSTANT`?()=>this.coordinate.y:e=>{let n=t.coordinate.y-this.coordinate.y;return e=(e-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+e*n}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}}})))()}var br;function xr(){return(xr=t((()=>{P(),hr(),_r(),yr(),br=class e extends rr{static gltfLoaderFactory=null;_engine;connection;frame;nodes;curveGroups;root;gltf;currentScene;constructor(e,t){super(),this._engine=e,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},t&&this.connect(t)}connect(e,t){}disconnect(){}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[n]=r}return t.buffer}async loadScene(t,n){this.currentScene=t,n&&(e.gltfLoaderFactory?await e.gltfLoaderFactory(this._engine).load(n).then(e=>{this.gltf=e,this.emit(`gltfLoaded`,[e])}):console.warn(`BLidge: gltfLoaderFactory not wired`)),await new Promise(e=>{setTimeout(()=>{e(null)},100)}),this.frame.start=t.frame.start,this.frame.end=t.frame.end,this.frame.fps=t.frame.fps,this.curveGroups=[],this.nodes=[];let r=Object.keys(t.animations);for(let e=0;e<r.length;e++){let n=r[e],i=new gr(n);t.animations[e].forEach(e=>{let t=new mr;t.set(e.k.map(e=>{let t={B:`BEZIER`,C:`CONSTANT`,L:`LINEAR`}[e[0]],n=e[1];return new vr({x:n[0],y:n[1]},n[2]!==void 0&&{x:n[2],y:n[3]}||void 0,n[4]!==void 0&&{x:n[4],y:n[5]}||void 0,t)})),i.setFCurve(t,e.axis)}),this.curveGroups.push(i)}this.nodes=[];let i=e=>{let t={name:``,uniforms:{}};e.material&&(t.name=e.material.name||``,t.uniforms=e.material.uniforms||{});let n={name:e.name,class:e.class,parent:e.parent,children:[],animations:e.animation||{},position:e.position||[0,0,0],rotation:e.rotation||[0,0,0],scale:e.scale||[1,1,1],material:t,type:e.type,visible:e.visible},r=e.param;return n.param=r&&`position`in r?{position:new Float32Array(this.binaryStringToArrayBuffer(atob(r.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(r.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(r.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(r.index)))}:r,e.children&&e.children.forEach(e=>{n.children.push(i(e))}),this.nodes.push(n),n};this.root=i(t.root),this.emit(`sync/scene`,[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(e){this.frame=e,this.emit(`sync/timeline`,[this.frame])}onOpen(e){}onMessage(e){}onClose(e){this.disconnect()}getCurveGroup(e){return this.curveGroups[e]}setFrame(e){this.onSyncTimeline({...this.frame,playing:!0,current:e})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(e=>{this.on(`gltfLoaded`,t=>{e(t)})})}dispose(){this.disconnect()}}})))()}var Sr;function Cr(){return(Cr=t((()=>{P(),Sr=class extends rr{uuid;initiator;fields_;constructor(){super(),this.uuid=ar.genUUID(),this.fields_=new Map,this.initiator=`script`}restoreUUID(e){this.uuid=e}serialize(e){e||={mode:`view`};let t={};return this.fields_.forEach((n,r)=>{let i=this.getFieldOpt(r);e.mode==`export`&&i&&i&&i.noExport||(t[r]=n.get(e))}),t}serializeToDirectory(){return(e=>{let t={type:`folder`,childs:{},opt:{}},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=this.getFieldOpt(i);if(!i)continue;let o=t,s=i.split(`/`);for(let e=0;e<s.length;e++){let t=s[e];t&&o.type!=`value`&&(o.childs[t]||(e==s.length-1?o.childs[t]={type:`value`,value:null,opt:a}:o.childs[t]={type:`folder`,childs:{},opt:a}),o=o.childs[t])}o.type==`value`&&(o.value=e[i])}return t})(this.serialize())}deserialize(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let r=t[n],i=this.fields_.get(r);i&&i.set(e[r])}}exportEditor(){this.serialize({mode:`export`})}field(e,t,n,r){let i=typeof n==`function`?n:void 0,a=typeof n==`object`&&n||r||{};i||(a.readOnly=!0,a.noExport=!0);let o=e.startsWith(`/`)?e.slice(1):e;this.fields_.set(o,{get:t,set:(t=>{i&&i(t),this.noticeField(e)}),opt:a})}fieldDir(e,t){let n=e;return this.field(n+`/`,()=>null,void 0,{...t,isFolder:!0}),{dir:e=>this.fieldDir(`${n}/${e}`),field:(e,t,r,i)=>{this.field(`${n}/${e}`,t,r,i)}}}removeField(e){let t=e.startsWith(`/`)?e.slice(1):e;this.fields_.delete(t)}setField(e,t){let n=this.fields_.get(e);if(!n)throw Error(`Unknown field path: ${e}`);n.set(t)}getField(e,t){let n=this.fields_.get(e);if(n)return t||={mode:`view`},n.get(t)}getFieldOpt(e){let t=this.fields_.get(e);if(t)return t.opt}noticeField(e){this.emit(`fields/update/`+e),this.emit(`fields/update`,[[e]])}}})))()}var wr;function Tr(){return(Tr=t((()=>{Cr(),wr=class extends Sr{disableEdit;order;_entity;_engine;_enabled;_tag;_disposed;constructor(e){super(),this.disableEdit=!1,this._entity=e.entity,this._engine=e.engine,this._enabled=!0,this._disposed=!1,this._tag=``,this.order=0,this.field(`enabled`,()=>this.enabled,e=>this.enabled=e,{hidden:!0,noExport:!0}),this.field(`tag`,()=>this.tag,e=>this._tag=e,{readOnly:!0,noExport:!0,hidden:e=>e==``})}get tag(){return this._tag}get entity(){return this._entity}get engine(){return this._engine}set enabled(e){this._enabled=e}get enabled(){return this._enabled}update(e){this.enabled&&this.updateImpl(e)}updateImpl(e){}postUpdate(e){this.enabled&&this.postUpdateImpl(e)}postUpdateImpl(e){}prepareRender(e){this.enabled&&this.prepareRenderImpl(e)}prepareRenderImpl(e){}commitFrame(e){this.enabled&&this.commitFrameImpl(e)}commitFrameImpl(e){}dispose(){this._disposed=!0,this.emit(`dispose`)}}})))()}var Er;function Dr(){return(Dr=t((()=>{M(),Cr(),Er=class extends Sr{vertCount;attributes;boundingBox;updateVersion;constructor(){super(),this.vertCount=0,this.attributes=new Map,this.boundingBox=null,this.updateVersion=0}setAttribute(e,t,n,r){return this.attributes.set(e,{array:t,size:n,opt:r}),this.updateVersion++,this.updateVertCount(),e===`position`&&this.computeBoundingBox(),this}getAttribute(e){return this.attributes.get(e)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((e,t)=>{t==`index`||e.opt&&e.opt.instanceDivisor||(this.vertCount=Math.min(e.array.length/e.size,this.vertCount))})}computeBoundingBox(){let e=this.attributes.get(`position`);if(!e){this.boundingBox=null;return}let t=e.array,n=new A(1/0,1/0,1/0),r=new A(-1/0,-1/0,-1/0);for(let e=0;e<t.length;e+=3){let i=t[e],a=t[e+1],o=t[e+2];i<n.x&&(n.x=i),a<n.y&&(n.y=a),o<n.z&&(n.z=o),i>r.x&&(r.x=i),a>r.y&&(r.y=a),o>r.z&&(r.z=o)}this.boundingBox={min:n,max:r}}requestUpdate(){this.updateVersion++}}})))()}var Or;function kr(){return(kr=t((()=>{Dr(),Or=class extends Er{constructor(e){super();let t=[],n=[],r=[],i=[],a=[],{width:o,height:s,depth:c,segmentsWidth:l,segmentsHeight:u,segmentsDepth:d}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...e},f=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:o,h:c,d:s,segW:l,segH:d},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:o,h:c,d:s,segW:l,segH:d}],p=0;for(let e of f){let o=e.normal,s=e.dir,c=e.up,l=e.segW,u=e.segH,d=e.w/2,f=e.h/2,m=e.d/2,h=e.w/l,g=e.h/u;for(let e=0;e<=u;e++)for(let _=0;_<=l;_++){let v=-d+_*h,y=-f+e*g,b=-m,x=_/l,S=e/u,C=v*-s[0]+y*c[0]+b*-o[0],ee=v*-s[1]+y*c[1]+b*-o[1],te=v*-s[2]+y*c[2]+b*-o[2];if(t.push(C,ee,te),n.push(...o),r.push(x,S),a.push(e/u*c[1]+Math.max(0,c[2])),e<u&&_<l){let t=p+e*(l+1)+_,n=p+(e+1)*(l+1)+_,r=p+(e+1)*(l+1)+(_+1),a=p+e*(l+1)+(_+1);i.push(t,n,a),i.push(n,r,a)}}p+=(l+1)*(u+1)}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`posY`,new Float32Array(a),1),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var Ar;function jr(){return(jr=t((()=>{M(),Dr(),Ar=class extends Er{constructor(e){super();let t=[],n=[],r=[],i=[],{height:a,radiusTop:o,radiusBottom:s,radSegments:c,heightSegments:l,caps:u}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...e};for(let e=0;e<=l+2;e++)for(let d=0;d<=c;d++){let f=Math.PI*2/c*d;if(e<=l){let u=1-e/l,p=(1-u)*o+u*s,m=Math.cos(f)*p,h=-(a/2)+a/l*e,g=Math.sin(f)*p;t.push(m,h,g),r.push(d/c,e/l);let _=new A(Math.cos(f),0,Math.sin(f)).normalize();if(n.push(_.x,_.y,_.z),e<l){let t=c+1;i.push(e*t+d,(e+1)*t+(d+1)%t,e*t+(d+1)%t,e*t+d,(e+1)*t+d,(e+1)*t+(d+1)%t)}}else{if(!u)continue;let p=e-l-1,m=p?o:s,h=Math.cos(f)*m,g=-(a/2)+a*p,_=Math.sin(f)*m;t.push(h,g,_),r.push((h+m)*.5/m,(_+m)*.5/m),n.push(0,-1+p*2,0);let v=(c+1)*(l+(p+1));d<=c-2&&(p==0?i.push(v,v+d,v+d+1):i.push(v,v+d+1,v+d))}}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var Mr;function Nr(){return(Nr=t((()=>{Dr(),Mr=class extends Er{constructor(e){super();let{width:t,height:n,widthSegments:r,heightSegments:i,floor:a}={width:1,height:1,widthSegments:1,heightSegments:1,...e},o=t/2,s=n/2,c=[],l=[],u=[],d=[];for(let e=0;e<=i;e++)for(let f=0;f<=r;f++){let p=f/r,m=e/i;if(a?(c.push(-o+t*p,0,s-n*m),l.push(0,1,0)):(c.push(-o+t*p,-s+n*m,0),l.push(0,0,1)),u.push(p,m),e>0&&f>0){let t=r+1,n=t*e+f,i=t*(e-1)+f-1;d.push(n,t*e+f-1,i,n,i,t*(e-1)+f)}}this.setAttribute(`position`,new Float32Array(c),3),this.setAttribute(`normal`,new Float32Array(l),3),this.setAttribute(`uv`,new Float32Array(u),2),this.setAttribute(`index`,new Uint16Array(d),1)}}})))()}var Pr;function Fr(){return(Fr=t((()=>{M(),Dr(),Pr=class extends Er{constructor(e){super();let t=[],n=[],r=[],i=[],{radius:a,widthSegments:o,heightSegments:s}={radius:.5,widthSegments:8,heightSegments:8,...e};for(let e=0;e<=s;e++){let c=e/s*Math.PI;for(let l=0;l<=o;l++){let u=l/o*Math.PI*2,d=Math.sin(c)*a,f=Math.cos(u)*d,p=-Math.cos(c)*a,m=-Math.sin(u)*d;t.push(f,p,m),r.push(l/o,e/s);let h=new A(f,p,m).normalize();if(n.push(h.x,h.y,h.z),l<o&&e<s){let t=o+1;i.push(e*t+l,e*t+(l+1)%t,(e+1)*t+(l+1)%t,e*t+l,(e+1)*t+(l+1)%t,(e+1)*t+l)}}}for(let e=0;e<i.length;e++)i[e]=Math.min(t.length/3-1,i[e]);this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var Ir;function Lr(){return(Lr=t((()=>{M(),Tr(),Ir=class extends wr{cameraType;fov;aspect;near;far;orthWidth;orthHeight;projectionMatrix;viewMatrix;projectionMatrixPrev;viewMatrixPrev;_historyInitialized;needsUpdateProjectionMatrix;displayOut;viewPort;dofParams;constructor(e){super(e),this.cameraType=`perspective`,this.viewMatrix=new j,this.projectionMatrix=new j,this.viewMatrixPrev=new j,this.projectionMatrixPrev=new j,this._historyInitialized=!1,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.dofParams={focusDistance:.5,kFilmHeight:.008,fNumber:.3};let t=()=>{this.needsUpdateProjectionMatrix=!0};this.field(`fov`,()=>this.fov,e=>{this.fov=e,t()}),this.field(`near`,()=>this.near,e=>{this.near=e,t()}),this.field(`far`,()=>this.far,e=>{this.far=e,t()}),this.field(`orthWidth`,()=>this.orthWidth,e=>{this.orthWidth=e,t()}),this.field(`orthHeight`,()=>this.orthHeight,e=>{this.orthHeight=e,t()}),this.field(`fNumber`,()=>this.dofParams.fNumber,e=>{this.dofParams.fNumber=e},{step:.05}),this._tag=`camera`}updateProjectionMatrix(){this.cameraType==`perspective`?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}updateImpl(e){if(this.displayOut){let t=e.resolution.x/e.resolution.y;this.aspect!==t&&(this.aspect=t,this.needsUpdateProjectionMatrix=!0)}}prepareRenderImpl(e){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix(),this._historyInitialized||=(this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix),!0)}commitFrameImpl(e){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}})))()}var Rr;function zr(){return(zr=t((()=>{M(),Lr(),Rr=class extends Ir{viewMatrixOffset;constructor(e){super(e),this.viewMatrixOffset=new An().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100,this.displayOut=!1}prepareRenderImpl(e){super.prepareRenderImpl(e),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}})))()}var Br;function Vr(){return(Vr=t((()=>{M(),zr(),Br=class extends Rr{lightType;color;intensity;castShadow;shadowMapSize;angle;blend;distance;decay;constructor(e){super(e),this.lightType=`spot`,this.cameraType=`perspective`,this.color=new A(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new A(1024,1024),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field(`intensity`,()=>this.intensity,e=>this.intensity=e),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}lookAt(e){this.entity.lookAt(e),this.entity.quaternion.multiply(new An().setFromEuler(new On(Math.PI/2)))}}})))()}var Hr,F;function Ur(){return(Ur=t((()=>{Tr(),Dr(),Hr=new Er,F=class extends wr{geometry;material;instanceCount;constructor(e){super(e);let t=e.args||{};this.geometry=t.geometry||Hr,this.material=t.material||null,this.instanceCount=t.instanceCount||1}}})))()}var Wr;function Gr(){return(Gr=t((()=>{M(),Tr(),kr(),jr(),Nr(),Fr(),Dr(),Lr(),Vr(),Ur(),Wr=class extends wr{node;rotationOffsetX;animations;uniforms;uniformCurves;transformAutoUpdate;_blidge;_lightComponent;constructor(e){super(e),this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=e.args.blidge,this.node=e.args.node,this.node.type==`camera`&&(this.rotationOffsetX=-Math.PI/2);let t=Object.keys(this.node.animations);for(let e=0;e<t.length;e++){let n=t[e];this.animations.set(n,this._blidge.getCurveGroup(this.node.animations[n]))}let n=Object.keys(this.node.material.uniforms);for(let e=0;e<n.length;e++){let t=n[e],r=this.node.material.uniforms[t],i=this._blidge.curveGroups[r];i&&(this.uniformCurves.set(t,i),this.uniforms[t]={type:`4fv`,value:i.value})}let r=this.entity;if(r.name=this.node.name,r.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),r.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},`YZX`),r.quaternion.updated=!1,r.euler.setFromQuaternion(r.quaternion),r.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type==`cube`){let e=r.addComponent(F),t=this.node.param;e.geometry=new Or({width:t.x,height:t.y,depth:t.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type==`sphere`){let e=r.addComponent(F),t=this.node.param;e.geometry=new Pr({radius:t.r,widthSegments:32,heightSegments:16})}else if(this.node.type==`cylinder`){let e=r.addComponent(F);e.geometry=new Ar}else if(this.node.type==`plane`){let e=r.addComponent(F),t=this.node.param;e.geometry=new Mr({width:t.x,height:t.y})}else if(this.node.type==`mesh`){let e=r.addComponent(F),t=this.node.param,n=new Er;n.setAttribute(`position`,t.position,3),n.setAttribute(`uv`,t.uv,2),n.setAttribute(`normal`,t.normal,3),n.setAttribute(`index`,t.index,3),e.geometry=n}else if(this.node.type==`gltf`){let e=r.addComponent(F);this._blidge.gltfPrm.then(t=>{let n=t.scene.findEntityByName(this.node.name);if(n){let t=n.getComponent(F);t&&(e.geometry=t.geometry,e.material||=t.material)}r.noticeEventParent(`update/blidge/scene`,[r])})}if(this.node.type==`camera`){let e=e=>{e.fov=this.node.param.fov,e.needsUpdateProjectionMatrix=!0},t=r.getComponentsByTag(`camera`)[0];t&&e(t);let n=t=>{t instanceof Ir&&e(t)};r.on(`componentAdded`,n),this.once(`dispose`,()=>{r.off(`componentAdded`,n)})}if(this.node.type==`light`){let e=this.node.param;this._lightComponent=r.addComponent(Br),this._lightComponent.deserialize({...e,lightType:e.type,color:new A().copy(e.color),castShadow:e.shadowMap})}r.visible=this.node.visible}updateImpl(e){if(!this._blidge||!this.node)return;let t=e.timeCode*this._blidge.frame.fps;if(this.animations.forEach(e=>{e.setFrame(t)}),this.transformAutoUpdate){let e=this.animations.get(`position`);if(e){let t=e.value;e.getFCurve(`x`)&&(this.entity.position.x=t.x),e.getFCurve(`y`)&&(this.entity.position.y=t.y),e.getFCurve(`z`)&&(this.entity.position.z=t.z)}let n=this.animations.get(`rotation`);if(n){let e={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},t=n.value;n.getFCurve(`x`)&&(e.x=t.x),n.getFCurve(`y`)&&(e.y=t.y),n.getFCurve(`z`)&&(e.z=t.z),this.entity.quaternion.setFromEuler({x:e.x+this.rotationOffsetX,y:e.y,z:e.z},`YZX`)}let r=this.animations.get(`scale`);if(r){let e=r.setFrame(t).value;r.getFCurve(`x`)&&(this.entity.scale.x=e.x),r.getFCurve(`y`)&&(this.entity.scale.y=e.y),r.getFCurve(`z`)&&(this.entity.scale.z=e.z)}}let n=this.animations.get(`hide`);if(n&&(this.entity.visible=n.value.x<.5),this._lightComponent){let e=this.animations.get(`color`);e&&this._lightComponent.color.copy(e.setFrame(t).value)}this.uniformCurves.forEach((e,n)=>{this.uniforms[n].value=e.setFrame(t).value})}}})))()}function Kr(){return(Kr=t((()=>{Tr(),Gr()})))()}function qr(){return(qr=t((()=>{Tr()})))()}var Jr;function Yr(){return(Yr=t((()=>{M(),Cr(),Jr=class extends Sr{name;position;euler;quaternion;scale;matrix;matrixWorld;matrixWorldPrev;_matrixWorldHistoryInitialized;autoMatrixUpdate;parent;children;components;componentsSorted;visible;userData;unresolvedComponents;_engine;constructor(e){super(),this._engine=e.engine,this.name=e.name??``,this.position=new A(0,0,0,1),this.euler=new On,this.quaternion=new An(0,0,0,1),this.scale=new A(1,1,1),this.matrix=new j,this.matrixWorld=new j,this.matrixWorldPrev=new j,this._matrixWorldHistoryInitialized=!1,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.unresolvedComponents=[],this.field(`name`,()=>this.name,e=>this.name=e),this.field(`position`,()=>this.position.getElm(`vec3`),e=>this.position.setFromArray(e),{format:{type:`vector`}}),this.field(`euler`,()=>this.euler.getElm(`vec3`),e=>this.euler.setFromArray(e),{format:{type:`vector`}}),this.field(`scale`,()=>this.scale.getElm(`vec3`),e=>this.scale.setFromArray(e),{format:{type:`vector`}}),this.field(`visible`,()=>this.visible,e=>this.visible=e,{hidden:!0}),this.field(`children`,()=>this.children.map(e=>e.uuid),{hidden:!0}),this.field(`components`,()=>{let e=[];return this.components.forEach(t=>e.push(t.uuid)),e},{hidden:!0})}get engine(){return this._engine}update(e){let t={...e};t.matrix=this.matrixWorld,this.updateImpl(e);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].update(t);this.autoMatrixUpdate&&this.updateMatrix();for(let e=0;e<this.children.length;e++)this.children[e].update(t)}updateImpl(e){}postUpdate(e){let t={...e,matrix:this.matrixWorld};for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].postUpdate(t);for(let e=0;e<this.children.length;e++)this.children[e].postUpdate(t)}prepareRender(e){let t={...e,matrix:this.matrixWorld};this._matrixWorldHistoryInitialized||=(this.matrixWorldPrev.copy(this.matrixWorld),!0);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].prepareRender(t);for(let e=0;e<this.children.length;e++)this.children[e].prepareRender(t)}commitFrame(e){let t={...e,matrix:this.matrixWorld};this.matrixWorldPrev.copy(this.matrixWorld);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].commitFrame(t);for(let e=0;e<this.children.length;e++)this.children[e].commitFrame(t)}add(e){e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),this.noticeField(`children`)}remove(e){this.children=this.children.filter(t=>t.uuid!=e.uuid),this.noticeField(`children`)}updateMatrix(e){this.parent&&e&&this.parent.updateMatrix(!0);let t=this.parent?this.parent.matrixWorld:new j;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(t)}updateMatrixRecursive(e){this.autoMatrixUpdate&&this.updateMatrix(e);for(let e=0;e<this.children.length;e++)this.children[e].updateMatrixRecursive()}decomposeMatrix(e){e.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(e){this.decomposeMatrix(this.matrix.clone().multiply(e))}lookAt(e){let t=e.clone(),n=new A(0,1,0,0);if(this.parent){let e=this.parent.matrixWorld.clone().inverse();t.applyMatrix4AsPosition(e),n.applyMatrix4AsDirection(e).normalize()}let r=new j().lookAt(this.position,t,n);this.quaternion.setFromMatrix(r),this.updateMatrix()}addComponent(e,...t){this.removeComponent(e);let[n]=t,r=new e({entity:this,engine:this._engine,args:n||{}});return this.components.set(e,r),this.componentsSorted.push(r),this.componentsSorted.sort((e,t)=>e.order-t.order),this.noticeField(`components`),this.emit(`componentAdded`,[r]),r}removeComponent(e){let t=this.components.get(e);t&&t.dispose(),this.components.delete(e),this.componentsSorted=this.componentsSorted.filter(e=>e!==t),this.noticeField(`components`),t&&this.emit(`componentRemoved`,[t])}removeComponentByUUID(e){for(let t of this.components){let n=t[0],r=t[1];if(r.uuid===e)return r.dispose(),this.components.delete(n),this.componentsSorted=this.componentsSorted.filter(e=>e!==r),this.noticeField(`components`),this.emit(`componentRemoved`,[r]),r}}getComponent(e){return this.components.get(e)}getComponentByUUID(e){for(let t of this.components.values())if(t.uuid===e)return t;return null}getComponentByTag(e){for(let t of this.components.values())if(t.tag===e)return t;return null}getComponentsByTag(e){let t=[];return this.components.forEach(n=>{n.tag==e&&t.push(n)}),t}findEntityByName(e){if(this.name==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByName(e);if(n)return n}}findEntityByUUID(e){if(this.uuid==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByUUID(e);if(n)return n}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(e){let t=`/`+this.name;return e&&e.uuid==this.uuid||this.parent&&(t=this.parent.getScenePath(e)+t),t}noticeEventChilds(e,t){this.emit(e,t);for(let n=0;n<this.children.length;n++)this.children[n].noticeEventChilds(e,t)}noticeEventParent(e,t){this.emit(e,t),this.parent&&this.parent.noticeEventParent(e,t)}traverse(e){e(this),this.children.forEach(t=>t.traverse(e))}isVisibleTraverse(){return this.visible?!this.parent||this.parent.isVisibleTraverse():!1}dispose(){this.emit(`dispose`),this.parent&&this.parent.remove(this),this.components.forEach(e=>{e.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(e=>{e.disposeRecursive()}),this.children=[]}}})))()}function Xr(){return(Xr=t((()=>{P(),M()})))()}function Zr(){return(Zr=t((()=>{M(),Dr(),Xr()})))()}var Qr;function $r(){return($r=t((()=>{Dr(),Qr=class extends Er{constructor(e){super();let{innerRadius:t,outerRadius:n,thetaSegments:r,phiSegments:i,extrude:a}={innerRadius:.4,outerRadius:.5,thetaSegments:12,phiSegments:1,extrude:0,...e},o=r+1,s=[],c=[],l=[],u=[],d=(r+1)*(i+1);for(let e=0;e<(a==0?1:2);e++){let f=e==0?-1:1,p=a==0?0:a/2*f;for(let a=0;a<i+1;a++){let m=t+(n-t)*(a/i);for(let t=0;t<=r;t++){let n=t/r*Math.PI*2,h=Math.cos(n)*m,g=Math.sin(n)*m;if(s.push(h,g,p),l.push(t/r,a/i),c.push(0,0,1*f),a>0&&t<r){let n=d*e+a*o+t;e==0?u.push(n,n-o,n+1,n+1,n-o,n+1-o):u.push(n,n+1,n-o,n+1,n+1-o,n-o)}}}}if(a!=0){for(let e=0;e<2;e++){let o=e==0?t:n;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let u=n/r*Math.PI*2,d=Math.cos(u)*o,f=Math.sin(u)*o;s.push(d,f,(-.5+t)*a),l.push(n/r,t/i),e==0?c.push(-Math.cos(u),-Math.sin(u),0):c.push(Math.cos(u),Math.sin(u),0)}}let e=d*2;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let i=e+n+r*2*t,a=n==r-1?-r:0;t==0?u.push(i,i+r,i+r+1+a,i,i+r+1+a,i+1+a):u.push(i,i+r+1+a,i+r,i,i+1+a,i+r+1+a)}}this.setAttribute(`position`,new Float32Array(s),3),this.setAttribute(`normal`,new Float32Array(c),3),this.setAttribute(`uv`,new Float32Array(l),2),this.setAttribute(`index`,new Uint16Array(u),1)}}})))()}var ei,ti;function ni(){return(ni=t((()=>{ei=new Map,ti=(e,t)=>ei.get(e)||(ei.set(e,t),t)})))()}var ri;function ii(){return(ii=t((()=>{M(),ri=class{origin;direction;constructor(e,t){this.origin=e||new A,this.direction=t||new A(0,0,-1)}setFromCamera(e,t,n){let r=new A(e.x,e.y,-1,1).applyMatrix4(t).applyMatrix4(n);r.x/=r.w,r.y/=r.w,r.z/=r.w;let i=new A(e.x,e.y,1,1).applyMatrix4(t).applyMatrix4(n);return i.x/=i.w,i.y/=i.w,i.z/=i.w,this.origin.set(r.x,r.y,r.z),this.direction.set(i.x-r.x,i.y-r.y,i.z-r.z).normalize(),this}intersectAABB(e,t){let n=1/this.direction.x,r=1/this.direction.y,i=1/this.direction.z,a=(e.x-this.origin.x)*n,o=(t.x-this.origin.x)*n,s=Math.min(a,o),c=Math.max(a,o);if(a=(e.y-this.origin.y)*r,o=(t.y-this.origin.y)*r,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),a=(e.z-this.origin.z)*i,o=(t.z-this.origin.z)*i,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),c<0||s>c)return null;let l=s>=0?s:c;return{distance:l,point:new A(this.origin.x+this.direction.x*l,this.origin.y+this.direction.y*l,this.origin.z+this.direction.z*l)}}intersectTriangle(e,t,n){let r=1e-8,i=t.x-e.x,a=t.y-e.y,o=t.z-e.z,s=n.x-e.x,c=n.y-e.y,l=n.z-e.z,u=this.direction.y*l-this.direction.z*c,d=this.direction.z*s-this.direction.x*l,f=this.direction.x*c-this.direction.y*s,p=i*u+a*d+o*f;if(p>-1e-8&&p<r)return null;let m=1/p,h=this.origin.x-e.x,g=this.origin.y-e.y,_=this.origin.z-e.z,v=m*(h*u+g*d+_*f);if(v<0||v>1)return null;let y=g*o-_*a,b=_*i-h*o,x=h*a-g*i,S=m*(this.direction.x*y+this.direction.y*b+this.direction.z*x);if(S<0||v+S>1)return null;let C=m*(s*y+c*b+l*x);return C>r?{distance:C,point:new A(this.origin.x+this.direction.x*C,this.origin.y+this.direction.y*C,this.origin.z+this.direction.z*C)}:null}}})))()}var ai;function oi(){return(oi=t((()=>{M(),Ur(),ii(),ai=class{ray;_v0;_v1;_v2;constructor(){this.ray=new ri,this._v0=new A,this._v1=new A,this._v2=new A}setFromCamera(e,t){let n=t.getComponentsByTag(`camera`)[0];if(!n)return;let r=n.projectionMatrix.clone().inverse(),i=n.viewMatrix.clone().inverse();this.ray.setFromCamera(e,r,i)}intersectEntities(e){let t=[];return e.traverse(e=>{if(!e.visible)return;let n=e.getComponent(F);if(!n)return;let r=this.intersectMesh(e,n);r&&t.push(...r)}),t.sort((e,t)=>e.distance-t.distance),t}intersectMesh(e,t){let n=t.geometry,r=n.boundingBox;if(!r)return null;let i=e.matrixWorld.clone().inverse(),a=new ri;a.origin.copy(this.ray.origin),a.origin.w=1,a.origin.applyMatrix4(i),a.origin.x/=a.origin.w,a.origin.y/=a.origin.w,a.origin.z/=a.origin.w;let o=this.ray.origin.clone().add(this.ray.direction);if(o.w=1,o.applyMatrix4(i),o.x/=o.w,o.y/=o.w,o.z/=o.w,a.direction.set(o.x-a.origin.x,o.y-a.origin.y,o.z-a.origin.z).normalize(),!a.intersectAABB(r.min,r.max))return null;let s=this.intersectTriangles(a,n);if(!s)return null;let c=s.point.clone();c.w=1,c.applyMatrix4(e.matrixWorld),c.x/=c.w,c.y/=c.w,c.z/=c.w;let l=c.x-this.ray.origin.x,u=c.y-this.ray.origin.y,d=c.z-this.ray.origin.z;return[{entity:e,distance:Math.sqrt(l*l+u*u+d*d),point:c}]}intersectTriangles(e,t){let n=t.getAttribute(`position`);if(!n)return null;let r=n.array,i=t.getAttribute(`index`),a=i?i.array:null,o=Math.floor((a?a.length:t.vertCount)/3),s=null;for(let t=0;t<o;t++){let n=(a?a[t*3+0]:t*3+0)*3,i=(a?a[t*3+1]:t*3+1)*3,o=(a?a[t*3+2]:t*3+2)*3;this._v0.set(r[n],r[n+1],r[n+2]),this._v1.set(r[i],r[i+1],r[i+2]),this._v2.set(r[o],r[o+1],r[o+2]);let c=e.intersectTriangle(this._v0,this._v1,this._v2);c&&(!s||c.distance<s.distance)&&(s=c)}return s}}})))()}var si;function ci(){return(ci=t((()=>{(function(e){let t=e.assign=(e,...t)=>{for(let n=0;n<t.length;n++)t[n]!=null&&Object.assign(e,t[n]);return e};e.merge=(...e)=>t({},...e)})(si||={})})))()}function li(){return(li=t((()=>{pr(),cr(),ur(),hr(),_r(),yr(),xr(),Tr(),Gr(),Kr(),Lr(),zr(),Vr(),qr(),Ur(),Yr(),Dr(),kr(),Zr(),jr(),Nr(),$r(),Fr(),Cr(),Xr(),ni(),ii(),oi(),ci()})))()}var ui;function di(){return(di=t((()=>{M(),Tr(),ui=class extends wr{_resolution;_postProcesses;constructor(e){super(e),this._postProcesses=[],this._resolution=new A}get postProcesses(){return this._postProcesses}add(e){return this.postProcesses.push(e),e.resize(this._resolution),e}remove(e){let t=this._postProcesses.indexOf(e);t>-1&&this._postProcesses.splice(t,1)}resize(e){(this._resolution.x!=e.x||this._resolution.y!=e.y)&&(this._resolution.copy(e),this.resizePostProcesses())}resizePostProcesses(){this.postProcesses.forEach(e=>{e.resize(this._resolution)})}}})))()}function fi(){return(fi=t((()=>{})))()}function pi(){return(pi=t((()=>{})))()}var mi;function hi(){return(hi=t((()=>{Cr(),fi(),pi(),mi=class extends Sr{name;vert;frag;defines;uniforms;useLight;depthTest;depthWrite;cullFace;drawType;blending;renderOrder;visibilityFlag;programCache;constructor(e){super(),e||={},this.name=e.name||``,this.visibilityFlag={},this.setVisibility(e.phase||[`shadowMap`,`deferred`]),this.useLight=e.useLight===void 0||e.useLight,this.depthTest=e.depthTest===void 0||e.depthTest,this.cullFace=e.cullFace!==void 0&&e.cullFace,this.depthWrite=e.depthWrite===void 0||e.depthWrite,this.drawType=e.drawType||`TRIANGLES`,this.blending=e.blending||`NORMAL`,this.renderOrder=e.renderOrder??0,this.vert=e.vert||`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
uniform mat4 uModelMatrix;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform mat4 uNormalMatrix;\r
\r
uniform mat4 uModelMatrixPrev;\r
uniform mat4 uModelViewMatrix;\r
uniform mat4 uViewMatrixPrev;\r
uniform mat4 uProjectionMatrixPrev;\r
\r
out vec2 vUv;\r
out vec3 vViewNormal;\r
out vec3 vNormal;\r
out vec3 vMVPosition;\r
out vec3 vMVPPosition;\r
out vec3 vPos;\r
\r
out vec2 vVelocity;\r
\r
layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
layout ( location = 2 ) in vec3 normal;\r
\r
#ifdef TF_MODELER\r
	out vec3 o_position;\r
	out vec3 o_normal;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;\r
\r
void main( void ) {\r
\r
	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;\r
	#ifdef TF_MODELER\r
		o_position = outPos;\r
		o_normal = outNormal;\r
		return;\r
#endif\r
\r
vec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\r
vec4 mvPosition = uViewMatrix * modelPosition;\r
gl_Position = uProjectionMatrix * mvPosition;\r
\r
vec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\r
vec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\r
vec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r
\r
vUv = outUv;\r
vViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\r
vNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\r
vPos = modelPosition.xyz;\r
vMVPosition = mvPosition.xyz;\r
vMVPPosition = gl_Position.xyz / gl_Position.w;\r
\r
vVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\r
vVelocity *= 0.2;\r
	\r
}`,this.frag=e.frag||`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;\r
\r
void main( void ) {\r
\r
	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;\r
	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif\r
\r
}`,this.defines=e.defines||{},this.uniforms=e.uniforms||{},this.programCache={}}setVisibility(e){this.visibilityFlag={shadowMap:e.indexOf(`shadowMap`)>-1,deferred:e.indexOf(`deferred`)>-1,forward:e.indexOf(`forward`)>-1,ui:e.indexOf(`ui`)>-1,envMap:e.indexOf(`envMap`)>-1,postprocess:e.indexOf(`postprocess`)>-1}}requestUpdate(){this.programCache={}}}})))()}var gi;function _i(){return(_i=t((()=>{Cr(),gi=class extends Sr{name;enabled;_passes;constructor(e){super();let t=e||{};this.name=t.name||``,this.enabled=!0,this._passes=e&&e.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(e=>e.enabled)}get output(){for(let e=this._passes.length-1;e>=0;e--){let t=this._passes[e];if(!t.passThrough&&t.enabled)return t.renderTarget}return null}resize(e){if(this._passes)for(let t=0;t<this._passes.length;t++)this._passes[t].resize(e)}dispose(){this.emit(`dispose`)}}})))()}function vi(){return(vi=t((()=>{})))()}function yi(){return(yi=t((()=>{})))()}var I;function bi(){return(bi=t((()=>{M(),Zn(),hi(),vi(),yi(),I=class extends mi{enabled;renderTarget;backBufferOverride;clearColor;clearDepth;resolutionRatio;passThrough;resolution;resolutionInv;viewPort;_fixedResolution;constructor(e,t){super({...t,frag:t.frag||`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
\r
uniform sampler2D uBackBuffer0;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
in vec2 vUv;\r
\r
void main( void ) {\r
\r
	outColor = texture( uBackBuffer0, vUv );\r
	outColor.w = 1.0;\r
\r
}`,vert:t.vert||`layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
\r
out vec2 vUv;\r
\r
void main( void ) {\r
\r
	vec3 pos = position;\r
	gl_Position = vec4( pos.xy, 0.0, 1.0 );\r
	vUv = uv;\r
\r
}`}),this.enabled=!0,this._fixedResolution=t.fixedResotluion?t.fixedResotluion.clone():null,this.resolution=new A,this.resolutionInv=new A,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:`2fv`},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:`2fv`},this.renderTarget=t.renderTarget===void 0?e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]):t.renderTarget,this.clearColor=t.clearColor??null,this.clearDepth=t.clearDepth??null,this.depthTest=t.depthTest!==void 0&&t.depthTest,this.resolutionRatio=t.resolutionRatio||1,this.passThrough=t.passThrough??!1,this.viewPort=t.viewPort||null,this.backBufferOverride=t.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(e){this._fixedResolution=e,this.resize(e||new A)}onAfterRender(){}resize(e){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(e).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(e){this.renderTarget=e,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}})))()}var xi;function Si(){return(Si=t((()=>{Yn(),M(),_i(),bi(),xi=class extends Vn{material;_renderer;_resolution;_postProcess;_frameBuffer;constructor(e,t){let n=e.backend,r=n.gl;super(r),this._renderer=e,this._resolution=t.resolution||new A(1024,1024),this.setting({wrapS:r.REPEAT,wrapT:r.REPEAT,magFilter:r.LINEAR,minFilter:r.LINEAR}),this._frameBuffer=new Un(r).setTexture([this]).setSize(this._resolution),this.material=new I(n,{...t,renderTarget:this._frameBuffer}),this._postProcess=new gi({passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}},xi.__docgenInfo={description:``,methods:[],displayName:`TexProcedural`}})))()}var Ci;function wi(){return(wi=t((()=>{Ci=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}

uniform sampler2D uBackBuffer0;
uniform sampler2D uPMREMBackBuffer;
uniform samplerCube uEnvMap;
uniform float uRoughness;
uniform float uTimeEF;
layout (location = 0) out vec4 outColor;

in vec2 vUv;

// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
\r
float random(vec2 p){\r
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
// https://www.shadertoy.com/view/4djSRW\r
\r
vec3 hash(vec3 p3)\r
{\r
	p3 = fract(p3 * vec3(.1031, .1030, .0973));\r
  p3 += dot(p3, p3.yxz+33.33);\r
  return fract((p3.xxy + p3.yxx)*p3.zyx);\r
\r
}
// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15\r
\r
float getPmremFace( vec3 direction ) {\r
\r
	vec3 absDirection = abs( direction );\r
\r
	float face = - 1.0;\r
\r
	if ( absDirection.x > absDirection.z ) {\r
\r
		if ( absDirection.x > absDirection.y )\r
\r
			face = direction.x > 0.0 ? 0.0 : 3.0;\r
\r
		else\r
\r
			face = direction.y > 0.0 ? 1.0 : 4.0;\r
\r
	} else {\r
\r
		if ( absDirection.z > absDirection.y )\r
\r
			face = direction.z > 0.0 ? 2.0 : 5.0;\r
\r
		else\r
\r
			face = direction.y > 0.0 ? 1.0 : 4.0;\r
\r
	}\r
\r
	return face;\r
\r
}\r
\r
// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L44\r
\r
vec2 getPmremUV( vec3 direction, float face ) {\r
\r
	vec2 uv;\r
\r
	if ( face == 0.0 ) {\r
\r
		uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x\r
\r
	} else if ( face == 1.0 ) {\r
\r
		uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y\r
\r
	} else if ( face == 2.0 ) {\r
\r
		uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z\r
\r
	} else if ( face == 3.0 ) {\r
\r
		uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x\r
\r
	} else if ( face == 4.0 ) {\r
\r
		uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y\r
\r
	} else {\r
\r
		uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z\r
\r
	}\r
\r
	return 0.5 * ( uv + 1.0 );\r
\r
}\r
\r
vec3 getPmremDir( vec2 uv, float face ) {\r
\r
	vec3 dir = vec3( 0.0 );\r
\r
	if ( face == 0.0 ) {\r
\r
		vec2 yz = ( vec2( uv.y, uv.x ) - 0.5 ) * 2.0;\r
		\r
		dir = vec3( 1.0, yz );\r
\r
	} else if( face == 1.0 ) {\r
\r
		vec2 xz = ( vec2( - uv.x, -uv.y ) + 0.5 ) * 2.0;\r
		\r
		dir = vec3( xz.x, 1.0, xz.y );\r
		\r
	} else if( face == 2.0 ) {\r
\r
		vec2 xy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( xy, 1.0 );\r
		\r
	} else if( face == 3.0 ) {\r
\r
		vec2 zy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( -1.0, zy.y, zy.x );\r
		\r
	} else if( face == 4.0 ) {\r
\r
		vec2 xz = ( vec2( - uv.x + 0.5 , uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( xz.x, -1.0, xz.y );\r
		\r
	} else if( face == 5.0 ) {\r
\r
		vec2 xy = ( vec2( uv.x, uv.y ) - 0.5 ) * 2.0;\r
		\r
		dir = vec3( xy, -1.0 );\r
		\r
	}\r
\r
	return normalize( dir );\r
\r
}\r
\r
\r
//https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L132\r
\r
#define MAXMIP 5.0\r
\r
float roughnessToMip( float roughness ) {\r
\r
	float mip = 0.0;\r
\r
	mip = roughness * ( MAXMIP - 1.0 );\r
\r
	return mip;\r
\r
}\r
\r
vec3 getPmremMip( sampler2D envMap, vec3 direction, float mip ) {\r
\r
	float face = getPmremFace( direction );\r
	vec2 uv = getPmremUV( direction, face );\r
\r
	vec2 faceRes = vec2(textureSize( envMap, 0 )) * pow( 0.5, floor( mip ) );\r
	float s = 2.0;\r
	uv *= faceRes - 2.0 * s;\r
	uv += 1.0 * s;\r
	uv /= faceRes;\r
\r
	uv.x += mod( face, 3.0 );\r
	uv.y += floor( face / 3.0) ;\r
	\r
	uv.y *= 0.5;\r
	uv.y *= 0.5;\r
	uv.x /= 3.0;\r
\r
	float scale = 1.0 - pow( 2.0, -floor(mip) );\r
	uv.y *= 1.0 - scale;\r
	uv.x *= 1.0 - scale;\r
	uv.y += scale;\r
\r
	vec4 col = textureGrad( envMap, uv, vec2( 0.0 ), vec2( 0.0 )  );\r
\r
	return col.xyz / col.w;\r
\r
}\r
\r
vec3 getPmrem( sampler2D envMap, vec3 direction, float roughness ) {\r
\r
	float mip = roughnessToMip( roughness );\r
	float mipF = fract( mip );\r
	float mipInt = floor( mip );\r
\r
	vec3 color0 = getPmremMip( envMap, direction, mipInt );\r
\r
	if ( mipF == 0.0 ) {\r
\r
		return color0;\r
\r
	} else {\r
\r
		vec3 color1 = getPmremMip( envMap, direction, mipInt + 1.0 );\r
\r
		return mix( color0, color1, mipF );\r
\r
	}\r
\r
}

// https://www.shadertoy.com/view/4lscWj

vec2 Hammersley(float i, float numSamples)
{   
    uint b = uint(i);
    
    b = (b << 16u) | (b >> 16u);
    b = ((b & 0x55555555u) << 1u) | ((b & 0xAAAAAAAAu) >> 1u);
    b = ((b & 0x33333333u) << 2u) | ((b & 0xCCCCCCCCu) >> 2u);
    b = ((b & 0x0F0F0F0Fu) << 4u) | ((b & 0xF0F0F0F0u) >> 4u);
    b = ((b & 0x00FF00FFu) << 8u) | ((b & 0xFF00FF00u) >> 8u);
    
    float radicalInverseVDC = float(b) * 2.3283064365386963e-10;
    
    return vec2((i / numSamples), radicalInverseVDC);
} 

vec3 SampleHemisphere_Cosinus(float i, float numSamples)
{
    vec2 xi = Hammersley(i, numSamples);
    
    float phi      = xi.y * 2.0 * PI;
    float cosTheta = sqrt(1.0 - xi.x);
    float sinTheta = sqrt(1.0 - cosTheta * cosTheta);
     
    return vec3(cos(phi) * sinTheta, cosTheta, sin(phi) * sinTheta);
}

// https://qiita.com/emadurandal/items/b2ae09c5cc1b3da821c8

vec3 ImportanceSampleCosineWeighted(vec2 Xi, vec3 N)
{
    float r = sqrt(Xi.x);
	// r = 1.0;
    float phi = 2.0 * PI * Xi.y;

    vec3 H;
    H.x = r * cos(phi);
    H.y = r * sin(phi);
    H.z = sqrt(1.0-Xi.x);

    vec3 UpVector = abs(N.z) < 0.999 ? vec3(0,0,1) : vec3(1,0,0);
    vec3 TangentX = normalize( cross(UpVector, N) );
    vec3 TangentY = cross ( N, TangentX );
    // Tangent to world space
    return TangentX * H.x + TangentY * H.y + N * H.z;
}

// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf

vec3 ImportanceSampleGGX( vec2 Xi, float Roughness, vec3 N ) {
	float a = Roughness * Roughness;
	float Phi = 2.0 * PI * Xi.x;
	float CosTheta = sqrt( (1.0 - Xi.y) / ( 1.0 + (a*a - 1.0) * Xi.y ) );
	float SinTheta = sqrt( 1.0 - CosTheta * CosTheta );
	vec3 H;
	H.x = SinTheta * cos( Phi );
	H.y = SinTheta * sin( Phi );
	H.z = CosTheta;

	vec3 UpVector = abs(N.z) < 0.999 ? vec3(0,0,1) : vec3(1,0,0);
	vec3 TangentX = normalize( cross( UpVector, N ) );
	vec3 TangentY = cross( N, TangentX );
	// Tangent to world space
	return TangentX * H.x + TangentY * H.y + N * H.z;
}

vec3 PrefilterEnvMap( float Roughness, vec3 R )
{
	vec3 N = R;
	vec3 V = R;
	vec3 PrefilteredColor = vec3( 0.0 );
	float TotalWeight = 0.0;

	for( int i = 0; i < NUM_SAMPLES; i++ ) {
		
		vec2 Xi = Hammersley( float(i), float( NUM_SAMPLES ) );

		Xi.x += random( vec2( vUv + uTimeEF * 0.1 ) );
		Xi.y += random( vec2( vUv + uTimeEF * 0.1 + 1.0 ) );
		Xi = fract( Xi );
		
		vec3 H = ImportanceSampleGGX( Xi, Roughness, N );
		// vec3 H = ImportanceSampleCosineWeighted(Xi, N);
		vec3 L = 2.0 * dot( V, H ) * H - V;
		float NoL = saturate( dot( N, L ) );

		if( NoL > 0.0 ) {
			PrefilteredColor += texture(uEnvMap , L).rgb * NoL;
			TotalWeight += NoL;
		}

	}
	
	return PrefilteredColor / max( TotalWeight, 1.0 );
}

void main( void ) {

	vec4 sum = vec4( 0.0 );
	vec2 res = vec2( textureSize( uPMREMBackBuffer, 0 ) );

	float face = floor( vUv.x * 3.0 ) + floor( vUv.y * 2.0 ) * 3.0;
	vec2 fuv = fract( vUv * vec2( 3.0, 2.0 ) );


	vec2 uv = fuv;
	uv -= 0.5;
	uv *= 1.0 + 1.0 / res * 2.0;
	uv += 0.5;

	sum.xyz += PrefilterEnvMap(uRoughness, getPmremDir(uv, face));

	outColor = vec4( mix( texture( uPMREMBackBuffer, vUv ).xyz, sum.xyz, 0.04  ), 1.0 );

}`})))()}var Ti;function Ei(){return(Ei=t((()=>{P(),M(),L(),Zn(),wi(),Ti=class extends rr{postprocess;resolution;renderTarget;pmremPasses;swapBuffers;timeUniforms;constructor(e,t){super();let n=t.resolution,r={uTimeEF:{value:0,type:`1f`}},i=e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA,magFilter:N.LINEAR,minFilter:N.LINEAR,wrapS:N.CLAMP_TO_EDGE,wrapT:N.CLAMP_TO_EDGE})]),a=[],o=[],s=[],c=0;for(let l=0;l<5;l++){let u=1/2**l,d=n.x*u,f=n.y*u*.5,p=new A(0,c,d,f);c+=f,s.push({rt1:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA})]),rt2:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA})])});let m=1/4*l,h=new I(e,{renderTarget:s[l].rt1,frag:Ci,uniforms:si.merge(r,{uRoughness:{value:m,type:`1f`},uEnvMap:{value:t.input,type:`1i`},uPMREMBackBuffer:{value:s[l].rt2.textures,type:`1i`},uRenderCount:{value:1,type:`1f`}}),defines:{NUM_SAMPLES:Math.floor(2**(l+1))}});h.resize(new A(d,f));let g=new I(e,{renderTarget:i,viewPort:p,passThrough:!0});g.resize(n),a.push(h,g),o.push(h)}this.postprocess=new gi({passes:a}),this.postprocess.passes[0].backBufferOverride=i.textures,this.resolution=n,this.renderTarget=i,this.pmremPasses=o,this.swapBuffers=s,this.timeUniforms=r}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let e=0;e<this.pmremPasses.length;e++){let t=this.pmremPasses[e],n=this.swapBuffers[e],r=n.rt1;n.rt1=n.rt2,n.rt2=r,t.setRendertarget(n.rt1),t.uniforms.uPMREMBackBuffer.value=n.rt2.textures}}resize(e){}}})))()}var Di;function Oi(){return(Oi=t((()=>{Di=class{backend;pool;constructor(e){this.backend=e,this.pool=new Map}get(e,t,n){let r=e+t,i=this.pool.get(r);if(i!==void 0&&i.program)return i;let a=this.backend.createProgram();return n&&(a.name=n),a.setShader(e,t),this.pool.set(r,a),a}}})))()}var ki;function Ai(){return(Ai=t((()=>{ki=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 uViewMatrix;\r
	mat4 uProjectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
	uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}\r
// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15\r
\r
float getPmremFace( vec3 direction ) {\r
\r
	vec3 absDirection = abs( direction );\r
\r
	float face = - 1.0;\r
\r
	if ( absDirection.x > absDirection.z ) {\r
\r
		if ( absDirection.x > absDirection.y )\r
\r
			face = direction.x > 0.0 ? 0.0 : 3.0;\r
\r
		else\r
\r
			face = direction.y > 0.0 ? 1.0 : 4.0;\r
\r
	} else {\r
\r
		if ( absDirection.z > absDirection.y )\r
\r
			face = direction.z > 0.0 ? 2.0 : 5.0;\r
\r
		else\r
\r
			face = direction.y > 0.0 ? 1.0 : 4.0;\r
\r
	}\r
\r
	return face;\r
\r
}\r
\r
// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L44\r
\r
vec2 getPmremUV( vec3 direction, float face ) {\r
\r
	vec2 uv;\r
\r
	if ( face == 0.0 ) {\r
\r
		uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x\r
\r
	} else if ( face == 1.0 ) {\r
\r
		uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y\r
\r
	} else if ( face == 2.0 ) {\r
\r
		uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z\r
\r
	} else if ( face == 3.0 ) {\r
\r
		uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x\r
\r
	} else if ( face == 4.0 ) {\r
\r
		uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y\r
\r
	} else {\r
\r
		uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z\r
\r
	}\r
\r
	return 0.5 * ( uv + 1.0 );\r
\r
}\r
\r
vec3 getPmremDir( vec2 uv, float face ) {\r
\r
	vec3 dir = vec3( 0.0 );\r
\r
	if ( face == 0.0 ) {\r
\r
		vec2 yz = ( vec2( uv.y, uv.x ) - 0.5 ) * 2.0;\r
		\r
		dir = vec3( 1.0, yz );\r
\r
	} else if( face == 1.0 ) {\r
\r
		vec2 xz = ( vec2( - uv.x, -uv.y ) + 0.5 ) * 2.0;\r
		\r
		dir = vec3( xz.x, 1.0, xz.y );\r
		\r
	} else if( face == 2.0 ) {\r
\r
		vec2 xy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( xy, 1.0 );\r
		\r
	} else if( face == 3.0 ) {\r
\r
		vec2 zy = ( vec2( - uv.x + 0.5, uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( -1.0, zy.y, zy.x );\r
		\r
	} else if( face == 4.0 ) {\r
\r
		vec2 xz = ( vec2( - uv.x + 0.5 , uv.y - 0.5 ) ) * 2.0;\r
		\r
		dir = vec3( xz.x, -1.0, xz.y );\r
		\r
	} else if( face == 5.0 ) {\r
\r
		vec2 xy = ( vec2( uv.x, uv.y ) - 0.5 ) * 2.0;\r
		\r
		dir = vec3( xy, -1.0 );\r
		\r
	}\r
\r
	return normalize( dir );\r
\r
}\r
\r
\r
//https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L132\r
\r
#define MAXMIP 5.0\r
\r
float roughnessToMip( float roughness ) {\r
\r
	float mip = 0.0;\r
\r
	mip = roughness * ( MAXMIP - 1.0 );\r
\r
	return mip;\r
\r
}\r
\r
vec3 getPmremMip( sampler2D envMap, vec3 direction, float mip ) {\r
\r
	float face = getPmremFace( direction );\r
	vec2 uv = getPmremUV( direction, face );\r
\r
	vec2 faceRes = vec2(textureSize( envMap, 0 )) * pow( 0.5, floor( mip ) );\r
	float s = 2.0;\r
	uv *= faceRes - 2.0 * s;\r
	uv += 1.0 * s;\r
	uv /= faceRes;\r
\r
	uv.x += mod( face, 3.0 );\r
	uv.y += floor( face / 3.0) ;\r
	\r
	uv.y *= 0.5;\r
	uv.y *= 0.5;\r
	uv.x /= 3.0;\r
\r
	float scale = 1.0 - pow( 2.0, -floor(mip) );\r
	uv.y *= 1.0 - scale;\r
	uv.x *= 1.0 - scale;\r
	uv.y += scale;\r
\r
	vec4 col = textureGrad( envMap, uv, vec2( 0.0 ), vec2( 0.0 )  );\r
\r
	return col.xyz / col.w;\r
\r
}\r
\r
vec3 getPmrem( sampler2D envMap, vec3 direction, float roughness ) {\r
\r
	float mip = roughnessToMip( roughness );\r
	float mipF = fract( mip );\r
	float mipInt = floor( mip );\r
\r
	vec3 color0 = getPmremMip( envMap, direction, mipInt );\r
\r
	if ( mipF == 0.0 ) {\r
\r
		return color0;\r
\r
	} else {\r
\r
		vec3 color1 = getPmremMip( envMap, direction, mipInt + 1.0 );\r
\r
		return mix( color0, color1, mipF );\r
\r
	}\r
\r
}\r
\r
// uniforms\r
\r
uniform sampler2D sampler0; // position.xyz, emission.x\r
uniform sampler2D sampler1; // normal.xyz, emission.y\r
uniform sampler2D sampler2; // albedo, \r
uniform sampler2D sampler3; // roughness, metallic, normalSelect, envSelect, \r
uniform sampler2D sampler4; // velocity.xy, 0.0, emission.z\r
\r
uniform sampler2D uSSAOTexture;\r
uniform sampler2D uLightShaftTexture;\r
uniform sampler2D uEnvMap;\r
\r
uniform vec3 uColor;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uCameraMatrix;\r
uniform vec3 uCameraPosition;\r
\r
// -------------------------\r
\r
// varyings\r
\r
in vec2 vUv;\r
\r
// out\r
\r
layout (location = 0) out vec4 glFragOut0;\r
layout (location = 1) out vec4 glFragOut1;\r
\r
void main( void ) {\r
\r
	float occlusion = texture( uSSAOTexture, vUv ).x;\r
\r
	vec4 tex0 = texture( sampler0, vUv );\r
	vec4 tex1 = texture( sampler1, vUv );\r
	vec4 tex2 = texture( sampler2, vUv );\r
	vec4 tex3 = texture( sampler3, vUv );\r
	vec4 tex4 = texture( sampler4, vUv );\r
\r
	vec3 normal = tex1.xyz;\r
	vec3 color = tex2.xyz;\r
	float roughness = tex3.x;\r
	float metallic = tex3.y;\r
	vec3 emission = vec3( tex0.w, tex1.w, tex4.w );\r
	float envMapIntensity= tex3.w;\r
\r
	Geometry geo = Geometry(\r
		tex0.xyz,\r
		normal,\r
		0.0,\r
		normalize( uCameraPosition - tex0.xyz ),\r
		vec3( 0.0 ),\r
		occlusion\r
	);\r
	\r
	Material mat = Material(\r
		color,\r
		roughness,\r
		metallic,\r
		emission,\r
		mix( color, vec3( 0.0, 0.0, 0.0 ), metallic ),\r
		mix( vec3( 1.0, 1.0, 1.0 ), color, metallic ),\r
		envMapIntensity\r
	);\r
	vec3 outColor = vec3( 0.0 );\r
\r
	// lighting\r
\r
	// required common, light,\r
\r
float shadow;\r
\r
// direcitonalLight\r
\r
Light light;\r
LightCamera lightCamera;\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	DirectionalLight dLight;\r
\r
	#pragma loop_start NUM_LIGHT_DIR\r
\r
		dLight = directionalLight[ LOOP_INDEX ];\r
		light.direction = dLight.direction;\r
		light.color = dLight.color;\r
\r
		// shadow\r
\r
		#if LOOP_INDEX < NUM_SHADOWMAP_DIR\r
\r
			shadow = getShadowSmooth( tex0.xyz, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0001 );\r
\r
		#else\r
\r
			shadow = 1.0;\r
\r
		#endif\r
		\r
		// lighting\r
\r
		outColor.xyz += RE( geo, mat, light ) * shadow;\r
\r
	#pragma loop_end\r
\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0\r
\r
	SpotLight sLight;\r
	\r
	vec3 spotDirection;\r
	float spotDistance;\r
	float spotAngleCos;\r
	float spotAttenuation;\r
	vec3 radiance;\r
\r
	#pragma loop_start NUM_LIGHT_SPOT\r
\r
		// shadow\r
\r
		#if LOOP_INDEX < NUM_SHADOWMAP_SPOT\r
\r
			shadow = getShadowSmooth( geo.position, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.001 );\r
\r
		#else\r
\r
			shadow = 1.0;\r
\r
		#endif\r
\r
		// lighting\r
\r
		sLight = uSpotLight[ LOOP_INDEX ];\r
\r
		spotDirection = normalize(sLight.position - geo.position);\r
		spotDistance = length( sLight.position - geo.position );\r
		spotAngleCos = dot( sLight.direction, spotDirection );\r
		spotAttenuation = 0.0;\r
\r
		if( spotAngleCos > sLight.angle ) {\r
\r
			spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );\r
\r
		}\r
\r
		light.direction = spotDirection;\r
		light.color = sLight.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay );\r
\r
		radiance = RE( geo, mat, light );\r
		outColor.xyz += shadow * radiance;\r
\r
	#pragma loop_end\r
\r
#endif\r
\r
	// env\r
\r
	vec3 refDir = reflect( -geo.viewDir, geo.normal );\r
float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
float EF = mix( fresnel( dNV ), 1.0, mat.metallic );\r
outColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;\r
outColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );\r
	\r
	// occlusion\r
\r
	outColor.xyz *= max( 0.0, 1.0 - geo.occulusion * 1.5 );\r
	\r
	// emission\r
\r
	outColor.xyz += mat.emission;\r
\r
	\r
	// light shaft\r
	\r
	outColor.xyz += texture( uLightShaftTexture, vUv ).xyz;\r
\r
	glFragOut0 = glFragOut1 = vec4( max( vec3( 0.0 ), outColor.xyz ), 1.0 );\r
\r
}`})))()}var ji;function Mi(){return(Mi=t((()=>{ji=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 uViewMatrix;\r
	mat4 uProjectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
	uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}

// uniforms

uniform sampler2D uLightShaftBackBuffer;
uniform sampler2D uDepthTexture;

uniform float uTimeEF;
uniform mat4 uCameraMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform vec3 uCameraPosition;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

const float MARCH_LENGTH = 60.0;
const float MARCH = 16.0;

// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
\r
float random(vec2 p){\r
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
// https://www.shadertoy.com/view/4djSRW\r
\r
vec3 hash(vec3 p3)\r
{\r
	p3 = fract(p3 * vec3(.1031, .1030, .0973));\r
  p3 += dot(p3, p3.yxz+33.33);\r
  return fract((p3.xxy + p3.yxx)*p3.zyx);\r
\r
}

void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec2 screen = vUv * 2.0 - 1.0;
	mat4 cp = uCameraMatrix * uProjectionMatrixInverse;
	
	float depth = texture( uDepthTexture, vUv ).x;
	vec4 rp = cp * vec4( screen, depth * 2.0 - 1.0, 1.0 );

	vec3 rayPos = uCameraPosition;
	vec3 rayDir = normalize( ( cp * vec4( screen, 1.0, 1.0 ) ).xyz );
	vec3 rayEndPos = rp.xyz / rp.w;

	if( rayEndPos.x + rayEndPos.y + rayEndPos.z == 0.0 ) {
		
		rayEndPos = rayPos + rayDir * 100.0;

	}
	
	vec3 diff = rayEndPos - rayPos;
	float rayLength = length( diff );

	float rayStepLength = MARCH_LENGTH / MARCH;;
	vec3 rayStep = rayDir * rayStepLength;;

	float totalRayLength = random(vUv + fract(uTimeEF)) * 1.0 * rayStepLength;
	rayPos += rayDir * totalRayLength;

	for( int i = 0; i < int( MARCH ); i ++ ) {

		rayPos += rayStep;
		totalRayLength += rayStepLength;

		if( totalRayLength >= rayLength ) break;

		float shadow;

		#if NUM_LIGHT_DIR > 0 

			DirectionalLight dLight;

			#pragma loop_start NUM_LIGHT_DIR

				dLight = directionalLight[ LOOP_INDEX ];

				#if LOOP_INDEX < NUM_SHADOWMAP_DIR

					shadow = getShadow( rayPos, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0 );

				#else

					shadow = 1.0;

				#endif

				lightShaftSum += dLight.color * shadow * rayStepLength * 0.0025;

			#pragma loop_end
		
		#endif

		// spotlight

		#if NUM_LIGHT_SPOT > 0

			SpotLight sLight;
			
			vec3 spotDirection;
			float spotDistance;
			float spotAngleCos;
			float spotAttenuation;

			#pragma loop_start NUM_LIGHT_SPOT

				sLight = uSpotLight[ LOOP_INDEX ];

				spotDirection = normalize(sLight.position - rayPos);
				spotDistance = length( sLight.position - rayPos );
				spotAngleCos = dot( sLight.direction, spotDirection );
				spotAttenuation = 0.0;

				if( spotAngleCos > sLight.angle * -1.0 ) {

					spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );

				}

				#if LOOP_INDEX < NUM_SHADOWMAP_SPOT

					shadow = getShadow( rayPos, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.0 );

				#else

					shadow = 1.0;

				#endif

				lightShaftSum += sLight.color * 
					shadow * 
					spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay * 1.9 ) *
					rayStepLength * 0.02;

			#pragma loop_end
				
		#endif

	}

	lightShaftSum *= 0.4;

	outColor = vec4( mix( texture( uLightShaftBackBuffer, vUv ).xyz, lightShaftSum, 0.6), 1.0 );

}`})))()}var Ni;function Pi(){return(Pi=t((()=>{Ni=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}

// uniforms

uniform vec2 uPPPixelSize;
uniform sampler2D uNormalTexture;
uniform sampler2D uPosTexture;
uniform sampler2D uSelectorTexture;

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 normalTex = texture( uNormalTexture, vUv );
	vec4 positionTex = texture( uPosTexture, vUv );

	vec3 center = texture( uPosTexture, vUv ).xyz;
	vec3 right = texture( uPosTexture, vUv + vec2( uPPPixelSize.x, 0.0 ) ).xyz;
	vec3 top = texture( uPosTexture, vUv + vec2( 0.0, uPPPixelSize.y ) ).xyz;
	vec3 left = texture( uPosTexture, vUv + vec2( -uPPPixelSize.x, 0.0 ) ).xyz;
	vec3 bottom = texture( uPosTexture, vUv + vec2( 0.0, -uPPPixelSize.y ) ).xyz;
	vec3 dx1 = right - center;
    vec3 dy1 = top - center;
	vec3 dx2 = -(left - center);
    vec3 dy2 = -(bottom - center);

	vec3 calcNormal = normalize(cross(
		length(dx1) < length(dx2) ? dx1 : dx2,
		length(dy1) < length(dy2) ? dy1 : dy2
	));

	vec4 tex3 = texture( uSelectorTexture, vUv );

	vec3 normal = mix( normalTex.xyz, calcNormal, tex3.z);

	outColor = vec4( normal, normalTex.w );

}`})))()}var Fi;function Ii(){return(Ii=t((()=>{Fi=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 uViewMatrix;\r
	mat4 uProjectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
	uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}
// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
\r
float random(vec2 p){\r
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
// https://www.shadertoy.com/view/4djSRW\r
\r
vec3 hash(vec3 p3)\r
{\r
	p3 = fract(p3 * vec3(.1031, .1030, .0973));\r
  p3 += dot(p3, p3.yxz+33.33);\r
  return fract((p3.xxy + p3.yxx)*p3.zyx);\r
\r
}

// uniforms

uniform sampler2D uSSAOBackBuffer;
uniform sampler2D uDepthTexture;

uniform sampler2D sampler0; // position, depth
uniform sampler2D sampler1; // normal, emissionIntensity

uniform float uTimeEF;
uniform mat4 uCameraMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform vec3 uCameraPosition;

#define SAMPLE 16
uniform vec3 uSSAOKernel[16];

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec3 rayPos = texture( sampler0, vUv ).xyz;
	vec4 rayViewPos = uViewMatrix * vec4(rayPos, 1.0);
	vec4 depthRayPos = uViewMatrix * vec4(rayPos, 1.0);

	if( rayPos.x + rayPos.y + rayPos.z == 0.0 || length(rayPos - uCameraPosition) > 100.0 ) return;

	vec3 normal = texture( sampler1, vUv ).xyz;
	float occlusion = 0.0;

	float dist = 0.5;
	float objectDepth = 0.2;

	vec2 seed = vUv + uTimeEF;
	vec3 random = vec3( random( vec2( seed ) ), random( vec2( seed + 0.25 ) ), random( vec2( seed + 0.5 ) ) ) * 2.0 - 1.0;

	vec3 tangent = normalize(random - normal * dot(random,normal));
	vec3 bitangent = cross( tangent, normal );
	mat3 kernelMatrix = mat3(tangent, bitangent, normal);

	for( int i = 0; i < SAMPLE; i ++ ) {

		float seed = uTimeEF * 1.0 + float( i );
		
		vec3 sampleOffset = kernelMatrix * uSSAOKernel[i];
		vec3 samplePos = rayPos + sampleOffset * dist;

		vec4 depthCoord = (uProjectionMatrix * uViewMatrix * vec4( samplePos, 1.0 ) );
		depthCoord.xy /= depthCoord.w;
		depthCoord.xy = depthCoord.xy * 0.5 + 0.5;

		vec4 samplerPos = (uViewMatrix * vec4(texture( sampler0, depthCoord.xy ).xyz, 1.0));
		vec4 sampleViewPos = uViewMatrix * vec4( samplePos, 1.0 );

		if( sampleViewPos.z < samplerPos.z && sampleViewPos.z >= samplerPos.z - objectDepth ) {

			occlusion += 1.0 - pow( length( sampleOffset ), 2.0);

		}
		
	}

	occlusion /= float( SAMPLE );

	outColor = vec4( mix( texture( uSSAOBackBuffer, vUv ).xyz, vec3( occlusion ), 0.5 ), 1.0 );

}`})))()}var Li;function Ri(){return(Ri=t((()=>{Li=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 uViewMatrix;\r
	mat4 uProjectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
	uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}
// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
\r
float random(vec2 p){\r
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
// https://www.shadertoy.com/view/4djSRW\r
\r
vec3 hash(vec3 p3)\r
{\r
	p3 = fract(p3 * vec3(.1031, .1030, .0973));\r
  p3 += dot(p3, p3.yxz+33.33);\r
  return fract((p3.xxy + p3.yxx)*p3.zyx);\r
\r
}

// uniforms

uniform sampler2D uSSAOTexture;
uniform vec2 uPPPixelSize;

uniform sampler2D uNormalTexture;
uniform sampler2D uDepthTexture;

uniform float uWeights[SSAOSAMPLE];

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

const float alpha = 32.0;
const float beta = 0.25;

float getWeight( vec2 uv, vec3 normalBasis, float depthBasis ) {

	vec3 normalOffset = texture( uNormalTexture, uv ).xyz;
	float depthOffset = texture( uDepthTexture, uv ).w;
	float bilateralWeight = pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, alpha ) * pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), beta );

	return bilateralWeight;

}

void main( void ) {

	float occlusion = 0.0;

	vec3 normalBasis = texture( uNormalTexture, vUv ).xyz;
	float depthBasis = texture( uDepthTexture, vUv ).w;

	vec2 direction;

	#ifdef IS_VIRT

		direction = vec2( 0.0, 1.0 );
	
	#else

		direction = vec2( 1.0, 0.0 );

	#endif

	float weight = 0.0;

	occlusion += texture( uSSAOTexture, vUv ).x * uWeights[0];
	weight += uWeights[0];
	
	for(int i = 1; i < SSAOSAMPLE; i++){

		vec2 offset = float( i ) * direction;
		offset *= uPPPixelSize * 1.0;

		vec2 uvOffsetP = vUv + offset;
		vec2 uvOffsetN = vUv - offset;

		float wP = getWeight( uvOffsetP, normalBasis, depthBasis ) * uWeights[i];
		float wN = getWeight( uvOffsetN, normalBasis, depthBasis ) * uWeights[i];
		
		occlusion += texture( uSSAOTexture, uvOffsetP ).x * wP;
		occlusion += texture( uSSAOTexture, uvOffsetN ).x * wN;

		weight += wP + wN;

	}

	occlusion /= weight;
	outColor = vec4( vec3( occlusion ), 1.0 );

}`})))()}var zi,Bi;function Vi(){return(Vi=t((()=>{P(),M(),L(),Zn(),Ai(),Mi(),Pi(),Ii(),Ri(),zi=e=>{let t=[];for(let n=0;n<e;n++){let r=new A;r.x=Math.random()*2-1,r.y=Math.random()*2-1,r.z=n/e*.95+.05,r.normalize(),r.multiply(n/e*.95+.05),t.push(...r.getElm(`vec3`))}return t},Bi=class extends rr{postprocess;normalSelector_;lightShaft;rtLightShaft1;rtLightShaft2;ssao;rtSSAO1;rtSSAO2;ssaoBlur;ssaoBlurV;shading;constructor(e){super();let t=e.backend,n=new I(t,{name:`normalSelector`,frag:Ni,renderTarget:null,uniforms:si.merge({uNormalTexture:{value:null,type:`1i`},uPosTexture:{value:null,type:`1i`},uSelectorTexture:{value:null,type:`1i`}}),passThrough:!0}),r=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),i=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),a=new I(t,{name:`lightShaft`,frag:ji,renderTarget:r,uniforms:si.merge({uLightShaftBackBuffer:{value:i.textures[0],type:`1i`},uDepthTexture:{value:null,type:`1i`}}),resolutionRatio:.5,passThrough:!0}),o=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),s=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),c=new I(t,{name:`ssao`,frag:Fi,renderTarget:ti(`ssao`,o),uniforms:si.merge({uSSAOBackBuffer:{value:s.textures[0],type:`1i`},uSSAOKernel:{value:zi(16),type:`3fv`}}),resolutionRatio:.5,passThrough:!0}),l=si.merge({uSSAOTexture:{value:s.textures[0],type:`1i`},uDepthTexture:{value:null,type:`1i`},uNormalTexture:{value:null,type:`1i`},uWeights:{type:`1fv`,value:Mn.gaussWeights(8)}}),u=new I(t,{name:`ssaoBlur/h`,frag:ti(`ssaoBlur`,Li),uniforms:l,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:8}}),d=new I(t,{name:`ssaoBlur/v`,frag:ti(`ssaoBlur`,Li),uniforms:si.merge(l,{uSSAOTexture:{value:u.renderTarget.textures[0],type:`1i`}}),defines:{SSAOSAMPLE:8,IS_VIRT:``},resolutionRatio:1,passThrough:!0}),f=new I(t,{name:`deferredShading`,frag:ti(`deferredShading`,ki),uniforms:si.merge({uLightShaftTexture:{value:null,type:`1i`},uSSAOTexture:{value:d.renderTarget.textures[0],type:`1i`},uSSAOResolutionInv:{value:c.resolutionInv,type:`2fv`},uEnvMap:{value:e.envMap,type:`1i`}})});this.postprocess=new gi({passes:[n,a,c,u,d,f]}),this.shading=f,this.lightShaft=a,this.ssao=c,this.rtSSAO1=o,this.rtSSAO2=s,this.ssaoBlur=u,this.ssaoBlurV=d,this.rtLightShaft1=r,this.rtLightShaft2=i,this.normalSelector_=n;let p=e.renderTarget;for(let e=0;e<p.gBuffer.textures.length;e++){let t=p.gBuffer.textures[e];e===1&&(t=p.normalBuffer.textures[0]),f.uniforms[`sampler`+e]=c.uniforms[`sampler`+e]={type:`1i`,value:t}}u.uniforms.uDepthTexture.value=p.gBuffer.textures[0],a.uniforms.uDepthTexture.value=p.gBuffer.depthTexture,f.renderTarget=p.shadingBuffer,n.renderTarget=p.normalBuffer,n.uniforms.uNormalTexture.value=p.gBuffer.textures[1],n.uniforms.uPosTexture.value=p.gBuffer.textures[0],n.uniforms.uSelectorTexture.value=p.gBuffer.textures[3],l.uNormalTexture.value=p.normalBuffer.textures[0]}update(){let e=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=e,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],e=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=e,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setPassEnabled(e){e.ssao!==void 0&&(this.ssao.enabled=e.ssao,this.ssaoBlur.enabled=e.ssao,this.ssaoBlurV.enabled=e.ssao,e.ssao||(this.rtSSAO1.clear(),this.rtSSAO2.clear(),this.ssaoBlur.renderTarget&&this.ssaoBlur.renderTarget.clear(),this.ssaoBlurV.renderTarget&&this.ssaoBlurV.renderTarget.clear())),e.lightShaft!==void 0&&(this.lightShaft.enabled=e.lightShaft,e.lightShaft||(this.rtLightShaft1.clear(),this.rtLightShaft2.clear()))}resize(e){this.postprocess.resize(e)}dispose(){this.postprocess.dispose(),this.rtLightShaft1.dispose(),this.rtLightShaft2.dispose(),this.rtSSAO1.dispose(),this.rtSSAO2.dispose()}}})))()}var Hi;function Ui(){return(Ui=t((()=>{Hi=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
\r
uniform sampler2D uBackBuffer0;\r
uniform sampler2D uBloomTexture[4];\r
\r
uniform vec3 uCameraPosition;\r
uniform float uCameraNear;\r
uniform float uCameraFar;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
//=================================================================================================\r
//\r
//  Baking Lab\r
//  by MJP and David Neubelt\r
//  http://mynameismjp.wordpress.com/\r
//\r
//  All code licensed under the MIT license\r
//\r
//=================================================================================================\r
\r
// The code in this file was originally written by Stephen Hill (@self_shadow), who deserves all\r
// credit for coming up with this fit and implementing it. Buy him a beer next time you see him. :)\r
\r
// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT\r
\r
const mat3 ACESInputMat = mat3(\r
	0.59719, 0.07600, 0.02840,\r
	0.35458,  0.90834, 0.13383,\r
	0.04823, 0.01566, 0.83777\r
);\r
\r
// ODT_SAT => XYZ => D60_2_D65 => sRGB\r
const mat3 ACESOutputMat = mat3( \r
	1.60475,  -0.10208,  -0.00327,\r
	-0.53108, 1.10813, -0.07276,\r
	-0.07367,  -0.00605, 1.07602\r
);\r
\r
vec3 RRTAndODTFit(vec3 v)\r
{\r
    vec3 a = v * (v + 0.0245786f) - 0.000090537f;\r
    vec3 b = v * (0.983729f * v + 0.4329510f) + 0.238081f;\r
    return a / b;\r
}\r
\r
vec3 ACESFitted(vec3 color)\r
{\r
    color = ACESInputMat * color;\r
\r
    // Apply RRT and ODT\r
    color = RRTAndODTFit(color);\r
\r
    color = ACESOutputMat * color;\r
\r
    // Clamp to [0, 1]\r
    color = clamp(color, 0.0, 1.0 );\r
\r
    return color;\r
}\r
\r
void main( void ) {\r
\r
    vec3 col = texture( uBackBuffer0, vUv ).xyz;\r
\r
    col = ACESFitted( col );\r
\r
	outColor = vec4( col, 1.0 );\r
\r
}`})))()}var Wi;function Gi(){return(Gi=t((()=>{Wi=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
\r
uniform sampler2D uCocTex;\r
uniform vec4 uParams;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
// const int BOKEH_SAMPLE = 16;\r
// const vec2 kDiskKernel[BOKEH_SAMPLE] = vec2[](\r
//     vec2(0,0),\r
//     vec2(0.54545456,0),\r
//     vec2(0.16855472,0.5187581),\r
//     vec2(-0.44128203,0.3206101),\r
//     vec2(-0.44128197,-0.3206102),\r
//     vec2(0.1685548,-0.5187581),\r
//     vec2(1,0),\r
//     vec2(0.809017,0.58778524),\r
//     vec2(0.30901697,0.95105654),\r
//     vec2(-0.30901703,0.9510565),\r
//     vec2(-0.80901706,0.5877852),\r
//     vec2(-1,0),\r
//     vec2(-0.80901694,-0.58778536),\r
//     vec2(-0.30901664,-0.9510566),\r
//     vec2(0.30901712,-0.9510565),\r
//     vec2(0.80901694,-0.5877853)\r
// );\r
\r
#define BOKEH_SAMPLE 43\r
vec2 kDiskKernel[ BOKEH_SAMPLE ] = vec2[](\r
    vec2(0,0),\r
    vec2(0.36363637,0),\r
    vec2(0.22672357,0.28430238),\r
    vec2(-0.08091671,0.35451925),\r
    vec2(-0.32762504,0.15777594),\r
    vec2(-0.32762504,-0.15777591),\r
    vec2(-0.08091656,-0.35451928),\r
    vec2(0.22672352,-0.2843024),\r
    vec2(0.6818182,0),\r
    vec2(0.614297,0.29582983),\r
    vec2(0.42510667,0.5330669),\r
    vec2(0.15171885,0.6647236),\r
    vec2(-0.15171883,0.6647236),\r
    vec2(-0.4251068,0.53306687),\r
    vec2(-0.614297,0.29582986),\r
    vec2(-0.6818182,0),\r
    vec2(-0.614297,-0.29582983),\r
    vec2(-0.42510656,-0.53306705),\r
    vec2(-0.15171856,-0.66472363),\r
    vec2(0.1517192,-0.6647235),\r
    vec2(0.4251066,-0.53306705),\r
    vec2(0.614297,-0.29582983),\r
    vec2(1,0),\r
    vec2(0.9555728,0.2947552),\r
    vec2(0.82623875,0.5633201),\r
    vec2(0.6234898,0.7818315),\r
    vec2(0.36534098,0.93087375),\r
    vec2(0.07473,0.9972038),\r
    vec2(-0.22252095,0.9749279),\r
    vec2(-0.50000006,0.8660254),\r
    vec2(-0.73305196,0.6801727),\r
    vec2(-0.90096885,0.43388382),\r
    vec2(-0.98883086,0.14904208),\r
    vec2(-0.9888308,-0.14904249),\r
    vec2(-0.90096885,-0.43388376),\r
    vec2(-0.73305184,-0.6801728),\r
    vec2(-0.4999999,-0.86602545),\r
    vec2(-0.222521,-0.9749279),\r
    vec2(0.07473029,-0.99720377),\r
    vec2(0.36534148,-0.9308736),\r
    vec2(0.6234897,-0.7818316),\r
    vec2(0.8262388,-0.56332),\r
    vec2(0.9555729,-0.29475483)\r
);\r
\r
// Fragment shader: Bokeh filter with disk-shaped kernels\r
void main( void ) {\r
\r
	float _MaxCoC = uParams.y;\r
	float _RcpMaxCoC = uParams.z;\r
	vec2 _MainTex_TexelSize = vec2( 1.0 ) / vec2( textureSize( uCocTex, 0 ) );\r
	float _RcpAspect = _MainTex_TexelSize.x / _MainTex_TexelSize.y;\r
	// sampler2D _MainTex = uCocTex;\r
\r
    vec4 samp0 = texture(uCocTex, vUv);\r
\r
    vec4 bgAcc = vec4(0.0); // Background: far field bokeh\r
    vec4 fgAcc = vec4(0.0); // Foreground: near field bokeh\r
\r
    for (int si = 0; si < BOKEH_SAMPLE; si++)\r
    {\r
        vec2 disp = kDiskKernel[si] * _MaxCoC;\r
        float dist = length(disp);\r
\r
        vec2 duv = vec2(disp.x * _RcpAspect, disp.y);\r
        vec4 samp = texture(uCocTex, vUv + duv);\r
\r
        // BG: Compare CoC of the current sample and the center sample\r
        // and select smaller one.\r
        float bgCoC = max(min(samp0.a, samp.a), 0.0);\r
\r
        // Compare the CoC to the sample distance.\r
        // Add a small margin to smooth out.\r
        float margin = _MainTex_TexelSize.y * 2.0;\r
        float bgWeight = clamp((bgCoC   - dist + margin ) / margin, 0.0, 1.0);\r
        float fgWeight = clamp((-samp.a - dist + margin ) / margin, 0.0, 1.0);\r
\r
        // Cut influence from focused areas because they're darkened by CoC\r
        // premultiplying. This is only needed for near field.\r
        fgWeight *= step(_MainTex_TexelSize.y, -samp.a);\r
\r
        // Accumulation\r
        bgAcc += vec4(samp.rgb, 1.0) * bgWeight;\r
        fgAcc += vec4(samp.rgb, 1.0) * fgWeight;\r
    }\r
\r
    // Get the weighted average.\r
    bgAcc.rgb /= bgAcc.a + (bgAcc.a == 0.0 ? 1.0 : 0.0 ); // zero-div guard\r
    fgAcc.rgb /= fgAcc.a + (fgAcc.a == 0.0 ? 1.0 : 0.0 );\r
\r
    // BG: Calculate the alpha value only based on the center CoC.\r
    // This is a rather aggressive approximation but provides stable results.\r
    bgAcc.a = smoothstep(_MainTex_TexelSize.y, _MainTex_TexelSize.y * 2.0, samp0.a);\r
\r
    // FG: Normalize the total of the weights.\r
    fgAcc.a *= PI / float(BOKEH_SAMPLE);\r
\r
    // Alpha premultiplying\r
    vec3 rgb = vec3( 0.0 );\r
    rgb = mix(rgb, bgAcc.rgb, clamp(bgAcc.a, 0.0, 1.0));\r
    rgb = mix(rgb, fgAcc.rgb, clamp(fgAcc.a, 0.0, 1.0));\r
\r
    // Combined alpha value\r
    float alpha = (1.0 - clamp(bgAcc.a, 0.0, 1.0)) * (1.0 - clamp(fgAcc.a, 0.0, 1.0));\r
\r
    outColor = vec4(rgb, alpha);\r
}`})))()}var Ki;function qi(){return(qi=t((()=>{Ki=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
\r
uniform sampler2D uBackBuffer0;\r
uniform sampler2D uGbufferPos;\r
uniform vec4 uParams;\r
uniform mat4 uProjectionMatrixInverse;\r
uniform mat4 uViewMatrix;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
float sampleDepth( sampler2D posTex, vec2 uv ) {\r
\r
	vec4 depth = uViewMatrix * vec4( texture( posTex, uv ).xyz, 1.0 );\r
	\r
	return depth.z * -1.0;\r
	\r
}\r
\r
//  https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Prefilter.cginc\r
\r
// Max between three components\r
float max3(vec3 xyz) { return max(xyz.x, max(xyz.y, xyz.z)); }\r
\r
// Fragment shader: Downsampling, prefiltering and CoC calculation\r
void main( void ) {\r
\r
	float _Distance = uParams.x;\r
	float _MaxCoC = uParams.y;\r
	float _RcpMaxCoC = uParams.z;\r
	float _LensCoeff = uParams.w;\r
\r
	// Sample source colors.\r
	vec2 mainTexSize = vec2( 1.0 ) / vec2( textureSize( uBackBuffer0, 0 ) );\r
	vec3 duv = mainTexSize.xyx * vec3(0.5, 0.5, -0.5);\r
	vec3 c0 = texture(uBackBuffer0, vUv - duv.xy).rgb;\r
	vec3 c1 = texture(uBackBuffer0, vUv - duv.zy).rgb;\r
	vec3 c2 = texture(uBackBuffer0, vUv + duv.zy).rgb;\r
	vec3 c3 = texture(uBackBuffer0, vUv + duv.xy).rgb;\r
\r
	// Sample linear depths.\r
	float d0 = sampleDepth(uGbufferPos, vUv - duv.xy);\r
	float d1 = sampleDepth(uGbufferPos, vUv - duv.zy);\r
	float d2 = sampleDepth(uGbufferPos, vUv + duv.zy);\r
	float d3 = sampleDepth(uGbufferPos, vUv + duv.xy);\r
	float d4 = sampleDepth(uGbufferPos, vUv);\r
	vec4 depths = vec4(d4, d4, d4, d4);\r
\r
	// Calculate the radiuses of CoCs at these sample points.\r
	vec4 cocs = (depths - _Distance) * _LensCoeff / depths;\r
	cocs = clamp(cocs, -_MaxCoC, _MaxCoC);\r
\r
	// Premultiply CoC to reduce background bleeding.\r
	vec4 weights = clamp(abs(cocs) * _RcpMaxCoC, 0.0, 1.0 );\r
\r
	// #if defined(PREFILTER_LUMA_WEIGHT)\r
	// 	// Apply luma weights to reduce flickering.\r
	// 	// Inspired by goo.gl/j1fhLe goo.gl/mfuZ4h\r
	// 	weights.x *= 1 / (max3(c0) + 1);\r
	// 	weights.y *= 1 / (max3(c1) + 1);\r
	// 	weights.z *= 1 / (max3(c2) + 1);\r
	// 	weights.w *= 1 / (max3(c3) + 1);\r
	// #endif\r
\r
	// Weighted average of the color samples\r
	vec3 avg = c0 * weights.x + c1 * weights.y + c2 * weights.z + c3 * weights.w;\r
	avg /= dot(weights, vec4(1.0)) + 0.0001;\r
\r
	// Output CoC = average of CoCs\r
	float coc = dot(cocs, vec4(0.25));\r
\r
	// Premultiply CoC again.\r
	avg *= smoothstep(0.0, mainTexSize.y * 2.0, abs(coc));\r
\r
	// #if defined(UNITY_COLORSPACE_GAMMA)\r
	// 	avg = GammaToLinearSpace(avg);\r
	// #endif\r
\r
    outColor = vec4(avg, coc);\r
	// outColor = vec4( vec3( abs(coc) ), 1.0 );\r
\r
}\r
`})))()}var Ji;function Yi(){return(Yi=t((()=>{Ji=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}

uniform sampler2D uBackBuffer0;
uniform sampler2D uBokeTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Composition.cginc

// Fragment shader: Additional blur
vec4 frag_Blur2(vec2 uv) {
	vec2 _MainTex_TexelSize = vec2( 1.0 ) / vec2( textureSize( uBackBuffer0, 0 ) );
	
    // 9-tap tent filter
    vec4 duv = _MainTex_TexelSize.xyxy * vec4(1, 1, -1, 0);
    vec4 acc;

    acc  = texture(uBackBuffer0, uv - duv.xy);
    acc += texture(uBackBuffer0, uv - duv.wy) * 2.0;
    acc += texture(uBackBuffer0, uv - duv.zy);

    acc += texture(uBackBuffer0, uv + duv.zw) * 2.0;
    acc += texture(uBackBuffer0, uv         ) * 4.0;
    acc += texture(uBackBuffer0, uv + duv.xw) * 2.0;

    acc += texture(uBackBuffer0, uv + duv.zy);
    acc += texture(uBackBuffer0, uv + duv.wy) * 2.0;
    acc += texture(uBackBuffer0, uv + duv.xy);

    return acc / 16.0;
}

void main( void ) {

	vec4 cs = texture(uBackBuffer0, vUv);
    vec4 cb = texture(uBokeTex, vUv);
	#if defined(UNITY_COLORSPACE_GAMMA)
		cs.rgb = GammaToLinearSpace(cs.rgb);
	#endif
		vec3 rgb = cs.rgb * cb.a + cb.rgb;
	#if defined(UNITY_COLORSPACE_GAMMA)
		rgb = LinearToGammaSpace(rgb);
	#endif

    outColor = vec4(rgb, cs.a);

}`})))()}var Xi;function Zi(){return(Zi=t((()=>{Xi=`in vec2 vUv;

uniform sampler2D uBackBuffer0;
uniform sampler2D uVelTex;
uniform sampler2D uVelNeighborTex;
uniform sampler2D uDepthTexture;
uniform mat4 uProjectionMatrixInverse;
uniform vec2 uPPPixelSize;
uniform float uPower;

layout (location = 0) out vec4 outColor;

#define EPSILON 0.0001
#define SOFT_Z_EXTENT 0.1
#define SAMPLE 16

// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
\r
float random(vec2 p){\r
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
// https://www.shadertoy.com/view/4djSRW\r
\r
vec3 hash(vec3 p3)\r
{\r
	p3 = fract(p3 * vec3(.1031, .1030, .0973));\r
  p3 += dot(p3, p3.yxz+33.33);\r
  return fract((p3.xxy + p3.yxx)*p3.zyx);\r
\r
}

float cone( vec2 x, vec2 y, vec2 v ) {

	return clamp( 1.0 - length( x - y ) / length( v ), 0.0, 1.0 ); 
	
}

float cylinder( vec2 x, vec2 y, vec2 v ) {
	
	return 1.0 - smoothstep( 0.95 * length( v ), 1.05 * length( v ), length( x - y ) );

}

float softDepthCompare( float a, float b ) {

	return clamp( 1.0 - (a - b) / SOFT_Z_EXTENT, 0.0, 1.0 );

}

float getLinearDepth( vec2 uv ) {
	vec4 depthRayPos = uProjectionMatrixInverse * vec4( uv * 2.0 - 1.0, texture( uDepthTexture, vUv ).x * 2.0 - 1.0, 1.0 );
	depthRayPos.xyz /= depthRayPos.w;	
	return depthRayPos.z;
}

vec2 getVelocity(sampler2D velTex, vec2 uv) 
{
    vec2 velocity = texture(velTex, uv).xy;
    velocity = normalize( velocity ) * clamp( length( velocity ), 0.5 * uPPPixelSize.y, float(TILE) * uPPPixelSize.y );

	velocity *= uPower;
	
    return velocity;
}


void main(void) {
	
	vec2 X = vUv;
	
	vec2 coord = vec2( gl_FragCoord.xy );

	vec2 velNeighbor = getVelocity( uVelNeighborTex, X ).xy;

	vec3 sum = vec3( 0.0 );
	float weight = 0.0;

	vec2 harfPixelSize = uPPPixelSize / 2.0;

	if( length( velNeighbor ) <= uPPPixelSize.y  ) {

		outColor = texture( uBackBuffer0, vUv );
		return;

	}

	weight = 1.0;
	weight = min( 1.0 / length( getVelocity( uVelTex, X ) ), 3.0 );
	sum = texture(uBackBuffer0, X ).xyz * weight;

	for( int i = 0; i < SAMPLE; i++ ) {

		if( i == SAMPLE - 1 / 2 ) continue;

		float j = random(X + float( i ) * 0.1);

		float t = mix( -1.0, 1.0, ( float( i ) + j + 1.0 ) / ( float(SAMPLE) + 1.0 ) );

		vec2 Y = X + velNeighbor * t + harfPixelSize;

		float depthX = getLinearDepth( X );
		float depthY = getLinearDepth( Y );

		float f = softDepthCompare( depthX, depthY );
		float b = softDepthCompare( depthY, depthX );

		float alphaY = f * cone( Y, X, getVelocity( uVelTex, Y ).xy ) +
			b * cone( X, Y, getVelocity( uVelTex, X ).xy ) +
			cylinder( Y, X, getVelocity( uVelTex, Y ).xy ) * cylinder( X, Y, getVelocity( uVelTex, X ).xy ) * 2.0;


		weight += alphaY;
		sum += alphaY * texture( uBackBuffer0, Y ).xyz;

	}

	sum /= weight;
	outColor = vec4(sum.x, sum.y, sum.z, 1.0);

}`})))()}var Qi;function $i(){return($i=t((()=>{Qi=`in vec2 vUv;
uniform sampler2D uBackBuffer0;
uniform sampler2D uVelTex;
uniform vec2 uPPPixelSize;

layout (location = 0) out vec4 outColor;

#define NUM 3

void main(void) {
	vec2 coord = vec2( gl_FragCoord.xy );
	vec2 vel = vec2( 0.0 );

	vec3 sum = vec3( 0.0 );

	for( int i = 0; i < NUM; i++ ) {

		for( int j = 0; j < NUM; j++ ) {

			vec2 offset = vec2( 
				( float(j) / float(NUM - 1) - 0.5 ) * 2.0 * uPPPixelSize.x,
				( float(i) / float(NUM - 1) - 0.5 ) * 2.0 * uPPPixelSize.y
			);

			vec2 currentVel = texture( uVelTex, vUv + offset ).xy;

			if( length(currentVel) > length( vel ) ) {

				vel = currentVel;
				
			}

		}

	}

	outColor = vec4( vel, 0.0, 1.0 );

}`})))()}var ea;function ta(){return(ta=t((()=>{ea=`in vec2 vUv;
uniform sampler2D uBackBuffer0;
uniform sampler2D uVelTex;
uniform vec2 uPPPixelSize;

layout (location = 0) out vec4 outColor;

void main(void) {
	vec2 coord = vec2( gl_FragCoord.xy );
	vec2 vel = vec2( 0.0 );

	vec3 sum = vec3( 0.0 );

	for( int i = 0; i < TILE; i++ ) {

		for( int j = 0; j < TILE; j++ ) {

			vec2 offset = vec2( 
				( float(j) / float(TILE - 1) - 0.5 ) * uPPPixelSize.x / float( TILE ),
				( float(i) / float(TILE - 1) - 0.5 ) * uPPPixelSize.y / float( TILE )
			);

			vec2 currentVel = texture( uVelTex, vUv + offset ).xy;

			if( length(currentVel) > length( vel ) ) {

				vel = currentVel;
				
			}

		}

	}

	outColor = vec4( vel + 0.0001, 0.0, 1.0 );

}`})))()}var na;function ra(){return(ra=t((()=>{na=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}\r
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 uViewMatrix;\r
	mat4 uProjectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
	uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}\r
\r
uniform sampler2D uBackBuffer0;\r
\r
uniform sampler2D uGbufferPos;\r
uniform sampler2D uGbufferNormal;\r
uniform sampler2D uSSRTexture;\r
\r
uniform vec3 uCameraPosition;\r
uniform float uCameraNear;\r
uniform float uCameraFar;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec4 gCol0 = texture( uGbufferPos, vUv );\r
	vec4 gCol1 = texture( uGbufferNormal, vUv );\r
	\r
	outColor += vec4( texture( uBackBuffer0, vUv ).xyz, 1.0 );\r
	\r
	vec3 dir = normalize( uCameraPosition - gCol0.xyz );\r
	float f = fresnel( clamp( dot( dir, gCol1.xyz ), 0.0, 1.0 ) );\r
\r
	vec4 ssrCol = texture( uSSRTexture, vUv );\r
\r
	outColor.xyz += f * ssrCol.xyz * 0.15;\r
\r
}`})))()}var ia;function aa(){return(aa=t((()=>{ia=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
struct DirectionalLight {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
struct SpotLight {\r
	vec3 position;\r
	vec3 direction;\r
	vec3 color;\r
	float angle;\r
	float blend;\r
	float distance;\r
	float decay;\r
};\r
\r
struct LightCamera {\r
	float near;\r
	float far;\r
	mat4 uViewMatrix;\r
	mat4 uProjectionMatrix;\r
	vec2 resolution;\r
};\r
\r
struct Light {\r
	vec3 direction;\r
	vec3 color;\r
};\r
\r
#if NUM_LIGHT_DIR > 0 \r
\r
	uniform DirectionalLight directionalLight[NUM_LIGHT_DIR];\r
	uniform LightCamera uDirectionalLightCamera[NUM_LIGHT_DIR];\r
	uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	\r
#endif\r
\r
// shadowmap\r
\r
float compareShadowDepth( float lightDepth, sampler2D shadowMap, vec2 shadowCoord, float depthOffset ) {\r
\r
	float shadowMapDepth = rgbaToFloat( texture( shadowMap, shadowCoord ) );\r
\r
	if( shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0 ) {\r
\r
		return step( lightDepth, shadowMapDepth + depthOffset );\r
\r
	}\r
\r
	return 1.0;\r
\r
}\r
\r
// shadow\r
\r
void setShadowCoord( vec3 pos, LightCamera camera, inout vec2 shadowCoord, inout float lightDepth ) {\r
	\r
	vec4 mvPosition = camera.uViewMatrix * vec4( pos, 1.0 );\r
	vec4 mvpPosition = camera.uProjectionMatrix * mvPosition;\r
	shadowCoord = ( mvpPosition.xy / mvpPosition.w ) * 0.5 + 0.5;\r
	\r
	float lightNear = camera.near;\r
	float lightFar = camera.far;\r
	lightDepth = ( -mvPosition.z - lightNear ) / ( lightFar - lightNear );\r
\r
}\r
\r
float getShadow( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
\r
	return compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
}\r
\r
#define SHADOW_SAMPLE_COUNT 2\r
\r
float getShadowSmooth( vec3 pos, LightCamera camera, sampler2D shadowMap, float depthOffset ) {\r
\r
	vec2 shadowCoord;\r
	float lightDepth;\r
\r
	setShadowCoord( pos, camera, shadowCoord, lightDepth );\r
	\r
	float shadowSum = compareShadowDepth( lightDepth, shadowMap, shadowCoord, depthOffset );\r
\r
	for( int i = 0; i < SHADOW_SAMPLE_COUNT; i++ ) {\r
\r
		vec2 offset = 1.0 / camera.resolution * ( float( i + 1 ) / float(SHADOW_SAMPLE_COUNT) );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, -offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, -offset.y ), depthOffset );\r
		\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, 0.0 ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, 0.0 ), depthOffset );\r
\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( -offset.x, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( 0.0, offset.y ), depthOffset );\r
		shadowSum += compareShadowDepth( lightDepth, shadowMap, shadowCoord + vec2( offset.x, offset.y ), depthOffset );\r
\r
	}\r
\r
	return shadowSum / ( float( SHADOW_SAMPLE_COUNT ) * 8.0 );\r
\r
}\r
\r
float ggx( float dNH, float roughness ) {\r
	\r
	float a2 = roughness * roughness;\r
	a2 = a2 * a2;\r
	float dNH2 = dNH * dNH;\r
\r
	if( dNH2 <= 0.0 ) return 0.0;\r
\r
	return a2 / ( PI * pow( dNH2 * ( a2 - 1.0 ) + 1.0, 2.0) );\r
\r
}\r
\r
vec3 lambert( vec3 diffuseColor ) {\r
\r
	return diffuseColor / PI;\r
\r
}\r
\r
float gSchlick( float d, float k ) {\r
\r
	if( d == 0.0 ) return 0.0;\r
\r
	return d / ( d * ( 1.0 - k ) + k );\r
	\r
}\r
\r
float gSmith( float dNV, float dNL, float roughness ) {\r
\r
	float k = clamp( roughness * sqrt( 2.0 / PI ), 0.0, 1.0 );\r
\r
	return gSchlick( dNV, k ) * gSchlick( dNL, k );\r
	\r
}\r
\r
float fresnel( float d ) {\r
	\r
	float f0 = 0.04;\r
\r
	return f0 + ( 1.0 - f0 ) * pow( 1.0 - d, 5.0 );\r
\r
}\r
\r
vec3 RE( Geometry geo, Material mat, Light light) {\r
\r
	vec3 lightDir = normalize( light.direction );\r
	vec3 halfVec = normalize( geo.viewDir + lightDir );\r
\r
	float dLH = clamp( dot( lightDir, halfVec ), 0.0, 1.0 );\r
	float dNH = clamp( dot( geo.normal, halfVec ), 0.0, 1.0 );\r
	float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
	float dNL = clamp( dot( geo.normal, lightDir), 0.0, 1.0 );\r
\r
	vec3 irradiance = light.color * dNL;\r
\r
	// diffuse\r
	vec3 diffuse = lambert( mat.diffuseColor ) * irradiance;\r
\r
	// specular\r
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
	\r
	vec3 specular = (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance; \r
\r
	vec3 c = vec3( 0.0 );\r
	c += diffuse * ( 1.0 - F ) + specular;\r
\r
	return c;\r
\r
}
// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
\r
float random(vec2 p){\r
	return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
// https://www.shadertoy.com/view/4djSRW\r
\r
vec3 hash(vec3 p3)\r
{\r
	p3 = fract(p3 * vec3(.1031, .1030, .0973));\r
  p3 += dot(p3, p3.yxz+33.33);\r
  return fract((p3.xxy + p3.yxx)*p3.zyx);\r
\r
}

// uniforms

uniform sampler2D uBackBuffer0;
uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;
uniform sampler2D uSSRBackBuffer;
uniform sampler2D uDepthTexture;

uniform float uTimeEF;
uniform mat4 uCameraMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform vec3 uCameraPosition;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;
#define MARCH 16.0
#define LENGTH 5.0
#define OBJDEPTH 0.5

void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec3 rayPos = texture( uGbufferPos, vUv ).xyz;
	vec4 rayViewPos = uViewMatrix * vec4(rayPos, 1.0);
	vec4 depthRayPos = uViewMatrix * vec4(rayPos, 1.0);

	if( abs(rayViewPos.z - depthRayPos.z) > 0.1 || length(rayPos - uCameraPosition) > 100.0 ) {

		outColor = vec4( 0.0, 0.0, 0.0, 0.0 );
		return;
		
	}

	if( rayPos.x + rayPos.y + rayPos.z == 0.0 ) return;

	vec3 rayDir = reflect( normalize( ( uCameraMatrix * uProjectionMatrixInverse * vec4( vUv * 2.0 - 1.0, 1.0, 1.0 ) ).xyz ), texture( uGbufferNormal, vUv ).xyz ) ;

	float rayStepLength = LENGTH / MARCH;
	vec3 rayStep = rayDir * rayStepLength;

	float totalRayLength = random(vUv + uTimeEF) * rayStepLength + 0.1;
	rayPos += rayDir * totalRayLength;

	vec4 col = vec4( 0.0 );

	for( int i = 0; i < int( MARCH ); i ++ ) {

		vec4 depthCoord = (uProjectionMatrix * uViewMatrix * vec4(rayPos, 1.0 ) );
		depthCoord.xy /= depthCoord.w;

		if( abs( depthCoord.x ) > 1.0 || abs( depthCoord.y ) > 1.0 ) break;

		depthCoord.xy = depthCoord.xy * 0.5 + 0.5;

		vec3 gBufferPos = texture( uGbufferPos, depthCoord.xy ).xyz;

		if( length( gBufferPos ) == 0.0 ) break;

		vec4 samplerPos = (uViewMatrix * vec4( gBufferPos, 1.0) );
		vec4 sampleViewPos = uViewMatrix * vec4( rayPos, 1.0 );

		if( sampleViewPos.z < samplerPos.z && sampleViewPos.z >= samplerPos.z - OBJDEPTH ) {

			col.xyz = texture( uBackBuffer0, depthCoord.xy ).xyz;
			col.w = 1.0;
			break;

		}
		
		rayPos += rayStep;
		totalRayLength += rayStepLength;

	}


	outColor = mix( texture( uSSRBackBuffer, vUv ), col, 0.2 );

}`})))()}var oa;function sa(){return(sa=t((()=>{M(),L(),Zn(),Ui(),Gi(),qi(),Yi(),Zi(),$i(),ta(),ra(),aa(),oa=class{dofCoc;dofBokeh;dofComposite;rtSSR1;rtSSR2;postprocess;_ssr;_ssComposite;_dofParams;_motionBlur;_motionBlurTile;_motionBlurNeighbor;constructor(e,t){let n=new I(e,{name:`collection`,frag:Hi}),r=e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),i=e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),a=new I(e,{name:`ssr`,frag:ti(`ssr`,ia),renderTarget:r,uniforms:si.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSceneTex:{value:null,type:`1i`},uSSRBackBuffer:{value:i.textures[0],type:`1i`}}),resolutionRatio:.5,passThrough:!0}),o=new I(e,{name:`ssComposite`,frag:ti(`ssComposite`,na),uniforms:si.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSSRTexture:{value:i.textures[0],type:`1i`}})}),s=new A(10,.05,20,.05),c=new I(e,{name:`dof/coc`,frag:Ki,uniforms:si.merge({uGbufferPos:{value:null,type:`1i`},uParams:{value:s,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR,internalFormat:N.RGBA16F,type:N.HALF_FLOAT,format:N.RGBA})]),passThrough:!0,resolutionRatio:.5}),l=new I(e,{name:`dof/bokeh`,frag:Wi,uniforms:si.merge({uCocTex:{value:c.renderTarget.textures[0],type:`1i`},uParams:{value:s,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),passThrough:!0,resolutionRatio:.5}),u=new I(e,{name:`dof/composite`,frag:Ji,uniforms:si.merge({uBokeTex:{value:l.renderTarget.textures[0],type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR,internalFormat:N.RGBA16F,type:N.HALF_FLOAT,format:N.RGBA})])}),d=new I(e,{name:`motionBlurTile`,frag:ea,uniforms:si.merge({uVelTex:{value:null,type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA})]),defines:{TILE:16},resolutionRatio:1/16,passThrough:!0}),f=new I(e,{name:`motionBlurNeighbor`,frag:Qi,uniforms:si.merge({uVelTex:{value:d.renderTarget.textures[0],type:`1i`}}),defines:{TILE:16},renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA})]),resolutionRatio:1/16,passThrough:!0}),p=new I(e,{name:`motionBlur`,frag:Xi,uniforms:si.merge({uVelNeighborTex:{value:f.renderTarget.textures[0],type:`1i`},uVelTex:{value:null,type:`1i`},uDepthTexture:{value:null,type:`1i`},uPower:{value:1,type:`1f`}}),defines:{TILE:16}});this.postprocess=new gi({passes:[n,a,o,c,l,u,d,f,p]}),this._ssr=a,this._ssComposite=o,this.dofCoc=c,this.dofBokeh=l,this.dofComposite=u,this._motionBlur=p,this._motionBlurTile=d,this._motionBlurNeighbor=f,this._dofParams=s,this.rtSSR1=r,this.rtSSR2=i,n.backBufferOverride=t.shadingBuffer.textures,a.uniforms.uGbufferPos.value=t.gBuffer.textures[0],a.uniforms.uGbufferNormal.value=t.normalBuffer.textures[0],a.uniforms.uSceneTex.value=t.forwardBuffer.textures[0],o.uniforms.uGbufferPos.value=t.gBuffer.textures[0],o.uniforms.uGbufferNormal.value=t.gBuffer.textures[1],c.uniforms.uGbufferPos.value=t.gBuffer.textures[0],d.uniforms.uVelTex.value=t.gBuffer.textures[4],p.uniforms.uVelTex.value=t.gBuffer.textures[4],p.uniforms.uDepthTexture.value=t.gBuffer.depthTexture}update(e){let t=e.fov,n=e.dofParams.focusDistance,r=e.dofParams.kFilmHeight,i=r/Math.tan(.5*(t/180*Math.PI)),a=1/this.dofBokeh.renderTarget.size.y*5,o=1/a,s=i*i/(e.dofParams.fNumber*(n-i)*r*2);this._dofParams.set(n,a,o,s);let c=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=c,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(e){this.postprocess.resize(e)}setPassEnabled(e){e.motionBlur!==void 0&&(this._motionBlurTile.enabled=e.motionBlur,this._motionBlurNeighbor.enabled=e.motionBlur,this._motionBlur.enabled=e.motionBlur,e.motionBlur||(this._motionBlurTile.renderTarget&&this._motionBlurTile.renderTarget.clear(),this._motionBlurNeighbor.renderTarget&&this._motionBlurNeighbor.renderTarget.clear())),e.ssr!==void 0&&(this._ssr.enabled=e.ssr,this._ssComposite.enabled=e.ssr,e.ssr||(this.rtSSR1.clear(),this.rtSSR2.clear())),e.dof!==void 0&&(this.dofCoc.enabled=e.dof,this.dofBokeh.enabled=e.dof,this.dofComposite.enabled=e.dof,e.dof||(this.dofBokeh.renderTarget&&this.dofBokeh.renderTarget.clear(),this.dofComposite.renderTarget&&this.dofComposite.renderTarget.clear()))}setMotionBlurPower(e){this._motionBlur.uniforms.uPower.value=e}dispose(){this.postprocess.dispose(),this.rtSSR1.dispose(),this.rtSSR2.dispose()}}})))()}var ca,la;function ua(){return(ua=t((()=>{Zn(),Vi(),sa(),ca=e=>{let t=e.createFrameBuffer();t.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA,magFilter:N.NEAREST,minFilter:N.NEAREST}),e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA}),e.createTexture(),e.createTexture(),e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA})]);let n=e.createFrameBuffer({disableDepthBuffer:!0});n.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA}),e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA})]);let r=e.createFrameBuffer({disableDepthBuffer:!0});r.setDepthTexture(t.depthTexture),r.setTexture([n.textures[0],t.textures[0],t.textures[4]]);let i=e.createFrameBuffer({disableDepthBuffer:!0});i.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA,magFilter:N.LINEAR,minFilter:N.LINEAR})]);let a=e.createFrameBuffer({disableDepthBuffer:!0});a.setDepthTexture(t.depthTexture),a.setTexture([e.createTexture()]);let o=e.createFrameBuffer();return o.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA,magFilter:N.NEAREST,minFilter:N.NEAREST})]),{gBuffer:t,shadingBuffer:n,forwardBuffer:r,refractionBuffer:i,uiBuffer:a,normalBuffer:o}},la=class{camera;renderTarget;deferredRenderer;pipelinePostProcess;_pipelineOverride;_sceneConfig;_onDispose;constructor(e){this.camera=null,this._pipelineOverride=null,this._sceneConfig=e.sceneConfig,this._onDispose=e.onDispose,this.renderTarget=ca(e.backend),this.deferredRenderer=new Bi({backend:e.backend,envMap:e.envMap,envMapCube:e.envMapCube,renderTarget:this.renderTarget}),this.pipelinePostProcess=new oa(e.backend,this.renderTarget),e.resolution.x>0&&e.resolution.y>0&&this.resize(e.resolution),this.applyPipelineConfig()}get pipelineOverride(){return this._pipelineOverride}set pipelineOverride(e){this._pipelineOverride=e,this.applyPipelineConfig()}applyPipelineConfig(){let e={...this._sceneConfig,...this._pipelineOverride};this.deferredRenderer.setPassEnabled({ssao:e.ssao,lightShaft:e.lightShaft}),this.pipelinePostProcess.setPassEnabled({motionBlur:e.motionBlur,ssr:e.ssr,dof:e.dof}),this.pipelinePostProcess.setMotionBlurPower(e.motionBlurPower??1)}resize(e){let t=this.renderTarget;t.gBuffer.setSize(e),t.shadingBuffer.setSize(e),t.forwardBuffer.setSize(e),t.refractionBuffer.setSize(e),t.uiBuffer.setSize(e),t.normalBuffer.setSize(e),this.deferredRenderer.resize(e),this.pipelinePostProcess.resize(e)}dispose(){this._onDispose(this);let e=this.renderTarget;e.forwardBuffer.dispose();let t=[e.gBuffer,e.shadingBuffer,e.refractionBuffer,e.uiBuffer,e.normalBuffer];for(let e=0;e<t.length;e++){let n=t[e];for(let e=0;e<n.textures.length;e++)n.textures[e].dispose();n.dispose()}e.gBuffer.depthTexture&&e.gBuffer.depthTexture.dispose(),this.deferredRenderer.dispose(),this.pipelinePostProcess.dispose()}}})))()}var da;function fa(){return(fa=t((()=>{da=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}
// 宣言順はvert_h.part.glslのoutと一致させる（WGSL変換時にロケーションが宣言順で振られるため）\r
in vec2 vUv;\r
in vec3 vViewNormal;\r
in vec3 vNormal;\r
in vec3 vMVPosition;\r
in vec3 vMVPPosition;\r
in vec3 vPos;\r
in vec2 vVelocity;\r
\r
uniform mat4 uModelMatrix;\r
uniform mat4 uModelMatrixInverse;\r
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
uniform vec3 uCameraPosition;\r
uniform vec2 uResolution;\r
\r
#ifdef IS_DEPTH\r
	uniform float uCameraNear;\r
	uniform float uCameraFar;\r
#endif\r
\r
#ifdef IS_DEFERRED\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
	layout (location = 3) out vec4 outColor3;\r
	layout (location = 4) out vec4 outColor4;\r
#endif\r
\r
#ifdef IS_FORWARD\r
	uniform sampler2D uDeferredTexture;\r
	uniform vec2 uDeferredResolution;\r
	uniform sampler2D uGbufferNormal;\r
	uniform sampler2D uGbufferAlbedo;\r
	uniform sampler2D uGbufferMaterial;\r
#endif\r
\r
#if defined(IS_FORWARD) || defined(IS_DEPTH)\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 2) out vec4 outColor2;\r
#endif\r
\r
uniform float uTime;\r
uniform float uTimeF;\r
uniform float uTimeE;\r
uniform float uTimeEF;

uniform vec3 uSkyColor;
uniform vec3 uGroundColor;
uniform float uSkyIntensity;

void main( void ) {

	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;

	float t = clamp( dot( normalize( vNormal ), vec3( 0.0, 1.0, 0.0 ) ) * 0.5 + 0.5, 0.0, 1.0 );
	vec3 color = mix( uGroundColor, uSkyColor * 2.0, t );

	outColor = vec4( 0.0 );
	outEmission = color * uSkyIntensity;
	outRoughness = 1.0;
	outEnv = 0.0;

	#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r
	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r
#endif\r
\r
#ifdef IS_DEPTH\r
	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r
	outColor0 = vec4(floatToRGBA( depth_z ));\r
#endif\r
\r
#ifdef IS_DEFERRED\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 tangent;\r
		vec3 bitangent;\r
\r
		#ifdef USE_TANGENT\r
\r
			tangent = normalize( vTangent );\r
			bitangent = normalize( vBitangent );\r
\r
		#else\r
\r
			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r
			bitangent = cross(tangent, outNormal);\r
\r
		#endif\r
\r
		#ifdef DOUBLE_SIDED\r
\r
			tangent *= faceDirection;\r
			bitangent *= faceDirection;\r
			\r
		#endif\r
\r
		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r
		outNormal = normalize( vTBN * outNormalMap );\r
\r
	#endif\r
\r
	vec4 mvp = uProjectionMatrix * mv;\r
	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r
	outColor0 = vec4( outPos, outEmission.x );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r
	outColor2 = vec4( outColor.xyz, 0.0 );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
#ifdef IS_FORWARD\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}
`})))()}var pa;function ma(){return(ma=t((()=>{M(),Ur(),Fr(),hi(),fa(),pa=class{entity;mesh;material;color;groundColor;_intensity;constructor(e){this.color=new A(1,1,1),this.groundColor=new A(.3,.3,.3),this._intensity=1,this.material=new mi({phase:[`deferred`,`envMap`],frag:da,cullFace:!1,uniforms:{uSkyColor:{value:this.color,type:`3fv`},uGroundColor:{value:this.groundColor,type:`3fv`},uSkyIntensity:{value:this._intensity,type:`1f`}}}),this.entity=e.createEntity({name:`sky`}),this.mesh=this.entity.addComponent(F),this.mesh.geometry=new Pr({radius:500,widthSegments:32,heightSegments:32}),this.mesh.material=this.material}get intensity(){return this._intensity}set intensity(e){this._intensity=e,this.material.uniforms.uSkyIntensity.value=e}}})))()}var ha,ga,_a,va,ya,ba,xa,Sa,Ca,wa,Ta,Ea,Da;function Oa(){return(Oa=t((()=>{Yn(),M(),Lr(),Vr(),Ur(),Nr(),Cr(),Zn(),nr(),di(),hi(),Si(),Ei(),Oi(),ua(),ma(),ha=new mi,ga=e=>e.material||ha,_a=0,va=new A(1,1,1,1),ya=new A(0,0,0,1),ba=[],xa=[],Sa=e=>ba[e]||(ba[e]={direction:`directionalLight[${e}].direction`,color:`directionalLight[${e}].color`,camNear:`uDirectionalLightCamera[${e}].near`,camFar:`uDirectionalLightCamera[${e}].far`,camViewMatrix:`uDirectionalLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uDirectionalLightCamera[${e}].projectionMatrix`,camResolution:`uDirectionalLightCamera[${e}].resolution`,shadowMap:`directionalLightShadowMap[${e}]`}),Ca=e=>xa[e]||(xa[e]={position:`uSpotLight[${e}].position`,direction:`uSpotLight[${e}].direction`,color:`uSpotLight[${e}].color`,angle:`uSpotLight[${e}].angle`,blend:`uSpotLight[${e}].blend`,distance:`uSpotLight[${e}].distance`,decay:`uSpotLight[${e}].decay`,camNear:`uSpotLightCamera[${e}].near`,camFar:`uSpotLightCamera[${e}].far`,camViewMatrix:`uSpotLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uSpotLightCamera[${e}].projectionMatrix`,camResolution:`uSpotLightCamera[${e}].resolution`,shadowMap:`spotLightShadowMap[${e}]`}),wa=class extends Sr{backend;canvas;resolution;globalUniforms;_views;_pipelineConfig;programManager;_geometryBuffers;_lights;_lightsUpdated;_lightInfoCache;_envMapCameras;_envMapRenderTarget;_envMapCube;_pmremRender;_stack;_sceneCamera;sky;_quad;_isCorrentCompiles;compileDrawParams;_tmpNormalMatrix;_tmpModelViewMatrix;_tmpViewMatrixInverseMatrix;_tmpLightDirection;_tmpModelMatrixInverse;_tmpProjectionMatrixInverse;_tmpResolution;_tmpResolutionUniform;_tmpUniformOverride;_tmpDrawParam;_tmpShadingTexture;_tmpPostProcessUniforms;constructor(e,t){super(),this.backend=e,this.canvas=e.canvas,this.globalUniforms={},this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new Di(e),this._geometryBuffers=new Map,this.resolution=new A,this._views=[],this._stack=this._createRenderStack(),this._sceneCamera=null,this._lights={directional:[],spot:[]},this._lightsUpdated=!1,this._lightInfoCache=new Map;let n=e.createCubeTexture();this._envMapCube=n,this._envMapRenderTarget=e.createCubeFrameBuffer().setTexture([n]),this._envMapRenderTarget.setSize(256,256);let r=new A(0,0,0),i=new A(0,-1,0),a=[new j().lookAt(r,new A(1,0,0),i),new j().lookAt(r,new A(0,1,0),new A(0,0,1)),new j().lookAt(r,new A(0,0,1),i),new j().lookAt(r,new A(-1,0,0),i),new j().lookAt(r,new A(0,-1,0),new A(0,0,-1)),new j().lookAt(r,new A(0,0,-1),i)];this._envMapCameras=[];for(let e=0;e<6;e++){let n=t.createEntity({name:`envMapCamera/`+e}),r=n.addComponent(Ir);r.fov=90,r.near=.1,r.far=1e3,r.aspect=1,n.applyMatrix(a[e].clone()),r.updateViewMatrix(),r.updateProjectionMatrix(),this._envMapCameras.push({entity:n,camera:r})}this._pmremRender=new Ti(e,{input:[n],resolution:new A(768,1024)}),this._quad=new Mr({width:2,height:2}),this._tmpLightDirection=new A,this._tmpModelMatrixInverse=new j,this._tmpViewMatrixInverseMatrix=new j,this._tmpProjectionMatrixInverse=new j,this._tmpModelViewMatrix=new j,this._tmpNormalMatrix=new j,this._tmpResolution=new A,this._tmpResolutionUniform={value:this._tmpResolution,type:`2fv`},this._tmpUniformOverride={},this._tmpDrawParam={},this._tmpShadingTexture={value:null,type:`1i`},this._tmpPostProcessUniforms={uShadingTexture:this._tmpShadingTexture},this.sky=new pa(t),this._pipelineConfig={motionBlur:!0,motionBlurPower:1,ssr:!0,ssao:!0,lightShaft:!0,dof:!0};let o=this.fieldDir(`sky`);o.field(`skyColor`,()=>this.sky.color.getElm(`vec3`),e=>{this.sky.color.set(e[0],e[1],e[2])},{format:{type:`vector`}}),o.field(`groundColor`,()=>this.sky.groundColor.getElm(`vec3`),e=>{this.sky.groundColor.set(e[0],e[1],e[2])},{format:{type:`vector`}}),o.field(`intensity`,()=>this.sky.intensity,e=>{this.sky.intensity=e},{step:.1}),o.field(`reset`,()=>()=>{this.setField(`sky/skyColor`,[1,1,1]),this.setField(`sky/groundColor`,[.3,.3,.3]),this.setField(`sky/intensity`,1)},void 0,{label:`Reset to Default`});let s=this.fieldDir(`pipeline`);[`motionBlur`,`ssr`,`ssao`,`dof`,`lightShaft`].forEach(e=>{let t=s.dir(e);t.field(`enabled`,()=>this._pipelineConfig[e]??!0,t=>{this.applyPipelineConfig({[e]:t})}),e===`motionBlur`&&t.field(`power`,()=>this._pipelineConfig.motionBlurPower??1,e=>{this.applyPipelineConfig({motionBlurPower:e})},{step:.1})})}createView(){let e=new la({backend:this.backend,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:this._envMapCube,sceneConfig:this._pipelineConfig,resolution:this.resolution,onDispose:e=>{this._views.splice(this._views.indexOf(e),1)}});return this._views.push(e),e}_createRenderStack(){return{light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]}}_collectRenderStack(e,t,n){let r=t&&e.visible,i=e.getComponent(F);if(i&&r){let t=ga(i);t.visibilityFlag.deferred&&n.deferred.push(e),t.visibilityFlag.shadowMap&&n.shadowMap.push(e),t.visibilityFlag.forward&&n.forward.push(e),t.visibilityFlag.ui&&n.ui.push(e),t.visibilityFlag.envMap&&n.envMap.push(e)}let a=e.getComponent(Br);if(a&&a.enabled&&r&&n.light.push(e),!this._sceneCamera){let t=e.getComponentsByTag(`camera`);for(let n=0;n<t.length;n++)t[n].displayOut&&(this._sceneCamera=e)}for(let t=0;t<e.children.length;t++)this._collectRenderStack(e.children[t],r,n)}prepareScene(e,t){if(this.resolution.x===0||this.resolution.y===0)return;let n=this._stack=this._createRenderStack();this._sceneCamera=null,this._collectRenderStack(e,!0,n),this._collectRenderStack(this.sky.entity,!0,n);let r=[],i={},a=Object.keys(this._lights);for(let e=0;e<a.length;e++){let t=a[e];i[t]=this._lights[t].length,this._lights[t]=[]}for(let e=0;e<n.light.length;e++){let t=n.light[e],i=t.getComponent(Br);if(i){let e=this.collectLight(t,i);i.castShadow&&e.renderTarget&&r.push(e)}}this._lights.directional.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lights.spot.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lightsUpdated=!1;for(let e=0;e<a.length;e++){let t=a[e];if(i[t]!=this._lights[t].length){this._lightsUpdated=!0;break}}for(let e=0;e<r.length;e++){let t=r[e];this.renderCamera(`shadowMap`,t.component.entity,n.shadowMap,t.renderTarget,this.resolution)}for(let e=0;e<this._envMapCameras.length;e++){let{entity:t}=this._envMapCameras[e];this._envMapRenderTarget.face(e),this.renderCamera(`envMap`,t,n.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap()}render(e,t){if(this.resolution.x===0||this.resolution.y===0)return;let n=e,r=n.camera||this._sceneCamera;if(!r)return;let i=r.getComponentsByTag(`camera`)[0];if(!i)return;let a=this._stack,o=n.renderTarget;this.backend.setBlendEnabled(!1),this.renderCamera(`deferred`,r,a.deferred,o.gBuffer,this.resolution),this.renderPostProcess(n.deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:i.viewMatrix,viewMatrixPrev:i.viewMatrixPrev,projectionMatrix:i.projectionMatrix,projectionMatrixPrev:i.projectionMatrixPrev,cameraMatrixWorld:r.matrixWorld}}),n.deferredRenderer.update(),this._copyToRefraction(o);let s=a.forward.slice().sort((e,t)=>ga(e.getComponent(F)).renderOrder-ga(t.getComponent(F)).renderOrder),c=[],l=null;for(let e of s){let t=ga(e.getComponent(F)).renderOrder;(l===null||t!==l)&&(c.push([]),l=t),c[c.length-1].push(e)}this.backend.setBlendEnabled(!0);for(let e=0;e<c.length;e++)e>0&&this._copyToRefraction(o),this.renderCamera(`forward`,r,c[e],o.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:o.refractionBuffer.textures[0],type:`1i`},uDeferredResolution:{value:o.shadingBuffer.size,type:`2fv`},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:`1i`},uGbufferNormal:{value:o.normalBuffer.textures[0],type:`1i`},uGbufferAlbedo:{value:o.gBuffer.textures[2],type:`1i`},uGbufferMaterial:{value:o.gBuffer.textures[3],type:`1i`}},disableClear:!0});this.backend.setBlendEnabled(!1),this.renderPostProcess(n.pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:i.viewMatrix,projectionMatrix:i.projectionMatrix,cameraMatrixWorld:r.matrixWorld,cameraNear:i.near,cameraFar:i.far}}),n.pipelinePostProcess.update(i);let u=n.pipelinePostProcess.postprocess.output?n.pipelinePostProcess.postprocess.output:void 0,d=(this._sceneCamera||r).getComponent(ui);if(d){d.resize(this.resolution),this._tmpShadingTexture.value=o.shadingBuffer.textures[0];for(let e=0;e<d.postProcesses.length;e++){let t=d.postProcesses[e];t.enabled&&t.hasOutput&&(this.renderPostProcess(t,u,this.resolution,{cameraOverride:{viewMatrix:i.viewMatrix,projectionMatrix:i.projectionMatrix,cameraMatrixWorld:r.matrixWorld,cameraNear:i.near,cameraFar:i.far},uniformOverride:this._tmpPostProcessUniforms}),u=t.output||void 0)}}if(u){let e=u.size;this.backend.blit(u,o.uiBuffer,e.x,e.y)}this.backend.setBlendEnabled(!0),this.renderCamera(`forward`,r,a.ui,o.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:o.refractionBuffer.textures[0],type:`1i`}},disableClear:!0}),this.backend.setBlendEnabled(!1)}present(e){this.backend.blit(e.renderTarget.uiBuffer,null,this.resolution.x,this.resolution.y)}renderCamera(e,t,n,r,i,a){let o=t.getComponentsByTag(`camera`)[0]||t.getComponent(Br);a||={};let s=this._tmpDrawParam;s.viewMatrix=o.viewMatrix,s.viewMatrixPrev=o.viewMatrixPrev,s.projectionMatrix=o.projectionMatrix,s.projectionMatrixPrev=o.projectionMatrixPrev,s.cameraMatrixWorld=t.matrixWorld,s.cameraNear=o.near,s.cameraFar=o.far,s.renderTarget=r,s.uniformOverride=a.uniformOverride||this._tmpUniformOverride,a.cameraOverride&&Object.assign(s,a.cameraOverride),this.backend.bindRenderTarget(r,o.viewPort,i),r?this._tmpResolution.set(r.size.x,r.size.y):this._tmpResolution.set(i.x,i.y),s.uniformOverride.uResolution=this._tmpResolutionUniform,a.disableClear||this.backend.clear(e==`shadowMap`?va:ya,1);for(let t=0;t<n.length;t++){let r=n[t],i=r.getComponentsByTag(`materialOverride`)[0],a=r.getComponent(F),c=i&&i.material||ga(a),l=a.geometry;s.modelMatrixWorld=r.matrixWorld,s.modelMatrixWorldPrev=r.matrixWorldPrev,s.label=`cam[${o.uuid}]/${r.name||c.name||`-`}`,this.draw(r.uuid,e,l,c,s)}}_copyToRefraction(e){let t=e.shadingBuffer.size;this.backend.blit(e.shadingBuffer,e.refractionBuffer,t.x,t.y,!0,!0)}collectLight(e,t){let n=t.lightType,r=this._lightInfoCache.get(t);return r||(r={position:new A,direction:new A,color:new A,renderTarget:null,component:t},this._lightInfoCache.set(t,r)),r.position.set(0,0,0,1).applyMatrix4(e.matrixWorld),r.direction.set(0,1,0,0).applyMatrix4(e.matrixWorld).normalize(),r.color.set(t.color.x,t.color.y,t.color.z).multiply(t.intensity*Math.PI),n==`directional`?this._lights.directional.push(r):n==`spot`&&this._lights.spot.push(r),t.castShadow&&r.renderTarget==null&&(r.renderTarget=this.backend.createFrameBuffer().setTexture([this.backend.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),r.renderTarget.setSize(t.shadowMapSize)),r}renderPostProcess(e,t,n,r){let i=t?t.textures:void 0;if(e.passes)for(let t=0;t<e.passes.length;t++){let a=e.passes[t];if(a.enabled===!1)continue;let o=a.renderTarget;this.backend.bindRenderTarget(o,a.viewPort,n),this.backend.clear(a.clearColor,a.clearDepth);let s=a.backBufferOverride||i||null;if(s)for(let e=0;e<s.length;e++)a.uniforms[`uBackBuffer`+e]={type:`1i`,value:s[e]};let c=r&&r.cameraOverride||{};c.label=a.name,c.renderTarget=o,c.uniformOverride=r&&r.uniformOverride,this.draw(a.uuid,`postprocess`,this._quad,a,c),a.onAfterRender(),!a.passThrough&&a.renderTarget&&(i=a.renderTarget.textures)}}draw(e,t,n,r,i){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:e,renderType:t,geometry:n,material:r,param:{...i}});return}_a=0,this.backend.setMaterialState(r.cullFace,r.depthTest,r.depthWrite);let a=r.programCache[t];if(!a||this._lightsUpdated){let e={...r.defines};t==`deferred`?e.IS_DEFERRED=``:t==`forward`||t==`envMap`?e.IS_FORWARD=``:t==`shadowMap`&&(e.IS_DEPTH=``);let n=tr(r.vert,e,this._lights),i=tr(r.frag,e,this._lights);a=this.programManager.get(n,i,r.name),r.programCache[t]=a}if(i&&(i.modelMatrixWorld&&(a.setUniform(`uModelMatrix`,`Matrix4fv`,i.modelMatrixWorld.elm),a.setUniform(`uModelMatrixInverse`,`Matrix4fv`,this._tmpModelMatrixInverse.copy(i.modelMatrixWorld).inverse().elm),i.modelMatrixWorldPrev&&a.setUniform(`uModelMatrixPrev`,`Matrix4fv`,i.modelMatrixWorldPrev.elm),i.viewMatrix&&(this._tmpModelViewMatrix.copy(i.modelMatrixWorld).preMultiply(i.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),a.setUniform(`uModelViewMatrix`,`Matrix4fv`,this._tmpModelViewMatrix.elm),a.setUniform(`uNormalMatrix`,`Matrix4fv`,this._tmpNormalMatrix.elm),a.setUniform(`uViewMatrixInverse`,`Matrix4fv`,this._tmpViewMatrixInverseMatrix.copy(i.viewMatrix).inverse().elm))),i.viewMatrix&&(a.setUniform(`uViewMatrix`,`Matrix4fv`,i.viewMatrix.elm),i.viewMatrixPrev&&a.setUniform(`uViewMatrixPrev`,`Matrix4fv`,i.viewMatrixPrev.elm)),i.projectionMatrix&&(a.setUniform(`uProjectionMatrix`,`Matrix4fv`,i.projectionMatrix.elm),a.setUniform(`uProjectionMatrixInverse`,`Matrix4fv`,this._tmpProjectionMatrixInverse.copy(i.projectionMatrix).inverse().elm),i.projectionMatrixPrev&&a.setUniform(`uProjectionMatrixPrev`,`Matrix4fv`,i.projectionMatrixPrev.elm)),i.cameraMatrixWorld&&(a.setUniform(`uCameraMatrix`,`Matrix4fv`,i.cameraMatrixWorld.elm),a.setUniform(`uCameraPosition`,`3f`,[i.cameraMatrixWorld.elm[12],i.cameraMatrixWorld.elm[13],i.cameraMatrixWorld.elm[14]])),t!=`deferred`&&(i.cameraNear&&a.setUniform(`uCameraNear`,`1f`,[i.cameraNear]),i.cameraFar&&a.setUniform(`uCameraFar`,`1f`,[i.cameraFar]))),r.useLight&&t!==`deferred`&&t!==`shadowMap`){for(let e=0;e<this._lights.directional.length;e++){let t=this._lights.directional[e],n=Sa(e);if(a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),t.renderTarget){let e=t.renderTarget.textures[0].activate(_a++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}for(let e=0;e<this._lights.spot.length;e++){let t=this._lights.spot[e],n=Ca(e);if(i&&i.viewMatrix&&this._tmpLightDirection.copy(t.direction).applyMatrix3(i.viewMatrix),a.setUniform(n.position,`3fv`,t.position.getElm(`vec3`)),a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),a.setUniform(n.angle,`1fv`,[Math.cos(t.component.angle/2)]),a.setUniform(n.blend,`1fv`,[t.component.blend]),a.setUniform(n.distance,`1fv`,[t.component.distance]),a.setUniform(n.decay,`1fv`,[t.component.decay]),t.renderTarget){let e=t.renderTarget.textures[0].activate(_a++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}}Da(a,this.globalUniforms,r.uniforms,i&&i.uniformOverride);let o=a.getVAO(e.toString());if(o){let e=this._getGeometryBuffer(n);e.vaoVersions.get(o)!==n.updateVersion&&(n.attributes.forEach((t,n)=>{let r=e.buffers.get(n);r!==void 0&&(n==`index`?o.setIndex(r):o.setAttribute(n,r,t.size,t.opt))}),e.vaoVersions.set(o,n.updateVersion)),this.backend.draw(a,o,r.drawType,r.blending,void 0)}}_getGeometryBuffer(e){let t=this._geometryBuffers.get(e);if(t||(t={buffers:new Map,vaoVersions:new Map,version:-1},this._geometryBuffers.set(e,t)),t.version!==e.updateVersion){let n=t.buffers;n.forEach(e=>e.dispose()),n.clear(),t.vaoVersions.clear(),e.attributes.forEach((e,t)=>{n.set(t,new zn(this.backend.gl).setData(e.array,t==`index`?`ibo`:`vbo`,e.opt&&e.opt.usage))}),t.version=e.updateVersion}return t}applyPipelineConfig(e){Object.assign(this._pipelineConfig,e);for(let e=0;e<this._views.length;e++)this._views[e].applyPipelineConfig()}get pipelineConfig(){return this._pipelineConfig}resize(e){this.resolution.copy(e);for(let t=0;t<this._views.length;t++)this._views[t].resize(e)}async compileShaders(e,t,n,r){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.prepareScene(e,n),this.render(t,n),this._isCorrentCompiles=!1;let i=this.compileDrawParams.length,a=0;for(let e=0;e<this.compileDrawParams.length;e++){let t=this.compileDrawParams[e];if(this.backend.bindRenderTarget(t.param.renderTarget||null),this.draw(t.drawId,t.renderType,t.geometry,t.material,t.param),await new Promise(e=>{setTimeout(()=>{e(null)},10)}),r){a++;let e=t.param&&t.param.label||`-`;r(`${t.renderType}/${e}/[${t.drawId}]`,a,i)}}}createTexProcedural(e){let t={...e.uniforms},n=e.textures||{},r=Object.keys(n);for(let e=0;e<r.length;e++)t[r[e]]={value:n[r[e]],type:`1i`};let i=new xi(this,{frag:e.frag,resolution:e.resolution,uniforms:t});return e.filter===`nearest`&&(i.setting({magFilter:N.NEAREST,minFilter:N.NEAREST}),i.render()),i}},Ta=[],Ea=(e,t)=>{e!=null&&(typeof e==`number`||typeof e==`boolean`?Ta.push(e):`isVector`in e?Ta.push(...e.getElm(`vec`+t.charAt(0))):`isTexture`in e?(e.activate(_a++),Ta.push(e.unit)):Ta.push(...e.elm))},Da=(e,...t)=>{for(let n=0;n<t.length;n++){let r=t[n];if(!r)continue;let i=Object.keys(r);for(let t=0;t<i.length;t++){let n=i[t],a=r[n];if(!a)continue;let o=a.type,s=a.value;if(Ta.length=0,Array.isArray(s))for(let e=0;e<s.length;e++)Ea(s[e],o);else Ea(s,o);Ta.length>0&&e.setUniform(n,o,Ta)}}},wa.__docgenInfo={description:``,methods:[{name:`createView`,docblock:null,modifiers:[],params:[],returns:{type:{name:`RenderView`}}},{name:`prepareScene`,docblock:null,modifiers:[],params:[{name:`root`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`_event`,optional:!1,type:{name:`EntityUpdateEvent`,alias:`EntityUpdateEvent`}}],returns:null},{name:`present`,docblock:null,modifiers:[],params:[{name:`view`,optional:!1,type:{name:`RenderViewContract`,alias:`RenderViewContract`}}],returns:null},{name:`renderCamera`,docblock:null,modifiers:[],params:[{name:`renderType`,optional:!1,type:{name:`union`,raw:`"shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"`,elements:[{name:`literal`,value:`"shadowMap"`},{name:`literal`,value:`"deferred"`},{name:`literal`,value:`"forward"`},{name:`literal`,value:`"envMap"`},{name:`literal`,value:`'ui'`},{name:`literal`,value:`"postprocess"`}],alias:`MaterialRenderType`}},{name:`cameraEntity`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`entities`,optional:!1,type:{name:`Array`,elements:[{name:`Entity`}],raw:`Entity[]`}},{name:`renderTarget`,optional:!1,type:{name:`union`,raw:`GLP.GLPowerFrameBuffer | null`,elements:[{name:`GLP.GLPowerFrameBuffer`},{name:`null`}]}},{name:`canvasSize`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}},{name:`renderOption`,optional:!0,type:{name:`RenderOption`,alias:`RenderOption`}}],returns:null},{name:`renderPostProcess`,docblock:null,modifiers:[],params:[{name:`postprocess`,optional:!1,type:{name:`PostProcess`,alias:`PostProcess`}},{name:`input`,optional:!0,type:{name:`GLP.GLPowerFrameBuffer`,alias:`GLP.GLPowerFrameBuffer`}},{name:`canvasSize`,optional:!0,type:{name:`MTP.Vector`,alias:`MTP.Vector`}},{name:`renderOption`,optional:!0,type:{name:`RenderOption`,alias:`RenderOption`}}],returns:null},{name:`draw`,docblock:null,modifiers:[],params:[{name:`drawId`,optional:!1,type:{name:`string`}},{name:`renderType`,optional:!1,type:{name:`union`,raw:`"shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"`,elements:[{name:`literal`,value:`"shadowMap"`},{name:`literal`,value:`"deferred"`},{name:`literal`,value:`"forward"`},{name:`literal`,value:`"envMap"`},{name:`literal`,value:`'ui'`},{name:`literal`,value:`"postprocess"`}],alias:`MaterialRenderType`}},{name:`geometry`,optional:!1,type:{name:`Geometry`,alias:`Geometry`}},{name:`material`,optional:!1,type:{name:`Material`,alias:`Material`}},{name:`param`,optional:!0,type:{name:`DrawParam`,alias:`DrawParam`}}],returns:null},{name:`applyPipelineConfig`,docblock:null,modifiers:[],params:[{name:`config`,optional:!1,type:{name:`signature`,type:`object`,raw:`{
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// lightShaft の細かい調整（WebGPU バックエンドのみ。WebGL は無視する）
	lightShaftIntensity?: number;
	lightShaftBlur?: boolean;
	lightShaftTemporal?: boolean;
	lightShaftTemporalBlend?: number;
}`,signature:{properties:[{key:`motionBlur`,value:{name:`boolean`,required:!1}},{key:`motionBlurPower`,value:{name:`number`,required:!1}},{key:`ssr`,value:{name:`boolean`,required:!1}},{key:`ssao`,value:{name:`boolean`,required:!1}},{key:`lightShaft`,value:{name:`boolean`,required:!1}},{key:`dof`,value:{name:`boolean`,required:!1}},{key:`lightShaftIntensity`,value:{name:`number`,required:!1}},{key:`lightShaftBlur`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporal`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporalBlend`,value:{name:`number`,required:!1}}]},alias:`PipelineConfig`}}],returns:{type:{name:`void`}}},{name:`pipelineConfig`,docblock:null,modifiers:[`get`],params:[],returns:{type:{name:`signature`,type:`object`,raw:`{
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// lightShaft の細かい調整（WebGPU バックエンドのみ。WebGL は無視する）
	lightShaftIntensity?: number;
	lightShaftBlur?: boolean;
	lightShaftTemporal?: boolean;
	lightShaftTemporalBlend?: number;
}`,signature:{properties:[{key:`motionBlur`,value:{name:`boolean`,required:!1}},{key:`motionBlurPower`,value:{name:`number`,required:!1}},{key:`ssr`,value:{name:`boolean`,required:!1}},{key:`ssao`,value:{name:`boolean`,required:!1}},{key:`lightShaft`,value:{name:`boolean`,required:!1}},{key:`dof`,value:{name:`boolean`,required:!1}},{key:`lightShaftIntensity`,value:{name:`number`,required:!1}},{key:`lightShaftBlur`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporal`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporalBlend`,value:{name:`number`,required:!1}}]}}}},{name:`resize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`compileShaders`,docblock:null,modifiers:[`async`],params:[{name:`root`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`view`,optional:!1,type:{name:`RenderViewContract`,alias:`RenderViewContract`}},{name:`event`,optional:!1,type:{name:`EntityUpdateEvent`,alias:`EntityUpdateEvent`}},{name:`cb`,optional:!0,type:{name:`signature`,type:`function`,raw:`( label: string, loaded: number, total: number ) => void`,signature:{arguments:[{type:{name:`string`},name:`label`},{type:{name:`number`},name:`loaded`},{type:{name:`number`},name:`total`}],return:{name:`void`}}}}],returns:null},{name:`createTexProcedural`,docblock:null,modifiers:[],params:[{name:`param`,optional:!1,type:{name:`TexProceduralParam`,alias:`TexProceduralParam`}}],returns:{type:{name:`TexProcedural`}}}],displayName:`Renderer`}})))()}var ka;function Aa(){return(Aa=t((()=>{_i(),ka=class extends gi{_passes;date;constructor(e){super({...e}),this._passes=e.passes,this.date=new Date}get passes(){return this._passes}compute(e){let t=Math.min(1/60,(new Date().getTime()-this.date.getTime())/1e3);this.date=new Date,this.passes.forEach(e=>{e.uniforms.uDeltaTime.value=t}),e.renderPostProcess(this)}}})))()}function ja(){return(ja=t((()=>{})))()}var Ma;function Na(){return(Na=t((()=>{ci(),Zn(),bi(),ja(),Ma=class extends I{size;layerCnt;clearColor;rt1;rt2;outputUniforms;constructor(e,t){let n=Object.assign({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA,magFilter:N.NEAREST,minFilter:N.NEAREST},t.textureParam),r=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),i=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),a={uGPUResolution:{value:t.size,type:`2fv`}};for(let e=0;e<t.dataLayerCount;e++)a[`uGPUSampler`+e]={value:i.textures[e],type:`1i`};super(e,{...t,vert:t.vert||`layout ( location = 0 ) in vec3 position;\r
layout ( location = 1 ) in vec2 uv;\r
\r
out vec2 vUv;\r
\r
\r
void main( void ) {\r
\r
	vec3 pos = position;\r
	gl_Position = vec4( pos.xy, 0.0, 1.0 );\r
	vUv = uv;\r
\r
}`,renderTarget:r,uniforms:si.merge(t.uniforms,a,{uDeltaTime:{value:0,type:`1f`}})}),this.size=t.size,this.layerCnt=t.dataLayerCount,this.rt1=r,this.rt2=i,this.renderTarget=this.rt1,this.clearColor=t.clearColor??null,this.outputUniforms=a}onAfterRender(){super.onAfterRender();for(let e=0;e<this.layerCnt;e++)this.outputUniforms[`uGPUSampler`+e].value=this.renderTarget.textures[e];let e=this.rt1;this.rt1=this.rt2,this.rt2=e,this.renderTarget=this.rt1}initTexture(e){for(let t=0;t<this.layerCnt;t++){let n=[];for(let r=0;r<this.size.y;r++)for(let i=0;i<this.size.x;i++){let a=i,o=r;n.push(...e(t,a,o))}this.rt2.textures[t].subImage(new Float32Array(n),this.size.x,this.size.y)}}}})))()}function Pa(){return(Pa=t((()=>{Yn(),M(),Ur(),Zn(),hi(),_i(),bi()})))()}function Fa(){return(Fa=t((()=>{P(),Ur(),Dr(),hi()})))()}function Ia(){return(Ia=t((()=>{M(),_i(),Zn(),bi()})))()}function La(){return(La=t((()=>{_i(),bi()})))()}function Ra(){return(Ra=t((()=>{_i(),bi()})))()}function za(){return(za=t((()=>{_i(),bi()})))()}function Ba(){return(Ba=t((()=>{di(),Ia(),La(),Ra(),za()})))()}function L(){return(L=t((()=>{Zn(),li(),Oa(),hi(),Aa(),Na(),di(),Vi(),ua(),Pa(),Fa(),_i(),bi(),Ba(),Si()})))()}var Va;function Ha(){return(Ha=t((()=>{Va=class{static serializeEntity(e,t){let n=e=>{let r=[];e.children.forEach(e=>{e.initiator!=`script`&&r.push(n(e))});let i=[];e.components.forEach(e=>{let n=e.serialize({mode:`export`}),r=Object.keys(n).length>0;if(e.initiator!==`user`)return;let a={name:t.getName(e),uuid:e.uuid};r&&(a.props=n),i.push(a)});for(let t of e.unresolvedComponents)i.push({name:t.name,uuid:t.uuid,props:t.props});return{name:e.name,uuid:e.uuid,pos:e.position.x==0&&e.position.y==0&&e.position.z==0?void 0:e.position.getElm(`vec3`),rot:e.euler.x==0&&e.euler.y==0&&e.euler.z==0?void 0:e.euler.getElm(`vec3`),scale:e.scale.x==1&&e.scale.y==1&&e.scale.z==1?void 0:e.scale.getElm(`vec3`),components:i.length>0?i:void 0,childs:r.length>0?r:void 0}};return n(e)}static deserializeEntity(e,t,n,r){let i=(e,t)=>{let a=t||r.createEntity();a.initiator=`user`,a.name=e.name,a.restoreUUID(e.uuid);let o=e.pos||[0,0,0];a.position.x=o[0],a.position.y=o[1],a.position.z=o[2];let s=e.rot||[0,0,0];a.euler.x=s[0],a.euler.y=s[1],a.euler.z=s[2];let c=e.scale||[1,1,1];return a.scale.x=c[0],a.scale.y=c[1],a.scale.z=c[2],a.unresolvedComponents=[],e.components&&e.components.forEach(e=>{let t=n.resolve(e.name);if(t){let n=a.getComponent(t.component);n||(n=a.addComponent(t.component),n.initiator=`user`),n.restoreUUID(e.uuid),e.props&&n.deserialize(e.props)}else console.warn(`[ProjectSerializer] Component "${e.name}" not found in resolver. Preserving data for round-trip.`),a.unresolvedComponents.push({name:e.name,uuid:e.uuid,props:e.props})}),e.childs&&([...a.children].forEach(e=>{e.initiator!==`script`&&a.remove(e)}),e.childs.forEach(e=>{a.add(i(e))})),a};e&&i(e,t),t.initiator=`god`}}})))()}var Ua;function Wa(){return(Wa=t((()=>{L(),Ua=class extends Sr{name;_frag;_resolution;_filter;_updateEveryFrame;_textures;constructor(e,t){super(),this.name=e;let n=t.data;this._frag=n?.frag||``,this._resolution=n?.resolution||[1024,1024],this._filter=n?.filter||`linear`,this._updateEveryFrame=n?.updateEveryFrame??!1,this._textures=n?.textures||{}}get frag(){return this._frag}get resolution(){return this._resolution}get filter(){return this._filter}get updateEveryFrame(){return this._updateEveryFrame}get textures(){return this._textures}}})))()}var Ga;function Ka(){return(Ka=t((()=>{P(),M(),Wa(),ge(),Ga=class extends rr{_componentList;_componentGroups;_geometryList;_geometryGroups;_textureResources;_textures;_updateEveryFrameTextures;constructor(){super(),this._componentList=[],this._textures=new Map,this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources=new Map,this._updateEveryFrameTextures=[]}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get geometryList(){return this._geometryList}get geometryGroups(){return this._geometryGroups}get textureList(){return Array.from(this._textureResources.values())}get textures(){return this._textures}get updateEveryFrameTextures(){return this._updateEveryFrameTextures}clear(){this._componentList=[],this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources.clear(),this._textures.clear(),this._updateEveryFrameTextures=[],this.emit(`update`)}getComponent(e){return this._componentList.find(t=>t.name==e)}addComponentGroup(e){let t=this._componentGroups.find(t=>t.name==e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addComponent:(e,n)=>{let r={name:e,component:n};t.push(r),this._componentList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._componentGroups.push(t),this.emit(`update`),t}getGeometry(e){return this._geometryList.find(t=>t.name===e)}addGeometryGroup(e){let t=this._geometryGroups.find(t=>t.name===e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addGeometry:(e,n)=>{let r={name:e,geometryClass:n};t.push(r),this._geometryList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._geometryGroups.push(t),this.emit(`update`),t}addTextureResource(e,t){let n=new Ua(e,{data:t});this._textureResources.set(e,n),this.emit(`update`)}getTextureResource(e){return this._textureResources.get(e)}removeTextureResource(e){this._textureResources.delete(e);let t=this._textures.get(e);t&&(t.dispose(),this._textures.delete(e)),this.emit(`update`)}addTexture(e,t){return this._textures.set(e,t),t}getTexture(e){return this._textures.get(e)}_buildTexture(e,t,n,r){let i=e.frag;return i?t.createTexProcedural({name:e.name,frag:i,resolution:new A(e.resolution[0]||1024,e.resolution[1]||1024),filter:e.filter,textures:n,uniforms:e.updateEveryFrame?r:void 0}):null}_ensureTexture(e,t,n,r){let i=this._textures.get(e.name);if(i)return i;if(r.has(e.name))return null;r.add(e.name);let a={},o=e.textures,s=Object.keys(o);for(let e=0;e<s.length;e++){let i=s[e],c=o[i],l=this._textureResources.get(c),u=l?this._ensureTexture(l,t,n,r):this._textures.get(c);u&&(a[i]=u)}let c=this._buildTexture(e,t,a,n);return c?(this._textures.set(e.name,c),e.updateEveryFrame&&this._updateEveryFrameTextures.push(c),c):null}buildTextureInstances(e,t){this._updateEveryFrameTextures=[];let n=new Set;this._textureResources.forEach(r=>{this._ensureTexture(r,e,t,n)}),this.emit(`update`)}}})))()}var qa;function Ja(){return(Ja=t((()=>{M(),L(),Ha(),Ka(),qa=class e extends Sr{static resources;name;_renderer;_root;_uniforms;_time;_frame;_frameSetting;_disposed;_frameEvent;constructor(e){super(),this.name=`OREngine`,this._disposed=!1,this._uniforms={uEnvMapIntensity:{value:1,type:`1f`}},this._renderer=e(this),this._renderer.globalUniforms={uTime:{value:0,type:`1f`},uTimeF:{value:0,type:`1f`},uTimeE:{value:0,type:`1f`},uTimeEF:{value:0,type:`1f`},uDeltaTime:{value:0,type:`1f`},uResolution:{value:new A,type:`2fv`},uAspectRatio:{value:1,type:`1f`}},this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this._frameEvent=null,this._root=this.createEntity({name:`root`}),this._root.initiator=`god`,this.field(`name`,()=>this.name,e=>this.name=e),this.field(`scene`,()=>Va.serializeEntity(this._root,this._createComponentResolver()),e=>{Va.deserializeEntity(e,this._root,this._createComponentResolver(),this)}),this.field(`renderer`,()=>this._renderer.serialize({mode:`export`}),e=>this._renderer.deserialize(e));let t=this.fieldDir(`timeline`);t.field(`duration`,()=>this._frameSetting.duration,e=>this._frameSetting.duration=e),t.field(`fps`,()=>this._frameSetting.fps,e=>this._frameSetting.fps=e)}createEntity(e){return new Jr({engine:this,...e})}get canvas(){return this._renderer.canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}get disposed(){return this._disposed}createView(){return this._renderer.createView()}_createComponentResolver(){return{resolve:t=>e.resources.getComponent(t),getName:t=>{let n=e.resources.componentList.find(e=>t instanceof e.component);return n?n.name:t.constructor.name}}}init(){this._root.disposeRecursive(),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.name=`New Project`}async load(e){this.init(),this.deserialize(e),this.emit(`update/graph`),this.emit(`loaded`)}update(t){let n=new Date().getTime();this._time.delta=(n-this._time.current)/1e3,this._time.current=n,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*+!!this._frame.playing,this._frame.current=this._time.code*60;let r=this.createEntityUpdateEvent({forceDraw:t?.forceDraw});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1,this._renderer.globalUniforms.uDeltaTime.value=Math.min(this._time.delta,1/60);let i=e.resources.updateEveryFrameTextures;for(let e=0;e<i.length;e++)i[e].render();return this._step(r),this._frame.playing&&this.emit(`update/frame/play`,[this._frame]),this._time.delta}_step(e){this._root.commitFrame(e),this._root.update(e),this._root.postUpdate(e),this._root.updateMatrixRecursive(),this._root.prepareRender(e),this._renderer.prepareScene(this._root,e),this._frameEvent=e}render(e){this._frameEvent&&this._renderer.render(e,this._frameEvent)}createEntityUpdateEvent(e){let t={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return e?{...t,...e}:t}setSize(e){this._renderer.resize(e),this._renderer.canvas.width=e.x,this._renderer.canvas.height=e.y,this._renderer.globalUniforms.uResolution.value.copy(e),this._renderer.globalUniforms.uAspectRatio.value=e.x/Math.max(e.y,1)}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(e){this._time.code=e/60,this._frame.current=e,this.emit(`update/frame/play`,[this._frame])}updateOffline(t,n){let r=t/n,i=1/n;this._time.delta=i,this._time.current=new Date().getTime(),this._time.engine+=i,this._time.code=r,this._frame.current=r*60,this._frame.playing=!0;let a=this.createEntityUpdateEvent({forceDraw:!0});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1;let o=e.resources.updateEveryFrameTextures;for(let e=0;e<o.length;e++)o[e].render();this._step(a)}compileShaders(e,t){let n=this.createEntityUpdateEvent({forceDraw:!0});return this.renderer.compileShaders(this._root,e,n,t)}dispose(){this._disposed=!0,this._root.disposeRecursive()}},qa.resources=new Ga,qa.__docgenInfo={description:``,methods:[{name:`createEntity`,docblock:null,modifiers:[],params:[{name:`params`,optional:!0,type:{name:`Omit`,elements:[{name:`MXP.EntityParams`},{name:`literal`,value:`'engine'`}],raw:`Omit<MXP.EntityParams, 'engine'>`,alias:`Omit`}}],returns:{type:{name:`MXP.Entity`}}},{name:`canvas`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`renderer`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`root`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`frame`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`time`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`frameSetting`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`uniforms`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`disposed`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`createView`,docblock:null,modifiers:[],params:[],returns:null},{name:`init`,docblock:null,modifiers:[],params:[],returns:null},{name:`load`,docblock:null,modifiers:[`async`],params:[{name:`project`,optional:!1,type:{name:`OREngineProjectData`,alias:`OREngineProjectData`}}],returns:null},{name:`update`,docblock:null,modifiers:[],params:[{name:`param`,optional:!0,type:{name:`Partial`,elements:[{name:`MXP.EntityUpdateEvent`}],raw:`Partial<MXP.EntityUpdateEvent>`,alias:`Partial`}}],returns:null},{name:`createEntityUpdateEvent`,docblock:null,modifiers:[],params:[{name:`overrideParams`,optional:!0,type:{name:`Partial`,elements:[{name:`MXP.EntityUpdateEvent`}],raw:`Partial<MXP.EntityUpdateEvent>`,alias:`Partial`}}],returns:{type:{name:`MXP.EntityUpdateEvent`}}},{name:`setSize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`play`,docblock:null,modifiers:[],params:[],returns:null},{name:`stop`,docblock:null,modifiers:[],params:[],returns:null},{name:`seek`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`number`}}],returns:null},{name:`updateOffline`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`number`}},{name:`fps`,optional:!1,type:{name:`number`}}],returns:null},{name:`compileShaders`,docblock:null,modifiers:[],params:[{name:`view`,optional:!1,type:{name:`MXP.RenderViewContract`,alias:`MXP.RenderViewContract`}},{name:`onProgress`,optional:!0,type:{name:`signature`,type:`function`,raw:`( label: string, loaded: number, total: number ) => void`,signature:{arguments:[{type:{name:`string`},name:`label`},{type:{name:`number`},name:`loaded`},{type:{name:`number`},name:`total`}],return:{name:`void`}}}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`Engine`}})))()}var Ya;function Xa(){return(Xa=t((()=>{P(),Ya=class extends rr{_pressedKeys;constructor(){super(),this._pressedKeys={};let e=this._onKeyDown.bind(this),t=this._onKeyUp.bind(this);window.addEventListener(`keydown`,e),window.addEventListener(`keyup`,t),this.once(`dispose`,()=>{window.removeEventListener(`keydown`,e),window.removeEventListener(`keyup`,t)})}get pressedKeys(){return this._pressedKeys}_onKeyDown(e){this._pressedKeys[e.key]=!0,this.emit(`keydown`,[e,this._pressedKeys])}_onKeyUp(e){if(this._pressedKeys[e.key]=!1,e.key==`Meta`||e.key==`Control`){let e=Object.keys(this._pressedKeys);for(let t=0;t<e.length;t++)this._pressedKeys[e[t]]=!1}this.emit(`keyup`,[e,this._pressedKeys])}dispose(){this.emit(`dispose`)}}})))()}var Za;function Qa(){return(Qa=t((()=>{P(),M(),Za=class extends rr{_isTouching;element=null;position;delta;constructor(){super(),this.position=new A(NaN,NaN),this.delta=new A(NaN,NaN),this._isTouching=!1;let e=this._onPointer.bind(this,`move`),t=this._onPointer.bind(this,`end`);window.addEventListener(`pointermove`,e),window.addEventListener(`pointerup`,t),window.addEventListener(`dragend`,t);let n=()=>{this.element&&this.removeElement(this.element),window.removeEventListener(`pointermove`,e),window.removeEventListener(`pointerup`,t),window.removeEventListener(`dragend`,t),this.off(`dispose`,n)};this.on(`dispose`,n)}setElement(e){this.element&&this.removeElement(this.element),this.element=e;let t=this._onPointer.bind(this,`start`);e.addEventListener(`pointerdown`,t);let n=r=>{e.isEqualNode(r.elm)&&(e.removeEventListener(`pointerdown`,t),this.off(`unregister`,n))};this.on(`unregister`,n)}removeElement(e){this.emit(`unregister`,[e])}getScreenPosition(e){if(this.position.x!=this.position.x)return new A(NaN,NaN);let t=this.position.clone().divide(e).multiply(2).sub(1);return t.y*=-1,t}getRelativePosition(e,t){let n=e.getClientRects()[0],r=this.position.x-n.left,i=this.position.y-n.top;return t&&(r/=n.width,i/=n.height),new A(r,i)}_setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}_onPointer(e,t){let n=t.pointerType;(n==null||n==`mouse`&&(t.button==-1||t.button==0)||n==`touch`)&&this._touchEventHandler(t.pageX,t.pageY,e,t)}_touchEventHandler(e,t,n,r){let i=!1,a=e-window.pageXOffset,o=t-window.pageYOffset;n==`start`?(this._isTouching=!0,this._setPos(a,o),this.delta.set(0,0),i=!0):n==`move`?(this._setPos(a,o),this._isTouching&&(i=!0)):n==`end`&&(`targetTouches`in r?r.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,i=!0),i&&this.emit(n,[{pointerEvent:r,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit(`dispose`)}}})))()}function $a(){return($a=t((()=>{Ja(),Ka(),Xa(),Qa()})))()}function eo(){return(eo=t((()=>{$a()})))()}var to,no;function ro(){return(ro=t((()=>{to=i(),no=(0,to.createContext)(null)})))()}var io,ao;function oo(){return(oo=t((()=>{io=i(),ro(),ao=()=>{let e=(0,io.useContext)(no);if(e===null)throw Error(`useMouseMenu must be used within a MouseMenuProvider`);return e}})))()}var so,co;function lo(){return(lo=t((()=>{so=i(),co=(0,so.createContext)(void 0)})))()}var uo,fo;function po(){return(po=t((()=>{uo=i(),lo(),fo=()=>(0,uo.useContext)(co)})))()}var mo,ho,go,_o,vo;function yo(){return(yo=t((()=>{mo=`ComponentAdd__compoAdd___LmNvb`,ho=`ComponentAdd__directory___LmNvb`,go=`ComponentAdd__subDirectory___LmNvb`,_o=`ComponentAdd__picker___LmNvb`,vo={compoAdd:mo,directory:ho,subDirectory:go,picker:_o}})))()}var bo,xo,So,Co;function wo(){return(wo=t((()=>{bo=e(i(),1),eo(),u(),D(),oo(),po(),yo(),xo=s(),So=({group:e,onClickAdd:t})=>{let n=fo(),[r,i]=(0,bo.useState)(!1),a=null,o,s=`dir`,c=e.name.startsWith(`_`)?e.name.slice(1):e.name;`child`in e?a=(0,xo.jsx)(xo.Fragment,{children:e.child.map((e,n)=>(0,xo.jsx)(So,{group:e,onClickAdd:t},n))}):(o=()=>t(e),s=`item`);let l=window.matchMedia(`(hover: hover)`).matches;return(0,xo.jsxs)(`div`,{className:vo.directory,onPointerEnter:l?()=>i(!0):void 0,onPointerLeave:l?()=>i(!1):void 0,onClick:e=>{o?o():(e.stopPropagation(),i(!r))},"data-type":s,"data-direction":n?.direction,children:[c,r&&(0,xo.jsx)(`div`,{className:vo.subDirectory,children:a})]})},Co=e=>{let{editor:t}=E(),{pushContent:n,closeAll:r}=ao(),i=qa.resources,a=(0,bo.useCallback)(a=>{if(!i||!n||!r)return;let o=[],s=n=>{t.api.addComponent(e.entity,n.component),r()};i.componentGroups.forEach((e,t)=>{o.push((0,xo.jsx)(So,{group:e,onClickAdd:s},t))}),n((0,xo.jsx)(`div`,{className:vo.picker,children:o}))},[n,i,e.entity,r,t]);return(0,xo.jsx)(`div`,{className:vo.compAdd,children:(0,xo.jsx)(d,{onClick:a,children:`Add Component`})})},Co.__docgenInfo={description:``,methods:[],displayName:`ComponentAdd`,props:{entity:{required:!0,tsType:{name:`MXP.Entity`},description:``}}}})))()}var To,Eo,Do,Oo,ko,Ao;function jo(){return(jo=t((()=>{To=`ComponentView__compoView___LmNvb`,Eo=`ComponentView__head___LmNvb`,Do=`ComponentView__name___LmNvb`,Oo=`ComponentView__check___LmNvb`,ko=`ComponentView__propertyBlock___LmNvb`,Ao={compoView:To,head:Eo,name:Do,check:Oo,delete:`ComponentView__delete___LmNvb`,propertyBlock:ko}})))()}var Mo,No,Po,Fo;function Io(){return(Io=t((()=>{Mo=i(),c(),ee(),D(),wn(),Tn(),jo(),No=s(),Po=e=>{let t=Object.keys(e.childs);for(let n=0;n<t.length;n++){let r=e.childs[t[n]],{opt:i}=r,a=!1;if(i&&(a=typeof i.hidden==`function`?i.hidden(r.type===`value`?r.value:null):i.hidden||!1),!a&&(r.type===`value`||Po(r)))return!0}return!1},Fo=({component:e})=>{let{editor:t}=E(),[n,r]=k(e,`enabled`),i=e.initiator!==`user`,a=Po(e.serializeToDirectory()),o=(0,Mo.useCallback)(n=>{n.stopPropagation();let r=e.entity;if(r){for(let[n,i]of r.components)if(i.uuid===e.uuid){t.api.removeComponent(r,n,e);break}}},[e,t]),s=(0,No.jsxs)(`div`,{className:Ao.head,children:[(0,No.jsx)(`div`,{className:Ao.name,children:e.constructor.name}),(0,No.jsx)(`div`,{className:Ao.delete,children:(0,No.jsx)(`button`,{onClick:o,children:(0,No.jsx)(C,{})})})]});return(0,No.jsx)(`div`,{className:Ao.compoView,"data-disable_component":i,children:(0,No.jsx)(`div`,{className:Ao.content,children:(0,No.jsx)(l,{label:s,accordion:a,bg:!0,defaultClose:!1,children:a&&(0,No.jsx)(Cn,{target:e})})})})},Fo.__docgenInfo={description:``,methods:[],displayName:`ComponentView`,props:{component:{required:!0,tsType:{name:`MXP.Component`},description:``}}}})))()}var Lo,Ro;function zo(){return(zo=t((()=>{Lo=`ComponentList__container___LmNvb`,Ro={container:Lo}})))()}var Bo,Vo,Ho;function Uo(){return(Uo=t((()=>{Bo=i(),Tn(),Io(),zo(),Vo=s(),Ho=({entity:e})=>{let[t]=k(e,`components`),n=(0,Bo.useMemo)(()=>{let n=[];return t?(t.forEach(t=>{let r=e.getComponentByUUID(t);r&&n.push((0,Vo.jsx)(Fo,{component:r},r.uuid))}),n):null},[t,e]);return(0,Vo.jsx)(`div`,{className:Ro.container,children:n})},Ho.__docgenInfo={description:``,methods:[],displayName:`ComponentList`}})))()}var Wo,Go,Ko;function qo(){return(qo=t((()=>{Wo=i(),c(),D(),wn(),Tn(),wo(),Uo(),Go=s(),Ko=()=>{let{editor:e,engine:t}=E(),[n]=k(e,`selectedEntityId`),r=(0,Wo.useMemo)(()=>{if(n)return t.root.findEntityByUUID(n)},[t,n]);return r?(0,Go.jsxs)(Go.Fragment,{children:[(0,Go.jsx)(l,{label:`Fields`,accordion:!0,children:(0,Go.jsx)(Cn,{target:r})}),(0,Go.jsxs)(l,{label:`Components`,accordion:!0,children:[(0,Go.jsx)(Ho,{entity:r}),(0,Go.jsx)(Co,{entity:r})]})]}):null},Ko.__docgenInfo={description:``,methods:[],displayName:`EntityProperty`}})))()}var Jo,Yo;function Xo(){return(Xo=t((()=>{Jo=i(),Yo=(0,Jo.createContext)(null)})))()}var Zo,Qo;function $o(){return($o=t((()=>{Zo=i(),Xo(),Qo=()=>{let e=(0,Zo.useContext)(Yo);if(e===null)throw Error(`useOREngine must be used within a OREngineProvider`);return e}})))()}var es,ts,ns,rs,is,as,os,ss,cs,ls,us,ds,fs,ps,ms,hs,gs,_s,R;function vs(){return(vs=t((()=>{es=`GPUTimer__container___LmNvb`,ts=`GPUTimer__headerRow___LmNvb`,ns=`GPUTimer__totalTime___LmNvb`,rs=`GPUTimer__toggleButton___LmNvb`,is=`GPUTimer__controls___LmNvb`,as=`GPUTimer__control___LmNvb`,os=`GPUTimer__controlLabel___LmNvb`,ss=`GPUTimer__select___LmNvb`,cs=`GPUTimer__input___LmNvb`,ls=`GPUTimer__group___LmNvb`,us=`GPUTimer__item___LmNvb`,ds=`GPUTimer__clickable___LmNvb`,fs=`GPUTimer__itemRow___LmNvb`,ps=`GPUTimer__itemName___LmNvb`,ms=`GPUTimer__itemTime___LmNvb`,hs=`GPUTimer__itemStats___LmNvb`,gs=`GPUTimer__progressBar___LmNvb`,_s=`GPUTimer__progressFill___LmNvb`,R={container:es,headerRow:ts,totalTime:ns,toggleButton:rs,controls:is,control:as,controlLabel:os,select:ss,input:cs,group:ls,item:us,clickable:ds,itemRow:fs,itemName:ps,itemTime:ms,itemStats:hs,progressBar:gs,progressFill:_s}})))()}var ys,bs;function xs(){return(xs=t((()=>{ys=class{buffer;index;size;filled;constructor(e){this.size=e,this.buffer=Array(e),this.index=0,this.filled=!1}push(e){this.buffer[this.index]=e,this.index=(this.index+1)%this.size,!this.filled&&this.index===0&&(this.filled=!0)}getAverage(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=0;for(let n=0;n<e;n++)t+=this.buffer[n];return t/e}getMax(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]>t&&(t=this.buffer[n]);return t}getMin(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]<t&&(t=this.buffer[n]);return t}getCount(){return this.filled?this.size:this.index}},bs=class{buffers;windowSize;currentData;constructor(e=30){this.windowSize=e,this.buffers=new Map,this.currentData=new Map}update(e){let t=performance.now();for(let n=0;n<e.length;n++){let r=e[n],i=r.name.split(`/`),a=i[0]||`unknown`,o,s=i[i.length-1],c=s&&s.match(/\[([^\]]+)\]/);c&&(o=c[1]);let l={name:r.name,duration:r.duration,timestamp:t,renderType:a},u=this.buffers.get(r.name);u||(u=new ys(this.windowSize),this.buffers.set(r.name,u)),u.push(r.duration),this.currentData.set(r.name,{...l,entityId:o})}}getStatistics(){let e=[],t=0,n=performance.now(),r=[];return this.currentData.forEach((e,t)=>{n-e.timestamp>1e3&&r.push(t)}),r.forEach(e=>{this.currentData.delete(e)}),this.currentData.forEach(e=>{t+=e.duration}),this.currentData.forEach(n=>{let r=this.buffers.get(n.name);r&&e.push({name:n.name,renderType:n.renderType,entityId:n.entityId,current:n.duration,avg:r.getAverage(),max:r.getMax(),min:r.getMin(),samples:r.getCount(),percentage:t>0?n.duration/t*100:0})}),e}getTotalTime(){let e=0;return this.currentData.forEach(t=>{e+=t.duration}),e}}})))()}var Ss,z,Cs,ws,Ts,Es;function Ds(){return(Ds=t((()=>{Ss=i(),$o(),D(),vs(),xs(),z=s(),Cs=e=>{if(e<2){let t=e/2;return`rgb(${Math.floor(100+t*100)}, 200, 100)`}if(e<5){let t=(e-2)/3;return`rgb(200, ${Math.floor(200-t*50)}, 100)`}if(e<10){let t=(e-5)/5;return`rgb(200, ${Math.floor(150-t*80)}, ${Math.floor(100-t*50)})`}return`rgb(200, 70, 50)`},ws=e=>e>=10?e.toFixed(1):e>=1?e.toFixed(2):e.toFixed(3),Ts=e=>e.replace(/\[([^\]]{4,})\]/g,(e,t)=>`[${t.slice(0,3)}]`),Es=()=>{let{editor:e}=E(),{engine:t}=Qo(),[n,r]=(0,Ss.useState)([]),[i,a]=(0,Ss.useState)(0),[o,s]=(0,Ss.useState)(`all`),[c,l]=(0,Ss.useState)(0),[u,d]=(0,Ss.useState)(`time`),[f,p]=(0,Ss.useState)(!1),m=(0,Ss.useRef)(new bs(30)),h=(0,Ss.useRef)(0),g=(0,Ss.useRef)(!1),_=(0,Ss.useRef)(0),v=(0,Ss.useCallback)(n=>{if(!n)return;let r=t.root.findEntityByUUID(n);r&&e.selectEntity(r)},[t,e]);(0,Ss.useEffect)(()=>{let e=t.renderer,n=m.current,i=e=>{f&&(n.update(e),g.current=!0)},o=e=>{g.current&&e-_.current>=300&&(r(n.getStatistics()),a(n.getTotalTime()),g.current=!1,_.current=e),h.current=requestAnimationFrame(o)};return e.on(`timer`,i),h.current=requestAnimationFrame(o),()=>{e.off(`timer`,i),cancelAnimationFrame(h.current)}},[t,f]);let y=n.filter(e=>!(o!==`all`&&e.renderType!==o||e.avg<c)),b=Array.from(new Set(n.map(e=>e.renderType))),x=[...y].sort((e,t)=>u===`time`?t.avg-e.avg:e.name.localeCompare(t.name)),S=i>0?Math.floor(1e3/i):0;return(0,z.jsxs)(`div`,{className:R.container,children:[(0,z.jsxs)(`div`,{className:R.headerRow,children:[(0,z.jsxs)(`span`,{className:R.totalTime,children:[ws(i),`ms (`,S,`fps)`]}),(0,z.jsx)(`button`,{className:R.toggleButton,onClick:()=>p(!f),title:f?`Stop timer`:`Start timer`,children:f?`⏸`:`▶`})]}),(0,z.jsxs)(`div`,{className:R.controls,children:[(0,z.jsxs)(`div`,{className:R.control,children:[(0,z.jsx)(`span`,{className:R.controlLabel,children:`Type`}),(0,z.jsxs)(`select`,{className:R.select,value:o,onChange:e=>s(e.target.value),children:[(0,z.jsx)(`option`,{value:`all`,children:`All`}),b.map(e=>(0,z.jsx)(`option`,{value:e,children:e},e))]})]}),(0,z.jsxs)(`div`,{className:R.control,children:[(0,z.jsx)(`span`,{className:R.controlLabel,children:`Min`}),(0,z.jsx)(`input`,{className:R.input,type:`number`,min:`0`,step:`0.1`,value:c,onChange:e=>l(parseFloat(e.target.value)||0)})]}),(0,z.jsxs)(`div`,{className:R.control,children:[(0,z.jsx)(`span`,{className:R.controlLabel,children:`Sort`}),(0,z.jsxs)(`select`,{className:R.select,value:u,onChange:e=>d(e.target.value),children:[(0,z.jsx)(`option`,{value:`time`,children:`Time`}),(0,z.jsx)(`option`,{value:`name`,children:`Name`})]})]})]}),(0,z.jsx)(`div`,{className:R.group,children:x.map((e,t)=>{let n=Cs(e.avg),r=i>0?e.avg/i*100:0,a=!!e.entityId;return(0,z.jsxs)(`div`,{className:`${R.item} ${a?R.clickable:``}`,onClick:()=>v(e.entityId),children:[(0,z.jsxs)(`div`,{className:R.itemRow,children:[(0,z.jsx)(`span`,{className:R.itemName,title:e.name,children:Ts(e.name)}),(0,z.jsx)(`span`,{className:R.itemTime,style:{color:n},children:ws(e.avg)}),(0,z.jsx)(`span`,{className:R.itemStats,children:ws(e.max)})]}),(0,z.jsx)(`div`,{className:R.progressBar,children:(0,z.jsx)(`div`,{className:R.progressFill,style:{width:`${r}%`,backgroundColor:n}})})]},e.name+t)})})]})},Es.__docgenInfo={description:``,methods:[],displayName:`Timer`}})))()}var Os,ks,As,js,Ms,Ns;function Ps(){return(Ps=t((()=>{Os=`Picker__picker___LnBpY`,ks=`Picker__picker_label___LnBpY`,As=`Picker__picker_list___LnBpY`,js=`Picker__picker_list_inner___LnBpY`,Ms=`Picker__item___LnBpY`,Ns={picker:Os,picker_label:ks,picker_list:As,picker_list_inner:js,item:Ms}})))()}var Fs,Is;function Ls(){return(Ls=t((()=>{Ps(),Fs=s(),Is=e=>(0,Fs.jsxs)(`div`,{className:Ns.picker,"data-no_bg":e.noBg,children:[e.label&&(0,Fs.jsx)(`div`,{className:Ns.picker_label,children:e.label}),(0,Fs.jsx)(`div`,{className:Ns.picker_list,children:(0,Fs.jsx)(`div`,{className:Ns.picker_list_inner,children:e.list.map((e,t)=>(0,Fs.jsx)(`div`,{className:Ns.item,onClick:e.onClick,children:e.label},t))})})]}),Is.__docgenInfo={description:``,methods:[],displayName:`Picker`,props:{label:{required:!1,tsType:{name:`string`},description:``},list:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	label: string,
	onClick?: () => void
}`,signature:{properties:[{key:`label`,value:{name:`string`,required:!0}},{key:`onClick`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!1}}]}}],raw:`SelectListItem[]`},description:``},noBg:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var Rs,zs,Bs;function Vs(){return(Vs=t((()=>{Rs=`InputGroup__group___Lmdyb`,zs=`InputGroup__submit___Lmdyb`,Bs={group:Rs,submit:zs}})))()}var Hs,Us,Ws;function Gs(){return(Gs=t((()=>{Hs=i(),c(),u(),At(),Vs(),Us=s(),Ws=e=>{let t=e.initialValues,n=[],[r,i]=(0,Hs.useState)(t);(0,Hs.useEffect)(()=>{i(t)},[t]);let a=Object.keys(r);for(let e=0;e<a.length;e++){let t=a[e],o=r[t];n.push((0,Us.jsx)(O,{label:t,value:o,onChange:e=>{i({...r,[t]:e})}},e))}let o=(0,Hs.useRef)(null);return(0,Hs.useEffect)(()=>{setTimeout(()=>{o.current&&o.current.querySelector(`input`)?.focus()},0)},[]),(0,Us.jsx)(`div`,{className:Bs.group,ref:o,children:(0,Us.jsxs)(`form`,{onSubmit:e=>{e.preventDefault()},children:[(0,Us.jsx)(l,{label:e.title,noMargin:!0,children:n}),(0,Us.jsx)(`div`,{className:Bs.submit,children:(0,Us.jsx)(d,{type:`submit`,onClick:()=>{e.onSubmit&&e.onSubmit(r)},children:`OK`})})]})})},Ws.__docgenInfo={description:``,methods:[],displayName:`InputGroup`,props:{title:{required:!1,tsType:{name:`string`},description:``},initialValues:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{[key: string]:ValueType}`,signature:{properties:[{key:{name:`string`},value:{name:`SerializeFieldObjective`,required:!0}}]}},description:``},onSubmit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( values: {[key: string]:ValueType} ) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{[key: string]:ValueType}`,signature:{properties:[{key:{name:`string`},value:{name:`SerializeFieldObjective`,required:!0}}]}},name:`values`}],return:{name:`void`}}},description:``}}}})))()}var Ks,qs,Js,Ys,Xs,Zs,Qs,$s,ec,tc,nc,rc;function ic(){return(ic=t((()=>{Ks=`HierarchyNode__node___Lm5vZ`,qs=`HierarchyNode__self___Lm5vZ`,Js=`HierarchyNode__self_name___Lm5vZ`,Ys=`HierarchyNode__icon___Lm5vZ`,Xs=`HierarchyNode__selectable___Lm5vZ`,Zs=`HierarchyNode__visibility___Lm5vZ`,Qs=`HierarchyNode__menu___Lm5vZ`,$s=`HierarchyNode__fold___Lm5vZ`,ec=`HierarchyNode__fold_button___Lm5vZ`,tc=`HierarchyNode__child___Lm5vZ`,nc=`HierarchyNode__child_line___Lm5vZ`,rc={node:Ks,self:qs,self_name:Js,icon:Ys,selectable:Xs,visibility:Zs,menu:Qs,fold:$s,fold_button:ec,child:tc,child_line:nc}})))()}var ac,B,oc;function sc(){return(sc=t((()=>{ac=i(),L(),a(),f(),m(),_(),h(),b(),D(),Ls(),oo(),Gs(),Tn(),ic(),B=s(),oc=e=>{let{editor:t,engine:n}=E(),[r]=k(t,`selectedEntityId`),i=r!==void 0&&n.root.findEntityByUUID(r),[a,s]=k(e.entity,`visible`),[c,l]=k(t,`unselectableEntityIds`),[u]=k(e.entity,`children`),d=!(c||[]).includes(e.entity.uuid),f=(u||[]).map(e=>n.root.findEntityByUUID(e)).filter(e=>e!==void 0),m=e.depth||0,h=f&&f.concat().sort((e,t)=>e.name.localeCompare(t.name))||[],_=h.length>0,b=m*20,x=e.entity.initiator==`script`,C=(0,ac.useMemo)(()=>e.entity.getComponent(Br)?(0,B.jsx)(S,{size:14}):e.entity.getComponent(Ir)?(0,B.jsx)(p,{size:14}):e.entity.getComponent(F)?(0,B.jsx)(y,{size:14}):null,[e.entity]),ee=e.openNodes.has(e.entity.uuid),te=(0,ac.useCallback)(t=>{e.setNodeOpen(e.entity.uuid,!ee),t.stopPropagation()},[ee,e]),ne=(0,ac.useCallback)(()=>{t&&t.selectEntity(e.entity)},[t,e.entity]),re=(0,ac.useCallback)(e=>{e.stopPropagation(),s&&s(!a)},[a,s]),ie=(0,ac.useCallback)(t=>{t.stopPropagation();let n=new Set(c||[]);d?n.add(e.entity.uuid):n.delete(e.entity.uuid),l(Array.from(n))},[d,c,l,e.entity.uuid]),{pushContent:w,closeAll:ae}=ao(),oe=(0,ac.useCallback)(n=>{n.preventDefault(),!(!t||!w||!ae||x)&&(t.selectEntity(e.entity),w((0,B.jsx)(Is,{label:e.entity.name,list:[{label:`Add Entity`,onClick:()=>{w((0,B.jsx)(Ws,{initialValues:{name:``},onSubmit:n=>{let r=t.api.createEntity(e.entity,n.name);t.api.selectEntity(r),ae()}}))}},{label:`Delete Entity`,onClick:()=>{t.api.deleteEntity(e.entity),ae()}}]})))},[t,e.entity,w,ae,x]);return(0,B.jsxs)(`div`,{className:rc.node,"data-no_export":x,children:[(0,B.jsxs)(`div`,{className:rc.self,style:{paddingLeft:b},onClick:ne,onContextMenu:oe,"data-selected":i&&i.uuid==e.entity.uuid,children:[(0,B.jsx)(`div`,{className:rc.fold,"data-hnode_open":ee,children:_&&(0,B.jsx)(`button`,{className:rc.fold_button,onClick:te,children:(0,B.jsx)(o,{open:ee})})}),C&&(0,B.jsx)(`div`,{className:rc.icon,children:C}),(0,B.jsx)(`div`,{className:rc.self_name,children:(0,B.jsx)(`p`,{children:e.entity.name||`-`})}),(0,B.jsx)(`button`,{className:rc.selectable,onClick:ie,"data-selectable":d,children:(0,B.jsx)(g,{size:14,selectable:d})}),(0,B.jsx)(`button`,{className:rc.visibility,onClick:re,"data-visible":a!==!1,children:(0,B.jsx)(v,{size:14,visible:a!==!1})}),!x&&(0,B.jsx)(`button`,{className:rc.menu,onClick:oe,children:`⋯`})]}),_&&(0,B.jsxs)(`div`,{className:rc.child,"data-open":ee,children:[h.map(t=>(0,B.jsx)(oc,{entity:t,depth:m+1,openNodes:e.openNodes,setNodeOpen:e.setNodeOpen},t.uuid)),(0,B.jsx)(`div`,{className:rc.child_line,style:{marginLeft:b+4}})]})]})},oc.__docgenInfo={description:``,methods:[],displayName:`HierarchyNode`,props:{depth:{required:!1,tsType:{name:`number`},description:``},entity:{required:!0,tsType:{name:`MXP.Entity`},description:``},openNodes:{required:!0,tsType:{name:`Set`,elements:[{name:`string`}],raw:`Set<string>`},description:``},setNodeOpen:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( uuid: string, open: boolean ) => void`,signature:{arguments:[{type:{name:`string`},name:`uuid`},{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``}}}})))()}var cc;function lc(){return(lc=t((()=>{cc={}})))()}var uc,dc,fc,pc,mc,hc;function gc(){return(gc=t((()=>{uc=i(),D(),Tn(),sc(),lc(),dc=s(),fc=`hierarchyOpenNodes`,pc=()=>{try{let e=localStorage.getItem(fc);if(e)return new Set(JSON.parse(e))}catch{}return new Set},mc=e=>{localStorage.setItem(fc,JSON.stringify(Array.from(e)))},hc=()=>{let{editor:e,engine:t}=E(),[n]=k(e,`selectedEntityId`),r=t.root,[i,a]=(0,uc.useState)(pc),o=(0,uc.useCallback)((e,t)=>{a(n=>{let r=new Set(n);return t?r.add(e):r.delete(e),mc(r),r})},[]);return(0,uc.useEffect)(()=>{if(!n)return;let e=r.findEntityByUUID(n);if(!e)return;let t=[],i=e.parent;for(;i;)t.push(i.uuid),i=i.parent;a(e=>{if(t.every(t=>e.has(t)))return e;let n=new Set(e);return t.forEach(e=>n.add(e)),mc(n),n})},[n,r]),(0,dc.jsx)(`div`,{className:cc.hierarchy,children:r&&(0,dc.jsx)(oc,{entity:r,openNodes:i,setNodeOpen:o})})},hc.__docgenInfo={description:``,methods:[],displayName:`Hierarchy`}})))()}var _c,vc,yc,bc,xc,Sc,Cc,wc,Tc;function Ec(){return(Ec=t((()=>{_c=`InputWindow__inputWindow___Lmluc`,vc=`InputWindow__overlay___Lmluc`,yc=`InputWindow__window___Lmluc`,bc=`InputWindow__label___Lmluc`,xc=`InputWindow__input___Lmluc`,Sc=`InputWindow__buttons___Lmluc`,Cc=`InputWindow__cancelBtn___Lmluc`,wc=`InputWindow__okBtn___Lmluc`,Tc={inputWindow:_c,overlay:vc,window:yc,label:bc,input:xc,buttons:Sc,cancelBtn:Cc,okBtn:wc}})))()}var Dc,Oc,kc;function Ac(){return(Ac=t((()=>{Dc=i(),Fe(),Ec(),Oc=s(),kc=()=>{let{config:e,close:t}=Pe(),n=(0,Dc.useRef)(null),[r,i]=(0,Dc.useState)(``),a=(0,Dc.useRef)(!1);(0,Dc.useEffect)(()=>{e&&(i(String(e.value)),a.current=!0)},[e]),(0,Dc.useEffect)(()=>{a.current&&(a.current=!1,n.current?.focus(),n.current?.select())},[r]);let o=(0,Dc.useCallback)(()=>{e&&(e.type===`number`?e.onChange(Number(r)):e.onChange(r),t())},[e,r,t]),s=(0,Dc.useCallback)(()=>{t()},[t]);return e?(0,Oc.jsxs)(`div`,{className:Tc.inputWindow,children:[(0,Oc.jsx)(`div`,{className:Tc.overlay,onClick:s}),(0,Oc.jsxs)(`div`,{className:Tc.window,children:[e.label&&(0,Oc.jsx)(`div`,{className:Tc.label,children:e.label}),(0,Oc.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),o()},children:[(0,Oc.jsx)(`input`,{ref:n,className:Tc.input,type:`text`,inputMode:e.type===`number`?`decimal`:`text`,value:r,step:e.step,min:e.min,max:e.max,onChange:e=>i(e.target.value),onKeyDown:e=>{e.key===`Escape`&&s()}}),(0,Oc.jsxs)(`div`,{className:Tc.buttons,children:[(0,Oc.jsx)(`button`,{type:`button`,className:Tc.cancelBtn,onClick:s,children:`Cancel`}),(0,Oc.jsx)(`button`,{type:`submit`,className:Tc.okBtn,children:`OK`})]})]})]})]}):null},kc.__docgenInfo={description:``,methods:[],displayName:`InputWindow`}})))()}var jc,Mc;function Nc(){return(Nc=t((()=>{jc=i(),Mc=()=>{let[e,t]=(0,jc.useState)(null);return{config:e,open:(0,jc.useCallback)(e=>{t(e)},[]),close:(0,jc.useCallback)(()=>{t(null)},[])}}})))()}var Pc,Fc;function Ic(){return(Ic=t((()=>{Me(),Nc(),Pc=s(),Fc=e=>{let t=Mc();return(0,Pc.jsx)(je.Provider,{value:t,children:e.children})},Fc.__docgenInfo={description:``,methods:[],displayName:`InputWindowProvider`}})))()}var Lc,Rc,zc,Bc,Vc,Hc;function Uc(){return(Uc=t((()=>{Lc=`MouseMenu__mouseMenu___Lm1vd`,Rc=`MouseMenu__hide___Lm1vd`,zc=`MouseMenu__menuItem___Lm1vd`,Bc=`MouseMenu__menuItem_inner___Lm1vd`,Vc=`MouseMenu__menuItem_inner_inner___Lm1vd`,Hc={mouseMenu:Lc,hide:Rc,menuItem:zc,menuItem_inner:Bc,menuItem_inner_inner:Vc}})))()}var Wc,Gc;function Kc(){return(Kc=t((()=>{lo(),oo(),Uc(),Wc=s(),Gc=()=>{let{itemList:e,containerRef:t,closeAll:n}=ao();return(0,Wc.jsxs)(`div`,{className:Hc.mouseMenu,ref:t,children:[e&&e.length>0&&(0,Wc.jsx)(`div`,{className:Hc.hide,onClick:()=>{n&&n()}}),e&&e.map(e=>{let t=e.pos;return(0,Wc.jsx)(co.Provider,{value:e,children:(0,Wc.jsx)(`div`,{className:Hc.menuItem,style:{left:0,top:0,transform:`translate(${t.x}px, ${t.y}px)`},children:(0,Wc.jsx)(`div`,{className:Hc.menuItem_inner,children:(0,Wc.jsx)(`div`,{className:Hc.menuItem_inner_inner,"data-direction":e.direction,children:e.elm})})})},e.id)})]})},Gc.__docgenInfo={description:``,methods:[],displayName:`MouseMenu`}})))()}var qc,Jc,Yc;function Xc(){return(Xc=t((()=>{qc=i(),Jc=0,Yc=()=>{let e=(0,qc.useRef)(null),t=(0,qc.useRef)({x:0,y:0}),n=(0,qc.useCallback)(e=>{t.current.x=e.clientX,t.current.y=e.clientY},[]);(0,qc.useEffect)(()=>(window.addEventListener(`pointermove`,n),()=>{window.removeEventListener(`pointermove`,n)}),[n]);let[r,i]=(0,qc.useState)([]),a=(0,qc.useRef)(r);a.current=r;let o=(0,qc.useCallback)(e=>{a.current=a.current.filter(t=>t.id!==e),i(a.current)},[]),s=(0,qc.useCallback)(()=>{i([])},[]);return{itemList:r,pushContent:(0,qc.useCallback)(e=>{let n=Jc++,r={x:t.current.x,y:t.current.y},s={id:n,elm:e,pos:r,direction:(r.x<window.innerWidth/2?`right`:`left`)+`-`+(r.y<window.innerHeight/2?`bottom`:`top`),close:()=>o(n)};return i([...a.current,s]),s},[o]),closeAll:s,containerRef:e}}})))()}var Zc,Qc;function $c(){return($c=t((()=>{ro(),Xc(),Zc=s(),Qc=e=>{let t=Yc();return(0,Zc.jsx)(no.Provider,{value:t,children:e.children})},Qc.__docgenInfo={description:``,methods:[],displayName:`MouseMenuProvider`}})))()}function el(e={}){let t=ul([`screen`]),n=e.mainBottom,r=n?ll(`vertical`,[{ratio:712/912,node:t},{ratio:200/912,node:ul(n.tabs,n.active)}]):t;return ll(`vertical`,[{ratio:916/1076,node:ll(`horizontal`,[{ratio:300/1912,node:ll(`vertical`,[{ratio:696/912,node:dl([`scene`],e.leftTop)},{ratio:216/912,node:dl([`timer`],e.leftBottom)}])},{ratio:1312/1912,node:r},{ratio:300/1912,node:dl([`property`,`textures`,`project`,`renderer`,`editor-settings`],e.rightTop)}])},{ratio:160/1076,node:dl([`timeline`],e.footer)}])}function tl(e){return e.type===`pane`?[e]:e.children.flatMap(e=>tl(e.node))}function nl(e,t,n=new Set){let r=new Set,i=new Set,a=e=>{let t=typeof e==`string`&&e!==``&&!r.has(e)?e:crypto.randomUUID();return r.add(t),t},o=e=>{if(typeof e!=`object`||!e)return null;let r=e;if(r.type===`pane`){if(!Array.isArray(r.tabs))return null;let e=[...new Set(r.tabs.filter(e=>typeof e==`string`&&t.has(e)))].filter(e=>!n.has(e)||!i.has(e)&&(i.add(e),!0));if(e.length===0)return null;let o=typeof r.active==`string`&&e.includes(r.active)?r.active:e[0];return{type:`pane`,id:a(r.id),tabs:e,active:o}}if(r.type===`split`){if(r.direction!==`horizontal`&&r.direction!==`vertical`||!Array.isArray(r.children))return null;let e=[];return r.children.forEach(t=>{if(typeof t!=`object`||!t)return;let n=t,r=o(n.node);if(!r)return;let i=typeof n.ratio==`number`&&isFinite(n.ratio)&&n.ratio>0?n.ratio:1;e.push({ratio:i,node:r})}),e.length===0?null:e.length===1?e[0].node:{type:`split`,id:a(r.id),direction:r.direction,children:e}}return null},s=o(e);return s?fl(s):null}function rl(e,t,n){return pl(e,t,e=>e.type!==`pane`||!e.tabs.includes(n)?e:{...e,active:n})}function il(e,t,n,r){return pl(e,t,e=>{if(e.type!==`pane`||e.tabs.includes(n))return e;let t=[...e.tabs];return t.splice(Math.max(0,Math.min(r??t.length,t.length)),0,n),{...e,tabs:t,active:n}})}function al(e,t,n,r,i){if(t===r)return pl(e,t,e=>{if(e.type!==`pane`)return e;let t=e.tabs.indexOf(n);if(t===-1)return e;let r=e.tabs.filter(e=>e!==n),a=i??e.tabs.length,o=Math.max(0,Math.min(t<a?a-1:a,r.length));return o===t?e:(r.splice(o,0,n),{...e,tabs:r,active:n})});let a=tl(e),o=a.find(e=>e.id===t),s=a.find(e=>e.id===r);return!o||!s||!o.tabs.includes(n)||s.tabs.includes(n)?e:il(sl(e,t,n),r,n,i)}function ol(e,t,n,r,i){let a=tl(e),o=a.find(e=>e.id===r);if(!o||!o.tabs.includes(i)||!a.some(e=>e.id===t)||r===t&&o.tabs.length===1)return e;let s=sl(e,r,i),c={type:`pane`,id:crypto.randomUUID(),tabs:[i],active:i},l=pl(s,t,e=>{let t=[{ratio:.5,node:c},{ratio:.5,node:e}];return(n===`right`||n===`bottom`)&&t.reverse(),{type:`split`,id:crypto.randomUUID(),direction:n===`left`||n===`right`?`horizontal`:`vertical`,children:t}});return l===s?e:fl(l)??e}function sl(e,t,n){let r=pl(e,t,e=>{if(e.type!==`pane`||!e.tabs.includes(n))return e;let t=e.tabs.indexOf(n),r=e.tabs.filter(e=>e!==n),i=e.active!==n||r.length===0?e.active:r[Math.min(t,r.length-1)];return{...e,tabs:r,active:i}});return r===e?e:fl(r)??e}function cl(e,t,n){return pl(e,t,e=>e.type!==`split`||e.children.length!==n.length?e:{...e,children:e.children.map((e,t)=>({...e,ratio:n[t]}))})}var ll,ul,dl,fl,pl;function ml(){return(ml=t((()=>{ll=(e,t)=>({type:`split`,id:crypto.randomUUID(),direction:e,children:t}),ul=(e,t)=>({type:`pane`,id:crypto.randomUUID(),tabs:e,active:t??e[0]}),dl=(e,t)=>ul([...e,...t?.tabs??[]],t?.active),fl=e=>{if(e.type===`pane`)return e.tabs.length>0?e:null;let t=[];if(e.children.forEach(n=>{let r=fl(n.node);r&&(r.type===`split`&&r.direction===e.direction?r.children.forEach(e=>t.push({ratio:n.ratio*e.ratio,node:e.node})):t.push(r===n.node?n:{...n,node:r}))}),t.length===0)return null;if(t.length===1)return t[0].node;let n=t.reduce((e,t)=>e+t.ratio,0);return Math.abs(n-1)>1e-6?{...e,children:t.map(e=>({...e,ratio:e.ratio/n}))}:t.length!==e.children.length||t.some((t,n)=>t!==e.children[n])?{...e,children:t}:e},pl=(e,t,n)=>{if(e.id===t)return n(e);if(e.type===`split`){let r=!1,i=e.children.map(e=>{let i=pl(e.node,t,n);return i===e.node?e:(r=!0,{...e,node:i})});if(r)return{...e,children:i}}return e}})))()}function hl(e,t,n){let[r,i]=(0,gl.useState)(null),a=(0,gl.useRef)(e);a.current=e;let o=(0,gl.useRef)(t);o.current=t;let s=(0,gl.useRef)(null);return(0,gl.useEffect)(()=>()=>s.current?.(),[]),{dragState:r,onTabPointerDown:(e,t,r)=>{if(r.button!==0||s.current)return;let c=r.clientX,l=r.clientY,u=!1,d=null,f=r=>{if(r.buttons===0){p(!1);return}if(!u){if(Math.hypot(r.clientX-c,r.clientY-l)<_l)return;u=!0,i({panelId:t,title:n.get(t)?.title??t,startX:r.clientX,startY:r.clientY,target:null})}let o=xl(r.clientX,r.clientY,a.current,e,t);Sl(o,d)||(d=o,i(e=>e&&{...e,target:o}))},p=n=>{if(g(),n&&u&&d){let n=a.current;d.kind===`tabs`?o.current(al(n,e,t,d.paneId,d.index)):d.zone===`center`?o.current(al(n,e,t,d.paneId)):o.current(ol(n,d.paneId,d.zone,e,t))}u&&i(null)},m=()=>p(!0),h=()=>p(!1),g=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,m),window.removeEventListener(`pointercancel`,h),s.current=null};s.current=g,window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,m),window.addEventListener(`pointercancel`,h)}}}var gl,_l,vl,yl,bl,xl,Sl;function Cl(){return(Cl=t((()=>{gl=i(),ml(),_l=4,vl=.25,yl=(e,t)=>{let n={left:e.left,top:e.top,width:e.width,height:e.height};return(t===`left`||t===`right`)&&(n.width/=2),t===`right`&&(n.left+=n.width),(t===`top`||t===`bottom`)&&(n.height/=2),t===`bottom`&&(n.top+=n.height),n},bl=(e,t,n,r,i)=>{if(n.id!==r&&n.tabs.includes(i))return null;let a=[...t.querySelectorAll(`[data-panel-tab-id]`)].filter(e=>e instanceof HTMLElement),o=a.length;for(let t=0;t<a.length;t++){let n=a[t].getBoundingClientRect();if(e<n.left+n.width/2){o=t;break}}let s=t.getBoundingClientRect(),c=o<a.length?a[o].getBoundingClientRect().left:a.length>0?a[a.length-1].getBoundingClientRect().right:s.left;return{kind:`tabs`,paneId:n.id,index:o,rect:{left:c-1,top:s.top,width:2,height:s.height}}},xl=(e,t,n,r,i)=>{let a=document.elementFromPoint(e,t);if(!a)return null;let o=a.closest(`[data-pane-id]`);if(!(o instanceof HTMLElement))return null;let s=tl(n).find(e=>e.id===o.dataset.paneId);if(!s)return null;let c=a.closest(`[data-panel-tab-header]`);if(c instanceof HTMLElement)return bl(e,c,s,r,i);let l=o.querySelector(`[data-panel-content]`);if(!(l instanceof HTMLElement))return null;let u=l.getBoundingClientRect();if(u.width<=0||u.height<=0)return null;let d=(e-u.left)/u.width,f=(t-u.top)/u.height;if(d<0||d>1||f<0||f>1)return null;if(Math.min(d,1-d)>vl&&Math.min(f,1-f)>vl)return s.id===r||s.tabs.includes(i)?null:{kind:`zone`,paneId:s.id,zone:`center`,rect:yl(u,`center`)};if(s.id===r&&s.tabs.length===1)return null;let p=d-.5,m=f-.5,h=Math.abs(p)>=Math.abs(m)?p<0?`left`:`right`:m<0?`top`:`bottom`;return{kind:`zone`,paneId:s.id,zone:h,rect:yl(u,h)}},Sl=(e,t)=>e===null||t===null?e===t:e.paneId===t.paneId?e.kind===`tabs`&&t.kind===`tabs`?e.index===t.index:e.kind===`zone`&&t.kind===`zone`&&e.zone===t.zone:!1})))()}var wl,Tl;function El(){return(El=t((()=>{wl=`PanelLayout__pane___LnBhb`,Tl={pane:wl}})))()}var Dl,Ol,kl,Al,jl;function Ml(){return(Ml=t((()=>{Dl=i(),w(),oe(),ce(),D(),Ls(),oo(),Tn(),ve(),Cl(),El(),ml(),Ol=s(),kl=e=>{let t=[],n={};if(!e)return{definitions:t,slots:n};let r=new Set;return Object.keys(e).forEach(i=>{let a=e[i];if(!a||a.length===0)return;let o=[],s;a.forEach(e=>{let n=`custom/${i}/${e.title}`;for(let t=2;r.has(n);t++)n=`custom/${i}/${e.title}-${t}`;r.add(n),o.push(n),t.push({id:n,title:e.title,content:(0,Ol.jsx)(se,{children:e.content})}),e.default&&s===void 0&&(s=n)}),n[i]={tabs:o,active:s}}),{definitions:t,slots:n}},Al=e=>{let t=e.node;if(t.type===`split`)return(0,Ol.jsx)(ae,{direction:t.direction,ratios:t.children.map(e=>e.ratio),onRatiosChange:n=>e.onRatiosChange(t.id,n),children:t.children.map(t=>(0,Ol.jsx)(ae.Item,{children:(0,Ol.jsx)(Al,{...e,node:t.node})},t.node.id))});let n=t.tabs.map(t=>e.panels.get(t)).filter(e=>e!==void 0);if(n.length===0)return null;let r=e.hasAddable(t);return(0,Ol.jsx)(`div`,{className:Tl.pane,"data-pane-id":t.id,children:(0,Ol.jsx)(le,{tabs:n.map(e=>({id:e.id,title:e.title,content:e.content})),active:t.active,onSelect:n=>e.onSelectTab(t.id,n),onTabContextMenu:(n,r)=>e.onTabContextMenu(t.id,n,r),onTabPointerDown:(n,r)=>e.onTabPointerDown(t.id,n,r),onAddClick:r?()=>e.onAddTab(t.id):void 0})})},jl=e=>{let{editor:t}=E(),{pushContent:n,closeAll:r}=ao(),i=(0,Dl.useMemo)(()=>kl(e.customTabs),[e.customTabs]),a=(0,Dl.useMemo)(()=>{let t=new Map;return[...e.panels,...i.definitions].forEach(e=>t.set(e.id,e)),t},[e.panels,i]),[o,s]=k(t,`panelLayout`),c=(0,Dl.useMemo)(()=>{let e=new Set([...a.values()].filter(e=>e.unique).map(e=>e.id));return nl(o,new Set(a.keys()),e)??el(i.slots)},[o,a,i]),l=e=>{e!==c&&s(e)},u=(e,t)=>l(rl(c,e,t)),d=(e,t)=>l(cl(c,e,t)),{dragState:f,onTabPointerDown:p}=hl(c,l,a),m=e=>[...a.values()].filter(t=>!e.tabs.includes(t.id));return(0,Ol.jsxs)(Ol.Fragment,{children:[(0,Ol.jsx)(Al,{node:c,panels:a,onSelectTab:u,onRatiosChange:d,onTabContextMenu:(e,t,i)=>{i.preventDefault(),tl(c).reduce((e,t)=>e+t.tabs.length,0)>1&&n((0,Ol.jsx)(Is,{label:a.get(t)?.title,list:[{label:`Close Tab`,onClick:()=>{l(sl(c,e,t)),r()}}]}))},onTabPointerDown:p,onAddTab:e=>{let t=tl(c).find(t=>t.id===e);if(!t)return;let i=m(t);i.length!==0&&n((0,Ol.jsx)(Is,{list:i.map(t=>({label:t.title,onClick:()=>{let n=t.unique?tl(c).find(e=>e.tabs.includes(t.id)):void 0;l(il(n?sl(c,n.id,t.id):c,e,t.id)),r()}}))}))},hasAddable:e=>m(e).length>0}),f&&(0,Ol.jsx)(ye,{drag:f})]})},jl.__docgenInfo={description:``,methods:[],displayName:`PanelLayout`,props:{panels:{required:!0,tsType:{name:`Array`,elements:[{name:`PanelDefinition`}],raw:`PanelDefinition[]`},description:``},customTabs:{required:!1,tsType:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`union`,raw:`"leftTop" | "leftBottom" | "mainBottom" | "rightTop" | "footer"`,elements:[{name:`literal`,value:`"leftTop"`},{name:`literal`,value:`"leftBottom"`},{name:`literal`,value:`"mainBottom"`},{name:`literal`,value:`"rightTop"`},{name:`literal`,value:`"footer"`}]},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	title: string;
	content: React.ReactNode;
	default?: boolean;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`content`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}},{key:`default`,value:{name:`boolean`,required:!1}}]}}],raw:`CustomTab[]`}],raw:`Record<PanelSlot, CustomTab[]>`}],raw:`Partial<Record<PanelSlot, CustomTab[]>>`},description:``}}}})))()}var Nl,Pl,Fl,Il,Ll,Rl;function zl(){return(zl=t((()=>{Nl=`ProjectControl__project___LnByb`,Pl=`ProjectControl__project_inner___LnByb`,Fl=`ProjectControl__projectSelector___LnByb`,Il=`ProjectControl__row___LnByb`,Ll=`ProjectControl__rowItem___LnByb`,Rl={project:Nl,project_inner:Pl,projectSelector:Fl,row:Il,rowItem:Ll,export:`ProjectControl__export___LnByb`}})))()}var Bl,Vl,Hl,Ul;function Wl(){return(Wl=t((()=>{Bl=i(),c(),u(),a(),D(),zl(),Vl=s(),Hl=new URLSearchParams(location.search).get(`project`)||`default`,Ul=()=>{let{editor:e}=E(),[t,n]=(0,Bl.useState)(null);if((0,Bl.useEffect)(()=>{if(!e)return;let t=()=>{n(e.exportProgress?{...e.exportProgress}:null)};return e.on(`update/export`,t),()=>{e.off(`update/export`,t)}},[e]),!e)return null;let r=e.isExporting;return(0,Vl.jsx)(`div`,{className:Rl.project,children:(0,Vl.jsx)(`div`,{className:Rl.project_inner,children:(0,Vl.jsxs)(l,{label:Hl,accordion:!0,children:[(0,Vl.jsx)(d,{onClick:()=>{e&&e.save()},children:`Save`}),(0,Vl.jsx)(d,{onClick:()=>{window.location.href=`/`},children:`Projects`}),(0,Vl.jsxs)(`div`,{className:Rl.export,children:[(0,Vl.jsxs)(d,{onClick:()=>{e&&(e.save(),window.open(`/player`,`_blank`))},children:[`Play `,(0,Vl.jsx)(o,{})]}),(0,Vl.jsx)(d,{onClick:()=>{e&&!r&&e.exportMP4()},children:t?`Exporting... ${Math.floor(t.current/t.total*100)}%`:`Export MP4`})]})]})})})},Ul.__docgenInfo={description:``,methods:[],displayName:`ProjectControl`}})))()}var Gl,Kl,ql;function Jl(){return(Jl=t((()=>{Gl=`RendererSettings__renderer___LnJlb`,Kl=`RendererSettings__renderer_inner___LnJlb`,ql={renderer:Gl,renderer_inner:Kl}})))()}var Yl,Xl;function Zl(){return(Zl=t((()=>{c(),D(),wn(),Jl(),Yl=s(),Xl=()=>{let{editor:e}=E(),t=e.engine.renderer;return(0,Yl.jsx)(`div`,{className:ql.renderer,children:(0,Yl.jsxs)(`div`,{className:ql.renderer_inner,children:[(0,Yl.jsx)(l,{label:`Resolution`,accordion:!0,children:(0,Yl.jsx)(Cn,{target:e,filter:`resolution`})}),(0,Yl.jsx)(l,{label:`Pipeline`,accordion:!0,children:(0,Yl.jsx)(Cn,{target:t,filter:`pipeline`})}),(0,Yl.jsx)(l,{label:`Sky`,accordion:!0,children:(0,Yl.jsx)(Cn,{target:t,filter:`sky`})})]})})},Xl.__docgenInfo={description:``,methods:[],displayName:`RendererSettings`}})))()}var Ql,$l;function eu(){return(eu=t((()=>{Ql=`Canvas__container___LmNvb`,$l={container:Ql}})))()}var tu,nu,ru;function iu(){return(iu=t((()=>{tu=i(),D(),eu(),nu=s(),ru=()=>{let{engine:e}=E(),t=(0,tu.useRef)(null);return(0,tu.useEffect)(()=>{let n=t.current;if(!e||!n)return;let r=e.canvas;if(!r){console.error(`Canvas element not found in engine`);return}return n.appendChild(r),()=>{n.contains(r)&&n.removeChild(r)}},[e]),(0,nu.jsx)(`div`,{className:$l.container,ref:t,role:`presentation`,"aria-label":`3D Canvas`})},ru.__docgenInfo={description:``,methods:[],displayName:`Canvas`}})))()}var au,ou;function su(){return(su=t((()=>{au=`AudioView__audioView___LmF1Z`,ou={audioView:au}})))()}var cu;function lu(){return(lu=t((()=>{P(),M(),cu=class extends rr{wrapperElm;canvas;canvasCtx;viewRangeFrame;viewPort;viewPortRange;musicBuffer;resizeObserver;frameSetting;framePlay;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];let e=window.localStorage.getItem(`audioViweRange`);this.viewRangeFrame=e?Number(e):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){let e=new A(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=e.x,this.canvas.height=e.y}this.render()}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)]*1,s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]*1+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle=`#555`,this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(e){this.framePlay=e,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(e){this.viewRangeFrame=e,this.setFramePlaying(this.framePlay),localStorage.setItem(`audioViweRange`,String(this.viewRangeFrame))}setFrameSetting(e){this.frameSetting=e,this.render()}setMusicBuffer(e){this.musicBuffer=e,this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}},cu.__docgenInfo={description:``,methods:[{name:`setWrapperElm`,docblock:null,modifiers:[],params:[{name:`elm`,optional:!1,type:{name:`HTMLElement`,alias:`HTMLElement`}}],returns:null},{name:`setFramePlaying`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`FramePlay`,alias:`FramePlay`}}],returns:null},{name:`setViewRangeFrame`,docblock:null,modifiers:[],params:[{name:`rangeFrame`,optional:!1,type:{name:`number`}}],returns:null},{name:`setFrameSetting`,docblock:null,modifiers:[],params:[{name:`frameSetting`,optional:!1,type:{name:`OREngineProjectFrame`,alias:`OREngineProjectFrame`}}],returns:null},{name:`setMusicBuffer`,docblock:null,modifiers:[],params:[{name:`buffer`,optional:!1,type:{name:`AudioBuffer`,alias:`AudioBuffer`}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`AudioViewRenderer`}})))()}var uu,du,fu;function pu(){return(pu=t((()=>{uu=i(),D(),su(),lu(),du=s(),fu=()=>{let{editor:e}=E(),t=(0,uu.useRef)(null),[n,r]=(0,uu.useState)();(0,uu.useEffect)(()=>{let e=new cu;if(r(e),t.current)return e.setWrapperElm(t.current),()=>{e.dispose()}},[]);let i=e&&e.audioBuffer,[a,o]=(0,uu.useState)(),[s,c]=(0,uu.useState)({duration:0,fps:0}),[l,u]=(0,uu.useState)({current:0,playing:!1});(0,uu.useEffect)(()=>{if(!e)return;let t=e.engine,n=e=>{c({duration:e[`timeline/duration`],fps:e[`timeline/fps`]})},r=0,i=()=>{o(r++)},a=e=>{u({...e})};return n(t.serialize()),a(t.frame),t.on(`fields/update`,n),t.on(`update/music`,i),t.on(`update/frame/play`,a),()=>{t.off(`update/frame/setting`,n),t.off(`update/music`,i),t.off(`update/frame/play`,a)}},[e]),(0,uu.useEffect)(()=>{n&&i&&n.setMusicBuffer(i)},[n,i,a]),(0,uu.useEffect)(()=>{n&&l&&n.setFramePlaying(l)},[n,l]),(0,uu.useEffect)(()=>{n&&s&&n.setFrameSetting(s)},[n,s]);let d=(0,uu.useCallback)(e=>{if(n){let t=e.deltaY>0?1.1:.9;n.setViewRangeFrame(n.viewRangeFrame*t)}e.preventDefault()},[n]);return(0,uu.useEffect)(()=>{let e=t.current;return e&&e.addEventListener(`wheel`,d,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,d)}},[d]),(0,du.jsx)(`div`,{className:ou.audioView,ref:t})},fu.__docgenInfo={description:``,methods:[],displayName:`AudioView`}})))()}var mu,hu,gu;function _u(){return(_u=t((()=>{mu=`CameraPad__cameraPad___LmNhb`,hu=`CameraPad__btn___LmNhb`,gu={cameraPad:mu,btn:hu}})))()}var vu,yu;function bu(){return(bu=t((()=>{D(),Tn(),_u(),vu=s(),yu=()=>{let{editor:e}=E(),[t]=k(e,`selectedEntityId`);return(0,vu.jsxs)(`div`,{className:gu.cameraPad,children:[(0,vu.jsx)(`div`,{className:gu.btn,"data-disabled":!t,onClick:()=>{t&&e.focusSelected()},title:`Focus selected ( . )`,children:`Focus`}),(0,vu.jsx)(`div`,{className:gu.btn,onClick:()=>{e.syncToSceneCamera()},title:`Move to scene camera ( Esc )`,children:`Scene Cam`})]})},yu.__docgenInfo={description:``,methods:[],displayName:`CameraPad`}})))()}var xu,Su,Cu,wu,Tu,Eu,Du,Ou,ku,Au,ju,Mu,Nu,Pu,Fu,Iu,Lu,Ru,zu,Bu,Vu,V;function Hu(){return(Hu=t((()=>{xu=`Screen__screen___LnNjc`,Su=`Screen__header___LnNjc`,Cu=`Screen__header_tabs___LnNjc`,wu=`Screen__header_tab___LnNjc`,Tu=`Screen__header_right___LnNjc`,Eu=`Screen__header_item___LnNjc`,Du=`Screen__content___LnNjc`,Ou=`Screen__gizmoMode___LnNjc`,ku=`Screen__gizmoMode_btn___LnNjc`,Au=`Screen__gizmoMode_separator___LnNjc`,ju=`Screen__modalStatus___LnNjc`,Mu=`Screen__canvas___LnNjc`,Nu=`Screen__audioViewHandle___LnNjc`,Pu=`Screen__audioView___LnNjc`,Fu=`Screen__displayOptions___LnNjc`,Iu=`Screen__displayOptions_btn___LnNjc`,Lu=`Screen__overlay___LnNjc`,Ru=`Screen__overlay_field___LnNjc`,zu=`Screen__overlay_label___LnNjc`,Bu=`Screen__overlay_separator___LnNjc`,Vu=`Screen__externalBtn___LnNjc`,V={screen:xu,header:Su,header_tabs:Cu,header_tab:wu,header_right:Tu,header_item:Eu,content:Du,gizmoMode:Ou,gizmoMode_btn:ku,gizmoMode_separator:Au,modalStatus:ju,canvas:Mu,audioViewHandle:Nu,audioView:Pu,displayOptions:Fu,displayOptions_btn:Iu,overlay:Lu,overlay_field:Ru,overlay_label:zu,overlay_separator:Bu,externalBtn:Vu}})))()}var Uu,H,Wu;function Gu(){return(Gu=t((()=>{Uu=i(),u(),ue(),ke(),D(),zt(),iu(),At(),Tn(),pu(),bu(),Hu(),H=s(),Wu=()=>{let{editor:e}=E(),t=Oe(),[n,r]=k(e,`enableRender`),[i,a]=k(e,`preview`),[o,s]=k(e,`viewType`),[c,l]=k(e,`resolutionScale`),[u,f]=k(e,`gizmoMode`),[p,m]=k(e,`transformOrientation`),[h]=k(e,`modalStatus`),[g,_]=k(e,`helpers/show`),[v,y]=k(e,`helpers/empty`),[b,x]=k(e,`helpers/camera`),[S,C]=k(e,`helpers/light`),[ee,te]=k(e,`helpers/grid`),[ne,re]=k(e,`helpers/wireframe`),[ie,w]=k(e,`helpers/gizmo`),[ae,oe]=k(e,`helpers/outline`),[se]=Rt(`showAudioView`),[ce,le]=(0,Uu.useState)(50),ue=(0,Uu.useRef)(null),[de,fe]=(0,Uu.useState)(!1),pe=(0,Uu.useRef)(null),me=(0,Uu.useCallback)(e=>{pe.current&&!pe.current.contains(e.target)&&fe(!1)},[]);return(0,Uu.useEffect)(()=>(de&&document.addEventListener(`pointerdown`,me),()=>{document.removeEventListener(`pointerdown`,me)}),[de,me]),(0,H.jsxs)(`div`,{className:V.screen,children:[(0,H.jsxs)(`div`,{className:V.header,children:[(0,H.jsx)(`div`,{className:V.header_tabs,children:(0,H.jsx)(`div`,{className:V.header_tab,"data-active":!!i,onClick:()=>a&&a(!i),title:`Camera Render`,children:(0,H.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 512 512`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`,children:(0,H.jsx)(`path`,{d:`M32 144 H336 V368 H32 Z M368 224 L480 152 V360 L368 288 Z`})})})}),(0,H.jsxs)(`div`,{className:V.header_right,children:[(0,H.jsx)(`div`,{className:V.header_item,children:(0,H.jsx)(T,{title:`View`,children:(0,H.jsx)(O,{value:o,format:{type:`select`,list:[`render`,`debug`]},onChange:e=>s&&s(e)})})}),(0,H.jsx)(`div`,{className:V.header_item,children:(0,H.jsx)(T,{title:`Res`,children:(0,H.jsx)(O,{value:c,format:{type:`select`,list:[,,,,,,].fill(0).map((e,t)=>{let n=2**t,r=1/n;return{value:r,label:r==1?`1`:`1/`+n}})},onChange:e=>l&&l(e)})})}),t.isPC&&(0,H.jsx)(`div`,{className:V.externalBtn,children:(0,H.jsx)(d,{onClick:()=>{e.openInExternalWindow()},children:(0,H.jsxs)(`svg`,{width:`32`,height:`12`,viewBox:`0 0 512 512`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,H.jsxs)(`g`,{clipPath:`url(#clip0_224_2)`,children:[(0,H.jsx)(`path`,{d:`M96 0V416H512V0H96ZM472 376H136V40H472V376Z`,fill:`#aaa`}),(0,H.jsx)(`path`,{d:`M40 472V296V136V96H0V512H416V472H376H40Z`,fill:`#aaa`}),(0,H.jsx)(`path`,{d:`M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z`,fill:`#aaa`})]}),(0,H.jsx)(`defs`,{children:(0,H.jsx)(`clipPath`,{id:`clip0_224_2`,children:(0,H.jsx)(`rect`,{width:`512`,height:`512`,fill:`white`})})})]})})})]})]}),(0,H.jsxs)(`div`,{className:V.content,children:[(0,H.jsxs)(`div`,{className:V.displayOptions,ref:pe,children:[(0,H.jsx)(`div`,{className:V.displayOptions_btn,"data-active":de,onClick:()=>fe(!de),title:`Display Options`,children:`⚙`}),de&&(0,H.jsxs)(`div`,{className:V.overlay,children:[(0,H.jsx)(`div`,{className:V.overlay_label,children:`Rendering`}),(0,H.jsx)(`div`,{className:V.overlay_field,children:(0,H.jsx)(T,{title:`Render`,children:(0,H.jsx)(O,{value:n,onChange:e=>r&&r(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_separator}),(0,H.jsx)(`div`,{className:V.overlay_label,children:`Helpers`}),(0,H.jsx)(`div`,{className:V.overlay_field,children:(0,H.jsx)(T,{title:`Show`,children:(0,H.jsx)(O,{value:g,onChange:e=>_&&_(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_field,"data-indent":`true`,children:(0,H.jsx)(T,{title:`Empty`,children:(0,H.jsx)(O,{value:v,onChange:e=>y&&y(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_field,"data-indent":`true`,children:(0,H.jsx)(T,{title:`Camera`,children:(0,H.jsx)(O,{value:b,onChange:e=>x&&x(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_field,"data-indent":`true`,children:(0,H.jsx)(T,{title:`Light`,children:(0,H.jsx)(O,{value:S,onChange:e=>C&&C(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_separator}),(0,H.jsx)(`div`,{className:V.overlay_field,children:(0,H.jsx)(T,{title:`Grid`,children:(0,H.jsx)(O,{value:ee,onChange:e=>te&&te(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_field,children:(0,H.jsx)(T,{title:`Wireframe`,children:(0,H.jsx)(O,{value:ne,onChange:e=>re&&re(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_field,children:(0,H.jsx)(T,{title:`Gizmo`,children:(0,H.jsx)(O,{value:ie,onChange:e=>w&&w(e)})})}),(0,H.jsx)(`div`,{className:V.overlay_field,children:(0,H.jsx)(T,{title:`Outline`,children:(0,H.jsx)(O,{value:ae,onChange:e=>oe&&oe(e)})})})]})]}),(0,H.jsxs)(`div`,{className:V.gizmoMode,children:[[`select`,`translate`,`rotate`,`scale`].map(e=>(0,H.jsx)(`div`,{className:V.gizmoMode_btn,"data-active":u===e,onClick:()=>f&&f(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`select`?`↖`:e===`translate`?`T`:e===`rotate`?`R`:`S`},e)),(0,H.jsx)(`div`,{className:V.gizmoMode_separator}),[`global`,`local`].map(e=>(0,H.jsx)(`div`,{className:V.gizmoMode_btn,"data-active":p===e,onClick:()=>m&&m(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`global`?`G`:`L`},e))]}),h&&(0,H.jsx)(`div`,{className:V.modalStatus,children:h}),(0,H.jsx)(`div`,{className:V.canvas,children:(0,H.jsx)(ru,{})}),t.isSP&&(0,H.jsx)(yu,{}),t.isPC&&se&&(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(`div`,{className:V.audioViewHandle,onPointerDown:e=>{e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),ue.current={startY:e.clientY,startHeight:ce}},onPointerMove:e=>{if(!ue.current)return;let t=ue.current.startY-e.clientY,n=Math.max(20,Math.min(400,ue.current.startHeight+t));le(n)},onPointerUp:()=>{ue.current=null}}),(0,H.jsx)(`div`,{className:V.audioView,style:{height:ce},children:(0,H.jsx)(fu,{})})]})]})]})},Wu.__docgenInfo={description:``,methods:[],displayName:`Screen`}})))()}var Ku,qu,Ju,Yu,Xu,Zu,Qu;function $u(){return($u=t((()=>{Ku=`Textures__textures___LnRle`,qu=`Textures__item___LnRle`,Ju=`Textures__preview___LnRle`,Yu=`Textures__img___LnRle`,Xu=`Textures__placeholder___LnRle`,Zu=`Textures__name___LnRle`,Qu={textures:Ku,item:qu,preview:Ju,img:Yu,placeholder:Xu,name:Zu}})))()}var ed,td,nd;function rd(){return(rd=t((()=>{ed=i(),eo(),D(),$u(),td=s(),nd=()=>{let{engine:e,editor:t}=E(),[,n]=(0,ed.useState)(0);(0,ed.useEffect)(()=>{let e=()=>{t.assetPreviewManager?.invalidateAll(),n(e=>e+1)},r=()=>n(e=>e+1);return qa.resources.on(`update`,e),t.assetPreviewManager?.on(`update`,r),()=>{qa.resources.off(`update`,e),t.assetPreviewManager?.off(`update`,r)}},[e,t]);let r=qa.resources.textureList;return(0,td.jsx)(`div`,{className:Qu.textures,children:r.map(e=>{let n=t.assetPreviewManager?.getTexturePreview(e.name);return(0,td.jsxs)(`div`,{className:Qu.item,children:[(0,td.jsx)(`div`,{className:Qu.preview,children:n?(0,td.jsx)(`img`,{src:n,className:Qu.img}):(0,td.jsx)(`div`,{className:Qu.placeholder})}),(0,td.jsx)(`div`,{className:Qu.name,children:e.name})]},e.name)})})},nd.__docgenInfo={description:``,methods:[],displayName:`Textures`}})))()}var id,ad;function od(){return(od=t((()=>{id=i(),ad=(0,id.createContext)(null)})))()}var sd,cd;function ld(){return(ld=t((()=>{sd=i(),od(),cd=()=>{let e=(0,sd.useContext)(ad);if(e===null)throw Error(`useTimeline must be used within a TimelineProvider`);return e}})))()}var ud;function dd(){return(dd=t((()=>{ud=`#define PI 3.14159265359\r
#define TPI 6.28318530718\r
#define HPI 1.57079632679\r
#define saturate(x) clamp(x,0.,1.)\r
\r
struct Geometry {\r
	vec3 position;\r
	vec3 normal;\r
	float depth;\r
	vec3 viewDir;\r
	vec3 viewDirWorld;\r
	float occulusion;\r
};\r
\r
struct Material {\r
	vec3 color;\r
	float roughness;\r
	float metallic;\r
	vec3 emission;\r
	vec3 diffuseColor;\r
	vec3 specularColor;\r
	float envMapIntensity;\r
};\r
\r
float sinn( float x ) {\r
	return sin(x - HPI) * 0.5 + 0.5;\r
}\r
\r
float atan2(in float y, in float x){\r
\r
    return x == 0.0 ? sign(y)*PI/2.0 : atan(y, x);\r
	\r
}\r
\r
#define linearstep(edge0, edge1, x) min(max(((x) - (edge0)) / ((edge1) - (edge0)), 0.0), 1.0)\r
\r
// easing\r
\r
float easeInOut( float x ) {\r
\r
	return x < 0.5 ? 8.0 * x * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 4.0) / 2.0;\r
\r
}\r
\r
float easeOut( float t, float k ) {\r
\r
	float x = exp( - clamp( t, 0.0, 1.0 ) * k );\r
	float s0 = 1.0;\r
	float s1 = exp( -k );\r
	return ( x - s0 ) / (s1 - s0 );\r
	\r
}\r
\r
float easeIn( float t, float k ) {\r
\r
	return 1.0 - easeOut( 1.0 - t, k );\r
	\r
}\r
\r
float easeBounce( float t, float b ) {\r
\r
	t = 1.0 - t;\r
	return 1.0 - t * t * ( b * t - b + 1.0 );\r
	\r
}\r
\r
// hsv\r
\r
vec3 hsv2rgb( vec3 hsv ) {\r
\r
	return ((clamp(abs(fract(hsv.x+vec3(0,2,1)/3.)*6.-3.)-1.,0.,1.)-1.)*hsv.y+1.)*hsv.z;\r
	\r
}\r
\r
// color space conversion\r
\r
vec3 srgbToLinear( vec3 srgb ) {\r
	return mix(\r
		srgb / 12.92,\r
		pow((srgb + 0.055) / 1.055, vec3(2.4)),\r
		step(0.04045, srgb)\r
	);\r
}\r
\r
vec3 linearToSrgb( vec3 linear ) {\r
	return mix(\r
		linear * 12.92,\r
		pow(linear, vec3(1.0 / 2.4)) * 1.055 - 0.055,\r
		step(0.0031308, linear)\r
	);\r
}\r
\r
// packing\r
\r
vec4 floatToRGBA( float v ) {\r
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;\r
	enc = fract(enc);\r
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);\r
	return enc;\r
}\r
\r
float rgbaToFloat( vec4 rgba ) {\r
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );\r
}

uniform sampler2D uCanvasTex;
uniform sampler2D uMusicTex;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 canvas = texture( uCanvasTex, vUv );

	vec3 col = canvas.xyz;

	float audio = texture( uMusicTex, vUv ).x;
	float audioWave = step( vUv.y, audio );
	col += audioWave * 0.2;

	outColor = vec4( col, 1.0 );

}`})))()}var fd;function pd(){return(pd=t((()=>{P(),Yn(),M(),L(),dd(),fd=class extends rr{wrapperElm;glCanvas;backend;gl;canvasTexture;canvas;canvasCtx;glRenderer;postProcess;viewPort;viewPortRange;viewPortScale;frameSetting;loopSetting;musicBuffer;musicTexture;resizeObserver;canvasSize;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.glCanvas=document.createElement(`canvas`),this.backend=new Xn(this.glCanvas.getContext(`webgl2`)),this.gl=this.backend.gl,this.canvasSize=new A(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this));let e={renderer:null,createEntity:t=>new Jr({...t,engine:e})};this.glRenderer=new wa(this.backend,e),e.renderer=this.glRenderer,this.canvasTexture=new Vn(this.gl),this.musicBuffer=null,this.musicTexture=new Vn(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new gi({passes:[new I(this.backend,{frag:ud,uniforms:{uCanvasTex:{type:`1i`,value:null},uMusicTex:{type:`1i`,value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){let e=new A(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);if(e.x===0||e.y===0)return;this.glCanvas.width=this.canvas.width=e.x,this.glCanvas.height=this.canvas.height=e.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(e),this.render()}}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle=`#181818`;let e=this.frameToPx(0),t=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(e,0,t-e,this.canvas.height)}let e=(e,t,n)=>{let r=Math.ceil(this.viewPort[0]/e)*e;this.canvasCtx.beginPath();let i=0;for(;r<this.viewPort[2]&&i<100;){let n=this.frameToPx(r+t);this.canvasCtx.moveTo(n,0),this.canvasCtx.lineTo(n,this.canvas.height),r+=e,i++}this.canvasCtx.strokeStyle=n,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(e(this.viewPortScale,0,`#555`),e(this.viewPortScale,this.viewPortScale/2,`#333`),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)],s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle=`#0009`;let e=this.frameToPx(this.loopSetting.start),t=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,e,this.canvas.height),this.canvasCtx.fillRect(t,0,this.canvas.width-t,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess.passes&&(this.postProcess.passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(e,t){this.viewPort=e,this.viewPortRange=[e[2]-e[0],e[3]-e[1]],this.viewPortScale=t,this.render()}setFrameSetting(e){this.frameSetting={duration:Math.round(e.duration),fps:Math.round(e.fps)},this.render()}setMusicBuffer(e){this.musicBuffer=e,setTimeout(()=>{this.render()},100)}setLoopSetting(e,t,n){this.loopSetting={enabled:e,start:t,end:n},this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}},fd.__docgenInfo={description:``,methods:[{name:`setWrapperElm`,docblock:null,modifiers:[],params:[{name:`elm`,optional:!1,type:{name:`HTMLElement`,alias:`HTMLElement`}}],returns:null},{name:`setViewPort`,docblock:null,modifiers:[],params:[{name:`viewPort`,optional:!1,type:{name:`Array`,elements:[{name:`number`}],raw:`number[]`}},{name:`scale`,optional:!1,type:{name:`number`}}],returns:null},{name:`setFrameSetting`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`OREngineProjectFrame`,alias:`OREngineProjectFrame`}}],returns:null},{name:`setMusicBuffer`,docblock:null,modifiers:[],params:[{name:`buffer`,optional:!1,type:{name:`AudioBuffer`,alias:`AudioBuffer`}}],returns:null},{name:`setLoopSetting`,docblock:null,modifiers:[],params:[{name:`enabled`,optional:!1,type:{name:`boolean`}},{name:`start`,optional:!1,type:{name:`number`}},{name:`end`,optional:!1,type:{name:`number`}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`TimelineCanvasRenderer`}})))()}var md,hd;function gd(){return(gd=t((()=>{md=`TimelineCanvas__timelineCanvas___LnRpb`,hd={timelineCanvas:md}})))()}var _d,vd,yd;function bd(){return(bd=t((()=>{_d=i(),Tn(),ld(),pd(),gd(),vd=s(),yd=()=>{let{viewPort:e,viewPortScale:t,musicBuffer:n,musicBufferVersion:r,glEditor:i}=cd(),[a,o]=(0,_d.useState)(),s=(0,_d.useRef)(null);(0,_d.useEffect)(()=>{let e=new fd;return o(e),s.current&&e.setWrapperElm(s.current),()=>{e.dispose()}},[]),(0,_d.useEffect)(()=>{a&&e&&t&&a.setViewPort(e,t)},[a,e,t]);let[c]=k(i?.engine,`timeline/duration`),[l]=k(i?.engine,`timeline/fps`);(0,_d.useEffect)(()=>{a&&c&&l&&a.setFrameSetting({duration:c||0,fps:l||0})},[a,c,l]);let[u]=k(i,`frameLoop/enabled`),[d]=k(i,`frameLoop/start`),[f]=k(i,`frameLoop/end`);return(0,_d.useEffect)(()=>{a&&a.setLoopSetting(u||!1,d||0,f||0)},[a,u,d,f]),(0,_d.useEffect)(()=>{a&&n&&a.setMusicBuffer(n)},[a,n,r]),(0,vd.jsx)(`div`,{className:hd.timelineCanvas,ref:s})},yd.__docgenInfo={description:``,methods:[],displayName:`TimelineCanvas`}})))()}var xd,Sd;function Cd(){return(Cd=t((()=>{xd=`TimelineControls__controls___LmNvb`,Sd={controls:xd}})))()}var wd,Td,Ed;function Dd(){return(Dd=t((()=>{wd=e(i(),1),ld(),Cd(),Td=s(),Ed=e=>{let{viewPort:t,setCurrentFrame:n,getFrameViewPort:r,zoom:i,scroll:a,setViewPortCenter:o}=cd(),s=(0,wd.useRef)([0,0,0,0]),c=(0,wd.useRef)([0,0]);t&&(s.current=t,c.current=[t[2]-t[0],t[3]-t[1]]);let l=(0,wd.useRef)(null),u=(0,wd.useRef)(null),d=(0,wd.useRef)(null),f=(0,wd.useRef)(null),p=(0,wd.useRef)(null),m=(0,wd.useCallback)(e=>{let t=l.current&&l.current.clientWidth||1;if(d.current==0){if(n&&r&&u.current){let i=(e.clientX-u.current.left)/t;n(r(i))}}else if(d.current==1){let n=[e.clientX,e.clientY];if(f.current&&p.current){let e=-(n[0]-f.current[0])/t*c.current[0];o&&o(p.current+e)}}},[n,r,o]),h=(0,wd.useCallback)(e=>{d.current=e.button,p.current=(s.current[2]+s.current[0])/2,f.current=[e.clientX,e.clientY],u.current=e.currentTarget.getBoundingClientRect();let t=(e.clientX-u.current.left)/e.currentTarget.clientWidth;d.current==0&&n&&r&&n(r(t)),window.addEventListener(`pointermove`,m);let i=()=>{f.current=null,d.current=null,p.current=null,window.removeEventListener(`pointermove`,m)};return window.addEventListener(`pointerup`,i),()=>{window.removeEventListener(`pointerup`,i),window.removeEventListener(`pointermove`,m)}},[r,n,m]),g=(0,wd.useCallback)(e=>{if(d.current!==null||!i||!a)return;e.preventDefault();let t=e.target&&e.target.clientWidth||1,n=Math.abs(e.deltaY);Math.abs(e.deltaX)<n?i(n>50?e.deltaY<0?.9:1.1:1+e.deltaY*.005):a(e.deltaX/t*.5)},[i,a]);return(0,wd.useEffect)(()=>{let e=l.current;return e&&e.addEventListener(`wheel`,g,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,g)}},[g]),t?(0,Td.jsx)(`div`,{className:Sd.controls,onPointerDown:h,ref:l,children:e.children}):null},Ed.__docgenInfo={description:``,methods:[],displayName:`TimelineControls`,props:{children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})))()}var Od,kd,Ad;function jd(){return(jd=t((()=>{Od=`TimelineCursor__cursor___LmN1c`,kd=`TimelineCursor__frame___LmN1c`,Ad={cursor:Od,frame:kd}})))()}var Md,Nd;function Pd(){return(Pd=t((()=>{ld(),jd(),Md=s(),Nd=()=>{let{viewPort:e,framePlay:t}=cd();if(!e||!t)return null;let n=e[2]-e[0],r=(t.current-e[0])/n;return(0,Md.jsx)(`div`,{className:Ad.cursor,style:{left:r*100+`%`},children:(0,Md.jsx)(`div`,{className:Ad.frame})})},Nd.__docgenInfo={description:``,methods:[],displayName:`TimelineCursor`}})))()}var Fd,Id,Ld,Rd;function zd(){return(zd=t((()=>{Fd=`TimelineLoop__timelineLoop___LnRpb`,Id=`TimelineLoop__start___LnRpb`,Ld=`TimelineLoop__end___LnRpb`,Rd={timelineLoop:Fd,start:Id,end:Ld}})))()}var Bd,Vd;function Hd(){return(Hd=t((()=>{Bd=`TimelineLoopCursor__cursor___LmN1c`,Vd={cursor:Bd}})))()}var Ud,Wd,Gd;function Kd(){return(Kd=t((()=>{Ud=i(),Hd(),Wd=s(),Gd=({onMove:e})=>{let t=(0,Ud.useRef)(!1);return(0,Wd.jsx)(`div`,{className:Vd.cursor,onPointerDown:e=>{e.buttons==1&&(t.current=!0,e.stopPropagation())},onPointerMove:n=>{let r=n.target;t.current!==!1&&n.buttons==1&&(r.setPointerCapture(n.pointerId),n.buttons==1&&e&&e(n.clientX),n.nativeEvent.preventDefault(),n.nativeEvent.stopPropagation())},onPointerUp:()=>{t.current=!1}})},Gd.__docgenInfo={description:``,methods:[],displayName:`TimelineLoopCursor`}})))()}var qd,Jd,Yd;function Xd(){return(Xd=t((()=>{qd=i(),Tn(),Qt(),ld(),zd(),Kd(),Jd=s(),Yd=()=>{let{viewPort:e,framePlay:t,glEditor:n}=cd(),r=(0,qd.useRef)(null);Zt(n,[`frameLoop/enabled`,`frameLoop/start`,`frameLoop/end`]);let[i]=k(n,`frameLoop/enabled`),[a,o]=k(n,`frameLoop/start`),[s,c]=k(n,`frameLoop/end`);if(i!==!0||!e||!t||a===void 0||s===void 0)return null;let l=e[2]-e[0],u=(a-e[0])/l,d=(s-e[0])/l,f=(t,n)=>{let r=t.getBoundingClientRect();return(n-r.x)/r.width*(e[2]-e[0])+e[0]};return(0,Jd.jsx)(`div`,{className:Rd.timelineLoop,ref:r,children:(0,Jd.jsxs)(`div`,{className:Rd.timelineLoop_inner,children:[(0,Jd.jsx)(`div`,{className:Rd.start,style:{left:u*100+`%`},children:(0,Jd.jsx)(Gd,{onMove:e=>{r.current&&o&&o(f(r.current,e))}})}),(0,Jd.jsx)(`div`,{className:Rd.end,style:{left:d*100+`%`},children:(0,Jd.jsx)(Gd,{onMove:e=>{r.current&&c&&c(f(r.current,e))}})})]})})},Yd.__docgenInfo={description:``,methods:[],displayName:`TimelineLoop`}})))()}var Zd,Qd,$d,ef,tf,nf;function rf(){return(rf=t((()=>{Zd=`TimelineScale__scale___LnNjY`,Qd=`TimelineScale__scale_inner___LnNjY`,$d=`TimelineScale__scale_item___LnNjY`,ef=`TimelineScale__scale_item_frame___LnNjY`,tf=`TimelineScale__scale_item_time___LnNjY`,nf={scale:Zd,scale_inner:Qd,scale_item:$d,scale_item_frame:ef,scale_item_time:tf}})))()}var af,of,sf;function cf(){return(cf=t((()=>{Tn(),ld(),rf(),af=s(),of=e=>`${(`00`+Math.floor(e%3600/60)).slice(-2)}:${(`00`+Math.floor(e%60)).slice(-2)}`,sf=()=>{let{glEditor:e,viewPort:t,viewPortScale:n}=cd(),[r,i]=k(e?.engine,`timeline/fps`);if(!t||!n||r===void 0)return null;let a=[],o=Math.ceil(t[0]/n)*n,s=0;for(;o<t[2]&&s<100;){let e=(o-t[0])/(t[2]-t[0]),i=o/(r||0);a.push((0,af.jsxs)(`div`,{className:nf.scale_item,style:{left:e*100+`%`},children:[(0,af.jsx)(`div`,{className:nf.scale_item_frame,children:o}),(0,af.jsx)(`div`,{className:nf.scale_item_time,children:of(i)})]},o)),o+=n,s++}return(0,af.jsx)(`div`,{className:nf.scale,children:(0,af.jsx)(`div`,{className:nf.scale_inner,children:a})})},sf.__docgenInfo={description:``,methods:[],displayName:`TimelineScale`}})))()}var lf,uf;function df(){return(df=t((()=>{lf=`TimelineSetting__timelineSetting___LnRpb`,uf={timelineSetting:lf}})))()}var ff,pf,mf;function hf(){return(hf=t((()=>{ff=i(),ue(),oe(),At(),Tn(),ld(),df(),pf=s(),mf=()=>{let{framePlay:e,glEditor:t}=cd(),n=(0,ff.useCallback)((e,t)=>{t&&t(e)},[]),[r,i]=k(t,`frameLoop/enabled`),[a,o]=k(t?.engine,`timeline/duration`),[s,c]=k(t?.engine,`timeline/fps`);return(0,pf.jsx)(`div`,{className:uf.timelineSetting,children:(0,pf.jsxs)(se,{children:[(0,pf.jsx)(T,{title:`current`,children:(0,pf.jsx)(O,{value:Math.floor(e?.current||0),readOnly:!0})}),(0,pf.jsx)(T,{title:`duration`,children:(0,pf.jsx)(O,{value:a,onChange:e=>n(e,o)})}),(0,pf.jsx)(T,{title:`fps`,children:(0,pf.jsx)(O,{value:s,onChange:e=>n(e,c)})}),(0,pf.jsx)(T,{title:`loop`,children:(0,pf.jsx)(O,{value:r||!1,onChange:e=>n(e,i)})})]})})},mf.__docgenInfo={description:``,methods:[],displayName:`TimelineSetting`}})))()}var gf,_f,vf,yf,bf;function xf(){return(xf=t((()=>{gf=`Timeline__timeline___LnRpb`,_f=`Timeline__inner___LnRpb`,vf=`Timeline__content___LnRpb`,yf=`Timeline__setting___LnRpb`,bf={timeline:gf,inner:_f,content:vf,setting:yf}})))()}var Sf,Cf;function wf(){return(wf=t((()=>{Sf=i(),D(),Cf=()=>{let{editor:e}=E(),[t,n]=(0,Sf.useState)({current:0,playing:!1}),[r,i]=(0,Sf.useState)([0,0,100,0]),a=(0,Sf.useRef)([0,0,0,0]);a.current=r;let o=r[2]-r[0],s=10*2**(0+Math.floor(Math.log2(o/100)));s=Math.max(1,Math.floor(s));let c=e?.audioBuffer,[l,u]=(0,Sf.useState)();(0,Sf.useEffect)(()=>{if(e){let t=e.engine,r=e=>{n({...e})};r(t.frame);let a=0,o=()=>{u(a++)},s=()=>{i([0,0,t.frameSetting.duration,0])};return s(),t.on(`update/frame/play`,r),t.on(`update/music`,o),t.on(`loaded`,s),()=>{t.off(`update/frame/play`,r),t.off(`update/music`,o),t.off(`loaded`,s)}}},[e]);let d=(0,Sf.useCallback)(t=>{e&&e.engine.seek(t)},[e]),f=(0,Sf.useCallback)(e=>{let t=r[2]-r[0];return Math.floor(r[0]+t*e)},[r]),p=(0,Sf.useCallback)(e=>{let t=a.current,n=(t[2]+t[0])/2,r=(t[0]-n)*e+n,o=(t[2]-n)*e+n;i([r,t[1],o,t[3]])},[]),m=(0,Sf.useCallback)(e=>{let t=a.current,n=e*(t[2]-t[0]);i([t[0]+n,t[1],t[2]+n,t[3]])},[]),h=(0,Sf.useCallback)(e=>{let t=a.current,n=t[2]-t[0];i([e-n/2,t[1],e+n/2,t[3]])},[]);return{glEditor:e,framePlay:t,viewPort:r,viewPortScale:s,musicBuffer:c,musicBufferVersion:l,setCurrentFrame:d,getFrameViewPort:f,zoom:p,scroll:m,setViewPortCenter:h}}})))()}var Tf,Ef;function Df(){return(Df=t((()=>{od(),wf(),Tf=s(),Ef=e=>{let t=Cf();return(0,Tf.jsx)(ad.Provider,{value:t,children:e.children})},Ef.__docgenInfo={description:``,methods:[],displayName:`TimelineProvider`}})))()}var Of,kf;function Af(){return(Af=t((()=>{bd(),Dd(),Pd(),Xd(),cf(),hf(),xf(),Df(),Of=s(),kf=()=>(0,Of.jsx)(Ef,{children:(0,Of.jsx)(`div`,{className:bf.timeline,children:(0,Of.jsxs)(`div`,{className:bf.inner,children:[(0,Of.jsx)(`div`,{className:bf.setting,children:(0,Of.jsx)(mf,{})}),(0,Of.jsxs)(`div`,{className:bf.content,children:[(0,Of.jsx)(yd,{}),(0,Of.jsx)(Nd,{}),(0,Of.jsx)(Ed,{children:(0,Of.jsx)(Yd,{})}),(0,Of.jsx)(sf,{})]})]})})}),kf.__docgenInfo={description:``,methods:[],displayName:`Timeline`}})))()}var jf,Mf;function Nf(){return(Nf=t((()=>{jf=`OREditor__editor___LmVka`,Mf={editor:jf}})))()}var Pf,Ff,If,Lf;function Rf(){return(Rf=t((()=>{Pf=class{isEditorFrame=!0;isEditorTarget=!0;size;constructor(e){this.size=e||null}},Ff=class{isEditorRecipe=!0},If=class{_resolution;constructor(e){this._resolution=e.resolution.clone()}renderEntities(){}renderFullscreen(){}blit(){}drawTexture(){}readPixels(e){let t=e.size||this._resolution;return Promise.resolve(new Uint8Array(t.x*t.y*4))}createTarget(e){return new Pf(e&&e.size)}resize(e){this._resolution.copy(e)}onDrawPass(){}materials={flat:()=>({name:`editorFlat`}),mask:()=>({name:`editorMask`}),grid:()=>({name:`editorGrid`})};recipes={outline:()=>new Ff}},Lf=e=>new If(e.renderer)})))()}var zf;function Bf(){return(Bf=t((()=>{zf=class{render(){}dispose(){}}})))()}var Vf,Hf,Uf;function Wf(){return(Wf=t((()=>{M(),Cr(),Bf(),Vf=class{camera;pipelineOverride;constructor(){this.camera=null,this.pipelineOverride=null}dispose(){}},Hf=class extends Sr{canvas;resolution;globalUniforms;constructor(){super(),this.canvas=document.createElement(`canvas`),this.resolution=new A,this.globalUniforms={}}createView(){return new Vf}prepareScene(){}render(){}present(){}resize(e){this.resolution.copy(e)}compileShaders(){return Promise.resolve()}createTexProcedural(){return new zf}},Uf=e=>new Hf,Hf.__docgenInfo={description:``,methods:[{name:`createView`,docblock:null,modifiers:[],params:[],returns:{type:{name:`RenderView`}}},{name:`prepareScene`,docblock:null,modifiers:[],params:[],returns:null},{name:`present`,docblock:null,modifiers:[],params:[],returns:null},{name:`resize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`compileShaders`,docblock:null,modifiers:[],params:[],returns:{type:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},{name:`createTexProcedural`,docblock:null,modifiers:[],params:[],returns:{type:{name:`TexProcedural`}}}],displayName:`Renderer`}})))()}function Gf(){return(Gf=t((()=>{li(),he(),Rf(),_e(),Wf()})))()}var Kf,qf;function Jf(){return(Jf=t((()=>{P(),M(),Ja(),Kf=128,qf=class extends rr{_draw;_target;_cache;_pending;_canvas2d;_ctx2d;constructor(e){super(),this._draw=e,this._cache=new Map,this._pending=new Set,this._canvas2d=document.createElement(`canvas`),this._canvas2d.width=Kf,this._canvas2d.height=Kf,this._ctx2d=this._canvas2d.getContext(`2d`),this._target=e.createTarget({size:new A(Kf,Kf)})}getTexturePreview(e){let t=`tex:`+e,n=this._cache.get(t);if(n)return n;if(this._pending.has(t))return null;let r=qa.resources.getTexture(e);return r?(this._pending.add(t),this._draw.drawTexture(r,this._target),this._draw.readPixels(this._target).then(e=>{this._pending.delete(t),this._cache.set(t,this._toDataURL(e)),this.emit(`update`)}),null):null}invalidate(e){this._cache.delete(e)}invalidateAll(){this._cache.clear(),this._pending.clear()}_toDataURL(e){let t=this._ctx2d.createImageData(Kf,Kf);for(let n=0;n<Kf;n++){let r=(127-n)*Kf*4,i=n*Kf*4;for(let n=0;n<512;n++)t.data[i+n]=e[r+n]}return this._ctx2d.putImageData(t,0,0),this._canvas2d.toDataURL()}dispose(){this._cache.clear(),this._pending.clear(),this.off(`update`)}}})))()}var Yf;function Xf(){return(Xf=t((()=>{P(),Yf=class extends rr{_undoStack=[];_redoStack=[];_mergeWindow=500;_lastExecuteTime=0;execute(e){let t=Date.now();if(this._undoStack.length>0&&t-this._lastExecuteTime<this._mergeWindow){let n=this._undoStack[this._undoStack.length-1];if(n.mergeWith){let r=n.mergeWith(e);if(r){this._undoStack[this._undoStack.length-1]=r,e.execute(),this._lastExecuteTime=t,this.emit(`change`);return}}}e.execute(),this._undoStack.push(e),this._redoStack=[],this._lastExecuteTime=t,this.emit(`change`)}undo(){let e=this._undoStack.pop();e&&(e.undo(),this._redoStack.push(e),this.emit(`change`))}redo(){let e=this._redoStack.pop();e&&(e.execute(),this._undoStack.push(e),this.emit(`change`))}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}clear(){this._undoStack=[],this._redoStack=[],this.emit(`change`)}}})))()}var Zf;function Qf(){return(Qf=t((()=>{Zf=class{entity;componentClass;name=`AddComponent`;instance=null;constructor(e,t){this.entity=e,this.componentClass=t}execute(){this.instance=this.entity.addComponent(this.componentClass),this.instance.initiator=`user`}undo(){this.entity.removeComponent(this.componentClass),this.instance=null}}})))()}var $f;function ep(){return(ep=t((()=>{Ja(),$f=class{_textureName;_config;name=`AddTexture`;constructor(e,t){this._textureName=e,this._config=t}execute(){qa.resources.addTextureResource(this._textureName,this._config)}undo(){qa.resources.removeTextureResource(this._textureName)}}})))()}var tp;function np(){return(np=t((()=>{tp=class{engine;parent;entityName;name=`CreateEntity`;entity=null;constructor(e,t,n){this.engine=e,this.parent=t,this.entityName=n}execute(){this.entity?this.parent.add(this.entity):(this.entity=this.engine.createEntity({name:this.entityName}),this.entity.initiator=`user`,this.parent.add(this.entity))}undo(){this.entity&&this.entity.parent&&this.entity.parent.remove(this.entity)}get createdEntity(){return this.entity}}})))()}var rp;function ip(){return(ip=t((()=>{rp=class{entity;name=`DeleteEntity`;parent=null;constructor(e){this.entity=e}execute(){this.parent=this.entity.parent,this.parent&&this.parent.remove(this.entity)}undo(){this.parent&&this.parent.add(this.entity)}}})))()}var ap;function op(){return(op=t((()=>{ap=class{entity;componentClass;component;name=`RemoveComponent`;snapshot=null;constructor(e,t,n){this.entity=e,this.componentClass=t,this.component=n}execute(){this.snapshot=this.component.serialize(),this.entity.removeComponent(this.componentClass)}undo(){let e=this.entity.addComponent(this.componentClass);e.initiator=`user`,this.snapshot&&e.deserialize(this.snapshot),this.component=e}}})))()}var sp;function cp(){return(cp=t((()=>{Ja(),sp=class{_textureName;name=`RemoveTexture`;_snapshot=null;constructor(e){this._textureName=e}execute(){let e=qa.resources.getTextureResource(this._textureName);e&&(this._snapshot=e.serialize({mode:`export`})),qa.resources.removeTextureResource(this._textureName)}undo(){this._snapshot&&qa.resources.addTextureResource(this._textureName,this._snapshot)}}})))()}var lp;function up(){return(up=t((()=>{lp=class e{target;path;oldValue;newValue;name=`SetField`;constructor(e,t,n,r){this.target=e,this.path=t,this.oldValue=n,this.newValue=r}execute(){this.target.setField(this.path,this.newValue)}undo(){this.target.setField(this.path,this.oldValue)}mergeWith(t){return t instanceof e&&t.target===this.target&&t.path===this.path?new e(this.target,this.path,this.oldValue,t.newValue):null}}})))()}var dp;function fp(){return(fp=t((()=>{Ja(),Xf(),Qf(),ep(),np(),ip(),op(),cp(),up(),dp=class{_commandManager;_editor;constructor(e){this._editor=e,this._commandManager=new Yf}setField(e,t,n){let r=e.getField(t);this._commandManager.execute(new lp(e,t,r,n))}createEntity(e,t){let n=new tp(this._editor.engine,e,t);return this._commandManager.execute(n),n.createdEntity}deleteEntity(e){this._commandManager.execute(new rp(e))}selectEntity(e){this._editor.selectEntity(e)}addComponent(e,t){let n=new Zf(e,t);return this._commandManager.execute(n),n.instance}removeComponent(e,t,n){this._commandManager.execute(new ap(e,t,n))}addTexture(e,t){this._commandManager.execute(new $f(e,t))}removeTexture(e){this._commandManager.execute(new sp(e))}updateTexture(e,t){let n=qa.resources.getTextureResource(e);if(!n)throw Error(`Texture not found: ${e}`);let r=Object.keys(t);for(let e of r){let r=n.getField(e);this._commandManager.execute(new lp(n,e,r,t[e]))}}undo(){this._commandManager.undo()}redo(){this._commandManager.redo()}get canUndo(){return this._commandManager.canUndo}get canRedo(){return this._commandManager.canRedo}get commandManager(){return this._commandManager}dispose(){this._commandManager.clear()}}})))()}var pp=n({LookAt:()=>mp}),mp;function hp(){return(hp=t((()=>{M(),L(),mp=class extends wr{target;up;targetWorldPos;targetLocalPos;localUp;lookAtMatrix;parentInverse;constructor(e){super(e),this.target=null,this.targetWorldPos=new A,this.targetLocalPos=new A,this.localUp=new A,this.up=new A(0,1,0),this.lookAtMatrix=new j,this.parentInverse=new j,this.order=100}setTarget(e){this.target=e}postUpdateImpl(e){this.target&&this._enabled&&(this.target.matrixWorld.decompose(this.targetWorldPos),this.targetLocalPos.copy(this.targetWorldPos),this.localUp.copy(this.up),this.entity.parent&&(this.parentInverse.copy(this.entity.parent.matrixWorld).inverse(),this.targetLocalPos.applyMatrix4AsPosition(this.parentInverse),this.localUp.applyMatrix4AsDirection(this.parentInverse).normalize()),this.lookAtMatrix.lookAt(this.entity.position,this.targetLocalPos,this.localUp),this.entity.quaternion.setFromMatrix(this.lookAtMatrix))}}})))()}var gp=n({OrbitControls:()=>_p}),_p;function vp(){return(vp=t((()=>{M(),L(),eo(),hp(),_p=class extends wr{keyborad_;_pointer;orbit_;mouseVelOrbit_;mouseVelMove_;eye_;target_;up_;lookatMatrix_;distance_;distanceVel_;_memPos;_memTarget;_multiTouching;elmDisposer;constructor(e){super(e),this._pointer=new Za,this.keyborad_=new Ya,this.orbit_=new A,this.mouseVelOrbit_=new A,this.mouseVelMove_=new A,this.target_=new A,this.eye_=new A,this.up_=new A(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new j,this._memPos=new A,this._memTarget=new A,this._multiTouching=!1,this.order=999;let t=!1,n=e=>{t||=!0},r=e=>{if(!this._enabled||!t||this._multiTouching)return;let n={x:e.delta.x*1,y:e.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(n):this.mouseVelOrbit_.add(n),e.pointerEvent.preventDefault(),e.pointerEvent.stopPropagation()},i=e=>{t&&=!1};this._pointer.on(`move`,r),this._pointer.on(`start`,n),this._pointer.on(`end`,i),this.once(`dispose`,()=>{this._pointer.off(`move`,r),this._pointer.off(`start`,n),this._pointer.off(`end`,i)}),this.setPosition(this.entity.position,this.target_)}set enabled(e){if(this._enabled=e,e){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);let e=this.entity.getComponent(mp);e&&e.target&&this.setPosition(this.entity.position,e.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}get eye(){return this.eye_}get target(){return this.target_}setElm(e){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(e);let t=new Map,n=()=>{let e=Array.from(t.values());if(e.length<2)return 0;let n=e[1].x-e[0].x,r=e[1].y-e[0].y;return Math.sqrt(n*n+r*r)},r=()=>{let e=Array.from(t.values());return e.length<2?{x:0,y:0}:{x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2}},i=0,a={x:0,y:0},o=e=>{e.pointerType===`touch`&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),t.size===2&&(this._multiTouching=!0,i=n(),a=r()))},s=e=>{if(e.pointerType===`touch`&&t.has(e.pointerId)&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._enabled&&t.size>=2)){let e=n(),t=e-i;this.distanceVel_+=-t*5,i=e;let o=r(),s=o.x-a.x,c=o.y-a.y;this.mouseVelMove_.add({x:s,y:c}),a=o}},c=e=>{e.pointerType===`touch`&&(t.delete(e.pointerId),t.size<2&&(this._multiTouching=!1,i=0))};e.addEventListener(`pointerdown`,o),e.addEventListener(`pointermove`,s),e.addEventListener(`pointerup`,c),e.addEventListener(`pointercancel`,c);let l=e=>{e.preventDefault(),this._enabled&&(this.distanceVel_+=e.deltaY)};e.addEventListener(`wheel`,l),this.elmDisposer=()=>{e.removeEventListener(`pointerdown`,o),e.removeEventListener(`pointermove`,s),e.removeEventListener(`pointerup`,c),e.removeEventListener(`pointercancel`,c),e.removeEventListener(`wheel`,l)}}calc(e){let t=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new j().makeRotationAxis({x:1,y:0,z:0},Math.min(t,Math.max(-t,this.orbit_.x)))),this.eye_.applyMatrix3(new j().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(e.position,e.quaternion,e.scale)}updateImpl(e){let t=new A(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);t.applyMatrix3(this.entity.matrix),this.target_.add(t),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);let n=Math.max(0,1-e.timeDelta*10);this.mouseVelOrbit_.multiply(n),this.mouseVelMove_.multiply(n),this.distanceVel_*=n,this.calc(this.entity)}addOrbitVelocity(e,t){this._enabled&&this.mouseVelOrbit_.add({x:e,y:t})}addMoveVelocity(e,t){this._enabled&&this.mouseVelMove_.add({x:e,y:t})}addDistanceVelocity(e){this._enabled&&(this.distanceVel_+=e)}setPosition(e,t){if(this.eye_.copy(e),this.target_.copy(t),this.entity){let e=this.entity.parent;e&&(e.updateMatrix(!0),this.target_.applyMatrix4(e.matrixWorld.clone().inverse()))}let n=this.eye_.x-this.target_.x,r=this.eye_.y-this.target_.y,i=this.eye_.z-this.target_.z;this.orbit_.x=Math.atan2(r,Math.sqrt(n*n+i*i)),this.orbit_.y=-Math.atan2(n,i),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0),this.distanceVel_=0}dispose(){super.dispose(),this._pointer.dispose()}}})))()}var yp,bp,xp,Sp,Cp,wp;function Tp(){return(Tp=t((()=>{M(),L(),vp(),yp={motionBlur:!1,dof:!1},bp=1.3,xp=1,Sp=.1,Cp=e=>{let t=null;return e.traverse(e=>{if(t)return;let n=e.getComponentsByTag(`camera`);for(let r=0;r<n.length;r++)if(n[r].displayOut){t=e;return}}),t},wp=class{_entity;_camera;_orbitControls;_renderView;_view;_preview;constructor(e,t){this._entity=e.createEntity({name:`__editorCamera`}),this._camera=this._entity.addComponent(Ir),this._orbitControls=this._entity.addComponent(_p),this._orbitControls.setElm(e.canvas),this._renderView=t,this._view=`editor`,this._preview=!1,this._apply(e)}get entity(){return this._entity}get camera(){return this._camera}get orbitControls(){return this._orbitControls}get view(){return this._view}get preview(){return this._preview}get usingEditorCamera(){return!this._preview&&this._view===`editor`}setView(e,t){this._view=e,this._apply(t)}setPreview(e,t){this._preview=e,this._apply(t)}_apply(e){let t=this._renderView;this.usingEditorCamera?(t.camera!==this._entity&&this.syncFromSceneCamera(e),t.camera=this._entity,this._orbitControls.enabled=!0):(t.camera=null,this._orbitControls.enabled=!1),t.pipelineOverride=this.usingEditorCamera?yp:null}focus(e){e.updateMatrixRecursive(!0);let t=this._getWorldBounds(e),n=new A,r=xp;t?(n.copy(t.min).add(t.max).multiply(.5),r=Math.max(t.max.clone().sub(t.min).length()*.5,Sp)):e.matrixWorld.decompose(n);let i=r/Math.tan(this._camera.fov*Math.PI/360)*bp,a=this._orbitControls.eye.clone().sub(this._orbitControls.target);a.length()<1e-6&&a.set(0,0,1),a.normalize().multiply(i),this._orbitControls.setPosition(n.clone().add(a),n)}_getWorldBounds(e){let t=new A(1/0,1/0,1/0),n=new A(-1/0,-1/0,-1/0),r=!1;return e.traverse(e=>{if(!e.visible)return;let i=e.getComponent(F);if(!i)return;let a=i.geometry.boundingBox;if(a){for(let r=0;r<8;r++){let i=new A(r&1?a.max.x:a.min.x,r&2?a.max.y:a.min.y,r&4?a.max.z:a.min.z).applyMatrix4AsPosition(e.matrixWorld);t.x=Math.min(t.x,i.x),t.y=Math.min(t.y,i.y),t.z=Math.min(t.z,i.z),n.x=Math.max(n.x,i.x),n.y=Math.max(n.y,i.y),n.z=Math.max(n.z,i.z)}r=!0}}),r?{min:t,max:n}:null}getCameraEntity(e){return this._renderView.camera||Cp(e.root)}updateBeforeRender(e){if(!this.usingEditorCamera)return;let t=e.createEntityUpdateEvent();this._entity.commitFrame(t),this._entity.updateMatrix(),this._camera.aspect=e.renderer.resolution.x/e.renderer.resolution.y,this._camera.needsUpdateProjectionMatrix=!0,this._entity.update(t),this._entity.postUpdate(t),this._entity.updateMatrixRecursive(),this._entity.prepareRender(t)}resize(e){this._camera.aspect=e.x/e.y,this._camera.needsUpdateProjectionMatrix=!0}dispose(){this._entity.dispose()}syncFromSceneCamera(e){let t=Cp(e.root);if(!t)return;let n=new A;t.matrixWorld.decompose(n);let r=t.getComponentsByTag(`camera`)[0];this._orbitControls.setPosition(n,this._resolveOrbitTarget(t,r,n)),r&&(this._camera.fov=r.fov,this._camera.near=r.near,this._camera.far=r.far,this._camera.needsUpdateProjectionMatrix=!0)}_resolveOrbitTarget(e,t,n){let r=Math.max(t?t.dofParams.focusDistance:5,.1),i=new A(0,0,-1,0).applyMatrix3(e.matrixWorld).normalize();return n.clone().add(i.multiply(r))}}})))()}var Ep;function Dp(){return(Dp=t((()=>{P(),M(),Ep=class extends rr{_draw;_view;_elm;_outTarget;_frameLabels;_enable;_resolution;_count;_total;_tile;_tilePixelSize;_tileInv;_focus;_prevFrameLabels;_labelCount;_overlay;constructor(e,t,n){super(),this._draw=t,this._view=n,this._elm=e,this._outTarget=t.createTarget(),this._enable=!1,this._count=0,this._total=1,this._tile=new A(1,1),this._tilePixelSize=new A(1,1),this._tileInv=new A(1,1),this._focus=null,this._frameLabels=[],this._prevFrameLabels=[],this._labelCount=new Map,this._resolution=new A,this._overlay=document.createElement(`div`),this._overlay.style.cssText=`position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;color:#fff;font-family:'Courier New',monospace;font-weight:500;mix-blend-mode:difference;`,t.onDrawPass((e,t)=>this._push(e,t));let r=new A(0,0),i=this._onClick.bind(this),a=e=>{r.set(e.clientX,e.clientY)},o=e=>{let t=new A(e.clientX,e.clientY);r.clone().sub(t).length()<10&&i(e)};this._elm.addEventListener(`pointerdown`,a),this._elm.addEventListener(`pointerup`,o);let s=e=>{if(e.key===`Escape`&&(this._focus=null,this._clear()),e.key==`ArrowRight`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.min(e+1,this._prevFrameLabels.length-1);this._focus=this._prevFrameLabels[t]??this._focus}if(e.key==`ArrowLeft`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.max(e-1,0);this._focus=this._prevFrameLabels[t]??this._focus}};window.addEventListener(`keydown`,s),this.once(`dispose`,()=>{this._elm.removeEventListener(`pointerdown`,a),this._elm.removeEventListener(`pointerup`,o),window.removeEventListener(`keydown`,s),this._overlay.remove()})}_calcTilePos(e){return{x:e%this._tile.x*this._tileInv.x*this._resolution.x,y:Math.floor(e/this._tile.x)*this._tileInv.y*this._resolution.y}}_push(e,t){if(!this._enable)return;let n=t||String(this._count),r=this._labelCount.get(n)||0;this._labelCount.set(n,r+1);let i=r>0?n+`#`+r:n;if(this._focus==null||this._focus==i){let{x:t,y:n}=this._calcTilePos(this._count);this._focus!==null&&(t=0,n=0),this._draw.blit(this._view,e,this._outTarget,{x:t,y:n,width:this._tilePixelSize.x,height:this._tilePixelSize.y}),this._frameLabels.push(i)}this._count++}draw(){this._draw.blit(this._view,this._outTarget,null),this._drawLabels(),this._clear()}_drawLabels(){let e=this._elm.parentElement;e&&(this._overlay.parentElement!==e&&e.appendChild(this._overlay),this._overlay.style.fontSize=Math.max(10,this._elm.clientHeight/1080*28)+`px`,this._overlay.replaceChildren(...this._frameLabels.map((e,t)=>{let n=document.createElement(`div`);return n.textContent=e,n.style.cssText=`position:absolute;transform:translateY(-100%);white-space:nowrap;`,n.style.left=t%this._tile.x*this._tileInv.x*100+`%`,n.style.top=(Math.floor(t/this._tile.x)+1)*this._tileInv.y*100+`%`,n.style.paddingLeft=`5px`,n})))}_clear(){this._total=this._count,this._prevFrameLabels=this._frameLabels;let e=Math.sqrt(this._focus===null?Math.max(this._total,1):1);this._tile.set(Math.round(e),Math.ceil(e)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameLabels=[],this._count=0,this._labelCount.clear()}reflesh(){this.resize(this._resolution)}resize(e){this._resolution.copy(e)}_onClick(e){if(this._enable){if(this.reflesh(),this._focus===null){let t=new A(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),n=Math.floor(e.offsetX/t.x)+Math.floor(e.offsetY/t.y)*this._tile.x;n>=0&&n<this._prevFrameLabels.length&&(this._focus=this._prevFrameLabels[n])}this._clear()}}set enable(e){this._enable=e,e?this.reflesh():this._overlay.remove()}get enable(){return this._enable}dispose(){this.emit(`dispose`)}}})))()}function Op(e,t){let n=e.clone().normalize(),r=Math.sin(t/2),i=new An;return i.set(n.x*r,n.y*r,n.z*r,Math.cos(t/2)),i}function kp(e,t){let n=e.clone().normalize(),r=t.clone().normalize(),i=n.dot(r);if(i>.99999)return new An;if(i<-.99999){let e=Math.abs(n.x)>.9?new A(0,1,0):new A(1,0,0);return Op(n.clone().cross(e),Math.PI)}return Op(n.clone().cross(r),Math.acos(Math.min(1,Math.max(-1,i))))}function Ap(e){let t=new An;return e.matrixWorld.decompose(void 0,t),t}function jp(e,t){return e.clone().applyMatrix4AsDirection(new j().applyQuaternion(t))}function Mp(e,t,n){let r=new A(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:jp(r,Ap(e)).normalize()}function Np(e,t,n){return e.clone().multiply(t.clone().multiply(n))}function Pp(e,t,n){let r=e.origin.clone().sub(t),i=e.direction.dot(n),a=r.dot(n),o=r.dot(e.direction),s=1-i*i+1e-4;return a+(a*i-o)/s*i}function Fp(e,t,n){let r=e.direction.dot(n);if(Math.abs(r)<1e-4)return null;let i=t.clone().sub(e.origin).dot(n)/r;return e.origin.clone().add(e.direction.clone().multiply(i))}function Ip(){return(Ip=t((()=>{M()})))()}var Lp,Rp,zp,Bp,Vp,Hp,Up,Wp;function Gp(){return(Gp=t((()=>{M(),L(),Ip(),Lp={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},Rp={xy:`z`,yz:`x`,xz:`y`},zp={xy:[`x`,`y`],yz:[`y`,`z`],xz:[`x`,`z`]},Bp=[.75,.75,.75],Vp=[1,.95,.4],Hp=.45,Up=.18,Wp=class e{static VIEW_SCALE_FACTOR=.15;entity;_engine;_draw;_orientation;_camWorldPos;_records;_hoverHandle;_activeHandle;_dragging;constructor(e,t,n){this._engine=e,this._draw=t,this.entity=e.createEntity({name:n}),this.entity.initiator=`god`,this.entity.visible=!1,this._orientation=`global`,this._camWorldPos=new A,this._records=[],this._hoverHandle=null,this._activeHandle=null,this._dragging=!1}_createEntity(e){let t=this._engine.createEntity({name:e});return t.initiator=`god`,t}_registerHandle(e,t,n){let r=[...n];return this._records.push({handle:e,root:t,color:r,baseColor:[...n]}),this.entity.add(t),r}_addVisual(e,t,n){let r=this._createEntity(`__gizmo_visual`);return r.addComponent(F,{geometry:t,material:this._draw.materials.flat({color:n,depthTest:!1,depthWrite:!1})}),e.add(r),r}_addHit(e,t){let n=this._createEntity(`__gizmo_hit`);return n.addComponent(F,{geometry:t}),e.add(n),n}_addPlaneHandle(e){let t=this._createEntity(`__gizmo_plane_`+e),n=this._registerHandle(e,t,Lp[Rp[e]]);return this._addVisual(t,new Mr({width:Up,height:Up}),n),this._addHit(t,new Mr({width:Up*1.6,height:Up*1.6})),e===`yz`?(t.euler.set(0,Math.PI/2,0),t.position.set(0,Hp,Hp)):e===`xz`?(t.euler.set(Math.PI/2,0,0),t.position.set(Hp,0,Hp)):t.position.set(Hp,Hp,0),t}_addCenterHandle(){let e=this._createEntity(`__gizmo_center`),t=this._registerHandle(`center`,e,Bp);return this._addVisual(e,new Qr({innerRadius:.1,outerRadius:.14,thetaSegments:24}),t),this._addHit(e,new Pr({radius:.16,widthSegments:8,heightSegments:6})),e}setHover(e){this._hoverHandle!==e&&(this._hoverHandle=e,this._updateColors())}_updateColors(){let e=this._dragging?this._activeHandle:this._hoverHandle;for(let t of this._records){let n=t.handle===e?Vp:t.baseColor;t.color[0]=n[0],t.color[1]=n[1],t.color[2]=n[2]}}getHandleEntities(){let e=[];for(let t of this._records)t.root.traverse(n=>{let r=n.getComponent(F);r&&!r.material&&e.push({handle:t.handle,entity:n})});return e}setTarget(t,n,r){if(this._orientation=r,!t){this.entity.visible=!1;return}if(this.entity.visible=!0,this.entity.quaternion.copy(this._rootQuaternion(t,r)),this.entity.position.set(t.matrixWorld.elm[12],t.matrixWorld.elm[13],t.matrixWorld.elm[14]),n){let t=n.matrixWorld.elm;this._camWorldPos.set(t[12],t[13],t[14]);let r=this._camWorldPos.distanceTo(this.entity.position),i=Math.max(.01,r*e.VIEW_SCALE_FACTOR);this.entity.scale.set(i,i,i)}this._onTargetUpdated()}_rootQuaternion(e,t){return t===`local`?Ap(e):new An}_onTargetUpdated(){}_camDirLocal(){return jp(this._camWorldPos.clone().sub(this.entity.position).normalize(),this.entity.quaternion.clone().inverse()).normalize()}_billboardQuat(){return kp(new A(0,0,1),this._camDirLocal())}get activeHandle(){return this._activeHandle}get dragging(){return this._dragging}startDrag(e,t,n){this._activeHandle=e,this._dragging=!0,this._updateColors(),this._onStartDrag(e,t,n)}endDrag(){this._activeHandle=null,this._dragging=!1,this._updateColors()}}})))()}function Kp(e,t,n){let r=[],i=[],a=[],o=[];for(let s=0;s<=n;s++){let c=-Math.PI/2+s/n*Math.PI,l=Math.cos(c),u=Math.sin(c);if(r.push(l*e,u*e,0),r.push(l*t,u*t,0),i.push(0,0,1,0,0,1),a.push(s/n,0,s/n,1),s<n){let e=s*2;o.push(e,e+1,e+2,e+1,e+3,e+2)}}let s=new Er;return s.setAttribute(`position`,new Float32Array(r),3),s.setAttribute(`normal`,new Float32Array(i),3),s.setAttribute(`uv`,new Float32Array(a),2),s.setAttribute(`index`,new Uint16Array(o),1),s}var qp,Jp;function Yp(){return(Yp=t((()=>{M(),L(),Ip(),Gp(),qp=[`x`,`y`,`z`],Jp=class extends Wp{_rings;_viewRoot;_dragCenter;_dragViewNormal;_dragU;_dragV;_dragAxisN;_dragSign;_dragLastAngle;_dragAccumAngle;_dragStartWorldQuat;_parentWorldQuatInv;constructor(e,t){super(e,t,`__gizmo_rotate`),this._dragCenter=new A,this._dragViewNormal=new A(0,0,1),this._dragU=new A(1,0,0),this._dragV=new A(0,1,0),this._dragAxisN=new A(0,0,1),this._dragSign=1,this._dragLastAngle=0,this._dragAccumAngle=0,this._dragStartWorldQuat=new An,this._parentWorldQuatInv=new An;let n={x:Op(new A(0,1,0),Math.PI/2),y:Op(new A(1,0,0),-Math.PI/2),z:new An};this._rings={};for(let e of qp){let t=this._createEntity(`__gizmo_ring_`+e),r=this._registerHandle(e,t,Lp[e]);this._addVisual(t,Kp(.75,.8,48),r),this._addHit(t,Kp(.6,.95,24)),this._rings[e]={wrapper:t,base:n[e],baseInv:n[e].clone().inverse()}}this._viewRoot=this._createEntity(`__gizmo_ring_view`);let r=this._registerHandle(`view`,this._viewRoot,Bp);this._addVisual(this._viewRoot,new Qr({innerRadius:1,outerRadius:1.05,thetaSegments:64}),r),this._addHit(this._viewRoot,new Qr({innerRadius:.92,outerRadius:1.13,thetaSegments:32}))}_onTargetUpdated(){let e=this._camDirLocal();for(let t of qp){let n=this._rings[t],r=jp(e,n.baseInv),i=Math.atan2(r.y,r.x);n.wrapper.quaternion.copy(n.base.clone().multiply(Op(new A(0,0,1),i)))}this._viewRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){this._dragCenter.copy(this.entity.position);let r=t.origin.clone().sub(this._dragCenter).normalize(),i=Math.abs(r.y)>.99?new A(1,0,0):new A(0,1,0);this._dragViewNormal=r,this._dragU=i.cross(r).normalize(),this._dragV=r.clone().cross(this._dragU).normalize(),e===`view`?(this._dragAxisN=r.clone(),this._dragSign=1):(this._dragAxisN=Mp(n,e,this._orientation),this._dragSign=this._dragAxisN.dot(r)<0?-1:1),this._dragLastAngle=this._angleFromRay(t)??0,this._dragAccumAngle=0,this._dragStartWorldQuat=Ap(n),this._parentWorldQuatInv=n.parent?Ap(n.parent).inverse():new An}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this._angleFromRay(e);if(n===null)return null;let r=n-this._dragLastAngle;r>Math.PI?r-=Math.PI*2:r<-Math.PI&&(r+=Math.PI*2),this._dragAccumAngle+=r,this._dragLastAngle=n;let i=Op(this._dragAxisN,this._dragAccumAngle*this._dragSign),a=Np(this._parentWorldQuatInv,i,this._dragStartWorldQuat);return{euler:new On().setFromQuaternion(a)}}_angleFromRay(e){let t=Fp(e,this._dragCenter,this._dragViewNormal);if(!t)return null;let n=t.sub(this._dragCenter);return Math.atan2(n.dot(this._dragV),n.dot(this._dragU))}}})))()}var Xp,Zp,Qp,$p,em,tm,nm;function rm(){return(rm=t((()=>{M(),L(),Ip(),Gp(),Xp=.02,Zp=.1,Qp=.001,$p=1e-4,em=[`x`,`y`,`z`],tm=[`xy`,`yz`,`xz`],nm=class extends Wp{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartAmount;_dragPlaneNormal;_dragStartScale;constructor(e,t){super(e,t,`__gizmo_scale`),this._dragStartPos=new A,this._dragAxisDir=new A(1,0,0),this._dragStartAmount=1,this._dragPlaneNormal=new A(0,0,1),this._dragStartScale=new A(1,1,1);for(let e of em)this._addAxisHandle(e);for(let e of tm)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addAxisHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,Lp[e]),r=.6,i=this._addVisual(t,new Ar({radiusTop:Xp,radiusBottom:Xp,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new Or({width:Zp,height:Zp,depth:Zp}),n);a.position.set(0,.9,0),this._addHit(t,new Ar({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new Or({width:Zp*2,height:Zp*2,depth:Zp*2})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_rootQuaternion(e,t){return Ap(e)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragStartScale.set(n.scale.x,n.scale.y,n.scale.z),e===`x`||e===`y`||e===`z`){this._dragAxisDir=Mp(n,e,`local`);let r=Pp(t,this._dragStartPos,this._dragAxisDir);this._dragStartAmount=Math.abs(r)<$p?$p:r;return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():Mp(n,Rp[e],`local`);let r=Fp(t,this._dragStartPos,this._dragPlaneNormal),i=r?r.sub(this._dragStartPos).length():0;this._dragStartAmount=Math.max($p,i)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle,r;if(n===`x`||n===`y`||n===`z`)r=Pp(e,this._dragStartPos,this._dragAxisDir)/this._dragStartAmount;else{let t=Fp(e,this._dragStartPos,this._dragPlaneNormal);if(!t)return null;r=t.sub(this._dragStartPos).length()/this._dragStartAmount}Math.abs(r)<Qp&&(r=r<0?-.001:Qp);let i={x:!1,y:!1,z:!1};if(n===`center`)i.x=i.y=i.z=!0;else if(n===`x`||n===`y`||n===`z`)i[n]=!0;else for(let e of zp[n])i[e]=!0;return{scale:new A(this._dragStartScale.x*(i.x?r:1),this._dragStartScale.y*(i.y?r:1),this._dragStartScale.z*(i.z?r:1))}}}})))()}var im,am,om,sm,cm,lm;function um(){return(um=t((()=>{M(),L(),Ip(),Gp(),im=.02,am=.22,om=.06,sm=[`x`,`y`,`z`],cm=[`xy`,`yz`,`xz`],lm=class extends Wp{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartProjection;_dragPlaneNormal;_dragPlaneStart;constructor(e,t){super(e,t,`__gizmo_translate`),this._dragStartPos=new A,this._dragAxisDir=new A(1,0,0),this._dragStartProjection=0,this._dragPlaneNormal=new A(0,0,1),this._dragPlaneStart=null;for(let e of sm)this._addArrowHandle(e);for(let e of cm)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addArrowHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,Lp[e]),r=.6,i=this._addVisual(t,new Ar({radiusTop:im,radiusBottom:im,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new Ar({radiusTop:.001,radiusBottom:om,height:am,radSegments:8,heightSegments:1,caps:!0}),n);a.position.set(0,.96,0),this._addHit(t,new Ar({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new Ar({radiusTop:.001,radiusBottom:.11,height:am*1.5,radSegments:6,heightSegments:1,caps:!0})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragPlaneStart=null,e===`x`||e===`y`||e===`z`){this._dragAxisDir=Mp(n,e,this._orientation),this._dragStartProjection=Pp(t,this._dragStartPos,this._dragAxisDir);return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():Mp(n,Rp[e],this._orientation),this._dragPlaneStart=Fp(t,this._dragStartPos,this._dragPlaneNormal)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle;if(n===`x`||n===`y`||n===`z`){let t=Pp(e,this._dragStartPos,this._dragAxisDir)-this._dragStartProjection;return{position:this._dragStartPos.clone().add(this._dragAxisDir.clone().multiply(t))}}if(!this._dragPlaneStart)return null;let r=Fp(e,this._dragStartPos,this._dragPlaneNormal);return r?{position:this._dragStartPos.clone().add(r.sub(this._dragPlaneStart))}:null}}})))()}var dm;function fm(){return(fm=t((()=>{L(),Yp(),rm(),um(),dm=class{_draw;_translateGizmo;_rotateGizmo;_scaleGizmo;_activeGizmo;_mode;_orientation;_showGizmo;constructor(e,t){this._draw=t,this._translateGizmo=new lm(e,t),this._rotateGizmo=new Jp(e,t),this._scaleGizmo=new nm(e,t),this._mode=`select`,this._orientation=`global`,this._activeGizmo=null,this._showGizmo=!0}get showGizmo(){return this._showGizmo}set showGizmo(e){this._showGizmo=e}get activeGizmo(){return this._activeGizmo}get mode(){return this._mode}setMode(e){this._mode=e,this._activeGizmo&&this._activeGizmo.setHover(null),this._activeGizmo=e===`translate`?this._translateGizmo:e===`rotate`?this._rotateGizmo:e===`scale`?this._scaleGizmo:null}get orientation(){return this._orientation}setOrientation(e){this._orientation=e}render(e,t,n,r){if(this._translateGizmo.entity.visible=!1,this._rotateGizmo.entity.visible=!1,this._scaleGizmo.entity.visible=!1,!this._showGizmo||!this._activeGizmo||(this._activeGizmo.setTarget(t||null,n,this._orientation),!this._activeGizmo.entity.visible))return;this._activeGizmo.entity.updateMatrix(!0);let i=r.createEntityUpdateEvent();if(this._activeGizmo.entity.update(i),!n)return;let a=[];this._activeGizmo.entity.traverse(e=>{let t=e.getComponent(F);t&&t.material&&a.push(e)}),a.length>0&&this._draw.renderEntities({view:e,camera:n,entities:a,target:null})}}})))()}var pm;function mm(){return(mm=t((()=>{L(),pm=class extends Er{constructor(){super(),this.update(50,1,.1,10)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,a,-n,o,-a,-n,o,-a,-n,-o,-a,-n,-o,-a,-n,-o,a,-n,-c,s,-r,c,s,-r,c,s,-r,c,-s,-r,c,-s,-r,-c,-s,-r,-c,-s,-r,-c,s,-r,-o,a,-n,-c,s,-r,o,a,-n,c,s,-r,o,-a,-n,c,-s,-r,-o,-a,-n,-c,-s,-r]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.requestUpdate()}}})))()}var hm;function gm(){return(gm=t((()=>{L(),hm=class extends Er{constructor(){super(),this.update(50,1,.1,2)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,-a,-n,-o,-a,-n,-c,s,-r,c,s,-r,c,-s,-r,-c,-s,-r]),u=new Uint16Array([0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,6,2,3,7,6,0,4,7,0,7,3,1,2,6,1,6,5]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.setAttribute(`index`,u,1),this.requestUpdate()}}})))()}var _m;function vm(){return(vm=t((()=>{L(),_m=class extends Er{constructor(e=.5){super();let t=[];for(let n=0;n<16;n++){let r=n/16*Math.PI*2,i=(n+1)/16*Math.PI*2;t.push(Math.cos(r)*e,Math.sin(r)*e,0,Math.cos(i)*e,Math.sin(i)*e,0)}let n=e*2;for(let r=0;r<4;r++){let i=r/4*Math.PI*2,a=Math.cos(i)*e*.5,o=Math.sin(i)*e*.5;t.push(a,o,0,a,o,-n)}let r=new Float32Array(t);this.setAttribute(`position`,r,3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3)}}})))()}var ym;function bm(){return(bm=t((()=>{L(),ym=class extends Er{constructor(e=.5){super();let t=e*2,n=[],r=[];n.push(0,0,0);for(let t=0;t<12;t++){let r=t/12*Math.PI*2;n.push(Math.cos(r)*e,Math.sin(r)*e,0)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(0,e+1,t+1)}n.push(0,0,-t);for(let r=0;r<12;r++){let i=r/12*Math.PI*2;n.push(Math.cos(i)*e,Math.sin(i)*e,-t)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(13,13+t+1,13+e+1)}for(let e=0;e<12;e++){let t=(e+1)%12,n=e+1,i=t+1,a=13+e+1,o=13+t+1;r.push(n,a,o),r.push(n,o,i)}this.setAttribute(`position`,new Float32Array(n),3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(r),1)}}})))()}var xm;function Sm(){return(Sm=t((()=>{L(),xm=class extends Er{constructor(e=.3){super();let t=e/2,n=new Float32Array([-t,0,0,t,0,0,0,-t,0,0,t,0,0,0,-t,0,0,t]);this.setAttribute(`position`,n,3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3)}}})))()}var Cm;function wm(){return(wm=t((()=>{L(),Cm=class extends Er{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[];for(let e=0;e<16;e++){let i=e/16*Math.PI*2,a=(e+1)/16*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t,Math.cos(a)*n,Math.sin(a)*n,-t)}for(let e=0;e<4;e++){let i=e/4*Math.PI*2;r.push(0,0,0,Math.cos(i)*n,Math.sin(i)*n,-t)}let i=new Float32Array(r);this.setAttribute(`position`,i,3),this.setAttribute(`normal`,new Float32Array(i.length).fill(0),3),this.requestUpdate()}}})))()}var Tm;function Em(){return(Em=t((()=>{L(),Tm=class extends Er{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[0,0,0];for(let e=0;e<12;e++){let i=e/12*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t)}let i=[];for(let e=0;e<12;e++){let t=(e+1)%12;i.push(0,e+1,t+1)}for(let e=1;e<11;e++)i.push(1,e+2,e+1);this.setAttribute(`position`,new Float32Array(r),3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(i),1),this.requestUpdate()}}})))()}var Dm;function Om(){return(Om=t((()=>{M(),L(),mm(),gm(),vm(),bm(),Sm(),wm(),Em(),Dm=class{entity;hitAreaEntity;type;targetEntityUUID;_geometry;_hitAreaGeometry;_matrixOffset;_baseColor;_colorUniform;constructor(e,t,n,r){this.type=n,this.targetEntityUUID=r,this.entity=e.createEntity({name:`__helper`}),this.entity.initiator=`god`;let i=this._getColor();this._baseColor=i,this._colorUniform=[...i];let a=t.materials.flat({color:this._colorUniform,lines:!0});this._geometry=this._createGeometry(),this.entity.addComponent(F,{geometry:this._geometry,material:a}),this._hitAreaGeometry=this._createHitAreaGeometry(),this.hitAreaEntity=e.createEntity({name:`__helper_hit`}),this.hitAreaEntity.initiator=`god`,this._hitAreaGeometry&&this.hitAreaEntity.addComponent(F,{geometry:this._hitAreaGeometry}),this._matrixOffset=n===`spotLight`||n===`directionalLight`?new An().setFromEuler({x:-Math.PI/2,y:0,z:0}):null}_getColor(){switch(this.type){case`empty`:return[.8,.5,.2];case`camera`:return[.6,.8,1];case`spotLight`:return[1,.9,.4];case`directionalLight`:return[1,.9,.4]}}_createGeometry(){switch(this.type){case`empty`:return new xm;case`camera`:return new pm;case`spotLight`:return new Cm;case`directionalLight`:return new _m}}_createHitAreaGeometry(){switch(this.type){case`empty`:return null;case`camera`:return new hm;case`spotLight`:return new Tm;case`directionalLight`:return new ym}}getWorldSegments(){let e=this._geometry.getAttribute(`position`);if(!e)return[];let t=e.array,n=[];for(let e=0;e+5<t.length;e+=6)n.push({a:new A(t[e+0],t[e+1],t[e+2]).applyMatrix4AsPosition(this.entity.matrixWorld),b:new A(t[e+3],t[e+4],t[e+5]).applyMatrix4AsPosition(this.entity.matrixWorld)});return n}setSelected(e){let t=e?[1,.6,0]:this._baseColor;this._colorUniform[0]=t[0],this._colorUniform[1]=t[1],this._colorUniform[2]=t[2]}syncTransform(e){if(this.entity.matrixWorld.copy(e.matrixWorld),this.hitAreaEntity.matrixWorld.copy(e.matrixWorld),this._matrixOffset&&(this.entity.matrixWorld.applyQuaternion(this._matrixOffset),this.hitAreaEntity.matrixWorld.applyQuaternion(this._matrixOffset)),this.type===`camera`){let t=e.getComponentsByTag(`camera`)[0];t&&(this._geometry instanceof pm&&this._geometry.update(t.fov,t.aspect,.1,2),this._hitAreaGeometry instanceof hm&&this._hitAreaGeometry.update(t.fov,t.aspect,.1,2))}else if(this.type===`spotLight`){let t=e.getComponent(Br);if(t){let e=Math.min(t.distance,10);this._geometry instanceof Cm&&this._geometry.update(t.angle,e),this._hitAreaGeometry instanceof Tm&&this._hitAreaGeometry.update(t.angle,e)}}}}})))()}var km;function Am(){return(Am=t((()=>{L(),Om(),km=class{_engine;_draw;_showHelpers;_showEmptyHelpers;_showCameraHelpers;_showLightHelpers;_helpers;constructor(e,t){this._engine=e,this._draw=t,this._showHelpers=!0,this._showEmptyHelpers=!0,this._showCameraHelpers=!0,this._showLightHelpers=!0,this._helpers=new Map}get showHelpers(){return this._showHelpers}set showHelpers(e){this._showHelpers=e}get showEmptyHelpers(){return this._showEmptyHelpers}set showEmptyHelpers(e){this._showEmptyHelpers=e}get showCameraHelpers(){return this._showCameraHelpers}set showCameraHelpers(e){this._showCameraHelpers=e}get showLightHelpers(){return this._showLightHelpers}set showLightHelpers(e){this._showLightHelpers=e}render(e,t,n,r){if(!this._showHelpers||!t)return;let i=new Set,a=[];n.root.traverse(e=>{if(e.initiator===`god`||!e.visible||e===t)return;let o=this._getHelperType(e);if(!o||!this._isHelperTypeEnabled(o))return;i.add(e.uuid);let s=this._helpers.get(e.uuid);s||(s=new Dm(this._engine,this._draw,o,e.uuid),this._helpers.set(e.uuid,s));let c=n.createEntityUpdateEvent();s.entity.update(c),s.hitAreaEntity.update(c),s.setSelected(e.uuid===r),s.syncTransform(e),s.entity.traverse(e=>{e.getComponent(F)&&a.push(e)})}),this._helpers.forEach((e,t)=>{i.has(t)||this._helpers.delete(t)}),a.length>0&&this._draw.renderEntities({view:e,camera:t,entities:a,target:null})}getHelpers(){return Array.from(this._helpers.values())}_getHelperType(e){let t=e.getComponent(Br);return t?t.lightType===`spot`?`spotLight`:`directionalLight`:e.getComponentsByTag(`camera`)[0]?`camera`:e.getComponent(F)?null:`empty`}_isHelperTypeEnabled(e){switch(e){case`empty`:return this._showEmptyHelpers;case`camera`:return this._showCameraHelpers;case`spotLight`:case`directionalLight`:return this._showLightHelpers}}}})))()}var jm,Mm;function Nm(){return(Nm=t((()=>{Xa(),jm=()=>{let e=document.activeElement;return e?e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.isContentEditable:!1},Mm=class{_keyboard;constructor(e){this._keyboard=new Ya,this._keyboard.on(`keydown`,(t,n)=>{if(t.isComposing)return;let r=n.Meta||n.Control;r&&n.s&&(t.preventDefault(),e.onSave()),!jm()&&(e.onTransformKey(t)||(r&&n.z&&(t.preventDefault(),n.Shift?e.onRedo():e.onUndo()),t.key==` `&&!r&&e.onPlayToggle(),(t.code===`Numpad0`||t.key===`0`)&&!r&&e.onCameraViewToggle(),t.key===`9`&&!r&&e.onPreviewToggle(),t.key===`Escape`&&!r&&e.onSyncToSceneCamera(),(t.code===`NumpadDecimal`||t.key===`.`)&&!r&&e.onFocusSelected()))})}dispose(){this._keyboard.dispose()}}})))()}var Pm,Fm,Im;function Lm(){return(Lm=t((()=>{M(),Pm=e=>{let t=e.getBoundingClientRect(),n=e.width/e.height,r=t.width/t.height,i=t.width,a=t.height,o=0,s=0;return r>n?(i=t.height*n,o=(t.width-i)/2):(a=t.width/n,s=(t.height-a)/2),{left:t.left+o,top:t.top+s,width:i,height:a}},Fm=(e,t,n)=>{let r=Pm(e),i=(t-r.left)/r.width*2-1,a=-((n-r.top)/r.height)*2+1;return new A(i,a)},Im=(e,t,n)=>{let r=Pm(e),i=(t+1)/2*r.width+r.left,a=(1-n)/2*r.height+r.top;return new A(i,a)}})))()}var Rm,zm,Bm,Vm,Hm,Um,Wm;function Gm(){return(Gm=t((()=>{M(),L(),up(),Ip(),Lm(),Rm=1,zm=.001,Bm=.007,Vm=.1,Hm={translate:`position`,rotate:`euler`,scale:`scale`},Um=[`x`,`y`,`z`],Wm=class{_engine;_editorCamera;_api;_getSelectedEntity;_isPointerBusy;_onStatusChange;_canvas;_pointerClient;_session;_disposeListeners;constructor(e){this._engine=e.engine,this._editorCamera=e.editorCamera,this._api=e.api,this._getSelectedEntity=e.getSelectedEntity,this._isPointerBusy=e.isPointerBusy,this._onStatusChange=e.onStatusChange,this._canvas=e.engine.canvas,this._pointerClient=new A,this._session=null;let t=e=>{this._pointerClient.set(e.clientX,e.clientY)};window.addEventListener(`pointermove`,t),this._disposeListeners=()=>{window.removeEventListener(`pointermove`,t)}}get active(){return this._session!==null}get constraintDisplay(){let e=this._session;if(!e||e.trackball||!e.constraint)return null;let t=e.constraint,n=e.mode===`scale`||t.orientation===`local`;return{origin:e.anchorWorldPos,quat:n?e.startWorldQuat:new An,axes:t.plane?Um.filter(e=>e!==t.axis):[t.axis]}}handleKeyDown(e){let t=this._session;if(!t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return!1;let t=e.key.toLowerCase(),n=t===`g`?`translate`:t===`r`?`rotate`:t===`s`?`scale`:null;return n?this._start(n):!1}let n=e.key.toLowerCase();return e.key===`Enter`?this._confirm():e.key===`Escape`?this._cancel():n===`r`&&t.mode===`rotate`?this._toggleTrackball():t.trackball||(n===`x`||n===`y`||n===`z`?this._toggleConstraint(n,e.shiftKey):this._inputNumber(e.key)),!0}_inputNumber(e){let t=this._session;if(t){if(e.length===1&&e>=`0`&&e<=`9`)t.numberBuffer+=e;else if(e===`.`){if(t.numberBuffer.includes(`.`))return;t.numberBuffer+=`.`}else if(e===`-`)t.numberBuffer=t.numberBuffer.startsWith(`-`)?t.numberBuffer.slice(1):`-`+t.numberBuffer;else if(e===`Backspace`){if(t.numberBuffer===``)return;t.numberBuffer=t.numberBuffer.slice(0,-1)}else return;this._update()}}_start(e){if(this._isPointerBusy())return!1;let t=this._editorCamera.getCameraEntity(this._engine);if(!t)return!1;let n=this._getSelectedEntity(),r=this._editorCamera.view===`camera`&&(!n||n===t);if(r&&e===`scale`)return!1;let i=r?t:n;if(!i)return!1;let a=t.getComponentsByTag(`camera`)[0];if(!a)return!1;let o=t.matrixWorld.elm,s=new A(o[12],o[13],o[14]),c=new A(-o[8],-o[9],-o[10]).normalize(),l=new A(o[0],o[1],o[2]).normalize(),u=new A(o[4],o[5],o[6]).normalize(),d=i.matrixWorld.elm,f=new A(d[12],d[13],d[14]),p=r?f.clone().add(c.clone().multiply(Math.max(a.dofParams.focusDistance,Vm))):f.clone(),m=e=>{e.stopPropagation(),this._session&&(this._session.lastPointer.set(e.clientX,e.clientY),this._update())},h=e=>{e.preventDefault(),e.stopPropagation(),e.button===2?this._cancel():e.button===0&&this._confirm()};window.addEventListener(`pointermove`,m,{capture:!0}),window.addEventListener(`pointerdown`,h,{capture:!0});let g=this._editorCamera.orbitControls,_=g.enabled;return g.enabled=!1,this._session={mode:e,entity:i,selfView:r,constraint:null,numberBuffer:``,trackball:!1,trackballQuat:new An,trackballPointer:this._pointerClient.clone(),startValue:{position:i.position.getElm(`vec3`),euler:i.euler.getElm(`vec3`),scale:i.scale.getElm(`vec3`)},startWorldPos:f,startWorldQuat:Ap(i),parentWorldInv:i.parent?i.parent.matrixWorld.clone().inverse():new j,parentWorldQuatInv:i.parent?Ap(i.parent).inverse():new An,camForward:c,camRight:l,camUp:u,camWorldPos:s,anchorWorldPos:p,projInv:a.projectionMatrix.clone().inverse(),viewInv:a.viewMatrix.clone().inverse(),centerClient:this._projectToClient(f,a),startPointer:this._pointerClient.clone(),lastPointer:this._pointerClient.clone(),disposeSession:()=>{window.removeEventListener(`pointermove`,m,{capture:!0}),window.removeEventListener(`pointerdown`,h,{capture:!0}),g.enabled=_,this._session&&this._pointerClient.copy(this._session.lastPointer),this._session=null,this._onStatusChange(null)}},this._update(),!0}_confirm(){let e=this._session;if(!e)return;let t=Hm[e.mode],n=e.entity[t].getElm(`vec3`);this._api.commandManager.execute(new lp(e.entity,t,e.startValue[t],n)),e.disposeSession()}_cancel(){let e=this._session;e&&(this._restoreStart(e),e.entity.updateMatrix(!0),e.disposeSession())}_restoreStart(e){e.entity.position.setFromArray(e.startValue.position),e.entity.euler.setFromArray(e.startValue.euler),e.entity.scale.setFromArray(e.startValue.scale)}_toggleConstraint(e,t){let n=this._session;if(!n||t&&n.mode===`rotate`)return;let r=n.constraint;n.constraint=!r||r.axis!==e||r.plane!==t?{axis:e,orientation:`global`,plane:t}:r.orientation===`global`?{axis:e,orientation:`local`,plane:t}:null,this._update()}_axisWorldDir(e,t,n){let r=new A(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:jp(r,e.startWorldQuat).normalize()}_toggleTrackball(){let e=this._session;e&&(e.trackball=!e.trackball,e.constraint=null,e.numberBuffer=``,e.trackballQuat=new An,e.trackballPointer.copy(e.lastPointer),this._update())}_accumulateTrackball(e){let t=e.lastPointer.x-e.trackballPointer.x,n=e.lastPointer.y-e.trackballPointer.y;if(e.trackballPointer.copy(e.lastPointer),t===0&&n===0)return;let r=Op(e.camUp,t*Bm).multiply(Op(e.camRight,n*Bm));e.trackballQuat.preMultiply(r)}_update(){let e=this._session;if(!e)return;let t=e.numberBuffer===``?null:parseFloat(e.numberBuffer),n=0;t!==null&&Number.isNaN(t)?this._restoreStart(e):n=e.mode===`translate`?this._applyTranslate(e,t):e.mode===`rotate`?this._applyRotate(e,t):this._applyScale(e,t),e.entity.updateMatrix(!0),this._onStatusChange(this._statusText(e,n))}_applyTranslate(e,t){let n=e.constraint;if(t!==null){let n=this._numericTranslateDir(e);return this._setWorldPosition(e,e.startWorldPos.clone().add(n.multiply(t))),t}let r=this._rayFromClient(e.startPointer,e),i=this._rayFromClient(e.lastPointer,e);if(n&&!n.plane){let t=this._axisWorldDir(e,n.axis,n.orientation),a=Pp(i,e.anchorWorldPos,t)-Pp(r,e.anchorWorldPos,t);return this._setWorldPosition(e,e.startWorldPos.clone().add(t.clone().multiply(a))),a}let a=n?this._axisWorldDir(e,n.axis,n.orientation):e.camForward,o=Fp(r,e.anchorWorldPos,a),s=Fp(i,e.anchorWorldPos,a);if(!o||!s)return 0;let c=s.sub(o);return this._setWorldPosition(e,e.startWorldPos.clone().add(c)),c.length()}_numericTranslateDir(e){let t=e.constraint;if(!t)return new A(1,0,0);let n=t.plane?t.axis===`x`?`y`:`x`:t.axis;return this._axisWorldDir(e,n,t.orientation)}_applyRotate(e,t){if(e.trackball)return this._accumulateTrackball(e),this._setWorldRotation(e,e.trackballQuat.clone()),0;let n=e.constraint?this._axisWorldDir(e,e.constraint.axis,e.constraint.orientation):e.camForward,r=e.selfView?e.camForward.clone().multiply(-1):e.camWorldPos.clone().sub(e.startWorldPos),i=t!==null&&e.constraint?1:n.dot(r)<0?-1:1,a=t===null?this._screenAngle(e.lastPointer,e.centerClient)-this._screenAngle(e.startPointer,e.centerClient):t*Math.PI/180;return this._setWorldRotation(e,Op(n,a*i)),a*180/Math.PI}_applyScale(e,t){let n;if(t!==null)n=t;else{let t=Math.max(Rm,e.startPointer.distanceTo(e.centerClient));n=Math.max(zm,e.lastPointer.distanceTo(e.centerClient)/t)}let r=e.startValue.scale,i=e.constraint,a=Um.map(e=>i?(i.plane?e!==i.axis:e===i.axis)?n:1:n);return e.entity.scale.set(r[0]*a[0],r[1]*a[1],r[2]*a[2]),n}_setWorldPosition(e,t){let n=t.applyMatrix4AsPosition(e.parentWorldInv);e.entity.position.set(n.x,n.y,n.z)}_setWorldRotation(e,t){e.entity.quaternion.copy(Np(e.parentWorldQuatInv,t,e.startWorldQuat))}_statusText(e,t){if(e.trackball)return`Rot: trackball`;let n=e.mode===`translate`?`Move D`:e.mode===`rotate`?`Rot`:`Scale`,r=e.mode===`rotate`?`°`:``;return`${n}: ${e.numberBuffer===``?t.toFixed(e.mode===`rotate`?1:3):`[${e.numberBuffer}]`}${r} (${this._constraintText(e)})`}_constraintText(e){let t=e.constraint;if(!t)return e.mode===`translate`?`view plane`:e.mode===`rotate`?`view axis`:`uniform`;let n=Um.filter(e=>t.plane?e!==t.axis:e===t.axis).join(``).toUpperCase();return`${e.mode===`scale`?`local`:t.orientation} ${n}`}_rayFromClient(e,t){let n=Fm(this._canvas,e.x,e.y);return new ri().setFromCamera(n,t.projInv,t.viewInv)}_projectToClient(e,t){let n=new A(e.x,e.y,e.z,1).applyMatrix4(t.viewMatrix).applyMatrix4(t.projectionMatrix);return Math.abs(n.w)<1e-4?Im(this._canvas,0,0):Im(this._canvas,n.x/n.w,n.y/n.w)}_screenAngle(e,t){return Math.atan2(-(e.y-t.y),e.x-t.x)}dispose(){this._cancel(),this._disposeListeners()}}})))()}var Km,qm,Jm;function Ym(){return(Ym=t((()=>{M(),L(),up(),Lm(),Km=12,qm=12,Jm=class{_raycaster;_pointerDownPos;_gizmoDragging;_gizmoDragStartValue;_hoveredTarget;_lastClickNDC;_lastClickCandidateUUIDs;_lastClickCycleIndex;_disposeListeners;constructor(e,t,n,r,i,a,o,s,c,l,u){this._raycaster=new ai,this._pointerDownPos=null,this._gizmoDragging=!1,this._gizmoDragStartValue=null,this._hoveredTarget=null,this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1;let d=e.canvas,f=()=>t.getCameraEntity(e),p=(e,t)=>{let n=t.getComponentsByTag(`camera`)[0];if(!n)return null;let r=new A(e.x,e.y,e.z,1);return r.applyMatrix4(n.viewMatrix).applyMatrix4(n.projectionMatrix),r.w<=0?null:new A(r.x/r.w,r.y/r.w)},m=new ai,h=t=>{let n=this._raycaster.ray.origin,r=t.x-n.x,i=t.y-n.y,a=t.z-n.z,o=Math.sqrt(r*r+i*i+a*a);if(o<1e-4)return!1;m.ray.origin.copy(n),m.ray.direction.set(r/o,i/o,a/o);let s=m.intersectEntities(e.root);for(let e of s)if(e.entity.initiator!==`god`)return e.distance<o-.001;return!1},g=new ai,_=new A,v=(e,t)=>{for(let[n,r]of[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])if(_.set(n,r),g.setFromCamera(_,t),g.intersectEntities(e).length===0)return!1;return!0},y=(e,t,n,r)=>{for(let i of e.getWorldSegments()){let e=p(i.a,n),a=p(i.b,n);if(!e||!a)continue;let o=(e.x-t.x)*r.width*.5,s=(e.y-t.y)*r.height*.5,c=(a.x-t.x)*r.width*.5,l=(a.y-t.y)*r.height*.5,u=c-o,d=l-s,f=u*u+d*d,m=f>0?Math.max(0,Math.min(1,-(o*u+s*d)/f)):0,h=o+u*m,g=s+d*m;if(Math.sqrt(h*h+g*g)<=qm)return!0}return!1},b=n=>{let i=f();if(!i)return[];this._raycaster.setFromCamera(n,i);let a=[];for(let t of this._raycaster.intersectEntities(e.root))t.entity.initiator!==`god`&&o(t.entity)&&a.push({entity:t.entity,distance:t.distance,type:`mesh`});let s=a.length>0?a[0].distance:1/0,c=[],l=[],u=new Set,m=r.getHelpers(),g=Pm(d);for(let t of m){let r=e.root.findEntityByUUID(t.targetEntityUUID);if(!r||!o(r))continue;if(t.type===`empty`){if(!y(t,n,i,g))continue;u.add(t.targetEntityUUID);let e=t.entity.matrixWorld.elm,a=e[12]-this._raycaster.ray.origin.x,o=e[13]-this._raycaster.ray.origin.y,d=e[14]-this._raycaster.ray.origin.z,f=Math.sqrt(a*a+o*o+d*d),p={entity:r,distance:f,type:`helper`};f<=s?c.push(p):l.push(p);continue}let a=this._raycaster.intersectEntities(t.hitAreaEntity);if(a.length===0)continue;u.add(t.targetEntityUUID);let d={entity:r,distance:a[0].distance,type:`helper`};if(v(t.hitAreaEntity,i)){y(t,n,i,g)&&c.push(d);continue}a[0].distance<=s?c.push(d):l.push(d)}t.view===`camera`&&Math.min((1-Math.abs(n.x))*g.width*.5,(1-Math.abs(n.y))*g.height*.5)<=qm&&o(i)&&c.push({entity:i,distance:0,type:`helper`}),c.sort((e,t)=>e.distance-t.distance),l.sort((e,t)=>e.distance-t.distance);let _=[];for(let{targetEntityUUID:t}of m){if(u.has(t))continue;let r=e.root.findEntityByUUID(t);if(!r||!o(r))continue;let a=r.matrixWorld.elm,s=new A(a[12],a[13],a[14]),c=p(s,i);if(!c)continue;let l=(c.x-n.x)*g.width*.5,d=(c.y-n.y)*g.height*.5,f=Math.sqrt(l*l+d*d);if(f>Km||h(s))continue;let m=s.x-this._raycaster.ray.origin.x,v=s.y-this._raycaster.ray.origin.y,y=s.z-this._raycaster.ray.origin.z;_.push({candidate:{entity:r,distance:Math.sqrt(m*m+v*v+y*y),type:`helper`},screenDistance:f})}return _.sort((e,t)=>e.screenDistance-t.screenDistance),[...c,..._.map(e=>e.candidate),...a,...l]},x=()=>{let e=n.activeGizmo;if(!e||!e.entity.visible)return null;let t=null;for(let{handle:n,entity:r}of e.getHandleEntities()){let e=this._raycaster.intersectEntities(r);e.length>0&&(!t||e[0].distance<t.distance)&&(t={handle:n,distance:e[0].distance})}return t},S=r=>{if(!l()&&(r.pointerType!==`mouse`||r.button===0)){if(t.preview){r.target.setPointerCapture(r.pointerId),this._pointerDownPos=new A(r.clientX,r.clientY);return}if(!(r.pointerType===`touch`&&this._gizmoDragging)&&(r.target.setPointerCapture(r.pointerId),this._pointerDownPos=new A(r.clientX,r.clientY),n.activeGizmo&&n.activeGizmo.entity.visible)){let i=Fm(d,r.clientX,r.clientY),o=f();if(o){this._raycaster.setFromCamera(i,o);let r=x();if(r){let i=a(),o=i?e.root.findEntityByUUID(i):null;o&&(this._gizmoDragging=!0,t.orbitControls.enabled=!1,d.style.cursor=`grabbing`,this._gizmoDragStartValue={position:o.position.getElm(`vec3`),euler:o.euler.getElm(`vec3`),scale:o.scale.getElm(`vec3`)},n.activeGizmo.startDrag(r.handle,this._raycaster.ray,o))}}}}},C=r=>{if(l())return;if((t.preview||t.view===`camera`)&&this._pointerDownPos&&!this._gizmoDragging){let e=r.clientX-this._pointerDownPos.x,t=r.clientY-this._pointerDownPos.y;Math.sqrt(e*e+t*t)>5&&u()}if(t.preview){d.style.cursor=``;return}let i=Fm(d,r.clientX,r.clientY),o=f();if(!o)return;if(this._raycaster.setFromCamera(i,o),this._gizmoDragging){let t=a(),r=t?e.root.findEntityByUUID(t):null;if(!r)return;let i=n.activeGizmo.updateDrag(this._raycaster.ray,r);if(i){if(i.position){let e=i.position.clone();r.parent&&e.applyMatrix4AsPosition(r.parent.matrixWorld.clone().inverse()),r.position.copy(e)}i.euler&&r.euler.set(i.euler.x,i.euler.y,i.euler.z),i.scale&&r.scale.set(i.scale.x,i.scale.y,i.scale.z),r.updateMatrix(!0)}return}let s=null;if(n.activeGizmo&&n.activeGizmo.entity.visible){let e=x();e&&(s=`gizmo`),n.activeGizmo.setHover(e?e.handle:null)}if(!s){let e=b(i);e.length>0&&(s=e[0].type)}s!==this._hoveredTarget&&(this._hoveredTarget=s,s===`gizmo`?d.style.cursor=`grab`:s===`helper`||s===`mesh`?d.style.cursor=`pointer`:d.style.cursor=``)},ee=r=>{if(l())return;if(t.preview){this._pointerDownPos=null;return}if(this._gizmoDragging){n.activeGizmo.endDrag(),this._gizmoDragging=!1,t.orbitControls.enabled=t.usingEditorCamera,d.style.cursor=this._hoveredTarget===`gizmo`?`grab`:``;let r=a(),o=r?e.root.findEntityByUUID(r):null;if(o&&this._gizmoDragStartValue){let e=s(),t=e===`translate`?`position`:e===`rotate`?`euler`:`scale`,n=this._gizmoDragStartValue[t],r=o[t].getElm(`vec3`);i.commandManager.execute(new lp(o,t,n,r))}this._gizmoDragStartValue=null,this._pointerDownPos=null;return}if(!this._pointerDownPos)return;let o=r.clientX-this._pointerDownPos.x,u=r.clientY-this._pointerDownPos.y,p=Math.sqrt(o*o+u*u);if(this._pointerDownPos=null,p>5)return;let m=Fm(d,r.clientX,r.clientY);if(!f())return;let h=b(m);if(h.length===0){this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1,c(null);return}let g=.02,_=this._lastClickNDC&&Math.abs(m.x-this._lastClickNDC.x)<g&&Math.abs(m.y-this._lastClickNDC.y)<g,v=h.map(e=>e.entity.uuid),y=_&&v.length===this._lastClickCandidateUUIDs.length&&v.every((e,t)=>e===this._lastClickCandidateUUIDs[t]),x=0;y&&h.length>1&&(x=(this._lastClickCycleIndex+1)%h.length),this._lastClickNDC=new A(m.x,m.y),this._lastClickCandidateUUIDs=v,this._lastClickCycleIndex=x,c(h[x].entity)},te=e=>{e.preventDefault()};d.addEventListener(`pointerdown`,S),d.addEventListener(`pointermove`,C),d.addEventListener(`pointerup`,ee),d.addEventListener(`contextmenu`,te),this._disposeListeners=()=>{d.removeEventListener(`pointerdown`,S),d.removeEventListener(`pointermove`,C),d.removeEventListener(`pointerup`,ee),d.removeEventListener(`contextmenu`,te)}}get gizmoDragging(){return this._gizmoDragging}dispose(){this._disposeListeners()}}})))()}var Xm,Zm,Qm;function $m(){return($m=t((()=>{L(),Xm={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},Zm=1e3,Qm=class{_draw;_root;_axisEntities;constructor(e,t){this._draw=t,this._root=e.createEntity({name:`__constraint_axis`}),this._root.initiator=`god`,this._axisEntities={x:this._createAxisLine(e,`x`),y:this._createAxisLine(e,`y`),z:this._createAxisLine(e,`z`)},this._root.add(this._axisEntities.x),this._root.add(this._axisEntities.y),this._root.add(this._axisEntities.z)}_createAxisLine(e,t){let n=e.createEntity({name:`__constraint_axis_line`});n.initiator=`god`;let r=t===`x`?[-1,0,0,1,0,0]:t===`y`?[0,-1,0,0,1,0]:[0,0,-1,0,0,1],i=new Er;return i.setAttribute(`position`,new Float32Array(r),3),i.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),n.addComponent(F,{geometry:i,material:this._draw.materials.flat({color:Xm[t],lines:!0,depthTest:!1,depthWrite:!1})}),n}render(e,t,n,r){if(!t||!n)return;let i=n.matrixWorld.elm,a=t.origin.x-i[12],o=t.origin.y-i[13],s=t.origin.z-i[14],c=Math.max(1,Math.sqrt(a*a+o*o+s*s))*Zm;this._root.position.copy(t.origin),this._root.quaternion.copy(t.quat),this._root.scale.set(c,c,c),this._root.updateMatrix(!0),this._root.update(r.createEntityUpdateEvent()),this._draw.renderEntities({view:e,camera:n,entities:t.axes.map(e=>this._axisEntities[e]),target:null})}}})))()}var eh;function th(){return(th=t((()=>{L(),eh=class{_draw;_entity;_color;_params;_showGrid;constructor(e,t){this._draw=t,this._showGrid=!0,this._color=[.35,.35,.35],this._params=[1,1,100],this._entity=e.createEntity({name:`__grid`}),this._entity.initiator=`god`,this._entity.addComponent(F,{geometry:new Mr({floor:!0}),material:t.materials.grid({color:this._color,params:this._params})})}get showGrid(){return this._showGrid}set showGrid(e){this._showGrid=e}render(e,t,n){if(!this._showGrid||!t)return;let r=t.matrixWorld.elm,i=Math.max(Math.abs(r[13]),.5),a=Math.max(0,Math.floor(Math.log10(i)));this._params[0]=10**a,this._params[1]=1-Math.max(0,Math.log10(i)-a),this._params[2]=Math.max(50,i*30),this._entity.position.set(r[12],0,r[14]),this._entity.scale.set(this._params[2]*2,1,this._params[2]*2),this._entity.update(n.createEntityUpdateEvent()),this._draw.renderEntities({view:e,camera:t,entities:[this._entity],target:null})}}})))()}var nh,rh;function ih(){return(ih=t((()=>{L(),nh=[1,.6,0],rh=class{_draw;_maskTarget;_maskMaterial;_outline;_showOutline;constructor(e){this._draw=e,this._maskTarget=e.createTarget(),this._maskMaterial=e.materials.mask(),this._outline=e.recipes.outline(this._maskTarget,nh),this._showOutline=!0}get showOutline(){return this._showOutline}set showOutline(e){this._showOutline=e}render(e,t,n){this._showOutline&&(!t||!n||t.getComponent(F)&&(this._draw.renderEntities({view:e,camera:n,entities:[t],target:this._maskTarget,useSceneDepth:!0,materialOverride:this._maskMaterial,depthCompare:`lequal`}),this._draw.renderFullscreen(e,this._outline,null)))}}})))()}var ah;function oh(){return(oh=t((()=>{L(),ah=class{_draw;_showWireframe;_wireframeMaterial;_wireframeGeometryCache;constructor(e){this._draw=e,this._showWireframe=!1,this._wireframeGeometryCache=new Map,this._wireframeMaterial=e.materials.flat({color:[.3,.8,.3],lines:!0,depthWrite:!1})}get showWireframe(){return this._showWireframe}set showWireframe(e){this._showWireframe=e}render(e,t,n){if(!this._showWireframe||!t)return;let r=this._collectMeshEntities(n.root),i=new Map;for(let e of r){let t=e.getComponent(F);if(!t)continue;i.set(e,t.geometry);let n=this._wireframeGeometryCache.get(t.geometry);n||(n=this._createWireframeGeometry(t.geometry),this._wireframeGeometryCache.set(t.geometry,n)),t.geometry=n}this._draw.renderEntities({view:e,camera:t,entities:r,target:null,materialOverride:this._wireframeMaterial});for(let e of r){let t=e.getComponent(F);if(!t)continue;let n=i.get(e);n&&(t.geometry=n)}}_collectMeshEntities(e){let t=[],n=(e,r)=>{let i=r&&e.visible;i&&e.getComponent(F)&&t.push(e);for(let t=0;t<e.children.length;t++)n(e.children[t],i)};return n(e,!0),t}_createWireframeGeometry(e){let t=new Er,n=e.getAttribute(`position`),r=e.getAttribute(`index`);if(!n)return t;t.setAttribute(`position`,n.array,3);let i=e.getAttribute(`normal`);if(i&&t.setAttribute(`normal`,i.array,3),r){let e=r.array,n=new Set,i=[];for(let t=0;t<e.length;t+=3){let r=e[t],a=e[t+1],o=e[t+2],s=[[Math.min(r,a),Math.max(r,a)],[Math.min(a,o),Math.max(a,o)],[Math.min(o,r),Math.max(o,r)]];for(let[e,t]of s){let r=`${e}_${t}`;n.has(r)||(n.add(r),i.push(e,t))}}t.setAttribute(`index`,new Uint16Array(i),1)}return t}}})))()}function U(e){if(!e)throw Error(`Assertion failed.`)}var sh,ch,lh,W,uh,dh,fh,ph,mh,hh,gh,_h,vh,yh,bh,xh,Sh,Ch,wh,Th,Eh,Dh,Oh,kh,Ah,jh,Mh,Nh,Ph,Fh,Ih,Lh,Rh,zh,Bh,Vh,Hh,Uh,Wh,Gh,Kh,qh,Jh;function Yh(){return(Yh=t((()=>{sh=e=>{let t=(e%360+360)%360;if(t===0||t===90||t===180||t===270)return t;throw Error(`Invalid rotation ${e}.`)},ch=e=>e&&e[e.length-1],lh=e=>e>=0&&e<2**32,W=e=>{let t=0;for(;e.readBits(1)===0&&t<32;)t++;if(t>=32)throw Error(`Invalid exponential-Golomb code.`);return(1<<t)-1+e.readBits(t)},uh=e=>{let t=W(e);return t&1?t+1>>1:-(t>>1)},dh=e=>e.constructor===Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),fh=e=>e.constructor===DataView?e:ArrayBuffer.isView(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(e),ph=new TextEncoder,mh={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12},hh={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18},gh={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9},_h=e=>!!e&&!!e.primaries&&!!e.transfer&&!!e.matrix&&e.fullRange!==void 0,vh=e=>e instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e),yh=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(t=>{let n=!1;e=()=>{n||=(t(),this.pending--,!0)}}),n=this.currentPromise;return this.currentPromise=t,this.pending++,await n,e}},bh=(e,t,n)=>{let r=0,i=e.length-1,a=-1;for(;r<=i;){let o=r+(i-r+1)/2|0;n(e[o])<=t?(a=o,r=o+1):i=o-1}return a},xh=()=>{let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}},Sh=e=>{throw Error(`Unexpected value: ${e}`)},Ch=(e,t,n)=>{let r=e.getUint8(t),i=e.getUint8(t+1),a=e.getUint8(t+2);return n?r|i<<8|a<<16:r<<16|i<<8|a},wh=(e,t,n,r)=>{n>>>=0,n&=16777215,r?(e.setUint8(t,n&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n>>>16&255)):(e.setUint8(t,n>>>16&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n&255))},Th=(e,t,n)=>Math.max(t,Math.min(n,e)),Eh=(e,t,n)=>e+(t-e)*n,Dh=(e,t)=>Math.round(e/t)*t,Oh=(e,t)=>Math.floor(e*t)/t,kh=/^[a-z]{3}$/,Ah=e=>kh.test(e),jh=1e6*(1+2**-52),Mh=(e,t)=>{let n=e<0?-1:1;e=Math.abs(e);let r=0,i=1,a=1,o=0,s=e;for(;;){let e=Math.floor(s),c=e*a+r,l=e*o+i;if(l>t)return{num:n*a,den:o};if(r=a,i=o,a=c,o=l,s=1/(s-e),!isFinite(s))break}return{num:n*a,den:o}},Nh=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}},Ph=null,Fh=()=>Ph===null?Ph=typeof navigator<`u`&&navigator.userAgent?.includes(`Firefox`):Ph,Ih=null,Lh=()=>Ih===null?Ih=!!(typeof navigator<`u`&&(navigator.vendor?.includes(`Google Inc`)||/Chrome/.test(navigator.userAgent))):Ih,Rh=null,zh=()=>{if(Rh!==null)return Rh;if(typeof navigator>`u`)return null;let e=/\bChrome\/(\d+)/.exec(navigator.userAgent);return e?Rh=Number(e[1]):null},Bh=function*(e){for(let t in e){let n=e[t];n!==void 0&&(yield{key:t,value:n})}},Vh=()=>{Symbol.dispose??=Symbol(`Symbol.dispose`)},Hh=(e,t)=>{let n=-1,r=1/0;for(let i=0;i<e.length;i++){let a=t(e[i]);a<r&&(r=a,n=i)}return n},Uh=e=>{U(Number.isInteger(e.num)),U(Number.isInteger(e.den)),U(e.den!==0);let t=Math.abs(e.num),n=Math.abs(e.den);for(;n!==0;){let e=t%n;t=n,n=e}let r=t||1;return{num:e.num/r,den:e.den/r}},Wh=(e,t)=>{if(typeof e!=`object`||!e)throw TypeError(`${t} must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(`${t}.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(`${t}.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(`${t}.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(`${t}.height must be a non-negative integer.`)},Gh=e=>new Promise(t=>setTimeout(t,e)),Kh=e=>Array.isArray(e)?e:[e],qh=class{constructor(){this._listeners=new Map}on(e,t,n){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:n?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,n]=e,r=this._listeners.get(t);if(r)for(let e of r){try{e.fn(n)}catch(e){console.error(e)}e.once&&r.delete(e)}}},Jh=e=>typeof e==`object`&&!!e&&Object.getPrototypeOf(e)===Object.prototype&&Object.values(e).every(e=>typeof e==`string`)})))()}var Xh,Zh;function Qh(){return(Qh=t((()=>{Yh(),(function(e){e[e.Silent=0]=`Silent`,e[e.Errors=1]=`Errors`,e[e.Warnings=2]=`Warnings`,e[e.Info=3]=`Info`})(Xh||={}),Zh=class e{constructor(){}static get level(){return e._level}static set level(t){if(t!==Xh.Silent&&t!==Xh.Errors&&t!==Xh.Warnings&&t!==Xh.Info)throw TypeError(`Invalid log level. Use one of the values of the LogLevel enum.`);e._level=t}static get _emitter(){return e._emitterInstance??=new qh}static on(t,n,r){return e._emitter.on(t,n,r)}static _error(...t){e._emitter._emit(`error`,t),e._level>=Xh.Errors&&console.error(...t)}static _warn(...t){e._emitter._emit(`warn`,t),e._level>=Xh.Warnings&&console.warn(...t)}static _info(...t){e._emitter._emit(`info`,t),e._level>=Xh.Info&&console.info(...t)}},Zh._level=Xh.Info,Zh._emitterInstance=null})))()}var $h,eg,tg,ng;function rg(){return(rg=t((()=>{Yh(),$h=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(typeof t!=`string`)throw TypeError(`mimeType must be a string.`)}},eg=class{constructor(e,t,n,r){if(this.data=e,this.mimeType=t,this.name=n,this.description=r,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==void 0&&typeof t!=`string`)throw TypeError(`mimeType, when provided, must be a string.`);if(n!==void 0&&typeof n!=`string`)throw TypeError(`name, when provided, must be a string.`);if(r!==void 0&&typeof r!=`string`)throw TypeError(`description, when provided, must be a string.`)}},tg=e=>{if(!e||typeof e!=`object`)throw TypeError(`tags must be an object.`);if(e.title!==void 0&&typeof e.title!=`string`)throw TypeError(`tags.title, when provided, must be a string.`);if(e.description!==void 0&&typeof e.description!=`string`)throw TypeError(`tags.description, when provided, must be a string.`);if(e.artist!==void 0&&typeof e.artist!=`string`)throw TypeError(`tags.artist, when provided, must be a string.`);if(e.album!==void 0&&typeof e.album!=`string`)throw TypeError(`tags.album, when provided, must be a string.`);if(e.albumArtist!==void 0&&typeof e.albumArtist!=`string`)throw TypeError(`tags.albumArtist, when provided, must be a string.`);if(e.trackNumber!==void 0&&(!Number.isInteger(e.trackNumber)||e.trackNumber<=0))throw TypeError(`tags.trackNumber, when provided, must be a positive integer.`);if(e.tracksTotal!==void 0&&(!Number.isInteger(e.tracksTotal)||e.tracksTotal<=0))throw TypeError(`tags.tracksTotal, when provided, must be a positive integer.`);if(e.discNumber!==void 0&&(!Number.isInteger(e.discNumber)||e.discNumber<=0))throw TypeError(`tags.discNumber, when provided, must be a positive integer.`);if(e.discsTotal!==void 0&&(!Number.isInteger(e.discsTotal)||e.discsTotal<=0))throw TypeError(`tags.discsTotal, when provided, must be a positive integer.`);if(e.genre!==void 0&&typeof e.genre!=`string`)throw TypeError(`tags.genre, when provided, must be a string.`);if(e.date!==void 0&&(!(e.date instanceof Date)||Number.isNaN(e.date.getTime())))throw TypeError(`tags.date, when provided, must be a valid Date.`);if(e.lyrics!==void 0&&typeof e.lyrics!=`string`)throw TypeError(`tags.lyrics, when provided, must be a string.`);if(e.images!==void 0){if(!Array.isArray(e.images))throw TypeError(`tags.images, when provided, must be an array.`);for(let t of e.images){if(!t||typeof t!=`object`)throw TypeError(`Each image in tags.images must be an object.`);if(!(t.data instanceof Uint8Array))throw TypeError(`Each image.data must be a Uint8Array.`);if(typeof t.mimeType!=`string`)throw TypeError(`Each image.mimeType must be a string.`);if(![`coverFront`,`coverBack`,`unknown`].includes(t.kind))throw TypeError(`Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.`)}}if(e.comment!==void 0&&typeof e.comment!=`string`)throw TypeError(`tags.comment, when provided, must be a string.`);if(e.raw!==void 0){if(!e.raw||typeof e.raw!=`object`)throw TypeError(`tags.raw, when provided, must be an object.`);for(let t of Object.values(e.raw))if(t!==null&&typeof t!=`string`&&!(t instanceof Uint8Array)&&!(t instanceof $h)&&!(t instanceof eg)&&!Jh(t))throw TypeError(`Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.`)}},ng=e=>{if(!e||typeof e!=`object`)throw TypeError(`disposition must be an object.`);if(e.default!==void 0&&typeof e.default!=`boolean`)throw TypeError(`disposition.default must be a boolean.`);if(e.primary!==void 0&&typeof e.primary!=`boolean`)throw TypeError(`disposition.primary must be a boolean.`);if(e.forced!==void 0&&typeof e.forced!=`boolean`)throw TypeError(`disposition.forced must be a boolean.`);if(e.original!==void 0&&typeof e.original!=`boolean`)throw TypeError(`disposition.original must be a boolean.`);if(e.commentary!==void 0&&typeof e.commentary!=`boolean`)throw TypeError(`disposition.commentary must be a boolean.`);if(e.hearingImpaired!==void 0&&typeof e.hearingImpaired!=`boolean`)throw TypeError(`disposition.hearingImpaired must be a boolean.`);if(e.visuallyImpaired!==void 0&&typeof e.visuallyImpaired!=`boolean`)throw TypeError(`disposition.visuallyImpaired must be a boolean.`)}})))()}var ig;function ag(){return(ag=t((()=>{ig=class e{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,n=7-(this.pos&7),r=(t&1<<n)>>n;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let n=0;n<e;n++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let n=this.pos+e;for(let e=this.pos;e<n;e++){let r=Math.floor(e/8),i=this.bytes[r],a=7-(e&7);i&=~(1<<a),i|=(t&1<<n-e-1)>>n-e-1<<a,this.bytes[r]=i}this.pos=n}readAlignedByte(){if(this.pos%8!=0)throw Error(`Bitstream is not byte-aligned.`);let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let t=new e(this.bytes);return t.pos=this.pos,t}}})))()}var og,sg,cg;function lg(){return(lg=t((()=>{ag(),og=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],sg=[-1,1,2,3,4,5,6,8],cg=e=>{let t=og.indexOf(e.sampleRate),n=null;t===-1&&(t=15,n=e.sampleRate);let r=sg.indexOf(e.numberOfChannels);if(r===-1)throw TypeError(`Unsupported number of channels: ${e.numberOfChannels}`);let i=13;e.objectType>=32&&(i+=6),t===15&&(i+=24);let a=Math.ceil(i/8),o=new Uint8Array(a),s=new ig(o);return e.objectType<32?s.writeBits(5,e.objectType):(s.writeBits(5,31),s.writeBits(6,e.objectType-32)),s.writeBits(4,t),t===15&&s.writeBits(24,n),s.writeBits(4,r),o}})))()}var ug,dg,fg,pg,mg,hg,gg,_g,vg,yg,bg,xg,Sg,Cg,wg,Tg,Eg,Dg,Og,kg,Ag,jg,Mg,Ng,Pg,Fg;function Ig(){return(Ig=t((()=>{Yh(),ug=[`avc`,`hevc`,`vp9`,`av1`,`vp8`,`prores`],dg=[`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,`pcm-u8`,`pcm-s8`,`ulaw`,`alaw`],fg=[`aac`,`opus`,`mp3`,`vorbis`,`flac`,`ac3`,`eac3`],pg=[...fg,...dg],mg=[`webvtt`],hg=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],gg=[{maxPictureSize:36864,maxBitrate:128e3,tier:`L`,level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:`L`,level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:`L`,level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:`L`,level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:`L`,level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:`L`,level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:`H`,level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:`L`,level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:`H`,level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:`L`,level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:`L`,level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:`L`,level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:`L`,level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:`L`,level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:`L`,level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:186}],_g=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],vg=[{maxPictureSize:147456,maxBitrate:15e5,tier:`M`,level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:`M`,level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:`M`,level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:`M`,level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:`M`,level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:`H`,level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:`M`,level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:`H`,level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:`M`,level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:`M`,level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:`M`,level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:`M`,level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:19}],yg=[`ap4x`,`ap4h`,`apch`,`apcn`,`apcs`,`apco`],bg=[{fourCc:`apco`,bitrate:45e6,alpha:!1},{fourCc:`apcs`,bitrate:102e6,alpha:!1},{fourCc:`apcn`,bitrate:147e6,alpha:!1},{fourCc:`apch`,bitrate:22e7,alpha:!1},{fourCc:`ap4h`,bitrate:33e7,alpha:!0},{fourCc:`ap4x`,bitrate:5e8,alpha:!0}],xg=(e,t,n,r,i)=>{if(e===`avc`){let e=Math.ceil(t/16)*Math.ceil(n/16),i=hg.find(t=>e<=t.maxMacroblocks&&r<=t.maxBitrate)??ch(hg),a=i?i.level:0;return`avc1.${`64`.padStart(2,`0`)}00${a.toString(16).padStart(2,`0`)}`}if(e===`hevc`){let e=t*n,i=gg.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??ch(gg);return`hev1.1.6.${i.tier}${i.level}.B0`}if(e===`vp8`)return`vp8`;if(e===`vp9`){let e=t*n;return`vp09.00.${(_g.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??ch(_g)).level.toString().padStart(2,`0`)}.08`}if(e===`av1`){let e=t*n,i=vg.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??ch(vg);return`av01.0.${i.level.toString().padStart(2,`0`)}${i.tier}.08`}if(e===`prores`){let e=(t*n/2073600)**.95,a=bg.filter(e=>e.alpha===i),o=a[0].fourCc,s=1/0;for(let{fourCc:t,bitrate:n}of a){let i=Math.abs(n*e-r);i<s&&(s=i,o=t)}return o}throw Sh(e),TypeError(`Unhandled codec '${String(e)}'.`)},Sg=e=>{let t=e.split(`.`),n=Number(t[1]),r=t[2],i=Number(r.slice(0,-1)),a=(n<<5)+i,o=+(r.slice(-1)===`H`),s=Number(t[3])===8?0:1,c=t[4]?Number(t[4]):0,l=t[5]?Number(t[5][0]):1,u=t[5]?Number(t[5][1]):1,d=t[5]?Number(t[5][2]):0;return[129,a,(o<<7)+(s<<6)+0+(c<<4)+(l<<3)+(u<<2)+d,0]},Cg=/^pcm-([usf])(\d+)(be)?$/,wg=e=>{if(U(dg.includes(e)),e===`ulaw`)return{dataType:`ulaw`,sampleSize:1,littleEndian:!0,silentValue:255};if(e===`alaw`)return{dataType:`alaw`,sampleSize:1,littleEndian:!0,silentValue:213};let t=Cg.exec(e);U(t);let n;n=t[1]===`u`?`unsigned`:t[1]===`s`?`signed`:`float`;let r=Number(t[2])/8,i=t[3]!==`be`;return{dataType:n,sampleSize:r,littleEndian:i,silentValue:e===`pcm-u8`?128:0}},Tg=e=>e.startsWith(`avc1`)||e.startsWith(`avc3`)?`avc`:e.startsWith(`hev1`)||e.startsWith(`hvc1`)?`hevc`:e===`vp8`?`vp8`:e.startsWith(`vp09`)?`vp9`:e.startsWith(`av01`)?`av1`:yg.includes(e)?`prores`:e===`mp3`||e===`mp4a.69`||e===`mp4a.6B`||e===`mp4a.6b`||e===`mp4a.40.34`?`mp3`:e.startsWith(`mp4a.40.`)||e===`mp4a.67`?`aac`:e===`opus`?`opus`:e===`vorbis`?`vorbis`:e===`flac`?`flac`:e===`ac-3`||e===`ac3`?`ac3`:e===`ec-3`||e===`eac3`?`eac3`:e===`ulaw`?`ulaw`:e===`alaw`?`alaw`:Cg.test(e)?e:e===`webvtt`?`webvtt`:null,Eg=e=>e===`avc`?{avc:{format:`avc`}}:e===`hevc`?{hevc:{format:`hevc`}}:{},Dg=[`avc1`,`avc3`,`hev1`,`hvc1`,`vp8`,`vp09`,`av01`,...yg],Og=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,kg=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,Ag=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,jg=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,Mg=(e,t)=>{if(!e)throw TypeError(`Video chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Video chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Video chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Video chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Video chunk metadata decoder configuration must specify a codec string.`);if(!Dg.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.codedWidth)||e.decoderConfig.codedWidth<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).`);if(!Number.isInteger(e.decoderConfig.codedHeight)||e.decoderConfig.codedHeight<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).`);if(e.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectWidth)||e.decoderConfig.displayAspectWidth<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectHeight)||e.decoderConfig.displayAspectHeight<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectWidth!==void 0!=(e.decoderConfig.displayAspectHeight!==void 0))throw TypeError(`Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.`);if(e.decoderConfig.description!==void 0&&!vh(e.decoderConfig.description))throw TypeError(`Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=e.decoderConfig;if(typeof t!=`object`)throw TypeError(`Video chunk metadata decoder configuration colorSpace, when provided, must be an object.`);let n=Object.keys(mh);if(t.primaries!=null&&!n.includes(t.primaries))throw TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${n.join(`, `)}.`);let r=Object.keys(hh);if(t.transfer!=null&&!r.includes(t.transfer))throw TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(`, `)}.`);let i=Object.keys(gh);if(t.matrix!=null&&!i.includes(t.matrix))throw TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(`, `)}.`);if(t.fullRange!=null&&typeof t.fullRange!=`boolean`)throw TypeError(`Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.`)}if(e.decoderConfig.codec.startsWith(`avc1`)||e.decoderConfig.codec.startsWith(`avc3`)){if(!Og.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.`)}else if(e.decoderConfig.codec.startsWith(`hev1`)||e.decoderConfig.codec.startsWith(`hvc1`)){if(!kg.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.`)}else if(e.decoderConfig.codec.startsWith(`vp8`)){if(e.decoderConfig.codec!==`vp8`)throw TypeError(`Video chunk metadata decoder configuration codec string for VP8 must be "vp8".`)}else if(e.decoderConfig.codec.startsWith(`vp09`)){if(!Ag.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.`)}else if(e.decoderConfig.codec.startsWith(`av01`)){if(!jg.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.`)}else if(yg.some(t=>e.decoderConfig.codec.startsWith(t))&&!yg.some(t=>e.decoderConfig.codec===t))throw TypeError(`Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${yg.join(`, `)}.`);if(t!==null&&Tg(e.decoderConfig.codec)!==t)throw TypeError(`Video chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},Ng=[`mp4a`,`mp3`,`opus`,`vorbis`,`flac`,`ulaw`,`alaw`,`pcm`,`ac-3`,`ec-3`],Pg=(e,t)=>{if(!e)throw TypeError(`Audio chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Audio chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Audio chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Audio chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Audio chunk metadata decoder configuration must specify a codec string.`);if(!Ng.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.sampleRate)||e.decoderConfig.sampleRate<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).`);if(!Number.isInteger(e.decoderConfig.numberOfChannels)||e.decoderConfig.numberOfChannels<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).`);if(e.decoderConfig.description!==void 0&&!vh(e.decoderConfig.description))throw TypeError(`Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.codec.startsWith(`mp4a`)&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`){if(![`mp4a.40.2`,`mp4a.40.02`,`mp4a.40.5`,`mp4a.40.05`,`mp4a.40.29`,`mp4a.67`].includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`mp3`)||e.decoderConfig.codec.startsWith(`mp4a`)){if(e.decoderConfig.codec!==`mp3`&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`)throw TypeError(`Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".`)}else if(e.decoderConfig.codec.startsWith(`opus`)){if(e.decoderConfig.codec!==`opus`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Opus must be "opus".`);if(e.decoderConfig.description&&e.decoderConfig.description.byteLength<18)throw TypeError(`Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.`)}else if(e.decoderConfig.codec.startsWith(`vorbis`)){if(e.decoderConfig.codec!==`vorbis`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".`);if(!e.decoderConfig.description)throw TypeError(`Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`flac`)){if(e.decoderConfig.codec!==`flac`)throw TypeError(`Audio chunk metadata decoder configuration codec string for FLAC must be "flac".`);if(!e.decoderConfig.description||e.decoderConfig.description.byteLength<42)throw TypeError(`Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`ac-3`)||e.decoderConfig.codec.startsWith(`ac3`)){if(e.decoderConfig.codec!==`ac-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".`)}else if(e.decoderConfig.codec.startsWith(`ec-3`)||e.decoderConfig.codec.startsWith(`eac3`)){if(e.decoderConfig.codec!==`ec-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".`)}else if((e.decoderConfig.codec.startsWith(`pcm`)||e.decoderConfig.codec.startsWith(`ulaw`)||e.decoderConfig.codec.startsWith(`alaw`))&&!dg.includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${dg.join(`, `)}).`);if(t!==null&&Tg(e.decoderConfig.codec)!==t)throw TypeError(`Audio chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},Fg=e=>{if(!e)throw TypeError(`Subtitle metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Subtitle metadata must be an object.`);if(!e.config)throw TypeError(`Subtitle metadata must include a config object.`);if(typeof e.config!=`object`)throw TypeError(`Subtitle metadata config must be an object.`);if(typeof e.config.description!=`string`)throw TypeError(`Subtitle metadata config description must be a string.`)}})))()}var Lg,Rg;function zg(){return(zg=t((()=>{Lg=[48e3,44100,32e3],Rg=[24e3,22050,16e3]})))()}var Bg,Vg,Hg,Ug,Wg,Gg,Kg,qg,Jg,Yg,Xg,Zg,Qg,$g,e_,t_,n_,r_,i_,a_,o_,s_,c_,l_,u_,d_,f_,p_,m_,h_,g_,__,v_;function y_(){return(y_=t((()=>{Ig(),Yh(),Qh(),zg(),ag(),(function(e){e[e.NON_IDR_SLICE=1]=`NON_IDR_SLICE`,e[e.SLICE_DPA=2]=`SLICE_DPA`,e[e.SLICE_DPB=3]=`SLICE_DPB`,e[e.SLICE_DPC=4]=`SLICE_DPC`,e[e.IDR=5]=`IDR`,e[e.SEI=6]=`SEI`,e[e.SPS=7]=`SPS`,e[e.PPS=8]=`PPS`,e[e.AUD=9]=`AUD`,e[e.SPS_EXT=13]=`SPS_EXT`})(Bg||={}),(function(e){e[e.RASL_N=8]=`RASL_N`,e[e.RASL_R=9]=`RASL_R`,e[e.BLA_W_LP=16]=`BLA_W_LP`,e[e.RSV_IRAP_VCL23=23]=`RSV_IRAP_VCL23`,e[e.VPS_NUT=32]=`VPS_NUT`,e[e.SPS_NUT=33]=`SPS_NUT`,e[e.PPS_NUT=34]=`PPS_NUT`,e[e.AUD_NUT=35]=`AUD_NUT`,e[e.PREFIX_SEI_NUT=39]=`PREFIX_SEI_NUT`,e[e.SUFFIX_SEI_NUT=40]=`SUFFIX_SEI_NUT`})(Vg||={}),Hg=function*(e){let t=0,n=-1;for(;t<e.length-2;){let r=e.indexOf(0,t);if(r===-1||r>=e.length-2)break;t=r;let i=0;if(t+3<e.length&&e[t+1]===0&&e[t+2]===0&&e[t+3]===1?i=4:e[t+1]===0&&e[t+2]===1&&(i=3),i===0){t++;continue}n!==-1&&t>n&&(yield{offset:n,length:t-n}),n=t+i,t=n}n!==-1&&n<e.length&&(yield{offset:n,length:e.length-n})},Ug=function*(e,t){let n=0,r=new DataView(e.buffer,e.byteOffset,e.byteLength);for(;n+t<=e.length;){let e;t===1?e=r.getUint8(n):t===2?e=r.getUint16(n,!1):t===3?e=Ch(r,n,!1):(U(t===4),e=r.getUint32(n,!1)),n+=t,yield{offset:n,length:e},n+=e}},Wg=(e,t)=>{if(t.description){let n=(dh(t.description)[4]&3)+1;return Ug(e,n)}return Hg(e)},Gg=e=>e&31,Kg=e=>{let t=[],n=e.length;for(let r=0;r<n;r++)r+2<n&&e[r]===0&&e[r+1]===0&&e[r+2]===3?(t.push(0,0),r+=2):t.push(e[r]);return new Uint8Array(t)},new Uint8Array([0,0,0,1]),qg=(e,t)=>{let n=e.reduce((e,n)=>e+t+n.byteLength,0),r=new Uint8Array(n),i=0;for(let n of e){let e=new DataView(r.buffer,r.byteOffset,r.byteLength);switch(t){case 1:e.setUint8(i,n.byteLength);break;case 2:e.setUint16(i,n.byteLength,!1);break;case 3:wh(e,i,n.byteLength,!1);break;case 4:e.setUint32(i,n.byteLength,!1)}i+=t,r.set(n,i),i+=n.byteLength}return r},Jg=e=>{try{let t=[],n=[],r=[];for(let i of Hg(e)){let a=e.subarray(i.offset,i.offset+i.length),o=Gg(a[0]);o===Bg.SPS?t.push(a):o===Bg.PPS?n.push(a):o===Bg.SPS_EXT&&r.push(a)}if(t.length===0||n.length===0)return null;let i=t[0],a=Zg(i);U(a!==null);let o=a.profileIdc===100||a.profileIdc===110||a.profileIdc===122||a.profileIdc===144;return{configurationVersion:1,avcProfileIndication:a.profileIdc,profileCompatibility:a.constraintFlags,avcLevelIndication:a.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:n,chromaFormat:o?a.chromaFormatIdc:null,bitDepthLumaMinus8:o?a.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?a.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?r:null}}catch(e){return Zh._error(`Error building AVC Decoder Configuration Record:`,e),null}},Yg=e=>{let t=[];t.push(e.configurationVersion),t.push(e.avcProfileIndication),t.push(e.profileCompatibility),t.push(e.avcLevelIndication),t.push(252|e.lengthSizeMinusOne&3),t.push(224|e.sequenceParameterSets.length&31);for(let n of e.sequenceParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}t.push(e.pictureParameterSets.length);for(let n of e.pictureParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}if(e.avcProfileIndication===100||e.avcProfileIndication===110||e.avcProfileIndication===122||e.avcProfileIndication===144){U(e.chromaFormat!==null),U(e.bitDepthLumaMinus8!==null),U(e.bitDepthChromaMinus8!==null),U(e.sequenceParameterSetExt!==null),t.push(252|e.chromaFormat&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.sequenceParameterSetExt.length);for(let n of e.sequenceParameterSetExt){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}}return new Uint8Array(t)},Xg={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},Zg=e=>{try{let t=new ig(Kg(e));if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;let n=t.readAlignedByte(),r=t.readAlignedByte(),i=t.readAlignedByte();W(t);let a=1,o=0,s=0,c=0;if((n===100||n===110||n===122||n===244||n===44||n===83||n===86||n===118||n===128)&&(a=W(t),a===3&&(c=t.readBits(1)),o=W(t),s=W(t),t.skipBits(1),t.readBits(1))){for(let e=0;e<(a===3?12:8);e++)if(t.readBits(1)){let n=e<6?16:64,r=8,i=8;for(let e=0;e<n;e++){if(i!==0){let e=uh(t);i=(r+e+256)%256}r=i===0?r:i}}}W(t);let l=W(t);if(l===0)W(t);else if(l===1){t.skipBits(1),uh(t),uh(t);let e=W(t);for(let n=0;n<e;n++)uh(t)}W(t),t.skipBits(1);let u=W(t),d=W(t),f=16*(u+1),p=16*(d+1),m=f,h=p,g=t.readBits(1);if(g||t.skipBits(1),t.skipBits(1),t.readBits(1)){let e=W(t),n=W(t),r=W(t),i=W(t),o,s;if((c===0?a:0)===0)o=1,s=2-g;else{let e=a===3?1:2,t=a===1?2:1;o=e,s=t*(2-g)}m-=o*(e+n),h-=s*(r+i)}let _=2,v=2,y=2,b=0,x={num:1,den:1},S=null,C=null;if(t.readBits(1)){if(t.readBits(1)){let e=t.readBits(8);if(e===255)x={num:t.readBits(16),den:t.readBits(16)};else{let t=Xg[e];t&&(x=t)}}t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),b=t.readBits(1),t.readBits(1)&&(_=t.readBits(8),v=t.readBits(8),y=t.readBits(8))),t.readBits(1)&&(W(t),W(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));let e=t.readBits(1);e&&Qg(t);let n=t.readBits(1);n&&Qg(t),(e||n)&&t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(1),W(t),W(t),W(t),W(t),S=W(t),C=W(t))}if(S===null){U(C===null);let e=r&16;if((n===44||n===86||n===100||n===110||n===122||n===244)&&e)S=0,C=0;else{let e=u+1,t=d+1,n=(2-g)*t,r=hg.find(e=>e.level>=i)??ch(hg),a=Math.min(Math.floor(r.maxDpbMbs/(e*n)),16);S=a,C=a}}return U(C!==null),{profileIdc:n,constraintFlags:r,levelIdc:i,frameMbsOnlyFlag:g,chromaFormatIdc:a,bitDepthLumaMinus8:o,bitDepthChromaMinus8:s,codedWidth:f,codedHeight:p,displayWidth:m,displayHeight:h,pixelAspectRatio:x,colourPrimaries:_,matrixCoefficients:y,transferCharacteristics:v,fullRangeFlag:b,numReorderFrames:S,maxDecFrameBuffering:C}}catch(e){return Zh._error(`Error parsing AVC SPS:`,e),null}},Qg=e=>{let t=W(e);e.skipBits(4),e.skipBits(4);for(let n=0;n<=t;n++)W(e),W(e),e.skipBits(1);e.skipBits(5),e.skipBits(5),e.skipBits(5),e.skipBits(5)},$g=(e,t)=>{if(t.description){let n=(dh(t.description)[21]&3)+1;return Ug(e,n)}return Hg(e)},e_=e=>e>>1&63,t_=e=>{try{let t=new ig(Kg(e));t.skipBits(16),t.readBits(4);let n=t.readBits(3),r=t.readBits(1),{general_profile_space:i,general_tier_flag:a,general_profile_idc:o,general_profile_compatibility_flags:s,general_constraint_indicator_flags:c,general_level_idc:l}=r_(t,n);W(t);let u=W(t),d=0;u===3&&(d=t.readBits(1));let f=W(t),p=W(t),m=f,h=p;if(t.readBits(1)){let e=W(t),n=W(t),r=W(t),i=W(t),a=1,o=1,s=d===0?u:0;s===1?(a=2,o=2):s===2&&(a=2,o=1),m-=(e+n)*a,h-=(r+i)*o}let g=W(t),_=W(t);W(t);let v=t.readBits(1)?0:n,y=0;for(let e=v;e<=n;e++)W(t),y=W(t),W(t);W(t),W(t),W(t),W(t),W(t),W(t),t.readBits(1)&&t.readBits(1)&&i_(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(4),t.skipBits(4),W(t),W(t),t.skipBits(1));let b=W(t);if(a_(t,b),t.readBits(1)){let e=W(t);for(let n=0;n<e;n++)W(t),t.skipBits(1)}t.skipBits(1),t.skipBits(1);let x=2,S=2,C=2,ee=0,te=0,ne={num:1,den:1};if(t.readBits(1)){let e=s_(t,n);ne=e.pixelAspectRatio,x=e.colourPrimaries,S=e.transferCharacteristics,C=e.matrixCoefficients,ee=e.fullRangeFlag,te=e.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:h,pixelAspectRatio:ne,colourPrimaries:x,transferCharacteristics:S,matrixCoefficients:C,fullRangeFlag:ee,maxDecFrameBuffering:y+1,spsMaxSubLayersMinus1:n,spsTemporalIdNestingFlag:r,generalProfileSpace:i,generalTierFlag:a,generalProfileIdc:o,generalProfileCompatibilityFlags:s,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:_,minSpatialSegmentationIdc:te}}catch(e){return Zh._error(`Error parsing HEVC SPS:`,e),null}},n_=e=>{try{let t=[],n=[],r=[],i=[];for(let a of Hg(e)){let o=e.subarray(a.offset,a.offset+a.length),s=e_(o[0]);s===Vg.VPS_NUT?t.push(o):s===Vg.SPS_NUT?n.push(o):s===Vg.PPS_NUT?r.push(o):(s===Vg.PREFIX_SEI_NUT||s===Vg.SUFFIX_SEI_NUT)&&i.push(o)}if(n.length===0||r.length===0)return null;let a=t_(n[0]);if(!a)return null;let o=0;if(r.length>0){let e=r[0],t=new ig(Kg(e));t.skipBits(16),W(t),W(t),t.skipBits(1),t.skipBits(1),t.skipBits(3),t.skipBits(1),t.skipBits(1),W(t),W(t),uh(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&W(t),uh(t),uh(t),t.skipBits(1),t.skipBits(1),t.skipBits(1),t.skipBits(1);let n=t.readBits(1),i=t.readBits(1);o=!n&&!i?0:n&&!i?2:!n&&i?3:0}let s=[...t.length?[{arrayCompleteness:1,nalUnitType:Vg.VPS_NUT,nalUnits:t}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:Vg.SPS_NUT,nalUnits:n}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:Vg.PPS_NUT,nalUnits:r}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:e_(i[0][0]),nalUnits:i}]:[]];return{configurationVersion:1,generalProfileSpace:a.generalProfileSpace,generalTierFlag:a.generalTierFlag,generalProfileIdc:a.generalProfileIdc,generalProfileCompatibilityFlags:a.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:a.generalConstraintIndicatorFlags,generalLevelIdc:a.generalLevelIdc,minSpatialSegmentationIdc:a.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:a.chromaFormatIdc,bitDepthLumaMinus8:a.bitDepthLumaMinus8,bitDepthChromaMinus8:a.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:a.spsMaxSubLayersMinus1+1,temporalIdNested:a.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:s}}catch(e){return Zh._error(`Error building HEVC Decoder Configuration Record:`,e),null}},r_=(e,t)=>{let n=e.readBits(2),r=e.readBits(1),i=e.readBits(5),a=0;for(let t=0;t<32;t++)a=a<<1|e.readBits(1);let o=new Uint8Array(6);for(let t=0;t<6;t++)o[t]=e.readBits(8);let s=e.readBits(8),c=[],l=[];for(let n=0;n<t;n++)c.push(e.readBits(1)),l.push(e.readBits(1));if(t>0)for(let n=t;n<8;n++)e.skipBits(2);for(let n=0;n<t;n++)c[n]&&e.skipBits(88),l[n]&&e.skipBits(8);return{general_profile_space:n,general_tier_flag:r,general_profile_idc:i,general_profile_compatibility_flags:a,general_constraint_indicator_flags:o,general_level_idc:s}},i_=e=>{for(let t=0;t<4;t++)for(let n=0;n<(t===3?2:6);n++)if(!e.readBits(1))W(e);else{let n=Math.min(64,1<<4+(t<<1));t>1&&uh(e);for(let t=0;t<n;t++)uh(e)}},a_=(e,t)=>{let n=[];for(let r=0;r<t;r++)n[r]=o_(e,r,t,n)},o_=(e,t,n,r)=>{let i=0,a=0,o=0;if(t!==0&&(a=e.readBits(1)),a){o=t===n?t-(W(e)+1):t-1,e.readBits(1),W(e);let a=r[o]??0;for(let t=0;t<=a;t++)e.readBits(1)||e.readBits(1);i=r[o]}else{let t=W(e),n=W(e);for(let n=0;n<t;n++)W(e),e.readBits(1);for(let t=0;t<n;t++)W(e),e.readBits(1);i=t+n}return i},s_=(e,t)=>{let n=2,r=2,i=2,a=0,o=0,s={num:1,den:1};if(e.readBits(1)){let t=e.readBits(8);if(t===255)s={num:e.readBits(16),den:e.readBits(16)};else{let e=Xg[t];e&&(s=e)}}return e.readBits(1)&&e.readBits(1),e.readBits(1)&&(e.readBits(3),a=e.readBits(1),e.readBits(1)&&(n=e.readBits(8),r=e.readBits(8),i=e.readBits(8))),e.readBits(1)&&(W(e),W(e)),e.readBits(1),e.readBits(1),e.readBits(1),e.readBits(1)&&(W(e),W(e),W(e),W(e)),e.readBits(1)&&(e.readBits(32),e.readBits(32),e.readBits(1)&&W(e),e.readBits(1)&&c_(e,!0,t)),e.readBits(1)&&(e.readBits(1),e.readBits(1),e.readBits(1),o=W(e),W(e),W(e),W(e),W(e)),{pixelAspectRatio:s,colourPrimaries:n,transferCharacteristics:r,matrixCoefficients:i,fullRangeFlag:a,minSpatialSegmentationIdc:o}},c_=(e,t,n)=>{let r=!1,i=!1,a=!1;t&&(r=e.readBits(1)===1,i=e.readBits(1)===1,(r||i)&&(a=e.readBits(1)===1,a&&(e.readBits(8),e.readBits(5),e.readBits(1),e.readBits(5)),e.readBits(4),e.readBits(4),a&&e.readBits(4),e.readBits(5),e.readBits(5),e.readBits(5)));for(let t=0;t<=n;t++){let t=e.readBits(1)===1,n=!0;t||(n=e.readBits(1)===1);let o=!1;n?W(e):o=e.readBits(1)===1;let s=1;o||(s=W(e)+1),r&&l_(e,s,a),i&&l_(e,s,a)}},l_=(e,t,n)=>{for(let r=0;r<t;r++)W(e),W(e),n&&(W(e),W(e)),e.readBits(1)},u_=e=>{let t=[];t.push(e.configurationVersion),t.push((e.generalProfileSpace&3)<<6|(e.generalTierFlag&1)<<5|e.generalProfileIdc&31),t.push(e.generalProfileCompatibilityFlags>>>24&255),t.push(e.generalProfileCompatibilityFlags>>>16&255),t.push(e.generalProfileCompatibilityFlags>>>8&255),t.push(e.generalProfileCompatibilityFlags&255),t.push(...e.generalConstraintIndicatorFlags),t.push(e.generalLevelIdc&255),t.push(240|e.minSpatialSegmentationIdc>>8&15),t.push(e.minSpatialSegmentationIdc&255),t.push(252|e.parallelismType&3),t.push(252|e.chromaFormatIdc&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.avgFrameRate>>8&255),t.push(e.avgFrameRate&255),t.push((e.constantFrameRate&3)<<6|(e.numTemporalLayers&7)<<3|(e.temporalIdNested&1)<<2|e.lengthSizeMinusOne&3),t.push(e.arrays.length&255);for(let n of e.arrays){t.push((n.arrayCompleteness&1)<<7|0|n.nalUnitType&63),t.push(n.nalUnits.length>>8&255),t.push(n.nalUnits.length&255);for(let e of n.nalUnits){t.push(e.length>>8&255),t.push(e.length&255);for(let n=0;n<e.length;n++)t.push(e[n])}}return new Uint8Array(t)},(function(e){e[e.audAllowed=0]=`audAllowed`,e[e.beforeFirstVcl=1]=`beforeFirstVcl`,e[e.afterFirstVcl=2]=`afterFirstVcl`,e[e.eoBitstreamAllowed=3]=`eoBitstreamAllowed`,e[e.noMoreDataAllowed=4]=`noMoreDataAllowed`})(d_||={}),f_=function*(e){let t=new ig(e),n=()=>{let e=0;for(let n=0;n<8;n++){let r=t.readAlignedByte();if(e|=(r&127)<<n*7,!(r&128))break;if(n===7&&r&128)return null}return e>=2**32-1?null:e};for(;t.getBitsLeft()>=8;){t.skipBits(1);let r=t.readBits(4),i=t.readBits(1),a=t.readBits(1);t.skipBits(1),i&&t.skipBits(8);let o;if(a){let e=n();if(e===null)return;o=e}else o=Math.floor(t.getBitsLeft()/8);U(t.pos%8==0),yield{type:r,data:e.subarray(t.pos/8,t.pos/8+o)},t.skipBits(o*8)}},p_=e=>{let t=fh(e),n=t.getUint8(9),r=t.getUint16(10,!0),i=t.getUint32(12,!0),a=t.getInt16(16,!0),o=t.getUint8(18),s=null;return o&&(s=e.subarray(19,21+n)),{outputChannelCount:n,preSkip:r,inputSampleRate:i,outputGain:a,channelMappingFamily:o,channelMappingTable:s}},m_=(e,t,n)=>{switch(e){case`avc`:for(let e of Wg(n,t)){let t=n[e.offset],r=Gg(t);if(r>=Bg.NON_IDR_SLICE&&r<=Bg.SLICE_DPC)return`delta`;if(r===Bg.IDR)return`key`;if(r===Bg.SEI&&(!Lh()||zh()>=144)){let t=n.subarray(e.offset,e.offset+e.length),r=Kg(t),i=1;do{let e=0;for(;;){let t=r[i++];if(t===void 0||(e+=t,t<255))break}let t=0;for(;;){let e=r[i++];if(e===void 0||(t+=e,e<255))break}if(e===6){let e=new ig(r);e.pos=8*i;let t=W(e),n=e.readBits(1);if(t===0&&n===1)return`key`}i+=t}while(i<r.length-1)}}return`delta`;case`hevc`:for(let e of $g(n,t)){let t=e_(n[e.offset]);if(t<Vg.BLA_W_LP)return`delta`;if(t<=Vg.RSV_IRAP_VCL23)return`key`}return`delta`;case`vp8`:return n[0]&1?`delta`:`key`;case`vp9`:{let e=new ig(n);if(e.readBits(2)!==2)return null;let t=e.readBits(1);return(e.readBits(1)<<1)+t===3&&e.skipBits(1),e.readBits(1)?null:e.readBits(1)===0?`key`:`delta`}case`av1`:{let e=!1;for(let{type:t,data:r}of f_(n))if(t===1){let t=new ig(r);t.skipBits(4),e=!!t.readBits(1)}else if(t===3||t===6||t===7){if(e)return`key`;let t=new ig(r);return t.readBits(1)?null:t.readBits(2)===0?`key`:`delta`}return null}case`prores`:return`key`;default:Sh(e),U(!1)}},(function(e){e[e.STREAMINFO=0]=`STREAMINFO`,e[e.VORBIS_COMMENT=4]=`VORBIS_COMMENT`,e[e.PICTURE=6]=`PICTURE`})(h_||={}),g_=e=>{if(e.length<7||e[0]!==11||e[1]!==119)return null;let t=new ig(e);t.skipBits(16),t.skipBits(16);let n=t.readBits(2);if(n===3)return null;let r=t.readBits(6),i=t.readBits(5);if(i>8)return null;let a=t.readBits(3),o=t.readBits(3);return o&1&&o!==1&&t.skipBits(2),o&4&&t.skipBits(2),o===2&&t.skipBits(2),{fscod:n,bsid:i,bsmod:a,acmod:o,lfeon:t.readBits(1),bitRateCode:Math.floor(r/2)}},new Uint8Array([5,4,65,67,45,51]),new Uint8Array([5,4,69,65,67,51]),__=[1,2,3,6],v_=e=>{if(e.length<6||e[0]!==11||e[1]!==119)return null;let t=new ig(e);t.skipBits(16);let n=t.readBits(2);if(t.skipBits(3),n!==0&&n!==2)return null;let r=t.readBits(11),i=t.readBits(2),a=0,o;i===3?(a=t.readBits(2),o=3):o=t.readBits(2);let s=t.readBits(3),c=t.readBits(1),l=t.readBits(5);if(l<11||l>16)return null;let u=__[o],d;return d=i<3?Lg[i]/1e3:Rg[a]/1e3,{dataRate:Math.round((r+1)*d/(u*16)),substreams:[{fscod:i,fscod2:a,bsid:l,bsmod:0,acmod:s,lfeon:c,numDepSub:0,chanLoc:0}]}}})))()}var b_,x_;function S_(){return(S_=t((()=>{Yh(),b_=new Uint8Array,x_=class e{constructor(e,t,n,r,i=-1,a,o){if(this.data=e,this.type=t,this.timestamp=n,this.duration=r,this.sequenceNumber=i,e===b_&&a===void 0)throw Error(`Internal error: byteLength must be explicitly provided when constructing metadata-only packets.`);if(a===void 0&&(a=e.byteLength),!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==`key`&&t!==`delta`)throw TypeError(`type must be either "key" or "delta".`);if(!Number.isFinite(n))throw TypeError(`timestamp must be a number.`);if(!Number.isFinite(r)||r<0)throw TypeError(`duration must be a non-negative number.`);if(!Number.isFinite(i))throw TypeError(`sequenceNumber must be a number.`);if(!Number.isInteger(a)||a<0)throw TypeError(`byteLength must be a non-negative integer.`);if(o!==void 0&&(typeof o!=`object`||!o))throw TypeError(`sideData, when provided, must be an object.`);if(o?.alpha!==void 0&&!(o.alpha instanceof Uint8Array))throw TypeError(`sideData.alpha, when provided, must be a Uint8Array.`);if(o?.alphaByteLength!==void 0&&(!Number.isInteger(o.alphaByteLength)||o.alphaByteLength<0))throw TypeError(`sideData.alphaByteLength, when provided, must be a non-negative integer.`);this.byteLength=a,this.sideData=o??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===b_}get microsecondTimestamp(){return Math.trunc(jh*this.timestamp)}get microsecondDuration(){return Math.trunc(jh*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw TypeError(`This packet does not contain alpha side data.`);if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to an audio chunk.`);if(typeof EncodedAudioChunk>`u`)throw Error(`Your browser does not support EncodedAudioChunk.`);return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(t,n){if(!(t instanceof EncodedVideoChunk||t instanceof EncodedAudioChunk))throw TypeError(`chunk must be an EncodedVideoChunk or EncodedAudioChunk.`);let r=new Uint8Array(t.byteLength);return t.copyTo(r),new e(r,t.type,t.timestamp/1e6,(t.duration??0)/1e6,void 0,void 0,n)}clone(t){if(t!==void 0&&(typeof t!=`object`||!t))throw TypeError(`options, when provided, must be an object.`);if(t?.data!==void 0&&!(t.data instanceof Uint8Array))throw TypeError(`options.data, when provided, must be a Uint8Array.`);if(t?.type!==void 0&&t.type!==`key`&&t.type!==`delta`)throw TypeError(`options.type, when provided, must be either "key" or "delta".`);if(t?.timestamp!==void 0&&!Number.isFinite(t.timestamp))throw TypeError(`options.timestamp, when provided, must be a number.`);if(t?.duration!==void 0&&!Number.isFinite(t.duration))throw TypeError(`options.duration, when provided, must be a number.`);if(t?.sequenceNumber!==void 0&&!Number.isFinite(t.sequenceNumber))throw TypeError(`options.sequenceNumber, when provided, must be a number.`);if(t?.sideData!==void 0&&(typeof t.sideData!=`object`||t.sideData===null))throw TypeError(`options.sideData, when provided, must be an object.`);return new e(t?.data??this.data,t?.type??this.type,t?.timestamp??this.timestamp,t?.duration??this.duration,t?.sequenceNumber??this.sequenceNumber,this.byteLength,t?.sideData??this.sideData)}}})))()}var C_;function w_(){return(w_=t((()=>{C_=e=>{let t=(e.hasVideo?`video/`:e.hasAudio?`audio/`:`application/`)+(e.isQuickTime?`quicktime`:`mp4`);if(e.codecStrings.length>0){let n=[...new Set(e.codecStrings)];t+=`; codecs="${n.join(`, `)}"`}return t}})))()}var T_;function E_(){return(E_=t((()=>{ag(),gv(),T_=e=>{let t=e.filePos,n=hv(e,9),r=new ig(n);if(r.readBits(12)!==4095||(r.skipBits(1),r.readBits(2)!==0))return null;let i=r.readBits(1),a=r.readBits(2)+1,o=r.readBits(4);if(o===15)return null;r.skipBits(1);let s=r.readBits(3);if(s===0)throw Error(`ADTS frames with channel configuration 0 are not supported.`);r.skipBits(1),r.skipBits(1),r.skipBits(1),r.skipBits(1);let c=r.readBits(13);r.skipBits(11);let l=r.readBits(2)+1;if(l!==1)throw Error(`ADTS frames with more than one AAC frame are not supported.`);let u=null;return i===1?e.filePos-=2:u=r.readBits(16),{objectType:a,samplingFrequencyIndex:o,channelConfiguration:s,frameLength:c,numberOfAacFrames:l,crcCheck:u,startPos:t}}})))()}var D_=r(((e,t)=>{t.exports={}})),O_,k_,A_,j_,M_,N_,P_,F_,I_,L_,R_,z_,B_,V_,H_,U_,W_,G_,K_,q_,J_,Y_,X_,Z_,Q_;function $_(){return($_=t((()=>{Yh(),Qh(),O_=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},k_=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),Vh(),A_=-1/0,j_=-1/0,M_=null,typeof FinalizationRegistry<`u`&&(M_=new FinalizationRegistry(e=>{let t=performance.now();e.type===`video`?(t-A_>=1e3&&(Zh._error(`A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them.`),A_=t),typeof VideoFrame<`u`&&e.data instanceof VideoFrame&&e.data.close()):(t-j_>=1e3&&(Zh._error(`An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them.`),j_=t),typeof AudioData<`u`&&e.data instanceof AudioData&&e.data.close())})),N_=class{constructor(){this._referenceCount=0,this._lastAllocationBuffer=null}},P_=[`I420`,`I420P10`,`I420P12`,`I420A`,`I420AP10`,`I420AP12`,`I422`,`I422P10`,`I422P12`,`I422A`,`I422AP10`,`I422AP12`,`I444`,`I444P10`,`I444P12`,`I444A`,`I444AP10`,`I444AP12`,`NV12`,`RGBA`,`RGBX`,`BGRA`,`BGRX`],F_=new Set(P_),I_=class e{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180==0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180==0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(jh*this.timestamp)}get microsecondDuration(){return Math.trunc(jh*this.duration)}get hasAlpha(){return this.format&&this.format.includes(`A`)}constructor(t,n){if(this._closed=!1,t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer||ArrayBuffer.isView(t)){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.format===void 0||!F_.has(n.format))throw TypeError(`init.format must be one of: `+P_.join(`, `));if(!Number.isInteger(n.codedWidth)||n.codedWidth<=0)throw TypeError(`init.codedWidth must be a positive integer.`);if(!Number.isInteger(n.codedHeight)||n.codedHeight<=0)throw TypeError(`init.codedHeight must be a positive integer.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.layout!==void 0){if(!Array.isArray(n.layout))throw TypeError(`init.layout, when provided, must be an array.`);for(let e of n.layout){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Each entry in init.layout must be an object.`);if(!Number.isInteger(e.offset)||e.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(e.stride)||e.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(n.visibleRect!==void 0&&Wh(n.visibleRect,`init.visibleRect`),n.displayWidth!==void 0&&(!Number.isInteger(n.displayWidth)||n.displayWidth<=0))throw TypeError(`init.displayWidth, when provided, must be a positive integer.`);if(n.displayHeight!==void 0&&(!Number.isInteger(n.displayHeight)||n.displayHeight<=0))throw TypeError(`init.displayHeight, when provided, must be a positive integer.`);if(n.displayWidth!==void 0!=(n.displayHeight!==void 0))throw TypeError(`init.displayWidth and init.displayHeight must be either both provided or both omitted.`);this.format=n.format,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0;let e=n.layout??q_(n.format,n.codedWidth,n.codedHeight),r=n.colorSpace??null;r===null&&(r=this.format===`RGBA`||this.format===`RGBX`||this.format===`BGRA`||this.format===`BGRX`?{primaries:`bt709`,transfer:`iec61966-2-1`,matrix:`rgb`,fullRange:!0}:{primaries:`bt709`,transfer:`bt709`,matrix:`bt709`,fullRange:!1}),this.visibleRect={left:n.visibleRect?.left??0,top:n.visibleRect?.top??0,width:n.visibleRect?.width??n.codedWidth,height:n.visibleRect?.height??n.codedHeight},n.displayWidth===void 0?(this.squarePixelWidth=this.visibleRect.width,this.squarePixelHeight=this.visibleRect.height):(this.squarePixelWidth=this.rotation%180==0?n.displayWidth:n.displayHeight,this.squarePixelHeight=this.rotation%180==0?n.displayHeight:n.displayWidth),this._data=n._doNotCopy?dh(t):dh(t).slice(),this._layout=e,this.colorSpace=new H_(r)}else if(typeof VideoFrame<`u`&&t instanceof VideoFrame){if(n?.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n?.timestamp!==void 0&&!Number.isFinite(n?.timestamp))throw TypeError(`init.timestamp, when provided, must be a number.`);if(n?.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);n?.visibleRect!==void 0&&Wh(n.visibleRect,`init.visibleRect`),this._data=t,this._layout=null,this.format=t.format,this.visibleRect={left:t.visibleRect?.x??0,top:t.visibleRect?.y??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},this.rotation=n?.rotation??0,this.squarePixelWidth=t.displayWidth,this.squarePixelHeight=t.displayHeight,this.timestamp=n?.timestamp??t.timestamp/1e6,this.duration=n?.duration??(t.duration??0)/1e6,this.colorSpace=new H_(t.colorSpace)}else if(typeof HTMLImageElement<`u`&&t instanceof HTMLImageElement||typeof SVGImageElement<`u`&&t instanceof SVGImageElement||typeof ImageBitmap<`u`&&t instanceof ImageBitmap||typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement||typeof HTMLCanvasElement<`u`&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<`u`&&t instanceof OffscreenCanvas){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.visibleRect!==void 0&&Wh(n.visibleRect,`init.visibleRect`),typeof VideoFrame<`u`)return new e(new VideoFrame(t,{timestamp:Math.trunc(n.timestamp*jh),duration:Math.trunc((n.duration??0)*jh)||void 0,visibleRect:n.visibleRect&&{x:n.visibleRect.left,y:n.visibleRect.top,width:n.visibleRect.width,height:n.visibleRect.height}}),n);let r=0,i=0;if(`naturalWidth`in t?(r=t.naturalWidth,i=t.naturalHeight):`videoWidth`in t?(r=t.videoWidth,i=t.videoHeight):`width`in t&&(r=Number(t.width),i=Number(t.height)),!r||!i)throw TypeError(`Could not determine dimensions.`);let a=n.visibleRect??{left:0,top:0,width:r,height:i},o=new OffscreenCanvas(a.width,a.height),s=o.getContext(`2d`,{alpha:Fh(),willReadFrequently:!0});if(!s)throw Error(`OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.`);s.drawImage(t,-a.left,-a.top),this._data=o,this._layout=null,this.format=`RGBX`,this.visibleRect={left:0,top:0,width:a.width,height:a.height},this.squarePixelWidth=a.width,this.squarePixelHeight=a.height,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=new H_({matrix:`rgb`,primaries:`bt709`,transfer:`iec61966-2-1`,fullRange:!0})}else if(t instanceof N_){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(this._data=t,t._referenceCount++,this.format=t.getFormat(),this.format!==null&&!P_.includes(this.format))throw TypeError(`getFormat() must return a VideoSamplePixelFormat or null.`);if(this.visibleRect={left:0,top:0,width:t.getCodedWidth(),height:t.getCodedHeight()},!Number.isInteger(this.visibleRect.width)||this.visibleRect.width<=0)throw TypeError(`getCodedWidth() must return a positive integer.`);if(!Number.isInteger(this.visibleRect.height)||this.visibleRect.height<=0)throw TypeError(`getCodedHeight() must return a positive integer.`);if(this.squarePixelWidth=t.getSquarePixelWidth(),!Number.isInteger(this.squarePixelWidth)||this.squarePixelWidth<=0)throw TypeError(`getSquarePixelWidth() must return a positive integer.`);if(this.squarePixelHeight=t.getSquarePixelHeight(),!Number.isInteger(this.squarePixelHeight)||this.squarePixelHeight<=0)throw TypeError(`getSquarePixelHeight() must return a positive integer.`);this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=t.getColorSpace()}else throw TypeError(`Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.`);this.encodeOptions=n?.encodeOptions??{},this.pixelAspectRatio=Uh({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),M_?.register(this,{type:`video`,data:this._data},this)}clone(){if(this._closed)throw Error(`VideoSample is closed.`);return U(this._data!==null),this._data instanceof N_?new e(this._data,{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):U_(this._data)?new e(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):this._data instanceof Uint8Array?(U(this._layout),new e(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions,_doNotCopy:!0})):new e(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions})}close(){this._closed||=(M_?.unregister(this),this._data instanceof N_?(this._data._referenceCount--,this._data._referenceCount===0&&this._data.close()):U_(this._data)?this._data.close():this._data=null,!0)}allocationSize(e={}){if(K_(e),this._closed)throw Error(`VideoSample is closed.`);if((e.format??this.format)==null)throw Error(`Cannot get allocation size when format is null.`);return U_(this._data)?this._data.allocationSize(e):Y_(this,e).allocationSize}async copyTo(t,n={}){if(!vh(t))throw TypeError(`destination must be an ArrayBuffer or an ArrayBuffer view.`);if(K_(n),this._closed)throw Error(`VideoSample is closed.`);if((n.format??this.format)==null)throw Error(`Cannot copy video sample data when format is null.`);if(U(this._data!==null),U_(this._data))return this._data.copyTo(t,n);if(n.format&&![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(this.format)&&[`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(n.format)){if(this._data instanceof N_){let r={stack:[],error:void 0,hasError:!1};try{let i=O_(r,await this._data.toRgbSample({timestamp:this.timestamp,duration:this.duration,rotation:this.rotation},n.colorSpace??`srgb`),!1);if(!(i instanceof e))throw TypeError(`toRgbSample() must return a VideoSample.`);if(![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(i.format))throw Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${i.format}' instead.`);return await i.copyTo(t,n)}catch(e){r.error=e,r.hasError=!0}finally{k_(r)}}else{if(typeof VideoFrame>`u`)throw Error(`For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.`);let e=this.toVideoFrame(),r=await e.copyTo(t,n);return e.close(),r}}let r=Y_(this,n);U(this.format);let i=dh(t);if(i.byteLength<r.allocationSize)throw TypeError(`Destination buffer too small. Required: ${r.allocationSize}, Available: ${i.byteLength}`);let a=J_(this.format),o;if(this._data instanceof N_){let e=this._data.getDataPlanes();if(e instanceof Promise&&(e=await e),!Array.isArray(e)||e.some(e=>!(e.data instanceof Uint8Array)||!Number.isInteger(e.stride)||e.stride<0))throw TypeError(`getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.`);o=e}else if(this._data instanceof Uint8Array)U(this._layout),U(this._layout.length===a.length),o=this._layout.map((e,t)=>{let n=Math.ceil(this.codedHeight/a[t].heightDivisor);return{data:this._data.subarray(e.offset,e.offset+e.stride*n),stride:e.stride}});else{let e=this._data.getContext(`2d`);U(e);let t=e.getImageData(0,0,this.codedWidth,this.codedHeight);o=[{data:dh(t.data),stride:4*this.codedWidth}]}let s=[],c=a.length;for(let e=0;e<c;e++){let t=r.computedLayouts[e],n=o[e].stride,a=o[e].data,c=t.sourceTop*n;c+=t.sourceLeftBytes;let l=t.destinationOffset,u=t.sourceWidthBytes,d={offset:l,stride:t.destinationStride};for(let e=0;e<t.sourceHeight;e++){if(c+u>a.byteLength)throw Error(`Source buffer OOB read.`);if(l+u>i.byteLength)throw Error(`Destination buffer OOB write.`);let e=a.subarray(c,c+u);i.set(e,l),c+=n,l+=t.destinationStride}s.push(d)}if(n.format!==void 0){let e=this.format.startsWith(`RGB`)!==n.format.startsWith(`RGB`),t=this.format.includes(`X`)&&n.format.includes(`A`);if(e||t)for(let n=0;n<r.allocationSize;n+=4){if(e){let e=i[n],t=i[n+2];i[n]=t,i[n+2]=e}t&&(i[n+3]=255)}}return s}toVideoFrame(){if(this._closed)throw Error(`VideoSample is closed.`);if(U(this._data!==null),this._data instanceof N_){if(this.format===null)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.`);let e=this._data.getDataPlanes();if(e instanceof Promise)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.`);let t=e.reduce((e,t)=>e+t.data.byteLength,0),n=new Uint8Array(t),r=0,i=[];for(let t of e)n.set(t.data,r),i.push(r),r+=t.data.byteLength;return new VideoFrame(n,{format:this.format,layout:e.map((e,t)=>({offset:i[t],stride:e.stride})),codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})}return U_(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?(U(this._layout),new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,layout:this._layout,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,n,r,i,a,o,s,c){let l=0,u=0,d=this.displayWidth,f=this.displayHeight,p=0,m=0,h=this.displayWidth,g=this.displayHeight;if(a===void 0?(p=t,m=n,r!==void 0&&(h=r,g=i)):(l=t,u=n,d=r,f=i,p=a,m=o,s===void 0?(h=d,g=f):(h=s,g=c)),!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!Number.isFinite(l))throw TypeError(`sx must be a number.`);if(!Number.isFinite(u))throw TypeError(`sy must be a number.`);if(!Number.isFinite(d)||d<0)throw TypeError(`sWidth must be a non-negative number.`);if(!Number.isFinite(f)||f<0)throw TypeError(`sHeight must be a non-negative number.`);if(!Number.isFinite(p))throw TypeError(`dx must be a number.`);if(!Number.isFinite(m))throw TypeError(`dy must be a number.`);if(!Number.isFinite(h)||h<0)throw TypeError(`dWidth must be a non-negative number.`);if(!Number.isFinite(g)||g<0)throw TypeError(`dHeight must be a non-negative number.`);if(this._closed)throw Error(`VideoSample is closed.`);({sx:l,sy:u,sWidth:d,sHeight:f}=this._rotateSourceRegion(l,u,d,f,this.rotation));let _=this.toCanvasImageSource();e.save();let v=p+h/2,y=m+g/2;e.translate(v,y),e.rotate(this.rotation*Math.PI/180);let b=this.rotation%180==0?1:h/g;e.scale(1/b,b),e.drawImage(_,l,u,d,f,-h/2,-g/2,h,g),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit must be 'fill', 'contain', or 'cover'.`);if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`options.rotation, when provided, must be 0, 90, 180, or 270.`);t.crop!==void 0&&G_(t.crop,`options.`);let n=e.canvas.width,r=e.canvas.height,i=t.rotation??this.rotation,[a,o]=i%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=t.crop;s&&=W_(s,a,o);let c,l,u,d,{sx:f,sy:p,sWidth:m,sHeight:h}=this._rotateSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??a,t.crop?.height??o,i);if(t.fit===`fill`)c=0,l=0,u=n,d=r;else{let[e,i]=t.crop?[t.crop.width,t.crop.height]:[a,o],s=t.fit===`contain`?Math.min(n/e,r/i):Math.max(n/e,r/i);u=e*s,d=i*s,c=(n-u)/2,l=(r-d)/2}e.save();let g=i%180==0?1:u/d;e.translate(n/2,r/2),e.rotate(i*Math.PI/180),e.scale(1/g,g),e.translate(-n/2,-r/2),e.drawImage(this.toCanvasImageSource(),f,p,m,h,c,l,u,d),e.restore()}_rotateSourceRegion(e,t,n,r,i){return i===90?[e,t,n,r]=[t,this.squarePixelHeight-e-n,r,n]:i===180?[e,t]=[this.squarePixelWidth-e-n,this.squarePixelHeight-t-r]:i===270&&([e,t,n,r]=[this.squarePixelWidth-t-r,e,r,n]),{sx:e,sy:t,sWidth:n,sHeight:r}}_drawWithFitAndMipmapping(e,t,n){let r=e.width,i=e.height,[a,o]=n.rotation%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=n.crop?n.crop.width:a,c=n.crop?n.crop.height:o,l=0;2*r<s&&2*i<c&&(l=Math.floor(Math.log2(Math.min(s/r,c/i))));let u=r*2**l,d=i*2**l,{canvas:f,context:p,isNew:m}=l>0?V_(u,d):{canvas:e,context:t,isNew:n.targetIsFresh};p.imageSmoothingQuality=`high`,n.fillBlack?(p.fillStyle=`black`,p.fillRect(0,0,u,d)):m||p.clearRect(0,0,u,d),this.drawWithFit(p,{fit:n.fit,rotation:n.rotation,crop:n.crop}),p.globalCompositeOperation=`copy`;for(let e=l;e>1;e--){let t=r*2**e,n=i*2**e;p.drawImage(f,0,0,t,n,0,0,t/2,n/2)}p.globalCompositeOperation=`source-over`,l>0&&(t.imageSmoothingQuality=`high`,t.globalCompositeOperation=`copy`,t.drawImage(f,0,0,2*r,2*i,0,0,r,i),t.globalCompositeOperation=`source-over`)}toCanvasImageSource(){if(this._closed)throw Error(`VideoSample is closed.`);if(U(this._data!==null),this._data instanceof N_||this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}return this._data}async transform(t){if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(t.width!==void 0&&(!Number.isInteger(t.width)||t.width<=0))throw TypeError(`options.width, when provided, must be a positive integer.`);if(t.height!==void 0&&(!Number.isInteger(t.height)||t.height<=0))throw TypeError(`options.height, when provided, must be a positive integer.`);if(t.roundDimensionsTo!==void 0&&(!Number.isInteger(t.roundDimensionsTo)||t.roundDimensionsTo<=0))throw TypeError(`options.roundDimensionsTo, when provided, must be a positive integer.`);if(t.fit!==void 0&&![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit, when provided, must be one of "fill", "contain", or "cover".`);if(t.width!==void 0&&t.height!==void 0&&t.fit===void 0)throw TypeError(`When both options.width and options.height are provided, options.fit must also be provided.`);if(t.rotate!==void 0&&![0,90,180,270].includes(t.rotate))throw TypeError(`options.rotate, when provided, must be 0, 90, 180 or 270.`);if(t.crop!==void 0&&G_(t.crop,`options.`),t.alpha!==void 0&&![`keep`,`discard`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'keep' or 'discard'.`);let n=sh(this.rotation+(t.rotate??0)),[r,i]=n%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],a=t.crop;a&&=W_(a,r,i);let o=a?a.width:r,s=a?a.height:i,c=o/s,l,u;t.width!==void 0&&t.height===void 0?(l=t.width,u=l/c):t.width===void 0&&t.height!==void 0?(u=t.height,l=u*c):t.width!==void 0&&t.height!==void 0?(l=t.width,u=t.height):(l=o,u=s),l=Dh(l,t.roundDimensionsTo??1),u=Dh(u,t.roundDimensionsTo??1);let d={width:l,height:u,fit:t.fit??`fill`,rotation:n,crop:a??{left:0,top:0,width:r,height:i},alpha:t.alpha??`keep`};for(let e of L_){let t=e(this,d);if(t instanceof Promise&&(t=await t),t!==null)return t}let{canvas:f,context:p,isNew:m}=V_(d.width,d.height);return this._drawWithFitAndMipmapping(f,p,{fit:d.fit,rotation:d.rotation,crop:d.crop,targetIsFresh:m,fillBlack:d.alpha===`discard`}),new e(f,{timestamp:this.timestamp,duration:this.duration,rotation:0})}setRotation(e){if(![0,90,180,270].includes(e))throw TypeError(`newRotation must be 0, 90, 180, or 270.`);this.rotation=e}setTimestamp(e){if(!Number.isFinite(e))throw TypeError(`newTimestamp must be a number.`);this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw TypeError(`newDuration must be a non-negative number.`);this.duration=e}setEncodeOptions(e){if(!e||typeof e!=`object`)throw TypeError(`newEncodeOptions must be an object.`);this.encodeOptions=e}[Symbol.dispose](){this.close()}},L_=[],R_=3,z_=[],B_=0,V_=(e,t)=>{for(let n of z_)if(n.canvas.width===e&&n.canvas.height===t)return n.age=B_++,{canvas:n.canvas,context:n.context,isNew:!1};let n;if(typeof OffscreenCanvas<`u`)n=new OffscreenCanvas(e,t);else{if(typeof window>`u`||typeof document>`u`)throw Error(`Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().`);n=document.createElement(`canvas`),n.width=e,n.height=t}let r=n.getContext(`2d`,{alpha:!0,willReadFrequently:!1});if(!r)throw Error(`The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.`);return z_.length>=R_&&z_.splice(Hh(z_,e=>e.age),1),z_.push({canvas:n,context:r,age:B_++}),{canvas:n,context:r,isNew:!0}},H_=class{constructor(e){if(e!==void 0){if(!e||typeof e!=`object`)throw TypeError(`init.colorSpace, when provided, must be an object.`);let t=Object.keys(mh);if(e.primaries!=null&&!t.includes(e.primaries))throw TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(`, `)}.`);let n=Object.keys(hh);if(e.transfer!=null&&!n.includes(e.transfer))throw TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(`, `)}.`);let r=Object.keys(gh);if(e.matrix!=null&&!r.includes(e.matrix))throw TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(`, `)}.`);if(e.fullRange!=null&&typeof e.fullRange!=`boolean`)throw TypeError(`init.colorSpace.fullRange, when provided, must be a boolean.`)}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},U_=e=>typeof VideoFrame<`u`&&e instanceof VideoFrame,W_=(e,t,n)=>{let r=Math.min(e.left,t),i=Math.min(e.top,n),a=Math.min(e.width,t-r),o=Math.min(e.height,n-i);return U(a>=0),U(o>=0),{left:r,top:i,width:a,height:o}},G_=(e,t)=>{if(!e||typeof e!=`object`)throw TypeError(t+`crop, when provided, must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(t+`crop.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(t+`crop.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(t+`crop.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(t+`crop.height must be a non-negative integer.`)},K_=e=>{if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.colorSpace!==void 0&&![`display-p3`,`srgb`].includes(e.colorSpace))throw TypeError(`options.colorSpace, when provided, must be 'display-p3' or 'srgb'.`);if(e.format!==void 0&&typeof e.format!=`string`)throw TypeError(`options.format, when provided, must be a string.`);if(e.layout!==void 0){if(!Array.isArray(e.layout))throw TypeError(`options.layout, when provided, must be an array.`);for(let t of e.layout){if(!t||typeof t!=`object`)throw TypeError(`Each entry in options.layout must be an object.`);if(!Number.isInteger(t.offset)||t.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(t.stride)||t.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(e.rect!==void 0){if(!e.rect||typeof e.rect!=`object`)throw TypeError(`options.rect, when provided, must be an object.`);if(e.rect.x!==void 0&&(!Number.isInteger(e.rect.x)||e.rect.x<0))throw TypeError(`options.rect.x, when provided, must be a non-negative integer.`);if(e.rect.y!==void 0&&(!Number.isInteger(e.rect.y)||e.rect.y<0))throw TypeError(`options.rect.y, when provided, must be a non-negative integer.`);if(e.rect.width!==void 0&&(!Number.isInteger(e.rect.width)||e.rect.width<0))throw TypeError(`options.rect.width, when provided, must be a non-negative integer.`);if(e.rect.height!==void 0&&(!Number.isInteger(e.rect.height)||e.rect.height<0))throw TypeError(`options.rect.height, when provided, must be a non-negative integer.`)}},q_=(e,t,n)=>{let r=J_(e),i=[],a=0;for(let e of r){let r=Math.ceil(t/e.widthDivisor),o=Math.ceil(n/e.heightDivisor),s=r*e.sampleBytes,c=s*o;i.push({offset:a,stride:s}),a+=c}return i},J_=e=>{let t=(e,t,n,r,i)=>{let a=[{sampleBytes:e,widthDivisor:1,heightDivisor:1},{sampleBytes:t,widthDivisor:n,heightDivisor:r},{sampleBytes:t,widthDivisor:n,heightDivisor:r}];return i&&a.push({sampleBytes:e,widthDivisor:1,heightDivisor:1}),a};switch(e){case`I420`:return t(1,1,2,2,!1);case`I420P10`:case`I420P12`:return t(2,2,2,2,!1);case`I420A`:return t(1,1,2,2,!0);case`I420AP10`:case`I420AP12`:return t(2,2,2,2,!0);case`I422`:return t(1,1,2,1,!1);case`I422P10`:case`I422P12`:return t(2,2,2,1,!1);case`I422A`:return t(1,1,2,1,!0);case`I422AP10`:case`I422AP12`:return t(2,2,2,1,!0);case`I444`:return t(1,1,1,1,!1);case`I444P10`:case`I444P12`:return t(2,2,1,1,!1);case`I444A`:return t(1,1,1,1,!0);case`I444AP10`:case`I444AP12`:return t(2,2,1,1,!0);case`NV12`:return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case`RGBA`:case`RGBX`:case`BGRA`:case`BGRX`:return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:Sh(e),U(!1)}},Y_=(e,t)=>{let n={left:0,top:0,width:e.codedWidth,height:e.codedHeight},r=t.rect,i=X_(n,r,e.codedWidth,e.codedHeight,e.format),a=t.layout,o;if(!t.format||t.format===e.format)o=e.format;else if([`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(t.format))o=t.format;else throw Error(`NotSupportedError: Invalid destination format.`);return Q_(i,o,a)},X_=(e,t,n,r,i)=>{let a={...e};if(t!==void 0){if(t.width===0||t.height===0)throw TypeError(`visibleRect dimensions cannot be zero.`);if((t.x||0)+(t.width||0)>n)throw TypeError(`visibleRect exceeds codedWidth.`);if((t.y||0)+(t.height||0)>r)throw TypeError(`visibleRect exceeds codedHeight.`);a.x=t.x||0,a.y=t.y||0,a.width=t.width||0,a.height=t.height||0}if(!Z_(i,a))throw TypeError(`visibleRect alignment is invalid for the format.`);return a},Z_=(e,t)=>{if(e===null)return!0;let n=J_(e);for(let e=0;e<n.length;e++){let r=n[e],i=r.widthDivisor,a=r.heightDivisor;if((t.x||0)%i!==0||(t.y||0)%a!==0)return!1}return!0},Q_=(e,t,n)=>{let r=J_(t),i=r.length;if(n!==void 0&&n.length!==i)throw TypeError(`Layout must have ${i} planes.`);let a=0,o=[],s=[];for(let t=0;t<i;t++){let i=r[t],c=i.sampleBytes,l=i.widthDivisor,u=i.heightDivisor,d={destinationOffset:0,destinationStride:0,sourceTop:0,sourceHeight:0,sourceLeftBytes:0,sourceWidthBytes:0};if(d.sourceTop=Math.ceil(Math.trunc(e.y||0)/u),d.sourceHeight=Math.ceil(Math.trunc(e.height||0)/u),d.sourceLeftBytes=Math.floor(Math.trunc(e.x||0)/l)*c,d.sourceWidthBytes=Math.floor(Math.trunc(e.width||0)/l)*c,n!==void 0){let e=n[t];if(e.stride<d.sourceWidthBytes)throw TypeError(`Stride for plane ${t} is too small.`);d.destinationOffset=e.offset,d.destinationStride=e.stride}else d.destinationOffset=a,d.destinationStride=d.sourceWidthBytes;let f=d.destinationStride*d.sourceHeight+d.destinationOffset;if(f>4294967295)throw TypeError(`Allocation size exceeds limit.`);s.push(f),a=Math.max(a,f);for(let e=0;e<t;e++){let n=o[e];if(!(s[t]<=n.destinationOffset||s[e]<=d.destinationOffset))throw TypeError(`Planes overlap.`)}o.push(d)}return{allocationSize:a,computedLayouts:o}}})))()}var ev,tv,nv,rv,iv,av,ov,sv,cv,lv;function uv(){return(uv=t((()=>{Ig(),Yh(),$_(),ev=e=>{if(!e||typeof e!=`object`)throw TypeError(`Encoding config must be an object.`);if(!ug.includes(e.codec))throw TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${ug.join(`, `)}.`);let t=e.bitrate;if(e.quality===void 0&&t===void 0)throw TypeError(`config.quality must be provided.`);if(e.quality!==void 0&&t!==void 0)throw TypeError(`config.quality and config.bitrate cannot both be provided.`);if(e.quality!==void 0&&!(e.quality instanceof rv))throw TypeError(`config.quality, when provided, must be a Quality.`);if(t!==void 0&&!(t instanceof rv)&&(!Number.isInteger(t)||t<=0))throw TypeError(`config.bitrate, when provided, must be a positive integer or a quality.`);if(e.keyFrameInterval!==void 0&&(!Number.isFinite(e.keyFrameInterval)||e.keyFrameInterval<0))throw TypeError(`config.keyFrameInterval, when provided, must be a non-negative number.`);if(e.sizeChangeBehavior!==void 0&&![`deny`,`passThrough`,`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.`);if(e.transform!==void 0){if(typeof e.transform!=`object`||!e.transform)throw TypeError(`config.transform, when provided, must be an object.`);if(e.transform.width!==void 0&&(!Number.isInteger(e.transform.width)||e.transform.width<=0))throw TypeError(`config.transform.width, when provided, must be a positive integer.`);if(e.transform.height!==void 0&&(!Number.isInteger(e.transform.height)||e.transform.height<=0))throw TypeError(`config.transform.height, when provided, must be a positive integer.`);if(e.transform.fit!==void 0&&![`fill`,`contain`,`cover`].includes(e.transform.fit))throw TypeError(`config.transform.fit, when provided, must be one of "fill", "contain", or "cover".`);if(e.transform.width!==void 0&&e.transform.height!==void 0&&e.transform.fit===void 0&&![`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.`);if(e.transform.fit!==void 0&&[`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior)&&e.transform.fit!==e.sizeChangeBehavior)throw TypeError(`config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.`);if(e.transform.rotate!==void 0&&![0,90,180,270].includes(e.transform.rotate))throw TypeError(`config.transform.rotate, when provided, must be 0, 90, 180 or 270.`);if(e.transform.crop!==void 0&&G_(e.transform.crop,`config.transform.`),e.transform.process!==void 0&&typeof e.transform.process!=`function`)throw TypeError(`config.transform.process, when provided, must be a function.`);if(e.transform.frameRate!==void 0&&(!Number.isFinite(e.transform.frameRate)||e.transform.frameRate<=0))throw TypeError(`config.transform.frameRate, when provided, must be a finite positive number.`);if(e.transform.force!==void 0&&typeof e.transform.force!=`boolean`)throw TypeError(`config.transform.force, when provided, must be a boolean.`)}if(e.onEncodedPacket!==void 0&&typeof e.onEncodedPacket!=`function`)throw TypeError(`config.onEncodedPacket, when provided, must be a function.`);if(e.onEncoderConfig!==void 0&&typeof e.onEncoderConfig!=`function`)throw TypeError(`config.onEncoderConfig, when provided, must be a function.`);if(e.onEncodedSample!==void 0&&typeof e.onEncodedSample!=`function`)throw TypeError(`config.onEncodedSample, when provided, must be a function.`);tv(e.codec,e)},tv=(e,t)=>{if(!t||typeof t!=`object`)throw TypeError(`Encoding options must be an object.`);if(t.alpha!==void 0&&![`discard`,`keep`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'discard' or 'keep'.`);let n=t.bitrateMode;if(n!==void 0&&![`constant`,`variable`].includes(n))throw TypeError(`bitrateMode, when provided, must be 'constant' or 'variable'.`);if(t.latencyMode!==void 0&&![`quality`,`realtime`].includes(t.latencyMode))throw TypeError(`latencyMode, when provided, must be 'quality' or 'realtime'.`);if(t.fullCodecString!==void 0&&typeof t.fullCodecString!=`string`)throw TypeError(`fullCodecString, when provided, must be a string.`);if(t.fullCodecString!==void 0&&Tg(t.fullCodecString)!==e)throw TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${e}).`);if(t.hardwareAcceleration!==void 0&&![`no-preference`,`prefer-hardware`,`prefer-software`].includes(t.hardwareAcceleration))throw TypeError(`hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.`);if(t.scalabilityMode!==void 0&&typeof t.scalabilityMode!=`string`)throw TypeError(`scalabilityMode, when provided, must be a string.`);if(t.contentHint!==void 0&&typeof t.contentHint!=`string`)throw TypeError(`contentHint, when provided, must be a string.`)},nv=e=>{let t=e.bitrateMode,n=e.quality._toVideoRateControl(e.codec,e.width,e.height,t),r=(t,n,r)=>({codec:e.fullCodecString??xg(e.codec,e.width,e.height,r,e.alpha===`keep`),width:e.width,height:e.height,displayWidth:e.squarePixelWidth,displayHeight:e.squarePixelHeight,bitrate:t,bitrateMode:n,alpha:e.alpha??`discard`,framerate:e.framerate,latencyMode:e.latencyMode,hardwareAcceleration:e.hardwareAcceleration,scalabilityMode:e.scalabilityMode,contentHint:e.contentHint,...Eg(e.codec)}),i=[];return n.quantizer!==null&&i.push({config:r(void 0,`quantizer`,n.bitrate),quantizer:n.quantizer}),n.bitrateMode!==`quantizer`&&i.push({config:r(n.bitrate,n.bitrateMode,n.bitrate),quantizer:null}),U(i.length>0),i},rv=class{constructor(e){if((typeof e==`number`||typeof e==`string`)&&(e={quality:e}),!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.bitrateMode!==void 0&&![`constant`,`variable`].includes(e.bitrateMode))throw TypeError(`options.bitrateMode, when provided, must be 'constant' or 'variable'.`);if(`quality`in e){if(typeof e.quality==`string`?!(e.quality in iv):typeof e.quality!=`number`||Number.isNaN(e.quality))throw TypeError(`options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.`);if(e.preferBitrate!==void 0&&typeof e.preferBitrate!=`boolean`)throw TypeError(`options.preferBitrate, when provided, must be a boolean.`);if(`bitrate`in e||`quantizer`in e)throw TypeError(`options.quality cannot be combined with options.bitrate or options.quantizer.`);this._quality=typeof e.quality==`string`?iv[e.quality]:e.quality,this._preferBitrate=e.preferBitrate??!1,this._bitrate=void 0,this._quantizer=void 0}else{if(e.bitrate!==void 0&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw TypeError(`options.bitrate, when provided, must be a positive integer.`);if(e.quantizer!==void 0&&(!Number.isInteger(e.quantizer)||e.quantizer<0))throw TypeError(`options.quantizer, when provided, must be a non-negative integer.`);if(e.bitrate===void 0&&e.quantizer===void 0)throw TypeError(`At least one of options.bitrate or options.quantizer must be set.`);if(`preferBitrate`in e)throw TypeError(`options.preferBitrate can only be combined with options.quality.`);this._quality=void 0,this._preferBitrate=!1,this._bitrate=e.bitrate,this._quantizer=e.quantizer}this._bitrateMode=e.bitrateMode}_toVideoRateControl(e,t,n,r){let i=av[e],a=null,o=this._bitrateMode??r??`variable`;if(this._quantizer!==void 0){if(!i){if(this._bitrate===void 0)throw Error(`Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`)}else if(this._quantizer<i.min||this._quantizer>i.max){if(this._bitrate===void 0)throw Error(`Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${i.min} and ${i.max}.`)}else a=this._quantizer,this._bitrate===void 0&&(o=`quantizer`)}else this._bitrate===void 0&&i&&!this._preferBitrate&&(U(this._quality!==void 0),a=Th(Math.round(Eh(i.worst,i.best,this._quality)),i.min,i.max));let s;if(this._bitrate!==void 0)s=this._bitrate;else{let r=this._quality;r===void 0&&(U(a!==null&&i),r=Th((a-i.worst)/(i.best-i.worst),0,1)),s=sv(e,t,n,ov(r))}return{quantizer:a,bitrate:s,bitrateMode:o}}_toVideoBitrate(e,t,n){return this._bitrate===void 0?(U(this._quality!==void 0),sv(e,t,n,ov(this._quality))):this._bitrate}_toAudioBitrate(e){if(dg.includes(e)||e===`flac`)return;if(this._bitrate!==void 0)return this._bitrate;if(this._quality===void 0)throw Error(`This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.`);let t=ov(this._quality),n={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3}[e];if(!n)throw Error(`Unhandled codec: ${e}`);let r=n*t;return e===`aac`?r=[96e3,128e3,16e4,192e3].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e):e===`opus`||e===`vorbis`?r=Math.max(6e3,r):e===`mp3`&&(r=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e)),Math.round(r/1e3)*1e3}},iv={"very-low":0,low:.25,medium:.5,high:.75,"very-high":1},av={avc:{min:0,max:51,worst:41,best:16},hevc:{min:0,max:51,worst:41,best:16},vp9:{min:0,max:63,worst:52,best:20},av1:{min:0,max:255,worst:208,best:80}},ov=e=>.3*Math.exp(2.5538*e),sv=(e,t,n,r)=>{let i=t*n,a=3e6,o=a*(i/2073600)**.95*{avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2,prores:22e7/a}[e]*r;return Math.ceil(o/1e3)*1e3},cv=(e,t)=>{if(e===`avc`)return{avc:{quantizer:t}};if(e===`hevc`)return{hevc:{quantizer:t}};if(e===`vp9`)return{vp9:{quantizer:t}};if(e===`av1`)return{av1:{quantizer:t}};U(!1)},lv=(e,t)=>{if(e!==void 0)return e;if(t!==void 0)return t instanceof rv?t:new rv({bitrate:t})}})))()}var dv;function fv(){return(fv=t((()=>{dv=[]})))()}var pv,mv,hv;function gv(){return(gv=t((()=>{Yh(),pv=class e{constructor(e,t,n,r,i){this.bytes=e,this.view=t,this.offset=n,this.start=r,this.end=i,this.bufferPos=r-n}static tempFromBytes(t){return new e(t,fh(t),0,0,t.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(t,n=this.end-t){if(t<this.start||t+n>this.end)throw RangeError(`Slicing outside of original slice.`);return new e(this.bytes,this.view,this.offset,t,t+n)}},mv=(e,t)=>{if(e.filePos<e.start||e.filePos+t>e.end)throw RangeError(`Tried reading [${e.filePos}, ${e.filePos+t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`)},hv=(e,t)=>{mv(e,t);let n=e.bytes.subarray(e.bufferPos,e.bufferPos+t);return e.bufferPos+=t,n}})))()}var _v;function vv(){return(vv=t((()=>{Yh(),_v=class{constructor(e){this.mutex=new yh,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateTimestamp(e,t,n){if(t<0)throw Error(`Timestamps must be non-negative (got ${t}s).`);let r=this.trackTimestampInfo.get(e);if(r){if(n&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!n)throw Error(`First packet must be a key packet.`);r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}}}})))()}var yv,bv;function xv(){return(xv=t((()=>{yv=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,bv=e=>{let t=Math.floor(e/36e5),n=Math.floor(e%36e5/6e4),r=Math.floor(e%6e4/1e3),i=e%1e3;return t.toString().padStart(2,`0`)+`:`+n.toString().padStart(2,`0`)+`:`+r.toString().padStart(2,`0`)+`.`+i.toString().padStart(3,`0`)}})))()}var Sv,G,Cv,K,q,wv,Tv,J,Ev,Dv,Ov,kv,Av,jv,Mv,Y,Nv,Pv,Fv,X,Z,Iv,Lv,Rv,zv,Bv,Vv,Hv,Uv,Wv,Gv,Kv,qv,Jv,Yv,Xv,Zv,Qv,$v,ey,ty,ny,ry,iy,ay,oy,sy,cy,ly,uy,dy,fy,py,my,hy,gy,_y,vy,yy,by,xy,Sy,Cy,wy,Ty,Ey,Dy,Oy,ky,Ay,jy,My,Ny,Py,Fy,Iy,Ly,Ry,zy,By,Vy,Hy,Uy,Wy,Gy,Ky,qy,Jy,Yy,Xy,Zy,Qy,$y,eb,tb,nb,rb,ib,ab,ob,sb,cb,lb;function ub(){return(ub=t((()=>{Yh(),Ig(),xv(),wb(),y_(),rg(),ag(),Sv=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8==7&&this.writer.write(this.helper);e.length%8!=0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let t of e.children)t&&this.writeBox(t);let n=this.writer.getPos(),r=e.size??n-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);U(t!==void 0);let n=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(n)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}},G=new Uint8Array(8),Cv=new DataView(G.buffer),K=e=>[(e%256+256)%256],q=e=>(Cv.setUint16(0,e,!1),[G[0],G[1]]),wv=e=>(Cv.setInt16(0,e,!1),[G[0],G[1]]),Tv=e=>(Cv.setUint32(0,e,!1),[G[1],G[2],G[3]]),J=e=>(Cv.setUint32(0,e,!1),[G[0],G[1],G[2],G[3]]),Ev=e=>(Cv.setInt32(0,e,!1),[G[0],G[1],G[2],G[3]]),Dv=e=>(Cv.setUint32(0,Math.floor(e/2**32),!1),Cv.setUint32(4,e,!1),[G[0],G[1],G[2],G[3],G[4],G[5],G[6],G[7]]),Ov=e=>(Cv.setInt32(0,Math.floor(e/2**32),!1),Cv.setUint32(4,e,!1),[G[0],G[1],G[2],G[3],G[4],G[5],G[6],G[7]]),kv=e=>(Cv.setInt16(0,256*e,!1),[G[0],G[1]]),Av=e=>(Cv.setInt32(0,2**16*e,!1),[G[0],G[1],G[2],G[3]]),jv=e=>(Cv.setInt32(0,2**30*e,!1),[G[0],G[1],G[2],G[3]]),Mv=(e,t)=>{let n=[],r=e;do{let e=r&127;r>>=7,n.length>0&&(e|=128),n.push(e),t!==void 0&&t--}while(r>0||t);return n.reverse()},Y=(e,t=!1)=>{let n=Array(e.length).fill(null).map((t,n)=>e.charCodeAt(n));return t&&n.push(0),n},Nv=e=>{let t=Math.PI/180*e,n=Math.round(Math.cos(t)),r=Math.round(Math.sin(t));return[n,r,0,-r,n,0,0,0,1]},Pv=Nv(0),Fv=e=>[Av(e[0]),Av(e[1]),jv(e[2]),Av(e[3]),Av(e[4]),jv(e[5]),Av(e[6]),Av(e[7]),jv(e[8])],X=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),Z=(e,t,n,r,i)=>X(e,[K(t),Tv(n),r??[]],i),Iv=e=>e.isQuickTime?X(`ftyp`,[Y(`qt  `),J(512),Y(`qt  `)]):e.fragmented?e.cmaf?X(`ftyp`,[Y(`iso5`),J(512),Y(`iso5`),Y(`iso6`),Y(`mp41`),Y(`cmfc`),Y(`dash`)]):X(`ftyp`,[Y(`iso5`),J(512),Y(`iso5`),Y(`iso6`),Y(`mp41`)]):X(`ftyp`,[Y(`isom`),J(512),Y(`isom`),e.holdsAvc?Y(`avc1`):[],Y(`mp41`)]),Lv=()=>X(`styp`,[Y(`iso5`),J(0),Y(`iso5`),Y(`iso6`),Y(`mp41`),Y(`cmfc`),Y(`dash`)]),Rv=(e,t)=>{let n=e.maxWrittenEndTimestamp-e.minWrittenTimestamp;return Number.isFinite(n)||(n=0),Z(`sidx`,1,0,[J(1),J(bb),Dv(Q(e.minWrittenTimestamp,bb)),Dv(0),q(0),q(1),J(t&2147483647),J(Q(n,bb)),J(0)])},zv=e=>({type:`mdat`,largeSize:e}),Bv=e=>({type:`free`,size:e}),Vv=e=>X(`moov`,void 0,[Hv(e.creationTime,e.trackDatas),...e.trackDatas.map(t=>Wv(t,e.creationTime)),e.isFragmented?Py(e.trackDatas):null,Yy(e)]),Hv=(e,t)=>{let n=Math.max(0,...t.map(e=>Q(Uv(e),bb)+Q(e.startTimestampOffset??0,bb))),r=Math.max(0,...t.map(e=>e.track.id))+1,i=!lh(e)||!lh(n),a=i?Dv:J;return Z(`mvhd`,+i,0,[a(e),a(e),J(bb),a(n),Av(1),kv(1),Array(10).fill(0),Fv(Pv),Array(24).fill(0),J(r)])},Uv=e=>{if(e.samples.length===0)return 0;let t=1/0,n=-1/0;for(let r=0;r<e.samples.length;r++){let i=e.samples[r];i.timestamp<t&&(t=i.timestamp),i.timestamp+i.duration>n&&(n=i.timestamp+i.duration)}return t===1/0?0:n-t},Wv=(e,t)=>{let n=Sb(e),r=e.startTimestampOffset!==null&&e.startTimestampOffset>0;return X(`trak`,void 0,[Gv(e,t),r?Kv(e,e.startTimestampOffset):null,qv(e,t),n.name===void 0?null:X(`udta`,void 0,[X(`name`,[...ph.encode(n.name)])])])},Gv=(e,t)=>{let n=Q(Uv(e),bb)+Q(e.startTimestampOffset??0,bb),r=!lh(t)||!lh(n),i=r?Dv:J,a;if(e.type===`video`){let t=e.track.metadata.rotation;a=Nv(t??0)}else a=Pv;let o=2;e.track.metadata.disposition?.default!==!1&&(o|=1);let s=e.type===`video`?0:e.type===`audio`?1:e.type===`subtitle`?2:Sh(e);return Z(`tkhd`,+r,o,[i(t),i(t),J(e.track.id),J(0),i(n),Array(8).fill(0),q(0),q(s),kv(+(e.type===`audio`)),q(0),Fv(a),Av(e.type===`video`?e.info.width:0),Av(e.type===`video`?e.info.height:0)])},Kv=(e,t)=>{let n=Q(t,bb),r=Q(Uv(e),bb),i=!lh(n)||!lh(r),a=i?Dv:J,o=i?Ov:Ev;return X(`edts`,void 0,[Z(`elst`,+!!i,0,[J(2),a(n),o(-1),Av(1),a(r),o(0),Av(1)])])},qv=(e,t)=>X(`mdia`,void 0,[Jv(e,t),Zv(!0,Yv[e.type],Xv[e.type]),Qv(e)]),Jv=(e,t)=>{let n=Q(Uv(e),e.timescale),r=!lh(t)||!lh(n),i=r?Dv:J;return Z(`mdhd`,+r,0,[i(t),i(t),J(e.timescale),i(n),q(lb(e.track.metadata.languageCode??`und`)),q(0)])},Yv={video:`vide`,audio:`soun`,subtitle:`text`},Xv={video:`MediabunnyVideoHandler`,audio:`MediabunnySoundHandler`,subtitle:`MediabunnyTextHandler`},Zv=(e,t,n,r=`\0\0\0\0`)=>Z(`hdlr`,0,0,[e?Y(`mhlr`):J(0),Y(t),Y(r),J(0),J(0),Y(n,!0)]),Qv=e=>X(`minf`,void 0,[ny[e.type](),ry(),oy(e)]),$v=()=>Z(`vmhd`,0,1,[q(0),q(0),q(0),q(0)]),ey=()=>Z(`smhd`,0,0,[q(0),q(0)]),ty=()=>Z(`nmhd`,0,0),ny={video:$v,audio:ey,subtitle:ty},ry=()=>X(`dinf`,void 0,[iy()]),iy=()=>Z(`dref`,0,0,[J(1)],[ay()]),ay=()=>Z(`url `,0,1),oy=e=>{let t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(e=>e.sampleCompositionTimeOffset!==0);return X(`stbl`,void 0,[sy(e),Dy(e),t?My(e):null,t?Ny(e):null,ky(e),Ay(e),jy(e),Oy(e)])},sy=e=>{let t;if(e.type===`video`)t=cy(rb(e.track.source._codec,e.info.decoderConfig.codec),e);else if(e.type===`audio`){let n=ab(e.track.source._codec,e.muxer.isQuickTime);U(n),t=hy(n,e)}else e.type===`subtitle`&&(t=Ty(sb[e.track.source._codec],e));return U(t),Z(`stsd`,0,0,[J(1)],[t])},cy=(e,t)=>X(e,[[,,,,,,].fill(0),q(1),q(0),q(0),Array(12).fill(0),q(t.info.width),q(t.info.height),J(4718592),J(4718592),J(0),q(1),K(10),Y(`Mediabunny`),Array(21).fill(0),q(t.info.hasAlphaChannel?32:24),wv(65535)],[ib[t.track.source._codec]?.(t)??null,ly(t),_h(t.info.decoderConfig.colorSpace)?uy(t):null]),ly=e=>e.info.pixelAspectRatio.num===e.info.pixelAspectRatio.den?null:X(`pasp`,[J(e.info.pixelAspectRatio.num),J(e.info.pixelAspectRatio.den)]),uy=e=>X(`colr`,[Y(e.muxer.isQuickTime?`nclc`:`nclx`),q(mh[e.info.decoderConfig.colorSpace.primaries]),q(hh[e.info.decoderConfig.colorSpace.transfer]),q(gh[e.info.decoderConfig.colorSpace.matrix]),e.muxer.isQuickTime?[]:K(!!e.info.decoderConfig.colorSpace.fullRange<<7)]),dy=e=>e.info.decoderConfig&&X(`avcC`,[...dh(e.info.decoderConfig.description)]),fy=e=>e.info.decoderConfig&&X(`hvcC`,[...dh(e.info.decoderConfig.description)]),py=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig,n=t.codec.split(`.`),r=Number(n[1]),i=Number(n[2]),a=Number(n[3]),o=n[4]?Number(n[4]):1,s=n[8]?Number(n[8]):Number(t.colorSpace?.fullRange??0),c=(a<<4)+(o<<1)+s,l=n[5]?Number(n[5]):t.colorSpace?.primaries?mh[t.colorSpace.primaries]:2,u=n[6]?Number(n[6]):t.colorSpace?.transfer?hh[t.colorSpace.transfer]:2,d=n[7]?Number(n[7]):t.colorSpace?.matrix?gh[t.colorSpace.matrix]:2;return Z(`vpcC`,1,0,[K(r),K(i),K(c),K(l),K(u),K(d),q(0)])},my=e=>X(`av1C`,Sg(e.info.decoderConfig.codec)),hy=(e,t)=>{let n=0,r,i=16,a=dg.includes(t.track.source._codec);if(a){let e=t.track.source._codec,{sampleSize:r}=wg(e);i=8*r,i>16&&(n=1)}if(t.muxer.isQuickTime&&(n=1),n===0)r=[[,,,,,,].fill(0),q(1),q(n),q(0),J(0),q(t.info.numberOfChannels),q(i),q(0),q(0),q(t.info.sampleRate<2**16?t.info.sampleRate:0),q(0)];else{let e=a?0:-2;r=[[,,,,,,].fill(0),q(1),q(n),q(0),J(0),q(t.info.numberOfChannels),q(Math.min(i,16)),wv(e),q(0),q(t.info.sampleRate<2**16?t.info.sampleRate:0),q(0),a?[J(1),J(i/8),J(t.info.numberOfChannels*i/8)]:[J(0),J(0),J(0)],J(2)]}return X(e,r,[ob(t.track.source._codec,t.muxer.isQuickTime)?.(t)??null])},gy=e=>{let t;switch(e.track.source._codec){case`aac`:t=64;break;case`mp3`:t=107;break;case`vorbis`:t=221;break;default:throw Error(`Unhandled audio codec: ${e.track.source._codec}`)}let n=[...K(t),...K(21),...Tv(0),...J(0),...J(0)];if(e.info.decoderConfig.description){let t=dh(e.info.decoderConfig.description);n=[...n,...K(5),...Mv(t.byteLength),...t]}return n=[...q(1),...K(0),...K(4),...Mv(n.length),...n,...K(6),...K(1),...K(2)],n=[...K(3),...Mv(n.length),...n],Z(`esds`,0,0,n)},_y=e=>X(`wave`,void 0,[vy(e),yy(e),X(`\0\0\0\0`)]),vy=e=>X(`frma`,[Y(ab(e.track.source._codec,e.muxer.isQuickTime))]),yy=e=>{let{littleEndian:t}=wg(e.track.source._codec);return X(`enda`,[q(+t)])},by=e=>{let t=e.info.numberOfChannels,n=3840,r=e.info.sampleRate,i=0,a=0,o=new Uint8Array,s=e.info.decoderConfig?.description;if(s){U(s.byteLength>=18);let e=dh(s),c=p_(e);t=c.outputChannelCount,n=c.preSkip,r=c.inputSampleRate,i=c.outputGain,a=c.channelMappingFamily,c.channelMappingTable&&(o=c.channelMappingTable)}return X(`dOps`,[K(0),K(t),q(n),J(r),wv(i),K(a),...o])},xy=e=>{let t=e.info.decoderConfig?.description;U(t);let n=dh(t);return Z(`dfLa`,0,0,[...n.subarray(4)])},Sy=e=>{let{littleEndian:t,sampleSize:n}=wg(e.track.source._codec),r=+t;return Z(`pcmC`,0,0,[K(r),K(8*n)])},Cy=e=>{U(e.info.primingPacket);let t=g_(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=new Uint8Array(3),r=new ig(n);return r.writeBits(2,t.fscod),r.writeBits(5,t.bsid),r.writeBits(3,t.bsmod),r.writeBits(3,t.acmod),r.writeBits(1,t.lfeon),r.writeBits(5,t.bitRateCode),r.writeBits(5,0),X(`dac3`,[...n])},wy=e=>{U(e.info.primingPacket);let t=v_(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=16;for(let e of t.substreams)n+=23,e.numDepSub>0?n+=9:n+=1;let r=Math.ceil(n/8),i=new Uint8Array(r),a=new ig(i);a.writeBits(13,t.dataRate),a.writeBits(3,t.substreams.length-1);for(let e of t.substreams)a.writeBits(2,e.fscod),a.writeBits(5,e.bsid),a.writeBits(1,0),a.writeBits(1,0),a.writeBits(3,e.bsmod),a.writeBits(3,e.acmod),a.writeBits(1,e.lfeon),a.writeBits(3,0),a.writeBits(4,e.numDepSub),e.numDepSub>0?a.writeBits(9,e.chanLoc):a.writeBits(1,0);return X(`dec3`,[...i])},Ty=(e,t)=>X(e,[[,,,,,,].fill(0),q(1)],[cb[t.track.source._codec](t)]),Ey=e=>X(`vttC`,[...ph.encode(e.info.config.description)]),Dy=e=>Z(`stts`,0,0,[J(e.timeToSampleTable.length),e.timeToSampleTable.map(e=>[J(e.sampleCount),J(e.sampleDelta)])]),Oy=e=>{if(e.samples.every(e=>e.type===`key`))return null;let t=[...e.samples.entries()].filter(([,e])=>e.type===`key`);return Z(`stss`,0,0,[J(t.length),t.map(([e])=>J(e+1))])},ky=e=>Z(`stsc`,0,0,[J(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(e=>[J(e.firstChunk),J(e.samplesPerChunk),J(1)])]),Ay=e=>{if(e.type===`audio`&&e.info.requiresPcmTransformation){let{sampleSize:t}=wg(e.track.source._codec);return Z(`stsz`,0,0,[J(t*e.info.numberOfChannels),J(e.samples.reduce((t,n)=>t+Q(n.duration,e.timescale),0))])}return Z(`stsz`,0,0,[J(0),J(e.samples.length),e.samples.map(e=>J(e.size))])},jy=e=>e.finalizedChunks.length>0&&ch(e.finalizedChunks).offset>=2**32?Z(`co64`,0,0,[J(e.finalizedChunks.length),e.finalizedChunks.map(e=>Dv(e.offset))]):Z(`stco`,0,0,[J(e.finalizedChunks.length),e.finalizedChunks.map(e=>J(e.offset))]),My=e=>Z(`ctts`,1,0,[J(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(e=>[J(e.sampleCount),Ev(e.sampleCompositionTimeOffset)])]),Ny=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;U(e.compositionTimeOffsetTable.length>0),U(e.samples.length>0);for(let r=0;r<e.compositionTimeOffsetTable.length;r++){let i=e.compositionTimeOffsetTable[r];t=Math.min(t,i.sampleCompositionTimeOffset),n=Math.max(n,i.sampleCompositionTimeOffset)}for(let t=0;t<e.samples.length;t++){let n=e.samples[t];r=Math.min(r,Q(n.timestamp,e.timescale)),i=Math.max(i,Q(n.timestamp+n.duration,e.timescale))}let a=Math.max(-t,0);return i>=2**31?null:Z(`cslg`,0,0,[Ev(a),Ev(t),Ev(n),Ev(r),Ev(i)])},Py=e=>X(`mvex`,void 0,e.map(Fy)),Fy=e=>Z(`trex`,0,0,[J(e.track.id),J(1),J(0),J(0),J(0)]),Iy=(e,t)=>X(`moof`,void 0,[Ly(e),...t.map(zy)]),Ly=e=>Z(`mfhd`,0,0,[J(e)]),Ry=e=>{let t=0,n=0,r=e.type===`delta`;return n|=+r,t|=r?1:2,t<<24|n<<16|0},zy=e=>X(`traf`,void 0,[By(e),Vy(e),Hy(e)]),By=e=>{U(e.currentChunk);let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],r={duration:n.timescaleUnitsToNextSample,size:n.size,flags:Ry(n)};return Z(`tfhd`,0,t,[J(e.track.id),J(r.duration),J(r.size),J(r.flags)])},Vy=e=>(U(e.currentChunk),Z(`tfdt`,1,0,[Dv(Q(e.currentChunk.startTimestamp,e.timescale))])),Hy=e=>{U(e.currentChunk);let t=e.currentChunk.samples.map(e=>e.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(e=>e.size),r=e.currentChunk.samples.map(Ry),i=e.currentChunk.samples.map(t=>Q(t.timestamp-t.decodeTimestamp,e.timescale)),a=new Set(t),o=new Set(n),s=new Set(r),c=new Set(i),l=s.size===2&&r[0]!==r[1],u=a.size>1,d=o.size>1,f=!l&&s.size>1,p=c.size>1||[...c].some(e=>e!==0),m=0;return m|=1,m|=4*l,m|=256*u,m|=512*d,m|=1024*f,m|=2048*p,Z(`trun`,1,m,[J(e.currentChunk.samples.length),J(e.currentChunk.offset-e.currentChunk.moofOffset||0),l?J(r[0]):[],e.currentChunk.samples.map((e,a)=>[u?J(t[a]):[],d?J(n[a]):[],f?J(r[a]):[],p?Ev(i[a]):[]])])},Uy=e=>X(`mfra`,void 0,[...e.map(Wy),Gy()]),Wy=e=>Z(`tfra`,1,0,[J(e.track.id),J(63),J(e.finalizedChunks.length),e.finalizedChunks.map(t=>[Dv(Q(t.samples[0].timestamp,e.timescale)),Dv(t.moofOffset),J(t.trafIndex+1),J(1),J(1)])]),Gy=()=>Z(`mfro`,0,0,[J(0)]),Ky=()=>X(`vtte`),qy=(e,t,n,r,i)=>X(`vttc`,void 0,[i===null?null:X(`vsid`,[Ev(i)]),n===null?null:X(`iden`,[...ph.encode(n)]),t===null?null:X(`ctim`,[...ph.encode(bv(t))]),r===null?null:X(`sttg`,[...ph.encode(r)]),X(`payl`,[...ph.encode(e)])]),Jy=e=>X(`vtta`,[...ph.encode(e)]),Yy=e=>{let t=[],n=e.format._options.metadataFormat??`auto`,r=e.output._metadataTags;if(n===`mdir`||n===`auto`&&!e.isQuickTime){let e=eb(r);e&&t.push(e)}else if(n===`mdta`){let e=tb(r);e&&t.push(e)}else(n===`udta`||n===`auto`&&e.isQuickTime)&&Xy(t,e.output._metadataTags);return t.length===0?null:X(`udta`,void 0,t)},Xy=(e,t)=>{for(let{key:n,value:r}of Bh(t))switch(n){case`title`:e.push(Zy(`©nam`,r));break;case`description`:e.push(Zy(`©des`,r));break;case`artist`:e.push(Zy(`©ART`,r));break;case`album`:e.push(Zy(`©alb`,r));break;case`albumArtist`:e.push(Zy(`albr`,r));break;case`genre`:e.push(Zy(`©gen`,r));break;case`date`:e.push(Zy(`©day`,r.toISOString().slice(0,10)));break;case`comment`:e.push(Zy(`©cmt`,r));break;case`lyrics`:e.push(Zy(`©lyr`,r));break;case`raw`:break;case`discNumber`:case`discsTotal`:case`trackNumber`:case`tracksTotal`:case`images`:break;default:Sh(n)}if(t.raw)for(let n in t.raw){let r=t.raw[n];r==null||n.length!==4||e.some(e=>e.type===n)||(typeof r==`string`?e.push(Zy(n,r)):r instanceof Uint8Array&&e.push(X(n,Array.from(r))))}},Zy=(e,t)=>{let n=ph.encode(t);return X(e,[q(n.length),q(lb(`und`)),Array.from(n)])},Qy={"image/jpeg":13,"image/png":14,"image/bmp":27},$y=(e,t)=>{let n=[];for(let{key:r,value:i}of Bh(e))switch(r){case`title`:n.push({key:t?`title`:`©nam`,value:nb(i)});break;case`description`:n.push({key:t?`description`:`©des`,value:nb(i)});break;case`artist`:n.push({key:t?`artist`:`©ART`,value:nb(i)});break;case`album`:n.push({key:t?`album`:`©alb`,value:nb(i)});break;case`albumArtist`:n.push({key:t?`album_artist`:`aART`,value:nb(i)});break;case`comment`:n.push({key:t?`comment`:`©cmt`,value:nb(i)});break;case`genre`:n.push({key:t?`genre`:`©gen`,value:nb(i)});break;case`lyrics`:n.push({key:t?`lyrics`:`©lyr`,value:nb(i)});break;case`date`:n.push({key:t?`date`:`©day`,value:nb(i.toISOString().slice(0,10))});break;case`images`:for(let e of i)e.kind===`coverFront`&&n.push({key:`covr`,value:X(`data`,[J(Qy[e.mimeType]??0),J(0),Array.from(e.data)])});break;case`trackNumber`:if(t){let t=e.tracksTotal===void 0?i.toString():`${i}/${e.tracksTotal}`;n.push({key:`track`,value:nb(t)})}else n.push({key:`trkn`,value:X(`data`,[J(0),J(0),q(0),q(i),q(e.tracksTotal??0),q(0)])});break;case`discNumber`:t||n.push({key:`disc`,value:X(`data`,[J(0),J(0),q(0),q(i),q(e.discsTotal??0),q(0)])});break;case`tracksTotal`:case`discsTotal`:break;case`raw`:break;default:Sh(r)}if(e.raw)for(let r in e.raw){let i=e.raw[r];i==null||!t&&r.length!==4||n.some(e=>e.key===r)||(typeof i==`string`?n.push({key:r,value:nb(i)}):i instanceof Uint8Array?n.push({key:r,value:X(`data`,[J(0),J(0),Array.from(i)])}):i instanceof $h&&n.push({key:r,value:X(`data`,[J(Qy[i.mimeType]??0),J(0),Array.from(i.data)])}))}return n},eb=e=>{let t=$y(e,!1);return t.length===0?null:Z(`meta`,0,0,void 0,[Zv(!1,`mdir`,``,`appl`),X(`ilst`,void 0,t.map(e=>X(e.key,void 0,[e.value])))])},tb=e=>{let t=$y(e,!0);return t.length===0?null:X(`meta`,void 0,[Zv(!1,`mdta`,``),Z(`keys`,0,0,[J(t.length)],t.map(e=>X(`mdta`,[...ph.encode(e.key)]))),X(`ilst`,void 0,t.map((e,t)=>{let n=String.fromCharCode(...J(t+1));return X(n,void 0,[e.value])}))])},nb=e=>X(`data`,[J(1),J(0),...ph.encode(e)]),rb=(e,t)=>{switch(e){case`avc`:return t.startsWith(`avc3`)?`avc3`:`avc1`;case`hevc`:return`hvc1`;case`vp8`:return`vp08`;case`vp9`:return`vp09`;case`av1`:return`av01`;case`prores`:return t}},ib={avc:dy,hevc:fy,vp8:py,vp9:py,av1:my,prores:null},ab=(e,t)=>{switch(e){case`aac`:return`mp4a`;case`mp3`:return`mp4a`;case`opus`:return`Opus`;case`vorbis`:return`mp4a`;case`flac`:return`fLaC`;case`ulaw`:return`ulaw`;case`alaw`:return`alaw`;case`pcm-u8`:return`raw `;case`pcm-s8`:return`sowt`;case`ac3`:return`ac-3`;case`eac3`:return`ec-3`}if(t)switch(e){case`pcm-s16`:return`sowt`;case`pcm-s16be`:return`twos`;case`pcm-s24`:return`in24`;case`pcm-s24be`:return`in24`;case`pcm-s32`:return`in32`;case`pcm-s32be`:return`in32`;case`pcm-f32`:return`fl32`;case`pcm-f32be`:return`fl32`;case`pcm-f64`:return`fl64`;case`pcm-f64be`:return`fl64`}else switch(e){case`pcm-s16`:return`ipcm`;case`pcm-s16be`:return`ipcm`;case`pcm-s24`:return`ipcm`;case`pcm-s24be`:return`ipcm`;case`pcm-s32`:return`ipcm`;case`pcm-s32be`:return`ipcm`;case`pcm-f32`:return`fpcm`;case`pcm-f32be`:return`fpcm`;case`pcm-f64`:return`fpcm`;case`pcm-f64be`:return`fpcm`}},ob=(e,t)=>{switch(e){case`aac`:return gy;case`mp3`:return gy;case`opus`:return by;case`vorbis`:return gy;case`flac`:return xy;case`ac3`:return Cy;case`eac3`:return wy}if(t)switch(e){case`pcm-s24`:return _y;case`pcm-s24be`:return _y;case`pcm-s32`:return _y;case`pcm-s32be`:return _y;case`pcm-f32`:return _y;case`pcm-f32be`:return _y;case`pcm-f64`:return _y;case`pcm-f64be`:return _y}else switch(e){case`pcm-s16`:return Sy;case`pcm-s16be`:return Sy;case`pcm-s24`:return Sy;case`pcm-s24be`:return Sy;case`pcm-s32`:return Sy;case`pcm-s32be`:return Sy;case`pcm-f32`:return Sy;case`pcm-f32be`:return Sy;case`pcm-f64`:return Sy;case`pcm-f64be`:return Sy}return null},sb={webvtt:`wvtt`},cb={webvtt:Ey},lb=e=>{U(e.length===3);let t=0;for(let n=0;n<3;n++)t<<=5,t+=e.charCodeAt(n)-96;return t}})))()}var db;function fb(){return(fb=t((()=>{Yh(),db=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw Error(`Can't have multiple Writers for the same Target.`);this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){U(!this.started),this.target._start(),this.started=!0}write(e){U(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return U(this.started&&!this.finalized),this.target._flush()}async finalize(){U(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let n=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<n;)r*=2;if(r!==this.trackedWrites.byteLength){let e=new Uint8Array(r);e.set(this.trackedWrites,0),this.trackedWrites=e}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(1024),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw Error(`Internal error: Can't get tracked writes since nothing was tracked.`);let e={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,e}}})))()}var pb,mb,hb,gb,_b,vb;function yb(){return(yb=t((()=>{D_(),Yh(),pb=class extends qh{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit(`write`,{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw TypeError(`offset must be a non-negative integer.`);return new _b(this,e)}},mb=2**16,hb=2**32,gb=class extends pb{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!=`object`)throw TypeError(`BufferTarget options, when provided, must be an object.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);if(this._options=e,this._supportsResize=`resize`in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(mb,{maxByteLength:hb})}catch{this._buffer=new ArrayBuffer(mb),this._supportsResize=!1}else this._buffer=new ArrayBuffer(mb);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>hb)throw Error(`ArrayBuffer exceeded maximum size of ${hb} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let e=new ArrayBuffer(t),n=new Uint8Array(e);n.set(this._bytes,0),this._buffer=e,this._bytes=n}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit(`finalized`)}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},_b=class extends pb{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit(`finalized`)}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},vb=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!=`string`)throw TypeError(`rootPath must be a string.`);if(typeof t!=`function`)throw TypeError(`getTarget must be a function.`)}}})))()}var bb,xb,Sb,Q,Cb;function wb(){return(wb=t((()=>{ub(),vv(),fb(),yb(),Yh(),Ub(),xv(),lg(),Ig(),E_(),gv(),y_(),w_(),bb=57600,xb=2082844800,Sb=e=>{let t={},n=e.track;return n.metadata.name!==void 0&&(t.name=n.metadata.name),t},Q=(e,t,n=!0)=>{let r=e*t;return n?Math.round(r):r},Cb=class extends _v{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new gb,this.auxWriter=new db(this.auxTarget,!1),this.auxBoxWriter=new Sv(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=xh(),this.creationTime=Math.floor(Date.now()/1e3)+xb,this.finalizedChunks=[],this.wroteFragmentedHeader=!1,this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.formatOptions={...t._options},this.isQuickTime=t instanceof Hb,this.isCmaf=t instanceof Vb,this.minimumFragmentDuration=this.formatOptions.minimumFragmentDuration??(t instanceof Vb?1/0:1),this.auxWriter.start()}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart=`fragmented`,this.isFragmented=!0):(this.writer=await this.output._getRootWriter(e=>this.formatOptions.fastStart===void 0?e instanceof gb:this.formatOptions.fastStart===`fragmented`),this.boxWriter=new Sv(this.writer),this.fastStart=this.formatOptions.fastStart??(this.writer.target instanceof gb&&`in-memory`),this.isFragmented=this.fastStart===`fragmented`),this.isCmaf){if(!this.output._hasInitTarget())throw Error(`CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.`);let e=await this.output._getInitTarget(),t=new db(e,!0);t.start(),this.initWriter=t,this.initBoxWriter=new Sv(t)}let t=this.output.tracks.some(e=>e.isVideoTrack()&&e.source._codec===`avc`);{let e=this.initBoxWriter??this.boxWriter;if(U(e),this.formatOptions.onFtyp&&e.writer.startTrackingWrites(),e.writeBox(Iv({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.formatOptions.onFtyp){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onFtyp(t,n)}this.ftypSize=e.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!==`in-memory`){if(this.fastStart===`reserve`){for(let e of this.output.tracks)if(e.metadata.maximumPacketCount===void 0)throw Error(`All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.`)}else this.isFragmented||(U(this.writer),U(this.boxWriter),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=zv(!0),this.boxWriter.writeBox(this.mdat))}await this.writer?.flush();for(let e of this.output.tracks)e.isVideoTrack()&&e.metadata.decoderConfig?this.getVideoTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig}):e.isAudioTrack()&&e.metadata.decoderConfig&&this.getAudioTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig});e()}allTracksAreKnown(){for(let e of this.output.tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(e=>e.type===`video`||e.type===`audio`?e.info.decoderConfig.codec:{webvtt:`wvtt`}[e.track.source._codec]);return C_({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(e=>e.type===`video`),hasAudio:this.trackDatas.some(e=>e.type===`audio`),codecStrings:e})}getVideoTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Mg(n,e.source._codec),U(n),U(n.decoderConfig);let i={...n.decoderConfig};U(i.codedWidth!==void 0),U(i.codedHeight!==void 0);let a=!1;if(e.source._codec===`avc`&&!i.description){if(!t)throw Error(`No AVC description provided; you must therefore provide a priming packet.`);let e=Jg(t.data);if(!e)throw Error(`Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.`);i.description=Yg(e),a=!0}else if(e.source._codec===`hevc`&&!i.description){if(!t)throw Error(`No HEVC description provided; you must therefore provide a priming packet.`);let e=n_(t.data);if(!e)throw Error(`Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.`);i.description=u_(e),a=!0}let o=Mh(1/(e.metadata.frameRate??57600),1e6).den,s=i.displayAspectWidth,c=i.displayAspectHeight,l=s===void 0||c===void 0?{num:1,den:1}:Uh({num:s*i.codedHeight,den:c*i.codedWidth}),u=i.codec===`ap4h`||i.codec===`ap4x`,d={muxer:this,track:e,type:`video`,info:{width:i.codedWidth,height:i.codedHeight,pixelAspectRatio:l,decoderConfig:i,requiresAnnexBTransformation:a,hasAlphaChannel:u},timescale:o,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(d),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),d}getAudioTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Pg(n,e.source._codec),U(n),U(n.decoderConfig);let i={...n.decoderConfig},a=!1;if(e.source._codec===`aac`&&!i.description){if(!t)throw Error(`No AAC description provided; you must therefore provide a priming packet.`);let e=T_(pv.tempFromBytes(t.data));if(!e)throw Error(`Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.`);let n=og[e.samplingFrequencyIndex],r=sg[e.channelConfiguration];if(n===void 0||r===void 0)throw Error(`Invalid ADTS frame header.`);i.description=cg({objectType:e.objectType,sampleRate:n,numberOfChannels:r}),a=!0}if((e.source._codec===`ac3`||e.source._codec===`eac3`)&&!t)throw Error(`AC-3/E-AC-3 require a priming packet.`);let o={muxer:this,track:e,type:`audio`,info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:i,requiresPcmTransformation:!this.isFragmented&&dg.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:a,primingPacket:t},timescale:i.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(o),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),o}getSubtitleTrackData(e,t){let n=this.trackDatas.find(t=>t.track===e);if(n)return n;Fg(t),U(t),U(t.config);let r={muxer:this,track:e,type:`subtitle`,info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,lastCueEndTimestamp:0,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getVideoTrackData(e,t,n),i=t.data;if(r.info.requiresAnnexBTransformation){let e=[...Hg(i)].map(e=>i.subarray(e.offset,e.offset+e.length));if(e.length===0)throw Error(`Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.`);i=qg(e,4)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=this.createSampleForTrack(r,i,t.timestamp,t.duration,t.type);await this.registerSample(r,a)}finally{r()}}async addEncodedAudioPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getAudioTrackData(e,t,n),i=t.data;if(r.info.requiresAdtsStripping){let e=T_(pv.tempFromBytes(i));if(!e)throw Error(`Expected ADTS frame, didn't get one.`);let t=e.crcCheck===null?7:9;i=i.subarray(t)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=t.timestamp,o=t.duration;if(r.info.requiresPcmTransformation){let e=wg(r.info.decoderConfig.codec).sampleSize*r.info.numberOfChannels;if(o=i.byteLength/e/r.info.sampleRate,r.info.expectedNextPcmPacketTimestamp!==null){let e=a-r.info.expectedNextPcmPacketTimestamp;if(e<.01)a=r.info.expectedNextPcmPacketTimestamp;else{let t=await this.padWithSilence(r,r.info.expectedNextPcmPacketTimestamp,e);a=r.info.expectedNextPcmPacketTimestamp+t}}r.info.expectedNextPcmPacketTimestamp=a+o}let s=this.createSampleForTrack(r,i,a,o,t.type);await this.registerSample(r,s)}finally{r()}}async padWithSilence(e,t,n){let r=Q(n,e.timescale);if(n=r/e.timescale,r>0){let{sampleSize:i,silentValue:a}=wg(e.info.decoderConfig.codec),o=r*e.info.numberOfChannels,s=new Uint8Array(i*o).fill(a),c=this.createSampleForTrack(e,new Uint8Array(s.buffer),t,n,`key`);await this.registerSample(e,c)}return n}async addSubtitleCue(e,t,n){let r=await this.mutex.acquire();try{let r=this.getSubtitleTrackData(e,n);this.validateTimestamp(r.track,t.timestamp,!0),e.source._codec===`webvtt`&&(r.cueQueue.push(t),await this.processWebVTTCues(r,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){let n=new Set([]);for(let r of e.cueQueue)U(r.timestamp<=t),U(e.lastCueEndTimestamp<=r.timestamp+r.duration),n.add(Math.max(r.timestamp,e.lastCueEndTimestamp)),n.add(r.timestamp+r.duration);let r=[...n].sort((e,t)=>e-t),i=r[0],a=r[1]??i;if(t<a)break;if(e.lastCueEndTimestamp<i){this.auxWriter.seek(0);let t=Ky();this.auxBoxWriter.writeBox(t);let n=this.auxTarget._getSlice(0,this.auxWriter.getPos()),r=this.createSampleForTrack(e,n,e.lastCueEndTimestamp,i-e.lastCueEndTimestamp,`key`);await this.registerSample(e,r),e.lastCueEndTimestamp=i}this.auxWriter.seek(0);for(let t=0;t<e.cueQueue.length;t++){let n=e.cueQueue[t];if(n.timestamp>=a)break;yv.lastIndex=0;let r=yv.test(n.text),o=n.timestamp+n.duration,s=e.cueToSourceId.get(n);if(s===void 0&&a<o&&(s=e.nextSourceId++,e.cueToSourceId.set(n,s)),n.notes){let e=Jy(n.notes);this.auxBoxWriter.writeBox(e)}let c=qy(n.text,r?i:null,n.identifier??null,n.settings??null,s??null);this.auxBoxWriter.writeBox(c),o===a&&e.cueQueue.splice(t--,1)}let o=this.auxTarget._getSlice(0,this.auxWriter.getPos()),s=this.createSampleForTrack(e,o,i,a-i,`key`);await this.registerSample(e,s),e.lastCueEndTimestamp=a}}createSampleForTrack(e,t,n,r,i){return{timestamp:n,decodeTimestamp:n,duration:r,data:t,size:t.byteLength,type:i,timescaleUnitsToNextSample:Q(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type===`audio`&&e.info.requiresPcmTransformation){this.isFragmented||(e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp);let t=0;for(let n=0;n<e.timestampProcessingQueue.length;n++){let r=e.timestampProcessingQueue[n],i=Q(r.duration,e.timescale);t+=i}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:t,sampleDelta:1});else{let n=ch(e.timeToSampleTable);n.sampleCount+=t}e.timestampProcessingQueue.length=0;return}let n=e.timestampProcessingQueue.map(e=>e.timestamp).sort((e,t)=>e-t);this.isFragmented||(e.startTimestampOffset??=n[0]);for(let t=0;t<e.timestampProcessingQueue.length;t++){let r=e.timestampProcessingQueue[t];r.decodeTimestamp=n[t];let i=Q(r.timestamp-r.decodeTimestamp,e.timescale),a=Q(r.duration,e.timescale);if(e.lastTimescaleUnits!==null){U(e.lastSample);let t=Q(r.decodeTimestamp,e.timescale,!1),n=Math.round(t-e.lastTimescaleUnits);if(U(n>=0),e.lastTimescaleUnits+=n,e.lastSample.timescaleUnitsToNextSample=n,!this.isFragmented){let t=ch(e.timeToSampleTable);if(U(t),t.sampleCount===1){t.sampleDelta=n;let r=e.timeToSampleTable[e.timeToSampleTable.length-2];r&&r.sampleDelta===n&&(r.sampleCount++,e.timeToSampleTable.pop(),t=r)}else t.sampleDelta!==n&&(t.sampleCount--,e.timeToSampleTable.push(t={sampleCount:1,sampleDelta:n}));t.sampleDelta===a?t.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let r=ch(e.compositionTimeOffsetTable);U(r),r.sampleCompositionTimeOffset===i?r.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i})}}else e.lastTimescaleUnits=Q(r.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i}));e.lastSample=r}if(e.timestampProcessingQueue.length=0,U(e.lastSample),U(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){U(t.type===`key`);let n=Q(t.timestamp,e.timescale,!1),r=Math.round(n-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=r}}async registerSample(e,t){t.type===`key`&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart===`reserve`?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart===`reserve`)){let t=e.track.metadata.maximumPacketCount;if(U(t!==void 0),e.samples.length>t)throw Error(`Track #${e.track.id} has already reached the maximum packet count (${t}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!e.currentChunk)n=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let i=this.trackDatas.every(n=>{if(e===n)return t.type===`key`;let r=n.sampleQueue[0];return r?r.type===`key`:n.closed});r>=this.minimumFragmentDuration&&i&&t.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=r>=.5}n&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null,trafIndex:null}),U(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(U(!this.isFragmented),U(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type===`audio`&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((t,n)=>t+Q(n.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||ch(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart===`in-memory`){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(let t of e.currentChunk.samples)U(t.data),this.writer.write(t.data),t.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(U(this.isFragmented),!(!e&&!this.allTracksAreKnown()))outer:for(;;){let t=null,n=1/0;for(let r of this.trackDatas){if(!e&&r.sampleQueue.length===0&&!r.closed)break outer;r.sampleQueue.length>0&&r.sampleQueue[0].timestamp<n&&(t=r,n=r.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){if(U(this.isFragmented),!this.wroteFragmentedHeader){this.wroteFragmentedHeader=!0;let e=this.initBoxWriter??this.boxWriter;U(e),this.formatOptions.onMoov&&e.writer.startTrackingWrites(),this.ensureOneEnabledTrack();let t=Vv(this);if(e.writeBox(t),this.formatOptions.onMoov){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onMoov(t,n)}if(this.isCmaf){U(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new Sv(this.writer);let e=this.boxWriter.measureBox(Lv()),t=this.boxWriter.measureBox(Rv(this,0));this.segmentHeaderSize=e+t,this.writer.seek(this.segmentHeaderSize)}}U(this.writer),U(this.boxWriter);let t=this.trackDatas.filter(e=>e.currentChunk);if(t.length===0){e&&await this.writer.flush();return}let n=this.nextFragmentNumber++,r=Iy(n,t),i=this.writer.getPos(),a=i+this.boxWriter.measureBox(r),o=a+8,s=1/0;for(let e=0;e<t.length;e++){let n=t[e];n.currentChunk.offset=o,n.currentChunk.moofOffset=i,n.currentChunk.trafIndex=e;for(let e of n.currentChunk.samples)o+=e.size;s=Math.min(s,n.currentChunk.startTimestamp)}let c=o-a,l=c>=2**32;if(l)for(let e of t)e.currentChunk.offset+=8;this.formatOptions.onMoof&&this.writer.startTrackingWrites();let u=Iy(n,t);if(this.boxWriter.writeBox(u),this.formatOptions.onMoof){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoof(e,t,s)}U(this.writer.getPos()===a),this.formatOptions.onMdat&&this.writer.startTrackingWrites();let d=zv(l);d.size=c,this.boxWriter.writeBox(d),this.writer.seek(a+(l?16:8));for(let e of t)for(let t of e.currentChunk.samples)this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}for(let e of t)e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk),e.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){this.allTracksAreKnown()?(this.mdat||await this.createFastStartReserveMdat(),await this.addSampleToTrack(e,t)):e.sampleQueue.push(t)}async createFastStartReserveMdat(){U(this.writer),U(this.boxWriter),this.ensureOneEnabledTrack();let e=Vv(this),t=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;U(this.ftypSize!==null),this.writer.seek(this.ftypSize+t),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=zv(!0),this.boxWriter.writeBox(this.mdat);for(let e of this.trackDatas){for(let t of e.sampleQueue)await this.addSampleToTrack(e,t);e.sampleQueue.length=0}}computeSampleTableSizeUpperBound(){U(this.fastStart===`reserve`);let e=0;for(let t of this.trackDatas){let n=t.track.metadata.maximumPacketCount;U(n!==void 0),e+=8*Math.ceil(2/3*n),e+=4*n,e+=8*Math.ceil(2/3*n),e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n}return e}async onTrackClose(e){let t=await this.mutex.acquire(),n=this.trackDatas.find(t=>t.track===e);n&&(n.closed=!0,n.type===`subtitle`&&e.source._codec===`webvtt`&&await this.processWebVTTCues(n,1/0),this.processTimestamps(n)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}ensureOneEnabledTrack(){for(let e of[`video`,`audio`,`subtitle`]){let t=this.trackDatas.filter(t=>t.type===e);if(t.length!==0&&!t.some(e=>e.track.metadata.disposition?.default!==!1)){let e=t[0];e.track.metadata.disposition={...e.track.metadata.disposition,default:!0}}}}async forceFragmentFinalization(){U(this.isFragmented);let e=await this.mutex.acquire();try{for(let e of this.trackDatas)e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);await this.interleaveSamples(!0),await this.finalizeFragment()}finally{e()}}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve(),this.ensureOneEnabledTrack(),!this.mdat&&this.fastStart===`reserve`&&await this.createFastStartReserveMdat();for(let e of this.trackDatas)e.closed=!0,e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let e of this.trackDatas)if(await this.finalizeCurrentChunk(e),e.startTimestampOffset!==null)for(let t=0;t<e.samples.length;t++){let n=e.samples[t];n.timestamp-=e.startTimestampOffset,n.decodeTimestamp-=e.startTimestampOffset}if(U(this.writer),U(this.boxWriter),this.fastStart===`in-memory`){this.mdat=zv(!1);let e;for(let t=0;t<2;t++){let t=Vv(this),n=this.boxWriter.measureBox(t);e=this.boxWriter.measureBox(this.mdat);let r=this.writer.getPos()+n+e;for(let t of this.finalizedChunks){t.offset=r;for(let{data:n}of t.samples)U(n),r+=n.byteLength,e+=n.byteLength}if(r<2**32)break;e>=2**32&&(this.mdat.largeSize=!0)}this.formatOptions.onMoov&&this.writer.startTrackingWrites();let t=Vv(this);if(this.boxWriter.writeBox(t),this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=e,this.boxWriter.writeBox(this.mdat);for(let e of this.finalizedChunks)for(let t of e.samples)U(t.data),this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}}else if(this.isFragmented){if(this.isCmaf){let e=this.segmentHeaderSize===null?0:this.writer.getPos()-this.segmentHeaderSize;this.writer.seek(0),this.boxWriter.writeBox(Lv()),this.boxWriter.writeBox(Rv(this,e))}else{let e=this.writer.getPos(),t=Uy(this.trackDatas);this.boxWriter.writeBox(t);let n=this.writer.getPos()-e;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(n)}}else{U(this.mdat);let e=this.boxWriter.offsets.get(this.mdat);U(e!==void 0);let t=this.writer.getPos()-e;if(this.mdat.size=t,this.mdat.largeSize=t>=2**32,this.boxWriter.patchBox(this.mdat),this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}let n=Vv(this);if(this.fastStart===`reserve`){U(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);let e=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(Bv(e))}else this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);if(this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}}e()}}})))()}var Tb,Eb,Db,Ob,kb,Ab,jb,Mb,Nb,Pb,Fb,Ib;function Lb(){return(Lb=t((()=>{Ig(),Yh(),fv(),S_(),$_(),uv(),y_(),Tb=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},Eb=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),Db=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1}_ensureValidAdd(){if(!this._connectedTrack)throw Error(`Source is not connected to an output track.`);if(this._connectedTrack.output.state===`canceled`)throw Error(`Output has been canceled.`);if(this._connectedTrack.output.state===`finalizing`||this._connectedTrack.output.state===`finalized`)throw Error(`Output has been finalized.`);if(this._connectedTrack.output.state===`pending`)throw Error(`Output has not started.`);if(this._closed)throw Error(`Source is closed.`)}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw Error(`Cannot call close without connecting the source to an output track.`);if(e.output.state===`pending`)throw Error(`Cannot call close before output has been started.`);this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,e.output.state!==`finalizing`&&e.output.state!==`finalized`&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},Ob=class extends Db{constructor(e){if(super(),this._connectedTrack=null,!ug.includes(e))throw TypeError(`Invalid video codec '${e}'. Must be one of: ${ug.join(`, `)}.`);this._codec=e}},kb=(e,t)=>{if(e.metadata.hasOnlyKeyPackets&&t.type!==`key`)throw Error(`Cannot add non-key packets to a hasOnlyKeyPackets video track.`)},Ab=class{setError(e){this.errorSet||=(this.error=e,!0)}constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.emittedEncoderPackets=0,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new Nh,this.customEncoderQueueSize=0,this.defaultEncodeOptions={},this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorSet=!1,this.lastMuxerPromise=Promise.resolve(),this.closed=!1}async add(e,t,n){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let i=this.encodingConfig,a=i.sizeChangeBehavior??`deny`,o=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(o=!0,a===`deny`))throw Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(i.transform?.width!==void 0||i.transform?.height!==void 0||i.transform?.rotate!==void 0||i.transform?.crop!==void 0||i.transform?.force===!0||o&&a!==`passThrough`){let n=i.transform?.width,r=i.transform?.height,s=i.transform?.fit??`fill`;o&&a!==`passThrough`&&(U(this.outputWidth),U(this.outputHeight),U(a!==`deny`),n=this.outputWidth,r=this.outputHeight,s=a);let c=await e.transform({width:n,height:r,roundDimensionsTo:2,crop:i.transform?.crop,rotate:i.transform?.rotate,fit:s,alpha:i.alpha});(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=c.displayWidth,this.outputHeight=c.displayHeight),t&&e.close(),e=c,t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let s=i.transform?.frameRate;if(s!==void 0){let i=e.timestamp+e.duration,a=Oh(e.timestamp,s);if(this.frameRateLastSample!==null){if(a<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=i;return}await this.padFrameRate(a,n)}e===r&&(e=e.clone(),t=!0),e.setTimestamp(a),e.setDuration(1/s),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=a,this.frameRateLastEndTimestamp=i}await this.processAndEncode(e,n)}finally{t&&e.close()}}async processAndEncode(e,t){let n=this.encodingConfig,r;if(n.transform?.process){let t=n.transform.process(e);if(t instanceof Promise&&(t=await t),t===null)return;Array.isArray(t)||(t=[t]);let i=[];try{for(let n of t)n instanceof I_?i.push(n):typeof VideoFrame<`u`&&n instanceof VideoFrame?i.push(new I_(n)):i.push(new I_(n,{timestamp:e.timestamp,duration:e.duration}))}catch(n){for(let t of i)t!==e&&t.close();for(let n of t)(n instanceof I_&&n!==e||typeof VideoFrame<`u`&&n instanceof VideoFrame)&&n.close();throw n}r=i}else r=[e];try{for(let e of r){if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),U(this.encoderInitialized),this.closed)break;let n=this.encodingConfig.keyFrameInterval??2,r=Math.floor(e.timestamp/n),i={...this.defaultEncodeOptions,...e.encodeOptions,...t},a={...i,keyFrame:i.keyFrame===void 0?n===0||r!==this.lastMultipleOfKeyFrameInterval:i.keyFrame};if(this.lastMultipleOfKeyFrameInterval=r,this.encodingConfig.onEncodedSample?.(e),this.customEncoder){this.customEncoderQueueSize++;let t=e.clone(),n=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(t,a)).catch(e=>this.setError(e)).finally(()=>{this.customEncoderQueueSize--,t.close()});this.customEncoderQueueSize>=4&&await n}else{U(this.encoder);let t=e.toVideoFrame(),n=bh(this.preciseTimings,t.timestamp,e=>e.microsecondTimestamp),r=n===-1?null:this.preciseTimings[n];if(r&&r.microsecondTimestamp===t.timestamp?(r.timestamp!==e.timestamp&&(r.timestampIsValid=!1),r.duration!==e.duration&&(r.durationIsValid=!1)):(this.preciseTimings.splice(n+1,0,{microsecondTimestamp:t.timestamp,timestamp:e.timestamp,duration:e.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),!this.alphaEncoder)try{this.encoder.encode(t,a)}finally{t.close()}else if(t.format&&!t.format.includes(`A`)||this.splitterCreationFailed){this.alphaFrameQueue.push(null);try{this.encoder.encode(t,a)}finally{t.close()}}else{this.splitter||=new Mb;let{colorFrame:e,alphaFrame:n}=await this.splitter.split(t);this.alphaFrameQueue.push(n);try{this.encoder.encode(e,a)}finally{e.close()}}this.encoder.encodeQueueSize>=4&&await new Promise(e=>this.encoder.addEventListener(`dequeue`,e,{once:!0}))}await this.lastMuxerPromise}}finally{for(let t of r)t!==e&&t.close()}}async padFrameRate(e,t){let n=this.encodingConfig.transform.frameRate;U(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*n);for(let e=1;e<r;e++){let r={stack:[],error:void 0,hasError:!1};try{let i=Tb(r,this.frameRateLastSample.clone(),!1);i.setTimestamp(this.frameRateLastTimestamp+e/n),i.setDuration(1/n),await this.processAndEncode(i,t)}catch(e){r.error=e,r.hasError=!0}finally{Eb(r)}}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=lv(this.encodingConfig.quality,this.encodingConfig.bitrate);U(t!==void 0);let n=nv({...this.encodingConfig,quality:t,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate}),r=null,i;for(let e of n){let t=e.config;if(this.encodingConfig.onEncoderConfig?.(t),i=dv.find(e=>e.supports(this.encodingConfig.codec,t)),i){r=e;break}if(!(typeof VideoEncoder>`u`)){if(t.alpha=`discard`,this.encodingConfig.alpha===`keep`&&(t.latencyMode=`quality`),(t.width%2==1||t.height%2==1)&&(this.encodingConfig.codec===`avc`||this.encodingConfig.codec===`hevc`))throw Error(`The dimensions ${t.width}x${t.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);try{if((await VideoEncoder.isConfigSupported(t)).supported){r=e;break}}catch{}}}if(!r){if(typeof VideoEncoder>`u`)throw Error(`VideoEncoder is not supported by this browser.`);let e=n[0].config,t=n.map(({config:e,quantizer:t})=>t===null?`${e.bitrate} bps`:`quantizer ${t}`);throw Error(`This specific encoder configuration (${e.codec}, ${t.join(` / `)}, ${e.width}x${e.height}, hardware acceleration: ${e.hardwareAcceleration??`no-preference`}) is not supported by this browser. Consider using another codec or changing your video parameters.`)}let a=r.config;if(r.quantizer!==null&&(this.defaultEncodeOptions=cv(this.encodingConfig.codec,r.quantizer)),i)this.customEncoder=new i,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=a,this.customEncoder.onPacket=(e,t)=>{if(!(e instanceof x_))throw TypeError(`The first argument passed to onPacket must be an EncodedPacket.`);if(t!==void 0&&(!t||typeof t!=`object`))throw TypeError(`The second argument passed to onPacket must be an object or undefined.`);kb(this.source._connectedTrack,e),this.encodingConfig.onEncodedPacket?.(e,t),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,e,t).catch(e=>{this.setError(e)})},this.customEncoder.onError=e=>{this.setError(e)},await this.customEncoder.init();else{let e=[],t=[],n=0,r=0,i=(e,t,n)=>{let r={};if(t){let e=new Uint8Array(t.byteLength);t.copyTo(e),r.alpha=e}let i=x_.fromEncodedChunk(e,r),a=bh(this.preciseTimings,e.timestamp,e=>e.microsecondTimestamp),o=a===-1?null:this.preciseTimings[a],s=null;this.emittedEncoderPackets===0&&i.type===`delta`&&n?.decoderConfig&&(s=m_(this.encodingConfig.codec,n.decoderConfig,i.data)),(o&&o.microsecondTimestamp===e.timestamp||s!==null)&&(i=i.clone({timestamp:o?.timestampIsValid?o.timestamp:void 0,duration:o?.durationIsValid?o.duration:void 0,type:s??void 0})),kb(this.source._connectedTrack,i),this.encodingConfig.onEncodedPacket?.(i,n),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,i,n).catch(e=>{this.setError(e)}),this.emittedEncoderPackets++},o=Error(`Encoding error`).stack;if(this.encoder=new VideoEncoder({output:(a,o)=>{if(!this.alphaEncoder){i(a,null,o);return}let s=this.alphaFrameQueue.shift();U(s!==void 0),s?(this.alphaEncoder.encode(s,{...this.defaultEncodeOptions,keyFrame:a.type===`key`}),r++,s.close(),e.push({chunk:a,meta:o})):r===0?i(a,null,o):(t.push(n+r),e.push({chunk:a,meta:o}))},error:e=>{e.stack=o,this.setError(e)}}),this.encoder.configure(a),this.encodingConfig.alpha===`keep`){let o=Error(`Encoding error`).stack;this.alphaEncoder=new VideoEncoder({output:(a,o)=>{r--;let s=e.shift();for(U(s!==void 0),i(s.chunk,a,s.meta),n++;t.length>0&&t[0]===n;){t.shift();let n=e.shift();U(n!==void 0),i(n.chunk,null,n.meta)}},error:e=>{e.stack=o,this.setError(e)}}),this.alphaEncoder.configure(a)}}U(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}async flushAndClose(e){try{if(!e&&(this.checkForEncoderError(),this.frameRateLastSample)){let e=this.encodingConfig.transform.frameRate,t=Oh(this.frameRateLastEndTimestamp,e);await this.padFrameRate(t)}this.closed=!0,e||(this.customEncoder?this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()):this.encoder&&(await this.encoder.flush(),await this.alphaEncoder?.flush(),await Gh(25)))}finally{this.closed=!0,this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?await this.customEncoderCallSerializer.call(()=>this.customEncoder.close()).catch(e=>this.setError(e)):this.encoder&&(this.encoder.state!==`closed`&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!==`closed`&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.splitter?.close())}e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.errorSet)throw this.error}},jb=null,Mb=class{constructor(){this.worker=null,this.pendingRequests=new Map,this.nextRequestId=0}split(e){if(!this.worker){if(!jb){let e=new Blob([`(${Nb.toString()})()`],{type:`application/javascript`});jb=URL.createObjectURL(e)}this.worker=new Worker(jb),this.worker.addEventListener(`message`,e=>{let t=e.data,n=this.pendingRequests.get(t.id);n&&(this.pendingRequests.delete(t.id),`error`in t?n.reject(Error(t.error)):n.resolve({colorFrame:t.colorFrame,alphaFrame:t.alphaFrame}))}),this.worker.addEventListener(`error`,e=>{let t=Error(e.message||`Color/alpha splitter worker error.`);for(let e of this.pendingRequests.values())e.reject(t);this.pendingRequests.clear()})}let t=this.nextRequestId++,n=xh();return this.pendingRequests.set(t,n),this.worker.postMessage({id:t,sourceFrame:e},{transfer:[e]}),n.promise}close(){this.worker?.terminate(),this.worker=null;let e=Error(`Color/alpha splitter closed.`);for(let t of this.pendingRequests.values())t.reject(e);this.pendingRequests.clear()}},Nb=()=>{let e=null,t=Promise.resolve();self.addEventListener(`message`,e=>{let{id:r,sourceFrame:i}=e.data;t=t.then(async()=>{try{let{colorFrame:e,alphaFrame:t}=await n(i);self.postMessage({id:r,colorFrame:e,alphaFrame:t},{transfer:[e,t]})}catch(e){self.postMessage({id:r,error:e.message})}finally{i.close()}})});let n=async t=>{let n=t.format;if(!n)throw Error(`CPU color/alpha splitting requires a known VideoFrame format.`);let a=t.allocationSize();if((!e||e.byteLength!==a)&&(e=new Uint8Array(a)),await t.copyTo(e),n===`RGBA`||n===`BGRA`)return r(e,n,t);if(n===`I420A`||n===`I420AP10`||n===`I420AP12`||n===`I422A`||n===`I422AP10`||n===`I422AP12`||n===`I444A`||n===`I444AP10`||n===`I444AP12`)return i(e,n,t);throw Error(`CPU color/alpha splitting does not support format '${n}'.`)},r=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=r*i,o=a+Math.ceil(r/2)*Math.ceil(i/2)*2,s=new Uint8Array(o);for(let t=0,n=3;t<a;t++,n+=4)s[t]=e[n];s.fill(128,a);let c=new VideoFrame(e,{format:t===`RGBA`?`RGBX`:`BGRX`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),l={format:`I420`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[s.buffer]};return{colorFrame:c,alphaFrame:new VideoFrame(s,l)}},i=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=t.includes(`P10`),o=t.includes(`P12`),s=a||o?2:1,c,l;t.startsWith(`I420`)?(c=Math.ceil(r/2),l=Math.ceil(i/2)):t.startsWith(`I422`)?(c=Math.ceil(r/2),l=i):(c=r,l=i);let u=r*i,d=c*l,f=u*s,p=d*s,m=u*s,h=f+p*2,g=t.replace(`A`,``),_=Math.ceil(r/2)*Math.ceil(i/2),v=m+_*s*2,y=new Uint8Array(v),b=h;y.set(e.subarray(b,b+m),0);let x=m,S=a?512:o?2048:128;s===1?y.fill(S,x):new Uint16Array(y.buffer,x,2*_).fill(S);let C=a?`I420P10`:o?`I420P12`:`I420`,ee=new VideoFrame(e.subarray(0,h),{format:g,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),te={format:C,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[y.buffer]};return{colorFrame:ee,alphaFrame:new VideoFrame(y,te)}}},Pb=class extends Ob{constructor(e,t){if(!(typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas))throw TypeError(`canvas must be an HTMLCanvasElement or OffscreenCanvas.`);ev(t),super(t.codec),this._encoder=new Ab(this,t),this._canvas=e}add(e,t=0,n){if(!Number.isFinite(e)||e<0)throw TypeError(`timestamp must be a non-negative number.`);if(!Number.isFinite(t)||t<0)throw TypeError(`duration must be a non-negative number.`);let r=new I_(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,n)}_flushAndClose(e){return this._encoder.flushAndClose(e)}},Fb=class extends Db{constructor(e){if(super(),this._connectedTrack=null,!pg.includes(e))throw TypeError(`Invalid audio codec '${e}'. Must be one of: ${pg.join(`, `)}.`);this._codec=e}},Ib=class extends Db{constructor(e){if(super(),this._connectedTrack=null,!mg.includes(e))throw TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${mg.join(`, `)}.`);this._codec=e}}})))()}var Rb,zb,Bb,Vb,Hb;function Ub(){return(Ub=t((()=>{Ig(),wb(),Rb=class{getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>ug.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>pg.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>mg.includes(e))}_codecUnsupportedHint(e){return``}_isFragmentedIsobmff(){return!1}},zb=class extends Rb{constructor(e={}){if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.fastStart!==void 0&&![!1,`in-memory`,`reserve`,`fragmented`].includes(e.fastStart))throw TypeError(`options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.`);if(e.minimumFragmentDuration!==void 0&&(!Number.isFinite(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw TypeError(`options.minimumFragmentDuration, when provided, must be a non-negative number.`);if(e.onFtyp!==void 0&&typeof e.onFtyp!=`function`)throw TypeError(`options.onFtyp, when provided, must be a function.`);if(e.onMoov!==void 0&&typeof e.onMoov!=`function`)throw TypeError(`options.onMoov, when provided, must be a function.`);if(e.onMdat!==void 0&&typeof e.onMdat!=`function`)throw TypeError(`options.onMdat, when provided, must be a function.`);if(e.onMoof!==void 0&&typeof e.onMoof!=`function`)throw TypeError(`options.onMoof, when provided, must be a function.`);if(e.metadataFormat!==void 0&&![`mdir`,`mdta`,`udta`,`auto`].includes(e.metadataFormat))throw TypeError(`options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.`);super(),this._options=e}getSupportedTrackCounts(){let e=2**32-1;return{video:{min:0,max:e},audio:{min:0,max:e},subtitle:{min:0,max:e},total:{min:0,max:e}}}get supportsVideoRotationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}_createMuxer(e){return new Cb(e,this)}_isFragmentedIsobmff(){return this._options.fastStart===`fragmented`}},Bb=class extends zb{constructor(e){super(e)}get _name(){return`MP4`}get fileExtension(){return`.mp4`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...ug,...fg,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...mg]}_codecUnsupportedHint(e){return new Hb().getSupportedCodecs().includes(e)?` Switching to MOV will grant support for this codec.`:``}},Vb=class extends zb{constructor(e){super(e)}get _name(){return`CMAF`}get fileExtension(){return`.m4s`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...ug,...fg,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...mg]}},Hb=class extends zb{constructor(e){super(e)}get _name(){return`MOV`}get fileExtension(){return`.mov`}get mimeType(){return`video/quicktime`}getSupportedCodecs(){return[...ug,...pg]}_codecUnsupportedHint(e){return new Bb().getSupportedCodecs().includes(e)?` Switching to MP4 will grant support for this codec.`:``}}})))()}var Wb,Gb,Kb,qb,Jb,Yb,Xb,Zb;function Qb(){return(Qb=t((()=>{Yh(),rg(),Ub(),Lb(),yb(),fb(),Qh(),S_(),Ig(),Wb=[`video`,`audio`,`subtitle`],Gb=class e{constructor(e,t,n,r,i){this.id=e,this.output=t,this.type=n,this.source=r,this.metadata=i}isVideoTrack(){return this.type===`video`}isAudioTrack(){return this.type===`audio`}isSubtitleTrack(){return this.type===`subtitle`}canBePairedWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrack.`);if(this===t)return!1;let n=Kh(this.metadata.group),r=Kh(t.metadata.group);for(let e of n)if(this.type!==t.type&&r.some(t=>e===t)||r.some(t=>e._pairedGroups.has(t)))return!0;return!1}},Kb=class extends Gb{constructor(e,t,n,r){super(e,t,`video`,n,r)}},qb=class extends Gb{constructor(e,t,n,r){super(e,t,`audio`,n,r)}},Jb=class extends Gb{constructor(e,t,n,r){super(e,t,`subtitle`,n,r)}},Yb=class e{constructor(){this._pairedGroups=new Set}pairWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrackGroup.`);if(this===t)throw TypeError(`Cannot pair a group with itself.`);this._pairedGroups.add(t),t._pairedGroups.add(this)}},Xb=e=>{if(!e||typeof e!=`object`)throw TypeError(`metadata must be an object.`);if(e.languageCode!==void 0&&!Ah(e.languageCode))throw TypeError(`metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.`);if(e.name!==void 0&&typeof e.name!=`string`)throw TypeError(`metadata.name, when provided, must be a string.`);if(e.disposition!==void 0&&ng(e.disposition),e.maximumPacketCount!==void 0&&(!Number.isInteger(e.maximumPacketCount)||e.maximumPacketCount<0))throw TypeError(`metadata.maximumPacketCount, when provided, must be a non-negative integer.`);if(e.group!==void 0&&!(e.group instanceof Yb)&&(!Array.isArray(e.group)||e.group.some(e=>!(e instanceof Yb))))throw TypeError(`metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.`)},Zb=class extends qh{get target(){let e=`Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.`;if(this._rootTargetPromise)throw TypeError(e);let t=this._getRootTarget();if(t instanceof Promise)throw TypeError(e);return t}constructor(e){if(super(),this.state=`pending`,this.defaultTrackGroup=new Yb,this.tracks=[],this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new yh,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(!(e.format instanceof Rb))throw TypeError(`options.format must be an OutputFormat.`);if(!(e.target instanceof pb||e.target instanceof vb))throw TypeError(`options.target must be a Target or a PathedTarget.`);if(e.target instanceof pb&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof pb)&&typeof e.initTarget!=`function`)throw Error(`options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof pb&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){U(this._target instanceof vb);let t=this._target.getTarget(e),n=e=>{if(!(e instanceof pb))throw TypeError(`getTarget must return a Target.`);return e};return t instanceof Promise?t.then(n):n(t)}async _getTarget(e){U(this._target instanceof vb);let t=await this._getTargetValidated(e);return this._emit(`target`,{target:t,request:e,isRoot:e.isRoot}),this.state===`canceled`?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on(`finalized`,()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(U(this._initTarget!==null),this._initTarget instanceof pb)return this._initTarget;let e=await this._initTarget();return this.state===`canceled`?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof pb)return this._emit(`target`,{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),n=t=>(this.state===`canceled`?t._close():this._rememberTarget(t),this._emit(`target`,{target:t,request:e,isRoot:!0}),this._rootTarget=t,t);return t instanceof Promise?this._rootTargetPromise=t.then(n):n(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),n=new db(t,typeof e==`boolean`?e:e(t));return n.start(),n})()}addVideoTrack(e,t={}){if(!(e instanceof Ob))throw TypeError(`source must be a VideoSource.`);if(Xb(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(!this.format.supportsVideoRotationMetadata&&t.rotation)throw Error(`${this.format._name} does not support video rotation metadata.`);if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);if(t.decoderConfig!==void 0&&Mg({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof x_))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new Kb(this.tracks.length+1,this,e,n))}addAudioTrack(e,t={}){if(!(e instanceof Fb))throw TypeError(`source must be an AudioSource.`);if(Xb(t),t.decoderConfig!==void 0&&Pg({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof x_))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new qb(this.tracks.length+1,this,e,n))}addSubtitleTrack(e,t={}){if(!(e instanceof Ib))throw TypeError(`source must be a SubtitleSource.`);Xb(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new Jb(this.tracks.length+1,this,e,n))}setMetadataTags(e){if(tg(e),this.state!==`pending`)throw Error(`Cannot set metadata tags after output has been started or canceled.`);this._metadataTags=e}_addTrack(e){if(this.state!==`pending`)throw Error(`Cannot add track after output has been started or canceled.`);if(e.source._connectedTrack)throw Error(`Source is already used for a track.`);let t=this.format.getSupportedTrackCounts(),n=this.tracks.reduce((t,n)=>t+ +(n.type===e.type),0),r=t[e.type].max;if(n===r)throw Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?``:`s`}.`);let i=t.total.max;if(this.tracks.length===i)throw Error(`${this.format._name} does not support more than ${i} tracks${i===1?``:`s`} in total.`);if(e.isVideoTrack()){let t=this.format.getSupportedVideoCodecs();if(t.length===0)throw Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let t=this.format.getSupportedAudioCodecs();if(t.length===0)throw Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let t=this.format.getSupportedSubtitleCodecs();if(t.length===0)throw Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}return this.tracks.push(e),e.source._connectedTrack=e,e}hasEnoughTracks(){let e=this.format.getSupportedTrackCounts();for(let t of Wb)if(this.tracks.reduce((e,n)=>e+ +(n.type===t),0)<e[t].min)return!1;let t=e.total.min;return!(this.tracks.length<t)}async start(){let e=this.format.getSupportedTrackCounts();for(let t of Wb){let n=this.tracks.reduce((e,n)=>e+ +(n.type===t),0),r=e[t].min;if(n<r)throw Error(r===e[t].max?`${this.format._name} requires exactly ${r} ${t} track${r===1?``:`s`}.`:`${this.format._name} requires at least ${r} ${t} track${r===1?``:`s`}.`)}let t=e.total.min;if(this.tracks.length<t)throw Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?``:`s`}.`:`${this.format._name} requires at least ${t} track${t===1?``:`s`}.`);if(this.state===`canceled`)throw Error(`Output has been canceled.`);return this._startPromise?(Zh._warn(`Output has already been started.`),this._startPromise):this._startPromise=(async()=>{this.state=`started`;let e=this._mutex.acquire();try{await this._muxer.start();let e=this.tracks.map(e=>e.source._start());await Promise.all(e)}finally{(await e)()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this._cancelPromise)return Zh._warn(`Output has already been canceled.`),this._cancelPromise;if(this.state===`finalizing`||this.state===`finalized`){this.state===`finalized`&&Zh._warn(`Output has already been finalized.`);return}return this._cancelPromise=(async()=>{this.state=`canceled`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!0));await Promise.all(e),await Promise.all([...this._unfinalizedTargets].map(e=>e._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state===`pending`)throw Error(`Cannot finalize before starting.`);if(this.state===`canceled`)throw Error(`Cannot finalize after canceling.`);return this._finalizePromise?(Zh._warn(`Output has already been finalized.`),this._finalizePromise):this._finalizePromise=(async()=>{this.state=`finalizing`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(e),await this._muxer.finalize(),this._rootWriterPromise){let e=await this._rootWriterPromise;e.finalized||(await e.flush(),await e.finalize())}this._onFinalize&&await this._onFinalize(),this.state=`finalized`}finally{await Promise.all([...this._unfinalizedTargets].map(e=>e._close().catch(()=>{}))),this._unfinalizedTargets.clear(),e()}})()}}})))()}var $b;function ex(){return(ex=t((()=>{Qb(),yb(),Ub(),Lb(),$b=class{_engine;_view;constructor(e,t){this._engine=e,this._view=t}async export(e,t){let{fps:n,duration:r,resolution:i,bitrate:a=8e6}=e,o=Math.ceil(r/60*n),s=this._engine.canvas,c=this._engine.renderer.resolution.clone();this._engine.setSize(i);let l=new gb,u=new Zb({format:new Bb,target:l}),d=new Pb(s,{codec:`avc`,bitrate:a,keyFrameInterval:2});u.addVideoTrack(d),await u.start();for(let e=0;e<o;e++)this._engine.updateOffline(e,n),this._engine.render(this._view),this._engine.renderer.present(this._view),await d.add(e/n,1/n),t&&t({current:e+1,total:o,phase:`encoding`}),e%10==0&&await new Promise(e=>setTimeout(e,0));return t&&t({current:o,total:o,phase:`finalizing`}),await u.finalize(),this._engine.setSize(c),t&&t({current:o,total:o,phase:`done`}),new Blob([l.buffer],{type:`video/mp4`})}static download(e,t=`scene.mp4`){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}}})))()}var tx;function nx(){return(nx=t((()=>{Gf(),M(),L(),Jf(),fp(),Tp(),Dp(),fm(),Am(),Nm(),Gm(),Ym(),$m(),th(),ih(),oh(),ex(),tx=class extends Sr{_engine;_selectedEntityId;_unselectableEntityIds;_selectedAsset;_navigateAsset;_propertyTarget;_audioBuffer;_frameLoop;_resolutionScale;_enableRender;_baseResolution;_viewType;_frameDebugger;_assetPreviewManager;_externalWindow;_externalCanvasBitmapContext;_modalStatus;_panelLayout;_disposed;_api;_draw;_view;_editorCamera;_gizmoManager;_helperManager;_gridRenderer;_constraintAxisRenderer;_wireframeRenderer;_selectionOutline;_pointerHandler;_keyboardHandler;_modalTransformHandler;_sceneExporter;_isExporting;_exportProgress;constructor(e){super(),this._engine=e,this._viewType=`render`,this._selectedEntityId=null,this._unselectableEntityIds=new Set,this._selectedAsset=null,this._navigateAsset=null,this._propertyTarget=`entity`,this._resolutionScale=1,this._enableRender=!0,this._baseResolution=new A(1920,1080),this._externalWindow=null,this._externalCanvasBitmapContext=null,this._modalStatus=null,this._panelLayout=null,this._disposed=!1,this._api=new dp(this),this._draw=Lf(e),this._view=e.createView(),this._assetPreviewManager=new qf(this._draw),this._sceneExporter=new $b(e,this._view),this._isExporting=!1,this._exportProgress=null,this._editorCamera=new wp(e,this._view),this._gizmoManager=new dm(e,this._draw),this._helperManager=new km(e,this._draw),this._gridRenderer=new eh(e,this._draw),this._constraintAxisRenderer=new Qm(e,this._draw),this._wireframeRenderer=new ah(this._draw),this._selectionOutline=new rh(this._draw),this._pointerHandler=new Jm(e,this._editorCamera,this._gizmoManager,this._helperManager,this._api,()=>this._selectedEntityId,e=>!this._unselectableEntityIds.has(e.uuid),()=>this._gizmoManager.mode,e=>this.selectEntity(e),()=>this._modalTransformHandler.active,()=>{this._editorCamera.preview&&this.setField(`preview`,!1),this.setField(`cameraView`,`editor`)}),this._modalTransformHandler=new Wm({engine:e,editorCamera:this._editorCamera,api:this._api,getSelectedEntity:()=>this._selectedEntityId?e.root.findEntityByUUID(this._selectedEntityId)??null:null,isPointerBusy:()=>this._pointerHandler.gizmoDragging,onStatusChange:e=>{this._modalStatus!==e&&(this._modalStatus=e,this.noticeField(`modalStatus`))}}),this._keyboardHandler=new Mm({onSave:()=>this.save(),onUndo:()=>this._api.undo(),onRedo:()=>this._api.redo(),onPlayToggle:()=>{this._engine.frame.playing?this._engine.stop():this._engine.play()},onCameraViewToggle:()=>{this._editorCamera.preview?(this.setField(`preview`,!1),this.setField(`cameraView`,`editor`)):this.setField(`cameraView`,this._editorCamera.view===`editor`?`camera`:`editor`)},onPreviewToggle:()=>{this.setField(`preview`,!this._editorCamera.preview)},onSyncToSceneCamera:()=>this.syncToSceneCamera(),onFocusSelected:()=>this.focusSelected(),onTransformKey:e=>!this._editorCamera.preview&&this._modalTransformHandler.handleKeyDown(e)}),this._frameDebugger=new Ep(e.canvas,this._draw,this._view),this._audioBuffer=null,this._engine.on(`update/music`,e=>{this._audioBuffer=e}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on(`update/blidge/frame`,e=>{this._engine.seek(e.current),e.playing&&!this._engine.frame.playing?this._engine.play():!e.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field(`enableRender`,()=>this._enableRender,e=>this._enableRender=e),this.field(`resolutionScale`,()=>this._resolutionScale,e=>{this._resolutionScale=Number(e),this._resize()});let t=this.fieldDir(`resolution`);t.field(`width`,()=>this._baseResolution.x,e=>{this._baseResolution.x=e,this._resize()},{step:1}),t.field(`height`,()=>this._baseResolution.y,e=>{this._baseResolution.y=e,this._resize()},{step:1}),this.field(`viewType`,()=>this._viewType,e=>{this._viewType=e,this._frameDebugger.enable=this._viewType===`debug`});let n=this.fieldDir(`frameLoop`);n.field(`enabled`,()=>this._frameLoop.enabled,e=>this._frameLoop.enabled=e),n.field(`start`,()=>this._frameLoop.start,e=>this._frameLoop.start=e),n.field(`end`,()=>this._frameLoop.end,e=>this._frameLoop.end=e),this.field(`selectedEntityId`,()=>this._selectedEntityId,e=>{this._selectedEntityId=e,e&&(this._propertyTarget=`entity`,this.noticeField(`propertyTarget`))}),this.field(`unselectableEntityIds`,()=>Array.from(this._unselectableEntityIds),e=>{this._unselectableEntityIds=new Set(e)},{hidden:!0}),this.field(`selectedAsset`,()=>this._selectedAsset,e=>{this._selectedAsset=e,e&&(this._propertyTarget=`asset`,this.noticeField(`propertyTarget`))}),this.field(`navigateAsset`,()=>this._navigateAsset,e=>{this._navigateAsset=e}),this.field(`propertyTarget`,()=>this._propertyTarget,e=>{this._propertyTarget=e}),this.field(`cameraView`,()=>this._editorCamera.view,t=>{this._editorCamera.setView(t,e)}),this.field(`preview`,()=>this._editorCamera.preview,t=>{this._editorCamera.setPreview(t,e)}),this.field(`gizmoMode`,()=>this._gizmoManager.mode,e=>{this._gizmoManager.setMode(e)}),this.field(`transformOrientation`,()=>this._gizmoManager.orientation,e=>{this._gizmoManager.setOrientation(e)}),this.field(`modalStatus`,()=>this._modalStatus,{noExport:!0}),this.field(`panelLayout`,()=>this._panelLayout,e=>this._panelLayout=e,{hidden:!0});let r=this.fieldDir(`helpers`);r.field(`show`,()=>this._helperManager.showHelpers,e=>this._helperManager.showHelpers=e),r.field(`grid`,()=>this._gridRenderer.showGrid,e=>this._gridRenderer.showGrid=e),r.field(`empty`,()=>this._helperManager.showEmptyHelpers,e=>this._helperManager.showEmptyHelpers=e),r.field(`camera`,()=>this._helperManager.showCameraHelpers,e=>this._helperManager.showCameraHelpers=e),r.field(`light`,()=>this._helperManager.showLightHelpers,e=>this._helperManager.showLightHelpers=e),r.field(`wireframe`,()=>this._wireframeRenderer.showWireframe,e=>this._wireframeRenderer.showWireframe=e),r.field(`gizmo`,()=>this._gizmoManager.showGizmo,e=>this._gizmoManager.showGizmo=e),r.field(`outline`,()=>this._selectionOutline.showOutline,e=>this._selectionOutline.showOutline=e);let i=this.fieldDir(`camera`);i.field(`position`,()=>{let e=this._editorCamera.orbitControls.eye;return[e.x,e.y,e.z]},e=>{let t=this._editorCamera.orbitControls.target;this._editorCamera.orbitControls.setPosition(new A(e[0],e[1],e[2]),new A(t.x,t.y,t.z))}),i.field(`target`,()=>{let e=this._editorCamera.orbitControls.target;return[e.x,e.y,e.z]},e=>{let t=this._editorCamera.orbitControls.eye;this._editorCamera.orbitControls.setPosition(new A(t.x,t.y,t.z),new A(e[0],e[1],e[2]))}),this._animate()}bootstrap(e){e&&this.deserialize(e),this._resize()}get engine(){return this._engine}get api(){return this._api}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}get editorCamera(){return this._editorCamera}get assetPreviewManager(){return this._assetPreviewManager}_animate(){if(!this._disposed){if(!this._isExporting){this._editorCamera.updateBeforeRender(this._engine),this._engine.update(),this._enableRender&&this._engine.render(this._view);let e=this._editorCamera.getCameraEntity(this._engine),t=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null,n=this._editorCamera.preview,r=this._view;if(n||(this._gridRenderer.render(r,e,this._engine),this._helperManager.render(r,e,this._engine,this._selectedEntityId),this._wireframeRenderer.render(r,e,this._engine)),this._gizmoManager.render(r,n||this._modalTransformHandler.active?null:t,e,this._engine),n||(this._constraintAxisRenderer.render(r,this._modalTransformHandler.constraintDisplay,e,this._engine),this._selectionOutline.render(r,t,e)),this._frameDebugger.enable&&this._frameDebugger.draw(),this._engine.renderer.present(r),this._externalCanvasBitmapContext){let e=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(t=>{e.transferFromImageBitmap(t)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start))}window.requestAnimationFrame(this._animate.bind(this))}}get isExporting(){return this._isExporting}get exportProgress(){return this._exportProgress}async exportMP4(){if(this._isExporting)return;this._isExporting=!0,this._exportProgress=null,this.emit(`update/export`);let e=this._engine.frame.playing;this._engine.stop();let t=this._view,n=t.camera,r=t.pipelineOverride;t.camera=null,t.pipelineOverride=null;try{let e=await this._sceneExporter.export({fps:this._engine.frameSetting.fps,duration:this._engine.frameSetting.duration,resolution:this._baseResolution.clone()},e=>{this._exportProgress=e,this.emit(`update/export`)});$b.download(e)}catch(e){console.error(`Export failed:`,e)}t.camera=n,t.pipelineOverride=r,this._isExporting=!1,this._exportProgress=null,this.emit(`update/export`),e&&this._engine.play()}selectEntity(e){this.setField(`selectedEntityId`,e?e.uuid:null)}syncToSceneCamera(){this._editorCamera.preview&&this.setField(`preview`,!1),this.setField(`cameraView`,`editor`),this._editorCamera.syncFromSceneCamera(this._engine)}focusSelected(){if(this._editorCamera.preview)return;let e=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null;e&&(this.setField(`cameraView`,`editor`),this._editorCamera.focus(e))}createEntity(e,t){let n=this._engine.createEntity({name:t});return n.initiator=`user`,e.add(n),n}deleteEntity(e){e.disposeRecursive();let t=e.parent;t&&t.remove(e)}save(){this.emit(`save`,[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:`export`})}exportEngine(){return this._engine.serialize({mode:`export`})}openInExternalWindow(){if(this._externalWindow=window.open(``,`_blank`),!this._externalWindow)return;let e=this._externalWindow.document.createElement(`canvas`);e.style.width=`100%`,e.style.height=`100%`,e.style.objectFit=`contain`,e.style.cursor=`none`,this._externalWindow.document.body.style.margin=`0`,this._externalWindow.document.body.style.background=`#000`,this._externalWindow.document.body.appendChild(e),this._externalCanvasBitmapContext=e.getContext(`bitmaprenderer`),this._externalWindow.addEventListener(`unload`,()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}_resize(){let e=this._baseResolution.clone().multiply(this._resolutionScale);this.engine.setSize(e),this._draw.resize(e),this._frameDebugger.resize(e),this._editorCamera.resize(e),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=e.x,this._externalCanvasBitmapContext.canvas.height=e.y)}dispose(){this._disposed=!0,this._api.dispose(),this._editorCamera.dispose(),this._pointerHandler.dispose(),this._keyboardHandler.dispose(),this._modalTransformHandler.dispose(),this._frameDebugger.dispose(),this._assetPreviewManager.dispose(),this._view.dispose()}}})))()}var rx,ix;function ax(){return(ax=t((()=>{rx=e(i(),1),nx(),$o(),ix=e=>{let{engine:t}=Qo(),[n,r]=(0,rx.useState)(()=>new tx(t)),i=rx.useRef(n);return i.current=n,(0,rx.useEffect)(()=>{if(!i.current.disposed&&i.current.engine.uuid==t.uuid)return;let e=new tx(t);r(e)},[t]),(0,rx.useEffect)(()=>()=>{n.dispose()},[n]),{engine:t,editor:n,projectName:e}}})))()}var ox,sx,cx;function lx(){return(lx=t((()=>{ox=i(),ut(),ax(),sx=s(),cx=e=>{let t=ix(e.projectName);return(0,ox.useEffect)(()=>{if(!(!t.editor||!e.onSave))return t.editor.on(`save`,e.onSave),()=>{t.editor.off(`save`,e.onSave)}},[t.editor,e.onSave]),(0,ox.useEffect)(()=>{t.editor&&t.editor.bootstrap(e.editorData)},[e.editorData,t.editor]),(0,sx.jsx)(lt.Provider,{value:t,children:e.children})},cx.__docgenInfo={description:``,methods:[],displayName:`OREditorProvider`}})))()}var $,ux,dx,fx,px;function mx(){return(mx=t((()=>{i(),Te(),w(),oe(),ce(),ke(),Kt(),qo(),Ds(),gc(),Ac(),Ic(),Kc(),$c(),Ml(),Wl(),Zl(),Gu(),rd(),Af(),Nf(),lx(),$=s(),ux=e=>e?e.map(e=>(0,$.jsx)(le.Tab,{title:e.title,children:(0,$.jsx)(se,{children:e.content})},e.title)):null,dx=e=>e?.find(e=>e.default)?.title,fx=[{id:`scene`,title:`Scene`,content:(0,$.jsx)(se,{children:(0,$.jsx)(hc,{})})},{id:`timer`,title:`Timer`,content:(0,$.jsx)(se,{noPadding:!0,children:(0,$.jsx)(Es,{})})},{id:`screen`,title:`Screen`,content:(0,$.jsx)(Wu,{}),unique:!0},{id:`property`,title:`Property`,content:(0,$.jsx)(se,{children:(0,$.jsx)(Ko,{})})},{id:`textures`,title:`Textures`,content:(0,$.jsx)(se,{noPadding:!0,children:(0,$.jsx)(nd,{})})},{id:`project`,title:`Project`,content:(0,$.jsx)(se,{children:(0,$.jsx)(Ul,{})})},{id:`renderer`,title:`Renderer`,content:(0,$.jsx)(se,{children:(0,$.jsx)(Xl,{})})},{id:`editor-settings`,title:`Editor`,content:(0,$.jsx)(se,{children:(0,$.jsx)(Gt,{})})},{id:`timeline`,title:`Timeline`,content:(0,$.jsx)(se,{noPadding:!0,children:(0,$.jsx)(kf,{})})}],px=e=>{let t=Oe(),n=null;return n=t.isPC?(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(jl,{panels:fx,customTabs:e.customTabs}),(0,$.jsx)(Gc,{})]}):(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(ae,{direction:`vertical`,storageKey:`orengine-editor-sp-main`,children:[(0,$.jsx)(ae.Item,{size:`calc( min( 56.25vw, 55vh ) + 77px )`,minSize:200,style:{minHeight:`200px`},children:(0,$.jsx)(Wu,{})}),(0,$.jsx)(ae.Item,{flex:1,minSize:200,children:(0,$.jsxs)(le,{storageKey:`orengine-panel-sp-main`,defaultTabTitle:dx(e.customTabs?.mainBottom)??dx(e.customTabs?.leftTop)??dx(e.customTabs?.leftBottom)??dx(e.customTabs?.rightTop)??dx(e.customTabs?.footer),children:[(0,$.jsx)(le.Tab,{title:`Scene / Property`,children:(0,$.jsxs)(ae,{direction:`horizontal`,storageKey:`orengine-editor-sp-sceneProp`,children:[(0,$.jsx)(ae.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,$.jsx)(hc,{})}),(0,$.jsx)(ae.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,$.jsx)(Ko,{})})]})}),(0,$.jsx)(le.Tab,{title:`Textures`,children:(0,$.jsx)(se,{noPadding:!0,children:(0,$.jsx)(nd,{})})}),(0,$.jsx)(le.Tab,{title:`Project`,children:(0,$.jsx)(se,{children:(0,$.jsx)(Ul,{})})}),(0,$.jsx)(le.Tab,{title:`Renderer`,children:(0,$.jsx)(se,{children:(0,$.jsx)(Xl,{})})}),(0,$.jsx)(le.Tab,{title:`Editor`,children:(0,$.jsx)(se,{children:(0,$.jsx)(Gt,{})})}),ux(e.customTabs?.leftTop),ux(e.customTabs?.leftBottom),ux(e.customTabs?.mainBottom),ux(e.customTabs?.rightTop),ux(e.customTabs?.footer)]})}),(0,$.jsx)(ae.Item,{size:`120px`,minSize:80,children:(0,$.jsx)(le,{storageKey:`orengine-panel-sp-timeline`,children:(0,$.jsx)(le.Tab,{title:`Timeline`,children:(0,$.jsx)(se,{noPadding:!0,children:(0,$.jsx)(we,{fallback:(0,$.jsx)(`div`,{children:`エラーだよ`}),children:(0,$.jsx)(kf,{})})})})})})]}),(0,$.jsx)(Gc,{})]}),(0,$.jsx)(cx,{projectName:e.projectName,onSave:e.onSave,editorData:e.editorData,children:(0,$.jsx)(Qc,{children:(0,$.jsxs)(Fc,{children:[(0,$.jsx)(`div`,{className:Mf.editor,children:n}),(0,$.jsx)(kc,{})]})})})},px.__docgenInfo={description:``,methods:[],displayName:`OREditor`,props:{onSave:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => void`,signature:{arguments:[{type:{name:`OREngineProjectData`},name:`projectData`},{type:{name:`MXP.SerializeField`},name:`editorData`}],return:{name:`void`}}},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},projectName:{required:!1,tsType:{name:`string`},description:``},customTabs:{required:!1,tsType:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`union`,raw:`"leftTop" | "leftBottom" | "mainBottom" | "rightTop" | "footer"`,elements:[{name:`literal`,value:`"leftTop"`},{name:`literal`,value:`"leftBottom"`},{name:`literal`,value:`"mainBottom"`},{name:`literal`,value:`"rightTop"`},{name:`literal`,value:`"footer"`}]},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	title: string;
	content: React.ReactNode;
	default?: boolean;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`content`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}},{key:`default`,value:{name:`boolean`,required:!1}}]}}],raw:`CustomTab[]`}],raw:`Record<PanelSlot, CustomTab[]>`}],raw:`Partial<Record<PanelSlot, CustomTab[]>>`},description:``}}}})))()}var hx,gx;function _x(){return(_x=t((()=>{hx=e(i(),1),Gf(),Ja(),gx=()=>{let[e,t]=hx.useState(()=>new qa(Uf)),n=hx.useRef(e);return n.current=e,(0,hx.useEffect)(()=>{n.current.disposed&&t(new qa(Uf))},[]),(0,hx.useEffect)(()=>()=>{e.dispose()},[e]),{engine:e,load:(0,hx.useCallback)(t=>{t&&e.load(t)},[e])}}})))()}var vx,yx,bx;function xx(){return(xx=t((()=>{vx=i(),Xo(),_x(),yx=s(),bx=e=>{let t=gx(),{engine:n}=t,r=(0,vx.useRef)(e.onEngineInit);return r.current=e.onEngineInit,(0,vx.useEffect)(()=>{r.current?.(n)},[n]),(0,vx.useEffect)(()=>{e.project?n.load(e.project):n.init()},[n,e.project]),(0,yx.jsx)(Yo.Provider,{value:t,children:e.children})},bx.__docgenInfo={description:``,methods:[],displayName:`OREngineProvider`}})))()}var Sx,Cx,wx;function Tx(){return(Tx=t((()=>{Sx=i(),mx(),xx(),Cx=s(),wx=e=>{let t=e.projectName??`DefaultProject`,[n,r]=(0,Sx.useState)(e.sceneData),[i,a]=(0,Sx.useState)(e.editorData);return(0,Sx.useEffect)(()=>{e.sceneData||fetch(`/api/projects/${t}/scene`).then(e=>e.json()).then(e=>{e&&r(e)}).catch(()=>{})},[e.sceneData,t]),(0,Sx.useEffect)(()=>{e.editorData||fetch(`/api/projects/${t}/editor`).then(e=>e.json()).then(e=>{e&&a(e)}).catch(()=>{})},[e.editorData,t]),(0,Cx.jsx)(bx,{project:n,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,Cx.jsx)(px,{editorData:i,projectName:t,customTabs:e.customTabs,onSave:(n,r)=>{e.onBeforeSave?.(),fetch(`/api/projects/${t}/scene`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)}),fetch(`/api/projects/${t}/editor`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(r)})}})})},wx.__docgenInfo={description:``,methods:[],displayName:`EditorPage`,props:{projectName:{required:!1,tsType:{name:`string`},description:``},sceneData:{required:!1,tsType:{name:`OREngineProjectData`},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},initResourceInstances:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( engine: Engine ) => void`,signature:{arguments:[{type:{name:`Engine`},name:`engine`}],return:{name:`void`}}},description:``},customTabs:{required:!1,tsType:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`union`,raw:`"leftTop" | "leftBottom" | "mainBottom" | "rightTop" | "footer"`,elements:[{name:`literal`,value:`"leftTop"`},{name:`literal`,value:`"leftBottom"`},{name:`literal`,value:`"mainBottom"`},{name:`literal`,value:`"rightTop"`},{name:`literal`,value:`"footer"`}]},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	title: string;
	content: React.ReactNode;
	default?: boolean;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`content`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}},{key:`default`,value:{name:`boolean`,required:!1}}]}}],raw:`CustomTab[]`}],raw:`Record<PanelSlot, CustomTab[]>`}],raw:`Partial<Record<PanelSlot, CustomTab[]>>`},description:``},onBeforeSave:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var Ex,Dx;function Ox(){return(Ox=t((()=>{mx(),xx(),Ex=s(),Dx=e=>(0,Ex.jsx)(bx,{project:e.sceneData,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,Ex.jsx)(px,{editorData:e.editorData,projectName:e.projectName??`Static`,customTabs:e.customTabs,onSave:()=>{}})}),Dx.__docgenInfo={description:``,methods:[],displayName:`EditorPageStatic`,props:{projectName:{required:!1,tsType:{name:`string`},description:``},sceneData:{required:!0,tsType:{name:`OREngineProjectData`},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},initResourceInstances:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( engine: Engine ) => void`,signature:{arguments:[{type:{name:`Engine`},name:`engine`}],return:{name:`void`}}},description:``},customTabs:{required:!1,tsType:{name:`Partial`,elements:[{name:`Record`,elements:[{name:`union`,raw:`"leftTop" | "leftBottom" | "mainBottom" | "rightTop" | "footer"`,elements:[{name:`literal`,value:`"leftTop"`},{name:`literal`,value:`"leftBottom"`},{name:`literal`,value:`"mainBottom"`},{name:`literal`,value:`"rightTop"`},{name:`literal`,value:`"footer"`}]},{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	title: string;
	content: React.ReactNode;
	default?: boolean;
}`,signature:{properties:[{key:`title`,value:{name:`string`,required:!0}},{key:`content`,value:{name:`ReactReactNode`,raw:`React.ReactNode`,required:!0}},{key:`default`,value:{name:`boolean`,required:!1}}]}}],raw:`CustomTab[]`}],raw:`Record<PanelSlot, CustomTab[]>`}],raw:`Partial<Record<PanelSlot, CustomTab[]>>`},description:``}}}})))()}function kx(){return(kx=t((()=>{te(),re(),qe(),fe(),et()})))()}function Ax(){return(Ax=t((()=>{Tx(),Ox(),mx(),lx(),D(),xx(),$o(),gc(),qo(),Gu(),pu(),bu(),Af(),ld(),Wl(),Ds(),Zl(),Kt(),zt(),rd(),wn(),iu(),At(),un(),Gs(),ht(),yt(),Ot(),Tn(),Qt(),rn(),Kc(),$c(),Ls(),oo(),po(),Ac(),Ic(),Fe(),ke(),ze(),Me(),c(),u(),x(),kx(),ue(),w(),oe(),ce(),st()})))()}export{$r as $,Ke as $t,Ws as A,Dn as At,Ja as B,At as Bt,Kc as C,Mn as Ct,Ac as D,On as Dt,kc as E,jn as Et,qo as F,ln as Ft,Aa as G,mt as Gt,Ma as H,Ot as Ht,oo as I,un as It,si as J,E as Jt,mi as K,ht as Kt,ao as L,Gt as Lt,Is as M,En as Mt,Ls as N,Cn as Nt,hc as O,kn as Ot,Ko as P,wn as Pt,Qr as Q,et as Qt,eo as R,Kt as Rt,Gc as S,M as St,Ic as T,An as Tt,Na as U,vt as Ut,L as V,Dt as Vt,ka as W,yt as Wt,ti as X,st as Xt,ci as Y,ot as Yt,ni as Z,$e as Zt,Zl as _,Dr as _t,mx as a,Vr as at,Qc as b,br as bt,gp as c,Pr as ct,pp as d,Nr as dt,qe as en,Wr as et,hp as f,Ar as ft,Xl as g,Er as gt,Af as h,kr as ht,px as i,Br as it,Gs as j,A as jt,gc as k,j as kt,vp as l,Fr as lt,kf as m,Or as mt,bx as n,Pe as nn,F as nt,cx as o,Ir as ot,Gf as p,jr as pt,hi as q,D as qt,xx as r,Ur as rt,lx as s,Lr as st,Ax as t,Fe as tn,Gr as tt,mp as u,Mr as ut,Ul as v,wr as vt,Fc as w,Nn as wt,$c as x,xr as xt,Wl as y,Tr as yt,qa as z,O as zt};