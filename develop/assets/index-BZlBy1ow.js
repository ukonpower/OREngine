var Rn=Object.defineProperty;var An=(s,n,e)=>n in s?Rn(s,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[n]=e;var c=(s,n,e)=>An(s,typeof n!="symbol"?n+"":n,e);import{j as m,R as Le,r as v,_ as Cn}from"./index-BVIdByQj.js";const Pn="_arrow_1rhr5_45",Sn={arrow:Pn},bt=({open:s})=>m.jsxDEV("div",{className:Sn.arrow,"data-open":s,children:m.jsxDEV("svg",{width:"10",height:"10",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[m.jsxDEV("g",{clipPath:"url(#clip0_57_2)",children:m.jsxDEV("path",{d:"M18 10L3 18.6603L3 1.33974L18 10Z",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:8,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),m.jsxDEV("defs",{children:m.jsxDEV("clipPath",{id:"clip0_57_2",children:m.jsxDEV("rect",{width:"20",height:"20",fill:"white"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:12,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:11,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:10,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),kn="_block_1l63f_45",Tn="_head_1l63f_58",On="_head_icon_1l63f_63",Mn="_head_text_1l63f_72",Dn="_content_1l63f_79",Me={block:kn,head:Tn,head_icon:On,head_text:Mn,content:Dn},Ce=s=>{const[n,e]=Le.useState(!s.defaultClose),t=v.useCallback(()=>{s.accordion===!0&&e(!n)},[n,s.accordion]),r=s.bg&&typeof s.bg=="string"&&s.bg||void 0;return m.jsxDEV("div",{className:Me.block,"data-bg":s.bg!==void 0,"data-nomargin":s.noMargin,"data-no_indent":s.noIndent,style:{backgroundColor:r},children:[m.jsxDEV("div",{className:Me.head,"data-accordion":s.accordion,"data-open":n,children:[s.accordion&&m.jsxDEV("div",{className:Me.head_icon,onClick:t,children:m.jsxDEV(bt,{open:n},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:33,columnNumber:75},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:33,columnNumber:24},void 0),s.label&&m.jsxDEV("span",{className:Me.head_text,children:s.label},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:34,columnNumber:20},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:32,columnNumber:3},void 0),n&&m.jsxDEV("div",{className:Me.content,"data-open":n,"data-no_indent":s.noIndent,children:s.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:36,columnNumber:13},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:31,columnNumber:9},void 0)},In="_button_fci8n_45",zn={button:In},Pe=s=>m.jsxDEV("button",{className:zn.button,onClick:n=>{s.onClick&&s.onClick(n),n.preventDefault()},type:s.type||"button",children:s.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Button/index.tsx",lineNumber:11,columnNumber:9},void 0),Bn=v.createContext(null),lt={didCatch:!1,error:null};class Fn extends v.Component{constructor(n){super(n),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=lt}static getDerivedStateFromError(n){return{didCatch:!0,error:n}}resetErrorBoundary(){const{error:n}=this.state;if(n!==null){for(var e,t,r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];(e=(t=this.props).onReset)===null||e===void 0||e.call(t,{args:i,reason:"imperative-api"}),this.setState(lt)}}componentDidCatch(n,e){var t,r;(t=(r=this.props).onError)===null||t===void 0||t.call(r,n,e)}componentDidUpdate(n,e){const{didCatch:t}=this.state,{resetKeys:r}=this.props;if(t&&e.error!==null&&Vn(n.resetKeys,r)){var i,o;(i=(o=this.props).onReset)===null||i===void 0||i.call(o,{next:r,prev:n.resetKeys,reason:"keys"}),this.setState(lt)}}render(){const{children:n,fallbackRender:e,FallbackComponent:t,fallback:r}=this.props,{didCatch:i,error:o}=this.state;let u=n;if(i){const a={error:o,resetErrorBoundary:this.resetErrorBoundary};if(typeof e=="function")u=e(a);else if(t)u=v.createElement(t,a);else if(r!==void 0)u=r;else throw console.error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop"),o}return v.createElement(Bn.Provider,{value:{didCatch:i,error:o,resetErrorBoundary:this.resetErrorBoundary}},u)}}function Vn(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return s.length!==n.length||s.some((e,t)=>!Object.is(e,n[t]))}const ct=900,Ln=()=>{const[s,n]=v.useState(!1);return v.useEffect(()=>{let e=null;const t=()=>{const r=window.innerWidth;(e===null||(r-ct)*(e-ct)<=0)&&n(r<=ct),e=r};return t(),window.addEventListener("resize",t),()=>{window.removeEventListener("resize",t)}},[]),{isPC:!s,isSP:s}},Un="_mouseMenu_11xi2_1",jn="_hide_11xi2_10",Gn="_menuItem_11xi2_19",Hn="_menuItem_inner_11xi2_23",Xn="_menuItem_inner_inner_11xi2_26",De={mouseMenu:Un,hide:jn,menuItem:Gn,menuItem_inner:Hn,menuItem_inner_inner:Xn},qt=v.createContext(void 0),Qt=v.createContext(null),wt=()=>{const s=v.useContext(Qt);if(s===null)throw new Error("useMouseMenu must be used within a MouseMenuProvider");return s},kt=()=>{const{itemList:s,containerRef:n,closeAll:e}=wt();return m.jsxDEV("div",{className:De.mouseMenu,ref:n,children:[s&&s.length>0&&m.jsxDEV("div",{className:De.hide,onClick:()=>{e&&e()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:14,columnNumber:40},void 0),s&&s.map((t,r)=>{const i=t.pos;return m.jsxDEV(qt.Provider,{value:t,children:m.jsxDEV("div",{className:De.menuItem,style:{left:0,top:0,transform:`translate(${i.x}px, ${i.y}px)`},children:m.jsxDEV("div",{className:De.menuItem_inner,children:m.jsxDEV("div",{className:De.menuItem_inner_inner,"data-direction":t.direction,children:t.elm},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:29,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:28,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:27,columnNumber:7},void 0)},t.id,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:26,columnNumber:13},void 0)})]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:13,columnNumber:3},void 0)};let Wn=0;const Zn=()=>{const s=v.useRef(null),n=v.useRef({x:0,y:0}),e=v.useCallback(l=>{n.current.x=l.clientX,n.current.y=l.clientY},[]);v.useEffect(()=>(window.addEventListener("pointermove",e),()=>{window.removeEventListener("pointermove",e)}),[e]);const[t,r]=v.useState([]),i=v.useRef(t);i.current=t;const o=v.useCallback(l=>{i.current=i.current.filter(h=>h.id!==l),r(i.current)},[]),u=v.useCallback(()=>{r([])},[]),a=v.useCallback(l=>{const h=Wn++,p={x:n.current.x,y:n.current.y},f=(p.x<window.innerWidth/2?"right":"left")+"-"+(p.y<window.innerHeight/2?"bottom":"top"),d={id:h,elm:l,pos:p,direction:f,close:()=>o(h)};return r([...i.current,d]),d},[o]);return{itemList:t,pushContent:a,closeAll:u,containerRef:s}},Yn="_panel_vqys8_45",Jn="_panel_inner_vqys8_51",Kn="_content_vqys8_59",ut={panel:Yn,panel_inner:Jn,content:Kn},re=s=>m.jsxDEV("div",{className:ut.panel,style:{backgroundColor:s.bgColor},children:m.jsxDEV("div",{className:ut.panel_inner,children:m.jsxDEV("div",{className:ut.content,style:{padding:s.noPadding?"0 0":void 0},children:s.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:17,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:16,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:15,columnNumber:9},void 0),qn="_panelContainer_xa08o_45",Qn="_header_xa08o_54",$n="_header_item_xa08o_60",er="_content_xa08o_75",Ue={panelContainer:qn,header:Qn,header_item:$n,content:er},xe=s=>{const[n,e]=v.useState(0);let t=s.children||[];return t=Array.isArray(t)?t:[t],m.jsxDEV("div",{className:Ue.panelContainer,children:[m.jsxDEV("div",{className:Ue.header,children:t.map((r,i)=>m.jsxDEV("div",{className:Ue.header_item,onClick:()=>e(i),"data-active":i==n,children:m.jsxDEV("p",{children:r.props.title},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:25,columnNumber:6},void 0)},i,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:24,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:21,columnNumber:3},void 0),m.jsxDEV("div",{className:Ue.content,children:t[n]},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:32,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:20,columnNumber:9},void 0)},$t=v.createContext(null),Ee=()=>{const s=v.useContext($t);if(s===null)throw new Error("useEditor must be used within a EditorProvider");return s},_t=(s,n)=>{const[e,t]=v.useState(()=>s?s.serialize():{}),r=n?[...n]:[],i=v.useMemo(()=>r,r);return v.useEffect(()=>{if(s===void 0)return;t(s.serialize());const o=u=>{let a=i.length==0;for(let l=0;l<i.length;l++)if(u.find(h=>h==i[l])){a=!0;break}a&&t(s.serialize())};return s.on("fields/update",o),()=>{s.off("fields/update",o)}},[s,i]),{fields:e}},W=(s,n)=>{const e=i=>{s==null||s.setField(n,i)},{fields:t}=_t(s,[n]);return[t&&t[n],e]},en=v.createContext(void 0),tr=s=>(_t(s.target),{target:s.target}),nr=()=>{const s=v.useContext(en);if(!s)throw new Error("SerializeFieldViewContext is not defined");return s},rr="_container_1xcsu_45",ir="_label_1xcsu_55",sr="_item_1xcsu_62",mt={container:rr,label:ir,item:sr},le=s=>m.jsxDEV("div",{className:mt.container,"data-vertical":s.vertical,children:[m.jsxDEV("div",{className:mt.label,style:{textAlign:s.labelAlign||"left"},"data-vertical":s.vertical,children:s.title},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:12,columnNumber:4},void 0),m.jsxDEV("div",{className:mt.item,"data-vertical":s.vertical,children:s.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:13,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:11,columnNumber:3},void 0),or=()=>m.jsxDEV("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[m.jsxDEV("rect",{x:"2",y:"10.8486",width:"2.61726",height:"7.84447",transform:"rotate(-44.9331 2 10.8486)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:5,columnNumber:3},void 0),m.jsxDEV("rect",{x:"9.38757",y:"14.5518",width:"2.57272",height:"12.3494",transform:"rotate(-135 9.38757 14.5518)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:6,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:4,columnNumber:9},void 0),ar="_inputBoolean_1xgaw_45",lr="_input_1xgaw_45",cr="_check_1xgaw_60",ht={inputBoolean:ar,input:lr,check:cr},tn=({onChange:s,...n})=>m.jsxDEV("div",{className:ht.inputBoolean,onClick:e=>{e.stopPropagation()},children:m.jsxDEV("label",{children:[m.jsxDEV("input",{className:ht.input,type:"checkbox",checked:n.checked,disabled:n.disabled,readOnly:n.readOnly,onChange:e=>{n.readOnly||s&&s(e.target.checked)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:22,columnNumber:4},void 0),m.jsxDEV("div",{className:ht.check,"data-read_only":n.readOnly,children:n.checked&&m.jsxDEV(or,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:36,columnNumber:23},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:35,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:21,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:16,columnNumber:9},void 0),ur="_input_1rofd_45",Tt={input:ur},Nt=s=>{const n=v.useRef(!1),e=v.useRef();e.current=s.onChange;const t=v.useRef();t.current=s.value;const r=v.useCallback(u=>{const a=t.current;if(n.current===!1)return;const l=u.movementX;if(typeof a=="number"){const h=l*.05*(s.step||1);e.current&&e.current(a+h),u.stopPropagation()}u.preventDefault()},[s.step]),i=v.useCallback(u=>{n.current=!0;const a=()=>{n.current=!1,window.removeEventListener("pointerup",a),window.removeEventListener("pointermove",r)};window.addEventListener("pointerup",a),window.addEventListener("pointermove",r)},[r]),o=Number((s.value||0).toFixed(s.precision??3));return m.jsxDEV("div",{className:Tt.inputNumber,children:m.jsxDEV("input",{className:Tt.input,type:"number",value:o,disabled:s.disabled,readOnly:s.readOnly,"data-lo":s.readOnly,step:s.step||1,min:s.min,max:s.max,onChange:u=>{s.onChange(Number(u.target.value))},onPointerDown:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputNumber/index.tsx",lineNumber:72,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputNumber/index.tsx",lineNumber:71,columnNumber:9},void 0)},mr="_inputSelect_d7lo3_45",hr="_input_d7lo3_45",je={inputSelect:mr,input:hr},dr=({onChange:s,value:n,...e})=>{if(e.readOnly)return m.jsxDEV("div",{className:je.inputSelect,children:m.jsxDEV("input",{className:je.input,value:n,readOnly:!0},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:20,columnNumber:10},void 0);let t=e.selectList;return typeof t=="function"&&(t=t()),m.jsxDEV("div",{className:je.inputSelect,children:m.jsxDEV("select",{className:je.input,onChange:r=>{s&&s(r.target.value)},value:n,children:t.map((r,i)=>{let o="",u="";return typeof r=="string"?(o=r,u=r):(o=r.label,u=r.value),m.jsxDEV("option",{value:u,children:o},i,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:61,columnNumber:12},void 0)})},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:34,columnNumber:9},void 0)},fr="_input_ndjbn_45",Ot={input:fr},ft=({onChange:s,value:n,...e})=>{const[t,r]=v.useState(n),i=v.useCallback(()=>{s&&s(t)},[t,s]);return v.useEffect(()=>{r(n)},[n]),m.jsxDEV("div",{className:Ot.container,children:m.jsxDEV("input",{className:Ot.input,type:"text",value:t,placeholder:e.readOnly?"-":"",disabled:e.disabled,readOnly:e.readOnly,"data-lo":e.readOnly,onChange:o=>{r(o.target.value)},onBlur:o=>{i()},onKeyDown:o=>{o.key==="Enter"&&o.currentTarget.blur()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputText/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputText/index.tsx",lineNumber:34,columnNumber:9},void 0)},pr={},gr=["x","y","z","w"],nn=({onChange:s,disabled:n,...e})=>{const t=v.useRef();t.current=e.value;const r=v.useCallback((o,u)=>{if(s&&t.current){const a={};for(let l=0;l<t.current.length;l++)a[l]=t.current[l];a[o]=u,s(a)}},[s]),i=[];for(let o=0;o<e.value.length;o++)i.push(m.jsxDEV(le,{title:gr[o],labelAlign:"right",children:m.jsxDEV(Nt,{disabled:n,value:e.value[o],step:e.step,onChange:u=>{r(o,u)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:49,columnNumber:5},void 0)},o,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:48,columnNumber:4},void 0));return m.jsxDEV("div",{className:pr.vector,children:i.map(o=>o)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:59,columnNumber:9},void 0)},me=s=>{let n=null;const e=s.onChange,t=s.value,r=s.format,i=o=>{e&&e(o)};if(t==null)return null;if(r&&(r.type=="vector"&&Array.isArray(t)?n=m.jsxDEV(nn,{value:t,onChange:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:48,columnNumber:15},void 0):r.type=="select"&&(n=m.jsxDEV(dr,{value:t,onChange:i,selectList:r.list},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:52,columnNumber:15},void 0))),!n)if(typeof t=="number")n=m.jsxDEV(Nt,{...s,value:t,onChange:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:62,columnNumber:15},void 0);else if(typeof t=="string")n=m.jsxDEV(ft,{...s,value:t,onChange:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:66,columnNumber:15},void 0);else if(typeof t=="boolean")n=m.jsxDEV(tn,{...s,checked:t,onChange:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:70,columnNumber:15},void 0);else if(typeof t=="function"){const o=s.label||"Run";n=m.jsxDEV(Pe,{onClick:()=>{t()},children:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:76,columnNumber:15},void 0)}else n=m.jsxDEV(ft,{...s,value:JSON.stringify(t),onChange:()=>{}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:86,columnNumber:15},void 0);return n},xr="_container_dlq1w_1",vr={container:xr},Er=s=>{const n=[],e=s.value,t=s.format,r=(t==null?void 0:t.type)=="array"?t.labels:void 0;if(e===void 0)return null;for(let i=0;i<e.length;i++){const o=e[i];let u=i.toString();r&&(u+="/ "+r(o,i)),n.push(m.jsxDEV(le,{title:u,children:m.jsxDEV(me,{...s,value:o,onChange:a=>{const l=e.concat();l[i]=a,s.onChange&&s.onChange(l)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:32,columnNumber:5},void 0)},i,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:31,columnNumber:4},void 0))}return m.jsxDEV("div",{className:vr.container,children:n},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:50,columnNumber:9},void 0)},yr=s=>{const{target:n}=nr(),e=s.field.value,t=typeof e,r=s.field.opt,i=r==null?void 0:r.format,o=(r==null?void 0:r.label)||s.path.split("/").pop(),u=i&&i.type=="vector";let a=null;if(Array.isArray(e))(i==null?void 0:i.type)=="vector"?a=m.jsxDEV(nn,{value:e,...r,onChange:l=>{n.setField(s.path,l)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:26,columnNumber:15},void 0):a=m.jsxDEV(Er,{value:e,...r,onChange:l=>{n.setField(s.path,l)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:35,columnNumber:15},void 0);else if(a=m.jsxDEV(me,{value:e,...r,onChange:l=>{n.setField(s.path,l)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:45,columnNumber:14},void 0),t==="function")return a;return m.jsxDEV(le,{title:o,vertical:u,children:a},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:59,columnNumber:9},void 0)},br="_container_3297g_1",wr="_field_3297g_5",_r="_block_3297g_9",Mt={container:br,field:wr,block:_r},rn=s=>{const n=[],e=Object.keys(s.fields.childs);for(let t=0;t<e.length;t++){const r=e[t],i=s.fields.childs[r],{opt:o}=i;let u=!1;if(o&&(typeof o.hidden=="function"?u=o.hidden(i.type=="value"?i.value:null):u=o.hidden||!1),u)continue;const a="field"+r,l=(s.basePath?s.basePath+"/":"")+r;let h=null;i.type==="value"?h=m.jsxDEV(yr,{path:l,field:i},a,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:46,columnNumber:10},void 0):h=m.jsxDEV("div",{className:Mt.block,children:m.jsxDEV(Ce,{accordion:!0,label:r,children:m.jsxDEV(rn,{fields:i,basePath:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:52,columnNumber:6},void 0)},a,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:51,columnNumber:5},void 0)},a,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:50,columnNumber:10},void 0),h&&n.push(h)}return m.jsxDEV("div",{className:Mt.container,children:n},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:66,columnNumber:9},void 0)},sn=s=>{const n=tr(s),e=n.target.serializeToDirectory();return m.jsxDEV(en.Provider,{value:n,children:m.jsxDEV(rn,{fields:e},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/index.tsx",lineNumber:18,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/index.tsx",lineNumber:17,columnNumber:9},void 0)};class on{constructor(n){c(this,"gl");c(this,"extDisJointTimerQuery");this.gl=n,this.gl.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("EXT_color_buffer_half_float"),this.gl.getExtension("OES_texture_float_linear"),this.extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")}}class Nr{constructor(n,e){c(this,"gl");c(this,"vao");c(this,"program");c(this,"indexBuffer");c(this,"attributes");c(this,"vertCount");c(this,"indexCount");c(this,"instanceCount");c(this,"attribPointerDiect");c(this,"attribTypeDict");this.gl=n,this.program=e,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([["Float32Array",this.gl.vertexAttribPointer.bind(this.gl)],["Int32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int8Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt8Array",this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([["Float32Array",this.gl.FLOAT],["Int32Array",this.gl.INT],["Int16Array",this.gl.SHORT],["Int8Array",this.gl.BYTE],["UInt32Array",this.gl.UNSIGNED_INT],["UInt16Array",this.gl.UNSIGNED_SHORT],["UInt8Array",this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((n,e)=>{n.instanceDivisor==null&&e!="index"&&(this.vertCount=Math.max(this.vertCount,n.count)),n.instanceDivisor!==void 0&&n.instanceDivisor>0&&(this.instanceCount==0?this.instanceCount=n.count:this.instanceCount=Math.min(this.instanceCount,n.count))})}setAttribute(n,e,t,r){if(e.array===null)return;const i={buffer:e,size:t,count:e.array?e.array.length/t:0,location:void 0,...r};this.attributes.set(n,i),this.gl.bindVertexArray(this.vao),i.location=this.gl.getAttribLocation(this.program,n);const o=this.attribPointerDiect.get(e.array.constructor.name),u=this.attribTypeDict.get(e.array.constructor.name);if(i.location>-1)if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i.buffer.buffer),i.size==16){for(let a=0;a<4;a++)this.gl.enableVertexAttribArray(i.location+a);for(let a=0;a<4;a++)this.gl.vertexAttribPointer(i.location+a,4,u,!1,64,16*a);if(i.instanceDivisor!==void 0)for(let a=0;a<4;a++)this.gl.vertexAttribDivisor(i.location+a,i.instanceDivisor)}else this.gl.enableVertexAttribArray(i.location),o(i.location,i.size,u,!1,0,0),i.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(i.location,i.instanceDivisor);return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(n){return this.attributes.delete(n),this.calcVertCount(),this}setIndex(n){this.indexBuffer=n,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(n){this.gl.bindVertexArray(this.vao),n&&n(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(n=>{n.buffer.dispose()})}}class an{constructor(n){c(this,"gl");c(this,"program");c(this,"vao");c(this,"uniforms");this.gl=n,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(n,e,t){if(this.program===null){console.warn("program is null.");return}const r=this.createShader(n,this.gl.VERTEX_SHADER),i=this.createShader(e,this.gl.FRAGMENT_SHADER);if(!(!r||!i))return this.gl.attachShader(this.program,r),this.gl.attachShader(this.program,i),t&&t.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,t.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)||console.error("program link error:",this.gl.getProgramInfoLog(this.program)),this}createShader(n,e){const t=this.gl.createShader(e);if(!t)return null;if(this.gl.shaderSource(t,n),this.gl.compileShader(t),this.gl.getShaderParameter(t,this.gl.COMPILE_STATUS))return t;{const r=this.gl.getShaderInfoLog(t);if(r){const i=n.split(`
`),o=r.matchAll(/ERROR: 0:(\d+)/g);Array.from(o).forEach((u,a)=>{const l=Number(u[1]),h=Math.max(0,l-5),p=Math.min(i.length,l+2);let f=r.split(`
`)[a]+`
`;i.forEach((d,x)=>{h<=x&&x<=p&&(f+=`${x+1}: ${d}
`)}),console.error(f)})}}}setUniform(n,e,t){const r=this.uniforms.get(n);if(r)if(r.type=e,r.value=t,r.cache){for(let i=0;i<t.length;i++)if(r.cache[i]!==t[i]){r.needsUpdate=!0;break}}else r.needsUpdate=!0;else this.uniforms.set(n,{value:t,type:e,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(n){this.program&&this.uniforms.forEach((e,t)=>{(e.location===null||n)&&(e.location=this.gl.getUniformLocation(this.program,t))})}uploadUniforms(){this.uniforms.forEach(n=>{n.needsUpdate&&n.location!==null&&(/Matrix[2|3|4]fv/.test(n.type)?this.gl["uniform"+n.type](n.location,!1,n.value):/[1|2|3|4][f|i]$/.test(n.type)?this.gl["uniform"+n.type](n.location,...n.value):this.gl["uniform"+n.type](n.location,n.value),n.cache=n.value.concat(),n.needsUpdate=!1)})}getVAO(n="_"){if(!this.program)return null;let e=this.vao.get(n);return e||(e=new Nr(this.gl,this.program),this.vao.set(n,e),e)}use(n){this.program&&(this.gl.useProgram(this.program),n&&n(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(n=>{n.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}class Ke{constructor(n){c(this,"gl");c(this,"buffer");c(this,"array");this.gl=n,this.buffer=this.gl.createBuffer(),this.array=null}setData(n,e="vbo",t){const r=e=="vbo"?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(r,this.buffer),this.gl.bufferData(r,n,t||this.gl.STATIC_DRAW),this.gl.bindBuffer(r,null),this.array=n,this}dispose(){this.gl.deleteBuffer(this.buffer)}}class w{constructor(n,e,t,r){c(this,"x");c(this,"y");c(this,"z");c(this,"w");this.x=0,this.y=0,this.z=0,this.w=0,this.set(n,e,t,r)}get isVector(){return!0}set(n,e,t,r){return this.x=n??0,this.y=e??0,this.z=t??0,this.w=r??0,this}setScalar(n){return this.x=n,this.y=n,this.z=n,this.w=n,this}setFromArray(n){return this.x=n[0]||0,this.y=n[1]||0,this.z=n[2]||0,this.w=n[3]||0,this}add(n){return typeof n=="number"?(this.x+=n,this.y+=n,this.z+=n,this.w+=n):(this.x+=n.x??0,this.y+=n.y??0,this.z+=n.z??0,this.w+=n.w??0),this}sub(n){return typeof n=="number"?(this.x-=n,this.y-=n,this.z-=n):(this.x-=n.x??0,this.y-=n.y??0,this.z-=n.z??0,this.w-=n.w??0),this}multiply(n){return typeof n=="number"?(this.x*=n,this.y*=n,this.z*=n,this.w*=n):(this.x*=n.x,this.y*=n.y,this.z*=n.z,this.w*=n.w),this}divide(n){return typeof n=="number"?(this.x/=n,this.y/=n,this.z/=n,this.w/=n):(this.x/=n.x,this.y/=n.y,this.z/=n.z,this.w/=n.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(n){const e=this.x-n.x,t=this.y-n.y,r=this.z-n.z;return Math.sqrt(e*e+t*t+r*r)}normalize(){const n=this.length()||1;return this.x/=n,this.y/=n,this.z/=n,this}cross(n){const e=this.x,t=this.y,r=this.z,i=n.x,o=n.y,u=n.z;return this.x=t*u-r*o,this.y=r*i-e*u,this.z=e*o-t*i,this}dot(n){return this.x*n.x+this.y*n.y+this.z*n.z}applyMatrix3(n){const e=n.elm,t=e[0],r=e[1],i=e[2],o=e[4],u=e[5],a=e[6],l=e[8],h=e[9],p=e[10],f=this.x*t+this.y*o+this.z*l,d=this.x*r+this.y*u+this.z*h,x=this.x*i+this.y*a+this.z*p;return this.x=f,this.y=d,this.z=x,this.w=0,this}applyMatrix4(n){const e=n.elm,t=e[0],r=e[1],i=e[2],o=e[3],u=e[4],a=e[5],l=e[6],h=e[7],p=e[8],f=e[9],d=e[10],x=e[11],E=e[12],y=e[13],b=e[14],g=e[15],R=this.x*t+this.y*u+this.z*p+this.w*E,S=this.x*r+this.y*a+this.z*f+this.w*y,_=this.x*i+this.y*l+this.z*d+this.w*b,k=this.x*o+this.y*h+this.z*x+this.w*g;return this.x=R,this.y=S,this.z=_,this.w=k,this}applyMatrix4AsPosition(n){const e=this.w;return this.w=1,this.applyMatrix4(n),this.w=e,this}applyMatrix4AsDirection(n){const e=this.w;return this.w=0,this.applyMatrix4(n),this.w=e,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(n,e){return this.x=this.x+(n.x-this.x)*e,this.y=this.y+(n.y-this.y)*e,this.z=this.z+(n.z-this.z)*e,this.w=this.w+(n.w-this.w)*e,this}copy(n){return this.x=n.x??0,this.y=n.y??0,this.z=n.z??0,this.w=n.w??0,this}clone(){return new w(this.x,this.y,this.z,this.w)}getElm(n){return n=="vec2"?[this.x,this.y]:n=="vec3"?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}class M{constructor(n){c(this,"unit");c(this,"image");c(this,"size");c(this,"gl");c(this,"glTex");c(this,"textureType");c(this,"_setting");this.gl=n,this.image=null,this.unit=0,this.size=new w,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=n.TEXTURE_2D}get isTexture(){return!0}setting(n){return this._setting={...this._setting,...n},this.attach(this.image),this}attach(n){if(this.image=n,this.gl.bindTexture(this.textureType,this.glTex),this.image){const e=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(e.width,e.height),e instanceof HTMLImageElement||e instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,e):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,e.width,e.height,0,this._setting.format,this._setting.type,e.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}activate(n){return this.gl.activeTexture(this.gl.TEXTURE0+n),this.gl.bindTexture(this.textureType,this.glTex),this.unit=n,this}load(n,e){const t=new Image;return t.onload=()=>{this.attach(t),e&&e()},t.src=n,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}class H{constructor(n,e){c(this,"size");c(this,"gl");c(this,"glFrameBuffer");c(this,"textures");c(this,"depthTexture");c(this,"textureAttachmentList");this.gl=n,this.size=new w(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!e||!e.disableDepthBuffer)&&this.setDepthTexture(new M(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(n){this.depthTexture=n,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(n){return this.textures=n,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((e,t)=>{e.attach({width:this.size.x,height:this.size.y});const r=this.gl.COLOR_ATTACHMENT0+t;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,r,this.gl.TEXTURE_2D,e.getTexture(),0),this.textureAttachmentList.push(r)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(n,e){return typeof n=="number"?(this.size.x=n,e!==void 0&&(this.size.y=e)):this.size.copy(n),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(t=>{t.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}class Rr extends H{constructor(e,t){super(e,t);c(this,"cubeTarget");c(this,"textures");c(this,"currentFace");this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.textures.forEach(t=>{t.attach({width:this.size.x,height:this.size.y})}),this}face(e){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((t,r)=>{const i=this.gl.COLOR_ATTACHMENT0+r;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,i,this.cubeTarget[e],t.getTexture(),0),this.textureAttachmentList.push(i)}),this.currentFace=this.cubeTarget[e],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}class Ar extends M{constructor(e){super(e);c(this,"cubeTarget");this.textureType=e.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(e){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let t=0;t<6;t++){const r=Array.isArray(this.image)?this.image[t]:this.image;this.size.set(r.width,r.height),r instanceof HTMLImageElement||r instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[t],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,r):this.gl.texImage2D(this.cubeTarget[t],0,this._setting.internalFormat,r.width,r.height,0,this._setting.format,this._setting.type,r.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}class Cr{constructor(n){c(this,"gl");c(this,"transformFeedback");c(this,"feedbackBuffer");this.gl=n,this.transformFeedback=this.gl.createTransformFeedback(),this.feedbackBuffer=new Map}bind(n){this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,this.transformFeedback),n&&n(),this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,null)}setBuffer(n,e,t){this.feedbackBuffer.set(n,{buffer:e,varyingIndex:t})}use(n){this.bind(()=>{this.feedbackBuffer.forEach(e=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,e.varyingIndex,e.buffer.buffer)}),n&&n(this),this.feedbackBuffer.forEach(e=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,e.varyingIndex,null)})})}}class U{constructor(n){c(this,"elm");this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],n&&this.set(n)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new U().copy(this)}copy(n){return this.set(n.elm),this}perspective(n,e,t,r){const i=1/Math.tan(n*Math.PI/360),o=r-t;return this.elm=[i/e,0,0,0,0,i,0,0,0,0,-(r+t)/o,-1,0,0,-(r*t*2)/o,0],this}orthographic(n,e,t,r){return this.elm=[2/n,0,0,0,0,2/e,0,0,0,0,-2/(r-t),0,0,0,-(r+t)/(r-t),1],this}lookAt(n,e,t){const r=n.clone().sub(e).normalize(),i=t.clone().cross(r).normalize(),o=r.clone().cross(i).normalize();return this.elm=[i.x,i.y,i.z,0,o.x,o.y,o.z,0,r.x,r.y,r.z,0,n.x,n.y,n.z,1],this}inverse(){const n=this.elm[0],e=this.elm[1],t=this.elm[2],r=this.elm[3],i=this.elm[4],o=this.elm[5],u=this.elm[6],a=this.elm[7],l=this.elm[8],h=this.elm[9],p=this.elm[10],f=this.elm[11],d=this.elm[12],x=this.elm[13],E=this.elm[14],y=this.elm[15],b=n*o-e*i,g=n*u-t*i,R=n*a-r*i,S=e*u-t*o,_=e*a-r*o,k=t*a-r*u,P=l*x-h*d,O=l*E-p*d,A=l*y-f*d,N=h*E-p*x,D=h*y-f*x,j=p*y-f*E,B=b*j-g*D+R*N+S*A-_*O+k*P,F=1/B;return B==0?this.identity():(this.elm[0]=(o*j-u*D+a*N)*F,this.elm[1]=(-e*j+t*D-r*N)*F,this.elm[2]=(x*k-E*_+y*S)*F,this.elm[3]=(-h*k+p*_-f*S)*F,this.elm[4]=(-i*j+u*A-a*O)*F,this.elm[5]=(n*j-t*A+r*O)*F,this.elm[6]=(-d*k+E*R-y*g)*F,this.elm[7]=(l*k-p*R+f*g)*F,this.elm[8]=(i*D-o*A+a*P)*F,this.elm[9]=(-n*D+e*A-r*P)*F,this.elm[10]=(d*_-x*R+y*b)*F,this.elm[11]=(-l*_+h*R-f*b)*F,this.elm[12]=(-i*N+o*O-u*P)*F,this.elm[13]=(n*N-e*O+t*P)*F,this.elm[14]=(-d*S+x*g-E*b)*F,this.elm[15]=(l*S-h*g+p*b)*F,this)}transpose(){const n=this.elm[0],e=this.elm[1],t=this.elm[2],r=this.elm[3],i=this.elm[4],o=this.elm[5],u=this.elm[6],a=this.elm[7],l=this.elm[8],h=this.elm[9],p=this.elm[10],f=this.elm[11],d=this.elm[12],x=this.elm[13],E=this.elm[14],y=this.elm[15];return this.elm[0]=n,this.elm[1]=i,this.elm[2]=l,this.elm[3]=d,this.elm[4]=e,this.elm[5]=o,this.elm[6]=h,this.elm[7]=x,this.elm[8]=t,this.elm[9]=u,this.elm[10]=p,this.elm[11]=E,this.elm[12]=r,this.elm[13]=a,this.elm[14]=f,this.elm[15]=y,this}set(n){for(let e=0;e<this.elm.length;e++)this.elm[e]=n[e]??0;return this}setFromTransform(n,e,t){return this.identity(),n&&this.applyPosition(n),e&&this.applyQuaternion(e),t&&this.applyScale(t),this}applyPosition(n){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,n.x,n.y,n.z,1]),this}applyQuaternion(n){const e=n.x,t=n.y,r=n.z,i=n.w,o=e*e,u=t*t,a=r*r,l=i*i,h=e*t,p=e*r,f=e*i,d=t*r,x=t*i,E=r*i;return this.matmul([o-u-a+l,2*(h+E),2*(p-x),0,2*(h-E),-o+u-a+l,2*(d+f),0,2*(p+x),2*(d-f),-o-u+a+l,0,0,0,0,1]),this}applyScale(n){return this.matmul([n.x,0,0,0,0,n.y,0,0,0,0,n.z,0,0,0,0,1]),this}matmul(n){const e=new Array(16);for(let t=0;t<4;t++)for(let r=0;r<4;r++){let i=0;for(let o=0;o<4;o++)i+=this.elm[o*4+r]*n[o+t*4];e[r+t*4]=i}this.elm=e}setRotationFromDirection(n,e){e=e||{x:0,y:1,z:0};const t=new w().copy(n).normalize(),r=new w().copy(e).cross(t).normalize();r.length()==0&&(t.x+=.001,r.copy(e).cross(t).normalize());const i=t.clone().cross(r).normalize();return this.set([r.x,r.y,r.z,0,i.x,i.y,i.z,0,t.x,t.y,t.z,0,0,0,0,1]),this}makeRotationAxis(n,e){const t=Math.cos(e),r=Math.sin(e),i=1-t,o=n.x,u=n.y,a=n.z,l=i*o,h=i*u;return this.set([l*o+t,l*u-r*a,l*a+r*u,0,l*u+r*a,h*u+t,h*a-r*o,0,l*a-r*u,h*a+r*o,i*a*a+t,0,0,0,0,1]),this}multiply(n){return this.matmul(n.elm),this}preMultiply(n){const e=this.copyToArray([]);return this.set(n.elm),this.matmul(e),this}decompose(n,e,t){n&&(n.x=this.elm[12],n.y=this.elm[13],n.z=this.elm[14]),e&&e.setFromMatrix(this)}copyToArray(n){n.length=this.elm.length;for(let e=0;e<this.elm.length;e++)n[e]=this.elm[e];return n}}class Rt extends w{constructor(e,t,r,i){super(e,t,r,0);c(this,"order");this.order=i||"XYZ"}copy(e){return"order"in e&&(this.order=e.order),super.copy(e)}setFromQuaternion(e){const t=new U().applyQuaternion(e);return this.setFromRotationMatrix(t),this}setFromRotationMatrix(e){const t=e.elm,r=t[0],i=t[4],o=t[8];t[1];const u=t[5],a=t[9];t[2];const l=t[6],h=t[10];return this.order="XYZ",this.y=Math.asin(Math.min(1,Math.max(-1,o))),Math.abs(o)<.9999999?(this.x=Math.atan2(-a,h),this.z=Math.atan2(-i,r)):(this.x=Math.atan2(l,u),this.z=0),this}}class ye{constructor(n,e,t,r){c(this,"x");c(this,"y");c(this,"z");c(this,"w");c(this,"updated",!1);this.x=n||0,this.y=e||0,this.z=t||0,this.w=r||1}set(n,e,t,r){this.x=n??this.x,this.y=e??this.y,this.z=t??this.z,this.w=r??this.w,this.updated=!0}setFromEuler(n,e){const t=e||("order"in n?n.order:"XYZ"),r=Math.sin(n.x/2),i=Math.sin(n.y/2),o=Math.sin(n.z/2),u=Math.cos(n.x/2),a=Math.cos(n.y/2),l=Math.cos(n.z/2);return t=="XYZ"?(this.x=u*i*o+r*a*l,this.y=-r*a*o+u*i*l,this.z=u*a*o+r*i*l,this.w=-r*i*o+u*a*l):t=="XZY"?(this.x=-u*i*o+r*a*l,this.y=u*i*l-r*a*o,this.z=r*i*l+u*a*o,this.w=r*i*o+u*a*l):t=="YZX"?(this.x=r*a*l+u*i*o,this.y=r*a*o+u*i*l,this.z=-r*i*l+u*a*o,this.w=-r*i*o+u*a*l):t=="ZYX"&&(this.x=r*a*l-u*i*o,this.y=r*a*o+u*i*l,this.z=-r*i*l+u*a*o,this.w=r*i*o+u*a*l),this.updated=!0,this}setFromMatrix(n){const e=n.elm,t=e[0]+e[5]+e[10];let r,i,o,u;if(t>0){const l=Math.sqrt(t+1)*2;u=.25*l,r=(e[6]-e[9])/l,i=(e[8]-e[2])/l,o=(e[1]-e[4])/l}else if(e[0]>e[5]&&e[0]>e[10]){const l=Math.sqrt(1+e[0]-e[5]-e[10])*2;u=(e[6]-e[9])/l,r=.25*l,i=(e[1]+e[4])/l,o=(e[2]+e[8])/l}else if(e[5]>e[10]){const l=Math.sqrt(1+e[5]-e[0]-e[10])*2;u=(e[8]-e[2])/l,r=(e[1]+e[4])/l,i=.25*l,o=(e[6]+e[9])/l}else{const l=Math.sqrt(1+e[10]-e[0]-e[5])*2;u=(e[1]-e[4])/l,r=(e[2]+e[8])/l,i=(e[6]+e[9])/l,o=.25*l}const a=Math.sqrt(r*r+i*i+o*o+u*u);return r/=a,i/=a,o/=a,u/=a,this.x=r,this.y=i,this.z=o,this.w=u,this.updated=!0,this}multiply(n){const e=this.w*n.w-this.x*n.x-this.y*n.y-this.z*n.z,t=this.w*n.x+this.x*n.w+this.y*n.z-this.z*n.y,r=this.w*n.y-this.x*n.z+this.y*n.w+this.z*n.x,i=this.w*n.z+this.x*n.y-this.y*n.x+this.z*n.w;return this.set(t,r,i,e),this.updated=!0,this}preMultiply(n){const e=n.clone().multiply(this);this.set(e.x,e.y,e.z,e.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(n){return this.x=n.x??0,this.y=n.y??0,this.z=n.z??0,this.w=n.w??0,this.updated=!0,this}clone(){return new ye(this.x,this.y,this.z,this.w)}}var Qe;(s=>{s.gauss=(n,e,t)=>{const r=n-e,i=-(r*r)/(2*t*t);return 1/Math.sqrt(2*Math.PI*t)*Math.exp(i)},s.gaussWeights=n=>{let e=0;const t=[];if(n<=1)return[.5];for(let r=0;r<n;r++){const i=r/(n-1),o=(0,s.gauss)(i,0,1);e+=o*(r>0?2:1),t.push(o)}for(let r=0;r<n;r++)t[r]/=e;return t},s.randomSeed=n=>{n^=n<<13,n^=0,n^=n<<5;let e=123456789^n;n^=n<<13,n^=0,n^=n<<5;let t=362436069^n;n^=n<<13,n^=0,n^=n<<5;let r=521288629^n;n^=n<<13,n^=0,n^=n<<5;let i=88675123^n,o;return()=>(o=e^e<<11,e=t,t=r,r=i,i=(i^i>>>19^(o^o>>>8))>>>0,i/4294967296)},s.randomRange=(n=-1,e=1)=>n+Math.random()*(e-n),s.randomVector=(n=new w(-1,-1,-1,-1),e=new w(1,1,1,1))=>new w((0,s.randomRange)(n.x,e.x),(0,s.randomRange)(n.y,e.y),(0,s.randomRange)(n.z,e.z),(0,s.randomRange)(n.w,e.w)),s.smoothstep=(n,e,t)=>t<=n?0:t>=e?1:(t=(t-n)/(e-n),t*t*(3-2*t))})(Qe||(Qe={}));class ${constructor(){c(this,"listeners");this.listeners=[]}on(n,e){this.listeners.push({event:n,cb:e})}once(n,e){this.listeners.push({event:n,cb:e,once:!0})}off(n,e){this.listeners=this.listeners.filter(t=>e==null?t.event!=n:!(t.event==n&&t.cb==e))}emit(n,e){const t=this.listeners.concat();for(let r=0;r<t.length;r++){const i=t[r];i.event==n&&(i.cb.apply(this,e||[]),i.once&&this.off(n,i.cb))}}hasEvent(n){return this.listeners.some(e=>e.event==n)}}var ve;(s=>{s.NEWTON_ITERATIONS=4,s.NEWTON_MIN_SLOPE=.001,s.SUBDIVISION_PRECISION=1e-7,s.SUBDIVISION_MAX_ITERATIONS=10,s.BEZIER_EASING_CACHE_SIZE=11,s.BEZIER_EASING_SAMPLE_STEP_SIZE=1/s.BEZIER_EASING_CACHE_SIZE;function n(l){return-l.p0+3*l.p1-3*l.p2+l.p3}function e(l){return 3*l.p0-6*l.p1+3*l.p2}function t(l){return-3*l.p0+3*l.p1}function r(l,h){return 3*n(l)*h*h+2*e(l)*h+t(l)}s.calcBezierSlope=r;function i(l,h){return((n(l)*h+e(l))*h+t(l))*h+l.p0}s.calcBezier=i;function o(l,h,p,f){let d=0,x=0;for(let E=0;E<s.SUBDIVISION_MAX_ITERATIONS;E++)x=h+(p-h)/2,d=i(f,x),d>l?p=x:h=x;return x}function u(l,h,p){for(let f=0;f<s.NEWTON_ITERATIONS;f++){const d=r(h,p);if(d==0)return p;const x=i(h,p)-l;p-=x/d}return p}function a(l,h,p){l.p1=Math.max(l.p0,Math.min(l.p3,l.p1)),l.p2=Math.max(l.p0,Math.min(l.p3,l.p2));let f=0;for(let E=1;E<p.length&&(f=E-1,!(h<p[E]));E++);const d=f/(s.BEZIER_EASING_CACHE_SIZE-1),x=r(l,d)/(l.p3-l.p0);return x==0?d:x>.01?u(h,l,d):o(h,d,d+s.BEZIER_EASING_SAMPLE_STEP_SIZE,l)}s.getBezierTfromX=a})(ve||(ve={}));var pt;(s=>{function n(g=6){return R=>{const S=Math.exp(-g*(2*R-1)),_=Math.exp(-g);return(1+(1-S)/(1+S)*(1+_)/(1-_))/2}}s.sigmoid=n;function e(g,R,S){const _=Math.max(0,Math.min(1,(S-g)/(R-g)));return _*_*(3-2*_)}s.smoothstep=e;function t(g){return g}s.linear=t;function r(g){return g*g}s.easeInQuad=r;function i(g){return g*(2-g)}s.easeOutQuad=i;function o(g){return g<.5?2*g*g:-1+(4-2*g)*g}s.easeInOutQuad=o;function u(g){return g*g*g}s.easeInCubic=u;function a(g){return--g*g*g+1}s.easeOutCubic=a;function l(g){return g<.5?4*g*g*g:(g-1)*(2*g-2)*(2*g-2)+1}s.easeInOutCubic=l;function h(g){return g*g*g*g}s.easeInQuart=h;function p(g){return 1- --g*g*g*g}s.easeOutQuart=p;function f(g){return g<.5?8*g*g*g*g:1-8*--g*g*g*g}s.easeInOutQuart=f;function d(g){return g*g*g*g*g}s.easeInQuint=d;function x(g){return 1+--g*g*g*g*g}s.easeOutQuint=x;function E(g){return g<.5?16*g*g*g*g*g:1+16*--g*g*g*g*g}s.easeInOutQuint=E;function y(g,R,S,_){const k=new Array(ve.BEZIER_EASING_CACHE_SIZE);for(let P=0;P<ve.BEZIER_EASING_CACHE_SIZE;++P)k[P]=ve.calcBezier({p0:g.x,p1:R.x,p2:S.x,p3:_.x},P/(ve.BEZIER_EASING_CACHE_SIZE-1));return P=>P<=g.x?g.y:_.x<=P?_.y:ve.calcBezier({p0:g.y,p1:R.y,p2:S.y,p3:_.y},ve.getBezierTfromX({p0:g.x,p1:R.x,p2:S.x,p3:_.x},P,k))}s.bezier=y;function b(g,R,S,_){return y({x:0,y:0},{x:g,y:R},{x:S,y:_},{x:1,y:1})}s.cubicBezier=b})(pt||(pt={}));var Dt;(s=>{s.number=(n,e,t)=>n+(e-n)*t,s.vector=(n,e,t)=>n.lerp(e,t)})(Dt||(Dt={}));class Pr extends ${constructor(e){super();c(this,"keyframes",[]);c(this,"cache",{frame:NaN,value:NaN});c(this,"frameStart");c(this,"frameEnd");c(this,"frameDuration");this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes=[],e.forEach(t=>{this.addKeyFrame(t)}))}addKeyFrame(e){let t=0;for(let r=0;r<this.keyframes.length&&this.keyframes[r].coordinate.x<e.coordinate.x;r++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let r=0;r<this.keyframes.length;r++){const i=this.keyframes[r];if(e<i.coordinate.x){const o=this.keyframes[r-1];o?t=o.to(i,e):t=i.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t!==null?(this.cache={frame:e,value:t},t):0}}class Sr extends ${constructor(e,t,r,i,o){super();c(this,"name");c(this,"curves");c(this,"frameStart");c(this,"frameEnd");c(this,"frameDuration");c(this,"updatedFrame",-1);c(this,"value");this.name=e||"",this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new w,t&&this.setFCurve(t,"x"),r&&this.setFCurve(r,"y"),i&&this.setFCurve(i,"z"),o&&this.setFCurve(o,"w")}setFCurve(e,t){this.curves.set(t,e);let r=1/0,i=-1/0;this.curves.forEach(o=>{o.frameStart<r&&(r=o.frameStart),o.frameEnd>i&&(i=o.frameEnd)}),(r==-1/0||i==1/0)&&(r=0,i=1),this.frameStart=r,this.frameEnd=i,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(e){return this.curves.get(e)||null}setFrame(e){if(e==this.updatedFrame)return this;const t=this.curves.get("x"),r=this.curves.get("y"),i=this.curves.get("z"),o=this.curves.get("w");return t&&(this.value.x=t.getValue(e)),r&&(this.value.y=r.getValue(e)),i&&(this.value.z=i.getValue(e)),o&&(this.value.w=o.getValue(e)),this.updatedFrame=e,this}}class kr extends ${constructor(e,t,r,i){super();c(this,"coordinate",{x:0,y:0});c(this,"handleLeft",{x:0,y:0});c(this,"handleRight",{x:0,y:0});c(this,"interpolation","BEZIER");c(this,"easing",null);c(this,"nextFrame",null);this.set(e,t,r,i)}set(e,t,r,i){this.coordinate=e,this.handleLeft=t||e,this.handleRight=r||e,this.interpolation=i||"BEZIER"}getEasing(e,t){return e=="BEZIER"?pt.bezier(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):e=="CONSTANT"?()=>this.coordinate.y:r=>{const i=t.coordinate.y-this.coordinate.y;return r=(r-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+r*i}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}}let Tr=0;var gt;(s=>{function n(){return(Tr++).toString(16)}s.genUUID=n})(gt||(gt={}));class Se extends ${constructor(){super();c(this,"uuid");c(this,"initiator");c(this,"fields_");this.uuid=gt.genUUID(),this.fields_=new Map,this.initiator="script"}serialize(e){e=e||{mode:"view"};const t={};return this.fields_.forEach((r,i)=>{const o=this.getFieldOpt(i);e.mode=="export"&&o&&o&&o.noExport||(t[i]=r.get(e))}),t}serializeToDirectory(){return(t=>{const r={type:"folder",childs:{},opt:{}},i=Object.keys(t);for(let o=0;o<i.length;o++){const u=i[o],a=this.getFieldOpt(u);if(!u)continue;let l=r;const h=u.split("/");for(let p=0;p<h.length;p++){const f=h[p];f&&l.type!="value"&&(l.childs[f]||(p==h.length-1?l.childs[f]={type:"value",value:null,opt:a}:l.childs[f]={type:"folder",childs:{},opt:a}),l=l.childs[f])}l.type=="value"&&(l.value=t[u])}return r})(this.serialize())}deserialize(e){const t=Object.keys(e);for(let r=0;r<t.length;r++){const i=t[r],o=this.fields_.get(i);o&&o.set(e[i])}}exportEditor(){this.serialize({mode:"export"})}field(e,t,r,i){const o=typeof r=="function"?r:void 0,u=typeof r=="object"&&r||i||{};o||(u.readOnly=!0,u.noExport=!0);const a=e.startsWith("/")?e.slice(1):e;this.fields_.set(a,{get:t,set:l=>{o&&o(l),this.noticeField(e)},opt:u})}fieldDir(e,t){const r=e;return this.field(r+"/",()=>null,void 0,{...t,isFolder:!0}),{dir:i=>this.fieldDir(`${r}/${i}`),field:(i,o,u,a)=>{this.field(`${r}/${i}`,o,u,a)}}}setField(e,t){this.deserialize({[e]:t})}getField(e,t){const r=this.fields_.get(e);if(r)return t=t||{mode:"view"},r.get(t)}getFieldOpt(e){const t=this.fields_.get(e);if(t)return t.opt}noticeField(e){this.emit("fields/update/"+e),this.emit("fields/update",[[e]])}}class q extends Se{constructor(e){super();c(this,"disableEdit");c(this,"order");c(this,"_entity");c(this,"_enabled");c(this,"_tag");c(this,"_disposed");this.disableEdit=!1,this._entity=e.entity,this._enabled=!0,this._disposed=!1,this._tag="",this.order=0,this.field("enabled",()=>this.enabled,t=>this.enabled=t,{hidden:!0,noExport:!0}),this.field("tag",()=>this.tag,t=>this._tag=t,{readOnly:!0,noExport:!0,hidden:t=>t==""})}get tag(){return this._tag}get entity(){return this._entity}set enabled(e){this._enabled=e}get enabled(){return this._enabled}update(e){this.enabled&&this.updateImpl(e)}updateImpl(e){}postUpdate(e){this.enabled&&this.postUpdateImpl(e)}postUpdateImpl(e){}beforeRender(e){this.enabled&&this.beforeRenderImpl(e)}beforeRenderImpl(e){}afterRender(e){this.enabled&&this.afterRenderImpl(e)}afterRenderImpl(e){}dispose(){this._disposed=!0,this.emit("dispose")}}class Ne extends Se{constructor(){super();c(this,"vertCount");c(this,"attributes");c(this,"vaoCache");this.vertCount=0,this.attributes=new Map,this.vaoCache=new Map}setAttribute(e,t,r,i){const o=this.attributes.get(e);return o&&o.buffer&&o.buffer.dispose(),this.attributes.set(e,{array:t,size:r,opt:i}),this.updateVertCount(),this}getAttribute(e){return this.attributes.get(e)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((e,t)=>{t=="index"||e.opt&&e.opt.instanceDivisor||(this.vertCount=Math.min(e.array.length/e.size,this.vertCount))})}createBuffers(e){this.attributes.forEach((t,r)=>{t.buffer||(t.buffer=new Ke(e).setData(t.array,r=="index"?"ibo":"vbo",t.opt&&t.opt.usage))})}requestUpdate(){this.vaoCache.clear()}dispose(){super.dispose(),this.attributes.forEach(e=>{var t;(t=e.buffer)==null||t.dispose()})}}const Or=`#include <common>\r
#include <packing>\r
#include <frag_h>\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
	#include <frag_out>\r
\r
}`,Mr=`#include <common>\r
#include <vert_h>\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
	#include <vert_out>\r
	\r
}`;class de extends Se{constructor(e){super();c(this,"name");c(this,"vert");c(this,"frag");c(this,"defines");c(this,"uniforms");c(this,"useLight");c(this,"depthTest");c(this,"depthWrite");c(this,"cullFace");c(this,"drawType");c(this,"blending");c(this,"visibilityFlag");c(this,"programCache");e=e||{},this.name=e.name||"",this.visibilityFlag={},this.setVisibility(e.phase||["shadowMap","deferred"]),this.useLight=!0,this.depthTest=!0,this.cullFace=!1,this.depthWrite=e.depthTest!==void 0?e.depthTest:!0,this.drawType=e.drawType||"TRIANGLES",this.blending=e.blending||"NORMAL",this.vert=e.vert||Mr,this.frag=e.frag||Or,this.defines=e.defines||{},this.uniforms=e.uniforms||{},this.programCache={}}setVisibility(e){this.visibilityFlag={shadowMap:e.indexOf("shadowMap")>-1,deferred:e.indexOf("deferred")>-1,forward:e.indexOf("forward")>-1,ui:e.indexOf("ui")>-1,envMap:e.indexOf("envMap")>-1,postprocess:e.indexOf("postprocess")>-1}}requestUpdate(){this.programCache={}}}const Dr=new Ne,Ir=new de;class ie extends q{constructor(e){super(e);c(this,"geometry");c(this,"material");const t=e.args||{};this.geometry=t.geometry||Dr,this.material=t.material||Ir,this.field("material",()=>this.material.name)}}class oe extends Se{constructor(e){super();c(this,"name");c(this,"position");c(this,"euler");c(this,"quaternion");c(this,"scale");c(this,"matrix");c(this,"matrixWorld");c(this,"matrixWorldPrev");c(this,"autoMatrixUpdate");c(this,"parent");c(this,"children");c(this,"components");c(this,"componentsSorted");c(this,"visible");c(this,"userData");this.name=e&&e.name||"",this.position=new w(0,0,0,1),this.euler=new Rt,this.quaternion=new ye(0,0,0,1),this.scale=new w(1,1,1),this.matrix=new U,this.matrixWorld=new U,this.matrixWorldPrev=new U,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.field("name",()=>this.name,t=>this.name=t),this.field("position",()=>this.position.getElm("vec3"),t=>this.position.setFromArray(t),{format:{type:"vector"}}),this.field("euler",()=>this.euler.getElm("vec3"),t=>this.euler.setFromArray(t),{format:{type:"vector"}}),this.field("scale",()=>this.scale.getElm("vec3"),t=>this.scale.setFromArray(t),{format:{type:"vector"}}),this.field("children",()=>this.children.map(t=>t.uuid),{hidden:!0}),this.field("components",()=>{const t=[];return this.components.forEach(r=>t.push(r.uuid)),t},{hidden:!0})}update(e){const t={...e};t.matrix=this.matrixWorld,this.updateImpl(e);for(let r=0;r<this.componentsSorted.length;r++)this.componentsSorted[r].update(t);this.autoMatrixUpdate&&this.updateMatrix();for(let r=0;r<this.children.length;r++)this.children[r].update(t)}updateImpl(e){}onBeforeRender(e){for(let t=0;t<this.componentsSorted.length;t++)this.componentsSorted[t].beforeRender(e);for(let t=0;t<this.children.length;t++)this.children[t].onBeforeRender(e)}onAfterRender(e){this.matrixWorldPrev.copy(this.matrixWorld);for(let t=0;t<this.componentsSorted.length;t++)this.componentsSorted[t].afterRender(e);for(let t=0;t<this.children.length;t++)this.children[t].onAfterRender(e)}add(e){e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),this.noticeField("children")}remove(e){this.children=this.children.filter(t=>t.uuid!=e.uuid),this.noticeField("children")}updateMatrix(e){this.parent&&e&&this.parent.updateMatrix(!0);const t=this.parent?this.parent.matrixWorld:new U;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(t)}decomposeMatrix(e){e.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(e){this.decomposeMatrix(this.matrix.clone().multiply(e))}lookAt(e){this.updateMatrix();const t=new U,r=new w;this.matrixWorld.decompose(r);const i=this.position.clone().add(e.clone().sub(r));t.lookAt(this.position,i,new w(0,1,0)),this.decomposeMatrix(t)}addComponent(e,...t){this.removeComponent(e);const[r]=t,i=new e({entity:this,args:r||{}});return this.components.set(e,i),this.componentsSorted.push(i),this.componentsSorted.sort((o,u)=>o.order-u.order),this.noticeField("components"),i}removeComponent(e){const t=this.components.get(e);t&&t.dispose(),this.components.delete(e),this.componentsSorted=this.componentsSorted.filter(r=>r!==t),this.noticeField("components")}removeComponentByUUID(e){for(const t of this.components){const r=t[0],i=t[1];if(i.uuid===e)return i.dispose(),this.components.delete(r),this.noticeField("components"),i}}getComponent(e){return this.components.get(e)}getComponentByUUID(e){for(const t of this.components.values())if(t.uuid===e)return t;return null}getComponentByTag(e){for(const t of this.components.values())if(t.tag===e)return t;return null}getComponentsByTag(e){const t=[];return this.components.forEach(r=>{r.tag==e&&t.push(r)}),t}findEntityByName(e){if(this.name==e)return this;for(let t=0;t<this.children.length;t++){const i=this.children[t].findEntityByName(e);if(i)return i}}findEntityByUUID(e){if(this.uuid==e)return this;for(let t=0;t<this.children.length;t++){const i=this.children[t].findEntityByUUID(e);if(i)return i}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(e){let t="/"+this.name;return e&&e.uuid==this.uuid||this.parent&&(t=this.parent.getScenePath(e)+t),t}noticeEventChilds(e,t){this.emit(e,t);for(let r=0;r<this.children.length;r++)this.children[r].noticeEventChilds(e,t)}noticeEventParent(e,t){this.emit(e,t),this.parent&&this.parent.noticeEventParent(e,t)}traverse(e){e(this),this.children.forEach(t=>t.traverse(e))}isVisibleTraverse(){return this.visible?this.parent?this.parent.isVisibleTraverse():!0:!1}dispose(){this.emit("dispose"),this.parent&&this.parent.remove(this),this.components.forEach(e=>{e.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(e=>{e.disposeRecursive()}),this.children=[]}}const zr=`#include <common>\r
\r
#include <packing>\r
#include <frag_h>\r
\r
#ifdef USE_COLOR\r
\r
	uniform vec4 uBaseColor;\r
\r
#endif\r
\r
#ifdef USE_COLOR_MAP\r
\r
	uniform sampler2D uBaseColorMap;\r
\r
#endif\r
\r
#ifdef USE_ROUGHNESS\r
\r
	uniform float uRoughness;\r
\r
#endif\r
\r
#ifdef USE_METALNESS\r
\r
	uniform float uMetalness;\r
\r
#endif\r
\r
#ifdef USE_NORMAL_MAP\r
\r
	uniform sampler2D uNormalMap;\r
\r
#endif\r
\r
#ifdef USE_TANGENT\r
\r
	in vec3 vTangent;\r
	in vec3 vBitangent;\r
\r
#endif\r
\r
#ifdef USE_MR_MAP\r
\r
	uniform sampler2D uMRMap;\r
\r
#endif\r
\r
#ifdef USE_EMISSION\r
\r
	uniform vec3 uEmission;\r
\r
#endif\r
\r
\r
#ifdef USE_EMISSION_MAP\r
\r
	uniform sampler2D uEmissionMap;\r
\r
#endif\r
\r
#ifdef USE_EMISSION_STRENGTH\r
\r
	uniform float uEmissionStrength;\r
\r
#endif\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
\r
	vec2 mapUv = vUv;\r
	mapUv.y = 1.0 - mapUv.y;\r
\r
	#ifdef USE_COLOR\r
\r
		outColor = uBaseColor;\r
\r
	#endif\r
\r
	#ifdef USE_COLOR_MAP\r
\r
		outColor = texture( uBaseColorMap, mapUv );\r
\r
	#endif\r
\r
	if( outColor.w < 0.5 ) discard;\r
\r
	outMetalic = 1.0;\r
\r
	#ifdef USE_MR_MAP\r
\r
		vec4 mr = texture( uMRMap, mapUv );\r
		outRoughness = mr.y;\r
		outMetalic = mr.z;\r
\r
	#endif\r
	\r
	#ifdef USE_ROUGHNESS\r
\r
		outRoughness = uRoughness;\r
\r
	#endif\r
\r
	#ifdef USE_NORMAL_MAP \r
\r
		vec3 outNormalMap = texture( uNormalMap, mapUv ).xyz;\r
		outNormalMap = outNormalMap * 2.0 - 1.0;\r
		\r
	#endif\r
\r
	#ifdef USE_METALNESS\r
\r
		outMetalic = uMetalness;\r
\r
	#endif\r
\r
	#ifdef USE_EMISSION\r
\r
		outEmission = uEmission;\r
\r
	#endif\r
\r
	#ifdef USE_EMISSION_MAP\r
\r
		vec4 emission = texture( uEmissionMap, mapUv );\r
		outEmission = emission.xyz;\r
\r
	#endif\r
\r
	#ifdef USE_EMISSION_STRENGTH\r
\r
		outEmission *= uEmissionStrength;\r
\r
	#endif\r
\r
	#include <frag_out>\r
\r
} `,Br=`#include <common>\r
#include <vert_h>\r
\r
#ifdef USE_TANGENT\r
\r
	layout ( location = 3 ) in vec4 tangent;\r
	out vec3 vTangent;\r
	out vec3 vBitangent;\r
\r
#endif\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
	#include <vert_out>\r
\r
	#ifdef USE_TANGENT\r
\r
		vTangent = (uModelMatrix * vec4(tangent.xyz, 0.0)).xyz;\r
		vBitangent = normalize( cross( vNormal, vTangent.xyz ) * tangent.w );\r
\r
	#endif\r
\r
}`,Ge=12,He=8,Fr=s=>{switch(s){case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"SCALAR":return 1;default:return 1}},Vr=s=>{switch(s){case"TEXCOORD_0":return"uv";default:return s.toLowerCase()}};class Lr extends ${constructor(e){super();c(this,"gl");this.gl=e}async load(e){const r=await(await fetch(e)).arrayBuffer(),i=new TextDecoder,o=i.decode(new Uint8Array(r,0,4)),u=new Map;let a=null;if(o=="glTF"){const _=new DataView(r),k=Ge,P={length:_.getUint32(k,!0),type:_.getUint32(k+4,!0)};if(P.type==1313821514){const O=Ge+He;a=JSON.parse(i.decode(new Uint8Array(r,O,P.length)))}if(r.byteLength>He+P.length+Ge){const O=Ge+He+P.length,A={length:_.getUint32(O,!0),type:_.getUint32(O+4,!0)};if(A.type==5130562){const N=O+He,D=r.slice(N,N+A.length);u.set(0,D)}}}else a=JSON.parse(i.decode(new Uint8Array(r)));if(!a)throw new Error("");const l=a,h=_=>{const k=u.get(_.buffer);return k?k.slice(_.byteOffset,_.byteOffset+_.byteLength):null},p=new Map;a.accessors&&a.accessors.forEach((_,k)=>{const{type:P}=_;if(!l.bufferViews)return;const O=l.bufferViews[_.bufferView],A=h(O);A&&p.set(k,{type:P,buffer:A})});const f=new Map,d=(l.images||[]).map((_,k)=>new Promise(P=>{if(_.bufferView!==void 0){if(!l.bufferViews)return;const O=l.bufferViews[_.bufferView],A=h(O);if(A){const N=new Blob([new Uint8Array(A)],{type:_.mimeType}),D=new Image;D.onload=()=>{P(_)},D.src=URL.createObjectURL(N),f.set(k,D)}}}));await Promise.all(d);const x=new Map,E=_=>{if(!l.textures)return null;const k=l.textures[_];if(k){const P=new M(this.gl),O=f.get(k.source);if(O)return P.attach(O),P}return null};l.materials&&l.materials.forEach((_,k)=>{const P=new de({frag:zr,vert:Br});if(_.normalTexture){const O=E(_.normalTexture.index);O&&(P.uniforms.uNormalMap={value:O,type:"1i"},P.defines.USE_NORMAL_MAP="")}if(_.pbrMetallicRoughness){const O=_.pbrMetallicRoughness;if(O.baseColorFactor&&(P.uniforms.uBaseColor={value:O.baseColorFactor,type:"4fv"},P.defines.USE_COLOR=""),O.baseColorTexture){const A=E(O.baseColorTexture.index);A&&(P.uniforms.uBaseColorMap={value:A,type:"1i"},P.defines.USE_COLOR_MAP="")}if(O.roughnessFactor!==void 0&&(P.uniforms.uRoughness={value:O.roughnessFactor,type:"1f"},P.defines.USE_ROUGHNESS=""),O.metallicFactor!==void 0&&(P.uniforms.uMetalness={value:O.metallicFactor,type:"1f"},P.defines.USE_METALNESS=""),O.metallicRoughnessTexture){const A=E(O.metallicRoughnessTexture.index);A&&(P.uniforms.uMRMap={value:A,type:"1i"},P.defines.USE_MR_MAP="")}}if(_.emissiveFactor&&(P.uniforms.uEmission={value:_.emissiveFactor,type:"3fv"},P.defines.USE_EMISSION=""),_.emissiveTexture){const O=E(_.emissiveTexture.index);O&&(P.uniforms.uEmissionMap={value:O,type:"1i"},P.defines.USE_EMISSION_MAP="")}_.extensions&&_.extensions.KHR_materials_emissive_strength&&(P.uniforms.uEmissionStrength={value:_.extensions.KHR_materials_emissive_strength.emissiveStrength,type:"1fv"},P.defines.USE_EMISSION_STRENGTH=""),x.set(k,P)});const y=new Map;l.meshes&&l.meshes.forEach((_,k)=>{const{primitives:P}=_;y.set(k,P.map(O=>{const A=new Ne;if(Object.keys(O.attributes).forEach(D=>{const j=O.attributes[D],B=p.get(j);B&&A.setAttribute(Vr(D),new Float32Array(B.buffer),Fr(B.type))}),O.indices!==void 0){const D=p.get(O.indices);D&&A.setAttribute("index",new Uint16Array(D.buffer),1)}let N=null;if(O.material!==void 0){const D=x.get(O.material);D&&(N=D)}return N||(N=new de),A.attributes.has("tangent")&&(N.defines.USE_TANGENT=""),{geometry:A,material:N}}))});const b=new Map,g=(_,k)=>{const P=new oe;k.translation&&P.position.set(k.translation[0],k.translation[1],k.translation[2]),k.rotation&&P.quaternion.set(k.rotation[0],k.rotation[1],k.rotation[2],k.rotation[3]),k.scale&&P.scale.set(k.scale[0],k.scale[1],k.scale[2]);const O=y.get(k.mesh);if(P.name=k.name,O)if(O.length==1){const A=O[0],N=P.addComponent(ie);N.geometry=A.geometry,N.material=A.material}else O.forEach((A,N)=>{const D=new oe;D.name=k.name+"_"+N;const j=D.addComponent(ie);j.geometry=A.geometry,j.material=A.material,P.add(D)});return k.children&&k.children.forEach(A=>{const N=b.get(A);N?P.add(N):l.nodes&&P.add(g(A,l.nodes[A]))}),b.set(_,P),P};l.nodes&&l.nodes.forEach((_,k)=>{g(k,_)});const R=new oe,S=l.scenes&&l.scenes[0];return S&&S.nodes&&S.nodes.forEach(_=>{const k=b.get(_);k&&R.add(k)}),{scene:R}}}class Ur extends ${constructor(e,t){super();c(this,"gl");c(this,"connection");c(this,"frame");c(this,"nodes");c(this,"curveGroups");c(this,"root");c(this,"gltf");c(this,"currentScene");this.gl=e,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},t&&this.connect(t)}connect(e,t){{const r=new WebSocket(e);r.onopen=this.onOpen.bind(this),r.onmessage=this.onMessage.bind(this),r.onclose=this.onClose.bind(this),r.onerror=i=>{console.error(i),this.emit("error")},this.connection={url:e,ws:r,gltfPath:t}}}disconnect(){this.connection&&(this.connection.ws.close(),this.connection.ws.onmessage=null,this.connection.ws.onclose=null,this.connection.ws.onopen=null,this.connection=void 0)}binaryStringToArrayBuffer(e){const t=new Uint8Array(e.length);for(let r=0;r<e.length;r++){const i=e.charCodeAt(r);t[r]=i}return t.buffer}async loadScene(e,t){this.currentScene=e,t&&await new Lr(this.gl).load(t).then(u=>{this.gltf=u,this.emit("gltfLoaded",[u])}),await new Promise(o=>{setTimeout(()=>{o(null)},100)}),this.frame.start=e.frame.start,this.frame.end=e.frame.end,this.frame.fps=e.frame.fps,this.curveGroups=[],this.nodes=[];const r=Object.keys(e.animations);for(let o=0;o<r.length;o++){const u=r[o],a=new Sr(u);e.animations[o].forEach(l=>{const h=new Pr;h.set(l.k.map(p=>{const f={B:"BEZIER",C:"CONSTANT",L:"LINEAR"}[p[0]],d=p[1];return new kr({x:d[0],y:d[1]},d[2]!==void 0&&{x:d[2],y:d[3]}||void 0,d[4]!==void 0&&{x:d[4],y:d[5]}||void 0,f)})),a.setFCurve(h,l.axis)}),this.curveGroups.push(a)}this.nodes=[];const i=o=>{const u={name:"",uniforms:{}};o.material&&(u.name=o.material.name||"",u.uniforms=o.material.uniforms||{});const a={name:o.name,class:o.class,parent:o.parent,children:[],animations:o.animation||{},position:o.position||[0,0,0],rotation:o.rotation||[0,0,0],scale:o.scale||[1,1,1],material:u,type:o.type,visible:o.visible},l=o.param;return l&&"position"in l?a.param={position:new Float32Array(this.binaryStringToArrayBuffer(atob(l.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(l.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(l.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(l.index)))}:a.param=l,o.children&&o.children.forEach(h=>{a.children.push(i(h))}),this.nodes.push(a),a};this.root=i(e.root),this.emit("sync/scene",[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(e){this.frame=e,this.emit("sync/timeline",[this.frame])}onOpen(e){}onMessage(e){{const t=JSON.parse(e.data);t.type=="sync/scene"?this.loadScene(t.data,this.connection&&this.connection.gltfPath):t.type=="sync/timeline"?this.onSyncTimeline(t.data):t.type=="event"&&this.emit("event/"+t.data.type)}}onClose(e){this.disconnect()}getCurveGroup(e){return this.curveGroups[e]}setFrame(e){this.onSyncTimeline({...this.frame,playing:!0,current:e})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(e=>{this.on("gltfLoaded",t=>{e(t)})})}dispose(){this.disconnect()}}class jr extends Ne{constructor(n){super();const e=[],t=[],r=[],i=[],o=[],{width:u,height:a,depth:l,segmentsWidth:h,segmentsHeight:p,segmentsDepth:f}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...n},d=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:u,h:a,d:l,segW:h,segH:p},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:u,h:a,d:l,segW:h,segH:p},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:l,h:a,d:u,segW:f,segH:p},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:l,h:a,d:u,segW:f,segH:p},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:u,h:l,d:a,segW:h,segH:f},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:u,h:l,d:a,segW:h,segH:f}];let x=0;for(const E of d){const y=E.normal,b=E.dir,g=E.up,R=E.segW,S=E.segH,_=E.w/2,k=E.h/2,P=E.d/2,O=E.w/R,A=E.h/S;for(let N=0;N<=S;N++)for(let D=0;D<=R;D++){const j=-_+D*O,B=-k+N*A,F=-P,z=D/R,T=N/S,I=j*-b[0]+B*g[0]+F*-y[0],J=j*-b[1]+B*g[1]+F*-y[1],te=j*-b[2]+B*g[2]+F*-y[2];if(e.push(I,J,te),t.push(...y),r.push(z,T),o.push(N/S*g[1]+Math.max(0,g[2])),N<S&&D<R){const fe=x+N*(R+1)+D,pe=x+(N+1)*(R+1)+D,be=x+(N+1)*(R+1)+(D+1),ge=x+N*(R+1)+(D+1);i.push(fe,pe,ge),i.push(pe,be,ge)}}x+=(R+1)*(S+1)}this.setAttribute("position",new Float32Array(e),3),this.setAttribute("normal",new Float32Array(t),3),this.setAttribute("uv",new Float32Array(r),2),this.setAttribute("posY",new Float32Array(o),1),this.setAttribute("index",new Uint16Array(i),1)}}class Gr extends Ne{constructor(n){super();const e=[],t=[],r=[],i=[],{height:o,radiusTop:u,radiusBottom:a,radSegments:l,heightSegments:h,caps:p}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...n};for(let f=0;f<=h+2;f++)for(let d=0;d<=l;d++){const x=Math.PI*2/l*d;if(f<=h){const E=1-f/h,y=(1-E)*u+E*a,b=Math.cos(x)*y,g=-(o/2)+o/h*f,R=Math.sin(x)*y;e.push(b,g,R),r.push(d/l,f/h);const S=new w(Math.cos(x),0,Math.sin(x)).normalize();if(t.push(S.x,S.y,S.z),f<h){const _=l+1;i.push(f*_+d,(f+1)*_+(d+1)%_,f*_+(d+1)%_,f*_+d,(f+1)*_+d,(f+1)*_+(d+1)%_)}}else{if(!p)continue;const E=f-h-1,y=E?u:a,b=Math.cos(x)*y,g=-(o/2)+o*E,R=Math.sin(x)*y;e.push(b,g,R),r.push((b+y)*.5/y,(R+y)*.5/y),t.push(0,-1+E*2,0);const S=(l+1)*(h+(E+1));d<=l-2&&(E==0?i.push(S,S+d,S+d+1):i.push(S,S+d+1,S+d))}}this.setAttribute("position",new Float32Array(e),3),this.setAttribute("normal",new Float32Array(t),3),this.setAttribute("uv",new Float32Array(r),2),this.setAttribute("index",new Uint16Array(i),1)}}class At extends Ne{constructor(n){super();const{width:e,height:t,widthSegments:r,heightSegments:i,floor:o}={width:1,height:1,widthSegments:1,heightSegments:1,...n},u=e/2,a=t/2,l=[],h=[],p=[],f=[];for(let d=0;d<=i;d++)for(let x=0;x<=r;x++){const E=x/r,y=d/i;if(o?(l.push(-u+e*E,0,a-t*y),h.push(0,1,0)):(l.push(-u+e*E,-a+t*y,0),h.push(0,0,1)),p.push(E,y),d>0&&x>0){const b=r+1,g=b*d+x,R=b*(d-1)+x-1;f.push(g,b*d+x-1,R,g,R,b*(d-1)+x)}}this.setAttribute("position",new Float32Array(l),3),this.setAttribute("normal",new Float32Array(h),3),this.setAttribute("uv",new Float32Array(p),2),this.setAttribute("index",new Uint16Array(f),1)}}class ln extends Ne{constructor(n){super();const e=[],t=[],r=[],i=[],{radius:o,widthSegments:u,heightSegments:a}={radius:.5,widthSegments:8,heightSegments:8,...n};for(let l=0;l<=a;l++){const h=l/a*Math.PI;for(let p=0;p<=u;p++){const f=p/u*Math.PI*2,d=Math.sin(h)*o,x=Math.cos(f)*d,E=-Math.cos(h)*o,y=-Math.sin(f)*d;e.push(x,E,y),r.push(p/u,l/a);const b=new w(x,E,y).normalize();if(t.push(b.x,b.y,b.z),p<u&&l<a){const g=u+1;i.push(l*g+p,l*g+(p+1)%g,(l+1)*g+(p+1)%g,l*g+p,(l+1)*g+(p+1)%g,(l+1)*g+p)}}}for(let l=0;l<i.length;l++)i[l]=Math.min(e.length/3-1,i[l]);this.setAttribute("position",new Float32Array(e),3),this.setAttribute("normal",new Float32Array(t),3),this.setAttribute("uv",new Float32Array(r),2),this.setAttribute("index",new Uint16Array(i),1)}}class Ct extends q{constructor(e){super(e);c(this,"cameraType");c(this,"fov");c(this,"aspect");c(this,"near");c(this,"far");c(this,"orthWidth");c(this,"orthHeight");c(this,"projectionMatrix");c(this,"viewMatrix");c(this,"projectionMatrixPrev");c(this,"viewMatrixPrev");c(this,"needsUpdateProjectionMatrix");c(this,"displayOut");c(this,"viewPort");this.cameraType="perspective",this.viewMatrix=new U,this.projectionMatrix=new U,this.viewMatrixPrev=new U,this.projectionMatrixPrev=new U,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.field("fov",()=>this.fov,t=>this.fov=t,{noExport:!0}),this._tag="camera"}updateProjectionMatrix(){this.cameraType=="perspective"?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}beforeRenderImpl(e){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix()}afterRenderImpl(e){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}class Hr extends Ct{constructor(e){super(e);c(this,"renderTarget");c(this,"viewMatrixOffset");this.renderTarget=null,this.viewMatrixOffset=new ye().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100}beforeRenderImpl(e){super.beforeRenderImpl(e),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}class Ae extends Hr{constructor(e){super(e);c(this,"lightType");c(this,"color");c(this,"intensity");c(this,"castShadow");c(this,"shadowMapSize");c(this,"angle");c(this,"blend");c(this,"distance");c(this,"decay");this.lightType="spot",this.cameraType="perspective",this.color=new w(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new w(1024,1024),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field("intensity",()=>this.intensity,t=>this.intensity=t,{noExport:!0}),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}setShadowMap(e){this.renderTarget=e,this.renderTarget.setSize(this.shadowMapSize)}setShadowMapSize(e){this.shadowMapSize.copy(e),this.renderTarget&&this.renderTarget.setSize(this.shadowMapSize)}lookAt(e){this.entity.lookAt(e),this.entity.quaternion.multiply(new ye().setFromEuler(new Rt(Math.PI/2)))}}class Ve extends q{constructor(e){super(e);c(this,"node");c(this,"rotationOffsetX");c(this,"animations");c(this,"uniforms");c(this,"uniformCurves");c(this,"transformAutoUpdate");c(this,"_blidge");c(this,"_cameraComponent");c(this,"_lightComponent");this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=e.args.blidge,this.node=e.args.node,this.node.type=="camera"&&(this.rotationOffsetX=-Math.PI/2);const t=Object.keys(this.node.animations);for(let o=0;o<t.length;o++){const u=t[o];this.animations.set(u,this._blidge.getCurveGroup(this.node.animations[u]))}const r=Object.keys(this.node.material.uniforms);for(let o=0;o<r.length;o++){const u=r[o],a=this.node.material.uniforms[u],l=this._blidge.curveGroups[a];l&&(this.uniformCurves.set(u,l),this.uniforms[u]={type:"4fv",value:l.value})}const i=this.entity;if(i.name=this.node.name,i.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),i.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},"YZX"),i.quaternion.updated=!1,i.euler.setFromQuaternion(i.quaternion),i.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type=="cube"){const o=i.addComponent(ie),u=this.node.param;o.geometry=new jr({width:u.x,height:u.y,depth:u.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type=="sphere"){const o=i.addComponent(ie),u=this.node.param;o.geometry=new ln({radius:u.r,widthSegments:32,heightSegments:16})}else if(this.node.type=="cylinder"){const o=i.addComponent(ie);o.geometry=new Gr}else if(this.node.type=="plane"){const o=i.addComponent(ie),u=this.node.param;o.geometry=new At({width:u.x,height:u.y})}else if(this.node.type=="mesh"){const o=i.addComponent(ie),u=this.node.param,a=new Ne;a.setAttribute("position",u.position,3),a.setAttribute("uv",u.uv,2),a.setAttribute("normal",u.normal,3),a.setAttribute("index",u.index,3),o.geometry=a}else if(this.node.type=="gltf"){const o=i.addComponent(ie);this._blidge.gltfPrm.then(u=>{const a=u.scene.findEntityByName(this.node.name);if(a){const l=a.getComponent(ie);l&&(o.geometry=l.geometry,o.material=l.material)}i.noticeEventParent("update/blidge/scene",[i])})}if(this.node.type=="light"){const o=this.node.param;this._lightComponent=i.addComponent(Ae),this._lightComponent.deserialize({...o,lightType:o.type,color:new w().copy(o.color),castShadow:o.shadowMap})}if(this.node.type=="camera"&&(this._cameraComponent=i.getComponentsByTag("camera")[0],this._cameraComponent)){const o=this.node.param;this._cameraComponent.fov=o.fov}i.visible=this.node.visible,this.field("type",()=>this.node.type,void 0,{noExport:!0,readOnly:!0}),this.field("param",()=>JSON.stringify(this.node.param),void 0,{noExport:!0,readOnly:!0})}updateImpl(e){if(!this._blidge||!this.node)return;const t=e.timeCode*this._blidge.frame.fps;if(this.animations.forEach(i=>{i.setFrame(t)}),this.transformAutoUpdate){const i=this.animations.get("position");if(i){const a=i.value;i.getFCurve("x")&&(this.entity.position.x=a.x),i.getFCurve("y")&&(this.entity.position.y=a.y),i.getFCurve("z")&&(this.entity.position.z=a.z)}const o=this.animations.get("rotation");if(o){const a={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},l=o.value;o.getFCurve("x")&&(a.x=l.x),o.getFCurve("y")&&(a.y=l.y),o.getFCurve("z")&&(a.z=l.z),this.entity.quaternion.setFromEuler({x:a.x+this.rotationOffsetX,y:a.y,z:a.z},"YZX")}const u=this.animations.get("scale");if(u){const a=u.setFrame(t).value;u.getFCurve("x")&&(this.entity.scale.x=a.x),u.getFCurve("y")&&(this.entity.scale.y=a.y),u.getFCurve("z")&&(this.entity.scale.z=a.z)}}const r=this.animations.get("hide");if(r&&(this.entity.visible=r.value.x<.5),this._lightComponent){const i=this.animations.get("color");i&&this._lightComponent.color.copy(i.setFrame(t).value)}this.uniformCurves.forEach((i,o)=>{this.uniforms[o].value=i.setFrame(t).value})}}class he extends Se{constructor(e){super();c(this,"name");c(this,"enabled");c(this,"_passes");const t=e||{};this.name=t.name||"",this.enabled=!0,this._passes=e&&e.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(e=>e.enabled)}get output(){for(let e=this._passes.length-1;e>=0;e--){const t=this._passes[e];if(!t.passThrough&&t.enabled)return t.renderTarget}return null}resize(e){if(this._passes)for(let t=0;t<this._passes.length;t++)this._passes[t].resize(e)}dispose(){this.emit("dispose")}}class Pt extends q{constructor(e){super(e);c(this,"_resolution");c(this,"_postProcesses");c(this,"_postProcessesDict");this._postProcesses=[],this._postProcessesDict=new Map,this._resolution=new w,this.field("postprocess",()=>this._postProcesses.map((t,r)=>t.enabled),t=>{t.forEach((r,i)=>{const o=this._postProcesses[i];o&&(o.enabled=r)})},{format:{type:"array",labels:(t,r)=>this._postProcesses[r].name}})}get postProcesses(){return this._postProcesses}add(e){return this.postProcesses.push(e),e.resize(this._resolution),e}remove(e){const t=this._postProcesses.indexOf(e);t>-1&&this._postProcesses.splice(t,1)}resize(e){this._resolution.copy(e),this.postProcesses.forEach(t=>{t.resize(e)})}}const Xr=`#include <common>\r
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
}`,Wr=`layout ( location = 0 ) in vec3 position;\r
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
}`;class G extends de{constructor(e,t){super({...t,frag:t.frag||Xr,vert:t.vert||Wr});c(this,"enabled");c(this,"renderTarget");c(this,"backBufferOverride");c(this,"clearColor");c(this,"clearDepth");c(this,"resolutionRatio");c(this,"passThrough");c(this,"resolution");c(this,"resolutionInv");c(this,"viewPort");c(this,"_fixedResolution");this.enabled=!0,this._fixedResolution=t.fixedResotluion?t.fixedResotluion.clone():null,this.resolution=new w,this.resolutionInv=new w,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:"2fv"},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:"2fv"},this.renderTarget=t.renderTarget!==void 0?t.renderTarget:new H(e).setTexture([new M(e).setting({magFilter:e.LINEAR,minFilter:e.LINEAR})]),this.clearColor=t.clearColor??null,this.clearDepth=t.clearDepth??null,this.depthTest=t.depthTest!==void 0?t.depthTest:!1,this.resolutionRatio=t.resolutionRatio||1,this.passThrough=t.passThrough??!1,this.viewPort=t.viewPort||null,this.backBufferOverride=t.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(e){this._fixedResolution=e,this.resize(e||new w)}onAfterRender(){}resize(e){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(e).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(e){this.renderTarget=e,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}var Y;(s=>{s.assign=(n,...e)=>{for(let t=0;t<e.length;t++)e[t]!=null&&Object.assign(n,e[t]);return n},s.merge=(...n)=>{const e={};return(0,s.assign)(e,...n)}})(Y||(Y={}));class xt extends Ct{constructor(e){super(e);c(this,"dofParams");c(this,"_gl");c(this,"_renderTarget");c(this,"_gBuffer");c(this,"_resolution");this.dofParams={focusDistance:.5,kFilmHeight:.008};const t=e.args.gl;this._gl=t,this._resolution=new w,this._gBuffer=new H(t),this._gBuffer.setTexture([new M(t).setting({type:t.FLOAT,internalFormat:t.RGBA32F,format:t.RGBA,magFilter:t.NEAREST,minFilter:t.NEAREST}),new M(t).setting({type:t.FLOAT,internalFormat:t.RGBA32F,format:t.RGBA}),new M(t),new M(t),new M(t).setting({type:t.FLOAT,internalFormat:t.RGBA32F,format:t.RGBA})]);const r=new H(t,{disableDepthBuffer:!0});r.setTexture([new M(t).setting({type:t.FLOAT,internalFormat:t.RGBA16F,format:t.RGBA}),new M(t).setting({type:t.FLOAT,internalFormat:t.RGBA16F,format:t.RGBA})]);const i=new H(t,{disableDepthBuffer:!0});i.setDepthTexture(this._gBuffer.depthTexture),i.setTexture([r.textures[0],this._gBuffer.textures[0],this._gBuffer.textures[4]]);const o=new H(t,{disableDepthBuffer:!0});o.setDepthTexture(this._gBuffer.depthTexture),o.setTexture([new M(t)]);const u=new H(t);u.setTexture([new M(t).setting({type:t.FLOAT,internalFormat:t.RGBA32F,format:t.RGBA,magFilter:t.NEAREST,minFilter:t.NEAREST})]),this._renderTarget={gBuffer:this._gBuffer,shadingBuffer:r,forwardBuffer:i,uiBuffer:o,normalBuffer:u},this.resize(this._resolution)}get resolution(){return this._resolution}get gBuffer(){return this._gBuffer}get renderTarget(){return this._renderTarget}resize(e){e.x==this._resolution.x&&e.y==this._resolution.y||(this._resolution.copy(e),this.aspect=e.x/e.y,this._renderTarget&&(this._renderTarget.gBuffer.setSize(this._resolution),this._renderTarget.shadingBuffer.setSize(this._resolution),this._renderTarget.forwardBuffer.setSize(this._resolution),this._renderTarget.uiBuffer.setSize(this._resolution),this._renderTarget.normalBuffer.setSize(this._resolution)),this.needsUpdateProjectionMatrix=!0)}}const Zr=new de;class cn extends q{constructor(e){super(e);c(this,"material");this.material=e.args||Zr,this._tag="materialOverride"}}const Yr=`#define PI 3.14159265359\r
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
	float metalic;\r
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
}`,Jr=`struct DirectionalLight {\r
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
}`,Kr=`\r
// https://www.shadertoy.com/view/3tcyD7\r
\r
vec3 noiseCyc( vec3 p ){\r
\r
  vec4 n = vec4(0);\r
  float a=1.0;\r
\r
  for( int i = 0; i < 8; i++ ){\r
    p += sin( p.zxy );\r
    n += vec4(cross(sin(p.xyz), cos(p.yzx)), 1.0) * a;\r
    a *= 0.6;\r
    p *= 1.5;\r
  }\r
\r
  n.xyz /= n.w;\r
\r
  return n.xyz;\r
\r
}`,qr=`\r
// https://github.com/ashima/webgl-noise/blob/master/src/noise4D.glsl\r
\r
//\r
// Description : Array and textureless GLSL 2D/3D/4D simplex \r
//               noise functions.\r
//      Author : Ian McEwan, Ashima Arts.\r
//  Maintainer : stegu\r
//     Lastmod : 20110822 (ijm)\r
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r
//               Distributed under the MIT License. See LICENSE file.\r
//               https://github.com/ashima/webgl-noise\r
//               https://github.com/stegu/webgl-noise\r
// \r
\r
vec4 mod289(vec4 x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
\r
vec3 mod289(vec3 x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0;\r
}\r
\r
float mod289(float x) {\r
  return x - floor(x * (1.0 / 289.0)) * 289.0; }\r
\r
vec4 permute(vec4 x) {\r
     return mod289(((x*34.0)+10.0)*x);\r
}\r
\r
float permute(float x) {\r
     return mod289(((x*34.0)+10.0)*x);\r
}\r
\r
vec4 taylorInvSqrt(vec4 r)\r
{\r
  return 1.79284291400159 - 0.85373472095314 * r;\r
}\r
\r
float taylorInvSqrt(float r)\r
{\r
  return 1.79284291400159 - 0.85373472095314 * r;\r
}\r
\r
vec4 grad4(float j, vec4 ip)\r
  {\r
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\r
  vec4 p,s;\r
\r
  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\r
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\r
  s = vec4(lessThan(p, vec4(0.0)));\r
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; \r
\r
  return p;\r
  }\r
						\r
// (sqrt(5) - 1)/4 = F4, used once below\r
#define F4 0.309016994374947451\r
\r
float noiseSimplex(vec4 v)\r
  {\r
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\r
                        0.276393202250021,  // 2 * G4\r
                        0.414589803375032,  // 3 * G4\r
                       -0.447213595499958); // -1 + 4 * G4\r
\r
// First corner\r
  vec4 i  = floor(v + dot(v, vec4(F4)) );\r
  vec4 x0 = v -   i + dot(i, C.xxxx);\r
\r
// Other corners\r
\r
// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\r
  vec4 i0;\r
  vec3 isX = step( x0.yzw, x0.xxx );\r
  vec3 isYZ = step( x0.zww, x0.yyz );\r
//  i0.x = dot( isX, vec3( 1.0 ) );\r
  i0.x = isX.x + isX.y + isX.z;\r
  i0.yzw = 1.0 - isX;\r
//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\r
  i0.y += isYZ.x + isYZ.y;\r
  i0.zw += 1.0 - isYZ.xy;\r
  i0.z += isYZ.z;\r
  i0.w += 1.0 - isYZ.z;\r
\r
  // i0 now contains the unique values 0,1,2,3 in each channel\r
  vec4 i3 = clamp( i0, 0.0, 1.0 );\r
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\r
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\r
\r
  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\r
  //  x1 = x0 - i1  + 1.0 * C.xxxx\r
  //  x2 = x0 - i2  + 2.0 * C.xxxx\r
  //  x3 = x0 - i3  + 3.0 * C.xxxx\r
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\r
  vec4 x1 = x0 - i1 + C.xxxx;\r
  vec4 x2 = x0 - i2 + C.yyyy;\r
  vec4 x3 = x0 - i3 + C.zzzz;\r
  vec4 x4 = x0 + C.wwww;\r
\r
// Permutations\r
  i = mod289(i); \r
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);\r
  vec4 j1 = permute( permute( permute( permute (\r
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\r
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\r
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\r
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\r
\r
// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\r
// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\r
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\r
\r
  vec4 p0 = grad4(j0,   ip);\r
  vec4 p1 = grad4(j1.x, ip);\r
  vec4 p2 = grad4(j1.y, ip);\r
  vec4 p3 = grad4(j1.z, ip);\r
  vec4 p4 = grad4(j1.w, ip);\r
\r
// Normalise gradients\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r
  p0 *= norm.x;\r
  p1 *= norm.y;\r
  p2 *= norm.z;\r
  p3 *= norm.w;\r
  p4 *= taylorInvSqrt(dot(p4,p4));\r
\r
// Mix contributions from the five corners\r
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\r
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\r
  m0 = m0 * m0;\r
  m1 = m1 * m1;\r
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))\r
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\r
\r
  }\r
\r
//\r
// Description : Array and textureless GLSL 2D/3D/4D simplex \r
//               noise functions.\r
//      Author : Ian McEwan, Ashima Arts.\r
//  Maintainer : stegu\r
//     Lastmod : 20201014 (stegu)\r
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\r
//               Distributed under the MIT License. See LICENSE file.\r
//               https://github.com/ashima/webgl-noise\r
//               https://github.com/stegu/webgl-noise\r
// \r
\r
\r
float noiseSimplex(vec3 v)\r
  { \r
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\r
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\r
\r
// First corner\r
  vec3 i  = floor(v + dot(v, C.yyy) );\r
  vec3 x0 =   v - i + dot(i, C.xxx) ;\r
\r
// Other corners\r
  vec3 g = step(x0.yzx, x0.xyz);\r
  vec3 l = 1.0 - g;\r
  vec3 i1 = min( g.xyz, l.zxy );\r
  vec3 i2 = max( g.xyz, l.zxy );\r
\r
  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\r
  //   x1 = x0 - i1  + 1.0 * C.xxx;\r
  //   x2 = x0 - i2  + 2.0 * C.xxx;\r
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\r
  vec3 x1 = x0 - i1 + C.xxx;\r
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\r
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\r
\r
// Permutations\r
  i = mod289(i); \r
  vec4 p = permute( permute( permute( \r
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\r
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \r
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\r
\r
// Gradients: 7x7 points over a square, mapped onto an octahedron.\r
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\r
  float n_ = 0.142857142857; // 1.0/7.0\r
  vec3  ns = n_ * D.wyz - D.xzx;\r
\r
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\r
\r
  vec4 x_ = floor(j * ns.z);\r
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\r
\r
  vec4 x = x_ *ns.x + ns.yyyy;\r
  vec4 y = y_ *ns.x + ns.yyyy;\r
  vec4 h = 1.0 - abs(x) - abs(y);\r
\r
  vec4 b0 = vec4( x.xy, y.xy );\r
  vec4 b1 = vec4( x.zw, y.zw );\r
\r
  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\r
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\r
  vec4 s0 = floor(b0)*2.0 + 1.0;\r
  vec4 s1 = floor(b1)*2.0 + 1.0;\r
  vec4 sh = -step(h, vec4(0.0));\r
\r
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\r
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\r
\r
  vec3 p0 = vec3(a0.xy,h.x);\r
  vec3 p1 = vec3(a0.zw,h.y);\r
  vec3 p2 = vec3(a1.xy,h.z);\r
  vec3 p3 = vec3(a1.zw,h.w);\r
\r
//Normalise gradients\r
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\r
  p0 *= norm.x;\r
  p1 *= norm.y;\r
  p2 *= norm.z;\r
  p3 *= norm.w;\r
\r
// Mix final noise value\r
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\r
  m = m * m;\r
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \r
                                dot(p2,x2), dot(p3,x3) ) );\r
  }`,Qr=`\r
// https://www.shadertoy.com/view/4dS3Wd\r
\r
float hashv(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }\r
float hashv(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }\r
\r
#define NUM_NOISE_OCTAVES 5\r
\r
float noiseValue(vec3 x) {\r
    const vec3 step = vec3(110, 241, 171);\r
\r
    vec3 i = floor(x);\r
    vec3 f = fract(x);\r
 \r
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the \r
    // incremental change to the 1D based on the 3D -> 1D wrapping\r
    float n = dot(i, step);\r
\r
    vec3 u = f * f * (3.0 - 2.0 * f);\r
    return mix(mix(mix( hashv(n + dot(step, vec3(0, 0, 0))), hashv(n + dot(step, vec3(1, 0, 0))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 0))), hashv(n + dot(step, vec3(1, 1, 0))), u.x), u.y),\r
               mix(mix( hashv(n + dot(step, vec3(0, 0, 1))), hashv(n + dot(step, vec3(1, 0, 1))), u.x),\r
                   mix( hashv(n + dot(step, vec3(0, 1, 1))), hashv(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);\r
}\r
\r
float fbm(vec3 x) {\r
	float v = 0.0;\r
	float a = 0.5;\r
	vec3 shift = vec3(100);\r
	for (int i = 0; i < NUM_NOISE_OCTAVES; ++i) {\r
		v += a * noiseValue(x);\r
		x = x * 2.0 + shift;\r
		a *= 0.5;\r
    if( i == -1 ) break;\r
	}\r
	return v;\r
}\r
\r
float fbm(float x) {\r
  return fbm(vec3(x));\r
}`,$r=`// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15\r
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
}`,ei=`// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
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
}`,ti=`vec3 N( vec3 pos, float delta ){\r
\r
    return normalize( vec3(\r
		D( vec3( pos.x + delta, pos.y, pos.z ) ).d - D( vec3( pos.x - delta, pos.y, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y + delta, pos.z ) ).d - D( vec3( pos.x, pos.y - delta, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y, pos.z + delta ) ).d - D( vec3( pos.x, pos.y, pos.z - delta ) ).d\r
	) );\r
	\r
}`,ni=`mat2 rotate(float rad) {\r
  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\r
}\r
\r
void rotate( float rad, inout vec2 pos, inout vec2 normal ) {\r
	\r
	mat2 rot = rotate( rad );\r
	\r
	pos *= rot;\r
	normal *= rot;\r
\r
}\r
\r
mat3 makeRotationDir( vec3 direction, vec3 up ) {\r
\r
	vec3 xaxis = normalize( cross( up, direction ) );\r
	vec3 yaxis = normalize( cross( direction, xaxis ) );\r
\r
	return mat3(\r
		xaxis.x, yaxis.x, direction.x,\r
		xaxis.y, yaxis.y, direction.y,\r
		xaxis.z, yaxis.z, direction.z\r
	);\r
\r
}`,ri=`// https://iquilezles.org/articles/distfunctions/\r
\r
float sdSphere( vec3 p, float s )\r
{\r
  return length(p)-s;\r
}\r
\r
float sdBox( vec3 p, vec3 b )\r
{\r
  vec3 q = abs(p) - b;\r
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);\r
}\r
\r
float sdPyramid( vec3 p, float h)\r
{\r
  float m2 = h*h + 0.25;\r
    \r
  p.xz = abs(p.xz);\r
  p.xz = (p.z>p.x) ? p.zx : p.xz;\r
  p.xz -= 0.5;\r
\r
  vec3 q = vec3( p.z, h*p.y - 0.5*p.x, h*p.x + 0.5*p.y);\r
   \r
  float s = max(-q.x,0.0);\r
  float t = clamp( (q.y-0.5*p.z)/(m2+0.25), 0.0, 1.0 );\r
    \r
  float a = m2*(q.x+s)*(q.x+s) + q.y*q.y;\r
  float b = m2*(q.x+0.5*t)*(q.x+0.5*t) + (q.y-m2*t)*(q.y-m2*t);\r
    \r
  float d2 = min(q.y,-q.x*m2-q.y*0.5) > 0.0 ? 0.0 : min(a,b);\r
    \r
  return sqrt( (d2+q.z*q.z)/m2 ) * sign(max(q.z,-p.y));\r
}\r
\r
float sdPlane( vec3 p, vec3 n, float h )\r
{\r
  // n must be normalized\r
  return dot(p,n) + h;\r
}\r
\r
float sdCappedCylinder( vec3 p, float h, float r )\r
{\r
  vec2 d = abs(vec2(length(p.xz),p.y)) - vec2(r,h);\r
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));\r
}\r
\r
float sdInfinityCylinder( vec3 p, vec3 c )\r
{\r
  return length(p.xz-c.xy)-c.z;\r
}\r
\r
float sdRoundedCylinder( vec3 p, float ra, float rb, float h )\r
{\r
  vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );\r
  return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;\r
}\r
\r
float sdVesicaSegment( in vec3 p, in vec3 a, in vec3 b, in float w )\r
{\r
    vec3  c = (a+b)*0.5;\r
    float l = length(b-a);\r
    vec3  v = (b-a)/l;\r
    float y = dot(p-c,v);\r
    vec2  q = vec2(length(p-c-y*v),abs(y));\r
    \r
    float r = 0.5*l;\r
    float d = 0.5*(r*r-w*w)/w;\r
    vec3  h = (r*q.x<d*(q.y-r)) ? vec3(0.0,r,0.0) : vec3(-d,0.0,d+w);\r
 \r
    return length(q-h.xy) - h.z;\r
}\r
\r
float sdTorus( vec3 p, vec2 t )\r
{\r
  vec2 q = vec2(length(p.xz)-t.x,p.y);\r
  return length(q)-t.y;\r
}\r
\r
// operators\r
\r
float opAdd( float d1, float d2 ) {\r
	return d1 < d2 ? d1 : d2;\r
}\r
\r
vec2 opAdd( vec2 d1, vec2 d2 ) {\r
	return d1.x < d2.x ? d1 : d2;\r
}\r
\r
float opSub( float d1, float d2 ) {\r
	d2 *= -1.0;\r
	return d1 < d2 ? d2 : d1;\r
}\r
\r
vec2 opSub( vec2 d1, vec2 d2 ) {\r
	d2 *= -1.0;\r
	return d1.x < d2.x ? d2 : d1;\r
}\r
\r
vec2 opAnd( vec2 d1, vec2 d2 ) {\r
	return d1.x < d2.x ? d2 : d1;\r
}\r
\r
float opAnd( float d1, float d2 ) {\r
	return d1 < d2 ? d2 : d1;\r
}\r
\r
float opSmoothAdd( float d1, float d2, float k ) {\r
  float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );\r
  return mix( d2, d1, h ) - k*h*(1.0-h);\r
}\r
\r
float opSmoothSub( float d1, float d2, float k ) {\r
  float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );\r
  return mix( d2, -d1, h ) + k*h*(1.0-h);\r
}\r
\r
float opRound( float d, float rad ) {\r
  return d - rad;\r
}\r
\r
// utils\r
\r
// https://neort.io/product/bvcrf5s3p9f7gigeevf0\r
\r
vec2 pmod(vec2 p, float n)\r
{\r
  float a=mod(atan(p.y, p.x),TPI/n)-.5 *TPI/n;\r
  return length(p)*vec2(sin(a),cos(a));\r
}\r
`,ii="in vec2 vUv;\rin vec3 vNormal;\rin vec3 vViewNormal;\rin vec3 vPos;\rin vec3 vMVPosition;\rin vec3 vMVPPosition;\rin vec2 vVelocity;\r\runiform mat4 uModelMatrix;\runiform mat4 uModelMatrixInverse;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform vec3 uCameraPosition;\runiform vec2 uResolution;\r\r#ifdef IS_DEPTH\r	uniform float uCameraNear;\r	uniform float uCameraFar;\r#endif\r\r#ifdef IS_DEFERRED\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r	layout (location = 3) out vec4 outColor3;\r	layout (location = 4) out vec4 outColor4;\r#endif\r\r#ifdef IS_FORWARD\r	uniform sampler2D uDeferredTexture;\r	uniform vec2 uDeferredResolution;\r#endif\r\r#if defined(IS_FORWARD) || defined(IS_DEPTH)\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r#endif",si="vec4 outColor = vec4(1.0);\rvec3 outNormal = normalize(vNormal);\rvec3 outNormalMap = vec3( 0.0 );\rfloat outSSN = 0.0;\rvec3 outEmission = vec3(0.0);\rfloat outRoughness = 0.5;\rfloat outMetalic = 0.0;\rvec3 outPos = vPos;\rfloat outEnv = 1.0;",oi="#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r#endif\r\r#ifdef IS_DEPTH\r	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r	outColor0 = vec4(floatToRGBA( depth_z ));\r#endif\r\r#ifdef IS_DEFERRED\r\r	#ifdef USE_NORMAL_MAP \r\r		vec3 tangent;\r		vec3 bitangent;\r\r		#ifdef USE_TANGENT\r\r			tangent = normalize( vTangent );\r			bitangent = normalize( vBitangent );\r\r		#else\r\r			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r			bitangent = cross(tangent, outNormal);\r\r		#endif\r\r		#ifdef DOUBLE_SIDED\r\r			tangent *= faceDirection;\r			bitangent *= faceDirection;\r			\r		#endif\r\r		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r		outNormal = normalize( vTBN * outNormalMap );\r\r	#endif\r\r	vec4 mvp = uProjectionMatrix * mv;\r	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r	outColor0 = vec4( outPos, outEmission.x );\r	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r	outColor2 = vec4( outColor.xyz, 0.0 );\r	outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );\r	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r#endif\r\r#ifdef IS_FORWARD\r	outColor0 = outColor;\r	outColor1 = vec4(outPos, 1.0);\r	outColor2 = vec4(vVelocity, 0.0, 1.0);\r#endif",ai="vec3 refDir = reflect( -geo.viewDir, geo.normal );\rfloat dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\rfloat EF = mix( fresnel( dNV ), 1.0, mat.metalic );\routColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;\routColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );",li="Geometry geo = Geometry(\r	outPos,\r	outNormal,\r	0.0,\r	normalize( uCameraPosition - outPos ),\r	vec3( 0.0 ),\r	0.0\r);\r\rMaterial mat = Material(\r	vec3( 1.0 ),\r	outRoughness,\r	outMetalic,\r	outEmission,\r	mix( outColor.xyz, vec3( 0.0, 0.0, 0.0 ), outMetalic ),\r	mix( vec3( 1.0, 1.0, 1.0 ), outColor.xyz, outMetalic ),\r	outEnv\r);\r\routColor.xyz *= 0.0;",ci="// required common, light,\r\rfloat shadow;\r\r// direcitonalLight\r\rLight light;\rLightCamera lightCamera;\r\r#if NUM_LIGHT_DIR > 0 \r\r	DirectionalLight dLight;\r\r	#pragma loop_start NUM_LIGHT_DIR\r\r		dLight = directionalLight[ LOOP_INDEX ];\r		light.direction = dLight.direction;\r		light.color = dLight.color;\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_DIR\r\r			shadow = getShadowSmooth( tex0.xyz, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r		\r		// lighting\r\r		outColor.xyz += RE( geo, mat, light ) * shadow;\r\r	#pragma loop_end\r\r#endif\r\r#if NUM_LIGHT_SPOT > 0\r\r	SpotLight sLight;\r	\r	vec3 spotDirection;\r	float spotDistance;\r	float spotAngleCos;\r	float spotAttenuation;\r	vec3 radiance;\r\r	#pragma loop_start NUM_LIGHT_SPOT\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_SPOT\r\r			shadow = getShadowSmooth( geo.position, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r\r		// lighting\r\r		sLight = uSpotLight[ LOOP_INDEX ];\r\r		spotDirection = normalize(sLight.position - geo.position);\r		spotDistance = length( sLight.position - geo.position );\r		spotAngleCos = dot( sLight.direction, spotDirection );\r		spotAttenuation = 0.0;\r\r		if( spotAngleCos > sLight.angle ) {\r\r			spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );\r\r		}\r\r		light.direction = spotDirection;\r		light.color = sLight.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay );\r\r		radiance = RE( geo, mat, light );\r		outColor.xyz += shadow * radiance;\r\r	#pragma loop_end\r\r#endif",ui="struct SDFResult {\r	float d;\r	vec3 pos;\r	float mat;\r};",mi="vec4 worldNormal = normalize(uModelMatrix * vec4( outNormal, 0.0 ));\rvec4 viewNormal = normalize(uViewMatrix * worldNormal);\routNormal = worldNormal.xyz;\r\rvec4 modelPosition = uModelMatrix * vec4( rayPos, 1.0 );\rvec4 mvpPosition = uProjectionMatrix * uViewMatrix * modelPosition;\routPos = modelPosition.xyz;\rgl_FragDepth =  ( mvpPosition.z / mvpPosition.w ) * 0.5 + 0.5;",hi="vec3 rayPos = ( uModelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;\rvec3 rayDir = normalize( ( uModelMatrixInverse * vec4( normalize( vPos - uCameraPosition ), 0.0 ) ).xyz );",di="vec3 rayPos = ( uModelMatrixInverse * vec4( uCameraPosition, 1.0 ) ).xyz;\rvec4 clipSpacePos = vec4((gl_FragCoord.xy / uResolution) * 2.0 - 1.0, -1.0, 1.0);\rvec4 viewSpacePos = uProjectionMatrixInverse * clipSpacePos;\rviewSpacePos /= viewSpacePos.w;\rvec3 viewDir = normalize(viewSpacePos.xyz);\rvec3 rayDir = normalize((uViewMatrixInverse * vec4(viewDir, 0.0)).xyz);",fi="uniform float uTime;\runiform float uTimeF;\runiform float uTimeE;\runiform float uTimeEF;",pi="uniform mat4 uModelMatrix;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform mat4 uNormalMatrix;\r\runiform mat4 uModelMatrixPrev;\runiform mat4 uModelViewMatrix;\runiform mat4 uViewMatrixPrev;\runiform mat4 uProjectionMatrixPrev;\r\rout vec2 vUv;\rout vec3 vViewNormal;\rout vec3 vNormal;\rout vec3 vMVPosition;\rout vec3 vMVPPosition;\rout vec3 vPos;\r\rout vec2 vVelocity;\r\rlayout ( location = 0 ) in vec3 position;\rlayout ( location = 1 ) in vec2 uv;\rlayout ( location = 2 ) in vec3 normal;\r\r#ifdef TF_MODELER\r	out vec3 o_position;\r	out vec3 o_normal;\r#endif",gi="vec3 outPos = position;\rvec3 outNormal = normal;\rvec2 outUv = uv;",xi="#ifdef TF_MODELER\r		o_position = outPos;\r		o_normal = outNormal;\r		return;\r#endif\r\rvec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\rvec4 mvPosition = uViewMatrix * modelPosition;\rgl_Position = uProjectionMatrix * mvPosition;\r\rvec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\rvec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\rvec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r\rvUv = outUv;\rvViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\rvNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\rvPos = modelPosition.xyz;\rvMVPosition = mvPosition.xyz;\rvMVPPosition = gl_Position.xyz / gl_Position.w;\r\rvVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\rvVelocity *= 0.2;",vi=(s,n)=>{if(!n)return s;const e=Object.keys(n);let t="";for(let r=0;r<e.length;r++)t+="#define "+e[r]+" "+n[e[r]]+`
`;return t=t+s,t},Ei=s=>{const n=new Map([["common",Yr],["sdf",ri],["rotate",ni],["random",ei],["noise_simplex",qr],["noise_cyclic",Kr],["noise_value",Qr],["light",Jr],["lighting_light",ci],["lighting_env",ai],["lighting_forwardIn",li],["vert_h",pi],["vert_in",gi],["vert_out",xi],["frag_h",ii],["frag_in",si],["frag_out",oi],["rm_h",ui],["rm_normal",ti],["rm_ray_obj",hi],["rm_ray_world",di],["rm_out_obj",mi],["uni_time",fi],["pmrem",$r]]);return s=s.replace(/#include\s?<([\S]*)>/g,(e,t)=>{let r="",i=n.get(t)||"";return i=i.replace(/#define GLSLIFY .*\n/g,""),r+=i,r}),s},yi=(s,n)=>(s=s.replaceAll("NUM_LIGHT_DIR",n?n.directional.length.toString():"0"),s=s.replaceAll("NUM_SHADOWMAP_DIR",n?Math.min(2,n.directional.filter(e=>e.component.castShadow).length).toString():"0"),s=s.replaceAll("NUM_LIGHT_SPOT",n?n.spot.length.toString():"0"),s=s.replaceAll("NUM_SHADOWMAP_SPOT",n?Math.min(2,n.spot.filter(e=>e.component.castShadow).length).toString():"0"),s),bi=s=>(s=s.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(n,e,t)=>{let r="";for(let i=0;i<Number(e);i++)r+=t.replaceAll("LOOP_INDEX",i.toString());return r}),s),vt=(s,n,e)=>(s=vi(s,n),s=`#version 300 es
precision highp float;
`+s,s=Ei(s),s=yi(s,e),s=bi(s),s=s.replace(/#define GLSLIFY .*\n/g,""),s),wi=`#include <common>\r
#include <packing>\r
#include <light>\r
#include <pmrem>\r
\r
// uniforms\r
\r
uniform sampler2D sampler0; // position.xyz, emission.x\r
uniform sampler2D sampler1; // normal.xyz, emission.y\r
uniform sampler2D sampler2; // albedo, \r
uniform sampler2D sampler3; // roughness, metalic, normalSelect, envSelect, \r
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
	//[\r
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
	float metalic = tex3.y;\r
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
		metalic,\r
		emission,\r
		mix( color, vec3( 0.0, 0.0, 0.0 ), metalic ),\r
		mix( vec3( 1.0, 1.0, 1.0 ), color, metalic ),\r
		envMapIntensity\r
	);\r
	vec3 outColor = vec3( 0.0 );\r
	//]\r
	\r
	// lighting\r
\r
	#include <lighting_light>\r
\r
	// env\r
\r
	#include <lighting_env>\r
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
}`,_i=`#include <common>
#include <packing>
#include <light>

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

#include <random>

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

}`,Ni=`#include <common>

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

}`,Ri=`#include <common>
#include <packing>
#include <light>
#include <random>

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

}`,It=`#include <common>
#include <packing>
#include <light>
#include <random>

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

}`,Ai=s=>{const n=[];for(let e=0;e<s;e++){const t=new w;t.x=Math.random()*2-1,t.y=Math.random()*2-1,t.z=e/s*.95+.05,t.normalize(),t.multiply(e/s*.95+.05),n.push(...t.getElm("vec3"))}return n};class Ci extends ${constructor(e){super();c(this,"timeUniforms_");c(this,"postprocess");c(this,"normalSelector_");c(this,"lightShaft");c(this,"rtLightShaft1");c(this,"rtLightShaft2");c(this,"ssao");c(this,"rtSSAO1");c(this,"rtSSAO2");c(this,"ssaoBlur");c(this,"ssaoBlurUni");c(this,"shading");const t=e.gl,r={uTimeEF:{value:0,type:"1f"}},i=new G(t,{name:"normalSelector",frag:Ni,renderTarget:null,uniforms:Y.merge({uNormalTexture:{value:null,type:"1i"},uPosTexture:{value:null,type:"1i"},uSelectorTexture:{value:null,type:"1i"}}),passThrough:!0}),o=new H(t).setTexture([new M(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR})]),u=new H(t).setTexture([new M(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR})]),a=new G(t,{name:"lightShaft",frag:_i,renderTarget:o,uniforms:Y.merge(r,{uLightShaftBackBuffer:{value:u.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"}}),resolutionRatio:.5,passThrough:!0}),l=new H(t).setTexture([new M(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR})]),h=new H(t).setTexture([new M(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR})]),p=new G(t,{name:"ssao",frag:Ri,renderTarget:se("ssao",l),uniforms:Y.merge(r,{uSSAOBackBuffer:{value:h.textures[0],type:"1i"},uSSAOKernel:{value:Ai(16),type:"3fv"}}),resolutionRatio:.5,passThrough:!0}),f=8,d=Y.merge(r,{uSSAOTexture:{value:h.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"},uNormalTexture:{value:null,type:"1i"},uWeights:{type:"1fv",value:Qe.gaussWeights(f)}}),x=new G(t,{name:"ssaoBlur/h",frag:se("ssaoBlur",It),uniforms:d,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:f}}),E=new G(t,{name:"ssaoBlur/v",frag:se("ssaoBlur",It),uniforms:Y.merge(d,{uSSAOTexture:{value:x.renderTarget.textures[0],type:"1i"}}),defines:{SSAOSAMPLE:f,IS_VIRT:""},resolutionRatio:1,passThrough:!0}),y=new G(t,{name:"deferredShading",frag:se("deferredShading",wi),uniforms:Y.merge({uLightShaftTexture:{value:null,type:"1i"},uSSAOTexture:{value:E.renderTarget.textures[0],type:"1i"},uSSAOResolutionInv:{value:p.resolutionInv,type:"2fv"},uEnvMap:{value:e.envMap,type:"1i"}})});this.postprocess=new he({passes:[i,a,p,x,E,y]}),this.timeUniforms_=r,this.shading=y,this.lightShaft=a,this.ssao=p,this.rtSSAO1=l,this.rtSSAO2=h,this.ssaoBlur=x,this.ssaoBlurUni=d,this.rtLightShaft1=o,this.rtLightShaft2=u,this.normalSelector_=i}update(e){this.timeUniforms_.uTimeEF.value=(this.timeUniforms_.uTimeEF.value+e.timeDelta)%1;let t=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=t,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],t=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=t,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setRenderCamera(e){const t=e.renderTarget;if(t){for(let r=0;r<t.gBuffer.textures.length;r++){let i=t.gBuffer.textures[r];r===1&&(i=t.normalBuffer.textures[0]),this.shading.uniforms["sampler"+r]=this.ssao.uniforms["sampler"+r]={type:"1i",value:i}}this.ssaoBlur.uniforms.uDepthTexture.value=t.gBuffer.textures[0],this.lightShaft.uniforms.uDepthTexture.value=t.gBuffer.depthTexture,this.shading.renderTarget=t.shadingBuffer,this.normalSelector_.renderTarget=t.normalBuffer,this.normalSelector_.uniforms.uNormalTexture.value=t.gBuffer.textures[1],this.normalSelector_.uniforms.uPosTexture.value=t.gBuffer.textures[0],this.normalSelector_.uniforms.uSelectorTexture.value=t.gBuffer.textures[3],this.ssaoBlurUni.uNormalTexture.value=t.normalBuffer.textures[0]}}resize(e){this.postprocess.resize(e)}}const Pi=`#include <common>\r
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
}`,Si=`#include <common>\r
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
}`,ki=`#include <common>\r
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
`,Ti=`#include <common>

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

}`,Oi=`in vec2 vUv;

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

#include <random>

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

}`,Mi=`in vec2 vUv;
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

}`,Di=`in vec2 vUv;
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

}`,Ii=`#include <common>\r
#include <packing>\r
#include <light>\r
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
}`,zi=`#include <common>
#include <packing>
#include <light>
#include <random>

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

}`;class Bi{constructor(n){c(this,"dofCoc");c(this,"dofBokeh");c(this,"dofComposite");c(this,"rtSSR1");c(this,"rtSSR2");c(this,"postprocess");c(this,"_timeUniforms");c(this,"_ssr");c(this,"_ssComposite");c(this,"_dofParams");c(this,"_motionBlur");c(this,"_motionBlurTile");c(this,"_renderCamera");const e={uTimeEF:{value:0,type:"1f"}},t=new G(n,{name:"collection",frag:Pi}),r=new H(n).setTexture([new M(n).setting({magFilter:n.LINEAR,minFilter:n.LINEAR})]),i=new H(n).setTexture([new M(n).setting({magFilter:n.LINEAR,minFilter:n.LINEAR})]),o=new G(n,{name:"ssr",frag:se("ssr",zi),renderTarget:r,uniforms:Y.merge(e,{uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSceneTex:{value:null,type:"1i"},uSSRBackBuffer:{value:i.textures[0],type:"1i"}}),resolutionRatio:.5,passThrough:!0}),u=new G(n,{name:"ssComposite",frag:se("ssComposite",Ii),uniforms:Y.merge({uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSSRTexture:{value:i.textures[0],type:"1i"}})}),a=new w(10,.05,20,.05),l=new G(n,{name:"dof/coc",frag:ki,uniforms:Y.merge(e,{uGbufferPos:{value:null,type:"1i"},uParams:{value:a,type:"4f"}}),renderTarget:new H(n).setTexture([new M(n).setting({magFilter:n.LINEAR,minFilter:n.LINEAR,internalFormat:n.RGBA16F,type:n.HALF_FLOAT,format:n.RGBA})]),passThrough:!0,resolutionRatio:.5}),h=new G(n,{name:"dof/bokeh",frag:Si,uniforms:Y.merge(e,{uCocTex:{value:l.renderTarget.textures[0],type:"1i"},uParams:{value:a,type:"4f"}}),renderTarget:new H(n).setTexture([new M(n).setting({magFilter:n.LINEAR,minFilter:n.LINEAR})]),passThrough:!0,resolutionRatio:.5}),p=new G(n,{name:"dof/composite",frag:Ti,uniforms:Y.merge({uBokeTex:{value:h.renderTarget.textures[0],type:"1i"}}),renderTarget:new H(n).setTexture([new M(n).setting({magFilter:n.LINEAR,minFilter:n.LINEAR,internalFormat:n.RGBA16F,type:n.HALF_FLOAT,format:n.RGBA})])}),f=16,d=new G(n,{name:"motionBlurTile",frag:Di,uniforms:Y.merge({uVelTex:{value:null,type:"1i"}}),renderTarget:new H(n).setTexture([new M(n).setting({type:n.FLOAT,internalFormat:n.RGBA32F,format:n.RGBA})]),defines:{TILE:f},resolutionRatio:1/f,passThrough:!0}),x=new G(n,{name:"motionBlurNeighbor",frag:Mi,uniforms:Y.merge({uVelTex:{value:d.renderTarget.textures[0],type:"1i"}}),defines:{TILE:f},renderTarget:new H(n).setTexture([new M(n).setting({type:n.FLOAT,internalFormat:n.RGBA32F,format:n.RGBA})]),resolutionRatio:1/f,passThrough:!0}),E=new G(n,{name:"motionBlur",frag:Oi,uniforms:Y.merge({uVelNeighborTex:{value:x.renderTarget.textures[0],type:"1i"},uVelTex:{value:null,type:"1i"},uDepthTexture:{value:null,type:"1i"},uPower:{value:1,type:"1f"}}),defines:{TILE:f}});this.postprocess=new he({passes:[t,o,u,d,x,E]}),this._timeUniforms=e,this._ssr=o,this._ssComposite=u,this.dofCoc=l,this.dofBokeh=h,this.dofComposite=p,this._motionBlur=E,this._motionBlurTile=d,this._dofParams=a,this.rtSSR1=r,this.rtSSR2=i,this._renderCamera=null}update(n){if(!this._renderCamera)return;this._timeUniforms.uTimeEF.value=(this._timeUniforms.uTimeEF.value+n.timeDelta)%1;const e=this._renderCamera.fov,t=this._renderCamera.dofParams.focusDistance,r=this._renderCamera.dofParams.kFilmHeight,i=r/Math.tan(.5*(e/180*Math.PI)),o=1/this.dofBokeh.renderTarget.size.y*5,u=1/o,a=i*i/(.3*(t-i)*r*2);this._dofParams.set(t,o,u,a);const l=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=l,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(n){this.postprocess.resize(n)}setRenderCamera(n){this._renderCamera=n;const e=n.renderTarget;e&&(this.postprocess.passes[0]&&(this.postprocess.passes[0].backBufferOverride=e.shadingBuffer.textures),this._ssr.uniforms.uGbufferPos.value=e.gBuffer.textures[0],this._ssr.uniforms.uGbufferNormal.value=e.normalBuffer.textures[0],this._ssr.uniforms.uSceneTex.value=e.forwardBuffer.textures[0],this._ssComposite.uniforms.uGbufferPos.value=e.gBuffer.textures[0],this._ssComposite.uniforms.uGbufferNormal.value=e.gBuffer.textures[1],this.dofCoc.uniforms.uGbufferPos.value=e.gBuffer.textures[0],this._motionBlurTile.uniforms.uVelTex.value=e.gBuffer.textures[4],this._motionBlur.uniforms.uVelTex.value=e.gBuffer.textures[4],this._motionBlur.uniforms.uDepthTexture.value=e.gBuffer.depthTexture)}}const Fi=`#include <common>

