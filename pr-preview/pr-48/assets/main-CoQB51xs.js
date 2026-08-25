var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,o)=>(o=n==null?{}:e(i(n)),c(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,te());else{var t=n(l);t!==null&&ie(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function ee(){return g?!0:!(e.unstable_now()-T<w)}function E(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ee());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ie(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}}}finally{i?te():S=!1}}}var te;if(typeof y==`function`)te=function(){y(E)};else if(typeof MessageChannel<`u`){var ne=new MessageChannel,re=ne.port2;ne.port1.onmessage=E,te=function(){re.postMessage(null)}}else te=function(){_(E,0)};function ie(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ie(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,te()))),r},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function ee(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return ee(e.type,t,e.props)}function te(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ne(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var re=/\/+/g;function ie(e,t){return typeof e==`object`&&e&&e.key!=null?ne(``+e.key):t.toString(36)}function ae(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function oe(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,oe(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ie(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(re,`$&/`)+`/`),oe(o,r,i,``,function(e){return e})):o!=null&&(te(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(re,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ie(a,u),c+=oe(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ie(a,u++),c+=oe(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return oe(ae(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function se(e,t,n){if(e==null)return e;var r=[],i=0;return oe(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ce(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var D=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},O={map:se,forEach:function(e,t,n){se(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return se(e,function(){t++}),t},toArray:function(e){return se(e,function(e){return e})||[]},only:function(e){if(!te(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=O,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ee(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ee(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=te,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ce}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,D)}catch(e){D(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=p();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.8`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=d(),n=p(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}var m=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),ee=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),te=Symbol.for(`react.lazy`),ne=Symbol.for(`react.activity`),re=Symbol.for(`react.memo_cache_sentinel`),ie=Symbol.iterator;function ae(e){return typeof e!=`object`||!e?null:(e=ie&&e[ie]||e[`@@iterator`],typeof e==`function`?e:null)}var oe=Symbol.for(`react.client.reference`);function se(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===oe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case ee:return`SuspenseList`;case ne:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?se(e.type)||`Memo`:t;case te:t=e._payload,e=e._init;try{return se(e(t))}catch{}}return null}var ce=Array.isArray,D=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,O=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},ue=[],de=-1;function fe(e){return{current:e}}function pe(e){0>de||(e.current=ue[de],ue[de]=null,de--)}function me(e,t){de++,ue[de]=e.current,e.current=t}var he=fe(null),ge=fe(null),_e=fe(null),ve=fe(null);function ye(e,t){switch(me(_e,t),me(ge,e),me(he,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}pe(he),me(he,e)}function be(){pe(he),pe(ge),pe(_e)}function xe(e){e.memoizedState!==null&&me(ve,e);var t=he.current,n=Hd(t,e.type);t!==n&&(me(ge,e),me(he,n))}function Se(e){ge.current===e&&(pe(he),pe(ge)),ve.current===e&&(pe(ve),Qf._currentValue=le)}var Ce,we;function Te(e){if(Ce===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ce=t&&t[1]||``,we=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ce+e+we}var Ee=!1;function De(e,t){if(!e||Ee)return``;Ee=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ee=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Te(n):``}function Oe(e,t){switch(e.tag){case 26:case 27:case 5:return Te(e.type);case 16:return Te(`Lazy`);case 13:return e.child!==t&&t!==null?Te(`Suspense Fallback`):Te(`Suspense`);case 19:return Te(`SuspenseList`);case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return Te(`Activity`);default:return``}}function ke(e){try{var t=``,n=null;do t+=Oe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ae=Object.prototype.hasOwnProperty,je=t.unstable_scheduleCallback,Me=t.unstable_cancelCallback,Ne=t.unstable_shouldYield,Pe=t.unstable_requestPaint,Fe=t.unstable_now,Ie=t.unstable_getCurrentPriorityLevel,Le=t.unstable_ImmediatePriority,Re=t.unstable_UserBlockingPriority,ze=t.unstable_NormalPriority,Be=t.unstable_LowPriority,Ve=t.unstable_IdlePriority,He=t.log,Ue=t.unstable_setDisableYieldValue,We=null,k=null;function Ge(e){if(typeof He==`function`&&Ue(e),k&&typeof k.setStrictMode==`function`)try{k.setStrictMode(We,e)}catch{}}var Ke=Math.clz32?Math.clz32:Ye,qe=Math.log,Je=Math.LN2;function Ye(e){return e>>>=0,e===0?32:31-(qe(e)/Je|0)|0}var Xe=256,Ze=262144,Qe=4194304;function $e(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function et(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=$e(n))):i=$e(o):i=$e(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=$e(n))):i=$e(o)):i=$e(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function tt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function nt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rt(){var e=Qe;return Qe<<=1,!(Qe&62914560)&&(Qe=4194304),e}function it(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function at(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ot(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ke(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&st(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function st(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ke(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ct(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ke(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function A(e,t){var n=t&-t;return n=n&42?1:j(n),(n&(e.suspendedLanes|t))===0?n:0}function j(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function M(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function lt(){var e=O.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ut(e,t){var n=O.p;try{return O.p=e,t()}finally{O.p=n}}var dt=Math.random().toString(36).slice(2),ft=`__reactFiber$`+dt,pt=`__reactProps$`+dt,mt=`__reactContainer$`+dt,ht=`__reactEvents$`+dt,gt=`__reactListeners$`+dt,_t=`__reactHandles$`+dt,vt=`__reactResources$`+dt,yt=`__reactMarker$`+dt;function N(e){delete e[ft],delete e[pt],delete e[ht],delete e[gt],delete e[_t]}function bt(e){var t=e[ft];if(t)return t;for(var n=e.parentNode;n;){if(t=n[mt]||n[ft]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ft])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function xt(e){if(e=e[ft]||e[mt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function St(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ct(e){var t=e[vt];return t||=e[vt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function wt(e){e[yt]=!0}var Tt=new Set,Et={};function Dt(e,t){Ot(e,t),Ot(e+`Capture`,t)}function Ot(e,t){for(Et[e]=t,e=0;e<t.length;e++)Tt.add(t[e])}var kt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),At={},jt={};function Mt(e){return Ae.call(jt,e)?!0:Ae.call(At,e)?!1:kt.test(e)?jt[e]=!0:(At[e]=!0,!1)}function Nt(e,t,n){if(Mt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}}function Pt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Ft(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function P(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function It(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Lt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Rt(e){if(!e._valueTracker){var t=It(e)?`checked`:`value`;e._valueTracker=Lt(e,t,``+e[t])}}function zt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=It(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}function Bt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Vt=/[\n"\\]/g;function Ht(e){return e.replace(Vt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Ut(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+P(t)):e.value!==``+P(t)&&(e.value=``+P(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Wt(e,o,P(n)):Wt(e,o,P(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+P(s):e.removeAttribute(`name`)}function F(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Rt(e);return}n=n==null?``:``+P(n),t=t==null?n:``+P(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Rt(e)}function Wt(e,t,n){t===`number`&&Bt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Gt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+P(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Kt(e,t,n){if(t!=null&&(t=``+P(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+P(n)}function qt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ce(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=P(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Rt(e)}function Jt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Yt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Xt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Yt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Zt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Xt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Xt(e,o,t[o])}function Qt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var $t=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),en=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function I(e){return en.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function tn(){}var nn=null;function rn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var an=null,on=null;function sn(e){var t=xt(e);if(t&&(e=t.stateNode)){var n=e[pt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Ut(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Ht(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[pt]||null;if(!a)throw Error(i(90));Ut(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&zt(r)}break a;case`textarea`:Kt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Gt(e,!!n.multiple,t,!1)}}}var cn=!1;function ln(e,t,n){if(cn)return e(t,n);cn=!0;try{return e(t)}finally{if(cn=!1,(an!==null||on!==null)&&(yu(),an&&(t=an,e=on,on=an=null,sn(t),e)))for(t=0;t<e.length;t++)sn(e[t])}}function un(e,t){var n=e.stateNode;if(n===null)return null;var r=n[pt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var dn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),fn=!1;if(dn)try{var pn={};Object.defineProperty(pn,"passive",{get:function(){fn=!0}}),window.addEventListener(`test`,pn,pn),window.removeEventListener(`test`,pn,pn)}catch{fn=!1}var mn=null,hn=null,gn=null;function _n(){if(gn)return gn;var e,t=hn,n=t.length,r,i=`value`in mn?mn.value:mn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return gn=i.slice(e,1<r?1-r:void 0)}function vn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function yn(){return!0}function bn(){return!1}function xn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?yn:bn,this.isPropagationStopped=bn,this}return m(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=yn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=yn)},persist:function(){},isPersistent:yn}),t}var Sn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cn=xn(Sn),wn=m({},Sn,{view:0,detail:0}),Tn=xn(wn),En,Dn,On,kn=m({},wn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==On&&(On&&e.type===`mousemove`?(En=e.screenX-On.screenX,Dn=e.screenY-On.screenY):Dn=En=0,On=e),En)},movementY:function(e){return`movementY`in e?e.movementY:Dn}}),An=xn(kn),jn=xn(m({},kn,{dataTransfer:0})),Mn=xn(m({},wn,{relatedTarget:0})),Nn=xn(m({},Sn,{animationName:0,elapsedTime:0,pseudoElement:0})),Pn=xn(m({},Sn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Fn=xn(m({},Sn,{data:0})),In={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Ln={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Rn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function zn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Rn[e])?!!t[e]:!1}function Bn(){return zn}var Vn=xn(m({},wn,{key:function(e){if(e.key){var t=In[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=vn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Ln[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bn,charCode:function(e){return e.type===`keypress`?vn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?vn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Hn=xn(m({},kn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Un=xn(m({},wn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bn})),Wn=xn(m({},Sn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Gn=xn(m({},kn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Kn=xn(m({},Sn,{newState:0,oldState:0})),qn=[9,13,27,32],Jn=dn&&`CompositionEvent`in window,Yn=null;dn&&`documentMode`in document&&(Yn=document.documentMode);var Xn=dn&&`TextEvent`in window&&!Yn,Zn=dn&&(!Jn||Yn&&8<Yn&&11>=Yn),Qn=` `,$n=!1;function er(e,t){switch(e){case`keyup`:return qn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function tr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var nr=!1;function rr(e,t){switch(e){case`compositionend`:return tr(t);case`keypress`:return t.which===32?($n=!0,Qn):null;case`textInput`:return e=t.data,e===Qn&&$n?null:e;default:return null}}function ir(e,t){if(nr)return e===`compositionend`||!Jn&&er(e,t)?(e=_n(),gn=hn=mn=null,nr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Zn&&t.locale!==`ko`?null:t.data;default:return null}}var ar={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ar[e.type]:t===`textarea`}function sr(e,t,n,r){an?on?on.push(r):on=[r]:an=r,t=Ed(t,`onChange`),0<t.length&&(n=new Cn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var cr=null,lr=null;function ur(e){yd(e,0)}function dr(e){if(zt(St(e)))return e}function fr(e,t){if(e===`change`)return t}var pr=!1;if(dn){var mr;if(dn){var hr=`oninput`in document;if(!hr){var gr=document.createElement(`div`);gr.setAttribute(`oninput`,`return;`),hr=typeof gr.oninput==`function`}mr=hr}else mr=!1;pr=mr&&(!document.documentMode||9<document.documentMode)}function _r(){cr&&(cr.detachEvent(`onpropertychange`,vr),lr=cr=null)}function vr(e){if(e.propertyName===`value`&&dr(lr)){var t=[];sr(t,lr,e,rn(e)),ln(ur,t)}}function yr(e,t,n){e===`focusin`?(_r(),cr=t,lr=n,cr.attachEvent(`onpropertychange`,vr)):e===`focusout`&&_r()}function br(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return dr(lr)}function xr(e,t){if(e===`click`)return dr(t)}function Sr(e,t){if(e===`input`||e===`change`)return dr(t)}function Cr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var wr=typeof Object.is==`function`?Object.is:Cr;function Tr(e,t){if(wr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ae.call(t,i)||!wr(e[i],t[i]))return!1}return!0}function Er(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Dr(e,t){var n=Er(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Er(n)}}function Or(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Or(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function kr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Bt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Bt(e.document)}return t}function Ar(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var jr=dn&&`documentMode`in document&&11>=document.documentMode,Mr=null,Nr=null,Pr=null,Fr=!1;function Ir(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Fr||Mr==null||Mr!==Bt(r)||(r=Mr,`selectionStart`in r&&Ar(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Pr&&Tr(Pr,r)||(Pr=r,r=Ed(Nr,`onSelect`),0<r.length&&(t=new Cn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Mr)))}function Lr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Rr={animationend:Lr(`Animation`,`AnimationEnd`),animationiteration:Lr(`Animation`,`AnimationIteration`),animationstart:Lr(`Animation`,`AnimationStart`),transitionrun:Lr(`Transition`,`TransitionRun`),transitionstart:Lr(`Transition`,`TransitionStart`),transitioncancel:Lr(`Transition`,`TransitionCancel`),transitionend:Lr(`Transition`,`TransitionEnd`)},zr={},Br={};dn&&(Br=document.createElement(`div`).style,`AnimationEvent`in window||(delete Rr.animationend.animation,delete Rr.animationiteration.animation,delete Rr.animationstart.animation),`TransitionEvent`in window||delete Rr.transitionend.transition);function Vr(e){if(zr[e])return zr[e];if(!Rr[e])return e;var t=Rr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Br)return zr[e]=t[n];return e}var Hr=Vr(`animationend`),Ur=Vr(`animationiteration`),Wr=Vr(`animationstart`),Gr=Vr(`transitionrun`),Kr=Vr(`transitionstart`),qr=Vr(`transitioncancel`),Jr=Vr(`transitionend`),Yr=new Map,Xr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Xr.push(`scrollEnd`);function Zr(e,t){Yr.set(e,t),Dt(t,[e])}var Qr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},$r=[],ei=0,ti=0;function ni(){for(var e=ei,t=ti=ei=0;t<e;){var n=$r[t];$r[t++]=null;var r=$r[t];$r[t++]=null;var i=$r[t];$r[t++]=null;var a=$r[t];if($r[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&oi(n,i,a)}}function ri(e,t,n,r){$r[ei++]=e,$r[ei++]=t,$r[ei++]=n,$r[ei++]=r,ti|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ii(e,t,n,r){return ri(e,t,n,r),si(e)}function ai(e,t){return ri(e,null,null,t),si(e)}function oi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ke(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function si(e){if(50<pu)throw pu=0,Y=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ci={};function li(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ui(e,t,n,r){return new li(e,t,n,r)}function di(e){return e=e.prototype,!(!e||!e.isReactComponent)}function fi(e,t){var n=e.alternate;return n===null?(n=ui(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function pi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function mi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)di(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,he.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ne:return e=ui(31,n,t,a),e.elementType=ne,e.lanes=o,e;case y:return hi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ui(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=ui(13,n,t,a),e.elementType=T,e.lanes=o,e;case ee:return e=ui(19,n,t,a),e.elementType=ee,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case E:s=14;break a;case te:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ui(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function hi(e,t,n,r){return e=ui(7,e,r,t),e.lanes=n,e}function gi(e,t,n){return e=ui(6,e,null,t),e.lanes=n,e}function _i(e){var t=ui(18,null,null,0);return t.stateNode=e,t}function vi(e,t,n){return t=ui(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var yi=new WeakMap;function bi(e,t){if(typeof e==`object`&&e){var n=yi.get(e);return n===void 0?(t={value:e,source:t,stack:ke(t)},yi.set(e,t),t):n}return{value:e,source:t,stack:ke(t)}}var xi=[],Si=0,Ci=null,wi=0,Ti=[],Ei=0,Di=null,Oi=1,ki=``;function Ai(e,t){xi[Si++]=wi,xi[Si++]=Ci,Ci=e,wi=t}function ji(e,t,n){Ti[Ei++]=Oi,Ti[Ei++]=ki,Ti[Ei++]=Di,Di=e;var r=Oi;e=ki;var i=32-Ke(r)-1;r&=~(1<<i),n+=1;var a=32-Ke(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Oi=1<<32-Ke(t)+i|n<<i|r,ki=a+e}else Oi=1<<a|n<<i|r,ki=e}function Mi(e){e.return!==null&&(Ai(e,1),ji(e,1,0))}function Ni(e){for(;e===Ci;)Ci=xi[--Si],xi[Si]=null,wi=xi[--Si],xi[Si]=null;for(;e===Di;)Di=Ti[--Ei],Ti[Ei]=null,ki=Ti[--Ei],Ti[Ei]=null,Oi=Ti[--Ei],Ti[Ei]=null}function Pi(e,t){Ti[Ei++]=Oi,Ti[Ei++]=ki,Ti[Ei++]=Di,Oi=t.id,ki=t.overflow,Di=e}var Fi=null,Ii=null,L=!1,Li=null,Ri=!1,zi=Error(i(519));function Bi(e){throw Ki(bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),zi}function Vi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ft]=e,t[pt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),F(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),qt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=tn),t=!0):t=!1,t||Bi(e,!0)}function Hi(e){for(Fi=e.return;Fi;)switch(Fi.tag){case 5:case 31:case 13:Ri=!1;return;case 27:case 3:Ri=!0;return;default:Fi=Fi.return}}function Ui(e){if(e!==Fi)return!1;if(!L)return Hi(e),L=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||Ud(e.type,e.memoizedProps)),n=!n),n&&Ii&&Bi(e),Hi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ii=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ii=uf(e)}else t===27?(t=Ii,Zd(e.type)?(e=lf,lf=null,Ii=e):Ii=t):Ii=Fi?cf(e.stateNode.nextSibling):null;return!0}function Wi(){Ii=Fi=null,L=!1}function Gi(){var e=Li;return e!==null&&(nu===null?nu=e:nu.push.apply(nu,e),Li=null),e}function Ki(e){Li===null?Li=[e]:Li.push(e)}var qi=fe(null),Ji=null,Yi=null;function Xi(e,t,n){me(qi,t._currentValue),t._currentValue=n}function Zi(e){e._currentValue=qi.current,pe(qi)}function Qi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function $i(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Qi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Qi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ea(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;wr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ve.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&$i(t,e,n,r),t.flags|=262144}function ta(e){for(e=e.firstContext;e!==null;){if(!wr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function na(e){Ji=e,Yi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function ra(e){return ia(Ji,e)}function R(e,t){return Ji===null&&na(e),ia(e,t)}function ia(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Yi===null){if(e===null)throw Error(i(308));Yi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Yi=Yi.next=t;return n}var aa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},oa=t.unstable_scheduleCallback,sa=t.unstable_NormalPriority,ca={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function la(){return{controller:new aa,data:new Map,refCount:0}}function ua(e){e.refCount--,e.refCount===0&&oa(sa,function(){e.controller.abort()})}var da=null,fa=0,pa=0,ma=null;function ha(e,t){if(da===null){var n=da=[];fa=0,pa=dd(),ma={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return fa++,t.then(ga,ga),t}function ga(){if(--fa===0&&da!==null){ma!==null&&(ma.status=`fulfilled`);var e=da;da=null,pa=0,ma=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function _a(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var va=D.S;D.S=function(e,t){iu=Fe(),typeof t==`object`&&t&&typeof t.then==`function`&&ha(e,t),va!==null&&va(e,t)};var ya=fe(null);function ba(){var e=ya.current;return e===null?Ul.pooledCache:e}function xa(e,t){t===null?me(ya,ya.current):me(ya,t.pool)}function Sa(){var e=ba();return e===null?null:{parent:ca._currentValue,pool:e}}var Ca=Error(i(460)),wa=Error(i(474)),Ta=Error(i(542)),Ea={then:function(){}};function Da(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Oa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(tn,tn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e;default:if(typeof t.status==`string`)t.then(tn,tn);else{if(e=Ul,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ma(e),e}throw Aa=t,Ca}}function ka(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Aa=e,Ca):e}}var Aa=null;function ja(){if(Aa===null)throw Error(i(459));var e=Aa;return Aa=null,e}function Ma(e){if(e===Ca||e===Ta)throw Error(i(483))}var Na=null,Pa=0;function Fa(e){var t=Pa;return Pa+=1,Na===null&&(Na=[]),Oa(Na,e,t)}function Ia(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function La(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ra(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=fi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=gi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===te&&ka(i)===t.type)?(t=a(t,n.props),Ia(t,n),t.return=e,t):(t=mi(n.type,n.key,n.props,null,e.mode,r),Ia(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=vi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=hi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=gi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=mi(t.type,t.key,t.props,null,e.mode,n),Ia(n,t),n.return=e,n;case v:return t=vi(t,e.mode,n),t.return=e,t;case te:return t=ka(t),f(e,t,n)}if(ce(t)||ae(t))return t=hi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Fa(t),n);if(t.$$typeof===C)return f(e,R(e,t),n);La(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case te:return n=ka(n),p(e,t,n,r)}if(ce(n)||ae(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Fa(n),r);if(n.$$typeof===C)return p(e,t,R(e,n),r);La(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case te:return r=ka(r),m(e,t,n,r,i)}if(ce(r)||ae(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Fa(r),i);if(r.$$typeof===C)return m(e,t,n,R(t,r),i);La(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),L&&Ai(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return L&&Ai(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),L&&Ai(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),L&&Ai(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return L&&Ai(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),L&&Ai(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===te&&ka(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ia(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===y?(c=hi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=mi(o.type,o.key,o.props,null,e.mode,c),Ia(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=vi(o,e.mode,c),c.return=e,e=c}return s(e);case te:return o=ka(o),b(e,r,o,c)}if(ce(o))return h(e,r,o,c);if(ae(o)){if(l=ae(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Fa(o),c);if(o.$$typeof===C)return b(e,r,R(e,o),c);La(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=gi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Pa=0;var i=b(e,t,n,r);return Na=null,i}catch(t){if(t===Ca||t===Ta)throw t;var a=ui(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var za=Ra(!0),Ba=Ra(!1),Va=!1;function Ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ua(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Wa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ga(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,H&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=si(e),oi(e,null,n),t}return ri(e,r,t,n),si(e)}function Ka(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ct(e,n)}}function qa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ja=!1;function Ya(){if(Ja){var e=ma;if(e!==null)throw e}}function Xa(e,t,n,r){Ja=!1;var i=e.updateQueue;Va=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(W&f)===f:(r&f)===f){f!==0&&f===pa&&(Ja=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,f);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,f=typeof h==`function`?h.call(_,d,f):h,f==null)break a;d=m({},d,f);break a;case 2:Va=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Xl|=o,e.lanes=o,e.memoizedState=d}}function Za(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Qa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Za(n[e],t)}var $a=fe(null),eo=fe(0);function to(e,t){e=Jl,me(eo,e),me($a,t),Jl=e|t.baseLanes}function no(){me(eo,Jl),me($a,$a.current)}function ro(){Jl=eo.current,pe($a),pe(eo)}var io=fe(null),ao=null;function oo(e){var t=e.alternate;me(fo,fo.current&1),me(io,e),ao===null&&(t===null||$a.current!==null||t.memoizedState!==null)&&(ao=e)}function so(e){me(fo,fo.current),me(io,e),ao===null&&(ao=e)}function co(e){e.tag===22?(me(fo,fo.current),me(io,e),ao===null&&(ao=e)):lo(e)}function lo(){me(fo,fo.current),me(io,io.current)}function uo(e){pe(io),ao===e&&(ao=null),pe(fo)}var fo=fe(0);function po(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var mo=0,z=null,ho=null,go=null,_o=!1,vo=!1,yo=!1,bo=0,xo=0,So=null,Co=0;function wo(){throw Error(i(321))}function To(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!wr(e[n],t[n]))return!1;return!0}function Eo(e,t,n,r,i,a){return mo=a,z=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,D.H=e===null||e.memoizedState===null?Vs:Hs,yo=!1,a=n(r,i),yo=!1,vo&&(a=Oo(t,n,r,i)),Do(e),a}function Do(e){D.H=Bs;var t=ho!==null&&ho.next!==null;if(mo=0,go=ho=z=null,_o=!1,xo=0,So=null,t)throw Error(i(300));e===null||ac||(e=e.dependencies,e!==null&&ta(e)&&(ac=!0))}function Oo(e,t,n,r){z=e;var a=0;do{if(vo&&(So=null),xo=0,vo=!1,25<=a)throw Error(i(301));if(a+=1,go=ho=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}D.H=Us,o=t(n,r)}while(vo);return o}function ko(){var e=D.H,t=e.useState()[0];return t=typeof t.then==`function`?Io(t):t,e=e.useState()[0],(ho===null?null:ho.memoizedState)!==e&&(z.flags|=1024),t}function Ao(){var e=bo!==0;return bo=0,e}function jo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Mo(e){if(_o){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}_o=!1}mo=0,go=ho=z=null,vo=!1,xo=bo=0,So=null}function No(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return go===null?z.memoizedState=go=e:go=go.next=e,go}function Po(){if(ho===null){var e=z.alternate;e=e===null?null:e.memoizedState}else e=ho.next;var t=go===null?z.memoizedState:go.next;if(t!==null)go=t,ho=e;else{if(e===null)throw z.alternate===null?Error(i(467)):Error(i(310));ho=e,e={memoizedState:ho.memoizedState,baseState:ho.baseState,baseQueue:ho.baseQueue,queue:ho.queue,next:null},go===null?z.memoizedState=go=e:go=go.next=e}return go}function Fo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Io(e){var t=xo;return xo+=1,So===null&&(So=[]),e=Oa(So,e,t),t=z,(go===null?t.memoizedState:go.next)===null&&(t=t.alternate,D.H=t===null||t.memoizedState===null?Vs:Hs),e}function Lo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Io(e);if(e.$$typeof===C)return ra(e)}throw Error(i(438,String(e)))}function Ro(e){var t=null,n=z.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=z.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Fo(),z.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=re;return t.index++,n}function zo(e,t){return typeof t==`function`?t(e):t}function Bo(e){return Vo(Po(),ho,e)}function Vo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(mo&f)===f:(W&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===pa&&(d=!0);else if((mo&p)===p){u=u.next,p===pa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,z.lanes|=p,Xl|=p;f=u.action,yo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,z.lanes|=f,Xl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!wr(o,e.memoizedState)&&(ac=!0,d&&(n=ma,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Ho(e){var t=Po(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);wr(o,t.memoizedState)||(ac=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Uo(e,t,n){var r=z,a=Po(),o=L;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!wr((ho||a).memoizedState,n);if(s&&(a.memoizedState=n,ac=!0),a=a.queue,fs(Ko.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||go!==null&&go.memoizedState.tag&1){if(r.flags|=2048,cs(9,{destroy:void 0},Go.bind(null,r,a,n,t),null),Ul===null)throw Error(i(349));o||mo&127||Wo(r,t,n)}return n}function Wo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=z.updateQueue,t===null?(t=Fo(),z.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Go(e,t,n,r){t.value=n,t.getSnapshot=r,qo(t)&&Jo(e)}function Ko(e,t,n){return n(function(){qo(t)&&Jo(e)})}function qo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!wr(e,n)}catch{return!0}}function Jo(e){var t=ai(e,2);t!==null&&gu(t,e,2)}function Yo(e){var t=No();if(typeof e==`function`){var n=e;if(e=n(),yo){Ge(!0);try{n()}finally{Ge(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:e},t}function Xo(e,t,n,r){return e.baseState=n,Vo(e,ho,typeof r==`function`?r:zo)}function Zo(e,t,n,r,a){if(Ls(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};D.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Qo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Qo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=D.T,o={};D.T=o;try{var s=n(i,r),c=D.S;c!==null&&c(o,s),$o(e,t,s)}catch(n){ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),D.T=a}}else try{a=n(i,r),$o(e,t,a)}catch(n){ts(e,t,n)}}function $o(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){es(e,t,n)},function(n){return ts(e,t,n)}):es(e,t,n)}function es(e,t,n){t.status=`fulfilled`,t.value=n,ns(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Qo(e,n)))}function ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ns(t),t=t.next;while(t!==r)}e.action=null}function ns(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function rs(e,t){return t}function is(e,t){if(L){var n=Ul.formState;if(n!==null){a:{var r=z;if(L){if(Ii){b:{for(var i=Ii,a=Ri;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Ii=cf(i.nextSibling),r=i.data===`F!`;break a}}Bi(r)}r=!1}r&&(t=n[0])}}return n=No(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:t},n.queue=r,n=Ps.bind(null,z,r),r.dispatch=n,r=Yo(!1),a=Is.bind(null,z,!1,r.queue),r=No(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Zo.bind(null,z,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function as(e){return os(Po(),ho,e)}function os(e,t,n){if(t=Vo(e,t,rs)[0],e=Bo(zo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Io(t)}catch(e){throw e===Ca?Ta:e}else r=t;t=Po();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(z.flags|=2048,cs(9,{destroy:void 0},ss.bind(null,i,n),null)),[r,a,e]}function ss(e,t){e.action=t}function B(e){var t=Po(),n=ho;if(n!==null)return os(t,n,e);Po(),t=t.memoizedState,n=Po();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function cs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=z.updateQueue,t===null&&(t=Fo(),z.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ls(){return Po().memoizedState}function us(e,t,n,r){var i=No();z.flags|=e,i.memoizedState=cs(1|t,{destroy:void 0},n,r===void 0?null:r)}function V(e,t,n,r){var i=Po();r=r===void 0?null:r;var a=i.memoizedState.inst;ho!==null&&r!==null&&To(r,ho.memoizedState.deps)?i.memoizedState=cs(t,a,n,r):(z.flags|=e,i.memoizedState=cs(1|t,a,n,r))}function ds(e,t){us(8390656,8,e,t)}function fs(e,t){V(2048,8,e,t)}function ps(e){z.flags|=4;var t=z.updateQueue;if(t===null)t=Fo(),z.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ms(e){var t=Po().memoizedState;return ps({ref:t,nextImpl:e}),function(){if(H&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function hs(e,t){return V(4,2,e,t)}function gs(e,t){return V(4,4,e,t)}function _s(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function vs(e,t,n){n=n==null?null:n.concat([e]),V(4,4,_s.bind(null,t,e),n)}function ys(){}function bs(e,t){var n=Po();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&To(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function xs(e,t){var n=Po();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&To(t,r[1]))return r[0];if(r=e(),yo){Ge(!0);try{e()}finally{Ge(!1)}}return n.memoizedState=[r,t],r}function Ss(e,t,n){return n===void 0||mo&1073741824&&!(W&261930)?e.memoizedState=t:(e.memoizedState=n,e=hu(),z.lanes|=e,Xl|=e,n)}function Cs(e,t,n,r){return wr(n,t)?n:$a.current===null?!(mo&42)||mo&1073741824&&!(W&261930)?(ac=!0,e.memoizedState=n):(e=hu(),z.lanes|=e,Xl|=e,t):(e=Ss(e,n,r),wr(e,t)||(ac=!0),e)}function ws(e,t,n,r,i){var a=O.p;O.p=a!==0&&8>a?a:8;var o=D.T,s={};D.T=s,Is(e,!1,t,n);try{var c=i(),l=D.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Fs(e,t,_a(c,r),mu(e)):Fs(e,t,r,mu(e))}catch(n){Fs(e,t,{then:function(){},status:`rejected`,reason:n},mu())}finally{O.p=a,o!==null&&s.types!==null&&(o.types=s.types),D.T=o}}function Ts(){}function Es(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Ds(e).queue;ws(e,a,t,le,n===null?Ts:function(){return Os(e),n(r)})}function Ds(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:le},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Os(e){var t=Ds(e);t.next===null&&(t=e.alternate.memoizedState),Fs(e,t.next.queue,{},mu())}function ks(){return ra(Qf)}function As(){return Po().memoizedState}function js(){return Po().memoizedState}function Ms(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=mu();e=Wa(n);var r=Ga(t,e,n);r!==null&&(gu(r,t,n),Ka(r,t,n)),t={cache:la()},e.payload=t;return}t=t.return}}function Ns(e,t,n){var r=mu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ls(e)?Rs(t,n):(n=ii(e,t,n,r),n!==null&&(gu(n,e,r),zs(n,t,r)))}function Ps(e,t,n){Fs(e,t,n,mu())}function Fs(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ls(e))Rs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,wr(s,o))return ri(e,t,i,0),Ul===null&&ni(),!1}catch{}if(n=ii(e,t,i,r),n!==null)return gu(n,e,r),zs(n,t,r),!0}return!1}function Is(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ls(e)){if(t)throw Error(i(479))}else t=ii(e,n,r,2),t!==null&&gu(t,e,2)}function Ls(e){var t=e.alternate;return e===z||t!==null&&t===z}function Rs(e,t){vo=_o=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function zs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ct(e,n)}}var Bs={readContext:ra,use:Lo,useCallback:wo,useContext:wo,useEffect:wo,useImperativeHandle:wo,useLayoutEffect:wo,useInsertionEffect:wo,useMemo:wo,useReducer:wo,useRef:wo,useState:wo,useDebugValue:wo,useDeferredValue:wo,useTransition:wo,useSyncExternalStore:wo,useId:wo,useHostTransitionStatus:wo,useFormState:wo,useActionState:wo,useOptimistic:wo,useMemoCache:wo,useCacheRefresh:wo};Bs.useEffectEvent=wo;var Vs={readContext:ra,use:Lo,useCallback:function(e,t){return No().memoizedState=[e,t===void 0?null:t],e},useContext:ra,useEffect:ds,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),us(4194308,4,_s.bind(null,t,e),n)},useLayoutEffect:function(e,t){return us(4194308,4,e,t)},useInsertionEffect:function(e,t){us(4,2,e,t)},useMemo:function(e,t){var n=No();t=t===void 0?null:t;var r=e();if(yo){Ge(!0);try{e()}finally{Ge(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=No();if(n!==void 0){var i=n(t);if(yo){Ge(!0);try{n(t)}finally{Ge(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ns.bind(null,z,e),[r.memoizedState,e]},useRef:function(e){var t=No();return e={current:e},t.memoizedState=e},useState:function(e){e=Yo(e);var t=e.queue,n=Ps.bind(null,z,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ys,useDeferredValue:function(e,t){return Ss(No(),e,t)},useTransition:function(){var e=Yo(!1);return e=ws.bind(null,z,e.queue,!0,!1),No().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=z,a=No();if(L){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Ul===null)throw Error(i(349));W&127||Wo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ds(Ko.bind(null,r,o,e),[e]),r.flags|=2048,cs(9,{destroy:void 0},Go.bind(null,r,o,n,t),null),n},useId:function(){var e=No(),t=Ul.identifierPrefix;if(L){var n=ki,r=Oi;n=(r&~(1<<32-Ke(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=bo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Co++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ks,useFormState:is,useActionState:is,useOptimistic:function(e){var t=No();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Is.bind(null,z,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ro,useCacheRefresh:function(){return No().memoizedState=Ms.bind(null,z)},useEffectEvent:function(e){var t=No(),n={impl:e};return t.memoizedState=n,function(){if(H&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Hs={readContext:ra,use:Lo,useCallback:bs,useContext:ra,useEffect:fs,useImperativeHandle:vs,useInsertionEffect:hs,useLayoutEffect:gs,useMemo:xs,useReducer:Bo,useRef:ls,useState:function(){return Bo(zo)},useDebugValue:ys,useDeferredValue:function(e,t){return Cs(Po(),ho.memoizedState,e,t)},useTransition:function(){var e=Bo(zo)[0],t=Po().memoizedState;return[typeof e==`boolean`?e:Io(e),t]},useSyncExternalStore:Uo,useId:As,useHostTransitionStatus:ks,useFormState:as,useActionState:as,useOptimistic:function(e,t){return Xo(Po(),ho,e,t)},useMemoCache:Ro,useCacheRefresh:js};Hs.useEffectEvent=ms;var Us={readContext:ra,use:Lo,useCallback:bs,useContext:ra,useEffect:fs,useImperativeHandle:vs,useInsertionEffect:hs,useLayoutEffect:gs,useMemo:xs,useReducer:Ho,useRef:ls,useState:function(){return Ho(zo)},useDebugValue:ys,useDeferredValue:function(e,t){var n=Po();return ho===null?Ss(n,e,t):Cs(n,ho.memoizedState,e,t)},useTransition:function(){var e=Ho(zo)[0],t=Po().memoizedState;return[typeof e==`boolean`?e:Io(e),t]},useSyncExternalStore:Uo,useId:As,useHostTransitionStatus:ks,useFormState:B,useActionState:B,useOptimistic:function(e,t){var n=Po();return ho===null?(n.baseState=e,[e,n.queue.dispatch]):Xo(n,ho,e,t)},useMemoCache:Ro,useCacheRefresh:js};Us.useEffectEvent=ms;function Ws(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:m({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Gs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=mu(),i=Wa(r);i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(gu(t,e,r),Ka(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=mu(),i=Wa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ga(e,i,r),t!==null&&(gu(t,e,r),Ka(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=mu(),r=Wa(n);r.tag=2,t!=null&&(r.callback=t),t=Ga(e,r,n),t!==null&&(gu(t,e,n),Ka(t,e,n))}};function Ks(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Tr(n,r)||!Tr(i,a):!0}function qs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Gs.enqueueReplaceState(t,t.state,null)}function Js(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=m({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Ys(e){Qr(e)}function Xs(e){console.error(e)}function Zs(e){Qr(e)}function Qs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function $s(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function ec(e,t,n){return n=Wa(n),n.tag=3,n.payload={element:null},n.callback=function(){Qs(e,t)},n}function tc(e){return e=Wa(e),e.tag=3,e}function nc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){$s(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){$s(t,n,r),typeof i!=`function`&&(ou===null?ou=new Set([this]):ou.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function rc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ea(t,n,a,!0),n=io.current,n!==null){switch(n.tag){case 31:case 13:return ao===null?Eu():n.alternate===null&&Yl===0&&(Yl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ea?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Eu(),!1}if(L)return t=io.current,t===null?(r!==zi&&(t=Error(i(423),{cause:r}),Ki(bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=bi(r,n),a=ec(e.stateNode,r,a),qa(e,a),Yl!==4&&(Yl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==zi&&(e=Error(i(422),{cause:r}),Ki(bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=bi(o,n),tu===null?tu=[o]:tu.push(o),Yl!==4&&(Yl=2),t===null)return!0;r=bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=ec(n.stateNode,r,e),qa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ou===null||!ou.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=tc(a),nc(a,e,n,r),qa(n,a),!1}n=n.return}while(n!==null);return!1}var ic=Error(i(461)),ac=!1;function oc(e,t,n,r){t.child=e===null?Ba(t,null,n,r):za(t,e.child,n,r)}function sc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return na(t),r=Eo(e,t,n,o,a,i),s=Ao(),e!==null&&!ac?(jo(e,t,i),jc(e,t,i)):(L&&s&&Mi(t),t.flags|=1,oc(e,t,r,i),t.child)}function cc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!di(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,lc(e,t,a,r,i)):(e=mi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Mc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Tr:n,n(o,r)&&e.ref===t.ref)return jc(e,t,i)}return t.flags|=1,e=fi(a,r),e.ref=t.ref,e.return=t,t.child=e}function lc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Tr(a,r)&&e.ref===t.ref){if(ac=!1,t.pendingProps=r=a,Mc(e,i))e.flags&131072&&(ac=!0);else return t.lanes=e.lanes,jc(e,t,i)}}return _c(e,t,n,r,i)}function uc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return fc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&xa(t,a===null?null:a.cachePool),a===null?no():to(t,a),co(t);else return r=t.lanes=536870912,fc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&xa(t,null),no(),lo(t)):(xa(t,a.cachePool),to(t,a),lo(t),t.memoizedState=null);return oc(e,t,i,n),t.child}function dc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function fc(e,t,n,r,i){var a=ba();return a=a===null?null:{parent:ca._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&xa(t,null),no(),co(t),e!==null&&ea(e,t,r,!0),t.childLanes=i,null}function pc(e,t){return t=Ec({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function mc(e,t,n){return za(t,e.child,null,n),e=pc(t,t.pendingProps),e.flags|=2,uo(t),t.memoizedState=null,e}function hc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(L){if(r.mode===`hidden`)return e=pc(t,r),t.lanes=536870912,dc(null,e);if(so(t),(e=Ii)?(e=rf(e,Ri),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Di===null?null:{id:Oi,overflow:ki},retryLane:536870912,hydrationErrors:null},n=_i(e),n.return=t,t.child=n,Fi=t,Ii=null)):e=null,e===null)throw Bi(t);return t.lanes=536870912,null}return pc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(so(t),a){if(t.flags&256)t.flags&=-257,t=mc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(ac||ea(e,t,n,!1),a=(n&e.childLanes)!==0,ac||a){if(r=Ul,r!==null&&(s=A(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ai(e,s),gu(r,e,s),ic;Eu(),t=mc(e,t,n)}else e=o.treeContext,Ii=cf(s.nextSibling),Fi=t,L=!0,Li=null,Ri=!1,e!==null&&Pi(t,e),t=pc(t,r),t.flags|=4096;return t}return e=fi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function gc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function _c(e,t,n,r,i){return na(t),n=Eo(e,t,n,r,void 0,i),r=Ao(),e!==null&&!ac?(jo(e,t,i),jc(e,t,i)):(L&&r&&Mi(t),t.flags|=1,oc(e,t,n,i),t.child)}function vc(e,t,n,r,i,a){return na(t),t.updateQueue=null,n=Oo(t,r,n,i),Do(e),r=Ao(),e!==null&&!ac?(jo(e,t,a),jc(e,t,a)):(L&&r&&Mi(t),t.flags|=1,oc(e,t,n,a),t.child)}function yc(e,t,n,r,i){if(na(t),t.stateNode===null){var a=ci,o=n.contextType;typeof o==`object`&&o&&(a=ra(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Gs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ha(t),o=n.contextType,a.context=typeof o==`object`&&o?ra(o):ci,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ws(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Gs.enqueueReplaceState(a,a.state,null),Xa(t,r,a,i),Ya(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Js(n,s);a.props=c;var l=a.context,u=n.contextType;o=ci,typeof u==`object`&&u&&(o=ra(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&qs(t,a,r,o),Va=!1;var f=t.memoizedState;a.state=f,Xa(t,r,a,i),Ya(),l=t.memoizedState,s||f!==l||Va?(typeof d==`function`&&(Ws(t,n,d,r),l=t.memoizedState),(c=Va||Ks(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ua(e,t),o=t.memoizedProps,u=Js(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ci,typeof l==`object`&&l&&(c=ra(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&qs(t,a,r,c),Va=!1,f=t.memoizedState,a.state=f,Xa(t,r,a,i),Ya();var p=t.memoizedState;o!==d||f!==p||Va||e!==null&&e.dependencies!==null&&ta(e.dependencies)?(typeof s==`function`&&(Ws(t,n,s,r),p=t.memoizedState),(u=Va||Ks(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ta(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,gc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=za(t,e.child,null,i),t.child=za(t,null,n,i)):oc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=jc(e,t,i),e}function bc(e,t,n,r){return Wi(),t.flags|=256,oc(e,t,n,r),t.child}var xc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Sc(e){return{baseLanes:e,cachePool:Sa()}}function Cc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=$l),e}function wc(e,t,n){var r=t.pendingProps,a=!1,o=!!(t.flags&128),s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:!!(fo.current&2)),s&&(a=!0,t.flags&=-129),s=!!(t.flags&32),t.flags&=-33,e===null){if(L){if(a?oo(t):lo(t),(e=Ii)?(e=rf(e,Ri),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Di===null?null:{id:Oi,overflow:ki},retryLane:536870912,hydrationErrors:null},n=_i(e),n.return=t,t.child=n,Fi=t,Ii=null)):e=null,e===null)throw Bi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(lo(t),a=t.mode,c=Ec({mode:`hidden`,children:c},a),r=hi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Sc(n),r.childLanes=Cc(e,s,n),t.memoizedState=xc,dc(null,r)):(oo(t),Tc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(oo(t),t.flags&=-257,t=Dc(e,t,n)):t.memoizedState===null?(lo(t),c=r.fallback,a=t.mode,r=Ec({mode:`visible`,children:r.children},a),c=hi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,za(t,e.child,null,n),r=t.child,r.memoizedState=Sc(n),r.childLanes=Cc(e,s,n),t.memoizedState=xc,t=dc(null,r)):(lo(t),t.child=e.child,t.flags|=128,t=null);else if(oo(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Ki({value:r,source:null,stack:null}),t=Dc(e,t,n)}else if(ac||ea(e,t,n,!1),s=(n&e.childLanes)!==0,ac||s){if(s=Ul,s!==null&&(r=A(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ai(e,r),gu(s,e,r),ic;af(c)||Eu(),t=Dc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Ii=cf(c.nextSibling),Fi=t,L=!0,Li=null,Ri=!1,e!==null&&Pi(t,e),t=Tc(t,r.children),t.flags|=4096);return t}return a?(lo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=fi(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=hi(c,a,n,null),c.flags|=2):c=fi(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,dc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Sc(n):(a=c.cachePool,a===null?a=Sa():(l=ca._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=Cc(e,s,n),t.memoizedState=xc,dc(e.child,r)):(oo(t),n=e.child,e=n.sibling,n=fi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Tc(e,t){return t=Ec({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Ec(e,t){return e=ui(22,e,null,t),e.lanes=0,e}function Dc(e,t,n){return za(t,e.child,null,n),e=Tc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Oc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Qi(e.return,t,n)}function kc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ac(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=fo.current,s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,me(fo,o),oc(e,t,r,n),r=L?wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Oc(e,n,t);else if(e.tag===19)Oc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&po(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),kc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&po(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}kc(t,!0,n,null,a,r);break;case`together`:kc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function jc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Xl|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ea(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=fi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=fi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Mc(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ta(e)))}function Nc(e,t,n){switch(t.tag){case 3:ye(t,t.stateNode.containerInfo),Xi(t,ca,e.memoizedState.cache),Wi();break;case 27:case 5:xe(t);break;case 4:ye(t,t.stateNode.containerInfo);break;case 10:Xi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,so(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(oo(t),e=jc(e,t,n),e===null?null:e.sibling):wc(e,t,n):(oo(t),t.flags|=128,null);oo(t);break;case 19:var i=!!(e.flags&128);if(r=(n&t.childLanes)!==0,r||=(ea(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ac(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),me(fo,fo.current),r)break;return null;case 22:return t.lanes=0,uc(e,t,n,t.pendingProps);case 24:Xi(t,ca,e.memoizedState.cache)}return jc(e,t,n)}function Pc(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)ac=!0;else{if(!Mc(e,n)&&!(t.flags&128))return ac=!1,Nc(e,t,n);ac=!!(e.flags&131072)}}else ac=!1,L&&t.flags&1048576&&ji(t,wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ka(t.elementType),t.type=e,typeof e==`function`)di(e)?(r=Js(e,r),t.tag=1,t=yc(null,t,e,r,n)):(t.tag=0,t=_c(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=sc(null,t,e,r,n);break a}if(a===E){t.tag=14,t=cc(null,t,e,r,n);break a}}throw t=se(e)||e,Error(i(306,t,``))}}return t;case 0:return _c(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Js(r,t.pendingProps),yc(e,t,r,a,n);case 3:a:{if(ye(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ua(e,t),Xa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Xi(t,ca,r),r!==o.cache&&$i(t,[ca],n,!0),Ya(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=bc(e,t,r,n);break a}if(r!==a){a=bi(Error(i(424)),t),Ki(a),t=bc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Ii=cf(e.firstChild),Fi=t,L=!0,Li=null,Ri=!0,n=Ba(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Wi(),r===a){t=jc(e,t,n);break a}oc(e,t,r,n)}t=t.child}return t;case 26:return gc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:L||(n=t.type,e=t.pendingProps,r=Bd(_e.current).createElement(n),r[ft]=t,r[pt]=e,Pd(r,n,e),wt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return xe(t),e===null&&L&&(r=t.stateNode=ff(t.type,t.pendingProps,_e.current),Fi=t,Ri=!0,a=Ii,Zd(t.type)?(lf=a,Ii=cf(r.firstChild)):Ii=a),oc(e,t,t.pendingProps.children,n),gc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&L&&((a=r=Ii)&&(r=tf(r,t.type,t.pendingProps,Ri),r===null?a=!1:(t.stateNode=r,Fi=t,Ii=cf(r.firstChild),Ri=!1,a=!0)),a||Bi(t)),xe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Eo(e,t,ko,null,null,n),Qf._currentValue=a),gc(e,t),oc(e,t,r,n),t.child;case 6:return e===null&&L&&((e=n=Ii)&&(n=nf(n,t.pendingProps,Ri),n===null?e=!1:(t.stateNode=n,Fi=t,Ii=null,e=!0)),e||Bi(t)),null;case 13:return wc(e,t,n);case 4:return ye(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=za(t,null,r,n):oc(e,t,r,n),t.child;case 11:return sc(e,t,t.type,t.pendingProps,n);case 7:return oc(e,t,t.pendingProps,n),t.child;case 8:return oc(e,t,t.pendingProps.children,n),t.child;case 12:return oc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Xi(t,t.type,r.value),oc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,na(t),a=ra(a),r=r(a),t.flags|=1,oc(e,t,r,n),t.child;case 14:return cc(e,t,t.type,t.pendingProps,n);case 15:return lc(e,t,t.type,t.pendingProps,n);case 19:return Ac(e,t,n);case 31:return hc(e,t,n);case 22:return uc(e,t,n,t.pendingProps);case 24:return na(t),r=ra(ca),e===null?(a=ba(),a===null&&(a=Ul,o=la(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ha(t),Xi(t,ca,a)):((e.lanes&n)!==0&&(Ua(e,t),Xa(t,null,null,n),Ya()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Xi(t,ca,r),r!==a.cache&&$i(t,[ca],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Xi(t,ca,r))),oc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Fc(e){e.flags|=4}function Ic(e,t,n,r,i){if((t=!!(e.mode&32))&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Cu())e.flags|=8192;else throw Aa=Ea,wa}}else e.flags&=-16777217}function Lc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t)){if(Cu())e.flags|=8192;else throw Aa=Ea,wa}}function Rc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:rt(),e.lanes|=t,eu|=t)}function zc(e,t){if(!L)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Bc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vc(e,t,n){var r=t.pendingProps;switch(Ni(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Bc(t),null;case 1:return Bc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Zi(ca),be(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ui(t)?Fc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Gi())),Bc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Fc(t),o===null?(Bc(t),Ic(t,a,null,r,n)):(Bc(t),Lc(t,o))):o?o===e.memoizedState?(Bc(t),t.flags&=-16777217):(Fc(t),Bc(t),Lc(t,o)):(e=e.memoizedProps,e!==r&&Fc(t),Bc(t),Ic(t,a,e,r,n)),null;case 27:if(Se(t),n=_e.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Bc(t),null}e=he.current,Ui(t)?Vi(t,e):(e=ff(a,r,n),t.stateNode=e,Fc(t))}return Bc(t),null;case 5:if(Se(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Bc(t),null}if(o=he.current,Ui(t))Vi(t,o);else{var s=Bd(_e.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ft]=t,o[pt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Fc(t)}}return Bc(t),Ic(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=_e.current,Ui(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Fi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ft]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Bi(t,!0)}else e=Bd(e).createTextNode(r),e[ft]=t,t.stateNode=e}return Bc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ui(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ft]=t}else Wi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Bc(t),e=!1}else n=Gi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(uo(t),t):(uo(t),null);if(t.flags&128)throw Error(i(558))}return Bc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ui(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ft]=t}else Wi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Bc(t),a=!1}else a=Gi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(uo(t),t):(uo(t),null)}return uo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Rc(t,t.updateQueue),Bc(t),null);case 4:return be(),e===null&&Sd(t.stateNode.containerInfo),Bc(t),null;case 10:return Zi(t.type),Bc(t),null;case 19:if(pe(fo),r=t.memoizedState,r===null)return Bc(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)zc(r,!1);else{if(Yl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=po(e),o!==null){for(t.flags|=128,zc(r,!1),e=o.updateQueue,t.updateQueue=e,Rc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)pi(n,e),n=n.sibling;return me(fo,fo.current&1|2),L&&Ai(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Fe()>q&&(t.flags|=128,a=!0,zc(r,!1),t.lanes=4194304)}}else{if(!a){if(e=po(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Rc(t,e),zc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!L)return Bc(t),null}else 2*Fe()-r.renderingStartTime>q&&n!==536870912&&(t.flags|=128,a=!0,zc(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Bc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Fe(),e.sibling=null,n=fo.current,me(fo,a?n&1|2:n&1),L&&Ai(t,r.treeForkCount),e);case 22:case 23:return uo(t),ro(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Bc(t),t.subtreeFlags&6&&(t.flags|=8192)):Bc(t),n=t.updateQueue,n!==null&&Rc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&pe(ya),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Zi(ca),Bc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Hc(e,t){switch(Ni(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Zi(ca),be(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Se(t),null;case 31:if(t.memoizedState!==null){if(uo(t),t.alternate===null)throw Error(i(340));Wi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(uo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Wi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(fo),null;case 4:return be(),null;case 10:return Zi(t.type),null;case 22:case 23:return uo(t),ro(),e!==null&&pe(ya),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Zi(ca),null;case 25:return null;default:return null}}function Uc(e,t){switch(Ni(t),t.tag){case 3:Zi(ca),be();break;case 26:case 27:case 5:Se(t);break;case 4:be();break;case 31:t.memoizedState!==null&&uo(t);break;case 13:uo(t);break;case 19:pe(fo);break;case 10:Zi(t.type);break;case 22:case 23:uo(t),ro(),e!==null&&pe(ya);break;case 24:Zi(ca)}}function Wc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Wu(t,t.return,e)}}function Gc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Wu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Wu(t,t.return,e)}}function Kc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Qa(t,n)}catch(t){Wu(e,e.return,t)}}}function qc(e,t,n){n.props=Js(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Wu(e,t,n)}}function Jc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Wu(e,t,n)}}function Yc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Wu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Wu(e,t,n)}else n.current=null}}function Xc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Wu(e,e.return,t)}}function Zc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[pt]=t}catch(t){Wu(e,e.return,t)}}function Qc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function $c(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Qc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function el(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=tn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(el(e,t,n),e=e.sibling;e!==null;)el(e,t,n),e=e.sibling}function tl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(tl(e,t,n),e=e.sibling;e!==null;)tl(e,t,n),e=e.sibling}function nl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ft]=e,t[pt]=n}catch(t){Wu(e,e.return,t)}}var rl=!1,il=!1,al=!1,ol=typeof WeakSet==`function`?WeakSet:Set,sl=null;function cl(e,t){if(e=e.containerInfo,Rd=sp,e=kr(e),Ar(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,sl=t;sl!==null;)if(t=sl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,sl=e;else for(;sl!==null;){switch(t=sl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Js(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Wu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,sl=e;break}sl=t.return}}function ll(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:wl(e,n),r&4&&Wc(5,n);break;case 1:if(wl(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Wu(n,n.return,e)}else{var i=Js(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Wu(n,n.return,e)}}}r&64&&Kc(n),r&512&&Jc(n,n.return);break;case 3:if(wl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Qa(e,t)}catch(e){Wu(n,n.return,e)}}break;case 27:t===null&&r&4&&nl(n);case 26:case 5:wl(e,n),t===null&&r&4&&Xc(n),r&512&&Jc(n,n.return);break;case 12:wl(e,n);break;case 31:wl(e,n),r&4&&hl(e,n);break;case 13:wl(e,n),r&4&&gl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||rl,!r){t=t!==null&&t.memoizedState!==null||il,i=rl;var a=il;rl=r,(il=t)&&!a?El(e,n,!!(n.subtreeFlags&8772)):wl(e,n),rl=i,il=a}break;case 30:break;default:wl(e,n)}}function ul(e){var t=e.alternate;t!==null&&(e.alternate=null,ul(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&N(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var dl=null,fl=!1;function pl(e,t,n){for(n=n.child;n!==null;)ml(e,t,n),n=n.sibling}function ml(e,t,n){if(k&&typeof k.onCommitFiberUnmount==`function`)try{k.onCommitFiberUnmount(We,n)}catch{}switch(n.tag){case 26:il||Yc(n,t),pl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:il||Yc(n,t);var r=dl,i=fl;Zd(n.type)&&(dl=n.stateNode,fl=!1),pl(e,t,n),pf(n.stateNode),dl=r,fl=i;break;case 5:il||Yc(n,t);case 6:if(r=dl,i=fl,dl=null,pl(e,t,n),dl=r,fl=i,dl!==null){if(fl)try{(dl.nodeType===9?dl.body:dl.nodeName===`HTML`?dl.ownerDocument.body:dl).removeChild(n.stateNode)}catch(e){Wu(n,t,e)}else try{dl.removeChild(n.stateNode)}catch(e){Wu(n,t,e)}}break;case 18:dl!==null&&(fl?(e=dl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(dl,n.stateNode));break;case 4:r=dl,i=fl,dl=n.stateNode.containerInfo,fl=!0,pl(e,t,n),dl=r,fl=i;break;case 0:case 11:case 14:case 15:Gc(2,n,t),il||Gc(4,n,t),pl(e,t,n);break;case 1:il||(Yc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&qc(n,t,r)),pl(e,t,n);break;case 21:pl(e,t,n);break;case 22:il=(r=il)||n.memoizedState!==null,pl(e,t,n),il=r;break;default:pl(e,t,n)}}function hl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Wu(t,t.return,e)}}}function gl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Wu(t,t.return,e)}}function _l(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ol),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ol),t;default:throw Error(i(435,e.tag))}}function vl(e,t){var n=_l(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function yl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){dl=c.stateNode,fl=!1;break a}break;case 5:dl=c.stateNode,fl=!1;break a;case 3:case 4:dl=c.stateNode.containerInfo,fl=!0;break a}c=c.return}if(dl===null)throw Error(i(160));ml(o,s,a),dl=null,fl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)xl(t,e),t=t.sibling}var bl=null;function xl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:yl(t,e),Sl(e),r&4&&(Gc(3,e,e.return),Wc(3,e),Gc(5,e,e.return));break;case 1:yl(t,e),Sl(e),r&512&&(il||n===null||Yc(n,n.return)),r&64&&rl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=bl;if(yl(t,e),Sl(e),r&512&&(il||n===null||Yc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null){if(r===null){if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[yt]||o[ft]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[ft]=e,wt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ft]=e,wt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode)}else e.stateNode=If(a,r,e.memoizedProps)}else o===r?r===null&&e.stateNode!==null&&Zc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:yl(t,e),Sl(e),r&512&&(il||n===null||Yc(n,n.return)),n!==null&&r&4&&Zc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(yl(t,e),Sl(e),r&512&&(il||n===null||Yc(n,n.return)),e.flags&32){a=e.stateNode;try{Jt(a,``)}catch(t){Wu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Zc(e,a,n===null?a:n.memoizedProps)),r&1024&&(al=!0);break;case 6:if(yl(t,e),Sl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Wu(e,e.return,t)}}break;case 3:if(Bf=null,a=bl,bl=gf(t.containerInfo),yl(t,e),bl=a,Sl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Wu(e,e.return,t)}al&&(al=!1,Cl(e));break;case 4:r=bl,bl=gf(e.stateNode.containerInfo),yl(t,e),Sl(e),bl=r;break;case 12:yl(t,e),Sl(e);break;case 31:yl(t,e),Sl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,vl(e,r)));break;case 13:yl(t,e),Sl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(ru=Fe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,vl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=rl,d=il;if(rl=u||a,il=d||l,yl(t,e),il=d,rl=u,Sl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||rl||il||Tl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Wu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Wu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Wu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,vl(e,n))));break;case 19:yl(t,e),Sl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,vl(e,r)));break;case 30:break;case 21:break;default:yl(t,e),Sl(e)}}function Sl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Qc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;tl(e,$c(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Jt(o,``),n.flags&=-33),tl(e,$c(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;el(e,$c(e),s);break;default:throw Error(i(161))}}catch(t){Wu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Cl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Cl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function wl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)ll(e,t.alternate,t),t=t.sibling}function Tl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Gc(4,t,t.return),Tl(t);break;case 1:Yc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&qc(t,t.return,n),Tl(t);break;case 27:pf(t.stateNode);case 26:case 5:Yc(t,t.return),Tl(t);break;case 22:t.memoizedState===null&&Tl(t);break;case 30:Tl(t);break;default:Tl(t)}e=e.sibling}}function El(e,t,n){for(n&&=!!(t.subtreeFlags&8772),t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:El(i,a,n),Wc(4,a);break;case 1:if(El(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Wu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Za(c[i],s)}catch(e){Wu(r,r.return,e)}}n&&o&64&&Kc(a),Jc(a,a.return);break;case 27:nl(a);case 26:case 5:El(i,a,n),n&&r===null&&o&4&&Xc(a),Jc(a,a.return);break;case 12:El(i,a,n);break;case 31:El(i,a,n),n&&o&4&&hl(i,a);break;case 13:El(i,a,n),n&&o&4&&gl(i,a);break;case 22:a.memoizedState===null&&El(i,a,n),Jc(a,a.return);break;case 30:break;default:El(i,a,n)}t=t.sibling}}function Dl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ua(n))}function Ol(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e))}function kl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Al(e,t,n,r),t=t.sibling}function Al(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:kl(e,t,n,r),i&2048&&Wc(9,t);break;case 1:kl(e,t,n,r);break;case 3:kl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ua(e)));break;case 12:if(i&2048){kl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Wu(t,t.return,e)}}else kl(e,t,n,r);break;case 31:kl(e,t,n,r);break;case 13:kl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?kl(e,t,n,r):(a._visibility|=2,jl(e,t,n,r,!!(t.subtreeFlags&10256)||!1)):a._visibility&2?kl(e,t,n,r):Ml(e,t),i&2048&&Dl(o,t);break;case 24:kl(e,t,n,r),i&2048&&Ol(t.alternate,t);break;default:kl(e,t,n,r)}}function jl(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:jl(a,o,s,c,i),Wc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,jl(a,o,s,c,i)):u._visibility&2?jl(a,o,s,c,i):Ml(a,o),i&&l&2048&&Dl(o.alternate,o);break;case 24:jl(a,o,s,c,i),i&&l&2048&&Ol(o.alternate,o);break;default:jl(a,o,s,c,i)}t=t.sibling}}function Ml(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ml(n,r),i&2048&&Dl(r.alternate,r);break;case 24:Ml(n,r),i&2048&&Ol(r.alternate,r);break;default:Ml(n,r)}t=t.sibling}}var Nl=8192;function Pl(e,t,n){if(e.subtreeFlags&Nl)for(e=e.child;e!==null;)Fl(e,t,n),e=e.sibling}function Fl(e,t,n){switch(e.tag){case 26:Pl(e,t,n),e.flags&Nl&&e.memoizedState!==null&&Gf(n,bl,e.memoizedState,e.memoizedProps);break;case 5:Pl(e,t,n);break;case 3:case 4:var r=bl;bl=gf(e.stateNode.containerInfo),Pl(e,t,n),bl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Nl,Nl=16777216,Pl(e,t,n),Nl=r):Pl(e,t,n));break;default:Pl(e,t,n)}}function Il(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ll(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];sl=r,Bl(r,e)}Il(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Rl(e),e=e.sibling}function Rl(e){switch(e.tag){case 0:case 11:case 15:Ll(e),e.flags&2048&&Gc(9,e,e.return);break;case 3:Ll(e);break;case 12:Ll(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,zl(e)):Ll(e);break;default:Ll(e)}}function zl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];sl=r,Bl(r,e)}Il(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Gc(8,t,t.return),zl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,zl(t));break;default:zl(t)}e=e.sibling}}function Bl(e,t){for(;sl!==null;){var n=sl;switch(n.tag){case 0:case 11:case 15:Gc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ua(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,sl=r;else a:for(n=e;sl!==null;){r=sl;var i=r.sibling,a=r.return;if(ul(r),r===n){sl=null;break a}if(i!==null){i.return=a,sl=i;break a}sl=a}}}var Vl={getCacheForType:function(e){var t=ra(ca),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return ra(ca).controller.signal}},Hl=typeof WeakMap==`function`?WeakMap:Map,H=0,Ul=null,U=null,W=0,G=0,Wl=null,Gl=!1,Kl=!1,ql=!1,Jl=0,Yl=0,Xl=0,Zl=0,Ql=0,$l=0,eu=0,tu=null,nu=null,K=!1,ru=0,iu=0,q=1/0,au=null,ou=null,J=0,su=null,cu=null,lu=0,uu=0,du=null,fu=null,pu=0,Y=null;function mu(){return H&2&&W!==0?W&-W:D.T===null?lt():dd()}function hu(){if($l===0){if(!(W&536870912)||L){var e=Ze;Ze<<=1,!(Ze&3932160)&&(Ze=262144),$l=e}else $l=536870912}return e=io.current,e!==null&&(e.flags|=32),$l}function gu(e,t,n){(e===Ul&&(G===2||G===9)||e.cancelPendingCommit!==null)&&(xu(e,0),vu(e,W,$l,!1)),at(e,n),(!(H&2)||e!==Ul)&&(e===Ul&&(!(H&2)&&(Zl|=n),Yl===4&&vu(e,W,$l,!1)),rd(e))}function X(e,t,n){if(H&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||tt(e,t),a=r?ku(e,t):Du(e,t,!0),o=r;do{if(a===0){Kl&&!r&&vu(e,t,0,!1);break}if(n=e.current.alternate,o&&!_u(n)){a=Du(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=tu;var l=c.current.memoizedState.isDehydrated;if(l&&(xu(c,s).flags|=256),s=Du(c,s,!1),s!==2){if(ql&&!l){c.errorRecoveryDisabledLanes|=o,Zl|=o,a=4;break a}o=nu,nu=a,o!==null&&(nu===null?nu=o:nu.push.apply(nu,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){xu(e,0),vu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:vu(r,t,$l,!Gl);break a;case 2:nu=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=ru+300-Fe(),10<a)){if(vu(r,t,$l,!Gl),et(r,0,!0)!==0)break a;lu=t,r.timeoutHandle=Kd(Z.bind(null,r,n,nu,au,K,t,$l,Zl,eu,Gl,o,`Throttled`,-0,0),a);break a}Z(r,n,nu,au,K,t,$l,Zl,eu,Gl,o,null,-0,0)}break}while(1);rd(e)}function Z(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:tn},Fl(t,a,d);var m=(a&62914560)===a?ru-Fe():(a&4194048)===a?iu-Fe():0;if(m=qf(d,m),m!==null){lu=a,e.cancelPendingCommit=m(Iu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),vu(e,a,o,!l);return}}Iu(e,t,a,n,r,i,o,s,c)}function _u(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!wr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function vu(e,t,n,r){t&=~Ql,t&=~Zl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ke(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&st(e,n,t)}function yu(){return H&6?!0:(id(0,!1),!1)}function bu(){if(U!==null){if(G===0)var e=U.return;else e=U,Yi=Ji=null,Mo(e),Na=null,Pa=0,e=U;for(;e!==null;)Uc(e.alternate,e),e=e.return;U=null}}function xu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),lu=0,bu(),Ul=e,U=n=fi(e.current,null),W=t,G=0,Wl=null,Gl=!1,Kl=tt(e,t),ql=!1,eu=$l=Ql=Zl=Xl=Yl=0,nu=tu=null,K=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Ke(r),a=1<<i;t|=e[i],r&=~a}return Jl=t,ni(),n}function Su(e,t){z=null,D.H=Bs,t===Ca||t===Ta?(t=ja(),G=3):t===wa?(t=ja(),G=4):G=t===ic?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Wl=t,U===null&&(Yl=1,Qs(e,bi(t,e.current)))}function Cu(){var e=io.current;return e===null?!0:(W&4194048)===W?ao===null:(W&62914560)===W||W&536870912?e===ao:!1}function wu(){var e=D.H;return D.H=Bs,e===null?Bs:e}function Tu(){var e=D.A;return D.A=Vl,e}function Eu(){Yl=4,Gl||(W&4194048)!==W&&io.current!==null||(Kl=!0),!(Xl&134217727)&&!(Zl&134217727)||Ul===null||vu(Ul,W,$l,!1)}function Du(e,t,n){var r=H;H|=2;var i=wu(),a=Tu();(Ul!==e||W!==t)&&(au=null,xu(e,t)),t=!1;var o=Yl;a:do try{if(G!==0&&U!==null){var s=U,c=Wl;switch(G){case 8:bu(),o=6;break a;case 3:case 2:case 9:case 6:io.current===null&&(t=!0);var l=G;if(G=0,Wl=null,Nu(e,s,c,l),n&&Kl){o=0;break a}break;default:l=G,G=0,Wl=null,Nu(e,s,c,l)}}Ou(),o=Yl;break}catch(t){Su(e,t)}while(1);return t&&e.shellSuspendCounter++,Yi=Ji=null,H=r,D.H=i,D.A=a,U===null&&(Ul=null,W=0,ni()),o}function Ou(){for(;U!==null;)ju(U)}function ku(e,t){var n=H;H|=2;var r=wu(),a=Tu();Ul!==e||W!==t?(au=null,q=Fe()+500,xu(e,t)):Kl=tt(e,t);a:do try{if(G!==0&&U!==null){t=U;var o=Wl;b:switch(G){case 1:G=0,Wl=null,Nu(e,t,o,1);break;case 2:case 9:if(Da(o)){G=0,Wl=null,Mu(t);break}t=function(){G!==2&&G!==9||Ul!==e||(G=7),rd(e)},o.then(t,t);break a;case 3:G=7;break a;case 4:G=5;break a;case 7:Da(o)?(G=0,Wl=null,Mu(t)):(G=0,Wl=null,Nu(e,t,o,7));break;case 5:var s=null;switch(U.tag){case 26:s=U.memoizedState;case 5:case 27:var c=U;if(s?Wf(s):c.stateNode.complete){G=0,Wl=null;var l=c.sibling;if(l!==null)U=l;else{var u=c.return;u===null?U=null:(U=u,Pu(u))}break b}}G=0,Wl=null,Nu(e,t,o,5);break;case 6:G=0,Wl=null,Nu(e,t,o,6);break;case 8:bu(),Yl=6;break a;default:throw Error(i(462))}}Au();break}catch(t){Su(e,t)}while(1);return Yi=Ji=null,D.H=r,D.A=a,H=n,U===null?(Ul=null,W=0,ni(),Yl):0}function Au(){for(;U!==null&&!Ne();)ju(U)}function ju(e){var t=Pc(e.alternate,e,Jl);e.memoizedProps=e.pendingProps,t===null?Pu(e):U=t}function Mu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=vc(n,t,t.pendingProps,t.type,void 0,W);break;case 11:t=vc(n,t,t.pendingProps,t.type.render,t.ref,W);break;case 5:Mo(t);default:Uc(n,t),t=U=pi(t,Jl),t=Pc(n,t,Jl)}e.memoizedProps=e.pendingProps,t===null?Pu(e):U=t}function Nu(e,t,n,r){Yi=Ji=null,Mo(t),Na=null,Pa=0;var i=t.return;try{if(rc(e,i,t,n,W)){Yl=1,Qs(e,bi(n,e.current)),U=null;return}}catch(t){if(i!==null)throw U=i,t;Yl=1,Qs(e,bi(n,e.current)),U=null;return}t.flags&32768?(L||r===1?e=!0:Kl||W&536870912?e=!1:(Gl=e=!0,(r===2||r===9||r===3||r===6)&&(r=io.current,r!==null&&r.tag===13&&(r.flags|=16384))),Fu(t,e)):Pu(t)}function Pu(e){var t=e;do{if(t.flags&32768){Fu(t,Gl);return}e=t.return;var n=Vc(t.alternate,t,Jl);if(n!==null){U=n;return}if(t=t.sibling,t!==null){U=t;return}U=t=e}while(t!==null);Yl===0&&(Yl=5)}function Fu(e,t){do{var n=Hc(e.alternate,e);if(n!==null){n.flags&=32767,U=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){U=e;return}U=e=n}while(e!==null);Yl=6,U=null}function Iu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Vu();while(J!==0);if(H&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ti,ot(e,n,o,s,c,l),e===Ul&&(U=Ul=null,W=0),cu=t,su=e,lu=n,uu=o,du=a,fu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(ze,function(){return Hu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=D.T,D.T=null,a=O.p,O.p=2,s=H,H|=4;try{cl(e,t,n)}finally{H=s,O.p=a,D.T=r}}J=1,Lu(),Ru(),zu()}}function Lu(){if(J===1){J=0;var e=su,t=cu,n=!!(t.flags&13878);if(t.subtreeFlags&13878||n){n=D.T,D.T=null;var r=O.p;O.p=2;var i=H;H|=4;try{xl(t,e);var a=zd,o=kr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Or(s.ownerDocument.documentElement,s)){if(c!==null&&Ar(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Dr(s,h),v=Dr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{H=i,O.p=r,D.T=n}}e.current=t,J=2}}function Ru(){if(J===2){J=0;var e=su,t=cu,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=D.T,D.T=null;var r=O.p;O.p=2;var i=H;H|=4;try{ll(e,t.alternate,t)}finally{H=i,O.p=r,D.T=n}}J=3}}function zu(){if(J===4||J===3){J=0,Pe();var e=su,t=cu,n=lu,r=fu;t.subtreeFlags&10256||t.flags&10256?J=5:(J=0,cu=su=null,Bu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ou=null),M(n),t=t.stateNode,k&&typeof k.onCommitFiberRoot==`function`)try{k.onCommitFiberRoot(We,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=D.T,i=O.p,O.p=2,D.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{D.T=t,O.p=i}}lu&3&&Vu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===Y?pu++:(pu=0,Y=e):pu=0,id(0,!1)}}function Bu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ua(t)))}function Vu(){return Lu(),Ru(),zu(),Hu()}function Hu(){if(J!==5)return!1;var e=su,t=uu;uu=0;var n=M(lu),r=D.T,a=O.p;try{O.p=32>n?32:n,D.T=null,n=du,du=null;var o=su,s=lu;if(J=0,cu=su=null,lu=0,H&6)throw Error(i(331));var c=H;if(H|=4,Rl(o.current),Al(o,o.current,s,n),H=c,id(0,!1),k&&typeof k.onPostCommitFiberRoot==`function`)try{k.onPostCommitFiberRoot(We,o)}catch{}return!0}finally{O.p=a,D.T=r,Bu(e,t)}}function Uu(e,t,n){t=bi(n,t),t=ec(e.stateNode,t,2),e=Ga(e,t,2),e!==null&&(at(e,2),rd(e))}function Wu(e,t,n){if(e.tag===3)Uu(e,e,n);else for(;t!==null;){if(t.tag===3){Uu(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ou===null||!ou.has(r))){e=bi(n,e),n=tc(2),r=Ga(t,n,2),r!==null&&(nc(n,r,t,e),at(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Hl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ql=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ul===e&&(W&n)===n&&(Yl===4||Yl===3&&(W&62914560)===W&&300>Fe()-ru?!(H&2)&&xu(e,0):Ql|=n,eu===W&&(eu=0)),rd(e)}function qu(e,t){t===0&&(t=rt()),e=ai(e,t),e!==null&&(at(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return je(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ke(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=W,a=et(r,r===Ul?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||tt(r,a)||(n=!0,ld(r,a))}r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Fe(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}J!==0&&J!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ke(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=nt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Ul,n=W,n=et(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(G===2||G===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Me(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||tt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Me(r),M(n)){case 2:case 8:n=Re;break;case 32:n=ze;break;case 268435456:n=Ve;break;default:n=ze}return r=cd.bind(null,e),n=je(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Me(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(J!==0&&J!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Vu()&&e.callbackNode!==n)return null;var r=W;return r=et(e,e===Ul?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(X(e,r,t),sd(e,Fe()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Vu())return null;X(e,t,!0)}function ud(){Yd(function(){H&6?je(Le,ad):od()})}function dd(){if(nd===0){var e=pa;e===0&&(e=Xe,Xe<<=1,!(Xe&261888)&&(Xe=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:I(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[pt]||null).action),o=r.submitter;o&&(t=(t=o[pt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Cn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Es(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Es(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<Xr.length;hd++){var gd=Xr[hd];Zr(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}Zr(Hr,`onAnimationEnd`),Zr(Ur,`onAnimationIteration`),Zr(Wr,`onAnimationStart`),Zr(`dblclick`,`onDoubleClick`),Zr(`focusin`,`onFocus`),Zr(`focusout`,`onBlur`),Zr(Gr,`onTransitionRun`),Zr(Kr,`onTransitionStart`),Zr(qr,`onTransitionCancel`),Zr(Jr,`onTransitionEnd`),Ot(`onMouseEnter`,[`mouseout`,`mouseover`]),Ot(`onMouseLeave`,[`mouseout`,`mouseover`]),Ot(`onPointerEnter`,[`pointerout`,`pointerover`]),Ot(`onPointerLeave`,[`pointerout`,`pointerover`]),Dt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Dt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Dt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Dt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Dt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Dt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Qr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Qr(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[ht];n===void 0&&(n=t[ht]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,Tt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!fn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=bt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}ln(function(){var r=a,i=rn(n),s=[];a:{var c=Yr.get(e);if(c!==void 0){var l=Cn,u=e;switch(e){case`keypress`:if(vn(n)===0)break a;case`keydown`:case`keyup`:l=Vn;break;case`focusin`:u=`focus`,l=Mn;break;case`focusout`:u=`blur`,l=Mn;break;case`beforeblur`:case`afterblur`:l=Mn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=An;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=jn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Un;break;case Hr:case Ur:case Wr:l=Nn;break;case Jr:l=Wn;break;case`scroll`:case`scrollend`:l=Tn;break;case`wheel`:l=Gn;break;case`copy`:case`cut`:case`paste`:l=Pn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Hn;break;case`toggle`:case`beforetoggle`:l=Kn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=un(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==nn&&(u=n.relatedTarget||n.fromElement)&&(bt(u)||u[mt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?bt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=An,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Hn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:St(l),h=u==null?c:St(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,bt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?St(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=fr;else if(or(c)){if(pr)v=Sr;else{v=br;var y=yr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Qt(r.elementType)&&(v=fr):v=xr;if(v&&=v(e,r)){sr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Wt(c,`number`,c.value)}switch(y=r?St(r):window,e){case`focusin`:(or(y)||y.contentEditable===`true`)&&(Mr=y,Nr=r,Pr=null);break;case`focusout`:Pr=Nr=Mr=null;break;case`mousedown`:Fr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Fr=!1,Ir(s,n,i);break;case`selectionchange`:if(jr)break;case`keydown`:case`keyup`:Ir(s,n,i)}var b;if(Jn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else nr?er(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Zn&&n.locale!==`ko`&&(nr||x!==`onCompositionStart`?x===`onCompositionEnd`&&nr&&(b=_n()):(mn=i,hn=`value`in mn?mn.value:mn.textContent,nr=!0)),y=Ed(r,x),0<y.length&&(x=new Fn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=tr(n),b!==null&&(x.data=b)))),(b=Xn?rr(e,n):ir(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Fn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=un(e,n),i!=null&&r.unshift(Td(e,i,a)),i=un(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=un(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=un(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Jt(e,``+r);break;case`className`:Pt(e,`class`,r);break;case`tabIndex`:Pt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Pt(e,n,r);break;case`style`:Zt(e,r,o);break;case`data`:if(t!==`object`){Pt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=I(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=I(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=I(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Nt(e,`popover`,r);break;case`xlinkActuate`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Ft(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Ft(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Ft(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Ft(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Nt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=$t.get(n)||n,Nt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Zt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Jt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Jt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Et.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[pt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Nt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}F(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Gt(e,!!r,n,!0):Gt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}qt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(Qt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Ut(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Gt(e,!!n,n?[]:``,!1):Gt(e,!!n,t,!0)):Gt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Kt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Qt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e!==Wd&&(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[yt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body)}n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),N(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[yt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);N(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=O.d;O.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=yu();return e||t}function yf(e){var t=xt(e);t!==null&&t.tag===5&&t.type===`form`?Os(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Ht(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),wt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Ht(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Ht(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Ht(n.imageSizes)+`"]`)):i+=`[href="`+Ht(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=m({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),wt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Ht(r)+`"][href="`+Ht(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=m({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),wt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Ct(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=m({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);wt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Ct(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),wt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Ct(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=m({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),wt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=_e.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Ct(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Ct(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Ct(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Ht(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return m({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),wt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Ht(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Ht(n.href)+`"]`);if(r)return t.instance=r,wt(r),r;var a=m({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),wt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,wt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),wt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,wt(a),a):(r=n,(a=mf.get(o))&&(r=m({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),wt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[yt]||a[ft]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,wt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),wt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=it(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=it(0),this.hiddenUpdates=it(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ui(3,null,null,t),e.current=a,a.stateNode=e,t=la(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ha(a),e}function tp(e){return e?(e=ci,e):ci}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Wa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ga(e,r,t),n!==null&&(gu(n,e,t),Ka(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ai(e,67108864);t!==null&&gu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=mu();t=j(t);var n=ai(e,t);n!==null&&gu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=D.T;D.T=null;var a=O.p;try{O.p=2,up(e,t,n,r)}finally{O.p=a,D.T=i}}function lp(e,t,n,r){var i=D.T;D.T=null;var a=O.p;try{O.p=8,up(e,t,n,r)}finally{O.p=a,D.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=xt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=$e(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ke(o);s.entanglements[1]|=c,o&=~c}rd(a),!(H&6)&&(q=Fe()+500,id(0,!1))}}break;case 31:case 13:s=ai(a,2),s!==null&&gu(s,a,2),yu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=rn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=bt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ie()){case Le:return 2;case Re:return 8;case ze:case Be:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=xt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=bt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,ut(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,ut(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);nn=r,n.target.dispatchEvent(r),nn=null}else return t=xt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=xt(n);a!==null&&(e.splice(t,3),t-=3,Es(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[pt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[pt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,mu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),yu(),t[mt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=lt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.8`)throw Error(i(527,Lp,`19.2.8`));O.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.8`,rendererPackageName:`react-dom`,currentDispatcherRef:D,reconcilerVersion:`19.2.8`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{We=zp.inject(Rp),k=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Ys,s=Xs,c=Zs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[mt]=t.current,Sd(e),new Fp(t)}})),_=l(o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()}))(),1),v={enableRender:!0,resolutionScale:.5,"resolution/width":1920,"resolution/height":1080,viewType:`render`,"frameLoop/enabled":!1,"frameLoop/start":0,"frameLoop/end":0,selectedEntityId:`34e12786-4d92-4f7c-8d33-32730687bdb6`,selectedAsset:{name:`OREngineCube`,assetType:`material`},navigateAsset:null,propertyTarget:`entity`,cameraMode:`preview`,gizmoMode:`translate`,"helpers/show":!0,"helpers/empty":!0,"helpers/camera":!0,"helpers/light":!0,"helpers/wireframe":!1,"camera/position":[.05483466718929176,2.1441760888120505,12.417943092713458],"camera/target":[0,0,0]},y={name:`demo-webgl`,scene:{name:`root`,uuid:`0`,components:[{name:`BLidgeClient`,uuid:`1`,props:{mode:`json`,gltf:!0,gltfPath:`/scene.glb`,"websocket/url":`ws://localhost:3100`,attachments:[{name:`Camera`,components:[{name:`Camera`,uuid:`4ec0479f-f58f-4644-a7f4-0204813c5c99`},{name:`CameraController`,uuid:`3d0e3c4f-7110-43bc-917a-00850232c7b1`}]},{name:`OREngine`,components:[{name:`OREngineLogo`,uuid:`2999221c-8614-47c8-91a4-129c6585343f`}]},{name:`OREngineCube`,components:[{name:`OREngineCube`,uuid:`056176b4-e208-42ce-bd17-5ea264f09d86`}]},{name:`SkyBox`,components:[{name:`SkyBox`,uuid:`38b46f5d-36cb-49af-b6b2-57643941c4d5`}]}]}}]},renderer:{"sky/skyColor":[1,1,1],"sky/groundColor":[.3,.3,.3],"sky/intensity":1,"pipeline/motionBlur/enabled":!0,"pipeline/motionBlur/power":1,"pipeline/ssr/enabled":!0,"pipeline/ssao/enabled":!0,"pipeline/dof/enabled":!0,"pipeline/lightShaft/enabled":!0},"timeline/duration":600,"timeline/fps":60},b=l(p(),1),x=(0,b.createContext)(null),S={didCatch:!1,error:null},C=class extends b.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=S}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(...e){let{error:t}=this.state;t!==null&&(this.props.onReset?.({args:e,reason:`imperative-api`}),this.setState(S))}componentDidCatch(e,t){this.props.onError?.(e,t)}componentDidUpdate(e,t){let{didCatch:n}=this.state,{resetKeys:r}=this.props;n&&t.error!==null&&w(e.resetKeys,r)&&(this.props.onReset?.({next:r,prev:e.resetKeys,reason:`keys`}),this.setState(S))}render(){let{children:e,fallbackRender:t,FallbackComponent:n,fallback:r}=this.props,{didCatch:i,error:a}=this.state,o=e;if(i){let e={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof t==`function`)o=t(e);else if(n)o=(0,b.createElement)(n,e);else if(r!==void 0)o=r;else throw a}return(0,b.createElement)(x.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},o)}};function w(e=[],t=[]){return e.length!==t.length||e.some((e,n)=>!Object.is(e,t[n]))}var T={layout:`LayoutSplit__layout___Lmxhe`,item:`LayoutSplit__item___Lmxhe`,item_inner:`LayoutSplit__item_inner___Lmxhe`,splitter:`LayoutSplit__splitter___Lmxhe`,dragging:`LayoutSplit__dragging___Lmxhe`,horizontal:`LayoutSplit__horizontal___Lmxhe`,vertical:`LayoutSplit__vertical___Lmxhe`},ee=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),E=o(((e,t)=>{t.exports=ee()}))(),te=e=>{let t={...e.style},n=e._ratio;if(typeof n==`number`){let r=e._totalSplitterSize??0;t.flex=`0 0 calc( ${n*100}% - ${r*n}px )`}else e.size===void 0?t.flex=e.flex??1:(t.flexShrink=0,t.flexGrow=0,t.flexBasis=typeof e.size==`number`?`${e.size}px`:e.size);e.overflow&&(t.overflow=`auto`);let r=e.padding?(0,E.jsx)(`div`,{className:T.item_inner,children:e.children}):e.children;return(0,E.jsx)(`div`,{className:T.item,style:t,children:r})},ne=2,re=(e,t)=>{if(!e)return null;try{let n=localStorage.getItem(e);if(!n)return null;let r=JSON.parse(n);return r&&typeof r==`object`&&r.v===ne&&Array.isArray(r.sizes)&&r.sizes.length===t?r.sizes.map(e=>typeof e==`number`?e:null):null}catch{return null}},ie=e=>{let t=e.direction||`horizontal`,n=e.splitterSize??4,r=e.enableTouch!==!1,i=e.storageKey,a=e.ratios!==void 0,o=e.onRatiosChange,s=b.Children.toArray(e.children).filter(e=>b.isValidElement(e)),[c,l]=(0,b.useState)(()=>(a?null:re(i,s.length))??Array(s.length).fill(null)),u=(0,b.useRef)(c);u.current=c;let[d,f]=(0,b.useState)(null),p=(0,b.useRef)(null);(0,b.useEffect)(()=>{if(!a&&u.current.length!==s.length){let e=re(i,s.length)??Array(s.length).fill(null);u.current=e,l(e)}},[s.length,i,a]);let m=(0,b.useCallback)((e,n)=>{e.preventDefault(),f(n);let c=p.current;if(!c)return;let d=c.getBoundingClientRect(),m=t===`horizontal`?c.clientWidth:c.clientHeight,h=t===`horizontal`?d.width:d.height,g=m>0?h/m:1,_=`touches`in e?t===`horizontal`?e.touches[0].clientX:e.touches[0].clientY:t===`horizontal`?e.clientX:e.clientY,v=Array.from(c.children).filter(e=>e instanceof HTMLElement&&e.classList.contains(T.item)),y=v.map(e=>t===`horizontal`?e.clientWidth:e.clientHeight),b=v[n],x=v[n+1];if(!b||!x)return;let S=s[n].props.minSize??50,C=s[n+1].props.minSize??50,w=y[n]+y[n+1],ee=null,E=y[n],te=y[n+1],re=e=>{let r=((`touches`in e?t===`horizontal`?e.touches[0].clientX:e.touches[0].clientY:t===`horizontal`?e.clientX:e.clientY)-_)/g,i=y[n]+r,a=y[n+1]-r;i<S&&(i=S,a=w-S),a<C&&(a=C,i=w-C),E=i,te=a,ee===null&&(ee=requestAnimationFrame(()=>{ee=null,b.style.flex=`0 0 ${E}px`,x.style.flex=`0 0 ${te}px`}))},ie=()=>{ee!==null&&(cancelAnimationFrame(ee),ee=null),window.removeEventListener(`mousemove`,re),window.removeEventListener(`mouseup`,ie),window.removeEventListener(`touchmove`,re),window.removeEventListener(`touchend`,ie),f(null);let e=[...y];e[n]=E,e[n+1]=te;let t=e.reduce((e,t)=>e+t,0);if(a){t>0&&o?.(e.map(e=>e/t));return}let r=u.current.map((n,r)=>t>0?e[r]/t:null);if(u.current=r,l(r),i)try{localStorage.setItem(i,JSON.stringify({v:ne,sizes:r}))}catch{}};window.addEventListener(`mousemove`,re),window.addEventListener(`mouseup`,ie),r&&(window.addEventListener(`touchmove`,re,{passive:!1}),window.addEventListener(`touchend`,ie))},[t,s,i,r,a,o]);return(0,E.jsx)(`div`,{ref:p,className:T.layout,"data-direction":t,children:s.map((i,o)=>{let l=o===s.length-1,u=(a?e.ratios[o]:c[o])??null,f=[T.splitter,T[t],d===o?T.dragging:``].filter(Boolean).join(` `),p=t===`horizontal`?{width:`${n}px`}:{height:`${n}px`};return(0,E.jsxs)(b.Fragment,{children:[(0,E.jsx)(te,{...i.props,_ratio:u,_totalSplitterSize:(s.length-1)*n}),!l&&(0,E.jsx)(`div`,{className:f,style:p,onMouseDown:e=>m(e,o),onTouchStart:r?e=>m(e,o):void 0})]},o)})})};ie.Item=te;var ae={panel:`Panel__panel___LnBhb`,content:`Panel__content___LnBhb`},oe=e=>(0,E.jsx)(`div`,{className:ae.panel,children:(0,E.jsx)(`div`,{className:ae.content,style:{padding:e.noPadding?`0 0`:void 0},children:e.children})}),se={panelContainer:`PanelContainer__panelContainer___LnBhb`,header:`PanelContainer__header___LnBhb`,header_item:`PanelContainer__header_item___LnBhb`,header_add:`PanelContainer__header_add___LnBhb`,content:`PanelContainer__content___LnBhb`},ce=e=>(0,E.jsx)(E.Fragment,{children:e.children}),D=e=>{let t=e.children||[],n=(Array.isArray(t)?t.flat():[t]).filter(e=>b.isValidElement(e)),[r,i]=(0,b.useState)(()=>{if(e.storageKey)try{let t=localStorage.getItem(e.storageKey);if(t!==null){let e=parseInt(t,10);if(!isNaN(e)&&e>=0)return e}}catch{}if(e.defaultTabTitle){let t=n.findIndex(t=>t.props.title===e.defaultTabTitle);if(t>=0)return t}return 0}),a=n.length>0&&r>=n.length?0:r;if(e.tabs){let t=e.tabs.find(t=>t.id===e.active)??e.tabs[0];return(0,E.jsxs)(`div`,{className:se.panelContainer,children:[(0,E.jsxs)(`div`,{className:se.header,"data-panel-tab-header":``,children:[e.tabs.map(n=>(0,E.jsx)(`div`,{className:se.header_item,onClick:()=>e.onSelect?.(n.id),onContextMenu:t=>e.onTabContextMenu?.(n.id,t),onPointerDown:t=>e.onTabPointerDown?.(n.id,t),"data-active":n.id===t?.id,"data-panel-tab-id":n.id,children:(0,E.jsx)(`p`,{children:n.title})},n.id)),e.onAddClick&&(0,E.jsx)(`div`,{className:se.header_add,onClick:e.onAddClick,children:`+`})]}),(0,E.jsx)(`div`,{className:se.content,"data-panel-content":``,children:t?.content})]})}let o=t=>{if(i(t),e.storageKey)try{localStorage.setItem(e.storageKey,String(t))}catch{}};return(0,E.jsxs)(`div`,{className:se.panelContainer,children:[(0,E.jsx)(`div`,{className:se.header,children:n.map((e,t)=>(0,E.jsx)(`div`,{className:se.header_item,onClick:()=>o(t),"data-active":t==a,children:(0,E.jsx)(`p`,{children:e.props.title})},t))}),(0,E.jsx)(`div`,{className:se.content,children:n[a]})]})};D.Tab=ce;var O=900,le=()=>{let[e,t]=(0,b.useState)(!1);return(0,b.useEffect)(()=>{let e=null,n=()=>{let n=window.innerWidth;(e===null||(n-O)*(e-O)<=0)&&t(n<=O),e=n};return n(),window.addEventListener(`resize`,n),()=>{window.removeEventListener(`resize`,n)}},[]),{isPC:!e,isSP:e}},ue={arrow:`ArrowIcon__arrow___LmFyc`},de=({open:e})=>(0,E.jsx)(`div`,{className:ue.arrow,"data-open":e,children:(0,E.jsxs)(`svg`,{width:`10`,height:`10`,viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`g`,{clipPath:`url(#clip0_57_2)`,children:(0,E.jsx)(`path`,{d:`M18 10L3 18.6603L3 1.33974L18 10Z`,fill:`#D9D9D9`})}),(0,E.jsx)(`defs`,{children:(0,E.jsx)(`clipPath`,{id:`clip0_57_2`,children:(0,E.jsx)(`rect`,{width:`20`,height:`20`,fill:`white`})})})]})}),fe={block:`Block__block___LmJsb`,head:`Block__head___LmJsb`,head_icon:`Block__head_icon___LmJsb`,head_text:`Block__head_text___LmJsb`,content:`Block__content___LmJsb`},pe=e=>{let[t,n]=b.useState(!e.defaultClose),r=(0,b.useCallback)(()=>{e.accordion===!0&&n(!t)},[t,e.accordion]),i=e.bg&&typeof e.bg==`string`&&e.bg||void 0;return(0,E.jsxs)(`div`,{className:fe.block,"data-bg":e.bg!==void 0,"data-nomargin":e.noMargin,"data-no_indent":e.noIndent,style:{backgroundColor:i},children:[(0,E.jsxs)(`div`,{className:fe.head,"data-accordion":e.accordion,"data-open":t,children:[e.accordion&&(0,E.jsx)(`div`,{className:fe.head_icon,onClick:r,children:(0,E.jsx)(de,{open:t})}),e.label&&(0,E.jsx)(`span`,{className:fe.head_text,children:e.label})]}),t&&(0,E.jsx)(`div`,{className:fe.content,"data-open":t,"data-no_indent":e.noIndent,children:e.children})]})},me={container:`Label__container___LmNvb`,label:`Label__label___LmNvb`,item:`Label__item___LmNvb`},he=e=>(0,E.jsxs)(`div`,{className:me.container,"data-vertical":e.vertical,children:[(0,E.jsx)(`div`,{className:me.label,style:{textAlign:e.labelAlign||`left`},"data-vertical":e.vertical,children:e.title}),(0,E.jsx)(`div`,{className:me.item,"data-vertical":e.vertical,children:e.children})]}),ge={button:`Button__button___LmJ1d`},_e=e=>(0,E.jsx)(`button`,{className:ge.button,onClick:t=>{e.onClick&&e.onClick(t),t.preventDefault()},type:e.type||`button`,children:e.children}),ve=()=>(0,E.jsxs)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{x:`2`,y:`10.8486`,width:`2.61726`,height:`7.84447`,transform:`rotate(-44.9331 2 10.8486)`,fill:`#D9D9D9`}),(0,E.jsx)(`rect`,{x:`9.38757`,y:`14.5518`,width:`2.57272`,height:`12.3494`,transform:`rotate(-135 9.38757 14.5518)`,fill:`#D9D9D9`})]}),ye={inputBoolean:`InputCheckBox__inputBoolean___Lmluc`,input:`InputCheckBox__input___Lmluc`,check:`InputCheckBox__check___Lmluc`},be=({onChange:e,...t})=>(0,E.jsx)(`div`,{className:ye.inputBoolean,onClick:e=>{e.stopPropagation()},children:(0,E.jsxs)(`label`,{children:[(0,E.jsx)(`input`,{className:ye.input,type:`checkbox`,checked:t.checked,disabled:t.disabled,readOnly:t.readOnly,onChange:n=>{t.readOnly||e&&e(n.target.checked)}}),(0,E.jsx)(`div`,{className:ye.check,"data-read_only":t.readOnly,children:t.checked&&(0,E.jsx)(ve,{})})]})}),xe={input:`InputColor__input___Lmluc`},Se=e=>`#`+e.slice(0,3).map(e=>Math.round(Math.min(Math.max(e,0),1)*255).toString(16).padStart(2,`0`)).join(``),Ce=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255),we=e=>{let t=e.value||[1,1,1];return(0,E.jsx)(`div`,{className:xe.inputColor,children:(0,E.jsx)(`input`,{className:xe.input,type:`color`,value:Se(t),disabled:e.disabled||e.readOnly,onChange:t=>{e.onChange&&e.onChange(Ce(t.target.value))}})})},Te=(0,b.createContext)(null),Ee=()=>{let e=(0,b.useContext)(Te);if(e===null)throw Error(`useInputWindow must be used within InputWindowContext`);return e},De=()=>typeof navigator>`u`?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Oe=()=>(0,b.useMemo)(()=>De(),[]),ke={input:`InputNumber__input___Lmluc`},Ae=3,je=e=>{let{open:t}=Ee(),n=Oe(),r=(0,b.useRef)(null),[i,a]=(0,b.useState)(!1),[o,s]=(0,b.useState)(``),c=(0,b.useRef)(!1),l=(0,b.useRef)(null),u=(0,b.useRef)(!1),d=(0,b.useRef)(void 0);d.current=e.onChange;let f=(0,b.useRef)(void 0);f.current=e.value;let p=(0,b.useCallback)(t=>{let n=f.current;if(c.current===!1)return;let r=l.current;if(r){let e=t.clientX-r.x,n=t.clientY-r.y;Math.sqrt(e*e+n*n)>=Ae&&(u.current=!0)}if(!u.current)return;let i=t.movementX;if(typeof n==`number`){let r=i*.05*(e.step||1);d.current&&d.current(n+r),t.stopPropagation()}t.preventDefault()},[e.step]),m=(0,b.useCallback)(()=>{e.readOnly||e.disabled||t({type:`number`,value:f.current??0,step:e.step,min:e.min,max:e.max,precision:e.precision,onChange:e=>{d.current&&d.current(e)}})},[t,e.step,e.min,e.max,e.precision,e.readOnly,e.disabled]),h=(0,b.useCallback)(t=>{t.preventDefault(),c.current=!0,l.current={x:t.clientX,y:t.clientY},u.current=!1;let i=()=>{u.current||(n?m():(a(!0),s(String(Number((f.current??0).toFixed(e.precision??3)))),requestAnimationFrame(()=>{r.current?.focus(),r.current?.select()}))),c.current=!1,l.current=null,u.current=!1,window.removeEventListener(`pointerup`,i),n||window.removeEventListener(`pointermove`,p)};window.addEventListener(`pointerup`,i),n||window.addEventListener(`pointermove`,p)},[p,n,m,e.precision]),g=i?o:String(Number((e.value??0).toFixed(e.precision??3)));return(0,E.jsx)(`div`,{className:ke.inputNumber,children:(0,E.jsx)(`input`,{ref:r,className:ke.input,type:i?`text`:`number`,inputMode:i?`decimal`:void 0,value:g,disabled:e.disabled,readOnly:n||e.readOnly,"data-lo":e.readOnly,step:e.step||1,min:e.min,max:e.max,onBlur:()=>{if(i&&(a(!1),e.onChange)){let t=Number(o);e.onChange(isNaN(t)?0:t)}},onChange:e=>{s(e.target.value)},onKeyDown:e=>{e.key===`Enter`&&r.current?.blur()},onPointerDown:h})})},Me={inputSelect:`InputSelect__inputSelect___Lmluc`,input:`InputSelect__input___Lmluc`},Ne=({onChange:e,value:t,...n})=>{if(n.readOnly)return(0,E.jsx)(`div`,{className:Me.inputSelect,children:(0,E.jsx)(`input`,{className:Me.input,value:t,readOnly:!0})});let r=n.selectList;return typeof r==`function`&&(r=r()),(0,E.jsx)(`div`,{className:Me.inputSelect,children:(0,E.jsx)(`select`,{className:Me.input,onChange:t=>{e&&e(t.target.value)},value:t,children:r.map((e,t)=>{let n=``,r=``;return typeof e==`string`?(n=e,r=e):(n=e.label,r=e.value),(0,E.jsx)(`option`,{value:r,children:n},t)})})})},Pe={input:`InputText__input___Lmluc`},Fe=({onChange:e,value:t,...n})=>{let{open:r}=Ee(),i=Oe(),[a,o]=(0,b.useState)(t),s=(0,b.useCallback)(()=>{e&&e(a)},[a,e]);(0,b.useEffect)(()=>{o(t)},[t]);let c=(0,b.useCallback)(()=>{!i||n.readOnly||n.disabled||r({type:`text`,value:a,onChange:t=>{e&&e(t)}})},[i,a,e,r,n.readOnly,n.disabled]);return(0,E.jsx)(`div`,{className:Pe.container,children:(0,E.jsx)(`input`,{className:Pe.input,type:`text`,value:a,placeholder:n.readOnly?`-`:``,disabled:n.disabled,readOnly:i||n.readOnly,"data-lo":n.readOnly,onChange:e=>{o(e.target.value)},onBlur:()=>{s()},onClick:c,onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur()}})})},Ie={},Le=[`x`,`y`,`z`,`w`],Re=({onChange:e,disabled:t,...n})=>{let r=(0,b.useRef)(void 0);r.current=n.value;let i=(0,b.useCallback)((t,n)=>{if(e&&r.current){let i={};for(let e=0;e<r.current.length;e++)i[e]=r.current[e];i[t]=n,e(i)}},[e]),a=[];for(let e=0;e<n.value.length;e++)a.push((0,E.jsx)(he,{title:Le[e],labelAlign:`right`,children:(0,E.jsx)(je,{disabled:t,value:n.value[e],step:n.step,onChange:t=>{i(e,t)}})},e));return(0,E.jsx)(`div`,{className:Ie.vector,children:a.map(e=>e)})},ze=(0,b.createContext)(null),Be=()=>{let e=(0,b.useContext)(ze);if(e===null)throw Error(`useEditor must be used within a EditorProvider`);return e},Ve=e=>{let{engine:t}=Be(),n=(0,b.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{n.components.forEach(r=>{e.push({label:`${n.getScenePath(t.root)} > ${r.constructor.name}`,value:r.uuid})})}),e},[t]),[r,i]=(0,b.useState)(n);return(0,b.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,E.jsx)(`div`,{className:Me.inputSelect,children:(0,E.jsx)(`select`,{className:Me.input,onChange:t=>{e.onChange&&e.onChange(t.target.value||null)},value:e.value||``,children:r.map((e,t)=>{let n=typeof e==`string`?e:e.label,r=typeof e==`string`?e:e.value;return(0,E.jsx)(`option`,{value:r,children:n},t)})})})},He=e=>{let{engine:t}=Be(),n=(0,b.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{e.push({label:n.getScenePath(t.root),value:n.uuid})}),e},[t]),[r,i]=(0,b.useState)(n);return(0,b.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,E.jsx)(`div`,{className:Me.inputSelect,children:(0,E.jsx)(`select`,{className:Me.input,onChange:t=>{e.onChange&&e.onChange(t.target.value||null)},value:e.value||``,children:r.map((e,t)=>{let n=typeof e==`string`?e:e.label,r=typeof e==`string`?e:e.value;return(0,E.jsx)(`option`,{value:r,children:n},t)})})})},Ue={inputResourceSelect:`InputResourceSelect__inputResourceSelect___Lmluc`,select:`InputResourceSelect__select___Lmluc`,editButton:`InputResourceSelect__editButton___Lmluc`},We=e=>{let{editor:t}=Be(),n=(0,b.useCallback)(()=>{e.value&&(t.setField(`navigateAsset`,{assetType:e.resourceType,name:String(e.value)}),t.setField(`selectedAsset`,{name:String(e.value),assetType:e.resourceType}))},[t,e.value,e.resourceType]);return(0,E.jsxs)(`div`,{className:Ue.inputResourceSelect,children:[(0,E.jsx)(`div`,{className:Ue.select,children:(0,E.jsx)(Ne,{value:e.value,selectList:e.selectList,onChange:e.onChange})}),e.value&&(0,E.jsx)(`button`,{className:Ue.editButton,onClick:n,title:`Edit resource`,children:`✎`})]})},k=e=>{let t=null,n=e.onChange,r=e.value,i=e.format,a=e=>{n&&n(e)};if(i&&(i.type==`entity`?t=(0,E.jsx)(He,{value:r,onChange:a}):i.type==`component`?t=(0,E.jsx)(Ve,{value:r,onChange:a}):i.type==`vector`&&Array.isArray(r)?t=(0,E.jsx)(Re,{value:r,onChange:a}):i.type==`color`&&Array.isArray(r)?t=(0,E.jsx)(we,{value:r,onChange:a}):i.type==`select`?t=(0,E.jsx)(Ne,{value:r,onChange:a,selectList:i.list}):i.type==`resource`&&(t=(0,E.jsx)(We,{value:r,onChange:a,selectList:i.list,resourceType:i.resourceType}))),r==null)return t;if(!t){if(typeof r==`number`)t=(0,E.jsx)(je,{...e,value:r,onChange:a});else if(typeof r==`string`)t=(0,E.jsx)(Fe,{...e,value:r,onChange:a});else if(typeof r==`boolean`)t=(0,E.jsx)(be,{...e,checked:r,onChange:a});else if(typeof r==`function`){let n=e.label||`Run`;t=(0,E.jsx)(_e,{onClick:()=>{r()},children:n})}else t=(0,E.jsx)(Fe,{...e,value:JSON.stringify(r),onChange:()=>{}})}return t},Ge={showAudioView:!0},Ke=`orengine-editor-ui-settings`,qe=(()=>{try{let e=localStorage.getItem(Ke);if(e)return{...Ge,...JSON.parse(e)}}catch{}return{...Ge}})(),Je=new Set,Ye=e=>(Je.add(e),()=>{Je.delete(e)}),Xe=e=>[(0,b.useSyncExternalStore)(Ye,()=>qe[e]),(0,b.useCallback)(t=>{qe={...qe,[e]:t};try{localStorage.setItem(Ke,JSON.stringify(qe))}catch{}Je.forEach(e=>e())},[e])],Ze={editorSettings:`EditorSettings__editorSettings___LmVka`,editorSettings_inner:`EditorSettings__editorSettings_inner___LmVka`},Qe=()=>{let[e,t]=Xe(`showAudioView`);return(0,E.jsx)(`div`,{className:Ze.editorSettings,children:(0,E.jsx)(`div`,{className:Ze.editorSettings_inner,children:(0,E.jsx)(pe,{label:`View`,accordion:!0,children:(0,E.jsx)(he,{title:`AudioView`,children:(0,E.jsx)(k,{value:e,onChange:e=>t(e)})})})})})},$e=(0,b.createContext)(void 0),et=(e,t)=>{let[n,r]=(0,b.useState)(()=>e?e.serialize():{}),i=t?[...t]:[],a=(0,b.useMemo)(()=>i,i);return(0,b.useEffect)(()=>{if(e===void 0)return;r(e.serialize());let t=t=>{let n=a.length==0;for(let e=0;e<a.length;e++)if(t.find(t=>t==a[e])){n=!0;break}n&&r(e.serialize())};return e.on(`fields/update`,t),()=>{e.off(`fields/update`,t)}},[e,a]),{fields:n}},tt=e=>(et(e.target),{target:e.target}),nt=()=>{let e=(0,b.useContext)($e);if(!e)throw Error(`SerializeFieldViewContext is not defined`);return e},rt={container:`ValueArray__container___LmNvb`},it=e=>{let t=[],n=e.value,r=e.format,i=r?.type==`array`?r.labels:void 0;if(n===void 0)return null;for(let r=0;r<n.length;r++){let a=n[r],o=r.toString();i&&(o+=`/ `+i(a,r)),t.push((0,E.jsx)(he,{title:o,children:(0,E.jsx)(k,{...e,value:a,onChange:t=>{let i=n.concat();i[r]=t,e.onChange&&e.onChange(i)}})},r))}return(0,E.jsx)(`div`,{className:rt.container,children:t})},at=e=>{let{editor:t}=Be(),{target:n}=nt(),r=e.field.value,i=typeof r,a=e.field.opt,o=a?.format,s=a?.label||e.path.split(`/`).pop(),c=o&&o.type==`vector`,l=null;if(Array.isArray(r))l=o?.type==`vector`?(0,E.jsx)(Re,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):o?.type==`color`?(0,E.jsx)(we,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):(0,E.jsx)(it,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}});else if(l=(0,E.jsx)(k,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}),i===`function`)return l;return(0,E.jsx)(he,{title:s,vertical:c,children:l})},ot={container:`SerializeFieldViewDir__container___LmNvb`,field:`SerializeFieldViewDir__field___LmNvb`,block:`SerializeFieldViewDir__block___LmNvb`},st=e=>{let t=[],n=Object.keys(e.fields.childs);for(let r=0;r<n.length;r++){let i=n[r],a=e.fields.childs[i],{opt:o}=a,s=!1;if(o&&(s=typeof o.hidden==`function`?o.hidden(a.type==`value`?a.value:null):o.hidden||!1),s)continue;let c=`field`+i,l=(e.basePath?e.basePath+`/`:``)+i,u=null;u=a.type===`value`?(0,E.jsx)(at,{path:l,field:a},c):(0,E.jsx)(`div`,{className:ot.block,children:(0,E.jsx)(pe,{accordion:!0,label:i,children:(0,E.jsx)(st,{fields:a,basePath:l})},c)},c),u&&t.push(u)}return(0,E.jsx)(`div`,{className:ot.container,children:t})},ct=e=>{let t=tt(e),n=t.target.serializeToDirectory();if(e.filter){let t=n.childs[e.filter];t&&t.type===`folder`&&(n=t)}return(0,E.jsx)($e.Provider,{value:t,children:(0,E.jsx)(st,{fields:n,basePath:e.filter})})},A=(e,t)=>{let n=n=>{e?.setField(t,n)},{fields:r}=et(e,[t]);return[r&&r[t],n]},j=class e{x;y;z;w;constructor(e,t,n,r){this.x=0,this.y=0,this.z=0,this.w=0,this.set(e,t,n,r)}get isVector(){return!0}set(e,t,n,r){return this.x=e??0,this.y=t??0,this.z=n??0,this.w=r??0,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setFromArray(e){return this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0,this.w=e[3]||0,this}add(e){return typeof e==`number`?(this.x+=e,this.y+=e,this.z+=e,this.w+=e):(this.x+=e.x??0,this.y+=e.y??0,this.z+=e.z??0,this.w+=e.w??0),this}sub(e){return typeof e==`number`?(this.x-=e,this.y-=e,this.z-=e):(this.x-=e.x??0,this.y-=e.y??0,this.z-=e.z??0,this.w-=e.w??0),this}multiply(e){return typeof e==`number`?(this.x*=e,this.y*=e,this.z*=e,this.w*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w),this}divide(e){return typeof e==`number`?(this.x/=e,this.y/=e,this.z/=e,this.w/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return Math.sqrt(t*t+n*n+r*r)}normalize(){let e=this.length()||1;return this.x/=e,this.y/=e,this.z/=e,this}cross(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z;return this.x=n*o-r*a,this.y=r*i-t*o,this.z=t*a-n*i,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}applyMatrix3(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10],d=this.x*n+this.y*a+this.z*c,f=this.x*r+this.y*o+this.z*l,p=this.x*i+this.y*s+this.z*u;return this.x=d,this.y=f,this.z=p,this.w=0,this}applyMatrix4(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=this.x*n+this.y*o+this.z*u+this.w*m,y=this.x*r+this.y*s+this.z*d+this.w*h,b=this.x*i+this.y*c+this.z*f+this.w*g,x=this.x*a+this.y*l+this.z*p+this.w*_;return this.x=v,this.y=y,this.z=b,this.w=x,this}applyMatrix4AsPosition(e){let t=this.w;return this.w=1,this.applyMatrix4(e),this.w=t,this}applyMatrix4AsDirection(e){let t=this.w;return this.w=0,this.applyMatrix4(e),this.w=t,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this}clone(){return new e(this.x,this.y,this.z,this.w)}getElm(e){return e==`vec2`?[this.x,this.y]:e==`vec3`?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}},M=class e{elm;constructor(e){this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e&&this.set(e)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new e().copy(this)}copy(e){return this.set(e.elm),this}perspective(e,t,n,r){let i=1/Math.tan(e*Math.PI/360),a=r-n;return this.elm=[i/t,0,0,0,0,i,0,0,0,0,-(r+n)/a,-1,0,0,-(r*n*2)/a,0],this}orthographic(e,t,n,r){return this.elm=[2/e,0,0,0,0,2/t,0,0,0,0,-2/(r-n),0,0,0,-(r+n)/(r-n),1],this}lookAt(e,t,n){let r=e.clone().sub(t).normalize(),i=n.clone().cross(r).normalize(),a=r.clone().cross(i).normalize();return this.elm=[i.x,i.y,i.z,0,a.x,a.y,a.z,0,r.x,r.y,r.z,0,e.x,e.y,e.z,1],this}inverse(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15],g=e*a-t*i,_=e*o-n*i,v=e*s-r*i,y=t*o-n*a,b=t*s-r*a,x=n*s-r*o,S=c*p-l*f,C=c*m-u*f,w=c*h-d*f,T=l*m-u*p,ee=l*h-d*p,E=u*h-d*m,te=g*E-_*ee+v*T+y*w-b*C+x*S,ne=1/te;return te==0?this.identity():(this.elm[0]=(a*E-o*ee+s*T)*ne,this.elm[1]=(-t*E+n*ee-r*T)*ne,this.elm[2]=(p*x-m*b+h*y)*ne,this.elm[3]=(-l*x+u*b-d*y)*ne,this.elm[4]=(-i*E+o*w-s*C)*ne,this.elm[5]=(e*E-n*w+r*C)*ne,this.elm[6]=(-f*x+m*v-h*_)*ne,this.elm[7]=(c*x-u*v+d*_)*ne,this.elm[8]=(i*ee-a*w+s*S)*ne,this.elm[9]=(-e*ee+t*w-r*S)*ne,this.elm[10]=(f*b-p*v+h*g)*ne,this.elm[11]=(-c*b+l*v-d*g)*ne,this.elm[12]=(-i*T+a*C-o*S)*ne,this.elm[13]=(e*T-t*C+n*S)*ne,this.elm[14]=(-f*y+p*_-m*g)*ne,this.elm[15]=(c*y-l*_+u*g)*ne,this)}transpose(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15];return this.elm[0]=e,this.elm[1]=i,this.elm[2]=c,this.elm[3]=f,this.elm[4]=t,this.elm[5]=a,this.elm[6]=l,this.elm[7]=p,this.elm[8]=n,this.elm[9]=o,this.elm[10]=u,this.elm[11]=m,this.elm[12]=r,this.elm[13]=s,this.elm[14]=d,this.elm[15]=h,this}set(e){for(let t=0;t<this.elm.length;t++)this.elm[t]=e[t]??0;return this}setFromTransform(e,t,n){return this.identity(),e&&this.applyPosition(e),t&&this.applyQuaternion(t),n&&this.applyScale(n),this}applyPosition(e){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,e.x,e.y,e.z,1]),this}applyQuaternion(e){let t=e.x,n=e.y,r=e.z,i=e.w,a=t*t,o=n*n,s=r*r,c=i*i,l=t*n,u=t*r,d=t*i,f=n*r,p=n*i,m=r*i;return this.matmul([a-o-s+c,2*(l+m),2*(u-p),0,2*(l-m),-a+o-s+c,2*(f+d),0,2*(u+p),2*(f-d),-a-o+s+c,0,0,0,0,1]),this}applyScale(e){return this.matmul([e.x,0,0,0,0,e.y,0,0,0,0,e.z,0,0,0,0,1]),this}matmul(e){let t=Array(16);for(let n=0;n<4;n++)for(let r=0;r<4;r++){let i=0;for(let t=0;t<4;t++)i+=this.elm[t*4+r]*e[t+n*4];t[r+n*4]=i}this.elm=t}setRotationFromDirection(e,t){t||={x:0,y:1,z:0};let n=new j().copy(e).normalize(),r=new j().copy(t).cross(n).normalize();r.length()==0&&(n.x+=.001,r.copy(t).cross(n).normalize());let i=n.clone().cross(r).normalize();return this.set([r.x,r.y,r.z,0,i.x,i.y,i.z,0,n.x,n.y,n.z,0,0,0,0,1]),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set([c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1]),this}multiply(e){return this.matmul(e.elm),this}preMultiply(e){let t=this.copyToArray([]);return this.set(e.elm),this.matmul(t),this}decompose(e,t,n){e&&(e.x=this.elm[12],e.y=this.elm[13],e.z=this.elm[14]),t&&t.setFromMatrix(this)}copyToArray(e){e.length=this.elm.length;for(let t=0;t<this.elm.length;t++)e[t]=this.elm[t];return e}},lt=class extends j{order;constructor(e,t,n,r){super(e,t,n,0),this.order=r||`XYZ`}copy(e){return`order`in e&&(this.order=e.order),super.copy(e)}setFromQuaternion(e){let t=new M().applyQuaternion(e);return this.setFromRotationMatrix(t),this}setFromRotationMatrix(e){let t=e.elm,n=t[0],r=t[4],i=t[8],a=t[5],o=t[9],s=t[6],c=t[10];return this.order=`XYZ`,this.y=Math.asin(Math.min(1,Math.max(-1,i))),Math.abs(i)<.9999999?(this.x=Math.atan2(-o,c),this.z=Math.atan2(-r,n)):(this.x=Math.atan2(s,a),this.z=0),this}},ut=class e{x;y;z;w;updated=!1;constructor(e,t,n,r){this.x=e||0,this.y=t||0,this.z=n||0,this.w=r||1}set(e,t,n,r){this.x=e??this.x,this.y=t??this.y,this.z=n??this.z,this.w=r??this.w,this.updated=!0}setFromEuler(e,t){let n=t||(`order`in e?e.order:`XYZ`),r=Math.sin(e.x/2),i=Math.sin(e.y/2),a=Math.sin(e.z/2),o=Math.cos(e.x/2),s=Math.cos(e.y/2),c=Math.cos(e.z/2);return n==`XYZ`?(this.x=o*i*a+r*s*c,this.y=-r*s*a+o*i*c,this.z=o*s*a+r*i*c,this.w=-r*i*a+o*s*c):n==`XZY`?(this.x=-o*i*a+r*s*c,this.y=o*i*c-r*s*a,this.z=r*i*c+o*s*a,this.w=r*i*a+o*s*c):n==`YZX`?(this.x=r*s*c+o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=-r*i*a+o*s*c):n==`ZYX`&&(this.x=r*s*c-o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=r*i*a+o*s*c),this.updated=!0,this}setFromMatrix(e){let t=e.elm,n=t[0]+t[5]+t[10],r,i,a,o;if(n>0){let e=Math.sqrt(n+1)*2;o=.25*e,r=(t[6]-t[9])/e,i=(t[8]-t[2])/e,a=(t[1]-t[4])/e}else if(t[0]>t[5]&&t[0]>t[10]){let e=Math.sqrt(1+t[0]-t[5]-t[10])*2;o=(t[6]-t[9])/e,r=.25*e,i=(t[1]+t[4])/e,a=(t[2]+t[8])/e}else if(t[5]>t[10]){let e=Math.sqrt(1+t[5]-t[0]-t[10])*2;o=(t[8]-t[2])/e,r=(t[1]+t[4])/e,i=.25*e,a=(t[6]+t[9])/e}else{let e=Math.sqrt(1+t[10]-t[0]-t[5])*2;o=(t[1]-t[4])/e,r=(t[2]+t[8])/e,i=(t[6]+t[9])/e,a=.25*e}let s=Math.sqrt(r*r+i*i+a*a+o*o);return r/=s,i/=s,a/=s,o/=s,this.x=r,this.y=i,this.z=a,this.w=o,this.updated=!0,this}multiply(e){let t=this.w*e.w-this.x*e.x-this.y*e.y-this.z*e.z,n=this.w*e.x+this.x*e.w+this.y*e.z-this.z*e.y,r=this.w*e.y-this.x*e.z+this.y*e.w+this.z*e.x,i=this.w*e.z+this.x*e.y-this.y*e.x+this.z*e.w;return this.set(n,r,i,t),this.updated=!0,this}preMultiply(e){let t=e.clone().multiply(this);this.set(t.x,t.y,t.z,t.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this.updated=!0,this}clone(){return new e(this.x,this.y,this.z,this.w)}},dt;(function(e){let t=e.gauss=(e,t,n)=>{let r=e-t,i=-(r*r)/(2*n*n);return 1/Math.sqrt(2*Math.PI*n)*Math.exp(i)};e.gaussWeights=e=>{let n=0,r=[];if(e<=1)return[.5];for(let i=0;i<e;i++){let a=i/(e-1),o=t(a,0,1);n+=o*(i>0?2:1),r.push(o)}for(let t=0;t<e;t++)r[t]/=n;return r},e.randomSeed=e=>{e^=e<<13,e^=0,e^=e<<5;let t=123456789^e;e^=e<<13,e^=0,e^=e<<5;let n=362436069^e;e^=e<<13,e^=0,e^=e<<5;let r=521288629^e;e^=e<<13,e^=0,e^=e<<5;let i=88675123^e,a;return()=>(a=t^t<<11,t=n,n=r,r=i,i=(i^i>>>19^(a^a>>>8))>>>0,i/4294967296)};let n=e.randomRange=(e=-1,t=1)=>e+Math.random()*(t-e);e.randomVector=(e=new j(-1,-1,-1,-1),t=new j(1,1,1,1))=>new j(n(e.x,t.x),n(e.y,t.y),n(e.z,t.z),n(e.w,t.w)),e.randomInSphere=(e=1,t=Math.random)=>{let n=t(),r=t(),i=t(),a=2*Math.PI*n,o=Math.acos(2*r-1),s=Math.cbrt(i)*e,c=Math.sin(o);return{x:s*c*Math.cos(a),y:s*c*Math.sin(a),z:s*Math.cos(o)}},e.smoothstep=(e,t,n)=>n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))})(dt||={});var ft=class{gl;vao;program;indexBuffer;attributes;vertCount;indexCount;instanceCount;attribPointerDiect;attribTypeDict;constructor(e,t){this.gl=e,this.program=t,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([[`Float32Array`,this.gl.vertexAttribPointer.bind(this.gl)],[`Int32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int8Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt8Array`,this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([[`Float32Array`,this.gl.FLOAT],[`Int32Array`,this.gl.INT],[`Int16Array`,this.gl.SHORT],[`Int8Array`,this.gl.BYTE],[`UInt32Array`,this.gl.UNSIGNED_INT],[`UInt16Array`,this.gl.UNSIGNED_SHORT],[`UInt8Array`,this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((e,t)=>{e.instanceDivisor==null&&t!=`index`&&(this.vertCount=Math.max(this.vertCount,e.count)),e.instanceDivisor!==void 0&&e.instanceDivisor>0&&(this.instanceCount=this.instanceCount==0?e.count:Math.min(this.instanceCount,e.count))})}setAttribute(e,t,n,r){if(t.array===null)return;let i={buffer:t,size:n,count:t.array?t.array.length/n:0,location:void 0,...r};this.attributes.set(e,i),this.gl.bindVertexArray(this.vao),i.location=this.gl.getAttribLocation(this.program,e);let a=this.attribPointerDiect.get(t.array.constructor.name),o=this.attribTypeDict.get(t.array.constructor.name);if(i.location>-1){if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i.buffer.buffer),i.size==16){for(let e=0;e<4;e++)this.gl.enableVertexAttribArray(i.location+e);for(let e=0;e<4;e++)this.gl.vertexAttribPointer(i.location+e,4,o,!1,64,16*e);if(i.instanceDivisor!==void 0)for(let e=0;e<4;e++)this.gl.vertexAttribDivisor(i.location+e,i.instanceDivisor)}else this.gl.enableVertexAttribArray(i.location),a(i.location,i.size,o,!1,0,0),i.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(i.location,i.instanceDivisor)}return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(e){return this.attributes.delete(e),this.calcVertCount(),this}setIndex(e){this.indexBuffer=e,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(e){this.gl.bindVertexArray(this.vao),e&&e(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(e=>{e.buffer.dispose()})}},pt=new Map,mt=class{gl;program;name=``;vao;uniforms;constructor(e){this.gl=e,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(e,t,n){if(this.program===null){console.warn(`program is null.`);return}let r=this.createShader(e,this.gl.VERTEX_SHADER),i=this.createShader(t,this.gl.FRAGMENT_SHADER);if(this.name){let e=[];r.error&&e.push(`[VERTEX]
`+r.error),i.error&&e.push(`[FRAGMENT]
`+i.error),e.length>0?pt.set(this.name,e.join(`

`)):pt.delete(this.name)}if(!(!r.shader||!i.shader)){if(this.gl.attachShader(this.program,r.shader),this.gl.attachShader(this.program,i.shader),n&&n.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,n.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)){let e=this.gl.getProgramInfoLog(this.program);if(console.error(`program link error:`,e),this.name&&e){let t=pt.get(this.name);pt.set(this.name,(t?t+`

`:``)+`[LINK]
`+e)}}return this}}createShader(e,t){let n=this.gl.createShader(t);return n?(this.gl.shaderSource(n,e),this.gl.compileShader(n),this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS)?{shader:n,error:null}:{shader:null,error:this.gl.getShaderInfoLog(n)||`Unknown shader error`}):{shader:null,error:null}}setUniform(e,t,n){let r=this.uniforms.get(e);if(r){r.type=t;let e=r.value;e.length=n.length;for(let t=0;t<n.length;t++)e[t]=n[t];if(r.cache){if(r.cache.length!==e.length)r.needsUpdate=!0;else for(let t=0;t<e.length;t++)if(r.cache[t]!==e[t]){r.needsUpdate=!0;break}}else r.needsUpdate=!0}else this.uniforms.set(e,{value:n.concat(),type:t,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(e){this.program&&this.uniforms.forEach((t,n)=>{(t.location===null||e)&&(t.location=this.gl.getUniformLocation(this.program,n))})}uploadUniforms(){this.uniforms.forEach(e=>{e.needsUpdate&&e.location!==null&&(/Matrix[2|3|4]fv/.test(e.type)?this.gl[`uniform`+e.type](e.location,!1,e.value):/[1|2|3|4][f|i]$/.test(e.type)?this.gl[`uniform`+e.type](e.location,...e.value):this.gl[`uniform`+e.type](e.location,e.value),e.cache=e.value.concat(),e.needsUpdate=!1)})}getVAO(e=`_`){if(!this.program)return null;let t=this.vao.get(e);return t||(t=new ft(this.gl,this.program),this.vao.set(e,t),t)}use(e){this.program&&(this.gl.useProgram(this.program),e&&e(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(e=>{e.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}},ht=class{gl;buffer;array;constructor(e){this.gl=e,this.buffer=this.gl.createBuffer(),this.array=null}setData(e,t=`vbo`,n){let r=t==`vbo`?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(r,this.buffer),this.gl.bufferData(r,e,n||this.gl.STATIC_DRAW),this.gl.bindBuffer(r,null),this.array=e,this}read(e){return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this}dispose(){this.gl.deleteBuffer(this.buffer)}},gt=class{unit;image;size;gl;glTex;textureType;_setting;constructor(e){this.gl=e,this.image=null,this.unit=0,this.size=new j,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=e.TEXTURE_2D}get isTexture(){return!0}setting(e){return this._setting={...this._setting,...e},this.attach(this.image),this}attach(e,t){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.image){let e=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(e.width,e.height),e instanceof HTMLImageElement||e instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,e):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,e.width,e.height,0,this._setting.format,this._setting.type,e.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}subImage(e,t,n){return this.gl.bindTexture(this.textureType,this.glTex),this.gl.texSubImage2D(this.textureType,0,0,0,t,n,this._setting.format,this._setting.type,e),this.gl.bindTexture(this.textureType,null),this}activate(e){return this.gl.activeTexture(this.gl.TEXTURE0+e),this.gl.bindTexture(this.textureType,this.glTex),this.unit=e,this}load(e,t){let n=new Image;return n.onload=()=>{this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.attach(n),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),t&&t()},n.src=e,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}},_t=class{size;gl;glFrameBuffer;textures;depthTexture;textureAttachmentList;constructor(e,t){this.gl=e,this.size=new j(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!t||!t.disableDepthBuffer)&&this.setDepthTexture(new gt(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(e){this.depthTexture=e,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((e,t)=>{e.attach({width:this.size.x,height:this.size.y});let n=this.gl.COLOR_ATTACHMENT0+t;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,n,this.gl.TEXTURE_2D,e.getTexture(),0),this.textureAttachmentList.push(n)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(e,t){return typeof e==`number`?(this.size.x=e,t!==void 0&&(this.size.y=t)):this.size.copy(e),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}clear(){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,this.glFrameBuffer),e.drawBuffers(this.textureAttachmentList),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}},vt=class extends _t{cubeTarget;textures;currentFace;constructor(e,t){super(e,t),this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this}face(e){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((t,n)=>{let r=this.gl.COLOR_ATTACHMENT0+n;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,r,this.cubeTarget[e],t.getTexture(),0),this.textureAttachmentList.push(r)}),this.currentFace=this.cubeTarget[e],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}},yt=class extends gt{cubeTarget;constructor(e){super(e),this.textureType=e.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(e){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let e=0;e<6;e++){let t=Array.isArray(this.image)?this.image[e]:this.image;this.size.set(t.width,t.height),t instanceof HTMLImageElement||t instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[e],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t):this.gl.texImage2D(this.cubeTarget[e],0,this._setting.internalFormat,t.width,t.height,0,this._setting.format,this._setting.type,t.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}},N=WebGL2RenderingContext,bt=class{gl;canvas;_stateCache;_extDisJointTimerQuery;_queryList;_queryListQueued;constructor(e){this.gl=e,this.canvas=e.canvas,this._stateCache={},this._queryList=[],this._queryListQueued=[],e.getExtension(`EXT_color_buffer_float`),e.getExtension(`EXT_color_buffer_half_float`),e.getExtension(`OES_texture_float_linear`),this._extDisJointTimerQuery=e.getExtension(`EXT_disjoint_timer_query_webgl2`),this._extDisJointTimerQuery||console.warn(`[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled.`),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)}createTexture(){return new gt(this.gl)}createCubeTexture(){return new yt(this.gl)}createFrameBuffer(e){return new _t(this.gl,e)}createCubeFrameBuffer(){return new vt(this.gl)}createProgram(){return new mt(this.gl)}_setState(e,t){this._stateCache[e]!==t&&(t?this.gl.enable(e):this.gl.disable(e),this._stateCache[e]=t)}setMaterialState(e,t,n){this._setState(this.gl.CULL_FACE,e),this._setState(this.gl.DEPTH_TEST,t),this.gl.depthMask(n)}setBlendEnabled(e){e?this.gl.enable(this.gl.BLEND):this.gl.disable(this.gl.BLEND)}bindRenderTarget(e,t,n){t?this.gl.viewport(t.x,t.y,t.z,t.w):e?this.gl.viewport(0,0,e.size.x,e.size.y):n&&this.gl.viewport(0,0,n.x,n.y),e?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e.getFrameBuffer()),this.gl.drawBuffers(e.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}clear(e,t){let n=0;e&&(this.gl.clearColor(e.x,e.y,e.z,e.w),n|=this.gl.COLOR_BUFFER_BIT),t!==null&&(this.gl.clearDepth(t),n|=this.gl.DEPTH_BUFFER_BIT),n!==0&&this.gl.clear(n)}blit(e,t,n,r,i,a){let o=this.gl;o.bindFramebuffer(o.READ_FRAMEBUFFER,e?e.getFrameBuffer():null),a&&o.readBuffer(o.COLOR_ATTACHMENT0),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,t?t.getFrameBuffer():null),a&&t&&o.drawBuffers([o.COLOR_ATTACHMENT0]),o.blitFramebuffer(0,0,n,r,0,0,n,r,o.COLOR_BUFFER_BIT,i?o.LINEAR:o.NEAREST)}draw(e,t,n,r,i){e.use(e=>{e.uploadUniforms(),this.gl.bindVertexArray(t.getVAO());let i=t.indexBuffer,a=this.gl.UNSIGNED_SHORT;i&&i.array&&i.array.BYTES_PER_ELEMENT==4&&(a=this.gl.UNSIGNED_INT),r==`NORMAL`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):r==`ADD`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):r==`DIFF`&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);let o=this.gl[n];t.instanceCount>0?i?this.gl.drawElementsInstanced(o,t.indexCount,a,0,t.instanceCount):this.gl.drawArraysInstanced(o,0,t.vertCount,t.instanceCount):i?this.gl.drawElements(o,t.indexCount,a,0):this.gl.drawArrays(o,0,t.vertCount),this.gl.bindVertexArray(null)})}collectTimerQueries(){if(!this._extDisJointTimerQuery)return null;if(this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))return this._queryList.forEach(e=>this.gl.deleteQuery(e)),this._queryList.length=0,null;let e=[];if(this._queryListQueued.length>0){let t=this._queryListQueued.length;for(let n=t-1;n>=0;n--){let t=this._queryListQueued[n];if(this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT_AVAILABLE)){let r=this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT);e.push({name:t.name,duration:r/1e3/1e3}),this._queryList.push(t.query),this._queryListQueued.splice(n,1)}}}return e}},xt=(e,t)=>{if(!t)return e;let n=Object.keys(t),r=``;for(let e=0;e<n.length;e++)r+=`#define `+n[e]+` `+t[n[e]]+`
`;return r+=e,r},St=(e,t)=>(e=e.replaceAll(`NUM_LIGHT_DIR`,t?t.directional.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_DIR`,t?Math.min(2,t.directional.filter(e=>e.component.castShadow).length).toString():`0`),e=e.replaceAll(`NUM_LIGHT_SPOT`,t?t.spot.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_SPOT`,t?Math.min(2,t.spot.filter(e=>e.component.castShadow).length).toString():`0`),e),Ct=e=>(e=e.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(e,t,n)=>{let r=``;for(let e=0;e<Number(t);e++)r+=n.replaceAll(`LOOP_INDEX`,e.toString());return r}),e),wt=(e,t,n)=>(e=xt(e,t),e=`#version 300 es
precision highp float;
`+e,e=St(e,n),e=Ct(e),e),Tt=class{listeners;constructor(){this.listeners=[]}on(e,t){this.listeners.push({event:e,cb:t})}once(e,t){this.listeners.push({event:e,cb:t,once:!0})}off(e,t){this.listeners=this.listeners.filter(n=>t==null?n.event!=e:n.event!=e||n.cb!=t)}emit(e,t){let n=this.listeners.concat();for(let r=0;r<n.length;r++){let i=n[r];i.event==e&&(i.cb.apply(this,t||[]),i.once&&this.off(e,i.cb))}}hasEvent(e){return this.listeners.some(t=>t.event==e)}},Et;(function(e){function t(){let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``);return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}e.genUUID=t})(Et||={});var Dt;(function(e){let t=e.NEWTON_ITERATIONS=4;e.NEWTON_MIN_SLOPE=.001,e.SUBDIVISION_PRECISION=1e-7;let n=e.SUBDIVISION_MAX_ITERATIONS=10,r=e.BEZIER_EASING_CACHE_SIZE=11,i=e.BEZIER_EASING_SAMPLE_STEP_SIZE=1/r;function a(e){return-e.p0+3*e.p1-3*e.p2+e.p3}function o(e){return 3*e.p0-6*e.p1+3*e.p2}function s(e){return-3*e.p0+3*e.p1}function c(e,t){return 3*a(e)*t*t+2*o(e)*t+s(e)}e.calcBezierSlope=c;function l(e,t){return((a(e)*t+o(e))*t+s(e))*t+e.p0}e.calcBezier=l;function u(e,t,r,i){let a=0,o=0;for(let s=0;s<n;s++)o=t+(r-t)/2,a=l(i,o),a>e?r=o:t=o;return o}function d(e,n,r){for(let i=0;i<t;i++){let t=c(n,r);if(t==0)return r;let i=l(n,r)-e;r-=i/t}return r}function f(e,t,n){e.p1=Math.max(e.p0,Math.min(e.p3,e.p1)),e.p2=Math.max(e.p0,Math.min(e.p3,e.p2));let a=0;for(let e=1;e<n.length&&(a=e-1,!(t<n[e]));e++);let o=a/(r-1),s=c(e,o)/(e.p3-e.p0);return s==0?o:s>.01?d(t,e,o):u(t,o,o+i,e)}e.getBezierTfromX=f})(Dt||={});function Ot(e,t,n,r){let i=Array(Dt.BEZIER_EASING_CACHE_SIZE);for(let a=0;a<Dt.BEZIER_EASING_CACHE_SIZE;++a)i[a]=Dt.calcBezier({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a/(Dt.BEZIER_EASING_CACHE_SIZE-1));return a=>a<=e.x?e.y:r.x<=a?r.y:Dt.calcBezier({p0:e.y,p1:t.y,p2:n.y,p3:r.y},Dt.getBezierTfromX({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a,i))}var kt;(function(e){e.number=(e,t,n)=>e+(t-e)*n,e.vector=(e,t,n)=>e.lerp(t,n)})(kt||={});var At=class extends Tt{keyframes=[];cache={frame:NaN,value:NaN};frameStart;frameEnd;frameDuration;constructor(e){super(),this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes=[],e.forEach(e=>{this.addKeyFrame(e)}))}addKeyFrame(e){let t=0;for(let n=0;n<this.keyframes.length&&this.keyframes[n].coordinate.x<e.coordinate.x;n++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let n=0;n<this.keyframes.length;n++){let r=this.keyframes[n];if(e<r.coordinate.x){let i=this.keyframes[n-1];t=i?i.to(r,e):r.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t===null?0:(this.cache={frame:e,value:t},t)}},jt=class extends Tt{name;curves;frameStart;frameEnd;frameDuration;updatedFrame=-1;value;constructor(e,t,n,r,i){super(),this.name=e||``,this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new j,t&&this.setFCurve(t,`x`),n&&this.setFCurve(n,`y`),r&&this.setFCurve(r,`z`),i&&this.setFCurve(i,`w`)}setFCurve(e,t){this.curves.set(t,e);let n=1/0,r=-1/0;this.curves.forEach(e=>{e.frameStart<n&&(n=e.frameStart),e.frameEnd>r&&(r=e.frameEnd)}),(n==-1/0||r==1/0)&&(n=0,r=1),this.frameStart=n,this.frameEnd=r,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(e){return this.curves.get(e)||null}setFrame(e){if(e==this.updatedFrame)return this;let t=this.curves.get(`x`),n=this.curves.get(`y`),r=this.curves.get(`z`),i=this.curves.get(`w`);return t&&(this.value.x=t.getValue(e)),n&&(this.value.y=n.getValue(e)),r&&(this.value.z=r.getValue(e)),i&&(this.value.w=i.getValue(e)),this.updatedFrame=e,this}},Mt=class extends Tt{coordinate={x:0,y:0};handleLeft={x:0,y:0};handleRight={x:0,y:0};interpolation=`BEZIER`;easing=null;nextFrame=null;constructor(e,t,n,r){super(),this.set(e,t,n,r)}set(e,t,n,r){this.coordinate=e,this.handleLeft=t||e,this.handleRight=n||e,this.interpolation=r||`BEZIER`}getEasing(e,t){return e==`BEZIER`?Ot(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):e==`CONSTANT`?()=>this.coordinate.y:e=>{let n=t.coordinate.y-this.coordinate.y;return e=(e-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+e*n}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}},Nt=class e extends Tt{static gltfLoaderFactory=null;_engine;connection;frame;nodes;curveGroups;root;gltf;currentScene;constructor(e,t){super(),this._engine=e,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},t&&this.connect(t)}connect(e,t){}disconnect(){}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[n]=r}return t.buffer}async loadScene(t,n){this.currentScene=t,n&&(e.gltfLoaderFactory?await e.gltfLoaderFactory(this._engine).load(n).then(e=>{this.gltf=e,this.emit(`gltfLoaded`,[e])}):console.warn(`BLidge: gltfLoaderFactory not wired`)),await new Promise(e=>{setTimeout(()=>{e(null)},100)}),this.frame.start=t.frame.start,this.frame.end=t.frame.end,this.frame.fps=t.frame.fps,this.curveGroups=[],this.nodes=[];let r=Object.keys(t.animations);for(let e=0;e<r.length;e++){let n=r[e],i=new jt(n);t.animations[e].forEach(e=>{let t=new At;t.set(e.k.map(e=>{let t={B:`BEZIER`,C:`CONSTANT`,L:`LINEAR`}[e[0]],n=e[1];return new Mt({x:n[0],y:n[1]},n[2]!==void 0&&{x:n[2],y:n[3]}||void 0,n[4]!==void 0&&{x:n[4],y:n[5]}||void 0,t)})),i.setFCurve(t,e.axis)}),this.curveGroups.push(i)}this.nodes=[];let i=e=>{let t={name:``,uniforms:{}};e.material&&(t.name=e.material.name||``,t.uniforms=e.material.uniforms||{});let n={name:e.name,class:e.class,parent:e.parent,children:[],animations:e.animation||{},position:e.position||[0,0,0],rotation:e.rotation||[0,0,0],scale:e.scale||[1,1,1],material:t,type:e.type,visible:e.visible},r=e.param;return n.param=r&&`position`in r?{position:new Float32Array(this.binaryStringToArrayBuffer(atob(r.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(r.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(r.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(r.index)))}:r,e.children&&e.children.forEach(e=>{n.children.push(i(e))}),this.nodes.push(n),n};this.root=i(t.root),this.emit(`sync/scene`,[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(e){this.frame=e,this.emit(`sync/timeline`,[this.frame])}onOpen(e){}onMessage(e){}onClose(e){this.disconnect()}getCurveGroup(e){return this.curveGroups[e]}setFrame(e){this.onSyncTimeline({...this.frame,playing:!0,current:e})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(e=>{this.on(`gltfLoaded`,t=>{e(t)})})}dispose(){this.disconnect()}},Pt=class extends Tt{uuid;initiator;fields_;constructor(){super(),this.uuid=Et.genUUID(),this.fields_=new Map,this.initiator=`script`}restoreUUID(e){this.uuid=e}serialize(e){e||={mode:`view`};let t={};return this.fields_.forEach((n,r)=>{let i=this.getFieldOpt(r);e.mode==`export`&&i&&i&&i.noExport||(t[r]=n.get(e))}),t}serializeToDirectory(){return(e=>{let t={type:`folder`,childs:{},opt:{}},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=this.getFieldOpt(i);if(!i)continue;let o=t,s=i.split(`/`);for(let e=0;e<s.length;e++){let t=s[e];t&&o.type!=`value`&&(o.childs[t]||(e==s.length-1?o.childs[t]={type:`value`,value:null,opt:a}:o.childs[t]={type:`folder`,childs:{},opt:a}),o=o.childs[t])}o.type==`value`&&(o.value=e[i])}return t})(this.serialize())}deserialize(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let r=t[n],i=this.fields_.get(r);i&&i.set(e[r])}}exportEditor(){this.serialize({mode:`export`})}field(e,t,n,r){let i=typeof n==`function`?n:void 0,a=typeof n==`object`&&n||r||{};i||(a.readOnly=!0,a.noExport=!0);let o=e.startsWith(`/`)?e.slice(1):e;this.fields_.set(o,{get:t,set:(t=>{i&&i(t),this.noticeField(e)}),opt:a})}fieldDir(e,t){let n=e;return this.field(n+`/`,()=>null,void 0,{...t,isFolder:!0}),{dir:e=>this.fieldDir(`${n}/${e}`),field:(e,t,r,i)=>{this.field(`${n}/${e}`,t,r,i)}}}removeField(e){let t=e.startsWith(`/`)?e.slice(1):e;this.fields_.delete(t)}setField(e,t){let n=this.fields_.get(e);if(!n)throw Error(`Unknown field path: ${e}`);n.set(t)}getField(e,t){let n=this.fields_.get(e);if(n)return t||={mode:`view`},n.get(t)}getFieldOpt(e){let t=this.fields_.get(e);if(t)return t.opt}noticeField(e){this.emit(`fields/update/`+e),this.emit(`fields/update`,[[e]])}},Ft=class extends Pt{disableEdit;order;_entity;_engine;_enabled;_tag;_disposed;constructor(e){super(),this.disableEdit=!1,this._entity=e.entity,this._engine=e.engine,this._enabled=!0,this._disposed=!1,this._tag=``,this.order=0,this.field(`enabled`,()=>this.enabled,e=>this.enabled=e,{hidden:!0,noExport:!0}),this.field(`tag`,()=>this.tag,e=>this._tag=e,{readOnly:!0,noExport:!0,hidden:e=>e==``})}get tag(){return this._tag}get entity(){return this._entity}get engine(){return this._engine}set enabled(e){this._enabled=e}get enabled(){return this._enabled}update(e){this.enabled&&this.updateImpl(e)}updateImpl(e){}postUpdate(e){this.enabled&&this.postUpdateImpl(e)}postUpdateImpl(e){}prepareRender(e){this.enabled&&this.prepareRenderImpl(e)}prepareRenderImpl(e){}commitFrame(e){this.enabled&&this.commitFrameImpl(e)}commitFrameImpl(e){}dispose(){this._disposed=!0,this.emit(`dispose`)}},P=class extends Pt{vertCount;attributes;boundingBox;updateVersion;constructor(){super(),this.vertCount=0,this.attributes=new Map,this.boundingBox=null,this.updateVersion=0}setAttribute(e,t,n,r){return this.attributes.set(e,{array:t,size:n,opt:r}),this.updateVersion++,this.updateVertCount(),e===`position`&&this.computeBoundingBox(),this}getAttribute(e){return this.attributes.get(e)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((e,t)=>{t==`index`||e.opt&&e.opt.instanceDivisor||(this.vertCount=Math.min(e.array.length/e.size,this.vertCount))})}computeBoundingBox(){let e=this.attributes.get(`position`);if(!e){this.boundingBox=null;return}let t=e.array,n=new j(1/0,1/0,1/0),r=new j(-1/0,-1/0,-1/0);for(let e=0;e<t.length;e+=3){let i=t[e],a=t[e+1],o=t[e+2];i<n.x&&(n.x=i),a<n.y&&(n.y=a),o<n.z&&(n.z=o),i>r.x&&(r.x=i),a>r.y&&(r.y=a),o>r.z&&(r.z=o)}this.boundingBox={min:n,max:r}}requestUpdate(){this.updateVersion++}},It=class extends P{constructor(e){super();let t=[],n=[],r=[],i=[],a=[],{width:o,height:s,depth:c,segmentsWidth:l,segmentsHeight:u,segmentsDepth:d}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...e},f=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:o,h:c,d:s,segW:l,segH:d},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:o,h:c,d:s,segW:l,segH:d}],p=0;for(let e of f){let o=e.normal,s=e.dir,c=e.up,l=e.segW,u=e.segH,d=e.w/2,f=e.h/2,m=e.d/2,h=e.w/l,g=e.h/u;for(let e=0;e<=u;e++)for(let _=0;_<=l;_++){let v=-d+_*h,y=-f+e*g,b=-m,x=_/l,S=e/u,C=v*-s[0]+y*c[0]+b*-o[0],w=v*-s[1]+y*c[1]+b*-o[1],T=v*-s[2]+y*c[2]+b*-o[2];if(t.push(C,w,T),n.push(...o),r.push(x,S),a.push(e/u*c[1]+Math.max(0,c[2])),e<u&&_<l){let t=p+e*(l+1)+_,n=p+(e+1)*(l+1)+_,r=p+(e+1)*(l+1)+(_+1),a=p+e*(l+1)+(_+1);i.push(t,n,a),i.push(n,r,a)}}p+=(l+1)*(u+1)}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`posY`,new Float32Array(a),1),this.setAttribute(`index`,new Uint16Array(i),1)}},Lt=class extends P{constructor(e){super();let t=[],n=[],r=[],i=[],{height:a,radiusTop:o,radiusBottom:s,radSegments:c,heightSegments:l,caps:u}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...e};for(let e=0;e<=l+2;e++)for(let d=0;d<=c;d++){let f=Math.PI*2/c*d;if(e<=l){let u=1-e/l,p=(1-u)*o+u*s,m=Math.cos(f)*p,h=-(a/2)+a/l*e,g=Math.sin(f)*p;t.push(m,h,g),r.push(d/c,e/l);let _=new j(Math.cos(f),0,Math.sin(f)).normalize();if(n.push(_.x,_.y,_.z),e<l){let t=c+1;i.push(e*t+d,(e+1)*t+(d+1)%t,e*t+(d+1)%t,e*t+d,(e+1)*t+d,(e+1)*t+(d+1)%t)}}else{if(!u)continue;let p=e-l-1,m=p?o:s,h=Math.cos(f)*m,g=-(a/2)+a*p,_=Math.sin(f)*m;t.push(h,g,_),r.push((h+m)*.5/m,(_+m)*.5/m),n.push(0,-1+p*2,0);let v=(c+1)*(l+(p+1));d<=c-2&&(p==0?i.push(v,v+d,v+d+1):i.push(v,v+d+1,v+d))}}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}},Rt=class extends P{constructor(e){super();let{width:t,height:n,widthSegments:r,heightSegments:i,floor:a}={width:1,height:1,widthSegments:1,heightSegments:1,...e},o=t/2,s=n/2,c=[],l=[],u=[],d=[];for(let e=0;e<=i;e++)for(let f=0;f<=r;f++){let p=f/r,m=e/i;if(a?(c.push(-o+t*p,0,s-n*m),l.push(0,1,0)):(c.push(-o+t*p,-s+n*m,0),l.push(0,0,1)),u.push(p,m),e>0&&f>0){let t=r+1,n=t*e+f,i=t*(e-1)+f-1;d.push(n,t*e+f-1,i,n,i,t*(e-1)+f)}}this.setAttribute(`position`,new Float32Array(c),3),this.setAttribute(`normal`,new Float32Array(l),3),this.setAttribute(`uv`,new Float32Array(u),2),this.setAttribute(`index`,new Uint16Array(d),1)}},zt=class extends P{constructor(e){super();let t=[],n=[],r=[],i=[],{radius:a,widthSegments:o,heightSegments:s}={radius:.5,widthSegments:8,heightSegments:8,...e};for(let e=0;e<=s;e++){let c=e/s*Math.PI;for(let l=0;l<=o;l++){let u=l/o*Math.PI*2,d=Math.sin(c)*a,f=Math.cos(u)*d,p=-Math.cos(c)*a,m=-Math.sin(u)*d;t.push(f,p,m),r.push(l/o,e/s);let h=new j(f,p,m).normalize();if(n.push(h.x,h.y,h.z),l<o&&e<s){let t=o+1;i.push(e*t+l,e*t+(l+1)%t,(e+1)*t+(l+1)%t,e*t+l,(e+1)*t+(l+1)%t,(e+1)*t+l)}}}for(let e=0;e<i.length;e++)i[e]=Math.min(t.length/3-1,i[e]);this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}},Bt=class extends Ft{cameraType;fov;aspect;near;far;orthWidth;orthHeight;projectionMatrix;viewMatrix;projectionMatrixPrev;viewMatrixPrev;_historyInitialized;needsUpdateProjectionMatrix;displayOut;viewPort;dofParams;constructor(e){super(e),this.cameraType=`perspective`,this.viewMatrix=new M,this.projectionMatrix=new M,this.viewMatrixPrev=new M,this.projectionMatrixPrev=new M,this._historyInitialized=!1,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.dofParams={focusDistance:.5,kFilmHeight:.008,fNumber:.3};let t=()=>{this.needsUpdateProjectionMatrix=!0};this.field(`fov`,()=>this.fov,e=>{this.fov=e,t()}),this.field(`near`,()=>this.near,e=>{this.near=e,t()}),this.field(`far`,()=>this.far,e=>{this.far=e,t()}),this.field(`orthWidth`,()=>this.orthWidth,e=>{this.orthWidth=e,t()}),this.field(`orthHeight`,()=>this.orthHeight,e=>{this.orthHeight=e,t()}),this.field(`fNumber`,()=>this.dofParams.fNumber,e=>{this.dofParams.fNumber=e},{step:.05}),this._tag=`camera`}updateProjectionMatrix(){this.cameraType==`perspective`?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}updateImpl(e){if(this.displayOut){let t=e.resolution.x/e.resolution.y;this.aspect!==t&&(this.aspect=t,this.needsUpdateProjectionMatrix=!0)}}prepareRenderImpl(e){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix(),this._historyInitialized||=(this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix),!0)}commitFrameImpl(e){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}},Vt=class extends Bt{viewMatrixOffset;constructor(e){super(e),this.viewMatrixOffset=new ut().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100,this.displayOut=!1}prepareRenderImpl(e){super.prepareRenderImpl(e),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}},Ht=class extends Vt{lightType;color;intensity;castShadow;shadowMapSize;angle;blend;distance;decay;constructor(e){super(e),this.lightType=`spot`,this.cameraType=`perspective`,this.color=new j(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new j(1024,1024),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field(`intensity`,()=>this.intensity,e=>this.intensity=e),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}lookAt(e){this.entity.lookAt(e),this.entity.quaternion.multiply(new ut().setFromEuler(new lt(Math.PI/2)))}},Ut=new P,F=class extends Ft{geometry;material;instanceCount;constructor(e){super(e);let t=e.args||{};this.geometry=t.geometry||Ut,this.material=t.material||null,this.instanceCount=t.instanceCount||1}},Wt=class extends Ft{node;rotationOffsetX;animations;uniforms;uniformCurves;transformAutoUpdate;_blidge;_lightComponent;constructor(e){super(e),this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=e.args.blidge,this.node=e.args.node,this.node.type==`camera`&&(this.rotationOffsetX=-Math.PI/2);let t=Object.keys(this.node.animations);for(let e=0;e<t.length;e++){let n=t[e];this.animations.set(n,this._blidge.getCurveGroup(this.node.animations[n]))}let n=Object.keys(this.node.material.uniforms);for(let e=0;e<n.length;e++){let t=n[e],r=this.node.material.uniforms[t],i=this._blidge.curveGroups[r];i&&(this.uniformCurves.set(t,i),this.uniforms[t]={type:`4fv`,value:i.value})}let r=this.entity;if(r.name=this.node.name,r.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),r.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},`YZX`),r.quaternion.updated=!1,r.euler.setFromQuaternion(r.quaternion),r.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type==`cube`){let e=r.addComponent(F),t=this.node.param;e.geometry=new It({width:t.x,height:t.y,depth:t.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type==`sphere`){let e=r.addComponent(F),t=this.node.param;e.geometry=new zt({radius:t.r,widthSegments:32,heightSegments:16})}else if(this.node.type==`cylinder`){let e=r.addComponent(F);e.geometry=new Lt}else if(this.node.type==`plane`){let e=r.addComponent(F),t=this.node.param;e.geometry=new Rt({width:t.x,height:t.y})}else if(this.node.type==`mesh`){let e=r.addComponent(F),t=this.node.param,n=new P;n.setAttribute(`position`,t.position,3),n.setAttribute(`uv`,t.uv,2),n.setAttribute(`normal`,t.normal,3),n.setAttribute(`index`,t.index,3),e.geometry=n}else if(this.node.type==`gltf`){let e=r.addComponent(F);this._blidge.gltfPrm.then(t=>{let n=t.scene.findEntityByName(this.node.name);if(n){let t=n.getComponent(F);t&&(e.geometry=t.geometry,e.material||=t.material)}r.noticeEventParent(`update/blidge/scene`,[r])})}if(this.node.type==`camera`){let e=e=>{e.fov=this.node.param.fov,e.needsUpdateProjectionMatrix=!0},t=r.getComponentsByTag(`camera`)[0];t&&e(t);let n=t=>{t instanceof Bt&&e(t)};r.on(`componentAdded`,n),this.once(`dispose`,()=>{r.off(`componentAdded`,n)})}if(this.node.type==`light`){let e=this.node.param;this._lightComponent=r.addComponent(Ht),this._lightComponent.deserialize({...e,lightType:e.type,color:new j().copy(e.color),castShadow:e.shadowMap})}r.visible=this.node.visible}updateImpl(e){if(!this._blidge||!this.node)return;let t=e.timeCode*this._blidge.frame.fps;if(this.animations.forEach(e=>{e.setFrame(t)}),this.transformAutoUpdate){let e=this.animations.get(`position`);if(e){let t=e.value;e.getFCurve(`x`)&&(this.entity.position.x=t.x),e.getFCurve(`y`)&&(this.entity.position.y=t.y),e.getFCurve(`z`)&&(this.entity.position.z=t.z)}let n=this.animations.get(`rotation`);if(n){let e={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},t=n.value;n.getFCurve(`x`)&&(e.x=t.x),n.getFCurve(`y`)&&(e.y=t.y),n.getFCurve(`z`)&&(e.z=t.z),this.entity.quaternion.setFromEuler({x:e.x+this.rotationOffsetX,y:e.y,z:e.z},`YZX`)}let r=this.animations.get(`scale`);if(r){let e=r.setFrame(t).value;r.getFCurve(`x`)&&(this.entity.scale.x=e.x),r.getFCurve(`y`)&&(this.entity.scale.y=e.y),r.getFCurve(`z`)&&(this.entity.scale.z=e.z)}}let n=this.animations.get(`hide`);if(n&&(this.entity.visible=n.value.x<.5),this._lightComponent){let e=this.animations.get(`color`);e&&this._lightComponent.color.copy(e.setFrame(t).value)}this.uniformCurves.forEach((e,n)=>{this.uniforms[n].value=e.setFrame(t).value})}},Gt=class extends Pt{name;position;euler;quaternion;scale;matrix;matrixWorld;matrixWorldPrev;_matrixWorldHistoryInitialized;autoMatrixUpdate;parent;children;components;componentsSorted;visible;userData;unresolvedComponents;_engine;constructor(e){super(),this._engine=e.engine,this.name=e.name??``,this.position=new j(0,0,0,1),this.euler=new lt,this.quaternion=new ut(0,0,0,1),this.scale=new j(1,1,1),this.matrix=new M,this.matrixWorld=new M,this.matrixWorldPrev=new M,this._matrixWorldHistoryInitialized=!1,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.unresolvedComponents=[],this.field(`name`,()=>this.name,e=>this.name=e),this.field(`position`,()=>this.position.getElm(`vec3`),e=>this.position.setFromArray(e),{format:{type:`vector`}}),this.field(`euler`,()=>this.euler.getElm(`vec3`),e=>this.euler.setFromArray(e),{format:{type:`vector`}}),this.field(`scale`,()=>this.scale.getElm(`vec3`),e=>this.scale.setFromArray(e),{format:{type:`vector`}}),this.field(`visible`,()=>this.visible,e=>this.visible=e,{hidden:!0}),this.field(`children`,()=>this.children.map(e=>e.uuid),{hidden:!0}),this.field(`components`,()=>{let e=[];return this.components.forEach(t=>e.push(t.uuid)),e},{hidden:!0})}get engine(){return this._engine}update(e){let t={...e};t.matrix=this.matrixWorld,this.updateImpl(e);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].update(t);this.autoMatrixUpdate&&this.updateMatrix();for(let e=0;e<this.children.length;e++)this.children[e].update(t)}updateImpl(e){}postUpdate(e){let t={...e,matrix:this.matrixWorld};for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].postUpdate(t);for(let e=0;e<this.children.length;e++)this.children[e].postUpdate(t)}prepareRender(e){let t={...e,matrix:this.matrixWorld};this._matrixWorldHistoryInitialized||=(this.matrixWorldPrev.copy(this.matrixWorld),!0);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].prepareRender(t);for(let e=0;e<this.children.length;e++)this.children[e].prepareRender(t)}commitFrame(e){let t={...e,matrix:this.matrixWorld};this.matrixWorldPrev.copy(this.matrixWorld);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].commitFrame(t);for(let e=0;e<this.children.length;e++)this.children[e].commitFrame(t)}add(e){e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),this.noticeField(`children`)}remove(e){this.children=this.children.filter(t=>t.uuid!=e.uuid),this.noticeField(`children`)}updateMatrix(e){this.parent&&e&&this.parent.updateMatrix(!0);let t=this.parent?this.parent.matrixWorld:new M;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(t)}updateMatrixRecursive(e){this.autoMatrixUpdate&&this.updateMatrix(e);for(let e=0;e<this.children.length;e++)this.children[e].updateMatrixRecursive()}decomposeMatrix(e){e.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(e){this.decomposeMatrix(this.matrix.clone().multiply(e))}lookAt(e){let t=e.clone(),n=new j(0,1,0,0);if(this.parent){let e=this.parent.matrixWorld.clone().inverse();t.applyMatrix4AsPosition(e),n.applyMatrix4AsDirection(e).normalize()}let r=new M().lookAt(this.position,t,n);this.quaternion.setFromMatrix(r),this.updateMatrix()}addComponent(e,...t){this.removeComponent(e);let[n]=t,r=new e({entity:this,engine:this._engine,args:n||{}});return this.components.set(e,r),this.componentsSorted.push(r),this.componentsSorted.sort((e,t)=>e.order-t.order),this.noticeField(`components`),this.emit(`componentAdded`,[r]),r}removeComponent(e){let t=this.components.get(e);t&&t.dispose(),this.components.delete(e),this.componentsSorted=this.componentsSorted.filter(e=>e!==t),this.noticeField(`components`),t&&this.emit(`componentRemoved`,[t])}removeComponentByUUID(e){for(let t of this.components){let n=t[0],r=t[1];if(r.uuid===e)return r.dispose(),this.components.delete(n),this.componentsSorted=this.componentsSorted.filter(e=>e!==r),this.noticeField(`components`),this.emit(`componentRemoved`,[r]),r}}getComponent(e){return this.components.get(e)}getComponentByUUID(e){for(let t of this.components.values())if(t.uuid===e)return t;return null}getComponentByTag(e){for(let t of this.components.values())if(t.tag===e)return t;return null}getComponentsByTag(e){let t=[];return this.components.forEach(n=>{n.tag==e&&t.push(n)}),t}findEntityByName(e){if(this.name==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByName(e);if(n)return n}}findEntityByUUID(e){if(this.uuid==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByUUID(e);if(n)return n}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(e){let t=`/`+this.name;return e&&e.uuid==this.uuid||this.parent&&(t=this.parent.getScenePath(e)+t),t}noticeEventChilds(e,t){this.emit(e,t);for(let n=0;n<this.children.length;n++)this.children[n].noticeEventChilds(e,t)}noticeEventParent(e,t){this.emit(e,t),this.parent&&this.parent.noticeEventParent(e,t)}traverse(e){e(this),this.children.forEach(t=>t.traverse(e))}isVisibleTraverse(){return this.visible?!this.parent||this.parent.isVisibleTraverse():!1}dispose(){this.emit(`dispose`),this.parent&&this.parent.remove(this),this.components.forEach(e=>{e.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(e=>{e.disposeRecursive()}),this.children=[]}},Kt=class extends P{constructor(e){super();let{innerRadius:t,outerRadius:n,thetaSegments:r,phiSegments:i,extrude:a}={innerRadius:.4,outerRadius:.5,thetaSegments:12,phiSegments:1,extrude:0,...e},o=r+1,s=[],c=[],l=[],u=[],d=(r+1)*(i+1);for(let e=0;e<(a==0?1:2);e++){let f=e==0?-1:1,p=a==0?0:a/2*f;for(let a=0;a<i+1;a++){let m=t+(n-t)*(a/i);for(let t=0;t<=r;t++){let n=t/r*Math.PI*2,h=Math.cos(n)*m,g=Math.sin(n)*m;if(s.push(h,g,p),l.push(t/r,a/i),c.push(0,0,1*f),a>0&&t<r){let n=d*e+a*o+t;e==0?u.push(n,n-o,n+1,n+1,n-o,n+1-o):u.push(n,n+1,n-o,n+1,n+1-o,n-o)}}}}if(a!=0){for(let e=0;e<2;e++){let o=e==0?t:n;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let u=n/r*Math.PI*2,d=Math.cos(u)*o,f=Math.sin(u)*o;s.push(d,f,(-.5+t)*a),l.push(n/r,t/i),e==0?c.push(-Math.cos(u),-Math.sin(u),0):c.push(Math.cos(u),Math.sin(u),0)}}let e=d*2;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let i=e+n+r*2*t,a=n==r-1?-r:0;t==0?u.push(i,i+r,i+r+1+a,i,i+r+1+a,i+1+a):u.push(i,i+r+1+a,i+r,i,i+1+a,i+r+1+a)}}this.setAttribute(`position`,new Float32Array(s),3),this.setAttribute(`normal`,new Float32Array(c),3),this.setAttribute(`uv`,new Float32Array(l),2),this.setAttribute(`index`,new Uint16Array(u),1)}},qt=new Map,Jt=(e,t)=>qt.get(e)||(qt.set(e,t),t),Yt=class{origin;direction;constructor(e,t){this.origin=e||new j,this.direction=t||new j(0,0,-1)}setFromCamera(e,t,n){let r=new j(e.x,e.y,-1,1).applyMatrix4(t).applyMatrix4(n);r.x/=r.w,r.y/=r.w,r.z/=r.w;let i=new j(e.x,e.y,1,1).applyMatrix4(t).applyMatrix4(n);return i.x/=i.w,i.y/=i.w,i.z/=i.w,this.origin.set(r.x,r.y,r.z),this.direction.set(i.x-r.x,i.y-r.y,i.z-r.z).normalize(),this}intersectAABB(e,t){let n=1/this.direction.x,r=1/this.direction.y,i=1/this.direction.z,a=(e.x-this.origin.x)*n,o=(t.x-this.origin.x)*n,s=Math.min(a,o),c=Math.max(a,o);if(a=(e.y-this.origin.y)*r,o=(t.y-this.origin.y)*r,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),a=(e.z-this.origin.z)*i,o=(t.z-this.origin.z)*i,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),c<0||s>c)return null;let l=s>=0?s:c;return{distance:l,point:new j(this.origin.x+this.direction.x*l,this.origin.y+this.direction.y*l,this.origin.z+this.direction.z*l)}}intersectTriangle(e,t,n){let r=1e-8,i=t.x-e.x,a=t.y-e.y,o=t.z-e.z,s=n.x-e.x,c=n.y-e.y,l=n.z-e.z,u=this.direction.y*l-this.direction.z*c,d=this.direction.z*s-this.direction.x*l,f=this.direction.x*c-this.direction.y*s,p=i*u+a*d+o*f;if(p>-1e-8&&p<r)return null;let m=1/p,h=this.origin.x-e.x,g=this.origin.y-e.y,_=this.origin.z-e.z,v=m*(h*u+g*d+_*f);if(v<0||v>1)return null;let y=g*o-_*a,b=_*i-h*o,x=h*a-g*i,S=m*(this.direction.x*y+this.direction.y*b+this.direction.z*x);if(S<0||v+S>1)return null;let C=m*(s*y+c*b+l*x);return C>r?{distance:C,point:new j(this.origin.x+this.direction.x*C,this.origin.y+this.direction.y*C,this.origin.z+this.direction.z*C)}:null}},Xt=class{ray;_v0;_v1;_v2;constructor(){this.ray=new Yt,this._v0=new j,this._v1=new j,this._v2=new j}setFromCamera(e,t){let n=t.getComponentsByTag(`camera`)[0];if(!n)return;let r=n.projectionMatrix.clone().inverse(),i=n.viewMatrix.clone().inverse();this.ray.setFromCamera(e,r,i)}intersectEntities(e){let t=[];return e.traverse(e=>{if(!e.visible)return;let n=e.getComponent(F);if(!n)return;let r=this.intersectMesh(e,n);r&&t.push(...r)}),t.sort((e,t)=>e.distance-t.distance),t}intersectMesh(e,t){let n=t.geometry,r=n.boundingBox;if(!r)return null;let i=e.matrixWorld.clone().inverse(),a=new Yt;a.origin.copy(this.ray.origin),a.origin.w=1,a.origin.applyMatrix4(i),a.origin.x/=a.origin.w,a.origin.y/=a.origin.w,a.origin.z/=a.origin.w;let o=this.ray.origin.clone().add(this.ray.direction);if(o.w=1,o.applyMatrix4(i),o.x/=o.w,o.y/=o.w,o.z/=o.w,a.direction.set(o.x-a.origin.x,o.y-a.origin.y,o.z-a.origin.z).normalize(),!a.intersectAABB(r.min,r.max))return null;let s=this.intersectTriangles(a,n);if(!s)return null;let c=s.point.clone();c.w=1,c.applyMatrix4(e.matrixWorld),c.x/=c.w,c.y/=c.w,c.z/=c.w;let l=c.x-this.ray.origin.x,u=c.y-this.ray.origin.y,d=c.z-this.ray.origin.z;return[{entity:e,distance:Math.sqrt(l*l+u*u+d*d),point:c}]}intersectTriangles(e,t){let n=t.getAttribute(`position`);if(!n)return null;let r=n.array,i=t.getAttribute(`index`),a=i?i.array:null,o=Math.floor((a?a.length:t.vertCount)/3),s=null;for(let t=0;t<o;t++){let n=(a?a[t*3+0]:t*3+0)*3,i=(a?a[t*3+1]:t*3+1)*3,o=(a?a[t*3+2]:t*3+2)*3;this._v0.set(r[n],r[n+1],r[n+2]),this._v1.set(r[i],r[i+1],r[i+2]),this._v2.set(r[o],r[o+1],r[o+2]);let c=e.intersectTriangle(this._v0,this._v1,this._v2);c&&(!s||c.distance<s.distance)&&(s=c)}return s}},Zt;(function(e){let t=e.assign=(e,...t)=>{for(let n=0;n<t.length;n++)t[n]!=null&&Object.assign(e,t[n]);return e};e.merge=(...e)=>t({},...e)})(Zt||={});var Qt=class extends Ft{_resolution;_postProcesses;constructor(e){super(e),this._postProcesses=[],this._resolution=new j}get postProcesses(){return this._postProcesses}add(e){return this.postProcesses.push(e),e.resize(this._resolution),e}remove(e){let t=this._postProcesses.indexOf(e);t>-1&&this._postProcesses.splice(t,1)}resize(e){(this._resolution.x!=e.x||this._resolution.y!=e.y)&&(this._resolution.copy(e),this.resizePostProcesses())}resizePostProcesses(){this.postProcesses.forEach(e=>{e.resize(this._resolution)})}},$t=class extends Pt{name;vert;frag;defines;uniforms;useLight;depthTest;depthWrite;cullFace;drawType;blending;renderOrder;visibilityFlag;programCache;constructor(e){super(),e||={},this.name=e.name||``,this.visibilityFlag={},this.setVisibility(e.phase||[`shadowMap`,`deferred`]),this.useLight=e.useLight===void 0||e.useLight,this.depthTest=e.depthTest===void 0||e.depthTest,this.cullFace=e.cullFace!==void 0&&e.cullFace,this.depthWrite=e.depthWrite===void 0||e.depthWrite,this.drawType=e.drawType||`TRIANGLES`,this.blending=e.blending||`NORMAL`,this.renderOrder=e.renderOrder??0,this.vert=e.vert||`#define PI 3.14159265359\r
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
}`,this.defines=e.defines||{},this.uniforms=e.uniforms||{},this.programCache={}}setVisibility(e){this.visibilityFlag={shadowMap:e.indexOf(`shadowMap`)>-1,deferred:e.indexOf(`deferred`)>-1,forward:e.indexOf(`forward`)>-1,ui:e.indexOf(`ui`)>-1,envMap:e.indexOf(`envMap`)>-1,postprocess:e.indexOf(`postprocess`)>-1}}requestUpdate(){this.programCache={}}},en=class extends Pt{name;enabled;_passes;constructor(e){super();let t=e||{};this.name=t.name||``,this.enabled=!0,this._passes=e&&e.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(e=>e.enabled)}get output(){for(let e=this._passes.length-1;e>=0;e--){let t=this._passes[e];if(!t.passThrough&&t.enabled)return t.renderTarget}return null}resize(e){if(this._passes)for(let t=0;t<this._passes.length;t++)this._passes[t].resize(e)}dispose(){this.emit(`dispose`)}},I=class extends $t{enabled;renderTarget;backBufferOverride;clearColor;clearDepth;resolutionRatio;passThrough;resolution;resolutionInv;viewPort;_fixedResolution;constructor(e,t){super({...t,frag:t.frag||`#define PI 3.14159265359\r
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
}`}),this.enabled=!0,this._fixedResolution=t.fixedResotluion?t.fixedResotluion.clone():null,this.resolution=new j,this.resolutionInv=new j,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:`2fv`},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:`2fv`},this.renderTarget=t.renderTarget===void 0?e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]):t.renderTarget,this.clearColor=t.clearColor??null,this.clearDepth=t.clearDepth??null,this.depthTest=t.depthTest!==void 0&&t.depthTest,this.resolutionRatio=t.resolutionRatio||1,this.passThrough=t.passThrough??!1,this.viewPort=t.viewPort||null,this.backBufferOverride=t.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(e){this._fixedResolution=e,this.resize(e||new j)}onAfterRender(){}resize(e){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(e).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(e){this.renderTarget=e,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}},tn=class extends gt{material;_renderer;_resolution;_postProcess;_frameBuffer;constructor(e,t){let n=e.backend,r=n.gl;super(r),this._renderer=e,this._resolution=t.resolution||new j(1024,1024),this.setting({wrapS:r.REPEAT,wrapT:r.REPEAT,magFilter:r.LINEAR,minFilter:r.LINEAR}),this._frameBuffer=new _t(r).setTexture([this]).setSize(this._resolution),this.material=new I(n,{...t,renderTarget:this._frameBuffer}),this._postProcess=new en({passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}},nn=`#define PI 3.14159265359\r
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
}`,rn=`#define PI 3.14159265359\r
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

}`,an=`#define PI 3.14159265359\r
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

}`,on=`#define PI 3.14159265359\r
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

}`,sn=`#define PI 3.14159265359\r
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

}`,cn=e=>{let t=[];for(let n=0;n<e;n++){let r=new j;r.x=Math.random()*2-1,r.y=Math.random()*2-1,r.z=n/e*.95+.05,r.normalize(),r.multiply(n/e*.95+.05),t.push(...r.getElm(`vec3`))}return t},ln=class extends Tt{postprocess;normalSelector_;lightShaft;rtLightShaft1;rtLightShaft2;ssao;rtSSAO1;rtSSAO2;ssaoBlur;ssaoBlurV;ssaoBlurUni;shading;constructor(e){super();let t=e.backend,n=new I(t,{name:`normalSelector`,frag:an,renderTarget:null,uniforms:Zt.merge({uNormalTexture:{value:null,type:`1i`},uPosTexture:{value:null,type:`1i`},uSelectorTexture:{value:null,type:`1i`}}),passThrough:!0}),r=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),i=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),a=new I(t,{name:`lightShaft`,frag:rn,renderTarget:r,uniforms:Zt.merge({uLightShaftBackBuffer:{value:i.textures[0],type:`1i`},uDepthTexture:{value:null,type:`1i`}}),resolutionRatio:.5,passThrough:!0}),o=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),s=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),c=new I(t,{name:`ssao`,frag:on,renderTarget:Jt(`ssao`,o),uniforms:Zt.merge({uSSAOBackBuffer:{value:s.textures[0],type:`1i`},uSSAOKernel:{value:cn(16),type:`3fv`}}),resolutionRatio:.5,passThrough:!0}),l=Zt.merge({uSSAOTexture:{value:s.textures[0],type:`1i`},uDepthTexture:{value:null,type:`1i`},uNormalTexture:{value:null,type:`1i`},uWeights:{type:`1fv`,value:dt.gaussWeights(8)}}),u=new I(t,{name:`ssaoBlur/h`,frag:Jt(`ssaoBlur`,sn),uniforms:l,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:8}}),d=new I(t,{name:`ssaoBlur/v`,frag:Jt(`ssaoBlur`,sn),uniforms:Zt.merge(l,{uSSAOTexture:{value:u.renderTarget.textures[0],type:`1i`}}),defines:{SSAOSAMPLE:8,IS_VIRT:``},resolutionRatio:1,passThrough:!0}),f=new I(t,{name:`deferredShading`,frag:Jt(`deferredShading`,nn),uniforms:Zt.merge({uLightShaftTexture:{value:null,type:`1i`},uSSAOTexture:{value:d.renderTarget.textures[0],type:`1i`},uSSAOResolutionInv:{value:c.resolutionInv,type:`2fv`},uEnvMap:{value:e.envMap,type:`1i`}})});this.postprocess=new en({passes:[n,a,c,u,d,f]}),this.shading=f,this.lightShaft=a,this.ssao=c,this.rtSSAO1=o,this.rtSSAO2=s,this.ssaoBlur=u,this.ssaoBlurV=d,this.ssaoBlurUni=l,this.rtLightShaft1=r,this.rtLightShaft2=i,this.normalSelector_=n}update(e){let t=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=t,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],t=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=t,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setPassEnabled(e){e.ssao!==void 0&&(this.ssao.enabled=e.ssao,this.ssaoBlur.enabled=e.ssao,this.ssaoBlurV.enabled=e.ssao,e.ssao||(this.rtSSAO1.clear(),this.rtSSAO2.clear(),this.ssaoBlur.renderTarget&&this.ssaoBlur.renderTarget.clear(),this.ssaoBlurV.renderTarget&&this.ssaoBlurV.renderTarget.clear())),e.lightShaft!==void 0&&(this.lightShaft.enabled=e.lightShaft,e.lightShaft||(this.rtLightShaft1.clear(),this.rtLightShaft2.clear()))}setRenderCamera(e,t){for(let e=0;e<t.gBuffer.textures.length;e++){let n=t.gBuffer.textures[e];e===1&&(n=t.normalBuffer.textures[0]),this.shading.uniforms[`sampler`+e]=this.ssao.uniforms[`sampler`+e]={type:`1i`,value:n}}this.ssaoBlur.uniforms.uDepthTexture.value=t.gBuffer.textures[0],this.lightShaft.uniforms.uDepthTexture.value=t.gBuffer.depthTexture,this.shading.renderTarget=t.shadingBuffer,this.normalSelector_.renderTarget=t.normalBuffer,this.normalSelector_.uniforms.uNormalTexture.value=t.gBuffer.textures[1],this.normalSelector_.uniforms.uPosTexture.value=t.gBuffer.textures[0],this.normalSelector_.uniforms.uSelectorTexture.value=t.gBuffer.textures[3],this.ssaoBlurUni.uNormalTexture.value=t.normalBuffer.textures[0]}resize(e){this.postprocess.resize(e)}},un=`#define PI 3.14159265359\r
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
}`,dn=`#define PI 3.14159265359\r
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
}`,fn=`#define PI 3.14159265359\r
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
`,pn=`#define PI 3.14159265359\r
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

}`,mn=`in vec2 vUv;

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

}`,hn=`in vec2 vUv;
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

}`,gn=`in vec2 vUv;
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

}`,_n=`#define PI 3.14159265359\r
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
}`,vn=`#define PI 3.14159265359\r
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

}`,yn=class{dofCoc;dofBokeh;dofComposite;rtSSR1;rtSSR2;postprocess;_ssr;_ssComposite;_dofParams;_motionBlur;_motionBlurTile;_motionBlurNeighbor;_camera;constructor(e){let t=new I(e,{name:`collection`,frag:un}),n=e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),r=e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),i=new I(e,{name:`ssr`,frag:Jt(`ssr`,vn),renderTarget:n,uniforms:Zt.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSceneTex:{value:null,type:`1i`},uSSRBackBuffer:{value:r.textures[0],type:`1i`}}),resolutionRatio:.5,passThrough:!0}),a=new I(e,{name:`ssComposite`,frag:Jt(`ssComposite`,_n),uniforms:Zt.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSSRTexture:{value:r.textures[0],type:`1i`}})}),o=new j(10,.05,20,.05),s=new I(e,{name:`dof/coc`,frag:fn,uniforms:Zt.merge({uGbufferPos:{value:null,type:`1i`},uParams:{value:o,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR,internalFormat:N.RGBA16F,type:N.HALF_FLOAT,format:N.RGBA})]),passThrough:!0,resolutionRatio:.5}),c=new I(e,{name:`dof/bokeh`,frag:dn,uniforms:Zt.merge({uCocTex:{value:s.renderTarget.textures[0],type:`1i`},uParams:{value:o,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),passThrough:!0,resolutionRatio:.5}),l=new I(e,{name:`dof/composite`,frag:pn,uniforms:Zt.merge({uBokeTex:{value:c.renderTarget.textures[0],type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR,internalFormat:N.RGBA16F,type:N.HALF_FLOAT,format:N.RGBA})])}),u=new I(e,{name:`motionBlurTile`,frag:gn,uniforms:Zt.merge({uVelTex:{value:null,type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA})]),defines:{TILE:16},resolutionRatio:1/16,passThrough:!0}),d=new I(e,{name:`motionBlurNeighbor`,frag:hn,uniforms:Zt.merge({uVelTex:{value:u.renderTarget.textures[0],type:`1i`}}),defines:{TILE:16},renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA})]),resolutionRatio:1/16,passThrough:!0}),f=new I(e,{name:`motionBlur`,frag:mn,uniforms:Zt.merge({uVelNeighborTex:{value:d.renderTarget.textures[0],type:`1i`},uVelTex:{value:null,type:`1i`},uDepthTexture:{value:null,type:`1i`},uPower:{value:1,type:`1f`}}),defines:{TILE:16}});this.postprocess=new en({passes:[t,i,a,s,c,l,u,d,f]}),this._ssr=i,this._ssComposite=a,this.dofCoc=s,this.dofBokeh=c,this.dofComposite=l,this._motionBlur=f,this._motionBlurTile=u,this._motionBlurNeighbor=d,this._dofParams=o,this.rtSSR1=n,this.rtSSR2=r,this._camera=null}update(e){if(!this._camera)return;let t=this._camera.fov,n=this._camera.dofParams.focusDistance,r=this._camera.dofParams.kFilmHeight,i=r/Math.tan(.5*(t/180*Math.PI)),a=1/this.dofBokeh.renderTarget.size.y*5,o=1/a,s=i*i/(this._camera.dofParams.fNumber*(n-i)*r*2);this._dofParams.set(n,a,o,s);let c=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=c,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(e){this.postprocess.resize(e)}setPassEnabled(e){e.motionBlur!==void 0&&(this._motionBlurTile.enabled=e.motionBlur,this._motionBlurNeighbor.enabled=e.motionBlur,this._motionBlur.enabled=e.motionBlur,e.motionBlur||(this._motionBlurTile.renderTarget&&this._motionBlurTile.renderTarget.clear(),this._motionBlurNeighbor.renderTarget&&this._motionBlurNeighbor.renderTarget.clear())),e.ssr!==void 0&&(this._ssr.enabled=e.ssr,this._ssComposite.enabled=e.ssr,e.ssr||(this.rtSSR1.clear(),this.rtSSR2.clear())),e.dof!==void 0&&(this.dofCoc.enabled=e.dof,this.dofBokeh.enabled=e.dof,this.dofComposite.enabled=e.dof,e.dof||(this.dofBokeh.renderTarget&&this.dofBokeh.renderTarget.clear(),this.dofComposite.renderTarget&&this.dofComposite.renderTarget.clear()))}setMotionBlurPower(e){this._motionBlur.uniforms.uPower.value=e}setRenderCamera(e,t){this._camera=e,this.postprocess.passes[0]&&(this.postprocess.passes[0].backBufferOverride=t.shadingBuffer.textures),this._ssr.uniforms.uGbufferPos.value=t.gBuffer.textures[0],this._ssr.uniforms.uGbufferNormal.value=t.normalBuffer.textures[0],this._ssr.uniforms.uSceneTex.value=t.forwardBuffer.textures[0],this._ssComposite.uniforms.uGbufferPos.value=t.gBuffer.textures[0],this._ssComposite.uniforms.uGbufferNormal.value=t.gBuffer.textures[1],this.dofCoc.uniforms.uGbufferPos.value=t.gBuffer.textures[0],this._motionBlurTile.uniforms.uVelTex.value=t.gBuffer.textures[4],this._motionBlur.uniforms.uVelTex.value=t.gBuffer.textures[4],this._motionBlur.uniforms.uDepthTexture.value=t.gBuffer.depthTexture}},bn=`#define PI 3.14159265359\r
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

}`,xn=class extends Tt{postprocess;resolution;renderTarget;pmremPasses;swapBuffers;timeUniforms;constructor(e,t){super();let n=t.resolution,r={uTimeEF:{value:0,type:`1f`}},i=e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA,magFilter:N.LINEAR,minFilter:N.LINEAR,wrapS:N.CLAMP_TO_EDGE,wrapT:N.CLAMP_TO_EDGE})]),a=[],o=[],s=[],c=0;for(let l=0;l<5;l++){let u=1/2**l,d=n.x*u,f=n.y*u*.5,p=new j(0,c,d,f);c+=f,s.push({rt1:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA})]),rt2:e.createFrameBuffer().setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA})])});let m=1/4*l,h=new I(e,{renderTarget:s[l].rt1,frag:bn,uniforms:Zt.merge(r,{uRoughness:{value:m,type:`1f`},uEnvMap:{value:t.input,type:`1i`},uPMREMBackBuffer:{value:s[l].rt2.textures,type:`1i`},uRenderCount:{value:1,type:`1f`}}),defines:{NUM_SAMPLES:Math.floor(2**(l+1))}});h.resize(new j(d,f));let g=new I(e,{renderTarget:i,viewPort:p,passThrough:!0});g.resize(n),a.push(h,g),o.push(h)}this.postprocess=new en({passes:a}),this.postprocess.passes[0].backBufferOverride=i.textures,this.resolution=n,this.renderTarget=i,this.pmremPasses=o,this.swapBuffers=s,this.timeUniforms=r}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let e=0;e<this.pmremPasses.length;e++){let t=this.pmremPasses[e],n=this.swapBuffers[e],r=n.rt1;n.rt1=n.rt2,n.rt2=r,t.setRendertarget(n.rt1),t.uniforms.uPMREMBackBuffer.value=n.rt2.textures}}resize(e){}},Sn=class{backend;pool;constructor(e){this.backend=e,this.pool=new Map}get(e,t,n){let r=e+t,i=this.pool.get(r);if(i!==void 0&&i.program)return i;let a=this.backend.createProgram();return n&&(a.name=n),a.setShader(e,t),this.pool.set(r,a),a}},Cn=`#define PI 3.14159265359\r
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
`,wn=class{entity;mesh;material;color;groundColor;_intensity;constructor(e){this.color=new j(1,1,1),this.groundColor=new j(.3,.3,.3),this._intensity=1,this.material=new $t({phase:[`deferred`,`envMap`],frag:Cn,cullFace:!1,uniforms:{uSkyColor:{value:this.color,type:`3fv`},uGroundColor:{value:this.groundColor,type:`3fv`},uSkyIntensity:{value:this._intensity,type:`1f`}}}),this.entity=e.createEntity({name:`sky`}),this.mesh=this.entity.addComponent(F),this.mesh.geometry=new zt({radius:500,widthSegments:32,heightSegments:32}),this.mesh.material=this.material}get intensity(){return this._intensity}set intensity(e){this._intensity=e,this.material.uniforms.uSkyIntensity.value=e}},Tn=new $t,En=e=>e.material||Tn,Dn=0,On=new j(1,1,1,1),kn=new j(0,0,0,1),An=[],jn=[],Mn=e=>An[e]||(An[e]={direction:`directionalLight[${e}].direction`,color:`directionalLight[${e}].color`,camNear:`uDirectionalLightCamera[${e}].near`,camFar:`uDirectionalLightCamera[${e}].far`,camViewMatrix:`uDirectionalLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uDirectionalLightCamera[${e}].projectionMatrix`,camResolution:`uDirectionalLightCamera[${e}].resolution`,shadowMap:`directionalLightShadowMap[${e}]`}),Nn=e=>jn[e]||(jn[e]={position:`uSpotLight[${e}].position`,direction:`uSpotLight[${e}].direction`,color:`uSpotLight[${e}].color`,angle:`uSpotLight[${e}].angle`,blend:`uSpotLight[${e}].blend`,distance:`uSpotLight[${e}].distance`,decay:`uSpotLight[${e}].decay`,camNear:`uSpotLightCamera[${e}].near`,camFar:`uSpotLightCamera[${e}].far`,camViewMatrix:`uSpotLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uSpotLightCamera[${e}].projectionMatrix`,camResolution:`uSpotLightCamera[${e}].resolution`,shadowMap:`spotLightShadowMap[${e}]`}),Pn=class e extends Pt{backend;canvas;resolution;globalUniforms;_renderTarget;_pipelineConfig;_pipelineOverride;programManager;_geometryBuffers;_lights;_lightsUpdated;_lightInfoCache;_envMapCameras;_envMapRenderTarget;_pmremRender;_deferredRenderer;_pipelinePostProcess;sky;_quad;_isCorrentCompiles;compileDrawParams;_tmpNormalMatrix;_tmpModelViewMatrix;_tmpViewMatrixInverseMatrix;_tmpLightDirection;_tmpModelMatrixInverse;_tmpProjectionMatrixInverse;_tmpResolution;_tmpResolutionUniform;_tmpUniformOverride;_tmpDrawParam;constructor(t,n){super(),this.backend=t,this.canvas=t.canvas,this.globalUniforms={},this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new Sn(t),this._geometryBuffers=new Map,this.resolution=new j,this._lights={directional:[],spot:[]},this._lightsUpdated=!1,this._lightInfoCache=new Map;let r=t.createCubeTexture();this._envMapRenderTarget=t.createCubeFrameBuffer().setTexture([r]),this._envMapRenderTarget.setSize(256,256);let i=new j(0,0,0),a=new j(0,-1,0),o=[new M().lookAt(i,new j(1,0,0),a),new M().lookAt(i,new j(0,1,0),new j(0,0,1)),new M().lookAt(i,new j(0,0,1),a),new M().lookAt(i,new j(-1,0,0),a),new M().lookAt(i,new j(0,-1,0),new j(0,0,-1)),new M().lookAt(i,new j(0,0,-1),a)];this._envMapCameras=[];for(let e=0;e<6;e++){let t=n.createEntity({name:`envMapCamera/`+e}),r=t.addComponent(Bt);r.fov=90,r.near=.1,r.far=1e3,r.aspect=1,t.applyMatrix(o[e].clone()),r.updateViewMatrix(),r.updateProjectionMatrix(),this._envMapCameras.push({entity:t,camera:r})}this._pmremRender=new xn(t,{input:[r],resolution:new j(768,1024)}),this._deferredRenderer=new ln({backend:t,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:r}),this._pipelinePostProcess=new yn(t),this._quad=new Rt({width:2,height:2}),this._tmpLightDirection=new j,this._tmpModelMatrixInverse=new M,this._tmpViewMatrixInverseMatrix=new M,this._tmpProjectionMatrixInverse=new M,this._tmpModelViewMatrix=new M,this._tmpNormalMatrix=new M,this._tmpResolution=new j,this._tmpResolutionUniform={value:this._tmpResolution,type:`2fv`},this._tmpUniformOverride={},this._tmpDrawParam={},this._renderTarget=e.createRenderTarget(t),this.sky=new wn(n),this._pipelineConfig={motionBlur:!0,motionBlurPower:1,ssr:!0,ssao:!0,lightShaft:!0,dof:!0},this._pipelineOverride=null;let s=this.fieldDir(`sky`);s.field(`skyColor`,()=>this.sky.color.getElm(`vec3`),e=>{this.sky.color.set(e[0],e[1],e[2])},{format:{type:`vector`}}),s.field(`groundColor`,()=>this.sky.groundColor.getElm(`vec3`),e=>{this.sky.groundColor.set(e[0],e[1],e[2])},{format:{type:`vector`}}),s.field(`intensity`,()=>this.sky.intensity,e=>{this.sky.intensity=e},{step:.1}),s.field(`reset`,()=>()=>{this.setField(`sky/skyColor`,[1,1,1]),this.setField(`sky/groundColor`,[.3,.3,.3]),this.setField(`sky/intensity`,1)},void 0,{label:`Reset to Default`});let c=this.fieldDir(`pipeline`);[`motionBlur`,`ssr`,`ssao`,`dof`,`lightShaft`].forEach(e=>{let t=c.dir(e);t.field(`enabled`,()=>this._pipelineConfig[e],t=>{this._pipelineConfig[e]=t,this.applyPipelineConfig(this._pipelineConfig)}),e===`motionBlur`&&t.field(`power`,()=>this._pipelineConfig.motionBlurPower,e=>{this._pipelineConfig.motionBlurPower=e,this.applyPipelineConfig(this._pipelineConfig)},{step:.1})})}get renderTarget(){return this._renderTarget}static createRenderTarget(e){let t=e.createFrameBuffer();t.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA,magFilter:N.NEAREST,minFilter:N.NEAREST}),e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA}),e.createTexture(),e.createTexture(),e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA})]);let n=e.createFrameBuffer({disableDepthBuffer:!0});n.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA}),e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA})]);let r=e.createFrameBuffer({disableDepthBuffer:!0});r.setDepthTexture(t.depthTexture),r.setTexture([n.textures[0],t.textures[0],t.textures[4]]);let i=e.createFrameBuffer({disableDepthBuffer:!0});i.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA16F,format:N.RGBA,magFilter:N.LINEAR,minFilter:N.LINEAR})]);let a=e.createFrameBuffer({disableDepthBuffer:!0});a.setDepthTexture(t.depthTexture),a.setTexture([e.createTexture()]);let o=e.createFrameBuffer();return o.setTexture([e.createTexture().setting({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA,magFilter:N.NEAREST,minFilter:N.NEAREST})]),{gBuffer:t,shadingBuffer:n,forwardBuffer:r,refractionBuffer:i,uiBuffer:a,normalBuffer:o}}static resizeRenderTarget(e,t){e.gBuffer.setSize(t),e.shadingBuffer.setSize(t),e.forwardBuffer.setSize(t),e.refractionBuffer.setSize(t),e.uiBuffer.setSize(t),e.normalBuffer.setSize(t)}getRenderStack(e){let t={light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]};return this._collectRenderStack(e,!0,t),this._collectRenderStack(this.sky.entity,!0,t),t}_collectRenderStack(e,t,n){let r=t&&e.visible,i=e.getComponent(F);if(i&&r){let t=En(i);t.visibilityFlag.deferred&&n.deferred.push(e),t.visibilityFlag.shadowMap&&n.shadowMap.push(e),t.visibilityFlag.forward&&n.forward.push(e),t.visibilityFlag.ui&&n.ui.push(e),t.visibilityFlag.envMap&&n.envMap.push(e)}let a=e.getComponent(Ht);a&&a.enabled&&r&&n.light.push(e);for(let t=0;t<e.children.length;t++)this._collectRenderStack(e.children[t],r,n)}render(e,t,n,r){if(this.resolution.x===0||this.resolution.y===0)return;let i=this.getRenderStack(e),a=[],o={},s=Object.keys(this._lights);for(let e=0;e<s.length;e++){let t=s[e];o[t]=this._lights[t].length,this._lights[t]=[]}for(let e=0;e<i.light.length;e++){let t=i.light[e],n=t.getComponent(Ht);if(n){let e=this.collectLight(t,n);n.castShadow&&e.renderTarget&&a.push(e)}}this._lights.directional.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lights.spot.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lightsUpdated=!1;for(let e=0;e<s.length;e++){let t=s[e];if(o[t]!=this._lights[t].length){this._lightsUpdated=!0;break}}for(let e=0;e<a.length;e++){let t=a[e];this.renderCamera(`shadowMap`,t.component.entity,i.shadowMap,t.renderTarget,this.resolution)}for(let e=0;e<this._envMapCameras.length;e++){let{entity:t}=this._envMapCameras[e];this._envMapRenderTarget.face(e),this.renderCamera(`envMap`,t,i.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap();let c=r||this._renderTarget,l=t.getComponentsByTag(`camera`)[0];if(l){this.backend.setBlendEnabled(!1),this.renderCamera(`deferred`,t,i.deferred,c.gBuffer,this.resolution),this._deferredRenderer.setRenderCamera(l,c),this.renderPostProcess(this._deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:l.viewMatrix,viewMatrixPrev:l.viewMatrixPrev,projectionMatrix:l.projectionMatrix,projectionMatrixPrev:l.projectionMatrixPrev,cameraMatrixWorld:t.matrixWorld}}),this._deferredRenderer.update(n),this._copyToRefraction(c);let e=i.forward.slice().sort((e,t)=>En(e.getComponent(F)).renderOrder-En(t.getComponent(F)).renderOrder),r=[],a=null;for(let t of e){let e=En(t.getComponent(F)).renderOrder;(a===null||e!==a)&&(r.push([]),a=e),r[r.length-1].push(t)}this.backend.setBlendEnabled(!0);for(let e=0;e<r.length;e++)e>0&&this._copyToRefraction(c),this.renderCamera(`forward`,t,r[e],c.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:c.refractionBuffer.textures[0],type:`1i`},uDeferredResolution:{value:c.shadingBuffer.size,type:`2fv`},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:`1i`},uGbufferNormal:{value:c.normalBuffer.textures[0],type:`1i`},uGbufferAlbedo:{value:c.gBuffer.textures[2],type:`1i`},uGbufferMaterial:{value:c.gBuffer.textures[3],type:`1i`}},disableClear:!0});this.backend.setBlendEnabled(!1),this._pipelinePostProcess.setRenderCamera(l,c),this.renderPostProcess(this._pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:l.viewMatrix,projectionMatrix:l.projectionMatrix,cameraMatrixWorld:t.matrixWorld,cameraNear:l.near,cameraFar:l.far}}),this._pipelinePostProcess.update(n);let o=this._pipelinePostProcess.postprocess.output?this._pipelinePostProcess.postprocess.output:void 0,s=t.getComponent(Qt);if(s){s.resize(this.resolution);for(let e=0;e<s.postProcesses.length;e++){let n=s.postProcesses[e];n.enabled&&n.hasOutput&&(this.renderPostProcess(n,o,this.resolution,{cameraOverride:{viewMatrix:l.viewMatrix,projectionMatrix:l.projectionMatrix,cameraMatrixWorld:t.matrixWorld,cameraNear:l.near,cameraFar:l.far}}),o=n.output||void 0)}}if(o){let e=o.size;this.backend.blit(o,c.uiBuffer,e.x,e.y)}this.backend.setBlendEnabled(!0),this.renderCamera(`forward`,t,i.ui,c.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:c.refractionBuffer.textures[0],type:`1i`}},disableClear:!0}),this.backend.setBlendEnabled(!1),this.backend.blit(c.uiBuffer,null,this.resolution.x,this.resolution.y)}}renderCamera(e,t,n,r,i,a){let o=t.getComponentsByTag(`camera`)[0]||t.getComponent(Ht);a||={};let s=this._tmpDrawParam;s.viewMatrix=o.viewMatrix,s.viewMatrixPrev=o.viewMatrixPrev,s.projectionMatrix=o.projectionMatrix,s.projectionMatrixPrev=o.projectionMatrixPrev,s.cameraMatrixWorld=t.matrixWorld,s.cameraNear=o.near,s.cameraFar=o.far,s.renderTarget=r,s.uniformOverride=a.uniformOverride||this._tmpUniformOverride,a.cameraOverride&&Object.assign(s,a.cameraOverride),this.backend.bindRenderTarget(r,o.viewPort,i),r?this._tmpResolution.set(r.size.x,r.size.y):this._tmpResolution.set(i.x,i.y),s.uniformOverride.uResolution=this._tmpResolutionUniform,a.disableClear||this.backend.clear(e==`shadowMap`?On:kn,1);for(let t=0;t<n.length;t++){let r=n[t],i=r.getComponentsByTag(`materialOverride`)[0],a=r.getComponent(F),c=i&&i.material||En(a),l=a.geometry;s.modelMatrixWorld=r.matrixWorld,s.modelMatrixWorldPrev=r.matrixWorldPrev,s.label=`cam[${o.uuid}]/${r.name||c.name||`-`}`,this.draw(r.uuid,e,l,c,s)}}_copyToRefraction(e){let t=e.shadingBuffer.size;this.backend.blit(e.shadingBuffer,e.refractionBuffer,t.x,t.y,!0,!0)}collectLight(e,t){let n=t.lightType,r=this._lightInfoCache.get(t);return r||(r={position:new j,direction:new j,color:new j,renderTarget:null,component:t},this._lightInfoCache.set(t,r)),r.position.set(0,0,0,1).applyMatrix4(e.matrixWorld),r.direction.set(0,1,0,0).applyMatrix4(e.matrixWorld).normalize(),r.color.set(t.color.x,t.color.y,t.color.z).multiply(t.intensity*Math.PI),n==`directional`?this._lights.directional.push(r):n==`spot`&&this._lights.spot.push(r),t.castShadow&&r.renderTarget==null&&(r.renderTarget=this.backend.createFrameBuffer().setTexture([this.backend.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),r.renderTarget.setSize(t.shadowMapSize)),r}renderPostProcess(e,t,n,r){let i=t?t.textures:void 0;if(e.passes)for(let t=0;t<e.passes.length;t++){let a=e.passes[t];if(a.enabled===!1)continue;let o=a.renderTarget;this.backend.bindRenderTarget(o,a.viewPort,n),this.backend.clear(a.clearColor,a.clearDepth);let s=a.backBufferOverride||i||null;if(s)for(let e=0;e<s.length;e++)a.uniforms[`uBackBuffer`+e]={type:`1i`,value:s[e]};let c=r&&r.cameraOverride||{};c.label=a.name,c.renderTarget=o,this.draw(a.uuid,`postprocess`,this._quad,a,c),a.onAfterRender(),!a.passThrough&&a.renderTarget&&(i=a.renderTarget.textures)}}draw(e,t,n,r,i){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:e,renderType:t,geometry:n,material:r,param:{...i}});return}Dn=0,this.backend.setMaterialState(r.cullFace,r.depthTest,r.depthWrite);let a=r.programCache[t];if(!a||this._lightsUpdated){let e={...r.defines};t==`deferred`?e.IS_DEFERRED=``:t==`forward`||t==`envMap`?e.IS_FORWARD=``:t==`shadowMap`&&(e.IS_DEPTH=``);let n=wt(r.vert,e,this._lights),i=wt(r.frag,e,this._lights);a=this.programManager.get(n,i,r.name),r.programCache[t]=a}if(i&&(i.modelMatrixWorld&&(a.setUniform(`uModelMatrix`,`Matrix4fv`,i.modelMatrixWorld.elm),a.setUniform(`uModelMatrixInverse`,`Matrix4fv`,this._tmpModelMatrixInverse.copy(i.modelMatrixWorld).inverse().elm),i.modelMatrixWorldPrev&&a.setUniform(`uModelMatrixPrev`,`Matrix4fv`,i.modelMatrixWorldPrev.elm),i.viewMatrix&&(this._tmpModelViewMatrix.copy(i.modelMatrixWorld).preMultiply(i.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),a.setUniform(`uModelViewMatrix`,`Matrix4fv`,this._tmpModelViewMatrix.elm),a.setUniform(`uNormalMatrix`,`Matrix4fv`,this._tmpNormalMatrix.elm),a.setUniform(`uViewMatrixInverse`,`Matrix4fv`,this._tmpViewMatrixInverseMatrix.copy(i.viewMatrix).inverse().elm))),i.viewMatrix&&(a.setUniform(`uViewMatrix`,`Matrix4fv`,i.viewMatrix.elm),i.viewMatrixPrev&&a.setUniform(`uViewMatrixPrev`,`Matrix4fv`,i.viewMatrixPrev.elm)),i.projectionMatrix&&(a.setUniform(`uProjectionMatrix`,`Matrix4fv`,i.projectionMatrix.elm),a.setUniform(`uProjectionMatrixInverse`,`Matrix4fv`,this._tmpProjectionMatrixInverse.copy(i.projectionMatrix).inverse().elm),i.projectionMatrixPrev&&a.setUniform(`uProjectionMatrixPrev`,`Matrix4fv`,i.projectionMatrixPrev.elm)),i.cameraMatrixWorld&&(a.setUniform(`uCameraMatrix`,`Matrix4fv`,i.cameraMatrixWorld.elm),a.setUniform(`uCameraPosition`,`3f`,[i.cameraMatrixWorld.elm[12],i.cameraMatrixWorld.elm[13],i.cameraMatrixWorld.elm[14]])),t!=`deferred`&&(i.cameraNear&&a.setUniform(`uCameraNear`,`1f`,[i.cameraNear]),i.cameraFar&&a.setUniform(`uCameraFar`,`1f`,[i.cameraFar]))),r.useLight&&t!==`deferred`&&t!==`shadowMap`){for(let e=0;e<this._lights.directional.length;e++){let t=this._lights.directional[e],n=Mn(e);if(a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),t.renderTarget){let e=t.renderTarget.textures[0].activate(Dn++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}for(let e=0;e<this._lights.spot.length;e++){let t=this._lights.spot[e],n=Nn(e);if(i&&i.viewMatrix&&this._tmpLightDirection.copy(t.direction).applyMatrix3(i.viewMatrix),a.setUniform(n.position,`3fv`,t.position.getElm(`vec3`)),a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),a.setUniform(n.angle,`1fv`,[Math.cos(t.component.angle/2)]),a.setUniform(n.blend,`1fv`,[t.component.blend]),a.setUniform(n.distance,`1fv`,[t.component.distance]),a.setUniform(n.decay,`1fv`,[t.component.decay]),t.renderTarget){let e=t.renderTarget.textures[0].activate(Dn++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}}Rn(a,this.globalUniforms,r.uniforms,i&&i.uniformOverride);let o=a.getVAO(e.toString());if(o){let e=this._getGeometryBuffer(n);e.vaoVersions.get(o)!==n.updateVersion&&(n.attributes.forEach((t,n)=>{let r=e.buffers.get(n);r!==void 0&&(n==`index`?o.setIndex(r):o.setAttribute(n,r,t.size,t.opt))}),e.vaoVersions.set(o,n.updateVersion)),this.backend.draw(a,o,r.drawType,r.blending,void 0)}}_getGeometryBuffer(e){let t=this._geometryBuffers.get(e);if(t||(t={buffers:new Map,vaoVersions:new Map,version:-1},this._geometryBuffers.set(e,t)),t.version!==e.updateVersion){let n=t.buffers;n.forEach(e=>e.dispose()),n.clear(),t.vaoVersions.clear(),e.attributes.forEach((e,t)=>{n.set(t,new ht(this.backend.gl).setData(e.array,t==`index`?`ibo`:`vbo`,e.opt&&e.opt.usage))}),t.version=e.updateVersion}return t}applyPipelineConfig(e){this._pipelineConfig={...this._pipelineConfig,...e},this._applyEffectivePipelineConfig()}setPipelineOverride(e){this._pipelineOverride=e,this._applyEffectivePipelineConfig()}_applyEffectivePipelineConfig(){let e={...this._pipelineConfig,...this._pipelineOverride};this._deferredRenderer.setPassEnabled({ssao:e.ssao,lightShaft:e.lightShaft}),this._pipelinePostProcess.setPassEnabled({motionBlur:e.motionBlur,ssr:e.ssr,dof:e.dof}),this._pipelinePostProcess.setMotionBlurPower(e.motionBlurPower)}get pipelineConfig(){return this._pipelineConfig}resize(t){this.resolution.copy(t),e.resizeRenderTarget(this._renderTarget,t),this._deferredRenderer.resize(this.resolution),this._pipelinePostProcess.resize(this.resolution)}async compileShaders(e,t,n,r){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.render(e,t,n),this._isCorrentCompiles=!1;let i=this.compileDrawParams.length,a=0;for(let e=0;e<this.compileDrawParams.length;e++){let t=this.compileDrawParams[e];if(this.backend.bindRenderTarget(t.param.renderTarget||null),this.draw(t.drawId,t.renderType,t.geometry,t.material,t.param),await new Promise(e=>{setTimeout(()=>{e(null)},10)}),r){a++;let e=t.param&&t.param.label||`-`;r(`${t.renderType}/${e}/[${t.drawId}]`,a,i)}}}createTexProcedural(e){let t={...e.uniforms},n=e.textures||{},r=Object.keys(n);for(let e=0;e<r.length;e++)t[r[e]]={value:n[r[e]],type:`1i`};let i=new tn(this,{frag:e.frag,resolution:e.resolution,uniforms:t});return e.filter===`nearest`&&(i.setting({magFilter:N.NEAREST,minFilter:N.NEAREST}),i.render()),i}},Fn=e=>new Pn(new bt(document.createElement(`canvas`).getContext(`webgl2`,{antialias:!1,preserveDrawingBuffer:!0})),e),In=[],Ln=(e,t)=>{e!=null&&(typeof e==`number`||typeof e==`boolean`?In.push(e):`isVector`in e?In.push(...e.getElm(`vec`+t.charAt(0))):`isTexture`in e?(e.activate(Dn++),In.push(e.unit)):In.push(...e.elm))},Rn=(e,...t)=>{for(let n=0;n<t.length;n++){let r=t[n];if(!r)continue;let i=Object.keys(r);for(let t=0;t<i.length;t++){let n=i[t],a=r[n];if(!a)continue;let o=a.type,s=a.value;if(In.length=0,Array.isArray(s))for(let e=0;e<s.length;e++)Ln(s[e],o);else Ln(s,o);In.length>0&&e.setUniform(n,o,In)}}},zn=class extends en{_passes;date;constructor(e){super({...e}),this._passes=e.passes,this.date=new Date}get passes(){return this._passes}compute(e){let t=Math.min(1/60,(new Date().getTime()-this.date.getTime())/1e3);this.date=new Date,this.passes.forEach(e=>{e.uniforms.uDeltaTime.value=t}),e.renderPostProcess(this)}},Bn=class extends I{size;layerCnt;clearColor;rt1;rt2;outputUniforms;constructor(e,t){let n=Object.assign({type:N.FLOAT,internalFormat:N.RGBA32F,format:N.RGBA,magFilter:N.NEAREST,minFilter:N.NEAREST},t.textureParam),r=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),i=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),a={uGPUResolution:{value:t.size,type:`2fv`}};for(let e=0;e<t.dataLayerCount;e++)a[`uGPUSampler`+e]={value:i.textures[e],type:`1i`};super(e,{...t,vert:t.vert||`layout ( location = 0 ) in vec3 position;\r
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
}`,renderTarget:r,uniforms:Zt.merge(t.uniforms,a,{uDeltaTime:{value:0,type:`1f`}})}),this.size=t.size,this.layerCnt=t.dataLayerCount,this.rt1=r,this.rt2=i,this.renderTarget=this.rt1,this.clearColor=t.clearColor??null,this.outputUniforms=a}onAfterRender(){super.onAfterRender();for(let e=0;e<this.layerCnt;e++)this.outputUniforms[`uGPUSampler`+e].value=this.renderTarget.textures[e];let e=this.rt1;this.rt1=this.rt2,this.rt2=e,this.renderTarget=this.rt1}initTexture(e){for(let t=0;t<this.layerCnt;t++){let n=[];for(let r=0;r<this.size.y;r++)for(let i=0;i<this.size.x;i++){let a=i,o=r;n.push(...e(t,a,o))}this.rt2.textures[t].subImage(new Float32Array(n),this.size.x,this.size.y)}}},Vn=`#define PI 3.14159265359\r
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

uniform vec3 uColor;

void main( void ) {

	outColor0 = vec4( uColor, 1.0 );

}
`,Hn=`#define PI 3.14159265359\r
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
uniform float uTimeEF;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;
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
vVelocity *= 0.2;

}
`,Un=`#define PI 3.14159265359\r
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

uniform vec3 uColor;
// x = セルサイズ / y = 細かい格子の濃さ / z = フェード距離
uniform vec3 uParams;

// 軸線の色は TranslateGizmo と揃える
const vec3 AXIS_COLOR_X = vec3( 1.0, 0.2, 0.2 );
const vec3 AXIS_COLOR_Z = vec3( 0.4, 0.4, 1.0 );

const float MINOR_ALPHA = 0.25;
const float MAJOR_ALPHA = 0.5;

// 格子線の被覆率。線幅が画面上で1px前後に収まるよう、画素あたりの座標変化量で割る
float gridCoverage( vec2 p, float cell ) {

	vec2 coord = p / cell;
	vec2 g = abs( fract( coord + 0.5 ) - 0.5 ) / fwidth( coord );

	return 1.0 - min( min( g.x, g.y ), 1.0 );

}

void main( void ) {

	vec2 p = vPos.xz;
	float cell = uParams.x;

	// 視点が離れるほど細かい格子は薄れ、10倍の格子へ主役が移る
	float minorLine = gridCoverage( p, cell ) * uParams.y * MINOR_ALPHA;
	float majorLine = gridCoverage( p, cell * 10.0 ) * MAJOR_ALPHA;

	float alpha = max( minorLine, majorLine );
	vec3 color = uColor;

	// 原点を通る2本だけ軸色にする
	vec2 axis = vec2( 1.0 ) - min( abs( p ) / fwidth( p ), vec2( 1.0 ) );

	if ( axis.y > 0.0 ) {

		color = AXIS_COLOR_X;
		alpha = max( alpha, axis.y );

	} else if ( axis.x > 0.0 ) {

		color = AXIS_COLOR_Z;
		alpha = max( alpha, axis.x );

	}

	// 板の縁が直線で見えないよう、フェード距離までに消し切る
	float dist = length( p - uCameraPosition.xz );
	alpha *= 1.0 - smoothstep( uParams.z * 0.5, uParams.z, dist );

	if ( alpha <= 0.0 ) discard;

	outColor0 = vec4( color, alpha );

}
`,Wn=`#define PI 3.14159265359\r
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

void main( void ) {

	outColor0 = vec4( 1.0, 1.0, 1.0, 1.0 );

}
`,Gn=`#define PI 3.14159265359\r
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
uniform float uTimeEF;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;
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
vVelocity *= 0.2;

}
`,Kn=`uniform sampler2D uBackBuffer0;
uniform sampler2D uMaskTexture;
uniform vec3 uOutlineColor;
uniform vec2 uPPResolution;

in vec2 vUv;

layout( location = 0 ) out vec4 outColor;

void main( void ) {

	vec4 scene = texture( uBackBuffer0, vUv );

	float texelX = 1.0 / uPPResolution.x;
	float texelY = 1.0 / uPPResolution.y;

	float c = texture( uMaskTexture, vUv ).r;
	float l = texture( uMaskTexture, vUv + vec2( -texelX, 0.0 ) ).r;
	float r = texture( uMaskTexture, vUv + vec2(  texelX, 0.0 ) ).r;
	float t = texture( uMaskTexture, vUv + vec2( 0.0,  texelY ) ).r;
	float b = texture( uMaskTexture, vUv + vec2( 0.0, -texelY ) ).r;
	float tl = texture( uMaskTexture, vUv + vec2( -texelX,  texelY ) ).r;
	float tr = texture( uMaskTexture, vUv + vec2(  texelX,  texelY ) ).r;
	float bl = texture( uMaskTexture, vUv + vec2( -texelX, -texelY ) ).r;
	float br = texture( uMaskTexture, vUv + vec2(  texelX, -texelY ) ).r;

	float edge = abs( c - l ) + abs( c - r ) + abs( c - t ) + abs( c - b )
		+ abs( c - tl ) * 0.7 + abs( c - tr ) * 0.7 + abs( c - bl ) * 0.7 + abs( c - br ) * 0.7;

	edge = smoothstep( 0.05, 0.2, edge );

	outColor = mix( scene, vec4( uOutlineColor, 1.0 ), edge );

}
`,qn=`//[
precision highp float;
//]

in vec2 vUv;
uniform sampler2D uSrcTexture;
out vec4 fragColor;

void main() {
	fragColor = vec4( texture( uSrcTexture, vUv ).rgb, 1.0 );
}
`,Jn=class{isEditorFrame=!0;texture;textarget;constructor(e,t){this.texture=e,this.textarget=t}},Yn=class extends Jn{isEditorTarget=!0;frameBuffer;autoResize;constructor(e,t){super(e.textures[0],N.TEXTURE_2D),this.frameBuffer=e,this.autoResize=t}},Xn=class{isEditorRecipe=!0;postprocess;pass;constructor(e,t){this.pass=t,this.postprocess=new en({name:e,passes:[t]})}},Zn=class{_renderer;_gl;_targets;_recipes;_readFrameBuffer;_fullscreenBuffer;_texturePass;_texturePostProcess;constructor(e){this._renderer=e,this._gl=e.backend.gl,this._targets=[],this._recipes=[],this._readFrameBuffer=new _t(this._gl,{disableDepthBuffer:!0}),this._fullscreenBuffer=new _t(this._gl,{disableDepthBuffer:!0}).setTexture([new gt(this._gl).setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]),this._fullscreenBuffer.setSize(e.resolution),this._texturePass=new I(e.backend,{frag:qn,renderTarget:null}),this._texturePostProcess=new en({name:`editorTexture`,passes:[this._texturePass]})}renderEntities(e){let t=this._renderer,n=e.target?e.target.frameBuffer:t.renderTarget.uiBuffer,r=e.materialOverride,i=[];if(r)for(let t=0;t<e.entities.length;t++){let n=e.entities[t].getComponent(F);i.push(n?n.material:null),n&&(n.material=r)}if(e.depthCompare===`lequal`&&this._gl.depthFunc(N.LEQUAL),t.renderCamera(`forward`,e.camera,e.entities,n,t.resolution,{disableClear:e.target===null}),e.depthCompare===`lequal`&&this._gl.depthFunc(N.LESS),r)for(let t=0;t<e.entities.length;t++){let n=e.entities[t].getComponent(F);n&&(n.material=i[t])}}renderFullscreen(e,t){let n=e,r=this._renderer;if(t){let e=t.frameBuffer;n.pass.renderTarget=e,r.renderPostProcess(n.postprocess,void 0,e.size);return}let i=r.renderTarget.uiBuffer,a=r.resolution;n.pass.renderTarget=this._fullscreenBuffer,r.renderPostProcess(n.postprocess,i,a),r.backend.blit(this._fullscreenBuffer,i,a.x,a.y)}blit(e,t,n){let r=this._gl,i=e,a=t?t.frameBuffer:this._renderer.renderTarget.uiBuffer,o=a.size,s=n||{x:0,y:0,width:o.x,height:o.y};this._readFrameBuffer.setSize(i.texture.size),r.bindFramebuffer(r.FRAMEBUFFER,this._readFrameBuffer.getFrameBuffer()),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,i.textarget,i.texture.getTexture(),0),r.bindFramebuffer(r.READ_FRAMEBUFFER,this._readFrameBuffer.getFrameBuffer()),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,a.getFrameBuffer()),r.blitFramebuffer(0,0,i.texture.size.x,i.texture.size.y,s.x,o.y-s.y-s.height,s.x+s.width,o.y-s.y,r.COLOR_BUFFER_BIT,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null)}drawTexture(e,t){let n=t.frameBuffer;this._texturePass.uniforms.uSrcTexture={value:e,type:`1i`},this._texturePass.renderTarget=n,this._renderer.renderPostProcess(this._texturePostProcess,void 0,n.size)}async readPixels(e){let t=this._gl,n=e.frameBuffer,r=n.size,i=new Uint8Array(r.x*r.y*4);return t.bindFramebuffer(t.FRAMEBUFFER,n.getFrameBuffer()),t.readPixels(0,0,r.x,r.y,t.RGBA,t.UNSIGNED_BYTE,i),t.bindFramebuffer(t.FRAMEBUFFER,null),i}present(){let e=this._renderer.resolution;e.x!==0&&e.y!==0&&this._renderer.backend.blit(this._renderer.renderTarget.uiBuffer,null,e.x,e.y)}createTarget(e){let t=new _t(this._gl,{disableDepthBuffer:!0}).setTexture([new gt(this._gl).setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]);e&&e.useSceneDepth&&t.setDepthTexture(this._renderer.renderTarget.gBuffer.depthTexture),t.setSize(e&&e.size||this._renderer.resolution);let n=new Yn(t,!(e&&e.size));return this._targets.push(n),n}resize(e){this._fullscreenBuffer.setSize(e);for(let t=0;t<this._targets.length;t++){let n=this._targets[t];n.autoResize&&n.frameBuffer.setSize(e)}for(let t=0;t<this._recipes.length;t++)this._recipes[t].postprocess.resize(e)}onDrawPass(e){this._renderer.on(`drawPass`,(t,n)=>{if(!t)return;let r=t.textures,i=`currentFace`in t?t.currentFace:N.TEXTURE_2D;for(let t=0;t<r.length;t++){let a=n?n+(r.length>1?`_`+t:``):``;e(new Jn(r[t],i),a)}})}materials={flat:e=>new $t({vert:Hn,frag:Vn,phase:[`forward`],drawType:e.lines?`LINES`:`TRIANGLES`,depthTest:e.depthTest??!0,depthWrite:e.depthWrite??!0,uniforms:{uColor:{value:e.color,type:`3fv`}}}),mask:()=>new $t({vert:Gn,frag:Wn,phase:[`forward`],depthTest:!1}),grid:e=>new $t({vert:Hn,frag:Un,phase:[`forward`],depthWrite:!1,uniforms:{uColor:{value:e.color,type:`3fv`},uParams:{value:e.params,type:`3fv`}}})};recipes={outline:(e,t)=>{let n=new Xn(`editorOutline`,new I(this._renderer.backend,{frag:Kn,renderTarget:null,uniforms:{uMaskTexture:{value:e.texture,type:`1i`},uOutlineColor:{value:new j(t[0],t[1],t[2]),type:`3fv`}}}));return this._recipes.push(n),n}}},Qn=e=>new Zn(e.renderer),$n=`#define PI 3.14159265359\r
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
	vec4 outColor = vec4(1.0);\r
vec3 outNormal = normalize(vNormal);\r
vec3 outNormalMap = vec3( 0.0 );\r
float outSSN = 0.0;\r
vec3 outEmission = vec3(0.0);\r
float outRoughness = 0.5;\r
float outMetallic = 0.0;\r
vec3 outPos = vPos;\r
float outEnv = 1.0;\r
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
	outMetallic = 1.0;\r
\r
	#ifdef USE_MR_MAP\r
\r
		vec4 mr = texture( uMRMap, mapUv );\r
		outRoughness = mr.y;\r
		outMetallic = mr.z;\r
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
		outMetallic = uMetalness;\r
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
} `,er=`#define PI 3.14159265359\r
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
	#ifdef USE_TANGENT\r
\r
		vTangent = (uModelMatrix * vec4(tangent.xyz, 0.0)).xyz;\r
		vBitangent = normalize( cross( vNormal, vTangent.xyz ) * tangent.w );\r
\r
	#endif\r
\r
}`,tr=12,nr=8,rr=e=>{switch(e){case`VEC2`:return 2;case`VEC3`:return 3;case`VEC4`:return 4;case`SCALAR`:return 1;default:return 1}},ir=e=>{switch(e){case`TEXCOORD_0`:return`uv`;default:return e.toLowerCase()}},ar=class extends Tt{_engine;constructor(e){super(),this._engine=e}get backend(){return this._engine.renderer.backend}async load(e){let t=await(await fetch(e)).arrayBuffer(),n=new TextDecoder,r=n.decode(new Uint8Array(t,0,4)),i=new Map,a=null;if(r==`glTF`){let e=new DataView(t),r=tr,o={length:e.getUint32(r,!0),type:e.getUint32(16,!0)};if(o.type==1313821514&&(a=JSON.parse(n.decode(new Uint8Array(t,20,o.length)))),t.byteLength>nr+o.length+tr){let n=20+o.length,r={length:e.getUint32(n,!0),type:e.getUint32(n+4,!0)};if(r.type==5130562){let e=n+nr,a=t.slice(e,e+r.length);i.set(0,a)}}}else a=JSON.parse(n.decode(new Uint8Array(t)));if(!a)throw Error(``);let o=a,s=e=>{let t=i.get(e.buffer);return t?t.slice(e.byteOffset,e.byteOffset+e.byteLength):null},c=new Map;a.accessors&&a.accessors.forEach((e,t)=>{let{type:n}=e;if(!o.bufferViews)return;let r=o.bufferViews[e.bufferView],i=s(r);i&&c.set(t,{type:n,buffer:i})});let l=new Map,u=(o.images||[]).map((e,t)=>new Promise(n=>{if(e.bufferView!==void 0){if(!o.bufferViews)return;let r=o.bufferViews[e.bufferView],i=s(r);if(i){let r=new Blob([new Uint8Array(i)],{type:e.mimeType}),a=new Image;a.onload=()=>{n(e)},a.src=URL.createObjectURL(r),l.set(t,a)}}}));await Promise.all(u);let d=new Map,f=e=>{if(!o.textures)return null;let t=o.textures[e];if(t){let e=this.backend.createTexture(),n=l.get(t.source);if(n)return e.attach(n,!0),e}return null};o.materials&&o.materials.forEach((e,t)=>{let n=new $t({frag:$n,vert:er});if(e.normalTexture){let t=f(e.normalTexture.index);t&&(n.uniforms.uNormalMap={value:t,type:`1i`},n.defines.USE_NORMAL_MAP=``)}if(e.pbrMetallicRoughness){let t=e.pbrMetallicRoughness;if(t.baseColorFactor&&(n.uniforms.uBaseColor={value:t.baseColorFactor,type:`4fv`},n.defines.USE_COLOR=``),t.baseColorTexture){let e=f(t.baseColorTexture.index);e&&(n.uniforms.uBaseColorMap={value:e,type:`1i`},n.defines.USE_COLOR_MAP=``)}if(t.roughnessFactor!==void 0&&(n.uniforms.uRoughness={value:t.roughnessFactor,type:`1f`},n.defines.USE_ROUGHNESS=``),t.metallicFactor!==void 0&&(n.uniforms.uMetalness={value:t.metallicFactor,type:`1f`},n.defines.USE_METALNESS=``),t.metallicRoughnessTexture){let e=f(t.metallicRoughnessTexture.index);e&&(n.uniforms.uMRMap={value:e,type:`1i`},n.defines.USE_MR_MAP=``)}}if(e.emissiveFactor&&(n.uniforms.uEmission={value:e.emissiveFactor,type:`3fv`},n.defines.USE_EMISSION=``),e.emissiveTexture){let t=f(e.emissiveTexture.index);t&&(n.uniforms.uEmissionMap={value:t,type:`1i`},n.defines.USE_EMISSION_MAP=``)}e.extensions&&e.extensions.KHR_materials_emissive_strength&&(n.uniforms.uEmissionStrength={value:e.extensions.KHR_materials_emissive_strength.emissiveStrength,type:`1fv`},n.defines.USE_EMISSION_STRENGTH=``),d.set(t,n)});let p=new Map;o.meshes&&o.meshes.forEach((e,t)=>{let{primitives:n}=e;p.set(t,n.map(e=>{let t=new P;if(Object.keys(e.attributes).forEach(n=>{let r=e.attributes[n],i=c.get(r);i&&t.setAttribute(ir(n),new Float32Array(i.buffer),rr(i.type))}),e.indices!==void 0){let n=c.get(e.indices);n&&t.setAttribute(`index`,new Uint16Array(n.buffer),1)}let n=null;if(e.material!==void 0){let t=d.get(e.material);t&&(n=t)}return n||=new $t,t.attributes.has(`tangent`)&&(n.defines.USE_TANGENT=``),{geometry:t,material:n}}))});let m=new Map,h=((e,t)=>{let n=this._engine.createEntity();t.translation&&n.position.set(t.translation[0],t.translation[1],t.translation[2]),t.rotation&&n.quaternion.set(t.rotation[0],t.rotation[1],t.rotation[2],t.rotation[3]),t.scale&&n.scale.set(t.scale[0],t.scale[1],t.scale[2]);let r=p.get(t.mesh);if(n.name=t.name,r){if(r.length==1){let e=r[0],t=n.addComponent(F);t.geometry=e.geometry,t.material=e.material}else r.forEach((e,r)=>{let i=this._engine.createEntity();i.name=t.name+`_`+r;let a=i.addComponent(F);a.geometry=e.geometry,a.material=e.material,n.add(i)})}return t.children&&t.children.forEach(e=>{let t=m.get(e);t?n.add(t):o.nodes&&n.add(h(e,o.nodes[e]))}),m.set(e,n),n});o.nodes&&o.nodes.forEach((e,t)=>{h(t,e)});let g=this._engine.createEntity(),_=o.scenes&&o.scenes[0];return _&&_.nodes&&_.nodes.forEach(e=>{let t=m.get(e);t&&g.add(t)}),{scene:g}}},or=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

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
  
}`,sr=`uniform sampler2D uSrcTexture1;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uSrcTexture1, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`,cr=`#define PI 3.14159265359\r
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
uniform sampler2D uBloomTexture[4];

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec3 col = texture( uBackBuffer0, vUv ).xyz;

	#pragma loop_start 4
		col += texture( uBloomTexture[ LOOP_INDEX ], vUv ).xyz * pow( (float(LOOP_INDEX) + 1.0) / 4.0, 1.0 ) * 1.0;
	#pragma loop_end
	
	outColor = vec4( col, 1.0 );

}`,lr=class extends en{constructor(e,t){let n=[],r=[];for(let t=0;t<4;t++)n.push(e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})])),r.push(e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:N.LINEAR,minFilter:N.LINEAR})]));let i=2,a=new I(e,{name:`bloom/bright/`,frag:sr,passThrough:!0,uniforms:{uSrcTexture1:{value:t,type:`1i`},uThreshold:{value:1.8,type:`1f`},uBrightness:{value:1,type:`1f`}},resolutionRatio:1/i}),o=[],s=a.renderTarget.textures;for(let t=0;t<4;t++){let a=n[t],c=r[t],l={name:`bloom/blur/`+t+`/v`,renderTarget:a,frag:or,uniforms:{uBackBlurTex:{value:s,type:`1i`},uIsVertical:{type:`1i`,value:!0},uWeights:{type:`1fv`,value:dt.gaussWeights(8)},uBlurRange:{value:2,type:`1f`}},defines:{GAUSS_WEIGHTS:`8`,USE_BACKBLURTEX:``},passThrough:!0,resolutionRatio:1/i};o.push(new I(e,l)),o.push(new I(e,{...l,name:`bloom/blur/`+t+`/h`,renderTarget:c,uniforms:{...l.uniforms,uBackBlurTex:{value:a.textures[0],type:`1i`},uIsVertical:{type:`1i`,value:!1}}})),s=c.textures,i*=2}let c=new I(e,{name:`bloom/composite/`,frag:cr,uniforms:{uBloomTexture:{value:r.map(e=>e.textures[0]),type:`1iv`}}});super({name:`Bloom`,passes:[a,...o,c]})}get threshold(){return this.passes[0].uniforms.uThreshold.value}set threshold(e){this.passes[0].uniforms.uThreshold.value=e}get brightness(){return this.passes[0].uniforms.uBrightness.value}set brightness(e){this.passes[0].uniforms.uBrightness.value=e}},ur=`#define PI 3.14159265359\r
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
}`,dr=class extends en{constructor(e){super({name:`ColorGrading`,passes:[new I(e,{frag:ur})]})}},fr=`#define PI 3.14159265359\r
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
}\r
\r
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
  }\r
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
}`,pr=class extends en{constructor(e){super({name:`Finalize`,passes:[new I(e,{frag:fr})]})}},mr=`uniform sampler2D uBackBuffer0;\r
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
}`,hr=class extends en{constructor(e){super({name:`FXAA`,passes:[new I(e,{name:`fxaa`,frag:mr})]})}},gr=(e,t)=>{let n=t.addComponent(Qt),r=e.renderer,i=r.backend,a=new lr(i,r.renderTarget.shadingBuffer.textures[0]);return a.threshold=1,a.brightness=1,n.add(new hr(i)),n.add(a),n.add(new dr(i)),n.add(new pr(i)),()=>{t.removeComponent(Qt)}},_r=class{static serializeEntity(e,t){let n=e=>{let r=[];e.children.forEach(e=>{e.initiator!=`script`&&r.push(n(e))});let i=[];e.components.forEach(e=>{let n=e.serialize({mode:`export`}),r=Object.keys(n).length>0;if(e.initiator!==`user`)return;let a={name:t.getName(e),uuid:e.uuid};r&&(a.props=n),i.push(a)});for(let t of e.unresolvedComponents)i.push({name:t.name,uuid:t.uuid,props:t.props});return{name:e.name,uuid:e.uuid,pos:e.position.x==0&&e.position.y==0&&e.position.z==0?void 0:e.position.getElm(`vec3`),rot:e.euler.x==0&&e.euler.y==0&&e.euler.z==0?void 0:e.euler.getElm(`vec3`),scale:e.scale.x==1&&e.scale.y==1&&e.scale.z==1?void 0:e.scale.getElm(`vec3`),components:i.length>0?i:void 0,childs:r.length>0?r:void 0}};return n(e)}static deserializeEntity(e,t,n,r){let i=(e,t)=>{let a=t||r.createEntity();a.initiator=`user`,a.name=e.name,a.restoreUUID(e.uuid);let o=e.pos||[0,0,0];a.position.x=o[0],a.position.y=o[1],a.position.z=o[2];let s=e.rot||[0,0,0];a.euler.x=s[0],a.euler.y=s[1],a.euler.z=s[2];let c=e.scale||[1,1,1];return a.scale.x=c[0],a.scale.y=c[1],a.scale.z=c[2],a.unresolvedComponents=[],e.components&&e.components.forEach(e=>{let t=n.resolve(e.name);if(t){let n=a.getComponent(t.component);n||(n=a.addComponent(t.component),n.initiator=`user`),n.restoreUUID(e.uuid),e.props&&n.deserialize(e.props)}else console.warn(`[ProjectSerializer] Component "${e.name}" not found in resolver. Preserving data for round-trip.`),a.unresolvedComponents.push({name:e.name,uuid:e.uuid,props:e.props})}),e.childs&&([...a.children].forEach(e=>{e.initiator!==`script`&&a.remove(e)}),e.childs.forEach(e=>{a.add(i(e))})),a};e&&i(e,t),t.initiator=`god`}},vr=class extends Pt{name;_frag;_resolution;_filter;_updateEveryFrame;_textures;constructor(e,t){super(),this.name=e;let n=t.data;this._frag=n?.frag||``,this._resolution=n?.resolution||[1024,1024],this._filter=n?.filter||`linear`,this._updateEveryFrame=n?.updateEveryFrame??!1,this._textures=n?.textures||{}}get frag(){return this._frag}get resolution(){return this._resolution}get filter(){return this._filter}get updateEveryFrame(){return this._updateEveryFrame}get textures(){return this._textures}},yr=(e,t)=>{let n={},r=`/${t}/`;for(let[t,i]of Object.entries(e)){let e=t.slice(t.lastIndexOf(r)+r.length).split(`/`).slice(0,-2),a=Object.entries(i).find(([e,t])=>typeof t==`function`&&/^[A-Z]/.test(e));if(!a)continue;let o=n;for(let t of e)o=o[t]=o[t]||{};o[a[0]]=a[1]}return n},br=class extends Tt{_componentList;_componentGroups;_geometryList;_geometryGroups;_textureResources;_textures;_updateEveryFrameTextures;constructor(){super(),this._componentList=[],this._textures=new Map,this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources=new Map,this._updateEveryFrameTextures=[]}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get geometryList(){return this._geometryList}get geometryGroups(){return this._geometryGroups}get textureList(){return Array.from(this._textureResources.values())}get textures(){return this._textures}get updateEveryFrameTextures(){return this._updateEveryFrameTextures}clear(){this._componentList=[],this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources.clear(),this._textures.clear(),this._updateEveryFrameTextures=[],this.emit(`update`)}getComponent(e){return this._componentList.find(t=>t.name==e)}addComponentGroup(e){let t=this._componentGroups.find(t=>t.name==e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addComponent:(e,n)=>{let r={name:e,component:n};t.push(r),this._componentList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._componentGroups.push(t),this.emit(`update`),t}getGeometry(e){return this._geometryList.find(t=>t.name===e)}addGeometryGroup(e){let t=this._geometryGroups.find(t=>t.name===e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addGeometry:(e,n)=>{let r={name:e,geometryClass:n};t.push(r),this._geometryList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._geometryGroups.push(t),this.emit(`update`),t}addTextureResource(e,t){let n=new vr(e,{data:t});this._textureResources.set(e,n),this.emit(`update`)}getTextureResource(e){return this._textureResources.get(e)}removeTextureResource(e){this._textureResources.delete(e);let t=this._textures.get(e);t&&(t.dispose(),this._textures.delete(e)),this.emit(`update`)}addTexture(e,t){return this._textures.set(e,t),t}getTexture(e){return this._textures.get(e)}_buildTexture(e,t,n,r){let i=e.frag;return i?t.createTexProcedural({name:e.name,frag:i,resolution:new j(e.resolution[0]||1024,e.resolution[1]||1024),filter:e.filter,textures:n,uniforms:e.updateEveryFrame?r:void 0}):null}_ensureTexture(e,t,n,r){let i=this._textures.get(e.name);if(i)return i;if(r.has(e.name))return null;r.add(e.name);let a={},o=e.textures,s=Object.keys(o);for(let e=0;e<s.length;e++){let i=s[e],c=o[i],l=this._textureResources.get(c),u=l?this._ensureTexture(l,t,n,r):this._textures.get(c);u&&(a[i]=u)}let c=this._buildTexture(e,t,a,n);return c?(this._textures.set(e.name,c),e.updateEveryFrame&&this._updateEveryFrameTextures.push(c),c):null}buildTextureInstances(e,t){this._updateEveryFrameTextures=[];let n=new Set;this._textureResources.forEach(r=>{this._ensureTexture(r,e,t,n)}),this.emit(`update`)}},xr=class e extends Pt{static resources;name;enableRender;_renderer;_root;_uniforms;_time;_frame;_frameSetting;_disposed;_cameraEntity;constructor(e){super(),this.name=`OREngine`,this._disposed=!1,this._uniforms={uEnvMapIntensity:{value:1,type:`1f`}},this._renderer=e(this),this._renderer.globalUniforms={uTime:{value:0,type:`1f`},uTimeF:{value:0,type:`1f`},uTimeE:{value:0,type:`1f`},uTimeEF:{value:0,type:`1f`},uDeltaTime:{value:0,type:`1f`},uResolution:{value:new j,type:`2fv`},uAspectRatio:{value:1,type:`1f`}},this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this.enableRender=!0,this._cameraEntity=null,this._root=this.createEntity({name:`root`}),this._root.initiator=`god`,this.field(`name`,()=>this.name,e=>this.name=e),this.field(`scene`,()=>_r.serializeEntity(this._root,this._createComponentResolver()),e=>{_r.deserializeEntity(e,this._root,this._createComponentResolver(),this)}),this.field(`renderer`,()=>this._renderer.serialize({mode:`export`}),e=>this._renderer.deserialize(e));let t=this.fieldDir(`timeline`);t.field(`duration`,()=>this._frameSetting.duration,e=>this._frameSetting.duration=e),t.field(`fps`,()=>this._frameSetting.fps,e=>this._frameSetting.fps=e)}createEntity(e){return new Gt({engine:this,...e})}get canvas(){return this._renderer.canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}get disposed(){return this._disposed}set cameraEntity(e){this._cameraEntity=e}get cameraEntity(){return this._cameraEntity}resolveCameraEntity(){return this._cameraEntity||this.findSceneCameraEntity()}_createComponentResolver(){return{resolve:t=>e.resources.getComponent(t),getName:t=>{let n=e.resources.componentList.find(e=>t instanceof e.component);return n?n.name:t.constructor.name}}}init(){this._root.disposeRecursive(),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.name=`New Project`}async load(e){this.init(),this.deserialize(e),this.emit(`update/graph`),this.emit(`loaded`)}update(t){let n=new Date().getTime();this._time.delta=(n-this._time.current)/1e3,this._time.current=n,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*+!!this._frame.playing,this._frame.current=this._time.code*60;let r=this.createEntityUpdateEvent({forceDraw:t?.forceDraw});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1,this._renderer.globalUniforms.uDeltaTime.value=Math.min(this._time.delta,1/60);let i=e.resources.updateEveryFrameTextures;for(let e=0;e<i.length;e++)i[e].render();if(this._root.update(r),this._root.postUpdate(r),this._root.updateMatrixRecursive(),this._root.prepareRender(r),this.enableRender){let e=this.resolveCameraEntity();e&&this._renderer.render(this._root,e,r)}return this._root.commitFrame(r),this._frame.playing&&this.emit(`update/frame/play`,[this._frame]),this._time.delta}createEntityUpdateEvent(e){let t={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return e?{...t,...e}:t}setSize(e){this._renderer.resize(e),this._renderer.canvas.width=e.x,this._renderer.canvas.height=e.y,this._renderer.globalUniforms.uResolution.value.copy(e),this._renderer.globalUniforms.uAspectRatio.value=e.x/Math.max(e.y,1)}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(e){this._time.code=e/60,this._frame.current=e,this.emit(`update/frame/play`,[this._frame])}updateOffline(t,n){let r=t/n,i=1/n;this._time.delta=i,this._time.current=new Date().getTime(),this._time.engine+=i,this._time.code=r,this._frame.current=r*60,this._frame.playing=!0;let a=this.createEntityUpdateEvent({forceDraw:!0});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1;let o=e.resources.updateEveryFrameTextures;for(let e=0;e<o.length;e++)o[e].render();if(this._root.update(a),this._root.postUpdate(a),this._root.updateMatrixRecursive(),this._root.prepareRender(a),this.enableRender){let e=this.resolveCameraEntity();e&&this._renderer.render(this._root,e,a)}this._root.commitFrame(a)}compileShaders(e){let t=this.createEntityUpdateEvent({forceDraw:!0}),n=this.resolveCameraEntity();return n?this.renderer.compileShaders(this._root,n,t,e):Promise.resolve()}findSceneCameraEntity(){let e=null;return this._root.traverse(t=>{if(e)return;let n=t.getComponentsByTag(`camera`);for(let r=0;r<n.length;r++)if(n[r].displayOut){e=t;return}}),e}dispose(){this._disposed=!0,this._root.disposeRecursive()}};xr.resources=new br;var Sr=class extends Tt{_pressedKeys;constructor(){super(),this._pressedKeys={};let e=this._onKeyDown.bind(this),t=this._onKeyUp.bind(this);window.addEventListener(`keydown`,e),window.addEventListener(`keyup`,t),this.once(`dispose`,()=>{window.removeEventListener(`keydown`,e),window.removeEventListener(`keyup`,t)})}get pressedKeys(){return this._pressedKeys}_onKeyDown(e){this._pressedKeys[e.key]=!0,this.emit(`keydown`,[e,this._pressedKeys])}_onKeyUp(e){if(this._pressedKeys[e.key]=!1,e.key==`Meta`||e.key==`Control`){let e=Object.keys(this._pressedKeys);for(let t=0;t<e.length;t++)this._pressedKeys[e[t]]=!1}this.emit(`keyup`,[e,this._pressedKeys])}dispose(){this.emit(`dispose`)}},Cr=class extends Tt{_isTouching;element=null;position;delta;constructor(){super(),this.position=new j(NaN,NaN),this.delta=new j(NaN,NaN),this._isTouching=!1;let e=this._onPointer.bind(this,`move`),t=this._onPointer.bind(this,`end`);window.addEventListener(`pointermove`,e),window.addEventListener(`pointerup`,t),window.addEventListener(`dragend`,t);let n=()=>{this.element&&this.removeElement(this.element),window.removeEventListener(`pointermove`,e),window.removeEventListener(`pointerup`,t),window.removeEventListener(`dragend`,t),this.off(`dispose`,n)};this.on(`dispose`,n)}setElement(e){this.element&&this.removeElement(this.element),this.element=e;let t=this._onPointer.bind(this,`start`);e.addEventListener(`pointerdown`,t);let n=r=>{e.isEqualNode(r.elm)&&(e.removeEventListener(`pointerdown`,t),this.off(`unregister`,n))};this.on(`unregister`,n)}removeElement(e){this.emit(`unregister`,[e])}getScreenPosition(e){if(this.position.x!=this.position.x)return new j(NaN,NaN);let t=this.position.clone().divide(e).multiply(2).sub(1);return t.y*=-1,t}getRelativePosition(e,t){let n=e.getClientRects()[0],r=this.position.x-n.left,i=this.position.y-n.top;return t&&(r/=n.width,i/=n.height),new j(r,i)}_setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}_onPointer(e,t){let n=t.pointerType;(n==null||n==`mouse`&&(t.button==-1||t.button==0)||n==`touch`)&&this._touchEventHandler(t.pageX,t.pageY,e,t)}_touchEventHandler(e,t,n,r){let i=!1,a=e-window.pageXOffset,o=t-window.pageYOffset;n==`start`?(this._isTouching=!0,this._setPos(a,o),this.delta.set(0,0),i=!0):n==`move`?(this._setPos(a,o),this._isTouching&&(i=!0)):n==`end`&&(`targetTouches`in r?r.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,i=!0),i&&this.emit(n,[{pointerEvent:r,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit(`dispose`)}},wr=(0,b.createContext)(null),Tr=()=>{let e=(0,b.useContext)(wr);if(e===null)throw Error(`useMouseMenu must be used within a MouseMenuProvider`);return e},Er=(0,b.createContext)(void 0),Dr=()=>(0,b.useContext)(Er),Or={compoAdd:`ComponentAdd__compoAdd___LmNvb`,directory:`ComponentAdd__directory___LmNvb`,subDirectory:`ComponentAdd__subDirectory___LmNvb`,picker:`ComponentAdd__picker___LmNvb`},kr=({group:e,onClickAdd:t})=>{let n=Dr(),[r,i]=(0,b.useState)(!1),a=null,o,s=`dir`,c=e.name.startsWith(`_`)?e.name.slice(1):e.name;`child`in e?a=(0,E.jsx)(E.Fragment,{children:e.child.map((e,n)=>(0,E.jsx)(kr,{group:e,onClickAdd:t},n))}):(o=()=>t(e),s=`item`);let l=window.matchMedia(`(hover: hover)`).matches;return(0,E.jsxs)(`div`,{className:Or.directory,onPointerEnter:l?()=>i(!0):void 0,onPointerLeave:l?()=>i(!1):void 0,onClick:e=>{o?o():(e.stopPropagation(),i(!r))},"data-type":s,"data-direction":n?.direction,children:[c,r&&(0,E.jsx)(`div`,{className:Or.subDirectory,children:a})]})},Ar=e=>{let{editor:t}=Be(),{pushContent:n,closeAll:r}=Tr(),i=xr.resources,a=(0,b.useCallback)(a=>{if(!i||!n||!r)return;let o=[],s=n=>{t.api.addComponent(e.entity,n.component),r()};i.componentGroups.forEach((e,t)=>{o.push((0,E.jsx)(kr,{group:e,onClickAdd:s},t))}),n((0,E.jsx)(`div`,{className:Or.picker,children:o}))},[n,i,e.entity,r,t]);return(0,E.jsx)(`div`,{className:Or.compAdd,children:(0,E.jsx)(_e,{onClick:a,children:`Add Component`})})},jr={cross:`CrossIcon__cross___LmNyb`},Mr=()=>(0,E.jsx)(`div`,{className:jr.cross,children:(0,E.jsxs)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{x:`5.12`,y:`16.832`,width:`2.57272`,height:`17.6514`,transform:`rotate(-135 5.12 16.832)`,fill:`#D9D9D9`}),(0,E.jsx)(`rect`,{x:`3.30078`,y:`4.35059`,width:`2.57272`,height:`17.6514`,transform:`rotate(-45 3.30078 4.35059)`,fill:`#D9D9D9`})]})}),Nr={compoView:`ComponentView__compoView___LmNvb`,head:`ComponentView__head___LmNvb`,name:`ComponentView__name___LmNvb`,check:`ComponentView__check___LmNvb`,delete:`ComponentView__delete___LmNvb`,propertyBlock:`ComponentView__propertyBlock___LmNvb`},Pr=e=>{let t=Object.keys(e.childs);for(let n=0;n<t.length;n++){let r=e.childs[t[n]],{opt:i}=r,a=!1;if(i&&(a=typeof i.hidden==`function`?i.hidden(r.type===`value`?r.value:null):i.hidden||!1),!a&&(r.type===`value`||Pr(r)))return!0}return!1},Fr=({component:e})=>{let{editor:t}=Be(),[n,r]=A(e,`enabled`),i=e.initiator!==`user`,a=Pr(e.serializeToDirectory()),o=(0,b.useCallback)(n=>{n.stopPropagation();let r=e.entity;if(r){for(let[n,i]of r.components)if(i.uuid===e.uuid){t.api.removeComponent(r,n,e);break}}},[e,t]),s=(0,E.jsxs)(`div`,{className:Nr.head,children:[(0,E.jsx)(`div`,{className:Nr.name,children:e.constructor.name}),(0,E.jsx)(`div`,{className:Nr.delete,children:(0,E.jsx)(`button`,{onClick:o,children:(0,E.jsx)(Mr,{})})})]});return(0,E.jsx)(`div`,{className:Nr.compoView,"data-disable_component":i,children:(0,E.jsx)(`div`,{className:Nr.content,children:(0,E.jsx)(pe,{label:s,accordion:a,bg:!0,defaultClose:!1,children:a&&(0,E.jsx)(ct,{target:e})})})})},Ir={container:`ComponentList__container___LmNvb`},Lr=({entity:e})=>{let[t]=A(e,`components`),n=(0,b.useMemo)(()=>{let n=[];return t?(t.forEach(t=>{let r=e.getComponentByUUID(t);r&&n.push((0,E.jsx)(Fr,{component:r},r.uuid))}),n):null},[t,e]);return(0,E.jsx)(`div`,{className:Ir.container,children:n})},Rr=()=>{let{editor:e,engine:t}=Be(),[n]=A(e,`selectedEntityId`),r=(0,b.useMemo)(()=>{if(n)return t.root.findEntityByUUID(n)},[t,n]);return r?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(pe,{label:`Fields`,accordion:!0,children:(0,E.jsx)(ct,{target:r})}),(0,E.jsxs)(pe,{label:`Components`,accordion:!0,children:[(0,E.jsx)(Lr,{entity:r}),(0,E.jsx)(Ar,{entity:r})]})]}):null},zr=(0,b.createContext)(null),Br=()=>{let e=(0,b.useContext)(zr);if(e===null)throw Error(`useOREngine must be used within a OREngineProvider`);return e},Vr={container:`GPUTimer__container___LmNvb`,headerRow:`GPUTimer__headerRow___LmNvb`,totalTime:`GPUTimer__totalTime___LmNvb`,toggleButton:`GPUTimer__toggleButton___LmNvb`,controls:`GPUTimer__controls___LmNvb`,control:`GPUTimer__control___LmNvb`,controlLabel:`GPUTimer__controlLabel___LmNvb`,select:`GPUTimer__select___LmNvb`,input:`GPUTimer__input___LmNvb`,group:`GPUTimer__group___LmNvb`,item:`GPUTimer__item___LmNvb`,clickable:`GPUTimer__clickable___LmNvb`,itemRow:`GPUTimer__itemRow___LmNvb`,itemName:`GPUTimer__itemName___LmNvb`,itemTime:`GPUTimer__itemTime___LmNvb`,itemStats:`GPUTimer__itemStats___LmNvb`,progressBar:`GPUTimer__progressBar___LmNvb`,progressFill:`GPUTimer__progressFill___LmNvb`},Hr=class{buffer;index;size;filled;constructor(e){this.size=e,this.buffer=Array(e),this.index=0,this.filled=!1}push(e){this.buffer[this.index]=e,this.index=(this.index+1)%this.size,!this.filled&&this.index===0&&(this.filled=!0)}getAverage(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=0;for(let n=0;n<e;n++)t+=this.buffer[n];return t/e}getMax(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]>t&&(t=this.buffer[n]);return t}getMin(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]<t&&(t=this.buffer[n]);return t}getCount(){return this.filled?this.size:this.index}},Ur=class{buffers;windowSize;currentData;constructor(e=30){this.windowSize=e,this.buffers=new Map,this.currentData=new Map}update(e){let t=performance.now();for(let n=0;n<e.length;n++){let r=e[n],i=r.name.split(`/`),a=i[0]||`unknown`,o,s=i[i.length-1],c=s&&s.match(/\[([^\]]+)\]/);c&&(o=c[1]);let l={name:r.name,duration:r.duration,timestamp:t,renderType:a},u=this.buffers.get(r.name);u||(u=new Hr(this.windowSize),this.buffers.set(r.name,u)),u.push(r.duration),this.currentData.set(r.name,{...l,entityId:o})}}getStatistics(){let e=[],t=0,n=performance.now(),r=[];return this.currentData.forEach((e,t)=>{n-e.timestamp>1e3&&r.push(t)}),r.forEach(e=>{this.currentData.delete(e)}),this.currentData.forEach(e=>{t+=e.duration}),this.currentData.forEach(n=>{let r=this.buffers.get(n.name);r&&e.push({name:n.name,renderType:n.renderType,entityId:n.entityId,current:n.duration,avg:r.getAverage(),max:r.getMax(),min:r.getMin(),samples:r.getCount(),percentage:t>0?n.duration/t*100:0})}),e}getTotalTime(){let e=0;return this.currentData.forEach(t=>{e+=t.duration}),e}},Wr=e=>{if(e<2){let t=e/2;return`rgb(${Math.floor(100+t*100)}, 200, 100)`}if(e<5){let t=(e-2)/3;return`rgb(200, ${Math.floor(200-t*50)}, 100)`}if(e<10){let t=(e-5)/5;return`rgb(200, ${Math.floor(150-t*80)}, ${Math.floor(100-t*50)})`}return`rgb(200, 70, 50)`},Gr=e=>e>=10?e.toFixed(1):e>=1?e.toFixed(2):e.toFixed(3),Kr=e=>e.replace(/\[([^\]]{4,})\]/g,(e,t)=>`[${t.slice(0,3)}]`),qr=()=>{let{editor:e}=Be(),{engine:t}=Br(),[n,r]=(0,b.useState)([]),[i,a]=(0,b.useState)(0),[o,s]=(0,b.useState)(`all`),[c,l]=(0,b.useState)(0),[u,d]=(0,b.useState)(`time`),[f,p]=(0,b.useState)(!1),m=(0,b.useRef)(new Ur(30)),h=(0,b.useRef)(0),g=(0,b.useRef)(!1),_=(0,b.useRef)(0),v=(0,b.useCallback)(n=>{if(!n)return;let r=t.root.findEntityByUUID(n);r&&e.selectEntity(r)},[t,e]);(0,b.useEffect)(()=>{let e=t.renderer,n=m.current,i=e=>{f&&(n.update(e),g.current=!0)},o=e=>{g.current&&e-_.current>=300&&(r(n.getStatistics()),a(n.getTotalTime()),g.current=!1,_.current=e),h.current=requestAnimationFrame(o)};return e.on(`timer`,i),h.current=requestAnimationFrame(o),()=>{e.off(`timer`,i),cancelAnimationFrame(h.current)}},[t,f]);let y=n.filter(e=>!(o!==`all`&&e.renderType!==o||e.avg<c)),x=Array.from(new Set(n.map(e=>e.renderType))),S=[...y].sort((e,t)=>u===`time`?t.avg-e.avg:e.name.localeCompare(t.name)),C=i>0?Math.floor(1e3/i):0;return(0,E.jsxs)(`div`,{className:Vr.container,children:[(0,E.jsxs)(`div`,{className:Vr.headerRow,children:[(0,E.jsxs)(`span`,{className:Vr.totalTime,children:[Gr(i),`ms (`,C,`fps)`]}),(0,E.jsx)(`button`,{className:Vr.toggleButton,onClick:()=>p(!f),title:f?`Stop timer`:`Start timer`,children:f?`⏸`:`▶`})]}),(0,E.jsxs)(`div`,{className:Vr.controls,children:[(0,E.jsxs)(`div`,{className:Vr.control,children:[(0,E.jsx)(`span`,{className:Vr.controlLabel,children:`Type`}),(0,E.jsxs)(`select`,{className:Vr.select,value:o,onChange:e=>s(e.target.value),children:[(0,E.jsx)(`option`,{value:`all`,children:`All`}),x.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`div`,{className:Vr.control,children:[(0,E.jsx)(`span`,{className:Vr.controlLabel,children:`Min`}),(0,E.jsx)(`input`,{className:Vr.input,type:`number`,min:`0`,step:`0.1`,value:c,onChange:e=>l(parseFloat(e.target.value)||0)})]}),(0,E.jsxs)(`div`,{className:Vr.control,children:[(0,E.jsx)(`span`,{className:Vr.controlLabel,children:`Sort`}),(0,E.jsxs)(`select`,{className:Vr.select,value:u,onChange:e=>d(e.target.value),children:[(0,E.jsx)(`option`,{value:`time`,children:`Time`}),(0,E.jsx)(`option`,{value:`name`,children:`Name`})]})]})]}),(0,E.jsx)(`div`,{className:Vr.group,children:S.map((e,t)=>{let n=Wr(e.avg),r=i>0?e.avg/i*100:0,a=!!e.entityId;return(0,E.jsxs)(`div`,{className:`${Vr.item} ${a?Vr.clickable:``}`,onClick:()=>v(e.entityId),children:[(0,E.jsxs)(`div`,{className:Vr.itemRow,children:[(0,E.jsx)(`span`,{className:Vr.itemName,title:e.name,children:Kr(e.name)}),(0,E.jsx)(`span`,{className:Vr.itemTime,style:{color:n},children:Gr(e.avg)}),(0,E.jsx)(`span`,{className:Vr.itemStats,children:Gr(e.max)})]}),(0,E.jsx)(`div`,{className:Vr.progressBar,children:(0,E.jsx)(`div`,{className:Vr.progressFill,style:{width:`${r}%`,backgroundColor:n}})})]},e.name+t)})})]})},Jr=({size:e=24})=>(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{x:`2`,y:`6`,width:`14`,height:`12`,rx:`2`,fill:`#D9D9D9`}),(0,E.jsx)(`path`,{d:`M16 10L22 7V17L16 14V10Z`,fill:`#D9D9D9`})]}),Yr=({size:e=24,selectable:t=!0})=>t?(0,E.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`path`,{d:`M5 3L19 12L12.5 13.5L9.5 20L5 3Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinejoin:`round`})}):(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M5 3L19 12L12.5 13.5L9.5 20L5 3Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinejoin:`round`}),(0,E.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),Xr=({size:e=24,visible:t=!0})=>t?(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,E.jsx)(`circle`,{cx:`12`,cy:`12.5`,r:`3`,stroke:`currentColor`,strokeWidth:`1.5`})]}):(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.89 1 12.5A17.89 17.89 0 0 1 5.06 7.06`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,E.jsx)(`path`,{d:`M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.11 23 11.5A17.89 17.89 0 0 1 19.74 15.74`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,E.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),Zr=({size:e=24})=>(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4`,fill:`#D9D9D9`}),(0,E.jsx)(`path`,{d:`M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07`,stroke:`#D9D9D9`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),Qr=({size:e=24})=>(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M12 3L21 8V16L12 21L3 16V8L12 3Z`,stroke:`#D9D9D9`,strokeWidth:`1.5`,strokeLinejoin:`round`}),(0,E.jsx)(`path`,{d:`M12 3V21M3 8L21 16M21 8L3 16`,stroke:`#D9D9D9`,strokeWidth:`1`,strokeLinejoin:`round`,opacity:`0.5`})]}),$r={picker:`Picker__picker___LnBpY`,picker_label:`Picker__picker_label___LnBpY`,picker_list:`Picker__picker_list___LnBpY`,picker_list_inner:`Picker__picker_list_inner___LnBpY`,item:`Picker__item___LnBpY`},ei=e=>(0,E.jsxs)(`div`,{className:$r.picker,"data-no_bg":e.noBg,children:[e.label&&(0,E.jsx)(`div`,{className:$r.picker_label,children:e.label}),(0,E.jsx)(`div`,{className:$r.picker_list,children:(0,E.jsx)(`div`,{className:$r.picker_list_inner,children:e.list.map((e,t)=>(0,E.jsx)(`div`,{className:$r.item,onClick:e.onClick,children:e.label},t))})})]}),ti={group:`InputGroup__group___Lmdyb`,submit:`InputGroup__submit___Lmdyb`},ni=e=>{let t=e.initialValues,n=[],[r,i]=(0,b.useState)(t);(0,b.useEffect)(()=>{i(t)},[t]);let a=Object.keys(r);for(let e=0;e<a.length;e++){let t=a[e],o=r[t];n.push((0,E.jsx)(k,{label:t,value:o,onChange:e=>{i({...r,[t]:e})}},e))}let o=(0,b.useRef)(null);return(0,b.useEffect)(()=>{setTimeout(()=>{o.current&&o.current.querySelector(`input`)?.focus()},0)},[]),(0,E.jsx)(`div`,{className:ti.group,ref:o,children:(0,E.jsxs)(`form`,{onSubmit:e=>{e.preventDefault()},children:[(0,E.jsx)(pe,{label:e.title,noMargin:!0,children:n}),(0,E.jsx)(`div`,{className:ti.submit,children:(0,E.jsx)(_e,{type:`submit`,onClick:()=>{e.onSubmit&&e.onSubmit(r)},children:`OK`})})]})})},ri={node:`HierarchyNode__node___Lm5vZ`,self:`HierarchyNode__self___Lm5vZ`,self_name:`HierarchyNode__self_name___Lm5vZ`,icon:`HierarchyNode__icon___Lm5vZ`,selectable:`HierarchyNode__selectable___Lm5vZ`,visibility:`HierarchyNode__visibility___Lm5vZ`,menu:`HierarchyNode__menu___Lm5vZ`,fold:`HierarchyNode__fold___Lm5vZ`,fold_button:`HierarchyNode__fold_button___Lm5vZ`,child:`HierarchyNode__child___Lm5vZ`,child_line:`HierarchyNode__child_line___Lm5vZ`},ii=e=>{let{editor:t,engine:n}=Be(),[r]=A(t,`selectedEntityId`),i=r!==void 0&&n.root.findEntityByUUID(r),[a,o]=A(e.entity,`visible`),[s,c]=A(t,`unselectableEntityIds`),[l]=A(e.entity,`children`),u=!(s||[]).includes(e.entity.uuid),d=(l||[]).map(e=>n.root.findEntityByUUID(e)).filter(e=>e!==void 0),f=e.depth||0,p=d&&d.concat().sort((e,t)=>e.name.localeCompare(t.name))||[],m=p.length>0,h=f*20,g=e.entity.initiator==`script`,_=(0,b.useMemo)(()=>e.entity.getComponent(Ht)?(0,E.jsx)(Zr,{size:14}):e.entity.getComponent(Bt)?(0,E.jsx)(Jr,{size:14}):e.entity.getComponent(F)?(0,E.jsx)(Qr,{size:14}):null,[e.entity]),v=e.openNodes.has(e.entity.uuid),y=(0,b.useCallback)(t=>{e.setNodeOpen(e.entity.uuid,!v),t.stopPropagation()},[v,e]),x=(0,b.useCallback)(()=>{t&&t.selectEntity(e.entity)},[t,e.entity]),S=(0,b.useCallback)(e=>{e.stopPropagation(),o&&o(!a)},[a,o]),C=(0,b.useCallback)(t=>{t.stopPropagation();let n=new Set(s||[]);u?n.add(e.entity.uuid):n.delete(e.entity.uuid),c(Array.from(n))},[u,s,c,e.entity.uuid]),{pushContent:w,closeAll:T}=Tr(),ee=(0,b.useCallback)(n=>{n.preventDefault(),!(!t||!w||!T||g)&&(t.selectEntity(e.entity),w((0,E.jsx)(ei,{label:e.entity.name,list:[{label:`Add Entity`,onClick:()=>{w((0,E.jsx)(ni,{initialValues:{name:``},onSubmit:n=>{let r=t.api.createEntity(e.entity,n.name);t.api.selectEntity(r),T()}}))}},{label:`Delete Entity`,onClick:()=>{t.api.deleteEntity(e.entity),T()}}]})))},[t,e.entity,w,T,g]);return(0,E.jsxs)(`div`,{className:ri.node,"data-no_export":g,children:[(0,E.jsxs)(`div`,{className:ri.self,style:{paddingLeft:h},onClick:x,onContextMenu:ee,"data-selected":i&&i.uuid==e.entity.uuid,children:[(0,E.jsx)(`div`,{className:ri.fold,"data-hnode_open":v,children:m&&(0,E.jsx)(`button`,{className:ri.fold_button,onClick:y,children:(0,E.jsx)(de,{open:v})})}),_&&(0,E.jsx)(`div`,{className:ri.icon,children:_}),(0,E.jsx)(`div`,{className:ri.self_name,children:(0,E.jsx)(`p`,{children:e.entity.name||`-`})}),(0,E.jsx)(`button`,{className:ri.selectable,onClick:C,"data-selectable":u,children:(0,E.jsx)(Yr,{size:14,selectable:u})}),(0,E.jsx)(`button`,{className:ri.visibility,onClick:S,"data-visible":a!==!1,children:(0,E.jsx)(Xr,{size:14,visible:a!==!1})}),!g&&(0,E.jsx)(`button`,{className:ri.menu,onClick:ee,children:`⋯`})]}),m&&(0,E.jsxs)(`div`,{className:ri.child,"data-open":v,children:[p.map(t=>(0,E.jsx)(ii,{entity:t,depth:f+1,openNodes:e.openNodes,setNodeOpen:e.setNodeOpen},t.uuid)),(0,E.jsx)(`div`,{className:ri.child_line,style:{marginLeft:h+4}})]})]})},ai={},oi=`hierarchyOpenNodes`,si=()=>{try{let e=localStorage.getItem(oi);if(e)return new Set(JSON.parse(e))}catch{}return new Set},ci=e=>{localStorage.setItem(oi,JSON.stringify(Array.from(e)))},li=()=>{let{editor:e,engine:t}=Be(),[n]=A(e,`selectedEntityId`),r=t.root,[i,a]=(0,b.useState)(si),o=(0,b.useCallback)((e,t)=>{a(n=>{let r=new Set(n);return t?r.add(e):r.delete(e),ci(r),r})},[]);return(0,b.useEffect)(()=>{if(!n)return;let e=r.findEntityByUUID(n);if(!e)return;let t=[],i=e.parent;for(;i;)t.push(i.uuid),i=i.parent;a(e=>{if(t.every(t=>e.has(t)))return e;let n=new Set(e);return t.forEach(e=>n.add(e)),ci(n),n})},[n,r]),(0,E.jsx)(`div`,{className:ai.hierarchy,children:r&&(0,E.jsx)(ii,{entity:r,openNodes:i,setNodeOpen:o})})},ui={inputWindow:`InputWindow__inputWindow___Lmluc`,overlay:`InputWindow__overlay___Lmluc`,window:`InputWindow__window___Lmluc`,label:`InputWindow__label___Lmluc`,input:`InputWindow__input___Lmluc`,buttons:`InputWindow__buttons___Lmluc`,cancelBtn:`InputWindow__cancelBtn___Lmluc`,okBtn:`InputWindow__okBtn___Lmluc`},di=()=>{let{config:e,close:t}=Ee(),n=(0,b.useRef)(null),[r,i]=(0,b.useState)(``),a=(0,b.useRef)(!1);(0,b.useEffect)(()=>{e&&(i(String(e.value)),a.current=!0)},[e]),(0,b.useEffect)(()=>{a.current&&(a.current=!1,n.current?.focus(),n.current?.select())},[r]);let o=(0,b.useCallback)(()=>{e&&(e.type===`number`?e.onChange(Number(r)):e.onChange(r),t())},[e,r,t]),s=(0,b.useCallback)(()=>{t()},[t]);return e?(0,E.jsxs)(`div`,{className:ui.inputWindow,children:[(0,E.jsx)(`div`,{className:ui.overlay,onClick:s}),(0,E.jsxs)(`div`,{className:ui.window,children:[e.label&&(0,E.jsx)(`div`,{className:ui.label,children:e.label}),(0,E.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),o()},children:[(0,E.jsx)(`input`,{ref:n,className:ui.input,type:`text`,inputMode:e.type===`number`?`decimal`:`text`,value:r,step:e.step,min:e.min,max:e.max,onChange:e=>i(e.target.value),onKeyDown:e=>{e.key===`Escape`&&s()}}),(0,E.jsxs)(`div`,{className:ui.buttons,children:[(0,E.jsx)(`button`,{type:`button`,className:ui.cancelBtn,onClick:s,children:`Cancel`}),(0,E.jsx)(`button`,{type:`submit`,className:ui.okBtn,children:`OK`})]})]})]})]}):null},fi=()=>{let[e,t]=(0,b.useState)(null);return{config:e,open:(0,b.useCallback)(e=>{t(e)},[]),close:(0,b.useCallback)(()=>{t(null)},[])}},pi=e=>{let t=fi();return(0,E.jsx)(Te.Provider,{value:t,children:e.children})},mi={mouseMenu:`MouseMenu__mouseMenu___Lm1vd`,hide:`MouseMenu__hide___Lm1vd`,menuItem:`MouseMenu__menuItem___Lm1vd`,menuItem_inner:`MouseMenu__menuItem_inner___Lm1vd`,menuItem_inner_inner:`MouseMenu__menuItem_inner_inner___Lm1vd`},hi=()=>{let{itemList:e,containerRef:t,closeAll:n}=Tr();return(0,E.jsxs)(`div`,{className:mi.mouseMenu,ref:t,children:[e&&e.length>0&&(0,E.jsx)(`div`,{className:mi.hide,onClick:()=>{n&&n()}}),e&&e.map(e=>{let t=e.pos;return(0,E.jsx)(Er.Provider,{value:e,children:(0,E.jsx)(`div`,{className:mi.menuItem,style:{left:0,top:0,transform:`translate(${t.x}px, ${t.y}px)`},children:(0,E.jsx)(`div`,{className:mi.menuItem_inner,children:(0,E.jsx)(`div`,{className:mi.menuItem_inner_inner,"data-direction":e.direction,children:e.elm})})})},e.id)})]})},gi=0,_i=()=>{let e=(0,b.useRef)(null),t=(0,b.useRef)({x:0,y:0}),n=(0,b.useCallback)(e=>{t.current.x=e.clientX,t.current.y=e.clientY},[]);(0,b.useEffect)(()=>(window.addEventListener(`pointermove`,n),()=>{window.removeEventListener(`pointermove`,n)}),[n]);let[r,i]=(0,b.useState)([]),a=(0,b.useRef)(r);a.current=r;let o=(0,b.useCallback)(e=>{a.current=a.current.filter(t=>t.id!==e),i(a.current)},[]),s=(0,b.useCallback)(()=>{i([])},[]);return{itemList:r,pushContent:(0,b.useCallback)(e=>{let n=gi++,r={x:t.current.x,y:t.current.y},s={id:n,elm:e,pos:r,direction:(r.x<window.innerWidth/2?`right`:`left`)+`-`+(r.y<window.innerHeight/2?`bottom`:`top`),close:()=>o(n)};return i([...a.current,s]),s},[o]),closeAll:s,containerRef:e}},vi=e=>{let t=_i();return(0,E.jsx)(wr.Provider,{value:t,children:e.children})},yi={overlay:`DragOverlay__overlay___Lm92Z`,zone:`DragOverlay__zone___Lm92Z`,insert:`DragOverlay__insert___Lm92Z`,ghost:`DragOverlay__ghost___Lm92Z`},bi=12,xi=e=>{let t=(0,b.useRef)(null),n=e.drag.startX,r=e.drag.startY;(0,b.useEffect)(()=>{let e=(e,n)=>{let r=t.current;r&&(r.style.transform=`translate(${e+bi}px, ${n+bi}px)`)};e(n,r);let i=t=>e(t.clientX,t.clientY);window.addEventListener(`pointermove`,i);let a=document.body.style.userSelect;return document.body.style.userSelect=`none`,()=>{window.removeEventListener(`pointermove`,i),document.body.style.userSelect=a}},[n,r]);let i=e.drag.target;return(0,E.jsxs)(`div`,{className:yi.overlay,children:[i&&(0,E.jsx)(`div`,{className:i.kind===`tabs`?yi.insert:yi.zone,style:{left:`${i.rect.left}px`,top:`${i.rect.top}px`,width:`${i.rect.width}px`,height:`${i.rect.height}px`}}),(0,E.jsx)(`div`,{className:yi.ghost,ref:t,children:e.drag.title})]})},Si=(e,t)=>({type:`split`,id:crypto.randomUUID(),direction:e,children:t}),Ci=(e,t)=>({type:`pane`,id:crypto.randomUUID(),tabs:e,active:t??e[0]}),wi=(e,t)=>Ci([...e,...t?.tabs??[]],t?.active);function Ti(e={}){let t=Ci([`screen`]),n=e.mainBottom,r=n?Si(`vertical`,[{ratio:712/912,node:t},{ratio:200/912,node:Ci(n.tabs,n.active)}]):t;return Si(`vertical`,[{ratio:916/1076,node:Si(`horizontal`,[{ratio:300/1912,node:Si(`vertical`,[{ratio:696/912,node:wi([`scene`],e.leftTop)},{ratio:216/912,node:wi([`timer`],e.leftBottom)}])},{ratio:1312/1912,node:r},{ratio:300/1912,node:wi([`property`,`textures`,`project`,`renderer`,`editor-settings`],e.rightTop)}])},{ratio:160/1076,node:wi([`timeline`],e.footer)}])}function Ei(e){return e.type===`pane`?[e]:e.children.flatMap(e=>Ei(e.node))}var Di=e=>{if(e.type===`pane`)return e.tabs.length>0?e:null;let t=[];if(e.children.forEach(n=>{let r=Di(n.node);r&&(r.type===`split`&&r.direction===e.direction?r.children.forEach(e=>t.push({ratio:n.ratio*e.ratio,node:e.node})):t.push(r===n.node?n:{...n,node:r}))}),t.length===0)return null;if(t.length===1)return t[0].node;let n=t.reduce((e,t)=>e+t.ratio,0);return Math.abs(n-1)>1e-6?{...e,children:t.map(e=>({...e,ratio:e.ratio/n}))}:t.length!==e.children.length||t.some((t,n)=>t!==e.children[n])?{...e,children:t}:e};function Oi(e,t,n=new Set){let r=new Set,i=new Set,a=e=>{let t=typeof e==`string`&&e!==``&&!r.has(e)?e:crypto.randomUUID();return r.add(t),t},o=e=>{if(typeof e!=`object`||!e)return null;let r=e;if(r.type===`pane`){if(!Array.isArray(r.tabs))return null;let e=[...new Set(r.tabs.filter(e=>typeof e==`string`&&t.has(e)))].filter(e=>!n.has(e)||!i.has(e)&&(i.add(e),!0));if(e.length===0)return null;let o=typeof r.active==`string`&&e.includes(r.active)?r.active:e[0];return{type:`pane`,id:a(r.id),tabs:e,active:o}}if(r.type===`split`){if(r.direction!==`horizontal`&&r.direction!==`vertical`||!Array.isArray(r.children))return null;let e=[];return r.children.forEach(t=>{if(typeof t!=`object`||!t)return;let n=t,r=o(n.node);if(!r)return;let i=typeof n.ratio==`number`&&isFinite(n.ratio)&&n.ratio>0?n.ratio:1;e.push({ratio:i,node:r})}),e.length===0?null:e.length===1?e[0].node:{type:`split`,id:a(r.id),direction:r.direction,children:e}}return null},s=o(e);return s?Di(s):null}var ki=(e,t,n)=>{if(e.id===t)return n(e);if(e.type===`split`){let r=!1,i=e.children.map(e=>{let i=ki(e.node,t,n);return i===e.node?e:(r=!0,{...e,node:i})});if(r)return{...e,children:i}}return e};function Ai(e,t,n){return ki(e,t,e=>e.type!==`pane`||!e.tabs.includes(n)?e:{...e,active:n})}function ji(e,t,n,r){return ki(e,t,e=>{if(e.type!==`pane`||e.tabs.includes(n))return e;let t=[...e.tabs];return t.splice(Math.max(0,Math.min(r??t.length,t.length)),0,n),{...e,tabs:t,active:n}})}function Mi(e,t,n,r,i){if(t===r)return ki(e,t,e=>{if(e.type!==`pane`)return e;let t=e.tabs.indexOf(n);if(t===-1)return e;let r=e.tabs.filter(e=>e!==n),a=i??e.tabs.length,o=Math.max(0,Math.min(t<a?a-1:a,r.length));return o===t?e:(r.splice(o,0,n),{...e,tabs:r,active:n})});let a=Ei(e),o=a.find(e=>e.id===t),s=a.find(e=>e.id===r);return!o||!s||!o.tabs.includes(n)||s.tabs.includes(n)?e:ji(Pi(e,t,n),r,n,i)}function Ni(e,t,n,r,i){let a=Ei(e),o=a.find(e=>e.id===r);if(!o||!o.tabs.includes(i)||!a.some(e=>e.id===t)||r===t&&o.tabs.length===1)return e;let s=Pi(e,r,i),c={type:`pane`,id:crypto.randomUUID(),tabs:[i],active:i},l=ki(s,t,e=>{let t=[{ratio:.5,node:c},{ratio:.5,node:e}];return(n===`right`||n===`bottom`)&&t.reverse(),{type:`split`,id:crypto.randomUUID(),direction:n===`left`||n===`right`?`horizontal`:`vertical`,children:t}});return l===s?e:Di(l)??e}function Pi(e,t,n){let r=ki(e,t,e=>{if(e.type!==`pane`||!e.tabs.includes(n))return e;let t=e.tabs.indexOf(n),r=e.tabs.filter(e=>e!==n),i=e.active!==n||r.length===0?e.active:r[Math.min(t,r.length-1)];return{...e,tabs:r,active:i}});return r===e?e:Di(r)??e}function Fi(e,t,n){return ki(e,t,e=>e.type!==`split`||e.children.length!==n.length?e:{...e,children:e.children.map((e,t)=>({...e,ratio:n[t]}))})}var Ii=4,L=.25,Li=(e,t)=>{let n={left:e.left,top:e.top,width:e.width,height:e.height};return(t===`left`||t===`right`)&&(n.width/=2),t===`right`&&(n.left+=n.width),(t===`top`||t===`bottom`)&&(n.height/=2),t===`bottom`&&(n.top+=n.height),n},Ri=(e,t,n,r,i)=>{if(n.id!==r&&n.tabs.includes(i))return null;let a=[...t.querySelectorAll(`[data-panel-tab-id]`)].filter(e=>e instanceof HTMLElement),o=a.length;for(let t=0;t<a.length;t++){let n=a[t].getBoundingClientRect();if(e<n.left+n.width/2){o=t;break}}let s=t.getBoundingClientRect(),c=o<a.length?a[o].getBoundingClientRect().left:a.length>0?a[a.length-1].getBoundingClientRect().right:s.left;return{kind:`tabs`,paneId:n.id,index:o,rect:{left:c-1,top:s.top,width:2,height:s.height}}},zi=(e,t,n,r,i)=>{let a=document.elementFromPoint(e,t);if(!a)return null;let o=a.closest(`[data-pane-id]`);if(!(o instanceof HTMLElement))return null;let s=Ei(n).find(e=>e.id===o.dataset.paneId);if(!s)return null;let c=a.closest(`[data-panel-tab-header]`);if(c instanceof HTMLElement)return Ri(e,c,s,r,i);let l=o.querySelector(`[data-panel-content]`);if(!(l instanceof HTMLElement))return null;let u=l.getBoundingClientRect();if(u.width<=0||u.height<=0)return null;let d=(e-u.left)/u.width,f=(t-u.top)/u.height;if(d<0||d>1||f<0||f>1)return null;if(Math.min(d,1-d)>L&&Math.min(f,1-f)>L)return s.id===r||s.tabs.includes(i)?null:{kind:`zone`,paneId:s.id,zone:`center`,rect:Li(u,`center`)};if(s.id===r&&s.tabs.length===1)return null;let p=d-.5,m=f-.5,h=Math.abs(p)>=Math.abs(m)?p<0?`left`:`right`:m<0?`top`:`bottom`;return{kind:`zone`,paneId:s.id,zone:h,rect:Li(u,h)}},Bi=(e,t)=>e===null||t===null?e===t:e.paneId===t.paneId?e.kind===`tabs`&&t.kind===`tabs`?e.index===t.index:e.kind===`zone`&&t.kind===`zone`&&e.zone===t.zone:!1;function Vi(e,t,n){let[r,i]=(0,b.useState)(null),a=(0,b.useRef)(e);a.current=e;let o=(0,b.useRef)(t);o.current=t;let s=(0,b.useRef)(null);return(0,b.useEffect)(()=>()=>s.current?.(),[]),{dragState:r,onTabPointerDown:(e,t,r)=>{if(r.button!==0||s.current)return;let c=r.clientX,l=r.clientY,u=!1,d=null,f=r=>{if(r.buttons===0){p(!1);return}if(!u){if(Math.hypot(r.clientX-c,r.clientY-l)<Ii)return;u=!0,i({panelId:t,title:n.get(t)?.title??t,startX:r.clientX,startY:r.clientY,target:null})}let o=zi(r.clientX,r.clientY,a.current,e,t);Bi(o,d)||(d=o,i(e=>e&&{...e,target:o}))},p=n=>{if(g(),n&&u&&d){let n=a.current;d.kind===`tabs`?o.current(Mi(n,e,t,d.paneId,d.index)):d.zone===`center`?o.current(Mi(n,e,t,d.paneId)):o.current(Ni(n,d.paneId,d.zone,e,t))}u&&i(null)},m=()=>p(!0),h=()=>p(!1),g=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,m),window.removeEventListener(`pointercancel`,h),s.current=null};s.current=g,window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,m),window.addEventListener(`pointercancel`,h)}}}var Hi={pane:`PanelLayout__pane___LnBhb`},Ui=e=>{let t=[],n={};if(!e)return{definitions:t,slots:n};let r=new Set;return Object.keys(e).forEach(i=>{let a=e[i];if(!a||a.length===0)return;let o=[],s;a.forEach(e=>{let n=`custom/${i}/${e.title}`;for(let t=2;r.has(n);t++)n=`custom/${i}/${e.title}-${t}`;r.add(n),o.push(n),t.push({id:n,title:e.title,content:(0,E.jsx)(oe,{children:e.content})}),e.default&&s===void 0&&(s=n)}),n[i]={tabs:o,active:s}}),{definitions:t,slots:n}},Wi=e=>{let t=e.node;if(t.type===`split`)return(0,E.jsx)(ie,{direction:t.direction,ratios:t.children.map(e=>e.ratio),onRatiosChange:n=>e.onRatiosChange(t.id,n),children:t.children.map(t=>(0,E.jsx)(ie.Item,{children:(0,E.jsx)(Wi,{...e,node:t.node})},t.node.id))});let n=t.tabs.map(t=>e.panels.get(t)).filter(e=>e!==void 0);if(n.length===0)return null;let r=e.hasAddable(t);return(0,E.jsx)(`div`,{className:Hi.pane,"data-pane-id":t.id,children:(0,E.jsx)(D,{tabs:n.map(e=>({id:e.id,title:e.title,content:e.content})),active:t.active,onSelect:n=>e.onSelectTab(t.id,n),onTabContextMenu:(n,r)=>e.onTabContextMenu(t.id,n,r),onTabPointerDown:(n,r)=>e.onTabPointerDown(t.id,n,r),onAddClick:r?()=>e.onAddTab(t.id):void 0})})},Gi=e=>{let{editor:t}=Be(),{pushContent:n,closeAll:r}=Tr(),i=(0,b.useMemo)(()=>Ui(e.customTabs),[e.customTabs]),a=(0,b.useMemo)(()=>{let t=new Map;return[...e.panels,...i.definitions].forEach(e=>t.set(e.id,e)),t},[e.panels,i]),[o,s]=A(t,`panelLayout`),c=(0,b.useMemo)(()=>{let e=new Set([...a.values()].filter(e=>e.unique).map(e=>e.id));return Oi(o,new Set(a.keys()),e)??Ti(i.slots)},[o,a,i]),l=e=>{e!==c&&s(e)},u=(e,t)=>l(Ai(c,e,t)),d=(e,t)=>l(Fi(c,e,t)),{dragState:f,onTabPointerDown:p}=Vi(c,l,a),m=e=>[...a.values()].filter(t=>!e.tabs.includes(t.id));return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(Wi,{node:c,panels:a,onSelectTab:u,onRatiosChange:d,onTabContextMenu:(e,t,i)=>{i.preventDefault(),Ei(c).reduce((e,t)=>e+t.tabs.length,0)>1&&n((0,E.jsx)(ei,{label:a.get(t)?.title,list:[{label:`Close Tab`,onClick:()=>{l(Pi(c,e,t)),r()}}]}))},onTabPointerDown:p,onAddTab:e=>{let t=Ei(c).find(t=>t.id===e);if(!t)return;let i=m(t);i.length!==0&&n((0,E.jsx)(ei,{list:i.map(t=>({label:t.title,onClick:()=>{let n=t.unique?Ei(c).find(e=>e.tabs.includes(t.id)):void 0;l(ji(n?Pi(c,n.id,t.id):c,e,t.id)),r()}}))}))},hasAddable:e=>m(e).length>0}),f&&(0,E.jsx)(xi,{drag:f})]})},Ki={project:`ProjectControl__project___LnByb`,project_inner:`ProjectControl__project_inner___LnByb`,projectSelector:`ProjectControl__projectSelector___LnByb`,row:`ProjectControl__row___LnByb`,rowItem:`ProjectControl__rowItem___LnByb`,export:`ProjectControl__export___LnByb`},qi=new URLSearchParams(location.search).get(`project`)||`default`,Ji=()=>{let{editor:e}=Be(),[t,n]=(0,b.useState)(null);if((0,b.useEffect)(()=>{if(!e)return;let t=()=>{n(e.exportProgress?{...e.exportProgress}:null)};return e.on(`update/export`,t),()=>{e.off(`update/export`,t)}},[e]),!e)return null;let r=e.isExporting;return(0,E.jsx)(`div`,{className:Ki.project,children:(0,E.jsx)(`div`,{className:Ki.project_inner,children:(0,E.jsxs)(pe,{label:qi,accordion:!0,children:[(0,E.jsx)(_e,{onClick:()=>{e&&e.save()},children:`Save`}),(0,E.jsx)(_e,{onClick:()=>{window.location.href=`/`},children:`Projects`}),(0,E.jsxs)(`div`,{className:Ki.export,children:[(0,E.jsxs)(_e,{onClick:()=>{e&&(e.save(),window.open(`/player`,`_blank`))},children:[`Play `,(0,E.jsx)(de,{})]}),(0,E.jsx)(_e,{onClick:()=>{e&&!r&&e.exportMP4()},children:t?`Exporting... ${Math.floor(t.current/t.total*100)}%`:`Export MP4`})]})]})})})},Yi={renderer:`RendererSettings__renderer___LnJlb`,renderer_inner:`RendererSettings__renderer_inner___LnJlb`},Xi=()=>{let{editor:e}=Be(),t=e.engine.renderer;return(0,E.jsx)(`div`,{className:Yi.renderer,children:(0,E.jsxs)(`div`,{className:Yi.renderer_inner,children:[(0,E.jsx)(pe,{label:`Resolution`,accordion:!0,children:(0,E.jsx)(ct,{target:e,filter:`resolution`})}),(0,E.jsx)(pe,{label:`Pipeline`,accordion:!0,children:(0,E.jsx)(ct,{target:t,filter:`pipeline`})}),(0,E.jsx)(pe,{label:`Sky`,accordion:!0,children:(0,E.jsx)(ct,{target:t,filter:`sky`})})]})})},Zi={container:`Canvas__container___LmNvb`},Qi=()=>{let{engine:e}=Be(),t=(0,b.useRef)(null);return(0,b.useEffect)(()=>{let n=t.current;if(!e||!n)return;let r=e.canvas;if(!r){console.error(`Canvas element not found in engine`);return}return n.appendChild(r),()=>{n.contains(r)&&n.removeChild(r)}},[e]),(0,E.jsx)(`div`,{className:Zi.container,ref:t,role:`presentation`,"aria-label":`3D Canvas`})},$i={audioView:`AudioView__audioView___LmF1Z`},ea=class extends Tt{wrapperElm;canvas;canvasCtx;viewRangeFrame;viewPort;viewPortRange;musicBuffer;resizeObserver;frameSetting;framePlay;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];let e=window.localStorage.getItem(`audioViweRange`);this.viewRangeFrame=e?Number(e):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){let e=new j(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=e.x,this.canvas.height=e.y}this.render()}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)]*1,s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]*1+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle=`#555`,this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(e){this.framePlay=e,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(e){this.viewRangeFrame=e,this.setFramePlaying(this.framePlay),localStorage.setItem(`audioViweRange`,String(this.viewRangeFrame))}setFrameSetting(e){this.frameSetting=e,this.render()}setMusicBuffer(e){this.musicBuffer=e,this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}},ta=()=>{let{editor:e}=Be(),t=(0,b.useRef)(null),[n,r]=(0,b.useState)();(0,b.useEffect)(()=>{let e=new ea;if(r(e),t.current)return e.setWrapperElm(t.current),()=>{e.dispose()}},[]);let i=e&&e.audioBuffer,[a,o]=(0,b.useState)(),[s,c]=(0,b.useState)({duration:0,fps:0}),[l,u]=(0,b.useState)({current:0,playing:!1});(0,b.useEffect)(()=>{if(!e)return;let t=e.engine,n=e=>{c({duration:e[`timeline/duration`],fps:e[`timeline/fps`]})},r=0,i=()=>{o(r++)},a=e=>{u({...e})};return n(t.serialize()),a(t.frame),t.on(`fields/update`,n),t.on(`update/music`,i),t.on(`update/frame/play`,a),()=>{t.off(`update/frame/setting`,n),t.off(`update/music`,i),t.off(`update/frame/play`,a)}},[e]),(0,b.useEffect)(()=>{n&&i&&n.setMusicBuffer(i)},[n,i,a]),(0,b.useEffect)(()=>{n&&l&&n.setFramePlaying(l)},[n,l]),(0,b.useEffect)(()=>{n&&s&&n.setFrameSetting(s)},[n,s]);let d=(0,b.useCallback)(e=>{if(n){let t=e.deltaY>0?1.1:.9;n.setViewRangeFrame(n.viewRangeFrame*t)}e.preventDefault()},[n]);return(0,b.useEffect)(()=>{let e=t.current;return e&&e.addEventListener(`wheel`,d,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,d)}},[d]),(0,E.jsx)(`div`,{className:$i.audioView,ref:t})},na={cameraPad:`CameraPad__cameraPad___LmNhb`,btn:`CameraPad__btn___LmNhb`},ra=()=>{let{editor:e}=Be(),[t]=A(e,`selectedEntityId`);return(0,E.jsxs)(`div`,{className:na.cameraPad,children:[(0,E.jsx)(`div`,{className:na.btn,"data-disabled":!t,onClick:()=>{t&&e.focusSelected()},title:`Focus selected ( . )`,children:`Focus`}),(0,E.jsx)(`div`,{className:na.btn,onClick:()=>{e.syncToSceneCamera()},title:`Move to scene camera ( Esc )`,children:`Scene Cam`})]})},R={screen:`Screen__screen___LnNjc`,header:`Screen__header___LnNjc`,header_tabs:`Screen__header_tabs___LnNjc`,header_tab:`Screen__header_tab___LnNjc`,header_right:`Screen__header_right___LnNjc`,header_item:`Screen__header_item___LnNjc`,content:`Screen__content___LnNjc`,gizmoMode:`Screen__gizmoMode___LnNjc`,gizmoMode_btn:`Screen__gizmoMode_btn___LnNjc`,gizmoMode_separator:`Screen__gizmoMode_separator___LnNjc`,modalStatus:`Screen__modalStatus___LnNjc`,canvas:`Screen__canvas___LnNjc`,audioViewHandle:`Screen__audioViewHandle___LnNjc`,audioView:`Screen__audioView___LnNjc`,displayOptions:`Screen__displayOptions___LnNjc`,displayOptions_btn:`Screen__displayOptions_btn___LnNjc`,overlay:`Screen__overlay___LnNjc`,overlay_field:`Screen__overlay_field___LnNjc`,overlay_label:`Screen__overlay_label___LnNjc`,overlay_separator:`Screen__overlay_separator___LnNjc`,externalBtn:`Screen__externalBtn___LnNjc`},ia=()=>{let{editor:e}=Be(),t=le(),[n,r]=A(e,`enableRender`),[i,a]=A(e,`preview`),[o,s]=A(e,`viewType`),[c,l]=A(e,`resolutionScale`),[u,d]=A(e,`gizmoMode`),[f,p]=A(e,`transformOrientation`),[m]=A(e,`modalStatus`),[h,g]=A(e,`helpers/show`),[_,v]=A(e,`helpers/empty`),[y,x]=A(e,`helpers/camera`),[S,C]=A(e,`helpers/light`),[w,T]=A(e,`helpers/grid`),[ee,te]=A(e,`helpers/wireframe`),[ne,re]=A(e,`helpers/gizmo`),[ie,ae]=A(e,`helpers/outline`),[oe]=Xe(`showAudioView`),[se,ce]=(0,b.useState)(50),D=(0,b.useRef)(null),[O,ue]=(0,b.useState)(!1),de=(0,b.useRef)(null),fe=(0,b.useCallback)(e=>{de.current&&!de.current.contains(e.target)&&ue(!1)},[]);return(0,b.useEffect)(()=>(O&&document.addEventListener(`pointerdown`,fe),()=>{document.removeEventListener(`pointerdown`,fe)}),[O,fe]),(0,E.jsxs)(`div`,{className:R.screen,children:[(0,E.jsxs)(`div`,{className:R.header,children:[(0,E.jsx)(`div`,{className:R.header_tabs,children:(0,E.jsx)(`div`,{className:R.header_tab,"data-active":!!i,onClick:()=>a&&a(!i),title:`Camera Render`,children:(0,E.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 512 512`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`path`,{d:`M32 144 H336 V368 H32 Z M368 224 L480 152 V360 L368 288 Z`})})})}),(0,E.jsxs)(`div`,{className:R.header_right,children:[(0,E.jsx)(`div`,{className:R.header_item,children:(0,E.jsx)(he,{title:`View`,children:(0,E.jsx)(k,{value:o,format:{type:`select`,list:[`render`,`debug`]},onChange:e=>s&&s(e)})})}),(0,E.jsx)(`div`,{className:R.header_item,children:(0,E.jsx)(he,{title:`Res`,children:(0,E.jsx)(k,{value:c,format:{type:`select`,list:[,,,,,,].fill(0).map((e,t)=>{let n=2**t,r=1/n;return{value:r,label:r==1?`1`:`1/`+n}})},onChange:e=>l&&l(e)})})}),t.isPC&&(0,E.jsx)(`div`,{className:R.externalBtn,children:(0,E.jsx)(_e,{onClick:()=>{e.openInExternalWindow()},children:(0,E.jsxs)(`svg`,{width:`32`,height:`12`,viewBox:`0 0 512 512`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsxs)(`g`,{clipPath:`url(#clip0_224_2)`,children:[(0,E.jsx)(`path`,{d:`M96 0V416H512V0H96ZM472 376H136V40H472V376Z`,fill:`#aaa`}),(0,E.jsx)(`path`,{d:`M40 472V296V136V96H0V512H416V472H376H40Z`,fill:`#aaa`}),(0,E.jsx)(`path`,{d:`M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z`,fill:`#aaa`})]}),(0,E.jsx)(`defs`,{children:(0,E.jsx)(`clipPath`,{id:`clip0_224_2`,children:(0,E.jsx)(`rect`,{width:`512`,height:`512`,fill:`white`})})})]})})})]})]}),(0,E.jsxs)(`div`,{className:R.content,children:[(0,E.jsxs)(`div`,{className:R.displayOptions,ref:de,children:[(0,E.jsx)(`div`,{className:R.displayOptions_btn,"data-active":O,onClick:()=>ue(!O),title:`Display Options`,children:`⚙`}),O&&(0,E.jsxs)(`div`,{className:R.overlay,children:[(0,E.jsx)(`div`,{className:R.overlay_label,children:`Rendering`}),(0,E.jsx)(`div`,{className:R.overlay_field,children:(0,E.jsx)(he,{title:`Render`,children:(0,E.jsx)(k,{value:n,onChange:e=>r&&r(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_separator}),(0,E.jsx)(`div`,{className:R.overlay_label,children:`Helpers`}),(0,E.jsx)(`div`,{className:R.overlay_field,children:(0,E.jsx)(he,{title:`Show`,children:(0,E.jsx)(k,{value:h,onChange:e=>g&&g(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_field,"data-indent":`true`,children:(0,E.jsx)(he,{title:`Empty`,children:(0,E.jsx)(k,{value:_,onChange:e=>v&&v(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_field,"data-indent":`true`,children:(0,E.jsx)(he,{title:`Camera`,children:(0,E.jsx)(k,{value:y,onChange:e=>x&&x(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_field,"data-indent":`true`,children:(0,E.jsx)(he,{title:`Light`,children:(0,E.jsx)(k,{value:S,onChange:e=>C&&C(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_separator}),(0,E.jsx)(`div`,{className:R.overlay_field,children:(0,E.jsx)(he,{title:`Grid`,children:(0,E.jsx)(k,{value:w,onChange:e=>T&&T(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_field,children:(0,E.jsx)(he,{title:`Wireframe`,children:(0,E.jsx)(k,{value:ee,onChange:e=>te&&te(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_field,children:(0,E.jsx)(he,{title:`Gizmo`,children:(0,E.jsx)(k,{value:ne,onChange:e=>re&&re(e)})})}),(0,E.jsx)(`div`,{className:R.overlay_field,children:(0,E.jsx)(he,{title:`Outline`,children:(0,E.jsx)(k,{value:ie,onChange:e=>ae&&ae(e)})})})]})]}),(0,E.jsxs)(`div`,{className:R.gizmoMode,children:[[`select`,`translate`,`rotate`,`scale`].map(e=>(0,E.jsx)(`div`,{className:R.gizmoMode_btn,"data-active":u===e,onClick:()=>d&&d(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`select`?`↖`:e===`translate`?`T`:e===`rotate`?`R`:`S`},e)),(0,E.jsx)(`div`,{className:R.gizmoMode_separator}),[`global`,`local`].map(e=>(0,E.jsx)(`div`,{className:R.gizmoMode_btn,"data-active":f===e,onClick:()=>p&&p(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`global`?`G`:`L`},e))]}),m&&(0,E.jsx)(`div`,{className:R.modalStatus,children:m}),(0,E.jsx)(`div`,{className:R.canvas,children:(0,E.jsx)(Qi,{})}),t.isSP&&(0,E.jsx)(ra,{}),t.isPC&&oe&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`div`,{className:R.audioViewHandle,onPointerDown:e=>{e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),D.current={startY:e.clientY,startHeight:se}},onPointerMove:e=>{if(!D.current)return;let t=D.current.startY-e.clientY,n=Math.max(20,Math.min(400,D.current.startHeight+t));ce(n)},onPointerUp:()=>{D.current=null}}),(0,E.jsx)(`div`,{className:R.audioView,style:{height:se},children:(0,E.jsx)(ta,{})})]})]})]})},aa={textures:`Textures__textures___LnRle`,item:`Textures__item___LnRle`,preview:`Textures__preview___LnRle`,img:`Textures__img___LnRle`,placeholder:`Textures__placeholder___LnRle`,name:`Textures__name___LnRle`},oa=()=>{let{engine:e,editor:t}=Be(),[,n]=(0,b.useState)(0);(0,b.useEffect)(()=>{let e=()=>{t.assetPreviewManager?.invalidateAll(),n(e=>e+1)},r=()=>n(e=>e+1);return xr.resources.on(`update`,e),t.assetPreviewManager?.on(`update`,r),()=>{xr.resources.off(`update`,e),t.assetPreviewManager?.off(`update`,r)}},[e,t]);let r=xr.resources.textureList;return(0,E.jsx)(`div`,{className:aa.textures,children:r.map(e=>{let n=t.assetPreviewManager?.getTexturePreview(e.name);return(0,E.jsxs)(`div`,{className:aa.item,children:[(0,E.jsx)(`div`,{className:aa.preview,children:n?(0,E.jsx)(`img`,{src:n,className:aa.img}):(0,E.jsx)(`div`,{className:aa.placeholder})}),(0,E.jsx)(`div`,{className:aa.name,children:e.name})]},e.name)})})},sa=(0,b.createContext)(null),ca=()=>{let e=(0,b.useContext)(sa);if(e===null)throw Error(`useTimeline must be used within a TimelineProvider`);return e},la=`#define PI 3.14159265359\r
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

}`,ua=class extends Tt{wrapperElm;glCanvas;backend;gl;canvasTexture;canvas;canvasCtx;glRenderer;postProcess;viewPort;viewPortRange;viewPortScale;frameSetting;loopSetting;musicBuffer;musicTexture;resizeObserver;canvasSize;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.glCanvas=document.createElement(`canvas`),this.backend=new bt(this.glCanvas.getContext(`webgl2`)),this.gl=this.backend.gl,this.canvasSize=new j(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this));let e={renderer:null,createEntity:t=>new Gt({...t,engine:e})};this.glRenderer=new Pn(this.backend,e),e.renderer=this.glRenderer,this.canvasTexture=new gt(this.gl),this.musicBuffer=null,this.musicTexture=new gt(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new en({passes:[new I(this.backend,{frag:la,uniforms:{uCanvasTex:{type:`1i`,value:null},uMusicTex:{type:`1i`,value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){let e=new j(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);if(e.x===0||e.y===0)return;this.glCanvas.width=this.canvas.width=e.x,this.glCanvas.height=this.canvas.height=e.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(e),this.render()}}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle=`#181818`;let e=this.frameToPx(0),t=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(e,0,t-e,this.canvas.height)}let e=(e,t,n)=>{let r=Math.ceil(this.viewPort[0]/e)*e;this.canvasCtx.beginPath();let i=0;for(;r<this.viewPort[2]&&i<100;){let n=this.frameToPx(r+t);this.canvasCtx.moveTo(n,0),this.canvasCtx.lineTo(n,this.canvas.height),r+=e,i++}this.canvasCtx.strokeStyle=n,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(e(this.viewPortScale,0,`#555`),e(this.viewPortScale,this.viewPortScale/2,`#333`),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)],s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle=`#0009`;let e=this.frameToPx(this.loopSetting.start),t=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,e,this.canvas.height),this.canvasCtx.fillRect(t,0,this.canvas.width-t,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess.passes&&(this.postProcess.passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(e,t){this.viewPort=e,this.viewPortRange=[e[2]-e[0],e[3]-e[1]],this.viewPortScale=t,this.render()}setFrameSetting(e){this.frameSetting={duration:Math.round(e.duration),fps:Math.round(e.fps)},this.render()}setMusicBuffer(e){this.musicBuffer=e,setTimeout(()=>{this.render()},100)}setLoopSetting(e,t,n){this.loopSetting={enabled:e,start:t,end:n},this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}},da={timelineCanvas:`TimelineCanvas__timelineCanvas___LnRpb`},fa=()=>{let{viewPort:e,viewPortScale:t,musicBuffer:n,musicBufferVersion:r,glEditor:i}=ca(),[a,o]=(0,b.useState)(),s=(0,b.useRef)(null);(0,b.useEffect)(()=>{let e=new ua;return o(e),s.current&&e.setWrapperElm(s.current),()=>{e.dispose()}},[]),(0,b.useEffect)(()=>{a&&e&&t&&a.setViewPort(e,t)},[a,e,t]);let[c]=A(i?.engine,`timeline/duration`),[l]=A(i?.engine,`timeline/fps`);(0,b.useEffect)(()=>{a&&c&&l&&a.setFrameSetting({duration:c||0,fps:l||0})},[a,c,l]);let[u]=A(i,`frameLoop/enabled`),[d]=A(i,`frameLoop/start`),[f]=A(i,`frameLoop/end`);return(0,b.useEffect)(()=>{a&&a.setLoopSetting(u||!1,d||0,f||0)},[a,u,d,f]),(0,b.useEffect)(()=>{a&&n&&a.setMusicBuffer(n)},[a,n,r]),(0,E.jsx)(`div`,{className:da.timelineCanvas,ref:s})},pa={controls:`TimelineControls__controls___LmNvb`},ma=e=>{let{viewPort:t,setCurrentFrame:n,getFrameViewPort:r,zoom:i,scroll:a,setViewPortCenter:o}=ca(),s=(0,b.useRef)([0,0,0,0]),c=(0,b.useRef)([0,0]);t&&(s.current=t,c.current=[t[2]-t[0],t[3]-t[1]]);let l=(0,b.useRef)(null),u=(0,b.useRef)(null),d=(0,b.useRef)(null),f=(0,b.useRef)(null),p=(0,b.useRef)(null),m=(0,b.useCallback)(e=>{let t=l.current&&l.current.clientWidth||1;if(d.current==0){if(n&&r&&u.current){let i=(e.clientX-u.current.left)/t;n(r(i))}}else if(d.current==1){let n=[e.clientX,e.clientY];if(f.current&&p.current){let e=-(n[0]-f.current[0])/t*c.current[0];o&&o(p.current+e)}}},[n,r,o]),h=(0,b.useCallback)(e=>{d.current=e.button,p.current=(s.current[2]+s.current[0])/2,f.current=[e.clientX,e.clientY],u.current=e.currentTarget.getBoundingClientRect();let t=(e.clientX-u.current.left)/e.currentTarget.clientWidth;d.current==0&&n&&r&&n(r(t)),window.addEventListener(`pointermove`,m);let i=()=>{f.current=null,d.current=null,p.current=null,window.removeEventListener(`pointermove`,m)};return window.addEventListener(`pointerup`,i),()=>{window.removeEventListener(`pointerup`,i),window.removeEventListener(`pointermove`,m)}},[r,n,m]),g=(0,b.useCallback)(e=>{if(d.current!==null||!i||!a)return;e.preventDefault();let t=e.target&&e.target.clientWidth||1,n=Math.abs(e.deltaY);Math.abs(e.deltaX)<n?i(n>50?e.deltaY<0?.9:1.1:1+e.deltaY*.005):a(e.deltaX/t*.5)},[i,a]);return(0,b.useEffect)(()=>{let e=l.current;return e&&e.addEventListener(`wheel`,g,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,g)}},[g]),t?(0,E.jsx)(`div`,{className:pa.controls,onPointerDown:h,ref:l,children:e.children}):null},ha={cursor:`TimelineCursor__cursor___LmN1c`,frame:`TimelineCursor__frame___LmN1c`},ga=()=>{let{viewPort:e,framePlay:t}=ca();if(!e||!t)return null;let n=e[2]-e[0],r=(t.current-e[0])/n;return(0,E.jsx)(`div`,{className:ha.cursor,style:{left:r*100+`%`},children:(0,E.jsx)(`div`,{className:ha.frame})})},_a={timelineLoop:`TimelineLoop__timelineLoop___LnRpb`,start:`TimelineLoop__start___LnRpb`,end:`TimelineLoop__end___LnRpb`},va={cursor:`TimelineLoopCursor__cursor___LmN1c`},ya=({onMove:e})=>{let t=(0,b.useRef)(!1);return(0,E.jsx)(`div`,{className:va.cursor,onPointerDown:e=>{e.buttons==1&&(t.current=!0,e.stopPropagation())},onPointerMove:n=>{let r=n.target;t.current!==!1&&n.buttons==1&&(r.setPointerCapture(n.pointerId),n.buttons==1&&e&&e(n.clientX),n.nativeEvent.preventDefault(),n.nativeEvent.stopPropagation())},onPointerUp:()=>{t.current=!1}})},ba=()=>{let{viewPort:e,framePlay:t,glEditor:n}=ca(),r=(0,b.useRef)(null);et(n,[`frameLoop/enabled`,`frameLoop/start`,`frameLoop/end`]);let[i]=A(n,`frameLoop/enabled`),[a,o]=A(n,`frameLoop/start`),[s,c]=A(n,`frameLoop/end`);if(i!==!0||!e||!t||a===void 0||s===void 0)return null;let l=e[2]-e[0],u=(a-e[0])/l,d=(s-e[0])/l,f=(t,n)=>{let r=t.getBoundingClientRect();return(n-r.x)/r.width*(e[2]-e[0])+e[0]};return(0,E.jsx)(`div`,{className:_a.timelineLoop,ref:r,children:(0,E.jsxs)(`div`,{className:_a.timelineLoop_inner,children:[(0,E.jsx)(`div`,{className:_a.start,style:{left:u*100+`%`},children:(0,E.jsx)(ya,{onMove:e=>{r.current&&o&&o(f(r.current,e))}})}),(0,E.jsx)(`div`,{className:_a.end,style:{left:d*100+`%`},children:(0,E.jsx)(ya,{onMove:e=>{r.current&&c&&c(f(r.current,e))}})})]})})},xa={scale:`TimelineScale__scale___LnNjY`,scale_inner:`TimelineScale__scale_inner___LnNjY`,scale_item:`TimelineScale__scale_item___LnNjY`,scale_item_frame:`TimelineScale__scale_item_frame___LnNjY`,scale_item_time:`TimelineScale__scale_item_time___LnNjY`},Sa=e=>`${(`00`+Math.floor(e%3600/60)).slice(-2)}:${(`00`+Math.floor(e%60)).slice(-2)}`,Ca=()=>{let{glEditor:e,viewPort:t,viewPortScale:n}=ca(),[r,i]=A(e?.engine,`timeline/fps`);if(!t||!n||r===void 0)return null;let a=[],o=Math.ceil(t[0]/n)*n,s=0;for(;o<t[2]&&s<100;){let e=(o-t[0])/(t[2]-t[0]),i=o/(r||0);a.push((0,E.jsxs)(`div`,{className:xa.scale_item,style:{left:e*100+`%`},children:[(0,E.jsx)(`div`,{className:xa.scale_item_frame,children:o}),(0,E.jsx)(`div`,{className:xa.scale_item_time,children:Sa(i)})]},o)),o+=n,s++}return(0,E.jsx)(`div`,{className:xa.scale,children:(0,E.jsx)(`div`,{className:xa.scale_inner,children:a})})},wa={timelineSetting:`TimelineSetting__timelineSetting___LnRpb`},Ta=()=>{let{framePlay:e,glEditor:t}=ca(),n=(0,b.useCallback)((e,t)=>{t&&t(e)},[]),[r,i]=A(t,`frameLoop/enabled`),[a,o]=A(t?.engine,`timeline/duration`),[s,c]=A(t?.engine,`timeline/fps`);return(0,E.jsx)(`div`,{className:wa.timelineSetting,children:(0,E.jsxs)(oe,{children:[(0,E.jsx)(he,{title:`current`,children:(0,E.jsx)(k,{value:Math.floor(e?.current||0),readOnly:!0})}),(0,E.jsx)(he,{title:`duration`,children:(0,E.jsx)(k,{value:a,onChange:e=>n(e,o)})}),(0,E.jsx)(he,{title:`fps`,children:(0,E.jsx)(k,{value:s,onChange:e=>n(e,c)})}),(0,E.jsx)(he,{title:`loop`,children:(0,E.jsx)(k,{value:r||!1,onChange:e=>n(e,i)})})]})})},Ea={timeline:`Timeline__timeline___LnRpb`,inner:`Timeline__inner___LnRpb`,content:`Timeline__content___LnRpb`,setting:`Timeline__setting___LnRpb`},Da=()=>{let{editor:e}=Be(),[t,n]=(0,b.useState)({current:0,playing:!1}),[r,i]=(0,b.useState)([0,0,100,0]),a=(0,b.useRef)([0,0,0,0]);a.current=r;let o=r[2]-r[0],s=10*2**(0+Math.floor(Math.log2(o/100)));s=Math.max(1,Math.floor(s));let c=e?.audioBuffer,[l,u]=(0,b.useState)();(0,b.useEffect)(()=>{if(e){let t=e.engine,r=e=>{n({...e})};r(t.frame);let a=0,o=()=>{u(a++)},s=()=>{i([0,0,t.frameSetting.duration,0])};return s(),t.on(`update/frame/play`,r),t.on(`update/music`,o),t.on(`loaded`,s),()=>{t.off(`update/frame/play`,r),t.off(`update/music`,o),t.off(`loaded`,s)}}},[e]);let d=(0,b.useCallback)(t=>{e&&e.engine.seek(t)},[e]),f=(0,b.useCallback)(e=>{let t=r[2]-r[0];return Math.floor(r[0]+t*e)},[r]),p=(0,b.useCallback)(e=>{let t=a.current,n=(t[2]+t[0])/2,r=(t[0]-n)*e+n,o=(t[2]-n)*e+n;i([r,t[1],o,t[3]])},[]),m=(0,b.useCallback)(e=>{let t=a.current,n=e*(t[2]-t[0]);i([t[0]+n,t[1],t[2]+n,t[3]])},[]),h=(0,b.useCallback)(e=>{let t=a.current,n=t[2]-t[0];i([e-n/2,t[1],e+n/2,t[3]])},[]);return{glEditor:e,framePlay:t,viewPort:r,viewPortScale:s,musicBuffer:c,musicBufferVersion:l,setCurrentFrame:d,getFrameViewPort:f,zoom:p,scroll:m,setViewPortCenter:h}},Oa=e=>{let t=Da();return(0,E.jsx)(sa.Provider,{value:t,children:e.children})},ka=()=>(0,E.jsx)(Oa,{children:(0,E.jsx)(`div`,{className:Ea.timeline,children:(0,E.jsxs)(`div`,{className:Ea.inner,children:[(0,E.jsx)(`div`,{className:Ea.setting,children:(0,E.jsx)(Ta,{})}),(0,E.jsxs)(`div`,{className:Ea.content,children:[(0,E.jsx)(fa,{}),(0,E.jsx)(ga,{}),(0,E.jsx)(ma,{children:(0,E.jsx)(ba,{})}),(0,E.jsx)(Ca,{})]})]})})}),Aa={editor:`OREditor__editor___LmVka`},ja=128,Ma=class extends Tt{_draw;_target;_cache;_pending;_canvas2d;_ctx2d;constructor(e){super(),this._draw=e,this._cache=new Map,this._pending=new Set,this._canvas2d=document.createElement(`canvas`),this._canvas2d.width=ja,this._canvas2d.height=ja,this._ctx2d=this._canvas2d.getContext(`2d`),this._target=e.createTarget({size:new j(ja,ja)})}getTexturePreview(e){let t=`tex:`+e,n=this._cache.get(t);if(n)return n;if(this._pending.has(t))return null;let r=xr.resources.getTexture(e);return r?(this._pending.add(t),this._draw.drawTexture(r,this._target),this._draw.readPixels(this._target).then(e=>{this._pending.delete(t),this._cache.set(t,this._toDataURL(e)),this.emit(`update`)}),null):null}invalidate(e){this._cache.delete(e)}invalidateAll(){this._cache.clear(),this._pending.clear()}_toDataURL(e){let t=this._ctx2d.createImageData(ja,ja);for(let n=0;n<ja;n++){let r=(127-n)*ja*4,i=n*ja*4;for(let n=0;n<512;n++)t.data[i+n]=e[r+n]}return this._ctx2d.putImageData(t,0,0),this._canvas2d.toDataURL()}dispose(){this._cache.clear(),this._pending.clear(),this.off(`update`)}},Na=class extends Tt{_undoStack=[];_redoStack=[];_mergeWindow=500;_lastExecuteTime=0;execute(e){let t=Date.now();if(this._undoStack.length>0&&t-this._lastExecuteTime<this._mergeWindow){let n=this._undoStack[this._undoStack.length-1];if(n.mergeWith){let r=n.mergeWith(e);if(r){this._undoStack[this._undoStack.length-1]=r,e.execute(),this._lastExecuteTime=t,this.emit(`change`);return}}}e.execute(),this._undoStack.push(e),this._redoStack=[],this._lastExecuteTime=t,this.emit(`change`)}undo(){let e=this._undoStack.pop();e&&(e.undo(),this._redoStack.push(e),this.emit(`change`))}redo(){let e=this._redoStack.pop();e&&(e.execute(),this._undoStack.push(e),this.emit(`change`))}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}clear(){this._undoStack=[],this._redoStack=[],this.emit(`change`)}},Pa=class{entity;componentClass;name=`AddComponent`;instance=null;constructor(e,t){this.entity=e,this.componentClass=t}execute(){this.instance=this.entity.addComponent(this.componentClass),this.instance.initiator=`user`}undo(){this.entity.removeComponent(this.componentClass),this.instance=null}},Fa=class{_textureName;_config;name=`AddTexture`;constructor(e,t){this._textureName=e,this._config=t}execute(){xr.resources.addTextureResource(this._textureName,this._config)}undo(){xr.resources.removeTextureResource(this._textureName)}},Ia=class{engine;parent;entityName;name=`CreateEntity`;entity=null;constructor(e,t,n){this.engine=e,this.parent=t,this.entityName=n}execute(){this.entity?this.parent.add(this.entity):(this.entity=this.engine.createEntity({name:this.entityName}),this.entity.initiator=`user`,this.parent.add(this.entity))}undo(){this.entity&&this.entity.parent&&this.entity.parent.remove(this.entity)}get createdEntity(){return this.entity}},La=class{entity;name=`DeleteEntity`;parent=null;constructor(e){this.entity=e}execute(){this.parent=this.entity.parent,this.parent&&this.parent.remove(this.entity)}undo(){this.parent&&this.parent.add(this.entity)}},Ra=class{entity;componentClass;component;name=`RemoveComponent`;snapshot=null;constructor(e,t,n){this.entity=e,this.componentClass=t,this.component=n}execute(){this.snapshot=this.component.serialize(),this.entity.removeComponent(this.componentClass)}undo(){let e=this.entity.addComponent(this.componentClass);e.initiator=`user`,this.snapshot&&e.deserialize(this.snapshot),this.component=e}},za=class{_textureName;name=`RemoveTexture`;_snapshot=null;constructor(e){this._textureName=e}execute(){let e=xr.resources.getTextureResource(this._textureName);e&&(this._snapshot=e.serialize({mode:`export`})),xr.resources.removeTextureResource(this._textureName)}undo(){this._snapshot&&xr.resources.addTextureResource(this._textureName,this._snapshot)}},Ba=class e{target;path;oldValue;newValue;name=`SetField`;constructor(e,t,n,r){this.target=e,this.path=t,this.oldValue=n,this.newValue=r}execute(){this.target.setField(this.path,this.newValue)}undo(){this.target.setField(this.path,this.oldValue)}mergeWith(t){return t instanceof e&&t.target===this.target&&t.path===this.path?new e(this.target,this.path,this.oldValue,t.newValue):null}},Va=class{_commandManager;_editor;constructor(e){this._editor=e,this._commandManager=new Na}setField(e,t,n){let r=e.getField(t);this._commandManager.execute(new Ba(e,t,r,n))}createEntity(e,t){let n=new Ia(this._editor.engine,e,t);return this._commandManager.execute(n),n.createdEntity}deleteEntity(e){this._commandManager.execute(new La(e))}selectEntity(e){this._editor.selectEntity(e)}addComponent(e,t){let n=new Pa(e,t);return this._commandManager.execute(n),n.instance}removeComponent(e,t,n){this._commandManager.execute(new Ra(e,t,n))}addTexture(e,t){this._commandManager.execute(new Fa(e,t))}removeTexture(e){this._commandManager.execute(new za(e))}updateTexture(e,t){let n=xr.resources.getTextureResource(e);if(!n)throw Error(`Texture not found: ${e}`);let r=Object.keys(t);for(let e of r){let r=n.getField(e);this._commandManager.execute(new Ba(n,e,r,t[e]))}}undo(){this._commandManager.undo()}redo(){this._commandManager.redo()}get canUndo(){return this._commandManager.canUndo}get canRedo(){return this._commandManager.canRedo}get commandManager(){return this._commandManager}dispose(){this._commandManager.clear()}},Ha=s({LookAt:()=>Ua}),Ua=class extends Ft{target;up;targetWorldPos;targetLocalPos;localUp;lookAtMatrix;parentInverse;constructor(e){super(e),this.target=null,this.targetWorldPos=new j,this.targetLocalPos=new j,this.localUp=new j,this.up=new j(0,1,0),this.lookAtMatrix=new M,this.parentInverse=new M,this.order=100}setTarget(e){this.target=e}postUpdateImpl(e){this.target&&this._enabled&&(this.target.matrixWorld.decompose(this.targetWorldPos),this.targetLocalPos.copy(this.targetWorldPos),this.localUp.copy(this.up),this.entity.parent&&(this.parentInverse.copy(this.entity.parent.matrixWorld).inverse(),this.targetLocalPos.applyMatrix4AsPosition(this.parentInverse),this.localUp.applyMatrix4AsDirection(this.parentInverse).normalize()),this.lookAtMatrix.lookAt(this.entity.position,this.targetLocalPos,this.localUp),this.entity.quaternion.setFromMatrix(this.lookAtMatrix))}},Wa=s({OrbitControls:()=>Ga}),Ga=class extends Ft{keyborad_;_pointer;orbit_;mouseVelOrbit_;mouseVelMove_;eye_;target_;up_;lookatMatrix_;distance_;distanceVel_;_memPos;_memTarget;_multiTouching;elmDisposer;constructor(e){super(e),this._pointer=new Cr,this.keyborad_=new Sr,this.orbit_=new j,this.mouseVelOrbit_=new j,this.mouseVelMove_=new j,this.target_=new j,this.eye_=new j,this.up_=new j(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new M,this._memPos=new j,this._memTarget=new j,this._multiTouching=!1,this.order=999;let t=!1,n=e=>{t||=!0},r=e=>{if(!this._enabled||!t||this._multiTouching)return;let n={x:e.delta.x*1,y:e.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(n):this.mouseVelOrbit_.add(n),e.pointerEvent.preventDefault(),e.pointerEvent.stopPropagation()},i=e=>{t&&=!1};this._pointer.on(`move`,r),this._pointer.on(`start`,n),this._pointer.on(`end`,i),this.once(`dispose`,()=>{this._pointer.off(`move`,r),this._pointer.off(`start`,n),this._pointer.off(`end`,i)}),this.setPosition(this.entity.position,this.target_)}set enabled(e){if(this._enabled=e,e){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);let e=this.entity.getComponent(Ua);e&&e.target&&this.setPosition(this.entity.position,e.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}get eye(){return this.eye_}get target(){return this.target_}setElm(e){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(e);let t=new Map,n=()=>{let e=Array.from(t.values());if(e.length<2)return 0;let n=e[1].x-e[0].x,r=e[1].y-e[0].y;return Math.sqrt(n*n+r*r)},r=()=>{let e=Array.from(t.values());return e.length<2?{x:0,y:0}:{x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2}},i=0,a={x:0,y:0},o=e=>{e.pointerType===`touch`&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),t.size===2&&(this._multiTouching=!0,i=n(),a=r()))},s=e=>{if(e.pointerType===`touch`&&t.has(e.pointerId)&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._enabled&&t.size>=2)){let e=n(),t=e-i;this.distanceVel_+=-t*5,i=e;let o=r(),s=o.x-a.x,c=o.y-a.y;this.mouseVelMove_.add({x:s,y:c}),a=o}},c=e=>{e.pointerType===`touch`&&(t.delete(e.pointerId),t.size<2&&(this._multiTouching=!1,i=0))};e.addEventListener(`pointerdown`,o),e.addEventListener(`pointermove`,s),e.addEventListener(`pointerup`,c),e.addEventListener(`pointercancel`,c);let l=e=>{e.preventDefault(),this._enabled&&(this.distanceVel_+=e.deltaY)};e.addEventListener(`wheel`,l),this.elmDisposer=()=>{e.removeEventListener(`pointerdown`,o),e.removeEventListener(`pointermove`,s),e.removeEventListener(`pointerup`,c),e.removeEventListener(`pointercancel`,c),e.removeEventListener(`wheel`,l)}}calc(e){let t=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new M().makeRotationAxis({x:1,y:0,z:0},Math.min(t,Math.max(-t,this.orbit_.x)))),this.eye_.applyMatrix3(new M().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(e.position,e.quaternion,e.scale)}updateImpl(e){let t=new j(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);t.applyMatrix3(this.entity.matrix),this.target_.add(t),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);let n=Math.max(0,1-e.timeDelta*10);this.mouseVelOrbit_.multiply(n),this.mouseVelMove_.multiply(n),this.distanceVel_*=n,this.calc(this.entity)}addOrbitVelocity(e,t){this._enabled&&this.mouseVelOrbit_.add({x:e,y:t})}addMoveVelocity(e,t){this._enabled&&this.mouseVelMove_.add({x:e,y:t})}addDistanceVelocity(e){this._enabled&&(this.distanceVel_+=e)}setPosition(e,t){if(this.eye_.copy(e),this.target_.copy(t),this.entity){let e=this.entity.parent;e&&(e.updateMatrix(!0),this.target_.applyMatrix4(e.matrixWorld.clone().inverse()))}let n=this.eye_.x-this.target_.x,r=this.eye_.y-this.target_.y,i=this.eye_.z-this.target_.z;this.orbit_.x=Math.atan2(r,Math.sqrt(n*n+i*i)),this.orbit_.y=-Math.atan2(n,i),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0),this.distanceVel_=0}dispose(){super.dispose(),this._pointer.dispose()}},Ka={motionBlur:!1,dof:!1},qa=1.3,Ja=1,Ya=.1,Xa=class{_entity;_camera;_orbitControls;_view;_preview;constructor(e){this._entity=e.createEntity({name:`__editorCamera`}),this._camera=this._entity.addComponent(Bt),this._orbitControls=this._entity.addComponent(Ga),this._orbitControls.setElm(e.canvas),this._view=`editor`,this._preview=!1,this._apply(e)}get entity(){return this._entity}get camera(){return this._camera}get orbitControls(){return this._orbitControls}get view(){return this._view}get preview(){return this._preview}get usingEditorCamera(){return!this._preview&&this._view===`editor`}setView(e,t){this._view=e,this._apply(t)}setPreview(e,t){this._preview=e,this._apply(t)}_apply(e){this.usingEditorCamera?(e.cameraEntity!==this._entity&&this.syncFromSceneCamera(e),e.cameraEntity=this._entity,this._orbitControls.enabled=!0):(e.cameraEntity=null,this._orbitControls.enabled=!1),this.syncPipelineOverride(e)}syncPipelineOverride(e){e.renderer.setPipelineOverride(this.usingEditorCamera?Ka:null)}focus(e){e.updateMatrixRecursive(!0);let t=this._getWorldBounds(e),n=new j,r=Ja;t?(n.copy(t.min).add(t.max).multiply(.5),r=Math.max(t.max.clone().sub(t.min).length()*.5,Ya)):e.matrixWorld.decompose(n);let i=r/Math.tan(this._camera.fov*Math.PI/360)*qa,a=this._orbitControls.eye.clone().sub(this._orbitControls.target);a.length()<1e-6&&a.set(0,0,1),a.normalize().multiply(i),this._orbitControls.setPosition(n.clone().add(a),n)}_getWorldBounds(e){let t=new j(1/0,1/0,1/0),n=new j(-1/0,-1/0,-1/0),r=!1;return e.traverse(e=>{if(!e.visible)return;let i=e.getComponent(F);if(!i)return;let a=i.geometry.boundingBox;if(a){for(let r=0;r<8;r++){let i=new j(r&1?a.max.x:a.min.x,r&2?a.max.y:a.min.y,r&4?a.max.z:a.min.z).applyMatrix4AsPosition(e.matrixWorld);t.x=Math.min(t.x,i.x),t.y=Math.min(t.y,i.y),t.z=Math.min(t.z,i.z),n.x=Math.max(n.x,i.x),n.y=Math.max(n.y,i.y),n.z=Math.max(n.z,i.z)}r=!0}}),r?{min:t,max:n}:null}getCameraEntity(e){return e.resolveCameraEntity()}updateBeforeRender(e){if(!this.usingEditorCamera)return;let t=e.createEntityUpdateEvent();this._entity.updateMatrix(),this._camera.aspect=e.renderer.resolution.x/e.renderer.resolution.y,this._camera.needsUpdateProjectionMatrix=!0,this._entity.update(t),this._entity.postUpdate(t),this._entity.updateMatrixRecursive(),this._entity.prepareRender(t)}updateAfterRender(e){if(!this.usingEditorCamera)return;let t=e.createEntityUpdateEvent();this._entity.commitFrame(t)}resize(e){this._camera.aspect=e.x/e.y,this._camera.needsUpdateProjectionMatrix=!0}dispose(){this._entity.dispose()}syncFromSceneCamera(e){let t=e.findSceneCameraEntity();if(!t)return;let n=new j;t.matrixWorld.decompose(n);let r=t.getComponentsByTag(`camera`)[0];this._orbitControls.setPosition(n,this._resolveOrbitTarget(t,r,n)),r&&(this._camera.fov=r.fov,this._camera.near=r.near,this._camera.far=r.far,this._camera.needsUpdateProjectionMatrix=!0)}_resolveOrbitTarget(e,t,n){let r=Math.max(t?t.dofParams.focusDistance:5,.1),i=new j(0,0,-1,0).applyMatrix3(e.matrixWorld).normalize();return n.clone().add(i.multiply(r))}},Za=class extends Tt{_draw;_elm;_outTarget;_frameLabels;_enable;_resolution;_count;_total;_tile;_tilePixelSize;_tileInv;_focus;_prevFrameLabels;_labelCount;_overlay;constructor(e,t){super(),this._draw=t,this._elm=e,this._outTarget=t.createTarget(),this._enable=!1,this._count=0,this._total=1,this._tile=new j(1,1),this._tilePixelSize=new j(1,1),this._tileInv=new j(1,1),this._focus=null,this._frameLabels=[],this._prevFrameLabels=[],this._labelCount=new Map,this._resolution=new j,this._overlay=document.createElement(`div`),this._overlay.style.cssText=`position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;color:#fff;font-family:'Courier New',monospace;font-weight:500;mix-blend-mode:difference;`,t.onDrawPass((e,t)=>this._push(e,t));let n=new j(0,0),r=this._onClick.bind(this),i=e=>{n.set(e.clientX,e.clientY)},a=e=>{let t=new j(e.clientX,e.clientY);n.clone().sub(t).length()<10&&r(e)};this._elm.addEventListener(`pointerdown`,i),this._elm.addEventListener(`pointerup`,a);let o=e=>{if(e.key===`Escape`&&(this._focus=null,this._clear()),e.key==`ArrowRight`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.min(e+1,this._prevFrameLabels.length-1);this._focus=this._prevFrameLabels[t]??this._focus}if(e.key==`ArrowLeft`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.max(e-1,0);this._focus=this._prevFrameLabels[t]??this._focus}};window.addEventListener(`keydown`,o),this.once(`dispose`,()=>{this._elm.removeEventListener(`pointerdown`,i),this._elm.removeEventListener(`pointerup`,a),window.removeEventListener(`keydown`,o),this._overlay.remove()})}_calcTilePos(e){return{x:e%this._tile.x*this._tileInv.x*this._resolution.x,y:Math.floor(e/this._tile.x)*this._tileInv.y*this._resolution.y}}_push(e,t){if(!this._enable)return;let n=t||String(this._count),r=this._labelCount.get(n)||0;this._labelCount.set(n,r+1);let i=r>0?n+`#`+r:n;if(this._focus==null||this._focus==i){let{x:t,y:n}=this._calcTilePos(this._count);this._focus!==null&&(t=0,n=0),this._draw.blit(e,this._outTarget,{x:t,y:n,width:this._tilePixelSize.x,height:this._tilePixelSize.y}),this._frameLabels.push(i)}this._count++}draw(){this._draw.blit(this._outTarget,null),this._drawLabels(),this._clear()}_drawLabels(){let e=this._elm.parentElement;e&&(this._overlay.parentElement!==e&&e.appendChild(this._overlay),this._overlay.style.fontSize=Math.max(10,this._elm.clientHeight/1080*28)+`px`,this._overlay.replaceChildren(...this._frameLabels.map((e,t)=>{let n=document.createElement(`div`);return n.textContent=e,n.style.cssText=`position:absolute;transform:translateY(-100%);white-space:nowrap;`,n.style.left=t%this._tile.x*this._tileInv.x*100+`%`,n.style.top=(Math.floor(t/this._tile.x)+1)*this._tileInv.y*100+`%`,n.style.paddingLeft=`5px`,n})))}_clear(){this._total=this._count,this._prevFrameLabels=this._frameLabels;let e=Math.sqrt(this._focus===null?Math.max(this._total,1):1);this._tile.set(Math.round(e),Math.ceil(e)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameLabels=[],this._count=0,this._labelCount.clear()}reflesh(){this.resize(this._resolution)}resize(e){this._resolution.copy(e)}_onClick(e){if(this._enable){if(this.reflesh(),this._focus===null){let t=new j(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),n=Math.floor(e.offsetX/t.x)+Math.floor(e.offsetY/t.y)*this._tile.x;n>=0&&n<this._prevFrameLabels.length&&(this._focus=this._prevFrameLabels[n])}this._clear()}}set enable(e){this._enable=e,e?this.reflesh():this._overlay.remove()}get enable(){return this._enable}dispose(){this.emit(`dispose`)}};function Qa(e,t){let n=e.clone().normalize(),r=Math.sin(t/2),i=new ut;return i.set(n.x*r,n.y*r,n.z*r,Math.cos(t/2)),i}function $a(e,t){let n=e.clone().normalize(),r=t.clone().normalize(),i=n.dot(r);if(i>.99999)return new ut;if(i<-.99999){let e=Math.abs(n.x)>.9?new j(0,1,0):new j(1,0,0);return Qa(n.clone().cross(e),Math.PI)}return Qa(n.clone().cross(r),Math.acos(Math.min(1,Math.max(-1,i))))}function eo(e){let t=new ut;return e.matrixWorld.decompose(void 0,t),t}function to(e,t){return e.clone().applyMatrix4AsDirection(new M().applyQuaternion(t))}function no(e,t,n){let r=new j(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:to(r,eo(e)).normalize()}function ro(e,t,n){return e.clone().multiply(t.clone().multiply(n))}function io(e,t,n){let r=e.origin.clone().sub(t),i=e.direction.dot(n),a=r.dot(n),o=r.dot(e.direction),s=1-i*i+1e-4;return a+(a*i-o)/s*i}function ao(e,t,n){let r=e.direction.dot(n);if(Math.abs(r)<1e-4)return null;let i=t.clone().sub(e.origin).dot(n)/r;return e.origin.clone().add(e.direction.clone().multiply(i))}var oo={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},so={xy:`z`,yz:`x`,xz:`y`},co={xy:[`x`,`y`],yz:[`y`,`z`],xz:[`x`,`z`]},lo=[.75,.75,.75],uo=[1,.95,.4],fo=.45,po=.18,mo=class e{static VIEW_SCALE_FACTOR=.15;entity;_engine;_draw;_orientation;_camWorldPos;_records;_hoverHandle;_activeHandle;_dragging;constructor(e,t,n){this._engine=e,this._draw=t,this.entity=e.createEntity({name:n}),this.entity.initiator=`god`,this.entity.visible=!1,this._orientation=`global`,this._camWorldPos=new j,this._records=[],this._hoverHandle=null,this._activeHandle=null,this._dragging=!1}_createEntity(e){let t=this._engine.createEntity({name:e});return t.initiator=`god`,t}_registerHandle(e,t,n){let r=[...n];return this._records.push({handle:e,root:t,color:r,baseColor:[...n]}),this.entity.add(t),r}_addVisual(e,t,n){let r=this._createEntity(`__gizmo_visual`);return r.addComponent(F,{geometry:t,material:this._draw.materials.flat({color:n,depthTest:!1,depthWrite:!1})}),e.add(r),r}_addHit(e,t){let n=this._createEntity(`__gizmo_hit`);return n.addComponent(F,{geometry:t}),e.add(n),n}_addPlaneHandle(e){let t=this._createEntity(`__gizmo_plane_`+e),n=this._registerHandle(e,t,oo[so[e]]);return this._addVisual(t,new Rt({width:po,height:po}),n),this._addHit(t,new Rt({width:po*1.6,height:po*1.6})),e===`yz`?(t.euler.set(0,Math.PI/2,0),t.position.set(0,fo,fo)):e===`xz`?(t.euler.set(Math.PI/2,0,0),t.position.set(fo,0,fo)):t.position.set(fo,fo,0),t}_addCenterHandle(){let e=this._createEntity(`__gizmo_center`),t=this._registerHandle(`center`,e,lo);return this._addVisual(e,new Kt({innerRadius:.1,outerRadius:.14,thetaSegments:24}),t),this._addHit(e,new zt({radius:.16,widthSegments:8,heightSegments:6})),e}setHover(e){this._hoverHandle!==e&&(this._hoverHandle=e,this._updateColors())}_updateColors(){let e=this._dragging?this._activeHandle:this._hoverHandle;for(let t of this._records){let n=t.handle===e?uo:t.baseColor;t.color[0]=n[0],t.color[1]=n[1],t.color[2]=n[2]}}getHandleEntities(){let e=[];for(let t of this._records)t.root.traverse(n=>{let r=n.getComponent(F);r&&!r.material&&e.push({handle:t.handle,entity:n})});return e}setTarget(t,n,r){if(this._orientation=r,!t){this.entity.visible=!1;return}if(this.entity.visible=!0,this.entity.quaternion.copy(this._rootQuaternion(t,r)),this.entity.position.set(t.matrixWorld.elm[12],t.matrixWorld.elm[13],t.matrixWorld.elm[14]),n){let t=n.matrixWorld.elm;this._camWorldPos.set(t[12],t[13],t[14]);let r=this._camWorldPos.distanceTo(this.entity.position),i=Math.max(.01,r*e.VIEW_SCALE_FACTOR);this.entity.scale.set(i,i,i)}this._onTargetUpdated()}_rootQuaternion(e,t){return t===`local`?eo(e):new ut}_onTargetUpdated(){}_camDirLocal(){return to(this._camWorldPos.clone().sub(this.entity.position).normalize(),this.entity.quaternion.clone().inverse()).normalize()}_billboardQuat(){return $a(new j(0,0,1),this._camDirLocal())}get activeHandle(){return this._activeHandle}get dragging(){return this._dragging}startDrag(e,t,n){this._activeHandle=e,this._dragging=!0,this._updateColors(),this._onStartDrag(e,t,n)}endDrag(){this._activeHandle=null,this._dragging=!1,this._updateColors()}},z=[`x`,`y`,`z`];function ho(e,t,n){let r=[],i=[],a=[],o=[];for(let s=0;s<=n;s++){let c=-Math.PI/2+s/n*Math.PI,l=Math.cos(c),u=Math.sin(c);if(r.push(l*e,u*e,0),r.push(l*t,u*t,0),i.push(0,0,1,0,0,1),a.push(s/n,0,s/n,1),s<n){let e=s*2;o.push(e,e+1,e+2,e+1,e+3,e+2)}}let s=new P;return s.setAttribute(`position`,new Float32Array(r),3),s.setAttribute(`normal`,new Float32Array(i),3),s.setAttribute(`uv`,new Float32Array(a),2),s.setAttribute(`index`,new Uint16Array(o),1),s}var go=class extends mo{_rings;_viewRoot;_dragCenter;_dragViewNormal;_dragU;_dragV;_dragAxisN;_dragSign;_dragLastAngle;_dragAccumAngle;_dragStartWorldQuat;_parentWorldQuatInv;constructor(e,t){super(e,t,`__gizmo_rotate`),this._dragCenter=new j,this._dragViewNormal=new j(0,0,1),this._dragU=new j(1,0,0),this._dragV=new j(0,1,0),this._dragAxisN=new j(0,0,1),this._dragSign=1,this._dragLastAngle=0,this._dragAccumAngle=0,this._dragStartWorldQuat=new ut,this._parentWorldQuatInv=new ut;let n={x:Qa(new j(0,1,0),Math.PI/2),y:Qa(new j(1,0,0),-Math.PI/2),z:new ut};this._rings={};for(let e of z){let t=this._createEntity(`__gizmo_ring_`+e),r=this._registerHandle(e,t,oo[e]);this._addVisual(t,ho(.75,.8,48),r),this._addHit(t,ho(.6,.95,24)),this._rings[e]={wrapper:t,base:n[e],baseInv:n[e].clone().inverse()}}this._viewRoot=this._createEntity(`__gizmo_ring_view`);let r=this._registerHandle(`view`,this._viewRoot,lo);this._addVisual(this._viewRoot,new Kt({innerRadius:1,outerRadius:1.05,thetaSegments:64}),r),this._addHit(this._viewRoot,new Kt({innerRadius:.92,outerRadius:1.13,thetaSegments:32}))}_onTargetUpdated(){let e=this._camDirLocal();for(let t of z){let n=this._rings[t],r=to(e,n.baseInv),i=Math.atan2(r.y,r.x);n.wrapper.quaternion.copy(n.base.clone().multiply(Qa(new j(0,0,1),i)))}this._viewRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){this._dragCenter.copy(this.entity.position);let r=t.origin.clone().sub(this._dragCenter).normalize(),i=Math.abs(r.y)>.99?new j(1,0,0):new j(0,1,0);this._dragViewNormal=r,this._dragU=i.cross(r).normalize(),this._dragV=r.clone().cross(this._dragU).normalize(),e===`view`?(this._dragAxisN=r.clone(),this._dragSign=1):(this._dragAxisN=no(n,e,this._orientation),this._dragSign=this._dragAxisN.dot(r)<0?-1:1),this._dragLastAngle=this._angleFromRay(t)??0,this._dragAccumAngle=0,this._dragStartWorldQuat=eo(n),this._parentWorldQuatInv=n.parent?eo(n.parent).inverse():new ut}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this._angleFromRay(e);if(n===null)return null;let r=n-this._dragLastAngle;r>Math.PI?r-=Math.PI*2:r<-Math.PI&&(r+=Math.PI*2),this._dragAccumAngle+=r,this._dragLastAngle=n;let i=Qa(this._dragAxisN,this._dragAccumAngle*this._dragSign),a=ro(this._parentWorldQuatInv,i,this._dragStartWorldQuat);return{euler:new lt().setFromQuaternion(a)}}_angleFromRay(e){let t=ao(e,this._dragCenter,this._dragViewNormal);if(!t)return null;let n=t.sub(this._dragCenter);return Math.atan2(n.dot(this._dragV),n.dot(this._dragU))}},_o=.02,vo=.1,yo=.001,bo=1e-4,xo=[`x`,`y`,`z`],So=[`xy`,`yz`,`xz`],Co=class extends mo{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartAmount;_dragPlaneNormal;_dragStartScale;constructor(e,t){super(e,t,`__gizmo_scale`),this._dragStartPos=new j,this._dragAxisDir=new j(1,0,0),this._dragStartAmount=1,this._dragPlaneNormal=new j(0,0,1),this._dragStartScale=new j(1,1,1);for(let e of xo)this._addAxisHandle(e);for(let e of So)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addAxisHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,oo[e]),r=.6,i=this._addVisual(t,new Lt({radiusTop:_o,radiusBottom:_o,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new It({width:vo,height:vo,depth:vo}),n);a.position.set(0,.9,0),this._addHit(t,new Lt({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new It({width:vo*2,height:vo*2,depth:vo*2})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_rootQuaternion(e,t){return eo(e)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragStartScale.set(n.scale.x,n.scale.y,n.scale.z),e===`x`||e===`y`||e===`z`){this._dragAxisDir=no(n,e,`local`);let r=io(t,this._dragStartPos,this._dragAxisDir);this._dragStartAmount=Math.abs(r)<bo?bo:r;return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():no(n,so[e],`local`);let r=ao(t,this._dragStartPos,this._dragPlaneNormal),i=r?r.sub(this._dragStartPos).length():0;this._dragStartAmount=Math.max(bo,i)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle,r;if(n===`x`||n===`y`||n===`z`)r=io(e,this._dragStartPos,this._dragAxisDir)/this._dragStartAmount;else{let t=ao(e,this._dragStartPos,this._dragPlaneNormal);if(!t)return null;r=t.sub(this._dragStartPos).length()/this._dragStartAmount}Math.abs(r)<yo&&(r=r<0?-.001:yo);let i={x:!1,y:!1,z:!1};if(n===`center`)i.x=i.y=i.z=!0;else if(n===`x`||n===`y`||n===`z`)i[n]=!0;else for(let e of co[n])i[e]=!0;return{scale:new j(this._dragStartScale.x*(i.x?r:1),this._dragStartScale.y*(i.y?r:1),this._dragStartScale.z*(i.z?r:1))}}},wo=.02,To=.22,Eo=.06,Do=[`x`,`y`,`z`],Oo=[`xy`,`yz`,`xz`],ko=class extends mo{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartProjection;_dragPlaneNormal;_dragPlaneStart;constructor(e,t){super(e,t,`__gizmo_translate`),this._dragStartPos=new j,this._dragAxisDir=new j(1,0,0),this._dragStartProjection=0,this._dragPlaneNormal=new j(0,0,1),this._dragPlaneStart=null;for(let e of Do)this._addArrowHandle(e);for(let e of Oo)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addArrowHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,oo[e]),r=.6,i=this._addVisual(t,new Lt({radiusTop:wo,radiusBottom:wo,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new Lt({radiusTop:.001,radiusBottom:Eo,height:To,radSegments:8,heightSegments:1,caps:!0}),n);a.position.set(0,.96,0),this._addHit(t,new Lt({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new Lt({radiusTop:.001,radiusBottom:.11,height:To*1.5,radSegments:6,heightSegments:1,caps:!0})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragPlaneStart=null,e===`x`||e===`y`||e===`z`){this._dragAxisDir=no(n,e,this._orientation),this._dragStartProjection=io(t,this._dragStartPos,this._dragAxisDir);return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():no(n,so[e],this._orientation),this._dragPlaneStart=ao(t,this._dragStartPos,this._dragPlaneNormal)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle;if(n===`x`||n===`y`||n===`z`){let t=io(e,this._dragStartPos,this._dragAxisDir)-this._dragStartProjection;return{position:this._dragStartPos.clone().add(this._dragAxisDir.clone().multiply(t))}}if(!this._dragPlaneStart)return null;let r=ao(e,this._dragStartPos,this._dragPlaneNormal);return r?{position:this._dragStartPos.clone().add(r.sub(this._dragPlaneStart))}:null}},Ao=class{_draw;_translateGizmo;_rotateGizmo;_scaleGizmo;_activeGizmo;_mode;_orientation;_showGizmo;constructor(e,t){this._draw=t,this._translateGizmo=new ko(e,t),this._rotateGizmo=new go(e,t),this._scaleGizmo=new Co(e,t),this._mode=`select`,this._orientation=`global`,this._activeGizmo=null,this._showGizmo=!0}get showGizmo(){return this._showGizmo}set showGizmo(e){this._showGizmo=e}get activeGizmo(){return this._activeGizmo}get mode(){return this._mode}setMode(e){this._mode=e,this._activeGizmo&&this._activeGizmo.setHover(null),this._activeGizmo=e===`translate`?this._translateGizmo:e===`rotate`?this._rotateGizmo:e===`scale`?this._scaleGizmo:null}get orientation(){return this._orientation}setOrientation(e){this._orientation=e}render(e,t,n){if(this._translateGizmo.entity.visible=!1,this._rotateGizmo.entity.visible=!1,this._scaleGizmo.entity.visible=!1,!this._showGizmo||!this._activeGizmo||(this._activeGizmo.setTarget(e||null,t,this._orientation),!this._activeGizmo.entity.visible))return;this._activeGizmo.entity.updateMatrix(!0);let r=n.createEntityUpdateEvent();if(this._activeGizmo.entity.update(r),!t)return;let i=[];this._activeGizmo.entity.traverse(e=>{let t=e.getComponent(F);t&&t.material&&i.push(e)}),i.length>0&&this._draw.renderEntities({camera:t,entities:i,target:null})}},jo=class extends P{constructor(){super(),this.update(50,1,.1,10)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,a,-n,o,-a,-n,o,-a,-n,-o,-a,-n,-o,-a,-n,-o,a,-n,-c,s,-r,c,s,-r,c,s,-r,c,-s,-r,c,-s,-r,-c,-s,-r,-c,-s,-r,-c,s,-r,-o,a,-n,-c,s,-r,o,a,-n,c,s,-r,o,-a,-n,c,-s,-r,-o,-a,-n,-c,-s,-r]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.requestUpdate()}},Mo=class extends P{constructor(){super(),this.update(50,1,.1,2)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,-a,-n,-o,-a,-n,-c,s,-r,c,s,-r,c,-s,-r,-c,-s,-r]),u=new Uint16Array([0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,6,2,3,7,6,0,4,7,0,7,3,1,2,6,1,6,5]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.setAttribute(`index`,u,1),this.requestUpdate()}},No=class extends P{constructor(e=.5){super();let t=[];for(let n=0;n<16;n++){let r=n/16*Math.PI*2,i=(n+1)/16*Math.PI*2;t.push(Math.cos(r)*e,Math.sin(r)*e,0,Math.cos(i)*e,Math.sin(i)*e,0)}let n=e*2;for(let r=0;r<4;r++){let i=r/4*Math.PI*2,a=Math.cos(i)*e*.5,o=Math.sin(i)*e*.5;t.push(a,o,0,a,o,-n)}let r=new Float32Array(t);this.setAttribute(`position`,r,3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3)}},Po=class extends P{constructor(e=.5){super();let t=e*2,n=[],r=[];n.push(0,0,0);for(let t=0;t<12;t++){let r=t/12*Math.PI*2;n.push(Math.cos(r)*e,Math.sin(r)*e,0)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(0,e+1,t+1)}n.push(0,0,-t);for(let r=0;r<12;r++){let i=r/12*Math.PI*2;n.push(Math.cos(i)*e,Math.sin(i)*e,-t)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(13,13+t+1,13+e+1)}for(let e=0;e<12;e++){let t=(e+1)%12,n=e+1,i=t+1,a=13+e+1,o=13+t+1;r.push(n,a,o),r.push(n,o,i)}this.setAttribute(`position`,new Float32Array(n),3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(r),1)}},Fo=class extends P{constructor(e=.3){super();let t=e/2,n=new Float32Array([-t,0,0,t,0,0,0,-t,0,0,t,0,0,0,-t,0,0,t]);this.setAttribute(`position`,n,3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3)}},Io=class extends P{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[];for(let e=0;e<16;e++){let i=e/16*Math.PI*2,a=(e+1)/16*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t,Math.cos(a)*n,Math.sin(a)*n,-t)}for(let e=0;e<4;e++){let i=e/4*Math.PI*2;r.push(0,0,0,Math.cos(i)*n,Math.sin(i)*n,-t)}let i=new Float32Array(r);this.setAttribute(`position`,i,3),this.setAttribute(`normal`,new Float32Array(i.length).fill(0),3),this.requestUpdate()}},Lo=class extends P{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[0,0,0];for(let e=0;e<12;e++){let i=e/12*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t)}let i=[];for(let e=0;e<12;e++){let t=(e+1)%12;i.push(0,e+1,t+1)}for(let e=1;e<11;e++)i.push(1,e+2,e+1);this.setAttribute(`position`,new Float32Array(r),3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(i),1),this.requestUpdate()}},Ro=class{entity;hitAreaEntity;type;targetEntityUUID;_geometry;_hitAreaGeometry;_matrixOffset;_baseColor;_colorUniform;constructor(e,t,n,r){this.type=n,this.targetEntityUUID=r,this.entity=e.createEntity({name:`__helper`}),this.entity.initiator=`god`;let i=this._getColor();this._baseColor=i,this._colorUniform=[...i];let a=t.materials.flat({color:this._colorUniform,lines:!0});this._geometry=this._createGeometry(),this.entity.addComponent(F,{geometry:this._geometry,material:a}),this._hitAreaGeometry=this._createHitAreaGeometry(),this.hitAreaEntity=e.createEntity({name:`__helper_hit`}),this.hitAreaEntity.initiator=`god`,this._hitAreaGeometry&&this.hitAreaEntity.addComponent(F,{geometry:this._hitAreaGeometry}),this._matrixOffset=n===`spotLight`||n===`directionalLight`?new ut().setFromEuler({x:-Math.PI/2,y:0,z:0}):null}_getColor(){switch(this.type){case`empty`:return[.8,.5,.2];case`camera`:return[.6,.8,1];case`spotLight`:return[1,.9,.4];case`directionalLight`:return[1,.9,.4]}}_createGeometry(){switch(this.type){case`empty`:return new Fo;case`camera`:return new jo;case`spotLight`:return new Io;case`directionalLight`:return new No}}_createHitAreaGeometry(){switch(this.type){case`empty`:return null;case`camera`:return new Mo;case`spotLight`:return new Lo;case`directionalLight`:return new Po}}getWorldSegments(){let e=this._geometry.getAttribute(`position`);if(!e)return[];let t=e.array,n=[];for(let e=0;e+5<t.length;e+=6)n.push({a:new j(t[e+0],t[e+1],t[e+2]).applyMatrix4AsPosition(this.entity.matrixWorld),b:new j(t[e+3],t[e+4],t[e+5]).applyMatrix4AsPosition(this.entity.matrixWorld)});return n}setSelected(e){let t=e?[1,.6,0]:this._baseColor;this._colorUniform[0]=t[0],this._colorUniform[1]=t[1],this._colorUniform[2]=t[2]}syncTransform(e){if(this.entity.matrixWorld.copy(e.matrixWorld),this.hitAreaEntity.matrixWorld.copy(e.matrixWorld),this._matrixOffset&&(this.entity.matrixWorld.applyQuaternion(this._matrixOffset),this.hitAreaEntity.matrixWorld.applyQuaternion(this._matrixOffset)),this.type===`camera`){let t=e.getComponentsByTag(`camera`)[0];t&&(this._geometry instanceof jo&&this._geometry.update(t.fov,t.aspect,.1,2),this._hitAreaGeometry instanceof Mo&&this._hitAreaGeometry.update(t.fov,t.aspect,.1,2))}else if(this.type===`spotLight`){let t=e.getComponent(Ht);if(t){let e=Math.min(t.distance,10);this._geometry instanceof Io&&this._geometry.update(t.angle,e),this._hitAreaGeometry instanceof Lo&&this._hitAreaGeometry.update(t.angle,e)}}}},zo=class{_engine;_draw;_showHelpers;_showEmptyHelpers;_showCameraHelpers;_showLightHelpers;_helpers;constructor(e,t){this._engine=e,this._draw=t,this._showHelpers=!0,this._showEmptyHelpers=!0,this._showCameraHelpers=!0,this._showLightHelpers=!0,this._helpers=new Map}get showHelpers(){return this._showHelpers}set showHelpers(e){this._showHelpers=e}get showEmptyHelpers(){return this._showEmptyHelpers}set showEmptyHelpers(e){this._showEmptyHelpers=e}get showCameraHelpers(){return this._showCameraHelpers}set showCameraHelpers(e){this._showCameraHelpers=e}get showLightHelpers(){return this._showLightHelpers}set showLightHelpers(e){this._showLightHelpers=e}render(e,t,n){if(!this._showHelpers||!e)return;let r=new Set,i=[];t.root.traverse(a=>{if(a.initiator===`god`||!a.visible||a===e)return;let o=this._getHelperType(a);if(!o||!this._isHelperTypeEnabled(o))return;r.add(a.uuid);let s=this._helpers.get(a.uuid);s||(s=new Ro(this._engine,this._draw,o,a.uuid),this._helpers.set(a.uuid,s));let c=t.createEntityUpdateEvent();s.entity.update(c),s.hitAreaEntity.update(c),s.setSelected(a.uuid===n),s.syncTransform(a),s.entity.traverse(e=>{e.getComponent(F)&&i.push(e)})}),this._helpers.forEach((e,t)=>{r.has(t)||this._helpers.delete(t)}),i.length>0&&this._draw.renderEntities({camera:e,entities:i,target:null})}getHelpers(){return Array.from(this._helpers.values())}_getHelperType(e){let t=e.getComponent(Ht);return t?t.lightType===`spot`?`spotLight`:`directionalLight`:e.getComponentsByTag(`camera`)[0]?`camera`:e.getComponent(F)?null:`empty`}_isHelperTypeEnabled(e){switch(e){case`empty`:return this._showEmptyHelpers;case`camera`:return this._showCameraHelpers;case`spotLight`:case`directionalLight`:return this._showLightHelpers}}},Bo=()=>{let e=document.activeElement;return e?e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.isContentEditable:!1},Vo=class{_keyboard;constructor(e){this._keyboard=new Sr,this._keyboard.on(`keydown`,(t,n)=>{if(t.isComposing)return;let r=n.Meta||n.Control;r&&n.s&&(t.preventDefault(),e.onSave()),!Bo()&&(e.onTransformKey(t)||(r&&n.z&&(t.preventDefault(),n.Shift?e.onRedo():e.onUndo()),t.key==` `&&!r&&e.onPlayToggle(),(t.code===`Numpad0`||t.key===`0`)&&!r&&e.onCameraViewToggle(),t.key===`9`&&!r&&e.onPreviewToggle(),t.key===`Escape`&&!r&&e.onSyncToSceneCamera(),(t.code===`NumpadDecimal`||t.key===`.`)&&!r&&e.onFocusSelected()))})}dispose(){this._keyboard.dispose()}},Ho=e=>{let t=e.getBoundingClientRect(),n=e.width/e.height,r=t.width/t.height,i=t.width,a=t.height,o=0,s=0;return r>n?(i=t.height*n,o=(t.width-i)/2):(a=t.width/n,s=(t.height-a)/2),{left:t.left+o,top:t.top+s,width:i,height:a}},Uo=(e,t,n)=>{let r=Ho(e);return new j((t-r.left)/r.width*2-1,-((n-r.top)/r.height)*2+1)},Wo=(e,t,n)=>{let r=Ho(e);return new j((t+1)/2*r.width+r.left,(1-n)/2*r.height+r.top)},Go=1,Ko=.001,qo=.007,Jo=.1,Yo={translate:`position`,rotate:`euler`,scale:`scale`},Xo=[`x`,`y`,`z`],Zo=class{_engine;_editorCamera;_api;_getSelectedEntity;_isPointerBusy;_onStatusChange;_canvas;_pointerClient;_session;_disposeListeners;constructor(e){this._engine=e.engine,this._editorCamera=e.editorCamera,this._api=e.api,this._getSelectedEntity=e.getSelectedEntity,this._isPointerBusy=e.isPointerBusy,this._onStatusChange=e.onStatusChange,this._canvas=e.engine.canvas,this._pointerClient=new j,this._session=null;let t=e=>{this._pointerClient.set(e.clientX,e.clientY)};window.addEventListener(`pointermove`,t),this._disposeListeners=()=>{window.removeEventListener(`pointermove`,t)}}get active(){return this._session!==null}get constraintDisplay(){let e=this._session;if(!e||e.trackball||!e.constraint)return null;let t=e.constraint,n=e.mode===`scale`||t.orientation===`local`;return{origin:e.anchorWorldPos,quat:n?e.startWorldQuat:new ut,axes:t.plane?Xo.filter(e=>e!==t.axis):[t.axis]}}handleKeyDown(e){let t=this._session;if(!t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return!1;let t=e.key.toLowerCase(),n=t===`g`?`translate`:t===`r`?`rotate`:t===`s`?`scale`:null;return n?this._start(n):!1}let n=e.key.toLowerCase();return e.key===`Enter`?this._confirm():e.key===`Escape`?this._cancel():n===`r`&&t.mode===`rotate`?this._toggleTrackball():t.trackball||(n===`x`||n===`y`||n===`z`?this._toggleConstraint(n,e.shiftKey):this._inputNumber(e.key)),!0}_inputNumber(e){let t=this._session;if(t){if(e.length===1&&e>=`0`&&e<=`9`)t.numberBuffer+=e;else if(e===`.`){if(t.numberBuffer.includes(`.`))return;t.numberBuffer+=`.`}else if(e===`-`)t.numberBuffer=t.numberBuffer.startsWith(`-`)?t.numberBuffer.slice(1):`-`+t.numberBuffer;else if(e===`Backspace`){if(t.numberBuffer===``)return;t.numberBuffer=t.numberBuffer.slice(0,-1)}else return;this._update()}}_start(e){if(this._isPointerBusy())return!1;let t=this._editorCamera.getCameraEntity(this._engine);if(!t)return!1;let n=this._getSelectedEntity(),r=this._editorCamera.view===`camera`&&(!n||n===t);if(r&&e===`scale`)return!1;let i=r?t:n;if(!i)return!1;let a=t.getComponentsByTag(`camera`)[0];if(!a)return!1;let o=t.matrixWorld.elm,s=new j(o[12],o[13],o[14]),c=new j(-o[8],-o[9],-o[10]).normalize(),l=new j(o[0],o[1],o[2]).normalize(),u=new j(o[4],o[5],o[6]).normalize(),d=i.matrixWorld.elm,f=new j(d[12],d[13],d[14]),p=r?f.clone().add(c.clone().multiply(Math.max(a.dofParams.focusDistance,Jo))):f.clone(),m=e=>{e.stopPropagation(),this._session&&(this._session.lastPointer.set(e.clientX,e.clientY),this._update())},h=e=>{e.preventDefault(),e.stopPropagation(),e.button===2?this._cancel():e.button===0&&this._confirm()};window.addEventListener(`pointermove`,m,{capture:!0}),window.addEventListener(`pointerdown`,h,{capture:!0});let g=this._editorCamera.orbitControls,_=g.enabled;return g.enabled=!1,this._session={mode:e,entity:i,selfView:r,constraint:null,numberBuffer:``,trackball:!1,trackballQuat:new ut,trackballPointer:this._pointerClient.clone(),startValue:{position:i.position.getElm(`vec3`),euler:i.euler.getElm(`vec3`),scale:i.scale.getElm(`vec3`)},startWorldPos:f,startWorldQuat:eo(i),parentWorldInv:i.parent?i.parent.matrixWorld.clone().inverse():new M,parentWorldQuatInv:i.parent?eo(i.parent).inverse():new ut,camForward:c,camRight:l,camUp:u,camWorldPos:s,anchorWorldPos:p,projInv:a.projectionMatrix.clone().inverse(),viewInv:a.viewMatrix.clone().inverse(),centerClient:this._projectToClient(f,a),startPointer:this._pointerClient.clone(),lastPointer:this._pointerClient.clone(),disposeSession:()=>{window.removeEventListener(`pointermove`,m,{capture:!0}),window.removeEventListener(`pointerdown`,h,{capture:!0}),g.enabled=_,this._session&&this._pointerClient.copy(this._session.lastPointer),this._session=null,this._onStatusChange(null)}},this._update(),!0}_confirm(){let e=this._session;if(!e)return;let t=Yo[e.mode],n=e.entity[t].getElm(`vec3`);this._api.commandManager.execute(new Ba(e.entity,t,e.startValue[t],n)),e.disposeSession()}_cancel(){let e=this._session;e&&(this._restoreStart(e),e.entity.updateMatrix(!0),e.disposeSession())}_restoreStart(e){e.entity.position.setFromArray(e.startValue.position),e.entity.euler.setFromArray(e.startValue.euler),e.entity.scale.setFromArray(e.startValue.scale)}_toggleConstraint(e,t){let n=this._session;if(!n||t&&n.mode===`rotate`)return;let r=n.constraint;n.constraint=!r||r.axis!==e||r.plane!==t?{axis:e,orientation:`global`,plane:t}:r.orientation===`global`?{axis:e,orientation:`local`,plane:t}:null,this._update()}_axisWorldDir(e,t,n){let r=new j(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:to(r,e.startWorldQuat).normalize()}_toggleTrackball(){let e=this._session;e&&(e.trackball=!e.trackball,e.constraint=null,e.numberBuffer=``,e.trackballQuat=new ut,e.trackballPointer.copy(e.lastPointer),this._update())}_accumulateTrackball(e){let t=e.lastPointer.x-e.trackballPointer.x,n=e.lastPointer.y-e.trackballPointer.y;if(e.trackballPointer.copy(e.lastPointer),t===0&&n===0)return;let r=Qa(e.camUp,t*qo).multiply(Qa(e.camRight,n*qo));e.trackballQuat.preMultiply(r)}_update(){let e=this._session;if(!e)return;let t=e.numberBuffer===``?null:parseFloat(e.numberBuffer),n=0;t!==null&&Number.isNaN(t)?this._restoreStart(e):n=e.mode===`translate`?this._applyTranslate(e,t):e.mode===`rotate`?this._applyRotate(e,t):this._applyScale(e,t),e.entity.updateMatrix(!0),this._onStatusChange(this._statusText(e,n))}_applyTranslate(e,t){let n=e.constraint;if(t!==null){let n=this._numericTranslateDir(e);return this._setWorldPosition(e,e.startWorldPos.clone().add(n.multiply(t))),t}let r=this._rayFromClient(e.startPointer,e),i=this._rayFromClient(e.lastPointer,e);if(n&&!n.plane){let t=this._axisWorldDir(e,n.axis,n.orientation),a=io(i,e.anchorWorldPos,t)-io(r,e.anchorWorldPos,t);return this._setWorldPosition(e,e.startWorldPos.clone().add(t.clone().multiply(a))),a}let a=n?this._axisWorldDir(e,n.axis,n.orientation):e.camForward,o=ao(r,e.anchorWorldPos,a),s=ao(i,e.anchorWorldPos,a);if(!o||!s)return 0;let c=s.sub(o);return this._setWorldPosition(e,e.startWorldPos.clone().add(c)),c.length()}_numericTranslateDir(e){let t=e.constraint;if(!t)return new j(1,0,0);let n=t.plane?t.axis===`x`?`y`:`x`:t.axis;return this._axisWorldDir(e,n,t.orientation)}_applyRotate(e,t){if(e.trackball)return this._accumulateTrackball(e),this._setWorldRotation(e,e.trackballQuat.clone()),0;let n=e.constraint?this._axisWorldDir(e,e.constraint.axis,e.constraint.orientation):e.camForward,r=e.selfView?e.camForward.clone().multiply(-1):e.camWorldPos.clone().sub(e.startWorldPos),i=t!==null&&e.constraint?1:n.dot(r)<0?-1:1,a=t===null?this._screenAngle(e.lastPointer,e.centerClient)-this._screenAngle(e.startPointer,e.centerClient):t*Math.PI/180;return this._setWorldRotation(e,Qa(n,a*i)),a*180/Math.PI}_applyScale(e,t){let n;if(t!==null)n=t;else{let t=Math.max(Go,e.startPointer.distanceTo(e.centerClient));n=Math.max(Ko,e.lastPointer.distanceTo(e.centerClient)/t)}let r=e.startValue.scale,i=e.constraint,a=Xo.map(e=>i?(i.plane?e!==i.axis:e===i.axis)?n:1:n);return e.entity.scale.set(r[0]*a[0],r[1]*a[1],r[2]*a[2]),n}_setWorldPosition(e,t){let n=t.applyMatrix4AsPosition(e.parentWorldInv);e.entity.position.set(n.x,n.y,n.z)}_setWorldRotation(e,t){e.entity.quaternion.copy(ro(e.parentWorldQuatInv,t,e.startWorldQuat))}_statusText(e,t){if(e.trackball)return`Rot: trackball`;let n=e.mode===`translate`?`Move D`:e.mode===`rotate`?`Rot`:`Scale`,r=e.mode===`rotate`?`°`:``;return`${n}: ${e.numberBuffer===``?t.toFixed(e.mode===`rotate`?1:3):`[${e.numberBuffer}]`}${r} (${this._constraintText(e)})`}_constraintText(e){let t=e.constraint;if(!t)return e.mode===`translate`?`view plane`:e.mode===`rotate`?`view axis`:`uniform`;let n=Xo.filter(e=>t.plane?e!==t.axis:e===t.axis).join(``).toUpperCase();return`${e.mode===`scale`?`local`:t.orientation} ${n}`}_rayFromClient(e,t){let n=Uo(this._canvas,e.x,e.y);return new Yt().setFromCamera(n,t.projInv,t.viewInv)}_projectToClient(e,t){let n=new j(e.x,e.y,e.z,1).applyMatrix4(t.viewMatrix).applyMatrix4(t.projectionMatrix);return Math.abs(n.w)<1e-4?Wo(this._canvas,0,0):Wo(this._canvas,n.x/n.w,n.y/n.w)}_screenAngle(e,t){return Math.atan2(-(e.y-t.y),e.x-t.x)}dispose(){this._cancel(),this._disposeListeners()}},Qo=12,$o=12,es=class{_raycaster;_pointerDownPos;_gizmoDragging;_gizmoDragStartValue;_hoveredTarget;_lastClickNDC;_lastClickCandidateUUIDs;_lastClickCycleIndex;_disposeListeners;constructor(e,t,n,r,i,a,o,s,c,l,u){this._raycaster=new Xt,this._pointerDownPos=null,this._gizmoDragging=!1,this._gizmoDragStartValue=null,this._hoveredTarget=null,this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1;let d=e.canvas,f=()=>t.getCameraEntity(e),p=(e,t)=>{let n=t.getComponentsByTag(`camera`)[0];if(!n)return null;let r=new j(e.x,e.y,e.z,1);return r.applyMatrix4(n.viewMatrix).applyMatrix4(n.projectionMatrix),r.w<=0?null:new j(r.x/r.w,r.y/r.w)},m=new Xt,h=t=>{let n=this._raycaster.ray.origin,r=t.x-n.x,i=t.y-n.y,a=t.z-n.z,o=Math.sqrt(r*r+i*i+a*a);if(o<1e-4)return!1;m.ray.origin.copy(n),m.ray.direction.set(r/o,i/o,a/o);let s=m.intersectEntities(e.root);for(let e of s)if(e.entity.initiator!==`god`)return e.distance<o-.001;return!1},g=new Xt,_=new j,v=(e,t)=>{for(let[n,r]of[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])if(_.set(n,r),g.setFromCamera(_,t),g.intersectEntities(e).length===0)return!1;return!0},y=(e,t,n,r)=>{for(let i of e.getWorldSegments()){let e=p(i.a,n),a=p(i.b,n);if(!e||!a)continue;let o=(e.x-t.x)*r.width*.5,s=(e.y-t.y)*r.height*.5,c=(a.x-t.x)*r.width*.5,l=(a.y-t.y)*r.height*.5,u=c-o,d=l-s,f=u*u+d*d,m=f>0?Math.max(0,Math.min(1,-(o*u+s*d)/f)):0,h=o+u*m,g=s+d*m;if(Math.sqrt(h*h+g*g)<=$o)return!0}return!1},b=n=>{let i=f();if(!i)return[];this._raycaster.setFromCamera(n,i);let a=[];for(let t of this._raycaster.intersectEntities(e.root))t.entity.initiator!==`god`&&o(t.entity)&&a.push({entity:t.entity,distance:t.distance,type:`mesh`});let s=a.length>0?a[0].distance:1/0,c=[],l=[],u=new Set,m=r.getHelpers(),g=Ho(d);for(let t of m){let r=e.root.findEntityByUUID(t.targetEntityUUID);if(!r||!o(r))continue;if(t.type===`empty`){if(!y(t,n,i,g))continue;u.add(t.targetEntityUUID);let e=t.entity.matrixWorld.elm,a=e[12]-this._raycaster.ray.origin.x,o=e[13]-this._raycaster.ray.origin.y,d=e[14]-this._raycaster.ray.origin.z,f=Math.sqrt(a*a+o*o+d*d),p={entity:r,distance:f,type:`helper`};f<=s?c.push(p):l.push(p);continue}let a=this._raycaster.intersectEntities(t.hitAreaEntity);if(a.length===0)continue;u.add(t.targetEntityUUID);let d={entity:r,distance:a[0].distance,type:`helper`};if(v(t.hitAreaEntity,i)){y(t,n,i,g)&&c.push(d);continue}a[0].distance<=s?c.push(d):l.push(d)}t.view===`camera`&&Math.min((1-Math.abs(n.x))*g.width*.5,(1-Math.abs(n.y))*g.height*.5)<=$o&&o(i)&&c.push({entity:i,distance:0,type:`helper`}),c.sort((e,t)=>e.distance-t.distance),l.sort((e,t)=>e.distance-t.distance);let _=[];for(let{targetEntityUUID:t}of m){if(u.has(t))continue;let r=e.root.findEntityByUUID(t);if(!r||!o(r))continue;let a=r.matrixWorld.elm,s=new j(a[12],a[13],a[14]),c=p(s,i);if(!c)continue;let l=(c.x-n.x)*g.width*.5,d=(c.y-n.y)*g.height*.5,f=Math.sqrt(l*l+d*d);if(f>Qo||h(s))continue;let m=s.x-this._raycaster.ray.origin.x,v=s.y-this._raycaster.ray.origin.y,y=s.z-this._raycaster.ray.origin.z;_.push({candidate:{entity:r,distance:Math.sqrt(m*m+v*v+y*y),type:`helper`},screenDistance:f})}return _.sort((e,t)=>e.screenDistance-t.screenDistance),[...c,..._.map(e=>e.candidate),...a,...l]},x=()=>{let e=n.activeGizmo;if(!e||!e.entity.visible)return null;let t=null;for(let{handle:n,entity:r}of e.getHandleEntities()){let e=this._raycaster.intersectEntities(r);e.length>0&&(!t||e[0].distance<t.distance)&&(t={handle:n,distance:e[0].distance})}return t},S=r=>{if(!l()&&(r.pointerType!==`mouse`||r.button===0)){if(t.preview){r.target.setPointerCapture(r.pointerId),this._pointerDownPos=new j(r.clientX,r.clientY);return}if(!(r.pointerType===`touch`&&this._gizmoDragging)&&(r.target.setPointerCapture(r.pointerId),this._pointerDownPos=new j(r.clientX,r.clientY),n.activeGizmo&&n.activeGizmo.entity.visible)){let i=Uo(d,r.clientX,r.clientY),o=f();if(o){this._raycaster.setFromCamera(i,o);let r=x();if(r){let i=a(),o=i?e.root.findEntityByUUID(i):null;o&&(this._gizmoDragging=!0,t.orbitControls.enabled=!1,d.style.cursor=`grabbing`,this._gizmoDragStartValue={position:o.position.getElm(`vec3`),euler:o.euler.getElm(`vec3`),scale:o.scale.getElm(`vec3`)},n.activeGizmo.startDrag(r.handle,this._raycaster.ray,o))}}}}},C=r=>{if(l())return;if((t.preview||t.view===`camera`)&&this._pointerDownPos&&!this._gizmoDragging){let e=r.clientX-this._pointerDownPos.x,t=r.clientY-this._pointerDownPos.y;Math.sqrt(e*e+t*t)>5&&u()}if(t.preview){d.style.cursor=``;return}let i=Uo(d,r.clientX,r.clientY),o=f();if(!o)return;if(this._raycaster.setFromCamera(i,o),this._gizmoDragging){let t=a(),r=t?e.root.findEntityByUUID(t):null;if(!r)return;let i=n.activeGizmo.updateDrag(this._raycaster.ray,r);if(i){if(i.position){let e=i.position.clone();r.parent&&e.applyMatrix4AsPosition(r.parent.matrixWorld.clone().inverse()),r.position.copy(e)}i.euler&&r.euler.set(i.euler.x,i.euler.y,i.euler.z),i.scale&&r.scale.set(i.scale.x,i.scale.y,i.scale.z),r.updateMatrix(!0)}return}let s=null;if(n.activeGizmo&&n.activeGizmo.entity.visible){let e=x();e&&(s=`gizmo`),n.activeGizmo.setHover(e?e.handle:null)}if(!s){let e=b(i);e.length>0&&(s=e[0].type)}s!==this._hoveredTarget&&(this._hoveredTarget=s,s===`gizmo`?d.style.cursor=`grab`:s===`helper`||s===`mesh`?d.style.cursor=`pointer`:d.style.cursor=``)},w=r=>{if(l())return;if(t.preview){this._pointerDownPos=null;return}if(this._gizmoDragging){n.activeGizmo.endDrag(),this._gizmoDragging=!1,t.orbitControls.enabled=t.usingEditorCamera,d.style.cursor=this._hoveredTarget===`gizmo`?`grab`:``;let r=a(),o=r?e.root.findEntityByUUID(r):null;if(o&&this._gizmoDragStartValue){let e=s(),t=e===`translate`?`position`:e===`rotate`?`euler`:`scale`,n=this._gizmoDragStartValue[t],r=o[t].getElm(`vec3`);i.commandManager.execute(new Ba(o,t,n,r))}this._gizmoDragStartValue=null,this._pointerDownPos=null;return}if(!this._pointerDownPos)return;let o=r.clientX-this._pointerDownPos.x,u=r.clientY-this._pointerDownPos.y,p=Math.sqrt(o*o+u*u);if(this._pointerDownPos=null,p>5)return;let m=Uo(d,r.clientX,r.clientY);if(!f())return;let h=b(m);if(h.length===0){this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1,c(null);return}let g=.02,_=this._lastClickNDC&&Math.abs(m.x-this._lastClickNDC.x)<g&&Math.abs(m.y-this._lastClickNDC.y)<g,v=h.map(e=>e.entity.uuid),y=_&&v.length===this._lastClickCandidateUUIDs.length&&v.every((e,t)=>e===this._lastClickCandidateUUIDs[t]),x=0;y&&h.length>1&&(x=(this._lastClickCycleIndex+1)%h.length),this._lastClickNDC=new j(m.x,m.y),this._lastClickCandidateUUIDs=v,this._lastClickCycleIndex=x,c(h[x].entity)},T=e=>{e.preventDefault()};d.addEventListener(`pointerdown`,S),d.addEventListener(`pointermove`,C),d.addEventListener(`pointerup`,w),d.addEventListener(`contextmenu`,T),this._disposeListeners=()=>{d.removeEventListener(`pointerdown`,S),d.removeEventListener(`pointermove`,C),d.removeEventListener(`pointerup`,w),d.removeEventListener(`contextmenu`,T)}}get gizmoDragging(){return this._gizmoDragging}dispose(){this._disposeListeners()}},ts={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},ns=1e3,rs=class{_draw;_root;_axisEntities;constructor(e,t){this._draw=t,this._root=e.createEntity({name:`__constraint_axis`}),this._root.initiator=`god`,this._axisEntities={x:this._createAxisLine(e,`x`),y:this._createAxisLine(e,`y`),z:this._createAxisLine(e,`z`)},this._root.add(this._axisEntities.x),this._root.add(this._axisEntities.y),this._root.add(this._axisEntities.z)}_createAxisLine(e,t){let n=e.createEntity({name:`__constraint_axis_line`});n.initiator=`god`;let r=t===`x`?[-1,0,0,1,0,0]:t===`y`?[0,-1,0,0,1,0]:[0,0,-1,0,0,1],i=new P;return i.setAttribute(`position`,new Float32Array(r),3),i.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),n.addComponent(F,{geometry:i,material:this._draw.materials.flat({color:ts[t],lines:!0,depthTest:!1,depthWrite:!1})}),n}render(e,t,n){if(!e||!t)return;let r=t.matrixWorld.elm,i=e.origin.x-r[12],a=e.origin.y-r[13],o=e.origin.z-r[14],s=Math.max(1,Math.sqrt(i*i+a*a+o*o))*ns;this._root.position.copy(e.origin),this._root.quaternion.copy(e.quat),this._root.scale.set(s,s,s),this._root.updateMatrix(!0),this._root.update(n.createEntityUpdateEvent()),this._draw.renderEntities({camera:t,entities:e.axes.map(e=>this._axisEntities[e]),target:null})}},is=class{_draw;_entity;_color;_params;_showGrid;constructor(e,t){this._draw=t,this._showGrid=!0,this._color=[.35,.35,.35],this._params=[1,1,100],this._entity=e.createEntity({name:`__grid`}),this._entity.initiator=`god`,this._entity.addComponent(F,{geometry:new Rt({floor:!0}),material:t.materials.grid({color:this._color,params:this._params})})}get showGrid(){return this._showGrid}set showGrid(e){this._showGrid=e}render(e,t){if(!this._showGrid||!e)return;let n=e.matrixWorld.elm,r=Math.max(Math.abs(n[13]),.5),i=Math.max(0,Math.floor(Math.log10(r)));this._params[0]=10**i,this._params[1]=1-Math.max(0,Math.log10(r)-i),this._params[2]=Math.max(50,r*30),this._entity.position.set(n[12],0,n[14]),this._entity.scale.set(this._params[2]*2,1,this._params[2]*2),this._entity.update(t.createEntityUpdateEvent()),this._draw.renderEntities({camera:e,entities:[this._entity],target:null})}},as=[1,.6,0],os=class{_draw;_maskTarget;_maskMaterial;_outline;_showOutline;constructor(e){this._draw=e,this._maskTarget=e.createTarget({useSceneDepth:!0}),this._maskMaterial=e.materials.mask(),this._outline=e.recipes.outline(this._maskTarget,as),this._showOutline=!0}get showOutline(){return this._showOutline}set showOutline(e){this._showOutline=e}render(e,t){this._showOutline&&(!e||!t||e.getComponent(F)&&(this._draw.renderEntities({camera:t,entities:[e],target:this._maskTarget,materialOverride:this._maskMaterial,depthCompare:`lequal`}),this._draw.renderFullscreen(this._outline,null)))}},ss=class{_draw;_showWireframe;_wireframeMaterial;_wireframeGeometryCache;constructor(e){this._draw=e,this._showWireframe=!1,this._wireframeGeometryCache=new Map,this._wireframeMaterial=e.materials.flat({color:[.3,.8,.3],lines:!0,depthWrite:!1})}get showWireframe(){return this._showWireframe}set showWireframe(e){this._showWireframe=e}render(e,t){if(!this._showWireframe||!e)return;let n=this._collectMeshEntities(t.root),r=new Map;for(let e of n){let t=e.getComponent(F);if(!t)continue;r.set(e,t.geometry);let n=this._wireframeGeometryCache.get(t.geometry);n||(n=this._createWireframeGeometry(t.geometry),this._wireframeGeometryCache.set(t.geometry,n)),t.geometry=n}this._draw.renderEntities({camera:e,entities:n,target:null,materialOverride:this._wireframeMaterial});for(let e of n){let t=e.getComponent(F);if(!t)continue;let n=r.get(e);n&&(t.geometry=n)}}_collectMeshEntities(e){let t=[],n=(e,r)=>{let i=r&&e.visible;i&&e.getComponent(F)&&t.push(e);for(let t=0;t<e.children.length;t++)n(e.children[t],i)};return n(e,!0),t}_createWireframeGeometry(e){let t=new P,n=e.getAttribute(`position`),r=e.getAttribute(`index`);if(!n)return t;t.setAttribute(`position`,n.array,3);let i=e.getAttribute(`normal`);if(i&&t.setAttribute(`normal`,i.array,3),r){let e=r.array,n=new Set,i=[];for(let t=0;t<e.length;t+=3){let r=e[t],a=e[t+1],o=e[t+2],s=[[Math.min(r,a),Math.max(r,a)],[Math.min(a,o),Math.max(a,o)],[Math.min(o,r),Math.max(o,r)]];for(let[e,t]of s){let r=`${e}_${t}`;n.has(r)||(n.add(r),i.push(e,t))}}t.setAttribute(`index`,new Uint16Array(i),1)}return t}};function B(e){if(!e)throw Error(`Assertion failed.`)}var cs=e=>{let t=(e%360+360)%360;if(t===0||t===90||t===180||t===270)return t;throw Error(`Invalid rotation ${e}.`)},ls=e=>e&&e[e.length-1],us=e=>e>=0&&e<2**32,V=e=>{let t=0;for(;e.readBits(1)===0&&t<32;)t++;if(t>=32)throw Error(`Invalid exponential-Golomb code.`);return(1<<t)-1+e.readBits(t)},ds=e=>{let t=V(e);return t&1?t+1>>1:-(t>>1)},fs=e=>e.constructor===Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),ps=e=>e.constructor===DataView?e:ArrayBuffer.isView(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(e),ms=new TextEncoder,hs={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12},gs={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18},_s={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9},vs=e=>!!e&&!!e.primaries&&!!e.transfer&&!!e.matrix&&e.fullRange!==void 0,ys=e=>e instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e),bs=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(t=>{let n=!1;e=()=>{n||=(t(),this.pending--,!0)}}),n=this.currentPromise;return this.currentPromise=t,this.pending++,await n,e}},xs=(e,t,n)=>{let r=0,i=e.length-1,a=-1;for(;r<=i;){let o=r+(i-r+1)/2|0;n(e[o])<=t?(a=o,r=o+1):i=o-1}return a},Ss=()=>{let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}},Cs=e=>{throw Error(`Unexpected value: ${e}`)},ws=(e,t,n)=>{let r=e.getUint8(t),i=e.getUint8(t+1),a=e.getUint8(t+2);return n?r|i<<8|a<<16:r<<16|i<<8|a},Ts=(e,t,n,r)=>{n>>>=0,n&=16777215,r?(e.setUint8(t,n&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n>>>16&255)):(e.setUint8(t,n>>>16&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n&255))},Es=(e,t,n)=>Math.max(t,Math.min(n,e)),Ds=(e,t,n)=>e+(t-e)*n,Os=(e,t)=>Math.round(e/t)*t,ks=(e,t)=>Math.floor(e*t)/t,As=/^[a-z]{3}$/,js=e=>As.test(e),Ms=1e6*(1+2**-52),Ns=(e,t)=>{let n=e<0?-1:1;e=Math.abs(e);let r=0,i=1,a=1,o=0,s=e;for(;;){let e=Math.floor(s),c=e*a+r,l=e*o+i;if(l>t)return{num:n*a,den:o};if(r=a,i=o,a=c,o=l,s=1/(s-e),!isFinite(s))break}return{num:n*a,den:o}},Ps=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}},Fs=null,Is=()=>Fs===null?Fs=typeof navigator<`u`&&navigator.userAgent?.includes(`Firefox`):Fs,Ls=null,Rs=()=>Ls===null?Ls=!!(typeof navigator<`u`&&(navigator.vendor?.includes(`Google Inc`)||/Chrome/.test(navigator.userAgent))):Ls,zs=null,Bs=()=>{if(zs!==null)return zs;if(typeof navigator>`u`)return null;let e=/\bChrome\/(\d+)/.exec(navigator.userAgent);return e?zs=Number(e[1]):null},Vs=function*(e){for(let t in e){let n=e[t];n!==void 0&&(yield{key:t,value:n})}},Hs=()=>{Symbol.dispose??=Symbol(`Symbol.dispose`)},Us=(e,t)=>{let n=-1,r=1/0;for(let i=0;i<e.length;i++){let a=t(e[i]);a<r&&(r=a,n=i)}return n},Ws=e=>{B(Number.isInteger(e.num)),B(Number.isInteger(e.den)),B(e.den!==0);let t=Math.abs(e.num),n=Math.abs(e.den);for(;n!==0;){let e=t%n;t=n,n=e}let r=t||1;return{num:e.num/r,den:e.den/r}},Gs=(e,t)=>{if(typeof e!=`object`||!e)throw TypeError(`${t} must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(`${t}.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(`${t}.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(`${t}.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(`${t}.height must be a non-negative integer.`)},Ks=e=>new Promise(t=>setTimeout(t,e)),qs=e=>Array.isArray(e)?e:[e],Js=class{constructor(){this._listeners=new Map}on(e,t,n){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:n?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,n]=e,r=this._listeners.get(t);if(r)for(let e of r){try{e.fn(n)}catch(e){console.error(e)}e.once&&r.delete(e)}}},Ys=e=>typeof e==`object`&&!!e&&Object.getPrototypeOf(e)===Object.prototype&&Object.values(e).every(e=>typeof e==`string`),Xs;(function(e){e[e.Silent=0]=`Silent`,e[e.Errors=1]=`Errors`,e[e.Warnings=2]=`Warnings`,e[e.Info=3]=`Info`})(Xs||={});var Zs=class e{constructor(){}static get level(){return e._level}static set level(t){if(t!==Xs.Silent&&t!==Xs.Errors&&t!==Xs.Warnings&&t!==Xs.Info)throw TypeError(`Invalid log level. Use one of the values of the LogLevel enum.`);e._level=t}static get _emitter(){return e._emitterInstance??=new Js}static on(t,n,r){return e._emitter.on(t,n,r)}static _error(...t){e._emitter._emit(`error`,t),e._level>=Xs.Errors&&console.error(...t)}static _warn(...t){e._emitter._emit(`warn`,t),e._level>=Xs.Warnings&&console.warn(...t)}static _info(...t){e._emitter._emit(`info`,t),e._level>=Xs.Info&&console.info(...t)}};Zs._level=Xs.Info,Zs._emitterInstance=null;var Qs=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(typeof t!=`string`)throw TypeError(`mimeType must be a string.`)}},$s=class{constructor(e,t,n,r){if(this.data=e,this.mimeType=t,this.name=n,this.description=r,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==void 0&&typeof t!=`string`)throw TypeError(`mimeType, when provided, must be a string.`);if(n!==void 0&&typeof n!=`string`)throw TypeError(`name, when provided, must be a string.`);if(r!==void 0&&typeof r!=`string`)throw TypeError(`description, when provided, must be a string.`)}},ec=e=>{if(!e||typeof e!=`object`)throw TypeError(`tags must be an object.`);if(e.title!==void 0&&typeof e.title!=`string`)throw TypeError(`tags.title, when provided, must be a string.`);if(e.description!==void 0&&typeof e.description!=`string`)throw TypeError(`tags.description, when provided, must be a string.`);if(e.artist!==void 0&&typeof e.artist!=`string`)throw TypeError(`tags.artist, when provided, must be a string.`);if(e.album!==void 0&&typeof e.album!=`string`)throw TypeError(`tags.album, when provided, must be a string.`);if(e.albumArtist!==void 0&&typeof e.albumArtist!=`string`)throw TypeError(`tags.albumArtist, when provided, must be a string.`);if(e.trackNumber!==void 0&&(!Number.isInteger(e.trackNumber)||e.trackNumber<=0))throw TypeError(`tags.trackNumber, when provided, must be a positive integer.`);if(e.tracksTotal!==void 0&&(!Number.isInteger(e.tracksTotal)||e.tracksTotal<=0))throw TypeError(`tags.tracksTotal, when provided, must be a positive integer.`);if(e.discNumber!==void 0&&(!Number.isInteger(e.discNumber)||e.discNumber<=0))throw TypeError(`tags.discNumber, when provided, must be a positive integer.`);if(e.discsTotal!==void 0&&(!Number.isInteger(e.discsTotal)||e.discsTotal<=0))throw TypeError(`tags.discsTotal, when provided, must be a positive integer.`);if(e.genre!==void 0&&typeof e.genre!=`string`)throw TypeError(`tags.genre, when provided, must be a string.`);if(e.date!==void 0&&(!(e.date instanceof Date)||Number.isNaN(e.date.getTime())))throw TypeError(`tags.date, when provided, must be a valid Date.`);if(e.lyrics!==void 0&&typeof e.lyrics!=`string`)throw TypeError(`tags.lyrics, when provided, must be a string.`);if(e.images!==void 0){if(!Array.isArray(e.images))throw TypeError(`tags.images, when provided, must be an array.`);for(let t of e.images){if(!t||typeof t!=`object`)throw TypeError(`Each image in tags.images must be an object.`);if(!(t.data instanceof Uint8Array))throw TypeError(`Each image.data must be a Uint8Array.`);if(typeof t.mimeType!=`string`)throw TypeError(`Each image.mimeType must be a string.`);if(![`coverFront`,`coverBack`,`unknown`].includes(t.kind))throw TypeError(`Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.`)}}if(e.comment!==void 0&&typeof e.comment!=`string`)throw TypeError(`tags.comment, when provided, must be a string.`);if(e.raw!==void 0){if(!e.raw||typeof e.raw!=`object`)throw TypeError(`tags.raw, when provided, must be an object.`);for(let t of Object.values(e.raw))if(t!==null&&typeof t!=`string`&&!(t instanceof Uint8Array)&&!(t instanceof Qs)&&!(t instanceof $s)&&!Ys(t))throw TypeError(`Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.`)}},tc=e=>{if(!e||typeof e!=`object`)throw TypeError(`disposition must be an object.`);if(e.default!==void 0&&typeof e.default!=`boolean`)throw TypeError(`disposition.default must be a boolean.`);if(e.primary!==void 0&&typeof e.primary!=`boolean`)throw TypeError(`disposition.primary must be a boolean.`);if(e.forced!==void 0&&typeof e.forced!=`boolean`)throw TypeError(`disposition.forced must be a boolean.`);if(e.original!==void 0&&typeof e.original!=`boolean`)throw TypeError(`disposition.original must be a boolean.`);if(e.commentary!==void 0&&typeof e.commentary!=`boolean`)throw TypeError(`disposition.commentary must be a boolean.`);if(e.hearingImpaired!==void 0&&typeof e.hearingImpaired!=`boolean`)throw TypeError(`disposition.hearingImpaired must be a boolean.`);if(e.visuallyImpaired!==void 0&&typeof e.visuallyImpaired!=`boolean`)throw TypeError(`disposition.visuallyImpaired must be a boolean.`)},nc=class e{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,n=7-(this.pos&7),r=(t&1<<n)>>n;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let n=0;n<e;n++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let n=this.pos+e;for(let e=this.pos;e<n;e++){let r=Math.floor(e/8),i=this.bytes[r],a=7-(e&7);i&=~(1<<a),i|=(t&1<<n-e-1)>>n-e-1<<a,this.bytes[r]=i}this.pos=n}readAlignedByte(){if(this.pos%8!=0)throw Error(`Bitstream is not byte-aligned.`);let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let t=new e(this.bytes);return t.pos=this.pos,t}},rc=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],ic=[-1,1,2,3,4,5,6,8],ac=e=>{let t=rc.indexOf(e.sampleRate),n=null;t===-1&&(t=15,n=e.sampleRate);let r=ic.indexOf(e.numberOfChannels);if(r===-1)throw TypeError(`Unsupported number of channels: ${e.numberOfChannels}`);let i=13;e.objectType>=32&&(i+=6),t===15&&(i+=24);let a=Math.ceil(i/8),o=new Uint8Array(a),s=new nc(o);return e.objectType<32?s.writeBits(5,e.objectType):(s.writeBits(5,31),s.writeBits(6,e.objectType-32)),s.writeBits(4,t),t===15&&s.writeBits(24,n),s.writeBits(4,r),o},oc=[`avc`,`hevc`,`vp9`,`av1`,`vp8`,`prores`],sc=[`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,`pcm-u8`,`pcm-s8`,`ulaw`,`alaw`],cc=[`aac`,`opus`,`mp3`,`vorbis`,`flac`,`ac3`,`eac3`],lc=[...cc,...sc],uc=[`webvtt`],dc=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],fc=[{maxPictureSize:36864,maxBitrate:128e3,tier:`L`,level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:`L`,level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:`L`,level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:`L`,level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:`L`,level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:`L`,level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:`H`,level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:`L`,level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:`H`,level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:`L`,level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:`L`,level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:`L`,level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:`L`,level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:`L`,level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:`L`,level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:186}],pc=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],mc=[{maxPictureSize:147456,maxBitrate:15e5,tier:`M`,level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:`M`,level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:`M`,level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:`M`,level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:`M`,level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:`H`,level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:`M`,level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:`H`,level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:`M`,level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:`M`,level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:`M`,level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:`M`,level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:19}],hc=[`ap4x`,`ap4h`,`apch`,`apcn`,`apcs`,`apco`],gc=[{fourCc:`apco`,bitrate:45e6,alpha:!1},{fourCc:`apcs`,bitrate:102e6,alpha:!1},{fourCc:`apcn`,bitrate:147e6,alpha:!1},{fourCc:`apch`,bitrate:22e7,alpha:!1},{fourCc:`ap4h`,bitrate:33e7,alpha:!0},{fourCc:`ap4x`,bitrate:5e8,alpha:!0}],_c=(e,t,n,r,i)=>{if(e===`avc`){let e=Math.ceil(t/16)*Math.ceil(n/16),i=dc.find(t=>e<=t.maxMacroblocks&&r<=t.maxBitrate)??ls(dc),a=i?i.level:0;return`avc1.${`64`.padStart(2,`0`)}00${a.toString(16).padStart(2,`0`)}`}if(e===`hevc`){let e=t*n,i=fc.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??ls(fc);return`hev1.1.6.${i.tier}${i.level}.B0`}if(e===`vp8`)return`vp8`;if(e===`vp9`){let e=t*n;return`vp09.00.${(pc.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??ls(pc)).level.toString().padStart(2,`0`)}.08`}if(e===`av1`){let e=t*n,i=mc.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??ls(mc);return`av01.0.${i.level.toString().padStart(2,`0`)}${i.tier}.08`}if(e===`prores`){let e=(t*n/2073600)**.95,a=gc.filter(e=>e.alpha===i),o=a[0].fourCc,s=1/0;for(let{fourCc:t,bitrate:n}of a){let i=Math.abs(n*e-r);i<s&&(s=i,o=t)}return o}throw Cs(e),TypeError(`Unhandled codec '${String(e)}'.`)},vc=e=>{let t=e.split(`.`),n=Number(t[1]),r=t[2],i=Number(r.slice(0,-1)),a=(n<<5)+i,o=+(r.slice(-1)===`H`),s=Number(t[3])===8?0:1,c=t[4]?Number(t[4]):0,l=t[5]?Number(t[5][0]):1,u=t[5]?Number(t[5][1]):1,d=t[5]?Number(t[5][2]):0;return[129,a,(o<<7)+(s<<6)+0+(c<<4)+(l<<3)+(u<<2)+d,0]},yc=/^pcm-([usf])(\d+)(be)?$/,bc=e=>{if(B(sc.includes(e)),e===`ulaw`)return{dataType:`ulaw`,sampleSize:1,littleEndian:!0,silentValue:255};if(e===`alaw`)return{dataType:`alaw`,sampleSize:1,littleEndian:!0,silentValue:213};let t=yc.exec(e);B(t);let n;n=t[1]===`u`?`unsigned`:t[1]===`s`?`signed`:`float`;let r=Number(t[2])/8,i=t[3]!==`be`;return{dataType:n,sampleSize:r,littleEndian:i,silentValue:e===`pcm-u8`?128:0}},xc=e=>e.startsWith(`avc1`)||e.startsWith(`avc3`)?`avc`:e.startsWith(`hev1`)||e.startsWith(`hvc1`)?`hevc`:e===`vp8`?`vp8`:e.startsWith(`vp09`)?`vp9`:e.startsWith(`av01`)?`av1`:hc.includes(e)?`prores`:e===`mp3`||e===`mp4a.69`||e===`mp4a.6B`||e===`mp4a.6b`||e===`mp4a.40.34`?`mp3`:e.startsWith(`mp4a.40.`)||e===`mp4a.67`?`aac`:e===`opus`?`opus`:e===`vorbis`?`vorbis`:e===`flac`?`flac`:e===`ac-3`||e===`ac3`?`ac3`:e===`ec-3`||e===`eac3`?`eac3`:e===`ulaw`?`ulaw`:e===`alaw`?`alaw`:yc.test(e)?e:e===`webvtt`?`webvtt`:null,Sc=e=>e===`avc`?{avc:{format:`avc`}}:e===`hevc`?{hevc:{format:`hevc`}}:{},Cc=[`avc1`,`avc3`,`hev1`,`hvc1`,`vp8`,`vp09`,`av01`,...hc],wc=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,Tc=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,Ec=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,Dc=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,Oc=(e,t)=>{if(!e)throw TypeError(`Video chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Video chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Video chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Video chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Video chunk metadata decoder configuration must specify a codec string.`);if(!Cc.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.codedWidth)||e.decoderConfig.codedWidth<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).`);if(!Number.isInteger(e.decoderConfig.codedHeight)||e.decoderConfig.codedHeight<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).`);if(e.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectWidth)||e.decoderConfig.displayAspectWidth<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectHeight)||e.decoderConfig.displayAspectHeight<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectWidth!==void 0!=(e.decoderConfig.displayAspectHeight!==void 0))throw TypeError(`Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.`);if(e.decoderConfig.description!==void 0&&!ys(e.decoderConfig.description))throw TypeError(`Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=e.decoderConfig;if(typeof t!=`object`)throw TypeError(`Video chunk metadata decoder configuration colorSpace, when provided, must be an object.`);let n=Object.keys(hs);if(t.primaries!=null&&!n.includes(t.primaries))throw TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${n.join(`, `)}.`);let r=Object.keys(gs);if(t.transfer!=null&&!r.includes(t.transfer))throw TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(`, `)}.`);let i=Object.keys(_s);if(t.matrix!=null&&!i.includes(t.matrix))throw TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(`, `)}.`);if(t.fullRange!=null&&typeof t.fullRange!=`boolean`)throw TypeError(`Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.`)}if(e.decoderConfig.codec.startsWith(`avc1`)||e.decoderConfig.codec.startsWith(`avc3`)){if(!wc.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.`)}else if(e.decoderConfig.codec.startsWith(`hev1`)||e.decoderConfig.codec.startsWith(`hvc1`)){if(!Tc.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.`)}else if(e.decoderConfig.codec.startsWith(`vp8`)){if(e.decoderConfig.codec!==`vp8`)throw TypeError(`Video chunk metadata decoder configuration codec string for VP8 must be "vp8".`)}else if(e.decoderConfig.codec.startsWith(`vp09`)){if(!Ec.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.`)}else if(e.decoderConfig.codec.startsWith(`av01`)){if(!Dc.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.`)}else if(hc.some(t=>e.decoderConfig.codec.startsWith(t))&&!hc.some(t=>e.decoderConfig.codec===t))throw TypeError(`Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${hc.join(`, `)}.`);if(t!==null&&xc(e.decoderConfig.codec)!==t)throw TypeError(`Video chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},kc=[`mp4a`,`mp3`,`opus`,`vorbis`,`flac`,`ulaw`,`alaw`,`pcm`,`ac-3`,`ec-3`],Ac=(e,t)=>{if(!e)throw TypeError(`Audio chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Audio chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Audio chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Audio chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Audio chunk metadata decoder configuration must specify a codec string.`);if(!kc.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.sampleRate)||e.decoderConfig.sampleRate<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).`);if(!Number.isInteger(e.decoderConfig.numberOfChannels)||e.decoderConfig.numberOfChannels<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).`);if(e.decoderConfig.description!==void 0&&!ys(e.decoderConfig.description))throw TypeError(`Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.codec.startsWith(`mp4a`)&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`){if(![`mp4a.40.2`,`mp4a.40.02`,`mp4a.40.5`,`mp4a.40.05`,`mp4a.40.29`,`mp4a.67`].includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`mp3`)||e.decoderConfig.codec.startsWith(`mp4a`)){if(e.decoderConfig.codec!==`mp3`&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`)throw TypeError(`Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".`)}else if(e.decoderConfig.codec.startsWith(`opus`)){if(e.decoderConfig.codec!==`opus`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Opus must be "opus".`);if(e.decoderConfig.description&&e.decoderConfig.description.byteLength<18)throw TypeError(`Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.`)}else if(e.decoderConfig.codec.startsWith(`vorbis`)){if(e.decoderConfig.codec!==`vorbis`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".`);if(!e.decoderConfig.description)throw TypeError(`Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`flac`)){if(e.decoderConfig.codec!==`flac`)throw TypeError(`Audio chunk metadata decoder configuration codec string for FLAC must be "flac".`);if(!e.decoderConfig.description||e.decoderConfig.description.byteLength<42)throw TypeError(`Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`ac-3`)||e.decoderConfig.codec.startsWith(`ac3`)){if(e.decoderConfig.codec!==`ac-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".`)}else if(e.decoderConfig.codec.startsWith(`ec-3`)||e.decoderConfig.codec.startsWith(`eac3`)){if(e.decoderConfig.codec!==`ec-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".`)}else if((e.decoderConfig.codec.startsWith(`pcm`)||e.decoderConfig.codec.startsWith(`ulaw`)||e.decoderConfig.codec.startsWith(`alaw`))&&!sc.includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${sc.join(`, `)}).`);if(t!==null&&xc(e.decoderConfig.codec)!==t)throw TypeError(`Audio chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},jc=e=>{if(!e)throw TypeError(`Subtitle metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Subtitle metadata must be an object.`);if(!e.config)throw TypeError(`Subtitle metadata must include a config object.`);if(typeof e.config!=`object`)throw TypeError(`Subtitle metadata config must be an object.`);if(typeof e.config.description!=`string`)throw TypeError(`Subtitle metadata config description must be a string.`)},Mc=[48e3,44100,32e3],Nc=[24e3,22050,16e3],Pc;(function(e){e[e.NON_IDR_SLICE=1]=`NON_IDR_SLICE`,e[e.SLICE_DPA=2]=`SLICE_DPA`,e[e.SLICE_DPB=3]=`SLICE_DPB`,e[e.SLICE_DPC=4]=`SLICE_DPC`,e[e.IDR=5]=`IDR`,e[e.SEI=6]=`SEI`,e[e.SPS=7]=`SPS`,e[e.PPS=8]=`PPS`,e[e.AUD=9]=`AUD`,e[e.SPS_EXT=13]=`SPS_EXT`})(Pc||={});var Fc;(function(e){e[e.RASL_N=8]=`RASL_N`,e[e.RASL_R=9]=`RASL_R`,e[e.BLA_W_LP=16]=`BLA_W_LP`,e[e.RSV_IRAP_VCL23=23]=`RSV_IRAP_VCL23`,e[e.VPS_NUT=32]=`VPS_NUT`,e[e.SPS_NUT=33]=`SPS_NUT`,e[e.PPS_NUT=34]=`PPS_NUT`,e[e.AUD_NUT=35]=`AUD_NUT`,e[e.PREFIX_SEI_NUT=39]=`PREFIX_SEI_NUT`,e[e.SUFFIX_SEI_NUT=40]=`SUFFIX_SEI_NUT`})(Fc||={});var Ic=function*(e){let t=0,n=-1;for(;t<e.length-2;){let r=e.indexOf(0,t);if(r===-1||r>=e.length-2)break;t=r;let i=0;if(t+3<e.length&&e[t+1]===0&&e[t+2]===0&&e[t+3]===1?i=4:e[t+1]===0&&e[t+2]===1&&(i=3),i===0){t++;continue}n!==-1&&t>n&&(yield{offset:n,length:t-n}),n=t+i,t=n}n!==-1&&n<e.length&&(yield{offset:n,length:e.length-n})},Lc=function*(e,t){let n=0,r=new DataView(e.buffer,e.byteOffset,e.byteLength);for(;n+t<=e.length;){let e;t===1?e=r.getUint8(n):t===2?e=r.getUint16(n,!1):t===3?e=ws(r,n,!1):(B(t===4),e=r.getUint32(n,!1)),n+=t,yield{offset:n,length:e},n+=e}},Rc=(e,t)=>t.description?Lc(e,(fs(t.description)[4]&3)+1):Ic(e),zc=e=>e&31,Bc=e=>{let t=[],n=e.length;for(let r=0;r<n;r++)r+2<n&&e[r]===0&&e[r+1]===0&&e[r+2]===3?(t.push(0,0),r+=2):t.push(e[r]);return new Uint8Array(t)};new Uint8Array([0,0,0,1]);var Vc=(e,t)=>{let n=e.reduce((e,n)=>e+t+n.byteLength,0),r=new Uint8Array(n),i=0;for(let n of e){let e=new DataView(r.buffer,r.byteOffset,r.byteLength);switch(t){case 1:e.setUint8(i,n.byteLength);break;case 2:e.setUint16(i,n.byteLength,!1);break;case 3:Ts(e,i,n.byteLength,!1);break;case 4:e.setUint32(i,n.byteLength,!1)}i+=t,r.set(n,i),i+=n.byteLength}return r},Hc=e=>{try{let t=[],n=[],r=[];for(let i of Ic(e)){let a=e.subarray(i.offset,i.offset+i.length),o=zc(a[0]);o===Pc.SPS?t.push(a):o===Pc.PPS?n.push(a):o===Pc.SPS_EXT&&r.push(a)}if(t.length===0||n.length===0)return null;let i=t[0],a=Gc(i);B(a!==null);let o=a.profileIdc===100||a.profileIdc===110||a.profileIdc===122||a.profileIdc===144;return{configurationVersion:1,avcProfileIndication:a.profileIdc,profileCompatibility:a.constraintFlags,avcLevelIndication:a.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:n,chromaFormat:o?a.chromaFormatIdc:null,bitDepthLumaMinus8:o?a.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?a.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?r:null}}catch(e){return Zs._error(`Error building AVC Decoder Configuration Record:`,e),null}},Uc=e=>{let t=[];t.push(e.configurationVersion),t.push(e.avcProfileIndication),t.push(e.profileCompatibility),t.push(e.avcLevelIndication),t.push(252|e.lengthSizeMinusOne&3),t.push(224|e.sequenceParameterSets.length&31);for(let n of e.sequenceParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}t.push(e.pictureParameterSets.length);for(let n of e.pictureParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}if(e.avcProfileIndication===100||e.avcProfileIndication===110||e.avcProfileIndication===122||e.avcProfileIndication===144){B(e.chromaFormat!==null),B(e.bitDepthLumaMinus8!==null),B(e.bitDepthChromaMinus8!==null),B(e.sequenceParameterSetExt!==null),t.push(252|e.chromaFormat&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.sequenceParameterSetExt.length);for(let n of e.sequenceParameterSetExt){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}}return new Uint8Array(t)},Wc={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},Gc=e=>{try{let t=new nc(Bc(e));if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;let n=t.readAlignedByte(),r=t.readAlignedByte(),i=t.readAlignedByte();V(t);let a=1,o=0,s=0,c=0;if((n===100||n===110||n===122||n===244||n===44||n===83||n===86||n===118||n===128)&&(a=V(t),a===3&&(c=t.readBits(1)),o=V(t),s=V(t),t.skipBits(1),t.readBits(1))){for(let e=0;e<(a===3?12:8);e++)if(t.readBits(1)){let n=e<6?16:64,r=8,i=8;for(let e=0;e<n;e++){if(i!==0){let e=ds(t);i=(r+e+256)%256}r=i===0?r:i}}}V(t);let l=V(t);if(l===0)V(t);else if(l===1){t.skipBits(1),ds(t),ds(t);let e=V(t);for(let n=0;n<e;n++)ds(t)}V(t),t.skipBits(1);let u=V(t),d=V(t),f=16*(u+1),p=16*(d+1),m=f,h=p,g=t.readBits(1);if(g||t.skipBits(1),t.skipBits(1),t.readBits(1)){let e=V(t),n=V(t),r=V(t),i=V(t),o,s;if((c===0?a:0)===0)o=1,s=2-g;else{let e=a===3?1:2,t=a===1?2:1;o=e,s=t*(2-g)}m-=o*(e+n),h-=s*(r+i)}let _=2,v=2,y=2,b=0,x={num:1,den:1},S=null,C=null;if(t.readBits(1)){if(t.readBits(1)){let e=t.readBits(8);if(e===255)x={num:t.readBits(16),den:t.readBits(16)};else{let t=Wc[e];t&&(x=t)}}t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),b=t.readBits(1),t.readBits(1)&&(_=t.readBits(8),v=t.readBits(8),y=t.readBits(8))),t.readBits(1)&&(V(t),V(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));let e=t.readBits(1);e&&Kc(t);let n=t.readBits(1);n&&Kc(t),(e||n)&&t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(1),V(t),V(t),V(t),V(t),S=V(t),C=V(t))}if(S===null){B(C===null);let e=r&16;if((n===44||n===86||n===100||n===110||n===122||n===244)&&e)S=0,C=0;else{let e=u+1,t=d+1,n=(2-g)*t,r=dc.find(e=>e.level>=i)??ls(dc),a=Math.min(Math.floor(r.maxDpbMbs/(e*n)),16);S=a,C=a}}return B(C!==null),{profileIdc:n,constraintFlags:r,levelIdc:i,frameMbsOnlyFlag:g,chromaFormatIdc:a,bitDepthLumaMinus8:o,bitDepthChromaMinus8:s,codedWidth:f,codedHeight:p,displayWidth:m,displayHeight:h,pixelAspectRatio:x,colourPrimaries:_,matrixCoefficients:y,transferCharacteristics:v,fullRangeFlag:b,numReorderFrames:S,maxDecFrameBuffering:C}}catch(e){return Zs._error(`Error parsing AVC SPS:`,e),null}},Kc=e=>{let t=V(e);e.skipBits(4),e.skipBits(4);for(let n=0;n<=t;n++)V(e),V(e),e.skipBits(1);e.skipBits(5),e.skipBits(5),e.skipBits(5),e.skipBits(5)},qc=(e,t)=>t.description?Lc(e,(fs(t.description)[21]&3)+1):Ic(e),Jc=e=>e>>1&63,Yc=e=>{try{let t=new nc(Bc(e));t.skipBits(16),t.readBits(4);let n=t.readBits(3),r=t.readBits(1),{general_profile_space:i,general_tier_flag:a,general_profile_idc:o,general_profile_compatibility_flags:s,general_constraint_indicator_flags:c,general_level_idc:l}=Zc(t,n);V(t);let u=V(t),d=0;u===3&&(d=t.readBits(1));let f=V(t),p=V(t),m=f,h=p;if(t.readBits(1)){let e=V(t),n=V(t),r=V(t),i=V(t),a=1,o=1,s=d===0?u:0;s===1?(a=2,o=2):s===2&&(a=2,o=1),m-=(e+n)*a,h-=(r+i)*o}let g=V(t),_=V(t);V(t);let v=t.readBits(1)?0:n,y=0;for(let e=v;e<=n;e++)V(t),y=V(t),V(t);if(V(t),V(t),V(t),V(t),V(t),V(t),t.readBits(1)&&t.readBits(1)&&Qc(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(4),t.skipBits(4),V(t),V(t),t.skipBits(1)),$c(t,V(t)),t.readBits(1)){let e=V(t);for(let n=0;n<e;n++)V(t),t.skipBits(1)}t.skipBits(1),t.skipBits(1);let b=2,x=2,S=2,C=0,w=0,T={num:1,den:1};if(t.readBits(1)){let e=tl(t,n);T=e.pixelAspectRatio,b=e.colourPrimaries,x=e.transferCharacteristics,S=e.matrixCoefficients,C=e.fullRangeFlag,w=e.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:h,pixelAspectRatio:T,colourPrimaries:b,transferCharacteristics:x,matrixCoefficients:S,fullRangeFlag:C,maxDecFrameBuffering:y+1,spsMaxSubLayersMinus1:n,spsTemporalIdNestingFlag:r,generalProfileSpace:i,generalTierFlag:a,generalProfileIdc:o,generalProfileCompatibilityFlags:s,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:_,minSpatialSegmentationIdc:w}}catch(e){return Zs._error(`Error parsing HEVC SPS:`,e),null}},Xc=e=>{try{let t=[],n=[],r=[],i=[];for(let a of Ic(e)){let o=e.subarray(a.offset,a.offset+a.length),s=Jc(o[0]);s===Fc.VPS_NUT?t.push(o):s===Fc.SPS_NUT?n.push(o):s===Fc.PPS_NUT?r.push(o):(s===Fc.PREFIX_SEI_NUT||s===Fc.SUFFIX_SEI_NUT)&&i.push(o)}if(n.length===0||r.length===0)return null;let a=Yc(n[0]);if(!a)return null;let o=0;if(r.length>0){let e=r[0],t=new nc(Bc(e));t.skipBits(16),V(t),V(t),t.skipBits(1),t.skipBits(1),t.skipBits(3),t.skipBits(1),t.skipBits(1),V(t),V(t),ds(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&V(t),ds(t),ds(t),t.skipBits(1),t.skipBits(1),t.skipBits(1),t.skipBits(1);let n=t.readBits(1),i=t.readBits(1);o=!n&&!i?0:n&&!i?2:!n&&i?3:0}let s=[...t.length?[{arrayCompleteness:1,nalUnitType:Fc.VPS_NUT,nalUnits:t}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:Fc.SPS_NUT,nalUnits:n}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:Fc.PPS_NUT,nalUnits:r}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:Jc(i[0][0]),nalUnits:i}]:[]];return{configurationVersion:1,generalProfileSpace:a.generalProfileSpace,generalTierFlag:a.generalTierFlag,generalProfileIdc:a.generalProfileIdc,generalProfileCompatibilityFlags:a.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:a.generalConstraintIndicatorFlags,generalLevelIdc:a.generalLevelIdc,minSpatialSegmentationIdc:a.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:a.chromaFormatIdc,bitDepthLumaMinus8:a.bitDepthLumaMinus8,bitDepthChromaMinus8:a.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:a.spsMaxSubLayersMinus1+1,temporalIdNested:a.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:s}}catch(e){return Zs._error(`Error building HEVC Decoder Configuration Record:`,e),null}},Zc=(e,t)=>{let n=e.readBits(2),r=e.readBits(1),i=e.readBits(5),a=0;for(let t=0;t<32;t++)a=a<<1|e.readBits(1);let o=new Uint8Array(6);for(let t=0;t<6;t++)o[t]=e.readBits(8);let s=e.readBits(8),c=[],l=[];for(let n=0;n<t;n++)c.push(e.readBits(1)),l.push(e.readBits(1));if(t>0)for(let n=t;n<8;n++)e.skipBits(2);for(let n=0;n<t;n++)c[n]&&e.skipBits(88),l[n]&&e.skipBits(8);return{general_profile_space:n,general_tier_flag:r,general_profile_idc:i,general_profile_compatibility_flags:a,general_constraint_indicator_flags:o,general_level_idc:s}},Qc=e=>{for(let t=0;t<4;t++)for(let n=0;n<(t===3?2:6);n++)if(!e.readBits(1))V(e);else{let n=Math.min(64,1<<4+(t<<1));t>1&&ds(e);for(let t=0;t<n;t++)ds(e)}},$c=(e,t)=>{let n=[];for(let r=0;r<t;r++)n[r]=el(e,r,t,n)},el=(e,t,n,r)=>{let i=0,a=0,o=0;if(t!==0&&(a=e.readBits(1)),a){o=t===n?t-(V(e)+1):t-1,e.readBits(1),V(e);let a=r[o]??0;for(let t=0;t<=a;t++)e.readBits(1)||e.readBits(1);i=r[o]}else{let t=V(e),n=V(e);for(let n=0;n<t;n++)V(e),e.readBits(1);for(let t=0;t<n;t++)V(e),e.readBits(1);i=t+n}return i},tl=(e,t)=>{let n=2,r=2,i=2,a=0,o=0,s={num:1,den:1};if(e.readBits(1)){let t=e.readBits(8);if(t===255)s={num:e.readBits(16),den:e.readBits(16)};else{let e=Wc[t];e&&(s=e)}}return e.readBits(1)&&e.readBits(1),e.readBits(1)&&(e.readBits(3),a=e.readBits(1),e.readBits(1)&&(n=e.readBits(8),r=e.readBits(8),i=e.readBits(8))),e.readBits(1)&&(V(e),V(e)),e.readBits(1),e.readBits(1),e.readBits(1),e.readBits(1)&&(V(e),V(e),V(e),V(e)),e.readBits(1)&&(e.readBits(32),e.readBits(32),e.readBits(1)&&V(e),e.readBits(1)&&nl(e,!0,t)),e.readBits(1)&&(e.readBits(1),e.readBits(1),e.readBits(1),o=V(e),V(e),V(e),V(e),V(e)),{pixelAspectRatio:s,colourPrimaries:n,transferCharacteristics:r,matrixCoefficients:i,fullRangeFlag:a,minSpatialSegmentationIdc:o}},nl=(e,t,n)=>{let r=!1,i=!1,a=!1;t&&(r=e.readBits(1)===1,i=e.readBits(1)===1,(r||i)&&(a=e.readBits(1)===1,a&&(e.readBits(8),e.readBits(5),e.readBits(1),e.readBits(5)),e.readBits(4),e.readBits(4),a&&e.readBits(4),e.readBits(5),e.readBits(5),e.readBits(5)));for(let t=0;t<=n;t++){let t=e.readBits(1)===1,n=!0;t||(n=e.readBits(1)===1);let o=!1;n?V(e):o=e.readBits(1)===1;let s=1;o||(s=V(e)+1),r&&rl(e,s,a),i&&rl(e,s,a)}},rl=(e,t,n)=>{for(let r=0;r<t;r++)V(e),V(e),n&&(V(e),V(e)),e.readBits(1)},il=e=>{let t=[];t.push(e.configurationVersion),t.push((e.generalProfileSpace&3)<<6|(e.generalTierFlag&1)<<5|e.generalProfileIdc&31),t.push(e.generalProfileCompatibilityFlags>>>24&255),t.push(e.generalProfileCompatibilityFlags>>>16&255),t.push(e.generalProfileCompatibilityFlags>>>8&255),t.push(e.generalProfileCompatibilityFlags&255),t.push(...e.generalConstraintIndicatorFlags),t.push(e.generalLevelIdc&255),t.push(240|e.minSpatialSegmentationIdc>>8&15),t.push(e.minSpatialSegmentationIdc&255),t.push(252|e.parallelismType&3),t.push(252|e.chromaFormatIdc&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.avgFrameRate>>8&255),t.push(e.avgFrameRate&255),t.push((e.constantFrameRate&3)<<6|(e.numTemporalLayers&7)<<3|(e.temporalIdNested&1)<<2|e.lengthSizeMinusOne&3),t.push(e.arrays.length&255);for(let n of e.arrays){t.push((n.arrayCompleteness&1)<<7|0|n.nalUnitType&63),t.push(n.nalUnits.length>>8&255),t.push(n.nalUnits.length&255);for(let e of n.nalUnits){t.push(e.length>>8&255),t.push(e.length&255);for(let n=0;n<e.length;n++)t.push(e[n])}}return new Uint8Array(t)},al;(function(e){e[e.audAllowed=0]=`audAllowed`,e[e.beforeFirstVcl=1]=`beforeFirstVcl`,e[e.afterFirstVcl=2]=`afterFirstVcl`,e[e.eoBitstreamAllowed=3]=`eoBitstreamAllowed`,e[e.noMoreDataAllowed=4]=`noMoreDataAllowed`})(al||={});var ol=function*(e){let t=new nc(e),n=()=>{let e=0;for(let n=0;n<8;n++){let r=t.readAlignedByte();if(e|=(r&127)<<n*7,!(r&128))break;if(n===7&&r&128)return null}return e>=2**32-1?null:e};for(;t.getBitsLeft()>=8;){t.skipBits(1);let r=t.readBits(4),i=t.readBits(1),a=t.readBits(1);t.skipBits(1),i&&t.skipBits(8);let o;if(a){let e=n();if(e===null)return;o=e}else o=Math.floor(t.getBitsLeft()/8);B(t.pos%8==0),yield{type:r,data:e.subarray(t.pos/8,t.pos/8+o)},t.skipBits(o*8)}},sl=e=>{let t=ps(e),n=t.getUint8(9),r=t.getUint16(10,!0),i=t.getUint32(12,!0),a=t.getInt16(16,!0),o=t.getUint8(18),s=null;return o&&(s=e.subarray(19,21+n)),{outputChannelCount:n,preSkip:r,inputSampleRate:i,outputGain:a,channelMappingFamily:o,channelMappingTable:s}},cl=(e,t,n)=>{switch(e){case`avc`:for(let e of Rc(n,t)){let t=n[e.offset],r=zc(t);if(r>=Pc.NON_IDR_SLICE&&r<=Pc.SLICE_DPC)return`delta`;if(r===Pc.IDR)return`key`;if(r===Pc.SEI&&(!Rs()||Bs()>=144)){let t=Bc(n.subarray(e.offset,e.offset+e.length)),r=1;do{let e=0;for(;;){let n=t[r++];if(n===void 0||(e+=n,n<255))break}let n=0;for(;;){let e=t[r++];if(e===void 0||(n+=e,e<255))break}if(e===6){let e=new nc(t);e.pos=8*r;let n=V(e),i=e.readBits(1);if(n===0&&i===1)return`key`}r+=n}while(r<t.length-1)}}return`delta`;case`hevc`:for(let e of qc(n,t)){let t=Jc(n[e.offset]);if(t<Fc.BLA_W_LP)return`delta`;if(t<=Fc.RSV_IRAP_VCL23)return`key`}return`delta`;case`vp8`:return n[0]&1?`delta`:`key`;case`vp9`:{let e=new nc(n);if(e.readBits(2)!==2)return null;let t=e.readBits(1);return(e.readBits(1)<<1)+t===3&&e.skipBits(1),e.readBits(1)?null:e.readBits(1)===0?`key`:`delta`}case`av1`:{let e=!1;for(let{type:t,data:r}of ol(n))if(t===1){let t=new nc(r);t.skipBits(4),e=!!t.readBits(1)}else if(t===3||t===6||t===7){if(e)return`key`;let t=new nc(r);return t.readBits(1)?null:t.readBits(2)===0?`key`:`delta`}return null}case`prores`:return`key`;default:Cs(e),B(!1)}},ll;(function(e){e[e.STREAMINFO=0]=`STREAMINFO`,e[e.VORBIS_COMMENT=4]=`VORBIS_COMMENT`,e[e.PICTURE=6]=`PICTURE`})(ll||={});var ul=e=>{if(e.length<7||e[0]!==11||e[1]!==119)return null;let t=new nc(e);t.skipBits(16),t.skipBits(16);let n=t.readBits(2);if(n===3)return null;let r=t.readBits(6),i=t.readBits(5);if(i>8)return null;let a=t.readBits(3),o=t.readBits(3);return o&1&&o!==1&&t.skipBits(2),o&4&&t.skipBits(2),o===2&&t.skipBits(2),{fscod:n,bsid:i,bsmod:a,acmod:o,lfeon:t.readBits(1),bitRateCode:Math.floor(r/2)}};new Uint8Array([5,4,65,67,45,51]),new Uint8Array([5,4,69,65,67,51]);var dl=[1,2,3,6],fl=e=>{if(e.length<6||e[0]!==11||e[1]!==119)return null;let t=new nc(e);t.skipBits(16);let n=t.readBits(2);if(t.skipBits(3),n!==0&&n!==2)return null;let r=t.readBits(11),i=t.readBits(2),a=0,o;i===3?(a=t.readBits(2),o=3):o=t.readBits(2);let s=t.readBits(3),c=t.readBits(1),l=t.readBits(5);if(l<11||l>16)return null;let u=dl[o],d;return d=i<3?Mc[i]/1e3:Nc[a]/1e3,{dataRate:Math.round((r+1)*d/(u*16)),substreams:[{fscod:i,fscod2:a,bsid:l,bsmod:0,acmod:s,lfeon:c,numDepSub:0,chanLoc:0}]}},pl=new Uint8Array,ml=class e{constructor(e,t,n,r,i=-1,a,o){if(this.data=e,this.type=t,this.timestamp=n,this.duration=r,this.sequenceNumber=i,e===pl&&a===void 0)throw Error(`Internal error: byteLength must be explicitly provided when constructing metadata-only packets.`);if(a===void 0&&(a=e.byteLength),!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==`key`&&t!==`delta`)throw TypeError(`type must be either "key" or "delta".`);if(!Number.isFinite(n))throw TypeError(`timestamp must be a number.`);if(!Number.isFinite(r)||r<0)throw TypeError(`duration must be a non-negative number.`);if(!Number.isFinite(i))throw TypeError(`sequenceNumber must be a number.`);if(!Number.isInteger(a)||a<0)throw TypeError(`byteLength must be a non-negative integer.`);if(o!==void 0&&(typeof o!=`object`||!o))throw TypeError(`sideData, when provided, must be an object.`);if(o?.alpha!==void 0&&!(o.alpha instanceof Uint8Array))throw TypeError(`sideData.alpha, when provided, must be a Uint8Array.`);if(o?.alphaByteLength!==void 0&&(!Number.isInteger(o.alphaByteLength)||o.alphaByteLength<0))throw TypeError(`sideData.alphaByteLength, when provided, must be a non-negative integer.`);this.byteLength=a,this.sideData=o??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===pl}get microsecondTimestamp(){return Math.trunc(Ms*this.timestamp)}get microsecondDuration(){return Math.trunc(Ms*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw TypeError(`This packet does not contain alpha side data.`);if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to an audio chunk.`);if(typeof EncodedAudioChunk>`u`)throw Error(`Your browser does not support EncodedAudioChunk.`);return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(t,n){if(!(t instanceof EncodedVideoChunk||t instanceof EncodedAudioChunk))throw TypeError(`chunk must be an EncodedVideoChunk or EncodedAudioChunk.`);let r=new Uint8Array(t.byteLength);return t.copyTo(r),new e(r,t.type,t.timestamp/1e6,(t.duration??0)/1e6,void 0,void 0,n)}clone(t){if(t!==void 0&&(typeof t!=`object`||!t))throw TypeError(`options, when provided, must be an object.`);if(t?.data!==void 0&&!(t.data instanceof Uint8Array))throw TypeError(`options.data, when provided, must be a Uint8Array.`);if(t?.type!==void 0&&t.type!==`key`&&t.type!==`delta`)throw TypeError(`options.type, when provided, must be either "key" or "delta".`);if(t?.timestamp!==void 0&&!Number.isFinite(t.timestamp))throw TypeError(`options.timestamp, when provided, must be a number.`);if(t?.duration!==void 0&&!Number.isFinite(t.duration))throw TypeError(`options.duration, when provided, must be a number.`);if(t?.sequenceNumber!==void 0&&!Number.isFinite(t.sequenceNumber))throw TypeError(`options.sequenceNumber, when provided, must be a number.`);if(t?.sideData!==void 0&&(typeof t.sideData!=`object`||t.sideData===null))throw TypeError(`options.sideData, when provided, must be an object.`);return new e(t?.data??this.data,t?.type??this.type,t?.timestamp??this.timestamp,t?.duration??this.duration,t?.sequenceNumber??this.sequenceNumber,this.byteLength,t?.sideData??this.sideData)}},hl=e=>{let t=(e.hasVideo?`video/`:e.hasAudio?`audio/`:`application/`)+(e.isQuickTime?`quicktime`:`mp4`);if(e.codecStrings.length>0){let n=[...new Set(e.codecStrings)];t+=`; codecs="${n.join(`, `)}"`}return t},gl=e=>{let t=e.filePos,n=new nc(Ql(e,9));if(n.readBits(12)!==4095||(n.skipBits(1),n.readBits(2)!==0))return null;let r=n.readBits(1),i=n.readBits(2)+1,a=n.readBits(4);if(a===15)return null;n.skipBits(1);let o=n.readBits(3);if(o===0)throw Error(`ADTS frames with channel configuration 0 are not supported.`);n.skipBits(1),n.skipBits(1),n.skipBits(1),n.skipBits(1);let s=n.readBits(13);n.skipBits(11);let c=n.readBits(2)+1;if(c!==1)throw Error(`ADTS frames with more than one AAC frame are not supported.`);let l=null;return r===1?e.filePos-=2:l=n.readBits(16),{objectType:i,samplingFrequencyIndex:a,channelConfiguration:o,frameLength:s,numberOfAacFrames:c,crcCheck:l,startPos:t}},_l=o(((e,t)=>{t.exports={}})),vl=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},yl=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r});Hs();var bl=-1/0,xl=-1/0,Sl=null;typeof FinalizationRegistry<`u`&&(Sl=new FinalizationRegistry(e=>{let t=performance.now();e.type===`video`?(t-bl>=1e3&&(Zs._error(`A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them.`),bl=t),typeof VideoFrame<`u`&&e.data instanceof VideoFrame&&e.data.close()):(t-xl>=1e3&&(Zs._error(`An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them.`),xl=t),typeof AudioData<`u`&&e.data instanceof AudioData&&e.data.close())}));var Cl=class{constructor(){this._referenceCount=0,this._lastAllocationBuffer=null}},wl=[`I420`,`I420P10`,`I420P12`,`I420A`,`I420AP10`,`I420AP12`,`I422`,`I422P10`,`I422P12`,`I422A`,`I422AP10`,`I422AP12`,`I444`,`I444P10`,`I444P12`,`I444A`,`I444AP10`,`I444AP12`,`NV12`,`RGBA`,`RGBX`,`BGRA`,`BGRX`],Tl=new Set(wl),El=class e{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180==0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180==0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(Ms*this.timestamp)}get microsecondDuration(){return Math.trunc(Ms*this.duration)}get hasAlpha(){return this.format&&this.format.includes(`A`)}constructor(t,n){if(this._closed=!1,t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer||ArrayBuffer.isView(t)){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.format===void 0||!Tl.has(n.format))throw TypeError(`init.format must be one of: `+wl.join(`, `));if(!Number.isInteger(n.codedWidth)||n.codedWidth<=0)throw TypeError(`init.codedWidth must be a positive integer.`);if(!Number.isInteger(n.codedHeight)||n.codedHeight<=0)throw TypeError(`init.codedHeight must be a positive integer.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.layout!==void 0){if(!Array.isArray(n.layout))throw TypeError(`init.layout, when provided, must be an array.`);for(let e of n.layout){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Each entry in init.layout must be an object.`);if(!Number.isInteger(e.offset)||e.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(e.stride)||e.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(n.visibleRect!==void 0&&Gs(n.visibleRect,`init.visibleRect`),n.displayWidth!==void 0&&(!Number.isInteger(n.displayWidth)||n.displayWidth<=0))throw TypeError(`init.displayWidth, when provided, must be a positive integer.`);if(n.displayHeight!==void 0&&(!Number.isInteger(n.displayHeight)||n.displayHeight<=0))throw TypeError(`init.displayHeight, when provided, must be a positive integer.`);if(n.displayWidth!==void 0!=(n.displayHeight!==void 0))throw TypeError(`init.displayWidth and init.displayHeight must be either both provided or both omitted.`);this.format=n.format,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0;let e=n.layout??Ll(n.format,n.codedWidth,n.codedHeight),r=n.colorSpace??null;r===null&&(r=this.format===`RGBA`||this.format===`RGBX`||this.format===`BGRA`||this.format===`BGRX`?{primaries:`bt709`,transfer:`iec61966-2-1`,matrix:`rgb`,fullRange:!0}:{primaries:`bt709`,transfer:`bt709`,matrix:`bt709`,fullRange:!1}),this.visibleRect={left:n.visibleRect?.left??0,top:n.visibleRect?.top??0,width:n.visibleRect?.width??n.codedWidth,height:n.visibleRect?.height??n.codedHeight},n.displayWidth===void 0?(this.squarePixelWidth=this.visibleRect.width,this.squarePixelHeight=this.visibleRect.height):(this.squarePixelWidth=this.rotation%180==0?n.displayWidth:n.displayHeight,this.squarePixelHeight=this.rotation%180==0?n.displayHeight:n.displayWidth),this._data=n._doNotCopy?fs(t):fs(t).slice(),this._layout=e,this.colorSpace=new Ml(r)}else if(typeof VideoFrame<`u`&&t instanceof VideoFrame){if(n?.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n?.timestamp!==void 0&&!Number.isFinite(n?.timestamp))throw TypeError(`init.timestamp, when provided, must be a number.`);if(n?.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);n?.visibleRect!==void 0&&Gs(n.visibleRect,`init.visibleRect`),this._data=t,this._layout=null,this.format=t.format,this.visibleRect={left:t.visibleRect?.x??0,top:t.visibleRect?.y??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},this.rotation=n?.rotation??0,this.squarePixelWidth=t.displayWidth,this.squarePixelHeight=t.displayHeight,this.timestamp=n?.timestamp??t.timestamp/1e6,this.duration=n?.duration??(t.duration??0)/1e6,this.colorSpace=new Ml(t.colorSpace)}else if(typeof HTMLImageElement<`u`&&t instanceof HTMLImageElement||typeof SVGImageElement<`u`&&t instanceof SVGImageElement||typeof ImageBitmap<`u`&&t instanceof ImageBitmap||typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement||typeof HTMLCanvasElement<`u`&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<`u`&&t instanceof OffscreenCanvas){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.visibleRect!==void 0&&Gs(n.visibleRect,`init.visibleRect`),typeof VideoFrame<`u`)return new e(new VideoFrame(t,{timestamp:Math.trunc(n.timestamp*Ms),duration:Math.trunc((n.duration??0)*Ms)||void 0,visibleRect:n.visibleRect&&{x:n.visibleRect.left,y:n.visibleRect.top,width:n.visibleRect.width,height:n.visibleRect.height}}),n);let r=0,i=0;if(`naturalWidth`in t?(r=t.naturalWidth,i=t.naturalHeight):`videoWidth`in t?(r=t.videoWidth,i=t.videoHeight):`width`in t&&(r=Number(t.width),i=Number(t.height)),!r||!i)throw TypeError(`Could not determine dimensions.`);let a=n.visibleRect??{left:0,top:0,width:r,height:i},o=new OffscreenCanvas(a.width,a.height),s=o.getContext(`2d`,{alpha:Is(),willReadFrequently:!0});if(!s)throw Error(`OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.`);s.drawImage(t,-a.left,-a.top),this._data=o,this._layout=null,this.format=`RGBX`,this.visibleRect={left:0,top:0,width:a.width,height:a.height},this.squarePixelWidth=a.width,this.squarePixelHeight=a.height,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=new Ml({matrix:`rgb`,primaries:`bt709`,transfer:`iec61966-2-1`,fullRange:!0})}else if(t instanceof Cl){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(this._data=t,t._referenceCount++,this.format=t.getFormat(),this.format!==null&&!wl.includes(this.format))throw TypeError(`getFormat() must return a VideoSamplePixelFormat or null.`);if(this.visibleRect={left:0,top:0,width:t.getCodedWidth(),height:t.getCodedHeight()},!Number.isInteger(this.visibleRect.width)||this.visibleRect.width<=0)throw TypeError(`getCodedWidth() must return a positive integer.`);if(!Number.isInteger(this.visibleRect.height)||this.visibleRect.height<=0)throw TypeError(`getCodedHeight() must return a positive integer.`);if(this.squarePixelWidth=t.getSquarePixelWidth(),!Number.isInteger(this.squarePixelWidth)||this.squarePixelWidth<=0)throw TypeError(`getSquarePixelWidth() must return a positive integer.`);if(this.squarePixelHeight=t.getSquarePixelHeight(),!Number.isInteger(this.squarePixelHeight)||this.squarePixelHeight<=0)throw TypeError(`getSquarePixelHeight() must return a positive integer.`);this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=t.getColorSpace()}else throw TypeError(`Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.`);this.encodeOptions=n?.encodeOptions??{},this.pixelAspectRatio=Ws({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),Sl?.register(this,{type:`video`,data:this._data},this)}clone(){if(this._closed)throw Error(`VideoSample is closed.`);return B(this._data!==null),this._data instanceof Cl?new e(this._data,{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):Nl(this._data)?new e(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):this._data instanceof Uint8Array?(B(this._layout),new e(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions,_doNotCopy:!0})):new e(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions})}close(){this._closed||=(Sl?.unregister(this),this._data instanceof Cl?(this._data._referenceCount--,this._data._referenceCount===0&&this._data.close()):Nl(this._data)?this._data.close():this._data=null,!0)}allocationSize(e={}){if(Il(e),this._closed)throw Error(`VideoSample is closed.`);if((e.format??this.format)==null)throw Error(`Cannot get allocation size when format is null.`);return Nl(this._data)?this._data.allocationSize(e):zl(this,e).allocationSize}async copyTo(t,n={}){if(!ys(t))throw TypeError(`destination must be an ArrayBuffer or an ArrayBuffer view.`);if(Il(n),this._closed)throw Error(`VideoSample is closed.`);if((n.format??this.format)==null)throw Error(`Cannot copy video sample data when format is null.`);if(B(this._data!==null),Nl(this._data))return this._data.copyTo(t,n);if(n.format&&![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(this.format)&&[`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(n.format)){if(this._data instanceof Cl){let r={stack:[],error:void 0,hasError:!1};try{let i=vl(r,await this._data.toRgbSample({timestamp:this.timestamp,duration:this.duration,rotation:this.rotation},n.colorSpace??`srgb`),!1);if(!(i instanceof e))throw TypeError(`toRgbSample() must return a VideoSample.`);if(![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(i.format))throw Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${i.format}' instead.`);return await i.copyTo(t,n)}catch(e){r.error=e,r.hasError=!0}finally{yl(r)}}else{if(typeof VideoFrame>`u`)throw Error(`For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.`);let e=this.toVideoFrame(),r=await e.copyTo(t,n);return e.close(),r}}let r=zl(this,n);B(this.format);let i=fs(t);if(i.byteLength<r.allocationSize)throw TypeError(`Destination buffer too small. Required: ${r.allocationSize}, Available: ${i.byteLength}`);let a=Rl(this.format),o;if(this._data instanceof Cl){let e=this._data.getDataPlanes();if(e instanceof Promise&&(e=await e),!Array.isArray(e)||e.some(e=>!(e.data instanceof Uint8Array)||!Number.isInteger(e.stride)||e.stride<0))throw TypeError(`getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.`);o=e}else if(this._data instanceof Uint8Array)B(this._layout),B(this._layout.length===a.length),o=this._layout.map((e,t)=>{let n=Math.ceil(this.codedHeight/a[t].heightDivisor);return{data:this._data.subarray(e.offset,e.offset+e.stride*n),stride:e.stride}});else{let e=this._data.getContext(`2d`);B(e),o=[{data:fs(e.getImageData(0,0,this.codedWidth,this.codedHeight).data),stride:4*this.codedWidth}]}let s=[],c=a.length;for(let e=0;e<c;e++){let t=r.computedLayouts[e],n=o[e].stride,a=o[e].data,c=t.sourceTop*n;c+=t.sourceLeftBytes;let l=t.destinationOffset,u=t.sourceWidthBytes,d={offset:l,stride:t.destinationStride};for(let e=0;e<t.sourceHeight;e++){if(c+u>a.byteLength)throw Error(`Source buffer OOB read.`);if(l+u>i.byteLength)throw Error(`Destination buffer OOB write.`);let e=a.subarray(c,c+u);i.set(e,l),c+=n,l+=t.destinationStride}s.push(d)}if(n.format!==void 0){let e=this.format.startsWith(`RGB`)!==n.format.startsWith(`RGB`),t=this.format.includes(`X`)&&n.format.includes(`A`);if(e||t)for(let n=0;n<r.allocationSize;n+=4){if(e){let e=i[n],t=i[n+2];i[n]=t,i[n+2]=e}t&&(i[n+3]=255)}}return s}toVideoFrame(){if(this._closed)throw Error(`VideoSample is closed.`);if(B(this._data!==null),this._data instanceof Cl){if(this.format===null)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.`);let e=this._data.getDataPlanes();if(e instanceof Promise)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.`);let t=e.reduce((e,t)=>e+t.data.byteLength,0),n=new Uint8Array(t),r=0,i=[];for(let t of e)n.set(t.data,r),i.push(r),r+=t.data.byteLength;return new VideoFrame(n,{format:this.format,layout:e.map((e,t)=>({offset:i[t],stride:e.stride})),codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})}return Nl(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?(B(this._layout),new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,layout:this._layout,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,n,r,i,a,o,s,c){let l=0,u=0,d=this.displayWidth,f=this.displayHeight,p=0,m=0,h=this.displayWidth,g=this.displayHeight;if(a===void 0?(p=t,m=n,r!==void 0&&(h=r,g=i)):(l=t,u=n,d=r,f=i,p=a,m=o,s===void 0?(h=d,g=f):(h=s,g=c)),!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!Number.isFinite(l))throw TypeError(`sx must be a number.`);if(!Number.isFinite(u))throw TypeError(`sy must be a number.`);if(!Number.isFinite(d)||d<0)throw TypeError(`sWidth must be a non-negative number.`);if(!Number.isFinite(f)||f<0)throw TypeError(`sHeight must be a non-negative number.`);if(!Number.isFinite(p))throw TypeError(`dx must be a number.`);if(!Number.isFinite(m))throw TypeError(`dy must be a number.`);if(!Number.isFinite(h)||h<0)throw TypeError(`dWidth must be a non-negative number.`);if(!Number.isFinite(g)||g<0)throw TypeError(`dHeight must be a non-negative number.`);if(this._closed)throw Error(`VideoSample is closed.`);({sx:l,sy:u,sWidth:d,sHeight:f}=this._rotateSourceRegion(l,u,d,f,this.rotation));let _=this.toCanvasImageSource();e.save();let v=p+h/2,y=m+g/2;e.translate(v,y),e.rotate(this.rotation*Math.PI/180);let b=this.rotation%180==0?1:h/g;e.scale(1/b,b),e.drawImage(_,l,u,d,f,-h/2,-g/2,h,g),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit must be 'fill', 'contain', or 'cover'.`);if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`options.rotation, when provided, must be 0, 90, 180, or 270.`);t.crop!==void 0&&Fl(t.crop,`options.`);let n=e.canvas.width,r=e.canvas.height,i=t.rotation??this.rotation,[a,o]=i%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=t.crop;s&&=Pl(s,a,o);let c,l,u,d,{sx:f,sy:p,sWidth:m,sHeight:h}=this._rotateSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??a,t.crop?.height??o,i);if(t.fit===`fill`)c=0,l=0,u=n,d=r;else{let[e,i]=t.crop?[t.crop.width,t.crop.height]:[a,o],s=t.fit===`contain`?Math.min(n/e,r/i):Math.max(n/e,r/i);u=e*s,d=i*s,c=(n-u)/2,l=(r-d)/2}e.save();let g=i%180==0?1:u/d;e.translate(n/2,r/2),e.rotate(i*Math.PI/180),e.scale(1/g,g),e.translate(-n/2,-r/2),e.drawImage(this.toCanvasImageSource(),f,p,m,h,c,l,u,d),e.restore()}_rotateSourceRegion(e,t,n,r,i){return i===90?[e,t,n,r]=[t,this.squarePixelHeight-e-n,r,n]:i===180?[e,t]=[this.squarePixelWidth-e-n,this.squarePixelHeight-t-r]:i===270&&([e,t,n,r]=[this.squarePixelWidth-t-r,e,r,n]),{sx:e,sy:t,sWidth:n,sHeight:r}}_drawWithFitAndMipmapping(e,t,n){let r=e.width,i=e.height,[a,o]=n.rotation%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=n.crop?n.crop.width:a,c=n.crop?n.crop.height:o,l=0;2*r<s&&2*i<c&&(l=Math.floor(Math.log2(Math.min(s/r,c/i))));let u=r*2**l,d=i*2**l,{canvas:f,context:p,isNew:m}=l>0?jl(u,d):{canvas:e,context:t,isNew:n.targetIsFresh};p.imageSmoothingQuality=`high`,n.fillBlack?(p.fillStyle=`black`,p.fillRect(0,0,u,d)):m||p.clearRect(0,0,u,d),this.drawWithFit(p,{fit:n.fit,rotation:n.rotation,crop:n.crop}),p.globalCompositeOperation=`copy`;for(let e=l;e>1;e--){let t=r*2**e,n=i*2**e;p.drawImage(f,0,0,t,n,0,0,t/2,n/2)}p.globalCompositeOperation=`source-over`,l>0&&(t.imageSmoothingQuality=`high`,t.globalCompositeOperation=`copy`,t.drawImage(f,0,0,2*r,2*i,0,0,r,i),t.globalCompositeOperation=`source-over`)}toCanvasImageSource(){if(this._closed)throw Error(`VideoSample is closed.`);if(B(this._data!==null),this._data instanceof Cl||this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}return this._data}async transform(t){if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(t.width!==void 0&&(!Number.isInteger(t.width)||t.width<=0))throw TypeError(`options.width, when provided, must be a positive integer.`);if(t.height!==void 0&&(!Number.isInteger(t.height)||t.height<=0))throw TypeError(`options.height, when provided, must be a positive integer.`);if(t.roundDimensionsTo!==void 0&&(!Number.isInteger(t.roundDimensionsTo)||t.roundDimensionsTo<=0))throw TypeError(`options.roundDimensionsTo, when provided, must be a positive integer.`);if(t.fit!==void 0&&![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit, when provided, must be one of "fill", "contain", or "cover".`);if(t.width!==void 0&&t.height!==void 0&&t.fit===void 0)throw TypeError(`When both options.width and options.height are provided, options.fit must also be provided.`);if(t.rotate!==void 0&&![0,90,180,270].includes(t.rotate))throw TypeError(`options.rotate, when provided, must be 0, 90, 180 or 270.`);if(t.crop!==void 0&&Fl(t.crop,`options.`),t.alpha!==void 0&&![`keep`,`discard`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'keep' or 'discard'.`);let n=cs(this.rotation+(t.rotate??0)),[r,i]=n%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],a=t.crop;a&&=Pl(a,r,i);let o=a?a.width:r,s=a?a.height:i,c=o/s,l,u;t.width!==void 0&&t.height===void 0?(l=t.width,u=l/c):t.width===void 0&&t.height!==void 0?(u=t.height,l=u*c):t.width!==void 0&&t.height!==void 0?(l=t.width,u=t.height):(l=o,u=s),l=Os(l,t.roundDimensionsTo??1),u=Os(u,t.roundDimensionsTo??1);let d={width:l,height:u,fit:t.fit??`fill`,rotation:n,crop:a??{left:0,top:0,width:r,height:i},alpha:t.alpha??`keep`};for(let e of Dl){let t=e(this,d);if(t instanceof Promise&&(t=await t),t!==null)return t}let{canvas:f,context:p,isNew:m}=jl(d.width,d.height);return this._drawWithFitAndMipmapping(f,p,{fit:d.fit,rotation:d.rotation,crop:d.crop,targetIsFresh:m,fillBlack:d.alpha===`discard`}),new e(f,{timestamp:this.timestamp,duration:this.duration,rotation:0})}setRotation(e){if(![0,90,180,270].includes(e))throw TypeError(`newRotation must be 0, 90, 180, or 270.`);this.rotation=e}setTimestamp(e){if(!Number.isFinite(e))throw TypeError(`newTimestamp must be a number.`);this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw TypeError(`newDuration must be a non-negative number.`);this.duration=e}setEncodeOptions(e){if(!e||typeof e!=`object`)throw TypeError(`newEncodeOptions must be an object.`);this.encodeOptions=e}[Symbol.dispose](){this.close()}},Dl=[],Ol=3,kl=[],Al=0,jl=(e,t)=>{for(let n of kl)if(n.canvas.width===e&&n.canvas.height===t)return n.age=Al++,{canvas:n.canvas,context:n.context,isNew:!1};let n;if(typeof OffscreenCanvas<`u`)n=new OffscreenCanvas(e,t);else{if(typeof window>`u`||typeof document>`u`)throw Error(`Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().`);n=document.createElement(`canvas`),n.width=e,n.height=t}let r=n.getContext(`2d`,{alpha:!0,willReadFrequently:!1});if(!r)throw Error(`The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.`);return kl.length>=Ol&&kl.splice(Us(kl,e=>e.age),1),kl.push({canvas:n,context:r,age:Al++}),{canvas:n,context:r,isNew:!0}},Ml=class{constructor(e){if(e!==void 0){if(!e||typeof e!=`object`)throw TypeError(`init.colorSpace, when provided, must be an object.`);let t=Object.keys(hs);if(e.primaries!=null&&!t.includes(e.primaries))throw TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(`, `)}.`);let n=Object.keys(gs);if(e.transfer!=null&&!n.includes(e.transfer))throw TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(`, `)}.`);let r=Object.keys(_s);if(e.matrix!=null&&!r.includes(e.matrix))throw TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(`, `)}.`);if(e.fullRange!=null&&typeof e.fullRange!=`boolean`)throw TypeError(`init.colorSpace.fullRange, when provided, must be a boolean.`)}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},Nl=e=>typeof VideoFrame<`u`&&e instanceof VideoFrame,Pl=(e,t,n)=>{let r=Math.min(e.left,t),i=Math.min(e.top,n),a=Math.min(e.width,t-r),o=Math.min(e.height,n-i);return B(a>=0),B(o>=0),{left:r,top:i,width:a,height:o}},Fl=(e,t)=>{if(!e||typeof e!=`object`)throw TypeError(t+`crop, when provided, must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(t+`crop.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(t+`crop.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(t+`crop.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(t+`crop.height must be a non-negative integer.`)},Il=e=>{if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.colorSpace!==void 0&&![`display-p3`,`srgb`].includes(e.colorSpace))throw TypeError(`options.colorSpace, when provided, must be 'display-p3' or 'srgb'.`);if(e.format!==void 0&&typeof e.format!=`string`)throw TypeError(`options.format, when provided, must be a string.`);if(e.layout!==void 0){if(!Array.isArray(e.layout))throw TypeError(`options.layout, when provided, must be an array.`);for(let t of e.layout){if(!t||typeof t!=`object`)throw TypeError(`Each entry in options.layout must be an object.`);if(!Number.isInteger(t.offset)||t.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(t.stride)||t.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(e.rect!==void 0){if(!e.rect||typeof e.rect!=`object`)throw TypeError(`options.rect, when provided, must be an object.`);if(e.rect.x!==void 0&&(!Number.isInteger(e.rect.x)||e.rect.x<0))throw TypeError(`options.rect.x, when provided, must be a non-negative integer.`);if(e.rect.y!==void 0&&(!Number.isInteger(e.rect.y)||e.rect.y<0))throw TypeError(`options.rect.y, when provided, must be a non-negative integer.`);if(e.rect.width!==void 0&&(!Number.isInteger(e.rect.width)||e.rect.width<0))throw TypeError(`options.rect.width, when provided, must be a non-negative integer.`);if(e.rect.height!==void 0&&(!Number.isInteger(e.rect.height)||e.rect.height<0))throw TypeError(`options.rect.height, when provided, must be a non-negative integer.`)}},Ll=(e,t,n)=>{let r=Rl(e),i=[],a=0;for(let e of r){let r=Math.ceil(t/e.widthDivisor),o=Math.ceil(n/e.heightDivisor),s=r*e.sampleBytes,c=s*o;i.push({offset:a,stride:s}),a+=c}return i},Rl=e=>{let t=(e,t,n,r,i)=>{let a=[{sampleBytes:e,widthDivisor:1,heightDivisor:1},{sampleBytes:t,widthDivisor:n,heightDivisor:r},{sampleBytes:t,widthDivisor:n,heightDivisor:r}];return i&&a.push({sampleBytes:e,widthDivisor:1,heightDivisor:1}),a};switch(e){case`I420`:return t(1,1,2,2,!1);case`I420P10`:case`I420P12`:return t(2,2,2,2,!1);case`I420A`:return t(1,1,2,2,!0);case`I420AP10`:case`I420AP12`:return t(2,2,2,2,!0);case`I422`:return t(1,1,2,1,!1);case`I422P10`:case`I422P12`:return t(2,2,2,1,!1);case`I422A`:return t(1,1,2,1,!0);case`I422AP10`:case`I422AP12`:return t(2,2,2,1,!0);case`I444`:return t(1,1,1,1,!1);case`I444P10`:case`I444P12`:return t(2,2,1,1,!1);case`I444A`:return t(1,1,1,1,!0);case`I444AP10`:case`I444AP12`:return t(2,2,1,1,!0);case`NV12`:return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case`RGBA`:case`RGBX`:case`BGRA`:case`BGRX`:return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:Cs(e),B(!1)}},zl=(e,t)=>{let n={left:0,top:0,width:e.codedWidth,height:e.codedHeight},r=t.rect,i=Bl(n,r,e.codedWidth,e.codedHeight,e.format),a=t.layout,o;if(!t.format||t.format===e.format)o=e.format;else if([`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(t.format))o=t.format;else throw Error(`NotSupportedError: Invalid destination format.`);return Hl(i,o,a)},Bl=(e,t,n,r,i)=>{let a={...e};if(t!==void 0){if(t.width===0||t.height===0)throw TypeError(`visibleRect dimensions cannot be zero.`);if((t.x||0)+(t.width||0)>n)throw TypeError(`visibleRect exceeds codedWidth.`);if((t.y||0)+(t.height||0)>r)throw TypeError(`visibleRect exceeds codedHeight.`);a.x=t.x||0,a.y=t.y||0,a.width=t.width||0,a.height=t.height||0}if(!Vl(i,a))throw TypeError(`visibleRect alignment is invalid for the format.`);return a},Vl=(e,t)=>{if(e===null)return!0;let n=Rl(e);for(let e=0;e<n.length;e++){let r=n[e],i=r.widthDivisor,a=r.heightDivisor;if((t.x||0)%i!==0||(t.y||0)%a!==0)return!1}return!0},Hl=(e,t,n)=>{let r=Rl(t),i=r.length;if(n!==void 0&&n.length!==i)throw TypeError(`Layout must have ${i} planes.`);let a=0,o=[],s=[];for(let t=0;t<i;t++){let i=r[t],c=i.sampleBytes,l=i.widthDivisor,u=i.heightDivisor,d={destinationOffset:0,destinationStride:0,sourceTop:0,sourceHeight:0,sourceLeftBytes:0,sourceWidthBytes:0};if(d.sourceTop=Math.ceil(Math.trunc(e.y||0)/u),d.sourceHeight=Math.ceil(Math.trunc(e.height||0)/u),d.sourceLeftBytes=Math.floor(Math.trunc(e.x||0)/l)*c,d.sourceWidthBytes=Math.floor(Math.trunc(e.width||0)/l)*c,n!==void 0){let e=n[t];if(e.stride<d.sourceWidthBytes)throw TypeError(`Stride for plane ${t} is too small.`);d.destinationOffset=e.offset,d.destinationStride=e.stride}else d.destinationOffset=a,d.destinationStride=d.sourceWidthBytes;let f=d.destinationStride*d.sourceHeight+d.destinationOffset;if(f>4294967295)throw TypeError(`Allocation size exceeds limit.`);s.push(f),a=Math.max(a,f);for(let e=0;e<t;e++){let n=o[e];if(!(s[t]<=n.destinationOffset||s[e]<=d.destinationOffset))throw TypeError(`Planes overlap.`)}o.push(d)}return{allocationSize:a,computedLayouts:o}},H=e=>{if(!e||typeof e!=`object`)throw TypeError(`Encoding config must be an object.`);if(!oc.includes(e.codec))throw TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${oc.join(`, `)}.`);let t=e.bitrate;if(e.quality===void 0&&t===void 0)throw TypeError(`config.quality must be provided.`);if(e.quality!==void 0&&t!==void 0)throw TypeError(`config.quality and config.bitrate cannot both be provided.`);if(e.quality!==void 0&&!(e.quality instanceof W))throw TypeError(`config.quality, when provided, must be a Quality.`);if(t!==void 0&&!(t instanceof W)&&(!Number.isInteger(t)||t<=0))throw TypeError(`config.bitrate, when provided, must be a positive integer or a quality.`);if(e.keyFrameInterval!==void 0&&(!Number.isFinite(e.keyFrameInterval)||e.keyFrameInterval<0))throw TypeError(`config.keyFrameInterval, when provided, must be a non-negative number.`);if(e.sizeChangeBehavior!==void 0&&![`deny`,`passThrough`,`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.`);if(e.transform!==void 0){if(typeof e.transform!=`object`||!e.transform)throw TypeError(`config.transform, when provided, must be an object.`);if(e.transform.width!==void 0&&(!Number.isInteger(e.transform.width)||e.transform.width<=0))throw TypeError(`config.transform.width, when provided, must be a positive integer.`);if(e.transform.height!==void 0&&(!Number.isInteger(e.transform.height)||e.transform.height<=0))throw TypeError(`config.transform.height, when provided, must be a positive integer.`);if(e.transform.fit!==void 0&&![`fill`,`contain`,`cover`].includes(e.transform.fit))throw TypeError(`config.transform.fit, when provided, must be one of "fill", "contain", or "cover".`);if(e.transform.width!==void 0&&e.transform.height!==void 0&&e.transform.fit===void 0&&![`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.`);if(e.transform.fit!==void 0&&[`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior)&&e.transform.fit!==e.sizeChangeBehavior)throw TypeError(`config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.`);if(e.transform.rotate!==void 0&&![0,90,180,270].includes(e.transform.rotate))throw TypeError(`config.transform.rotate, when provided, must be 0, 90, 180 or 270.`);if(e.transform.crop!==void 0&&Fl(e.transform.crop,`config.transform.`),e.transform.process!==void 0&&typeof e.transform.process!=`function`)throw TypeError(`config.transform.process, when provided, must be a function.`);if(e.transform.frameRate!==void 0&&(!Number.isFinite(e.transform.frameRate)||e.transform.frameRate<=0))throw TypeError(`config.transform.frameRate, when provided, must be a finite positive number.`);if(e.transform.force!==void 0&&typeof e.transform.force!=`boolean`)throw TypeError(`config.transform.force, when provided, must be a boolean.`)}if(e.onEncodedPacket!==void 0&&typeof e.onEncodedPacket!=`function`)throw TypeError(`config.onEncodedPacket, when provided, must be a function.`);if(e.onEncoderConfig!==void 0&&typeof e.onEncoderConfig!=`function`)throw TypeError(`config.onEncoderConfig, when provided, must be a function.`);if(e.onEncodedSample!==void 0&&typeof e.onEncodedSample!=`function`)throw TypeError(`config.onEncodedSample, when provided, must be a function.`);Ul(e.codec,e)},Ul=(e,t)=>{if(!t||typeof t!=`object`)throw TypeError(`Encoding options must be an object.`);if(t.alpha!==void 0&&![`discard`,`keep`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'discard' or 'keep'.`);let n=t.bitrateMode;if(n!==void 0&&![`constant`,`variable`].includes(n))throw TypeError(`bitrateMode, when provided, must be 'constant' or 'variable'.`);if(t.latencyMode!==void 0&&![`quality`,`realtime`].includes(t.latencyMode))throw TypeError(`latencyMode, when provided, must be 'quality' or 'realtime'.`);if(t.fullCodecString!==void 0&&typeof t.fullCodecString!=`string`)throw TypeError(`fullCodecString, when provided, must be a string.`);if(t.fullCodecString!==void 0&&xc(t.fullCodecString)!==e)throw TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${e}).`);if(t.hardwareAcceleration!==void 0&&![`no-preference`,`prefer-hardware`,`prefer-software`].includes(t.hardwareAcceleration))throw TypeError(`hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.`);if(t.scalabilityMode!==void 0&&typeof t.scalabilityMode!=`string`)throw TypeError(`scalabilityMode, when provided, must be a string.`);if(t.contentHint!==void 0&&typeof t.contentHint!=`string`)throw TypeError(`contentHint, when provided, must be a string.`)},U=e=>{let t=e.bitrateMode,n=e.quality._toVideoRateControl(e.codec,e.width,e.height,t),r=(t,n,r)=>({codec:e.fullCodecString??_c(e.codec,e.width,e.height,r,e.alpha===`keep`),width:e.width,height:e.height,displayWidth:e.squarePixelWidth,displayHeight:e.squarePixelHeight,bitrate:t,bitrateMode:n,alpha:e.alpha??`discard`,framerate:e.framerate,latencyMode:e.latencyMode,hardwareAcceleration:e.hardwareAcceleration,scalabilityMode:e.scalabilityMode,contentHint:e.contentHint,...Sc(e.codec)}),i=[];return n.quantizer!==null&&i.push({config:r(void 0,`quantizer`,n.bitrate),quantizer:n.quantizer}),n.bitrateMode!==`quantizer`&&i.push({config:r(n.bitrate,n.bitrateMode,n.bitrate),quantizer:null}),B(i.length>0),i},W=class{constructor(e){if((typeof e==`number`||typeof e==`string`)&&(e={quality:e}),!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.bitrateMode!==void 0&&![`constant`,`variable`].includes(e.bitrateMode))throw TypeError(`options.bitrateMode, when provided, must be 'constant' or 'variable'.`);if(`quality`in e){if(typeof e.quality==`string`?!(e.quality in G):typeof e.quality!=`number`||Number.isNaN(e.quality))throw TypeError(`options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.`);if(e.preferBitrate!==void 0&&typeof e.preferBitrate!=`boolean`)throw TypeError(`options.preferBitrate, when provided, must be a boolean.`);if(`bitrate`in e||`quantizer`in e)throw TypeError(`options.quality cannot be combined with options.bitrate or options.quantizer.`);this._quality=typeof e.quality==`string`?G[e.quality]:e.quality,this._preferBitrate=e.preferBitrate??!1,this._bitrate=void 0,this._quantizer=void 0}else{if(e.bitrate!==void 0&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw TypeError(`options.bitrate, when provided, must be a positive integer.`);if(e.quantizer!==void 0&&(!Number.isInteger(e.quantizer)||e.quantizer<0))throw TypeError(`options.quantizer, when provided, must be a non-negative integer.`);if(e.bitrate===void 0&&e.quantizer===void 0)throw TypeError(`At least one of options.bitrate or options.quantizer must be set.`);if(`preferBitrate`in e)throw TypeError(`options.preferBitrate can only be combined with options.quality.`);this._quality=void 0,this._preferBitrate=!1,this._bitrate=e.bitrate,this._quantizer=e.quantizer}this._bitrateMode=e.bitrateMode}_toVideoRateControl(e,t,n,r){let i=Wl[e],a=null,o=this._bitrateMode??r??`variable`;if(this._quantizer!==void 0){if(!i){if(this._bitrate===void 0)throw Error(`Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`)}else if(this._quantizer<i.min||this._quantizer>i.max){if(this._bitrate===void 0)throw Error(`Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${i.min} and ${i.max}.`)}else a=this._quantizer,this._bitrate===void 0&&(o=`quantizer`)}else this._bitrate===void 0&&i&&!this._preferBitrate&&(B(this._quality!==void 0),a=Es(Math.round(Ds(i.worst,i.best,this._quality)),i.min,i.max));let s;if(this._bitrate!==void 0)s=this._bitrate;else{let r=this._quality;r===void 0&&(B(a!==null&&i),r=Es((a-i.worst)/(i.best-i.worst),0,1)),s=Kl(e,t,n,Gl(r))}return{quantizer:a,bitrate:s,bitrateMode:o}}_toVideoBitrate(e,t,n){return this._bitrate===void 0?(B(this._quality!==void 0),Kl(e,t,n,Gl(this._quality))):this._bitrate}_toAudioBitrate(e){if(sc.includes(e)||e===`flac`)return;if(this._bitrate!==void 0)return this._bitrate;if(this._quality===void 0)throw Error(`This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.`);let t=Gl(this._quality),n={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3}[e];if(!n)throw Error(`Unhandled codec: ${e}`);let r=n*t;return e===`aac`?r=[96e3,128e3,16e4,192e3].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e):e===`opus`||e===`vorbis`?r=Math.max(6e3,r):e===`mp3`&&(r=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e)),Math.round(r/1e3)*1e3}},G={"very-low":0,low:.25,medium:.5,high:.75,"very-high":1},Wl={avc:{min:0,max:51,worst:41,best:16},hevc:{min:0,max:51,worst:41,best:16},vp9:{min:0,max:63,worst:52,best:20},av1:{min:0,max:255,worst:208,best:80}},Gl=e=>.3*Math.exp(2.5538*e),Kl=(e,t,n,r)=>{let i=t*n,a=3e6,o=a*(i/2073600)**.95*{avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2,prores:22e7/a}[e]*r;return Math.ceil(o/1e3)*1e3},ql=(e,t)=>{if(e===`avc`)return{avc:{quantizer:t}};if(e===`hevc`)return{hevc:{quantizer:t}};if(e===`vp9`)return{vp9:{quantizer:t}};if(e===`av1`)return{av1:{quantizer:t}};B(!1)},Jl=(e,t)=>{if(e!==void 0)return e;if(t!==void 0)return t instanceof W?t:new W({bitrate:t})},Yl=[],Xl=class e{constructor(e,t,n,r,i){this.bytes=e,this.view=t,this.offset=n,this.start=r,this.end=i,this.bufferPos=r-n}static tempFromBytes(t){return new e(t,ps(t),0,0,t.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(t,n=this.end-t){if(t<this.start||t+n>this.end)throw RangeError(`Slicing outside of original slice.`);return new e(this.bytes,this.view,this.offset,t,t+n)}},Zl=(e,t)=>{if(e.filePos<e.start||e.filePos+t>e.end)throw RangeError(`Tried reading [${e.filePos}, ${e.filePos+t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`)},Ql=(e,t)=>{Zl(e,t);let n=e.bytes.subarray(e.bufferPos,e.bufferPos+t);return e.bufferPos+=t,n},$l=class{constructor(e){this.mutex=new bs,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateTimestamp(e,t,n){if(t<0)throw Error(`Timestamps must be non-negative (got ${t}s).`);let r=this.trackTimestampInfo.get(e);if(r){if(n&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!n)throw Error(`First packet must be a key packet.`);r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}}},eu=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,tu=e=>{let t=Math.floor(e/36e5),n=Math.floor(e%36e5/6e4),r=Math.floor(e%6e4/1e3),i=e%1e3;return t.toString().padStart(2,`0`)+`:`+n.toString().padStart(2,`0`)+`:`+r.toString().padStart(2,`0`)+`.`+i.toString().padStart(3,`0`)},nu=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8==7&&this.writer.write(this.helper);e.length%8!=0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let t of e.children)t&&this.writeBox(t);let n=this.writer.getPos(),r=e.size??n-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);B(t!==void 0);let n=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(n)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}},K=new Uint8Array(8),ru=new DataView(K.buffer),iu=e=>[(e%256+256)%256],q=e=>(ru.setUint16(0,e,!1),[K[0],K[1]]),au=e=>(ru.setInt16(0,e,!1),[K[0],K[1]]),ou=e=>(ru.setUint32(0,e,!1),[K[1],K[2],K[3]]),J=e=>(ru.setUint32(0,e,!1),[K[0],K[1],K[2],K[3]]),su=e=>(ru.setInt32(0,e,!1),[K[0],K[1],K[2],K[3]]),cu=e=>(ru.setUint32(0,Math.floor(e/2**32),!1),ru.setUint32(4,e,!1),[K[0],K[1],K[2],K[3],K[4],K[5],K[6],K[7]]),lu=e=>(ru.setInt32(0,Math.floor(e/2**32),!1),ru.setUint32(4,e,!1),[K[0],K[1],K[2],K[3],K[4],K[5],K[6],K[7]]),uu=e=>(ru.setInt16(0,256*e,!1),[K[0],K[1]]),du=e=>(ru.setInt32(0,2**16*e,!1),[K[0],K[1],K[2],K[3]]),fu=e=>(ru.setInt32(0,2**30*e,!1),[K[0],K[1],K[2],K[3]]),pu=(e,t)=>{let n=[],r=e;do{let e=r&127;r>>=7,n.length>0&&(e|=128),n.push(e),t!==void 0&&t--}while(r>0||t);return n.reverse()},Y=(e,t=!1)=>{let n=Array(e.length).fill(null).map((t,n)=>e.charCodeAt(n));return t&&n.push(0),n},mu=e=>{let t=Math.PI/180*e,n=Math.round(Math.cos(t)),r=Math.round(Math.sin(t));return[n,r,0,-r,n,0,0,0,1]},hu=mu(0),gu=e=>[du(e[0]),du(e[1]),fu(e[2]),du(e[3]),du(e[4]),fu(e[5]),du(e[6]),du(e[7]),fu(e[8])],X=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),Z=(e,t,n,r,i)=>X(e,[iu(t),ou(n),r??[]],i),_u=e=>e.isQuickTime?X(`ftyp`,[Y(`qt  `),J(512),Y(`qt  `)]):e.fragmented?e.cmaf?X(`ftyp`,[Y(`iso5`),J(512),Y(`iso5`),Y(`iso6`),Y(`mp41`),Y(`cmfc`),Y(`dash`)]):X(`ftyp`,[Y(`iso5`),J(512),Y(`iso5`),Y(`iso6`),Y(`mp41`)]):X(`ftyp`,[Y(`isom`),J(512),Y(`isom`),e.holdsAvc?Y(`avc1`):[],Y(`mp41`)]),vu=()=>X(`styp`,[Y(`iso5`),J(0),Y(`iso5`),Y(`iso6`),Y(`mp41`),Y(`cmfc`),Y(`dash`)]),yu=(e,t)=>{let n=e.maxWrittenEndTimestamp-e.minWrittenTimestamp;return Number.isFinite(n)||(n=0),Z(`sidx`,1,0,[J(1),J(qd),cu(Xd(e.minWrittenTimestamp,qd)),cu(0),q(0),q(1),J(t&2147483647),J(Xd(n,qd)),J(0)])},bu=e=>({type:`mdat`,largeSize:e}),xu=e=>({type:`free`,size:e}),Su=e=>X(`moov`,void 0,[Cu(e.creationTime,e.trackDatas),...e.trackDatas.map(t=>Tu(t,e.creationTime)),e.isFragmented?fd(e.trackDatas):null,Ed(e)]),Cu=(e,t)=>{let n=Math.max(0,...t.map(e=>Xd(wu(e),qd)+Xd(e.startTimestampOffset??0,qd))),r=Math.max(0,...t.map(e=>e.track.id))+1,i=!us(e)||!us(n),a=i?cu:J;return Z(`mvhd`,+i,0,[a(e),a(e),J(qd),a(n),du(1),uu(1),Array(10).fill(0),gu(hu),Array(24).fill(0),J(r)])},wu=e=>{if(e.samples.length===0)return 0;let t=1/0,n=-1/0;for(let r=0;r<e.samples.length;r++){let i=e.samples[r];i.timestamp<t&&(t=i.timestamp),i.timestamp+i.duration>n&&(n=i.timestamp+i.duration)}return t===1/0?0:n-t},Tu=(e,t)=>{let n=Yd(e),r=e.startTimestampOffset!==null&&e.startTimestampOffset>0;return X(`trak`,void 0,[Eu(e,t),r?Du(e,e.startTimestampOffset):null,Ou(e,t),n.name===void 0?null:X(`udta`,void 0,[X(`name`,[...ms.encode(n.name)])])])},Eu=(e,t)=>{let n=Xd(wu(e),qd)+Xd(e.startTimestampOffset??0,qd),r=!us(t)||!us(n),i=r?cu:J,a;if(e.type===`video`){let t=e.track.metadata.rotation;a=mu(t??0)}else a=hu;let o=2;e.track.metadata.disposition?.default!==!1&&(o|=1);let s=e.type===`video`?0:e.type===`audio`?1:e.type===`subtitle`?2:Cs(e);return Z(`tkhd`,+r,o,[i(t),i(t),J(e.track.id),J(0),i(n),Array(8).fill(0),q(0),q(s),uu(+(e.type===`audio`)),q(0),gu(a),du(e.type===`video`?e.info.width:0),du(e.type===`video`?e.info.height:0)])},Du=(e,t)=>{let n=Xd(t,qd),r=Xd(wu(e),qd),i=!us(n)||!us(r),a=i?cu:J,o=i?lu:su;return X(`edts`,void 0,[Z(`elst`,+!!i,0,[J(2),a(n),o(-1),du(1),a(r),o(0),du(1)])])},Ou=(e,t)=>X(`mdia`,void 0,[ku(e,t),Mu(!0,Au[e.type],ju[e.type]),Nu(e)]),ku=(e,t)=>{let n=Xd(wu(e),e.timescale),r=!us(t)||!us(n),i=r?cu:J;return Z(`mdhd`,+r,0,[i(t),i(t),J(e.timescale),i(n),q(zd(e.track.metadata.languageCode??`und`)),q(0)])},Au={video:`vide`,audio:`soun`,subtitle:`text`},ju={video:`MediabunnyVideoHandler`,audio:`MediabunnySoundHandler`,subtitle:`MediabunnyTextHandler`},Mu=(e,t,n,r=`\0\0\0\0`)=>Z(`hdlr`,0,0,[e?Y(`mhlr`):J(0),Y(t),Y(r),J(0),J(0),Y(n,!0)]),Nu=e=>X(`minf`,void 0,[Pu[e.type](),Fu(),Ru(e)]),Pu={video:()=>Z(`vmhd`,0,1,[q(0),q(0),q(0),q(0)]),audio:()=>Z(`smhd`,0,0,[q(0),q(0)]),subtitle:()=>Z(`nmhd`,0,0)},Fu=()=>X(`dinf`,void 0,[Iu()]),Iu=()=>Z(`dref`,0,0,[J(1)],[Lu()]),Lu=()=>Z(`url `,0,1),Ru=e=>{let t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(e=>e.sampleCompositionTimeOffset!==0);return X(`stbl`,void 0,[zu(e),ad(e),t?ud(e):null,t?dd(e):null,sd(e),cd(e),ld(e),od(e)])},zu=e=>{let t;if(e.type===`video`)t=Bu(Nd(e.track.source._codec,e.info.decoderConfig.codec),e);else if(e.type===`audio`){let n=Fd(e.track.source._codec,e.muxer.isQuickTime);B(n),t=qu(n,e)}else e.type===`subtitle`&&(t=rd(Ld[e.track.source._codec],e));return B(t),Z(`stsd`,0,0,[J(1)],[t])},Bu=(e,t)=>X(e,[[,,,,,,].fill(0),q(1),q(0),q(0),Array(12).fill(0),q(t.info.width),q(t.info.height),J(4718592),J(4718592),J(0),q(1),iu(10),Y(`Mediabunny`),Array(21).fill(0),q(t.info.hasAlphaChannel?32:24),au(65535)],[Pd[t.track.source._codec]?.(t)??null,Vu(t),vs(t.info.decoderConfig.colorSpace)?Hu(t):null]),Vu=e=>e.info.pixelAspectRatio.num===e.info.pixelAspectRatio.den?null:X(`pasp`,[J(e.info.pixelAspectRatio.num),J(e.info.pixelAspectRatio.den)]),Hu=e=>X(`colr`,[Y(e.muxer.isQuickTime?`nclc`:`nclx`),q(hs[e.info.decoderConfig.colorSpace.primaries]),q(gs[e.info.decoderConfig.colorSpace.transfer]),q(_s[e.info.decoderConfig.colorSpace.matrix]),e.muxer.isQuickTime?[]:iu(!!e.info.decoderConfig.colorSpace.fullRange<<7)]),Uu=e=>e.info.decoderConfig&&X(`avcC`,[...fs(e.info.decoderConfig.description)]),Wu=e=>e.info.decoderConfig&&X(`hvcC`,[...fs(e.info.decoderConfig.description)]),Gu=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig,n=t.codec.split(`.`),r=Number(n[1]),i=Number(n[2]),a=Number(n[3]),o=n[4]?Number(n[4]):1,s=n[8]?Number(n[8]):Number(t.colorSpace?.fullRange??0),c=(a<<4)+(o<<1)+s,l=n[5]?Number(n[5]):t.colorSpace?.primaries?hs[t.colorSpace.primaries]:2,u=n[6]?Number(n[6]):t.colorSpace?.transfer?gs[t.colorSpace.transfer]:2,d=n[7]?Number(n[7]):t.colorSpace?.matrix?_s[t.colorSpace.matrix]:2;return Z(`vpcC`,1,0,[iu(r),iu(i),iu(c),iu(l),iu(u),iu(d),q(0)])},Ku=e=>X(`av1C`,vc(e.info.decoderConfig.codec)),qu=(e,t)=>{let n=0,r,i=16,a=sc.includes(t.track.source._codec);if(a){let e=t.track.source._codec,{sampleSize:r}=bc(e);i=8*r,i>16&&(n=1)}if(t.muxer.isQuickTime&&(n=1),n===0)r=[[,,,,,,].fill(0),q(1),q(n),q(0),J(0),q(t.info.numberOfChannels),q(i),q(0),q(0),q(t.info.sampleRate<2**16?t.info.sampleRate:0),q(0)];else{let e=a?0:-2;r=[[,,,,,,].fill(0),q(1),q(n),q(0),J(0),q(t.info.numberOfChannels),q(Math.min(i,16)),au(e),q(0),q(t.info.sampleRate<2**16?t.info.sampleRate:0),q(0),a?[J(1),J(i/8),J(t.info.numberOfChannels*i/8)]:[J(0),J(0),J(0)],J(2)]}return X(e,r,[Id(t.track.source._codec,t.muxer.isQuickTime)?.(t)??null])},Ju=e=>{let t;switch(e.track.source._codec){case`aac`:t=64;break;case`mp3`:t=107;break;case`vorbis`:t=221;break;default:throw Error(`Unhandled audio codec: ${e.track.source._codec}`)}let n=[...iu(t),...iu(21),...ou(0),...J(0),...J(0)];if(e.info.decoderConfig.description){let t=fs(e.info.decoderConfig.description);n=[...n,...iu(5),...pu(t.byteLength),...t]}return n=[...q(1),...iu(0),...iu(4),...pu(n.length),...n,...iu(6),...iu(1),...iu(2)],n=[...iu(3),...pu(n.length),...n],Z(`esds`,0,0,n)},Yu=e=>X(`wave`,void 0,[Xu(e),Zu(e),X(`\0\0\0\0`)]),Xu=e=>X(`frma`,[Y(Fd(e.track.source._codec,e.muxer.isQuickTime))]),Zu=e=>{let{littleEndian:t}=bc(e.track.source._codec);return X(`enda`,[q(+t)])},Qu=e=>{let t=e.info.numberOfChannels,n=3840,r=e.info.sampleRate,i=0,a=0,o=new Uint8Array,s=e.info.decoderConfig?.description;if(s){B(s.byteLength>=18);let e=sl(fs(s));t=e.outputChannelCount,n=e.preSkip,r=e.inputSampleRate,i=e.outputGain,a=e.channelMappingFamily,e.channelMappingTable&&(o=e.channelMappingTable)}return X(`dOps`,[iu(0),iu(t),q(n),J(r),au(i),iu(a),...o])},$u=e=>{let t=e.info.decoderConfig?.description;return B(t),Z(`dfLa`,0,0,[...fs(t).subarray(4)])},ed=e=>{let{littleEndian:t,sampleSize:n}=bc(e.track.source._codec);return Z(`pcmC`,0,0,[iu(+t),iu(8*n)])},td=e=>{B(e.info.primingPacket);let t=ul(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=new Uint8Array(3),r=new nc(n);return r.writeBits(2,t.fscod),r.writeBits(5,t.bsid),r.writeBits(3,t.bsmod),r.writeBits(3,t.acmod),r.writeBits(1,t.lfeon),r.writeBits(5,t.bitRateCode),r.writeBits(5,0),X(`dac3`,[...n])},nd=e=>{B(e.info.primingPacket);let t=fl(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=16;for(let e of t.substreams)n+=23,e.numDepSub>0?n+=9:n+=1;let r=Math.ceil(n/8),i=new Uint8Array(r),a=new nc(i);a.writeBits(13,t.dataRate),a.writeBits(3,t.substreams.length-1);for(let e of t.substreams)a.writeBits(2,e.fscod),a.writeBits(5,e.bsid),a.writeBits(1,0),a.writeBits(1,0),a.writeBits(3,e.bsmod),a.writeBits(3,e.acmod),a.writeBits(1,e.lfeon),a.writeBits(3,0),a.writeBits(4,e.numDepSub),e.numDepSub>0?a.writeBits(9,e.chanLoc):a.writeBits(1,0);return X(`dec3`,[...i])},rd=(e,t)=>X(e,[[,,,,,,].fill(0),q(1)],[Rd[t.track.source._codec](t)]),id=e=>X(`vttC`,[...ms.encode(e.info.config.description)]),ad=e=>Z(`stts`,0,0,[J(e.timeToSampleTable.length),e.timeToSampleTable.map(e=>[J(e.sampleCount),J(e.sampleDelta)])]),od=e=>{if(e.samples.every(e=>e.type===`key`))return null;let t=[...e.samples.entries()].filter(([,e])=>e.type===`key`);return Z(`stss`,0,0,[J(t.length),t.map(([e])=>J(e+1))])},sd=e=>Z(`stsc`,0,0,[J(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(e=>[J(e.firstChunk),J(e.samplesPerChunk),J(1)])]),cd=e=>{if(e.type===`audio`&&e.info.requiresPcmTransformation){let{sampleSize:t}=bc(e.track.source._codec);return Z(`stsz`,0,0,[J(t*e.info.numberOfChannels),J(e.samples.reduce((t,n)=>t+Xd(n.duration,e.timescale),0))])}return Z(`stsz`,0,0,[J(0),J(e.samples.length),e.samples.map(e=>J(e.size))])},ld=e=>e.finalizedChunks.length>0&&ls(e.finalizedChunks).offset>=2**32?Z(`co64`,0,0,[J(e.finalizedChunks.length),e.finalizedChunks.map(e=>cu(e.offset))]):Z(`stco`,0,0,[J(e.finalizedChunks.length),e.finalizedChunks.map(e=>J(e.offset))]),ud=e=>Z(`ctts`,1,0,[J(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(e=>[J(e.sampleCount),su(e.sampleCompositionTimeOffset)])]),dd=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;B(e.compositionTimeOffsetTable.length>0),B(e.samples.length>0);for(let r=0;r<e.compositionTimeOffsetTable.length;r++){let i=e.compositionTimeOffsetTable[r];t=Math.min(t,i.sampleCompositionTimeOffset),n=Math.max(n,i.sampleCompositionTimeOffset)}for(let t=0;t<e.samples.length;t++){let n=e.samples[t];r=Math.min(r,Xd(n.timestamp,e.timescale)),i=Math.max(i,Xd(n.timestamp+n.duration,e.timescale))}let a=Math.max(-t,0);return i>=2**31?null:Z(`cslg`,0,0,[su(a),su(t),su(n),su(r),su(i)])},fd=e=>X(`mvex`,void 0,e.map(pd)),pd=e=>Z(`trex`,0,0,[J(e.track.id),J(1),J(0),J(0),J(0)]),md=(e,t)=>X(`moof`,void 0,[hd(e),...t.map(_d)]),hd=e=>Z(`mfhd`,0,0,[J(e)]),gd=e=>{let t=0,n=0,r=e.type===`delta`;return n|=+r,t|=r?1:2,t<<24|n<<16|0},_d=e=>X(`traf`,void 0,[vd(e),yd(e),Q(e)]),vd=e=>{B(e.currentChunk);let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],r={duration:n.timescaleUnitsToNextSample,size:n.size,flags:gd(n)};return Z(`tfhd`,0,t,[J(e.track.id),J(r.duration),J(r.size),J(r.flags)])},yd=e=>(B(e.currentChunk),Z(`tfdt`,1,0,[cu(Xd(e.currentChunk.startTimestamp,e.timescale))])),Q=e=>{B(e.currentChunk);let t=e.currentChunk.samples.map(e=>e.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(e=>e.size),r=e.currentChunk.samples.map(gd),i=e.currentChunk.samples.map(t=>Xd(t.timestamp-t.decodeTimestamp,e.timescale)),a=new Set(t),o=new Set(n),s=new Set(r),c=new Set(i),l=s.size===2&&r[0]!==r[1],u=a.size>1,d=o.size>1,f=!l&&s.size>1,p=c.size>1||[...c].some(e=>e!==0),m=0;return m|=1,m|=4*l,m|=256*u,m|=512*d,m|=1024*f,m|=2048*p,Z(`trun`,1,m,[J(e.currentChunk.samples.length),J(e.currentChunk.offset-e.currentChunk.moofOffset||0),l?J(r[0]):[],e.currentChunk.samples.map((e,a)=>[u?J(t[a]):[],d?J(n[a]):[],f?J(r[a]):[],p?su(i[a]):[]])])},bd=e=>X(`mfra`,void 0,[...e.map(xd),Sd()]),xd=e=>Z(`tfra`,1,0,[J(e.track.id),J(63),J(e.finalizedChunks.length),e.finalizedChunks.map(t=>[cu(Xd(t.samples[0].timestamp,e.timescale)),cu(t.moofOffset),J(t.trafIndex+1),J(1),J(1)])]),Sd=()=>Z(`mfro`,0,0,[J(0)]),Cd=()=>X(`vtte`),wd=(e,t,n,r,i)=>X(`vttc`,void 0,[i===null?null:X(`vsid`,[su(i)]),n===null?null:X(`iden`,[...ms.encode(n)]),t===null?null:X(`ctim`,[...ms.encode(tu(t))]),r===null?null:X(`sttg`,[...ms.encode(r)]),X(`payl`,[...ms.encode(e)])]),Td=e=>X(`vtta`,[...ms.encode(e)]),Ed=e=>{let t=[],n=e.format._options.metadataFormat??`auto`,r=e.output._metadataTags;if(n===`mdir`||n===`auto`&&!e.isQuickTime){let e=jd(r);e&&t.push(e)}else if(n===`mdta`){let e=Md(r);e&&t.push(e)}else(n===`udta`||n===`auto`&&e.isQuickTime)&&Dd(t,e.output._metadataTags);return t.length===0?null:X(`udta`,void 0,t)},Dd=(e,t)=>{for(let{key:n,value:r}of Vs(t))switch(n){case`title`:e.push(Od(`©nam`,r));break;case`description`:e.push(Od(`©des`,r));break;case`artist`:e.push(Od(`©ART`,r));break;case`album`:e.push(Od(`©alb`,r));break;case`albumArtist`:e.push(Od(`albr`,r));break;case`genre`:e.push(Od(`©gen`,r));break;case`date`:e.push(Od(`©day`,r.toISOString().slice(0,10)));break;case`comment`:e.push(Od(`©cmt`,r));break;case`lyrics`:e.push(Od(`©lyr`,r));break;case`raw`:break;case`discNumber`:case`discsTotal`:case`trackNumber`:case`tracksTotal`:case`images`:break;default:Cs(n)}if(t.raw)for(let n in t.raw){let r=t.raw[n];r==null||n.length!==4||e.some(e=>e.type===n)||(typeof r==`string`?e.push(Od(n,r)):r instanceof Uint8Array&&e.push(X(n,Array.from(r))))}},Od=(e,t)=>{let n=ms.encode(t);return X(e,[q(n.length),q(zd(`und`)),Array.from(n)])},kd={"image/jpeg":13,"image/png":14,"image/bmp":27},Ad=(e,t)=>{let n=[];for(let{key:r,value:i}of Vs(e))switch(r){case`title`:n.push({key:t?`title`:`©nam`,value:$(i)});break;case`description`:n.push({key:t?`description`:`©des`,value:$(i)});break;case`artist`:n.push({key:t?`artist`:`©ART`,value:$(i)});break;case`album`:n.push({key:t?`album`:`©alb`,value:$(i)});break;case`albumArtist`:n.push({key:t?`album_artist`:`aART`,value:$(i)});break;case`comment`:n.push({key:t?`comment`:`©cmt`,value:$(i)});break;case`genre`:n.push({key:t?`genre`:`©gen`,value:$(i)});break;case`lyrics`:n.push({key:t?`lyrics`:`©lyr`,value:$(i)});break;case`date`:n.push({key:t?`date`:`©day`,value:$(i.toISOString().slice(0,10))});break;case`images`:for(let e of i)e.kind===`coverFront`&&n.push({key:`covr`,value:X(`data`,[J(kd[e.mimeType]??0),J(0),Array.from(e.data)])});break;case`trackNumber`:if(t){let t=e.tracksTotal===void 0?i.toString():`${i}/${e.tracksTotal}`;n.push({key:`track`,value:$(t)})}else n.push({key:`trkn`,value:X(`data`,[J(0),J(0),q(0),q(i),q(e.tracksTotal??0),q(0)])});break;case`discNumber`:t||n.push({key:`disc`,value:X(`data`,[J(0),J(0),q(0),q(i),q(e.discsTotal??0),q(0)])});break;case`tracksTotal`:case`discsTotal`:break;case`raw`:break;default:Cs(r)}if(e.raw)for(let r in e.raw){let i=e.raw[r];i==null||!t&&r.length!==4||n.some(e=>e.key===r)||(typeof i==`string`?n.push({key:r,value:$(i)}):i instanceof Uint8Array?n.push({key:r,value:X(`data`,[J(0),J(0),Array.from(i)])}):i instanceof Qs&&n.push({key:r,value:X(`data`,[J(kd[i.mimeType]??0),J(0),Array.from(i.data)])}))}return n},jd=e=>{let t=Ad(e,!1);return t.length===0?null:Z(`meta`,0,0,void 0,[Mu(!1,`mdir`,``,`appl`),X(`ilst`,void 0,t.map(e=>X(e.key,void 0,[e.value])))])},Md=e=>{let t=Ad(e,!0);return t.length===0?null:X(`meta`,void 0,[Mu(!1,`mdta`,``),Z(`keys`,0,0,[J(t.length)],t.map(e=>X(`mdta`,[...ms.encode(e.key)]))),X(`ilst`,void 0,t.map((e,t)=>X(String.fromCharCode(...J(t+1)),void 0,[e.value])))])},$=e=>X(`data`,[J(1),J(0),...ms.encode(e)]),Nd=(e,t)=>{switch(e){case`avc`:return t.startsWith(`avc3`)?`avc3`:`avc1`;case`hevc`:return`hvc1`;case`vp8`:return`vp08`;case`vp9`:return`vp09`;case`av1`:return`av01`;case`prores`:return t}},Pd={avc:Uu,hevc:Wu,vp8:Gu,vp9:Gu,av1:Ku,prores:null},Fd=(e,t)=>{switch(e){case`aac`:return`mp4a`;case`mp3`:return`mp4a`;case`opus`:return`Opus`;case`vorbis`:return`mp4a`;case`flac`:return`fLaC`;case`ulaw`:return`ulaw`;case`alaw`:return`alaw`;case`pcm-u8`:return`raw `;case`pcm-s8`:return`sowt`;case`ac3`:return`ac-3`;case`eac3`:return`ec-3`}if(t)switch(e){case`pcm-s16`:return`sowt`;case`pcm-s16be`:return`twos`;case`pcm-s24`:return`in24`;case`pcm-s24be`:return`in24`;case`pcm-s32`:return`in32`;case`pcm-s32be`:return`in32`;case`pcm-f32`:return`fl32`;case`pcm-f32be`:return`fl32`;case`pcm-f64`:return`fl64`;case`pcm-f64be`:return`fl64`}else switch(e){case`pcm-s16`:return`ipcm`;case`pcm-s16be`:return`ipcm`;case`pcm-s24`:return`ipcm`;case`pcm-s24be`:return`ipcm`;case`pcm-s32`:return`ipcm`;case`pcm-s32be`:return`ipcm`;case`pcm-f32`:return`fpcm`;case`pcm-f32be`:return`fpcm`;case`pcm-f64`:return`fpcm`;case`pcm-f64be`:return`fpcm`}},Id=(e,t)=>{switch(e){case`aac`:return Ju;case`mp3`:return Ju;case`opus`:return Qu;case`vorbis`:return Ju;case`flac`:return $u;case`ac3`:return td;case`eac3`:return nd}if(t)switch(e){case`pcm-s24`:return Yu;case`pcm-s24be`:return Yu;case`pcm-s32`:return Yu;case`pcm-s32be`:return Yu;case`pcm-f32`:return Yu;case`pcm-f32be`:return Yu;case`pcm-f64`:return Yu;case`pcm-f64be`:return Yu}else switch(e){case`pcm-s16`:return ed;case`pcm-s16be`:return ed;case`pcm-s24`:return ed;case`pcm-s24be`:return ed;case`pcm-s32`:return ed;case`pcm-s32be`:return ed;case`pcm-f32`:return ed;case`pcm-f32be`:return ed;case`pcm-f64`:return ed;case`pcm-f64be`:return ed}return null},Ld={webvtt:`wvtt`},Rd={webvtt:id},zd=e=>{B(e.length===3);let t=0;for(let n=0;n<3;n++)t<<=5,t+=e.charCodeAt(n)-96;return t},Bd=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw Error(`Can't have multiple Writers for the same Target.`);this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){B(!this.started),this.target._start(),this.started=!0}write(e){B(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return B(this.started&&!this.finalized),this.target._flush()}async finalize(){B(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let n=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<n;)r*=2;if(r!==this.trackedWrites.byteLength){let e=new Uint8Array(r);e.set(this.trackedWrites,0),this.trackedWrites=e}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(1024),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw Error(`Internal error: Can't get tracked writes since nothing was tracked.`);let e={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,e}};_l();var Vd=class extends Js{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit(`write`,{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw TypeError(`offset must be a non-negative integer.`);return new Gd(this,e)}},Hd=2**16,Ud=2**32,Wd=class extends Vd{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!=`object`)throw TypeError(`BufferTarget options, when provided, must be an object.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);if(this._options=e,this._supportsResize=`resize`in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(Hd,{maxByteLength:Ud})}catch{this._buffer=new ArrayBuffer(Hd),this._supportsResize=!1}else this._buffer=new ArrayBuffer(Hd);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>Ud)throw Error(`ArrayBuffer exceeded maximum size of ${Ud} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let e=new ArrayBuffer(t),n=new Uint8Array(e);n.set(this._bytes,0),this._buffer=e,this._bytes=n}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit(`finalized`)}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},Gd=class extends Vd{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit(`finalized`)}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},Kd=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!=`string`)throw TypeError(`rootPath must be a string.`);if(typeof t!=`function`)throw TypeError(`getTarget must be a function.`)}},qd=57600,Jd=2082844800,Yd=e=>{let t={},n=e.track;return n.metadata.name!==void 0&&(t.name=n.metadata.name),t},Xd=(e,t,n=!0)=>{let r=e*t;return n?Math.round(r):r},Zd=class extends $l{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new Wd,this.auxWriter=new Bd(this.auxTarget,!1),this.auxBoxWriter=new nu(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Ss(),this.creationTime=Math.floor(Date.now()/1e3)+Jd,this.finalizedChunks=[],this.wroteFragmentedHeader=!1,this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.formatOptions={...t._options},this.isQuickTime=t instanceof hf,this.isCmaf=t instanceof mf,this.minimumFragmentDuration=this.formatOptions.minimumFragmentDuration??(t instanceof mf?1/0:1),this.auxWriter.start()}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart=`fragmented`,this.isFragmented=!0):(this.writer=await this.output._getRootWriter(e=>this.formatOptions.fastStart===void 0?e instanceof Wd:this.formatOptions.fastStart===`fragmented`),this.boxWriter=new nu(this.writer),this.fastStart=this.formatOptions.fastStart??(this.writer.target instanceof Wd&&`in-memory`),this.isFragmented=this.fastStart===`fragmented`),this.isCmaf){if(!this.output._hasInitTarget())throw Error(`CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.`);let e=new Bd(await this.output._getInitTarget(),!0);e.start(),this.initWriter=e,this.initBoxWriter=new nu(e)}let t=this.output.tracks.some(e=>e.isVideoTrack()&&e.source._codec===`avc`);{let e=this.initBoxWriter??this.boxWriter;if(B(e),this.formatOptions.onFtyp&&e.writer.startTrackingWrites(),e.writeBox(_u({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.formatOptions.onFtyp){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onFtyp(t,n)}this.ftypSize=e.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!==`in-memory`){if(this.fastStart===`reserve`){for(let e of this.output.tracks)if(e.metadata.maximumPacketCount===void 0)throw Error(`All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.`)}else this.isFragmented||(B(this.writer),B(this.boxWriter),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=bu(!0),this.boxWriter.writeBox(this.mdat))}await this.writer?.flush();for(let e of this.output.tracks)e.isVideoTrack()&&e.metadata.decoderConfig?this.getVideoTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig}):e.isAudioTrack()&&e.metadata.decoderConfig&&this.getAudioTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig});e()}allTracksAreKnown(){for(let e of this.output.tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(e=>e.type===`video`||e.type===`audio`?e.info.decoderConfig.codec:{webvtt:`wvtt`}[e.track.source._codec]);return hl({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(e=>e.type===`video`),hasAudio:this.trackDatas.some(e=>e.type===`audio`),codecStrings:e})}getVideoTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Oc(n,e.source._codec),B(n),B(n.decoderConfig);let i={...n.decoderConfig};B(i.codedWidth!==void 0),B(i.codedHeight!==void 0);let a=!1;if(e.source._codec===`avc`&&!i.description){if(!t)throw Error(`No AVC description provided; you must therefore provide a priming packet.`);let e=Hc(t.data);if(!e)throw Error(`Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.`);i.description=Uc(e),a=!0}else if(e.source._codec===`hevc`&&!i.description){if(!t)throw Error(`No HEVC description provided; you must therefore provide a priming packet.`);let e=Xc(t.data);if(!e)throw Error(`Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.`);i.description=il(e),a=!0}let o=Ns(1/(e.metadata.frameRate??57600),1e6).den,s=i.displayAspectWidth,c=i.displayAspectHeight,l=s===void 0||c===void 0?{num:1,den:1}:Ws({num:s*i.codedHeight,den:c*i.codedWidth}),u=i.codec===`ap4h`||i.codec===`ap4x`,d={muxer:this,track:e,type:`video`,info:{width:i.codedWidth,height:i.codedHeight,pixelAspectRatio:l,decoderConfig:i,requiresAnnexBTransformation:a,hasAlphaChannel:u},timescale:o,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(d),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),d}getAudioTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Ac(n,e.source._codec),B(n),B(n.decoderConfig);let i={...n.decoderConfig},a=!1;if(e.source._codec===`aac`&&!i.description){if(!t)throw Error(`No AAC description provided; you must therefore provide a priming packet.`);let e=gl(Xl.tempFromBytes(t.data));if(!e)throw Error(`Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.`);let n=rc[e.samplingFrequencyIndex],r=ic[e.channelConfiguration];if(n===void 0||r===void 0)throw Error(`Invalid ADTS frame header.`);i.description=ac({objectType:e.objectType,sampleRate:n,numberOfChannels:r}),a=!0}if((e.source._codec===`ac3`||e.source._codec===`eac3`)&&!t)throw Error(`AC-3/E-AC-3 require a priming packet.`);let o={muxer:this,track:e,type:`audio`,info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:i,requiresPcmTransformation:!this.isFragmented&&sc.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:a,primingPacket:t},timescale:i.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(o),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),o}getSubtitleTrackData(e,t){let n=this.trackDatas.find(t=>t.track===e);if(n)return n;jc(t),B(t),B(t.config);let r={muxer:this,track:e,type:`subtitle`,info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,lastCueEndTimestamp:0,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getVideoTrackData(e,t,n),i=t.data;if(r.info.requiresAnnexBTransformation){let e=[...Ic(i)].map(e=>i.subarray(e.offset,e.offset+e.length));if(e.length===0)throw Error(`Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.`);i=Vc(e,4)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=this.createSampleForTrack(r,i,t.timestamp,t.duration,t.type);await this.registerSample(r,a)}finally{r()}}async addEncodedAudioPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getAudioTrackData(e,t,n),i=t.data;if(r.info.requiresAdtsStripping){let e=gl(Xl.tempFromBytes(i));if(!e)throw Error(`Expected ADTS frame, didn't get one.`);let t=e.crcCheck===null?7:9;i=i.subarray(t)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=t.timestamp,o=t.duration;if(r.info.requiresPcmTransformation){let e=bc(r.info.decoderConfig.codec).sampleSize*r.info.numberOfChannels;if(o=i.byteLength/e/r.info.sampleRate,r.info.expectedNextPcmPacketTimestamp!==null){let e=a-r.info.expectedNextPcmPacketTimestamp;if(e<.01)a=r.info.expectedNextPcmPacketTimestamp;else{let t=await this.padWithSilence(r,r.info.expectedNextPcmPacketTimestamp,e);a=r.info.expectedNextPcmPacketTimestamp+t}}r.info.expectedNextPcmPacketTimestamp=a+o}let s=this.createSampleForTrack(r,i,a,o,t.type);await this.registerSample(r,s)}finally{r()}}async padWithSilence(e,t,n){let r=Xd(n,e.timescale);if(n=r/e.timescale,r>0){let{sampleSize:i,silentValue:a}=bc(e.info.decoderConfig.codec),o=r*e.info.numberOfChannels,s=new Uint8Array(i*o).fill(a),c=this.createSampleForTrack(e,new Uint8Array(s.buffer),t,n,`key`);await this.registerSample(e,c)}return n}async addSubtitleCue(e,t,n){let r=await this.mutex.acquire();try{let r=this.getSubtitleTrackData(e,n);this.validateTimestamp(r.track,t.timestamp,!0),e.source._codec===`webvtt`&&(r.cueQueue.push(t),await this.processWebVTTCues(r,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){let n=new Set([]);for(let r of e.cueQueue)B(r.timestamp<=t),B(e.lastCueEndTimestamp<=r.timestamp+r.duration),n.add(Math.max(r.timestamp,e.lastCueEndTimestamp)),n.add(r.timestamp+r.duration);let r=[...n].sort((e,t)=>e-t),i=r[0],a=r[1]??i;if(t<a)break;if(e.lastCueEndTimestamp<i){this.auxWriter.seek(0);let t=Cd();this.auxBoxWriter.writeBox(t);let n=this.auxTarget._getSlice(0,this.auxWriter.getPos()),r=this.createSampleForTrack(e,n,e.lastCueEndTimestamp,i-e.lastCueEndTimestamp,`key`);await this.registerSample(e,r),e.lastCueEndTimestamp=i}this.auxWriter.seek(0);for(let t=0;t<e.cueQueue.length;t++){let n=e.cueQueue[t];if(n.timestamp>=a)break;eu.lastIndex=0;let r=eu.test(n.text),o=n.timestamp+n.duration,s=e.cueToSourceId.get(n);if(s===void 0&&a<o&&(s=e.nextSourceId++,e.cueToSourceId.set(n,s)),n.notes){let e=Td(n.notes);this.auxBoxWriter.writeBox(e)}let c=wd(n.text,r?i:null,n.identifier??null,n.settings??null,s??null);this.auxBoxWriter.writeBox(c),o===a&&e.cueQueue.splice(t--,1)}let o=this.auxTarget._getSlice(0,this.auxWriter.getPos()),s=this.createSampleForTrack(e,o,i,a-i,`key`);await this.registerSample(e,s),e.lastCueEndTimestamp=a}}createSampleForTrack(e,t,n,r,i){return{timestamp:n,decodeTimestamp:n,duration:r,data:t,size:t.byteLength,type:i,timescaleUnitsToNextSample:Xd(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type===`audio`&&e.info.requiresPcmTransformation){this.isFragmented||(e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp);let t=0;for(let n=0;n<e.timestampProcessingQueue.length;n++){let r=e.timestampProcessingQueue[n],i=Xd(r.duration,e.timescale);t+=i}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:t,sampleDelta:1});else{let n=ls(e.timeToSampleTable);n.sampleCount+=t}e.timestampProcessingQueue.length=0;return}let n=e.timestampProcessingQueue.map(e=>e.timestamp).sort((e,t)=>e-t);this.isFragmented||(e.startTimestampOffset??=n[0]);for(let t=0;t<e.timestampProcessingQueue.length;t++){let r=e.timestampProcessingQueue[t];r.decodeTimestamp=n[t];let i=Xd(r.timestamp-r.decodeTimestamp,e.timescale),a=Xd(r.duration,e.timescale);if(e.lastTimescaleUnits!==null){B(e.lastSample);let t=Xd(r.decodeTimestamp,e.timescale,!1),n=Math.round(t-e.lastTimescaleUnits);if(B(n>=0),e.lastTimescaleUnits+=n,e.lastSample.timescaleUnitsToNextSample=n,!this.isFragmented){let t=ls(e.timeToSampleTable);if(B(t),t.sampleCount===1){t.sampleDelta=n;let r=e.timeToSampleTable[e.timeToSampleTable.length-2];r&&r.sampleDelta===n&&(r.sampleCount++,e.timeToSampleTable.pop(),t=r)}else t.sampleDelta!==n&&(t.sampleCount--,e.timeToSampleTable.push(t={sampleCount:1,sampleDelta:n}));t.sampleDelta===a?t.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let r=ls(e.compositionTimeOffsetTable);B(r),r.sampleCompositionTimeOffset===i?r.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i})}}else e.lastTimescaleUnits=Xd(r.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i}));e.lastSample=r}if(e.timestampProcessingQueue.length=0,B(e.lastSample),B(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){B(t.type===`key`);let n=Xd(t.timestamp,e.timescale,!1),r=Math.round(n-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=r}}async registerSample(e,t){t.type===`key`&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart===`reserve`?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart===`reserve`)){let t=e.track.metadata.maximumPacketCount;if(B(t!==void 0),e.samples.length>t)throw Error(`Track #${e.track.id} has already reached the maximum packet count (${t}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!e.currentChunk)n=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let i=this.trackDatas.every(n=>{if(e===n)return t.type===`key`;let r=n.sampleQueue[0];return r?r.type===`key`:n.closed});r>=this.minimumFragmentDuration&&i&&t.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=r>=.5}n&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null,trafIndex:null}),B(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(B(!this.isFragmented),B(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type===`audio`&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((t,n)=>t+Xd(n.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||ls(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart===`in-memory`){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(let t of e.currentChunk.samples)B(t.data),this.writer.write(t.data),t.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(B(this.isFragmented),!(!e&&!this.allTracksAreKnown()))outer:for(;;){let t=null,n=1/0;for(let r of this.trackDatas){if(!e&&r.sampleQueue.length===0&&!r.closed)break outer;r.sampleQueue.length>0&&r.sampleQueue[0].timestamp<n&&(t=r,n=r.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){if(B(this.isFragmented),!this.wroteFragmentedHeader){this.wroteFragmentedHeader=!0;let e=this.initBoxWriter??this.boxWriter;B(e),this.formatOptions.onMoov&&e.writer.startTrackingWrites(),this.ensureOneEnabledTrack();let t=Su(this);if(e.writeBox(t),this.formatOptions.onMoov){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onMoov(t,n)}if(this.isCmaf){B(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new nu(this.writer);let e=this.boxWriter.measureBox(vu()),t=this.boxWriter.measureBox(yu(this,0));this.segmentHeaderSize=e+t,this.writer.seek(this.segmentHeaderSize)}}B(this.writer),B(this.boxWriter);let t=this.trackDatas.filter(e=>e.currentChunk);if(t.length===0){e&&await this.writer.flush();return}let n=this.nextFragmentNumber++,r=md(n,t),i=this.writer.getPos(),a=i+this.boxWriter.measureBox(r),o=a+8,s=1/0;for(let e=0;e<t.length;e++){let n=t[e];n.currentChunk.offset=o,n.currentChunk.moofOffset=i,n.currentChunk.trafIndex=e;for(let e of n.currentChunk.samples)o+=e.size;s=Math.min(s,n.currentChunk.startTimestamp)}let c=o-a,l=c>=2**32;if(l)for(let e of t)e.currentChunk.offset+=8;this.formatOptions.onMoof&&this.writer.startTrackingWrites();let u=md(n,t);if(this.boxWriter.writeBox(u),this.formatOptions.onMoof){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoof(e,t,s)}B(this.writer.getPos()===a),this.formatOptions.onMdat&&this.writer.startTrackingWrites();let d=bu(l);d.size=c,this.boxWriter.writeBox(d),this.writer.seek(a+(l?16:8));for(let e of t)for(let t of e.currentChunk.samples)this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}for(let e of t)e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk),e.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){this.allTracksAreKnown()?(this.mdat||await this.createFastStartReserveMdat(),await this.addSampleToTrack(e,t)):e.sampleQueue.push(t)}async createFastStartReserveMdat(){B(this.writer),B(this.boxWriter),this.ensureOneEnabledTrack();let e=Su(this),t=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;B(this.ftypSize!==null),this.writer.seek(this.ftypSize+t),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=bu(!0),this.boxWriter.writeBox(this.mdat);for(let e of this.trackDatas){for(let t of e.sampleQueue)await this.addSampleToTrack(e,t);e.sampleQueue.length=0}}computeSampleTableSizeUpperBound(){B(this.fastStart===`reserve`);let e=0;for(let t of this.trackDatas){let n=t.track.metadata.maximumPacketCount;B(n!==void 0),e+=8*Math.ceil(2/3*n),e+=4*n,e+=8*Math.ceil(2/3*n),e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n}return e}async onTrackClose(e){let t=await this.mutex.acquire(),n=this.trackDatas.find(t=>t.track===e);n&&(n.closed=!0,n.type===`subtitle`&&e.source._codec===`webvtt`&&await this.processWebVTTCues(n,1/0),this.processTimestamps(n)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}ensureOneEnabledTrack(){for(let e of[`video`,`audio`,`subtitle`]){let t=this.trackDatas.filter(t=>t.type===e);if(t.length!==0&&!t.some(e=>e.track.metadata.disposition?.default!==!1)){let e=t[0];e.track.metadata.disposition={...e.track.metadata.disposition,default:!0}}}}async forceFragmentFinalization(){B(this.isFragmented);let e=await this.mutex.acquire();try{for(let e of this.trackDatas)e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);await this.interleaveSamples(!0),await this.finalizeFragment()}finally{e()}}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve(),this.ensureOneEnabledTrack(),!this.mdat&&this.fastStart===`reserve`&&await this.createFastStartReserveMdat();for(let e of this.trackDatas)e.closed=!0,e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let e of this.trackDatas)if(await this.finalizeCurrentChunk(e),e.startTimestampOffset!==null)for(let t=0;t<e.samples.length;t++){let n=e.samples[t];n.timestamp-=e.startTimestampOffset,n.decodeTimestamp-=e.startTimestampOffset}if(B(this.writer),B(this.boxWriter),this.fastStart===`in-memory`){this.mdat=bu(!1);let e;for(let t=0;t<2;t++){let t=Su(this),n=this.boxWriter.measureBox(t);e=this.boxWriter.measureBox(this.mdat);let r=this.writer.getPos()+n+e;for(let t of this.finalizedChunks){t.offset=r;for(let{data:n}of t.samples)B(n),r+=n.byteLength,e+=n.byteLength}if(r<2**32)break;e>=2**32&&(this.mdat.largeSize=!0)}this.formatOptions.onMoov&&this.writer.startTrackingWrites();let t=Su(this);if(this.boxWriter.writeBox(t),this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=e,this.boxWriter.writeBox(this.mdat);for(let e of this.finalizedChunks)for(let t of e.samples)B(t.data),this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}}else if(this.isFragmented){if(this.isCmaf){let e=this.segmentHeaderSize===null?0:this.writer.getPos()-this.segmentHeaderSize;this.writer.seek(0),this.boxWriter.writeBox(vu()),this.boxWriter.writeBox(yu(this,e))}else{let e=this.writer.getPos(),t=bd(this.trackDatas);this.boxWriter.writeBox(t);let n=this.writer.getPos()-e;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(n)}}else{B(this.mdat);let e=this.boxWriter.offsets.get(this.mdat);B(e!==void 0);let t=this.writer.getPos()-e;if(this.mdat.size=t,this.mdat.largeSize=t>=2**32,this.boxWriter.patchBox(this.mdat),this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}let n=Su(this);if(this.fastStart===`reserve`){B(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);let e=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(xu(e))}else this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);if(this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}}e()}},Qd=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},$d=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),ef=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1}_ensureValidAdd(){if(!this._connectedTrack)throw Error(`Source is not connected to an output track.`);if(this._connectedTrack.output.state===`canceled`)throw Error(`Output has been canceled.`);if(this._connectedTrack.output.state===`finalizing`||this._connectedTrack.output.state===`finalized`)throw Error(`Output has been finalized.`);if(this._connectedTrack.output.state===`pending`)throw Error(`Output has not started.`);if(this._closed)throw Error(`Source is closed.`)}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw Error(`Cannot call close without connecting the source to an output track.`);if(e.output.state===`pending`)throw Error(`Cannot call close before output has been started.`);this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,e.output.state!==`finalizing`&&e.output.state!==`finalized`&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},tf=class extends ef{constructor(e){if(super(),this._connectedTrack=null,!oc.includes(e))throw TypeError(`Invalid video codec '${e}'. Must be one of: ${oc.join(`, `)}.`);this._codec=e}},nf=(e,t)=>{if(e.metadata.hasOnlyKeyPackets&&t.type!==`key`)throw Error(`Cannot add non-key packets to a hasOnlyKeyPackets video track.`)},rf=class{setError(e){this.errorSet||=(this.error=e,!0)}constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.emittedEncoderPackets=0,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new Ps,this.customEncoderQueueSize=0,this.defaultEncodeOptions={},this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorSet=!1,this.lastMuxerPromise=Promise.resolve(),this.closed=!1}async add(e,t,n){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let i=this.encodingConfig,a=i.sizeChangeBehavior??`deny`,o=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(o=!0,a===`deny`))throw Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(i.transform?.width!==void 0||i.transform?.height!==void 0||i.transform?.rotate!==void 0||i.transform?.crop!==void 0||i.transform?.force===!0||o&&a!==`passThrough`){let n=i.transform?.width,r=i.transform?.height,s=i.transform?.fit??`fill`;o&&a!==`passThrough`&&(B(this.outputWidth),B(this.outputHeight),B(a!==`deny`),n=this.outputWidth,r=this.outputHeight,s=a);let c=await e.transform({width:n,height:r,roundDimensionsTo:2,crop:i.transform?.crop,rotate:i.transform?.rotate,fit:s,alpha:i.alpha});(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=c.displayWidth,this.outputHeight=c.displayHeight),t&&e.close(),e=c,t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let s=i.transform?.frameRate;if(s!==void 0){let i=e.timestamp+e.duration,a=ks(e.timestamp,s);if(this.frameRateLastSample!==null){if(a<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=i;return}await this.padFrameRate(a,n)}e===r&&(e=e.clone(),t=!0),e.setTimestamp(a),e.setDuration(1/s),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=a,this.frameRateLastEndTimestamp=i}await this.processAndEncode(e,n)}finally{t&&e.close()}}async processAndEncode(e,t){let n=this.encodingConfig,r;if(n.transform?.process){let t=n.transform.process(e);if(t instanceof Promise&&(t=await t),t===null)return;Array.isArray(t)||(t=[t]);let i=[];try{for(let n of t)n instanceof El?i.push(n):typeof VideoFrame<`u`&&n instanceof VideoFrame?i.push(new El(n)):i.push(new El(n,{timestamp:e.timestamp,duration:e.duration}))}catch(n){for(let t of i)t!==e&&t.close();for(let n of t)(n instanceof El&&n!==e||typeof VideoFrame<`u`&&n instanceof VideoFrame)&&n.close();throw n}r=i}else r=[e];try{for(let e of r){if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),B(this.encoderInitialized),this.closed)break;let n=this.encodingConfig.keyFrameInterval??2,r=Math.floor(e.timestamp/n),i={...this.defaultEncodeOptions,...e.encodeOptions,...t},a={...i,keyFrame:i.keyFrame===void 0?n===0||r!==this.lastMultipleOfKeyFrameInterval:i.keyFrame};if(this.lastMultipleOfKeyFrameInterval=r,this.encodingConfig.onEncodedSample?.(e),this.customEncoder){this.customEncoderQueueSize++;let t=e.clone(),n=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(t,a)).catch(e=>this.setError(e)).finally(()=>{this.customEncoderQueueSize--,t.close()});this.customEncoderQueueSize>=4&&await n}else{B(this.encoder);let t=e.toVideoFrame(),n=xs(this.preciseTimings,t.timestamp,e=>e.microsecondTimestamp),r=n===-1?null:this.preciseTimings[n];if(r&&r.microsecondTimestamp===t.timestamp?(r.timestamp!==e.timestamp&&(r.timestampIsValid=!1),r.duration!==e.duration&&(r.durationIsValid=!1)):(this.preciseTimings.splice(n+1,0,{microsecondTimestamp:t.timestamp,timestamp:e.timestamp,duration:e.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),!this.alphaEncoder)try{this.encoder.encode(t,a)}finally{t.close()}else if(t.format&&!t.format.includes(`A`)||this.splitterCreationFailed){this.alphaFrameQueue.push(null);try{this.encoder.encode(t,a)}finally{t.close()}}else{this.splitter||=new of;let{colorFrame:e,alphaFrame:n}=await this.splitter.split(t);this.alphaFrameQueue.push(n);try{this.encoder.encode(e,a)}finally{e.close()}}this.encoder.encodeQueueSize>=4&&await new Promise(e=>this.encoder.addEventListener(`dequeue`,e,{once:!0}))}await this.lastMuxerPromise}}finally{for(let t of r)t!==e&&t.close()}}async padFrameRate(e,t){let n=this.encodingConfig.transform.frameRate;B(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*n);for(let e=1;e<r;e++){let r={stack:[],error:void 0,hasError:!1};try{let i=Qd(r,this.frameRateLastSample.clone(),!1);i.setTimestamp(this.frameRateLastTimestamp+e/n),i.setDuration(1/n),await this.processAndEncode(i,t)}catch(e){r.error=e,r.hasError=!0}finally{$d(r)}}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=Jl(this.encodingConfig.quality,this.encodingConfig.bitrate);B(t!==void 0);let n=U({...this.encodingConfig,quality:t,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate}),r=null,i;for(let e of n){let t=e.config;if(this.encodingConfig.onEncoderConfig?.(t),i=Yl.find(e=>e.supports(this.encodingConfig.codec,t)),i){r=e;break}if(!(typeof VideoEncoder>`u`)){if(t.alpha=`discard`,this.encodingConfig.alpha===`keep`&&(t.latencyMode=`quality`),(t.width%2==1||t.height%2==1)&&(this.encodingConfig.codec===`avc`||this.encodingConfig.codec===`hevc`))throw Error(`The dimensions ${t.width}x${t.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);try{if((await VideoEncoder.isConfigSupported(t)).supported){r=e;break}}catch{}}}if(!r){if(typeof VideoEncoder>`u`)throw Error(`VideoEncoder is not supported by this browser.`);let e=n[0].config,t=n.map(({config:e,quantizer:t})=>t===null?`${e.bitrate} bps`:`quantizer ${t}`);throw Error(`This specific encoder configuration (${e.codec}, ${t.join(` / `)}, ${e.width}x${e.height}, hardware acceleration: ${e.hardwareAcceleration??`no-preference`}) is not supported by this browser. Consider using another codec or changing your video parameters.`)}let a=r.config;if(r.quantizer!==null&&(this.defaultEncodeOptions=ql(this.encodingConfig.codec,r.quantizer)),i)this.customEncoder=new i,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=a,this.customEncoder.onPacket=(e,t)=>{if(!(e instanceof ml))throw TypeError(`The first argument passed to onPacket must be an EncodedPacket.`);if(t!==void 0&&(!t||typeof t!=`object`))throw TypeError(`The second argument passed to onPacket must be an object or undefined.`);nf(this.source._connectedTrack,e),this.encodingConfig.onEncodedPacket?.(e,t),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,e,t).catch(e=>{this.setError(e)})},this.customEncoder.onError=e=>{this.setError(e)},await this.customEncoder.init();else{let e=[],t=[],n=0,r=0,i=(e,t,n)=>{let r={};if(t){let e=new Uint8Array(t.byteLength);t.copyTo(e),r.alpha=e}let i=ml.fromEncodedChunk(e,r),a=xs(this.preciseTimings,e.timestamp,e=>e.microsecondTimestamp),o=a===-1?null:this.preciseTimings[a],s=null;this.emittedEncoderPackets===0&&i.type===`delta`&&n?.decoderConfig&&(s=cl(this.encodingConfig.codec,n.decoderConfig,i.data)),(o&&o.microsecondTimestamp===e.timestamp||s!==null)&&(i=i.clone({timestamp:o?.timestampIsValid?o.timestamp:void 0,duration:o?.durationIsValid?o.duration:void 0,type:s??void 0})),nf(this.source._connectedTrack,i),this.encodingConfig.onEncodedPacket?.(i,n),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,i,n).catch(e=>{this.setError(e)}),this.emittedEncoderPackets++},o=Error(`Encoding error`).stack;if(this.encoder=new VideoEncoder({output:(a,o)=>{if(!this.alphaEncoder){i(a,null,o);return}let s=this.alphaFrameQueue.shift();B(s!==void 0),s?(this.alphaEncoder.encode(s,{...this.defaultEncodeOptions,keyFrame:a.type===`key`}),r++,s.close(),e.push({chunk:a,meta:o})):r===0?i(a,null,o):(t.push(n+r),e.push({chunk:a,meta:o}))},error:e=>{e.stack=o,this.setError(e)}}),this.encoder.configure(a),this.encodingConfig.alpha===`keep`){let o=Error(`Encoding error`).stack;this.alphaEncoder=new VideoEncoder({output:(a,o)=>{r--;let s=e.shift();for(B(s!==void 0),i(s.chunk,a,s.meta),n++;t.length>0&&t[0]===n;){t.shift();let n=e.shift();B(n!==void 0),i(n.chunk,null,n.meta)}},error:e=>{e.stack=o,this.setError(e)}}),this.alphaEncoder.configure(a)}}B(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}async flushAndClose(e){try{if(!e&&(this.checkForEncoderError(),this.frameRateLastSample)){let e=this.encodingConfig.transform.frameRate,t=ks(this.frameRateLastEndTimestamp,e);await this.padFrameRate(t)}this.closed=!0,e||(this.customEncoder?this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()):this.encoder&&(await this.encoder.flush(),await this.alphaEncoder?.flush(),await Ks(25)))}finally{this.closed=!0,this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?await this.customEncoderCallSerializer.call(()=>this.customEncoder.close()).catch(e=>this.setError(e)):this.encoder&&(this.encoder.state!==`closed`&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!==`closed`&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.splitter?.close())}e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.errorSet)throw this.error}},af=null,of=class{constructor(){this.worker=null,this.pendingRequests=new Map,this.nextRequestId=0}split(e){if(!this.worker){if(!af){let e=new Blob([`(${sf.toString()})()`],{type:`application/javascript`});af=URL.createObjectURL(e)}this.worker=new Worker(af),this.worker.addEventListener(`message`,e=>{let t=e.data,n=this.pendingRequests.get(t.id);n&&(this.pendingRequests.delete(t.id),`error`in t?n.reject(Error(t.error)):n.resolve({colorFrame:t.colorFrame,alphaFrame:t.alphaFrame}))}),this.worker.addEventListener(`error`,e=>{let t=Error(e.message||`Color/alpha splitter worker error.`);for(let e of this.pendingRequests.values())e.reject(t);this.pendingRequests.clear()})}let t=this.nextRequestId++,n=Ss();return this.pendingRequests.set(t,n),this.worker.postMessage({id:t,sourceFrame:e},{transfer:[e]}),n.promise}close(){this.worker?.terminate(),this.worker=null;let e=Error(`Color/alpha splitter closed.`);for(let t of this.pendingRequests.values())t.reject(e);this.pendingRequests.clear()}},sf=()=>{let e=null,t=Promise.resolve();self.addEventListener(`message`,e=>{let{id:r,sourceFrame:i}=e.data;t=t.then(async()=>{try{let{colorFrame:e,alphaFrame:t}=await n(i);self.postMessage({id:r,colorFrame:e,alphaFrame:t},{transfer:[e,t]})}catch(e){self.postMessage({id:r,error:e.message})}finally{i.close()}})});let n=async t=>{let n=t.format;if(!n)throw Error(`CPU color/alpha splitting requires a known VideoFrame format.`);let a=t.allocationSize();if((!e||e.byteLength!==a)&&(e=new Uint8Array(a)),await t.copyTo(e),n===`RGBA`||n===`BGRA`)return r(e,n,t);if(n===`I420A`||n===`I420AP10`||n===`I420AP12`||n===`I422A`||n===`I422AP10`||n===`I422AP12`||n===`I444A`||n===`I444AP10`||n===`I444AP12`)return i(e,n,t);throw Error(`CPU color/alpha splitting does not support format '${n}'.`)},r=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=r*i,o=a+Math.ceil(r/2)*Math.ceil(i/2)*2,s=new Uint8Array(o);for(let t=0,n=3;t<a;t++,n+=4)s[t]=e[n];s.fill(128,a);let c=new VideoFrame(e,{format:t===`RGBA`?`RGBX`:`BGRX`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),l={format:`I420`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[s.buffer]};return{colorFrame:c,alphaFrame:new VideoFrame(s,l)}},i=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=t.includes(`P10`),o=t.includes(`P12`),s=a||o?2:1,c,l;t.startsWith(`I420`)?(c=Math.ceil(r/2),l=Math.ceil(i/2)):t.startsWith(`I422`)?(c=Math.ceil(r/2),l=i):(c=r,l=i);let u=r*i,d=c*l,f=u*s,p=d*s,m=u*s,h=f+p*2,g=t.replace(`A`,``),_=Math.ceil(r/2)*Math.ceil(i/2),v=m+_*s*2,y=new Uint8Array(v),b=h;y.set(e.subarray(b,b+m),0);let x=m,S=a?512:o?2048:128;s===1?y.fill(S,x):new Uint16Array(y.buffer,x,2*_).fill(S);let C=a?`I420P10`:o?`I420P12`:`I420`,w=new VideoFrame(e.subarray(0,h),{format:g,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),T={format:C,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[y.buffer]};return{colorFrame:w,alphaFrame:new VideoFrame(y,T)}}},cf=class extends tf{constructor(e,t){if(!(typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas))throw TypeError(`canvas must be an HTMLCanvasElement or OffscreenCanvas.`);H(t),super(t.codec),this._encoder=new rf(this,t),this._canvas=e}add(e,t=0,n){if(!Number.isFinite(e)||e<0)throw TypeError(`timestamp must be a non-negative number.`);if(!Number.isFinite(t)||t<0)throw TypeError(`duration must be a non-negative number.`);let r=new El(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,n)}_flushAndClose(e){return this._encoder.flushAndClose(e)}},lf=class extends ef{constructor(e){if(super(),this._connectedTrack=null,!lc.includes(e))throw TypeError(`Invalid audio codec '${e}'. Must be one of: ${lc.join(`, `)}.`);this._codec=e}},uf=class extends ef{constructor(e){if(super(),this._connectedTrack=null,!uc.includes(e))throw TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${uc.join(`, `)}.`);this._codec=e}},df=class{getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>oc.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>lc.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>uc.includes(e))}_codecUnsupportedHint(e){return``}_isFragmentedIsobmff(){return!1}},ff=class extends df{constructor(e={}){if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.fastStart!==void 0&&![!1,`in-memory`,`reserve`,`fragmented`].includes(e.fastStart))throw TypeError(`options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.`);if(e.minimumFragmentDuration!==void 0&&(!Number.isFinite(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw TypeError(`options.minimumFragmentDuration, when provided, must be a non-negative number.`);if(e.onFtyp!==void 0&&typeof e.onFtyp!=`function`)throw TypeError(`options.onFtyp, when provided, must be a function.`);if(e.onMoov!==void 0&&typeof e.onMoov!=`function`)throw TypeError(`options.onMoov, when provided, must be a function.`);if(e.onMdat!==void 0&&typeof e.onMdat!=`function`)throw TypeError(`options.onMdat, when provided, must be a function.`);if(e.onMoof!==void 0&&typeof e.onMoof!=`function`)throw TypeError(`options.onMoof, when provided, must be a function.`);if(e.metadataFormat!==void 0&&![`mdir`,`mdta`,`udta`,`auto`].includes(e.metadataFormat))throw TypeError(`options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.`);super(),this._options=e}getSupportedTrackCounts(){let e=2**32-1;return{video:{min:0,max:e},audio:{min:0,max:e},subtitle:{min:0,max:e},total:{min:0,max:e}}}get supportsVideoRotationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}_createMuxer(e){return new Zd(e,this)}_isFragmentedIsobmff(){return this._options.fastStart===`fragmented`}},pf=class extends ff{constructor(e){super(e)}get _name(){return`MP4`}get fileExtension(){return`.mp4`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...oc,...cc,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...uc]}_codecUnsupportedHint(e){return new hf().getSupportedCodecs().includes(e)?` Switching to MOV will grant support for this codec.`:``}},mf=class extends ff{constructor(e){super(e)}get _name(){return`CMAF`}get fileExtension(){return`.m4s`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...oc,...cc,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...uc]}},hf=class extends ff{constructor(e){super(e)}get _name(){return`MOV`}get fileExtension(){return`.mov`}get mimeType(){return`video/quicktime`}getSupportedCodecs(){return[...oc,...lc]}_codecUnsupportedHint(e){return new pf().getSupportedCodecs().includes(e)?` Switching to MP4 will grant support for this codec.`:``}},gf=[`video`,`audio`,`subtitle`],_f=class e{constructor(e,t,n,r,i){this.id=e,this.output=t,this.type=n,this.source=r,this.metadata=i}isVideoTrack(){return this.type===`video`}isAudioTrack(){return this.type===`audio`}isSubtitleTrack(){return this.type===`subtitle`}canBePairedWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrack.`);if(this===t)return!1;let n=qs(this.metadata.group),r=qs(t.metadata.group);for(let e of n)if(this.type!==t.type&&r.some(t=>e===t)||r.some(t=>e._pairedGroups.has(t)))return!0;return!1}},vf=class extends _f{constructor(e,t,n,r){super(e,t,`video`,n,r)}},yf=class extends _f{constructor(e,t,n,r){super(e,t,`audio`,n,r)}},bf=class extends _f{constructor(e,t,n,r){super(e,t,`subtitle`,n,r)}},xf=class e{constructor(){this._pairedGroups=new Set}pairWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrackGroup.`);if(this===t)throw TypeError(`Cannot pair a group with itself.`);this._pairedGroups.add(t),t._pairedGroups.add(this)}},Sf=e=>{if(!e||typeof e!=`object`)throw TypeError(`metadata must be an object.`);if(e.languageCode!==void 0&&!js(e.languageCode))throw TypeError(`metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.`);if(e.name!==void 0&&typeof e.name!=`string`)throw TypeError(`metadata.name, when provided, must be a string.`);if(e.disposition!==void 0&&tc(e.disposition),e.maximumPacketCount!==void 0&&(!Number.isInteger(e.maximumPacketCount)||e.maximumPacketCount<0))throw TypeError(`metadata.maximumPacketCount, when provided, must be a non-negative integer.`);if(e.group!==void 0&&!(e.group instanceof xf)&&(!Array.isArray(e.group)||e.group.some(e=>!(e instanceof xf))))throw TypeError(`metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.`)},Cf=class extends Js{get target(){let e=`Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.`;if(this._rootTargetPromise)throw TypeError(e);let t=this._getRootTarget();if(t instanceof Promise)throw TypeError(e);return t}constructor(e){if(super(),this.state=`pending`,this.defaultTrackGroup=new xf,this.tracks=[],this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new bs,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(!(e.format instanceof df))throw TypeError(`options.format must be an OutputFormat.`);if(!(e.target instanceof Vd||e.target instanceof Kd))throw TypeError(`options.target must be a Target or a PathedTarget.`);if(e.target instanceof Vd&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof Vd)&&typeof e.initTarget!=`function`)throw Error(`options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof Vd&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){B(this._target instanceof Kd);let t=this._target.getTarget(e),n=e=>{if(!(e instanceof Vd))throw TypeError(`getTarget must return a Target.`);return e};return t instanceof Promise?t.then(n):n(t)}async _getTarget(e){B(this._target instanceof Kd);let t=await this._getTargetValidated(e);return this._emit(`target`,{target:t,request:e,isRoot:e.isRoot}),this.state===`canceled`?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on(`finalized`,()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(B(this._initTarget!==null),this._initTarget instanceof Vd)return this._initTarget;let e=await this._initTarget();return this.state===`canceled`?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof Vd)return this._emit(`target`,{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),n=t=>(this.state===`canceled`?t._close():this._rememberTarget(t),this._emit(`target`,{target:t,request:e,isRoot:!0}),this._rootTarget=t,t);return t instanceof Promise?this._rootTargetPromise=t.then(n):n(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),n=new Bd(t,typeof e==`boolean`?e:e(t));return n.start(),n})()}addVideoTrack(e,t={}){if(!(e instanceof tf))throw TypeError(`source must be a VideoSource.`);if(Sf(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(!this.format.supportsVideoRotationMetadata&&t.rotation)throw Error(`${this.format._name} does not support video rotation metadata.`);if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);if(t.decoderConfig!==void 0&&Oc({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof ml))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new vf(this.tracks.length+1,this,e,n))}addAudioTrack(e,t={}){if(!(e instanceof lf))throw TypeError(`source must be an AudioSource.`);if(Sf(t),t.decoderConfig!==void 0&&Ac({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof ml))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new yf(this.tracks.length+1,this,e,n))}addSubtitleTrack(e,t={}){if(!(e instanceof uf))throw TypeError(`source must be a SubtitleSource.`);Sf(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new bf(this.tracks.length+1,this,e,n))}setMetadataTags(e){if(ec(e),this.state!==`pending`)throw Error(`Cannot set metadata tags after output has been started or canceled.`);this._metadataTags=e}_addTrack(e){if(this.state!==`pending`)throw Error(`Cannot add track after output has been started or canceled.`);if(e.source._connectedTrack)throw Error(`Source is already used for a track.`);let t=this.format.getSupportedTrackCounts(),n=this.tracks.reduce((t,n)=>t+ +(n.type===e.type),0),r=t[e.type].max;if(n===r)throw Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?``:`s`}.`);let i=t.total.max;if(this.tracks.length===i)throw Error(`${this.format._name} does not support more than ${i} tracks${i===1?``:`s`} in total.`);if(e.isVideoTrack()){let t=this.format.getSupportedVideoCodecs();if(t.length===0)throw Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let t=this.format.getSupportedAudioCodecs();if(t.length===0)throw Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let t=this.format.getSupportedSubtitleCodecs();if(t.length===0)throw Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}return this.tracks.push(e),e.source._connectedTrack=e,e}hasEnoughTracks(){let e=this.format.getSupportedTrackCounts();for(let t of gf)if(this.tracks.reduce((e,n)=>e+ +(n.type===t),0)<e[t].min)return!1;let t=e.total.min;return!(this.tracks.length<t)}async start(){let e=this.format.getSupportedTrackCounts();for(let t of gf){let n=this.tracks.reduce((e,n)=>e+ +(n.type===t),0),r=e[t].min;if(n<r)throw Error(r===e[t].max?`${this.format._name} requires exactly ${r} ${t} track${r===1?``:`s`}.`:`${this.format._name} requires at least ${r} ${t} track${r===1?``:`s`}.`)}let t=e.total.min;if(this.tracks.length<t)throw Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?``:`s`}.`:`${this.format._name} requires at least ${t} track${t===1?``:`s`}.`);if(this.state===`canceled`)throw Error(`Output has been canceled.`);return this._startPromise?(Zs._warn(`Output has already been started.`),this._startPromise):this._startPromise=(async()=>{this.state=`started`;let e=this._mutex.acquire();try{await this._muxer.start();let e=this.tracks.map(e=>e.source._start());await Promise.all(e)}finally{(await e)()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this._cancelPromise)return Zs._warn(`Output has already been canceled.`),this._cancelPromise;if(this.state===`finalizing`||this.state===`finalized`){this.state===`finalized`&&Zs._warn(`Output has already been finalized.`);return}return this._cancelPromise=(async()=>{this.state=`canceled`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!0));await Promise.all(e),await Promise.all([...this._unfinalizedTargets].map(e=>e._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state===`pending`)throw Error(`Cannot finalize before starting.`);if(this.state===`canceled`)throw Error(`Cannot finalize after canceling.`);return this._finalizePromise?(Zs._warn(`Output has already been finalized.`),this._finalizePromise):this._finalizePromise=(async()=>{this.state=`finalizing`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(e),await this._muxer.finalize(),this._rootWriterPromise){let e=await this._rootWriterPromise;e.finalized||(await e.flush(),await e.finalize())}this._onFinalize&&await this._onFinalize(),this.state=`finalized`}finally{await Promise.all([...this._unfinalizedTargets].map(e=>e._close().catch(()=>{}))),this._unfinalizedTargets.clear(),e()}})()}},wf=class{_engine;constructor(e){this._engine=e}async export(e,t){let{fps:n,duration:r,resolution:i,bitrate:a=8e6}=e,o=Math.ceil(r/60*n),s=this._engine.canvas,c=this._engine.renderer.resolution.clone();this._engine.setSize(i);let l=new Wd,u=new Cf({format:new pf,target:l}),d=new cf(s,{codec:`avc`,bitrate:a,keyFrameInterval:2});u.addVideoTrack(d),await u.start();for(let e=0;e<o;e++)this._engine.updateOffline(e,n),await d.add(e/n,1/n),t&&t({current:e+1,total:o,phase:`encoding`}),e%10==0&&await new Promise(e=>setTimeout(e,0));return t&&t({current:o,total:o,phase:`finalizing`}),await u.finalize(),this._engine.setSize(c),t&&t({current:o,total:o,phase:`done`}),new Blob([l.buffer],{type:`video/mp4`})}static download(e,t=`scene.mp4`){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}},Tf=class extends Pt{_engine;_selectedEntityId;_unselectableEntityIds;_selectedAsset;_navigateAsset;_propertyTarget;_audioBuffer;_frameLoop;_resolutionScale;_baseResolution;_viewType;_frameDebugger;_assetPreviewManager;_externalWindow;_externalCanvasBitmapContext;_modalStatus;_panelLayout;_disposed;_api;_draw;_editorCamera;_gizmoManager;_helperManager;_gridRenderer;_constraintAxisRenderer;_wireframeRenderer;_selectionOutline;_pointerHandler;_keyboardHandler;_modalTransformHandler;_sceneExporter;_isExporting;_exportProgress;constructor(e){super(),this._engine=e,this._viewType=`render`,this._selectedEntityId=null,this._unselectableEntityIds=new Set,this._selectedAsset=null,this._navigateAsset=null,this._propertyTarget=`entity`,this._resolutionScale=1,this._baseResolution=new j(1920,1080),this._externalWindow=null,this._externalCanvasBitmapContext=null,this._modalStatus=null,this._panelLayout=null,this._disposed=!1,this._api=new Va(this),this._draw=Qn(e),this._assetPreviewManager=new Ma(this._draw),this._sceneExporter=new wf(e),this._isExporting=!1,this._exportProgress=null,this._editorCamera=new Xa(e),this._gizmoManager=new Ao(e,this._draw),this._helperManager=new zo(e,this._draw),this._gridRenderer=new is(e,this._draw),this._constraintAxisRenderer=new rs(e,this._draw),this._wireframeRenderer=new ss(this._draw),this._selectionOutline=new os(this._draw),this._pointerHandler=new es(e,this._editorCamera,this._gizmoManager,this._helperManager,this._api,()=>this._selectedEntityId,e=>!this._unselectableEntityIds.has(e.uuid),()=>this._gizmoManager.mode,e=>this.selectEntity(e),()=>this._modalTransformHandler.active,()=>{this._editorCamera.preview&&this.setField(`preview`,!1),this.setField(`cameraView`,`editor`)}),this._modalTransformHandler=new Zo({engine:e,editorCamera:this._editorCamera,api:this._api,getSelectedEntity:()=>this._selectedEntityId?e.root.findEntityByUUID(this._selectedEntityId)??null:null,isPointerBusy:()=>this._pointerHandler.gizmoDragging,onStatusChange:e=>{this._modalStatus!==e&&(this._modalStatus=e,this.noticeField(`modalStatus`))}}),this._keyboardHandler=new Vo({onSave:()=>this.save(),onUndo:()=>this._api.undo(),onRedo:()=>this._api.redo(),onPlayToggle:()=>{this._engine.frame.playing?this._engine.stop():this._engine.play()},onCameraViewToggle:()=>{this._editorCamera.preview?(this.setField(`preview`,!1),this.setField(`cameraView`,`editor`)):this.setField(`cameraView`,this._editorCamera.view===`editor`?`camera`:`editor`)},onPreviewToggle:()=>{this.setField(`preview`,!this._editorCamera.preview)},onSyncToSceneCamera:()=>this.syncToSceneCamera(),onFocusSelected:()=>this.focusSelected(),onTransformKey:e=>!this._editorCamera.preview&&this._modalTransformHandler.handleKeyDown(e)}),this._frameDebugger=new Za(e.canvas,this._draw),this._audioBuffer=null,this._engine.on(`update/music`,e=>{this._audioBuffer=e}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on(`update/blidge/frame`,e=>{this._engine.seek(e.current),e.playing&&!this._engine.frame.playing?this._engine.play():!e.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field(`enableRender`,()=>this._engine.enableRender,e=>this._engine.enableRender=e),this.field(`resolutionScale`,()=>this._resolutionScale,e=>{this._resolutionScale=Number(e),this._resize()});let t=this.fieldDir(`resolution`);t.field(`width`,()=>this._baseResolution.x,e=>{this._baseResolution.x=e,this._resize()},{step:1}),t.field(`height`,()=>this._baseResolution.y,e=>{this._baseResolution.y=e,this._resize()},{step:1}),this.field(`viewType`,()=>this._viewType,e=>{this._viewType=e,this._frameDebugger.enable=this._viewType===`debug`});let n=this.fieldDir(`frameLoop`);n.field(`enabled`,()=>this._frameLoop.enabled,e=>this._frameLoop.enabled=e),n.field(`start`,()=>this._frameLoop.start,e=>this._frameLoop.start=e),n.field(`end`,()=>this._frameLoop.end,e=>this._frameLoop.end=e),this.field(`selectedEntityId`,()=>this._selectedEntityId,e=>{this._selectedEntityId=e,e&&(this._propertyTarget=`entity`,this.noticeField(`propertyTarget`))}),this.field(`unselectableEntityIds`,()=>Array.from(this._unselectableEntityIds),e=>{this._unselectableEntityIds=new Set(e)},{hidden:!0}),this.field(`selectedAsset`,()=>this._selectedAsset,e=>{this._selectedAsset=e,e&&(this._propertyTarget=`asset`,this.noticeField(`propertyTarget`))}),this.field(`navigateAsset`,()=>this._navigateAsset,e=>{this._navigateAsset=e}),this.field(`propertyTarget`,()=>this._propertyTarget,e=>{this._propertyTarget=e}),this.field(`cameraView`,()=>this._editorCamera.view,t=>{this._editorCamera.setView(t,e)}),this.field(`preview`,()=>this._editorCamera.preview,t=>{this._editorCamera.setPreview(t,e)}),this.field(`gizmoMode`,()=>this._gizmoManager.mode,e=>{this._gizmoManager.setMode(e)}),this.field(`transformOrientation`,()=>this._gizmoManager.orientation,e=>{this._gizmoManager.setOrientation(e)}),this.field(`modalStatus`,()=>this._modalStatus,{noExport:!0}),this.field(`panelLayout`,()=>this._panelLayout,e=>this._panelLayout=e,{hidden:!0});let r=this.fieldDir(`helpers`);r.field(`show`,()=>this._helperManager.showHelpers,e=>this._helperManager.showHelpers=e),r.field(`grid`,()=>this._gridRenderer.showGrid,e=>this._gridRenderer.showGrid=e),r.field(`empty`,()=>this._helperManager.showEmptyHelpers,e=>this._helperManager.showEmptyHelpers=e),r.field(`camera`,()=>this._helperManager.showCameraHelpers,e=>this._helperManager.showCameraHelpers=e),r.field(`light`,()=>this._helperManager.showLightHelpers,e=>this._helperManager.showLightHelpers=e),r.field(`wireframe`,()=>this._wireframeRenderer.showWireframe,e=>this._wireframeRenderer.showWireframe=e),r.field(`gizmo`,()=>this._gizmoManager.showGizmo,e=>this._gizmoManager.showGizmo=e),r.field(`outline`,()=>this._selectionOutline.showOutline,e=>this._selectionOutline.showOutline=e);let i=this.fieldDir(`camera`);i.field(`position`,()=>{let e=this._editorCamera.orbitControls.eye;return[e.x,e.y,e.z]},e=>{let t=this._editorCamera.orbitControls.target;this._editorCamera.orbitControls.setPosition(new j(e[0],e[1],e[2]),new j(t.x,t.y,t.z))}),i.field(`target`,()=>{let e=this._editorCamera.orbitControls.target;return[e.x,e.y,e.z]},e=>{let t=this._editorCamera.orbitControls.eye;this._editorCamera.orbitControls.setPosition(new j(t.x,t.y,t.z),new j(e[0],e[1],e[2]))}),this._animate()}bootstrap(e){e&&this.deserialize(e),this._resize()}get engine(){return this._engine}get api(){return this._api}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}get editorCamera(){return this._editorCamera}get assetPreviewManager(){return this._assetPreviewManager}_animate(){if(!this._disposed){if(!this._isExporting){this._editorCamera.updateBeforeRender(this._engine),this._engine.update();let e=this._editorCamera.getCameraEntity(this._engine),t=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null,n=this._editorCamera.preview;if(n||(this._gridRenderer.render(e,this._engine),this._helperManager.render(e,this._engine,this._selectedEntityId),this._wireframeRenderer.render(e,this._engine)),this._gizmoManager.render(n||this._modalTransformHandler.active?null:t,e,this._engine),n||(this._constraintAxisRenderer.render(this._modalTransformHandler.constraintDisplay,e,this._engine),this._selectionOutline.render(t,e)),this._frameDebugger.enable&&this._frameDebugger.draw(),this._draw.present(),this._editorCamera.updateAfterRender(this._engine),this._externalCanvasBitmapContext){let e=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(t=>{e.transferFromImageBitmap(t)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start))}window.requestAnimationFrame(this._animate.bind(this))}}get isExporting(){return this._isExporting}get exportProgress(){return this._exportProgress}async exportMP4(){if(this._isExporting)return;this._isExporting=!0,this._exportProgress=null,this.emit(`update/export`);let e=this._engine.frame.playing;this._engine.stop();let t=this._engine.cameraEntity;this._engine.cameraEntity=null,this._engine.renderer.setPipelineOverride(null);try{let e=await this._sceneExporter.export({fps:this._engine.frameSetting.fps,duration:this._engine.frameSetting.duration,resolution:this._baseResolution.clone()},e=>{this._exportProgress=e,this.emit(`update/export`)});wf.download(e)}catch(e){console.error(`Export failed:`,e)}this._engine.cameraEntity=t,this._editorCamera.syncPipelineOverride(this._engine),this._isExporting=!1,this._exportProgress=null,this.emit(`update/export`),e&&this._engine.play()}selectEntity(e){this.setField(`selectedEntityId`,e?e.uuid:null)}syncToSceneCamera(){this._editorCamera.preview&&this.setField(`preview`,!1),this.setField(`cameraView`,`editor`),this._editorCamera.syncFromSceneCamera(this._engine)}focusSelected(){if(this._editorCamera.preview)return;let e=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null;e&&(this.setField(`cameraView`,`editor`),this._editorCamera.focus(e))}createEntity(e,t){let n=this._engine.createEntity({name:t});return n.initiator=`user`,e.add(n),n}deleteEntity(e){e.disposeRecursive();let t=e.parent;t&&t.remove(e)}save(){this.emit(`save`,[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:`export`})}exportEngine(){return this._engine.serialize({mode:`export`})}openInExternalWindow(){if(this._externalWindow=window.open(``,`_blank`),!this._externalWindow)return;let e=this._externalWindow.document.createElement(`canvas`);e.style.width=`100%`,e.style.height=`100%`,e.style.objectFit=`contain`,e.style.cursor=`none`,this._externalWindow.document.body.style.margin=`0`,this._externalWindow.document.body.style.background=`#000`,this._externalWindow.document.body.appendChild(e),this._externalCanvasBitmapContext=e.getContext(`bitmaprenderer`),this._externalWindow.addEventListener(`unload`,()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}_resize(){let e=this._baseResolution.clone().multiply(this._resolutionScale);this.engine.setSize(e),this._draw.resize(e),this._frameDebugger.resize(e),this._editorCamera.resize(e),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=e.x,this._externalCanvasBitmapContext.canvas.height=e.y)}dispose(){this._disposed=!0,this._api.dispose(),this._editorCamera.dispose(),this._pointerHandler.dispose(),this._keyboardHandler.dispose(),this._modalTransformHandler.dispose(),this._frameDebugger.dispose(),this._assetPreviewManager.dispose()}},Ef=e=>{let{engine:t}=Br(),[n,r]=(0,b.useState)(()=>new Tf(t)),i=b.useRef(n);return i.current=n,(0,b.useEffect)(()=>{if(!i.current.disposed&&i.current.engine.uuid==t.uuid)return;let e=new Tf(t);r(e)},[t]),(0,b.useEffect)(()=>()=>{n.dispose()},[n]),{engine:t,editor:n,projectName:e}},Df=e=>{let t=Ef(e.projectName);return(0,b.useEffect)(()=>{if(!(!t.editor||!e.onSave))return t.editor.on(`save`,e.onSave),()=>{t.editor.off(`save`,e.onSave)}},[t.editor,e.onSave]),(0,b.useEffect)(()=>{t.editor&&t.editor.bootstrap(e.editorData)},[e.editorData,t.editor]),(0,E.jsx)(ze.Provider,{value:t,children:e.children})},Of=e=>e?e.map(e=>(0,E.jsx)(D.Tab,{title:e.title,children:(0,E.jsx)(oe,{children:e.content})},e.title)):null,kf=e=>e?.find(e=>e.default)?.title,Af=[{id:`scene`,title:`Scene`,content:(0,E.jsx)(oe,{children:(0,E.jsx)(li,{})})},{id:`timer`,title:`Timer`,content:(0,E.jsx)(oe,{noPadding:!0,children:(0,E.jsx)(qr,{})})},{id:`screen`,title:`Screen`,content:(0,E.jsx)(ia,{}),unique:!0},{id:`property`,title:`Property`,content:(0,E.jsx)(oe,{children:(0,E.jsx)(Rr,{})})},{id:`textures`,title:`Textures`,content:(0,E.jsx)(oe,{noPadding:!0,children:(0,E.jsx)(oa,{})})},{id:`project`,title:`Project`,content:(0,E.jsx)(oe,{children:(0,E.jsx)(Ji,{})})},{id:`renderer`,title:`Renderer`,content:(0,E.jsx)(oe,{children:(0,E.jsx)(Xi,{})})},{id:`editor-settings`,title:`Editor`,content:(0,E.jsx)(oe,{children:(0,E.jsx)(Qe,{})})},{id:`timeline`,title:`Timeline`,content:(0,E.jsx)(oe,{noPadding:!0,children:(0,E.jsx)(ka,{})})}],jf=e=>{let t=le(),n=null;return n=t.isPC?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(Gi,{panels:Af,customTabs:e.customTabs}),(0,E.jsx)(hi,{})]}):(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(ie,{direction:`vertical`,storageKey:`orengine-editor-sp-main`,children:[(0,E.jsx)(ie.Item,{size:`calc( min( 56.25vw, 55vh ) + 77px )`,minSize:200,style:{minHeight:`200px`},children:(0,E.jsx)(ia,{})}),(0,E.jsx)(ie.Item,{flex:1,minSize:200,children:(0,E.jsxs)(D,{storageKey:`orengine-panel-sp-main`,defaultTabTitle:kf(e.customTabs?.mainBottom)??kf(e.customTabs?.leftTop)??kf(e.customTabs?.leftBottom)??kf(e.customTabs?.rightTop)??kf(e.customTabs?.footer),children:[(0,E.jsx)(D.Tab,{title:`Scene / Property`,children:(0,E.jsxs)(ie,{direction:`horizontal`,storageKey:`orengine-editor-sp-sceneProp`,children:[(0,E.jsx)(ie.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,E.jsx)(li,{})}),(0,E.jsx)(ie.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,E.jsx)(Rr,{})})]})}),(0,E.jsx)(D.Tab,{title:`Textures`,children:(0,E.jsx)(oe,{noPadding:!0,children:(0,E.jsx)(oa,{})})}),(0,E.jsx)(D.Tab,{title:`Project`,children:(0,E.jsx)(oe,{children:(0,E.jsx)(Ji,{})})}),(0,E.jsx)(D.Tab,{title:`Renderer`,children:(0,E.jsx)(oe,{children:(0,E.jsx)(Xi,{})})}),(0,E.jsx)(D.Tab,{title:`Editor`,children:(0,E.jsx)(oe,{children:(0,E.jsx)(Qe,{})})}),Of(e.customTabs?.leftTop),Of(e.customTabs?.leftBottom),Of(e.customTabs?.mainBottom),Of(e.customTabs?.rightTop),Of(e.customTabs?.footer)]})}),(0,E.jsx)(ie.Item,{size:`120px`,minSize:80,children:(0,E.jsx)(D,{storageKey:`orengine-panel-sp-timeline`,children:(0,E.jsx)(D.Tab,{title:`Timeline`,children:(0,E.jsx)(oe,{noPadding:!0,children:(0,E.jsx)(C,{fallback:(0,E.jsx)(`div`,{children:`エラーだよ`}),children:(0,E.jsx)(ka,{})})})})})})]}),(0,E.jsx)(hi,{})]}),(0,E.jsx)(Df,{projectName:e.projectName,onSave:e.onSave,editorData:e.editorData,children:(0,E.jsx)(vi,{children:(0,E.jsxs)(pi,{children:[(0,E.jsx)(`div`,{className:Aa.editor,children:n}),(0,E.jsx)(di,{})]})})})},Mf=()=>{let[e,t]=b.useState(()=>new xr(Fn)),n=b.useRef(e);return n.current=e,(0,b.useEffect)(()=>{n.current.disposed&&t(new xr(Fn))},[]),(0,b.useEffect)(()=>()=>{e.dispose()},[e]),{engine:e,load:(0,b.useCallback)(t=>{t&&e.load(t)},[e])}},Nf=e=>{let t=Mf(),{engine:n}=t,r=(0,b.useRef)(e.onEngineInit);return r.current=e.onEngineInit,(0,b.useEffect)(()=>{r.current?.(n)},[n]),(0,b.useEffect)(()=>{e.project?n.load(e.project):n.init()},[n,e.project]),(0,E.jsx)(zr.Provider,{value:t,children:e.children})},Pf=e=>(0,E.jsx)(Nf,{project:e.sceneData,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,E.jsx)(jf,{editorData:e.editorData,projectName:e.projectName??`Static`,customTabs:e.customTabs,onSave:()=>{}})}),Ff=`#define PI 3.14159265359\r
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

in vec3 vInstance;

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

	float emit = 10.0 - vInstance.z * 5.0;
	outColor.xyz = vec3( emit );
	outEmission += emit;
	outSSN = 1.0;
	
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

}`,If=`#define PI 3.14159265359\r
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
uniform float uTimeEF;
mat2 rotate(float rad) {\r
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
}

out vec3 vInstance;

layout(location = 3) in vec3 instance;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	outPos.xy *= 1.0 + (1.0 - instance.z) * 0.2;
	outPos.yz *= rotate( (-HPI + sin( uTimeE * 0.3 + instance.z * 0.3 ) * HPI )  );
	
	outPos.y += instance.x * 2.2;

	vInstance = instance;

	
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
vVelocity *= 0.2;

}`,Lf=s({EyeRings:()=>Rf}),Rf=class extends Ft{constructor(e){super(e);let t=this.engine,n=new Kt({thetaSegments:64,innerRadius:4,outerRadius:4.01,extrude:.01}),r=[];for(let e=0;e<8;e++)r.push(-1,e,e/7),r.push(1,e,e/7);n.setAttribute(`instance`,new Float32Array(r),3,{instanceDivisor:1});let i=new $t({phase:[`deferred`,`shadowMap`],frag:Ff,vert:If,uniforms:t.uniforms});this.entity.addComponent(F,{geometry:n,material:i})}dispose(){super.dispose(),this.entity.removeComponent(F)}},zf=`#define PI 3.14159265359\r
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

in vec4 vOPos;
in float vT;

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

	float emit = exp( vT * -8.0);

	outColor = vec4( vec3( emit * 50.0 ), emit );

	if( emit < 0.03 ) {

		discard;

	}
	
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

}`,Bf=`#define PI 3.14159265359\r
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
uniform float uTimeEF;

in vec4 oPos;
out vec4 vOPos;
out float vT;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	vT = fract( uTimeE * 0.5 + oPos.w );

	outPos.xz *= 1.0 + exp( vT * -8.0 ) * 20.0;
	outPos.xyz += oPos.xyz;

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
vVelocity *= 0.2;
	
	vOPos = oPos;

}`,Vf=s({FlashLine:()=>Hf}),Hf=class extends Ft{geometry;material;constructor(e){super(e);let t=this.engine;this.geometry=new Lt({radiusBottom:.02,radiusTop:.02,radSegments:8,height:50});let n=[];for(let e=0;e<32;e++){let e=dt.randomVector().multiply(new j(20,1,20));n.push(e.x,e.y,e.z,Math.random())}this.geometry.setAttribute(`oPos`,new Float32Array(n),4,{instanceDivisor:1}),this.material=new $t({phase:[`forward`,`envMap`],frag:Jt(`flFrag`,zf),vert:Jt(`flVert`,Bf),uniforms:Zt.merge(t.uniforms)}),this.entity.addComponent(F,{material:this.material,geometry:this.geometry})}},Uf=`#define PI 3.14159265359\r
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
\r
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
}
mat2 rotate(float rad) {\r
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
}

uniform float uAspectRatio;

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

	vec3 normal = normalize( - vNormal );
	outRoughness = 1.0;
	outColor *= 0.0;
	outColor.xyz = vec3( 0.0, 0.05, 0.1);

	vec3 sPos = outPos * 0.1;

	float n = noiseValue( sPos * 0.05 + uTimeE * 0.1 );

	vec3 n2Pos = sPos;
	n2Pos.xz *= rotate( n2Pos.y * 0.02 );
	float n2 = noiseValue( n2Pos * 0.01 + vec3( 0.0, 0.0, uTimeE * 0.5 + n ) );

	float phase = 4.5;

	float line = smoothstep( 0.88, 0.9, fract( n2 * phase ) );
	float pattern = smoothstep( 0.2, 0.1, length( fract( ( vUv + vec2( floor(vUv.y * 150.0) / 150.0 * 0.25, 0.0 ) ) * vec2( 2.0, 1.0 ) * 150.0 ) - 0.5 )) * step( n2 * phase, 2.0 ) * 0.8;

	float emit = min( line + pattern, 1.0 );

	outEmission = vec3( emit * 20.0 * smoothstep( 0.4, 1.0, n) );

	#ifdef IS_FORWARD

		outColor = vec4( outEmission, 1.0 );

	#endif

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

}`,Wf=s({SkyBox:()=>Gf}),Gf=class extends Ft{material;constructor(e){super(e);let t=this.engine;this.material=new $t({name:`SkyBox`,phase:[`deferred`,`envMap`],frag:Jt(`SkyBoxFrag`,Uf),uniforms:Zt.merge(t.uniforms,{uAspectRatio:{value:0,type:`1f`}})}),t.renderer.sky.mesh.material=this.material}},Kf=`#define PI 3.14159265359\r
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

	outEmission += 0.35;
	outColor.w *= 0.2;
	
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

}`,qf=`#define PI 3.14159265359\r
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
mat2 rotate(float rad) {\r
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
}
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
uniform float uTimeEF;

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	outPos.xz *= 0.25;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );

	outPos += instancePos * vec3(15.0, 10.0, 15.0 );


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
vVelocity *= 0.2;

}`,Jf=s({GridCross:()=>Yf}),Yf=class extends Ft{constructor(e){super(e);let t=new It({width:.05,height:.5,depth:.05}),n=[],r=[],i=new j(16,2,16);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(Math.PI/2,0,0),n.push(o,s,c),r.push(0,0,Math.PI/2)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new $t({frag:Jt(`gridCrossFrag`,Kf),vert:Jt(`gridCrossVert`,qf),phase:[`forward`]});this.entity.addComponent(F,{geometry:t,material:a})}},Xf=`#define PI 3.14159265359\r
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

	outEmission += 0.35;

	outColor.w = 0.2;
	
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

}`,Zf=`#define PI 3.14159265359\r
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
mat2 rotate(float rad) {\r
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
}
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
uniform float uTimeEF;

layout (location=3) in vec3 instancePos;
layout (location=4) in vec3 instanceRot;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	outPos *= 0.25;
	outPos.yz *= rotate( instanceRot.x );
	outPos.xy *= rotate( instanceRot.z );
	
	outPos += instancePos * vec3(15.0, 5.0, 15.0 );


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
vVelocity *= 0.2;

}`,Qf=s({GridDots:()=>$f}),$f=class extends Ft{constructor(e){super(e);let t=new zt({radius:.1}),n=[],r=[],i=new j(32,2,32);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(0,0,0)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new $t({frag:Jt(`gridDotsFrag`,Xf),vert:Jt(`gridDotsVert`,Zf),phase:[`forward`]});this.entity.addComponent(F,{geometry:t,material:a})}},ep=`#define PI 3.14159265359\r
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
\r
	if( sin( vUv.y * 120.0 + uTimeE * 5.0 ) > 0.0 ) discard;\r
	\r
	outColor = vec4( 1.0 );\r
	outEmission += vec3( 10.0 );\r
	\r
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
}`,tp=`#define PI 3.14159265359\r
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
layout (location=3) in vec3 instancePos;\r
layout (location=4) in vec3 instanceRot;\r
\r
mat2 rotate(float rad) {\r
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
}\r
\r
void main( void ) {\r
\r
	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;\r
\r
	outPos += instancePos;\r
	outPos.yz *= rotate( instanceRot.x );\r
	outPos.xy *= rotate( instanceRot.z );\r
\r
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
}`,np=s({WireCube:()=>rp}),rp=class extends Ft{constructor(e){super(e);let t=this.engine,n=3.3,r=n/2,i=new It({width:.01,height:n,depth:.01,segmentsHeight:16}),a=[],o=[];for(let e=0;e<3;e++)for(let t=0;t<4;t++)[[r,0,r],[r,0,-1.65],[-1.65,0,r],[-1.65,0,-1.65]][t].forEach(e=>{a.push(e)}),[[0,0,0],[Math.PI/2,0,0],[0,0,Math.PI/2]][e].forEach(e=>{o.push(e)});i.setAttribute(`instancePos`,new Float32Array(a),3,{instanceDivisor:1}),i.setAttribute(`instanceRot`,new Float32Array(o),3,{instanceDivisor:1});let s=new $t({phase:[`deferred`],frag:ep,vert:tp,uniforms:Zt.merge(t.uniforms)});this.entity.addComponent(F,{geometry:i,material:s})}},ip=`#define PI 3.14159265359\r
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

uniform sampler2D uNoiseTex;

in float vNoise;
in vec3 vPosBase;

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

	vec4 noise = texture( uNoiseTex, vUv * 0.1 + 0.1 * texture( uNoiseTex, vUv * 0.5 ).xy );

	outRoughness = smoothstep( 0.2, 0.9, noise.x );
	outColor = vec4( 1.0 - ( outRoughness * 0.3 ) );

	outNormal.xz += noise.yz * 0.03;
	outNormal = normalize( outNormal );

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

}`,ap=`#define PI 3.14159265359\r
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
uniform float uTimeEF;
\r
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
}

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	// outPos.x += sin( outPos.z  * 10.0 + uTime * 10.0) * 0.1;

	float n = 1.0;
	n *= step( noiseValue( floor( outPos * 100.0 * 10.0 ) / 10.0 + uTime * 10.0 ), 0.5 );
	n *= step( noiseValue( floor( outPos * 1.0 * 10.0 ) / 10.0 + vec3( 0.0, 0.0, uTime * 3.0 ) ), 0.2 ) * 2.0;

	// outPos *= 1.0 + n;
	vPosBase = outPos;
	vNoise = n;

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
vVelocity *= 0.2;

}`,op=s({OREngineCube:()=>sp}),sp=class extends Ft{material;constructor(e){super(e);let t=this.engine;this.material=new $t({name:`OREngineCube`,phase:[`shadowMap`,`deferred`],vert:Jt(`OREngineCubeVert`,ap),frag:Jt(`OREngineCubeFrag`,ip),uniforms:Zt.merge(t.uniforms,{uNoiseTex:{value:xr.resources.getTexture(`noise`),type:`1i`}})});let n=this.entity.getComponent(F);n&&(n.material=this.material)}},cp=`#define PI 3.14159265359\r
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

in float vNoise;
in vec3 vPosBase;

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

	float or = step( vPosBase.x, -0.2 );
	float flash = smoothstep(0.3, 0.0,  vNoise) * or;

	outEmission = vec3( (1.0 - flash * 0.7) * 3.0 );
	outRoughness = 0.3;

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

}`,lp=`#define PI 3.14159265359\r
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
uniform float uTimeEF;
\r
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
}

out float vNoise;
out vec3 vPosBase;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	vPosBase = outPos;
	vNoise = noiseValue( vec3( uTimeE * 8.0 ) );

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
vVelocity *= 0.2;

}`,up=s({OREngineLogo:()=>dp}),dp=class extends Ft{material;constructor(e){super(e);let t=this.engine;this.material=new $t({name:`OREngineLogo`,phase:[`deferred`,`shadowMap`],vert:Jt(`OREngineLogoVert`,lp),frag:Jt(`OREngineLogoFrag`,cp),uniforms:Zt.merge(t.uniforms)});let n=this.entity.getComponent(F);n&&(n.material=this.material)}},fp=`#define PI 3.14159265359\r
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

in float vAlpha;

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

	float circle = smoothstep( 0.5, 0.4, length( gl_PointCoord.xy - 0.5 ) );
	
	if( circle == 0.0 ) discard;

	Geometry geo = Geometry(
		vPos,
		vec3( 0.0, 0.0, 0.0 ),
		0.0,
		normalize( uCameraPosition - vPos ),
		vec3( 0.0 ),
		0.0
	);

	vec3 color = vec3( 0.0 );
	float s = 0.0;

	outColor = vec4( vec3( 1.0 ), circle * 0.2 * ( vAlpha ) );

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

}`,pp=`#define PI 3.14159265359\r
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
uniform float uTimeEF;

out float vAlpha;

uniform vec2 uDeferredResolution;

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	float t = uTimeE * 0.1;
	outPos.x += sin( position.y * 2.3 + t * 2.0 ) * 0.4;
	outPos.y += sin( position.x * 1.0 + t * 1.0 ) * 0.3;
	
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
vVelocity *= 0.2;

	vAlpha = smoothstep( -20.0, -1.0, mvPosition.z);
	gl_PointSize = uDeferredResolution.y * 0.007 + uDeferredResolution.y * 0.02 * vAlpha;
	gl_PointSize *= 0.5;

}`,mp=s({Dust:()=>hp}),hp=class extends Ft{constructor(e){super(e);let t=this.engine,n=new P,r=e.args?.num||2048,i=new j(20,5,20),a=[],o=[];for(let e=0;e<r;e++)a.push((Math.random()-.5)*i.x),a.push((Math.random()-.5)*i.y),a.push((Math.random()-.5)*i.z),o.push(Math.random());n.setAttribute(`position`,new Float32Array(a),3);let s=new $t({phase:[`forward`],drawType:`POINTS`,frag:fp,vert:pp,uniforms:Zt.merge(t.uniforms)});this.entity.addComponent(F,{geometry:n,material:s})}dispose(){super.dispose(),this.entity.removeComponent(F)}},gp=`#define PI 3.14159265359\r
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

	outColor.xyz = vec3( 1.0 );

	#ifdef IS_FORWARD

		outColor = vec4( 0.5 );
	
	#endif

	outSSN = 1.0;

	
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

}`,_p=`#define PI 3.14159265359\r
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
uniform float uTimeEF;

layout (location = 3) in vec2 trailId;
layout (location = 4) in vec3 id;
layout (location = 5) in float posY;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform vec2 uGPUResolution;

mat2 rotate(float rad) {\r
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
}

void main( void ) {

	vec3 outPos = position;\r
vec3 outNormal = normal;\r
vec2 outUv = uv;

	float uid = id.x + id.y * 128.0;

	vec4 comPosBuffer = texture( uGPUSampler0, vec2( posY * 1.0, trailId ) );
	vec4 comVelBuffer = texture( uGPUSampler1, vec2( posY * 1.0, trailId ) );
    vec4 nextPosBuffer = texture( uGPUSampler0, vec2( posY - 1.0 / uGPUResolution.x, trailId ) );

	vec3 offsetPosition = comPosBuffer.xyz;

	// outPos.xz *= sin( trailId * TPI ) * 0.5 + 0.5;
	// outPos.xz *= sin( posY * PI ) * 1.0;
	
    vec3 delta = ( comPosBuffer.xyz - nextPosBuffer.xyz );
	vec3 vec = normalize( delta );

	mat2 offsetRot = rotate( PI / 2.0 );
	outPos.yz *= offsetRot;
	outNormal.yz *= offsetRot;

	mat3 rot = makeRotationDir(-vec, vec3( 0.0, -1.0, 0.0 ) );
	outPos *= rot;
	outNormal *= rot;

	outPos += offsetPosition;

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
vVelocity *= 0.2;
	
}`,vp=`#define PI 3.14159265359\r
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
\r
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
  }

layout (location = 0) out vec4 outColor0;
layout (location = 1) out vec4 outColor1;

uniform sampler2D uGPUSampler0;
uniform sampler2D uGPUSampler1;
uniform float uTimeE;
uniform vec2 uGPUResolution;

in vec2 vUv;

mat2 rotate(float rad) {\r
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
}

void main( void ) {

	float t = uTimeE * 0.4;
	float id = vUv.y;

	vec4 position = texture( uGPUSampler0, vUv );
	vec4 velocity = texture( uGPUSampler1, vUv );

	float pixelX = 1.0 / uGPUResolution.x;


	float posOffset = id * 0.5;
	float tOffset = t + id * 0.8;

	vec3 pos = position.xyz;
	vec3 np = pos * 0.23;

	vec3 noise = vec3(
		noiseSimplex( vec4( np, tOffset) ),
		noiseSimplex( vec4( np + 123.4, tOffset) ),
		noiseSimplex( vec4( np + 567.8, tOffset) )
	);
	noise = normalize( noise ) * ( 0.002 + id * 0.001 );

	// velocity

	if( vUv.x < pixelX ) {

		vec3 gPos = pos * vec3( 1.0, 1.0, 5.0 ) - vec3( 0.0, 0.0, 3.0 );

		velocity.xyz += noise;
		velocity.xyz += smoothstep( 0.0, 6.0, length( gPos ) ) * - gPos * 0.002;
		velocity.xyz += smoothstep( 1.5, 0.5, length( gPos.xyz ) ) * gPos.xyz * 0.02;
		velocity.xyz *= 0.98;

	}
	
	//  position

	if( vUv.x < pixelX ) {

		position.xyz += velocity.xyz;
		
	} else {

		vec3 t1 = texture( uGPUSampler0, vUv - vec2( pixelX * 1.5, 0.0 ) ).xyz;
		vec3 t2 =  texture( uGPUSampler0, vUv - vec2( pixelX * 1.5 - 0.05, 0.0 ) ).xyz;

		position.xyz = mix( t1, t2, 0.1 );
		position.xyz += noise * 5.0;
		
	}

	// lifetime

	if( position.w > 1.0 ) {
	
		// position = vec4( 5.0, 0.0, 0.0, 0.0 );
		// position.xz *= rotate( vUv.x * TPI * 20.0 - uTimeE * 0.02 );
		// velocity = vec4( 0.0 );

	}

	position.w += 0.016 / 10.0;

	// out

	outColor0 = position;
	outColor1 = velocity;

} `,yp=s({YakiSoba:()=>bp}),bp=class extends Ft{_gpu;constructor(e){super(e);let t=this.engine,n=new j(64,512);this._gpu=new zn({passes:[new Bn(t.renderer.backend,{name:`yakisoba`,size:n,dataLayerCount:2,frag:Jt(`yakiSobaCompute`,vp),uniforms:Zt.merge({},t.uniforms,t.renderer.globalUniforms)})]}),this._gpu.passes[0].initTexture((e,t,n)=>[0,0,0,0]);let r=new It({width:.05,height:.05,depth:.05,segmentsHeight:n.x}),i=[],a=[];for(let e=0;e<n.y;e++)i.push(e/n.y),a.push(Math.random(),Math.random(),Math.random());r.setAttribute(`trailId`,new Float32Array(i),1,{instanceDivisor:1}),r.setAttribute(`id`,new Float32Array(a),3,{instanceDivisor:1});let o=new $t({frag:Jt(`chainFrag`,gp),vert:Jt(`chainVert`,_p),phase:[`deferred`,`shadowMap`],uniforms:Zt.merge({},this._gpu.passes[0].outputUniforms)});this.entity.addComponent(F,{geometry:r,material:o})}updateImpl(e){this.entity.isVisibleTraverse()&&this._gpu.compute(e.renderer)}dispose(){super.dispose(),this.entity.removeComponent(F),this._gpu.dispose()}},xp=s({CameraController:()=>Sp}),Sp=class extends Ft{_lookAt;_lookAtTargetUUID;_dofTarget;_dofTargetUUID;_tmpVector1;_tmpVector2;_focusMode;_focusDistance;_focusSpeed;_focusCurrent;constructor(e){super(e),this._lookAt=this.entity.addComponent(Ua),this._lookAtTargetUUID=null,this.fieldDir(`lookAt`).field(`target`,()=>this._lookAtTargetUUID,e=>{this._lookAtTargetUUID=e||null,this._lookAt.setTarget(null)},{format:{type:`entity`}}),this._dofTarget=null,this._dofTargetUUID=null,this._tmpVector1=new j,this._tmpVector2=new j,this._focusMode=`auto`,this._focusDistance=5,this._focusSpeed=8,this._focusCurrent=null;let t=this.fieldDir(`focus`);t.field(`mode`,()=>this._focusMode,e=>{this._focusMode=e},{format:{type:`select`,list:[`auto`,`target`,`manual`]}}),t.field(`target`,()=>this._dofTargetUUID,e=>{this._dofTargetUUID=e||null,this._dofTarget=null},{format:{type:`entity`}}),t.field(`distance`,()=>this._focusDistance,e=>{this._focusDistance=e},{step:.1}),t.field(`speed`,()=>this._focusSpeed,e=>{this._focusSpeed=e},{step:.5});let n=gr(this.engine,this.entity);this.once(`dispose`,()=>{n()})}_resolveTargets(){if(!this._lookAtTargetUUID&&!this._dofTargetUUID)return;let e=this.entity.getRootEntity();this._lookAtTargetUUID&&!this._lookAt.target&&this._lookAt.setTarget(e.findEntityByUUID(this._lookAtTargetUUID)||null),this._dofTargetUUID&&!this._dofTarget&&(this._dofTarget=e.findEntityByUUID(this._dofTargetUUID)||null)}updateImpl(){this._resolveTargets()}get focusMode(){return this._focusMode}set focusMode(e){this._focusMode=e}get focusDistance(){return this._focusDistance}set focusDistance(e){this._focusDistance=e}get focusSpeed(){return this._focusSpeed}set focusSpeed(e){this._focusSpeed=e}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=this._resolveFocusTarget(e);n!==null&&(this._focusCurrent===null||this._focusSpeed<=0?this._focusCurrent=n:this._focusCurrent+=(n-this._focusCurrent)*(1-Math.exp(-this._focusSpeed*e.timeDelta)),t.dofParams.focusDistance=this._focusCurrent)}_resolveFocusTarget(e){if(this._focusMode===`manual`)return this._focusDistance;if(this._focusMode===`auto`){let t=e.renderer.centerDepth;if(typeof t==`number`)return t}if(!this._dofTarget)return null;this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget.matrixWorld.decompose(this._tmpVector2),this._tmpVector2.sub(this._tmpVector1);let t=this.entity.matrixWorld.elm;return this._tmpVector1.set(t[8],t[9],t[10]).normalize(),-this._tmpVector2.dot(this._tmpVector1)}dispose(){super.dispose(),this.entity.removeComponent(Ua)}},Cp=s({CameraOrbitAnim:()=>wp}),wp=class extends Ft{time;radius;heightAmp;speed;baseHeight;constructor(e){super(e),this.time=0,this.radius=6,this.heightAmp=2,this.speed=.3,this.baseHeight=1.5,this.field(`radius`,()=>this.radius,e=>this.radius=e),this.field(`heightAmp`,()=>this.heightAmp,e=>this.heightAmp=e),this.field(`speed`,()=>this.speed,e=>this.speed=e),this.field(`baseHeight`,()=>this.baseHeight,e=>this.baseHeight=e)}updateImpl(e){this.time+=e.timeDelta;let t=this.time*this.speed,n=Math.cos(t)*this.radius,r=Math.sin(t)*this.radius,i=this.baseHeight+Math.sin(t*1.7)*this.heightAmp;this.entity.position.set(n,i,r),this.entity.lookAt(new j(0,0,0))}},Tp=s({ShakeViewer:()=>Ep}),Ep=class extends Ft{shakePower;shakeSpeed;shakeMatrix;cameraMatrixWorld;shakeQua;constructor(e){super(e),this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new M,this.cameraMatrixWorld=new M,this.shakeQua=new ut,this.order=1e3,this.field(`power`,()=>this.shakePower,e=>this.shakePower=e),this.field(`speed`,()=>this.shakeSpeed,e=>this.shakeSpeed=e)}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=.008*this.shakePower;n*=t.fov/50;let r=e.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(r*2)*n,y:Math.sin(r*2.5)*n,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.cameraMatrixWorld.copy(this.entity.matrixWorld).multiply(this.shakeMatrix),t.viewMatrix.copy(this.cameraMatrixWorld).inverse()}},Dp=s({ObjectRotate:()=>Op}),Op=class extends Ft{speed;rotQuaternion;constructor(e){super(e),this.speed=1,this.rotQuaternion=new ut}updateImpl(e){this.rotQuaternion.setFromEuler(new lt(0,-.4*e.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}},kp=s({BLidgeClient:()=>Ap}),Ap=class e extends Ft{blidge;type;blidgeRoot;entities;attachments;_attachmentsApplied;_unresolvedByEntity;static sceneData=null;connection;useGLTF;gltfPath;constructor(t){super(t),this.entities=new Map,this.attachments=[],this._attachmentsApplied=!1,this._unresolvedByEntity=new Map,this.type=`websocket`,this.connection={enabled:!0,url:`ws://localhost:3100`},this.useGLTF=!1,this.gltfPath=`/OREngine/pr-preview/pr-48/scene.glb`,this.blidgeRoot=null,this.blidge=new Nt(this.engine);let n=this.onSyncScene.bind(this),r=e=>{this.entity&&this.entity.noticeEventParent(`update/blidge/frame`,[e])};this.blidge.on(`sync/scene`,n),this.blidge.on(`sync/timeline`,r),this.once(`dispose`,()=>{this.blidge.off(`sync/scene`,n),this.blidge.off(`sync/timeline`,r)});let i=async()=>{if(this.type==`json`){let t=e.sceneData;if(!t){let e=await fetch(`/OREngine/pr-preview/pr-48/blidge-scene.json`);if(!e.ok){console.warn(`BLidgeClient: failed to load /blidge-scene.json (${e.status})`);return}t=await e.json()}await this.blidge.loadScene(t,this.useGLTF?this.gltfPath:void 0),this.emit(`loaded`)}else this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field(`mode`,()=>this.type,e=>{this.type=e,i()},{format:{type:`select`,list:[`websocket`,`json`]}}),this.field(`gltf`,()=>this.useGLTF,e=>{this.useGLTF=e,i()}),this.field(`gltfPath`,()=>this.gltfPath,e=>{this.gltfPath=e,i()});let a=this.fieldDir(`websocket`,{hidden:()=>this.type!=`websocket`});a.field(`reconnect`,()=>()=>i(),void 0,{label:`Reconnect`}),a.field(`url`,()=>this.connection.url,e=>this.connection.url=e),this.field(`attachments`,()=>!this.blidgeRoot||!this._attachmentsApplied?this.attachments:this.serializeAttachments(),e=>{this.attachments=e||[],this._attachmentsApplied=!1,this._unresolvedByEntity.clear()},{hidden:!0})}serializeAttachments(){if(!this.blidgeRoot)return[];let e={getName:e=>{let t=xr.resources.componentList.find(t=>e instanceof t.component);return t?t.name:e.constructor.name}},t=[];return this.blidgeRoot.traverse(n=>{let r=[];n.components.forEach(t=>{if(t.initiator!==`user`)return;let n=t.serialize({mode:`export`}),i=Object.keys(n).length>0,a={name:e.getName(t),uuid:t.uuid};i&&(a.props=n),r.push(a)});let i=this._unresolvedByEntity.get(n.name);i&&r.push(...i),r.length>0&&t.push({name:n.name,components:r})}),t}applyAttachments(e){if(this._unresolvedByEntity.clear(),!this.attachments.length)return;let t=new Map;this.attachments.forEach(e=>t.set(e.name,e)),e.traverse(e=>{let n=t.get(e.name);n&&n.components.forEach(t=>{let n=xr.resources.getComponent(t.name);if(n){e.removeComponent(n.component);let r=e.addComponent(n.component);r.initiator=`user`,r.restoreUUID(t.uuid),t.props&&r.deserialize(t.props)}else{console.warn(`[BLidgeClient] unresolved attachment component "${t.name}" on entity "${e.name}". Preserving data for round-trip.`);let n=this._unresolvedByEntity.get(e.name)||[];n.push({name:t.name,uuid:t.uuid,props:t.props}),this._unresolvedByEntity.set(e.name,n)}})})}async onSyncScene(e){this._attachmentsApplied=!1;let t=new Date().getTime(),n=r=>{let i=this.entities.get(r.name)||this.engine.createEntity();if(r.type==`camera`){let e=r.param;i.userData.cameraParam=e}return i.removeComponent(Wt),i.addComponent(Wt,{blidge:e,node:r}),r.children.forEach(e=>{let t=n(e);i.add(t)}),this.entities.set(i.name,i),i.userData.updateTime=t,i},r=e.root&&n(e.root);r&&(r.name=`blidgeRoot`,this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=r,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(e=>{if(e.userData.updateTime!=t){let t=e.parent;t&&t.remove(e),e.dispose(),this.entities.delete(e.name)}}),e.gltf&&await e.gltfPrm,this.blidgeRoot&&(this.applyAttachments(this.blidgeRoot),this._attachmentsApplied=!0),this.entity&&(this.entity.noticeEventChilds(`sceneCreated`,[this.blidgeRoot]),this.entity.noticeEventParent(`update/blidge/scene`,[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&=(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),null),this._attachmentsApplied=!1,this._unresolvedByEntity.clear()}},jp=s({Cube:()=>Mp}),Mp=class extends It{},Np=s({Cylinder:()=>Pp}),Pp=class extends Lt{},Fp=s({Plane:()=>Ip}),Ip=class extends Rt{},Lp=s({Sphere:()=>Rp}),Rp=class extends zt{},zp=yr(Object.assign({"./Components/Camera/CameraController/index.ts":xp,"./Components/Camera/CameraOrbitAnim/index.ts":Cp,"./Components/Camera/CameraShake/index.ts":Tp,"./Components/Camera/LookAt/index.ts":Ha,"./Components/Camera/OrbitControls/index.ts":Wa,"./Components/Object/ObjectRotate/index.ts":Dp,"./Components/Utility/BLidgeClient/index.ts":kp}),`Components`),Bp=yr(Object.assign({"./Geometries/Cube/index.ts":jp,"./Geometries/Cylinder/index.ts":Np,"./Geometries/Plane/index.ts":Fp,"./Geometries/Sphere/index.ts":Lp}),`Geometries`),Vp={name:`hash`,resolution:[512,512],filter:`nearest`,updateEveryFrame:!1,frag:`#define PI 3.14159265359\r
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
}\r
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
} `},Hp={name:`noise`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!0,frag:`#define PI 3.14159265359\r
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
}\r
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
} `},Up=`#define PI 3.14159265359\r
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
}\r
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
} `,Wp=Object.assign({"../../demo-webgl/Resources/Textures/hash.tex":Vp,"../../demo-webgl/Resources/Textures/noise.tex":Hp,"../../demo-webgl/Resources/Textures/noiseCyclic.tex":{name:`noiseCyclic`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!1,frag:Up},"../../demo-webgl/Resources/Textures/noiseCyclicAnime.tex":{name:`noiseCyclicAnime`,resolution:[512,512],filter:`linear`,updateEveryFrame:!0,frag:Up}}),Gp=()=>{for(let e of Object.values(Wp))e&&xr.resources.addTextureResource(e.name,{frag:e.frag,resolution:e.resolution||[1024,1024],filter:e.filter,updateEveryFrame:e.updateEveryFrame,textures:e.textures})},Kp=e=>{xr.resources.buildTextureInstances(e.renderer,e.uniforms)},qp=Object.assign({"../../demo-webgl/Resources/Components/Samples/Effects/EyeRings/index.ts":Lf,"../../demo-webgl/Resources/Components/Samples/Effects/FlashLine/index.ts":Vf,"../../demo-webgl/Resources/Components/Samples/Environment/SkyBox/index.ts":Wf,"../../demo-webgl/Resources/Components/Samples/Geometry/GridCross/index.ts":Jf,"../../demo-webgl/Resources/Components/Samples/Geometry/GridDots/index.ts":Qf,"../../demo-webgl/Resources/Components/Samples/Geometry/WireCube/index.ts":np,"../../demo-webgl/Resources/Components/Samples/Objects/OREngineCube/index.ts":op,"../../demo-webgl/Resources/Components/Samples/Objects/OREngineLogo/index.ts":up,"../../demo-webgl/Resources/Components/Samples/Particles/Dust/index.ts":mp,"../../demo-webgl/Resources/Components/Samples/Particles/YakiSoba/index.ts":yp}),Jp=Object.assign({}),Yp=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];typeof a==`function`?t.addComponent(i,a):Yp(a,t.createGroup(i))}},Xp=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];typeof a==`function`?t.addGeometry(i,a):Xp(a,t.createGroup(i))}};document.title=`demo-webgl`,(()=>{Nt.gltfLoaderFactory=e=>new ar(e),xr.resources.clear();let e=xr.resources.addComponentGroup(`_Built-in`);e.addComponent(`Light`,Ht),e.addComponent(`Camera`,Bt),e.addComponent(`Mesh`,F);let t=Object.keys(zp);for(let e=0;e<t.length;e++){let n=t[e],r=zp[n];Yp(r,xr.resources.addComponentGroup(n))}let n=Object.keys(Bp);for(let e=0;e<n.length;e++){let t=n[e],r=Bp[t];Xp(r,xr.resources.addGeometryGroup(t))}let r=yr(qp,`Components`),i=Object.keys(r);for(let e=0;e<i.length;e++){let t=i[e],n=r[t];Yp(n,xr.resources.addComponentGroup(t))}let a=yr(Jp,`Geometries`),o=Object.keys(a);for(let e=0;e<o.length;e++){let t=o[e],n=a[t];Xp(n,xr.resources.addGeometryGroup(t))}Gp()})(),_.createRoot(document.getElementById(`root`)).render((0,E.jsx)(Pf,{projectName:`demo-webgl`,sceneData:y,editorData:v,initResourceInstances:Kp}));