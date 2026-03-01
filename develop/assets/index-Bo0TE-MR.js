var rD=Object.defineProperty;var iD=(h,l,i)=>l in h?rD(h,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[l]=i;var b=(h,l,i)=>iD(h,typeof l!="symbol"?l+"":l,i);(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function i(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(c){if(c.ep)return;c.ep=!0;const d=i(c);fetch(c.href,d)}})();function aD(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var hE={exports:{}},Rv={},mE={exports:{}},ad={exports:{}};ad.exports;(function(h,l){/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var i="18.3.1",o=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),v=Symbol.for("react.provider"),p=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),T=Symbol.for("react.suspense_list"),C=Symbol.for("react.memo"),M=Symbol.for("react.lazy"),G=Symbol.for("react.offscreen"),Y=Symbol.iterator,H="@@iterator";function O(y){if(y===null||typeof y!="object")return null;var N=Y&&y[Y]||y[H];return typeof N=="function"?N:null}var $={current:null},ae={transition:null},V={current:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},re={current:null},Q={},xe=null;function ie(y){xe=y}Q.setExtraStackFrame=function(y){xe=y},Q.getCurrentStack=null,Q.getStackAddendum=function(){var y="";xe&&(y+=xe);var N=Q.getCurrentStack;return N&&(y+=N()||""),y};var K=!1,pe=!1,Fe=!1,se=!1,ge=!1,Ee={ReactCurrentDispatcher:$,ReactCurrentBatchConfig:ae,ReactCurrentOwner:re};Ee.ReactDebugCurrentFrame=Q,Ee.ReactCurrentActQueue=V;function le(y){{for(var N=arguments.length,F=new Array(N>1?N-1:0),U=1;U<N;U++)F[U-1]=arguments[U];Xe("warn",y,F)}}function ne(y){{for(var N=arguments.length,F=new Array(N>1?N-1:0),U=1;U<N;U++)F[U-1]=arguments[U];Xe("error",y,F)}}function Xe(y,N,F){{var U=Ee.ReactDebugCurrentFrame,te=U.getStackAddendum();te!==""&&(N+="%s",F=F.concat([te]));var Ae=F.map(function(Re){return String(Re)});Ae.unshift("Warning: "+N),Function.prototype.apply.call(console[y],console,Ae)}}var Tt={};function Bt(y,N){{var F=y.constructor,U=F&&(F.displayName||F.name)||"ReactClass",te=U+"."+N;if(Tt[te])return;ne("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",N,U),Tt[te]=!0}}var Gt={isMounted:function(y){return!1},enqueueForceUpdate:function(y,N,F){Bt(y,"forceUpdate")},enqueueReplaceState:function(y,N,F,U){Bt(y,"replaceState")},enqueueSetState:function(y,N,F,U){Bt(y,"setState")}},bt=Object.assign,At={};Object.freeze(At);function Kt(y,N,F){this.props=y,this.context=N,this.refs=At,this.updater=F||Gt}Kt.prototype.isReactComponent={},Kt.prototype.setState=function(y,N){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,N,"setState")},Kt.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};{var On={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},jn=function(y,N){Object.defineProperty(Kt.prototype,y,{get:function(){le("%s(...) is deprecated in plain JavaScript React classes. %s",N[0],N[1])}})};for(var Hn in On)On.hasOwnProperty(Hn)&&jn(Hn,On[Hn])}function kn(){}kn.prototype=Kt.prototype;function Ut(y,N,F){this.props=y,this.context=N,this.refs=At,this.updater=F||Gt}var cn=Ut.prototype=new kn;cn.constructor=Ut,bt(cn,Kt.prototype),cn.isPureReactComponent=!0;function bn(){var y={current:null};return Object.seal(y),y}var Gn=Array.isArray;function Mt(y){return Gn(y)}function fn(y){{var N=typeof Symbol=="function"&&Symbol.toStringTag,F=N&&y[Symbol.toStringTag]||y.constructor.name||"Object";return F}}function Wt(y){try{return Pt(y),!1}catch{return!0}}function Pt(y){return""+y}function Zt(y){if(Wt(y))return ne("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",fn(y)),Pt(y)}function ur(y,N,F){var U=y.displayName;if(U)return U;var te=N.displayName||N.name||"";return te!==""?F+"("+te+")":F}function Cr(y){return y.displayName||"Context"}function er(y){if(y==null)return null;if(typeof y.tag=="number"&&ne("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof y=="function")return y.displayName||y.name||null;if(typeof y=="string")return y;switch(y){case d:return"Fragment";case c:return"Portal";case x:return"Profiler";case u:return"StrictMode";case w:return"Suspense";case T:return"SuspenseList"}if(typeof y=="object")switch(y.$$typeof){case p:var N=y;return Cr(N)+".Consumer";case v:var F=y;return Cr(F._context)+".Provider";case _:return ur(y,y.render,"ForwardRef");case C:var U=y.displayName||null;return U!==null?U:er(y.type)||"Memo";case M:{var te=y,Ae=te._payload,Re=te._init;try{return er(Re(Ae))}catch{return null}}}return null}var Ur=Object.prototype.hasOwnProperty,wr={key:!0,ref:!0,__self:!0,__source:!0},Wn,Tr,Mn;Mn={};function cr(y){if(Ur.call(y,"ref")){var N=Object.getOwnPropertyDescriptor(y,"ref").get;if(N&&N.isReactWarning)return!1}return y.ref!==void 0}function Vt(y){if(Ur.call(y,"key")){var N=Object.getOwnPropertyDescriptor(y,"key").get;if(N&&N.isReactWarning)return!1}return y.key!==void 0}function Nr(y,N){var F=function(){Wn||(Wn=!0,ne("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",N))};F.isReactWarning=!0,Object.defineProperty(y,"key",{get:F,configurable:!0})}function wi(y,N){var F=function(){Tr||(Tr=!0,ne("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",N))};F.isReactWarning=!0,Object.defineProperty(y,"ref",{get:F,configurable:!0})}function Ti(y){if(typeof y.ref=="string"&&re.current&&y.__self&&re.current.stateNode!==y.__self){var N=er(re.current.type);Mn[N]||(ne('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',N,y.ref),Mn[N]=!0)}}var ue=function(y,N,F,U,te,Ae,Re){var ke={$$typeof:o,type:y,key:N,ref:F,props:Re,_owner:Ae};return ke._store={},Object.defineProperty(ke._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(ke,"_self",{configurable:!1,enumerable:!1,writable:!1,value:U}),Object.defineProperty(ke,"_source",{configurable:!1,enumerable:!1,writable:!1,value:te}),Object.freeze&&(Object.freeze(ke.props),Object.freeze(ke)),ke};function Se(y,N,F){var U,te={},Ae=null,Re=null,ke=null,$e=null;if(N!=null){cr(N)&&(Re=N.ref,Ti(N)),Vt(N)&&(Zt(N.key),Ae=""+N.key),ke=N.__self===void 0?null:N.__self,$e=N.__source===void 0?null:N.__source;for(U in N)Ur.call(N,U)&&!wr.hasOwnProperty(U)&&(te[U]=N[U])}var ct=arguments.length-2;if(ct===1)te.children=F;else if(ct>1){for(var pt=Array(ct),vt=0;vt<ct;vt++)pt[vt]=arguments[vt+2];Object.freeze&&Object.freeze(pt),te.children=pt}if(y&&y.defaultProps){var St=y.defaultProps;for(U in St)te[U]===void 0&&(te[U]=St[U])}if(Ae||Re){var Lt=typeof y=="function"?y.displayName||y.name||"Unknown":y;Ae&&Nr(te,Lt),Re&&wi(te,Lt)}return ue(y,Ae,Re,ke,$e,re.current,te)}function je(y,N){var F=ue(y.type,N,y.ref,y._self,y._source,y._owner,y.props);return F}function lt(y,N,F){if(y==null)throw new Error("React.cloneElement(...): The argument must be a React element, but you passed "+y+".");var U,te=bt({},y.props),Ae=y.key,Re=y.ref,ke=y._self,$e=y._source,ct=y._owner;if(N!=null){cr(N)&&(Re=N.ref,ct=re.current),Vt(N)&&(Zt(N.key),Ae=""+N.key);var pt;y.type&&y.type.defaultProps&&(pt=y.type.defaultProps);for(U in N)Ur.call(N,U)&&!wr.hasOwnProperty(U)&&(N[U]===void 0&&pt!==void 0?te[U]=pt[U]:te[U]=N[U])}var vt=arguments.length-2;if(vt===1)te.children=F;else if(vt>1){for(var St=Array(vt),Lt=0;Lt<vt;Lt++)St[Lt]=arguments[Lt+2];te.children=St}return ue(y.type,Ae,Re,ke,$e,ct,te)}function ut(y){return typeof y=="object"&&y!==null&&y.$$typeof===o}var Jt=".",It=":";function tr(y){var N=/[=:]/g,F={"=":"=0",":":"=2"},U=y.replace(N,function(te){return F[te]});return"$"+U}var mt=!1,fr=/\/+/g;function Rt(y){return y.replace(fr,"$&/")}function _t(y,N){return typeof y=="object"&&y!==null&&y.key!=null?(Zt(y.key),tr(""+y.key)):N.toString(36)}function oi(y,N,F,U,te){var Ae=typeof y;(Ae==="undefined"||Ae==="boolean")&&(y=null);var Re=!1;if(y===null)Re=!0;else switch(Ae){case"string":case"number":Re=!0;break;case"object":switch(y.$$typeof){case o:case c:Re=!0}}if(Re){var ke=y,$e=te(ke),ct=U===""?Jt+_t(ke,0):U;if(Mt($e)){var pt="";ct!=null&&(pt=Rt(ct)+"/"),oi($e,N,pt,"",function(md){return md})}else $e!=null&&(ut($e)&&($e.key&&(!ke||ke.key!==$e.key)&&Zt($e.key),$e=je($e,F+($e.key&&(!ke||ke.key!==$e.key)?Rt(""+$e.key)+"/":"")+ct)),N.push($e));return 1}var vt,St,Lt=0,nt=U===""?Jt:U+It;if(Mt(y))for(var ca=0;ca<y.length;ca++)vt=y[ca],St=nt+_t(vt,ca),Lt+=oi(vt,N,F,St,te);else{var ko=O(y);if(typeof ko=="function"){var Ys=y;ko===Ys.entries&&(mt||le("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),mt=!0);for(var hd=ko.call(Ys),ki,$s=0;!(ki=hd.next()).done;)vt=ki.value,St=nt+_t(vt,$s++),Lt+=oi(vt,N,F,St,te)}else if(Ae==="object"){var qs=String(y);throw new Error("Objects are not valid as a React child (found: "+(qs==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":qs)+"). If you meant to render a collection of children, use an array instead.")}}return Lt}function Vr(y,N,F){if(y==null)return y;var U=[],te=0;return oi(y,U,"","",function(Ae){return N.call(F,Ae,te++)}),U}function Ba(y){var N=0;return Vr(y,function(){N++}),N}function Co(y,N,F){Vr(y,function(){N.apply(this,arguments)},F)}function ks(y){return Vr(y,function(N){return N})||[]}function Ua(y){if(!ut(y))throw new Error("React.Children.only expected to receive a single React element child.");return y}function Va(y){var N={$$typeof:p,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};N.Provider={$$typeof:v,_context:N};var F=!1,U=!1,te=!1;{var Ae={$$typeof:p,_context:N};Object.defineProperties(Ae,{Provider:{get:function(){return U||(U=!0,ne("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),N.Provider},set:function(Re){N.Provider=Re}},_currentValue:{get:function(){return N._currentValue},set:function(Re){N._currentValue=Re}},_currentValue2:{get:function(){return N._currentValue2},set:function(Re){N._currentValue2=Re}},_threadCount:{get:function(){return N._threadCount},set:function(Re){N._threadCount=Re}},Consumer:{get:function(){return F||(F=!0,ne("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),N.Consumer}},displayName:{get:function(){return N.displayName},set:function(Re){te||(le("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",Re),te=!0)}}}),N.Consumer=Ae}return N._currentRenderer=null,N._currentRenderer2=null,N}var Ni=-1,na=0,Ai=1,si=2;function Ir(y){if(y._status===Ni){var N=y._result,F=N();if(F.then(function(Ae){if(y._status===na||y._status===Ni){var Re=y;Re._status=Ai,Re._result=Ae}},function(Ae){if(y._status===na||y._status===Ni){var Re=y;Re._status=si,Re._result=Ae}}),y._status===Ni){var U=y;U._status=na,U._result=F}}if(y._status===Ai){var te=y._result;return te===void 0&&ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,te),"default"in te||ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,te),te.default}else throw y._result}function A(y){var N={_status:Ni,_result:y},F={$$typeof:M,_payload:N,_init:Ir};{var U,te;Object.defineProperties(F,{defaultProps:{configurable:!0,get:function(){return U},set:function(Ae){ne("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),U=Ae,Object.defineProperty(F,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return te},set:function(Ae){ne("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),te=Ae,Object.defineProperty(F,"propTypes",{enumerable:!0})}}})}return F}function Z(y){y!=null&&y.$$typeof===C?ne("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof y!="function"?ne("forwardRef requires a render function but was given %s.",y===null?"null":typeof y):y.length!==0&&y.length!==2&&ne("forwardRef render functions accept exactly two parameters: props and ref. %s",y.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),y!=null&&(y.defaultProps!=null||y.propTypes!=null)&&ne("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var N={$$typeof:_,render:y};{var F;Object.defineProperty(N,"displayName",{enumerable:!1,configurable:!0,get:function(){return F},set:function(U){F=U,!y.name&&!y.displayName&&(y.displayName=U)}})}return N}var ce;ce=Symbol.for("react.module.reference");function Te(y){return!!(typeof y=="string"||typeof y=="function"||y===d||y===x||ge||y===u||y===w||y===T||se||y===G||K||pe||Fe||typeof y=="object"&&y!==null&&(y.$$typeof===M||y.$$typeof===C||y.$$typeof===v||y.$$typeof===p||y.$$typeof===_||y.$$typeof===ce||y.getModuleId!==void 0))}function Ye(y,N){Te(y)||ne("memo: The first argument must be a component. Instead received: %s",y===null?"null":typeof y);var F={$$typeof:C,type:y,compare:N===void 0?null:N};{var U;Object.defineProperty(F,"displayName",{enumerable:!1,configurable:!0,get:function(){return U},set:function(te){U=te,!y.name&&!y.displayName&&(y.displayName=te)}})}return F}function Oe(){var y=$.current;return y===null&&ne(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`),y}function Ie(y){var N=Oe();if(y._context!==void 0){var F=y._context;F.Consumer===y?ne("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):F.Provider===y&&ne("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return N.useContext(y)}function Ue(y){var N=Oe();return N.useState(y)}function Dt(y,N,F){var U=Oe();return U.useReducer(y,N,F)}function He(y){var N=Oe();return N.useRef(y)}function Nt(y,N){var F=Oe();return F.useEffect(y,N)}function Pn(y,N){var F=Oe();return F.useInsertionEffect(y,N)}function jr(y,N){var F=Oe();return F.useLayoutEffect(y,N)}function Hr(y,N){var F=Oe();return F.useCallback(y,N)}function dn(y,N){var F=Oe();return F.useMemo(y,N)}function Ia(y,N,F){var U=Oe();return U.useImperativeHandle(y,N,F)}function wo(y,N){{var F=Oe();return F.useDebugValue(y,N)}}function Ms(){var y=Oe();return y.useTransition()}function Di(y){var N=Oe();return N.useDeferredValue(y)}function We(){var y=Oe();return y.useId()}function ja(y,N,F){var U=Oe();return U.useSyncExternalStore(y,N,F)}var ra=0,Ps,Ls,zs,Fs,Bs,Us,Vs;function Mu(){}Mu.__reactDisabledLog=!0;function cd(){{if(ra===0){Ps=console.log,Ls=console.info,zs=console.warn,Fs=console.error,Bs=console.group,Us=console.groupCollapsed,Vs=console.groupEnd;var y={configurable:!0,enumerable:!0,value:Mu,writable:!0};Object.defineProperties(console,{info:y,log:y,warn:y,error:y,group:y,groupCollapsed:y,groupEnd:y})}ra++}}function Is(){{if(ra--,ra===0){var y={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:bt({},y,{value:Ps}),info:bt({},y,{value:Ls}),warn:bt({},y,{value:zs}),error:bt({},y,{value:Fs}),group:bt({},y,{value:Bs}),groupCollapsed:bt({},y,{value:Us}),groupEnd:bt({},y,{value:Vs})})}ra<0&&ne("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Ha=Ee.ReactCurrentDispatcher,Ar;function ia(y,N,F){{if(Ar===void 0)try{throw Error()}catch(te){var U=te.stack.trim().match(/\n( *(at )?)/);Ar=U&&U[1]||""}return`
`+Ar+y}}var aa=!1,To;{var js=typeof WeakMap=="function"?WeakMap:Map;To=new js}function Pu(y,N){if(!y||aa)return"";{var F=To.get(y);if(F!==void 0)return F}var U;aa=!0;var te=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Ae;Ae=Ha.current,Ha.current=null,cd();try{if(N){var Re=function(){throw Error()};if(Object.defineProperty(Re.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Re,[])}catch(nt){U=nt}Reflect.construct(y,[],Re)}else{try{Re.call()}catch(nt){U=nt}y.call(Re.prototype)}}else{try{throw Error()}catch(nt){U=nt}y()}}catch(nt){if(nt&&U&&typeof nt.stack=="string"){for(var ke=nt.stack.split(`
`),$e=U.stack.split(`
`),ct=ke.length-1,pt=$e.length-1;ct>=1&&pt>=0&&ke[ct]!==$e[pt];)pt--;for(;ct>=1&&pt>=0;ct--,pt--)if(ke[ct]!==$e[pt]){if(ct!==1||pt!==1)do if(ct--,pt--,pt<0||ke[ct]!==$e[pt]){var vt=`
`+ke[ct].replace(" at new "," at ");return y.displayName&&vt.includes("<anonymous>")&&(vt=vt.replace("<anonymous>",y.displayName)),typeof y=="function"&&To.set(y,vt),vt}while(ct>=1&&pt>=0);break}}}finally{aa=!1,Ha.current=Ae,Is(),Error.prepareStackTrace=te}var St=y?y.displayName||y.name:"",Lt=St?ia(St):"";return typeof y=="function"&&To.set(y,Lt),Lt}function Hs(y,N,F){return Pu(y,!1)}function fd(y){var N=y.prototype;return!!(N&&N.isReactComponent)}function oa(y,N,F){if(y==null)return"";if(typeof y=="function")return Pu(y,fd(y));if(typeof y=="string")return ia(y);switch(y){case w:return ia("Suspense");case T:return ia("SuspenseList")}if(typeof y=="object")switch(y.$$typeof){case _:return Hs(y.render);case C:return oa(y.type,N,F);case M:{var U=y,te=U._payload,Ae=U._init;try{return oa(Ae(te),N,F)}catch{}}}return""}var Lu={},Gs=Ee.ReactDebugCurrentFrame;function No(y){if(y){var N=y._owner,F=oa(y.type,y._source,N?N.type:null);Gs.setExtraStackFrame(F)}else Gs.setExtraStackFrame(null)}function zu(y,N,F,U,te){{var Ae=Function.call.bind(Ur);for(var Re in y)if(Ae(y,Re)){var ke=void 0;try{if(typeof y[Re]!="function"){var $e=Error((U||"React class")+": "+F+" type `"+Re+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof y[Re]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw $e.name="Invariant Violation",$e}ke=y[Re](N,Re,U,F,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(ct){ke=ct}ke&&!(ke instanceof Error)&&(No(te),ne("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",U||"React class",F,Re,typeof ke),No(null)),ke instanceof Error&&!(ke.message in Lu)&&(Lu[ke.message]=!0,No(te),ne("Failed %s type: %s",F,ke.message),No(null))}}}function Je(y){if(y){var N=y._owner,F=oa(y.type,y._source,N?N.type:null);ie(F)}else ie(null)}var Ws;Ws=!1;function Xs(){if(re.current){var y=er(re.current.type);if(y)return`

Check the render method of \``+y+"`."}return""}function Be(y){if(y!==void 0){var N=y.fileName.replace(/^.*[\\\/]/,""),F=y.lineNumber;return`

Check your code at `+N+":"+F+"."}return""}function Fu(y){return y!=null?Be(y.__source):""}var Ln={};function Ga(y){var N=Xs();if(!N){var F=typeof y=="string"?y:y.displayName||y.name;F&&(N=`

Check the top-level render call using <`+F+">.")}return N}function sa(y,N){if(!(!y._store||y._store.validated||y.key!=null)){y._store.validated=!0;var F=Ga(N);if(!Ln[F]){Ln[F]=!0;var U="";y&&y._owner&&y._owner!==re.current&&(U=" It was passed a child from "+er(y._owner.type)+"."),Je(y),ne('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',F,U),Je(null)}}}function Bu(y,N){if(typeof y=="object"){if(Mt(y))for(var F=0;F<y.length;F++){var U=y[F];ut(U)&&sa(U,N)}else if(ut(y))y._store&&(y._store.validated=!0);else if(y){var te=O(y);if(typeof te=="function"&&te!==y.entries)for(var Ae=te.call(y),Re;!(Re=Ae.next()).done;)ut(Re.value)&&sa(Re.value,N)}}}function hn(y){{var N=y.type;if(N==null||typeof N=="string")return;var F;if(typeof N=="function")F=N.propTypes;else if(typeof N=="object"&&(N.$$typeof===_||N.$$typeof===C))F=N.propTypes;else return;if(F){var U=er(N);zu(F,y.props,"prop",U,y)}else if(N.PropTypes!==void 0&&!Ws){Ws=!0;var te=er(N);ne("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",te||"Unknown")}typeof N.getDefaultProps=="function"&&!N.getDefaultProps.isReactClassApproved&&ne("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function Ot(y){{for(var N=Object.keys(y.props),F=0;F<N.length;F++){var U=N[F];if(U!=="children"&&U!=="key"){Je(y),ne("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",U),Je(null);break}}y.ref!==null&&(Je(y),ne("Invalid attribute `ref` supplied to `React.Fragment`."),Je(null))}}function Uu(y,N,F){var U=Te(y);if(!U){var te="";(y===void 0||typeof y=="object"&&y!==null&&Object.keys(y).length===0)&&(te+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var Ae=Fu(N);Ae?te+=Ae:te+=Xs();var Re;y===null?Re="null":Mt(y)?Re="array":y!==void 0&&y.$$typeof===o?(Re="<"+(er(y.type)||"Unknown")+" />",te=" Did you accidentally export a JSX literal instead of a component?"):Re=typeof y,ne("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",Re,te)}var ke=Se.apply(this,arguments);if(ke==null)return ke;if(U)for(var $e=2;$e<arguments.length;$e++)Bu(arguments[$e],y);return y===d?Ot(ke):hn(ke),ke}var dr=!1;function nr(y){var N=Uu.bind(null,y);return N.type=y,dr||(dr=!0,le("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(N,"type",{enumerable:!1,get:function(){return le("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:y}),y}}),N}function li(y,N,F){for(var U=lt.apply(this,arguments),te=2;te<arguments.length;te++)Bu(arguments[te],U.type);return hn(U),U}function dd(y,N){var F=ae.transition;ae.transition={};var U=ae.transition;ae.transition._updatedFibers=new Set;try{y()}finally{if(ae.transition=F,F===null&&U._updatedFibers){var te=U._updatedFibers.size;te>10&&le("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),U._updatedFibers.clear()}}}var Ao=!1,Wa=null;function Vu(y){if(Wa===null)try{var N=("require"+Math.random()).slice(0,7),F=h&&h[N];Wa=F.call(h,"timers").setImmediate}catch{Wa=function(te){Ao===!1&&(Ao=!0,typeof MessageChannel>"u"&&ne("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var Ae=new MessageChannel;Ae.port1.onmessage=te,Ae.port2.postMessage(void 0)}}return Wa(y)}var la=0,Iu=!1;function ju(y){{var N=la;la++,V.current===null&&(V.current=[]);var F=V.isBatchingLegacy,U;try{if(V.isBatchingLegacy=!0,U=y(),!F&&V.didScheduleLegacyUpdate){var te=V.current;te!==null&&(V.didScheduleLegacyUpdate=!1,Oo(te))}}catch(St){throw Oi(N),St}finally{V.isBatchingLegacy=F}if(U!==null&&typeof U=="object"&&typeof U.then=="function"){var Ae=U,Re=!1,ke={then:function(St,Lt){Re=!0,Ae.then(function(nt){Oi(N),la===0?Do(nt,St,Lt):St(nt)},function(nt){Oi(N),Lt(nt)})}};return!Iu&&typeof Promise<"u"&&Promise.resolve().then(function(){}).then(function(){Re||(Iu=!0,ne("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),ke}else{var $e=U;if(Oi(N),la===0){var ct=V.current;ct!==null&&(Oo(ct),V.current=null);var pt={then:function(St,Lt){V.current===null?(V.current=[],Do($e,St,Lt)):St($e)}};return pt}else{var vt={then:function(St,Lt){St($e)}};return vt}}}}function Oi(y){y!==la-1&&ne("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),la=y}function Do(y,N,F){{var U=V.current;if(U!==null)try{Oo(U),Vu(function(){U.length===0?(V.current=null,N(y)):Do(y,N,F)})}catch(te){F(te)}else N(y)}}var ua=!1;function Oo(y){if(!ua){ua=!0;var N=0;try{for(;N<y.length;N++){var F=y[N];do F=F(!0);while(F!==null)}y.length=0}catch(U){throw y=y.slice(N+1),U}finally{ua=!1}}}var Hu=Uu,Gu=li,Wu=nr,Xu={map:Vr,forEach:Co,count:Ba,toArray:ks,only:Ua};l.Children=Xu,l.Component=Kt,l.Fragment=d,l.Profiler=x,l.PureComponent=Ut,l.StrictMode=u,l.Suspense=w,l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ee,l.act=ju,l.cloneElement=Gu,l.createContext=Va,l.createElement=Hu,l.createFactory=Wu,l.createRef=bn,l.forwardRef=Z,l.isValidElement=ut,l.lazy=A,l.memo=Ye,l.startTransition=dd,l.unstable_act=ju,l.useCallback=Hr,l.useContext=Ie,l.useDebugValue=wo,l.useDeferredValue=Di,l.useEffect=Nt,l.useId=We,l.useImperativeHandle=Ia,l.useInsertionEffect=Pn,l.useLayoutEffect=jr,l.useMemo=dn,l.useReducer=Dt,l.useRef=He,l.useState=Ue,l.useSyncExternalStore=ja,l.useTransition=Ms,l.version=i,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()})(ad,ad.exports);var oD=ad.exports;mE.exports=oD;var X=mE.exports;const ku=aD(X);/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){var h=X,l=Symbol.for("react.element"),i=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),x=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),_=Symbol.for("react.suspense_list"),w=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),C=Symbol.for("react.offscreen"),M=Symbol.iterator,G="@@iterator";function Y(A){if(A===null||typeof A!="object")return null;var Z=M&&A[M]||A[G];return typeof Z=="function"?Z:null}var H=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function O(A){{for(var Z=arguments.length,ce=new Array(Z>1?Z-1:0),Te=1;Te<Z;Te++)ce[Te-1]=arguments[Te];$("error",A,ce)}}function $(A,Z,ce){{var Te=H.ReactDebugCurrentFrame,Ye=Te.getStackAddendum();Ye!==""&&(Z+="%s",ce=ce.concat([Ye]));var Oe=ce.map(function(Ie){return String(Ie)});Oe.unshift("Warning: "+Z),Function.prototype.apply.call(console[A],console,Oe)}}var ae=!1,V=!1,re=!1,Q=!1,xe=!1,ie;ie=Symbol.for("react.module.reference");function K(A){return!!(typeof A=="string"||typeof A=="function"||A===o||A===d||xe||A===c||A===p||A===_||Q||A===C||ae||V||re||typeof A=="object"&&A!==null&&(A.$$typeof===T||A.$$typeof===w||A.$$typeof===u||A.$$typeof===x||A.$$typeof===v||A.$$typeof===ie||A.getModuleId!==void 0))}function pe(A,Z,ce){var Te=A.displayName;if(Te)return Te;var Ye=Z.displayName||Z.name||"";return Ye!==""?ce+"("+Ye+")":ce}function Fe(A){return A.displayName||"Context"}function se(A){if(A==null)return null;if(typeof A.tag=="number"&&O("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof A=="function")return A.displayName||A.name||null;if(typeof A=="string")return A;switch(A){case o:return"Fragment";case i:return"Portal";case d:return"Profiler";case c:return"StrictMode";case p:return"Suspense";case _:return"SuspenseList"}if(typeof A=="object")switch(A.$$typeof){case x:var Z=A;return Fe(Z)+".Consumer";case u:var ce=A;return Fe(ce._context)+".Provider";case v:return pe(A,A.render,"ForwardRef");case w:var Te=A.displayName||null;return Te!==null?Te:se(A.type)||"Memo";case T:{var Ye=A,Oe=Ye._payload,Ie=Ye._init;try{return se(Ie(Oe))}catch{return null}}}return null}var ge=Object.assign,Ee=0,le,ne,Xe,Tt,Bt,Gt,bt;function At(){}At.__reactDisabledLog=!0;function Kt(){{if(Ee===0){le=console.log,ne=console.info,Xe=console.warn,Tt=console.error,Bt=console.group,Gt=console.groupCollapsed,bt=console.groupEnd;var A={configurable:!0,enumerable:!0,value:At,writable:!0};Object.defineProperties(console,{info:A,log:A,warn:A,error:A,group:A,groupCollapsed:A,groupEnd:A})}Ee++}}function On(){{if(Ee--,Ee===0){var A={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:ge({},A,{value:le}),info:ge({},A,{value:ne}),warn:ge({},A,{value:Xe}),error:ge({},A,{value:Tt}),group:ge({},A,{value:Bt}),groupCollapsed:ge({},A,{value:Gt}),groupEnd:ge({},A,{value:bt})})}Ee<0&&O("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var jn=H.ReactCurrentDispatcher,Hn;function kn(A,Z,ce){{if(Hn===void 0)try{throw Error()}catch(Ye){var Te=Ye.stack.trim().match(/\n( *(at )?)/);Hn=Te&&Te[1]||""}return`
`+Hn+A}}var Ut=!1,cn;{var bn=typeof WeakMap=="function"?WeakMap:Map;cn=new bn}function Gn(A,Z){if(!A||Ut)return"";{var ce=cn.get(A);if(ce!==void 0)return ce}var Te;Ut=!0;var Ye=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Oe;Oe=jn.current,jn.current=null,Kt();try{if(Z){var Ie=function(){throw Error()};if(Object.defineProperty(Ie.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Ie,[])}catch(dn){Te=dn}Reflect.construct(A,[],Ie)}else{try{Ie.call()}catch(dn){Te=dn}A.call(Ie.prototype)}}else{try{throw Error()}catch(dn){Te=dn}A()}}catch(dn){if(dn&&Te&&typeof dn.stack=="string"){for(var Ue=dn.stack.split(`
`),Dt=Te.stack.split(`
`),He=Ue.length-1,Nt=Dt.length-1;He>=1&&Nt>=0&&Ue[He]!==Dt[Nt];)Nt--;for(;He>=1&&Nt>=0;He--,Nt--)if(Ue[He]!==Dt[Nt]){if(He!==1||Nt!==1)do if(He--,Nt--,Nt<0||Ue[He]!==Dt[Nt]){var Pn=`
`+Ue[He].replace(" at new "," at ");return A.displayName&&Pn.includes("<anonymous>")&&(Pn=Pn.replace("<anonymous>",A.displayName)),typeof A=="function"&&cn.set(A,Pn),Pn}while(He>=1&&Nt>=0);break}}}finally{Ut=!1,jn.current=Oe,On(),Error.prepareStackTrace=Ye}var jr=A?A.displayName||A.name:"",Hr=jr?kn(jr):"";return typeof A=="function"&&cn.set(A,Hr),Hr}function Mt(A,Z,ce){return Gn(A,!1)}function fn(A){var Z=A.prototype;return!!(Z&&Z.isReactComponent)}function Wt(A,Z,ce){if(A==null)return"";if(typeof A=="function")return Gn(A,fn(A));if(typeof A=="string")return kn(A);switch(A){case p:return kn("Suspense");case _:return kn("SuspenseList")}if(typeof A=="object")switch(A.$$typeof){case v:return Mt(A.render);case w:return Wt(A.type,Z,ce);case T:{var Te=A,Ye=Te._payload,Oe=Te._init;try{return Wt(Oe(Ye),Z,ce)}catch{}}}return""}var Pt=Object.prototype.hasOwnProperty,Zt={},ur=H.ReactDebugCurrentFrame;function Cr(A){if(A){var Z=A._owner,ce=Wt(A.type,A._source,Z?Z.type:null);ur.setExtraStackFrame(ce)}else ur.setExtraStackFrame(null)}function er(A,Z,ce,Te,Ye){{var Oe=Function.call.bind(Pt);for(var Ie in A)if(Oe(A,Ie)){var Ue=void 0;try{if(typeof A[Ie]!="function"){var Dt=Error((Te||"React class")+": "+ce+" type `"+Ie+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof A[Ie]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw Dt.name="Invariant Violation",Dt}Ue=A[Ie](Z,Ie,Te,ce,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(He){Ue=He}Ue&&!(Ue instanceof Error)&&(Cr(Ye),O("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",Te||"React class",ce,Ie,typeof Ue),Cr(null)),Ue instanceof Error&&!(Ue.message in Zt)&&(Zt[Ue.message]=!0,Cr(Ye),O("Failed %s type: %s",ce,Ue.message),Cr(null))}}}var Ur=Array.isArray;function wr(A){return Ur(A)}function Wn(A){{var Z=typeof Symbol=="function"&&Symbol.toStringTag,ce=Z&&A[Symbol.toStringTag]||A.constructor.name||"Object";return ce}}function Tr(A){try{return Mn(A),!1}catch{return!0}}function Mn(A){return""+A}function cr(A){if(Tr(A))return O("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Wn(A)),Mn(A)}var Vt=H.ReactCurrentOwner,Nr={key:!0,ref:!0,__self:!0,__source:!0},wi,Ti,ue;ue={};function Se(A){if(Pt.call(A,"ref")){var Z=Object.getOwnPropertyDescriptor(A,"ref").get;if(Z&&Z.isReactWarning)return!1}return A.ref!==void 0}function je(A){if(Pt.call(A,"key")){var Z=Object.getOwnPropertyDescriptor(A,"key").get;if(Z&&Z.isReactWarning)return!1}return A.key!==void 0}function lt(A,Z){if(typeof A.ref=="string"&&Vt.current&&Z&&Vt.current.stateNode!==Z){var ce=se(Vt.current.type);ue[ce]||(O('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',se(Vt.current.type),A.ref),ue[ce]=!0)}}function ut(A,Z){{var ce=function(){wi||(wi=!0,O("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",Z))};ce.isReactWarning=!0,Object.defineProperty(A,"key",{get:ce,configurable:!0})}}function Jt(A,Z){{var ce=function(){Ti||(Ti=!0,O("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",Z))};ce.isReactWarning=!0,Object.defineProperty(A,"ref",{get:ce,configurable:!0})}}var It=function(A,Z,ce,Te,Ye,Oe,Ie){var Ue={$$typeof:l,type:A,key:Z,ref:ce,props:Ie,_owner:Oe};return Ue._store={},Object.defineProperty(Ue._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Ue,"_self",{configurable:!1,enumerable:!1,writable:!1,value:Te}),Object.defineProperty(Ue,"_source",{configurable:!1,enumerable:!1,writable:!1,value:Ye}),Object.freeze&&(Object.freeze(Ue.props),Object.freeze(Ue)),Ue};function tr(A,Z,ce,Te,Ye){{var Oe,Ie={},Ue=null,Dt=null;ce!==void 0&&(cr(ce),Ue=""+ce),je(Z)&&(cr(Z.key),Ue=""+Z.key),Se(Z)&&(Dt=Z.ref,lt(Z,Ye));for(Oe in Z)Pt.call(Z,Oe)&&!Nr.hasOwnProperty(Oe)&&(Ie[Oe]=Z[Oe]);if(A&&A.defaultProps){var He=A.defaultProps;for(Oe in He)Ie[Oe]===void 0&&(Ie[Oe]=He[Oe])}if(Ue||Dt){var Nt=typeof A=="function"?A.displayName||A.name||"Unknown":A;Ue&&ut(Ie,Nt),Dt&&Jt(Ie,Nt)}return It(A,Ue,Dt,Ye,Te,Vt.current,Ie)}}var mt=H.ReactCurrentOwner,fr=H.ReactDebugCurrentFrame;function Rt(A){if(A){var Z=A._owner,ce=Wt(A.type,A._source,Z?Z.type:null);fr.setExtraStackFrame(ce)}else fr.setExtraStackFrame(null)}var _t;_t=!1;function oi(A){return typeof A=="object"&&A!==null&&A.$$typeof===l}function Vr(){{if(mt.current){var A=se(mt.current.type);if(A)return`

Check the render method of \``+A+"`."}return""}}function Ba(A){{if(A!==void 0){var Z=A.fileName.replace(/^.*[\\\/]/,""),ce=A.lineNumber;return`

Check your code at `+Z+":"+ce+"."}return""}}var Co={};function ks(A){{var Z=Vr();if(!Z){var ce=typeof A=="string"?A:A.displayName||A.name;ce&&(Z=`

Check the top-level render call using <`+ce+">.")}return Z}}function Ua(A,Z){{if(!A._store||A._store.validated||A.key!=null)return;A._store.validated=!0;var ce=ks(Z);if(Co[ce])return;Co[ce]=!0;var Te="";A&&A._owner&&A._owner!==mt.current&&(Te=" It was passed a child from "+se(A._owner.type)+"."),Rt(A),O('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',ce,Te),Rt(null)}}function Va(A,Z){{if(typeof A!="object")return;if(wr(A))for(var ce=0;ce<A.length;ce++){var Te=A[ce];oi(Te)&&Ua(Te,Z)}else if(oi(A))A._store&&(A._store.validated=!0);else if(A){var Ye=Y(A);if(typeof Ye=="function"&&Ye!==A.entries)for(var Oe=Ye.call(A),Ie;!(Ie=Oe.next()).done;)oi(Ie.value)&&Ua(Ie.value,Z)}}}function Ni(A){{var Z=A.type;if(Z==null||typeof Z=="string")return;var ce;if(typeof Z=="function")ce=Z.propTypes;else if(typeof Z=="object"&&(Z.$$typeof===v||Z.$$typeof===w))ce=Z.propTypes;else return;if(ce){var Te=se(Z);er(ce,A.props,"prop",Te,A)}else if(Z.PropTypes!==void 0&&!_t){_t=!0;var Ye=se(Z);O("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",Ye||"Unknown")}typeof Z.getDefaultProps=="function"&&!Z.getDefaultProps.isReactClassApproved&&O("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function na(A){{for(var Z=Object.keys(A.props),ce=0;ce<Z.length;ce++){var Te=Z[ce];if(Te!=="children"&&Te!=="key"){Rt(A),O("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",Te),Rt(null);break}}A.ref!==null&&(Rt(A),O("Invalid attribute `ref` supplied to `React.Fragment`."),Rt(null))}}var Ai={};function si(A,Z,ce,Te,Ye,Oe){{var Ie=K(A);if(!Ie){var Ue="";(A===void 0||typeof A=="object"&&A!==null&&Object.keys(A).length===0)&&(Ue+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var Dt=Ba(Ye);Dt?Ue+=Dt:Ue+=Vr();var He;A===null?He="null":wr(A)?He="array":A!==void 0&&A.$$typeof===l?(He="<"+(se(A.type)||"Unknown")+" />",Ue=" Did you accidentally export a JSX literal instead of a component?"):He=typeof A,O("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",He,Ue)}var Nt=tr(A,Z,ce,Ye,Oe);if(Nt==null)return Nt;if(Ie){var Pn=Z.children;if(Pn!==void 0)if(Te)if(wr(Pn)){for(var jr=0;jr<Pn.length;jr++)Va(Pn[jr],A);Object.freeze&&Object.freeze(Pn)}else O("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Va(Pn,A)}if(Pt.call(Z,"key")){var Hr=se(A),dn=Object.keys(Z).filter(function(Ms){return Ms!=="key"}),Ia=dn.length>0?"{key: someKey, "+dn.join(": ..., ")+": ...}":"{key: someKey}";if(!Ai[Hr+Ia]){var wo=dn.length>0?"{"+dn.join(": ..., ")+": ...}":"{}";O(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,Ia,Hr,wo,Hr),Ai[Hr+Ia]=!0}}return A===o?na(Nt):Ni(Nt),Nt}}var Ir=si;Rv.Fragment=o,Rv.jsxDEV=Ir})();hE.exports=Rv;var E=hE.exports,_v={},pE={exports:{}},Rr={},vE={exports:{}},gE={};(function(h){/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var l=!1,i=!1,o=5;function c(ue,Se){var je=ue.length;ue.push(Se),x(ue,Se,je)}function d(ue){return ue.length===0?null:ue[0]}function u(ue){if(ue.length===0)return null;var Se=ue[0],je=ue.pop();return je!==Se&&(ue[0]=je,v(ue,je,0)),Se}function x(ue,Se,je){for(var lt=je;lt>0;){var ut=lt-1>>>1,Jt=ue[ut];if(p(Jt,Se)>0)ue[ut]=Se,ue[lt]=Jt,lt=ut;else return}}function v(ue,Se,je){for(var lt=je,ut=ue.length,Jt=ut>>>1;lt<Jt;){var It=(lt+1)*2-1,tr=ue[It],mt=It+1,fr=ue[mt];if(p(tr,Se)<0)mt<ut&&p(fr,tr)<0?(ue[lt]=fr,ue[mt]=Se,lt=mt):(ue[lt]=tr,ue[It]=Se,lt=It);else if(mt<ut&&p(fr,Se)<0)ue[lt]=fr,ue[mt]=Se,lt=mt;else return}}function p(ue,Se){var je=ue.sortIndex-Se.sortIndex;return je!==0?je:ue.id-Se.id}var _=1,w=2,T=3,C=4,M=5;function G(ue,Se){}var Y=typeof performance=="object"&&typeof performance.now=="function";if(Y){var H=performance;h.unstable_now=function(){return H.now()}}else{var O=Date,$=O.now();h.unstable_now=function(){return O.now()-$}}var ae=1073741823,V=-1,re=250,Q=5e3,xe=1e4,ie=ae,K=[],pe=[],Fe=1,se=null,ge=T,Ee=!1,le=!1,ne=!1,Xe=typeof setTimeout=="function"?setTimeout:null,Tt=typeof clearTimeout=="function"?clearTimeout:null,Bt=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Gt(ue){for(var Se=d(pe);Se!==null;){if(Se.callback===null)u(pe);else if(Se.startTime<=ue)u(pe),Se.sortIndex=Se.expirationTime,c(K,Se);else return;Se=d(pe)}}function bt(ue){if(ne=!1,Gt(ue),!le)if(d(K)!==null)le=!0,cr(At);else{var Se=d(pe);Se!==null&&Vt(bt,Se.startTime-ue)}}function At(ue,Se){le=!1,ne&&(ne=!1,Nr()),Ee=!0;var je=ge;try{var lt;if(!i)return Kt(ue,Se)}finally{se=null,ge=je,Ee=!1}}function Kt(ue,Se){var je=Se;for(Gt(je),se=d(K);se!==null&&!l&&!(se.expirationTime>je&&(!ue||Cr()));){var lt=se.callback;if(typeof lt=="function"){se.callback=null,ge=se.priorityLevel;var ut=se.expirationTime<=je,Jt=lt(ut);je=h.unstable_now(),typeof Jt=="function"?se.callback=Jt:se===d(K)&&u(K),Gt(je)}else u(K);se=d(K)}if(se!==null)return!0;var It=d(pe);return It!==null&&Vt(bt,It.startTime-je),!1}function On(ue,Se){switch(ue){case _:case w:case T:case C:case M:break;default:ue=T}var je=ge;ge=ue;try{return Se()}finally{ge=je}}function jn(ue){var Se;switch(ge){case _:case w:case T:Se=T;break;default:Se=ge;break}var je=ge;ge=Se;try{return ue()}finally{ge=je}}function Hn(ue){var Se=ge;return function(){var je=ge;ge=Se;try{return ue.apply(this,arguments)}finally{ge=je}}}function kn(ue,Se,je){var lt=h.unstable_now(),ut;if(typeof je=="object"&&je!==null){var Jt=je.delay;typeof Jt=="number"&&Jt>0?ut=lt+Jt:ut=lt}else ut=lt;var It;switch(ue){case _:It=V;break;case w:It=re;break;case M:It=ie;break;case C:It=xe;break;case T:default:It=Q;break}var tr=ut+It,mt={id:Fe++,callback:Se,priorityLevel:ue,startTime:ut,expirationTime:tr,sortIndex:-1};return ut>lt?(mt.sortIndex=ut,c(pe,mt),d(K)===null&&mt===d(pe)&&(ne?Nr():ne=!0,Vt(bt,ut-lt))):(mt.sortIndex=tr,c(K,mt),!le&&!Ee&&(le=!0,cr(At))),mt}function Ut(){}function cn(){!le&&!Ee&&(le=!0,cr(At))}function bn(){return d(K)}function Gn(ue){ue.callback=null}function Mt(){return ge}var fn=!1,Wt=null,Pt=-1,Zt=o,ur=-1;function Cr(){var ue=h.unstable_now()-ur;return!(ue<Zt)}function er(){}function Ur(ue){if(ue<0||ue>125){console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}ue>0?Zt=Math.floor(1e3/ue):Zt=o}var wr=function(){if(Wt!==null){var ue=h.unstable_now();ur=ue;var Se=!0,je=!0;try{je=Wt(Se,ue)}finally{je?Wn():(fn=!1,Wt=null)}}else fn=!1},Wn;if(typeof Bt=="function")Wn=function(){Bt(wr)};else if(typeof MessageChannel<"u"){var Tr=new MessageChannel,Mn=Tr.port2;Tr.port1.onmessage=wr,Wn=function(){Mn.postMessage(null)}}else Wn=function(){Xe(wr,0)};function cr(ue){Wt=ue,fn||(fn=!0,Wn())}function Vt(ue,Se){Pt=Xe(function(){ue(h.unstable_now())},Se)}function Nr(){Tt(Pt),Pt=-1}var wi=er,Ti=null;h.unstable_IdlePriority=M,h.unstable_ImmediatePriority=_,h.unstable_LowPriority=C,h.unstable_NormalPriority=T,h.unstable_Profiling=Ti,h.unstable_UserBlockingPriority=w,h.unstable_cancelCallback=Gn,h.unstable_continueExecution=cn,h.unstable_forceFrameRate=Ur,h.unstable_getCurrentPriorityLevel=Mt,h.unstable_getFirstCallbackNode=bn,h.unstable_next=jn,h.unstable_pauseExecution=Ut,h.unstable_requestPaint=wi,h.unstable_runWithPriority=On,h.unstable_scheduleCallback=kn,h.unstable_shouldYield=Cr,h.unstable_wrapCallback=Hn,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()})(gE);vE.exports=gE;var sD=vE.exports;/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var h=X,l=sD,i=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,o=!1;function c(e){o=e}function d(e){if(!o){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];x("warn",e,n)}}function u(e){if(!o){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];x("error",e,n)}}function x(e,t,n){{var r=i.ReactDebugCurrentFrame,a=r.getStackAddendum();a!==""&&(t+="%s",n=n.concat([a]));var s=n.map(function(f){return String(f)});s.unshift("Warning: "+t),Function.prototype.apply.call(console[e],console,s)}}var v=0,p=1,_=2,w=3,T=4,C=5,M=6,G=7,Y=8,H=9,O=10,$=11,ae=12,V=13,re=14,Q=15,xe=16,ie=17,K=18,pe=19,Fe=21,se=22,ge=23,Ee=24,le=25,ne=!0,Xe=!1,Tt=!1,Bt=!1,Gt=!1,bt=!0,At=!1,Kt=!0,On=!0,jn=!0,Hn=!0,kn=new Set,Ut={},cn={};function bn(e,t){Gn(e,t),Gn(e+"Capture",t)}function Gn(e,t){Ut[e]&&u("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",e),Ut[e]=t;{var n=e.toLowerCase();cn[n]=e,e==="onDoubleClick"&&(cn.ondblclick=e)}for(var r=0;r<t.length;r++)kn.add(t[r])}var Mt=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",fn=Object.prototype.hasOwnProperty;function Wt(e){{var t=typeof Symbol=="function"&&Symbol.toStringTag,n=t&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n}}function Pt(e){try{return Zt(e),!1}catch{return!0}}function Zt(e){return""+e}function ur(e,t){if(Pt(e))return u("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.",t,Wt(e)),Zt(e)}function Cr(e){if(Pt(e))return u("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Wt(e)),Zt(e)}function er(e,t){if(Pt(e))return u("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.",t,Wt(e)),Zt(e)}function Ur(e,t){if(Pt(e))return u("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.",t,Wt(e)),Zt(e)}function wr(e){if(Pt(e))return u("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.",Wt(e)),Zt(e)}function Wn(e){if(Pt(e))return u("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.",Wt(e)),Zt(e)}var Tr=0,Mn=1,cr=2,Vt=3,Nr=4,wi=5,Ti=6,ue=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",Se=ue+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",je=new RegExp("^["+ue+"]["+Se+"]*$"),lt={},ut={};function Jt(e){return fn.call(ut,e)?!0:fn.call(lt,e)?!1:je.test(e)?(ut[e]=!0,!0):(lt[e]=!0,u("Invalid attribute name: `%s`",e),!1)}function It(e,t,n){return t!==null?t.type===Tr:n?!1:e.length>2&&(e[0]==="o"||e[0]==="O")&&(e[1]==="n"||e[1]==="N")}function tr(e,t,n,r){if(n!==null&&n.type===Tr)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":{if(r)return!1;if(n!==null)return!n.acceptsBooleans;var a=e.toLowerCase().slice(0,5);return a!=="data-"&&a!=="aria-"}default:return!1}}function mt(e,t,n,r){if(t===null||typeof t>"u"||tr(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case Vt:return!t;case Nr:return t===!1;case wi:return isNaN(t);case Ti:return isNaN(t)||t<1}return!1}function fr(e){return _t.hasOwnProperty(e)?_t[e]:null}function Rt(e,t,n,r,a,s,f){this.acceptsBooleans=t===cr||t===Vt||t===Nr,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=f}var _t={},oi=["children","dangerouslySetInnerHTML","defaultValue","defaultChecked","innerHTML","suppressContentEditableWarning","suppressHydrationWarning","style"];oi.forEach(function(e){_t[e]=new Rt(e,Tr,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0],n=e[1];_t[t]=new Rt(t,Mn,!1,n,null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){_t[e]=new Rt(e,cr,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){_t[e]=new Rt(e,cr,!1,e,null,!1,!1)}),["allowFullScreen","async","autoFocus","autoPlay","controls","default","defer","disabled","disablePictureInPicture","disableRemotePlayback","formNoValidate","hidden","loop","noModule","noValidate","open","playsInline","readOnly","required","reversed","scoped","seamless","itemScope"].forEach(function(e){_t[e]=new Rt(e,Vt,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){_t[e]=new Rt(e,Vt,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){_t[e]=new Rt(e,Nr,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){_t[e]=new Rt(e,Ti,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){_t[e]=new Rt(e,wi,!1,e.toLowerCase(),null,!1,!1)});var Vr=/[\-\:]([a-z])/g,Ba=function(e){return e[1].toUpperCase()};["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","color-interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","glyph-orientation-horizontal","glyph-orientation-vertical","horiz-adv-x","horiz-origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","paint-order","panose-1","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","vector-effect","vert-adv-y","vert-origin-x","vert-origin-y","word-spacing","writing-mode","xmlns:xlink","x-height"].forEach(function(e){var t=e.replace(Vr,Ba);_t[t]=new Rt(t,Mn,!1,e,null,!1,!1)}),["xlink:actuate","xlink:arcrole","xlink:role","xlink:show","xlink:title","xlink:type"].forEach(function(e){var t=e.replace(Vr,Ba);_t[t]=new Rt(t,Mn,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Vr,Ba);_t[t]=new Rt(t,Mn,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){_t[e]=new Rt(e,Mn,!1,e.toLowerCase(),null,!1,!1)});var Co="xlinkHref";_t[Co]=new Rt("xlinkHref",Mn,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){_t[e]=new Rt(e,Mn,!1,e.toLowerCase(),null,!0,!0)});var ks=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i,Ua=!1;function Va(e){!Ua&&ks.test(e)&&(Ua=!0,u("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.",JSON.stringify(e)))}function Ni(e,t,n,r){if(r.mustUseProperty){var a=r.propertyName;return e[a]}else{ur(n,t),r.sanitizeURL&&Va(""+n);var s=r.attributeName,f=null;if(r.type===Nr){if(e.hasAttribute(s)){var m=e.getAttribute(s);return m===""?!0:mt(t,n,r,!1)?m:m===""+n?n:m}}else if(e.hasAttribute(s)){if(mt(t,n,r,!1))return e.getAttribute(s);if(r.type===Vt)return n;f=e.getAttribute(s)}return mt(t,n,r,!1)?f===null?n:f:f===""+n?n:f}}function na(e,t,n,r){{if(!Jt(t))return;if(!e.hasAttribute(t))return n===void 0?void 0:null;var a=e.getAttribute(t);return ur(n,t),a===""+n?n:a}}function Ai(e,t,n,r){var a=fr(t);if(!It(t,a,r)){if(mt(t,n,a,r)&&(n=null),r||a===null){if(Jt(t)){var s=t;n===null?e.removeAttribute(s):(ur(n,t),e.setAttribute(s,""+n))}return}var f=a.mustUseProperty;if(f){var m=a.propertyName;if(n===null){var g=a.type;e[m]=g===Vt?!1:""}else e[m]=n;return}var R=a.attributeName,S=a.attributeNamespace;if(n===null)e.removeAttribute(R);else{var k=a.type,D;k===Vt||k===Nr&&n===!0?D="":(ur(n,R),D=""+n,a.sanitizeURL&&Va(D.toString())),S?e.setAttributeNS(S,R,D):e.setAttribute(R,D)}}}var si=Symbol.for("react.element"),Ir=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),Z=Symbol.for("react.strict_mode"),ce=Symbol.for("react.profiler"),Te=Symbol.for("react.provider"),Ye=Symbol.for("react.context"),Oe=Symbol.for("react.forward_ref"),Ie=Symbol.for("react.suspense"),Ue=Symbol.for("react.suspense_list"),Dt=Symbol.for("react.memo"),He=Symbol.for("react.lazy"),Nt=Symbol.for("react.scope"),Pn=Symbol.for("react.debug_trace_mode"),jr=Symbol.for("react.offscreen"),Hr=Symbol.for("react.legacy_hidden"),dn=Symbol.for("react.cache"),Ia=Symbol.for("react.tracing_marker"),wo=Symbol.iterator,Ms="@@iterator";function Di(e){if(e===null||typeof e!="object")return null;var t=wo&&e[wo]||e[Ms];return typeof t=="function"?t:null}var We=Object.assign,ja=0,ra,Ps,Ls,zs,Fs,Bs,Us;function Vs(){}Vs.__reactDisabledLog=!0;function Mu(){{if(ja===0){ra=console.log,Ps=console.info,Ls=console.warn,zs=console.error,Fs=console.group,Bs=console.groupCollapsed,Us=console.groupEnd;var e={configurable:!0,enumerable:!0,value:Vs,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}ja++}}function cd(){{if(ja--,ja===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:We({},e,{value:ra}),info:We({},e,{value:Ps}),warn:We({},e,{value:Ls}),error:We({},e,{value:zs}),group:We({},e,{value:Fs}),groupCollapsed:We({},e,{value:Bs}),groupEnd:We({},e,{value:Us})})}ja<0&&u("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Is=i.ReactCurrentDispatcher,Ha;function Ar(e,t,n){{if(Ha===void 0)try{throw Error()}catch(a){var r=a.stack.trim().match(/\n( *(at )?)/);Ha=r&&r[1]||""}return`
`+Ha+e}}var ia=!1,aa;{var To=typeof WeakMap=="function"?WeakMap:Map;aa=new To}function js(e,t){if(!e||ia)return"";{var n=aa.get(e);if(n!==void 0)return n}var r;ia=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var s;s=Is.current,Is.current=null,Mu();try{if(t){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(B){r=B}Reflect.construct(e,[],f)}else{try{f.call()}catch(B){r=B}e.call(f.prototype)}}else{try{throw Error()}catch(B){r=B}e()}}catch(B){if(B&&r&&typeof B.stack=="string"){for(var m=B.stack.split(`
`),g=r.stack.split(`
`),R=m.length-1,S=g.length-1;R>=1&&S>=0&&m[R]!==g[S];)S--;for(;R>=1&&S>=0;R--,S--)if(m[R]!==g[S]){if(R!==1||S!==1)do if(R--,S--,S<0||m[R]!==g[S]){var k=`
`+m[R].replace(" at new "," at ");return e.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",e.displayName)),typeof e=="function"&&aa.set(e,k),k}while(R>=1&&S>=0);break}}}finally{ia=!1,Is.current=s,cd(),Error.prepareStackTrace=a}var D=e?e.displayName||e.name:"",z=D?Ar(D):"";return typeof e=="function"&&aa.set(e,z),z}function Pu(e,t,n){return js(e,!0)}function Hs(e,t,n){return js(e,!1)}function fd(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function oa(e,t,n){if(e==null)return"";if(typeof e=="function")return js(e,fd(e));if(typeof e=="string")return Ar(e);switch(e){case Ie:return Ar("Suspense");case Ue:return Ar("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case Oe:return Hs(e.render);case Dt:return oa(e.type,t,n);case He:{var r=e,a=r._payload,s=r._init;try{return oa(s(a),t,n)}catch{}}}return""}function Lu(e){switch(e._debugOwner&&e._debugOwner.type,e._debugSource,e.tag){case C:return Ar(e.type);case xe:return Ar("Lazy");case V:return Ar("Suspense");case pe:return Ar("SuspenseList");case v:case _:case Q:return Hs(e.type);case $:return Hs(e.type.render);case p:return Pu(e.type);default:return""}}function Gs(e){try{var t="",n=e;do t+=Lu(n),n=n.return;while(n);return t}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}function No(e,t,n){var r=e.displayName;if(r)return r;var a=t.displayName||t.name||"";return a!==""?n+"("+a+")":n}function zu(e){return e.displayName||"Context"}function Je(e){if(e==null)return null;if(typeof e.tag=="number"&&u("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case A:return"Fragment";case Ir:return"Portal";case ce:return"Profiler";case Z:return"StrictMode";case Ie:return"Suspense";case Ue:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ye:var t=e;return zu(t)+".Consumer";case Te:var n=e;return zu(n._context)+".Provider";case Oe:return No(e,e.render,"ForwardRef");case Dt:var r=e.displayName||null;return r!==null?r:Je(e.type)||"Memo";case He:{var a=e,s=a._payload,f=a._init;try{return Je(f(s))}catch{return null}}}return null}function Ws(e,t,n){var r=t.displayName||t.name||"";return e.displayName||(r!==""?n+"("+r+")":n)}function Xs(e){return e.displayName||"Context"}function Be(e){var t=e.tag,n=e.type;switch(t){case Ee:return"Cache";case H:var r=n;return Xs(r)+".Consumer";case O:var a=n;return Xs(a._context)+".Provider";case K:return"DehydratedFragment";case $:return Ws(n,n.render,"ForwardRef");case G:return"Fragment";case C:return n;case T:return"Portal";case w:return"Root";case M:return"Text";case xe:return Je(n);case Y:return n===Z?"StrictMode":"Mode";case se:return"Offscreen";case ae:return"Profiler";case Fe:return"Scope";case V:return"Suspense";case pe:return"SuspenseList";case le:return"TracingMarker";case p:case v:case ie:case _:case re:case Q:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;break}return null}var Fu=i.ReactDebugCurrentFrame,Ln=null,Ga=!1;function sa(){{if(Ln===null)return null;var e=Ln._debugOwner;if(e!==null&&typeof e<"u")return Be(e)}return null}function Bu(){return Ln===null?"":Gs(Ln)}function hn(){Fu.getCurrentStack=null,Ln=null,Ga=!1}function Ot(e){Fu.getCurrentStack=e===null?null:Bu,Ln=e,Ga=!1}function Uu(){return Ln}function dr(e){Ga=e}function nr(e){return""+e}function li(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return Wn(e),e;default:return""}}var dd={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0};function Ao(e,t){dd[t.type]||t.onChange||t.onInput||t.readOnly||t.disabled||t.value==null||u("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."),t.onChange||t.readOnly||t.disabled||t.checked==null||u("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")}function Wa(e){var t=e.type,n=e.nodeName;return n&&n.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Vu(e){return e._valueTracker}function la(e){e._valueTracker=null}function Iu(e){var t="";return e&&(Wa(e)?t=e.checked?"true":"false":t=e.value),t}function ju(e){var t=Wa(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);Wn(e[t]);var r=""+e[t];if(!(e.hasOwnProperty(t)||typeof n>"u"||typeof n.get!="function"||typeof n.set!="function")){var a=n.get,s=n.set;Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(m){Wn(m),r=""+m,s.call(this,m)}}),Object.defineProperty(e,t,{enumerable:n.enumerable});var f={getValue:function(){return r},setValue:function(m){Wn(m),r=""+m},stopTracking:function(){la(e),delete e[t]}};return f}}function Oi(e){Vu(e)||(e._valueTracker=ju(e))}function Do(e){if(!e)return!1;var t=Vu(e);if(!t)return!0;var n=t.getValue(),r=Iu(e);return r!==n?(t.setValue(r),!0):!1}function ua(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Oo=!1,Hu=!1,Gu=!1,Wu=!1;function Xu(e){var t=e.type==="checkbox"||e.type==="radio";return t?e.checked!=null:e.value!=null}function y(e,t){var n=e,r=t.checked,a=We({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??n._wrapperState.initialChecked});return a}function N(e,t){Ao("input",t),t.checked!==void 0&&t.defaultChecked!==void 0&&!Hu&&(u("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",sa()||"A component",t.type),Hu=!0),t.value!==void 0&&t.defaultValue!==void 0&&!Oo&&(u("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",sa()||"A component",t.type),Oo=!0);var n=e,r=t.defaultValue==null?"":t.defaultValue;n._wrapperState={initialChecked:t.checked!=null?t.checked:t.defaultChecked,initialValue:li(t.value!=null?t.value:r),controlled:Xu(t)}}function F(e,t){var n=e,r=t.checked;r!=null&&Ai(n,"checked",r,!1)}function U(e,t){var n=e;{var r=Xu(t);!n._wrapperState.controlled&&r&&!Wu&&(u("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),Wu=!0),n._wrapperState.controlled&&!r&&!Gu&&(u("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),Gu=!0)}F(e,t);var a=li(t.value),s=t.type;if(a!=null)s==="number"?(a===0&&n.value===""||n.value!=a)&&(n.value=nr(a)):n.value!==nr(a)&&(n.value=nr(a));else if(s==="submit"||s==="reset"){n.removeAttribute("value");return}t.hasOwnProperty("value")?ke(n,t.type,a):t.hasOwnProperty("defaultValue")&&ke(n,t.type,li(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(n.defaultChecked=!!t.defaultChecked)}function te(e,t,n){var r=e;if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type,s=a==="submit"||a==="reset";if(s&&(t.value===void 0||t.value===null))return;var f=nr(r._wrapperState.initialValue);n||f!==r.value&&(r.value=f),r.defaultValue=f}var m=r.name;m!==""&&(r.name=""),r.defaultChecked=!r.defaultChecked,r.defaultChecked=!!r._wrapperState.initialChecked,m!==""&&(r.name=m)}function Ae(e,t){var n=e;U(n,t),Re(n,t)}function Re(e,t){var n=t.name;if(t.type==="radio"&&n!=null){for(var r=e;r.parentNode;)r=r.parentNode;ur(n,"name");for(var a=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),s=0;s<a.length;s++){var f=a[s];if(!(f===e||f.form!==e.form)){var m=kc(f);if(!m)throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");Do(f),U(f,m)}}}}function ke(e,t,n){(t!=="number"||ua(e.ownerDocument)!==e)&&(n==null?e.defaultValue=nr(e._wrapperState.initialValue):e.defaultValue!==nr(n)&&(e.defaultValue=nr(n)))}var $e=!1,ct=!1,pt=!1;function vt(e,t){t.value==null&&(typeof t.children=="object"&&t.children!==null?h.Children.forEach(t.children,function(n){n!=null&&(typeof n=="string"||typeof n=="number"||ct||(ct=!0,u("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")))}):t.dangerouslySetInnerHTML!=null&&(pt||(pt=!0,u("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))),t.selected!=null&&!$e&&(u("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."),$e=!0)}function St(e,t){t.value!=null&&e.setAttribute("value",nr(li(t.value)))}var Lt=Array.isArray;function nt(e){return Lt(e)}var ca;ca=!1;function ko(){var e=sa();return e?`

Check the render method of \``+e+"`.":""}var Ys=["value","defaultValue"];function hd(e){{Ao("select",e);for(var t=0;t<Ys.length;t++){var n=Ys[t];if(e[n]!=null){var r=nt(e[n]);e.multiple&&!r?u("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",n,ko()):!e.multiple&&r&&u("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",n,ko())}}}}function ki(e,t,n,r){var a=e.options;if(t){for(var s=n,f={},m=0;m<s.length;m++)f["$"+s[m]]=!0;for(var g=0;g<a.length;g++){var R=f.hasOwnProperty("$"+a[g].value);a[g].selected!==R&&(a[g].selected=R),R&&r&&(a[g].defaultSelected=!0)}}else{for(var S=nr(li(n)),k=null,D=0;D<a.length;D++){if(a[D].value===S){a[D].selected=!0,r&&(a[D].defaultSelected=!0);return}k===null&&!a[D].disabled&&(k=a[D])}k!==null&&(k.selected=!0)}}function $s(e,t){return We({},t,{value:void 0})}function qs(e,t){var n=e;hd(t),n._wrapperState={wasMultiple:!!t.multiple},t.value!==void 0&&t.defaultValue!==void 0&&!ca&&(u("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"),ca=!0)}function md(e,t){var n=e;n.multiple=!!t.multiple;var r=t.value;r!=null?ki(n,!!t.multiple,r,!1):t.defaultValue!=null&&ki(n,!!t.multiple,t.defaultValue,!0)}function IE(e,t){var n=e,r=n._wrapperState.wasMultiple;n._wrapperState.wasMultiple=!!t.multiple;var a=t.value;a!=null?ki(n,!!t.multiple,a,!1):r!==!!t.multiple&&(t.defaultValue!=null?ki(n,!!t.multiple,t.defaultValue,!0):ki(n,!!t.multiple,t.multiple?[]:"",!1))}function jE(e,t){var n=e,r=t.value;r!=null&&ki(n,!!t.multiple,r,!1)}var Uv=!1;function pd(e,t){var n=e;if(t.dangerouslySetInnerHTML!=null)throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");var r=We({},t,{value:void 0,defaultValue:void 0,children:nr(n._wrapperState.initialValue)});return r}function Vv(e,t){var n=e;Ao("textarea",t),t.value!==void 0&&t.defaultValue!==void 0&&!Uv&&(u("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components",sa()||"A component"),Uv=!0);var r=t.value;if(r==null){var a=t.children,s=t.defaultValue;if(a!=null){u("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");{if(s!=null)throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");if(nt(a)){if(a.length>1)throw new Error("<textarea> can only have at most one child.");a=a[0]}s=a}}s==null&&(s=""),r=s}n._wrapperState={initialValue:li(r)}}function Iv(e,t){var n=e,r=li(t.value),a=li(t.defaultValue);if(r!=null){var s=nr(r);s!==n.value&&(n.value=s),t.defaultValue==null&&n.defaultValue!==s&&(n.defaultValue=s)}a!=null&&(n.defaultValue=nr(a))}function jv(e,t){var n=e,r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function HE(e,t){Iv(e,t)}var Mi="http://www.w3.org/1999/xhtml",GE="http://www.w3.org/1998/Math/MathML",vd="http://www.w3.org/2000/svg";function gd(e){switch(e){case"svg":return vd;case"math":return GE;default:return Mi}}function yd(e,t){return e==null||e===Mi?gd(t):e===vd&&t==="foreignObject"?Mi:e}var WE=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e},Yu,Hv=WE(function(e,t){if(e.namespaceURI===vd&&!("innerHTML"in e)){Yu=Yu||document.createElement("div"),Yu.innerHTML="<svg>"+t.valueOf().toString()+"</svg>";for(var n=Yu.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild);return}e.innerHTML=t}),rr=1,Pi=3,Xt=8,Li=9,xd=11,$u=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===Pi){n.nodeValue=t;return}}e.textContent=t},XE={animation:["animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationTimingFunction"],background:["backgroundAttachment","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize"],backgroundPosition:["backgroundPositionX","backgroundPositionY"],border:["borderBottomColor","borderBottomStyle","borderBottomWidth","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRightColor","borderRightStyle","borderRightWidth","borderTopColor","borderTopStyle","borderTopWidth"],borderBlockEnd:["borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth"],borderBlockStart:["borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth"],borderBottom:["borderBottomColor","borderBottomStyle","borderBottomWidth"],borderColor:["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"],borderImage:["borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth"],borderInlineEnd:["borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth"],borderInlineStart:["borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth"],borderLeft:["borderLeftColor","borderLeftStyle","borderLeftWidth"],borderRadius:["borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"],borderRight:["borderRightColor","borderRightStyle","borderRightWidth"],borderStyle:["borderBottomStyle","borderLeftStyle","borderRightStyle","borderTopStyle"],borderTop:["borderTopColor","borderTopStyle","borderTopWidth"],borderWidth:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],columnRule:["columnRuleColor","columnRuleStyle","columnRuleWidth"],columns:["columnCount","columnWidth"],flex:["flexBasis","flexGrow","flexShrink"],flexFlow:["flexDirection","flexWrap"],font:["fontFamily","fontFeatureSettings","fontKerning","fontLanguageOverride","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition","fontWeight","lineHeight"],fontVariant:["fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition"],gap:["columnGap","rowGap"],grid:["gridAutoColumns","gridAutoFlow","gridAutoRows","gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],gridArea:["gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart"],gridColumn:["gridColumnEnd","gridColumnStart"],gridColumnGap:["columnGap"],gridGap:["columnGap","rowGap"],gridRow:["gridRowEnd","gridRowStart"],gridRowGap:["rowGap"],gridTemplate:["gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],listStyle:["listStyleImage","listStylePosition","listStyleType"],margin:["marginBottom","marginLeft","marginRight","marginTop"],marker:["markerEnd","markerMid","markerStart"],mask:["maskClip","maskComposite","maskImage","maskMode","maskOrigin","maskPositionX","maskPositionY","maskRepeat","maskSize"],maskPosition:["maskPositionX","maskPositionY"],outline:["outlineColor","outlineStyle","outlineWidth"],overflow:["overflowX","overflowY"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"],placeContent:["alignContent","justifyContent"],placeItems:["alignItems","justifyItems"],placeSelf:["alignSelf","justifySelf"],textDecoration:["textDecorationColor","textDecorationLine","textDecorationStyle"],textEmphasis:["textEmphasisColor","textEmphasisStyle"],transition:["transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction"],wordWrap:["overflowWrap"]},Qs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};function YE(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}var $E=["Webkit","ms","Moz","O"];Object.keys(Qs).forEach(function(e){$E.forEach(function(t){Qs[YE(t,e)]=Qs[e]})});function bd(e,t,n){var r=t==null||typeof t=="boolean"||t==="";return r?"":!n&&typeof t=="number"&&t!==0&&!(Qs.hasOwnProperty(e)&&Qs[e])?t+"px":(Ur(t,e),(""+t).trim())}var qE=/([A-Z])/g,QE=/^ms-/;function KE(e){return e.replace(qE,"-$1").toLowerCase().replace(QE,"-ms-")}var Gv=function(){};{var ZE=/^(?:webkit|moz|o)[A-Z]/,JE=/^-ms-/,eR=/-(.)/g,Wv=/;\s*$/,Mo={},Ed={},Xv=!1,Yv=!1,tR=function(e){return e.replace(eR,function(t,n){return n.toUpperCase()})},nR=function(e){Mo.hasOwnProperty(e)&&Mo[e]||(Mo[e]=!0,u("Unsupported style property %s. Did you mean %s?",e,tR(e.replace(JE,"ms-"))))},rR=function(e){Mo.hasOwnProperty(e)&&Mo[e]||(Mo[e]=!0,u("Unsupported vendor-prefixed style property %s. Did you mean %s?",e,e.charAt(0).toUpperCase()+e.slice(1)))},iR=function(e,t){Ed.hasOwnProperty(t)&&Ed[t]||(Ed[t]=!0,u(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,e,t.replace(Wv,"")))},aR=function(e,t){Xv||(Xv=!0,u("`NaN` is an invalid value for the `%s` css style property.",e))},oR=function(e,t){Yv||(Yv=!0,u("`Infinity` is an invalid value for the `%s` css style property.",e))};Gv=function(e,t){e.indexOf("-")>-1?nR(e):ZE.test(e)?rR(e):Wv.test(t)&&iR(e,t),typeof t=="number"&&(isNaN(t)?aR(e,t):isFinite(t)||oR(e,t))}}var sR=Gv;function lR(e){{var t="",n="";for(var r in e)if(e.hasOwnProperty(r)){var a=e[r];if(a!=null){var s=r.indexOf("--")===0;t+=n+(s?r:KE(r))+":",t+=bd(r,a,s),n=";"}}return t||null}}function $v(e,t){var n=e.style;for(var r in t)if(t.hasOwnProperty(r)){var a=r.indexOf("--")===0;a||sR(r,t[r]);var s=bd(r,t[r],a);r==="float"&&(r="cssFloat"),a?n.setProperty(r,s):n[r]=s}}function uR(e){return e==null||typeof e=="boolean"||e===""}function qv(e){var t={};for(var n in e)for(var r=XE[n]||[n],a=0;a<r.length;a++)t[r[a]]=n;return t}function cR(e,t){{if(!t)return;var n=qv(e),r=qv(t),a={};for(var s in n){var f=n[s],m=r[s];if(m&&f!==m){var g=f+","+m;if(a[g])continue;a[g]=!0,u("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",uR(e[f])?"Removing":"Updating",f,m)}}}}var fR={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},dR=We({menuitem:!0},fR),hR="__html";function Rd(e,t){if(t){if(dR[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw new Error(e+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");if(typeof t.dangerouslySetInnerHTML!="object"||!(hR in t.dangerouslySetInnerHTML))throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.")}if(!t.suppressContentEditableWarning&&t.contentEditable&&t.children!=null&&u("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."),t.style!=null&&typeof t.style!="object")throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.")}}function Xa(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qu={accept:"accept",acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",alt:"alt",as:"as",async:"async",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",challenge:"challenge",charset:"charSet",checked:"checked",children:"children",cite:"cite",class:"className",classid:"classID",classname:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlslist:"controlsList",coords:"coords",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",data:"data",datetime:"dateTime",default:"default",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",defer:"defer",dir:"dir",disabled:"disabled",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",download:"download",draggable:"draggable",enctype:"encType",enterkeyhint:"enterKeyHint",for:"htmlFor",form:"form",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",icon:"icon",id:"id",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",innerhtml:"innerHTML",inputmode:"inputMode",integrity:"integrity",is:"is",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginwidth:"marginWidth",marginheight:"marginHeight",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nomodule:"noModule",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",about:"about",accentheight:"accentHeight","accent-height":"accentHeight",accumulate:"accumulate",additive:"additive",alignmentbaseline:"alignmentBaseline","alignment-baseline":"alignmentBaseline",allowreorder:"allowReorder",alphabetic:"alphabetic",amplitude:"amplitude",arabicform:"arabicForm","arabic-form":"arabicForm",ascent:"ascent",attributename:"attributeName",attributetype:"attributeType",autoreverse:"autoReverse",azimuth:"azimuth",basefrequency:"baseFrequency",baselineshift:"baselineShift","baseline-shift":"baselineShift",baseprofile:"baseProfile",bbox:"bbox",begin:"begin",bias:"bias",by:"by",calcmode:"calcMode",capheight:"capHeight","cap-height":"capHeight",clip:"clip",clippath:"clipPath","clip-path":"clipPath",clippathunits:"clipPathUnits",cliprule:"clipRule","clip-rule":"clipRule",color:"color",colorinterpolation:"colorInterpolation","color-interpolation":"colorInterpolation",colorinterpolationfilters:"colorInterpolationFilters","color-interpolation-filters":"colorInterpolationFilters",colorprofile:"colorProfile","color-profile":"colorProfile",colorrendering:"colorRendering","color-rendering":"colorRendering",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",cursor:"cursor",cx:"cx",cy:"cy",d:"d",datatype:"datatype",decelerate:"decelerate",descent:"descent",diffuseconstant:"diffuseConstant",direction:"direction",display:"display",divisor:"divisor",dominantbaseline:"dominantBaseline","dominant-baseline":"dominantBaseline",dur:"dur",dx:"dx",dy:"dy",edgemode:"edgeMode",elevation:"elevation",enablebackground:"enableBackground","enable-background":"enableBackground",end:"end",exponent:"exponent",externalresourcesrequired:"externalResourcesRequired",fill:"fill",fillopacity:"fillOpacity","fill-opacity":"fillOpacity",fillrule:"fillRule","fill-rule":"fillRule",filter:"filter",filterres:"filterRes",filterunits:"filterUnits",floodopacity:"floodOpacity","flood-opacity":"floodOpacity",floodcolor:"floodColor","flood-color":"floodColor",focusable:"focusable",fontfamily:"fontFamily","font-family":"fontFamily",fontsize:"fontSize","font-size":"fontSize",fontsizeadjust:"fontSizeAdjust","font-size-adjust":"fontSizeAdjust",fontstretch:"fontStretch","font-stretch":"fontStretch",fontstyle:"fontStyle","font-style":"fontStyle",fontvariant:"fontVariant","font-variant":"fontVariant",fontweight:"fontWeight","font-weight":"fontWeight",format:"format",from:"from",fx:"fx",fy:"fy",g1:"g1",g2:"g2",glyphname:"glyphName","glyph-name":"glyphName",glyphorientationhorizontal:"glyphOrientationHorizontal","glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphorientationvertical:"glyphOrientationVertical","glyph-orientation-vertical":"glyphOrientationVertical",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",hanging:"hanging",horizadvx:"horizAdvX","horiz-adv-x":"horizAdvX",horizoriginx:"horizOriginX","horiz-origin-x":"horizOriginX",ideographic:"ideographic",imagerendering:"imageRendering","image-rendering":"imageRendering",in2:"in2",in:"in",inlist:"inlist",intercept:"intercept",k1:"k1",k2:"k2",k3:"k3",k4:"k4",k:"k",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",kerning:"kerning",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",letterspacing:"letterSpacing","letter-spacing":"letterSpacing",lightingcolor:"lightingColor","lighting-color":"lightingColor",limitingconeangle:"limitingConeAngle",local:"local",markerend:"markerEnd","marker-end":"markerEnd",markerheight:"markerHeight",markermid:"markerMid","marker-mid":"markerMid",markerstart:"markerStart","marker-start":"markerStart",markerunits:"markerUnits",markerwidth:"markerWidth",mask:"mask",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",mathematical:"mathematical",mode:"mode",numoctaves:"numOctaves",offset:"offset",opacity:"opacity",operator:"operator",order:"order",orient:"orient",orientation:"orientation",origin:"origin",overflow:"overflow",overlineposition:"overlinePosition","overline-position":"overlinePosition",overlinethickness:"overlineThickness","overline-thickness":"overlineThickness",paintorder:"paintOrder","paint-order":"paintOrder",panose1:"panose1","panose-1":"panose1",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointerevents:"pointerEvents","pointer-events":"pointerEvents",points:"points",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",prefix:"prefix",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",property:"property",r:"r",radius:"radius",refx:"refX",refy:"refY",renderingintent:"renderingIntent","rendering-intent":"renderingIntent",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",resource:"resource",restart:"restart",result:"result",results:"results",rotate:"rotate",rx:"rx",ry:"ry",scale:"scale",security:"security",seed:"seed",shaperendering:"shapeRendering","shape-rendering":"shapeRendering",slope:"slope",spacing:"spacing",specularconstant:"specularConstant",specularexponent:"specularExponent",speed:"speed",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stemh:"stemh",stemv:"stemv",stitchtiles:"stitchTiles",stopcolor:"stopColor","stop-color":"stopColor",stopopacity:"stopOpacity","stop-opacity":"stopOpacity",strikethroughposition:"strikethroughPosition","strikethrough-position":"strikethroughPosition",strikethroughthickness:"strikethroughThickness","strikethrough-thickness":"strikethroughThickness",string:"string",stroke:"stroke",strokedasharray:"strokeDasharray","stroke-dasharray":"strokeDasharray",strokedashoffset:"strokeDashoffset","stroke-dashoffset":"strokeDashoffset",strokelinecap:"strokeLinecap","stroke-linecap":"strokeLinecap",strokelinejoin:"strokeLinejoin","stroke-linejoin":"strokeLinejoin",strokemiterlimit:"strokeMiterlimit","stroke-miterlimit":"strokeMiterlimit",strokewidth:"strokeWidth","stroke-width":"strokeWidth",strokeopacity:"strokeOpacity","stroke-opacity":"strokeOpacity",suppresscontenteditablewarning:"suppressContentEditableWarning",suppresshydrationwarning:"suppressHydrationWarning",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textanchor:"textAnchor","text-anchor":"textAnchor",textdecoration:"textDecoration","text-decoration":"textDecoration",textlength:"textLength",textrendering:"textRendering","text-rendering":"textRendering",to:"to",transform:"transform",typeof:"typeof",u1:"u1",u2:"u2",underlineposition:"underlinePosition","underline-position":"underlinePosition",underlinethickness:"underlineThickness","underline-thickness":"underlineThickness",unicode:"unicode",unicodebidi:"unicodeBidi","unicode-bidi":"unicodeBidi",unicoderange:"unicodeRange","unicode-range":"unicodeRange",unitsperem:"unitsPerEm","units-per-em":"unitsPerEm",unselectable:"unselectable",valphabetic:"vAlphabetic","v-alphabetic":"vAlphabetic",values:"values",vectoreffect:"vectorEffect","vector-effect":"vectorEffect",version:"version",vertadvy:"vertAdvY","vert-adv-y":"vertAdvY",vertoriginx:"vertOriginX","vert-origin-x":"vertOriginX",vertoriginy:"vertOriginY","vert-origin-y":"vertOriginY",vhanging:"vHanging","v-hanging":"vHanging",videographic:"vIdeographic","v-ideographic":"vIdeographic",viewbox:"viewBox",viewtarget:"viewTarget",visibility:"visibility",vmathematical:"vMathematical","v-mathematical":"vMathematical",vocab:"vocab",widths:"widths",wordspacing:"wordSpacing","word-spacing":"wordSpacing",writingmode:"writingMode","writing-mode":"writingMode",x1:"x1",x2:"x2",x:"x",xchannelselector:"xChannelSelector",xheight:"xHeight","x-height":"xHeight",xlinkactuate:"xlinkActuate","xlink:actuate":"xlinkActuate",xlinkarcrole:"xlinkArcrole","xlink:arcrole":"xlinkArcrole",xlinkhref:"xlinkHref","xlink:href":"xlinkHref",xlinkrole:"xlinkRole","xlink:role":"xlinkRole",xlinkshow:"xlinkShow","xlink:show":"xlinkShow",xlinktitle:"xlinkTitle","xlink:title":"xlinkTitle",xlinktype:"xlinkType","xlink:type":"xlinkType",xmlbase:"xmlBase","xml:base":"xmlBase",xmllang:"xmlLang","xml:lang":"xmlLang",xmlns:"xmlns","xml:space":"xmlSpace",xmlnsxlink:"xmlnsXlink","xmlns:xlink":"xmlnsXlink",xmlspace:"xmlSpace",y1:"y1",y2:"y2",y:"y",ychannelselector:"yChannelSelector",z:"z",zoomandpan:"zoomAndPan"},Qv={"aria-current":0,"aria-description":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},Po={},mR=new RegExp("^(aria)-["+Se+"]*$"),pR=new RegExp("^(aria)[A-Z]["+Se+"]*$");function vR(e,t){{if(fn.call(Po,t)&&Po[t])return!0;if(pR.test(t)){var n="aria-"+t.slice(4).toLowerCase(),r=Qv.hasOwnProperty(n)?n:null;if(r==null)return u("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",t),Po[t]=!0,!0;if(t!==r)return u("Invalid ARIA attribute `%s`. Did you mean `%s`?",t,r),Po[t]=!0,!0}if(mR.test(t)){var a=t.toLowerCase(),s=Qv.hasOwnProperty(a)?a:null;if(s==null)return Po[t]=!0,!1;if(t!==s)return u("Unknown ARIA attribute `%s`. Did you mean `%s`?",t,s),Po[t]=!0,!0}}return!0}function gR(e,t){{var n=[];for(var r in t){var a=vR(e,r);a||n.push(r)}var s=n.map(function(f){return"`"+f+"`"}).join(", ");n.length===1?u("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",s,e):n.length>1&&u("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",s,e)}}function yR(e,t){Xa(e,t)||gR(e,t)}var Kv=!1;function xR(e,t){{if(e!=="input"&&e!=="textarea"&&e!=="select")return;t!=null&&t.value===null&&!Kv&&(Kv=!0,e==="select"&&t.multiple?u("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",e):u("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",e))}}var Zv=function(){};{var Xn={},Jv=/^on./,bR=/^on[^A-Z]/,ER=new RegExp("^(aria)-["+Se+"]*$"),RR=new RegExp("^(aria)[A-Z]["+Se+"]*$");Zv=function(e,t,n,r){if(fn.call(Xn,t)&&Xn[t])return!0;var a=t.toLowerCase();if(a==="onfocusin"||a==="onfocusout")return u("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),Xn[t]=!0,!0;if(r!=null){var s=r.registrationNameDependencies,f=r.possibleRegistrationNames;if(s.hasOwnProperty(t))return!0;var m=f.hasOwnProperty(a)?f[a]:null;if(m!=null)return u("Invalid event handler property `%s`. Did you mean `%s`?",t,m),Xn[t]=!0,!0;if(Jv.test(t))return u("Unknown event handler property `%s`. It will be ignored.",t),Xn[t]=!0,!0}else if(Jv.test(t))return bR.test(t)&&u("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",t),Xn[t]=!0,!0;if(ER.test(t)||RR.test(t))return!0;if(a==="innerhtml")return u("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),Xn[t]=!0,!0;if(a==="aria")return u("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."),Xn[t]=!0,!0;if(a==="is"&&n!==null&&n!==void 0&&typeof n!="string")return u("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",typeof n),Xn[t]=!0,!0;if(typeof n=="number"&&isNaN(n))return u("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",t),Xn[t]=!0,!0;var g=fr(t),R=g!==null&&g.type===Tr;if(qu.hasOwnProperty(a)){var S=qu[a];if(S!==t)return u("Invalid DOM property `%s`. Did you mean `%s`?",t,S),Xn[t]=!0,!0}else if(!R&&t!==a)return u("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",t,a),Xn[t]=!0,!0;return typeof n=="boolean"&&tr(t,n,g,!1)?(n?u('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',n,t,t,n,t):u('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',n,t,t,n,t,t,t),Xn[t]=!0,!0):R?!0:tr(t,n,g,!1)?(Xn[t]=!0,!1):((n==="false"||n==="true")&&g!==null&&g.type===Vt&&(u("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",n,t,n==="false"?"The browser will interpret it as a truthy value.":'Although this works, it will not work as expected if you pass the string "false".',t,n),Xn[t]=!0),!0)}}var _R=function(e,t,n){{var r=[];for(var a in t){var s=Zv(e,a,t[a],n);s||r.push(a)}var f=r.map(function(m){return"`"+m+"`"}).join(", ");r.length===1?u("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",f,e):r.length>1&&u("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",f,e)}};function SR(e,t,n){Xa(e,t)||_R(e,t,n)}var eg=1,_d=2,Ks=4,CR=eg|_d|Ks,Zs=null;function wR(e){Zs!==null&&u("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."),Zs=e}function TR(){Zs===null&&u("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."),Zs=null}function NR(e){return e===Zs}function Sd(e){var t=e.target||e.srcElement||window;return t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===Pi?t.parentNode:t}var Cd=null,Lo=null,zo=null;function tg(e){var t=ya(e);if(t){if(typeof Cd!="function")throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");var n=t.stateNode;if(n){var r=kc(n);Cd(t.stateNode,t.type,r)}}}function AR(e){Cd=e}function ng(e){Lo?zo?zo.push(e):zo=[e]:Lo=e}function DR(){return Lo!==null||zo!==null}function rg(){if(Lo){var e=Lo,t=zo;if(Lo=null,zo=null,tg(e),t)for(var n=0;n<t.length;n++)tg(t[n])}}var ig=function(e,t){return e(t)},ag=function(){},wd=!1;function OR(){var e=DR();e&&(ag(),rg())}function og(e,t,n){if(wd)return e(t,n);wd=!0;try{return ig(e,t,n)}finally{wd=!1,OR()}}function kR(e,t,n){ig=e,ag=n}function MR(e){return e==="button"||e==="input"||e==="select"||e==="textarea"}function PR(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":return!!(n.disabled&&MR(t));default:return!1}}function Js(e,t){var n=e.stateNode;if(n===null)return null;var r=kc(n);if(r===null)return null;var a=r[t];if(PR(t,e.type,r))return null;if(a&&typeof a!="function")throw new Error("Expected `"+t+"` listener to be a function, instead got a value of `"+typeof a+"` type.");return a}var Td=!1;if(Mt)try{var el={};Object.defineProperty(el,"passive",{get:function(){Td=!0}}),window.addEventListener("test",el,el),window.removeEventListener("test",el,el)}catch{Td=!1}function sg(e,t,n,r,a,s,f,m,g){var R=Array.prototype.slice.call(arguments,3);try{t.apply(n,R)}catch(S){this.onError(S)}}var lg=sg;if(typeof window<"u"&&typeof window.dispatchEvent=="function"&&typeof document<"u"&&typeof document.createEvent=="function"){var Nd=document.createElement("react");lg=function(t,n,r,a,s,f,m,g,R){if(typeof document>"u"||document===null)throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var S=document.createEvent("Event"),k=!1,D=!0,z=window.event,B=Object.getOwnPropertyDescriptor(window,"event");function I(){Nd.removeEventListener(j,Ce,!1),typeof window.event<"u"&&window.hasOwnProperty("event")&&(window.event=z)}var fe=Array.prototype.slice.call(arguments,3);function Ce(){k=!0,I(),n.apply(r,fe),D=!1}var _e,Ke=!1,Ge=!1;function P(L){if(_e=L.error,Ke=!0,_e===null&&L.colno===0&&L.lineno===0&&(Ge=!0),L.defaultPrevented&&_e!=null&&typeof _e=="object")try{_e._suppressLogging=!0}catch{}}var j="react-"+(t||"invokeguardedcallback");if(window.addEventListener("error",P),Nd.addEventListener(j,Ce,!1),S.initEvent(j,!1,!1),Nd.dispatchEvent(S),B&&Object.defineProperty(window,"event",B),k&&D&&(Ke?Ge&&(_e=new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):_e=new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`),this.onError(_e)),window.removeEventListener("error",P),!k)return I(),sg.apply(this,arguments)}}var LR=lg,Fo=!1,Qu=null,Ku=!1,Ad=null,zR={onError:function(e){Fo=!0,Qu=e}};function Dd(e,t,n,r,a,s,f,m,g){Fo=!1,Qu=null,LR.apply(zR,arguments)}function FR(e,t,n,r,a,s,f,m,g){if(Dd.apply(this,arguments),Fo){var R=Od();Ku||(Ku=!0,Ad=R)}}function BR(){if(Ku){var e=Ad;throw Ku=!1,Ad=null,e}}function UR(){return Fo}function Od(){if(Fo){var e=Qu;return Fo=!1,Qu=null,e}else throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}function Bo(e){return e._reactInternals}function VR(e){return e._reactInternals!==void 0}function IR(e,t){e._reactInternals=t}var Ne=0,Uo=1,Yt=2,Ze=4,Ya=16,tl=32,kd=64,rt=128,zi=256,fa=512,$a=1024,Gr=2048,Fi=4096,qa=8192,Zu=16384,jR=Gr|Ze|kd|fa|$a|Zu,HR=32767,nl=32768,Yn=65536,Md=131072,ug=1048576,Pd=2097152,Qa=4194304,Ld=8388608,Bi=16777216,Ju=33554432,zd=Ze|$a|0,Fd=Yt|Ze|Ya|tl|fa|Fi|qa,rl=Ze|kd|fa|qa,Vo=Gr|Ya,Ui=Qa|Ld|Pd,GR=i.ReactCurrentOwner;function Ka(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{var r=t;do t=r,(t.flags&(Yt|Fi))!==Ne&&(n=t.return),r=t.return;while(r)}return t.tag===w?n:null}function cg(e){if(e.tag===V){var t=e.memoizedState;if(t===null){var n=e.alternate;n!==null&&(t=n.memoizedState)}if(t!==null)return t.dehydrated}return null}function fg(e){return e.tag===w?e.stateNode.containerInfo:null}function WR(e){return Ka(e)===e}function XR(e){{var t=GR.current;if(t!==null&&t.tag===p){var n=t,r=n.stateNode;r._warnedAboutRefsInRender||u("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",Be(n)||"A component"),r._warnedAboutRefsInRender=!0}}var a=Bo(e);return a?Ka(a)===a:!1}function dg(e){if(Ka(e)!==e)throw new Error("Unable to find node on an unmounted component.")}function hg(e){var t=e.alternate;if(!t){var n=Ka(e);if(n===null)throw new Error("Unable to find node on an unmounted component.");return n!==e?null:e}for(var r=e,a=t;;){var s=r.return;if(s===null)break;var f=s.alternate;if(f===null){var m=s.return;if(m!==null){r=a=m;continue}break}if(s.child===f.child){for(var g=s.child;g;){if(g===r)return dg(s),e;if(g===a)return dg(s),t;g=g.sibling}throw new Error("Unable to find node on an unmounted component.")}if(r.return!==a.return)r=s,a=f;else{for(var R=!1,S=s.child;S;){if(S===r){R=!0,r=s,a=f;break}if(S===a){R=!0,a=s,r=f;break}S=S.sibling}if(!R){for(S=f.child;S;){if(S===r){R=!0,r=f,a=s;break}if(S===a){R=!0,a=f,r=s;break}S=S.sibling}if(!R)throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(r.alternate!==a)throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(r.tag!==w)throw new Error("Unable to find node on an unmounted component.");return r.stateNode.current===r?e:t}function mg(e){var t=hg(e);return t!==null?pg(t):null}function pg(e){if(e.tag===C||e.tag===M)return e;for(var t=e.child;t!==null;){var n=pg(t);if(n!==null)return n;t=t.sibling}return null}function YR(e){var t=hg(e);return t!==null?vg(t):null}function vg(e){if(e.tag===C||e.tag===M)return e;for(var t=e.child;t!==null;){if(t.tag!==T){var n=vg(t);if(n!==null)return n}t=t.sibling}return null}var gg=l.unstable_scheduleCallback,$R=l.unstable_cancelCallback,qR=l.unstable_shouldYield,QR=l.unstable_requestPaint,mn=l.unstable_now,KR=l.unstable_getCurrentPriorityLevel,ec=l.unstable_ImmediatePriority,Bd=l.unstable_UserBlockingPriority,Za=l.unstable_NormalPriority,ZR=l.unstable_LowPriority,Ud=l.unstable_IdlePriority,JR=l.unstable_yieldValue,e1=l.unstable_setDisableYieldValue,Io=null,zn=null,he=null,ui=!1,Wr=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u";function t1(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return u("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{On&&(e=We({},e,{getLaneLabelMap:s1,injectProfilingHooks:o1})),Io=t.inject(e),zn=t}catch(n){u("React instrumentation encountered an error: %s.",n)}return!!t.checkDCE}function n1(e,t){if(zn&&typeof zn.onScheduleFiberRoot=="function")try{zn.onScheduleFiberRoot(Io,e,t)}catch(n){ui||(ui=!0,u("React instrumentation encountered an error: %s",n))}}function r1(e,t){if(zn&&typeof zn.onCommitFiberRoot=="function")try{var n=(e.current.flags&rt)===rt;if(jn){var r;switch(t){case pr:r=ec;break;case Ii:r=Bd;break;case ji:r=Za;break;case sc:r=Ud;break;default:r=Za;break}zn.onCommitFiberRoot(Io,e,r,n)}}catch(a){ui||(ui=!0,u("React instrumentation encountered an error: %s",a))}}function i1(e){if(zn&&typeof zn.onPostCommitFiberRoot=="function")try{zn.onPostCommitFiberRoot(Io,e)}catch(t){ui||(ui=!0,u("React instrumentation encountered an error: %s",t))}}function a1(e){if(zn&&typeof zn.onCommitFiberUnmount=="function")try{zn.onCommitFiberUnmount(Io,e)}catch(t){ui||(ui=!0,u("React instrumentation encountered an error: %s",t))}}function pn(e){if(typeof JR=="function"&&(e1(e),c(e)),zn&&typeof zn.setStrictMode=="function")try{zn.setStrictMode(Io,e)}catch(t){ui||(ui=!0,u("React instrumentation encountered an error: %s",t))}}function o1(e){he=e}function s1(){{for(var e=new Map,t=1,n=0;n<Id;n++){var r=T1(t);e.set(t,r),t*=2}return e}}function l1(e){he!==null&&typeof he.markCommitStarted=="function"&&he.markCommitStarted(e)}function yg(){he!==null&&typeof he.markCommitStopped=="function"&&he.markCommitStopped()}function il(e){he!==null&&typeof he.markComponentRenderStarted=="function"&&he.markComponentRenderStarted(e)}function jo(){he!==null&&typeof he.markComponentRenderStopped=="function"&&he.markComponentRenderStopped()}function u1(e){he!==null&&typeof he.markComponentPassiveEffectMountStarted=="function"&&he.markComponentPassiveEffectMountStarted(e)}function c1(){he!==null&&typeof he.markComponentPassiveEffectMountStopped=="function"&&he.markComponentPassiveEffectMountStopped()}function f1(e){he!==null&&typeof he.markComponentPassiveEffectUnmountStarted=="function"&&he.markComponentPassiveEffectUnmountStarted(e)}function d1(){he!==null&&typeof he.markComponentPassiveEffectUnmountStopped=="function"&&he.markComponentPassiveEffectUnmountStopped()}function h1(e){he!==null&&typeof he.markComponentLayoutEffectMountStarted=="function"&&he.markComponentLayoutEffectMountStarted(e)}function m1(){he!==null&&typeof he.markComponentLayoutEffectMountStopped=="function"&&he.markComponentLayoutEffectMountStopped()}function xg(e){he!==null&&typeof he.markComponentLayoutEffectUnmountStarted=="function"&&he.markComponentLayoutEffectUnmountStarted(e)}function bg(){he!==null&&typeof he.markComponentLayoutEffectUnmountStopped=="function"&&he.markComponentLayoutEffectUnmountStopped()}function p1(e,t,n){he!==null&&typeof he.markComponentErrored=="function"&&he.markComponentErrored(e,t,n)}function v1(e,t,n){he!==null&&typeof he.markComponentSuspended=="function"&&he.markComponentSuspended(e,t,n)}function g1(e){he!==null&&typeof he.markLayoutEffectsStarted=="function"&&he.markLayoutEffectsStarted(e)}function y1(){he!==null&&typeof he.markLayoutEffectsStopped=="function"&&he.markLayoutEffectsStopped()}function x1(e){he!==null&&typeof he.markPassiveEffectsStarted=="function"&&he.markPassiveEffectsStarted(e)}function b1(){he!==null&&typeof he.markPassiveEffectsStopped=="function"&&he.markPassiveEffectsStopped()}function Eg(e){he!==null&&typeof he.markRenderStarted=="function"&&he.markRenderStarted(e)}function E1(){he!==null&&typeof he.markRenderYielded=="function"&&he.markRenderYielded()}function Rg(){he!==null&&typeof he.markRenderStopped=="function"&&he.markRenderStopped()}function R1(e){he!==null&&typeof he.markRenderScheduled=="function"&&he.markRenderScheduled(e)}function _1(e,t){he!==null&&typeof he.markForceUpdateScheduled=="function"&&he.markForceUpdateScheduled(e,t)}function Vd(e,t){he!==null&&typeof he.markStateUpdateScheduled=="function"&&he.markStateUpdateScheduled(e,t)}var we=0,qe=1,ft=2,zt=8,ci=16,_g=Math.clz32?Math.clz32:w1,S1=Math.log,C1=Math.LN2;function w1(e){var t=e>>>0;return t===0?32:31-(S1(t)/C1|0)|0}var Id=31,q=0,vn=0,Me=1,Ho=2,Vi=4,Ja=8,fi=16,al=32,Go=4194240,ol=64,jd=128,Hd=256,Gd=512,Wd=1024,Xd=2048,Yd=4096,$d=8192,qd=16384,Qd=32768,Kd=65536,Zd=131072,Jd=262144,eh=524288,th=1048576,nh=2097152,tc=130023424,Wo=4194304,rh=8388608,ih=16777216,ah=33554432,oh=67108864,Sg=Wo,sl=134217728,Cg=268435455,ll=268435456,eo=536870912,hr=1073741824;function T1(e){{if(e&Me)return"Sync";if(e&Ho)return"InputContinuousHydration";if(e&Vi)return"InputContinuous";if(e&Ja)return"DefaultHydration";if(e&fi)return"Default";if(e&al)return"TransitionHydration";if(e&Go)return"Transition";if(e&tc)return"Retry";if(e&sl)return"SelectiveHydration";if(e&ll)return"IdleHydration";if(e&eo)return"Idle";if(e&hr)return"Offscreen"}}var Et=-1,nc=ol,rc=Wo;function ul(e){switch(to(e)){case Me:return Me;case Ho:return Ho;case Vi:return Vi;case Ja:return Ja;case fi:return fi;case al:return al;case ol:case jd:case Hd:case Gd:case Wd:case Xd:case Yd:case $d:case qd:case Qd:case Kd:case Zd:case Jd:case eh:case th:case nh:return e&Go;case Wo:case rh:case ih:case ah:case oh:return e&tc;case sl:return sl;case ll:return ll;case eo:return eo;case hr:return hr;default:return u("Should have found matching lanes. This is a bug in React."),e}}function ic(e,t){var n=e.pendingLanes;if(n===q)return q;var r=q,a=e.suspendedLanes,s=e.pingedLanes,f=n&Cg;if(f!==q){var m=f&~a;if(m!==q)r=ul(m);else{var g=f&s;g!==q&&(r=ul(g))}}else{var R=n&~a;R!==q?r=ul(R):s!==q&&(r=ul(s))}if(r===q)return q;if(t!==q&&t!==r&&(t&a)===q){var S=to(r),k=to(t);if(S>=k||S===fi&&(k&Go)!==q)return t}(r&Vi)!==q&&(r|=n&fi);var D=e.entangledLanes;if(D!==q)for(var z=e.entanglements,B=r&D;B>0;){var I=no(B),fe=1<<I;r|=z[I],B&=~fe}return r}function N1(e,t){for(var n=e.eventTimes,r=Et;t>0;){var a=no(t),s=1<<a,f=n[a];f>r&&(r=f),t&=~s}return r}function A1(e,t){switch(e){case Me:case Ho:case Vi:return t+250;case Ja:case fi:case al:case ol:case jd:case Hd:case Gd:case Wd:case Xd:case Yd:case $d:case qd:case Qd:case Kd:case Zd:case Jd:case eh:case th:case nh:return t+5e3;case Wo:case rh:case ih:case ah:case oh:return Et;case sl:case ll:case eo:case hr:return Et;default:return u("Should have found matching lanes. This is a bug in React."),Et}}function D1(e,t){for(var n=e.pendingLanes,r=e.suspendedLanes,a=e.pingedLanes,s=e.expirationTimes,f=n;f>0;){var m=no(f),g=1<<m,R=s[m];R===Et?((g&r)===q||(g&a)!==q)&&(s[m]=A1(g,t)):R<=t&&(e.expiredLanes|=g),f&=~g}}function O1(e){return ul(e.pendingLanes)}function sh(e){var t=e.pendingLanes&~hr;return t!==q?t:t&hr?hr:q}function k1(e){return(e&Me)!==q}function lh(e){return(e&Cg)!==q}function wg(e){return(e&tc)===e}function M1(e){var t=Me|Vi|fi;return(e&t)===q}function P1(e){return(e&Go)===e}function ac(e,t){var n=Ho|Vi|Ja|fi;return(t&n)!==q}function L1(e,t){return(t&e.expiredLanes)!==q}function Tg(e){return(e&Go)!==q}function Ng(){var e=nc;return nc<<=1,(nc&Go)===q&&(nc=ol),e}function z1(){var e=rc;return rc<<=1,(rc&tc)===q&&(rc=Wo),e}function to(e){return e&-e}function cl(e){return to(e)}function no(e){return 31-_g(e)}function uh(e){return no(e)}function mr(e,t){return(e&t)!==q}function Xo(e,t){return(e&t)===t}function Ve(e,t){return e|t}function oc(e,t){return e&~t}function Ag(e,t){return e&t}function x3(e){return e}function F1(e,t){return e!==vn&&e<t?e:t}function ch(e){for(var t=[],n=0;n<Id;n++)t.push(e);return t}function fl(e,t,n){e.pendingLanes|=t,t!==eo&&(e.suspendedLanes=q,e.pingedLanes=q);var r=e.eventTimes,a=uh(t);r[a]=n}function B1(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,r=t;r>0;){var a=no(r),s=1<<a;n[a]=Et,r&=~s}}function Dg(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function U1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=q,e.pingedLanes=q,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var r=e.entanglements,a=e.eventTimes,s=e.expirationTimes,f=n;f>0;){var m=no(f),g=1<<m;r[m]=q,a[m]=Et,s[m]=Et,f&=~g}}function fh(e,t){for(var n=e.entangledLanes|=t,r=e.entanglements,a=n;a;){var s=no(a),f=1<<s;f&t|r[s]&t&&(r[s]|=t),a&=~f}}function V1(e,t){var n=to(t),r;switch(n){case Vi:r=Ho;break;case fi:r=Ja;break;case ol:case jd:case Hd:case Gd:case Wd:case Xd:case Yd:case $d:case qd:case Qd:case Kd:case Zd:case Jd:case eh:case th:case nh:case Wo:case rh:case ih:case ah:case oh:r=al;break;case eo:r=ll;break;default:r=vn;break}return(r&(e.suspendedLanes|t))!==vn?vn:r}function Og(e,t,n){if(Wr)for(var r=e.pendingUpdatersLaneMap;n>0;){var a=uh(n),s=1<<a,f=r[a];f.add(t),n&=~s}}function kg(e,t){if(Wr)for(var n=e.pendingUpdatersLaneMap,r=e.memoizedUpdaters;t>0;){var a=uh(t),s=1<<a,f=n[a];f.size>0&&(f.forEach(function(m){var g=m.alternate;(g===null||!r.has(g))&&r.add(m)}),f.clear()),t&=~s}}function Mg(e,t){return null}var pr=Me,Ii=Vi,ji=fi,sc=eo,dl=vn;function Xr(){return dl}function gn(e){dl=e}function I1(e,t){var n=dl;try{return dl=e,t()}finally{dl=n}}function j1(e,t){return e!==0&&e<t?e:t}function H1(e,t){return e>t?e:t}function dh(e,t){return e!==0&&e<t}function Pg(e){var t=to(e);return dh(pr,t)?dh(Ii,t)?lh(t)?ji:sc:Ii:pr}function lc(e){var t=e.current.memoizedState;return t.isDehydrated}var Lg;function G1(e){Lg=e}function W1(e){Lg(e)}var hh;function X1(e){hh=e}var zg;function Y1(e){zg=e}var Fg;function $1(e){Fg=e}var Bg;function q1(e){Bg=e}var mh=!1,uc=[],da=null,ha=null,ma=null,hl=new Map,ml=new Map,pa=[],Q1=["mousedown","mouseup","touchcancel","touchend","touchstart","auxclick","dblclick","pointercancel","pointerdown","pointerup","dragend","dragstart","drop","compositionend","compositionstart","keydown","keypress","keyup","input","textInput","copy","cut","paste","click","change","contextmenu","reset","submit"];function K1(e){return Q1.indexOf(e)>-1}function Z1(e,t,n,r,a){return{blockedOn:e,domEventName:t,eventSystemFlags:n,nativeEvent:a,targetContainers:[r]}}function Ug(e,t){switch(e){case"focusin":case"focusout":da=null;break;case"dragenter":case"dragleave":ha=null;break;case"mouseover":case"mouseout":ma=null;break;case"pointerover":case"pointerout":{var n=t.pointerId;hl.delete(n);break}case"gotpointercapture":case"lostpointercapture":{var r=t.pointerId;ml.delete(r);break}}}function pl(e,t,n,r,a,s){if(e===null||e.nativeEvent!==s){var f=Z1(t,n,r,a,s);if(t!==null){var m=ya(t);m!==null&&hh(m)}return f}e.eventSystemFlags|=r;var g=e.targetContainers;return a!==null&&g.indexOf(a)===-1&&g.push(a),e}function J1(e,t,n,r,a){switch(t){case"focusin":{var s=a;return da=pl(da,e,t,n,r,s),!0}case"dragenter":{var f=a;return ha=pl(ha,e,t,n,r,f),!0}case"mouseover":{var m=a;return ma=pl(ma,e,t,n,r,m),!0}case"pointerover":{var g=a,R=g.pointerId;return hl.set(R,pl(hl.get(R)||null,e,t,n,r,g)),!0}case"gotpointercapture":{var S=a,k=S.pointerId;return ml.set(k,pl(ml.get(k)||null,e,t,n,r,S)),!0}}return!1}function Vg(e){var t=ao(e.target);if(t!==null){var n=Ka(t);if(n!==null){var r=n.tag;if(r===V){var a=cg(n);if(a!==null){e.blockedOn=a,Bg(e.priority,function(){zg(n)});return}}else if(r===w){var s=n.stateNode;if(lc(s)){e.blockedOn=fg(n);return}}}}e.blockedOn=null}function e_(e){for(var t=Fg(),n={blockedOn:null,target:e,priority:t},r=0;r<pa.length&&dh(t,pa[r].priority);r++);pa.splice(r,0,n),r===0&&Vg(n)}function cc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;t.length>0;){var n=t[0],r=gh(e.domEventName,e.eventSystemFlags,n,e.nativeEvent);if(r===null){var a=e.nativeEvent,s=new a.constructor(a.type,a);wR(s),a.target.dispatchEvent(s),TR()}else{var f=ya(r);return f!==null&&hh(f),e.blockedOn=r,!1}t.shift()}return!0}function Ig(e,t,n){cc(e)&&n.delete(t)}function t_(){mh=!1,da!==null&&cc(da)&&(da=null),ha!==null&&cc(ha)&&(ha=null),ma!==null&&cc(ma)&&(ma=null),hl.forEach(Ig),ml.forEach(Ig)}function vl(e,t){e.blockedOn===t&&(e.blockedOn=null,mh||(mh=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,t_)))}function gl(e){if(uc.length>0){vl(uc[0],e);for(var t=1;t<uc.length;t++){var n=uc[t];n.blockedOn===e&&(n.blockedOn=null)}}da!==null&&vl(da,e),ha!==null&&vl(ha,e),ma!==null&&vl(ma,e);var r=function(m){return vl(m,e)};hl.forEach(r),ml.forEach(r);for(var a=0;a<pa.length;a++){var s=pa[a];s.blockedOn===e&&(s.blockedOn=null)}for(;pa.length>0;){var f=pa[0];if(f.blockedOn!==null)break;Vg(f),f.blockedOn===null&&pa.shift()}}var Yo=i.ReactCurrentBatchConfig,ph=!0;function jg(e){ph=!!e}function n_(){return ph}function r_(e,t,n){var r=Hg(t),a;switch(r){case pr:a=i_;break;case Ii:a=a_;break;case ji:default:a=vh;break}return a.bind(null,t,n,e)}function i_(e,t,n,r){var a=Xr(),s=Yo.transition;Yo.transition=null;try{gn(pr),vh(e,t,n,r)}finally{gn(a),Yo.transition=s}}function a_(e,t,n,r){var a=Xr(),s=Yo.transition;Yo.transition=null;try{gn(Ii),vh(e,t,n,r)}finally{gn(a),Yo.transition=s}}function vh(e,t,n,r){ph&&o_(e,t,n,r)}function o_(e,t,n,r){var a=gh(e,t,n,r);if(a===null){Oh(e,t,r,fc,n),Ug(e,r);return}if(J1(a,e,t,n,r)){r.stopPropagation();return}if(Ug(e,r),t&Ks&&K1(e)){for(;a!==null;){var s=ya(a);s!==null&&W1(s);var f=gh(e,t,n,r);if(f===null&&Oh(e,t,r,fc,n),f===a)break;a=f}a!==null&&r.stopPropagation();return}Oh(e,t,r,null,n)}var fc=null;function gh(e,t,n,r){fc=null;var a=Sd(r),s=ao(a);if(s!==null){var f=Ka(s);if(f===null)s=null;else{var m=f.tag;if(m===V){var g=cg(f);if(g!==null)return g;s=null}else if(m===w){var R=f.stateNode;if(lc(R))return fg(f);s=null}else f!==s&&(s=null)}}return fc=s,null}function Hg(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return pr;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return Ii;case"message":{var t=KR();switch(t){case ec:return pr;case Bd:return Ii;case Za:case ZR:return ji;case Ud:return sc;default:return ji}}default:return ji}}function s_(e,t,n){return e.addEventListener(t,n,!1),n}function l_(e,t,n){return e.addEventListener(t,n,!0),n}function u_(e,t,n,r){return e.addEventListener(t,n,{capture:!0,passive:r}),n}function c_(e,t,n,r){return e.addEventListener(t,n,{passive:r}),n}var yl=null,yh=null,xl=null;function f_(e){return yl=e,yh=Wg(),!0}function d_(){yl=null,yh=null,xl=null}function Gg(){if(xl)return xl;var e,t=yh,n=t.length,r,a=Wg(),s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var f=n-e;for(r=1;r<=f&&t[n-r]===a[s-r];r++);var m=r>1?1-r:void 0;return xl=a.slice(e,m),xl}function Wg(){return"value"in yl?yl.value:yl.textContent}function dc(e){var t,n=e.keyCode;return"charCode"in e?(t=e.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),t>=32||t===13?t:0}function hc(){return!0}function Xg(){return!1}function vr(e){function t(n,r,a,s,f){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=s,this.target=f,this.currentTarget=null;for(var m in e)if(e.hasOwnProperty(m)){var g=e[m];g?this[m]=g(s):this[m]=s[m]}var R=s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1;return R?this.isDefaultPrevented=hc:this.isDefaultPrevented=Xg,this.isPropagationStopped=Xg,this}return We(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=hc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=hc)},persist:function(){},isPersistent:hc}),t}var $o={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xh=vr($o),bl=We({},$o,{view:0,detail:0}),h_=vr(bl),bh,Eh,El;function m_(e){e!==El&&(El&&e.type==="mousemove"?(bh=e.screenX-El.screenX,Eh=e.screenY-El.screenY):(bh=0,Eh=0),El=e)}var mc=We({},bl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:_h,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(m_(e),bh)},movementY:function(e){return"movementY"in e?e.movementY:Eh}}),Yg=vr(mc),p_=We({},mc,{dataTransfer:0}),v_=vr(p_),g_=We({},bl,{relatedTarget:0}),Rh=vr(g_),y_=We({},$o,{animationName:0,elapsedTime:0,pseudoElement:0}),x_=vr(y_),b_=We({},$o,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),E_=vr(b_),R_=We({},$o,{data:0}),$g=vr(R_),__=$g,S_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},C_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function w_(e){if(e.key){var t=S_[e.key]||e.key;if(t!=="Unidentified")return t}if(e.type==="keypress"){var n=dc(e);return n===13?"Enter":String.fromCharCode(n)}return e.type==="keydown"||e.type==="keyup"?C_[e.keyCode]||"Unidentified":""}var T_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function N_(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);var r=T_[e];return r?!!n[r]:!1}function _h(e){return N_}var A_=We({},bl,{key:w_,code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:_h,charCode:function(e){return e.type==="keypress"?dc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?dc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),D_=vr(A_),O_=We({},mc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qg=vr(O_),k_=We({},bl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:_h}),M_=vr(k_),P_=We({},$o,{propertyName:0,elapsedTime:0,pseudoElement:0}),L_=vr(P_),z_=We({},mc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),F_=vr(z_),B_=[9,13,27,32],Qg=229,Sh=Mt&&"CompositionEvent"in window,Rl=null;Mt&&"documentMode"in document&&(Rl=document.documentMode);var U_=Mt&&"TextEvent"in window&&!Rl,Kg=Mt&&(!Sh||Rl&&Rl>8&&Rl<=11),Zg=32,Jg=String.fromCharCode(Zg);function V_(){bn("onBeforeInput",["compositionend","keypress","textInput","paste"]),bn("onCompositionEnd",["compositionend","focusout","keydown","keypress","keyup","mousedown"]),bn("onCompositionStart",["compositionstart","focusout","keydown","keypress","keyup","mousedown"]),bn("onCompositionUpdate",["compositionupdate","focusout","keydown","keypress","keyup","mousedown"])}var ey=!1;function I_(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function j_(e){switch(e){case"compositionstart":return"onCompositionStart";case"compositionend":return"onCompositionEnd";case"compositionupdate":return"onCompositionUpdate"}}function H_(e,t){return e==="keydown"&&t.keyCode===Qg}function ty(e,t){switch(e){case"keyup":return B_.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==Qg;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ny(e){var t=e.detail;return typeof t=="object"&&"data"in t?t.data:null}function ry(e){return e.locale==="ko"}var qo=!1;function G_(e,t,n,r,a){var s,f;if(Sh?s=j_(t):qo?ty(t,r)&&(s="onCompositionEnd"):H_(t,r)&&(s="onCompositionStart"),!s)return null;Kg&&!ry(r)&&(!qo&&s==="onCompositionStart"?qo=f_(a):s==="onCompositionEnd"&&qo&&(f=Gg()));var m=xc(n,s);if(m.length>0){var g=new $g(s,t,null,r,a);if(e.push({event:g,listeners:m}),f)g.data=f;else{var R=ny(r);R!==null&&(g.data=R)}}}function W_(e,t){switch(e){case"compositionend":return ny(t);case"keypress":var n=t.which;return n!==Zg?null:(ey=!0,Jg);case"textInput":var r=t.data;return r===Jg&&ey?null:r;default:return null}}function X_(e,t){if(qo){if(e==="compositionend"||!Sh&&ty(e,t)){var n=Gg();return d_(),qo=!1,n}return null}switch(e){case"paste":return null;case"keypress":if(!I_(t)){if(t.char&&t.char.length>1)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Kg&&!ry(t)?null:t.data;default:return null}}function Y_(e,t,n,r,a){var s;if(U_?s=W_(t,r):s=X_(t,r),!s)return null;var f=xc(n,"onBeforeInput");if(f.length>0){var m=new __("onBeforeInput","beforeinput",null,r,a);e.push({event:m,listeners:f}),m.data=s}}function $_(e,t,n,r,a,s,f){G_(e,t,n,r,a),Y_(e,t,n,r,a)}var q_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function iy(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!q_[e.type]:t==="textarea"}/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function Q_(e){if(!Mt)return!1;var t="on"+e,n=t in document;if(!n){var r=document.createElement("div");r.setAttribute(t,"return;"),n=typeof r[t]=="function"}return n}function K_(){bn("onChange",["change","click","focusin","focusout","input","keydown","keyup","selectionchange"])}function ay(e,t,n,r){ng(r);var a=xc(t,"onChange");if(a.length>0){var s=new xh("onChange","change",null,n,r);e.push({event:s,listeners:a})}}var _l=null,Sl=null;function Z_(e){var t=e.nodeName&&e.nodeName.toLowerCase();return t==="select"||t==="input"&&e.type==="file"}function J_(e){var t=[];ay(t,Sl,e,Sd(e)),og(eS,t)}function eS(e){_y(e,0)}function pc(e){var t=ts(e);if(Do(t))return e}function tS(e,t){if(e==="change")return t}var oy=!1;Mt&&(oy=Q_("input")&&(!document.documentMode||document.documentMode>9));function nS(e,t){_l=e,Sl=t,_l.attachEvent("onpropertychange",ly)}function sy(){_l&&(_l.detachEvent("onpropertychange",ly),_l=null,Sl=null)}function ly(e){e.propertyName==="value"&&pc(Sl)&&J_(e)}function rS(e,t,n){e==="focusin"?(sy(),nS(t,n)):e==="focusout"&&sy()}function iS(e,t){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pc(Sl)}function aS(e){var t=e.nodeName;return t&&t.toLowerCase()==="input"&&(e.type==="checkbox"||e.type==="radio")}function oS(e,t){if(e==="click")return pc(t)}function sS(e,t){if(e==="input"||e==="change")return pc(t)}function lS(e){var t=e._wrapperState;!t||!t.controlled||e.type!=="number"||ke(e,"number",e.value)}function uS(e,t,n,r,a,s,f){var m=n?ts(n):window,g,R;if(Z_(m)?g=tS:iy(m)?oy?g=sS:(g=iS,R=rS):aS(m)&&(g=oS),g){var S=g(t,n);if(S){ay(e,S,r,a);return}}R&&R(t,m,n),t==="focusout"&&lS(m)}function cS(){Gn("onMouseEnter",["mouseout","mouseover"]),Gn("onMouseLeave",["mouseout","mouseover"]),Gn("onPointerEnter",["pointerout","pointerover"]),Gn("onPointerLeave",["pointerout","pointerover"])}function fS(e,t,n,r,a,s,f){var m=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout";if(m&&!NR(r)){var R=r.relatedTarget||r.fromElement;if(R&&(ao(R)||Ul(R)))return}if(!(!g&&!m)){var S;if(a.window===a)S=a;else{var k=a.ownerDocument;k?S=k.defaultView||k.parentWindow:S=window}var D,z;if(g){var B=r.relatedTarget||r.toElement;if(D=n,z=B?ao(B):null,z!==null){var I=Ka(z);(z!==I||z.tag!==C&&z.tag!==M)&&(z=null)}}else D=null,z=n;if(D!==z){var fe=Yg,Ce="onMouseLeave",_e="onMouseEnter",Ke="mouse";(t==="pointerout"||t==="pointerover")&&(fe=qg,Ce="onPointerLeave",_e="onPointerEnter",Ke="pointer");var Ge=D==null?S:ts(D),P=z==null?S:ts(z),j=new fe(Ce,Ke+"leave",D,r,a);j.target=Ge,j.relatedTarget=P;var L=null,J=ao(a);if(J===n){var ve=new fe(_e,Ke+"enter",z,r,a);ve.target=P,ve.relatedTarget=Ge,L=ve}LS(e,j,L,D,z)}}}function dS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var gr=typeof Object.is=="function"?Object.is:dS;function Cl(e,t){if(gr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var a=0;a<n.length;a++){var s=n[a];if(!fn.call(t,s)||!gr(e[s],t[s]))return!1}return!0}function uy(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function hS(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}function cy(e,t){for(var n=uy(e),r=0,a=0;n;){if(n.nodeType===Pi){if(a=r+n.textContent.length,r<=t&&a>=t)return{node:n,offset:t-r};r=a}n=uy(hS(n))}}function mS(e){var t=e.ownerDocument,n=t&&t.defaultView||window,r=n.getSelection&&n.getSelection();if(!r||r.rangeCount===0)return null;var a=r.anchorNode,s=r.anchorOffset,f=r.focusNode,m=r.focusOffset;try{a.nodeType,f.nodeType}catch{return null}return pS(e,a,s,f,m)}function pS(e,t,n,r,a){var s=0,f=-1,m=-1,g=0,R=0,S=e,k=null;e:for(;;){for(var D=null;S===t&&(n===0||S.nodeType===Pi)&&(f=s+n),S===r&&(a===0||S.nodeType===Pi)&&(m=s+a),S.nodeType===Pi&&(s+=S.nodeValue.length),(D=S.firstChild)!==null;)k=S,S=D;for(;;){if(S===e)break e;if(k===t&&++g===n&&(f=s),k===r&&++R===a&&(m=s),(D=S.nextSibling)!==null)break;S=k,k=S.parentNode}S=D}return f===-1||m===-1?null:{start:f,end:m}}function vS(e,t){var n=e.ownerDocument||document,r=n&&n.defaultView||window;if(r.getSelection){var a=r.getSelection(),s=e.textContent.length,f=Math.min(t.start,s),m=t.end===void 0?f:Math.min(t.end,s);if(!a.extend&&f>m){var g=m;m=f,f=g}var R=cy(e,f),S=cy(e,m);if(R&&S){if(a.rangeCount===1&&a.anchorNode===R.node&&a.anchorOffset===R.offset&&a.focusNode===S.node&&a.focusOffset===S.offset)return;var k=n.createRange();k.setStart(R.node,R.offset),a.removeAllRanges(),f>m?(a.addRange(k),a.extend(S.node,S.offset)):(k.setEnd(S.node,S.offset),a.addRange(k))}}}function fy(e){return e&&e.nodeType===Pi}function dy(e,t){return!e||!t?!1:e===t?!0:fy(e)?!1:fy(t)?dy(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1}function gS(e){return e&&e.ownerDocument&&dy(e.ownerDocument.documentElement,e)}function yS(e){try{return typeof e.contentWindow.location.href=="string"}catch{return!1}}function hy(){for(var e=window,t=ua();t instanceof e.HTMLIFrameElement;){if(yS(t))e=t.contentWindow;else return t;t=ua(e.document)}return t}function Ch(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function xS(){var e=hy();return{focusedElem:e,selectionRange:Ch(e)?ES(e):null}}function bS(e){var t=hy(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&gS(n)){r!==null&&Ch(n)&&RS(n,r);for(var a=[],s=n;s=s.parentNode;)s.nodeType===rr&&a.push({element:s,left:s.scrollLeft,top:s.scrollTop});typeof n.focus=="function"&&n.focus();for(var f=0;f<a.length;f++){var m=a[f];m.element.scrollLeft=m.left,m.element.scrollTop=m.top}}}function ES(e){var t;return"selectionStart"in e?t={start:e.selectionStart,end:e.selectionEnd}:t=mS(e),t||{start:0,end:0}}function RS(e,t){var n=t.start,r=t.end;r===void 0&&(r=n),"selectionStart"in e?(e.selectionStart=n,e.selectionEnd=Math.min(r,e.value.length)):vS(e,t)}var _S=Mt&&"documentMode"in document&&document.documentMode<=11;function SS(){bn("onSelect",["focusout","contextmenu","dragend","focusin","keydown","keyup","mousedown","mouseup","selectionchange"])}var Qo=null,wh=null,wl=null,Th=!1;function CS(e){if("selectionStart"in e&&Ch(e))return{start:e.selectionStart,end:e.selectionEnd};var t=e.ownerDocument&&e.ownerDocument.defaultView||window,n=t.getSelection();return{anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}}function wS(e){return e.window===e?e.document:e.nodeType===Li?e:e.ownerDocument}function my(e,t,n){var r=wS(n);if(!(Th||Qo==null||Qo!==ua(r))){var a=CS(Qo);if(!wl||!Cl(wl,a)){wl=a;var s=xc(wh,"onSelect");if(s.length>0){var f=new xh("onSelect","select",null,t,n);e.push({event:f,listeners:s}),f.target=Qo}}}}function TS(e,t,n,r,a,s,f){var m=n?ts(n):window;switch(t){case"focusin":(iy(m)||m.contentEditable==="true")&&(Qo=m,wh=n,wl=null);break;case"focusout":Qo=null,wh=null,wl=null;break;case"mousedown":Th=!0;break;case"contextmenu":case"mouseup":case"dragend":Th=!1,my(e,r,a);break;case"selectionchange":if(_S)break;case"keydown":case"keyup":my(e,r,a)}}function vc(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ko={animationend:vc("Animation","AnimationEnd"),animationiteration:vc("Animation","AnimationIteration"),animationstart:vc("Animation","AnimationStart"),transitionend:vc("Transition","TransitionEnd")},Nh={},py={};Mt&&(py=document.createElement("div").style,"AnimationEvent"in window||(delete Ko.animationend.animation,delete Ko.animationiteration.animation,delete Ko.animationstart.animation),"TransitionEvent"in window||delete Ko.transitionend.transition);function gc(e){if(Nh[e])return Nh[e];if(!Ko[e])return e;var t=Ko[e];for(var n in t)if(t.hasOwnProperty(n)&&n in py)return Nh[e]=t[n];return e}var vy=gc("animationend"),gy=gc("animationiteration"),yy=gc("animationstart"),xy=gc("transitionend"),by=new Map,Ey=["abort","auxClick","cancel","canPlay","canPlayThrough","click","close","contextMenu","copy","cut","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","gotPointerCapture","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","lostPointerCapture","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","pointerCancel","pointerDown","pointerMove","pointerOut","pointerOver","pointerUp","progress","rateChange","reset","resize","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchStart","volumeChange","scroll","toggle","touchMove","waiting","wheel"];function va(e,t){by.set(e,t),bn(t,[e])}function NS(){for(var e=0;e<Ey.length;e++){var t=Ey[e],n=t.toLowerCase(),r=t[0].toUpperCase()+t.slice(1);va(n,"on"+r)}va(vy,"onAnimationEnd"),va(gy,"onAnimationIteration"),va(yy,"onAnimationStart"),va("dblclick","onDoubleClick"),va("focusin","onFocus"),va("focusout","onBlur"),va(xy,"onTransitionEnd")}function AS(e,t,n,r,a,s,f){var m=by.get(t);if(m!==void 0){var g=xh,R=t;switch(t){case"keypress":if(dc(r)===0)return;case"keydown":case"keyup":g=D_;break;case"focusin":R="focus",g=Rh;break;case"focusout":R="blur",g=Rh;break;case"beforeblur":case"afterblur":g=Rh;break;case"click":if(r.button===2)return;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Yg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=v_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=M_;break;case vy:case gy:case yy:g=x_;break;case xy:g=L_;break;case"scroll":g=h_;break;case"wheel":g=F_;break;case"copy":case"cut":case"paste":g=E_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=qg;break}var S=(s&Ks)!==0;{var k=!S&&t==="scroll",D=MS(n,m,r.type,S,k);if(D.length>0){var z=new g(m,R,null,r,a);e.push({event:z,listeners:D})}}}}NS(),cS(),K_(),SS(),V_();function DS(e,t,n,r,a,s,f){AS(e,t,n,r,a,s);var m=(s&CR)===0;m&&(fS(e,t,n,r,a),uS(e,t,n,r,a),TS(e,t,n,r,a),$_(e,t,n,r,a))}var Tl=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","resize","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],Ah=new Set(["cancel","close","invalid","load","scroll","toggle"].concat(Tl));function Ry(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,FR(r,t,void 0,e),e.currentTarget=null}function OS(e,t,n){var r;if(n)for(var a=t.length-1;a>=0;a--){var s=t[a],f=s.instance,m=s.currentTarget,g=s.listener;if(f!==r&&e.isPropagationStopped())return;Ry(e,g,m),r=f}else for(var R=0;R<t.length;R++){var S=t[R],k=S.instance,D=S.currentTarget,z=S.listener;if(k!==r&&e.isPropagationStopped())return;Ry(e,z,D),r=k}}function _y(e,t){for(var n=(t&Ks)!==0,r=0;r<e.length;r++){var a=e[r],s=a.event,f=a.listeners;OS(s,f,n)}BR()}function kS(e,t,n,r,a){var s=Sd(n),f=[];DS(f,e,r,n,s,t),_y(f,t)}function Ct(e,t){Ah.has(e)||u('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',e);var n=!1,r=lw(t),a=zS(e);r.has(a)||(Sy(t,e,_d,n),r.add(a))}function Dh(e,t,n){Ah.has(e)&&!t&&u('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',e);var r=0;t&&(r|=Ks),Sy(n,e,r,t)}var yc="_reactListening"+Math.random().toString(36).slice(2);function Nl(e){if(!e[yc]){e[yc]=!0,kn.forEach(function(n){n!=="selectionchange"&&(Ah.has(n)||Dh(n,!1,e),Dh(n,!0,e))});var t=e.nodeType===Li?e:e.ownerDocument;t!==null&&(t[yc]||(t[yc]=!0,Dh("selectionchange",!1,t)))}}function Sy(e,t,n,r,a){var s=r_(e,t,n),f=void 0;Td&&(t==="touchstart"||t==="touchmove"||t==="wheel")&&(f=!0),e=e,r?f!==void 0?u_(e,t,s,f):l_(e,t,s):f!==void 0?c_(e,t,s,f):s_(e,t,s)}function Cy(e,t){return e===t||e.nodeType===Xt&&e.parentNode===t}function Oh(e,t,n,r,a){var s=r;if(!(t&eg)&&!(t&_d)){var f=a;if(r!==null){var m=r;e:for(;;){if(m===null)return;var g=m.tag;if(g===w||g===T){var R=m.stateNode.containerInfo;if(Cy(R,f))break;if(g===T)for(var S=m.return;S!==null;){var k=S.tag;if(k===w||k===T){var D=S.stateNode.containerInfo;if(Cy(D,f))return}S=S.return}for(;R!==null;){var z=ao(R);if(z===null)return;var B=z.tag;if(B===C||B===M){m=s=z;continue e}R=R.parentNode}}m=m.return}}}og(function(){return kS(e,t,n,s)})}function Al(e,t,n){return{instance:e,listener:t,currentTarget:n}}function MS(e,t,n,r,a,s){for(var f=t!==null?t+"Capture":null,m=r?f:t,g=[],R=e,S=null;R!==null;){var k=R,D=k.stateNode,z=k.tag;if(z===C&&D!==null&&(S=D,m!==null)){var B=Js(R,m);B!=null&&g.push(Al(R,B,S))}if(a)break;R=R.return}return g}function xc(e,t){for(var n=t+"Capture",r=[],a=e;a!==null;){var s=a,f=s.stateNode,m=s.tag;if(m===C&&f!==null){var g=f,R=Js(a,n);R!=null&&r.unshift(Al(a,R,g));var S=Js(a,t);S!=null&&r.push(Al(a,S,g))}a=a.return}return r}function Zo(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==C);return e||null}function PS(e,t){for(var n=e,r=t,a=0,s=n;s;s=Zo(s))a++;for(var f=0,m=r;m;m=Zo(m))f++;for(;a-f>0;)n=Zo(n),a--;for(;f-a>0;)r=Zo(r),f--;for(var g=a;g--;){if(n===r||r!==null&&n===r.alternate)return n;n=Zo(n),r=Zo(r)}return null}function wy(e,t,n,r,a){for(var s=t._reactName,f=[],m=n;m!==null&&m!==r;){var g=m,R=g.alternate,S=g.stateNode,k=g.tag;if(R!==null&&R===r)break;if(k===C&&S!==null){var D=S;if(a){var z=Js(m,s);z!=null&&f.unshift(Al(m,z,D))}else if(!a){var B=Js(m,s);B!=null&&f.push(Al(m,B,D))}}m=m.return}f.length!==0&&e.push({event:t,listeners:f})}function LS(e,t,n,r,a){var s=r&&a?PS(r,a):null;r!==null&&wy(e,t,r,s,!1),a!==null&&n!==null&&wy(e,n,a,s,!0)}function zS(e,t){return e+"__bubble"}var ir=!1,Dl="dangerouslySetInnerHTML",bc="suppressContentEditableWarning",ga="suppressHydrationWarning",Ty="autoFocus",ro="children",io="style",Ec="__html",kh,Rc,Ol,Ny,_c,Ay,Dy;kh={dialog:!0,webview:!0},Rc=function(e,t){yR(e,t),xR(e,t),SR(e,t,{registrationNameDependencies:Ut,possibleRegistrationNames:cn})},Ay=Mt&&!document.documentMode,Ol=function(e,t,n){if(!ir){var r=Sc(n),a=Sc(t);a!==r&&(ir=!0,u("Prop `%s` did not match. Server: %s Client: %s",e,JSON.stringify(a),JSON.stringify(r)))}},Ny=function(e){if(!ir){ir=!0;var t=[];e.forEach(function(n){t.push(n)}),u("Extra attributes from the server: %s",t)}},_c=function(e,t){t===!1?u("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",e,e,e):u("Expected `%s` listener to be a function, instead got a value of `%s` type.",e,typeof t)},Dy=function(e,t){var n=e.namespaceURI===Mi?e.ownerDocument.createElement(e.tagName):e.ownerDocument.createElementNS(e.namespaceURI,e.tagName);return n.innerHTML=t,n.innerHTML};var FS=/\r\n?/g,BS=/\u0000|\uFFFD/g;function Sc(e){wr(e);var t=typeof e=="string"?e:""+e;return t.replace(FS,`
`).replace(BS,"")}function Cc(e,t,n,r){var a=Sc(t),s=Sc(e);if(s!==a&&(r&&(ir||(ir=!0,u('Text content did not match. Server: "%s" Client: "%s"',s,a))),n&&ne))throw new Error("Text content does not match server-rendered HTML.")}function Oy(e){return e.nodeType===Li?e:e.ownerDocument}function US(){}function wc(e){e.onclick=US}function VS(e,t,n,r,a){for(var s in r)if(r.hasOwnProperty(s)){var f=r[s];if(s===io)f&&Object.freeze(f),$v(t,f);else if(s===Dl){var m=f?f[Ec]:void 0;m!=null&&Hv(t,m)}else if(s===ro)if(typeof f=="string"){var g=e!=="textarea"||f!=="";g&&$u(t,f)}else typeof f=="number"&&$u(t,""+f);else s===bc||s===ga||s===Ty||(Ut.hasOwnProperty(s)?f!=null&&(typeof f!="function"&&_c(s,f),s==="onScroll"&&Ct("scroll",t)):f!=null&&Ai(t,s,f,a))}}function IS(e,t,n,r){for(var a=0;a<t.length;a+=2){var s=t[a],f=t[a+1];s===io?$v(e,f):s===Dl?Hv(e,f):s===ro?$u(e,f):Ai(e,s,f,r)}}function jS(e,t,n,r){var a,s=Oy(n),f,m=r;if(m===Mi&&(m=gd(e)),m===Mi){if(a=Xa(e,t),!a&&e!==e.toLowerCase()&&u("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",e),e==="script"){var g=s.createElement("div");g.innerHTML="<script><\/script>";var R=g.firstChild;f=g.removeChild(R)}else if(typeof t.is=="string")f=s.createElement(e,{is:t.is});else if(f=s.createElement(e),e==="select"){var S=f;t.multiple?S.multiple=!0:t.size&&(S.size=t.size)}}else f=s.createElementNS(m,e);return m===Mi&&!a&&Object.prototype.toString.call(f)==="[object HTMLUnknownElement]"&&!fn.call(kh,e)&&(kh[e]=!0,u("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",e)),f}function HS(e,t){return Oy(t).createTextNode(e)}function GS(e,t,n,r){var a=Xa(t,n);Rc(t,n);var s;switch(t){case"dialog":Ct("cancel",e),Ct("close",e),s=n;break;case"iframe":case"object":case"embed":Ct("load",e),s=n;break;case"video":case"audio":for(var f=0;f<Tl.length;f++)Ct(Tl[f],e);s=n;break;case"source":Ct("error",e),s=n;break;case"img":case"image":case"link":Ct("error",e),Ct("load",e),s=n;break;case"details":Ct("toggle",e),s=n;break;case"input":N(e,n),s=y(e,n),Ct("invalid",e);break;case"option":vt(e,n),s=n;break;case"select":qs(e,n),s=$s(e,n),Ct("invalid",e);break;case"textarea":Vv(e,n),s=pd(e,n),Ct("invalid",e);break;default:s=n}switch(Rd(t,s),VS(t,e,r,s,a),t){case"input":Oi(e),te(e,n,!1);break;case"textarea":Oi(e),jv(e);break;case"option":St(e,n);break;case"select":md(e,n);break;default:typeof s.onClick=="function"&&wc(e);break}}function WS(e,t,n,r,a){Rc(t,r);var s=null,f,m;switch(t){case"input":f=y(e,n),m=y(e,r),s=[];break;case"select":f=$s(e,n),m=$s(e,r),s=[];break;case"textarea":f=pd(e,n),m=pd(e,r),s=[];break;default:f=n,m=r,typeof f.onClick!="function"&&typeof m.onClick=="function"&&wc(e);break}Rd(t,m);var g,R,S=null;for(g in f)if(!(m.hasOwnProperty(g)||!f.hasOwnProperty(g)||f[g]==null))if(g===io){var k=f[g];for(R in k)k.hasOwnProperty(R)&&(S||(S={}),S[R]="")}else g===Dl||g===ro||g===bc||g===ga||g===Ty||(Ut.hasOwnProperty(g)?s||(s=[]):(s=s||[]).push(g,null));for(g in m){var D=m[g],z=f!=null?f[g]:void 0;if(!(!m.hasOwnProperty(g)||D===z||D==null&&z==null))if(g===io)if(D&&Object.freeze(D),z){for(R in z)z.hasOwnProperty(R)&&(!D||!D.hasOwnProperty(R))&&(S||(S={}),S[R]="");for(R in D)D.hasOwnProperty(R)&&z[R]!==D[R]&&(S||(S={}),S[R]=D[R])}else S||(s||(s=[]),s.push(g,S)),S=D;else if(g===Dl){var B=D?D[Ec]:void 0,I=z?z[Ec]:void 0;B!=null&&I!==B&&(s=s||[]).push(g,B)}else g===ro?(typeof D=="string"||typeof D=="number")&&(s=s||[]).push(g,""+D):g===bc||g===ga||(Ut.hasOwnProperty(g)?(D!=null&&(typeof D!="function"&&_c(g,D),g==="onScroll"&&Ct("scroll",e)),!s&&z!==D&&(s=[])):(s=s||[]).push(g,D))}return S&&(cR(S,m[io]),(s=s||[]).push(io,S)),s}function XS(e,t,n,r,a){n==="input"&&a.type==="radio"&&a.name!=null&&F(e,a);var s=Xa(n,r),f=Xa(n,a);switch(IS(e,t,s,f),n){case"input":U(e,a);break;case"textarea":Iv(e,a);break;case"select":IE(e,a);break}}function YS(e){{var t=e.toLowerCase();return qu.hasOwnProperty(t)&&qu[t]||null}}function $S(e,t,n,r,a,s,f){var m,g;switch(m=Xa(t,n),Rc(t,n),t){case"dialog":Ct("cancel",e),Ct("close",e);break;case"iframe":case"object":case"embed":Ct("load",e);break;case"video":case"audio":for(var R=0;R<Tl.length;R++)Ct(Tl[R],e);break;case"source":Ct("error",e);break;case"img":case"image":case"link":Ct("error",e),Ct("load",e);break;case"details":Ct("toggle",e);break;case"input":N(e,n),Ct("invalid",e);break;case"option":vt(e,n);break;case"select":qs(e,n),Ct("invalid",e);break;case"textarea":Vv(e,n),Ct("invalid",e);break}Rd(t,n);{g=new Set;for(var S=e.attributes,k=0;k<S.length;k++){var D=S[k].name.toLowerCase();switch(D){case"value":break;case"checked":break;case"selected":break;default:g.add(S[k].name)}}}var z=null;for(var B in n)if(n.hasOwnProperty(B)){var I=n[B];if(B===ro)typeof I=="string"?e.textContent!==I&&(n[ga]!==!0&&Cc(e.textContent,I,s,f),z=[ro,I]):typeof I=="number"&&e.textContent!==""+I&&(n[ga]!==!0&&Cc(e.textContent,I,s,f),z=[ro,""+I]);else if(Ut.hasOwnProperty(B))I!=null&&(typeof I!="function"&&_c(B,I),B==="onScroll"&&Ct("scroll",e));else if(f&&typeof m=="boolean"){var fe=void 0,Ce=m&&At?null:fr(B);if(n[ga]!==!0){if(!(B===bc||B===ga||B==="value"||B==="checked"||B==="selected")){if(B===Dl){var _e=e.innerHTML,Ke=I?I[Ec]:void 0;if(Ke!=null){var Ge=Dy(e,Ke);Ge!==_e&&Ol(B,_e,Ge)}}else if(B===io){if(g.delete(B),Ay){var P=lR(I);fe=e.getAttribute("style"),P!==fe&&Ol(B,fe,P)}}else if(m&&!At)g.delete(B.toLowerCase()),fe=na(e,B,I),I!==fe&&Ol(B,fe,I);else if(!It(B,Ce,m)&&!mt(B,I,Ce,m)){var j=!1;if(Ce!==null)g.delete(Ce.attributeName),fe=Ni(e,B,I,Ce);else{var L=r;if(L===Mi&&(L=gd(t)),L===Mi)g.delete(B.toLowerCase());else{var J=YS(B);J!==null&&J!==B&&(j=!0,g.delete(J)),g.delete(B)}fe=na(e,B,I)}var ve=At;!ve&&I!==fe&&!j&&Ol(B,fe,I)}}}}}switch(f&&g.size>0&&n[ga]!==!0&&Ny(g),t){case"input":Oi(e),te(e,n,!0);break;case"textarea":Oi(e),jv(e);break;case"select":case"option":break;default:typeof n.onClick=="function"&&wc(e);break}return z}function qS(e,t,n){var r=e.nodeValue!==t;return r}function Mh(e,t){{if(ir)return;ir=!0,u("Did not expect server HTML to contain a <%s> in <%s>.",t.nodeName.toLowerCase(),e.nodeName.toLowerCase())}}function Ph(e,t){{if(ir)return;ir=!0,u('Did not expect server HTML to contain the text node "%s" in <%s>.',t.nodeValue,e.nodeName.toLowerCase())}}function Lh(e,t,n){{if(ir)return;ir=!0,u("Expected server HTML to contain a matching <%s> in <%s>.",t,e.nodeName.toLowerCase())}}function zh(e,t){{if(t===""||ir)return;ir=!0,u('Expected server HTML to contain a matching text node for "%s" in <%s>.',t,e.nodeName.toLowerCase())}}function QS(e,t,n){switch(t){case"input":Ae(e,n);return;case"textarea":HE(e,n);return;case"select":jE(e,n);return}}var kl=function(){},Ml=function(){};{var KS=["address","applet","area","article","aside","base","basefont","bgsound","blockquote","body","br","button","caption","center","col","colgroup","dd","details","dir","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","isindex","li","link","listing","main","marquee","menu","menuitem","meta","nav","noembed","noframes","noscript","object","ol","p","param","plaintext","pre","script","section","select","source","style","summary","table","tbody","td","template","textarea","tfoot","th","thead","title","tr","track","ul","wbr","xmp"],ky=["applet","caption","html","table","td","th","marquee","object","template","foreignObject","desc","title"],ZS=ky.concat(["button"]),JS=["dd","dt","li","option","optgroup","p","rp","rt"],My={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};Ml=function(e,t){var n=We({},e||My),r={tag:t};return ky.indexOf(t)!==-1&&(n.aTagInScope=null,n.buttonTagInScope=null,n.nobrTagInScope=null),ZS.indexOf(t)!==-1&&(n.pTagInButtonScope=null),KS.indexOf(t)!==-1&&t!=="address"&&t!=="div"&&t!=="p"&&(n.listItemTagAutoclosing=null,n.dlItemTagAutoclosing=null),n.current=r,t==="form"&&(n.formTag=r),t==="a"&&(n.aTagInScope=r),t==="button"&&(n.buttonTagInScope=r),t==="nobr"&&(n.nobrTagInScope=r),t==="p"&&(n.pTagInButtonScope=r),t==="li"&&(n.listItemTagAutoclosing=r),(t==="dd"||t==="dt")&&(n.dlItemTagAutoclosing=r),n};var eC=function(e,t){switch(t){case"select":return e==="option"||e==="optgroup"||e==="#text";case"optgroup":return e==="option"||e==="#text";case"option":return e==="#text";case"tr":return e==="th"||e==="td"||e==="style"||e==="script"||e==="template";case"tbody":case"thead":case"tfoot":return e==="tr"||e==="style"||e==="script"||e==="template";case"colgroup":return e==="col"||e==="template";case"table":return e==="caption"||e==="colgroup"||e==="tbody"||e==="tfoot"||e==="thead"||e==="style"||e==="script"||e==="template";case"head":return e==="base"||e==="basefont"||e==="bgsound"||e==="link"||e==="meta"||e==="title"||e==="noscript"||e==="noframes"||e==="style"||e==="script"||e==="template";case"html":return e==="head"||e==="body"||e==="frameset";case"frameset":return e==="frame";case"#document":return e==="html"}switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t!=="h1"&&t!=="h2"&&t!=="h3"&&t!=="h4"&&t!=="h5"&&t!=="h6";case"rp":case"rt":return JS.indexOf(t)===-1;case"body":case"caption":case"col":case"colgroup":case"frameset":case"frame":case"head":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return t==null}return!0},tC=function(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null},Py={};kl=function(e,t,n){n=n||My;var r=n.current,a=r&&r.tag;t!=null&&(e!=null&&u("validateDOMNesting: when childText is passed, childTag should be null"),e="#text");var s=eC(e,a)?null:r,f=s?null:tC(e,n),m=s||f;if(m){var g=m.tag,R=!!s+"|"+e+"|"+g;if(!Py[R]){Py[R]=!0;var S=e,k="";if(e==="#text"?/\S/.test(t)?S="Text nodes":(S="Whitespace text nodes",k=" Make sure you don't have any extra whitespace between tags on each line of your source code."):S="<"+e+">",s){var D="";g==="table"&&e==="tr"&&(D+=" Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),u("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s",S,g,k,D)}else u("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.",S,g)}}}}var Tc="suppressHydrationWarning",Nc="$",Ac="/$",Pl="$?",Ll="$!",nC="style",Fh=null,Bh=null;function rC(e){var t,n,r=e.nodeType;switch(r){case Li:case xd:{t=r===Li?"#document":"#fragment";var a=e.documentElement;n=a?a.namespaceURI:yd(null,"");break}default:{var s=r===Xt?e.parentNode:e,f=s.namespaceURI||null;t=s.tagName,n=yd(f,t);break}}{var m=t.toLowerCase(),g=Ml(null,m);return{namespace:n,ancestorInfo:g}}}function iC(e,t,n){{var r=e,a=yd(r.namespace,t),s=Ml(r.ancestorInfo,t);return{namespace:a,ancestorInfo:s}}}function b3(e){return e}function aC(e){Fh=n_(),Bh=xS();var t=null;return jg(!1),t}function oC(e){bS(Bh),jg(Fh),Fh=null,Bh=null}function sC(e,t,n,r,a){var s;{var f=r;if(kl(e,null,f.ancestorInfo),typeof t.children=="string"||typeof t.children=="number"){var m=""+t.children,g=Ml(f.ancestorInfo,e);kl(null,m,g)}s=f.namespace}var R=jS(e,t,n,s);return Bl(a,R),Xh(R,t),R}function lC(e,t){e.appendChild(t)}function uC(e,t,n,r,a){switch(GS(e,t,n,r),t){case"button":case"input":case"select":case"textarea":return!!n.autoFocus;case"img":return!0;default:return!1}}function cC(e,t,n,r,a,s){{var f=s;if(typeof r.children!=typeof n.children&&(typeof r.children=="string"||typeof r.children=="number")){var m=""+r.children,g=Ml(f.ancestorInfo,t);kl(null,m,g)}}return WS(e,t,n,r)}function Uh(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}function fC(e,t,n,r){{var a=n;kl(null,e,a.ancestorInfo)}var s=HS(e,t);return Bl(r,s),s}function dC(){var e=window.event;return e===void 0?ji:Hg(e.type)}var Vh=typeof setTimeout=="function"?setTimeout:void 0,hC=typeof clearTimeout=="function"?clearTimeout:void 0,Ih=-1,Ly=typeof Promise=="function"?Promise:void 0,mC=typeof queueMicrotask=="function"?queueMicrotask:typeof Ly<"u"?function(e){return Ly.resolve(null).then(e).catch(pC)}:Vh;function pC(e){setTimeout(function(){throw e})}function vC(e,t,n,r){switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&e.focus();return;case"img":{n.src&&(e.src=n.src);return}}}function gC(e,t,n,r,a,s){XS(e,t,n,r,a),Xh(e,a)}function zy(e){$u(e,"")}function yC(e,t,n){e.nodeValue=n}function xC(e,t){e.appendChild(t)}function bC(e,t){var n;e.nodeType===Xt?(n=e.parentNode,n.insertBefore(t,e)):(n=e,n.appendChild(t));var r=e._reactRootContainer;r==null&&n.onclick===null&&wc(n)}function EC(e,t,n){e.insertBefore(t,n)}function RC(e,t,n){e.nodeType===Xt?e.parentNode.insertBefore(t,n):e.insertBefore(t,n)}function _C(e,t){e.removeChild(t)}function SC(e,t){e.nodeType===Xt?e.parentNode.removeChild(t):e.removeChild(t)}function jh(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===Xt){var s=a.data;if(s===Ac)if(r===0){e.removeChild(a),gl(t);return}else r--;else(s===Nc||s===Pl||s===Ll)&&r++}n=a}while(n);gl(t)}function CC(e,t){e.nodeType===Xt?jh(e.parentNode,t):e.nodeType===rr&&jh(e,t),gl(e)}function wC(e){e=e;var t=e.style;typeof t.setProperty=="function"?t.setProperty("display","none","important"):t.display="none"}function TC(e){e.nodeValue=""}function NC(e,t){e=e;var n=t[nC],r=n!=null&&n.hasOwnProperty("display")?n.display:null;e.style.display=bd("display",r)}function AC(e,t){e.nodeValue=t}function DC(e){e.nodeType===rr?e.textContent="":e.nodeType===Li&&e.documentElement&&e.removeChild(e.documentElement)}function OC(e,t,n){return e.nodeType!==rr||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e}function kC(e,t){return t===""||e.nodeType!==Pi?null:e}function MC(e){return e.nodeType!==Xt?null:e}function Fy(e){return e.data===Pl}function Hh(e){return e.data===Ll}function PC(e){var t=e.nextSibling&&e.nextSibling.dataset,n,r,a;return t&&(n=t.dgst,r=t.msg,a=t.stck),{message:r,digest:n,stack:a}}function LC(e,t){e._reactRetry=t}function Dc(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===rr||t===Pi)break;if(t===Xt){var n=e.data;if(n===Nc||n===Ll||n===Pl)break;if(n===Ac)return null}}return e}function zl(e){return Dc(e.nextSibling)}function zC(e){return Dc(e.firstChild)}function FC(e){return Dc(e.firstChild)}function BC(e){return Dc(e.nextSibling)}function UC(e,t,n,r,a,s,f){Bl(s,e),Xh(e,n);var m;{var g=a;m=g.namespace}var R=(s.mode&qe)!==we;return $S(e,t,n,m,r,R,f)}function VC(e,t,n,r){return Bl(n,e),n.mode&qe,qS(e,t)}function IC(e,t){Bl(t,e)}function jC(e){for(var t=e.nextSibling,n=0;t;){if(t.nodeType===Xt){var r=t.data;if(r===Ac){if(n===0)return zl(t);n--}else(r===Nc||r===Ll||r===Pl)&&n++}t=t.nextSibling}return null}function By(e){for(var t=e.previousSibling,n=0;t;){if(t.nodeType===Xt){var r=t.data;if(r===Nc||r===Ll||r===Pl){if(n===0)return t;n--}else r===Ac&&n++}t=t.previousSibling}return null}function HC(e){gl(e)}function GC(e){gl(e)}function WC(e){return e!=="head"&&e!=="body"}function XC(e,t,n,r){var a=!0;Cc(t.nodeValue,n,r,a)}function YC(e,t,n,r,a,s){if(t[Tc]!==!0){var f=!0;Cc(r.nodeValue,a,s,f)}}function $C(e,t){t.nodeType===rr?Mh(e,t):t.nodeType===Xt||Ph(e,t)}function qC(e,t){{var n=e.parentNode;n!==null&&(t.nodeType===rr?Mh(n,t):t.nodeType===Xt||Ph(n,t))}}function QC(e,t,n,r,a){(a||t[Tc]!==!0)&&(r.nodeType===rr?Mh(n,r):r.nodeType===Xt||Ph(n,r))}function KC(e,t,n){Lh(e,t)}function ZC(e,t){zh(e,t)}function JC(e,t,n){{var r=e.parentNode;r!==null&&Lh(r,t)}}function ew(e,t){{var n=e.parentNode;n!==null&&zh(n,t)}}function tw(e,t,n,r,a,s){(s||t[Tc]!==!0)&&Lh(n,r)}function nw(e,t,n,r,a){(a||t[Tc]!==!0)&&zh(n,r)}function rw(e){u("An error occurred during hydration. The server HTML was replaced with client content in <%s>.",e.nodeName.toLowerCase())}function iw(e){Nl(e)}var Jo=Math.random().toString(36).slice(2),es="__reactFiber$"+Jo,Gh="__reactProps$"+Jo,Fl="__reactContainer$"+Jo,Wh="__reactEvents$"+Jo,aw="__reactListeners$"+Jo,ow="__reactHandles$"+Jo;function sw(e){delete e[es],delete e[Gh],delete e[Wh],delete e[aw],delete e[ow]}function Bl(e,t){t[es]=e}function Oc(e,t){t[Fl]=e}function Uy(e){e[Fl]=null}function Ul(e){return!!e[Fl]}function ao(e){var t=e[es];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Fl]||n[es],t){var r=t.alternate;if(t.child!==null||r!==null&&r.child!==null)for(var a=By(e);a!==null;){var s=a[es];if(s)return s;a=By(a)}return t}e=n,n=e.parentNode}return null}function ya(e){var t=e[es]||e[Fl];return t&&(t.tag===C||t.tag===M||t.tag===V||t.tag===w)?t:null}function ts(e){if(e.tag===C||e.tag===M)return e.stateNode;throw new Error("getNodeFromInstance: Invalid argument.")}function kc(e){return e[Gh]||null}function Xh(e,t){e[Gh]=t}function lw(e){var t=e[Wh];return t===void 0&&(t=e[Wh]=new Set),t}var Vy={},Iy=i.ReactDebugCurrentFrame;function Mc(e){if(e){var t=e._owner,n=oa(e.type,e._source,t?t.type:null);Iy.setExtraStackFrame(n)}else Iy.setExtraStackFrame(null)}function Yr(e,t,n,r,a){{var s=Function.call.bind(fn);for(var f in e)if(s(e,f)){var m=void 0;try{if(typeof e[f]!="function"){var g=Error((r||"React class")+": "+n+" type `"+f+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[f]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw g.name="Invariant Violation",g}m=e[f](t,f,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(R){m=R}m&&!(m instanceof Error)&&(Mc(a),u("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,f,typeof m),Mc(null)),m instanceof Error&&!(m.message in Vy)&&(Vy[m.message]=!0,Mc(a),u("Failed %s type: %s",n,m.message),Mc(null))}}}var Yh=[],Pc;Pc=[];var Hi=-1;function xa(e){return{current:e}}function Fn(e,t){if(Hi<0){u("Unexpected pop.");return}t!==Pc[Hi]&&u("Unexpected Fiber popped."),e.current=Yh[Hi],Yh[Hi]=null,Pc[Hi]=null,Hi--}function Bn(e,t,n){Hi++,Yh[Hi]=e.current,Pc[Hi]=n,e.current=t}var $h;$h={};var yr={};Object.freeze(yr);var Gi=xa(yr),di=xa(!1),qh=yr;function ns(e,t,n){return n&&hi(t)?qh:Gi.current}function jy(e,t,n){{var r=e.stateNode;r.__reactInternalMemoizedUnmaskedChildContext=t,r.__reactInternalMemoizedMaskedChildContext=n}}function rs(e,t){{var n=e.type,r=n.contextTypes;if(!r)return yr;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var s={};for(var f in r)s[f]=t[f];{var m=Be(e)||"Unknown";Yr(r,s,"context",m)}return a&&jy(e,t,s),s}}function Lc(){return di.current}function hi(e){{var t=e.childContextTypes;return t!=null}}function zc(e){Fn(di,e),Fn(Gi,e)}function Qh(e){Fn(di,e),Fn(Gi,e)}function Hy(e,t,n){{if(Gi.current!==yr)throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");Bn(Gi,t,e),Bn(di,n,e)}}function Gy(e,t,n){{var r=e.stateNode,a=t.childContextTypes;if(typeof r.getChildContext!="function"){{var s=Be(e)||"Unknown";$h[s]||($h[s]=!0,u("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",s,s))}return n}var f=r.getChildContext();for(var m in f)if(!(m in a))throw new Error((Be(e)||"Unknown")+'.getChildContext(): key "'+m+'" is not defined in childContextTypes.');{var g=Be(e)||"Unknown";Yr(a,f,"child context",g)}return We({},n,f)}}function Fc(e){{var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||yr;return qh=Gi.current,Bn(Gi,n,e),Bn(di,di.current,e),!0}}function Wy(e,t,n){{var r=e.stateNode;if(!r)throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){var a=Gy(e,t,qh);r.__reactInternalMemoizedMergedChildContext=a,Fn(di,e),Fn(Gi,e),Bn(Gi,a,e),Bn(di,n,e)}else Fn(di,e),Bn(di,n,e)}}function uw(e){{if(!WR(e)||e.tag!==p)throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case w:return t.stateNode.context;case p:{var n=t.type;if(hi(n))return t.stateNode.__reactInternalMemoizedMergedChildContext;break}}t=t.return}while(t!==null);throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}}var ba=0,Bc=1,Wi=null,Kh=!1,Zh=!1;function Xy(e){Wi===null?Wi=[e]:Wi.push(e)}function cw(e){Kh=!0,Xy(e)}function Yy(){Kh&&Ea()}function Ea(){if(!Zh&&Wi!==null){Zh=!0;var e=0,t=Xr();try{var n=!0,r=Wi;for(gn(pr);e<r.length;e++){var a=r[e];do a=a(n);while(a!==null)}Wi=null,Kh=!1}catch(s){throw Wi!==null&&(Wi=Wi.slice(e+1)),gg(ec,Ea),s}finally{gn(t),Zh=!1}}return null}var is=[],as=0,Uc=null,Vc=0,Dr=[],Or=0,oo=null,Xi=1,Yi="";function fw(e){return lo(),(e.flags&ug)!==Ne}function dw(e){return lo(),Vc}function hw(){var e=Yi,t=Xi,n=t&~mw(t);return n.toString(32)+e}function so(e,t){lo(),is[as++]=Vc,is[as++]=Uc,Uc=e,Vc=t}function $y(e,t,n){lo(),Dr[Or++]=Xi,Dr[Or++]=Yi,Dr[Or++]=oo,oo=e;var r=Xi,a=Yi,s=Ic(r)-1,f=r&~(1<<s),m=n+1,g=Ic(t)+s;if(g>30){var R=s-s%5,S=(1<<R)-1,k=(f&S).toString(32),D=f>>R,z=s-R,B=Ic(t)+z,I=m<<z,fe=I|D,Ce=k+a;Xi=1<<B|fe,Yi=Ce}else{var _e=m<<s,Ke=_e|f,Ge=a;Xi=1<<g|Ke,Yi=Ge}}function Jh(e){lo();var t=e.return;if(t!==null){var n=1,r=0;so(e,n),$y(e,n,r)}}function Ic(e){return 32-_g(e)}function mw(e){return 1<<Ic(e)-1}function em(e){for(;e===Uc;)Uc=is[--as],is[as]=null,Vc=is[--as],is[as]=null;for(;e===oo;)oo=Dr[--Or],Dr[Or]=null,Yi=Dr[--Or],Dr[Or]=null,Xi=Dr[--Or],Dr[Or]=null}function pw(){return lo(),oo!==null?{id:Xi,overflow:Yi}:null}function vw(e,t){lo(),Dr[Or++]=Xi,Dr[Or++]=Yi,Dr[Or++]=oo,Xi=t.id,Yi=t.overflow,oo=e}function lo(){Rn()||u("Expected to be hydrating. This is a bug in React. Please file an issue.")}var En=null,kr=null,$r=!1,uo=!1,Ra=null;function gw(){$r&&u("We should not be hydrating here. This is a bug in React. Please file a bug.")}function qy(){uo=!0}function yw(){return uo}function xw(e){var t=e.stateNode.containerInfo;return kr=FC(t),En=e,$r=!0,Ra=null,uo=!1,!0}function bw(e,t,n){return kr=BC(t),En=e,$r=!0,Ra=null,uo=!1,n!==null&&vw(e,n),!0}function Qy(e,t){switch(e.tag){case w:{$C(e.stateNode.containerInfo,t);break}case C:{var n=(e.mode&qe)!==we;QC(e.type,e.memoizedProps,e.stateNode,t,n);break}case V:{var r=e.memoizedState;r.dehydrated!==null&&qC(r.dehydrated,t);break}}}function Ky(e,t){Qy(e,t);var n=SA();n.stateNode=t,n.return=e;var r=e.deletions;r===null?(e.deletions=[n],e.flags|=Ya):r.push(n)}function tm(e,t){{if(uo)return;switch(e.tag){case w:{var n=e.stateNode.containerInfo;switch(t.tag){case C:var r=t.type;t.pendingProps,KC(n,r);break;case M:var a=t.pendingProps;ZC(n,a);break}break}case C:{var s=e.type,f=e.memoizedProps,m=e.stateNode;switch(t.tag){case C:{var g=t.type,R=t.pendingProps,S=(e.mode&qe)!==we;tw(s,f,m,g,R,S);break}case M:{var k=t.pendingProps,D=(e.mode&qe)!==we;nw(s,f,m,k,D);break}}break}case V:{var z=e.memoizedState,B=z.dehydrated;if(B!==null)switch(t.tag){case C:var I=t.type;t.pendingProps,JC(B,I);break;case M:var fe=t.pendingProps;ew(B,fe);break}break}default:return}}}function Zy(e,t){t.flags=t.flags&~Fi|Yt,tm(e,t)}function Jy(e,t){switch(e.tag){case C:{var n=e.type;e.pendingProps;var r=OC(t,n);return r!==null?(e.stateNode=r,En=e,kr=zC(r),!0):!1}case M:{var a=e.pendingProps,s=kC(t,a);return s!==null?(e.stateNode=s,En=e,kr=null,!0):!1}case V:{var f=MC(t);if(f!==null){var m={dehydrated:f,treeContext:pw(),retryLane:hr};e.memoizedState=m;var g=CA(f);return g.return=e,e.child=g,En=e,kr=null,!0}return!1}default:return!1}}function nm(e){return(e.mode&qe)!==we&&(e.flags&rt)===Ne}function rm(e){throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function im(e){if($r){var t=kr;if(!t){nm(e)&&(tm(En,e),rm()),Zy(En,e),$r=!1,En=e;return}var n=t;if(!Jy(e,t)){nm(e)&&(tm(En,e),rm()),t=zl(n);var r=En;if(!t||!Jy(e,t)){Zy(En,e),$r=!1,En=e;return}Ky(r,n)}}}function Ew(e,t,n){var r=e.stateNode,a=!uo,s=UC(r,e.type,e.memoizedProps,t,n,e,a);return e.updateQueue=s,s!==null}function Rw(e){var t=e.stateNode,n=e.memoizedProps,r=VC(t,n,e);if(r){var a=En;if(a!==null)switch(a.tag){case w:{var s=a.stateNode.containerInfo,f=(a.mode&qe)!==we;XC(s,t,n,f);break}case C:{var m=a.type,g=a.memoizedProps,R=a.stateNode,S=(a.mode&qe)!==we;YC(m,g,R,t,n,S);break}}}return r}function _w(e){var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");IC(n,e)}function Sw(e){var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return jC(n)}function e0(e){for(var t=e.return;t!==null&&t.tag!==C&&t.tag!==w&&t.tag!==V;)t=t.return;En=t}function jc(e){if(e!==En)return!1;if(!$r)return e0(e),$r=!0,!1;if(e.tag!==w&&(e.tag!==C||WC(e.type)&&!Uh(e.type,e.memoizedProps))){var t=kr;if(t)if(nm(e))t0(e),rm();else for(;t;)Ky(e,t),t=zl(t)}return e0(e),e.tag===V?kr=Sw(e):kr=En?zl(e.stateNode):null,!0}function Cw(){return $r&&kr!==null}function t0(e){for(var t=kr;t;)Qy(e,t),t=zl(t)}function os(){En=null,kr=null,$r=!1,uo=!1}function n0(){Ra!==null&&(qx(Ra),Ra=null)}function Rn(){return $r}function am(e){Ra===null?Ra=[e]:Ra.push(e)}var ww=i.ReactCurrentBatchConfig,Tw=null;function Nw(){return ww.transition}var qr={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}};{var Aw=function(e){for(var t=null,n=e;n!==null;)n.mode&zt&&(t=n),n=n.return;return t},co=function(e){var t=[];return e.forEach(function(n){t.push(n)}),t.sort().join(", ")},Vl=[],Il=[],jl=[],Hl=[],Gl=[],Wl=[],fo=new Set;qr.recordUnsafeLifecycleWarnings=function(e,t){fo.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&Vl.push(e),e.mode&zt&&typeof t.UNSAFE_componentWillMount=="function"&&Il.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&jl.push(e),e.mode&zt&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&Hl.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&Gl.push(e),e.mode&zt&&typeof t.UNSAFE_componentWillUpdate=="function"&&Wl.push(e))},qr.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;Vl.length>0&&(Vl.forEach(function(D){e.add(Be(D)||"Component"),fo.add(D.type)}),Vl=[]);var t=new Set;Il.length>0&&(Il.forEach(function(D){t.add(Be(D)||"Component"),fo.add(D.type)}),Il=[]);var n=new Set;jl.length>0&&(jl.forEach(function(D){n.add(Be(D)||"Component"),fo.add(D.type)}),jl=[]);var r=new Set;Hl.length>0&&(Hl.forEach(function(D){r.add(Be(D)||"Component"),fo.add(D.type)}),Hl=[]);var a=new Set;Gl.length>0&&(Gl.forEach(function(D){a.add(Be(D)||"Component"),fo.add(D.type)}),Gl=[]);var s=new Set;if(Wl.length>0&&(Wl.forEach(function(D){s.add(Be(D)||"Component"),fo.add(D.type)}),Wl=[]),t.size>0){var f=co(t);u(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,f)}if(r.size>0){var m=co(r);u(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`,m)}if(s.size>0){var g=co(s);u(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,g)}if(e.size>0){var R=co(e);d(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,R)}if(n.size>0){var S=co(n);d(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,S)}if(a.size>0){var k=co(a);d(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,k)}};var Hc=new Map,r0=new Set;qr.recordLegacyContextWarning=function(e,t){var n=Aw(e);if(n===null){u("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}if(!r0.has(e.type)){var r=Hc.get(n);(e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(r===void 0&&(r=[],Hc.set(n,r)),r.push(e))}},qr.flushLegacyContextWarning=function(){Hc.forEach(function(e,t){if(e.length!==0){var n=e[0],r=new Set;e.forEach(function(s){r.add(Be(s)||"Component"),r0.add(s.type)});var a=co(r);try{Ot(n),u(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`,a)}finally{hn()}}})},qr.discardPendingWarnings=function(){Vl=[],Il=[],jl=[],Hl=[],Gl=[],Wl=[],Hc=new Map}}var om,sm,lm,um,cm,i0=function(e,t){};om=!1,sm=!1,lm={},um={},cm={},i0=function(e,t){if(!(e===null||typeof e!="object")&&!(!e._store||e._store.validated||e.key!=null)){if(typeof e._store!="object")throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=Be(t)||"Component";um[n]||(um[n]=!0,u('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};function Dw(e){return e.prototype&&e.prototype.isReactComponent}function Xl(e,t,n){var r=n.ref;if(r!==null&&typeof r!="function"&&typeof r!="object"){if((e.mode&zt||Kt)&&!(n._owner&&n._self&&n._owner.stateNode!==n._self)&&!(n._owner&&n._owner.tag!==p)&&!(typeof n.type=="function"&&!Dw(n.type))&&n._owner){var a=Be(e)||"Component";lm[a]||(u('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',a,r),lm[a]=!0)}if(n._owner){var s=n._owner,f;if(s){var m=s;if(m.tag!==p)throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");f=m.stateNode}if(!f)throw new Error("Missing owner for string ref "+r+". This error is likely caused by a bug in React. Please file an issue.");var g=f;er(r,"ref");var R=""+r;if(t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===R)return t.ref;var S=function(k){var D=g.refs;k===null?delete D[R]:D[R]=k};return S._stringRef=R,S}else{if(typeof r!="string")throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw new Error("Element ref was specified as a string ("+r+`) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`)}}return r}function Gc(e,t){var n=Object.prototype.toString.call(t);throw new Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function Wc(e){{var t=Be(e)||"Component";if(cm[t])return;cm[t]=!0,u("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.")}}function a0(e){var t=e._payload,n=e._init;return n(t)}function o0(e){function t(P,j){if(e){var L=P.deletions;L===null?(P.deletions=[j],P.flags|=Ya):L.push(j)}}function n(P,j){if(!e)return null;for(var L=j;L!==null;)t(P,L),L=L.sibling;return null}function r(P,j){for(var L=new Map,J=j;J!==null;)J.key!==null?L.set(J.key,J):L.set(J.index,J),J=J.sibling;return L}function a(P,j){var L=Eo(P,j);return L.index=0,L.sibling=null,L}function s(P,j,L){if(P.index=L,!e)return P.flags|=ug,j;var J=P.alternate;if(J!==null){var ve=J.index;return ve<j?(P.flags|=Yt,j):ve}else return P.flags|=Yt,j}function f(P){return e&&P.alternate===null&&(P.flags|=Yt),P}function m(P,j,L,J){if(j===null||j.tag!==M){var ve=av(L,P.mode,J);return ve.return=P,ve}else{var de=a(j,L);return de.return=P,de}}function g(P,j,L,J){var ve=L.type;if(ve===A)return S(P,j,L.props.children,J,L.key);if(j!==null&&(j.elementType===ve||fb(j,L)||typeof ve=="object"&&ve!==null&&ve.$$typeof===He&&a0(ve)===j.type)){var de=a(j,L.props);return de.ref=Xl(P,j,L),de.return=P,de._debugSource=L._source,de._debugOwner=L._owner,de}var De=iv(L,P.mode,J);return De.ref=Xl(P,j,L),De.return=P,De}function R(P,j,L,J){if(j===null||j.tag!==T||j.stateNode.containerInfo!==L.containerInfo||j.stateNode.implementation!==L.implementation){var ve=ov(L,P.mode,J);return ve.return=P,ve}else{var de=a(j,L.children||[]);return de.return=P,de}}function S(P,j,L,J,ve){if(j===null||j.tag!==G){var de=Ma(L,P.mode,J,ve);return de.return=P,de}else{var De=a(j,L);return De.return=P,De}}function k(P,j,L){if(typeof j=="string"&&j!==""||typeof j=="number"){var J=av(""+j,P.mode,L);return J.return=P,J}if(typeof j=="object"&&j!==null){switch(j.$$typeof){case si:{var ve=iv(j,P.mode,L);return ve.ref=Xl(P,null,j),ve.return=P,ve}case Ir:{var de=ov(j,P.mode,L);return de.return=P,de}case He:{var De=j._payload,Le=j._init;return k(P,Le(De),L)}}if(nt(j)||Di(j)){var ht=Ma(j,P.mode,L,null);return ht.return=P,ht}Gc(P,j)}return typeof j=="function"&&Wc(P),null}function D(P,j,L,J){var ve=j!==null?j.key:null;if(typeof L=="string"&&L!==""||typeof L=="number")return ve!==null?null:m(P,j,""+L,J);if(typeof L=="object"&&L!==null){switch(L.$$typeof){case si:return L.key===ve?g(P,j,L,J):null;case Ir:return L.key===ve?R(P,j,L,J):null;case He:{var de=L._payload,De=L._init;return D(P,j,De(de),J)}}if(nt(L)||Di(L))return ve!==null?null:S(P,j,L,J,null);Gc(P,L)}return typeof L=="function"&&Wc(P),null}function z(P,j,L,J,ve){if(typeof J=="string"&&J!==""||typeof J=="number"){var de=P.get(L)||null;return m(j,de,""+J,ve)}if(typeof J=="object"&&J!==null){switch(J.$$typeof){case si:{var De=P.get(J.key===null?L:J.key)||null;return g(j,De,J,ve)}case Ir:{var Le=P.get(J.key===null?L:J.key)||null;return R(j,Le,J,ve)}case He:var ht=J._payload,et=J._init;return z(P,j,L,et(ht),ve)}if(nt(J)||Di(J)){var jt=P.get(L)||null;return S(j,jt,J,ve,null)}Gc(j,J)}return typeof J=="function"&&Wc(j),null}function B(P,j,L){{if(typeof P!="object"||P===null)return j;switch(P.$$typeof){case si:case Ir:i0(P,L);var J=P.key;if(typeof J!="string")break;if(j===null){j=new Set,j.add(J);break}if(!j.has(J)){j.add(J);break}u("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",J);break;case He:var ve=P._payload,de=P._init;B(de(ve),j,L);break}}return j}function I(P,j,L,J){for(var ve=null,de=0;de<L.length;de++){var De=L[de];ve=B(De,ve,P)}for(var Le=null,ht=null,et=j,jt=0,tt=0,Ft=null;et!==null&&tt<L.length;tt++){et.index>tt?(Ft=et,et=null):Ft=et.sibling;var Vn=D(P,et,L[tt],J);if(Vn===null){et===null&&(et=Ft);break}e&&et&&Vn.alternate===null&&t(P,et),jt=s(Vn,jt,tt),ht===null?Le=Vn:ht.sibling=Vn,ht=Vn,et=Ft}if(tt===L.length){if(n(P,et),Rn()){var An=tt;so(P,An)}return Le}if(et===null){for(;tt<L.length;tt++){var br=k(P,L[tt],J);br!==null&&(jt=s(br,jt,tt),ht===null?Le=br:ht.sibling=br,ht=br)}if(Rn()){var Kn=tt;so(P,Kn)}return Le}for(var Zn=r(P,et);tt<L.length;tt++){var In=z(Zn,P,tt,L[tt],J);In!==null&&(e&&In.alternate!==null&&Zn.delete(In.key===null?tt:In.key),jt=s(In,jt,tt),ht===null?Le=In:ht.sibling=In,ht=In)}if(e&&Zn.forEach(function(Cs){return t(P,Cs)}),Rn()){var ea=tt;so(P,ea)}return Le}function fe(P,j,L,J){var ve=Di(L);if(typeof ve!="function")throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");{typeof Symbol=="function"&&L[Symbol.toStringTag]==="Generator"&&(sm||u("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),sm=!0),L.entries===ve&&(om||u("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),om=!0);var de=ve.call(L);if(de)for(var De=null,Le=de.next();!Le.done;Le=de.next()){var ht=Le.value;De=B(ht,De,P)}}var et=ve.call(L);if(et==null)throw new Error("An iterable object provided no iterator.");for(var jt=null,tt=null,Ft=j,Vn=0,An=0,br=null,Kn=et.next();Ft!==null&&!Kn.done;An++,Kn=et.next()){Ft.index>An?(br=Ft,Ft=null):br=Ft.sibling;var Zn=D(P,Ft,Kn.value,J);if(Zn===null){Ft===null&&(Ft=br);break}e&&Ft&&Zn.alternate===null&&t(P,Ft),Vn=s(Zn,Vn,An),tt===null?jt=Zn:tt.sibling=Zn,tt=Zn,Ft=br}if(Kn.done){if(n(P,Ft),Rn()){var In=An;so(P,In)}return jt}if(Ft===null){for(;!Kn.done;An++,Kn=et.next()){var ea=k(P,Kn.value,J);ea!==null&&(Vn=s(ea,Vn,An),tt===null?jt=ea:tt.sibling=ea,tt=ea)}if(Rn()){var Cs=An;so(P,Cs)}return jt}for(var Su=r(P,Ft);!Kn.done;An++,Kn=et.next()){var Ei=z(Su,P,An,Kn.value,J);Ei!==null&&(e&&Ei.alternate!==null&&Su.delete(Ei.key===null?An:Ei.key),Vn=s(Ei,Vn,An),tt===null?jt=Ei:tt.sibling=Ei,tt=Ei)}if(e&&Su.forEach(function(nD){return t(P,nD)}),Rn()){var tD=An;so(P,tD)}return jt}function Ce(P,j,L,J){if(j!==null&&j.tag===M){n(P,j.sibling);var ve=a(j,L);return ve.return=P,ve}n(P,j);var de=av(L,P.mode,J);return de.return=P,de}function _e(P,j,L,J){for(var ve=L.key,de=j;de!==null;){if(de.key===ve){var De=L.type;if(De===A){if(de.tag===G){n(P,de.sibling);var Le=a(de,L.props.children);return Le.return=P,Le._debugSource=L._source,Le._debugOwner=L._owner,Le}}else if(de.elementType===De||fb(de,L)||typeof De=="object"&&De!==null&&De.$$typeof===He&&a0(De)===de.type){n(P,de.sibling);var ht=a(de,L.props);return ht.ref=Xl(P,de,L),ht.return=P,ht._debugSource=L._source,ht._debugOwner=L._owner,ht}n(P,de);break}else t(P,de);de=de.sibling}if(L.type===A){var et=Ma(L.props.children,P.mode,J,L.key);return et.return=P,et}else{var jt=iv(L,P.mode,J);return jt.ref=Xl(P,j,L),jt.return=P,jt}}function Ke(P,j,L,J){for(var ve=L.key,de=j;de!==null;){if(de.key===ve)if(de.tag===T&&de.stateNode.containerInfo===L.containerInfo&&de.stateNode.implementation===L.implementation){n(P,de.sibling);var De=a(de,L.children||[]);return De.return=P,De}else{n(P,de);break}else t(P,de);de=de.sibling}var Le=ov(L,P.mode,J);return Le.return=P,Le}function Ge(P,j,L,J){var ve=typeof L=="object"&&L!==null&&L.type===A&&L.key===null;if(ve&&(L=L.props.children),typeof L=="object"&&L!==null){switch(L.$$typeof){case si:return f(_e(P,j,L,J));case Ir:return f(Ke(P,j,L,J));case He:var de=L._payload,De=L._init;return Ge(P,j,De(de),J)}if(nt(L))return I(P,j,L,J);if(Di(L))return fe(P,j,L,J);Gc(P,L)}return typeof L=="string"&&L!==""||typeof L=="number"?f(Ce(P,j,""+L,J)):(typeof L=="function"&&Wc(P),n(P,j))}return Ge}var ss=o0(!0),s0=o0(!1);function Ow(e,t){if(e!==null&&t.child!==e.child)throw new Error("Resuming work not yet implemented.");if(t.child!==null){var n=t.child,r=Eo(n,n.pendingProps);for(t.child=r,r.return=t;n.sibling!==null;)n=n.sibling,r=r.sibling=Eo(n,n.pendingProps),r.return=t;r.sibling=null}}function kw(e,t){for(var n=e.child;n!==null;)xA(n,t),n=n.sibling}var fm=xa(null),dm;dm={};var Xc=null,ls=null,hm=null,Yc=!1;function $c(){Xc=null,ls=null,hm=null,Yc=!1}function l0(){Yc=!0}function u0(){Yc=!1}function c0(e,t,n){Bn(fm,t._currentValue,e),t._currentValue=n,t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==dm&&u("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=dm}function mm(e,t){var n=fm.current;Fn(fm,t),e._currentValue=n}function pm(e,t,n){for(var r=e;r!==null;){var a=r.alternate;if(Xo(r.childLanes,t)?a!==null&&!Xo(a.childLanes,t)&&(a.childLanes=Ve(a.childLanes,t)):(r.childLanes=Ve(r.childLanes,t),a!==null&&(a.childLanes=Ve(a.childLanes,t))),r===n)break;r=r.return}r!==n&&u("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function Mw(e,t,n){Pw(e,t,n)}function Pw(e,t,n){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var a=void 0,s=r.dependencies;if(s!==null){a=r.child;for(var f=s.firstContext;f!==null;){if(f.context===t){if(r.tag===p){var m=cl(n),g=$i(Et,m);g.tag=Qc;var R=r.updateQueue;if(R!==null){var S=R.shared,k=S.pending;k===null?g.next=g:(g.next=k.next,k.next=g),S.pending=g}}r.lanes=Ve(r.lanes,n);var D=r.alternate;D!==null&&(D.lanes=Ve(D.lanes,n)),pm(r.return,n,e),s.lanes=Ve(s.lanes,n);break}f=f.next}}else if(r.tag===O)a=r.type===e.type?null:r.child;else if(r.tag===K){var z=r.return;if(z===null)throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");z.lanes=Ve(z.lanes,n);var B=z.alternate;B!==null&&(B.lanes=Ve(B.lanes,n)),pm(z,n,e),a=r.sibling}else a=r.child;if(a!==null)a.return=r;else for(a=r;a!==null;){if(a===e){a=null;break}var I=a.sibling;if(I!==null){I.return=a.return,a=I;break}a=a.return}r=a}}function us(e,t){Xc=e,ls=null,hm=null;var n=e.dependencies;if(n!==null){var r=n.firstContext;r!==null&&(mr(n.lanes,t)&&su(),n.firstContext=null)}}function $t(e){Yc&&u("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=e._currentValue;if(hm!==e){var n={context:e,memoizedValue:t,next:null};if(ls===null){if(Xc===null)throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");ls=n,Xc.dependencies={lanes:q,firstContext:n}}else ls=ls.next=n}return t}var ho=null;function vm(e){ho===null?ho=[e]:ho.push(e)}function Lw(){if(ho!==null){for(var e=0;e<ho.length;e++){var t=ho[e],n=t.interleaved;if(n!==null){t.interleaved=null;var r=n.next,a=t.pending;if(a!==null){var s=a.next;a.next=r,n.next=s}t.pending=n}}ho=null}}function f0(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,vm(t)):(n.next=a.next,a.next=n),t.interleaved=n,qc(e,r)}function zw(e,t,n,r){var a=t.interleaved;a===null?(n.next=n,vm(t)):(n.next=a.next,a.next=n),t.interleaved=n}function Fw(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,vm(t)):(n.next=a.next,a.next=n),t.interleaved=n,qc(e,r)}function ar(e,t){return qc(e,t)}var Bw=qc;function qc(e,t){e.lanes=Ve(e.lanes,t);var n=e.alternate;n!==null&&(n.lanes=Ve(n.lanes,t)),n===null&&(e.flags&(Yt|Fi))!==Ne&&sb(e);for(var r=e,a=e.return;a!==null;)a.childLanes=Ve(a.childLanes,t),n=a.alternate,n!==null?n.childLanes=Ve(n.childLanes,t):(a.flags&(Yt|Fi))!==Ne&&sb(e),r=a,a=a.return;if(r.tag===w){var s=r.stateNode;return s}else return null}var d0=0,h0=1,Qc=2,gm=3,Kc=!1,ym,Zc;ym=!1,Zc=null;function xm(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:q},effects:null};e.updateQueue=t}function m0(e,t){var n=t.updateQueue,r=e.updateQueue;if(n===r){var a={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects};t.updateQueue=a}}function $i(e,t){var n={eventTime:e,lane:t,tag:d0,payload:null,callback:null,next:null};return n}function _a(e,t,n){var r=e.updateQueue;if(r===null)return null;var a=r.shared;if(Zc===a&&!ym&&(u("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),ym=!0),zN()){var s=a.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),a.pending=t,Bw(e,n)}else return Fw(e,a,t,n)}function Jc(e,t,n){var r=t.updateQueue;if(r!==null){var a=r.shared;if(Tg(n)){var s=a.lanes;s=Ag(s,e.pendingLanes);var f=Ve(s,n);a.lanes=f,fh(e,f)}}}function bm(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null){var a=r.updateQueue;if(n===a){var s=null,f=null,m=n.firstBaseUpdate;if(m!==null){var g=m;do{var R={eventTime:g.eventTime,lane:g.lane,tag:g.tag,payload:g.payload,callback:g.callback,next:null};f===null?s=f=R:(f.next=R,f=R),g=g.next}while(g!==null);f===null?s=f=t:(f.next=t,f=t)}else s=f=t;n={baseState:a.baseState,firstBaseUpdate:s,lastBaseUpdate:f,shared:a.shared,effects:a.effects},e.updateQueue=n;return}}var S=n.lastBaseUpdate;S===null?n.firstBaseUpdate=t:S.next=t,n.lastBaseUpdate=t}function Uw(e,t,n,r,a,s){switch(n.tag){case h0:{var f=n.payload;if(typeof f=="function"){l0();var m=f.call(s,r,a);{if(e.mode&zt){pn(!0);try{f.call(s,r,a)}finally{pn(!1)}}u0()}return m}return f}case gm:e.flags=e.flags&~Yn|rt;case d0:{var g=n.payload,R;if(typeof g=="function"){l0(),R=g.call(s,r,a);{if(e.mode&zt){pn(!0);try{g.call(s,r,a)}finally{pn(!1)}}u0()}}else R=g;return R==null?r:We({},r,R)}case Qc:return Kc=!0,r}return r}function ef(e,t,n,r){var a=e.updateQueue;Kc=!1,Zc=a.shared;var s=a.firstBaseUpdate,f=a.lastBaseUpdate,m=a.shared.pending;if(m!==null){a.shared.pending=null;var g=m,R=g.next;g.next=null,f===null?s=R:f.next=R,f=g;var S=e.alternate;if(S!==null){var k=S.updateQueue,D=k.lastBaseUpdate;D!==f&&(D===null?k.firstBaseUpdate=R:D.next=R,k.lastBaseUpdate=g)}}if(s!==null){var z=a.baseState,B=q,I=null,fe=null,Ce=null,_e=s;do{var Ke=_e.lane,Ge=_e.eventTime;if(Xo(r,Ke)){if(Ce!==null){var j={eventTime:Ge,lane:vn,tag:_e.tag,payload:_e.payload,callback:_e.callback,next:null};Ce=Ce.next=j}z=Uw(e,a,_e,z,t,n);var L=_e.callback;if(L!==null&&_e.lane!==vn){e.flags|=kd;var J=a.effects;J===null?a.effects=[_e]:J.push(_e)}}else{var P={eventTime:Ge,lane:Ke,tag:_e.tag,payload:_e.payload,callback:_e.callback,next:null};Ce===null?(fe=Ce=P,I=z):Ce=Ce.next=P,B=Ve(B,Ke)}if(_e=_e.next,_e===null){if(m=a.shared.pending,m===null)break;var ve=m,de=ve.next;ve.next=null,_e=de,a.lastBaseUpdate=ve,a.shared.pending=null}}while(!0);Ce===null&&(I=z),a.baseState=I,a.firstBaseUpdate=fe,a.lastBaseUpdate=Ce;var De=a.shared.interleaved;if(De!==null){var Le=De;do B=Ve(B,Le.lane),Le=Le.next;while(Le!==De)}else s===null&&(a.shared.lanes=q);xu(B),e.lanes=B,e.memoizedState=z}Zc=null}function Vw(e,t){if(typeof e!="function")throw new Error("Invalid argument passed as callback. Expected a function. Instead "+("received: "+e));e.call(t)}function p0(){Kc=!1}function tf(){return Kc}function v0(e,t,n){var r=t.effects;if(t.effects=null,r!==null)for(var a=0;a<r.length;a++){var s=r[a],f=s.callback;f!==null&&(s.callback=null,Vw(f,n))}}var Yl={},Sa=xa(Yl),$l=xa(Yl),nf=xa(Yl);function rf(e){if(e===Yl)throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function g0(){var e=rf(nf.current);return e}function Em(e,t){Bn(nf,t,e),Bn($l,e,e),Bn(Sa,Yl,e);var n=rC(t);Fn(Sa,e),Bn(Sa,n,e)}function cs(e){Fn(Sa,e),Fn($l,e),Fn(nf,e)}function Rm(){var e=rf(Sa.current);return e}function y0(e){rf(nf.current);var t=rf(Sa.current),n=iC(t,e.type);t!==n&&(Bn($l,e,e),Bn(Sa,n,e))}function _m(e){$l.current===e&&(Fn(Sa,e),Fn($l,e))}var Iw=0,x0=1,b0=1,ql=2,Qr=xa(Iw);function Sm(e,t){return(e&t)!==0}function fs(e){return e&x0}function Cm(e,t){return e&x0|t}function jw(e,t){return e|t}function Ca(e,t){Bn(Qr,t,e)}function ds(e){Fn(Qr,e)}function Hw(e,t){var n=e.memoizedState;return n!==null?n.dehydrated!==null:(e.memoizedProps,!0)}function af(e){for(var t=e;t!==null;){if(t.tag===V){var n=t.memoizedState;if(n!==null){var r=n.dehydrated;if(r===null||Fy(r)||Hh(r))return t}}else if(t.tag===pe&&t.memoizedProps.revealOrder!==void 0){var a=(t.flags&rt)!==Ne;if(a)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)return null;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var or=0,en=1,mi=2,tn=4,_n=8,wm=[];function Tm(){for(var e=0;e<wm.length;e++){var t=wm[e];t._workInProgressVersionPrimary=null}wm.length=0}function Gw(e,t){var n=t._getVersion,r=n(t._source);e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r)}var me=i.ReactCurrentDispatcher,Ql=i.ReactCurrentBatchConfig,Nm,hs;Nm=new Set;var mo=q,dt=null,nn=null,rn=null,of=!1,Kl=!1,Zl=0,Ww=0,Xw=25,W=null,Mr=null,wa=-1,Am=!1;function at(){{var e=W;Mr===null?Mr=[e]:Mr.push(e)}}function oe(){{var e=W;Mr!==null&&(wa++,Mr[wa]!==e&&Yw(e))}}function ms(e){e!=null&&!nt(e)&&u("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",W,typeof e)}function Yw(e){{var t=Be(dt);if(!Nm.has(t)&&(Nm.add(t),Mr!==null)){for(var n="",r=30,a=0;a<=wa;a++){for(var s=Mr[a],f=a===wa?e:s,m=a+1+". "+s;m.length<r;)m+=" ";m+=f+`
`,n+=m}u(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,n)}}}function Un(){throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function Dm(e,t){if(Am)return!1;if(t===null)return u("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",W),!1;e.length!==t.length&&u(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,W,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!gr(e[n],t[n]))return!1;return!0}function ps(e,t,n,r,a,s){mo=s,dt=t,Mr=e!==null?e._debugHookTypes:null,wa=-1,Am=e!==null&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=q,e!==null&&e.memoizedState!==null?me.current=j0:Mr!==null?me.current=I0:me.current=V0;var f=n(r,a);if(Kl){var m=0;do{if(Kl=!1,Zl=0,m>=Xw)throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");m+=1,Am=!1,nn=null,rn=null,t.updateQueue=null,wa=-1,me.current=H0,f=n(r,a)}while(Kl)}me.current=xf,t._debugHookTypes=Mr;var g=nn!==null&&nn.next!==null;if(mo=q,dt=null,nn=null,rn=null,W=null,Mr=null,wa=-1,e!==null&&(e.flags&Ui)!==(t.flags&Ui)&&(e.mode&qe)!==we&&u("Internal React error: Expected static flag was missing. Please notify the React team."),of=!1,g)throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return f}function vs(){var e=Zl!==0;return Zl=0,e}function E0(e,t,n){t.updateQueue=e.updateQueue,(t.mode&ci)!==we?t.flags&=~(Ju|Bi|Gr|Ze):t.flags&=~(Gr|Ze),e.lanes=oc(e.lanes,n)}function R0(){if(me.current=xf,of){for(var e=dt.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}of=!1}mo=q,dt=null,nn=null,rn=null,Mr=null,wa=-1,W=null,L0=!1,Kl=!1,Zl=0}function pi(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?dt.memoizedState=rn=e:rn=rn.next=e,rn}function Pr(){var e;if(nn===null){var t=dt.alternate;t!==null?e=t.memoizedState:e=null}else e=nn.next;var n;if(rn===null?n=dt.memoizedState:n=rn.next,n!==null)rn=n,n=rn.next,nn=e;else{if(e===null)throw new Error("Rendered more hooks than during the previous render.");nn=e;var r={memoizedState:nn.memoizedState,baseState:nn.baseState,baseQueue:nn.baseQueue,queue:nn.queue,next:null};rn===null?dt.memoizedState=rn=r:rn=rn.next=r}return rn}function _0(){return{lastEffect:null,stores:null}}function Om(e,t){return typeof t=="function"?t(e):t}function km(e,t,n){var r=pi(),a;n!==void 0?a=n(t):a=t,r.memoizedState=r.baseState=a;var s={pending:null,interleaved:null,lanes:q,dispatch:null,lastRenderedReducer:e,lastRenderedState:a};r.queue=s;var f=s.dispatch=Kw.bind(null,dt,s);return[r.memoizedState,f]}function Mm(e,t,n){var r=Pr(),a=r.queue;if(a===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");a.lastRenderedReducer=e;var s=nn,f=s.baseQueue,m=a.pending;if(m!==null){if(f!==null){var g=f.next,R=m.next;f.next=R,m.next=g}s.baseQueue!==f&&u("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),s.baseQueue=f=m,a.pending=null}if(f!==null){var S=f.next,k=s.baseState,D=null,z=null,B=null,I=S;do{var fe=I.lane;if(Xo(mo,fe)){if(B!==null){var _e={lane:vn,action:I.action,hasEagerState:I.hasEagerState,eagerState:I.eagerState,next:null};B=B.next=_e}if(I.hasEagerState)k=I.eagerState;else{var Ke=I.action;k=e(k,Ke)}}else{var Ce={lane:fe,action:I.action,hasEagerState:I.hasEagerState,eagerState:I.eagerState,next:null};B===null?(z=B=Ce,D=k):B=B.next=Ce,dt.lanes=Ve(dt.lanes,fe),xu(fe)}I=I.next}while(I!==null&&I!==S);B===null?D=k:B.next=z,gr(k,r.memoizedState)||su(),r.memoizedState=k,r.baseState=D,r.baseQueue=B,a.lastRenderedState=k}var Ge=a.interleaved;if(Ge!==null){var P=Ge;do{var j=P.lane;dt.lanes=Ve(dt.lanes,j),xu(j),P=P.next}while(P!==Ge)}else f===null&&(a.lanes=q);var L=a.dispatch;return[r.memoizedState,L]}function Pm(e,t,n){var r=Pr(),a=r.queue;if(a===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");a.lastRenderedReducer=e;var s=a.dispatch,f=a.pending,m=r.memoizedState;if(f!==null){a.pending=null;var g=f.next,R=g;do{var S=R.action;m=e(m,S),R=R.next}while(R!==g);gr(m,r.memoizedState)||su(),r.memoizedState=m,r.baseQueue===null&&(r.baseState=m),a.lastRenderedState=m}return[m,s]}function E3(e,t,n){}function R3(e,t,n){}function Lm(e,t,n){var r=dt,a=pi(),s,f=Rn();if(f){if(n===void 0)throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");s=n(),hs||s!==n()&&(u("The result of getServerSnapshot should be cached to avoid an infinite loop"),hs=!0)}else{if(s=t(),!hs){var m=t();gr(s,m)||(u("The result of getSnapshot should be cached to avoid an infinite loop"),hs=!0)}var g=Bf();if(g===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");ac(g,mo)||S0(r,t,s)}a.memoizedState=s;var R={value:s,getSnapshot:t};return a.queue=R,ff(w0.bind(null,r,R,e),[e]),r.flags|=Gr,Jl(en|_n,C0.bind(null,r,R,s,t),void 0,null),s}function sf(e,t,n){var r=dt,a=Pr(),s=t();if(!hs){var f=t();gr(s,f)||(u("The result of getSnapshot should be cached to avoid an infinite loop"),hs=!0)}var m=a.memoizedState,g=!gr(m,s);g&&(a.memoizedState=s,su());var R=a.queue;if(tu(w0.bind(null,r,R,e),[e]),R.getSnapshot!==t||g||rn!==null&&rn.memoizedState.tag&en){r.flags|=Gr,Jl(en|_n,C0.bind(null,r,R,s,t),void 0,null);var S=Bf();if(S===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");ac(S,mo)||S0(r,t,s)}return s}function S0(e,t,n){e.flags|=Zu;var r={getSnapshot:t,value:n},a=dt.updateQueue;if(a===null)a=_0(),dt.updateQueue=a,a.stores=[r];else{var s=a.stores;s===null?a.stores=[r]:s.push(r)}}function C0(e,t,n,r){t.value=n,t.getSnapshot=r,T0(t)&&N0(e)}function w0(e,t,n){var r=function(){T0(t)&&N0(e)};return n(r)}function T0(e){var t=e.getSnapshot,n=e.value;try{var r=t();return!gr(n,r)}catch{return!0}}function N0(e){var t=ar(e,Me);t!==null&&ln(t,e,Me,Et)}function lf(e){var t=pi();typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:q,dispatch:null,lastRenderedReducer:Om,lastRenderedState:e};t.queue=n;var r=n.dispatch=Zw.bind(null,dt,n);return[t.memoizedState,r]}function zm(e){return Mm(Om)}function Fm(e){return Pm(Om)}function Jl(e,t,n,r){var a={tag:e,create:t,destroy:n,deps:r,next:null},s=dt.updateQueue;if(s===null)s=_0(),dt.updateQueue=s,s.lastEffect=a.next=a;else{var f=s.lastEffect;if(f===null)s.lastEffect=a.next=a;else{var m=f.next;f.next=a,a.next=m,s.lastEffect=a}}return a}function Bm(e){var t=pi();{var n={current:e};return t.memoizedState=n,n}}function uf(e){var t=Pr();return t.memoizedState}function eu(e,t,n,r){var a=pi(),s=r===void 0?null:r;dt.flags|=e,a.memoizedState=Jl(en|t,n,void 0,s)}function cf(e,t,n,r){var a=Pr(),s=r===void 0?null:r,f=void 0;if(nn!==null){var m=nn.memoizedState;if(f=m.destroy,s!==null){var g=m.deps;if(Dm(s,g)){a.memoizedState=Jl(t,n,f,s);return}}}dt.flags|=e,a.memoizedState=Jl(en|t,n,f,s)}function ff(e,t){return(dt.mode&ci)!==we?eu(Ju|Gr|Ld,_n,e,t):eu(Gr|Ld,_n,e,t)}function tu(e,t){return cf(Gr,_n,e,t)}function Um(e,t){return eu(Ze,mi,e,t)}function df(e,t){return cf(Ze,mi,e,t)}function Vm(e,t){var n=Ze;return n|=Qa,(dt.mode&ci)!==we&&(n|=Bi),eu(n,tn,e,t)}function hf(e,t){return cf(Ze,tn,e,t)}function A0(e,t){if(typeof t=="function"){var n=t,r=e();return n(r),function(){n(null)}}else if(t!=null){var a=t;a.hasOwnProperty("current")||u("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(a).join(", ")+"}");var s=e();return a.current=s,function(){a.current=null}}}function Im(e,t,n){typeof t!="function"&&u("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var r=n!=null?n.concat([e]):null,a=Ze;return a|=Qa,(dt.mode&ci)!==we&&(a|=Bi),eu(a,tn,A0.bind(null,t,e),r)}function mf(e,t,n){typeof t!="function"&&u("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var r=n!=null?n.concat([e]):null;return cf(Ze,tn,A0.bind(null,t,e),r)}function $w(e,t){}var pf=$w;function jm(e,t){var n=pi(),r=t===void 0?null:t;return n.memoizedState=[e,r],e}function vf(e,t){var n=Pr(),r=t===void 0?null:t,a=n.memoizedState;if(a!==null&&r!==null){var s=a[1];if(Dm(r,s))return a[0]}return n.memoizedState=[e,r],e}function Hm(e,t){var n=pi(),r=t===void 0?null:t,a=e();return n.memoizedState=[a,r],a}function gf(e,t){var n=Pr(),r=t===void 0?null:t,a=n.memoizedState;if(a!==null&&r!==null){var s=a[1];if(Dm(r,s))return a[0]}var f=e();return n.memoizedState=[f,r],f}function Gm(e){var t=pi();return t.memoizedState=e,e}function D0(e){var t=Pr(),n=nn,r=n.memoizedState;return k0(t,r,e)}function O0(e){var t=Pr();if(nn===null)return t.memoizedState=e,e;var n=nn.memoizedState;return k0(t,n,e)}function k0(e,t,n){var r=!M1(mo);if(r){if(!gr(n,t)){var a=Ng();dt.lanes=Ve(dt.lanes,a),xu(a),e.baseState=!0}return t}else return e.baseState&&(e.baseState=!1,su()),e.memoizedState=n,n}function qw(e,t,n){var r=Xr();gn(j1(r,Ii)),e(!0);var a=Ql.transition;Ql.transition={};var s=Ql.transition;Ql.transition._updatedFibers=new Set;try{e(!1),t()}finally{if(gn(r),Ql.transition=a,a===null&&s._updatedFibers){var f=s._updatedFibers.size;f>10&&d("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),s._updatedFibers.clear()}}}function Wm(){var e=lf(!1),t=e[0],n=e[1],r=qw.bind(null,n),a=pi();return a.memoizedState=r,[t,r]}function M0(){var e=zm(),t=e[0],n=Pr(),r=n.memoizedState;return[t,r]}function P0(){var e=Fm(),t=e[0],n=Pr(),r=n.memoizedState;return[t,r]}var L0=!1;function Qw(){return L0}function Xm(){var e=pi(),t=Bf(),n=t.identifierPrefix,r;if(Rn()){var a=hw();r=":"+n+"R"+a;var s=Zl++;s>0&&(r+="H"+s.toString(32)),r+=":"}else{var f=Ww++;r=":"+n+"r"+f.toString(32)+":"}return e.memoizedState=r,r}function yf(){var e=Pr(),t=e.memoizedState;return t}function Kw(e,t,n){typeof arguments[3]=="function"&&u("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=Oa(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(z0(e))F0(t,a);else{var s=f0(e,t,a,r);if(s!==null){var f=Qn();ln(s,e,r,f),B0(s,t,r)}}U0(e,r)}function Zw(e,t,n){typeof arguments[3]=="function"&&u("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=Oa(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(z0(e))F0(t,a);else{var s=e.alternate;if(e.lanes===q&&(s===null||s.lanes===q)){var f=t.lastRenderedReducer;if(f!==null){var m;m=me.current,me.current=Kr;try{var g=t.lastRenderedState,R=f(g,n);if(a.hasEagerState=!0,a.eagerState=R,gr(R,g)){zw(e,t,a,r);return}}catch{}finally{me.current=m}}}var S=f0(e,t,a,r);if(S!==null){var k=Qn();ln(S,e,r,k),B0(S,t,r)}}U0(e,r)}function z0(e){var t=e.alternate;return e===dt||t!==null&&t===dt}function F0(e,t){Kl=of=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function B0(e,t,n){if(Tg(n)){var r=t.lanes;r=Ag(r,e.pendingLanes);var a=Ve(r,n);t.lanes=a,fh(e,a)}}function U0(e,t,n){Vd(e,t)}var xf={readContext:$t,useCallback:Un,useContext:Un,useEffect:Un,useImperativeHandle:Un,useInsertionEffect:Un,useLayoutEffect:Un,useMemo:Un,useReducer:Un,useRef:Un,useState:Un,useDebugValue:Un,useDeferredValue:Un,useTransition:Un,useMutableSource:Un,useSyncExternalStore:Un,useId:Un,unstable_isNewReconciler:Xe},V0=null,I0=null,j0=null,H0=null,vi=null,Kr=null,bf=null;{var Ym=function(){u("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},Pe=function(){u("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};V0={readContext:function(e){return $t(e)},useCallback:function(e,t){return W="useCallback",at(),ms(t),jm(e,t)},useContext:function(e){return W="useContext",at(),$t(e)},useEffect:function(e,t){return W="useEffect",at(),ms(t),ff(e,t)},useImperativeHandle:function(e,t,n){return W="useImperativeHandle",at(),ms(n),Im(e,t,n)},useInsertionEffect:function(e,t){return W="useInsertionEffect",at(),ms(t),Um(e,t)},useLayoutEffect:function(e,t){return W="useLayoutEffect",at(),ms(t),Vm(e,t)},useMemo:function(e,t){W="useMemo",at(),ms(t);var n=me.current;me.current=vi;try{return Hm(e,t)}finally{me.current=n}},useReducer:function(e,t,n){W="useReducer",at();var r=me.current;me.current=vi;try{return km(e,t,n)}finally{me.current=r}},useRef:function(e){return W="useRef",at(),Bm(e)},useState:function(e){W="useState",at();var t=me.current;me.current=vi;try{return lf(e)}finally{me.current=t}},useDebugValue:function(e,t){return W="useDebugValue",at(),void 0},useDeferredValue:function(e){return W="useDeferredValue",at(),Gm(e)},useTransition:function(){return W="useTransition",at(),Wm()},useMutableSource:function(e,t,n){return W="useMutableSource",at(),void 0},useSyncExternalStore:function(e,t,n){return W="useSyncExternalStore",at(),Lm(e,t,n)},useId:function(){return W="useId",at(),Xm()},unstable_isNewReconciler:Xe},I0={readContext:function(e){return $t(e)},useCallback:function(e,t){return W="useCallback",oe(),jm(e,t)},useContext:function(e){return W="useContext",oe(),$t(e)},useEffect:function(e,t){return W="useEffect",oe(),ff(e,t)},useImperativeHandle:function(e,t,n){return W="useImperativeHandle",oe(),Im(e,t,n)},useInsertionEffect:function(e,t){return W="useInsertionEffect",oe(),Um(e,t)},useLayoutEffect:function(e,t){return W="useLayoutEffect",oe(),Vm(e,t)},useMemo:function(e,t){W="useMemo",oe();var n=me.current;me.current=vi;try{return Hm(e,t)}finally{me.current=n}},useReducer:function(e,t,n){W="useReducer",oe();var r=me.current;me.current=vi;try{return km(e,t,n)}finally{me.current=r}},useRef:function(e){return W="useRef",oe(),Bm(e)},useState:function(e){W="useState",oe();var t=me.current;me.current=vi;try{return lf(e)}finally{me.current=t}},useDebugValue:function(e,t){return W="useDebugValue",oe(),void 0},useDeferredValue:function(e){return W="useDeferredValue",oe(),Gm(e)},useTransition:function(){return W="useTransition",oe(),Wm()},useMutableSource:function(e,t,n){return W="useMutableSource",oe(),void 0},useSyncExternalStore:function(e,t,n){return W="useSyncExternalStore",oe(),Lm(e,t,n)},useId:function(){return W="useId",oe(),Xm()},unstable_isNewReconciler:Xe},j0={readContext:function(e){return $t(e)},useCallback:function(e,t){return W="useCallback",oe(),vf(e,t)},useContext:function(e){return W="useContext",oe(),$t(e)},useEffect:function(e,t){return W="useEffect",oe(),tu(e,t)},useImperativeHandle:function(e,t,n){return W="useImperativeHandle",oe(),mf(e,t,n)},useInsertionEffect:function(e,t){return W="useInsertionEffect",oe(),df(e,t)},useLayoutEffect:function(e,t){return W="useLayoutEffect",oe(),hf(e,t)},useMemo:function(e,t){W="useMemo",oe();var n=me.current;me.current=Kr;try{return gf(e,t)}finally{me.current=n}},useReducer:function(e,t,n){W="useReducer",oe();var r=me.current;me.current=Kr;try{return Mm(e,t,n)}finally{me.current=r}},useRef:function(e){return W="useRef",oe(),uf()},useState:function(e){W="useState",oe();var t=me.current;me.current=Kr;try{return zm(e)}finally{me.current=t}},useDebugValue:function(e,t){return W="useDebugValue",oe(),pf()},useDeferredValue:function(e){return W="useDeferredValue",oe(),D0(e)},useTransition:function(){return W="useTransition",oe(),M0()},useMutableSource:function(e,t,n){return W="useMutableSource",oe(),void 0},useSyncExternalStore:function(e,t,n){return W="useSyncExternalStore",oe(),sf(e,t)},useId:function(){return W="useId",oe(),yf()},unstable_isNewReconciler:Xe},H0={readContext:function(e){return $t(e)},useCallback:function(e,t){return W="useCallback",oe(),vf(e,t)},useContext:function(e){return W="useContext",oe(),$t(e)},useEffect:function(e,t){return W="useEffect",oe(),tu(e,t)},useImperativeHandle:function(e,t,n){return W="useImperativeHandle",oe(),mf(e,t,n)},useInsertionEffect:function(e,t){return W="useInsertionEffect",oe(),df(e,t)},useLayoutEffect:function(e,t){return W="useLayoutEffect",oe(),hf(e,t)},useMemo:function(e,t){W="useMemo",oe();var n=me.current;me.current=bf;try{return gf(e,t)}finally{me.current=n}},useReducer:function(e,t,n){W="useReducer",oe();var r=me.current;me.current=bf;try{return Pm(e,t,n)}finally{me.current=r}},useRef:function(e){return W="useRef",oe(),uf()},useState:function(e){W="useState",oe();var t=me.current;me.current=bf;try{return Fm(e)}finally{me.current=t}},useDebugValue:function(e,t){return W="useDebugValue",oe(),pf()},useDeferredValue:function(e){return W="useDeferredValue",oe(),O0(e)},useTransition:function(){return W="useTransition",oe(),P0()},useMutableSource:function(e,t,n){return W="useMutableSource",oe(),void 0},useSyncExternalStore:function(e,t,n){return W="useSyncExternalStore",oe(),sf(e,t)},useId:function(){return W="useId",oe(),yf()},unstable_isNewReconciler:Xe},vi={readContext:function(e){return Ym(),$t(e)},useCallback:function(e,t){return W="useCallback",Pe(),at(),jm(e,t)},useContext:function(e){return W="useContext",Pe(),at(),$t(e)},useEffect:function(e,t){return W="useEffect",Pe(),at(),ff(e,t)},useImperativeHandle:function(e,t,n){return W="useImperativeHandle",Pe(),at(),Im(e,t,n)},useInsertionEffect:function(e,t){return W="useInsertionEffect",Pe(),at(),Um(e,t)},useLayoutEffect:function(e,t){return W="useLayoutEffect",Pe(),at(),Vm(e,t)},useMemo:function(e,t){W="useMemo",Pe(),at();var n=me.current;me.current=vi;try{return Hm(e,t)}finally{me.current=n}},useReducer:function(e,t,n){W="useReducer",Pe(),at();var r=me.current;me.current=vi;try{return km(e,t,n)}finally{me.current=r}},useRef:function(e){return W="useRef",Pe(),at(),Bm(e)},useState:function(e){W="useState",Pe(),at();var t=me.current;me.current=vi;try{return lf(e)}finally{me.current=t}},useDebugValue:function(e,t){return W="useDebugValue",Pe(),at(),void 0},useDeferredValue:function(e){return W="useDeferredValue",Pe(),at(),Gm(e)},useTransition:function(){return W="useTransition",Pe(),at(),Wm()},useMutableSource:function(e,t,n){return W="useMutableSource",Pe(),at(),void 0},useSyncExternalStore:function(e,t,n){return W="useSyncExternalStore",Pe(),at(),Lm(e,t,n)},useId:function(){return W="useId",Pe(),at(),Xm()},unstable_isNewReconciler:Xe},Kr={readContext:function(e){return Ym(),$t(e)},useCallback:function(e,t){return W="useCallback",Pe(),oe(),vf(e,t)},useContext:function(e){return W="useContext",Pe(),oe(),$t(e)},useEffect:function(e,t){return W="useEffect",Pe(),oe(),tu(e,t)},useImperativeHandle:function(e,t,n){return W="useImperativeHandle",Pe(),oe(),mf(e,t,n)},useInsertionEffect:function(e,t){return W="useInsertionEffect",Pe(),oe(),df(e,t)},useLayoutEffect:function(e,t){return W="useLayoutEffect",Pe(),oe(),hf(e,t)},useMemo:function(e,t){W="useMemo",Pe(),oe();var n=me.current;me.current=Kr;try{return gf(e,t)}finally{me.current=n}},useReducer:function(e,t,n){W="useReducer",Pe(),oe();var r=me.current;me.current=Kr;try{return Mm(e,t,n)}finally{me.current=r}},useRef:function(e){return W="useRef",Pe(),oe(),uf()},useState:function(e){W="useState",Pe(),oe();var t=me.current;me.current=Kr;try{return zm(e)}finally{me.current=t}},useDebugValue:function(e,t){return W="useDebugValue",Pe(),oe(),pf()},useDeferredValue:function(e){return W="useDeferredValue",Pe(),oe(),D0(e)},useTransition:function(){return W="useTransition",Pe(),oe(),M0()},useMutableSource:function(e,t,n){return W="useMutableSource",Pe(),oe(),void 0},useSyncExternalStore:function(e,t,n){return W="useSyncExternalStore",Pe(),oe(),sf(e,t)},useId:function(){return W="useId",Pe(),oe(),yf()},unstable_isNewReconciler:Xe},bf={readContext:function(e){return Ym(),$t(e)},useCallback:function(e,t){return W="useCallback",Pe(),oe(),vf(e,t)},useContext:function(e){return W="useContext",Pe(),oe(),$t(e)},useEffect:function(e,t){return W="useEffect",Pe(),oe(),tu(e,t)},useImperativeHandle:function(e,t,n){return W="useImperativeHandle",Pe(),oe(),mf(e,t,n)},useInsertionEffect:function(e,t){return W="useInsertionEffect",Pe(),oe(),df(e,t)},useLayoutEffect:function(e,t){return W="useLayoutEffect",Pe(),oe(),hf(e,t)},useMemo:function(e,t){W="useMemo",Pe(),oe();var n=me.current;me.current=Kr;try{return gf(e,t)}finally{me.current=n}},useReducer:function(e,t,n){W="useReducer",Pe(),oe();var r=me.current;me.current=Kr;try{return Pm(e,t,n)}finally{me.current=r}},useRef:function(e){return W="useRef",Pe(),oe(),uf()},useState:function(e){W="useState",Pe(),oe();var t=me.current;me.current=Kr;try{return Fm(e)}finally{me.current=t}},useDebugValue:function(e,t){return W="useDebugValue",Pe(),oe(),pf()},useDeferredValue:function(e){return W="useDeferredValue",Pe(),oe(),O0(e)},useTransition:function(){return W="useTransition",Pe(),oe(),P0()},useMutableSource:function(e,t,n){return W="useMutableSource",Pe(),oe(),void 0},useSyncExternalStore:function(e,t,n){return W="useSyncExternalStore",Pe(),oe(),sf(e,t)},useId:function(){return W="useId",Pe(),oe(),yf()},unstable_isNewReconciler:Xe}}var Ta=l.unstable_now,G0=0,Ef=-1,nu=-1,Rf=-1,$m=!1,_f=!1;function W0(){return $m}function Jw(){_f=!0}function eT(){$m=!1,_f=!1}function tT(){$m=_f,_f=!1}function X0(){return G0}function Y0(){G0=Ta()}function qm(e){nu=Ta(),e.actualStartTime<0&&(e.actualStartTime=Ta())}function $0(e){nu=-1}function Sf(e,t){if(nu>=0){var n=Ta()-nu;e.actualDuration+=n,t&&(e.selfBaseDuration=n),nu=-1}}function gi(e){if(Ef>=0){var t=Ta()-Ef;Ef=-1;for(var n=e.return;n!==null;){switch(n.tag){case w:var r=n.stateNode;r.effectDuration+=t;return;case ae:var a=n.stateNode;a.effectDuration+=t;return}n=n.return}}}function Qm(e){if(Rf>=0){var t=Ta()-Rf;Rf=-1;for(var n=e.return;n!==null;){switch(n.tag){case w:var r=n.stateNode;r!==null&&(r.passiveEffectDuration+=t);return;case ae:var a=n.stateNode;a!==null&&(a.passiveEffectDuration+=t);return}n=n.return}}}function yi(){Ef=Ta()}function Km(){Rf=Ta()}function Zm(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function Zr(e,t){if(e&&e.defaultProps){var n=We({},t),r=e.defaultProps;for(var a in r)n[a]===void 0&&(n[a]=r[a]);return n}return t}var Jm={},ep,tp,np,rp,ip,q0,Cf,ap,op,sp,ru;{ep=new Set,tp=new Set,np=new Set,rp=new Set,ap=new Set,ip=new Set,op=new Set,sp=new Set,ru=new Set;var Q0=new Set;Cf=function(e,t){if(!(e===null||typeof e=="function")){var n=t+"_"+e;Q0.has(n)||(Q0.add(n),u("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},q0=function(e,t){if(t===void 0){var n=Je(e)||"Component";ip.has(n)||(ip.add(n),u("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},Object.defineProperty(Jm,"_processChildContext",{enumerable:!1,value:function(){throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(Jm)}function lp(e,t,n,r){var a=e.memoizedState,s=n(r,a);{if(e.mode&zt){pn(!0);try{s=n(r,a)}finally{pn(!1)}}q0(t,s)}var f=s==null?a:We({},a,s);if(e.memoizedState=f,e.lanes===q){var m=e.updateQueue;m.baseState=f}}var up={isMounted:XR,enqueueSetState:function(e,t,n){var r=Bo(e),a=Qn(),s=Oa(r),f=$i(a,s);f.payload=t,n!=null&&(Cf(n,"setState"),f.callback=n);var m=_a(r,f,s);m!==null&&(ln(m,r,s,a),Jc(m,r,s)),Vd(r,s)},enqueueReplaceState:function(e,t,n){var r=Bo(e),a=Qn(),s=Oa(r),f=$i(a,s);f.tag=h0,f.payload=t,n!=null&&(Cf(n,"replaceState"),f.callback=n);var m=_a(r,f,s);m!==null&&(ln(m,r,s,a),Jc(m,r,s)),Vd(r,s)},enqueueForceUpdate:function(e,t){var n=Bo(e),r=Qn(),a=Oa(n),s=$i(r,a);s.tag=Qc,t!=null&&(Cf(t,"forceUpdate"),s.callback=t);var f=_a(n,s,a);f!==null&&(ln(f,n,a,r),Jc(f,n,a)),_1(n,a)}};function K0(e,t,n,r,a,s,f){var m=e.stateNode;if(typeof m.shouldComponentUpdate=="function"){var g=m.shouldComponentUpdate(r,s,f);{if(e.mode&zt){pn(!0);try{g=m.shouldComponentUpdate(r,s,f)}finally{pn(!1)}}g===void 0&&u("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",Je(t)||"Component")}return g}return t.prototype&&t.prototype.isPureReactComponent?!Cl(n,r)||!Cl(a,s):!0}function nT(e,t,n){var r=e.stateNode;{var a=Je(t)||"Component",s=r.render;s||(t.prototype&&typeof t.prototype.render=="function"?u("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",a):u("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",a)),r.getInitialState&&!r.getInitialState.isReactClassApproved&&!r.state&&u("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",a),r.getDefaultProps&&!r.getDefaultProps.isReactClassApproved&&u("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",a),r.propTypes&&u("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",a),r.contextType&&u("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",a),t.childContextTypes&&!ru.has(t)&&(e.mode&zt)===we&&(ru.add(t),u(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`,a)),t.contextTypes&&!ru.has(t)&&(e.mode&zt)===we&&(ru.add(t),u(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`,a)),r.contextTypes&&u("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",a),t.contextType&&t.contextTypes&&!op.has(t)&&(op.add(t),u("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",a)),typeof r.componentShouldUpdate=="function"&&u("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",a),t.prototype&&t.prototype.isPureReactComponent&&typeof r.shouldComponentUpdate<"u"&&u("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",Je(t)||"A pure component"),typeof r.componentDidUnmount=="function"&&u("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",a),typeof r.componentDidReceiveProps=="function"&&u("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",a),typeof r.componentWillRecieveProps=="function"&&u("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",a),typeof r.UNSAFE_componentWillRecieveProps=="function"&&u("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",a);var f=r.props!==n;r.props!==void 0&&f&&u("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",a,a),r.defaultProps&&u("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",a,a),typeof r.getSnapshotBeforeUpdate=="function"&&typeof r.componentDidUpdate!="function"&&!np.has(t)&&(np.add(t),u("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",Je(t))),typeof r.getDerivedStateFromProps=="function"&&u("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",a),typeof r.getDerivedStateFromError=="function"&&u("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",a),typeof t.getSnapshotBeforeUpdate=="function"&&u("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",a);var m=r.state;m&&(typeof m!="object"||nt(m))&&u("%s.state: must be set to an object or null",a),typeof r.getChildContext=="function"&&typeof t.childContextTypes!="object"&&u("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",a)}}function Z0(e,t){t.updater=up,e.stateNode=t,IR(t,e),t._reactInternalInstance=Jm}function J0(e,t,n){var r=!1,a=yr,s=yr,f=t.contextType;if("contextType"in t){var m=f===null||f!==void 0&&f.$$typeof===Ye&&f._context===void 0;if(!m&&!sp.has(t)){sp.add(t);var g="";f===void 0?g=" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof f!="object"?g=" However, it is set to a "+typeof f+".":f.$$typeof===Te?g=" Did you accidentally pass the Context.Provider instead?":f._context!==void 0?g=" Did you accidentally pass the Context.Consumer instead?":g=" However, it is set to an object with keys {"+Object.keys(f).join(", ")+"}.",u("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",Je(t)||"Component",g)}}if(typeof f=="object"&&f!==null)s=$t(f);else{a=ns(e,t,!0);var R=t.contextTypes;r=R!=null,s=r?rs(e,a):yr}var S=new t(n,s);if(e.mode&zt){pn(!0);try{S=new t(n,s)}finally{pn(!1)}}var k=e.memoizedState=S.state!==null&&S.state!==void 0?S.state:null;Z0(e,S);{if(typeof t.getDerivedStateFromProps=="function"&&k===null){var D=Je(t)||"Component";tp.has(D)||(tp.add(D),u("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",D,S.state===null?"null":"undefined",D))}if(typeof t.getDerivedStateFromProps=="function"||typeof S.getSnapshotBeforeUpdate=="function"){var z=null,B=null,I=null;if(typeof S.componentWillMount=="function"&&S.componentWillMount.__suppressDeprecationWarning!==!0?z="componentWillMount":typeof S.UNSAFE_componentWillMount=="function"&&(z="UNSAFE_componentWillMount"),typeof S.componentWillReceiveProps=="function"&&S.componentWillReceiveProps.__suppressDeprecationWarning!==!0?B="componentWillReceiveProps":typeof S.UNSAFE_componentWillReceiveProps=="function"&&(B="UNSAFE_componentWillReceiveProps"),typeof S.componentWillUpdate=="function"&&S.componentWillUpdate.__suppressDeprecationWarning!==!0?I="componentWillUpdate":typeof S.UNSAFE_componentWillUpdate=="function"&&(I="UNSAFE_componentWillUpdate"),z!==null||B!==null||I!==null){var fe=Je(t)||"Component",Ce=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";rp.has(fe)||(rp.add(fe),u(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`,fe,Ce,z!==null?`
  `+z:"",B!==null?`
  `+B:"",I!==null?`
  `+I:""))}}}return r&&jy(e,a,s),S}function rT(e,t){var n=t.state;typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),n!==t.state&&(u("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",Be(e)||"Component"),up.enqueueReplaceState(t,t.state,null))}function ex(e,t,n,r){var a=t.state;if(typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==a){{var s=Be(e)||"Component";ep.has(s)||(ep.add(s),u("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",s))}up.enqueueReplaceState(t,t.state,null)}}function cp(e,t,n,r){nT(e,t,n);var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},xm(e);var s=t.contextType;if(typeof s=="object"&&s!==null)a.context=$t(s);else{var f=ns(e,t,!0);a.context=rs(e,f)}{if(a.state===n){var m=Je(t)||"Component";ap.has(m)||(ap.add(m),u("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",m))}e.mode&zt&&qr.recordLegacyContextWarning(e,a),qr.recordUnsafeLifecycleWarnings(e,a)}a.state=e.memoizedState;var g=t.getDerivedStateFromProps;if(typeof g=="function"&&(lp(e,t,g,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps!="function"&&typeof a.getSnapshotBeforeUpdate!="function"&&(typeof a.UNSAFE_componentWillMount=="function"||typeof a.componentWillMount=="function")&&(rT(e,a),ef(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"){var R=Ze;R|=Qa,(e.mode&ci)!==we&&(R|=Bi),e.flags|=R}}function iT(e,t,n,r){var a=e.stateNode,s=e.memoizedProps;a.props=s;var f=a.context,m=t.contextType,g=yr;if(typeof m=="object"&&m!==null)g=$t(m);else{var R=ns(e,t,!0);g=rs(e,R)}var S=t.getDerivedStateFromProps,k=typeof S=="function"||typeof a.getSnapshotBeforeUpdate=="function";!k&&(typeof a.UNSAFE_componentWillReceiveProps=="function"||typeof a.componentWillReceiveProps=="function")&&(s!==n||f!==g)&&ex(e,a,n,g),p0();var D=e.memoizedState,z=a.state=D;if(ef(e,n,a,r),z=e.memoizedState,s===n&&D===z&&!Lc()&&!tf()){if(typeof a.componentDidMount=="function"){var B=Ze;B|=Qa,(e.mode&ci)!==we&&(B|=Bi),e.flags|=B}return!1}typeof S=="function"&&(lp(e,t,S,n),z=e.memoizedState);var I=tf()||K0(e,t,s,n,D,z,g);if(I){if(!k&&(typeof a.UNSAFE_componentWillMount=="function"||typeof a.componentWillMount=="function")&&(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"){var fe=Ze;fe|=Qa,(e.mode&ci)!==we&&(fe|=Bi),e.flags|=fe}}else{if(typeof a.componentDidMount=="function"){var Ce=Ze;Ce|=Qa,(e.mode&ci)!==we&&(Ce|=Bi),e.flags|=Ce}e.memoizedProps=n,e.memoizedState=z}return a.props=n,a.state=z,a.context=g,I}function aT(e,t,n,r,a){var s=t.stateNode;m0(e,t);var f=t.memoizedProps,m=t.type===t.elementType?f:Zr(t.type,f);s.props=m;var g=t.pendingProps,R=s.context,S=n.contextType,k=yr;if(typeof S=="object"&&S!==null)k=$t(S);else{var D=ns(t,n,!0);k=rs(t,D)}var z=n.getDerivedStateFromProps,B=typeof z=="function"||typeof s.getSnapshotBeforeUpdate=="function";!B&&(typeof s.UNSAFE_componentWillReceiveProps=="function"||typeof s.componentWillReceiveProps=="function")&&(f!==g||R!==k)&&ex(t,s,r,k),p0();var I=t.memoizedState,fe=s.state=I;if(ef(t,r,s,a),fe=t.memoizedState,f===g&&I===fe&&!Lc()&&!tf()&&!Tt)return typeof s.componentDidUpdate=="function"&&(f!==e.memoizedProps||I!==e.memoizedState)&&(t.flags|=Ze),typeof s.getSnapshotBeforeUpdate=="function"&&(f!==e.memoizedProps||I!==e.memoizedState)&&(t.flags|=$a),!1;typeof z=="function"&&(lp(t,n,z,r),fe=t.memoizedState);var Ce=tf()||K0(t,n,m,r,I,fe,k)||Tt;return Ce?(!B&&(typeof s.UNSAFE_componentWillUpdate=="function"||typeof s.componentWillUpdate=="function")&&(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,fe,k),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,fe,k)),typeof s.componentDidUpdate=="function"&&(t.flags|=Ze),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=$a)):(typeof s.componentDidUpdate=="function"&&(f!==e.memoizedProps||I!==e.memoizedState)&&(t.flags|=Ze),typeof s.getSnapshotBeforeUpdate=="function"&&(f!==e.memoizedProps||I!==e.memoizedState)&&(t.flags|=$a),t.memoizedProps=r,t.memoizedState=fe),s.props=r,s.state=fe,s.context=k,Ce}function po(e,t){return{value:e,source:t,stack:Gs(t),digest:null}}function fp(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function oT(e,t){return!0}function dp(e,t){try{var n=oT(e,t);if(n===!1)return;var r=t.value,a=t.source,s=t.stack,f=s!==null?s:"";if(r!=null&&r._suppressLogging){if(e.tag===p)return;console.error(r)}var m=a?Be(a):null,g=m?"The above error occurred in the <"+m+"> component:":"The above error occurred in one of your React components:",R;if(e.tag===w)R=`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;else{var S=Be(e)||"Anonymous";R="React will try to recreate this component tree from scratch "+("using the error boundary you provided, "+S+".")}var k=g+`
`+f+`

`+(""+R);console.error(k)}catch(D){setTimeout(function(){throw D})}}var sT=typeof WeakMap=="function"?WeakMap:Map;function tx(e,t,n){var r=$i(Et,n);r.tag=gm,r.payload={element:null};var a=t.value;return r.callback=function(){JN(a),dp(e,t)},r}function hp(e,t,n){var r=$i(Et,n);r.tag=gm;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var s=t.value;r.payload=function(){return a(s)},r.callback=function(){db(e),dp(e,t)}}var f=e.stateNode;return f!==null&&typeof f.componentDidCatch=="function"&&(r.callback=function(){db(e),dp(e,t),typeof a!="function"&&KN(this);var g=t.value,R=t.stack;this.componentDidCatch(g,{componentStack:R!==null?R:""}),typeof a!="function"&&(mr(e.lanes,Me)||u("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",Be(e)||"Unknown"))}),r}function nx(e,t,n){var r=e.pingCache,a;if(r===null?(r=e.pingCache=new sT,a=new Set,r.set(t,a)):(a=r.get(t),a===void 0&&(a=new Set,r.set(t,a))),!a.has(n)){a.add(n);var s=eA.bind(null,e,t,n);Wr&&bu(e,n),t.then(s,s)}}function lT(e,t,n,r){var a=e.updateQueue;if(a===null){var s=new Set;s.add(n),e.updateQueue=s}else a.add(n)}function uT(e,t){var n=e.tag;if((e.mode&qe)===we&&(n===v||n===$||n===Q)){var r=e.alternate;r?(e.updateQueue=r.updateQueue,e.memoizedState=r.memoizedState,e.lanes=r.lanes):(e.updateQueue=null,e.memoizedState=null)}}function rx(e){var t=e;do{if(t.tag===V&&Hw(t))return t;t=t.return}while(t!==null);return null}function ix(e,t,n,r,a){if((e.mode&qe)===we){if(e===t)e.flags|=Yn;else{if(e.flags|=rt,n.flags|=Md,n.flags&=~(jR|nl),n.tag===p){var s=n.alternate;if(s===null)n.tag=ie;else{var f=$i(Et,Me);f.tag=Qc,_a(n,f,Me)}}n.lanes=Ve(n.lanes,Me)}return e}return e.flags|=Yn,e.lanes=a,e}function cT(e,t,n,r,a){if(n.flags|=nl,Wr&&bu(e,a),r!==null&&typeof r=="object"&&typeof r.then=="function"){var s=r;uT(n),Rn()&&n.mode&qe&&qy();var f=rx(t);if(f!==null){f.flags&=~zi,ix(f,t,n,e,a),f.mode&qe&&nx(e,s,a),lT(f,e,s);return}else{if(!k1(a)){nx(e,s,a),Xp();return}var m=new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");r=m}}else if(Rn()&&n.mode&qe){qy();var g=rx(t);if(g!==null){(g.flags&Yn)===Ne&&(g.flags|=zi),ix(g,t,n,e,a),am(po(r,n));return}}r=po(r,n),HN(r);var R=t;do{switch(R.tag){case w:{var S=r;R.flags|=Yn;var k=cl(a);R.lanes=Ve(R.lanes,k);var D=tx(R,S,k);bm(R,D);return}case p:var z=r,B=R.type,I=R.stateNode;if((R.flags&rt)===Ne&&(typeof B.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&!rb(I))){R.flags|=Yn;var fe=cl(a);R.lanes=Ve(R.lanes,fe);var Ce=hp(R,z,fe);bm(R,Ce);return}break}R=R.return}while(R!==null)}function fT(){return null}var iu=i.ReactCurrentOwner,Jr=!1,mp,au,pp,vp,gp,vo,yp,wf,ou;mp={},au={},pp={},vp={},gp={},vo=!1,yp={},wf={},ou={};function $n(e,t,n,r){e===null?t.child=s0(t,null,n,r):t.child=ss(t,e.child,n,r)}function dT(e,t,n,r){t.child=ss(t,e.child,null,r),t.child=ss(t,null,n,r)}function ax(e,t,n,r,a){if(t.type!==t.elementType){var s=n.propTypes;s&&Yr(s,r,"prop",Je(n))}var f=n.render,m=t.ref,g,R;us(t,a),il(t);{if(iu.current=t,dr(!0),g=ps(e,t,f,r,m,a),R=vs(),t.mode&zt){pn(!0);try{g=ps(e,t,f,r,m,a),R=vs()}finally{pn(!1)}}dr(!1)}return jo(),e!==null&&!Jr?(E0(e,t,a),qi(e,t,a)):(Rn()&&R&&Jh(t),t.flags|=Uo,$n(e,t,g,a),t.child)}function ox(e,t,n,r,a){if(e===null){var s=n.type;if(gA(s)&&n.compare===null&&n.defaultProps===void 0){var f=s;return f=Ss(s),t.tag=Q,t.type=f,Ep(t,s),sx(e,t,f,r,a)}{var m=s.propTypes;if(m&&Yr(m,r,"prop",Je(s)),n.defaultProps!==void 0){var g=Je(s)||"Unknown";ou[g]||(u("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.",g),ou[g]=!0)}}var R=rv(n.type,null,r,t,t.mode,a);return R.ref=t.ref,R.return=t,t.child=R,R}{var S=n.type,k=S.propTypes;k&&Yr(k,r,"prop",Je(S))}var D=e.child,z=Tp(e,a);if(!z){var B=D.memoizedProps,I=n.compare;if(I=I!==null?I:Cl,I(B,r)&&e.ref===t.ref)return qi(e,t,a)}t.flags|=Uo;var fe=Eo(D,r);return fe.ref=t.ref,fe.return=t,t.child=fe,fe}function sx(e,t,n,r,a){if(t.type!==t.elementType){var s=t.elementType;if(s.$$typeof===He){var f=s,m=f._payload,g=f._init;try{s=g(m)}catch{s=null}var R=s&&s.propTypes;R&&Yr(R,r,"prop",Je(s))}}if(e!==null){var S=e.memoizedProps;if(Cl(S,r)&&e.ref===t.ref&&t.type===e.type)if(Jr=!1,t.pendingProps=r=S,Tp(e,a))(e.flags&Md)!==Ne&&(Jr=!0);else return t.lanes=e.lanes,qi(e,t,a)}return xp(e,t,n,r,a)}function lx(e,t,n){var r=t.pendingProps,a=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden"||Bt)if((t.mode&qe)===we){var f={baseLanes:q,cachePool:null,transitions:null};t.memoizedState=f,Uf(t,n)}else if(mr(n,hr)){var k={baseLanes:q,cachePool:null,transitions:null};t.memoizedState=k;var D=s!==null?s.baseLanes:n;Uf(t,D)}else{var m=null,g;if(s!==null){var R=s.baseLanes;g=Ve(R,n)}else g=n;t.lanes=t.childLanes=hr;var S={baseLanes:g,cachePool:m,transitions:null};return t.memoizedState=S,t.updateQueue=null,Uf(t,g),null}else{var z;s!==null?(z=Ve(s.baseLanes,n),t.memoizedState=null):z=n,Uf(t,z)}return $n(e,t,a,n),t.child}function hT(e,t,n){var r=t.pendingProps;return $n(e,t,r,n),t.child}function mT(e,t,n){var r=t.pendingProps.children;return $n(e,t,r,n),t.child}function pT(e,t,n){{t.flags|=Ze;{var r=t.stateNode;r.effectDuration=0,r.passiveEffectDuration=0}}var a=t.pendingProps,s=a.children;return $n(e,t,s,n),t.child}function ux(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=fa,t.flags|=Pd)}function xp(e,t,n,r,a){if(t.type!==t.elementType){var s=n.propTypes;s&&Yr(s,r,"prop",Je(n))}var f;{var m=ns(t,n,!0);f=rs(t,m)}var g,R;us(t,a),il(t);{if(iu.current=t,dr(!0),g=ps(e,t,n,r,f,a),R=vs(),t.mode&zt){pn(!0);try{g=ps(e,t,n,r,f,a),R=vs()}finally{pn(!1)}}dr(!1)}return jo(),e!==null&&!Jr?(E0(e,t,a),qi(e,t,a)):(Rn()&&R&&Jh(t),t.flags|=Uo,$n(e,t,g,a),t.child)}function cx(e,t,n,r,a){{switch(kA(t)){case!1:{var s=t.stateNode,f=t.type,m=new f(t.memoizedProps,s.context),g=m.state;s.updater.enqueueSetState(s,g,null);break}case!0:{t.flags|=rt,t.flags|=Yn;var R=new Error("Simulated error coming from DevTools"),S=cl(a);t.lanes=Ve(t.lanes,S);var k=hp(t,po(R,t),S);bm(t,k);break}}if(t.type!==t.elementType){var D=n.propTypes;D&&Yr(D,r,"prop",Je(n))}}var z;hi(n)?(z=!0,Fc(t)):z=!1,us(t,a);var B=t.stateNode,I;B===null?(Nf(e,t),J0(t,n,r),cp(t,n,r,a),I=!0):e===null?I=iT(t,n,r,a):I=aT(e,t,n,r,a);var fe=bp(e,t,n,I,z,a);{var Ce=t.stateNode;I&&Ce.props!==r&&(vo||u("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",Be(t)||"a component"),vo=!0)}return fe}function bp(e,t,n,r,a,s){ux(e,t);var f=(t.flags&rt)!==Ne;if(!r&&!f)return a&&Wy(t,n,!1),qi(e,t,s);var m=t.stateNode;iu.current=t;var g;if(f&&typeof n.getDerivedStateFromError!="function")g=null,$0();else{il(t);{if(dr(!0),g=m.render(),t.mode&zt){pn(!0);try{m.render()}finally{pn(!1)}}dr(!1)}jo()}return t.flags|=Uo,e!==null&&f?dT(e,t,g,s):$n(e,t,g,s),t.memoizedState=m.state,a&&Wy(t,n,!0),t.child}function fx(e){var t=e.stateNode;t.pendingContext?Hy(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Hy(e,t.context,!1),Em(e,t.containerInfo)}function vT(e,t,n){if(fx(t),e===null)throw new Error("Should have a current fiber. This is a bug in React.");var r=t.pendingProps,a=t.memoizedState,s=a.element;m0(e,t),ef(t,r,null,n);var f=t.memoizedState;t.stateNode;var m=f.element;if(a.isDehydrated){var g={element:m,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},R=t.updateQueue;if(R.baseState=g,t.memoizedState=g,t.flags&zi){var S=po(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return dx(e,t,m,n,S)}else if(m!==s){var k=po(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return dx(e,t,m,n,k)}else{xw(t);var D=s0(t,null,m,n);t.child=D;for(var z=D;z;)z.flags=z.flags&~Yt|Fi,z=z.sibling}}else{if(os(),m===s)return qi(e,t,n);$n(e,t,m,n)}return t.child}function dx(e,t,n,r,a){return os(),am(a),t.flags|=zi,$n(e,t,n,r),t.child}function gT(e,t,n){y0(t),e===null&&im(t);var r=t.type,a=t.pendingProps,s=e!==null?e.memoizedProps:null,f=a.children,m=Uh(r,a);return m?f=null:s!==null&&Uh(r,s)&&(t.flags|=tl),ux(e,t),$n(e,t,f,n),t.child}function yT(e,t){return e===null&&im(t),null}function xT(e,t,n,r){Nf(e,t);var a=t.pendingProps,s=n,f=s._payload,m=s._init,g=m(f);t.type=g;var R=t.tag=yA(g),S=Zr(g,a),k;switch(R){case v:return Ep(t,g),t.type=g=Ss(g),k=xp(null,t,g,S,r),k;case p:return t.type=g=Kp(g),k=cx(null,t,g,S,r),k;case $:return t.type=g=Zp(g),k=ax(null,t,g,S,r),k;case re:{if(t.type!==t.elementType){var D=g.propTypes;D&&Yr(D,S,"prop",Je(g))}return k=ox(null,t,g,Zr(g.type,S),r),k}}var z="";throw g!==null&&typeof g=="object"&&g.$$typeof===He&&(z=" Did you wrap a component in React.lazy() more than once?"),new Error("Element type is invalid. Received a promise that resolves to: "+g+". "+("Lazy element type must resolve to a class or function."+z))}function bT(e,t,n,r,a){Nf(e,t),t.tag=p;var s;return hi(n)?(s=!0,Fc(t)):s=!1,us(t,a),J0(t,n,r),cp(t,n,r,a),bp(null,t,n,!0,s,a)}function ET(e,t,n,r){Nf(e,t);var a=t.pendingProps,s;{var f=ns(t,n,!1);s=rs(t,f)}us(t,r);var m,g;il(t);{if(n.prototype&&typeof n.prototype.render=="function"){var R=Je(n)||"Unknown";mp[R]||(u("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",R,R),mp[R]=!0)}t.mode&zt&&qr.recordLegacyContextWarning(t,null),dr(!0),iu.current=t,m=ps(null,t,n,a,s,r),g=vs(),dr(!1)}if(jo(),t.flags|=Uo,typeof m=="object"&&m!==null&&typeof m.render=="function"&&m.$$typeof===void 0){var S=Je(n)||"Unknown";au[S]||(u("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",S,S,S),au[S]=!0)}if(typeof m=="object"&&m!==null&&typeof m.render=="function"&&m.$$typeof===void 0){{var k=Je(n)||"Unknown";au[k]||(u("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",k,k,k),au[k]=!0)}t.tag=p,t.memoizedState=null,t.updateQueue=null;var D=!1;return hi(n)?(D=!0,Fc(t)):D=!1,t.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,xm(t),Z0(t,m),cp(t,n,a,r),bp(null,t,n,!0,D,r)}else{if(t.tag=v,t.mode&zt){pn(!0);try{m=ps(null,t,n,a,s,r),g=vs()}finally{pn(!1)}}return Rn()&&g&&Jh(t),$n(null,t,m,r),Ep(t,n),t.child}}function Ep(e,t){{if(t&&t.childContextTypes&&u("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),e.ref!==null){var n="",r=sa();r&&(n+=`

Check the render method of \``+r+"`.");var a=r||"",s=e._debugSource;s&&(a=s.fileName+":"+s.lineNumber),gp[a]||(gp[a]=!0,u("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if(t.defaultProps!==void 0){var f=Je(t)||"Unknown";ou[f]||(u("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",f),ou[f]=!0)}if(typeof t.getDerivedStateFromProps=="function"){var m=Je(t)||"Unknown";vp[m]||(u("%s: Function components do not support getDerivedStateFromProps.",m),vp[m]=!0)}if(typeof t.contextType=="object"&&t.contextType!==null){var g=Je(t)||"Unknown";pp[g]||(u("%s: Function components do not support contextType.",g),pp[g]=!0)}}}var Rp={dehydrated:null,treeContext:null,retryLane:vn};function _p(e){return{baseLanes:e,cachePool:fT(),transitions:null}}function RT(e,t){var n=null;return{baseLanes:Ve(e.baseLanes,t),cachePool:n,transitions:e.transitions}}function _T(e,t,n,r){if(t!==null){var a=t.memoizedState;if(a===null)return!1}return Sm(e,ql)}function ST(e,t){return oc(e.childLanes,t)}function hx(e,t,n){var r=t.pendingProps;MA(t)&&(t.flags|=rt);var a=Qr.current,s=!1,f=(t.flags&rt)!==Ne;if(f||_T(a,e)?(s=!0,t.flags&=~rt):(e===null||e.memoizedState!==null)&&(a=jw(a,b0)),a=fs(a),Ca(t,a),e===null){im(t);var m=t.memoizedState;if(m!==null){var g=m.dehydrated;if(g!==null)return AT(t,g)}var R=r.children,S=r.fallback;if(s){var k=CT(t,R,S,n),D=t.child;return D.memoizedState=_p(n),t.memoizedState=Rp,k}else return Sp(t,R)}else{var z=e.memoizedState;if(z!==null){var B=z.dehydrated;if(B!==null)return DT(e,t,f,r,B,z,n)}if(s){var I=r.fallback,fe=r.children,Ce=TT(e,t,fe,I,n),_e=t.child,Ke=e.child.memoizedState;return _e.memoizedState=Ke===null?_p(n):RT(Ke,n),_e.childLanes=ST(e,n),t.memoizedState=Rp,Ce}else{var Ge=r.children,P=wT(e,t,Ge,n);return t.memoizedState=null,P}}}function Sp(e,t,n){var r=e.mode,a={mode:"visible",children:t},s=Cp(a,r);return s.return=e,e.child=s,s}function CT(e,t,n,r){var a=e.mode,s=e.child,f={mode:"hidden",children:t},m,g;return(a&qe)===we&&s!==null?(m=s,m.childLanes=q,m.pendingProps=f,e.mode&ft&&(m.actualDuration=0,m.actualStartTime=-1,m.selfBaseDuration=0,m.treeBaseDuration=0),g=Ma(n,a,r,null)):(m=Cp(f,a),g=Ma(n,a,r,null)),m.return=e,g.return=e,m.sibling=g,e.child=m,g}function Cp(e,t,n){return mb(e,t,q,null)}function mx(e,t){return Eo(e,t)}function wT(e,t,n,r){var a=e.child,s=a.sibling,f=mx(a,{mode:"visible",children:n});if((t.mode&qe)===we&&(f.lanes=r),f.return=t,f.sibling=null,s!==null){var m=t.deletions;m===null?(t.deletions=[s],t.flags|=Ya):m.push(s)}return t.child=f,f}function TT(e,t,n,r,a){var s=t.mode,f=e.child,m=f.sibling,g={mode:"hidden",children:n},R;if((s&qe)===we&&t.child!==f){var S=t.child;R=S,R.childLanes=q,R.pendingProps=g,t.mode&ft&&(R.actualDuration=0,R.actualStartTime=-1,R.selfBaseDuration=f.selfBaseDuration,R.treeBaseDuration=f.treeBaseDuration),t.deletions=null}else R=mx(f,g),R.subtreeFlags=f.subtreeFlags&Ui;var k;return m!==null?k=Eo(m,r):(k=Ma(r,s,a,null),k.flags|=Yt),k.return=t,R.return=t,R.sibling=k,t.child=R,k}function Tf(e,t,n,r){r!==null&&am(r),ss(t,e.child,null,n);var a=t.pendingProps,s=a.children,f=Sp(t,s);return f.flags|=Yt,t.memoizedState=null,f}function NT(e,t,n,r,a){var s=t.mode,f={mode:"visible",children:n},m=Cp(f,s),g=Ma(r,s,a,null);return g.flags|=Yt,m.return=t,g.return=t,m.sibling=g,t.child=m,(t.mode&qe)!==we&&ss(t,e.child,null,a),g}function AT(e,t,n){return(e.mode&qe)===we?(u("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),e.lanes=Me):Hh(t)?e.lanes=Ja:e.lanes=hr,null}function DT(e,t,n,r,a,s,f){if(n)if(t.flags&zi){t.flags&=~zi;var P=fp(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));return Tf(e,t,f,P)}else{if(t.memoizedState!==null)return t.child=e.child,t.flags|=rt,null;var j=r.children,L=r.fallback,J=NT(e,t,j,L,f),ve=t.child;return ve.memoizedState=_p(f),t.memoizedState=Rp,J}else{if(gw(),(t.mode&qe)===we)return Tf(e,t,f,null);if(Hh(a)){var m,g,R;{var S=PC(a);m=S.digest,g=S.message,R=S.stack}var k;g?k=new Error(g):k=new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");var D=fp(k,m,R);return Tf(e,t,f,D)}var z=mr(f,e.childLanes);if(Jr||z){var B=Bf();if(B!==null){var I=V1(B,f);if(I!==vn&&I!==s.retryLane){s.retryLane=I;var fe=Et;ar(e,I),ln(B,e,I,fe)}}Xp();var Ce=fp(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));return Tf(e,t,f,Ce)}else if(Fy(a)){t.flags|=rt,t.child=e.child;var _e=tA.bind(null,e);return LC(a,_e),null}else{bw(t,a,s.treeContext);var Ke=r.children,Ge=Sp(t,Ke);return Ge.flags|=Fi,Ge}}}function px(e,t,n){e.lanes=Ve(e.lanes,t);var r=e.alternate;r!==null&&(r.lanes=Ve(r.lanes,t)),pm(e.return,t,n)}function OT(e,t,n){for(var r=t;r!==null;){if(r.tag===V){var a=r.memoizedState;a!==null&&px(r,n,e)}else if(r.tag===pe)px(r,n,e);else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)return;for(;r.sibling===null;){if(r.return===null||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}}function kT(e){for(var t=e,n=null;t!==null;){var r=t.alternate;r!==null&&af(r)===null&&(n=t),t=t.sibling}return n}function MT(e){if(e!==void 0&&e!=="forwards"&&e!=="backwards"&&e!=="together"&&!yp[e])if(yp[e]=!0,typeof e=="string")switch(e.toLowerCase()){case"together":case"forwards":case"backwards":{u('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break}case"forward":case"backward":{u('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break}default:u('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e);break}else u('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}function PT(e,t){e!==void 0&&!wf[e]&&(e!=="collapsed"&&e!=="hidden"?(wf[e]=!0,u('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',e)):t!=="forwards"&&t!=="backwards"&&(wf[e]=!0,u('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',e)))}function vx(e,t){{var n=nt(e),r=!n&&typeof Di(e)=="function";if(n||r){var a=n?"array":"iterable";return u("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",a,t,a),!1}}return!0}function LT(e,t){if((t==="forwards"||t==="backwards")&&e!==void 0&&e!==null&&e!==!1)if(nt(e)){for(var n=0;n<e.length;n++)if(!vx(e[n],n))return}else{var r=Di(e);if(typeof r=="function"){var a=r.call(e);if(a)for(var s=a.next(),f=0;!s.done;s=a.next()){if(!vx(s.value,f))return;f++}}else u('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}function wp(e,t,n,r,a){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=a)}function gx(e,t,n){var r=t.pendingProps,a=r.revealOrder,s=r.tail,f=r.children;MT(a),PT(s,a),LT(f,a),$n(e,t,f,n);var m=Qr.current,g=Sm(m,ql);if(g)m=Cm(m,ql),t.flags|=rt;else{var R=e!==null&&(e.flags&rt)!==Ne;R&&OT(t,t.child,n),m=fs(m)}if(Ca(t,m),(t.mode&qe)===we)t.memoizedState=null;else switch(a){case"forwards":{var S=kT(t.child),k;S===null?(k=t.child,t.child=null):(k=S.sibling,S.sibling=null),wp(t,!1,k,S,s);break}case"backwards":{var D=null,z=t.child;for(t.child=null;z!==null;){var B=z.alternate;if(B!==null&&af(B)===null){t.child=z;break}var I=z.sibling;z.sibling=D,D=z,z=I}wp(t,!0,D,null,s);break}case"together":{wp(t,!1,null,null,void 0);break}default:t.memoizedState=null}return t.child}function zT(e,t,n){Em(t,t.stateNode.containerInfo);var r=t.pendingProps;return e===null?t.child=ss(t,null,r,n):$n(e,t,r,n),t.child}var yx=!1;function FT(e,t,n){var r=t.type,a=r._context,s=t.pendingProps,f=t.memoizedProps,m=s.value;{"value"in s||yx||(yx=!0,u("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var g=t.type.propTypes;g&&Yr(g,s,"prop","Context.Provider")}if(c0(t,a,m),f!==null){var R=f.value;if(gr(R,m)){if(f.children===s.children&&!Lc())return qi(e,t,n)}else Mw(t,a,n)}var S=s.children;return $n(e,t,S,n),t.child}var xx=!1;function BT(e,t,n){var r=t.type;r._context===void 0?r!==r.Consumer&&(xx||(xx=!0,u("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))):r=r._context;var a=t.pendingProps,s=a.children;typeof s!="function"&&u("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),us(t,n);var f=$t(r);il(t);var m;return iu.current=t,dr(!0),m=s(f),dr(!1),jo(),t.flags|=Uo,$n(e,t,m,n),t.child}function su(){Jr=!0}function Nf(e,t){(t.mode&qe)===we&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=Yt)}function qi(e,t,n){return e!==null&&(t.dependencies=e.dependencies),$0(),xu(t.lanes),mr(n,t.childLanes)?(Ow(e,t),t.child):null}function UT(e,t,n){{var r=t.return;if(r===null)throw new Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===r.child)r.child=n;else{var a=r.child;if(a===null)throw new Error("Expected parent to have a child.");for(;a.sibling!==t;)if(a=a.sibling,a===null)throw new Error("Expected to find the previous sibling.");a.sibling=n}var s=r.deletions;return s===null?(r.deletions=[e],r.flags|=Ya):s.push(e),n.flags|=Yt,n}}function Tp(e,t){var n=e.lanes;return!!mr(n,t)}function VT(e,t,n){switch(t.tag){case w:fx(t),t.stateNode,os();break;case C:y0(t);break;case p:{var r=t.type;hi(r)&&Fc(t);break}case T:Em(t,t.stateNode.containerInfo);break;case O:{var a=t.memoizedProps.value,s=t.type._context;c0(t,s,a);break}case ae:{var f=mr(n,t.childLanes);f&&(t.flags|=Ze);{var m=t.stateNode;m.effectDuration=0,m.passiveEffectDuration=0}}break;case V:{var g=t.memoizedState;if(g!==null){if(g.dehydrated!==null)return Ca(t,fs(Qr.current)),t.flags|=rt,null;var R=t.child,S=R.childLanes;if(mr(n,S))return hx(e,t,n);Ca(t,fs(Qr.current));var k=qi(e,t,n);return k!==null?k.sibling:null}else Ca(t,fs(Qr.current));break}case pe:{var D=(e.flags&rt)!==Ne,z=mr(n,t.childLanes);if(D){if(z)return gx(e,t,n);t.flags|=rt}var B=t.memoizedState;if(B!==null&&(B.rendering=null,B.tail=null,B.lastEffect=null),Ca(t,Qr.current),z)break;return null}case se:case ge:return t.lanes=q,lx(e,t,n)}return qi(e,t,n)}function bx(e,t,n){if(t._debugNeedsRemount&&e!==null)return UT(e,t,rv(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(e!==null){var r=e.memoizedProps,a=t.pendingProps;if(r!==a||Lc()||t.type!==e.type)Jr=!0;else{var s=Tp(e,n);if(!s&&(t.flags&rt)===Ne)return Jr=!1,VT(e,t,n);(e.flags&Md)!==Ne?Jr=!0:Jr=!1}}else if(Jr=!1,Rn()&&fw(t)){var f=t.index,m=dw();$y(t,m,f)}switch(t.lanes=q,t.tag){case _:return ET(e,t,t.type,n);case xe:{var g=t.elementType;return xT(e,t,g,n)}case v:{var R=t.type,S=t.pendingProps,k=t.elementType===R?S:Zr(R,S);return xp(e,t,R,k,n)}case p:{var D=t.type,z=t.pendingProps,B=t.elementType===D?z:Zr(D,z);return cx(e,t,D,B,n)}case w:return vT(e,t,n);case C:return gT(e,t,n);case M:return yT(e,t);case V:return hx(e,t,n);case T:return zT(e,t,n);case $:{var I=t.type,fe=t.pendingProps,Ce=t.elementType===I?fe:Zr(I,fe);return ax(e,t,I,Ce,n)}case G:return hT(e,t,n);case Y:return mT(e,t,n);case ae:return pT(e,t,n);case O:return FT(e,t,n);case H:return BT(e,t,n);case re:{var _e=t.type,Ke=t.pendingProps,Ge=Zr(_e,Ke);if(t.type!==t.elementType){var P=_e.propTypes;P&&Yr(P,Ge,"prop",Je(_e))}return Ge=Zr(_e.type,Ge),ox(e,t,_e,Ge,n)}case Q:return sx(e,t,t.type,t.pendingProps,n);case ie:{var j=t.type,L=t.pendingProps,J=t.elementType===j?L:Zr(j,L);return bT(e,t,j,J,n)}case pe:return gx(e,t,n);case Fe:break;case se:return lx(e,t,n)}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function gs(e){e.flags|=Ze}function Ex(e){e.flags|=fa,e.flags|=Pd}var Rx,Np,_x,Sx;Rx=function(e,t,n,r){for(var a=t.child;a!==null;){if(a.tag===C||a.tag===M)lC(e,a.stateNode);else if(a.tag!==T){if(a.child!==null){a.child.return=a,a=a.child;continue}}if(a===t)return;for(;a.sibling===null;){if(a.return===null||a.return===t)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},Np=function(e,t){},_x=function(e,t,n,r,a){var s=e.memoizedProps;if(s!==r){var f=t.stateNode,m=Rm(),g=cC(f,n,s,r,a,m);t.updateQueue=g,g&&gs(t)}},Sx=function(e,t,n,r){n!==r&&gs(t)};function lu(e,t){if(!Rn())switch(e.tailMode){case"hidden":{for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e.tail=null:r.sibling=null;break}case"collapsed":{for(var a=e.tail,s=null;a!==null;)a.alternate!==null&&(s=a),a=a.sibling;s===null?!t&&e.tail!==null?e.tail.sibling=null:e.tail=null:s.sibling=null;break}}}function Sn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=q,r=Ne;if(t){if((e.mode&ft)!==we){for(var g=e.selfBaseDuration,R=e.child;R!==null;)n=Ve(n,Ve(R.lanes,R.childLanes)),r|=R.subtreeFlags&Ui,r|=R.flags&Ui,g+=R.treeBaseDuration,R=R.sibling;e.treeBaseDuration=g}else for(var S=e.child;S!==null;)n=Ve(n,Ve(S.lanes,S.childLanes)),r|=S.subtreeFlags&Ui,r|=S.flags&Ui,S.return=e,S=S.sibling;e.subtreeFlags|=r}else{if((e.mode&ft)!==we){for(var a=e.actualDuration,s=e.selfBaseDuration,f=e.child;f!==null;)n=Ve(n,Ve(f.lanes,f.childLanes)),r|=f.subtreeFlags,r|=f.flags,a+=f.actualDuration,s+=f.treeBaseDuration,f=f.sibling;e.actualDuration=a,e.treeBaseDuration=s}else for(var m=e.child;m!==null;)n=Ve(n,Ve(m.lanes,m.childLanes)),r|=m.subtreeFlags,r|=m.flags,m.return=e,m=m.sibling;e.subtreeFlags|=r}return e.childLanes=n,t}function IT(e,t,n){if(Cw()&&(t.mode&qe)!==we&&(t.flags&rt)===Ne)return t0(t),os(),t.flags|=zi|nl|Yn,!1;var r=jc(t);if(n!==null&&n.dehydrated!==null)if(e===null){if(!r)throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(_w(t),Sn(t),(t.mode&ft)!==we){var a=n!==null;if(a){var s=t.child;s!==null&&(t.treeBaseDuration-=s.treeBaseDuration)}}return!1}else{if(os(),(t.flags&rt)===Ne&&(t.memoizedState=null),t.flags|=Ze,Sn(t),(t.mode&ft)!==we){var f=n!==null;if(f){var m=t.child;m!==null&&(t.treeBaseDuration-=m.treeBaseDuration)}}return!1}else return n0(),!0}function Cx(e,t,n){var r=t.pendingProps;switch(em(t),t.tag){case _:case xe:case Q:case v:case $:case G:case Y:case ae:case H:case re:return Sn(t),null;case p:{var a=t.type;return hi(a)&&zc(t),Sn(t),null}case w:{var s=t.stateNode;if(cs(t),Qh(t),Tm(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),e===null||e.child===null){var f=jc(t);if(f)gs(t);else if(e!==null){var m=e.memoizedState;(!m.isDehydrated||(t.flags&zi)!==Ne)&&(t.flags|=$a,n0())}}return Np(e,t),Sn(t),null}case C:{_m(t);var g=g0(),R=t.type;if(e!==null&&t.stateNode!=null)_x(e,t,R,r,g),e.ref!==t.ref&&Ex(t);else{if(!r){if(t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return Sn(t),null}var S=Rm(),k=jc(t);if(k)Ew(t,g,S)&&gs(t);else{var D=sC(R,r,g,S,t);Rx(D,t,!1,!1),t.stateNode=D,uC(D,R,r,g)&&gs(t)}t.ref!==null&&Ex(t)}return Sn(t),null}case M:{var z=r;if(e&&t.stateNode!=null){var B=e.memoizedProps;Sx(e,t,B,z)}else{if(typeof z!="string"&&t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var I=g0(),fe=Rm(),Ce=jc(t);Ce?Rw(t)&&gs(t):t.stateNode=fC(z,I,fe,t)}return Sn(t),null}case V:{ds(t);var _e=t.memoizedState;if(e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){var Ke=IT(e,t,_e);if(!Ke)return t.flags&Yn?t:null}if((t.flags&rt)!==Ne)return t.lanes=n,(t.mode&ft)!==we&&Zm(t),t;var Ge=_e!==null,P=e!==null&&e.memoizedState!==null;if(Ge!==P&&Ge){var j=t.child;if(j.flags|=qa,(t.mode&qe)!==we){var L=e===null&&(t.memoizedProps.unstable_avoidThisFallback!==!0||!Gt);L||Sm(Qr.current,b0)?jN():Xp()}}var J=t.updateQueue;if(J!==null&&(t.flags|=Ze),Sn(t),(t.mode&ft)!==we&&Ge){var ve=t.child;ve!==null&&(t.treeBaseDuration-=ve.treeBaseDuration)}return null}case T:return cs(t),Np(e,t),e===null&&iw(t.stateNode.containerInfo),Sn(t),null;case O:var de=t.type._context;return mm(de,t),Sn(t),null;case ie:{var De=t.type;return hi(De)&&zc(t),Sn(t),null}case pe:{ds(t);var Le=t.memoizedState;if(Le===null)return Sn(t),null;var ht=(t.flags&rt)!==Ne,et=Le.rendering;if(et===null)if(ht)lu(Le,!1);else{var jt=GN()&&(e===null||(e.flags&rt)===Ne);if(!jt)for(var tt=t.child;tt!==null;){var Ft=af(tt);if(Ft!==null){ht=!0,t.flags|=rt,lu(Le,!1);var Vn=Ft.updateQueue;return Vn!==null&&(t.updateQueue=Vn,t.flags|=Ze),t.subtreeFlags=Ne,kw(t,n),Ca(t,Cm(Qr.current,ql)),t.child}tt=tt.sibling}Le.tail!==null&&mn()>Xx()&&(t.flags|=rt,ht=!0,lu(Le,!1),t.lanes=Sg)}else{if(!ht){var An=af(et);if(An!==null){t.flags|=rt,ht=!0;var br=An.updateQueue;if(br!==null&&(t.updateQueue=br,t.flags|=Ze),lu(Le,!0),Le.tail===null&&Le.tailMode==="hidden"&&!et.alternate&&!Rn())return Sn(t),null}else mn()*2-Le.renderingStartTime>Xx()&&n!==hr&&(t.flags|=rt,ht=!0,lu(Le,!1),t.lanes=Sg)}if(Le.isBackwards)et.sibling=t.child,t.child=et;else{var Kn=Le.last;Kn!==null?Kn.sibling=et:t.child=et,Le.last=et}}if(Le.tail!==null){var Zn=Le.tail;Le.rendering=Zn,Le.tail=Zn.sibling,Le.renderingStartTime=mn(),Zn.sibling=null;var In=Qr.current;return ht?In=Cm(In,ql):In=fs(In),Ca(t,In),Zn}return Sn(t),null}case Fe:break;case se:case ge:{Wp(t);var ea=t.memoizedState,Cs=ea!==null;if(e!==null){var Su=e.memoizedState,Ei=Su!==null;Ei!==Cs&&!Bt&&(t.flags|=qa)}return!Cs||(t.mode&qe)===we?Sn(t):mr(bi,hr)&&(Sn(t),t.subtreeFlags&(Yt|Ze)&&(t.flags|=qa)),null}case Ee:return null;case le:return null}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function jT(e,t,n){switch(em(t),t.tag){case p:{var r=t.type;hi(r)&&zc(t);var a=t.flags;return a&Yn?(t.flags=a&~Yn|rt,(t.mode&ft)!==we&&Zm(t),t):null}case w:{t.stateNode,cs(t),Qh(t),Tm();var s=t.flags;return(s&Yn)!==Ne&&(s&rt)===Ne?(t.flags=s&~Yn|rt,t):null}case C:return _m(t),null;case V:{ds(t);var f=t.memoizedState;if(f!==null&&f.dehydrated!==null){if(t.alternate===null)throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");os()}var m=t.flags;return m&Yn?(t.flags=m&~Yn|rt,(t.mode&ft)!==we&&Zm(t),t):null}case pe:return ds(t),null;case T:return cs(t),null;case O:var g=t.type._context;return mm(g,t),null;case se:case ge:return Wp(t),null;case Ee:return null;default:return null}}function wx(e,t,n){switch(em(t),t.tag){case p:{var r=t.type.childContextTypes;r!=null&&zc(t);break}case w:{t.stateNode,cs(t),Qh(t),Tm();break}case C:{_m(t);break}case T:cs(t);break;case V:ds(t);break;case pe:ds(t);break;case O:var a=t.type._context;mm(a,t);break;case se:case ge:Wp(t);break}}var Tx=null;Tx=new Set;var Af=!1,Cn=!1,HT=typeof WeakSet=="function"?WeakSet:Set,ye=null,ys=null,xs=null;function GT(e){Dd(null,function(){throw e}),Od()}var WT=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,e.mode&ft)try{yi(),t.componentWillUnmount()}finally{gi(e)}else t.componentWillUnmount()};function Nx(e,t){try{Na(tn,e)}catch(n){gt(e,t,n)}}function Ap(e,t,n){try{WT(e,n)}catch(r){gt(e,t,r)}}function XT(e,t,n){try{n.componentDidMount()}catch(r){gt(e,t,r)}}function Ax(e,t){try{Ox(e)}catch(n){gt(e,t,n)}}function bs(e,t){var n=e.ref;if(n!==null)if(typeof n=="function"){var r;try{if(jn&&Hn&&e.mode&ft)try{yi(),r=n(null)}finally{gi(e)}else r=n(null)}catch(a){gt(e,t,a)}typeof r=="function"&&u("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Be(e))}else n.current=null}function Df(e,t,n){try{n()}catch(r){gt(e,t,r)}}var Dx=!1;function YT(e,t){aC(e.containerInfo),ye=t,$T();var n=Dx;return Dx=!1,n}function $T(){for(;ye!==null;){var e=ye,t=e.child;(e.subtreeFlags&zd)!==Ne&&t!==null?(t.return=e,ye=t):qT()}}function qT(){for(;ye!==null;){var e=ye;Ot(e);try{QT(e)}catch(n){gt(e,e.return,n)}hn();var t=e.sibling;if(t!==null){t.return=e.return,ye=t;return}ye=e.return}}function QT(e){var t=e.alternate,n=e.flags;if((n&$a)!==Ne){switch(Ot(e),e.tag){case v:case $:case Q:break;case p:{if(t!==null){var r=t.memoizedProps,a=t.memoizedState,s=e.stateNode;e.type===e.elementType&&!vo&&(s.props!==e.memoizedProps&&u("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(e)||"instance"),s.state!==e.memoizedState&&u("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(e)||"instance"));var f=s.getSnapshotBeforeUpdate(e.elementType===e.type?r:Zr(e.type,r),a);{var m=Tx;f===void 0&&!m.has(e.type)&&(m.add(e.type),u("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",Be(e)))}s.__reactInternalSnapshotBeforeUpdate=f}break}case w:{{var g=e.stateNode;DC(g.containerInfo)}break}case C:case M:case T:case ie:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}hn()}}function ei(e,t,n){var r=t.updateQueue,a=r!==null?r.lastEffect:null;if(a!==null){var s=a.next,f=s;do{if((f.tag&e)===e){var m=f.destroy;f.destroy=void 0,m!==void 0&&((e&_n)!==or?f1(t):(e&tn)!==or&&xg(t),(e&mi)!==or&&Eu(!0),Df(t,n,m),(e&mi)!==or&&Eu(!1),(e&_n)!==or?d1():(e&tn)!==or&&bg())}f=f.next}while(f!==s)}}function Na(e,t){var n=t.updateQueue,r=n!==null?n.lastEffect:null;if(r!==null){var a=r.next,s=a;do{if((s.tag&e)===e){(e&_n)!==or?u1(t):(e&tn)!==or&&h1(t);var f=s.create;(e&mi)!==or&&Eu(!0),s.destroy=f(),(e&mi)!==or&&Eu(!1),(e&_n)!==or?c1():(e&tn)!==or&&m1();{var m=s.destroy;if(m!==void 0&&typeof m!="function"){var g=void 0;(s.tag&tn)!==Ne?g="useLayoutEffect":(s.tag&mi)!==Ne?g="useInsertionEffect":g="useEffect";var R=void 0;m===null?R=" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof m.then=="function"?R=`

It looks like you wrote `+g+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+g+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching`:R=" You returned: "+m,u("%s must not return anything besides a function, which is used for clean-up.%s",g,R)}}}s=s.next}while(s!==a)}}function KT(e,t){if((t.flags&Ze)!==Ne)switch(t.tag){case ae:{var n=t.stateNode.passiveEffectDuration,r=t.memoizedProps,a=r.id,s=r.onPostCommit,f=X0(),m=t.alternate===null?"mount":"update";W0()&&(m="nested-update"),typeof s=="function"&&s(a,m,n,f);var g=t.return;e:for(;g!==null;){switch(g.tag){case w:var R=g.stateNode;R.passiveEffectDuration+=n;break e;case ae:var S=g.stateNode;S.passiveEffectDuration+=n;break e}g=g.return}break}}}function ZT(e,t,n,r){if((n.flags&rl)!==Ne)switch(n.tag){case v:case $:case Q:{if(!Cn)if(n.mode&ft)try{yi(),Na(tn|en,n)}finally{gi(n)}else Na(tn|en,n);break}case p:{var a=n.stateNode;if(n.flags&Ze&&!Cn)if(t===null)if(n.type===n.elementType&&!vo&&(a.props!==n.memoizedProps&&u("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(n)||"instance"),a.state!==n.memoizedState&&u("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(n)||"instance")),n.mode&ft)try{yi(),a.componentDidMount()}finally{gi(n)}else a.componentDidMount();else{var s=n.elementType===n.type?t.memoizedProps:Zr(n.type,t.memoizedProps),f=t.memoizedState;if(n.type===n.elementType&&!vo&&(a.props!==n.memoizedProps&&u("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(n)||"instance"),a.state!==n.memoizedState&&u("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(n)||"instance")),n.mode&ft)try{yi(),a.componentDidUpdate(s,f,a.__reactInternalSnapshotBeforeUpdate)}finally{gi(n)}else a.componentDidUpdate(s,f,a.__reactInternalSnapshotBeforeUpdate)}var m=n.updateQueue;m!==null&&(n.type===n.elementType&&!vo&&(a.props!==n.memoizedProps&&u("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Be(n)||"instance"),a.state!==n.memoizedState&&u("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Be(n)||"instance")),v0(n,m,a));break}case w:{var g=n.updateQueue;if(g!==null){var R=null;if(n.child!==null)switch(n.child.tag){case C:R=n.child.stateNode;break;case p:R=n.child.stateNode;break}v0(n,g,R)}break}case C:{var S=n.stateNode;if(t===null&&n.flags&Ze){var k=n.type,D=n.memoizedProps;vC(S,k,D)}break}case M:break;case T:break;case ae:{{var z=n.memoizedProps,B=z.onCommit,I=z.onRender,fe=n.stateNode.effectDuration,Ce=X0(),_e=t===null?"mount":"update";W0()&&(_e="nested-update"),typeof I=="function"&&I(n.memoizedProps.id,_e,n.actualDuration,n.treeBaseDuration,n.actualStartTime,Ce);{typeof B=="function"&&B(n.memoizedProps.id,_e,fe,Ce),qN(n);var Ke=n.return;e:for(;Ke!==null;){switch(Ke.tag){case w:var Ge=Ke.stateNode;Ge.effectDuration+=fe;break e;case ae:var P=Ke.stateNode;P.effectDuration+=fe;break e}Ke=Ke.return}}}break}case V:{oN(e,n);break}case pe:case ie:case Fe:case se:case ge:case le:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}Cn||n.flags&fa&&Ox(n)}function JT(e){switch(e.tag){case v:case $:case Q:{if(e.mode&ft)try{yi(),Nx(e,e.return)}finally{gi(e)}else Nx(e,e.return);break}case p:{var t=e.stateNode;typeof t.componentDidMount=="function"&&XT(e,e.return,t),Ax(e,e.return);break}case C:{Ax(e,e.return);break}}}function eN(e,t){for(var n=null,r=e;;){if(r.tag===C){if(n===null){n=r;try{var a=r.stateNode;t?wC(a):NC(r.stateNode,r.memoizedProps)}catch(f){gt(e,e.return,f)}}}else if(r.tag===M){if(n===null)try{var s=r.stateNode;t?TC(s):AC(s,r.memoizedProps)}catch(f){gt(e,e.return,f)}}else if(!((r.tag===se||r.tag===ge)&&r.memoizedState!==null&&r!==e)){if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r===e)return;for(;r.sibling===null;){if(r.return===null||r.return===e)return;n===r&&(n=null),r=r.return}n===r&&(n=null),r.sibling.return=r.return,r=r.sibling}}function Ox(e){var t=e.ref;if(t!==null){var n=e.stateNode,r;switch(e.tag){case C:r=n;break;default:r=n}if(typeof t=="function"){var a;if(e.mode&ft)try{yi(),a=t(r)}finally{gi(e)}else a=t(r);typeof a=="function"&&u("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Be(e))}else t.hasOwnProperty("current")||u("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",Be(e)),t.current=r}}function tN(e){var t=e.alternate;t!==null&&(t.return=null),e.return=null}function kx(e){var t=e.alternate;t!==null&&(e.alternate=null,kx(t));{if(e.child=null,e.deletions=null,e.sibling=null,e.tag===C){var n=e.stateNode;n!==null&&sw(n)}e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}}function nN(e){for(var t=e.return;t!==null;){if(Mx(t))return t;t=t.return}throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}function Mx(e){return e.tag===C||e.tag===w||e.tag===T}function Px(e){var t=e;e:for(;;){for(;t.sibling===null;){if(t.return===null||Mx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==C&&t.tag!==M&&t.tag!==K;){if(t.flags&Yt||t.child===null||t.tag===T)continue e;t.child.return=t,t=t.child}if(!(t.flags&Yt))return t.stateNode}}function rN(e){var t=nN(e);switch(t.tag){case C:{var n=t.stateNode;t.flags&tl&&(zy(n),t.flags&=~tl);var r=Px(e);Op(e,r,n);break}case w:case T:{var a=t.stateNode.containerInfo,s=Px(e);Dp(e,s,a);break}default:throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}function Dp(e,t,n){var r=e.tag,a=r===C||r===M;if(a){var s=e.stateNode;t?RC(n,s,t):bC(n,s)}else if(r!==T){var f=e.child;if(f!==null){Dp(f,t,n);for(var m=f.sibling;m!==null;)Dp(m,t,n),m=m.sibling}}}function Op(e,t,n){var r=e.tag,a=r===C||r===M;if(a){var s=e.stateNode;t?EC(n,s,t):xC(n,s)}else if(r!==T){var f=e.child;if(f!==null){Op(f,t,n);for(var m=f.sibling;m!==null;)Op(m,t,n),m=m.sibling}}}var wn=null,ti=!1;function iN(e,t,n){{var r=t;e:for(;r!==null;){switch(r.tag){case C:{wn=r.stateNode,ti=!1;break e}case w:{wn=r.stateNode.containerInfo,ti=!0;break e}case T:{wn=r.stateNode.containerInfo,ti=!0;break e}}r=r.return}if(wn===null)throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");Lx(e,t,n),wn=null,ti=!1}tN(n)}function Aa(e,t,n){for(var r=n.child;r!==null;)Lx(e,t,r),r=r.sibling}function Lx(e,t,n){switch(a1(n),n.tag){case C:Cn||bs(n,t);case M:{{var r=wn,a=ti;wn=null,Aa(e,t,n),wn=r,ti=a,wn!==null&&(ti?SC(wn,n.stateNode):_C(wn,n.stateNode))}return}case K:{wn!==null&&(ti?CC(wn,n.stateNode):jh(wn,n.stateNode));return}case T:{{var s=wn,f=ti;wn=n.stateNode.containerInfo,ti=!0,Aa(e,t,n),wn=s,ti=f}return}case v:case $:case re:case Q:{if(!Cn){var m=n.updateQueue;if(m!==null){var g=m.lastEffect;if(g!==null){var R=g.next,S=R;do{var k=S,D=k.destroy,z=k.tag;D!==void 0&&((z&mi)!==or?Df(n,t,D):(z&tn)!==or&&(xg(n),n.mode&ft?(yi(),Df(n,t,D),gi(n)):Df(n,t,D),bg())),S=S.next}while(S!==R)}}}Aa(e,t,n);return}case p:{if(!Cn){bs(n,t);var B=n.stateNode;typeof B.componentWillUnmount=="function"&&Ap(n,t,B)}Aa(e,t,n);return}case Fe:{Aa(e,t,n);return}case se:{if(n.mode&qe){var I=Cn;Cn=I||n.memoizedState!==null,Aa(e,t,n),Cn=I}else Aa(e,t,n);break}default:{Aa(e,t,n);return}}}function aN(e){e.memoizedState}function oN(e,t){var n=t.memoizedState;if(n===null){var r=t.alternate;if(r!==null){var a=r.memoizedState;if(a!==null){var s=a.dehydrated;s!==null&&GC(s)}}}}function zx(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new HT),t.forEach(function(r){var a=nA.bind(null,e,r);if(!n.has(r)){if(n.add(r),Wr)if(ys!==null&&xs!==null)bu(xs,ys);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");r.then(a,a)}})}}function sN(e,t,n){ys=n,xs=e,Ot(t),Fx(t,e),Ot(t),ys=null,xs=null}function ni(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var s=r[a];try{iN(e,t,s)}catch(g){gt(s,t,g)}}var f=Uu();if(t.subtreeFlags&Fd)for(var m=t.child;m!==null;)Ot(m),Fx(m,e),m=m.sibling;Ot(f)}function Fx(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case v:case $:case re:case Q:{if(ni(t,e),xi(e),a&Ze){try{ei(mi|en,e,e.return),Na(mi|en,e)}catch(De){gt(e,e.return,De)}if(e.mode&ft){try{yi(),ei(tn|en,e,e.return)}catch(De){gt(e,e.return,De)}gi(e)}else try{ei(tn|en,e,e.return)}catch(De){gt(e,e.return,De)}}return}case p:{ni(t,e),xi(e),a&fa&&r!==null&&bs(r,r.return);return}case C:{ni(t,e),xi(e),a&fa&&r!==null&&bs(r,r.return);{if(e.flags&tl){var s=e.stateNode;try{zy(s)}catch(De){gt(e,e.return,De)}}if(a&Ze){var f=e.stateNode;if(f!=null){var m=e.memoizedProps,g=r!==null?r.memoizedProps:m,R=e.type,S=e.updateQueue;if(e.updateQueue=null,S!==null)try{gC(f,S,R,g,m,e)}catch(De){gt(e,e.return,De)}}}}return}case M:{if(ni(t,e),xi(e),a&Ze){if(e.stateNode===null)throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var k=e.stateNode,D=e.memoizedProps,z=r!==null?r.memoizedProps:D;try{yC(k,z,D)}catch(De){gt(e,e.return,De)}}return}case w:{if(ni(t,e),xi(e),a&Ze&&r!==null){var B=r.memoizedState;if(B.isDehydrated)try{HC(t.containerInfo)}catch(De){gt(e,e.return,De)}}return}case T:{ni(t,e),xi(e);return}case V:{ni(t,e),xi(e);var I=e.child;if(I.flags&qa){var fe=I.stateNode,Ce=I.memoizedState,_e=Ce!==null;if(fe.isHidden=_e,_e){var Ke=I.alternate!==null&&I.alternate.memoizedState!==null;Ke||IN()}}if(a&Ze){try{aN(e)}catch(De){gt(e,e.return,De)}zx(e)}return}case se:{var Ge=r!==null&&r.memoizedState!==null;if(e.mode&qe){var P=Cn;Cn=P||Ge,ni(t,e),Cn=P}else ni(t,e);if(xi(e),a&qa){var j=e.stateNode,L=e.memoizedState,J=L!==null,ve=e;if(j.isHidden=J,J&&!Ge&&(ve.mode&qe)!==we){ye=ve;for(var de=ve.child;de!==null;)ye=de,uN(de),de=de.sibling}eN(ve,J)}return}case pe:{ni(t,e),xi(e),a&Ze&&zx(e);return}case Fe:return;default:{ni(t,e),xi(e);return}}}function xi(e){var t=e.flags;if(t&Yt){try{rN(e)}catch(n){gt(e,e.return,n)}e.flags&=~Yt}t&Fi&&(e.flags&=~Fi)}function lN(e,t,n){ys=n,xs=t,ye=e,Bx(e,t,n),ys=null,xs=null}function Bx(e,t,n){for(var r=(e.mode&qe)!==we;ye!==null;){var a=ye,s=a.child;if(a.tag===se&&r){var f=a.memoizedState!==null,m=f||Af;if(m){kp(e,t,n);continue}else{var g=a.alternate,R=g!==null&&g.memoizedState!==null,S=R||Cn,k=Af,D=Cn;Af=m,Cn=S,Cn&&!D&&(ye=a,cN(a));for(var z=s;z!==null;)ye=z,Bx(z,t,n),z=z.sibling;ye=a,Af=k,Cn=D,kp(e,t,n);continue}}(a.subtreeFlags&rl)!==Ne&&s!==null?(s.return=a,ye=s):kp(e,t,n)}}function kp(e,t,n){for(;ye!==null;){var r=ye;if((r.flags&rl)!==Ne){var a=r.alternate;Ot(r);try{ZT(t,a,r,n)}catch(f){gt(r,r.return,f)}hn()}if(r===e){ye=null;return}var s=r.sibling;if(s!==null){s.return=r.return,ye=s;return}ye=r.return}}function uN(e){for(;ye!==null;){var t=ye,n=t.child;switch(t.tag){case v:case $:case re:case Q:{if(t.mode&ft)try{yi(),ei(tn,t,t.return)}finally{gi(t)}else ei(tn,t,t.return);break}case p:{bs(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Ap(t,t.return,r);break}case C:{bs(t,t.return);break}case se:{var a=t.memoizedState!==null;if(a){Ux(e);continue}break}}n!==null?(n.return=t,ye=n):Ux(e)}}function Ux(e){for(;ye!==null;){var t=ye;if(t===e){ye=null;return}var n=t.sibling;if(n!==null){n.return=t.return,ye=n;return}ye=t.return}}function cN(e){for(;ye!==null;){var t=ye,n=t.child;if(t.tag===se){var r=t.memoizedState!==null;if(r){Vx(e);continue}}n!==null?(n.return=t,ye=n):Vx(e)}}function Vx(e){for(;ye!==null;){var t=ye;Ot(t);try{JT(t)}catch(r){gt(t,t.return,r)}if(hn(),t===e){ye=null;return}var n=t.sibling;if(n!==null){n.return=t.return,ye=n;return}ye=t.return}}function fN(e,t,n,r){ye=t,dN(t,e,n,r)}function dN(e,t,n,r){for(;ye!==null;){var a=ye,s=a.child;(a.subtreeFlags&Vo)!==Ne&&s!==null?(s.return=a,ye=s):hN(e,t,n,r)}}function hN(e,t,n,r){for(;ye!==null;){var a=ye;if((a.flags&Gr)!==Ne){Ot(a);try{mN(t,a,n,r)}catch(f){gt(a,a.return,f)}hn()}if(a===e){ye=null;return}var s=a.sibling;if(s!==null){s.return=a.return,ye=s;return}ye=a.return}}function mN(e,t,n,r){switch(t.tag){case v:case $:case Q:{if(t.mode&ft){Km();try{Na(_n|en,t)}finally{Qm(t)}}else Na(_n|en,t);break}}}function pN(e){ye=e,vN()}function vN(){for(;ye!==null;){var e=ye,t=e.child;if((ye.flags&Ya)!==Ne){var n=e.deletions;if(n!==null){for(var r=0;r<n.length;r++){var a=n[r];ye=a,xN(a,e)}{var s=e.alternate;if(s!==null){var f=s.child;if(f!==null){s.child=null;do{var m=f.sibling;f.sibling=null,f=m}while(f!==null)}}}ye=e}}(e.subtreeFlags&Vo)!==Ne&&t!==null?(t.return=e,ye=t):gN()}}function gN(){for(;ye!==null;){var e=ye;(e.flags&Gr)!==Ne&&(Ot(e),yN(e),hn());var t=e.sibling;if(t!==null){t.return=e.return,ye=t;return}ye=e.return}}function yN(e){switch(e.tag){case v:case $:case Q:{e.mode&ft?(Km(),ei(_n|en,e,e.return),Qm(e)):ei(_n|en,e,e.return);break}}}function xN(e,t){for(;ye!==null;){var n=ye;Ot(n),EN(n,t),hn();var r=n.child;r!==null?(r.return=n,ye=r):bN(e)}}function bN(e){for(;ye!==null;){var t=ye,n=t.sibling,r=t.return;if(kx(t),t===e){ye=null;return}if(n!==null){n.return=r,ye=n;return}ye=r}}function EN(e,t){switch(e.tag){case v:case $:case Q:{e.mode&ft?(Km(),ei(_n,e,t),Qm(e)):ei(_n,e,t);break}}}function RN(e){switch(e.tag){case v:case $:case Q:{try{Na(tn|en,e)}catch(n){gt(e,e.return,n)}break}case p:{var t=e.stateNode;try{t.componentDidMount()}catch(n){gt(e,e.return,n)}break}}}function _N(e){switch(e.tag){case v:case $:case Q:{try{Na(_n|en,e)}catch(t){gt(e,e.return,t)}break}}}function SN(e){switch(e.tag){case v:case $:case Q:{try{ei(tn|en,e,e.return)}catch(n){gt(e,e.return,n)}break}case p:{var t=e.stateNode;typeof t.componentWillUnmount=="function"&&Ap(e,e.return,t);break}}}function CN(e){switch(e.tag){case v:case $:case Q:try{ei(_n|en,e,e.return)}catch(t){gt(e,e.return,t)}}}if(typeof Symbol=="function"&&Symbol.for){var uu=Symbol.for;uu("selector.component"),uu("selector.has_pseudo_class"),uu("selector.role"),uu("selector.test_id"),uu("selector.text")}var wN=[];function TN(){wN.forEach(function(e){return e()})}var NN=i.ReactCurrentActQueue;function AN(e){{var t=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0,n=typeof jest<"u";return n&&t!==!1}}function Ix(){{var e=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0;return!e&&NN.current!==null&&u("The current testing environment is not configured to support act(...)"),e}}var DN=Math.ceil,Mp=i.ReactCurrentDispatcher,Pp=i.ReactCurrentOwner,Tn=i.ReactCurrentBatchConfig,ri=i.ReactCurrentActQueue,an=0,jx=1,Nn=2,Lr=4,Qi=0,cu=1,go=2,Of=3,fu=4,Hx=5,Lp=6,Qe=an,qn=null,kt=null,on=q,bi=q,zp=xa(q),sn=Qi,du=null,kf=q,hu=q,Mf=q,mu=null,sr=null,Fp=0,Gx=500,Wx=1/0,ON=500,Ki=null;function pu(){Wx=mn()+ON}function Xx(){return Wx}var Pf=!1,Bp=null,Es=null,yo=!1,Da=null,vu=q,Up=[],Vp=null,kN=50,gu=0,Ip=null,jp=!1,Lf=!1,MN=50,Rs=0,zf=null,yu=Et,Ff=q,Yx=!1;function Bf(){return qn}function Qn(){return(Qe&(Nn|Lr))!==an?mn():(yu!==Et||(yu=mn()),yu)}function Oa(e){var t=e.mode;if((t&qe)===we)return Me;if((Qe&Nn)!==an&&on!==q)return cl(on);var n=Nw()!==Tw;if(n){if(Tn.transition!==null){var r=Tn.transition;r._updatedFibers||(r._updatedFibers=new Set),r._updatedFibers.add(e)}return Ff===vn&&(Ff=Ng()),Ff}var a=Xr();if(a!==vn)return a;var s=dC();return s}function PN(e){var t=e.mode;return(t&qe)===we?Me:z1()}function ln(e,t,n,r){iA(),Yx&&u("useInsertionEffect must not schedule updates."),jp&&(Lf=!0),fl(e,n,r),(Qe&Nn)!==q&&e===qn?sA(t):(Wr&&Og(e,t,n),lA(t),e===qn&&((Qe&Nn)===an&&(hu=Ve(hu,n)),sn===fu&&ka(e,on)),lr(e,r),n===Me&&Qe===an&&(t.mode&qe)===we&&!ri.isBatchingLegacy&&(pu(),Yy()))}function LN(e,t,n){var r=e.current;r.lanes=t,fl(e,t,n),lr(e,n)}function zN(e){return(Qe&Nn)!==an}function lr(e,t){var n=e.callbackNode;D1(e,t);var r=ic(e,e===qn?on:q);if(r===q){n!==null&&ub(n),e.callbackNode=null,e.callbackPriority=vn;return}var a=to(r),s=e.callbackPriority;if(s===a&&!(ri.current!==null&&n!==qp)){n==null&&s!==Me&&u("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}n!=null&&ub(n);var f;if(a===Me)e.tag===ba?(ri.isBatchingLegacy!==null&&(ri.didScheduleLegacyUpdate=!0),cw(Qx.bind(null,e))):Xy(Qx.bind(null,e)),ri.current!==null?ri.current.push(Ea):mC(function(){(Qe&(Nn|Lr))===an&&Ea()}),f=null;else{var m;switch(Pg(r)){case pr:m=ec;break;case Ii:m=Bd;break;case ji:m=Za;break;case sc:m=Ud;break;default:m=Za;break}f=Qp(m,$x.bind(null,e))}e.callbackPriority=a,e.callbackNode=f}function $x(e,t){if(eT(),yu=Et,Ff=q,(Qe&(Nn|Lr))!==an)throw new Error("Should not already be working.");var n=e.callbackNode,r=Ji();if(r&&e.callbackNode!==n)return null;var a=ic(e,e===qn?on:q);if(a===q)return null;var s=!ac(e,a)&&!L1(e,a)&&!t,f=s?XN(e,a):Vf(e,a);if(f!==Qi){if(f===go){var m=sh(e);m!==q&&(a=m,f=Hp(e,m))}if(f===cu){var g=du;throw xo(e,q),ka(e,a),lr(e,mn()),g}if(f===Lp)ka(e,a);else{var R=!ac(e,a),S=e.current.alternate;if(R&&!BN(S)){if(f=Vf(e,a),f===go){var k=sh(e);k!==q&&(a=k,f=Hp(e,k))}if(f===cu){var D=du;throw xo(e,q),ka(e,a),lr(e,mn()),D}}e.finishedWork=S,e.finishedLanes=a,FN(e,f,a)}}return lr(e,mn()),e.callbackNode===n?$x.bind(null,e):null}function Hp(e,t){var n=mu;if(lc(e)){var r=xo(e,t);r.flags|=zi,rw(e.containerInfo)}var a=Vf(e,t);if(a!==go){var s=sr;sr=n,s!==null&&qx(s)}return a}function qx(e){sr===null?sr=e:sr.push.apply(sr,e)}function FN(e,t,n){switch(t){case Qi:case cu:throw new Error("Root did not complete. This is a bug in React.");case go:{bo(e,sr,Ki);break}case Of:{if(ka(e,n),wg(n)&&!cb()){var r=Fp+Gx-mn();if(r>10){var a=ic(e,q);if(a!==q)break;var s=e.suspendedLanes;if(!Xo(s,n)){Qn(),Dg(e,s);break}e.timeoutHandle=Vh(bo.bind(null,e,sr,Ki),r);break}}bo(e,sr,Ki);break}case fu:{if(ka(e,n),P1(n))break;if(!cb()){var f=N1(e,n),m=f,g=mn()-m,R=rA(g)-g;if(R>10){e.timeoutHandle=Vh(bo.bind(null,e,sr,Ki),R);break}}bo(e,sr,Ki);break}case Hx:{bo(e,sr,Ki);break}default:throw new Error("Unknown root exit status.")}}function BN(e){for(var t=e;;){if(t.flags&Zu){var n=t.updateQueue;if(n!==null){var r=n.stores;if(r!==null)for(var a=0;a<r.length;a++){var s=r[a],f=s.getSnapshot,m=s.value;try{if(!gr(f(),m))return!1}catch{return!1}}}}var g=t.child;if(t.subtreeFlags&Zu&&g!==null){g.return=t,t=g;continue}if(t===e)return!0;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}return!0}function ka(e,t){t=oc(t,Mf),t=oc(t,hu),B1(e,t)}function Qx(e){if(tT(),(Qe&(Nn|Lr))!==an)throw new Error("Should not already be working.");Ji();var t=ic(e,q);if(!mr(t,Me))return lr(e,mn()),null;var n=Vf(e,t);if(e.tag!==ba&&n===go){var r=sh(e);r!==q&&(t=r,n=Hp(e,r))}if(n===cu){var a=du;throw xo(e,q),ka(e,t),lr(e,mn()),a}if(n===Lp)throw new Error("Root did not complete. This is a bug in React.");var s=e.current.alternate;return e.finishedWork=s,e.finishedLanes=t,bo(e,sr,Ki),lr(e,mn()),null}function UN(e,t){t!==q&&(fh(e,Ve(t,Me)),lr(e,mn()),(Qe&(Nn|Lr))===an&&(pu(),Ea()))}function Gp(e,t){var n=Qe;Qe|=jx;try{return e(t)}finally{Qe=n,Qe===an&&!ri.isBatchingLegacy&&(pu(),Yy())}}function VN(e,t,n,r,a){var s=Xr(),f=Tn.transition;try{return Tn.transition=null,gn(pr),e(t,n,r,a)}finally{gn(s),Tn.transition=f,Qe===an&&pu()}}function Zi(e){Da!==null&&Da.tag===ba&&(Qe&(Nn|Lr))===an&&Ji();var t=Qe;Qe|=jx;var n=Tn.transition,r=Xr();try{return Tn.transition=null,gn(pr),e?e():void 0}finally{gn(r),Tn.transition=n,Qe=t,(Qe&(Nn|Lr))===an&&Ea()}}function Kx(){return(Qe&(Nn|Lr))!==an}function Uf(e,t){Bn(zp,bi,e),bi=Ve(bi,t)}function Wp(e){bi=zp.current,Fn(zp,e)}function xo(e,t){e.finishedWork=null,e.finishedLanes=q;var n=e.timeoutHandle;if(n!==Ih&&(e.timeoutHandle=Ih,hC(n)),kt!==null)for(var r=kt.return;r!==null;){var a=r.alternate;wx(a,r),r=r.return}qn=e;var s=Eo(e.current,null);return kt=s,on=bi=t,sn=Qi,du=null,kf=q,hu=q,Mf=q,mu=null,sr=null,Lw(),qr.discardPendingWarnings(),s}function Zx(e,t){do{var n=kt;try{if($c(),R0(),hn(),Pp.current=null,n===null||n.return===null){sn=cu,du=t,kt=null;return}if(jn&&n.mode&ft&&Sf(n,!0),On)if(jo(),t!==null&&typeof t=="object"&&typeof t.then=="function"){var r=t;v1(n,r,on)}else p1(n,t,on);cT(e,n.return,n,t,on),nb(n)}catch(a){t=a,kt===n&&n!==null?(n=n.return,kt=n):n=kt;continue}return}while(!0)}function Jx(){var e=Mp.current;return Mp.current=xf,e===null?xf:e}function eb(e){Mp.current=e}function IN(){Fp=mn()}function xu(e){kf=Ve(e,kf)}function jN(){sn===Qi&&(sn=Of)}function Xp(){(sn===Qi||sn===Of||sn===go)&&(sn=fu),qn!==null&&(lh(kf)||lh(hu))&&ka(qn,on)}function HN(e){sn!==fu&&(sn=go),mu===null?mu=[e]:mu.push(e)}function GN(){return sn===Qi}function Vf(e,t){var n=Qe;Qe|=Nn;var r=Jx();if(qn!==e||on!==t){if(Wr){var a=e.memoizedUpdaters;a.size>0&&(bu(e,on),a.clear()),kg(e,t)}Ki=Mg(),xo(e,t)}Eg(t);do try{WN();break}catch(s){Zx(e,s)}while(!0);if($c(),Qe=n,eb(r),kt!==null)throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return Rg(),qn=null,on=q,sn}function WN(){for(;kt!==null;)tb(kt)}function XN(e,t){var n=Qe;Qe|=Nn;var r=Jx();if(qn!==e||on!==t){if(Wr){var a=e.memoizedUpdaters;a.size>0&&(bu(e,on),a.clear()),kg(e,t)}Ki=Mg(),pu(),xo(e,t)}Eg(t);do try{YN();break}catch(s){Zx(e,s)}while(!0);return $c(),eb(r),Qe=n,kt!==null?(E1(),Qi):(Rg(),qn=null,on=q,sn)}function YN(){for(;kt!==null&&!qR();)tb(kt)}function tb(e){var t=e.alternate;Ot(e);var n;(e.mode&ft)!==we?(qm(e),n=Yp(t,e,bi),Sf(e,!0)):n=Yp(t,e,bi),hn(),e.memoizedProps=e.pendingProps,n===null?nb(e):kt=n,Pp.current=null}function nb(e){var t=e;do{var n=t.alternate,r=t.return;if((t.flags&nl)===Ne){Ot(t);var a=void 0;if((t.mode&ft)===we?a=Cx(n,t,bi):(qm(t),a=Cx(n,t,bi),Sf(t,!1)),hn(),a!==null){kt=a;return}}else{var s=jT(n,t);if(s!==null){s.flags&=HR,kt=s;return}if((t.mode&ft)!==we){Sf(t,!1);for(var f=t.actualDuration,m=t.child;m!==null;)f+=m.actualDuration,m=m.sibling;t.actualDuration=f}if(r!==null)r.flags|=nl,r.subtreeFlags=Ne,r.deletions=null;else{sn=Lp,kt=null;return}}var g=t.sibling;if(g!==null){kt=g;return}t=r,kt=t}while(t!==null);sn===Qi&&(sn=Hx)}function bo(e,t,n){var r=Xr(),a=Tn.transition;try{Tn.transition=null,gn(pr),$N(e,t,n,r)}finally{Tn.transition=a,gn(r)}return null}function $N(e,t,n,r){do Ji();while(Da!==null);if(aA(),(Qe&(Nn|Lr))!==an)throw new Error("Should not already be working.");var a=e.finishedWork,s=e.finishedLanes;if(l1(s),a===null)return yg(),null;if(s===q&&u("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=q,a===e.current)throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");e.callbackNode=null,e.callbackPriority=vn;var f=Ve(a.lanes,a.childLanes);U1(e,f),e===qn&&(qn=null,kt=null,on=q),((a.subtreeFlags&Vo)!==Ne||(a.flags&Vo)!==Ne)&&(yo||(yo=!0,Vp=n,Qp(Za,function(){return Ji(),null})));var m=(a.subtreeFlags&(zd|Fd|rl|Vo))!==Ne,g=(a.flags&(zd|Fd|rl|Vo))!==Ne;if(m||g){var R=Tn.transition;Tn.transition=null;var S=Xr();gn(pr);var k=Qe;Qe|=Lr,Pp.current=null,YT(e,a),Y0(),sN(e,a,s),oC(e.containerInfo),e.current=a,g1(s),lN(a,e,s),y1(),QR(),Qe=k,gn(S),Tn.transition=R}else e.current=a,Y0();var D=yo;if(yo?(yo=!1,Da=e,vu=s):(Rs=0,zf=null),f=e.pendingLanes,f===q&&(Es=null),D||ob(e.current,!1),r1(a.stateNode,r),Wr&&e.memoizedUpdaters.clear(),TN(),lr(e,mn()),t!==null)for(var z=e.onRecoverableError,B=0;B<t.length;B++){var I=t[B],fe=I.stack,Ce=I.digest;z(I.value,{componentStack:fe,digest:Ce})}if(Pf){Pf=!1;var _e=Bp;throw Bp=null,_e}return mr(vu,Me)&&e.tag!==ba&&Ji(),f=e.pendingLanes,mr(f,Me)?(Jw(),e===Ip?gu++:(gu=0,Ip=e)):gu=0,Ea(),yg(),null}function Ji(){if(Da!==null){var e=Pg(vu),t=H1(ji,e),n=Tn.transition,r=Xr();try{return Tn.transition=null,gn(t),QN()}finally{gn(r),Tn.transition=n}}return!1}function qN(e){Up.push(e),yo||(yo=!0,Qp(Za,function(){return Ji(),null}))}function QN(){if(Da===null)return!1;var e=Vp;Vp=null;var t=Da,n=vu;if(Da=null,vu=q,(Qe&(Nn|Lr))!==an)throw new Error("Cannot flush passive effects while already rendering.");jp=!0,Lf=!1,x1(n);var r=Qe;Qe|=Lr,pN(t.current),fN(t,t.current,n,e);{var a=Up;Up=[];for(var s=0;s<a.length;s++){var f=a[s];KT(t,f)}}b1(),ob(t.current,!0),Qe=r,Ea(),Lf?t===zf?Rs++:(Rs=0,zf=t):Rs=0,jp=!1,Lf=!1,i1(t);{var m=t.current.stateNode;m.effectDuration=0,m.passiveEffectDuration=0}return!0}function rb(e){return Es!==null&&Es.has(e)}function KN(e){Es===null?Es=new Set([e]):Es.add(e)}function ZN(e){Pf||(Pf=!0,Bp=e)}var JN=ZN;function ib(e,t,n){var r=po(n,t),a=tx(e,r,Me),s=_a(e,a,Me),f=Qn();s!==null&&(fl(s,Me,f),lr(s,f))}function gt(e,t,n){if(GT(n),Eu(!1),e.tag===w){ib(e,e,n);return}var r=null;for(r=t;r!==null;){if(r.tag===w){ib(r,e,n);return}else if(r.tag===p){var a=r.type,s=r.stateNode;if(typeof a.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&!rb(s)){var f=po(n,e),m=hp(r,f,Me),g=_a(r,m,Me),R=Qn();g!==null&&(fl(g,Me,R),lr(g,R));return}}r=r.return}u(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,n)}function eA(e,t,n){var r=e.pingCache;r!==null&&r.delete(t);var a=Qn();Dg(e,n),uA(e),qn===e&&Xo(on,n)&&(sn===fu||sn===Of&&wg(on)&&mn()-Fp<Gx?xo(e,q):Mf=Ve(Mf,n)),lr(e,a)}function ab(e,t){t===vn&&(t=PN(e));var n=Qn(),r=ar(e,t);r!==null&&(fl(r,t,n),lr(r,n))}function tA(e){var t=e.memoizedState,n=vn;t!==null&&(n=t.retryLane),ab(e,n)}function nA(e,t){var n=vn,r;switch(e.tag){case V:r=e.stateNode;var a=e.memoizedState;a!==null&&(n=a.retryLane);break;case pe:r=e.stateNode;break;default:throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}r!==null&&r.delete(t),ab(e,n)}function rA(e){return e<120?120:e<480?480:e<1080?1080:e<1920?1920:e<3e3?3e3:e<4320?4320:DN(e/1960)*1960}function iA(){if(gu>kN)throw gu=0,Ip=null,new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Rs>MN&&(Rs=0,zf=null,u("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))}function aA(){qr.flushLegacyContextWarning(),qr.flushPendingUnsafeLifecycleWarnings()}function ob(e,t){Ot(e),If(e,Bi,SN),t&&If(e,Ju,CN),If(e,Bi,RN),t&&If(e,Ju,_N),hn()}function If(e,t,n){for(var r=e,a=null;r!==null;){var s=r.subtreeFlags&t;r!==a&&r.child!==null&&s!==Ne?r=r.child:((r.flags&t)!==Ne&&n(r),r.sibling!==null?r=r.sibling:r=a=r.return)}}var jf=null;function sb(e){{if((Qe&Nn)!==an||!(e.mode&qe))return;var t=e.tag;if(t!==_&&t!==w&&t!==p&&t!==v&&t!==$&&t!==re&&t!==Q)return;var n=Be(e)||"ReactComponent";if(jf!==null){if(jf.has(n))return;jf.add(n)}else jf=new Set([n]);var r=Ln;try{Ot(e),u("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{r?Ot(e):hn()}}}var Yp;{var oA=null;Yp=function(e,t,n){var r=pb(oA,t);try{return bx(e,t,n)}catch(s){if(yw()||s!==null&&typeof s=="object"&&typeof s.then=="function")throw s;if($c(),R0(),wx(e,t),pb(t,r),t.mode&ft&&qm(t),Dd(null,bx,null,e,t,n),UR()){var a=Od();typeof a=="object"&&a!==null&&a._suppressLogging&&typeof s=="object"&&s!==null&&!s._suppressLogging&&(s._suppressLogging=!0)}throw s}}}var lb=!1,$p;$p=new Set;function sA(e){if(Ga&&!Qw())switch(e.tag){case v:case $:case Q:{var t=kt&&Be(kt)||"Unknown",n=t;if(!$p.has(n)){$p.add(n);var r=Be(e)||"Unknown";u("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",r,t,t)}break}case p:{lb||(u("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),lb=!0);break}}}function bu(e,t){if(Wr){var n=e.memoizedUpdaters;n.forEach(function(r){Og(e,r,t)})}}var qp={};function Qp(e,t){{var n=ri.current;return n!==null?(n.push(t),qp):gg(e,t)}}function ub(e){if(e!==qp)return $R(e)}function cb(){return ri.current!==null}function lA(e){{if(e.mode&qe){if(!Ix())return}else if(!AN()||Qe!==an||e.tag!==v&&e.tag!==$&&e.tag!==Q)return;if(ri.current===null){var t=Ln;try{Ot(e),u(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`,Be(e))}finally{t?Ot(e):hn()}}}}function uA(e){e.tag!==ba&&Ix()&&ri.current===null&&u(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`)}function Eu(e){Yx=e}var zr=null,_s=null,cA=function(e){zr=e};function Ss(e){{if(zr===null)return e;var t=zr(e);return t===void 0?e:t.current}}function Kp(e){return Ss(e)}function Zp(e){{if(zr===null)return e;var t=zr(e);if(t===void 0){if(e!=null&&typeof e.render=="function"){var n=Ss(e.render);if(e.render!==n){var r={$$typeof:Oe,render:n};return e.displayName!==void 0&&(r.displayName=e.displayName),r}}return e}return t.current}}function fb(e,t){{if(zr===null)return!1;var n=e.elementType,r=t.type,a=!1,s=typeof r=="object"&&r!==null?r.$$typeof:null;switch(e.tag){case p:{typeof r=="function"&&(a=!0);break}case v:{(typeof r=="function"||s===He)&&(a=!0);break}case $:{(s===Oe||s===He)&&(a=!0);break}case re:case Q:{(s===Dt||s===He)&&(a=!0);break}default:return!1}if(a){var f=zr(n);if(f!==void 0&&f===zr(r))return!0}return!1}}function db(e){{if(zr===null||typeof WeakSet!="function")return;_s===null&&(_s=new WeakSet),_s.add(e)}}var fA=function(e,t){{if(zr===null)return;var n=t.staleFamilies,r=t.updatedFamilies;Ji(),Zi(function(){Jp(e.current,r,n)})}},dA=function(e,t){{if(e.context!==yr)return;Ji(),Zi(function(){Ru(t,e,null,null)})}};function Jp(e,t,n){{var r=e.alternate,a=e.child,s=e.sibling,f=e.tag,m=e.type,g=null;switch(f){case v:case Q:case p:g=m;break;case $:g=m.render;break}if(zr===null)throw new Error("Expected resolveFamily to be set during hot reload.");var R=!1,S=!1;if(g!==null){var k=zr(g);k!==void 0&&(n.has(k)?S=!0:t.has(k)&&(f===p?S=!0:R=!0))}if(_s!==null&&(_s.has(e)||r!==null&&_s.has(r))&&(S=!0),S&&(e._debugNeedsRemount=!0),S||R){var D=ar(e,Me);D!==null&&ln(D,e,Me,Et)}a!==null&&!S&&Jp(a,t,n),s!==null&&Jp(s,t,n)}}var hA=function(e,t){{var n=new Set,r=new Set(t.map(function(a){return a.current}));return ev(e.current,r,n),n}};function ev(e,t,n){{var r=e.child,a=e.sibling,s=e.tag,f=e.type,m=null;switch(s){case v:case Q:case p:m=f;break;case $:m=f.render;break}var g=!1;m!==null&&t.has(m)&&(g=!0),g?mA(e,n):r!==null&&ev(r,t,n),a!==null&&ev(a,t,n)}}function mA(e,t){{var n=pA(e,t);if(n)return;for(var r=e;;){switch(r.tag){case C:t.add(r.stateNode);return;case T:t.add(r.stateNode.containerInfo);return;case w:t.add(r.stateNode.containerInfo);return}if(r.return===null)throw new Error("Expected to reach root first.");r=r.return}}}function pA(e,t){for(var n=e,r=!1;;){if(n.tag===C)r=!0,t.add(n.stateNode);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)return r;for(;n.sibling===null;){if(n.return===null||n.return===e)return r;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}var tv;{tv=!1;try{var hb=Object.preventExtensions({})}catch{tv=!0}}function vA(e,t,n,r){this.tag=e,this.key=n,this.elementType=null,this.type=null,this.stateNode=null,this.return=null,this.child=null,this.sibling=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedProps=null,this.updateQueue=null,this.memoizedState=null,this.dependencies=null,this.mode=r,this.flags=Ne,this.subtreeFlags=Ne,this.deletions=null,this.lanes=q,this.childLanes=q,this.alternate=null,this.actualDuration=Number.NaN,this.actualStartTime=Number.NaN,this.selfBaseDuration=Number.NaN,this.treeBaseDuration=Number.NaN,this.actualDuration=0,this.actualStartTime=-1,this.selfBaseDuration=0,this.treeBaseDuration=0,this._debugSource=null,this._debugOwner=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,!tv&&typeof Object.preventExtensions=="function"&&Object.preventExtensions(this)}var xr=function(e,t,n,r){return new vA(e,t,n,r)};function nv(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function gA(e){return typeof e=="function"&&!nv(e)&&e.defaultProps===void 0}function yA(e){if(typeof e=="function")return nv(e)?p:v;if(e!=null){var t=e.$$typeof;if(t===Oe)return $;if(t===Dt)return re}return _}function Eo(e,t){var n=e.alternate;n===null?(n=xr(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n._debugSource=e._debugSource,n._debugOwner=e._debugOwner,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=Ne,n.subtreeFlags=Ne,n.deletions=null,n.actualDuration=0,n.actualStartTime=-1),n.flags=e.flags&Ui,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue;var r=e.dependencies;switch(n.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case _:case v:case Q:n.type=Ss(e.type);break;case p:n.type=Kp(e.type);break;case $:n.type=Zp(e.type);break}return n}function xA(e,t){e.flags&=Ui|Yt;var n=e.alternate;if(n===null)e.childLanes=q,e.lanes=t,e.child=null,e.subtreeFlags=Ne,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0;else{e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=Ne,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type;var r=n.dependencies;e.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration}return e}function bA(e,t,n){var r;return e===Bc?(r=qe,t===!0&&(r|=zt,r|=ci)):r=we,Wr&&(r|=ft),xr(w,null,null,r)}function rv(e,t,n,r,a,s){var f=_,m=e;if(typeof e=="function")nv(e)?(f=p,m=Kp(m)):m=Ss(m);else if(typeof e=="string")f=C;else e:switch(e){case A:return Ma(n.children,a,s,t);case Z:f=Y,a|=zt,(a&qe)!==we&&(a|=ci);break;case ce:return EA(n,a,s,t);case Ie:return RA(n,a,s,t);case Ue:return _A(n,a,s,t);case jr:return mb(n,a,s,t);case Hr:case Nt:case dn:case Ia:case Pn:default:{if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Te:f=O;break e;case Ye:f=H;break e;case Oe:f=$,m=Zp(m);break e;case Dt:f=re;break e;case He:f=xe,m=null;break e}var g="";{(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(g+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var R=r?Be(r):null;R&&(g+=`

Check the render method of \``+R+"`.")}throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) "+("but got: "+(e==null?e:typeof e)+"."+g))}}var S=xr(f,n,t,a);return S.elementType=e,S.type=m,S.lanes=s,S._debugOwner=r,S}function iv(e,t,n){var r=null;r=e._owner;var a=e.type,s=e.key,f=e.props,m=rv(a,s,f,r,t,n);return m._debugSource=e._source,m._debugOwner=e._owner,m}function Ma(e,t,n,r){var a=xr(G,e,r,t);return a.lanes=n,a}function EA(e,t,n,r){typeof e.id!="string"&&u('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id);var a=xr(ae,e,r,t|ft);return a.elementType=ce,a.lanes=n,a.stateNode={effectDuration:0,passiveEffectDuration:0},a}function RA(e,t,n,r){var a=xr(V,e,r,t);return a.elementType=Ie,a.lanes=n,a}function _A(e,t,n,r){var a=xr(pe,e,r,t);return a.elementType=Ue,a.lanes=n,a}function mb(e,t,n,r){var a=xr(se,e,r,t);a.elementType=jr,a.lanes=n;var s={isHidden:!1};return a.stateNode=s,a}function av(e,t,n){var r=xr(M,e,null,t);return r.lanes=n,r}function SA(){var e=xr(C,null,null,we);return e.elementType="DELETED",e}function CA(e){var t=xr(K,null,null,we);return t.stateNode=e,t}function ov(e,t,n){var r=e.children!==null?e.children:[],a=xr(T,r,e.key,t);return a.lanes=n,a.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},a}function pb(e,t){return e===null&&(e=xr(_,null,null,we)),e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function wA(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=Ih,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=vn,this.eventTimes=ch(q),this.expirationTimes=ch(Et),this.pendingLanes=q,this.suspendedLanes=q,this.pingedLanes=q,this.expiredLanes=q,this.mutableReadLanes=q,this.finishedLanes=q,this.entangledLanes=q,this.entanglements=ch(q),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null,this.effectDuration=0,this.passiveEffectDuration=0;{this.memoizedUpdaters=new Set;for(var s=this.pendingUpdatersLaneMap=[],f=0;f<Id;f++)s.push(new Set)}switch(t){case Bc:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case ba:this._debugRootType=n?"hydrate()":"render()";break}}function vb(e,t,n,r,a,s,f,m,g,R){var S=new wA(e,t,n,m,g),k=bA(t,s);S.current=k,k.stateNode=S;{var D={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null};k.memoizedState=D}return xm(k),S}var sv="18.3.1";function TA(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null;return Cr(r),{$$typeof:Ir,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}var lv,uv;lv=!1,uv={};function gb(e){if(!e)return yr;var t=Bo(e),n=uw(t);if(t.tag===p){var r=t.type;if(hi(r))return Gy(t,r,n)}return n}function NA(e,t){{var n=Bo(e);if(n===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var r=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+r)}var a=mg(n);if(a===null)return null;if(a.mode&zt){var s=Be(n)||"Component";if(!uv[s]){uv[s]=!0;var f=Ln;try{Ot(a),n.mode&zt?u("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,s):u("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,s)}finally{f?Ot(f):hn()}}}return a.stateNode}}function yb(e,t,n,r,a,s,f,m){var g=!1,R=null;return vb(e,t,g,R,n,r,a,s,f)}function xb(e,t,n,r,a,s,f,m,g,R){var S=!0,k=vb(n,r,S,e,a,s,f,m,g);k.context=gb(null);var D=k.current,z=Qn(),B=Oa(D),I=$i(z,B);return I.callback=t??null,_a(D,I,B),LN(k,B,z),k}function Ru(e,t,n,r){n1(t,e);var a=t.current,s=Qn(),f=Oa(a);R1(f);var m=gb(n);t.context===null?t.context=m:t.pendingContext=m,Ga&&Ln!==null&&!lv&&(lv=!0,u(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,Be(Ln)||"Unknown"));var g=$i(s,f);g.payload={element:e},r=r===void 0?null:r,r!==null&&(typeof r!="function"&&u("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",r),g.callback=r);var R=_a(a,g,f);return R!==null&&(ln(R,a,f,s),Jc(R,a,f)),f}function Hf(e){var t=e.current;if(!t.child)return null;switch(t.child.tag){case C:return t.child.stateNode;default:return t.child.stateNode}}function AA(e){switch(e.tag){case w:{var t=e.stateNode;if(lc(t)){var n=O1(t);UN(t,n)}break}case V:{Zi(function(){var a=ar(e,Me);if(a!==null){var s=Qn();ln(a,e,Me,s)}});var r=Me;cv(e,r);break}}}function bb(e,t){var n=e.memoizedState;n!==null&&n.dehydrated!==null&&(n.retryLane=F1(n.retryLane,t))}function cv(e,t){bb(e,t);var n=e.alternate;n&&bb(n,t)}function DA(e){if(e.tag===V){var t=sl,n=ar(e,t);if(n!==null){var r=Qn();ln(n,e,t,r)}cv(e,t)}}function OA(e){if(e.tag===V){var t=Oa(e),n=ar(e,t);if(n!==null){var r=Qn();ln(n,e,t,r)}cv(e,t)}}function Eb(e){var t=YR(e);return t===null?null:t.stateNode}var Rb=function(e){return null};function kA(e){return Rb(e)}var _b=function(e){return!1};function MA(e){return _b(e)}var Sb=null,Cb=null,wb=null,Tb=null,Nb=null,Ab=null,Db=null,Ob=null,kb=null;{var Mb=function(e,t,n){var r=t[n],a=nt(e)?e.slice():We({},e);return n+1===t.length?(nt(a)?a.splice(r,1):delete a[r],a):(a[r]=Mb(e[r],t,n+1),a)},Pb=function(e,t){return Mb(e,t,0)},Lb=function(e,t,n,r){var a=t[r],s=nt(e)?e.slice():We({},e);if(r+1===t.length){var f=n[r];s[f]=s[a],nt(s)?s.splice(a,1):delete s[a]}else s[a]=Lb(e[a],t,n,r+1);return s},zb=function(e,t,n){if(t.length!==n.length){d("copyWithRename() expects paths of the same length");return}else for(var r=0;r<n.length-1;r++)if(t[r]!==n[r]){d("copyWithRename() expects paths to be the same except for the deepest key");return}return Lb(e,t,n,0)},Fb=function(e,t,n,r){if(n>=t.length)return r;var a=t[n],s=nt(e)?e.slice():We({},e);return s[a]=Fb(e[a],t,n+1,r),s},Bb=function(e,t,n){return Fb(e,t,0,n)},fv=function(e,t){for(var n=e.memoizedState;n!==null&&t>0;)n=n.next,t--;return n};Sb=function(e,t,n,r){var a=fv(e,t);if(a!==null){var s=Bb(a.memoizedState,n,r);a.memoizedState=s,a.baseState=s,e.memoizedProps=We({},e.memoizedProps);var f=ar(e,Me);f!==null&&ln(f,e,Me,Et)}},Cb=function(e,t,n){var r=fv(e,t);if(r!==null){var a=Pb(r.memoizedState,n);r.memoizedState=a,r.baseState=a,e.memoizedProps=We({},e.memoizedProps);var s=ar(e,Me);s!==null&&ln(s,e,Me,Et)}},wb=function(e,t,n,r){var a=fv(e,t);if(a!==null){var s=zb(a.memoizedState,n,r);a.memoizedState=s,a.baseState=s,e.memoizedProps=We({},e.memoizedProps);var f=ar(e,Me);f!==null&&ln(f,e,Me,Et)}},Tb=function(e,t,n){e.pendingProps=Bb(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=ar(e,Me);r!==null&&ln(r,e,Me,Et)},Nb=function(e,t){e.pendingProps=Pb(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=ar(e,Me);n!==null&&ln(n,e,Me,Et)},Ab=function(e,t,n){e.pendingProps=zb(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=ar(e,Me);r!==null&&ln(r,e,Me,Et)},Db=function(e){var t=ar(e,Me);t!==null&&ln(t,e,Me,Et)},Ob=function(e){Rb=e},kb=function(e){_b=e}}function PA(e){var t=mg(e);return t===null?null:t.stateNode}function LA(e){return null}function zA(){return Ln}function FA(e){var t=e.findFiberByHostInstance,n=i.ReactCurrentDispatcher;return t1({bundleType:e.bundleType,version:e.version,rendererPackageName:e.rendererPackageName,rendererConfig:e.rendererConfig,overrideHookState:Sb,overrideHookStateDeletePath:Cb,overrideHookStateRenamePath:wb,overrideProps:Tb,overridePropsDeletePath:Nb,overridePropsRenamePath:Ab,setErrorHandler:Ob,setSuspenseHandler:kb,scheduleUpdate:Db,currentDispatcherRef:n,findHostInstanceByFiber:PA,findFiberByHostInstance:t||LA,findHostInstancesForRefresh:hA,scheduleRefresh:fA,scheduleRoot:dA,setRefreshHandler:cA,getCurrentFiber:zA,reconcilerVersion:sv})}var Ub=typeof reportError=="function"?reportError:function(e){console.error(e)};function dv(e){this._internalRoot=e}Gf.prototype.render=dv.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw new Error("Cannot update an unmounted root.");{typeof arguments[1]=="function"?u("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."):Wf(arguments[1])?u("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."):typeof arguments[1]<"u"&&u("You passed a second argument to root.render(...) but it only accepts one argument.");var n=t.containerInfo;if(n.nodeType!==Xt){var r=Eb(t.current);r&&r.parentNode!==n&&u("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.")}}Ru(e,t,null,null)},Gf.prototype.unmount=dv.prototype.unmount=function(){typeof arguments[0]=="function"&&u("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Kx()&&u("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."),Zi(function(){Ru(null,e,null,null)}),Uy(t)}};function BA(e,t){if(!Wf(e))throw new Error("createRoot(...): Target container is not a DOM element.");Vb(e);var n=!1,r=!1,a="",s=Ub;t!=null&&(t.hydrate?d("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."):typeof t=="object"&&t!==null&&t.$$typeof===si&&u(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`),t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError),t.transitionCallbacks!==void 0&&t.transitionCallbacks);var f=yb(e,Bc,null,n,r,a,s);Oc(f.current,e);var m=e.nodeType===Xt?e.parentNode:e;return Nl(m),new dv(f)}function Gf(e){this._internalRoot=e}function UA(e){e&&e_(e)}Gf.prototype.unstable_scheduleHydration=UA;function VA(e,t,n){if(!Wf(e))throw new Error("hydrateRoot(...): Target container is not a DOM element.");Vb(e),t===void 0&&u("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");var r=n??null,a=n!=null&&n.hydratedSources||null,s=!1,f=!1,m="",g=Ub;n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(m=n.identifierPrefix),n.onRecoverableError!==void 0&&(g=n.onRecoverableError));var R=xb(t,null,e,Bc,r,s,f,m,g);if(Oc(R.current,e),Nl(e),a)for(var S=0;S<a.length;S++){var k=a[S];Gw(R,k)}return new Gf(R)}function Wf(e){return!!(e&&(e.nodeType===rr||e.nodeType===Li||e.nodeType===xd||!bt))}function _u(e){return!!(e&&(e.nodeType===rr||e.nodeType===Li||e.nodeType===xd||e.nodeType===Xt&&e.nodeValue===" react-mount-point-unstable "))}function Vb(e){e.nodeType===rr&&e.tagName&&e.tagName.toUpperCase()==="BODY"&&u("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."),Ul(e)&&(e._reactRootContainer?u("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."):u("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."))}var IA=i.ReactCurrentOwner,Ib;Ib=function(e){if(e._reactRootContainer&&e.nodeType!==Xt){var t=Eb(e._reactRootContainer.current);t&&t.parentNode!==e&&u("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.")}var n=!!e._reactRootContainer,r=hv(e),a=!!(r&&ya(r));a&&!n&&u("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."),e.nodeType===rr&&e.tagName&&e.tagName.toUpperCase()==="BODY"&&u("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.")};function hv(e){return e?e.nodeType===Li?e.documentElement:e.firstChild:null}function jb(){}function jA(e,t,n,r,a){if(a){if(typeof r=="function"){var s=r;r=function(){var D=Hf(f);s.call(D)}}var f=xb(t,r,e,ba,null,!1,!1,"",jb);e._reactRootContainer=f,Oc(f.current,e);var m=e.nodeType===Xt?e.parentNode:e;return Nl(m),Zi(),f}else{for(var g;g=e.lastChild;)e.removeChild(g);if(typeof r=="function"){var R=r;r=function(){var D=Hf(S);R.call(D)}}var S=yb(e,ba,null,!1,!1,"",jb);e._reactRootContainer=S,Oc(S.current,e);var k=e.nodeType===Xt?e.parentNode:e;return Nl(k),Zi(function(){Ru(t,S,n,r)}),S}}function HA(e,t){e!==null&&typeof e!="function"&&u("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e)}function Xf(e,t,n,r,a){Ib(n),HA(a===void 0?null:a,"render");var s=n._reactRootContainer,f;if(!s)f=jA(n,t,e,a,r);else{if(f=s,typeof a=="function"){var m=a;a=function(){var g=Hf(f);m.call(g)}}Ru(t,f,e,a)}return Hf(f)}var Hb=!1;function GA(e){{Hb||(Hb=!0,u("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));var t=IA.current;if(t!==null&&t.stateNode!==null){var n=t.stateNode._warnedAboutRefsInRender;n||u("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",Je(t.type)||"A component"),t.stateNode._warnedAboutRefsInRender=!0}}return e==null?null:e.nodeType===rr?e:NA(e,"findDOMNode")}function WA(e,t,n){if(u("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!_u(t))throw new Error("Target container is not a DOM element.");{var r=Ul(t)&&t._reactRootContainer===void 0;r&&u("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?")}return Xf(null,e,t,!0,n)}function XA(e,t,n){if(u("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!_u(t))throw new Error("Target container is not a DOM element.");{var r=Ul(t)&&t._reactRootContainer===void 0;r&&u("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?")}return Xf(null,e,t,!1,n)}function YA(e,t,n,r){if(u("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!_u(n))throw new Error("Target container is not a DOM element.");if(e==null||!VR(e))throw new Error("parentComponent must be a valid React Component");return Xf(e,t,n,!1,r)}var Gb=!1;function $A(e){if(Gb||(Gb=!0,u("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")),!_u(e))throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");{var t=Ul(e)&&e._reactRootContainer===void 0;t&&u("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?")}if(e._reactRootContainer){{var n=hv(e),r=n&&!ya(n);r&&u("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.")}return Zi(function(){Xf(null,null,e,!1,function(){e._reactRootContainer=null,Uy(e)})}),!0}else{{var a=hv(e),s=!!(a&&ya(a)),f=e.nodeType===rr&&_u(e.parentNode)&&!!e.parentNode._reactRootContainer;s&&u("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s",f?"You may have accidentally passed in a React root node instead of its container.":"Instead, have the parent component update its state and rerender in order to remove this component.")}return!1}}G1(AA),X1(DA),Y1(OA),$1(Xr),q1(I1),(typeof Map!="function"||Map.prototype==null||typeof Map.prototype.forEach!="function"||typeof Set!="function"||Set.prototype==null||typeof Set.prototype.clear!="function"||typeof Set.prototype.forEach!="function")&&u("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),AR(QS),kR(Gp,VN,Zi);function qA(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null;if(!Wf(t))throw new Error("Target container is not a DOM element.");return TA(e,t,null,n)}function QA(e,t,n,r){return YA(e,t,n,r)}var mv={usingClientEntryPoint:!1,Events:[ya,ts,kc,ng,rg,Gp]};function KA(e,t){return mv.usingClientEntryPoint||u('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),BA(e,t)}function ZA(e,t,n){return mv.usingClientEntryPoint||u('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),VA(e,t,n)}function JA(e){return Kx()&&u("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."),Zi(e)}var eD=FA({findFiberByHostInstance:ao,bundleType:1,version:sv,rendererPackageName:"react-dom"});if(!eD&&Mt&&window.top===window.self&&(navigator.userAgent.indexOf("Chrome")>-1&&navigator.userAgent.indexOf("Edge")===-1||navigator.userAgent.indexOf("Firefox")>-1)){var Wb=window.location.protocol;/^(https?|file):$/.test(Wb)&&console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools"+(Wb==="file:"?`
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq`:""),"font-weight:bold")}Rr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mv,Rr.createPortal=qA,Rr.createRoot=KA,Rr.findDOMNode=GA,Rr.flushSync=JA,Rr.hydrate=WA,Rr.hydrateRoot=ZA,Rr.render=XA,Rr.unmountComponentAtNode=$A,Rr.unstable_batchedUpdates=Gp,Rr.unstable_renderSubtreeIntoContainer=QA,Rr.version=sv,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})();pE.exports=Rr;var lD=pE.exports,pv=lD;{var Yf=pv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;_v.createRoot=function(h,l){Yf.usingClientEntryPoint=!0;try{return pv.createRoot(h,l)}finally{Yf.usingClientEntryPoint=!1}},_v.hydrateRoot=function(h,l,i){Yf.usingClientEntryPoint=!0;try{return pv.hydrateRoot(h,l,i)}finally{Yf.usingClientEntryPoint=!1}}}const uD="_arrow_1rhr5_45",cD={arrow:uD},Ov=({open:h})=>E.jsxDEV("div",{className:cD.arrow,"data-open":h,children:E.jsxDEV("svg",{width:"10",height:"10",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("g",{clipPath:"url(#clip0_57_2)",children:E.jsxDEV("path",{d:"M18 10L3 18.6603L3 1.33974L18 10Z",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:8,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),E.jsxDEV("defs",{children:E.jsxDEV("clipPath",{id:"clip0_57_2",children:E.jsxDEV("rect",{width:"20",height:"20",fill:"white"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:12,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:11,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:10,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),fD="_block_1l63f_45",dD="_head_1l63f_58",hD="_head_icon_1l63f_63",mD="_head_text_1l63f_72",pD="_content_1l63f_79",Cu={block:fD,head:dD,head_icon:hD,head_text:mD,content:pD},Ns=h=>{const[l,i]=ku.useState(!h.defaultClose),o=X.useCallback(()=>{h.accordion===!0&&i(!l)},[l,h.accordion]),c=h.bg&&typeof h.bg=="string"&&h.bg||void 0;return E.jsxDEV("div",{className:Cu.block,"data-bg":h.bg!==void 0,"data-nomargin":h.noMargin,"data-no_indent":h.noIndent,style:{backgroundColor:c},children:[E.jsxDEV("div",{className:Cu.head,"data-accordion":h.accordion,"data-open":l,children:[h.accordion&&E.jsxDEV("div",{className:Cu.head_icon,onClick:o,children:E.jsxDEV(Ov,{open:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:33,columnNumber:75},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:33,columnNumber:24},void 0),h.label&&E.jsxDEV("span",{className:Cu.head_text,children:h.label},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:34,columnNumber:20},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:32,columnNumber:3},void 0),l&&E.jsxDEV("div",{className:Cu.content,"data-open":l,"data-no_indent":h.noIndent,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:36,columnNumber:13},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:31,columnNumber:9},void 0)},vD="_button_fci8n_45",gD={button:vD},As=h=>E.jsxDEV("button",{className:gD.button,onClick:l=>{h.onClick&&h.onClick(l),l.preventDefault()},type:h.type||"button",children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Button/index.tsx",lineNumber:11,columnNumber:9},void 0),yD=X.createContext(null),vv={didCatch:!1,error:null};class xD extends X.Component{constructor(l){super(l),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=vv}static getDerivedStateFromError(l){return{didCatch:!0,error:l}}resetErrorBoundary(){const{error:l}=this.state;if(l!==null){for(var i,o,c=arguments.length,d=new Array(c),u=0;u<c;u++)d[u]=arguments[u];(i=(o=this.props).onReset)===null||i===void 0||i.call(o,{args:d,reason:"imperative-api"}),this.setState(vv)}}componentDidCatch(l,i){var o,c;(o=(c=this.props).onError)===null||o===void 0||o.call(c,l,i)}componentDidUpdate(l,i){const{didCatch:o}=this.state,{resetKeys:c}=this.props;if(o&&i.error!==null&&bD(l.resetKeys,c)){var d,u;(d=(u=this.props).onReset)===null||d===void 0||d.call(u,{next:c,prev:l.resetKeys,reason:"keys"}),this.setState(vv)}}render(){const{children:l,fallbackRender:i,FallbackComponent:o,fallback:c}=this.props,{didCatch:d,error:u}=this.state;let x=l;if(d){const v={error:u,resetErrorBoundary:this.resetErrorBoundary};if(typeof i=="function")x=i(v);else if(o)x=X.createElement(o,v);else if(c!==void 0)x=c;else throw console.error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop"),u}return X.createElement(yD.Provider,{value:{didCatch:d,error:u,resetErrorBoundary:this.resetErrorBoundary}},x)}}function bD(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return h.length!==l.length||h.some((i,o)=>!Object.is(i,l[o]))}const gv=900,ED=()=>{const[h,l]=X.useState(!1);return X.useEffect(()=>{let i=null;const o=()=>{const c=window.innerWidth;(i===null||(c-gv)*(i-gv)<=0)&&l(c<=gv),i=c};return o(),window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o)}},[]),{isPC:!h,isSP:h}},RD="_mouseMenu_11xi2_1",_D="_hide_11xi2_10",SD="_menuItem_11xi2_19",CD="_menuItem_inner_11xi2_23",wD="_menuItem_inner_inner_11xi2_26",wu={mouseMenu:RD,hide:_D,menuItem:SD,menuItem_inner:CD,menuItem_inner_inner:wD},yE=X.createContext(void 0),xE=X.createContext(null),kv=()=>{const h=X.useContext(xE);if(h===null)throw new Error("useMouseMenu must be used within a MouseMenuProvider");return h},Xb=()=>{const{itemList:h,containerRef:l,closeAll:i}=kv();return E.jsxDEV("div",{className:wu.mouseMenu,ref:l,children:[h&&h.length>0&&E.jsxDEV("div",{className:wu.hide,onClick:()=>{i&&i()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:14,columnNumber:40},void 0),h&&h.map((o,c)=>{const d=o.pos;return E.jsxDEV(yE.Provider,{value:o,children:E.jsxDEV("div",{className:wu.menuItem,style:{left:0,top:0,transform:`translate(${d.x}px, ${d.y}px)`},children:E.jsxDEV("div",{className:wu.menuItem_inner,children:E.jsxDEV("div",{className:wu.menuItem_inner_inner,"data-direction":o.direction,children:o.elm},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:29,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:28,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:27,columnNumber:7},void 0)},o.id,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:26,columnNumber:13},void 0)})]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:13,columnNumber:3},void 0)};let TD=0;const ND=()=>{const h=X.useRef(null),l=X.useRef({x:0,y:0}),i=X.useCallback(p=>{l.current.x=p.clientX,l.current.y=p.clientY},[]);X.useEffect(()=>(window.addEventListener("pointermove",i),()=>{window.removeEventListener("pointermove",i)}),[i]);const[o,c]=X.useState([]),d=X.useRef(o);d.current=o;const u=X.useCallback(p=>{d.current=d.current.filter(_=>_.id!==p),c(d.current)},[]),x=X.useCallback(()=>{c([])},[]),v=X.useCallback(p=>{const _=TD++,w={x:l.current.x,y:l.current.y},T=(w.x<window.innerWidth/2?"right":"left")+"-"+(w.y<window.innerHeight/2?"bottom":"top"),C={id:_,elm:p,pos:w,direction:T,close:()=>u(_)};return c([...d.current,C]),C},[u]);return{itemList:o,pushContent:v,closeAll:x,containerRef:h}},AD="_panel_vqys8_45",DD="_panel_inner_vqys8_51",OD="_content_vqys8_59",yv={panel:AD,panel_inner:DD,content:OD},_r=h=>E.jsxDEV("div",{className:yv.panel,style:{backgroundColor:h.bgColor},children:E.jsxDEV("div",{className:yv.panel_inner,children:E.jsxDEV("div",{className:yv.content,style:{padding:h.noPadding?"0 0":void 0},children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:17,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:16,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:15,columnNumber:9},void 0),kD="_panelContainer_xa08o_45",MD="_header_xa08o_54",PD="_header_item_xa08o_60",LD="_content_xa08o_75",$f={panelContainer:kD,header:MD,header_item:PD,content:LD},Pa=h=>{const[l,i]=X.useState(0);let o=h.children||[];return o=Array.isArray(o)?o:[o],E.jsxDEV("div",{className:$f.panelContainer,children:[E.jsxDEV("div",{className:$f.header,children:o.map((c,d)=>E.jsxDEV("div",{className:$f.header_item,onClick:()=>i(d),"data-active":d==l,children:E.jsxDEV("p",{children:c.props.title},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:25,columnNumber:6},void 0)},d,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:24,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:21,columnNumber:3},void 0),E.jsxDEV("div",{className:$f.content,children:o[l]},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:32,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:20,columnNumber:9},void 0)},bE=X.createContext(null),za=()=>{const h=X.useContext(bE);if(h===null)throw new Error("useEditor must be used within a EditorProvider");return h},Mv=(h,l)=>{const[i,o]=X.useState(()=>h?h.serialize():{}),c=l?[...l]:[],d=X.useMemo(()=>c,c);return X.useEffect(()=>{if(h===void 0)return;o(h.serialize());const u=x=>{let v=d.length==0;for(let p=0;p<d.length;p++)if(x.find(_=>_==d[p])){v=!0;break}v&&o(h.serialize())};return h.on("fields/update",u),()=>{h.off("fields/update",u)}},[h,d]),{fields:i}},Ht=(h,l)=>{const i=d=>{h==null||h.setField(l,d)},{fields:o}=Mv(h,[l]);return[o&&o[l],i]},EE=X.createContext(void 0),zD=h=>(Mv(h.target),{target:h.target}),FD=()=>{const h=X.useContext(EE);if(!h)throw new Error("SerializeFieldViewContext is not defined");return h},BD="_container_1xcsu_45",UD="_label_1xcsu_55",VD="_item_1xcsu_62",xv={container:BD,label:UD,item:VD},ai=h=>E.jsxDEV("div",{className:xv.container,"data-vertical":h.vertical,children:[E.jsxDEV("div",{className:xv.label,style:{textAlign:h.labelAlign||"left"},"data-vertical":h.vertical,children:h.title},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:12,columnNumber:4},void 0),E.jsxDEV("div",{className:xv.item,"data-vertical":h.vertical,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:13,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:11,columnNumber:3},void 0),ID=()=>E.jsxDEV("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("rect",{x:"2",y:"10.8486",width:"2.61726",height:"7.84447",transform:"rotate(-44.9331 2 10.8486)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:5,columnNumber:3},void 0),E.jsxDEV("rect",{x:"9.38757",y:"14.5518",width:"2.57272",height:"12.3494",transform:"rotate(-135 9.38757 14.5518)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:6,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:4,columnNumber:9},void 0),jD="_inputBoolean_1xgaw_45",HD="_input_1xgaw_45",GD="_check_1xgaw_60",bv={inputBoolean:jD,input:HD,check:GD},RE=({onChange:h,...l})=>E.jsxDEV("div",{className:bv.inputBoolean,onClick:i=>{i.stopPropagation()},children:E.jsxDEV("label",{children:[E.jsxDEV("input",{className:bv.input,type:"checkbox",checked:l.checked,disabled:l.disabled,readOnly:l.readOnly,onChange:i=>{l.readOnly||h&&h(i.target.checked)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:22,columnNumber:4},void 0),E.jsxDEV("div",{className:bv.check,"data-read_only":l.readOnly,children:l.checked&&E.jsxDEV(ID,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:36,columnNumber:23},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:35,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:21,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:16,columnNumber:9},void 0),WD="_input_1rofd_45",Yb={input:WD},Pv=h=>{const l=X.useRef(!1),i=X.useRef();i.current=h.onChange;const o=X.useRef();o.current=h.value;const c=X.useCallback(x=>{const v=o.current;if(l.current===!1)return;const p=x.movementX;if(typeof v=="number"){const _=p*.05*(h.step||1);i.current&&i.current(v+_),x.stopPropagation()}x.preventDefault()},[h.step]),d=X.useCallback(x=>{l.current=!0;const v=()=>{l.current=!1,window.removeEventListener("pointerup",v),window.removeEventListener("pointermove",c)};window.addEventListener("pointerup",v),window.addEventListener("pointermove",c)},[c]),u=Number((h.value||0).toFixed(h.precision??3));return E.jsxDEV("div",{className:Yb.inputNumber,children:E.jsxDEV("input",{className:Yb.input,type:"number",value:u,disabled:h.disabled,readOnly:h.readOnly,"data-lo":h.readOnly,step:h.step||1,min:h.min,max:h.max,onChange:x=>{h.onChange(Number(x.target.value))},onPointerDown:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputNumber/index.tsx",lineNumber:72,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputNumber/index.tsx",lineNumber:71,columnNumber:9},void 0)},XD="_inputSelect_d7lo3_45",YD="_input_d7lo3_45",qf={inputSelect:XD,input:YD},$D=({onChange:h,value:l,...i})=>{if(i.readOnly)return E.jsxDEV("div",{className:qf.inputSelect,children:E.jsxDEV("input",{className:qf.input,value:l,readOnly:!0},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:20,columnNumber:10},void 0);let o=i.selectList;return typeof o=="function"&&(o=o()),E.jsxDEV("div",{className:qf.inputSelect,children:E.jsxDEV("select",{className:qf.input,onChange:c=>{h&&h(c.target.value)},value:l,children:o.map((c,d)=>{let u="",x="";return typeof c=="string"?(u=c,x=c):(u=c.label,x=c.value),E.jsxDEV("option",{value:x,children:u},d,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:61,columnNumber:12},void 0)})},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:34,columnNumber:9},void 0)},qD="_input_ndjbn_45",$b={input:qD},Sv=({onChange:h,value:l,...i})=>{const[o,c]=X.useState(l),d=X.useCallback(()=>{h&&h(o)},[o,h]);return X.useEffect(()=>{c(l)},[l]),E.jsxDEV("div",{className:$b.container,children:E.jsxDEV("input",{className:$b.input,type:"text",value:o,placeholder:i.readOnly?"-":"",disabled:i.disabled,readOnly:i.readOnly,"data-lo":i.readOnly,onChange:u=>{c(u.target.value)},onBlur:u=>{d()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputText/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputText/index.tsx",lineNumber:34,columnNumber:9},void 0)},QD={},KD=["x","y","z","w"],_E=({onChange:h,disabled:l,...i})=>{const o=X.useRef();o.current=i.value;const c=X.useCallback((u,x)=>{if(h&&o.current){const v={};for(let p=0;p<o.current.length;p++)v[p]=o.current[p];v[u]=x,h(v)}},[h]),d=[];for(let u=0;u<i.value.length;u++)d.push(E.jsxDEV(ai,{title:KD[u],labelAlign:"right",children:E.jsxDEV(Pv,{disabled:l,value:i.value[u],step:i.step,onChange:x=>{c(u,x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:49,columnNumber:5},void 0)},u,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:48,columnNumber:4},void 0));return E.jsxDEV("div",{className:QD.vector,children:d.map(u=>u)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:59,columnNumber:9},void 0)},Si=h=>{let l=null;const i=h.onChange,o=h.value,c=h.format,d=u=>{i&&i(u)};if(o==null)return null;if(c&&(c.type=="vector"&&Array.isArray(o)?l=E.jsxDEV(_E,{value:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:48,columnNumber:15},void 0):c.type=="select"&&(l=E.jsxDEV($D,{value:o,onChange:d,selectList:c.list},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:52,columnNumber:15},void 0))),!l)if(typeof o=="number")l=E.jsxDEV(Pv,{...h,value:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:62,columnNumber:15},void 0);else if(typeof o=="string")l=E.jsxDEV(Sv,{...h,value:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:66,columnNumber:15},void 0);else if(typeof o=="boolean")l=E.jsxDEV(RE,{...h,checked:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:70,columnNumber:15},void 0);else if(typeof o=="function"){const u=h.label||"Run";l=E.jsxDEV(As,{onClick:()=>{o()},children:u},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:76,columnNumber:15},void 0)}else l=E.jsxDEV(Sv,{...h,value:JSON.stringify(o),onChange:()=>{}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:86,columnNumber:15},void 0);return l},ZD="_container_dlq1w_1",JD={container:ZD},eO=h=>{const l=[],i=h.value,o=h.format,c=(o==null?void 0:o.type)=="array"?o.labels:void 0;if(i===void 0)return null;for(let d=0;d<i.length;d++){const u=i[d];let x=d.toString();c&&(x+="/ "+c(u,d)),l.push(E.jsxDEV(ai,{title:x,children:E.jsxDEV(Si,{...h,value:u,onChange:v=>{const p=i.concat();p[d]=v,h.onChange&&h.onChange(p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:32,columnNumber:5},void 0)},d,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:31,columnNumber:4},void 0))}return E.jsxDEV("div",{className:JD.container,children:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:50,columnNumber:9},void 0)},tO=h=>{const{target:l}=FD(),i=h.field.value,o=typeof i,c=h.field.opt,d=c==null?void 0:c.format,u=(c==null?void 0:c.label)||h.path.split("/").pop(),x=d&&d.type=="vector";let v=null;if(Array.isArray(i))(d==null?void 0:d.type)=="vector"?v=E.jsxDEV(_E,{value:i,...c,onChange:p=>{l.setField(h.path,p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:26,columnNumber:15},void 0):v=E.jsxDEV(eO,{value:i,...c,onChange:p=>{l.setField(h.path,p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:35,columnNumber:15},void 0);else if(v=E.jsxDEV(Si,{value:i,...c,onChange:p=>{l.setField(h.path,p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:45,columnNumber:14},void 0),o==="function")return v;return E.jsxDEV(ai,{title:u,vertical:x,children:v},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:59,columnNumber:9},void 0)},nO="_container_3297g_1",rO="_field_3297g_5",iO="_block_3297g_9",qb={container:nO,field:rO,block:iO},SE=h=>{const l=[],i=Object.keys(h.fields.childs);for(let o=0;o<i.length;o++){const c=i[o],d=h.fields.childs[c],{opt:u}=d;let x=!1;if(u&&(typeof u.hidden=="function"?x=u.hidden(d.type=="value"?d.value:null):x=u.hidden||!1),x)continue;const v="field"+c,p=(h.basePath?h.basePath+"/":"")+c;let _=null;d.type==="value"?_=E.jsxDEV(tO,{path:p,field:d},v,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:46,columnNumber:10},void 0):_=E.jsxDEV("div",{className:qb.block,children:E.jsxDEV(Ns,{accordion:!0,label:c,children:E.jsxDEV(SE,{fields:d,basePath:p},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:52,columnNumber:6},void 0)},v,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:51,columnNumber:5},void 0)},v,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:50,columnNumber:10},void 0),_&&l.push(_)}return E.jsxDEV("div",{className:qb.container,children:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:66,columnNumber:9},void 0)},CE=h=>{const l=zD(h),i=l.target.serializeToDirectory();return E.jsxDEV(EE.Provider,{value:l,children:E.jsxDEV(SE,{fields:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/index.tsx",lineNumber:18,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/index.tsx",lineNumber:17,columnNumber:9},void 0)};class wE{constructor(l){b(this,"gl");b(this,"extDisJointTimerQuery");this.gl=l,this.gl.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,!0),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("EXT_color_buffer_half_float"),this.gl.getExtension("OES_texture_float_linear"),this.extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")}}class aO{constructor(l,i){b(this,"gl");b(this,"vao");b(this,"program");b(this,"indexBuffer");b(this,"attributes");b(this,"vertCount");b(this,"indexCount");b(this,"instanceCount");b(this,"attribPointerDiect");b(this,"attribTypeDict");this.gl=l,this.program=i,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([["Float32Array",this.gl.vertexAttribPointer.bind(this.gl)],["Int32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int8Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt8Array",this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([["Float32Array",this.gl.FLOAT],["Int32Array",this.gl.INT],["Int16Array",this.gl.SHORT],["Int8Array",this.gl.BYTE],["UInt32Array",this.gl.UNSIGNED_INT],["UInt16Array",this.gl.UNSIGNED_SHORT],["UInt8Array",this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((l,i)=>{l.instanceDivisor==null&&i!="index"&&(this.vertCount=Math.max(this.vertCount,l.count)),l.instanceDivisor!==void 0&&l.instanceDivisor>0&&(this.instanceCount==0?this.instanceCount=l.count:this.instanceCount=Math.min(this.instanceCount,l.count))})}setAttribute(l,i,o,c){if(i.array===null)return;const d={buffer:i,size:o,count:i.array?i.array.length/o:0,location:void 0,...c};this.attributes.set(l,d),this.gl.bindVertexArray(this.vao),d.location=this.gl.getAttribLocation(this.program,l);const u=this.attribPointerDiect.get(i.array.constructor.name),x=this.attribTypeDict.get(i.array.constructor.name);if(d.location>-1)if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,d.buffer.buffer),d.size==16){for(let v=0;v<4;v++)this.gl.enableVertexAttribArray(d.location+v);for(let v=0;v<4;v++)this.gl.vertexAttribPointer(d.location+v,4,x,!1,64,16*v);if(d.instanceDivisor!==void 0)for(let v=0;v<4;v++)this.gl.vertexAttribDivisor(d.location+v,d.instanceDivisor)}else this.gl.enableVertexAttribArray(d.location),u(d.location,d.size,x,!1,0,0),d.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(d.location,d.instanceDivisor);return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(l){return this.attributes.delete(l),this.calcVertCount(),this}setIndex(l){this.indexBuffer=l,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(l){this.gl.bindVertexArray(this.vao),l&&l(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(l=>{l.buffer.dispose()})}}class TE{constructor(l){b(this,"gl");b(this,"program");b(this,"vao");b(this,"uniforms");this.gl=l,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(l,i,o){if(this.program===null){console.warn("program is null.");return}const c=this.createShader(l,this.gl.VERTEX_SHADER),d=this.createShader(i,this.gl.FRAGMENT_SHADER);if(!(!c||!d))return this.gl.attachShader(this.program,c),this.gl.attachShader(this.program,d),o&&o.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,o.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)||console.error("program link error:",this.gl.getProgramInfoLog(this.program)),this}createShader(l,i){const o=this.gl.createShader(i);if(!o)return null;if(this.gl.shaderSource(o,l),this.gl.compileShader(o),this.gl.getShaderParameter(o,this.gl.COMPILE_STATUS))return o;{const c=this.gl.getShaderInfoLog(o);if(c){const d=l.split(`
`),u=c.matchAll(/ERROR: 0:(\d+)/g);Array.from(u).forEach((x,v)=>{const p=Number(x[1]),_=Math.max(0,p-5),w=Math.min(d.length,p+2);let T=c.split(`
`)[v]+`
`;d.forEach((C,M)=>{_<=M&&M<=w&&(T+=`${M+1}: ${C}
`)}),console.error(T)})}}}setUniform(l,i,o){const c=this.uniforms.get(l);if(c)if(c.type=i,c.value=o,c.cache){for(let d=0;d<o.length;d++)if(c.cache[d]!==o[d]){c.needsUpdate=!0;break}}else c.needsUpdate=!0;else this.uniforms.set(l,{value:o,type:i,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(l){this.program&&this.uniforms.forEach((i,o)=>{(i.location===null||l)&&(i.location=this.gl.getUniformLocation(this.program,o))})}uploadUniforms(){this.uniforms.forEach(l=>{l.needsUpdate&&l.location!==null&&(/Matrix[2|3|4]fv/.test(l.type)?this.gl["uniform"+l.type](l.location,!1,l.value):/[1|2|3|4][f|i]$/.test(l.type)?this.gl["uniform"+l.type](l.location,...l.value):this.gl["uniform"+l.type](l.location,l.value),l.cache=l.value.concat(),l.needsUpdate=!1)})}getVAO(l="_"){if(!this.program)return null;let i=this.vao.get(l);return i||(i=new aO(this.gl,this.program),this.vao.set(l,i),i)}use(l){this.program&&(this.gl.useProgram(this.program),l&&l(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(l=>{l.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}class rd{constructor(l){b(this,"gl");b(this,"buffer");b(this,"array");this.gl=l,this.buffer=this.gl.createBuffer(),this.array=null}setData(l,i="vbo",o){const c=i=="vbo"?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(c,this.buffer),this.gl.bufferData(c,l,o||this.gl.STATIC_DRAW),this.gl.bindBuffer(c,null),this.array=l,this}dispose(){this.gl.deleteBuffer(this.buffer)}}class ee{constructor(l,i,o,c){b(this,"x");b(this,"y");b(this,"z");b(this,"w");this.x=0,this.y=0,this.z=0,this.w=0,this.set(l,i,o,c)}get isVector(){return!0}set(l,i,o,c){return this.x=l??0,this.y=i??0,this.z=o??0,this.w=c??0,this}setScalar(l){return this.x=l,this.y=l,this.z=l,this.w=l,this}setFromArray(l){return this.x=l[0]||0,this.y=l[1]||0,this.z=l[2]||0,this.w=l[3]||0,this}add(l){return typeof l=="number"?(this.x+=l,this.y+=l,this.z+=l,this.w+=l):(this.x+=l.x??0,this.y+=l.y??0,this.z+=l.z??0,this.w+=l.w??0),this}sub(l){return typeof l=="number"?(this.x-=l,this.y-=l,this.z-=l):(this.x-=l.x??0,this.y-=l.y??0,this.z-=l.z??0,this.w-=l.w??0),this}multiply(l){return typeof l=="number"?(this.x*=l,this.y*=l,this.z*=l,this.w*=l):(this.x*=l.x,this.y*=l.y,this.z*=l.z,this.w*=l.w),this}divide(l){return typeof l=="number"?(this.x/=l,this.y/=l,this.z/=l,this.w/=l):(this.x/=l.x,this.y/=l.y,this.z/=l.z,this.w/=l.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(l){const i=this.x-l.x,o=this.y-l.y,c=this.z-l.z;return Math.sqrt(i*i+o*o+c*c)}normalize(){const l=this.length()||1;return this.x/=l,this.y/=l,this.z/=l,this}cross(l){const i=this.x,o=this.y,c=this.z,d=l.x,u=l.y,x=l.z;return this.x=o*x-c*u,this.y=c*d-i*x,this.z=i*u-o*d,this}dot(l){return this.x*l.x+this.y*l.y+this.z*l.z}applyMatrix3(l){const i=l.elm,o=i[0],c=i[1],d=i[2],u=i[4],x=i[5],v=i[6],p=i[8],_=i[9],w=i[10],T=this.x*o+this.y*u+this.z*p,C=this.x*c+this.y*x+this.z*_,M=this.x*d+this.y*v+this.z*w;return this.x=T,this.y=C,this.z=M,this.w=0,this}applyMatrix4(l){const i=l.elm,o=i[0],c=i[1],d=i[2],u=i[3],x=i[4],v=i[5],p=i[6],_=i[7],w=i[8],T=i[9],C=i[10],M=i[11],G=i[12],Y=i[13],H=i[14],O=i[15],$=this.x*o+this.y*x+this.z*w+this.w*G,ae=this.x*c+this.y*v+this.z*T+this.w*Y,V=this.x*d+this.y*p+this.z*C+this.w*H,re=this.x*u+this.y*_+this.z*M+this.w*O;return this.x=$,this.y=ae,this.z=V,this.w=re,this}applyMatrix4AsPosition(l){const i=this.w;return this.w=1,this.applyMatrix4(l),this.w=i,this}applyMatrix4AsDirection(l){const i=this.w;return this.w=0,this.applyMatrix4(l),this.w=i,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(l,i){return this.x=this.x+(l.x-this.x)*i,this.y=this.y+(l.y-this.y)*i,this.z=this.z+(l.z-this.z)*i,this.w=this.w+(l.w-this.w)*i,this}copy(l){return this.x=l.x??0,this.y=l.y??0,this.z=l.z??0,this.w=l.w??0,this}clone(){return new ee(this.x,this.y,this.z,this.w)}getElm(l){return l=="vec2"?[this.x,this.y]:l=="vec3"?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}class ze{constructor(l){b(this,"unit");b(this,"image");b(this,"size");b(this,"gl");b(this,"glTex");b(this,"textureType");b(this,"_setting");this.gl=l,this.image=null,this.unit=0,this.size=new ee,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=l.TEXTURE_2D}get isTexture(){return!0}setting(l){return this._setting={...this._setting,...l},this.attach(this.image),this}attach(l){if(this.image=l,this.gl.bindTexture(this.textureType,this.glTex),this.image){const i=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(i.width,i.height),i instanceof HTMLImageElement||i instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,i):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,i.width,i.height,0,this._setting.format,this._setting.type,i.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}activate(l){return this.gl.activeTexture(this.gl.TEXTURE0+l),this.gl.bindTexture(this.textureType,this.glTex),this.unit=l,this}load(l,i){const o=new Image;return o.onload=()=>{this.attach(o),i&&i()},o.src=l,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}class xt{constructor(l,i){b(this,"size");b(this,"gl");b(this,"glFrameBuffer");b(this,"textures");b(this,"depthTexture");b(this,"textureAttachmentList");this.gl=l,this.size=new ee(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!i||!i.disableDepthBuffer)&&this.setDepthTexture(new ze(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(l){this.depthTexture=l,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(l){return this.textures=l,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((i,o)=>{i.attach({width:this.size.x,height:this.size.y});const c=this.gl.COLOR_ATTACHMENT0+o;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,c,this.gl.TEXTURE_2D,i.getTexture(),0),this.textureAttachmentList.push(c)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(l,i){return typeof l=="number"?(this.size.x=l,i!==void 0&&(this.size.y=i)):this.size.copy(l),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(o=>{o.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}class oO extends xt{constructor(i,o){super(i,o);b(this,"cubeTarget");b(this,"textures");b(this,"currentFace");this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(i){return this.textures=i,this.textureAttachmentList=[],this.textures.forEach(o=>{o.attach({width:this.size.x,height:this.size.y})}),this}face(i){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((o,c)=>{const d=this.gl.COLOR_ATTACHMENT0+c;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,d,this.cubeTarget[i],o.getTexture(),0),this.textureAttachmentList.push(d)}),this.currentFace=this.cubeTarget[i],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}class sO extends ze{constructor(i){super(i);b(this,"cubeTarget");this.textureType=i.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(i){if(this.image=i,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let o=0;o<6;o++){const c=Array.isArray(this.image)?this.image[o]:this.image;this.size.set(c.width,c.height),c instanceof HTMLImageElement||c instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[o],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,c):this.gl.texImage2D(this.cubeTarget[o],0,this._setting.internalFormat,c.width,c.height,0,this._setting.format,this._setting.type,c.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}class lO{constructor(l){b(this,"gl");b(this,"transformFeedback");b(this,"feedbackBuffer");this.gl=l,this.transformFeedback=this.gl.createTransformFeedback(),this.feedbackBuffer=new Map}bind(l){this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,this.transformFeedback),l&&l(),this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,null)}setBuffer(l,i,o){this.feedbackBuffer.set(l,{buffer:i,varyingIndex:o})}use(l){this.bind(()=>{this.feedbackBuffer.forEach(i=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,i.varyingIndex,i.buffer.buffer)}),l&&l(this),this.feedbackBuffer.forEach(i=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,i.varyingIndex,null)})})}}class st{constructor(l){b(this,"elm");this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],l&&this.set(l)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new st().copy(this)}copy(l){return this.set(l.elm),this}perspective(l,i,o,c){const d=1/Math.tan(l*Math.PI/360),u=c-o;return this.elm=[d/i,0,0,0,0,d,0,0,0,0,-(c+o)/u,-1,0,0,-(c*o*2)/u,0],this}orthographic(l,i,o,c){return this.elm=[2/l,0,0,0,0,2/i,0,0,0,0,-2/(c-o),0,0,0,-(c+o)/(c-o),1],this}lookAt(l,i,o){const c=l.clone().sub(i).normalize(),d=o.clone().cross(c).normalize(),u=c.clone().cross(d).normalize();return this.elm=[d.x,d.y,d.z,0,u.x,u.y,u.z,0,c.x,c.y,c.z,0,l.x,l.y,l.z,1],this}inverse(){const l=this.elm[0],i=this.elm[1],o=this.elm[2],c=this.elm[3],d=this.elm[4],u=this.elm[5],x=this.elm[6],v=this.elm[7],p=this.elm[8],_=this.elm[9],w=this.elm[10],T=this.elm[11],C=this.elm[12],M=this.elm[13],G=this.elm[14],Y=this.elm[15],H=l*u-i*d,O=l*x-o*d,$=l*v-c*d,ae=i*x-o*u,V=i*v-c*u,re=o*v-c*x,Q=p*M-_*C,xe=p*G-w*C,ie=p*Y-T*C,K=_*G-w*M,pe=_*Y-T*M,Fe=w*Y-T*G,se=H*Fe-O*pe+$*K+ae*ie-V*xe+re*Q,ge=1/se;return se==0?this.identity():(this.elm[0]=(u*Fe-x*pe+v*K)*ge,this.elm[1]=(-i*Fe+o*pe-c*K)*ge,this.elm[2]=(M*re-G*V+Y*ae)*ge,this.elm[3]=(-_*re+w*V-T*ae)*ge,this.elm[4]=(-d*Fe+x*ie-v*xe)*ge,this.elm[5]=(l*Fe-o*ie+c*xe)*ge,this.elm[6]=(-C*re+G*$-Y*O)*ge,this.elm[7]=(p*re-w*$+T*O)*ge,this.elm[8]=(d*pe-u*ie+v*Q)*ge,this.elm[9]=(-l*pe+i*ie-c*Q)*ge,this.elm[10]=(C*V-M*$+Y*H)*ge,this.elm[11]=(-p*V+_*$-T*H)*ge,this.elm[12]=(-d*K+u*xe-x*Q)*ge,this.elm[13]=(l*K-i*xe+o*Q)*ge,this.elm[14]=(-C*ae+M*O-G*H)*ge,this.elm[15]=(p*ae-_*O+w*H)*ge,this)}transpose(){const l=this.elm[0],i=this.elm[1],o=this.elm[2],c=this.elm[3],d=this.elm[4],u=this.elm[5],x=this.elm[6],v=this.elm[7],p=this.elm[8],_=this.elm[9],w=this.elm[10],T=this.elm[11],C=this.elm[12],M=this.elm[13],G=this.elm[14],Y=this.elm[15];return this.elm[0]=l,this.elm[1]=d,this.elm[2]=p,this.elm[3]=C,this.elm[4]=i,this.elm[5]=u,this.elm[6]=_,this.elm[7]=M,this.elm[8]=o,this.elm[9]=x,this.elm[10]=w,this.elm[11]=G,this.elm[12]=c,this.elm[13]=v,this.elm[14]=T,this.elm[15]=Y,this}set(l){for(let i=0;i<this.elm.length;i++)this.elm[i]=l[i]??0;return this}setFromTransform(l,i,o){return this.identity(),l&&this.applyPosition(l),i&&this.applyQuaternion(i),o&&this.applyScale(o),this}applyPosition(l){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,l.x,l.y,l.z,1]),this}applyQuaternion(l){const i=l.x,o=l.y,c=l.z,d=l.w,u=i*i,x=o*o,v=c*c,p=d*d,_=i*o,w=i*c,T=i*d,C=o*c,M=o*d,G=c*d;return this.matmul([u-x-v+p,2*(_+G),2*(w-M),0,2*(_-G),-u+x-v+p,2*(C+T),0,2*(w+M),2*(C-T),-u-x+v+p,0,0,0,0,1]),this}applyScale(l){return this.matmul([l.x,0,0,0,0,l.y,0,0,0,0,l.z,0,0,0,0,1]),this}matmul(l){const i=new Array(16);for(let o=0;o<4;o++)for(let c=0;c<4;c++){let d=0;for(let u=0;u<4;u++)d+=this.elm[u*4+c]*l[u+o*4];i[c+o*4]=d}this.elm=i}setRotationFromDirection(l,i){i=i||{x:0,y:1,z:0};const o=new ee().copy(l).normalize(),c=new ee().copy(i).cross(o).normalize();c.length()==0&&(o.x+=.001,c.copy(i).cross(o).normalize());const d=o.clone().cross(c).normalize();return this.set([c.x,c.y,c.z,0,d.x,d.y,d.z,0,o.x,o.y,o.z,0,0,0,0,1]),this}makeRotationAxis(l,i){const o=Math.cos(i),c=Math.sin(i),d=1-o,u=l.x,x=l.y,v=l.z,p=d*u,_=d*x;return this.set([p*u+o,p*x-c*v,p*v+c*x,0,p*x+c*v,_*x+o,_*v-c*u,0,p*v-c*x,_*v+c*u,d*v*v+o,0,0,0,0,1]),this}multiply(l){return this.matmul(l.elm),this}preMultiply(l){const i=this.copyToArray([]);return this.set(l.elm),this.matmul(i),this}decompose(l,i,o){l&&(l.x=this.elm[12],l.y=this.elm[13],l.z=this.elm[14]),i&&i.setFromMatrix(this)}copyToArray(l){l.length=this.elm.length;for(let i=0;i<this.elm.length;i++)l[i]=this.elm[i];return l}}class Lv extends ee{constructor(i,o,c,d){super(i,o,c,0);b(this,"order");this.order=d||"XYZ"}copy(i){return"order"in i&&(this.order=i.order),super.copy(i)}setFromQuaternion(i){const o=new st().applyQuaternion(i);return this.setFromRotationMatrix(o),this}setFromRotationMatrix(i){const o=i.elm,c=o[0],d=o[4],u=o[8];o[1];const x=o[5],v=o[9];o[2];const p=o[6],_=o[10];return this.order="XYZ",this.y=Math.asin(Math.min(1,Math.max(-1,u))),Math.abs(u)<.9999999?(this.x=Math.atan2(-v,_),this.z=Math.atan2(-d,c)):(this.x=Math.atan2(p,x),this.z=0),this}}class Fa{constructor(l,i,o,c){b(this,"x");b(this,"y");b(this,"z");b(this,"w");b(this,"updated",!1);this.x=l||0,this.y=i||0,this.z=o||0,this.w=c||1}set(l,i,o,c){this.x=l??this.x,this.y=i??this.y,this.z=o??this.z,this.w=c??this.w,this.updated=!0}setFromEuler(l,i){const o=i||("order"in l?l.order:"XYZ"),c=Math.sin(l.x/2),d=Math.sin(l.y/2),u=Math.sin(l.z/2),x=Math.cos(l.x/2),v=Math.cos(l.y/2),p=Math.cos(l.z/2);return o=="XYZ"?(this.x=x*d*u+c*v*p,this.y=-c*v*u+x*d*p,this.z=x*v*u+c*d*p,this.w=-c*d*u+x*v*p):o=="XZY"?(this.x=-x*d*u+c*v*p,this.y=x*d*p-c*v*u,this.z=c*d*p+x*v*u,this.w=c*d*u+x*v*p):o=="YZX"?(this.x=c*v*p+x*d*u,this.y=c*v*u+x*d*p,this.z=-c*d*p+x*v*u,this.w=-c*d*u+x*v*p):o=="ZYX"&&(this.x=c*v*p-x*d*u,this.y=c*v*u+x*d*p,this.z=-c*d*p+x*v*u,this.w=c*d*u+x*v*p),this.updated=!0,this}setFromMatrix(l){const i=l.elm,o=i[0]+i[5]+i[10];let c,d,u,x;if(o>0){const p=Math.sqrt(o+1)*2;x=.25*p,c=(i[6]-i[9])/p,d=(i[8]-i[2])/p,u=(i[1]-i[4])/p}else if(i[0]>i[5]&&i[0]>i[10]){const p=Math.sqrt(1+i[0]-i[5]-i[10])*2;x=(i[6]-i[9])/p,c=.25*p,d=(i[1]+i[4])/p,u=(i[2]+i[8])/p}else if(i[5]>i[10]){const p=Math.sqrt(1+i[5]-i[0]-i[10])*2;x=(i[8]-i[2])/p,c=(i[1]+i[4])/p,d=.25*p,u=(i[6]+i[9])/p}else{const p=Math.sqrt(1+i[10]-i[0]-i[5])*2;x=(i[1]-i[4])/p,c=(i[2]+i[8])/p,d=(i[6]+i[9])/p,u=.25*p}const v=Math.sqrt(c*c+d*d+u*u+x*x);return c/=v,d/=v,u/=v,x/=v,this.x=c,this.y=d,this.z=u,this.w=x,this.updated=!0,this}multiply(l){const i=this.w*l.w-this.x*l.x-this.y*l.y-this.z*l.z,o=this.w*l.x+this.x*l.w+this.y*l.z-this.z*l.y,c=this.w*l.y-this.x*l.z+this.y*l.w+this.z*l.x,d=this.w*l.z+this.x*l.y-this.y*l.x+this.z*l.w;return this.set(o,c,d,i),this.updated=!0,this}preMultiply(l){const i=l.clone().multiply(this);this.set(i.x,i.y,i.z,i.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(l){return this.x=l.x??0,this.y=l.y??0,this.z=l.z??0,this.w=l.w??0,this.updated=!0,this}clone(){return new Fa(this.x,this.y,this.z,this.w)}}var od;(h=>{h.gauss=(l,i,o)=>{const c=l-i,d=-(c*c)/(2*o*o);return 1/Math.sqrt(2*Math.PI*o)*Math.exp(d)},h.gaussWeights=l=>{let i=0;const o=[];if(l<=1)return[.5];for(let c=0;c<l;c++){const d=c/(l-1),u=(0,h.gauss)(d,0,1);i+=u*(c>0?2:1),o.push(u)}for(let c=0;c<l;c++)o[c]/=i;return o},h.randomSeed=l=>{l^=l<<13,l^=0,l^=l<<5;let i=123456789^l;l^=l<<13,l^=0,l^=l<<5;let o=362436069^l;l^=l<<13,l^=0,l^=l<<5;let c=521288629^l;l^=l<<13,l^=0,l^=l<<5;let d=88675123^l,u;return()=>(u=i^i<<11,i=o,o=c,c=d,d=(d^d>>>19^(u^u>>>8))>>>0,d/4294967296)},h.randomRange=(l=-1,i=1)=>l+Math.random()*(i-l),h.randomVector=(l=new ee(-1,-1,-1,-1),i=new ee(1,1,1,1))=>new ee((0,h.randomRange)(l.x,i.x),(0,h.randomRange)(l.y,i.y),(0,h.randomRange)(l.z,i.z),(0,h.randomRange)(l.w,i.w)),h.smoothstep=(l,i,o)=>o<=l?0:o>=i?1:(o=(o-l)/(i-l),o*o*(3-2*o))})(od||(od={}));class yn{constructor(){b(this,"listeners");this.listeners=[]}on(l,i){this.listeners.push({event:l,cb:i})}once(l,i){this.listeners.push({event:l,cb:i,once:!0})}off(l,i){this.listeners=this.listeners.filter(o=>i==null?o.event!=l:!(o.event==l&&o.cb==i))}emit(l,i){const o=this.listeners.concat();for(let c=0;c<o.length;c++){const d=o[c];d.event==l&&(d.cb.apply(this,i||[]),d.once&&this.off(l,d.cb))}}hasEvent(l){return this.listeners.some(i=>i.event==l)}}var La;(h=>{h.NEWTON_ITERATIONS=4,h.NEWTON_MIN_SLOPE=.001,h.SUBDIVISION_PRECISION=1e-7,h.SUBDIVISION_MAX_ITERATIONS=10,h.BEZIER_EASING_CACHE_SIZE=11,h.BEZIER_EASING_SAMPLE_STEP_SIZE=1/h.BEZIER_EASING_CACHE_SIZE;function l(p){return-p.p0+3*p.p1-3*p.p2+p.p3}function i(p){return 3*p.p0-6*p.p1+3*p.p2}function o(p){return-3*p.p0+3*p.p1}function c(p,_){return 3*l(p)*_*_+2*i(p)*_+o(p)}h.calcBezierSlope=c;function d(p,_){return((l(p)*_+i(p))*_+o(p))*_+p.p0}h.calcBezier=d;function u(p,_,w,T){let C=0,M=0;for(let G=0;G<h.SUBDIVISION_MAX_ITERATIONS;G++)M=_+(w-_)/2,C=d(T,M),C>p?w=M:_=M;return M}function x(p,_,w){for(let T=0;T<h.NEWTON_ITERATIONS;T++){const C=c(_,w);if(C==0)return w;const M=d(_,w)-p;w-=M/C}return w}function v(p,_,w){p.p1=Math.max(p.p0,Math.min(p.p3,p.p1)),p.p2=Math.max(p.p0,Math.min(p.p3,p.p2));let T=0;for(let G=1;G<w.length&&(T=G-1,!(_<w[G]));G++);const C=T/(h.BEZIER_EASING_CACHE_SIZE-1),M=c(p,C)/(p.p3-p.p0);return M==0?C:M>.01?x(_,p,C):u(_,C,C+h.BEZIER_EASING_SAMPLE_STEP_SIZE,p)}h.getBezierTfromX=v})(La||(La={}));var Cv;(h=>{function l(O=6){return $=>{const ae=Math.exp(-O*(2*$-1)),V=Math.exp(-O);return(1+(1-ae)/(1+ae)*(1+V)/(1-V))/2}}h.sigmoid=l;function i(O,$,ae){const V=Math.max(0,Math.min(1,(ae-O)/($-O)));return V*V*(3-2*V)}h.smoothstep=i;function o(O){return O}h.linear=o;function c(O){return O*O}h.easeInQuad=c;function d(O){return O*(2-O)}h.easeOutQuad=d;function u(O){return O<.5?2*O*O:-1+(4-2*O)*O}h.easeInOutQuad=u;function x(O){return O*O*O}h.easeInCubic=x;function v(O){return--O*O*O+1}h.easeOutCubic=v;function p(O){return O<.5?4*O*O*O:(O-1)*(2*O-2)*(2*O-2)+1}h.easeInOutCubic=p;function _(O){return O*O*O*O}h.easeInQuart=_;function w(O){return 1- --O*O*O*O}h.easeOutQuart=w;function T(O){return O<.5?8*O*O*O*O:1-8*--O*O*O*O}h.easeInOutQuart=T;function C(O){return O*O*O*O*O}h.easeInQuint=C;function M(O){return 1+--O*O*O*O*O}h.easeOutQuint=M;function G(O){return O<.5?16*O*O*O*O*O:1+16*--O*O*O*O*O}h.easeInOutQuint=G;function Y(O,$,ae,V){const re=new Array(La.BEZIER_EASING_CACHE_SIZE);for(let Q=0;Q<La.BEZIER_EASING_CACHE_SIZE;++Q)re[Q]=La.calcBezier({p0:O.x,p1:$.x,p2:ae.x,p3:V.x},Q/(La.BEZIER_EASING_CACHE_SIZE-1));return Q=>Q<=O.x?O.y:V.x<=Q?V.y:La.calcBezier({p0:O.y,p1:$.y,p2:ae.y,p3:V.y},La.getBezierTfromX({p0:O.x,p1:$.x,p2:ae.x,p3:V.x},Q,re))}h.bezier=Y;function H(O,$,ae,V){return Y({x:0,y:0},{x:O,y:$},{x:ae,y:V},{x:1,y:1})}h.cubicBezier=H})(Cv||(Cv={}));var Qb;(h=>{h.number=(l,i,o)=>l+(i-l)*o,h.vector=(l,i,o)=>l.lerp(i,o)})(Qb||(Qb={}));class uO extends yn{constructor(i){super();b(this,"keyframes",[]);b(this,"cache",{frame:NaN,value:NaN});b(this,"frameStart");b(this,"frameEnd");b(this,"frameDuration");this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(i)}set(i){i&&(this.keyframes=[],i.forEach(o=>{this.addKeyFrame(o)}))}addKeyFrame(i){let o=0;for(let c=0;c<this.keyframes.length&&this.keyframes[c].coordinate.x<i.coordinate.x;c++)o++;this.keyframes.splice(o,0,i),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(i){if(i==this.cache.frame)return this.cache.value;let o=null;for(let c=0;c<this.keyframes.length;c++){const d=this.keyframes[c];if(i<d.coordinate.x){const u=this.keyframes[c-1];u?o=u.to(d,i):o=d.coordinate.y;break}}return o===null&&this.keyframes.length>0&&(o=this.keyframes[this.keyframes.length-1].coordinate.y),o!==null?(this.cache={frame:i,value:o},o):0}}class cO extends yn{constructor(i,o,c,d,u){super();b(this,"name");b(this,"curves");b(this,"frameStart");b(this,"frameEnd");b(this,"frameDuration");b(this,"updatedFrame",-1);b(this,"value");this.name=i||"",this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new ee,o&&this.setFCurve(o,"x"),c&&this.setFCurve(c,"y"),d&&this.setFCurve(d,"z"),u&&this.setFCurve(u,"w")}setFCurve(i,o){this.curves.set(o,i);let c=1/0,d=-1/0;this.curves.forEach(u=>{u.frameStart<c&&(c=u.frameStart),u.frameEnd>d&&(d=u.frameEnd)}),(c==-1/0||d==1/0)&&(c=0,d=1),this.frameStart=c,this.frameEnd=d,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(i){return this.curves.get(i)||null}setFrame(i){if(i==this.updatedFrame)return this;const o=this.curves.get("x"),c=this.curves.get("y"),d=this.curves.get("z"),u=this.curves.get("w");return o&&(this.value.x=o.getValue(i)),c&&(this.value.y=c.getValue(i)),d&&(this.value.z=d.getValue(i)),u&&(this.value.w=u.getValue(i)),this.updatedFrame=i,this}}class fO extends yn{constructor(i,o,c,d){super();b(this,"coordinate",{x:0,y:0});b(this,"handleLeft",{x:0,y:0});b(this,"handleRight",{x:0,y:0});b(this,"interpolation","BEZIER");b(this,"easing",null);b(this,"nextFrame",null);this.set(i,o,c,d)}set(i,o,c,d){this.coordinate=i,this.handleLeft=o||i,this.handleRight=c||i,this.interpolation=d||"BEZIER"}getEasing(i,o){return i=="BEZIER"?Cv.bezier(this.coordinate,this.handleRight,o.handleLeft,o.coordinate):i=="CONSTANT"?()=>this.coordinate.y:c=>{const d=o.coordinate.y-this.coordinate.y;return c=(c-this.coordinate.x)/(o.coordinate.x-this.coordinate.x),this.coordinate.y+c*d}}to(i,o){return(this.nextFrame==null||this.nextFrame.coordinate.x!=i.coordinate.x||this.nextFrame.coordinate.y!=i.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,i),this.nextFrame=i),this.easing?this.easing(o):0}}let dO=0;var wv;(h=>{function l(){return(dO++).toString(16)}h.genUUID=l})(wv||(wv={}));class Ds extends yn{constructor(){super();b(this,"uuid");b(this,"initiator");b(this,"fields_");this.uuid=wv.genUUID(),this.fields_=new Map,this.initiator="script"}serialize(i){i=i||{mode:"view"};const o={};return this.fields_.forEach((c,d)=>{const u=this.getFieldOpt(d);i.mode=="export"&&u&&u&&u.noExport||(o[d]=c.get(i))}),o}serializeToDirectory(){return(o=>{const c={type:"folder",childs:{},opt:{}},d=Object.keys(o);for(let u=0;u<d.length;u++){const x=d[u],v=this.getFieldOpt(x);if(!x)continue;let p=c;const _=x.split("/");for(let w=0;w<_.length;w++){const T=_[w];T&&p.type!="value"&&(p.childs[T]||(w==_.length-1?p.childs[T]={type:"value",value:null,opt:v}:p.childs[T]={type:"folder",childs:{},opt:v}),p=p.childs[T])}p.type=="value"&&(p.value=o[x])}return c})(this.serialize())}deserialize(i){const o=Object.keys(i);for(let c=0;c<o.length;c++){const d=o[c],u=this.fields_.get(d);u&&u.set(i[d])}}exportEditor(){this.serialize({mode:"export"})}field(i,o,c,d){const u=typeof c=="function"?c:void 0,x=typeof c=="object"&&c||d||{};u||(x.readOnly=!0,x.noExport=!0);const v=i.startsWith("/")?i.slice(1):i;this.fields_.set(v,{get:o,set:p=>{u&&u(p),this.noticeField(i)},opt:x})}fieldDir(i,o){const c=i;return this.field(c+"/",()=>null,void 0,{...o,isFolder:!0}),{dir:d=>this.fieldDir(`${c}/${d}`),field:(d,u,x,v)=>{this.field(`${c}/${d}`,u,x,v)}}}setField(i,o){this.deserialize({[i]:o})}getField(i,o){const c=this.fields_.get(i);if(c)return o=o||{mode:"view"},c.get(o)}getFieldOpt(i){const o=this.fields_.get(i);if(o)return o.opt}noticeField(i){this.emit("fields/update/"+i),this.emit("fields/update",[[i]])}}class xn extends Ds{constructor(i){super();b(this,"disableEdit");b(this,"order");b(this,"_entity");b(this,"_enabled");b(this,"_tag");b(this,"_disposed");this.disableEdit=!1,this._entity=i.entity,this._enabled=!0,this._disposed=!1,this._tag="",this.order=0,this.field("enabled",()=>this.enabled,o=>this.enabled=o,{hidden:!0,noExport:!0}),this.field("tag",()=>this.tag,o=>this._tag=o,{readOnly:!0,noExport:!0,hidden:o=>o==""})}get tag(){return this._tag}get entity(){return this._entity}set enabled(i){this._enabled=i}get enabled(){return this._enabled}update(i){this.enabled&&this.updateImpl(i)}updateImpl(i){}postUpdate(i){this.enabled&&this.postUpdateImpl(i)}postUpdateImpl(i){}beforeRender(i){this.enabled&&this.beforeRenderImpl(i)}beforeRenderImpl(i){}afterRender(i){this.enabled&&this.afterRenderImpl(i)}afterRenderImpl(i){}dispose(){this._disposed=!0,this.emit("dispose")}}class So extends Ds{constructor(){super();b(this,"vertCount");b(this,"attributes");b(this,"vaoCache");this.vertCount=0,this.attributes=new Map,this.vaoCache=new Map}setAttribute(i,o,c,d){const u=this.attributes.get(i);return u&&u.buffer&&u.buffer.dispose(),this.attributes.set(i,{array:o,size:c,opt:d}),this.updateVertCount(),this}getAttribute(i){return this.attributes.get(i)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((i,o)=>{o=="index"||i.opt&&i.opt.instanceDivisor||(this.vertCount=Math.min(i.array.length/i.size,this.vertCount))})}createBuffers(i){this.attributes.forEach((o,c)=>{o.buffer||(o.buffer=new rd(i).setData(o.array,c=="index"?"ibo":"vbo",o.opt&&o.opt.usage))})}requestUpdate(){this.vaoCache.clear()}dispose(){super.dispose(),this.attributes.forEach(i=>{var o;(o=i.buffer)==null||o.dispose()})}}const hO=`#include <common>\r
#include <packing>\r
#include <frag_h>\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
	#include <frag_out>\r
\r
}`,mO=`#include <common>\r
#include <vert_h>\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
	#include <vert_out>\r
	\r
}`;class ta extends Ds{constructor(i){super();b(this,"name");b(this,"vert");b(this,"frag");b(this,"defines");b(this,"uniforms");b(this,"useLight");b(this,"depthTest");b(this,"depthWrite");b(this,"cullFace");b(this,"drawType");b(this,"blending");b(this,"visibilityFlag");b(this,"programCache");i=i||{},this.name=i.name||"",this.visibilityFlag={},this.setVisibility(i.phase||["shadowMap","deferred"]),this.useLight=!0,this.depthTest=!0,this.cullFace=!1,this.depthWrite=i.depthTest!==void 0?i.depthTest:!0,this.drawType=i.drawType||"TRIANGLES",this.blending=i.blending||"NORMAL",this.vert=i.vert||mO,this.frag=i.frag||hO,this.defines=i.defines||{},this.uniforms=i.uniforms||{},this.programCache={}}setVisibility(i){this.visibilityFlag={shadowMap:i.indexOf("shadowMap")>-1,deferred:i.indexOf("deferred")>-1,forward:i.indexOf("forward")>-1,ui:i.indexOf("ui")>-1,envMap:i.indexOf("envMap")>-1,postprocess:i.indexOf("postprocess")>-1}}requestUpdate(){this.programCache={}}}const pO=new So,vO=new ta;class Sr extends xn{constructor(i){super(i);b(this,"geometry");b(this,"material");const o=i.args||{};this.geometry=o.geometry||pO,this.material=o.material||vO,this.field("material",()=>this.material.name)}}class Br extends Ds{constructor(i){super();b(this,"name");b(this,"position");b(this,"euler");b(this,"quaternion");b(this,"scale");b(this,"matrix");b(this,"matrixWorld");b(this,"matrixWorldPrev");b(this,"autoMatrixUpdate");b(this,"parent");b(this,"children");b(this,"components");b(this,"componentsSorted");b(this,"visible");b(this,"userData");this.name=i&&i.name||"",this.position=new ee(0,0,0,1),this.euler=new Lv,this.quaternion=new Fa(0,0,0,1),this.scale=new ee(1,1,1),this.matrix=new st,this.matrixWorld=new st,this.matrixWorldPrev=new st,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.field("name",()=>this.name,o=>this.name=o),this.field("position",()=>this.position.getElm("vec3"),o=>this.position.setFromArray(o),{format:{type:"vector"}}),this.field("euler",()=>this.euler.getElm("vec3"),o=>this.euler.setFromArray(o),{format:{type:"vector"}}),this.field("scale",()=>this.scale.getElm("vec3"),o=>this.scale.setFromArray(o),{format:{type:"vector"}}),this.field("children",()=>this.children.map(o=>o.uuid),{hidden:!0}),this.field("components",()=>{const o=[];return this.components.forEach(c=>o.push(c.uuid)),o},{hidden:!0})}update(i){const o={...i};o.matrix=this.matrixWorld,this.updateImpl(i);for(let c=0;c<this.componentsSorted.length;c++)this.componentsSorted[c].update(o);this.autoMatrixUpdate&&this.updateMatrix();for(let c=0;c<this.children.length;c++)this.children[c].update(o)}updateImpl(i){}onBeforeRender(i){for(let o=0;o<this.componentsSorted.length;o++)this.componentsSorted[o].beforeRender(i);for(let o=0;o<this.children.length;o++)this.children[o].onBeforeRender(i)}onAfterRender(i){this.matrixWorldPrev.copy(this.matrixWorld);for(let o=0;o<this.componentsSorted.length;o++)this.componentsSorted[o].afterRender(i);for(let o=0;o<this.children.length;o++)this.children[o].onAfterRender(i)}add(i){i.parent&&i.parent.remove(i),i.parent=this,this.children.push(i),this.noticeField("children")}remove(i){this.children=this.children.filter(o=>o.uuid!=i.uuid),this.noticeField("children")}updateMatrix(i){this.parent&&i&&this.parent.updateMatrix(!0);const o=this.parent?this.parent.matrixWorld:new st;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(o)}decomposeMatrix(i){i.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(i){this.decomposeMatrix(this.matrix.clone().multiply(i))}lookAt(i){this.updateMatrix();const o=new st,c=new ee;this.matrixWorld.decompose(c);const d=this.position.clone().add(i.clone().sub(c));o.lookAt(this.position,d,new ee(0,1,0)),this.decomposeMatrix(o)}addComponent(i,...o){this.removeComponent(i);const[c]=o,d=new i({entity:this,args:c||{}});return this.components.set(i,d),this.componentsSorted.push(d),this.componentsSorted.sort((u,x)=>u.order-x.order),this.noticeField("components"),d}removeComponent(i){const o=this.components.get(i);o&&o.dispose(),this.components.delete(i),this.componentsSorted=this.componentsSorted.filter(c=>c!==o),this.noticeField("components")}removeComponentByUUID(i){for(const o of this.components){const c=o[0],d=o[1];if(d.uuid===i)return d.dispose(),this.components.delete(c),this.noticeField("components"),d}}getComponent(i){return this.components.get(i)}getComponentByUUID(i){for(const o of this.components.values())if(o.uuid===i)return o;return null}getComponentByTag(i){for(const o of this.components.values())if(o.tag===i)return o;return null}getComponentsByTag(i){const o=[];return this.components.forEach(c=>{c.tag==i&&o.push(c)}),o}findEntityByName(i){if(this.name==i)return this;for(let o=0;o<this.children.length;o++){const d=this.children[o].findEntityByName(i);if(d)return d}}findEntityByUUID(i){if(this.uuid==i)return this;for(let o=0;o<this.children.length;o++){const d=this.children[o].findEntityByUUID(i);if(d)return d}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(i){let o="/"+this.name;return i&&i.uuid==this.uuid||this.parent&&(o=this.parent.getScenePath(i)+o),o}noticeEventChilds(i,o){this.emit(i,o);for(let c=0;c<this.children.length;c++)this.children[c].noticeEventChilds(i,o)}noticeEventParent(i,o){this.emit(i,o),this.parent&&this.parent.noticeEventParent(i,o)}traverse(i){i(this),this.children.forEach(o=>o.traverse(i))}isVisibleTraverse(){return this.visible?this.parent?this.parent.isVisibleTraverse():!0:!1}dispose(){this.emit("dispose"),this.parent&&this.parent.remove(this),this.components.forEach(i=>{i.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(i=>{i.disposeRecursive()}),this.children=[]}}const gO=`#include <common>\r
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
} `,yO=`#include <common>\r
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
}`,Qf=12,Kf=8,xO=h=>{switch(h){case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"SCALAR":return 1;default:return 1}},bO=h=>{switch(h){case"TEXCOORD_0":return"uv";default:return h.toLowerCase()}};class EO extends yn{constructor(i){super();b(this,"gl");this.gl=i}async load(i){const c=await(await fetch(i)).arrayBuffer(),d=new TextDecoder,u=d.decode(new Uint8Array(c,0,4)),x=new Map;let v=null;if(u=="glTF"){const V=new DataView(c),re=Qf,Q={length:V.getUint32(re,!0),type:V.getUint32(re+4,!0)};if(Q.type==1313821514){const xe=Qf+Kf;v=JSON.parse(d.decode(new Uint8Array(c,xe,Q.length)))}if(c.byteLength>Kf+Q.length+Qf){const xe=Qf+Kf+Q.length,ie={length:V.getUint32(xe,!0),type:V.getUint32(xe+4,!0)};if(ie.type==5130562){const K=xe+Kf,pe=c.slice(K,K+ie.length);x.set(0,pe)}}}else v=JSON.parse(d.decode(new Uint8Array(c)));if(!v)throw new Error("");const p=v,_=V=>{const re=x.get(V.buffer);return re?re.slice(V.byteOffset,V.byteOffset+V.byteLength):null},w=new Map;v.accessors&&v.accessors.forEach((V,re)=>{const{type:Q}=V;if(!p.bufferViews)return;const xe=p.bufferViews[V.bufferView],ie=_(xe);ie&&w.set(re,{type:Q,buffer:ie})});const T=new Map,C=(p.images||[]).map((V,re)=>new Promise(Q=>{if(V.bufferView!==void 0){if(!p.bufferViews)return;const xe=p.bufferViews[V.bufferView],ie=_(xe);if(ie){const K=new Blob([new Uint8Array(ie)],{type:V.mimeType}),pe=new Image;pe.onload=()=>{Q(V)},pe.src=URL.createObjectURL(K),T.set(re,pe)}}}));await Promise.all(C);const M=new Map,G=V=>{if(!p.textures)return null;const re=p.textures[V];if(re){const Q=new ze(this.gl),xe=T.get(re.source);if(xe)return Q.attach(xe),Q}return null};p.materials&&p.materials.forEach((V,re)=>{const Q=new ta({frag:gO,vert:yO});if(V.normalTexture){const xe=G(V.normalTexture.index);xe&&(Q.uniforms.uNormalMap={value:xe,type:"1i"},Q.defines.USE_NORMAL_MAP="")}if(V.pbrMetallicRoughness){const xe=V.pbrMetallicRoughness;if(xe.baseColorFactor&&(Q.uniforms.uBaseColor={value:xe.baseColorFactor,type:"4fv"},Q.defines.USE_COLOR=""),xe.baseColorTexture){const ie=G(xe.baseColorTexture.index);ie&&(Q.uniforms.uBaseColorMap={value:ie,type:"1i"},Q.defines.USE_COLOR_MAP="")}if(xe.roughnessFactor!==void 0&&(Q.uniforms.uRoughness={value:xe.roughnessFactor,type:"1f"},Q.defines.USE_ROUGHNESS=""),xe.metallicFactor!==void 0&&(Q.uniforms.uMetalness={value:xe.metallicFactor,type:"1f"},Q.defines.USE_METALNESS=""),xe.metallicRoughnessTexture){const ie=G(xe.metallicRoughnessTexture.index);ie&&(Q.uniforms.uMRMap={value:ie,type:"1i"},Q.defines.USE_MR_MAP="")}}if(V.emissiveFactor&&(Q.uniforms.uEmission={value:V.emissiveFactor,type:"3fv"},Q.defines.USE_EMISSION=""),V.emissiveTexture){const xe=G(V.emissiveTexture.index);xe&&(Q.uniforms.uEmissionMap={value:xe,type:"1i"},Q.defines.USE_EMISSION_MAP="")}V.extensions&&V.extensions.KHR_materials_emissive_strength&&(Q.uniforms.uEmissionStrength={value:V.extensions.KHR_materials_emissive_strength.emissiveStrength,type:"1fv"},Q.defines.USE_EMISSION_STRENGTH=""),M.set(re,Q)});const Y=new Map;p.meshes&&p.meshes.forEach((V,re)=>{const{primitives:Q}=V;Y.set(re,Q.map(xe=>{const ie=new So;if(Object.keys(xe.attributes).forEach(pe=>{const Fe=xe.attributes[pe],se=w.get(Fe);se&&ie.setAttribute(bO(pe),new Float32Array(se.buffer),xO(se.type))}),xe.indices!==void 0){const pe=w.get(xe.indices);pe&&ie.setAttribute("index",new Uint16Array(pe.buffer),1)}let K=null;if(xe.material!==void 0){const pe=M.get(xe.material);pe&&(K=pe)}return K||(K=new ta),ie.attributes.has("tangent")&&(K.defines.USE_TANGENT=""),{geometry:ie,material:K}}))});const H=new Map,O=(V,re)=>{const Q=new Br;re.translation&&Q.position.set(re.translation[0],re.translation[1],re.translation[2]),re.rotation&&Q.quaternion.set(re.rotation[0],re.rotation[1],re.rotation[2],re.rotation[3]),re.scale&&Q.scale.set(re.scale[0],re.scale[1],re.scale[2]);const xe=Y.get(re.mesh);if(Q.name=re.name,xe)if(xe.length==1){const ie=xe[0],K=Q.addComponent(Sr);K.geometry=ie.geometry,K.material=ie.material}else xe.forEach((ie,K)=>{const pe=new Br;pe.name=re.name+"_"+K;const Fe=pe.addComponent(Sr);Fe.geometry=ie.geometry,Fe.material=ie.material,Q.add(pe)});return re.children&&re.children.forEach(ie=>{const K=H.get(ie);K?Q.add(K):p.nodes&&Q.add(O(ie,p.nodes[ie]))}),H.set(V,Q),Q};p.nodes&&p.nodes.forEach((V,re)=>{O(re,V)});const $=new Br,ae=p.scenes&&p.scenes[0];return ae&&ae.nodes&&ae.nodes.forEach(V=>{const re=H.get(V);re&&$.add(re)}),{scene:$}}}class RO extends yn{constructor(i,o){super();b(this,"gl");b(this,"connection");b(this,"frame");b(this,"nodes");b(this,"curveGroups");b(this,"root");b(this,"gltf");b(this,"currentScene");this.gl=i,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},o&&this.connect(o)}connect(i,o){{const c=new WebSocket(i);c.onopen=this.onOpen.bind(this),c.onmessage=this.onMessage.bind(this),c.onclose=this.onClose.bind(this),c.onerror=d=>{console.error(d),this.emit("error")},this.connection={url:i,ws:c,gltfPath:o}}}disconnect(){this.connection&&(this.connection.ws.close(),this.connection.ws.onmessage=null,this.connection.ws.onclose=null,this.connection.ws.onopen=null,this.connection=void 0)}binaryStringToArrayBuffer(i){const o=new Uint8Array(i.length);for(let c=0;c<i.length;c++){const d=i.charCodeAt(c);o[c]=d}return o.buffer}async loadScene(i,o){this.currentScene=i,o&&await new EO(this.gl).load(o).then(x=>{this.gltf=x,this.emit("gltfLoaded",[x])}),await new Promise(u=>{setTimeout(()=>{u(null)},100)}),this.frame.start=i.frame.start,this.frame.end=i.frame.end,this.frame.fps=i.frame.fps,this.curveGroups=[],this.nodes=[];const c=Object.keys(i.animations);for(let u=0;u<c.length;u++){const x=c[u],v=new cO(x);i.animations[u].forEach(p=>{const _=new uO;_.set(p.k.map(w=>{const T={B:"BEZIER",C:"CONSTANT",L:"LINEAR"}[w[0]],C=w[1];return new fO({x:C[0],y:C[1]},C[2]!==void 0&&{x:C[2],y:C[3]}||void 0,C[4]!==void 0&&{x:C[4],y:C[5]}||void 0,T)})),v.setFCurve(_,p.axis)}),this.curveGroups.push(v)}this.nodes=[];const d=u=>{const x={name:"",uniforms:{}};u.material&&(x.name=u.material.name||"",x.uniforms=u.material.uniforms||{});const v={name:u.name,class:u.class,parent:u.parent,children:[],animations:u.animation||{},position:u.position||[0,0,0],rotation:u.rotation||[0,0,0],scale:u.scale||[1,1,1],material:x,type:u.type,visible:u.visible},p=u.param;return p&&"position"in p?v.param={position:new Float32Array(this.binaryStringToArrayBuffer(atob(p.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(p.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(p.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(p.index)))}:v.param=p,u.children&&u.children.forEach(_=>{v.children.push(d(_))}),this.nodes.push(v),v};this.root=d(i.root),this.emit("sync/scene",[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(i){this.frame=i,this.emit("sync/timeline",[this.frame])}onOpen(i){}onMessage(i){{const o=JSON.parse(i.data);o.type=="sync/scene"?this.loadScene(o.data,this.connection&&this.connection.gltfPath):o.type=="sync/timeline"?this.onSyncTimeline(o.data):o.type=="event"&&this.emit("event/"+o.data.type)}}onClose(i){this.disconnect()}getCurveGroup(i){return this.curveGroups[i]}setFrame(i){this.onSyncTimeline({...this.frame,playing:!0,current:i})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(i=>{this.on("gltfLoaded",o=>{i(o)})})}dispose(){this.disconnect()}}class _O extends So{constructor(l){super();const i=[],o=[],c=[],d=[],u=[],{width:x,height:v,depth:p,segmentsWidth:_,segmentsHeight:w,segmentsDepth:T}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...l},C=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:x,h:v,d:p,segW:_,segH:w},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:x,h:v,d:p,segW:_,segH:w},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:p,h:v,d:x,segW:T,segH:w},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:p,h:v,d:x,segW:T,segH:w},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:x,h:p,d:v,segW:_,segH:T},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:x,h:p,d:v,segW:_,segH:T}];let M=0;for(const G of C){const Y=G.normal,H=G.dir,O=G.up,$=G.segW,ae=G.segH,V=G.w/2,re=G.h/2,Q=G.d/2,xe=G.w/$,ie=G.h/ae;for(let K=0;K<=ae;K++)for(let pe=0;pe<=$;pe++){const Fe=-V+pe*xe,se=-re+K*ie,ge=-Q,Ee=pe/$,le=K/ae,ne=Fe*-H[0]+se*O[0]+ge*-Y[0],Xe=Fe*-H[1]+se*O[1]+ge*-Y[1],Tt=Fe*-H[2]+se*O[2]+ge*-Y[2];if(i.push(ne,Xe,Tt),o.push(...Y),c.push(Ee,le),u.push(K/ae*O[1]+Math.max(0,O[2])),K<ae&&pe<$){const Bt=M+K*($+1)+pe,Gt=M+(K+1)*($+1)+pe,bt=M+(K+1)*($+1)+(pe+1),At=M+K*($+1)+(pe+1);d.push(Bt,Gt,At),d.push(Gt,bt,At)}}M+=($+1)*(ae+1)}this.setAttribute("position",new Float32Array(i),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(c),2),this.setAttribute("posY",new Float32Array(u),1),this.setAttribute("index",new Uint16Array(d),1)}}class SO extends So{constructor(l){super();const i=[],o=[],c=[],d=[],{height:u,radiusTop:x,radiusBottom:v,radSegments:p,heightSegments:_,caps:w}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...l};for(let T=0;T<=_+2;T++)for(let C=0;C<=p;C++){const M=Math.PI*2/p*C;if(T<=_){const G=1-T/_,Y=(1-G)*x+G*v,H=Math.cos(M)*Y,O=-(u/2)+u/_*T,$=Math.sin(M)*Y;i.push(H,O,$),c.push(C/p,T/_);const ae=new ee(Math.cos(M),0,Math.sin(M)).normalize();if(o.push(ae.x,ae.y,ae.z),T<_){const V=p+1;d.push(T*V+C,(T+1)*V+(C+1)%V,T*V+(C+1)%V,T*V+C,(T+1)*V+C,(T+1)*V+(C+1)%V)}}else{if(!w)continue;const G=T-_-1,Y=G?x:v,H=Math.cos(M)*Y,O=-(u/2)+u*G,$=Math.sin(M)*Y;i.push(H,O,$),c.push((H+Y)*.5/Y,($+Y)*.5/Y),o.push(0,-1+G*2,0);const ae=(p+1)*(_+(G+1));C<=p-2&&(G==0?d.push(ae,ae+C,ae+C+1):d.push(ae,ae+C+1,ae+C))}}this.setAttribute("position",new Float32Array(i),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(c),2),this.setAttribute("index",new Uint16Array(d),1)}}class zv extends So{constructor(l){super();const{width:i,height:o,widthSegments:c,heightSegments:d,floor:u}={width:1,height:1,widthSegments:1,heightSegments:1,...l},x=i/2,v=o/2,p=[],_=[],w=[],T=[];for(let C=0;C<=d;C++)for(let M=0;M<=c;M++){const G=M/c,Y=C/d;if(u?(p.push(-x+i*G,0,v-o*Y),_.push(0,1,0)):(p.push(-x+i*G,-v+o*Y,0),_.push(0,0,1)),w.push(G,Y),C>0&&M>0){const H=c+1,O=H*C+M,$=H*(C-1)+M-1;T.push(O,H*C+M-1,$,O,$,H*(C-1)+M)}}this.setAttribute("position",new Float32Array(p),3),this.setAttribute("normal",new Float32Array(_),3),this.setAttribute("uv",new Float32Array(w),2),this.setAttribute("index",new Uint16Array(T),1)}}class NE extends So{constructor(l){super();const i=[],o=[],c=[],d=[],{radius:u,widthSegments:x,heightSegments:v}={radius:.5,widthSegments:8,heightSegments:8,...l};for(let p=0;p<=v;p++){const _=p/v*Math.PI;for(let w=0;w<=x;w++){const T=w/x*Math.PI*2,C=Math.sin(_)*u,M=Math.cos(T)*C,G=-Math.cos(_)*u,Y=-Math.sin(T)*C;i.push(M,G,Y),c.push(w/x,p/v);const H=new ee(M,G,Y).normalize();if(o.push(H.x,H.y,H.z),w<x&&p<v){const O=x+1;d.push(p*O+w,p*O+(w+1)%O,(p+1)*O+(w+1)%O,p*O+w,(p+1)*O+(w+1)%O,(p+1)*O+w)}}}for(let p=0;p<d.length;p++)d[p]=Math.min(i.length/3-1,d[p]);this.setAttribute("position",new Float32Array(i),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(c),2),this.setAttribute("index",new Uint16Array(d),1)}}class Fv extends xn{constructor(i){super(i);b(this,"cameraType");b(this,"fov");b(this,"aspect");b(this,"near");b(this,"far");b(this,"orthWidth");b(this,"orthHeight");b(this,"projectionMatrix");b(this,"viewMatrix");b(this,"projectionMatrixPrev");b(this,"viewMatrixPrev");b(this,"needsUpdateProjectionMatrix");b(this,"displayOut");b(this,"viewPort");this.cameraType="perspective",this.viewMatrix=new st,this.projectionMatrix=new st,this.viewMatrixPrev=new st,this.projectionMatrixPrev=new st,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.field("fov",()=>this.fov,o=>this.fov=o,{noExport:!0}),this._tag="camera"}updateProjectionMatrix(){this.cameraType=="perspective"?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}beforeRenderImpl(i){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix()}afterRenderImpl(i){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}class CO extends Fv{constructor(i){super(i);b(this,"renderTarget");b(this,"viewMatrixOffset");this.renderTarget=null,this.viewMatrixOffset=new Fa().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100}beforeRenderImpl(i){super.beforeRenderImpl(i),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}class Ts extends CO{constructor(i){super(i);b(this,"lightType");b(this,"color");b(this,"intensity");b(this,"castShadow");b(this,"shadowMapSize");b(this,"angle");b(this,"blend");b(this,"distance");b(this,"decay");this.lightType="spot",this.cameraType="perspective",this.color=new ee(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new ee(1024,1024),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field("intensity",()=>this.intensity,o=>this.intensity=o,{noExport:!0}),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}setShadowMap(i){this.renderTarget=i,this.renderTarget.setSize(this.shadowMapSize)}setShadowMapSize(i){this.shadowMapSize.copy(i),this.renderTarget&&this.renderTarget.setSize(this.shadowMapSize)}lookAt(i){this.entity.lookAt(i),this.entity.quaternion.multiply(new Fa().setFromEuler(new Lv(Math.PI/2)))}}class Ou extends xn{constructor(i){super(i);b(this,"node");b(this,"rotationOffsetX");b(this,"animations");b(this,"uniforms");b(this,"uniformCurves");b(this,"transformAutoUpdate");b(this,"_blidge");b(this,"_cameraComponent");b(this,"_lightComponent");this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=i.args.blidge,this.node=i.args.node,this.node.type=="camera"&&(this.rotationOffsetX=-Math.PI/2);const o=Object.keys(this.node.animations);for(let u=0;u<o.length;u++){const x=o[u];this.animations.set(x,this._blidge.getCurveGroup(this.node.animations[x]))}const c=Object.keys(this.node.material.uniforms);for(let u=0;u<c.length;u++){const x=c[u],v=this.node.material.uniforms[x],p=this._blidge.curveGroups[v];p&&(this.uniformCurves.set(x,p),this.uniforms[x]={type:"4fv",value:p.value})}const d=this.entity;if(d.name=this.node.name,d.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),d.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},"YZX"),d.quaternion.updated=!1,d.euler.setFromQuaternion(d.quaternion),d.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type=="cube"){const u=d.addComponent(Sr),x=this.node.param;u.geometry=new _O({width:x.x,height:x.y,depth:x.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type=="sphere"){const u=d.addComponent(Sr),x=this.node.param;u.geometry=new NE({radius:x.r,widthSegments:32,heightSegments:16})}else if(this.node.type=="cylinder"){const u=d.addComponent(Sr);u.geometry=new SO}else if(this.node.type=="plane"){const u=d.addComponent(Sr),x=this.node.param;u.geometry=new zv({width:x.x,height:x.y})}else if(this.node.type=="mesh"){const u=d.addComponent(Sr),x=this.node.param,v=new So;v.setAttribute("position",x.position,3),v.setAttribute("uv",x.uv,2),v.setAttribute("normal",x.normal,3),v.setAttribute("index",x.index,3),u.geometry=v}else if(this.node.type=="gltf"){const u=d.addComponent(Sr);this._blidge.gltfPrm.then(x=>{const v=x.scene.findEntityByName(this.node.name);if(v){const p=v.getComponent(Sr);p&&(u.geometry=p.geometry,u.material=p.material)}d.noticeEventParent("update/blidge/scene",[d])})}if(this.node.type=="light"){const u=this.node.param;this._lightComponent=d.addComponent(Ts),this._lightComponent.deserialize({...u,lightType:u.type,color:new ee().copy(u.color),castShadow:u.shadowMap})}if(this.node.type=="camera"&&(this._cameraComponent=d.getComponentsByTag("camera")[0],this._cameraComponent)){const u=this.node.param;this._cameraComponent.fov=u.fov}d.visible=this.node.visible,this.field("type",()=>this.node.type,void 0,{noExport:!0,readOnly:!0}),this.field("param",()=>JSON.stringify(this.node.param),void 0,{noExport:!0,readOnly:!0})}updateImpl(i){if(!this._blidge||!this.node)return;const o=i.timeCode*this._blidge.frame.fps;if(this.animations.forEach(d=>{d.setFrame(o)}),this.transformAutoUpdate){const d=this.animations.get("position");if(d){const v=d.value;d.getFCurve("x")&&(this.entity.position.x=v.x),d.getFCurve("y")&&(this.entity.position.y=v.y),d.getFCurve("z")&&(this.entity.position.z=v.z)}const u=this.animations.get("rotation");if(u){const v={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},p=u.value;u.getFCurve("x")&&(v.x=p.x),u.getFCurve("y")&&(v.y=p.y),u.getFCurve("z")&&(v.z=p.z),this.entity.quaternion.setFromEuler({x:v.x+this.rotationOffsetX,y:v.y,z:v.z},"YZX")}const x=this.animations.get("scale");if(x){const v=x.setFrame(o).value;x.getFCurve("x")&&(this.entity.scale.x=v.x),x.getFCurve("y")&&(this.entity.scale.y=v.y),x.getFCurve("z")&&(this.entity.scale.z=v.z)}}const c=this.animations.get("hide");if(c&&(this.entity.visible=c.value.x<.5),this._lightComponent){const d=this.animations.get("color");d&&this._lightComponent.color.copy(d.setFrame(o).value)}this.uniformCurves.forEach((d,u)=>{this.uniforms[u].value=d.setFrame(o).value})}}class Ci extends Ds{constructor(i){super();b(this,"name");b(this,"enabled");b(this,"_passes");const o=i||{};this.name=o.name||"",this.enabled=!0,this._passes=i&&i.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(i=>i.enabled)}get output(){for(let i=this._passes.length-1;i>=0;i--){const o=this._passes[i];if(!o.passThrough&&o.enabled)return o.renderTarget}return null}resize(i){if(this._passes)for(let o=0;o<this._passes.length;o++)this._passes[o].resize(i)}dispose(){this.emit("dispose")}}class Bv extends xn{constructor(i){super(i);b(this,"_resolution");b(this,"_postProcesses");b(this,"_postProcessesDict");this._postProcesses=[],this._postProcessesDict=new Map,this._resolution=new ee,this.field("postprocess",()=>this._postProcesses.map((o,c)=>o.enabled),o=>{o.forEach((c,d)=>{const u=this._postProcesses[d];u&&(u.enabled=c)})},{format:{type:"array",labels:(o,c)=>this._postProcesses[c].name}})}get postProcesses(){return this._postProcesses}add(i){return this.postProcesses.push(i),i.resize(this._resolution),i}remove(i){const o=this._postProcesses.indexOf(i);o>-1&&this._postProcesses.splice(o,1)}resize(i){this._resolution.copy(i),this.postProcesses.forEach(o=>{o.resize(i)})}}const wO=`#include <common>\r
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
}`,TO=`layout ( location = 0 ) in vec3 position;\r
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
}`;class yt extends ta{constructor(i,o){super({...o,frag:o.frag||wO,vert:o.vert||TO});b(this,"enabled");b(this,"renderTarget");b(this,"backBufferOverride");b(this,"clearColor");b(this,"clearDepth");b(this,"resolutionRatio");b(this,"passThrough");b(this,"resolution");b(this,"resolutionInv");b(this,"viewPort");b(this,"_fixedResolution");this.enabled=!0,this._fixedResolution=o.fixedResotluion?o.fixedResotluion.clone():null,this.resolution=new ee,this.resolutionInv=new ee,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:"2fv"},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:"2fv"},this.renderTarget=o.renderTarget!==void 0?o.renderTarget:new xt(i).setTexture([new ze(i).setting({magFilter:i.LINEAR,minFilter:i.LINEAR})]),this.clearColor=o.clearColor??null,this.clearDepth=o.clearDepth??null,this.depthTest=o.depthTest!==void 0?o.depthTest:!1,this.resolutionRatio=o.resolutionRatio||1,this.passThrough=o.passThrough??!1,this.viewPort=o.viewPort||null,this.backBufferOverride=o.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(i){this._fixedResolution=i,this.resize(i||new ee)}onAfterRender(){}resize(i){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(i).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(i){this.renderTarget=i,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}var Qt;(h=>{h.assign=(l,...i)=>{for(let o=0;o<i.length;o++)i[o]!=null&&Object.assign(l,i[o]);return l},h.merge=(...l)=>{const i={};return(0,h.assign)(i,...l)}})(Qt||(Qt={}));class Tv extends Fv{constructor(i){super(i);b(this,"dofParams");b(this,"_gl");b(this,"_renderTarget");b(this,"_gBuffer");b(this,"_resolution");this.dofParams={focusDistance:.5,kFilmHeight:.008};const o=i.args.gl;this._gl=o,this._resolution=new ee,this._gBuffer=new xt(o),this._gBuffer.setTexture([new ze(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA,magFilter:o.NEAREST,minFilter:o.NEAREST}),new ze(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA}),new ze(o),new ze(o),new ze(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA})]);const c=new xt(o,{disableDepthBuffer:!0});c.setTexture([new ze(o).setting({type:o.FLOAT,internalFormat:o.RGBA16F,format:o.RGBA}),new ze(o).setting({type:o.FLOAT,internalFormat:o.RGBA16F,format:o.RGBA})]);const d=new xt(o,{disableDepthBuffer:!0});d.setDepthTexture(this._gBuffer.depthTexture),d.setTexture([c.textures[0],this._gBuffer.textures[0],this._gBuffer.textures[4]]);const u=new xt(o,{disableDepthBuffer:!0});u.setDepthTexture(this._gBuffer.depthTexture),u.setTexture([new ze(o)]);const x=new xt(o);x.setTexture([new ze(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA,magFilter:o.NEAREST,minFilter:o.NEAREST})]),this._renderTarget={gBuffer:this._gBuffer,shadingBuffer:c,forwardBuffer:d,uiBuffer:u,normalBuffer:x},this.resize(this._resolution)}get resolution(){return this._resolution}get gBuffer(){return this._gBuffer}get renderTarget(){return this._renderTarget}resize(i){i.x==this._resolution.x&&i.y==this._resolution.y||(this._resolution.copy(i),this.aspect=i.x/i.y,this._renderTarget&&(this._renderTarget.gBuffer.setSize(this._resolution),this._renderTarget.shadingBuffer.setSize(this._resolution),this._renderTarget.forwardBuffer.setSize(this._resolution),this._renderTarget.uiBuffer.setSize(this._resolution),this._renderTarget.normalBuffer.setSize(this._resolution)),this.needsUpdateProjectionMatrix=!0)}}const NO=new ta;class AE extends xn{constructor(i){super(i);b(this,"material");this.material=i.args||NO,this._tag="materialOverride"}}const AO=`#define PI 3.14159265359\r
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
}`,DO=`struct DirectionalLight {\r
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
}`,OO=`\r
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
}`,kO=`\r
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
  }`,MO=`\r
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
}`,PO=`// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15\r
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
}`,LO=`// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
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
}`,zO=`vec3 N( vec3 pos, float delta ){\r
\r
    return normalize( vec3(\r
		D( vec3( pos.x + delta, pos.y, pos.z ) ).d - D( vec3( pos.x - delta, pos.y, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y + delta, pos.z ) ).d - D( vec3( pos.x, pos.y - delta, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y, pos.z + delta ) ).d - D( vec3( pos.x, pos.y, pos.z - delta ) ).d\r
	) );\r
	\r
}`,FO=`mat2 rotate(float rad) {\r
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
}`,BO=`// https://iquilezles.org/articles/distfunctions/\r
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
`,UO="in vec2 vUv;\rin vec3 vNormal;\rin vec3 vViewNormal;\rin vec3 vPos;\rin vec3 vMVPosition;\rin vec3 vMVPPosition;\rin vec2 vVelocity;\r\runiform mat4 uModelMatrix;\runiform mat4 uModelMatrixInverse;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform vec3 uCameraPosition;\runiform vec2 uResolution;\r\r#ifdef IS_DEPTH\r	uniform float uCameraNear;\r	uniform float uCameraFar;\r#endif\r\r#ifdef IS_DEFERRED\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r	layout (location = 3) out vec4 outColor3;\r	layout (location = 4) out vec4 outColor4;\r#endif\r\r#ifdef IS_FORWARD\r	uniform sampler2D uDeferredTexture;\r	uniform vec2 uDeferredResolution;\r#endif\r\r#if defined(IS_FORWARD) || defined(IS_DEPTH)\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r#endif",VO="vec4 outColor = vec4(1.0);\rvec3 outNormal = normalize(vNormal);\rvec3 outNormalMap = vec3( 0.0 );\rfloat outSSN = 0.0;\rvec3 outEmission = vec3(0.0);\rfloat outRoughness = 0.5;\rfloat outMetalic = 0.0;\rvec3 outPos = vPos;\rfloat outEnv = 1.0;",IO="#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r#endif\r\r#ifdef IS_DEPTH\r	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r	outColor0 = vec4(floatToRGBA( depth_z ));\r#endif\r\r#ifdef IS_DEFERRED\r\r	#ifdef USE_NORMAL_MAP \r\r		vec3 tangent;\r		vec3 bitangent;\r\r		#ifdef USE_TANGENT\r\r			tangent = normalize( vTangent );\r			bitangent = normalize( vBitangent );\r\r		#else\r\r			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r			bitangent = cross(tangent, outNormal);\r\r		#endif\r\r		#ifdef DOUBLE_SIDED\r\r			tangent *= faceDirection;\r			bitangent *= faceDirection;\r			\r		#endif\r\r		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r		outNormal = normalize( vTBN * outNormalMap );\r\r	#endif\r\r	vec4 mvp = uProjectionMatrix * mv;\r	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r	outColor0 = vec4( outPos, outEmission.x );\r	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r	outColor2 = vec4( outColor.xyz, 0.0 );\r	outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );\r	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r#endif\r\r#ifdef IS_FORWARD\r	outColor0 = outColor;\r	outColor1 = vec4(outPos, 1.0);\r	outColor2 = vec4(vVelocity, 0.0, 1.0);\r#endif",jO="vec3 refDir = reflect( -geo.viewDir, geo.normal );\rfloat dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\rfloat EF = mix( fresnel( dNV ), 1.0, mat.metalic );\routColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;\routColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );",HO="Geometry geo = Geometry(\r	outPos,\r	outNormal,\r	0.0,\r	normalize( uCameraPosition - outPos ),\r	vec3( 0.0 ),\r	0.0\r);\r\rMaterial mat = Material(\r	vec3( 1.0 ),\r	outRoughness,\r	outMetalic,\r	outEmission,\r	mix( outColor.xyz, vec3( 0.0, 0.0, 0.0 ), outMetalic ),\r	mix( vec3( 1.0, 1.0, 1.0 ), outColor.xyz, outMetalic ),\r	outEnv\r);\r\routColor.xyz *= 0.0;",GO="// required common, light,\r\rfloat shadow;\r\r// direcitonalLight\r\rLight light;\rLightCamera lightCamera;\r\r#if NUM_LIGHT_DIR > 0 \r\r	DirectionalLight dLight;\r\r	#pragma loop_start NUM_LIGHT_DIR\r\r		dLight = directionalLight[ LOOP_INDEX ];\r		light.direction = dLight.direction;\r		light.color = dLight.color;\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_DIR\r\r			shadow = getShadowSmooth( tex0.xyz, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r		\r		// lighting\r\r		outColor.xyz += RE( geo, mat, light ) * shadow;\r\r	#pragma loop_end\r\r#endif\r\r#if NUM_LIGHT_SPOT > 0\r\r	SpotLight sLight;\r	\r	vec3 spotDirection;\r	float spotDistance;\r	float spotAngleCos;\r	float spotAttenuation;\r	vec3 radiance;\r\r	#pragma loop_start NUM_LIGHT_SPOT\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_SPOT\r\r			shadow = getShadowSmooth( geo.position, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r\r		// lighting\r\r		sLight = uSpotLight[ LOOP_INDEX ];\r\r		spotDirection = normalize(sLight.position - geo.position);\r		spotDistance = length( sLight.position - geo.position );\r		spotAngleCos = dot( sLight.direction, spotDirection );\r		spotAttenuation = 0.0;\r\r		if( spotAngleCos > sLight.angle ) {\r\r			spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );\r\r		}\r\r		light.direction = spotDirection;\r		light.color = sLight.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay );\r\r		radiance = RE( geo, mat, light );\r		outColor.xyz += shadow * radiance;\r\r	#pragma loop_end\r\r#endif",WO="struct SDFResult {\r	float d;\r	vec3 pos;\r	float mat;\r};",XO="vec4 worldNormal = normalize(uModelMatrix * vec4( outNormal, 0.0 ));\rvec4 viewNormal = normalize(uViewMatrix * worldNormal);\routNormal = worldNormal.xyz;\r\rvec4 modelPosition = uModelMatrix * vec4( rayPos, 1.0 );\rvec4 mvpPosition = uProjectionMatrix * uViewMatrix * modelPosition;\routPos = modelPosition.xyz;\rgl_FragDepth =  ( mvpPosition.z / mvpPosition.w ) * 0.5 + 0.5;",YO="vec3 rayPos = ( uModelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;\rvec3 rayDir = normalize( ( uModelMatrixInverse * vec4( normalize( vPos - uCameraPosition ), 0.0 ) ).xyz );",$O="vec3 rayPos = ( uModelMatrixInverse * vec4( uCameraPosition, 1.0 ) ).xyz;\rvec4 clipSpacePos = vec4((gl_FragCoord.xy / uResolution) * 2.0 - 1.0, -1.0, 1.0);\rvec4 viewSpacePos = uProjectionMatrixInverse * clipSpacePos;\rviewSpacePos /= viewSpacePos.w;\rvec3 viewDir = normalize(viewSpacePos.xyz);\rvec3 rayDir = normalize((uViewMatrixInverse * vec4(viewDir, 0.0)).xyz);",qO="uniform float uTime;\runiform float uTimeF;\runiform float uTimeE;\runiform float uTimeEF;",QO="uniform mat4 uModelMatrix;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform mat4 uNormalMatrix;\r\runiform mat4 uModelMatrixPrev;\runiform mat4 uModelViewMatrix;\runiform mat4 uViewMatrixPrev;\runiform mat4 uProjectionMatrixPrev;\r\rout vec2 vUv;\rout vec3 vViewNormal;\rout vec3 vNormal;\rout vec3 vMVPosition;\rout vec3 vMVPPosition;\rout vec3 vPos;\r\rout vec2 vVelocity;\r\rlayout ( location = 0 ) in vec3 position;\rlayout ( location = 1 ) in vec2 uv;\rlayout ( location = 2 ) in vec3 normal;\r\r#ifdef TF_MODELER\r	out vec3 o_position;\r	out vec3 o_normal;\r#endif",KO="vec3 outPos = position;\rvec3 outNormal = normal;\rvec2 outUv = uv;",ZO="#ifdef TF_MODELER\r		o_position = outPos;\r		o_normal = outNormal;\r		return;\r#endif\r\rvec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\rvec4 mvPosition = uViewMatrix * modelPosition;\rgl_Position = uProjectionMatrix * mvPosition;\r\rvec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\rvec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\rvec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r\rvUv = outUv;\rvViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\rvNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\rvPos = modelPosition.xyz;\rvMVPosition = mvPosition.xyz;\rvMVPPosition = gl_Position.xyz / gl_Position.w;\r\rvVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\rvVelocity *= 0.2;",JO=(h,l)=>{if(!l)return h;const i=Object.keys(l);let o="";for(let c=0;c<i.length;c++)o+="#define "+i[c]+" "+l[i[c]]+`
`;return o=o+h,o},ek=h=>{const l=new Map([["common",AO],["sdf",BO],["rotate",FO],["random",LO],["noise_simplex",kO],["noise_cyclic",OO],["noise_value",MO],["light",DO],["lighting_light",GO],["lighting_env",jO],["lighting_forwardIn",HO],["vert_h",QO],["vert_in",KO],["vert_out",ZO],["frag_h",UO],["frag_in",VO],["frag_out",IO],["rm_h",WO],["rm_normal",zO],["rm_ray_obj",YO],["rm_ray_world",$O],["rm_out_obj",XO],["uni_time",qO],["pmrem",PO]]);return h=h.replace(/#include\s?<([\S]*)>/g,(i,o)=>{let c="",d=l.get(o)||"";return d=d.replace(/#define GLSLIFY .*\n/g,""),c+=d,c}),h},tk=(h,l)=>(h=h.replaceAll("NUM_LIGHT_DIR",l?l.directional.length.toString():"0"),h=h.replaceAll("NUM_SHADOWMAP_DIR",l?Math.min(2,l.directional.filter(i=>i.component.castShadow).length).toString():"0"),h=h.replaceAll("NUM_LIGHT_SPOT",l?l.spot.length.toString():"0"),h=h.replaceAll("NUM_SHADOWMAP_SPOT",l?Math.min(2,l.spot.filter(i=>i.component.castShadow).length).toString():"0"),h),nk=h=>(h=h.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(l,i,o)=>{let c="";for(let d=0;d<Number(i);d++)c+=o.replaceAll("LOOP_INDEX",d.toString());return c}),h),Nv=(h,l,i)=>(h=JO(h,l),h=`#version 300 es
precision highp float;
`+h,h=ek(h),h=tk(h,i),h=nk(h),h=h.replace(/#define GLSLIFY .*\n/g,""),h),rk=`#include <common>\r
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
}`,ik=`#include <common>
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

}`,ak=`#include <common>

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

}`,ok=`#include <common>
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

}`,Kb=`#include <common>
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

}`,sk=h=>{const l=[];for(let i=0;i<h;i++){const o=new ee;o.x=Math.random()*2-1,o.y=Math.random()*2-1,o.z=i/h*.95+.05,o.normalize(),o.multiply(i/h*.95+.05),l.push(...o.getElm("vec3"))}return l};class lk extends yn{constructor(i){super();b(this,"timeUniforms_");b(this,"postprocess");b(this,"normalSelector_");b(this,"lightShaft");b(this,"rtLightShaft1");b(this,"rtLightShaft2");b(this,"ssao");b(this,"rtSSAO1");b(this,"rtSSAO2");b(this,"ssaoBlur");b(this,"ssaoBlurUni");b(this,"shading");const o=i.gl,c={uTimeEF:{value:0,type:"1f"}},d=new yt(o,{name:"normalSelector",frag:ak,renderTarget:null,uniforms:Qt.merge({uNormalTexture:{value:null,type:"1i"},uPosTexture:{value:null,type:"1i"},uSelectorTexture:{value:null,type:"1i"}}),passThrough:!0}),u=new xt(o).setTexture([new ze(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),x=new xt(o).setTexture([new ze(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),v=new yt(o,{name:"lightShaft",frag:ik,renderTarget:u,uniforms:Qt.merge(c,{uLightShaftBackBuffer:{value:x.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"}}),resolutionRatio:.5,passThrough:!0}),p=new xt(o).setTexture([new ze(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),_=new xt(o).setTexture([new ze(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),w=new yt(o,{name:"ssao",frag:ok,renderTarget:Fr("ssao",p),uniforms:Qt.merge(c,{uSSAOBackBuffer:{value:_.textures[0],type:"1i"},uSSAOKernel:{value:sk(16),type:"3fv"}}),resolutionRatio:.5,passThrough:!0}),T=8,C=Qt.merge(c,{uSSAOTexture:{value:_.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"},uNormalTexture:{value:null,type:"1i"},uWeights:{type:"1fv",value:od.gaussWeights(T)}}),M=new yt(o,{name:"ssaoBlur/h",frag:Fr("ssaoBlur",Kb),uniforms:C,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:T}}),G=new yt(o,{name:"ssaoBlur/v",frag:Fr("ssaoBlur",Kb),uniforms:Qt.merge(C,{uSSAOTexture:{value:M.renderTarget.textures[0],type:"1i"}}),defines:{SSAOSAMPLE:T,IS_VIRT:""},resolutionRatio:1,passThrough:!0}),Y=new yt(o,{name:"deferredShading",frag:Fr("deferredShading",rk),uniforms:Qt.merge({uLightShaftTexture:{value:null,type:"1i"},uSSAOTexture:{value:G.renderTarget.textures[0],type:"1i"},uSSAOResolutionInv:{value:w.resolutionInv,type:"2fv"},uEnvMap:{value:i.envMap,type:"1i"}})});this.postprocess=new Ci({passes:[d,v,w,M,G,Y]}),this.timeUniforms_=c,this.shading=Y,this.lightShaft=v,this.ssao=w,this.rtSSAO1=p,this.rtSSAO2=_,this.ssaoBlur=M,this.ssaoBlurUni=C,this.rtLightShaft1=u,this.rtLightShaft2=x,this.normalSelector_=d}update(i){this.timeUniforms_.uTimeEF.value=(this.timeUniforms_.uTimeEF.value+i.timeDelta)%1;let o=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=o,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],o=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=o,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setRenderCamera(i){const o=i.renderTarget;if(o){for(let c=0;c<o.gBuffer.textures.length;c++){let d=o.gBuffer.textures[c];c===1&&(d=o.normalBuffer.textures[0]),this.shading.uniforms["sampler"+c]=this.ssao.uniforms["sampler"+c]={type:"1i",value:d}}this.ssaoBlur.uniforms.uDepthTexture.value=o.gBuffer.textures[0],this.lightShaft.uniforms.uDepthTexture.value=o.gBuffer.depthTexture,this.shading.renderTarget=o.shadingBuffer,this.normalSelector_.renderTarget=o.normalBuffer,this.normalSelector_.uniforms.uNormalTexture.value=o.gBuffer.textures[1],this.normalSelector_.uniforms.uPosTexture.value=o.gBuffer.textures[0],this.normalSelector_.uniforms.uSelectorTexture.value=o.gBuffer.textures[3],this.ssaoBlurUni.uNormalTexture.value=o.normalBuffer.textures[0]}}resize(i){this.postprocess.resize(i)}}const uk=`#include <common>\r
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
}`,ck=`#include <common>\r
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
}`,fk=`#include <common>\r
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
`,dk=`#include <common>

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

}`,hk=`in vec2 vUv;

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

}`,mk=`in vec2 vUv;
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

}`,pk=`in vec2 vUv;
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

}`,vk=`#include <common>\r
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
}`,gk=`#include <common>
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

}`;class yk{constructor(l){b(this,"dofCoc");b(this,"dofBokeh");b(this,"dofComposite");b(this,"rtSSR1");b(this,"rtSSR2");b(this,"postprocess");b(this,"_timeUniforms");b(this,"_ssr");b(this,"_ssComposite");b(this,"_dofParams");b(this,"_motionBlur");b(this,"_motionBlurTile");b(this,"_renderCamera");const i={uTimeEF:{value:0,type:"1f"}},o=new yt(l,{name:"collection",frag:uk}),c=new xt(l).setTexture([new ze(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),d=new xt(l).setTexture([new ze(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),u=new yt(l,{name:"ssr",frag:Fr("ssr",gk),renderTarget:c,uniforms:Qt.merge(i,{uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSceneTex:{value:null,type:"1i"},uSSRBackBuffer:{value:d.textures[0],type:"1i"}}),resolutionRatio:.5,passThrough:!0}),x=new yt(l,{name:"ssComposite",frag:Fr("ssComposite",vk),uniforms:Qt.merge({uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSSRTexture:{value:d.textures[0],type:"1i"}})}),v=new ee(10,.05,20,.05),p=new yt(l,{name:"dof/coc",frag:fk,uniforms:Qt.merge(i,{uGbufferPos:{value:null,type:"1i"},uParams:{value:v,type:"4f"}}),renderTarget:new xt(l).setTexture([new ze(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR,internalFormat:l.RGBA16F,type:l.HALF_FLOAT,format:l.RGBA})]),passThrough:!0,resolutionRatio:.5}),_=new yt(l,{name:"dof/bokeh",frag:ck,uniforms:Qt.merge(i,{uCocTex:{value:p.renderTarget.textures[0],type:"1i"},uParams:{value:v,type:"4f"}}),renderTarget:new xt(l).setTexture([new ze(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),passThrough:!0,resolutionRatio:.5}),w=new yt(l,{name:"dof/composite",frag:dk,uniforms:Qt.merge({uBokeTex:{value:_.renderTarget.textures[0],type:"1i"}}),renderTarget:new xt(l).setTexture([new ze(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR,internalFormat:l.RGBA16F,type:l.HALF_FLOAT,format:l.RGBA})])}),T=16,C=new yt(l,{name:"motionBlurTile",frag:pk,uniforms:Qt.merge({uVelTex:{value:null,type:"1i"}}),renderTarget:new xt(l).setTexture([new ze(l).setting({type:l.FLOAT,internalFormat:l.RGBA32F,format:l.RGBA})]),defines:{TILE:T},resolutionRatio:1/T,passThrough:!0}),M=new yt(l,{name:"motionBlurNeighbor",frag:mk,uniforms:Qt.merge({uVelTex:{value:C.renderTarget.textures[0],type:"1i"}}),defines:{TILE:T},renderTarget:new xt(l).setTexture([new ze(l).setting({type:l.FLOAT,internalFormat:l.RGBA32F,format:l.RGBA})]),resolutionRatio:1/T,passThrough:!0}),G=new yt(l,{name:"motionBlur",frag:hk,uniforms:Qt.merge({uVelNeighborTex:{value:M.renderTarget.textures[0],type:"1i"},uVelTex:{value:null,type:"1i"},uDepthTexture:{value:null,type:"1i"},uPower:{value:1,type:"1f"}}),defines:{TILE:T}});this.postprocess=new Ci({passes:[o,u,x,C,M,G]}),this._timeUniforms=i,this._ssr=u,this._ssComposite=x,this.dofCoc=p,this.dofBokeh=_,this.dofComposite=w,this._motionBlur=G,this._motionBlurTile=C,this._dofParams=v,this.rtSSR1=c,this.rtSSR2=d,this._renderCamera=null}update(l){if(!this._renderCamera)return;this._timeUniforms.uTimeEF.value=(this._timeUniforms.uTimeEF.value+l.timeDelta)%1;const i=this._renderCamera.fov,o=this._renderCamera.dofParams.focusDistance,c=this._renderCamera.dofParams.kFilmHeight,d=c/Math.tan(.5*(i/180*Math.PI)),u=1/this.dofBokeh.renderTarget.size.y*5,x=1/u,v=d*d/(.3*(o-d)*c*2);this._dofParams.set(o,u,x,v);const p=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=p,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(l){this.postprocess.resize(l)}setRenderCamera(l){this._renderCamera=l;const i=l.renderTarget;i&&(this.postprocess.passes[0]&&(this.postprocess.passes[0].backBufferOverride=i.shadingBuffer.textures),this._ssr.uniforms.uGbufferPos.value=i.gBuffer.textures[0],this._ssr.uniforms.uGbufferNormal.value=i.normalBuffer.textures[0],this._ssr.uniforms.uSceneTex.value=i.forwardBuffer.textures[0],this._ssComposite.uniforms.uGbufferPos.value=i.gBuffer.textures[0],this._ssComposite.uniforms.uGbufferNormal.value=i.gBuffer.textures[1],this.dofCoc.uniforms.uGbufferPos.value=i.gBuffer.textures[0],this._motionBlurTile.uniforms.uVelTex.value=i.gBuffer.textures[4],this._motionBlur.uniforms.uVelTex.value=i.gBuffer.textures[4],this._motionBlur.uniforms.uDepthTexture.value=i.gBuffer.depthTexture)}}const xk=`#include <common>

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

}`;class bk extends yn{constructor(i,o){super();b(this,"postprocess");b(this,"resolution");b(this,"renderTarget");b(this,"pmremPasses");b(this,"swapBuffers");b(this,"timeUniforms");b(this,"postProcessRenderer");const c=o.resolution,d={uTimeEF:{value:0,type:"1f"}},u=new xt(i).setTexture([new ze(i).setting({type:i.FLOAT,internalFormat:i.RGBA16F,format:i.RGBA,magFilter:i.LINEAR,minFilter:i.LINEAR,wrapS:i.CLAMP_TO_EDGE,wrapT:i.CLAMP_TO_EDGE,generateMipmap:!0})]),x=[],v=[],p=[],_=5;let w=0;for(let T=0;T<_;T++){const C=1/Math.pow(2,T),M=c.x*C,G=c.y*C*.5,Y=new ee(0,w,M,G);w+=G,p.push({rt1:new xt(i).setTexture([new ze(i).setting({type:i.FLOAT,internalFormat:i.RGBA16F,format:i.RGBA})]),rt2:new xt(i).setTexture([new ze(i).setting({type:i.FLOAT,internalFormat:i.RGBA16F,format:i.RGBA})])});let H=1/(_-1)*T;H=H;const O=new yt(i,{renderTarget:p[T].rt1,frag:xk,uniforms:Qt.merge(d,{uRoughness:{value:H,type:"1f"},uEnvMap:{value:o.input,type:"1i"},uPMREMBackBuffer:{value:p[T].rt2.textures,type:"1i"},uRenderCount:{value:1,type:"1f"}}),defines:{NUM_SAMPLES:Math.floor(Math.pow(2,T+1))}});O.resize(new ee(M,G));const $=new yt(i,{renderTarget:u,viewPort:Y,passThrough:!0});$.resize(c),x.push(O,$),v.push(O)}this.postprocess=new Ci({passes:x}),this.postprocess.passes[0].backBufferOverride=u.textures,this.resolution=c,this.renderTarget=u,this.pmremPasses=v,this.swapBuffers=p,this.timeUniforms=d,this.postProcessRenderer=null}setPostProcessRenderer(i){this.postProcessRenderer=i}renderProcess(){this.postProcessRenderer?this.postProcessRenderer.renderPostProcess(this.postprocess,void 0,this.resolution):console.warn("PostProcessRenderer has not been set in PMREMRender. Call setPostProcessRenderer first.")}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let i=0;i<this.pmremPasses.length;i++){const o=this.pmremPasses[i],c=this.swapBuffers[i],d=c.rt1;c.rt1=c.rt2,c.rt2=d,o.setRendertarget(c.rt1),o.uniforms.uPMREMBackBuffer.value=c.rt2.textures}}resize(i){}}class Ek{constructor(l){b(this,"gl");b(this,"pool");this.gl=l,this.pool=new Map}get(l,i){const o=l+i,c=this.pool.get(o);if(c!==void 0&&c.program)return c;const d=new TE(this.gl);return d.setShader(l,i),this.pool.set(o,d),d}}let id=0;class DE extends Br{constructor(i){super({name:"Renderer"});b(this,"gl");b(this,"resolution");b(this,"_extDisJointTimerQuery");b(this,"programManager");b(this,"_lights");b(this,"_lightsUpdated");b(this,"_envMapCameras");b(this,"_envMapRenderTarget");b(this,"_pmremRender");b(this,"_deferredRenderer");b(this,"_pipelinePostProcess");b(this,"_quad");b(this,"_glStateCahce");b(this,"_queryList");b(this,"_queryListQueued");b(this,"_isCorrentCompiles");b(this,"compileDrawParams");b(this,"_tmpNormalMatrix");b(this,"_tmpModelViewMatrix");b(this,"_tmpViewMatrixInverseMatrix");b(this,"_tmpLightDirection");b(this,"_tmpModelMatrixInverse");b(this,"_tmpProjectionMatrixInverse");this.gl=i,this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new Ek(this.gl),this.resolution=new ee,this._extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this._extDisJointTimerQuery||console.warn("[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled."),this._lights={directional:[],spot:[]},this._lightsUpdated=!1;const o=new sO(this.gl);this._envMapRenderTarget=new oO(this.gl).setTexture([o]),this._envMapRenderTarget.setSize(256,256);const c=new ee(0,0,0),d=new ee(0,-1,0),u=[new st().lookAt(c,new ee(1,0,0),d),new st().lookAt(c,new ee(0,1,0),new ee(0,0,1)),new st().lookAt(c,new ee(0,0,1),d),new st().lookAt(c,new ee(-1,0,0),d),new st().lookAt(c,new ee(0,-1,0),new ee(0,0,-1)),new st().lookAt(c,new ee(0,0,-1),d)];this._envMapCameras=[];for(let x=0;x<6;x++){const v=new Br({name:"envMapCamera/"+x}),p=v.addComponent(Fv);p.fov=90,p.near=.1,p.far=1e3,p.aspect=1,v.applyMatrix(u[x].clone()),p.updateViewMatrix(),p.updateProjectionMatrix(),this._envMapCameras.push({entity:v,camera:p})}this._pmremRender=new bk(this.gl,{input:[o],resolution:new ee(256*3,256*4)}),this._deferredRenderer=new lk({gl:i,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:o}),this._pipelinePostProcess=new yk(i),this._quad=new zv({width:2,height:2}),this._glStateCahce={},this._queryList=[],this._queryListQueued=[],this._tmpLightDirection=new ee,this._tmpModelMatrixInverse=new st,this._tmpViewMatrixInverseMatrix=new st,this._tmpProjectionMatrixInverse=new st,this._tmpModelViewMatrix=new st,this._tmpNormalMatrix=new st,this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}getRenderStack(i){const o={camera:[],light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]},c=d=>{const u=d.entity,x=(d.visibility||d.visibility===void 0)&&u.visible,v=u.getComponent(Sr);if(v&&x){const w=v.material;w.visibilityFlag.deferred&&o.deferred.push(u),w.visibilityFlag.shadowMap&&o.shadowMap.push(u),w.visibilityFlag.forward&&o.forward.push(u),w.visibilityFlag.ui&&o.ui.push(u),w.visibilityFlag.envMap&&o.envMap.push(u)}const p=u.getComponent(Tv);p&&p.enabled&&o.camera.push(u);const _=u.getComponent(Ts);_&&_.enabled&&x&&o.light.push(u);for(let w=0;w<u.children.length;w++)c({entity:u.children[w],visibility:x});return o};return c({entity:i,visibility:!0}),o}render(i,o){if(i.onBeforeRender(o),this._extDisJointTimerQuery)if(this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))this._queryList.forEach(p=>this.gl.deleteQuery(p)),this._queryList.length=0;else{const p=[];if(this._queryListQueued.length>0){const _=this._queryListQueued.length;for(let w=_-1;w>=0;w--){const T=this._queryListQueued[w];if(this.gl.getQueryParameter(T.query,this.gl.QUERY_RESULT_AVAILABLE)){const M=this.gl.getQueryParameter(T.query,this.gl.QUERY_RESULT);p.push({name:T.name,duration:M/1e3/1e3}),this._queryList.push(T.query),this._queryListQueued.splice(w,1)}}}this.emit("timer",[p])}const c=this.getRenderStack(i),d=[],u={},x=Object.keys(this._lights);for(let v=0;v<x.length;v++){const p=x[v];u[p]=this._lights[p].length,this._lights[p]=[]}for(let v=0;v<c.light.length;v++){const p=c.light[v],_=p.getComponent(Ts);_&&(this.collectLight(p,_),_.castShadow&&_.renderTarget&&d.push(p))}this._lights.directional.sort((v,p)=>(v.component.castShadow?0:1)-(p.component.castShadow?0:1)),this._lights.spot.sort((v,p)=>(v.component.castShadow?0:1)-(p.component.castShadow?0:1)),this._lightsUpdated=!1;for(let v=0;v<x.length;v++){const p=x[v];if(u[p]!=this._lights[p].length){this._lightsUpdated=!0;break}}for(let v=0;v<d.length;v++){const p=d[v],_=p.getComponent(Ts);_.renderTarget&&this.renderCamera("shadowMap",p,c.shadowMap,_.renderTarget,this.resolution)}for(let v=0;v<this._envMapCameras.length;v++){const{entity:p}=this._envMapCameras[v];this._envMapRenderTarget.face(v),this.renderCamera("envMap",p,c.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap();for(let v=0;v<c.camera.length;v++){const p=c.camera[v],_=p.getComponent(Tv);if(this.gl.disable(this.gl.BLEND),!_.renderTarget)continue;this.renderCamera("deferred",p,c.deferred,_.renderTarget.gBuffer,this.resolution),this._deferredRenderer.setRenderCamera(_),this.renderPostProcess(this._deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:_.viewMatrix,viewMatrixPrev:_.viewMatrixPrev,projectionMatrix:_.projectionMatrix,projectionMatrixPrev:_.projectionMatrixPrev,cameraMatrixWorld:p.matrixWorld}}),this._deferredRenderer.update(o),this.gl.enable(this.gl.BLEND),this.renderCamera("forward",p,c.forward,_.renderTarget.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:_.renderTarget.shadingBuffer.textures[1],type:"1i"},uDeferredResolution:{value:_.renderTarget.shadingBuffer.size,type:"2fv"},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),this._pipelinePostProcess.setRenderCamera(_),this.renderPostProcess(this._pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:_.viewMatrix,projectionMatrix:_.projectionMatrix,cameraMatrixWorld:p.matrixWorld,cameraNear:_.near,cameraFar:_.far}}),this._pipelinePostProcess.update(o);let w=this._pipelinePostProcess.postprocess.output?this._pipelinePostProcess.postprocess.output:void 0;const T=p.getComponent(Bv);if(T)for(let C=0;C<T.postProcesses.length;C++){const M=T.postProcesses[C];M.enabled&&M.hasOutput&&(this.renderPostProcess(M,w,this.resolution,{cameraOverride:{viewMatrix:_.viewMatrix,projectionMatrix:_.projectionMatrix,cameraMatrixWorld:p.matrixWorld,cameraNear:_.near,cameraFar:_.far}}),w=M.output||void 0)}if(w){this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,w.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,_.renderTarget.uiBuffer.getFrameBuffer());const C=w.size;this.gl.blitFramebuffer(0,0,C.x,C.y,0,0,C.x,C.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}if(this.gl.enable(this.gl.BLEND),this.renderCamera("forward",p,c.ui,_.renderTarget.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:_.renderTarget.shadingBuffer.textures[1],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),_.displayOut){const C=_.renderTarget.uiBuffer;this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,C===null?null:C.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null),this.gl.blitFramebuffer(0,0,this.resolution.x,this.resolution.y,0,0,this.resolution.x,this.resolution.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}}i.onAfterRender(o)}renderCamera(i,o,c,d,u,x){const v=o.getComponentsByTag("camera")[0]||o.getComponent(Ts);x=x||{};const p={viewMatrix:v.viewMatrix,viewMatrixPrev:v.viewMatrixPrev,projectionMatrix:v.projectionMatrix,projectionMatrixPrev:v.projectionMatrixPrev,cameraMatrixWorld:o.matrixWorld,cameraNear:v.near,cameraFar:v.far,renderTarget:d,uniformOverride:x.uniformOverride,...x.cameraOverride};if(v.viewPort){const w=v.viewPort;this.gl.viewport(w.x,w.y,w.z,w.w)}else d?this.gl.viewport(0,0,d.size.x,d.size.y):this.gl.viewport(0,0,u.x,u.y);const _=new ee;d?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,d.getFrameBuffer()),this.gl.drawBuffers(d.textureAttachmentList),_.set(d.size.x,d.size.y)):(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),_.set(u.x,u.y)),p.uniformOverride||(p.uniformOverride={}),p.uniformOverride.uResolution={value:_,type:"2fv"},x.disableClear||(i=="shadowMap"?(this.gl.clearColor(1,1,1,1),this.gl.clearDepth(1)):(this.gl.clearColor(0,0,0,1),this.gl.clearDepth(1)),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT));for(let w=0;w<c.length;w++){const T=c[w],C=T.getComponentsByTag("materialOverride")[0],M=T.getComponent(Sr),G=C?C.material:M.material,Y=M.geometry;p.modelMatrixWorld=T.matrixWorld,p.modelMatrixWorldPrev=T.matrixWorldPrev,p.label=`cam[${v.uuid}]/${T.name||G.name||"-"}`,this.draw(T.uuid,i,Y,G,p)}this.emit("drawPass",[d,"camera/"+i])}collectLight(i,o){const c=o.lightType,d={position:new ee(0,0,0,1).applyMatrix4(i.matrixWorld),direction:new ee(0,1,0,0).applyMatrix4(i.matrixWorld).normalize(),color:new ee(o.color.x,o.color.y,o.color.z).multiply(o.intensity*Math.PI),component:o};c=="directional"?this._lights.directional.push(d):c=="spot"&&this._lights.spot.push(d),o.castShadow&&o.renderTarget==null&&o.setShadowMap(new xt(this.gl).setTexture([new ze(this.gl).setting({magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR})]))}renderPostProcess(i,o,c,d){let u=o?o.textures:void 0;if(i.passes)for(let x=0;x<i.passes.length;x++){const v=i.passes[x];if(v.enabled===!1)continue;const p=v.renderTarget;if(v.viewPort){const C=v.viewPort;this.gl.viewport(C.x,C.y,C.z,C.w)}else p?this.gl.viewport(0,0,p.size.x,p.size.y):c&&this.gl.viewport(0,0,c.x,c.y);p?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,p.getFrameBuffer()),this.gl.drawBuffers(p.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);let _=0;v.clearColor&&(this.gl.clearColor(v.clearColor.x,v.clearColor.y,v.clearColor.z,v.clearColor.w),_|=this.gl.COLOR_BUFFER_BIT),v.clearDepth!==null&&(this.gl.clearDepth(v.clearDepth),_|=this.gl.DEPTH_BUFFER_BIT),_!==0&&this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);const w=v.backBufferOverride||u||null;if(w)for(let C=0;C<w.length;C++)v.uniforms["uBackBuffer"+C]={type:"1i",value:w[C]};const T=d&&d.cameraOverride||{};T.label=v.name,T.renderTarget=p,this.draw(v.uuid,"postprocess",this._quad,v,T),v.onAfterRender(),!v.passThrough&&v.renderTarget&&(u=v.renderTarget.textures),this.emit("drawPass",[v.renderTarget,v.name])}}draw(i,o,c,d,u){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:i,renderType:o,geometry:c,material:d,param:{...u}});return}id=0;let x=this.gl.CULL_FACE;const v=this._glStateCahce[x];(v===void 0||v.state!=d.cullFace)&&(d.cullFace?this.gl.enable(x):this.gl.disable(x)),x=this.gl.DEPTH_TEST;const p=this._glStateCahce[x];(p===void 0||p.state!=d.depthTest)&&(d.depthTest?this.gl.enable(x):this.gl.disable(x)),this.gl.depthMask(d.depthWrite);let _=d.programCache[o];if(!_||this._lightsUpdated){const T={...d.defines};o=="deferred"?T.IS_DEFERRED="":o=="forward"||o=="envMap"?T.IS_FORWARD="":o=="shadowMap"&&(T.IS_DEPTH="");const C=Nv(d.vert,T,this._lights),M=Nv(d.frag,T,this._lights);_=this.programManager.get(C,M),d.programCache[o]=_}if(u&&(u.modelMatrixWorld&&(_.setUniform("uModelMatrix","Matrix4fv",u.modelMatrixWorld.elm),_.setUniform("uModelMatrixInverse","Matrix4fv",this._tmpModelMatrixInverse.copy(u.modelMatrixWorld).inverse().elm),u.modelMatrixWorldPrev&&_.setUniform("uModelMatrixPrev","Matrix4fv",u.modelMatrixWorldPrev.elm),u.viewMatrix&&(this._tmpModelViewMatrix.copy(u.modelMatrixWorld).preMultiply(u.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),_.setUniform("uModelViewMatrix","Matrix4fv",this._tmpModelViewMatrix.elm),_.setUniform("uNormalMatrix","Matrix4fv",this._tmpNormalMatrix.elm),_.setUniform("uViewMatrixInverse","Matrix4fv",this._tmpViewMatrixInverseMatrix.copy(u.viewMatrix).inverse().elm))),u.viewMatrix&&(_.setUniform("uViewMatrix","Matrix4fv",u.viewMatrix.elm),u.viewMatrixPrev&&_.setUniform("uViewMatrixPrev","Matrix4fv",u.viewMatrixPrev.elm)),u.projectionMatrix&&(_.setUniform("uProjectionMatrix","Matrix4fv",u.projectionMatrix.elm),_.setUniform("uProjectionMatrixInverse","Matrix4fv",this._tmpProjectionMatrixInverse.copy(u.projectionMatrix).inverse().elm),u.projectionMatrixPrev&&_.setUniform("uProjectionMatrixPrev","Matrix4fv",u.projectionMatrixPrev.elm)),u.cameraMatrixWorld&&(_.setUniform("uCameraMatrix","Matrix4fv",u.cameraMatrixWorld.elm),_.setUniform("uCameraPosition","3f",[u.cameraMatrixWorld.elm[12],u.cameraMatrixWorld.elm[13],u.cameraMatrixWorld.elm[14]])),o!="deferred"&&(u.cameraNear&&_.setUniform("uCameraNear","1f",[u.cameraNear]),u.cameraFar&&_.setUniform("uCameraFar","1f",[u.cameraFar]))),d.useLight&&o!=="deferred"&&o!=="shadowMap"){for(let T=0;T<this._lights.directional.length;T++){const C=this._lights.directional[T];if(_.setUniform("directionalLight["+T+"].direction","3fv",C.direction.getElm("vec3")),_.setUniform("directionalLight["+T+"].color","3fv",C.color.getElm("vec3")),C.component.renderTarget){const M=C.component.renderTarget.textures[0].activate(id++),G=`uDirectionalLightCamera[${T}]`;_.setUniform(G+".near","1fv",[C.component.near]),_.setUniform(G+".far","1fv",[C.component.far]),_.setUniform(G+".viewMatrix","Matrix4fv",C.component.viewMatrix.elm),_.setUniform(G+".projectionMatrix","Matrix4fv",C.component.projectionMatrix.elm),_.setUniform(G+".resolution","2fv",M.size.getElm("vec2")),_.setUniform("directionalLightShadowMap["+T+"]","1i",[M.unit])}}for(let T=0;T<this._lights.spot.length;T++){const C=this._lights.spot[T];u&&u.viewMatrix&&this._tmpLightDirection.copy(C.direction).applyMatrix3(u.viewMatrix);const M=`uSpotLight[${T}]`;if(_.setUniform(M+".position","3fv",C.position.getElm("vec3")),_.setUniform(M+".direction","3fv",C.direction.getElm("vec3")),_.setUniform(M+".color","3fv",C.color.getElm("vec3")),_.setUniform(M+".angle","1fv",[Math.cos(C.component.angle/2)]),_.setUniform(M+".blend","1fv",[C.component.blend]),_.setUniform(M+".distance","1fv",[C.component.distance]),_.setUniform(M+".decay","1fv",[C.component.decay]),C.component.renderTarget){const G=C.component.renderTarget.textures[0].activate(id++),Y=`uSpotLightCamera[${T}]`;_.setUniform(Y+".near","1fv",[C.component.near]),_.setUniform(Y+".far","1fv",[C.component.far]),_.setUniform(Y+".viewMatrix","Matrix4fv",C.component.viewMatrix.elm),_.setUniform(Y+".projectionMatrix","Matrix4fv",C.component.projectionMatrix.elm),_.setUniform(Y+".resolution","2fv",G.size.getElm("vec2")),_.setUniform("spotLightShadowMap["+T+"]","1i",[G.unit])}}}Rk(_,{...d.uniforms,...u&&u.uniformOverride});const w=_.getVAO(i.toString());w&&(c.vaoCache.get(w)||(c.createBuffers(this.gl),c.attributes.forEach((T,C)=>{T.buffer!==void 0&&(C=="index"?w.setIndex(T.buffer):w.setAttribute(C,T.buffer,T.size,T.opt))}),c.vaoCache.set(w,!0)),_.use(T=>{T.uploadUniforms(),this.gl.bindVertexArray(w.getVAO());const C=w.indexBuffer;let M=this.gl.UNSIGNED_SHORT;C&&C.array&&C.array.BYTES_PER_ELEMENT==4&&(M=this.gl.UNSIGNED_INT),d.blending=="NORMAL"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):d.blending=="ADD"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):d.blending=="DIFF"&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);const G=this.gl[d.drawType];let Y=null;if(this._extDisJointTimerQuery&&(Y=this._queryList.pop()||null,Y==null&&(Y=this.gl.createQuery()),Y&&this.gl.beginQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT,Y)),w.instanceCount>0?C?this.gl.drawElementsInstanced(G,w.indexCount,M,0,w.instanceCount):this.gl.drawArraysInstanced(G,0,w.vertCount,w.instanceCount):C?this.gl.drawElements(G,w.indexCount,M,0):this.gl.drawArrays(G,0,w.vertCount),this._extDisJointTimerQuery&&Y){this.gl.endQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT);const H=u&&u.label||"_";this._queryListQueued.push({name:`${o}/${H}/ [${i}]`,query:Y})}this.gl.bindVertexArray(null)}))}resize(i){this.resolution.copy(i),this._deferredRenderer.resize(this.resolution),this._pipelinePostProcess.resize(this.resolution)}async compileShaders(i,o,c){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.render(i,o),this._isCorrentCompiles=!1;const d=this.compileDrawParams.length;let u=0;for(let x=0;x<this.compileDrawParams.length;x++){const v=this.compileDrawParams[x],p=v.param.renderTarget;if(p?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,p.getFrameBuffer()),this.gl.drawBuffers(p.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.draw(v.drawId,v.renderType,v.geometry,v.material,v.param),await new Promise(_=>{setTimeout(()=>{_(null)},10)}),c){u++;const _=v.param&&v.param.label||"-",w=`${v.renderType}/${_}/[${v.drawId}]`;c(w,u,d)}}}}const Rk=(h,l)=>{const i=Object.keys(l);for(let o=0;o<i.length;o++){const c=i[o],d=l[c];if(!d)continue;const u=d.type,x=d.value,v=[],p=_=>{_!=null&&(typeof _=="number"||typeof _=="boolean"?v.push(_):"isVector"in _?v.push(..._.getElm("vec"+u.charAt(0))):"isTexture"in _?(_.activate(id++),v.push(_.unit)):v.push(..._.elm))};if(Array.isArray(x))for(let _=0;_<x.length;_++)p(x[_]);else p(x);v.length>0&&h.setUniform(c,u,v)}};function _k(h){return h.byteLength%32===0}const Zb=new Map,Fr=(h,l)=>{const i=Zb.get(h);return i||(Zb.set(h,l),l)};class Av extends xn{constructor(i){super(i);b(this,"gaussianPositions");b(this,"numPoints");b(this,"material");b(this,"sortWorker",null);b(this,"isSorting",!1);b(this,"oldDirection",new ee(0,0,0));b(this,"frameIdLastUpdate",-1);const o=i.args;this.gaussianPositions=o.gaussianPositions,this.numPoints=o.numPoints,this.material=o.material,this._tag="3dgs-controller",this.initWorker()}initWorker(){try{this.sortWorker=new Worker(new URL("/OREngine/develop/assets/sortWorker-CntJUXzs.js",import.meta.url),{type:"module"}),this.sortWorker.onmessage=i=>{this.handleWorkerMessage(i.data)},this.sortWorker.onerror=i=>{console.error("Sort Worker Error:",i),this.isSorting=!1}}catch(i){console.warn("WebWorker not supported, falling back to main thread sorting:",i),this.sortWorker=null}}handleWorkerMessage(i){i.type==="sorted"&&(this.applySortedIndices(i.sortedIndices),this.isSorting=!1)}applySortedIndices(i){const{width:o,height:c}=this.calculateTextureSize(),d=new Float32Array(o*c*4);d.fill(0);for(let v=0;v<this.numPoints;v++)d[v*4]=i[v];const u=this.material.uniforms.uSortTex.value,x={width:o,height:c,data:d};u.attach(x)}findCamera(){const o=this.entity.getRootEntity().findEntityByName("Camera");if(o){const c=o.getComponentByTag("camera");if(c)return c}return null}calculateTextureSize(){const i=Math.pow(2,Math.ceil(Math.log2(Math.sqrt(this.numPoints)))),o=Math.pow(2,Math.ceil(Math.log2(this.numPoints/i)));return{width:i,height:o}}updateSort(){const i=this.findCamera();if(!i)return;const o=Date.now(),c=i.viewMatrix,d=new ee(c.elm[2],c.elm[6],c.elm[10]).normalize(),u=d.dot(this.oldDirection);if(!(o!==this.frameIdLastUpdate&&Math.abs(u-1)>=.01)&&!this.isSorting||this.isSorting||(this.isSorting=!0,this.frameIdLastUpdate=o,this.oldDirection.copy(d),!this.sortWorker))return;const v=Array.from(i.viewMatrix.elm),p={type:"sort",gaussianPositions:this.gaussianPositions,numPoints:this.numPoints,viewMatrix:v};this.sortWorker.postMessage(p)}update(i){super.update(i);const o=this.findCamera();if(!o)return;const c=o.projectionMatrix,d=i.resolution.x,u=i.resolution.y,x=c.elm[0]*d/2,v=c.elm[5]*u/2;this.material.uniforms.uFocal.value.set(x,v),this.material.uniforms.uViewport.value.copy(i.resolution),this.updateSort()}dispose(){this.sortWorker&&(this.sortWorker.terminate(),this.sortWorker=null),super.dispose()}}function Sk(h){return(Math.pow(h+1,2)-1)*3}const Ck=`#include <common>\r
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
}`,wk=`#include <common>
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
	
}`;function Tk(h,l,i,o){const c=new Br,d=new zv({width:4,height:4,widthSegments:1,heightSegments:1}),u=l.positions.length/3,x=new Float32Array(u);for(let ie=0;ie<u;ie++)x[ie]=ie;d.setAttribute("instanceId",x,1,{instanceDivisor:1});const v=Math.pow(2,Math.ceil(Math.log2(Math.sqrt(u)))),p=Math.pow(2,Math.ceil(Math.log2(u/v))),_=new Float32Array(v*p*4);_.fill(0);const w=new Float32Array(v*p*4);w.fill(0);const T=new Float32Array(v*p*4);T.fill(0);const C=new Float32Array(v*p*4);C.fill(0);const M=new Float32Array(v*p*4);M.fill(0);for(let ie=0;ie<u;ie++){const K=ie*4;_[K+0]=l.positions[ie*3+0],_[K+1]=l.positions[ie*3+1],_[K+2]=l.positions[ie*3+2],_[K+3]=0,w[K+0]=l.colors[ie*3+0],w[K+1]=l.colors[ie*3+1],w[K+2]=l.colors[ie*3+2],w[K+3]=l.alphas[ie];const pe=[l.rotations[ie*4+0],l.rotations[ie*4+1],l.rotations[ie*4+2],-l.rotations[ie*4+3]],Fe=[l.scales[ie*3+0],l.scales[ie*3+1],l.scales[ie*3+2]],se=new Fa(pe[0],pe[1],pe[2],pe[3]),ge=new st().identity().applyQuaternion(se),Ee=new st().applyScale(new ee(Fe[0],Fe[1],Fe[2]).multiply(2)),le=ge.preMultiply(Ee).elm,ne=[];ne[0]=le[0]*le[0]+le[1]*le[1]+le[2]*le[2],ne[1]=le[0]*le[4]+le[1]*le[5]+le[2]*le[6],ne[2]=le[0]*le[8]+le[1]*le[9]+le[2]*le[10],ne[3]=le[4]*le[4]+le[5]*le[5]+le[6]*le[6],ne[4]=le[4]*le[8]+le[5]*le[9]+le[6]*le[10],ne[5]=le[8]*le[8]+le[9]*le[9]+le[10]*le[10];let Xe=-1e4;for(let Tt=0;Tt<6;Tt++)Xe=Math.max(Xe,Math.abs(ne[Tt]));_[K+3]=Xe,C[K+0]=ne[0]/Xe,C[K+1]=ne[1]/Xe,C[K+2]=ne[2]/Xe,C[K+3]=0,M[K+0]=ne[3]/Xe,M[K+1]=ne[4]/Xe,M[K+2]=ne[5]/Xe,M[K+3]=0}const G=new ze(h);G.setting({type:h.FLOAT,internalFormat:h.RGBA32F,format:h.RGBA,magFilter:h.NEAREST,minFilter:h.NEAREST}),G.attach({width:v,height:p,data:_});const Y=new ze(h);Y.setting({type:h.FLOAT,internalFormat:h.RGBA32F,format:h.RGBA,magFilter:h.NEAREST,minFilter:h.NEAREST}),Y.attach({width:v,height:p,data:w});const H=new ze(h);H.setting({type:h.FLOAT,internalFormat:h.RGBA32F,format:h.RGBA,magFilter:h.NEAREST,minFilter:h.NEAREST}),H.attach({width:v,height:p,data:T});const O=new ze(h);O.setting({type:h.FLOAT,internalFormat:h.RGBA32F,format:h.RGBA,magFilter:h.NEAREST,minFilter:h.NEAREST}),O.attach({width:v,height:p,data:C});const $=new ze(h);$.setting({type:h.FLOAT,internalFormat:h.RGBA32F,format:h.RGBA,magFilter:h.NEAREST,minFilter:h.NEAREST}),$.attach({width:v,height:p,data:M});const ae={uPositionTexture:{value:G,type:"1i"},uColorTexture:{value:Y,type:"1i"},uSortTex:{value:H,type:"1i"},uCovariance1Texture:{value:O,type:"1i"},uCovariance2Texture:{value:$,type:"1i"},uDataTexSize:{value:new ee(v,p),type:"2fv"},uInstanceCount:{value:u,type:"1i"},uFocal:{value:new ee(1164.6601287484507,1159.5880733038064),type:"2fv"},uViewport:{value:new ee,type:"2fv"}};if(l.sphericalHarmonics){const ie=i.shDegree,K=Sk(ie),pe=se=>Math.max(0,Math.min(255,Math.round((se+1)*127.5))),Fe=(se,ge,Ee,le)=>{const ne=pe(se),Xe=pe(ge),Tt=pe(Ee);return pe(le)<<24|Tt<<16|Xe<<8|ne};if(ie>0){const se=new Uint32Array(v*p*4);se.fill(0);for(let Ee=0;Ee<u;Ee++){const le=Ee*4,ne=l.sphericalHarmonics[Ee*K+1*3+0],Xe=l.sphericalHarmonics[Ee*K+1*3+1],Tt=l.sphericalHarmonics[Ee*K+1*3+2],Bt=l.sphericalHarmonics[Ee*K+2*3+0],Gt=l.sphericalHarmonics[Ee*K+2*3+1],bt=l.sphericalHarmonics[Ee*K+2*3+2],At=l.sphericalHarmonics[Ee*K+3*3+0],Kt=l.sphericalHarmonics[Ee*K+3*3+1],On=l.sphericalHarmonics[Ee*K+3*3+2];se[le+0]=Fe(ne,Xe,Tt,Bt),se[le+1]=Fe(Gt,bt,At,Kt),se[le+2]=Fe(On,0,0,0),se[le+3]=0}const ge=new ze(h);ge.setting({type:h.UNSIGNED_INT,internalFormat:h.RGBA32UI,format:h.RGBA_INTEGER,magFilter:h.NEAREST,minFilter:h.NEAREST}),ge.attach({width:v,height:p,data:se}),ae.uShTexture0={value:ge,type:"1i"}}if(ie>1){const se=new Uint32Array(v*p*4);se.fill(0);for(let Ee=0;Ee<u;Ee++){const le=Ee*4,ne=l.sphericalHarmonics[Ee*K+4*3+0],Xe=l.sphericalHarmonics[Ee*K+4*3+1],Tt=l.sphericalHarmonics[Ee*K+4*3+2],Bt=l.sphericalHarmonics[Ee*K+5*3+0],Gt=l.sphericalHarmonics[Ee*K+5*3+1],bt=l.sphericalHarmonics[Ee*K+5*3+2],At=l.sphericalHarmonics[Ee*K+6*3+0],Kt=l.sphericalHarmonics[Ee*K+6*3+1],On=l.sphericalHarmonics[Ee*K+6*3+2],jn=l.sphericalHarmonics[Ee*K+7*3+0],Hn=l.sphericalHarmonics[Ee*K+7*3+1],kn=l.sphericalHarmonics[Ee*K+7*3+2],Ut=l.sphericalHarmonics[Ee*K+8*3+0],cn=l.sphericalHarmonics[Ee*K+8*3+1],bn=l.sphericalHarmonics[Ee*K+8*3+2];se[le+0]=Fe(ne,Xe,Tt,Bt),se[le+1]=Fe(Gt,bt,At,Kt),se[le+2]=Fe(On,jn,Hn,kn),se[le+3]=Fe(Ut,cn,bn,0)}const ge=new ze(h);ge.setting({type:h.UNSIGNED_INT,internalFormat:h.RGBA32UI,format:h.RGBA_INTEGER,magFilter:h.NEAREST,minFilter:h.NEAREST}),ge.attach({width:v,height:p,data:se}),ae.uShTexture1={value:ge,type:"1i"}}if(ie>2){const se=new Uint32Array(v*p*4);se.fill(0);for(let Ee=0;Ee<u;Ee++){const le=Ee*4,ne=(fn,Wt)=>{const Pt=Ee*K+fn*3+Wt;return Pt<l.sphericalHarmonics.length?l.sphericalHarmonics[Pt]:0},Xe=ne(9,0),Tt=ne(9,1),Bt=ne(9,2),Gt=ne(10,0),bt=ne(10,1),At=ne(10,2),Kt=ne(11,0),On=ne(11,1),jn=ne(11,2),Hn=ne(12,0),kn=ne(12,1),Ut=ne(12,2),cn=ne(13,0),bn=ne(13,1),Gn=ne(13,2),Mt=ne(14,0);ne(14,1),ne(14,2),ne(15,0),ne(15,1),ne(15,2),se[le+0]=Fe(Xe,Tt,Bt,Gt),se[le+1]=Fe(bt,At,Kt,On),se[le+2]=Fe(jn,Hn,kn,Ut),se[le+3]=Fe(cn,bn,Gn,Mt)}const ge=new ze(h);ge.setting({type:h.UNSIGNED_INT,internalFormat:h.RGBA32UI,format:h.RGBA_INTEGER,magFilter:h.NEAREST,minFilter:h.NEAREST}),ge.attach({width:v,height:p,data:se}),ae.uShTexture2={value:ge,type:"1i"}}}const V=new ta({phase:["forward"],frag:Ck,vert:wk,uniforms:ae,defines:{SH_DEGREE:i.shDegree.toString()},depthTest:!1});i.shDegree>0&&(V.defines.USE_SPHERICAL_HARMONICS="",V.defines.USE_SH_TEXTURE="");const re=c.addComponent(Sr);re.geometry=d,re.material=V;const Q=c.addComponent(Av,{gaussianPositions:l.positions,numPoints:u,material:V});return{scene:c,updateSort:ie=>{Q.updateSort()}}}var Dv=(h=>(h[h.UNSPECIFIED=0]="UNSPECIFIED",h[h.RUB=1]="RUB",h[h.RDF=2]="RDF",h[h.LUF=3]="LUF",h[h.RUF=4]="RUF",h))(Dv||{});class sd extends yn{constructor(i){super();b(this,"gl");b(this,"spzWorker",null);b(this,"splatWorker",null);this.gl=i}static detectFormat(i){if(_k(i))return"splat";try{if(new DataView(i).getUint32(0,!0)===559903)return"spz"}catch{}return"unknown"}async load(i,o={}){const c={sourceCoordinateSystem:0,targetCoordinateSystem:1,antialias:!0,isCompressed:void 0,...o},u=await(await fetch(i)).arrayBuffer(),x=sd.detectFormat(u);let v,p=null;if(x==="splat"){console.log("3DGSLoader: Splat形式として読み込みます");const w=await this.parseSplatWithWorker(u);v=w.gaussianData,p=w.header}else if(x==="spz"){console.log("3DGSLoader: SPZ形式として読み込みます");const w=await this.parseSPZWithWorker(u,c.isCompressed);v=w.gaussianData,p=w.header}else throw new Error("3DGSLoader: サポートされていないファイル形式です。SplatまたはSPZ形式のファイルを指定してください。");return Tk(this.gl,v,p)}async parseSplatWithWorker(i){return new Promise((o,c)=>{if(!this.splatWorker){const u=new URL("data:video/mp2t;base64,Ly8gU3BsYXTjg5XjgqHjgqTjg6vlsILnlKjjga7jg5Hjg7zjgrfjg7PjgrBXZWJXb3JrZXIKCmltcG9ydCB7IHBhcnNlU3BsYXQsIGNyZWF0ZVNwbGF0RHVtbXlIZWFkZXIgfSBmcm9tICcuLi9wYXJzZXJzL1NwbGF0RGF0YVBhcnNlcic7CmltcG9ydCB7IFNQWkdhdXNzaWFuRGF0YSB9IGZyb20gJy4uL3V0aWxzL0Nvb3JkaW5hdGVTeXN0ZW1Db252ZXJ0ZXInOwoKLy8gU3BsYXTlsILnlKjjg6Hjg4Pjgrvjg7zjgrjjgr/jgqTjg5cKZXhwb3J0IHR5cGUgU3BsYXRXb3JrZXJNZXNzYWdlID0gewoJdHlwZTogJ3BhcnNlJzsKCWRhdGE6IHsKCQlidWZmZXI6IEFycmF5QnVmZmVyOwoJfTsKfTsKCmV4cG9ydCB0eXBlIFNwbGF0V29ya2VyUmVzcG9uc2UgPSB7Cgl0eXBlOiAncmVzdWx0JyB8ICdlcnJvcic7CglkYXRhOiB7CgkJZ2F1c3NpYW5EYXRhPzogU1BaR2F1c3NpYW5EYXRhOwoJCWhlYWRlcj86IGFueTsKCQllcnJvcj86IHN0cmluZzsKCX07Cn07CgooIHNlbGYgYXMgYW55ICkub25tZXNzYWdlID0gYXN5bmMgKCBldmVudDogTWVzc2FnZUV2ZW50PFNwbGF0V29ya2VyTWVzc2FnZT4gKSA9PiB7CgoJY29uc3QgeyB0eXBlLCBkYXRhIH0gPSBldmVudC5kYXRhOwoKCWlmICggdHlwZSA9PT0gJ3BhcnNlJyApIHsKCgkJdHJ5IHsKCgkJCWNvbnNvbGUubG9nKCAnU3BsYXRQYXJzZVdvcmtlcjogU3BsYXTlvaLlvI/jgajjgZfjgabop6PmnpDplovlp4snICk7CgkJCQoJCQljb25zdCB7IGJ1ZmZlciB9ID0gZGF0YTsKCQkJY29uc3QgZ2F1c3NpYW5EYXRhID0gcGFyc2VTcGxhdCggYnVmZmVyICk7CgkJCWNvbnN0IGhlYWRlciA9IGNyZWF0ZVNwbGF0RHVtbXlIZWFkZXIoIGdhdXNzaWFuRGF0YS5wb3NpdGlvbnMubGVuZ3RoIC8gMyApOwoKCQkJLy8g57WQ5p6c44KS6YCB5L+hCgkJCWNvbnN0IHJlc3BvbnNlOiBTcGxhdFdvcmtlclJlc3BvbnNlID0gewoJCQkJdHlwZTogJ3Jlc3VsdCcsCgkJCQlkYXRhOiB7CgkJCQkJZ2F1c3NpYW5EYXRhLAoJCQkJCWhlYWRlcgoJCQkJfQoJCQl9OwoKCQkJKCBzZWxmIGFzIGFueSApLnBvc3RNZXNzYWdlKCByZXNwb25zZSApOwoKCQl9IGNhdGNoICggZXJyb3IgKSB7CgoJCQkvLyDjgqjjg6njg7zjgpLpgIHkv6EKCQkJY29uc3QgcmVzcG9uc2U6IFNwbGF0V29ya2VyUmVzcG9uc2UgPSB7CgkJCQl0eXBlOiAnZXJyb3InLAoJCQkJZGF0YTogewoJCQkJCWVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdTcGxhdCBwYXJzZSBlcnJvcicKCQkJCX0KCQkJfTsKCgkJCSggc2VsZiBhcyBhbnkgKS5wb3N0TWVzc2FnZSggcmVzcG9uc2UgKTsKCgkJfQoKCX0KCn07Cg==",import.meta.url);this.splatWorker=new Worker(u,{type:"module"})}this.splatWorker.onmessage=u=>{const{type:x,data:v}=u.data;x==="result"?o(v):x==="error"&&c(new Error(v.error))},this.splatWorker.onerror=u=>{c(new Error(`SplatWorker error: ${u.message}`))};const d={type:"parse",data:{buffer:i}};this.splatWorker.postMessage(d,[i])})}async parseSPZWithWorker(i,o){return new Promise((c,d)=>{if(!this.spzWorker){const x=new URL("data:video/mp2t;base64,Ly8gU1Ba44OV44Kh44Kk44Or5bCC55So44Gu44OR44O844K344Oz44KwV2ViV29ya2VyCgppbXBvcnQgeyBwYXJzZVNQWiB9IGZyb20gJy4uL3BhcnNlcnMvU1BaRGF0YVBhcnNlcic7CmltcG9ydCB7IFNQWkdhdXNzaWFuRGF0YSB9IGZyb20gJy4uL3V0aWxzL0Nvb3JkaW5hdGVTeXN0ZW1Db252ZXJ0ZXInOwoKLy8gU1Ba5bCC55So44Oh44OD44K744O844K444K/44Kk44OXCmV4cG9ydCB0eXBlIFNQWldvcmtlck1lc3NhZ2UgPSB7Cgl0eXBlOiAncGFyc2UnOwoJZGF0YTogewoJCWJ1ZmZlcjogQXJyYXlCdWZmZXI7CgkJaXNDb21wcmVzc2VkPzogYm9vbGVhbjsKCX07Cn07CgpleHBvcnQgdHlwZSBTUFpXb3JrZXJSZXNwb25zZSA9IHsKCXR5cGU6ICdyZXN1bHQnIHwgJ2Vycm9yJzsKCWRhdGE6IHsKCQlnYXVzc2lhbkRhdGE/OiBTUFpHYXVzc2lhbkRhdGE7CgkJaGVhZGVyPzogYW55OwoJCWVycm9yPzogc3RyaW5nOwoJfTsKfTsKCiggc2VsZiBhcyBhbnkgKS5vbm1lc3NhZ2UgPSBhc3luYyAoIGV2ZW50OiBNZXNzYWdlRXZlbnQ8U1BaV29ya2VyTWVzc2FnZT4gKSA9PiB7CgoJY29uc3QgeyB0eXBlLCBkYXRhIH0gPSBldmVudC5kYXRhOwoKCWlmICggdHlwZSA9PT0gJ3BhcnNlJyApIHsKCgkJdHJ5IHsKCgkJCWNvbnN0IHsgYnVmZmVyLCBpc0NvbXByZXNzZWQgfSA9IGRhdGE7CgkJCWNvbnN0IHJlc3VsdCA9IGF3YWl0IHBhcnNlU1BaKCBidWZmZXIsIGlzQ29tcHJlc3NlZCApOwoKCQkJLy8g57WQ5p6c44KS6YCB5L+hCgkJCWNvbnN0IHJlc3BvbnNlOiBTUFpXb3JrZXJSZXNwb25zZSA9IHsKCQkJCXR5cGU6ICdyZXN1bHQnLAoJCQkJZGF0YTogewoJCQkJCWdhdXNzaWFuRGF0YTogcmVzdWx0LmdhdXNzaWFuRGF0YSwKCQkJCQloZWFkZXI6IHJlc3VsdC5oZWFkZXIKCQkJCX0KCQkJfTsKCgkJCSggc2VsZiBhcyBhbnkgKS5wb3N0TWVzc2FnZSggcmVzcG9uc2UgKTsKCgkJfSBjYXRjaCAoIGVycm9yICkgewoKCQkJLy8g44Ko44Op44O844KS6YCB5L+hCgkJCWNvbnN0IHJlc3BvbnNlOiBTUFpXb3JrZXJSZXNwb25zZSA9IHsKCQkJCXR5cGU6ICdlcnJvcicsCgkJCQlkYXRhOiB7CgkJCQkJZXJyb3I6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1NQWiBwYXJzZSBlcnJvcicKCQkJCX0KCQkJfTsKCgkJCSggc2VsZiBhcyBhbnkgKS5wb3N0TWVzc2FnZSggcmVzcG9uc2UgKTsKCgkJfQoKCX0KCn07Cg==",import.meta.url);this.spzWorker=new Worker(x,{type:"module"})}this.spzWorker.onmessage=x=>{const{type:v,data:p}=x.data;v==="result"?c(p):v==="error"&&d(new Error(p.error))},this.spzWorker.onerror=x=>{d(new Error(`SPZWorker error: ${x.message}`))};const u={type:"parse",data:{buffer:i,isCompressed:o}};this.spzWorker.postMessage(u,[i])})}terminate(){this.splatWorker&&(this.splatWorker.terminate(),this.splatWorker=null),this.spzWorker&&(this.spzWorker.terminate(),this.spzWorker=null)}}class Tu{static serializeEntity(l){const i=o=>{const c=[];return o.children.forEach(d=>{d.initiator!="script"&&c.push(i(d))}),{name:o.name,pos:o.position.x==0&&o.position.y==0&&o.position.z==0?void 0:o.position.getElm("vec3"),rot:o.euler.x==0&&o.euler.y==0&&o.euler.z==0?void 0:o.euler.getElm("vec3"),scale:o.scale.x==1&&o.scale.y==1&&o.scale.z==1?void 0:o.scale.getElm("vec3"),childs:c.length>0?c:void 0}};return i(l)}static serializeEntityOverride(l,i){const o=[];return l.traverse(c=>{const u={path:c.getScenePath(l)},x=[];c.components.forEach(v=>{const p=v.serialize({mode:"export"}),_=Object.keys(p).length>0,w={name:i.getName(v)};!_&&v.initiator!=="user"||(_&&(w.props=p),x.push(w))}),x.length>0&&(u.components=x),!(c.initiator!=="user"&&!u.components)&&o.push(u)}),o}static deserializeOverride(l,i,o,c){o.traverse(d=>{const u=d.getScenePath(i),x=l.find(v=>v.path==u);x&&(x.components||[]).forEach(v=>{const p=c.resolve(v.name);if(p){let _=d.getComponent(p.component);_||(_=d.addComponent(p.component),_.initiator="user"),v.props&&_.deserialize(v.props)}})})}static deserializeEntity(l,i){const o=(c,d)=>{const u=d||new Br;u.initiator="user",u.name=c.name;const x=c.pos||[0,0,0];u.position.x=x[0],u.position.y=x[1],u.position.z=x[2];const v=c.rot||[0,0,0];u.euler.x=v[0],u.euler.y=v[1],u.euler.z=v[2];const p=c.scale||[1,1,1];return u.scale.x=p[0],u.scale.y=p[1],u.scale.z=p[2],c.childs&&c.childs.forEach(_=>{u.add(o(_))}),u};l&&o(l,i),i.initiator="god"}}class Nk extends yn{constructor(){super();b(this,"_componentList");b(this,"_componentGroups");b(this,"_textures");this._componentList=[],this._textures=new Map,this._componentGroups=[]}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get textures(){return this._textures}clear(){this._componentList=[],this._componentGroups=[],this._textures.clear()}getComponent(i){return this._componentList.find(o=>o.name==i)}addComponentGroup(i){let o=this._componentGroups.find(d=>d.name==i);if(o)return o;const c=d=>{const u=[];return{child:u,name:d,addComponent:(x,v)=>{const p={name:x,component:v};u.push(p),this._componentList.push(p)},createGroup:x=>{const v=c(x);return u.push(v),v}}};return o=c(i),this._componentGroups.push(o),o}addTexture(i,o){return this._textures.set(i,o),o}getTexture(i){return this._textures.get(i)}}const _o=class _o extends Br{constructor(i){super();b(this,"enableRender");b(this,"_renderer");b(this,"_gl");b(this,"_canvas");b(this,"_projectCache");b(this,"_root");b(this,"_uniforms");b(this,"_time");b(this,"_frame");b(this,"_frameSetting");b(this,"_disposed");_o.instances.set(i,this),this._gl=i,this.name="OREngine",this._disposed=!1,this._uniforms={uTime:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uEnvMapIntensity:{value:1,type:"1f"}},this._canvas=i.canvas,this._renderer=new DE(i),this._projectCache=null,this.on("update/blidge/scene",c=>{this._projectCache&&Tu.deserializeOverride(this._projectCache.overrides,this._root,c,this._createComponentResolver())}),this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this.enableRender=!0,this._root=new Br,this._root.initiator="god",this._root.name="root",this.add(this._root),this.field("name",()=>this.name,c=>this.name=c),this.field("scene",()=>Tu.serializeEntity(this._root),c=>{Tu.deserializeEntity(c,this._root)}),this.field("overrides",()=>Tu.serializeEntityOverride(this._root,this._createComponentResolver()),c=>{Tu.deserializeOverride(c,this._root,this._root,this._createComponentResolver())});const o=this.fieldDir("timeline");o.field("duration",()=>this._frameSetting.duration,c=>this._frameSetting.duration=c),o.field("fps",()=>this._frameSetting.fps,c=>this._frameSetting.fps=c)}static getInstance(i){const o=this.instances.get(i);if(!o)throw new Error("ERROR: NO ENGINE INSTANCE!!!");return o}get gl(){return this._gl}get canvas(){return this._canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}get disposed(){return this._disposed}_createComponentResolver(){return{resolve:i=>_o.resources.getComponent(i),getName:i=>{const o=_o.resources.componentList.find(c=>i instanceof c.component);return o?o.name:i.constructor.name}}}init(){this._root.remove(this._renderer),this._root.disposeRecursive(),this._root.add(this._renderer),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.add(this._root),this.name="New Project"}async load(i){this.init(),this.deserialize(i),this._projectCache=i||null,this.emit("update/graph"),this.emit("loaded")}update(i){const o=new Date().getTime();this._time.delta=(o-this._time.current)/1e3,this._time.current=o,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*(this._frame.playing?1:0),this._frame.current=this._time.code*60;const c=this.createEntityUpdateEvent({forceDraw:i==null?void 0:i.forceDraw});return this._uniforms.uTime.value=this._time.code,this._uniforms.uTimeE.value=this._time.engine,this._root.update(c),this.enableRender&&this._renderer.render(this._root,c),this._frame.playing&&this.emit("update/frame/play",[this._frame]),this._time.delta}createEntityUpdateEvent(i){const o={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return i?{...o,...i}:o}setSize(i){this._renderer.resize(i),this._canvas.width=i.x,this._canvas.height=i.y}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(i){this._time.code=i/60,this._frame.current=i,this.emit("update/frame/play",[this._frame])}compileShaders(i){const o=this.createEntityUpdateEvent({forceDraw:!0});return this.renderer.compileShaders(this._root,o,i)}dispose(){super.dispose(),this._disposed=!0,this._root.remove(this._renderer),this._root.disposeRecursive()}};b(_o,"resources"),b(_o,"instances");let Dn=_o;Dn.resources=new Nk;Dn.instances=new Map;const Ak=()=>X.useContext(yE),Dk="_compoAdd_5919t_45",Ok="_directory_5919t_49",kk="_subDirectory_5919t_70",Mk="_picker_5919t_116",ld={compoAdd:Dk,directory:Ok,subDirectory:kk,picker:Mk},OE=({group:h,onClickAdd:l})=>{const i=Ak(),[o,c]=X.useState(!1);let d=null,u,x="dir";return h.name.startsWith("_")?null:("child"in h?d=E.jsxDEV(E.Fragment,{children:h.child.map((v,p)=>E.jsxDEV(OE,{group:v,onClickAdd:l},p,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:40,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:37,columnNumber:15},void 0):(u=()=>l(h),x="item"),E.jsxDEV("div",{className:ld.directory,onPointerEnter:()=>c(!0),onPointerLeave:()=>c(!1),onClick:u,"data-type":x,"data-direction":i==null?void 0:i.direction,children:[h.name,o&&E.jsxDEV("div",{className:ld.subDirectory,children:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:61,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:52,columnNumber:9},void 0))},Pk=h=>{const{pushContent:l,closeAll:i}=kv(),o=Dn.resources,c=X.useCallback(d=>{if(!o||!l||!i)return;const u=[],x=v=>{h.entity.addComponent(v.component).initiator="user",i()};o.componentGroups.forEach((v,p)=>{u.push(E.jsxDEV(OE,{group:v,onClickAdd:x},p,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:91,columnNumber:5},void 0))}),l(E.jsxDEV("div",{className:ld.picker,children:u},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:98,columnNumber:4},void 0))},[l,o,h.entity,i]);return E.jsxDEV("div",{className:ld.compAdd,children:E.jsxDEV(As,{onClick:c,children:"Add Component"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:107,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:106,columnNumber:9},void 0)},Lk="_cross_nfbq8_45",zk={cross:Lk},Fk=()=>E.jsxDEV("div",{className:zk.cross,children:E.jsxDEV("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("rect",{x:"5.12",y:"16.832",width:"2.57272",height:"17.6514",transform:"rotate(-135 5.12 16.832)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),E.jsxDEV("rect",{x:"3.30078",y:"4.35059",width:"2.57272",height:"17.6514",transform:"rotate(-45 3.30078 4.35059)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:8,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),Bk="_compoView_xyl36_45",Uk="_head_xyl36_52",Vk="_name_xyl36_58",Ik="_check_xyl36_62",jk="_propertyBlock_xyl36_76",Nu={compoView:Bk,head:Uk,name:Vk,check:Ik,delete:"_delete_xyl36_66",propertyBlock:jk},Hk=({component:h})=>{Ht(h,"enabled");const l=h.initiator!=="user",i=X.useCallback(c=>{c.stopPropagation();const d=h.entity;d&&d.removeComponentByUUID(h.uuid)},[h]),o=E.jsxDEV("div",{className:Nu.head,children:[E.jsxDEV("div",{className:Nu.name,children:h.constructor.name},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:40,columnNumber:3},void 0),E.jsxDEV("div",{className:Nu.delete,children:E.jsxDEV("button",{onClick:i,children:E.jsxDEV(Fk,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:44,columnNumber:36},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:44,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:43,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:36,columnNumber:19},void 0);return E.jsxDEV("div",{className:Nu.compoView,"data-disable_component":l,children:E.jsxDEV("div",{className:Nu.content,children:E.jsxDEV(Ns,{label:o,accordion:!0,bg:!0,defaultClose:!1,children:E.jsxDEV(CE,{target:h},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:51,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:50,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:49,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:48,columnNumber:9},void 0)},Gk="_container_18572_1",Wk={container:Gk},Xk=({entity:h})=>{const[l]=Ht(h,"components"),i=X.useMemo(()=>{const o=[];return l?(l.forEach(c=>{const d=h.getComponentByUUID(c);d&&o.push(E.jsxDEV(Hk,{component:d},d.uuid,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentList/index.tsx",lineNumber:31,columnNumber:5},void 0))}),o):null},[l,h]);return E.jsxDEV("div",{className:Wk.container,children:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentList/index.tsx",lineNumber:40,columnNumber:9},void 0)},Yk="_property_5puun_45",$k="_content_5puun_50",qk="_name_5puun_54",Qk="_component_controls_5puun_60",Kk={property:Yk,content:$k,name:qk,component_controls:Qk},Jb=()=>{const{editor:h,engine:l}=za(),[i]=Ht(h,"selectedEntityId"),o=X.useMemo(()=>{if(i)return l.findEntityByUUID(i)},[l,i]);return o?E.jsxDEV("div",{className:Kk.container,children:[E.jsxDEV(Ns,{label:"Fields",accordion:!0,children:E.jsxDEV(CE,{target:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:41,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:40,columnNumber:3},void 0),E.jsxDEV(Ns,{label:"Components",accordion:!0,children:[E.jsxDEV(Xk,{entity:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:44,columnNumber:4},void 0),E.jsxDEV(Pk,{entity:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:45,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:43,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:39,columnNumber:9},void 0):null},kE=X.createContext(null),ME=()=>{const h=X.useContext(kE);if(h===null)throw new Error("useOREngine must be used within a OREngineProvider");return h},Zk="_container_q8d38_45",eE={container:Zk},tE=()=>{const{engine:h}=ME(),l=X.useRef(null);return X.useEffect(()=>{const i=h.renderer;let o=[];const c=u=>{o=u};i.on("timer",c);const d=window.setInterval(()=>{if(l.current===null)return;const u=l.current;u.innerHTML="";let x="";const v=o.reduce((_,w)=>_+w.duration,0);x+=`Total: ${(v.toPrecision(3)+"000").slice(0,4)} ms<br/>`;const p=o.sort((_,w)=>_.name<w.name?1:-1);for(let _=0;_<p.length;_++){const w=p[_],T=(w.duration.toPrecision(3)+"000").slice(0,5),C=`rgb(200 ${(1-w.duration)*200} ${(1-w.duration)*200})`;x+=`<span style="color: ${C}">${T}</span> : 		${w.name}<br/>`}u.innerHTML=x},500);return()=>{i.off("timer",c),window.clearInterval(d)}},[h]),E.jsxDEV("div",{className:eE.container,children:E.jsxDEV("div",{className:eE.inner,ref:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/GPUTimer/index.tsx",lineNumber:70,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/GPUTimer/index.tsx",lineNumber:69,columnNumber:9},void 0)},Jk="_group_vm37a_45",eM="_submit_vm37a_51",nE={group:Jk,submit:eM},tM=h=>{const l=h.initialValues,i=[],[o,c]=X.useState(l);X.useEffect(()=>{c(l)},[l]);const d=Object.keys(o);for(let x=0;x<d.length;x++){const v=d[x],p=o[v];i.push(E.jsxDEV(Si,{label:v,value:p,onChange:_=>{c({...o,[v]:_})}},x,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:34,columnNumber:18},void 0))}const u=X.useRef(null);return X.useEffect(()=>{setTimeout(()=>{var x;u.current&&((x=u.current.querySelector("input"))==null||x.focus())},0)},[]),E.jsxDEV("div",{className:nE.group,ref:u,children:E.jsxDEV("form",{onSubmit:x=>{x.preventDefault()},children:[E.jsxDEV(Ns,{label:h.title,noMargin:!0,children:i},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:68,columnNumber:4},void 0),E.jsxDEV("div",{className:nE.submit,children:E.jsxDEV(As,{type:"submit",onClick:()=>{h.onSubmit&&h.onSubmit(o)},children:"OK"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:72,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:71,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:63,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:62,columnNumber:9},void 0)},nM="_picker_lpoad_45",rM="_picker_label_lpoad_58",iM="_picker_list_lpoad_63",aM="_picker_list_inner_lpoad_68",oM="_item_lpoad_76",Au={picker:nM,picker_label:rM,picker_list:iM,picker_list_inner:aM,item:oM},sM=h=>E.jsxDEV("div",{className:Au.picker,"data-no_bg":h.noBg,children:[h.label&&E.jsxDEV("div",{className:Au.picker_label,children:h.label},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:18,columnNumber:19},void 0),E.jsxDEV("div",{className:Au.picker_list,children:E.jsxDEV("div",{className:Au.picker_list_inner,children:h.list.map((l,i)=>E.jsxDEV("div",{className:Au.item,onClick:l.onClick,children:l.label},i,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:25,columnNumber:14},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:20,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:16,columnNumber:9},void 0),lM="_node_dzvso_45",uM="_self_dzvso_54",cM="_self_name_dzvso_65",fM="_fold_dzvso_76",dM="_fold_button_dzvso_79",hM="_child_dzvso_92",mM="_child_line_dzvso_95",Ro={node:lM,self:uM,self_name:cM,fold:fM,fold_button:dM,child:hM,child_line:mM},PE=h=>{const{editor:l,engine:i}=za(),[o]=Ht(l,"selectedEntityId"),c=o!==void 0&&i.findEntityByUUID(o),[d]=Ht(h.entity,"children"),u=(d||[]).map($=>i.findEntityByUUID($)).filter($=>$!==void 0),x=h.depth||0,v=u&&u.concat().sort(($,ae)=>$.name.localeCompare(ae.name))||[],p=v.length>0,_=x*20,w=h.entity.initiator=="script",[T,C]=X.useState(!0),M=X.useCallback($=>{C(!T),$.stopPropagation()},[T]),G=X.useCallback(()=>{l&&l.selectEntity(h.entity)},[l,h.entity]),{pushContent:Y,closeAll:H}=kv(),O=X.useCallback($=>{$.preventDefault(),!(!l||!Y||!H||w)&&(l.selectEntity(h.entity),Y(E.jsxDEV(sM,{label:h.entity.name,list:[{label:"Add Entity",onClick:()=>{Y(E.jsxDEV(tM,{initialValues:{name:""},onSubmit:ae=>{const V=l.createEntity(h.entity,ae.name);l.selectEntity(V),H()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:75,columnNumber:7},void 0))}},{label:"Delete Entity",onClick:()=>{l.deleteEntity(h.entity),H()}}]},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:69,columnNumber:16},void 0)))},[l,h.entity,Y,H,w]);return E.jsxDEV("div",{className:Ro.node,"data-no_export":w,children:[E.jsxDEV("div",{className:Ro.self,style:{paddingLeft:_},onClick:G,onContextMenu:O,"data-selected":c&&c.uuid==h.entity.uuid,children:[E.jsxDEV("div",{className:Ro.fold,"data-hnode_open":T,children:p&&E.jsxDEV("button",{className:Ro.fold_button,onClick:M,children:E.jsxDEV(Ov,{open:T},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:106,columnNumber:87},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:106,columnNumber:18},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:105,columnNumber:4},void 0),E.jsxDEV("div",{className:Ro.self_name,children:E.jsxDEV("p",{children:[h.entity.name||"-"," ",E.jsxDEV("span",{children:["[",h.entity.uuid,"]"]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:109,columnNumber:35},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:109,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:108,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:104,columnNumber:3},void 0),p&&E.jsxDEV("div",{className:Ro.child,"data-open":T,children:[v.map($=>E.jsxDEV(PE,{entity:$,depth:x+1},$.uuid,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:116,columnNumber:13},void 0)),E.jsxDEV("div",{className:Ro.child_line,style:{marginLeft:_+4}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:120,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:112,columnNumber:16},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:103,columnNumber:9},void 0)},pM={},rE=()=>{const{editor:h}=za(),l=h.engine._root;return E.jsxDEV("div",{className:pM.hierarchy,children:l&&E.jsxDEV(PE,{entity:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/index.tsx",lineNumber:14,columnNumber:18},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/index.tsx",lineNumber:13,columnNumber:9},void 0)},vM="_container_iunxa_1",gM="_row_iunxa_11",Ri={container:vM,row:gM},yM=new ee,ot=new yn,Jn=[];for(let h=0;h<8;h++)Jn.push({values:new ee,btn1:0,btn2:0,valuesLerped:new ee,btn1Lerped:0,btn2Lerped:0});const qt={btn1:0,btn2:0,btn3:0,btn1Lerped:0,btn2Lerped:0,btn3Lerped:0,master:0,masterLerped:0};class be extends xn{constructor(i){super(i);b(this,"input");b(this,"output");this.input=null,this.output=null;const o=()=>{this._disposed||navigator.requestMIDIAccess().then(u=>{this._disposed||(u.inputs.forEach(x=>{x.name=="MIDI Mix"&&(this.input=x)}),this.input&&(this.input.onmidimessage=this.onMidiMessage.bind(this)),u.outputs.forEach(x=>{x.name=="MIDI Mix"&&(this.output=x)}),this.updateLight())}).catch(u=>{console.error(u)})},c=()=>{this.output&&this.output.close(),this.input&&(this.input.onmidimessage=null,this.input.close())};setTimeout(()=>{o()},100),this.field("reconnect",()=>()=>{c(),o()},void 0,{label:"Reconnect"});const d=(u,x,v)=>{this.onControl(u,x,v)};ot.on("emulateControl",d),this.restore(),this.once("dispose",()=>{c(),ot.off("emulateControl",d)})}static get lines(){return Jn}static get side(){return qt}static getLine(i){return Jn[i]}static emulateControl(i,o,c){ot.emit("emulateControl",[i,o,c])}static on(i,o){ot.on(i,o)}static off(i,o){ot.off(i,o)}onControl(i,o,c){if(i==176&&(16<=o&&o<=31||46<=o&&o<=61)){46<=o&&(o-=14);const d=Math.floor((o-16)/4),u=Jn[d].values,x=o%4;x==0?u.x=c:x==1?u.y=c:x==2?u.z=c:u.w=c,ot.emit("value",[be]),ot.emit(`value/${d+1}`,[Jn[d]]),ot.emit(`value/${d+1}/${x}`,[c])}if(i==176&&o==62&&(qt.master=c,ot.emit("value",[be]),ot.emit("value/master",[qt.master])),i==144){const d=Math.floor((o-1)/3);if(d<8){const u=Jn[d],x=(o+2)%3==0?1:2;x==1?u.btn1=1-u.btn1:x==2&&(u.btn2=1-u.btn2),ot.emit("btn",[be]),ot.emit(`btn/${d+1}`,[Jn[d]]),ot.emit(`btn/${d+1}/${x}`,[x==1?u.btn1:u.btn2])}if(d==8){const u=qt;let x=0,v=0;o==25?(u.btn1=1-u.btn1,v=u.btn1,x=1):o==26?(u.btn2=1-u.btn2,v=u.btn2,x=2):o==27&&(u.btn3=1-u.btn3,v=u.btn3,x=3),ot.emit("btn",[be]),ot.emit("btn/side",[qt]),ot.emit(`btn/side/${x}`,[v])}this.updateLight()}this.save()}onMidiMessage(i){if(!i.data)return;const o=i.data[0],c=i.data[1],d=i.data[2]/127;this.onControl(o,c,d)}updateLight(){if(!this.output)return;for(let o=0;o<8;o++){const c=Jn[o];this.output.send([144,1+o*3,c.btn1*127]),this.output.send([144,3+o*3,c.btn2*127])}const i=qt;this.output.send([144,25,i.btn1*127])}updateImpl(i){for(let T=0;T<8;T++){const C=Jn[T],M=C.values,G=C.valuesLerped;G.add(yM.copy(M).sub(G).multiply(i.timeDelta*4));const Y=C.btn1,H=C.btn1Lerped;C.btn1Lerped+=(Y-H)*i.timeDelta*4;const O=C.btn2,$=C.btn2Lerped;C.btn2Lerped+=(O-$)*i.timeDelta*4}const o=qt,c=o.master,d=o.masterLerped;o.masterLerped+=(c-d)*i.timeDelta*4;const u=o.btn1,x=o.btn1Lerped;o.btn1Lerped+=(u-x)*i.timeDelta*4;const v=o.btn2,p=o.btn2Lerped;o.btn2Lerped+=(v-p)*i.timeDelta*4;const _=o.btn3,w=o.btn3Lerped;o.btn3Lerped+=(_-w)*i.timeDelta*4}save(){const i={lines:Jn.map(o=>[o.values.getElm("vec4"),o.btn1,o.btn2]),side:[qt.btn1,qt.btn2,qt.btn3,qt.master]};localStorage.setItem("MIDIMIX",JSON.stringify(i))}restore(){let i=localStorage.getItem("MIDIMIX");if(i){const o=JSON.parse(i);o.lines.forEach((d,u)=>{Jn[u].values.setFromArray(d[0]),Jn[u].btn1=d[1],Jn[u].btn2=d[2],ot.emit(`value/${u+1}`,[Jn[u]]),ot.emit(`value/${u+1}/x`,[d[0][0]]),ot.emit(`value/${u+1}/y`,[d[0][1]]),ot.emit(`value/${u+1}/z`,[d[0][2]]),ot.emit(`value/${u+1}/w`,[d[0][3]]),ot.emit(`btn/${u+u}}`,[Jn[u]]),ot.emit(`btn/${u+u}}/1`,[d.btn1]),ot.emit(`btn/${u+u}}/2`,[d.btn2])});const c=o.side;qt.btn1=c[0],qt.btn2=c[1],qt.btn3=c[2],ot.emit("btn/side/1",[qt.btn1]),ot.emit("btn/side/2",[qt.btn2]),ot.emit("btn/side/3",[qt.btn3]),qt.master=c[3],ot.emit("value/master",[qt.master]),ot.emit("value",[be]),ot.emit("btn",[be]),ot.emit("btn/side",[qt])}this.updateLight()}}const un=h=>E.jsxDEV(RE,{checked:h.value>.5,onChange:l=>{be.emulateControl(144,h.id,l?1:0)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:13,columnNumber:9},void 0),it=h=>E.jsxDEV(Pv,{step:.05,value:h.value,onChange:l=>{be.emulateControl(176,h.id,Math.min(1,Math.max(0,l)))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:23,columnNumber:9},void 0),iE=()=>{const[h,l]=ku.useState(0);return X.useEffect(()=>{const i=()=>{l(o=>o+1)};return be.on("value",i),be.on("btn",i),()=>{be.off("value",i),be.off("btn",i)}},[]),E.jsxDEV("div",{className:Ri.container,children:[E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:16,value:be.getLine(0).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:58,columnNumber:4},void 0),E.jsxDEV(it,{id:17,value:be.getLine(0).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:59,columnNumber:4},void 0),E.jsxDEV(it,{id:18,value:be.getLine(0).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:60,columnNumber:4},void 0),E.jsxDEV(un,{id:1,value:be.getLine(0).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:61,columnNumber:4},void 0),E.jsxDEV(un,{id:2,value:be.getLine(0).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:62,columnNumber:4},void 0),E.jsxDEV(it,{id:19,value:be.getLine(0).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:63,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:57,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:20,value:be.getLine(1).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:66,columnNumber:4},void 0),E.jsxDEV(it,{id:21,value:be.getLine(1).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:67,columnNumber:4},void 0),E.jsxDEV(it,{id:22,value:be.getLine(1).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:68,columnNumber:4},void 0),E.jsxDEV(un,{id:4,value:be.getLine(1).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:69,columnNumber:4},void 0),E.jsxDEV(un,{id:5,value:be.getLine(1).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:70,columnNumber:4},void 0),E.jsxDEV(it,{id:23,value:be.getLine(1).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:71,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:65,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:24,value:be.getLine(2).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:74,columnNumber:4},void 0),E.jsxDEV(it,{id:25,value:be.getLine(2).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:75,columnNumber:4},void 0),E.jsxDEV(it,{id:26,value:be.getLine(2).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:76,columnNumber:4},void 0),E.jsxDEV(un,{id:7,value:be.getLine(2).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:77,columnNumber:4},void 0),E.jsxDEV(un,{id:8,value:be.getLine(2).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:78,columnNumber:4},void 0),E.jsxDEV(it,{id:27,value:be.getLine(2).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:79,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:73,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:28,value:be.getLine(3).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:82,columnNumber:4},void 0),E.jsxDEV(it,{id:29,value:be.getLine(3).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:83,columnNumber:4},void 0),E.jsxDEV(it,{id:30,value:be.getLine(3).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:84,columnNumber:4},void 0),E.jsxDEV(un,{id:10,value:be.getLine(3).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:85,columnNumber:4},void 0),E.jsxDEV(un,{id:11,value:be.getLine(3).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:86,columnNumber:4},void 0),E.jsxDEV(it,{id:31,value:be.getLine(3).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:87,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:81,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:46,value:be.getLine(4).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:90,columnNumber:4},void 0),E.jsxDEV(it,{id:47,value:be.getLine(4).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:91,columnNumber:4},void 0),E.jsxDEV(it,{id:48,value:be.getLine(4).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:92,columnNumber:4},void 0),E.jsxDEV(un,{id:13,value:be.getLine(4).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:93,columnNumber:4},void 0),E.jsxDEV(un,{id:14,value:be.getLine(4).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:94,columnNumber:4},void 0),E.jsxDEV(it,{id:49,value:be.getLine(4).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:95,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:89,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:50,value:be.getLine(5).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:98,columnNumber:4},void 0),E.jsxDEV(it,{id:51,value:be.getLine(5).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:99,columnNumber:4},void 0),E.jsxDEV(it,{id:52,value:be.getLine(5).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:100,columnNumber:4},void 0),E.jsxDEV(un,{id:16,value:be.getLine(5).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:101,columnNumber:4},void 0),E.jsxDEV(un,{id:17,value:be.getLine(5).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:102,columnNumber:4},void 0),E.jsxDEV(it,{id:53,value:be.getLine(5).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:103,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:97,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:54,value:be.getLine(6).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:106,columnNumber:4},void 0),E.jsxDEV(it,{id:55,value:be.getLine(6).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:107,columnNumber:4},void 0),E.jsxDEV(it,{id:56,value:be.getLine(6).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:108,columnNumber:4},void 0),E.jsxDEV(un,{id:19,value:be.getLine(6).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:109,columnNumber:4},void 0),E.jsxDEV(un,{id:20,value:be.getLine(6).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:110,columnNumber:4},void 0),E.jsxDEV(it,{id:57,value:be.getLine(6).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:111,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:105,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(it,{id:58,value:be.getLine(7).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:114,columnNumber:4},void 0),E.jsxDEV(it,{id:59,value:be.getLine(7).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:115,columnNumber:4},void 0),E.jsxDEV(it,{id:60,value:be.getLine(7).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:116,columnNumber:4},void 0),E.jsxDEV(un,{id:22,value:be.getLine(7).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:117,columnNumber:4},void 0),E.jsxDEV(un,{id:23,value:be.getLine(7).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:118,columnNumber:4},void 0),E.jsxDEV(it,{id:61,value:be.getLine(7).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:119,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:113,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(un,{id:25,value:be.side.btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:122,columnNumber:4},void 0),E.jsxDEV(un,{id:26,value:be.side.btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:123,columnNumber:4},void 0),E.jsxDEV(un,{id:27,value:be.side.btn3},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:124,columnNumber:4},void 0),E.jsxDEV(it,{id:62,value:be.side.master},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:125,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:121,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:56,columnNumber:9},void 0)},xM="_project_7nnqy_1",bM="_project_inner_7nnqy_5",EM="_projectSelector_7nnqy_9",RM="_row_7nnqy_13",_M="_rowItem_7nnqy_20",Ev={project:xM,project_inner:bM,projectSelector:EM,row:RM,rowItem:_M,export:"_export_7nnqy_30"},aE=()=>{const{editor:h}=za(),[l,i]=Ht(h.engine,"name");return h?E.jsxDEV("div",{className:Ev.project,children:E.jsxDEV("div",{className:Ev.project_inner,children:E.jsxDEV(Ns,{label:"Project",accordion:!0,children:[E.jsxDEV(ai,{title:"Project Name",children:E.jsxDEV(Sv,{value:l||"",onChange:o=>{i(o)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:22,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:21,columnNumber:5},void 0),E.jsxDEV(As,{onClick:()=>{h&&h.save()},children:"Save"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:28,columnNumber:5},void 0),E.jsxDEV("div",{className:Ev.export,children:E.jsxDEV(As,{onClick:()=>{h&&(h.save(),window.open("/player","_blank"))},children:["Play ",E.jsxDEV(Ov,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:48,columnNumber:15},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:37,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:20,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:19,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:18,columnNumber:9},void 0):null},SM="_container_8wzg2_1",CM={container:SM},wM=()=>{const{engine:h}=za(),l=X.useRef(null);return X.useEffect(()=>{const i=l.current;if(!h||!i)return;const o=h.canvas;if(!o){console.error("Canvas element not found in engine");return}return i.appendChild(o),()=>{i.contains(o)&&i.removeChild(o)}},[h]),E.jsxDEV("div",{className:CM.container,ref:l,role:"presentation","aria-label":"3D Canvas"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Canvas/index.tsx",lineNumber:42,columnNumber:3},void 0)};class TM extends yn{constructor(){super();b(this,"wrapperElm");b(this,"canvas");b(this,"canvasCtx");b(this,"viewRangeFrame");b(this,"viewPort");b(this,"viewPortRange");b(this,"musicBuffer");b(this,"resizeObserver");b(this,"frameSetting");b(this,"framePlay");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];const i=window.localStorage.getItem("audioViweRange");this.viewRangeFrame=i?Number(i):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){const i=new ee(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=i.x,this.canvas.height=i.y}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const i=this.musicBuffer.getChannelData(0),o=1,c=this.viewPortRange[0]/this.frameSetting.fps,d=this.musicBuffer.sampleRate*c,u=d/this.canvas.width,x=this.frameToPx(0);this.canvasCtx.beginPath();for(let v=0;v<d;v+=u){const p=Math.floor(v-x*u),_=i[Math.round(p)]*o,w=v/d*this.canvas.width,T=(_+1)*(this.canvas.height/2);let C=T,M=T;for(let Y=0;Y<16;Y++){const O=(i[Math.round(p+u*(Y/16))]*o+1)*(this.canvas.height/2);C>O&&(C=O),M<O&&(M=O)}const G=M-C;G>3&&this.canvasCtx.fillRect(w,C,1,G),v==0?this.canvasCtx.moveTo(w,T):this.canvasCtx.lineTo(w,T)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle="#555",this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(i){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=i,this.resizeObserver.observe(i),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(i){this.framePlay=i,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(i){this.viewRangeFrame=i,this.setFramePlaying(this.framePlay),localStorage.setItem("audioViweRange",String(this.viewRangeFrame))}setFrameSetting(i){this.frameSetting=i,this.render()}setMusicBuffer(i){this.musicBuffer=i,this.render()}frameToPx(i){return(i-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}}const NM="_audioView_1iv4u_45",AM={audioView:NM},DM=()=>{const{editor:h}=za(),l=X.useRef(null),[i,o]=X.useState();X.useEffect(()=>{const T=new TM;if(o(T),l.current)return T.setWrapperElm(l.current),()=>{T.dispose()}},[]);const c=h&&h.audioBuffer,[d,u]=X.useState(),[x,v]=X.useState({duration:0,fps:0}),[p,_]=X.useState({current:0,playing:!1});X.useEffect(()=>{if(!h)return;const T=h.engine,C=H=>{v({duration:H["timeline/duration"],fps:H["timeline/fps"]})};let M=0;const G=()=>{u(M++)},Y=H=>{_({...H})};return C(T.serialize()),Y(T._frame),T.on("fields/update",C),T.on("update/music",G),T.on("update/frame/play",Y),()=>{T.off("update/frame/setting",C),T.off("update/music",G),T.off("update/frame/play",Y)}},[h]),X.useEffect(()=>{i&&c&&i.setMusicBuffer(c)},[i,c,d]),X.useEffect(()=>{i&&p&&i.setFramePlaying(p)},[i,p]),X.useEffect(()=>{i&&x&&i.setFrameSetting(x)},[i,x]);const w=X.useCallback(T=>{if(i){const C=T.deltaY>0?1.1:.9;i.setViewRangeFrame(i.viewRangeFrame*C)}T.preventDefault()},[i]);return X.useEffect(()=>{const T=l.current;return T&&T.addEventListener("wheel",w,{passive:!1}),()=>{T&&T.removeEventListener("wheel",w)}},[w]),E.jsxDEV("div",{className:AM.audioView,ref:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/AudioView/index.tsx",lineNumber:172,columnNumber:9},void 0)},OM="_screen_18s1v_45",kM="_header_18s1v_53",MM="_header_right_18s1v_68",PM="_header_item_18s1v_74",LM="_content_18s1v_82",zM="_canvas_18s1v_90",FM="_audioView_18s1v_94",BM="_externalBtn_18s1v_103",_i={screen:OM,header:kM,header_right:MM,header_item:PM,content:LM,canvas:zM,audioView:FM,externalBtn:BM},oE=()=>{const{editor:h}=za(),[l,i]=Ht(h,"enableRender"),[o,c]=Ht(h,"viewType"),[d,u]=Ht(h,"resolutionScale");return E.jsxDEV("div",{className:_i.screen,children:[E.jsxDEV("div",{className:_i.header,children:E.jsxDEV("div",{className:_i.header_right,children:[E.jsxDEV("div",{className:_i.header_item,children:E.jsxDEV(ai,{title:"Render",children:E.jsxDEV(Si,{value:l,onChange:x=>{i&&i(x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:25,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:24,columnNumber:5},void 0),E.jsxDEV("div",{className:_i.header_item,children:E.jsxDEV(ai,{title:"View",children:E.jsxDEV(Si,{value:o,format:{type:"select",list:["render","debug"]},onChange:x=>{c&&c(x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:39,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:37,columnNumber:5},void 0),E.jsxDEV("div",{className:_i.header_item,children:E.jsxDEV(ai,{title:"Resolution",children:E.jsxDEV(Si,{value:d,format:{type:"select",list:new Array(6).fill(0).map((x,v)=>{const p=Math.pow(2,v),_=1/p,w=_==1?"1":"1/"+p;return{value:_,label:w}})},onChange:x=>{u&&u(x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:55,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:54,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:53,columnNumber:5},void 0),E.jsxDEV("div",{className:_i.externalBtn,children:E.jsxDEV(As,{onClick:()=>{h.openInExternalWindow()},children:E.jsxDEV("svg",{width:"32",height:"12",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("g",{clipPath:"url(#clip0_224_2)",children:[E.jsxDEV("path",{d:"M96 0V416H512V0H96ZM472 376H136V40H472V376Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:86,columnNumber:9},void 0),E.jsxDEV("path",{d:"M40 472V296V136V96H0V512H416V472H376H40Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:87,columnNumber:9},void 0),E.jsxDEV("path",{d:"M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:88,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:85,columnNumber:8},void 0),E.jsxDEV("defs",{children:E.jsxDEV("clipPath",{id:"clip0_224_2",children:E.jsxDEV("rect",{width:"512",height:"512",fill:"white"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:92,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:91,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:90,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:84,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:79,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:78,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:23,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:22,columnNumber:3},void 0),E.jsxDEV("div",{className:_i.content,children:[E.jsxDEV("div",{className:_i.canvas,children:E.jsxDEV(wM,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:104,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:103,columnNumber:4},void 0),E.jsxDEV("div",{className:_i.audioView,children:E.jsxDEV(DM,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:107,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:106,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:102,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:21,columnNumber:9},void 0)},LE=X.createContext(null),UM=()=>{const{editor:h}=za(),[l,i]=X.useState({current:0,playing:!1}),[o,c]=X.useState([0,0,100,0]),d=X.useRef([0,0,0,0]);d.current=o;const u=o[2]-o[0];let x=10*Math.pow(2,0+Math.floor(Math.log2(u/100)));x=Math.max(1,Math.floor(x));const v=h==null?void 0:h.audioBuffer,[p,_]=X.useState();X.useEffect(()=>{if(h){const Y=h.engine,H=V=>{i({...V})};H(Y.frame);let O=0;const $=()=>{_(O++)},ae=()=>{Y.serialize()};return ae(),Y.on("update/frame/play",H),Y.on("update/music",$),h.on("loadedProject",ae),()=>{Y.off("update/frame/play",H),Y.off("update/music",$),h.off("loadedProject",ae)}}},[h]);const w=X.useCallback(Y=>{h&&h.engine.seek(Y)},[h]),T=X.useCallback(Y=>{const H=o[2]-o[0];return Math.floor(o[0]+H*Y)},[o]),C=X.useCallback(Y=>{const H=d.current,O=(H[2]+H[0])/2,$=(H[0]-O)*Y+O,ae=(H[2]-O)*Y+O;c([$,H[1],ae,H[3]])},[]),M=X.useCallback(Y=>{const H=d.current,O=Y*(H[2]-H[0]);c([H[0]+O,H[1],H[2]+O,H[3]])},[]),G=X.useCallback(Y=>{const H=d.current,O=H[2]-H[0];c([Y-O/2,H[1],Y+O/2,H[3]])},[]);return{glEditor:h,framePlay:l,viewPort:o,viewPortScale:x,musicBuffer:v,musicBufferVersion:p,setCurrentFrame:w,getFrameViewPort:T,zoom:C,scroll:M,setViewPortCenter:G}},VM="_timeline_e42r4_1",IM="_inner_e42r4_6",jM="_content_e42r4_13",HM="_setting_e42r4_21",Zf={timeline:VM,inner:IM,content:jM,setting:HM},Os=()=>{const h=X.useContext(LE);if(h===null)throw new Error("useTimeline must be used within a TimelineProvider");return h},GM="_timelineCanvas_12pgc_45",WM={timelineCanvas:GM},XM=`#include <common>

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

}`;class YM extends yn{constructor(){super();b(this,"wrapperElm");b(this,"glCanvas");b(this,"gl");b(this,"canvasTexture");b(this,"canvas");b(this,"canvasCtx");b(this,"glRenderer");b(this,"postProcess");b(this,"viewPort");b(this,"viewPortRange");b(this,"viewPortScale");b(this,"frameSetting");b(this,"loopSetting");b(this,"musicBuffer");b(this,"musicTexture");b(this,"resizeObserver");b(this,"canvasSize");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.glCanvas=document.createElement("canvas");const i=new wE(this.glCanvas.getContext("webgl2"));this.gl=i.gl,this.canvasSize=new ee(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this)),this.glRenderer=new DE(this.gl),this.canvasTexture=new ze(this.gl),this.musicBuffer=null,this.musicTexture=new ze(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new Ci({passes:[new yt(this.gl,{frag:XM,uniforms:{uCanvasTex:{type:"1i",value:null},uMusicTex:{type:"1i",value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){const i=new ee(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.glCanvas.width=this.canvas.width=i.x,this.glCanvas.height=this.canvas.height=i.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(i)}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle="#181818";const o=this.frameToPx(0),c=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(o,0,c-o,this.canvas.height)}const i=(o,c,d)=>{let u=Math.ceil(this.viewPort[0]/o)*o;this.canvasCtx.beginPath();let x=0;for(;u<this.viewPort[2]&&x<100;){const v=this.frameToPx(u+c);this.canvasCtx.moveTo(v,0),this.canvasCtx.lineTo(v,this.canvas.height),u+=o,x++}this.canvasCtx.strokeStyle=d,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(i(this.viewPortScale,0,"#555"),i(this.viewPortScale,this.viewPortScale/2,"#333"),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const o=this.musicBuffer.getChannelData(0),c=this.viewPortRange[0]/this.frameSetting.fps,d=this.musicBuffer.sampleRate*c,u=d/this.canvas.width,x=this.frameToPx(0);this.canvasCtx.beginPath();for(let v=0;v<d;v+=u){const p=Math.floor(v-x*u),_=o[Math.round(p)],w=v/d*this.canvas.width,T=(_+1)*(this.canvas.height/2);let C=T,M=T;for(let Y=0;Y<16;Y++){const O=(o[Math.round(p+u*(Y/16))]+1)*(this.canvas.height/2);C>O&&(C=O),M<O&&(M=O)}const G=M-C;G>3&&this.canvasCtx.fillRect(w,C,1,G),v==0?this.canvasCtx.moveTo(w,T):this.canvasCtx.lineTo(w,T)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle="#0009";const o=this.frameToPx(this.loopSetting.start),c=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,o,this.canvas.height),this.canvasCtx.fillRect(c,0,this.canvas.width-c,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess._passes&&(this.postProcess._passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(i){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=i,this.resizeObserver.observe(i),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(i,o){this.viewPort=i,this.viewPortRange=[i[2]-i[0],i[3]-i[1]],this.viewPortScale=o,this.render()}setFrameSetting(i){this.frameSetting={duration:Math.round(i.duration),fps:Math.round(i.fps)},this.render()}setMusicBuffer(i){this.musicBuffer=i,setTimeout(()=>{this.render()},100)}setLoopSetting(i,o,c){this.loopSetting={enabled:i,start:o,end:c},this.render()}frameToPx(i){return(i-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}}const $M=()=>{const{viewPort:h,viewPortScale:l,musicBuffer:i,musicBufferVersion:o,glEditor:c}=Os(),[d,u]=X.useState(),x=X.useRef(null);X.useEffect(()=>{const C=new YM;return u(C),x.current&&C.setWrapperElm(x.current),()=>{C.dispose()}},[]),X.useEffect(()=>{d&&h&&l&&d.setViewPort(h,l)},[d,h,l]);const[v]=Ht(c==null?void 0:c.engine,"timeline/duration"),[p]=Ht(c==null?void 0:c.engine,"timeline/fps");X.useEffect(()=>{d&&v&&p&&d.setFrameSetting({duration:v||0,fps:p||0})},[d,v,p]);const[_]=Ht(c,"frameLoop/enabled"),[w]=Ht(c,"frameLoop/start"),[T]=Ht(c,"frameLoop/end");return X.useEffect(()=>{d&&d.setLoopSetting(_||!1,w||0,T||0)},[d,_,w,T]),X.useEffect(()=>{d&&i&&d.setMusicBuffer(i)},[d,i,o]),E.jsxDEV("div",{className:WM.timelineCanvas,ref:x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCanvas/index.tsx",lineNumber:94,columnNumber:9},void 0)},qM="_controls_n8ed2_45",QM={controls:qM},KM=h=>{const{viewPort:l,setCurrentFrame:i,getFrameViewPort:o,zoom:c,scroll:d,setViewPortCenter:u}=Os(),x=X.useRef([0,0,0,0]),v=X.useRef([0,0]);l&&(x.current=l,v.current=[l[2]-l[0],l[3]-l[1]]);const p=X.useRef(null),_=X.useRef(null),w=X.useRef(null),T=X.useRef(null),C=X.useRef(null),M=X.useCallback(H=>{const O=p.current&&p.current.clientWidth||1;if(w.current==0){if(i&&o&&_.current){const $=(H.clientX-_.current.left)/O;i(o($))}}else if(w.current==1){const $=[H.clientX,H.clientY];if(T.current&&C.current){const ae=-($[0]-T.current[0])/O*v.current[0];u&&u(C.current+ae)}}},[i,o,u]),G=X.useCallback(H=>{w.current=H.button,C.current=(x.current[2]+x.current[0])/2,T.current=[H.clientX,H.clientY],_.current=H.currentTarget.getBoundingClientRect();const O=(H.clientX-_.current.left)/H.currentTarget.clientWidth;w.current==0&&i&&o&&i(o(O)),window.addEventListener("pointermove",M);const $=()=>{T.current=null,w.current=null,C.current=null,window.removeEventListener("pointermove",M)};return window.addEventListener("pointerup",$),()=>{window.removeEventListener("pointerup",$),window.removeEventListener("pointermove",M)}},[o,i,M]),Y=X.useCallback(H=>{if(w.current!==null||!c||!d)return;H.preventDefault();const O=H.target&&H.target.clientWidth||1,$=Math.abs(H.deltaY);Math.abs(H.deltaX)<$?$>50?c(H.deltaY<0?.9:1.1):c(1+H.deltaY*.005):d(H.deltaX/O*.5)},[c,d]);return X.useEffect(()=>{const H=p.current;return H&&H.addEventListener("wheel",Y,{passive:!1}),()=>{H&&H.removeEventListener("wheel",Y)}},[Y]),l?E.jsxDEV("div",{className:QM.controls,onPointerDown:G,ref:p,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineControls/index.tsx",lineNumber:158,columnNumber:9},void 0):null},ZM="_cursor_2b6c4_45",JM="_frame_2b6c4_57",sE={cursor:ZM,frame:JM},eP=()=>{const{viewPort:h,framePlay:l}=Os();if(!h||!l)return null;const i=h[2]-h[0],o=(l.current-h[0])/i;return E.jsxDEV("div",{className:sE.cursor,style:{left:o*100+"%"},children:E.jsxDEV("div",{className:sE.frame},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCursor/index.tsx",lineNumber:15,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCursor/index.tsx",lineNumber:14,columnNumber:9},void 0)},tP="_timelineLoop_ly75p_45",nP="_start_ly75p_54",rP="_end_ly75p_55",Jf={timelineLoop:tP,start:nP,end:rP},iP="_cursor_1r72h_45",aP={cursor:iP},lE=({onMove:h})=>{const l=X.useRef(!1);return E.jsxDEV("div",{className:aP.cursor,onPointerDown:i=>{i.buttons==1&&(l.current=!0,i.stopPropagation())},onPointerMove:i=>{const o=i.target;l.current===!1||i.buttons!=1||(o.setPointerCapture(i.pointerId),i.buttons==1&&h&&h(i.clientX),i.nativeEvent.preventDefault(),i.nativeEvent.stopPropagation())},onPointerUp:()=>{l.current=!1}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/TimelineLoopCursor/index.tsx",lineNumber:9,columnNumber:9},void 0)},oP=()=>{const{viewPort:h,framePlay:l,glEditor:i}=Os(),o=X.useRef(null);Mv(i,["frameLoop/enabled","frameLoop/start","frameLoop/end"]);const[c]=Ht(i,"frameLoop/enabled"),[d,u]=Ht(i,"frameLoop/start"),[x,v]=Ht(i,"frameLoop/end");if(c!==!0||!h||!l||d===void 0||x===void 0)return null;const p=h[2]-h[0],_=(d-h[0])/p,w=(x-h[0])/p,T=(C,M)=>{const G=C.getBoundingClientRect();return(M-G.x)/G.width*(h[2]-h[0])+h[0]};return E.jsxDEV("div",{className:Jf.timelineLoop,ref:o,children:E.jsxDEV("div",{className:Jf.timelineLoop_inner,children:[E.jsxDEV("div",{className:Jf.start,style:{left:_*100+"%"},children:E.jsxDEV(lE,{onMove:C=>{o.current&&u&&u(T(o.current,C))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:45,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:44,columnNumber:4},void 0),E.jsxDEV("div",{className:Jf.end,style:{left:w*100+"%"},children:E.jsxDEV(lE,{onMove:C=>{o.current&&v&&v(T(o.current,C))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:60,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:59,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:43,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:42,columnNumber:9},void 0)},sP="_scale_dsq5l_45",lP="_scale_inner_dsq5l_53",uP="_scale_item_dsq5l_58",cP="_scale_item_frame_dsq5l_66",fP="_scale_item_time_dsq5l_71",Du={scale:sP,scale_inner:lP,scale_item:uP,scale_item_frame:cP,scale_item_time:fP},dP=h=>{const l=("00"+Math.floor(h%3600/60)).slice(-2),i=("00"+Math.floor(h%60)).slice(-2);return`${l}:${i}`},hP=()=>{const{glEditor:h,viewPort:l,viewPortScale:i}=Os(),[o,c]=Ht(h==null?void 0:h.engine,"timeline/fps");if(!l||!i||o===void 0)return null;const d=[];let u=Math.ceil(l[0]/i)*i,x=0;for(;u<l[2]&&x<100;){const v=(u-l[0])/(l[2]-l[0]),p=u/(o||0);d.push(E.jsxDEV("div",{className:Du.scale_item,style:{left:v*100+"%"},children:[E.jsxDEV("div",{className:Du.scale_item_frame,children:u},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:37,columnNumber:5},void 0),E.jsxDEV("div",{className:Du.scale_item_time,children:dP(p)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:40,columnNumber:5},void 0)]},u,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:36,columnNumber:4},void 0)),u+=i,x++}return E.jsxDEV("div",{className:Du.scale,children:E.jsxDEV("div",{className:Du.scale_inner,children:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:52,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:51,columnNumber:9},void 0)},mP="_timelineSetting_178ec_45",pP={timelineSetting:mP},vP=()=>{const{framePlay:h,glEditor:l}=Os(),i=X.useCallback((p,_)=>{_&&_(p)},[]),[o,c]=Ht(l,"frameLoop/enabled"),[d,u]=Ht(l==null?void 0:l.engine,"timeline/duration"),[x,v]=Ht(l==null?void 0:l.engine,"timeline/fps");return E.jsxDEV("div",{className:pP.timelineSetting,children:E.jsxDEV(_r,{children:[E.jsxDEV(ai,{title:"current",children:E.jsxDEV(Si,{value:Math.floor((h==null?void 0:h.current)||0),readOnly:!0},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:35,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:34,columnNumber:4},void 0),E.jsxDEV(ai,{title:"duration",children:E.jsxDEV(Si,{value:d,onChange:p=>i(p,u)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:37,columnNumber:4},void 0),E.jsxDEV(ai,{title:"fps",children:E.jsxDEV(Si,{value:x,onChange:p=>i(p,v)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:41,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:40,columnNumber:4},void 0),E.jsxDEV(ai,{title:"loop",children:E.jsxDEV(Si,{value:o||!1,onChange:p=>i(p,c)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:44,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:43,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:33,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:32,columnNumber:9},void 0)},uE=()=>{const h=UM();return E.jsxDEV(LE.Provider,{value:h,children:E.jsxDEV("div",{className:Zf.timeline,children:E.jsxDEV("div",{className:Zf.inner,children:[E.jsxDEV("div",{className:Zf.setting,children:E.jsxDEV(vP,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:20,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:19,columnNumber:5},void 0),E.jsxDEV("div",{className:Zf.content,children:[E.jsxDEV($M,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:23,columnNumber:6},void 0),E.jsxDEV(eP,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:24,columnNumber:6},void 0),E.jsxDEV(KM,{children:E.jsxDEV(oP,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:25,columnNumber:6},void 0),E.jsxDEV(hP,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:28,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:22,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:18,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:17,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:16,columnNumber:9},void 0)},gP=`#include <common>\r
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
}`;class yP extends yn{constructor(i){super();b(this,"_engine");b(this,"_gl");b(this,"_srcFrameBuffer");b(this,"_outFrameBuffer");b(this,"_frameList");b(this,"_enable");b(this,"_resolution");b(this,"_count");b(this,"_total");b(this,"_tile");b(this,"_tilePixelSize");b(this,"_tileInv");b(this,"_focus");b(this,"_uniforms");b(this,"_outPostProcess");b(this,"_elm");b(this,"_labelCanvas");b(this,"_cctx");b(this,"_canvasTexture");this._engine=i,this._gl=i.gl,this._elm=i.canvas,this._srcFrameBuffer=new xt(this._gl,{disableDepthBuffer:!0}),this._outFrameBuffer=new xt(this._gl,{disableDepthBuffer:!0}).setTexture([new ze(this._gl).setting()]),this._enable=!1,this._count=0,this._total=1,this._tile=new ee(1,1),this._tilePixelSize=new ee(1,1),this._tileInv=new ee(1,1),this._focus=null,this._resolution=new ee,this._labelCanvas=document.createElement("canvas"),this._cctx=this._labelCanvas.getContext("2d"),this._canvasTexture=new ze(this._gl).attach(this._labelCanvas),this._uniforms={uCanvas:{value:this._canvasTexture,type:"1i"}},this._outPostProcess=new Ci({passes:[new yt(this._gl,{uniforms:this._uniforms,renderTarget:null,frag:gP,backBufferOverride:this._outFrameBuffer.textures})]}),this._frameList=[];const o=new ee(0,0),c=this._onClick.bind(this),d=v=>{o.set(v.clientX,v.clientY)},u=v=>{const p=new ee(v.clientX,v.clientY);o.clone().sub(p).length()<10&&c(v)};this._elm.addEventListener("pointerdown",d),this._elm.addEventListener("pointerup",u);const x=v=>{v.key==="Escape"&&(this._focus=null,this._clear()),v.key=="ArrowRight"&&this._focus!==null&&this._focus++,v.key=="ArrowLeft"&&this._focus!==null&&this._focus--};window.addEventListener("keydown",x),this.once("dispose",()=>{this._elm.removeEventListener("pointerdown",d),this._elm.removeEventListener("pointerup",u),window.removeEventListener("keydown",x)})}_calcTilePos(i){const o=i%this._tile.x*this._tileInv.x*this._resolution.x,c=Math.floor(i/this._tile.x)*this._tileInv.y*this._resolution.y;return{x:o,y:c}}push(i,o){for(let c=0;c<i.textures.length;c++){if(this._focus==null||this._focus==this._count){const d=i.textures[c],u="currentFace"in i?i.currentFace:this._gl.TEXTURE_2D;this._srcFrameBuffer.setSize(d.size),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER,this._gl.COLOR_ATTACHMENT0,u,d.getTexture(),0),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,this._outFrameBuffer.getFrameBuffer());let{x,y:v}=this._calcTilePos(this._count);const p=this._tilePixelSize.x,_=this._tilePixelSize.y;this._focus!==null&&(x=0,v=0),this._gl.blitFramebuffer(0,0,i.size.x,i.size.y,x,this._resolution.y-v-_,x+p,this._resolution.y-v,this._gl.COLOR_BUFFER_BIT,this._gl.NEAREST),this._srcFrameBuffer.setTexture([]),this._frameList.push({frameBuffer:i,texture:d,label:o?o+(i.textures.length>1?"_"+c:""):""})}this._count++}this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,null)}draw(){this._cctx.clearRect(0,0,this._resolution.x,this._resolution.y);const i=this._resolution.y/1080;this._cctx.font=`500 ${28*i}px 'Courier New'`,this._cctx.fillStyle="#fff";for(let o=0;o<this._frameList.length;o++){const{x:c,y:d}=this._calcTilePos(o),u=this._frameList[o];this._cctx.fillText(u.label,c+5*i,d+this._tilePixelSize.y-5*i)}this._canvasTexture.attach(this._labelCanvas),this._engine.renderer.renderPostProcess(this._outPostProcess,void 0,this._resolution),this._clear()}_clear(){this._total=this._count;const i=Math.sqrt(this._focus!==null?1:this._total);this._tile.set(Math.round(i),Math.ceil(i)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameList=[],this._count=0}reflesh(){this.resize(this._resolution)}resize(i){this._resolution.copy(i),this._outFrameBuffer.setSize(i),this._outPostProcess.resize(i),this._labelCanvas.width=i.x,this._labelCanvas.height=i.y,this._canvasTexture.attach(this._labelCanvas)}_onClick(i){if(this._enable){if(this.reflesh(),this._focus===null){const o=new ee(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),c=Math.floor(i.offsetX/o.x),d=Math.floor(i.offsetY/o.y);this._focus=c+d*this._tile.x}this._clear()}}set enable(i){this._enable=i,i&&this.reflesh()}get enable(){return this._enable}dispose(){this.emit("dispose")}}class zE extends yn{constructor(){super();b(this,"_pressedKeys");this._pressedKeys={};const i=this._onKeyDown.bind(this),o=this._onKeyUp.bind(this);window.addEventListener("keydown",i),window.addEventListener("keyup",o);const c=()=>{window.removeEventListener("keydown",i),window.removeEventListener("keyup",o)};this.once("dispose",c)}get pressedKeys(){return this._pressedKeys}_onKeyDown(i){this._pressedKeys[i.key]=!0,this.emit("keydown",[i,this._pressedKeys])}_onKeyUp(i){if(this._pressedKeys[i.key]=!1,i.key=="Meta"||i.key=="Control"){const o=Object.keys(this._pressedKeys);for(let c=0;c<o.length;c++)this._pressedKeys[o[c]]=!1}this.emit("keyup",[i,this._pressedKeys])}dispose(){this.emit("dispose")}}class cE extends Ds{constructor(i){super();b(this,"_engine");b(this,"_keyBoard");b(this,"_selectedEntityId");b(this,"_audioBuffer");b(this,"_frameLoop");b(this,"_resolutionScale");b(this,"_viewType");b(this,"_frameDebugger");b(this,"_externalWindow");b(this,"_externalCanvasBitmapContext");b(this,"_disposed");this._engine=i,this._viewType="render",this._selectedEntityId=null,this._resolutionScale=1,this._externalWindow=null,this._externalCanvasBitmapContext=null,this._disposed=!1,this._keyBoard=new zE,this._keyBoard.on("keydown",(c,d)=>{(d.Meta||d.Control)&&d.s&&(c.preventDefault(),this.save()),c.key==" "&&(this._engine.frame.playing?this._engine.stop():this._engine.play())}),this._frameDebugger=new yP(i),this.engine.renderer.on("drawPass",(c,d)=>{this._frameDebugger&&this._frameDebugger.enable&&c&&this._frameDebugger.push(c,d)}),this._audioBuffer=null,this._engine.on("update/music",c=>{this._audioBuffer=c}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on("update/blidge/frame",c=>{this._engine.seek(c.current),c.playing&&!this._engine.frame.playing?this._engine.play():!c.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field("enableRender",()=>this._engine.enableRender,c=>this._engine.enableRender=c),this.field("resolutionScale",()=>this._resolutionScale,c=>{this._resolutionScale=Number(c),this._resize()}),this.field("viewType",()=>this._viewType,c=>{this._viewType=c,this._viewType==="debug"?this._frameDebugger.enable=!0:this._frameDebugger.enable=!1});const o=this.fieldDir("frameLoop");o.field("enabled",()=>this._frameLoop.enabled,c=>this._frameLoop.enabled=c),o.field("start",()=>this._frameLoop.start,c=>this._frameLoop.start=c),o.field("end",()=>this._frameLoop.end,c=>this._frameLoop.end=c),this.field("selectedEntityId",()=>this._selectedEntityId,c=>{this._selectedEntityId=c}),this._animate()}get engine(){return this._engine}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}_animate(){if(!this._disposed){if(this._engine.update(),this._externalCanvasBitmapContext){const i=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(o=>{i.transferFromImageBitmap(o)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start)),this._frameDebugger&&this._frameDebugger.enable&&this._frameDebugger.draw(),window.requestAnimationFrame(this._animate.bind(this))}}selectEntity(i){this.setField("selectedEntityId",i?i.uuid:null)}createEntity(i,o){const c=new Br;return c.name=o,c.initiator="user",i.add(c),c}deleteEntity(i){i.disposeRecursive();const o=i.parent;o&&o.remove(i)}save(){this.emit("save",[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:"export"})}exportEngine(){return this._engine.serialize({mode:"export"})}openInExternalWindow(){if(this._externalWindow=window.open("","_blank"),!this._externalWindow)return;const i=this._externalWindow.document.createElement("canvas");i.style.width="100%",i.style.height="100%",i.style.objectFit="contain",i.style.cursor="none",this._externalWindow.document.body.style.margin="0",this._externalWindow.document.body.style.background="#000",this._externalWindow.document.body.appendChild(i),this._externalCanvasBitmapContext=i.getContext("bitmaprenderer"),this._externalWindow.addEventListener("unload",()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}_resize(){const i=new ee(1920,1080).multiply(this._resolutionScale);this.engine.setSize(i),this._frameDebugger.resize(i),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=i.x,this._externalCanvasBitmapContext.canvas.height=i.y)}dispose(){this._disposed=!0,this._keyBoard.dispose(),this._frameDebugger.dispose()}}const xP=()=>{const{engine:h}=ME(),[l,i]=X.useState(()=>new cE(h)),o=ku.useRef(l);return o.current=l,X.useEffect(()=>{if(!o.current.disposed&&o.current.engine.uuid==h.uuid)return;const c=new cE(h);i(c)},[h]),X.useEffect(()=>()=>{l.dispose()},[l]),{engine:h,editor:l}},bP="_editor_16tun_45",EP="_vert_16tun_51",RP="_horiz_16tun_58",_P="_flex_16tun_62",Er={editor:bP,vert:EP,horiz:RP,flex:_P},SP=h=>{const l=xP();X.useEffect(()=>{if(!(!l.editor||!h.onSave))return l.editor.on("save",h.onSave),()=>{l.editor.off("save",h.onSave)}},[l.editor,h.onSave]),X.useEffect(()=>{!l.editor||!h.editorData||l.editor.deserialize(h.editorData)},[h.editorData,l.editor]);const i=ED(),o=ND();let c=null;return i.isPC?c=E.jsxDEV(E.Fragment,{children:[E.jsxDEV("div",{className:Er.vert,children:[E.jsxDEV("div",{className:`${Er.horiz} ${Er.flex}`,children:[E.jsxDEV("div",{className:Er.vert,style:{width:"300px"},children:[E.jsxDEV("div",{className:Er.flex,children:E.jsxDEV(Pa,{children:[E.jsxDEV(_r,{title:"Scene",children:E.jsxDEV(rE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:69,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:68,columnNumber:10},void 0),E.jsxDEV(_r,{title:"Project",children:E.jsxDEV(aE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:72,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:71,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:67,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:66,columnNumber:8},void 0),E.jsxDEV("div",{style:{height:"20vh"},children:E.jsxDEV(Pa,{children:E.jsxDEV(_r,{title:"Timer",noPadding:!0,children:E.jsxDEV(tE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:79,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:78,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:77,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:76,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:65,columnNumber:7},void 0),E.jsxDEV("div",{className:`${Er.flex}`,children:E.jsxDEV(oE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:85,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:84,columnNumber:7},void 0),E.jsxDEV("div",{style:{width:"300px"},children:E.jsxDEV(Pa,{children:E.jsxDEV(_r,{title:"Property",children:E.jsxDEV(Jb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:90,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:89,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:88,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:87,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:64,columnNumber:6},void 0),E.jsxDEV("div",{style:{height:"160px"},children:E.jsxDEV(Pa,{children:[E.jsxDEV(_r,{title:"Timeline",noPadding:!0,children:E.jsxDEV(uE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:98,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:97,columnNumber:8},void 0),E.jsxDEV(_r,{title:"MIDIMIXEmu",children:E.jsxDEV(iE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:101,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:100,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:96,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:95,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:63,columnNumber:5},void 0),E.jsxDEV(Xb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:106,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:62,columnNumber:4},void 0):c=E.jsxDEV("div",{className:Er.editor,children:[E.jsxDEV("div",{className:Er.vert,children:[E.jsxDEV("div",{className:`${Er.flex}`,children:E.jsxDEV(oE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:116,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:115,columnNumber:6},void 0),E.jsxDEV("div",{className:Er.horiz,style:{height:"55vh"},children:[E.jsxDEV("div",{className:Er.vert,style:{width:"45vw"},children:[E.jsxDEV("div",{style:{flex:"1"},children:E.jsxDEV(Pa,{children:[E.jsxDEV(_r,{title:"Scene",children:E.jsxDEV(rE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:123,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:122,columnNumber:10},void 0),E.jsxDEV(_r,{title:"Project",children:E.jsxDEV(aE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:126,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:125,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:121,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:120,columnNumber:8},void 0),E.jsxDEV("div",{style:{height:"15vh"},children:E.jsxDEV(Pa,{children:E.jsxDEV(_r,{title:"Timer",noPadding:!0,children:E.jsxDEV(tE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:133,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:132,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:131,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:130,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:119,columnNumber:7},void 0),E.jsxDEV("div",{className:`${Er.flex}`,children:E.jsxDEV(Pa,{children:E.jsxDEV(_r,{title:"Property",children:E.jsxDEV(Jb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:141,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:140,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:139,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:138,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:118,columnNumber:6},void 0),E.jsxDEV("div",{style:{height:"15vh"},children:E.jsxDEV(Pa,{children:[E.jsxDEV(_r,{title:"Timeline",noPadding:!0,children:E.jsxDEV(xD,{fallback:E.jsxDEV("div",{children:"エラーだよ"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:149,columnNumber:34},void 0),children:E.jsxDEV(uE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:150,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:149,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:148,columnNumber:8},void 0),E.jsxDEV(_r,{title:"MIDIMIXEmu",children:E.jsxDEV(iE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:154,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:153,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:147,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:146,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:114,columnNumber:5},void 0),E.jsxDEV(Xb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:159,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:113,columnNumber:4},void 0),E.jsxDEV(bE.Provider,{value:l,children:E.jsxDEV(xE.Provider,{value:o,children:E.jsxDEV("div",{className:Er.editor,children:c},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:167,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:166,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:165,columnNumber:9},void 0)},CP=h=>{const[l,i]=ku.useState(()=>new Dn(h)),o=ku.useRef(l);o.current=l,X.useEffect(()=>{if(!o.current.disposed)return;const d=new Dn(h);i(d)},[h]),X.useEffect(()=>()=>{l.dispose()},[l]);const c=X.useCallback(d=>{l.load(d)},[l]);return{engine:l,load:c}},wP=h=>{const l=CP(h.gl),{engine:i}=l;return X.useEffect(()=>{i.setSize(new ee(1920,1080))},[i]),X.useEffect(()=>{h.project?i.load(h.project):i.init()},[i,h.project]),E.jsxDEV(kE.Provider,{value:l,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREngine/index.tsx",lineNumber:34,columnNumber:9},void 0)},TP="OREngine",NP=[0,0,0],AP=[0,0,0],DP=[1,1,1],OP={name:"root"},kP=[{path:"/root",components:[{name:"BLidgeClient",props:{mode:"json",gltf:!0,gltfPath:"/scene.glb","websocket/url":"ws://localhost:3100"}},{name:"UniformControls"},{name:"TextureGenerator"}]},{path:"/root/blidgeRoot/Camera",components:[{name:"ShakeViewer",props:{power:.15,speed:1}},{name:"PostProcessPipeline",props:{postprocess:[!0,!0,!0,!0]}},{name:"MainCamera"}]},{path:"/root/blidgeRoot/OREngine",components:[{name:"OREngineLogoMaterial"}]},{path:"/root/blidgeRoot/OREngineCube",components:[{name:"OREngineCubeMaterial"},{name:"ObjectRotate"}]}],MP={name:TP,position:NP,euler:AP,scale:DP,scene:OP,overrides:kP,"timeline/duration":600,"timeline/fps":60},ws=document.createElement("canvas"),wt=ws.getContext("webgl2",{antialias:!1}),PP=new wE(wt),ii={time:{uTime:{value:0,type:"1f"},uTimeF:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uTimeEF:{value:0,type:"1f"}},resolution:{uAspectRatio:{value:1,type:"1f"},uResolution:{value:new ee,type:"2f"}},camera:{projectionMatrix:{value:new st,type:"Matrix4fv"},viewMatrix:{value:new st,type:"Matrix4fv"}},gBuffer:{uGBufferPos:{value:null,type:"1i"},uGBufferNormal:{value:null,type:"1i"}},tex:{},music:{uMusicFreqTex:{value:null,type:"1i"},uMusicDomainTex:{value:null,type:"1i"}}};class ed extends ze{constructor(i,o){const c=i.gl;super(c);b(this,"material");b(this,"_renderer");b(this,"_resolution");b(this,"_postProcess");b(this,"_frameBuffer");this._renderer=i,this._resolution=o.resolution||new ee(1024,1024),this.setting({wrapS:c.REPEAT,wrapT:c.REPEAT,magFilter:c.LINEAR,minFilter:c.LINEAR}),this._frameBuffer=new xt(c).setTexture([this]).setSize(this._resolution),this.material=new yt(c,{...o,renderTarget:this._frameBuffer}),this._postProcess=new Ci({pipeline:new Bv({entity:new Br}),passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}}class LP extends yn{constructor(){super();b(this,"_isTouching");b(this,"element",null);b(this,"position");b(this,"delta");this.position=new ee(NaN,NaN),this.delta=new ee(NaN,NaN),this._isTouching=!1;const i=this._onPointer.bind(this,"move"),o=this._onPointer.bind(this,"end");window.addEventListener("pointermove",i),window.addEventListener("pointerup",o),window.addEventListener("dragend",o);const c=()=>{this.element&&this.removeElement(this.element),window.removeEventListener("pointermove",i),window.removeEventListener("pointerup",o),window.removeEventListener("dragend",o),this.off("dispose",c)};this.on("dispose",c)}setElement(i){this.element&&this.removeElement(this.element),this.element=i;const o=this._onPointer.bind(this,"start");i.addEventListener("pointerdown",o);const c=d=>{i.isEqualNode(d.elm)&&(i.removeEventListener("pointerdown",o),this.off("unregister",c))};this.on("unregister",c)}removeElement(i){this.emit("unregister",[i])}getScreenPosition(i){if(this.position.x!=this.position.x)return new ee(NaN,NaN);const o=this.position.clone().divide(i).multiply(2).sub(1);return o.y*=-1,o}getRelativePosition(i,o){const c=i.getClientRects()[0];let d=this.position.x-c.left,u=this.position.y-c.top;return o&&(d/=c.width,u/=c.height),new ee(d,u)}_setPos(i,o){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(i-this.position.x,o-this.position.y),this.position.set(i,o)}_onPointer(i,o){const c=o.pointerType;c!=null?c=="mouse"&&(o.button==-1||o.button==0)&&this._touchEventHandler(o.pageX,o.pageY,i,o):this._touchEventHandler(o.pageX,o.pageY,i,o)}_touchEventHandler(i,o,c,d){let u=!1;const x=i-window.pageXOffset,v=o-window.pageYOffset;c=="start"?(this._isTouching=!0,this._setPos(x,v),this.delta.set(0,0),u=!0):c=="move"?(this._setPos(x,v),this._isTouching&&(u=!0)):c=="end"&&("targetTouches"in d?d.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,u=!0),u&&this.emit(c,[{pointerEvent:d,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit("dispose")}}class FE extends xn{constructor(i){super(i);b(this,"shakePower");b(this,"shakeSpeed");b(this,"shakeMatrix");b(this,"shakeQua");b(this,"cameraComponent");this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new st,this.shakeQua=new Fa,this.order=1e3,this.field("power",()=>this.shakePower,o=>this.shakePower=o),this.field("speed",()=>this.shakeSpeed,o=>this.shakeSpeed=o)}updateImpl(i){let o=.008*this.shakePower;this.cameraComponent&&(o*=this.cameraComponent.fov/50);const c=i.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(c*2)*o,y:Math.sin(c*2.5)*o,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.entity.matrixWorld.multiply(this.shakeMatrix);const d=this.entity.getComponentsByTag("camera")[0];d&&d.viewMatrix.copy(this.entity.matrixWorld).inverse()}}class ud extends xn{constructor(i){super(i);b(this,"target");b(this,"up");b(this,"entityWorldPos");b(this,"targetWorldPos");this.target=null,this.entityWorldPos=new ee,this.targetWorldPos=new ee,this.up=new ee(0,1,0),this.order=9999}setTarget(i){this.target=i}beforeRenderImpl(i){if(this.target&&this._enabled){this.entity.matrixWorld.decompose(this.entityWorldPos),this.target.matrixWorld.decompose(this.targetWorldPos),this.entity.matrixWorld.lookAt(this.entityWorldPos,this.targetWorldPos,this.up);const o=this.entity.getComponentsByTag("camera")[0];o&&o.viewMatrix.copy(this.entity.matrixWorld).inverse()}}}class BE extends xn{constructor(i){super(i);b(this,"keyborad_");b(this,"_pointer");b(this,"orbit_");b(this,"mouseVelOrbit_");b(this,"mouseVelMove_");b(this,"eye_");b(this,"target_");b(this,"up_");b(this,"lookatMatrix_");b(this,"distance_");b(this,"distanceVel_");b(this,"_memPos");b(this,"_memTarget");b(this,"elmDisposer");this._pointer=new LP,this.keyborad_=new zE,this.orbit_=new ee,this.mouseVelOrbit_=new ee,this.mouseVelMove_=new ee,this.target_=new ee,this.eye_=new ee,this.up_=new ee(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new st,this._memPos=new ee,this._memTarget=new ee,this.order=999;let o=!1;const c=x=>{o||(o=!0)},d=x=>{if(!o)return;const v={x:x.delta.x*1,y:x.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(v):this.mouseVelOrbit_.add(v),x.pointerEvent.preventDefault(),x.pointerEvent.stopPropagation()},u=x=>{o&&(o=!1)};this._pointer.on("move",d),this._pointer.on("start",c),this._pointer.on("end",u),this.once("dispose",()=>{this._pointer.off("move",d),this._pointer.off("start",c),this._pointer.off("end",u)}),this.setPosition(this.entity.position,this.target_)}set enabled(i){if(this._enabled=i,i){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);const o=this.entity.getComponent(ud);o&&o.target&&this.setPosition(this.entity.position,o.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}setElm(i){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(i);const o=c=>{c.preventDefault(),this.distanceVel_+=c.deltaY};i.addEventListener("wheel",o),this.elmDisposer=()=>{i.removeEventListener("wheel",o)}}calc(i){const o=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new st().makeRotationAxis({x:1,y:0,z:0},Math.min(o,Math.max(-o,this.orbit_.x)))),this.eye_.applyMatrix3(new st().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(i.position,i.quaternion,i.scale)}updateImpl(i){const o=new ee(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);o.applyMatrix3(this.entity.matrix),this.target_.add(o),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);const c=Math.max(0,1-i.timeDelta*10);this.mouseVelOrbit_.multiply(c),this.mouseVelMove_.multiply(c),this.distanceVel_*=c,this.calc(this.entity)}setPosition(i,o){if(this.eye_.copy(i),this.target_.copy(o),this.entity){const c=this.entity.parent;c&&(c.updateMatrix(!0),this.target_.applyMatrix4(c.matrixWorld.clone().inverse()))}this.orbit_.x=Math.atan2(this.eye_.y-this.target_.y,new ee(this.eye_.x,this.eye_.z).length()-new ee(this.target_.x,this.target_.z).length()),this.orbit_.y=-Math.atan2(this.eye_.x-this.target_.x,this.eye_.z-this.target_.z),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0)}dispose(){super.dispose(),this._pointer.dispose()}}const zP=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

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
  
}`,FP=`uniform sampler2D uSrcTexture1;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uSrcTexture1, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`,BP=`#include <common>

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

}`;class UP extends Ci{constructor(l){const o=[],c=[];for(let _=0;_<4;_++)o.push(new xt(wt).setTexture([new ze(wt).setting({magFilter:wt.LINEAR,minFilter:wt.LINEAR})])),c.push(new xt(wt).setTexture([new ze(wt).setting({magFilter:wt.LINEAR,minFilter:wt.LINEAR})]));let d=2;const u=new yt(wt,{name:"bloom/bright/",frag:FP,passThrough:!0,uniforms:{uSrcTexture1:{value:l,type:"1i"},uThreshold:{value:1.8,type:"1f"},uBrightness:{value:1,type:"1f"}},resolutionRatio:1/d}),x=[];let v=u.renderTarget.textures;for(let _=0;_<4;_++){const w=o[_],T=c[_],C=8,M={name:"bloom/blur/"+_+"/v",renderTarget:w,frag:zP,uniforms:{uBackBlurTex:{value:v,type:"1i"},uIsVertical:{type:"1i",value:!0},uWeights:{type:"1fv",value:od.gaussWeights(C)},uBlurRange:{value:2,type:"1f"}},defines:{GAUSS_WEIGHTS:C.toString(),USE_BACKBLURTEX:""},passThrough:!0,resolutionRatio:1/d};x.push(new yt(wt,M)),x.push(new yt(wt,{...M,name:"bloom/blur/"+_+"/h",renderTarget:T,uniforms:{...M.uniforms,uBackBlurTex:{value:w.textures[0],type:"1i"},uIsVertical:{type:"1i",value:!1}}})),v=T.textures,d*=2}const p=new yt(wt,{name:"bloom/composite/",frag:BP,uniforms:{uBloomTexture:{value:c.map(_=>_.textures[0]),type:"1iv"}}});super({name:"Bloom",passes:[u,...x,p]})}get threshold(){return this.passes[0].uniforms.uThreshold.value}set threshold(l){this.passes[0].uniforms.uThreshold.value=l}get brightness(){return this.passes[0].uniforms.uBrightness.value}set brightness(l){this.passes[0].uniforms.uBrightness.value=l}}const VP=`#include <common>\r
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
}`;class IP extends Ci{constructor(){super({name:"ColorGrading",passes:[new yt(wt,{frag:VP})]})}}const jP=`#include <common>\r
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
}`;class HP extends Ci{constructor(){super({name:"Finalize",passes:[new yt(wt,{frag:jP})]})}}const GP=`uniform sampler2D uBackBuffer0;\r
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
}`;class WP extends Ci{constructor(){super({name:"FXAA",passes:[new yt(wt,{name:"fxaa",frag:GP})]})}}const UE=new yn;new Promise(h=>{UE.once("createdCamera",l=>{h(l)})});class XP extends xn{constructor(i){super(i);b(this,"renderCamera");b(this,"_commonUniforms");b(this,"_renderTarget");b(this,"_lookAt");b(this,"_orbitControls");b(this,"postProcessPipeline");b(this,"_resolution");b(this,"_resolutionInv");b(this,"_tmpVector1");b(this,"_tmpVector2");b(this,"_dofTarget");this._resolution=new ee,this._resolutionInv=new ee,this._commonUniforms=Qt.merge({uResolution:{type:"2f",value:this._resolution},uResolutionInv:{type:"2f",value:this._resolutionInv}}),this.renderCamera=this.entity.addComponent(Tv,{gl:wt}),this._renderTarget=this.renderCamera.renderTarget,this._lookAt=this.entity.addComponent(ud),this.entity.addComponent(FE),UE.emit("createdCamera",[this.renderCamera]),this.postProcessPipeline=this.entity.addComponent(Bv),this.postProcessPipeline.add(new WP);const o=this.postProcessPipeline.add(new UP(this.renderCamera.renderTarget.shadingBuffer.textures[0]));o.threshold=1,o.brightness=1,this.postProcessPipeline.add(new IP),this.postProcessPipeline.add(new HP),this._dofTarget=null,this._tmpVector1=new ee,this._tmpVector2=new ee;const c=x=>{const v=x.findEntityByName("Camera")||null,p=v==null?void 0:v.getComponent(Ou),_=this.entity.getComponent(Ou);p&&_&&(p.transformAutoUpdate=_.transformAutoUpdate);const w=x.findEntityByName("CamLook")||null;this._lookAt.setTarget(w),this._dofTarget=x.findEntityByName("CamDof")||null};this.entity.on("sceneCreated",c),this.once("dispose",()=>{this.entity.off("sceneCreated",c)});{this._orbitControls=void 0,this._orbitControls=this.entity.addComponent(BE),this._orbitControls.setElm(ws),this._orbitControls.enabled=!1;const x=T=>{this._orbitControls&&(this._orbitControls.enabled=T);const C=this._entity.getComponent(Ou),M=this._entity.getComponent(ud);C&&(C.transformAutoUpdate=!T),M&&(M.enabled=!T)},v=T=>{if(this._orbitControls&&this._orbitControls.enabled)return;T.target.setPointerCapture(T.pointerId),x(!0)},p=()=>{this._orbitControls&&this._orbitControls.enabled||x(!0)},_=T=>{T.key==="Escape"&&x(!1)};ws.addEventListener("pointerdown",v),ws.addEventListener("wheel",p),window.addEventListener("keydown",_);const w=()=>{ws.removeEventListener("pointerdown",v),ws.removeEventListener("wheel",p),window.removeEventListener("keydown",_)};this.once("dispose",w)}ii.gBuffer.uGBufferPos.value=this.renderCamera.gBuffer.textures[0],ii.gBuffer.uGBufferNormal.value=this.renderCamera.gBuffer.textures[1];const d=this.entity.getRootEntity(),u=d.findEntityByName("CamLook")||null;this._lookAt.setTarget(u),this._dofTarget=d.findEntityByName("CamDof")||null}updateImpl(i){this.resize(i.resolution),this.updateCameraParams(),this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget&&this._dofTarget.matrixWorld.decompose(this._tmpVector2),this.renderCamera.dofParams.focusDistance=this._tmpVector1.sub(this._tmpVector2).length()}resize(i){i.x==this._resolution.x&&i.y==this._resolution.y||(this._resolution.copy(i),this._resolutionInv.set(1/i.x,1/i.y,0,0),this.renderCamera.resize(this._resolution),this.postProcessPipeline.resize(i),this.updateCameraParams())}updateCameraParams(){this.renderCamera.aspect=this._resolution.x/this._resolution.y,this.renderCamera.near=.5,this.renderCamera.far=3e3,this.renderCamera.needsUpdateProjectionMatrix=!0}}const YP=`#version 300 es\r
void main( void ) {}\r
`,$P=`#include <common>\r
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
}`,VE=85,td=60*(8*2/VE);class qP extends xn{constructor(i){super(i);b(this,"power");b(this,"gl");b(this,"isAudioBufferReady",!1);b(this,"audioContext");b(this,"audioBuffer");b(this,"implusBuffer");b(this,"audioSrcNode");b(this,"convolverNode");b(this,"gainNode");b(this,"bufferLength");b(this,"blockLength");b(this,"numSampleBlocks");b(this,"bufferIn");b(this,"bufferL");b(this,"bufferR");b(this,"tmpOutputArrayL");b(this,"tmpOutputArrayR");b(this,"progress");b(this,"timeCode",0);b(this,"playStartTime",-1);b(this,"forcePlay",!1);b(this,"realtimeAnalyzer");b(this,"realtimeDataSize");b(this,"timeDomainArray");b(this,"timeDomainTexture");b(this,"frequencyArray");b(this,"frequencyTexture");b(this,"currentRender");this.power=PP,this.gl=this.power.gl,this.audioSrcNode=null,this.audioContext=new AudioContext,this.bufferLength=Math.floor(this.audioContext.sampleRate*td),this.progress=[0,0],this.blockLength=Math.min(512*512,this.bufferLength),this.numSampleBlocks=Math.ceil(this.audioContext.sampleRate*td/this.blockLength),this.tmpOutputArrayL=new Float32Array(this.blockLength),this.tmpOutputArrayR=new Float32Array(this.blockLength),this.audioBuffer=this.audioContext.createBuffer(2,this.bufferLength,this.audioContext.sampleRate),this.bufferIn=new rd(this.gl),this.bufferIn.setData(new Float32Array(new Array(this.blockLength).fill(0).map((o,c)=>c)),"vbo"),this.bufferL=new rd(this.gl),this.bufferL.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.bufferR=new rd(this.gl),this.bufferR.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.currentRender=this.render(),this.implusBuffer=this.audioContext.createBuffer(2,this.audioContext.sampleRate*1.5,this.audioContext.sampleRate);for(let o=0;o<this.implusBuffer.length;o++){const c=o/this.implusBuffer.length;this.implusBuffer.getChannelData(0)[o]=(Math.random()*2-1)*.9*Math.exp(-c*5),this.implusBuffer.getChannelData(1)[o]=(Math.random()*2-1)*.9*Math.exp(-c*5)}this.convolverNode=this.audioContext.createConvolver(),this.convolverNode.buffer=this.implusBuffer,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=1.3,this.realtimeDataSize=2048,this.realtimeAnalyzer=this.audioContext.createAnalyser(),this.realtimeAnalyzer.fftSize=this.realtimeDataSize,this.timeDomainArray=new Uint8Array(this.realtimeAnalyzer.fftSize),this.timeDomainTexture=new ze(this.gl),this.timeDomainTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.frequencyArray=new Uint8Array(this.realtimeAnalyzer.frequencyBinCount),this.frequencyTexture=new ze(this.gl),this.frequencyTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}static get key(){return"music"}render(){this.progress=[0,0],this.currentRender&&this.currentRender.stop(),this.stop(),this.isAudioBufferReady=!1;const i=new TE(this.gl),o=new lO(this.gl);o.setBuffer("left",this.bufferL,0),o.setBuffer("right",this.bufferR,1),o.bind(()=>{i.setShader(Nv(Fr("music",$P)),YP,{transformFeedbackVaryings:["o_left","o_right"]})}),i.setUniform("uDuration","1f",[td]),i.setUniform("uBPM","1f",[VE]),i.setUniform("uSampleRate","1f",[this.audioContext.sampleRate]);const c=i.getVAO();let d=!0;const u=()=>{d=!1};if(c){c.setAttribute("aTime",this.bufferIn,1);const x=Math.floor(this.timeCode/(this.bufferLength/this.audioBuffer.sampleRate/this.numSampleBlocks));(async()=>{for(let p=0;p<this.numSampleBlocks;p++){let _;if(p%2===0?_=x+Math.floor(p/2):_=x-Math.ceil(p/2),_>=this.numSampleBlocks?_=_-this.numSampleBlocks:_<0&&(_=_+this.numSampleBlocks),await new Promise(w=>{setTimeout(()=>{this.isAudioBufferReady=!0,w(null)},100)}),!d)return;i.setUniform("uTimeOffset","1f",[this.blockLength*_/this.audioContext.sampleRate]),i.use(()=>{i.uploadUniforms(),o.use(()=>{this.gl.beginTransformFeedback(this.gl.POINTS),this.gl.enable(this.gl.RASTERIZER_DISCARD),c.use(()=>{this.gl.drawArrays(this.gl.POINTS,0,c.vertCount)}),this.gl.disable(this.gl.RASTERIZER_DISCARD),this.gl.endTransformFeedback()}),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferL.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayL),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferR.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);for(let w=0;w<this.blockLength;w++){const T=_*this.blockLength+w,C=T<td*this.audioContext.sampleRate?1:0;this.audioBuffer.getChannelData(0)[T]=this.tmpOutputArrayL[w]*C,this.audioBuffer.getChannelData(1)[T]=this.tmpOutputArrayR[w]*C}}),this.progress=[p,this.numSampleBlocks-1],this.notice()}this._entity&&this._entity.noticeEventParent("update/music/complete",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture])})()}return{stop:u}}updateImpl(i){if(this.timeCode=i.timeCode,!i.playing||i.timeCode<0){this.stop();return}this.play(i.timeCode,this.forcePlay),this.forcePlay=!1,this.realtimeAnalyzer.getByteTimeDomainData(this.timeDomainArray),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.realtimeAnalyzer.getByteFrequencyData(this.frequencyArray),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}setEntityImpl(i){this.notice()}unsetEntityImpl(i){this.stop()}notice(){setTimeout(()=>{this._entity&&this._entity.noticeEventParent("update/music",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture,this.progress])},0)}play(i=0,o){this.audioSrcNode&&!o&&Math.abs(this.audioSrcNode.context.currentTime-this.playStartTime-i)<.1||(this.stop(),this.isAudioBufferReady&&(this.audioSrcNode=this.audioContext.createBufferSource(),this.audioSrcNode.buffer=this.audioBuffer,this.audioSrcNode.loop=!1,this.audioSrcNode.start(0,i),this.playStartTime=this.audioSrcNode.context.currentTime-(i||0),this.audioSrcNode.connect(this.gainNode),this.audioSrcNode.connect(this.convolverNode),this.convolverNode.connect(this.gainNode),this.gainNode.connect(this.audioContext.destination),this.gainNode.connect(this.realtimeAnalyzer)))}stop(){this.audioSrcNode&&(this.audioSrcNode.stop(),this.audioSrcNode.disconnect(this.gainNode),this.audioSrcNode=null),this.convolverNode&&this.convolverNode.disconnect()}dispose(){super.dispose(),this.stop(),this.frequencyTexture.dispose(),this.timeDomainTexture.dispose()}}const QP=`#include <common>
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

}`,KP=`#include <common>
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
	
}`;class ZP extends AE{constructor(l){const i=new ta({frag:Fr("orengineCubeFrag",QP),vert:Fr("orengineCubeVert",KP),uniforms:Qt.merge(ii.time,{uNoiseTex:{value:Dn.resources.getTexture("noise"),type:"1i"}})});super({...l,args:i})}}const JP=`#include <common>
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

}`,e3=`#include <common>
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
	
}`;class t3 extends AE{constructor(l){const i=new ta({frag:Fr("OREngineLogoMaterialFrag",JP),vert:Fr("OREngineLogoMaterialVert",e3),uniforms:ii.time,phase:["deferred","shadowMap"]});super({...l,args:i})}}const n3=`#include <common>\r
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
} `;class r3 extends xn{constructor(l){super(l);const i=this._entity.addComponent(Sr);i.geometry=new NE({radius:50,widthSegments:32,heightSegments:32}),i.material=new ta({phase:["deferred","envMap"],frag:Fr("skybox",n3),cullFace:!1,uniforms:Qt.merge(ii.time,ii.music)})}}class i3 extends xn{constructor(i){super(i);b(this,"speed");b(this,"rotQuaternion");this.speed=1,this.rotQuaternion=new Fa}updateImpl(i){this.rotQuaternion.setFromEuler(new Lv(0,-.4*i.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}}class a3 extends xn{constructor(i){super(i);b(this,"isLoading");b(this,"spzEntity");b(this,"spzController");this.isLoading=!1,this.spzEntity=null,this.spzController=null,this.loadSPZ("/racoonfamily.spz")}async loadSPZ(i){if(!this.isLoading){this.isLoading=!0;try{const c=await new sd(wt).load(i,{isCompressed:!0,sourceCoordinateSystem:Dv.RDF,antialias:!0});console.log("SPZ loaded:",c),this.spzEntity&&this.entity.remove(this.spzEntity),this.spzEntity=c.scene,this.entity.add(this.spzEntity),this.spzController=this.spzEntity.getComponent(Av)||null,this.spzEntity.position.set(0,0,-3),this.spzEntity.scale.set(.5,.5,.5)}catch(o){console.error("SPZ loading error:",o);try{const d=await new sd(wt).load(i,{isCompressed:!1,sourceCoordinateSystem:Dv.RDF,antialias:!0});this.spzEntity&&this.entity.remove(this.spzEntity),this.spzEntity=d.scene,this.entity.add(this.spzEntity),this.spzController=this.spzEntity.getComponent(Av)||null,this.spzEntity.position.set(0,0,-3),this.spzEntity.scale.set(.5,.5,.5)}catch(c){console.error("SPZ loading failed completely:",c)}}finally{this.isLoading=!1}}}update(i){super.update(i),this.spzEntity}dispose(){this.spzEntity&&(this.entity.remove(this.spzEntity),this.spzEntity=null,this.spzController=null),super.dispose()}}const o3=`#include <common>\r
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
} `,s3=`#include <common>\r
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
} `,fE=`#include <common>\r
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
} `;class l3 extends xn{constructor(i){super(i);b(this,"updateTextures");this.updateTextures=[];const c=Dn.getInstance(wt).renderer;Dn.resources.addTexture("noise",new ed(c,{frag:s3,resolution:new ee(1024,1024)})),Dn.resources.addTexture("noiseCyclic",new ed(c,{frag:fE,resolution:new ee(1024,1024)}));const d=new ed(c,{frag:o3,resolution:new ee(512,512)});d.setting({magFilter:wt.NEAREST,minFilter:wt.NEAREST}),d.render(),Dn.resources.addTexture("hash",d),this.updateTextures.push(Dn.resources.addTexture("noiseCyclic_anime",new ed(c,{frag:fE,uniforms:Dn.getInstance(wt).uniforms,resolution:new ee(512,512)}))),this.once("dispose",()=>{this.updateTextures.forEach(u=>{u.dispose()}),this.updateTextures=[]})}updateImpl(i){for(let o=0;o<this.updateTextures.length;o++)this.updateTextures[o].render()}}const u3=[[{axis:"x",k:[["B",[0,.039,-1,.039,1,.039]]]},{axis:"z",k:[["B",[0,8.832,-1,8.832,1,8.832]]]},{axis:"y",k:[["B",[0,1.525,-1,1.525,1,1.525]]]}],[{axis:"x",k:[["B",[0,-1.935,-25,-1.935,25,-1.935]],["B",[75,2.449,50,2.449,100,2.449]],["B",[150,-2,125,-2,175,-2]],["B",[225,2.207,200,2.207,250,2.207]],["B",[300,-1.935,275,-1.935,325,-1.935]]]},{axis:"z",k:[["B",[0,-1.031,-25,-1.031,25,-1.031]],["B",[75,-.957,50,-.984,100,-.931]],["B",[150,-.925,125,-.925,175,-.925]],["B",[225,-1.056,200,-1.056,250,-1.056]],["B",[300,-1.031,275,-1.031,325,-1.031]]]},{axis:"y",k:[["B",[0,1.875,-25,1.875,25,1.875]],["B",[75,.256,50,.474,100,.037]],["B",[150,.037,125,.037,175,.037]],["B",[225,1.984,200,1.984,250,1.984]],["B",[300,1.875,275,1.875,325,1.875]]]}]],c3={name:"root",parent:null,children:[{name:"CamDof",class:"",type:"empty",parent:"root",position:[0,1,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Camera",class:"",type:"camera",parent:"root",position:[.039,1.525,8.832],rotation:[1.571,0,0],scale:[1,1,1],visible:!0,param:{fov:21.908},animation:{position:0}},{name:"CamLook",class:"",type:"empty",parent:"root",position:[0,1.017,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Cube.001",class:"",type:"mesh",parent:"root",position:[-1.299,1.669,-1.024],rotation:[0,0,-0],scale:[.238,.238,.238],visible:!0,param:{position:"AACAvwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIA/AACAvwAAgL8AAIA/AACAPwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIA/AACAPwAAgD8AAIA/",normal:"AACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAA",uv:"AADAPgAAAAAAACA/AAAAAAAAID8AAIA+AADAPgAAgD4AAMA+AACAPgAAID8AAIA+AAAgPwAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAAD8AACA/AABAPwAAwD4AAEA/AADAPgAAQD8AACA/AABAPwAAID8AAIA/AADAPgAAgD8AAAA+AAAAPwAAwD4AAAA/AADAPgAAQD8AAAA+AABAPwAAID8AAAA/AABgPwAAAD8AAGA/AABAPwAAID8AAEA/",index:"AAABAAIAAAACAAMABAAFAAYABAAGAAcACAAJAAoACAAKAAsADAANAA4ADAAOAA8AEAARABIAEAASABMAFAAVABYAFAAWABcA"},animation:{position:1}},{name:"OREngine",class:"",type:"gltf",parent:"root",position:[0,1.063,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"OREngineCube",class:"",type:"cube",parent:"root",position:[0,.96,-3.209],rotation:[.166,.754,.158],scale:[2.3,2.3,2.3],visible:!0,param:{x:1,y:1,z:1}},{name:"SkyBox",class:"",type:"empty",parent:"root",position:[0,0,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"Spot.001",class:"",type:"light",parent:"root",position:[7.6,7.343,4.754],rotation:[.814,.6,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:3,type:"spot",angle:.611,blend:1}},{name:"Spot.002",class:"",type:"light",parent:"root",position:[-13.676,-15.599,-.377],rotation:[1.02,-1.854,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:2,type:"spot",angle:.691,blend:1}}],type:"empty",visible:!0},f3={start:1,end:300,fps:30,playing:!1},d3={animations:u3,root:c3,frame:f3};class h3 extends xn{constructor(i){super(i);b(this,"blidge");b(this,"type");b(this,"blidgeRoot");b(this,"entities");b(this,"connection");b(this,"useGLTF");b(this,"gltfPath");this.entities=new Map,this.type="websocket",this.connection={enabled:!0,url:"ws://localhost:3100"},this.useGLTF=!1,this.gltfPath="/OREngine/develop//scene.glb",this.blidgeRoot=null,this.blidge=new RO(wt);const o=this.onSyncScene.bind(this),c=x=>{this.entity&&this.entity.noticeEventParent("update/blidge/frame",[x])};this.blidge.on("sync/scene",o),this.blidge.on("sync/timeline",c),this.once("dispose",()=>{this.blidge.off("sync/scene",o),this.blidge.off("sync/timeline",c)});const d=async()=>{this.type=="json"?(await this.blidge.loadScene(d3,this.useGLTF?this.gltfPath:void 0),this.emit("loaded")):this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field("mode",()=>this.type,x=>{this.type=x,d()},{format:{type:"select",list:["websocket","json"]}}),this.field("gltf",()=>this.useGLTF,x=>{this.useGLTF=x,d()}),this.field("gltfPath",()=>this.gltfPath,x=>{this.gltfPath=x,d()});const u=this.fieldDir("websocket",{hidden:()=>this.type!="websocket"});u.field("reconnect",()=>()=>d(),void 0,{label:"Reconnect"}),u.field("url",()=>this.connection.url,x=>this.connection.url=x)}onSyncScene(i){const o=new Date().getTime(),c=u=>{const x=this.entities.get(u.name)||new Br;if(u.type=="camera"){const v=u.param;x.userData.cameraParam=v}return x.removeComponent(Ou),x.addComponent(Ou,{blidge:i,node:u}),u.children.forEach(v=>{const p=c(v);x.add(p)}),this.entities.set(x.name,x),x.userData.updateTime=o,x},d=i.root&&c(i.root);d&&(d.name="blidgeRoot",this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=d,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(u=>{if(u.userData.updateTime!=o){const x=u.parent;x&&x.remove(u),u.dispose(),this.entities.delete(u.name)}}),this.entity&&(this.entity.noticeEventChilds("sceneCreated",[this.blidgeRoot]),this.entity.noticeEventParent("update/blidge/scene",[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),this.blidgeRoot=null)}}class m3 extends xn{constructor(l){super(l)}updateImpl(l){ii.time.uTime.value=l.timeCode,ii.time.uTimeF.value=l.timeCode%1,ii.time.uTimeE.value=l.timeElapsed,ii.time.uTimeEF.value=l.timeElapsed%1,ii.resolution.uAspectRatio.value=l.resolution.x/l.resolution.y}}const dE={Camera:{MainCamera:XP},DemoProject:{DemoMusic:qP,OREngineCubeMaterial:ZP,OREngineLogoMaterial:t3,SkyBox:r3},ObjectControls:{ShakeViewer:FE,LookAt:ud,ObjectRotate:i3,OrbitControls:BE},Samples:{SPZModel:a3},Texture:{TextureGenerator:l3},Utilities:{BLidgeClient:h3,UniformControls:m3}},p3=()=>{Dn.resources.clear();const h=(o,c)=>{const d=Object.keys(o);for(let u=0;u<d.length;u++){const x=d[u],v=o[x];if(typeof v=="function")c.addComponent(x,v);else{const p=c.createGroup(x);h(v,p)}}};Dn.resources.addComponentGroup("Light").addComponent("Light",Ts);const i=Object.keys(dE);for(let o=0;o<i.length;o++){const c=i[o],d=dE[c],u=Dn.resources.addComponentGroup(c);h(d,u)}},v3="orengine/";class g3 extends yn{constructor(){super()}set(l,i){try{const o=JSON.stringify(i);return localStorage.setItem(v3+l,o),fetch("/api/data/save/"+l,{method:"POST",headers:{"Content-Type":"application/json"},body:o})}catch(o){return console.error(o),Promise.reject(o)}}async get(l){try{return await(await fetch("/api/data/get/"+l)).json()}catch{return}}}const nd=new g3;p3();const y3=()=>{const[h,l]=X.useState(),[i,o]=X.useState();return X.useEffect(()=>{nd.get("scene.json").then(c=>{c&&l(c)}),nd.get("editor.json").then(c=>{c&&o(c)}),l(MP)},[]),E.jsxDEV(wP,{gl:wt,project:h,children:E.jsxDEV(SP,{editorData:i,onSave:(c,d)=>{nd.set("scene.json",c),nd.set("editor.json",d)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/components/pages/EditorPage/index.tsx",lineNumber:48,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/components/pages/EditorPage/index.tsx",lineNumber:47,columnNumber:3},void 0)};_v.createRoot(document.getElementById("root")).render(E.jsxDEV(E.Fragment,{children:E.jsxDEV(y3,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/pages/main.tsx",lineNumber:10,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/pages/main.tsx",lineNumber:8,columnNumber:2},void 0));