uniform sampler2D uBackBuffer0;
uniform sampler2D uPMREMBackBuffer;
uniform samplerCube uEnvMap;
uniform float uRoughness;
uniform float uTimeEF;
layout (location = 0) out vec4 outColor;

in vec2 vUv;

#include <random>
#include <pmrem>

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

}`;class Vi extends ${constructor(e,t){super();c(this,"postprocess");c(this,"resolution");c(this,"renderTarget");c(this,"pmremPasses");c(this,"swapBuffers");c(this,"timeUniforms");c(this,"postProcessRenderer");const r=t.resolution,i={uTimeEF:{value:0,type:"1f"}},o=new H(e).setTexture([new M(e).setting({type:e.FLOAT,internalFormat:e.RGBA16F,format:e.RGBA,magFilter:e.LINEAR,minFilter:e.LINEAR,wrapS:e.CLAMP_TO_EDGE,wrapT:e.CLAMP_TO_EDGE,generateMipmap:!0})]),u=[],a=[],l=[],h=5;let p=0;for(let f=0;f<h;f++){const d=1/Math.pow(2,f),x=r.x*d,E=r.y*d*.5,y=new w(0,p,x,E);p+=E,l.push({rt1:new H(e).setTexture([new M(e).setting({type:e.FLOAT,internalFormat:e.RGBA16F,format:e.RGBA})]),rt2:new H(e).setTexture([new M(e).setting({type:e.FLOAT,internalFormat:e.RGBA16F,format:e.RGBA})])});let b=1/(h-1)*f;b=b;const g=new G(e,{renderTarget:l[f].rt1,frag:Fi,uniforms:Y.merge(i,{uRoughness:{value:b,type:"1f"},uEnvMap:{value:t.input,type:"1i"},uPMREMBackBuffer:{value:l[f].rt2.textures,type:"1i"},uRenderCount:{value:1,type:"1f"}}),defines:{NUM_SAMPLES:Math.floor(Math.pow(2,f+1))}});g.resize(new w(x,E));const R=new G(e,{renderTarget:o,viewPort:y,passThrough:!0});R.resize(r),u.push(g,R),a.push(g)}this.postprocess=new he({passes:u}),this.postprocess.passes[0].backBufferOverride=o.textures,this.resolution=r,this.renderTarget=o,this.pmremPasses=a,this.swapBuffers=l,this.timeUniforms=i,this.postProcessRenderer=null}setPostProcessRenderer(e){this.postProcessRenderer=e}renderProcess(){this.postProcessRenderer?this.postProcessRenderer.renderPostProcess(this.postprocess,void 0,this.resolution):console.warn("PostProcessRenderer has not been set in PMREMRender. Call setPostProcessRenderer first.")}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let e=0;e<this.pmremPasses.length;e++){const t=this.pmremPasses[e],r=this.swapBuffers[e],i=r.rt1;r.rt1=r.rt2,r.rt2=i,t.setRendertarget(r.rt1),t.uniforms.uPMREMBackBuffer.value=r.rt2.textures}}resize(e){}}class Li{constructor(n){c(this,"gl");c(this,"pool");this.gl=n,this.pool=new Map}get(n,e){const t=n+e,r=this.pool.get(t);if(r!==void 0&&r.program)return r;const i=new an(this.gl);return i.setShader(n,e),this.pool.set(t,i),i}}let qe=0;class un extends oe{constructor(e){super({name:"Renderer"});c(this,"gl");c(this,"resolution");c(this,"_extDisJointTimerQuery");c(this,"programManager");c(this,"_lights");c(this,"_lightsUpdated");c(this,"_envMapCameras");c(this,"_envMapRenderTarget");c(this,"_pmremRender");c(this,"_deferredRenderer");c(this,"_pipelinePostProcess");c(this,"_quad");c(this,"_glStateCahce");c(this,"_queryList");c(this,"_queryListQueued");c(this,"_isCorrentCompiles");c(this,"compileDrawParams");c(this,"_tmpNormalMatrix");c(this,"_tmpModelViewMatrix");c(this,"_tmpViewMatrixInverseMatrix");c(this,"_tmpLightDirection");c(this,"_tmpModelMatrixInverse");c(this,"_tmpProjectionMatrixInverse");this.gl=e,this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new Li(this.gl),this.resolution=new w,this._extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this._extDisJointTimerQuery||console.warn("[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled."),this._lights={directional:[],spot:[]},this._lightsUpdated=!1;const t=new Ar(this.gl);this._envMapRenderTarget=new Rr(this.gl).setTexture([t]),this._envMapRenderTarget.setSize(256,256);const r=new w(0,0,0),i=new w(0,-1,0),o=[new U().lookAt(r,new w(1,0,0),i),new U().lookAt(r,new w(0,1,0),new w(0,0,1)),new U().lookAt(r,new w(0,0,1),i),new U().lookAt(r,new w(-1,0,0),i),new U().lookAt(r,new w(0,-1,0),new w(0,0,-1)),new U().lookAt(r,new w(0,0,-1),i)];this._envMapCameras=[];for(let u=0;u<6;u++){const a=new oe({name:"envMapCamera/"+u}),l=a.addComponent(Ct);l.fov=90,l.near=.1,l.far=1e3,l.aspect=1,a.applyMatrix(o[u].clone()),l.updateViewMatrix(),l.updateProjectionMatrix(),this._envMapCameras.push({entity:a,camera:l})}this._pmremRender=new Vi(this.gl,{input:[t],resolution:new w(256*3,256*4)}),this._deferredRenderer=new Ci({gl:e,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:t}),this._pipelinePostProcess=new Bi(e),this._quad=new At({width:2,height:2}),this._glStateCahce={},this._queryList=[],this._queryListQueued=[],this._tmpLightDirection=new w,this._tmpModelMatrixInverse=new U,this._tmpViewMatrixInverseMatrix=new U,this._tmpProjectionMatrixInverse=new U,this._tmpModelViewMatrix=new U,this._tmpNormalMatrix=new U,this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}getRenderStack(e){const t={camera:[],light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]},r=i=>{const o=i.entity,u=(i.visibility||i.visibility===void 0)&&o.visible,a=o.getComponent(ie);if(a&&u){const p=a.material;p.visibilityFlag.deferred&&t.deferred.push(o),p.visibilityFlag.shadowMap&&t.shadowMap.push(o),p.visibilityFlag.forward&&t.forward.push(o),p.visibilityFlag.ui&&t.ui.push(o),p.visibilityFlag.envMap&&t.envMap.push(o)}const l=o.getComponent(xt);l&&l.enabled&&t.camera.push(o);const h=o.getComponent(Ae);h&&h.enabled&&u&&t.light.push(o);for(let p=0;p<o.children.length;p++)r({entity:o.children[p],visibility:u});return t};return r({entity:e,visibility:!0}),t}render(e,t){if(e.onBeforeRender(t),this._extDisJointTimerQuery)if(this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))this._queryList.forEach(l=>this.gl.deleteQuery(l)),this._queryList.length=0;else{const l=[];if(this._queryListQueued.length>0){const h=this._queryListQueued.length;for(let p=h-1;p>=0;p--){const f=this._queryListQueued[p];if(this.gl.getQueryParameter(f.query,this.gl.QUERY_RESULT_AVAILABLE)){const x=this.gl.getQueryParameter(f.query,this.gl.QUERY_RESULT);l.push({name:f.name,duration:x/1e3/1e3}),this._queryList.push(f.query),this._queryListQueued.splice(p,1)}}}this.emit("timer",[l])}const r=this.getRenderStack(e),i=[],o={},u=Object.keys(this._lights);for(let a=0;a<u.length;a++){const l=u[a];o[l]=this._lights[l].length,this._lights[l]=[]}for(let a=0;a<r.light.length;a++){const l=r.light[a],h=l.getComponent(Ae);h&&(this.collectLight(l,h),h.castShadow&&h.renderTarget&&i.push(l))}this._lights.directional.sort((a,l)=>(a.component.castShadow?0:1)-(l.component.castShadow?0:1)),this._lights.spot.sort((a,l)=>(a.component.castShadow?0:1)-(l.component.castShadow?0:1)),this._lightsUpdated=!1;for(let a=0;a<u.length;a++){const l=u[a];if(o[l]!=this._lights[l].length){this._lightsUpdated=!0;break}}for(let a=0;a<i.length;a++){const l=i[a],h=l.getComponent(Ae);h.renderTarget&&this.renderCamera("shadowMap",l,r.shadowMap,h.renderTarget,this.resolution)}for(let a=0;a<this._envMapCameras.length;a++){const{entity:l}=this._envMapCameras[a];this._envMapRenderTarget.face(a),this.renderCamera("envMap",l,r.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap();for(let a=0;a<r.camera.length;a++){const l=r.camera[a],h=l.getComponent(xt);if(this.gl.disable(this.gl.BLEND),!h.renderTarget)continue;this.renderCamera("deferred",l,r.deferred,h.renderTarget.gBuffer,this.resolution),this._deferredRenderer.setRenderCamera(h),this.renderPostProcess(this._deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:h.viewMatrix,viewMatrixPrev:h.viewMatrixPrev,projectionMatrix:h.projectionMatrix,projectionMatrixPrev:h.projectionMatrixPrev,cameraMatrixWorld:l.matrixWorld}}),this._deferredRenderer.update(t),this.gl.enable(this.gl.BLEND),this.renderCamera("forward",l,r.forward,h.renderTarget.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:h.renderTarget.shadingBuffer.textures[1],type:"1i"},uDeferredResolution:{value:h.renderTarget.shadingBuffer.size,type:"2fv"},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),this._pipelinePostProcess.setRenderCamera(h),this.renderPostProcess(this._pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:h.viewMatrix,projectionMatrix:h.projectionMatrix,cameraMatrixWorld:l.matrixWorld,cameraNear:h.near,cameraFar:h.far}}),this._pipelinePostProcess.update(t);let p=this._pipelinePostProcess.postprocess.output?this._pipelinePostProcess.postprocess.output:void 0;const f=l.getComponent(Pt);if(f)for(let d=0;d<f.postProcesses.length;d++){const x=f.postProcesses[d];x.enabled&&x.hasOutput&&(this.renderPostProcess(x,p,this.resolution,{cameraOverride:{viewMatrix:h.viewMatrix,projectionMatrix:h.projectionMatrix,cameraMatrixWorld:l.matrixWorld,cameraNear:h.near,cameraFar:h.far}}),p=x.output||void 0)}if(p){this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,p.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,h.renderTarget.uiBuffer.getFrameBuffer());const d=p.size;this.gl.blitFramebuffer(0,0,d.x,d.y,0,0,d.x,d.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}if(this.gl.enable(this.gl.BLEND),this.renderCamera("forward",l,r.ui,h.renderTarget.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:h.renderTarget.shadingBuffer.textures[1],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),h.displayOut){const d=h.renderTarget.uiBuffer;this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,d===null?null:d.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null),this.gl.blitFramebuffer(0,0,this.resolution.x,this.resolution.y,0,0,this.resolution.x,this.resolution.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}}e.onAfterRender(t)}renderCamera(e,t,r,i,o,u){const a=t.getComponentsByTag("camera")[0]||t.getComponent(Ae);u=u||{};const l={viewMatrix:a.viewMatrix,viewMatrixPrev:a.viewMatrixPrev,projectionMatrix:a.projectionMatrix,projectionMatrixPrev:a.projectionMatrixPrev,cameraMatrixWorld:t.matrixWorld,cameraNear:a.near,cameraFar:a.far,renderTarget:i,uniformOverride:u.uniformOverride,...u.cameraOverride};if(a.viewPort){const p=a.viewPort;this.gl.viewport(p.x,p.y,p.z,p.w)}else i?this.gl.viewport(0,0,i.size.x,i.size.y):this.gl.viewport(0,0,o.x,o.y);const h=new w;i?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,i.getFrameBuffer()),this.gl.drawBuffers(i.textureAttachmentList),h.set(i.size.x,i.size.y)):(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),h.set(o.x,o.y)),l.uniformOverride||(l.uniformOverride={}),l.uniformOverride.uResolution={value:h,type:"2fv"},u.disableClear||(e=="shadowMap"?(this.gl.clearColor(1,1,1,1),this.gl.clearDepth(1)):(this.gl.clearColor(0,0,0,1),this.gl.clearDepth(1)),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT));for(let p=0;p<r.length;p++){const f=r[p],d=f.getComponentsByTag("materialOverride")[0],x=f.getComponent(ie),E=d?d.material:x.material,y=x.geometry;l.modelMatrixWorld=f.matrixWorld,l.modelMatrixWorldPrev=f.matrixWorldPrev,l.label=`cam[${a.uuid}]/${f.name||E.name||"-"}`,this.draw(f.uuid,e,y,E,l)}this.emit("drawPass",[i,"camera/"+e])}collectLight(e,t){const r=t.lightType,i={position:new w(0,0,0,1).applyMatrix4(e.matrixWorld),direction:new w(0,1,0,0).applyMatrix4(e.matrixWorld).normalize(),color:new w(t.color.x,t.color.y,t.color.z).multiply(t.intensity*Math.PI),component:t};r=="directional"?this._lights.directional.push(i):r=="spot"&&this._lights.spot.push(i),t.castShadow&&t.renderTarget==null&&t.setShadowMap(new H(this.gl).setTexture([new M(this.gl).setting({magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR})]))}renderPostProcess(e,t,r,i){let o=t?t.textures:void 0;if(e.passes)for(let u=0;u<e.passes.length;u++){const a=e.passes[u];if(a.enabled===!1)continue;const l=a.renderTarget;if(a.viewPort){const d=a.viewPort;this.gl.viewport(d.x,d.y,d.z,d.w)}else l?this.gl.viewport(0,0,l.size.x,l.size.y):r&&this.gl.viewport(0,0,r.x,r.y);l?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,l.getFrameBuffer()),this.gl.drawBuffers(l.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);let h=0;a.clearColor&&(this.gl.clearColor(a.clearColor.x,a.clearColor.y,a.clearColor.z,a.clearColor.w),h|=this.gl.COLOR_BUFFER_BIT),a.clearDepth!==null&&(this.gl.clearDepth(a.clearDepth),h|=this.gl.DEPTH_BUFFER_BIT),h!==0&&this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);const p=a.backBufferOverride||o||null;if(p)for(let d=0;d<p.length;d++)a.uniforms["uBackBuffer"+d]={type:"1i",value:p[d]};const f=i&&i.cameraOverride||{};f.label=a.name,f.renderTarget=l,this.draw(a.uuid,"postprocess",this._quad,a,f),a.onAfterRender(),!a.passThrough&&a.renderTarget&&(o=a.renderTarget.textures),this.emit("drawPass",[a.renderTarget,a.name])}}draw(e,t,r,i,o){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:e,renderType:t,geometry:r,material:i,param:{...o}});return}qe=0;let u=this.gl.CULL_FACE;const a=this._glStateCahce[u];(a===void 0||a.state!=i.cullFace)&&(i.cullFace?this.gl.enable(u):this.gl.disable(u)),u=this.gl.DEPTH_TEST;const l=this._glStateCahce[u];(l===void 0||l.state!=i.depthTest)&&(i.depthTest?this.gl.enable(u):this.gl.disable(u)),this.gl.depthMask(i.depthWrite);let h=i.programCache[t];if(!h||this._lightsUpdated){const f={...i.defines};t=="deferred"?f.IS_DEFERRED="":t=="forward"||t=="envMap"?f.IS_FORWARD="":t=="shadowMap"&&(f.IS_DEPTH="");const d=vt(i.vert,f,this._lights),x=vt(i.frag,f,this._lights);h=this.programManager.get(d,x),i.programCache[t]=h}if(o&&(o.modelMatrixWorld&&(h.setUniform("uModelMatrix","Matrix4fv",o.modelMatrixWorld.elm),h.setUniform("uModelMatrixInverse","Matrix4fv",this._tmpModelMatrixInverse.copy(o.modelMatrixWorld).inverse().elm),o.modelMatrixWorldPrev&&h.setUniform("uModelMatrixPrev","Matrix4fv",o.modelMatrixWorldPrev.elm),o.viewMatrix&&(this._tmpModelViewMatrix.copy(o.modelMatrixWorld).preMultiply(o.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),h.setUniform("uModelViewMatrix","Matrix4fv",this._tmpModelViewMatrix.elm),h.setUniform("uNormalMatrix","Matrix4fv",this._tmpNormalMatrix.elm),h.setUniform("uViewMatrixInverse","Matrix4fv",this._tmpViewMatrixInverseMatrix.copy(o.viewMatrix).inverse().elm))),o.viewMatrix&&(h.setUniform("uViewMatrix","Matrix4fv",o.viewMatrix.elm),o.viewMatrixPrev&&h.setUniform("uViewMatrixPrev","Matrix4fv",o.viewMatrixPrev.elm)),o.projectionMatrix&&(h.setUniform("uProjectionMatrix","Matrix4fv",o.projectionMatrix.elm),h.setUniform("uProjectionMatrixInverse","Matrix4fv",this._tmpProjectionMatrixInverse.copy(o.projectionMatrix).inverse().elm),o.projectionMatrixPrev&&h.setUniform("uProjectionMatrixPrev","Matrix4fv",o.projectionMatrixPrev.elm)),o.cameraMatrixWorld&&(h.setUniform("uCameraMatrix","Matrix4fv",o.cameraMatrixWorld.elm),h.setUniform("uCameraPosition","3f",[o.cameraMatrixWorld.elm[12],o.cameraMatrixWorld.elm[13],o.cameraMatrixWorld.elm[14]])),t!="deferred"&&(o.cameraNear&&h.setUniform("uCameraNear","1f",[o.cameraNear]),o.cameraFar&&h.setUniform("uCameraFar","1f",[o.cameraFar]))),i.useLight&&t!=="deferred"&&t!=="shadowMap"){for(let f=0;f<this._lights.directional.length;f++){const d=this._lights.directional[f];if(h.setUniform("directionalLight["+f+"].direction","3fv",d.direction.getElm("vec3")),h.setUniform("directionalLight["+f+"].color","3fv",d.color.getElm("vec3")),d.component.renderTarget){const x=d.component.renderTarget.textures[0].activate(qe++),E=`uDirectionalLightCamera[${f}]`;h.setUniform(E+".near","1fv",[d.component.near]),h.setUniform(E+".far","1fv",[d.component.far]),h.setUniform(E+".viewMatrix","Matrix4fv",d.component.viewMatrix.elm),h.setUniform(E+".projectionMatrix","Matrix4fv",d.component.projectionMatrix.elm),h.setUniform(E+".resolution","2fv",x.size.getElm("vec2")),h.setUniform("directionalLightShadowMap["+f+"]","1i",[x.unit])}}for(let f=0;f<this._lights.spot.length;f++){const d=this._lights.spot[f];o&&o.viewMatrix&&this._tmpLightDirection.copy(d.direction).applyMatrix3(o.viewMatrix);const x=`uSpotLight[${f}]`;if(h.setUniform(x+".position","3fv",d.position.getElm("vec3")),h.setUniform(x+".direction","3fv",d.direction.getElm("vec3")),h.setUniform(x+".color","3fv",d.color.getElm("vec3")),h.setUniform(x+".angle","1fv",[Math.cos(d.component.angle/2)]),h.setUniform(x+".blend","1fv",[d.component.blend]),h.setUniform(x+".distance","1fv",[d.component.distance]),h.setUniform(x+".decay","1fv",[d.component.decay]),d.component.renderTarget){const E=d.component.renderTarget.textures[0].activate(qe++),y=`uSpotLightCamera[${f}]`;h.setUniform(y+".near","1fv",[d.component.near]),h.setUniform(y+".far","1fv",[d.component.far]),h.setUniform(y+".viewMatrix","Matrix4fv",d.component.viewMatrix.elm),h.setUniform(y+".projectionMatrix","Matrix4fv",d.component.projectionMatrix.elm),h.setUniform(y+".resolution","2fv",E.size.getElm("vec2")),h.setUniform("spotLightShadowMap["+f+"]","1i",[E.unit])}}}Ui(h,{...i.uniforms,...o&&o.uniformOverride});const p=h.getVAO(e.toString());p&&(r.vaoCache.get(p)||(r.createBuffers(this.gl),r.attributes.forEach((f,d)=>{f.buffer!==void 0&&(d=="index"?p.setIndex(f.buffer):p.setAttribute(d,f.buffer,f.size,f.opt))}),r.vaoCache.set(p,!0)),h.use(f=>{f.uploadUniforms(),this.gl.bindVertexArray(p.getVAO());const d=p.indexBuffer;let x=this.gl.UNSIGNED_SHORT;d&&d.array&&d.array.BYTES_PER_ELEMENT==4&&(x=this.gl.UNSIGNED_INT),i.blending=="NORMAL"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):i.blending=="ADD"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):i.blending=="DIFF"&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);const E=this.gl[i.drawType];let y=null;if(this._extDisJointTimerQuery&&(y=this._queryList.pop()||null,y==null&&(y=this.gl.createQuery()),y&&this.gl.beginQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT,y)),p.instanceCount>0?d?this.gl.drawElementsInstanced(E,p.indexCount,x,0,p.instanceCount):this.gl.drawArraysInstanced(E,0,p.vertCount,p.instanceCount):d?this.gl.drawElements(E,p.indexCount,x,0):this.gl.drawArrays(E,0,p.vertCount),this._extDisJointTimerQuery&&y){this.gl.endQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT);const b=o&&o.label||"_";this._queryListQueued.push({name:`${t}/${b}/ [${e}]`,query:y})}this.gl.bindVertexArray(null)}))}resize(e){this.resolution.copy(e),this._deferredRenderer.resize(this.resolution),this._pipelinePostProcess.resize(this.resolution)}async compileShaders(e,t,r){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.render(e,t),this._isCorrentCompiles=!1;const i=this.compileDrawParams.length;let o=0;for(let u=0;u<this.compileDrawParams.length;u++){const a=this.compileDrawParams[u],l=a.param.renderTarget;if(l?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,l.getFrameBuffer()),this.gl.drawBuffers(l.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.draw(a.drawId,a.renderType,a.geometry,a.material,a.param),await new Promise(h=>{setTimeout(()=>{h(null)},10)}),r){o++;const h=a.param&&a.param.label||"-",p=`${a.renderType}/${h}/[${a.drawId}]`;r(p,o,i)}}}}const Ui=(s,n)=>{const e=Object.keys(n);for(let t=0;t<e.length;t++){const r=e[t],i=n[r];if(!i)continue;const o=i.type,u=i.value,a=[],l=h=>{h!=null&&(typeof h=="number"||typeof h=="boolean"?a.push(h):"isVector"in h?a.push(...h.getElm("vec"+o.charAt(0))):"isTexture"in h?(h.activate(qe++),a.push(h.unit)):a.push(...h.elm))};if(Array.isArray(u))for(let h=0;h<u.length;h++)l(u[h]);else l(u);a.length>0&&s.setUniform(r,o,a)}};function ji(s){return s.byteLength%32===0}const zt=new Map,se=(s,n)=>{const e=zt.get(s);return e||(zt.set(s,n),n)};class Et extends q{constructor(e){super(e);c(this,"gaussianPositions");c(this,"numPoints");c(this,"material");c(this,"sortWorker",null);c(this,"isSorting",!1);c(this,"oldDirection",new w(0,0,0));c(this,"frameIdLastUpdate",-1);const t=e.args;this.gaussianPositions=t.gaussianPositions,this.numPoints=t.numPoints,this.material=t.material,this._tag="3dgs-controller",this.initWorker()}initWorker(){try{this.sortWorker=new Worker(new URL("/OREngine/develop/assets/sortWorker-CntJUXzs.js",import.meta.url),{type:"module"}),this.sortWorker.onmessage=e=>{this.handleWorkerMessage(e.data)},this.sortWorker.onerror=e=>{console.error("Sort Worker Error:",e),this.isSorting=!1}}catch(e){console.warn("WebWorker not supported, falling back to main thread sorting:",e),this.sortWorker=null}}handleWorkerMessage(e){e.type==="sorted"&&(this.applySortedIndices(e.sortedIndices),this.isSorting=!1)}applySortedIndices(e){const{width:t,height:r}=this.calculateTextureSize(),i=new Float32Array(t*r*4);i.fill(0);for(let a=0;a<this.numPoints;a++)i[a*4]=e[a];const o=this.material.uniforms.uSortTex.value,u={width:t,height:r,data:i};o.attach(u)}findCamera(){const t=this.entity.getRootEntity().findEntityByName("Camera");if(t){const r=t.getComponentByTag("camera");if(r)return r}return null}calculateTextureSize(){const e=Math.pow(2,Math.ceil(Math.log2(Math.sqrt(this.numPoints)))),t=Math.pow(2,Math.ceil(Math.log2(this.numPoints/e)));return{width:e,height:t}}updateSort(){const e=this.findCamera();if(!e)return;const t=Date.now(),r=e.viewMatrix,i=new w(r.elm[2],r.elm[6],r.elm[10]).normalize(),o=i.dot(this.oldDirection);if(!(t!==this.frameIdLastUpdate&&Math.abs(o-1)>=.01)&&!this.isSorting||this.isSorting||(this.isSorting=!0,this.frameIdLastUpdate=t,this.oldDirection.copy(i),!this.sortWorker))return;const a=Array.from(e.viewMatrix.elm),l={type:"sort",gaussianPositions:this.gaussianPositions,numPoints:this.numPoints,viewMatrix:a};this.sortWorker.postMessage(l)}update(e){super.update(e);const t=this.findCamera();if(!t)return;const r=t.projectionMatrix,i=e.resolution.x,o=e.resolution.y,u=r.elm[0]*i/2,a=r.elm[5]*o/2;this.material.uniforms.uFocal.value.set(u,a),this.material.uniforms.uViewport.value.copy(e.resolution),this.updateSort()}dispose(){this.sortWorker&&(this.sortWorker.terminate(),this.sortWorker=null),super.dispose()}}function Gi(s){return(Math.pow(s+1,2)-1)*3}const Hi=`#include <common>\r
#include <frag_h>\r
\r
// インスタンス入力変数\r
in vec3 vColor;     // インスタンスの色（頂点シェーダーで計算済みの球面調和関数の色を含む）\r
in float vAlpha;    // インスタンスのアルファ値\r
in vec2 vCUv;\r
\r
uniform sampler2D uPositionTexture;\r
uniform sampler2D uScaleTexture;\r
uniform sampler2D uRotationTexture;\r
uniform sampler2D uColorTexture;\r
uniform sampler2D uSortTex;\r
\r
void main( void ) {\r
    #include <frag_in>\r
\r
    float A = -dot(vCUv, vCUv);\r
    if (A < -4.0) discard;\r
    float B = exp(A) * vAlpha;\r
    outColor = vec4(vColor.rgb, B);\r
    #include <frag_out>\r
}`,Xi=`#include <common>
#include <vert_h>

