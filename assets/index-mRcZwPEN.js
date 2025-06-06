var eO=Object.defineProperty;var tO=(h,l,a)=>l in h?eO(h,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):h[l]=a;var b=(h,l,a)=>tO(h,typeof l!="symbol"?l+"":l,a);(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(c){if(c.ep)return;c.ep=!0;const d=a(c);fetch(c.href,d)}})();function nO(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var uE={exports:{}},Ev={},cE={exports:{}},ad={exports:{}};ad.exports;(function(h,l){/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var a="18.3.1",o=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),p=Symbol.for("react.context"),_=Symbol.for("react.forward_ref"),T=Symbol.for("react.suspense"),C=Symbol.for("react.suspense_list"),w=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),W=Symbol.for("react.offscreen"),$=Symbol.iterator,X="@@iterator";function M(y){if(y===null||typeof y!="object")return null;var N=$&&y[$]||y[X];return typeof N=="function"?N:null}var Y={current:null},oe={transition:null},j={current:null,isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},ne={current:null},K={},me=null;function _e(y){me=y}K.setExtraStackFrame=function(y){me=y},K.getCurrentStack=null,K.getStackAddendum=function(){var y="";me&&(y+=me);var N=K.getCurrentStack;return N&&(y+=N()||""),y};var ye=!1,pe=!1,ct=!1,we=!1,be=!1,_t={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:oe,ReactCurrentOwner:ne};_t.ReactDebugCurrentFrame=K,_t.ReactCurrentActQueue=j;function St(y){{for(var N=arguments.length,U=new Array(N>1?N-1:0),F=1;F<N;F++)U[F-1]=arguments[F];Ht("warn",y,U)}}function ke(y){{for(var N=arguments.length,U=new Array(N>1?N-1:0),F=1;F<N;F++)U[F-1]=arguments[F];Ht("error",y,U)}}function Ht(y,N,U){{var F=_t.ReactDebugCurrentFrame,ee=F.getStackAddendum();ee!==""&&(N+="%s",U=U.concat([ee]));var Ce=U.map(function(he){return String(he)});Ce.unshift("Warning: "+N),Function.prototype.apply.call(console[y],console,Ce)}}var xr={};function Hn(y,N){{var U=y.constructor,F=U&&(U.displayName||U.name)||"ReactClass",ee=F+"."+N;if(xr[ee])return;ke("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",N,F),xr[ee]=!0}}var Gn={isMounted:function(y){return!1},enqueueForceUpdate:function(y,N,U){Hn(y,"forceUpdate")},enqueueReplaceState:function(y,N,U,F){Hn(y,"replaceState")},enqueueSetState:function(y,N,U,F){Hn(y,"setState")}},zt=Object.assign,fn={};Object.freeze(fn);function tr(y,N,U){this.props=y,this.context=N,this.refs=fn,this.updater=U||Gn}tr.prototype.isReactComponent={},tr.prototype.setState=function(y,N){if(typeof y!="object"&&typeof y!="function"&&y!=null)throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,y,N,"setState")},tr.prototype.forceUpdate=function(y){this.updater.enqueueForceUpdate(this,y,"forceUpdate")};{var ai={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},Lr=function(y,N){Object.defineProperty(tr.prototype,y,{get:function(){St("%s(...) is deprecated in plain JavaScript React classes. %s",N[0],N[1])}})};for(var zr in ai)ai.hasOwnProperty(zr)&&Lr(zr,ai[zr])}function br(){}br.prototype=tr.prototype;function dn(y,N,U){this.props=y,this.context=N,this.refs=fn,this.updater=U||Gn}var Xn=dn.prototype=new br;Xn.constructor=dn,zt(Xn,tr.prototype),Xn.isPureReactComponent=!0;function nr(){var y={current:null};return Object.seal(y),y}var rr=Array.isArray;function Ut(y){return rr(y)}function _n(y){{var N=typeof Symbol=="function"&&Symbol.toStringTag,U=N&&y[Symbol.toStringTag]||y.constructor.name||"Object";return U}}function nn(y){try{return Gt(y),!1}catch{return!0}}function Gt(y){return""+y}function Xt(y){if(nn(y))return ke("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",_n(y)),Gt(y)}function ir(y,N,U){var F=y.displayName;if(F)return F;var ee=N.displayName||N.name||"";return ee!==""?U+"("+ee+")":U}function Er(y){return y.displayName||"Context"}function Wn(y){if(y==null)return null;if(typeof y.tag=="number"&&ke("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof y=="function")return y.displayName||y.name||null;if(typeof y=="string")return y;switch(y){case d:return"Fragment";case c:return"Portal";case x:return"Profiler";case u:return"StrictMode";case T:return"Suspense";case C:return"SuspenseList"}if(typeof y=="object")switch(y.$$typeof){case p:var N=y;return Er(N)+".Consumer";case g:var U=y;return Er(U._context)+".Provider";case _:return ir(y,y.render,"ForwardRef");case w:var F=y.displayName||null;return F!==null?F:Wn(y.type)||"Memo";case k:{var ee=y,Ce=ee._payload,he=ee._init;try{return Wn(he(Ce))}catch{return null}}}return null}var Ur=Object.prototype.hasOwnProperty,Rr={key:!0,ref:!0,__self:!0,__source:!0},Pn,_r,Sn;Sn={};function ar(y){if(Ur.call(y,"ref")){var N=Object.getOwnPropertyDescriptor(y,"ref").get;if(N&&N.isReactWarning)return!1}return y.ref!==void 0}function Mt(y){if(Ur.call(y,"key")){var N=Object.getOwnPropertyDescriptor(y,"key").get;if(N&&N.isReactWarning)return!1}return y.key!==void 0}function Sr(y,N){var U=function(){Pn||(Pn=!0,ke("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",N))};U.isReactWarning=!0,Object.defineProperty(y,"key",{get:U,configurable:!0})}function Ci(y,N){var U=function(){_r||(_r=!0,ke("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",N))};U.isReactWarning=!0,Object.defineProperty(y,"ref",{get:U,configurable:!0})}function Ti(y){if(typeof y.ref=="string"&&ne.current&&y.__self&&ne.current.stateNode!==y.__self){var N=Wn(ne.current.type);Sn[N]||(ke('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',N,y.ref),Sn[N]=!0)}}var re=function(y,N,U,F,ee,Ce,he){var Ae={$$typeof:o,type:y,key:N,ref:U,props:he,_owner:Ce};return Ae._store={},Object.defineProperty(Ae._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Ae,"_self",{configurable:!1,enumerable:!1,writable:!1,value:F}),Object.defineProperty(Ae,"_source",{configurable:!1,enumerable:!1,writable:!1,value:ee}),Object.freeze&&(Object.freeze(Ae.props),Object.freeze(Ae)),Ae};function ge(y,N,U){var F,ee={},Ce=null,he=null,Ae=null,He=null;if(N!=null){ar(N)&&(he=N.ref,Ti(N)),Mt(N)&&(Xt(N.key),Ce=""+N.key),Ae=N.__self===void 0?null:N.__self,He=N.__source===void 0?null:N.__source;for(F in N)Ur.call(N,F)&&!Rr.hasOwnProperty(F)&&(ee[F]=N[F])}var at=arguments.length-2;if(at===1)ee.children=U;else if(at>1){for(var dt=Array(at),mt=0;mt<at;mt++)dt[mt]=arguments[mt+2];Object.freeze&&Object.freeze(dt),ee.children=dt}if(y&&y.defaultProps){var bt=y.defaultProps;for(F in bt)ee[F]===void 0&&(ee[F]=bt[F])}if(Ce||he){var At=typeof y=="function"?y.displayName||y.name||"Unknown":y;Ce&&Sr(ee,At),he&&Ci(ee,At)}return re(y,Ce,he,Ae,He,ne.current,ee)}function Be(y,N){var U=re(y.type,N,y.ref,y._self,y._source,y._owner,y.props);return U}function rt(y,N,U){if(y==null)throw new Error("React.cloneElement(...): The argument must be a React element, but you passed "+y+".");var F,ee=zt({},y.props),Ce=y.key,he=y.ref,Ae=y._self,He=y._source,at=y._owner;if(N!=null){ar(N)&&(he=N.ref,at=ne.current),Mt(N)&&(Xt(N.key),Ce=""+N.key);var dt;y.type&&y.type.defaultProps&&(dt=y.type.defaultProps);for(F in N)Ur.call(N,F)&&!Rr.hasOwnProperty(F)&&(N[F]===void 0&&dt!==void 0?ee[F]=dt[F]:ee[F]=N[F])}var mt=arguments.length-2;if(mt===1)ee.children=U;else if(mt>1){for(var bt=Array(mt),At=0;At<mt;At++)bt[At]=arguments[At+2];ee.children=bt}return re(y.type,Ce,he,Ae,He,at,ee)}function it(y){return typeof y=="object"&&y!==null&&y.$$typeof===o}var Wt=".",kt=":";function $n(y){var N=/[=:]/g,U={"=":"=0",":":"=2"},F=y.replace(N,function(ee){return U[ee]});return"$"+F}var ft=!1,or=/\/+/g;function yt(y){return y.replace(or,"$&/")}function xt(y,N){return typeof y=="object"&&y!==null&&y.key!=null?(Xt(y.key),$n(""+y.key)):N.toString(36)}function oi(y,N,U,F,ee){var Ce=typeof y;(Ce==="undefined"||Ce==="boolean")&&(y=null);var he=!1;if(y===null)he=!0;else switch(Ce){case"string":case"number":he=!0;break;case"object":switch(y.$$typeof){case o:case c:he=!0}}if(he){var Ae=y,He=ee(Ae),at=F===""?Wt+xt(Ae,0):F;if(Ut(He)){var dt="";at!=null&&(dt=yt(at)+"/"),oi(He,N,dt,"",function(md){return md})}else He!=null&&(it(He)&&(He.key&&(!Ae||Ae.key!==He.key)&&Xt(He.key),He=Be(He,U+(He.key&&(!Ae||Ae.key!==He.key)?yt(""+He.key)+"/":"")+at)),N.push(He));return 1}var mt,bt,At=0,Ze=F===""?Wt:F+kt;if(Ut(y))for(var ua=0;ua<y.length;ua++)mt=y[ua],bt=Ze+xt(mt,ua),At+=oi(mt,N,U,bt,ee);else{var Do=M(y);if(typeof Do=="function"){var Ws=y;Do===Ws.entries&&(ft||St("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ft=!0);for(var dd=Do.call(Ws),Mi,$s=0;!(Mi=dd.next()).done;)mt=Mi.value,bt=Ze+xt(mt,$s++),At+=oi(mt,N,U,bt,ee)}else if(Ce==="object"){var Ys=String(y);throw new Error("Objects are not valid as a React child (found: "+(Ys==="[object Object]"?"object with keys {"+Object.keys(y).join(", ")+"}":Ys)+"). If you meant to render a collection of children, use an array instead.")}}return At}function Br(y,N,U){if(y==null)return y;var F=[],ee=0;return oi(y,F,"","",function(Ce){return N.call(U,Ce,ee++)}),F}function Ua(y){var N=0;return Br(y,function(){N++}),N}function So(y,N,U){Br(y,function(){N.apply(this,arguments)},U)}function Ds(y){return Br(y,function(N){return N})||[]}function Ba(y){if(!it(y))throw new Error("React.Children.only expected to receive a single React element child.");return y}function Fa(y){var N={$$typeof:p,_currentValue:y,_currentValue2:y,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};N.Provider={$$typeof:g,_context:N};var U=!1,F=!1,ee=!1;{var Ce={$$typeof:p,_context:N};Object.defineProperties(Ce,{Provider:{get:function(){return F||(F=!0,ke("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),N.Provider},set:function(he){N.Provider=he}},_currentValue:{get:function(){return N._currentValue},set:function(he){N._currentValue=he}},_currentValue2:{get:function(){return N._currentValue2},set:function(he){N._currentValue2=he}},_threadCount:{get:function(){return N._threadCount},set:function(he){N._threadCount=he}},Consumer:{get:function(){return U||(U=!0,ke("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),N.Consumer}},displayName:{get:function(){return N.displayName},set:function(he){ee||(St("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",he),ee=!0)}}}),N.Consumer=Ce}return N._currentRenderer=null,N._currentRenderer2=null,N}var Ni=-1,ta=0,Ai=1,si=2;function Fr(y){if(y._status===Ni){var N=y._result,U=N();if(U.then(function(Ce){if(y._status===ta||y._status===Ni){var he=y;he._status=Ai,he._result=Ce}},function(Ce){if(y._status===ta||y._status===Ni){var he=y;he._status=si,he._result=Ce}}),y._status===Ni){var F=y;F._status=ta,F._result=U}}if(y._status===Ai){var ee=y._result;return ee===void 0&&ke(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,ee),"default"in ee||ke(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,ee),ee.default}else throw y._result}function A(y){var N={_status:Ni,_result:y},U={$$typeof:k,_payload:N,_init:Fr};{var F,ee;Object.defineProperties(U,{defaultProps:{configurable:!0,get:function(){return F},set:function(Ce){ke("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),F=Ce,Object.defineProperty(U,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return ee},set:function(Ce){ke("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),ee=Ce,Object.defineProperty(U,"propTypes",{enumerable:!0})}}})}return U}function Q(y){y!=null&&y.$$typeof===w?ke("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):typeof y!="function"?ke("forwardRef requires a render function but was given %s.",y===null?"null":typeof y):y.length!==0&&y.length!==2&&ke("forwardRef render functions accept exactly two parameters: props and ref. %s",y.length===1?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),y!=null&&(y.defaultProps!=null||y.propTypes!=null)&&ke("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var N={$$typeof:_,render:y};{var U;Object.defineProperty(N,"displayName",{enumerable:!1,configurable:!0,get:function(){return U},set:function(F){U=F,!y.name&&!y.displayName&&(y.displayName=F)}})}return N}var ie;ie=Symbol.for("react.module.reference");function Re(y){return!!(typeof y=="string"||typeof y=="function"||y===d||y===x||be||y===u||y===T||y===C||we||y===W||ye||pe||ct||typeof y=="object"&&y!==null&&(y.$$typeof===k||y.$$typeof===w||y.$$typeof===g||y.$$typeof===p||y.$$typeof===_||y.$$typeof===ie||y.getModuleId!==void 0))}function je(y,N){Re(y)||ke("memo: The first argument must be a component. Instead received: %s",y===null?"null":typeof y);var U={$$typeof:w,type:y,compare:N===void 0?null:N};{var F;Object.defineProperty(U,"displayName",{enumerable:!1,configurable:!0,get:function(){return F},set:function(ee){F=ee,!y.name&&!y.displayName&&(y.displayName=ee)}})}return U}function Ne(){var y=Y.current;return y===null&&ke(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`),y}function Ue(y){var N=Ne();if(y._context!==void 0){var U=y._context;U.Consumer===y?ke("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):U.Provider===y&&ke("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return N.useContext(y)}function Le(y){var N=Ne();return N.useState(y)}function wt(y,N,U){var F=Ne();return F.useReducer(y,N,U)}function Fe(y){var N=Ne();return N.useRef(y)}function Rt(y,N){var U=Ne();return U.useEffect(y,N)}function wn(y,N){var U=Ne();return U.useInsertionEffect(y,N)}function Vr(y,N){var U=Ne();return U.useLayoutEffect(y,N)}function Ir(y,N){var U=Ne();return U.useCallback(y,N)}function rn(y,N){var U=Ne();return U.useMemo(y,N)}function Va(y,N,U){var F=Ne();return F.useImperativeHandle(y,N,U)}function wo(y,N){{var U=Ne();return U.useDebugValue(y,N)}}function Ms(){var y=Ne();return y.useTransition()}function Oi(y){var N=Ne();return N.useDeferredValue(y)}function Ie(){var y=Ne();return y.useId()}function Ia(y,N,U){var F=Ne();return F.useSyncExternalStore(y,N,U)}var na=0,ks,Ps,Ls,zs,Us,Bs,Fs;function ku(){}ku.__reactDisabledLog=!0;function ud(){{if(na===0){ks=console.log,Ps=console.info,Ls=console.warn,zs=console.error,Us=console.group,Bs=console.groupCollapsed,Fs=console.groupEnd;var y={configurable:!0,enumerable:!0,value:ku,writable:!0};Object.defineProperties(console,{info:y,log:y,warn:y,error:y,group:y,groupCollapsed:y,groupEnd:y})}na++}}function Vs(){{if(na--,na===0){var y={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:zt({},y,{value:ks}),info:zt({},y,{value:Ps}),warn:zt({},y,{value:Ls}),error:zt({},y,{value:zs}),group:zt({},y,{value:Us}),groupCollapsed:zt({},y,{value:Bs}),groupEnd:zt({},y,{value:Fs})})}na<0&&ke("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var ja=_t.ReactCurrentDispatcher,wr;function ra(y,N,U){{if(wr===void 0)try{throw Error()}catch(ee){var F=ee.stack.trim().match(/\n( *(at )?)/);wr=F&&F[1]||""}return`
`+wr+y}}var ia=!1,Co;{var Is=typeof WeakMap=="function"?WeakMap:Map;Co=new Is}function Pu(y,N){if(!y||ia)return"";{var U=Co.get(y);if(U!==void 0)return U}var F;ia=!0;var ee=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Ce;Ce=ja.current,ja.current=null,ud();try{if(N){var he=function(){throw Error()};if(Object.defineProperty(he.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(he,[])}catch(Ze){F=Ze}Reflect.construct(y,[],he)}else{try{he.call()}catch(Ze){F=Ze}y.call(he.prototype)}}else{try{throw Error()}catch(Ze){F=Ze}y()}}catch(Ze){if(Ze&&F&&typeof Ze.stack=="string"){for(var Ae=Ze.stack.split(`
`),He=F.stack.split(`
`),at=Ae.length-1,dt=He.length-1;at>=1&&dt>=0&&Ae[at]!==He[dt];)dt--;for(;at>=1&&dt>=0;at--,dt--)if(Ae[at]!==He[dt]){if(at!==1||dt!==1)do if(at--,dt--,dt<0||Ae[at]!==He[dt]){var mt=`
`+Ae[at].replace(" at new "," at ");return y.displayName&&mt.includes("<anonymous>")&&(mt=mt.replace("<anonymous>",y.displayName)),typeof y=="function"&&Co.set(y,mt),mt}while(at>=1&&dt>=0);break}}}finally{ia=!1,ja.current=Ce,Vs(),Error.prepareStackTrace=ee}var bt=y?y.displayName||y.name:"",At=bt?ra(bt):"";return typeof y=="function"&&Co.set(y,At),At}function js(y,N,U){return Pu(y,!1)}function cd(y){var N=y.prototype;return!!(N&&N.isReactComponent)}function aa(y,N,U){if(y==null)return"";if(typeof y=="function")return Pu(y,cd(y));if(typeof y=="string")return ra(y);switch(y){case T:return ra("Suspense");case C:return ra("SuspenseList")}if(typeof y=="object")switch(y.$$typeof){case _:return js(y.render);case w:return aa(y.type,N,U);case k:{var F=y,ee=F._payload,Ce=F._init;try{return aa(Ce(ee),N,U)}catch{}}}return""}var Lu={},Hs=_t.ReactDebugCurrentFrame;function To(y){if(y){var N=y._owner,U=aa(y.type,y._source,N?N.type:null);Hs.setExtraStackFrame(U)}else Hs.setExtraStackFrame(null)}function zu(y,N,U,F,ee){{var Ce=Function.call.bind(Ur);for(var he in y)if(Ce(y,he)){var Ae=void 0;try{if(typeof y[he]!="function"){var He=Error((F||"React class")+": "+U+" type `"+he+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof y[he]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw He.name="Invariant Violation",He}Ae=y[he](N,he,F,U,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(at){Ae=at}Ae&&!(Ae instanceof Error)&&(To(ee),ke("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",F||"React class",U,he,typeof Ae),To(null)),Ae instanceof Error&&!(Ae.message in Lu)&&(Lu[Ae.message]=!0,To(ee),ke("Failed %s type: %s",U,Ae.message),To(null))}}}function qe(y){if(y){var N=y._owner,U=aa(y.type,y._source,N?N.type:null);_e(U)}else _e(null)}var Gs;Gs=!1;function Xs(){if(ne.current){var y=Wn(ne.current.type);if(y)return`

Check the render method of \``+y+"`."}return""}function Pe(y){if(y!==void 0){var N=y.fileName.replace(/^.*[\\\/]/,""),U=y.lineNumber;return`

Check your code at `+N+":"+U+"."}return""}function Uu(y){return y!=null?Pe(y.__source):""}var Cn={};function Ha(y){var N=Xs();if(!N){var U=typeof y=="string"?y:y.displayName||y.name;U&&(N=`

Check the top-level render call using <`+U+">.")}return N}function oa(y,N){if(!(!y._store||y._store.validated||y.key!=null)){y._store.validated=!0;var U=Ha(N);if(!Cn[U]){Cn[U]=!0;var F="";y&&y._owner&&y._owner!==ne.current&&(F=" It was passed a child from "+Wn(y._owner.type)+"."),qe(y),ke('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',U,F),qe(null)}}}function Bu(y,N){if(typeof y=="object"){if(Ut(y))for(var U=0;U<y.length;U++){var F=y[U];it(F)&&oa(F,N)}else if(it(y))y._store&&(y._store.validated=!0);else if(y){var ee=M(y);if(typeof ee=="function"&&ee!==y.entries)for(var Ce=ee.call(y),he;!(he=Ce.next()).done;)it(he.value)&&oa(he.value,N)}}}function an(y){{var N=y.type;if(N==null||typeof N=="string")return;var U;if(typeof N=="function")U=N.propTypes;else if(typeof N=="object"&&(N.$$typeof===_||N.$$typeof===w))U=N.propTypes;else return;if(U){var F=Wn(N);zu(U,y.props,"prop",F,y)}else if(N.PropTypes!==void 0&&!Gs){Gs=!0;var ee=Wn(N);ke("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",ee||"Unknown")}typeof N.getDefaultProps=="function"&&!N.getDefaultProps.isReactClassApproved&&ke("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function Ct(y){{for(var N=Object.keys(y.props),U=0;U<N.length;U++){var F=N[U];if(F!=="children"&&F!=="key"){qe(y),ke("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",F),qe(null);break}}y.ref!==null&&(qe(y),ke("Invalid attribute `ref` supplied to `React.Fragment`."),qe(null))}}function Fu(y,N,U){var F=Re(y);if(!F){var ee="";(y===void 0||typeof y=="object"&&y!==null&&Object.keys(y).length===0)&&(ee+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var Ce=Uu(N);Ce?ee+=Ce:ee+=Xs();var he;y===null?he="null":Ut(y)?he="array":y!==void 0&&y.$$typeof===o?(he="<"+(Wn(y.type)||"Unknown")+" />",ee=" Did you accidentally export a JSX literal instead of a component?"):he=typeof y,ke("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",he,ee)}var Ae=ge.apply(this,arguments);if(Ae==null)return Ae;if(F)for(var He=2;He<arguments.length;He++)Bu(arguments[He],y);return y===d?Ct(Ae):an(Ae),Ae}var sr=!1;function Yn(y){var N=Fu.bind(null,y);return N.type=y,sr||(sr=!0,St("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(N,"type",{enumerable:!1,get:function(){return St("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:y}),y}}),N}function li(y,N,U){for(var F=rt.apply(this,arguments),ee=2;ee<arguments.length;ee++)Bu(arguments[ee],F.type);return an(F),F}function fd(y,N){var U=oe.transition;oe.transition={};var F=oe.transition;oe.transition._updatedFibers=new Set;try{y()}finally{if(oe.transition=U,U===null&&F._updatedFibers){var ee=F._updatedFibers.size;ee>10&&St("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),F._updatedFibers.clear()}}}var No=!1,Ga=null;function Vu(y){if(Ga===null)try{var N=("require"+Math.random()).slice(0,7),U=h&&h[N];Ga=U.call(h,"timers").setImmediate}catch{Ga=function(ee){No===!1&&(No=!0,typeof MessageChannel>"u"&&ke("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var Ce=new MessageChannel;Ce.port1.onmessage=ee,Ce.port2.postMessage(void 0)}}return Ga(y)}var sa=0,Iu=!1;function ju(y){{var N=sa;sa++,j.current===null&&(j.current=[]);var U=j.isBatchingLegacy,F;try{if(j.isBatchingLegacy=!0,F=y(),!U&&j.didScheduleLegacyUpdate){var ee=j.current;ee!==null&&(j.didScheduleLegacyUpdate=!1,Oo(ee))}}catch(bt){throw Di(N),bt}finally{j.isBatchingLegacy=U}if(F!==null&&typeof F=="object"&&typeof F.then=="function"){var Ce=F,he=!1,Ae={then:function(bt,At){he=!0,Ce.then(function(Ze){Di(N),sa===0?Ao(Ze,bt,At):bt(Ze)},function(Ze){Di(N),At(Ze)})}};return!Iu&&typeof Promise<"u"&&Promise.resolve().then(function(){}).then(function(){he||(Iu=!0,ke("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),Ae}else{var He=F;if(Di(N),sa===0){var at=j.current;at!==null&&(Oo(at),j.current=null);var dt={then:function(bt,At){j.current===null?(j.current=[],Ao(He,bt,At)):bt(He)}};return dt}else{var mt={then:function(bt,At){bt(He)}};return mt}}}}function Di(y){y!==sa-1&&ke("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),sa=y}function Ao(y,N,U){{var F=j.current;if(F!==null)try{Oo(F),Vu(function(){F.length===0?(j.current=null,N(y)):Ao(y,N,U)})}catch(ee){U(ee)}else N(y)}}var la=!1;function Oo(y){if(!la){la=!0;var N=0;try{for(;N<y.length;N++){var U=y[N];do U=U(!0);while(U!==null)}y.length=0}catch(F){throw y=y.slice(N+1),F}finally{la=!1}}}var Hu=Fu,Gu=li,Xu=Yn,Wu={map:Br,forEach:So,count:Ua,toArray:Ds,only:Ba};l.Children=Wu,l.Component=tr,l.Fragment=d,l.Profiler=x,l.PureComponent=dn,l.StrictMode=u,l.Suspense=T,l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_t,l.act=ju,l.cloneElement=Gu,l.createContext=Fa,l.createElement=Hu,l.createFactory=Xu,l.createRef=nr,l.forwardRef=Q,l.isValidElement=it,l.lazy=A,l.memo=je,l.startTransition=fd,l.unstable_act=ju,l.useCallback=Ir,l.useContext=Ue,l.useDebugValue=wo,l.useDeferredValue=Oi,l.useEffect=Rt,l.useId=Ie,l.useImperativeHandle=Va,l.useInsertionEffect=wn,l.useLayoutEffect=Vr,l.useMemo=rn,l.useReducer=wt,l.useRef=Fe,l.useState=Le,l.useSyncExternalStore=Ia,l.useTransition=Ms,l.version=a,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()})(ad,ad.exports);var rO=ad.exports;cE.exports=rO;var G=cE.exports;const Mu=nO(G);/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){var h=G,l=Symbol.for("react.element"),a=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),u=Symbol.for("react.provider"),x=Symbol.for("react.context"),g=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),_=Symbol.for("react.suspense_list"),T=Symbol.for("react.memo"),C=Symbol.for("react.lazy"),w=Symbol.for("react.offscreen"),k=Symbol.iterator,W="@@iterator";function $(A){if(A===null||typeof A!="object")return null;var Q=k&&A[k]||A[W];return typeof Q=="function"?Q:null}var X=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function M(A){{for(var Q=arguments.length,ie=new Array(Q>1?Q-1:0),Re=1;Re<Q;Re++)ie[Re-1]=arguments[Re];Y("error",A,ie)}}function Y(A,Q,ie){{var Re=X.ReactDebugCurrentFrame,je=Re.getStackAddendum();je!==""&&(Q+="%s",ie=ie.concat([je]));var Ne=ie.map(function(Ue){return String(Ue)});Ne.unshift("Warning: "+Q),Function.prototype.apply.call(console[A],console,Ne)}}var oe=!1,j=!1,ne=!1,K=!1,me=!1,_e;_e=Symbol.for("react.module.reference");function ye(A){return!!(typeof A=="string"||typeof A=="function"||A===o||A===d||me||A===c||A===p||A===_||K||A===w||oe||j||ne||typeof A=="object"&&A!==null&&(A.$$typeof===C||A.$$typeof===T||A.$$typeof===u||A.$$typeof===x||A.$$typeof===g||A.$$typeof===_e||A.getModuleId!==void 0))}function pe(A,Q,ie){var Re=A.displayName;if(Re)return Re;var je=Q.displayName||Q.name||"";return je!==""?ie+"("+je+")":ie}function ct(A){return A.displayName||"Context"}function we(A){if(A==null)return null;if(typeof A.tag=="number"&&M("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof A=="function")return A.displayName||A.name||null;if(typeof A=="string")return A;switch(A){case o:return"Fragment";case a:return"Portal";case d:return"Profiler";case c:return"StrictMode";case p:return"Suspense";case _:return"SuspenseList"}if(typeof A=="object")switch(A.$$typeof){case x:var Q=A;return ct(Q)+".Consumer";case u:var ie=A;return ct(ie._context)+".Provider";case g:return pe(A,A.render,"ForwardRef");case T:var Re=A.displayName||null;return Re!==null?Re:we(A.type)||"Memo";case C:{var je=A,Ne=je._payload,Ue=je._init;try{return we(Ue(Ne))}catch{return null}}}return null}var be=Object.assign,_t=0,St,ke,Ht,xr,Hn,Gn,zt;function fn(){}fn.__reactDisabledLog=!0;function tr(){{if(_t===0){St=console.log,ke=console.info,Ht=console.warn,xr=console.error,Hn=console.group,Gn=console.groupCollapsed,zt=console.groupEnd;var A={configurable:!0,enumerable:!0,value:fn,writable:!0};Object.defineProperties(console,{info:A,log:A,warn:A,error:A,group:A,groupCollapsed:A,groupEnd:A})}_t++}}function ai(){{if(_t--,_t===0){var A={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:be({},A,{value:St}),info:be({},A,{value:ke}),warn:be({},A,{value:Ht}),error:be({},A,{value:xr}),group:be({},A,{value:Hn}),groupCollapsed:be({},A,{value:Gn}),groupEnd:be({},A,{value:zt})})}_t<0&&M("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Lr=X.ReactCurrentDispatcher,zr;function br(A,Q,ie){{if(zr===void 0)try{throw Error()}catch(je){var Re=je.stack.trim().match(/\n( *(at )?)/);zr=Re&&Re[1]||""}return`
`+zr+A}}var dn=!1,Xn;{var nr=typeof WeakMap=="function"?WeakMap:Map;Xn=new nr}function rr(A,Q){if(!A||dn)return"";{var ie=Xn.get(A);if(ie!==void 0)return ie}var Re;dn=!0;var je=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var Ne;Ne=Lr.current,Lr.current=null,tr();try{if(Q){var Ue=function(){throw Error()};if(Object.defineProperty(Ue.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Ue,[])}catch(rn){Re=rn}Reflect.construct(A,[],Ue)}else{try{Ue.call()}catch(rn){Re=rn}A.call(Ue.prototype)}}else{try{throw Error()}catch(rn){Re=rn}A()}}catch(rn){if(rn&&Re&&typeof rn.stack=="string"){for(var Le=rn.stack.split(`
`),wt=Re.stack.split(`
`),Fe=Le.length-1,Rt=wt.length-1;Fe>=1&&Rt>=0&&Le[Fe]!==wt[Rt];)Rt--;for(;Fe>=1&&Rt>=0;Fe--,Rt--)if(Le[Fe]!==wt[Rt]){if(Fe!==1||Rt!==1)do if(Fe--,Rt--,Rt<0||Le[Fe]!==wt[Rt]){var wn=`
`+Le[Fe].replace(" at new "," at ");return A.displayName&&wn.includes("<anonymous>")&&(wn=wn.replace("<anonymous>",A.displayName)),typeof A=="function"&&Xn.set(A,wn),wn}while(Fe>=1&&Rt>=0);break}}}finally{dn=!1,Lr.current=Ne,ai(),Error.prepareStackTrace=je}var Vr=A?A.displayName||A.name:"",Ir=Vr?br(Vr):"";return typeof A=="function"&&Xn.set(A,Ir),Ir}function Ut(A,Q,ie){return rr(A,!1)}function _n(A){var Q=A.prototype;return!!(Q&&Q.isReactComponent)}function nn(A,Q,ie){if(A==null)return"";if(typeof A=="function")return rr(A,_n(A));if(typeof A=="string")return br(A);switch(A){case p:return br("Suspense");case _:return br("SuspenseList")}if(typeof A=="object")switch(A.$$typeof){case g:return Ut(A.render);case T:return nn(A.type,Q,ie);case C:{var Re=A,je=Re._payload,Ne=Re._init;try{return nn(Ne(je),Q,ie)}catch{}}}return""}var Gt=Object.prototype.hasOwnProperty,Xt={},ir=X.ReactDebugCurrentFrame;function Er(A){if(A){var Q=A._owner,ie=nn(A.type,A._source,Q?Q.type:null);ir.setExtraStackFrame(ie)}else ir.setExtraStackFrame(null)}function Wn(A,Q,ie,Re,je){{var Ne=Function.call.bind(Gt);for(var Ue in A)if(Ne(A,Ue)){var Le=void 0;try{if(typeof A[Ue]!="function"){var wt=Error((Re||"React class")+": "+ie+" type `"+Ue+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof A[Ue]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw wt.name="Invariant Violation",wt}Le=A[Ue](Q,Ue,Re,ie,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(Fe){Le=Fe}Le&&!(Le instanceof Error)&&(Er(je),M("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",Re||"React class",ie,Ue,typeof Le),Er(null)),Le instanceof Error&&!(Le.message in Xt)&&(Xt[Le.message]=!0,Er(je),M("Failed %s type: %s",ie,Le.message),Er(null))}}}var Ur=Array.isArray;function Rr(A){return Ur(A)}function Pn(A){{var Q=typeof Symbol=="function"&&Symbol.toStringTag,ie=Q&&A[Symbol.toStringTag]||A.constructor.name||"Object";return ie}}function _r(A){try{return Sn(A),!1}catch{return!0}}function Sn(A){return""+A}function ar(A){if(_r(A))return M("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",Pn(A)),Sn(A)}var Mt=X.ReactCurrentOwner,Sr={key:!0,ref:!0,__self:!0,__source:!0},Ci,Ti,re;re={};function ge(A){if(Gt.call(A,"ref")){var Q=Object.getOwnPropertyDescriptor(A,"ref").get;if(Q&&Q.isReactWarning)return!1}return A.ref!==void 0}function Be(A){if(Gt.call(A,"key")){var Q=Object.getOwnPropertyDescriptor(A,"key").get;if(Q&&Q.isReactWarning)return!1}return A.key!==void 0}function rt(A,Q){if(typeof A.ref=="string"&&Mt.current&&Q&&Mt.current.stateNode!==Q){var ie=we(Mt.current.type);re[ie]||(M('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',we(Mt.current.type),A.ref),re[ie]=!0)}}function it(A,Q){{var ie=function(){Ci||(Ci=!0,M("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",Q))};ie.isReactWarning=!0,Object.defineProperty(A,"key",{get:ie,configurable:!0})}}function Wt(A,Q){{var ie=function(){Ti||(Ti=!0,M("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",Q))};ie.isReactWarning=!0,Object.defineProperty(A,"ref",{get:ie,configurable:!0})}}var kt=function(A,Q,ie,Re,je,Ne,Ue){var Le={$$typeof:l,type:A,key:Q,ref:ie,props:Ue,_owner:Ne};return Le._store={},Object.defineProperty(Le._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(Le,"_self",{configurable:!1,enumerable:!1,writable:!1,value:Re}),Object.defineProperty(Le,"_source",{configurable:!1,enumerable:!1,writable:!1,value:je}),Object.freeze&&(Object.freeze(Le.props),Object.freeze(Le)),Le};function $n(A,Q,ie,Re,je){{var Ne,Ue={},Le=null,wt=null;ie!==void 0&&(ar(ie),Le=""+ie),Be(Q)&&(ar(Q.key),Le=""+Q.key),ge(Q)&&(wt=Q.ref,rt(Q,je));for(Ne in Q)Gt.call(Q,Ne)&&!Sr.hasOwnProperty(Ne)&&(Ue[Ne]=Q[Ne]);if(A&&A.defaultProps){var Fe=A.defaultProps;for(Ne in Fe)Ue[Ne]===void 0&&(Ue[Ne]=Fe[Ne])}if(Le||wt){var Rt=typeof A=="function"?A.displayName||A.name||"Unknown":A;Le&&it(Ue,Rt),wt&&Wt(Ue,Rt)}return kt(A,Le,wt,je,Re,Mt.current,Ue)}}var ft=X.ReactCurrentOwner,or=X.ReactDebugCurrentFrame;function yt(A){if(A){var Q=A._owner,ie=nn(A.type,A._source,Q?Q.type:null);or.setExtraStackFrame(ie)}else or.setExtraStackFrame(null)}var xt;xt=!1;function oi(A){return typeof A=="object"&&A!==null&&A.$$typeof===l}function Br(){{if(ft.current){var A=we(ft.current.type);if(A)return`

Check the render method of \``+A+"`."}return""}}function Ua(A){{if(A!==void 0){var Q=A.fileName.replace(/^.*[\\\/]/,""),ie=A.lineNumber;return`

Check your code at `+Q+":"+ie+"."}return""}}var So={};function Ds(A){{var Q=Br();if(!Q){var ie=typeof A=="string"?A:A.displayName||A.name;ie&&(Q=`

Check the top-level render call using <`+ie+">.")}return Q}}function Ba(A,Q){{if(!A._store||A._store.validated||A.key!=null)return;A._store.validated=!0;var ie=Ds(Q);if(So[ie])return;So[ie]=!0;var Re="";A&&A._owner&&A._owner!==ft.current&&(Re=" It was passed a child from "+we(A._owner.type)+"."),yt(A),M('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',ie,Re),yt(null)}}function Fa(A,Q){{if(typeof A!="object")return;if(Rr(A))for(var ie=0;ie<A.length;ie++){var Re=A[ie];oi(Re)&&Ba(Re,Q)}else if(oi(A))A._store&&(A._store.validated=!0);else if(A){var je=$(A);if(typeof je=="function"&&je!==A.entries)for(var Ne=je.call(A),Ue;!(Ue=Ne.next()).done;)oi(Ue.value)&&Ba(Ue.value,Q)}}}function Ni(A){{var Q=A.type;if(Q==null||typeof Q=="string")return;var ie;if(typeof Q=="function")ie=Q.propTypes;else if(typeof Q=="object"&&(Q.$$typeof===g||Q.$$typeof===T))ie=Q.propTypes;else return;if(ie){var Re=we(Q);Wn(ie,A.props,"prop",Re,A)}else if(Q.PropTypes!==void 0&&!xt){xt=!0;var je=we(Q);M("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",je||"Unknown")}typeof Q.getDefaultProps=="function"&&!Q.getDefaultProps.isReactClassApproved&&M("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function ta(A){{for(var Q=Object.keys(A.props),ie=0;ie<Q.length;ie++){var Re=Q[ie];if(Re!=="children"&&Re!=="key"){yt(A),M("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",Re),yt(null);break}}A.ref!==null&&(yt(A),M("Invalid attribute `ref` supplied to `React.Fragment`."),yt(null))}}var Ai={};function si(A,Q,ie,Re,je,Ne){{var Ue=ye(A);if(!Ue){var Le="";(A===void 0||typeof A=="object"&&A!==null&&Object.keys(A).length===0)&&(Le+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var wt=Ua(je);wt?Le+=wt:Le+=Br();var Fe;A===null?Fe="null":Rr(A)?Fe="array":A!==void 0&&A.$$typeof===l?(Fe="<"+(we(A.type)||"Unknown")+" />",Le=" Did you accidentally export a JSX literal instead of a component?"):Fe=typeof A,M("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",Fe,Le)}var Rt=$n(A,Q,ie,je,Ne);if(Rt==null)return Rt;if(Ue){var wn=Q.children;if(wn!==void 0)if(Re)if(Rr(wn)){for(var Vr=0;Vr<wn.length;Vr++)Fa(wn[Vr],A);Object.freeze&&Object.freeze(wn)}else M("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else Fa(wn,A)}if(Gt.call(Q,"key")){var Ir=we(A),rn=Object.keys(Q).filter(function(Ms){return Ms!=="key"}),Va=rn.length>0?"{key: someKey, "+rn.join(": ..., ")+": ...}":"{key: someKey}";if(!Ai[Ir+Va]){var wo=rn.length>0?"{"+rn.join(": ..., ")+": ...}":"{}";M(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,Va,Ir,wo,Ir),Ai[Ir+Va]=!0}}return A===o?ta(Rt):Ni(Rt),Rt}}var Fr=si;Ev.Fragment=o,Ev.jsxDEV=Fr})();uE.exports=Ev;var E=uE.exports,Rv={},fE={exports:{}},gr={},dE={exports:{}},mE={};(function(h){/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var l=!1,a=!1,o=5;function c(re,ge){var Be=re.length;re.push(ge),x(re,ge,Be)}function d(re){return re.length===0?null:re[0]}function u(re){if(re.length===0)return null;var ge=re[0],Be=re.pop();return Be!==ge&&(re[0]=Be,g(re,Be,0)),ge}function x(re,ge,Be){for(var rt=Be;rt>0;){var it=rt-1>>>1,Wt=re[it];if(p(Wt,ge)>0)re[it]=ge,re[rt]=Wt,rt=it;else return}}function g(re,ge,Be){for(var rt=Be,it=re.length,Wt=it>>>1;rt<Wt;){var kt=(rt+1)*2-1,$n=re[kt],ft=kt+1,or=re[ft];if(p($n,ge)<0)ft<it&&p(or,$n)<0?(re[rt]=or,re[ft]=ge,rt=ft):(re[rt]=$n,re[kt]=ge,rt=kt);else if(ft<it&&p(or,ge)<0)re[rt]=or,re[ft]=ge,rt=ft;else return}}function p(re,ge){var Be=re.sortIndex-ge.sortIndex;return Be!==0?Be:re.id-ge.id}var _=1,T=2,C=3,w=4,k=5;function W(re,ge){}var $=typeof performance=="object"&&typeof performance.now=="function";if($){var X=performance;h.unstable_now=function(){return X.now()}}else{var M=Date,Y=M.now();h.unstable_now=function(){return M.now()-Y}}var oe=1073741823,j=-1,ne=250,K=5e3,me=1e4,_e=oe,ye=[],pe=[],ct=1,we=null,be=C,_t=!1,St=!1,ke=!1,Ht=typeof setTimeout=="function"?setTimeout:null,xr=typeof clearTimeout=="function"?clearTimeout:null,Hn=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Gn(re){for(var ge=d(pe);ge!==null;){if(ge.callback===null)u(pe);else if(ge.startTime<=re)u(pe),ge.sortIndex=ge.expirationTime,c(ye,ge);else return;ge=d(pe)}}function zt(re){if(ke=!1,Gn(re),!St)if(d(ye)!==null)St=!0,ar(fn);else{var ge=d(pe);ge!==null&&Mt(zt,ge.startTime-re)}}function fn(re,ge){St=!1,ke&&(ke=!1,Sr()),_t=!0;var Be=be;try{var rt;if(!a)return tr(re,ge)}finally{we=null,be=Be,_t=!1}}function tr(re,ge){var Be=ge;for(Gn(Be),we=d(ye);we!==null&&!l&&!(we.expirationTime>Be&&(!re||Er()));){var rt=we.callback;if(typeof rt=="function"){we.callback=null,be=we.priorityLevel;var it=we.expirationTime<=Be,Wt=rt(it);Be=h.unstable_now(),typeof Wt=="function"?we.callback=Wt:we===d(ye)&&u(ye),Gn(Be)}else u(ye);we=d(ye)}if(we!==null)return!0;var kt=d(pe);return kt!==null&&Mt(zt,kt.startTime-Be),!1}function ai(re,ge){switch(re){case _:case T:case C:case w:case k:break;default:re=C}var Be=be;be=re;try{return ge()}finally{be=Be}}function Lr(re){var ge;switch(be){case _:case T:case C:ge=C;break;default:ge=be;break}var Be=be;be=ge;try{return re()}finally{be=Be}}function zr(re){var ge=be;return function(){var Be=be;be=ge;try{return re.apply(this,arguments)}finally{be=Be}}}function br(re,ge,Be){var rt=h.unstable_now(),it;if(typeof Be=="object"&&Be!==null){var Wt=Be.delay;typeof Wt=="number"&&Wt>0?it=rt+Wt:it=rt}else it=rt;var kt;switch(re){case _:kt=j;break;case T:kt=ne;break;case k:kt=_e;break;case w:kt=me;break;case C:default:kt=K;break}var $n=it+kt,ft={id:ct++,callback:ge,priorityLevel:re,startTime:it,expirationTime:$n,sortIndex:-1};return it>rt?(ft.sortIndex=it,c(pe,ft),d(ye)===null&&ft===d(pe)&&(ke?Sr():ke=!0,Mt(zt,it-rt))):(ft.sortIndex=$n,c(ye,ft),!St&&!_t&&(St=!0,ar(fn))),ft}function dn(){}function Xn(){!St&&!_t&&(St=!0,ar(fn))}function nr(){return d(ye)}function rr(re){re.callback=null}function Ut(){return be}var _n=!1,nn=null,Gt=-1,Xt=o,ir=-1;function Er(){var re=h.unstable_now()-ir;return!(re<Xt)}function Wn(){}function Ur(re){if(re<0||re>125){console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}re>0?Xt=Math.floor(1e3/re):Xt=o}var Rr=function(){if(nn!==null){var re=h.unstable_now();ir=re;var ge=!0,Be=!0;try{Be=nn(ge,re)}finally{Be?Pn():(_n=!1,nn=null)}}else _n=!1},Pn;if(typeof Hn=="function")Pn=function(){Hn(Rr)};else if(typeof MessageChannel<"u"){var _r=new MessageChannel,Sn=_r.port2;_r.port1.onmessage=Rr,Pn=function(){Sn.postMessage(null)}}else Pn=function(){Ht(Rr,0)};function ar(re){nn=re,_n||(_n=!0,Pn())}function Mt(re,ge){Gt=Ht(function(){re(h.unstable_now())},ge)}function Sr(){xr(Gt),Gt=-1}var Ci=Wn,Ti=null;h.unstable_IdlePriority=k,h.unstable_ImmediatePriority=_,h.unstable_LowPriority=w,h.unstable_NormalPriority=C,h.unstable_Profiling=Ti,h.unstable_UserBlockingPriority=T,h.unstable_cancelCallback=rr,h.unstable_continueExecution=Xn,h.unstable_forceFrameRate=Ur,h.unstable_getCurrentPriorityLevel=Ut,h.unstable_getFirstCallbackNode=nr,h.unstable_next=Lr,h.unstable_pauseExecution=dn,h.unstable_requestPaint=Ci,h.unstable_runWithPriority=ai,h.unstable_scheduleCallback=br,h.unstable_shouldYield=Er,h.unstable_wrapCallback=zr,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})()})(mE);dE.exports=mE;var iO=dE.exports;/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(){typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error);var h=G,l=iO,a=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,o=!1;function c(e){o=e}function d(e){if(!o){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];x("warn",e,n)}}function u(e){if(!o){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];x("error",e,n)}}function x(e,t,n){{var r=a.ReactDebugCurrentFrame,i=r.getStackAddendum();i!==""&&(t+="%s",n=n.concat([i]));var s=n.map(function(f){return String(f)});s.unshift("Warning: "+t),Function.prototype.apply.call(console[e],console,s)}}var g=0,p=1,_=2,T=3,C=4,w=5,k=6,W=7,$=8,X=9,M=10,Y=11,oe=12,j=13,ne=14,K=15,me=16,_e=17,ye=18,pe=19,ct=21,we=22,be=23,_t=24,St=25,ke=!0,Ht=!1,xr=!1,Hn=!1,Gn=!1,zt=!0,fn=!1,tr=!0,ai=!0,Lr=!0,zr=!0,br=new Set,dn={},Xn={};function nr(e,t){rr(e,t),rr(e+"Capture",t)}function rr(e,t){dn[e]&&u("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",e),dn[e]=t;{var n=e.toLowerCase();Xn[n]=e,e==="onDoubleClick"&&(Xn.ondblclick=e)}for(var r=0;r<t.length;r++)br.add(t[r])}var Ut=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",_n=Object.prototype.hasOwnProperty;function nn(e){{var t=typeof Symbol=="function"&&Symbol.toStringTag,n=t&&e[Symbol.toStringTag]||e.constructor.name||"Object";return n}}function Gt(e){try{return Xt(e),!1}catch{return!0}}function Xt(e){return""+e}function ir(e,t){if(Gt(e))return u("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.",t,nn(e)),Xt(e)}function Er(e){if(Gt(e))return u("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",nn(e)),Xt(e)}function Wn(e,t){if(Gt(e))return u("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.",t,nn(e)),Xt(e)}function Ur(e,t){if(Gt(e))return u("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.",t,nn(e)),Xt(e)}function Rr(e){if(Gt(e))return u("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.",nn(e)),Xt(e)}function Pn(e){if(Gt(e))return u("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.",nn(e)),Xt(e)}var _r=0,Sn=1,ar=2,Mt=3,Sr=4,Ci=5,Ti=6,re=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",ge=re+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",Be=new RegExp("^["+re+"]["+ge+"]*$"),rt={},it={};function Wt(e){return _n.call(it,e)?!0:_n.call(rt,e)?!1:Be.test(e)?(it[e]=!0,!0):(rt[e]=!0,u("Invalid attribute name: `%s`",e),!1)}function kt(e,t,n){return t!==null?t.type===_r:n?!1:e.length>2&&(e[0]==="o"||e[0]==="O")&&(e[1]==="n"||e[1]==="N")}function $n(e,t,n,r){if(n!==null&&n.type===_r)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":{if(r)return!1;if(n!==null)return!n.acceptsBooleans;var i=e.toLowerCase().slice(0,5);return i!=="data-"&&i!=="aria-"}default:return!1}}function ft(e,t,n,r){if(t===null||typeof t>"u"||$n(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case Mt:return!t;case Sr:return t===!1;case Ci:return isNaN(t);case Ti:return isNaN(t)||t<1}return!1}function or(e){return xt.hasOwnProperty(e)?xt[e]:null}function yt(e,t,n,r,i,s,f){this.acceptsBooleans=t===ar||t===Mt||t===Sr,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=f}var xt={},oi=["children","dangerouslySetInnerHTML","defaultValue","defaultChecked","innerHTML","suppressContentEditableWarning","suppressHydrationWarning","style"];oi.forEach(function(e){xt[e]=new yt(e,_r,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0],n=e[1];xt[t]=new yt(t,Sn,!1,n,null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){xt[e]=new yt(e,ar,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){xt[e]=new yt(e,ar,!1,e,null,!1,!1)}),["allowFullScreen","async","autoFocus","autoPlay","controls","default","defer","disabled","disablePictureInPicture","disableRemotePlayback","formNoValidate","hidden","loop","noModule","noValidate","open","playsInline","readOnly","required","reversed","scoped","seamless","itemScope"].forEach(function(e){xt[e]=new yt(e,Mt,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){xt[e]=new yt(e,Mt,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){xt[e]=new yt(e,Sr,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){xt[e]=new yt(e,Ti,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){xt[e]=new yt(e,Ci,!1,e.toLowerCase(),null,!1,!1)});var Br=/[\-\:]([a-z])/g,Ua=function(e){return e[1].toUpperCase()};["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","color-interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","glyph-orientation-horizontal","glyph-orientation-vertical","horiz-adv-x","horiz-origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","paint-order","panose-1","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","vector-effect","vert-adv-y","vert-origin-x","vert-origin-y","word-spacing","writing-mode","xmlns:xlink","x-height"].forEach(function(e){var t=e.replace(Br,Ua);xt[t]=new yt(t,Sn,!1,e,null,!1,!1)}),["xlink:actuate","xlink:arcrole","xlink:role","xlink:show","xlink:title","xlink:type"].forEach(function(e){var t=e.replace(Br,Ua);xt[t]=new yt(t,Sn,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Br,Ua);xt[t]=new yt(t,Sn,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){xt[e]=new yt(e,Sn,!1,e.toLowerCase(),null,!1,!1)});var So="xlinkHref";xt[So]=new yt("xlinkHref",Sn,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){xt[e]=new yt(e,Sn,!1,e.toLowerCase(),null,!0,!0)});var Ds=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i,Ba=!1;function Fa(e){!Ba&&Ds.test(e)&&(Ba=!0,u("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.",JSON.stringify(e)))}function Ni(e,t,n,r){if(r.mustUseProperty){var i=r.propertyName;return e[i]}else{ir(n,t),r.sanitizeURL&&Fa(""+n);var s=r.attributeName,f=null;if(r.type===Sr){if(e.hasAttribute(s)){var m=e.getAttribute(s);return m===""?!0:ft(t,n,r,!1)?m:m===""+n?n:m}}else if(e.hasAttribute(s)){if(ft(t,n,r,!1))return e.getAttribute(s);if(r.type===Mt)return n;f=e.getAttribute(s)}return ft(t,n,r,!1)?f===null?n:f:f===""+n?n:f}}function ta(e,t,n,r){{if(!Wt(t))return;if(!e.hasAttribute(t))return n===void 0?void 0:null;var i=e.getAttribute(t);return ir(n,t),i===""+n?n:i}}function Ai(e,t,n,r){var i=or(t);if(!kt(t,i,r)){if(ft(t,n,i,r)&&(n=null),r||i===null){if(Wt(t)){var s=t;n===null?e.removeAttribute(s):(ir(n,t),e.setAttribute(s,""+n))}return}var f=i.mustUseProperty;if(f){var m=i.propertyName;if(n===null){var v=i.type;e[m]=v===Mt?!1:""}else e[m]=n;return}var R=i.attributeName,S=i.attributeNamespace;if(n===null)e.removeAttribute(R);else{var D=i.type,O;D===Mt||D===Sr&&n===!0?O="":(ir(n,R),O=""+n,i.sanitizeURL&&Fa(O.toString())),S?e.setAttributeNS(S,R,O):e.setAttribute(R,O)}}}var si=Symbol.for("react.element"),Fr=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),Q=Symbol.for("react.strict_mode"),ie=Symbol.for("react.profiler"),Re=Symbol.for("react.provider"),je=Symbol.for("react.context"),Ne=Symbol.for("react.forward_ref"),Ue=Symbol.for("react.suspense"),Le=Symbol.for("react.suspense_list"),wt=Symbol.for("react.memo"),Fe=Symbol.for("react.lazy"),Rt=Symbol.for("react.scope"),wn=Symbol.for("react.debug_trace_mode"),Vr=Symbol.for("react.offscreen"),Ir=Symbol.for("react.legacy_hidden"),rn=Symbol.for("react.cache"),Va=Symbol.for("react.tracing_marker"),wo=Symbol.iterator,Ms="@@iterator";function Oi(e){if(e===null||typeof e!="object")return null;var t=wo&&e[wo]||e[Ms];return typeof t=="function"?t:null}var Ie=Object.assign,Ia=0,na,ks,Ps,Ls,zs,Us,Bs;function Fs(){}Fs.__reactDisabledLog=!0;function ku(){{if(Ia===0){na=console.log,ks=console.info,Ps=console.warn,Ls=console.error,zs=console.group,Us=console.groupCollapsed,Bs=console.groupEnd;var e={configurable:!0,enumerable:!0,value:Fs,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}Ia++}}function ud(){{if(Ia--,Ia===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:Ie({},e,{value:na}),info:Ie({},e,{value:ks}),warn:Ie({},e,{value:Ps}),error:Ie({},e,{value:Ls}),group:Ie({},e,{value:zs}),groupCollapsed:Ie({},e,{value:Us}),groupEnd:Ie({},e,{value:Bs})})}Ia<0&&u("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var Vs=a.ReactCurrentDispatcher,ja;function wr(e,t,n){{if(ja===void 0)try{throw Error()}catch(i){var r=i.stack.trim().match(/\n( *(at )?)/);ja=r&&r[1]||""}return`
`+ja+e}}var ra=!1,ia;{var Co=typeof WeakMap=="function"?WeakMap:Map;ia=new Co}function Is(e,t){if(!e||ra)return"";{var n=ia.get(e);if(n!==void 0)return n}var r;ra=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var s;s=Vs.current,Vs.current=null,ku();try{if(t){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(B){r=B}Reflect.construct(e,[],f)}else{try{f.call()}catch(B){r=B}e.call(f.prototype)}}else{try{throw Error()}catch(B){r=B}e()}}catch(B){if(B&&r&&typeof B.stack=="string"){for(var m=B.stack.split(`
`),v=r.stack.split(`
`),R=m.length-1,S=v.length-1;R>=1&&S>=0&&m[R]!==v[S];)S--;for(;R>=1&&S>=0;R--,S--)if(m[R]!==v[S]){if(R!==1||S!==1)do if(R--,S--,S<0||m[R]!==v[S]){var D=`
`+m[R].replace(" at new "," at ");return e.displayName&&D.includes("<anonymous>")&&(D=D.replace("<anonymous>",e.displayName)),typeof e=="function"&&ia.set(e,D),D}while(R>=1&&S>=0);break}}}finally{ra=!1,Vs.current=s,ud(),Error.prepareStackTrace=i}var O=e?e.displayName||e.name:"",z=O?wr(O):"";return typeof e=="function"&&ia.set(e,z),z}function Pu(e,t,n){return Is(e,!0)}function js(e,t,n){return Is(e,!1)}function cd(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function aa(e,t,n){if(e==null)return"";if(typeof e=="function")return Is(e,cd(e));if(typeof e=="string")return wr(e);switch(e){case Ue:return wr("Suspense");case Le:return wr("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case Ne:return js(e.render);case wt:return aa(e.type,t,n);case Fe:{var r=e,i=r._payload,s=r._init;try{return aa(s(i),t,n)}catch{}}}return""}function Lu(e){switch(e._debugOwner&&e._debugOwner.type,e._debugSource,e.tag){case w:return wr(e.type);case me:return wr("Lazy");case j:return wr("Suspense");case pe:return wr("SuspenseList");case g:case _:case K:return js(e.type);case Y:return js(e.type.render);case p:return Pu(e.type);default:return""}}function Hs(e){try{var t="",n=e;do t+=Lu(n),n=n.return;while(n);return t}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}function To(e,t,n){var r=e.displayName;if(r)return r;var i=t.displayName||t.name||"";return i!==""?n+"("+i+")":n}function zu(e){return e.displayName||"Context"}function qe(e){if(e==null)return null;if(typeof e.tag=="number"&&u("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case A:return"Fragment";case Fr:return"Portal";case ie:return"Profiler";case Q:return"StrictMode";case Ue:return"Suspense";case Le:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case je:var t=e;return zu(t)+".Consumer";case Re:var n=e;return zu(n._context)+".Provider";case Ne:return To(e,e.render,"ForwardRef");case wt:var r=e.displayName||null;return r!==null?r:qe(e.type)||"Memo";case Fe:{var i=e,s=i._payload,f=i._init;try{return qe(f(s))}catch{return null}}}return null}function Gs(e,t,n){var r=t.displayName||t.name||"";return e.displayName||(r!==""?n+"("+r+")":n)}function Xs(e){return e.displayName||"Context"}function Pe(e){var t=e.tag,n=e.type;switch(t){case _t:return"Cache";case X:var r=n;return Xs(r)+".Consumer";case M:var i=n;return Xs(i._context)+".Provider";case ye:return"DehydratedFragment";case Y:return Gs(n,n.render,"ForwardRef");case W:return"Fragment";case w:return n;case C:return"Portal";case T:return"Root";case k:return"Text";case me:return qe(n);case $:return n===Q?"StrictMode":"Mode";case we:return"Offscreen";case oe:return"Profiler";case ct:return"Scope";case j:return"Suspense";case pe:return"SuspenseList";case St:return"TracingMarker";case p:case g:case _e:case _:case ne:case K:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;break}return null}var Uu=a.ReactDebugCurrentFrame,Cn=null,Ha=!1;function oa(){{if(Cn===null)return null;var e=Cn._debugOwner;if(e!==null&&typeof e<"u")return Pe(e)}return null}function Bu(){return Cn===null?"":Hs(Cn)}function an(){Uu.getCurrentStack=null,Cn=null,Ha=!1}function Ct(e){Uu.getCurrentStack=e===null?null:Bu,Cn=e,Ha=!1}function Fu(){return Cn}function sr(e){Ha=e}function Yn(e){return""+e}function li(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return Pn(e),e;default:return""}}var fd={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0};function No(e,t){fd[t.type]||t.onChange||t.onInput||t.readOnly||t.disabled||t.value==null||u("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."),t.onChange||t.readOnly||t.disabled||t.checked==null||u("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")}function Ga(e){var t=e.type,n=e.nodeName;return n&&n.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Vu(e){return e._valueTracker}function sa(e){e._valueTracker=null}function Iu(e){var t="";return e&&(Ga(e)?t=e.checked?"true":"false":t=e.value),t}function ju(e){var t=Ga(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);Pn(e[t]);var r=""+e[t];if(!(e.hasOwnProperty(t)||typeof n>"u"||typeof n.get!="function"||typeof n.set!="function")){var i=n.get,s=n.set;Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(m){Pn(m),r=""+m,s.call(this,m)}}),Object.defineProperty(e,t,{enumerable:n.enumerable});var f={getValue:function(){return r},setValue:function(m){Pn(m),r=""+m},stopTracking:function(){sa(e),delete e[t]}};return f}}function Di(e){Vu(e)||(e._valueTracker=ju(e))}function Ao(e){if(!e)return!1;var t=Vu(e);if(!t)return!0;var n=t.getValue(),r=Iu(e);return r!==n?(t.setValue(r),!0):!1}function la(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Oo=!1,Hu=!1,Gu=!1,Xu=!1;function Wu(e){var t=e.type==="checkbox"||e.type==="radio";return t?e.checked!=null:e.value!=null}function y(e,t){var n=e,r=t.checked,i=Ie({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??n._wrapperState.initialChecked});return i}function N(e,t){No("input",t),t.checked!==void 0&&t.defaultChecked!==void 0&&!Hu&&(u("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",oa()||"A component",t.type),Hu=!0),t.value!==void 0&&t.defaultValue!==void 0&&!Oo&&(u("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",oa()||"A component",t.type),Oo=!0);var n=e,r=t.defaultValue==null?"":t.defaultValue;n._wrapperState={initialChecked:t.checked!=null?t.checked:t.defaultChecked,initialValue:li(t.value!=null?t.value:r),controlled:Wu(t)}}function U(e,t){var n=e,r=t.checked;r!=null&&Ai(n,"checked",r,!1)}function F(e,t){var n=e;{var r=Wu(t);!n._wrapperState.controlled&&r&&!Xu&&(u("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),Xu=!0),n._wrapperState.controlled&&!r&&!Gu&&(u("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),Gu=!0)}U(e,t);var i=li(t.value),s=t.type;if(i!=null)s==="number"?(i===0&&n.value===""||n.value!=i)&&(n.value=Yn(i)):n.value!==Yn(i)&&(n.value=Yn(i));else if(s==="submit"||s==="reset"){n.removeAttribute("value");return}t.hasOwnProperty("value")?Ae(n,t.type,i):t.hasOwnProperty("defaultValue")&&Ae(n,t.type,li(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(n.defaultChecked=!!t.defaultChecked)}function ee(e,t,n){var r=e;if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var i=t.type,s=i==="submit"||i==="reset";if(s&&(t.value===void 0||t.value===null))return;var f=Yn(r._wrapperState.initialValue);n||f!==r.value&&(r.value=f),r.defaultValue=f}var m=r.name;m!==""&&(r.name=""),r.defaultChecked=!r.defaultChecked,r.defaultChecked=!!r._wrapperState.initialChecked,m!==""&&(r.name=m)}function Ce(e,t){var n=e;F(n,t),he(n,t)}function he(e,t){var n=t.name;if(t.type==="radio"&&n!=null){for(var r=e;r.parentNode;)r=r.parentNode;ir(n,"name");for(var i=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),s=0;s<i.length;s++){var f=i[s];if(!(f===e||f.form!==e.form)){var m=Mc(f);if(!m)throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");Ao(f),F(f,m)}}}}function Ae(e,t,n){(t!=="number"||la(e.ownerDocument)!==e)&&(n==null?e.defaultValue=Yn(e._wrapperState.initialValue):e.defaultValue!==Yn(n)&&(e.defaultValue=Yn(n)))}var He=!1,at=!1,dt=!1;function mt(e,t){t.value==null&&(typeof t.children=="object"&&t.children!==null?h.Children.forEach(t.children,function(n){n!=null&&(typeof n=="string"||typeof n=="number"||at||(at=!0,u("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")))}):t.dangerouslySetInnerHTML!=null&&(dt||(dt=!0,u("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))),t.selected!=null&&!He&&(u("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."),He=!0)}function bt(e,t){t.value!=null&&e.setAttribute("value",Yn(li(t.value)))}var At=Array.isArray;function Ze(e){return At(e)}var ua;ua=!1;function Do(){var e=oa();return e?`

Check the render method of \``+e+"`.":""}var Ws=["value","defaultValue"];function dd(e){{No("select",e);for(var t=0;t<Ws.length;t++){var n=Ws[t];if(e[n]!=null){var r=Ze(e[n]);e.multiple&&!r?u("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",n,Do()):!e.multiple&&r&&u("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",n,Do())}}}}function Mi(e,t,n,r){var i=e.options;if(t){for(var s=n,f={},m=0;m<s.length;m++)f["$"+s[m]]=!0;for(var v=0;v<i.length;v++){var R=f.hasOwnProperty("$"+i[v].value);i[v].selected!==R&&(i[v].selected=R),R&&r&&(i[v].defaultSelected=!0)}}else{for(var S=Yn(li(n)),D=null,O=0;O<i.length;O++){if(i[O].value===S){i[O].selected=!0,r&&(i[O].defaultSelected=!0);return}D===null&&!i[O].disabled&&(D=i[O])}D!==null&&(D.selected=!0)}}function $s(e,t){return Ie({},t,{value:void 0})}function Ys(e,t){var n=e;dd(t),n._wrapperState={wasMultiple:!!t.multiple},t.value!==void 0&&t.defaultValue!==void 0&&!ua&&(u("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"),ua=!0)}function md(e,t){var n=e;n.multiple=!!t.multiple;var r=t.value;r!=null?Mi(n,!!t.multiple,r,!1):t.defaultValue!=null&&Mi(n,!!t.multiple,t.defaultValue,!0)}function BE(e,t){var n=e,r=n._wrapperState.wasMultiple;n._wrapperState.wasMultiple=!!t.multiple;var i=t.value;i!=null?Mi(n,!!t.multiple,i,!1):r!==!!t.multiple&&(t.defaultValue!=null?Mi(n,!!t.multiple,t.defaultValue,!0):Mi(n,!!t.multiple,t.multiple?[]:"",!1))}function FE(e,t){var n=e,r=t.value;r!=null&&Mi(n,!!t.multiple,r,!1)}var Lv=!1;function hd(e,t){var n=e;if(t.dangerouslySetInnerHTML!=null)throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");var r=Ie({},t,{value:void 0,defaultValue:void 0,children:Yn(n._wrapperState.initialValue)});return r}function zv(e,t){var n=e;No("textarea",t),t.value!==void 0&&t.defaultValue!==void 0&&!Lv&&(u("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components",oa()||"A component"),Lv=!0);var r=t.value;if(r==null){var i=t.children,s=t.defaultValue;if(i!=null){u("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");{if(s!=null)throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");if(Ze(i)){if(i.length>1)throw new Error("<textarea> can only have at most one child.");i=i[0]}s=i}}s==null&&(s=""),r=s}n._wrapperState={initialValue:li(r)}}function Uv(e,t){var n=e,r=li(t.value),i=li(t.defaultValue);if(r!=null){var s=Yn(r);s!==n.value&&(n.value=s),t.defaultValue==null&&n.defaultValue!==s&&(n.defaultValue=s)}i!=null&&(n.defaultValue=Yn(i))}function Bv(e,t){var n=e,r=n.textContent;r===n._wrapperState.initialValue&&r!==""&&r!==null&&(n.value=r)}function VE(e,t){Uv(e,t)}var ki="http://www.w3.org/1999/xhtml",IE="http://www.w3.org/1998/Math/MathML",pd="http://www.w3.org/2000/svg";function vd(e){switch(e){case"svg":return pd;case"math":return IE;default:return ki}}function gd(e,t){return e==null||e===ki?vd(t):e===pd&&t==="foreignObject"?ki:e}var jE=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e},$u,Fv=jE(function(e,t){if(e.namespaceURI===pd&&!("innerHTML"in e)){$u=$u||document.createElement("div"),$u.innerHTML="<svg>"+t.valueOf().toString()+"</svg>";for(var n=$u.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild);return}e.innerHTML=t}),qn=1,Pi=3,Bt=8,Li=9,yd=11,Yu=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===Pi){n.nodeValue=t;return}}e.textContent=t},HE={animation:["animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationTimingFunction"],background:["backgroundAttachment","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize"],backgroundPosition:["backgroundPositionX","backgroundPositionY"],border:["borderBottomColor","borderBottomStyle","borderBottomWidth","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRightColor","borderRightStyle","borderRightWidth","borderTopColor","borderTopStyle","borderTopWidth"],borderBlockEnd:["borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth"],borderBlockStart:["borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth"],borderBottom:["borderBottomColor","borderBottomStyle","borderBottomWidth"],borderColor:["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"],borderImage:["borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth"],borderInlineEnd:["borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth"],borderInlineStart:["borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth"],borderLeft:["borderLeftColor","borderLeftStyle","borderLeftWidth"],borderRadius:["borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"],borderRight:["borderRightColor","borderRightStyle","borderRightWidth"],borderStyle:["borderBottomStyle","borderLeftStyle","borderRightStyle","borderTopStyle"],borderTop:["borderTopColor","borderTopStyle","borderTopWidth"],borderWidth:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],columnRule:["columnRuleColor","columnRuleStyle","columnRuleWidth"],columns:["columnCount","columnWidth"],flex:["flexBasis","flexGrow","flexShrink"],flexFlow:["flexDirection","flexWrap"],font:["fontFamily","fontFeatureSettings","fontKerning","fontLanguageOverride","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition","fontWeight","lineHeight"],fontVariant:["fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition"],gap:["columnGap","rowGap"],grid:["gridAutoColumns","gridAutoFlow","gridAutoRows","gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],gridArea:["gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart"],gridColumn:["gridColumnEnd","gridColumnStart"],gridColumnGap:["columnGap"],gridGap:["columnGap","rowGap"],gridRow:["gridRowEnd","gridRowStart"],gridRowGap:["rowGap"],gridTemplate:["gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],listStyle:["listStyleImage","listStylePosition","listStyleType"],margin:["marginBottom","marginLeft","marginRight","marginTop"],marker:["markerEnd","markerMid","markerStart"],mask:["maskClip","maskComposite","maskImage","maskMode","maskOrigin","maskPositionX","maskPositionY","maskRepeat","maskSize"],maskPosition:["maskPositionX","maskPositionY"],outline:["outlineColor","outlineStyle","outlineWidth"],overflow:["overflowX","overflowY"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"],placeContent:["alignContent","justifyContent"],placeItems:["alignItems","justifyItems"],placeSelf:["alignSelf","justifySelf"],textDecoration:["textDecorationColor","textDecorationLine","textDecorationStyle"],textEmphasis:["textEmphasisColor","textEmphasisStyle"],transition:["transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction"],wordWrap:["overflowWrap"]},qs={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};function GE(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}var XE=["Webkit","ms","Moz","O"];Object.keys(qs).forEach(function(e){XE.forEach(function(t){qs[GE(t,e)]=qs[e]})});function xd(e,t,n){var r=t==null||typeof t=="boolean"||t==="";return r?"":!n&&typeof t=="number"&&t!==0&&!(qs.hasOwnProperty(e)&&qs[e])?t+"px":(Ur(t,e),(""+t).trim())}var WE=/([A-Z])/g,$E=/^ms-/;function YE(e){return e.replace(WE,"-$1").toLowerCase().replace($E,"-ms-")}var Vv=function(){};{var qE=/^(?:webkit|moz|o)[A-Z]/,QE=/^-ms-/,KE=/-(.)/g,Iv=/;\s*$/,Mo={},bd={},jv=!1,Hv=!1,ZE=function(e){return e.replace(KE,function(t,n){return n.toUpperCase()})},JE=function(e){Mo.hasOwnProperty(e)&&Mo[e]||(Mo[e]=!0,u("Unsupported style property %s. Did you mean %s?",e,ZE(e.replace(QE,"ms-"))))},eR=function(e){Mo.hasOwnProperty(e)&&Mo[e]||(Mo[e]=!0,u("Unsupported vendor-prefixed style property %s. Did you mean %s?",e,e.charAt(0).toUpperCase()+e.slice(1)))},tR=function(e,t){bd.hasOwnProperty(t)&&bd[t]||(bd[t]=!0,u(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,e,t.replace(Iv,"")))},nR=function(e,t){jv||(jv=!0,u("`NaN` is an invalid value for the `%s` css style property.",e))},rR=function(e,t){Hv||(Hv=!0,u("`Infinity` is an invalid value for the `%s` css style property.",e))};Vv=function(e,t){e.indexOf("-")>-1?JE(e):qE.test(e)?eR(e):Iv.test(t)&&tR(e,t),typeof t=="number"&&(isNaN(t)?nR(e,t):isFinite(t)||rR(e,t))}}var iR=Vv;function aR(e){{var t="",n="";for(var r in e)if(e.hasOwnProperty(r)){var i=e[r];if(i!=null){var s=r.indexOf("--")===0;t+=n+(s?r:YE(r))+":",t+=xd(r,i,s),n=";"}}return t||null}}function Gv(e,t){var n=e.style;for(var r in t)if(t.hasOwnProperty(r)){var i=r.indexOf("--")===0;i||iR(r,t[r]);var s=xd(r,t[r],i);r==="float"&&(r="cssFloat"),i?n.setProperty(r,s):n[r]=s}}function oR(e){return e==null||typeof e=="boolean"||e===""}function Xv(e){var t={};for(var n in e)for(var r=HE[n]||[n],i=0;i<r.length;i++)t[r[i]]=n;return t}function sR(e,t){{if(!t)return;var n=Xv(e),r=Xv(t),i={};for(var s in n){var f=n[s],m=r[s];if(m&&f!==m){var v=f+","+m;if(i[v])continue;i[v]=!0,u("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",oR(e[f])?"Removing":"Updating",f,m)}}}}var lR={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},uR=Ie({menuitem:!0},lR),cR="__html";function Ed(e,t){if(t){if(uR[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw new Error(e+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");if(typeof t.dangerouslySetInnerHTML!="object"||!(cR in t.dangerouslySetInnerHTML))throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.")}if(!t.suppressContentEditableWarning&&t.contentEditable&&t.children!=null&&u("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."),t.style!=null&&typeof t.style!="object")throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.")}}function Xa(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qu={accept:"accept",acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",alt:"alt",as:"as",async:"async",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",challenge:"challenge",charset:"charSet",checked:"checked",children:"children",cite:"cite",class:"className",classid:"classID",classname:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlslist:"controlsList",coords:"coords",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",data:"data",datetime:"dateTime",default:"default",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",defer:"defer",dir:"dir",disabled:"disabled",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",download:"download",draggable:"draggable",enctype:"encType",enterkeyhint:"enterKeyHint",for:"htmlFor",form:"form",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",icon:"icon",id:"id",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",innerhtml:"innerHTML",inputmode:"inputMode",integrity:"integrity",is:"is",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginwidth:"marginWidth",marginheight:"marginHeight",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nomodule:"noModule",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",about:"about",accentheight:"accentHeight","accent-height":"accentHeight",accumulate:"accumulate",additive:"additive",alignmentbaseline:"alignmentBaseline","alignment-baseline":"alignmentBaseline",allowreorder:"allowReorder",alphabetic:"alphabetic",amplitude:"amplitude",arabicform:"arabicForm","arabic-form":"arabicForm",ascent:"ascent",attributename:"attributeName",attributetype:"attributeType",autoreverse:"autoReverse",azimuth:"azimuth",basefrequency:"baseFrequency",baselineshift:"baselineShift","baseline-shift":"baselineShift",baseprofile:"baseProfile",bbox:"bbox",begin:"begin",bias:"bias",by:"by",calcmode:"calcMode",capheight:"capHeight","cap-height":"capHeight",clip:"clip",clippath:"clipPath","clip-path":"clipPath",clippathunits:"clipPathUnits",cliprule:"clipRule","clip-rule":"clipRule",color:"color",colorinterpolation:"colorInterpolation","color-interpolation":"colorInterpolation",colorinterpolationfilters:"colorInterpolationFilters","color-interpolation-filters":"colorInterpolationFilters",colorprofile:"colorProfile","color-profile":"colorProfile",colorrendering:"colorRendering","color-rendering":"colorRendering",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",cursor:"cursor",cx:"cx",cy:"cy",d:"d",datatype:"datatype",decelerate:"decelerate",descent:"descent",diffuseconstant:"diffuseConstant",direction:"direction",display:"display",divisor:"divisor",dominantbaseline:"dominantBaseline","dominant-baseline":"dominantBaseline",dur:"dur",dx:"dx",dy:"dy",edgemode:"edgeMode",elevation:"elevation",enablebackground:"enableBackground","enable-background":"enableBackground",end:"end",exponent:"exponent",externalresourcesrequired:"externalResourcesRequired",fill:"fill",fillopacity:"fillOpacity","fill-opacity":"fillOpacity",fillrule:"fillRule","fill-rule":"fillRule",filter:"filter",filterres:"filterRes",filterunits:"filterUnits",floodopacity:"floodOpacity","flood-opacity":"floodOpacity",floodcolor:"floodColor","flood-color":"floodColor",focusable:"focusable",fontfamily:"fontFamily","font-family":"fontFamily",fontsize:"fontSize","font-size":"fontSize",fontsizeadjust:"fontSizeAdjust","font-size-adjust":"fontSizeAdjust",fontstretch:"fontStretch","font-stretch":"fontStretch",fontstyle:"fontStyle","font-style":"fontStyle",fontvariant:"fontVariant","font-variant":"fontVariant",fontweight:"fontWeight","font-weight":"fontWeight",format:"format",from:"from",fx:"fx",fy:"fy",g1:"g1",g2:"g2",glyphname:"glyphName","glyph-name":"glyphName",glyphorientationhorizontal:"glyphOrientationHorizontal","glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphorientationvertical:"glyphOrientationVertical","glyph-orientation-vertical":"glyphOrientationVertical",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",hanging:"hanging",horizadvx:"horizAdvX","horiz-adv-x":"horizAdvX",horizoriginx:"horizOriginX","horiz-origin-x":"horizOriginX",ideographic:"ideographic",imagerendering:"imageRendering","image-rendering":"imageRendering",in2:"in2",in:"in",inlist:"inlist",intercept:"intercept",k1:"k1",k2:"k2",k3:"k3",k4:"k4",k:"k",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",kerning:"kerning",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",letterspacing:"letterSpacing","letter-spacing":"letterSpacing",lightingcolor:"lightingColor","lighting-color":"lightingColor",limitingconeangle:"limitingConeAngle",local:"local",markerend:"markerEnd","marker-end":"markerEnd",markerheight:"markerHeight",markermid:"markerMid","marker-mid":"markerMid",markerstart:"markerStart","marker-start":"markerStart",markerunits:"markerUnits",markerwidth:"markerWidth",mask:"mask",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",mathematical:"mathematical",mode:"mode",numoctaves:"numOctaves",offset:"offset",opacity:"opacity",operator:"operator",order:"order",orient:"orient",orientation:"orientation",origin:"origin",overflow:"overflow",overlineposition:"overlinePosition","overline-position":"overlinePosition",overlinethickness:"overlineThickness","overline-thickness":"overlineThickness",paintorder:"paintOrder","paint-order":"paintOrder",panose1:"panose1","panose-1":"panose1",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointerevents:"pointerEvents","pointer-events":"pointerEvents",points:"points",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",prefix:"prefix",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",property:"property",r:"r",radius:"radius",refx:"refX",refy:"refY",renderingintent:"renderingIntent","rendering-intent":"renderingIntent",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",resource:"resource",restart:"restart",result:"result",results:"results",rotate:"rotate",rx:"rx",ry:"ry",scale:"scale",security:"security",seed:"seed",shaperendering:"shapeRendering","shape-rendering":"shapeRendering",slope:"slope",spacing:"spacing",specularconstant:"specularConstant",specularexponent:"specularExponent",speed:"speed",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stemh:"stemh",stemv:"stemv",stitchtiles:"stitchTiles",stopcolor:"stopColor","stop-color":"stopColor",stopopacity:"stopOpacity","stop-opacity":"stopOpacity",strikethroughposition:"strikethroughPosition","strikethrough-position":"strikethroughPosition",strikethroughthickness:"strikethroughThickness","strikethrough-thickness":"strikethroughThickness",string:"string",stroke:"stroke",strokedasharray:"strokeDasharray","stroke-dasharray":"strokeDasharray",strokedashoffset:"strokeDashoffset","stroke-dashoffset":"strokeDashoffset",strokelinecap:"strokeLinecap","stroke-linecap":"strokeLinecap",strokelinejoin:"strokeLinejoin","stroke-linejoin":"strokeLinejoin",strokemiterlimit:"strokeMiterlimit","stroke-miterlimit":"strokeMiterlimit",strokewidth:"strokeWidth","stroke-width":"strokeWidth",strokeopacity:"strokeOpacity","stroke-opacity":"strokeOpacity",suppresscontenteditablewarning:"suppressContentEditableWarning",suppresshydrationwarning:"suppressHydrationWarning",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textanchor:"textAnchor","text-anchor":"textAnchor",textdecoration:"textDecoration","text-decoration":"textDecoration",textlength:"textLength",textrendering:"textRendering","text-rendering":"textRendering",to:"to",transform:"transform",typeof:"typeof",u1:"u1",u2:"u2",underlineposition:"underlinePosition","underline-position":"underlinePosition",underlinethickness:"underlineThickness","underline-thickness":"underlineThickness",unicode:"unicode",unicodebidi:"unicodeBidi","unicode-bidi":"unicodeBidi",unicoderange:"unicodeRange","unicode-range":"unicodeRange",unitsperem:"unitsPerEm","units-per-em":"unitsPerEm",unselectable:"unselectable",valphabetic:"vAlphabetic","v-alphabetic":"vAlphabetic",values:"values",vectoreffect:"vectorEffect","vector-effect":"vectorEffect",version:"version",vertadvy:"vertAdvY","vert-adv-y":"vertAdvY",vertoriginx:"vertOriginX","vert-origin-x":"vertOriginX",vertoriginy:"vertOriginY","vert-origin-y":"vertOriginY",vhanging:"vHanging","v-hanging":"vHanging",videographic:"vIdeographic","v-ideographic":"vIdeographic",viewbox:"viewBox",viewtarget:"viewTarget",visibility:"visibility",vmathematical:"vMathematical","v-mathematical":"vMathematical",vocab:"vocab",widths:"widths",wordspacing:"wordSpacing","word-spacing":"wordSpacing",writingmode:"writingMode","writing-mode":"writingMode",x1:"x1",x2:"x2",x:"x",xchannelselector:"xChannelSelector",xheight:"xHeight","x-height":"xHeight",xlinkactuate:"xlinkActuate","xlink:actuate":"xlinkActuate",xlinkarcrole:"xlinkArcrole","xlink:arcrole":"xlinkArcrole",xlinkhref:"xlinkHref","xlink:href":"xlinkHref",xlinkrole:"xlinkRole","xlink:role":"xlinkRole",xlinkshow:"xlinkShow","xlink:show":"xlinkShow",xlinktitle:"xlinkTitle","xlink:title":"xlinkTitle",xlinktype:"xlinkType","xlink:type":"xlinkType",xmlbase:"xmlBase","xml:base":"xmlBase",xmllang:"xmlLang","xml:lang":"xmlLang",xmlns:"xmlns","xml:space":"xmlSpace",xmlnsxlink:"xmlnsXlink","xmlns:xlink":"xmlnsXlink",xmlspace:"xmlSpace",y1:"y1",y2:"y2",y:"y",ychannelselector:"yChannelSelector",z:"z",zoomandpan:"zoomAndPan"},Wv={"aria-current":0,"aria-description":0,"aria-details":0,"aria-disabled":0,"aria-hidden":0,"aria-invalid":0,"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,"aria-dropeffect":0,"aria-grabbed":0,"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},ko={},fR=new RegExp("^(aria)-["+ge+"]*$"),dR=new RegExp("^(aria)[A-Z]["+ge+"]*$");function mR(e,t){{if(_n.call(ko,t)&&ko[t])return!0;if(dR.test(t)){var n="aria-"+t.slice(4).toLowerCase(),r=Wv.hasOwnProperty(n)?n:null;if(r==null)return u("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",t),ko[t]=!0,!0;if(t!==r)return u("Invalid ARIA attribute `%s`. Did you mean `%s`?",t,r),ko[t]=!0,!0}if(fR.test(t)){var i=t.toLowerCase(),s=Wv.hasOwnProperty(i)?i:null;if(s==null)return ko[t]=!0,!1;if(t!==s)return u("Unknown ARIA attribute `%s`. Did you mean `%s`?",t,s),ko[t]=!0,!0}}return!0}function hR(e,t){{var n=[];for(var r in t){var i=mR(e,r);i||n.push(r)}var s=n.map(function(f){return"`"+f+"`"}).join(", ");n.length===1?u("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",s,e):n.length>1&&u("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",s,e)}}function pR(e,t){Xa(e,t)||hR(e,t)}var $v=!1;function vR(e,t){{if(e!=="input"&&e!=="textarea"&&e!=="select")return;t!=null&&t.value===null&&!$v&&($v=!0,e==="select"&&t.multiple?u("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",e):u("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",e))}}var Yv=function(){};{var Ln={},qv=/^on./,gR=/^on[^A-Z]/,yR=new RegExp("^(aria)-["+ge+"]*$"),xR=new RegExp("^(aria)[A-Z]["+ge+"]*$");Yv=function(e,t,n,r){if(_n.call(Ln,t)&&Ln[t])return!0;var i=t.toLowerCase();if(i==="onfocusin"||i==="onfocusout")return u("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),Ln[t]=!0,!0;if(r!=null){var s=r.registrationNameDependencies,f=r.possibleRegistrationNames;if(s.hasOwnProperty(t))return!0;var m=f.hasOwnProperty(i)?f[i]:null;if(m!=null)return u("Invalid event handler property `%s`. Did you mean `%s`?",t,m),Ln[t]=!0,!0;if(qv.test(t))return u("Unknown event handler property `%s`. It will be ignored.",t),Ln[t]=!0,!0}else if(qv.test(t))return gR.test(t)&&u("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",t),Ln[t]=!0,!0;if(yR.test(t)||xR.test(t))return!0;if(i==="innerhtml")return u("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),Ln[t]=!0,!0;if(i==="aria")return u("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."),Ln[t]=!0,!0;if(i==="is"&&n!==null&&n!==void 0&&typeof n!="string")return u("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",typeof n),Ln[t]=!0,!0;if(typeof n=="number"&&isNaN(n))return u("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",t),Ln[t]=!0,!0;var v=or(t),R=v!==null&&v.type===_r;if(qu.hasOwnProperty(i)){var S=qu[i];if(S!==t)return u("Invalid DOM property `%s`. Did you mean `%s`?",t,S),Ln[t]=!0,!0}else if(!R&&t!==i)return u("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",t,i),Ln[t]=!0,!0;return typeof n=="boolean"&&$n(t,n,v,!1)?(n?u('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',n,t,t,n,t):u('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',n,t,t,n,t,t,t),Ln[t]=!0,!0):R?!0:$n(t,n,v,!1)?(Ln[t]=!0,!1):((n==="false"||n==="true")&&v!==null&&v.type===Mt&&(u("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",n,t,n==="false"?"The browser will interpret it as a truthy value.":'Although this works, it will not work as expected if you pass the string "false".',t,n),Ln[t]=!0),!0)}}var bR=function(e,t,n){{var r=[];for(var i in t){var s=Yv(e,i,t[i],n);s||r.push(i)}var f=r.map(function(m){return"`"+m+"`"}).join(", ");r.length===1?u("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",f,e):r.length>1&&u("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",f,e)}};function ER(e,t,n){Xa(e,t)||bR(e,t,n)}var Qv=1,Rd=2,Qs=4,RR=Qv|Rd|Qs,Ks=null;function _R(e){Ks!==null&&u("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."),Ks=e}function SR(){Ks===null&&u("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."),Ks=null}function wR(e){return e===Ks}function _d(e){var t=e.target||e.srcElement||window;return t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===Pi?t.parentNode:t}var Sd=null,Po=null,Lo=null;function Kv(e){var t=ga(e);if(t){if(typeof Sd!="function")throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");var n=t.stateNode;if(n){var r=Mc(n);Sd(t.stateNode,t.type,r)}}}function CR(e){Sd=e}function Zv(e){Po?Lo?Lo.push(e):Lo=[e]:Po=e}function TR(){return Po!==null||Lo!==null}function Jv(){if(Po){var e=Po,t=Lo;if(Po=null,Lo=null,Kv(e),t)for(var n=0;n<t.length;n++)Kv(t[n])}}var eg=function(e,t){return e(t)},tg=function(){},wd=!1;function NR(){var e=TR();e&&(tg(),Jv())}function ng(e,t,n){if(wd)return e(t,n);wd=!0;try{return eg(e,t,n)}finally{wd=!1,NR()}}function AR(e,t,n){eg=e,tg=n}function OR(e){return e==="button"||e==="input"||e==="select"||e==="textarea"}function DR(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":return!!(n.disabled&&OR(t));default:return!1}}function Zs(e,t){var n=e.stateNode;if(n===null)return null;var r=Mc(n);if(r===null)return null;var i=r[t];if(DR(t,e.type,r))return null;if(i&&typeof i!="function")throw new Error("Expected `"+t+"` listener to be a function, instead got a value of `"+typeof i+"` type.");return i}var Cd=!1;if(Ut)try{var Js={};Object.defineProperty(Js,"passive",{get:function(){Cd=!0}}),window.addEventListener("test",Js,Js),window.removeEventListener("test",Js,Js)}catch{Cd=!1}function rg(e,t,n,r,i,s,f,m,v){var R=Array.prototype.slice.call(arguments,3);try{t.apply(n,R)}catch(S){this.onError(S)}}var ig=rg;if(typeof window<"u"&&typeof window.dispatchEvent=="function"&&typeof document<"u"&&typeof document.createEvent=="function"){var Td=document.createElement("react");ig=function(t,n,r,i,s,f,m,v,R){if(typeof document>"u"||document===null)throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var S=document.createEvent("Event"),D=!1,O=!0,z=window.event,B=Object.getOwnPropertyDescriptor(window,"event");function V(){Td.removeEventListener(I,xe,!1),typeof window.event<"u"&&window.hasOwnProperty("event")&&(window.event=z)}var ae=Array.prototype.slice.call(arguments,3);function xe(){D=!0,V(),n.apply(r,ae),O=!1}var ve,We=!1,Ve=!1;function P(L){if(ve=L.error,We=!0,ve===null&&L.colno===0&&L.lineno===0&&(Ve=!0),L.defaultPrevented&&ve!=null&&typeof ve=="object")try{ve._suppressLogging=!0}catch{}}var I="react-"+(t||"invokeguardedcallback");if(window.addEventListener("error",P),Td.addEventListener(I,xe,!1),S.initEvent(I,!1,!1),Td.dispatchEvent(S),B&&Object.defineProperty(window,"event",B),D&&O&&(We?Ve&&(ve=new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):ve=new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`),this.onError(ve)),window.removeEventListener("error",P),!D)return V(),rg.apply(this,arguments)}}var MR=ig,zo=!1,Qu=null,Ku=!1,Nd=null,kR={onError:function(e){zo=!0,Qu=e}};function Ad(e,t,n,r,i,s,f,m,v){zo=!1,Qu=null,MR.apply(kR,arguments)}function PR(e,t,n,r,i,s,f,m,v){if(Ad.apply(this,arguments),zo){var R=Od();Ku||(Ku=!0,Nd=R)}}function LR(){if(Ku){var e=Nd;throw Ku=!1,Nd=null,e}}function zR(){return zo}function Od(){if(zo){var e=Qu;return zo=!1,Qu=null,e}else throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}function Uo(e){return e._reactInternals}function UR(e){return e._reactInternals!==void 0}function BR(e,t){e._reactInternals=t}var Se=0,Bo=1,Ft=2,Ye=4,Wa=16,el=32,Dd=64,Je=128,zi=256,ca=512,$a=1024,jr=2048,Ui=4096,Ya=8192,Zu=16384,FR=jr|Ye|Dd|ca|$a|Zu,VR=32767,tl=32768,zn=65536,Md=131072,ag=1048576,kd=2097152,qa=4194304,Pd=8388608,Bi=16777216,Ju=33554432,Ld=Ye|$a|0,zd=Ft|Ye|Wa|el|ca|Ui|Ya,nl=Ye|Dd|ca|Ya,Fo=jr|Wa,Fi=qa|Pd|kd,IR=a.ReactCurrentOwner;function Qa(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{var r=t;do t=r,(t.flags&(Ft|Ui))!==Se&&(n=t.return),r=t.return;while(r)}return t.tag===T?n:null}function og(e){if(e.tag===j){var t=e.memoizedState;if(t===null){var n=e.alternate;n!==null&&(t=n.memoizedState)}if(t!==null)return t.dehydrated}return null}function sg(e){return e.tag===T?e.stateNode.containerInfo:null}function jR(e){return Qa(e)===e}function HR(e){{var t=IR.current;if(t!==null&&t.tag===p){var n=t,r=n.stateNode;r._warnedAboutRefsInRender||u("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",Pe(n)||"A component"),r._warnedAboutRefsInRender=!0}}var i=Uo(e);return i?Qa(i)===i:!1}function lg(e){if(Qa(e)!==e)throw new Error("Unable to find node on an unmounted component.")}function ug(e){var t=e.alternate;if(!t){var n=Qa(e);if(n===null)throw new Error("Unable to find node on an unmounted component.");return n!==e?null:e}for(var r=e,i=t;;){var s=r.return;if(s===null)break;var f=s.alternate;if(f===null){var m=s.return;if(m!==null){r=i=m;continue}break}if(s.child===f.child){for(var v=s.child;v;){if(v===r)return lg(s),e;if(v===i)return lg(s),t;v=v.sibling}throw new Error("Unable to find node on an unmounted component.")}if(r.return!==i.return)r=s,i=f;else{for(var R=!1,S=s.child;S;){if(S===r){R=!0,r=s,i=f;break}if(S===i){R=!0,i=s,r=f;break}S=S.sibling}if(!R){for(S=f.child;S;){if(S===r){R=!0,r=f,i=s;break}if(S===i){R=!0,i=f,r=s;break}S=S.sibling}if(!R)throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(r.alternate!==i)throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}if(r.tag!==T)throw new Error("Unable to find node on an unmounted component.");return r.stateNode.current===r?e:t}function cg(e){var t=ug(e);return t!==null?fg(t):null}function fg(e){if(e.tag===w||e.tag===k)return e;for(var t=e.child;t!==null;){var n=fg(t);if(n!==null)return n;t=t.sibling}return null}function GR(e){var t=ug(e);return t!==null?dg(t):null}function dg(e){if(e.tag===w||e.tag===k)return e;for(var t=e.child;t!==null;){if(t.tag!==C){var n=dg(t);if(n!==null)return n}t=t.sibling}return null}var mg=l.unstable_scheduleCallback,XR=l.unstable_cancelCallback,WR=l.unstable_shouldYield,$R=l.unstable_requestPaint,on=l.unstable_now,YR=l.unstable_getCurrentPriorityLevel,ec=l.unstable_ImmediatePriority,Ud=l.unstable_UserBlockingPriority,Ka=l.unstable_NormalPriority,qR=l.unstable_LowPriority,Bd=l.unstable_IdlePriority,QR=l.unstable_yieldValue,KR=l.unstable_setDisableYieldValue,Vo=null,Tn=null,le=null,ui=!1,Hr=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u";function ZR(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)return!0;if(!t.supportsFiber)return u("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{ai&&(e=Ie({},e,{getLaneLabelMap:i1,injectProfilingHooks:r1})),Vo=t.inject(e),Tn=t}catch(n){u("React instrumentation encountered an error: %s.",n)}return!!t.checkDCE}function JR(e,t){if(Tn&&typeof Tn.onScheduleFiberRoot=="function")try{Tn.onScheduleFiberRoot(Vo,e,t)}catch(n){ui||(ui=!0,u("React instrumentation encountered an error: %s",n))}}function e1(e,t){if(Tn&&typeof Tn.onCommitFiberRoot=="function")try{var n=(e.current.flags&Je)===Je;if(Lr){var r;switch(t){case cr:r=ec;break;case Ii:r=Ud;break;case ji:r=Ka;break;case sc:r=Bd;break;default:r=Ka;break}Tn.onCommitFiberRoot(Vo,e,r,n)}}catch(i){ui||(ui=!0,u("React instrumentation encountered an error: %s",i))}}function t1(e){if(Tn&&typeof Tn.onPostCommitFiberRoot=="function")try{Tn.onPostCommitFiberRoot(Vo,e)}catch(t){ui||(ui=!0,u("React instrumentation encountered an error: %s",t))}}function n1(e){if(Tn&&typeof Tn.onCommitFiberUnmount=="function")try{Tn.onCommitFiberUnmount(Vo,e)}catch(t){ui||(ui=!0,u("React instrumentation encountered an error: %s",t))}}function sn(e){if(typeof QR=="function"&&(KR(e),c(e)),Tn&&typeof Tn.setStrictMode=="function")try{Tn.setStrictMode(Vo,e)}catch(t){ui||(ui=!0,u("React instrumentation encountered an error: %s",t))}}function r1(e){le=e}function i1(){{for(var e=new Map,t=1,n=0;n<Vd;n++){var r=S1(t);e.set(t,r),t*=2}return e}}function a1(e){le!==null&&typeof le.markCommitStarted=="function"&&le.markCommitStarted(e)}function hg(){le!==null&&typeof le.markCommitStopped=="function"&&le.markCommitStopped()}function rl(e){le!==null&&typeof le.markComponentRenderStarted=="function"&&le.markComponentRenderStarted(e)}function Io(){le!==null&&typeof le.markComponentRenderStopped=="function"&&le.markComponentRenderStopped()}function o1(e){le!==null&&typeof le.markComponentPassiveEffectMountStarted=="function"&&le.markComponentPassiveEffectMountStarted(e)}function s1(){le!==null&&typeof le.markComponentPassiveEffectMountStopped=="function"&&le.markComponentPassiveEffectMountStopped()}function l1(e){le!==null&&typeof le.markComponentPassiveEffectUnmountStarted=="function"&&le.markComponentPassiveEffectUnmountStarted(e)}function u1(){le!==null&&typeof le.markComponentPassiveEffectUnmountStopped=="function"&&le.markComponentPassiveEffectUnmountStopped()}function c1(e){le!==null&&typeof le.markComponentLayoutEffectMountStarted=="function"&&le.markComponentLayoutEffectMountStarted(e)}function f1(){le!==null&&typeof le.markComponentLayoutEffectMountStopped=="function"&&le.markComponentLayoutEffectMountStopped()}function pg(e){le!==null&&typeof le.markComponentLayoutEffectUnmountStarted=="function"&&le.markComponentLayoutEffectUnmountStarted(e)}function vg(){le!==null&&typeof le.markComponentLayoutEffectUnmountStopped=="function"&&le.markComponentLayoutEffectUnmountStopped()}function d1(e,t,n){le!==null&&typeof le.markComponentErrored=="function"&&le.markComponentErrored(e,t,n)}function m1(e,t,n){le!==null&&typeof le.markComponentSuspended=="function"&&le.markComponentSuspended(e,t,n)}function h1(e){le!==null&&typeof le.markLayoutEffectsStarted=="function"&&le.markLayoutEffectsStarted(e)}function p1(){le!==null&&typeof le.markLayoutEffectsStopped=="function"&&le.markLayoutEffectsStopped()}function v1(e){le!==null&&typeof le.markPassiveEffectsStarted=="function"&&le.markPassiveEffectsStarted(e)}function g1(){le!==null&&typeof le.markPassiveEffectsStopped=="function"&&le.markPassiveEffectsStopped()}function gg(e){le!==null&&typeof le.markRenderStarted=="function"&&le.markRenderStarted(e)}function y1(){le!==null&&typeof le.markRenderYielded=="function"&&le.markRenderYielded()}function yg(){le!==null&&typeof le.markRenderStopped=="function"&&le.markRenderStopped()}function x1(e){le!==null&&typeof le.markRenderScheduled=="function"&&le.markRenderScheduled(e)}function b1(e,t){le!==null&&typeof le.markForceUpdateScheduled=="function"&&le.markForceUpdateScheduled(e,t)}function Fd(e,t){le!==null&&typeof le.markStateUpdateScheduled=="function"&&le.markStateUpdateScheduled(e,t)}var Ee=0,Ge=1,ot=2,Ot=8,ci=16,xg=Math.clz32?Math.clz32:_1,E1=Math.log,R1=Math.LN2;function _1(e){var t=e>>>0;return t===0?32:31-(E1(t)/R1|0)|0}var Vd=31,q=0,ln=0,Oe=1,jo=2,Vi=4,Za=8,fi=16,il=32,Ho=4194240,al=64,Id=128,jd=256,Hd=512,Gd=1024,Xd=2048,Wd=4096,$d=8192,Yd=16384,qd=32768,Qd=65536,Kd=131072,Zd=262144,Jd=524288,em=1048576,tm=2097152,tc=130023424,Go=4194304,nm=8388608,rm=16777216,im=33554432,am=67108864,bg=Go,ol=134217728,Eg=268435455,sl=268435456,Ja=536870912,lr=1073741824;function S1(e){{if(e&Oe)return"Sync";if(e&jo)return"InputContinuousHydration";if(e&Vi)return"InputContinuous";if(e&Za)return"DefaultHydration";if(e&fi)return"Default";if(e&il)return"TransitionHydration";if(e&Ho)return"Transition";if(e&tc)return"Retry";if(e&ol)return"SelectiveHydration";if(e&sl)return"IdleHydration";if(e&Ja)return"Idle";if(e&lr)return"Offscreen"}}var gt=-1,nc=al,rc=Go;function ll(e){switch(eo(e)){case Oe:return Oe;case jo:return jo;case Vi:return Vi;case Za:return Za;case fi:return fi;case il:return il;case al:case Id:case jd:case Hd:case Gd:case Xd:case Wd:case $d:case Yd:case qd:case Qd:case Kd:case Zd:case Jd:case em:case tm:return e&Ho;case Go:case nm:case rm:case im:case am:return e&tc;case ol:return ol;case sl:return sl;case Ja:return Ja;case lr:return lr;default:return u("Should have found matching lanes. This is a bug in React."),e}}function ic(e,t){var n=e.pendingLanes;if(n===q)return q;var r=q,i=e.suspendedLanes,s=e.pingedLanes,f=n&Eg;if(f!==q){var m=f&~i;if(m!==q)r=ll(m);else{var v=f&s;v!==q&&(r=ll(v))}}else{var R=n&~i;R!==q?r=ll(R):s!==q&&(r=ll(s))}if(r===q)return q;if(t!==q&&t!==r&&(t&i)===q){var S=eo(r),D=eo(t);if(S>=D||S===fi&&(D&Ho)!==q)return t}(r&Vi)!==q&&(r|=n&fi);var O=e.entangledLanes;if(O!==q)for(var z=e.entanglements,B=r&O;B>0;){var V=to(B),ae=1<<V;r|=z[V],B&=~ae}return r}function w1(e,t){for(var n=e.eventTimes,r=gt;t>0;){var i=to(t),s=1<<i,f=n[i];f>r&&(r=f),t&=~s}return r}function C1(e,t){switch(e){case Oe:case jo:case Vi:return t+250;case Za:case fi:case il:case al:case Id:case jd:case Hd:case Gd:case Xd:case Wd:case $d:case Yd:case qd:case Qd:case Kd:case Zd:case Jd:case em:case tm:return t+5e3;case Go:case nm:case rm:case im:case am:return gt;case ol:case sl:case Ja:case lr:return gt;default:return u("Should have found matching lanes. This is a bug in React."),gt}}function T1(e,t){for(var n=e.pendingLanes,r=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,f=n;f>0;){var m=to(f),v=1<<m,R=s[m];R===gt?((v&r)===q||(v&i)!==q)&&(s[m]=C1(v,t)):R<=t&&(e.expiredLanes|=v),f&=~v}}function N1(e){return ll(e.pendingLanes)}function om(e){var t=e.pendingLanes&~lr;return t!==q?t:t&lr?lr:q}function A1(e){return(e&Oe)!==q}function sm(e){return(e&Eg)!==q}function Rg(e){return(e&tc)===e}function O1(e){var t=Oe|Vi|fi;return(e&t)===q}function D1(e){return(e&Ho)===e}function ac(e,t){var n=jo|Vi|Za|fi;return(t&n)!==q}function M1(e,t){return(t&e.expiredLanes)!==q}function _g(e){return(e&Ho)!==q}function Sg(){var e=nc;return nc<<=1,(nc&Ho)===q&&(nc=al),e}function k1(){var e=rc;return rc<<=1,(rc&tc)===q&&(rc=Go),e}function eo(e){return e&-e}function ul(e){return eo(e)}function to(e){return 31-xg(e)}function lm(e){return to(e)}function ur(e,t){return(e&t)!==q}function Xo(e,t){return(e&t)===t}function ze(e,t){return e|t}function oc(e,t){return e&~t}function wg(e,t){return e&t}function cL(e){return e}function P1(e,t){return e!==ln&&e<t?e:t}function um(e){for(var t=[],n=0;n<Vd;n++)t.push(e);return t}function cl(e,t,n){e.pendingLanes|=t,t!==Ja&&(e.suspendedLanes=q,e.pingedLanes=q);var r=e.eventTimes,i=lm(t);r[i]=n}function L1(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,r=t;r>0;){var i=to(r),s=1<<i;n[i]=gt,r&=~s}}function Cg(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function z1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=q,e.pingedLanes=q,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var r=e.entanglements,i=e.eventTimes,s=e.expirationTimes,f=n;f>0;){var m=to(f),v=1<<m;r[m]=q,i[m]=gt,s[m]=gt,f&=~v}}function cm(e,t){for(var n=e.entangledLanes|=t,r=e.entanglements,i=n;i;){var s=to(i),f=1<<s;f&t|r[s]&t&&(r[s]|=t),i&=~f}}function U1(e,t){var n=eo(t),r;switch(n){case Vi:r=jo;break;case fi:r=Za;break;case al:case Id:case jd:case Hd:case Gd:case Xd:case Wd:case $d:case Yd:case qd:case Qd:case Kd:case Zd:case Jd:case em:case tm:case Go:case nm:case rm:case im:case am:r=il;break;case Ja:r=sl;break;default:r=ln;break}return(r&(e.suspendedLanes|t))!==ln?ln:r}function Tg(e,t,n){if(Hr)for(var r=e.pendingUpdatersLaneMap;n>0;){var i=lm(n),s=1<<i,f=r[i];f.add(t),n&=~s}}function Ng(e,t){if(Hr)for(var n=e.pendingUpdatersLaneMap,r=e.memoizedUpdaters;t>0;){var i=lm(t),s=1<<i,f=n[i];f.size>0&&(f.forEach(function(m){var v=m.alternate;(v===null||!r.has(v))&&r.add(m)}),f.clear()),t&=~s}}function Ag(e,t){return null}var cr=Oe,Ii=Vi,ji=fi,sc=Ja,fl=ln;function Gr(){return fl}function un(e){fl=e}function B1(e,t){var n=fl;try{return fl=e,t()}finally{fl=n}}function F1(e,t){return e!==0&&e<t?e:t}function V1(e,t){return e>t?e:t}function fm(e,t){return e!==0&&e<t}function Og(e){var t=eo(e);return fm(cr,t)?fm(Ii,t)?sm(t)?ji:sc:Ii:cr}function lc(e){var t=e.current.memoizedState;return t.isDehydrated}var Dg;function I1(e){Dg=e}function j1(e){Dg(e)}var dm;function H1(e){dm=e}var Mg;function G1(e){Mg=e}var kg;function X1(e){kg=e}var Pg;function W1(e){Pg=e}var mm=!1,uc=[],fa=null,da=null,ma=null,dl=new Map,ml=new Map,ha=[],$1=["mousedown","mouseup","touchcancel","touchend","touchstart","auxclick","dblclick","pointercancel","pointerdown","pointerup","dragend","dragstart","drop","compositionend","compositionstart","keydown","keypress","keyup","input","textInput","copy","cut","paste","click","change","contextmenu","reset","submit"];function Y1(e){return $1.indexOf(e)>-1}function q1(e,t,n,r,i){return{blockedOn:e,domEventName:t,eventSystemFlags:n,nativeEvent:i,targetContainers:[r]}}function Lg(e,t){switch(e){case"focusin":case"focusout":fa=null;break;case"dragenter":case"dragleave":da=null;break;case"mouseover":case"mouseout":ma=null;break;case"pointerover":case"pointerout":{var n=t.pointerId;dl.delete(n);break}case"gotpointercapture":case"lostpointercapture":{var r=t.pointerId;ml.delete(r);break}}}function hl(e,t,n,r,i,s){if(e===null||e.nativeEvent!==s){var f=q1(t,n,r,i,s);if(t!==null){var m=ga(t);m!==null&&dm(m)}return f}e.eventSystemFlags|=r;var v=e.targetContainers;return i!==null&&v.indexOf(i)===-1&&v.push(i),e}function Q1(e,t,n,r,i){switch(t){case"focusin":{var s=i;return fa=hl(fa,e,t,n,r,s),!0}case"dragenter":{var f=i;return da=hl(da,e,t,n,r,f),!0}case"mouseover":{var m=i;return ma=hl(ma,e,t,n,r,m),!0}case"pointerover":{var v=i,R=v.pointerId;return dl.set(R,hl(dl.get(R)||null,e,t,n,r,v)),!0}case"gotpointercapture":{var S=i,D=S.pointerId;return ml.set(D,hl(ml.get(D)||null,e,t,n,r,S)),!0}}return!1}function zg(e){var t=io(e.target);if(t!==null){var n=Qa(t);if(n!==null){var r=n.tag;if(r===j){var i=og(n);if(i!==null){e.blockedOn=i,Pg(e.priority,function(){Mg(n)});return}}else if(r===T){var s=n.stateNode;if(lc(s)){e.blockedOn=sg(n);return}}}}e.blockedOn=null}function K1(e){for(var t=kg(),n={blockedOn:null,target:e,priority:t},r=0;r<ha.length&&fm(t,ha[r].priority);r++);ha.splice(r,0,n),r===0&&zg(n)}function cc(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;t.length>0;){var n=t[0],r=vm(e.domEventName,e.eventSystemFlags,n,e.nativeEvent);if(r===null){var i=e.nativeEvent,s=new i.constructor(i.type,i);_R(s),i.target.dispatchEvent(s),SR()}else{var f=ga(r);return f!==null&&dm(f),e.blockedOn=r,!1}t.shift()}return!0}function Ug(e,t,n){cc(e)&&n.delete(t)}function Z1(){mm=!1,fa!==null&&cc(fa)&&(fa=null),da!==null&&cc(da)&&(da=null),ma!==null&&cc(ma)&&(ma=null),dl.forEach(Ug),ml.forEach(Ug)}function pl(e,t){e.blockedOn===t&&(e.blockedOn=null,mm||(mm=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,Z1)))}function vl(e){if(uc.length>0){pl(uc[0],e);for(var t=1;t<uc.length;t++){var n=uc[t];n.blockedOn===e&&(n.blockedOn=null)}}fa!==null&&pl(fa,e),da!==null&&pl(da,e),ma!==null&&pl(ma,e);var r=function(m){return pl(m,e)};dl.forEach(r),ml.forEach(r);for(var i=0;i<ha.length;i++){var s=ha[i];s.blockedOn===e&&(s.blockedOn=null)}for(;ha.length>0;){var f=ha[0];if(f.blockedOn!==null)break;zg(f),f.blockedOn===null&&ha.shift()}}var Wo=a.ReactCurrentBatchConfig,hm=!0;function Bg(e){hm=!!e}function J1(){return hm}function e_(e,t,n){var r=Fg(t),i;switch(r){case cr:i=t_;break;case Ii:i=n_;break;case ji:default:i=pm;break}return i.bind(null,t,n,e)}function t_(e,t,n,r){var i=Gr(),s=Wo.transition;Wo.transition=null;try{un(cr),pm(e,t,n,r)}finally{un(i),Wo.transition=s}}function n_(e,t,n,r){var i=Gr(),s=Wo.transition;Wo.transition=null;try{un(Ii),pm(e,t,n,r)}finally{un(i),Wo.transition=s}}function pm(e,t,n,r){hm&&r_(e,t,n,r)}function r_(e,t,n,r){var i=vm(e,t,n,r);if(i===null){Om(e,t,r,fc,n),Lg(e,r);return}if(Q1(i,e,t,n,r)){r.stopPropagation();return}if(Lg(e,r),t&Qs&&Y1(e)){for(;i!==null;){var s=ga(i);s!==null&&j1(s);var f=vm(e,t,n,r);if(f===null&&Om(e,t,r,fc,n),f===i)break;i=f}i!==null&&r.stopPropagation();return}Om(e,t,r,null,n)}var fc=null;function vm(e,t,n,r){fc=null;var i=_d(r),s=io(i);if(s!==null){var f=Qa(s);if(f===null)s=null;else{var m=f.tag;if(m===j){var v=og(f);if(v!==null)return v;s=null}else if(m===T){var R=f.stateNode;if(lc(R))return sg(f);s=null}else f!==s&&(s=null)}}return fc=s,null}function Fg(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return cr;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return Ii;case"message":{var t=YR();switch(t){case ec:return cr;case Ud:return Ii;case Ka:case qR:return ji;case Bd:return sc;default:return ji}}default:return ji}}function i_(e,t,n){return e.addEventListener(t,n,!1),n}function a_(e,t,n){return e.addEventListener(t,n,!0),n}function o_(e,t,n,r){return e.addEventListener(t,n,{capture:!0,passive:r}),n}function s_(e,t,n,r){return e.addEventListener(t,n,{passive:r}),n}var gl=null,gm=null,yl=null;function l_(e){return gl=e,gm=Ig(),!0}function u_(){gl=null,gm=null,yl=null}function Vg(){if(yl)return yl;var e,t=gm,n=t.length,r,i=Ig(),s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var f=n-e;for(r=1;r<=f&&t[n-r]===i[s-r];r++);var m=r>1?1-r:void 0;return yl=i.slice(e,m),yl}function Ig(){return"value"in gl?gl.value:gl.textContent}function dc(e){var t,n=e.keyCode;return"charCode"in e?(t=e.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),t>=32||t===13?t:0}function mc(){return!0}function jg(){return!1}function fr(e){function t(n,r,i,s,f){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=f,this.currentTarget=null;for(var m in e)if(e.hasOwnProperty(m)){var v=e[m];v?this[m]=v(s):this[m]=s[m]}var R=s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1;return R?this.isDefaultPrevented=mc:this.isDefaultPrevented=jg,this.isPropagationStopped=jg,this}return Ie(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=mc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=mc)},persist:function(){},isPersistent:mc}),t}var $o={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ym=fr($o),xl=Ie({},$o,{view:0,detail:0}),c_=fr(xl),xm,bm,bl;function f_(e){e!==bl&&(bl&&e.type==="mousemove"?(xm=e.screenX-bl.screenX,bm=e.screenY-bl.screenY):(xm=0,bm=0),bl=e)}var hc=Ie({},xl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rm,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(f_(e),xm)},movementY:function(e){return"movementY"in e?e.movementY:bm}}),Hg=fr(hc),d_=Ie({},hc,{dataTransfer:0}),m_=fr(d_),h_=Ie({},xl,{relatedTarget:0}),Em=fr(h_),p_=Ie({},$o,{animationName:0,elapsedTime:0,pseudoElement:0}),v_=fr(p_),g_=Ie({},$o,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),y_=fr(g_),x_=Ie({},$o,{data:0}),Gg=fr(x_),b_=Gg,E_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},R_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function __(e){if(e.key){var t=E_[e.key]||e.key;if(t!=="Unidentified")return t}if(e.type==="keypress"){var n=dc(e);return n===13?"Enter":String.fromCharCode(n)}return e.type==="keydown"||e.type==="keyup"?R_[e.keyCode]||"Unidentified":""}var S_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function w_(e){var t=this,n=t.nativeEvent;if(n.getModifierState)return n.getModifierState(e);var r=S_[e];return r?!!n[r]:!1}function Rm(e){return w_}var C_=Ie({},xl,{key:__,code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rm,charCode:function(e){return e.type==="keypress"?dc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?dc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),T_=fr(C_),N_=Ie({},hc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Xg=fr(N_),A_=Ie({},xl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rm}),O_=fr(A_),D_=Ie({},$o,{propertyName:0,elapsedTime:0,pseudoElement:0}),M_=fr(D_),k_=Ie({},hc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),P_=fr(k_),L_=[9,13,27,32],Wg=229,_m=Ut&&"CompositionEvent"in window,El=null;Ut&&"documentMode"in document&&(El=document.documentMode);var z_=Ut&&"TextEvent"in window&&!El,$g=Ut&&(!_m||El&&El>8&&El<=11),Yg=32,qg=String.fromCharCode(Yg);function U_(){nr("onBeforeInput",["compositionend","keypress","textInput","paste"]),nr("onCompositionEnd",["compositionend","focusout","keydown","keypress","keyup","mousedown"]),nr("onCompositionStart",["compositionstart","focusout","keydown","keypress","keyup","mousedown"]),nr("onCompositionUpdate",["compositionupdate","focusout","keydown","keypress","keyup","mousedown"])}var Qg=!1;function B_(e){return(e.ctrlKey||e.altKey||e.metaKey)&&!(e.ctrlKey&&e.altKey)}function F_(e){switch(e){case"compositionstart":return"onCompositionStart";case"compositionend":return"onCompositionEnd";case"compositionupdate":return"onCompositionUpdate"}}function V_(e,t){return e==="keydown"&&t.keyCode===Wg}function Kg(e,t){switch(e){case"keyup":return L_.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==Wg;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Zg(e){var t=e.detail;return typeof t=="object"&&"data"in t?t.data:null}function Jg(e){return e.locale==="ko"}var Yo=!1;function I_(e,t,n,r,i){var s,f;if(_m?s=F_(t):Yo?Kg(t,r)&&(s="onCompositionEnd"):V_(t,r)&&(s="onCompositionStart"),!s)return null;$g&&!Jg(r)&&(!Yo&&s==="onCompositionStart"?Yo=l_(i):s==="onCompositionEnd"&&Yo&&(f=Vg()));var m=xc(n,s);if(m.length>0){var v=new Gg(s,t,null,r,i);if(e.push({event:v,listeners:m}),f)v.data=f;else{var R=Zg(r);R!==null&&(v.data=R)}}}function j_(e,t){switch(e){case"compositionend":return Zg(t);case"keypress":var n=t.which;return n!==Yg?null:(Qg=!0,qg);case"textInput":var r=t.data;return r===qg&&Qg?null:r;default:return null}}function H_(e,t){if(Yo){if(e==="compositionend"||!_m&&Kg(e,t)){var n=Vg();return u_(),Yo=!1,n}return null}switch(e){case"paste":return null;case"keypress":if(!B_(t)){if(t.char&&t.char.length>1)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return $g&&!Jg(t)?null:t.data;default:return null}}function G_(e,t,n,r,i){var s;if(z_?s=j_(t,r):s=H_(t,r),!s)return null;var f=xc(n,"onBeforeInput");if(f.length>0){var m=new b_("onBeforeInput","beforeinput",null,r,i);e.push({event:m,listeners:f}),m.data=s}}function X_(e,t,n,r,i,s,f){I_(e,t,n,r,i),G_(e,t,n,r,i)}var W_={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ey(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!W_[e.type]:t==="textarea"}/**
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
 */function $_(e){if(!Ut)return!1;var t="on"+e,n=t in document;if(!n){var r=document.createElement("div");r.setAttribute(t,"return;"),n=typeof r[t]=="function"}return n}function Y_(){nr("onChange",["change","click","focusin","focusout","input","keydown","keyup","selectionchange"])}function ty(e,t,n,r){Zv(r);var i=xc(t,"onChange");if(i.length>0){var s=new ym("onChange","change",null,n,r);e.push({event:s,listeners:i})}}var Rl=null,_l=null;function q_(e){var t=e.nodeName&&e.nodeName.toLowerCase();return t==="select"||t==="input"&&e.type==="file"}function Q_(e){var t=[];ty(t,_l,e,_d(e)),ng(K_,t)}function K_(e){xy(e,0)}function pc(e){var t=es(e);if(Ao(t))return e}function Z_(e,t){if(e==="change")return t}var ny=!1;Ut&&(ny=$_("input")&&(!document.documentMode||document.documentMode>9));function J_(e,t){Rl=e,_l=t,Rl.attachEvent("onpropertychange",iy)}function ry(){Rl&&(Rl.detachEvent("onpropertychange",iy),Rl=null,_l=null)}function iy(e){e.propertyName==="value"&&pc(_l)&&Q_(e)}function eS(e,t,n){e==="focusin"?(ry(),J_(t,n)):e==="focusout"&&ry()}function tS(e,t){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pc(_l)}function nS(e){var t=e.nodeName;return t&&t.toLowerCase()==="input"&&(e.type==="checkbox"||e.type==="radio")}function rS(e,t){if(e==="click")return pc(t)}function iS(e,t){if(e==="input"||e==="change")return pc(t)}function aS(e){var t=e._wrapperState;!t||!t.controlled||e.type!=="number"||Ae(e,"number",e.value)}function oS(e,t,n,r,i,s,f){var m=n?es(n):window,v,R;if(q_(m)?v=Z_:ey(m)?ny?v=iS:(v=tS,R=eS):nS(m)&&(v=rS),v){var S=v(t,n);if(S){ty(e,S,r,i);return}}R&&R(t,m,n),t==="focusout"&&aS(m)}function sS(){rr("onMouseEnter",["mouseout","mouseover"]),rr("onMouseLeave",["mouseout","mouseover"]),rr("onPointerEnter",["pointerout","pointerover"]),rr("onPointerLeave",["pointerout","pointerover"])}function lS(e,t,n,r,i,s,f){var m=t==="mouseover"||t==="pointerover",v=t==="mouseout"||t==="pointerout";if(m&&!wR(r)){var R=r.relatedTarget||r.fromElement;if(R&&(io(R)||Bl(R)))return}if(!(!v&&!m)){var S;if(i.window===i)S=i;else{var D=i.ownerDocument;D?S=D.defaultView||D.parentWindow:S=window}var O,z;if(v){var B=r.relatedTarget||r.toElement;if(O=n,z=B?io(B):null,z!==null){var V=Qa(z);(z!==V||z.tag!==w&&z.tag!==k)&&(z=null)}}else O=null,z=n;if(O!==z){var ae=Hg,xe="onMouseLeave",ve="onMouseEnter",We="mouse";(t==="pointerout"||t==="pointerover")&&(ae=Xg,xe="onPointerLeave",ve="onPointerEnter",We="pointer");var Ve=O==null?S:es(O),P=z==null?S:es(z),I=new ae(xe,We+"leave",O,r,i);I.target=Ve,I.relatedTarget=P;var L=null,Z=io(i);if(Z===n){var ce=new ae(ve,We+"enter",z,r,i);ce.target=P,ce.relatedTarget=Ve,L=ce}MS(e,I,L,O,z)}}}function uS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var dr=typeof Object.is=="function"?Object.is:uS;function Sl(e,t){if(dr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(var i=0;i<n.length;i++){var s=n[i];if(!_n.call(t,s)||!dr(e[s],t[s]))return!1}return!0}function ay(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cS(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}function oy(e,t){for(var n=ay(e),r=0,i=0;n;){if(n.nodeType===Pi){if(i=r+n.textContent.length,r<=t&&i>=t)return{node:n,offset:t-r};r=i}n=ay(cS(n))}}function fS(e){var t=e.ownerDocument,n=t&&t.defaultView||window,r=n.getSelection&&n.getSelection();if(!r||r.rangeCount===0)return null;var i=r.anchorNode,s=r.anchorOffset,f=r.focusNode,m=r.focusOffset;try{i.nodeType,f.nodeType}catch{return null}return dS(e,i,s,f,m)}function dS(e,t,n,r,i){var s=0,f=-1,m=-1,v=0,R=0,S=e,D=null;e:for(;;){for(var O=null;S===t&&(n===0||S.nodeType===Pi)&&(f=s+n),S===r&&(i===0||S.nodeType===Pi)&&(m=s+i),S.nodeType===Pi&&(s+=S.nodeValue.length),(O=S.firstChild)!==null;)D=S,S=O;for(;;){if(S===e)break e;if(D===t&&++v===n&&(f=s),D===r&&++R===i&&(m=s),(O=S.nextSibling)!==null)break;S=D,D=S.parentNode}S=O}return f===-1||m===-1?null:{start:f,end:m}}function mS(e,t){var n=e.ownerDocument||document,r=n&&n.defaultView||window;if(r.getSelection){var i=r.getSelection(),s=e.textContent.length,f=Math.min(t.start,s),m=t.end===void 0?f:Math.min(t.end,s);if(!i.extend&&f>m){var v=m;m=f,f=v}var R=oy(e,f),S=oy(e,m);if(R&&S){if(i.rangeCount===1&&i.anchorNode===R.node&&i.anchorOffset===R.offset&&i.focusNode===S.node&&i.focusOffset===S.offset)return;var D=n.createRange();D.setStart(R.node,R.offset),i.removeAllRanges(),f>m?(i.addRange(D),i.extend(S.node,S.offset)):(D.setEnd(S.node,S.offset),i.addRange(D))}}}function sy(e){return e&&e.nodeType===Pi}function ly(e,t){return!e||!t?!1:e===t?!0:sy(e)?!1:sy(t)?ly(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1}function hS(e){return e&&e.ownerDocument&&ly(e.ownerDocument.documentElement,e)}function pS(e){try{return typeof e.contentWindow.location.href=="string"}catch{return!1}}function uy(){for(var e=window,t=la();t instanceof e.HTMLIFrameElement;){if(pS(t))e=t.contentWindow;else return t;t=la(e.document)}return t}function Sm(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function vS(){var e=uy();return{focusedElem:e,selectionRange:Sm(e)?yS(e):null}}function gS(e){var t=uy(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&hS(n)){r!==null&&Sm(n)&&xS(n,r);for(var i=[],s=n;s=s.parentNode;)s.nodeType===qn&&i.push({element:s,left:s.scrollLeft,top:s.scrollTop});typeof n.focus=="function"&&n.focus();for(var f=0;f<i.length;f++){var m=i[f];m.element.scrollLeft=m.left,m.element.scrollTop=m.top}}}function yS(e){var t;return"selectionStart"in e?t={start:e.selectionStart,end:e.selectionEnd}:t=fS(e),t||{start:0,end:0}}function xS(e,t){var n=t.start,r=t.end;r===void 0&&(r=n),"selectionStart"in e?(e.selectionStart=n,e.selectionEnd=Math.min(r,e.value.length)):mS(e,t)}var bS=Ut&&"documentMode"in document&&document.documentMode<=11;function ES(){nr("onSelect",["focusout","contextmenu","dragend","focusin","keydown","keyup","mousedown","mouseup","selectionchange"])}var qo=null,wm=null,wl=null,Cm=!1;function RS(e){if("selectionStart"in e&&Sm(e))return{start:e.selectionStart,end:e.selectionEnd};var t=e.ownerDocument&&e.ownerDocument.defaultView||window,n=t.getSelection();return{anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}}function _S(e){return e.window===e?e.document:e.nodeType===Li?e:e.ownerDocument}function cy(e,t,n){var r=_S(n);if(!(Cm||qo==null||qo!==la(r))){var i=RS(qo);if(!wl||!Sl(wl,i)){wl=i;var s=xc(wm,"onSelect");if(s.length>0){var f=new ym("onSelect","select",null,t,n);e.push({event:f,listeners:s}),f.target=qo}}}}function SS(e,t,n,r,i,s,f){var m=n?es(n):window;switch(t){case"focusin":(ey(m)||m.contentEditable==="true")&&(qo=m,wm=n,wl=null);break;case"focusout":qo=null,wm=null,wl=null;break;case"mousedown":Cm=!0;break;case"contextmenu":case"mouseup":case"dragend":Cm=!1,cy(e,r,i);break;case"selectionchange":if(bS)break;case"keydown":case"keyup":cy(e,r,i)}}function vc(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Qo={animationend:vc("Animation","AnimationEnd"),animationiteration:vc("Animation","AnimationIteration"),animationstart:vc("Animation","AnimationStart"),transitionend:vc("Transition","TransitionEnd")},Tm={},fy={};Ut&&(fy=document.createElement("div").style,"AnimationEvent"in window||(delete Qo.animationend.animation,delete Qo.animationiteration.animation,delete Qo.animationstart.animation),"TransitionEvent"in window||delete Qo.transitionend.transition);function gc(e){if(Tm[e])return Tm[e];if(!Qo[e])return e;var t=Qo[e];for(var n in t)if(t.hasOwnProperty(n)&&n in fy)return Tm[e]=t[n];return e}var dy=gc("animationend"),my=gc("animationiteration"),hy=gc("animationstart"),py=gc("transitionend"),vy=new Map,gy=["abort","auxClick","cancel","canPlay","canPlayThrough","click","close","contextMenu","copy","cut","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","gotPointerCapture","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","lostPointerCapture","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","pointerCancel","pointerDown","pointerMove","pointerOut","pointerOver","pointerUp","progress","rateChange","reset","resize","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchStart","volumeChange","scroll","toggle","touchMove","waiting","wheel"];function pa(e,t){vy.set(e,t),nr(t,[e])}function wS(){for(var e=0;e<gy.length;e++){var t=gy[e],n=t.toLowerCase(),r=t[0].toUpperCase()+t.slice(1);pa(n,"on"+r)}pa(dy,"onAnimationEnd"),pa(my,"onAnimationIteration"),pa(hy,"onAnimationStart"),pa("dblclick","onDoubleClick"),pa("focusin","onFocus"),pa("focusout","onBlur"),pa(py,"onTransitionEnd")}function CS(e,t,n,r,i,s,f){var m=vy.get(t);if(m!==void 0){var v=ym,R=t;switch(t){case"keypress":if(dc(r)===0)return;case"keydown":case"keyup":v=T_;break;case"focusin":R="focus",v=Em;break;case"focusout":R="blur",v=Em;break;case"beforeblur":case"afterblur":v=Em;break;case"click":if(r.button===2)return;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Hg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=m_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=O_;break;case dy:case my:case hy:v=v_;break;case py:v=M_;break;case"scroll":v=c_;break;case"wheel":v=P_;break;case"copy":case"cut":case"paste":v=y_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Xg;break}var S=(s&Qs)!==0;{var D=!S&&t==="scroll",O=OS(n,m,r.type,S,D);if(O.length>0){var z=new v(m,R,null,r,i);e.push({event:z,listeners:O})}}}}wS(),sS(),Y_(),ES(),U_();function TS(e,t,n,r,i,s,f){CS(e,t,n,r,i,s);var m=(s&RR)===0;m&&(lS(e,t,n,r,i),oS(e,t,n,r,i),SS(e,t,n,r,i),X_(e,t,n,r,i))}var Cl=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","resize","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],Nm=new Set(["cancel","close","invalid","load","scroll","toggle"].concat(Cl));function yy(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,PR(r,t,void 0,e),e.currentTarget=null}function NS(e,t,n){var r;if(n)for(var i=t.length-1;i>=0;i--){var s=t[i],f=s.instance,m=s.currentTarget,v=s.listener;if(f!==r&&e.isPropagationStopped())return;yy(e,v,m),r=f}else for(var R=0;R<t.length;R++){var S=t[R],D=S.instance,O=S.currentTarget,z=S.listener;if(D!==r&&e.isPropagationStopped())return;yy(e,z,O),r=D}}function xy(e,t){for(var n=(t&Qs)!==0,r=0;r<e.length;r++){var i=e[r],s=i.event,f=i.listeners;NS(s,f,n)}LR()}function AS(e,t,n,r,i){var s=_d(n),f=[];TS(f,e,r,n,s,t),xy(f,t)}function Et(e,t){Nm.has(e)||u('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',e);var n=!1,r=aC(t),i=kS(e);r.has(i)||(by(t,e,Rd,n),r.add(i))}function Am(e,t,n){Nm.has(e)&&!t&&u('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',e);var r=0;t&&(r|=Qs),by(n,e,r,t)}var yc="_reactListening"+Math.random().toString(36).slice(2);function Tl(e){if(!e[yc]){e[yc]=!0,br.forEach(function(n){n!=="selectionchange"&&(Nm.has(n)||Am(n,!1,e),Am(n,!0,e))});var t=e.nodeType===Li?e:e.ownerDocument;t!==null&&(t[yc]||(t[yc]=!0,Am("selectionchange",!1,t)))}}function by(e,t,n,r,i){var s=e_(e,t,n),f=void 0;Cd&&(t==="touchstart"||t==="touchmove"||t==="wheel")&&(f=!0),e=e,r?f!==void 0?o_(e,t,s,f):a_(e,t,s):f!==void 0?s_(e,t,s,f):i_(e,t,s)}function Ey(e,t){return e===t||e.nodeType===Bt&&e.parentNode===t}function Om(e,t,n,r,i){var s=r;if(!(t&Qv)&&!(t&Rd)){var f=i;if(r!==null){var m=r;e:for(;;){if(m===null)return;var v=m.tag;if(v===T||v===C){var R=m.stateNode.containerInfo;if(Ey(R,f))break;if(v===C)for(var S=m.return;S!==null;){var D=S.tag;if(D===T||D===C){var O=S.stateNode.containerInfo;if(Ey(O,f))return}S=S.return}for(;R!==null;){var z=io(R);if(z===null)return;var B=z.tag;if(B===w||B===k){m=s=z;continue e}R=R.parentNode}}m=m.return}}}ng(function(){return AS(e,t,n,s)})}function Nl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function OS(e,t,n,r,i,s){for(var f=t!==null?t+"Capture":null,m=r?f:t,v=[],R=e,S=null;R!==null;){var D=R,O=D.stateNode,z=D.tag;if(z===w&&O!==null&&(S=O,m!==null)){var B=Zs(R,m);B!=null&&v.push(Nl(R,B,S))}if(i)break;R=R.return}return v}function xc(e,t){for(var n=t+"Capture",r=[],i=e;i!==null;){var s=i,f=s.stateNode,m=s.tag;if(m===w&&f!==null){var v=f,R=Zs(i,n);R!=null&&r.unshift(Nl(i,R,v));var S=Zs(i,t);S!=null&&r.push(Nl(i,S,v))}i=i.return}return r}function Ko(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==w);return e||null}function DS(e,t){for(var n=e,r=t,i=0,s=n;s;s=Ko(s))i++;for(var f=0,m=r;m;m=Ko(m))f++;for(;i-f>0;)n=Ko(n),i--;for(;f-i>0;)r=Ko(r),f--;for(var v=i;v--;){if(n===r||r!==null&&n===r.alternate)return n;n=Ko(n),r=Ko(r)}return null}function Ry(e,t,n,r,i){for(var s=t._reactName,f=[],m=n;m!==null&&m!==r;){var v=m,R=v.alternate,S=v.stateNode,D=v.tag;if(R!==null&&R===r)break;if(D===w&&S!==null){var O=S;if(i){var z=Zs(m,s);z!=null&&f.unshift(Nl(m,z,O))}else if(!i){var B=Zs(m,s);B!=null&&f.push(Nl(m,B,O))}}m=m.return}f.length!==0&&e.push({event:t,listeners:f})}function MS(e,t,n,r,i){var s=r&&i?DS(r,i):null;r!==null&&Ry(e,t,r,s,!1),i!==null&&n!==null&&Ry(e,n,i,s,!0)}function kS(e,t){return e+"__bubble"}var Qn=!1,Al="dangerouslySetInnerHTML",bc="suppressContentEditableWarning",va="suppressHydrationWarning",_y="autoFocus",no="children",ro="style",Ec="__html",Dm,Rc,Ol,Sy,_c,wy,Cy;Dm={dialog:!0,webview:!0},Rc=function(e,t){pR(e,t),vR(e,t),ER(e,t,{registrationNameDependencies:dn,possibleRegistrationNames:Xn})},wy=Ut&&!document.documentMode,Ol=function(e,t,n){if(!Qn){var r=Sc(n),i=Sc(t);i!==r&&(Qn=!0,u("Prop `%s` did not match. Server: %s Client: %s",e,JSON.stringify(i),JSON.stringify(r)))}},Sy=function(e){if(!Qn){Qn=!0;var t=[];e.forEach(function(n){t.push(n)}),u("Extra attributes from the server: %s",t)}},_c=function(e,t){t===!1?u("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",e,e,e):u("Expected `%s` listener to be a function, instead got a value of `%s` type.",e,typeof t)},Cy=function(e,t){var n=e.namespaceURI===ki?e.ownerDocument.createElement(e.tagName):e.ownerDocument.createElementNS(e.namespaceURI,e.tagName);return n.innerHTML=t,n.innerHTML};var PS=/\r\n?/g,LS=/\u0000|\uFFFD/g;function Sc(e){Rr(e);var t=typeof e=="string"?e:""+e;return t.replace(PS,`
`).replace(LS,"")}function wc(e,t,n,r){var i=Sc(t),s=Sc(e);if(s!==i&&(r&&(Qn||(Qn=!0,u('Text content did not match. Server: "%s" Client: "%s"',s,i))),n&&ke))throw new Error("Text content does not match server-rendered HTML.")}function Ty(e){return e.nodeType===Li?e:e.ownerDocument}function zS(){}function Cc(e){e.onclick=zS}function US(e,t,n,r,i){for(var s in r)if(r.hasOwnProperty(s)){var f=r[s];if(s===ro)f&&Object.freeze(f),Gv(t,f);else if(s===Al){var m=f?f[Ec]:void 0;m!=null&&Fv(t,m)}else if(s===no)if(typeof f=="string"){var v=e!=="textarea"||f!=="";v&&Yu(t,f)}else typeof f=="number"&&Yu(t,""+f);else s===bc||s===va||s===_y||(dn.hasOwnProperty(s)?f!=null&&(typeof f!="function"&&_c(s,f),s==="onScroll"&&Et("scroll",t)):f!=null&&Ai(t,s,f,i))}}function BS(e,t,n,r){for(var i=0;i<t.length;i+=2){var s=t[i],f=t[i+1];s===ro?Gv(e,f):s===Al?Fv(e,f):s===no?Yu(e,f):Ai(e,s,f,r)}}function FS(e,t,n,r){var i,s=Ty(n),f,m=r;if(m===ki&&(m=vd(e)),m===ki){if(i=Xa(e,t),!i&&e!==e.toLowerCase()&&u("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",e),e==="script"){var v=s.createElement("div");v.innerHTML="<script><\/script>";var R=v.firstChild;f=v.removeChild(R)}else if(typeof t.is=="string")f=s.createElement(e,{is:t.is});else if(f=s.createElement(e),e==="select"){var S=f;t.multiple?S.multiple=!0:t.size&&(S.size=t.size)}}else f=s.createElementNS(m,e);return m===ki&&!i&&Object.prototype.toString.call(f)==="[object HTMLUnknownElement]"&&!_n.call(Dm,e)&&(Dm[e]=!0,u("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",e)),f}function VS(e,t){return Ty(t).createTextNode(e)}function IS(e,t,n,r){var i=Xa(t,n);Rc(t,n);var s;switch(t){case"dialog":Et("cancel",e),Et("close",e),s=n;break;case"iframe":case"object":case"embed":Et("load",e),s=n;break;case"video":case"audio":for(var f=0;f<Cl.length;f++)Et(Cl[f],e);s=n;break;case"source":Et("error",e),s=n;break;case"img":case"image":case"link":Et("error",e),Et("load",e),s=n;break;case"details":Et("toggle",e),s=n;break;case"input":N(e,n),s=y(e,n),Et("invalid",e);break;case"option":mt(e,n),s=n;break;case"select":Ys(e,n),s=$s(e,n),Et("invalid",e);break;case"textarea":zv(e,n),s=hd(e,n),Et("invalid",e);break;default:s=n}switch(Ed(t,s),US(t,e,r,s,i),t){case"input":Di(e),ee(e,n,!1);break;case"textarea":Di(e),Bv(e);break;case"option":bt(e,n);break;case"select":md(e,n);break;default:typeof s.onClick=="function"&&Cc(e);break}}function jS(e,t,n,r,i){Rc(t,r);var s=null,f,m;switch(t){case"input":f=y(e,n),m=y(e,r),s=[];break;case"select":f=$s(e,n),m=$s(e,r),s=[];break;case"textarea":f=hd(e,n),m=hd(e,r),s=[];break;default:f=n,m=r,typeof f.onClick!="function"&&typeof m.onClick=="function"&&Cc(e);break}Ed(t,m);var v,R,S=null;for(v in f)if(!(m.hasOwnProperty(v)||!f.hasOwnProperty(v)||f[v]==null))if(v===ro){var D=f[v];for(R in D)D.hasOwnProperty(R)&&(S||(S={}),S[R]="")}else v===Al||v===no||v===bc||v===va||v===_y||(dn.hasOwnProperty(v)?s||(s=[]):(s=s||[]).push(v,null));for(v in m){var O=m[v],z=f!=null?f[v]:void 0;if(!(!m.hasOwnProperty(v)||O===z||O==null&&z==null))if(v===ro)if(O&&Object.freeze(O),z){for(R in z)z.hasOwnProperty(R)&&(!O||!O.hasOwnProperty(R))&&(S||(S={}),S[R]="");for(R in O)O.hasOwnProperty(R)&&z[R]!==O[R]&&(S||(S={}),S[R]=O[R])}else S||(s||(s=[]),s.push(v,S)),S=O;else if(v===Al){var B=O?O[Ec]:void 0,V=z?z[Ec]:void 0;B!=null&&V!==B&&(s=s||[]).push(v,B)}else v===no?(typeof O=="string"||typeof O=="number")&&(s=s||[]).push(v,""+O):v===bc||v===va||(dn.hasOwnProperty(v)?(O!=null&&(typeof O!="function"&&_c(v,O),v==="onScroll"&&Et("scroll",e)),!s&&z!==O&&(s=[])):(s=s||[]).push(v,O))}return S&&(sR(S,m[ro]),(s=s||[]).push(ro,S)),s}function HS(e,t,n,r,i){n==="input"&&i.type==="radio"&&i.name!=null&&U(e,i);var s=Xa(n,r),f=Xa(n,i);switch(BS(e,t,s,f),n){case"input":F(e,i);break;case"textarea":Uv(e,i);break;case"select":BE(e,i);break}}function GS(e){{var t=e.toLowerCase();return qu.hasOwnProperty(t)&&qu[t]||null}}function XS(e,t,n,r,i,s,f){var m,v;switch(m=Xa(t,n),Rc(t,n),t){case"dialog":Et("cancel",e),Et("close",e);break;case"iframe":case"object":case"embed":Et("load",e);break;case"video":case"audio":for(var R=0;R<Cl.length;R++)Et(Cl[R],e);break;case"source":Et("error",e);break;case"img":case"image":case"link":Et("error",e),Et("load",e);break;case"details":Et("toggle",e);break;case"input":N(e,n),Et("invalid",e);break;case"option":mt(e,n);break;case"select":Ys(e,n),Et("invalid",e);break;case"textarea":zv(e,n),Et("invalid",e);break}Ed(t,n);{v=new Set;for(var S=e.attributes,D=0;D<S.length;D++){var O=S[D].name.toLowerCase();switch(O){case"value":break;case"checked":break;case"selected":break;default:v.add(S[D].name)}}}var z=null;for(var B in n)if(n.hasOwnProperty(B)){var V=n[B];if(B===no)typeof V=="string"?e.textContent!==V&&(n[va]!==!0&&wc(e.textContent,V,s,f),z=[no,V]):typeof V=="number"&&e.textContent!==""+V&&(n[va]!==!0&&wc(e.textContent,V,s,f),z=[no,""+V]);else if(dn.hasOwnProperty(B))V!=null&&(typeof V!="function"&&_c(B,V),B==="onScroll"&&Et("scroll",e));else if(f&&typeof m=="boolean"){var ae=void 0,xe=m&&fn?null:or(B);if(n[va]!==!0){if(!(B===bc||B===va||B==="value"||B==="checked"||B==="selected")){if(B===Al){var ve=e.innerHTML,We=V?V[Ec]:void 0;if(We!=null){var Ve=Cy(e,We);Ve!==ve&&Ol(B,ve,Ve)}}else if(B===ro){if(v.delete(B),wy){var P=aR(V);ae=e.getAttribute("style"),P!==ae&&Ol(B,ae,P)}}else if(m&&!fn)v.delete(B.toLowerCase()),ae=ta(e,B,V),V!==ae&&Ol(B,ae,V);else if(!kt(B,xe,m)&&!ft(B,V,xe,m)){var I=!1;if(xe!==null)v.delete(xe.attributeName),ae=Ni(e,B,V,xe);else{var L=r;if(L===ki&&(L=vd(t)),L===ki)v.delete(B.toLowerCase());else{var Z=GS(B);Z!==null&&Z!==B&&(I=!0,v.delete(Z)),v.delete(B)}ae=ta(e,B,V)}var ce=fn;!ce&&V!==ae&&!I&&Ol(B,ae,V)}}}}}switch(f&&v.size>0&&n[va]!==!0&&Sy(v),t){case"input":Di(e),ee(e,n,!0);break;case"textarea":Di(e),Bv(e);break;case"select":case"option":break;default:typeof n.onClick=="function"&&Cc(e);break}return z}function WS(e,t,n){var r=e.nodeValue!==t;return r}function Mm(e,t){{if(Qn)return;Qn=!0,u("Did not expect server HTML to contain a <%s> in <%s>.",t.nodeName.toLowerCase(),e.nodeName.toLowerCase())}}function km(e,t){{if(Qn)return;Qn=!0,u('Did not expect server HTML to contain the text node "%s" in <%s>.',t.nodeValue,e.nodeName.toLowerCase())}}function Pm(e,t,n){{if(Qn)return;Qn=!0,u("Expected server HTML to contain a matching <%s> in <%s>.",t,e.nodeName.toLowerCase())}}function Lm(e,t){{if(t===""||Qn)return;Qn=!0,u('Expected server HTML to contain a matching text node for "%s" in <%s>.',t,e.nodeName.toLowerCase())}}function $S(e,t,n){switch(t){case"input":Ce(e,n);return;case"textarea":VE(e,n);return;case"select":FE(e,n);return}}var Dl=function(){},Ml=function(){};{var YS=["address","applet","area","article","aside","base","basefont","bgsound","blockquote","body","br","button","caption","center","col","colgroup","dd","details","dir","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","isindex","li","link","listing","main","marquee","menu","menuitem","meta","nav","noembed","noframes","noscript","object","ol","p","param","plaintext","pre","script","section","select","source","style","summary","table","tbody","td","template","textarea","tfoot","th","thead","title","tr","track","ul","wbr","xmp"],Ny=["applet","caption","html","table","td","th","marquee","object","template","foreignObject","desc","title"],qS=Ny.concat(["button"]),QS=["dd","dt","li","option","optgroup","p","rp","rt"],Ay={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};Ml=function(e,t){var n=Ie({},e||Ay),r={tag:t};return Ny.indexOf(t)!==-1&&(n.aTagInScope=null,n.buttonTagInScope=null,n.nobrTagInScope=null),qS.indexOf(t)!==-1&&(n.pTagInButtonScope=null),YS.indexOf(t)!==-1&&t!=="address"&&t!=="div"&&t!=="p"&&(n.listItemTagAutoclosing=null,n.dlItemTagAutoclosing=null),n.current=r,t==="form"&&(n.formTag=r),t==="a"&&(n.aTagInScope=r),t==="button"&&(n.buttonTagInScope=r),t==="nobr"&&(n.nobrTagInScope=r),t==="p"&&(n.pTagInButtonScope=r),t==="li"&&(n.listItemTagAutoclosing=r),(t==="dd"||t==="dt")&&(n.dlItemTagAutoclosing=r),n};var KS=function(e,t){switch(t){case"select":return e==="option"||e==="optgroup"||e==="#text";case"optgroup":return e==="option"||e==="#text";case"option":return e==="#text";case"tr":return e==="th"||e==="td"||e==="style"||e==="script"||e==="template";case"tbody":case"thead":case"tfoot":return e==="tr"||e==="style"||e==="script"||e==="template";case"colgroup":return e==="col"||e==="template";case"table":return e==="caption"||e==="colgroup"||e==="tbody"||e==="tfoot"||e==="thead"||e==="style"||e==="script"||e==="template";case"head":return e==="base"||e==="basefont"||e==="bgsound"||e==="link"||e==="meta"||e==="title"||e==="noscript"||e==="noframes"||e==="style"||e==="script"||e==="template";case"html":return e==="head"||e==="body"||e==="frameset";case"frameset":return e==="frame";case"#document":return e==="html"}switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t!=="h1"&&t!=="h2"&&t!=="h3"&&t!=="h4"&&t!=="h5"&&t!=="h6";case"rp":case"rt":return QS.indexOf(t)===-1;case"body":case"caption":case"col":case"colgroup":case"frameset":case"frame":case"head":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":return t==null}return!0},ZS=function(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null},Oy={};Dl=function(e,t,n){n=n||Ay;var r=n.current,i=r&&r.tag;t!=null&&(e!=null&&u("validateDOMNesting: when childText is passed, childTag should be null"),e="#text");var s=KS(e,i)?null:r,f=s?null:ZS(e,n),m=s||f;if(m){var v=m.tag,R=!!s+"|"+e+"|"+v;if(!Oy[R]){Oy[R]=!0;var S=e,D="";if(e==="#text"?/\S/.test(t)?S="Text nodes":(S="Whitespace text nodes",D=" Make sure you don't have any extra whitespace between tags on each line of your source code."):S="<"+e+">",s){var O="";v==="table"&&e==="tr"&&(O+=" Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),u("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s",S,v,D,O)}else u("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.",S,v)}}}}var Tc="suppressHydrationWarning",Nc="$",Ac="/$",kl="$?",Pl="$!",JS="style",zm=null,Um=null;function ew(e){var t,n,r=e.nodeType;switch(r){case Li:case yd:{t=r===Li?"#document":"#fragment";var i=e.documentElement;n=i?i.namespaceURI:gd(null,"");break}default:{var s=r===Bt?e.parentNode:e,f=s.namespaceURI||null;t=s.tagName,n=gd(f,t);break}}{var m=t.toLowerCase(),v=Ml(null,m);return{namespace:n,ancestorInfo:v}}}function tw(e,t,n){{var r=e,i=gd(r.namespace,t),s=Ml(r.ancestorInfo,t);return{namespace:i,ancestorInfo:s}}}function fL(e){return e}function nw(e){zm=J1(),Um=vS();var t=null;return Bg(!1),t}function rw(e){gS(Um),Bg(zm),zm=null,Um=null}function iw(e,t,n,r,i){var s;{var f=r;if(Dl(e,null,f.ancestorInfo),typeof t.children=="string"||typeof t.children=="number"){var m=""+t.children,v=Ml(f.ancestorInfo,e);Dl(null,m,v)}s=f.namespace}var R=FS(e,t,n,s);return Ul(i,R),Xm(R,t),R}function aw(e,t){e.appendChild(t)}function ow(e,t,n,r,i){switch(IS(e,t,n,r),t){case"button":case"input":case"select":case"textarea":return!!n.autoFocus;case"img":return!0;default:return!1}}function sw(e,t,n,r,i,s){{var f=s;if(typeof r.children!=typeof n.children&&(typeof r.children=="string"||typeof r.children=="number")){var m=""+r.children,v=Ml(f.ancestorInfo,t);Dl(null,m,v)}}return jS(e,t,n,r)}function Bm(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}function lw(e,t,n,r){{var i=n;Dl(null,e,i.ancestorInfo)}var s=VS(e,t);return Ul(r,s),s}function uw(){var e=window.event;return e===void 0?ji:Fg(e.type)}var Fm=typeof setTimeout=="function"?setTimeout:void 0,cw=typeof clearTimeout=="function"?clearTimeout:void 0,Vm=-1,Dy=typeof Promise=="function"?Promise:void 0,fw=typeof queueMicrotask=="function"?queueMicrotask:typeof Dy<"u"?function(e){return Dy.resolve(null).then(e).catch(dw)}:Fm;function dw(e){setTimeout(function(){throw e})}function mw(e,t,n,r){switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&e.focus();return;case"img":{n.src&&(e.src=n.src);return}}}function hw(e,t,n,r,i,s){HS(e,t,n,r,i),Xm(e,i)}function My(e){Yu(e,"")}function pw(e,t,n){e.nodeValue=n}function vw(e,t){e.appendChild(t)}function gw(e,t){var n;e.nodeType===Bt?(n=e.parentNode,n.insertBefore(t,e)):(n=e,n.appendChild(t));var r=e._reactRootContainer;r==null&&n.onclick===null&&Cc(n)}function yw(e,t,n){e.insertBefore(t,n)}function xw(e,t,n){e.nodeType===Bt?e.parentNode.insertBefore(t,n):e.insertBefore(t,n)}function bw(e,t){e.removeChild(t)}function Ew(e,t){e.nodeType===Bt?e.parentNode.removeChild(t):e.removeChild(t)}function Im(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===Bt){var s=i.data;if(s===Ac)if(r===0){e.removeChild(i),vl(t);return}else r--;else(s===Nc||s===kl||s===Pl)&&r++}n=i}while(n);vl(t)}function Rw(e,t){e.nodeType===Bt?Im(e.parentNode,t):e.nodeType===qn&&Im(e,t),vl(e)}function _w(e){e=e;var t=e.style;typeof t.setProperty=="function"?t.setProperty("display","none","important"):t.display="none"}function Sw(e){e.nodeValue=""}function ww(e,t){e=e;var n=t[JS],r=n!=null&&n.hasOwnProperty("display")?n.display:null;e.style.display=xd("display",r)}function Cw(e,t){e.nodeValue=t}function Tw(e){e.nodeType===qn?e.textContent="":e.nodeType===Li&&e.documentElement&&e.removeChild(e.documentElement)}function Nw(e,t,n){return e.nodeType!==qn||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e}function Aw(e,t){return t===""||e.nodeType!==Pi?null:e}function Ow(e){return e.nodeType!==Bt?null:e}function ky(e){return e.data===kl}function jm(e){return e.data===Pl}function Dw(e){var t=e.nextSibling&&e.nextSibling.dataset,n,r,i;return t&&(n=t.dgst,r=t.msg,i=t.stck),{message:r,digest:n,stack:i}}function Mw(e,t){e._reactRetry=t}function Oc(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===qn||t===Pi)break;if(t===Bt){var n=e.data;if(n===Nc||n===Pl||n===kl)break;if(n===Ac)return null}}return e}function Ll(e){return Oc(e.nextSibling)}function kw(e){return Oc(e.firstChild)}function Pw(e){return Oc(e.firstChild)}function Lw(e){return Oc(e.nextSibling)}function zw(e,t,n,r,i,s,f){Ul(s,e),Xm(e,n);var m;{var v=i;m=v.namespace}var R=(s.mode&Ge)!==Ee;return XS(e,t,n,m,r,R,f)}function Uw(e,t,n,r){return Ul(n,e),n.mode&Ge,WS(e,t)}function Bw(e,t){Ul(t,e)}function Fw(e){for(var t=e.nextSibling,n=0;t;){if(t.nodeType===Bt){var r=t.data;if(r===Ac){if(n===0)return Ll(t);n--}else(r===Nc||r===Pl||r===kl)&&n++}t=t.nextSibling}return null}function Py(e){for(var t=e.previousSibling,n=0;t;){if(t.nodeType===Bt){var r=t.data;if(r===Nc||r===Pl||r===kl){if(n===0)return t;n--}else r===Ac&&n++}t=t.previousSibling}return null}function Vw(e){vl(e)}function Iw(e){vl(e)}function jw(e){return e!=="head"&&e!=="body"}function Hw(e,t,n,r){var i=!0;wc(t.nodeValue,n,r,i)}function Gw(e,t,n,r,i,s){if(t[Tc]!==!0){var f=!0;wc(r.nodeValue,i,s,f)}}function Xw(e,t){t.nodeType===qn?Mm(e,t):t.nodeType===Bt||km(e,t)}function Ww(e,t){{var n=e.parentNode;n!==null&&(t.nodeType===qn?Mm(n,t):t.nodeType===Bt||km(n,t))}}function $w(e,t,n,r,i){(i||t[Tc]!==!0)&&(r.nodeType===qn?Mm(n,r):r.nodeType===Bt||km(n,r))}function Yw(e,t,n){Pm(e,t)}function qw(e,t){Lm(e,t)}function Qw(e,t,n){{var r=e.parentNode;r!==null&&Pm(r,t)}}function Kw(e,t){{var n=e.parentNode;n!==null&&Lm(n,t)}}function Zw(e,t,n,r,i,s){(s||t[Tc]!==!0)&&Pm(n,r)}function Jw(e,t,n,r,i){(i||t[Tc]!==!0)&&Lm(n,r)}function eC(e){u("An error occurred during hydration. The server HTML was replaced with client content in <%s>.",e.nodeName.toLowerCase())}function tC(e){Tl(e)}var Zo=Math.random().toString(36).slice(2),Jo="__reactFiber$"+Zo,Hm="__reactProps$"+Zo,zl="__reactContainer$"+Zo,Gm="__reactEvents$"+Zo,nC="__reactListeners$"+Zo,rC="__reactHandles$"+Zo;function iC(e){delete e[Jo],delete e[Hm],delete e[Gm],delete e[nC],delete e[rC]}function Ul(e,t){t[Jo]=e}function Dc(e,t){t[zl]=e}function Ly(e){e[zl]=null}function Bl(e){return!!e[zl]}function io(e){var t=e[Jo];if(t)return t;for(var n=e.parentNode;n;){if(t=n[zl]||n[Jo],t){var r=t.alternate;if(t.child!==null||r!==null&&r.child!==null)for(var i=Py(e);i!==null;){var s=i[Jo];if(s)return s;i=Py(i)}return t}e=n,n=e.parentNode}return null}function ga(e){var t=e[Jo]||e[zl];return t&&(t.tag===w||t.tag===k||t.tag===j||t.tag===T)?t:null}function es(e){if(e.tag===w||e.tag===k)return e.stateNode;throw new Error("getNodeFromInstance: Invalid argument.")}function Mc(e){return e[Hm]||null}function Xm(e,t){e[Hm]=t}function aC(e){var t=e[Gm];return t===void 0&&(t=e[Gm]=new Set),t}var zy={},Uy=a.ReactDebugCurrentFrame;function kc(e){if(e){var t=e._owner,n=aa(e.type,e._source,t?t.type:null);Uy.setExtraStackFrame(n)}else Uy.setExtraStackFrame(null)}function Xr(e,t,n,r,i){{var s=Function.call.bind(_n);for(var f in e)if(s(e,f)){var m=void 0;try{if(typeof e[f]!="function"){var v=Error((r||"React class")+": "+n+" type `"+f+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[f]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw v.name="Invariant Violation",v}m=e[f](t,f,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(R){m=R}m&&!(m instanceof Error)&&(kc(i),u("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,f,typeof m),kc(null)),m instanceof Error&&!(m.message in zy)&&(zy[m.message]=!0,kc(i),u("Failed %s type: %s",n,m.message),kc(null))}}}var Wm=[],Pc;Pc=[];var Hi=-1;function ya(e){return{current:e}}function Nn(e,t){if(Hi<0){u("Unexpected pop.");return}t!==Pc[Hi]&&u("Unexpected Fiber popped."),e.current=Wm[Hi],Wm[Hi]=null,Pc[Hi]=null,Hi--}function An(e,t,n){Hi++,Wm[Hi]=e.current,Pc[Hi]=n,e.current=t}var $m;$m={};var mr={};Object.freeze(mr);var Gi=ya(mr),di=ya(!1),Ym=mr;function ts(e,t,n){return n&&mi(t)?Ym:Gi.current}function By(e,t,n){{var r=e.stateNode;r.__reactInternalMemoizedUnmaskedChildContext=t,r.__reactInternalMemoizedMaskedChildContext=n}}function ns(e,t){{var n=e.type,r=n.contextTypes;if(!r)return mr;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===t)return i.__reactInternalMemoizedMaskedChildContext;var s={};for(var f in r)s[f]=t[f];{var m=Pe(e)||"Unknown";Xr(r,s,"context",m)}return i&&By(e,t,s),s}}function Lc(){return di.current}function mi(e){{var t=e.childContextTypes;return t!=null}}function zc(e){Nn(di,e),Nn(Gi,e)}function qm(e){Nn(di,e),Nn(Gi,e)}function Fy(e,t,n){{if(Gi.current!==mr)throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");An(Gi,t,e),An(di,n,e)}}function Vy(e,t,n){{var r=e.stateNode,i=t.childContextTypes;if(typeof r.getChildContext!="function"){{var s=Pe(e)||"Unknown";$m[s]||($m[s]=!0,u("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",s,s))}return n}var f=r.getChildContext();for(var m in f)if(!(m in i))throw new Error((Pe(e)||"Unknown")+'.getChildContext(): key "'+m+'" is not defined in childContextTypes.');{var v=Pe(e)||"Unknown";Xr(i,f,"child context",v)}return Ie({},n,f)}}function Uc(e){{var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||mr;return Ym=Gi.current,An(Gi,n,e),An(di,di.current,e),!0}}function Iy(e,t,n){{var r=e.stateNode;if(!r)throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){var i=Vy(e,t,Ym);r.__reactInternalMemoizedMergedChildContext=i,Nn(di,e),Nn(Gi,e),An(Gi,i,e),An(di,n,e)}else Nn(di,e),An(di,n,e)}}function oC(e){{if(!jR(e)||e.tag!==p)throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case T:return t.stateNode.context;case p:{var n=t.type;if(mi(n))return t.stateNode.__reactInternalMemoizedMergedChildContext;break}}t=t.return}while(t!==null);throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}}var xa=0,Bc=1,Xi=null,Qm=!1,Km=!1;function jy(e){Xi===null?Xi=[e]:Xi.push(e)}function sC(e){Qm=!0,jy(e)}function Hy(){Qm&&ba()}function ba(){if(!Km&&Xi!==null){Km=!0;var e=0,t=Gr();try{var n=!0,r=Xi;for(un(cr);e<r.length;e++){var i=r[e];do i=i(n);while(i!==null)}Xi=null,Qm=!1}catch(s){throw Xi!==null&&(Xi=Xi.slice(e+1)),mg(ec,ba),s}finally{un(t),Km=!1}}return null}var rs=[],is=0,Fc=null,Vc=0,Cr=[],Tr=0,ao=null,Wi=1,$i="";function lC(e){return so(),(e.flags&ag)!==Se}function uC(e){return so(),Vc}function cC(){var e=$i,t=Wi,n=t&~fC(t);return n.toString(32)+e}function oo(e,t){so(),rs[is++]=Vc,rs[is++]=Fc,Fc=e,Vc=t}function Gy(e,t,n){so(),Cr[Tr++]=Wi,Cr[Tr++]=$i,Cr[Tr++]=ao,ao=e;var r=Wi,i=$i,s=Ic(r)-1,f=r&~(1<<s),m=n+1,v=Ic(t)+s;if(v>30){var R=s-s%5,S=(1<<R)-1,D=(f&S).toString(32),O=f>>R,z=s-R,B=Ic(t)+z,V=m<<z,ae=V|O,xe=D+i;Wi=1<<B|ae,$i=xe}else{var ve=m<<s,We=ve|f,Ve=i;Wi=1<<v|We,$i=Ve}}function Zm(e){so();var t=e.return;if(t!==null){var n=1,r=0;oo(e,n),Gy(e,n,r)}}function Ic(e){return 32-xg(e)}function fC(e){return 1<<Ic(e)-1}function Jm(e){for(;e===Fc;)Fc=rs[--is],rs[is]=null,Vc=rs[--is],rs[is]=null;for(;e===ao;)ao=Cr[--Tr],Cr[Tr]=null,$i=Cr[--Tr],Cr[Tr]=null,Wi=Cr[--Tr],Cr[Tr]=null}function dC(){return so(),ao!==null?{id:Wi,overflow:$i}:null}function mC(e,t){so(),Cr[Tr++]=Wi,Cr[Tr++]=$i,Cr[Tr++]=ao,Wi=t.id,$i=t.overflow,ao=e}function so(){hn()||u("Expected to be hydrating. This is a bug in React. Please file an issue.")}var mn=null,Nr=null,Wr=!1,lo=!1,Ea=null;function hC(){Wr&&u("We should not be hydrating here. This is a bug in React. Please file a bug.")}function Xy(){lo=!0}function pC(){return lo}function vC(e){var t=e.stateNode.containerInfo;return Nr=Pw(t),mn=e,Wr=!0,Ea=null,lo=!1,!0}function gC(e,t,n){return Nr=Lw(t),mn=e,Wr=!0,Ea=null,lo=!1,n!==null&&mC(e,n),!0}function Wy(e,t){switch(e.tag){case T:{Xw(e.stateNode.containerInfo,t);break}case w:{var n=(e.mode&Ge)!==Ee;$w(e.type,e.memoizedProps,e.stateNode,t,n);break}case j:{var r=e.memoizedState;r.dehydrated!==null&&Ww(r.dehydrated,t);break}}}function $y(e,t){Wy(e,t);var n=EA();n.stateNode=t,n.return=e;var r=e.deletions;r===null?(e.deletions=[n],e.flags|=Wa):r.push(n)}function eh(e,t){{if(lo)return;switch(e.tag){case T:{var n=e.stateNode.containerInfo;switch(t.tag){case w:var r=t.type;t.pendingProps,Yw(n,r);break;case k:var i=t.pendingProps;qw(n,i);break}break}case w:{var s=e.type,f=e.memoizedProps,m=e.stateNode;switch(t.tag){case w:{var v=t.type,R=t.pendingProps,S=(e.mode&Ge)!==Ee;Zw(s,f,m,v,R,S);break}case k:{var D=t.pendingProps,O=(e.mode&Ge)!==Ee;Jw(s,f,m,D,O);break}}break}case j:{var z=e.memoizedState,B=z.dehydrated;if(B!==null)switch(t.tag){case w:var V=t.type;t.pendingProps,Qw(B,V);break;case k:var ae=t.pendingProps;Kw(B,ae);break}break}default:return}}}function Yy(e,t){t.flags=t.flags&~Ui|Ft,eh(e,t)}function qy(e,t){switch(e.tag){case w:{var n=e.type;e.pendingProps;var r=Nw(t,n);return r!==null?(e.stateNode=r,mn=e,Nr=kw(r),!0):!1}case k:{var i=e.pendingProps,s=Aw(t,i);return s!==null?(e.stateNode=s,mn=e,Nr=null,!0):!1}case j:{var f=Ow(t);if(f!==null){var m={dehydrated:f,treeContext:dC(),retryLane:lr};e.memoizedState=m;var v=RA(f);return v.return=e,e.child=v,mn=e,Nr=null,!0}return!1}default:return!1}}function th(e){return(e.mode&Ge)!==Ee&&(e.flags&Je)===Se}function nh(e){throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function rh(e){if(Wr){var t=Nr;if(!t){th(e)&&(eh(mn,e),nh()),Yy(mn,e),Wr=!1,mn=e;return}var n=t;if(!qy(e,t)){th(e)&&(eh(mn,e),nh()),t=Ll(n);var r=mn;if(!t||!qy(e,t)){Yy(mn,e),Wr=!1,mn=e;return}$y(r,n)}}}function yC(e,t,n){var r=e.stateNode,i=!lo,s=zw(r,e.type,e.memoizedProps,t,n,e,i);return e.updateQueue=s,s!==null}function xC(e){var t=e.stateNode,n=e.memoizedProps,r=Uw(t,n,e);if(r){var i=mn;if(i!==null)switch(i.tag){case T:{var s=i.stateNode.containerInfo,f=(i.mode&Ge)!==Ee;Hw(s,t,n,f);break}case w:{var m=i.type,v=i.memoizedProps,R=i.stateNode,S=(i.mode&Ge)!==Ee;Gw(m,v,R,t,n,S);break}}}return r}function bC(e){var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");Bw(n,e)}function EC(e){var t=e.memoizedState,n=t!==null?t.dehydrated:null;if(!n)throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return Fw(n)}function Qy(e){for(var t=e.return;t!==null&&t.tag!==w&&t.tag!==T&&t.tag!==j;)t=t.return;mn=t}function jc(e){if(e!==mn)return!1;if(!Wr)return Qy(e),Wr=!0,!1;if(e.tag!==T&&(e.tag!==w||jw(e.type)&&!Bm(e.type,e.memoizedProps))){var t=Nr;if(t)if(th(e))Ky(e),nh();else for(;t;)$y(e,t),t=Ll(t)}return Qy(e),e.tag===j?Nr=EC(e):Nr=mn?Ll(e.stateNode):null,!0}function RC(){return Wr&&Nr!==null}function Ky(e){for(var t=Nr;t;)Wy(e,t),t=Ll(t)}function as(){mn=null,Nr=null,Wr=!1,lo=!1}function Zy(){Ea!==null&&(X0(Ea),Ea=null)}function hn(){return Wr}function ih(e){Ea===null?Ea=[e]:Ea.push(e)}var _C=a.ReactCurrentBatchConfig,SC=null;function wC(){return _C.transition}var $r={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}};{var CC=function(e){for(var t=null,n=e;n!==null;)n.mode&Ot&&(t=n),n=n.return;return t},uo=function(e){var t=[];return e.forEach(function(n){t.push(n)}),t.sort().join(", ")},Fl=[],Vl=[],Il=[],jl=[],Hl=[],Gl=[],co=new Set;$r.recordUnsafeLifecycleWarnings=function(e,t){co.has(e.type)||(typeof t.componentWillMount=="function"&&t.componentWillMount.__suppressDeprecationWarning!==!0&&Fl.push(e),e.mode&Ot&&typeof t.UNSAFE_componentWillMount=="function"&&Vl.push(e),typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps.__suppressDeprecationWarning!==!0&&Il.push(e),e.mode&Ot&&typeof t.UNSAFE_componentWillReceiveProps=="function"&&jl.push(e),typeof t.componentWillUpdate=="function"&&t.componentWillUpdate.__suppressDeprecationWarning!==!0&&Hl.push(e),e.mode&Ot&&typeof t.UNSAFE_componentWillUpdate=="function"&&Gl.push(e))},$r.flushPendingUnsafeLifecycleWarnings=function(){var e=new Set;Fl.length>0&&(Fl.forEach(function(O){e.add(Pe(O)||"Component"),co.add(O.type)}),Fl=[]);var t=new Set;Vl.length>0&&(Vl.forEach(function(O){t.add(Pe(O)||"Component"),co.add(O.type)}),Vl=[]);var n=new Set;Il.length>0&&(Il.forEach(function(O){n.add(Pe(O)||"Component"),co.add(O.type)}),Il=[]);var r=new Set;jl.length>0&&(jl.forEach(function(O){r.add(Pe(O)||"Component"),co.add(O.type)}),jl=[]);var i=new Set;Hl.length>0&&(Hl.forEach(function(O){i.add(Pe(O)||"Component"),co.add(O.type)}),Hl=[]);var s=new Set;if(Gl.length>0&&(Gl.forEach(function(O){s.add(Pe(O)||"Component"),co.add(O.type)}),Gl=[]),t.size>0){var f=uo(t);u(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,f)}if(r.size>0){var m=uo(r);u(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`,m)}if(s.size>0){var v=uo(s);u(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,v)}if(e.size>0){var R=uo(e);d(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,R)}if(n.size>0){var S=uo(n);d(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,S)}if(i.size>0){var D=uo(i);d(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,D)}};var Hc=new Map,Jy=new Set;$r.recordLegacyContextWarning=function(e,t){var n=CC(e);if(n===null){u("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}if(!Jy.has(e.type)){var r=Hc.get(n);(e.type.contextTypes!=null||e.type.childContextTypes!=null||t!==null&&typeof t.getChildContext=="function")&&(r===void 0&&(r=[],Hc.set(n,r)),r.push(e))}},$r.flushLegacyContextWarning=function(){Hc.forEach(function(e,t){if(e.length!==0){var n=e[0],r=new Set;e.forEach(function(s){r.add(Pe(s)||"Component"),Jy.add(s.type)});var i=uo(r);try{Ct(n),u(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`,i)}finally{an()}}})},$r.discardPendingWarnings=function(){Fl=[],Vl=[],Il=[],jl=[],Hl=[],Gl=[],Hc=new Map}}var ah,oh,sh,lh,uh,ex=function(e,t){};ah=!1,oh=!1,sh={},lh={},uh={},ex=function(e,t){if(!(e===null||typeof e!="object")&&!(!e._store||e._store.validated||e.key!=null)){if(typeof e._store!="object")throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=Pe(t)||"Component";lh[n]||(lh[n]=!0,u('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};function TC(e){return e.prototype&&e.prototype.isReactComponent}function Xl(e,t,n){var r=n.ref;if(r!==null&&typeof r!="function"&&typeof r!="object"){if((e.mode&Ot||tr)&&!(n._owner&&n._self&&n._owner.stateNode!==n._self)&&!(n._owner&&n._owner.tag!==p)&&!(typeof n.type=="function"&&!TC(n.type))&&n._owner){var i=Pe(e)||"Component";sh[i]||(u('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',i,r),sh[i]=!0)}if(n._owner){var s=n._owner,f;if(s){var m=s;if(m.tag!==p)throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");f=m.stateNode}if(!f)throw new Error("Missing owner for string ref "+r+". This error is likely caused by a bug in React. Please file an issue.");var v=f;Wn(r,"ref");var R=""+r;if(t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===R)return t.ref;var S=function(D){var O=v.refs;D===null?delete O[R]:O[R]=D};return S._stringRef=R,S}else{if(typeof r!="string")throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw new Error("Element ref was specified as a string ("+r+`) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`)}}return r}function Gc(e,t){var n=Object.prototype.toString.call(t);throw new Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function Xc(e){{var t=Pe(e)||"Component";if(uh[t])return;uh[t]=!0,u("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.")}}function tx(e){var t=e._payload,n=e._init;return n(t)}function nx(e){function t(P,I){if(e){var L=P.deletions;L===null?(P.deletions=[I],P.flags|=Wa):L.push(I)}}function n(P,I){if(!e)return null;for(var L=I;L!==null;)t(P,L),L=L.sibling;return null}function r(P,I){for(var L=new Map,Z=I;Z!==null;)Z.key!==null?L.set(Z.key,Z):L.set(Z.index,Z),Z=Z.sibling;return L}function i(P,I){var L=bo(P,I);return L.index=0,L.sibling=null,L}function s(P,I,L){if(P.index=L,!e)return P.flags|=ag,I;var Z=P.alternate;if(Z!==null){var ce=Z.index;return ce<I?(P.flags|=Ft,I):ce}else return P.flags|=Ft,I}function f(P){return e&&P.alternate===null&&(P.flags|=Ft),P}function m(P,I,L,Z){if(I===null||I.tag!==k){var ce=iv(L,P.mode,Z);return ce.return=P,ce}else{var se=i(I,L);return se.return=P,se}}function v(P,I,L,Z){var ce=L.type;if(ce===A)return S(P,I,L.props.children,Z,L.key);if(I!==null&&(I.elementType===ce||sb(I,L)||typeof ce=="object"&&ce!==null&&ce.$$typeof===Fe&&tx(ce)===I.type)){var se=i(I,L.props);return se.ref=Xl(P,I,L),se.return=P,se._debugSource=L._source,se._debugOwner=L._owner,se}var Te=rv(L,P.mode,Z);return Te.ref=Xl(P,I,L),Te.return=P,Te}function R(P,I,L,Z){if(I===null||I.tag!==C||I.stateNode.containerInfo!==L.containerInfo||I.stateNode.implementation!==L.implementation){var ce=av(L,P.mode,Z);return ce.return=P,ce}else{var se=i(I,L.children||[]);return se.return=P,se}}function S(P,I,L,Z,ce){if(I===null||I.tag!==W){var se=Ma(L,P.mode,Z,ce);return se.return=P,se}else{var Te=i(I,L);return Te.return=P,Te}}function D(P,I,L){if(typeof I=="string"&&I!==""||typeof I=="number"){var Z=iv(""+I,P.mode,L);return Z.return=P,Z}if(typeof I=="object"&&I!==null){switch(I.$$typeof){case si:{var ce=rv(I,P.mode,L);return ce.ref=Xl(P,null,I),ce.return=P,ce}case Fr:{var se=av(I,P.mode,L);return se.return=P,se}case Fe:{var Te=I._payload,Me=I._init;return D(P,Me(Te),L)}}if(Ze(I)||Oi(I)){var lt=Ma(I,P.mode,L,null);return lt.return=P,lt}Gc(P,I)}return typeof I=="function"&&Xc(P),null}function O(P,I,L,Z){var ce=I!==null?I.key:null;if(typeof L=="string"&&L!==""||typeof L=="number")return ce!==null?null:m(P,I,""+L,Z);if(typeof L=="object"&&L!==null){switch(L.$$typeof){case si:return L.key===ce?v(P,I,L,Z):null;case Fr:return L.key===ce?R(P,I,L,Z):null;case Fe:{var se=L._payload,Te=L._init;return O(P,I,Te(se),Z)}}if(Ze(L)||Oi(L))return ce!==null?null:S(P,I,L,Z,null);Gc(P,L)}return typeof L=="function"&&Xc(P),null}function z(P,I,L,Z,ce){if(typeof Z=="string"&&Z!==""||typeof Z=="number"){var se=P.get(L)||null;return m(I,se,""+Z,ce)}if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case si:{var Te=P.get(Z.key===null?L:Z.key)||null;return v(I,Te,Z,ce)}case Fr:{var Me=P.get(Z.key===null?L:Z.key)||null;return R(I,Me,Z,ce)}case Fe:var lt=Z._payload,Qe=Z._init;return z(P,I,L,Qe(lt),ce)}if(Ze(Z)||Oi(Z)){var Pt=P.get(L)||null;return S(I,Pt,Z,ce,null)}Gc(I,Z)}return typeof Z=="function"&&Xc(I),null}function B(P,I,L){{if(typeof P!="object"||P===null)return I;switch(P.$$typeof){case si:case Fr:ex(P,L);var Z=P.key;if(typeof Z!="string")break;if(I===null){I=new Set,I.add(Z);break}if(!I.has(Z)){I.add(Z);break}u("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",Z);break;case Fe:var ce=P._payload,se=P._init;B(se(ce),I,L);break}}return I}function V(P,I,L,Z){for(var ce=null,se=0;se<L.length;se++){var Te=L[se];ce=B(Te,ce,P)}for(var Me=null,lt=null,Qe=I,Pt=0,Ke=0,Dt=null;Qe!==null&&Ke<L.length;Ke++){Qe.index>Ke?(Dt=Qe,Qe=null):Dt=Qe.sibling;var Dn=O(P,Qe,L[Ke],Z);if(Dn===null){Qe===null&&(Qe=Dt);break}e&&Qe&&Dn.alternate===null&&t(P,Qe),Pt=s(Dn,Pt,Ke),lt===null?Me=Dn:lt.sibling=Dn,lt=Dn,Qe=Dt}if(Ke===L.length){if(n(P,Qe),hn()){var En=Ke;oo(P,En)}return Me}if(Qe===null){for(;Ke<L.length;Ke++){var pr=D(P,L[Ke],Z);pr!==null&&(Pt=s(pr,Pt,Ke),lt===null?Me=pr:lt.sibling=pr,lt=pr)}if(hn()){var Vn=Ke;oo(P,Vn)}return Me}for(var In=r(P,Qe);Ke<L.length;Ke++){var Mn=z(In,P,Ke,L[Ke],Z);Mn!==null&&(e&&Mn.alternate!==null&&In.delete(Mn.key===null?Ke:Mn.key),Pt=s(Mn,Pt,Ke),lt===null?Me=Mn:lt.sibling=Mn,lt=Mn)}if(e&&In.forEach(function(Ss){return t(P,Ss)}),hn()){var ea=Ke;oo(P,ea)}return Me}function ae(P,I,L,Z){var ce=Oi(L);if(typeof ce!="function")throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");{typeof Symbol=="function"&&L[Symbol.toStringTag]==="Generator"&&(oh||u("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),oh=!0),L.entries===ce&&(ah||u("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ah=!0);var se=ce.call(L);if(se)for(var Te=null,Me=se.next();!Me.done;Me=se.next()){var lt=Me.value;Te=B(lt,Te,P)}}var Qe=ce.call(L);if(Qe==null)throw new Error("An iterable object provided no iterator.");for(var Pt=null,Ke=null,Dt=I,Dn=0,En=0,pr=null,Vn=Qe.next();Dt!==null&&!Vn.done;En++,Vn=Qe.next()){Dt.index>En?(pr=Dt,Dt=null):pr=Dt.sibling;var In=O(P,Dt,Vn.value,Z);if(In===null){Dt===null&&(Dt=pr);break}e&&Dt&&In.alternate===null&&t(P,Dt),Dn=s(In,Dn,En),Ke===null?Pt=In:Ke.sibling=In,Ke=In,Dt=pr}if(Vn.done){if(n(P,Dt),hn()){var Mn=En;oo(P,Mn)}return Pt}if(Dt===null){for(;!Vn.done;En++,Vn=Qe.next()){var ea=D(P,Vn.value,Z);ea!==null&&(Dn=s(ea,Dn,En),Ke===null?Pt=ea:Ke.sibling=ea,Ke=ea)}if(hn()){var Ss=En;oo(P,Ss)}return Pt}for(var _u=r(P,Dt);!Vn.done;En++,Vn=Qe.next()){var Ei=z(_u,P,En,Vn.value,Z);Ei!==null&&(e&&Ei.alternate!==null&&_u.delete(Ei.key===null?En:Ei.key),Dn=s(Ei,Dn,En),Ke===null?Pt=Ei:Ke.sibling=Ei,Ke=Ei)}if(e&&_u.forEach(function(JA){return t(P,JA)}),hn()){var ZA=En;oo(P,ZA)}return Pt}function xe(P,I,L,Z){if(I!==null&&I.tag===k){n(P,I.sibling);var ce=i(I,L);return ce.return=P,ce}n(P,I);var se=iv(L,P.mode,Z);return se.return=P,se}function ve(P,I,L,Z){for(var ce=L.key,se=I;se!==null;){if(se.key===ce){var Te=L.type;if(Te===A){if(se.tag===W){n(P,se.sibling);var Me=i(se,L.props.children);return Me.return=P,Me._debugSource=L._source,Me._debugOwner=L._owner,Me}}else if(se.elementType===Te||sb(se,L)||typeof Te=="object"&&Te!==null&&Te.$$typeof===Fe&&tx(Te)===se.type){n(P,se.sibling);var lt=i(se,L.props);return lt.ref=Xl(P,se,L),lt.return=P,lt._debugSource=L._source,lt._debugOwner=L._owner,lt}n(P,se);break}else t(P,se);se=se.sibling}if(L.type===A){var Qe=Ma(L.props.children,P.mode,Z,L.key);return Qe.return=P,Qe}else{var Pt=rv(L,P.mode,Z);return Pt.ref=Xl(P,I,L),Pt.return=P,Pt}}function We(P,I,L,Z){for(var ce=L.key,se=I;se!==null;){if(se.key===ce)if(se.tag===C&&se.stateNode.containerInfo===L.containerInfo&&se.stateNode.implementation===L.implementation){n(P,se.sibling);var Te=i(se,L.children||[]);return Te.return=P,Te}else{n(P,se);break}else t(P,se);se=se.sibling}var Me=av(L,P.mode,Z);return Me.return=P,Me}function Ve(P,I,L,Z){var ce=typeof L=="object"&&L!==null&&L.type===A&&L.key===null;if(ce&&(L=L.props.children),typeof L=="object"&&L!==null){switch(L.$$typeof){case si:return f(ve(P,I,L,Z));case Fr:return f(We(P,I,L,Z));case Fe:var se=L._payload,Te=L._init;return Ve(P,I,Te(se),Z)}if(Ze(L))return V(P,I,L,Z);if(Oi(L))return ae(P,I,L,Z);Gc(P,L)}return typeof L=="string"&&L!==""||typeof L=="number"?f(xe(P,I,""+L,Z)):(typeof L=="function"&&Xc(P),n(P,I))}return Ve}var os=nx(!0),rx=nx(!1);function NC(e,t){if(e!==null&&t.child!==e.child)throw new Error("Resuming work not yet implemented.");if(t.child!==null){var n=t.child,r=bo(n,n.pendingProps);for(t.child=r,r.return=t;n.sibling!==null;)n=n.sibling,r=r.sibling=bo(n,n.pendingProps),r.return=t;r.sibling=null}}function AC(e,t){for(var n=e.child;n!==null;)vA(n,t),n=n.sibling}var ch=ya(null),fh;fh={};var Wc=null,ss=null,dh=null,$c=!1;function Yc(){Wc=null,ss=null,dh=null,$c=!1}function ix(){$c=!0}function ax(){$c=!1}function ox(e,t,n){An(ch,t._currentValue,e),t._currentValue=n,t._currentRenderer!==void 0&&t._currentRenderer!==null&&t._currentRenderer!==fh&&u("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=fh}function mh(e,t){var n=ch.current;Nn(ch,t),e._currentValue=n}function hh(e,t,n){for(var r=e;r!==null;){var i=r.alternate;if(Xo(r.childLanes,t)?i!==null&&!Xo(i.childLanes,t)&&(i.childLanes=ze(i.childLanes,t)):(r.childLanes=ze(r.childLanes,t),i!==null&&(i.childLanes=ze(i.childLanes,t))),r===n)break;r=r.return}r!==n&&u("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function OC(e,t,n){DC(e,t,n)}function DC(e,t,n){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var i=void 0,s=r.dependencies;if(s!==null){i=r.child;for(var f=s.firstContext;f!==null;){if(f.context===t){if(r.tag===p){var m=ul(n),v=Yi(gt,m);v.tag=Qc;var R=r.updateQueue;if(R!==null){var S=R.shared,D=S.pending;D===null?v.next=v:(v.next=D.next,D.next=v),S.pending=v}}r.lanes=ze(r.lanes,n);var O=r.alternate;O!==null&&(O.lanes=ze(O.lanes,n)),hh(r.return,n,e),s.lanes=ze(s.lanes,n);break}f=f.next}}else if(r.tag===M)i=r.type===e.type?null:r.child;else if(r.tag===ye){var z=r.return;if(z===null)throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");z.lanes=ze(z.lanes,n);var B=z.alternate;B!==null&&(B.lanes=ze(B.lanes,n)),hh(z,n,e),i=r.sibling}else i=r.child;if(i!==null)i.return=r;else for(i=r;i!==null;){if(i===e){i=null;break}var V=i.sibling;if(V!==null){V.return=i.return,i=V;break}i=i.return}r=i}}function ls(e,t){Wc=e,ss=null,dh=null;var n=e.dependencies;if(n!==null){var r=n.firstContext;r!==null&&(ur(n.lanes,t)&&ou(),n.firstContext=null)}}function Vt(e){$c&&u("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=e._currentValue;if(dh!==e){var n={context:e,memoizedValue:t,next:null};if(ss===null){if(Wc===null)throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");ss=n,Wc.dependencies={lanes:q,firstContext:n}}else ss=ss.next=n}return t}var fo=null;function ph(e){fo===null?fo=[e]:fo.push(e)}function MC(){if(fo!==null){for(var e=0;e<fo.length;e++){var t=fo[e],n=t.interleaved;if(n!==null){t.interleaved=null;var r=n.next,i=t.pending;if(i!==null){var s=i.next;i.next=r,n.next=s}t.pending=n}}fo=null}}function sx(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,ph(t)):(n.next=i.next,i.next=n),t.interleaved=n,qc(e,r)}function kC(e,t,n,r){var i=t.interleaved;i===null?(n.next=n,ph(t)):(n.next=i.next,i.next=n),t.interleaved=n}function PC(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,ph(t)):(n.next=i.next,i.next=n),t.interleaved=n,qc(e,r)}function Kn(e,t){return qc(e,t)}var LC=qc;function qc(e,t){e.lanes=ze(e.lanes,t);var n=e.alternate;n!==null&&(n.lanes=ze(n.lanes,t)),n===null&&(e.flags&(Ft|Ui))!==Se&&rb(e);for(var r=e,i=e.return;i!==null;)i.childLanes=ze(i.childLanes,t),n=i.alternate,n!==null?n.childLanes=ze(n.childLanes,t):(i.flags&(Ft|Ui))!==Se&&rb(e),r=i,i=i.return;if(r.tag===T){var s=r.stateNode;return s}else return null}var lx=0,ux=1,Qc=2,vh=3,Kc=!1,gh,Zc;gh=!1,Zc=null;function yh(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:q},effects:null};e.updateQueue=t}function cx(e,t){var n=t.updateQueue,r=e.updateQueue;if(n===r){var i={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects};t.updateQueue=i}}function Yi(e,t){var n={eventTime:e,lane:t,tag:lx,payload:null,callback:null,next:null};return n}function Ra(e,t,n){var r=e.updateQueue;if(r===null)return null;var i=r.shared;if(Zc===i&&!gh&&(u("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),gh=!0),kN()){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,LC(e,n)}else return PC(e,i,t,n)}function Jc(e,t,n){var r=t.updateQueue;if(r!==null){var i=r.shared;if(_g(n)){var s=i.lanes;s=wg(s,e.pendingLanes);var f=ze(s,n);i.lanes=f,cm(e,f)}}}function xh(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null){var i=r.updateQueue;if(n===i){var s=null,f=null,m=n.firstBaseUpdate;if(m!==null){var v=m;do{var R={eventTime:v.eventTime,lane:v.lane,tag:v.tag,payload:v.payload,callback:v.callback,next:null};f===null?s=f=R:(f.next=R,f=R),v=v.next}while(v!==null);f===null?s=f=t:(f.next=t,f=t)}else s=f=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:f,shared:i.shared,effects:i.effects},e.updateQueue=n;return}}var S=n.lastBaseUpdate;S===null?n.firstBaseUpdate=t:S.next=t,n.lastBaseUpdate=t}function zC(e,t,n,r,i,s){switch(n.tag){case ux:{var f=n.payload;if(typeof f=="function"){ix();var m=f.call(s,r,i);{if(e.mode&Ot){sn(!0);try{f.call(s,r,i)}finally{sn(!1)}}ax()}return m}return f}case vh:e.flags=e.flags&~zn|Je;case lx:{var v=n.payload,R;if(typeof v=="function"){ix(),R=v.call(s,r,i);{if(e.mode&Ot){sn(!0);try{v.call(s,r,i)}finally{sn(!1)}}ax()}}else R=v;return R==null?r:Ie({},r,R)}case Qc:return Kc=!0,r}return r}function ef(e,t,n,r){var i=e.updateQueue;Kc=!1,Zc=i.shared;var s=i.firstBaseUpdate,f=i.lastBaseUpdate,m=i.shared.pending;if(m!==null){i.shared.pending=null;var v=m,R=v.next;v.next=null,f===null?s=R:f.next=R,f=v;var S=e.alternate;if(S!==null){var D=S.updateQueue,O=D.lastBaseUpdate;O!==f&&(O===null?D.firstBaseUpdate=R:O.next=R,D.lastBaseUpdate=v)}}if(s!==null){var z=i.baseState,B=q,V=null,ae=null,xe=null,ve=s;do{var We=ve.lane,Ve=ve.eventTime;if(Xo(r,We)){if(xe!==null){var I={eventTime:Ve,lane:ln,tag:ve.tag,payload:ve.payload,callback:ve.callback,next:null};xe=xe.next=I}z=zC(e,i,ve,z,t,n);var L=ve.callback;if(L!==null&&ve.lane!==ln){e.flags|=Dd;var Z=i.effects;Z===null?i.effects=[ve]:Z.push(ve)}}else{var P={eventTime:Ve,lane:We,tag:ve.tag,payload:ve.payload,callback:ve.callback,next:null};xe===null?(ae=xe=P,V=z):xe=xe.next=P,B=ze(B,We)}if(ve=ve.next,ve===null){if(m=i.shared.pending,m===null)break;var ce=m,se=ce.next;ce.next=null,ve=se,i.lastBaseUpdate=ce,i.shared.pending=null}}while(!0);xe===null&&(V=z),i.baseState=V,i.firstBaseUpdate=ae,i.lastBaseUpdate=xe;var Te=i.shared.interleaved;if(Te!==null){var Me=Te;do B=ze(B,Me.lane),Me=Me.next;while(Me!==Te)}else s===null&&(i.shared.lanes=q);yu(B),e.lanes=B,e.memoizedState=z}Zc=null}function UC(e,t){if(typeof e!="function")throw new Error("Invalid argument passed as callback. Expected a function. Instead "+("received: "+e));e.call(t)}function fx(){Kc=!1}function tf(){return Kc}function dx(e,t,n){var r=t.effects;if(t.effects=null,r!==null)for(var i=0;i<r.length;i++){var s=r[i],f=s.callback;f!==null&&(s.callback=null,UC(f,n))}}var Wl={},_a=ya(Wl),$l=ya(Wl),nf=ya(Wl);function rf(e){if(e===Wl)throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function mx(){var e=rf(nf.current);return e}function bh(e,t){An(nf,t,e),An($l,e,e),An(_a,Wl,e);var n=ew(t);Nn(_a,e),An(_a,n,e)}function us(e){Nn(_a,e),Nn($l,e),Nn(nf,e)}function Eh(){var e=rf(_a.current);return e}function hx(e){rf(nf.current);var t=rf(_a.current),n=tw(t,e.type);t!==n&&(An($l,e,e),An(_a,n,e))}function Rh(e){$l.current===e&&(Nn(_a,e),Nn($l,e))}var BC=0,px=1,vx=1,Yl=2,Yr=ya(BC);function _h(e,t){return(e&t)!==0}function cs(e){return e&px}function Sh(e,t){return e&px|t}function FC(e,t){return e|t}function Sa(e,t){An(Yr,t,e)}function fs(e){Nn(Yr,e)}function VC(e,t){var n=e.memoizedState;return n!==null?n.dehydrated!==null:(e.memoizedProps,!0)}function af(e){for(var t=e;t!==null;){if(t.tag===j){var n=t.memoizedState;if(n!==null){var r=n.dehydrated;if(r===null||ky(r)||jm(r))return t}}else if(t.tag===pe&&t.memoizedProps.revealOrder!==void 0){var i=(t.flags&Je)!==Se;if(i)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)return null;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Zn=0,$t=1,hi=2,Yt=4,pn=8,wh=[];function Ch(){for(var e=0;e<wh.length;e++){var t=wh[e];t._workInProgressVersionPrimary=null}wh.length=0}function IC(e,t){var n=t._getVersion,r=n(t._source);e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r)}var ue=a.ReactCurrentDispatcher,ql=a.ReactCurrentBatchConfig,Th,ds;Th=new Set;var mo=q,st=null,qt=null,Qt=null,of=!1,Ql=!1,Kl=0,jC=0,HC=25,H=null,Ar=null,wa=-1,Nh=!1;function tt(){{var e=H;Ar===null?Ar=[e]:Ar.push(e)}}function te(){{var e=H;Ar!==null&&(wa++,Ar[wa]!==e&&GC(e))}}function ms(e){e!=null&&!Ze(e)&&u("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",H,typeof e)}function GC(e){{var t=Pe(st);if(!Th.has(t)&&(Th.add(t),Ar!==null)){for(var n="",r=30,i=0;i<=wa;i++){for(var s=Ar[i],f=i===wa?e:s,m=i+1+". "+s;m.length<r;)m+=" ";m+=f+`
`,n+=m}u(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,t,n)}}}function On(){throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`)}function Ah(e,t){if(Nh)return!1;if(t===null)return u("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",H),!1;e.length!==t.length&&u(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,H,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!dr(e[n],t[n]))return!1;return!0}function hs(e,t,n,r,i,s){mo=s,st=t,Ar=e!==null?e._debugHookTypes:null,wa=-1,Nh=e!==null&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=q,e!==null&&e.memoizedState!==null?ue.current=Bx:Ar!==null?ue.current=Ux:ue.current=zx;var f=n(r,i);if(Ql){var m=0;do{if(Ql=!1,Kl=0,m>=HC)throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");m+=1,Nh=!1,qt=null,Qt=null,t.updateQueue=null,wa=-1,ue.current=Fx,f=n(r,i)}while(Ql)}ue.current=xf,t._debugHookTypes=Ar;var v=qt!==null&&qt.next!==null;if(mo=q,st=null,qt=null,Qt=null,H=null,Ar=null,wa=-1,e!==null&&(e.flags&Fi)!==(t.flags&Fi)&&(e.mode&Ge)!==Ee&&u("Internal React error: Expected static flag was missing. Please notify the React team."),of=!1,v)throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return f}function ps(){var e=Kl!==0;return Kl=0,e}function gx(e,t,n){t.updateQueue=e.updateQueue,(t.mode&ci)!==Ee?t.flags&=~(Ju|Bi|jr|Ye):t.flags&=~(jr|Ye),e.lanes=oc(e.lanes,n)}function yx(){if(ue.current=xf,of){for(var e=st.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}of=!1}mo=q,st=null,qt=null,Qt=null,Ar=null,wa=-1,H=null,Dx=!1,Ql=!1,Kl=0}function pi(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qt===null?st.memoizedState=Qt=e:Qt=Qt.next=e,Qt}function Or(){var e;if(qt===null){var t=st.alternate;t!==null?e=t.memoizedState:e=null}else e=qt.next;var n;if(Qt===null?n=st.memoizedState:n=Qt.next,n!==null)Qt=n,n=Qt.next,qt=e;else{if(e===null)throw new Error("Rendered more hooks than during the previous render.");qt=e;var r={memoizedState:qt.memoizedState,baseState:qt.baseState,baseQueue:qt.baseQueue,queue:qt.queue,next:null};Qt===null?st.memoizedState=Qt=r:Qt=Qt.next=r}return Qt}function xx(){return{lastEffect:null,stores:null}}function Oh(e,t){return typeof t=="function"?t(e):t}function Dh(e,t,n){var r=pi(),i;n!==void 0?i=n(t):i=t,r.memoizedState=r.baseState=i;var s={pending:null,interleaved:null,lanes:q,dispatch:null,lastRenderedReducer:e,lastRenderedState:i};r.queue=s;var f=s.dispatch=YC.bind(null,st,s);return[r.memoizedState,f]}function Mh(e,t,n){var r=Or(),i=r.queue;if(i===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");i.lastRenderedReducer=e;var s=qt,f=s.baseQueue,m=i.pending;if(m!==null){if(f!==null){var v=f.next,R=m.next;f.next=R,m.next=v}s.baseQueue!==f&&u("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),s.baseQueue=f=m,i.pending=null}if(f!==null){var S=f.next,D=s.baseState,O=null,z=null,B=null,V=S;do{var ae=V.lane;if(Xo(mo,ae)){if(B!==null){var ve={lane:ln,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null};B=B.next=ve}if(V.hasEagerState)D=V.eagerState;else{var We=V.action;D=e(D,We)}}else{var xe={lane:ae,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null};B===null?(z=B=xe,O=D):B=B.next=xe,st.lanes=ze(st.lanes,ae),yu(ae)}V=V.next}while(V!==null&&V!==S);B===null?O=D:B.next=z,dr(D,r.memoizedState)||ou(),r.memoizedState=D,r.baseState=O,r.baseQueue=B,i.lastRenderedState=D}var Ve=i.interleaved;if(Ve!==null){var P=Ve;do{var I=P.lane;st.lanes=ze(st.lanes,I),yu(I),P=P.next}while(P!==Ve)}else f===null&&(i.lanes=q);var L=i.dispatch;return[r.memoizedState,L]}function kh(e,t,n){var r=Or(),i=r.queue;if(i===null)throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");i.lastRenderedReducer=e;var s=i.dispatch,f=i.pending,m=r.memoizedState;if(f!==null){i.pending=null;var v=f.next,R=v;do{var S=R.action;m=e(m,S),R=R.next}while(R!==v);dr(m,r.memoizedState)||ou(),r.memoizedState=m,r.baseQueue===null&&(r.baseState=m),i.lastRenderedState=m}return[m,s]}function dL(e,t,n){}function mL(e,t,n){}function Ph(e,t,n){var r=st,i=pi(),s,f=hn();if(f){if(n===void 0)throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");s=n(),ds||s!==n()&&(u("The result of getServerSnapshot should be cached to avoid an infinite loop"),ds=!0)}else{if(s=t(),!ds){var m=t();dr(s,m)||(u("The result of getSnapshot should be cached to avoid an infinite loop"),ds=!0)}var v=Bf();if(v===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");ac(v,mo)||bx(r,t,s)}i.memoizedState=s;var R={value:s,getSnapshot:t};return i.queue=R,ff(Rx.bind(null,r,R,e),[e]),r.flags|=jr,Zl($t|pn,Ex.bind(null,r,R,s,t),void 0,null),s}function sf(e,t,n){var r=st,i=Or(),s=t();if(!ds){var f=t();dr(s,f)||(u("The result of getSnapshot should be cached to avoid an infinite loop"),ds=!0)}var m=i.memoizedState,v=!dr(m,s);v&&(i.memoizedState=s,ou());var R=i.queue;if(eu(Rx.bind(null,r,R,e),[e]),R.getSnapshot!==t||v||Qt!==null&&Qt.memoizedState.tag&$t){r.flags|=jr,Zl($t|pn,Ex.bind(null,r,R,s,t),void 0,null);var S=Bf();if(S===null)throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");ac(S,mo)||bx(r,t,s)}return s}function bx(e,t,n){e.flags|=Zu;var r={getSnapshot:t,value:n},i=st.updateQueue;if(i===null)i=xx(),st.updateQueue=i,i.stores=[r];else{var s=i.stores;s===null?i.stores=[r]:s.push(r)}}function Ex(e,t,n,r){t.value=n,t.getSnapshot=r,_x(t)&&Sx(e)}function Rx(e,t,n){var r=function(){_x(t)&&Sx(e)};return n(r)}function _x(e){var t=e.getSnapshot,n=e.value;try{var r=t();return!dr(n,r)}catch{return!0}}function Sx(e){var t=Kn(e,Oe);t!==null&&en(t,e,Oe,gt)}function lf(e){var t=pi();typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:q,dispatch:null,lastRenderedReducer:Oh,lastRenderedState:e};t.queue=n;var r=n.dispatch=qC.bind(null,st,n);return[t.memoizedState,r]}function Lh(e){return Mh(Oh)}function zh(e){return kh(Oh)}function Zl(e,t,n,r){var i={tag:e,create:t,destroy:n,deps:r,next:null},s=st.updateQueue;if(s===null)s=xx(),st.updateQueue=s,s.lastEffect=i.next=i;else{var f=s.lastEffect;if(f===null)s.lastEffect=i.next=i;else{var m=f.next;f.next=i,i.next=m,s.lastEffect=i}}return i}function Uh(e){var t=pi();{var n={current:e};return t.memoizedState=n,n}}function uf(e){var t=Or();return t.memoizedState}function Jl(e,t,n,r){var i=pi(),s=r===void 0?null:r;st.flags|=e,i.memoizedState=Zl($t|t,n,void 0,s)}function cf(e,t,n,r){var i=Or(),s=r===void 0?null:r,f=void 0;if(qt!==null){var m=qt.memoizedState;if(f=m.destroy,s!==null){var v=m.deps;if(Ah(s,v)){i.memoizedState=Zl(t,n,f,s);return}}}st.flags|=e,i.memoizedState=Zl($t|t,n,f,s)}function ff(e,t){return(st.mode&ci)!==Ee?Jl(Ju|jr|Pd,pn,e,t):Jl(jr|Pd,pn,e,t)}function eu(e,t){return cf(jr,pn,e,t)}function Bh(e,t){return Jl(Ye,hi,e,t)}function df(e,t){return cf(Ye,hi,e,t)}function Fh(e,t){var n=Ye;return n|=qa,(st.mode&ci)!==Ee&&(n|=Bi),Jl(n,Yt,e,t)}function mf(e,t){return cf(Ye,Yt,e,t)}function wx(e,t){if(typeof t=="function"){var n=t,r=e();return n(r),function(){n(null)}}else if(t!=null){var i=t;i.hasOwnProperty("current")||u("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(i).join(", ")+"}");var s=e();return i.current=s,function(){i.current=null}}}function Vh(e,t,n){typeof t!="function"&&u("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var r=n!=null?n.concat([e]):null,i=Ye;return i|=qa,(st.mode&ci)!==Ee&&(i|=Bi),Jl(i,Yt,wx.bind(null,t,e),r)}function hf(e,t,n){typeof t!="function"&&u("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",t!==null?typeof t:"null");var r=n!=null?n.concat([e]):null;return cf(Ye,Yt,wx.bind(null,t,e),r)}function XC(e,t){}var pf=XC;function Ih(e,t){var n=pi(),r=t===void 0?null:t;return n.memoizedState=[e,r],e}function vf(e,t){var n=Or(),r=t===void 0?null:t,i=n.memoizedState;if(i!==null&&r!==null){var s=i[1];if(Ah(r,s))return i[0]}return n.memoizedState=[e,r],e}function jh(e,t){var n=pi(),r=t===void 0?null:t,i=e();return n.memoizedState=[i,r],i}function gf(e,t){var n=Or(),r=t===void 0?null:t,i=n.memoizedState;if(i!==null&&r!==null){var s=i[1];if(Ah(r,s))return i[0]}var f=e();return n.memoizedState=[f,r],f}function Hh(e){var t=pi();return t.memoizedState=e,e}function Cx(e){var t=Or(),n=qt,r=n.memoizedState;return Nx(t,r,e)}function Tx(e){var t=Or();if(qt===null)return t.memoizedState=e,e;var n=qt.memoizedState;return Nx(t,n,e)}function Nx(e,t,n){var r=!O1(mo);if(r){if(!dr(n,t)){var i=Sg();st.lanes=ze(st.lanes,i),yu(i),e.baseState=!0}return t}else return e.baseState&&(e.baseState=!1,ou()),e.memoizedState=n,n}function WC(e,t,n){var r=Gr();un(F1(r,Ii)),e(!0);var i=ql.transition;ql.transition={};var s=ql.transition;ql.transition._updatedFibers=new Set;try{e(!1),t()}finally{if(un(r),ql.transition=i,i===null&&s._updatedFibers){var f=s._updatedFibers.size;f>10&&d("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),s._updatedFibers.clear()}}}function Gh(){var e=lf(!1),t=e[0],n=e[1],r=WC.bind(null,n),i=pi();return i.memoizedState=r,[t,r]}function Ax(){var e=Lh(),t=e[0],n=Or(),r=n.memoizedState;return[t,r]}function Ox(){var e=zh(),t=e[0],n=Or(),r=n.memoizedState;return[t,r]}var Dx=!1;function $C(){return Dx}function Xh(){var e=pi(),t=Bf(),n=t.identifierPrefix,r;if(hn()){var i=cC();r=":"+n+"R"+i;var s=Kl++;s>0&&(r+="H"+s.toString(32)),r+=":"}else{var f=jC++;r=":"+n+"r"+f.toString(32)+":"}return e.memoizedState=r,r}function yf(){var e=Or(),t=e.memoizedState;return t}function YC(e,t,n){typeof arguments[3]=="function"&&u("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=Oa(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Mx(e))kx(t,i);else{var s=sx(e,t,i,r);if(s!==null){var f=Fn();en(s,e,r,f),Px(s,t,r)}}Lx(e,r)}function qC(e,t,n){typeof arguments[3]=="function"&&u("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=Oa(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Mx(e))kx(t,i);else{var s=e.alternate;if(e.lanes===q&&(s===null||s.lanes===q)){var f=t.lastRenderedReducer;if(f!==null){var m;m=ue.current,ue.current=qr;try{var v=t.lastRenderedState,R=f(v,n);if(i.hasEagerState=!0,i.eagerState=R,dr(R,v)){kC(e,t,i,r);return}}catch{}finally{ue.current=m}}}var S=sx(e,t,i,r);if(S!==null){var D=Fn();en(S,e,r,D),Px(S,t,r)}}Lx(e,r)}function Mx(e){var t=e.alternate;return e===st||t!==null&&t===st}function kx(e,t){Ql=of=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Px(e,t,n){if(_g(n)){var r=t.lanes;r=wg(r,e.pendingLanes);var i=ze(r,n);t.lanes=i,cm(e,i)}}function Lx(e,t,n){Fd(e,t)}var xf={readContext:Vt,useCallback:On,useContext:On,useEffect:On,useImperativeHandle:On,useInsertionEffect:On,useLayoutEffect:On,useMemo:On,useReducer:On,useRef:On,useState:On,useDebugValue:On,useDeferredValue:On,useTransition:On,useMutableSource:On,useSyncExternalStore:On,useId:On,unstable_isNewReconciler:Ht},zx=null,Ux=null,Bx=null,Fx=null,vi=null,qr=null,bf=null;{var Wh=function(){u("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},De=function(){u("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};zx={readContext:function(e){return Vt(e)},useCallback:function(e,t){return H="useCallback",tt(),ms(t),Ih(e,t)},useContext:function(e){return H="useContext",tt(),Vt(e)},useEffect:function(e,t){return H="useEffect",tt(),ms(t),ff(e,t)},useImperativeHandle:function(e,t,n){return H="useImperativeHandle",tt(),ms(n),Vh(e,t,n)},useInsertionEffect:function(e,t){return H="useInsertionEffect",tt(),ms(t),Bh(e,t)},useLayoutEffect:function(e,t){return H="useLayoutEffect",tt(),ms(t),Fh(e,t)},useMemo:function(e,t){H="useMemo",tt(),ms(t);var n=ue.current;ue.current=vi;try{return jh(e,t)}finally{ue.current=n}},useReducer:function(e,t,n){H="useReducer",tt();var r=ue.current;ue.current=vi;try{return Dh(e,t,n)}finally{ue.current=r}},useRef:function(e){return H="useRef",tt(),Uh(e)},useState:function(e){H="useState",tt();var t=ue.current;ue.current=vi;try{return lf(e)}finally{ue.current=t}},useDebugValue:function(e,t){return H="useDebugValue",tt(),void 0},useDeferredValue:function(e){return H="useDeferredValue",tt(),Hh(e)},useTransition:function(){return H="useTransition",tt(),Gh()},useMutableSource:function(e,t,n){return H="useMutableSource",tt(),void 0},useSyncExternalStore:function(e,t,n){return H="useSyncExternalStore",tt(),Ph(e,t,n)},useId:function(){return H="useId",tt(),Xh()},unstable_isNewReconciler:Ht},Ux={readContext:function(e){return Vt(e)},useCallback:function(e,t){return H="useCallback",te(),Ih(e,t)},useContext:function(e){return H="useContext",te(),Vt(e)},useEffect:function(e,t){return H="useEffect",te(),ff(e,t)},useImperativeHandle:function(e,t,n){return H="useImperativeHandle",te(),Vh(e,t,n)},useInsertionEffect:function(e,t){return H="useInsertionEffect",te(),Bh(e,t)},useLayoutEffect:function(e,t){return H="useLayoutEffect",te(),Fh(e,t)},useMemo:function(e,t){H="useMemo",te();var n=ue.current;ue.current=vi;try{return jh(e,t)}finally{ue.current=n}},useReducer:function(e,t,n){H="useReducer",te();var r=ue.current;ue.current=vi;try{return Dh(e,t,n)}finally{ue.current=r}},useRef:function(e){return H="useRef",te(),Uh(e)},useState:function(e){H="useState",te();var t=ue.current;ue.current=vi;try{return lf(e)}finally{ue.current=t}},useDebugValue:function(e,t){return H="useDebugValue",te(),void 0},useDeferredValue:function(e){return H="useDeferredValue",te(),Hh(e)},useTransition:function(){return H="useTransition",te(),Gh()},useMutableSource:function(e,t,n){return H="useMutableSource",te(),void 0},useSyncExternalStore:function(e,t,n){return H="useSyncExternalStore",te(),Ph(e,t,n)},useId:function(){return H="useId",te(),Xh()},unstable_isNewReconciler:Ht},Bx={readContext:function(e){return Vt(e)},useCallback:function(e,t){return H="useCallback",te(),vf(e,t)},useContext:function(e){return H="useContext",te(),Vt(e)},useEffect:function(e,t){return H="useEffect",te(),eu(e,t)},useImperativeHandle:function(e,t,n){return H="useImperativeHandle",te(),hf(e,t,n)},useInsertionEffect:function(e,t){return H="useInsertionEffect",te(),df(e,t)},useLayoutEffect:function(e,t){return H="useLayoutEffect",te(),mf(e,t)},useMemo:function(e,t){H="useMemo",te();var n=ue.current;ue.current=qr;try{return gf(e,t)}finally{ue.current=n}},useReducer:function(e,t,n){H="useReducer",te();var r=ue.current;ue.current=qr;try{return Mh(e,t,n)}finally{ue.current=r}},useRef:function(e){return H="useRef",te(),uf()},useState:function(e){H="useState",te();var t=ue.current;ue.current=qr;try{return Lh(e)}finally{ue.current=t}},useDebugValue:function(e,t){return H="useDebugValue",te(),pf()},useDeferredValue:function(e){return H="useDeferredValue",te(),Cx(e)},useTransition:function(){return H="useTransition",te(),Ax()},useMutableSource:function(e,t,n){return H="useMutableSource",te(),void 0},useSyncExternalStore:function(e,t,n){return H="useSyncExternalStore",te(),sf(e,t)},useId:function(){return H="useId",te(),yf()},unstable_isNewReconciler:Ht},Fx={readContext:function(e){return Vt(e)},useCallback:function(e,t){return H="useCallback",te(),vf(e,t)},useContext:function(e){return H="useContext",te(),Vt(e)},useEffect:function(e,t){return H="useEffect",te(),eu(e,t)},useImperativeHandle:function(e,t,n){return H="useImperativeHandle",te(),hf(e,t,n)},useInsertionEffect:function(e,t){return H="useInsertionEffect",te(),df(e,t)},useLayoutEffect:function(e,t){return H="useLayoutEffect",te(),mf(e,t)},useMemo:function(e,t){H="useMemo",te();var n=ue.current;ue.current=bf;try{return gf(e,t)}finally{ue.current=n}},useReducer:function(e,t,n){H="useReducer",te();var r=ue.current;ue.current=bf;try{return kh(e,t,n)}finally{ue.current=r}},useRef:function(e){return H="useRef",te(),uf()},useState:function(e){H="useState",te();var t=ue.current;ue.current=bf;try{return zh(e)}finally{ue.current=t}},useDebugValue:function(e,t){return H="useDebugValue",te(),pf()},useDeferredValue:function(e){return H="useDeferredValue",te(),Tx(e)},useTransition:function(){return H="useTransition",te(),Ox()},useMutableSource:function(e,t,n){return H="useMutableSource",te(),void 0},useSyncExternalStore:function(e,t,n){return H="useSyncExternalStore",te(),sf(e,t)},useId:function(){return H="useId",te(),yf()},unstable_isNewReconciler:Ht},vi={readContext:function(e){return Wh(),Vt(e)},useCallback:function(e,t){return H="useCallback",De(),tt(),Ih(e,t)},useContext:function(e){return H="useContext",De(),tt(),Vt(e)},useEffect:function(e,t){return H="useEffect",De(),tt(),ff(e,t)},useImperativeHandle:function(e,t,n){return H="useImperativeHandle",De(),tt(),Vh(e,t,n)},useInsertionEffect:function(e,t){return H="useInsertionEffect",De(),tt(),Bh(e,t)},useLayoutEffect:function(e,t){return H="useLayoutEffect",De(),tt(),Fh(e,t)},useMemo:function(e,t){H="useMemo",De(),tt();var n=ue.current;ue.current=vi;try{return jh(e,t)}finally{ue.current=n}},useReducer:function(e,t,n){H="useReducer",De(),tt();var r=ue.current;ue.current=vi;try{return Dh(e,t,n)}finally{ue.current=r}},useRef:function(e){return H="useRef",De(),tt(),Uh(e)},useState:function(e){H="useState",De(),tt();var t=ue.current;ue.current=vi;try{return lf(e)}finally{ue.current=t}},useDebugValue:function(e,t){return H="useDebugValue",De(),tt(),void 0},useDeferredValue:function(e){return H="useDeferredValue",De(),tt(),Hh(e)},useTransition:function(){return H="useTransition",De(),tt(),Gh()},useMutableSource:function(e,t,n){return H="useMutableSource",De(),tt(),void 0},useSyncExternalStore:function(e,t,n){return H="useSyncExternalStore",De(),tt(),Ph(e,t,n)},useId:function(){return H="useId",De(),tt(),Xh()},unstable_isNewReconciler:Ht},qr={readContext:function(e){return Wh(),Vt(e)},useCallback:function(e,t){return H="useCallback",De(),te(),vf(e,t)},useContext:function(e){return H="useContext",De(),te(),Vt(e)},useEffect:function(e,t){return H="useEffect",De(),te(),eu(e,t)},useImperativeHandle:function(e,t,n){return H="useImperativeHandle",De(),te(),hf(e,t,n)},useInsertionEffect:function(e,t){return H="useInsertionEffect",De(),te(),df(e,t)},useLayoutEffect:function(e,t){return H="useLayoutEffect",De(),te(),mf(e,t)},useMemo:function(e,t){H="useMemo",De(),te();var n=ue.current;ue.current=qr;try{return gf(e,t)}finally{ue.current=n}},useReducer:function(e,t,n){H="useReducer",De(),te();var r=ue.current;ue.current=qr;try{return Mh(e,t,n)}finally{ue.current=r}},useRef:function(e){return H="useRef",De(),te(),uf()},useState:function(e){H="useState",De(),te();var t=ue.current;ue.current=qr;try{return Lh(e)}finally{ue.current=t}},useDebugValue:function(e,t){return H="useDebugValue",De(),te(),pf()},useDeferredValue:function(e){return H="useDeferredValue",De(),te(),Cx(e)},useTransition:function(){return H="useTransition",De(),te(),Ax()},useMutableSource:function(e,t,n){return H="useMutableSource",De(),te(),void 0},useSyncExternalStore:function(e,t,n){return H="useSyncExternalStore",De(),te(),sf(e,t)},useId:function(){return H="useId",De(),te(),yf()},unstable_isNewReconciler:Ht},bf={readContext:function(e){return Wh(),Vt(e)},useCallback:function(e,t){return H="useCallback",De(),te(),vf(e,t)},useContext:function(e){return H="useContext",De(),te(),Vt(e)},useEffect:function(e,t){return H="useEffect",De(),te(),eu(e,t)},useImperativeHandle:function(e,t,n){return H="useImperativeHandle",De(),te(),hf(e,t,n)},useInsertionEffect:function(e,t){return H="useInsertionEffect",De(),te(),df(e,t)},useLayoutEffect:function(e,t){return H="useLayoutEffect",De(),te(),mf(e,t)},useMemo:function(e,t){H="useMemo",De(),te();var n=ue.current;ue.current=qr;try{return gf(e,t)}finally{ue.current=n}},useReducer:function(e,t,n){H="useReducer",De(),te();var r=ue.current;ue.current=qr;try{return kh(e,t,n)}finally{ue.current=r}},useRef:function(e){return H="useRef",De(),te(),uf()},useState:function(e){H="useState",De(),te();var t=ue.current;ue.current=qr;try{return zh(e)}finally{ue.current=t}},useDebugValue:function(e,t){return H="useDebugValue",De(),te(),pf()},useDeferredValue:function(e){return H="useDeferredValue",De(),te(),Tx(e)},useTransition:function(){return H="useTransition",De(),te(),Ox()},useMutableSource:function(e,t,n){return H="useMutableSource",De(),te(),void 0},useSyncExternalStore:function(e,t,n){return H="useSyncExternalStore",De(),te(),sf(e,t)},useId:function(){return H="useId",De(),te(),yf()},unstable_isNewReconciler:Ht}}var Ca=l.unstable_now,Vx=0,Ef=-1,tu=-1,Rf=-1,$h=!1,_f=!1;function Ix(){return $h}function QC(){_f=!0}function KC(){$h=!1,_f=!1}function ZC(){$h=_f,_f=!1}function jx(){return Vx}function Hx(){Vx=Ca()}function Yh(e){tu=Ca(),e.actualStartTime<0&&(e.actualStartTime=Ca())}function Gx(e){tu=-1}function Sf(e,t){if(tu>=0){var n=Ca()-tu;e.actualDuration+=n,t&&(e.selfBaseDuration=n),tu=-1}}function gi(e){if(Ef>=0){var t=Ca()-Ef;Ef=-1;for(var n=e.return;n!==null;){switch(n.tag){case T:var r=n.stateNode;r.effectDuration+=t;return;case oe:var i=n.stateNode;i.effectDuration+=t;return}n=n.return}}}function qh(e){if(Rf>=0){var t=Ca()-Rf;Rf=-1;for(var n=e.return;n!==null;){switch(n.tag){case T:var r=n.stateNode;r!==null&&(r.passiveEffectDuration+=t);return;case oe:var i=n.stateNode;i!==null&&(i.passiveEffectDuration+=t);return}n=n.return}}}function yi(){Ef=Ca()}function Qh(){Rf=Ca()}function Kh(e){for(var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function Qr(e,t){if(e&&e.defaultProps){var n=Ie({},t),r=e.defaultProps;for(var i in r)n[i]===void 0&&(n[i]=r[i]);return n}return t}var Zh={},Jh,ep,tp,np,rp,Xx,wf,ip,ap,op,nu;{Jh=new Set,ep=new Set,tp=new Set,np=new Set,ip=new Set,rp=new Set,ap=new Set,op=new Set,nu=new Set;var Wx=new Set;wf=function(e,t){if(!(e===null||typeof e=="function")){var n=t+"_"+e;Wx.has(n)||(Wx.add(n),u("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},Xx=function(e,t){if(t===void 0){var n=qe(e)||"Component";rp.has(n)||(rp.add(n),u("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},Object.defineProperty(Zh,"_processChildContext",{enumerable:!1,value:function(){throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(Zh)}function sp(e,t,n,r){var i=e.memoizedState,s=n(r,i);{if(e.mode&Ot){sn(!0);try{s=n(r,i)}finally{sn(!1)}}Xx(t,s)}var f=s==null?i:Ie({},i,s);if(e.memoizedState=f,e.lanes===q){var m=e.updateQueue;m.baseState=f}}var lp={isMounted:HR,enqueueSetState:function(e,t,n){var r=Uo(e),i=Fn(),s=Oa(r),f=Yi(i,s);f.payload=t,n!=null&&(wf(n,"setState"),f.callback=n);var m=Ra(r,f,s);m!==null&&(en(m,r,s,i),Jc(m,r,s)),Fd(r,s)},enqueueReplaceState:function(e,t,n){var r=Uo(e),i=Fn(),s=Oa(r),f=Yi(i,s);f.tag=ux,f.payload=t,n!=null&&(wf(n,"replaceState"),f.callback=n);var m=Ra(r,f,s);m!==null&&(en(m,r,s,i),Jc(m,r,s)),Fd(r,s)},enqueueForceUpdate:function(e,t){var n=Uo(e),r=Fn(),i=Oa(n),s=Yi(r,i);s.tag=Qc,t!=null&&(wf(t,"forceUpdate"),s.callback=t);var f=Ra(n,s,i);f!==null&&(en(f,n,i,r),Jc(f,n,i)),b1(n,i)}};function $x(e,t,n,r,i,s,f){var m=e.stateNode;if(typeof m.shouldComponentUpdate=="function"){var v=m.shouldComponentUpdate(r,s,f);{if(e.mode&Ot){sn(!0);try{v=m.shouldComponentUpdate(r,s,f)}finally{sn(!1)}}v===void 0&&u("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",qe(t)||"Component")}return v}return t.prototype&&t.prototype.isPureReactComponent?!Sl(n,r)||!Sl(i,s):!0}function JC(e,t,n){var r=e.stateNode;{var i=qe(t)||"Component",s=r.render;s||(t.prototype&&typeof t.prototype.render=="function"?u("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",i):u("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",i)),r.getInitialState&&!r.getInitialState.isReactClassApproved&&!r.state&&u("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",i),r.getDefaultProps&&!r.getDefaultProps.isReactClassApproved&&u("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",i),r.propTypes&&u("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",i),r.contextType&&u("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",i),t.childContextTypes&&!nu.has(t)&&(e.mode&Ot)===Ee&&(nu.add(t),u(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`,i)),t.contextTypes&&!nu.has(t)&&(e.mode&Ot)===Ee&&(nu.add(t),u(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`,i)),r.contextTypes&&u("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",i),t.contextType&&t.contextTypes&&!ap.has(t)&&(ap.add(t),u("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",i)),typeof r.componentShouldUpdate=="function"&&u("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",i),t.prototype&&t.prototype.isPureReactComponent&&typeof r.shouldComponentUpdate<"u"&&u("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",qe(t)||"A pure component"),typeof r.componentDidUnmount=="function"&&u("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",i),typeof r.componentDidReceiveProps=="function"&&u("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",i),typeof r.componentWillRecieveProps=="function"&&u("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",i),typeof r.UNSAFE_componentWillRecieveProps=="function"&&u("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",i);var f=r.props!==n;r.props!==void 0&&f&&u("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",i,i),r.defaultProps&&u("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",i,i),typeof r.getSnapshotBeforeUpdate=="function"&&typeof r.componentDidUpdate!="function"&&!tp.has(t)&&(tp.add(t),u("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",qe(t))),typeof r.getDerivedStateFromProps=="function"&&u("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",i),typeof r.getDerivedStateFromError=="function"&&u("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",i),typeof t.getSnapshotBeforeUpdate=="function"&&u("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",i);var m=r.state;m&&(typeof m!="object"||Ze(m))&&u("%s.state: must be set to an object or null",i),typeof r.getChildContext=="function"&&typeof t.childContextTypes!="object"&&u("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",i)}}function Yx(e,t){t.updater=lp,e.stateNode=t,BR(t,e),t._reactInternalInstance=Zh}function qx(e,t,n){var r=!1,i=mr,s=mr,f=t.contextType;if("contextType"in t){var m=f===null||f!==void 0&&f.$$typeof===je&&f._context===void 0;if(!m&&!op.has(t)){op.add(t);var v="";f===void 0?v=" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":typeof f!="object"?v=" However, it is set to a "+typeof f+".":f.$$typeof===Re?v=" Did you accidentally pass the Context.Provider instead?":f._context!==void 0?v=" Did you accidentally pass the Context.Consumer instead?":v=" However, it is set to an object with keys {"+Object.keys(f).join(", ")+"}.",u("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",qe(t)||"Component",v)}}if(typeof f=="object"&&f!==null)s=Vt(f);else{i=ts(e,t,!0);var R=t.contextTypes;r=R!=null,s=r?ns(e,i):mr}var S=new t(n,s);if(e.mode&Ot){sn(!0);try{S=new t(n,s)}finally{sn(!1)}}var D=e.memoizedState=S.state!==null&&S.state!==void 0?S.state:null;Yx(e,S);{if(typeof t.getDerivedStateFromProps=="function"&&D===null){var O=qe(t)||"Component";ep.has(O)||(ep.add(O),u("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",O,S.state===null?"null":"undefined",O))}if(typeof t.getDerivedStateFromProps=="function"||typeof S.getSnapshotBeforeUpdate=="function"){var z=null,B=null,V=null;if(typeof S.componentWillMount=="function"&&S.componentWillMount.__suppressDeprecationWarning!==!0?z="componentWillMount":typeof S.UNSAFE_componentWillMount=="function"&&(z="UNSAFE_componentWillMount"),typeof S.componentWillReceiveProps=="function"&&S.componentWillReceiveProps.__suppressDeprecationWarning!==!0?B="componentWillReceiveProps":typeof S.UNSAFE_componentWillReceiveProps=="function"&&(B="UNSAFE_componentWillReceiveProps"),typeof S.componentWillUpdate=="function"&&S.componentWillUpdate.__suppressDeprecationWarning!==!0?V="componentWillUpdate":typeof S.UNSAFE_componentWillUpdate=="function"&&(V="UNSAFE_componentWillUpdate"),z!==null||B!==null||V!==null){var ae=qe(t)||"Component",xe=typeof t.getDerivedStateFromProps=="function"?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";np.has(ae)||(np.add(ae),u(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`,ae,xe,z!==null?`
  `+z:"",B!==null?`
  `+B:"",V!==null?`
  `+V:""))}}}return r&&By(e,i,s),S}function eT(e,t){var n=t.state;typeof t.componentWillMount=="function"&&t.componentWillMount(),typeof t.UNSAFE_componentWillMount=="function"&&t.UNSAFE_componentWillMount(),n!==t.state&&(u("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",Pe(e)||"Component"),lp.enqueueReplaceState(t,t.state,null))}function Qx(e,t,n,r){var i=t.state;if(typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==i){{var s=Pe(e)||"Component";Jh.has(s)||(Jh.add(s),u("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",s))}lp.enqueueReplaceState(t,t.state,null)}}function up(e,t,n,r){JC(e,t,n);var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},yh(e);var s=t.contextType;if(typeof s=="object"&&s!==null)i.context=Vt(s);else{var f=ts(e,t,!0);i.context=ns(e,f)}{if(i.state===n){var m=qe(t)||"Component";ip.has(m)||(ip.add(m),u("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",m))}e.mode&Ot&&$r.recordLegacyContextWarning(e,i),$r.recordUnsafeLifecycleWarnings(e,i)}i.state=e.memoizedState;var v=t.getDerivedStateFromProps;if(typeof v=="function"&&(sp(e,t,v,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps!="function"&&typeof i.getSnapshotBeforeUpdate!="function"&&(typeof i.UNSAFE_componentWillMount=="function"||typeof i.componentWillMount=="function")&&(eT(e,i),ef(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"){var R=Ye;R|=qa,(e.mode&ci)!==Ee&&(R|=Bi),e.flags|=R}}function tT(e,t,n,r){var i=e.stateNode,s=e.memoizedProps;i.props=s;var f=i.context,m=t.contextType,v=mr;if(typeof m=="object"&&m!==null)v=Vt(m);else{var R=ts(e,t,!0);v=ns(e,R)}var S=t.getDerivedStateFromProps,D=typeof S=="function"||typeof i.getSnapshotBeforeUpdate=="function";!D&&(typeof i.UNSAFE_componentWillReceiveProps=="function"||typeof i.componentWillReceiveProps=="function")&&(s!==n||f!==v)&&Qx(e,i,n,v),fx();var O=e.memoizedState,z=i.state=O;if(ef(e,n,i,r),z=e.memoizedState,s===n&&O===z&&!Lc()&&!tf()){if(typeof i.componentDidMount=="function"){var B=Ye;B|=qa,(e.mode&ci)!==Ee&&(B|=Bi),e.flags|=B}return!1}typeof S=="function"&&(sp(e,t,S,n),z=e.memoizedState);var V=tf()||$x(e,t,s,n,O,z,v);if(V){if(!D&&(typeof i.UNSAFE_componentWillMount=="function"||typeof i.componentWillMount=="function")&&(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"){var ae=Ye;ae|=qa,(e.mode&ci)!==Ee&&(ae|=Bi),e.flags|=ae}}else{if(typeof i.componentDidMount=="function"){var xe=Ye;xe|=qa,(e.mode&ci)!==Ee&&(xe|=Bi),e.flags|=xe}e.memoizedProps=n,e.memoizedState=z}return i.props=n,i.state=z,i.context=v,V}function nT(e,t,n,r,i){var s=t.stateNode;cx(e,t);var f=t.memoizedProps,m=t.type===t.elementType?f:Qr(t.type,f);s.props=m;var v=t.pendingProps,R=s.context,S=n.contextType,D=mr;if(typeof S=="object"&&S!==null)D=Vt(S);else{var O=ts(t,n,!0);D=ns(t,O)}var z=n.getDerivedStateFromProps,B=typeof z=="function"||typeof s.getSnapshotBeforeUpdate=="function";!B&&(typeof s.UNSAFE_componentWillReceiveProps=="function"||typeof s.componentWillReceiveProps=="function")&&(f!==v||R!==D)&&Qx(t,s,r,D),fx();var V=t.memoizedState,ae=s.state=V;if(ef(t,r,s,i),ae=t.memoizedState,f===v&&V===ae&&!Lc()&&!tf()&&!xr)return typeof s.componentDidUpdate=="function"&&(f!==e.memoizedProps||V!==e.memoizedState)&&(t.flags|=Ye),typeof s.getSnapshotBeforeUpdate=="function"&&(f!==e.memoizedProps||V!==e.memoizedState)&&(t.flags|=$a),!1;typeof z=="function"&&(sp(t,n,z,r),ae=t.memoizedState);var xe=tf()||$x(t,n,m,r,V,ae,D)||xr;return xe?(!B&&(typeof s.UNSAFE_componentWillUpdate=="function"||typeof s.componentWillUpdate=="function")&&(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,ae,D),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,ae,D)),typeof s.componentDidUpdate=="function"&&(t.flags|=Ye),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=$a)):(typeof s.componentDidUpdate=="function"&&(f!==e.memoizedProps||V!==e.memoizedState)&&(t.flags|=Ye),typeof s.getSnapshotBeforeUpdate=="function"&&(f!==e.memoizedProps||V!==e.memoizedState)&&(t.flags|=$a),t.memoizedProps=r,t.memoizedState=ae),s.props=r,s.state=ae,s.context=D,xe}function ho(e,t){return{value:e,source:t,stack:Hs(t),digest:null}}function cp(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function rT(e,t){return!0}function fp(e,t){try{var n=rT(e,t);if(n===!1)return;var r=t.value,i=t.source,s=t.stack,f=s!==null?s:"";if(r!=null&&r._suppressLogging){if(e.tag===p)return;console.error(r)}var m=i?Pe(i):null,v=m?"The above error occurred in the <"+m+"> component:":"The above error occurred in one of your React components:",R;if(e.tag===T)R=`Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;else{var S=Pe(e)||"Anonymous";R="React will try to recreate this component tree from scratch "+("using the error boundary you provided, "+S+".")}var D=v+`
`+f+`

`+(""+R);console.error(D)}catch(O){setTimeout(function(){throw O})}}var iT=typeof WeakMap=="function"?WeakMap:Map;function Kx(e,t,n){var r=Yi(gt,n);r.tag=vh,r.payload={element:null};var i=t.value;return r.callback=function(){QN(i),fp(e,t)},r}function dp(e,t,n){var r=Yi(gt,n);r.tag=vh;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var s=t.value;r.payload=function(){return i(s)},r.callback=function(){lb(e),fp(e,t)}}var f=e.stateNode;return f!==null&&typeof f.componentDidCatch=="function"&&(r.callback=function(){lb(e),fp(e,t),typeof i!="function"&&YN(this);var v=t.value,R=t.stack;this.componentDidCatch(v,{componentStack:R!==null?R:""}),typeof i!="function"&&(ur(e.lanes,Oe)||u("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",Pe(e)||"Unknown"))}),r}function Zx(e,t,n){var r=e.pingCache,i;if(r===null?(r=e.pingCache=new iT,i=new Set,r.set(t,i)):(i=r.get(t),i===void 0&&(i=new Set,r.set(t,i))),!i.has(n)){i.add(n);var s=KN.bind(null,e,t,n);Hr&&xu(e,n),t.then(s,s)}}function aT(e,t,n,r){var i=e.updateQueue;if(i===null){var s=new Set;s.add(n),e.updateQueue=s}else i.add(n)}function oT(e,t){var n=e.tag;if((e.mode&Ge)===Ee&&(n===g||n===Y||n===K)){var r=e.alternate;r?(e.updateQueue=r.updateQueue,e.memoizedState=r.memoizedState,e.lanes=r.lanes):(e.updateQueue=null,e.memoizedState=null)}}function Jx(e){var t=e;do{if(t.tag===j&&VC(t))return t;t=t.return}while(t!==null);return null}function e0(e,t,n,r,i){if((e.mode&Ge)===Ee){if(e===t)e.flags|=zn;else{if(e.flags|=Je,n.flags|=Md,n.flags&=~(FR|tl),n.tag===p){var s=n.alternate;if(s===null)n.tag=_e;else{var f=Yi(gt,Oe);f.tag=Qc,Ra(n,f,Oe)}}n.lanes=ze(n.lanes,Oe)}return e}return e.flags|=zn,e.lanes=i,e}function sT(e,t,n,r,i){if(n.flags|=tl,Hr&&xu(e,i),r!==null&&typeof r=="object"&&typeof r.then=="function"){var s=r;oT(n),hn()&&n.mode&Ge&&Xy();var f=Jx(t);if(f!==null){f.flags&=~zi,e0(f,t,n,e,i),f.mode&Ge&&Zx(e,s,i),aT(f,e,s);return}else{if(!A1(i)){Zx(e,s,i),Xp();return}var m=new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");r=m}}else if(hn()&&n.mode&Ge){Xy();var v=Jx(t);if(v!==null){(v.flags&zn)===Se&&(v.flags|=zi),e0(v,t,n,e,i),ih(ho(r,n));return}}r=ho(r,n),VN(r);var R=t;do{switch(R.tag){case T:{var S=r;R.flags|=zn;var D=ul(i);R.lanes=ze(R.lanes,D);var O=Kx(R,S,D);xh(R,O);return}case p:var z=r,B=R.type,V=R.stateNode;if((R.flags&Je)===Se&&(typeof B.getDerivedStateFromError=="function"||V!==null&&typeof V.componentDidCatch=="function"&&!J0(V))){R.flags|=zn;var ae=ul(i);R.lanes=ze(R.lanes,ae);var xe=dp(R,z,ae);xh(R,xe);return}break}R=R.return}while(R!==null)}function lT(){return null}var ru=a.ReactCurrentOwner,Kr=!1,mp,iu,hp,pp,vp,po,gp,Cf,au;mp={},iu={},hp={},pp={},vp={},po=!1,gp={},Cf={},au={};function Un(e,t,n,r){e===null?t.child=rx(t,null,n,r):t.child=os(t,e.child,n,r)}function uT(e,t,n,r){t.child=os(t,e.child,null,r),t.child=os(t,null,n,r)}function t0(e,t,n,r,i){if(t.type!==t.elementType){var s=n.propTypes;s&&Xr(s,r,"prop",qe(n))}var f=n.render,m=t.ref,v,R;ls(t,i),rl(t);{if(ru.current=t,sr(!0),v=hs(e,t,f,r,m,i),R=ps(),t.mode&Ot){sn(!0);try{v=hs(e,t,f,r,m,i),R=ps()}finally{sn(!1)}}sr(!1)}return Io(),e!==null&&!Kr?(gx(e,t,i),qi(e,t,i)):(hn()&&R&&Zm(t),t.flags|=Bo,Un(e,t,v,i),t.child)}function n0(e,t,n,r,i){if(e===null){var s=n.type;if(hA(s)&&n.compare===null&&n.defaultProps===void 0){var f=s;return f=_s(s),t.tag=K,t.type=f,bp(t,s),r0(e,t,f,r,i)}{var m=s.propTypes;if(m&&Xr(m,r,"prop",qe(s)),n.defaultProps!==void 0){var v=qe(s)||"Unknown";au[v]||(u("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.",v),au[v]=!0)}}var R=nv(n.type,null,r,t,t.mode,i);return R.ref=t.ref,R.return=t,t.child=R,R}{var S=n.type,D=S.propTypes;D&&Xr(D,r,"prop",qe(S))}var O=e.child,z=Cp(e,i);if(!z){var B=O.memoizedProps,V=n.compare;if(V=V!==null?V:Sl,V(B,r)&&e.ref===t.ref)return qi(e,t,i)}t.flags|=Bo;var ae=bo(O,r);return ae.ref=t.ref,ae.return=t,t.child=ae,ae}function r0(e,t,n,r,i){if(t.type!==t.elementType){var s=t.elementType;if(s.$$typeof===Fe){var f=s,m=f._payload,v=f._init;try{s=v(m)}catch{s=null}var R=s&&s.propTypes;R&&Xr(R,r,"prop",qe(s))}}if(e!==null){var S=e.memoizedProps;if(Sl(S,r)&&e.ref===t.ref&&t.type===e.type)if(Kr=!1,t.pendingProps=r=S,Cp(e,i))(e.flags&Md)!==Se&&(Kr=!0);else return t.lanes=e.lanes,qi(e,t,i)}return yp(e,t,n,r,i)}function i0(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden"||Hn)if((t.mode&Ge)===Ee){var f={baseLanes:q,cachePool:null,transitions:null};t.memoizedState=f,Ff(t,n)}else if(ur(n,lr)){var D={baseLanes:q,cachePool:null,transitions:null};t.memoizedState=D;var O=s!==null?s.baseLanes:n;Ff(t,O)}else{var m=null,v;if(s!==null){var R=s.baseLanes;v=ze(R,n)}else v=n;t.lanes=t.childLanes=lr;var S={baseLanes:v,cachePool:m,transitions:null};return t.memoizedState=S,t.updateQueue=null,Ff(t,v),null}else{var z;s!==null?(z=ze(s.baseLanes,n),t.memoizedState=null):z=n,Ff(t,z)}return Un(e,t,i,n),t.child}function cT(e,t,n){var r=t.pendingProps;return Un(e,t,r,n),t.child}function fT(e,t,n){var r=t.pendingProps.children;return Un(e,t,r,n),t.child}function dT(e,t,n){{t.flags|=Ye;{var r=t.stateNode;r.effectDuration=0,r.passiveEffectDuration=0}}var i=t.pendingProps,s=i.children;return Un(e,t,s,n),t.child}function a0(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=ca,t.flags|=kd)}function yp(e,t,n,r,i){if(t.type!==t.elementType){var s=n.propTypes;s&&Xr(s,r,"prop",qe(n))}var f;{var m=ts(t,n,!0);f=ns(t,m)}var v,R;ls(t,i),rl(t);{if(ru.current=t,sr(!0),v=hs(e,t,n,r,f,i),R=ps(),t.mode&Ot){sn(!0);try{v=hs(e,t,n,r,f,i),R=ps()}finally{sn(!1)}}sr(!1)}return Io(),e!==null&&!Kr?(gx(e,t,i),qi(e,t,i)):(hn()&&R&&Zm(t),t.flags|=Bo,Un(e,t,v,i),t.child)}function o0(e,t,n,r,i){{switch(AA(t)){case!1:{var s=t.stateNode,f=t.type,m=new f(t.memoizedProps,s.context),v=m.state;s.updater.enqueueSetState(s,v,null);break}case!0:{t.flags|=Je,t.flags|=zn;var R=new Error("Simulated error coming from DevTools"),S=ul(i);t.lanes=ze(t.lanes,S);var D=dp(t,ho(R,t),S);xh(t,D);break}}if(t.type!==t.elementType){var O=n.propTypes;O&&Xr(O,r,"prop",qe(n))}}var z;mi(n)?(z=!0,Uc(t)):z=!1,ls(t,i);var B=t.stateNode,V;B===null?(Nf(e,t),qx(t,n,r),up(t,n,r,i),V=!0):e===null?V=tT(t,n,r,i):V=nT(e,t,n,r,i);var ae=xp(e,t,n,V,z,i);{var xe=t.stateNode;V&&xe.props!==r&&(po||u("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",Pe(t)||"a component"),po=!0)}return ae}function xp(e,t,n,r,i,s){a0(e,t);var f=(t.flags&Je)!==Se;if(!r&&!f)return i&&Iy(t,n,!1),qi(e,t,s);var m=t.stateNode;ru.current=t;var v;if(f&&typeof n.getDerivedStateFromError!="function")v=null,Gx();else{rl(t);{if(sr(!0),v=m.render(),t.mode&Ot){sn(!0);try{m.render()}finally{sn(!1)}}sr(!1)}Io()}return t.flags|=Bo,e!==null&&f?uT(e,t,v,s):Un(e,t,v,s),t.memoizedState=m.state,i&&Iy(t,n,!0),t.child}function s0(e){var t=e.stateNode;t.pendingContext?Fy(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Fy(e,t.context,!1),bh(e,t.containerInfo)}function mT(e,t,n){if(s0(t),e===null)throw new Error("Should have a current fiber. This is a bug in React.");var r=t.pendingProps,i=t.memoizedState,s=i.element;cx(e,t),ef(t,r,null,n);var f=t.memoizedState;t.stateNode;var m=f.element;if(i.isDehydrated){var v={element:m,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},R=t.updateQueue;if(R.baseState=v,t.memoizedState=v,t.flags&zi){var S=ho(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return l0(e,t,m,n,S)}else if(m!==s){var D=ho(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return l0(e,t,m,n,D)}else{vC(t);var O=rx(t,null,m,n);t.child=O;for(var z=O;z;)z.flags=z.flags&~Ft|Ui,z=z.sibling}}else{if(as(),m===s)return qi(e,t,n);Un(e,t,m,n)}return t.child}function l0(e,t,n,r,i){return as(),ih(i),t.flags|=zi,Un(e,t,n,r),t.child}function hT(e,t,n){hx(t),e===null&&rh(t);var r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,f=i.children,m=Bm(r,i);return m?f=null:s!==null&&Bm(r,s)&&(t.flags|=el),a0(e,t),Un(e,t,f,n),t.child}function pT(e,t){return e===null&&rh(t),null}function vT(e,t,n,r){Nf(e,t);var i=t.pendingProps,s=n,f=s._payload,m=s._init,v=m(f);t.type=v;var R=t.tag=pA(v),S=Qr(v,i),D;switch(R){case g:return bp(t,v),t.type=v=_s(v),D=yp(null,t,v,S,r),D;case p:return t.type=v=Qp(v),D=o0(null,t,v,S,r),D;case Y:return t.type=v=Kp(v),D=t0(null,t,v,S,r),D;case ne:{if(t.type!==t.elementType){var O=v.propTypes;O&&Xr(O,S,"prop",qe(v))}return D=n0(null,t,v,Qr(v.type,S),r),D}}var z="";throw v!==null&&typeof v=="object"&&v.$$typeof===Fe&&(z=" Did you wrap a component in React.lazy() more than once?"),new Error("Element type is invalid. Received a promise that resolves to: "+v+". "+("Lazy element type must resolve to a class or function."+z))}function gT(e,t,n,r,i){Nf(e,t),t.tag=p;var s;return mi(n)?(s=!0,Uc(t)):s=!1,ls(t,i),qx(t,n,r),up(t,n,r,i),xp(null,t,n,!0,s,i)}function yT(e,t,n,r){Nf(e,t);var i=t.pendingProps,s;{var f=ts(t,n,!1);s=ns(t,f)}ls(t,r);var m,v;rl(t);{if(n.prototype&&typeof n.prototype.render=="function"){var R=qe(n)||"Unknown";mp[R]||(u("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",R,R),mp[R]=!0)}t.mode&Ot&&$r.recordLegacyContextWarning(t,null),sr(!0),ru.current=t,m=hs(null,t,n,i,s,r),v=ps(),sr(!1)}if(Io(),t.flags|=Bo,typeof m=="object"&&m!==null&&typeof m.render=="function"&&m.$$typeof===void 0){var S=qe(n)||"Unknown";iu[S]||(u("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",S,S,S),iu[S]=!0)}if(typeof m=="object"&&m!==null&&typeof m.render=="function"&&m.$$typeof===void 0){{var D=qe(n)||"Unknown";iu[D]||(u("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",D,D,D),iu[D]=!0)}t.tag=p,t.memoizedState=null,t.updateQueue=null;var O=!1;return mi(n)?(O=!0,Uc(t)):O=!1,t.memoizedState=m.state!==null&&m.state!==void 0?m.state:null,yh(t),Yx(t,m),up(t,n,i,r),xp(null,t,n,!0,O,r)}else{if(t.tag=g,t.mode&Ot){sn(!0);try{m=hs(null,t,n,i,s,r),v=ps()}finally{sn(!1)}}return hn()&&v&&Zm(t),Un(null,t,m,r),bp(t,n),t.child}}function bp(e,t){{if(t&&t.childContextTypes&&u("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),e.ref!==null){var n="",r=oa();r&&(n+=`

Check the render method of \``+r+"`.");var i=r||"",s=e._debugSource;s&&(i=s.fileName+":"+s.lineNumber),vp[i]||(vp[i]=!0,u("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if(t.defaultProps!==void 0){var f=qe(t)||"Unknown";au[f]||(u("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",f),au[f]=!0)}if(typeof t.getDerivedStateFromProps=="function"){var m=qe(t)||"Unknown";pp[m]||(u("%s: Function components do not support getDerivedStateFromProps.",m),pp[m]=!0)}if(typeof t.contextType=="object"&&t.contextType!==null){var v=qe(t)||"Unknown";hp[v]||(u("%s: Function components do not support contextType.",v),hp[v]=!0)}}}var Ep={dehydrated:null,treeContext:null,retryLane:ln};function Rp(e){return{baseLanes:e,cachePool:lT(),transitions:null}}function xT(e,t){var n=null;return{baseLanes:ze(e.baseLanes,t),cachePool:n,transitions:e.transitions}}function bT(e,t,n,r){if(t!==null){var i=t.memoizedState;if(i===null)return!1}return _h(e,Yl)}function ET(e,t){return oc(e.childLanes,t)}function u0(e,t,n){var r=t.pendingProps;OA(t)&&(t.flags|=Je);var i=Yr.current,s=!1,f=(t.flags&Je)!==Se;if(f||bT(i,e)?(s=!0,t.flags&=~Je):(e===null||e.memoizedState!==null)&&(i=FC(i,vx)),i=cs(i),Sa(t,i),e===null){rh(t);var m=t.memoizedState;if(m!==null){var v=m.dehydrated;if(v!==null)return CT(t,v)}var R=r.children,S=r.fallback;if(s){var D=RT(t,R,S,n),O=t.child;return O.memoizedState=Rp(n),t.memoizedState=Ep,D}else return _p(t,R)}else{var z=e.memoizedState;if(z!==null){var B=z.dehydrated;if(B!==null)return TT(e,t,f,r,B,z,n)}if(s){var V=r.fallback,ae=r.children,xe=ST(e,t,ae,V,n),ve=t.child,We=e.child.memoizedState;return ve.memoizedState=We===null?Rp(n):xT(We,n),ve.childLanes=ET(e,n),t.memoizedState=Ep,xe}else{var Ve=r.children,P=_T(e,t,Ve,n);return t.memoizedState=null,P}}}function _p(e,t,n){var r=e.mode,i={mode:"visible",children:t},s=Sp(i,r);return s.return=e,e.child=s,s}function RT(e,t,n,r){var i=e.mode,s=e.child,f={mode:"hidden",children:t},m,v;return(i&Ge)===Ee&&s!==null?(m=s,m.childLanes=q,m.pendingProps=f,e.mode&ot&&(m.actualDuration=0,m.actualStartTime=-1,m.selfBaseDuration=0,m.treeBaseDuration=0),v=Ma(n,i,r,null)):(m=Sp(f,i),v=Ma(n,i,r,null)),m.return=e,v.return=e,m.sibling=v,e.child=m,v}function Sp(e,t,n){return cb(e,t,q,null)}function c0(e,t){return bo(e,t)}function _T(e,t,n,r){var i=e.child,s=i.sibling,f=c0(i,{mode:"visible",children:n});if((t.mode&Ge)===Ee&&(f.lanes=r),f.return=t,f.sibling=null,s!==null){var m=t.deletions;m===null?(t.deletions=[s],t.flags|=Wa):m.push(s)}return t.child=f,f}function ST(e,t,n,r,i){var s=t.mode,f=e.child,m=f.sibling,v={mode:"hidden",children:n},R;if((s&Ge)===Ee&&t.child!==f){var S=t.child;R=S,R.childLanes=q,R.pendingProps=v,t.mode&ot&&(R.actualDuration=0,R.actualStartTime=-1,R.selfBaseDuration=f.selfBaseDuration,R.treeBaseDuration=f.treeBaseDuration),t.deletions=null}else R=c0(f,v),R.subtreeFlags=f.subtreeFlags&Fi;var D;return m!==null?D=bo(m,r):(D=Ma(r,s,i,null),D.flags|=Ft),D.return=t,R.return=t,R.sibling=D,t.child=R,D}function Tf(e,t,n,r){r!==null&&ih(r),os(t,e.child,null,n);var i=t.pendingProps,s=i.children,f=_p(t,s);return f.flags|=Ft,t.memoizedState=null,f}function wT(e,t,n,r,i){var s=t.mode,f={mode:"visible",children:n},m=Sp(f,s),v=Ma(r,s,i,null);return v.flags|=Ft,m.return=t,v.return=t,m.sibling=v,t.child=m,(t.mode&Ge)!==Ee&&os(t,e.child,null,i),v}function CT(e,t,n){return(e.mode&Ge)===Ee?(u("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),e.lanes=Oe):jm(t)?e.lanes=Za:e.lanes=lr,null}function TT(e,t,n,r,i,s,f){if(n)if(t.flags&zi){t.flags&=~zi;var P=cp(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));return Tf(e,t,f,P)}else{if(t.memoizedState!==null)return t.child=e.child,t.flags|=Je,null;var I=r.children,L=r.fallback,Z=wT(e,t,I,L,f),ce=t.child;return ce.memoizedState=Rp(f),t.memoizedState=Ep,Z}else{if(hC(),(t.mode&Ge)===Ee)return Tf(e,t,f,null);if(jm(i)){var m,v,R;{var S=Dw(i);m=S.digest,v=S.message,R=S.stack}var D;v?D=new Error(v):D=new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");var O=cp(D,m,R);return Tf(e,t,f,O)}var z=ur(f,e.childLanes);if(Kr||z){var B=Bf();if(B!==null){var V=U1(B,f);if(V!==ln&&V!==s.retryLane){s.retryLane=V;var ae=gt;Kn(e,V),en(B,e,V,ae)}}Xp();var xe=cp(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));return Tf(e,t,f,xe)}else if(ky(i)){t.flags|=Je,t.child=e.child;var ve=ZN.bind(null,e);return Mw(i,ve),null}else{gC(t,i,s.treeContext);var We=r.children,Ve=_p(t,We);return Ve.flags|=Ui,Ve}}}function f0(e,t,n){e.lanes=ze(e.lanes,t);var r=e.alternate;r!==null&&(r.lanes=ze(r.lanes,t)),hh(e.return,t,n)}function NT(e,t,n){for(var r=t;r!==null;){if(r.tag===j){var i=r.memoizedState;i!==null&&f0(r,n,e)}else if(r.tag===pe)f0(r,n,e);else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)return;for(;r.sibling===null;){if(r.return===null||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}}function AT(e){for(var t=e,n=null;t!==null;){var r=t.alternate;r!==null&&af(r)===null&&(n=t),t=t.sibling}return n}function OT(e){if(e!==void 0&&e!=="forwards"&&e!=="backwards"&&e!=="together"&&!gp[e])if(gp[e]=!0,typeof e=="string")switch(e.toLowerCase()){case"together":case"forwards":case"backwards":{u('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break}case"forward":case"backward":{u('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break}default:u('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e);break}else u('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}function DT(e,t){e!==void 0&&!Cf[e]&&(e!=="collapsed"&&e!=="hidden"?(Cf[e]=!0,u('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',e)):t!=="forwards"&&t!=="backwards"&&(Cf[e]=!0,u('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',e)))}function d0(e,t){{var n=Ze(e),r=!n&&typeof Oi(e)=="function";if(n||r){var i=n?"array":"iterable";return u("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",i,t,i),!1}}return!0}function MT(e,t){if((t==="forwards"||t==="backwards")&&e!==void 0&&e!==null&&e!==!1)if(Ze(e)){for(var n=0;n<e.length;n++)if(!d0(e[n],n))return}else{var r=Oi(e);if(typeof r=="function"){var i=r.call(e);if(i)for(var s=i.next(),f=0;!s.done;s=i.next()){if(!d0(s.value,f))return;f++}}else u('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}function wp(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function m0(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail,f=r.children;OT(i),DT(s,i),MT(f,i),Un(e,t,f,n);var m=Yr.current,v=_h(m,Yl);if(v)m=Sh(m,Yl),t.flags|=Je;else{var R=e!==null&&(e.flags&Je)!==Se;R&&NT(t,t.child,n),m=cs(m)}if(Sa(t,m),(t.mode&Ge)===Ee)t.memoizedState=null;else switch(i){case"forwards":{var S=AT(t.child),D;S===null?(D=t.child,t.child=null):(D=S.sibling,S.sibling=null),wp(t,!1,D,S,s);break}case"backwards":{var O=null,z=t.child;for(t.child=null;z!==null;){var B=z.alternate;if(B!==null&&af(B)===null){t.child=z;break}var V=z.sibling;z.sibling=O,O=z,z=V}wp(t,!0,O,null,s);break}case"together":{wp(t,!1,null,null,void 0);break}default:t.memoizedState=null}return t.child}function kT(e,t,n){bh(t,t.stateNode.containerInfo);var r=t.pendingProps;return e===null?t.child=os(t,null,r,n):Un(e,t,r,n),t.child}var h0=!1;function PT(e,t,n){var r=t.type,i=r._context,s=t.pendingProps,f=t.memoizedProps,m=s.value;{"value"in s||h0||(h0=!0,u("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var v=t.type.propTypes;v&&Xr(v,s,"prop","Context.Provider")}if(ox(t,i,m),f!==null){var R=f.value;if(dr(R,m)){if(f.children===s.children&&!Lc())return qi(e,t,n)}else OC(t,i,n)}var S=s.children;return Un(e,t,S,n),t.child}var p0=!1;function LT(e,t,n){var r=t.type;r._context===void 0?r!==r.Consumer&&(p0||(p0=!0,u("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))):r=r._context;var i=t.pendingProps,s=i.children;typeof s!="function"&&u("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),ls(t,n);var f=Vt(r);rl(t);var m;return ru.current=t,sr(!0),m=s(f),sr(!1),Io(),t.flags|=Bo,Un(e,t,m,n),t.child}function ou(){Kr=!0}function Nf(e,t){(t.mode&Ge)===Ee&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=Ft)}function qi(e,t,n){return e!==null&&(t.dependencies=e.dependencies),Gx(),yu(t.lanes),ur(n,t.childLanes)?(NC(e,t),t.child):null}function zT(e,t,n){{var r=t.return;if(r===null)throw new Error("Cannot swap the root fiber.");if(e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===r.child)r.child=n;else{var i=r.child;if(i===null)throw new Error("Expected parent to have a child.");for(;i.sibling!==t;)if(i=i.sibling,i===null)throw new Error("Expected to find the previous sibling.");i.sibling=n}var s=r.deletions;return s===null?(r.deletions=[e],r.flags|=Wa):s.push(e),n.flags|=Ft,n}}function Cp(e,t){var n=e.lanes;return!!ur(n,t)}function UT(e,t,n){switch(t.tag){case T:s0(t),t.stateNode,as();break;case w:hx(t);break;case p:{var r=t.type;mi(r)&&Uc(t);break}case C:bh(t,t.stateNode.containerInfo);break;case M:{var i=t.memoizedProps.value,s=t.type._context;ox(t,s,i);break}case oe:{var f=ur(n,t.childLanes);f&&(t.flags|=Ye);{var m=t.stateNode;m.effectDuration=0,m.passiveEffectDuration=0}}break;case j:{var v=t.memoizedState;if(v!==null){if(v.dehydrated!==null)return Sa(t,cs(Yr.current)),t.flags|=Je,null;var R=t.child,S=R.childLanes;if(ur(n,S))return u0(e,t,n);Sa(t,cs(Yr.current));var D=qi(e,t,n);return D!==null?D.sibling:null}else Sa(t,cs(Yr.current));break}case pe:{var O=(e.flags&Je)!==Se,z=ur(n,t.childLanes);if(O){if(z)return m0(e,t,n);t.flags|=Je}var B=t.memoizedState;if(B!==null&&(B.rendering=null,B.tail=null,B.lastEffect=null),Sa(t,Yr.current),z)break;return null}case we:case be:return t.lanes=q,i0(e,t,n)}return qi(e,t,n)}function v0(e,t,n){if(t._debugNeedsRemount&&e!==null)return zT(e,t,nv(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(e!==null){var r=e.memoizedProps,i=t.pendingProps;if(r!==i||Lc()||t.type!==e.type)Kr=!0;else{var s=Cp(e,n);if(!s&&(t.flags&Je)===Se)return Kr=!1,UT(e,t,n);(e.flags&Md)!==Se?Kr=!0:Kr=!1}}else if(Kr=!1,hn()&&lC(t)){var f=t.index,m=uC();Gy(t,m,f)}switch(t.lanes=q,t.tag){case _:return yT(e,t,t.type,n);case me:{var v=t.elementType;return vT(e,t,v,n)}case g:{var R=t.type,S=t.pendingProps,D=t.elementType===R?S:Qr(R,S);return yp(e,t,R,D,n)}case p:{var O=t.type,z=t.pendingProps,B=t.elementType===O?z:Qr(O,z);return o0(e,t,O,B,n)}case T:return mT(e,t,n);case w:return hT(e,t,n);case k:return pT(e,t);case j:return u0(e,t,n);case C:return kT(e,t,n);case Y:{var V=t.type,ae=t.pendingProps,xe=t.elementType===V?ae:Qr(V,ae);return t0(e,t,V,xe,n)}case W:return cT(e,t,n);case $:return fT(e,t,n);case oe:return dT(e,t,n);case M:return PT(e,t,n);case X:return LT(e,t,n);case ne:{var ve=t.type,We=t.pendingProps,Ve=Qr(ve,We);if(t.type!==t.elementType){var P=ve.propTypes;P&&Xr(P,Ve,"prop",qe(ve))}return Ve=Qr(ve.type,Ve),n0(e,t,ve,Ve,n)}case K:return r0(e,t,t.type,t.pendingProps,n);case _e:{var I=t.type,L=t.pendingProps,Z=t.elementType===I?L:Qr(I,L);return gT(e,t,I,Z,n)}case pe:return m0(e,t,n);case ct:break;case we:return i0(e,t,n)}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function vs(e){e.flags|=Ye}function g0(e){e.flags|=ca,e.flags|=kd}var y0,Tp,x0,b0;y0=function(e,t,n,r){for(var i=t.child;i!==null;){if(i.tag===w||i.tag===k)aw(e,i.stateNode);else if(i.tag!==C){if(i.child!==null){i.child.return=i,i=i.child;continue}}if(i===t)return;for(;i.sibling===null;){if(i.return===null||i.return===t)return;i=i.return}i.sibling.return=i.return,i=i.sibling}},Tp=function(e,t){},x0=function(e,t,n,r,i){var s=e.memoizedProps;if(s!==r){var f=t.stateNode,m=Eh(),v=sw(f,n,s,r,i,m);t.updateQueue=v,v&&vs(t)}},b0=function(e,t,n,r){n!==r&&vs(t)};function su(e,t){if(!hn())switch(e.tailMode){case"hidden":{for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e.tail=null:r.sibling=null;break}case"collapsed":{for(var i=e.tail,s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?!t&&e.tail!==null?e.tail.sibling=null:e.tail=null:s.sibling=null;break}}}function vn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=q,r=Se;if(t){if((e.mode&ot)!==Ee){for(var v=e.selfBaseDuration,R=e.child;R!==null;)n=ze(n,ze(R.lanes,R.childLanes)),r|=R.subtreeFlags&Fi,r|=R.flags&Fi,v+=R.treeBaseDuration,R=R.sibling;e.treeBaseDuration=v}else for(var S=e.child;S!==null;)n=ze(n,ze(S.lanes,S.childLanes)),r|=S.subtreeFlags&Fi,r|=S.flags&Fi,S.return=e,S=S.sibling;e.subtreeFlags|=r}else{if((e.mode&ot)!==Ee){for(var i=e.actualDuration,s=e.selfBaseDuration,f=e.child;f!==null;)n=ze(n,ze(f.lanes,f.childLanes)),r|=f.subtreeFlags,r|=f.flags,i+=f.actualDuration,s+=f.treeBaseDuration,f=f.sibling;e.actualDuration=i,e.treeBaseDuration=s}else for(var m=e.child;m!==null;)n=ze(n,ze(m.lanes,m.childLanes)),r|=m.subtreeFlags,r|=m.flags,m.return=e,m=m.sibling;e.subtreeFlags|=r}return e.childLanes=n,t}function BT(e,t,n){if(RC()&&(t.mode&Ge)!==Ee&&(t.flags&Je)===Se)return Ky(t),as(),t.flags|=zi|tl|zn,!1;var r=jc(t);if(n!==null&&n.dehydrated!==null)if(e===null){if(!r)throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(bC(t),vn(t),(t.mode&ot)!==Ee){var i=n!==null;if(i){var s=t.child;s!==null&&(t.treeBaseDuration-=s.treeBaseDuration)}}return!1}else{if(as(),(t.flags&Je)===Se&&(t.memoizedState=null),t.flags|=Ye,vn(t),(t.mode&ot)!==Ee){var f=n!==null;if(f){var m=t.child;m!==null&&(t.treeBaseDuration-=m.treeBaseDuration)}}return!1}else return Zy(),!0}function E0(e,t,n){var r=t.pendingProps;switch(Jm(t),t.tag){case _:case me:case K:case g:case Y:case W:case $:case oe:case X:case ne:return vn(t),null;case p:{var i=t.type;return mi(i)&&zc(t),vn(t),null}case T:{var s=t.stateNode;if(us(t),qm(t),Ch(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),e===null||e.child===null){var f=jc(t);if(f)vs(t);else if(e!==null){var m=e.memoizedState;(!m.isDehydrated||(t.flags&zi)!==Se)&&(t.flags|=$a,Zy())}}return Tp(e,t),vn(t),null}case w:{Rh(t);var v=mx(),R=t.type;if(e!==null&&t.stateNode!=null)x0(e,t,R,r,v),e.ref!==t.ref&&g0(t);else{if(!r){if(t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return vn(t),null}var S=Eh(),D=jc(t);if(D)yC(t,v,S)&&vs(t);else{var O=iw(R,r,v,S,t);y0(O,t,!1,!1),t.stateNode=O,ow(O,R,r,v)&&vs(t)}t.ref!==null&&g0(t)}return vn(t),null}case k:{var z=r;if(e&&t.stateNode!=null){var B=e.memoizedProps;b0(e,t,B,z)}else{if(typeof z!="string"&&t.stateNode===null)throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var V=mx(),ae=Eh(),xe=jc(t);xe?xC(t)&&vs(t):t.stateNode=lw(z,V,ae,t)}return vn(t),null}case j:{fs(t);var ve=t.memoizedState;if(e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){var We=BT(e,t,ve);if(!We)return t.flags&zn?t:null}if((t.flags&Je)!==Se)return t.lanes=n,(t.mode&ot)!==Ee&&Kh(t),t;var Ve=ve!==null,P=e!==null&&e.memoizedState!==null;if(Ve!==P&&Ve){var I=t.child;if(I.flags|=Ya,(t.mode&Ge)!==Ee){var L=e===null&&(t.memoizedProps.unstable_avoidThisFallback!==!0||!Gn);L||_h(Yr.current,vx)?FN():Xp()}}var Z=t.updateQueue;if(Z!==null&&(t.flags|=Ye),vn(t),(t.mode&ot)!==Ee&&Ve){var ce=t.child;ce!==null&&(t.treeBaseDuration-=ce.treeBaseDuration)}return null}case C:return us(t),Tp(e,t),e===null&&tC(t.stateNode.containerInfo),vn(t),null;case M:var se=t.type._context;return mh(se,t),vn(t),null;case _e:{var Te=t.type;return mi(Te)&&zc(t),vn(t),null}case pe:{fs(t);var Me=t.memoizedState;if(Me===null)return vn(t),null;var lt=(t.flags&Je)!==Se,Qe=Me.rendering;if(Qe===null)if(lt)su(Me,!1);else{var Pt=IN()&&(e===null||(e.flags&Je)===Se);if(!Pt)for(var Ke=t.child;Ke!==null;){var Dt=af(Ke);if(Dt!==null){lt=!0,t.flags|=Je,su(Me,!1);var Dn=Dt.updateQueue;return Dn!==null&&(t.updateQueue=Dn,t.flags|=Ye),t.subtreeFlags=Se,AC(t,n),Sa(t,Sh(Yr.current,Yl)),t.child}Ke=Ke.sibling}Me.tail!==null&&on()>j0()&&(t.flags|=Je,lt=!0,su(Me,!1),t.lanes=bg)}else{if(!lt){var En=af(Qe);if(En!==null){t.flags|=Je,lt=!0;var pr=En.updateQueue;if(pr!==null&&(t.updateQueue=pr,t.flags|=Ye),su(Me,!0),Me.tail===null&&Me.tailMode==="hidden"&&!Qe.alternate&&!hn())return vn(t),null}else on()*2-Me.renderingStartTime>j0()&&n!==lr&&(t.flags|=Je,lt=!0,su(Me,!1),t.lanes=bg)}if(Me.isBackwards)Qe.sibling=t.child,t.child=Qe;else{var Vn=Me.last;Vn!==null?Vn.sibling=Qe:t.child=Qe,Me.last=Qe}}if(Me.tail!==null){var In=Me.tail;Me.rendering=In,Me.tail=In.sibling,Me.renderingStartTime=on(),In.sibling=null;var Mn=Yr.current;return lt?Mn=Sh(Mn,Yl):Mn=cs(Mn),Sa(t,Mn),In}return vn(t),null}case ct:break;case we:case be:{Gp(t);var ea=t.memoizedState,Ss=ea!==null;if(e!==null){var _u=e.memoizedState,Ei=_u!==null;Ei!==Ss&&!Hn&&(t.flags|=Ya)}return!Ss||(t.mode&Ge)===Ee?vn(t):ur(bi,lr)&&(vn(t),t.subtreeFlags&(Ft|Ye)&&(t.flags|=Ya)),null}case _t:return null;case St:return null}throw new Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function FT(e,t,n){switch(Jm(t),t.tag){case p:{var r=t.type;mi(r)&&zc(t);var i=t.flags;return i&zn?(t.flags=i&~zn|Je,(t.mode&ot)!==Ee&&Kh(t),t):null}case T:{t.stateNode,us(t),qm(t),Ch();var s=t.flags;return(s&zn)!==Se&&(s&Je)===Se?(t.flags=s&~zn|Je,t):null}case w:return Rh(t),null;case j:{fs(t);var f=t.memoizedState;if(f!==null&&f.dehydrated!==null){if(t.alternate===null)throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");as()}var m=t.flags;return m&zn?(t.flags=m&~zn|Je,(t.mode&ot)!==Ee&&Kh(t),t):null}case pe:return fs(t),null;case C:return us(t),null;case M:var v=t.type._context;return mh(v,t),null;case we:case be:return Gp(t),null;case _t:return null;default:return null}}function R0(e,t,n){switch(Jm(t),t.tag){case p:{var r=t.type.childContextTypes;r!=null&&zc(t);break}case T:{t.stateNode,us(t),qm(t),Ch();break}case w:{Rh(t);break}case C:us(t);break;case j:fs(t);break;case pe:fs(t);break;case M:var i=t.type._context;mh(i,t);break;case we:case be:Gp(t);break}}var _0=null;_0=new Set;var Af=!1,gn=!1,VT=typeof WeakSet=="function"?WeakSet:Set,fe=null,gs=null,ys=null;function IT(e){Ad(null,function(){throw e}),Od()}var jT=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,e.mode&ot)try{yi(),t.componentWillUnmount()}finally{gi(e)}else t.componentWillUnmount()};function S0(e,t){try{Ta(Yt,e)}catch(n){ht(e,t,n)}}function Np(e,t,n){try{jT(e,n)}catch(r){ht(e,t,r)}}function HT(e,t,n){try{n.componentDidMount()}catch(r){ht(e,t,r)}}function w0(e,t){try{T0(e)}catch(n){ht(e,t,n)}}function xs(e,t){var n=e.ref;if(n!==null)if(typeof n=="function"){var r;try{if(Lr&&zr&&e.mode&ot)try{yi(),r=n(null)}finally{gi(e)}else r=n(null)}catch(i){ht(e,t,i)}typeof r=="function"&&u("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Pe(e))}else n.current=null}function Of(e,t,n){try{n()}catch(r){ht(e,t,r)}}var C0=!1;function GT(e,t){nw(e.containerInfo),fe=t,XT();var n=C0;return C0=!1,n}function XT(){for(;fe!==null;){var e=fe,t=e.child;(e.subtreeFlags&Ld)!==Se&&t!==null?(t.return=e,fe=t):WT()}}function WT(){for(;fe!==null;){var e=fe;Ct(e);try{$T(e)}catch(n){ht(e,e.return,n)}an();var t=e.sibling;if(t!==null){t.return=e.return,fe=t;return}fe=e.return}}function $T(e){var t=e.alternate,n=e.flags;if((n&$a)!==Se){switch(Ct(e),e.tag){case g:case Y:case K:break;case p:{if(t!==null){var r=t.memoizedProps,i=t.memoizedState,s=e.stateNode;e.type===e.elementType&&!po&&(s.props!==e.memoizedProps&&u("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Pe(e)||"instance"),s.state!==e.memoizedState&&u("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Pe(e)||"instance"));var f=s.getSnapshotBeforeUpdate(e.elementType===e.type?r:Qr(e.type,r),i);{var m=_0;f===void 0&&!m.has(e.type)&&(m.add(e.type),u("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",Pe(e)))}s.__reactInternalSnapshotBeforeUpdate=f}break}case T:{{var v=e.stateNode;Tw(v.containerInfo)}break}case w:case k:case C:case _e:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}an()}}function Zr(e,t,n){var r=t.updateQueue,i=r!==null?r.lastEffect:null;if(i!==null){var s=i.next,f=s;do{if((f.tag&e)===e){var m=f.destroy;f.destroy=void 0,m!==void 0&&((e&pn)!==Zn?l1(t):(e&Yt)!==Zn&&pg(t),(e&hi)!==Zn&&bu(!0),Of(t,n,m),(e&hi)!==Zn&&bu(!1),(e&pn)!==Zn?u1():(e&Yt)!==Zn&&vg())}f=f.next}while(f!==s)}}function Ta(e,t){var n=t.updateQueue,r=n!==null?n.lastEffect:null;if(r!==null){var i=r.next,s=i;do{if((s.tag&e)===e){(e&pn)!==Zn?o1(t):(e&Yt)!==Zn&&c1(t);var f=s.create;(e&hi)!==Zn&&bu(!0),s.destroy=f(),(e&hi)!==Zn&&bu(!1),(e&pn)!==Zn?s1():(e&Yt)!==Zn&&f1();{var m=s.destroy;if(m!==void 0&&typeof m!="function"){var v=void 0;(s.tag&Yt)!==Se?v="useLayoutEffect":(s.tag&hi)!==Se?v="useInsertionEffect":v="useEffect";var R=void 0;m===null?R=" You returned null. If your effect does not require clean up, return undefined (or nothing).":typeof m.then=="function"?R=`

It looks like you wrote `+v+`(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

`+v+`(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching`:R=" You returned: "+m,u("%s must not return anything besides a function, which is used for clean-up.%s",v,R)}}}s=s.next}while(s!==i)}}function YT(e,t){if((t.flags&Ye)!==Se)switch(t.tag){case oe:{var n=t.stateNode.passiveEffectDuration,r=t.memoizedProps,i=r.id,s=r.onPostCommit,f=jx(),m=t.alternate===null?"mount":"update";Ix()&&(m="nested-update"),typeof s=="function"&&s(i,m,n,f);var v=t.return;e:for(;v!==null;){switch(v.tag){case T:var R=v.stateNode;R.passiveEffectDuration+=n;break e;case oe:var S=v.stateNode;S.passiveEffectDuration+=n;break e}v=v.return}break}}}function qT(e,t,n,r){if((n.flags&nl)!==Se)switch(n.tag){case g:case Y:case K:{if(!gn)if(n.mode&ot)try{yi(),Ta(Yt|$t,n)}finally{gi(n)}else Ta(Yt|$t,n);break}case p:{var i=n.stateNode;if(n.flags&Ye&&!gn)if(t===null)if(n.type===n.elementType&&!po&&(i.props!==n.memoizedProps&&u("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Pe(n)||"instance"),i.state!==n.memoizedState&&u("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Pe(n)||"instance")),n.mode&ot)try{yi(),i.componentDidMount()}finally{gi(n)}else i.componentDidMount();else{var s=n.elementType===n.type?t.memoizedProps:Qr(n.type,t.memoizedProps),f=t.memoizedState;if(n.type===n.elementType&&!po&&(i.props!==n.memoizedProps&&u("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Pe(n)||"instance"),i.state!==n.memoizedState&&u("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Pe(n)||"instance")),n.mode&ot)try{yi(),i.componentDidUpdate(s,f,i.__reactInternalSnapshotBeforeUpdate)}finally{gi(n)}else i.componentDidUpdate(s,f,i.__reactInternalSnapshotBeforeUpdate)}var m=n.updateQueue;m!==null&&(n.type===n.elementType&&!po&&(i.props!==n.memoizedProps&&u("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",Pe(n)||"instance"),i.state!==n.memoizedState&&u("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",Pe(n)||"instance")),dx(n,m,i));break}case T:{var v=n.updateQueue;if(v!==null){var R=null;if(n.child!==null)switch(n.child.tag){case w:R=n.child.stateNode;break;case p:R=n.child.stateNode;break}dx(n,v,R)}break}case w:{var S=n.stateNode;if(t===null&&n.flags&Ye){var D=n.type,O=n.memoizedProps;mw(S,D,O)}break}case k:break;case C:break;case oe:{{var z=n.memoizedProps,B=z.onCommit,V=z.onRender,ae=n.stateNode.effectDuration,xe=jx(),ve=t===null?"mount":"update";Ix()&&(ve="nested-update"),typeof V=="function"&&V(n.memoizedProps.id,ve,n.actualDuration,n.treeBaseDuration,n.actualStartTime,xe);{typeof B=="function"&&B(n.memoizedProps.id,ve,ae,xe),WN(n);var We=n.return;e:for(;We!==null;){switch(We.tag){case T:var Ve=We.stateNode;Ve.effectDuration+=ae;break e;case oe:var P=We.stateNode;P.effectDuration+=ae;break e}We=We.return}}}break}case j:{rN(e,n);break}case pe:case _e:case ct:case we:case be:case St:break;default:throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}gn||n.flags&ca&&T0(n)}function QT(e){switch(e.tag){case g:case Y:case K:{if(e.mode&ot)try{yi(),S0(e,e.return)}finally{gi(e)}else S0(e,e.return);break}case p:{var t=e.stateNode;typeof t.componentDidMount=="function"&&HT(e,e.return,t),w0(e,e.return);break}case w:{w0(e,e.return);break}}}function KT(e,t){for(var n=null,r=e;;){if(r.tag===w){if(n===null){n=r;try{var i=r.stateNode;t?_w(i):ww(r.stateNode,r.memoizedProps)}catch(f){ht(e,e.return,f)}}}else if(r.tag===k){if(n===null)try{var s=r.stateNode;t?Sw(s):Cw(s,r.memoizedProps)}catch(f){ht(e,e.return,f)}}else if(!((r.tag===we||r.tag===be)&&r.memoizedState!==null&&r!==e)){if(r.child!==null){r.child.return=r,r=r.child;continue}}if(r===e)return;for(;r.sibling===null;){if(r.return===null||r.return===e)return;n===r&&(n=null),r=r.return}n===r&&(n=null),r.sibling.return=r.return,r=r.sibling}}function T0(e){var t=e.ref;if(t!==null){var n=e.stateNode,r;switch(e.tag){case w:r=n;break;default:r=n}if(typeof t=="function"){var i;if(e.mode&ot)try{yi(),i=t(r)}finally{gi(e)}else i=t(r);typeof i=="function"&&u("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",Pe(e))}else t.hasOwnProperty("current")||u("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",Pe(e)),t.current=r}}function ZT(e){var t=e.alternate;t!==null&&(t.return=null),e.return=null}function N0(e){var t=e.alternate;t!==null&&(e.alternate=null,N0(t));{if(e.child=null,e.deletions=null,e.sibling=null,e.tag===w){var n=e.stateNode;n!==null&&iC(n)}e.stateNode=null,e._debugOwner=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}}function JT(e){for(var t=e.return;t!==null;){if(A0(t))return t;t=t.return}throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}function A0(e){return e.tag===w||e.tag===T||e.tag===C}function O0(e){var t=e;e:for(;;){for(;t.sibling===null;){if(t.return===null||A0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==w&&t.tag!==k&&t.tag!==ye;){if(t.flags&Ft||t.child===null||t.tag===C)continue e;t.child.return=t,t=t.child}if(!(t.flags&Ft))return t.stateNode}}function eN(e){var t=JT(e);switch(t.tag){case w:{var n=t.stateNode;t.flags&el&&(My(n),t.flags&=~el);var r=O0(e);Op(e,r,n);break}case T:case C:{var i=t.stateNode.containerInfo,s=O0(e);Ap(e,s,i);break}default:throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}function Ap(e,t,n){var r=e.tag,i=r===w||r===k;if(i){var s=e.stateNode;t?xw(n,s,t):gw(n,s)}else if(r!==C){var f=e.child;if(f!==null){Ap(f,t,n);for(var m=f.sibling;m!==null;)Ap(m,t,n),m=m.sibling}}}function Op(e,t,n){var r=e.tag,i=r===w||r===k;if(i){var s=e.stateNode;t?yw(n,s,t):vw(n,s)}else if(r!==C){var f=e.child;if(f!==null){Op(f,t,n);for(var m=f.sibling;m!==null;)Op(m,t,n),m=m.sibling}}}var yn=null,Jr=!1;function tN(e,t,n){{var r=t;e:for(;r!==null;){switch(r.tag){case w:{yn=r.stateNode,Jr=!1;break e}case T:{yn=r.stateNode.containerInfo,Jr=!0;break e}case C:{yn=r.stateNode.containerInfo,Jr=!0;break e}}r=r.return}if(yn===null)throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");D0(e,t,n),yn=null,Jr=!1}ZT(n)}function Na(e,t,n){for(var r=n.child;r!==null;)D0(e,t,r),r=r.sibling}function D0(e,t,n){switch(n1(n),n.tag){case w:gn||xs(n,t);case k:{{var r=yn,i=Jr;yn=null,Na(e,t,n),yn=r,Jr=i,yn!==null&&(Jr?Ew(yn,n.stateNode):bw(yn,n.stateNode))}return}case ye:{yn!==null&&(Jr?Rw(yn,n.stateNode):Im(yn,n.stateNode));return}case C:{{var s=yn,f=Jr;yn=n.stateNode.containerInfo,Jr=!0,Na(e,t,n),yn=s,Jr=f}return}case g:case Y:case ne:case K:{if(!gn){var m=n.updateQueue;if(m!==null){var v=m.lastEffect;if(v!==null){var R=v.next,S=R;do{var D=S,O=D.destroy,z=D.tag;O!==void 0&&((z&hi)!==Zn?Of(n,t,O):(z&Yt)!==Zn&&(pg(n),n.mode&ot?(yi(),Of(n,t,O),gi(n)):Of(n,t,O),vg())),S=S.next}while(S!==R)}}}Na(e,t,n);return}case p:{if(!gn){xs(n,t);var B=n.stateNode;typeof B.componentWillUnmount=="function"&&Np(n,t,B)}Na(e,t,n);return}case ct:{Na(e,t,n);return}case we:{if(n.mode&Ge){var V=gn;gn=V||n.memoizedState!==null,Na(e,t,n),gn=V}else Na(e,t,n);break}default:{Na(e,t,n);return}}}function nN(e){e.memoizedState}function rN(e,t){var n=t.memoizedState;if(n===null){var r=t.alternate;if(r!==null){var i=r.memoizedState;if(i!==null){var s=i.dehydrated;s!==null&&Iw(s)}}}}function M0(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new VT),t.forEach(function(r){var i=JN.bind(null,e,r);if(!n.has(r)){if(n.add(r),Hr)if(gs!==null&&ys!==null)xu(ys,gs);else throw Error("Expected finished root and lanes to be set. This is a bug in React.");r.then(i,i)}})}}function iN(e,t,n){gs=n,ys=e,Ct(t),k0(t,e),Ct(t),gs=null,ys=null}function ei(e,t,n){var r=t.deletions;if(r!==null)for(var i=0;i<r.length;i++){var s=r[i];try{tN(e,t,s)}catch(v){ht(s,t,v)}}var f=Fu();if(t.subtreeFlags&zd)for(var m=t.child;m!==null;)Ct(m),k0(m,e),m=m.sibling;Ct(f)}function k0(e,t,n){var r=e.alternate,i=e.flags;switch(e.tag){case g:case Y:case ne:case K:{if(ei(t,e),xi(e),i&Ye){try{Zr(hi|$t,e,e.return),Ta(hi|$t,e)}catch(Te){ht(e,e.return,Te)}if(e.mode&ot){try{yi(),Zr(Yt|$t,e,e.return)}catch(Te){ht(e,e.return,Te)}gi(e)}else try{Zr(Yt|$t,e,e.return)}catch(Te){ht(e,e.return,Te)}}return}case p:{ei(t,e),xi(e),i&ca&&r!==null&&xs(r,r.return);return}case w:{ei(t,e),xi(e),i&ca&&r!==null&&xs(r,r.return);{if(e.flags&el){var s=e.stateNode;try{My(s)}catch(Te){ht(e,e.return,Te)}}if(i&Ye){var f=e.stateNode;if(f!=null){var m=e.memoizedProps,v=r!==null?r.memoizedProps:m,R=e.type,S=e.updateQueue;if(e.updateQueue=null,S!==null)try{hw(f,S,R,v,m,e)}catch(Te){ht(e,e.return,Te)}}}}return}case k:{if(ei(t,e),xi(e),i&Ye){if(e.stateNode===null)throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var D=e.stateNode,O=e.memoizedProps,z=r!==null?r.memoizedProps:O;try{pw(D,z,O)}catch(Te){ht(e,e.return,Te)}}return}case T:{if(ei(t,e),xi(e),i&Ye&&r!==null){var B=r.memoizedState;if(B.isDehydrated)try{Vw(t.containerInfo)}catch(Te){ht(e,e.return,Te)}}return}case C:{ei(t,e),xi(e);return}case j:{ei(t,e),xi(e);var V=e.child;if(V.flags&Ya){var ae=V.stateNode,xe=V.memoizedState,ve=xe!==null;if(ae.isHidden=ve,ve){var We=V.alternate!==null&&V.alternate.memoizedState!==null;We||BN()}}if(i&Ye){try{nN(e)}catch(Te){ht(e,e.return,Te)}M0(e)}return}case we:{var Ve=r!==null&&r.memoizedState!==null;if(e.mode&Ge){var P=gn;gn=P||Ve,ei(t,e),gn=P}else ei(t,e);if(xi(e),i&Ya){var I=e.stateNode,L=e.memoizedState,Z=L!==null,ce=e;if(I.isHidden=Z,Z&&!Ve&&(ce.mode&Ge)!==Ee){fe=ce;for(var se=ce.child;se!==null;)fe=se,oN(se),se=se.sibling}KT(ce,Z)}return}case pe:{ei(t,e),xi(e),i&Ye&&M0(e);return}case ct:return;default:{ei(t,e),xi(e);return}}}function xi(e){var t=e.flags;if(t&Ft){try{eN(e)}catch(n){ht(e,e.return,n)}e.flags&=~Ft}t&Ui&&(e.flags&=~Ui)}function aN(e,t,n){gs=n,ys=t,fe=e,P0(e,t,n),gs=null,ys=null}function P0(e,t,n){for(var r=(e.mode&Ge)!==Ee;fe!==null;){var i=fe,s=i.child;if(i.tag===we&&r){var f=i.memoizedState!==null,m=f||Af;if(m){Dp(e,t,n);continue}else{var v=i.alternate,R=v!==null&&v.memoizedState!==null,S=R||gn,D=Af,O=gn;Af=m,gn=S,gn&&!O&&(fe=i,sN(i));for(var z=s;z!==null;)fe=z,P0(z,t,n),z=z.sibling;fe=i,Af=D,gn=O,Dp(e,t,n);continue}}(i.subtreeFlags&nl)!==Se&&s!==null?(s.return=i,fe=s):Dp(e,t,n)}}function Dp(e,t,n){for(;fe!==null;){var r=fe;if((r.flags&nl)!==Se){var i=r.alternate;Ct(r);try{qT(t,i,r,n)}catch(f){ht(r,r.return,f)}an()}if(r===e){fe=null;return}var s=r.sibling;if(s!==null){s.return=r.return,fe=s;return}fe=r.return}}function oN(e){for(;fe!==null;){var t=fe,n=t.child;switch(t.tag){case g:case Y:case ne:case K:{if(t.mode&ot)try{yi(),Zr(Yt,t,t.return)}finally{gi(t)}else Zr(Yt,t,t.return);break}case p:{xs(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&Np(t,t.return,r);break}case w:{xs(t,t.return);break}case we:{var i=t.memoizedState!==null;if(i){L0(e);continue}break}}n!==null?(n.return=t,fe=n):L0(e)}}function L0(e){for(;fe!==null;){var t=fe;if(t===e){fe=null;return}var n=t.sibling;if(n!==null){n.return=t.return,fe=n;return}fe=t.return}}function sN(e){for(;fe!==null;){var t=fe,n=t.child;if(t.tag===we){var r=t.memoizedState!==null;if(r){z0(e);continue}}n!==null?(n.return=t,fe=n):z0(e)}}function z0(e){for(;fe!==null;){var t=fe;Ct(t);try{QT(t)}catch(r){ht(t,t.return,r)}if(an(),t===e){fe=null;return}var n=t.sibling;if(n!==null){n.return=t.return,fe=n;return}fe=t.return}}function lN(e,t,n,r){fe=t,uN(t,e,n,r)}function uN(e,t,n,r){for(;fe!==null;){var i=fe,s=i.child;(i.subtreeFlags&Fo)!==Se&&s!==null?(s.return=i,fe=s):cN(e,t,n,r)}}function cN(e,t,n,r){for(;fe!==null;){var i=fe;if((i.flags&jr)!==Se){Ct(i);try{fN(t,i,n,r)}catch(f){ht(i,i.return,f)}an()}if(i===e){fe=null;return}var s=i.sibling;if(s!==null){s.return=i.return,fe=s;return}fe=i.return}}function fN(e,t,n,r){switch(t.tag){case g:case Y:case K:{if(t.mode&ot){Qh();try{Ta(pn|$t,t)}finally{qh(t)}}else Ta(pn|$t,t);break}}}function dN(e){fe=e,mN()}function mN(){for(;fe!==null;){var e=fe,t=e.child;if((fe.flags&Wa)!==Se){var n=e.deletions;if(n!==null){for(var r=0;r<n.length;r++){var i=n[r];fe=i,vN(i,e)}{var s=e.alternate;if(s!==null){var f=s.child;if(f!==null){s.child=null;do{var m=f.sibling;f.sibling=null,f=m}while(f!==null)}}}fe=e}}(e.subtreeFlags&Fo)!==Se&&t!==null?(t.return=e,fe=t):hN()}}function hN(){for(;fe!==null;){var e=fe;(e.flags&jr)!==Se&&(Ct(e),pN(e),an());var t=e.sibling;if(t!==null){t.return=e.return,fe=t;return}fe=e.return}}function pN(e){switch(e.tag){case g:case Y:case K:{e.mode&ot?(Qh(),Zr(pn|$t,e,e.return),qh(e)):Zr(pn|$t,e,e.return);break}}}function vN(e,t){for(;fe!==null;){var n=fe;Ct(n),yN(n,t),an();var r=n.child;r!==null?(r.return=n,fe=r):gN(e)}}function gN(e){for(;fe!==null;){var t=fe,n=t.sibling,r=t.return;if(N0(t),t===e){fe=null;return}if(n!==null){n.return=r,fe=n;return}fe=r}}function yN(e,t){switch(e.tag){case g:case Y:case K:{e.mode&ot?(Qh(),Zr(pn,e,t),qh(e)):Zr(pn,e,t);break}}}function xN(e){switch(e.tag){case g:case Y:case K:{try{Ta(Yt|$t,e)}catch(n){ht(e,e.return,n)}break}case p:{var t=e.stateNode;try{t.componentDidMount()}catch(n){ht(e,e.return,n)}break}}}function bN(e){switch(e.tag){case g:case Y:case K:{try{Ta(pn|$t,e)}catch(t){ht(e,e.return,t)}break}}}function EN(e){switch(e.tag){case g:case Y:case K:{try{Zr(Yt|$t,e,e.return)}catch(n){ht(e,e.return,n)}break}case p:{var t=e.stateNode;typeof t.componentWillUnmount=="function"&&Np(e,e.return,t);break}}}function RN(e){switch(e.tag){case g:case Y:case K:try{Zr(pn|$t,e,e.return)}catch(t){ht(e,e.return,t)}}}if(typeof Symbol=="function"&&Symbol.for){var lu=Symbol.for;lu("selector.component"),lu("selector.has_pseudo_class"),lu("selector.role"),lu("selector.test_id"),lu("selector.text")}var _N=[];function SN(){_N.forEach(function(e){return e()})}var wN=a.ReactCurrentActQueue;function CN(e){{var t=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0,n=typeof jest<"u";return n&&t!==!1}}function U0(){{var e=typeof IS_REACT_ACT_ENVIRONMENT<"u"?IS_REACT_ACT_ENVIRONMENT:void 0;return!e&&wN.current!==null&&u("The current testing environment is not configured to support act(...)"),e}}var TN=Math.ceil,Mp=a.ReactCurrentDispatcher,kp=a.ReactCurrentOwner,xn=a.ReactCurrentBatchConfig,ti=a.ReactCurrentActQueue,Kt=0,B0=1,bn=2,Dr=4,Qi=0,uu=1,vo=2,Df=3,cu=4,F0=5,Pp=6,Xe=Kt,Bn=null,Tt=null,Zt=q,bi=q,Lp=ya(q),Jt=Qi,fu=null,Mf=q,du=q,kf=q,mu=null,Jn=null,zp=0,V0=500,I0=1/0,NN=500,Ki=null;function hu(){I0=on()+NN}function j0(){return I0}var Pf=!1,Up=null,bs=null,go=!1,Aa=null,pu=q,Bp=[],Fp=null,AN=50,vu=0,Vp=null,Ip=!1,Lf=!1,ON=50,Es=0,zf=null,gu=gt,Uf=q,H0=!1;function Bf(){return Bn}function Fn(){return(Xe&(bn|Dr))!==Kt?on():(gu!==gt||(gu=on()),gu)}function Oa(e){var t=e.mode;if((t&Ge)===Ee)return Oe;if((Xe&bn)!==Kt&&Zt!==q)return ul(Zt);var n=wC()!==SC;if(n){if(xn.transition!==null){var r=xn.transition;r._updatedFibers||(r._updatedFibers=new Set),r._updatedFibers.add(e)}return Uf===ln&&(Uf=Sg()),Uf}var i=Gr();if(i!==ln)return i;var s=uw();return s}function DN(e){var t=e.mode;return(t&Ge)===Ee?Oe:k1()}function en(e,t,n,r){tA(),H0&&u("useInsertionEffect must not schedule updates."),Ip&&(Lf=!0),cl(e,n,r),(Xe&bn)!==q&&e===Bn?iA(t):(Hr&&Tg(e,t,n),aA(t),e===Bn&&((Xe&bn)===Kt&&(du=ze(du,n)),Jt===cu&&Da(e,Zt)),er(e,r),n===Oe&&Xe===Kt&&(t.mode&Ge)===Ee&&!ti.isBatchingLegacy&&(hu(),Hy()))}function MN(e,t,n){var r=e.current;r.lanes=t,cl(e,t,n),er(e,n)}function kN(e){return(Xe&bn)!==Kt}function er(e,t){var n=e.callbackNode;T1(e,t);var r=ic(e,e===Bn?Zt:q);if(r===q){n!==null&&ab(n),e.callbackNode=null,e.callbackPriority=ln;return}var i=eo(r),s=e.callbackPriority;if(s===i&&!(ti.current!==null&&n!==Yp)){n==null&&s!==Oe&&u("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}n!=null&&ab(n);var f;if(i===Oe)e.tag===xa?(ti.isBatchingLegacy!==null&&(ti.didScheduleLegacyUpdate=!0),sC(W0.bind(null,e))):jy(W0.bind(null,e)),ti.current!==null?ti.current.push(ba):fw(function(){(Xe&(bn|Dr))===Kt&&ba()}),f=null;else{var m;switch(Og(r)){case cr:m=ec;break;case Ii:m=Ud;break;case ji:m=Ka;break;case sc:m=Bd;break;default:m=Ka;break}f=qp(m,G0.bind(null,e))}e.callbackPriority=i,e.callbackNode=f}function G0(e,t){if(KC(),gu=gt,Uf=q,(Xe&(bn|Dr))!==Kt)throw new Error("Should not already be working.");var n=e.callbackNode,r=Ji();if(r&&e.callbackNode!==n)return null;var i=ic(e,e===Bn?Zt:q);if(i===q)return null;var s=!ac(e,i)&&!M1(e,i)&&!t,f=s?HN(e,i):Vf(e,i);if(f!==Qi){if(f===vo){var m=om(e);m!==q&&(i=m,f=jp(e,m))}if(f===uu){var v=fu;throw yo(e,q),Da(e,i),er(e,on()),v}if(f===Pp)Da(e,i);else{var R=!ac(e,i),S=e.current.alternate;if(R&&!LN(S)){if(f=Vf(e,i),f===vo){var D=om(e);D!==q&&(i=D,f=jp(e,D))}if(f===uu){var O=fu;throw yo(e,q),Da(e,i),er(e,on()),O}}e.finishedWork=S,e.finishedLanes=i,PN(e,f,i)}}return er(e,on()),e.callbackNode===n?G0.bind(null,e):null}function jp(e,t){var n=mu;if(lc(e)){var r=yo(e,t);r.flags|=zi,eC(e.containerInfo)}var i=Vf(e,t);if(i!==vo){var s=Jn;Jn=n,s!==null&&X0(s)}return i}function X0(e){Jn===null?Jn=e:Jn.push.apply(Jn,e)}function PN(e,t,n){switch(t){case Qi:case uu:throw new Error("Root did not complete. This is a bug in React.");case vo:{xo(e,Jn,Ki);break}case Df:{if(Da(e,n),Rg(n)&&!ob()){var r=zp+V0-on();if(r>10){var i=ic(e,q);if(i!==q)break;var s=e.suspendedLanes;if(!Xo(s,n)){Fn(),Cg(e,s);break}e.timeoutHandle=Fm(xo.bind(null,e,Jn,Ki),r);break}}xo(e,Jn,Ki);break}case cu:{if(Da(e,n),D1(n))break;if(!ob()){var f=w1(e,n),m=f,v=on()-m,R=eA(v)-v;if(R>10){e.timeoutHandle=Fm(xo.bind(null,e,Jn,Ki),R);break}}xo(e,Jn,Ki);break}case F0:{xo(e,Jn,Ki);break}default:throw new Error("Unknown root exit status.")}}function LN(e){for(var t=e;;){if(t.flags&Zu){var n=t.updateQueue;if(n!==null){var r=n.stores;if(r!==null)for(var i=0;i<r.length;i++){var s=r[i],f=s.getSnapshot,m=s.value;try{if(!dr(f(),m))return!1}catch{return!1}}}}var v=t.child;if(t.subtreeFlags&Zu&&v!==null){v.return=t,t=v;continue}if(t===e)return!0;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}return!0}function Da(e,t){t=oc(t,kf),t=oc(t,du),L1(e,t)}function W0(e){if(ZC(),(Xe&(bn|Dr))!==Kt)throw new Error("Should not already be working.");Ji();var t=ic(e,q);if(!ur(t,Oe))return er(e,on()),null;var n=Vf(e,t);if(e.tag!==xa&&n===vo){var r=om(e);r!==q&&(t=r,n=jp(e,r))}if(n===uu){var i=fu;throw yo(e,q),Da(e,t),er(e,on()),i}if(n===Pp)throw new Error("Root did not complete. This is a bug in React.");var s=e.current.alternate;return e.finishedWork=s,e.finishedLanes=t,xo(e,Jn,Ki),er(e,on()),null}function zN(e,t){t!==q&&(cm(e,ze(t,Oe)),er(e,on()),(Xe&(bn|Dr))===Kt&&(hu(),ba()))}function Hp(e,t){var n=Xe;Xe|=B0;try{return e(t)}finally{Xe=n,Xe===Kt&&!ti.isBatchingLegacy&&(hu(),Hy())}}function UN(e,t,n,r,i){var s=Gr(),f=xn.transition;try{return xn.transition=null,un(cr),e(t,n,r,i)}finally{un(s),xn.transition=f,Xe===Kt&&hu()}}function Zi(e){Aa!==null&&Aa.tag===xa&&(Xe&(bn|Dr))===Kt&&Ji();var t=Xe;Xe|=B0;var n=xn.transition,r=Gr();try{return xn.transition=null,un(cr),e?e():void 0}finally{un(r),xn.transition=n,Xe=t,(Xe&(bn|Dr))===Kt&&ba()}}function $0(){return(Xe&(bn|Dr))!==Kt}function Ff(e,t){An(Lp,bi,e),bi=ze(bi,t)}function Gp(e){bi=Lp.current,Nn(Lp,e)}function yo(e,t){e.finishedWork=null,e.finishedLanes=q;var n=e.timeoutHandle;if(n!==Vm&&(e.timeoutHandle=Vm,cw(n)),Tt!==null)for(var r=Tt.return;r!==null;){var i=r.alternate;R0(i,r),r=r.return}Bn=e;var s=bo(e.current,null);return Tt=s,Zt=bi=t,Jt=Qi,fu=null,Mf=q,du=q,kf=q,mu=null,Jn=null,MC(),$r.discardPendingWarnings(),s}function Y0(e,t){do{var n=Tt;try{if(Yc(),yx(),an(),kp.current=null,n===null||n.return===null){Jt=uu,fu=t,Tt=null;return}if(Lr&&n.mode&ot&&Sf(n,!0),ai)if(Io(),t!==null&&typeof t=="object"&&typeof t.then=="function"){var r=t;m1(n,r,Zt)}else d1(n,t,Zt);sT(e,n.return,n,t,Zt),Z0(n)}catch(i){t=i,Tt===n&&n!==null?(n=n.return,Tt=n):n=Tt;continue}return}while(!0)}function q0(){var e=Mp.current;return Mp.current=xf,e===null?xf:e}function Q0(e){Mp.current=e}function BN(){zp=on()}function yu(e){Mf=ze(e,Mf)}function FN(){Jt===Qi&&(Jt=Df)}function Xp(){(Jt===Qi||Jt===Df||Jt===vo)&&(Jt=cu),Bn!==null&&(sm(Mf)||sm(du))&&Da(Bn,Zt)}function VN(e){Jt!==cu&&(Jt=vo),mu===null?mu=[e]:mu.push(e)}function IN(){return Jt===Qi}function Vf(e,t){var n=Xe;Xe|=bn;var r=q0();if(Bn!==e||Zt!==t){if(Hr){var i=e.memoizedUpdaters;i.size>0&&(xu(e,Zt),i.clear()),Ng(e,t)}Ki=Ag(),yo(e,t)}gg(t);do try{jN();break}catch(s){Y0(e,s)}while(!0);if(Yc(),Xe=n,Q0(r),Tt!==null)throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return yg(),Bn=null,Zt=q,Jt}function jN(){for(;Tt!==null;)K0(Tt)}function HN(e,t){var n=Xe;Xe|=bn;var r=q0();if(Bn!==e||Zt!==t){if(Hr){var i=e.memoizedUpdaters;i.size>0&&(xu(e,Zt),i.clear()),Ng(e,t)}Ki=Ag(),hu(),yo(e,t)}gg(t);do try{GN();break}catch(s){Y0(e,s)}while(!0);return Yc(),Q0(r),Xe=n,Tt!==null?(y1(),Qi):(yg(),Bn=null,Zt=q,Jt)}function GN(){for(;Tt!==null&&!WR();)K0(Tt)}function K0(e){var t=e.alternate;Ct(e);var n;(e.mode&ot)!==Ee?(Yh(e),n=Wp(t,e,bi),Sf(e,!0)):n=Wp(t,e,bi),an(),e.memoizedProps=e.pendingProps,n===null?Z0(e):Tt=n,kp.current=null}function Z0(e){var t=e;do{var n=t.alternate,r=t.return;if((t.flags&tl)===Se){Ct(t);var i=void 0;if((t.mode&ot)===Ee?i=E0(n,t,bi):(Yh(t),i=E0(n,t,bi),Sf(t,!1)),an(),i!==null){Tt=i;return}}else{var s=FT(n,t);if(s!==null){s.flags&=VR,Tt=s;return}if((t.mode&ot)!==Ee){Sf(t,!1);for(var f=t.actualDuration,m=t.child;m!==null;)f+=m.actualDuration,m=m.sibling;t.actualDuration=f}if(r!==null)r.flags|=tl,r.subtreeFlags=Se,r.deletions=null;else{Jt=Pp,Tt=null;return}}var v=t.sibling;if(v!==null){Tt=v;return}t=r,Tt=t}while(t!==null);Jt===Qi&&(Jt=F0)}function xo(e,t,n){var r=Gr(),i=xn.transition;try{xn.transition=null,un(cr),XN(e,t,n,r)}finally{xn.transition=i,un(r)}return null}function XN(e,t,n,r){do Ji();while(Aa!==null);if(nA(),(Xe&(bn|Dr))!==Kt)throw new Error("Should not already be working.");var i=e.finishedWork,s=e.finishedLanes;if(a1(s),i===null)return hg(),null;if(s===q&&u("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=q,i===e.current)throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");e.callbackNode=null,e.callbackPriority=ln;var f=ze(i.lanes,i.childLanes);z1(e,f),e===Bn&&(Bn=null,Tt=null,Zt=q),((i.subtreeFlags&Fo)!==Se||(i.flags&Fo)!==Se)&&(go||(go=!0,Fp=n,qp(Ka,function(){return Ji(),null})));var m=(i.subtreeFlags&(Ld|zd|nl|Fo))!==Se,v=(i.flags&(Ld|zd|nl|Fo))!==Se;if(m||v){var R=xn.transition;xn.transition=null;var S=Gr();un(cr);var D=Xe;Xe|=Dr,kp.current=null,GT(e,i),Hx(),iN(e,i,s),rw(e.containerInfo),e.current=i,h1(s),aN(i,e,s),p1(),$R(),Xe=D,un(S),xn.transition=R}else e.current=i,Hx();var O=go;if(go?(go=!1,Aa=e,pu=s):(Es=0,zf=null),f=e.pendingLanes,f===q&&(bs=null),O||nb(e.current,!1),e1(i.stateNode,r),Hr&&e.memoizedUpdaters.clear(),SN(),er(e,on()),t!==null)for(var z=e.onRecoverableError,B=0;B<t.length;B++){var V=t[B],ae=V.stack,xe=V.digest;z(V.value,{componentStack:ae,digest:xe})}if(Pf){Pf=!1;var ve=Up;throw Up=null,ve}return ur(pu,Oe)&&e.tag!==xa&&Ji(),f=e.pendingLanes,ur(f,Oe)?(QC(),e===Vp?vu++:(vu=0,Vp=e)):vu=0,ba(),hg(),null}function Ji(){if(Aa!==null){var e=Og(pu),t=V1(ji,e),n=xn.transition,r=Gr();try{return xn.transition=null,un(t),$N()}finally{un(r),xn.transition=n}}return!1}function WN(e){Bp.push(e),go||(go=!0,qp(Ka,function(){return Ji(),null}))}function $N(){if(Aa===null)return!1;var e=Fp;Fp=null;var t=Aa,n=pu;if(Aa=null,pu=q,(Xe&(bn|Dr))!==Kt)throw new Error("Cannot flush passive effects while already rendering.");Ip=!0,Lf=!1,v1(n);var r=Xe;Xe|=Dr,dN(t.current),lN(t,t.current,n,e);{var i=Bp;Bp=[];for(var s=0;s<i.length;s++){var f=i[s];YT(t,f)}}g1(),nb(t.current,!0),Xe=r,ba(),Lf?t===zf?Es++:(Es=0,zf=t):Es=0,Ip=!1,Lf=!1,t1(t);{var m=t.current.stateNode;m.effectDuration=0,m.passiveEffectDuration=0}return!0}function J0(e){return bs!==null&&bs.has(e)}function YN(e){bs===null?bs=new Set([e]):bs.add(e)}function qN(e){Pf||(Pf=!0,Up=e)}var QN=qN;function eb(e,t,n){var r=ho(n,t),i=Kx(e,r,Oe),s=Ra(e,i,Oe),f=Fn();s!==null&&(cl(s,Oe,f),er(s,f))}function ht(e,t,n){if(IT(n),bu(!1),e.tag===T){eb(e,e,n);return}var r=null;for(r=t;r!==null;){if(r.tag===T){eb(r,e,n);return}else if(r.tag===p){var i=r.type,s=r.stateNode;if(typeof i.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&!J0(s)){var f=ho(n,e),m=dp(r,f,Oe),v=Ra(r,m,Oe),R=Fn();v!==null&&(cl(v,Oe,R),er(v,R));return}}r=r.return}u(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,n)}function KN(e,t,n){var r=e.pingCache;r!==null&&r.delete(t);var i=Fn();Cg(e,n),oA(e),Bn===e&&Xo(Zt,n)&&(Jt===cu||Jt===Df&&Rg(Zt)&&on()-zp<V0?yo(e,q):kf=ze(kf,n)),er(e,i)}function tb(e,t){t===ln&&(t=DN(e));var n=Fn(),r=Kn(e,t);r!==null&&(cl(r,t,n),er(r,n))}function ZN(e){var t=e.memoizedState,n=ln;t!==null&&(n=t.retryLane),tb(e,n)}function JN(e,t){var n=ln,r;switch(e.tag){case j:r=e.stateNode;var i=e.memoizedState;i!==null&&(n=i.retryLane);break;case pe:r=e.stateNode;break;default:throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}r!==null&&r.delete(t),tb(e,n)}function eA(e){return e<120?120:e<480?480:e<1080?1080:e<1920?1920:e<3e3?3e3:e<4320?4320:TN(e/1960)*1960}function tA(){if(vu>AN)throw vu=0,Vp=null,new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");Es>ON&&(Es=0,zf=null,u("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))}function nA(){$r.flushLegacyContextWarning(),$r.flushPendingUnsafeLifecycleWarnings()}function nb(e,t){Ct(e),If(e,Bi,EN),t&&If(e,Ju,RN),If(e,Bi,xN),t&&If(e,Ju,bN),an()}function If(e,t,n){for(var r=e,i=null;r!==null;){var s=r.subtreeFlags&t;r!==i&&r.child!==null&&s!==Se?r=r.child:((r.flags&t)!==Se&&n(r),r.sibling!==null?r=r.sibling:r=i=r.return)}}var jf=null;function rb(e){{if((Xe&bn)!==Kt||!(e.mode&Ge))return;var t=e.tag;if(t!==_&&t!==T&&t!==p&&t!==g&&t!==Y&&t!==ne&&t!==K)return;var n=Pe(e)||"ReactComponent";if(jf!==null){if(jf.has(n))return;jf.add(n)}else jf=new Set([n]);var r=Cn;try{Ct(e),u("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{r?Ct(e):an()}}}var Wp;{var rA=null;Wp=function(e,t,n){var r=fb(rA,t);try{return v0(e,t,n)}catch(s){if(pC()||s!==null&&typeof s=="object"&&typeof s.then=="function")throw s;if(Yc(),yx(),R0(e,t),fb(t,r),t.mode&ot&&Yh(t),Ad(null,v0,null,e,t,n),zR()){var i=Od();typeof i=="object"&&i!==null&&i._suppressLogging&&typeof s=="object"&&s!==null&&!s._suppressLogging&&(s._suppressLogging=!0)}throw s}}}var ib=!1,$p;$p=new Set;function iA(e){if(Ha&&!$C())switch(e.tag){case g:case Y:case K:{var t=Tt&&Pe(Tt)||"Unknown",n=t;if(!$p.has(n)){$p.add(n);var r=Pe(e)||"Unknown";u("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",r,t,t)}break}case p:{ib||(u("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),ib=!0);break}}}function xu(e,t){if(Hr){var n=e.memoizedUpdaters;n.forEach(function(r){Tg(e,r,t)})}}var Yp={};function qp(e,t){{var n=ti.current;return n!==null?(n.push(t),Yp):mg(e,t)}}function ab(e){if(e!==Yp)return XR(e)}function ob(){return ti.current!==null}function aA(e){{if(e.mode&Ge){if(!U0())return}else if(!CN()||Xe!==Kt||e.tag!==g&&e.tag!==Y&&e.tag!==K)return;if(ti.current===null){var t=Cn;try{Ct(e),u(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`,Pe(e))}finally{t?Ct(e):an()}}}}function oA(e){e.tag!==xa&&U0()&&ti.current===null&&u(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`)}function bu(e){H0=e}var Mr=null,Rs=null,sA=function(e){Mr=e};function _s(e){{if(Mr===null)return e;var t=Mr(e);return t===void 0?e:t.current}}function Qp(e){return _s(e)}function Kp(e){{if(Mr===null)return e;var t=Mr(e);if(t===void 0){if(e!=null&&typeof e.render=="function"){var n=_s(e.render);if(e.render!==n){var r={$$typeof:Ne,render:n};return e.displayName!==void 0&&(r.displayName=e.displayName),r}}return e}return t.current}}function sb(e,t){{if(Mr===null)return!1;var n=e.elementType,r=t.type,i=!1,s=typeof r=="object"&&r!==null?r.$$typeof:null;switch(e.tag){case p:{typeof r=="function"&&(i=!0);break}case g:{(typeof r=="function"||s===Fe)&&(i=!0);break}case Y:{(s===Ne||s===Fe)&&(i=!0);break}case ne:case K:{(s===wt||s===Fe)&&(i=!0);break}default:return!1}if(i){var f=Mr(n);if(f!==void 0&&f===Mr(r))return!0}return!1}}function lb(e){{if(Mr===null||typeof WeakSet!="function")return;Rs===null&&(Rs=new WeakSet),Rs.add(e)}}var lA=function(e,t){{if(Mr===null)return;var n=t.staleFamilies,r=t.updatedFamilies;Ji(),Zi(function(){Zp(e.current,r,n)})}},uA=function(e,t){{if(e.context!==mr)return;Ji(),Zi(function(){Eu(t,e,null,null)})}};function Zp(e,t,n){{var r=e.alternate,i=e.child,s=e.sibling,f=e.tag,m=e.type,v=null;switch(f){case g:case K:case p:v=m;break;case Y:v=m.render;break}if(Mr===null)throw new Error("Expected resolveFamily to be set during hot reload.");var R=!1,S=!1;if(v!==null){var D=Mr(v);D!==void 0&&(n.has(D)?S=!0:t.has(D)&&(f===p?S=!0:R=!0))}if(Rs!==null&&(Rs.has(e)||r!==null&&Rs.has(r))&&(S=!0),S&&(e._debugNeedsRemount=!0),S||R){var O=Kn(e,Oe);O!==null&&en(O,e,Oe,gt)}i!==null&&!S&&Zp(i,t,n),s!==null&&Zp(s,t,n)}}var cA=function(e,t){{var n=new Set,r=new Set(t.map(function(i){return i.current}));return Jp(e.current,r,n),n}};function Jp(e,t,n){{var r=e.child,i=e.sibling,s=e.tag,f=e.type,m=null;switch(s){case g:case K:case p:m=f;break;case Y:m=f.render;break}var v=!1;m!==null&&t.has(m)&&(v=!0),v?fA(e,n):r!==null&&Jp(r,t,n),i!==null&&Jp(i,t,n)}}function fA(e,t){{var n=dA(e,t);if(n)return;for(var r=e;;){switch(r.tag){case w:t.add(r.stateNode);return;case C:t.add(r.stateNode.containerInfo);return;case T:t.add(r.stateNode.containerInfo);return}if(r.return===null)throw new Error("Expected to reach root first.");r=r.return}}}function dA(e,t){for(var n=e,r=!1;;){if(n.tag===w)r=!0,t.add(n.stateNode);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)return r;for(;n.sibling===null;){if(n.return===null||n.return===e)return r;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}var ev;{ev=!1;try{var ub=Object.preventExtensions({})}catch{ev=!0}}function mA(e,t,n,r){this.tag=e,this.key=n,this.elementType=null,this.type=null,this.stateNode=null,this.return=null,this.child=null,this.sibling=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedProps=null,this.updateQueue=null,this.memoizedState=null,this.dependencies=null,this.mode=r,this.flags=Se,this.subtreeFlags=Se,this.deletions=null,this.lanes=q,this.childLanes=q,this.alternate=null,this.actualDuration=Number.NaN,this.actualStartTime=Number.NaN,this.selfBaseDuration=Number.NaN,this.treeBaseDuration=Number.NaN,this.actualDuration=0,this.actualStartTime=-1,this.selfBaseDuration=0,this.treeBaseDuration=0,this._debugSource=null,this._debugOwner=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,!ev&&typeof Object.preventExtensions=="function"&&Object.preventExtensions(this)}var hr=function(e,t,n,r){return new mA(e,t,n,r)};function tv(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function hA(e){return typeof e=="function"&&!tv(e)&&e.defaultProps===void 0}function pA(e){if(typeof e=="function")return tv(e)?p:g;if(e!=null){var t=e.$$typeof;if(t===Ne)return Y;if(t===wt)return ne}return _}function bo(e,t){var n=e.alternate;n===null?(n=hr(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n._debugSource=e._debugSource,n._debugOwner=e._debugOwner,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=Se,n.subtreeFlags=Se,n.deletions=null,n.actualDuration=0,n.actualStartTime=-1),n.flags=e.flags&Fi,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue;var r=e.dependencies;switch(n.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case _:case g:case K:n.type=_s(e.type);break;case p:n.type=Qp(e.type);break;case Y:n.type=Kp(e.type);break}return n}function vA(e,t){e.flags&=Fi|Ft;var n=e.alternate;if(n===null)e.childLanes=q,e.lanes=t,e.child=null,e.subtreeFlags=Se,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,e.selfBaseDuration=0,e.treeBaseDuration=0;else{e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=Se,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type;var r=n.dependencies;e.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration}return e}function gA(e,t,n){var r;return e===Bc?(r=Ge,t===!0&&(r|=Ot,r|=ci)):r=Ee,Hr&&(r|=ot),hr(T,null,null,r)}function nv(e,t,n,r,i,s){var f=_,m=e;if(typeof e=="function")tv(e)?(f=p,m=Qp(m)):m=_s(m);else if(typeof e=="string")f=w;else e:switch(e){case A:return Ma(n.children,i,s,t);case Q:f=$,i|=Ot,(i&Ge)!==Ee&&(i|=ci);break;case ie:return yA(n,i,s,t);case Ue:return xA(n,i,s,t);case Le:return bA(n,i,s,t);case Vr:return cb(n,i,s,t);case Ir:case Rt:case rn:case Va:case wn:default:{if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Re:f=M;break e;case je:f=X;break e;case Ne:f=Y,m=Kp(m);break e;case wt:f=ne;break e;case Fe:f=me,m=null;break e}var v="";{(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(v+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var R=r?Pe(r):null;R&&(v+=`

Check the render method of \``+R+"`.")}throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) "+("but got: "+(e==null?e:typeof e)+"."+v))}}var S=hr(f,n,t,i);return S.elementType=e,S.type=m,S.lanes=s,S._debugOwner=r,S}function rv(e,t,n){var r=null;r=e._owner;var i=e.type,s=e.key,f=e.props,m=nv(i,s,f,r,t,n);return m._debugSource=e._source,m._debugOwner=e._owner,m}function Ma(e,t,n,r){var i=hr(W,e,r,t);return i.lanes=n,i}function yA(e,t,n,r){typeof e.id!="string"&&u('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof e.id);var i=hr(oe,e,r,t|ot);return i.elementType=ie,i.lanes=n,i.stateNode={effectDuration:0,passiveEffectDuration:0},i}function xA(e,t,n,r){var i=hr(j,e,r,t);return i.elementType=Ue,i.lanes=n,i}function bA(e,t,n,r){var i=hr(pe,e,r,t);return i.elementType=Le,i.lanes=n,i}function cb(e,t,n,r){var i=hr(we,e,r,t);i.elementType=Vr,i.lanes=n;var s={isHidden:!1};return i.stateNode=s,i}function iv(e,t,n){var r=hr(k,e,null,t);return r.lanes=n,r}function EA(){var e=hr(w,null,null,Ee);return e.elementType="DELETED",e}function RA(e){var t=hr(ye,null,null,Ee);return t.stateNode=e,t}function av(e,t,n){var r=e.children!==null?e.children:[],i=hr(C,r,e.key,t);return i.lanes=n,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}function fb(e,t){return e===null&&(e=hr(_,null,null,Ee)),e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function _A(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=Vm,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=ln,this.eventTimes=um(q),this.expirationTimes=um(gt),this.pendingLanes=q,this.suspendedLanes=q,this.pingedLanes=q,this.expiredLanes=q,this.mutableReadLanes=q,this.finishedLanes=q,this.entangledLanes=q,this.entanglements=um(q),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null,this.effectDuration=0,this.passiveEffectDuration=0;{this.memoizedUpdaters=new Set;for(var s=this.pendingUpdatersLaneMap=[],f=0;f<Vd;f++)s.push(new Set)}switch(t){case Bc:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case xa:this._debugRootType=n?"hydrate()":"render()";break}}function db(e,t,n,r,i,s,f,m,v,R){var S=new _A(e,t,n,m,v),D=gA(t,s);S.current=D,D.stateNode=S;{var O={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null};D.memoizedState=O}return yh(D),S}var ov="18.3.1";function SA(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null;return Er(r),{$$typeof:Fr,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}var sv,lv;sv=!1,lv={};function mb(e){if(!e)return mr;var t=Uo(e),n=oC(t);if(t.tag===p){var r=t.type;if(mi(r))return Vy(t,r,n)}return n}function wA(e,t){{var n=Uo(e);if(n===void 0){if(typeof e.render=="function")throw new Error("Unable to find node on an unmounted component.");var r=Object.keys(e).join(",");throw new Error("Argument appears to not be a ReactComponent. Keys: "+r)}var i=cg(n);if(i===null)return null;if(i.mode&Ot){var s=Pe(n)||"Component";if(!lv[s]){lv[s]=!0;var f=Cn;try{Ct(i),n.mode&Ot?u("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,s):u("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,s)}finally{f?Ct(f):an()}}}return i.stateNode}}function hb(e,t,n,r,i,s,f,m){var v=!1,R=null;return db(e,t,v,R,n,r,i,s,f)}function pb(e,t,n,r,i,s,f,m,v,R){var S=!0,D=db(n,r,S,e,i,s,f,m,v);D.context=mb(null);var O=D.current,z=Fn(),B=Oa(O),V=Yi(z,B);return V.callback=t??null,Ra(O,V,B),MN(D,B,z),D}function Eu(e,t,n,r){JR(t,e);var i=t.current,s=Fn(),f=Oa(i);x1(f);var m=mb(n);t.context===null?t.context=m:t.pendingContext=m,Ha&&Cn!==null&&!sv&&(sv=!0,u(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,Pe(Cn)||"Unknown"));var v=Yi(s,f);v.payload={element:e},r=r===void 0?null:r,r!==null&&(typeof r!="function"&&u("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",r),v.callback=r);var R=Ra(i,v,f);return R!==null&&(en(R,i,f,s),Jc(R,i,f)),f}function Hf(e){var t=e.current;if(!t.child)return null;switch(t.child.tag){case w:return t.child.stateNode;default:return t.child.stateNode}}function CA(e){switch(e.tag){case T:{var t=e.stateNode;if(lc(t)){var n=N1(t);zN(t,n)}break}case j:{Zi(function(){var i=Kn(e,Oe);if(i!==null){var s=Fn();en(i,e,Oe,s)}});var r=Oe;uv(e,r);break}}}function vb(e,t){var n=e.memoizedState;n!==null&&n.dehydrated!==null&&(n.retryLane=P1(n.retryLane,t))}function uv(e,t){vb(e,t);var n=e.alternate;n&&vb(n,t)}function TA(e){if(e.tag===j){var t=ol,n=Kn(e,t);if(n!==null){var r=Fn();en(n,e,t,r)}uv(e,t)}}function NA(e){if(e.tag===j){var t=Oa(e),n=Kn(e,t);if(n!==null){var r=Fn();en(n,e,t,r)}uv(e,t)}}function gb(e){var t=GR(e);return t===null?null:t.stateNode}var yb=function(e){return null};function AA(e){return yb(e)}var xb=function(e){return!1};function OA(e){return xb(e)}var bb=null,Eb=null,Rb=null,_b=null,Sb=null,wb=null,Cb=null,Tb=null,Nb=null;{var Ab=function(e,t,n){var r=t[n],i=Ze(e)?e.slice():Ie({},e);return n+1===t.length?(Ze(i)?i.splice(r,1):delete i[r],i):(i[r]=Ab(e[r],t,n+1),i)},Ob=function(e,t){return Ab(e,t,0)},Db=function(e,t,n,r){var i=t[r],s=Ze(e)?e.slice():Ie({},e);if(r+1===t.length){var f=n[r];s[f]=s[i],Ze(s)?s.splice(i,1):delete s[i]}else s[i]=Db(e[i],t,n,r+1);return s},Mb=function(e,t,n){if(t.length!==n.length){d("copyWithRename() expects paths of the same length");return}else for(var r=0;r<n.length-1;r++)if(t[r]!==n[r]){d("copyWithRename() expects paths to be the same except for the deepest key");return}return Db(e,t,n,0)},kb=function(e,t,n,r){if(n>=t.length)return r;var i=t[n],s=Ze(e)?e.slice():Ie({},e);return s[i]=kb(e[i],t,n+1,r),s},Pb=function(e,t,n){return kb(e,t,0,n)},cv=function(e,t){for(var n=e.memoizedState;n!==null&&t>0;)n=n.next,t--;return n};bb=function(e,t,n,r){var i=cv(e,t);if(i!==null){var s=Pb(i.memoizedState,n,r);i.memoizedState=s,i.baseState=s,e.memoizedProps=Ie({},e.memoizedProps);var f=Kn(e,Oe);f!==null&&en(f,e,Oe,gt)}},Eb=function(e,t,n){var r=cv(e,t);if(r!==null){var i=Ob(r.memoizedState,n);r.memoizedState=i,r.baseState=i,e.memoizedProps=Ie({},e.memoizedProps);var s=Kn(e,Oe);s!==null&&en(s,e,Oe,gt)}},Rb=function(e,t,n,r){var i=cv(e,t);if(i!==null){var s=Mb(i.memoizedState,n,r);i.memoizedState=s,i.baseState=s,e.memoizedProps=Ie({},e.memoizedProps);var f=Kn(e,Oe);f!==null&&en(f,e,Oe,gt)}},_b=function(e,t,n){e.pendingProps=Pb(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=Kn(e,Oe);r!==null&&en(r,e,Oe,gt)},Sb=function(e,t){e.pendingProps=Ob(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=Kn(e,Oe);n!==null&&en(n,e,Oe,gt)},wb=function(e,t,n){e.pendingProps=Mb(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=Kn(e,Oe);r!==null&&en(r,e,Oe,gt)},Cb=function(e){var t=Kn(e,Oe);t!==null&&en(t,e,Oe,gt)},Tb=function(e){yb=e},Nb=function(e){xb=e}}function DA(e){var t=cg(e);return t===null?null:t.stateNode}function MA(e){return null}function kA(){return Cn}function PA(e){var t=e.findFiberByHostInstance,n=a.ReactCurrentDispatcher;return ZR({bundleType:e.bundleType,version:e.version,rendererPackageName:e.rendererPackageName,rendererConfig:e.rendererConfig,overrideHookState:bb,overrideHookStateDeletePath:Eb,overrideHookStateRenamePath:Rb,overrideProps:_b,overridePropsDeletePath:Sb,overridePropsRenamePath:wb,setErrorHandler:Tb,setSuspenseHandler:Nb,scheduleUpdate:Cb,currentDispatcherRef:n,findHostInstanceByFiber:DA,findFiberByHostInstance:t||MA,findHostInstancesForRefresh:cA,scheduleRefresh:lA,scheduleRoot:uA,setRefreshHandler:sA,getCurrentFiber:kA,reconcilerVersion:ov})}var Lb=typeof reportError=="function"?reportError:function(e){console.error(e)};function fv(e){this._internalRoot=e}Gf.prototype.render=fv.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw new Error("Cannot update an unmounted root.");{typeof arguments[1]=="function"?u("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."):Xf(arguments[1])?u("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."):typeof arguments[1]<"u"&&u("You passed a second argument to root.render(...) but it only accepts one argument.");var n=t.containerInfo;if(n.nodeType!==Bt){var r=gb(t.current);r&&r.parentNode!==n&&u("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.")}}Eu(e,t,null,null)},Gf.prototype.unmount=fv.prototype.unmount=function(){typeof arguments[0]=="function"&&u("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;$0()&&u("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."),Zi(function(){Eu(null,e,null,null)}),Ly(t)}};function LA(e,t){if(!Xf(e))throw new Error("createRoot(...): Target container is not a DOM element.");zb(e);var n=!1,r=!1,i="",s=Lb;t!=null&&(t.hydrate?d("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."):typeof t=="object"&&t!==null&&t.$$typeof===si&&u(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`),t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError),t.transitionCallbacks!==void 0&&t.transitionCallbacks);var f=hb(e,Bc,null,n,r,i,s);Dc(f.current,e);var m=e.nodeType===Bt?e.parentNode:e;return Tl(m),new fv(f)}function Gf(e){this._internalRoot=e}function zA(e){e&&K1(e)}Gf.prototype.unstable_scheduleHydration=zA;function UA(e,t,n){if(!Xf(e))throw new Error("hydrateRoot(...): Target container is not a DOM element.");zb(e),t===void 0&&u("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");var r=n??null,i=n!=null&&n.hydratedSources||null,s=!1,f=!1,m="",v=Lb;n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(m=n.identifierPrefix),n.onRecoverableError!==void 0&&(v=n.onRecoverableError));var R=pb(t,null,e,Bc,r,s,f,m,v);if(Dc(R.current,e),Tl(e),i)for(var S=0;S<i.length;S++){var D=i[S];IC(R,D)}return new Gf(R)}function Xf(e){return!!(e&&(e.nodeType===qn||e.nodeType===Li||e.nodeType===yd||!zt))}function Ru(e){return!!(e&&(e.nodeType===qn||e.nodeType===Li||e.nodeType===yd||e.nodeType===Bt&&e.nodeValue===" react-mount-point-unstable "))}function zb(e){e.nodeType===qn&&e.tagName&&e.tagName.toUpperCase()==="BODY"&&u("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."),Bl(e)&&(e._reactRootContainer?u("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."):u("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."))}var BA=a.ReactCurrentOwner,Ub;Ub=function(e){if(e._reactRootContainer&&e.nodeType!==Bt){var t=gb(e._reactRootContainer.current);t&&t.parentNode!==e&&u("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.")}var n=!!e._reactRootContainer,r=dv(e),i=!!(r&&ga(r));i&&!n&&u("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."),e.nodeType===qn&&e.tagName&&e.tagName.toUpperCase()==="BODY"&&u("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.")};function dv(e){return e?e.nodeType===Li?e.documentElement:e.firstChild:null}function Bb(){}function FA(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var O=Hf(f);s.call(O)}}var f=pb(t,r,e,xa,null,!1,!1,"",Bb);e._reactRootContainer=f,Dc(f.current,e);var m=e.nodeType===Bt?e.parentNode:e;return Tl(m),Zi(),f}else{for(var v;v=e.lastChild;)e.removeChild(v);if(typeof r=="function"){var R=r;r=function(){var O=Hf(S);R.call(O)}}var S=hb(e,xa,null,!1,!1,"",Bb);e._reactRootContainer=S,Dc(S.current,e);var D=e.nodeType===Bt?e.parentNode:e;return Tl(D),Zi(function(){Eu(t,S,n,r)}),S}}function VA(e,t){e!==null&&typeof e!="function"&&u("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e)}function Wf(e,t,n,r,i){Ub(n),VA(i===void 0?null:i,"render");var s=n._reactRootContainer,f;if(!s)f=FA(n,t,e,i,r);else{if(f=s,typeof i=="function"){var m=i;i=function(){var v=Hf(f);m.call(v)}}Eu(t,f,e,i)}return Hf(f)}var Fb=!1;function IA(e){{Fb||(Fb=!0,u("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));var t=BA.current;if(t!==null&&t.stateNode!==null){var n=t.stateNode._warnedAboutRefsInRender;n||u("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",qe(t.type)||"A component"),t.stateNode._warnedAboutRefsInRender=!0}}return e==null?null:e.nodeType===qn?e:wA(e,"findDOMNode")}function jA(e,t,n){if(u("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!Ru(t))throw new Error("Target container is not a DOM element.");{var r=Bl(t)&&t._reactRootContainer===void 0;r&&u("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?")}return Wf(null,e,t,!0,n)}function HA(e,t,n){if(u("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!Ru(t))throw new Error("Target container is not a DOM element.");{var r=Bl(t)&&t._reactRootContainer===void 0;r&&u("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?")}return Wf(null,e,t,!1,n)}function GA(e,t,n,r){if(u("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!Ru(n))throw new Error("Target container is not a DOM element.");if(e==null||!UR(e))throw new Error("parentComponent must be a valid React Component");return Wf(e,t,n,!1,r)}var Vb=!1;function XA(e){if(Vb||(Vb=!0,u("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")),!Ru(e))throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");{var t=Bl(e)&&e._reactRootContainer===void 0;t&&u("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?")}if(e._reactRootContainer){{var n=dv(e),r=n&&!ga(n);r&&u("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.")}return Zi(function(){Wf(null,null,e,!1,function(){e._reactRootContainer=null,Ly(e)})}),!0}else{{var i=dv(e),s=!!(i&&ga(i)),f=e.nodeType===qn&&Ru(e.parentNode)&&!!e.parentNode._reactRootContainer;s&&u("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s",f?"You may have accidentally passed in a React root node instead of its container.":"Instead, have the parent component update its state and rerender in order to remove this component.")}return!1}}I1(CA),H1(TA),G1(NA),X1(Gr),W1(B1),(typeof Map!="function"||Map.prototype==null||typeof Map.prototype.forEach!="function"||typeof Set!="function"||Set.prototype==null||typeof Set.prototype.clear!="function"||typeof Set.prototype.forEach!="function")&&u("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),CR($S),AR(Hp,UN,Zi);function WA(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null;if(!Xf(t))throw new Error("Target container is not a DOM element.");return SA(e,t,null,n)}function $A(e,t,n,r){return GA(e,t,n,r)}var mv={usingClientEntryPoint:!1,Events:[ga,es,Mc,Zv,Jv,Hp]};function YA(e,t){return mv.usingClientEntryPoint||u('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),LA(e,t)}function qA(e,t,n){return mv.usingClientEntryPoint||u('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),UA(e,t,n)}function QA(e){return $0()&&u("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."),Zi(e)}var KA=PA({findFiberByHostInstance:io,bundleType:1,version:ov,rendererPackageName:"react-dom"});if(!KA&&Ut&&window.top===window.self&&(navigator.userAgent.indexOf("Chrome")>-1&&navigator.userAgent.indexOf("Edge")===-1||navigator.userAgent.indexOf("Firefox")>-1)){var Ib=window.location.protocol;/^(https?|file):$/.test(Ib)&&console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools"+(Ib==="file:"?`
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq`:""),"font-weight:bold")}gr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mv,gr.createPortal=WA,gr.createRoot=YA,gr.findDOMNode=IA,gr.flushSync=QA,gr.hydrate=jA,gr.hydrateRoot=qA,gr.render=HA,gr.unmountComponentAtNode=XA,gr.unstable_batchedUpdates=Hp,gr.unstable_renderSubtreeIntoContainer=$A,gr.version=ov,typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop=="function"&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error)})();fE.exports=gr;var aO=fE.exports,hv=aO;{var $f=hv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;Rv.createRoot=function(h,l){$f.usingClientEntryPoint=!0;try{return hv.createRoot(h,l)}finally{$f.usingClientEntryPoint=!1}},Rv.hydrateRoot=function(h,l,a){$f.usingClientEntryPoint=!0;try{return hv.hydrateRoot(h,l,a)}finally{$f.usingClientEntryPoint=!1}}}const oO="_arrow_1rhr5_45",sO={arrow:oO},Nv=({open:h})=>E.jsxDEV("div",{className:sO.arrow,"data-open":h,children:E.jsxDEV("svg",{width:"10",height:"10",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("g",{clipPath:"url(#clip0_57_2)",children:E.jsxDEV("path",{d:"M18 10L3 18.6603L3 1.33974L18 10Z",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:8,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),E.jsxDEV("defs",{children:E.jsxDEV("clipPath",{id:"clip0_57_2",children:E.jsxDEV("rect",{width:"20",height:"20",fill:"white"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:12,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:11,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:10,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/ArrowIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),lO="_block_1l63f_45",uO="_head_1l63f_58",cO="_head_icon_1l63f_63",fO="_head_text_1l63f_72",dO="_content_1l63f_79",Su={block:lO,head:uO,head_icon:cO,head_text:fO,content:dO},Ts=h=>{const[l,a]=Mu.useState(!h.defaultClose),o=G.useCallback(()=>{h.accordion===!0&&a(!l)},[l,h.accordion]),c=h.bg&&typeof h.bg=="string"&&h.bg||void 0;return E.jsxDEV("div",{className:Su.block,"data-bg":h.bg!==void 0,"data-nomargin":h.noMargin,"data-no_indent":h.noIndent,style:{backgroundColor:c},children:[E.jsxDEV("div",{className:Su.head,"data-accordion":h.accordion,"data-open":l,children:[h.accordion&&E.jsxDEV("div",{className:Su.head_icon,onClick:o,children:E.jsxDEV(Nv,{open:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:33,columnNumber:75},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:33,columnNumber:24},void 0),h.label&&E.jsxDEV("span",{className:Su.head_text,children:h.label},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:34,columnNumber:20},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:32,columnNumber:3},void 0),l&&E.jsxDEV("div",{className:Su.content,"data-open":l,"data-no_indent":h.noIndent,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:36,columnNumber:13},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Block/index.tsx",lineNumber:31,columnNumber:9},void 0)},mO="_button_fci8n_45",hO={button:mO},Ns=h=>E.jsxDEV("button",{className:hO.button,onClick:l=>{h.onClick&&h.onClick(l),l.preventDefault()},type:h.type||"button",children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Button/index.tsx",lineNumber:11,columnNumber:9},void 0),pO=G.createContext(null),pv={didCatch:!1,error:null};class vO extends G.Component{constructor(l){super(l),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=pv}static getDerivedStateFromError(l){return{didCatch:!0,error:l}}resetErrorBoundary(){const{error:l}=this.state;if(l!==null){for(var a,o,c=arguments.length,d=new Array(c),u=0;u<c;u++)d[u]=arguments[u];(a=(o=this.props).onReset)===null||a===void 0||a.call(o,{args:d,reason:"imperative-api"}),this.setState(pv)}}componentDidCatch(l,a){var o,c;(o=(c=this.props).onError)===null||o===void 0||o.call(c,l,a)}componentDidUpdate(l,a){const{didCatch:o}=this.state,{resetKeys:c}=this.props;if(o&&a.error!==null&&gO(l.resetKeys,c)){var d,u;(d=(u=this.props).onReset)===null||d===void 0||d.call(u,{next:c,prev:l.resetKeys,reason:"keys"}),this.setState(pv)}}render(){const{children:l,fallbackRender:a,FallbackComponent:o,fallback:c}=this.props,{didCatch:d,error:u}=this.state;let x=l;if(d){const g={error:u,resetErrorBoundary:this.resetErrorBoundary};if(typeof a=="function")x=a(g);else if(o)x=G.createElement(o,g);else if(c!==void 0)x=c;else throw console.error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop"),u}return G.createElement(pO.Provider,{value:{didCatch:d,error:u,resetErrorBoundary:this.resetErrorBoundary}},x)}}function gO(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return h.length!==l.length||h.some((a,o)=>!Object.is(a,l[o]))}const vv=900,yO=()=>{const[h,l]=G.useState(!1);return G.useEffect(()=>{let a=null;const o=()=>{const c=window.innerWidth;(a===null||(c-vv)*(a-vv)<=0)&&l(c<=vv),a=c};return o(),window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o)}},[]),{isPC:!h,isSP:h}},xO="_mouseMenu_11xi2_1",bO="_hide_11xi2_10",EO="_menuItem_11xi2_19",RO="_menuItem_inner_11xi2_23",_O="_menuItem_inner_inner_11xi2_26",wu={mouseMenu:xO,hide:bO,menuItem:EO,menuItem_inner:RO,menuItem_inner_inner:_O},hE=G.createContext(void 0),pE=G.createContext(null),Av=()=>{const h=G.useContext(pE);if(h===null)throw new Error("useMouseMenu must be used within a MouseMenuProvider");return h},jb=()=>{const{itemList:h,containerRef:l,closeAll:a}=Av();return E.jsxDEV("div",{className:wu.mouseMenu,ref:l,children:[h&&h.length>0&&E.jsxDEV("div",{className:wu.hide,onClick:()=>{a&&a()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:14,columnNumber:40},void 0),h&&h.map((o,c)=>{const d=o.pos;return E.jsxDEV(hE.Provider,{value:o,children:E.jsxDEV("div",{className:wu.menuItem,style:{left:0,top:0,transform:`translate(${d.x}px, ${d.y}px)`},children:E.jsxDEV("div",{className:wu.menuItem_inner,children:E.jsxDEV("div",{className:wu.menuItem_inner_inner,"data-direction":o.direction,children:o.elm},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:29,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:28,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:27,columnNumber:7},void 0)},o.id,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:26,columnNumber:13},void 0)})]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/MouseMenu/index.tsx",lineNumber:13,columnNumber:3},void 0)};let SO=0;const wO=()=>{const h=G.useRef(null),l=G.useRef({x:0,y:0}),a=G.useCallback(p=>{l.current.x=p.clientX,l.current.y=p.clientY},[]);G.useEffect(()=>(window.addEventListener("pointermove",a),()=>{window.removeEventListener("pointermove",a)}),[a]);const[o,c]=G.useState([]),d=G.useRef(o);d.current=o;const u=G.useCallback(p=>{d.current=d.current.filter(_=>_.id!==p),c(d.current)},[]),x=G.useCallback(()=>{c([])},[]),g=G.useCallback(p=>{const _=SO++,T={x:l.current.x,y:l.current.y},C=(T.x<window.innerWidth/2?"right":"left")+"-"+(T.y<window.innerHeight/2?"bottom":"top"),w={id:_,elm:p,pos:T,direction:C,close:()=>u(_)};return c([...d.current,w]),w},[u]);return{itemList:o,pushContent:g,closeAll:x,containerRef:h}},CO="_panel_vqys8_45",TO="_panel_inner_vqys8_51",NO="_content_vqys8_59",gv={panel:CO,panel_inner:TO,content:NO},yr=h=>E.jsxDEV("div",{className:gv.panel,style:{backgroundColor:h.bgColor},children:E.jsxDEV("div",{className:gv.panel_inner,children:E.jsxDEV("div",{className:gv.content,style:{padding:h.noPadding?"0 0":void 0},children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:17,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:16,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panel/index.tsx",lineNumber:15,columnNumber:9},void 0),AO="_panelContainer_xa08o_45",OO="_header_xa08o_54",DO="_header_item_xa08o_60",MO="_content_xa08o_75",Yf={panelContainer:AO,header:OO,header_item:DO,content:MO},ka=h=>{const[l,a]=G.useState(0);let o=h.children||[];return o=Array.isArray(o)?o:[o],E.jsxDEV("div",{className:Yf.panelContainer,children:[E.jsxDEV("div",{className:Yf.header,children:o.map((c,d)=>E.jsxDEV("div",{className:Yf.header_item,onClick:()=>a(d),"data-active":d==l,children:E.jsxDEV("p",{children:c.props.title},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:25,columnNumber:6},void 0)},d,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:24,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:21,columnNumber:3},void 0),E.jsxDEV("div",{className:Yf.content,children:o[l]},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:32,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/PanelContainer/index.tsx",lineNumber:20,columnNumber:9},void 0)},vE=G.createContext(null),za=()=>{const h=G.useContext(vE);if(h===null)throw new Error("useEditor must be used within a EditorProvider");return h},Ov=(h,l)=>{const[a,o]=G.useState(()=>h?h.serialize():{}),c=l?[...l]:[],d=G.useMemo(()=>c,c);return G.useEffect(()=>{if(h===void 0)return;o(h.serialize());const u=x=>{let g=d.length==0;for(let p=0;p<d.length;p++)if(x.find(_=>_==d[p])){g=!0;break}g&&o(h.serialize())};return h.on("fields/update",u),()=>{h.off("fields/update",u)}},[h,d]),{fields:a}},Lt=(h,l)=>{const a=d=>{h==null||h.setField(l,d)},{fields:o}=Ov(h,[l]);return[o&&o[l],a]},gE=G.createContext(void 0),kO=h=>(Ov(h.target),{target:h.target}),PO=()=>{const h=G.useContext(gE);if(!h)throw new Error("SerializeFieldViewContext is not defined");return h},LO="_container_1xcsu_45",zO="_label_1xcsu_55",UO="_item_1xcsu_62",yv={container:LO,label:zO,item:UO},ri=h=>E.jsxDEV("div",{className:yv.container,"data-vertical":h.vertical,children:[E.jsxDEV("div",{className:yv.label,style:{textAlign:h.labelAlign||"left"},"data-vertical":h.vertical,children:h.title},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:12,columnNumber:4},void 0),E.jsxDEV("div",{className:yv.item,"data-vertical":h.vertical,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:13,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Label/index.tsx",lineNumber:11,columnNumber:3},void 0),BO=()=>E.jsxDEV("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("rect",{x:"2",y:"10.8486",width:"2.61726",height:"7.84447",transform:"rotate(-44.9331 2 10.8486)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:5,columnNumber:3},void 0),E.jsxDEV("rect",{x:"9.38757",y:"14.5518",width:"2.57272",height:"12.3494",transform:"rotate(-135 9.38757 14.5518)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:6,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/Check/index.tsx",lineNumber:4,columnNumber:9},void 0),FO="_inputBoolean_1xgaw_45",VO="_input_1xgaw_45",IO="_check_1xgaw_60",xv={inputBoolean:FO,input:VO,check:IO},yE=({onChange:h,...l})=>E.jsxDEV("div",{className:xv.inputBoolean,onClick:a=>{a.stopPropagation()},children:E.jsxDEV("label",{children:[E.jsxDEV("input",{className:xv.input,type:"checkbox",checked:l.checked,disabled:l.disabled,readOnly:l.readOnly,onChange:a=>{l.readOnly||h&&h(a.target.checked)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:22,columnNumber:4},void 0),E.jsxDEV("div",{className:xv.check,"data-read_only":l.readOnly,children:l.checked&&E.jsxDEV(BO,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:36,columnNumber:23},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:35,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:21,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputCheckBox/index.tsx",lineNumber:16,columnNumber:9},void 0),jO="_input_1rofd_45",Hb={input:jO},Dv=h=>{const l=G.useRef(!1),a=G.useRef();a.current=h.onChange;const o=G.useRef();o.current=h.value;const c=G.useCallback(x=>{const g=o.current;if(l.current===!1)return;const p=x.movementX;if(typeof g=="number"){const _=p*.05*(h.step||1);a.current&&a.current(g+_),x.stopPropagation()}x.preventDefault()},[h.step]),d=G.useCallback(x=>{l.current=!0;const g=()=>{l.current=!1,window.removeEventListener("pointerup",g),window.removeEventListener("pointermove",c)};window.addEventListener("pointerup",g),window.addEventListener("pointermove",c)},[c]),u=Number((h.value||0).toFixed(h.precision??3));return E.jsxDEV("div",{className:Hb.inputNumber,children:E.jsxDEV("input",{className:Hb.input,type:"number",value:u,disabled:h.disabled,readOnly:h.readOnly,"data-lo":h.readOnly,step:h.step||1,min:h.min,max:h.max,onChange:x=>{h.onChange(Number(x.target.value))},onPointerDown:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputNumber/index.tsx",lineNumber:72,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputNumber/index.tsx",lineNumber:71,columnNumber:9},void 0)},HO="_inputSelect_d7lo3_45",GO="_input_d7lo3_45",qf={inputSelect:HO,input:GO},XO=({onChange:h,value:l,...a})=>{if(a.readOnly)return E.jsxDEV("div",{className:qf.inputSelect,children:E.jsxDEV("input",{className:qf.input,value:l,readOnly:!0},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:20,columnNumber:10},void 0);let o=a.selectList;return typeof o=="function"&&(o=o()),E.jsxDEV("div",{className:qf.inputSelect,children:E.jsxDEV("select",{className:qf.input,onChange:c=>{h&&h(c.target.value)},value:l,children:o.map((c,d)=>{let u="",x="";return typeof c=="string"?(u=c,x=c):(u=c.label,x=c.value),E.jsxDEV("option",{value:x,children:u},d,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:61,columnNumber:12},void 0)})},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputSelect/index.tsx",lineNumber:34,columnNumber:9},void 0)},WO="_input_ndjbn_45",Gb={input:WO},_v=({onChange:h,value:l,...a})=>{const[o,c]=G.useState(l),d=G.useCallback(()=>{h&&h(o)},[o,h]);return G.useEffect(()=>{c(l)},[l]),E.jsxDEV("div",{className:Gb.container,children:E.jsxDEV("input",{className:Gb.input,type:"text",value:o,placeholder:a.readOnly?"-":"",disabled:a.disabled,readOnly:a.readOnly,"data-lo":a.readOnly,onChange:u=>{c(u.target.value)},onBlur:u=>{d()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputText/index.tsx",lineNumber:35,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Input/InputText/index.tsx",lineNumber:34,columnNumber:9},void 0)},$O={},YO=["x","y","z","w"],xE=({onChange:h,disabled:l,...a})=>{const o=G.useRef();o.current=a.value;const c=G.useCallback((u,x)=>{if(h&&o.current){const g={};for(let p=0;p<o.current.length;p++)g[p]=o.current[p];g[u]=x,h(g)}},[h]),d=[];for(let u=0;u<a.value.length;u++)d.push(E.jsxDEV(ri,{title:YO[u],labelAlign:"right",children:E.jsxDEV(Dv,{disabled:l,value:a.value[u],step:a.step,onChange:x=>{c(u,x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:49,columnNumber:5},void 0)},u,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:48,columnNumber:4},void 0));return E.jsxDEV("div",{className:$O.vector,children:d.map(u=>u)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Vector/index.tsx",lineNumber:59,columnNumber:9},void 0)},Si=h=>{let l=null;const a=h.onChange,o=h.value,c=h.format,d=u=>{a&&a(u)};if(o==null)return null;if(c&&(c.type=="vector"&&Array.isArray(o)?l=E.jsxDEV(xE,{value:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:48,columnNumber:15},void 0):c.type=="select"&&(l=E.jsxDEV(XO,{value:o,onChange:d,selectList:c.list},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:52,columnNumber:15},void 0))),!l)if(typeof o=="number")l=E.jsxDEV(Dv,{...h,value:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:62,columnNumber:15},void 0);else if(typeof o=="string")l=E.jsxDEV(_v,{...h,value:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:66,columnNumber:15},void 0);else if(typeof o=="boolean")l=E.jsxDEV(yE,{...h,checked:o,onChange:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:70,columnNumber:15},void 0);else if(typeof o=="function"){const u=h.label||"Run";l=E.jsxDEV(Ns,{onClick:()=>{o()},children:u},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:76,columnNumber:15},void 0)}else l=E.jsxDEV(_v,{...h,value:JSON.stringify(o),onChange:()=>{}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Value/index.tsx",lineNumber:86,columnNumber:15},void 0);return l},qO="_container_dlq1w_1",QO={container:qO},KO=h=>{const l=[],a=h.value,o=h.format,c=(o==null?void 0:o.type)=="array"?o.labels:void 0;if(a===void 0)return null;for(let d=0;d<a.length;d++){const u=a[d];let x=d.toString();c&&(x+="/ "+c(u,d)),l.push(E.jsxDEV(ri,{title:x,children:E.jsxDEV(Si,{...h,value:u,onChange:g=>{const p=a.concat();p[d]=g,h.onChange&&h.onChange(p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:32,columnNumber:5},void 0)},d,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:31,columnNumber:4},void 0))}return E.jsxDEV("div",{className:QO.container,children:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/ValueArray/index.tsx",lineNumber:50,columnNumber:9},void 0)},ZO=h=>{const{target:l}=PO(),a=h.field.value,o=typeof a,c=h.field.opt,d=c==null?void 0:c.format,u=(c==null?void 0:c.label)||h.path.split("/").pop(),x=d&&d.type=="vector";let g=null;if(Array.isArray(a))(d==null?void 0:d.type)=="vector"?g=E.jsxDEV(xE,{value:a,...c,onChange:p=>{l.setField(h.path,p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:26,columnNumber:15},void 0):g=E.jsxDEV(KO,{value:a,...c,onChange:p=>{l.setField(h.path,p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:35,columnNumber:15},void 0);else if(g=E.jsxDEV(Si,{value:a,...c,onChange:p=>{l.setField(h.path,p)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:45,columnNumber:14},void 0),o==="function")return g;return E.jsxDEV(ri,{title:u,vertical:x,children:g},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewValue/index.tsx",lineNumber:59,columnNumber:9},void 0)},JO="_container_3297g_1",eD="_field_3297g_5",tD="_block_3297g_9",Xb={container:JO,field:eD,block:tD},bE=h=>{const l=[],a=Object.keys(h.fields.childs);for(let o=0;o<a.length;o++){const c=a[o],d=h.fields.childs[c],{opt:u}=d;let x=!1;if(u&&(typeof u.hidden=="function"?x=u.hidden(d.type=="value"?d.value:null):x=u.hidden||!1),x)continue;const g="field"+c,p=(h.basePath?h.basePath+"/":"")+c;let _=null;d.type==="value"?_=E.jsxDEV(ZO,{path:p,field:d},g,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:46,columnNumber:10},void 0):_=E.jsxDEV("div",{className:Xb.block,children:E.jsxDEV(Ts,{accordion:!0,label:c,children:E.jsxDEV(bE,{fields:d,basePath:p},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:52,columnNumber:6},void 0)},g,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:51,columnNumber:5},void 0)},g,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:50,columnNumber:10},void 0),_&&l.push(_)}return E.jsxDEV("div",{className:Xb.container,children:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/SerializeFieldViewDir/index.tsx",lineNumber:66,columnNumber:9},void 0)},EE=h=>{const l=kO(h),a=l.target.serializeToDirectory();return E.jsxDEV(gE.Provider,{value:l,children:E.jsxDEV(bE,{fields:a},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/index.tsx",lineNumber:18,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/SerializeFieldView/index.tsx",lineNumber:17,columnNumber:9},void 0)};class RE{constructor(l){b(this,"gl");b(this,"extDisJointTimerQuery");this.gl=l,this.gl.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,!0),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("EXT_color_buffer_half_float"),this.gl.getExtension("OES_texture_float_linear"),this.extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")}}class nD{constructor(l,a){b(this,"gl");b(this,"vao");b(this,"program");b(this,"indexBuffer");b(this,"attributes");b(this,"vertCount");b(this,"indexCount");b(this,"instanceCount");b(this,"attribPointerDiect");b(this,"attribTypeDict");this.gl=l,this.program=a,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([["Float32Array",this.gl.vertexAttribPointer.bind(this.gl)],["Int32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int8Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt8Array",this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([["Float32Array",this.gl.FLOAT],["Int32Array",this.gl.INT],["Int16Array",this.gl.SHORT],["Int8Array",this.gl.BYTE],["UInt32Array",this.gl.UNSIGNED_INT],["UInt16Array",this.gl.UNSIGNED_SHORT],["UInt8Array",this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((l,a)=>{l.instanceDivisor==null&&a!="index"&&(this.vertCount=Math.max(this.vertCount,l.count)),l.instanceDivisor!==void 0&&l.instanceDivisor>0&&(this.instanceCount==0?this.instanceCount=l.count:this.instanceCount=Math.min(this.instanceCount,l.count))})}setAttribute(l,a,o,c){if(a.array===null)return;const d={buffer:a,size:o,count:a.array?a.array.length/o:0,location:void 0,...c};this.attributes.set(l,d),this.gl.bindVertexArray(this.vao),d.location=this.gl.getAttribLocation(this.program,l);const u=this.attribPointerDiect.get(a.array.constructor.name),x=this.attribTypeDict.get(a.array.constructor.name);if(d.location>-1)if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,d.buffer.buffer),d.size==16){for(let g=0;g<4;g++)this.gl.enableVertexAttribArray(d.location+g);for(let g=0;g<4;g++)this.gl.vertexAttribPointer(d.location+g,4,x,!1,64,16*g);if(d.instanceDivisor!==void 0)for(let g=0;g<4;g++)this.gl.vertexAttribDivisor(d.location+g,d.instanceDivisor)}else this.gl.enableVertexAttribArray(d.location),u(d.location,d.size,x,!1,0,0),d.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(d.location,d.instanceDivisor);return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(l){return this.attributes.delete(l),this.calcVertCount(),this}setIndex(l){this.indexBuffer=l,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(l){this.gl.bindVertexArray(this.vao),l&&l(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(l=>{l.buffer.dispose()})}}class _E{constructor(l){b(this,"gl");b(this,"program");b(this,"vao");b(this,"uniforms");this.gl=l,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(l,a,o){if(this.program===null){console.warn("program is null.");return}const c=this.createShader(l,this.gl.VERTEX_SHADER),d=this.createShader(a,this.gl.FRAGMENT_SHADER);if(!(!c||!d))return this.gl.attachShader(this.program,c),this.gl.attachShader(this.program,d),o&&o.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,o.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)||console.error("program link error:",this.gl.getProgramInfoLog(this.program)),this}createShader(l,a){const o=this.gl.createShader(a);if(!o)return null;if(this.gl.shaderSource(o,l),this.gl.compileShader(o),this.gl.getShaderParameter(o,this.gl.COMPILE_STATUS))return o;{const c=this.gl.getShaderInfoLog(o);if(c){const d=l.split(`
`),u=c.matchAll(/ERROR: 0:(\d+)/g);Array.from(u).forEach((x,g)=>{const p=Number(x[1]),_=Math.max(0,p-5),T=Math.min(d.length,p+2);let C=c.split(`
`)[g]+`
`;d.forEach((w,k)=>{_<=k&&k<=T&&(C+=`${k+1}: ${w}
`)}),console.error(C)})}}}setUniform(l,a,o){const c=this.uniforms.get(l);if(c)if(c.type=a,c.value=o,c.cache){for(let d=0;d<o.length;d++)if(c.cache[d]!==o[d]){c.needsUpdate=!0;break}}else c.needsUpdate=!0;else this.uniforms.set(l,{value:o,type:a,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(l){this.program&&this.uniforms.forEach((a,o)=>{(a.location===null||l)&&(a.location=this.gl.getUniformLocation(this.program,o))})}uploadUniforms(){this.uniforms.forEach(l=>{l.needsUpdate&&l.location!==null&&(/Matrix[2|3|4]fv/.test(l.type)?this.gl["uniform"+l.type](l.location,!1,l.value):/[1|2|3|4][f|i]$/.test(l.type)?this.gl["uniform"+l.type](l.location,...l.value):this.gl["uniform"+l.type](l.location,l.value),l.cache=l.value.concat(),l.needsUpdate=!1)})}getVAO(l="_"){if(!this.program)return null;let a=this.vao.get(l);return a||(a=new nD(this.gl,this.program),this.vao.set(l,a),a)}use(l){this.program&&(this.gl.useProgram(this.program),l&&l(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(l=>{l.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}class rd{constructor(l){b(this,"gl");b(this,"buffer");b(this,"array");this.gl=l,this.buffer=this.gl.createBuffer(),this.array=null}setData(l,a="vbo",o){const c=a=="vbo"?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(c,this.buffer),this.gl.bufferData(c,l,o||this.gl.STATIC_DRAW),this.gl.bindBuffer(c,null),this.array=l,this}dispose(){this.gl.deleteBuffer(this.buffer)}}class J{constructor(l,a,o,c){b(this,"x");b(this,"y");b(this,"z");b(this,"w");this.x=0,this.y=0,this.z=0,this.w=0,this.set(l,a,o,c)}get isVector(){return!0}set(l,a,o,c){return this.x=l??0,this.y=a??0,this.z=o??0,this.w=c??0,this}setScalar(l){return this.x=l,this.y=l,this.z=l,this.w=l,this}setFromArray(l){return this.x=l[0]||0,this.y=l[1]||0,this.z=l[2]||0,this.w=l[3]||0,this}add(l){return typeof l=="number"?(this.x+=l,this.y+=l,this.z+=l,this.w+=l):(this.x+=l.x??0,this.y+=l.y??0,this.z+=l.z??0,this.w+=l.w??0),this}sub(l){return typeof l=="number"?(this.x-=l,this.y-=l,this.z-=l):(this.x-=l.x??0,this.y-=l.y??0,this.z-=l.z??0,this.w-=l.w??0),this}multiply(l){return typeof l=="number"?(this.x*=l,this.y*=l,this.z*=l,this.w*=l):(this.x*=l.x,this.y*=l.y,this.z*=l.z,this.w*=l.w),this}divide(l){return typeof l=="number"?(this.x/=l,this.y/=l,this.z/=l,this.w/=l):(this.x/=l.x,this.y/=l.y,this.z/=l.z,this.w/=l.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(l){const a=this.x-l.x,o=this.y-l.y,c=this.z-l.z;return Math.sqrt(a*a+o*o+c*c)}normalize(){const l=this.length()||1;return this.x/=l,this.y/=l,this.z/=l,this}cross(l){const a=this.x,o=this.y,c=this.z,d=l.x,u=l.y,x=l.z;return this.x=o*x-c*u,this.y=c*d-a*x,this.z=a*u-o*d,this}dot(l){return this.x*l.x+this.y*l.y+this.z*l.z}applyMatrix3(l){const a=l.elm,o=a[0],c=a[1],d=a[2],u=a[4],x=a[5],g=a[6],p=a[8],_=a[9],T=a[10],C=this.x*o+this.y*u+this.z*p,w=this.x*c+this.y*x+this.z*_,k=this.x*d+this.y*g+this.z*T;return this.x=C,this.y=w,this.z=k,this.w=0,this}applyMatrix4(l){const a=l.elm,o=a[0],c=a[1],d=a[2],u=a[3],x=a[4],g=a[5],p=a[6],_=a[7],T=a[8],C=a[9],w=a[10],k=a[11],W=a[12],$=a[13],X=a[14],M=a[15],Y=this.x*o+this.y*x+this.z*T+this.w*W,oe=this.x*c+this.y*g+this.z*C+this.w*$,j=this.x*d+this.y*p+this.z*w+this.w*X,ne=this.x*u+this.y*_+this.z*k+this.w*M;return this.x=Y,this.y=oe,this.z=j,this.w=ne,this}applyMatrix4AsPosition(l){const a=this.w;return this.w=1,this.applyMatrix4(l),this.w=a,this}applyMatrix4AsDirection(l){const a=this.w;return this.w=0,this.applyMatrix4(l),this.w=a,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(l,a){return this.x=this.x+(l.x-this.x)*a,this.y=this.y+(l.y-this.y)*a,this.z=this.z+(l.z-this.z)*a,this.w=this.w+(l.w-this.w)*a,this}copy(l){return this.x=l.x??0,this.y=l.y??0,this.z=l.z??0,this.w=l.w??0,this}clone(){return new J(this.x,this.y,this.z,this.w)}getElm(l){return l=="vec2"?[this.x,this.y]:l=="vec3"?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}class $e{constructor(l){b(this,"unit");b(this,"image");b(this,"size");b(this,"gl");b(this,"glTex");b(this,"textureType");b(this,"_setting");this.gl=l,this.image=null,this.unit=0,this.size=new J,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=l.TEXTURE_2D}get isTexture(){return!0}setting(l){return this._setting={...this._setting,...l},this.attach(this.image),this}attach(l){if(this.image=l,this.gl.bindTexture(this.textureType,this.glTex),this.image){const a=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(a.width,a.height),a instanceof HTMLImageElement||a instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,a):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,a.width,a.height,0,this._setting.format,this._setting.type,a.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}activate(l){return this.gl.activeTexture(this.gl.TEXTURE0+l),this.gl.bindTexture(this.textureType,this.glTex),this.unit=l,this}load(l,a){const o=new Image;return o.onload=()=>{this.attach(o),a&&a()},o.src=l,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}class vt{constructor(l,a){b(this,"size");b(this,"gl");b(this,"glFrameBuffer");b(this,"textures");b(this,"depthTexture");b(this,"textureAttachmentList");this.gl=l,this.size=new J(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!a||!a.disableDepthBuffer)&&this.setDepthTexture(new $e(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(l){this.depthTexture=l,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(l){return this.textures=l,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((a,o)=>{a.attach({width:this.size.x,height:this.size.y});const c=this.gl.COLOR_ATTACHMENT0+o;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,c,this.gl.TEXTURE_2D,a.getTexture(),0),this.textureAttachmentList.push(c)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(l,a){return typeof l=="number"?(this.size.x=l,a!==void 0&&(this.size.y=a)):this.size.copy(l),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(o=>{o.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}class rD extends vt{constructor(a,o){super(a,o);b(this,"cubeTarget");b(this,"textures");b(this,"currentFace");this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(a){return this.textures=a,this.textureAttachmentList=[],this.textures.forEach(o=>{o.attach({width:this.size.x,height:this.size.y})}),this}face(a){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((o,c)=>{const d=this.gl.COLOR_ATTACHMENT0+c;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,d,this.cubeTarget[a],o.getTexture(),0),this.textureAttachmentList.push(d)}),this.currentFace=this.cubeTarget[a],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}class iD extends $e{constructor(a){super(a);b(this,"cubeTarget");this.textureType=a.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(a){if(this.image=a,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let o=0;o<6;o++){const c=Array.isArray(this.image)?this.image[o]:this.image;this.size.set(c.width,c.height),c instanceof HTMLImageElement||c instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[o],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,c):this.gl.texImage2D(this.cubeTarget[o],0,this._setting.internalFormat,c.width,c.height,0,this._setting.format,this._setting.type,c.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}class aD{constructor(l){b(this,"gl");b(this,"transformFeedback");b(this,"feedbackBuffer");this.gl=l,this.transformFeedback=this.gl.createTransformFeedback(),this.feedbackBuffer=new Map}bind(l){this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,this.transformFeedback),l&&l(),this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,null)}setBuffer(l,a,o){this.feedbackBuffer.set(l,{buffer:a,varyingIndex:o})}use(l){this.bind(()=>{this.feedbackBuffer.forEach(a=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,a.varyingIndex,a.buffer.buffer)}),l&&l(this),this.feedbackBuffer.forEach(a=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,a.varyingIndex,null)})})}}class ut{constructor(l){b(this,"elm");this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],l&&this.set(l)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new ut().copy(this)}copy(l){return this.set(l.elm),this}perspective(l,a,o,c){const d=1/Math.tan(l*Math.PI/360),u=c-o;return this.elm=[d/a,0,0,0,0,d,0,0,0,0,-(c+o)/u,-1,0,0,-(c*o*2)/u,0],this}orthographic(l,a,o,c){return this.elm=[2/l,0,0,0,0,2/a,0,0,0,0,-2/(c-o),0,0,0,-(c+o)/(c-o),1],this}lookAt(l,a,o){const c=l.clone().sub(a).normalize(),d=o.clone().cross(c).normalize(),u=c.clone().cross(d).normalize();return this.elm=[d.x,d.y,d.z,0,u.x,u.y,u.z,0,c.x,c.y,c.z,0,l.x,l.y,l.z,1],this}inverse(){const l=this.elm[0],a=this.elm[1],o=this.elm[2],c=this.elm[3],d=this.elm[4],u=this.elm[5],x=this.elm[6],g=this.elm[7],p=this.elm[8],_=this.elm[9],T=this.elm[10],C=this.elm[11],w=this.elm[12],k=this.elm[13],W=this.elm[14],$=this.elm[15],X=l*u-a*d,M=l*x-o*d,Y=l*g-c*d,oe=a*x-o*u,j=a*g-c*u,ne=o*g-c*x,K=p*k-_*w,me=p*W-T*w,_e=p*$-C*w,ye=_*W-T*k,pe=_*$-C*k,ct=T*$-C*W,we=X*ct-M*pe+Y*ye+oe*_e-j*me+ne*K,be=1/we;return we==0?this.identity():(this.elm[0]=(u*ct-x*pe+g*ye)*be,this.elm[1]=(-a*ct+o*pe-c*ye)*be,this.elm[2]=(k*ne-W*j+$*oe)*be,this.elm[3]=(-_*ne+T*j-C*oe)*be,this.elm[4]=(-d*ct+x*_e-g*me)*be,this.elm[5]=(l*ct-o*_e+c*me)*be,this.elm[6]=(-w*ne+W*Y-$*M)*be,this.elm[7]=(p*ne-T*Y+C*M)*be,this.elm[8]=(d*pe-u*_e+g*K)*be,this.elm[9]=(-l*pe+a*_e-c*K)*be,this.elm[10]=(w*j-k*Y+$*X)*be,this.elm[11]=(-p*j+_*Y-C*X)*be,this.elm[12]=(-d*ye+u*me-x*K)*be,this.elm[13]=(l*ye-a*me+o*K)*be,this.elm[14]=(-w*oe+k*M-W*X)*be,this.elm[15]=(p*oe-_*M+T*X)*be,this)}transpose(){const l=this.elm[0],a=this.elm[1],o=this.elm[2],c=this.elm[3],d=this.elm[4],u=this.elm[5],x=this.elm[6],g=this.elm[7],p=this.elm[8],_=this.elm[9],T=this.elm[10],C=this.elm[11],w=this.elm[12],k=this.elm[13],W=this.elm[14],$=this.elm[15];return this.elm[0]=l,this.elm[1]=d,this.elm[2]=p,this.elm[3]=w,this.elm[4]=a,this.elm[5]=u,this.elm[6]=_,this.elm[7]=k,this.elm[8]=o,this.elm[9]=x,this.elm[10]=T,this.elm[11]=W,this.elm[12]=c,this.elm[13]=g,this.elm[14]=C,this.elm[15]=$,this}set(l){for(let a=0;a<this.elm.length;a++)this.elm[a]=l[a]??0;return this}setFromTransform(l,a,o){return this.identity(),l&&this.applyPosition(l),a&&this.applyQuaternion(a),o&&this.applyScale(o),this}applyPosition(l){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,l.x,l.y,l.z,1]),this}applyQuaternion(l){const a=l.x,o=l.y,c=l.z,d=l.w,u=a*a,x=o*o,g=c*c,p=d*d,_=a*o,T=a*c,C=a*d,w=o*c,k=o*d,W=c*d;return this.matmul([u-x-g+p,2*(_+W),2*(T-k),0,2*(_-W),-u+x-g+p,2*(w+C),0,2*(T+k),2*(w-C),-u-x+g+p,0,0,0,0,1]),this}applyScale(l){return this.matmul([l.x,0,0,0,0,l.y,0,0,0,0,l.z,0,0,0,0,1]),this}matmul(l){const a=new Array(16);for(let o=0;o<4;o++)for(let c=0;c<4;c++){let d=0;for(let u=0;u<4;u++)d+=this.elm[u*4+c]*l[u+o*4];a[c+o*4]=d}this.elm=a}setRotationFromDirection(l,a){a=a||{x:0,y:1,z:0};const o=new J().copy(l).normalize(),c=new J().copy(a).cross(o).normalize();c.length()==0&&(o.x+=.001,c.copy(a).cross(o).normalize());const d=o.clone().cross(c).normalize();return this.set([c.x,c.y,c.z,0,d.x,d.y,d.z,0,o.x,o.y,o.z,0,0,0,0,1]),this}makeRotationAxis(l,a){const o=Math.cos(a),c=Math.sin(a),d=1-o,u=l.x,x=l.y,g=l.z,p=d*u,_=d*x;return this.set([p*u+o,p*x-c*g,p*g+c*x,0,p*x+c*g,_*x+o,_*g-c*u,0,p*g-c*x,_*g+c*u,d*g*g+o,0,0,0,0,1]),this}multiply(l){return this.matmul(l.elm),this}preMultiply(l){const a=this.copyToArray([]);return this.set(l.elm),this.matmul(a),this}decompose(l,a,o){l&&(l.x=this.elm[12],l.y=this.elm[13],l.z=this.elm[14]),a&&a.setFromMatrix(this)}copyToArray(l){l.length=this.elm.length;for(let a=0;a<this.elm.length;a++)l[a]=this.elm[a];return l}}class Mv extends J{constructor(a,o,c,d){super(a,o,c,0);b(this,"order");this.order=d||"XYZ"}copy(a){return"order"in a&&(this.order=a.order),super.copy(a)}setFromQuaternion(a){const o=new ut().applyQuaternion(a);return this.setFromRotationMatrix(o),this}setFromRotationMatrix(a){const o=a.elm,c=o[0],d=o[4],u=o[8];o[1];const x=o[5],g=o[9];o[2];const p=o[6],_=o[10];return this.order="XYZ",this.y=Math.asin(Math.min(1,Math.max(-1,u))),Math.abs(u)<.9999999?(this.x=Math.atan2(-g,_),this.z=Math.atan2(-d,c)):(this.x=Math.atan2(p,x),this.z=0),this}}class Ro{constructor(l,a,o,c){b(this,"x");b(this,"y");b(this,"z");b(this,"w");b(this,"updated",!1);this.x=l||0,this.y=a||0,this.z=o||0,this.w=c||1}set(l,a,o,c){this.x=l??this.x,this.y=a??this.y,this.z=o??this.z,this.w=c??this.w,this.updated=!0}setFromEuler(l,a){const o=a||("order"in l?l.order:"XYZ"),c=Math.sin(l.x/2),d=Math.sin(l.y/2),u=Math.sin(l.z/2),x=Math.cos(l.x/2),g=Math.cos(l.y/2),p=Math.cos(l.z/2);return o=="XYZ"?(this.x=x*d*u+c*g*p,this.y=-c*g*u+x*d*p,this.z=x*g*u+c*d*p,this.w=-c*d*u+x*g*p):o=="XZY"?(this.x=-x*d*u+c*g*p,this.y=x*d*p-c*g*u,this.z=c*d*p+x*g*u,this.w=c*d*u+x*g*p):o=="YZX"?(this.x=c*g*p+x*d*u,this.y=c*g*u+x*d*p,this.z=-c*d*p+x*g*u,this.w=-c*d*u+x*g*p):o=="ZYX"&&(this.x=c*g*p-x*d*u,this.y=c*g*u+x*d*p,this.z=-c*d*p+x*g*u,this.w=c*d*u+x*g*p),this.updated=!0,this}setFromMatrix(l){const a=l.elm,o=a[0]+a[5]+a[10];let c,d,u,x;if(o>0){const p=Math.sqrt(o+1)*2;x=.25*p,c=(a[6]-a[9])/p,d=(a[8]-a[2])/p,u=(a[1]-a[4])/p}else if(a[0]>a[5]&&a[0]>a[10]){const p=Math.sqrt(1+a[0]-a[5]-a[10])*2;x=(a[6]-a[9])/p,c=.25*p,d=(a[1]+a[4])/p,u=(a[2]+a[8])/p}else if(a[5]>a[10]){const p=Math.sqrt(1+a[5]-a[0]-a[10])*2;x=(a[8]-a[2])/p,c=(a[1]+a[4])/p,d=.25*p,u=(a[6]+a[9])/p}else{const p=Math.sqrt(1+a[10]-a[0]-a[5])*2;x=(a[1]-a[4])/p,c=(a[2]+a[8])/p,d=(a[6]+a[9])/p,u=.25*p}const g=Math.sqrt(c*c+d*d+u*u+x*x);return c/=g,d/=g,u/=g,x/=g,this.x=c,this.y=d,this.z=u,this.w=x,this.updated=!0,this}multiply(l){const a=this.w*l.w-this.x*l.x-this.y*l.y-this.z*l.z,o=this.w*l.x+this.x*l.w+this.y*l.z-this.z*l.y,c=this.w*l.y-this.x*l.z+this.y*l.w+this.z*l.x,d=this.w*l.z+this.x*l.y-this.y*l.x+this.z*l.w;return this.set(o,c,d,a),this.updated=!0,this}preMultiply(l){const a=l.clone().multiply(this);this.set(a.x,a.y,a.z,a.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(l){return this.x=l.x??0,this.y=l.y??0,this.z=l.z??0,this.w=l.w??0,this.updated=!0,this}clone(){return new Ro(this.x,this.y,this.z,this.w)}}var od;(h=>{h.gauss=(l,a,o)=>{const c=l-a,d=-(c*c)/(2*o*o);return 1/Math.sqrt(2*Math.PI*o)*Math.exp(d)},h.gaussWeights=l=>{let a=0;const o=[];if(l<=1)return[.5];for(let c=0;c<l;c++){const d=c/(l-1),u=(0,h.gauss)(d,0,1);a+=u*(c>0?2:1),o.push(u)}for(let c=0;c<l;c++)o[c]/=a;return o},h.randomSeed=l=>{l^=l<<13,l^=0,l^=l<<5;let a=123456789^l;l^=l<<13,l^=0,l^=l<<5;let o=362436069^l;l^=l<<13,l^=0,l^=l<<5;let c=521288629^l;l^=l<<13,l^=0,l^=l<<5;let d=88675123^l,u;return()=>(u=a^a<<11,a=o,o=c,c=d,d=(d^d>>>19^(u^u>>>8))>>>0,d/4294967296)},h.randomRange=(l=-1,a=1)=>l+Math.random()*(a-l),h.randomVector=(l=new J(-1,-1,-1,-1),a=new J(1,1,1,1))=>new J((0,h.randomRange)(l.x,a.x),(0,h.randomRange)(l.y,a.y),(0,h.randomRange)(l.z,a.z),(0,h.randomRange)(l.w,a.w)),h.smoothstep=(l,a,o)=>o<=l?0:o>=a?1:(o=(o-l)/(a-l),o*o*(3-2*o))})(od||(od={}));class Rn{constructor(){b(this,"listeners");this.listeners=[]}on(l,a){this.listeners.push({event:l,cb:a})}once(l,a){this.listeners.push({event:l,cb:a,once:!0})}off(l,a){this.listeners=this.listeners.filter(o=>a==null?o.event!=l:!(o.event==l&&o.cb==a))}emit(l,a){const o=this.listeners.concat();for(let c=0;c<o.length;c++){const d=o[c];d.event==l&&(d.cb.apply(this,a||[]),d.once&&this.off(l,d.cb))}}hasEvent(l){return this.listeners.some(a=>a.event==l)}}var Pa;(h=>{h.NEWTON_ITERATIONS=4,h.NEWTON_MIN_SLOPE=.001,h.SUBDIVISION_PRECISION=1e-7,h.SUBDIVISION_MAX_ITERATIONS=10,h.BEZIER_EASING_CACHE_SIZE=11,h.BEZIER_EASING_SAMPLE_STEP_SIZE=1/h.BEZIER_EASING_CACHE_SIZE;function l(p){return-p.p0+3*p.p1-3*p.p2+p.p3}function a(p){return 3*p.p0-6*p.p1+3*p.p2}function o(p){return-3*p.p0+3*p.p1}function c(p,_){return 3*l(p)*_*_+2*a(p)*_+o(p)}h.calcBezierSlope=c;function d(p,_){return((l(p)*_+a(p))*_+o(p))*_+p.p0}h.calcBezier=d;function u(p,_,T,C){let w=0,k=0;for(let W=0;W<h.SUBDIVISION_MAX_ITERATIONS;W++)k=_+(T-_)/2,w=d(C,k),w>p?T=k:_=k;return k}function x(p,_,T){for(let C=0;C<h.NEWTON_ITERATIONS;C++){const w=c(_,T);if(w==0)return T;const k=d(_,T)-p;T-=k/w}return T}function g(p,_,T){p.p1=Math.max(p.p0,Math.min(p.p3,p.p1)),p.p2=Math.max(p.p0,Math.min(p.p3,p.p2));let C=0;for(let W=1;W<T.length&&(C=W-1,!(_<T[W]));W++);const w=C/(h.BEZIER_EASING_CACHE_SIZE-1),k=c(p,w)/(p.p3-p.p0);return k==0?w:k>.01?x(_,p,w):u(_,w,w+h.BEZIER_EASING_SAMPLE_STEP_SIZE,p)}h.getBezierTfromX=g})(Pa||(Pa={}));var Sv;(h=>{function l(M=6){return Y=>{const oe=Math.exp(-M*(2*Y-1)),j=Math.exp(-M);return(1+(1-oe)/(1+oe)*(1+j)/(1-j))/2}}h.sigmoid=l;function a(M,Y,oe){const j=Math.max(0,Math.min(1,(oe-M)/(Y-M)));return j*j*(3-2*j)}h.smoothstep=a;function o(M){return M}h.linear=o;function c(M){return M*M}h.easeInQuad=c;function d(M){return M*(2-M)}h.easeOutQuad=d;function u(M){return M<.5?2*M*M:-1+(4-2*M)*M}h.easeInOutQuad=u;function x(M){return M*M*M}h.easeInCubic=x;function g(M){return--M*M*M+1}h.easeOutCubic=g;function p(M){return M<.5?4*M*M*M:(M-1)*(2*M-2)*(2*M-2)+1}h.easeInOutCubic=p;function _(M){return M*M*M*M}h.easeInQuart=_;function T(M){return 1- --M*M*M*M}h.easeOutQuart=T;function C(M){return M<.5?8*M*M*M*M:1-8*--M*M*M*M}h.easeInOutQuart=C;function w(M){return M*M*M*M*M}h.easeInQuint=w;function k(M){return 1+--M*M*M*M*M}h.easeOutQuint=k;function W(M){return M<.5?16*M*M*M*M*M:1+16*--M*M*M*M*M}h.easeInOutQuint=W;function $(M,Y,oe,j){const ne=new Array(Pa.BEZIER_EASING_CACHE_SIZE);for(let K=0;K<Pa.BEZIER_EASING_CACHE_SIZE;++K)ne[K]=Pa.calcBezier({p0:M.x,p1:Y.x,p2:oe.x,p3:j.x},K/(Pa.BEZIER_EASING_CACHE_SIZE-1));return K=>K<=M.x?M.y:j.x<=K?j.y:Pa.calcBezier({p0:M.y,p1:Y.y,p2:oe.y,p3:j.y},Pa.getBezierTfromX({p0:M.x,p1:Y.x,p2:oe.x,p3:j.x},K,ne))}h.bezier=$;function X(M,Y,oe,j){return $({x:0,y:0},{x:M,y:Y},{x:oe,y:j},{x:1,y:1})}h.cubicBezier=X})(Sv||(Sv={}));var Wb;(h=>{h.number=(l,a,o)=>l+(a-l)*o,h.vector=(l,a,o)=>l.lerp(a,o)})(Wb||(Wb={}));class oD extends Rn{constructor(a){super();b(this,"keyframes",[]);b(this,"cache",{frame:NaN,value:NaN});b(this,"frameStart");b(this,"frameEnd");b(this,"frameDuration");this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(a)}set(a){a&&(this.keyframes=[],a.forEach(o=>{this.addKeyFrame(o)}))}addKeyFrame(a){let o=0;for(let c=0;c<this.keyframes.length&&this.keyframes[c].coordinate.x<a.coordinate.x;c++)o++;this.keyframes.splice(o,0,a),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(a){if(a==this.cache.frame)return this.cache.value;let o=null;for(let c=0;c<this.keyframes.length;c++){const d=this.keyframes[c];if(a<d.coordinate.x){const u=this.keyframes[c-1];u?o=u.to(d,a):o=d.coordinate.y;break}}return o===null&&this.keyframes.length>0&&(o=this.keyframes[this.keyframes.length-1].coordinate.y),o!==null?(this.cache={frame:a,value:o},o):0}}class sD extends Rn{constructor(a,o,c,d,u){super();b(this,"name");b(this,"curves");b(this,"frameStart");b(this,"frameEnd");b(this,"frameDuration");b(this,"updatedFrame",-1);b(this,"value");this.name=a||"",this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new J,o&&this.setFCurve(o,"x"),c&&this.setFCurve(c,"y"),d&&this.setFCurve(d,"z"),u&&this.setFCurve(u,"w")}setFCurve(a,o){this.curves.set(o,a);let c=1/0,d=-1/0;this.curves.forEach(u=>{u.frameStart<c&&(c=u.frameStart),u.frameEnd>d&&(d=u.frameEnd)}),(c==-1/0||d==1/0)&&(c=0,d=1),this.frameStart=c,this.frameEnd=d,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(a){return this.curves.get(a)||null}setFrame(a){if(a==this.updatedFrame)return this;const o=this.curves.get("x"),c=this.curves.get("y"),d=this.curves.get("z"),u=this.curves.get("w");return o&&(this.value.x=o.getValue(a)),c&&(this.value.y=c.getValue(a)),d&&(this.value.z=d.getValue(a)),u&&(this.value.w=u.getValue(a)),this.updatedFrame=a,this}}class lD extends Rn{constructor(a,o,c,d){super();b(this,"coordinate",{x:0,y:0});b(this,"handleLeft",{x:0,y:0});b(this,"handleRight",{x:0,y:0});b(this,"interpolation","BEZIER");b(this,"easing",null);b(this,"nextFrame",null);this.set(a,o,c,d)}set(a,o,c,d){this.coordinate=a,this.handleLeft=o||a,this.handleRight=c||a,this.interpolation=d||"BEZIER"}getEasing(a,o){return a=="BEZIER"?Sv.bezier(this.coordinate,this.handleRight,o.handleLeft,o.coordinate):a=="CONSTANT"?()=>this.coordinate.y:c=>{const d=o.coordinate.y-this.coordinate.y;return c=(c-this.coordinate.x)/(o.coordinate.x-this.coordinate.x),this.coordinate.y+c*d}}to(a,o){return(this.nextFrame==null||this.nextFrame.coordinate.x!=a.coordinate.x||this.nextFrame.coordinate.y!=a.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,a),this.nextFrame=a),this.easing?this.easing(o):0}}let uD=0;var wv;(h=>{function l(){return(uD++).toString(16)}h.genUUID=l})(wv||(wv={}));class As extends Rn{constructor(){super();b(this,"uuid");b(this,"initiator");b(this,"fields_");this.uuid=wv.genUUID(),this.fields_=new Map,this.initiator="script"}serialize(a){a=a||{mode:"view"};const o={};return this.fields_.forEach((c,d)=>{const u=this.getFieldOpt(d);a.mode=="export"&&u&&u&&u.noExport||(o[d]=c.get(a))}),o}serializeToDirectory(){return(o=>{const c={type:"folder",childs:{},opt:{}},d=Object.keys(o);for(let u=0;u<d.length;u++){const x=d[u],g=this.getFieldOpt(x);if(!x)continue;let p=c;const _=x.split("/");for(let T=0;T<_.length;T++){const C=_[T];C&&p.type!="value"&&(p.childs[C]||(T==_.length-1?p.childs[C]={type:"value",value:null,opt:g}:p.childs[C]={type:"folder",childs:{},opt:g}),p=p.childs[C])}p.type=="value"&&(p.value=o[x])}return c})(this.serialize())}deserialize(a){const o=Object.keys(a);for(let c=0;c<o.length;c++){const d=o[c],u=this.fields_.get(d);u&&u.set(a[d])}}exportEditor(){this.serialize({mode:"export"})}field(a,o,c,d){const u=typeof c=="function"?c:void 0,x=typeof c=="object"&&c||d||{};u||(x.readOnly=!0,x.noExport=!0);const g=a.startsWith("/")?a.slice(1):a;this.fields_.set(g,{get:o,set:p=>{u&&u(p),this.noticeField(a)},opt:x})}fieldDir(a,o){const c=a;return this.field(c+"/",()=>null,void 0,{...o,isFolder:!0}),{dir:d=>this.fieldDir(`${c}/${d}`),field:(d,u,x,g)=>{this.field(`${c}/${d}`,u,x,g)}}}setField(a,o){this.deserialize({[a]:o})}getField(a,o){const c=this.fields_.get(a);if(c)return o=o||{mode:"view"},c.get(o)}getFieldOpt(a){const o=this.fields_.get(a);if(o)return o.opt}noticeField(a){this.emit("fields/update/"+a),this.emit("fields/update",[[a]])}}class kn extends As{constructor(a){super();b(this,"disableEdit");b(this,"order");b(this,"_entity");b(this,"_enabled");b(this,"_tag");b(this,"_disposed");this.disableEdit=!1,this._entity=a.entity,this._enabled=!0,this._disposed=!1,this._tag="",this.order=0,this.field("enabled",()=>this.enabled,o=>this.enabled=o,{hidden:!0,noExport:!0}),this.field("tag",()=>this.tag,o=>this._tag=o,{readOnly:!0,noExport:!0,hidden:o=>o==""})}get tag(){return this._tag}get entity(){return this._entity}set enabled(a){this._enabled=a}get enabled(){return this._enabled}update(a){this.enabled&&this.updateImpl(a)}updateImpl(a){}postUpdate(a){this.enabled&&this.postUpdateImpl(a)}postUpdateImpl(a){}beforeRender(a){this.enabled&&this.beforeRenderImpl(a)}beforeRenderImpl(a){}afterRender(a){this.enabled&&this.afterRenderImpl(a)}afterRenderImpl(a){}dispose(){this._disposed=!0,this.emit("dispose")}}class _o extends As{constructor(){super();b(this,"vertCount");b(this,"attributes");b(this,"vaoCache");this.vertCount=0,this.attributes=new Map,this.vaoCache=new Map}setAttribute(a,o,c,d){const u=this.attributes.get(a);return u&&u.buffer&&u.buffer.dispose(),this.attributes.set(a,{array:o,size:c,opt:d}),this.updateVertCount(),this}getAttribute(a){return this.attributes.get(a)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((a,o)=>{o=="index"||a.opt&&a.opt.instanceDivisor||(this.vertCount=Math.min(a.array.length/a.size,this.vertCount))})}createBuffers(a){this.attributes.forEach((o,c)=>{o.buffer||(o.buffer=new rd(a).setData(o.array,c=="index"?"ibo":"vbo",o.opt&&o.opt.usage))})}requestUpdate(){this.vaoCache.clear()}dispose(){super.dispose(),this.attributes.forEach(a=>{var o;(o=a.buffer)==null||o.dispose()})}}const cD=`#include <common>\r
#include <packing>\r
#include <frag_h>\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
	#include <frag_out>\r
\r
}`,fD=`#include <common>\r
#include <vert_h>\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
	#include <vert_out>\r
	\r
}`;class La extends As{constructor(a){super();b(this,"name");b(this,"vert");b(this,"frag");b(this,"defines");b(this,"uniforms");b(this,"useLight");b(this,"depthTest");b(this,"depthWrite");b(this,"cullFace");b(this,"drawType");b(this,"blending");b(this,"visibilityFlag");b(this,"programCache");a=a||{},this.name=a.name||"",this.visibilityFlag={},this.setVisibility(a.phase||["shadowMap","deferred"]),this.useLight=!0,this.depthTest=!0,this.cullFace=!1,this.depthWrite=a.depthTest!==void 0?a.depthTest:!0,this.drawType=a.drawType||"TRIANGLES",this.blending=a.blending||"NORMAL",this.vert=a.vert||fD,this.frag=a.frag||cD,this.defines=a.defines||{},this.uniforms=a.uniforms||{},this.programCache={}}setVisibility(a){this.visibilityFlag={shadowMap:a.indexOf("shadowMap")>-1,deferred:a.indexOf("deferred")>-1,forward:a.indexOf("forward")>-1,ui:a.indexOf("ui")>-1,envMap:a.indexOf("envMap")>-1,postprocess:a.indexOf("postprocess")>-1}}requestUpdate(){this.programCache={}}}const dD=new _o,mD=new La;class kr extends kn{constructor(a){super(a);b(this,"geometry");b(this,"material");const o=a.args||{};this.geometry=o.geometry||dD,this.material=o.material||mD,this.field("material",()=>this.material.name)}}class ii extends As{constructor(a){super();b(this,"name");b(this,"position");b(this,"euler");b(this,"quaternion");b(this,"scale");b(this,"matrix");b(this,"matrixWorld");b(this,"matrixWorldPrev");b(this,"autoMatrixUpdate");b(this,"parent");b(this,"children");b(this,"components");b(this,"componentsSorted");b(this,"visible");b(this,"userData");this.name=a&&a.name||"",this.position=new J(0,0,0,1),this.euler=new Mv,this.quaternion=new Ro(0,0,0,1),this.scale=new J(1,1,1),this.matrix=new ut,this.matrixWorld=new ut,this.matrixWorldPrev=new ut,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.field("name",()=>this.name,o=>this.name=o),this.field("position",()=>this.position.getElm("vec3"),o=>this.position.setFromArray(o),{format:{type:"vector"}}),this.field("euler",()=>this.euler.getElm("vec3"),o=>this.euler.setFromArray(o),{format:{type:"vector"}}),this.field("scale",()=>this.scale.getElm("vec3"),o=>this.scale.setFromArray(o),{format:{type:"vector"}}),this.field("children",()=>this.children.map(o=>o.uuid),{hidden:!0}),this.field("components",()=>{const o=[];return this.components.forEach(c=>o.push(c.uuid)),o},{hidden:!0})}update(a){const o={...a};o.matrix=this.matrixWorld,this.updateImpl(a);for(let c=0;c<this.componentsSorted.length;c++)this.componentsSorted[c].update(o);this.autoMatrixUpdate&&this.updateMatrix();for(let c=0;c<this.children.length;c++)this.children[c].update(o)}updateImpl(a){}onBeforeRender(a){for(let o=0;o<this.componentsSorted.length;o++)this.componentsSorted[o].beforeRender(a);for(let o=0;o<this.children.length;o++)this.children[o].onBeforeRender(a)}onAfterRender(a){this.matrixWorldPrev.copy(this.matrixWorld);for(let o=0;o<this.componentsSorted.length;o++)this.componentsSorted[o].afterRender(a);for(let o=0;o<this.children.length;o++)this.children[o].onAfterRender(a)}add(a){a.parent&&a.parent.remove(a),a.parent=this,this.children.push(a),this.noticeField("children")}remove(a){this.children=this.children.filter(o=>o.uuid!=a.uuid),this.noticeField("children")}updateMatrix(a){this.parent&&a&&this.parent.updateMatrix(!0);const o=this.parent?this.parent.matrixWorld:new ut;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(o)}decomposeMatrix(a){a.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(a){this.decomposeMatrix(this.matrix.clone().multiply(a))}lookAt(a){this.updateMatrix();const o=new ut,c=new J;this.matrixWorld.decompose(c);const d=this.position.clone().add(a.clone().sub(c));o.lookAt(this.position,d,new J(0,1,0)),this.decomposeMatrix(o)}addComponent(a,...o){this.removeComponent(a);const[c]=o,d=new a({entity:this,args:c||{}});return this.components.set(a,d),this.componentsSorted.push(d),this.componentsSorted.sort((u,x)=>u.order-x.order),this.noticeField("components"),d}removeComponent(a){const o=this.components.get(a);o&&o.dispose(),this.components.delete(a),this.componentsSorted=this.componentsSorted.filter(c=>c!==o),this.noticeField("components")}removeComponentByUUID(a){for(const o of this.components){const c=o[0],d=o[1];if(d.uuid===a)return d.dispose(),this.components.delete(c),this.noticeField("components"),d}}getComponent(a){return this.components.get(a)}getComponentByUUID(a){for(const o of this.components.values())if(o.uuid===a)return o;return null}getComponentByTag(a){for(const o of this.components.values())if(o.tag===a)return o;return null}getComponentsByTag(a){const o=[];return this.components.forEach(c=>{c.tag==a&&o.push(c)}),o}findEntityByName(a){if(this.name==a)return this;for(let o=0;o<this.children.length;o++){const d=this.children[o].findEntityByName(a);if(d)return d}}findEntityByUUID(a){if(this.uuid==a)return this;for(let o=0;o<this.children.length;o++){const d=this.children[o].findEntityByUUID(a);if(d)return d}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(a){let o="/"+this.name;return a&&a.uuid==this.uuid||this.parent&&(o=this.parent.getScenePath(a)+o),o}noticeEventChilds(a,o){this.emit(a,o);for(let c=0;c<this.children.length;c++)this.children[c].noticeEventChilds(a,o)}noticeEventParent(a,o){this.emit(a,o),this.parent&&this.parent.noticeEventParent(a,o)}traverse(a){a(this),this.children.forEach(o=>o.traverse(a))}isVisibleTraverse(){return this.visible?this.parent?this.parent.isVisibleTraverse():!0:!1}dispose(){this.emit("dispose"),this.parent&&this.parent.remove(this),this.components.forEach(a=>{a.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(a=>{a.disposeRecursive()}),this.children=[]}}const hD=`#include <common>\r
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
} `,pD=`#include <common>\r
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
}`,Qf=12,Kf=8,vD=h=>{switch(h){case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"SCALAR":return 1;default:return 1}},gD=h=>{switch(h){case"TEXCOORD_0":return"uv";default:return h.toLowerCase()}};class yD extends Rn{constructor(a){super();b(this,"gl");this.gl=a}async load(a){const c=await(await fetch(a)).arrayBuffer(),d=new TextDecoder,u=d.decode(new Uint8Array(c,0,4)),x=new Map;let g=null;if(u=="glTF"){const j=new DataView(c),ne=Qf,K={length:j.getUint32(ne,!0),type:j.getUint32(ne+4,!0)};if(K.type==1313821514){const me=Qf+Kf;g=JSON.parse(d.decode(new Uint8Array(c,me,K.length)))}if(c.byteLength>Kf+K.length+Qf){const me=Qf+Kf+K.length,_e={length:j.getUint32(me,!0),type:j.getUint32(me+4,!0)};if(_e.type==5130562){const ye=me+Kf,pe=c.slice(ye,ye+_e.length);x.set(0,pe)}}}else g=JSON.parse(d.decode(new Uint8Array(c)));if(!g)throw new Error("");const p=g,_=j=>{const ne=x.get(j.buffer);return ne?ne.slice(j.byteOffset,j.byteOffset+j.byteLength):null},T=new Map;g.accessors&&g.accessors.forEach((j,ne)=>{const{type:K}=j;if(!p.bufferViews)return;const me=p.bufferViews[j.bufferView],_e=_(me);_e&&T.set(ne,{type:K,buffer:_e})});const C=new Map,w=(p.images||[]).map((j,ne)=>new Promise(K=>{if(j.bufferView!==void 0){if(!p.bufferViews)return;const me=p.bufferViews[j.bufferView],_e=_(me);if(_e){const ye=new Blob([new Uint8Array(_e)],{type:j.mimeType}),pe=new Image;pe.onload=()=>{K(j)},pe.src=URL.createObjectURL(ye),C.set(ne,pe)}}}));await Promise.all(w);const k=new Map,W=j=>{if(!p.textures)return null;const ne=p.textures[j];if(ne){const K=new $e(this.gl),me=C.get(ne.source);if(me)return K.attach(me),K}return null};p.materials&&p.materials.forEach((j,ne)=>{const K=new La({frag:hD,vert:pD});if(j.normalTexture){const me=W(j.normalTexture.index);me&&(K.uniforms.uNormalMap={value:me,type:"1i"},K.defines.USE_NORMAL_MAP="")}if(j.pbrMetallicRoughness){const me=j.pbrMetallicRoughness;if(me.baseColorFactor&&(K.uniforms.uBaseColor={value:me.baseColorFactor,type:"4fv"},K.defines.USE_COLOR=""),me.baseColorTexture){const _e=W(me.baseColorTexture.index);_e&&(K.uniforms.uBaseColorMap={value:_e,type:"1i"},K.defines.USE_COLOR_MAP="")}if(me.roughnessFactor!==void 0&&(K.uniforms.uRoughness={value:me.roughnessFactor,type:"1f"},K.defines.USE_ROUGHNESS=""),me.metallicFactor!==void 0&&(K.uniforms.uMetalness={value:me.metallicFactor,type:"1f"},K.defines.USE_METALNESS=""),me.metallicRoughnessTexture){const _e=W(me.metallicRoughnessTexture.index);_e&&(K.uniforms.uMRMap={value:_e,type:"1i"},K.defines.USE_MR_MAP="")}}if(j.emissiveFactor&&(K.uniforms.uEmission={value:j.emissiveFactor,type:"3fv"},K.defines.USE_EMISSION=""),j.emissiveTexture){const me=W(j.emissiveTexture.index);me&&(K.uniforms.uEmissionMap={value:me,type:"1i"},K.defines.USE_EMISSION_MAP="")}j.extensions&&j.extensions.KHR_materials_emissive_strength&&(K.uniforms.uEmissionStrength={value:j.extensions.KHR_materials_emissive_strength.emissiveStrength,type:"1fv"},K.defines.USE_EMISSION_STRENGTH=""),k.set(ne,K)});const $=new Map;p.meshes&&p.meshes.forEach((j,ne)=>{const{primitives:K}=j;$.set(ne,K.map(me=>{const _e=new _o;if(Object.keys(me.attributes).forEach(pe=>{const ct=me.attributes[pe],we=T.get(ct);we&&_e.setAttribute(gD(pe),new Float32Array(we.buffer),vD(we.type))}),me.indices!==void 0){const pe=T.get(me.indices);pe&&_e.setAttribute("index",new Uint16Array(pe.buffer),1)}let ye=null;if(me.material!==void 0){const pe=k.get(me.material);pe&&(ye=pe)}return ye||(ye=new La),_e.attributes.has("tangent")&&(ye.defines.USE_TANGENT=""),{geometry:_e,material:ye}}))});const X=new Map,M=(j,ne)=>{const K=new ii;ne.translation&&K.position.set(ne.translation[0],ne.translation[1],ne.translation[2]),ne.rotation&&K.quaternion.set(ne.rotation[0],ne.rotation[1],ne.rotation[2],ne.rotation[3]),ne.scale&&K.scale.set(ne.scale[0],ne.scale[1],ne.scale[2]);const me=$.get(ne.mesh);if(K.name=ne.name,me)if(me.length==1){const _e=me[0],ye=K.addComponent(kr);ye.geometry=_e.geometry,ye.material=_e.material}else me.forEach((_e,ye)=>{const pe=new ii;pe.name=ne.name+"_"+ye;const ct=pe.addComponent(kr);ct.geometry=_e.geometry,ct.material=_e.material,K.add(pe)});return ne.children&&ne.children.forEach(_e=>{const ye=X.get(_e);ye?K.add(ye):p.nodes&&K.add(M(_e,p.nodes[_e]))}),X.set(j,K),K};p.nodes&&p.nodes.forEach((j,ne)=>{M(ne,j)});const Y=new ii,oe=p.scenes&&p.scenes[0];return oe&&oe.nodes&&oe.nodes.forEach(j=>{const ne=X.get(j);ne&&Y.add(ne)}),{scene:Y}}}class xD extends Rn{constructor(a,o){super();b(this,"gl");b(this,"connection");b(this,"frame");b(this,"nodes");b(this,"curveGroups");b(this,"root");b(this,"gltf");b(this,"currentScene");this.gl=a,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},o&&this.connect(o)}connect(a,o){{const c=new WebSocket(a);c.onopen=this.onOpen.bind(this),c.onmessage=this.onMessage.bind(this),c.onclose=this.onClose.bind(this),c.onerror=d=>{console.error(d),this.emit("error")},this.connection={url:a,ws:c,gltfPath:o}}}disconnect(){this.connection&&(this.connection.ws.close(),this.connection.ws.onmessage=null,this.connection.ws.onclose=null,this.connection.ws.onopen=null,this.connection=void 0)}binaryStringToArrayBuffer(a){const o=new Uint8Array(a.length);for(let c=0;c<a.length;c++){const d=a.charCodeAt(c);o[c]=d}return o.buffer}async loadScene(a,o){this.currentScene=a,o&&await new yD(this.gl).load(o).then(x=>{this.gltf=x,this.emit("gltfLoaded",[x])}),await new Promise(u=>{setTimeout(()=>{u(null)},100)}),this.frame.start=a.frame.start,this.frame.end=a.frame.end,this.frame.fps=a.frame.fps,this.curveGroups=[],this.nodes=[];const c=Object.keys(a.animations);for(let u=0;u<c.length;u++){const x=c[u],g=new sD(x);a.animations[u].forEach(p=>{const _=new oD;_.set(p.k.map(T=>{const C={B:"BEZIER",C:"CONSTANT",L:"LINEAR"}[T[0]],w=T[1];return new lD({x:w[0],y:w[1]},w[2]!==void 0&&{x:w[2],y:w[3]}||void 0,w[4]!==void 0&&{x:w[4],y:w[5]}||void 0,C)})),g.setFCurve(_,p.axis)}),this.curveGroups.push(g)}this.nodes=[];const d=u=>{const x={name:"",uniforms:{}};u.material&&(x.name=u.material.name||"",x.uniforms=u.material.uniforms||{});const g={name:u.name,class:u.class,parent:u.parent,children:[],animations:u.animation||{},position:u.position||[0,0,0],rotation:u.rotation||[0,0,0],scale:u.scale||[1,1,1],material:x,type:u.type,visible:u.visible},p=u.param;return p&&"position"in p?g.param={position:new Float32Array(this.binaryStringToArrayBuffer(atob(p.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(p.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(p.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(p.index)))}:g.param=p,u.children&&u.children.forEach(_=>{g.children.push(d(_))}),this.nodes.push(g),g};this.root=d(a.root),this.emit("sync/scene",[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(a){this.frame=a,this.emit("sync/timeline",[this.frame])}onOpen(a){}onMessage(a){{const o=JSON.parse(a.data);o.type=="sync/scene"?this.loadScene(o.data,this.connection&&this.connection.gltfPath):o.type=="sync/timeline"?this.onSyncTimeline(o.data):o.type=="event"&&this.emit("event/"+o.data.type)}}onClose(a){this.disconnect()}getCurveGroup(a){return this.curveGroups[a]}setFrame(a){this.onSyncTimeline({...this.frame,playing:!0,current:a})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(a=>{this.on("gltfLoaded",o=>{a(o)})})}dispose(){this.disconnect()}}class bD extends _o{constructor(l){super();const a=[],o=[],c=[],d=[],u=[],{width:x,height:g,depth:p,segmentsWidth:_,segmentsHeight:T,segmentsDepth:C}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...l},w=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:x,h:g,d:p,segW:_,segH:T},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:x,h:g,d:p,segW:_,segH:T},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:p,h:g,d:x,segW:C,segH:T},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:p,h:g,d:x,segW:C,segH:T},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:x,h:p,d:g,segW:_,segH:C},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:x,h:p,d:g,segW:_,segH:C}];let k=0;for(const W of w){const $=W.normal,X=W.dir,M=W.up,Y=W.segW,oe=W.segH,j=W.w/2,ne=W.h/2,K=W.d/2,me=W.w/Y,_e=W.h/oe;for(let ye=0;ye<=oe;ye++)for(let pe=0;pe<=Y;pe++){const ct=-j+pe*me,we=-ne+ye*_e,be=-K,_t=pe/Y,St=ye/oe,ke=ct*-X[0]+we*M[0]+be*-$[0],Ht=ct*-X[1]+we*M[1]+be*-$[1],xr=ct*-X[2]+we*M[2]+be*-$[2];if(a.push(ke,Ht,xr),o.push(...$),c.push(_t,St),u.push(ye/oe*M[1]+Math.max(0,M[2])),ye<oe&&pe<Y){const Hn=k+ye*(Y+1)+pe,Gn=k+(ye+1)*(Y+1)+pe,zt=k+(ye+1)*(Y+1)+(pe+1),fn=k+ye*(Y+1)+(pe+1);d.push(Hn,Gn,fn),d.push(Gn,zt,fn)}}k+=(Y+1)*(oe+1)}this.setAttribute("position",new Float32Array(a),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(c),2),this.setAttribute("posY",new Float32Array(u),1),this.setAttribute("index",new Uint16Array(d),1)}}class ED extends _o{constructor(l){super();const a=[],o=[],c=[],d=[],{height:u,radiusTop:x,radiusBottom:g,radSegments:p,heightSegments:_,caps:T}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...l};for(let C=0;C<=_+2;C++)for(let w=0;w<=p;w++){const k=Math.PI*2/p*w;if(C<=_){const W=1-C/_,$=(1-W)*x+W*g,X=Math.cos(k)*$,M=-(u/2)+u/_*C,Y=Math.sin(k)*$;a.push(X,M,Y),c.push(w/p,C/_);const oe=new J(Math.cos(k),0,Math.sin(k)).normalize();if(o.push(oe.x,oe.y,oe.z),C<_){const j=p+1;d.push(C*j+w,(C+1)*j+(w+1)%j,C*j+(w+1)%j,C*j+w,(C+1)*j+w,(C+1)*j+(w+1)%j)}}else{if(!T)continue;const W=C-_-1,$=W?x:g,X=Math.cos(k)*$,M=-(u/2)+u*W,Y=Math.sin(k)*$;a.push(X,M,Y),c.push((X+$)*.5/$,(Y+$)*.5/$),o.push(0,-1+W*2,0);const oe=(p+1)*(_+(W+1));w<=p-2&&(W==0?d.push(oe,oe+w,oe+w+1):d.push(oe,oe+w+1,oe+w))}}this.setAttribute("position",new Float32Array(a),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(c),2),this.setAttribute("index",new Uint16Array(d),1)}}class SE extends _o{constructor(l){super();const{width:a,height:o,widthSegments:c,heightSegments:d,floor:u}={width:1,height:1,widthSegments:1,heightSegments:1,...l},x=a/2,g=o/2,p=[],_=[],T=[],C=[];for(let w=0;w<=d;w++)for(let k=0;k<=c;k++){const W=k/c,$=w/d;if(u?(p.push(-x+a*W,0,g-o*$),_.push(0,1,0)):(p.push(-x+a*W,-g+o*$,0),_.push(0,0,1)),T.push(W,$),w>0&&k>0){const X=c+1,M=X*w+k,Y=X*(w-1)+k-1;C.push(M,X*w+k-1,Y,M,Y,X*(w-1)+k)}}this.setAttribute("position",new Float32Array(p),3),this.setAttribute("normal",new Float32Array(_),3),this.setAttribute("uv",new Float32Array(T),2),this.setAttribute("index",new Uint16Array(C),1)}}class wE extends _o{constructor(l){super();const a=[],o=[],c=[],d=[],{radius:u,widthSegments:x,heightSegments:g}={radius:.5,widthSegments:8,heightSegments:8,...l};for(let p=0;p<=g;p++){const _=p/g*Math.PI;for(let T=0;T<=x;T++){const C=T/x*Math.PI*2,w=Math.sin(_)*u,k=Math.cos(C)*w,W=-Math.cos(_)*u,$=-Math.sin(C)*w;a.push(k,W,$),c.push(T/x,p/g);const X=new J(k,W,$).normalize();if(o.push(X.x,X.y,X.z),T<x&&p<g){const M=x+1;d.push(p*M+T,p*M+(T+1)%M,(p+1)*M+(T+1)%M,p*M+T,(p+1)*M+(T+1)%M,(p+1)*M+T)}}}for(let p=0;p<d.length;p++)d[p]=Math.min(a.length/3-1,d[p]);this.setAttribute("position",new Float32Array(a),3),this.setAttribute("normal",new Float32Array(o),3),this.setAttribute("uv",new Float32Array(c),2),this.setAttribute("index",new Uint16Array(d),1)}}class kv extends kn{constructor(a){super(a);b(this,"cameraType");b(this,"fov");b(this,"aspect");b(this,"near");b(this,"far");b(this,"orthWidth");b(this,"orthHeight");b(this,"projectionMatrix");b(this,"viewMatrix");b(this,"projectionMatrixPrev");b(this,"viewMatrixPrev");b(this,"needsUpdateProjectionMatrix");b(this,"displayOut");b(this,"viewPort");this.cameraType="perspective",this.viewMatrix=new ut,this.projectionMatrix=new ut,this.viewMatrixPrev=new ut,this.projectionMatrixPrev=new ut,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.field("fov",()=>this.fov,o=>this.fov=o,{noExport:!0}),this._tag="camera"}updateProjectionMatrix(){this.cameraType=="perspective"?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}beforeRenderImpl(a){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix()}afterRenderImpl(a){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}class RD extends kv{constructor(a){super(a);b(this,"renderTarget");b(this,"viewMatrixOffset");this.renderTarget=null,this.viewMatrixOffset=new Ro().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100}beforeRenderImpl(a){super.beforeRenderImpl(a),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}class Cs extends RD{constructor(a){super(a);b(this,"lightType");b(this,"color");b(this,"intensity");b(this,"castShadow");b(this,"shadowMapSize");b(this,"angle");b(this,"blend");b(this,"distance");b(this,"decay");this.lightType="spot",this.cameraType="perspective",this.color=new J(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new J(1024,1024),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field("intensity",()=>this.intensity,o=>this.intensity=o,{noExport:!0}),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}setShadowMap(a){this.renderTarget=a,this.renderTarget.setSize(this.shadowMapSize)}setShadowMapSize(a){this.shadowMapSize.copy(a),this.renderTarget&&this.renderTarget.setSize(this.shadowMapSize)}lookAt(a){this.entity.lookAt(a),this.entity.quaternion.multiply(new Ro().setFromEuler(new Mv(Math.PI/2)))}}class Ou extends kn{constructor(a){super(a);b(this,"node");b(this,"rotationOffsetX");b(this,"animations");b(this,"uniforms");b(this,"uniformCurves");b(this,"transformAutoUpdate");b(this,"_blidge");b(this,"_cameraComponent");b(this,"_lightComponent");this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=a.args.blidge,this.node=a.args.node,this.node.type=="camera"&&(this.rotationOffsetX=-Math.PI/2);const o=Object.keys(this.node.animations);for(let u=0;u<o.length;u++){const x=o[u];this.animations.set(x,this._blidge.getCurveGroup(this.node.animations[x]))}const c=Object.keys(this.node.material.uniforms);for(let u=0;u<c.length;u++){const x=c[u],g=this.node.material.uniforms[x],p=this._blidge.curveGroups[g];p&&(this.uniformCurves.set(x,p),this.uniforms[x]={type:"4fv",value:p.value})}const d=this.entity;if(d.name=this.node.name,d.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),d.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},"YZX"),d.quaternion.updated=!1,d.euler.setFromQuaternion(d.quaternion),d.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type=="cube"){const u=d.addComponent(kr),x=this.node.param;u.geometry=new bD({width:x.x,height:x.y,depth:x.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type=="sphere"){const u=d.addComponent(kr),x=this.node.param;u.geometry=new wE({radius:x.r,widthSegments:32,heightSegments:16})}else if(this.node.type=="cylinder"){const u=d.addComponent(kr);u.geometry=new ED}else if(this.node.type=="plane"){const u=d.addComponent(kr),x=this.node.param;u.geometry=new SE({width:x.x,height:x.y})}else if(this.node.type=="mesh"){const u=d.addComponent(kr),x=this.node.param,g=new _o;g.setAttribute("position",x.position,3),g.setAttribute("uv",x.uv,2),g.setAttribute("normal",x.normal,3),g.setAttribute("index",x.index,3),u.geometry=g}else if(this.node.type=="gltf"){const u=d.addComponent(kr);this._blidge.gltfPrm.then(x=>{const g=x.scene.findEntityByName(this.node.name);if(g){const p=g.getComponent(kr);p&&(u.geometry=p.geometry,u.material=p.material)}d.noticeEventParent("update/blidge/scene",[d])})}if(this.node.type=="light"){const u=this.node.param;this._lightComponent=d.addComponent(Cs),this._lightComponent.deserialize({...u,lightType:u.type,color:new J().copy(u.color),castShadow:u.shadowMap})}if(this.node.type=="camera"&&(this._cameraComponent=d.getComponentsByTag("camera")[0],this._cameraComponent)){const u=this.node.param;this._cameraComponent.fov=u.fov}d.visible=this.node.visible,this.field("type",()=>this.node.type,void 0,{noExport:!0,readOnly:!0}),this.field("param",()=>JSON.stringify(this.node.param),void 0,{noExport:!0,readOnly:!0})}updateImpl(a){if(!this._blidge||!this.node)return;const o=a.timeCode*this._blidge.frame.fps;if(this.animations.forEach(d=>{d.setFrame(o)}),this.transformAutoUpdate){const d=this.animations.get("position");if(d){const g=d.value;d.getFCurve("x")&&(this.entity.position.x=g.x),d.getFCurve("y")&&(this.entity.position.y=g.y),d.getFCurve("z")&&(this.entity.position.z=g.z)}const u=this.animations.get("rotation");if(u){const g={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},p=u.value;u.getFCurve("x")&&(g.x=p.x),u.getFCurve("y")&&(g.y=p.y),u.getFCurve("z")&&(g.z=p.z),this.entity.quaternion.setFromEuler({x:g.x+this.rotationOffsetX,y:g.y,z:g.z},"YZX")}const x=this.animations.get("scale");if(x){const g=x.setFrame(o).value;x.getFCurve("x")&&(this.entity.scale.x=g.x),x.getFCurve("y")&&(this.entity.scale.y=g.y),x.getFCurve("z")&&(this.entity.scale.z=g.z)}}const c=this.animations.get("hide");if(c&&(this.entity.visible=c.value.x<.5),this._lightComponent){const d=this.animations.get("color");d&&this._lightComponent.color.copy(d.setFrame(o).value)}this.uniformCurves.forEach((d,u)=>{this.uniforms[u].value=d.setFrame(o).value})}}class wi extends As{constructor(a){super();b(this,"name");b(this,"enabled");b(this,"_passes");const o=a||{};this.name=o.name||"",this.enabled=!0,this._passes=a&&a.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(a=>a.enabled)}get output(){for(let a=this._passes.length-1;a>=0;a--){const o=this._passes[a];if(!o.passThrough&&o.enabled)return o.renderTarget}return null}resize(a){if(this._passes)for(let o=0;o<this._passes.length;o++)this._passes[o].resize(a)}dispose(){this.emit("dispose")}}class Pv extends kn{constructor(a){super(a);b(this,"_resolution");b(this,"_postProcesses");b(this,"_postProcessesDict");this._postProcesses=[],this._postProcessesDict=new Map,this._resolution=new J,this.field("postprocess",()=>this._postProcesses.map((o,c)=>o.enabled),o=>{o.forEach((c,d)=>{const u=this._postProcesses[d];u&&(u.enabled=c)})},{format:{type:"array",labels:(o,c)=>this._postProcesses[c].name}})}get postProcesses(){return this._postProcesses}add(a){return this.postProcesses.push(a),a.resize(this._resolution),a}remove(a){const o=this._postProcesses.indexOf(a);o>-1&&this._postProcesses.splice(o,1)}resize(a){this._resolution.copy(a),this.postProcesses.forEach(o=>{o.resize(a)})}}const _D=`#include <common>\r
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
}`,SD=`layout ( location = 0 ) in vec3 position;\r
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
}`;class pt extends La{constructor(a,o){super({...o,frag:o.frag||_D,vert:o.vert||SD});b(this,"enabled");b(this,"renderTarget");b(this,"backBufferOverride");b(this,"clearColor");b(this,"clearDepth");b(this,"resolutionRatio");b(this,"passThrough");b(this,"resolution");b(this,"resolutionInv");b(this,"viewPort");b(this,"_fixedResolution");this.enabled=!0,this._fixedResolution=o.fixedResotluion?o.fixedResotluion.clone():null,this.resolution=new J,this.resolutionInv=new J,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:"2fv"},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:"2fv"},this.renderTarget=o.renderTarget!==void 0?o.renderTarget:new vt(a).setTexture([new $e(a).setting({magFilter:a.LINEAR,minFilter:a.LINEAR})]),this.clearColor=o.clearColor??null,this.clearDepth=o.clearDepth??null,this.depthTest=o.depthTest!==void 0?o.depthTest:!1,this.resolutionRatio=o.resolutionRatio||1,this.passThrough=o.passThrough??!1,this.viewPort=o.viewPort||null,this.backBufferOverride=o.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(a){this._fixedResolution=a,this.resize(a||new J)}onAfterRender(){}resize(a){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(a).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(a){this.renderTarget=a,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}var jt;(h=>{h.assign=(l,...a)=>{for(let o=0;o<a.length;o++)a[o]!=null&&Object.assign(l,a[o]);return l},h.merge=(...l)=>{const a={};return(0,h.assign)(a,...l)}})(jt||(jt={}));class Cv extends kv{constructor(a){super(a);b(this,"dofParams");b(this,"_gl");b(this,"_renderTarget");b(this,"_gBuffer");b(this,"_resolution");this.dofParams={focusDistance:.5,kFilmHeight:.008};const o=a.args.gl;this._gl=o,this._resolution=new J,this._gBuffer=new vt(o),this._gBuffer.setTexture([new $e(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA,magFilter:o.NEAREST,minFilter:o.NEAREST}),new $e(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA}),new $e(o),new $e(o),new $e(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA})]);const c=new vt(o,{disableDepthBuffer:!0});c.setTexture([new $e(o).setting({type:o.FLOAT,internalFormat:o.RGBA16F,format:o.RGBA}),new $e(o).setting({type:o.FLOAT,internalFormat:o.RGBA16F,format:o.RGBA})]);const d=new vt(o,{disableDepthBuffer:!0});d.setDepthTexture(this._gBuffer.depthTexture),d.setTexture([c.textures[0],this._gBuffer.textures[0],this._gBuffer.textures[4]]);const u=new vt(o,{disableDepthBuffer:!0});u.setDepthTexture(this._gBuffer.depthTexture),u.setTexture([new $e(o)]);const x=new vt(o);x.setTexture([new $e(o).setting({type:o.FLOAT,internalFormat:o.RGBA32F,format:o.RGBA,magFilter:o.NEAREST,minFilter:o.NEAREST})]),this._renderTarget={gBuffer:this._gBuffer,shadingBuffer:c,forwardBuffer:d,uiBuffer:u,normalBuffer:x},this.resize(this._resolution)}get resolution(){return this._resolution}get gBuffer(){return this._gBuffer}get renderTarget(){return this._renderTarget}resize(a){a.x==this._resolution.x&&a.y==this._resolution.y||(this._resolution.copy(a),this.aspect=a.x/a.y,this._renderTarget&&(this._renderTarget.gBuffer.setSize(this._resolution),this._renderTarget.shadingBuffer.setSize(this._resolution),this._renderTarget.forwardBuffer.setSize(this._resolution),this._renderTarget.uiBuffer.setSize(this._resolution),this._renderTarget.normalBuffer.setSize(this._resolution)),this.needsUpdateProjectionMatrix=!0)}}const wD=new La;class CE extends kn{constructor(a){super(a);b(this,"material");this.material=a.args||wD,this._tag="materialOverride"}}const CD=`#define PI 3.14159265359\r
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
}`,TD=`struct DirectionalLight {\r
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
}`,ND=`\r
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
}`,AD=`\r
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
  }`,OD=`\r
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
}`,DD=`// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15\r
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
}`,MD=`// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
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
}`,kD=`vec3 N( vec3 pos, float delta ){\r
\r
    return normalize( vec3(\r
		D( vec3( pos.x + delta, pos.y, pos.z ) ).d - D( vec3( pos.x - delta, pos.y, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y + delta, pos.z ) ).d - D( vec3( pos.x, pos.y - delta, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y, pos.z + delta ) ).d - D( vec3( pos.x, pos.y, pos.z - delta ) ).d\r
	) );\r
	\r
}`,PD=`mat2 rotate(float rad) {\r
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
}`,LD=`// https://iquilezles.org/articles/distfunctions/\r
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
`,zD="in vec2 vUv;\rin vec3 vNormal;\rin vec3 vViewNormal;\rin vec3 vPos;\rin vec3 vMVPosition;\rin vec3 vMVPPosition;\rin vec2 vVelocity;\r\runiform mat4 uModelMatrix;\runiform mat4 uModelMatrixInverse;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform vec3 uCameraPosition;\runiform vec2 uResolution;\r\r#ifdef IS_DEPTH\r	uniform float uCameraNear;\r	uniform float uCameraFar;\r#endif\r\r#ifdef IS_DEFERRED\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r	layout (location = 3) out vec4 outColor3;\r	layout (location = 4) out vec4 outColor4;\r#endif\r\r#ifdef IS_FORWARD\r	uniform sampler2D uDeferredTexture;\r	uniform vec2 uDeferredResolution;\r#endif\r\r#if defined(IS_FORWARD) || defined(IS_DEPTH)\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r#endif",UD="vec4 outColor = vec4(1.0);\rvec3 outNormal = normalize(vNormal);\rvec3 outNormalMap = vec3( 0.0 );\rfloat outSSN = 0.0;\rvec3 outEmission = vec3(0.0);\rfloat outRoughness = 0.5;\rfloat outMetalic = 0.0;\rvec3 outPos = vPos;\rfloat outEnv = 1.0;",BD="#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r#endif\r\r#ifdef IS_DEPTH\r	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r	outColor0 = vec4(floatToRGBA( depth_z ));\r#endif\r\r#ifdef IS_DEFERRED\r\r	#ifdef USE_NORMAL_MAP \r\r		vec3 tangent;\r		vec3 bitangent;\r\r		#ifdef USE_TANGENT\r\r			tangent = normalize( vTangent );\r			bitangent = normalize( vBitangent );\r\r		#else\r\r			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r			bitangent = cross(tangent, outNormal);\r\r		#endif\r\r		#ifdef DOUBLE_SIDED\r\r			tangent *= faceDirection;\r			bitangent *= faceDirection;\r			\r		#endif\r\r		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r		outNormal = normalize( vTBN * outNormalMap );\r\r	#endif\r\r	vec4 mvp = uProjectionMatrix * mv;\r	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r	outColor0 = vec4( outPos, outEmission.x );\r	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r	outColor2 = vec4( outColor.xyz, 0.0 );\r	outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );\r	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r#endif\r\r#ifdef IS_FORWARD\r	outColor0 = outColor;\r	outColor1 = vec4(outPos, 1.0);\r	outColor2 = vec4(vVelocity, 0.0, 1.0);\r#endif",FD="vec3 refDir = reflect( -geo.viewDir, geo.normal );\rfloat dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\rfloat EF = mix( fresnel( dNV ), 1.0, mat.metalic );\routColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;\routColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );",VD="Geometry geo = Geometry(\r	outPos,\r	outNormal,\r	0.0,\r	normalize( uCameraPosition - outPos ),\r	vec3( 0.0 ),\r	0.0\r);\r\rMaterial mat = Material(\r	vec3( 1.0 ),\r	outRoughness,\r	outMetalic,\r	outEmission,\r	mix( outColor.xyz, vec3( 0.0, 0.0, 0.0 ), outMetalic ),\r	mix( vec3( 1.0, 1.0, 1.0 ), outColor.xyz, outMetalic ),\r	outEnv\r);\r\routColor.xyz *= 0.0;",ID="// required common, light,\r\rfloat shadow;\r\r// direcitonalLight\r\rLight light;\rLightCamera lightCamera;\r\r#if NUM_LIGHT_DIR > 0 \r\r	DirectionalLight dLight;\r\r	#pragma loop_start NUM_LIGHT_DIR\r\r		dLight = directionalLight[ LOOP_INDEX ];\r		light.direction = dLight.direction;\r		light.color = dLight.color;\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_DIR\r\r			shadow = getShadowSmooth( tex0.xyz, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r		\r		// lighting\r\r		outColor.xyz += RE( geo, mat, light ) * shadow;\r\r	#pragma loop_end\r\r#endif\r\r#if NUM_LIGHT_SPOT > 0\r\r	SpotLight sLight;\r	\r	vec3 spotDirection;\r	float spotDistance;\r	float spotAngleCos;\r	float spotAttenuation;\r	vec3 radiance;\r\r	#pragma loop_start NUM_LIGHT_SPOT\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_SPOT\r\r			shadow = getShadowSmooth( geo.position, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r\r		// lighting\r\r		sLight = uSpotLight[ LOOP_INDEX ];\r\r		spotDirection = normalize(sLight.position - geo.position);\r		spotDistance = length( sLight.position - geo.position );\r		spotAngleCos = dot( sLight.direction, spotDirection );\r		spotAttenuation = 0.0;\r\r		if( spotAngleCos > sLight.angle ) {\r\r			spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );\r\r		}\r\r		light.direction = spotDirection;\r		light.color = sLight.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay );\r\r		radiance = RE( geo, mat, light );\r		outColor.xyz += shadow * radiance;\r\r	#pragma loop_end\r\r#endif",jD="struct SDFResult {\r	float d;\r	vec3 pos;\r	float mat;\r};",HD="vec4 worldNormal = normalize(uModelMatrix * vec4( outNormal, 0.0 ));\rvec4 viewNormal = normalize(uViewMatrix * worldNormal);\routNormal = worldNormal.xyz;\r\rvec4 modelPosition = uModelMatrix * vec4( rayPos, 1.0 );\rvec4 mvpPosition = uProjectionMatrix * uViewMatrix * modelPosition;\routPos = modelPosition.xyz;\rgl_FragDepth =  ( mvpPosition.z / mvpPosition.w ) * 0.5 + 0.5;",GD="vec3 rayPos = ( uModelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;\rvec3 rayDir = normalize( ( uModelMatrixInverse * vec4( normalize( vPos - uCameraPosition ), 0.0 ) ).xyz );",XD="vec3 rayPos = ( uModelMatrixInverse * vec4( uCameraPosition, 1.0 ) ).xyz;\rvec4 clipSpacePos = vec4((gl_FragCoord.xy / uResolution) * 2.0 - 1.0, -1.0, 1.0);\rvec4 viewSpacePos = uProjectionMatrixInverse * clipSpacePos;\rviewSpacePos /= viewSpacePos.w;\rvec3 viewDir = normalize(viewSpacePos.xyz);\rvec3 rayDir = normalize((uViewMatrixInverse * vec4(viewDir, 0.0)).xyz);",WD="uniform float uTime;\runiform float uTimeF;\runiform float uTimeE;\runiform float uTimeEF;",$D="uniform mat4 uModelMatrix;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform mat4 uNormalMatrix;\r\runiform mat4 uModelMatrixPrev;\runiform mat4 uViewMatrixPrev;\runiform mat4 uProjectionMatrixPrev;\r\rout vec2 vUv;\rout vec3 vViewNormal;\rout vec3 vNormal;\rout vec3 vMVPosition;\rout vec3 vMVPPosition;\rout vec3 vPos;\r\rout vec2 vVelocity;\r\rlayout ( location = 0 ) in vec3 position;\rlayout ( location = 1 ) in vec2 uv;\rlayout ( location = 2 ) in vec3 normal;\r\r#ifdef TF_MODELER\r	out vec3 o_position;\r	out vec3 o_normal;\r#endif",YD="vec3 outPos = position;\rvec3 outNormal = normal;\rvec2 outUv = uv;",qD="#ifdef TF_MODELER\r		o_position = outPos;\r		o_normal = outNormal;\r		return;\r#endif\r\rvec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\rvec4 mvPosition = uViewMatrix * modelPosition;\rgl_Position = uProjectionMatrix * mvPosition;\r\rvec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\rvec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\rvec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r\rvUv = outUv;\rvViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\rvNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\rvPos = modelPosition.xyz;\rvMVPosition = mvPosition.xyz;\rvMVPPosition = gl_Position.xyz / gl_Position.w;\r\rvVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\rvVelocity *= 0.2;",QD=(h,l)=>{if(!l)return h;const a=Object.keys(l);let o="";for(let c=0;c<a.length;c++)o+="#define "+a[c]+" "+l[a[c]]+`
`;return o=o+h,o},KD=h=>{const l=new Map([["common",CD],["sdf",LD],["rotate",PD],["random",MD],["noise_simplex",AD],["noise_cyclic",ND],["noise_value",OD],["light",TD],["lighting_light",ID],["lighting_env",FD],["lighting_forwardIn",VD],["vert_h",$D],["vert_in",YD],["vert_out",qD],["frag_h",zD],["frag_in",UD],["frag_out",BD],["rm_h",jD],["rm_normal",kD],["rm_ray_obj",GD],["rm_ray_world",XD],["rm_out_obj",HD],["uni_time",WD],["pmrem",DD]]);return h=h.replace(/#include\s?<([\S]*)>/g,(a,o)=>{let c="",d=l.get(o)||"";return d=d.replace(/#define GLSLIFY .*\n/g,""),c+=d,c}),h},ZD=(h,l)=>(h=h.replaceAll("NUM_LIGHT_DIR",l?l.directional.length.toString():"0"),h=h.replaceAll("NUM_SHADOWMAP_DIR",l?Math.min(2,l.directional.filter(a=>a.component.castShadow).length).toString():"0"),h=h.replaceAll("NUM_LIGHT_SPOT",l?l.spot.length.toString():"0"),h=h.replaceAll("NUM_SHADOWMAP_SPOT",l?Math.min(2,l.spot.filter(a=>a.component.castShadow).length).toString():"0"),h),JD=h=>(h=h.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(l,a,o)=>{let c="";for(let d=0;d<Number(a);d++)c+=o.replaceAll("LOOP_INDEX",d.toString());return c}),h),Tv=(h,l,a)=>(h=QD(h,l),h=`#version 300 es
precision highp float;
`+h,h=KD(h),h=ZD(h,a),h=JD(h),h=h.replace(/#define GLSLIFY .*\n/g,""),h),eM=`#include <common>\r
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
	glFragOut0 = glFragOut1 = vec4( outColor, 1.0 );\r
\r
}`,tM=`#include <common>
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

}`,nM=`#include <common>

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

}`,rM=`#include <common>
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

}`,$b=`#include <common>
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

}`,iM=h=>{const l=[];for(let a=0;a<h;a++){const o=new J;o.x=Math.random()*2-1,o.y=Math.random()*2-1,o.z=a/h*.95+.05,o.normalize(),o.multiply(a/h*.95+.05),l.push(...o.getElm("vec3"))}return l};class aM extends Rn{constructor(a){super();b(this,"timeUniforms_");b(this,"postprocess");b(this,"normalSelector_");b(this,"lightShaft");b(this,"rtLightShaft1");b(this,"rtLightShaft2");b(this,"ssao");b(this,"rtSSAO1");b(this,"rtSSAO2");b(this,"ssaoBlur");b(this,"ssaoBlurUni");b(this,"shading");const o=a.gl,c={uTimeEF:{value:0,type:"1f"}},d=new pt(o,{name:"normalSelector",frag:nM,renderTarget:null,uniforms:jt.merge({uNormalTexture:{value:null,type:"1i"},uPosTexture:{value:null,type:"1i"},uSelectorTexture:{value:null,type:"1i"}}),passThrough:!0}),u=new vt(o).setTexture([new $e(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),x=new vt(o).setTexture([new $e(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),g=new pt(o,{name:"lightShaft",frag:tM,renderTarget:u,uniforms:jt.merge(c,{uLightShaftBackBuffer:{value:x.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"}}),resolutionRatio:.5,passThrough:!0}),p=new vt(o).setTexture([new $e(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),_=new vt(o).setTexture([new $e(o).setting({magFilter:o.LINEAR,minFilter:o.LINEAR})]),T=new pt(o,{name:"ssao",frag:rM,renderTarget:Pr("ssao",p),uniforms:jt.merge(c,{uSSAOBackBuffer:{value:_.textures[0],type:"1i"},uSSAOKernel:{value:iM(16),type:"3fv"}}),resolutionRatio:.5,passThrough:!0}),C=8,w=jt.merge(c,{uSSAOTexture:{value:_.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"},uNormalTexture:{value:null,type:"1i"},uWeights:{type:"1fv",value:od.gaussWeights(C)}}),k=new pt(o,{name:"ssaoBlur/h",frag:Pr("ssaoBlur",$b),uniforms:w,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:C}}),W=new pt(o,{name:"ssaoBlur/v",frag:Pr("ssaoBlur",$b),uniforms:jt.merge(w,{uSSAOTexture:{value:k.renderTarget.textures[0],type:"1i"}}),defines:{SSAOSAMPLE:C,IS_VIRT:""},resolutionRatio:1,passThrough:!0}),$=new pt(o,{name:"deferredShading",frag:Pr("deferredShading",eM),uniforms:jt.merge({uLightShaftTexture:{value:null,type:"1i"},uSSAOTexture:{value:W.renderTarget.textures[0],type:"1i"},uSSAOResolutionInv:{value:T.resolutionInv,type:"2fv"},uEnvMap:{value:a.envMap,type:"1i"}})});this.postprocess=new wi({passes:[d,g,T,k,W,$]}),this.timeUniforms_=c,this.shading=$,this.lightShaft=g,this.ssao=T,this.rtSSAO1=p,this.rtSSAO2=_,this.ssaoBlur=k,this.ssaoBlurUni=w,this.rtLightShaft1=u,this.rtLightShaft2=x,this.normalSelector_=d}update(a){this.timeUniforms_.uTimeEF.value=(this.timeUniforms_.uTimeEF.value+a.timeDelta)%1;let o=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=o,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],o=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=o,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setRenderCamera(a){const o=a.renderTarget;if(o){for(let c=0;c<o.gBuffer.textures.length;c++){let d=o.gBuffer.textures[c];c===1&&(d=o.normalBuffer.textures[0]),this.shading.uniforms["sampler"+c]=this.ssao.uniforms["sampler"+c]={type:"1i",value:d}}this.ssaoBlur.uniforms.uDepthTexture.value=o.gBuffer.textures[0],this.lightShaft.uniforms.uDepthTexture.value=o.gBuffer.depthTexture,this.shading.renderTarget=o.shadingBuffer,this.normalSelector_.renderTarget=o.normalBuffer,this.normalSelector_.uniforms.uNormalTexture.value=o.gBuffer.textures[1],this.normalSelector_.uniforms.uPosTexture.value=o.gBuffer.textures[0],this.normalSelector_.uniforms.uSelectorTexture.value=o.gBuffer.textures[3],this.ssaoBlurUni.uNormalTexture.value=o.normalBuffer.textures[0]}}resize(a){this.postprocess.resize(a)}}const oM=`#include <common>\r
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
}`,sM=`#include <common>\r
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
}`,lM=`#include <common>\r
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
`,uM=`#include <common>

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

}`,cM=`in vec2 vUv;

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

}`,fM=`in vec2 vUv;
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

}`,dM=`in vec2 vUv;
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

}`,mM=`#include <common>\r
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
}`,hM=`#include <common>
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

}`;class pM{constructor(l){b(this,"dofCoc");b(this,"dofBokeh");b(this,"dofComposite");b(this,"rtSSR1");b(this,"rtSSR2");b(this,"postprocess");b(this,"_timeUniforms");b(this,"_ssr");b(this,"_ssComposite");b(this,"_dofParams");b(this,"_motionBlur");b(this,"_motionBlurTile");b(this,"_renderCamera");const a={uTimeEF:{value:0,type:"1f"}},o=new pt(l,{name:"collection",frag:oM}),c=new vt(l).setTexture([new $e(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),d=new vt(l).setTexture([new $e(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),u=new pt(l,{name:"ssr",frag:Pr("ssr",hM),renderTarget:c,uniforms:jt.merge(a,{uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSceneTex:{value:null,type:"1i"},uSSRBackBuffer:{value:d.textures[0],type:"1i"}}),resolutionRatio:.5,passThrough:!0}),x=new pt(l,{name:"ssComposite",frag:Pr("ssComposite",mM),uniforms:jt.merge({uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSSRTexture:{value:d.textures[0],type:"1i"}})}),g=new J(10,.05,20,.05),p=new pt(l,{name:"dof/coc",frag:lM,uniforms:jt.merge(a,{uGbufferPos:{value:null,type:"1i"},uParams:{value:g,type:"4f"}}),renderTarget:new vt(l).setTexture([new $e(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR,internalFormat:l.RGBA16F,type:l.HALF_FLOAT,format:l.RGBA})]),passThrough:!0,resolutionRatio:.5}),_=new pt(l,{name:"dof/bokeh",frag:sM,uniforms:jt.merge(a,{uCocTex:{value:p.renderTarget.textures[0],type:"1i"},uParams:{value:g,type:"4f"}}),renderTarget:new vt(l).setTexture([new $e(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR})]),passThrough:!0,resolutionRatio:.5}),T=new pt(l,{name:"dof/composite",frag:uM,uniforms:jt.merge({uBokeTex:{value:_.renderTarget.textures[0],type:"1i"}}),renderTarget:new vt(l).setTexture([new $e(l).setting({magFilter:l.LINEAR,minFilter:l.LINEAR,internalFormat:l.RGBA16F,type:l.HALF_FLOAT,format:l.RGBA})])}),C=16,w=new pt(l,{name:"motionBlurTile",frag:dM,uniforms:jt.merge({uVelTex:{value:null,type:"1i"}}),renderTarget:new vt(l).setTexture([new $e(l).setting({type:l.FLOAT,internalFormat:l.RGBA32F,format:l.RGBA})]),defines:{TILE:C},resolutionRatio:1/C,passThrough:!0}),k=new pt(l,{name:"motionBlurNeighbor",frag:fM,uniforms:jt.merge({uVelTex:{value:w.renderTarget.textures[0],type:"1i"}}),defines:{TILE:C},renderTarget:new vt(l).setTexture([new $e(l).setting({type:l.FLOAT,internalFormat:l.RGBA32F,format:l.RGBA})]),resolutionRatio:1/C,passThrough:!0}),W=new pt(l,{name:"motionBlur",frag:cM,uniforms:jt.merge({uVelNeighborTex:{value:k.renderTarget.textures[0],type:"1i"},uVelTex:{value:null,type:"1i"},uDepthTexture:{value:null,type:"1i"},uPower:{value:1,type:"1f"}}),defines:{TILE:C}});this.postprocess=new wi({passes:[o,u,x,p,_,T,w,k,W]}),this._timeUniforms=a,this._ssr=u,this._ssComposite=x,this.dofCoc=p,this.dofBokeh=_,this.dofComposite=T,this._motionBlur=W,this._motionBlurTile=w,this._dofParams=g,this.rtSSR1=c,this.rtSSR2=d,this._renderCamera=null}update(l){if(!this._renderCamera)return;this._timeUniforms.uTimeEF.value=(this._timeUniforms.uTimeEF.value+l.timeDelta)%1;const a=this._renderCamera.fov,o=this._renderCamera.dofParams.focusDistance,c=this._renderCamera.dofParams.kFilmHeight,d=c/Math.tan(.5*(a/180*Math.PI)),u=1/this.dofBokeh.renderTarget.size.y*5,x=1/u,g=d*d/(.3*(o-d)*c*2);this._dofParams.set(o,u,x,g);const p=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=p,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(l){this.postprocess.resize(l)}setRenderCamera(l){this._renderCamera=l;const a=l.renderTarget;a&&(this.postprocess.passes[0]&&(this.postprocess.passes[0].backBufferOverride=a.shadingBuffer.textures),this._ssr.uniforms.uGbufferPos.value=a.gBuffer.textures[0],this._ssr.uniforms.uGbufferNormal.value=a.normalBuffer.textures[0],this._ssr.uniforms.uSceneTex.value=a.forwardBuffer.textures[0],this._ssComposite.uniforms.uGbufferPos.value=a.gBuffer.textures[0],this._ssComposite.uniforms.uGbufferNormal.value=a.gBuffer.textures[1],this.dofCoc.uniforms.uGbufferPos.value=a.gBuffer.textures[0],this._motionBlurTile.uniforms.uVelTex.value=a.gBuffer.textures[4],this._motionBlur.uniforms.uVelTex.value=a.gBuffer.textures[4],this._motionBlur.uniforms.uDepthTexture.value=a.gBuffer.depthTexture)}}const vM=`#include <common>

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

}`;class gM extends Rn{constructor(a,o){super();b(this,"postprocess");b(this,"resolution");b(this,"renderTarget");b(this,"pmremPasses");b(this,"swapBuffers");b(this,"timeUniforms");b(this,"postProcessRenderer");const c=o.resolution,d={uTimeEF:{value:0,type:"1f"}},u=new vt(a).setTexture([new $e(a).setting({type:a.FLOAT,internalFormat:a.RGBA16F,format:a.RGBA,magFilter:a.LINEAR,minFilter:a.LINEAR,wrapS:a.CLAMP_TO_EDGE,wrapT:a.CLAMP_TO_EDGE,generateMipmap:!0})]),x=[],g=[],p=[],_=5;let T=0;for(let C=0;C<_;C++){const w=1/Math.pow(2,C),k=c.x*w,W=c.y*w*.5,$=new J(0,T,k,W);T+=W,p.push({rt1:new vt(a).setTexture([new $e(a).setting({type:a.FLOAT,internalFormat:a.RGBA16F,format:a.RGBA})]),rt2:new vt(a).setTexture([new $e(a).setting({type:a.FLOAT,internalFormat:a.RGBA16F,format:a.RGBA})])});let X=1/(_-1)*C;X=X;const M=new pt(a,{renderTarget:p[C].rt1,frag:vM,uniforms:jt.merge(d,{uRoughness:{value:X,type:"1f"},uEnvMap:{value:o.input,type:"1i"},uPMREMBackBuffer:{value:p[C].rt2.textures,type:"1i"},uRenderCount:{value:1,type:"1f"}}),defines:{NUM_SAMPLES:Math.floor(Math.pow(2,C+1))}});M.resize(new J(k,W));const Y=new pt(a,{renderTarget:u,viewPort:$,passThrough:!0});Y.resize(c),x.push(M,Y),g.push(M)}this.postprocess=new wi({passes:x}),this.postprocess.passes[0].backBufferOverride=u.textures,this.resolution=c,this.renderTarget=u,this.pmremPasses=g,this.swapBuffers=p,this.timeUniforms=d,this.postProcessRenderer=null}setPostProcessRenderer(a){this.postProcessRenderer=a}renderProcess(){this.postProcessRenderer?this.postProcessRenderer.renderPostProcess(this.postprocess,void 0,this.resolution):console.warn("PostProcessRenderer has not been set in PMREMRender. Call setPostProcessRenderer first.")}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let a=0;a<this.pmremPasses.length;a++){const o=this.pmremPasses[a],c=this.swapBuffers[a],d=c.rt1;c.rt1=c.rt2,c.rt2=d,o.setRendertarget(c.rt1),o.uniforms.uPMREMBackBuffer.value=c.rt2.textures}}resize(a){}}class yM{constructor(l){b(this,"gl");b(this,"pool");this.gl=l,this.pool=new Map}get(l,a){const o=l+a,c=this.pool.get(o);if(c!==void 0&&c.program)return c;const d=new _E(this.gl);return d.setShader(l,a),this.pool.set(o,d),d}}let id=0;class TE extends ii{constructor(a){super({name:"Renderer"});b(this,"gl");b(this,"resolution");b(this,"_extDisJointTimerQuery");b(this,"programManager");b(this,"_lights");b(this,"_lightsUpdated");b(this,"_envMapCameras");b(this,"_envMapRenderTarget");b(this,"_pmremRender");b(this,"_deferredRenderer");b(this,"_pipelinePostProcess");b(this,"_quad");b(this,"_glStateCahce");b(this,"_queryList");b(this,"_queryListQueued");b(this,"_isCorrentCompiles");b(this,"compileDrawParams");b(this,"_tmpNormalMatrix");b(this,"_tmpModelViewMatrix");b(this,"_tmpViewMatrixInverseMatrix");b(this,"_tmpLightDirection");b(this,"_tmpModelMatrixInverse");b(this,"_tmpProjectionMatrixInverse");this.gl=a,this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new yM(this.gl),this.resolution=new J,this._extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this._lights={directional:[],spot:[]},this._lightsUpdated=!1;const o=new iD(this.gl);this._envMapRenderTarget=new rD(this.gl).setTexture([o]),this._envMapRenderTarget.setSize(256,256);const c=new J(0,0,0),d=new J(0,-1,0),u=[new ut().lookAt(c,new J(1,0,0),d),new ut().lookAt(c,new J(0,1,0),new J(0,0,1)),new ut().lookAt(c,new J(0,0,1),d),new ut().lookAt(c,new J(-1,0,0),d),new ut().lookAt(c,new J(0,-1,0),new J(0,0,-1)),new ut().lookAt(c,new J(0,0,-1),d)];this._envMapCameras=[];for(let x=0;x<6;x++){const g=new ii({name:"envMapCamera/"+x}),p=g.addComponent(kv);p.fov=90,p.near=.1,p.far=1e3,p.aspect=1,g.applyMatrix(u[x].clone()),p.updateViewMatrix(),p.updateProjectionMatrix(),this._envMapCameras.push({entity:g,camera:p})}this._pmremRender=new gM(this.gl,{input:[o],resolution:new J(256*3,256*4)}),this._deferredRenderer=new aM({gl:a,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:o}),this._pipelinePostProcess=new pM(a),this._quad=new SE({width:2,height:2}),this._glStateCahce={},this._queryList=[],this._queryListQueued=[],this._tmpLightDirection=new J,this._tmpModelMatrixInverse=new ut,this._tmpViewMatrixInverseMatrix=new ut,this._tmpProjectionMatrixInverse=new ut,this._tmpModelViewMatrix=new ut,this._tmpNormalMatrix=new ut,this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}getRenderStack(a){const o={camera:[],light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]},c=d=>{const u=d.entity,x=(d.visibility||d.visibility===void 0)&&u.visible,g=u.getComponent(kr);if(g&&x){const T=g.material;T.visibilityFlag.deferred&&o.deferred.push(u),T.visibilityFlag.shadowMap&&o.shadowMap.push(u),T.visibilityFlag.forward&&o.forward.push(u),T.visibilityFlag.ui&&o.ui.push(u),T.visibilityFlag.envMap&&o.envMap.push(u)}const p=u.getComponent(Cv);p&&p.enabled&&o.camera.push(u);const _=u.getComponent(Cs);_&&_.enabled&&x&&o.light.push(u);for(let T=0;T<u.children.length;T++)c({entity:u.children[T],visibility:x});return o};return c({entity:a,visibility:!0}),o}render(a,o){if(a.onBeforeRender(o),this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))this._queryList.forEach(p=>this.gl.deleteQuery(p)),this._queryList.length=0;else{const p=[];if(this._queryListQueued.length>0){const _=this._queryListQueued.length;for(let T=_-1;T>=0;T--){const C=this._queryListQueued[T];if(this.gl.getQueryParameter(C.query,this.gl.QUERY_RESULT_AVAILABLE)){const k=this.gl.getQueryParameter(C.query,this.gl.QUERY_RESULT);p.push({name:C.name,duration:k/1e3/1e3}),this._queryList.push(C.query),this._queryListQueued.splice(T,1)}}}this.emit("timer",[p])}const c=this.getRenderStack(a),d=[],u={},x=Object.keys(this._lights);for(let g=0;g<x.length;g++){const p=x[g];u[p]=this._lights[p].length,this._lights[p]=[]}for(let g=0;g<c.light.length;g++){const p=c.light[g],_=p.getComponent(Cs);_&&(this.collectLight(p,_),_.castShadow&&_.renderTarget&&d.push(p))}this._lights.directional.sort((g,p)=>(g.component.castShadow?0:1)-(p.component.castShadow?0:1)),this._lights.spot.sort((g,p)=>(g.component.castShadow?0:1)-(p.component.castShadow?0:1)),this._lightsUpdated=!1;for(let g=0;g<x.length;g++){const p=x[g];if(u[p]!=this._lights[p].length){this._lightsUpdated=!0;break}}for(let g=0;g<d.length;g++){const p=d[g],_=p.getComponent(Cs);_.renderTarget&&this.renderCamera("shadowMap",p,c.shadowMap,_.renderTarget,this.resolution)}for(let g=0;g<this._envMapCameras.length;g++){const{entity:p}=this._envMapCameras[g];this._envMapRenderTarget.face(g),this.renderCamera("envMap",p,c.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap();for(let g=0;g<c.camera.length;g++){const p=c.camera[g],_=p.getComponent(Cv);if(this.gl.disable(this.gl.BLEND),!_.renderTarget)continue;this.renderCamera("deferred",p,c.deferred,_.renderTarget.gBuffer,this.resolution),this._deferredRenderer.setRenderCamera(_),this.renderPostProcess(this._deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:_.viewMatrix,viewMatrixPrev:_.viewMatrixPrev,projectionMatrix:_.projectionMatrix,projectionMatrixPrev:_.projectionMatrixPrev,cameraMatrixWorld:p.matrixWorld}}),this._deferredRenderer.update(o),this.gl.enable(this.gl.BLEND),this.renderCamera("forward",p,c.forward,_.renderTarget.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:_.renderTarget.shadingBuffer.textures[1],type:"1i"},uDeferredResolution:{value:_.renderTarget.shadingBuffer.size,type:"2fv"},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),this._pipelinePostProcess.setRenderCamera(_),this.renderPostProcess(this._pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:_.viewMatrix,projectionMatrix:_.projectionMatrix,cameraMatrixWorld:p.matrixWorld,cameraNear:_.near,cameraFar:_.far}}),this._pipelinePostProcess.update(o);let T=this._pipelinePostProcess.postprocess.output?this._pipelinePostProcess.postprocess.output:void 0;const C=p.getComponent(Pv);if(C)for(let w=0;w<C.postProcesses.length;w++){const k=C.postProcesses[w];k.enabled&&k.hasOutput&&(this.renderPostProcess(k,T,this.resolution,{cameraOverride:{viewMatrix:_.viewMatrix,projectionMatrix:_.projectionMatrix,cameraMatrixWorld:p.matrixWorld,cameraNear:_.near,cameraFar:_.far}}),T=k.output||void 0)}if(T){this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,T.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,_.renderTarget.uiBuffer.getFrameBuffer());const w=T.size;this.gl.blitFramebuffer(0,0,w.x,w.y,0,0,w.x,w.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}if(this.gl.enable(this.gl.BLEND),this.renderCamera("forward",p,c.ui,_.renderTarget.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:_.renderTarget.shadingBuffer.textures[1],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),_.displayOut){const w=_.renderTarget.uiBuffer;this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,w===null?null:w.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null),this.gl.blitFramebuffer(0,0,this.resolution.x,this.resolution.y,0,0,this.resolution.x,this.resolution.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}}a.onAfterRender(o)}renderCamera(a,o,c,d,u,x){const g=o.getComponentsByTag("camera")[0]||o.getComponent(Cs);x=x||{};const p={viewMatrix:g.viewMatrix,viewMatrixPrev:g.viewMatrixPrev,projectionMatrix:g.projectionMatrix,projectionMatrixPrev:g.projectionMatrixPrev,cameraMatrixWorld:o.matrixWorld,cameraNear:g.near,cameraFar:g.far,renderTarget:d,uniformOverride:x.uniformOverride,...x.cameraOverride};if(g.viewPort){const T=g.viewPort;this.gl.viewport(T.x,T.y,T.z,T.w)}else d?this.gl.viewport(0,0,d.size.x,d.size.y):this.gl.viewport(0,0,u.x,u.y);const _=new J;d?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,d.getFrameBuffer()),this.gl.drawBuffers(d.textureAttachmentList),_.set(d.size.x,d.size.y)):(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),_.set(u.x,u.y)),p.uniformOverride||(p.uniformOverride={}),p.uniformOverride.uResolution={value:_,type:"2fv"},x.disableClear||(a=="shadowMap"?(this.gl.clearColor(1,1,1,1),this.gl.clearDepth(1)):(this.gl.clearColor(0,0,0,1),this.gl.clearDepth(1)),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT));for(let T=0;T<c.length;T++){const C=c[T],w=C.getComponentsByTag("materialOverride")[0],k=C.getComponent(kr),W=w?w.material:k.material,$=k.geometry;p.modelMatrixWorld=C.matrixWorld,p.modelMatrixWorldPrev=C.matrixWorldPrev,p.label=`cam[${g.uuid}]/${C.name||W.name||"-"}`,this.draw(C.uuid,a,$,W,p)}this.emit("drawPass",[d,"camera/"+a])}collectLight(a,o){const c=o.lightType,d={position:new J(0,0,0,1).applyMatrix4(a.matrixWorld),direction:new J(0,1,0,0).applyMatrix4(a.matrixWorld).normalize(),color:new J(o.color.x,o.color.y,o.color.z).multiply(o.intensity*Math.PI),component:o};c=="directional"?this._lights.directional.push(d):c=="spot"&&this._lights.spot.push(d),o.castShadow&&o.renderTarget==null&&o.setShadowMap(new vt(this.gl).setTexture([new $e(this.gl).setting({magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR})]))}renderPostProcess(a,o,c,d){let u=o?o.textures:void 0;if(a.passes)for(let x=0;x<a.passes.length;x++){const g=a.passes[x];if(g.enabled===!1)continue;const p=g.renderTarget;if(g.viewPort){const w=g.viewPort;this.gl.viewport(w.x,w.y,w.z,w.w)}else p?this.gl.viewport(0,0,p.size.x,p.size.y):c&&this.gl.viewport(0,0,c.x,c.y);p?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,p.getFrameBuffer()),this.gl.drawBuffers(p.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);let _=0;g.clearColor&&(this.gl.clearColor(g.clearColor.x,g.clearColor.y,g.clearColor.z,g.clearColor.w),_|=this.gl.COLOR_BUFFER_BIT),g.clearDepth!==null&&(this.gl.clearDepth(g.clearDepth),_|=this.gl.DEPTH_BUFFER_BIT),_!==0&&this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);const T=g.backBufferOverride||u||null;if(T)for(let w=0;w<T.length;w++)g.uniforms["uBackBuffer"+w]={type:"1i",value:T[w]};const C=d&&d.cameraOverride||{};C.label=g.name,C.renderTarget=p,this.draw(g.uuid,"postprocess",this._quad,g,C),g.onAfterRender(),!g.passThrough&&g.renderTarget&&(u=g.renderTarget.textures),this.emit("drawPass",[g.renderTarget,g.name])}}draw(a,o,c,d,u){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:a,renderType:o,geometry:c,material:d,param:{...u}});return}id=0;let x=this.gl.CULL_FACE;const g=this._glStateCahce[x];(g===void 0||g.state!=d.cullFace)&&(d.cullFace?this.gl.enable(x):this.gl.disable(x)),x=this.gl.DEPTH_TEST;const p=this._glStateCahce[x];(p===void 0||p.state!=d.depthTest)&&(d.depthTest?this.gl.enable(x):this.gl.disable(x)),this.gl.depthMask(d.depthWrite);let _=d.programCache[o];if(!_||this._lightsUpdated){const C={...d.defines};o=="deferred"?C.IS_DEFERRED="":o=="forward"||o=="envMap"?C.IS_FORWARD="":o=="shadowMap"&&(C.IS_DEPTH="");const w=Tv(d.vert,C,this._lights),k=Tv(d.frag,C,this._lights);_=this.programManager.get(w,k),d.programCache[o]=_}if(u&&(u.modelMatrixWorld&&(_.setUniform("uModelMatrix","Matrix4fv",u.modelMatrixWorld.elm),_.setUniform("uModelMatrixInverse","Matrix4fv",this._tmpModelMatrixInverse.copy(u.modelMatrixWorld).inverse().elm),u.modelMatrixWorldPrev&&_.setUniform("uModelMatrixPrev","Matrix4fv",u.modelMatrixWorldPrev.elm),u.viewMatrix&&(this._tmpModelViewMatrix.copy(u.modelMatrixWorld).preMultiply(u.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),_.setUniform("uNormalMatrix","Matrix4fv",this._tmpNormalMatrix.elm),_.setUniform("uViewMatrixInverse","Matrix4fv",this._tmpViewMatrixInverseMatrix.copy(u.viewMatrix).inverse().elm))),u.viewMatrix&&(_.setUniform("uViewMatrix","Matrix4fv",u.viewMatrix.elm),u.viewMatrixPrev&&_.setUniform("uViewMatrixPrev","Matrix4fv",u.viewMatrixPrev.elm)),u.projectionMatrix&&(_.setUniform("uProjectionMatrix","Matrix4fv",u.projectionMatrix.elm),_.setUniform("uProjectionMatrixInverse","Matrix4fv",this._tmpProjectionMatrixInverse.copy(u.projectionMatrix).inverse().elm),u.projectionMatrixPrev&&_.setUniform("uProjectionMatrixPrev","Matrix4fv",u.projectionMatrixPrev.elm)),u.cameraMatrixWorld&&(_.setUniform("uCameraMatrix","Matrix4fv",u.cameraMatrixWorld.elm),_.setUniform("uCameraPosition","3f",[u.cameraMatrixWorld.elm[12],u.cameraMatrixWorld.elm[13],u.cameraMatrixWorld.elm[14]])),o!="deferred"&&(u.cameraNear&&_.setUniform("uCameraNear","1f",[u.cameraNear]),u.cameraFar&&_.setUniform("uCameraFar","1f",[u.cameraFar]))),d.useLight&&o!=="deferred"&&o!=="shadowMap"){for(let C=0;C<this._lights.directional.length;C++){const w=this._lights.directional[C];if(_.setUniform("directionalLight["+C+"].direction","3fv",w.direction.getElm("vec3")),_.setUniform("directionalLight["+C+"].color","3fv",w.color.getElm("vec3")),w.component.renderTarget){const k=w.component.renderTarget.textures[0].activate(id++),W=`uDirectionalLightCamera[${C}]`;_.setUniform(W+".near","1fv",[w.component.near]),_.setUniform(W+".far","1fv",[w.component.far]),_.setUniform(W+".viewMatrix","Matrix4fv",w.component.viewMatrix.elm),_.setUniform(W+".projectionMatrix","Matrix4fv",w.component.projectionMatrix.elm),_.setUniform(W+".resolution","2fv",k.size.getElm("vec2")),_.setUniform("directionalLightShadowMap["+C+"]","1i",[k.unit])}}for(let C=0;C<this._lights.spot.length;C++){const w=this._lights.spot[C];u&&u.viewMatrix&&this._tmpLightDirection.copy(w.direction).applyMatrix3(u.viewMatrix);const k=`uSpotLight[${C}]`;if(_.setUniform(k+".position","3fv",w.position.getElm("vec3")),_.setUniform(k+".direction","3fv",w.direction.getElm("vec3")),_.setUniform(k+".color","3fv",w.color.getElm("vec3")),_.setUniform(k+".angle","1fv",[Math.cos(w.component.angle/2)]),_.setUniform(k+".blend","1fv",[w.component.blend]),_.setUniform(k+".distance","1fv",[w.component.distance]),_.setUniform(k+".decay","1fv",[w.component.decay]),w.component.renderTarget){const W=w.component.renderTarget.textures[0].activate(id++),$=`uSpotLightCamera[${C}]`;_.setUniform($+".near","1fv",[w.component.near]),_.setUniform($+".far","1fv",[w.component.far]),_.setUniform($+".viewMatrix","Matrix4fv",w.component.viewMatrix.elm),_.setUniform($+".projectionMatrix","Matrix4fv",w.component.projectionMatrix.elm),_.setUniform($+".resolution","2fv",W.size.getElm("vec2")),_.setUniform("spotLightShadowMap["+C+"]","1i",[W.unit])}}}xM(_,{...d.uniforms,...u&&u.uniformOverride});const T=_.getVAO(a.toString());T&&(c.vaoCache.get(T)||(c.createBuffers(this.gl),c.attributes.forEach((C,w)=>{C.buffer!==void 0&&(w=="index"?T.setIndex(C.buffer):T.setAttribute(w,C.buffer,C.size,C.opt))}),c.vaoCache.set(T,!0)),_.use(C=>{C.uploadUniforms(),this.gl.bindVertexArray(T.getVAO());const w=T.indexBuffer;let k=this.gl.UNSIGNED_SHORT;w&&w.array&&w.array.BYTES_PER_ELEMENT==4&&(k=this.gl.UNSIGNED_INT),d.blending=="NORMAL"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):d.blending=="ADD"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):d.blending=="DIFF"&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);const W=this.gl[d.drawType];let $=null;if($=this._queryList.pop()||null,$==null&&($=this.gl.createQuery()),$&&this.gl.beginQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT,$),T.instanceCount>0?w?this.gl.drawElementsInstanced(W,T.indexCount,k,0,T.instanceCount):this.gl.drawArraysInstanced(W,0,T.vertCount,T.instanceCount):w?this.gl.drawElements(W,T.indexCount,k,0):this.gl.drawArrays(W,0,T.vertCount),$){this.gl.endQuery(this._extDisJointTimerQuery.TIME_ELAPSED_EXT);const X=u&&u.label||"_";this._queryListQueued.push({name:`${o}/${X}/ [${a}]`,query:$})}this.gl.bindVertexArray(null)}))}resize(a){this.resolution.copy(a),this._deferredRenderer.resize(this.resolution),this._pipelinePostProcess.resize(this.resolution)}async compileShaders(a,o,c){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.render(a,o),this._isCorrentCompiles=!1;const d=this.compileDrawParams.length;let u=0;for(let x=0;x<this.compileDrawParams.length;x++){const g=this.compileDrawParams[x],p=g.param.renderTarget;if(p?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,p.getFrameBuffer()),this.gl.drawBuffers(p.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.draw(g.drawId,g.renderType,g.geometry,g.material,g.param),await new Promise(_=>{setTimeout(()=>{_(null)},10)}),c){u++;const _=g.param&&g.param.label||"-",T=`${g.renderType}/${_}/[${g.drawId}]`;c(T,u,d)}}}}const xM=(h,l)=>{const a=Object.keys(l);for(let o=0;o<a.length;o++){const c=a[o],d=l[c];if(!d)continue;const u=d.type,x=d.value,g=[],p=_=>{_!=null&&(typeof _=="number"||typeof _=="boolean"?g.push(_):"isVector"in _?g.push(..._.getElm("vec"+u.charAt(0))):"isTexture"in _?(_.activate(id++),g.push(_.unit)):g.push(..._.elm))};if(Array.isArray(x))for(let _=0;_<x.length;_++)p(x[_]);else p(x);g.length>0&&h.setUniform(c,u,g)}},Yb=new Map,Pr=(h,l)=>{const a=Yb.get(h);return a||(Yb.set(h,l),l)};class Cu{static serializeEntity(l){const a=o=>{const c=[];return o.children.forEach(d=>{d.initiator!="script"&&c.push(a(d))}),{name:o.name,pos:o.position.x==0&&o.position.y==0&&o.position.z==0?void 0:o.position.getElm("vec3"),rot:o.euler.x==0&&o.euler.y==0&&o.euler.z==0?void 0:o.euler.getElm("vec3"),scale:o.scale.x==1&&o.scale.y==1&&o.scale.z==1?void 0:o.scale.getElm("vec3"),childs:c.length>0?c:void 0}};return a(l)}static serializeEntityOverride(l){const a=[];return l.traverse(o=>{const d={path:o.getScenePath(l)},u=[];o.components.forEach(x=>{const g=x.serialize({mode:"export"}),p=Object.keys(g).length>0,_={name:x.constructor.name};!p&&x.initiator!=="user"||(p&&(_.props=g),u.push(_))}),u.length>0&&(d.components=u),!(o.initiator!=="user"&&!d.components)&&a.push(d)}),a}static deserializeOverride(l,a,o){o.traverse(c=>{const d=c.getScenePath(a),u=l.find(x=>x.path==d);u&&(u.components||[]).forEach(x=>{const g=cn.resources.getComponent(x.name);if(g){let p=c.getComponent(g.component);p||(p=c.addComponent(g.component),p.initiator="user"),x.props&&p.deserialize(x.props)}})})}static deserializeEntity(l,a){const o=(c,d)=>{const u=d||new ii;u.initiator="user",u.name=c.name;const x=c.pos||[0,0,0];u.position.x=x[0],u.position.y=x[1],u.position.z=x[2];const g=c.rot||[0,0,0];u.euler.x=g[0],u.euler.y=g[1],u.euler.z=g[2];const p=c.scale||[1,1,1];return u.scale.x=p[0],u.scale.y=p[1],u.scale.z=p[2],c.childs&&c.childs.forEach(_=>{u.add(o(_))}),u};l&&o(l,a),a.initiator="god"}}class bM extends Rn{constructor(){super();b(this,"componentList");b(this,"componentGroups");b(this,"textures");this.componentList=[],this.textures=new Map,this.componentGroups=[]}clear(){this.componentList=[],this.componentGroups=[],this.textures.clear()}getComponent(a){return this.componentList.find(o=>o.name==a)}addComponentGroup(a){let o=this.componentGroups.find(d=>d.name==a);if(o)return o;const c=d=>{const u=[];return{child:u,name:d,addComponent:(x,g)=>{const p={name:x,component:g};u.push(p),this.componentList.push(p)},createGroup:x=>{const g=c(x);return u.push(g),g}}};return o=c(a),this.componentGroups.push(o),o}addTexture(a,o){return this.textures.set(a,o),o}getTexture(a){return this.textures.get(a)}}const Du=class Du extends ii{constructor(a){super();b(this,"enableRender");b(this,"_renderer");b(this,"_gl");b(this,"_canvas");b(this,"_projectCache");b(this,"_root");b(this,"_uniforms");b(this,"_time");b(this,"_frame");b(this,"_frameSetting");b(this,"_disposed");Du.instances.set(a,this),this._gl=a,this.name="OREngine",this._disposed=!1,this._uniforms={uTime:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uEnvMapIntensity:{value:1,type:"1f"}},this._canvas=a.canvas,this._renderer=new TE(a),this._projectCache=null,this.on("update/blidge/scene",c=>{this._projectCache&&Cu.deserializeOverride(this._projectCache.overrides,this._root,c)}),this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this.enableRender=!0,this._root=new ii,this._root.initiator="god",this._root.name="root",this.add(this._root),this.field("name",()=>this.name,c=>this.name=c),this.field("scene",()=>Cu.serializeEntity(this._root),c=>{Cu.deserializeEntity(c,this._root)}),this.field("overrides",()=>Cu.serializeEntityOverride(this._root),c=>{Cu.deserializeOverride(c,this._root,this._root)});const o=this.fieldDir("timeline");o.field("duration",()=>this._frameSetting.duration,c=>this._frameSetting.duration=c),o.field("fps",()=>this._frameSetting.fps,c=>this._frameSetting.fps=c)}static getInstance(a){const o=this.instances.get(a);if(!o)throw new Error("ERROR: NO ENGINE INSTANCE!!!");return o}get gl(){return this._gl}get canvas(){return this._canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}get disposed(){return this._disposed}init(){this._root.remove(this._renderer),this._root.disposeRecursive(),this._root.add(this._renderer),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.add(this._root),this.name="New Project"}async load(a){this.init(),this.deserialize(a),this._projectCache=a||null,this.emit("update/graph"),this.emit("loaded")}update(a){const o=new Date().getTime();this._time.delta=(o-this._time.current)/1e3,this._time.current=o,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*(this._frame.playing?1:0),this._frame.current=this._time.code*60;const c=this.createEntityUpdateEvent({forceDraw:a==null?void 0:a.forceDraw});return this._uniforms.uTime.value=this._time.code,this._uniforms.uTimeE.value=this._time.engine,this._root.update(c),this.enableRender&&this._renderer.render(this._root,c),this._frame.playing&&this.emit("update/frame/play",[this._frame]),this._time.delta}createEntityUpdateEvent(a){const o={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return a?{...o,...a}:o}setSize(a){this._renderer.resize(a),this._canvas.width=a.x,this._canvas.height=a.y}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(a){this._time.code=a/60,this._frame.current=a,this.emit("update/frame/play",[this._frame])}compileShaders(a){const o=this.createEntityUpdateEvent({forceDraw:!0});return this.renderer.compileShaders(this._root,o,a)}dispose(){super.dispose(),this._disposed=!0,this._root.remove(this._renderer),this._root.disposeRecursive()}};b(Du,"resources"),b(Du,"instances");let cn=Du;cn.resources=new bM;cn.instances=new Map;const EM=()=>G.useContext(hE),RM="_compoAdd_5919t_45",_M="_directory_5919t_49",SM="_subDirectory_5919t_70",wM="_picker_5919t_116",sd={compoAdd:RM,directory:_M,subDirectory:SM,picker:wM},NE=({group:h,onClickAdd:l})=>{const a=EM(),[o,c]=G.useState(!1);let d=null,u,x="dir";return h.name.startsWith("_")?null:("child"in h?d=E.jsxDEV(E.Fragment,{children:h.child.map((g,p)=>E.jsxDEV(NE,{group:g,onClickAdd:l},p,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:40,columnNumber:12},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:37,columnNumber:15},void 0):(u=()=>l(h),x="item"),E.jsxDEV("div",{className:sd.directory,onPointerEnter:()=>c(!0),onPointerLeave:()=>c(!1),onClick:u,"data-type":x,"data-direction":a==null?void 0:a.direction,children:[h.name,o&&E.jsxDEV("div",{className:sd.subDirectory,children:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:61,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:52,columnNumber:9},void 0))},CM=h=>{const{pushContent:l,closeAll:a}=Av(),o=cn.resources,c=G.useCallback(d=>{if(!o||!l||!a)return;const u=[],x=g=>{h.entity.addComponent(g.component).initiator="user",a()};o.componentGroups.forEach((g,p)=>{u.push(E.jsxDEV(NE,{group:g,onClickAdd:x},p,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:91,columnNumber:5},void 0))}),l(E.jsxDEV("div",{className:sd.picker,children:u},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:98,columnNumber:4},void 0))},[l,o,h.entity,a]);return E.jsxDEV("div",{className:sd.compAdd,children:E.jsxDEV(Ns,{onClick:c,children:"Add Component"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:107,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentAdd/index.tsx",lineNumber:106,columnNumber:9},void 0)},TM="_cross_nfbq8_45",NM={cross:TM},AM=()=>E.jsxDEV("div",{className:NM.cross,children:E.jsxDEV("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("rect",{x:"5.12",y:"16.832",width:"2.57272",height:"17.6514",transform:"rotate(-135 5.12 16.832)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:7,columnNumber:4},void 0),E.jsxDEV("rect",{x:"3.30078",y:"4.35059",width:"2.57272",height:"17.6514",transform:"rotate(-45 3.30078 4.35059)",fill:"#D9D9D9"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:8,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:6,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Icons/CrossIcon/index.tsx",lineNumber:5,columnNumber:9},void 0),OM="_compoView_xyl36_45",DM="_head_xyl36_52",MM="_name_xyl36_58",kM="_check_xyl36_62",PM="_propertyBlock_xyl36_76",Tu={compoView:OM,head:DM,name:MM,check:kM,delete:"_delete_xyl36_66",propertyBlock:PM},LM=({component:h})=>{Lt(h,"enabled");const l=h.initiator!=="user",a=G.useCallback(c=>{c.stopPropagation();const d=h.entity;d&&d.removeComponentByUUID(h.uuid)},[h]),o=E.jsxDEV("div",{className:Tu.head,children:[E.jsxDEV("div",{className:Tu.name,children:h.constructor.name},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:40,columnNumber:3},void 0),E.jsxDEV("div",{className:Tu.delete,children:E.jsxDEV("button",{onClick:a,children:E.jsxDEV(AM,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:44,columnNumber:36},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:44,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:43,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:36,columnNumber:19},void 0);return E.jsxDEV("div",{className:Tu.compoView,"data-disable_component":l,children:E.jsxDEV("div",{className:Tu.content,children:E.jsxDEV(Ts,{label:o,accordion:!0,bg:!0,defaultClose:!1,children:E.jsxDEV(EE,{target:h},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:51,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:50,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:49,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentView/index.tsx",lineNumber:48,columnNumber:9},void 0)},zM="_container_18572_1",UM={container:zM},BM=({entity:h})=>{const[l]=Lt(h,"components"),a=G.useMemo(()=>{const o=[];return l?(l.forEach(c=>{const d=h.getComponentByUUID(c);d&&o.push(E.jsxDEV(LM,{component:d},d.uuid,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentList/index.tsx",lineNumber:31,columnNumber:5},void 0))}),o):null},[l,h]);return E.jsxDEV("div",{className:UM.container,children:a},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/ComponentList/index.tsx",lineNumber:40,columnNumber:9},void 0)},FM="_property_5puun_45",VM="_content_5puun_50",IM="_name_5puun_54",jM="_component_controls_5puun_60",HM={property:FM,content:VM,name:IM,component_controls:jM},qb=()=>{const{editor:h,engine:l}=za(),[a]=Lt(h,"selectedEntityId"),o=G.useMemo(()=>{if(a)return l.findEntityByUUID(a)},[l,a]);return o?E.jsxDEV("div",{className:HM.container,children:[E.jsxDEV(Ts,{label:"Fields",accordion:!0,children:E.jsxDEV(EE,{target:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:41,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:40,columnNumber:3},void 0),E.jsxDEV(Ts,{label:"Components",accordion:!0,children:[E.jsxDEV(BM,{entity:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:44,columnNumber:4},void 0),E.jsxDEV(CM,{entity:o},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:45,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:43,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/EntityProperty/index.tsx",lineNumber:39,columnNumber:9},void 0):null},AE=G.createContext(null),OE=()=>{const h=G.useContext(AE);if(h===null)throw new Error("useOREngine must be used within a OREngineProvider");return h},GM="_container_q8d38_45",Qb={container:GM},Kb=()=>{const{engine:h}=OE(),l=G.useRef(null);return G.useEffect(()=>{const a=h.renderer;let o=[];const c=u=>{o=u};a.on("timer",c);const d=window.setInterval(()=>{if(l.current===null)return;const u=l.current;u.innerHTML="";let x="";const g=o.reduce((_,T)=>_+T.duration,0);x+=`Total: ${(g.toPrecision(3)+"000").slice(0,4)} ms<br/>`;const p=o.sort((_,T)=>_.name<T.name?1:-1);for(let _=0;_<p.length;_++){const T=p[_],C=(T.duration.toPrecision(3)+"000").slice(0,5),w=`rgb(200 ${(1-T.duration)*200} ${(1-T.duration)*200})`;x+=`<span style="color: ${w}">${C}</span> : 		${T.name}<br/>`}u.innerHTML=x},500);return()=>{a.off("timer",c),window.clearInterval(d)}},[h]),E.jsxDEV("div",{className:Qb.container,children:E.jsxDEV("div",{className:Qb.inner,ref:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/GPUTimer/index.tsx",lineNumber:70,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/GPUTimer/index.tsx",lineNumber:69,columnNumber:9},void 0)},XM="_group_vm37a_45",WM="_submit_vm37a_51",Zb={group:XM,submit:WM},$M=h=>{const l=h.initialValues,a=[],[o,c]=G.useState(l);G.useEffect(()=>{c(l)},[l]);const d=Object.keys(o);for(let x=0;x<d.length;x++){const g=d[x],p=o[g];a.push(E.jsxDEV(Si,{label:g,value:p,onChange:_=>{c({...o,[g]:_})}},x,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:34,columnNumber:18},void 0))}const u=G.useRef(null);return G.useEffect(()=>{setTimeout(()=>{var x;u.current&&((x=u.current.querySelector("input"))==null||x.focus())},0)},[]),E.jsxDEV("div",{className:Zb.group,ref:u,children:E.jsxDEV("form",{onSubmit:x=>{x.preventDefault()},children:[E.jsxDEV(Ts,{label:h.title,noMargin:!0,children:a},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:68,columnNumber:4},void 0),E.jsxDEV("div",{className:Zb.submit,children:E.jsxDEV(Ns,{type:"submit",onClick:()=>{h.onSubmit&&h.onSubmit(o)},children:"OK"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:72,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:71,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:63,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/InputGroup/index.tsx",lineNumber:62,columnNumber:9},void 0)},YM="_picker_lpoad_45",qM="_picker_label_lpoad_58",QM="_picker_list_lpoad_63",KM="_picker_list_inner_lpoad_68",ZM="_item_lpoad_76",Nu={picker:YM,picker_label:qM,picker_list:QM,picker_list_inner:KM,item:ZM},JM=h=>E.jsxDEV("div",{className:Nu.picker,"data-no_bg":h.noBg,children:[h.label&&E.jsxDEV("div",{className:Nu.picker_label,children:h.label},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:18,columnNumber:19},void 0),E.jsxDEV("div",{className:Nu.picker_list,children:E.jsxDEV("div",{className:Nu.picker_list_inner,children:h.list.map((l,a)=>E.jsxDEV("div",{className:Nu.item,onClick:l.onClick,children:l.label},a,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:25,columnNumber:14},void 0))},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:21,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:20,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Picker/index.tsx",lineNumber:16,columnNumber:9},void 0),ek="_node_dzvso_45",tk="_self_dzvso_54",nk="_self_name_dzvso_65",rk="_fold_dzvso_76",ik="_fold_button_dzvso_79",ak="_child_dzvso_92",ok="_child_line_dzvso_95",Eo={node:ek,self:tk,self_name:nk,fold:rk,fold_button:ik,child:ak,child_line:ok},DE=h=>{const{editor:l,engine:a}=za(),[o]=Lt(l,"selectedEntityId"),c=o!==void 0&&a.findEntityByUUID(o),[d]=Lt(h.entity,"children"),u=(d||[]).map(Y=>a.findEntityByUUID(Y)).filter(Y=>Y!==void 0),x=h.depth||0,g=u&&u.concat().sort((Y,oe)=>Y.name.localeCompare(oe.name))||[],p=g.length>0,_=x*20,T=h.entity.initiator=="script",[C,w]=G.useState(!0),k=G.useCallback(Y=>{w(!C),Y.stopPropagation()},[C]),W=G.useCallback(()=>{l&&l.selectEntity(h.entity)},[l,h.entity]),{pushContent:$,closeAll:X}=Av(),M=G.useCallback(Y=>{Y.preventDefault(),!(!l||!$||!X||T)&&(l.selectEntity(h.entity),$(E.jsxDEV(JM,{label:h.entity.name,list:[{label:"Add Entity",onClick:()=>{$(E.jsxDEV($M,{initialValues:{name:""},onSubmit:oe=>{const j=l.createEntity(h.entity,oe.name);l.selectEntity(j),X()}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:75,columnNumber:7},void 0))}},{label:"Delete Entity",onClick:()=>{l.deleteEntity(h.entity),X()}}]},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:69,columnNumber:16},void 0)))},[l,h.entity,$,X,T]);return E.jsxDEV("div",{className:Eo.node,"data-no_export":T,children:[E.jsxDEV("div",{className:Eo.self,style:{paddingLeft:_},onClick:W,onContextMenu:M,"data-selected":c&&c.uuid==h.entity.uuid,children:[E.jsxDEV("div",{className:Eo.fold,"data-hnode_open":C,children:p&&E.jsxDEV("button",{className:Eo.fold_button,onClick:k,children:E.jsxDEV(Nv,{open:C},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:106,columnNumber:87},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:106,columnNumber:18},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:105,columnNumber:4},void 0),E.jsxDEV("div",{className:Eo.self_name,children:E.jsxDEV("p",{children:[h.entity.name||"-"," ",E.jsxDEV("span",{children:["[",h.entity.uuid,"]"]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:109,columnNumber:35},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:109,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:108,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:104,columnNumber:3},void 0),p&&E.jsxDEV("div",{className:Eo.child,"data-open":C,children:[g.map(Y=>E.jsxDEV(DE,{entity:Y,depth:x+1},Y.uuid,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:116,columnNumber:13},void 0)),E.jsxDEV("div",{className:Eo.child_line,style:{marginLeft:_+4}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:120,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:112,columnNumber:16},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/HierarchyNode/index.tsx",lineNumber:103,columnNumber:9},void 0)},sk={},Jb=()=>{const{editor:h}=za(),l=h.engine._root;return E.jsxDEV("div",{className:sk.hierarchy,children:l&&E.jsxDEV(DE,{entity:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/index.tsx",lineNumber:14,columnNumber:18},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Hierarchy/index.tsx",lineNumber:13,columnNumber:9},void 0)},lk="_container_iunxa_1",uk="_row_iunxa_11",Ri={container:lk,row:uk},ck=new J,nt=new Rn,jn=[];for(let h=0;h<8;h++)jn.push({values:new J,btn1:0,btn2:0,valuesLerped:new J,btn1Lerped:0,btn2Lerped:0});const It={btn1:0,btn2:0,btn3:0,btn1Lerped:0,btn2Lerped:0,btn3Lerped:0,master:0,masterLerped:0};class de extends kn{constructor(a){super(a);b(this,"input");b(this,"output");this.input=null,this.output=null;const o=()=>{this._disposed||navigator.requestMIDIAccess().then(u=>{this._disposed||(u.inputs.forEach(x=>{x.name=="MIDI Mix"&&(this.input=x)}),this.input&&(this.input.onmidimessage=this.onMidiMessage.bind(this)),u.outputs.forEach(x=>{x.name=="MIDI Mix"&&(this.output=x)}),this.updateLight())}).catch(u=>{console.error(u)})},c=()=>{this.output&&this.output.close(),this.input&&(this.input.onmidimessage=null,this.input.close())};setTimeout(()=>{o()},100),this.field("reconnect",()=>()=>{c(),o()},void 0,{label:"Reconnect"});const d=(u,x,g)=>{this.onControl(u,x,g)};nt.on("emulateControl",d),this.restore(),this.once("dispose",()=>{c(),nt.off("emulateControl",d)})}static get lines(){return jn}static get side(){return It}static getLine(a){return jn[a]}static emulateControl(a,o,c){nt.emit("emulateControl",[a,o,c])}static on(a,o){nt.on(a,o)}static off(a,o){nt.off(a,o)}onControl(a,o,c){if(a==176&&(16<=o&&o<=31||46<=o&&o<=61)){46<=o&&(o-=14);const d=Math.floor((o-16)/4),u=jn[d].values,x=o%4;x==0?u.x=c:x==1?u.y=c:x==2?u.z=c:u.w=c,nt.emit("value",[de]),nt.emit(`value/${d+1}`,[jn[d]]),nt.emit(`value/${d+1}/${x}`,[c])}if(a==176&&o==62&&(It.master=c,nt.emit("value",[de]),nt.emit("value/master",[It.master])),a==144){const d=Math.floor((o-1)/3);if(d<8){const u=jn[d],x=(o+2)%3==0?1:2;x==1?u.btn1=1-u.btn1:x==2&&(u.btn2=1-u.btn2),nt.emit("btn",[de]),nt.emit(`btn/${d+1}`,[jn[d]]),nt.emit(`btn/${d+1}/${x}`,[x==1?u.btn1:u.btn2])}if(d==8){const u=It;let x=0,g=0;o==25?(u.btn1=1-u.btn1,g=u.btn1,x=1):o==26?(u.btn2=1-u.btn2,g=u.btn2,x=2):o==27&&(u.btn3=1-u.btn3,g=u.btn3,x=3),nt.emit("btn",[de]),nt.emit("btn/side",[It]),nt.emit(`btn/side/${x}`,[g])}this.updateLight()}this.save()}onMidiMessage(a){if(!a.data)return;const o=a.data[0],c=a.data[1],d=a.data[2]/127;this.onControl(o,c,d)}updateLight(){if(!this.output)return;for(let o=0;o<8;o++){const c=jn[o];this.output.send([144,1+o*3,c.btn1*127]),this.output.send([144,3+o*3,c.btn2*127])}const a=It;this.output.send([144,25,a.btn1*127])}updateImpl(a){for(let C=0;C<8;C++){const w=jn[C],k=w.values,W=w.valuesLerped;W.add(ck.copy(k).sub(W).multiply(a.timeDelta*4));const $=w.btn1,X=w.btn1Lerped;w.btn1Lerped+=($-X)*a.timeDelta*4;const M=w.btn2,Y=w.btn2Lerped;w.btn2Lerped+=(M-Y)*a.timeDelta*4}const o=It,c=o.master,d=o.masterLerped;o.masterLerped+=(c-d)*a.timeDelta*4;const u=o.btn1,x=o.btn1Lerped;o.btn1Lerped+=(u-x)*a.timeDelta*4;const g=o.btn2,p=o.btn2Lerped;o.btn2Lerped+=(g-p)*a.timeDelta*4;const _=o.btn3,T=o.btn3Lerped;o.btn3Lerped+=(_-T)*a.timeDelta*4}save(){const a={lines:jn.map(o=>[o.values.getElm("vec4"),o.btn1,o.btn2]),side:[It.btn1,It.btn2,It.btn3,It.master]};localStorage.setItem("MIDIMIX",JSON.stringify(a))}restore(){let a=localStorage.getItem("MIDIMIX");if(a){const o=JSON.parse(a);o.lines.forEach((d,u)=>{jn[u].values.setFromArray(d[0]),jn[u].btn1=d[1],jn[u].btn2=d[2],nt.emit(`value/${u+1}`,[jn[u]]),nt.emit(`value/${u+1}/x`,[d[0][0]]),nt.emit(`value/${u+1}/y`,[d[0][1]]),nt.emit(`value/${u+1}/z`,[d[0][2]]),nt.emit(`value/${u+1}/w`,[d[0][3]]),nt.emit(`btn/${u+u}}`,[jn[u]]),nt.emit(`btn/${u+u}}/1`,[d.btn1]),nt.emit(`btn/${u+u}}/2`,[d.btn2])});const c=o.side;It.btn1=c[0],It.btn2=c[1],It.btn3=c[2],nt.emit("btn/side/1",[It.btn1]),nt.emit("btn/side/2",[It.btn2]),nt.emit("btn/side/3",[It.btn3]),It.master=c[3],nt.emit("value/master",[It.master]),nt.emit("value",[de]),nt.emit("btn",[de]),nt.emit("btn/side",[It])}this.updateLight()}}const tn=h=>E.jsxDEV(yE,{checked:h.value>.5,onChange:l=>{de.emulateControl(144,h.id,l?1:0)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:13,columnNumber:9},void 0),et=h=>E.jsxDEV(Dv,{step:.05,value:h.value,onChange:l=>{de.emulateControl(176,h.id,Math.min(1,Math.max(0,l)))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:23,columnNumber:9},void 0),eE=()=>{const[h,l]=Mu.useState(0);return G.useEffect(()=>{const a=()=>{l(o=>o+1)};return de.on("value",a),de.on("btn",a),()=>{de.off("value",a),de.off("btn",a)}},[]),E.jsxDEV("div",{className:Ri.container,children:[E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:16,value:de.getLine(0).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:58,columnNumber:4},void 0),E.jsxDEV(et,{id:17,value:de.getLine(0).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:59,columnNumber:4},void 0),E.jsxDEV(et,{id:18,value:de.getLine(0).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:60,columnNumber:4},void 0),E.jsxDEV(tn,{id:1,value:de.getLine(0).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:61,columnNumber:4},void 0),E.jsxDEV(tn,{id:2,value:de.getLine(0).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:62,columnNumber:4},void 0),E.jsxDEV(et,{id:19,value:de.getLine(0).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:63,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:57,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:20,value:de.getLine(1).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:66,columnNumber:4},void 0),E.jsxDEV(et,{id:21,value:de.getLine(1).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:67,columnNumber:4},void 0),E.jsxDEV(et,{id:22,value:de.getLine(1).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:68,columnNumber:4},void 0),E.jsxDEV(tn,{id:4,value:de.getLine(1).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:69,columnNumber:4},void 0),E.jsxDEV(tn,{id:5,value:de.getLine(1).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:70,columnNumber:4},void 0),E.jsxDEV(et,{id:23,value:de.getLine(1).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:71,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:65,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:24,value:de.getLine(2).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:74,columnNumber:4},void 0),E.jsxDEV(et,{id:25,value:de.getLine(2).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:75,columnNumber:4},void 0),E.jsxDEV(et,{id:26,value:de.getLine(2).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:76,columnNumber:4},void 0),E.jsxDEV(tn,{id:7,value:de.getLine(2).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:77,columnNumber:4},void 0),E.jsxDEV(tn,{id:8,value:de.getLine(2).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:78,columnNumber:4},void 0),E.jsxDEV(et,{id:27,value:de.getLine(2).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:79,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:73,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:28,value:de.getLine(3).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:82,columnNumber:4},void 0),E.jsxDEV(et,{id:29,value:de.getLine(3).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:83,columnNumber:4},void 0),E.jsxDEV(et,{id:30,value:de.getLine(3).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:84,columnNumber:4},void 0),E.jsxDEV(tn,{id:10,value:de.getLine(3).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:85,columnNumber:4},void 0),E.jsxDEV(tn,{id:11,value:de.getLine(3).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:86,columnNumber:4},void 0),E.jsxDEV(et,{id:31,value:de.getLine(3).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:87,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:81,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:46,value:de.getLine(4).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:90,columnNumber:4},void 0),E.jsxDEV(et,{id:47,value:de.getLine(4).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:91,columnNumber:4},void 0),E.jsxDEV(et,{id:48,value:de.getLine(4).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:92,columnNumber:4},void 0),E.jsxDEV(tn,{id:13,value:de.getLine(4).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:93,columnNumber:4},void 0),E.jsxDEV(tn,{id:14,value:de.getLine(4).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:94,columnNumber:4},void 0),E.jsxDEV(et,{id:49,value:de.getLine(4).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:95,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:89,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:50,value:de.getLine(5).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:98,columnNumber:4},void 0),E.jsxDEV(et,{id:51,value:de.getLine(5).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:99,columnNumber:4},void 0),E.jsxDEV(et,{id:52,value:de.getLine(5).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:100,columnNumber:4},void 0),E.jsxDEV(tn,{id:16,value:de.getLine(5).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:101,columnNumber:4},void 0),E.jsxDEV(tn,{id:17,value:de.getLine(5).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:102,columnNumber:4},void 0),E.jsxDEV(et,{id:53,value:de.getLine(5).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:103,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:97,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:54,value:de.getLine(6).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:106,columnNumber:4},void 0),E.jsxDEV(et,{id:55,value:de.getLine(6).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:107,columnNumber:4},void 0),E.jsxDEV(et,{id:56,value:de.getLine(6).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:108,columnNumber:4},void 0),E.jsxDEV(tn,{id:19,value:de.getLine(6).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:109,columnNumber:4},void 0),E.jsxDEV(tn,{id:20,value:de.getLine(6).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:110,columnNumber:4},void 0),E.jsxDEV(et,{id:57,value:de.getLine(6).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:111,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:105,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(et,{id:58,value:de.getLine(7).values.x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:114,columnNumber:4},void 0),E.jsxDEV(et,{id:59,value:de.getLine(7).values.y},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:115,columnNumber:4},void 0),E.jsxDEV(et,{id:60,value:de.getLine(7).values.z},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:116,columnNumber:4},void 0),E.jsxDEV(tn,{id:22,value:de.getLine(7).btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:117,columnNumber:4},void 0),E.jsxDEV(tn,{id:23,value:de.getLine(7).btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:118,columnNumber:4},void 0),E.jsxDEV(et,{id:61,value:de.getLine(7).values.w},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:119,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:113,columnNumber:3},void 0),E.jsxDEV("div",{className:Ri.row,children:[E.jsxDEV(tn,{id:25,value:de.side.btn1},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:122,columnNumber:4},void 0),E.jsxDEV(tn,{id:26,value:de.side.btn2},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:123,columnNumber:4},void 0),E.jsxDEV(tn,{id:27,value:de.side.btn3},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:124,columnNumber:4},void 0),E.jsxDEV(et,{id:62,value:de.side.master},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:125,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:121,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/MIDIMIXEmu/index.tsx",lineNumber:56,columnNumber:9},void 0)},fk="_project_7nnqy_1",dk="_project_inner_7nnqy_5",mk="_projectSelector_7nnqy_9",hk="_row_7nnqy_13",pk="_rowItem_7nnqy_20",bv={project:fk,project_inner:dk,projectSelector:mk,row:hk,rowItem:pk,export:"_export_7nnqy_30"},tE=()=>{const{editor:h}=za(),[l,a]=Lt(h.engine,"name");return h?E.jsxDEV("div",{className:bv.project,children:E.jsxDEV("div",{className:bv.project_inner,children:E.jsxDEV(Ts,{label:"Project",accordion:!0,children:[E.jsxDEV(ri,{title:"Project Name",children:E.jsxDEV(_v,{value:l||"",onChange:o=>{a(o)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:22,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:21,columnNumber:5},void 0),E.jsxDEV(Ns,{onClick:()=>{h&&h.save()},children:"Save"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:28,columnNumber:5},void 0),E.jsxDEV("div",{className:bv.export,children:E.jsxDEV(Ns,{onClick:()=>{h&&(h.save(),window.open("/player","_blank"))},children:["Export & Play ",E.jsxDEV(Nv,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:48,columnNumber:24},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:37,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:20,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:19,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/ProjectControl/index.tsx",lineNumber:18,columnNumber:9},void 0):null},vk="_container_8wzg2_1",gk={container:vk},yk=()=>{const{engine:h}=za(),l=G.useRef(null);return G.useEffect(()=>{const a=l.current;if(!h||!a)return;const o=h.canvas;if(!o){console.error("Canvas element not found in engine");return}return a.appendChild(o),()=>{a.contains(o)&&a.removeChild(o)}},[h]),E.jsxDEV("div",{className:gk.container,ref:l,role:"presentation","aria-label":"3D Canvas"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Canvas/index.tsx",lineNumber:42,columnNumber:3},void 0)};class xk extends Rn{constructor(){super();b(this,"wrapperElm");b(this,"canvas");b(this,"canvasCtx");b(this,"viewRangeFrame");b(this,"viewPort");b(this,"viewPortRange");b(this,"musicBuffer");b(this,"resizeObserver");b(this,"frameSetting");b(this,"framePlay");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];const a=window.localStorage.getItem("audioViweRange");this.viewRangeFrame=a?Number(a):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){const a=new J(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=a.x,this.canvas.height=a.y}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const a=this.musicBuffer.getChannelData(0),o=1,c=this.viewPortRange[0]/this.frameSetting.fps,d=this.musicBuffer.sampleRate*c,u=d/this.canvas.width,x=this.frameToPx(0);this.canvasCtx.beginPath();for(let g=0;g<d;g+=u){const p=Math.floor(g-x*u),_=a[Math.round(p)]*o,T=g/d*this.canvas.width,C=(_+1)*(this.canvas.height/2);let w=C,k=C;for(let $=0;$<16;$++){const M=(a[Math.round(p+u*($/16))]*o+1)*(this.canvas.height/2);w>M&&(w=M),k<M&&(k=M)}const W=k-w;W>3&&this.canvasCtx.fillRect(T,w,1,W),g==0?this.canvasCtx.moveTo(T,C):this.canvasCtx.lineTo(T,C)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle="#555",this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(a){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=a,this.resizeObserver.observe(a),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(a){this.framePlay=a,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(a){this.viewRangeFrame=a,this.setFramePlaying(this.framePlay),localStorage.setItem("audioViweRange",String(this.viewRangeFrame))}setFrameSetting(a){this.frameSetting=a,this.render()}setMusicBuffer(a){this.musicBuffer=a,this.render()}frameToPx(a){return(a-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}}const bk="_audioView_1iv4u_45",Ek={audioView:bk},Rk=()=>{const{editor:h}=za(),l=G.useRef(null),[a,o]=G.useState();G.useEffect(()=>{const C=new xk;if(o(C),l.current)return C.setWrapperElm(l.current),()=>{C.dispose()}},[]);const c=h&&h.audioBuffer,[d,u]=G.useState(),[x,g]=G.useState({duration:0,fps:0}),[p,_]=G.useState({current:0,playing:!1});G.useEffect(()=>{if(!h)return;const C=h.engine,w=X=>{g({duration:X["timeline/duration"],fps:X["timeline/fps"]})};let k=0;const W=()=>{u(k++)},$=X=>{_({...X})};return w(C.serialize()),$(C._frame),C.on("fields/update",w),C.on("update/music",W),C.on("update/frame/play",$),()=>{C.off("update/frame/setting",w),C.off("update/music",W),C.off("update/frame/play",$)}},[h]),G.useEffect(()=>{a&&c&&a.setMusicBuffer(c)},[a,c,d]),G.useEffect(()=>{a&&p&&a.setFramePlaying(p)},[a,p]),G.useEffect(()=>{a&&x&&a.setFrameSetting(x)},[a,x]);const T=G.useCallback(C=>{if(a){const w=C.deltaY>0?1.1:.9;a.setViewRangeFrame(a.viewRangeFrame*w)}C.preventDefault()},[a]);return G.useEffect(()=>{const C=l.current;return C&&C.addEventListener("wheel",T,{passive:!1}),()=>{C&&C.removeEventListener("wheel",T)}},[T]),E.jsxDEV("div",{className:Ek.audioView,ref:l},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/AudioView/index.tsx",lineNumber:172,columnNumber:9},void 0)},_k="_screen_18s1v_45",Sk="_header_18s1v_53",wk="_header_right_18s1v_68",Ck="_header_item_18s1v_74",Tk="_content_18s1v_82",Nk="_canvas_18s1v_90",Ak="_audioView_18s1v_94",Ok="_externalBtn_18s1v_103",_i={screen:_k,header:Sk,header_right:wk,header_item:Ck,content:Tk,canvas:Nk,audioView:Ak,externalBtn:Ok},nE=()=>{const{editor:h}=za(),[l,a]=Lt(h,"enableRender"),[o,c]=Lt(h,"viewType"),[d,u]=Lt(h,"resolutionScale");return E.jsxDEV("div",{className:_i.screen,children:[E.jsxDEV("div",{className:_i.header,children:E.jsxDEV("div",{className:_i.header_right,children:[E.jsxDEV("div",{className:_i.header_item,children:E.jsxDEV(ri,{title:"Render",children:E.jsxDEV(Si,{value:l,onChange:x=>{a&&a(x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:25,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:24,columnNumber:5},void 0),E.jsxDEV("div",{className:_i.header_item,children:E.jsxDEV(ri,{title:"View",children:E.jsxDEV(Si,{value:o,format:{type:"select",list:["render","debug"]},onChange:x=>{c&&c(x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:39,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:37,columnNumber:5},void 0),E.jsxDEV("div",{className:_i.header_item,children:E.jsxDEV(ri,{title:"Resolution",children:E.jsxDEV(Si,{value:d,format:{type:"select",list:new Array(6).fill(0).map((x,g)=>{const p=Math.pow(2,g),_=1/p,T=_==1?"1":"1/"+p;return{value:_,label:T}})},onChange:x=>{u&&u(x)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:55,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:54,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:53,columnNumber:5},void 0),E.jsxDEV("div",{className:_i.externalBtn,children:E.jsxDEV(Ns,{onClick:()=>{h.openInExternalWindow()},children:E.jsxDEV("svg",{width:"32",height:"12",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[E.jsxDEV("g",{clipPath:"url(#clip0_224_2)",children:[E.jsxDEV("path",{d:"M96 0V416H512V0H96ZM472 376H136V40H472V376Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:86,columnNumber:9},void 0),E.jsxDEV("path",{d:"M40 472V296V136V96H0V512H416V472H376H40Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:87,columnNumber:9},void 0),E.jsxDEV("path",{d:"M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z",fill:"#aaa"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:88,columnNumber:9},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:85,columnNumber:8},void 0),E.jsxDEV("defs",{children:E.jsxDEV("clipPath",{id:"clip0_224_2",children:E.jsxDEV("rect",{width:"512",height:"512",fill:"white"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:92,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:91,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:90,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:84,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:79,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:78,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:23,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:22,columnNumber:3},void 0),E.jsxDEV("div",{className:_i.content,children:[E.jsxDEV("div",{className:_i.canvas,children:E.jsxDEV(yk,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:104,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:103,columnNumber:4},void 0),E.jsxDEV("div",{className:_i.audioView,children:E.jsxDEV(Rk,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:107,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:106,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:102,columnNumber:3},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Screen/index.tsx",lineNumber:21,columnNumber:9},void 0)},ME=G.createContext(null),Dk=()=>{const{editor:h}=za(),[l,a]=G.useState({current:0,playing:!1}),[o,c]=G.useState([0,0,100,0]),d=G.useRef([0,0,0,0]);d.current=o;const u=o[2]-o[0];let x=10*Math.pow(2,0+Math.floor(Math.log2(u/100)));x=Math.max(1,Math.floor(x));const g=h==null?void 0:h.audioBuffer,[p,_]=G.useState();G.useEffect(()=>{if(h){const $=h.engine,X=j=>{a({...j})};X($.frame);let M=0;const Y=()=>{_(M++)},oe=()=>{$.serialize()};return oe(),$.on("update/frame/play",X),$.on("update/music",Y),h.on("loadedProject",oe),()=>{$.off("update/frame/play",X),$.off("update/music",Y),h.off("loadedProject",oe)}}},[h]);const T=G.useCallback($=>{h&&h.engine.seek($)},[h]),C=G.useCallback($=>{const X=o[2]-o[0];return Math.floor(o[0]+X*$)},[o]),w=G.useCallback($=>{const X=d.current,M=(X[2]+X[0])/2,Y=(X[0]-M)*$+M,oe=(X[2]-M)*$+M;c([Y,X[1],oe,X[3]])},[]),k=G.useCallback($=>{const X=d.current,M=$*(X[2]-X[0]);c([X[0]+M,X[1],X[2]+M,X[3]])},[]),W=G.useCallback($=>{const X=d.current,M=X[2]-X[0];c([$-M/2,X[1],$+M/2,X[3]])},[]);return{glEditor:h,framePlay:l,viewPort:o,viewPortScale:x,musicBuffer:g,musicBufferVersion:p,setCurrentFrame:T,getFrameViewPort:C,zoom:w,scroll:k,setViewPortCenter:W}},Mk="_timeline_e42r4_1",kk="_inner_e42r4_6",Pk="_content_e42r4_13",Lk="_setting_e42r4_21",Zf={timeline:Mk,inner:kk,content:Pk,setting:Lk},Os=()=>{const h=G.useContext(ME);if(h===null)throw new Error("useTimeline must be used within a TimelineProvider");return h},zk="_timelineCanvas_12pgc_45",Uk={timelineCanvas:zk},Bk=`#include <common>

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

}`;class Fk extends Rn{constructor(){super();b(this,"wrapperElm");b(this,"glCanvas");b(this,"gl");b(this,"canvasTexture");b(this,"canvas");b(this,"canvasCtx");b(this,"glRenderer");b(this,"postProcess");b(this,"viewPort");b(this,"viewPortRange");b(this,"viewPortScale");b(this,"frameSetting");b(this,"loopSetting");b(this,"musicBuffer");b(this,"musicTexture");b(this,"resizeObserver");b(this,"canvasSize");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.glCanvas=document.createElement("canvas");const a=new RE(this.glCanvas.getContext("webgl2"));this.gl=a.gl,this.canvasSize=new J(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this)),this.glRenderer=new TE(this.gl),this.canvasTexture=new $e(this.gl),this.musicBuffer=null,this.musicTexture=new $e(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new wi({passes:[new pt(this.gl,{frag:Bk,uniforms:{uCanvasTex:{type:"1i",value:null},uMusicTex:{type:"1i",value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){const a=new J(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.glCanvas.width=this.canvas.width=a.x,this.glCanvas.height=this.canvas.height=a.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(a)}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle="#181818";const o=this.frameToPx(0),c=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(o,0,c-o,this.canvas.height)}const a=(o,c,d)=>{let u=Math.ceil(this.viewPort[0]/o)*o;this.canvasCtx.beginPath();let x=0;for(;u<this.viewPort[2]&&x<100;){const g=this.frameToPx(u+c);this.canvasCtx.moveTo(g,0),this.canvasCtx.lineTo(g,this.canvas.height),u+=o,x++}this.canvasCtx.strokeStyle=d,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(a(this.viewPortScale,0,"#555"),a(this.viewPortScale,this.viewPortScale/2,"#333"),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const o=this.musicBuffer.getChannelData(0),c=this.viewPortRange[0]/this.frameSetting.fps,d=this.musicBuffer.sampleRate*c,u=d/this.canvas.width,x=this.frameToPx(0);this.canvasCtx.beginPath();for(let g=0;g<d;g+=u){const p=Math.floor(g-x*u),_=o[Math.round(p)],T=g/d*this.canvas.width,C=(_+1)*(this.canvas.height/2);let w=C,k=C;for(let $=0;$<16;$++){const M=(o[Math.round(p+u*($/16))]+1)*(this.canvas.height/2);w>M&&(w=M),k<M&&(k=M)}const W=k-w;W>3&&this.canvasCtx.fillRect(T,w,1,W),g==0?this.canvasCtx.moveTo(T,C):this.canvasCtx.lineTo(T,C)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle="#0009";const o=this.frameToPx(this.loopSetting.start),c=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,o,this.canvas.height),this.canvasCtx.fillRect(c,0,this.canvas.width-c,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess._passes&&(this.postProcess._passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(a){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=a,this.resizeObserver.observe(a),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(a,o){this.viewPort=a,this.viewPortRange=[a[2]-a[0],a[3]-a[1]],this.viewPortScale=o,this.render()}setFrameSetting(a){this.frameSetting={duration:Math.round(a.duration),fps:Math.round(a.fps)},this.render()}setMusicBuffer(a){this.musicBuffer=a,setTimeout(()=>{this.render()},100)}setLoopSetting(a,o,c){this.loopSetting={enabled:a,start:o,end:c},this.render()}frameToPx(a){return(a-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}}const Vk=()=>{const{viewPort:h,viewPortScale:l,musicBuffer:a,musicBufferVersion:o,glEditor:c}=Os(),[d,u]=G.useState(),x=G.useRef(null);G.useEffect(()=>{const w=new Fk;return u(w),x.current&&w.setWrapperElm(x.current),()=>{w.dispose()}},[]),G.useEffect(()=>{d&&h&&l&&d.setViewPort(h,l)},[d,h,l]);const[g]=Lt(c==null?void 0:c.engine,"timeline/duration"),[p]=Lt(c==null?void 0:c.engine,"timeline/fps");G.useEffect(()=>{d&&g&&p&&d.setFrameSetting({duration:g||0,fps:p||0})},[d,g,p]);const[_]=Lt(c,"frameLoop/enabled"),[T]=Lt(c,"frameLoop/start"),[C]=Lt(c,"frameLoop/end");return G.useEffect(()=>{d&&d.setLoopSetting(_||!1,T||0,C||0)},[d,_,T,C]),G.useEffect(()=>{d&&a&&d.setMusicBuffer(a)},[d,a,o]),E.jsxDEV("div",{className:Uk.timelineCanvas,ref:x},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCanvas/index.tsx",lineNumber:94,columnNumber:9},void 0)},Ik="_controls_n8ed2_45",jk={controls:Ik},Hk=h=>{const{viewPort:l,setCurrentFrame:a,getFrameViewPort:o,zoom:c,scroll:d,setViewPortCenter:u}=Os(),x=G.useRef([0,0,0,0]),g=G.useRef([0,0]);l&&(x.current=l,g.current=[l[2]-l[0],l[3]-l[1]]);const p=G.useRef(null),_=G.useRef(null),T=G.useRef(null),C=G.useRef(null),w=G.useRef(null),k=G.useCallback(X=>{const M=p.current&&p.current.clientWidth||1;if(T.current==0){if(a&&o&&_.current){const Y=(X.clientX-_.current.left)/M;a(o(Y))}}else if(T.current==1){const Y=[X.clientX,X.clientY];if(C.current&&w.current){const oe=-(Y[0]-C.current[0])/M*g.current[0];u&&u(w.current+oe)}}},[a,o,u]),W=G.useCallback(X=>{T.current=X.button,w.current=(x.current[2]+x.current[0])/2,C.current=[X.clientX,X.clientY],_.current=X.currentTarget.getBoundingClientRect();const M=(X.clientX-_.current.left)/X.currentTarget.clientWidth;T.current==0&&a&&o&&a(o(M)),window.addEventListener("pointermove",k);const Y=()=>{C.current=null,T.current=null,w.current=null,window.removeEventListener("pointermove",k)};return window.addEventListener("pointerup",Y),()=>{window.removeEventListener("pointerup",Y),window.removeEventListener("pointermove",k)}},[o,a,k]),$=G.useCallback(X=>{if(T.current!==null||!c||!d)return;X.preventDefault();const M=X.target&&X.target.clientWidth||1,Y=Math.abs(X.deltaY);Math.abs(X.deltaX)<Y?Y>50?c(X.deltaY<0?.9:1.1):c(1+X.deltaY*.005):d(X.deltaX/M*.5)},[c,d]);return G.useEffect(()=>{const X=p.current;return X&&X.addEventListener("wheel",$,{passive:!1}),()=>{X&&X.removeEventListener("wheel",$)}},[$]),l?E.jsxDEV("div",{className:jk.controls,onPointerDown:W,ref:p,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineControls/index.tsx",lineNumber:158,columnNumber:9},void 0):null},Gk="_cursor_2b6c4_45",Xk="_frame_2b6c4_57",rE={cursor:Gk,frame:Xk},Wk=()=>{const{viewPort:h,framePlay:l}=Os();if(!h||!l)return null;const a=h[2]-h[0],o=(l.current-h[0])/a;return E.jsxDEV("div",{className:rE.cursor,style:{left:o*100+"%"},children:E.jsxDEV("div",{className:rE.frame},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCursor/index.tsx",lineNumber:15,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineCursor/index.tsx",lineNumber:14,columnNumber:9},void 0)},$k="_timelineLoop_ly75p_45",Yk="_start_ly75p_54",qk="_end_ly75p_55",Jf={timelineLoop:$k,start:Yk,end:qk},Qk="_cursor_1r72h_45",Kk={cursor:Qk},iE=({onMove:h})=>{const l=G.useRef(!1);return E.jsxDEV("div",{className:Kk.cursor,onPointerDown:a=>{a.buttons==1&&(l.current=!0,a.stopPropagation())},onPointerMove:a=>{const o=a.target;l.current===!1||a.buttons!=1||(o.setPointerCapture(a.pointerId),a.buttons==1&&h&&h(a.clientX),a.nativeEvent.preventDefault(),a.nativeEvent.stopPropagation())},onPointerUp:()=>{l.current=!1}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/TimelineLoopCursor/index.tsx",lineNumber:9,columnNumber:9},void 0)},Zk=()=>{const{viewPort:h,framePlay:l,glEditor:a}=Os(),o=G.useRef(null);Ov(a,["frameLoop/enabled","frameLoop/start","frameLoop/end"]);const[c]=Lt(a,"frameLoop/enabled"),[d,u]=Lt(a,"frameLoop/start"),[x,g]=Lt(a,"frameLoop/end");if(c!==!0||!h||!l||d===void 0||x===void 0)return null;const p=h[2]-h[0],_=(d-h[0])/p,T=(x-h[0])/p,C=(w,k)=>{const W=w.getBoundingClientRect();return(k-W.x)/W.width*(h[2]-h[0])+h[0]};return E.jsxDEV("div",{className:Jf.timelineLoop,ref:o,children:E.jsxDEV("div",{className:Jf.timelineLoop_inner,children:[E.jsxDEV("div",{className:Jf.start,style:{left:_*100+"%"},children:E.jsxDEV(iE,{onMove:w=>{o.current&&u&&u(C(o.current,w))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:45,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:44,columnNumber:4},void 0),E.jsxDEV("div",{className:Jf.end,style:{left:T*100+"%"},children:E.jsxDEV(iE,{onMove:w=>{o.current&&g&&g(C(o.current,w))}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:60,columnNumber:5},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:59,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:43,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineLoop/index.tsx",lineNumber:42,columnNumber:9},void 0)},Jk="_scale_dsq5l_45",eP="_scale_inner_dsq5l_53",tP="_scale_item_dsq5l_58",nP="_scale_item_frame_dsq5l_66",rP="_scale_item_time_dsq5l_71",Au={scale:Jk,scale_inner:eP,scale_item:tP,scale_item_frame:nP,scale_item_time:rP},iP=h=>{const l=("00"+Math.floor(h%3600/60)).slice(-2),a=("00"+Math.floor(h%60)).slice(-2);return`${l}:${a}`},aP=()=>{const{glEditor:h,viewPort:l,viewPortScale:a}=Os(),[o,c]=Lt(h==null?void 0:h.engine,"timeline/fps");if(!l||!a||o===void 0)return null;const d=[];let u=Math.ceil(l[0]/a)*a,x=0;for(;u<l[2]&&x<100;){const g=(u-l[0])/(l[2]-l[0]),p=u/(o||0);d.push(E.jsxDEV("div",{className:Au.scale_item,style:{left:g*100+"%"},children:[E.jsxDEV("div",{className:Au.scale_item_frame,children:u},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:37,columnNumber:5},void 0),E.jsxDEV("div",{className:Au.scale_item_time,children:iP(p)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:40,columnNumber:5},void 0)]},u,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:36,columnNumber:4},void 0)),u+=a,x++}return E.jsxDEV("div",{className:Au.scale,children:E.jsxDEV("div",{className:Au.scale_inner,children:d},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:52,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineScale/index.tsx",lineNumber:51,columnNumber:9},void 0)},oP="_timelineSetting_178ec_45",sP={timelineSetting:oP},lP=()=>{const{framePlay:h,glEditor:l}=Os(),a=G.useCallback((p,_)=>{_&&_(p)},[]),[o,c]=Lt(l,"frameLoop/enabled"),[d,u]=Lt(l==null?void 0:l.engine,"timeline/duration"),[x,g]=Lt(l==null?void 0:l.engine,"timeline/fps");return E.jsxDEV("div",{className:sP.timelineSetting,children:E.jsxDEV(yr,{children:[E.jsxDEV(ri,{title:"current",children:E.jsxDEV(Si,{value:Math.floor((h==null?void 0:h.current)||0),readOnly:!0},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:35,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:34,columnNumber:4},void 0),E.jsxDEV(ri,{title:"duration",children:E.jsxDEV(Si,{value:d,onChange:p=>a(p,u)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:38,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:37,columnNumber:4},void 0),E.jsxDEV(ri,{title:"fps",children:E.jsxDEV(Si,{value:x,onChange:p=>a(p,g)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:41,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:40,columnNumber:4},void 0),E.jsxDEV(ri,{title:"loop",children:E.jsxDEV(Si,{value:o||!1,onChange:p=>a(p,c)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:44,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:43,columnNumber:4},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:33,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/TimelineSetting/index.tsx",lineNumber:32,columnNumber:9},void 0)},aE=()=>{const h=Dk();return E.jsxDEV(ME.Provider,{value:h,children:E.jsxDEV("div",{className:Zf.timeline,children:E.jsxDEV("div",{className:Zf.inner,children:[E.jsxDEV("div",{className:Zf.setting,children:E.jsxDEV(lP,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:20,columnNumber:6},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:19,columnNumber:5},void 0),E.jsxDEV("div",{className:Zf.content,children:[E.jsxDEV(Vk,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:23,columnNumber:6},void 0),E.jsxDEV(Wk,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:24,columnNumber:6},void 0),E.jsxDEV(Hk,{children:E.jsxDEV(Zk,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:26,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:25,columnNumber:6},void 0),E.jsxDEV(aP,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:28,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:22,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:18,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:17,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/Panels/Timeline/index.tsx",lineNumber:16,columnNumber:9},void 0)},uP=`#include <common>\r
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
}`;class cP extends Rn{constructor(a){super();b(this,"_engine");b(this,"_gl");b(this,"_srcFrameBuffer");b(this,"_outFrameBuffer");b(this,"_frameList");b(this,"_enable");b(this,"_resolution");b(this,"_count");b(this,"_total");b(this,"_tile");b(this,"_tilePixelSize");b(this,"_tileInv");b(this,"_focus");b(this,"_uniforms");b(this,"_outPostProcess");b(this,"_elm");b(this,"_labelCanvas");b(this,"_cctx");b(this,"_canvasTexture");this._engine=a,this._gl=a.gl,this._elm=a.canvas,this._srcFrameBuffer=new vt(this._gl,{disableDepthBuffer:!0}),this._outFrameBuffer=new vt(this._gl,{disableDepthBuffer:!0}).setTexture([new $e(this._gl).setting()]),this._enable=!1,this._count=0,this._total=1,this._tile=new J(1,1),this._tilePixelSize=new J(1,1),this._tileInv=new J(1,1),this._focus=null,this._resolution=new J,this._labelCanvas=document.createElement("canvas"),this._cctx=this._labelCanvas.getContext("2d"),this._canvasTexture=new $e(this._gl).attach(this._labelCanvas),this._uniforms={uCanvas:{value:this._canvasTexture,type:"1i"}},this._outPostProcess=new wi({passes:[new pt(this._gl,{uniforms:this._uniforms,renderTarget:null,frag:uP,backBufferOverride:this._outFrameBuffer.textures})]}),this._frameList=[];const o=new J(0,0),c=this.onClick.bind(this),d=g=>{o.set(g.clientX,g.clientY)},u=g=>{const p=new J(g.clientX,g.clientY);o.clone().sub(p).length()<10&&c(g)};this._elm.addEventListener("pointerdown",d),this._elm.addEventListener("pointerup",u);const x=g=>{g.key==="Escape"&&(this._focus=null,this.clear()),g.key=="ArrowRight"&&this._focus!==null&&this._focus++,g.key=="ArrowLeft"&&this._focus!==null&&this._focus--};window.addEventListener("keydown",x),this.once("dispose",()=>{this._elm.removeEventListener("pointerdown",d),this._elm.removeEventListener("pointerup",u),window.removeEventListener("keydown",x)})}calcTilePos(a){const o=a%this._tile.x*this._tileInv.x*this._resolution.x,c=Math.floor(a/this._tile.x)*this._tileInv.y*this._resolution.y;return{x:o,y:c}}push(a,o){for(let c=0;c<a.textures.length;c++){if(this._focus==null||this._focus==this._count){const d=a.textures[c],u="currentFace"in a?a.currentFace:this._gl.TEXTURE_2D;this._srcFrameBuffer.setSize(d.size),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER,this._gl.COLOR_ATTACHMENT0,u,d.getTexture(),0),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,this._outFrameBuffer.getFrameBuffer());let{x,y:g}=this.calcTilePos(this._count);const p=this._tilePixelSize.x,_=this._tilePixelSize.y;this._focus!==null&&(x=0,g=0),this._gl.blitFramebuffer(0,0,a.size.x,a.size.y,x,this._resolution.y-g-_,x+p,this._resolution.y-g,this._gl.COLOR_BUFFER_BIT,this._gl.NEAREST),this._srcFrameBuffer.setTexture([]),this._frameList.push({frameBuffer:a,texture:d,label:o?o+(a.textures.length>1?"_"+c:""):""})}this._count++}this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,null)}draw(){this._cctx.clearRect(0,0,this._resolution.x,this._resolution.y);const a=this._resolution.y/1080;this._cctx.font=`500 ${28*a}px 'Courier New'`,this._cctx.fillStyle="#fff";for(let o=0;o<this._frameList.length;o++){const{x:c,y:d}=this.calcTilePos(o),u=this._frameList[o];this._cctx.fillText(u.label,c+5*a,d+this._tilePixelSize.y-5*a)}this._canvasTexture.attach(this._labelCanvas),this._engine.renderer.renderPostProcess(this._outPostProcess,void 0,this._resolution),this.clear()}clear(){this._total=this._count;const a=Math.sqrt(this._focus!==null?1:this._total);this._tile.set(Math.round(a),Math.ceil(a)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameList=[],this._count=0}reflesh(){this.resize(this._resolution)}resize(a){this._resolution.copy(a),this._outFrameBuffer.setSize(a),this._outPostProcess.resize(a),this._labelCanvas.width=a.x,this._labelCanvas.height=a.y,this._canvasTexture.attach(this._labelCanvas)}onClick(a){if(this._enable){if(this.reflesh(),this._focus===null){const o=new J(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),c=Math.floor(a.offsetX/o.x),d=Math.floor(a.offsetY/o.y);this._focus=c+d*this._tile.x}this.clear()}}set enable(a){this._enable=a,a&&this.reflesh()}get enable(){return this._enable}dispose(){this.emit("dispose")}}class kE extends Rn{constructor(){super();b(this,"pressedKeys");this.pressedKeys={};const a=this.onKeyDown.bind(this),o=this.onKeyUp.bind(this);window.addEventListener("keydown",a),window.addEventListener("keyup",o);const c=()=>{window.removeEventListener("keydown",a),window.removeEventListener("keyup",o)};this.once("dispose",c)}onKeyDown(a){this.pressedKeys[a.key]=!0,this.emit("keydown",[a,this.pressedKeys])}onKeyUp(a){if(this.pressedKeys[a.key]=!1,a.key=="Meta"||a.key=="Control"){const o=Object.keys(this.pressedKeys);for(let c=0;c<o.length;c++)this.pressedKeys[o[c]]=!1}this.emit("keyup",[a,this.pressedKeys])}dispose(){this.emit("dispose")}}class oE extends As{constructor(a){super();b(this,"_engine");b(this,"_keyBoard");b(this,"_selectedEntityId");b(this,"_audioBuffer");b(this,"_frameLoop");b(this,"_resolutionScale");b(this,"_viewType");b(this,"_frameDebugger");b(this,"_externalWindow");b(this,"_externalCanvasBitmapContext");b(this,"_disposed");this._engine=a,this._viewType="render",this._selectedEntityId=null,this._resolutionScale=1,this._externalWindow=null,this._externalCanvasBitmapContext=null,this._disposed=!1,this._keyBoard=new kE,this._keyBoard.on("keydown",(c,d)=>{(d.Meta||d.Control)&&d.s&&(c.preventDefault(),this.save()),c.key==" "&&(this._engine.frame.playing?this._engine.stop():this._engine.play())}),this._frameDebugger=new cP(a),this.engine.renderer.on("drawPass",(c,d)=>{this._frameDebugger&&this._frameDebugger.enable&&c&&this._frameDebugger.push(c,d)}),this._audioBuffer=null,this._engine.on("update/music",c=>{this._audioBuffer=c}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on("update/blidge/frame",c=>{this._engine.seek(c.current),c.playing&&!this._engine.frame.playing?this._engine.play():!c.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field("enableRender",()=>this._engine.enableRender,c=>this._engine.enableRender=c),this.field("resolutionScale",()=>this._resolutionScale,c=>{this._resolutionScale=Number(c),this.resize()}),this.field("viewType",()=>this._viewType,c=>{this._viewType=c,this._viewType==="debug"?this._frameDebugger.enable=!0:this._frameDebugger.enable=!1});const o=this.fieldDir("frameLoop");o.field("enabled",()=>this._frameLoop.enabled,c=>this._frameLoop.enabled=c),o.field("start",()=>this._frameLoop.start,c=>this._frameLoop.start=c),o.field("end",()=>this._frameLoop.end,c=>this._frameLoop.end=c),this.field("selectedEntityId",()=>this._selectedEntityId,c=>{this._selectedEntityId=c}),this.animate()}get engine(){return this._engine}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}animate(){if(!this._disposed){if(this._engine.update(),this._externalCanvasBitmapContext){const a=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(o=>{a.transferFromImageBitmap(o)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start)),this._frameDebugger&&this._frameDebugger.enable&&this._frameDebugger.draw(),window.requestAnimationFrame(this.animate.bind(this))}}selectEntity(a){this.setField("selectedEntityId",a?a.uuid:null)}createEntity(a,o){const c=new ii;return c.name=o,c.initiator="user",a.add(c),c}deleteEntity(a){a.disposeRecursive();const o=a.parent;o&&o.remove(a)}save(){this.emit("save",[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:"export"})}exportEngine(){return this._engine.serialize({mode:"export"})}openInExternalWindow(){if(this._externalWindow=window.open("","_blank"),!this._externalWindow)return;const a=this._externalWindow.document.createElement("canvas");a.style.width="100%",a.style.height="100%",a.style.objectFit="contain",a.style.cursor="none",this._externalWindow.document.body.style.margin="0",this._externalWindow.document.body.style.background="#000",this._externalWindow.document.body.appendChild(a),this._externalCanvasBitmapContext=a.getContext("bitmaprenderer"),this._externalWindow.addEventListener("unload",()=>{this.closeExternalWindow()}),this.resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}resize(){const a=new J(1920,1080).multiply(this._resolutionScale);this.engine.setSize(a),this._frameDebugger.resize(a),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=a.x,this._externalCanvasBitmapContext.canvas.height=a.y)}dispose(){this._disposed=!0,this._keyBoard.dispose(),this._frameDebugger.dispose()}}const fP=()=>{const{engine:h}=OE(),[l,a]=G.useState(()=>new oE(h)),o=Mu.useRef(l);return o.current=l,G.useEffect(()=>{if(!o.current.disposed&&o.current.engine.uuid==h.uuid)return;const c=new oE(h);a(c)},[h]),G.useEffect(()=>()=>{l.dispose()},[l]),{engine:h,editor:l}},dP="_editor_16tun_45",mP="_vert_16tun_51",hP="_horiz_16tun_58",pP="_flex_16tun_62",vr={editor:dP,vert:mP,horiz:hP,flex:pP},vP=h=>{const l=fP();G.useEffect(()=>{if(!(!l.editor||!h.onSave))return l.editor.on("save",h.onSave),()=>{l.editor.off("save",h.onSave)}},[l.editor,h.onSave]),G.useEffect(()=>{!l.editor||!h.editorData||l.editor.deserialize(h.editorData)},[h.editorData,l.editor]);const a=yO(),o=wO();let c=null;return a.isPC?c=E.jsxDEV(E.Fragment,{children:[E.jsxDEV("div",{className:vr.vert,children:[E.jsxDEV("div",{className:`${vr.horiz} ${vr.flex}`,children:[E.jsxDEV("div",{className:vr.vert,style:{width:"300px"},children:[E.jsxDEV("div",{className:vr.flex,children:E.jsxDEV(ka,{children:[E.jsxDEV(yr,{title:"Scene",children:E.jsxDEV(Jb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:69,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:68,columnNumber:10},void 0),E.jsxDEV(yr,{title:"Project",children:E.jsxDEV(tE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:72,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:71,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:67,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:66,columnNumber:8},void 0),E.jsxDEV("div",{style:{height:"20vh"},children:E.jsxDEV(ka,{children:E.jsxDEV(yr,{title:"Timer",noPadding:!0,children:E.jsxDEV(Kb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:79,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:78,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:77,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:76,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:65,columnNumber:7},void 0),E.jsxDEV("div",{className:`${vr.flex}`,children:E.jsxDEV(nE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:85,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:84,columnNumber:7},void 0),E.jsxDEV("div",{style:{width:"300px"},children:E.jsxDEV(ka,{children:E.jsxDEV(yr,{title:"Property",children:E.jsxDEV(qb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:90,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:89,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:88,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:87,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:64,columnNumber:6},void 0),E.jsxDEV("div",{style:{height:"160px"},children:E.jsxDEV(ka,{children:[E.jsxDEV(yr,{title:"Timeline",noPadding:!0,children:E.jsxDEV(aE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:98,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:97,columnNumber:8},void 0),E.jsxDEV(yr,{title:"MIDIMIXEmu",children:E.jsxDEV(eE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:101,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:100,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:96,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:95,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:63,columnNumber:5},void 0),E.jsxDEV(jb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:106,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:62,columnNumber:4},void 0):c=E.jsxDEV("div",{className:vr.editor,children:[E.jsxDEV("div",{className:vr.vert,children:[E.jsxDEV("div",{className:`${vr.flex}`,children:E.jsxDEV(nE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:116,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:115,columnNumber:6},void 0),E.jsxDEV("div",{className:vr.horiz,style:{height:"55vh"},children:[E.jsxDEV("div",{className:vr.vert,style:{width:"45vw"},children:[E.jsxDEV("div",{style:{flex:"1"},children:E.jsxDEV(ka,{children:[E.jsxDEV(yr,{title:"Scene",children:E.jsxDEV(Jb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:123,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:122,columnNumber:10},void 0),E.jsxDEV(yr,{title:"Project",children:E.jsxDEV(tE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:126,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:125,columnNumber:10},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:121,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:120,columnNumber:8},void 0),E.jsxDEV("div",{style:{height:"15vh"},children:E.jsxDEV(ka,{children:E.jsxDEV(yr,{title:"Timer",noPadding:!0,children:E.jsxDEV(Kb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:133,columnNumber:11},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:132,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:131,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:130,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:119,columnNumber:7},void 0),E.jsxDEV("div",{className:`${vr.flex}`,children:E.jsxDEV(ka,{children:E.jsxDEV(yr,{title:"Property",children:E.jsxDEV(qb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:141,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:140,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:139,columnNumber:8},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:138,columnNumber:7},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:118,columnNumber:6},void 0),E.jsxDEV("div",{style:{height:"15vh"},children:E.jsxDEV(ka,{children:[E.jsxDEV(yr,{title:"Timeline",noPadding:!0,children:E.jsxDEV(vO,{fallback:E.jsxDEV("div",{children:"エラーだよ"},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:149,columnNumber:34},void 0),children:E.jsxDEV(aE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:150,columnNumber:10},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:149,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:148,columnNumber:8},void 0),E.jsxDEV(yr,{title:"MIDIMIXEmu",children:E.jsxDEV(eE,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:154,columnNumber:9},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:153,columnNumber:8},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:147,columnNumber:7},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:146,columnNumber:6},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:114,columnNumber:5},void 0),E.jsxDEV(jb,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:159,columnNumber:5},void 0)]},void 0,!0,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:113,columnNumber:4},void 0),E.jsxDEV(vE.Provider,{value:l,children:E.jsxDEV(pE.Provider,{value:o,children:E.jsxDEV("div",{className:vr.editor,children:c},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:167,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:166,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREditor/index.tsx",lineNumber:165,columnNumber:9},void 0)},gP=h=>{const[l,a]=Mu.useState(()=>new cn(h)),o=Mu.useRef(l);o.current=l,G.useEffect(()=>{if(!o.current.disposed)return;const d=new cn(h);a(d)},[h]),G.useEffect(()=>()=>{l.dispose()},[l]);const c=G.useCallback(d=>{l.load(d)},[l]);return{engine:l,load:c}},yP=h=>{const l=gP(h.gl),{engine:a}=l;return G.useEffect(()=>{a.setSize(new J(1920,1080))},[a]),G.useEffect(()=>{h.project?a.load(h.project):a.init()},[a,h.project]),E.jsxDEV(AE.Provider,{value:l,children:h.children},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/packages/orengine/tsx/components/OREngine/index.tsx",lineNumber:34,columnNumber:9},void 0)},xP="draw(Tokyo);",bP=[0,0,0],EP=[0,0,0],RP=[1,1,1],_P={name:"root"},SP=[{path:"/root",components:[{name:"BLidgeClient",props:{mode:"json",gltf:!0,gltfPath:"/scene.glb","websocket/url":"ws://localhost:3100"}},{name:"UniformControls"},{name:"TextureGenerator"}]},{path:"/root/blidgeRoot/Camera",components:[{name:"ShakeViewer",props:{power:.15,speed:1}},{name:"PostProcessPipeline",props:{postprocess:[!0,!0,!0,!0]}},{name:"MainCamera"}]},{path:"/root/blidgeRoot/OREngine",components:[{name:"OREngineLogoMaterial"}]},{path:"/root/blidgeRoot/OREngineCube",components:[{name:"OREngineCubeMaterial"},{name:"ObjectRotate"}]},{path:"/root/blidgeRoot/SkyBox",components:[{name:"SkyBox"}]}],wP={name:xP,position:bP,euler:EP,scale:RP,scene:_P,overrides:SP,"timeline/duration":600,"timeline/fps":60},ws=document.createElement("canvas"),Nt=ws.getContext("webgl2",{antialias:!1}),CP=new RE(Nt),ni={time:{uTime:{value:0,type:"1f"},uTimeF:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uTimeEF:{value:0,type:"1f"}},resolution:{uAspectRatio:{value:1,type:"1f"},uResolution:{value:new J,type:"2f"}},camera:{projectionMatrix:{value:new ut,type:"Matrix4fv"},viewMatrix:{value:new ut,type:"Matrix4fv"}},gBuffer:{uGBufferPos:{value:null,type:"1i"},uGBufferNormal:{value:null,type:"1i"}},tex:{},music:{uMusicFreqTex:{value:null,type:"1i"},uMusicDomainTex:{value:null,type:"1i"}}};class ed extends $e{constructor(a,o){const c=a.gl;super(c);b(this,"material");b(this,"renderer");b(this,"resolution");b(this,"postProcess");b(this,"frameBuffer");this.renderer=a,this.resolution=o.resolution||new J(1024,1024),this.setting({wrapS:c.REPEAT,wrapT:c.REPEAT,magFilter:c.LINEAR,minFilter:c.LINEAR}),this.frameBuffer=new vt(c).setTexture([this]).setSize(this.resolution),this.material=new pt(c,{...o,renderTarget:this.frameBuffer}),this.postProcess=new wi({pipeline:new Pv({entity:new ii}),passes:[this.material]}),this.render()}render(){this.renderer.renderPostProcess(this.postProcess,void 0,this.resolution)}}class TP extends Rn{constructor(){super();b(this,"isTouching");b(this,"element",null);b(this,"position");b(this,"delta");this.position=new J(NaN,NaN),this.delta=new J(NaN,NaN),this.isTouching=!1;const a=this.onPointer.bind(this,"move"),o=this.onPointer.bind(this,"end");window.addEventListener("pointermove",a),window.addEventListener("pointerup",o),window.addEventListener("dragend",o);const c=()=>{this.element&&this.removeElement(this.element),window.removeEventListener("pointermove",a),window.removeEventListener("pointerup",o),window.removeEventListener("dragend",o),this.off("dispose",c)};this.on("dispose",c)}setElement(a){this.element&&this.removeElement(this.element),this.element=a;const o=this.onPointer.bind(this,"start");a.addEventListener("pointerdown",o);const c=d=>{a.isEqualNode(d.elm)&&(a.removeEventListener("pointerdown",o),this.off("unregister",c))};this.on("unregister",c)}removeElement(a){this.emit("unregister",[a])}getScreenPosition(a){if(this.position.x!=this.position.x)return new J(NaN,NaN);const o=this.position.clone().divide(a).multiply(2).sub(1);return o.y*=-1,o}getRelativePosition(a,o){const c=a.getClientRects()[0];let d=this.position.x-c.left,u=this.position.y-c.top;return o&&(d/=c.width,u/=c.height),new J(d,u)}setPos(a,o){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(a-this.position.x,o-this.position.y),this.position.set(a,o)}onPointer(a,o){const c=o.pointerType;c!=null?c=="mouse"&&(o.button==-1||o.button==0)&&this.touchEventHandler(o.pageX,o.pageY,a,o):this.touchEventHandler(o.pageX,o.pageY,a,o)}touchEventHandler(a,o,c,d){let u=!1;const x=a-window.pageXOffset,g=o-window.pageYOffset;c=="start"?(this.isTouching=!0,this.setPos(x,g),this.delta.set(0,0),u=!0):c=="move"?(this.setPos(x,g),this.isTouching&&(u=!0)):c=="end"&&("targetTouches"in d?d.targetTouches.length==0&&(this.isTouching=!1):this.isTouching=!1,u=!0),u&&this.emit(c,[{pointerEvent:d,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit("dispose")}}class PE extends kn{constructor(a){super(a);b(this,"shakePower");b(this,"shakeSpeed");b(this,"shakeMatrix");b(this,"shakeQua");b(this,"cameraComponent");this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new ut,this.shakeQua=new Ro,this.order=1e3,this.field("power",()=>this.shakePower,o=>this.shakePower=o),this.field("speed",()=>this.shakeSpeed,o=>this.shakeSpeed=o)}updateImpl(a){let o=.008*this.shakePower;this.cameraComponent&&(o*=this.cameraComponent.fov/50);const c=a.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(c*2)*o,y:Math.sin(c*2.5)*o,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.entity.matrixWorld.multiply(this.shakeMatrix);const d=this.entity.getComponentsByTag("camera")[0];d&&d.viewMatrix.copy(this.entity.matrixWorld).inverse()}}class ld extends kn{constructor(a){super(a);b(this,"target");b(this,"up");b(this,"entityWorldPos");b(this,"targetWorldPos");this.target=null,this.entityWorldPos=new J,this.targetWorldPos=new J,this.up=new J(0,1,0),this.order=9999}setTarget(a){this.target=a}beforeRenderImpl(a){if(this.target&&this._enabled){this.entity.matrixWorld.decompose(this.entityWorldPos),this.target.matrixWorld.decompose(this.targetWorldPos),this.entity.matrixWorld.lookAt(this.entityWorldPos,this.targetWorldPos,this.up);const o=this.entity.getComponentsByTag("camera")[0];o&&o.viewMatrix.copy(this.entity.matrixWorld).inverse()}}}class LE extends kn{constructor(a){super(a);b(this,"keyborad_");b(this,"_pointer");b(this,"orbit_");b(this,"mouseVelOrbit_");b(this,"mouseVelMove_");b(this,"eye_");b(this,"target_");b(this,"up_");b(this,"lookatMatrix_");b(this,"distance_");b(this,"distanceVel_");b(this,"_memPos");b(this,"_memTarget");b(this,"elmDisposer");this._pointer=new TP,this.keyborad_=new kE,this.orbit_=new J,this.mouseVelOrbit_=new J,this.mouseVelMove_=new J,this.target_=new J,this.eye_=new J,this.up_=new J(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new ut,this._memPos=new J,this._memTarget=new J,this.order=999;let o=!1;const c=x=>{o||(o=!0)},d=x=>{if(!o)return;const g={x:x.delta.x*1,y:x.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(g):this.mouseVelOrbit_.add(g),x.pointerEvent.preventDefault(),x.pointerEvent.stopPropagation()},u=x=>{o&&(o=!1)};this._pointer.on("move",d),this._pointer.on("start",c),this._pointer.on("end",u),this.once("dispose",()=>{this._pointer.off("move",d),this._pointer.off("start",c),this._pointer.off("end",u)}),this.setPosition(this.entity.position,this.target_)}set enabled(a){if(this._enabled=a,a){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);const o=this.entity.getComponent(ld);o&&o.target&&this.setPosition(this.entity.position,o.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}setElm(a){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(a);const o=c=>{c.preventDefault(),this.distanceVel_+=c.deltaY};a.addEventListener("wheel",o),this.elmDisposer=()=>{a.removeEventListener("wheel",o)}}calc(a){const o=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new ut().makeRotationAxis({x:1,y:0,z:0},Math.min(o,Math.max(-o,this.orbit_.x)))),this.eye_.applyMatrix3(new ut().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(a.position,a.quaternion,a.scale)}updateImpl(a){const o=new J(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);o.applyMatrix3(this.entity.matrix),this.target_.add(o),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);const c=Math.max(0,1-a.timeDelta*10);this.mouseVelOrbit_.multiply(c),this.mouseVelMove_.multiply(c),this.distanceVel_*=c,this.calc(this.entity)}setPosition(a,o){if(this.eye_.copy(a),this.target_.copy(o),this.entity){const c=this.entity.parent;c&&(c.updateMatrix(!0),this.target_.applyMatrix4(c.matrixWorld.clone().inverse()))}this.orbit_.x=Math.atan2(this.eye_.y-this.target_.y,new J(this.eye_.x,this.eye_.z).length()-new J(this.target_.x,this.target_.z).length()),this.orbit_.y=-Math.atan2(this.eye_.x-this.target_.x,this.eye_.z-this.target_.z),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0)}dispose(){super.dispose(),this._pointer.dispose()}}const NP=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

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
  
}`,AP=`uniform sampler2D uSrcTexture1;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uSrcTexture1, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`,OP=`#include <common>

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

}`;class DP extends wi{constructor(l){const o=[],c=[];for(let _=0;_<4;_++)o.push(new vt(Nt).setTexture([new $e(Nt).setting({magFilter:Nt.LINEAR,minFilter:Nt.LINEAR})])),c.push(new vt(Nt).setTexture([new $e(Nt).setting({magFilter:Nt.LINEAR,minFilter:Nt.LINEAR})]));let d=2;const u=new pt(Nt,{name:"bloom/bright/",frag:AP,passThrough:!0,uniforms:{uSrcTexture1:{value:l,type:"1i"},uThreshold:{value:1.8,type:"1f"},uBrightness:{value:1,type:"1f"}},resolutionRatio:1/d}),x=[];let g=u.renderTarget.textures;for(let _=0;_<4;_++){const T=o[_],C=c[_],w=8,k={name:"bloom/blur/"+_+"/v",renderTarget:T,frag:NP,uniforms:{uBackBlurTex:{value:g,type:"1i"},uIsVertical:{type:"1i",value:!0},uWeights:{type:"1fv",value:od.gaussWeights(w)},uBlurRange:{value:2,type:"1f"}},defines:{GAUSS_WEIGHTS:w.toString(),USE_BACKBLURTEX:""},passThrough:!0,resolutionRatio:1/d};x.push(new pt(Nt,k)),x.push(new pt(Nt,{...k,name:"bloom/blur/"+_+"/h",renderTarget:C,uniforms:{...k.uniforms,uBackBlurTex:{value:T.textures[0],type:"1i"},uIsVertical:{type:"1i",value:!1}}})),g=C.textures,d*=2}const p=new pt(Nt,{name:"bloom/composite/",frag:OP,uniforms:{uBloomTexture:{value:c.map(_=>_.textures[0]),type:"1iv"}}});super({name:"Bloom",passes:[u,...x,p]})}get threshold(){return this.passes[0].uniforms.uThreshold.value}set threshold(l){this.passes[0].uniforms.uThreshold.value=l}get brightness(){return this.passes[0].uniforms.uBrightness.value}set brightness(l){this.passes[0].uniforms.uBrightness.value=l}}const MP=`#include <common>\r
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
}`;class kP extends wi{constructor(){super({name:"ColorGrading",passes:[new pt(Nt,{frag:MP})]})}}const PP=`#include <common>\r
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
}`;class LP extends wi{constructor(){super({name:"Finalize",passes:[new pt(Nt,{frag:PP})]})}}const zP=`uniform sampler2D uBackBuffer0;\r
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
}`;class UP extends wi{constructor(){super({name:"FXAA",passes:[new pt(Nt,{name:"fxaa",frag:zP})]})}}const zE=new Rn;new Promise(h=>{zE.once("createdCamera",l=>{h(l)})});class BP extends kn{constructor(a){super(a);b(this,"renderCamera");b(this,"_commonUniforms");b(this,"_renderTarget");b(this,"_lookAt");b(this,"_orbitControls");b(this,"postProcessPipeline");b(this,"_resolution");b(this,"_resolutionInv");b(this,"_tmpVector1");b(this,"_tmpVector2");b(this,"_dofTarget");this._resolution=new J,this._resolutionInv=new J,this._commonUniforms=jt.merge({uResolution:{type:"2f",value:this._resolution},uResolutionInv:{type:"2f",value:this._resolutionInv}}),this.renderCamera=this.entity.addComponent(Cv,{gl:Nt}),this._renderTarget=this.renderCamera.renderTarget,this._lookAt=this.entity.addComponent(ld),this.entity.addComponent(PE),zE.emit("createdCamera",[this.renderCamera]),this.postProcessPipeline=this.entity.addComponent(Pv),this.postProcessPipeline.add(new UP);const o=this.postProcessPipeline.add(new DP(this.renderCamera.renderTarget.shadingBuffer.textures[0]));o.threshold=1,o.brightness=1,this.postProcessPipeline.add(new kP),this.postProcessPipeline.add(new LP),this._dofTarget=null,this._tmpVector1=new J,this._tmpVector2=new J;const c=x=>{const g=x.findEntityByName("Camera")||null,p=g==null?void 0:g.getComponent(Ou),_=this.entity.getComponent(Ou);p&&_&&(p.transformAutoUpdate=_.transformAutoUpdate);const T=x.findEntityByName("CamLook")||null;this._lookAt.setTarget(T),this._dofTarget=x.findEntityByName("CamDof")||null};this.entity.on("sceneCreated",c),this.once("dispose",()=>{this.entity.off("sceneCreated",c)});{this._orbitControls=void 0,this._orbitControls=this.entity.addComponent(LE),this._orbitControls.setElm(ws),this._orbitControls.enabled=!1;const x=C=>{this._orbitControls&&(this._orbitControls.enabled=C);const w=this._entity.getComponent(Ou),k=this._entity.getComponent(ld);w&&(w.transformAutoUpdate=!C),k&&(k.enabled=!C)},g=C=>{if(this._orbitControls&&this._orbitControls.enabled)return;C.target.setPointerCapture(C.pointerId),x(!0)},p=()=>{this._orbitControls&&this._orbitControls.enabled||x(!0)},_=C=>{C.key==="Escape"&&x(!1)};ws.addEventListener("pointerdown",g),ws.addEventListener("wheel",p),window.addEventListener("keydown",_);const T=()=>{ws.removeEventListener("pointerdown",g),ws.removeEventListener("wheel",p),window.removeEventListener("keydown",_)};this.once("dispose",T)}ni.gBuffer.uGBufferPos.value=this.renderCamera.gBuffer.textures[0],ni.gBuffer.uGBufferNormal.value=this.renderCamera.gBuffer.textures[1];const d=this.entity.getRootEntity(),u=d.findEntityByName("CamLook")||null;this._lookAt.setTarget(u),this._dofTarget=d.findEntityByName("CamDof")||null}updateImpl(a){this.resize(a.resolution),this.updateCameraParams(),this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget&&this._dofTarget.matrixWorld.decompose(this._tmpVector2),this.renderCamera.dofParams.focusDistance=this._tmpVector1.sub(this._tmpVector2).length()}resize(a){a.x==this._resolution.x&&a.y==this._resolution.y||(this._resolution.copy(a),this._resolutionInv.set(1/a.x,1/a.y,0,0),this.renderCamera.resize(this._resolution),this.postProcessPipeline.resize(a),this.updateCameraParams())}updateCameraParams(){this.renderCamera.aspect=this._resolution.x/this._resolution.y,this.renderCamera.needsUpdateProjectionMatrix=!0}}const FP=`#version 300 es\r
void main( void ) {}\r
`,VP=`#include <common>\r
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
}`,UE=85,td=60*(8*2/UE);class IP extends kn{constructor(a){super(a);b(this,"power");b(this,"gl");b(this,"isAudioBufferReady",!1);b(this,"audioContext");b(this,"audioBuffer");b(this,"implusBuffer");b(this,"audioSrcNode");b(this,"convolverNode");b(this,"gainNode");b(this,"bufferLength");b(this,"blockLength");b(this,"numSampleBlocks");b(this,"bufferIn");b(this,"bufferL");b(this,"bufferR");b(this,"tmpOutputArrayL");b(this,"tmpOutputArrayR");b(this,"progress");b(this,"timeCode",0);b(this,"playStartTime",-1);b(this,"forcePlay",!1);b(this,"realtimeAnalyzer");b(this,"realtimeDataSize");b(this,"timeDomainArray");b(this,"timeDomainTexture");b(this,"frequencyArray");b(this,"frequencyTexture");b(this,"currentRender");this.power=CP,this.gl=this.power.gl,this.audioSrcNode=null,this.audioContext=new AudioContext,this.bufferLength=Math.floor(this.audioContext.sampleRate*td),this.progress=[0,0],this.blockLength=Math.min(512*512,this.bufferLength),this.numSampleBlocks=Math.ceil(this.audioContext.sampleRate*td/this.blockLength),this.tmpOutputArrayL=new Float32Array(this.blockLength),this.tmpOutputArrayR=new Float32Array(this.blockLength),this.audioBuffer=this.audioContext.createBuffer(2,this.bufferLength,this.audioContext.sampleRate),this.bufferIn=new rd(this.gl),this.bufferIn.setData(new Float32Array(new Array(this.blockLength).fill(0).map((o,c)=>c)),"vbo"),this.bufferL=new rd(this.gl),this.bufferL.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.bufferR=new rd(this.gl),this.bufferR.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.currentRender=this.render(),this.implusBuffer=this.audioContext.createBuffer(2,this.audioContext.sampleRate*1.5,this.audioContext.sampleRate);for(let o=0;o<this.implusBuffer.length;o++){const c=o/this.implusBuffer.length;this.implusBuffer.getChannelData(0)[o]=(Math.random()*2-1)*.9*Math.exp(-c*5),this.implusBuffer.getChannelData(1)[o]=(Math.random()*2-1)*.9*Math.exp(-c*5)}this.convolverNode=this.audioContext.createConvolver(),this.convolverNode.buffer=this.implusBuffer,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=1.3,this.realtimeDataSize=2048,this.realtimeAnalyzer=this.audioContext.createAnalyser(),this.realtimeAnalyzer.fftSize=this.realtimeDataSize,this.timeDomainArray=new Uint8Array(this.realtimeAnalyzer.fftSize),this.timeDomainTexture=new $e(this.gl),this.timeDomainTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.frequencyArray=new Uint8Array(this.realtimeAnalyzer.frequencyBinCount),this.frequencyTexture=new $e(this.gl),this.frequencyTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}static get key(){return"music"}render(){this.progress=[0,0],this.currentRender&&this.currentRender.stop(),this.stop(),this.isAudioBufferReady=!1;const a=new _E(this.gl),o=new aD(this.gl);o.setBuffer("left",this.bufferL,0),o.setBuffer("right",this.bufferR,1),o.bind(()=>{a.setShader(Tv(Pr("music",VP)),FP,{transformFeedbackVaryings:["o_left","o_right"]})}),a.setUniform("uDuration","1f",[td]),a.setUniform("uBPM","1f",[UE]),a.setUniform("uSampleRate","1f",[this.audioContext.sampleRate]);const c=a.getVAO();let d=!0;const u=()=>{d=!1};if(c){c.setAttribute("aTime",this.bufferIn,1);const x=Math.floor(this.timeCode/(this.bufferLength/this.audioBuffer.sampleRate/this.numSampleBlocks));(async()=>{for(let p=0;p<this.numSampleBlocks;p++){let _;if(p%2===0?_=x+Math.floor(p/2):_=x-Math.ceil(p/2),_>=this.numSampleBlocks?_=_-this.numSampleBlocks:_<0&&(_=_+this.numSampleBlocks),await new Promise(T=>{setTimeout(()=>{this.isAudioBufferReady=!0,T(null)},100)}),!d)return;a.setUniform("uTimeOffset","1f",[this.blockLength*_/this.audioContext.sampleRate]),a.use(()=>{a.uploadUniforms(),o.use(()=>{this.gl.beginTransformFeedback(this.gl.POINTS),this.gl.enable(this.gl.RASTERIZER_DISCARD),c.use(()=>{this.gl.drawArrays(this.gl.POINTS,0,c.vertCount)}),this.gl.disable(this.gl.RASTERIZER_DISCARD),this.gl.endTransformFeedback()}),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferL.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayL),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferR.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);for(let T=0;T<this.blockLength;T++){const C=_*this.blockLength+T,w=C<td*this.audioContext.sampleRate?1:0;this.audioBuffer.getChannelData(0)[C]=this.tmpOutputArrayL[T]*w,this.audioBuffer.getChannelData(1)[C]=this.tmpOutputArrayR[T]*w}}),this.progress=[p,this.numSampleBlocks-1],this.notice()}this._entity&&this._entity.noticeEventParent("update/music/complete",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture])})()}return{stop:u}}updateImpl(a){if(this.timeCode=a.timeCode,!a.playing||a.timeCode<0){this.stop();return}this.play(a.timeCode,this.forcePlay),this.forcePlay=!1,this.realtimeAnalyzer.getByteTimeDomainData(this.timeDomainArray),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.realtimeAnalyzer.getByteFrequencyData(this.frequencyArray),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}setEntityImpl(a){this.notice()}unsetEntityImpl(a){this.stop()}notice(){setTimeout(()=>{this._entity&&this._entity.noticeEventParent("update/music",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture,this.progress])},0)}play(a=0,o){this.audioSrcNode&&!o&&Math.abs(this.audioSrcNode.context.currentTime-this.playStartTime-a)<.1||(this.stop(),this.isAudioBufferReady&&(this.audioSrcNode=this.audioContext.createBufferSource(),this.audioSrcNode.buffer=this.audioBuffer,this.audioSrcNode.loop=!1,this.audioSrcNode.start(0,a),this.playStartTime=this.audioSrcNode.context.currentTime-(a||0),this.audioSrcNode.connect(this.gainNode),this.audioSrcNode.connect(this.convolverNode),this.convolverNode.connect(this.gainNode),this.gainNode.connect(this.audioContext.destination),this.gainNode.connect(this.realtimeAnalyzer)))}stop(){this.audioSrcNode&&(this.audioSrcNode.stop(),this.audioSrcNode.disconnect(this.gainNode),this.audioSrcNode=null),this.convolverNode&&this.convolverNode.disconnect()}dispose(){super.dispose(),this.stop(),this.frequencyTexture.dispose(),this.timeDomainTexture.dispose()}}const jP=`#include <common>
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

}`,HP=`#include <common>
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
	
}`;class GP extends CE{constructor(l){const a=new La({frag:Pr("orengineCubeFrag",jP),vert:Pr("orengineCubeVert",HP),uniforms:jt.merge(ni.time,{uNoiseTex:{value:cn.resources.getTexture("noise"),type:"1i"}})});super({...l,args:a})}}const XP=`#include <common>
#include <packing>
#include <frag_h>

in float vNoise;
in vec3 vPosBase;

void main( void ) {

	#include <frag_in>

	float or = step( vPosBase.x, -0.2 );
	float flash = smoothstep(0.3, 0.0,  vNoise) * or;
	
	outEmission = vec3( (1.0 - flash * 0.7) * 10.0 );
	outRoughness = 0.3;
	
	#include <frag_out>

}`,WP=`#include <common>
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
	
}`;class $P extends CE{constructor(l){const a=new La({frag:Pr("OREngineLogoMaterialFrag",XP),vert:Pr("OREngineLogoMaterialVert",WP),uniforms:ni.time,phase:["deferred","shadowMap"]});super({...l,args:a})}}const YP=`#include <common>\r
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
} `;class qP extends kn{constructor(l){super(l);const a=this._entity.addComponent(kr);a.geometry=new wE({radius:50,widthSegments:32,heightSegments:32}),a.material=new La({phase:["deferred","envMap"],frag:Pr("skybox",YP),cullFace:!1,uniforms:jt.merge(ni.time,ni.music)})}}class QP extends kn{constructor(a){super(a);b(this,"speed");b(this,"rotQuaternion");this.speed=1,this.rotQuaternion=new Ro}updateImpl(a){this.rotQuaternion.setFromEuler(new Mv(0,-.4*a.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}}const KP=`#include <common>\r
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
} `,ZP=`#include <common>\r
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
} `,sE=`#include <common>\r
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
} `;class JP extends kn{constructor(a){super(a);b(this,"updateTextures");this.updateTextures=[];const c=cn.getInstance(Nt).renderer;cn.resources.addTexture("noise",new ed(c,{frag:ZP,resolution:new J(1024,1024)})),cn.resources.addTexture("noiseCyclic",new ed(c,{frag:sE,resolution:new J(1024,1024)}));const d=new ed(c,{frag:KP,resolution:new J(512,512)});d.setting({magFilter:Nt.NEAREST,minFilter:Nt.NEAREST}),d.render(),cn.resources.addTexture("hash",d),this.updateTextures.push(cn.resources.addTexture("noiseCyclic_anime",new ed(c,{frag:sE,uniforms:cn.getInstance(Nt).uniforms,resolution:new J(512,512)}))),this.once("dispose",()=>{this.updateTextures.forEach(u=>{u.dispose()}),this.updateTextures=[]})}updateImpl(a){for(let o=0;o<this.updateTextures.length;o++)this.updateTextures[o].render()}}const eL=[[{axis:"x",k:[["B",[0,.039,-1,.039,1,.039]]]},{axis:"z",k:[["B",[0,8.832,-1,8.832,1,8.832]]]},{axis:"y",k:[["B",[0,1.525,-1,1.525,1,1.525]]]}],[{axis:"x",k:[["B",[0,-1.935,-25,-1.935,25,-1.935]],["B",[75,2.449,50,2.449,100,2.449]],["B",[150,-2,125,-2,175,-2]],["B",[225,2.207,200,2.207,250,2.207]],["B",[300,-1.935,275,-1.935,325,-1.935]]]},{axis:"z",k:[["B",[0,-1.031,-25,-1.031,25,-1.031]],["B",[75,-.957,50,-.984,100,-.931]],["B",[150,-.925,125,-.925,175,-.925]],["B",[225,-1.056,200,-1.056,250,-1.056]],["B",[300,-1.031,275,-1.031,325,-1.031]]]},{axis:"y",k:[["B",[0,1.875,-25,1.875,25,1.875]],["B",[75,.256,50,.474,100,.037]],["B",[150,.037,125,.037,175,.037]],["B",[225,1.984,200,1.984,250,1.984]],["B",[300,1.875,275,1.875,325,1.875]]]}]],tL={name:"root",parent:null,children:[{name:"CamDof",class:"",type:"empty",parent:"root",position:[0,1,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Camera",class:"",type:"camera",parent:"root",position:[.039,1.525,8.832],rotation:[1.571,0,0],scale:[1,1,1],visible:!0,param:{fov:21.908},animation:{position:0}},{name:"CamLook",class:"",type:"empty",parent:"root",position:[0,1.017,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Cube.001",class:"",type:"mesh",parent:"root",position:[-1.299,1.669,-1.024],rotation:[0,0,-0],scale:[.238,.238,.238],visible:!0,param:{position:"AACAvwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIA/AACAvwAAgL8AAIA/AACAPwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIA/AACAPwAAgD8AAIA/",normal:"AACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAA",uv:"AADAPgAAAAAAACA/AAAAAAAAID8AAIA+AADAPgAAgD4AAMA+AACAPgAAID8AAIA+AAAgPwAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAAD8AACA/AABAPwAAwD4AAEA/AADAPgAAQD8AACA/AABAPwAAID8AAIA/AADAPgAAgD8AAAA+AAAAPwAAwD4AAAA/AADAPgAAQD8AAAA+AABAPwAAID8AAAA/AABgPwAAAD8AAGA/AABAPwAAID8AAEA/",index:"AAABAAIAAAACAAMABAAFAAYABAAGAAcACAAJAAoACAAKAAsADAANAA4ADAAOAA8AEAARABIAEAASABMAFAAVABYAFAAWABcA"},animation:{position:1}},{name:"OREngine",class:"",type:"gltf",parent:"root",position:[0,1.063,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"OREngineCube",class:"",type:"cube",parent:"root",position:[0,.96,-3.209],rotation:[.166,.754,.158],scale:[2.3,2.3,2.3],visible:!0,param:{x:1,y:1,z:1}},{name:"SkyBox",class:"",type:"empty",parent:"root",position:[0,0,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"Spot.001",class:"",type:"light",parent:"root",position:[7.6,7.343,4.754],rotation:[.814,.6,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:3,type:"spot",angle:.611,blend:1}},{name:"Spot.002",class:"",type:"light",parent:"root",position:[-13.676,-15.599,-.377],rotation:[1.02,-1.854,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:2,type:"spot",angle:.691,blend:1}}],type:"empty",visible:!0},nL={start:1,end:300,fps:30,playing:!1},rL={animations:eL,root:tL,frame:nL};class iL extends kn{constructor(a){super(a);b(this,"blidge");b(this,"type");b(this,"blidgeRoot");b(this,"entities");b(this,"connection");b(this,"useGLTF");b(this,"gltfPath");this.entities=new Map,this.type="websocket",this.connection={enabled:!0,url:"ws://localhost:3100"},this.useGLTF=!1,this.gltfPath="/OREngine//scene.glb",this.blidgeRoot=null,this.blidge=new xD(Nt);const o=this.onSyncScene.bind(this),c=x=>{this.entity&&this.entity.noticeEventParent("update/blidge/frame",[x])};this.blidge.on("sync/scene",o),this.blidge.on("sync/timeline",c),this.once("dispose",()=>{this.blidge.off("sync/scene",o),this.blidge.off("sync/timeline",c)});const d=async()=>{this.type=="json"?(await this.blidge.loadScene(rL,this.useGLTF?this.gltfPath:void 0),this.emit("loaded")):this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field("mode",()=>this.type,x=>{this.type=x,d()},{format:{type:"select",list:["websocket","json"]}}),this.field("gltf",()=>this.useGLTF,x=>{this.useGLTF=x,d()}),this.field("gltfPath",()=>this.gltfPath,x=>{this.gltfPath=x,d()});const u=this.fieldDir("websocket",{hidden:()=>this.type!="websocket"});u.field("reconnect",()=>()=>d(),void 0,{label:"Reconnect"}),u.field("url",()=>this.connection.url,x=>this.connection.url=x)}onSyncScene(a){const o=new Date().getTime(),c=u=>{const x=this.entities.get(u.name)||new ii;if(u.type=="camera"){const g=u.param;x.userData.cameraParam=g}return x.removeComponent(Ou),x.addComponent(Ou,{blidge:a,node:u}),u.children.forEach(g=>{const p=c(g);x.add(p)}),this.entities.set(x.name,x),x.userData.updateTime=o,x},d=a.root&&c(a.root);d&&(d.name="blidgeRoot",this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=d,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(u=>{if(u.userData.updateTime!=o){const x=u.parent;x&&x.remove(u),u.dispose(),this.entities.delete(u.name)}}),this.entity&&(this.entity.noticeEventChilds("sceneCreated",[this.blidgeRoot]),this.entity.noticeEventParent("update/blidge/scene",[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),this.blidgeRoot=null)}}class aL extends kn{constructor(l){super(l)}updateImpl(l){ni.time.uTime.value=l.timeCode,ni.time.uTimeF.value=l.timeCode%1,ni.time.uTimeE.value=l.timeElapsed,ni.time.uTimeEF.value=l.timeElapsed%1,ni.resolution.uAspectRatio.value=l.resolution.x/l.resolution.y}}const lE={Camera:{MainCamera:BP},DemoProject:{DemoMusic:IP,OREngineCubeMaterial:GP,OREngineLogoMaterial:$P,SkyBox:qP},ObjectControls:{ShakeViewer:PE,LookAt:ld,ObjectRotate:QP,OrbitControls:LE},Texture:{TextureGenerator:JP},Utilities:{BLidgeClient:iL,UniformControls:aL}},oL=()=>{cn.resources.clear();const h=(o,c)=>{const d=Object.keys(o);for(let u=0;u<d.length;u++){const x=d[u],g=o[x];if(typeof g=="function")c.addComponent(x,g);else{const p=c.createGroup(x);h(g,p)}}};cn.resources.addComponentGroup("Light").addComponent("Light",Cs);const a=Object.keys(lE);for(let o=0;o<a.length;o++){const c=a[o],d=lE[c],u=cn.resources.addComponentGroup(c);h(d,u)}},sL="orengine/";class lL extends Rn{constructor(){super()}set(l,a){try{const o=JSON.stringify(a);return localStorage.setItem(sL+l,o),fetch("/api/data/save/"+l,{method:"POST",headers:{"Content-Type":"application/json"},body:o})}catch(o){return console.error(o),Promise.reject(o)}}async get(l){try{return await(await fetch("/api/data/get/"+l)).json()}catch{return}}}const nd=new lL;oL();const uL=()=>{const[h,l]=G.useState(),[a,o]=G.useState();return G.useEffect(()=>{nd.get("scene.json").then(c=>{c&&l(c)}),nd.get("editor.json").then(c=>{c&&o(c)}),l(wP)},[]),E.jsxDEV(yP,{gl:Nt,project:h,children:E.jsxDEV(vP,{editorData:a,onSave:(c,d)=>{nd.set("scene.json",c),nd.set("editor.json",d)}},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/components/pages/EditorPage/index.tsx",lineNumber:48,columnNumber:4},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/components/pages/EditorPage/index.tsx",lineNumber:47,columnNumber:3},void 0)};Rv.createRoot(document.getElementById("root")).render(E.jsxDEV(E.Fragment,{children:E.jsxDEV(uL,{},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/pages/main.tsx",lineNumber:10,columnNumber:3},void 0)},void 0,!1,{fileName:"/home/runner/work/OREngine/OREngine/src/tsx/pages/main.tsx",lineNumber:8,columnNumber:2},void 0));
