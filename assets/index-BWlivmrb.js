var wh=Object.defineProperty;var Ah=(e,t,n)=>t in e?wh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var c=(e,t,n)=>Ah(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function Sh(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ju={exports:{}},ho={},Ou={exports:{}},j={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xr=Symbol.for("react.element"),Ch=Symbol.for("react.portal"),Eh=Symbol.for("react.fragment"),Ph=Symbol.for("react.strict_mode"),Th=Symbol.for("react.profiler"),Mh=Symbol.for("react.provider"),Rh=Symbol.for("react.context"),kh=Symbol.for("react.forward_ref"),zh=Symbol.for("react.suspense"),Lh=Symbol.for("react.memo"),Nh=Symbol.for("react.lazy"),ua=Symbol.iterator;function Bh(e){return e===null||typeof e!="object"?null:(e=ua&&e[ua]||e["@@iterator"],typeof e=="function"?e:null)}var Uu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Vu=Object.assign,Wu={};function Yn(e,t,n){this.props=e,this.context=t,this.refs=Wu,this.updater=n||Uu}Yn.prototype.isReactComponent={};Yn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Yn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Hu(){}Hu.prototype=Yn.prototype;function ll(e,t,n){this.props=e,this.context=t,this.refs=Wu,this.updater=n||Uu}var al=ll.prototype=new Hu;al.constructor=ll;Vu(al,Yn.prototype);al.isPureReactComponent=!0;var ca=Array.isArray,Gu=Object.prototype.hasOwnProperty,ul={current:null},$u={key:!0,ref:!0,__self:!0,__source:!0};function Xu(e,t,n){var r,i={},o=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(o=""+t.key),t)Gu.call(t,r)&&!$u.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var a=Array(l),u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Xr,type:e,key:o,ref:s,props:i,_owner:ul.current}}function Dh(e,t){return{$$typeof:Xr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function cl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Xr}function Fh(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var fa=/\/+/g;function zo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Fh(""+e.key):t.toString(36)}function Ei(e,t,n,r,i){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Xr:case Ch:s=!0}}if(s)return s=e,i=i(s),e=r===""?"."+zo(s,0):r,ca(i)?(n="",e!=null&&(n=e.replace(fa,"$&/")+"/"),Ei(i,t,n,"",function(u){return u})):i!=null&&(cl(i)&&(i=Dh(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(fa,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=r===""?".":r+":",ca(e))for(var l=0;l<e.length;l++){o=e[l];var a=r+zo(o,l);s+=Ei(o,t,n,a,i)}else if(a=Bh(e),typeof a=="function")for(e=a.call(e),l=0;!(o=e.next()).done;)o=o.value,a=r+zo(o,l++),s+=Ei(o,t,n,a,i);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Jr(e,t,n){if(e==null)return e;var r=[],i=0;return Ei(e,r,"","",function(o){return t.call(n,o,i++)}),r}function Ih(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},Pi={transition:null},bh={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:Pi,ReactCurrentOwner:ul};function Yu(){throw Error("act(...) is not supported in production builds of React.")}j.Children={map:Jr,forEach:function(e,t,n){Jr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Jr(e,function(){t++}),t},toArray:function(e){return Jr(e,function(t){return t})||[]},only:function(e){if(!cl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};j.Component=Yn;j.Fragment=Eh;j.Profiler=Th;j.PureComponent=ll;j.StrictMode=Ph;j.Suspense=zh;j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bh;j.act=Yu;j.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Vu({},e.props),i=e.key,o=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,s=ul.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(a in t)Gu.call(t,a)&&!$u.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&l!==void 0?l[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){l=Array(a);for(var u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:Xr,type:e.type,key:i,ref:o,props:r,_owner:s}};j.createContext=function(e){return e={$$typeof:Rh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Mh,_context:e},e.Consumer=e};j.createElement=Xu;j.createFactory=function(e){var t=Xu.bind(null,e);return t.type=e,t};j.createRef=function(){return{current:null}};j.forwardRef=function(e){return{$$typeof:kh,render:e}};j.isValidElement=cl;j.lazy=function(e){return{$$typeof:Nh,_payload:{_status:-1,_result:e},_init:Ih}};j.memo=function(e,t){return{$$typeof:Lh,type:e,compare:t===void 0?null:t}};j.startTransition=function(e){var t=Pi.transition;Pi.transition={};try{e()}finally{Pi.transition=t}};j.unstable_act=Yu;j.useCallback=function(e,t){return ke.current.useCallback(e,t)};j.useContext=function(e){return ke.current.useContext(e)};j.useDebugValue=function(){};j.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};j.useEffect=function(e,t){return ke.current.useEffect(e,t)};j.useId=function(){return ke.current.useId()};j.useImperativeHandle=function(e,t,n){return ke.current.useImperativeHandle(e,t,n)};j.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)};j.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)};j.useMemo=function(e,t){return ke.current.useMemo(e,t)};j.useReducer=function(e,t,n){return ke.current.useReducer(e,t,n)};j.useRef=function(e){return ke.current.useRef(e)};j.useState=function(e){return ke.current.useState(e)};j.useSyncExternalStore=function(e,t,n){return ke.current.useSyncExternalStore(e,t,n)};j.useTransition=function(){return ke.current.useTransition()};j.version="18.3.1";Ou.exports=j;var C=Ou.exports;const Rr=Sh(C);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jh=C,Oh=Symbol.for("react.element"),Uh=Symbol.for("react.fragment"),Vh=Object.prototype.hasOwnProperty,Wh=jh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Hh={key:!0,ref:!0,__self:!0,__source:!0};function Qu(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)Vh.call(t,r)&&!Hh.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:Oh,type:e,key:o,ref:s,props:i,_owner:Wh.current}}ho.Fragment=Uh;ho.jsx=Qu;ho.jsxs=Qu;ju.exports=ho;var d=ju.exports,us={},Ku={exports:{}},We={},qu={exports:{}},Zu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(z,F){var I=z.length;z.push(F);e:for(;0<I;){var K=I-1>>>1,le=z[K];if(0<i(le,F))z[K]=F,z[I]=le,I=K;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var F=z[0],I=z.pop();if(I!==F){z[0]=I;e:for(var K=0,le=z.length,Zt=le>>>1;K<Zt;){var Jt=2*(K+1)-1,ko=z[Jt],en=Jt+1,Zr=z[en];if(0>i(ko,I))en<le&&0>i(Zr,ko)?(z[K]=Zr,z[en]=I,K=en):(z[K]=ko,z[Jt]=I,K=Jt);else if(en<le&&0>i(Zr,I))z[K]=Zr,z[en]=I,K=en;else break e}}return F}function i(z,F){var I=z.sortIndex-F.sortIndex;return I!==0?I:z.id-F.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var a=[],u=[],f=1,p=null,m=3,v=!1,x=!1,_=!1,E=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(z){for(var F=n(u);F!==null;){if(F.callback===null)r(u);else if(F.startTime<=z)r(u),F.sortIndex=F.expirationTime,t(a,F);else break;F=n(u)}}function w(z){if(_=!1,y(z),!x)if(n(a)!==null)x=!0,Jn(A);else{var F=n(u);F!==null&&er(w,F.startTime-z)}}function A(z,F){x=!1,_&&(_=!1,g(T),T=-1),v=!0;var I=m;try{for(y(F),p=n(a);p!==null&&(!(p.expirationTime>F)||z&&!D());){var K=p.callback;if(typeof K=="function"){p.callback=null,m=p.priorityLevel;var le=K(p.expirationTime<=F);F=e.unstable_now(),typeof le=="function"?p.callback=le:p===n(a)&&r(a),y(F)}else r(a);p=n(a)}if(p!==null)var Zt=!0;else{var Jt=n(u);Jt!==null&&er(w,Jt.startTime-F),Zt=!1}return Zt}finally{p=null,m=I,v=!1}}var P=!1,S=null,T=-1,B=5,k=-1;function D(){return!(e.unstable_now()-k<B)}function se(){if(S!==null){var z=e.unstable_now();k=z;var F=!0;try{F=S(!0,z)}finally{F?we():(P=!1,S=null)}}else P=!1}var we;if(typeof h=="function")we=function(){h(se)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,Ro=Z.port2;Z.port1.onmessage=se,we=function(){Ro.postMessage(null)}}else we=function(){E(se,0)};function Jn(z){S=z,P||(P=!0,we())}function er(z,F){T=E(function(){z(e.unstable_now())},F)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(z){z.callback=null},e.unstable_continueExecution=function(){x||v||(x=!0,Jn(A))},e.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<z?Math.floor(1e3/z):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(a)},e.unstable_next=function(z){switch(m){case 1:case 2:case 3:var F=3;break;default:F=m}var I=m;m=F;try{return z()}finally{m=I}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(z,F){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var I=m;m=z;try{return F()}finally{m=I}},e.unstable_scheduleCallback=function(z,F,I){var K=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?K+I:K):I=K,z){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=I+le,z={id:f++,callback:F,priorityLevel:z,startTime:I,expirationTime:le,sortIndex:-1},I>K?(z.sortIndex=I,t(u,z),n(a)===null&&z===n(u)&&(_?(g(T),T=-1):_=!0,er(w,I-K))):(z.sortIndex=le,t(a,z),x||v||(x=!0,Jn(A))),z},e.unstable_shouldYield=D,e.unstable_wrapCallback=function(z){var F=m;return function(){var I=m;m=F;try{return z.apply(this,arguments)}finally{m=I}}}})(Zu);qu.exports=Zu;var Gh=qu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $h=C,Ve=Gh;function M(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ju=new Set,kr={};function pn(e,t){jn(e,t),jn(e+"Capture",t)}function jn(e,t){for(kr[e]=t,e=0;e<t.length;e++)Ju.add(t[e])}var St=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),cs=Object.prototype.hasOwnProperty,Xh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ha={},da={};function Yh(e){return cs.call(da,e)?!0:cs.call(ha,e)?!1:Xh.test(e)?da[e]=!0:(ha[e]=!0,!1)}function Qh(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Kh(e,t,n,r){if(t===null||typeof t>"u"||Qh(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ze(e,t,n,r,i,o,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){xe[e]=new ze(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];xe[t]=new ze(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){xe[e]=new ze(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){xe[e]=new ze(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){xe[e]=new ze(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){xe[e]=new ze(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){xe[e]=new ze(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){xe[e]=new ze(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){xe[e]=new ze(e,5,!1,e.toLowerCase(),null,!1,!1)});var fl=/[\-:]([a-z])/g;function hl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(fl,hl);xe[t]=new ze(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(fl,hl);xe[t]=new ze(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(fl,hl);xe[t]=new ze(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){xe[e]=new ze(e,1,!1,e.toLowerCase(),null,!1,!1)});xe.xlinkHref=new ze("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){xe[e]=new ze(e,1,!1,e.toLowerCase(),null,!0,!0)});function dl(e,t,n,r){var i=xe.hasOwnProperty(t)?xe[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Kh(t,n,i,r)&&(n=null),r||i===null?Yh(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Tt=$h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ei=Symbol.for("react.element"),_n=Symbol.for("react.portal"),wn=Symbol.for("react.fragment"),ml=Symbol.for("react.strict_mode"),fs=Symbol.for("react.profiler"),ec=Symbol.for("react.provider"),tc=Symbol.for("react.context"),pl=Symbol.for("react.forward_ref"),hs=Symbol.for("react.suspense"),ds=Symbol.for("react.suspense_list"),vl=Symbol.for("react.memo"),kt=Symbol.for("react.lazy"),nc=Symbol.for("react.offscreen"),ma=Symbol.iterator;function tr(e){return e===null||typeof e!="object"?null:(e=ma&&e[ma]||e["@@iterator"],typeof e=="function"?e:null)}var ne=Object.assign,Lo;function pr(e){if(Lo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Lo=t&&t[1]||""}return`
`+Lo+e}var No=!1;function Bo(e,t){if(!e||No)return"";No=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),o=r.stack.split(`
`),s=i.length-1,l=o.length-1;1<=s&&0<=l&&i[s]!==o[l];)l--;for(;1<=s&&0<=l;s--,l--)if(i[s]!==o[l]){if(s!==1||l!==1)do if(s--,l--,0>l||i[s]!==o[l]){var a=`
`+i[s].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=s&&0<=l);break}}}finally{No=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?pr(e):""}function qh(e){switch(e.tag){case 5:return pr(e.type);case 16:return pr("Lazy");case 13:return pr("Suspense");case 19:return pr("SuspenseList");case 0:case 2:case 15:return e=Bo(e.type,!1),e;case 11:return e=Bo(e.type.render,!1),e;case 1:return e=Bo(e.type,!0),e;default:return""}}function ms(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case wn:return"Fragment";case _n:return"Portal";case fs:return"Profiler";case ml:return"StrictMode";case hs:return"Suspense";case ds:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case tc:return(e.displayName||"Context")+".Consumer";case ec:return(e._context.displayName||"Context")+".Provider";case pl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case vl:return t=e.displayName||null,t!==null?t:ms(e.type)||"Memo";case kt:t=e._payload,e=e._init;try{return ms(e(t))}catch{}}return null}function Zh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ms(t);case 8:return t===ml?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Gt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function rc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Jh(e){var t=rc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){r=""+s,o.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ti(e){e._valueTracker||(e._valueTracker=Jh(e))}function ic(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=rc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ji(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ps(e,t){var n=t.checked;return ne({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function pa(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Gt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function oc(e,t){t=t.checked,t!=null&&dl(e,"checked",t,!1)}function vs(e,t){oc(e,t);var n=Gt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?gs(e,t.type,n):t.hasOwnProperty("defaultValue")&&gs(e,t.type,Gt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function va(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function gs(e,t,n){(t!=="number"||ji(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var vr=Array.isArray;function Nn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Gt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ys(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(M(91));return ne({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ga(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(M(92));if(vr(n)){if(1<n.length)throw Error(M(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Gt(n)}}function sc(e,t){var n=Gt(t.value),r=Gt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ya(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function lc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function xs(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?lc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ni,ac=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ni=ni||document.createElement("div"),ni.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ni.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function zr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var xr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ed=["Webkit","ms","Moz","O"];Object.keys(xr).forEach(function(e){ed.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),xr[t]=xr[e]})});function uc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||xr.hasOwnProperty(e)&&xr[e]?(""+t).trim():t+"px"}function cc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=uc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var td=ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function _s(e,t){if(t){if(td[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(M(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(M(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(M(61))}if(t.style!=null&&typeof t.style!="object")throw Error(M(62))}}function ws(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var As=null;function gl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ss=null,Bn=null,Dn=null;function xa(e){if(e=Kr(e)){if(typeof Ss!="function")throw Error(M(280));var t=e.stateNode;t&&(t=yo(t),Ss(e.stateNode,e.type,t))}}function fc(e){Bn?Dn?Dn.push(e):Dn=[e]:Bn=e}function hc(){if(Bn){var e=Bn,t=Dn;if(Dn=Bn=null,xa(e),t)for(e=0;e<t.length;e++)xa(t[e])}}function dc(e,t){return e(t)}function mc(){}var Do=!1;function pc(e,t,n){if(Do)return e(t,n);Do=!0;try{return dc(e,t,n)}finally{Do=!1,(Bn!==null||Dn!==null)&&(mc(),hc())}}function Lr(e,t){var n=e.stateNode;if(n===null)return null;var r=yo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(M(231,t,typeof n));return n}var Cs=!1;if(St)try{var nr={};Object.defineProperty(nr,"passive",{get:function(){Cs=!0}}),window.addEventListener("test",nr,nr),window.removeEventListener("test",nr,nr)}catch{Cs=!1}function nd(e,t,n,r,i,o,s,l,a){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(f){this.onError(f)}}var _r=!1,Oi=null,Ui=!1,Es=null,rd={onError:function(e){_r=!0,Oi=e}};function id(e,t,n,r,i,o,s,l,a){_r=!1,Oi=null,nd.apply(rd,arguments)}function od(e,t,n,r,i,o,s,l,a){if(id.apply(this,arguments),_r){if(_r){var u=Oi;_r=!1,Oi=null}else throw Error(M(198));Ui||(Ui=!0,Es=u)}}function vn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function vc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function _a(e){if(vn(e)!==e)throw Error(M(188))}function sd(e){var t=e.alternate;if(!t){if(t=vn(e),t===null)throw Error(M(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return _a(i),e;if(o===r)return _a(i),t;o=o.sibling}throw Error(M(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,r=o;break}if(l===r){s=!0,r=i,n=o;break}l=l.sibling}if(!s){for(l=o.child;l;){if(l===n){s=!0,n=o,r=i;break}if(l===r){s=!0,r=o,n=i;break}l=l.sibling}if(!s)throw Error(M(189))}}if(n.alternate!==r)throw Error(M(190))}if(n.tag!==3)throw Error(M(188));return n.stateNode.current===n?e:t}function gc(e){return e=sd(e),e!==null?yc(e):null}function yc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=yc(e);if(t!==null)return t;e=e.sibling}return null}var xc=Ve.unstable_scheduleCallback,wa=Ve.unstable_cancelCallback,ld=Ve.unstable_shouldYield,ad=Ve.unstable_requestPaint,ie=Ve.unstable_now,ud=Ve.unstable_getCurrentPriorityLevel,yl=Ve.unstable_ImmediatePriority,_c=Ve.unstable_UserBlockingPriority,Vi=Ve.unstable_NormalPriority,cd=Ve.unstable_LowPriority,wc=Ve.unstable_IdlePriority,mo=null,pt=null;function fd(e){if(pt&&typeof pt.onCommitFiberRoot=="function")try{pt.onCommitFiberRoot(mo,e,void 0,(e.current.flags&128)===128)}catch{}}var ot=Math.clz32?Math.clz32:md,hd=Math.log,dd=Math.LN2;function md(e){return e>>>=0,e===0?32:31-(hd(e)/dd|0)|0}var ri=64,ii=4194304;function gr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Wi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,o=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~i;l!==0?r=gr(l):(o&=s,o!==0&&(r=gr(o)))}else s=n&~i,s!==0?r=gr(s):o!==0&&(r=gr(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,o=t&-t,i>=o||i===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ot(t),i=1<<n,r|=e[n],t&=~i;return r}function pd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-ot(o),l=1<<s,a=i[s];a===-1?(!(l&n)||l&r)&&(i[s]=pd(l,t)):a<=t&&(e.expiredLanes|=l),o&=~l}}function Ps(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ac(){var e=ri;return ri<<=1,!(ri&4194240)&&(ri=64),e}function Fo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Yr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ot(t),e[t]=n}function gd(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-ot(n),o=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~o}}function xl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ot(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var H=0;function Sc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Cc,_l,Ec,Pc,Tc,Ts=!1,oi=[],It=null,bt=null,jt=null,Nr=new Map,Br=new Map,Nt=[],yd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Aa(e,t){switch(e){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":bt=null;break;case"mouseover":case"mouseout":jt=null;break;case"pointerover":case"pointerout":Nr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Br.delete(t.pointerId)}}function rr(e,t,n,r,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[i]},t!==null&&(t=Kr(t),t!==null&&_l(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function xd(e,t,n,r,i){switch(t){case"focusin":return It=rr(It,e,t,n,r,i),!0;case"dragenter":return bt=rr(bt,e,t,n,r,i),!0;case"mouseover":return jt=rr(jt,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return Nr.set(o,rr(Nr.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,Br.set(o,rr(Br.get(o)||null,e,t,n,r,i)),!0}return!1}function Mc(e){var t=on(e.target);if(t!==null){var n=vn(t);if(n!==null){if(t=n.tag,t===13){if(t=vc(n),t!==null){e.blockedOn=t,Tc(e.priority,function(){Ec(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ti(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ms(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);As=r,n.target.dispatchEvent(r),As=null}else return t=Kr(n),t!==null&&_l(t),e.blockedOn=n,!1;t.shift()}return!0}function Sa(e,t,n){Ti(e)&&n.delete(t)}function _d(){Ts=!1,It!==null&&Ti(It)&&(It=null),bt!==null&&Ti(bt)&&(bt=null),jt!==null&&Ti(jt)&&(jt=null),Nr.forEach(Sa),Br.forEach(Sa)}function ir(e,t){e.blockedOn===t&&(e.blockedOn=null,Ts||(Ts=!0,Ve.unstable_scheduleCallback(Ve.unstable_NormalPriority,_d)))}function Dr(e){function t(i){return ir(i,e)}if(0<oi.length){ir(oi[0],e);for(var n=1;n<oi.length;n++){var r=oi[n];r.blockedOn===e&&(r.blockedOn=null)}}for(It!==null&&ir(It,e),bt!==null&&ir(bt,e),jt!==null&&ir(jt,e),Nr.forEach(t),Br.forEach(t),n=0;n<Nt.length;n++)r=Nt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Nt.length&&(n=Nt[0],n.blockedOn===null);)Mc(n),n.blockedOn===null&&Nt.shift()}var Fn=Tt.ReactCurrentBatchConfig,Hi=!0;function wd(e,t,n,r){var i=H,o=Fn.transition;Fn.transition=null;try{H=1,wl(e,t,n,r)}finally{H=i,Fn.transition=o}}function Ad(e,t,n,r){var i=H,o=Fn.transition;Fn.transition=null;try{H=4,wl(e,t,n,r)}finally{H=i,Fn.transition=o}}function wl(e,t,n,r){if(Hi){var i=Ms(e,t,n,r);if(i===null)$o(e,t,r,Gi,n),Aa(e,r);else if(xd(i,e,t,n,r))r.stopPropagation();else if(Aa(e,r),t&4&&-1<yd.indexOf(e)){for(;i!==null;){var o=Kr(i);if(o!==null&&Cc(o),o=Ms(e,t,n,r),o===null&&$o(e,t,r,Gi,n),o===i)break;i=o}i!==null&&r.stopPropagation()}else $o(e,t,r,null,n)}}var Gi=null;function Ms(e,t,n,r){if(Gi=null,e=gl(r),e=on(e),e!==null)if(t=vn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=vc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Gi=e,null}function Rc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ud()){case yl:return 1;case _c:return 4;case Vi:case cd:return 16;case wc:return 536870912;default:return 16}default:return 16}}var Dt=null,Al=null,Mi=null;function kc(){if(Mi)return Mi;var e,t=Al,n=t.length,r,i="value"in Dt?Dt.value:Dt.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===i[o-r];r++);return Mi=i.slice(e,1<r?1-r:void 0)}function Ri(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function si(){return!0}function Ca(){return!1}function He(e){function t(n,r,i,o,s){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?si:Ca,this.isPropagationStopped=Ca,this}return ne(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=si)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=si)},persist:function(){},isPersistent:si}),t}var Qn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sl=He(Qn),Qr=ne({},Qn,{view:0,detail:0}),Sd=He(Qr),Io,bo,or,po=ne({},Qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Cl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==or&&(or&&e.type==="mousemove"?(Io=e.screenX-or.screenX,bo=e.screenY-or.screenY):bo=Io=0,or=e),Io)},movementY:function(e){return"movementY"in e?e.movementY:bo}}),Ea=He(po),Cd=ne({},po,{dataTransfer:0}),Ed=He(Cd),Pd=ne({},Qr,{relatedTarget:0}),jo=He(Pd),Td=ne({},Qn,{animationName:0,elapsedTime:0,pseudoElement:0}),Md=He(Td),Rd=ne({},Qn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),kd=He(Rd),zd=ne({},Qn,{data:0}),Pa=He(zd),Ld={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Bd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Dd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Bd[e])?!!t[e]:!1}function Cl(){return Dd}var Fd=ne({},Qr,{key:function(e){if(e.key){var t=Ld[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ri(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Nd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Cl,charCode:function(e){return e.type==="keypress"?Ri(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ri(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Id=He(Fd),bd=ne({},po,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ta=He(bd),jd=ne({},Qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Cl}),Od=He(jd),Ud=ne({},Qn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Vd=He(Ud),Wd=ne({},po,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hd=He(Wd),Gd=[9,13,27,32],El=St&&"CompositionEvent"in window,wr=null;St&&"documentMode"in document&&(wr=document.documentMode);var $d=St&&"TextEvent"in window&&!wr,zc=St&&(!El||wr&&8<wr&&11>=wr),Ma=" ",Ra=!1;function Lc(e,t){switch(e){case"keyup":return Gd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Nc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var An=!1;function Xd(e,t){switch(e){case"compositionend":return Nc(t);case"keypress":return t.which!==32?null:(Ra=!0,Ma);case"textInput":return e=t.data,e===Ma&&Ra?null:e;default:return null}}function Yd(e,t){if(An)return e==="compositionend"||!El&&Lc(e,t)?(e=kc(),Mi=Al=Dt=null,An=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zc&&t.locale!=="ko"?null:t.data;default:return null}}var Qd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ka(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Qd[e.type]:t==="textarea"}function Bc(e,t,n,r){fc(r),t=$i(t,"onChange"),0<t.length&&(n=new Sl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ar=null,Fr=null;function Kd(e){Gc(e,0)}function vo(e){var t=En(e);if(ic(t))return e}function qd(e,t){if(e==="change")return t}var Dc=!1;if(St){var Oo;if(St){var Uo="oninput"in document;if(!Uo){var za=document.createElement("div");za.setAttribute("oninput","return;"),Uo=typeof za.oninput=="function"}Oo=Uo}else Oo=!1;Dc=Oo&&(!document.documentMode||9<document.documentMode)}function La(){Ar&&(Ar.detachEvent("onpropertychange",Fc),Fr=Ar=null)}function Fc(e){if(e.propertyName==="value"&&vo(Fr)){var t=[];Bc(t,Fr,e,gl(e)),pc(Kd,t)}}function Zd(e,t,n){e==="focusin"?(La(),Ar=t,Fr=n,Ar.attachEvent("onpropertychange",Fc)):e==="focusout"&&La()}function Jd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return vo(Fr)}function em(e,t){if(e==="click")return vo(t)}function tm(e,t){if(e==="input"||e==="change")return vo(t)}function nm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var at=typeof Object.is=="function"?Object.is:nm;function Ir(e,t){if(at(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!cs.call(t,i)||!at(e[i],t[i]))return!1}return!0}function Na(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ba(e,t){var n=Na(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Na(n)}}function Ic(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ic(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function bc(){for(var e=window,t=ji();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ji(e.document)}return t}function Pl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function rm(e){var t=bc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ic(n.ownerDocument.documentElement,n)){if(r!==null&&Pl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,o=Math.min(r.start,i);r=r.end===void 0?o:Math.min(r.end,i),!e.extend&&o>r&&(i=r,r=o,o=i),i=Ba(n,o);var s=Ba(n,r);i&&s&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var im=St&&"documentMode"in document&&11>=document.documentMode,Sn=null,Rs=null,Sr=null,ks=!1;function Da(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ks||Sn==null||Sn!==ji(r)||(r=Sn,"selectionStart"in r&&Pl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Sr&&Ir(Sr,r)||(Sr=r,r=$i(Rs,"onSelect"),0<r.length&&(t=new Sl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Sn)))}function li(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Cn={animationend:li("Animation","AnimationEnd"),animationiteration:li("Animation","AnimationIteration"),animationstart:li("Animation","AnimationStart"),transitionend:li("Transition","TransitionEnd")},Vo={},jc={};St&&(jc=document.createElement("div").style,"AnimationEvent"in window||(delete Cn.animationend.animation,delete Cn.animationiteration.animation,delete Cn.animationstart.animation),"TransitionEvent"in window||delete Cn.transitionend.transition);function go(e){if(Vo[e])return Vo[e];if(!Cn[e])return e;var t=Cn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in jc)return Vo[e]=t[n];return e}var Oc=go("animationend"),Uc=go("animationiteration"),Vc=go("animationstart"),Wc=go("transitionend"),Hc=new Map,Fa="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Yt(e,t){Hc.set(e,t),pn(t,[e])}for(var Wo=0;Wo<Fa.length;Wo++){var Ho=Fa[Wo],om=Ho.toLowerCase(),sm=Ho[0].toUpperCase()+Ho.slice(1);Yt(om,"on"+sm)}Yt(Oc,"onAnimationEnd");Yt(Uc,"onAnimationIteration");Yt(Vc,"onAnimationStart");Yt("dblclick","onDoubleClick");Yt("focusin","onFocus");Yt("focusout","onBlur");Yt(Wc,"onTransitionEnd");jn("onMouseEnter",["mouseout","mouseover"]);jn("onMouseLeave",["mouseout","mouseover"]);jn("onPointerEnter",["pointerout","pointerover"]);jn("onPointerLeave",["pointerout","pointerover"]);pn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));pn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));pn("onBeforeInput",["compositionend","keypress","textInput","paste"]);pn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));pn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));pn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lm=new Set("cancel close invalid load scroll toggle".split(" ").concat(yr));function Ia(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,od(r,t,void 0,e),e.currentTarget=null}function Gc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var l=r[s],a=l.instance,u=l.currentTarget;if(l=l.listener,a!==o&&i.isPropagationStopped())break e;Ia(i,l,u),o=a}else for(s=0;s<r.length;s++){if(l=r[s],a=l.instance,u=l.currentTarget,l=l.listener,a!==o&&i.isPropagationStopped())break e;Ia(i,l,u),o=a}}}if(Ui)throw e=Es,Ui=!1,Es=null,e}function Y(e,t){var n=t[Ds];n===void 0&&(n=t[Ds]=new Set);var r=e+"__bubble";n.has(r)||($c(t,e,2,!1),n.add(r))}function Go(e,t,n){var r=0;t&&(r|=4),$c(n,e,r,t)}var ai="_reactListening"+Math.random().toString(36).slice(2);function br(e){if(!e[ai]){e[ai]=!0,Ju.forEach(function(n){n!=="selectionchange"&&(lm.has(n)||Go(n,!1,e),Go(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ai]||(t[ai]=!0,Go("selectionchange",!1,t))}}function $c(e,t,n,r){switch(Rc(t)){case 1:var i=wd;break;case 4:i=Ad;break;default:i=wl}n=i.bind(null,t,n,e),i=void 0,!Cs||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function $o(e,t,n,r,i){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(s===4)for(s=r.return;s!==null;){var a=s.tag;if((a===3||a===4)&&(a=s.stateNode.containerInfo,a===i||a.nodeType===8&&a.parentNode===i))return;s=s.return}for(;l!==null;){if(s=on(l),s===null)return;if(a=s.tag,a===5||a===6){r=o=s;continue e}l=l.parentNode}}r=r.return}pc(function(){var u=o,f=gl(n),p=[];e:{var m=Hc.get(e);if(m!==void 0){var v=Sl,x=e;switch(e){case"keypress":if(Ri(n)===0)break e;case"keydown":case"keyup":v=Id;break;case"focusin":x="focus",v=jo;break;case"focusout":x="blur",v=jo;break;case"beforeblur":case"afterblur":v=jo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":v=Ea;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":v=Ed;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":v=Od;break;case Oc:case Uc:case Vc:v=Md;break;case Wc:v=Vd;break;case"scroll":v=Sd;break;case"wheel":v=Hd;break;case"copy":case"cut":case"paste":v=kd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":v=Ta}var _=(t&4)!==0,E=!_&&e==="scroll",g=_?m!==null?m+"Capture":null:m;_=[];for(var h=u,y;h!==null;){y=h;var w=y.stateNode;if(y.tag===5&&w!==null&&(y=w,g!==null&&(w=Lr(h,g),w!=null&&_.push(jr(h,w,y)))),E)break;h=h.return}0<_.length&&(m=new v(m,x,null,n,f),p.push({event:m,listeners:_}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",v=e==="mouseout"||e==="pointerout",m&&n!==As&&(x=n.relatedTarget||n.fromElement)&&(on(x)||x[Ct]))break e;if((v||m)&&(m=f.window===f?f:(m=f.ownerDocument)?m.defaultView||m.parentWindow:window,v?(x=n.relatedTarget||n.toElement,v=u,x=x?on(x):null,x!==null&&(E=vn(x),x!==E||x.tag!==5&&x.tag!==6)&&(x=null)):(v=null,x=u),v!==x)){if(_=Ea,w="onMouseLeave",g="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(_=Ta,w="onPointerLeave",g="onPointerEnter",h="pointer"),E=v==null?m:En(v),y=x==null?m:En(x),m=new _(w,h+"leave",v,n,f),m.target=E,m.relatedTarget=y,w=null,on(f)===u&&(_=new _(g,h+"enter",x,n,f),_.target=y,_.relatedTarget=E,w=_),E=w,v&&x)t:{for(_=v,g=x,h=0,y=_;y;y=xn(y))h++;for(y=0,w=g;w;w=xn(w))y++;for(;0<h-y;)_=xn(_),h--;for(;0<y-h;)g=xn(g),y--;for(;h--;){if(_===g||g!==null&&_===g.alternate)break t;_=xn(_),g=xn(g)}_=null}else _=null;v!==null&&ba(p,m,v,_,!1),x!==null&&E!==null&&ba(p,E,x,_,!0)}}e:{if(m=u?En(u):window,v=m.nodeName&&m.nodeName.toLowerCase(),v==="select"||v==="input"&&m.type==="file")var A=qd;else if(ka(m))if(Dc)A=tm;else{A=Jd;var P=Zd}else(v=m.nodeName)&&v.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(A=em);if(A&&(A=A(e,u))){Bc(p,A,n,f);break e}P&&P(e,m,u),e==="focusout"&&(P=m._wrapperState)&&P.controlled&&m.type==="number"&&gs(m,"number",m.value)}switch(P=u?En(u):window,e){case"focusin":(ka(P)||P.contentEditable==="true")&&(Sn=P,Rs=u,Sr=null);break;case"focusout":Sr=Rs=Sn=null;break;case"mousedown":ks=!0;break;case"contextmenu":case"mouseup":case"dragend":ks=!1,Da(p,n,f);break;case"selectionchange":if(im)break;case"keydown":case"keyup":Da(p,n,f)}var S;if(El)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else An?Lc(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(zc&&n.locale!=="ko"&&(An||T!=="onCompositionStart"?T==="onCompositionEnd"&&An&&(S=kc()):(Dt=f,Al="value"in Dt?Dt.value:Dt.textContent,An=!0)),P=$i(u,T),0<P.length&&(T=new Pa(T,e,null,n,f),p.push({event:T,listeners:P}),S?T.data=S:(S=Nc(n),S!==null&&(T.data=S)))),(S=$d?Xd(e,n):Yd(e,n))&&(u=$i(u,"onBeforeInput"),0<u.length&&(f=new Pa("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:u}),f.data=S))}Gc(p,t)})}function jr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function $i(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,o=i.stateNode;i.tag===5&&o!==null&&(i=o,o=Lr(e,n),o!=null&&r.unshift(jr(e,o,i)),o=Lr(e,t),o!=null&&r.push(jr(e,o,i))),e=e.return}return r}function xn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ba(e,t,n,r,i){for(var o=t._reactName,s=[];n!==null&&n!==r;){var l=n,a=l.alternate,u=l.stateNode;if(a!==null&&a===r)break;l.tag===5&&u!==null&&(l=u,i?(a=Lr(n,o),a!=null&&s.unshift(jr(n,a,l))):i||(a=Lr(n,o),a!=null&&s.push(jr(n,a,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var am=/\r\n?/g,um=/\u0000|\uFFFD/g;function ja(e){return(typeof e=="string"?e:""+e).replace(am,`
`).replace(um,"")}function ui(e,t,n){if(t=ja(t),ja(e)!==t&&n)throw Error(M(425))}function Xi(){}var zs=null,Ls=null;function Ns(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bs=typeof setTimeout=="function"?setTimeout:void 0,cm=typeof clearTimeout=="function"?clearTimeout:void 0,Oa=typeof Promise=="function"?Promise:void 0,fm=typeof queueMicrotask=="function"?queueMicrotask:typeof Oa<"u"?function(e){return Oa.resolve(null).then(e).catch(hm)}:Bs;function hm(e){setTimeout(function(){throw e})}function Xo(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Dr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Dr(t)}function Ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ua(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Kn=Math.random().toString(36).slice(2),dt="__reactFiber$"+Kn,Or="__reactProps$"+Kn,Ct="__reactContainer$"+Kn,Ds="__reactEvents$"+Kn,dm="__reactListeners$"+Kn,mm="__reactHandles$"+Kn;function on(e){var t=e[dt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ct]||n[dt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ua(e);e!==null;){if(n=e[dt])return n;e=Ua(e)}return t}e=n,n=e.parentNode}return null}function Kr(e){return e=e[dt]||e[Ct],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function En(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(M(33))}function yo(e){return e[Or]||null}var Fs=[],Pn=-1;function Qt(e){return{current:e}}function Q(e){0>Pn||(e.current=Fs[Pn],Fs[Pn]=null,Pn--)}function X(e,t){Pn++,Fs[Pn]=e.current,e.current=t}var $t={},Ee=Qt($t),Be=Qt(!1),cn=$t;function On(e,t){var n=e.type.contextTypes;if(!n)return $t;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},o;for(o in n)i[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function De(e){return e=e.childContextTypes,e!=null}function Yi(){Q(Be),Q(Ee)}function Va(e,t,n){if(Ee.current!==$t)throw Error(M(168));X(Ee,t),X(Be,n)}function Xc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(M(108,Zh(e)||"Unknown",i));return ne({},n,r)}function Qi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||$t,cn=Ee.current,X(Ee,e),X(Be,Be.current),!0}function Wa(e,t,n){var r=e.stateNode;if(!r)throw Error(M(169));n?(e=Xc(e,t,cn),r.__reactInternalMemoizedMergedChildContext=e,Q(Be),Q(Ee),X(Ee,e)):Q(Be),X(Be,n)}var xt=null,xo=!1,Yo=!1;function Yc(e){xt===null?xt=[e]:xt.push(e)}function pm(e){xo=!0,Yc(e)}function Kt(){if(!Yo&&xt!==null){Yo=!0;var e=0,t=H;try{var n=xt;for(H=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}xt=null,xo=!1}catch(i){throw xt!==null&&(xt=xt.slice(e+1)),xc(yl,Kt),i}finally{H=t,Yo=!1}}return null}var Tn=[],Mn=0,Ki=null,qi=0,$e=[],Xe=0,fn=null,_t=1,wt="";function nn(e,t){Tn[Mn++]=qi,Tn[Mn++]=Ki,Ki=e,qi=t}function Qc(e,t,n){$e[Xe++]=_t,$e[Xe++]=wt,$e[Xe++]=fn,fn=e;var r=_t;e=wt;var i=32-ot(r)-1;r&=~(1<<i),n+=1;var o=32-ot(t)+i;if(30<o){var s=i-i%5;o=(r&(1<<s)-1).toString(32),r>>=s,i-=s,_t=1<<32-ot(t)+i|n<<i|r,wt=o+e}else _t=1<<o|n<<i|r,wt=e}function Tl(e){e.return!==null&&(nn(e,1),Qc(e,1,0))}function Ml(e){for(;e===Ki;)Ki=Tn[--Mn],Tn[Mn]=null,qi=Tn[--Mn],Tn[Mn]=null;for(;e===fn;)fn=$e[--Xe],$e[Xe]=null,wt=$e[--Xe],$e[Xe]=null,_t=$e[--Xe],$e[Xe]=null}var Ue=null,Oe=null,q=!1,nt=null;function Kc(e,t){var n=Ye(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ha(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ue=e,Oe=Ot(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ue=e,Oe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=fn!==null?{id:_t,overflow:wt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ye(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ue=e,Oe=null,!0):!1;default:return!1}}function Is(e){return(e.mode&1)!==0&&(e.flags&128)===0}function bs(e){if(q){var t=Oe;if(t){var n=t;if(!Ha(e,t)){if(Is(e))throw Error(M(418));t=Ot(n.nextSibling);var r=Ue;t&&Ha(e,t)?Kc(r,n):(e.flags=e.flags&-4097|2,q=!1,Ue=e)}}else{if(Is(e))throw Error(M(418));e.flags=e.flags&-4097|2,q=!1,Ue=e}}}function Ga(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ue=e}function ci(e){if(e!==Ue)return!1;if(!q)return Ga(e),q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ns(e.type,e.memoizedProps)),t&&(t=Oe)){if(Is(e))throw qc(),Error(M(418));for(;t;)Kc(e,t),t=Ot(t.nextSibling)}if(Ga(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(M(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Oe=Ot(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Oe=null}}else Oe=Ue?Ot(e.stateNode.nextSibling):null;return!0}function qc(){for(var e=Oe;e;)e=Ot(e.nextSibling)}function Un(){Oe=Ue=null,q=!1}function Rl(e){nt===null?nt=[e]:nt.push(e)}var vm=Tt.ReactCurrentBatchConfig;function sr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(M(309));var r=n.stateNode}if(!r)throw Error(M(147,e));var i=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(s){var l=i.refs;s===null?delete l[o]:l[o]=s},t._stringRef=o,t)}if(typeof e!="string")throw Error(M(284));if(!n._owner)throw Error(M(290,e))}return e}function fi(e,t){throw e=Object.prototype.toString.call(t),Error(M(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function $a(e){var t=e._init;return t(e._payload)}function Zc(e){function t(g,h){if(e){var y=g.deletions;y===null?(g.deletions=[h],g.flags|=16):y.push(h)}}function n(g,h){if(!e)return null;for(;h!==null;)t(g,h),h=h.sibling;return null}function r(g,h){for(g=new Map;h!==null;)h.key!==null?g.set(h.key,h):g.set(h.index,h),h=h.sibling;return g}function i(g,h){return g=Ht(g,h),g.index=0,g.sibling=null,g}function o(g,h,y){return g.index=y,e?(y=g.alternate,y!==null?(y=y.index,y<h?(g.flags|=2,h):y):(g.flags|=2,h)):(g.flags|=1048576,h)}function s(g){return e&&g.alternate===null&&(g.flags|=2),g}function l(g,h,y,w){return h===null||h.tag!==6?(h=ts(y,g.mode,w),h.return=g,h):(h=i(h,y),h.return=g,h)}function a(g,h,y,w){var A=y.type;return A===wn?f(g,h,y.props.children,w,y.key):h!==null&&(h.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===kt&&$a(A)===h.type)?(w=i(h,y.props),w.ref=sr(g,h,y),w.return=g,w):(w=Fi(y.type,y.key,y.props,null,g.mode,w),w.ref=sr(g,h,y),w.return=g,w)}function u(g,h,y,w){return h===null||h.tag!==4||h.stateNode.containerInfo!==y.containerInfo||h.stateNode.implementation!==y.implementation?(h=ns(y,g.mode,w),h.return=g,h):(h=i(h,y.children||[]),h.return=g,h)}function f(g,h,y,w,A){return h===null||h.tag!==7?(h=un(y,g.mode,w,A),h.return=g,h):(h=i(h,y),h.return=g,h)}function p(g,h,y){if(typeof h=="string"&&h!==""||typeof h=="number")return h=ts(""+h,g.mode,y),h.return=g,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ei:return y=Fi(h.type,h.key,h.props,null,g.mode,y),y.ref=sr(g,null,h),y.return=g,y;case _n:return h=ns(h,g.mode,y),h.return=g,h;case kt:var w=h._init;return p(g,w(h._payload),y)}if(vr(h)||tr(h))return h=un(h,g.mode,y,null),h.return=g,h;fi(g,h)}return null}function m(g,h,y,w){var A=h!==null?h.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return A!==null?null:l(g,h,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ei:return y.key===A?a(g,h,y,w):null;case _n:return y.key===A?u(g,h,y,w):null;case kt:return A=y._init,m(g,h,A(y._payload),w)}if(vr(y)||tr(y))return A!==null?null:f(g,h,y,w,null);fi(g,y)}return null}function v(g,h,y,w,A){if(typeof w=="string"&&w!==""||typeof w=="number")return g=g.get(y)||null,l(h,g,""+w,A);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case ei:return g=g.get(w.key===null?y:w.key)||null,a(h,g,w,A);case _n:return g=g.get(w.key===null?y:w.key)||null,u(h,g,w,A);case kt:var P=w._init;return v(g,h,y,P(w._payload),A)}if(vr(w)||tr(w))return g=g.get(y)||null,f(h,g,w,A,null);fi(h,w)}return null}function x(g,h,y,w){for(var A=null,P=null,S=h,T=h=0,B=null;S!==null&&T<y.length;T++){S.index>T?(B=S,S=null):B=S.sibling;var k=m(g,S,y[T],w);if(k===null){S===null&&(S=B);break}e&&S&&k.alternate===null&&t(g,S),h=o(k,h,T),P===null?A=k:P.sibling=k,P=k,S=B}if(T===y.length)return n(g,S),q&&nn(g,T),A;if(S===null){for(;T<y.length;T++)S=p(g,y[T],w),S!==null&&(h=o(S,h,T),P===null?A=S:P.sibling=S,P=S);return q&&nn(g,T),A}for(S=r(g,S);T<y.length;T++)B=v(S,g,T,y[T],w),B!==null&&(e&&B.alternate!==null&&S.delete(B.key===null?T:B.key),h=o(B,h,T),P===null?A=B:P.sibling=B,P=B);return e&&S.forEach(function(D){return t(g,D)}),q&&nn(g,T),A}function _(g,h,y,w){var A=tr(y);if(typeof A!="function")throw Error(M(150));if(y=A.call(y),y==null)throw Error(M(151));for(var P=A=null,S=h,T=h=0,B=null,k=y.next();S!==null&&!k.done;T++,k=y.next()){S.index>T?(B=S,S=null):B=S.sibling;var D=m(g,S,k.value,w);if(D===null){S===null&&(S=B);break}e&&S&&D.alternate===null&&t(g,S),h=o(D,h,T),P===null?A=D:P.sibling=D,P=D,S=B}if(k.done)return n(g,S),q&&nn(g,T),A;if(S===null){for(;!k.done;T++,k=y.next())k=p(g,k.value,w),k!==null&&(h=o(k,h,T),P===null?A=k:P.sibling=k,P=k);return q&&nn(g,T),A}for(S=r(g,S);!k.done;T++,k=y.next())k=v(S,g,T,k.value,w),k!==null&&(e&&k.alternate!==null&&S.delete(k.key===null?T:k.key),h=o(k,h,T),P===null?A=k:P.sibling=k,P=k);return e&&S.forEach(function(se){return t(g,se)}),q&&nn(g,T),A}function E(g,h,y,w){if(typeof y=="object"&&y!==null&&y.type===wn&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case ei:e:{for(var A=y.key,P=h;P!==null;){if(P.key===A){if(A=y.type,A===wn){if(P.tag===7){n(g,P.sibling),h=i(P,y.props.children),h.return=g,g=h;break e}}else if(P.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===kt&&$a(A)===P.type){n(g,P.sibling),h=i(P,y.props),h.ref=sr(g,P,y),h.return=g,g=h;break e}n(g,P);break}else t(g,P);P=P.sibling}y.type===wn?(h=un(y.props.children,g.mode,w,y.key),h.return=g,g=h):(w=Fi(y.type,y.key,y.props,null,g.mode,w),w.ref=sr(g,h,y),w.return=g,g=w)}return s(g);case _n:e:{for(P=y.key;h!==null;){if(h.key===P)if(h.tag===4&&h.stateNode.containerInfo===y.containerInfo&&h.stateNode.implementation===y.implementation){n(g,h.sibling),h=i(h,y.children||[]),h.return=g,g=h;break e}else{n(g,h);break}else t(g,h);h=h.sibling}h=ns(y,g.mode,w),h.return=g,g=h}return s(g);case kt:return P=y._init,E(g,h,P(y._payload),w)}if(vr(y))return x(g,h,y,w);if(tr(y))return _(g,h,y,w);fi(g,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,h!==null&&h.tag===6?(n(g,h.sibling),h=i(h,y),h.return=g,g=h):(n(g,h),h=ts(y,g.mode,w),h.return=g,g=h),s(g)):n(g,h)}return E}var Vn=Zc(!0),Jc=Zc(!1),Zi=Qt(null),Ji=null,Rn=null,kl=null;function zl(){kl=Rn=Ji=null}function Ll(e){var t=Zi.current;Q(Zi),e._currentValue=t}function js(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function In(e,t){Ji=e,kl=Rn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ne=!0),e.firstContext=null)}function qe(e){var t=e._currentValue;if(kl!==e)if(e={context:e,memoizedValue:t,next:null},Rn===null){if(Ji===null)throw Error(M(308));Rn=e,Ji.dependencies={lanes:0,firstContext:e}}else Rn=Rn.next=e;return t}var sn=null;function Nl(e){sn===null?sn=[e]:sn.push(e)}function ef(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Nl(t)):(n.next=i.next,i.next=n),t.interleaved=n,Et(e,r)}function Et(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var zt=!1;function Bl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function tf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function At(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Ut(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,U&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Et(e,n)}return i=r.interleaved,i===null?(t.next=t,Nl(r)):(t.next=i.next,i.next=t),r.interleaved=t,Et(e,n)}function ki(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xl(e,n)}}function Xa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?i=o=s:o=o.next=s,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function eo(e,t,n,r){var i=e.updateQueue;zt=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var a=l,u=a.next;a.next=null,s===null?o=u:s.next=u,s=a;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==s&&(l===null?f.firstBaseUpdate=u:l.next=u,f.lastBaseUpdate=a))}if(o!==null){var p=i.baseState;s=0,f=u=a=null,l=o;do{var m=l.lane,v=l.eventTime;if((r&m)===m){f!==null&&(f=f.next={eventTime:v,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=e,_=l;switch(m=t,v=n,_.tag){case 1:if(x=_.payload,typeof x=="function"){p=x.call(v,p,m);break e}p=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=_.payload,m=typeof x=="function"?x.call(v,p,m):x,m==null)break e;p=ne({},p,m);break e;case 2:zt=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[l]:m.push(l))}else v={eventTime:v,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(u=f=v,a=p):f=f.next=v,s|=m;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;m=l,l=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(f===null&&(a=p),i.baseState=a,i.firstBaseUpdate=u,i.lastBaseUpdate=f,t=i.shared.interleaved,t!==null){i=t;do s|=i.lane,i=i.next;while(i!==t)}else o===null&&(i.shared.lanes=0);dn|=s,e.lanes=s,e.memoizedState=p}}function Ya(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(M(191,i));i.call(r)}}}var qr={},vt=Qt(qr),Ur=Qt(qr),Vr=Qt(qr);function ln(e){if(e===qr)throw Error(M(174));return e}function Dl(e,t){switch(X(Vr,t),X(Ur,e),X(vt,qr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:xs(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=xs(t,e)}Q(vt),X(vt,t)}function Wn(){Q(vt),Q(Ur),Q(Vr)}function nf(e){ln(Vr.current);var t=ln(vt.current),n=xs(t,e.type);t!==n&&(X(Ur,e),X(vt,n))}function Fl(e){Ur.current===e&&(Q(vt),Q(Ur))}var ee=Qt(0);function to(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Qo=[];function Il(){for(var e=0;e<Qo.length;e++)Qo[e]._workInProgressVersionPrimary=null;Qo.length=0}var zi=Tt.ReactCurrentDispatcher,Ko=Tt.ReactCurrentBatchConfig,hn=0,te=null,he=null,me=null,no=!1,Cr=!1,Wr=0,gm=0;function Ae(){throw Error(M(321))}function bl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!at(e[n],t[n]))return!1;return!0}function jl(e,t,n,r,i,o){if(hn=o,te=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,zi.current=e===null||e.memoizedState===null?wm:Am,e=n(r,i),Cr){o=0;do{if(Cr=!1,Wr=0,25<=o)throw Error(M(301));o+=1,me=he=null,t.updateQueue=null,zi.current=Sm,e=n(r,i)}while(Cr)}if(zi.current=ro,t=he!==null&&he.next!==null,hn=0,me=he=te=null,no=!1,t)throw Error(M(300));return e}function Ol(){var e=Wr!==0;return Wr=0,e}function ht(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return me===null?te.memoizedState=me=e:me=me.next=e,me}function Ze(){if(he===null){var e=te.alternate;e=e!==null?e.memoizedState:null}else e=he.next;var t=me===null?te.memoizedState:me.next;if(t!==null)me=t,he=e;else{if(e===null)throw Error(M(310));he=e,e={memoizedState:he.memoizedState,baseState:he.baseState,baseQueue:he.baseQueue,queue:he.queue,next:null},me===null?te.memoizedState=me=e:me=me.next=e}return me}function Hr(e,t){return typeof t=="function"?t(e):t}function qo(e){var t=Ze(),n=t.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=e;var r=he,i=r.baseQueue,o=n.pending;if(o!==null){if(i!==null){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(i!==null){o=i.next,r=r.baseState;var l=s=null,a=null,u=o;do{var f=u.lane;if((hn&f)===f)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var p={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(l=a=p,s=r):a=a.next=p,te.lanes|=f,dn|=f}u=u.next}while(u!==null&&u!==o);a===null?s=r:a.next=l,at(r,t.memoizedState)||(Ne=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do o=i.lane,te.lanes|=o,dn|=o,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Zo(e){var t=Ze(),n=t.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do o=e(o,s.action),s=s.next;while(s!==i);at(o,t.memoizedState)||(Ne=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function rf(){}function of(e,t){var n=te,r=Ze(),i=t(),o=!at(r.memoizedState,i);if(o&&(r.memoizedState=i,Ne=!0),r=r.queue,Ul(af.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||me!==null&&me.memoizedState.tag&1){if(n.flags|=2048,Gr(9,lf.bind(null,n,r,i,t),void 0,null),ve===null)throw Error(M(349));hn&30||sf(n,t,i)}return i}function sf(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function lf(e,t,n,r){t.value=n,t.getSnapshot=r,uf(t)&&cf(e)}function af(e,t,n){return n(function(){uf(t)&&cf(e)})}function uf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!at(e,n)}catch{return!0}}function cf(e){var t=Et(e,1);t!==null&&st(t,e,1,-1)}function Qa(e){var t=ht();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Hr,lastRenderedState:e},t.queue=e,e=e.dispatch=_m.bind(null,te,e),[t.memoizedState,e]}function Gr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ff(){return Ze().memoizedState}function Li(e,t,n,r){var i=ht();te.flags|=e,i.memoizedState=Gr(1|t,n,void 0,r===void 0?null:r)}function _o(e,t,n,r){var i=Ze();r=r===void 0?null:r;var o=void 0;if(he!==null){var s=he.memoizedState;if(o=s.destroy,r!==null&&bl(r,s.deps)){i.memoizedState=Gr(t,n,o,r);return}}te.flags|=e,i.memoizedState=Gr(1|t,n,o,r)}function Ka(e,t){return Li(8390656,8,e,t)}function Ul(e,t){return _o(2048,8,e,t)}function hf(e,t){return _o(4,2,e,t)}function df(e,t){return _o(4,4,e,t)}function mf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function pf(e,t,n){return n=n!=null?n.concat([e]):null,_o(4,4,mf.bind(null,t,e),n)}function Vl(){}function vf(e,t){var n=Ze();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&bl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function gf(e,t){var n=Ze();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&bl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function yf(e,t,n){return hn&21?(at(n,t)||(n=Ac(),te.lanes|=n,dn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ne=!0),e.memoizedState=n)}function ym(e,t){var n=H;H=n!==0&&4>n?n:4,e(!0);var r=Ko.transition;Ko.transition={};try{e(!1),t()}finally{H=n,Ko.transition=r}}function xf(){return Ze().memoizedState}function xm(e,t,n){var r=Wt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},_f(e))wf(t,n);else if(n=ef(e,t,n,r),n!==null){var i=Re();st(n,e,r,i),Af(n,t,r)}}function _m(e,t,n){var r=Wt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(_f(e))wf(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var s=t.lastRenderedState,l=o(s,n);if(i.hasEagerState=!0,i.eagerState=l,at(l,s)){var a=t.interleaved;a===null?(i.next=i,Nl(t)):(i.next=a.next,a.next=i),t.interleaved=i;return}}catch{}finally{}n=ef(e,t,i,r),n!==null&&(i=Re(),st(n,e,r,i),Af(n,t,r))}}function _f(e){var t=e.alternate;return e===te||t!==null&&t===te}function wf(e,t){Cr=no=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Af(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xl(e,n)}}var ro={readContext:qe,useCallback:Ae,useContext:Ae,useEffect:Ae,useImperativeHandle:Ae,useInsertionEffect:Ae,useLayoutEffect:Ae,useMemo:Ae,useReducer:Ae,useRef:Ae,useState:Ae,useDebugValue:Ae,useDeferredValue:Ae,useTransition:Ae,useMutableSource:Ae,useSyncExternalStore:Ae,useId:Ae,unstable_isNewReconciler:!1},wm={readContext:qe,useCallback:function(e,t){return ht().memoizedState=[e,t===void 0?null:t],e},useContext:qe,useEffect:Ka,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Li(4194308,4,mf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Li(4194308,4,e,t)},useInsertionEffect:function(e,t){return Li(4,2,e,t)},useMemo:function(e,t){var n=ht();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=ht();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=xm.bind(null,te,e),[r.memoizedState,e]},useRef:function(e){var t=ht();return e={current:e},t.memoizedState=e},useState:Qa,useDebugValue:Vl,useDeferredValue:function(e){return ht().memoizedState=e},useTransition:function(){var e=Qa(!1),t=e[0];return e=ym.bind(null,e[1]),ht().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=te,i=ht();if(q){if(n===void 0)throw Error(M(407));n=n()}else{if(n=t(),ve===null)throw Error(M(349));hn&30||sf(r,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Ka(af.bind(null,r,o,e),[e]),r.flags|=2048,Gr(9,lf.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=ht(),t=ve.identifierPrefix;if(q){var n=wt,r=_t;n=(r&~(1<<32-ot(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Wr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=gm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Am={readContext:qe,useCallback:vf,useContext:qe,useEffect:Ul,useImperativeHandle:pf,useInsertionEffect:hf,useLayoutEffect:df,useMemo:gf,useReducer:qo,useRef:ff,useState:function(){return qo(Hr)},useDebugValue:Vl,useDeferredValue:function(e){var t=Ze();return yf(t,he.memoizedState,e)},useTransition:function(){var e=qo(Hr)[0],t=Ze().memoizedState;return[e,t]},useMutableSource:rf,useSyncExternalStore:of,useId:xf,unstable_isNewReconciler:!1},Sm={readContext:qe,useCallback:vf,useContext:qe,useEffect:Ul,useImperativeHandle:pf,useInsertionEffect:hf,useLayoutEffect:df,useMemo:gf,useReducer:Zo,useRef:ff,useState:function(){return Zo(Hr)},useDebugValue:Vl,useDeferredValue:function(e){var t=Ze();return he===null?t.memoizedState=e:yf(t,he.memoizedState,e)},useTransition:function(){var e=Zo(Hr)[0],t=Ze().memoizedState;return[e,t]},useMutableSource:rf,useSyncExternalStore:of,useId:xf,unstable_isNewReconciler:!1};function et(e,t){if(e&&e.defaultProps){t=ne({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Os(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ne({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var wo={isMounted:function(e){return(e=e._reactInternals)?vn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Re(),i=Wt(e),o=At(r,i);o.payload=t,n!=null&&(o.callback=n),t=Ut(e,o,i),t!==null&&(st(t,e,i,r),ki(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Re(),i=Wt(e),o=At(r,i);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Ut(e,o,i),t!==null&&(st(t,e,i,r),ki(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Re(),r=Wt(e),i=At(n,r);i.tag=2,t!=null&&(i.callback=t),t=Ut(e,i,r),t!==null&&(st(t,e,r,n),ki(t,e,r))}};function qa(e,t,n,r,i,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,s):t.prototype&&t.prototype.isPureReactComponent?!Ir(n,r)||!Ir(i,o):!0}function Sf(e,t,n){var r=!1,i=$t,o=t.contextType;return typeof o=="object"&&o!==null?o=qe(o):(i=De(t)?cn:Ee.current,r=t.contextTypes,o=(r=r!=null)?On(e,i):$t),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=wo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Za(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&wo.enqueueReplaceState(t,t.state,null)}function Us(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Bl(e);var o=t.contextType;typeof o=="object"&&o!==null?i.context=qe(o):(o=De(t)?cn:Ee.current,i.context=On(e,o)),i.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(Os(e,t,o,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&wo.enqueueReplaceState(i,i.state,null),eo(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Hn(e,t){try{var n="",r=t;do n+=qh(r),r=r.return;while(r);var i=n}catch(o){i=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:i,digest:null}}function Jo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Vs(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Cm=typeof WeakMap=="function"?WeakMap:Map;function Cf(e,t,n){n=At(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){oo||(oo=!0,Zs=r),Vs(e,t)},n}function Ef(e,t,n){n=At(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Vs(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Vs(e,t),typeof r!="function"&&(Vt===null?Vt=new Set([this]):Vt.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function Ja(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Cm;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=bm.bind(null,e,t,n),t.then(e,e))}function eu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function tu(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=At(-1,1),t.tag=2,Ut(n,t,1))),n.lanes|=1),e)}var Em=Tt.ReactCurrentOwner,Ne=!1;function Me(e,t,n,r){t.child=e===null?Jc(t,null,n,r):Vn(t,e.child,n,r)}function nu(e,t,n,r,i){n=n.render;var o=t.ref;return In(t,i),r=jl(e,t,n,r,o,i),n=Ol(),e!==null&&!Ne?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Pt(e,t,i)):(q&&n&&Tl(t),t.flags|=1,Me(e,t,r,i),t.child)}function ru(e,t,n,r,i){if(e===null){var o=n.type;return typeof o=="function"&&!Kl(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Pf(e,t,o,r,i)):(e=Fi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&i)){var s=o.memoizedProps;if(n=n.compare,n=n!==null?n:Ir,n(s,r)&&e.ref===t.ref)return Pt(e,t,i)}return t.flags|=1,e=Ht(o,r),e.ref=t.ref,e.return=t,t.child=e}function Pf(e,t,n,r,i){if(e!==null){var o=e.memoizedProps;if(Ir(o,r)&&e.ref===t.ref)if(Ne=!1,t.pendingProps=r=o,(e.lanes&i)!==0)e.flags&131072&&(Ne=!0);else return t.lanes=e.lanes,Pt(e,t,i)}return Ws(e,t,n,r,i)}function Tf(e,t,n){var r=t.pendingProps,i=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(zn,je),je|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,X(zn,je),je|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,X(zn,je),je|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,X(zn,je),je|=r;return Me(e,t,i,n),t.child}function Mf(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Ws(e,t,n,r,i){var o=De(n)?cn:Ee.current;return o=On(t,o),In(t,i),n=jl(e,t,n,r,o,i),r=Ol(),e!==null&&!Ne?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Pt(e,t,i)):(q&&r&&Tl(t),t.flags|=1,Me(e,t,n,i),t.child)}function iu(e,t,n,r,i){if(De(n)){var o=!0;Qi(t)}else o=!1;if(In(t,i),t.stateNode===null)Ni(e,t),Sf(t,n,r),Us(t,n,r,i),r=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var a=s.context,u=n.contextType;typeof u=="object"&&u!==null?u=qe(u):(u=De(n)?cn:Ee.current,u=On(t,u));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof s.getSnapshotBeforeUpdate=="function";p||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==r||a!==u)&&Za(t,s,r,u),zt=!1;var m=t.memoizedState;s.state=m,eo(t,r,s,i),a=t.memoizedState,l!==r||m!==a||Be.current||zt?(typeof f=="function"&&(Os(t,n,f,r),a=t.memoizedState),(l=zt||qa(t,n,l,r,m,a,u))?(p||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),s.props=r,s.state=a,s.context=u,r=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,tf(e,t),l=t.memoizedProps,u=t.type===t.elementType?l:et(t.type,l),s.props=u,p=t.pendingProps,m=s.context,a=n.contextType,typeof a=="object"&&a!==null?a=qe(a):(a=De(n)?cn:Ee.current,a=On(t,a));var v=n.getDerivedStateFromProps;(f=typeof v=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==p||m!==a)&&Za(t,s,r,a),zt=!1,m=t.memoizedState,s.state=m,eo(t,r,s,i);var x=t.memoizedState;l!==p||m!==x||Be.current||zt?(typeof v=="function"&&(Os(t,n,v,r),x=t.memoizedState),(u=zt||qa(t,n,u,r,m,x,a)||!1)?(f||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,x,a),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,x,a)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=x),s.props=r,s.state=x,s.context=a,r=u):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Hs(e,t,n,r,o,i)}function Hs(e,t,n,r,i,o){Mf(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return i&&Wa(t,n,!1),Pt(e,t,o);r=t.stateNode,Em.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=Vn(t,e.child,null,o),t.child=Vn(t,null,l,o)):Me(e,t,l,o),t.memoizedState=r.state,i&&Wa(t,n,!0),t.child}function Rf(e){var t=e.stateNode;t.pendingContext?Va(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Va(e,t.context,!1),Dl(e,t.containerInfo)}function ou(e,t,n,r,i){return Un(),Rl(i),t.flags|=256,Me(e,t,n,r),t.child}var Gs={dehydrated:null,treeContext:null,retryLane:0};function $s(e){return{baseLanes:e,cachePool:null,transitions:null}}function kf(e,t,n){var r=t.pendingProps,i=ee.current,o=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),X(ee,i&1),e===null)return bs(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,o?(r=t.mode,o=t.child,s={mode:"hidden",children:s},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=Co(s,r,0,null),e=un(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=$s(n),t.memoizedState=Gs,e):Wl(t,s));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Pm(e,t,s,r,l,i,n);if(o){o=r.fallback,s=t.mode,i=e.child,l=i.sibling;var a={mode:"hidden",children:r.children};return!(s&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=Ht(i,a),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?o=Ht(l,o):(o=un(o,s,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,s=e.child.memoizedState,s=s===null?$s(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~n,t.memoizedState=Gs,r}return o=e.child,e=o.sibling,r=Ht(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Wl(e,t){return t=Co({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function hi(e,t,n,r){return r!==null&&Rl(r),Vn(t,e.child,null,n),e=Wl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Pm(e,t,n,r,i,o,s){if(n)return t.flags&256?(t.flags&=-257,r=Jo(Error(M(422))),hi(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,i=t.mode,r=Co({mode:"visible",children:r.children},i,0,null),o=un(o,i,s,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Vn(t,e.child,null,s),t.child.memoizedState=$s(s),t.memoizedState=Gs,o);if(!(t.mode&1))return hi(e,t,s,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(M(419)),r=Jo(o,r,void 0),hi(e,t,s,r)}if(l=(s&e.childLanes)!==0,Ne||l){if(r=ve,r!==null){switch(s&-s){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|s)?0:i,i!==0&&i!==o.retryLane&&(o.retryLane=i,Et(e,i),st(r,e,i,-1))}return Ql(),r=Jo(Error(M(421))),hi(e,t,s,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=jm.bind(null,e),i._reactRetry=t,null):(e=o.treeContext,Oe=Ot(i.nextSibling),Ue=t,q=!0,nt=null,e!==null&&($e[Xe++]=_t,$e[Xe++]=wt,$e[Xe++]=fn,_t=e.id,wt=e.overflow,fn=t),t=Wl(t,r.children),t.flags|=4096,t)}function su(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),js(e.return,t,n)}function es(e,t,n,r,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i)}function zf(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(Me(e,t,r.children,n),r=ee.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&su(e,n,t);else if(e.tag===19)su(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(X(ee,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&to(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),es(t,!1,i,n,o);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&to(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}es(t,!0,n,null,o);break;case"together":es(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ni(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Pt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(M(153));if(t.child!==null){for(e=t.child,n=Ht(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ht(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Tm(e,t,n){switch(t.tag){case 3:Rf(t),Un();break;case 5:nf(t);break;case 1:De(t.type)&&Qi(t);break;case 4:Dl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;X(Zi,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(X(ee,ee.current&1),t.flags|=128,null):n&t.child.childLanes?kf(e,t,n):(X(ee,ee.current&1),e=Pt(e,t,n),e!==null?e.sibling:null);X(ee,ee.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return zf(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),X(ee,ee.current),r)break;return null;case 22:case 23:return t.lanes=0,Tf(e,t,n)}return Pt(e,t,n)}var Lf,Xs,Nf,Bf;Lf=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Xs=function(){};Nf=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,ln(vt.current);var o=null;switch(n){case"input":i=ps(e,i),r=ps(e,r),o=[];break;case"select":i=ne({},i,{value:void 0}),r=ne({},r,{value:void 0}),o=[];break;case"textarea":i=ys(e,i),r=ys(e,r),o=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Xi)}_s(n,r);var s;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var l=i[u];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(kr.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var a=r[u];if(l=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&a!==l&&(a!=null||l!=null))if(u==="style")if(l){for(s in l)!l.hasOwnProperty(s)||a&&a.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in a)a.hasOwnProperty(s)&&l[s]!==a[s]&&(n||(n={}),n[s]=a[s])}else n||(o||(o=[]),o.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,l=l?l.__html:void 0,a!=null&&l!==a&&(o=o||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(o=o||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(kr.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&Y("scroll",e),o||l===a||(o=[])):(o=o||[]).push(u,a))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};Bf=function(e,t,n,r){n!==r&&(t.flags|=4)};function lr(e,t){if(!q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Mm(e,t,n){var r=t.pendingProps;switch(Ml(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Se(t),null;case 1:return De(t.type)&&Yi(),Se(t),null;case 3:return r=t.stateNode,Wn(),Q(Be),Q(Ee),Il(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ci(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,nt!==null&&(tl(nt),nt=null))),Xs(e,t),Se(t),null;case 5:Fl(t);var i=ln(Vr.current);if(n=t.type,e!==null&&t.stateNode!=null)Nf(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(M(166));return Se(t),null}if(e=ln(vt.current),ci(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[dt]=t,r[Or]=o,e=(t.mode&1)!==0,n){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(i=0;i<yr.length;i++)Y(yr[i],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":pa(r,o),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Y("invalid",r);break;case"textarea":ga(r,o),Y("invalid",r)}_s(n,o),i=null;for(var s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&ui(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&ui(r.textContent,l,e),i=["children",""+l]):kr.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&Y("scroll",r)}switch(n){case"input":ti(r),va(r,o,!0);break;case"textarea":ti(r),ya(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=Xi)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=lc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[dt]=t,e[Or]=r,Lf(e,t,!1,!1),t.stateNode=e;e:{switch(s=ws(n,r),n){case"dialog":Y("cancel",e),Y("close",e),i=r;break;case"iframe":case"object":case"embed":Y("load",e),i=r;break;case"video":case"audio":for(i=0;i<yr.length;i++)Y(yr[i],e);i=r;break;case"source":Y("error",e),i=r;break;case"img":case"image":case"link":Y("error",e),Y("load",e),i=r;break;case"details":Y("toggle",e),i=r;break;case"input":pa(e,r),i=ps(e,r),Y("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=ne({},r,{value:void 0}),Y("invalid",e);break;case"textarea":ga(e,r),i=ys(e,r),Y("invalid",e);break;default:i=r}_s(n,i),l=i;for(o in l)if(l.hasOwnProperty(o)){var a=l[o];o==="style"?cc(e,a):o==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&ac(e,a)):o==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&zr(e,a):typeof a=="number"&&zr(e,""+a):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(kr.hasOwnProperty(o)?a!=null&&o==="onScroll"&&Y("scroll",e):a!=null&&dl(e,o,a,s))}switch(n){case"input":ti(e),va(e,r,!1);break;case"textarea":ti(e),ya(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Gt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Nn(e,!!r.multiple,o,!1):r.defaultValue!=null&&Nn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Xi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Se(t),null;case 6:if(e&&t.stateNode!=null)Bf(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(M(166));if(n=ln(Vr.current),ln(vt.current),ci(t)){if(r=t.stateNode,n=t.memoizedProps,r[dt]=t,(o=r.nodeValue!==n)&&(e=Ue,e!==null))switch(e.tag){case 3:ui(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ui(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[dt]=t,t.stateNode=r}return Se(t),null;case 13:if(Q(ee),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(q&&Oe!==null&&t.mode&1&&!(t.flags&128))qc(),Un(),t.flags|=98560,o=!1;else if(o=ci(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(M(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(M(317));o[dt]=t}else Un(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Se(t),o=!1}else nt!==null&&(tl(nt),nt=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ee.current&1?de===0&&(de=3):Ql())),t.updateQueue!==null&&(t.flags|=4),Se(t),null);case 4:return Wn(),Xs(e,t),e===null&&br(t.stateNode.containerInfo),Se(t),null;case 10:return Ll(t.type._context),Se(t),null;case 17:return De(t.type)&&Yi(),Se(t),null;case 19:if(Q(ee),o=t.memoizedState,o===null)return Se(t),null;if(r=(t.flags&128)!==0,s=o.rendering,s===null)if(r)lr(o,!1);else{if(de!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=to(e),s!==null){for(t.flags|=128,lr(o,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return X(ee,ee.current&1|2),t.child}e=e.sibling}o.tail!==null&&ie()>Gn&&(t.flags|=128,r=!0,lr(o,!1),t.lanes=4194304)}else{if(!r)if(e=to(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),lr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!q)return Se(t),null}else 2*ie()-o.renderingStartTime>Gn&&n!==1073741824&&(t.flags|=128,r=!0,lr(o,!1),t.lanes=4194304);o.isBackwards?(s.sibling=t.child,t.child=s):(n=o.last,n!==null?n.sibling=s:t.child=s,o.last=s)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ie(),t.sibling=null,n=ee.current,X(ee,r?n&1|2:n&1),t):(Se(t),null);case 22:case 23:return Yl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?je&1073741824&&(Se(t),t.subtreeFlags&6&&(t.flags|=8192)):Se(t),null;case 24:return null;case 25:return null}throw Error(M(156,t.tag))}function Rm(e,t){switch(Ml(t),t.tag){case 1:return De(t.type)&&Yi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Wn(),Q(Be),Q(Ee),Il(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Fl(t),null;case 13:if(Q(ee),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(M(340));Un()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Q(ee),null;case 4:return Wn(),null;case 10:return Ll(t.type._context),null;case 22:case 23:return Yl(),null;case 24:return null;default:return null}}var di=!1,Ce=!1,km=typeof WeakSet=="function"?WeakSet:Set,L=null;function kn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){re(e,t,r)}else n.current=null}function Ys(e,t,n){try{n()}catch(r){re(e,t,r)}}var lu=!1;function zm(e,t){if(zs=Hi,e=bc(),Pl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var s=0,l=-1,a=-1,u=0,f=0,p=e,m=null;t:for(;;){for(var v;p!==n||i!==0&&p.nodeType!==3||(l=s+i),p!==o||r!==0&&p.nodeType!==3||(a=s+r),p.nodeType===3&&(s+=p.nodeValue.length),(v=p.firstChild)!==null;)m=p,p=v;for(;;){if(p===e)break t;if(m===n&&++u===i&&(l=s),m===o&&++f===r&&(a=s),(v=p.nextSibling)!==null)break;p=m,m=p.parentNode}p=v}n=l===-1||a===-1?null:{start:l,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ls={focusedElem:e,selectionRange:n},Hi=!1,L=t;L!==null;)if(t=L,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,L=e;else for(;L!==null;){t=L;try{var x=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var _=x.memoizedProps,E=x.memoizedState,g=t.stateNode,h=g.getSnapshotBeforeUpdate(t.elementType===t.type?_:et(t.type,_),E);g.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(M(163))}}catch(w){re(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,L=e;break}L=t.return}return x=lu,lu=!1,x}function Er(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var o=i.destroy;i.destroy=void 0,o!==void 0&&Ys(t,n,o)}i=i.next}while(i!==r)}}function Ao(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Qs(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Df(e){var t=e.alternate;t!==null&&(e.alternate=null,Df(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[dt],delete t[Or],delete t[Ds],delete t[dm],delete t[mm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ff(e){return e.tag===5||e.tag===3||e.tag===4}function au(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ff(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ks(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Xi));else if(r!==4&&(e=e.child,e!==null))for(Ks(e,t,n),e=e.sibling;e!==null;)Ks(e,t,n),e=e.sibling}function qs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(qs(e,t,n),e=e.sibling;e!==null;)qs(e,t,n),e=e.sibling}var ge=null,tt=!1;function Mt(e,t,n){for(n=n.child;n!==null;)If(e,t,n),n=n.sibling}function If(e,t,n){if(pt&&typeof pt.onCommitFiberUnmount=="function")try{pt.onCommitFiberUnmount(mo,n)}catch{}switch(n.tag){case 5:Ce||kn(n,t);case 6:var r=ge,i=tt;ge=null,Mt(e,t,n),ge=r,tt=i,ge!==null&&(tt?(e=ge,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ge.removeChild(n.stateNode));break;case 18:ge!==null&&(tt?(e=ge,n=n.stateNode,e.nodeType===8?Xo(e.parentNode,n):e.nodeType===1&&Xo(e,n),Dr(e)):Xo(ge,n.stateNode));break;case 4:r=ge,i=tt,ge=n.stateNode.containerInfo,tt=!0,Mt(e,t,n),ge=r,tt=i;break;case 0:case 11:case 14:case 15:if(!Ce&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var o=i,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&Ys(n,t,s),i=i.next}while(i!==r)}Mt(e,t,n);break;case 1:if(!Ce&&(kn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){re(n,t,l)}Mt(e,t,n);break;case 21:Mt(e,t,n);break;case 22:n.mode&1?(Ce=(r=Ce)||n.memoizedState!==null,Mt(e,t,n),Ce=r):Mt(e,t,n);break;default:Mt(e,t,n)}}function uu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new km),t.forEach(function(r){var i=Om.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Je(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var o=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:ge=l.stateNode,tt=!1;break e;case 3:ge=l.stateNode.containerInfo,tt=!0;break e;case 4:ge=l.stateNode.containerInfo,tt=!0;break e}l=l.return}if(ge===null)throw Error(M(160));If(o,s,i),ge=null,tt=!1;var a=i.alternate;a!==null&&(a.return=null),i.return=null}catch(u){re(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)bf(t,e),t=t.sibling}function bf(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Je(t,e),ut(e),r&4){try{Er(3,e,e.return),Ao(3,e)}catch(_){re(e,e.return,_)}try{Er(5,e,e.return)}catch(_){re(e,e.return,_)}}break;case 1:Je(t,e),ut(e),r&512&&n!==null&&kn(n,n.return);break;case 5:if(Je(t,e),ut(e),r&512&&n!==null&&kn(n,n.return),e.flags&32){var i=e.stateNode;try{zr(i,"")}catch(_){re(e,e.return,_)}}if(r&4&&(i=e.stateNode,i!=null)){var o=e.memoizedProps,s=n!==null?n.memoizedProps:o,l=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&oc(i,o),ws(l,s);var u=ws(l,o);for(s=0;s<a.length;s+=2){var f=a[s],p=a[s+1];f==="style"?cc(i,p):f==="dangerouslySetInnerHTML"?ac(i,p):f==="children"?zr(i,p):dl(i,f,p,u)}switch(l){case"input":vs(i,o);break;case"textarea":sc(i,o);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!o.multiple;var v=o.value;v!=null?Nn(i,!!o.multiple,v,!1):m!==!!o.multiple&&(o.defaultValue!=null?Nn(i,!!o.multiple,o.defaultValue,!0):Nn(i,!!o.multiple,o.multiple?[]:"",!1))}i[Or]=o}catch(_){re(e,e.return,_)}}break;case 6:if(Je(t,e),ut(e),r&4){if(e.stateNode===null)throw Error(M(162));i=e.stateNode,o=e.memoizedProps;try{i.nodeValue=o}catch(_){re(e,e.return,_)}}break;case 3:if(Je(t,e),ut(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Dr(t.containerInfo)}catch(_){re(e,e.return,_)}break;case 4:Je(t,e),ut(e);break;case 13:Je(t,e),ut(e),i=e.child,i.flags&8192&&(o=i.memoizedState!==null,i.stateNode.isHidden=o,!o||i.alternate!==null&&i.alternate.memoizedState!==null||($l=ie())),r&4&&uu(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(Ce=(u=Ce)||f,Je(t,e),Ce=u):Je(t,e),ut(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(L=e,f=e.child;f!==null;){for(p=L=f;L!==null;){switch(m=L,v=m.child,m.tag){case 0:case 11:case 14:case 15:Er(4,m,m.return);break;case 1:kn(m,m.return);var x=m.stateNode;if(typeof x.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,x.props=t.memoizedProps,x.state=t.memoizedState,x.componentWillUnmount()}catch(_){re(r,n,_)}}break;case 5:kn(m,m.return);break;case 22:if(m.memoizedState!==null){fu(p);continue}}v!==null?(v.return=m,L=v):fu(p)}f=f.sibling}e:for(f=null,p=e;;){if(p.tag===5){if(f===null){f=p;try{i=p.stateNode,u?(o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=p.stateNode,a=p.memoizedProps.style,s=a!=null&&a.hasOwnProperty("display")?a.display:null,l.style.display=uc("display",s))}catch(_){re(e,e.return,_)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(_){re(e,e.return,_)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===e)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===e)break e;for(;p.sibling===null;){if(p.return===null||p.return===e)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Je(t,e),ut(e),r&4&&uu(e);break;case 21:break;default:Je(t,e),ut(e)}}function ut(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Ff(n)){var r=n;break e}n=n.return}throw Error(M(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(zr(i,""),r.flags&=-33);var o=au(e);qs(e,o,i);break;case 3:case 4:var s=r.stateNode.containerInfo,l=au(e);Ks(e,l,s);break;default:throw Error(M(161))}}catch(a){re(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Lm(e,t,n){L=e,jf(e)}function jf(e,t,n){for(var r=(e.mode&1)!==0;L!==null;){var i=L,o=i.child;if(i.tag===22&&r){var s=i.memoizedState!==null||di;if(!s){var l=i.alternate,a=l!==null&&l.memoizedState!==null||Ce;l=di;var u=Ce;if(di=s,(Ce=a)&&!u)for(L=i;L!==null;)s=L,a=s.child,s.tag===22&&s.memoizedState!==null?hu(i):a!==null?(a.return=s,L=a):hu(i);for(;o!==null;)L=o,jf(o),o=o.sibling;L=i,di=l,Ce=u}cu(e)}else i.subtreeFlags&8772&&o!==null?(o.return=i,L=o):cu(e)}}function cu(e){for(;L!==null;){var t=L;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Ce||Ao(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ce)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:et(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Ya(t,o,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ya(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Dr(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(M(163))}Ce||t.flags&512&&Qs(t)}catch(m){re(t,t.return,m)}}if(t===e){L=null;break}if(n=t.sibling,n!==null){n.return=t.return,L=n;break}L=t.return}}function fu(e){for(;L!==null;){var t=L;if(t===e){L=null;break}var n=t.sibling;if(n!==null){n.return=t.return,L=n;break}L=t.return}}function hu(e){for(;L!==null;){var t=L;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ao(4,t)}catch(a){re(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(a){re(t,i,a)}}var o=t.return;try{Qs(t)}catch(a){re(t,o,a)}break;case 5:var s=t.return;try{Qs(t)}catch(a){re(t,s,a)}}}catch(a){re(t,t.return,a)}if(t===e){L=null;break}var l=t.sibling;if(l!==null){l.return=t.return,L=l;break}L=t.return}}var Nm=Math.ceil,io=Tt.ReactCurrentDispatcher,Hl=Tt.ReactCurrentOwner,Ke=Tt.ReactCurrentBatchConfig,U=0,ve=null,ce=null,ye=0,je=0,zn=Qt(0),de=0,$r=null,dn=0,So=0,Gl=0,Pr=null,Le=null,$l=0,Gn=1/0,yt=null,oo=!1,Zs=null,Vt=null,mi=!1,Ft=null,so=0,Tr=0,Js=null,Bi=-1,Di=0;function Re(){return U&6?ie():Bi!==-1?Bi:Bi=ie()}function Wt(e){return e.mode&1?U&2&&ye!==0?ye&-ye:vm.transition!==null?(Di===0&&(Di=Ac()),Di):(e=H,e!==0||(e=window.event,e=e===void 0?16:Rc(e.type)),e):1}function st(e,t,n,r){if(50<Tr)throw Tr=0,Js=null,Error(M(185));Yr(e,n,r),(!(U&2)||e!==ve)&&(e===ve&&(!(U&2)&&(So|=n),de===4&&Bt(e,ye)),Fe(e,r),n===1&&U===0&&!(t.mode&1)&&(Gn=ie()+500,xo&&Kt()))}function Fe(e,t){var n=e.callbackNode;vd(e,t);var r=Wi(e,e===ve?ye:0);if(r===0)n!==null&&wa(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&wa(n),t===1)e.tag===0?pm(du.bind(null,e)):Yc(du.bind(null,e)),fm(function(){!(U&6)&&Kt()}),n=null;else{switch(Sc(r)){case 1:n=yl;break;case 4:n=_c;break;case 16:n=Vi;break;case 536870912:n=wc;break;default:n=Vi}n=Xf(n,Of.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Of(e,t){if(Bi=-1,Di=0,U&6)throw Error(M(327));var n=e.callbackNode;if(bn()&&e.callbackNode!==n)return null;var r=Wi(e,e===ve?ye:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=lo(e,r);else{t=r;var i=U;U|=2;var o=Vf();(ve!==e||ye!==t)&&(yt=null,Gn=ie()+500,an(e,t));do try{Fm();break}catch(l){Uf(e,l)}while(!0);zl(),io.current=o,U=i,ce!==null?t=0:(ve=null,ye=0,t=de)}if(t!==0){if(t===2&&(i=Ps(e),i!==0&&(r=i,t=el(e,i))),t===1)throw n=$r,an(e,0),Bt(e,r),Fe(e,ie()),n;if(t===6)Bt(e,r);else{if(i=e.current.alternate,!(r&30)&&!Bm(i)&&(t=lo(e,r),t===2&&(o=Ps(e),o!==0&&(r=o,t=el(e,o))),t===1))throw n=$r,an(e,0),Bt(e,r),Fe(e,ie()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(M(345));case 2:rn(e,Le,yt);break;case 3:if(Bt(e,r),(r&130023424)===r&&(t=$l+500-ie(),10<t)){if(Wi(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Re(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Bs(rn.bind(null,e,Le,yt),t);break}rn(e,Le,yt);break;case 4:if(Bt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var s=31-ot(r);o=1<<s,s=t[s],s>i&&(i=s),r&=~o}if(r=i,r=ie()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Nm(r/1960))-r,10<r){e.timeoutHandle=Bs(rn.bind(null,e,Le,yt),r);break}rn(e,Le,yt);break;case 5:rn(e,Le,yt);break;default:throw Error(M(329))}}}return Fe(e,ie()),e.callbackNode===n?Of.bind(null,e):null}function el(e,t){var n=Pr;return e.current.memoizedState.isDehydrated&&(an(e,t).flags|=256),e=lo(e,t),e!==2&&(t=Le,Le=n,t!==null&&tl(t)),e}function tl(e){Le===null?Le=e:Le.push.apply(Le,e)}function Bm(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],o=i.getSnapshot;i=i.value;try{if(!at(o(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Bt(e,t){for(t&=~Gl,t&=~So,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ot(t),r=1<<n;e[n]=-1,t&=~r}}function du(e){if(U&6)throw Error(M(327));bn();var t=Wi(e,0);if(!(t&1))return Fe(e,ie()),null;var n=lo(e,t);if(e.tag!==0&&n===2){var r=Ps(e);r!==0&&(t=r,n=el(e,r))}if(n===1)throw n=$r,an(e,0),Bt(e,t),Fe(e,ie()),n;if(n===6)throw Error(M(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,rn(e,Le,yt),Fe(e,ie()),null}function Xl(e,t){var n=U;U|=1;try{return e(t)}finally{U=n,U===0&&(Gn=ie()+500,xo&&Kt())}}function mn(e){Ft!==null&&Ft.tag===0&&!(U&6)&&bn();var t=U;U|=1;var n=Ke.transition,r=H;try{if(Ke.transition=null,H=1,e)return e()}finally{H=r,Ke.transition=n,U=t,!(U&6)&&Kt()}}function Yl(){je=zn.current,Q(zn)}function an(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,cm(n)),ce!==null)for(n=ce.return;n!==null;){var r=n;switch(Ml(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Yi();break;case 3:Wn(),Q(Be),Q(Ee),Il();break;case 5:Fl(r);break;case 4:Wn();break;case 13:Q(ee);break;case 19:Q(ee);break;case 10:Ll(r.type._context);break;case 22:case 23:Yl()}n=n.return}if(ve=e,ce=e=Ht(e.current,null),ye=je=t,de=0,$r=null,Gl=So=dn=0,Le=Pr=null,sn!==null){for(t=0;t<sn.length;t++)if(n=sn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,o=n.pending;if(o!==null){var s=o.next;o.next=i,r.next=s}n.pending=r}sn=null}return e}function Uf(e,t){do{var n=ce;try{if(zl(),zi.current=ro,no){for(var r=te.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}no=!1}if(hn=0,me=he=te=null,Cr=!1,Wr=0,Hl.current=null,n===null||n.return===null){de=1,$r=t,ce=null;break}e:{var o=e,s=n.return,l=n,a=t;if(t=ye,l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,f=l,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var m=f.alternate;m?(f.updateQueue=m.updateQueue,f.memoizedState=m.memoizedState,f.lanes=m.lanes):(f.updateQueue=null,f.memoizedState=null)}var v=eu(s);if(v!==null){v.flags&=-257,tu(v,s,l,o,t),v.mode&1&&Ja(o,u,t),t=v,a=u;var x=t.updateQueue;if(x===null){var _=new Set;_.add(a),t.updateQueue=_}else x.add(a);break e}else{if(!(t&1)){Ja(o,u,t),Ql();break e}a=Error(M(426))}}else if(q&&l.mode&1){var E=eu(s);if(E!==null){!(E.flags&65536)&&(E.flags|=256),tu(E,s,l,o,t),Rl(Hn(a,l));break e}}o=a=Hn(a,l),de!==4&&(de=2),Pr===null?Pr=[o]:Pr.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var g=Cf(o,a,t);Xa(o,g);break e;case 1:l=a;var h=o.type,y=o.stateNode;if(!(o.flags&128)&&(typeof h.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Vt===null||!Vt.has(y)))){o.flags|=65536,t&=-t,o.lanes|=t;var w=Ef(o,l,t);Xa(o,w);break e}}o=o.return}while(o!==null)}Hf(n)}catch(A){t=A,ce===n&&n!==null&&(ce=n=n.return);continue}break}while(!0)}function Vf(){var e=io.current;return io.current=ro,e===null?ro:e}function Ql(){(de===0||de===3||de===2)&&(de=4),ve===null||!(dn&268435455)&&!(So&268435455)||Bt(ve,ye)}function lo(e,t){var n=U;U|=2;var r=Vf();(ve!==e||ye!==t)&&(yt=null,an(e,t));do try{Dm();break}catch(i){Uf(e,i)}while(!0);if(zl(),U=n,io.current=r,ce!==null)throw Error(M(261));return ve=null,ye=0,de}function Dm(){for(;ce!==null;)Wf(ce)}function Fm(){for(;ce!==null&&!ld();)Wf(ce)}function Wf(e){var t=$f(e.alternate,e,je);e.memoizedProps=e.pendingProps,t===null?Hf(e):ce=t,Hl.current=null}function Hf(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Rm(n,t),n!==null){n.flags&=32767,ce=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{de=6,ce=null;return}}else if(n=Mm(n,t,je),n!==null){ce=n;return}if(t=t.sibling,t!==null){ce=t;return}ce=t=e}while(t!==null);de===0&&(de=5)}function rn(e,t,n){var r=H,i=Ke.transition;try{Ke.transition=null,H=1,Im(e,t,n,r)}finally{Ke.transition=i,H=r}return null}function Im(e,t,n,r){do bn();while(Ft!==null);if(U&6)throw Error(M(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(M(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(gd(e,o),e===ve&&(ce=ve=null,ye=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||mi||(mi=!0,Xf(Vi,function(){return bn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ke.transition,Ke.transition=null;var s=H;H=1;var l=U;U|=4,Hl.current=null,zm(e,n),bf(n,e),rm(Ls),Hi=!!zs,Ls=zs=null,e.current=n,Lm(n),ad(),U=l,H=s,Ke.transition=o}else e.current=n;if(mi&&(mi=!1,Ft=e,so=i),o=e.pendingLanes,o===0&&(Vt=null),fd(n.stateNode),Fe(e,ie()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(oo)throw oo=!1,e=Zs,Zs=null,e;return so&1&&e.tag!==0&&bn(),o=e.pendingLanes,o&1?e===Js?Tr++:(Tr=0,Js=e):Tr=0,Kt(),null}function bn(){if(Ft!==null){var e=Sc(so),t=Ke.transition,n=H;try{if(Ke.transition=null,H=16>e?16:e,Ft===null)var r=!1;else{if(e=Ft,Ft=null,so=0,U&6)throw Error(M(331));var i=U;for(U|=4,L=e.current;L!==null;){var o=L,s=o.child;if(L.flags&16){var l=o.deletions;if(l!==null){for(var a=0;a<l.length;a++){var u=l[a];for(L=u;L!==null;){var f=L;switch(f.tag){case 0:case 11:case 15:Er(8,f,o)}var p=f.child;if(p!==null)p.return=f,L=p;else for(;L!==null;){f=L;var m=f.sibling,v=f.return;if(Df(f),f===u){L=null;break}if(m!==null){m.return=v,L=m;break}L=v}}}var x=o.alternate;if(x!==null){var _=x.child;if(_!==null){x.child=null;do{var E=_.sibling;_.sibling=null,_=E}while(_!==null)}}L=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,L=s;else e:for(;L!==null;){if(o=L,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Er(9,o,o.return)}var g=o.sibling;if(g!==null){g.return=o.return,L=g;break e}L=o.return}}var h=e.current;for(L=h;L!==null;){s=L;var y=s.child;if(s.subtreeFlags&2064&&y!==null)y.return=s,L=y;else e:for(s=h;L!==null;){if(l=L,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Ao(9,l)}}catch(A){re(l,l.return,A)}if(l===s){L=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,L=w;break e}L=l.return}}if(U=i,Kt(),pt&&typeof pt.onPostCommitFiberRoot=="function")try{pt.onPostCommitFiberRoot(mo,e)}catch{}r=!0}return r}finally{H=n,Ke.transition=t}}return!1}function mu(e,t,n){t=Hn(n,t),t=Cf(e,t,1),e=Ut(e,t,1),t=Re(),e!==null&&(Yr(e,1,t),Fe(e,t))}function re(e,t,n){if(e.tag===3)mu(e,e,n);else for(;t!==null;){if(t.tag===3){mu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Vt===null||!Vt.has(r))){e=Hn(n,e),e=Ef(t,e,1),t=Ut(t,e,1),e=Re(),t!==null&&(Yr(t,1,e),Fe(t,e));break}}t=t.return}}function bm(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Re(),e.pingedLanes|=e.suspendedLanes&n,ve===e&&(ye&n)===n&&(de===4||de===3&&(ye&130023424)===ye&&500>ie()-$l?an(e,0):Gl|=n),Fe(e,t)}function Gf(e,t){t===0&&(e.mode&1?(t=ii,ii<<=1,!(ii&130023424)&&(ii=4194304)):t=1);var n=Re();e=Et(e,t),e!==null&&(Yr(e,t,n),Fe(e,n))}function jm(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Gf(e,n)}function Om(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(M(314))}r!==null&&r.delete(t),Gf(e,n)}var $f;$f=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Be.current)Ne=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ne=!1,Tm(e,t,n);Ne=!!(e.flags&131072)}else Ne=!1,q&&t.flags&1048576&&Qc(t,qi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ni(e,t),e=t.pendingProps;var i=On(t,Ee.current);In(t,n),i=jl(null,t,r,e,i,n);var o=Ol();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,De(r)?(o=!0,Qi(t)):o=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Bl(t),i.updater=wo,t.stateNode=i,i._reactInternals=t,Us(t,r,e,n),t=Hs(null,t,r,!0,o,n)):(t.tag=0,q&&o&&Tl(t),Me(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ni(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=Vm(r),e=et(r,e),i){case 0:t=Ws(null,t,r,e,n);break e;case 1:t=iu(null,t,r,e,n);break e;case 11:t=nu(null,t,r,e,n);break e;case 14:t=ru(null,t,r,et(r.type,e),n);break e}throw Error(M(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:et(r,i),Ws(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:et(r,i),iu(e,t,r,i,n);case 3:e:{if(Rf(t),e===null)throw Error(M(387));r=t.pendingProps,o=t.memoizedState,i=o.element,tf(e,t),eo(t,r,null,n);var s=t.memoizedState;if(r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){i=Hn(Error(M(423)),t),t=ou(e,t,r,n,i);break e}else if(r!==i){i=Hn(Error(M(424)),t),t=ou(e,t,r,n,i);break e}else for(Oe=Ot(t.stateNode.containerInfo.firstChild),Ue=t,q=!0,nt=null,n=Jc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Un(),r===i){t=Pt(e,t,n);break e}Me(e,t,r,n)}t=t.child}return t;case 5:return nf(t),e===null&&bs(t),r=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,s=i.children,Ns(r,i)?s=null:o!==null&&Ns(r,o)&&(t.flags|=32),Mf(e,t),Me(e,t,s,n),t.child;case 6:return e===null&&bs(t),null;case 13:return kf(e,t,n);case 4:return Dl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Vn(t,null,r,n):Me(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:et(r,i),nu(e,t,r,i,n);case 7:return Me(e,t,t.pendingProps,n),t.child;case 8:return Me(e,t,t.pendingProps.children,n),t.child;case 12:return Me(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,o=t.memoizedProps,s=i.value,X(Zi,r._currentValue),r._currentValue=s,o!==null)if(at(o.value,s)){if(o.children===i.children&&!Be.current){t=Pt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){s=o.child;for(var a=l.firstContext;a!==null;){if(a.context===r){if(o.tag===1){a=At(-1,n&-n),a.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?a.next=a:(a.next=f.next,f.next=a),u.pending=a}}o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),js(o.return,n,t),l.lanes|=n;break}a=a.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(M(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),js(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}Me(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,In(t,n),i=qe(i),r=r(i),t.flags|=1,Me(e,t,r,n),t.child;case 14:return r=t.type,i=et(r,t.pendingProps),i=et(r.type,i),ru(e,t,r,i,n);case 15:return Pf(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:et(r,i),Ni(e,t),t.tag=1,De(r)?(e=!0,Qi(t)):e=!1,In(t,n),Sf(t,r,i),Us(t,r,i,n),Hs(null,t,r,!0,e,n);case 19:return zf(e,t,n);case 22:return Tf(e,t,n)}throw Error(M(156,t.tag))};function Xf(e,t){return xc(e,t)}function Um(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ye(e,t,n,r){return new Um(e,t,n,r)}function Kl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Vm(e){if(typeof e=="function")return Kl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pl)return 11;if(e===vl)return 14}return 2}function Ht(e,t){var n=e.alternate;return n===null?(n=Ye(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Fi(e,t,n,r,i,o){var s=2;if(r=e,typeof e=="function")Kl(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case wn:return un(n.children,i,o,t);case ml:s=8,i|=8;break;case fs:return e=Ye(12,n,t,i|2),e.elementType=fs,e.lanes=o,e;case hs:return e=Ye(13,n,t,i),e.elementType=hs,e.lanes=o,e;case ds:return e=Ye(19,n,t,i),e.elementType=ds,e.lanes=o,e;case nc:return Co(n,i,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ec:s=10;break e;case tc:s=9;break e;case pl:s=11;break e;case vl:s=14;break e;case kt:s=16,r=null;break e}throw Error(M(130,e==null?e:typeof e,""))}return t=Ye(s,n,t,i),t.elementType=e,t.type=r,t.lanes=o,t}function un(e,t,n,r){return e=Ye(7,e,r,t),e.lanes=n,e}function Co(e,t,n,r){return e=Ye(22,e,r,t),e.elementType=nc,e.lanes=n,e.stateNode={isHidden:!1},e}function ts(e,t,n){return e=Ye(6,e,null,t),e.lanes=n,e}function ns(e,t,n){return t=Ye(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Wm(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fo(0),this.expirationTimes=Fo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fo(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function ql(e,t,n,r,i,o,s,l,a){return e=new Wm(e,t,n,l,a),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Ye(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bl(o),e}function Hm(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:_n,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Yf(e){if(!e)return $t;e=e._reactInternals;e:{if(vn(e)!==e||e.tag!==1)throw Error(M(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(De(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(M(171))}if(e.tag===1){var n=e.type;if(De(n))return Xc(e,n,t)}return t}function Qf(e,t,n,r,i,o,s,l,a){return e=ql(n,r,!0,e,i,o,s,l,a),e.context=Yf(null),n=e.current,r=Re(),i=Wt(n),o=At(r,i),o.callback=t??null,Ut(n,o,i),e.current.lanes=i,Yr(e,i,r),Fe(e,r),e}function Eo(e,t,n,r){var i=t.current,o=Re(),s=Wt(i);return n=Yf(n),t.context===null?t.context=n:t.pendingContext=n,t=At(o,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Ut(i,t,s),e!==null&&(st(e,i,s,o),ki(e,i,s)),s}function ao(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function pu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Zl(e,t){pu(e,t),(e=e.alternate)&&pu(e,t)}function Gm(){return null}var Kf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Jl(e){this._internalRoot=e}Po.prototype.render=Jl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(M(409));Eo(e,t,null,null)};Po.prototype.unmount=Jl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mn(function(){Eo(null,e,null,null)}),t[Ct]=null}};function Po(e){this._internalRoot=e}Po.prototype.unstable_scheduleHydration=function(e){if(e){var t=Pc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Nt.length&&t!==0&&t<Nt[n].priority;n++);Nt.splice(n,0,e),n===0&&Mc(e)}};function ea(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function To(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function vu(){}function $m(e,t,n,r,i){if(i){if(typeof r=="function"){var o=r;r=function(){var u=ao(s);o.call(u)}}var s=Qf(t,r,e,0,null,!1,!1,"",vu);return e._reactRootContainer=s,e[Ct]=s.current,br(e.nodeType===8?e.parentNode:e),mn(),s}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var u=ao(a);l.call(u)}}var a=ql(e,0,!1,null,null,!1,!1,"",vu);return e._reactRootContainer=a,e[Ct]=a.current,br(e.nodeType===8?e.parentNode:e),mn(function(){Eo(t,a,n,r)}),a}function Mo(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o;if(typeof i=="function"){var l=i;i=function(){var a=ao(s);l.call(a)}}Eo(t,s,e,i)}else s=$m(n,t,e,i,r);return ao(s)}Cc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=gr(t.pendingLanes);n!==0&&(xl(t,n|1),Fe(t,ie()),!(U&6)&&(Gn=ie()+500,Kt()))}break;case 13:mn(function(){var r=Et(e,1);if(r!==null){var i=Re();st(r,e,1,i)}}),Zl(e,1)}};_l=function(e){if(e.tag===13){var t=Et(e,134217728);if(t!==null){var n=Re();st(t,e,134217728,n)}Zl(e,134217728)}};Ec=function(e){if(e.tag===13){var t=Wt(e),n=Et(e,t);if(n!==null){var r=Re();st(n,e,t,r)}Zl(e,t)}};Pc=function(){return H};Tc=function(e,t){var n=H;try{return H=e,t()}finally{H=n}};Ss=function(e,t,n){switch(t){case"input":if(vs(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=yo(r);if(!i)throw Error(M(90));ic(r),vs(r,i)}}}break;case"textarea":sc(e,n);break;case"select":t=n.value,t!=null&&Nn(e,!!n.multiple,t,!1)}};dc=Xl;mc=mn;var Xm={usingClientEntryPoint:!1,Events:[Kr,En,yo,fc,hc,Xl]},ar={findFiberByHostInstance:on,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ym={bundleType:ar.bundleType,version:ar.version,rendererPackageName:ar.rendererPackageName,rendererConfig:ar.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Tt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=gc(e),e===null?null:e.stateNode},findFiberByHostInstance:ar.findFiberByHostInstance||Gm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pi.isDisabled&&pi.supportsFiber)try{mo=pi.inject(Ym),pt=pi}catch{}}We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xm;We.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ea(t))throw Error(M(200));return Hm(e,t,null,n)};We.createRoot=function(e,t){if(!ea(e))throw Error(M(299));var n=!1,r="",i=Kf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=ql(e,1,!1,null,null,n,!1,r,i),e[Ct]=t.current,br(e.nodeType===8?e.parentNode:e),new Jl(t)};We.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(M(188)):(e=Object.keys(e).join(","),Error(M(268,e)));return e=gc(t),e=e===null?null:e.stateNode,e};We.flushSync=function(e){return mn(e)};We.hydrate=function(e,t,n){if(!To(t))throw Error(M(200));return Mo(null,e,t,!0,n)};We.hydrateRoot=function(e,t,n){if(!ea(e))throw Error(M(405));var r=n!=null&&n.hydratedSources||null,i=!1,o="",s=Kf;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Qf(t,null,e,1,n??null,i,!1,o,s),e[Ct]=t.current,br(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Po(t)};We.render=function(e,t,n){if(!To(t))throw Error(M(200));return Mo(null,e,t,!1,n)};We.unmountComponentAtNode=function(e){if(!To(e))throw Error(M(40));return e._reactRootContainer?(mn(function(){Mo(null,null,e,!1,function(){e._reactRootContainer=null,e[Ct]=null})}),!0):!1};We.unstable_batchedUpdates=Xl;We.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!To(n))throw Error(M(200));if(e==null||e._reactInternals===void 0)throw Error(M(38));return Mo(e,t,n,!1,r)};We.version="18.3.1-next-f1338f8080-20240426";function qf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qf)}catch(e){console.error(e)}}qf(),Ku.exports=We;var Qm=Ku.exports,gu=Qm;us.createRoot=gu.createRoot,us.hydrateRoot=gu.hydrateRoot;const Km="_arrow_1rhr5_45",qm={arrow:Km},ta=({open:e})=>d.jsx("div",{className:qm.arrow,"data-open":e,children:d.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("g",{clipPath:"url(#clip0_57_2)",children:d.jsx("path",{d:"M18 10L3 18.6603L3 1.33974L18 10Z",fill:"#D9D9D9"})}),d.jsx("defs",{children:d.jsx("clipPath",{id:"clip0_57_2",children:d.jsx("rect",{width:"20",height:"20",fill:"white"})})})]})}),Zm="_block_1l63f_45",Jm="_head_1l63f_58",ep="_head_icon_1l63f_63",tp="_head_text_1l63f_72",np="_content_1l63f_79",ur={block:Zm,head:Jm,head_icon:ep,head_text:tp,content:np},$n=e=>{const[t,n]=Rr.useState(!e.defaultClose),r=C.useCallback(()=>{e.accordion===!0&&n(!t)},[t,e.accordion]),i=e.bg&&typeof e.bg=="string"&&e.bg||void 0;return d.jsxs("div",{className:ur.block,"data-bg":e.bg!==void 0,"data-nomargin":e.noMargin,"data-no_indent":e.noIndent,style:{backgroundColor:i},children:[d.jsxs("div",{className:ur.head,"data-accordion":e.accordion,"data-open":t,children:[e.accordion&&d.jsx("div",{className:ur.head_icon,onClick:r,children:d.jsx(ta,{open:t})}),e.label&&d.jsx("span",{className:ur.head_text,children:e.label})]}),t&&d.jsx("div",{className:ur.content,"data-open":t,"data-no_indent":e.noIndent,children:e.children})]})},rp="_button_fci8n_45",ip={button:rp},Xn=e=>d.jsx("button",{className:ip.button,onClick:t=>{e.onClick&&e.onClick(t),t.preventDefault()},type:e.type||"button",children:e.children}),op=C.createContext(null),rs={didCatch:!1,error:null};class sp extends C.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=rs}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var n,r,i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];(n=(r=this.props).onReset)===null||n===void 0||n.call(r,{args:o,reason:"imperative-api"}),this.setState(rs)}}componentDidCatch(t,n){var r,i;(r=(i=this.props).onError)===null||r===void 0||r.call(i,t,n)}componentDidUpdate(t,n){const{didCatch:r}=this.state,{resetKeys:i}=this.props;if(r&&n.error!==null&&lp(t.resetKeys,i)){var o,s;(o=(s=this.props).onReset)===null||o===void 0||o.call(s,{next:i,prev:t.resetKeys,reason:"keys"}),this.setState(rs)}}render(){const{children:t,fallbackRender:n,FallbackComponent:r,fallback:i}=this.props,{didCatch:o,error:s}=this.state;let l=t;if(o){const a={error:s,resetErrorBoundary:this.resetErrorBoundary};if(typeof n=="function")l=n(a);else if(r)l=C.createElement(r,a);else if(i!==void 0)l=i;else throw s}return C.createElement(op.Provider,{value:{didCatch:o,error:s,resetErrorBoundary:this.resetErrorBoundary}},l)}}function lp(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((n,r)=>!Object.is(n,t[r]))}const is=900,ap=()=>{const[e,t]=C.useState(!1);return C.useEffect(()=>{let n=null;const r=()=>{const i=window.innerWidth;(n===null||(i-is)*(n-is)<=0)&&t(i<=is),n=i};return r(),window.addEventListener("resize",r),()=>{window.removeEventListener("resize",r)}},[]),{isPC:!e,isSP:e}},up="_mouseMenu_11xi2_1",cp="_hide_11xi2_10",fp="_menuItem_11xi2_19",hp="_menuItem_inner_11xi2_23",dp="_menuItem_inner_inner_11xi2_26",cr={mouseMenu:up,hide:cp,menuItem:fp,menuItem_inner:hp,menuItem_inner_inner:dp},Zf=C.createContext(void 0),Jf=C.createContext(null),na=()=>{const e=C.useContext(Jf);if(e===null)throw new Error("useMouseMenu must be used within a MouseMenuProvider");return e},yu=()=>{const{itemList:e,containerRef:t,closeAll:n}=na();return d.jsxs("div",{className:cr.mouseMenu,ref:t,children:[e&&e.length>0&&d.jsx("div",{className:cr.hide,onClick:()=>{n&&n()}}),e&&e.map((r,i)=>{const o=r.pos;return d.jsx(Zf.Provider,{value:r,children:d.jsx("div",{className:cr.menuItem,style:{left:0,top:0,transform:`translate(${o.x}px, ${o.y}px)`},children:d.jsx("div",{className:cr.menuItem_inner,children:d.jsx("div",{className:cr.menuItem_inner_inner,"data-direction":r.direction,children:r.elm})})})},r.id)})]})};let mp=0;const pp=()=>{const e=C.useRef(null),t=C.useRef({x:0,y:0}),n=C.useCallback(u=>{t.current.x=u.clientX,t.current.y=u.clientY},[]);C.useEffect(()=>(window.addEventListener("pointermove",n),()=>{window.removeEventListener("pointermove",n)}),[n]);const[r,i]=C.useState([]),o=C.useRef(r);o.current=r;const s=C.useCallback(u=>{o.current=o.current.filter(f=>f.id!==u),i(o.current)},[]),l=C.useCallback(()=>{i([])},[]),a=C.useCallback(u=>{const f=mp++,p={x:t.current.x,y:t.current.y},m=(p.x<window.innerWidth/2?"right":"left")+"-"+(p.y<window.innerHeight/2?"bottom":"top"),v={id:f,elm:u,pos:p,direction:m,close:()=>s(f)};return i([...o.current,v]),v},[s]);return{itemList:r,pushContent:a,closeAll:l,containerRef:e}},vp="_panel_vqys8_45",gp="_panel_inner_vqys8_51",yp="_content_vqys8_59",os={panel:vp,panel_inner:gp,content:yp},be=e=>d.jsx("div",{className:os.panel,style:{backgroundColor:e.bgColor},children:d.jsx("div",{className:os.panel_inner,children:d.jsx("div",{className:os.content,style:{padding:e.noPadding?"0 0":void 0},children:e.children})})}),xp="_panelContainer_xa08o_45",_p="_header_xa08o_54",wp="_header_item_xa08o_60",Ap="_content_xa08o_75",vi={panelContainer:xp,header:_p,header_item:wp,content:Ap},Rt=e=>{const[t,n]=C.useState(0);let r=e.children||[];return r=Array.isArray(r)?r:[r],d.jsxs("div",{className:vi.panelContainer,children:[d.jsx("div",{className:vi.header,children:r.map((i,o)=>d.jsx("div",{className:vi.header_item,onClick:()=>n(o),"data-active":o==t,children:d.jsx("p",{children:i.props.title})},o))}),d.jsx("div",{className:vi.content,children:r[t]})]})},eh=C.createContext(null),qt=()=>{const e=C.useContext(eh);if(e===null)throw new Error("useEditor must be used within a EditorProvider");return e},ra=(e,t)=>{const[n,r]=C.useState(()=>e?e.serialize():{}),i=t?[...t]:[],o=C.useMemo(()=>i,i);return C.useEffect(()=>{if(e===void 0)return;r(e.serialize());const s=l=>{let a=o.length==0;for(let u=0;u<o.length;u++)if(l.find(f=>f==o[u])){a=!0;break}a&&r(e.serialize())};return e.on("fields/update",s),()=>{e.off("fields/update",s)}},[e,o]),{fields:n}},oe=(e,t)=>{const n=o=>{e==null||e.setField(t,o)},{fields:r}=ra(e,[t]);return[r&&r[t],n]},th=C.createContext(void 0),Sp=e=>(ra(e.target),{target:e.target}),Cp=()=>{const e=C.useContext(th);if(!e)throw new Error("SerializeFieldViewContext is not defined");return e},Ep="_container_1xcsu_45",Pp="_label_1xcsu_55",Tp="_item_1xcsu_62",ss={container:Ep,label:Pp,item:Tp},it=e=>d.jsxs("div",{className:ss.container,"data-vertical":e.vertical,children:[d.jsx("div",{className:ss.label,style:{textAlign:e.labelAlign||"left"},"data-vertical":e.vertical,children:e.title}),d.jsx("div",{className:ss.item,"data-vertical":e.vertical,children:e.children})]}),Mp=()=>d.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("rect",{x:"2",y:"10.8486",width:"2.61726",height:"7.84447",transform:"rotate(-44.9331 2 10.8486)",fill:"#D9D9D9"}),d.jsx("rect",{x:"9.38757",y:"14.5518",width:"2.57272",height:"12.3494",transform:"rotate(-135 9.38757 14.5518)",fill:"#D9D9D9"})]}),Rp="_inputBoolean_1xgaw_45",kp="_input_1xgaw_45",zp="_check_1xgaw_60",ls={inputBoolean:Rp,input:kp,check:zp},nh=({onChange:e,...t})=>d.jsx("div",{className:ls.inputBoolean,onClick:n=>{n.stopPropagation()},children:d.jsxs("label",{children:[d.jsx("input",{className:ls.input,type:"checkbox",checked:t.checked,disabled:t.disabled,readOnly:t.readOnly,onChange:n=>{t.readOnly||e&&e(n.target.checked)}}),d.jsx("div",{className:ls.check,"data-read_only":t.readOnly,children:t.checked&&d.jsx(Mp,{})})]})}),Lp="_input_1rofd_45",xu={input:Lp},ia=e=>{const t=C.useRef(!1),n=C.useRef();n.current=e.onChange;const r=C.useRef();r.current=e.value;const i=C.useCallback(l=>{const a=r.current;if(t.current===!1)return;const u=l.movementX;if(typeof a=="number"){const f=u*.05*(e.step||1);n.current&&n.current(a+f),l.stopPropagation()}l.preventDefault()},[e.step]),o=C.useCallback(l=>{t.current=!0;const a=()=>{t.current=!1,window.removeEventListener("pointerup",a),window.removeEventListener("pointermove",i)};window.addEventListener("pointerup",a),window.addEventListener("pointermove",i)},[i]),s=Number((e.value||0).toFixed(e.precision??3));return d.jsx("div",{className:xu.inputNumber,children:d.jsx("input",{className:xu.input,type:"number",value:s,disabled:e.disabled,readOnly:e.readOnly,"data-lo":e.readOnly,step:e.step||1,min:e.min,max:e.max,onChange:l=>{e.onChange(Number(l.target.value))},onPointerDown:o})})},Np="_inputSelect_d7lo3_45",Bp="_input_d7lo3_45",gi={inputSelect:Np,input:Bp},Dp=({onChange:e,value:t,...n})=>{if(n.readOnly)return d.jsx("div",{className:gi.inputSelect,children:d.jsx("input",{className:gi.input,value:t,readOnly:!0})});let r=n.selectList;return typeof r=="function"&&(r=r()),d.jsx("div",{className:gi.inputSelect,children:d.jsx("select",{className:gi.input,onChange:i=>{e&&e(i.target.value)},value:t,children:r.map((i,o)=>{let s="",l="";return typeof i=="string"?(s=i,l=i):(s=i.label,l=i.value),d.jsx("option",{value:l,children:s},o)})})})},Fp="_input_ndjbn_45",_u={input:Fp},nl=({onChange:e,value:t,...n})=>{const[r,i]=C.useState(t),o=C.useCallback(()=>{e&&e(r)},[r,e]);return C.useEffect(()=>{i(t)},[t]),d.jsx("div",{className:_u.container,children:d.jsx("input",{className:_u.input,type:"text",value:r,placeholder:n.readOnly?"-":"",disabled:n.disabled,readOnly:n.readOnly,"data-lo":n.readOnly,onChange:s=>{i(s.target.value)},onBlur:s=>{o()},onKeyDown:s=>{s.key==="Enter"&&s.currentTarget.blur()}})})},Ip={},bp=["x","y","z","w"],rh=({onChange:e,disabled:t,...n})=>{const r=C.useRef();r.current=n.value;const i=C.useCallback((s,l)=>{if(e&&r.current){const a={};for(let u=0;u<r.current.length;u++)a[u]=r.current[u];a[s]=l,e(a)}},[e]),o=[];for(let s=0;s<n.value.length;s++)o.push(d.jsx(it,{title:bp[s],labelAlign:"right",children:d.jsx(ia,{disabled:t,value:n.value[s],step:n.step,onChange:l=>{i(s,l)}})},s));return d.jsx("div",{className:Ip.vector,children:o.map(s=>s)})},mt=e=>{let t=null;const n=e.onChange,r=e.value,i=e.format,o=s=>{n&&n(s)};if(r==null)return null;if(i&&(i.type=="vector"&&Array.isArray(r)?t=d.jsx(rh,{value:r,onChange:o}):i.type=="select"&&(t=d.jsx(Dp,{value:r,onChange:o,selectList:i.list}))),!t)if(typeof r=="number")t=d.jsx(ia,{...e,value:r,onChange:o});else if(typeof r=="string")t=d.jsx(nl,{...e,value:r,onChange:o});else if(typeof r=="boolean")t=d.jsx(nh,{...e,checked:r,onChange:o});else if(typeof r=="function"){const s=e.label||"Run";t=d.jsx(Xn,{onClick:()=>{r()},children:s})}else t=d.jsx(nl,{...e,value:JSON.stringify(r),onChange:()=>{}});return t},jp="_container_dlq1w_1",Op={container:jp},Up=e=>{const t=[],n=e.value,r=e.format,i=(r==null?void 0:r.type)=="array"?r.labels:void 0;if(n===void 0)return null;for(let o=0;o<n.length;o++){const s=n[o];let l=o.toString();i&&(l+="/ "+i(s,o)),t.push(d.jsx(it,{title:l,children:d.jsx(mt,{...e,value:s,onChange:a=>{const u=n.concat();u[o]=a,e.onChange&&e.onChange(u)}})},o))}return d.jsx("div",{className:Op.container,children:t})},Vp=e=>{const{target:t}=Cp(),n=e.field.value,r=typeof n,i=e.field.opt,o=i==null?void 0:i.format,s=(i==null?void 0:i.label)||e.path.split("/").pop(),l=o&&o.type=="vector";let a=null;if(Array.isArray(n))(o==null?void 0:o.type)=="vector"?a=d.jsx(rh,{value:n,...i,onChange:u=>{t.setField(e.path,u)}}):a=d.jsx(Up,{value:n,...i,onChange:u=>{t.setField(e.path,u)}});else if(a=d.jsx(mt,{value:n,...i,onChange:u=>{t.setField(e.path,u)}}),r==="function")return a;return d.jsx(it,{title:s,vertical:l,children:a})},Wp="_container_3297g_1",Hp="_field_3297g_5",Gp="_block_3297g_9",wu={container:Wp,field:Hp,block:Gp},ih=e=>{const t=[],n=Object.keys(e.fields.childs);for(let r=0;r<n.length;r++){const i=n[r],o=e.fields.childs[i],{opt:s}=o;let l=!1;if(s&&(typeof s.hidden=="function"?l=s.hidden(o.type=="value"?o.value:null):l=s.hidden||!1),l)continue;const a="field"+i,u=(e.basePath?e.basePath+"/":"")+i;let f=null;o.type==="value"?f=d.jsx(Vp,{path:u,field:o},a):f=d.jsx("div",{className:wu.block,children:d.jsx($n,{accordion:!0,label:i,children:d.jsx(ih,{fields:o,basePath:u})},a)},a),f&&t.push(f)}return d.jsx("div",{className:wu.container,children:t})},oh=e=>{const t=Sp(e),n=t.target.serializeToDirectory();return d.jsx(th.Provider,{value:t,children:d.jsx(ih,{fields:n})})};class sh{constructor(t){c(this,"gl");c(this,"extDisJointTimerQuery");this.gl=t,this.gl.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),this.gl.getExtension("EXT_color_buffer_float"),this.gl.getExtension("EXT_color_buffer_half_float"),this.gl.getExtension("OES_texture_float_linear"),this.extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")}}class $p{constructor(t,n){c(this,"gl");c(this,"vao");c(this,"program");c(this,"indexBuffer");c(this,"attributes");c(this,"vertCount");c(this,"indexCount");c(this,"instanceCount");c(this,"attribPointerDiect");c(this,"attribTypeDict");this.gl=t,this.program=n,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([["Float32Array",this.gl.vertexAttribPointer.bind(this.gl)],["Int32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["Int8Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt32Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt16Array",this.gl.vertexAttribIPointer.bind(this.gl)],["UInt8Array",this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([["Float32Array",this.gl.FLOAT],["Int32Array",this.gl.INT],["Int16Array",this.gl.SHORT],["Int8Array",this.gl.BYTE],["UInt32Array",this.gl.UNSIGNED_INT],["UInt16Array",this.gl.UNSIGNED_SHORT],["UInt8Array",this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((t,n)=>{t.instanceDivisor==null&&n!="index"&&(this.vertCount=Math.max(this.vertCount,t.count)),t.instanceDivisor!==void 0&&t.instanceDivisor>0&&(this.instanceCount==0?this.instanceCount=t.count:this.instanceCount=Math.min(this.instanceCount,t.count))})}setAttribute(t,n,r,i){if(n.array===null)return;const o={buffer:n,size:r,count:n.array?n.array.length/r:0,location:void 0,...i};this.attributes.set(t,o),this.gl.bindVertexArray(this.vao),o.location=this.gl.getAttribLocation(this.program,t);const s=this.attribPointerDiect.get(n.array.constructor.name),l=this.attribTypeDict.get(n.array.constructor.name);if(o.location>-1)if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,o.buffer.buffer),o.size==16){for(let a=0;a<4;a++)this.gl.enableVertexAttribArray(o.location+a);for(let a=0;a<4;a++)this.gl.vertexAttribPointer(o.location+a,4,l,!1,64,16*a);if(o.instanceDivisor!==void 0)for(let a=0;a<4;a++)this.gl.vertexAttribDivisor(o.location+a,o.instanceDivisor)}else this.gl.enableVertexAttribArray(o.location),s(o.location,o.size,l,!1,0,0),o.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(o.location,o.instanceDivisor);return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(t){return this.attributes.delete(t),this.calcVertCount(),this}setIndex(t){this.indexBuffer=t,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(t){this.gl.bindVertexArray(this.vao),t&&t(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(t=>{t.buffer.dispose()})}}class lh{constructor(t){c(this,"gl");c(this,"program");c(this,"vao");c(this,"uniforms");this.gl=t,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(t,n,r){if(this.program===null){console.warn("program is null.");return}const i=this.createShader(t,this.gl.VERTEX_SHADER),o=this.createShader(n,this.gl.FRAGMENT_SHADER);if(!(!i||!o))return this.gl.attachShader(this.program,i),this.gl.attachShader(this.program,o),r&&r.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,r.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)||console.error("program link error:",this.gl.getProgramInfoLog(this.program)),this}createShader(t,n){const r=this.gl.createShader(n);if(!r)return null;if(this.gl.shaderSource(r,t),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS))return r}setUniform(t,n,r){const i=this.uniforms.get(t);if(i)if(i.type=n,i.value=r,i.cache){for(let o=0;o<r.length;o++)if(i.cache[o]!==r[o]){i.needsUpdate=!0;break}}else i.needsUpdate=!0;else this.uniforms.set(t,{value:r,type:n,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(t){this.program&&this.uniforms.forEach((n,r)=>{(n.location===null||t)&&(n.location=this.gl.getUniformLocation(this.program,r))})}uploadUniforms(){this.uniforms.forEach(t=>{t.needsUpdate&&t.location!==null&&(/Matrix[2|3|4]fv/.test(t.type)?this.gl["uniform"+t.type](t.location,!1,t.value):/[1|2|3|4][f|i]$/.test(t.type)?this.gl["uniform"+t.type](t.location,...t.value):this.gl["uniform"+t.type](t.location,t.value),t.cache=t.value.concat(),t.needsUpdate=!1)})}getVAO(t="_"){if(!this.program)return null;let n=this.vao.get(t);return n||(n=new $p(this.gl,this.program),this.vao.set(t,n),n)}use(t){this.program&&(this.gl.useProgram(this.program),t&&t(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(t=>{t.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}class Ii{constructor(t){c(this,"gl");c(this,"buffer");c(this,"array");this.gl=t,this.buffer=this.gl.createBuffer(),this.array=null}setData(t,n="vbo",r){const i=n=="vbo"?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(i,this.buffer),this.gl.bufferData(i,t,r||this.gl.STATIC_DRAW),this.gl.bindBuffer(i,null),this.array=t,this}dispose(){this.gl.deleteBuffer(this.buffer)}}class R{constructor(t,n,r,i){c(this,"x");c(this,"y");c(this,"z");c(this,"w");this.x=0,this.y=0,this.z=0,this.w=0,this.set(t,n,r,i)}get isVector(){return!0}set(t,n,r,i){return this.x=t??0,this.y=n??0,this.z=r??0,this.w=i??0,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setFromArray(t){return this.x=t[0]||0,this.y=t[1]||0,this.z=t[2]||0,this.w=t[3]||0,this}add(t){return typeof t=="number"?(this.x+=t,this.y+=t,this.z+=t,this.w+=t):(this.x+=t.x??0,this.y+=t.y??0,this.z+=t.z??0,this.w+=t.w??0),this}sub(t){return typeof t=="number"?(this.x-=t,this.y-=t,this.z-=t):(this.x-=t.x??0,this.y-=t.y??0,this.z-=t.z??0,this.w-=t.w??0),this}multiply(t){return typeof t=="number"?(this.x*=t,this.y*=t,this.z*=t,this.w*=t):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w),this}divide(t){return typeof t=="number"?(this.x/=t,this.y/=t,this.z/=t,this.w/=t):(this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(t){const n=this.x-t.x,r=this.y-t.y,i=this.z-t.z;return Math.sqrt(n*n+r*r+i*i)}normalize(){const t=this.length()||1;return this.x/=t,this.y/=t,this.z/=t,this}cross(t){const n=this.x,r=this.y,i=this.z,o=t.x,s=t.y,l=t.z;return this.x=r*l-i*s,this.y=i*o-n*l,this.z=n*s-r*o,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}applyMatrix3(t){const n=t.elm,r=n[0],i=n[1],o=n[2],s=n[4],l=n[5],a=n[6],u=n[8],f=n[9],p=n[10],m=this.x*r+this.y*s+this.z*u,v=this.x*i+this.y*l+this.z*f,x=this.x*o+this.y*a+this.z*p;return this.x=m,this.y=v,this.z=x,this.w=0,this}applyMatrix4(t){const n=t.elm,r=n[0],i=n[1],o=n[2],s=n[3],l=n[4],a=n[5],u=n[6],f=n[7],p=n[8],m=n[9],v=n[10],x=n[11],_=n[12],E=n[13],g=n[14],h=n[15],y=this.x*r+this.y*l+this.z*p+this.w*_,w=this.x*i+this.y*a+this.z*m+this.w*E,A=this.x*o+this.y*u+this.z*v+this.w*g,P=this.x*s+this.y*f+this.z*x+this.w*h;return this.x=y,this.y=w,this.z=A,this.w=P,this}applyMatrix4AsPosition(t){const n=this.w;return this.w=1,this.applyMatrix4(t),this.w=n,this}applyMatrix4AsDirection(t){const n=this.w;return this.w=0,this.applyMatrix4(t),this.w=n,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(t,n){return this.x=this.x+(t.x-this.x)*n,this.y=this.y+(t.y-this.y)*n,this.z=this.z+(t.z-this.z)*n,this.w=this.w+(t.w-this.w)*n,this}copy(t){return this.x=t.x??0,this.y=t.y??0,this.z=t.z??0,this.w=t.w??0,this}clone(){return new R(this.x,this.y,this.z,this.w)}getElm(t){return t=="vec2"?[this.x,this.y]:t=="vec3"?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}class b{constructor(t){c(this,"unit");c(this,"image");c(this,"size");c(this,"gl");c(this,"glTex");c(this,"textureType");c(this,"_setting");this.gl=t,this.image=null,this.unit=0,this.size=new R,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=t.TEXTURE_2D}get isTexture(){return!0}setting(t){return this._setting={...this._setting,...t},this.attach(this.image),this}attach(t){if(this.image=t,this.gl.bindTexture(this.textureType,this.glTex),this.image){const n=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(n.width,n.height),n instanceof HTMLImageElement||n instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,n):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,n.width,n.height,0,this._setting.format,this._setting.type,n.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}activate(t){return this.gl.activeTexture(this.gl.TEXTURE0+t),this.gl.bindTexture(this.textureType,this.glTex),this.unit=t,this}load(t,n){const r=new Image;return r.onload=()=>{this.attach(r),n&&n()},r.src=t,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}class ${constructor(t,n){c(this,"size");c(this,"gl");c(this,"glFrameBuffer");c(this,"textures");c(this,"depthTexture");c(this,"textureAttachmentList");this.gl=t,this.size=new R(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!n||!n.disableDepthBuffer)&&this.setDepthTexture(new b(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(t){this.depthTexture=t,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(t){return this.textures=t,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((n,r)=>{n.attach({width:this.size.x,height:this.size.y});const i=this.gl.COLOR_ATTACHMENT0+r;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,i,this.gl.TEXTURE_2D,n.getTexture(),0),this.textureAttachmentList.push(i)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(t,n){return typeof t=="number"?(this.size.x=t,n!==void 0&&(this.size.y=n)):this.size.copy(t),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(r=>{r.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}class Xp extends ${constructor(n,r){super(n,r);c(this,"cubeTarget");c(this,"textures");c(this,"currentFace");this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(n){return this.textures=n,this.textureAttachmentList=[],this.textures.forEach(r=>{r.attach({width:this.size.x,height:this.size.y})}),this}face(n){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((r,i)=>{const o=this.gl.COLOR_ATTACHMENT0+i;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,o,this.cubeTarget[n],r.getTexture(),0),this.textureAttachmentList.push(o)}),this.currentFace=this.cubeTarget[n],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}class Yp extends b{constructor(n){super(n);c(this,"cubeTarget");this.textureType=n.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(n){if(this.image=n,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let r=0;r<6;r++){const i=Array.isArray(this.image)?this.image[r]:this.image;this.size.set(i.width,i.height),i instanceof HTMLImageElement||i instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[r],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i):this.gl.texImage2D(this.cubeTarget[r],0,this._setting.internalFormat,i.width,i.height,0,this._setting.format,this._setting.type,i.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}class Qp{constructor(t){c(this,"gl");c(this,"transformFeedback");c(this,"feedbackBuffer");this.gl=t,this.transformFeedback=this.gl.createTransformFeedback(),this.feedbackBuffer=new Map}bind(t){this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,this.transformFeedback),t&&t(),this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK,null)}setBuffer(t,n,r){this.feedbackBuffer.set(t,{buffer:n,varyingIndex:r})}use(t){this.bind(()=>{this.feedbackBuffer.forEach(n=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,n.varyingIndex,n.buffer.buffer)}),t&&t(this),this.feedbackBuffer.forEach(n=>{this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER,n.varyingIndex,null)})})}}class W{constructor(t){c(this,"elm");this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t&&this.set(t)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new W().copy(this)}copy(t){return this.set(t.elm),this}perspective(t,n,r,i){const o=1/Math.tan(t*Math.PI/360),s=i-r;return this.elm=[o/n,0,0,0,0,o,0,0,0,0,-(i+r)/s,-1,0,0,-(i*r*2)/s,0],this}orthographic(t,n,r,i){return this.elm=[2/t,0,0,0,0,2/n,0,0,0,0,-2/(i-r),0,0,0,-(i+r)/(i-r),1],this}lookAt(t,n,r){const i=t.clone().sub(n).normalize(),o=r.clone().cross(i).normalize(),s=i.clone().cross(o).normalize();return this.elm=[o.x,o.y,o.z,0,s.x,s.y,s.z,0,i.x,i.y,i.z,0,t.x,t.y,t.z,1],this}inverse(){const t=this.elm[0],n=this.elm[1],r=this.elm[2],i=this.elm[3],o=this.elm[4],s=this.elm[5],l=this.elm[6],a=this.elm[7],u=this.elm[8],f=this.elm[9],p=this.elm[10],m=this.elm[11],v=this.elm[12],x=this.elm[13],_=this.elm[14],E=this.elm[15],g=t*s-n*o,h=t*l-r*o,y=t*a-i*o,w=n*l-r*s,A=n*a-i*s,P=r*a-i*l,S=u*x-f*v,T=u*_-p*v,B=u*E-m*v,k=f*_-p*x,D=f*E-m*x,se=p*E-m*_,we=g*se-h*D+y*k+w*B-A*T+P*S,Z=1/we;return we==0?this.identity():(this.elm[0]=(s*se-l*D+a*k)*Z,this.elm[1]=(-n*se+r*D-i*k)*Z,this.elm[2]=(x*P-_*A+E*w)*Z,this.elm[3]=(-f*P+p*A-m*w)*Z,this.elm[4]=(-o*se+l*B-a*T)*Z,this.elm[5]=(t*se-r*B+i*T)*Z,this.elm[6]=(-v*P+_*y-E*h)*Z,this.elm[7]=(u*P-p*y+m*h)*Z,this.elm[8]=(o*D-s*B+a*S)*Z,this.elm[9]=(-t*D+n*B-i*S)*Z,this.elm[10]=(v*A-x*y+E*g)*Z,this.elm[11]=(-u*A+f*y-m*g)*Z,this.elm[12]=(-o*k+s*T-l*S)*Z,this.elm[13]=(t*k-n*T+r*S)*Z,this.elm[14]=(-v*w+x*h-_*g)*Z,this.elm[15]=(u*w-f*h+p*g)*Z,this)}transpose(){const t=this.elm[0],n=this.elm[1],r=this.elm[2],i=this.elm[3],o=this.elm[4],s=this.elm[5],l=this.elm[6],a=this.elm[7],u=this.elm[8],f=this.elm[9],p=this.elm[10],m=this.elm[11],v=this.elm[12],x=this.elm[13],_=this.elm[14],E=this.elm[15];return this.elm[0]=t,this.elm[1]=o,this.elm[2]=u,this.elm[3]=v,this.elm[4]=n,this.elm[5]=s,this.elm[6]=f,this.elm[7]=x,this.elm[8]=r,this.elm[9]=l,this.elm[10]=p,this.elm[11]=_,this.elm[12]=i,this.elm[13]=a,this.elm[14]=m,this.elm[15]=E,this}set(t){for(let n=0;n<this.elm.length;n++)this.elm[n]=t[n]??0;return this}setFromTransform(t,n,r){return this.identity(),t&&this.applyPosition(t),n&&this.applyQuaternion(n),r&&this.applyScale(r),this}applyPosition(t){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,t.x,t.y,t.z,1]),this}applyQuaternion(t){const n=t.x,r=t.y,i=t.z,o=t.w,s=n*n,l=r*r,a=i*i,u=o*o,f=n*r,p=n*i,m=n*o,v=r*i,x=r*o,_=i*o;return this.matmul([s-l-a+u,2*(f+_),2*(p-x),0,2*(f-_),-s+l-a+u,2*(v+m),0,2*(p+x),2*(v-m),-s-l+a+u,0,0,0,0,1]),this}applyScale(t){return this.matmul([t.x,0,0,0,0,t.y,0,0,0,0,t.z,0,0,0,0,1]),this}matmul(t){const n=new Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let o=0;for(let s=0;s<4;s++)o+=this.elm[s*4+i]*t[s+r*4];n[i+r*4]=o}this.elm=n}setRotationFromDirection(t,n){n=n||{x:0,y:1,z:0};const r=new R().copy(t).normalize(),i=new R().copy(n).cross(r).normalize();i.length()==0&&(r.x+=.001,i.copy(n).cross(r).normalize());const o=r.clone().cross(i).normalize();return this.set([i.x,i.y,i.z,0,o.x,o.y,o.z,0,r.x,r.y,r.z,0,0,0,0,1]),this}makeRotationAxis(t,n){const r=Math.cos(n),i=Math.sin(n),o=1-r,s=t.x,l=t.y,a=t.z,u=o*s,f=o*l;return this.set([u*s+r,u*l-i*a,u*a+i*l,0,u*l+i*a,f*l+r,f*a-i*s,0,u*a-i*l,f*a+i*s,o*a*a+r,0,0,0,0,1]),this}multiply(t){return this.matmul(t.elm),this}preMultiply(t){const n=this.copyToArray([]);return this.set(t.elm),this.matmul(n),this}decompose(t,n,r){t&&(t.x=this.elm[12],t.y=this.elm[13],t.z=this.elm[14]),n&&n.setFromMatrix(this)}copyToArray(t){t.length=this.elm.length;for(let n=0;n<this.elm.length;n++)t[n]=this.elm[n];return t}}class oa extends R{constructor(n,r,i,o){super(n,r,i,0);c(this,"order");this.order=o||"XYZ"}copy(n){return"order"in n&&(this.order=n.order),super.copy(n)}setFromQuaternion(n){const r=new W().applyQuaternion(n);return this.setFromRotationMatrix(r),this}setFromRotationMatrix(n){const r=n.elm,i=r[0],o=r[4],s=r[8];r[1];const l=r[5],a=r[9];r[2];const u=r[6],f=r[10];return this.order="XYZ",this.y=Math.asin(Math.min(1,Math.max(-1,s))),Math.abs(s)<.9999999?(this.x=Math.atan2(-a,f),this.z=Math.atan2(-o,i)):(this.x=Math.atan2(u,l),this.z=0),this}}class gn{constructor(t,n,r,i){c(this,"x");c(this,"y");c(this,"z");c(this,"w");c(this,"updated",!1);this.x=t||0,this.y=n||0,this.z=r||0,this.w=i||1}set(t,n,r,i){this.x=t??this.x,this.y=n??this.y,this.z=r??this.z,this.w=i??this.w,this.updated=!0}setFromEuler(t,n){const r=n||("order"in t?t.order:"XYZ"),i=Math.sin(t.x/2),o=Math.sin(t.y/2),s=Math.sin(t.z/2),l=Math.cos(t.x/2),a=Math.cos(t.y/2),u=Math.cos(t.z/2);return r=="XYZ"?(this.x=l*o*s+i*a*u,this.y=-i*a*s+l*o*u,this.z=l*a*s+i*o*u,this.w=-i*o*s+l*a*u):r=="XZY"?(this.x=-l*o*s+i*a*u,this.y=l*o*u-i*a*s,this.z=i*o*u+l*a*s,this.w=i*o*s+l*a*u):r=="YZX"?(this.x=i*a*u+l*o*s,this.y=i*a*s+l*o*u,this.z=-i*o*u+l*a*s,this.w=-i*o*s+l*a*u):r=="ZYX"&&(this.x=i*a*u-l*o*s,this.y=i*a*s+l*o*u,this.z=-i*o*u+l*a*s,this.w=i*o*s+l*a*u),this.updated=!0,this}setFromMatrix(t){const n=t.elm,r=n[0]+n[5]+n[10];let i,o,s,l;if(r>0){const u=Math.sqrt(r+1)*2;l=.25*u,i=(n[6]-n[9])/u,o=(n[8]-n[2])/u,s=(n[1]-n[4])/u}else if(n[0]>n[5]&&n[0]>n[10]){const u=Math.sqrt(1+n[0]-n[5]-n[10])*2;l=(n[6]-n[9])/u,i=.25*u,o=(n[1]+n[4])/u,s=(n[2]+n[8])/u}else if(n[5]>n[10]){const u=Math.sqrt(1+n[5]-n[0]-n[10])*2;l=(n[8]-n[2])/u,i=(n[1]+n[4])/u,o=.25*u,s=(n[6]+n[9])/u}else{const u=Math.sqrt(1+n[10]-n[0]-n[5])*2;l=(n[1]-n[4])/u,i=(n[2]+n[8])/u,o=(n[6]+n[9])/u,s=.25*u}const a=Math.sqrt(i*i+o*o+s*s+l*l);return i/=a,o/=a,s/=a,l/=a,this.x=i,this.y=o,this.z=s,this.w=l,this.updated=!0,this}multiply(t){const n=this.w*t.w-this.x*t.x-this.y*t.y-this.z*t.z,r=this.w*t.x+this.x*t.w+this.y*t.z-this.z*t.y,i=this.w*t.y-this.x*t.z+this.y*t.w+this.z*t.x,o=this.w*t.z+this.x*t.y-this.y*t.x+this.z*t.w;return this.set(r,i,o,n),this.updated=!0,this}preMultiply(t){const n=t.clone().multiply(this);this.set(n.x,n.y,n.z,n.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(t){return this.x=t.x??0,this.y=t.y??0,this.z=t.z??0,this.w=t.w??0,this.updated=!0,this}clone(){return new gn(this.x,this.y,this.z,this.w)}}var uo;(e=>{e.gauss=(t,n,r)=>{const i=t-n,o=-(i*i)/(2*r*r);return 1/Math.sqrt(2*Math.PI*r)*Math.exp(o)},e.gaussWeights=t=>{let n=0;const r=[];if(t<=1)return[.5];for(let i=0;i<t;i++){const o=i/(t-1),s=(0,e.gauss)(o,0,1);n+=s*(i>0?2:1),r.push(s)}for(let i=0;i<t;i++)r[i]/=n;return r},e.randomSeed=t=>{t^=t<<13,t^=0,t^=t<<5;let n=123456789^t;t^=t<<13,t^=0,t^=t<<5;let r=362436069^t;t^=t<<13,t^=0,t^=t<<5;let i=521288629^t;t^=t<<13,t^=0,t^=t<<5;let o=88675123^t,s;return()=>(s=n^n<<11,n=r,r=i,i=o,o=(o^o>>>19^(s^s>>>8))>>>0,o/4294967296)},e.randomRange=(t=-1,n=1)=>t+Math.random()*(n-t),e.randomVector=(t=new R(-1,-1,-1,-1),n=new R(1,1,1,1))=>new R((0,e.randomRange)(t.x,n.x),(0,e.randomRange)(t.y,n.y),(0,e.randomRange)(t.z,n.z),(0,e.randomRange)(t.w,n.w)),e.smoothstep=(t,n,r)=>r<=t?0:r>=n?1:(r=(r-t)/(n-t),r*r*(3-2*r))})(uo||(uo={}));class _e{constructor(){c(this,"listeners");this.listeners=[]}on(t,n){this.listeners.push({event:t,cb:n})}once(t,n){this.listeners.push({event:t,cb:n,once:!0})}off(t,n){this.listeners=this.listeners.filter(r=>n==null?r.event!=t:!(r.event==t&&r.cb==n))}emit(t,n){const r=this.listeners.concat();for(let i=0;i<r.length;i++){const o=r[i];o.event==t&&(o.cb.apply(this,n||[]),o.once&&this.off(t,o.cb))}}hasEvent(t){return this.listeners.some(n=>n.event==t)}}var Lt;(e=>{e.NEWTON_ITERATIONS=4,e.NEWTON_MIN_SLOPE=.001,e.SUBDIVISION_PRECISION=1e-7,e.SUBDIVISION_MAX_ITERATIONS=10,e.BEZIER_EASING_CACHE_SIZE=11,e.BEZIER_EASING_SAMPLE_STEP_SIZE=1/e.BEZIER_EASING_CACHE_SIZE;function t(u){return-u.p0+3*u.p1-3*u.p2+u.p3}function n(u){return 3*u.p0-6*u.p1+3*u.p2}function r(u){return-3*u.p0+3*u.p1}function i(u,f){return 3*t(u)*f*f+2*n(u)*f+r(u)}e.calcBezierSlope=i;function o(u,f){return((t(u)*f+n(u))*f+r(u))*f+u.p0}e.calcBezier=o;function s(u,f,p,m){let v=0,x=0;for(let _=0;_<e.SUBDIVISION_MAX_ITERATIONS;_++)x=f+(p-f)/2,v=o(m,x),v>u?p=x:f=x;return x}function l(u,f,p){for(let m=0;m<e.NEWTON_ITERATIONS;m++){const v=i(f,p);if(v==0)return p;const x=o(f,p)-u;p-=x/v}return p}function a(u,f,p){u.p1=Math.max(u.p0,Math.min(u.p3,u.p1)),u.p2=Math.max(u.p0,Math.min(u.p3,u.p2));let m=0;for(let _=1;_<p.length&&(m=_-1,!(f<p[_]));_++);const v=m/(e.BEZIER_EASING_CACHE_SIZE-1),x=i(u,v)/(u.p3-u.p0);return x==0?v:x>.01?l(f,u,v):s(f,v,v+e.BEZIER_EASING_SAMPLE_STEP_SIZE,u)}e.getBezierTfromX=a})(Lt||(Lt={}));var rl;(e=>{function t(h=6){return y=>{const w=Math.exp(-h*(2*y-1)),A=Math.exp(-h);return(1+(1-w)/(1+w)*(1+A)/(1-A))/2}}e.sigmoid=t;function n(h,y,w){const A=Math.max(0,Math.min(1,(w-h)/(y-h)));return A*A*(3-2*A)}e.smoothstep=n;function r(h){return h}e.linear=r;function i(h){return h*h}e.easeInQuad=i;function o(h){return h*(2-h)}e.easeOutQuad=o;function s(h){return h<.5?2*h*h:-1+(4-2*h)*h}e.easeInOutQuad=s;function l(h){return h*h*h}e.easeInCubic=l;function a(h){return--h*h*h+1}e.easeOutCubic=a;function u(h){return h<.5?4*h*h*h:(h-1)*(2*h-2)*(2*h-2)+1}e.easeInOutCubic=u;function f(h){return h*h*h*h}e.easeInQuart=f;function p(h){return 1- --h*h*h*h}e.easeOutQuart=p;function m(h){return h<.5?8*h*h*h*h:1-8*--h*h*h*h}e.easeInOutQuart=m;function v(h){return h*h*h*h*h}e.easeInQuint=v;function x(h){return 1+--h*h*h*h*h}e.easeOutQuint=x;function _(h){return h<.5?16*h*h*h*h*h:1+16*--h*h*h*h*h}e.easeInOutQuint=_;function E(h,y,w,A){const P=new Array(Lt.BEZIER_EASING_CACHE_SIZE);for(let S=0;S<Lt.BEZIER_EASING_CACHE_SIZE;++S)P[S]=Lt.calcBezier({p0:h.x,p1:y.x,p2:w.x,p3:A.x},S/(Lt.BEZIER_EASING_CACHE_SIZE-1));return S=>S<=h.x?h.y:A.x<=S?A.y:Lt.calcBezier({p0:h.y,p1:y.y,p2:w.y,p3:A.y},Lt.getBezierTfromX({p0:h.x,p1:y.x,p2:w.x,p3:A.x},S,P))}e.bezier=E;function g(h,y,w,A){return E({x:0,y:0},{x:h,y},{x:w,y:A},{x:1,y:1})}e.cubicBezier=g})(rl||(rl={}));var Au;(e=>{e.number=(t,n,r)=>t+(n-t)*r,e.vector=(t,n,r)=>t.lerp(n,r)})(Au||(Au={}));class Kp extends _e{constructor(n){super();c(this,"keyframes",[]);c(this,"cache",{frame:NaN,value:NaN});c(this,"frameStart");c(this,"frameEnd");c(this,"frameDuration");this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(n)}set(n){n&&(this.keyframes=[],n.forEach(r=>{this.addKeyFrame(r)}))}addKeyFrame(n){let r=0;for(let i=0;i<this.keyframes.length&&this.keyframes[i].coordinate.x<n.coordinate.x;i++)r++;this.keyframes.splice(r,0,n),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(n){if(n==this.cache.frame)return this.cache.value;let r=null;for(let i=0;i<this.keyframes.length;i++){const o=this.keyframes[i];if(n<o.coordinate.x){const s=this.keyframes[i-1];s?r=s.to(o,n):r=o.coordinate.y;break}}return r===null&&this.keyframes.length>0&&(r=this.keyframes[this.keyframes.length-1].coordinate.y),r!==null?(this.cache={frame:n,value:r},r):0}}class qp extends _e{constructor(n,r,i,o,s){super();c(this,"name");c(this,"curves");c(this,"frameStart");c(this,"frameEnd");c(this,"frameDuration");c(this,"updatedFrame",-1);c(this,"value");this.name=n||"",this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new R,r&&this.setFCurve(r,"x"),i&&this.setFCurve(i,"y"),o&&this.setFCurve(o,"z"),s&&this.setFCurve(s,"w")}setFCurve(n,r){this.curves.set(r,n);let i=1/0,o=-1/0;this.curves.forEach(s=>{s.frameStart<i&&(i=s.frameStart),s.frameEnd>o&&(o=s.frameEnd)}),(i==-1/0||o==1/0)&&(i=0,o=1),this.frameStart=i,this.frameEnd=o,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(n){return this.curves.get(n)||null}setFrame(n){if(n==this.updatedFrame)return this;const r=this.curves.get("x"),i=this.curves.get("y"),o=this.curves.get("z"),s=this.curves.get("w");return r&&(this.value.x=r.getValue(n)),i&&(this.value.y=i.getValue(n)),o&&(this.value.z=o.getValue(n)),s&&(this.value.w=s.getValue(n)),this.updatedFrame=n,this}}class Zp extends _e{constructor(n,r,i,o){super();c(this,"coordinate",{x:0,y:0});c(this,"handleLeft",{x:0,y:0});c(this,"handleRight",{x:0,y:0});c(this,"interpolation","BEZIER");c(this,"easing",null);c(this,"nextFrame",null);this.set(n,r,i,o)}set(n,r,i,o){this.coordinate=n,this.handleLeft=r||n,this.handleRight=i||n,this.interpolation=o||"BEZIER"}getEasing(n,r){return n=="BEZIER"?rl.bezier(this.coordinate,this.handleRight,r.handleLeft,r.coordinate):n=="CONSTANT"?()=>this.coordinate.y:i=>{const o=r.coordinate.y-this.coordinate.y;return i=(i-this.coordinate.x)/(r.coordinate.x-this.coordinate.x),this.coordinate.y+i*o}}to(n,r){return(this.nextFrame==null||this.nextFrame.coordinate.x!=n.coordinate.x||this.nextFrame.coordinate.y!=n.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,n),this.nextFrame=n),this.easing?this.easing(r):0}}let Jp=0;var il;(e=>{function t(){return(Jp++).toString(16)}e.genUUID=t})(il||(il={}));class qn extends _e{constructor(){super();c(this,"uuid");c(this,"initiator");c(this,"fields_");this.uuid=il.genUUID(),this.fields_=new Map,this.initiator="script"}serialize(n){n=n||{mode:"view"};const r={};return this.fields_.forEach((i,o)=>{const s=this.getFieldOpt(o);n.mode=="export"&&s&&s&&s.noExport||(r[o]=i.get(n))}),r}serializeToDirectory(){return(r=>{const i={type:"folder",childs:{},opt:{}},o=Object.keys(r);for(let s=0;s<o.length;s++){const l=o[s],a=this.getFieldOpt(l);if(!l)continue;let u=i;const f=l.split("/");for(let p=0;p<f.length;p++){const m=f[p];m&&u.type!="value"&&(u.childs[m]||(p==f.length-1?u.childs[m]={type:"value",value:null,opt:a}:u.childs[m]={type:"folder",childs:{},opt:a}),u=u.childs[m])}u.type=="value"&&(u.value=r[l])}return i})(this.serialize())}deserialize(n){const r=Object.keys(n);for(let i=0;i<r.length;i++){const o=r[i],s=this.fields_.get(o);s&&s.set(n[o])}}exportEditor(){this.serialize({mode:"export"})}field(n,r,i,o){const s=typeof i=="function"?i:void 0,l=typeof i=="object"&&i||o||{};s||(l.readOnly=!0,l.noExport=!0);const a=n.startsWith("/")?n.slice(1):n;this.fields_.set(a,{get:r,set:u=>{s&&s(u),this.noticeField(n)},opt:l})}fieldDir(n,r){const i=n;return this.field(i+"/",()=>null,void 0,{...r,isFolder:!0}),{dir:o=>this.fieldDir(`${i}/${o}`),field:(o,s,l,a)=>{this.field(`${i}/${o}`,s,l,a)}}}setField(n,r){this.deserialize({[n]:r})}getField(n,r){const i=this.fields_.get(n);if(i)return r=r||{mode:"view"},i.get(r)}getFieldOpt(n){const r=this.fields_.get(n);if(r)return r.opt}noticeField(n){this.emit("fields/update/"+n),this.emit("fields/update",[[n]])}}class Pe extends qn{constructor(n){super();c(this,"disableEdit");c(this,"order");c(this,"_entity");c(this,"_enabled");c(this,"_tag");c(this,"_disposed");this.disableEdit=!1,this._entity=n.entity,this._enabled=!0,this._disposed=!1,this._tag="",this.order=0,this.field("enabled",()=>this.enabled,r=>this.enabled=r,{hidden:!0,noExport:!0}),this.field("tag",()=>this.tag,r=>this._tag=r,{readOnly:!0,noExport:!0,hidden:r=>r==""})}get tag(){return this._tag}get entity(){return this._entity}set enabled(n){this._enabled=n}get enabled(){return this._enabled}update(n){this.enabled&&this.updateImpl(n)}updateImpl(n){}postUpdate(n){this.enabled&&this.postUpdateImpl(n)}postUpdateImpl(n){}beforeRender(n){this.enabled&&this.beforeRenderImpl(n)}beforeRenderImpl(n){}afterRender(n){this.enabled&&this.afterRenderImpl(n)}afterRenderImpl(n){}dispose(){this._disposed=!0,this.emit("dispose")}}class yn extends qn{constructor(){super();c(this,"vertCount");c(this,"attributes");c(this,"vaoCache");this.vertCount=0,this.attributes=new Map,this.vaoCache=new Map}setAttribute(n,r,i,o){const s=this.attributes.get(n);return s&&s.buffer&&s.buffer.dispose(),this.attributes.set(n,{array:r,size:i,opt:o}),this.updateVertCount(),this}getAttribute(n){return this.attributes.get(n)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((n,r)=>{r=="index"||n.opt&&n.opt.instanceDivisor||(this.vertCount=Math.min(n.array.length/n.size,this.vertCount))})}createBuffers(n){this.attributes.forEach((r,i)=>{r.buffer||(r.buffer=new Ii(n).setData(r.array,i=="index"?"ibo":"vbo",r.opt&&r.opt.usage))})}requestUpdate(){this.vaoCache.clear()}dispose(){super.dispose(),this.attributes.forEach(n=>{var r;(r=n.buffer)==null||r.dispose()})}}const e0=`#include <common>\r
#include <packing>\r
#include <frag_h>\r
\r
void main( void ) {\r
\r
	#include <frag_in>\r
	#include <frag_out>\r
\r
}`,t0=`#include <common>\r
#include <vert_h>\r
\r
void main( void ) {\r
\r
	#include <vert_in>\r
	#include <vert_out>\r
	\r
}`;class Xt extends qn{constructor(n){super();c(this,"name");c(this,"vert");c(this,"frag");c(this,"defines");c(this,"uniforms");c(this,"useLight");c(this,"depthTest");c(this,"depthWrite");c(this,"cullFace");c(this,"drawType");c(this,"blending");c(this,"visibilityFlag");c(this,"programCache");n=n||{},this.name=n.name||"",this.visibilityFlag={},this.setVisibility(n.phase||["shadowMap","deferred"]),this.useLight=!0,this.depthTest=!0,this.cullFace=!1,this.depthWrite=n.depthTest!==void 0?n.depthTest:!0,this.drawType=n.drawType||"TRIANGLES",this.blending=n.blending||"NORMAL",this.vert=n.vert||t0,this.frag=n.frag||e0,this.defines=n.defines||{},this.uniforms=n.uniforms||{},this.programCache={}}setVisibility(n){this.visibilityFlag={shadowMap:n.indexOf("shadowMap")>-1,deferred:n.indexOf("deferred")>-1,forward:n.indexOf("forward")>-1,ui:n.indexOf("ui")>-1,envMap:n.indexOf("envMap")>-1,postprocess:n.indexOf("postprocess")>-1}}requestUpdate(){this.programCache={}}}const n0=new yn,r0=new Xt;class Ge extends Pe{constructor(n){super(n);c(this,"geometry");c(this,"material");const r=n.args||{};this.geometry=r.geometry||n0,this.material=r.material||r0,this.field("material",()=>this.material.name)}}class lt extends qn{constructor(n){super();c(this,"name");c(this,"position");c(this,"euler");c(this,"quaternion");c(this,"scale");c(this,"matrix");c(this,"matrixWorld");c(this,"matrixWorldPrev");c(this,"autoMatrixUpdate");c(this,"parent");c(this,"children");c(this,"components");c(this,"componentsSorted");c(this,"visible");c(this,"userData");this.name=n&&n.name||"",this.position=new R(0,0,0,1),this.euler=new oa,this.quaternion=new gn(0,0,0,1),this.scale=new R(1,1,1),this.matrix=new W,this.matrixWorld=new W,this.matrixWorldPrev=new W,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.field("name",()=>this.name,r=>this.name=r),this.field("position",()=>this.position.getElm("vec3"),r=>this.position.setFromArray(r),{format:{type:"vector"}}),this.field("euler",()=>this.euler.getElm("vec3"),r=>this.euler.setFromArray(r),{format:{type:"vector"}}),this.field("scale",()=>this.scale.getElm("vec3"),r=>this.scale.setFromArray(r),{format:{type:"vector"}}),this.field("children",()=>this.children.map(r=>r.uuid),{hidden:!0}),this.field("components",()=>{const r=[];return this.components.forEach(i=>r.push(i.uuid)),r},{hidden:!0})}update(n){const r={...n};r.matrix=this.matrixWorld,this.updateImpl(n);for(let i=0;i<this.componentsSorted.length;i++)this.componentsSorted[i].update(r);this.autoMatrixUpdate&&this.updateMatrix();for(let i=0;i<this.children.length;i++)this.children[i].update(r)}updateImpl(n){}onBeforeRender(n){for(let r=0;r<this.componentsSorted.length;r++)this.componentsSorted[r].beforeRender(n);for(let r=0;r<this.children.length;r++)this.children[r].onBeforeRender(n)}onAfterRender(n){this.matrixWorldPrev.copy(this.matrixWorld);for(let r=0;r<this.componentsSorted.length;r++)this.componentsSorted[r].afterRender(n);for(let r=0;r<this.children.length;r++)this.children[r].onAfterRender(n)}add(n){n.parent&&n.parent.remove(n),n.parent=this,this.children.push(n),this.noticeField("children")}remove(n){this.children=this.children.filter(r=>r.uuid!=n.uuid),this.noticeField("children")}updateMatrix(n){this.parent&&n&&this.parent.updateMatrix(!0);const r=this.parent?this.parent.matrixWorld:new W;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(r)}decomposeMatrix(n){n.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(n){this.decomposeMatrix(this.matrix.clone().multiply(n))}lookAt(n){this.updateMatrix();const r=new W,i=new R;this.matrixWorld.decompose(i);const o=this.position.clone().add(n.clone().sub(i));r.lookAt(this.position,o,new R(0,1,0)),this.decomposeMatrix(r)}addComponent(n,...r){this.removeComponent(n);const[i]=r,o=new n({entity:this,args:i||{}});return this.components.set(n,o),this.componentsSorted.push(o),this.componentsSorted.sort((s,l)=>s.order-l.order),this.noticeField("components"),o}removeComponent(n){const r=this.components.get(n);r&&r.dispose(),this.components.delete(n),this.componentsSorted=this.componentsSorted.filter(i=>i!==r),this.noticeField("components")}removeComponentByUUID(n){for(const r of this.components){const i=r[0],o=r[1];if(o.uuid===n)return o.dispose(),this.components.delete(i),this.noticeField("components"),o}}getComponent(n){return this.components.get(n)}getComponentByUUID(n){for(const r of this.components.values())if(r.uuid===n)return r;return null}getComponentByTag(n){for(const r of this.components.values())if(r.tag===n)return r;return null}getComponentsByTag(n){const r=[];return this.components.forEach(i=>{i.tag==n&&r.push(i)}),r}findEntityByName(n){if(this.name==n)return this;for(let r=0;r<this.children.length;r++){const o=this.children[r].findEntityByName(n);if(o)return o}}findEntityByUUID(n){if(this.uuid==n)return this;for(let r=0;r<this.children.length;r++){const o=this.children[r].findEntityByUUID(n);if(o)return o}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(n){let r="/"+this.name;return n&&n.uuid==this.uuid||this.parent&&(r=this.parent.getScenePath(n)+r),r}noticeEventChilds(n,r){this.emit(n,r);for(let i=0;i<this.children.length;i++)this.children[i].noticeEventChilds(n,r)}noticeEventParent(n,r){this.emit(n,r),this.parent&&this.parent.noticeEventParent(n,r)}traverse(n){n(this),this.children.forEach(r=>r.traverse(n))}isVisibleTraverse(){return this.visible?this.parent?this.parent.isVisibleTraverse():!0:!1}dispose(){this.emit("dispose"),this.parent&&this.parent.remove(this),this.components.forEach(n=>{n.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(n=>{n.disposeRecursive()}),this.children=[]}}const i0=`#include <common>\r
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
} `,o0=`#include <common>\r
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
}`,yi=12,xi=8,s0=e=>{switch(e){case"VEC2":return 2;case"VEC3":return 3;case"VEC4":return 4;case"SCALAR":return 1;default:return 1}},l0=e=>{switch(e){case"TEXCOORD_0":return"uv";default:return e.toLowerCase()}};class a0 extends _e{constructor(n){super();c(this,"gl");this.gl=n}async load(n){const i=await(await fetch(n)).arrayBuffer(),o=new TextDecoder,s=o.decode(new Uint8Array(i,0,4)),l=new Map;let a=null;if(s=="glTF"){const A=new DataView(i),P=yi,S={length:A.getUint32(P,!0),type:A.getUint32(P+4,!0)};if(S.type==1313821514){const T=yi+xi;a=JSON.parse(o.decode(new Uint8Array(i,T,S.length)))}if(i.byteLength>xi+S.length+yi){const T=yi+xi+S.length,B={length:A.getUint32(T,!0),type:A.getUint32(T+4,!0)};if(B.type==5130562){const k=T+xi,D=i.slice(k,k+B.length);l.set(0,D)}}}else a=JSON.parse(o.decode(new Uint8Array(i)));if(!a)throw new Error("");const u=a,f=A=>{const P=l.get(A.buffer);return P?P.slice(A.byteOffset,A.byteOffset+A.byteLength):null},p=new Map;a.accessors&&a.accessors.forEach((A,P)=>{const{type:S}=A;if(!u.bufferViews)return;const T=u.bufferViews[A.bufferView],B=f(T);B&&p.set(P,{type:S,buffer:B})});const m=new Map,v=(u.images||[]).map((A,P)=>new Promise(S=>{if(A.bufferView!==void 0){if(!u.bufferViews)return;const T=u.bufferViews[A.bufferView],B=f(T);if(B){const k=new Blob([new Uint8Array(B)],{type:A.mimeType}),D=new Image;D.onload=()=>{S(A)},D.src=URL.createObjectURL(k),m.set(P,D)}}}));await Promise.all(v);const x=new Map,_=A=>{if(!u.textures)return null;const P=u.textures[A];if(P){const S=new b(this.gl),T=m.get(P.source);if(T)return S.attach(T),S}return null};u.materials&&u.materials.forEach((A,P)=>{const S=new Xt({frag:i0,vert:o0});if(A.normalTexture){const T=_(A.normalTexture.index);T&&(S.uniforms.uNormalMap={value:T,type:"1i"},S.defines.USE_NORMAL_MAP="")}if(A.pbrMetallicRoughness){const T=A.pbrMetallicRoughness;if(T.baseColorFactor&&(S.uniforms.uBaseColor={value:T.baseColorFactor,type:"4fv"},S.defines.USE_COLOR=""),T.baseColorTexture){const B=_(T.baseColorTexture.index);B&&(S.uniforms.uBaseColorMap={value:B,type:"1i"},S.defines.USE_COLOR_MAP="")}if(T.roughnessFactor!==void 0&&(S.uniforms.uRoughness={value:T.roughnessFactor,type:"1f"},S.defines.USE_ROUGHNESS=""),T.metallicFactor!==void 0&&(S.uniforms.uMetalness={value:T.metallicFactor,type:"1f"},S.defines.USE_METALNESS=""),T.metallicRoughnessTexture){const B=_(T.metallicRoughnessTexture.index);B&&(S.uniforms.uMRMap={value:B,type:"1i"},S.defines.USE_MR_MAP="")}}if(A.emissiveFactor&&(S.uniforms.uEmission={value:A.emissiveFactor,type:"3fv"},S.defines.USE_EMISSION=""),A.emissiveTexture){const T=_(A.emissiveTexture.index);T&&(S.uniforms.uEmissionMap={value:T,type:"1i"},S.defines.USE_EMISSION_MAP="")}A.extensions&&A.extensions.KHR_materials_emissive_strength&&(S.uniforms.uEmissionStrength={value:A.extensions.KHR_materials_emissive_strength.emissiveStrength,type:"1fv"},S.defines.USE_EMISSION_STRENGTH=""),x.set(P,S)});const E=new Map;u.meshes&&u.meshes.forEach((A,P)=>{const{primitives:S}=A;E.set(P,S.map(T=>{const B=new yn;if(Object.keys(T.attributes).forEach(D=>{const se=T.attributes[D],we=p.get(se);we&&B.setAttribute(l0(D),new Float32Array(we.buffer),s0(we.type))}),T.indices!==void 0){const D=p.get(T.indices);D&&B.setAttribute("index",new Uint16Array(D.buffer),1)}let k=null;if(T.material!==void 0){const D=x.get(T.material);D&&(k=D)}return k||(k=new Xt),B.attributes.has("tangent")&&(k.defines.USE_TANGENT=""),{geometry:B,material:k}}))});const g=new Map,h=(A,P)=>{const S=new lt;P.translation&&S.position.set(P.translation[0],P.translation[1],P.translation[2]),P.rotation&&S.quaternion.set(P.rotation[0],P.rotation[1],P.rotation[2],P.rotation[3]),P.scale&&S.scale.set(P.scale[0],P.scale[1],P.scale[2]);const T=E.get(P.mesh);if(S.name=P.name,T)if(T.length==1){const B=T[0],k=S.addComponent(Ge);k.geometry=B.geometry,k.material=B.material}else T.forEach((B,k)=>{const D=new lt;D.name=P.name+"_"+k;const se=D.addComponent(Ge);se.geometry=B.geometry,se.material=B.material,S.add(D)});return P.children&&P.children.forEach(B=>{const k=g.get(B);k?S.add(k):u.nodes&&S.add(h(B,u.nodes[B]))}),g.set(A,S),S};u.nodes&&u.nodes.forEach((A,P)=>{h(P,A)});const y=new lt,w=u.scenes&&u.scenes[0];return w&&w.nodes&&w.nodes.forEach(A=>{const P=g.get(A);P&&y.add(P)}),{scene:y}}}class u0 extends _e{constructor(n,r){super();c(this,"gl");c(this,"connection");c(this,"frame");c(this,"nodes");c(this,"curveGroups");c(this,"root");c(this,"gltf");c(this,"currentScene");this.gl=n,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},r&&this.connect(r)}connect(n,r){}disconnect(){}binaryStringToArrayBuffer(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++){const o=n.charCodeAt(i);r[i]=o}return r.buffer}async loadScene(n,r){this.currentScene=n,r&&await new a0(this.gl).load(r).then(l=>{this.gltf=l,this.emit("gltfLoaded",[l])}),await new Promise(s=>{setTimeout(()=>{s(null)},100)}),this.frame.start=n.frame.start,this.frame.end=n.frame.end,this.frame.fps=n.frame.fps,this.curveGroups=[],this.nodes=[];const i=Object.keys(n.animations);for(let s=0;s<i.length;s++){const l=i[s],a=new qp(l);n.animations[s].forEach(u=>{const f=new Kp;f.set(u.k.map(p=>{const m={B:"BEZIER",C:"CONSTANT",L:"LINEAR"}[p[0]],v=p[1];return new Zp({x:v[0],y:v[1]},v[2]!==void 0&&{x:v[2],y:v[3]}||void 0,v[4]!==void 0&&{x:v[4],y:v[5]}||void 0,m)})),a.setFCurve(f,u.axis)}),this.curveGroups.push(a)}this.nodes=[];const o=s=>{const l={name:"",uniforms:{}};s.material&&(l.name=s.material.name||"",l.uniforms=s.material.uniforms||{});const a={name:s.name,class:s.class,parent:s.parent,children:[],animations:s.animation||{},position:s.position||[0,0,0],rotation:s.rotation||[0,0,0],scale:s.scale||[1,1,1],material:l,type:s.type,visible:s.visible},u=s.param;return u&&"position"in u?a.param={position:new Float32Array(this.binaryStringToArrayBuffer(atob(u.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(u.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(u.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(u.index)))}:a.param=u,s.children&&s.children.forEach(f=>{a.children.push(o(f))}),this.nodes.push(a),a};this.root=o(n.root),this.emit("sync/scene",[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(n){this.frame=n,this.emit("sync/timeline",[this.frame])}onOpen(n){}onMessage(n){}onClose(n){this.disconnect()}getCurveGroup(n){return this.curveGroups[n]}setFrame(n){this.onSyncTimeline({...this.frame,playing:!0,current:n})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(n=>{this.on("gltfLoaded",r=>{n(r)})})}dispose(){this.disconnect()}}class c0 extends yn{constructor(t){super();const n=[],r=[],i=[],o=[],s=[],{width:l,height:a,depth:u,segmentsWidth:f,segmentsHeight:p,segmentsDepth:m}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...t},v=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:l,h:a,d:u,segW:f,segH:p},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:l,h:a,d:u,segW:f,segH:p},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:u,h:a,d:l,segW:m,segH:p},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:u,h:a,d:l,segW:m,segH:p},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:l,h:u,d:a,segW:f,segH:m},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:l,h:u,d:a,segW:f,segH:m}];let x=0;for(const _ of v){const E=_.normal,g=_.dir,h=_.up,y=_.segW,w=_.segH,A=_.w/2,P=_.h/2,S=_.d/2,T=_.w/y,B=_.h/w;for(let k=0;k<=w;k++)for(let D=0;D<=y;D++){const se=-A+D*T,we=-P+k*B,Z=-S,Ro=D/y,Jn=k/w,er=se*-g[0]+we*h[0]+Z*-E[0],z=se*-g[1]+we*h[1]+Z*-E[1],F=se*-g[2]+we*h[2]+Z*-E[2];if(n.push(er,z,F),r.push(...E),i.push(Ro,Jn),s.push(k/w*h[1]+Math.max(0,h[2])),k<w&&D<y){const I=x+k*(y+1)+D,K=x+(k+1)*(y+1)+D,le=x+(k+1)*(y+1)+(D+1),Zt=x+k*(y+1)+(D+1);o.push(I,K,Zt),o.push(K,le,Zt)}}x+=(y+1)*(w+1)}this.setAttribute("position",new Float32Array(n),3),this.setAttribute("normal",new Float32Array(r),3),this.setAttribute("uv",new Float32Array(i),2),this.setAttribute("posY",new Float32Array(s),1),this.setAttribute("index",new Uint16Array(o),1)}}class f0 extends yn{constructor(t){super();const n=[],r=[],i=[],o=[],{height:s,radiusTop:l,radiusBottom:a,radSegments:u,heightSegments:f,caps:p}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...t};for(let m=0;m<=f+2;m++)for(let v=0;v<=u;v++){const x=Math.PI*2/u*v;if(m<=f){const _=1-m/f,E=(1-_)*l+_*a,g=Math.cos(x)*E,h=-(s/2)+s/f*m,y=Math.sin(x)*E;n.push(g,h,y),i.push(v/u,m/f);const w=new R(Math.cos(x),0,Math.sin(x)).normalize();if(r.push(w.x,w.y,w.z),m<f){const A=u+1;o.push(m*A+v,(m+1)*A+(v+1)%A,m*A+(v+1)%A,m*A+v,(m+1)*A+v,(m+1)*A+(v+1)%A)}}else{if(!p)continue;const _=m-f-1,E=_?l:a,g=Math.cos(x)*E,h=-(s/2)+s*_,y=Math.sin(x)*E;n.push(g,h,y),i.push((g+E)*.5/E,(y+E)*.5/E),r.push(0,-1+_*2,0);const w=(u+1)*(f+(_+1));v<=u-2&&(_==0?o.push(w,w+v,w+v+1):o.push(w,w+v+1,w+v))}}this.setAttribute("position",new Float32Array(n),3),this.setAttribute("normal",new Float32Array(r),3),this.setAttribute("uv",new Float32Array(i),2),this.setAttribute("index",new Uint16Array(o),1)}}class ah extends yn{constructor(t){super();const{width:n,height:r,widthSegments:i,heightSegments:o,floor:s}={width:1,height:1,widthSegments:1,heightSegments:1,...t},l=n/2,a=r/2,u=[],f=[],p=[],m=[];for(let v=0;v<=o;v++)for(let x=0;x<=i;x++){const _=x/i,E=v/o;if(s?(u.push(-l+n*_,0,a-r*E),f.push(0,1,0)):(u.push(-l+n*_,-a+r*E,0),f.push(0,0,1)),p.push(_,E),v>0&&x>0){const g=i+1,h=g*v+x,y=g*(v-1)+x-1;m.push(h,g*v+x-1,y,h,y,g*(v-1)+x)}}this.setAttribute("position",new Float32Array(u),3),this.setAttribute("normal",new Float32Array(f),3),this.setAttribute("uv",new Float32Array(p),2),this.setAttribute("index",new Uint16Array(m),1)}}class uh extends yn{constructor(t){super();const n=[],r=[],i=[],o=[],{radius:s,widthSegments:l,heightSegments:a}={radius:.5,widthSegments:8,heightSegments:8,...t};for(let u=0;u<=a;u++){const f=u/a*Math.PI;for(let p=0;p<=l;p++){const m=p/l*Math.PI*2,v=Math.sin(f)*s,x=Math.cos(m)*v,_=-Math.cos(f)*s,E=-Math.sin(m)*v;n.push(x,_,E),i.push(p/l,u/a);const g=new R(x,_,E).normalize();if(r.push(g.x,g.y,g.z),p<l&&u<a){const h=l+1;o.push(u*h+p,u*h+(p+1)%h,(u+1)*h+(p+1)%h,u*h+p,(u+1)*h+(p+1)%h,(u+1)*h+p)}}}for(let u=0;u<o.length;u++)o[u]=Math.min(n.length/3-1,o[u]);this.setAttribute("position",new Float32Array(n),3),this.setAttribute("normal",new Float32Array(r),3),this.setAttribute("uv",new Float32Array(i),2),this.setAttribute("index",new Uint16Array(o),1)}}class sa extends Pe{constructor(n){super(n);c(this,"cameraType");c(this,"fov");c(this,"aspect");c(this,"near");c(this,"far");c(this,"orthWidth");c(this,"orthHeight");c(this,"projectionMatrix");c(this,"viewMatrix");c(this,"projectionMatrixPrev");c(this,"viewMatrixPrev");c(this,"needsUpdateProjectionMatrix");c(this,"displayOut");c(this,"viewPort");this.cameraType="perspective",this.viewMatrix=new W,this.projectionMatrix=new W,this.viewMatrixPrev=new W,this.projectionMatrixPrev=new W,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this._tag="camera"}updateProjectionMatrix(){this.cameraType=="perspective"?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}beforeRenderImpl(n){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix()}afterRenderImpl(n){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}class h0 extends sa{constructor(n){super(n);c(this,"renderTarget");c(this,"viewMatrixOffset");this.renderTarget=null,this.viewMatrixOffset=new gn().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100}beforeRenderImpl(n){super.beforeRenderImpl(n),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}class Ln extends h0{constructor(n){super(n);c(this,"lightType");c(this,"color");c(this,"intensity");c(this,"castShadow");c(this,"shadowMapSize");c(this,"angle");c(this,"blend");c(this,"distance");c(this,"decay");this.lightType="spot",this.cameraType="perspective",this.color=new R(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new R(1024,1024),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field("intensity",()=>this.intensity,r=>this.intensity=r,{noExport:!0}),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}setShadowMap(n){this.renderTarget=n,this.renderTarget.setSize(this.shadowMapSize)}setShadowMapSize(n){this.shadowMapSize.copy(n),this.renderTarget&&this.renderTarget.setSize(this.shadowMapSize)}lookAt(n){this.entity.lookAt(n),this.entity.quaternion.multiply(new gn().setFromEuler(new oa(Math.PI/2)))}}class co extends Pe{constructor(n){super(n);c(this,"node");c(this,"rotationOffsetX");c(this,"animations");c(this,"uniforms");c(this,"uniformCurves");c(this,"transformAutoUpdate");c(this,"_blidge");c(this,"_cameraComponent");c(this,"_lightComponent");this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=n.args.blidge,this.node=n.args.node,this.node.type=="camera"&&(this.rotationOffsetX=-Math.PI/2);const r=Object.keys(this.node.animations);for(let s=0;s<r.length;s++){const l=r[s];this.animations.set(l,this._blidge.getCurveGroup(this.node.animations[l]))}const i=Object.keys(this.node.material.uniforms);for(let s=0;s<i.length;s++){const l=i[s],a=this.node.material.uniforms[l],u=this._blidge.curveGroups[a];u&&(this.uniformCurves.set(l,u),this.uniforms[l]={type:"4fv",value:u.value})}const o=this.entity;if(o.name=this.node.name,o.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),o.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},"YZX"),o.quaternion.updated=!1,o.euler.setFromQuaternion(o.quaternion),o.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type=="cube"){const s=o.addComponent(Ge),l=this.node.param;s.geometry=new c0({width:l.x,height:l.y,depth:l.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type=="sphere"){const s=o.addComponent(Ge),l=this.node.param;s.geometry=new uh({radius:l.r,widthSegments:32,heightSegments:16})}else if(this.node.type=="cylinder"){const s=o.addComponent(Ge);s.geometry=new f0}else if(this.node.type=="plane"){const s=o.addComponent(Ge),l=this.node.param;s.geometry=new ah({width:l.x,height:l.y})}else if(this.node.type=="mesh"){const s=o.addComponent(Ge),l=this.node.param,a=new yn;a.setAttribute("position",l.position,3),a.setAttribute("uv",l.uv,2),a.setAttribute("normal",l.normal,3),a.setAttribute("index",l.index,3),s.geometry=a}else if(this.node.type=="gltf"){const s=o.addComponent(Ge);this._blidge.gltfPrm.then(l=>{const a=l.scene.findEntityByName(this.node.name);if(a){const u=a.getComponent(Ge);u&&(s.geometry=u.geometry,s.material=u.material)}o.noticeEventParent("update/blidge/scene",[o])})}if(this.node.type=="light"){const s=this.node.param;this._lightComponent=o.addComponent(Ln),this._lightComponent.deserialize({...s,lightType:s.type,color:new R().copy(s.color),castShadow:s.shadowMap})}if(this.node.type=="camera"&&(this._cameraComponent=o.getComponentsByTag("camera")[0],this._cameraComponent)){const s=this.node.param;this._cameraComponent.fov=s.fov}o.visible=this.node.visible}updateImpl(n){if(!this._blidge||!this.node)return;const r=n.timeCode*this._blidge.frame.fps;if(this.animations.forEach(o=>{o.setFrame(r)}),this.transformAutoUpdate){const o=this.animations.get("position");if(o){const a=o.value;o.getFCurve("x")&&(this.entity.position.x=a.x),o.getFCurve("y")&&(this.entity.position.y=a.y),o.getFCurve("z")&&(this.entity.position.z=a.z)}const s=this.animations.get("rotation");if(s){const a={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},u=s.value;s.getFCurve("x")&&(a.x=u.x),s.getFCurve("y")&&(a.y=u.y),s.getFCurve("z")&&(a.z=u.z),this.entity.quaternion.setFromEuler({x:a.x+this.rotationOffsetX,y:a.y,z:a.z},"YZX")}const l=this.animations.get("scale");if(l){const a=l.setFrame(r).value;l.getFCurve("x")&&(this.entity.scale.x=a.x),l.getFCurve("y")&&(this.entity.scale.y=a.y),l.getFCurve("z")&&(this.entity.scale.z=a.z)}}const i=this.animations.get("hide");if(i&&(this.entity.visible=i.value.x<.5),this._lightComponent){const o=this.animations.get("color");o&&this._lightComponent.color.copy(o.setFrame(r).value)}this.uniformCurves.forEach((o,s)=>{this.uniforms[s].value=o.setFrame(r).value})}}class gt extends qn{constructor(n){super();c(this,"name");c(this,"enabled");c(this,"_passes");const r=n||{};this.name=r.name||"",this.enabled=!0,this._passes=n&&n.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(n=>n.enabled)}get output(){for(let n=this._passes.length-1;n>=0;n--){const r=this._passes[n];if(!r.passThrough&&r.enabled)return r.renderTarget}return null}resize(n){if(this._passes)for(let r=0;r<this._passes.length;r++)this._passes[r].resize(n)}dispose(){this.emit("dispose")}}class la extends Pe{constructor(n){super(n);c(this,"_resolution");c(this,"_postProcesses");c(this,"_postProcessesDict");this._postProcesses=[],this._postProcessesDict=new Map,this._resolution=new R,this.field("postprocess",()=>this._postProcesses.map((r,i)=>r.enabled),r=>{r.forEach((i,o)=>{const s=this._postProcesses[o];s&&(s.enabled=i)})},{format:{type:"array",labels:(r,i)=>this._postProcesses[i].name}})}get postProcesses(){return this._postProcesses}add(n){return this.postProcesses.push(n),n.resize(this._resolution),n}remove(n){const r=this._postProcesses.indexOf(n);r>-1&&this._postProcesses.splice(r,1)}resize(n){this._resolution.copy(n),this.postProcesses.forEach(r=>{r.resize(n)})}}const d0=`#include <common>\r
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
}`,m0=`layout ( location = 0 ) in vec3 position;\r
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
}`;class G extends Xt{constructor(n,r){super({...r,frag:r.frag||d0,vert:r.vert||m0});c(this,"enabled");c(this,"renderTarget");c(this,"backBufferOverride");c(this,"clearColor");c(this,"clearDepth");c(this,"resolutionRatio");c(this,"passThrough");c(this,"resolution");c(this,"resolutionInv");c(this,"viewPort");c(this,"_fixedResolution");this.enabled=!0,this._fixedResolution=r.fixedResotluion?r.fixedResotluion.clone():null,this.resolution=new R,this.resolutionInv=new R,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:"2fv"},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:"2fv"},this.renderTarget=r.renderTarget!==void 0?r.renderTarget:new $(n).setTexture([new b(n).setting({magFilter:n.LINEAR,minFilter:n.LINEAR})]),this.clearColor=r.clearColor??null,this.clearDepth=r.clearDepth??null,this.depthTest=r.depthTest!==void 0?r.depthTest:!1,this.resolutionRatio=r.resolutionRatio||1,this.passThrough=r.passThrough??!1,this.viewPort=r.viewPort||null,this.backBufferOverride=r.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(n){this._fixedResolution=n,this.resize(n||new R)}onAfterRender(){}resize(n){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(n).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(n){this.renderTarget=n,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}var ue;(e=>{e.assign=(t,...n)=>{for(let r=0;r<n.length;r++)n[r]!=null&&Object.assign(t,n[r]);return t},e.merge=(...t)=>{const n={};return(0,e.assign)(n,...t)}})(ue||(ue={}));class ol extends sa{constructor(n){super(n);c(this,"dofParams");c(this,"_gl");c(this,"_renderTarget");c(this,"_gBuffer");c(this,"_resolution");this.dofParams={focusDistance:.5,kFilmHeight:.008};const r=n.args.gl;this._gl=r,this._resolution=new R,this._gBuffer=new $(r),this._gBuffer.setTexture([new b(r).setting({type:r.FLOAT,internalFormat:r.RGBA32F,format:r.RGBA,magFilter:r.NEAREST,minFilter:r.NEAREST}),new b(r).setting({type:r.FLOAT,internalFormat:r.RGBA32F,format:r.RGBA}),new b(r),new b(r),new b(r).setting({type:r.FLOAT,internalFormat:r.RGBA32F,format:r.RGBA})]);const i=new $(r,{disableDepthBuffer:!0});i.setTexture([new b(r).setting({type:r.FLOAT,internalFormat:r.RGBA16F,format:r.RGBA}),new b(r).setting({type:r.FLOAT,internalFormat:r.RGBA16F,format:r.RGBA})]);const o=new $(r,{disableDepthBuffer:!0});o.setDepthTexture(this._gBuffer.depthTexture),o.setTexture([i.textures[0],this._gBuffer.textures[0],this._gBuffer.textures[4]]);const s=new $(r,{disableDepthBuffer:!0});s.setDepthTexture(this._gBuffer.depthTexture),s.setTexture([new b(r)]);const l=new $(r);l.setTexture([new b(r).setting({type:r.FLOAT,internalFormat:r.RGBA32F,format:r.RGBA,magFilter:r.NEAREST,minFilter:r.NEAREST})]),this._renderTarget={gBuffer:this._gBuffer,shadingBuffer:i,forwardBuffer:o,uiBuffer:s,normalBuffer:l},this.resize(this._resolution)}get resolution(){return this._resolution}get gBuffer(){return this._gBuffer}get renderTarget(){return this._renderTarget}resize(n){n.x==this._resolution.x&&n.y==this._resolution.y||(this._resolution.copy(n),this.aspect=n.x/n.y,this._renderTarget&&(this._renderTarget.gBuffer.setSize(this._resolution),this._renderTarget.shadingBuffer.setSize(this._resolution),this._renderTarget.forwardBuffer.setSize(this._resolution),this._renderTarget.uiBuffer.setSize(this._resolution),this._renderTarget.normalBuffer.setSize(this._resolution)),this.needsUpdateProjectionMatrix=!0)}}const p0=new Xt;class ch extends Pe{constructor(n){super(n);c(this,"material");this.material=n.args||p0,this._tag="materialOverride"}}const v0=`#define PI 3.14159265359\r
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
}`,g0=`struct DirectionalLight {\r
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
}`,y0=`\r
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
}`,x0=`\r
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
  }`,_0=`\r
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
}`,w0=`// https://github.com/mrdoob/three.js/blob/c2593ed3db121b17590068c638d5dc115e7496f9/src/renderers/shaders/ShaderChunk/cube_uv_reflection_fragment.glsl.js#L11C8-L11C15\r
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
}`,A0=`// https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\r
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
}`,S0=`vec3 N( vec3 pos, float delta ){\r
\r
    return normalize( vec3(\r
		D( vec3( pos.x + delta, pos.y, pos.z ) ).d - D( vec3( pos.x - delta, pos.y, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y + delta, pos.z ) ).d - D( vec3( pos.x, pos.y - delta, pos.z ) ).d,\r
		D( vec3( pos.x, pos.y, pos.z + delta ) ).d - D( vec3( pos.x, pos.y, pos.z - delta ) ).d\r
	) );\r
	\r
}`,C0=`mat2 rotate(float rad) {\r
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
}`,E0=`// https://iquilezles.org/articles/distfunctions/\r
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
`,P0="in vec2 vUv;\rin vec3 vNormal;\rin vec3 vViewNormal;\rin vec3 vPos;\rin vec3 vMVPosition;\rin vec3 vMVPPosition;\rin vec2 vVelocity;\r\runiform mat4 uModelMatrix;\runiform mat4 uModelMatrixInverse;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform vec3 uCameraPosition;\runiform vec2 uResolution;\r\r#ifdef IS_DEPTH\r	uniform float uCameraNear;\r	uniform float uCameraFar;\r#endif\r\r#ifdef IS_DEFERRED\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r	layout (location = 3) out vec4 outColor3;\r	layout (location = 4) out vec4 outColor4;\r#endif\r\r#ifdef IS_FORWARD\r	uniform sampler2D uDeferredTexture;\r	uniform vec2 uDeferredResolution;\r#endif\r\r#if defined(IS_FORWARD) || defined(IS_DEPTH)\r	layout (location = 0) out vec4 outColor0;\r	layout (location = 1) out vec4 outColor1;\r	layout (location = 2) out vec4 outColor2;\r#endif",T0="vec4 outColor = vec4(1.0);\rvec3 outNormal = normalize(vNormal);\rvec3 outNormalMap = vec3( 0.0 );\rfloat outSSN = 0.0;\rvec3 outEmission = vec3(0.0);\rfloat outRoughness = 0.5;\rfloat outMetalic = 0.0;\rvec3 outPos = vPos;\rfloat outEnv = 1.0;",M0="#if defined(IS_DEPTH) || defined(IS_DEFERRED)\r	vec4 mv = uViewMatrix * vec4(outPos, 1.0);\r#endif\r\r#ifdef IS_DEPTH\r	float depth_z = (-mv.z - uCameraNear) / (uCameraFar - uCameraNear);\r	outColor0 = vec4(floatToRGBA( depth_z ));\r#endif\r\r#ifdef IS_DEFERRED\r\r	#ifdef USE_NORMAL_MAP \r\r		vec3 tangent;\r		vec3 bitangent;\r\r		#ifdef USE_TANGENT\r\r			tangent = normalize( vTangent );\r			bitangent = normalize( vBitangent );\r\r		#else\r\r			tangent = cross(outNormal, vec3( 0.0, 1.0, 0.0 ));\r			bitangent = cross(tangent, outNormal);\r\r		#endif\r\r		#ifdef DOUBLE_SIDED\r\r			tangent *= faceDirection;\r			bitangent *= faceDirection;\r			\r		#endif\r\r		mat3 vTBN = mat3( tangent, bitangent, outNormal );\r		outNormal = normalize( vTBN * outNormalMap );\r\r	#endif\r\r	vec4 mvp = uProjectionMatrix * mv;\r	gl_FragDepth = ( mvp.z / mvp.w ) * 0.5 + 0.5;\r	outColor0 = vec4( outPos, outEmission.x );\r	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), outEmission.y );\r	outColor2 = vec4( outColor.xyz, 0.0 );\r	outColor3 = vec4( outRoughness, outMetalic, outSSN, outEnv );\r	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r#endif\r\r#ifdef IS_FORWARD\r	outColor0 = outColor;\r	outColor1 = vec4(outPos, 1.0);\r	outColor2 = vec4(vVelocity, 0.0, 1.0);\r#endif",R0="vec3 refDir = reflect( -geo.viewDir, geo.normal );\rfloat dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\rfloat EF = mix( fresnel( dNV ), 1.0, mat.metalic );\routColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;\routColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );",k0="Geometry geo = Geometry(\r	outPos,\r	outNormal,\r	0.0,\r	normalize( uCameraPosition - outPos ),\r	vec3( 0.0 ),\r	0.0\r);\r\rMaterial mat = Material(\r	vec3( 1.0 ),\r	outRoughness,\r	outMetalic,\r	outEmission,\r	mix( outColor.xyz, vec3( 0.0, 0.0, 0.0 ), outMetalic ),\r	mix( vec3( 1.0, 1.0, 1.0 ), outColor.xyz, outMetalic ),\r	outEnv\r);\r\routColor.xyz *= 0.0;",z0="// required common, light,\r\rfloat shadow;\r\r// direcitonalLight\r\rLight light;\rLightCamera lightCamera;\r\r#if NUM_LIGHT_DIR > 0 \r\r	DirectionalLight dLight;\r\r	#pragma loop_start NUM_LIGHT_DIR\r\r		dLight = directionalLight[ LOOP_INDEX ];\r		light.direction = dLight.direction;\r		light.color = dLight.color;\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_DIR\r\r			shadow = getShadowSmooth( tex0.xyz, uDirectionalLightCamera[ LOOP_INDEX ], directionalLightShadowMap[ LOOP_INDEX ], 0.0001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r		\r		// lighting\r\r		outColor.xyz += RE( geo, mat, light ) * shadow;\r\r	#pragma loop_end\r\r#endif\r\r#if NUM_LIGHT_SPOT > 0\r\r	SpotLight sLight;\r	\r	vec3 spotDirection;\r	float spotDistance;\r	float spotAngleCos;\r	float spotAttenuation;\r	vec3 radiance;\r\r	#pragma loop_start NUM_LIGHT_SPOT\r\r		// shadow\r\r		#if LOOP_INDEX < NUM_SHADOWMAP_SPOT\r\r			shadow = getShadowSmooth( geo.position, uSpotLightCamera[ LOOP_INDEX ], uSpotLightShadowMap[ LOOP_INDEX ], 0.001 );\r\r		#else\r\r			shadow = 1.0;\r\r		#endif\r\r		// lighting\r\r		sLight = uSpotLight[ LOOP_INDEX ];\r\r		spotDirection = normalize(sLight.position - geo.position);\r		spotDistance = length( sLight.position - geo.position );\r		spotAngleCos = dot( sLight.direction, spotDirection );\r		spotAttenuation = 0.0;\r\r		if( spotAngleCos > sLight.angle ) {\r\r			spotAttenuation = smoothstep( sLight.angle, sLight.angle + ( 1.0 - sLight.angle ) * sLight.blend, spotAngleCos );\r\r		}\r\r		light.direction = spotDirection;\r		light.color = sLight.color * spotAttenuation * pow( clamp( 1.0 - spotDistance / sLight.distance, 0.0, 1.0 ),  sLight.decay );\r\r		radiance = RE( geo, mat, light );\r		outColor.xyz += shadow * radiance;\r\r	#pragma loop_end\r\r#endif",L0="struct SDFResult {\r	float d;\r	vec3 pos;\r	float mat;\r};",N0="vec4 worldNormal = normalize(uModelMatrix * vec4( outNormal, 0.0 ));\rvec4 viewNormal = normalize(uViewMatrix * worldNormal);\routNormal = worldNormal.xyz;\r\rvec4 modelPosition = uModelMatrix * vec4( rayPos, 1.0 );\rvec4 mvpPosition = uProjectionMatrix * uViewMatrix * modelPosition;\routPos = modelPosition.xyz;\rgl_FragDepth =  ( mvpPosition.z / mvpPosition.w ) * 0.5 + 0.5;",B0="vec3 rayPos = ( uModelMatrixInverse * vec4( vPos, 1.0 ) ).xyz;\rvec3 rayDir = normalize( ( uModelMatrixInverse * vec4( normalize( vPos - uCameraPosition ), 0.0 ) ).xyz );",D0="vec3 rayPos = ( uModelMatrixInverse * vec4( uCameraPosition, 1.0 ) ).xyz;\rvec4 clipSpacePos = vec4((gl_FragCoord.xy / uResolution) * 2.0 - 1.0, -1.0, 1.0);\rvec4 viewSpacePos = uProjectionMatrixInverse * clipSpacePos;\rviewSpacePos /= viewSpacePos.w;\rvec3 viewDir = normalize(viewSpacePos.xyz);\rvec3 rayDir = normalize((uViewMatrixInverse * vec4(viewDir, 0.0)).xyz);",F0="uniform float uTime;\runiform float uTimeF;\runiform float uTimeE;\runiform float uTimeEF;",I0="uniform mat4 uModelMatrix;\runiform mat4 uViewMatrix;\runiform mat4 uProjectionMatrix;\runiform mat4 uNormalMatrix;\r\runiform mat4 uModelMatrixPrev;\runiform mat4 uViewMatrixPrev;\runiform mat4 uProjectionMatrixPrev;\r\rout vec2 vUv;\rout vec3 vViewNormal;\rout vec3 vNormal;\rout vec3 vMVPosition;\rout vec3 vMVPPosition;\rout vec3 vPos;\r\rout vec2 vVelocity;\r\rlayout ( location = 0 ) in vec3 position;\rlayout ( location = 1 ) in vec2 uv;\rlayout ( location = 2 ) in vec3 normal;\r\r#ifdef TF_MODELER\r	out vec3 o_position;\r	out vec3 o_normal;\r#endif",b0="vec3 outPos = position;\rvec3 outNormal = normal;\rvec2 outUv = uv;",j0="#ifdef TF_MODELER\r		o_position = outPos;\r		o_normal = outNormal;\r		return;\r#endif\r\rvec4 modelPosition = uModelMatrix * vec4(outPos, 1.0);\rvec4 mvPosition = uViewMatrix * modelPosition;\rgl_Position = uProjectionMatrix * mvPosition;\r\rvec4 modelPositionPrev = uModelMatrixPrev * vec4(outPos, 1.0);\rvec4 mvPositionPrev = uViewMatrixPrev * modelPositionPrev;\rvec4 positionPrev = uProjectionMatrixPrev * mvPositionPrev;\r\rvUv = outUv;\rvViewNormal = normalize( (uNormalMatrix * vec4(outNormal, 0.0)).xyz );\rvNormal = (uModelMatrix * vec4(outNormal, 0.0)).xyz;\rvPos = modelPosition.xyz;\rvMVPosition = mvPosition.xyz;\rvMVPPosition = gl_Position.xyz / gl_Position.w;\r\rvVelocity = vMVPPosition.xy - positionPrev.xy / positionPrev.w;\rvVelocity *= 0.2;",O0=(e,t)=>{if(!t)return e;const n=Object.keys(t);let r="";for(let i=0;i<n.length;i++)r+="#define "+n[i]+" "+t[n[i]]+`
`;return r=r+e,r},U0=e=>{const t=new Map([["common",v0],["sdf",E0],["rotate",C0],["random",A0],["noise_simplex",x0],["noise_cyclic",y0],["noise_value",_0],["light",g0],["lighting_light",z0],["lighting_env",R0],["lighting_forwardIn",k0],["vert_h",I0],["vert_in",b0],["vert_out",j0],["frag_h",P0],["frag_in",T0],["frag_out",M0],["rm_h",L0],["rm_normal",S0],["rm_ray_obj",B0],["rm_ray_world",D0],["rm_out_obj",N0],["uni_time",F0],["pmrem",w0]]);return e=e.replace(/#include\s?<([\S]*)>/g,(n,r)=>{let i="",o=t.get(r)||"";return o=o.replace(/#define GLSLIFY .*\n/g,""),i+=o,i}),e},V0=(e,t)=>(e=e.replaceAll("NUM_LIGHT_DIR",t?t.directional.length.toString():"0"),e=e.replaceAll("NUM_SHADOWMAP_DIR",t?Math.min(2,t.directional.filter(n=>n.component.castShadow).length).toString():"0"),e=e.replaceAll("NUM_LIGHT_SPOT",t?t.spot.length.toString():"0"),e=e.replaceAll("NUM_SHADOWMAP_SPOT",t?Math.min(2,t.spot.filter(n=>n.component.castShadow).length).toString():"0"),e),W0=e=>(e=e.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(t,n,r)=>{let i="";for(let o=0;o<Number(n);o++)i+=r.replaceAll("LOOP_INDEX",o.toString());return i}),e),sl=(e,t,n)=>(e=O0(e,t),e=`#version 300 es
precision highp float;
`+e,e=U0(e),e=V0(e,n),e=W0(e),e=e.replace(/#define GLSLIFY .*\n/g,""),e),H0=`#include <common>\r
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
}`,G0=`#include <common>
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

}`,$0=`#include <common>

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

}`,X0=`#include <common>
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

}`,Su=`#include <common>
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

}`,Y0=e=>{const t=[];for(let n=0;n<e;n++){const r=new R;r.x=Math.random()*2-1,r.y=Math.random()*2-1,r.z=n/e*.95+.05,r.normalize(),r.multiply(n/e*.95+.05),t.push(...r.getElm("vec3"))}return t};class Q0 extends _e{constructor(n){super();c(this,"timeUniforms_");c(this,"postprocess");c(this,"normalSelector_");c(this,"lightShaft");c(this,"rtLightShaft1");c(this,"rtLightShaft2");c(this,"ssao");c(this,"rtSSAO1");c(this,"rtSSAO2");c(this,"ssaoBlur");c(this,"ssaoBlurUni");c(this,"shading");const r=n.gl,i={uTimeEF:{value:0,type:"1f"}},o=new G(r,{name:"normalSelector",frag:$0,renderTarget:null,uniforms:ue.merge({uNormalTexture:{value:null,type:"1i"},uPosTexture:{value:null,type:"1i"},uSelectorTexture:{value:null,type:"1i"}}),passThrough:!0}),s=new $(r).setTexture([new b(r).setting({magFilter:r.LINEAR,minFilter:r.LINEAR})]),l=new $(r).setTexture([new b(r).setting({magFilter:r.LINEAR,minFilter:r.LINEAR})]),a=new G(r,{name:"lightShaft",frag:G0,renderTarget:s,uniforms:ue.merge(i,{uLightShaftBackBuffer:{value:l.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"}}),resolutionRatio:.5,passThrough:!0}),u=new $(r).setTexture([new b(r).setting({magFilter:r.LINEAR,minFilter:r.LINEAR})]),f=new $(r).setTexture([new b(r).setting({magFilter:r.LINEAR,minFilter:r.LINEAR})]),p=new G(r,{name:"ssao",frag:X0,renderTarget:Qe("ssao",u),uniforms:ue.merge(i,{uSSAOBackBuffer:{value:f.textures[0],type:"1i"},uSSAOKernel:{value:Y0(16),type:"3fv"}}),resolutionRatio:.5,passThrough:!0}),m=8,v=ue.merge(i,{uSSAOTexture:{value:f.textures[0],type:"1i"},uDepthTexture:{value:null,type:"1i"},uNormalTexture:{value:null,type:"1i"},uWeights:{type:"1fv",value:uo.gaussWeights(m)}}),x=new G(r,{name:"ssaoBlur/h",frag:Qe("ssaoBlur",Su),uniforms:v,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:m}}),_=new G(r,{name:"ssaoBlur/v",frag:Qe("ssaoBlur",Su),uniforms:ue.merge(v,{uSSAOTexture:{value:x.renderTarget.textures[0],type:"1i"}}),defines:{SSAOSAMPLE:m,IS_VIRT:""},resolutionRatio:1,passThrough:!0}),E=new G(r,{name:"deferredShading",frag:Qe("deferredShading",H0),uniforms:ue.merge({uLightShaftTexture:{value:null,type:"1i"},uSSAOTexture:{value:_.renderTarget.textures[0],type:"1i"},uSSAOResolutionInv:{value:p.resolutionInv,type:"2fv"},uEnvMap:{value:n.envMap,type:"1i"}})});this.postprocess=new gt({passes:[o,a,p,x,_,E]}),this.timeUniforms_=i,this.shading=E,this.lightShaft=a,this.ssao=p,this.rtSSAO1=u,this.rtSSAO2=f,this.ssaoBlur=x,this.ssaoBlurUni=v,this.rtLightShaft1=s,this.rtLightShaft2=l,this.normalSelector_=o}update(n){this.timeUniforms_.uTimeEF.value=(this.timeUniforms_.uTimeEF.value+n.timeDelta)%1;let r=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=r,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],r=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=r,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setRenderCamera(n){const r=n.renderTarget;if(r){for(let i=0;i<r.gBuffer.textures.length;i++){let o=r.gBuffer.textures[i];i===1&&(o=r.normalBuffer.textures[0]),this.shading.uniforms["sampler"+i]=this.ssao.uniforms["sampler"+i]={type:"1i",value:o}}this.ssaoBlur.uniforms.uDepthTexture.value=r.gBuffer.textures[0],this.lightShaft.uniforms.uDepthTexture.value=r.gBuffer.depthTexture,this.shading.renderTarget=r.shadingBuffer,this.normalSelector_.renderTarget=r.normalBuffer,this.normalSelector_.uniforms.uNormalTexture.value=r.gBuffer.textures[1],this.normalSelector_.uniforms.uPosTexture.value=r.gBuffer.textures[0],this.normalSelector_.uniforms.uSelectorTexture.value=r.gBuffer.textures[3],this.ssaoBlurUni.uNormalTexture.value=r.normalBuffer.textures[0]}}resize(n){this.postprocess.resize(n)}}const K0=`#include <common>\r
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
}`,q0=`#include <common>\r
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
}`,Z0=`#include <common>\r
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
`,J0=`#include <common>

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

}`,ev=`in vec2 vUv;

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

}`,tv=`in vec2 vUv;
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

}`,nv=`in vec2 vUv;
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

}`,rv=`#include <common>\r
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
}`,iv=`#include <common>
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

}`;class ov{constructor(t){c(this,"dofCoc");c(this,"dofBokeh");c(this,"dofComposite");c(this,"rtSSR1");c(this,"rtSSR2");c(this,"postprocess");c(this,"_timeUniforms");c(this,"_ssr");c(this,"_ssComposite");c(this,"_dofParams");c(this,"_motionBlur");c(this,"_motionBlurTile");c(this,"_renderCamera");const n={uTimeEF:{value:0,type:"1f"}},r=new G(t,{name:"collection",frag:K0}),i=new $(t).setTexture([new b(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR})]),o=new $(t).setTexture([new b(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR})]),s=new G(t,{name:"ssr",frag:Qe("ssr",iv),renderTarget:i,uniforms:ue.merge(n,{uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSceneTex:{value:null,type:"1i"},uSSRBackBuffer:{value:o.textures[0],type:"1i"}}),resolutionRatio:.5,passThrough:!0}),l=new G(t,{name:"ssComposite",frag:Qe("ssComposite",rv),uniforms:ue.merge({uGbufferPos:{value:null,type:"1i"},uGbufferNormal:{value:null,type:"1i"},uSSRTexture:{value:o.textures[0],type:"1i"}})}),a=new R(10,.05,20,.05),u=new G(t,{name:"dof/coc",frag:Z0,uniforms:ue.merge(n,{uGbufferPos:{value:null,type:"1i"},uParams:{value:a,type:"4f"}}),renderTarget:new $(t).setTexture([new b(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR,internalFormat:t.RGBA16F,type:t.HALF_FLOAT,format:t.RGBA})]),passThrough:!0,resolutionRatio:.5}),f=new G(t,{name:"dof/bokeh",frag:q0,uniforms:ue.merge(n,{uCocTex:{value:u.renderTarget.textures[0],type:"1i"},uParams:{value:a,type:"4f"}}),renderTarget:new $(t).setTexture([new b(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR})]),passThrough:!0,resolutionRatio:.5}),p=new G(t,{name:"dof/composite",frag:J0,uniforms:ue.merge({uBokeTex:{value:f.renderTarget.textures[0],type:"1i"}}),renderTarget:new $(t).setTexture([new b(t).setting({magFilter:t.LINEAR,minFilter:t.LINEAR,internalFormat:t.RGBA16F,type:t.HALF_FLOAT,format:t.RGBA})])}),m=16,v=new G(t,{name:"motionBlurTile",frag:nv,uniforms:ue.merge({uVelTex:{value:null,type:"1i"}}),renderTarget:new $(t).setTexture([new b(t).setting({type:t.FLOAT,internalFormat:t.RGBA32F,format:t.RGBA})]),defines:{TILE:m},resolutionRatio:1/m,passThrough:!0}),x=new G(t,{name:"motionBlurNeighbor",frag:tv,uniforms:ue.merge({uVelTex:{value:v.renderTarget.textures[0],type:"1i"}}),defines:{TILE:m},renderTarget:new $(t).setTexture([new b(t).setting({type:t.FLOAT,internalFormat:t.RGBA32F,format:t.RGBA})]),resolutionRatio:1/m,passThrough:!0}),_=new G(t,{name:"motionBlur",frag:ev,uniforms:ue.merge({uVelNeighborTex:{value:x.renderTarget.textures[0],type:"1i"},uVelTex:{value:null,type:"1i"},uDepthTexture:{value:null,type:"1i"},uPower:{value:1,type:"1f"}}),defines:{TILE:m}});this.postprocess=new gt({passes:[r,s,l,u,f,p,v,x,_]}),this._timeUniforms=n,this._ssr=s,this._ssComposite=l,this.dofCoc=u,this.dofBokeh=f,this.dofComposite=p,this._motionBlur=_,this._motionBlurTile=v,this._dofParams=a,this.rtSSR1=i,this.rtSSR2=o,this._renderCamera=null}update(t){if(!this._renderCamera)return;this._timeUniforms.uTimeEF.value=(this._timeUniforms.uTimeEF.value+t.timeDelta)%1;const n=this._renderCamera.fov,r=this._renderCamera.dofParams.focusDistance,i=this._renderCamera.dofParams.kFilmHeight,o=i/Math.tan(.5*(n/180*Math.PI)),s=1/this.dofBokeh.renderTarget.size.y*5,l=1/s,a=o*o/(.3*(r-o)*i*2);this._dofParams.set(r,s,l,a);const u=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=u,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(t){this.postprocess.resize(t)}setRenderCamera(t){this._renderCamera=t;const n=t.renderTarget;n&&(this.postprocess.passes[0]&&(this.postprocess.passes[0].backBufferOverride=n.shadingBuffer.textures),this._ssr.uniforms.uGbufferPos.value=n.gBuffer.textures[0],this._ssr.uniforms.uGbufferNormal.value=n.normalBuffer.textures[0],this._ssr.uniforms.uSceneTex.value=n.forwardBuffer.textures[0],this._ssComposite.uniforms.uGbufferPos.value=n.gBuffer.textures[0],this._ssComposite.uniforms.uGbufferNormal.value=n.gBuffer.textures[1],this.dofCoc.uniforms.uGbufferPos.value=n.gBuffer.textures[0],this._motionBlurTile.uniforms.uVelTex.value=n.gBuffer.textures[4],this._motionBlur.uniforms.uVelTex.value=n.gBuffer.textures[4],this._motionBlur.uniforms.uDepthTexture.value=n.gBuffer.depthTexture)}}const sv=`#include <common>

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

}`;class lv extends _e{constructor(n,r){super();c(this,"postprocess");c(this,"resolution");c(this,"renderTarget");c(this,"pmremPasses");c(this,"swapBuffers");c(this,"timeUniforms");c(this,"postProcessRenderer");const i=r.resolution,o={uTimeEF:{value:0,type:"1f"}},s=new $(n).setTexture([new b(n).setting({type:n.FLOAT,internalFormat:n.RGBA16F,format:n.RGBA,magFilter:n.LINEAR,minFilter:n.LINEAR,wrapS:n.CLAMP_TO_EDGE,wrapT:n.CLAMP_TO_EDGE,generateMipmap:!0})]),l=[],a=[],u=[],f=5;let p=0;for(let m=0;m<f;m++){const v=1/Math.pow(2,m),x=i.x*v,_=i.y*v*.5,E=new R(0,p,x,_);p+=_,u.push({rt1:new $(n).setTexture([new b(n).setting({type:n.FLOAT,internalFormat:n.RGBA16F,format:n.RGBA})]),rt2:new $(n).setTexture([new b(n).setting({type:n.FLOAT,internalFormat:n.RGBA16F,format:n.RGBA})])});let g=1/(f-1)*m;g=g;const h=new G(n,{renderTarget:u[m].rt1,frag:sv,uniforms:ue.merge(o,{uRoughness:{value:g,type:"1f"},uEnvMap:{value:r.input,type:"1i"},uPMREMBackBuffer:{value:u[m].rt2.textures,type:"1i"},uRenderCount:{value:1,type:"1f"}}),defines:{NUM_SAMPLES:Math.floor(Math.pow(2,m+1))}});h.resize(new R(x,_));const y=new G(n,{renderTarget:s,viewPort:E,passThrough:!0});y.resize(i),l.push(h,y),a.push(h)}this.postprocess=new gt({passes:l}),this.postprocess.passes[0].backBufferOverride=s.textures,this.resolution=i,this.renderTarget=s,this.pmremPasses=a,this.swapBuffers=u,this.timeUniforms=o,this.postProcessRenderer=null}setPostProcessRenderer(n){this.postProcessRenderer=n}renderProcess(){this.postProcessRenderer?this.postProcessRenderer.renderPostProcess(this.postprocess,void 0,this.resolution):console.warn("PostProcessRenderer has not been set in PMREMRender. Call setPostProcessRenderer first.")}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let n=0;n<this.pmremPasses.length;n++){const r=this.pmremPasses[n],i=this.swapBuffers[n],o=i.rt1;i.rt1=i.rt2,i.rt2=o,r.setRendertarget(i.rt1),r.uniforms.uPMREMBackBuffer.value=i.rt2.textures}}resize(n){}}class av{constructor(t){c(this,"gl");c(this,"pool");this.gl=t,this.pool=new Map}get(t,n){const r=t+n,i=this.pool.get(r);if(i!==void 0&&i.program)return i;const o=new lh(this.gl);return o.setShader(t,n),this.pool.set(r,o),o}}let bi=0;class fh extends lt{constructor(n){super({name:"Renderer"});c(this,"gl");c(this,"resolution");c(this,"_extDisJointTimerQuery");c(this,"programManager");c(this,"_lights");c(this,"_lightsUpdated");c(this,"_envMapCameras");c(this,"_envMapRenderTarget");c(this,"_pmremRender");c(this,"_deferredRenderer");c(this,"_pipelinePostProcess");c(this,"_quad");c(this,"_glStateCahce");c(this,"_queryList");c(this,"_queryListQueued");c(this,"_isCorrentCompiles");c(this,"compileDrawParams");c(this,"_tmpNormalMatrix");c(this,"_tmpModelViewMatrix");c(this,"_tmpViewMatrixInverseMatrix");c(this,"_tmpLightDirection");c(this,"_tmpModelMatrixInverse");c(this,"_tmpProjectionMatrixInverse");this.gl=n,this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new av(this.gl),this.resolution=new R,this._extDisJointTimerQuery=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this._lights={directional:[],spot:[]},this._lightsUpdated=!1;const r=new Yp(this.gl);this._envMapRenderTarget=new Xp(this.gl).setTexture([r]),this._envMapRenderTarget.setSize(256,256);const i=new R(0,0,0),o=new R(0,-1,0),s=[new W().lookAt(i,new R(1,0,0),o),new W().lookAt(i,new R(0,1,0),new R(0,0,1)),new W().lookAt(i,new R(0,0,1),o),new W().lookAt(i,new R(-1,0,0),o),new W().lookAt(i,new R(0,-1,0),new R(0,0,-1)),new W().lookAt(i,new R(0,0,-1),o)];this._envMapCameras=[];for(let l=0;l<6;l++){const a=new lt({name:"envMapCamera/"+l}),u=a.addComponent(sa);u.fov=90,u.near=.1,u.far=1e3,u.aspect=1,a.applyMatrix(s[l].clone()),u.updateViewMatrix(),u.updateProjectionMatrix(),this._envMapCameras.push({entity:a,camera:u})}this._pmremRender=new lv(this.gl,{input:[r],resolution:new R(256*3,256*4)}),this._deferredRenderer=new Q0({gl:n,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:r}),this._pipelinePostProcess=new ov(n),this._quad=new ah({width:2,height:2}),this._glStateCahce={},this._queryList=[],this._queryListQueued=[],this._tmpLightDirection=new R,this._tmpModelMatrixInverse=new W,this._tmpViewMatrixInverseMatrix=new W,this._tmpProjectionMatrixInverse=new W,this._tmpModelViewMatrix=new W,this._tmpNormalMatrix=new W,this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)}getRenderStack(n){const r={camera:[],light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]},i=o=>{const s=o.entity,l=(o.visibility||o.visibility===void 0)&&s.visible,a=s.getComponent(Ge);if(a&&l){const p=a.material;p.visibilityFlag.deferred&&r.deferred.push(s),p.visibilityFlag.shadowMap&&r.shadowMap.push(s),p.visibilityFlag.forward&&r.forward.push(s),p.visibilityFlag.ui&&r.ui.push(s),p.visibilityFlag.envMap&&r.envMap.push(s)}const u=s.getComponent(ol);u&&u.enabled&&r.camera.push(s);const f=s.getComponent(Ln);f&&f.enabled&&l&&r.light.push(s);for(let p=0;p<s.children.length;p++)i({entity:s.children[p],visibility:l});return r};return i({entity:n,visibility:!0}),r}render(n,r){n.onBeforeRender(r);const i=this.getRenderStack(n),o=[],s={},l=Object.keys(this._lights);for(let a=0;a<l.length;a++){const u=l[a];s[u]=this._lights[u].length,this._lights[u]=[]}for(let a=0;a<i.light.length;a++){const u=i.light[a],f=u.getComponent(Ln);f&&(this.collectLight(u,f),f.castShadow&&f.renderTarget&&o.push(u))}this._lights.directional.sort((a,u)=>(a.component.castShadow?0:1)-(u.component.castShadow?0:1)),this._lights.spot.sort((a,u)=>(a.component.castShadow?0:1)-(u.component.castShadow?0:1)),this._lightsUpdated=!1;for(let a=0;a<l.length;a++){const u=l[a];if(s[u]!=this._lights[u].length){this._lightsUpdated=!0;break}}for(let a=0;a<o.length;a++){const u=o[a],f=u.getComponent(Ln);f.renderTarget&&this.renderCamera("shadowMap",u,i.shadowMap,f.renderTarget,this.resolution)}for(let a=0;a<this._envMapCameras.length;a++){const{entity:u}=this._envMapCameras[a];this._envMapRenderTarget.face(a),this.renderCamera("envMap",u,i.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap();for(let a=0;a<i.camera.length;a++){const u=i.camera[a],f=u.getComponent(ol);if(this.gl.disable(this.gl.BLEND),!f.renderTarget)continue;this.renderCamera("deferred",u,i.deferred,f.renderTarget.gBuffer,this.resolution),this._deferredRenderer.setRenderCamera(f),this.renderPostProcess(this._deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:f.viewMatrix,viewMatrixPrev:f.viewMatrixPrev,projectionMatrix:f.projectionMatrix,projectionMatrixPrev:f.projectionMatrixPrev,cameraMatrixWorld:u.matrixWorld}}),this._deferredRenderer.update(r),this.gl.enable(this.gl.BLEND),this.renderCamera("forward",u,i.forward,f.renderTarget.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:f.renderTarget.shadingBuffer.textures[1],type:"1i"},uDeferredResolution:{value:f.renderTarget.shadingBuffer.size,type:"2fv"},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),this._pipelinePostProcess.setRenderCamera(f),this.renderPostProcess(this._pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:f.viewMatrix,projectionMatrix:f.projectionMatrix,cameraMatrixWorld:u.matrixWorld,cameraNear:f.near,cameraFar:f.far}}),this._pipelinePostProcess.update(r);let p=this._pipelinePostProcess.postprocess.output?this._pipelinePostProcess.postprocess.output:void 0;const m=u.getComponent(la);if(m)for(let v=0;v<m.postProcesses.length;v++){const x=m.postProcesses[v];x.enabled&&x.hasOutput&&(this.renderPostProcess(x,p,this.resolution,{cameraOverride:{viewMatrix:f.viewMatrix,projectionMatrix:f.projectionMatrix,cameraMatrixWorld:u.matrixWorld,cameraNear:f.near,cameraFar:f.far}}),p=x.output||void 0)}if(p){this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,p.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,f.renderTarget.uiBuffer.getFrameBuffer());const v=p.size;this.gl.blitFramebuffer(0,0,v.x,v.y,0,0,v.x,v.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}if(this.gl.enable(this.gl.BLEND),this.renderCamera("forward",u,i.ui,f.renderTarget.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:f.renderTarget.shadingBuffer.textures[1],type:"1i"}},disableClear:!0}),this.gl.disable(this.gl.BLEND),f.displayOut){const v=f.renderTarget.uiBuffer;this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER,v===null?null:v.getFrameBuffer()),this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER,null),this.gl.blitFramebuffer(0,0,this.resolution.x,this.resolution.y,0,0,this.resolution.x,this.resolution.y,this.gl.COLOR_BUFFER_BIT,this.gl.NEAREST)}}n.onAfterRender(r)}renderCamera(n,r,i,o,s,l){const a=r.getComponentsByTag("camera")[0]||r.getComponent(Ln);l=l||{};const u={viewMatrix:a.viewMatrix,viewMatrixPrev:a.viewMatrixPrev,projectionMatrix:a.projectionMatrix,projectionMatrixPrev:a.projectionMatrixPrev,cameraMatrixWorld:r.matrixWorld,cameraNear:a.near,cameraFar:a.far,renderTarget:o,uniformOverride:l.uniformOverride,...l.cameraOverride};if(a.viewPort){const p=a.viewPort;this.gl.viewport(p.x,p.y,p.z,p.w)}else o?this.gl.viewport(0,0,o.size.x,o.size.y):this.gl.viewport(0,0,s.x,s.y);const f=new R;o?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,o.getFrameBuffer()),this.gl.drawBuffers(o.textureAttachmentList),f.set(o.size.x,o.size.y)):(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),f.set(s.x,s.y)),u.uniformOverride||(u.uniformOverride={}),u.uniformOverride.uResolution={value:f,type:"2fv"},l.disableClear||(n=="shadowMap"?(this.gl.clearColor(1,1,1,1),this.gl.clearDepth(1)):(this.gl.clearColor(0,0,0,1),this.gl.clearDepth(1)),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT));for(let p=0;p<i.length;p++){const m=i[p],v=m.getComponentsByTag("materialOverride")[0],x=m.getComponent(Ge),_=v?v.material:x.material,E=x.geometry;u.modelMatrixWorld=m.matrixWorld,u.modelMatrixWorldPrev=m.matrixWorldPrev,u.label=`cam[${a.uuid}]/${m.name||_.name||"-"}`,this.draw(m.uuid,n,E,_,u)}this.emit("drawPass",[o,"camera/"+n])}collectLight(n,r){const i=r.lightType,o={position:new R(0,0,0,1).applyMatrix4(n.matrixWorld),direction:new R(0,1,0,0).applyMatrix4(n.matrixWorld).normalize(),color:new R(r.color.x,r.color.y,r.color.z).multiply(r.intensity*Math.PI),component:r};i=="directional"?this._lights.directional.push(o):i=="spot"&&this._lights.spot.push(o),r.castShadow&&r.renderTarget==null&&r.setShadowMap(new $(this.gl).setTexture([new b(this.gl).setting({magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR})]))}renderPostProcess(n,r,i,o){let s=r?r.textures:void 0;if(n.passes)for(let l=0;l<n.passes.length;l++){const a=n.passes[l];if(a.enabled===!1)continue;const u=a.renderTarget;if(a.viewPort){const v=a.viewPort;this.gl.viewport(v.x,v.y,v.z,v.w)}else u?this.gl.viewport(0,0,u.size.x,u.size.y):i&&this.gl.viewport(0,0,i.x,i.y);u?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,u.getFrameBuffer()),this.gl.drawBuffers(u.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null);let f=0;a.clearColor&&(this.gl.clearColor(a.clearColor.x,a.clearColor.y,a.clearColor.z,a.clearColor.w),f|=this.gl.COLOR_BUFFER_BIT),a.clearDepth!==null&&(this.gl.clearDepth(a.clearDepth),f|=this.gl.DEPTH_BUFFER_BIT),f!==0&&this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);const p=a.backBufferOverride||s||null;if(p)for(let v=0;v<p.length;v++)a.uniforms["uBackBuffer"+v]={type:"1i",value:p[v]};const m=o&&o.cameraOverride||{};m.label=a.name,m.renderTarget=u,this.draw(a.uuid,"postprocess",this._quad,a,m),a.onAfterRender(),!a.passThrough&&a.renderTarget&&(s=a.renderTarget.textures),this.emit("drawPass",[a.renderTarget,a.name])}}draw(n,r,i,o,s){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:n,renderType:r,geometry:i,material:o,param:{...s}});return}bi=0;let l=this.gl.CULL_FACE;const a=this._glStateCahce[l];(a===void 0||a.state!=o.cullFace)&&(o.cullFace?this.gl.enable(l):this.gl.disable(l)),l=this.gl.DEPTH_TEST;const u=this._glStateCahce[l];(u===void 0||u.state!=o.depthTest)&&(o.depthTest?this.gl.enable(l):this.gl.disable(l)),this.gl.depthMask(o.depthWrite);let f=o.programCache[r];if(!f||this._lightsUpdated){const m={...o.defines};r=="deferred"?m.IS_DEFERRED="":r=="forward"||r=="envMap"?m.IS_FORWARD="":r=="shadowMap"&&(m.IS_DEPTH="");const v=sl(o.vert,m,this._lights),x=sl(o.frag,m,this._lights);f=this.programManager.get(v,x),o.programCache[r]=f}if(s&&(s.modelMatrixWorld&&(f.setUniform("uModelMatrix","Matrix4fv",s.modelMatrixWorld.elm),f.setUniform("uModelMatrixInverse","Matrix4fv",this._tmpModelMatrixInverse.copy(s.modelMatrixWorld).inverse().elm),s.modelMatrixWorldPrev&&f.setUniform("uModelMatrixPrev","Matrix4fv",s.modelMatrixWorldPrev.elm),s.viewMatrix&&(this._tmpModelViewMatrix.copy(s.modelMatrixWorld).preMultiply(s.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),f.setUniform("uNormalMatrix","Matrix4fv",this._tmpNormalMatrix.elm),f.setUniform("uViewMatrixInverse","Matrix4fv",this._tmpViewMatrixInverseMatrix.copy(s.viewMatrix).inverse().elm))),s.viewMatrix&&(f.setUniform("uViewMatrix","Matrix4fv",s.viewMatrix.elm),s.viewMatrixPrev&&f.setUniform("uViewMatrixPrev","Matrix4fv",s.viewMatrixPrev.elm)),s.projectionMatrix&&(f.setUniform("uProjectionMatrix","Matrix4fv",s.projectionMatrix.elm),f.setUniform("uProjectionMatrixInverse","Matrix4fv",this._tmpProjectionMatrixInverse.copy(s.projectionMatrix).inverse().elm),s.projectionMatrixPrev&&f.setUniform("uProjectionMatrixPrev","Matrix4fv",s.projectionMatrixPrev.elm)),s.cameraMatrixWorld&&(f.setUniform("uCameraMatrix","Matrix4fv",s.cameraMatrixWorld.elm),f.setUniform("uCameraPosition","3f",[s.cameraMatrixWorld.elm[12],s.cameraMatrixWorld.elm[13],s.cameraMatrixWorld.elm[14]])),r!="deferred"&&(s.cameraNear&&f.setUniform("uCameraNear","1f",[s.cameraNear]),s.cameraFar&&f.setUniform("uCameraFar","1f",[s.cameraFar]))),o.useLight&&r!=="deferred"&&r!=="shadowMap"){for(let m=0;m<this._lights.directional.length;m++){const v=this._lights.directional[m];if(f.setUniform("directionalLight["+m+"].direction","3fv",v.direction.getElm("vec3")),f.setUniform("directionalLight["+m+"].color","3fv",v.color.getElm("vec3")),v.component.renderTarget){const x=v.component.renderTarget.textures[0].activate(bi++),_=`uDirectionalLightCamera[${m}]`;f.setUniform(_+".near","1fv",[v.component.near]),f.setUniform(_+".far","1fv",[v.component.far]),f.setUniform(_+".viewMatrix","Matrix4fv",v.component.viewMatrix.elm),f.setUniform(_+".projectionMatrix","Matrix4fv",v.component.projectionMatrix.elm),f.setUniform(_+".resolution","2fv",x.size.getElm("vec2")),f.setUniform("directionalLightShadowMap["+m+"]","1i",[x.unit])}}for(let m=0;m<this._lights.spot.length;m++){const v=this._lights.spot[m];s&&s.viewMatrix&&this._tmpLightDirection.copy(v.direction).applyMatrix3(s.viewMatrix);const x=`uSpotLight[${m}]`;if(f.setUniform(x+".position","3fv",v.position.getElm("vec3")),f.setUniform(x+".direction","3fv",v.direction.getElm("vec3")),f.setUniform(x+".color","3fv",v.color.getElm("vec3")),f.setUniform(x+".angle","1fv",[Math.cos(v.component.angle/2)]),f.setUniform(x+".blend","1fv",[v.component.blend]),f.setUniform(x+".distance","1fv",[v.component.distance]),f.setUniform(x+".decay","1fv",[v.component.decay]),v.component.renderTarget){const _=v.component.renderTarget.textures[0].activate(bi++),E=`uSpotLightCamera[${m}]`;f.setUniform(E+".near","1fv",[v.component.near]),f.setUniform(E+".far","1fv",[v.component.far]),f.setUniform(E+".viewMatrix","Matrix4fv",v.component.viewMatrix.elm),f.setUniform(E+".projectionMatrix","Matrix4fv",v.component.projectionMatrix.elm),f.setUniform(E+".resolution","2fv",_.size.getElm("vec2")),f.setUniform("spotLightShadowMap["+m+"]","1i",[_.unit])}}}uv(f,{...o.uniforms,...s&&s.uniformOverride});const p=f.getVAO(n.toString());p&&(i.vaoCache.get(p)||(i.createBuffers(this.gl),i.attributes.forEach((m,v)=>{m.buffer!==void 0&&(v=="index"?p.setIndex(m.buffer):p.setAttribute(v,m.buffer,m.size,m.opt))}),i.vaoCache.set(p,!0)),f.use(m=>{m.uploadUniforms(),this.gl.bindVertexArray(p.getVAO());const v=p.indexBuffer;let x=this.gl.UNSIGNED_SHORT;v&&v.array&&v.array.BYTES_PER_ELEMENT==4&&(x=this.gl.UNSIGNED_INT),o.blending=="NORMAL"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):o.blending=="ADD"?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):o.blending=="DIFF"&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);const _=this.gl[o.drawType];p.instanceCount>0?v?this.gl.drawElementsInstanced(_,p.indexCount,x,0,p.instanceCount):this.gl.drawArraysInstanced(_,0,p.vertCount,p.instanceCount):v?this.gl.drawElements(_,p.indexCount,x,0):this.gl.drawArrays(_,0,p.vertCount),this.gl.bindVertexArray(null)}))}resize(n){this.resolution.copy(n),this._deferredRenderer.resize(this.resolution),this._pipelinePostProcess.resize(this.resolution)}async compileShaders(n,r,i){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.render(n,r),this._isCorrentCompiles=!1;const o=this.compileDrawParams.length;let s=0;for(let l=0;l<this.compileDrawParams.length;l++){const a=this.compileDrawParams[l],u=a.param.renderTarget;if(u?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,u.getFrameBuffer()),this.gl.drawBuffers(u.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.draw(a.drawId,a.renderType,a.geometry,a.material,a.param),await new Promise(f=>{setTimeout(()=>{f(null)},10)}),i){s++;const f=a.param&&a.param.label||"-",p=`${a.renderType}/${f}/[${a.drawId}]`;i(p,s,o)}}}}const uv=(e,t)=>{const n=Object.keys(t);for(let r=0;r<n.length;r++){const i=n[r],o=t[i];if(!o)continue;const s=o.type,l=o.value,a=[],u=f=>{f!=null&&(typeof f=="number"||typeof f=="boolean"?a.push(f):"isVector"in f?a.push(...f.getElm("vec"+s.charAt(0))):"isTexture"in f?(f.activate(bi++),a.push(f.unit)):a.push(...f.elm))};if(Array.isArray(l))for(let f=0;f<l.length;f++)u(l[f]);else u(l);a.length>0&&e.setUniform(i,s,a)}},Cu=new Map,Qe=(e,t)=>{const n=Cu.get(e);return n||(Cu.set(e,t),t)};class fr{static serializeEntity(t){const n=r=>{const i=[];return r.children.forEach(o=>{o.initiator!="script"&&i.push(n(o))}),{name:r.name,pos:r.position.x==0&&r.position.y==0&&r.position.z==0?void 0:r.position.getElm("vec3"),rot:r.euler.x==0&&r.euler.y==0&&r.euler.z==0?void 0:r.euler.getElm("vec3"),scale:r.scale.x==1&&r.scale.y==1&&r.scale.z==1?void 0:r.scale.getElm("vec3"),childs:i.length>0?i:void 0}};return n(t)}static serializeEntityOverride(t){const n=[];return t.traverse(r=>{const o={path:r.getScenePath(t)},s=[];r.components.forEach(l=>{const a=l.serialize({mode:"export"}),u=Object.keys(a).length>0,f={name:l.constructor.name};!u&&l.initiator!=="user"||(u&&(f.props=a),s.push(f))}),s.length>0&&(o.components=s),!(r.initiator!=="user"&&!o.components)&&n.push(o)}),n}static deserializeOverride(t,n,r){r.traverse(i=>{const o=i.getScenePath(n),s=t.find(l=>l.path==o);s&&(s.components||[]).forEach(l=>{const a=pe.resources.getComponent(l.name);if(a){let u=i.getComponent(a.component);u||(u=i.addComponent(a.component),u.initiator="user"),l.props&&u.deserialize(l.props)}})})}static deserializeEntity(t,n){const r=(i,o)=>{const s=o||new lt;s.initiator="user",s.name=i.name;const l=i.pos||[0,0,0];s.position.x=l[0],s.position.y=l[1],s.position.z=l[2];const a=i.rot||[0,0,0];s.euler.x=a[0],s.euler.y=a[1],s.euler.z=a[2];const u=i.scale||[1,1,1];return s.scale.x=u[0],s.scale.y=u[1],s.scale.z=u[2],i.childs&&i.childs.forEach(f=>{s.add(r(f))}),s};t&&r(t,n),n.initiator="god"}}class cv extends _e{constructor(){super();c(this,"componentList");c(this,"componentGroups");c(this,"textures");this.componentList=[],this.textures=new Map,this.componentGroups=[]}clear(){this.componentList=[],this.componentGroups=[],this.textures.clear()}getComponent(n){return this.componentList.find(r=>r.name==n)}addComponentGroup(n){let r=this.componentGroups.find(o=>o.name==n);if(r)return r;const i=o=>{const s=[];return{child:s,name:o,addComponent:(l,a)=>{const u={name:l,component:a};s.push(u),this.componentList.push(u)},createGroup:l=>{const a=i(l);return s.push(a),a}}};return r=i(n),this.componentGroups.push(r),r}addTexture(n,r){return this.textures.set(n,r),r}getTexture(n){return this.textures.get(n)}}const Mr=class Mr extends lt{constructor(n){super();c(this,"enableRender");c(this,"_renderer");c(this,"_gl");c(this,"_canvas");c(this,"_projectCache");c(this,"_root");c(this,"_uniforms");c(this,"_time");c(this,"_frame");c(this,"_frameSetting");c(this,"_disposed");Mr.instances.set(n,this),this._gl=n,this.name="OREngine",this._disposed=!1,this._uniforms={uTime:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uEnvMapIntensity:{value:1,type:"1f"}},this._canvas=n.canvas,this._renderer=new fh(n),this._projectCache=null,this.on("update/blidge/scene",i=>{this._projectCache&&fr.deserializeOverride(this._projectCache.overrides,this._root,i)}),this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this.enableRender=!0,this._root=new lt,this._root.initiator="god",this._root.name="root",this.add(this._root),this.field("name",()=>this.name,i=>this.name=i),this.field("scene",()=>fr.serializeEntity(this._root),i=>{fr.deserializeEntity(i,this._root)}),this.field("overrides",()=>fr.serializeEntityOverride(this._root),i=>{fr.deserializeOverride(i,this._root,this._root)});const r=this.fieldDir("timeline");r.field("duration",()=>this._frameSetting.duration,i=>this._frameSetting.duration=i),r.field("fps",()=>this._frameSetting.fps,i=>this._frameSetting.fps=i)}static getInstance(n){const r=this.instances.get(n);if(!r)throw new Error("ERROR: NO ENGINE INSTANCE!!!");return r}get gl(){return this._gl}get canvas(){return this._canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}get disposed(){return this._disposed}init(){this._root.remove(this._renderer),this._root.disposeRecursive(),this._root.add(this._renderer),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.add(this._root),this.name="New Project"}async load(n){this.init(),this.deserialize(n),this._projectCache=n||null,this.emit("update/graph"),this.emit("loaded")}update(n){const r=new Date().getTime();this._time.delta=(r-this._time.current)/1e3,this._time.current=r,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*(this._frame.playing?1:0),this._frame.current=this._time.code*60;const i=this.createEntityUpdateEvent({forceDraw:n==null?void 0:n.forceDraw});return this._uniforms.uTime.value=this._time.code,this._uniforms.uTimeE.value=this._time.engine,this._root.update(i),this.enableRender&&this._renderer.render(this._root,i),this._frame.playing&&this.emit("update/frame/play",[this._frame]),this._time.delta}createEntityUpdateEvent(n){const r={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return n?{...r,...n}:r}setSize(n){this._renderer.resize(n),this._canvas.width=n.x,this._canvas.height=n.y}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(n){this._time.code=n/60,this._frame.current=n,this.emit("update/frame/play",[this._frame])}compileShaders(n){const r=this.createEntityUpdateEvent({forceDraw:!0});return this.renderer.compileShaders(this._root,r,n)}dispose(){super.dispose(),this._disposed=!0,this._root.remove(this._renderer),this._root.disposeRecursive()}};c(Mr,"resources"),c(Mr,"instances");let pe=Mr;pe.resources=new cv;pe.instances=new Map;const fv=()=>C.useContext(Zf),hv="_compoAdd_5919t_45",dv="_directory_5919t_49",mv="_subDirectory_5919t_70",pv="_picker_5919t_116",fo={compoAdd:hv,directory:dv,subDirectory:mv,picker:pv},hh=({group:e,onClickAdd:t})=>{const n=fv(),[r,i]=C.useState(!1);let o=null,s,l="dir";return e.name.startsWith("_")?null:("child"in e?o=d.jsx(d.Fragment,{children:e.child.map((a,u)=>d.jsx(hh,{group:a,onClickAdd:t},u))}):(s=()=>t(e),l="item"),d.jsxs("div",{className:fo.directory,onPointerEnter:()=>i(!0),onPointerLeave:()=>i(!1),onClick:s,"data-type":l,"data-direction":n==null?void 0:n.direction,children:[e.name,r&&d.jsx("div",{className:fo.subDirectory,children:o})]}))},vv=e=>{const{pushContent:t,closeAll:n}=na(),r=pe.resources,i=C.useCallback(o=>{if(!r||!t||!n)return;const s=[],l=a=>{e.entity.addComponent(a.component).initiator="user",n()};r.componentGroups.forEach((a,u)=>{s.push(d.jsx(hh,{group:a,onClickAdd:l},u))}),t(d.jsx("div",{className:fo.picker,children:s}))},[t,r,e.entity,n]);return d.jsx("div",{className:fo.compAdd,children:d.jsx(Xn,{onClick:i,children:"Add Component"})})},gv="_cross_nfbq8_45",yv={cross:gv},xv=()=>d.jsx("div",{className:yv.cross,children:d.jsxs("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsx("rect",{x:"5.12",y:"16.832",width:"2.57272",height:"17.6514",transform:"rotate(-135 5.12 16.832)",fill:"#D9D9D9"}),d.jsx("rect",{x:"3.30078",y:"4.35059",width:"2.57272",height:"17.6514",transform:"rotate(-45 3.30078 4.35059)",fill:"#D9D9D9"})]})}),_v="_compoView_xyl36_45",wv="_head_xyl36_52",Av="_name_xyl36_58",Sv="_check_xyl36_62",Cv="_propertyBlock_xyl36_76",hr={compoView:_v,head:wv,name:Av,check:Sv,delete:"_delete_xyl36_66",propertyBlock:Cv},Ev=({component:e})=>{oe(e,"enabled");const t=e.initiator!=="user",n=C.useCallback(i=>{i.stopPropagation();const o=e.entity;o&&o.removeComponentByUUID(e.uuid)},[e]),r=d.jsxs("div",{className:hr.head,children:[d.jsx("div",{className:hr.name,children:e.constructor.name}),d.jsx("div",{className:hr.delete,children:d.jsx("button",{onClick:n,children:d.jsx(xv,{})})})]});return d.jsx("div",{className:hr.compoView,"data-disable_component":t,children:d.jsx("div",{className:hr.content,children:d.jsx($n,{label:r,accordion:!0,bg:!0,defaultClose:!1,children:d.jsx(oh,{target:e})})})})},Pv="_container_18572_1",Tv={container:Pv},Mv=({entity:e})=>{const[t]=oe(e,"components"),n=C.useMemo(()=>{const r=[];return t?(t.forEach(i=>{const o=e.getComponentByUUID(i);o&&r.push(d.jsx(Ev,{component:o},o.uuid))}),r):null},[t,e]);return d.jsx("div",{className:Tv.container,children:n})},Rv="_property_5puun_45",kv="_content_5puun_50",zv="_name_5puun_54",Lv="_component_controls_5puun_60",Nv={property:Rv,content:kv,name:zv,component_controls:Lv},Eu=()=>{const{editor:e,engine:t}=qt(),[n]=oe(e,"selectedEntityId"),r=C.useMemo(()=>{if(n)return t.findEntityByUUID(n)},[t,n]);return r?d.jsxs("div",{className:Nv.container,children:[d.jsx($n,{label:"Fields",accordion:!0,children:d.jsx(oh,{target:r})}),d.jsxs($n,{label:"Components",accordion:!0,children:[d.jsx(Mv,{entity:r}),d.jsx(vv,{entity:r})]})]}):null},dh=C.createContext(null),mh=()=>{const e=C.useContext(dh);if(e===null)throw new Error("useOREngine must be used within a OREngineProvider");return e},Bv="_container_q8d38_45",Pu={container:Bv},Tu=()=>{const{engine:e}=mh(),t=C.useRef(null);return C.useEffect(()=>{const n=e.renderer;let r=[];const i=s=>{r=s};n.on("timer",i);const o=window.setInterval(()=>{if(t.current===null)return;const s=t.current;s.innerHTML="";let l="";const a=r.reduce((f,p)=>f+p.duration,0);l+=`Total: ${(a.toPrecision(3)+"000").slice(0,4)} ms<br/>`;const u=r.sort((f,p)=>f.name<p.name?1:-1);for(let f=0;f<u.length;f++){const p=u[f],m=(p.duration.toPrecision(3)+"000").slice(0,5),v=`rgb(200 ${(1-p.duration)*200} ${(1-p.duration)*200})`;l+=`<span style="color: ${v}">${m}</span> : 		${p.name}<br/>`}s.innerHTML=l},500);return()=>{n.off("timer",i),window.clearInterval(o)}},[e]),d.jsx("div",{className:Pu.container,children:d.jsx("div",{className:Pu.inner,ref:t})})},Dv="_group_vm37a_45",Fv="_submit_vm37a_51",Mu={group:Dv,submit:Fv},Iv=e=>{const t=e.initialValues,n=[],[r,i]=C.useState(t);C.useEffect(()=>{i(t)},[t]);const o=Object.keys(r);for(let l=0;l<o.length;l++){const a=o[l],u=r[a];n.push(d.jsx(mt,{label:a,value:u,onChange:f=>{i({...r,[a]:f})}},l))}const s=C.useRef(null);return C.useEffect(()=>{setTimeout(()=>{var l;s.current&&((l=s.current.querySelector("input"))==null||l.focus())},0)},[]),d.jsx("div",{className:Mu.group,ref:s,children:d.jsxs("form",{onSubmit:l=>{l.preventDefault()},children:[d.jsx($n,{label:e.title,noMargin:!0,children:n}),d.jsx("div",{className:Mu.submit,children:d.jsx(Xn,{type:"submit",onClick:()=>{e.onSubmit&&e.onSubmit(r)},children:"OK"})})]})})},bv="_picker_lpoad_45",jv="_picker_label_lpoad_58",Ov="_picker_list_lpoad_63",Uv="_picker_list_inner_lpoad_68",Vv="_item_lpoad_76",dr={picker:bv,picker_label:jv,picker_list:Ov,picker_list_inner:Uv,item:Vv},Wv=e=>d.jsxs("div",{className:dr.picker,"data-no_bg":e.noBg,children:[e.label&&d.jsx("div",{className:dr.picker_label,children:e.label}),d.jsx("div",{className:dr.picker_list,children:d.jsx("div",{className:dr.picker_list_inner,children:e.list.map((t,n)=>d.jsx("div",{className:dr.item,onClick:t.onClick,children:t.label},n))})})]}),Hv="_node_dzvso_45",Gv="_self_dzvso_54",$v="_self_name_dzvso_65",Xv="_fold_dzvso_76",Yv="_fold_button_dzvso_79",Qv="_child_dzvso_92",Kv="_child_line_dzvso_95",tn={node:Hv,self:Gv,self_name:$v,fold:Xv,fold_button:Yv,child:Qv,child_line:Kv},ph=e=>{const{editor:t,engine:n}=qt(),[r]=oe(t,"selectedEntityId"),i=r!==void 0&&n.findEntityByUUID(r),[o]=oe(e.entity,"children"),s=(o||[]).map(y=>n.findEntityByUUID(y)).filter(y=>y!==void 0),l=e.depth||0,a=s&&s.concat().sort((y,w)=>y.name.localeCompare(w.name))||[],u=a.length>0,f=l*20,p=e.entity.initiator=="script",[m,v]=C.useState(!0),x=C.useCallback(y=>{v(!m),y.stopPropagation()},[m]),_=C.useCallback(()=>{t&&t.selectEntity(e.entity)},[t,e.entity]),{pushContent:E,closeAll:g}=na(),h=C.useCallback(y=>{y.preventDefault(),!(!t||!E||!g||p)&&(t.selectEntity(e.entity),E(d.jsx(Wv,{label:e.entity.name,list:[{label:"Add Entity",onClick:()=>{E(d.jsx(Iv,{initialValues:{name:""},onSubmit:w=>{const A=t.createEntity(e.entity,w.name);t.selectEntity(A),g()}}))}},{label:"Delete Entity",onClick:()=>{t.deleteEntity(e.entity),g()}}]})))},[t,e.entity,E,g,p]);return d.jsxs("div",{className:tn.node,"data-no_export":p,children:[d.jsxs("div",{className:tn.self,style:{paddingLeft:f},onClick:_,onContextMenu:h,"data-selected":i&&i.uuid==e.entity.uuid,children:[d.jsx("div",{className:tn.fold,"data-hnode_open":m,children:u&&d.jsx("button",{className:tn.fold_button,onClick:x,children:d.jsx(ta,{open:m})})}),d.jsx("div",{className:tn.self_name,children:d.jsxs("p",{children:[e.entity.name||"-"," ",d.jsxs("span",{children:["[",e.entity.uuid,"]"]})]})})]}),u&&d.jsxs("div",{className:tn.child,"data-open":m,children:[a.map(y=>d.jsx(ph,{entity:y,depth:l+1},y.uuid)),d.jsx("div",{className:tn.child_line,style:{marginLeft:f+4}})]})]})},qv={},Ru=()=>{const{editor:e}=qt(),t=e.engine._root;return d.jsx("div",{className:qv.hierarchy,children:t&&d.jsx(ph,{entity:t})})},Zv="_container_iunxa_1",Jv="_row_iunxa_11",ct={container:Zv,row:Jv},eg=new R,V=new _e,Te=[];for(let e=0;e<8;e++)Te.push({values:new R,btn1:0,btn2:0,valuesLerped:new R,btn1Lerped:0,btn2Lerped:0});const ae={btn1:0,btn2:0,btn3:0,btn1Lerped:0,btn2Lerped:0,btn3Lerped:0,master:0,masterLerped:0};class N extends Pe{constructor(n){super(n);c(this,"input");c(this,"output");this.input=null,this.output=null;const r=()=>{this._disposed||navigator.requestMIDIAccess().then(s=>{this._disposed||(s.inputs.forEach(l=>{l.name=="MIDI Mix"&&(this.input=l)}),this.input&&(this.input.onmidimessage=this.onMidiMessage.bind(this)),s.outputs.forEach(l=>{l.name=="MIDI Mix"&&(this.output=l)}),this.updateLight())}).catch(s=>{console.error(s)})},i=()=>{this.output&&this.output.close(),this.input&&(this.input.onmidimessage=null,this.input.close())};setTimeout(()=>{r()},100),this.field("reconnect",()=>()=>{i(),r()},void 0,{label:"Reconnect"});const o=(s,l,a)=>{this.onControl(s,l,a)};V.on("emulateControl",o),this.restore(),this.once("dispose",()=>{i(),V.off("emulateControl",o)})}static get lines(){return Te}static get side(){return ae}static getLine(n){return Te[n]}static emulateControl(n,r,i){V.emit("emulateControl",[n,r,i])}static on(n,r){V.on(n,r)}static off(n,r){V.off(n,r)}onControl(n,r,i){if(n==176&&(16<=r&&r<=31||46<=r&&r<=61)){46<=r&&(r-=14);const o=Math.floor((r-16)/4),s=Te[o].values,l=r%4;l==0?s.x=i:l==1?s.y=i:l==2?s.z=i:s.w=i,V.emit("value",[N]),V.emit(`value/${o+1}`,[Te[o]]),V.emit(`value/${o+1}/${l}`,[i])}if(n==176&&r==62&&(ae.master=i,V.emit("value",[N]),V.emit("value/master",[ae.master])),n==144){const o=Math.floor((r-1)/3);if(o<8){const s=Te[o],l=(r+2)%3==0?1:2;l==1?s.btn1=1-s.btn1:l==2&&(s.btn2=1-s.btn2),V.emit("btn",[N]),V.emit(`btn/${o+1}`,[Te[o]]),V.emit(`btn/${o+1}/${l}`,[l==1?s.btn1:s.btn2])}if(o==8){const s=ae;let l=0,a=0;r==25?(s.btn1=1-s.btn1,a=s.btn1,l=1):r==26?(s.btn2=1-s.btn2,a=s.btn2,l=2):r==27&&(s.btn3=1-s.btn3,a=s.btn3,l=3),V.emit("btn",[N]),V.emit("btn/side",[ae]),V.emit(`btn/side/${l}`,[a])}this.updateLight()}this.save()}onMidiMessage(n){if(!n.data)return;const r=n.data[0],i=n.data[1],o=n.data[2]/127;this.onControl(r,i,o)}updateLight(){if(!this.output)return;for(let r=0;r<8;r++){const i=Te[r];this.output.send([144,1+r*3,i.btn1*127]),this.output.send([144,3+r*3,i.btn2*127])}const n=ae;this.output.send([144,25,n.btn1*127])}updateImpl(n){for(let m=0;m<8;m++){const v=Te[m],x=v.values,_=v.valuesLerped;_.add(eg.copy(x).sub(_).multiply(n.timeDelta*4));const E=v.btn1,g=v.btn1Lerped;v.btn1Lerped+=(E-g)*n.timeDelta*4;const h=v.btn2,y=v.btn2Lerped;v.btn2Lerped+=(h-y)*n.timeDelta*4}const r=ae,i=r.master,o=r.masterLerped;r.masterLerped+=(i-o)*n.timeDelta*4;const s=r.btn1,l=r.btn1Lerped;r.btn1Lerped+=(s-l)*n.timeDelta*4;const a=r.btn2,u=r.btn2Lerped;r.btn2Lerped+=(a-u)*n.timeDelta*4;const f=r.btn3,p=r.btn3Lerped;r.btn3Lerped+=(f-p)*n.timeDelta*4}save(){const n={lines:Te.map(r=>[r.values.getElm("vec4"),r.btn1,r.btn2]),side:[ae.btn1,ae.btn2,ae.btn3,ae.master]};localStorage.setItem("MIDIMIX",JSON.stringify(n))}restore(){let n=localStorage.getItem("MIDIMIX");if(n='{"lines":[[[0,1,1,1],1,1],[[0,1,1,0],1,1],[[0,0,0,0],1,1],[[0,1,1,0],1,1],[[0,1,0,0],1,1],[[0,1,1,0],1,1],[[0,0,0,0],1,1],[[0.43000000000000127,0,0,0],1,1]],"side":[1,1,1,0.7400000000000003]}',n){const r=JSON.parse(n);r.lines.forEach((o,s)=>{Te[s].values.setFromArray(o[0]),Te[s].btn1=o[1],Te[s].btn2=o[2],V.emit(`value/${s+1}`,[Te[s]]),V.emit(`value/${s+1}/x`,[o[0][0]]),V.emit(`value/${s+1}/y`,[o[0][1]]),V.emit(`value/${s+1}/z`,[o[0][2]]),V.emit(`value/${s+1}/w`,[o[0][3]]),V.emit(`btn/${s+s}}`,[Te[s]]),V.emit(`btn/${s+s}}/1`,[o.btn1]),V.emit(`btn/${s+s}}/2`,[o.btn2])});const i=r.side;ae.btn1=i[0],ae.btn2=i[1],ae.btn3=i[2],V.emit("btn/side/1",[ae.btn1]),V.emit("btn/side/2",[ae.btn2]),V.emit("btn/side/3",[ae.btn3]),ae.master=i[3],V.emit("value/master",[ae.master]),V.emit("value",[N]),V.emit("btn",[N]),V.emit("btn/side",[ae])}this.updateLight()}}const fe=e=>d.jsx(nh,{checked:e.value>.5,onChange:t=>{N.emulateControl(144,e.id,t?1:0)}}),O=e=>d.jsx(ia,{step:.05,value:e.value,onChange:t=>{N.emulateControl(176,e.id,Math.min(1,Math.max(0,t)))}}),ku=()=>{const[e,t]=Rr.useState(0);return C.useEffect(()=>{const n=()=>{t(r=>r+1)};return N.on("value",n),N.on("btn",n),()=>{N.off("value",n),N.off("btn",n)}},[]),d.jsxs("div",{className:ct.container,children:[d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:16,value:N.getLine(0).values.x}),d.jsx(O,{id:17,value:N.getLine(0).values.y}),d.jsx(O,{id:18,value:N.getLine(0).values.z}),d.jsx(fe,{id:1,value:N.getLine(0).btn1}),d.jsx(fe,{id:2,value:N.getLine(0).btn2}),d.jsx(O,{id:19,value:N.getLine(0).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:20,value:N.getLine(1).values.x}),d.jsx(O,{id:21,value:N.getLine(1).values.y}),d.jsx(O,{id:22,value:N.getLine(1).values.z}),d.jsx(fe,{id:4,value:N.getLine(1).btn1}),d.jsx(fe,{id:5,value:N.getLine(1).btn2}),d.jsx(O,{id:23,value:N.getLine(1).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:24,value:N.getLine(2).values.x}),d.jsx(O,{id:25,value:N.getLine(2).values.y}),d.jsx(O,{id:26,value:N.getLine(2).values.z}),d.jsx(fe,{id:7,value:N.getLine(2).btn1}),d.jsx(fe,{id:8,value:N.getLine(2).btn2}),d.jsx(O,{id:27,value:N.getLine(2).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:28,value:N.getLine(3).values.x}),d.jsx(O,{id:29,value:N.getLine(3).values.y}),d.jsx(O,{id:30,value:N.getLine(3).values.z}),d.jsx(fe,{id:10,value:N.getLine(3).btn1}),d.jsx(fe,{id:11,value:N.getLine(3).btn2}),d.jsx(O,{id:31,value:N.getLine(3).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:46,value:N.getLine(4).values.x}),d.jsx(O,{id:47,value:N.getLine(4).values.y}),d.jsx(O,{id:48,value:N.getLine(4).values.z}),d.jsx(fe,{id:13,value:N.getLine(4).btn1}),d.jsx(fe,{id:14,value:N.getLine(4).btn2}),d.jsx(O,{id:49,value:N.getLine(4).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:50,value:N.getLine(5).values.x}),d.jsx(O,{id:51,value:N.getLine(5).values.y}),d.jsx(O,{id:52,value:N.getLine(5).values.z}),d.jsx(fe,{id:16,value:N.getLine(5).btn1}),d.jsx(fe,{id:17,value:N.getLine(5).btn2}),d.jsx(O,{id:53,value:N.getLine(5).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:54,value:N.getLine(6).values.x}),d.jsx(O,{id:55,value:N.getLine(6).values.y}),d.jsx(O,{id:56,value:N.getLine(6).values.z}),d.jsx(fe,{id:19,value:N.getLine(6).btn1}),d.jsx(fe,{id:20,value:N.getLine(6).btn2}),d.jsx(O,{id:57,value:N.getLine(6).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(O,{id:58,value:N.getLine(7).values.x}),d.jsx(O,{id:59,value:N.getLine(7).values.y}),d.jsx(O,{id:60,value:N.getLine(7).values.z}),d.jsx(fe,{id:22,value:N.getLine(7).btn1}),d.jsx(fe,{id:23,value:N.getLine(7).btn2}),d.jsx(O,{id:61,value:N.getLine(7).values.w})]}),d.jsxs("div",{className:ct.row,children:[d.jsx(fe,{id:25,value:N.side.btn1}),d.jsx(fe,{id:26,value:N.side.btn2}),d.jsx(fe,{id:27,value:N.side.btn3}),d.jsx(O,{id:62,value:N.side.master})]})]})},tg="_project_7nnqy_1",ng="_project_inner_7nnqy_5",rg="_projectSelector_7nnqy_9",ig="_row_7nnqy_13",og="_rowItem_7nnqy_20",as={project:tg,project_inner:ng,projectSelector:rg,row:ig,rowItem:og,export:"_export_7nnqy_30"},zu=()=>{const{editor:e}=qt(),[t,n]=oe(e.engine,"name");return e?d.jsx("div",{className:as.project,children:d.jsx("div",{className:as.project_inner,children:d.jsxs($n,{label:"Project",accordion:!0,children:[d.jsx(it,{title:"Project Name",children:d.jsx(nl,{value:t||"",onChange:r=>{n(r)}})}),d.jsx(Xn,{onClick:()=>{e&&e.save()},children:"Save"}),d.jsx("div",{className:as.export,children:d.jsxs(Xn,{onClick:()=>{e&&(e.save(),window.open("/player","_blank"))},children:["Export & Play ",d.jsx(ta,{})]})})]})})}):null},sg="_container_8wzg2_1",lg={container:sg},ag=()=>{const{engine:e}=qt(),t=C.useRef(null);return C.useEffect(()=>{const n=t.current;if(!e||!n)return;const r=e.canvas;if(!r){console.error("Canvas element not found in engine");return}return n.appendChild(r),()=>{n.contains(r)&&n.removeChild(r)}},[e]),d.jsx("div",{className:lg.container,ref:t,role:"presentation","aria-label":"3D Canvas"})};class ug extends _e{constructor(){super();c(this,"wrapperElm");c(this,"canvas");c(this,"canvasCtx");c(this,"viewRangeFrame");c(this,"viewPort");c(this,"viewPortRange");c(this,"musicBuffer");c(this,"resizeObserver");c(this,"frameSetting");c(this,"framePlay");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];const n=window.localStorage.getItem("audioViweRange");this.viewRangeFrame=n?Number(n):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){const n=new R(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=n.x,this.canvas.height=n.y}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const n=this.musicBuffer.getChannelData(0),r=1,i=this.viewPortRange[0]/this.frameSetting.fps,o=this.musicBuffer.sampleRate*i,s=o/this.canvas.width,l=this.frameToPx(0);this.canvasCtx.beginPath();for(let a=0;a<o;a+=s){const u=Math.floor(a-l*s),f=n[Math.round(u)]*r,p=a/o*this.canvas.width,m=(f+1)*(this.canvas.height/2);let v=m,x=m;for(let E=0;E<16;E++){const h=(n[Math.round(u+s*(E/16))]*r+1)*(this.canvas.height/2);v>h&&(v=h),x<h&&(x=h)}const _=x-v;_>3&&this.canvasCtx.fillRect(p,v,1,_),a==0?this.canvasCtx.moveTo(p,m):this.canvasCtx.lineTo(p,m)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle="#555",this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(n){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=n,this.resizeObserver.observe(n),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(n){this.framePlay=n,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(n){this.viewRangeFrame=n,this.setFramePlaying(this.framePlay),localStorage.setItem("audioViweRange",String(this.viewRangeFrame))}setFrameSetting(n){this.frameSetting=n,this.render()}setMusicBuffer(n){this.musicBuffer=n,this.render()}frameToPx(n){return(n-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}}const cg="_audioView_1iv4u_45",fg={audioView:cg},hg=()=>{const{editor:e}=qt(),t=C.useRef(null),[n,r]=C.useState();C.useEffect(()=>{const m=new ug;if(r(m),t.current)return m.setWrapperElm(t.current),()=>{m.dispose()}},[]);const i=e&&e.audioBuffer,[o,s]=C.useState(),[l,a]=C.useState({duration:0,fps:0}),[u,f]=C.useState({current:0,playing:!1});C.useEffect(()=>{if(!e)return;const m=e.engine,v=g=>{a({duration:g["timeline/duration"],fps:g["timeline/fps"]})};let x=0;const _=()=>{s(x++)},E=g=>{f({...g})};return v(m.serialize()),E(m._frame),m.on("fields/update",v),m.on("update/music",_),m.on("update/frame/play",E),()=>{m.off("update/frame/setting",v),m.off("update/music",_),m.off("update/frame/play",E)}},[e]),C.useEffect(()=>{n&&i&&n.setMusicBuffer(i)},[n,i,o]),C.useEffect(()=>{n&&u&&n.setFramePlaying(u)},[n,u]),C.useEffect(()=>{n&&l&&n.setFrameSetting(l)},[n,l]);const p=C.useCallback(m=>{if(n){const v=m.deltaY>0?1.1:.9;n.setViewRangeFrame(n.viewRangeFrame*v)}m.preventDefault()},[n]);return C.useEffect(()=>{const m=t.current;return m&&m.addEventListener("wheel",p,{passive:!1}),()=>{m&&m.removeEventListener("wheel",p)}},[p]),d.jsx("div",{className:fg.audioView,ref:t})},dg="_screen_18s1v_45",mg="_header_18s1v_53",pg="_header_right_18s1v_68",vg="_header_item_18s1v_74",gg="_content_18s1v_82",yg="_canvas_18s1v_90",xg="_audioView_18s1v_94",_g="_externalBtn_18s1v_103",ft={screen:dg,header:mg,header_right:pg,header_item:vg,content:gg,canvas:yg,audioView:xg,externalBtn:_g},Lu=()=>{const{editor:e}=qt(),[t,n]=oe(e,"enableRender"),[r,i]=oe(e,"viewType"),[o,s]=oe(e,"resolutionScale");return d.jsxs("div",{className:ft.screen,children:[d.jsx("div",{className:ft.header,children:d.jsxs("div",{className:ft.header_right,children:[d.jsx("div",{className:ft.header_item,children:d.jsx(it,{title:"Render",children:d.jsx(mt,{value:t,onChange:l=>{n&&n(l)}})})}),d.jsx("div",{className:ft.header_item,children:d.jsx(it,{title:"View",children:d.jsx(mt,{value:r,format:{type:"select",list:["render","debug"]},onChange:l=>{i&&i(l)}})})}),d.jsx("div",{className:ft.header_item,children:d.jsx(it,{title:"Resolution",children:d.jsx(mt,{value:o,format:{type:"select",list:new Array(6).fill(0).map((l,a)=>{const u=Math.pow(2,a),f=1/u,p=f==1?"1":"1/"+u;return{value:f,label:p}})},onChange:l=>{s&&s(l)}})})}),d.jsx("div",{className:ft.externalBtn,children:d.jsx(Xn,{onClick:()=>{e.openInExternalWindow()},children:d.jsxs("svg",{width:"32",height:"12",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[d.jsxs("g",{clipPath:"url(#clip0_224_2)",children:[d.jsx("path",{d:"M96 0V416H512V0H96ZM472 376H136V40H472V376Z",fill:"#aaa"}),d.jsx("path",{d:"M40 472V296V136V96H0V512H416V472H376H40Z",fill:"#aaa"}),d.jsx("path",{d:"M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z",fill:"#aaa"})]}),d.jsx("defs",{children:d.jsx("clipPath",{id:"clip0_224_2",children:d.jsx("rect",{width:"512",height:"512",fill:"white"})})})]})})})]})}),d.jsxs("div",{className:ft.content,children:[d.jsx("div",{className:ft.canvas,children:d.jsx(ag,{})}),d.jsx("div",{className:ft.audioView,children:d.jsx(hg,{})})]})]})},vh=C.createContext(null),wg=()=>{const{editor:e}=qt(),[t,n]=C.useState({current:0,playing:!1}),[r,i]=C.useState([0,0,100,0]),o=C.useRef([0,0,0,0]);o.current=r;const s=r[2]-r[0];let l=10*Math.pow(2,0+Math.floor(Math.log2(s/100)));l=Math.max(1,Math.floor(l));const a=e==null?void 0:e.audioBuffer,[u,f]=C.useState();C.useEffect(()=>{if(e){const E=e.engine,g=A=>{n({...A})};g(E.frame);let h=0;const y=()=>{f(h++)},w=()=>{E.serialize()};return w(),E.on("update/frame/play",g),E.on("update/music",y),e.on("loadedProject",w),()=>{E.off("update/frame/play",g),E.off("update/music",y),e.off("loadedProject",w)}}},[e]);const p=C.useCallback(E=>{e&&e.engine.seek(E)},[e]),m=C.useCallback(E=>{const g=r[2]-r[0];return Math.floor(r[0]+g*E)},[r]),v=C.useCallback(E=>{const g=o.current,h=(g[2]+g[0])/2,y=(g[0]-h)*E+h,w=(g[2]-h)*E+h;i([y,g[1],w,g[3]])},[]),x=C.useCallback(E=>{const g=o.current,h=E*(g[2]-g[0]);i([g[0]+h,g[1],g[2]+h,g[3]])},[]),_=C.useCallback(E=>{const g=o.current,h=g[2]-g[0];i([E-h/2,g[1],E+h/2,g[3]])},[]);return{glEditor:e,framePlay:t,viewPort:r,viewPortScale:l,musicBuffer:a,musicBufferVersion:u,setCurrentFrame:p,getFrameViewPort:m,zoom:v,scroll:x,setViewPortCenter:_}},Ag="_timeline_e42r4_1",Sg="_inner_e42r4_6",Cg="_content_e42r4_13",Eg="_setting_e42r4_21",_i={timeline:Ag,inner:Sg,content:Cg,setting:Eg},Zn=()=>{const e=C.useContext(vh);if(e===null)throw new Error("useTimeline must be used within a TimelineProvider");return e},Pg="_timelineCanvas_12pgc_45",Tg={timelineCanvas:Pg},Mg=`#include <common>

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

}`;class Rg extends _e{constructor(){super();c(this,"wrapperElm");c(this,"glCanvas");c(this,"gl");c(this,"canvasTexture");c(this,"canvas");c(this,"canvasCtx");c(this,"glRenderer");c(this,"postProcess");c(this,"viewPort");c(this,"viewPortRange");c(this,"viewPortScale");c(this,"frameSetting");c(this,"loopSetting");c(this,"musicBuffer");c(this,"musicTexture");c(this,"resizeObserver");c(this,"canvasSize");this.wrapperElm=null,this.canvas=document.createElement("canvas"),this.canvasCtx=this.canvas.getContext("2d"),this.glCanvas=document.createElement("canvas");const n=new sh(this.glCanvas.getContext("webgl2"));this.gl=n.gl,this.canvasSize=new R(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this)),this.glRenderer=new fh(this.gl),this.canvasTexture=new b(this.gl),this.musicBuffer=null,this.musicTexture=new b(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new gt({passes:[new G(this.gl,{frag:Mg,uniforms:{uCanvasTex:{type:"1i",value:null},uMusicTex:{type:"1i",value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){const n=new R(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.glCanvas.width=this.canvas.width=n.x,this.glCanvas.height=this.canvas.height=n.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(n)}this.render()}render(){if(this.canvasCtx.fillStyle="#000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle="#181818";const r=this.frameToPx(0),i=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(r,0,i-r,this.canvas.height)}const n=(r,i,o)=>{let s=Math.ceil(this.viewPort[0]/r)*r;this.canvasCtx.beginPath();let l=0;for(;s<this.viewPort[2]&&l<100;){const a=this.frameToPx(s+i);this.canvasCtx.moveTo(a,0),this.canvasCtx.lineTo(a,this.canvas.height),s+=r,l++}this.canvasCtx.strokeStyle=o,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(n(this.viewPortScale,0,"#555"),n(this.viewPortScale,this.viewPortScale/2,"#333"),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle="#888",this.canvasCtx.fillStyle="#888";const r=this.musicBuffer.getChannelData(0),i=this.viewPortRange[0]/this.frameSetting.fps,o=this.musicBuffer.sampleRate*i,s=o/this.canvas.width,l=this.frameToPx(0);this.canvasCtx.beginPath();for(let a=0;a<o;a+=s){const u=Math.floor(a-l*s),f=r[Math.round(u)],p=a/o*this.canvas.width,m=(f+1)*(this.canvas.height/2);let v=m,x=m;for(let E=0;E<16;E++){const h=(r[Math.round(u+s*(E/16))]+1)*(this.canvas.height/2);v>h&&(v=h),x<h&&(x=h)}const _=x-v;_>3&&this.canvasCtx.fillRect(p,v,1,_),a==0?this.canvasCtx.moveTo(p,m):this.canvasCtx.lineTo(p,m)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle="#0009";const r=this.frameToPx(this.loopSetting.start),i=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,r,this.canvas.height),this.canvasCtx.fillRect(i,0,this.canvas.width-i,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess._passes&&(this.postProcess._passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(n){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=n,this.resizeObserver.observe(n),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(n,r){this.viewPort=n,this.viewPortRange=[n[2]-n[0],n[3]-n[1]],this.viewPortScale=r,this.render()}setFrameSetting(n){this.frameSetting={duration:Math.round(n.duration),fps:Math.round(n.fps)},this.render()}setMusicBuffer(n){this.musicBuffer=n,setTimeout(()=>{this.render()},100)}setLoopSetting(n,r,i){this.loopSetting={enabled:n,start:r,end:i},this.render()}frameToPx(n){return(n-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}}const kg=()=>{const{viewPort:e,viewPortScale:t,musicBuffer:n,musicBufferVersion:r,glEditor:i}=Zn(),[o,s]=C.useState(),l=C.useRef(null);C.useEffect(()=>{const v=new Rg;return s(v),l.current&&v.setWrapperElm(l.current),()=>{v.dispose()}},[]),C.useEffect(()=>{o&&e&&t&&o.setViewPort(e,t)},[o,e,t]);const[a]=oe(i==null?void 0:i.engine,"timeline/duration"),[u]=oe(i==null?void 0:i.engine,"timeline/fps");C.useEffect(()=>{o&&a&&u&&o.setFrameSetting({duration:a||0,fps:u||0})},[o,a,u]);const[f]=oe(i,"frameLoop/enabled"),[p]=oe(i,"frameLoop/start"),[m]=oe(i,"frameLoop/end");return C.useEffect(()=>{o&&o.setLoopSetting(f||!1,p||0,m||0)},[o,f,p,m]),C.useEffect(()=>{o&&n&&o.setMusicBuffer(n)},[o,n,r]),d.jsx("div",{className:Tg.timelineCanvas,ref:l})},zg="_controls_n8ed2_45",Lg={controls:zg},Ng=e=>{const{viewPort:t,setCurrentFrame:n,getFrameViewPort:r,zoom:i,scroll:o,setViewPortCenter:s}=Zn(),l=C.useRef([0,0,0,0]),a=C.useRef([0,0]);t&&(l.current=t,a.current=[t[2]-t[0],t[3]-t[1]]);const u=C.useRef(null),f=C.useRef(null),p=C.useRef(null),m=C.useRef(null),v=C.useRef(null),x=C.useCallback(g=>{const h=u.current&&u.current.clientWidth||1;if(p.current==0){if(n&&r&&f.current){const y=(g.clientX-f.current.left)/h;n(r(y))}}else if(p.current==1){const y=[g.clientX,g.clientY];if(m.current&&v.current){const w=-(y[0]-m.current[0])/h*a.current[0];s&&s(v.current+w)}}},[n,r,s]),_=C.useCallback(g=>{p.current=g.button,v.current=(l.current[2]+l.current[0])/2,m.current=[g.clientX,g.clientY],f.current=g.currentTarget.getBoundingClientRect();const h=(g.clientX-f.current.left)/g.currentTarget.clientWidth;p.current==0&&n&&r&&n(r(h)),window.addEventListener("pointermove",x);const y=()=>{m.current=null,p.current=null,v.current=null,window.removeEventListener("pointermove",x)};return window.addEventListener("pointerup",y),()=>{window.removeEventListener("pointerup",y),window.removeEventListener("pointermove",x)}},[r,n,x]),E=C.useCallback(g=>{if(p.current!==null||!i||!o)return;g.preventDefault();const h=g.target&&g.target.clientWidth||1,y=Math.abs(g.deltaY);Math.abs(g.deltaX)<y?y>50?i(g.deltaY<0?.9:1.1):i(1+g.deltaY*.005):o(g.deltaX/h*.5)},[i,o]);return C.useEffect(()=>{const g=u.current;return g&&g.addEventListener("wheel",E,{passive:!1}),()=>{g&&g.removeEventListener("wheel",E)}},[E]),t?d.jsx("div",{className:Lg.controls,onPointerDown:_,ref:u,children:e.children}):null},Bg="_cursor_2b6c4_45",Dg="_frame_2b6c4_57",Nu={cursor:Bg,frame:Dg},Fg=()=>{const{viewPort:e,framePlay:t}=Zn();if(!e||!t)return null;const n=e[2]-e[0],r=(t.current-e[0])/n;return d.jsx("div",{className:Nu.cursor,style:{left:r*100+"%"},children:d.jsx("div",{className:Nu.frame})})},Ig="_timelineLoop_ly75p_45",bg="_start_ly75p_54",jg="_end_ly75p_55",wi={timelineLoop:Ig,start:bg,end:jg},Og="_cursor_1r72h_45",Ug={cursor:Og},Bu=({onMove:e})=>{const t=C.useRef(!1);return d.jsx("div",{className:Ug.cursor,onPointerDown:n=>{n.buttons==1&&(t.current=!0,n.stopPropagation())},onPointerMove:n=>{const r=n.target;t.current===!1||n.buttons!=1||(r.setPointerCapture(n.pointerId),n.buttons==1&&e&&e(n.clientX),n.nativeEvent.preventDefault(),n.nativeEvent.stopPropagation())},onPointerUp:()=>{t.current=!1}})},Vg=()=>{const{viewPort:e,framePlay:t,glEditor:n}=Zn(),r=C.useRef(null);ra(n,["frameLoop/enabled","frameLoop/start","frameLoop/end"]);const[i]=oe(n,"frameLoop/enabled"),[o,s]=oe(n,"frameLoop/start"),[l,a]=oe(n,"frameLoop/end");if(i!==!0||!e||!t||o===void 0||l===void 0)return null;const u=e[2]-e[0],f=(o-e[0])/u,p=(l-e[0])/u,m=(v,x)=>{const _=v.getBoundingClientRect();return(x-_.x)/_.width*(e[2]-e[0])+e[0]};return d.jsx("div",{className:wi.timelineLoop,ref:r,children:d.jsxs("div",{className:wi.timelineLoop_inner,children:[d.jsx("div",{className:wi.start,style:{left:f*100+"%"},children:d.jsx(Bu,{onMove:v=>{r.current&&s&&s(m(r.current,v))}})}),d.jsx("div",{className:wi.end,style:{left:p*100+"%"},children:d.jsx(Bu,{onMove:v=>{r.current&&a&&a(m(r.current,v))}})})]})})},Wg="_scale_dsq5l_45",Hg="_scale_inner_dsq5l_53",Gg="_scale_item_dsq5l_58",$g="_scale_item_frame_dsq5l_66",Xg="_scale_item_time_dsq5l_71",mr={scale:Wg,scale_inner:Hg,scale_item:Gg,scale_item_frame:$g,scale_item_time:Xg},Yg=e=>{const t=("00"+Math.floor(e%3600/60)).slice(-2),n=("00"+Math.floor(e%60)).slice(-2);return`${t}:${n}`},Qg=()=>{const{glEditor:e,viewPort:t,viewPortScale:n}=Zn(),[r,i]=oe(e==null?void 0:e.engine,"timeline/fps");if(!t||!n||r===void 0)return null;const o=[];let s=Math.ceil(t[0]/n)*n,l=0;for(;s<t[2]&&l<100;){const a=(s-t[0])/(t[2]-t[0]),u=s/(r||0);o.push(d.jsxs("div",{className:mr.scale_item,style:{left:a*100+"%"},children:[d.jsx("div",{className:mr.scale_item_frame,children:s}),d.jsx("div",{className:mr.scale_item_time,children:Yg(u)})]},s)),s+=n,l++}return d.jsx("div",{className:mr.scale,children:d.jsx("div",{className:mr.scale_inner,children:o})})},Kg="_timelineSetting_178ec_45",qg={timelineSetting:Kg},Zg=()=>{const{framePlay:e,glEditor:t}=Zn(),n=C.useCallback((u,f)=>{f&&f(u)},[]),[r,i]=oe(t,"frameLoop/enabled"),[o,s]=oe(t==null?void 0:t.engine,"timeline/duration"),[l,a]=oe(t==null?void 0:t.engine,"timeline/fps");return d.jsx("div",{className:qg.timelineSetting,children:d.jsxs(be,{children:[d.jsx(it,{title:"current",children:d.jsx(mt,{value:Math.floor((e==null?void 0:e.current)||0),readOnly:!0})}),d.jsx(it,{title:"duration",children:d.jsx(mt,{value:o,onChange:u=>n(u,s)})}),d.jsx(it,{title:"fps",children:d.jsx(mt,{value:l,onChange:u=>n(u,a)})}),d.jsx(it,{title:"loop",children:d.jsx(mt,{value:r||!1,onChange:u=>n(u,i)})})]})})},Du=()=>{const e=wg();return d.jsx(vh.Provider,{value:e,children:d.jsx("div",{className:_i.timeline,children:d.jsxs("div",{className:_i.inner,children:[d.jsx("div",{className:_i.setting,children:d.jsx(Zg,{})}),d.jsxs("div",{className:_i.content,children:[d.jsx(kg,{}),d.jsx(Fg,{}),d.jsx(Ng,{children:d.jsx(Vg,{})}),d.jsx(Qg,{})]})]})})})},Jg=`#include <common>\r
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
}`;class ey extends _e{constructor(n){super();c(this,"_engine");c(this,"_gl");c(this,"_srcFrameBuffer");c(this,"_outFrameBuffer");c(this,"_frameList");c(this,"_enable");c(this,"_resolution");c(this,"_count");c(this,"_total");c(this,"_tile");c(this,"_tilePixelSize");c(this,"_tileInv");c(this,"_focus");c(this,"_uniforms");c(this,"_outPostProcess");c(this,"_elm");c(this,"_labelCanvas");c(this,"_cctx");c(this,"_canvasTexture");this._engine=n,this._gl=n.gl,this._elm=n.canvas,this._srcFrameBuffer=new $(this._gl,{disableDepthBuffer:!0}),this._outFrameBuffer=new $(this._gl,{disableDepthBuffer:!0}).setTexture([new b(this._gl).setting()]),this._enable=!1,this._count=0,this._total=1,this._tile=new R(1,1),this._tilePixelSize=new R(1,1),this._tileInv=new R(1,1),this._focus=null,this._resolution=new R,this._labelCanvas=document.createElement("canvas"),this._cctx=this._labelCanvas.getContext("2d"),this._canvasTexture=new b(this._gl).attach(this._labelCanvas),this._uniforms={uCanvas:{value:this._canvasTexture,type:"1i"}},this._outPostProcess=new gt({passes:[new G(this._gl,{uniforms:this._uniforms,renderTarget:null,frag:Jg,backBufferOverride:this._outFrameBuffer.textures})]}),this._frameList=[];const r=new R(0,0),i=this.onClick.bind(this),o=a=>{r.set(a.clientX,a.clientY)},s=a=>{const u=new R(a.clientX,a.clientY);r.clone().sub(u).length()<10&&i(a)};this._elm.addEventListener("pointerdown",o),this._elm.addEventListener("pointerup",s);const l=a=>{a.key==="Escape"&&(this._focus=null,this.clear()),a.key=="ArrowRight"&&this._focus!==null&&this._focus++,a.key=="ArrowLeft"&&this._focus!==null&&this._focus--};window.addEventListener("keydown",l),this.once("dispose",()=>{this._elm.removeEventListener("pointerdown",o),this._elm.removeEventListener("pointerup",s),window.removeEventListener("keydown",l)})}calcTilePos(n){const r=n%this._tile.x*this._tileInv.x*this._resolution.x,i=Math.floor(n/this._tile.x)*this._tileInv.y*this._resolution.y;return{x:r,y:i}}push(n,r){for(let i=0;i<n.textures.length;i++){if(this._focus==null||this._focus==this._count){const o=n.textures[i],s="currentFace"in n?n.currentFace:this._gl.TEXTURE_2D;this._srcFrameBuffer.setSize(o.size),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER,this._gl.COLOR_ATTACHMENT0,s,o.getTexture(),0),this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,this._srcFrameBuffer.getFrameBuffer()),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,this._outFrameBuffer.getFrameBuffer());let{x:l,y:a}=this.calcTilePos(this._count);const u=this._tilePixelSize.x,f=this._tilePixelSize.y;this._focus!==null&&(l=0,a=0),this._gl.blitFramebuffer(0,0,n.size.x,n.size.y,l,this._resolution.y-a-f,l+u,this._resolution.y-a,this._gl.COLOR_BUFFER_BIT,this._gl.NEAREST),this._srcFrameBuffer.setTexture([]),this._frameList.push({frameBuffer:n,texture:o,label:r?r+(n.textures.length>1?"_"+i:""):""})}this._count++}this._gl.bindFramebuffer(this._gl.READ_FRAMEBUFFER,null),this._gl.bindFramebuffer(this._gl.DRAW_FRAMEBUFFER,null)}draw(){this._cctx.clearRect(0,0,this._resolution.x,this._resolution.y);const n=this._resolution.y/1080;this._cctx.font=`500 ${28*n}px 'Courier New'`,this._cctx.fillStyle="#fff";for(let r=0;r<this._frameList.length;r++){const{x:i,y:o}=this.calcTilePos(r),s=this._frameList[r];this._cctx.fillText(s.label,i+5*n,o+this._tilePixelSize.y-5*n)}this._canvasTexture.attach(this._labelCanvas),this._engine.renderer.renderPostProcess(this._outPostProcess,void 0,this._resolution),this.clear()}clear(){this._total=this._count;const n=Math.sqrt(this._focus!==null?1:this._total);this._tile.set(Math.round(n),Math.ceil(n)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameList=[],this._count=0}reflesh(){this.resize(this._resolution)}resize(n){this._resolution.copy(n),this._outFrameBuffer.setSize(n),this._outPostProcess.resize(n),this._labelCanvas.width=n.x,this._labelCanvas.height=n.y,this._canvasTexture.attach(this._labelCanvas)}onClick(n){if(this._enable){if(this.reflesh(),this._focus===null){const r=new R(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),i=Math.floor(n.offsetX/r.x),o=Math.floor(n.offsetY/r.y);this._focus=i+o*this._tile.x}this.clear()}}set enable(n){this._enable=n,n&&this.reflesh()}get enable(){return this._enable}dispose(){this.emit("dispose")}}class gh extends _e{constructor(){super();c(this,"pressedKeys");this.pressedKeys={};const n=this.onKeyDown.bind(this),r=this.onKeyUp.bind(this);window.addEventListener("keydown",n),window.addEventListener("keyup",r);const i=()=>{window.removeEventListener("keydown",n),window.removeEventListener("keyup",r)};this.once("dispose",i)}onKeyDown(n){this.pressedKeys[n.key]=!0,this.emit("keydown",[n,this.pressedKeys])}onKeyUp(n){if(this.pressedKeys[n.key]=!1,n.key=="Meta"||n.key=="Control"){const r=Object.keys(this.pressedKeys);for(let i=0;i<r.length;i++)this.pressedKeys[r[i]]=!1}this.emit("keyup",[n,this.pressedKeys])}dispose(){this.emit("dispose")}}class Fu extends qn{constructor(n){super();c(this,"_engine");c(this,"_keyBoard");c(this,"_selectedEntityId");c(this,"_audioBuffer");c(this,"_frameLoop");c(this,"_resolutionScale");c(this,"_viewType");c(this,"_frameDebugger");c(this,"_externalWindow");c(this,"_externalCanvasBitmapContext");c(this,"_disposed");this._engine=n,this._viewType="render",this._selectedEntityId=null,this._resolutionScale=1,this._externalWindow=null,this._externalCanvasBitmapContext=null,this._disposed=!1,this._keyBoard=new gh,this._keyBoard.on("keydown",(i,o)=>{(o.Meta||o.Control)&&o.s&&(i.preventDefault(),this.save()),i.key==" "&&(this._engine.frame.playing?this._engine.stop():this._engine.play())}),this._frameDebugger=new ey(n),this.engine.renderer.on("drawPass",(i,o)=>{this._frameDebugger&&this._frameDebugger.enable&&i&&this._frameDebugger.push(i,o)}),this._audioBuffer=null,this._engine.on("update/music",i=>{this._audioBuffer=i}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on("update/blidge/frame",i=>{this._engine.seek(i.current),i.playing&&!this._engine.frame.playing?this._engine.play():!i.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field("enableRender",()=>this._engine.enableRender,i=>this._engine.enableRender=i),this.field("resolutionScale",()=>this._resolutionScale,i=>{this._resolutionScale=Number(i),this.resize()}),this.field("viewType",()=>this._viewType,i=>{this._viewType=i,this._viewType==="debug"?this._frameDebugger.enable=!0:this._frameDebugger.enable=!1});const r=this.fieldDir("frameLoop");r.field("enabled",()=>this._frameLoop.enabled,i=>this._frameLoop.enabled=i),r.field("start",()=>this._frameLoop.start,i=>this._frameLoop.start=i),r.field("end",()=>this._frameLoop.end,i=>this._frameLoop.end=i),this.field("selectedEntityId",()=>this._selectedEntityId,i=>{this._selectedEntityId=i}),this.animate()}get engine(){return this._engine}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}animate(){if(!this._disposed){if(this._engine.update(),this._externalCanvasBitmapContext){const n=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(r=>{n.transferFromImageBitmap(r)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start)),this._frameDebugger&&this._frameDebugger.enable&&this._frameDebugger.draw(),window.requestAnimationFrame(this.animate.bind(this))}}selectEntity(n){this.setField("selectedEntityId",n?n.uuid:null)}createEntity(n,r){const i=new lt;return i.name=r,i.initiator="user",n.add(i),i}deleteEntity(n){n.disposeRecursive();const r=n.parent;r&&r.remove(n)}save(){this.emit("save",[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:"export"})}exportEngine(){return this._engine.serialize({mode:"export"})}openInExternalWindow(){if(this._externalWindow=window.open("","_blank"),!this._externalWindow)return;const n=this._externalWindow.document.createElement("canvas");n.style.width="100%",n.style.height="100%",n.style.objectFit="contain",n.style.cursor="none",this._externalWindow.document.body.style.margin="0",this._externalWindow.document.body.style.background="#000",this._externalWindow.document.body.appendChild(n),this._externalCanvasBitmapContext=n.getContext("bitmaprenderer"),this._externalWindow.addEventListener("unload",()=>{this.closeExternalWindow()}),this.resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}resize(){const n=new R(1920,1080).multiply(this._resolutionScale);this.engine.setSize(n),this._frameDebugger.resize(n),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=n.x,this._externalCanvasBitmapContext.canvas.height=n.y)}dispose(){this._disposed=!0,this._keyBoard.dispose(),this._frameDebugger.dispose()}}const ty=()=>{const{engine:e}=mh(),[t,n]=C.useState(()=>new Fu(e)),r=Rr.useRef(t);return r.current=t,C.useEffect(()=>{if(!r.current.disposed&&r.current.engine.uuid==e.uuid)return;const i=new Fu(e);n(i)},[e]),C.useEffect(()=>()=>{t.dispose()},[t]),{engine:e,editor:t}},ny="_editor_16tun_45",ry="_vert_16tun_51",iy="_horiz_16tun_58",oy="_flex_16tun_62",Ie={editor:ny,vert:ry,horiz:iy,flex:oy},sy=e=>{const t=ty();C.useEffect(()=>{if(!(!t.editor||!e.onSave))return t.editor.on("save",e.onSave),()=>{t.editor.off("save",e.onSave)}},[t.editor,e.onSave]),C.useEffect(()=>{!t.editor||!e.editorData||t.editor.deserialize(e.editorData)},[e.editorData,t.editor]);const n=ap(),r=pp();let i=null;return n.isPC?i=d.jsxs(d.Fragment,{children:[d.jsxs("div",{className:Ie.vert,children:[d.jsxs("div",{className:`${Ie.horiz} ${Ie.flex}`,children:[d.jsxs("div",{className:Ie.vert,style:{width:"300px"},children:[d.jsx("div",{className:Ie.flex,children:d.jsxs(Rt,{children:[d.jsx(be,{title:"Scene",children:d.jsx(Ru,{})}),d.jsx(be,{title:"Project",children:d.jsx(zu,{})})]})}),d.jsx("div",{style:{height:"20vh"},children:d.jsx(Rt,{children:d.jsx(be,{title:"Timer",noPadding:!0,children:d.jsx(Tu,{})})})})]}),d.jsx("div",{className:`${Ie.flex}`,children:d.jsx(Lu,{})}),d.jsx("div",{style:{width:"300px"},children:d.jsx(Rt,{children:d.jsx(be,{title:"Property",children:d.jsx(Eu,{})})})})]}),d.jsx("div",{style:{height:"160px"},children:d.jsxs(Rt,{children:[d.jsx(be,{title:"Timeline",noPadding:!0,children:d.jsx(Du,{})}),d.jsx(be,{title:"MIDIMIXEmu",children:d.jsx(ku,{})})]})})]}),d.jsx(yu,{})]}):i=d.jsxs("div",{className:Ie.editor,children:[d.jsxs("div",{className:Ie.vert,children:[d.jsx("div",{className:`${Ie.flex}`,children:d.jsx(Lu,{})}),d.jsxs("div",{className:Ie.horiz,style:{height:"55vh"},children:[d.jsxs("div",{className:Ie.vert,style:{width:"45vw"},children:[d.jsx("div",{style:{flex:"1"},children:d.jsxs(Rt,{children:[d.jsx(be,{title:"Scene",children:d.jsx(Ru,{})}),d.jsx(be,{title:"Project",children:d.jsx(zu,{})})]})}),d.jsx("div",{style:{height:"15vh"},children:d.jsx(Rt,{children:d.jsx(be,{title:"Timer",noPadding:!0,children:d.jsx(Tu,{})})})})]}),d.jsx("div",{className:`${Ie.flex}`,children:d.jsx(Rt,{children:d.jsx(be,{title:"Property",children:d.jsx(Eu,{})})})})]}),d.jsx("div",{style:{height:"15vh"},children:d.jsxs(Rt,{children:[d.jsx(be,{title:"Timeline",noPadding:!0,children:d.jsx(sp,{fallback:d.jsx("div",{children:"エラーだよ"}),children:d.jsx(Du,{})})}),d.jsx(be,{title:"MIDIMIXEmu",children:d.jsx(ku,{})})]})})]}),d.jsx(yu,{})]}),d.jsx(eh.Provider,{value:t,children:d.jsx(Jf.Provider,{value:r,children:d.jsx("div",{className:Ie.editor,children:i})})})},ly=e=>{const[t,n]=Rr.useState(()=>new pe(e)),r=Rr.useRef(t);r.current=t,C.useEffect(()=>{if(!r.current.disposed)return;const o=new pe(e);n(o)},[e]),C.useEffect(()=>()=>{t.dispose()},[t]);const i=C.useCallback(o=>{t.load(o)},[t]);return{engine:t,load:i}},ay=e=>{const t=ly(e.gl),{engine:n}=t;return C.useEffect(()=>{n.setSize(new R(1920,1080))},[n]),C.useEffect(()=>{e.project?n.load(e.project):n.init()},[n,e.project]),d.jsx(dh.Provider,{value:t,children:e.children})},uy="draw(Tokyo);",cy=[0,0,0],fy=[0,0,0],hy=[1,1,1],dy={name:"root"},my=[{path:"/root",components:[{name:"BLidgeClient",props:{mode:"json",gltf:!0,gltfPath:"/scene.glb","websocket/url":"ws://localhost:3100"}},{name:"UniformControls"},{name:"TextureGenerator"}]},{path:"/root/blidgeRoot/Camera",components:[{name:"ShakeViewer",props:{power:.15,speed:1}},{name:"PostProcessPipeline",props:{postprocess:[!0,!0,!0,!0]}},{name:"MainCamera"}]},{path:"/root/blidgeRoot/OREngine",components:[{name:"OREngineLogoMaterial"}]},{path:"/root/blidgeRoot/OREngineCube",components:[{name:"OREngineCubeMaterial"},{name:"ObjectRotate"}]},{path:"/root/blidgeRoot/SkyBox",components:[{name:"SkyBox"}]}],py={name:uy,position:cy,euler:fy,scale:hy,scene:dy,overrides:my,"timeline/duration":600,"timeline/fps":60},vy=document.createElement("canvas"),J=vy.getContext("webgl2",{antialias:!1}),gy=new sh(J),rt={time:{uTime:{value:0,type:"1f"},uTimeF:{value:0,type:"1f"},uTimeE:{value:0,type:"1f"},uTimeEF:{value:0,type:"1f"}},resolution:{uAspectRatio:{value:1,type:"1f"},uResolution:{value:new R,type:"2f"}},camera:{projectionMatrix:{value:new W,type:"Matrix4fv"},viewMatrix:{value:new W,type:"Matrix4fv"}},gBuffer:{uGBufferPos:{value:null,type:"1i"},uGBufferNormal:{value:null,type:"1i"}},tex:{},music:{uMusicFreqTex:{value:null,type:"1i"},uMusicDomainTex:{value:null,type:"1i"}}};class Ai extends b{constructor(n,r){const i=n.gl;super(i);c(this,"material");c(this,"renderer");c(this,"resolution");c(this,"postProcess");c(this,"frameBuffer");this.renderer=n,this.resolution=r.resolution||new R(1024,1024),this.setting({wrapS:i.REPEAT,wrapT:i.REPEAT,magFilter:i.LINEAR,minFilter:i.LINEAR}),this.frameBuffer=new $(i).setTexture([this]).setSize(this.resolution),this.material=new G(i,{...r,renderTarget:this.frameBuffer}),this.postProcess=new gt({pipeline:new la({entity:new lt}),passes:[this.material]}),this.render()}render(){this.renderer.renderPostProcess(this.postProcess,void 0,this.resolution)}}class yy extends _e{constructor(){super();c(this,"isTouching");c(this,"element",null);c(this,"position");c(this,"delta");this.position=new R(NaN,NaN),this.delta=new R(NaN,NaN),this.isTouching=!1;const n=this.onPointer.bind(this,"move"),r=this.onPointer.bind(this,"end");window.addEventListener("pointermove",n),window.addEventListener("pointerup",r),window.addEventListener("dragend",r);const i=()=>{this.element&&this.removeElement(this.element),window.removeEventListener("pointermove",n),window.removeEventListener("pointerup",r),window.removeEventListener("dragend",r),this.off("dispose",i)};this.on("dispose",i)}setElement(n){this.element&&this.removeElement(this.element),this.element=n;const r=this.onPointer.bind(this,"start");n.addEventListener("pointerdown",r);const i=o=>{n.isEqualNode(o.elm)&&(n.removeEventListener("pointerdown",r),this.off("unregister",i))};this.on("unregister",i)}removeElement(n){this.emit("unregister",[n])}getScreenPosition(n){if(this.position.x!=this.position.x)return new R(NaN,NaN);const r=this.position.clone().divide(n).multiply(2).sub(1);return r.y*=-1,r}getRelativePosition(n,r){const i=n.getClientRects()[0];let o=this.position.x-i.left,s=this.position.y-i.top;return r&&(o/=i.width,s/=i.height),new R(o,s)}setPos(n,r){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(n-this.position.x,r-this.position.y),this.position.set(n,r)}onPointer(n,r){const i=r.pointerType;i!=null?i=="mouse"&&(r.button==-1||r.button==0)&&this.touchEventHandler(r.pageX,r.pageY,n,r):this.touchEventHandler(r.pageX,r.pageY,n,r)}touchEventHandler(n,r,i,o){let s=!1;const l=n-window.pageXOffset,a=r-window.pageYOffset;i=="start"?(this.isTouching=!0,this.setPos(l,a),this.delta.set(0,0),s=!0):i=="move"?(this.setPos(l,a),this.isTouching&&(s=!0)):i=="end"&&("targetTouches"in o?o.targetTouches.length==0&&(this.isTouching=!1):this.isTouching=!1,s=!0),s&&this.emit(i,[{pointerEvent:o,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit("dispose")}}class yh extends Pe{constructor(n){super(n);c(this,"shakePower");c(this,"shakeSpeed");c(this,"shakeMatrix");c(this,"shakeQua");c(this,"cameraComponent");this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new W,this.shakeQua=new gn,this.order=1e3,this.field("power",()=>this.shakePower,r=>this.shakePower=r),this.field("speed",()=>this.shakeSpeed,r=>this.shakeSpeed=r)}updateImpl(n){let r=.008*this.shakePower;this.cameraComponent&&(r*=this.cameraComponent.fov/50);const i=n.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(i*2)*r,y:Math.sin(i*2.5)*r,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.entity.matrixWorld.multiply(this.shakeMatrix);const o=this.entity.getComponentsByTag("camera")[0];o&&o.viewMatrix.copy(this.entity.matrixWorld).inverse()}}class aa extends Pe{constructor(n){super(n);c(this,"target");c(this,"up");c(this,"entityWorldPos");c(this,"targetWorldPos");this.target=null,this.entityWorldPos=new R,this.targetWorldPos=new R,this.up=new R(0,1,0),this.order=9999}setTarget(n){this.target=n}beforeRenderImpl(n){if(this.target&&this._enabled){this.entity.matrixWorld.decompose(this.entityWorldPos),this.target.matrixWorld.decompose(this.targetWorldPos),this.entity.matrixWorld.lookAt(this.entityWorldPos,this.targetWorldPos,this.up);const r=this.entity.getComponentsByTag("camera")[0];r&&r.viewMatrix.copy(this.entity.matrixWorld).inverse()}}}class xy extends Pe{constructor(n){super(n);c(this,"keyborad_");c(this,"_pointer");c(this,"orbit_");c(this,"mouseVelOrbit_");c(this,"mouseVelMove_");c(this,"eye_");c(this,"target_");c(this,"up_");c(this,"lookatMatrix_");c(this,"distance_");c(this,"distanceVel_");c(this,"_memPos");c(this,"_memTarget");c(this,"elmDisposer");this._pointer=new yy,this.keyborad_=new gh,this.orbit_=new R,this.mouseVelOrbit_=new R,this.mouseVelMove_=new R,this.target_=new R,this.eye_=new R,this.up_=new R(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new W,this._memPos=new R,this._memTarget=new R,this.order=999;let r=!1;const i=l=>{r||(r=!0)},o=l=>{if(!r)return;const a={x:l.delta.x*1,y:l.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(a):this.mouseVelOrbit_.add(a),l.pointerEvent.preventDefault(),l.pointerEvent.stopPropagation()},s=l=>{r&&(r=!1)};this._pointer.on("move",o),this._pointer.on("start",i),this._pointer.on("end",s),this.once("dispose",()=>{this._pointer.off("move",o),this._pointer.off("start",i),this._pointer.off("end",s)}),this.setPosition(this.entity.position,this.target_)}set enabled(n){if(this._enabled=n,n){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);const r=this.entity.getComponent(aa);r&&r.target&&this.setPosition(this.entity.position,r.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}setElm(n){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(n);const r=i=>{i.preventDefault(),this.distanceVel_+=i.deltaY};n.addEventListener("wheel",r),this.elmDisposer=()=>{n.removeEventListener("wheel",r)}}calc(n){const r=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new W().makeRotationAxis({x:1,y:0,z:0},Math.min(r,Math.max(-r,this.orbit_.x)))),this.eye_.applyMatrix3(new W().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(n.position,n.quaternion,n.scale)}updateImpl(n){const r=new R(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);r.applyMatrix3(this.entity.matrix),this.target_.add(r),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);const i=Math.max(0,1-n.timeDelta*10);this.mouseVelOrbit_.multiply(i),this.mouseVelMove_.multiply(i),this.distanceVel_*=i,this.calc(this.entity)}setPosition(n,r){if(this.eye_.copy(n),this.target_.copy(r),this.entity){const i=this.entity.parent;i&&(i.updateMatrix(!0),this.target_.applyMatrix4(i.matrixWorld.clone().inverse()))}this.orbit_.x=Math.atan2(this.eye_.y-this.target_.y,new R(this.eye_.x,this.eye_.z).length()-new R(this.target_.x,this.target_.z).length()),this.orbit_.y=-Math.atan2(this.eye_.x-this.target_.x,this.eye_.z-this.target_.z),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0)}dispose(){super.dispose(),this._pointer.dispose()}}const _y=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

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
  
}`,wy=`uniform sampler2D uSrcTexture1;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uSrcTexture1, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`,Ay=`#include <common>

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

}`;class Sy extends gt{constructor(t){const r=[],i=[];for(let f=0;f<4;f++)r.push(new $(J).setTexture([new b(J).setting({magFilter:J.LINEAR,minFilter:J.LINEAR})])),i.push(new $(J).setTexture([new b(J).setting({magFilter:J.LINEAR,minFilter:J.LINEAR})]));let o=2;const s=new G(J,{name:"bloom/bright/",frag:wy,passThrough:!0,uniforms:{uSrcTexture1:{value:t,type:"1i"},uThreshold:{value:1.8,type:"1f"},uBrightness:{value:1,type:"1f"}},resolutionRatio:1/o}),l=[];let a=s.renderTarget.textures;for(let f=0;f<4;f++){const p=r[f],m=i[f],v=8,x={name:"bloom/blur/"+f+"/v",renderTarget:p,frag:_y,uniforms:{uBackBlurTex:{value:a,type:"1i"},uIsVertical:{type:"1i",value:!0},uWeights:{type:"1fv",value:uo.gaussWeights(v)},uBlurRange:{value:2,type:"1f"}},defines:{GAUSS_WEIGHTS:v.toString(),USE_BACKBLURTEX:""},passThrough:!0,resolutionRatio:1/o};l.push(new G(J,x)),l.push(new G(J,{...x,name:"bloom/blur/"+f+"/h",renderTarget:m,uniforms:{...x.uniforms,uBackBlurTex:{value:p.textures[0],type:"1i"},uIsVertical:{type:"1i",value:!1}}})),a=m.textures,o*=2}const u=new G(J,{name:"bloom/composite/",frag:Ay,uniforms:{uBloomTexture:{value:i.map(f=>f.textures[0]),type:"1iv"}}});super({name:"Bloom",passes:[s,...l,u]})}get threshold(){return this.passes[0].uniforms.uThreshold.value}set threshold(t){this.passes[0].uniforms.uThreshold.value=t}get brightness(){return this.passes[0].uniforms.uBrightness.value}set brightness(t){this.passes[0].uniforms.uBrightness.value=t}}const Cy=`#include <common>\r
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
}`;class Ey extends gt{constructor(){super({name:"ColorGrading",passes:[new G(J,{frag:Cy})]})}}const Py=`#include <common>\r
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
}`;class Ty extends gt{constructor(){super({name:"Finalize",passes:[new G(J,{frag:Py})]})}}const My=`uniform sampler2D uBackBuffer0;\r
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
}`;class Ry extends gt{constructor(){super({name:"FXAA",passes:[new G(J,{name:"fxaa",frag:My})]})}}const xh=new _e;new Promise(e=>{xh.once("createdCamera",t=>{e(t)})});class ky extends Pe{constructor(n){super(n);c(this,"renderCamera");c(this,"_commonUniforms");c(this,"_renderTarget");c(this,"_lookAt");c(this,"_orbitControls");c(this,"postProcessPipeline");c(this,"_resolution");c(this,"_resolutionInv");c(this,"_tmpVector1");c(this,"_tmpVector2");c(this,"_dofTarget");this._resolution=new R,this._resolutionInv=new R,this._commonUniforms=ue.merge({uResolution:{type:"2f",value:this._resolution},uResolutionInv:{type:"2f",value:this._resolutionInv}}),this.renderCamera=this.entity.addComponent(ol,{gl:J}),this._renderTarget=this.renderCamera.renderTarget,this._lookAt=this.entity.addComponent(aa),this.entity.addComponent(yh),xh.emit("createdCamera",[this.renderCamera]),this.postProcessPipeline=this.entity.addComponent(la),this.postProcessPipeline.add(new Ry);const r=this.postProcessPipeline.add(new Sy(this.renderCamera.renderTarget.shadingBuffer.textures[0]));r.threshold=1,r.brightness=1,this.postProcessPipeline.add(new Ey),this.postProcessPipeline.add(new Ty),this._dofTarget=null,this._tmpVector1=new R,this._tmpVector2=new R;const i=l=>{const a=l.findEntityByName("Camera")||null,u=a==null?void 0:a.getComponent(co),f=this.entity.getComponent(co);u&&f&&(u.transformAutoUpdate=f.transformAutoUpdate);const p=l.findEntityByName("CamLook")||null;this._lookAt.setTarget(p),this._dofTarget=l.findEntityByName("CamDof")||null};this.entity.on("sceneCreated",i),this.once("dispose",()=>{this.entity.off("sceneCreated",i)}),rt.gBuffer.uGBufferPos.value=this.renderCamera.gBuffer.textures[0],rt.gBuffer.uGBufferNormal.value=this.renderCamera.gBuffer.textures[1];const o=this.entity.getRootEntity(),s=o.findEntityByName("CamLook")||null;this._lookAt.setTarget(s),this._dofTarget=o.findEntityByName("CamDof")||null}updateImpl(n){this.resize(n.resolution),this.updateCameraParams(),this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget&&this._dofTarget.matrixWorld.decompose(this._tmpVector2),this.renderCamera.dofParams.focusDistance=this._tmpVector1.sub(this._tmpVector2).length()}resize(n){n.x==this._resolution.x&&n.y==this._resolution.y||(this._resolution.copy(n),this._resolutionInv.set(1/n.x,1/n.y,0,0),this.renderCamera.resize(this._resolution),this.postProcessPipeline.resize(n),this.updateCameraParams())}updateCameraParams(){this.renderCamera.aspect=this._resolution.x/this._resolution.y,this.renderCamera.needsUpdateProjectionMatrix=!0}}const zy=`#version 300 es\r
void main( void ) {}\r
`,Ly=`#include <common>\r
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
}`,_h=85,Si=60*(8*2/_h);class Ny extends Pe{constructor(n){super(n);c(this,"power");c(this,"gl");c(this,"isAudioBufferReady",!1);c(this,"audioContext");c(this,"audioBuffer");c(this,"implusBuffer");c(this,"audioSrcNode");c(this,"convolverNode");c(this,"gainNode");c(this,"bufferLength");c(this,"blockLength");c(this,"numSampleBlocks");c(this,"bufferIn");c(this,"bufferL");c(this,"bufferR");c(this,"tmpOutputArrayL");c(this,"tmpOutputArrayR");c(this,"progress");c(this,"timeCode",0);c(this,"playStartTime",-1);c(this,"forcePlay",!1);c(this,"realtimeAnalyzer");c(this,"realtimeDataSize");c(this,"timeDomainArray");c(this,"timeDomainTexture");c(this,"frequencyArray");c(this,"frequencyTexture");c(this,"currentRender");this.power=gy,this.gl=this.power.gl,this.audioSrcNode=null,this.audioContext=new AudioContext,this.bufferLength=Math.floor(this.audioContext.sampleRate*Si),this.progress=[0,0],this.blockLength=Math.min(512*512,this.bufferLength),this.numSampleBlocks=Math.ceil(this.audioContext.sampleRate*Si/this.blockLength),this.tmpOutputArrayL=new Float32Array(this.blockLength),this.tmpOutputArrayR=new Float32Array(this.blockLength),this.audioBuffer=this.audioContext.createBuffer(2,this.bufferLength,this.audioContext.sampleRate),this.bufferIn=new Ii(this.gl),this.bufferIn.setData(new Float32Array(new Array(this.blockLength).fill(0).map((r,i)=>i)),"vbo"),this.bufferL=new Ii(this.gl),this.bufferL.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.bufferR=new Ii(this.gl),this.bufferR.setData(new Float32Array(this.bufferLength),"vbo",this.gl.DYNAMIC_COPY),this.currentRender=this.render(),this.implusBuffer=this.audioContext.createBuffer(2,this.audioContext.sampleRate*1.5,this.audioContext.sampleRate);for(let r=0;r<this.implusBuffer.length;r++){const i=r/this.implusBuffer.length;this.implusBuffer.getChannelData(0)[r]=(Math.random()*2-1)*.9*Math.exp(-i*5),this.implusBuffer.getChannelData(1)[r]=(Math.random()*2-1)*.9*Math.exp(-i*5)}this.convolverNode=this.audioContext.createConvolver(),this.convolverNode.buffer=this.implusBuffer,this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=1.3,this.realtimeDataSize=2048,this.realtimeAnalyzer=this.audioContext.createAnalyser(),this.realtimeAnalyzer.fftSize=this.realtimeDataSize,this.timeDomainArray=new Uint8Array(this.realtimeAnalyzer.fftSize),this.timeDomainTexture=new b(this.gl),this.timeDomainTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.frequencyArray=new Uint8Array(this.realtimeAnalyzer.frequencyBinCount),this.frequencyTexture=new b(this.gl),this.frequencyTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}static get key(){return"music"}render(){this.progress=[0,0],this.currentRender&&this.currentRender.stop(),this.stop(),this.isAudioBufferReady=!1;const n=new lh(this.gl),r=new Qp(this.gl);r.setBuffer("left",this.bufferL,0),r.setBuffer("right",this.bufferR,1),r.bind(()=>{n.setShader(sl(Qe("music",Ly)),zy,{transformFeedbackVaryings:["o_left","o_right"]})}),n.setUniform("uDuration","1f",[Si]),n.setUniform("uBPM","1f",[_h]),n.setUniform("uSampleRate","1f",[this.audioContext.sampleRate]);const i=n.getVAO();let o=!0;const s=()=>{o=!1};if(i){i.setAttribute("aTime",this.bufferIn,1);const l=Math.floor(this.timeCode/(this.bufferLength/this.audioBuffer.sampleRate/this.numSampleBlocks));(async()=>{for(let u=0;u<this.numSampleBlocks;u++){let f;if(u%2===0?f=l+Math.floor(u/2):f=l-Math.ceil(u/2),f>=this.numSampleBlocks?f=f-this.numSampleBlocks:f<0&&(f=f+this.numSampleBlocks),await new Promise(p=>{setTimeout(()=>{this.isAudioBufferReady=!0,p(null)},100)}),!o)return;n.setUniform("uTimeOffset","1f",[this.blockLength*f/this.audioContext.sampleRate]),n.use(()=>{n.uploadUniforms(),r.use(()=>{this.gl.beginTransformFeedback(this.gl.POINTS),this.gl.enable(this.gl.RASTERIZER_DISCARD),i.use(()=>{this.gl.drawArrays(this.gl.POINTS,0,i.vertCount)}),this.gl.disable(this.gl.RASTERIZER_DISCARD),this.gl.endTransformFeedback()}),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferL.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayL),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.bufferR.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,this.tmpOutputArrayR),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);for(let p=0;p<this.blockLength;p++){const m=f*this.blockLength+p,v=m<Si*this.audioContext.sampleRate?1:0;this.audioBuffer.getChannelData(0)[m]=this.tmpOutputArrayL[p]*v,this.audioBuffer.getChannelData(1)[m]=this.tmpOutputArrayR[p]*v}}),this.progress=[u,this.numSampleBlocks-1],this.notice()}this._entity&&this._entity.noticeEventParent("update/music/complete",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture])})()}return{stop:s}}updateImpl(n){if(this.timeCode=n.timeCode,!n.playing||n.timeCode<0){this.stop();return}this.play(n.timeCode,this.forcePlay),this.forcePlay=!1,this.realtimeAnalyzer.getByteTimeDomainData(this.timeDomainArray),this.timeDomainTexture.attach({width:this.realtimeDataSize,height:1,data:this.timeDomainArray}),this.realtimeAnalyzer.getByteFrequencyData(this.frequencyArray),this.frequencyTexture.attach({width:this.realtimeAnalyzer.frequencyBinCount,height:1,data:this.frequencyArray})}setEntityImpl(n){this.notice()}unsetEntityImpl(n){this.stop()}notice(){setTimeout(()=>{this._entity&&this._entity.noticeEventParent("update/music",[this.audioBuffer,this.frequencyTexture,this.timeDomainTexture,this.progress])},0)}play(n=0,r){this.audioSrcNode&&!r&&Math.abs(this.audioSrcNode.context.currentTime-this.playStartTime-n)<.1||(this.stop(),this.isAudioBufferReady&&(this.audioSrcNode=this.audioContext.createBufferSource(),this.audioSrcNode.buffer=this.audioBuffer,this.audioSrcNode.loop=!1,this.audioSrcNode.start(0,n),this.playStartTime=this.audioSrcNode.context.currentTime-(n||0),this.audioSrcNode.connect(this.gainNode),this.audioSrcNode.connect(this.convolverNode),this.convolverNode.connect(this.gainNode),this.gainNode.connect(this.audioContext.destination),this.gainNode.connect(this.realtimeAnalyzer)))}stop(){this.audioSrcNode&&(this.audioSrcNode.stop(),this.audioSrcNode.disconnect(this.gainNode),this.audioSrcNode=null),this.convolverNode&&this.convolverNode.disconnect()}dispose(){super.dispose(),this.stop(),this.frequencyTexture.dispose(),this.timeDomainTexture.dispose()}}const By=`#include <common>
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

}`,Dy=`#include <common>
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
	
}`;class Fy extends ch{constructor(t){const n=new Xt({frag:Qe("orengineCubeFrag",By),vert:Qe("orengineCubeVert",Dy),uniforms:ue.merge(rt.time,{uNoiseTex:{value:pe.resources.getTexture("noise"),type:"1i"}})});super({...t,args:n})}}const Iy=`#include <common>
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

}`,by=`#include <common>
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
	
}`;class jy extends ch{constructor(t){const n=new Xt({frag:Qe("OREngineLogoMaterialFrag",Iy),vert:Qe("OREngineLogoMaterialVert",by),uniforms:rt.time,phase:["deferred","shadowMap"]});super({...t,args:n})}}const Oy=`#include <common>\r
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
} `;class Uy extends Pe{constructor(t){super(t);const n=this._entity.addComponent(Ge);n.geometry=new uh({radius:50,widthSegments:32,heightSegments:32}),n.material=new Xt({phase:["deferred","envMap"],frag:Qe("skybox",Oy),cullFace:!1,uniforms:ue.merge(rt.time,rt.music)})}}class Vy extends Pe{constructor(n){super(n);c(this,"speed");c(this,"rotQuaternion");this.speed=1,this.rotQuaternion=new gn}updateImpl(n){this.rotQuaternion.setFromEuler(new oa(0,-.4*n.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}}const Wy=`#include <common>\r
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
} `,Hy=`#include <common>\r
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
} `,Iu=`#include <common>\r
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
} `;class Gy extends Pe{constructor(n){super(n);c(this,"updateTextures");this.updateTextures=[];const i=pe.getInstance(J).renderer;pe.resources.addTexture("noise",new Ai(i,{frag:Hy,resolution:new R(1024,1024)})),pe.resources.addTexture("noiseCyclic",new Ai(i,{frag:Iu,resolution:new R(1024,1024)}));const o=new Ai(i,{frag:Wy,resolution:new R(512,512)});o.setting({magFilter:J.NEAREST,minFilter:J.NEAREST}),o.render(),pe.resources.addTexture("hash",o),this.updateTextures.push(pe.resources.addTexture("noiseCyclic_anime",new Ai(i,{frag:Iu,uniforms:pe.getInstance(J).uniforms,resolution:new R(512,512)}))),this.once("dispose",()=>{this.updateTextures.forEach(s=>{s.dispose()}),this.updateTextures=[]})}updateImpl(n){for(let r=0;r<this.updateTextures.length;r++)this.updateTextures[r].render()}}const $y=[[{axis:"x",k:[["B",[0,.039,-1,.039,1,.039]]]},{axis:"z",k:[["B",[0,8.832,-1,8.832,1,8.832]]]},{axis:"y",k:[["B",[0,1.525,-1,1.525,1,1.525]]]}],[{axis:"x",k:[["B",[0,-1.935,-25,-1.935,25,-1.935]],["B",[75,2.449,50,2.449,100,2.449]],["B",[150,-2,125,-2,175,-2]],["B",[225,2.207,200,2.207,250,2.207]],["B",[300,-1.935,275,-1.935,325,-1.935]]]},{axis:"z",k:[["B",[0,-1.031,-25,-1.031,25,-1.031]],["B",[75,-.957,50,-.984,100,-.931]],["B",[150,-.925,125,-.925,175,-.925]],["B",[225,-1.056,200,-1.056,250,-1.056]],["B",[300,-1.031,275,-1.031,325,-1.031]]]},{axis:"y",k:[["B",[0,1.875,-25,1.875,25,1.875]],["B",[75,.256,50,.474,100,.037]],["B",[150,.037,125,.037,175,.037]],["B",[225,1.984,200,1.984,250,1.984]],["B",[300,1.875,275,1.875,325,1.875]]]}]],Xy={name:"root",parent:null,children:[{name:"CamDof",class:"",type:"empty",parent:"root",position:[0,1,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Camera",class:"",type:"camera",parent:"root",position:[.039,1.525,8.832],rotation:[1.571,0,0],scale:[1,1,1],visible:!0,param:{fov:21.908},animation:{position:0}},{name:"CamLook",class:"",type:"empty",parent:"root",position:[0,1.017,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{},animation:{}},{name:"Cube.001",class:"",type:"mesh",parent:"root",position:[-1.299,1.669,-1.024],rotation:[0,0,-0],scale:[.238,.238,.238],visible:!0,param:{position:"AACAvwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIA/AACAvwAAgL8AAIA/AACAPwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIA/AACAPwAAgD8AAIA/",normal:"AACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAACAvwAAAAAAAAAAAAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AAAAAAAAAAAAAIC/AACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAAAAAAIA/AAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgL8AAACAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAAAAAAAAAAgD8AAAAA",uv:"AADAPgAAAAAAACA/AAAAAAAAID8AAIA+AADAPgAAgD4AAMA+AACAPgAAID8AAIA+AAAgPwAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAAD8AACA/AABAPwAAwD4AAEA/AADAPgAAQD8AACA/AABAPwAAID8AAIA/AADAPgAAgD8AAAA+AAAAPwAAwD4AAAA/AADAPgAAQD8AAAA+AABAPwAAID8AAAA/AABgPwAAAD8AAGA/AABAPwAAID8AAEA/",index:"AAABAAIAAAACAAMABAAFAAYABAAGAAcACAAJAAoACAAKAAsADAANAA4ADAAOAA8AEAARABIAEAASABMAFAAVABYAFAAWABcA"},animation:{position:1}},{name:"OREngine",class:"",type:"gltf",parent:"root",position:[0,1.063,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"OREngineCube",class:"",type:"cube",parent:"root",position:[0,.96,-3.209],rotation:[.166,.754,.158],scale:[2.3,2.3,2.3],visible:!0,param:{x:1,y:1,z:1}},{name:"SkyBox",class:"",type:"empty",parent:"root",position:[0,0,-0],rotation:[0,0,-0],scale:[1,1,1],visible:!0,param:{}},{name:"Spot.001",class:"",type:"light",parent:"root",position:[7.6,7.343,4.754],rotation:[.814,.6,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:3,type:"spot",angle:.611,blend:1}},{name:"Spot.002",class:"",type:"light",parent:"root",position:[-13.676,-15.599,-.377],rotation:[1.02,-1.854,-.478],scale:[1.248,1.248,1.248],visible:!0,param:{shadowMap:!0,color:{x:1,y:1,z:1},intensity:2,type:"spot",angle:.691,blend:1}}],type:"empty",visible:!0},Yy={start:1,end:300,fps:30,playing:!1},Qy={animations:$y,root:Xy,frame:Yy};class Ky extends Pe{constructor(n){super(n);c(this,"blidge");c(this,"type");c(this,"blidgeRoot");c(this,"entities");c(this,"connection");c(this,"useGLTF");c(this,"gltfPath");this.entities=new Map,this.type="websocket",this.connection={enabled:!0,url:"ws://localhost:3100"},this.useGLTF=!1,this.gltfPath="/OREngine//scene.glb",this.blidgeRoot=null,this.blidge=new u0(J);const r=this.onSyncScene.bind(this),i=l=>{this.entity&&this.entity.noticeEventParent("update/blidge/frame",[l])};this.blidge.on("sync/scene",r),this.blidge.on("sync/timeline",i),this.once("dispose",()=>{this.blidge.off("sync/scene",r),this.blidge.off("sync/timeline",i)});const o=async()=>{this.type=="json"?(await this.blidge.loadScene(Qy,this.useGLTF?this.gltfPath:void 0),this.emit("loaded")):this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field("mode",()=>this.type,l=>{this.type=l,o()},{format:{type:"select",list:["websocket","json"]}}),this.field("gltf",()=>this.useGLTF,l=>{this.useGLTF=l,o()}),this.field("gltfPath",()=>this.gltfPath,l=>{this.gltfPath=l,o()});const s=this.fieldDir("websocket",{hidden:()=>this.type!="websocket"});s.field("reconnect",()=>()=>o(),void 0,{label:"Reconnect"}),s.field("url",()=>this.connection.url,l=>this.connection.url=l)}onSyncScene(n){const r=new Date().getTime(),i=s=>{const l=this.entities.get(s.name)||new lt;if(s.type=="camera"){const a=s.param;l.userData.cameraParam=a}return l.removeComponent(co),l.addComponent(co,{blidge:n,node:s}),s.children.forEach(a=>{const u=i(a);l.add(u)}),this.entities.set(l.name,l),l.userData.updateTime=r,l},o=n.root&&i(n.root);o&&(o.name="blidgeRoot",this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=o,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(s=>{if(s.userData.updateTime!=r){const l=s.parent;l&&l.remove(s),s.dispose(),this.entities.delete(s.name)}}),this.entity&&(this.entity.noticeEventChilds("sceneCreated",[this.blidgeRoot]),this.entity.noticeEventParent("update/blidge/scene",[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),this.blidgeRoot=null)}}class qy extends Pe{constructor(t){super(t)}updateImpl(t){rt.time.uTime.value=t.timeCode,rt.time.uTimeF.value=t.timeCode%1,rt.time.uTimeE.value=t.timeElapsed,rt.time.uTimeEF.value=t.timeElapsed%1,rt.resolution.uAspectRatio.value=t.resolution.x/t.resolution.y}}const bu={Camera:{MainCamera:ky},DemoProject:{DemoMusic:Ny,OREngineCubeMaterial:Fy,OREngineLogoMaterial:jy,SkyBox:Uy},ObjectControls:{ShakeViewer:yh,LookAt:aa,ObjectRotate:Vy,OrbitControls:xy},Texture:{TextureGenerator:Gy},Utilities:{BLidgeClient:Ky,UniformControls:qy}},Zy=()=>{pe.resources.clear();const e=(r,i)=>{const o=Object.keys(r);for(let s=0;s<o.length;s++){const l=o[s],a=r[l];if(typeof a=="function")i.addComponent(l,a);else{const u=i.createGroup(l);e(a,u)}}};pe.resources.addComponentGroup("Light").addComponent("Light",Ln);const n=Object.keys(bu);for(let r=0;r<n.length;r++){const i=n[r],o=bu[i],s=pe.resources.addComponentGroup(i);e(o,s)}},Jy="orengine/";class e1 extends _e{constructor(){super()}set(t,n){try{const r=JSON.stringify(n);return localStorage.setItem(Jy+t,r),fetch("/api/data/save/"+t,{method:"POST",headers:{"Content-Type":"application/json"},body:r})}catch(r){return console.error(r),Promise.reject(r)}}async get(t){try{return await(await fetch("/api/data/get/"+t)).json()}catch{return}}}const Ci=new e1;Zy();const t1=()=>{const[e,t]=C.useState(),[n,r]=C.useState();return C.useEffect(()=>{Ci.get("scene.json").then(i=>{i&&t(i)}),Ci.get("editor.json").then(i=>{i&&r(i)}),t(py)},[]),d.jsx(ay,{gl:J,project:e,children:d.jsx(sy,{editorData:n,onSave:(i,o)=>{Ci.set("scene.json",i),Ci.set("editor.json",o)}})})};us.createRoot(document.getElementById("root")).render(d.jsx(d.Fragment,{children:d.jsx(t1,{})}));