layout ( location = 3 ) in float instanceId;

uniform vec2 uDataTexSize;
uniform sampler2D uPositionTexture;
uniform sampler2D uColorTexture;
uniform sampler2D uSortTex;
uniform sampler2D uCovariance1Texture;
uniform sampler2D uCovariance2Texture;
uniform vec2 uFocal;
uniform vec2 uViewport;

#if SH_DEGREE > 0
	uniform highp usampler2D uShTexture0;
#endif
#if SH_DEGREE > 1
	uniform highp usampler2D uShTexture1;
#endif
#if SH_DEGREE > 2
	uniform highp usampler2D uShTexture2;
#endif

uniform vec3 uCameraPosition;

out vec3 vColor;
out float vAlpha;
out vec2 vCUv;

/*-------------------------------
	SH関数
-------------------------------*/

ivec2 getDataUVint(float index, vec2 textureSize) {
	float x = mod(index, textureSize.x);
	float y = floor(index / textureSize.x);
    y = textureSize.y - y;
	return ivec2(uint(x + 0.5), uint(y - 0.5));
}

struct Splat {
	vec3 position;
	vec4 color;
	mat3 covariance;
#if SH_DEGREE > 0
	uvec4 sh0; // 4 * 32bits uint
#endif
#if SH_DEGREE > 1
	uvec4 sh1;
#endif
#if SH_DEGREE > 2
	uvec4 sh2;
#endif
};

// SH色計算関数
vec3 computeColorFromSHDegree(vec3 dir, const vec3 sh[16])
{
    const float SH_C0 = 0.28209479;
    const float SH_C1 = 0.48860251;
    float SH_C2[5];
    SH_C2[0] = 1.092548430;
    SH_C2[1] = -1.09254843;
    SH_C2[2] = 0.315391565;
    SH_C2[3] = -1.09254843;
    SH_C2[4] = 0.546274215;
    
    float SH_C3[7];
    SH_C3[0] = -0.59004358;
    SH_C3[1] = 2.890611442;
    SH_C3[2] = -0.45704579;
    SH_C3[3] = 0.373176332;
    SH_C3[4] = -0.45704579;
    SH_C3[5] = 1.445305721;
    SH_C3[6] = -0.59004358;

    vec3 result = /*SH_C0 * */sh[0];

    #if SH_DEGREE > 0
        float x = dir.x;
        float y = dir.y;
        float z = dir.z;
        result += - SH_C1 * y * sh[1] + SH_C1 * z * sh[2] - SH_C1 * x * sh[3];

        #if SH_DEGREE > 1
            float xx = x * x, yy = y * y, zz = z * z;
            float xy = x * y, yz = y * z, xz = x * z;
            result += 
                SH_C2[0] * xy * sh[4] +
                SH_C2[1] * yz * sh[5] +
                SH_C2[2] * (2.0 * zz - xx - yy) * sh[6] +
                SH_C2[3] * xz * sh[7] +
                SH_C2[4] * (xx - yy) * sh[8];

            #if SH_DEGREE > 2
                result += 
                    SH_C3[0] * y * (3.0 * xx - yy) * sh[9] +
                    SH_C3[1] * xy * z * sh[10] +
                    SH_C3[2] * y * (4.0 * zz - xx - yy) * sh[11] +
                    SH_C3[3] * z * (2.0 * zz - 3.0 * xx - 3.0 * yy) * sh[12] +
                    SH_C3[4] * x * (4.0 * zz - xx - yy) * sh[13] +
                    SH_C3[5] * z * (xx - yy) * sh[14] +
                    SH_C3[6] * x * (xx - 3.0 * yy) * sh[15];
            #endif
        #endif
    #endif

    return result;
}

vec4 decompose(uint value)
{
    vec4 components = vec4(
                        float((value            ) & 255u),
                        float((value >> uint( 8)) & 255u),
                        float((value >> uint(16)) & 255u),
                        float((value >> uint(24)) & 255u));

    return components * vec4(2./255.) - vec4(1.);
}

vec3 computeSH(Splat splat, vec3 dir)
{
    vec3 sh[16];
    
    sh[0] = vec3(0.,0.,0.);
    #if SH_DEGREE > 0
        vec4 sh00 = decompose(splat.sh0.x);
        vec4 sh01 = decompose(splat.sh0.y);
        vec4 sh02 = decompose(splat.sh0.z);

        sh[1] = vec3(sh00.x, sh00.y, sh00.z);
        sh[2] = vec3(sh00.w, sh01.x, sh01.y);
        sh[3] = vec3(sh01.z, sh01.w, sh02.x);
    #endif
    #if SH_DEGREE > 1
        vec4 sh04 = decompose(splat.sh1.x);
        vec4 sh05 = decompose(splat.sh1.y);
        vec4 sh06 = decompose(splat.sh1.z);
        vec4 sh07 = decompose(splat.sh1.w);

        sh[4] = vec3(sh04.x, sh04.y, sh04.z);
        sh[5] = vec3(sh04.w, sh05.x, sh05.y);
        sh[6] = vec3(sh05.z, sh05.w, sh06.x);
        sh[7] = vec3(sh06.y, sh06.z, sh06.w);
        sh[8] = vec3(sh07.x, sh07.y, sh07.z);
    #endif
    #if SH_DEGREE > 2
        vec4 sh08 = decompose(splat.sh2.x);
        vec4 sh09 = decompose(splat.sh2.y);
        vec4 sh10 = decompose(splat.sh2.z);
        vec4 sh11 = decompose(splat.sh2.w);

        sh[9] = vec3(sh08.x, sh08.y, sh08.z);
        sh[10] = vec3(sh08.w, sh09.x, sh09.y);
        sh[11] = vec3(sh09.z, sh09.w, sh10.x);
        sh[12] = vec3(sh10.y, sh10.z, sh10.w);
        sh[13] = vec3(sh11.x, sh11.y, sh11.z);
        sh[14] = vec3(sh11.w, 0.0, 0.0);
        sh[15] = vec3(0.0, 0.0, 0.0);    
    #endif

    return computeColorFromSHDegree(dir, sh);
}

/*-------------------------------
	FetchData
-------------------------------*/

Splat fetchSplatData( float index ) {

	ivec2 splatUVint = getDataUVint(index, uDataTexSize);

    vec4 posTex = texelFetch( uPositionTexture, splatUVint, 0 );

	Splat splat;
	splat.position = posTex.xyz;
	splat.color = texelFetch( uColorTexture, splatUVint, 0 );

	// 2枚のテクスチャから直接float値を読み取り
	vec4 cov1 = texelFetch(uCovariance1Texture, splatUVint, 0) * posTex.w;
	vec4 cov2 = texelFetch(uCovariance2Texture, splatUVint, 0) * posTex.w;
	
	// 行列に設定（対称行列）
	splat.covariance = mat3(
		cov1.x, cov1.y, cov1.z,
		cov1.y, cov2.x, cov2.y,
		cov1.z, cov2.y, cov2.z
	);

    #if SH_DEGREE > 0
        splat.sh0 = texelFetch(uShTexture0, splatUVint, 0);
    #endif
    #if SH_DEGREE > 1
        splat.sh1 = texelFetch(uShTexture1, splatUVint, 0);
    #endif
    #if SH_DEGREE > 2
        splat.sh2 = texelFetch(uShTexture2, splatUVint, 0);
    #endif
	
	return splat;
}

/*-------------------------------
	ActualIndex
-------------------------------*/

float fetchActualIndex( float index ) {

	ivec2 uv = getDataUVint( index, uDataTexSize );

	return texelFetch( uSortTex, uv, 0 ).x;

}

/*-------------------------------
	Main
-------------------------------*/

void main( void ) {

	#include <vert_in>

	float actualIndex = fetchActualIndex( instanceId );
	Splat splat = fetchSplatData( actualIndex );
	
	// ビュー変換後の座標を計算
	vec4 viewPos = uModelViewMatrix * vec4(splat.position, 1.0);
	vec4 pos2d = uProjectionMatrix * viewPos;
	
	// ヤコビアン行列の計算
	mat3 J = mat3(
		uFocal.x / viewPos.z, 0.0, -(uFocal.x * viewPos.x) / (viewPos.z * viewPos.z),
		0.0, uFocal.y / viewPos.z, -(uFocal.y * viewPos.y) / (viewPos.z * viewPos.z),
		0.0, 0.0, 0.0
	);

	// 投影のための変換行列
	mat3 T =  transpose(mat3(uModelViewMatrix)) * J;
	mat3 cov2d = transpose(T) * splat.covariance * T;
	
	// 楕円の軸計算
	float mid = (cov2d[0][0] + cov2d[1][1]) / 2.0;
	float radius = length(vec2((cov2d[0][0] - cov2d[1][1]) / 2.0, cov2d[0][1]));
	float epsilon = 0.0001;
	float lambda1 = mid + radius + epsilon; 
	float lambda2 = mid - radius + epsilon;
	
	if(lambda2 < 0.0) {
		// 無効な楕円は描画しない
		gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
		return;
	}
	
	// 楕円の主軸と副軸を計算
	vec2 diagonalVector = normalize(vec2(cov2d[0][1], lambda1 - cov2d[0][0]));

	vec2 majorAxis = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
	vec2 minorAxis = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
	
	vec2 localPos = outPos.xy;
	
	// 投影後の中心位置を計算
	vec2 vCenter = vec2(pos2d.xy);
	
	// 最終位置を計算
	vec4 finalPos = vec4(
		vCenter +
		( 
            localPos.x * majorAxis +
            localPos.y * minorAxis
        ) / uViewport * pos2d.w,
		pos2d.zw 
    );
	
	// SHによる色補正を適用
	vec3 finalColor = splat.color.rgb;
	
    #if SH_DEGREE > 0
        // カメラから見たスプラット位置への正規化された方向ベクトル
        vec3 viewDirection = normalize(splat.position - uCameraPosition);
        
        // SH係数による色補正を計算
        vec3 shColor = computeSH(splat, viewDirection);
        
        // 元の色にSH補正を加算
        finalColor += shColor * 0.0;
    #endif
	
	// 色とアルファ値の設定
	vColor = max(finalColor, 0.0); // 負の値をクランプ
	vAlpha = splat.color.a;
	vCUv = outPos.xy;
	
	#include <vert_out>

    // 以前のフレームのモデル座標からスクリーン座標を計算
    modelPositionPrev = uModelMatrixPrev * vec4(splat.position, 1.0);
    mvPositionPrev = uViewMatrixPrev * modelPositionPrev;
    positionPrev = uProjectionMatrixPrev * mvPositionPrev;
    // 速度ベクトルを計算
    vec2 velocity = (pos2d.xy / pos2d.w) - (positionPrev.xy / positionPrev.w);
    vVelocity = velocity * 0.2; // スケーリング
	
	// 最終位置を設定
	gl_Position = finalPos;
	
}`;function Wi(s,n,e,t){const r=new oe,i=new At({width:4,height:4,widthSegments:1,heightSegments:1}),o=n.positions.length/3,u=new Float32Array(o);for(let A=0;A<o;A++)u[A]=A;i.setAttribute("instanceId",u,1,{instanceDivisor:1});const a=Math.pow(2,Math.ceil(Math.log2(Math.sqrt(o)))),l=Math.pow(2,Math.ceil(Math.log2(o/a))),h=new Float32Array(a*l*4);h.fill(0);const p=new Float32Array(a*l*4);p.fill(0);const f=new Float32Array(a*l*4);f.fill(0);const d=new Float32Array(a*l*4);d.fill(0);const x=new Float32Array(a*l*4);x.fill(0);for(let A=0;A<o;A++){const N=A*4;h[N+0]=n.positions[A*3+0],h[N+1]=n.positions[A*3+1],h[N+2]=n.positions[A*3+2],h[N+3]=0,p[N+0]=n.colors[A*3+0],p[N+1]=n.colors[A*3+1],p[N+2]=n.colors[A*3+2],p[N+3]=n.alphas[A];const D=[n.rotations[A*4+0],n.rotations[A*4+1],n.rotations[A*4+2],-n.rotations[A*4+3]],j=[n.scales[A*3+0],n.scales[A*3+1],n.scales[A*3+2]],B=new ye(D[0],D[1],D[2],D[3]),F=new U().identity().applyQuaternion(B),z=new U().applyScale(new w(j[0],j[1],j[2]).multiply(2)),T=F.preMultiply(z).elm,I=[];I[0]=T[0]*T[0]+T[1]*T[1]+T[2]*T[2],I[1]=T[0]*T[4]+T[1]*T[5]+T[2]*T[6],I[2]=T[0]*T[8]+T[1]*T[9]+T[2]*T[10],I[3]=T[4]*T[4]+T[5]*T[5]+T[6]*T[6],I[4]=T[4]*T[8]+T[5]*T[9]+T[6]*T[10],I[5]=T[8]*T[8]+T[9]*T[9]+T[10]*T[10];let J=-1e4;for(let te=0;te<6;te++)J=Math.max(J,Math.abs(I[te]));h[N+3]=J,d[N+0]=I[0]/J,d[N+1]=I[1]/J,d[N+2]=I[2]/J,d[N+3]=0,x[N+0]=I[3]/J,x[N+1]=I[4]/J,x[N+2]=I[5]/J,x[N+3]=0}const E=new M(s);E.setting({type:s.FLOAT,internalFormat:s.RGBA32F,format:s.RGBA,magFilter:s.NEAREST,minFilter:s.NEAREST}),E.attach({width:a,height:l,data:h});const y=new M(s);y.setting({type:s.FLOAT,internalFormat:s.RGBA32F,format:s.RGBA,magFilter:s.NEAREST,minFilter:s.NEAREST}),y.attach({width:a,height:l,data:p});const b=new M(s);b.setting({type:s.FLOAT,internalFormat:s.RGBA32F,format:s.RGBA,magFilter:s.NEAREST,minFilter:s.NEAREST}),b.attach({width:a,height:l,data:f});const g=new M(s);g.setting({type:s.FLOAT,internalFormat:s.RGBA32F,format:s.RGBA,magFilter:s.NEAREST,minFilter:s.NEAREST}),g.attach({width:a,height:l,data:d});const R=new M(s);R.setting({type:s.FLOAT,internalFormat:s.RGBA32F,format:s.RGBA,magFilter:s.NEAREST,minFilter:s.NEAREST}),R.attach({width:a,height:l,data:x});const S={uPositionTexture:{value:E,type:"1i"},uColorTexture:{value:y,type:"1i"},uSortTex:{value:b,type:"1i"},uCovariance1Texture:{value:g,type:"1i"},uCovariance2Texture:{value:R,type:"1i"},uDataTexSize:{value:new w(a,l),type:"2fv"},uInstanceCount:{value:o,type:"1i"},uFocal:{value:new w(1164.6601287484507,1159.5880733038064),type:"2fv"},uViewport:{value:new w,type:"2fv"}};if(n.sphericalHarmonics){const A=e.shDegree,N=Gi(A),D=B=>Math.max(0,Math.min(255,Math.round((B+1)*127.5))),j=(B,F,z,T)=>{const I=D(B),J=D(F),te=D(z);return D(T)<<24|te<<16|J<<8|I};if(A>0){const B=new Uint32Array(a*l*4);B.fill(0);for(let z=0;z<o;z++){const T=z*4,I=n.sphericalHarmonics[z*N+1*3+0],J=n.sphericalHarmonics[z*N+1*3+1],te=n.sphericalHarmonics[z*N+1*3+2],fe=n.sphericalHarmonics[z*N+2*3+0],pe=n.sphericalHarmonics[z*N+2*3+1],be=n.sphericalHarmonics[z*N+2*3+2],ge=n.sphericalHarmonics[z*N+3*3+0],Te=n.sphericalHarmonics[z*N+3*3+1],Oe=n.sphericalHarmonics[z*N+3*3+2];B[T+0]=j(I,J,te,fe),B[T+1]=j(pe,be,ge,Te),B[T+2]=j(Oe,0,0,0),B[T+3]=0}const F=new M(s);F.setting({type:s.UNSIGNED_INT,internalFormat:s.RGBA32UI,format:s.RGBA_INTEGER,magFilter:s.NEAREST,minFilter:s.NEAREST}),F.attach({width:a,height:l,data:B}),S.uShTexture0={value:F,type:"1i"}}if(A>1){const B=new Uint32Array(a*l*4);B.fill(0);for(let z=0;z<o;z++){const T=z*4,I=n.sphericalHarmonics[z*N+4*3+0],J=n.sphericalHarmonics[z*N+4*3+1],te=n.sphericalHarmonics[z*N+4*3+2],fe=n.sphericalHarmonics[z*N+5*3+0],pe=n.sphericalHarmonics[z*N+5*3+1],be=n.sphericalHarmonics[z*N+5*3+2],ge=n.sphericalHarmonics[z*N+6*3+0],Te=n.sphericalHarmonics[z*N+6*3+1],Oe=n.sphericalHarmonics[z*N+6*3+2],nt=n.sphericalHarmonics[z*N+7*3+0],rt=n.sphericalHarmonics[z*N+7*3+1],it=n.sphericalHarmonics[z*N+7*3+2],st=n.sphericalHarmonics[z*N+8*3+0],ot=n.sphericalHarmonics[z*N+8*3+1],at=n.sphericalHarmonics[z*N+8*3+2];B[T+0]=j(I,J,te,fe),B[T+1]=j(pe,be,ge,Te),B[T+2]=j(Oe,nt,rt,it),B[T+3]=j(st,ot,at,0)}const F=new M(s);F.setting({type:s.UNSIGNED_INT,internalFormat:s.RGBA32UI,format:s.RGBA_INTEGER,magFilter:s.NEAREST,minFilter:s.NEAREST}),F.attach({width:a,height:l,data:B}),S.uShTexture1={value:F,type:"1i"}}if(A>2){const B=new Uint32Array(a*l*4);B.fill(0);for(let z=0;z<o;z++){const T=z*4,I=(_n,Nn)=>{const St=z*N+_n*3+Nn;return St<n.sphericalHarmonics.length?n.sphericalHarmonics[St]:0},J=I(9,0),te=I(9,1),fe=I(9,2),pe=I(10,0),be=I(10,1),ge=I(10,2),Te=I(11,0),Oe=I(11,1),nt=I(11,2),rt=I(12,0),it=I(12,1),st=I(12,2),ot=I(13,0),at=I(13,1),bn=I(13,2),wn=I(14,0);I(14,1),I(14,2),I(15,0),I(15,1),I(15,2),B[T+0]=j(J,te,fe,pe),B[T+1]=j(be,ge,Te,Oe),B[T+2]=j(nt,rt,it,st),B[T+3]=j(ot,at,bn,wn)}const F=new M(s);F.setting({type:s.UNSIGNED_INT,internalFormat:s.RGBA32UI,format:s.RGBA_INTEGER,magFilter:s.NEAREST,minFilter:s.NEAREST}),F.attach({width:a,height:l,data:B}),S.uShTexture2={value:F,type:"1i"}}}const _=new de({phase:["forward"],frag:Hi,vert:Xi,uniforms:S,defines:{SH_DEGREE:e.shDegree.toString()},depthTest:!1});e.shDegree>0&&(_.defines.USE_SPHERICAL_HARMONICS="",_.defines.USE_SH_TEXTURE="");const k=r.addComponent(ie);k.geometry=i,k.material=_;const P=r.addComponent(Et,{gaussianPositions:n.positions,numPoints:o,material:_});return{scene:r,updateSort:A=>{P.updateSort()}}}var yt=(s=>(s[s.UNSPECIFIED=0]="UNSPECIFIED",s[s.RUB=1]="RUB",s[s.RDF=2]="RDF",s[s.LUF=3]="LUF",s[s.RUF=4]="RUF",s))(yt||{});class $e extends ${constructor(e){super();c(this,"gl");c(this,"spzWorker",null);c(this,"splatWorker",null);this.gl=e}static detectFormat(e){if(ji(e))return"splat";try{if(new DataView(e).getUint32(0,!0)===559903)return"spz"}catch{}return"unknown"}async load(e,t={}){const r={sourceCoordinateSystem:0,targetCoordinateSystem:1,antialias:!0,isCompressed:void 0,...t},o=await(await fetch(e)).arrayBuffer(),u=$e.detectFormat(o);let a,l=null;if(u==="splat"){console.log("3DGSLoader: Splat形式として読み込みます");const p=await this.parseSplatWithWorker(o);a=p.gaussianData,l=p.header}else if(u==="spz"){console.log("3DGSLoader: SPZ形式として読み込みます");const p=await this.parseSPZWithWorker(o,r.isCompressed);a=p.gaussianData,l=p.header}else throw new Error("3DGSLoader: サポートされていないファイル形式です。SplatまたはSPZ形式のファイルを指定してください。");return Wi(this.gl,a,l)}async parseSplatWithWorker(e){return new Promise((t,r)=>{if(!this.splatWorker){const o=new URL("data:video/mp2t;base64,Ly8gU3BsYXTjg5XjgqHjgqTjg6vlsILnlKjjga7jg5Hjg7zjgrfjg7PjgrBXZWJXb3JrZXIKCmltcG9ydCB7IHBhcnNlU3BsYXQsIGNyZWF0ZVNwbGF0RHVtbXlIZWFkZXIgfSBmcm9tICcuLi9wYXJzZXJzL1NwbGF0RGF0YVBhcnNlcic7CmltcG9ydCB7IFNQWkdhdXNzaWFuRGF0YSB9IGZyb20gJy4uL3V0aWxzL0Nvb3JkaW5hdGVTeXN0ZW1Db252ZXJ0ZXInOwoKLy8gU3BsYXTlsILnlKjjg6Hjg4Pjgrvjg7zjgrjjgr/jgqTjg5cKZXhwb3J0IHR5cGUgU3BsYXRXb3JrZXJNZXNzYWdlID0gewoJdHlwZTogJ3BhcnNlJzsKCWRhdGE6IHsKCQlidWZmZXI6IEFycmF5QnVmZmVyOwoJfTsKfTsKCmV4cG9ydCB0eXBlIFNwbGF0V29ya2VyUmVzcG9uc2UgPSB7Cgl0eXBlOiAncmVzdWx0JyB8ICdlcnJvcic7CglkYXRhOiB7CgkJZ2F1c3NpYW5EYXRhPzogU1BaR2F1c3NpYW5EYXRhOwoJCWhlYWRlcj86IGFueTsKCQllcnJvcj86IHN0cmluZzsKCX07Cn07CgooIHNlbGYgYXMgYW55ICkub25tZXNzYWdlID0gYXN5bmMgKCBldmVudDogTWVzc2FnZUV2ZW50PFNwbGF0V29ya2VyTWVzc2FnZT4gKSA9PiB7CgoJY29uc3QgeyB0eXBlLCBkYXRhIH0gPSBldmVudC5kYXRhOwoKCWlmICggdHlwZSA9PT0gJ3BhcnNlJyApIHsKCgkJdHJ5IHsKCgkJCWNvbnNvbGUubG9nKCAnU3BsYXRQYXJzZVdvcmtlcjogU3BsYXTlvaLlvI/jgajjgZfjgabop6PmnpDplovlp4snICk7CgkJCQoJCQljb25zdCB7IGJ1ZmZlciB9ID0gZGF0YTsKCQkJY29uc3QgZ2F1c3NpYW5EYXRhID0gcGFyc2VTcGxhdCggYnVmZmVyICk7CgkJCWNvbnN0IGhlYWRlciA9IGNyZWF0ZVNwbGF0RHVtbXlIZWFkZXIoIGdhdXNzaWFuRGF0YS5wb3NpdGlvbnMubGVuZ3RoIC8gMyApOwoKCQkJLy8g57WQ5p6c44KS6YCB5L+hCgkJCWNvbnN0IHJlc3BvbnNlOiBTcGxhdFdvcmtlclJlc3BvbnNlID0gewoJCQkJdHlwZTogJ3Jlc3VsdCcsCgkJCQlkYXRhOiB7CgkJCQkJZ2F1c3NpYW5EYXRhLAoJCQkJCWhlYWRlcgoJCQkJfQoJCQl9OwoKCQkJKCBzZWxmIGFzIGFueSApLnBvc3RNZXNzYWdlKCByZXNwb25zZSApOwoKCQl9IGNhdGNoICggZXJyb3IgKSB7CgoJCQkvLyDjgqjjg6njg7zjgpLpgIHkv6EKCQkJY29uc3QgcmVzcG9uc2U6IFNwbGF0V29ya2VyUmVzcG9uc2UgPSB7CgkJCQl0eXBlOiAnZXJyb3InLAoJCQkJZGF0YTogewoJCQkJCWVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdTcGxhdCBwYXJzZSBlcnJvcicKCQkJCX0KCQkJfTsKCgkJCSggc2VsZiBhcyBhbnkgKS5wb3N0TWVzc2FnZSggcmVzcG9uc2UgKTsKCgkJfQoKCX0KCn07Cg==",import.meta.url);this.splatWorker=new Worker(o,{type:"module"})}this.splatWorker.onmessage=o=>{const{type:u,data:a}=o.data;u==="result"?t(a):u==="error"&&r(new Error(a.error))},this.splatWorker.onerror=o=>{r(new Error(`SplatWorker error: ${o.message}`))};const i={type:"parse",data:{buffer:e}};this.splatWorker.postMessage(i,[e])})}async parseSPZWithWorker(e,t){return new Promise((r,i)=>{if(!this.spzWorker){const u=new URL("data:video/mp2t;base64,Ly8gU1Ba44OV44Kh44Kk44Or5bCC55So44Gu44OR44O844K344Oz44KwV2ViV29ya2VyCgppbXBvcnQgeyBwYXJzZVNQWiB9IGZyb20gJy4uL3BhcnNlcnMvU1BaRGF0YVBhcnNlcic7CmltcG9ydCB7IFNQWkdhdXNzaWFuRGF0YSB9IGZyb20gJy4uL3V0aWxzL0Nvb3JkaW5hdGVTeXN0ZW1Db252ZXJ0ZXInOwoKLy8gU1Ba5bCC55So44Oh44OD44K744O844K444K/44Kk44OXCmV4cG9ydCB0eXBlIFNQWldvcmtlck1lc3NhZ2UgPSB7Cgl0eXBlOiAncGFyc2UnOwoJZGF0YTogewoJCWJ1ZmZlcjogQXJyYXlCdWZmZXI7CgkJaXNDb21wcmVzc2VkPzogYm9vbGVhbjsKCX07Cn07CgpleHBvcnQgdHlwZSBTUFpXb3JrZXJSZXNwb25zZSA9IHsKCXR5cGU6ICdyZXN1bHQnIHwgJ2Vycm9yJzsKCWRhdGE6IHsKCQlnYXVzc2lhbkRhdGE/OiBTUFpHYXVzc2lhbkRhdGE7CgkJaGVhZGVyPzogYW55OwoJCWVycm9yPzogc3RyaW5nOwoJfTsKfTsKCiggc2VsZiBhcyBhbnkgKS5vbm1lc3NhZ2UgPSBhc3luYyAoIGV2ZW50OiBNZXNzYWdlRXZlbnQ8U1BaV29ya2VyTWVzc2FnZT4gKSA9PiB7CgoJY29uc3QgeyB0eXBlLCBkYXRhIH0gPSBldmVudC5kYXRhOwoKCWlmICggdHlwZSA9PT0gJ3BhcnNlJyApIHsKCgkJdHJ5IHsKCgkJCWNvbnN0IHsgYnVmZmVyLCBpc0NvbXByZXNzZWQgfSA9IGRhdGE7CgkJCWNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhcnNlU1BaKCBidWZmZXIsIGlzQ29tcHJlc3NlZCApOwoKCQkJLy8g57WQ5p6c44KS6YCB5L+hCgkJCWNvbnN0IHJlc3BvbnNlOiBTUFpXb3JrZXJSZXNwb25zZSA9IHsKCQkJCXR5cGU6ICdyZXN1bHQnLAoJCQkJZGF0YTogewoJCQkJCWdhdXNzaWFuRGF0YTogcmVzdWx0LmdhdXNzaWFuRGF0YSwKCQkJCQloZWFkZXI6IHJlc3VsdC5oZWFkZXIKCQkJCX0KCQkJfTsKCgkJCSggc2VsZiBhcyBhbnkgKS5wb3N0TWVzc2FnZSggcmVzcG9uc2UgKTsKCgkJfSBjYXRjaCAoIGVycm9yICkgewoKCQkJLy8g44Ko44Op44O844KS6YCB5L+hCgkJCWNvbnN0IHJlc3BvbnNlOiBTUFpXb3JrZXJSZXNwb25zZSA9IHsKCQkJCXR5cGU6ICdlcnJvcicsCgkJCQlkYXRhOiB7CgkJCQkJZXJyb3I6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1NQWiBwYXJzZSBlcnJvcicKCQkJCX0KCQkJfTsKCgkJCSggc2VsZiBhcyBhbnkgKS5wb3N0TWVzc2FnZSggcmVzcG9uc2UgKTsKCgkJfQoKCX0KCn07Cg==",import.meta.url);this.spzWorker=new Worker(u,{type:"module"})}this.spzWorker.onmessage=u=>{const{type:a,data:l}=u.data;a==="result"?r(l):a==="error"&&i(new Error(l.error))},this.spzWorker.onerror=u=>{i(new Error(`SPZWorker error: ${u.message}`))};const o={type:"parse",data:{buffer:e,isCompressed:t}};this.spzWorker.postMessage(o,[e])})}terminate(){this.splatWorker&&(this.splatWorker.terminate(),this.splatWorker=null),this.spzWorker&&(this.spzWorker.terminate(),this.spzWorker=null)}}class Ie{static serializeEntity(n){const e=t=>{const r=[];return t.children.forEach(i=>{i.initiator!="script"&&r.push(e(i))}),{name:t.name,pos:t.position.x==0&&t.position.y==0&&t.position.z==0?void 0:t.position.getElm("vec3"),rot:t.euler.x==0&&t.euler.y==0&&t.euler.z==0?void 0:t.euler.getElm("vec3"),scale:t.scale.x==1&&t.scale.y==1&&t.scale.z==1?void 0:t.scale.getElm("vec3"),childs:r.length>0?r:void 0}};return e(n)}static serializeEntityOverride(n,e){const t=[];return n.traverse(r=>{const o={path:r.getScenePath(n)},u=[];r.components.forEach(a=>{const l=a.serialize({mode:"export"}),h=Object.keys(l).length>0,p={name:e.getName(a)};!h&&a.initiator!=="user"||(h&&(p.props=l),u.push(p))}),u.length>0&&(o.components=u),!(r.initiator!=="user"&&!o.components)&&t.push(o)}),t}static deserializeOverride(n,e,t,r){t.traverse(i=>{const o=i.getScenePath(e),u=n.find(a=>a.path==o);u&&(u.components||[]).forEach(a=>{const l=r.resolve(a.name);if(l){let h=i.getComponent(l.component);h||(h=i.addComponent(l.component),h.initiator="user"),a.props&&h.deserialize(a.props)}})})}static deserializeEntity(n,e){const t=(r,i)=>{const o=i||new oe;o.initiator="user",o.name=r.name;const u=r.pos||[0,0,0];o.position.x=u[0],o.position.y=u[1],o.position.z=u[2];const a=r.rot||[0,0,0];o.euler.x=a[0],o.euler.y=a[1],o.euler.z=a[2];const l=r.scale||[1,1,1];return o.scale.x=l[0],o.scale.y=l[1],o.scale.z=l[2],r.childs&&r.childs.forEach(h=>{o.add(t(h))}),o};n&&t(n,e),e.initiator="god"}}class Zi extends ${constructor(){super();c(this,"_componentList");c(this,"_componentGroups");c(this,"_textures");this._componentList=[],this._textures=new Map,this._componentGroups=[]}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get textures(){return this._textures}clear(){this._componentList=[],this._componentGroups=[],this._textures.clear()}getComponent(e){return this._componentList.find(t=>t.name==e)}addComponentGroup(e){let t=this._componentGroups.find(i=>i.name==e);if(t)return t;const r=i=>{const o=[];return{child:o,name:i,addComponent:(u,a)=>{const l={name:u,component:a};o.push(l),this._componentList.push(l)},createGroup:u=>{const a=r(u);return o.push(a),a}}};return t=r(e),this._componentGroups.push(t),t}addTexture(e,t){return this._textures.set(e,t),t}getTexture(e){return this._textures.get(e)}}const _e=class _e extends oe{constructor(e){super();c(this,"enableRender");c(this,"_renderer");c(this,"_gl");c(this,"_canvas");c(this,"_projectCache");c(this,"_root");c(this,"_uniforms");c(this,"_time");c(this,"_frame");c(this,"_frameSetting");c(this,"_disposed");_e.instances.set(e,this),this._gl=e,this.name="OREngine",this._disposed=!1,this._uniforms={uTime:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uEnvMapIntensity:{value:1,type:"1f"}},this._canvas=e.canvas,this._renderer=new un(e),this._projectCache=null,this.on("update/blidge/scene",r=>{this._projectCache&&Ie.deserializeOverride(this._projectCache.overrides,this._root,r,this._createComponentResolver())}),this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this.enableRender=!0,this._root=new oe,this._root.initiator="god",this._root.name="root",this.add(this._root),this.field("name",()=>this.name,r=>this.name=r),this.field("scene",()=>Ie.serializeEntity(this._root),r=>{Ie.deserializeEntity(r,this._root)}),this.field("overrides",()=>Ie.serializeEntityOverride(this._root,this._createComponentResolver()),r=>{Ie.deserializeOverride(r,this._root,this._root,this._createComponentResolver())});const t=this.fieldDir("timeline");t.field("duration",()=>this._frameSetting.duration,r=>this._frameSetting.duration=r),t.field("fps",()=>this._frameSetting.fps,r=>this._frameSetting.fps=r)}static getInstance(e){const t=this.instances.get(e);if(!t)throw new Error("ERROR: NO ENGINE INSTANCE!!!");return t}get gl(){return this._gl}get canvas(){return this._canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}get disposed(){return this._disposed}_createComponentResolver(){return{resolve:e=>_e.resources.getComponent(e),getName:e=>{const t=_e.resources.componentList.find(r=>e instanceof r.component);return t?t.name:e.constructor.name}}}init(){this._root.remove(this._renderer),this._root.disposeRecursive(),this._root.add(this._renderer),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.add(this._root),this.name="New Project"}async load(e){this.init(),this.deserialize(e),this._projectCache=e||null,this.emit("update/graph"),this.emit("loaded")}update(e){const t=new Date().getTime();this._time.delta=(t-this._time.current)/1e3,this._time.current=t,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*(this._frame.playing?1:0),this._frame.current=this._time.code*60;const r=this.createEntityUpdateEvent({forceDraw:e==null?void 0:e.forceDraw});return this._uniforms.uTime.value=this._time.code,this._uniforms.uTimeE.value=this._time.engine,this._root.update(r),this.enableRender&&this._renderer.render(this._root,r),this._frame.playing&&this.emit("update/frame/play",[this._frame]),this._time.delta}createEntityUpdateEvent(e){const t={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return e?{...t,...e}:t}setSize(e){this._renderer.resize(e),this._canvas.width=e.x,this._canvas.height=e.y}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(e){this._time.code=e/60,this._frame.current=e,this.emit("update/frame/play",[this._frame])}compileShaders(e){const t=this.createEntityUpdateEvent({forceDraw:!0});return this.renderer.compileShaders(this._root,t,e)}dispose(){super.dispose(),this._disposed=!0,this._root.remove(this._renderer),this._root.disposeRecursive()}};c(_e,"resources"),c(_e,"instances");let Q=_e;Q.resources=new Zi;Q.instances=new Map;const Yi=()=>v.useContext(qt),Ji="_compoAdd_5919t_45",Ki="_directory_5919t_49",qi="_subDirectory_5919t_70",Qi="_picker_5919t_116",et={compoAdd:Ji,directory:Ki,subDirectory:qi,picker:Qi},mn=({group:s,onClickAdd:n})=>{const e=Yi(),[t,r]=v.useState(!1);let i=null,o,u="dir";return s.name.startsWith("_")?null:("child"in s?i=m.jsxDEV(m.Fragment,{children:s.child.map((a,l)=>m.jsxDEV(mn,{group:a,onClickAdd:n},l,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:40,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:37,columnNumber:15},void 0):(o=()=>n(s),u="item"),m.jsxDEV("div",{className:et.directory,onPointerEnter:()=>r(!0),onPointerLeave:()=>r(!1),onClick:o,"data-type":u,"data-direction":e==null?void 0:e.direction,children:[s.name,t&&m.jsxDEV("div",{className:et.subDirectory,children:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:61,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:52,columnNumber:9},void 0))},$i=s=>{const{pushContent:n,closeAll:e}=wt(),t=Q.resources,r=v.useCallback(i=>{if(!t||!n||!e)return;const o=[],u=a=>{s.entity.addComponent(a.component).initiator="user",e()};t.componentGroups.forEach((a,l)=>{o.push(m.jsxDEV(mn,{group:a,onClickAdd:u},l,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:91,columnNumber:5},void 0))}),n(m.jsxDEV("div",{className:et.picker,children:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:98,columnNumber:4},void 0))},[n,t,s.entity,e]);return m.jsxDEV("div",{className:et.compAdd,children:m.jsxDEV(Pe,{onClick:r,children:"Add Component"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:107,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:106,columnNumber:9},void 0)},es="_cross_nfbq8_45",ts={cross:es},ns=()=>m.jsxDEV("div",{className:ts.cross,children:m.jsxDEV("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[m.jsxDEV("rect",{x:"5.12",y:"16.832",width:"2.57272",height:"17.6514",transform:"rotate(-135 5.12 16.832)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),m.jsxDEV("rect",{x:"3.30078",y:"4.35059",width:"2.57272",height:"17.6514",transform:"rotate(-45 3.30078 4.35059)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:8,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),rs="_compoView_xyl36_45",is="_head_xyl36_52",ss="_name_xyl36_58",os="_check_xyl36_62",as="_propertyBlock_xyl36_76",ze={compoView:rs,head:is,name:ss,check:os,delete:"_delete_xyl36_66",propertyBlock:as},ls=({component:s})=>{W(s,"enabled");const n=s.initiator!=="user",e=v.useCallback(r=>{r.stopPropagation();const i=s.entity;i&&i.removeComponentByUUID(s.uuid)},[s]),t=m.jsxDEV("div",{className:ze.head,children:[m.jsxDEV("div",{className:ze.name,children:s.constructor.name},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:40,columnNumber:3},void 0),m.jsxDEV("div",{className:ze.delete,children:m.jsxDEV("button",{onClick:e,children:m.jsxDEV(ns,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:44,columnNumber:36},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:44,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:43,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:36,columnNumber:19},void 0);return m.jsxDEV("div",{className:ze.compoView,"data-disable_component":n,children:m.jsxDEV("div",{className:ze.content,children:m.jsxDEV(Ce,{label:t,accordion:!0,bg:!0,defaultClose:!1,children:m.jsxDEV(sn,{target:s},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:51,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:50,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:49,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:48,columnNumber:9},void 0)},cs="_container_18572_1",us={container:cs},ms=({entity:s})=>{const[n]=W(s,"components"),e=v.useMemo(()=>{const t=[];return n?(n.forEach(r=>{const i=s.getComponentByUUID(r);i&&t.push(m.jsxDEV(ls,{component:i},i.uuid,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentList/index.tsx",lineNumber:31,columnNumber:5},void 0))}),t):null},[n,s]);return m.jsxDEV("div",{className:us.container,children:e},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentList/index.tsx",lineNumber:40,columnNumber:9},void 0)},hs="_property_5puun_45",ds="_content_5puun_50",fs="_name_5puun_54",ps="_component_controls_5puun_60",gs={property:hs,content:ds,name:fs,component_controls:ps},Bt=()=>{const{editor:s,engine:n}=Ee(),[e]=W(s,"selectedEntityId"),t=v.useMemo(()=>{if(e)return n.findEntityByUUID(e)},[n,e]);return t?m.jsxDEV("div",{className:gs.container,children:[m.jsxDEV(Ce,{label:"Fields",accordion:!0,children:m.jsxDEV(sn,{target:t},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:41,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:40,columnNumber:3},void 0),m.jsxDEV(Ce,{label:"Components",accordion:!0,children:[m.jsxDEV(ms,{entity:t},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:44,columnNumber:4},void 0),m.jsxDEV($i,{entity:t},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:45,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:43,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:39,columnNumber:9},void 0):null},hn=v.createContext(null),dn=()=>{const s=v.useContext(hn);if(s===null)throw new Error("useOREngine must be used within a OREngineProvider");return s},xs="_container_q8d38_45",Ft={container:xs},Vt=()=>{const{engine:s}=dn(),n=v.useRef(null);return v.useEffect(()=>{const e=s.renderer;let t=[];const r=o=>{t=o};e.on("timer",r);const i=window.setInterval(()=>{if(n.current===null)return;const o=n.current;o.innerHTML="";let u="";const a=t.reduce((h,p)=>h+p.duration,0);u+=`Total: ${(a.toPrecision(3)+"000").slice(0,4)} ms<br/>`;const l=t.sort((h,p)=>h.name<p.name?1:-1);for(let h=0;h<l.length;h++){const p=l[h],f=(p.duration.toPrecision(3)+"000").slice(0,5),d=`rgb(200 ${(1-p.duration)*200} ${(1-p.duration)*200})`;u+=`<span style="color: ${d}">${f}</span> : 		${p.name}<br/>`}o.innerHTML=u},500);return()=>{e.off("timer",r),window.clearInterval(i)}},[s]),m.jsxDEV("div",{className:Ft.container,children:m.jsxDEV("div",{className:Ft.inner,ref:n},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/GPUTimer/index.tsx",lineNumber:70,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/GPUTimer/index.tsx",lineNumber:69,columnNumber:9},void 0)},vs="_group_vm37a_45",Es="_submit_vm37a_51",Lt={group:vs,submit:Es},ys=s=>{const n=s.initialValues,e=[],[t,r]=v.useState(n);v.useEffect(()=>{r(n)},[n]);const i=Object.keys(t);for(let u=0;u<i.length;u++){const a=i[u],l=t[a];e.push(m.jsxDEV(me,{label:a,value:l,onChange:h=>{r({...t,[a]:h})}},u,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:34,columnNumber:18},void 0))}const o=v.useRef(null);return v.useEffect(()=>{setTimeout(()=>{var u;o.current&&((u=o.current.querySelector("input"))==null||u.focus())},0)},[]),m.jsxDEV("div",{className:Lt.group,ref:o,children:m.jsxDEV("form",{onSubmit:u=>{u.preventDefault()},children:[m.jsxDEV(Ce,{label:s.title,noMargin:!0,children:e},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:68,columnNumber:4},void 0),m.jsxDEV("div",{className:Lt.submit,children:m.jsxDEV(Pe,{type:"submit",onClick:()=>{s.onSubmit&&s.onSubmit(t)},children:"OK"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:72,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:71,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:63,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:62,columnNumber:9},void 0)},bs="_picker_lpoad_45",ws="_picker_label_lpoad_58",_s="_picker_list_lpoad_63",Ns="_picker_list_inner_lpoad_68",Rs="_item_lpoad_76",Be={picker:bs,picker_label:ws,picker_list:_s,picker_list_inner:Ns,item:Rs},As=s=>m.jsxDEV("div",{className:Be.picker,"data-no_bg":s.noBg,children:[s.label&&m.jsxDEV("div",{className:Be.picker_label,children:s.label},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:18,columnNumber:19},void 0),m.jsxDEV("div",{className:Be.picker_list,children:m.jsxDEV("div",{className:Be.picker_list_inner,children:s.list.map((n,e)=>m.jsxDEV("div",{className:Be.item,onClick:n.onClick,children:n.label},e,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:25,columnNumber:14},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:20,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:16,columnNumber:9},void 0),Cs="_node_dzvso_45",Ps="_self_dzvso_54",Ss="_self_name_dzvso_65",ks="_fold_dzvso_76",Ts="_fold_button_dzvso_79",Os="_child_dzvso_92",Ms="_child_line_dzvso_95",we={node:Cs,self:Ps,self_name:Ss,fold:ks,fold_button:Ts,child:Os,child_line:Ms},fn=s=>{const{editor:n,engine:e}=Ee(),[t]=W(n,"selectedEntityId"),r=t!==void 0&&e.findEntityByUUID(t),[i]=W(s.entity,"children"),o=(i||[]).map(R=>e.findEntityByUUID(R)).filter(R=>R!==void 0),u=s.depth||0,a=o&&o.concat().sort((R,S)=>R.name.localeCompare(S.name))||[],l=a.length>0,h=u*20,p=s.entity.initiator=="script",[f,d]=v.useState(!0),x=v.useCallback(R=>{d(!f),R.stopPropagation()},[f]),E=v.useCallback(()=>{n&&n.selectEntity(s.entity)},[n,s.entity]),{pushContent:y,closeAll:b}=wt(),g=v.useCallback(R=>{R.preventDefault(),!(!n||!y||!b||p)&&(n.selectEntity(s.entity),y(m.jsxDEV(As,{label:s.entity.name,list:[{label:"Add Entity",onClick:()=>{y(m.jsxDEV(ys,{initialValues:{name:""},onSubmit:S=>{const _=n.createEntity(s.entity,S.name);n.selectEntity(_),b()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:75,columnNumber:7},void 0))}},{label:"Delete Entity",onClick:()=>{n.deleteEntity(s.entity),b()}}]},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:69,columnNumber:16},void 0)))},[n,s.entity,y,b,p]);return m.jsxDEV("div",{className:we.node,"data-no_export":p,children:[m.jsxDEV("div",{className:we.self,style:{paddingLeft:h},onClick:E,onContextMenu:g,"data-selected":r&&r.uuid==s.entity.uuid,children:[m.jsxDEV("div",{className:we.fold,"data-hnode_open":f,children:l&&m.jsxDEV("button",{className:we.fold_button,onClick:x,children:m.jsxDEV(bt,{open:f},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:106,columnNumber:87},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:106,columnNumber:18},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:105,columnNumber:4},void 0),m.jsxDEV("div",{className:we.self_name,children:m.jsxDEV("p",{children:[s.entity.name||"-"," ",m.jsxDEV("span",{children:["[",s.entity.uuid,"]"]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:109,columnNumber:35},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:109,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:108,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:104,columnNumber:3},void 0),l&&m.jsxDEV("div",{className:we.child,"data-open":f,children:[a.map(R=>m.jsxDEV(fn,{entity:R,depth:u+1},R.uuid,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:116,columnNumber:13},void 0)),m.jsxDEV("div",{className:we.child_line,style:{marginLeft:h+4}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:120,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:112,columnNumber:16},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:103,columnNumber:9},void 0)},Ds={},Ut=()=>{const{editor:s}=Ee(),n=s.engine._root;return m.jsxDEV("div",{className:Ds.hierarchy,children:n&&m.jsxDEV(fn,{entity:n},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/index.tsx",lineNumber:14,columnNumber:18},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/index.tsx",lineNumber:13,columnNumber:9},void 0)},Is="_container_iunxa_1",zs="_row_iunxa_11",ce={container:Is,row:zs},Bs=new w,L=new $,ee=[];for(let s=0;s<8;s++)ee.push({values:new w,btn1:0,btn2:0,valuesLerped:new w,btn1Lerped:0,btn2Lerped:0});const Z={btn1:0,btn2:0,btn3:0,btn1Lerped:0,btn2Lerped:0,btn3Lerped:0,master:0,masterLerped:0};class C extends q{constructor(e){super(e);c(this,"input");c(this,"output");this.input=null,this.output=null;const t=()=>{this._disposed||navigator.requestMIDIAccess().then(o=>{this._disposed||(o.inputs.forEach(u=>{u.name=="MIDI Mix"&&(this.input=u)}),this.input&&(this.input.onmidimessage=this.onMidiMessage.bind(this)),o.outputs.forEach(u=>{u.name=="MIDI Mix"&&(this.output=u)}),this.updateLight())}).catch(o=>{console.error(o)})},r=()=>{this.output&&this.output.close(),this.input&&(this.input.onmidimessage=null,this.input.close())};setTimeout(()=>{t()},100),this.field("reconnect",()=>()=>{r(),t()},void 0,{label:"Reconnect"});const i=(o,u,a)=>{this.onControl(o,u,a)};L.on("emulateControl",i),this.restore(),this.once("dispose",()=>{r(),L.off("emulateControl",i)})}static get lines(){return ee}static get side(){return Z}static getLine(e){return ee[e]}static emulateControl(e,t,r){L.emit("emulateControl",[e,t,r])}static on(e,t){L.on(e,t)}static off(e,t){L.off(e,t)}onControl(e,t,r){if(e==176&&(16<=t&&t<=31||46<=t&&t<=61)){46<=t&&(t-=14);const i=Math.floor((t-16)/4),o=ee[i].values,u=t%4;u==0?o.x=r:u==1?o.y=r:u==2?o.z=r:o.w=r,L.emit("value",[C]),L.emit(`value/${i+1}`,[ee[i]]),L.emit(`value/${i+1}/${u}`,[r])}if(e==176&&t==62&&(Z.master=r,L.emit("value",[C]),L.emit("value/master",[Z.master])),e==144){const i=Math.floor((t-1)/3);if(i<8){const o=ee[i],u=(t+2)%3==0?1:2;u==1?o.btn1=1-o.btn1:u==2&&(o.btn2=1-o.btn2),L.emit("btn",[C]),L.emit(`btn/${i+1}`,[ee[i]]),L.emit(`btn/${i+1}/${u}`,[u==1?o.btn1:o.btn2])}if(i==8){const o=Z;let u=0,a=0;t==25?(o.btn1=1-o.btn1,a=o.btn1,u=1):t==26?(o.btn2=1-o.btn2,a=o.btn2,u=2):t==27&&(o.btn3=1-o.btn3,a=o.btn3,u=3),L.emit("btn",[C]),L.emit("btn/side",[Z]),L.emit(`btn/side/${u}`,[a])}this.updateLight()}this.save()}onMidiMessage(e){if(!e.data)return;const t=e.data[0],r=e.data[1],i=e.data[2]/127;this.onControl(t,r,i)}updateLight(){if(!this.output)return;for(let t=0;t<8;t++){const r=ee[t];this.output.send([144,1+t*3,r.btn1*127]),this.output.send([144,3+t*3,r.btn2*127])}const e=Z;this.output.send([144,25,e.btn1*127])}updateImpl(e){for(let f=0;f<8;f++){const d=ee[f],x=d.values,E=d.valuesLerped;E.add(Bs.copy(x).sub(E).multiply(e.timeDelta*4));const y=d.btn1,b=d.btn1Lerped;d.btn1Lerped+=(y-b)*e.timeDelta*4;const g=d.btn2,R=d.btn2Lerped;d.btn2Lerped+=(g-R)*e.timeDelta*4}const t=Z,r=t.master,i=t.masterLerped;t.masterLerped+=(r-i)*e.timeDelta*4;const o=t.btn1,u=t.btn1Lerped;t.btn1Lerped+=(o-u)*e.timeDelta*4;const a=t.btn2,l=t.btn2Lerped;t.btn2Lerped+=(a-l)*e.timeDelta*4;const h=t.btn3,p=t.btn3Lerped;t.btn3Lerped+=(h-p)*e.timeDelta*4}save(){const e={lines:ee.map(t=>[t.values.getElm("vec4"),t.btn1,t.btn2]),side:[Z.btn1,Z.btn2,Z.btn3,Z.master]};localStorage.setItem("MIDIMIX",JSON.stringify(e))}restore(){let e=localStorage.getItem("MIDIMIX");if(e){const t=JSON.parse(e);t.lines.forEach((i,o)=>{ee[o].values.setFromArray(i[0]),ee[o].btn1=i[1],ee[o].btn2=i[2],L.emit(`value/${o+1}`,[ee[o]]),L.emit(`value/${o+1}/x`,[i[0][0]]),L.emit(`value/${o+1}/y`,[i[0][1]]),L.emit(`value/${o+1}/z`,[i[0][2]]),L.emit(`value/${o+1}/w`,[i[0][3]]),L.emit(`btn/${o+o}}`,[ee[o]]),L.emit(`btn/${o+o}}/1`,[i.btn1]),L.emit(`btn/${o+o}}/2`,[i.btn2])});const r=t.side;Z.btn1=r[0],Z.btn2=r[1],Z.btn3=r[2],L.emit("btn/side/1",[Z.btn1]),L.emit("btn/side/2",[Z.btn2]),L.emit("btn/side/3",[Z.btn3]),Z.master=r[3],L.emit("value/master",[Z.master]),L.emit("value",[C]),L.emit("btn",[C]),L.emit("btn/side",[Z])}this.updateLight()}}const K=s=>m.jsxDEV(tn,{checked:s.value>.5,onChange:n=>{C.emulateControl(144,s.id,n?1:0)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:13,columnNumber:9},void 0),V=s=>m.jsxDEV(Nt,{step:.05,value:s.value,onChange:n=>{C.emulateControl(176,s.id,Math.min(1,Math.max(0,n)))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:23,columnNumber:9},void 0),jt=()=>{const[s,n]=Le.useState(0);return v.useEffect(()=>{const e=()=>{n(t=>t+1)};return C.on("value",e),C.on("btn",e),()=>{C.off("value",e),C.off("btn",e)}},[]),m.jsxDEV("div",{className:ce.container,children:[m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:16,value:C.getLine(0).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:58,columnNumber:4},void 0),m.jsxDEV(V,{id:17,value:C.getLine(0).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:59,columnNumber:4},void 0),m.jsxDEV(V,{id:18,value:C.getLine(0).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:60,columnNumber:4},void 0),m.jsxDEV(K,{id:1,value:C.getLine(0).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:61,columnNumber:4},void 0),m.jsxDEV(K,{id:2,value:C.getLine(0).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:62,columnNumber:4},void 0),m.jsxDEV(V,{id:19,value:C.getLine(0).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:63,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:57,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:20,value:C.getLine(1).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:66,columnNumber:4},void 0),m.jsxDEV(V,{id:21,value:C.getLine(1).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:67,columnNumber:4},void 0),m.jsxDEV(V,{id:22,value:C.getLine(1).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:68,columnNumber:4},void 0),m.jsxDEV(K,{id:4,value:C.getLine(1).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:69,columnNumber:4},void 0),m.jsxDEV(K,{id:5,value:C.getLine(1).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:70,columnNumber:4},void 0),m.jsxDEV(V,{id:23,value:C.getLine(1).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:71,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:65,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:24,value:C.getLine(2).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:74,columnNumber:4},void 0),m.jsxDEV(V,{id:25,value:C.getLine(2).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:75,columnNumber:4},void 0),m.jsxDEV(V,{id:26,value:C.getLine(2).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:76,columnNumber:4},void 0),m.jsxDEV(K,{id:7,value:C.getLine(2).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:77,columnNumber:4},void 0),m.jsxDEV(K,{id:8,value:C.getLine(2).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:78,columnNumber:4},void 0),m.jsxDEV(V,{id:27,value:C.getLine(2).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:79,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:73,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:28,value:C.getLine(3).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:82,columnNumber:4},void 0),m.jsxDEV(V,{id:29,value:C.getLine(3).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:83,columnNumber:4},void 0),m.jsxDEV(V,{id:30,value:C.getLine(3).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:84,columnNumber:4},void 0),m.jsxDEV(K,{id:10,value:C.getLine(3).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:85,columnNumber:4},void 0),m.jsxDEV(K,{id:11,value:C.getLine(3).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:86,columnNumber:4},void 0),m.jsxDEV(V,{id:31,value:C.getLine(3).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:87,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:81,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:46,value:C.getLine(4).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:90,columnNumber:4},void 0),m.jsxDEV(V,{id:47,value:C.getLine(4).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:91,columnNumber:4},void 0),m.jsxDEV(V,{id:48,value:C.getLine(4).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:92,columnNumber:4},void 0),m.jsxDEV(K,{id:13,value:C.getLine(4).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:93,columnNumber:4},void 0),m.jsxDEV(K,{id:14,value:C.getLine(4).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:94,columnNumber:4},void 0),m.jsxDEV(V,{id:49,value:C.getLine(4).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:95,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:89,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:50,value:C.getLine(5).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:98,columnNumber:4},void 0),m.jsxDEV(V,{id:51,value:C.getLine(5).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:99,columnNumber:4},void 0),m.jsxDEV(V,{id:52,value:C.getLine(5).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:100,columnNumber:4},void 0),m.jsxDEV(K,{id:16,value:C.getLine(5).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:101,columnNumber:4},void 0),m.jsxDEV(K,{id:17,value:C.getLine(5).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:102,columnNumber:4},void 0),m.jsxDEV(V,{id:53,value:C.getLine(5).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:103,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:97,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:54,value:C.getLine(6).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:106,columnNumber:4},void 0),m.jsxDEV(V,{id:55,value:C.getLine(6).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:107,columnNumber:4},void 0),m.jsxDEV(V,{id:56,value:C.getLine(6).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:108,columnNumber:4},void 0),m.jsxDEV(K,{id:19,value:C.getLine(6).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:109,columnNumber:4},void 0),m.jsxDEV(K,{id:20,value:C.getLine(6).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:110,columnNumber:4},void 0),m.jsxDEV(V,{id:57,value:C.getLine(6).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:111,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:105,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(V,{id:58,value:C.getLine(7).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:114,columnNumber:4},void 0),m.jsxDEV(V,{id:59,value:C.getLine(7).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:115,columnNumber:4},void 0),m.jsxDEV(V,{id:60,value:C.getLine(7).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:116,columnNumber:4},void 0),m.jsxDEV(K,{id:22,value:C.getLine(7).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:117,columnNumber:4},void 0),m.jsxDEV(K,{id:23,value:C.getLine(7).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:118,columnNumber:4},void 0),m.jsxDEV(V,{id:61,value:C.getLine(7).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:119,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:113,columnNumber:3},void 0),m.jsxDEV("div",{className:ce.row,children:[m.jsxDEV(K,{id:25,value:C.side.btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:122,columnNumber:4},void 0),m.jsxDEV(K,{id:26,value:C.side.btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:123,columnNumber:4},void 0),m.jsxDEV(K,{id:27,value:C.side.btn3},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:124,columnNumber:4},void 0),m.jsxDEV(V,{id:62,value:C.side.master},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:125,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:121,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:56,columnNumber:9},void 0)},Fs="_project_7nnqy_1",Vs="_project_inner_7nnqy_5",Ls="_projectSelector_7nnqy_9",Us="_row_7nnqy_13",js="_rowItem_7nnqy_20",dt={project:Fs,project_inner:Vs,projectSelector:Ls,row:Us,rowItem:js,export:"_export_7nnqy_30"},Gt=()=>{const{editor:s}=Ee(),[n,e]=W(s.engine,"name");return s?m.jsxDEV("div",{className:dt.project,children:m.jsxDEV("div",{className:dt.project_inner,children:m.jsxDEV(Ce,{label:"Project",accordion:!0,children:[m.jsxDEV(le,{title:"Project Name",children:m.jsxDEV(ft,{value:n||"",onChange:t=>{e(t)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:22,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:21,columnNumber:5},void 0),m.jsxDEV(Pe,{onClick:()=>{s&&s.save()},children:"Save"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:28,columnNumber:5},void 0),m.jsxDEV("div",{className:dt.export,children:m.jsxDEV(Pe,{onClick:()=>{s&&(s.save(),window.open("/player","_blank"))},children:["Play ",m.jsxDEV(bt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:48,columnNumber:15},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:37,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:20,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:19,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:18,columnNumber:9},void 0):null},Gs="_container_8wzg2_1",Hs={container:Gs},Xs=()=>{const{engine:s}=Ee(),n=v.useRef(null);return v.useEffect(()=>{const e=n.current;if(!s||!e)return;const t=s.canvas;if(!t){console.error("Canvas element not found in engine");return}return e.appendChild(t),()=>{e.contains(t)&&e.removeChild(t)}},[s]),m.jsxDEV("div",{className:Hs.container,ref:n,role:"presentation","aria-label":"3D Canvas"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Canvas/index.tsx",lineNumber:42,columnNumber:3},void 0)};class Ws extends ${constructor(){super();c(this,"wrapperElm");c(this,"canvas");c(this,"canvasCtx");c(this,"viewRangeFrame");c(this,"viewPort");c(this,"viewPortRange");c(this,"musicBuffer");c(this,"resizeObserver");c(this,"frameSetting");c(this,"framePlay");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];const e=window.localStorage.getItem("audioViweRange");this.viewRangeFrame=e?Number(e):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){const e=new w(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=e.x,this.canvas.height=e.y}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const e=this.musicBuffer.getChannelData(0),t=1,r=this.viewPortRange[0]/this.frameSetting.fps,i=this.musicBuffer.sampleRate*r,o=i/this.canvas.width,u=this.frameToPx(0);this.canvasCtx.beginPath();for(let a=0;a<i;a+=o){const l=Math.floor(a-u*o),h=e[Math.round(l)]*t,p=a/i*this.canvas.width,f=(h+1)*(this.canvas.height/2);let d=f,x=f;for(let y=0;y<16;y++){const g=(e[Math.round(l+o*(y/16))]*t+1)*(this.canvas.height/2);d>g&&(d=g),x<g&&(x=g)}const E=x-d;E>3&&this.canvasCtx.fillRect(p,d,1,E),a==0?this.canvasCtx.moveTo(p,f):this.canvasCtx.lineTo(p,f)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle="#555",this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(e){this.framePlay=e,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(e){this.viewRangeFrame=e,this.setFramePlaying(this.framePlay),localStorage.setItem("audioViweRange",String(this.viewRangeFrame))}setFrameSetting(e){this.frameSetting=e,this.render()}setMusicBuffer(e){this.musicBuffer=e,this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}}const Zs="_audioView_1iv4u_45",Ys={audioView:Zs},Js=()=>{const{editor:s}=Ee(),n=v.useRef(null),[e,t]=v.useState();v.useEffect(()=>{const f=new Ws;if(t(f),n.current)return f.setWrapperElm(n.current),()=>{f.dispose()}},[]);const r=s&&s.audioBuffer,[i,o]=v.useState(),[u,a]=v.useState({duration:0,fps:0}),[l,h]=v.useState({current:0,playing:!1});v.useEffect(()=>{if(!s)return;const f=s.engine,d=b=>{a({duration:b["timeline/duration"],fps:b["timeline/fps"]})};let x=0;const E=()=>{o(x++)},y=b=>{h({...b})};return d(f.serialize()),y(f._frame),f.on("fields/update",d),f.on("update/music",E),f.on("update/frame/play",y),()=>{f.off("update/frame/setting",d),f.off("update/music",E),f.off("update/frame/play",y)}},[s]),v.useEffect(()=>{e&&r&&e.setMusicBuffer(r)},[e,r,i]),v.useEffect(()=>{e&&l&&e.setFramePlaying(l)},[e,l]),v.useEffect(()=>{e&&u&&e.setFrameSetting(u)},[e,u]);const p=v.useCallback(f=>{if(e){const d=f.deltaY>0?1.1:.9;e.setViewRangeFrame(e.viewRangeFrame*d)}f.preventDefault()},[e]);return v.useEffect(()=>{const f=n.current;return f&&f.addEventListener("wheel",p,{passive:!1}),()=>{f&&f.removeEventListener("wheel",p)}},[p]),m.jsxDEV("div",{className:Ys.audioView,ref:n},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/AudioView/index.tsx",lineNumber:172,columnNumber:9},void 0)},Ks="_screen_18s1v_45",qs="_header_18s1v_53",Qs="_header_right_18s1v_68",$s="_header_item_18s1v_74",eo="_content_18s1v_82",to="_canvas_18s1v_90",no="_audioView_18s1v_94",ro="_externalBtn_18s1v_103",ue={screen:Ks,header:qs,header_right:Qs,header_item:$s,content:eo,canvas:to,audioView:no,externalBtn:ro},Ht=()=>{const{editor:s}=Ee(),[n,e]=W(s,"enableRender"),[t,r]=W(s,"viewType"),[i,o]=W(s,"resolutionScale");return m.jsxDEV("div",{className:ue.screen,children:[m.jsxDEV("div",{className:ue.header,children:m.jsxDEV("div",{className:ue.header_right,children:[m.jsxDEV("div",{className:ue.header_item,children:m.jsxDEV(le,{title:"Render",children:m.jsxDEV(me,{value:n,onChange:u=>{e&&e(u)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:25,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:24,columnNumber:5},void 0),m.jsxDEV("div",{className:ue.header_item,children:m.jsxDEV(le,{title:"View",children:m.jsxDEV(me,{value:t,format:{type:"select",list:["render","debug"]},onChange:u=>{r&&r(u)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:39,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:37,columnNumber:5},void 0),m.jsxDEV("div",{className:ue.header_item,children:m.jsxDEV(le,{title:"Resolution",children:m.jsxDEV(me,{value:i,format:{type:"select",list:new Array(6).fill(0).map((u,a)=>{const l=Math.pow(2,a),h=1/l,p=h==1?"1":"1/"+l;return{value:h,label:p}})},onChange:u=>{o&&o(u)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:55,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:54,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:53,columnNumber:5},void 0),m.jsxDEV("div",{className:ue.externalBtn,children:m.jsxDEV(Pe,{onClick:()=>{s.openInExternalWindow()},children:m.jsxDEV("svg",{width:"32",height:"12",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[m.jsxDEV("g",{clipPath:"url(#clip0_224_2)",children:[m.jsxDEV("path",{d:"M96 0V416H512V0H96ZM472 376H136V40H472V376Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:86,columnNumber:9},void 0),m.jsxDEV("path",{d:"M40 472V296V136V96H0V512H416V472H376H40Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:87,columnNumber:9},void 0),m.jsxDEV("path",{d:"M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:88,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:85,columnNumber:8},void 0),m.jsxDEV("defs",{children:m.jsxDEV("clipPath",{id:"clip0_224_2",children:m.jsxDEV("rect",{width:"512",height:"512",fill:"white"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:92,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:91,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:90,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:84,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:79,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:78,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:23,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:22,columnNumber:3},void 0),m.jsxDEV("div",{className:ue.content,children:[m.jsxDEV("div",{className:ue.canvas,children:m.jsxDEV(Xs,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:104,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:103,columnNumber:4},void 0),m.jsxDEV("div",{className:ue.audioView,children:m.jsxDEV(Js,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:107,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:106,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:102,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:21,columnNumber:9},void 0)},pn=v.createContext(null),io=()=>{const{editor:s}=Ee(),[n,e]=v.useState({current:0,playing:!1}),[t,r]=v.useState([0,0,100,0]),i=v.useRef([0,0,0,0]);i.current=t;const o=t[2]-t[0];let u=10*Math.pow(2,0+Math.floor(Math.log2(o/100)));u=Math.max(1,Math.floor(u));const a=s==null?void 0:s.audioBuffer,[l,h]=v.useState();v.useEffect(()=>{if(s){const y=s.engine,b=_=>{e({..._})};b(y.frame);let g=0;const R=()=>{h(g++)},S=()=>{y.serialize()};return S(),y.on("update/frame/play",b),y.on("update/music",R),s.on("loadedProject",S),()=>{y.off("update/frame/play",b),y.off("update/music",R),s.off("loadedProject",S)}}},[s]);const p=v.useCallback(y=>{s&&s.engine.seek(y)},[s]),f=v.useCallback(y=>{const b=t[2]-t[0];return Math.floor(t[0]+b*y)},[t]),d=v.useCallback(y=>{const b=i.current,g=(b[2]+b[0])/2,R=(b[0]-g)*y+g,S=(b[2]-g)*y+g;r([R,b[1],S,b[3]])},[]),x=v.useCallback(y=>{const b=i.current,g=y*(b[2]-b[0]);r([b[0]+g,b[1],b[2]+g,b[3]])},[]),E=v.useCallback(y=>{const b=i.current,g=b[2]-b[0];r([y-g/2,b[1],y+g/2,b[3]])},[]);return{glEditor:s,framePlay:n,viewPort:t,viewPortScale:u,musicBuffer:a,musicBufferVersion:l,setCurrentFrame:p,getFrameViewPort:f,zoom:d,scroll:x,setViewPortCenter:E}},so="_timeline_e42r4_1",oo="_inner_e42r4_6",ao="_content_e42r4_13",lo="_setting_e42r4_21",Xe={timeline:so,inner:oo,content:ao,setting:lo},ke=()=>{const s=v.useContext(pn);if(s===null)throw new Error("useTimeline must be used within a TimelineProvider");return s},co="_timelineCanvas_12pgc_45",uo={timelineCanvas:co},mo=`#include <common>

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

}`;class ho extends ${constructor(){super();c(this,"wrapperElm");c(this,"glCanvas");c(this,"gl");c(this,"canvasTexture");c(this,"canvas");c(this,"canvasCtx");c(this,"glRenderer");c(this,"postProcess");c(this,"viewPort");c(this,"viewPortRange");c(this,"viewPortScale");c(this,"frameSetting");c(this,"loopSetting");c(this,"musicBuffer");c(this,"musicTexture");c(this,"resizeObserver");c(this,"canvasSize");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.glCanvas=document.createElement("canvas");const e=new on(this.glCanvas.getContext("webgl2"));this.gl=e.gl,this.canvasSize=new w(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this)),this.glRenderer=new un(this.gl),this.canvasTexture=new M(this.gl),this.musicBuffer=null,this.musicTexture=new M(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new he({passes:[new G(this.gl,{frag:mo,uniforms:{uCanvasTex:{type:"1i",value:null},uMusicTex:{type:"1i",value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){const e=new w(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.glCanvas.width=this.canvas.width=e.x,this.glCanvas.height=this.canvas.height=e.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(e)}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle="#181818";const t=this.frameToPx(0),r=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(t,0,r-t,this.canvas.height)}const e=(t,r,i)=>{let o=Math.ceil(this.viewPort[0]/t)*t;this.canvasCtx.beginPath();let u=0;for(;o<this.viewPort[2]&&u<100;){const a=this.frameToPx(o+r);this.canvasCtx.moveTo(a,0),this.canvasCtx.lineTo(a,this.canvas.height),o+=t,u++}this.canvasCtx.strokeStyle=i,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(e(this.viewPortScale,0,"#555"),e(this.viewPortScale,this.viewPortScale/2,"#333"),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const t=this.musicBuffer.getChannelData(0),r=this.viewPortRange[0]/this.frameSetting.fps,i=this.musicBuffer.sampleRate*r,o=i/this.canvas.width,u=this.frameToPx(0);this.canvasCtx.beginPath();for(let a=0;a<i;a+=o){const l=Math.floor(a-u*o),h=t[Math.round(l)],p=a/i*this.canvas.width,f=(h+1)*(this.canvas.height/2);let d=f,x=f;for(let y=0;y<16;y++){const g=(t[Math.round(l+o*(y/16))]+1)*(this.canvas.height/2);d>g&&(d=g),x<g&&(x=g)}const E=x-d;E>3&&this.canvasCtx.fillRect(p,d,1,E),a==0?this.canvasCtx.moveTo(p,f):this.canvasCtx.lineTo(p,f)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle="#0009";const t=this.frameToPx(this.loopSetting.start),r=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,t,this.canvas.height),this.canvasCtx.fillRect(r,0,this.canvas.width-r,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess._passes&&(this.postProcess._passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(e,t){this.viewPort=e,this.viewPortRange=[e[2]-e[0],e[3]-e[1]],this.viewPortScale=t,this.render()}setFrameSetting(e){this.frameSetting={duration:Math.round(e.duration),fps:Math.round(e.fps)},this.render()}setMusicBuffer(e){this.musicBuffer=e,setTimeout(()=>{this.render()},100)}setLoopSetting(e,t,r){this.loopSetting={enabled:e,start:t,end:r},this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}}const fo=()=>{const{viewPort:s,viewPortScale:n,musicBuffer:e,musicBufferVersion:t,glEditor:r}=ke(),[i,o]=v.useState(),u=v.useRef(null);v.useEffect(()=>{const d=new ho;return o(d),u.current&&d.setWrapperElm(u.current),()=>{d.dispose()}},[]),v.useEffect(()=>{i&&s&&n&&i.setViewPort(s,n)},[i,s,n]);const[a]=W(r==null?void 0:r.engine,"timeline/duration"),[l]=W(r==null?void 0:r.engine,"timeline/fps");v.useEffect(()=>{i&&a&&l&&i.setFrameSetting({duration:a||0,fps:l||0})},[i,a,l]);const[h]=W(r,"frameLoop/enabled"),[p]=W(r,"frameLoop/start"),[f]=W(r,"frameLoop/end");return v.useEffect(()=>{i&&i.setLoopSetting(h||!1,p||0,f||0)},[i,h,p,f]),v.useEffect(()=>{i&&e&&i.setMusicBuffer(e)},[i,e,t]),m.jsxDEV("div",{className:uo.timelineCanvas,ref:u},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCanvas/index.tsx",lineNumber:94,columnNumber:9},void 0)},po="_controls_n8ed2_45",go={controls:po},xo=s=>{const{viewPort:n,setCurrentFrame:e,getFrameViewPort:t,zoom:r,scroll:i,setViewPortCenter:o}=ke(),u=v.useRef([0,0,0,0]),a=v.useRef([0,0]);n&&(u.current=n,a.current=[n[2]-n[0],n[3]-n[1]]);const l=v.useRef(null),h=v.useRef(null),p=v.useRef(null),f=v.useRef(null),d=v.useRef(null),x=v.useCallback(b=>{const g=l.current&&l.current.clientWidth||1;if(p.current==0){if(e&&t&&h.current){const R=(b.clientX-h.current.left)/g;e(t(R))}}else if(p.current==1){const R=[b.clientX,b.clientY];if(f.current&&d.current){const S=-(R[0]-f.current[0])/g*a.current[0];o&&o(d.current+S)}}},[e,t,o]),E=v.useCallback(b=>{p.current=b.button,d.current=(u.current[2]+u.current[0])/2,f.current=[b.clientX,b.clientY],h.current=b.currentTarget.getBoundingClientRect();const g=(b.clientX-h.current.left)/b.currentTarget.clientWidth;p.current==0&&e&&t&&e(t(g)),window.addEventListener("pointermove",x);const R=()=>{f.current=null,p.current=null,d.current=null,window.removeEventListener("pointermove",x)};return window.addEventListener("pointerup",R),()=>{window.removeEventListener("pointerup",R),window.removeEventListener("pointermove",x)}},[t,e,x]),y=v.useCallback(b=>{if(p.current!==null||!r||!i)return;b.preventDefault();const g=b.target&&b.target.clientWidth||1,R=Math.abs(b.deltaY);Math.abs(b.deltaX)<R?R>50?r(b.deltaY<0?.9:1.1):r(1+b.deltaY*.005):i(b.deltaX/g*.5)},[r,i]);return v.useEffect(()=>{const b=l.current;return b&&b.addEventListener("wheel",y,{passive:!1}),()=>{b&&b.removeEventListener("wheel",y)}},[y]),n?m.jsxDEV("div",{className:go.controls,onPointerDown:E,ref:l,children:s.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineControls/index.tsx",lineNumber:158,columnNumber:9},void 0):null},vo="_cursor_2b6c4_45",Eo="_frame_2b6c4_57",Xt={cursor:vo,frame:Eo},yo=()=>{const{viewPort:s,framePlay:n}=ke();if(!s||!n)return null;const e=s[2]-s[0],t=(n.current-s[0])/e;return m.jsxDEV("div",{className:Xt.cursor,style:{left:t*100+"%"},children:m.jsxDEV("div",{className:Xt.frame},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCursor/index.tsx",lineNumber:15,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCursor/index.tsx",lineNumber:14,columnNumber:9},void 0)},bo="_timelineLoop_ly75p_45",wo="_start_ly75p_54",_o="_end_ly75p_55",We={timelineLoop:bo,start:wo,end:_o},No="_cursor_1r72h_45",Ro={cursor:No},Wt=({onMove:s})=>{const n=v.useRef(!1);return m.jsxDEV("div",{className:Ro.cursor,onPointerDown:e=>{e.buttons==1&&(n.current=!0,e.stopPropagation())},onPointerMove:e=>{const t=e.target;n.current===!1||e.buttons!=1||(t.setPointerCapture(e.pointerId),e.buttons==1&&s&&s(e.clientX),e.nativeEvent.preventDefault(),e.nativeEvent.stopPropagation())},onPointerUp:()=>{n.current=!1}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/TimelineLoopCursor/index.tsx",lineNumber:9,columnNumber:9},void 0)},Ao=()=>{const{viewPort:s,framePlay:n,glEditor:e}=ke(),t=v.useRef(null);_t(e,["frameLoop/enabled","frameLoop/start","frameLoop/end"]);const[r]=W(e,"frameLoop/enabled"),[i,o]=W(e,"frameLoop/start"),[u,a]=W(e,"frameLoop/end");if(r!==!0||!s||!n||i===void 0||u===void 0)return null;const l=s[2]-s[0],h=(i-s[0])/l,p=(u-s[0])/l,f=(d,x)=>{const E=d.getBoundingClientRect();return(x-E.x)/E.width*(s[2]-s[0])+s[0]};return m.jsxDEV("div",{className:We.timelineLoop,ref:t,children:m.jsxDEV("div",{className:We.timelineLoop_inner,children:[m.jsxDEV("div",{className:We.start,style:{left:h*100+"%"},children:m.jsxDEV(Wt,{onMove:d=>{t.current&&o&&o(f(t.current,d))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:45,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:44,columnNumber:4},void 0),m.jsxDEV("div",{className:We.end,style:{left:p*100+"%"},children:m.jsxDEV(Wt,{onMove:d=>{t.current&&a&&a(f(t.current,d))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:60,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:59,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:43,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:42,columnNumber:9},void 0)},Co="_scale_dsq5l_45",Po="_scale_inner_dsq5l_53",So="_scale_item_dsq5l_58",ko="_scale_item_frame_dsq5l_66",To="_scale_item_time_dsq5l_71",Fe={scale:Co,scale_inner:Po,scale_item:So,scale_item_frame:ko,scale_item_time:To},Oo=s=>{const n=("00"+Math.floor(s%3600/60)).slice(-2),e=("00"+Math.floor(s%60)).slice(-2);return`${n}:${e}`},Mo=()=>{const{glEditor:s,viewPort:n,viewPortScale:e}=ke(),[t,r]=W(s==null?void 0:s.engine,"timeline/fps");if(!n||!e||t===void 0)return null;const i=[];let o=Math.ceil(n[0]/e)*e,u=0;for(;o<n[2]&&u<100;){const a=(o-n[0])/(n[2]-n[0]),l=o/(t||0);i.push(m.jsxDEV("div",{className:Fe.scale_item,style:{left:a*100+"%"},children:[m.jsxDEV("div",{className:Fe.scale_item_frame,children:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:37,columnNumber:5},void 0),m.jsxDEV("div",{className:Fe.scale_item_time,children:Oo(l)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:40,columnNumber:5},void 0)]},o,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:36,columnNumber:4},void 0)),o+=e,u++}return m.jsxDEV("div",{className:Fe.scale,children:m.jsxDEV("div",{className:Fe.scale_inner,children:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:52,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:51,columnNumber:9},void 0)},Do="_timelineSetting_178ec_45",Io={timelineSetting:Do},zo=()=>{const{framePlay:s,glEditor:n}=ke(),e=v.useCallback((l,h)=>{h&&h(l)},[]),[t,r]=W(n,"frameLoop/enabled"),[i,o]=W(n==null?void 0:n.engine,"timeline/duration"),[u,a]=W(n==null?void 0:n.engine,"timeline/fps");return m.jsxDEV("div",{className:Io.timelineSetting,children:m.jsxDEV(re,{children:[m.jsxDEV(le,{title:"current",children:m.jsxDEV(me,{value:Math.floor((s==null?void 0:s.current)||0),readOnly:!0},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:35,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:34,columnNumber:4},void 0),m.jsxDEV(le,{title:"duration",children:m.jsxDEV(me,{value:i,onChange:l=>e(l,o)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:37,columnNumber:4},void 0),m.jsxDEV(le,{title:"fps",children:m.jsxDEV(me,{value:u,onChange:l=>e(l,a)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:41,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:40,columnNumber:4},void 0),m.jsxDEV(le,{title:"loop",children:m.jsxDEV(me,{value:t||!1,onChange:l=>e(l,r)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:44,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:43,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:33,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:32,columnNumber:9},void 0)},Zt=()=>{const s=io();return m.jsxDEV(pn.Provider,{value:s,children:m.jsxDEV("div",{className:Xe.timeline,children:m.jsxDEV("div",{className:Xe.inner,children:[m.jsxDEV("div",{className:Xe.setting,children:m.jsxDEV(zo,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:20,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:19,columnNumber:5},void 0),m.jsxDEV("div",{className:Xe.content,children:[m.jsxDEV(fo,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:23,columnNumber:6},void 0),m.jsxDEV(yo,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:24,columnNumber:6},void 0),m.jsxDEV(xo,{children:m.jsxDEV(Ao,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:25,columnNumber:6},void 0),m.jsxDEV(Mo,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:28,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:22,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:18,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:17,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:16,columnNumber:9},void 0)},Bo=`#include <common>\r
\r
uniform sampler2D uBackBuffer0;\r
uniform sampler2D uCanvas;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
in vec2 vUv;\r
\r
void main( void ) {\r
\r
	vec4 bb = texture( uBackBuffer0, vUv );\r
	vec4 canvas = texture(uCanvas, vUv );\r
\r
	// outColor = mix( bb, canvas, canvas.w );\r
	vec3 invert = canvas.xyz * canvas.w;\r
	\r
	outColor.xyz = mix( bb.xyz, 1.0 - bb.xyz, invert ); \r
	outColor.w = 1.0;\r
\r
}`;class Fo extends ${constructor(e){super();c(this,"_engine");c(this,"_gl");c(this,"_srcFrameBuffer");c(this,"_outFrameBuffer");c(this,"_frameList");c(this,"_enable");c(this,"_resolution");c(this,"_count");c(this,"_total");c(this,"_tile");c(this,"_tilePixelSize");c(this,"_tileInv");c(this,"_focus");c(this,"_uniforms");c(this,"_outPostProcess");c(this,"_elm");c(this,"_labelCanvas");c(this,"_cctx");c(this,"_canvasTexture");this._engine=e,this._gl=e.gl,this._elm=e.canvas,this._srcFrameBuffer=new H(this._gl,{disableDepthBuffer:!0}),this._outFrameBuffer=new H(this._gl,{disableDepthBuffer:!0}).setTexture([new M(this._gl).setting()]),this._enable=!1,this._count=0,this._total=1,this._tile=new w(1,1),this._tilePixelSize=new w(1,1),this._tileInv=new w(1,1),this._focus=null,this._resolution=new w,this._labelCanvas=document.createElement("canvas"),this._cctx=this._labelCanvas.getContext("2d"),this._canvasTexture=new M(this._gl).attach(this._labelCanvas),this._uniforms={uCanvas:{value:this._canvasTexture,type:"1i"}},this._outPostProcess=new he({passes:[new G(this._gl,{uniforms:this._uniforms,renderTarget:null,frag:Bo,backBufferOverride:this._outFrameBuffer.textures})]}),this._frameList=[];const t=new w(0,0),r=this._onClick.bind(this),i=a=>{t.set(a.clientX,a.clientY)},o=a=>{const l=new w(a.clientX,a.clientY);t.clone().sub(l).length()<10&&r(a)};this._elm.addEventListener("pointerdown",i),this._elm.addEventListener("pointerup",o);const u=a=>{a.key==="Escape"&&(this._focus=null,this._clear()),a.key=="ArrowRight"&&this._focus!==null&&this._focus++,a.key=="ArrowLeft"&&this._focus!==null&&this._focus--};window.addEventListener("keydown",u),this.once("dispose",()=>{this._elm.removeEventListener("pointerdown",i),this._elm.removeEventListener("pointerup",o),window.removeEventListener("keydown",u)})}_calcTilePos(e){const t=e%this._tile.x*this._tileInv.x*this._resolution.x,r=Math.floor(e/this._tile.x)*this._tileInv.y*this._resolution.y;return{x:t,y:r}}push(e,t){for(let r=0;r<e.textures.length;r++){if(this._focus==null||this._focus==this._count){const i=e.textures[r],o="currentFace"in e?e.currentFace:this._gl.TEXTURE_2D;this._srcFrameBuffer.setSize(i.size),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER,this._gl.COLOR_ATTACHMENT0,o,i.getTexture(),0),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,this._outFrameBuffer.getFrameBuffer());let{x:u,y:a}=this._calcTilePos(this._count);const l=this._tilePixelSize.x,h=this._tilePixelSize.y;this._focus!==null&&(u=0,a=0),this._gl.blitFramebuffer(0,0,e.size.x,e.size.y,u,this._resolution.y-a-h,u+l,this._resolution.y-a,this._gl.COLOR_BUFFER_BIT,this._gl.NEAREST),this._srcFrameBuffer.setTexture([]),this._frameList.push({frameBuffer:e,texture:i,label:t?t+(e.textures.length>1?"_"+r:""):""})}this._count++}this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,null)}draw(){this._cctx.clearRect(0,0,this._resolution.x,this._resolution.y);const e=this._resolution.y/1080;this._cctx.font=`500 ${28*e}px 'Courier New'`,this._cctx.fillStyle="#fff";for(let t=0;t<this._frameList.length;t++){const{x:r,y:i}=this._calcTilePos(t),o=this._frameList[t];this._cctx.fillText(o.label,r+5*e,i+this._tilePixelSize.y-5*e)}this._canvasTexture.attach(this._labelCanvas),this._engine.renderer.renderPostProcess(this._outPostProcess,void 0,this._resolution),this._clear()}_clear(){this._total=this._count;const e=Math.sqrt(this._focus!==null?1:this._total);this._tile.set(Math.round(e),Math.ceil(e)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameList=[],this._count=0}reflesh(){this.resize(this._resolution)}resize(e){this._resolution.copy(e),this._outFrameBuffer.setSize(e),this._outPostProcess.resize(e),this._labelCanvas.width=e.x,this._labelCanvas.height=e.y,this._canvasTexture.attach(this._labelCanvas)}_onClick(e){if(this._enable){if(this.reflesh(),this._focus===null){const t=new w(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),r=Math.floor(e.offsetX/t.x),i=Math.floor(e.offsetY/t.y);this._focus=r+i*this._tile.x}this._clear()}}set enable(e){this._enable=e,e&&this.reflesh()}get enable(){return this._enable}dispose(){this.emit("dispose")}}class gn extends ${constructor(){super();c(this,"_pressedKeys");this._pressedKeys={};const e=this._onKeyDown.bind(this),t=this._onKeyUp.bind(this);window.addEventListener("keydown",e),window.addEventListener("keyup",t);const r=()=>{window.removeEventListener("keydown",e),window.removeEventListener("keyup",t)};this.once("dispose",r)}get pressedKeys(){return this._pressedKeys}_onKeyDown(e){this._pressedKeys[e.key]=!0,this.emit("keydown",[e,this._pressedKeys])}_onKeyUp(e){if(this._pressedKeys[e.key]=!1,e.key=="Meta"||e.key=="Control"){const t=Object.keys(this._pressedKeys);for(let r=0;r<t.length;r++)this._pressedKeys[t[r]]=!1}this.emit("keyup",[e,this._pressedKeys])}dispose(){this.emit("dispose")}}class Yt extends Se{constructor(e){super();c(this,"_engine");c(this,"_keyBoard");c(this,"_selectedEntityId");c(this,"_audioBuffer");c(this,"_frameLoop");c(this,"_resolutionScale");c(this,"_viewType");c(this,"_frameDebugger");c(this,"_externalWindow");c(this,"_externalCanvasBitmapContext");c(this,"_disposed");this._engine=e,this._viewType="render",this._selectedEntityId=null,this._resolutionScale=1,this._externalWindow=null,this._externalCanvasBitmapContext=null,this._disposed=!1,this._keyBoard=new gn,this._keyBoard.on("keydown",(r,i)=>{(i.Meta||i.Control)&&i.s&&(r.preventDefault(),this.save()),r.key==" "&&(this._engine.frame.playing?this._engine.stop():this._engine.play())}),this._frameDebugger=new Fo(e),this.engine.renderer.on("drawPass",(r,i)=>{this._frameDebugger&&this._frameDebugger.enable&&r&&this._frameDebugger.push(r,i)}),this._audioBuffer=null,this._engine.on("update/music",r=>{this._audioBuffer=r}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on("update/blidge/frame",r=>{this._engine.seek(r.current),r.playing&&!this._engine.frame.playing?this._engine.play():!r.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field("enableRender",()=>this._engine.enableRender,r=>this._engine.enableRender=r),this.field("resolutionScale",()=>this._resolutionScale,r=>{this._resolutionScale=Number(r),this._resize()}),this.field("viewType",()=>this._viewType,r=>{this._viewType=r,this._viewType==="debug"?this._frameDebugger.enable=!0:this._frameDebugger.enable=!1});const t=this.fieldDir("frameLoop");t.field("enabled",()=>this._frameLoop.enabled,r=>this._frameLoop.enabled=r),t.field("start",()=>this._frameLoop.start,r=>this._frameLoop.start=r),t.field("end",()=>this._frameLoop.end,r=>this._frameLoop.end=r),this.field("selectedEntityId",()=>this._selectedEntityId,r=>{this._selectedEntityId=r}),this._animate()}get engine(){return this._engine}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}_animate(){if(!this._disposed){if(this._engine.update(),this._externalCanvasBitmapContext){const e=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(t=>{e.transferFromImageBitmap(t)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start)),this._frameDebugger&&this._frameDebugger.enable&&this._frameDebugger.draw(),window.requestAnimationFrame(this._animate.bind(this))}}selectEntity(e){this.setField("selectedEntityId",e?e.uuid:null)}createEntity(e,t){const r=new oe;return r.name=t,r.initiator="user",e.add(r),r}deleteEntity(e){e.disposeRecursive();const t=e.parent;t&&t.remove(e)}save(){this.emit("save",[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:"export"})}exportEngine(){return this._engine.serialize({mode:"export"})}openInExternalWindow(){if(this._externalWindow=window.open("","_blank"),!this._externalWindow)return;const e=this._externalWindow.document.createElement("canvas");e.style.width="100%",e.style.height="100%",e.style.objectFit="contain",e.style.cursor="none",this._externalWindow.document.body.style.margin="0",this._externalWindow.document.body.style.background="#000",this._externalWindow.document.body.appendChild(e),this._externalCanvasBitmapContext=e.getContext("bitmaprenderer"),this._externalWindow.addEventListener("unload",()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}_resize(){const e=new w(1920,1080).multiply(this._resolutionScale);this.engine.setSize(e),this._frameDebugger.resize(e),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=e.x,this._externalCanvasBitmapContext.canvas.height=e.y)}dispose(){this._disposed=!0,this._keyBoard.dispose(),this._frameDebugger.dispose()}}const Vo=()=>{const{engine:s}=dn(),[n,e]=v.useState(()=>new Yt(s)),t=Le.useRef(n);return t.current=n,v.useEffect(()=>{if(!t.current.disposed&&t.current.engine.uuid==s.uuid)return;const r=new Yt(s);e(r)},[s]),v.useEffect(()=>()=>{n.dispose()},[n]),{engine:s,editor:n}},Lo="_editor_16tun_45",Uo="_vert_16tun_51",jo="_horiz_16tun_58",Go="_flex_16tun_62",ne={editor:Lo,vert:Uo,horiz:jo,flex:Go},Ho=s=>{const n=Vo();v.useEffect(()=>{if(!(!n.editor||!s.onSave))return n.editor.on("save",s.onSave),()=>{n.editor.off("save",s.onSave)}},[n.editor,s.onSave]),v.useEffect(()=>{!n.editor||!s.editorData||n.editor.deserialize(s.editorData)},[s.editorData,n.editor]);const e=Ln(),t=Zn();let r=null;return e.isPC?r=m.jsxDEV(m.Fragment,{children:[m.jsxDEV("div",{className:ne.vert,children:[m.jsxDEV("div",{className:`${ne.horiz} ${ne.flex}`,children:[m.jsxDEV("div",{className:ne.vert,style:{width:"300px"},children:[m.jsxDEV("div",{className:ne.flex,children:m.jsxDEV(xe,{children:[m.jsxDEV(re,{title:"Scene",children:m.jsxDEV(Ut,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:69,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:68,columnNumber:10},void 0),m.jsxDEV(re,{title:"Project",children:m.jsxDEV(Gt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:72,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:71,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:67,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:66,columnNumber:8},void 0),m.jsxDEV("div",{style:{height:"20vh"},children:m.jsxDEV(xe,{children:m.jsxDEV(re,{title:"Timer",noPadding:!0,children:m.jsxDEV(Vt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:79,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:78,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:77,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:76,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:65,columnNumber:7},void 0),m.jsxDEV("div",{className:`${ne.flex}`,children:m.jsxDEV(Ht,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:85,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:84,columnNumber:7},void 0),m.jsxDEV("div",{style:{width:"300px"},children:m.jsxDEV(xe,{children:m.jsxDEV(re,{title:"Property",children:m.jsxDEV(Bt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:90,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:89,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:88,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:87,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:64,columnNumber:6},void 0),m.jsxDEV("div",{style:{height:"160px"},children:m.jsxDEV(xe,{children:[m.jsxDEV(re,{title:"Timeline",noPadding:!0,children:m.jsxDEV(Zt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:98,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:97,columnNumber:8},void 0),m.jsxDEV(re,{title:"MIDIMIXEmu",children:m.jsxDEV(jt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:101,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:100,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:96,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:95,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:63,columnNumber:5},void 0),m.jsxDEV(kt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:106,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:62,columnNumber:4},void 0):r=m.jsxDEV("div",{className:ne.editor,children:[m.jsxDEV("div",{className:ne.vert,children:[m.jsxDEV("div",{className:`${ne.flex}`,children:m.jsxDEV(Ht,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:116,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:115,columnNumber:6},void 0),m.jsxDEV("div",{className:ne.horiz,style:{height:"55vh"},children:[m.jsxDEV("div",{className:ne.vert,style:{width:"45vw"},children:[m.jsxDEV("div",{style:{flex:"1"},children:m.jsxDEV(xe,{children:[m.jsxDEV(re,{title:"Scene",children:m.jsxDEV(Ut,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:123,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:122,columnNumber:10},void 0),m.jsxDEV(re,{title:"Project",children:m.jsxDEV(Gt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:126,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:125,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:121,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:120,columnNumber:8},void 0),m.jsxDEV("div",{style:{height:"15vh"},children:m.jsxDEV(xe,{children:m.jsxDEV(re,{title:"Timer",noPadding:!0,children:m.jsxDEV(Vt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:133,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:132,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:131,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:130,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:119,columnNumber:7},void 0),m.jsxDEV("div",{className:`${ne.flex}`,children:m.jsxDEV(xe,{children:m.jsxDEV(re,{title:"Property",children:m.jsxDEV(Bt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:141,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:140,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:139,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:138,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:118,columnNumber:6},void 0),m.jsxDEV("div",{style:{height:"15vh"},children:m.jsxDEV(xe,{children:[m.jsxDEV(re,{title:"Timeline",noPadding:!0,children:m.jsxDEV(Fn,{fallback:m.jsxDEV("div",{children:"エラーだよ"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:149,columnNumber:34},void 0),children:m.jsxDEV(Zt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:150,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:149,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:148,columnNumber:8},void 0),m.jsxDEV(re,{title:"MIDIMIXEmu",children:m.jsxDEV(jt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:154,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:153,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:147,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:146,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:114,columnNumber:5},void 0),m.jsxDEV(kt,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:159,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:113,columnNumber:4},void 0),m.jsxDEV($t.Provider,{value:n,children:m.jsxDEV(Qt.Provider,{value:t,children:m.jsxDEV("div",{className:ne.editor,children:r},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:167,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:166,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:165,columnNumber:9},void 0)},Xo=s=>{const[n,e]=Le.useState(()=>new Q(s)),t=Le.useRef(n);t.current=n,v.useEffect(()=>{if(!t.current.disposed)return;const i=new Q(s);e(i)},[s]),v.useEffect(()=>()=>{n.dispose()},[n]);const r=v.useCallback(i=>{n.load(i)},[n]);return{engine:n,load:r}},Wo=s=>{const n=Xo(s.gl),{engine:e}=n;return v.useEffect(()=>{e.setSize(new w(1920,1080))},[e]),v.useEffect(()=>{s.project?e.load(s.project):e.init()},[e,s.project]),m.jsxDEV(hn.Provider,{value:n,children:s.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREngine/index.tsx",lineNumber:34,columnNumber:9},void 0)},Re=document.createElement("canvas"),X=Re.getContext("webgl2",{antialias:!1}),Zo=new on(X),ae={time:{uTime:{value:0,type:"1f"},uTimeF:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uTimeEF:{value:0,type:"1f"}},resolution:{uAspectRatio:{value:1,type:"1f"},uResolution:{value:new w,type:"2f"}},camera:{projectionMatrix:{value:new U,type:"Matrix4fv"},viewMatrix:{value:new U,type:"Matrix4fv"}},gBuffer:{uGBufferPos:{value:null,type:"1i"},uGBufferNormal:{value:null,type:"1i"}},tex:{},music:{uMusicFreqTex:{value:null,type:"1i"},uMusicDomainTex:{value:null,type:"1i"}}};class Ze extends M{constructor(e,t){const r=e.gl;super(r);c(this,"material");c(this,"_renderer");c(this,"_resolution");c(this,"_postProcess");c(this,"_frameBuffer");this._renderer=e,this._resolution=t.resolution||new w(1024,1024),this.setting({wrapS:r.REPEAT,wrapT:r.REPEAT,magFilter:r.LINEAR,minFilter:r.LINEAR}),this._frameBuffer=new H(r).setTexture([this]).setSize(this._resolution),this.material=new G(r,{...t,renderTarget:this._frameBuffer}),this._postProcess=new he({pipeline:new Pt({entity:new oe}),passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}}class Yo extends ${constructor(){super();c(this,"_isTouching");c(this,"element",null);c(this,"position");c(this,"delta");this.position=new w(NaN,NaN),this.delta=new w(NaN,NaN),this._isTouching=!1;const e=this._onPointer.bind(this,"move"),t=this._onPointer.bind(this,"end");window.addEventListener("pointermove",e),window.addEventListener("pointerup",t),window.addEventListener("dragend",t);const r=()=>{this.element&&this.removeElement(this.element),window.removeEventListener("pointermove",e),window.removeEventListener("pointerup",t),window.removeEventListener("dragend",t),this.off("dispose",r)};this.on("dispose",r)}setElement(e){this.element&&this.removeElement(this.element),this.element=e;const t=this._onPointer.bind(this,"start");e.addEventListener("pointerdown",t);const r=i=>{e.isEqualNode(i.elm)&&(e.removeEventListener("pointerdown",t),this.off("unregister",r))};this.on("unregister",r)}removeElement(e){this.emit("unregister",[e])}getScreenPosition(e){if(this.position.x!=this.position.x)return new w(NaN,NaN);const t=this.position.clone().divide(e).multiply(2).sub(1);return t.y*=-1,t}getRelativePosition(e,t){const r=e.getClientRects()[0];let i=this.position.x-r.left,o=this.position.y-r.top;return t&&(i/=r.width,o/=r.height),new w(i,o)}_setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}_onPointer(e,t){const r=t.pointerType;r!=null?r=="mouse"&&(t.button==-1||t.button==0)&&this._touchEventHandler(t.pageX,t.pageY,e,t):this._touchEventHandler(t.pageX,t.pageY,e,t)}_touchEventHandler(e,t,r,i){let o=!1;const u=e-window.pageXOffset,a=t-window.pageYOffset;r=="start"?(this._isTouching=!0,this._setPos(u,a),this.delta.set(0,0),o=!0):r=="move"?(this._setPos(u,a),this._isTouching&&(o=!0)):r=="end"&&("targetTouches"in i?i.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,o=!0),o&&this.emit(r,[{pointerEvent:i,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit("dispose")}}class xn extends q{constructor(e){super(e);c(this,"shakePower");c(this,"shakeSpeed");c(this,"shakeMatrix");c(this,"shakeQua");c(this,"cameraComponent");this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new U,this.shakeQua=new ye,this.order=1e3,this.field("power",()=>this.shakePower,t=>this.shakePower=t),this.field("speed",()=>this.shakeSpeed,t=>this.shakeSpeed=t)}updateImpl(e){let t=.008*this.shakePower;this.cameraComponent&&(t*=this.cameraComponent.fov/50);const r=e.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(r*2)*t,y:Math.sin(r*2.5)*t,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.entity.matrixWorld.multiply(this.shakeMatrix);const i=this.entity.getComponentsByTag("camera")[0];i&&i.viewMatrix.copy(this.entity.matrixWorld).inverse()}}class tt extends q{constructor(e){super(e);c(this,"target");c(this,"up");c(this,"entityWorldPos");c(this,"targetWorldPos");this.target=null,this.entityWorldPos=new w,this.targetWorldPos=new w,this.up=new w(0,1,0),this.order=9999}setTarget(e){this.target=e}beforeRenderImpl(e){if(this.target&&this._enabled){this.entity.matrixWorld.decompose(this.entityWorldPos),this.target.matrixWorld.decompose(this.targetWorldPos),this.entity.matrixWorld.lookAt(this.entityWorldPos,this.targetWorldPos,this.up);const t=this.entity.getComponentsByTag("camera")[0];t&&t.viewMatrix.copy(this.entity.matrixWorld).inverse()}}}class vn extends q{constructor(e){super(e);c(this,"keyborad_");c(this,"_pointer");c(this,"orbit_");c(this,"mouseVelOrbit_");c(this,"mouseVelMove_");c(this,"eye_");c(this,"target_");c(this,"up_");c(this,"lookatMatrix_");c(this,"distance_");c(this,"distanceVel_");c(this,"_memPos");c(this,"_memTarget");c(this,"elmDisposer");this._pointer=new Yo,this.keyborad_=new gn,this.orbit_=new w,this.mouseVelOrbit_=new w,this.mouseVelMove_=new w,this.target_=new w,this.eye_=new w,this.up_=new w(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new U,this._memPos=new w,this._memTarget=new w,this.order=999;let t=!1;const r=u=>{t||(t=!0)},i=u=>{if(!t)return;const a={x:u.delta.x*1,y:u.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(a):this.mouseVelOrbit_.add(a),u.pointerEvent.preventDefault(),u.pointerEvent.stopPropagation()},o=u=>{t&&(t=!1)};this._pointer.on("move",i),this._pointer.on("start",r),this._pointer.on("end",o),this.once("dispose",()=>{this._pointer.off("move",i),this._pointer.off("start",r),this._pointer.off("end",o)}),this.setPosition(this.entity.position,this.target_)}set enabled(e){if(this._enabled=e,e){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);const t=this.entity.getComponent(tt);t&&t.target&&this.setPosition(this.entity.position,t.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}setElm(e){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(e);const t=r=>{r.preventDefault(),this.distanceVel_+=r.deltaY};e.addEventListener("wheel",t),this.elmDisposer=()=>{e.removeEventListener("wheel",t)}}calc(e){const t=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new U().makeRotationAxis({x:1,y:0,z:0},Math.min(t,Math.max(-t,this.orbit_.x)))),this.eye_.applyMatrix3(new U().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(e.position,e.quaternion,e.scale)}updateImpl(e){const t=new w(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);t.applyMatrix3(this.entity.matrix),this.target_.add(t),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);const r=Math.max(0,1-e.timeDelta*10);this.mouseVelOrbit_.multiply(r),this.mouseVelMove_.multiply(r),this.distanceVel_*=r,this.calc(this.entity)}setPosition(e,t){if(this.eye_.copy(e),this.target_.copy(t),this.entity){const r=this.entity.parent;r&&(r.updateMatrix(!0),this.target_.applyMatrix4(r.matrixWorld.clone().inverse()))}this.orbit_.x=Math.atan2(this.eye_.y-this.target_.y,new w(this.eye_.x,this.eye_.z).length()-new w(this.target_.x,this.target_.z).length()),this.orbit_.y=-Math.atan2(this.eye_.x-this.target_.x,this.eye_.z-this.target_.z),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0)}dispose(){super.dispose(),this._pointer.dispose()}}const Jo=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

in vec2 vUv;

uniform sampler2D uBackBuffer0;
uniform vec2 uPPResolution;
uniform bool uIsVertical;
uniform float uBlurRange;

#ifdef USE_BACKBLURTEX
  uniform sampler2D uBackBlurTex;
#endif

layout (location = 0) out vec4 outColor;

// Gaussianブラーの重み
uniform float uWeights[GAUSS_WEIGHTS];

vec3 blur( sampler2D tex ) {
  
  vec2 coord = vec2(gl_FragCoord.xy);
  vec3 sum = uWeights[0] * texture(tex, vUv).rgb;
  
  for (int i = 1; i < GAUSS_WEIGHTS; i++) {
    vec2 offset = (uIsVertical ? vec2(0, i) : vec2(i, 0)) * uBlurRange;
    sum += uWeights[i] * texture(tex, vUv + offset / uPPResolution).rgb;
    sum += uWeights[i] * texture(tex, vUv - offset / uPPResolution).rgb;
  }

  return sum;
  
}

void main(void) {
  
  vec3 sum = vec3( 0.0 );

  #ifdef USE_BACKBLURTEX
    sum = blur(uBackBlurTex);
  #else
    sum = blur(uBackBuffer0);
  #endif
  
  outColor = vec4(sum, 1.0);
  
}`,Ko=`uniform sampler2D uSrcTexture1;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uSrcTexture1, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`,qo=`#include <common>

uniform sampler2D uBackBuffer0;
uniform sampler2D uBloomTexture[4];

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec3 col = texture( uBackBuffer0, vUv ).xyz;

	#pragma loop_start 4
		col += texture( uBloomTexture[ LOOP_INDEX ], vUv ).xyz * pow( (float(LOOP_INDEX) + 1.0) / 4.0, 1.0 ) * 1.0;
	#pragma loop_end
	
	outColor = vec4( col, 1.0 );

}`;class Qo extends he{constructor(n){const t=[],r=[];for(let h=0;h<4;h++)t.push(new H(X).setTexture([new M(X).setting({magFilter:X.LINEAR,minFilter:X.LINEAR})])),r.push(new H(X).setTexture([new M(X).setting({magFilter:X.LINEAR,minFilter:X.LINEAR})]));let i=2;const o=new G(X,{name:"bloom/bright/",frag:Ko,passThrough:!0,uniforms:{uSrcTexture1:{value:n,type:"1i"},uThreshold:{value:1.8,type:"1f"},uBrightness:{value:1,type:"1f"}},resolutionRatio:1/i}),u=[];let a=o.renderTarget.textures;for(let h=0;h<4;h++){const p=t[h],f=r[h],d=8,x={name:"bloom/blur/"+h+"/v",renderTarget:p,frag:Jo,uniforms:{uBackBlurTex:{value:a,type:"1i"},uIsVertical:{type:"1i",value:!0},uWeights:{type:"1fv",value:Qe.gaussWeights(d)},uBlurRange:{value:2,type:"1f"}},defines:{GAUSS_WEIGHTS:d.toString(),USE_BACKBLURTEX:""},passThrough:!0,resolutionRatio:1/i};u.push(new G(X,x)),u.push(new G(X,{...x,name:"bloom/blur/"+h+"/h",renderTarget:f,uniforms:{...x.uniforms,uBackBlurTex:{value:p.textures[0],type:"1i"},uIsVertical:{type:"1i",value:!1}}})),a=f.textures,i*=2}const l=new G(X,{name:"bloom/composite/",frag:qo,uniforms:{uBloomTexture:{value:r.map(h=>h.textures[0]),type:"1iv"}}});super({name:"Bloom",passes:[o,...u,l]})}get threshold(){return this.passes[0].uniforms.uThreshold.value}set threshold(n){this.passes[0].uniforms.uThreshold.value=n}get brightness(){return this.passes[0].uniforms.uBrightness.value}set brightness(n){this.passes[0].uniforms.uBrightness.value=n}}const $o=`#include <common>\r
\r
uniform sampler2D uBackBuffer0;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
float grayScale( vec3 color ) {\r
	float gray = dot( color, vec3( 0.299, 0.587, 0.114 ) );\r
	return gray;\r
}\r
\r
vec3 contrast( vec3 color, float contrast ) {\r
	return ( color - 0.5 ) * contrast + 0.5;\r
}\r
\r
void main( void ) {\r
\r
	vec3 col = texture( uBackBuffer0, vUv ).xyz;\r
\r
	// float gs = grayScale( col.xyz );\r
	// col.xyz = mix( col.xyz, vec3( gs ), 0.8 );\r
	// col.xyz = contrast( col.xyz + 0.1, 1.4 );\r
	\r
	outColor = vec4( col, 1.0 );\r
\r
}`;class ea extends he{constructor(){super({name:"ColorGrading",passes:[new G(X,{frag:$o})]})}}const ta=`#include <common>\r
#include <random>\r
#include <noise_simplex>\r
\r
uniform sampler2D uBackBuffer0;\r
\r
in vec2 vUv;\r
\r
layout (location = 0) out vec4 outColor;\r
\r
vec2 lens_distortion(vec2 r, float alpha) {\r
    return r * (1.0 - alpha * dot(r, r));\r
}\r
\r
void main( void ) {\r
	vec3 col = vec3( 0.0, 0.0, 0.0 );\r
	vec2 uv = vUv;\r
	vec2 cuv = uv - 0.5;\r
	float w = 0.05;\r
\r
	float d;\r
	float s = 0.98; \r
\r
	#pragma loop_start 8\r
		d = -float( LOOP_INDEX ) / 8.0 * w;\r
        col.x += texture( uBackBuffer0, lens_distortion( cuv * s, d * 0.0 ) + 0.5 + vec2( (float( LOOP_INDEX ) / 8.0 - 0.5 ) * 0.002, 0.0 ) ).x;\r
        col.y += texture( uBackBuffer0, lens_distortion( cuv * s, d * 3.0 ) + 0.5 ).y;\r
        col.z += texture( uBackBuffer0, lens_distortion( cuv * s, d * 6.0 ) + 0.5 ).z;\r
	#pragma loop_end\r
	col.xyz /= 8.0;\r
\r
	float len = length(cuv);\r
	col *= smoothstep( 1.2, 0.3, len );\r
	\r
	outColor = vec4( col, 1.0 );\r
\r
}`;class na extends he{constructor(){super({name:"Finalize",passes:[new G(X,{frag:ta})]})}}const ra=`uniform sampler2D uBackBuffer0;\r
uniform vec2 uPPPixelSize;\r
\r
in vec2 vUv;\r
\r
layout ( location = 0 ) out vec4 outColor;\r
\r
// source: https://github.com/unity3d-jp/NVIDIAHairWorksIntegration/blob/master/HairWorksIntegration/Assets/Standard%20Assets/Effects/ImageEffects/Shaders/_Antialiasing/FXAA2.shader\r
\r
vec4 texOffset( sampler2D tex, vec2 uv, vec2 offsetPixel, vec2 resolutionInv ) {\r
\r
	return texture( tex, uv + offsetPixel * resolutionInv );\r
\r
}\r
\r
#define FXAA_REDUCE_MIN   ( 1.0 / 128.0 )\r
#define FXAA_REDUCE_MUL   ( 1.0 / 16.0 )\r
#define FXAA_SPAN_MAX    8.0\r
\r
void main( void ) {\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    vec3 rgbNW = texOffset( uBackBuffer0, vUv, vec2( -1.0, 1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbNE = texOffset( uBackBuffer0, vUv, vec2( 1.0, 1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbSW = texOffset( uBackBuffer0, vUv, vec2( -1.0, -1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbSE = texOffset( uBackBuffer0, vUv, vec2( 1.0, -1.0 ), uPPPixelSize ).xyz;\r
    vec3 rgbM  = texture( uBackBuffer0, vUv ).xyz;\r
	\r
	/*--------------------------------------------------------------------------*/\r
\r
    vec3 luma = vec3( 0.299, 0.587, 0.114 );\r
\r
    float lumaNW = dot( rgbNW, luma );\r
    float lumaNE = dot( rgbNE, luma );\r
    float lumaSW = dot( rgbSW, luma );\r
    float lumaSE = dot( rgbSE, luma );\r
    float lumaM  = dot( rgbM,  luma );\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );\r
    float lumaMax = max( lumaM, max( max( lumaNW, lumaNE ), max( lumaSW, lumaSE ) ) );\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    vec2 dir; \r
    dir.x = -( ( lumaNW + lumaNE ) - ( lumaSW + lumaSE ) );\r
    dir.y =  ( ( lumaNW + lumaSW ) - ( lumaNE + lumaSE ) );\r
\r
	/*--------------------------------------------------------------------------*/\r
\r
    float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );\r
    float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );\r
    dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX ), max( vec2( -FXAA_SPAN_MAX, -FXAA_SPAN_MAX ), dir * rcpDirMin ) ) * uPPPixelSize.xy;\r
\r
	/*--------------------------------------------------------------------------*/\r
	\r
    vec3 rgbA = ( 1.0 / 2.0 ) * ( \r
        texture( uBackBuffer0, vUv + dir * ( 1.0 / 3.0 - 0.5 ) ).xyz +\r
        texture( uBackBuffer0, vUv + dir * ( 2.0 / 3.0 - 0.5 ) ).xyz\r
    );\r
\r
    vec3 rgbB = rgbA * 0.5  + 0.25  * ( \r
        texture( uBackBuffer0, vUv + dir * -0.5 ).xyz +\r
        texture( uBackBuffer0, vUv + dir *  0.5 ).xyz \r
    );\r
		\r
    float lumaB = dot( rgbB, luma );\r
\r
    if( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {\r
\r
		outColor = vec4( rgbA, 1.0 );\r
\r
	} else {\r
\r
		outColor = vec4( rgbB, 1.0 );\r
\r
	};\r
\r
    // outColor = vec4( 0.0 );\r
\r
}`;class ia extends he{constructor(){super({name:"FXAA",passes:[new G(X,{name:"fxaa",frag:ra})]})}}const En=new $;new Promise(s=>{En.once("createdCamera",n=>{s(n)})});class sa extends q{constructor(e){super(e);c(this,"renderCamera");c(this,"_commonUniforms");c(this,"_renderTarget");c(this,"_lookAt");c(this,"_orbitControls");c(this,"postProcessPipeline");c(this,"_resolution");c(this,"_resolutionInv");c(this,"_tmpVector1");c(this,"_tmpVector2");c(this,"_dofTarget");this._resolution=new w,this._resolutionInv=new w,this._commonUniforms=Y.merge({uResolution:{type:"2f",value:this._resolution},uResolutionInv:{type:"2f",value:this._resolutionInv}}),this.renderCamera=this.entity.addComponent(xt,{gl:X}),this._renderTarget=this.renderCamera.renderTarget,this._lookAt=this.entity.addComponent(tt),this.entity.addComponent(xn),En.emit("createdCamera",[this.renderCamera]),this.postProcessPipeline=this.entity.addComponent(Pt),this.postProcessPipeline.add(new ia);const t=this.postProcessPipeline.add(new Qo(this.renderCamera.renderTarget.shadingBuffer.textures[0]));t.threshold=1,t.brightness=1,this.postProcessPipeline.add(new ea),this.postProcessPipeline.add(new na),this._dofTarget=null,this._tmpVector1=new w,this._tmpVector2=new w;const r=u=>{const a=u.findEntityByName("Camera")||null,l=a==null?void 0:a.getComponent(Ve),h=this.entity.getComponent(Ve);l&&h&&(l.transformAutoUpdate=h.transformAutoUpdate);const p=u.findEntityByName("CamLook")||null;this._lookAt.setTarget(p),this._dofTarget=u.findEntityByName("CamDof")||null};this.entity.on("sceneCreated",r),this.once("dispose",()=>{this.entity.off("sceneCreated",r)});{this._orbitControls=void 0,this._orbitControls=this.entity.addComponent(vn),this._orbitControls.setElm(Re),this._orbitControls.enabled=!1;const u=f=>{this._orbitControls&&(this._orbitControls.enabled=f);const d=this._entity.getComponent(Ve),x=this._entity.getComponent(tt);d&&(d.transformAutoUpdate=!f),x&&(x.enabled=!f)},a=f=>{if(this._orbitControls&&this._orbitControls.enabled)return;f.target.setPointerCapture(f.pointerId),u(!0)},l=()=>{this._orbitControls&&this._orbitControls.enabled||u(!0)},h=f=>{f.key==="Escape"&&u(!1)};Re.addEventListener("pointerdown",a),Re.addEventListener("wheel",l),window.addEventListener("keydown",h);const p=()=>{Re.removeEventListener("pointerdown",a),Re.removeEventListener("wheel",l),window.removeEventListener("keydown",h)};this.once("dispose",p)}ae.gBuffer.uGBufferPos.value=this.renderCamera.gBuffer.textures[0],ae.gBuffer.uGBufferNormal.value=this.renderCamera.gBuffer.textures[1];const i=this.entity.getRootEntity(),o=i.findEntityByName("CamLook")||null;this._lookAt.setTarget(o),this._dofTarget=i.findEntityByName("CamDof")||null}updateImpl(e){this.resize(e.resolution),this.updateCameraParams(),this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget&&this._dofTarget.matrixWorld.decompose(this._tmpVector2),this.renderCamera.dofParams.focusDistance=this._tmpVector1.sub(this._tmpVector2).length()}resize(e){e.x==this._resolution.x&&e.y==this._resolution.y||(this._resolution.copy(e),this._resolutionInv.set(1/e.x,1/e.y,0,0),this.renderCamera.resize(this._resolution),this.postProcessPipeline.resize(e),this.updateCameraParams())}updateCameraParams(){this.renderCamera.aspect=this._resolution.x/this._resolution.y,this.renderCamera.near=.5,this.renderCamera.far=3e3,this.renderCamera.needsUpdateProjectionMatrix=!0}}const oa=`#version 300 es\r
void main( void ) {}\r
`,aa=`#include <common>\r
\r
#include <noise_value>\r
\r
in float aTime;\r
\r
out float o_left;\r
out float o_right;\r
\r
uniform float uDuration;\r
uniform float uSampleRate;\r
uniform float uTimeOffset;\r
\r
uniform float uBPM;\r
\r
/*-------------------------------\r
	Utils\r
-------------------------------*/\r
\r
float whiteNoise(float time)\r
{\r
    return fract(sin(dot(vec2( time ), vec2(12.9898,78.233))) * 43758.5453);\r
}\r
\r
\r
float saw(float time){\r
\r
    return fract(-time)*2.-1.;\r
	\r
}\r
\r
float square( float time) {\r
\r
	return sign( fract( time ) - 0.1 );\r
	\r
}\r
\r
float tri(float time ){\r
    return abs(2.*fract(time*.5-.25)-1.)*2.-1.;\r
}\r
\r
float ssin(float time ) {\r
	return sin( time * TPI );\r
}\r
\r
float s2f( float scale ){\r
\r
	return 440.0 * pow( 1.06, scale );\r
	\r
}\r
\r
float slope( float value, float slope ) {\r
\r
	if( value >= 0.0 ) {\r
\r
		return linearstep( 0.0, 1.0 - slope, value );\r
\r
	} else {\r
\r
		return linearstep( 0.0, -1.0 + slope, value ) * -1.0;\r
		\r
	}\r
\r
	return 0.0;\r
	\r
}\r
\r
bool isin( float time, float start, float end ) {\r
\r
	return start <= time && time <= end;\r
	\r
}\r
\r
/*-------------------------------\r
	clap\r
-------------------------------*/\r
\r
float clap( float time, float loop ) {\r
\r
	float envTime = fract(loop) * 10.0;\r
\r
	float o = 0.0;\r
	\r
	float env = mix( exp( envTime * - 8.0 ), exp( fract(envTime * 14.0 ) * -5.0), exp( envTime  * -10.0  ) );\r
	\r
	o += fbm( envTime * 780.0 ) * env * 1.3;\r
	\r
	return o;\r
\r
}\r
\r
vec2 clap1( float time, float loop ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	float l = loop - 0.5;\r
\r
	o += clap( time, l ) * float[]( 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0  )[int(l)];\r
	\r
	return o * 0.5;\r
\r
}\r
\r
/*-------------------------------\r
	Hihat\r
-------------------------------*/\r
\r
float hihat( float time, float loop ) {\r
\r
	return fbm(time * 22000.0) * max(0.0,1.0-min(0.85,loop*4.25)-(loop-0.25)*0.3);\r
\r
}\r
\r
vec2 hihat1( float time, float loop ) {\r
	\r
	vec2 o = vec2( 0.0 );\r
\r
	float l4 = loop * 4.0;\r
\r
	o += hihat( time, fract( l4 ) ) * (step( 0.4, whiteNoise( floor( l4 )) ) * 0.5 + 0.5);\r
	o += hihat( time, fract( l4 + 0.5 ) ) * step( 0.5, whiteNoise(  floor( l4 + 0.5 ) * 10.0 + 0.1 ) );\r
	o *= 0.04;\r
	\r
	return o;\r
  \r
}\r
\r
/*-------------------------------\r
	Kick\r
-------------------------------*/\r
\r
float kick( float time, float loop ) {\r
\r
	float envTime = fract( loop );\r
\r
	float t = time;\r
	t -= 0.1 * exp( -70.0 * envTime );\r
	t += 0.1;\r
\r
	float o = ( smoothstep( -0.5, 0.5, sin( t * 190.0 ) ) * 2.0 - 1.0 ) * smoothstep( 1.0, 0.1, envTime );\r
	o *= 0.25;\r
\r
    return o;\r
\r
}\r
\r
vec2 kick1( float time, float loop ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	float loop2 = loop - 0.25;\r
	float loop3 = loop - 0.625;\r
\r
	o += kick( time, loop ) * float[]( 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0  )[int( loop )];\r
	o += kick( time, loop2 ) * float[]( 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0  )[int( loop2 )];\r
	o += kick( time, loop3 ) * float[]( 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0 )[int( loop3 )];\r
\r
\r
	return o;\r
\r
}\r
\r
/*-------------------------------\r
	Mooooon\r
-------------------------------*/\r
\r
float moooon( float time, float loop ) {\r
\r
	float envTime = fract( loop );\r
\r
	float t = time;\r
	t -= 1.0 * exp( -7.0 * envTime );\r
\r
	float o = 0.0;\r
	o = ( smoothstep( -1.0, 1.0, sin( t * 200.0 ) ) * 2.0 - 1.0 ) * smoothstep( 1.0, 0.0, envTime );\r
	o *= 0.35;\r
\r
    return o;\r
\r
} \r
\r
/*-------------------------------\r
	xylophone\r
-------------------------------*/\r
\r
const float xylophoneMelody[] = float[](\r
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0,\r
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0,\r
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0,\r
	4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0, 11.0, 4.0, 9.0\r
);\r
\r
const float xylophoneMelody2[] = float[](\r
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,\r
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,\r
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,\r
	4.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,\r
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,\r
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,\r
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0,\r
	6.0, 9.0, 11.0, 16.0, 18.0, 16.0, 11.0, 9.0\r
);\r
\r
vec2 xylophone1( float time, float loop, float type ) {\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	float envTime = fract( loop );\r
\r
	float t = time;\r
	t -= 0.02 * exp( -70.0 * envTime );\r
	t += 0.02;\r
\r
	float s = xylophoneMelody[int( loop )];\r
\r
	if( type == 1.0 ) {\r
\r
		s = xylophoneMelody2[int( loop )];\r
		\r
	}\r
\r
	for(int i = 0; i < 1; i++){\r
\r
		float fi = float( i ) / 2.0;\r
\r
		float v = ( smoothstep( -0.5, 0.5, ssin( t * s2f( s + 12.0 * float( i ) ) ) ) * 2.0 - 1.0 ) * smoothstep( 1.0, 0.1, envTime );\r
\r
		o += v * 0.03 * ( 1.0 - fi * 1.5 );\r
		\r
	}\r
\r
	return o;\r
\r
}\r
\r
/*-------------------------------\r
	dada\r
-------------------------------*/\r
\r
vec2 dada( float time, float loop ) {\r
\r
	int index = int( loop );\r
	float envTime = fract( loop );\r
	float w = mod(envTime * 8.0, 2.0);\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	for( int i = 0; i < 6; i ++ ) {\r
\r
		float fi = float( i ) / 6.0;\r
		float frec = s2f(4.0 + float(i) * 12.0 ) * pow( 0.5, 4.0 ); \r
\r
		float v = saw( time * frec + ssin( w * 20.0 ) + TPI * fi ) * abs( pow( sin( w * TPI ), 3.0 ));\r
\r
		o.x += v * ( sin( fi * TPI ) * 0.5 + 0.5 );\r
		o.y += v * ( cos( fi * TPI ) * 0.5 + 0.5 );\r
\r
		frec = s2f(4.0 + float(i) * 12.0 ) * pow( 0.5, 10.0 ); \r
		v = tri( time * frec + ssin( w * 21.0 ) + TPI * fi ) * abs( pow( sin( w * TPI ), 1.0 )) * 0.8;\r
\r
		o.x += v * ( sin( PI / 2.0 + fi * TPI ) * 0.5 + 0.5 );\r
		o.y += v * ( cos( PI / 2.0 + fi * TPI ) * 0.5 + 0.5 );\r
\r
	}\r
\r
	o *= isin(w, 1.0, 2.0 ) && isin(loop, 1.75, 2.0 ) ? 1.0 : 0.0 ;\r
	\r
	o *= 0.05;\r
\r
	return o;\r
	\r
}\r
\r
/*-------------------------------\r
	faaa\r
-------------------------------*/\r
\r
const float mainCord[] = float[](\r
	4.0, 6.0, 7.0, 6.0,\r
	7.0, 9.0, 11.0, 6.0,\r
	11.0, 13.0, 14.0, 13.0\r
);\r
\r
vec2 faaa( float time, float loop ) {\r
\r
	int index = int( loop );\r
	float envTime = fract( loop );\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	for( int i = 0; i < 3; i ++ ) {\r
\r
		float scale = mainCord[ index + 4 * i ];\r
		float freq = s2f(scale + 12.0); \r
\r
		o += ( sin( time * freq ) + sin( time * freq * 1.007 ) );\r
\r
	}\r
\r
	o *= 0.05;\r
\r
	return o;\r
	\r
}\r
\r
vec2 music( float time ) {\r
\r
	float t = time * (uBPM / 60.0);\r
	t = max( 0.0, t - 0.0 );\r
\r
	float loop1 = fract( t );\r
	\r
	float loop4 = mod( t, 4.0 );\r
	float loop4Phase = floor( loop4 );\r
\r
	float loop8 = mod( t, 8.0 );\r
	float loop8Phase = floor( loop8 );\r
\r
	float loop16 = mod( t, 16.0 ); \r
	float loop16Phase = loop16 / 16.0;\r
	\r
	float loop32 = mod( t, 32.0 );\r
	float loop32Phase = t / 32.0;\r
\r
	vec2 o = vec2( 0.0 );\r
\r
	// click\r
\r
	o += step( fract( loop4 ), 0.1 ) * ssin( time * s2f(3.0) * 2.0 ) * 0.03;\r
	o += step( fract( loop4 / 4.0 ), 0.05 ) * ssin( time * s2f(12.0) * 2.0 ) * 0.02;\r
\r
	return o;\r
	\r
}\r
\r
void main( void ) {\r
\r
	float time = (aTime / uSampleRate ) + uTimeOffset;\r
\r
	vec2 o = music( time );\r
\r
	o_left = o.x;\r
	o_right = o.y;\r
\r
}`,yn=85,Ye=60*(8*2/yn);class la extends q{constructor(e){super(e);c(this,"power");c(this,"gl");c(this,"isAudioBufferReady",!1);c(this,"audioContext");c(this,"audioBuffer");c(this,"implusBuffer");c(this,"audioSrcNode");c(this,"convolverNode");c(this,"gainNode");c(this,"bufferLength");c(this,"blockLength");c(this,"numSampleBlocks");c(this,"bufferIn");c(this,"bufferL");c(this,"bufferR");c(this,"tmpOutputArrayL");c(this,"tmpOutputArrayR");c(this,"progress");c(this,"timeCode",0);c(this,"playStartTime",-1);c(this,"forcePlay",!1);c(this,"realtimeAnalyzer");c(this,"realtimeDataSize");c(this,"timeDomainArray");c(this,"timeDomainTexture");c(this,"frequencyArray");c(this,"frequencyTexture");c(this,"currentRender");this.power=Zo,this.gl=this.power.gl,this.audioSrcNode=null,this.audioContext=new AudioContext,this.bufferLength=Math.floor(this.audioContext.sampleRate*Ye),this.progress=[0,0],this.blockLength=Math.min(512*512,this.bufferLength),this.numSampleBlocks=Math.ceil(this.audioContext.sampleRate*Ye/this.blockLength),this.tmpOutputArrayL=new Float32Array(this.blockLength),this.tmpOutputArrayR=new Float32Array(this.blockLength),this.audioBuffer=this.audioContext.createBuffer(2,this.bufferLength,this.audioContext.sampleRate),this.bufferIn=new Ke(this.gl),this.bufferIn.setData(new Float32Array(new Array(this.blockLength).fill(0).map((t,r)=>r)),"vbo"),this.bufferL=new Ke(this.gl),this.bufferL.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.bufferR=new Ke(this.gl),this.bufferR.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.currentRender=this.render(),this.implusBuffer=this.audioContext.createBuffer(2,this.audioContext.sampleRate*1.5,this.audioContext.sampleRate);for(let t=0;t<this.implusBuffer.length;t++){const r=t/this.implusBuffer.length;this.implusBuffer.getChannelData(0)[t]=(Math.random()*2-1)*.9*Math.exp(-r*5),this.implusBuffer.getChannelData(1)[t]=(Math.random()*2-1)*.9*Math.exp(-r*5)}this.convolverNode=this.audioContext.createConvolver(),this.convolverNode.buffer=this.implusBuffer,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=1.3,this.realtimeDataSize=2048,this.realtimeAnalyzer=this.audioContext.createAnalyser(),this.realtimeAnalyzer.fftSize=this.realtimeDataSize,this.timeDomainArray=new Uint8Array(this.realtimeAnalyzer.fftSize),this.timeDomainTexture=new M(this.gl),this.timeDomainTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.frequencyArray=new Uint8Array(this.realtimeAnalyzer.frequencyBinCount),this.frequencyTexture=new M(this.gl),this.frequencyTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}static get key(){return"music"}render(){this.progress=[0,0],this.currentRender&&this.currentRender.stop(),this.stop(),this.isAudioBufferReady=!1;const e=new an(this.gl),t=new Cr(this.gl);t.setBuffer("left",this.bufferL,0),t.setBuffer("right",this.bufferR,1),t.bind(()=>{e.setShader(vt(se("music",aa)),oa,{transformFeedbackVaryings:["o_left","o_right"]})}),e.setUniform("uDuration","1f",[Ye]),e.setUniform("uBPM","1f",[yn]),e.setUniform("uSampleRate","1f",[this.audioContext.sampleRate]);const r=e.getVAO();let i=!0;const o=()=>{i=!1};if(r){r.setAttribute("aTime",this.bufferIn,1);const u=Math.floor(this.timeCode/(this.bufferLength/this.audioBuffer.sampleRate/this.numSampleBlocks));(async()=>{for(let l=0;l<this.numSampleBlocks;l++){let h;if(l%2===0?h=u+Math.floor(l/2):h=u-Math.ceil(l/2),h>=this.numSampleBlocks?h=h-this.numSampleBlocks:h<0&&(h=h+this.numSampleBlocks),await new Promise(p=>{setTimeout(()=>{this.isAudioBufferReady=!0,p(null)},100)}),!i)return;e.setUniform("uTimeOffset","1f",[this.blockLength*h/this.audioContext.sampleRate]),e.use(()=>{e.uploadUniforms(),t.use(()=>{this.gl.beginTransformFeedback(this.gl.POINTS),this.gl.enable(this.gl.RASTERIZER_DISCARD),r.use(()=>{this.gl.drawArrays(this.gl.POINTS,0,r.vertCount)}),this.gl.disable(this.gl.RASTERIZER_DISCARD),this.gl.endTransformFeedback()}),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferL.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayL),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferR.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);for(let p=0;p<this.blockLength;p++){const f=h*this.blockLength+p,d=f<Ye*this.audioContext.sampleRate?1:0;this.audioBuffer.getChannelData(0)[f]=this.tmpOutputArrayL[p]*d,this.audioBuffer.getChannelData(1)[f]=this.tmpOutputArrayR[p]*d}}),this.progress=[l,this.numSampleBlocks-1],this.notice()}this._entity&&this._entity.noticeEventParent("update/music/complete",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture])})()}return{stop:o}}updateImpl(e){if(this.timeCode=e.timeCode,!e.playing||e.timeCode<0){this.stop();return}this.play(e.timeCode,this.forcePlay),this.forcePlay=!1,this.realtimeAnalyzer.getByteTimeDomainData(this.timeDomainArray),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.realtimeAnalyzer.getByteFrequencyData(this.frequencyArray),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}setEntityImpl(e){this.notice()}unsetEntityImpl(e){this.stop()}notice(){setTimeout(()=>{this._entity&&this._entity.noticeEventParent("update/music",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture,this.progress])},0)}play(e=0,t){this.audioSrcNode&&!t&&Math.abs(this.audioSrcNode.context.currentTime-this.playStartTime-e)<.1||(this.stop(),this.isAudioBufferReady&&(this.audioSrcNode=this.audioContext.createBufferSource(),this.audioSrcNode.buffer=this.audioBuffer,this.audioSrcNode.loop=!1,this.audioSrcNode.start(0,e),this.playStartTime=this.audioSrcNode.context.currentTime-(e||0),this.audioSrcNode.connect(this.gainNode),this.audioSrcNode.connect(this.convolverNode),this.convolverNode.connect(this.gainNode),this.gainNode.connect(this.audioContext.destination),this.gainNode.connect(this.realtimeAnalyzer)))}stop(){this.audioSrcNode&&(this.audioSrcNode.stop(),this.audioSrcNode.disconnect(this.gainNode),this.audioSrcNode=null),this.convolverNode&&this.convolverNode.disconnect()}dispose(){super.dispose(),this.stop(),this.frequencyTexture.dispose(),this.timeDomainTexture.dispose()}}const ca=`#include <common>
#include <packing>
#include <frag_h>

uniform sampler2D uNoiseTex;

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <frag_in>

	vec4 noise = texture( uNoiseTex, vUv * 0.1 + 0.1 * texture( uNoiseTex, vUv * 0.5 ).xy );

	outRoughness = smoothstep( 0.2, 0.9, noise.x );
	outColor = vec4( 1.0 - ( outRoughness * 0.3 ) );

	outNormal.xz += noise.yz * 0.03;
	outNormal = normalize( outNormal );

	#include <frag_out>

}`,ua=`#include <common>
#include <vert_h>
#include <noise_value>

uniform float uTime;

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	#include <vert_in>

	// outPos.x += sin( outPos.z  * 10.0 + uTime * 10.0) * 0.1;

	float n = 1.0;
	n *= step( noiseValue( floor( outPos * 100.0 * 10.0 ) / 10.0 + uTime * 10.0 ), 0.5 );
	n *= step( noiseValue( floor( outPos * 1.0 * 10.0 ) / 10.0 + vec3( 0.0, 0.0, uTime * 3.0 ) ), 0.2 ) * 2.0;

	// outPos *= 1.0 + n;
	vPosBase = outPos;
	vNoise = n;
	
	#include <vert_out>
	
}`;class ma extends cn{constructor(n){const e=new de({frag:se("orengineCubeFrag",ca),vert:se("orengineCubeVert",ua),uniforms:Y.merge(ae.time,{uNoiseTex:{value:Q.resources.getTexture("noise"),type:"1i"}})});super({...n,args:e})}}const ha=`#include <common>
#include <packing>
#include <frag_h>

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <frag_in>

	float or = step( vPosBase.x, -0.2 );
	float flash = smoothstep(0.3, 0.0,  vNoise) * or;
	
	outEmission = vec3( (1.0 - flash * 0.7) * 3.0 );
	outRoughness = 0.3;
	
	#include <frag_out>

}`,da=`#include <common>
#include <vert_h>
#include <noise_value>

uniform float uTimeE;

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	#include <vert_in>

	vPosBase = outPos;
	vNoise = noiseValue( vec3( uTimeE * 8.0 ) );
	
	#include <vert_out>
	
}`;class fa extends cn{constructor(n){const e=new de({frag:se("OREngineLogoMaterialFrag",ha),vert:se("OREngineLogoMaterialVert",da),uniforms:ae.time,phase:["deferred","shadowMap"]});super({...n,args:e})}}const pa=`#include <common>\r
#include <packing>\r
#include <frag_h>\r
#include <noise_value>\r
#include <rotate>\r
\r
uniform float uTimeE;\r
\r
uniform float uAspectRatio;\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
\r
	vec3 normal = normalize( - vNormal );\r
	outRoughness = 1.0;\r
	outColor *= 0.0;\r
	outColor.xyz = vec3( 0.0, 0.05, 0.1);\r
\r
	float n = noiseValue( outPos * 0.15 + uTimeE * 0.1 );\r
\r
	vec3 n2Pos = outPos;\r
	n2Pos.xz *= rotate( n2Pos.y * 0.02 );\r
	float n2 = noiseValue( n2Pos * 0.15 + vec3( 0.0, 0.0, uTimeE * 0.1 + n ) );\r
\r
	float phase = 4.5;\r
\r
	float line = smoothstep( 0.88, 0.9, fract( n2 * phase ) );\r
	float pattern = smoothstep( 0.2, 0.1, length( fract( ( vUv + vec2( floor(vUv.y * 150.0) / 150.0 * 0.25, 0.0 ) ) * vec2( 2.0, 1.0 ) * 150.0 ) - 0.5 )) * step( n2 * phase, 2.0 ) * 0.8;\r
\r
	float emit = min( line + pattern, 1.0 );\r
\r
	outEmission = vec3( emit * 20.0 * smoothstep( 0.4, 1.0, n) );\r
\r
	#ifdef IS_FORWARD\r
\r
		outColor = vec4( outEmission, 1.0 );\r
	\r
	#endif\r
\r
	outEnv = 0.0;\r
\r
	#include <frag_out>\r
\r
} `;class ga extends q{constructor(n){super(n);const e=this._entity.addComponent(ie);e.geometry=new ln({radius:50,widthSegments:32,heightSegments:32}),e.material=new de({phase:["deferred","envMap"],frag:se("skybox",pa),cullFace:!1,uniforms:Y.merge(ae.time,ae.music)})}}class xa extends q{constructor(e){super(e);c(this,"speed");c(this,"rotQuaternion");this.speed=1,this.rotQuaternion=new ye}updateImpl(e){this.rotQuaternion.setFromEuler(new Rt(0,-.4*e.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}}class va extends q{constructor(e){super(e);c(this,"isLoading");c(this,"spzEntity");c(this,"spzController");this.isLoading=!1,this.spzEntity=null,this.spzController=null,this.loadSPZ("/racoonfamily.spz")}async loadSPZ(e){if(!this.isLoading){this.isLoading=!0;try{const r=await new $e(X).load(e,{isCompressed:!0,sourceCoordinateSystem:yt.RDF,antialias:!0});console.log("SPZ loaded:",r),this.spzEntity&&this.entity.remove(this.spzEntity),this.spzEntity=r.scene,this.entity.add(this.spzEntity),this.spzController=this.spzEntity.getComponent(Et)||null,this.spzEntity.position.set(0,0,-3),this.spzEntity.scale.set(.5,.5,.5)}catch(t){console.error("SPZ loading error:",t);try{const i=await new $e(X).load(e,{isCompressed:!1,sourceCoordinateSystem:yt.RDF,antialias:!0});this.spzEntity&&this.entity.remove(this.spzEntity),this.spzEntity=i.scene,this.entity.add(this.spzEntity),this.spzController=this.spzEntity.getComponent(Et)||null,this.spzEntity.position.set(0,0,-3),this.spzEntity.scale.set(.5,.5,.5)}catch(r){console.error("SPZ loading failed completely:",r)}}finally{this.isLoading=!1}}}update(e){super.update(e),this.spzEntity}dispose(){this.spzEntity&&(this.entity.remove(this.spzEntity),this.spzEntity=null,this.spzController=null),super.dispose()}}const Ea=`#include <common>\r
#include <frag_h>\r
#include <noise_value>\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec2 uv = vUv * 400.0;\r
\r
	outColor.x = hashv( uv );\r
	outColor.y = hashv( uv  + 1.0);\r
	outColor.z = hashv( uv + 2.0 );\r
	outColor.w = hashv( uv + 3.0 );\r
\r
} `,ya=`#include <common>\r
#include <frag_h>\r
#include <noise_value>\r
\r
layout (location = 0) out vec4 outColor;\r
\r
void main( void ) {\r
\r
	vec2 v = vUv * 15.0;\r
	vec2 lv = abs( vUv - 0.5 ) * 15.0;\r
	float lw = sin( vUv.x * PI ) * sin( vUv.y * PI );\r
\r
	outColor.x += mix( fbm( vec3( lv, 0.0 ) ), fbm( vec3( v, 0.0 ) ), lw );\r
	outColor.y += mix( fbm( vec3( lv, 100.0 ) ), fbm( vec3( v, 100.0 ) ), lw );\r
	outColor.z += mix( fbm( vec3( lv, 200.0 ) ), fbm( vec3( v, 200.0 ) ), lw );\r
	outColor.w += mix( fbm( vec3( lv, 300.0 ) ), fbm( vec3( v, 300.0 ) ), lw );\r
\r
} `,Jt=`#include <common>\r
#include <noise_cyclic>\r
\r
layout (location = 0) out vec4 outColor;\r
in vec2 vUv;\r
uniform float uTimeE;\r
\r
void main( void ) {\r
\r
	vec3 n = noiseCyc( vec3( vUv * 3.0, uTimeE * 0.5 ) );\r
	outColor.xyz = n;\r
\r
} `;class ba extends q{constructor(e){super(e);c(this,"updateTextures");this.updateTextures=[];const r=Q.getInstance(X).renderer;Q.resources.addTexture("noise",new Ze(r,{frag:ya,resolution:new w(1024,1024)})),Q.resources.addTexture("noiseCyclic",new Ze(r,{frag:Jt,resolution:new w(1024,1024)}));const i=new Ze(r,{frag:Ea,resolution:new w(512,512)});i.setting({magFilter:X.NEAREST,minFilter:X.NEAREST}),i.render(),Q.resources.addTexture("hash",i),this.updateTextures.push(Q.resources.addTexture("noiseCyclic_anime",new Ze(r,{frag:Jt,uniforms:Q.getInstance(X).uniforms,resolution:new w(512,512)}))),this.once("dispose",()=>{this.updateTextures.forEach(o=>{o.dispose()}),this.updateTextures=[]})}updateImpl(e){for(let t=0;t<this.updateTextures.length;t++)this.updateTextures[t].render()}}const wa=[[{axis:"x",k:[["B",[0,.039,-1,.039,1,.039]]]},{axis:"z",k:[["B",[0,8.832,-1,8.832,1,8.832]]]},{axis:"y",k:[["B",[0,1.525,-1,1.525,1,1.525]]]}],[{axis:"x",k:[["B",[0,-1.935,-25,-1.935,25,-1.935]],["B",[75,2.449,50,2.449,100,2.449]],["B",[150,-2,125,-2,175,-2]],["B",[225,2.207,200,2.207,250,2.207]],["B",[300,-1.935,275,-1.935,325,-1.935]]]},{axis:"z",k:[["B",[0,-1.031,-25,-1.031,25,-1.031]],["B",[75,-.957,50,-.984,100,-.931]],["B",[150,-.925,125,-.925,175,-.925]],["B",[225,-1.056,200,-1.056,250,-1.056]],["B",[300,-1.031,275,-1.031,325,-1.031]]]},{axis:"y",k:[["B",[0,1.875,-25,1.875,25,1.875]],["B",[75,.256,50,.474,100,.037]],["B",[150,.037,125,.037,175,.037]],["B",[225,1.984,200,1.984,250,1.984]],["B",[300,1.875,275,1.875,325,1.875]]]}]],_a={name:"root",parent:null,children:[{name:"CamDof",class:"",type:"empty",parent:"root",position:[0,1,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Camera",class:"",type:"camera",parent:"root",position:[.039,1.525,8.832],rotation:[1.571,0,0],scale:[1,1,1],visible:!0,param:{fov:21.908},animation:{position:0}},{name:"CamLook",class:"",type:"empty",parent:"root",position:[0,1.017,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Cube.001",class:"",type:"mesh",parent:"root",position:[-1.299,1.669,-1.024],rotation:[0,0,-0],scale:[.238,.238,.238],visible:!0,param:{position:"AACAvwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIA/AACAvwAAgL8AAIA/AACAPwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIA/AACAPwAAgD8AAIA/",normal:"AACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAA",uv:"AADAPgAAAAAAACA/AAAAAAAAID8AAIA+AADAPgAAgD4AAMA+AACAPgAAID8AAIA+AAAgPwAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAAD8AACA/AABAPwAAwD4AAEA/AADAPgAAQD8AACA/AABAPwAAID8AAIA/AADAPgAAgD8AAAA+AAAAPwAAwD4AAAA/AADAPgAAQD8AAAA+AABAPwAAID8AAAA/AABgPwAAAD8AAGA/AABAPwAAID8AAEA/",index:"AAABAAIAAAACAAMABAAFAAYABAAGAAcACAAJAAoACAAKAAsADAANAA4ADAAOAA8AEAARABIAEAASABMAFAAVABYAFAAWABcA"},animation:{position:1}},{name:"OREngine",class:"",type:"gltf",parent:"root",position:[0,1.063,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"OREngineCube",class:"",type:"cube",parent:"root",position:[0,.96,-3.209],rotation:[.166,.754,.158],scale:[2.3,2.3,2.3],visible:!0,param:{x:1,y:1,z:1}},{name:"SkyBox",class:"",type:"empty",parent:"root",position:[0,0,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"Spot.001",class:"",type:"light",parent:"root",position:[7.6,7.343,4.754],rotation:[.814,.6,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:3,type:"spot",angle:.611,blend:1}},{name:"Spot.002",class:"",type:"light",parent:"root",position:[-13.676,-15.599,-.377],rotation:[1.02,-1.854,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:2,type:"spot",angle:.691,blend:1}}],type:"empty",visible:!0},Na={start:1,end:300,fps:30,playing:!1},Ra={animations:wa,root:_a,frame:Na};class Aa extends q{constructor(e){super(e);c(this,"blidge");c(this,"type");c(this,"blidgeRoot");c(this,"entities");c(this,"connection");c(this,"useGLTF");c(this,"gltfPath");this.entities=new Map,this.type="websocket",this.connection={enabled:!0,url:"ws://localhost:3100"},this.useGLTF=!1,this.gltfPath="/OREngine/develop//scene.glb",this.blidgeRoot=null,this.blidge=new Ur(X);const t=this.onSyncScene.bind(this),r=u=>{this.entity&&this.entity.noticeEventParent("update/blidge/frame",[u])};this.blidge.on("sync/scene",t),this.blidge.on("sync/timeline",r),this.once("dispose",()=>{this.blidge.off("sync/scene",t),this.blidge.off("sync/timeline",r)});const i=async()=>{this.type=="json"?(await this.blidge.loadScene(Ra,this.useGLTF?this.gltfPath:void 0),this.emit("loaded")):this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field("mode",()=>this.type,u=>{this.type=u,i()},{format:{type:"select",list:["websocket","json"]}}),this.field("gltf",()=>this.useGLTF,u=>{this.useGLTF=u,i()}),this.field("gltfPath",()=>this.gltfPath,u=>{this.gltfPath=u,i()});const o=this.fieldDir("websocket",{hidden:()=>this.type!="websocket"});o.field("reconnect",()=>()=>i(),void 0,{label:"Reconnect"}),o.field("url",()=>this.connection.url,u=>this.connection.url=u)}onSyncScene(e){const t=new Date().getTime(),r=o=>{const u=this.entities.get(o.name)||new oe;if(o.type=="camera"){const a=o.param;u.userData.cameraParam=a}return u.removeComponent(Ve),u.addComponent(Ve,{blidge:e,node:o}),o.children.forEach(a=>{const l=r(a);u.add(l)}),this.entities.set(u.name,u),u.userData.updateTime=t,u},i=e.root&&r(e.root);i&&(i.name="blidgeRoot",this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=i,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(o=>{if(o.userData.updateTime!=t){const u=o.parent;u&&u.remove(o),o.dispose(),this.entities.delete(o.name)}}),this.entity&&(this.entity.noticeEventChilds("sceneCreated",[this.blidgeRoot]),this.entity.noticeEventParent("update/blidge/scene",[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),this.blidgeRoot=null)}}class Ca extends q{constructor(n){super(n)}updateImpl(n){ae.time.uTime.value=n.timeCode,ae.time.uTimeF.value=n.timeCode%1,ae.time.uTimeE.value=n.timeElapsed,ae.time.uTimeEF.value=n.timeElapsed%1,ae.resolution.uAspectRatio.value=n.resolution.x/n.resolution.y}}const Kt={Camera:{MainCamera:sa},DemoProject:{DemoMusic:la,OREngineCubeMaterial:ma,OREngineLogoMaterial:fa,SkyBox:ga},ObjectControls:{ShakeViewer:xn,LookAt:tt,ObjectRotate:xa,OrbitControls:vn},Samples:{SPZModel:va},Texture:{TextureGenerator:ba},Utilities:{BLidgeClient:Aa,UniformControls:Ca}},Pa=()=>{Q.resources.clear();const s=(t,r)=>{const i=Object.keys(t);for(let o=0;o<i.length;o++){const u=i[o],a=t[u];if(typeof a=="function")r.addComponent(u,a);else{const l=r.createGroup(u);s(a,l)}}};Q.resources.addComponentGroup("Light").addComponent("Light",Ae);const e=Object.keys(Kt);for(let t=0;t<e.length;t++){const r=e[t],i=Kt[r],o=Q.resources.addComponentGroup(r);s(i,o)}};Pa();const Je=new URLSearchParams(location.search).get("project")||"default",Ta=()=>{const[s,n]=v.useState(),[e,t]=v.useState();return v.useEffect(()=>{fetch(`/api/projects/${Je}/scene`).then(r=>r.json()).then(r=>{r&&n(r)}).catch(()=>{Cn(()=>import("./scene-cCbT6svA.js"),[]).then(r=>{n(r.default)})}),fetch(`/api/projects/${Je}/editor`).then(r=>r.json()).then(r=>{r&&t(r)}).catch(()=>{})},[]),m.jsxDEV(Wo,{gl:X,project:s,children:m.jsxDEV(Ho,{editorData:e,onSave:(r,i)=>{fetch(`/api/projects/${Je}/scene`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),fetch(`/api/projects/${Je}/editor`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/components/pages/EditorPage/index.tsx",lineNumber:49,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/components/pages/EditorPage/index.tsx",lineNumber:48,columnNumber:3},void 0)};export{Ta as EditorPage};
