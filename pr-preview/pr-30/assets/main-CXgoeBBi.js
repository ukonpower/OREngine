var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.provider`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.iterator;function p(e){return typeof e!=`object`||!e?null:(e=f&&e[f]||e[`@@iterator`],typeof e==`function`?e:null)}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h=Object.assign,g={};function _(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`setState(...): takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function v(){}v.prototype=_.prototype;function y(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}var b=y.prototype=new v;b.constructor=y,h(b,_.prototype),b.isPureReactComponent=!0;var x=Array.isArray,S=Object.prototype.hasOwnProperty,C={current:null},w={key:!0,ref:!0,__self:!0,__source:!0};function T(e,n,r){var i,a={},o=null,s=null;if(n!=null)for(i in n.ref!==void 0&&(s=n.ref),n.key!==void 0&&(o=``+n.key),n)S.call(n,i)&&!w.hasOwnProperty(i)&&(a[i]=n[i]);var c=arguments.length-2;if(c===1)a.children=r;else if(1<c){for(var l=Array(c),u=0;u<c;u++)l[u]=arguments[u+2];a.children=l}if(e&&e.defaultProps)for(i in c=e.defaultProps,c)a[i]===void 0&&(a[i]=c[i]);return{$$typeof:t,type:e,key:o,ref:s,props:a,_owner:C.current}}function E(e,n){return{$$typeof:t,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function ee(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var D=/\/+/g;function O(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function ne(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0}}if(c)return c=e,o=o(c),e=a===``?`.`+O(c,0):a,x(o)?(i=``,e!=null&&(i=e.replace(D,`$&/`)+`/`),ne(o,r,i,``,function(e){return e})):o!=null&&(ee(o)&&(o=E(o,i+(!o.key||c&&c.key===o.key?``:(``+o.key).replace(D,`$&/`)+`/`)+e)),r.push(o)),1;if(c=0,a=a===``?`.`:a+`:`,x(e))for(var l=0;l<e.length;l++){s=e[l];var u=a+O(s,l);c+=ne(s,r,i,u,o)}else if(u=p(e),typeof u==`function`)for(e=u.call(e),l=0;!(s=e.next()).done;)s=s.value,u=a+O(s,l++),c+=ne(s,r,i,u,o);else if(s===`object`)throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`);return c}function re(e,t,n){if(e==null)return e;var r=[],i=0;return ne(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ie(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ae={current:null},k={transition:null},oe={ReactCurrentDispatcher:ae,ReactCurrentBatchConfig:k,ReactCurrentOwner:C};function se(){throw Error(`act(...) is not supported in production builds of React.`)}e.Children={map:re,forEach:function(e,t,n){re(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return re(e,function(){t++}),t},toArray:function(e){return re(e,function(e){return e})||[]},only:function(e){if(!ee(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}},e.Component=_,e.Fragment=r,e.Profiler=a,e.PureComponent=y,e.StrictMode=i,e.Suspense=l,e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oe,e.act=se,e.cloneElement=function(e,n,r){if(e==null)throw Error(`React.cloneElement(...): The argument must be a React element, but you passed `+e+`.`);var i=h({},e.props),a=e.key,o=e.ref,s=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,s=C.current),n.key!==void 0&&(a=``+n.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(l in n)S.call(n,l)&&!w.hasOwnProperty(l)&&(i[l]=n[l]===void 0&&c!==void 0?c[l]:n[l])}var l=arguments.length-2;if(l===1)i.children=r;else if(1<l){c=Array(l);for(var u=0;u<l;u++)c[u]=arguments[u+2];i.children=c}return{$$typeof:t,type:e.type,key:a,ref:o,props:i,_owner:s}},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:o,_context:e},e.Consumer=e},e.createElement=T,e.createFactory=function(e){var t=T.bind(null,e);return t.type=e,t},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ee,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ie}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=k.transition;k.transition={};try{e()}finally{k.transition=t}},e.unstable_act=se,e.useCallback=function(e,t){return ae.current.useCallback(e,t)},e.useContext=function(e){return ae.current.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e){return ae.current.useDeferredValue(e)},e.useEffect=function(e,t){return ae.current.useEffect(e,t)},e.useId=function(){return ae.current.useId()},e.useImperativeHandle=function(e,t,n){return ae.current.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return ae.current.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return ae.current.useLayoutEffect(e,t)},e.useMemo=function(e,t){return ae.current.useMemo(e,t)},e.useReducer=function(e,t,n){return ae.current.useReducer(e,t,n)},e.useRef=function(e){return ae.current.useRef(e)},e.useState=function(e){return ae.current.useState(e)},e.useSyncExternalStore=function(e,t,n){return ae.current.useSyncExternalStore(e,t,n)},e.useTransition=function(){return ae.current.useTransition()},e.version=`18.3.1`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=typeof setTimeout==`function`?setTimeout:null,_=typeof clearTimeout==`function`?clearTimeout:null,v=typeof setImmediate<`u`?setImmediate:null;typeof navigator<`u`&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function b(e){if(h=!1,y(e),!m)if(n(c)!==null)m=!0,re(x);else{var t=n(l);t!==null&&ie(b,t.startTime-e)}}function x(t,i){m=!1,h&&(h=!1,_(w),w=-1),p=!0;var a=f;try{for(y(i),d=n(c);d!==null&&(!(d.expirationTime>i)||t&&!ee());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=i);i=e.unstable_now(),typeof s==`function`?d.callback=s:d===n(c)&&r(c),y(i)}else r(c);d=n(c)}if(d!==null)var u=!0;else{var g=n(l);g!==null&&ie(b,g.startTime-i),u=!1}return u}finally{d=null,f=a,p=!1}}var S=!1,C=null,w=-1,T=5,E=-1;function ee(){return!(e.unstable_now()-E<T)}function te(){if(C!==null){var t=e.unstable_now();E=t;var n=!0;try{n=C(!0,t)}finally{n?D():(S=!1,C=null)}}else S=!1}var D;if(typeof v==`function`)D=function(){v(te)};else if(typeof MessageChannel<`u`){var O=new MessageChannel,ne=O.port2;O.port1.onmessage=te,D=function(){ne.postMessage(null)}}else D=function(){g(te,0)};function re(e){C=e,S||(S=!0,D())}function ie(t,n){w=g(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_continueExecution=function(){m||p||(m=!0,re(x))},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):T=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(c)},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(_(w),w=-1):h=!0,ie(b,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,re(x))),r},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d(),n=p();function r(e){for(var t=`https://reactjs.org/docs/error-decoder.html?invariant=`+e,n=1;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n]);return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}var i=new Set,a={};function o(e,t){s(e,t),s(e+`Capture`,t)}function s(e,t){for(a[e]=t,e=0;e<t.length;e++)i.add(t[e])}var c=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),l=Object.prototype.hasOwnProperty,u=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,f={},m={};function h(e){return l.call(m,e)?!0:l.call(f,e)?!1:u.test(e)?m[e]=!0:(f[e]=!0,!1)}function g(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case`function`:case`symbol`:return!0;case`boolean`:return r?!1:n===null?(e=e.toLowerCase().slice(0,5),e!==`data-`&&e!==`aria-`):!n.acceptsBooleans;default:return!1}}function _(e,t,n,r){if(t==null||g(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function v(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var y={};`children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style`.split(` `).forEach(function(e){y[e]=new v(e,0,!1,e,null,!1,!1)}),[[`acceptCharset`,`accept-charset`],[`className`,`class`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`]].forEach(function(e){var t=e[0];y[t]=new v(t,1,!1,e[1],null,!1,!1)}),[`contentEditable`,`draggable`,`spellCheck`,`value`].forEach(function(e){y[e]=new v(e,2,!1,e.toLowerCase(),null,!1,!1)}),[`autoReverse`,`externalResourcesRequired`,`focusable`,`preserveAlpha`].forEach(function(e){y[e]=new v(e,2,!1,e,null,!1,!1)}),`allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope`.split(` `).forEach(function(e){y[e]=new v(e,3,!1,e.toLowerCase(),null,!1,!1)}),[`checked`,`multiple`,`muted`,`selected`].forEach(function(e){y[e]=new v(e,3,!0,e,null,!1,!1)}),[`capture`,`download`].forEach(function(e){y[e]=new v(e,4,!1,e,null,!1,!1)}),[`cols`,`rows`,`size`,`span`].forEach(function(e){y[e]=new v(e,6,!1,e,null,!1,!1)}),[`rowSpan`,`start`].forEach(function(e){y[e]=new v(e,5,!1,e.toLowerCase(),null,!1,!1)});var b=/[\-:]([a-z])/g;function x(e){return e[1].toUpperCase()}`accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height`.split(` `).forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,null,!1,!1)}),`xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type`.split(` `).forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,`http://www.w3.org/1999/xlink`,!1,!1)}),[`xml:base`,`xml:lang`,`xml:space`].forEach(function(e){var t=e.replace(b,x);y[t]=new v(t,1,!1,e,`http://www.w3.org/XML/1998/namespace`,!1,!1)}),[`tabIndex`,`crossOrigin`].forEach(function(e){y[e]=new v(e,1,!1,e.toLowerCase(),null,!1,!1)}),y.xlinkHref=new v(`xlinkHref`,1,!1,`xlink:href`,`http://www.w3.org/1999/xlink`,!0,!1),[`src`,`href`,`action`,`formAction`].forEach(function(e){y[e]=new v(e,1,!1,e.toLowerCase(),null,!0,!0)});function S(e,t,n,r){var i=y.hasOwnProperty(t)?y[t]:null;(i===null?r||!(2<t.length)||t[0]!==`o`&&t[0]!==`O`||t[1]!==`n`&&t[1]!==`N`:i.type!==0)&&(_(t,n,i,r)&&(n=null),r||i===null?h(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,``+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type!==3&&``:n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&!0===n?``:``+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var C=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,w=Symbol.for(`react.element`),T=Symbol.for(`react.portal`),E=Symbol.for(`react.fragment`),ee=Symbol.for(`react.strict_mode`),te=Symbol.for(`react.profiler`),D=Symbol.for(`react.provider`),O=Symbol.for(`react.context`),ne=Symbol.for(`react.forward_ref`),re=Symbol.for(`react.suspense`),ie=Symbol.for(`react.suspense_list`),ae=Symbol.for(`react.memo`),k=Symbol.for(`react.lazy`),oe=Symbol.for(`react.offscreen`),se=Symbol.iterator;function ce(e){return typeof e!=`object`||!e?null:(e=se&&e[se]||e[`@@iterator`],typeof e==`function`?e:null)}var A=Object.assign,le;function ue(e){if(le===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);le=t&&t[1]||``}return`
`+le+e}var de=!1;function fe(e,t){if(!e||de)return``;de=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(t){if(t&&r&&typeof t.stack==`string`){for(var i=t.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,s=a.length-1;1<=o&&0<=s&&i[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||i[o]!==a[s]){var c=`
`+i[o].replace(` at new `,` at `);return e.displayName&&c.includes(`<anonymous>`)&&(c=c.replace(`<anonymous>`,e.displayName)),c}while(1<=o&&0<=s);break}}}finally{de=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:``)?ue(e):``}function pe(e){switch(e.tag){case 5:return ue(e.type);case 16:return ue(`Lazy`);case 13:return ue(`Suspense`);case 19:return ue(`SuspenseList`);case 0:case 2:case 15:return e=fe(e.type,!1),e;case 11:return e=fe(e.type.render,!1),e;case 1:return e=fe(e.type,!0),e;default:return``}}function me(e){if(e==null)return null;if(typeof e==`function`)return e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case E:return`Fragment`;case T:return`Portal`;case te:return`Profiler`;case ee:return`StrictMode`;case re:return`Suspense`;case ie:return`SuspenseList`}if(typeof e==`object`)switch(e.$$typeof){case O:return(e.displayName||`Context`)+`.Consumer`;case D:return(e._context.displayName||`Context`)+`.Provider`;case ne:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ae:return t=e.displayName||null,t===null?me(e.type)||`Memo`:t;case k:t=e._payload,e=e._init;try{return me(e(t))}catch{}}return null}function he(e){var t=e.type;switch(e.tag){case 24:return`Cache`;case 9:return(t.displayName||`Context`)+`.Consumer`;case 10:return(t._context.displayName||`Context`)+`.Provider`;case 18:return`DehydratedFragment`;case 11:return e=t.render,e=e.displayName||e.name||``,t.displayName||(e===``?`ForwardRef`:`ForwardRef(`+e+`)`);case 7:return`Fragment`;case 5:return t;case 4:return`Portal`;case 3:return`Root`;case 6:return`Text`;case 16:return me(t);case 8:return t===ee?`StrictMode`:`Mode`;case 22:return`Offscreen`;case 12:return`Profiler`;case 21:return`Scope`;case 13:return`Suspense`;case 19:return`SuspenseList`;case 25:return`TracingMarker`;case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t==`function`)return t.displayName||t.name||null;if(typeof t==`string`)return t}return null}function ge(e){switch(typeof e){case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function _e(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function ve(e){var t=_e(e)?`checked`:`value`,n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=``+e[t];if(!e.hasOwnProperty(t)&&n!==void 0&&typeof n.get==`function`&&typeof n.set==`function`){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ye(e){e._valueTracker||=ve(e)}function be(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=_e(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function xe(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Se(e,t){var n=t.checked;return A({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ce(e,t){var n=t.defaultValue==null?``:t.defaultValue,r=t.checked==null?t.defaultChecked:t.checked;n=ge(t.value==null?n:t.value),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type===`checkbox`||t.type===`radio`?t.checked!=null:t.value!=null}}function we(e,t){t=t.checked,t!=null&&S(e,`checked`,t,!1)}function Te(e,t){we(e,t);var n=ge(t.value),r=t.type;if(n!=null)r===`number`?(n===0&&e.value===``||e.value!=n)&&(e.value=``+n):e.value!==``+n&&(e.value=``+n);else if(r===`submit`||r===`reset`){e.removeAttribute(`value`);return}t.hasOwnProperty(`value`)?De(e,t.type,n):t.hasOwnProperty(`defaultValue`)&&De(e,t.type,ge(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ee(e,t,n){if(t.hasOwnProperty(`value`)||t.hasOwnProperty(`defaultValue`)){var r=t.type;if(!(r!==`submit`&&r!==`reset`||t.value!==void 0&&t.value!==null))return;t=``+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==``&&(e.name=``),e.defaultChecked=!!e._wrapperState.initialChecked,n!==``&&(e.name=n)}function De(e,t,n){(t!==`number`||xe(e.ownerDocument)!==e)&&(n==null?e.defaultValue=``+e._wrapperState.initialValue:e.defaultValue!==``+n&&(e.defaultValue=``+n))}var Oe=Array.isArray;function ke(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+ge(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ae(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(r(91));return A({},t,{value:void 0,defaultValue:void 0,children:``+e._wrapperState.initialValue})}function je(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(r(92));if(Oe(n)){if(1<n.length)throw Error(r(93));n=n[0]}t=n}t??=``,n=t}e._wrapperState={initialValue:ge(n)}}function Me(e,t){var n=ge(t.value),r=ge(t.defaultValue);n!=null&&(n=``+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=``+r)}function Ne(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==``&&t!==null&&(e.value=t)}function Pe(e){switch(e){case`svg`:return`http://www.w3.org/2000/svg`;case`math`:return`http://www.w3.org/1998/Math/MathML`;default:return`http://www.w3.org/1999/xhtml`}}function Fe(e,t){return e==null||e===`http://www.w3.org/1999/xhtml`?Pe(t):e===`http://www.w3.org/2000/svg`&&t===`foreignObject`?`http://www.w3.org/1999/xhtml`:e}var Ie,Le=function(e){return typeof MSApp<`u`&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!==`http://www.w3.org/2000/svg`||`innerHTML`in e)e.innerHTML=t;else{for(Ie||=document.createElement(`div`),Ie.innerHTML=`<svg>`+t.valueOf().toString()+`</svg>`,t=Ie.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Re(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ze={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Be=[`Webkit`,`ms`,`Moz`,`O`];Object.keys(ze).forEach(function(e){Be.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ze[t]=ze[e]})});function Ve(e,t,n){return t==null||typeof t==`boolean`||t===``?``:n||typeof t!=`number`||t===0||ze.hasOwnProperty(e)&&ze[e]?(``+t).trim():t+`px`}function He(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=n.indexOf(`--`)===0,i=Ve(n,t[n],r);n===`float`&&(n=`cssFloat`),r?e.setProperty(n,i):e[n]=i}}var Ue=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function We(e,t){if(t){if(Ue[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(r(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(r(60));if(typeof t.dangerouslySetInnerHTML!=`object`||!(`__html`in t.dangerouslySetInnerHTML))throw Error(r(61))}if(t.style!=null&&typeof t.style!=`object`)throw Error(r(62))}}function Ge(e,t){if(e.indexOf(`-`)===-1)return typeof t.is==`string`;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Ke=null;function qe(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Je=null,Ye=null,Xe=null;function Ze(e){if(e=Ui(e)){if(typeof Je!=`function`)throw Error(r(280));var t=e.stateNode;t&&(t=Gi(t),Je(e.stateNode,e.type,t))}}function Qe(e){Ye?Xe?Xe.push(e):Xe=[e]:Ye=e}function $e(){if(Ye){var e=Ye,t=Xe;if(Xe=Ye=null,Ze(e),t)for(e=0;e<t.length;e++)Ze(t[e])}}function et(e,t){return e(t)}function tt(){}var nt=!1;function rt(e,t,n){if(nt)return e(t,n);nt=!0;try{return et(e,t,n)}finally{nt=!1,(Ye!==null||Xe!==null)&&(tt(),$e())}}function it(e,t){var n=e.stateNode;if(n===null)return null;var i=Gi(n);if(i===null)return null;n=i[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(i=!i.disabled)||(e=e.type,i=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!i;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(r(231,t,typeof n));return n}var at=!1;if(c)try{var ot={};Object.defineProperty(ot,"passive",{get:function(){at=!0}}),window.addEventListener(`test`,ot,ot),window.removeEventListener(`test`,ot,ot)}catch{at=!1}function j(e,t,n,r,i,a,o,s,c){var l=Array.prototype.slice.call(arguments,3);try{t.apply(n,l)}catch(e){this.onError(e)}}var M=!1,N=null,st=!1,ct=null,lt={onError:function(e){M=!0,N=e}};function ut(e,t,n,r,i,a,o,s,c){M=!1,N=null,j.apply(lt,arguments)}function dt(e,t,n,i,a,o,s,c,l){if(ut.apply(this,arguments),M){if(M){var u=N;M=!1,N=null}else throw Error(r(198));st||(st=!0,ct=u)}}function ft(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function pt(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function mt(e){if(ft(e)!==e)throw Error(r(188))}function ht(e){var t=e.alternate;if(!t){if(t=ft(e),t===null)throw Error(r(188));return t===e?e:null}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return mt(a),e;if(o===i)return mt(a),t;o=o.sibling}throw Error(r(188))}if(n.return!==i.return)n=a,i=o;else{for(var s=!1,c=a.child;c;){if(c===n){s=!0,n=a,i=o;break}if(c===i){s=!0,i=a,n=o;break}c=c.sibling}if(!s){for(c=o.child;c;){if(c===n){s=!0,n=o,i=a;break}if(c===i){s=!0,i=o,n=a;break}c=c.sibling}if(!s)throw Error(r(189))}}if(n.alternate!==i)throw Error(r(190))}if(n.tag!==3)throw Error(r(188));return n.stateNode.current===n?e:t}function gt(e){return e=ht(e),e===null?null:_t(e)}function _t(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=_t(e);if(t!==null)return t;e=e.sibling}return null}var P=n.unstable_scheduleCallback,vt=n.unstable_cancelCallback,yt=n.unstable_shouldYield,bt=n.unstable_requestPaint,xt=n.unstable_now,St=n.unstable_getCurrentPriorityLevel,Ct=n.unstable_ImmediatePriority,wt=n.unstable_UserBlockingPriority,Tt=n.unstable_NormalPriority,Et=n.unstable_LowPriority,Dt=n.unstable_IdlePriority,Ot=null,kt=null;function At(e){if(kt&&typeof kt.onCommitFiberRoot==`function`)try{kt.onCommitFiberRoot(Ot,e,void 0,(e.current.flags&128)==128)}catch{}}var jt=Math.clz32?Math.clz32:Pt,Mt=Math.log,Nt=Math.LN2;function Pt(e){return e>>>=0,e===0?32:31-(Mt(e)/Nt|0)|0}var Ft=64,It=4194304;function Lt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Rt(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~i;s===0?(a&=o,a!==0&&(r=Lt(a))):r=Lt(s)}else o=n&~i,o===0?a!==0&&(r=Lt(a)):r=Lt(o);if(r===0)return 0;if(t!==0&&t!==r&&(t&i)===0&&(i=r&-r,a=t&-t,i>=a||i===16&&a&4194240))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-jt(t),i=1<<n,r|=e[n],t&=~i;return r}function zt(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Bt(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-jt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=zt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}}function Vt(e){return e=e.pendingLanes&-1073741825,e===0?e&1073741824?1073741824:0:e}function Ht(){var e=Ft;return Ft<<=1,!(Ft&4194240)&&(Ft=64),e}function F(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ut(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-jt(t),e[t]=n}function Wt(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-jt(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function Gt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-jt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var I=0;function Kt(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var qt,Jt,L,Yt,Xt,Zt=!1,R=[],Qt=null,$t=null,en=null,tn=new Map,nn=new Map,rn=[],an=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit`.split(` `);function on(e,t){switch(e){case`focusin`:case`focusout`:Qt=null;break;case`dragenter`:case`dragleave`:$t=null;break;case`mouseover`:case`mouseout`:en=null;break;case`pointerover`:case`pointerout`:tn.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:nn.delete(t.pointerId)}}function sn(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ui(t),t!==null&&Jt(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function cn(e,t,n,r,i){switch(t){case`focusin`:return Qt=sn(Qt,e,t,n,r,i),!0;case`dragenter`:return $t=sn($t,e,t,n,r,i),!0;case`mouseover`:return en=sn(en,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return tn.set(a,sn(tn.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,nn.set(a,sn(nn.get(a)||null,e,t,n,r,i)),!0}return!1}function ln(e){var t=Hi(e.target);if(t!==null){var n=ft(t);if(n!==null){if(t=n.tag,t===13){if(t=pt(n),t!==null){e.blockedOn=t,Xt(e.priority,function(){L(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function un(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=xn(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Ke=r,n.target.dispatchEvent(r),Ke=null}else return t=Ui(n),t!==null&&Jt(t),e.blockedOn=n,!1;t.shift()}return!0}function dn(e,t,n){un(e)&&n.delete(t)}function fn(){Zt=!1,Qt!==null&&un(Qt)&&(Qt=null),$t!==null&&un($t)&&($t=null),en!==null&&un(en)&&(en=null),tn.forEach(dn),nn.forEach(dn)}function pn(e,t){e.blockedOn===t&&(e.blockedOn=null,Zt||(Zt=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,fn)))}function mn(e){function t(t){return pn(t,e)}if(0<R.length){pn(R[0],e);for(var n=1;n<R.length;n++){var r=R[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Qt!==null&&pn(Qt,e),$t!==null&&pn($t,e),en!==null&&pn(en,e),tn.forEach(t),nn.forEach(t),n=0;n<rn.length;n++)r=rn[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<rn.length&&(n=rn[0],n.blockedOn===null);)ln(n),n.blockedOn===null&&rn.shift()}var hn=C.ReactCurrentBatchConfig,gn=!0;function _n(e,t,n,r){var i=I,a=hn.transition;hn.transition=null;try{I=1,yn(e,t,n,r)}finally{I=i,hn.transition=a}}function vn(e,t,n,r){var i=I,a=hn.transition;hn.transition=null;try{I=4,yn(e,t,n,r)}finally{I=i,hn.transition=a}}function yn(e,t,n,r){if(gn){var i=xn(e,t,n,r);if(i===null)hi(e,t,r,bn,n),on(e,r);else if(cn(i,e,t,n,r))r.stopPropagation();else if(on(e,r),t&4&&-1<an.indexOf(e)){for(;i!==null;){var a=Ui(i);if(a!==null&&qt(a),a=xn(e,t,n,r),a===null&&hi(e,t,r,bn,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else hi(e,t,r,null,n)}}var bn=null;function xn(e,t,n,r){if(bn=null,e=qe(r),e=Hi(e),e!==null)if(t=ft(e),t===null)e=null;else if(n=t.tag,n===13){if(e=pt(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return bn=e,null}function Sn(e){switch(e){case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 1;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`toggle`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 4;case`message`:switch(St()){case Ct:return 1;case wt:return 4;case Tt:case Et:return 16;case Dt:return 536870912;default:return 16}default:return 16}}var Cn=null,wn=null,Tn=null;function En(){if(Tn)return Tn;var e,t=wn,n=t.length,r,i=`value`in Cn?Cn.value:Cn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Tn=i.slice(e,1<r?1-r:void 0)}function Dn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function On(){return!0}function kn(){return!1}function An(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?On:kn,this.isPropagationStopped=kn,this}return A(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=On)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=On)},persist:function(){},isPersistent:On}),t}var jn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Mn=An(jn),Nn=A({},jn,{view:0,detail:0}),Pn=An(Nn),Fn,In,Ln,Rn=A({},Nn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Yn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Ln&&(Ln&&e.type===`mousemove`?(Fn=e.screenX-Ln.screenX,In=e.screenY-Ln.screenY):In=Fn=0,Ln=e),Fn)},movementY:function(e){return`movementY`in e?e.movementY:In}}),zn=An(Rn),Bn=An(A({},Rn,{dataTransfer:0})),Vn=An(A({},Nn,{relatedTarget:0})),Hn=An(A({},jn,{animationName:0,elapsedTime:0,pseudoElement:0})),Un=An(A({},jn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Wn=An(A({},jn,{data:0})),Gn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Kn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},qn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Jn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=qn[e])?!!t[e]:!1}function Yn(){return Jn}var Xn=An(A({},Nn,{key:function(e){if(e.key){var t=Gn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Dn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Kn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Yn,charCode:function(e){return e.type===`keypress`?Dn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Dn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Zn=An(A({},Rn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Qn=An(A({},Nn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Yn})),$n=An(A({},jn,{propertyName:0,elapsedTime:0,pseudoElement:0})),er=An(A({},Rn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),tr=[9,13,27,32],nr=c&&`CompositionEvent`in window,rr=null;c&&`documentMode`in document&&(rr=document.documentMode);var ir=c&&`TextEvent`in window&&!rr,ar=c&&(!nr||rr&&8<rr&&11>=rr),or=` `,sr=!1;function cr(e,t){switch(e){case`keyup`:return tr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function lr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var ur=!1;function dr(e,t){switch(e){case`compositionend`:return lr(t);case`keypress`:return t.which===32?(sr=!0,or):null;case`textInput`:return e=t.data,e===or&&sr?null:e;default:return null}}function fr(e,t){if(ur)return e===`compositionend`||!nr&&cr(e,t)?(e=En(),Tn=wn=Cn=null,ur=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return ar&&t.locale!==`ko`?null:t.data;default:return null}}var pr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function mr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!pr[e.type]:t===`textarea`}function hr(e,t,n,r){Qe(r),t=_i(t,`onChange`),0<t.length&&(n=new Mn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var gr=null,_r=null;function vr(e){li(e,0)}function yr(e){if(be(Wi(e)))return e}function br(e,t){if(e===`change`)return t}var xr=!1;if(c){var Sr;if(c){var Cr=`oninput`in document;if(!Cr){var wr=document.createElement(`div`);wr.setAttribute(`oninput`,`return;`),Cr=typeof wr.oninput==`function`}Sr=Cr}else Sr=!1;xr=Sr&&(!document.documentMode||9<document.documentMode)}function Tr(){gr&&(gr.detachEvent(`onpropertychange`,Er),_r=gr=null)}function Er(e){if(e.propertyName===`value`&&yr(_r)){var t=[];hr(t,_r,e,qe(e)),rt(vr,t)}}function Dr(e,t,n){e===`focusin`?(Tr(),gr=t,_r=n,gr.attachEvent(`onpropertychange`,Er)):e===`focusout`&&Tr()}function Or(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return yr(_r)}function kr(e,t){if(e===`click`)return yr(t)}function Ar(e,t){if(e===`input`||e===`change`)return yr(t)}function jr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Mr=typeof Object.is==`function`?Object.is:jr;function Nr(e,t){if(Mr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!l.call(t,i)||!Mr(e[i],t[i]))return!1}return!0}function Pr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Fr(e,t){var n=Pr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Pr(n)}}function Ir(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ir(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Lr(){for(var e=window,t=xe();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=xe(e.document)}return t}function Rr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}function zr(e){var t=Lr(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ir(n.ownerDocument.documentElement,n)){if(r!==null&&Rr(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),`selectionStart`in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=Fr(n,a);var o=Fr(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus==`function`&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Br=c&&`documentMode`in document&&11>=document.documentMode,Vr=null,Hr=null,Ur=null,Wr=!1;function Gr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Wr||Vr==null||Vr!==xe(r)||(r=Vr,`selectionStart`in r&&Rr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ur&&Nr(Ur,r)||(Ur=r,r=_i(Hr,`onSelect`),0<r.length&&(t=new Mn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Vr)))}function Kr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var qr={animationend:Kr(`Animation`,`AnimationEnd`),animationiteration:Kr(`Animation`,`AnimationIteration`),animationstart:Kr(`Animation`,`AnimationStart`),transitionend:Kr(`Transition`,`TransitionEnd`)},Jr={},Yr={};c&&(Yr=document.createElement(`div`).style,`AnimationEvent`in window||(delete qr.animationend.animation,delete qr.animationiteration.animation,delete qr.animationstart.animation),`TransitionEvent`in window||delete qr.transitionend.transition);function Xr(e){if(Jr[e])return Jr[e];if(!qr[e])return e;var t=qr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Yr)return Jr[e]=t[n];return e}var Zr=Xr(`animationend`),Qr=Xr(`animationiteration`),$r=Xr(`animationstart`),ei=Xr(`transitionend`),ti=new Map,ni=`abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);function ri(e,t){ti.set(e,t),o(t,[e])}for(var ii=0;ii<ni.length;ii++){var ai=ni[ii];ri(ai.toLowerCase(),`on`+(ai[0].toUpperCase()+ai.slice(1)))}ri(Zr,`onAnimationEnd`),ri(Qr,`onAnimationIteration`),ri($r,`onAnimationStart`),ri(`dblclick`,`onDoubleClick`),ri(`focusin`,`onFocus`),ri(`focusout`,`onBlur`),ri(ei,`onTransitionEnd`),s(`onMouseEnter`,[`mouseout`,`mouseover`]),s(`onMouseLeave`,[`mouseout`,`mouseover`]),s(`onPointerEnter`,[`pointerout`,`pointerover`]),s(`onPointerLeave`,[`pointerout`,`pointerover`]),o(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),o(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),o(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),o(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),o(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),o(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var oi=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),si=new Set(`cancel close invalid load scroll toggle`.split(` `).concat(oi));function ci(e,t,n){var r=e.type||`unknown-event`;e.currentTarget=n,dt(r,t,void 0,e),e.currentTarget=null}function li(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;ci(i,s,l),a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;ci(i,s,l),a=c}}}if(st)throw e=ct,st=!1,ct=null,e}function ui(e,t){var n=t[zi];n===void 0&&(n=t[zi]=new Set);var r=e+`__bubble`;n.has(r)||(mi(t,e,2,!1),n.add(r))}function di(e,t,n){var r=0;t&&(r|=4),mi(n,e,r,t)}var fi=`_reactListening`+Math.random().toString(36).slice(2);function pi(e){if(!e[fi]){e[fi]=!0,i.forEach(function(t){t!==`selectionchange`&&(si.has(t)||di(t,!1,e),di(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[fi]||(t[fi]=!0,di(`selectionchange`,!1,t))}}function mi(e,t,n,r){switch(Sn(t)){case 1:var i=_n;break;case 4:i=vn;break;default:i=yn}n=i.bind(null,t,n,e),i=void 0,!at||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function hi(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===i||c.nodeType===8&&c.parentNode===i))return;o=o.return}for(;s!==null;){if(o=Hi(s),o===null)return;if(c=o.tag,c===5||c===6){r=a=o;continue a}s=s.parentNode}}r=r.return}rt(function(){var r=a,i=qe(n),o=[];a:{var s=ti.get(e);if(s!==void 0){var c=Mn,l=e;switch(e){case`keypress`:if(Dn(n)===0)break a;case`keydown`:case`keyup`:c=Xn;break;case`focusin`:l=`focus`,c=Vn;break;case`focusout`:l=`blur`,c=Vn;break;case`beforeblur`:case`afterblur`:c=Vn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:c=zn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:c=Bn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:c=Qn;break;case Zr:case Qr:case $r:c=Hn;break;case ei:c=$n;break;case`scroll`:c=Pn;break;case`wheel`:c=er;break;case`copy`:case`cut`:case`paste`:c=Un;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:c=Zn}var u=(t&4)!=0,d=!u&&e===`scroll`,f=u?s===null?null:s+`Capture`:s;u=[];for(var p=r,m;p!==null;){m=p;var h=m.stateNode;if(m.tag===5&&h!==null&&(m=h,f!==null&&(h=it(p,f),h!=null&&u.push(gi(p,h,m)))),d)break;p=p.return}0<u.length&&(s=new c(s,l,null,n,i),o.push({event:s,listeners:u}))}}if(!(t&7)){a:{if(s=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,s&&n!==Ke&&(l=n.relatedTarget||n.fromElement)&&(Hi(l)||l[Ri]))break a;if((c||s)&&(s=i.window===i?i:(s=i.ownerDocument)?s.defaultView||s.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Hi(l):null,l!==null&&(d=ft(l),l!==d||l.tag!==5&&l.tag!==6)&&(l=null)):(c=null,l=r),c!==l)){if(u=zn,h=`onMouseLeave`,f=`onMouseEnter`,p=`mouse`,(e===`pointerout`||e===`pointerover`)&&(u=Zn,h=`onPointerLeave`,f=`onPointerEnter`,p=`pointer`),d=c==null?s:Wi(c),m=l==null?s:Wi(l),s=new u(h,p+`leave`,c,n,i),s.target=d,s.relatedTarget=m,h=null,Hi(i)===r&&(u=new u(f,p+`enter`,l,n,i),u.target=m,u.relatedTarget=d,h=u),d=h,c&&l)b:{for(u=c,f=l,p=0,m=u;m;m=vi(m))p++;for(m=0,h=f;h;h=vi(h))m++;for(;0<p-m;)u=vi(u),p--;for(;0<m-p;)f=vi(f),m--;for(;p--;){if(u===f||f!==null&&u===f.alternate)break b;u=vi(u),f=vi(f)}u=null}else u=null;c!==null&&yi(o,s,c,u,!1),l!==null&&d!==null&&yi(o,d,l,u,!0)}}a:{if(s=r?Wi(r):window,c=s.nodeName&&s.nodeName.toLowerCase(),c===`select`||c===`input`&&s.type===`file`)var g=br;else if(mr(s))if(xr)g=Ar;else{g=Or;var _=Dr}else(c=s.nodeName)&&c.toLowerCase()===`input`&&(s.type===`checkbox`||s.type===`radio`)&&(g=kr);if(g&&=g(e,r)){hr(o,g,n,i);break a}_&&_(e,s,r),e===`focusout`&&(_=s._wrapperState)&&_.controlled&&s.type===`number`&&De(s,`number`,s.value)}switch(_=r?Wi(r):window,e){case`focusin`:(mr(_)||_.contentEditable===`true`)&&(Vr=_,Hr=r,Ur=null);break;case`focusout`:Ur=Hr=Vr=null;break;case`mousedown`:Wr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Wr=!1,Gr(o,n,i);break;case`selectionchange`:if(Br)break;case`keydown`:case`keyup`:Gr(o,n,i)}var v;if(nr)b:{switch(e){case`compositionstart`:var y=`onCompositionStart`;break b;case`compositionend`:y=`onCompositionEnd`;break b;case`compositionupdate`:y=`onCompositionUpdate`;break b}y=void 0}else ur?cr(e,n)&&(y=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(y=`onCompositionStart`);y&&(ar&&n.locale!==`ko`&&(ur||y!==`onCompositionStart`?y===`onCompositionEnd`&&ur&&(v=En()):(Cn=i,wn=`value`in Cn?Cn.value:Cn.textContent,ur=!0)),_=_i(r,y),0<_.length&&(y=new Wn(y,e,null,n,i),o.push({event:y,listeners:_}),v?y.data=v:(v=lr(n),v!==null&&(y.data=v)))),(v=ir?dr(e,n):fr(e,n))&&(r=_i(r,`onBeforeInput`),0<r.length&&(i=new Wn(`onBeforeInput`,`beforeinput`,null,n,i),o.push({event:i,listeners:r}),i.data=v))}li(o,t)})}function gi(e,t,n){return{instance:e,listener:t,currentTarget:n}}function _i(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=it(e,n),a!=null&&r.unshift(gi(e,a,i)),a=it(e,t),a!=null&&r.push(gi(e,a,i))),e=e.return}return r}function vi(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function yi(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(c!==null&&c===r)break;s.tag===5&&l!==null&&(s=l,i?(c=it(n,a),c!=null&&o.unshift(gi(n,c,s))):i||(c=it(n,a),c!=null&&o.push(gi(n,c,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var bi=/\r\n?/g,xi=/\u0000|\uFFFD/g;function Si(e){return(typeof e==`string`?e:``+e).replace(bi,`
`).replace(xi,``)}function Ci(e,t,n){if(t=Si(t),Si(e)!==t&&n)throw Error(r(425))}function wi(){}var Ti=null,Ei=null;function Di(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var z=typeof setTimeout==`function`?setTimeout:void 0,Oi=typeof clearTimeout==`function`?clearTimeout:void 0,ki=typeof Promise==`function`?Promise:void 0,Ai=typeof queueMicrotask==`function`?queueMicrotask:ki===void 0?z:function(e){return ki.resolve(null).then(e).catch(ji)};function ji(e){setTimeout(function(){throw e})}function Mi(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`){if(r===0){e.removeChild(i),mn(t);return}r--}else n!==`$`&&n!==`$?`&&n!==`$!`||r++;n=i}while(n);mn(t)}function Ni(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`)break;if(t===`/$`)return null}}return e}function Pi(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`){if(t===0)return e;t--}else n===`/$`&&t++}e=e.previousSibling}return null}var Fi=Math.random().toString(36).slice(2),Ii=`__reactFiber$`+Fi,Li=`__reactProps$`+Fi,Ri=`__reactContainer$`+Fi,zi=`__reactEvents$`+Fi,Bi=`__reactListeners$`+Fi,Vi=`__reactHandles$`+Fi;function Hi(e){var t=e[Ii];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ri]||n[Ii]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Pi(e);e!==null;){if(n=e[Ii])return n;e=Pi(e)}return t}e=n,n=e.parentNode}return null}function Ui(e){return e=e[Ii]||e[Ri],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Wi(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(r(33))}function Gi(e){return e[Li]||null}var Ki=[],qi=-1;function Ji(e){return{current:e}}function Yi(e){0>qi||(e.current=Ki[qi],Ki[qi]=null,qi--)}function B(e,t){qi++,Ki[qi]=e.current,e.current=t}var Xi={},Zi=Ji(Xi),Qi=Ji(!1),$i=Xi;function ea(e,t){var n=e.type.contextTypes;if(!n)return Xi;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function ta(e){return e=e.childContextTypes,e!=null}function na(){Yi(Qi),Yi(Zi)}function ra(e,t,n){if(Zi.current!==Xi)throw Error(r(168));B(Zi,t),B(Qi,n)}function ia(e,t,n){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!=`function`)return n;for(var a in i=i.getChildContext(),i)if(!(a in t))throw Error(r(108,he(e)||`Unknown`,a));return A({},n,i)}function aa(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Xi,$i=Zi.current,B(Zi,e),B(Qi,Qi.current),!0}function oa(e,t,n){var i=e.stateNode;if(!i)throw Error(r(169));n?(e=ia(e,t,$i),i.__reactInternalMemoizedMergedChildContext=e,Yi(Qi),Yi(Zi),B(Zi,e)):Yi(Qi),B(Qi,n)}var sa=null,ca=!1,la=!1;function ua(e){sa===null?sa=[e]:sa.push(e)}function da(e){ca=!0,ua(e)}function fa(){if(!la&&sa!==null){la=!0;var e=0,t=I;try{var n=sa;for(I=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}sa=null,ca=!1}catch(t){throw sa!==null&&(sa=sa.slice(e+1)),P(Ct,fa),t}finally{I=t,la=!1}}return null}var pa=[],ma=0,ha=null,ga=0,_a=[],va=0,ya=null,ba=1,xa=``;function Sa(e,t){pa[ma++]=ga,pa[ma++]=ha,ha=e,ga=t}function Ca(e,t,n){_a[va++]=ba,_a[va++]=xa,_a[va++]=ya,ya=e;var r=ba;e=xa;var i=32-jt(r)-1;r&=~(1<<i),n+=1;var a=32-jt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ba=1<<32-jt(t)+i|n<<i|r,xa=a+e}else ba=1<<a|n<<i|r,xa=e}function wa(e){e.return!==null&&(Sa(e,1),Ca(e,1,0))}function Ta(e){for(;e===ha;)ha=pa[--ma],pa[ma]=null,ga=pa[--ma],pa[ma]=null;for(;e===ya;)ya=_a[--va],_a[va]=null,xa=_a[--va],_a[va]=null,ba=_a[--va],_a[va]=null}var Ea=null,Da=null,V=!1,Oa=null;function ka(e,t){var n=Kl(5,null,null,0);n.elementType=`DELETED`,n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Aa(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t===null?!1:(e.stateNode=t,Ea=e,Da=Ni(t.firstChild),!0);case 6:return t=e.pendingProps===``||t.nodeType!==3?null:t,t===null?!1:(e.stateNode=t,Ea=e,Da=null,!0);case 13:return t=t.nodeType===8?t:null,t===null?!1:(n=ya===null?null:{id:ba,overflow:xa},e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Kl(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ea=e,Da=null,!0);default:return!1}}function ja(e){return(e.mode&1)!=0&&(e.flags&128)==0}function Ma(e){if(V){var t=Da;if(t){var n=t;if(!Aa(e,t)){if(ja(e))throw Error(r(418));t=Ni(n.nextSibling);var i=Ea;t&&Aa(e,t)?ka(i,n):(e.flags=e.flags&-4097|2,V=!1,Ea=e)}}else{if(ja(e))throw Error(r(418));e.flags=e.flags&-4097|2,V=!1,Ea=e}}}function Na(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ea=e}function Pa(e){if(e!==Ea)return!1;if(!V)return Na(e),V=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!==`head`&&t!==`body`&&!Di(e.type,e.memoizedProps)),t&&=Da){if(ja(e))throw Fa(),Error(r(418));for(;t;)ka(e,t),t=Ni(t.nextSibling)}if(Na(e),e.tag===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(r(317));a:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`){if(t===0){Da=Ni(e.nextSibling);break a}t--}else n!==`$`&&n!==`$!`&&n!==`$?`||t++}e=e.nextSibling}Da=null}}else Da=Ea?Ni(e.stateNode.nextSibling):null;return!0}function Fa(){for(var e=Da;e;)e=Ni(e.nextSibling)}function Ia(){Da=Ea=null,V=!1}function La(e){Oa===null?Oa=[e]:Oa.push(e)}var Ra=C.ReactCurrentBatchConfig;function za(e,t,n){if(e=n.ref,e!==null&&typeof e!=`function`&&typeof e!=`object`){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(r(309));var i=n.stateNode}if(!i)throw Error(r(147,e));var a=i,o=``+e;return t!==null&&t.ref!==null&&typeof t.ref==`function`&&t.ref._stringRef===o?t.ref:(t=function(e){var t=a.refs;e===null?delete t[o]:t[o]=e},t._stringRef=o,t)}if(typeof e!=`string`)throw Error(r(284));if(!n._owner)throw Error(r(290,e))}return e}function Ba(e,t){throw e=Object.prototype.toString.call(t),Error(r(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e))}function Va(e){var t=e._init;return t(e._payload)}function Ha(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function i(e,t){for(e=new Map;t!==null;)t.key===null?e.set(t.index,t):e.set(t.key,t),t=t.sibling;return e}function a(e,t){return e=Yl(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=2,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=2),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=$l(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===E?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===k&&Va(i)===t.type)?(r=a(t,n.props),r.ref=za(e,t,n),r.return=e,r):(r=Xl(n.type,n.key,n.props,null,e.mode,r),r.ref=za(e,t,n),r.return=e,r)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=eu(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Zl(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`)return t=$l(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case w:return n=Xl(t.type,t.key,t.props,null,e.mode,n),n.ref=za(e,null,t),n.return=e,n;case T:return t=eu(t,e.mode,n),t.return=e,t;case k:var r=t._init;return f(e,r(t._payload),n)}if(Oe(t)||ce(t))return t=Zl(t,e.mode,n,null),t.return=e,t;Ba(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case w:return n.key===i?l(e,t,n,r):null;case T:return n.key===i?u(e,t,n,r):null;case k:return i=n._init,p(e,t,i(n._payload),r)}if(Oe(n)||ce(n))return i===null?d(e,t,n,r,null):null;Ba(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case w:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case T:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case k:var a=r._init;return m(e,t,n,a(r._payload),i)}if(Oe(r)||ce(r))return e=e.get(n)||null,d(t,e,r,i,null);Ba(t,r)}return null}function h(r,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(r,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(r,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(r,d),V&&Sa(r,h),l;if(d===null){for(;h<s.length;h++)d=f(r,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return V&&Sa(r,h),l}for(d=i(r,d);h<s.length;h++)g=m(d,r,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(r,e)}),V&&Sa(r,h),l}function g(a,s,c,l){var u=ce(c);if(typeof u!=`function`)throw Error(r(150));if(c=u.call(c),c==null)throw Error(r(151));for(var d=u=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),V&&Sa(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return V&&Sa(a,g),u}for(h=i(a,h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),V&&Sa(a,g),u}function _(e,r,i,o){if(typeof i==`object`&&i&&i.type===E&&i.key===null&&(i=i.props.children),typeof i==`object`&&i){switch(i.$$typeof){case w:a:{for(var c=i.key,l=r;l!==null;){if(l.key===c){if(c=i.type,c===E){if(l.tag===7){n(e,l.sibling),r=a(l,i.props.children),r.return=e,e=r;break a}}else if(l.elementType===c||typeof c==`object`&&c&&c.$$typeof===k&&Va(c)===l.type){n(e,l.sibling),r=a(l,i.props),r.ref=za(e,l,i),r.return=e,e=r;break a}n(e,l);break}else t(e,l);l=l.sibling}i.type===E?(r=Zl(i.props.children,e.mode,o,i.key),r.return=e,e=r):(o=Xl(i.type,i.key,i.props,null,e.mode,o),o.ref=za(e,r,i),o.return=e,e=o)}return s(e);case T:a:{for(l=i.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===i.containerInfo&&r.stateNode.implementation===i.implementation){n(e,r.sibling),r=a(r,i.children||[]),r.return=e,e=r;break a}else{n(e,r);break}else t(e,r);r=r.sibling}r=eu(i,e.mode,o),r.return=e,e=r}return s(e);case k:return l=i._init,_(e,r,l(i._payload),o)}if(Oe(i))return h(e,r,i,o);if(ce(i))return g(e,r,i,o);Ba(e,i)}return typeof i==`string`&&i!==``||typeof i==`number`?(i=``+i,r!==null&&r.tag===6?(n(e,r.sibling),r=a(r,i),r.return=e,e=r):(n(e,r),r=$l(i,e.mode,o),r.return=e,e=r),s(e)):n(e,r)}return _}var Ua=Ha(!0),Wa=Ha(!1),Ga=Ji(null),Ka=null,qa=null,Ja=null;function Ya(){Ja=qa=Ka=null}function Xa(e){var t=Ga.current;Yi(Ga),e._currentValue=t}function Za(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Qa(e,t){Ka=e,Ja=qa=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Bs=!0),e.firstContext=null)}function $a(e){var t=e._currentValue;if(Ja!==e)if(e={context:e,memoizedValue:t,next:null},qa===null){if(Ka===null)throw Error(r(308));qa=e,Ka.dependencies={lanes:0,firstContext:e}}else qa=qa.next=e;return t}var eo=null;function to(e){eo===null?eo=[e]:eo.push(e)}function no(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,to(t)):(n.next=i.next,i.next=n),t.interleaved=n,ro(e,r)}function ro(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var io=!1;function ao(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function oo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function so(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function co(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,ro(e,n)}return i=r.interleaved,i===null?(t.next=t,to(r)):(t.next=i.next,i.next=t),r.interleaved=t,ro(e,n)}function lo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194240)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Gt(e,n)}}function uo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function fo(e,t,n,r){var i=e.updateQueue;io=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane,p=s.eventTime;if((r&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});a:{var m=e,h=s;switch(f=t,p=n,h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(p,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(p,d,f):m,f==null)break a;d=A({},d,f);break a;case 2:io=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[s]:f.push(s))}else p={eventTime:p,lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;f=s,s=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(1);if(u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);X|=o,e.lanes=o,e.memoizedState=d}}function po(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],a=i.callback;if(a!==null){if(i.callback=null,i=n,typeof a!=`function`)throw Error(r(191,a));a.call(i)}}}var mo={},ho=Ji(mo),go=Ji(mo),_o=Ji(mo);function vo(e){if(e===mo)throw Error(r(174));return e}function yo(e,t){switch(B(_o,t),B(go,e),B(ho,mo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Fe(null,``);break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Fe(t,e)}Yi(ho),B(ho,t)}function bo(){Yi(ho),Yi(go),Yi(_o)}function xo(e){vo(_o.current);var t=vo(ho.current),n=Fe(t,e.type);t!==n&&(B(go,e),B(ho,n))}function So(e){go.current===e&&(Yi(ho),Yi(go))}var Co=Ji(0);function wo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data===`$?`||n.data===`$!`))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var To=[];function Eo(){for(var e=0;e<To.length;e++)To[e]._workInProgressVersionPrimary=null;To.length=0}var Do=C.ReactCurrentDispatcher,Oo=C.ReactCurrentBatchConfig,ko=0,Ao=null,jo=null,Mo=null,No=!1,Po=!1,H=0,Fo=0;function Io(){throw Error(r(321))}function Lo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Mr(e[n],t[n]))return!1;return!0}function U(e,t,n,i,a,o){if(ko=o,Ao=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Do.current=e===null||e.memoizedState===null?bs:xs,e=n(i,a),Po){o=0;do{if(Po=!1,H=0,25<=o)throw Error(r(301));o+=1,Mo=jo=null,t.updateQueue=null,Do.current=Ss,e=n(i,a)}while(Po)}if(Do.current=ys,t=jo!==null&&jo.next!==null,ko=0,Mo=jo=Ao=null,No=!1,t)throw Error(r(300));return e}function Ro(){var e=H!==0;return H=0,e}function zo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Mo===null?Ao.memoizedState=Mo=e:Mo=Mo.next=e,Mo}function Bo(){if(jo===null){var e=Ao.alternate;e=e===null?null:e.memoizedState}else e=jo.next;var t=Mo===null?Ao.memoizedState:Mo.next;if(t!==null)Mo=t,jo=e;else{if(e===null)throw Error(r(310));jo=e,e={memoizedState:jo.memoizedState,baseState:jo.baseState,baseQueue:jo.baseQueue,queue:jo.queue,next:null},Mo===null?Ao.memoizedState=Mo=e:Mo=Mo.next=e}return Mo}function Vo(e,t){return typeof t==`function`?t(e):t}function Ho(e){var t=Bo(),n=t.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=e;var i=jo,a=i.baseQueue,o=n.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}i.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,i=i.baseState;var c=s=null,l=null,u=o;do{var d=u.lane;if((ko&d)===d)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:e(i,u.action);else{var f={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(c=l=f,s=i):l=l.next=f,Ao.lanes|=d,X|=d}u=u.next}while(u!==null&&u!==o);l===null?s=i:l.next=c,Mr(i,t.memoizedState)||(Bs=!0),t.memoizedState=i,t.baseState=s,t.baseQueue=l,n.lastRenderedState=i}if(e=n.interleaved,e!==null){a=e;do o=a.lane,Ao.lanes|=o,X|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Uo(e){var t=Bo(),n=t.queue;if(n===null)throw Error(r(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Mr(o,t.memoizedState)||(Bs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,i]}function Wo(){}function Go(e,t){var n=Ao,i=Bo(),a=t(),o=!Mr(i.memoizedState,a);if(o&&(i.memoizedState=a,Bs=!0),i=i.queue,rs(Jo.bind(null,n,i,e),[e]),i.getSnapshot!==t||o||Mo!==null&&Mo.memoizedState.tag&1){if(n.flags|=2048,Qo(9,qo.bind(null,n,i,a,t),void 0,null),Yc===null)throw Error(r(349));ko&30||Ko(n,t,a)}return a}function Ko(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ao.updateQueue,t===null?(t={lastEffect:null,stores:null},Ao.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function qo(e,t,n,r){t.value=n,t.getSnapshot=r,Yo(t)&&Xo(e)}function Jo(e,t,n){return n(function(){Yo(t)&&Xo(e)})}function Yo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Mr(e,n)}catch{return!0}}function Xo(e){var t=ro(e,1);t!==null&&ml(t,e,1,-1)}function Zo(e){var t=zo();return typeof e==`function`&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vo,lastRenderedState:e},t.queue=e,e=e.dispatch=hs.bind(null,Ao,e),[t.memoizedState,e]}function Qo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Ao.updateQueue,t===null?(t={lastEffect:null,stores:null},Ao.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function $o(){return Bo().memoizedState}function es(e,t,n,r){var i=zo();Ao.flags|=e,i.memoizedState=Qo(1|t,n,void 0,r===void 0?null:r)}function ts(e,t,n,r){var i=Bo();r=r===void 0?null:r;var a=void 0;if(jo!==null){var o=jo.memoizedState;if(a=o.destroy,r!==null&&Lo(r,o.deps)){i.memoizedState=Qo(t,n,a,r);return}}Ao.flags|=e,i.memoizedState=Qo(1|t,n,a,r)}function ns(e,t){return es(8390656,8,e,t)}function rs(e,t){return ts(2048,8,e,t)}function is(e,t){return ts(4,2,e,t)}function as(e,t){return ts(4,4,e,t)}function os(e,t){if(typeof t==`function`)return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ss(e,t,n){return n=n==null?null:n.concat([e]),ts(4,4,os.bind(null,t,e),n)}function cs(){}function ls(e,t){var n=Bo();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Lo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function us(e,t){var n=Bo();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Lo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function ds(e,t,n){return ko&21?(Mr(n,t)||(n=Ht(),Ao.lanes|=n,X|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Bs=!0),e.memoizedState=n)}function fs(e,t){var n=I;I=n!==0&&4>n?n:4,e(!0);var r=Oo.transition;Oo.transition={};try{e(!1),t()}finally{I=n,Oo.transition=r}}function ps(){return Bo().memoizedState}function ms(e,t,n){var r=pl(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},gs(e))_s(t,n);else if(n=no(e,t,n,r),n!==null){var i=fl();ml(n,e,r,i),vs(n,t,r)}}function hs(e,t,n){var r=pl(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(gs(e))_s(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Mr(s,o)){var c=t.interleaved;c===null?(i.next=i,to(t)):(i.next=c.next,c.next=i),t.interleaved=i;return}}catch{}n=no(e,t,i,r),n!==null&&(i=fl(),ml(n,e,r,i),vs(n,t,r))}}function gs(e){var t=e.alternate;return e===Ao||t!==null&&t===Ao}function _s(e,t){Po=No=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function vs(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Gt(e,n)}}var ys={readContext:$a,useCallback:Io,useContext:Io,useEffect:Io,useImperativeHandle:Io,useInsertionEffect:Io,useLayoutEffect:Io,useMemo:Io,useReducer:Io,useRef:Io,useState:Io,useDebugValue:Io,useDeferredValue:Io,useTransition:Io,useMutableSource:Io,useSyncExternalStore:Io,useId:Io,unstable_isNewReconciler:!1},bs={readContext:$a,useCallback:function(e,t){return zo().memoizedState=[e,t===void 0?null:t],e},useContext:$a,useEffect:ns,useImperativeHandle:function(e,t,n){return n=n==null?null:n.concat([e]),es(4194308,4,os.bind(null,t,e),n)},useLayoutEffect:function(e,t){return es(4194308,4,e,t)},useInsertionEffect:function(e,t){return es(4,2,e,t)},useMemo:function(e,t){var n=zo();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=zo();return t=n===void 0?t:n(t),r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=ms.bind(null,Ao,e),[r.memoizedState,e]},useRef:function(e){var t=zo();return e={current:e},t.memoizedState=e},useState:Zo,useDebugValue:cs,useDeferredValue:function(e){return zo().memoizedState=e},useTransition:function(){var e=Zo(!1),t=e[0];return e=fs.bind(null,e[1]),zo().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var i=Ao,a=zo();if(V){if(n===void 0)throw Error(r(407));n=n()}else{if(n=t(),Yc===null)throw Error(r(349));ko&30||Ko(i,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ns(Jo.bind(null,i,o,e),[e]),i.flags|=2048,Qo(9,qo.bind(null,i,o,n,t),void 0,null),n},useId:function(){var e=zo(),t=Yc.identifierPrefix;if(V){var n=xa,r=ba;n=(r&~(1<<32-jt(r)-1)).toString(32)+n,t=`:`+t+`R`+n,n=H++,0<n&&(t+=`H`+n.toString(32)),t+=`:`}else n=Fo++,t=`:`+t+`r`+n.toString(32)+`:`;return e.memoizedState=t},unstable_isNewReconciler:!1},xs={readContext:$a,useCallback:ls,useContext:$a,useEffect:rs,useImperativeHandle:ss,useInsertionEffect:is,useLayoutEffect:as,useMemo:us,useReducer:Ho,useRef:$o,useState:function(){return Ho(Vo)},useDebugValue:cs,useDeferredValue:function(e){return ds(Bo(),jo.memoizedState,e)},useTransition:function(){return[Ho(Vo)[0],Bo().memoizedState]},useMutableSource:Wo,useSyncExternalStore:Go,useId:ps,unstable_isNewReconciler:!1},Ss={readContext:$a,useCallback:ls,useContext:$a,useEffect:rs,useImperativeHandle:ss,useInsertionEffect:is,useLayoutEffect:as,useMemo:us,useReducer:Uo,useRef:$o,useState:function(){return Uo(Vo)},useDebugValue:cs,useDeferredValue:function(e){var t=Bo();return jo===null?t.memoizedState=e:ds(t,jo.memoizedState,e)},useTransition:function(){return[Uo(Vo)[0],Bo().memoizedState]},useMutableSource:Wo,useSyncExternalStore:Go,useId:ps,unstable_isNewReconciler:!1};function Cs(e,t){if(e&&e.defaultProps){for(var n in t=A({},t),e=e.defaultProps,e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ws(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:A({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ts={isMounted:function(e){return(e=e._reactInternals)?ft(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=fl(),i=pl(e),a=so(r,i);a.payload=t,n!=null&&(a.callback=n),t=co(e,a,i),t!==null&&(ml(t,e,i,r),lo(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=fl(),i=pl(e),a=so(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=co(e,a,i),t!==null&&(ml(t,e,i,r),lo(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=fl(),r=pl(e),i=so(n,r);i.tag=2,t!=null&&(i.callback=t),t=co(e,i,r),t!==null&&(ml(t,e,r,n),lo(t,e,r))}};function Es(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Nr(n,r)||!Nr(i,a):!0}function Ds(e,t,n){var r=!1,i=Xi,a=t.contextType;return typeof a==`object`&&a?a=$a(a):(i=ta(t)?$i:Zi.current,r=t.contextTypes,a=(r=r!=null)?ea(e,i):Xi),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ts,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function Os(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ts.enqueueReplaceState(t,t.state,null)}function ks(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},ao(e);var a=t.contextType;typeof a==`object`&&a?i.context=$a(a):(a=ta(t)?$i:Zi.current,i.context=ea(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a==`function`&&(ws(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps==`function`||typeof i.getSnapshotBeforeUpdate==`function`||typeof i.UNSAFE_componentWillMount!=`function`&&typeof i.componentWillMount!=`function`||(t=i.state,typeof i.componentWillMount==`function`&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount==`function`&&i.UNSAFE_componentWillMount(),t!==i.state&&Ts.enqueueReplaceState(i,i.state,null),fo(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount==`function`&&(e.flags|=4194308)}function As(e,t){try{var n=``,r=t;do n+=pe(r),r=r.return;while(r);var i=n}catch(e){i=`
Error generating stack: `+e.message+`
`+e.stack}return{value:e,source:t,stack:i,digest:null}}function js(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ms(e,t){try{console.error(t.value)}catch(e){setTimeout(function(){throw e})}}var Ns=typeof WeakMap==`function`?WeakMap:Map;function Ps(e,t,n){n=so(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Z||(Z=!0,al=r),Ms(e,t)},n}function Fs(e,t,n){n=so(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r==`function`){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Ms(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch==`function`&&(n.callback=function(){Ms(e,t),typeof r!=`function`&&(ol===null?ol=new Set([this]):ol.add(this));var n=t.stack;this.componentDidCatch(t.value,{componentStack:n===null?``:n})}),n}function Is(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ns;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=zl.bind(null,e,t,n),t.then(e,e))}function Ls(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t===null||t.dehydrated!==null),t)return e;e=e.return}while(e!==null);return null}function Rs(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=so(-1,1),t.tag=2,co(n,t,1))),n.lanes|=1),e)}var zs=C.ReactCurrentOwner,Bs=!1;function Vs(e,t,n,r){t.child=e===null?Wa(t,null,n,r):Ua(t,e.child,n,r)}function Hs(e,t,n,r,i){n=n.render;var a=t.ref;return Qa(t,i),r=U(e,t,n,r,a,i),n=Ro(),e!==null&&!Bs?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,cc(e,t,i)):(V&&n&&wa(t),t.flags|=1,Vs(e,t,r,i),t.child)}function Us(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ql(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,Ws(e,t,a,r,i)):(e=Xl(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,(e.lanes&i)===0){var o=a.memoizedProps;if(n=n.compare,n=n===null?Nr:n,n(o,r)&&e.ref===t.ref)return cc(e,t,i)}return t.flags|=1,e=Yl(a,r),e.ref=t.ref,e.return=t,t.child=e}function Ws(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Nr(a,r)&&e.ref===t.ref)if(Bs=!1,t.pendingProps=r=a,(e.lanes&i)!==0)e.flags&131072&&(Bs=!0);else return t.lanes=e.lanes,cc(e,t,i)}return qs(e,t,n,r,i)}function Gs(e,t,n){var r=t.pendingProps,i=r.children,a=e===null?null:e.memoizedState;if(r.mode===`hidden`)if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},B(Y,J),J|=n;else{if(!(n&1073741824))return e=a===null?n:a.baseLanes|n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,B(Y,J),J|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a===null?n:a.baseLanes,B(Y,J),J|=r}else a===null?r=n:(r=a.baseLanes|n,t.memoizedState=null),B(Y,J),J|=r;return Vs(e,t,i,n),t.child}function Ks(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function qs(e,t,n,r,i){var a=ta(n)?$i:Zi.current;return a=ea(t,a),Qa(t,i),n=U(e,t,n,r,a,i),r=Ro(),e!==null&&!Bs?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,cc(e,t,i)):(V&&r&&wa(t),t.flags|=1,Vs(e,t,n,i),t.child)}function Js(e,t,n,r,i){if(ta(n)){var a=!0;aa(t)}else a=!1;if(Qa(t,i),t.stateNode===null)sc(e,t),Ds(t,n,r),ks(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var c=o.context,l=n.contextType;typeof l==`object`&&l?l=$a(l):(l=ta(n)?$i:Zi.current,l=ea(t,l));var u=n.getDerivedStateFromProps,d=typeof u==`function`||typeof o.getSnapshotBeforeUpdate==`function`;d||typeof o.UNSAFE_componentWillReceiveProps!=`function`&&typeof o.componentWillReceiveProps!=`function`||(s!==r||c!==l)&&Os(t,o,r,l),io=!1;var f=t.memoizedState;o.state=f,fo(t,r,o,i),c=t.memoizedState,s!==r||f!==c||Qi.current||io?(typeof u==`function`&&(ws(t,n,u,r),c=t.memoizedState),(s=io||Es(t,n,s,r,f,c,l))?(d||typeof o.UNSAFE_componentWillMount!=`function`&&typeof o.componentWillMount!=`function`||(typeof o.componentWillMount==`function`&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount==`function`&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount==`function`&&(t.flags|=4194308)):(typeof o.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=c),o.props=r,o.state=c,o.context=l,r=s):(typeof o.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,oo(e,t),s=t.memoizedProps,l=t.type===t.elementType?s:Cs(t.type,s),o.props=l,d=t.pendingProps,f=o.context,c=n.contextType,typeof c==`object`&&c?c=$a(c):(c=ta(n)?$i:Zi.current,c=ea(t,c));var p=n.getDerivedStateFromProps;(u=typeof p==`function`||typeof o.getSnapshotBeforeUpdate==`function`)||typeof o.UNSAFE_componentWillReceiveProps!=`function`&&typeof o.componentWillReceiveProps!=`function`||(s!==d||f!==c)&&Os(t,o,r,c),io=!1,f=t.memoizedState,o.state=f,fo(t,r,o,i);var m=t.memoizedState;s!==d||f!==m||Qi.current||io?(typeof p==`function`&&(ws(t,n,p,r),m=t.memoizedState),(l=io||Es(t,n,l,r,f,m,c)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!=`function`&&typeof o.componentWillUpdate!=`function`||(typeof o.componentWillUpdate==`function`&&o.componentWillUpdate(r,m,c),typeof o.UNSAFE_componentWillUpdate==`function`&&o.UNSAFE_componentWillUpdate(r,m,c)),typeof o.componentDidUpdate==`function`&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof o.componentDidUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),o.props=r,o.state=m,o.context=c,r=l):(typeof o.componentDidUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!=`function`||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Ys(e,t,n,r,a,i)}function Ys(e,t,n,r,i,a){Ks(e,t);var o=(t.flags&128)!=0;if(!r&&!o)return i&&oa(t,n,!1),cc(e,t,a);r=t.stateNode,zs.current=t;var s=o&&typeof n.getDerivedStateFromError!=`function`?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Ua(t,e.child,null,a),t.child=Ua(t,null,s,a)):Vs(e,t,s,a),t.memoizedState=r.state,i&&oa(t,n,!0),t.child}function Xs(e){var t=e.stateNode;t.pendingContext?ra(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ra(e,t.context,!1),yo(e,t.containerInfo)}function Zs(e,t,n,r,i){return Ia(),La(i),t.flags|=256,Vs(e,t,n,r),t.child}var Qs={dehydrated:null,treeContext:null,retryLane:0};function $s(e){return{baseLanes:e,cachePool:null,transitions:null}}function ec(e,t,n){var r=t.pendingProps,i=Co.current,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!=0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),B(Co,i&1),e===null)return Ma(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data===`$!`?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:`hidden`,children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=Ql(o,r,0,null),e=Zl(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=$s(n),t.memoizedState=Qs,e):tc(t,o));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return rc(e,t,o,r,s,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,s=i.sibling;var c={mode:`hidden`,children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=c,t.deletions=null):(r=Yl(i,c),r.subtreeFlags=i.subtreeFlags&14680064),s===null?(a=Zl(a,o,n,null),a.flags|=2):a=Yl(s,a),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?$s(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=Qs,r}return a=e.child,e=a.sibling,r=Yl(a,{mode:`visible`,children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function tc(e,t){return t=Ql({mode:`visible`,children:t},e.mode,0,null),t.return=e,e.child=t}function nc(e,t,n,r){return r!==null&&La(r),Ua(t,e.child,null,n),e=tc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function rc(e,t,n,i,a,o,s){if(n)return t.flags&256?(t.flags&=-257,i=js(Error(r(422))),nc(e,t,s,i)):t.memoizedState===null?(o=i.fallback,a=t.mode,i=Ql({mode:`visible`,children:i.children},a,0,null),o=Zl(o,a,s,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,t.mode&1&&Ua(t,e.child,null,s),t.child.memoizedState=$s(s),t.memoizedState=Qs,o):(t.child=e.child,t.flags|=128,null);if(!(t.mode&1))return nc(e,t,s,null);if(a.data===`$!`){if(i=a.nextSibling&&a.nextSibling.dataset,i)var c=i.dgst;return i=c,o=Error(r(419)),i=js(o,i,void 0),nc(e,t,s,i)}if(c=(s&e.childLanes)!==0,Bs||c){if(i=Yc,i!==null){switch(s&-s){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(i.suspendedLanes|s))===0?a:0,a!==0&&a!==o.retryLane&&(o.retryLane=a,ro(e,a),ml(i,e,a,-1))}return Ol(),i=js(Error(r(421))),nc(e,t,s,i)}return a.data===`$?`?(t.flags|=128,t.child=e.child,t=Vl.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,Da=Ni(a.nextSibling),Ea=t,V=!0,Oa=null,e!==null&&(_a[va++]=ba,_a[va++]=xa,_a[va++]=ya,ba=e.id,xa=e.overflow,ya=t),t=tc(t,i.children),t.flags|=4096,t)}function ic(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Za(e.return,t,n)}function ac(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function oc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Vs(e,t,r.children,n),r=Co.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ic(e,n,t);else if(e.tag===19)ic(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(B(Co,r),!(t.mode&1))t.memoizedState=null;else switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&wo(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),ac(t,!1,i,n,a);break;case`backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&wo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}ac(t,!0,n,null,a);break;case`together`:ac(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function sc(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function cc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),X|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(r(153));if(t.child!==null){for(e=t.child,n=Yl(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Yl(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function lc(e,t,n){switch(t.tag){case 3:Xs(t),Ia();break;case 5:xo(t);break;case 1:ta(t.type)&&aa(t);break;case 4:yo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;B(Ga,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(B(Co,Co.current&1),e=cc(e,t,n),e===null?null:e.sibling):ec(e,t,n):(B(Co,Co.current&1),t.flags|=128,null);B(Co,Co.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return oc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),B(Co,Co.current),r)break;return null;case 22:case 23:return t.lanes=0,Gs(e,t,n)}return cc(e,t,n)}var uc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},dc=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,vo(ho.current);var o=null;switch(n){case`input`:i=Se(e,i),r=Se(e,r),o=[];break;case`select`:i=A({},i,{value:void 0}),r=A({},r,{value:void 0}),o=[];break;case`textarea`:i=Ae(e,i),r=Ae(e,r),o=[];break;default:typeof i.onClick!=`function`&&typeof r.onClick==`function`&&(e.onclick=wi)}We(n,r);var s;for(u in n=null,i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u===`style`){var c=i[u];for(s in c)c.hasOwnProperty(s)&&(n||={},n[s]=``)}else u!==`dangerouslySetInnerHTML`&&u!==`children`&&u!==`suppressContentEditableWarning`&&u!==`suppressHydrationWarning`&&u!==`autoFocus`&&(a.hasOwnProperty(u)?o||=[]:(o||=[]).push(u,null));for(u in r){var l=r[u];if(c=i?.[u],r.hasOwnProperty(u)&&l!==c&&(l!=null||c!=null))if(u===`style`)if(c){for(s in c)!c.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(n||={},n[s]=``);for(s in l)l.hasOwnProperty(s)&&c[s]!==l[s]&&(n||={},n[s]=l[s])}else n||(o||=[],o.push(u,n)),n=l;else u===`dangerouslySetInnerHTML`?(l=l?l.__html:void 0,c=c?c.__html:void 0,l!=null&&c!==l&&(o||=[]).push(u,l)):u===`children`?typeof l!=`string`&&typeof l!=`number`||(o||=[]).push(u,``+l):u!==`suppressContentEditableWarning`&&u!==`suppressHydrationWarning`&&(a.hasOwnProperty(u)?(l!=null&&u===`onScroll`&&ui(`scroll`,e),o||c===l||(o=[])):(o||=[]).push(u,l))}n&&(o||=[]).push(`style`,n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}},fc=function(e,t,n,r){n!==r&&(t.flags|=4)};function pc(e,t){if(!V)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function mc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function hc(e,t,n){var i=t.pendingProps;switch(Ta(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return mc(t),null;case 1:return ta(t.type)&&na(),mc(t),null;case 3:return i=t.stateNode,bo(),Yi(Qi),Yi(Zi),Eo(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(Pa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Oa!==null&&(vl(Oa),Oa=null))),mc(t),null;case 5:So(t);var o=vo(_o.current);if(n=t.type,e!==null&&t.stateNode!=null)dc(e,t,n,i,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(r(166));return mc(t),null}if(e=vo(ho.current),Pa(t)){i=t.stateNode,n=t.type;var s=t.memoizedProps;switch(i[Ii]=t,i[Li]=s,e=(t.mode&1)!=0,n){case`dialog`:ui(`cancel`,i),ui(`close`,i);break;case`iframe`:case`object`:case`embed`:ui(`load`,i);break;case`video`:case`audio`:for(o=0;o<oi.length;o++)ui(oi[o],i);break;case`source`:ui(`error`,i);break;case`img`:case`image`:case`link`:ui(`error`,i),ui(`load`,i);break;case`details`:ui(`toggle`,i);break;case`input`:Ce(i,s),ui(`invalid`,i);break;case`select`:i._wrapperState={wasMultiple:!!s.multiple},ui(`invalid`,i);break;case`textarea`:je(i,s),ui(`invalid`,i)}for(var c in We(n,s),o=null,s)if(s.hasOwnProperty(c)){var l=s[c];c===`children`?typeof l==`string`?i.textContent!==l&&(!0!==s.suppressHydrationWarning&&Ci(i.textContent,l,e),o=[`children`,l]):typeof l==`number`&&i.textContent!==``+l&&(!0!==s.suppressHydrationWarning&&Ci(i.textContent,l,e),o=[`children`,``+l]):a.hasOwnProperty(c)&&l!=null&&c===`onScroll`&&ui(`scroll`,i)}switch(n){case`input`:ye(i),Ee(i,s,!0);break;case`textarea`:ye(i),Ne(i);break;case`select`:case`option`:break;default:typeof s.onClick==`function`&&(i.onclick=wi)}i=o,t.updateQueue=i,i!==null&&(t.flags|=4)}else{c=o.nodeType===9?o:o.ownerDocument,e===`http://www.w3.org/1999/xhtml`&&(e=Pe(n)),e===`http://www.w3.org/1999/xhtml`?n===`script`?(e=c.createElement(`div`),e.innerHTML=`<script><\/script>`,e=e.removeChild(e.firstChild)):typeof i.is==`string`?e=c.createElement(n,{is:i.is}):(e=c.createElement(n),n===`select`&&(c=e,i.multiple?c.multiple=!0:i.size&&(c.size=i.size))):e=c.createElementNS(e,n),e[Ii]=t,e[Li]=i,uc(e,t,!1,!1),t.stateNode=e;a:{switch(c=Ge(n,i),n){case`dialog`:ui(`cancel`,e),ui(`close`,e),o=i;break;case`iframe`:case`object`:case`embed`:ui(`load`,e),o=i;break;case`video`:case`audio`:for(o=0;o<oi.length;o++)ui(oi[o],e);o=i;break;case`source`:ui(`error`,e),o=i;break;case`img`:case`image`:case`link`:ui(`error`,e),ui(`load`,e),o=i;break;case`details`:ui(`toggle`,e),o=i;break;case`input`:Ce(e,i),o=Se(e,i),ui(`invalid`,e);break;case`option`:o=i;break;case`select`:e._wrapperState={wasMultiple:!!i.multiple},o=A({},i,{value:void 0}),ui(`invalid`,e);break;case`textarea`:je(e,i),o=Ae(e,i),ui(`invalid`,e);break;default:o=i}for(s in We(n,o),l=o,l)if(l.hasOwnProperty(s)){var u=l[s];s===`style`?He(e,u):s===`dangerouslySetInnerHTML`?(u=u?u.__html:void 0,u!=null&&Le(e,u)):s===`children`?typeof u==`string`?(n!==`textarea`||u!==``)&&Re(e,u):typeof u==`number`&&Re(e,``+u):s!==`suppressContentEditableWarning`&&s!==`suppressHydrationWarning`&&s!==`autoFocus`&&(a.hasOwnProperty(s)?u!=null&&s===`onScroll`&&ui(`scroll`,e):u!=null&&S(e,s,u,c))}switch(n){case`input`:ye(e),Ee(e,i,!1);break;case`textarea`:ye(e),Ne(e);break;case`option`:i.value!=null&&e.setAttribute(`value`,``+ge(i.value));break;case`select`:e.multiple=!!i.multiple,s=i.value,s==null?i.defaultValue!=null&&ke(e,!!i.multiple,i.defaultValue,!0):ke(e,!!i.multiple,s,!1);break;default:typeof o.onClick==`function`&&(e.onclick=wi)}switch(n){case`button`:case`input`:case`select`:case`textarea`:i=!!i.autoFocus;break a;case`img`:i=!0;break a;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return mc(t),null;case 6:if(e&&t.stateNode!=null)fc(e,t,e.memoizedProps,i);else{if(typeof i!=`string`&&t.stateNode===null)throw Error(r(166));if(n=vo(_o.current),vo(ho.current),Pa(t)){if(i=t.stateNode,n=t.memoizedProps,i[Ii]=t,(s=i.nodeValue!==n)&&(e=Ea,e!==null))switch(e.tag){case 3:Ci(i.nodeValue,n,(e.mode&1)!=0);break;case 5:!0!==e.memoizedProps.suppressHydrationWarning&&Ci(i.nodeValue,n,(e.mode&1)!=0)}s&&(t.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Ii]=t,t.stateNode=i}return mc(t),null;case 13:if(Yi(Co),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(V&&Da!==null&&t.mode&1&&!(t.flags&128))Fa(),Ia(),t.flags|=98560,s=!1;else if(s=Pa(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(r(318));if(s=t.memoizedState,s=s===null?null:s.dehydrated,!s)throw Error(r(317));s[Ii]=t}else Ia(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;mc(t),s=!1}else Oa!==null&&(vl(Oa),Oa=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,t.mode&1&&(e===null||Co.current&1?Xc===0&&(Xc=3):Ol())),t.updateQueue!==null&&(t.flags|=4),mc(t),null);case 4:return bo(),e===null&&pi(t.stateNode.containerInfo),mc(t),null;case 10:return Xa(t.type._context),mc(t),null;case 17:return ta(t.type)&&na(),mc(t),null;case 19:if(Yi(Co),s=t.memoizedState,s===null)return mc(t),null;if(i=(t.flags&128)!=0,c=s.rendering,c===null)if(i)pc(s,!1);else{if(Xc!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(c=wo(e),c!==null){for(t.flags|=128,pc(s,!1),i=c.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=n,n=t.child;n!==null;)s=n,e=i,s.flags&=14680066,c=s.alternate,c===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=c.childLanes,s.lanes=c.lanes,s.child=c.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=c.memoizedProps,s.memoizedState=c.memoizedState,s.updateQueue=c.updateQueue,s.type=c.type,e=c.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return B(Co,Co.current&1|2),t.child}e=e.sibling}s.tail!==null&&xt()>rl&&(t.flags|=128,i=!0,pc(s,!1),t.lanes=4194304)}else{if(!i)if(e=wo(c),e!==null){if(t.flags|=128,i=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),pc(s,!0),s.tail===null&&s.tailMode===`hidden`&&!c.alternate&&!V)return mc(t),null}else 2*xt()-s.renderingStartTime>rl&&n!==1073741824&&(t.flags|=128,i=!0,pc(s,!1),t.lanes=4194304);s.isBackwards?(c.sibling=t.child,t.child=c):(n=s.last,n===null?t.child=c:n.sibling=c,s.last=c)}return s.tail===null?(mc(t),null):(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=xt(),t.sibling=null,n=Co.current,B(Co,i?n&1|2:n&1),t);case 22:case 23:return wl(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&t.mode&1?J&1073741824&&(mc(t),t.subtreeFlags&6&&(t.flags|=8192)):mc(t),null;case 24:return null;case 25:return null}throw Error(r(156,t.tag))}function gc(e,t){switch(Ta(t),t.tag){case 1:return ta(t.type)&&na(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return bo(),Yi(Qi),Yi(Zi),Eo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return So(t),null;case 13:if(Yi(Co),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(r(340));Ia()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Yi(Co),null;case 4:return bo(),null;case 10:return Xa(t.type._context),null;case 22:case 23:return wl(),null;case 24:return null;default:return null}}var _c=!1,vc=!1,yc=typeof WeakSet==`function`?WeakSet:Set,W=null;function bc(e,t){var n=e.ref;if(n!==null)if(typeof n==`function`)try{n(null)}catch(n){Rl(e,t,n)}else n.current=null}function xc(e,t,n){try{n()}catch(n){Rl(e,t,n)}}var Sc=!1;function Cc(e,t){if(Ti=gn,e=Lr(),Rr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Ei={focusedElem:e,selectionRange:n},gn=!1,W=t;W!==null;)if(t=W,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,W=e;else for(;W!==null;){t=W;try{var h=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(h!==null){var g=h.memoizedProps,_=h.memoizedState,v=t.stateNode;v.__reactInternalSnapshotBeforeUpdate=v.getSnapshotBeforeUpdate(t.elementType===t.type?g:Cs(t.type,g),_)}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent=``:y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(r(163))}}catch(e){Rl(t,t.return,e)}if(e=t.sibling,e!==null){e.return=t.return,W=e;break}W=t.return}return h=Sc,Sc=!1,h}function wc(e,t,n){var r=t.updateQueue;if(r=r===null?null:r.lastEffect,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&xc(t,n,a)}i=i.next}while(i!==r)}}function Tc(e,t){if(t=t.updateQueue,t=t===null?null:t.lastEffect,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ec(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t==`function`?t(e):t.current=e}}function Dc(e){var t=e.alternate;t!==null&&(e.alternate=null,Dc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ii],delete t[Li],delete t[zi],delete t[Bi],delete t[Vi])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Oc(e){return e.tag===5||e.tag===3||e.tag===4}function kc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Oc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ac(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=wi));else if(r!==4&&(e=e.child,e!==null))for(Ac(e,t,n),e=e.sibling;e!==null;)Ac(e,t,n),e=e.sibling}function jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(jc(e,t,n),e=e.sibling;e!==null;)jc(e,t,n),e=e.sibling}var Mc=null,Nc=!1;function Pc(e,t,n){for(n=n.child;n!==null;)Fc(e,t,n),n=n.sibling}function Fc(e,t,n){if(kt&&typeof kt.onCommitFiberUnmount==`function`)try{kt.onCommitFiberUnmount(Ot,n)}catch{}switch(n.tag){case 5:vc||bc(n,t);case 6:var r=Mc,i=Nc;Mc=null,Pc(e,t,n),Mc=r,Nc=i,Mc!==null&&(Nc?(e=Mc,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Mc.removeChild(n.stateNode));break;case 18:Mc!==null&&(Nc?(e=Mc,n=n.stateNode,e.nodeType===8?Mi(e.parentNode,n):e.nodeType===1&&Mi(e,n),mn(e)):Mi(Mc,n.stateNode));break;case 4:r=Mc,i=Nc,Mc=n.stateNode.containerInfo,Nc=!0,Pc(e,t,n),Mc=r,Nc=i;break;case 0:case 11:case 14:case 15:if(!vc&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&xc(n,t,o),i=i.next}while(i!==r)}Pc(e,t,n);break;case 1:if(!vc&&(bc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(e){Rl(n,t,e)}Pc(e,t,n);break;case 21:Pc(e,t,n);break;case 22:n.mode&1?(vc=(r=vc)||n.memoizedState!==null,Pc(e,t,n),vc=r):Pc(e,t,n);break;default:Pc(e,t,n)}}function Ic(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new yc),t.forEach(function(t){var r=Hl.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}}function Lc(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];try{var o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 5:Mc=c.stateNode,Nc=!1;break a;case 3:Mc=c.stateNode.containerInfo,Nc=!0;break a;case 4:Mc=c.stateNode.containerInfo,Nc=!0;break a}c=c.return}if(Mc===null)throw Error(r(160));Fc(o,s,a),Mc=null,Nc=!1;var l=a.alternate;l!==null&&(l.return=null),a.return=null}catch(e){Rl(a,t,e)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Rc(t,e),t=t.sibling}function Rc(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Lc(t,e),zc(e),i&4){try{wc(3,e,e.return),Tc(3,e)}catch(t){Rl(e,e.return,t)}try{wc(5,e,e.return)}catch(t){Rl(e,e.return,t)}}break;case 1:Lc(t,e),zc(e),i&512&&n!==null&&bc(n,n.return);break;case 5:if(Lc(t,e),zc(e),i&512&&n!==null&&bc(n,n.return),e.flags&32){var a=e.stateNode;try{Re(a,``)}catch(t){Rl(e,e.return,t)}}if(i&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,s=n===null?o:n.memoizedProps,c=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{c===`input`&&o.type===`radio`&&o.name!=null&&we(a,o),Ge(c,s);var u=Ge(c,o);for(s=0;s<l.length;s+=2){var d=l[s],f=l[s+1];d===`style`?He(a,f):d===`dangerouslySetInnerHTML`?Le(a,f):d===`children`?Re(a,f):S(a,d,f,u)}switch(c){case`input`:Te(a,o);break;case`textarea`:Me(a,o);break;case`select`:var p=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var m=o.value;m==null?p!==!!o.multiple&&(o.defaultValue==null?ke(a,!!o.multiple,o.multiple?[]:``,!1):ke(a,!!o.multiple,o.defaultValue,!0)):ke(a,!!o.multiple,m,!1)}a[Li]=o}catch(t){Rl(e,e.return,t)}}break;case 6:if(Lc(t,e),zc(e),i&4){if(e.stateNode===null)throw Error(r(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(t){Rl(e,e.return,t)}}break;case 3:if(Lc(t,e),zc(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{mn(t.containerInfo)}catch(t){Rl(e,e.return,t)}break;case 4:Lc(t,e),zc(e);break;case 13:Lc(t,e),zc(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(nl=xt())),i&4&&Ic(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(vc=(u=vc)||d,Lc(t,e),vc=u):Lc(t,e),zc(e),i&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!d&&e.mode&1)for(W=e,d=e.child;d!==null;){for(f=W=d;W!==null;){switch(p=W,m=p.child,p.tag){case 0:case 11:case 14:case 15:wc(4,p,p.return);break;case 1:bc(p,p.return);var h=p.stateNode;if(typeof h.componentWillUnmount==`function`){i=p,n=p.return;try{t=i,h.props=t.memoizedProps,h.state=t.memoizedState,h.componentWillUnmount()}catch(e){Rl(i,n,e)}}break;case 5:bc(p,p.return);break;case 22:if(p.memoizedState!==null){Uc(f);continue}}m===null?Uc(f):(m.return=p,W=m)}d=d.sibling}a:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{a=f.stateNode,u?(o=a.style,typeof o.setProperty==`function`?o.setProperty(`display`,`none`,`important`):o.display=`none`):(c=f.stateNode,l=f.memoizedProps.style,s=l!=null&&l.hasOwnProperty(`display`)?l.display:null,c.style.display=Ve(`display`,s))}catch(t){Rl(e,e.return,t)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=u?``:f.memoizedProps}catch(t){Rl(e,e.return,t)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break a;for(;f.sibling===null;){if(f.return===null||f.return===e)break a;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Lc(t,e),zc(e),i&4&&Ic(e);break;case 21:break;default:Lc(t,e),zc(e)}}function zc(e){var t=e.flags;if(t&2){try{a:{for(var n=e.return;n!==null;){if(Oc(n)){var i=n;break a}n=n.return}throw Error(r(160))}switch(i.tag){case 5:var a=i.stateNode;i.flags&32&&(Re(a,``),i.flags&=-33),jc(e,kc(e),a);break;case 3:case 4:var o=i.stateNode.containerInfo;Ac(e,kc(e),o);break;default:throw Error(r(161))}}catch(t){Rl(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Bc(e,t,n){W=e,Vc(e,t,n)}function Vc(e,t,n){for(var r=(e.mode&1)!=0;W!==null;){var i=W,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||_c;if(!o){var s=i.alternate,c=s!==null&&s.memoizedState!==null||vc;s=_c;var l=vc;if(_c=o,(vc=c)&&!l)for(W=i;W!==null;)o=W,c=o.child,o.tag===22&&o.memoizedState!==null||c===null?Wc(i):(c.return=o,W=c);for(;a!==null;)W=a,Vc(a,t,n),a=a.sibling;W=i,_c=s,vc=l}Hc(e,t,n)}else i.subtreeFlags&8772&&a!==null?(a.return=i,W=a):Hc(e,t,n)}}function Hc(e){for(;W!==null;){var t=W;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:vc||Tc(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!vc)if(n===null)i.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Cs(t.type,n.memoizedProps);i.componentDidUpdate(a,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&po(t,o,i);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}po(t,s,n)}break;case 5:var c=t.stateNode;if(n===null&&t.flags&4){n=c;var l=t.memoizedProps;switch(t.type){case`button`:case`input`:case`select`:case`textarea`:l.autoFocus&&n.focus();break;case`img`:l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&mn(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(r(163))}vc||t.flags&512&&Ec(t)}catch(e){Rl(t,t.return,e)}}if(t===e){W=null;break}if(n=t.sibling,n!==null){n.return=t.return,W=n;break}W=t.return}}function Uc(e){for(;W!==null;){var t=W;if(t===e){W=null;break}var n=t.sibling;if(n!==null){n.return=t.return,W=n;break}W=t.return}}function Wc(e){for(;W!==null;){var t=W;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Tc(4,t)}catch(e){Rl(t,n,e)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount==`function`){var i=t.return;try{r.componentDidMount()}catch(e){Rl(t,i,e)}}var a=t.return;try{Ec(t)}catch(e){Rl(t,a,e)}break;case 5:var o=t.return;try{Ec(t)}catch(e){Rl(t,o,e)}}}catch(e){Rl(t,t.return,e)}if(t===e){W=null;break}var s=t.sibling;if(s!==null){s.return=t.return,W=s;break}W=t.return}}var Gc=Math.ceil,Kc=C.ReactCurrentDispatcher,qc=C.ReactCurrentOwner,Jc=C.ReactCurrentBatchConfig,G=0,Yc=null,K=null,q=0,J=0,Y=Ji(0),Xc=0,Zc=null,X=0,Qc=0,$c=0,el=null,tl=null,nl=0,rl=1/0,il=null,Z=!1,al=null,ol=null,sl=!1,Q=null,$=0,cl=0,ll=null,ul=-1,dl=0;function fl(){return G&6?xt():ul===-1?ul=xt():ul}function pl(e){return e.mode&1?G&2&&q!==0?q&-q:Ra.transition===null?(e=I,e===0?(e=window.event,e=e===void 0?16:Sn(e.type),e):e):(dl===0&&(dl=Ht()),dl):1}function ml(e,t,n,i){if(50<cl)throw cl=0,ll=null,Error(r(185));Ut(e,n,i),(!(G&2)||e!==Yc)&&(e===Yc&&(!(G&2)&&(Qc|=n),Xc===4&&bl(e,q)),hl(e,i),n===1&&G===0&&!(t.mode&1)&&(rl=xt()+500,ca&&fa()))}function hl(e,t){var n=e.callbackNode;Bt(e,t);var r=Rt(e,e===Yc?q:0);if(r===0)n!==null&&vt(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&vt(n),t===1)e.tag===0?da(xl.bind(null,e)):ua(xl.bind(null,e)),Ai(function(){!(G&6)&&fa()}),n=null;else{switch(Kt(r)){case 1:n=Ct;break;case 4:n=wt;break;case 16:n=Tt;break;case 536870912:n=Dt;break;default:n=Tt}n=Wl(n,gl.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function gl(e,t){if(ul=-1,dl=0,G&6)throw Error(r(327));var n=e.callbackNode;if(Il()&&e.callbackNode!==n)return null;var i=Rt(e,e===Yc?q:0);if(i===0)return null;if(i&30||(i&e.expiredLanes)!==0||t)t=kl(e,i);else{t=i;var a=G;G|=2;var o=Dl();(Yc!==e||q!==t)&&(il=null,rl=xt()+500,Tl(e,t));do try{jl();break}catch(t){El(e,t)}while(1);Ya(),Kc.current=o,G=a,K===null?(Yc=null,q=0,t=Xc):t=0}if(t!==0){if(t===2&&(a=Vt(e),a!==0&&(i=a,t=_l(e,a))),t===1)throw n=Zc,Tl(e,0),bl(e,i),hl(e,xt()),n;if(t===6)bl(e,i);else{if(a=e.current.alternate,!(i&30)&&!yl(a)&&(t=kl(e,i),t===2&&(o=Vt(e),o!==0&&(i=o,t=_l(e,o))),t===1))throw n=Zc,Tl(e,0),bl(e,i),hl(e,xt()),n;switch(e.finishedWork=a,e.finishedLanes=i,t){case 0:case 1:throw Error(r(345));case 2:Pl(e,tl,il);break;case 3:if(bl(e,i),(i&130023424)===i&&(t=nl+500-xt(),10<t)){if(Rt(e,0)!==0)break;if(a=e.suspendedLanes,(a&i)!==i){fl(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=z(Pl.bind(null,e,tl,il),t);break}Pl(e,tl,il);break;case 4:if(bl(e,i),(i&4194240)===i)break;for(t=e.eventTimes,a=-1;0<i;){var s=31-jt(i);o=1<<s,s=t[s],s>a&&(a=s),i&=~o}if(i=a,i=xt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Gc(i/1960))-i,10<i){e.timeoutHandle=z(Pl.bind(null,e,tl,il),i);break}Pl(e,tl,il);break;case 5:Pl(e,tl,il);break;default:throw Error(r(329))}}}return hl(e,xt()),e.callbackNode===n?gl.bind(null,e):null}function _l(e,t){var n=el;return e.current.memoizedState.isDehydrated&&(Tl(e,t).flags|=256),e=kl(e,t),e!==2&&(t=tl,tl=n,t!==null&&vl(t)),e}function vl(e){tl===null?tl=e:tl.push.apply(tl,e)}function yl(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Mr(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function bl(e,t){for(t&=~$c,t&=~Qc,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-jt(t),r=1<<n;e[n]=-1,t&=~r}}function xl(e){if(G&6)throw Error(r(327));Il();var t=Rt(e,0);if(!(t&1))return hl(e,xt()),null;var n=kl(e,t);if(e.tag!==0&&n===2){var i=Vt(e);i!==0&&(t=i,n=_l(e,i))}if(n===1)throw n=Zc,Tl(e,0),bl(e,t),hl(e,xt()),n;if(n===6)throw Error(r(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Pl(e,tl,il),hl(e,xt()),null}function Sl(e,t){var n=G;G|=1;try{return e(t)}finally{G=n,G===0&&(rl=xt()+500,ca&&fa())}}function Cl(e){Q!==null&&Q.tag===0&&!(G&6)&&Il();var t=G;G|=1;var n=Jc.transition,r=I;try{if(Jc.transition=null,I=1,e)return e()}finally{I=r,Jc.transition=n,G=t,!(G&6)&&fa()}}function wl(){J=Y.current,Yi(Y)}function Tl(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Oi(n)),K!==null)for(n=K.return;n!==null;){var r=n;switch(Ta(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&na();break;case 3:bo(),Yi(Qi),Yi(Zi),Eo();break;case 5:So(r);break;case 4:bo();break;case 13:Yi(Co);break;case 19:Yi(Co);break;case 10:Xa(r.type._context);break;case 22:case 23:wl()}n=n.return}if(Yc=e,K=e=Yl(e.current,null),q=J=t,Xc=0,Zc=null,$c=Qc=X=0,tl=el=null,eo!==null){for(t=0;t<eo.length;t++)if(n=eo[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}eo=null}return e}function El(e,t){do{var n=K;try{if(Ya(),Do.current=ys,No){for(var i=Ao.memoizedState;i!==null;){var a=i.queue;a!==null&&(a.pending=null),i=i.next}No=!1}if(ko=0,Mo=jo=Ao=null,Po=!1,H=0,qc.current=null,n===null||n.return===null){Xc=1,Zc=t,K=null;break}a:{var o=e,s=n.return,c=n,l=t;if(t=q,c.flags|=32768,typeof l==`object`&&l&&typeof l.then==`function`){var u=l,d=c,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=Ls(s);if(m!==null){m.flags&=-257,Rs(m,s,c,o,t),m.mode&1&&Is(o,u,t),t=m,l=u;var h=t.updateQueue;if(h===null){var g=new Set;g.add(l),t.updateQueue=g}else h.add(l);break a}else{if(!(t&1)){Is(o,u,t),Ol();break a}l=Error(r(426))}}else if(V&&c.mode&1){var _=Ls(s);if(_!==null){!(_.flags&65536)&&(_.flags|=256),Rs(_,s,c,o,t),La(As(l,c));break a}}o=l=As(l,c),Xc!==4&&(Xc=2),el===null?el=[o]:el.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var v=Ps(o,l,t);uo(o,v);break a;case 1:c=l;var y=o.type,b=o.stateNode;if(!(o.flags&128)&&(typeof y.getDerivedStateFromError==`function`||b!==null&&typeof b.componentDidCatch==`function`&&(ol===null||!ol.has(b)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=Fs(o,c,t);uo(o,x);break a}}o=o.return}while(o!==null)}Nl(n)}catch(e){t=e,K===n&&n!==null&&(K=n=n.return);continue}break}while(1)}function Dl(){var e=Kc.current;return Kc.current=ys,e===null?ys:e}function Ol(){(Xc===0||Xc===3||Xc===2)&&(Xc=4),Yc===null||!(X&268435455)&&!(Qc&268435455)||bl(Yc,q)}function kl(e,t){var n=G;G|=2;var i=Dl();(Yc!==e||q!==t)&&(il=null,Tl(e,t));do try{Al();break}catch(t){El(e,t)}while(1);if(Ya(),G=n,Kc.current=i,K!==null)throw Error(r(261));return Yc=null,q=0,Xc}function Al(){for(;K!==null;)Ml(K)}function jl(){for(;K!==null&&!yt();)Ml(K)}function Ml(e){var t=Ul(e.alternate,e,J);e.memoizedProps=e.pendingProps,t===null?Nl(e):K=t,qc.current=null}function Nl(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=gc(n,t),n!==null){n.flags&=32767,K=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Xc=6,K=null;return}}else if(n=hc(n,t,J),n!==null){K=n;return}if(t=t.sibling,t!==null){K=t;return}K=t=e}while(t!==null);Xc===0&&(Xc=5)}function Pl(e,t,n){var r=I,i=Jc.transition;try{Jc.transition=null,I=1,Fl(e,t,n,r)}finally{Jc.transition=i,I=r}return null}function Fl(e,t,n,i){do Il();while(Q!==null);if(G&6)throw Error(r(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(r(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(Wt(e,o),e===Yc&&(K=Yc=null,q=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||sl||(sl=!0,Wl(Tt,function(){return Il(),null})),o=(n.flags&15990)!=0,n.subtreeFlags&15990||o){o=Jc.transition,Jc.transition=null;var s=I;I=1;var c=G;G|=4,qc.current=null,Cc(e,n),Rc(n,e),zr(Ei),gn=!!Ti,Ei=Ti=null,e.current=n,Bc(n,e,a),bt(),G=c,I=s,Jc.transition=o}else e.current=n;if(sl&&(sl=!1,Q=e,$=a),o=e.pendingLanes,o===0&&(ol=null),At(n.stateNode,i),hl(e,xt()),t!==null)for(i=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],i(a.value,{componentStack:a.stack,digest:a.digest});if(Z)throw Z=!1,e=al,al=null,e;return $&1&&e.tag!==0&&Il(),o=e.pendingLanes,o&1?e===ll?cl++:(cl=0,ll=e):cl=0,fa(),null}function Il(){if(Q!==null){var e=Kt($),t=Jc.transition,n=I;try{if(Jc.transition=null,I=16>e?16:e,Q===null)var i=!1;else{if(e=Q,Q=null,$=0,G&6)throw Error(r(331));var a=G;for(G|=4,W=e.current;W!==null;){var o=W,s=o.child;if(W.flags&16){var c=o.deletions;if(c!==null){for(var l=0;l<c.length;l++){var u=c[l];for(W=u;W!==null;){var d=W;switch(d.tag){case 0:case 11:case 15:wc(8,d,o)}var f=d.child;if(f!==null)f.return=d,W=f;else for(;W!==null;){d=W;var p=d.sibling,m=d.return;if(Dc(d),d===u){W=null;break}if(p!==null){p.return=m,W=p;break}W=m}}}var h=o.alternate;if(h!==null){var g=h.child;if(g!==null){h.child=null;do{var _=g.sibling;g.sibling=null,g=_}while(g!==null)}}W=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,W=s;else b:for(;W!==null;){if(o=W,o.flags&2048)switch(o.tag){case 0:case 11:case 15:wc(9,o,o.return)}var v=o.sibling;if(v!==null){v.return=o.return,W=v;break b}W=o.return}}var y=e.current;for(W=y;W!==null;){s=W;var b=s.child;if(s.subtreeFlags&2064&&b!==null)b.return=s,W=b;else b:for(s=y;W!==null;){if(c=W,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Tc(9,c)}}catch(e){Rl(c,c.return,e)}if(c===s){W=null;break b}var x=c.sibling;if(x!==null){x.return=c.return,W=x;break b}W=c.return}}if(G=a,fa(),kt&&typeof kt.onPostCommitFiberRoot==`function`)try{kt.onPostCommitFiberRoot(Ot,e)}catch{}i=!0}return i}finally{I=n,Jc.transition=t}}return!1}function Ll(e,t,n){t=As(n,t),t=Ps(e,t,1),e=co(e,t,1),t=fl(),e!==null&&(Ut(e,1,t),hl(e,t))}function Rl(e,t,n){if(e.tag===3)Ll(e,e,n);else for(;t!==null;){if(t.tag===3){Ll(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ol===null||!ol.has(r))){e=As(n,e),e=Fs(t,e,1),t=co(t,e,1),e=fl(),t!==null&&(Ut(t,1,e),hl(t,e));break}}t=t.return}}function zl(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=fl(),e.pingedLanes|=e.suspendedLanes&n,Yc===e&&(q&n)===n&&(Xc===4||Xc===3&&(q&130023424)===q&&500>xt()-nl?Tl(e,0):$c|=n),hl(e,t)}function Bl(e,t){t===0&&(e.mode&1?(t=It,It<<=1,!(It&130023424)&&(It=4194304)):t=1);var n=fl();e=ro(e,t),e!==null&&(Ut(e,t,n),hl(e,n))}function Vl(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Bl(e,n)}function Hl(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(r(314))}i!==null&&i.delete(t),Bl(e,n)}var Ul=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Qi.current)Bs=!0;else{if((e.lanes&n)===0&&!(t.flags&128))return Bs=!1,lc(e,t,n);Bs=!!(e.flags&131072)}else Bs=!1,V&&t.flags&1048576&&Ca(t,ga,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;sc(e,t),e=t.pendingProps;var a=ea(t,Zi.current);Qa(t,n),a=U(null,t,i,e,a,n);var o=Ro();return t.flags|=1,typeof a==`object`&&a&&typeof a.render==`function`&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ta(i)?(o=!0,aa(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,ao(t),a.updater=Ts,t.stateNode=a,a._reactInternals=t,ks(t,i,e,n),t=Ys(null,t,i,!0,o,n)):(t.tag=0,V&&o&&wa(t),Vs(null,t,a,n),t=t.child),t;case 16:i=t.elementType;a:{switch(sc(e,t),e=t.pendingProps,a=i._init,i=a(i._payload),t.type=i,a=t.tag=Jl(i),e=Cs(i,e),a){case 0:t=qs(null,t,i,e,n);break a;case 1:t=Js(null,t,i,e,n);break a;case 11:t=Hs(null,t,i,e,n);break a;case 14:t=Us(null,t,i,Cs(i.type,e),n);break a}throw Error(r(306,i,``))}return t;case 0:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Cs(i,a),qs(e,t,i,a,n);case 1:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Cs(i,a),Js(e,t,i,a,n);case 3:a:{if(Xs(t),e===null)throw Error(r(387));i=t.pendingProps,o=t.memoizedState,a=o.element,oo(e,t),fo(t,i,null,n);var s=t.memoizedState;if(i=s.element,o.isDehydrated)if(o={element:i,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=As(Error(r(423)),t),t=Zs(e,t,i,n,a);break a}else if(i!==a){a=As(Error(r(424)),t),t=Zs(e,t,i,n,a);break a}else for(Da=Ni(t.stateNode.containerInfo.firstChild),Ea=t,V=!0,Oa=null,n=Wa(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ia(),i===a){t=cc(e,t,n);break a}Vs(e,t,i,n)}t=t.child}return t;case 5:return xo(t),e===null&&Ma(t),i=t.type,a=t.pendingProps,o=e===null?null:e.memoizedProps,s=a.children,Di(i,a)?s=null:o!==null&&Di(i,o)&&(t.flags|=32),Ks(e,t),Vs(e,t,s,n),t.child;case 6:return e===null&&Ma(t),null;case 13:return ec(e,t,n);case 4:return yo(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Ua(t,null,i,n):Vs(e,t,i,n),t.child;case 11:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Cs(i,a),Hs(e,t,i,a,n);case 7:return Vs(e,t,t.pendingProps,n),t.child;case 8:return Vs(e,t,t.pendingProps.children,n),t.child;case 12:return Vs(e,t,t.pendingProps.children,n),t.child;case 10:a:{if(i=t.type._context,a=t.pendingProps,o=t.memoizedProps,s=a.value,B(Ga,i._currentValue),i._currentValue=s,o!==null)if(Mr(o.value,s)){if(o.children===a.children&&!Qi.current){t=cc(e,t,n);break a}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var c=o.dependencies;if(c!==null){s=o.child;for(var l=c.firstContext;l!==null;){if(l.context===i){if(o.tag===1){l=so(-1,n&-n),l.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?l.next=l:(l.next=d.next,d.next=l),u.pending=l}}o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Za(o.return,n,t),c.lanes|=n;break}l=l.next}}else if(o.tag===10)s=o.type===t.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(r(341));s.lanes|=n,c=s.alternate,c!==null&&(c.lanes|=n),Za(s,n,t),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===t){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}Vs(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,i=t.pendingProps.children,Qa(t,n),a=$a(a),i=i(a),t.flags|=1,Vs(e,t,i,n),t.child;case 14:return i=t.type,a=Cs(i,t.pendingProps),a=Cs(i.type,a),Us(e,t,i,a,n);case 15:return Ws(e,t,t.type,t.pendingProps,n);case 17:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:Cs(i,a),sc(e,t),t.tag=1,ta(i)?(e=!0,aa(t)):e=!1,Qa(t,n),Ds(t,i,a),ks(t,i,a,n),Ys(null,t,i,!0,e,n);case 19:return oc(e,t,n);case 22:return Gs(e,t,n)}throw Error(r(156,t.tag))};function Wl(e,t){return P(e,t)}function Gl(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Kl(e,t,n,r){return new Gl(e,t,n,r)}function ql(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Jl(e){if(typeof e==`function`)return+!!ql(e);if(e!=null){if(e=e.$$typeof,e===ne)return 11;if(e===ae)return 14}return 2}function Yl(e,t){var n=e.alternate;return n===null?(n=Kl(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Xl(e,t,n,i,a,o){var s=2;if(i=e,typeof e==`function`)ql(e)&&(s=1);else if(typeof e==`string`)s=5;else a:switch(e){case E:return Zl(n.children,a,o,t);case ee:s=8,a|=8;break;case te:return e=Kl(12,n,t,a|2),e.elementType=te,e.lanes=o,e;case re:return e=Kl(13,n,t,a),e.elementType=re,e.lanes=o,e;case ie:return e=Kl(19,n,t,a),e.elementType=ie,e.lanes=o,e;case oe:return Ql(n,a,o,t);default:if(typeof e==`object`&&e)switch(e.$$typeof){case D:s=10;break a;case O:s=9;break a;case ne:s=11;break a;case ae:s=14;break a;case k:s=16,i=null;break a}throw Error(r(130,e==null?e:typeof e,``))}return t=Kl(s,n,t,a),t.elementType=e,t.type=i,t.lanes=o,t}function Zl(e,t,n,r){return e=Kl(7,e,r,t),e.lanes=n,e}function Ql(e,t,n,r){return e=Kl(22,e,r,t),e.elementType=oe,e.lanes=n,e.stateNode={isHidden:!1},e}function $l(e,t,n){return e=Kl(6,e,null,t),e.lanes=n,e}function eu(e,t,n){return t=Kl(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function tu(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=F(0),this.expirationTimes=F(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=F(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function nu(e,t,n,r,i,a,o,s,c){return e=new tu(e,t,n,s,c),t===1?(t=1,!0===a&&(t|=8)):t=0,a=Kl(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ao(a),e}function ru(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:T,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}function iu(e){if(!e)return Xi;e=e._reactInternals;a:{if(ft(e)!==e||e.tag!==1)throw Error(r(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break a;case 1:if(ta(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break a}}t=t.return}while(t!==null);throw Error(r(171))}if(e.tag===1){var n=e.type;if(ta(n))return ia(e,n,t)}return t}function au(e,t,n,r,i,a,o,s,c){return e=nu(n,r,!0,e,i,a,o,s,c),e.context=iu(null),n=e.current,r=fl(),i=pl(n),a=so(r,i),a.callback=t??null,co(n,a,i),e.current.lanes=i,Ut(e,i,r),hl(e,r),e}function ou(e,t,n,r){var i=t.current,a=fl(),o=pl(i);return n=iu(n),t.context===null?t.context=n:t.pendingContext=n,t=so(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=co(i,t,o),e!==null&&(ml(e,i,o,a),lo(e,i,o)),o}function su(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function cu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function lu(e,t){cu(e,t),(e=e.alternate)&&cu(e,t)}function uu(){return null}var du=typeof reportError==`function`?reportError:function(e){console.error(e)};function fu(e){this._internalRoot=e}pu.prototype.render=fu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(r(409));ou(e,t,null,null)},pu.prototype.unmount=fu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Cl(function(){ou(null,e,null,null)}),t[Ri]=null}};function pu(e){this._internalRoot=e}pu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Yt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<rn.length&&t!==0&&t<rn[n].priority;n++);rn.splice(n,0,e),n===0&&ln(e)}};function mu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function hu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==` react-mount-point-unstable `))}function gu(){}function _u(e,t,n,r,i){if(i){if(typeof r==`function`){var a=r;r=function(){var e=su(o);a.call(e)}}var o=au(t,r,e,0,null,!1,!1,``,gu);return e._reactRootContainer=o,e[Ri]=o.current,pi(e.nodeType===8?e.parentNode:e),Cl(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r==`function`){var s=r;r=function(){var e=su(c);s.call(e)}}var c=nu(e,0,!1,null,null,!1,!1,``,gu);return e._reactRootContainer=c,e[Ri]=c.current,pi(e.nodeType===8?e.parentNode:e),Cl(function(){ou(t,c,n,r)}),c}function vu(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i==`function`){var s=i;i=function(){var e=su(o);s.call(e)}}ou(t,o,e,i)}else o=_u(n,t,e,i,r);return su(o)}qt=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Lt(t.pendingLanes);n!==0&&(Gt(t,n|1),hl(t,xt()),!(G&6)&&(rl=xt()+500,fa()))}break;case 13:Cl(function(){var t=ro(e,1);t!==null&&ml(t,e,1,fl())}),lu(e,1)}},Jt=function(e){if(e.tag===13){var t=ro(e,134217728);t!==null&&ml(t,e,134217728,fl()),lu(e,134217728)}},L=function(e){if(e.tag===13){var t=pl(e),n=ro(e,t);n!==null&&ml(n,e,t,fl()),lu(e,t)}},Yt=function(){return I},Xt=function(e,t){var n=I;try{return I=e,t()}finally{I=n}},Je=function(e,t,n){switch(t){case`input`:if(Te(e,n),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name=`+JSON.stringify(``+t)+`][type="radio"]`),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=Gi(i);if(!a)throw Error(r(90));be(i),Te(i,a)}}}break;case`textarea`:Me(e,n);break;case`select`:t=n.value,t!=null&&ke(e,!!n.multiple,t,!1)}},et=Sl,tt=Cl;var yu={usingClientEntryPoint:!1,Events:[Ui,Wi,Gi,Qe,$e,Sl]},bu={findFiberByHostInstance:Hi,bundleType:0,version:`18.3.1`,rendererPackageName:`react-dom`},xu={bundleType:bu.bundleType,version:bu.version,rendererPackageName:bu.rendererPackageName,rendererConfig:bu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=gt(e),e===null?null:e.stateNode},findFiberByHostInstance:bu.findFiberByHostInstance||uu,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:`18.3.1-next-f1338f8080-20240426`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Su=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Su.isDisabled&&Su.supportsFiber)try{Ot=Su.inject(xu),kt=Su}catch{}}e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=yu,e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!mu(t))throw Error(r(200));return ru(e,t,null,n)},e.createRoot=function(e,t){if(!mu(e))throw Error(r(299));var n=!1,i=``,a=du;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=nu(e,1,!1,null,null,n,!1,i,a),e[Ri]=t.current,pi(e.nodeType===8?e.parentNode:e),new fu(t)},e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(r(188)):(e=Object.keys(e).join(`,`),Error(r(268,e)));return e=gt(t),e=e===null?null:e.stateNode,e},e.flushSync=function(e){return Cl(e)},e.hydrate=function(e,t,n){if(!hu(t))throw Error(r(200));return vu(null,e,t,!0,n)},e.hydrateRoot=function(e,t,n){if(!mu(e))throw Error(r(405));var i=n!=null&&n.hydratedSources||null,a=!1,o=``,s=du;if(n!=null&&(!0===n.unstable_strictMode&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=au(t,null,e,1,n??null,a,!1,o,s),e[Ri]=t.current,pi(e),i)for(e=0;e<i.length;e++)n=i[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new pu(t)},e.render=function(e,t,n){if(!hu(t))throw Error(r(200));return vu(null,e,t,!1,n)},e.unmountComponentAtNode=function(e){if(!hu(e))throw Error(r(40));return e._reactRootContainer?(Cl(function(){vu(null,null,e,!1,function(){e._reactRootContainer=null,e[Ri]=null})}),!0):!1},e.unstable_batchedUpdates=Sl,e.unstable_renderSubtreeIntoContainer=function(e,t,n,i){if(!hu(n))throw Error(r(200));if(e==null||e._reactInternals===void 0)throw Error(r(38));return vu(e,t,n,!1,i)},e.version=`18.3.1-next-f1338f8080-20240426`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=l(o((e=>{var t=h();e.createRoot=t.createRoot,e.hydrateRoot=t.hydrateRoot}))(),1),_={enableRender:!0,resolutionScale:.5,"resolution/width":1920,"resolution/height":1080,viewType:`render`,"frameLoop/enabled":!1,"frameLoop/start":0,"frameLoop/end":0,selectedEntityId:`34e12786-4d92-4f7c-8d33-32730687bdb6`,selectedAsset:{name:`OREngineCube`,assetType:`material`},navigateAsset:null,propertyTarget:`entity`,cameraMode:`preview`,gizmoMode:`translate`,"helpers/show":!0,"helpers/empty":!0,"helpers/camera":!0,"helpers/light":!0,"helpers/wireframe":!1,"camera/position":[.05483466718929176,2.1441760888120505,12.417943092713458],"camera/target":[0,0,0]},v={name:`demo-webgl`,scene:{name:`root`,uuid:`0`,components:[{name:`BLidgeClient`,uuid:`1`,props:{mode:`json`,gltf:!0,gltfPath:`/scene.glb`,"websocket/url":`ws://localhost:3100`,attachments:[{name:`Camera`,components:[{name:`Camera`,uuid:`4ec0479f-f58f-4644-a7f4-0204813c5c99`},{name:`CameraController`,uuid:`3d0e3c4f-7110-43bc-917a-00850232c7b1`}]},{name:`OREngine`,components:[{name:`OREngineLogo`,uuid:`2999221c-8614-47c8-91a4-129c6585343f`}]},{name:`OREngineCube`,components:[{name:`OREngineCube`,uuid:`056176b4-e208-42ce-bd17-5ea264f09d86`}]},{name:`SkyBox`,components:[{name:`SkyBox`,uuid:`38b46f5d-36cb-49af-b6b2-57643941c4d5`}]}]}}]},renderer:{"sky/skyColor":[1,1,1],"sky/groundColor":[.3,.3,.3],"sky/intensity":1,"pipeline/motionBlur/enabled":!0,"pipeline/motionBlur/power":1,"pipeline/ssr/enabled":!0,"pipeline/ssao/enabled":!0,"pipeline/dof/enabled":!0,"pipeline/lightShaft/enabled":!0},"timeline/duration":600,"timeline/fps":60},y=l(d()),b=(0,y.createContext)(null),x={didCatch:!1,error:null},S=class extends y.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=x}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){let{error:e}=this.state;if(e!==null){var t,n,r=[...arguments];(t=(n=this.props).onReset)==null||t.call(n,{args:r,reason:`imperative-api`}),this.setState(x)}}componentDidCatch(e,t){var n,r;(n=(r=this.props).onError)==null||n.call(r,e,t)}componentDidUpdate(e,t){let{didCatch:n}=this.state,{resetKeys:r}=this.props;if(n&&t.error!==null&&C(e.resetKeys,r)){var i,a;(i=(a=this.props).onReset)==null||i.call(a,{next:r,prev:e.resetKeys,reason:`keys`}),this.setState(x)}}render(){let{children:e,fallbackRender:t,FallbackComponent:n,fallback:r}=this.props,{didCatch:i,error:a}=this.state,o=e;if(i){let e={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof t==`function`)o=t(e);else if(n)o=(0,y.createElement)(n,e);else if(r!==void 0)o=r;else throw a}return(0,y.createElement)(b.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},o)}};function C(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((e,n)=>!Object.is(e,t[n]))}var w={layout:`LayoutSplit__layout___Lmxhe`,item:`LayoutSplit__item___Lmxhe`,item_inner:`LayoutSplit__item_inner___Lmxhe`,splitter:`LayoutSplit__splitter___Lmxhe`,dragging:`LayoutSplit__dragging___Lmxhe`,horizontal:`LayoutSplit__horizontal___Lmxhe`,vertical:`LayoutSplit__vertical___Lmxhe`},T=o((e=>{var t=d(),n=Symbol.for(`react.element`),r=Symbol.for(`react.fragment`),i=Object.prototype.hasOwnProperty,a=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,r){var s,c={},l=null,u=null;for(s in r!==void 0&&(l=``+r),t.key!==void 0&&(l=``+t.key),t.ref!==void 0&&(u=t.ref),t)i.call(t,s)&&!o.hasOwnProperty(s)&&(c[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)c[s]===void 0&&(c[s]=t[s]);return{$$typeof:n,type:e,key:l,ref:u,props:c,_owner:a.current}}e.Fragment=r,e.jsx=s,e.jsxs=s})),E=o(((e,t)=>{t.exports=T()}))(),ee=e=>{let t={...e.style},n=e._ratio;if(typeof n==`number`){let r=e._totalSplitterSize??0;t.flex=`0 0 calc( ${n*100}% - ${r*n}px )`}else e.size===void 0?t.flex=e.flex??1:(t.flexShrink=0,t.flexGrow=0,t.flexBasis=typeof e.size==`number`?`${e.size}px`:e.size);e.overflow&&(t.overflow=`auto`);let r=e.padding?(0,E.jsx)(`div`,{className:w.item_inner,children:e.children}):e.children;return(0,E.jsx)(`div`,{className:w.item,style:t,children:r})},te=2,D=(e,t)=>{if(!e)return null;try{let n=localStorage.getItem(e);if(!n)return null;let r=JSON.parse(n);return r&&typeof r==`object`&&r.v===te&&Array.isArray(r.sizes)&&r.sizes.length===t?r.sizes.map(e=>typeof e==`number`?e:null):null}catch{return null}},O=e=>{let t=e.direction||`horizontal`,n=e.splitterSize??4,r=e.enableTouch!==!1,i=e.storageKey,a=y.Children.toArray(e.children).filter(e=>y.isValidElement(e)),[o,s]=(0,y.useState)(()=>D(i,a.length)??Array(a.length).fill(null)),c=(0,y.useRef)(o);c.current=o;let[l,u]=(0,y.useState)(null),d=(0,y.useRef)(null);(0,y.useEffect)(()=>{if(c.current.length!==a.length){let e=D(i,a.length)??Array(a.length).fill(null);c.current=e,s(e)}},[a.length,i]);let f=(0,y.useCallback)((e,n)=>{e.preventDefault(),u(n);let o=d.current;if(!o)return;let l=o.getBoundingClientRect(),f=t===`horizontal`?o.clientWidth:o.clientHeight,p=t===`horizontal`?l.width:l.height,m=f>0?p/f:1,h=`touches`in e?t===`horizontal`?e.touches[0].clientX:e.touches[0].clientY:t===`horizontal`?e.clientX:e.clientY,g=Array.from(o.children).filter(e=>e instanceof HTMLElement&&e.classList.contains(w.item)),_=g.map(e=>t===`horizontal`?e.clientWidth:e.clientHeight),v=g[n],y=g[n+1];if(!v||!y)return;let b=a[n].props.minSize??50,x=a[n+1].props.minSize??50,S=_[n]+_[n+1],C=null,T=_[n],E=_[n+1],ee=e=>{let r=((`touches`in e?t===`horizontal`?e.touches[0].clientX:e.touches[0].clientY:t===`horizontal`?e.clientX:e.clientY)-h)/m,i=_[n]+r,a=_[n+1]-r;i<b&&(i=b,a=S-b),a<x&&(a=x,i=S-x),T=i,E=a,C===null&&(C=requestAnimationFrame(()=>{C=null,v.style.flex=`0 0 ${T}px`,y.style.flex=`0 0 ${E}px`}))},D=()=>{C!==null&&(cancelAnimationFrame(C),C=null),window.removeEventListener(`mousemove`,ee),window.removeEventListener(`mouseup`,D),window.removeEventListener(`touchmove`,ee),window.removeEventListener(`touchend`,D),u(null);let e=[..._];e[n]=T,e[n+1]=E;let t=e.reduce((e,t)=>e+t,0),r=c.current.map((n,r)=>t>0?e[r]/t:null);if(c.current=r,s(r),i)try{localStorage.setItem(i,JSON.stringify({v:te,sizes:r}))}catch{}};window.addEventListener(`mousemove`,ee),window.addEventListener(`mouseup`,D),r&&(window.addEventListener(`touchmove`,ee,{passive:!1}),window.addEventListener(`touchend`,D))},[t,a,i,r]);return(0,E.jsx)(`div`,{ref:d,className:w.layout,"data-direction":t,children:a.map((e,i)=>{let s=i===a.length-1,c=o[i]??null,u=[w.splitter,w[t],l===i?w.dragging:``].filter(Boolean).join(` `),d=t===`horizontal`?{width:`${n}px`}:{height:`${n}px`};return(0,E.jsxs)(y.Fragment,{children:[(0,E.jsx)(ee,{...e.props,_ratio:c,_totalSplitterSize:(a.length-1)*n}),!s&&(0,E.jsx)(`div`,{className:u,style:d,onMouseDown:e=>f(e,i),onTouchStart:r?e=>f(e,i):void 0})]},i)})})};O.Item=ee;var ne={panel:`Panel__panel___LnBhb`,content:`Panel__content___LnBhb`},re=e=>(0,E.jsx)(`div`,{className:ne.panel,children:(0,E.jsx)(`div`,{className:ne.content,style:{padding:e.noPadding?`0 0`:void 0},children:e.children})}),ie={panelContainer:`PanelContainer__panelContainer___LnBhb`,header:`PanelContainer__header___LnBhb`,header_item:`PanelContainer__header_item___LnBhb`,content:`PanelContainer__content___LnBhb`},ae=e=>(0,E.jsx)(E.Fragment,{children:e.children}),k=e=>{let t=e.children||[],n=(Array.isArray(t)?t.flat():[t]).filter(e=>y.isValidElement(e)),[r,i]=(0,y.useState)(()=>{if(e.storageKey)try{let t=localStorage.getItem(e.storageKey);if(t!==null){let e=parseInt(t,10);if(!isNaN(e)&&e>=0)return e}}catch{}if(e.defaultTabTitle){let t=n.findIndex(t=>t.props.title===e.defaultTabTitle);if(t>=0)return t}return 0}),a=n.length>0&&r>=n.length?0:r,o=t=>{if(i(t),e.storageKey)try{localStorage.setItem(e.storageKey,String(t))}catch{}};return(0,E.jsxs)(`div`,{className:ie.panelContainer,children:[(0,E.jsx)(`div`,{className:ie.header,children:n.map((e,t)=>(0,E.jsx)(`div`,{className:ie.header_item,onClick:()=>o(t),"data-active":t==a,children:(0,E.jsx)(`p`,{children:e.props.title})},t))}),(0,E.jsx)(`div`,{className:ie.content,children:n[a]})]})};k.Tab=ae;var oe=900,se=()=>{let[e,t]=(0,y.useState)(!1);return(0,y.useEffect)(()=>{let e=null,n=()=>{let n=window.innerWidth;(e===null||(n-oe)*(e-oe)<=0)&&t(n<=oe),e=n};return n(),window.addEventListener(`resize`,n),()=>{window.removeEventListener(`resize`,n)}},[]),{isPC:!e,isSP:e}},ce={arrow:`ArrowIcon__arrow___LmFyc`},A=({open:e})=>(0,E.jsx)(`div`,{className:ce.arrow,"data-open":e,children:(0,E.jsxs)(`svg`,{width:`10`,height:`10`,viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`g`,{clipPath:`url(#clip0_57_2)`,children:(0,E.jsx)(`path`,{d:`M18 10L3 18.6603L3 1.33974L18 10Z`,fill:`#D9D9D9`})}),(0,E.jsx)(`defs`,{children:(0,E.jsx)(`clipPath`,{id:`clip0_57_2`,children:(0,E.jsx)(`rect`,{width:`20`,height:`20`,fill:`white`})})})]})}),le={block:`Block__block___LmJsb`,head:`Block__head___LmJsb`,head_icon:`Block__head_icon___LmJsb`,head_text:`Block__head_text___LmJsb`,content:`Block__content___LmJsb`},ue=e=>{let[t,n]=y.useState(!e.defaultClose),r=(0,y.useCallback)(()=>{e.accordion===!0&&n(!t)},[t,e.accordion]),i=e.bg&&typeof e.bg==`string`&&e.bg||void 0;return(0,E.jsxs)(`div`,{className:le.block,"data-bg":e.bg!==void 0,"data-nomargin":e.noMargin,"data-no_indent":e.noIndent,style:{backgroundColor:i},children:[(0,E.jsxs)(`div`,{className:le.head,"data-accordion":e.accordion,"data-open":t,children:[e.accordion&&(0,E.jsx)(`div`,{className:le.head_icon,onClick:r,children:(0,E.jsx)(A,{open:t})}),e.label&&(0,E.jsx)(`span`,{className:le.head_text,children:e.label})]}),t&&(0,E.jsx)(`div`,{className:le.content,"data-open":t,"data-no_indent":e.noIndent,children:e.children})]})},de={container:`Label__container___LmNvb`,label:`Label__label___LmNvb`,item:`Label__item___LmNvb`},fe=e=>(0,E.jsxs)(`div`,{className:de.container,"data-vertical":e.vertical,children:[(0,E.jsx)(`div`,{className:de.label,style:{textAlign:e.labelAlign||`left`},"data-vertical":e.vertical,children:e.title}),(0,E.jsx)(`div`,{className:de.item,"data-vertical":e.vertical,children:e.children})]}),pe={button:`Button__button___LmJ1d`},me=e=>(0,E.jsx)(`button`,{className:pe.button,onClick:t=>{e.onClick&&e.onClick(t),t.preventDefault()},type:e.type||`button`,children:e.children}),he=()=>(0,E.jsxs)(`svg`,{width:`20`,height:`20`,viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{x:`2`,y:`10.8486`,width:`2.61726`,height:`7.84447`,transform:`rotate(-44.9331 2 10.8486)`,fill:`#D9D9D9`}),(0,E.jsx)(`rect`,{x:`9.38757`,y:`14.5518`,width:`2.57272`,height:`12.3494`,transform:`rotate(-135 9.38757 14.5518)`,fill:`#D9D9D9`})]}),ge={inputBoolean:`InputCheckBox__inputBoolean___Lmluc`,input:`InputCheckBox__input___Lmluc`,check:`InputCheckBox__check___Lmluc`},_e=({onChange:e,...t})=>(0,E.jsx)(`div`,{className:ge.inputBoolean,onClick:e=>{e.stopPropagation()},children:(0,E.jsxs)(`label`,{children:[(0,E.jsx)(`input`,{className:ge.input,type:`checkbox`,checked:t.checked,disabled:t.disabled,readOnly:t.readOnly,onChange:n=>{t.readOnly||e&&e(n.target.checked)}}),(0,E.jsx)(`div`,{className:ge.check,"data-read_only":t.readOnly,children:t.checked&&(0,E.jsx)(he,{})})]})}),ve={input:`InputColor__input___Lmluc`},ye=e=>`#`+e.slice(0,3).map(e=>Math.round(Math.min(Math.max(e,0),1)*255).toString(16).padStart(2,`0`)).join(``),be=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)/255),xe=e=>{let t=e.value||[1,1,1];return(0,E.jsx)(`div`,{className:ve.inputColor,children:(0,E.jsx)(`input`,{className:ve.input,type:`color`,value:ye(t),disabled:e.disabled||e.readOnly,onChange:t=>{e.onChange&&e.onChange(be(t.target.value))}})})},Se=(0,y.createContext)(null),Ce=()=>{let e=(0,y.useContext)(Se);if(e===null)throw Error(`useInputWindow must be used within InputWindowContext`);return e},we=()=>typeof navigator>`u`?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Te=()=>(0,y.useMemo)(()=>we(),[]),Ee={input:`InputNumber__input___Lmluc`},De=3,Oe=e=>{let{open:t}=Ce(),n=Te(),r=(0,y.useRef)(null),[i,a]=(0,y.useState)(!1),[o,s]=(0,y.useState)(``),c=(0,y.useRef)(!1),l=(0,y.useRef)(null),u=(0,y.useRef)(!1),d=(0,y.useRef)();d.current=e.onChange;let f=(0,y.useRef)();f.current=e.value;let p=(0,y.useCallback)(t=>{let n=f.current;if(c.current===!1)return;let r=l.current;if(r){let e=t.clientX-r.x,n=t.clientY-r.y;Math.sqrt(e*e+n*n)>=De&&(u.current=!0)}if(!u.current)return;let i=t.movementX;if(typeof n==`number`){let r=i*.05*(e.step||1);d.current&&d.current(n+r),t.stopPropagation()}t.preventDefault()},[e.step]),m=(0,y.useCallback)(()=>{e.readOnly||e.disabled||t({type:`number`,value:f.current??0,step:e.step,min:e.min,max:e.max,precision:e.precision,onChange:e=>{d.current&&d.current(e)}})},[t,e.step,e.min,e.max,e.precision,e.readOnly,e.disabled]),h=(0,y.useCallback)(t=>{t.preventDefault(),c.current=!0,l.current={x:t.clientX,y:t.clientY},u.current=!1;let i=()=>{u.current||(n?m():(a(!0),s(String(Number((f.current??0).toFixed(e.precision??3)))),requestAnimationFrame(()=>{r.current?.focus(),r.current?.select()}))),c.current=!1,l.current=null,u.current=!1,window.removeEventListener(`pointerup`,i),n||window.removeEventListener(`pointermove`,p)};window.addEventListener(`pointerup`,i),n||window.addEventListener(`pointermove`,p)},[p,n,m,e.precision]),g=i?o:String(Number((e.value??0).toFixed(e.precision??3)));return(0,E.jsx)(`div`,{className:Ee.inputNumber,children:(0,E.jsx)(`input`,{ref:r,className:Ee.input,type:i?`text`:`number`,inputMode:i?`decimal`:void 0,value:g,disabled:e.disabled,readOnly:n||e.readOnly,"data-lo":e.readOnly,step:e.step||1,min:e.min,max:e.max,onBlur:()=>{if(i&&(a(!1),e.onChange)){let t=Number(o);e.onChange(isNaN(t)?0:t)}},onChange:e=>{s(e.target.value)},onKeyDown:e=>{e.key===`Enter`&&r.current?.blur()},onPointerDown:h})})},ke={inputSelect:`InputSelect__inputSelect___Lmluc`,input:`InputSelect__input___Lmluc`},Ae=({onChange:e,value:t,...n})=>{if(n.readOnly)return(0,E.jsx)(`div`,{className:ke.inputSelect,children:(0,E.jsx)(`input`,{className:ke.input,value:t,readOnly:!0})});let r=n.selectList;return typeof r==`function`&&(r=r()),(0,E.jsx)(`div`,{className:ke.inputSelect,children:(0,E.jsx)(`select`,{className:ke.input,onChange:t=>{e&&e(t.target.value)},value:t,children:r.map((e,t)=>{let n=``,r=``;return typeof e==`string`?(n=e,r=e):(n=e.label,r=e.value),(0,E.jsx)(`option`,{value:r,children:n},t)})})})},je={input:`InputText__input___Lmluc`},Me=({onChange:e,value:t,...n})=>{let{open:r}=Ce(),i=Te(),[a,o]=(0,y.useState)(t),s=(0,y.useCallback)(()=>{e&&e(a)},[a,e]);(0,y.useEffect)(()=>{o(t)},[t]);let c=(0,y.useCallback)(()=>{!i||n.readOnly||n.disabled||r({type:`text`,value:a,onChange:t=>{e&&e(t)}})},[i,a,e,r,n.readOnly,n.disabled]);return(0,E.jsx)(`div`,{className:je.container,children:(0,E.jsx)(`input`,{className:je.input,type:`text`,value:a,placeholder:n.readOnly?`-`:``,disabled:n.disabled,readOnly:i||n.readOnly,"data-lo":n.readOnly,onChange:e=>{o(e.target.value)},onBlur:()=>{s()},onClick:c,onKeyDown:e=>{e.key===`Enter`&&e.currentTarget.blur()}})})},Ne={},Pe=[`x`,`y`,`z`,`w`],Fe=({onChange:e,disabled:t,...n})=>{let r=(0,y.useRef)();r.current=n.value;let i=(0,y.useCallback)((t,n)=>{if(e&&r.current){let i={};for(let e=0;e<r.current.length;e++)i[e]=r.current[e];i[t]=n,e(i)}},[e]),a=[];for(let e=0;e<n.value.length;e++)a.push((0,E.jsx)(fe,{title:Pe[e],labelAlign:`right`,children:(0,E.jsx)(Oe,{disabled:t,value:n.value[e],step:n.step,onChange:t=>{i(e,t)}})},e));return(0,E.jsx)(`div`,{className:Ne.vector,children:a.map(e=>e)})},Ie=(0,y.createContext)(null),Le=()=>{let e=(0,y.useContext)(Ie);if(e===null)throw Error(`useEditor must be used within a EditorProvider`);return e},Re=e=>{let{engine:t}=Le(),n=(0,y.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{n.components.forEach(r=>{e.push({label:`${n.getScenePath(t.root)} > ${r.constructor.name}`,value:r.uuid})})}),e},[t]),[r,i]=(0,y.useState)(n);return(0,y.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,E.jsx)(`div`,{className:ke.inputSelect,children:(0,E.jsx)(`select`,{className:ke.input,onChange:t=>{e.onChange&&e.onChange(t.target.value||null)},value:e.value||``,children:r.map((e,t)=>{let n=typeof e==`string`?e:e.label;return(0,E.jsx)(`option`,{value:typeof e==`string`?e:e.value,children:n},t)})})})},ze=e=>{let{engine:t}=Le(),n=(0,y.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{e.push({label:n.getScenePath(t.root),value:n.uuid})}),e},[t]),[r,i]=(0,y.useState)(n);return(0,y.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,E.jsx)(`div`,{className:ke.inputSelect,children:(0,E.jsx)(`select`,{className:ke.input,onChange:t=>{e.onChange&&e.onChange(t.target.value||null)},value:e.value||``,children:r.map((e,t)=>{let n=typeof e==`string`?e:e.label;return(0,E.jsx)(`option`,{value:typeof e==`string`?e:e.value,children:n},t)})})})},Be={inputResourceSelect:`InputResourceSelect__inputResourceSelect___Lmluc`,select:`InputResourceSelect__select___Lmluc`,editButton:`InputResourceSelect__editButton___Lmluc`},Ve=e=>{let{editor:t}=Le(),n=(0,y.useCallback)(()=>{e.value&&(t.setField(`navigateAsset`,{assetType:e.resourceType,name:String(e.value)}),t.setField(`selectedAsset`,{name:String(e.value),assetType:e.resourceType}))},[t,e.value,e.resourceType]);return(0,E.jsxs)(`div`,{className:Be.inputResourceSelect,children:[(0,E.jsx)(`div`,{className:Be.select,children:(0,E.jsx)(Ae,{value:e.value,selectList:e.selectList,onChange:e.onChange})}),e.value&&(0,E.jsx)(`button`,{className:Be.editButton,onClick:n,title:`Edit resource`,children:`✎`})]})},He=e=>{let t=null,n=e.onChange,r=e.value,i=e.format,a=e=>{n&&n(e)};return i&&(i.type==`entity`?t=(0,E.jsx)(ze,{value:r,onChange:a}):i.type==`component`?t=(0,E.jsx)(Re,{value:r,onChange:a}):i.type==`vector`&&Array.isArray(r)?t=(0,E.jsx)(Fe,{value:r,onChange:a}):i.type==`color`&&Array.isArray(r)?t=(0,E.jsx)(xe,{value:r,onChange:a}):i.type==`select`?t=(0,E.jsx)(Ae,{value:r,onChange:a,selectList:i.list}):i.type==`resource`&&(t=(0,E.jsx)(Ve,{value:r,onChange:a,selectList:i.list,resourceType:i.resourceType}))),r==null||(t||=typeof r==`number`?(0,E.jsx)(Oe,{...e,value:r,onChange:a}):typeof r==`string`?(0,E.jsx)(Me,{...e,value:r,onChange:a}):typeof r==`boolean`?(0,E.jsx)(_e,{...e,checked:r,onChange:a}):typeof r==`function`?(0,E.jsx)(me,{onClick:()=>{r()},children:e.label||`Run`}):(0,E.jsx)(Me,{...e,value:JSON.stringify(r),onChange:()=>{}})),t},Ue={showAudioView:!0},We=`orengine-editor-ui-settings`,Ge=(()=>{try{let e=localStorage.getItem(We);if(e)return{...Ue,...JSON.parse(e)}}catch{}return{...Ue}})(),Ke=new Set,qe=e=>(Ke.add(e),()=>{Ke.delete(e)}),Je=e=>[(0,y.useSyncExternalStore)(qe,()=>Ge[e]),(0,y.useCallback)(t=>{Ge={...Ge,[e]:t};try{localStorage.setItem(We,JSON.stringify(Ge))}catch{}Ke.forEach(e=>e())},[e])],Ye={editorSettings:`EditorSettings__editorSettings___LmVka`,editorSettings_inner:`EditorSettings__editorSettings_inner___LmVka`},Xe=()=>{let[e,t]=Je(`showAudioView`);return(0,E.jsx)(`div`,{className:Ye.editorSettings,children:(0,E.jsx)(`div`,{className:Ye.editorSettings_inner,children:(0,E.jsx)(ue,{label:`View`,accordion:!0,children:(0,E.jsx)(fe,{title:`AudioView`,children:(0,E.jsx)(He,{value:e,onChange:e=>t(e)})})})})})},Ze=(0,y.createContext)(void 0),Qe=(e,t)=>{let[n,r]=(0,y.useState)(()=>e?e.serialize():{}),i=t?[...t]:[],a=(0,y.useMemo)(()=>i,i);return(0,y.useEffect)(()=>{if(e===void 0)return;r(e.serialize());let t=t=>{let n=a.length==0;for(let e=0;e<a.length;e++)if(t.find(t=>t==a[e])){n=!0;break}n&&r(e.serialize())};return e.on(`fields/update`,t),()=>{e.off(`fields/update`,t)}},[e,a]),{fields:n}},$e=e=>(Qe(e.target),{target:e.target}),et=()=>{let e=(0,y.useContext)(Ze);if(!e)throw Error(`SerializeFieldViewContext is not defined`);return e},tt={container:`ValueArray__container___LmNvb`},nt=e=>{let t=[],n=e.value,r=e.format,i=r?.type==`array`?r.labels:void 0;if(n===void 0)return null;for(let r=0;r<n.length;r++){let a=n[r],o=r.toString();i&&(o+=`/ `+i(a,r)),t.push((0,E.jsx)(fe,{title:o,children:(0,E.jsx)(He,{...e,value:a,onChange:t=>{let i=n.concat();i[r]=t,e.onChange&&e.onChange(i)}})},r))}return(0,E.jsx)(`div`,{className:tt.container,children:t})},rt=e=>{let{editor:t}=Le(),{target:n}=et(),r=e.field.value,i=typeof r,a=e.field.opt,o=a?.format,s=a?.label||e.path.split(`/`).pop(),c=o&&o.type==`vector`,l=null;if(Array.isArray(r))l=o?.type==`vector`?(0,E.jsx)(Fe,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):o?.type==`color`?(0,E.jsx)(xe,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):(0,E.jsx)(nt,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}});else if(l=(0,E.jsx)(He,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}),i===`function`)return l;return(0,E.jsx)(fe,{title:s,vertical:c,children:l})},it={container:`SerializeFieldViewDir__container___LmNvb`,field:`SerializeFieldViewDir__field___LmNvb`,block:`SerializeFieldViewDir__block___LmNvb`},at=e=>{let t=[],n=Object.keys(e.fields.childs);for(let r=0;r<n.length;r++){let i=n[r],a=e.fields.childs[i],{opt:o}=a,s=!1;if(o&&(s=typeof o.hidden==`function`?o.hidden(a.type==`value`?a.value:null):o.hidden||!1),s)continue;let c=`field`+i,l=(e.basePath?e.basePath+`/`:``)+i,u=null;u=a.type===`value`?(0,E.jsx)(rt,{path:l,field:a},c):(0,E.jsx)(`div`,{className:it.block,children:(0,E.jsx)(ue,{accordion:!0,label:i,children:(0,E.jsx)(at,{fields:a,basePath:l})},c)},c),u&&t.push(u)}return(0,E.jsx)(`div`,{className:it.container,children:t})},ot=e=>{let t=$e(e),n=t.target.serializeToDirectory();if(e.filter){let t=n.childs[e.filter];t&&t.type===`folder`&&(n=t)}return(0,E.jsx)(Ze.Provider,{value:t,children:(0,E.jsx)(at,{fields:n,basePath:e.filter})})},j=(e,t)=>{let n=n=>{e?.setField(t,n)},{fields:r}=Qe(e,[t]);return[r&&r[t],n]},M=class e{x;y;z;w;constructor(e,t,n,r){this.x=0,this.y=0,this.z=0,this.w=0,this.set(e,t,n,r)}get isVector(){return!0}set(e,t,n,r){return this.x=e??0,this.y=t??0,this.z=n??0,this.w=r??0,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setFromArray(e){return this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0,this.w=e[3]||0,this}add(e){return typeof e==`number`?(this.x+=e,this.y+=e,this.z+=e,this.w+=e):(this.x+=e.x??0,this.y+=e.y??0,this.z+=e.z??0,this.w+=e.w??0),this}sub(e){return typeof e==`number`?(this.x-=e,this.y-=e,this.z-=e):(this.x-=e.x??0,this.y-=e.y??0,this.z-=e.z??0,this.w-=e.w??0),this}multiply(e){return typeof e==`number`?(this.x*=e,this.y*=e,this.z*=e,this.w*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w),this}divide(e){return typeof e==`number`?(this.x/=e,this.y/=e,this.z/=e,this.w/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return Math.sqrt(t*t+n*n+r*r)}normalize(){let e=this.length()||1;return this.x/=e,this.y/=e,this.z/=e,this}cross(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z;return this.x=n*o-r*a,this.y=r*i-t*o,this.z=t*a-n*i,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}applyMatrix3(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10],d=this.x*n+this.y*a+this.z*c,f=this.x*r+this.y*o+this.z*l,p=this.x*i+this.y*s+this.z*u;return this.x=d,this.y=f,this.z=p,this.w=0,this}applyMatrix4(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=this.x*n+this.y*o+this.z*u+this.w*m,y=this.x*r+this.y*s+this.z*d+this.w*h,b=this.x*i+this.y*c+this.z*f+this.w*g,x=this.x*a+this.y*l+this.z*p+this.w*_;return this.x=v,this.y=y,this.z=b,this.w=x,this}applyMatrix4AsPosition(e){let t=this.w;return this.w=1,this.applyMatrix4(e),this.w=t,this}applyMatrix4AsDirection(e){let t=this.w;return this.w=0,this.applyMatrix4(e),this.w=t,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this}clone(){return new e(this.x,this.y,this.z,this.w)}getElm(e){return e==`vec2`?[this.x,this.y]:e==`vec3`?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}},N=class e{elm;constructor(e){this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e&&this.set(e)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new e().copy(this)}copy(e){return this.set(e.elm),this}perspective(e,t,n,r){let i=1/Math.tan(e*Math.PI/360),a=r-n;return this.elm=[i/t,0,0,0,0,i,0,0,0,0,-(r+n)/a,-1,0,0,-(r*n*2)/a,0],this}orthographic(e,t,n,r){return this.elm=[2/e,0,0,0,0,2/t,0,0,0,0,-2/(r-n),0,0,0,-(r+n)/(r-n),1],this}lookAt(e,t,n){let r=e.clone().sub(t).normalize(),i=n.clone().cross(r).normalize(),a=r.clone().cross(i).normalize();return this.elm=[i.x,i.y,i.z,0,a.x,a.y,a.z,0,r.x,r.y,r.z,0,e.x,e.y,e.z,1],this}inverse(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15],g=e*a-t*i,_=e*o-n*i,v=e*s-r*i,y=t*o-n*a,b=t*s-r*a,x=n*s-r*o,S=c*p-l*f,C=c*m-u*f,w=c*h-d*f,T=l*m-u*p,E=l*h-d*p,ee=u*h-d*m,te=g*ee-_*E+v*T+y*w-b*C+x*S,D=1/te;return te==0?this.identity():(this.elm[0]=(a*ee-o*E+s*T)*D,this.elm[1]=(-t*ee+n*E-r*T)*D,this.elm[2]=(p*x-m*b+h*y)*D,this.elm[3]=(-l*x+u*b-d*y)*D,this.elm[4]=(-i*ee+o*w-s*C)*D,this.elm[5]=(e*ee-n*w+r*C)*D,this.elm[6]=(-f*x+m*v-h*_)*D,this.elm[7]=(c*x-u*v+d*_)*D,this.elm[8]=(i*E-a*w+s*S)*D,this.elm[9]=(-e*E+t*w-r*S)*D,this.elm[10]=(f*b-p*v+h*g)*D,this.elm[11]=(-c*b+l*v-d*g)*D,this.elm[12]=(-i*T+a*C-o*S)*D,this.elm[13]=(e*T-t*C+n*S)*D,this.elm[14]=(-f*y+p*_-m*g)*D,this.elm[15]=(c*y-l*_+u*g)*D,this)}transpose(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15];return this.elm[0]=e,this.elm[1]=i,this.elm[2]=c,this.elm[3]=f,this.elm[4]=t,this.elm[5]=a,this.elm[6]=l,this.elm[7]=p,this.elm[8]=n,this.elm[9]=o,this.elm[10]=u,this.elm[11]=m,this.elm[12]=r,this.elm[13]=s,this.elm[14]=d,this.elm[15]=h,this}set(e){for(let t=0;t<this.elm.length;t++)this.elm[t]=e[t]??0;return this}setFromTransform(e,t,n){return this.identity(),e&&this.applyPosition(e),t&&this.applyQuaternion(t),n&&this.applyScale(n),this}applyPosition(e){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,e.x,e.y,e.z,1]),this}applyQuaternion(e){let t=e.x,n=e.y,r=e.z,i=e.w,a=t*t,o=n*n,s=r*r,c=i*i,l=t*n,u=t*r,d=t*i,f=n*r,p=n*i,m=r*i;return this.matmul([a-o-s+c,2*(l+m),2*(u-p),0,2*(l-m),-a+o-s+c,2*(f+d),0,2*(u+p),2*(f-d),-a-o+s+c,0,0,0,0,1]),this}applyScale(e){return this.matmul([e.x,0,0,0,0,e.y,0,0,0,0,e.z,0,0,0,0,1]),this}matmul(e){let t=Array(16);for(let n=0;n<4;n++)for(let r=0;r<4;r++){let i=0;for(let t=0;t<4;t++)i+=this.elm[t*4+r]*e[t+n*4];t[r+n*4]=i}this.elm=t}setRotationFromDirection(e,t){t||={x:0,y:1,z:0};let n=new M().copy(e).normalize(),r=new M().copy(t).cross(n).normalize();r.length()==0&&(n.x+=.001,r.copy(t).cross(n).normalize());let i=n.clone().cross(r).normalize();return this.set([r.x,r.y,r.z,0,i.x,i.y,i.z,0,n.x,n.y,n.z,0,0,0,0,1]),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set([c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1]),this}multiply(e){return this.matmul(e.elm),this}preMultiply(e){let t=this.copyToArray([]);return this.set(e.elm),this.matmul(t),this}decompose(e,t,n){e&&(e.x=this.elm[12],e.y=this.elm[13],e.z=this.elm[14]),t&&t.setFromMatrix(this)}copyToArray(e){e.length=this.elm.length;for(let t=0;t<this.elm.length;t++)e[t]=this.elm[t];return e}},st=class extends M{order;constructor(e,t,n,r){super(e,t,n,0),this.order=r||`XYZ`}copy(e){return`order`in e&&(this.order=e.order),super.copy(e)}setFromQuaternion(e){let t=new N().applyQuaternion(e);return this.setFromRotationMatrix(t),this}setFromRotationMatrix(e){let t=e.elm,n=t[0],r=t[4],i=t[8],a=t[5],o=t[9],s=t[6],c=t[10];return this.order=`XYZ`,this.y=Math.asin(Math.min(1,Math.max(-1,i))),Math.abs(i)<.9999999?(this.x=Math.atan2(-o,c),this.z=Math.atan2(-r,n)):(this.x=Math.atan2(s,a),this.z=0),this}},ct=class e{x;y;z;w;updated=!1;constructor(e,t,n,r){this.x=e||0,this.y=t||0,this.z=n||0,this.w=r||1}set(e,t,n,r){this.x=e??this.x,this.y=t??this.y,this.z=n??this.z,this.w=r??this.w,this.updated=!0}setFromEuler(e,t){let n=t||(`order`in e?e.order:`XYZ`),r=Math.sin(e.x/2),i=Math.sin(e.y/2),a=Math.sin(e.z/2),o=Math.cos(e.x/2),s=Math.cos(e.y/2),c=Math.cos(e.z/2);return n==`XYZ`?(this.x=o*i*a+r*s*c,this.y=-r*s*a+o*i*c,this.z=o*s*a+r*i*c,this.w=-r*i*a+o*s*c):n==`XZY`?(this.x=-o*i*a+r*s*c,this.y=o*i*c-r*s*a,this.z=r*i*c+o*s*a,this.w=r*i*a+o*s*c):n==`YZX`?(this.x=r*s*c+o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=-r*i*a+o*s*c):n==`ZYX`&&(this.x=r*s*c-o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=r*i*a+o*s*c),this.updated=!0,this}setFromMatrix(e){let t=e.elm,n=t[0]+t[5]+t[10],r,i,a,o;if(n>0){let e=Math.sqrt(n+1)*2;o=.25*e,r=(t[6]-t[9])/e,i=(t[8]-t[2])/e,a=(t[1]-t[4])/e}else if(t[0]>t[5]&&t[0]>t[10]){let e=Math.sqrt(1+t[0]-t[5]-t[10])*2;o=(t[6]-t[9])/e,r=.25*e,i=(t[1]+t[4])/e,a=(t[2]+t[8])/e}else if(t[5]>t[10]){let e=Math.sqrt(1+t[5]-t[0]-t[10])*2;o=(t[8]-t[2])/e,r=(t[1]+t[4])/e,i=.25*e,a=(t[6]+t[9])/e}else{let e=Math.sqrt(1+t[10]-t[0]-t[5])*2;o=(t[1]-t[4])/e,r=(t[2]+t[8])/e,i=(t[6]+t[9])/e,a=.25*e}let s=Math.sqrt(r*r+i*i+a*a+o*o);return r/=s,i/=s,a/=s,o/=s,this.x=r,this.y=i,this.z=a,this.w=o,this.updated=!0,this}multiply(e){let t=this.w*e.w-this.x*e.x-this.y*e.y-this.z*e.z,n=this.w*e.x+this.x*e.w+this.y*e.z-this.z*e.y,r=this.w*e.y-this.x*e.z+this.y*e.w+this.z*e.x,i=this.w*e.z+this.x*e.y-this.y*e.x+this.z*e.w;return this.set(n,r,i,t),this.updated=!0,this}preMultiply(e){let t=e.clone().multiply(this);this.set(t.x,t.y,t.z,t.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this.updated=!0,this}clone(){return new e(this.x,this.y,this.z,this.w)}},lt;(function(e){let t=e.gauss=(e,t,n)=>{let r=e-t,i=-(r*r)/(2*n*n);return 1/Math.sqrt(2*Math.PI*n)*Math.exp(i)};e.gaussWeights=e=>{let n=0,r=[];if(e<=1)return[.5];for(let i=0;i<e;i++){let a=i/(e-1),o=t(a,0,1);n+=o*(i>0?2:1),r.push(o)}for(let t=0;t<e;t++)r[t]/=n;return r},e.randomSeed=e=>{e^=e<<13,e^=0,e^=e<<5;let t=123456789^e;e^=e<<13,e^=0,e^=e<<5;let n=362436069^e;e^=e<<13,e^=0,e^=e<<5;let r=521288629^e;e^=e<<13,e^=0,e^=e<<5;let i=88675123^e,a;return()=>(a=t^t<<11,t=n,n=r,r=i,i=(i^i>>>19^(a^a>>>8))>>>0,i/4294967296)};let n=e.randomRange=(e=-1,t=1)=>e+Math.random()*(t-e);e.randomVector=(e=new M(-1,-1,-1,-1),t=new M(1,1,1,1))=>new M(n(e.x,t.x),n(e.y,t.y),n(e.z,t.z),n(e.w,t.w)),e.randomInSphere=(e=1,t=Math.random)=>{let n=t(),r=t(),i=t(),a=2*Math.PI*n,o=Math.acos(2*r-1),s=Math.cbrt(i)*e,c=Math.sin(o);return{x:s*c*Math.cos(a),y:s*c*Math.sin(a),z:s*Math.cos(o)}},e.smoothstep=(e,t,n)=>n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))})(lt||={});var ut=class{gl;vao;program;indexBuffer;attributes;vertCount;indexCount;instanceCount;attribPointerDiect;attribTypeDict;constructor(e,t){this.gl=e,this.program=t,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([[`Float32Array`,this.gl.vertexAttribPointer.bind(this.gl)],[`Int32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int8Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt8Array`,this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([[`Float32Array`,this.gl.FLOAT],[`Int32Array`,this.gl.INT],[`Int16Array`,this.gl.SHORT],[`Int8Array`,this.gl.BYTE],[`UInt32Array`,this.gl.UNSIGNED_INT],[`UInt16Array`,this.gl.UNSIGNED_SHORT],[`UInt8Array`,this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((e,t)=>{e.instanceDivisor==null&&t!=`index`&&(this.vertCount=Math.max(this.vertCount,e.count)),e.instanceDivisor!==void 0&&e.instanceDivisor>0&&(this.instanceCount==0?this.instanceCount=e.count:this.instanceCount=Math.min(this.instanceCount,e.count))})}setAttribute(e,t,n,r){if(t.array===null)return;let i={buffer:t,size:n,count:t.array?t.array.length/n:0,location:void 0,...r};this.attributes.set(e,i),this.gl.bindVertexArray(this.vao),i.location=this.gl.getAttribLocation(this.program,e);let a=this.attribPointerDiect.get(t.array.constructor.name),o=this.attribTypeDict.get(t.array.constructor.name);if(i.location>-1)if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i.buffer.buffer),i.size==16){for(let e=0;e<4;e++)this.gl.enableVertexAttribArray(i.location+e);for(let e=0;e<4;e++)this.gl.vertexAttribPointer(i.location+e,4,o,!1,64,16*e);if(i.instanceDivisor!==void 0)for(let e=0;e<4;e++)this.gl.vertexAttribDivisor(i.location+e,i.instanceDivisor)}else this.gl.enableVertexAttribArray(i.location),a(i.location,i.size,o,!1,0,0),i.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(i.location,i.instanceDivisor);return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(e){return this.attributes.delete(e),this.calcVertCount(),this}setIndex(e){this.indexBuffer=e,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(e){this.gl.bindVertexArray(this.vao),e&&e(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(e=>{e.buffer.dispose()})}},dt=new Map,ft=class{gl;program;name=``;vao;uniforms;constructor(e){this.gl=e,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(e,t,n){if(this.program===null){console.warn(`program is null.`);return}let r=this.createShader(e,this.gl.VERTEX_SHADER),i=this.createShader(t,this.gl.FRAGMENT_SHADER);if(this.name){let e=[];r.error&&e.push(`[VERTEX]
`+r.error),i.error&&e.push(`[FRAGMENT]
`+i.error),e.length>0?dt.set(this.name,e.join(`

`)):dt.delete(this.name)}if(!(!r.shader||!i.shader)){if(this.gl.attachShader(this.program,r.shader),this.gl.attachShader(this.program,i.shader),n&&n.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,n.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)){let e=this.gl.getProgramInfoLog(this.program);if(console.error(`program link error:`,e),this.name&&e){let t=dt.get(this.name);dt.set(this.name,(t?t+`

`:``)+`[LINK]
`+e)}}return this}}createShader(e,t){let n=this.gl.createShader(t);return n?(this.gl.shaderSource(n,e),this.gl.compileShader(n),this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS)?{shader:n,error:null}:{shader:null,error:this.gl.getShaderInfoLog(n)||`Unknown shader error`}):{shader:null,error:null}}setUniform(e,t,n){let r=this.uniforms.get(e);if(r){r.type=t;let e=r.value;e.length=n.length;for(let t=0;t<n.length;t++)e[t]=n[t];if(r.cache){if(r.cache.length!==e.length)r.needsUpdate=!0;else for(let t=0;t<e.length;t++)if(r.cache[t]!==e[t]){r.needsUpdate=!0;break}}else r.needsUpdate=!0}else this.uniforms.set(e,{value:n.concat(),type:t,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(e){this.program&&this.uniforms.forEach((t,n)=>{(t.location===null||e)&&(t.location=this.gl.getUniformLocation(this.program,n))})}uploadUniforms(){this.uniforms.forEach(e=>{e.needsUpdate&&e.location!==null&&(/Matrix[2|3|4]fv/.test(e.type)?this.gl[`uniform`+e.type](e.location,!1,e.value):/[1|2|3|4][f|i]$/.test(e.type)?this.gl[`uniform`+e.type](e.location,...e.value):this.gl[`uniform`+e.type](e.location,e.value),e.cache=e.value.concat(),e.needsUpdate=!1)})}getVAO(e=`_`){if(!this.program)return null;let t=this.vao.get(e);return t||(t=new ut(this.gl,this.program),this.vao.set(e,t),t)}use(e){this.program&&(this.gl.useProgram(this.program),e&&e(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(e=>{e.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}},pt=class{gl;buffer;array;constructor(e){this.gl=e,this.buffer=this.gl.createBuffer(),this.array=null}setData(e,t=`vbo`,n){let r=t==`vbo`?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(r,this.buffer),this.gl.bufferData(r,e,n||this.gl.STATIC_DRAW),this.gl.bindBuffer(r,null),this.array=e,this}read(e){return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this}dispose(){this.gl.deleteBuffer(this.buffer)}},mt=class{unit;image;size;gl;glTex;textureType;_setting;constructor(e){this.gl=e,this.image=null,this.unit=0,this.size=new M,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=e.TEXTURE_2D}get isTexture(){return!0}setting(e){return this._setting={...this._setting,...e},this.attach(this.image),this}attach(e,t){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.image){let e=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(e.width,e.height),e instanceof HTMLImageElement||e instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,e):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,e.width,e.height,0,this._setting.format,this._setting.type,e.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}subImage(e,t,n){return this.gl.bindTexture(this.textureType,this.glTex),this.gl.texSubImage2D(this.textureType,0,0,0,t,n,this._setting.format,this._setting.type,e),this.gl.bindTexture(this.textureType,null),this}activate(e){return this.gl.activeTexture(this.gl.TEXTURE0+e),this.gl.bindTexture(this.textureType,this.glTex),this.unit=e,this}load(e,t){let n=new Image;return n.onload=()=>{this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.attach(n),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),t&&t()},n.src=e,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}},ht=class{size;gl;glFrameBuffer;textures;depthTexture;textureAttachmentList;constructor(e,t){this.gl=e,this.size=new M(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!t||!t.disableDepthBuffer)&&this.setDepthTexture(new mt(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(e){this.depthTexture=e,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((e,t)=>{e.attach({width:this.size.x,height:this.size.y});let n=this.gl.COLOR_ATTACHMENT0+t;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,n,this.gl.TEXTURE_2D,e.getTexture(),0),this.textureAttachmentList.push(n)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(e,t){return typeof e==`number`?(this.size.x=e,t!==void 0&&(this.size.y=t)):this.size.copy(e),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}clear(){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,this.glFrameBuffer),e.drawBuffers(this.textureAttachmentList),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}},gt=class extends ht{cubeTarget;textures;currentFace;constructor(e,t){super(e,t),this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this}face(e){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((t,n)=>{let r=this.gl.COLOR_ATTACHMENT0+n;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,r,this.cubeTarget[e],t.getTexture(),0),this.textureAttachmentList.push(r)}),this.currentFace=this.cubeTarget[e],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}},_t=class extends mt{cubeTarget;constructor(e){super(e),this.textureType=e.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(e){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let e=0;e<6;e++){let t=Array.isArray(this.image)?this.image[e]:this.image;this.size.set(t.width,t.height),t instanceof HTMLImageElement||t instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[e],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t):this.gl.texImage2D(this.cubeTarget[e],0,this._setting.internalFormat,t.width,t.height,0,this._setting.format,this._setting.type,t.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}},P=WebGL2RenderingContext,vt=class{gl;canvas;_stateCache;_extDisJointTimerQuery;_queryList;_queryListQueued;constructor(e){this.gl=e,this.canvas=e.canvas,this._stateCache={},this._queryList=[],this._queryListQueued=[],e.getExtension(`EXT_color_buffer_float`),e.getExtension(`EXT_color_buffer_half_float`),e.getExtension(`OES_texture_float_linear`),this._extDisJointTimerQuery=e.getExtension(`EXT_disjoint_timer_query_webgl2`),this._extDisJointTimerQuery||console.warn(`[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled.`),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)}createTexture(){return new mt(this.gl)}createCubeTexture(){return new _t(this.gl)}createFrameBuffer(e){return new ht(this.gl,e)}createCubeFrameBuffer(){return new gt(this.gl)}createProgram(){return new ft(this.gl)}_setState(e,t){this._stateCache[e]!==t&&(t?this.gl.enable(e):this.gl.disable(e),this._stateCache[e]=t)}setMaterialState(e,t,n){this._setState(this.gl.CULL_FACE,e),this._setState(this.gl.DEPTH_TEST,t),this.gl.depthMask(n)}setBlendEnabled(e){e?this.gl.enable(this.gl.BLEND):this.gl.disable(this.gl.BLEND)}bindRenderTarget(e,t,n){t?this.gl.viewport(t.x,t.y,t.z,t.w):e?this.gl.viewport(0,0,e.size.x,e.size.y):n&&this.gl.viewport(0,0,n.x,n.y),e?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e.getFrameBuffer()),this.gl.drawBuffers(e.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}clear(e,t){let n=0;e&&(this.gl.clearColor(e.x,e.y,e.z,e.w),n|=this.gl.COLOR_BUFFER_BIT),t!==null&&(this.gl.clearDepth(t),n|=this.gl.DEPTH_BUFFER_BIT),n!==0&&this.gl.clear(n)}blit(e,t,n,r,i,a){let o=this.gl;o.bindFramebuffer(o.READ_FRAMEBUFFER,e?e.getFrameBuffer():null),a&&o.readBuffer(o.COLOR_ATTACHMENT0),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,t?t.getFrameBuffer():null),a&&t&&o.drawBuffers([o.COLOR_ATTACHMENT0]),o.blitFramebuffer(0,0,n,r,0,0,n,r,o.COLOR_BUFFER_BIT,i?o.LINEAR:o.NEAREST)}draw(e,t,n,r,i){e.use(e=>{e.uploadUniforms(),this.gl.bindVertexArray(t.getVAO());let i=t.indexBuffer,a=this.gl.UNSIGNED_SHORT;i&&i.array&&i.array.BYTES_PER_ELEMENT==4&&(a=this.gl.UNSIGNED_INT),r==`NORMAL`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):r==`ADD`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):r==`DIFF`&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);let o=this.gl[n];t.instanceCount>0?i?this.gl.drawElementsInstanced(o,t.indexCount,a,0,t.instanceCount):this.gl.drawArraysInstanced(o,0,t.vertCount,t.instanceCount):i?this.gl.drawElements(o,t.indexCount,a,0):this.gl.drawArrays(o,0,t.vertCount),this.gl.bindVertexArray(null)})}collectTimerQueries(){if(!this._extDisJointTimerQuery)return null;if(this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))return this._queryList.forEach(e=>this.gl.deleteQuery(e)),this._queryList.length=0,null;let e=[];if(this._queryListQueued.length>0){let t=this._queryListQueued.length;for(let n=t-1;n>=0;n--){let t=this._queryListQueued[n];if(this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT_AVAILABLE)){let r=this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT);e.push({name:t.name,duration:r/1e3/1e3}),this._queryList.push(t.query),this._queryListQueued.splice(n,1)}}}return e}},yt=(e,t)=>{if(!t)return e;let n=Object.keys(t),r=``;for(let e=0;e<n.length;e++)r+=`#define `+n[e]+` `+t[n[e]]+`
`;return r+=e,r},bt=(e,t)=>(e=e.replaceAll(`NUM_LIGHT_DIR`,t?t.directional.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_DIR`,t?Math.min(2,t.directional.filter(e=>e.component.castShadow).length).toString():`0`),e=e.replaceAll(`NUM_LIGHT_SPOT`,t?t.spot.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_SPOT`,t?Math.min(2,t.spot.filter(e=>e.component.castShadow).length).toString():`0`),e),xt=e=>(e=e.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(e,t,n)=>{let r=``;for(let e=0;e<Number(t);e++)r+=n.replaceAll(`LOOP_INDEX`,e.toString());return r}),e),St=(e,t,n)=>(e=yt(e,t),e=`#version 300 es
precision highp float;
`+e,e=bt(e,n),e=xt(e),e),Ct=class{listeners;constructor(){this.listeners=[]}on(e,t){this.listeners.push({event:e,cb:t})}once(e,t){this.listeners.push({event:e,cb:t,once:!0})}off(e,t){this.listeners=this.listeners.filter(n=>t==null?n.event!=e:!(n.event==e&&n.cb==t))}emit(e,t){let n=this.listeners.concat();for(let r=0;r<n.length;r++){let i=n[r];i.event==e&&(i.cb.apply(this,t||[]),i.once&&this.off(e,i.cb))}}hasEvent(e){return this.listeners.some(t=>t.event==e)}},wt;(function(e){function t(){let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``);return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}e.genUUID=t})(wt||={});var Tt;(function(e){let t=e.NEWTON_ITERATIONS=4;e.NEWTON_MIN_SLOPE=.001,e.SUBDIVISION_PRECISION=1e-7;let n=e.SUBDIVISION_MAX_ITERATIONS=10,r=e.BEZIER_EASING_CACHE_SIZE=11,i=e.BEZIER_EASING_SAMPLE_STEP_SIZE=1/r;function a(e){return-e.p0+3*e.p1-3*e.p2+e.p3}function o(e){return 3*e.p0-6*e.p1+3*e.p2}function s(e){return-3*e.p0+3*e.p1}function c(e,t){return 3*a(e)*t*t+2*o(e)*t+s(e)}e.calcBezierSlope=c;function l(e,t){return((a(e)*t+o(e))*t+s(e))*t+e.p0}e.calcBezier=l;function u(e,t,r,i){let a=0,o=0;for(let s=0;s<n;s++)o=t+(r-t)/2,a=l(i,o),a>e?r=o:t=o;return o}function d(e,n,r){for(let i=0;i<t;i++){let t=c(n,r);if(t==0)return r;let i=l(n,r)-e;r-=i/t}return r}function f(e,t,n){e.p1=Math.max(e.p0,Math.min(e.p3,e.p1)),e.p2=Math.max(e.p0,Math.min(e.p3,e.p2));let a=0;for(let e=1;e<n.length&&(a=e-1,!(t<n[e]));e++);let o=a/(r-1),s=c(e,o)/(e.p3-e.p0);return s==0?o:s>.01?d(t,e,o):u(t,o,o+i,e)}e.getBezierTfromX=f})(Tt||={});function Et(e,t,n,r){let i=Array(Tt.BEZIER_EASING_CACHE_SIZE);for(let a=0;a<Tt.BEZIER_EASING_CACHE_SIZE;++a)i[a]=Tt.calcBezier({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a/(Tt.BEZIER_EASING_CACHE_SIZE-1));return a=>a<=e.x?e.y:r.x<=a?r.y:Tt.calcBezier({p0:e.y,p1:t.y,p2:n.y,p3:r.y},Tt.getBezierTfromX({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a,i))}var Dt;(function(e){e.number=(e,t,n)=>e+(t-e)*n,e.vector=(e,t,n)=>e.lerp(t,n)})(Dt||={});var Ot=class extends Ct{keyframes=[];cache={frame:NaN,value:NaN};frameStart;frameEnd;frameDuration;constructor(e){super(),this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes=[],e.forEach(e=>{this.addKeyFrame(e)}))}addKeyFrame(e){let t=0;for(let n=0;n<this.keyframes.length&&this.keyframes[n].coordinate.x<e.coordinate.x;n++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let n=0;n<this.keyframes.length;n++){let r=this.keyframes[n];if(e<r.coordinate.x){let i=this.keyframes[n-1];t=i?i.to(r,e):r.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t===null?0:(this.cache={frame:e,value:t},t)}},kt=class extends Ct{name;curves;frameStart;frameEnd;frameDuration;updatedFrame=-1;value;constructor(e,t,n,r,i){super(),this.name=e||``,this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new M,t&&this.setFCurve(t,`x`),n&&this.setFCurve(n,`y`),r&&this.setFCurve(r,`z`),i&&this.setFCurve(i,`w`)}setFCurve(e,t){this.curves.set(t,e);let n=1/0,r=-1/0;this.curves.forEach(e=>{e.frameStart<n&&(n=e.frameStart),e.frameEnd>r&&(r=e.frameEnd)}),(n==-1/0||r==1/0)&&(n=0,r=1),this.frameStart=n,this.frameEnd=r,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(e){return this.curves.get(e)||null}setFrame(e){if(e==this.updatedFrame)return this;let t=this.curves.get(`x`),n=this.curves.get(`y`),r=this.curves.get(`z`),i=this.curves.get(`w`);return t&&(this.value.x=t.getValue(e)),n&&(this.value.y=n.getValue(e)),r&&(this.value.z=r.getValue(e)),i&&(this.value.w=i.getValue(e)),this.updatedFrame=e,this}},At=class extends Ct{coordinate={x:0,y:0};handleLeft={x:0,y:0};handleRight={x:0,y:0};interpolation=`BEZIER`;easing=null;nextFrame=null;constructor(e,t,n,r){super(),this.set(e,t,n,r)}set(e,t,n,r){this.coordinate=e,this.handleLeft=t||e,this.handleRight=n||e,this.interpolation=r||`BEZIER`}getEasing(e,t){return e==`BEZIER`?Et(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):e==`CONSTANT`?()=>this.coordinate.y:e=>{let n=t.coordinate.y-this.coordinate.y;return e=(e-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+e*n}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}},jt=class e extends Ct{static gltfLoaderFactory=null;_engine;connection;frame;nodes;curveGroups;root;gltf;currentScene;constructor(e,t){super(),this._engine=e,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},t&&this.connect(t)}connect(e,t){}disconnect(){}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t.buffer}async loadScene(t,n){this.currentScene=t,n&&(e.gltfLoaderFactory?await e.gltfLoaderFactory(this._engine).load(n).then(e=>{this.gltf=e,this.emit(`gltfLoaded`,[e])}):console.warn(`BLidge: gltfLoaderFactory not wired`)),await new Promise(e=>{setTimeout(()=>{e(null)},100)}),this.frame.start=t.frame.start,this.frame.end=t.frame.end,this.frame.fps=t.frame.fps,this.curveGroups=[],this.nodes=[];let r=Object.keys(t.animations);for(let e=0;e<r.length;e++){let n=r[e],i=new kt(n);t.animations[e].forEach(e=>{let t=new Ot;t.set(e.k.map(e=>{let t={B:`BEZIER`,C:`CONSTANT`,L:`LINEAR`}[e[0]],n=e[1];return new At({x:n[0],y:n[1]},n[2]!==void 0&&{x:n[2],y:n[3]}||void 0,n[4]!==void 0&&{x:n[4],y:n[5]}||void 0,t)})),i.setFCurve(t,e.axis)}),this.curveGroups.push(i)}this.nodes=[];let i=e=>{let t={name:``,uniforms:{}};e.material&&(t.name=e.material.name||``,t.uniforms=e.material.uniforms||{});let n={name:e.name,class:e.class,parent:e.parent,children:[],animations:e.animation||{},position:e.position||[0,0,0],rotation:e.rotation||[0,0,0],scale:e.scale||[1,1,1],material:t,type:e.type,visible:e.visible},r=e.param;return r&&`position`in r?n.param={position:new Float32Array(this.binaryStringToArrayBuffer(atob(r.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(r.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(r.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(r.index)))}:n.param=r,e.children&&e.children.forEach(e=>{n.children.push(i(e))}),this.nodes.push(n),n};this.root=i(t.root),this.emit(`sync/scene`,[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(e){this.frame=e,this.emit(`sync/timeline`,[this.frame])}onOpen(e){}onMessage(e){}onClose(e){this.disconnect()}getCurveGroup(e){return this.curveGroups[e]}setFrame(e){this.onSyncTimeline({...this.frame,playing:!0,current:e})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(e=>{this.on(`gltfLoaded`,t=>{e(t)})})}dispose(){this.disconnect()}},Mt=class extends Ct{uuid;initiator;fields_;constructor(){super(),this.uuid=wt.genUUID(),this.fields_=new Map,this.initiator=`script`}restoreUUID(e){this.uuid=e}serialize(e){e||={mode:`view`};let t={};return this.fields_.forEach((n,r)=>{let i=this.getFieldOpt(r);e.mode==`export`&&i&&i&&i.noExport||(t[r]=n.get(e))}),t}serializeToDirectory(){return(e=>{let t={type:`folder`,childs:{},opt:{}},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=this.getFieldOpt(i);if(!i)continue;let o=t,s=i.split(`/`);for(let e=0;e<s.length;e++){let t=s[e];t&&o.type!=`value`&&(o.childs[t]||(e==s.length-1?o.childs[t]={type:`value`,value:null,opt:a}:o.childs[t]={type:`folder`,childs:{},opt:a}),o=o.childs[t])}o.type==`value`&&(o.value=e[i])}return t})(this.serialize())}deserialize(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let r=t[n],i=this.fields_.get(r);i&&i.set(e[r])}}exportEditor(){this.serialize({mode:`export`})}field(e,t,n,r){let i=typeof n==`function`?n:void 0,a=typeof n==`object`&&n||r||{};i||(a.readOnly=!0,a.noExport=!0);let o=e.startsWith(`/`)?e.slice(1):e;this.fields_.set(o,{get:t,set:(t=>{i&&i(t),this.noticeField(e)}),opt:a})}fieldDir(e,t){let n=e;return this.field(n+`/`,()=>null,void 0,{...t,isFolder:!0}),{dir:e=>this.fieldDir(`${n}/${e}`),field:(e,t,r,i)=>{this.field(`${n}/${e}`,t,r,i)}}}removeField(e){let t=e.startsWith(`/`)?e.slice(1):e;this.fields_.delete(t)}setField(e,t){let n=this.fields_.get(e);if(!n)throw Error(`Unknown field path: ${e}`);n.set(t)}getField(e,t){let n=this.fields_.get(e);if(n)return t||={mode:`view`},n.get(t)}getFieldOpt(e){let t=this.fields_.get(e);if(t)return t.opt}noticeField(e){this.emit(`fields/update/`+e),this.emit(`fields/update`,[[e]])}},Nt=class extends Mt{disableEdit;order;_entity;_engine;_enabled;_tag;_disposed;constructor(e){super(),this.disableEdit=!1,this._entity=e.entity,this._engine=e.engine,this._enabled=!0,this._disposed=!1,this._tag=``,this.order=0,this.field(`enabled`,()=>this.enabled,e=>this.enabled=e,{hidden:!0,noExport:!0}),this.field(`tag`,()=>this.tag,e=>this._tag=e,{readOnly:!0,noExport:!0,hidden:e=>e==``})}get tag(){return this._tag}get entity(){return this._entity}get engine(){return this._engine}set enabled(e){this._enabled=e}get enabled(){return this._enabled}update(e){this.enabled&&this.updateImpl(e)}updateImpl(e){}postUpdate(e){this.enabled&&this.postUpdateImpl(e)}postUpdateImpl(e){}prepareRender(e){this.enabled&&this.prepareRenderImpl(e)}prepareRenderImpl(e){}commitFrame(e){this.enabled&&this.commitFrameImpl(e)}commitFrameImpl(e){}dispose(){this._disposed=!0,this.emit(`dispose`)}},Pt=class extends Mt{vertCount;attributes;boundingBox;updateVersion;constructor(){super(),this.vertCount=0,this.attributes=new Map,this.boundingBox=null,this.updateVersion=0}setAttribute(e,t,n,r){return this.attributes.set(e,{array:t,size:n,opt:r}),this.updateVersion++,this.updateVertCount(),e===`position`&&this.computeBoundingBox(),this}getAttribute(e){return this.attributes.get(e)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((e,t)=>{t==`index`||e.opt&&e.opt.instanceDivisor||(this.vertCount=Math.min(e.array.length/e.size,this.vertCount))})}computeBoundingBox(){let e=this.attributes.get(`position`);if(!e){this.boundingBox=null;return}let t=e.array,n=new M(1/0,1/0,1/0),r=new M(-1/0,-1/0,-1/0);for(let e=0;e<t.length;e+=3){let i=t[e],a=t[e+1],o=t[e+2];i<n.x&&(n.x=i),a<n.y&&(n.y=a),o<n.z&&(n.z=o),i>r.x&&(r.x=i),a>r.y&&(r.y=a),o>r.z&&(r.z=o)}this.boundingBox={min:n,max:r}}requestUpdate(){this.updateVersion++}},Ft=class extends Pt{constructor(e){super();let t=[],n=[],r=[],i=[],a=[],{width:o,height:s,depth:c,segmentsWidth:l,segmentsHeight:u,segmentsDepth:d}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...e},f=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:o,h:c,d:s,segW:l,segH:d},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:o,h:c,d:s,segW:l,segH:d}],p=0;for(let e of f){let o=e.normal,s=e.dir,c=e.up,l=e.segW,u=e.segH,d=e.w/2,f=e.h/2,m=e.d/2,h=e.w/l,g=e.h/u;for(let e=0;e<=u;e++)for(let _=0;_<=l;_++){let v=-d+_*h,y=-f+e*g,b=-m,x=_/l,S=e/u,C=v*-s[0]+y*c[0]+b*-o[0],w=v*-s[1]+y*c[1]+b*-o[1],T=v*-s[2]+y*c[2]+b*-o[2];if(t.push(C,w,T),n.push(...o),r.push(x,S),a.push(e/u*c[1]+Math.max(0,c[2])),e<u&&_<l){let t=p+e*(l+1)+_,n=p+(e+1)*(l+1)+_,r=p+(e+1)*(l+1)+(_+1),a=p+e*(l+1)+(_+1);i.push(t,n,a),i.push(n,r,a)}}p+=(l+1)*(u+1)}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`posY`,new Float32Array(a),1),this.setAttribute(`index`,new Uint16Array(i),1)}},It=class extends Pt{constructor(e){super();let t=[],n=[],r=[],i=[],{height:a,radiusTop:o,radiusBottom:s,radSegments:c,heightSegments:l,caps:u}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...e};for(let e=0;e<=l+2;e++)for(let d=0;d<=c;d++){let f=Math.PI*2/c*d;if(e<=l){let u=1-e/l,p=(1-u)*o+u*s,m=Math.cos(f)*p,h=-(a/2)+a/l*e,g=Math.sin(f)*p;t.push(m,h,g),r.push(d/c,e/l);let _=new M(Math.cos(f),0,Math.sin(f)).normalize();if(n.push(_.x,_.y,_.z),e<l){let t=c+1;i.push(e*t+d,(e+1)*t+(d+1)%t,e*t+(d+1)%t,e*t+d,(e+1)*t+d,(e+1)*t+(d+1)%t)}}else{if(!u)continue;let p=e-l-1,m=p?o:s,h=Math.cos(f)*m,g=-(a/2)+a*p,_=Math.sin(f)*m;t.push(h,g,_),r.push((h+m)*.5/m,(_+m)*.5/m),n.push(0,-1+p*2,0);let v=(c+1)*(l+(p+1));d<=c-2&&(p==0?i.push(v,v+d,v+d+1):i.push(v,v+d+1,v+d))}}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}},Lt=class extends Pt{constructor(e){super();let{width:t,height:n,widthSegments:r,heightSegments:i,floor:a}={width:1,height:1,widthSegments:1,heightSegments:1,...e},o=t/2,s=n/2,c=[],l=[],u=[],d=[];for(let e=0;e<=i;e++)for(let f=0;f<=r;f++){let p=f/r,m=e/i;if(a?(c.push(-o+t*p,0,s-n*m),l.push(0,1,0)):(c.push(-o+t*p,-s+n*m,0),l.push(0,0,1)),u.push(p,m),e>0&&f>0){let t=r+1,n=t*e+f,i=t*(e-1)+f-1;d.push(n,t*e+f-1,i,n,i,t*(e-1)+f)}}this.setAttribute(`position`,new Float32Array(c),3),this.setAttribute(`normal`,new Float32Array(l),3),this.setAttribute(`uv`,new Float32Array(u),2),this.setAttribute(`index`,new Uint16Array(d),1)}},Rt=class extends Pt{constructor(e){super();let t=[],n=[],r=[],i=[],{radius:a,widthSegments:o,heightSegments:s}={radius:.5,widthSegments:8,heightSegments:8,...e};for(let e=0;e<=s;e++){let c=e/s*Math.PI;for(let l=0;l<=o;l++){let u=l/o*Math.PI*2,d=Math.sin(c)*a,f=Math.cos(u)*d,p=-Math.cos(c)*a,m=-Math.sin(u)*d;t.push(f,p,m),r.push(l/o,e/s);let h=new M(f,p,m).normalize();if(n.push(h.x,h.y,h.z),l<o&&e<s){let t=o+1;i.push(e*t+l,e*t+(l+1)%t,(e+1)*t+(l+1)%t,e*t+l,(e+1)*t+(l+1)%t,(e+1)*t+l)}}}for(let e=0;e<i.length;e++)i[e]=Math.min(t.length/3-1,i[e]);this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}},zt=class extends Nt{cameraType;fov;aspect;near;far;orthWidth;orthHeight;projectionMatrix;viewMatrix;projectionMatrixPrev;viewMatrixPrev;_historyInitialized;needsUpdateProjectionMatrix;displayOut;viewPort;dofParams;constructor(e){super(e),this.cameraType=`perspective`,this.viewMatrix=new N,this.projectionMatrix=new N,this.viewMatrixPrev=new N,this.projectionMatrixPrev=new N,this._historyInitialized=!1,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthWidth=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.dofParams={focusDistance:.5,kFilmHeight:.008,fNumber:.3};let t=()=>{this.needsUpdateProjectionMatrix=!0};this.field(`fov`,()=>this.fov,e=>{this.fov=e,t()}),this.field(`near`,()=>this.near,e=>{this.near=e,t()}),this.field(`far`,()=>this.far,e=>{this.far=e,t()}),this.field(`orthWidth`,()=>this.orthWidth,e=>{this.orthWidth=e,t()}),this.field(`orthHeight`,()=>this.orthHeight,e=>{this.orthHeight=e,t()}),this.field(`fNumber`,()=>this.dofParams.fNumber,e=>{this.dofParams.fNumber=e},{step:.05}),this._tag=`camera`}updateProjectionMatrix(){this.cameraType==`perspective`?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthWidth,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}updateImpl(e){if(this.displayOut){let t=e.resolution.x/e.resolution.y;this.aspect!==t&&(this.aspect=t,this.needsUpdateProjectionMatrix=!0)}}prepareRenderImpl(e){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix(),this._historyInitialized||=(this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix),!0)}commitFrameImpl(e){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}},Bt=class extends zt{viewMatrixOffset;constructor(e){super(e),this.viewMatrixOffset=new ct().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100,this.displayOut=!1}prepareRenderImpl(e){super.prepareRenderImpl(e),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}},Vt=class extends Bt{lightType;color;intensity;castShadow;shadowMapSize;angle;blend;distance;decay;constructor(e){super(e),this.lightType=`spot`,this.cameraType=`perspective`,this.color=new M(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new M(1024,1024),this.orthWidth=4,this.orthHeight=4,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field(`intensity`,()=>this.intensity,e=>this.intensity=e),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}lookAt(e){this.entity.lookAt(e),this.entity.quaternion.multiply(new ct().setFromEuler(new st(Math.PI/2)))}},Ht=new Pt,F=class extends Nt{geometry;material;instanceCount;constructor(e){super(e);let t=e.args||{};this.geometry=t.geometry||Ht,this.material=t.material||null,this.instanceCount=t.instanceCount||1}},Ut=class extends Nt{node;rotationOffsetX;animations;uniforms;uniformCurves;transformAutoUpdate;_blidge;_lightComponent;constructor(e){super(e),this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=e.args.blidge,this.node=e.args.node,this.node.type==`camera`&&(this.rotationOffsetX=-Math.PI/2);let t=Object.keys(this.node.animations);for(let e=0;e<t.length;e++){let n=t[e];this.animations.set(n,this._blidge.getCurveGroup(this.node.animations[n]))}let n=Object.keys(this.node.material.uniforms);for(let e=0;e<n.length;e++){let t=n[e],r=this.node.material.uniforms[t],i=this._blidge.curveGroups[r];i&&(this.uniformCurves.set(t,i),this.uniforms[t]={type:`4fv`,value:i.value})}let r=this.entity;if(r.name=this.node.name,r.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),r.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},`YZX`),r.quaternion.updated=!1,r.euler.setFromQuaternion(r.quaternion),r.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type==`cube`){let e=r.addComponent(F),t=this.node.param;e.geometry=new Ft({width:t.x,height:t.y,depth:t.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type==`sphere`){let e=r.addComponent(F),t=this.node.param;e.geometry=new Rt({radius:t.r,widthSegments:32,heightSegments:16})}else if(this.node.type==`cylinder`){let e=r.addComponent(F);e.geometry=new It}else if(this.node.type==`plane`){let e=r.addComponent(F),t=this.node.param;e.geometry=new Lt({width:t.x,height:t.y})}else if(this.node.type==`mesh`){let e=r.addComponent(F),t=this.node.param,n=new Pt;n.setAttribute(`position`,t.position,3),n.setAttribute(`uv`,t.uv,2),n.setAttribute(`normal`,t.normal,3),n.setAttribute(`index`,t.index,3),e.geometry=n}else if(this.node.type==`gltf`){let e=r.addComponent(F);this._blidge.gltfPrm.then(t=>{let n=t.scene.findEntityByName(this.node.name);if(n){let t=n.getComponent(F);t&&(e.geometry=t.geometry,e.material||=t.material)}r.noticeEventParent(`update/blidge/scene`,[r])})}if(this.node.type==`camera`){let e=e=>{e.fov=this.node.param.fov,e.needsUpdateProjectionMatrix=!0},t=r.getComponentsByTag(`camera`)[0];t&&e(t);let n=t=>{t instanceof zt&&e(t)};r.on(`componentAdded`,n),this.once(`dispose`,()=>{r.off(`componentAdded`,n)})}if(this.node.type==`light`){let e=this.node.param;this._lightComponent=r.addComponent(Vt),this._lightComponent.deserialize({...e,lightType:e.type,color:new M().copy(e.color),castShadow:e.shadowMap})}r.visible=this.node.visible}updateImpl(e){if(!this._blidge||!this.node)return;let t=e.timeCode*this._blidge.frame.fps;if(this.animations.forEach(e=>{e.setFrame(t)}),this.transformAutoUpdate){let e=this.animations.get(`position`);if(e){let t=e.value;e.getFCurve(`x`)&&(this.entity.position.x=t.x),e.getFCurve(`y`)&&(this.entity.position.y=t.y),e.getFCurve(`z`)&&(this.entity.position.z=t.z)}let n=this.animations.get(`rotation`);if(n){let e={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},t=n.value;n.getFCurve(`x`)&&(e.x=t.x),n.getFCurve(`y`)&&(e.y=t.y),n.getFCurve(`z`)&&(e.z=t.z),this.entity.quaternion.setFromEuler({x:e.x+this.rotationOffsetX,y:e.y,z:e.z},`YZX`)}let r=this.animations.get(`scale`);if(r){let e=r.setFrame(t).value;r.getFCurve(`x`)&&(this.entity.scale.x=e.x),r.getFCurve(`y`)&&(this.entity.scale.y=e.y),r.getFCurve(`z`)&&(this.entity.scale.z=e.z)}}let n=this.animations.get(`hide`);if(n&&(this.entity.visible=n.value.x<.5),this._lightComponent){let e=this.animations.get(`color`);e&&this._lightComponent.color.copy(e.setFrame(t).value)}this.uniformCurves.forEach((e,n)=>{this.uniforms[n].value=e.setFrame(t).value})}},Wt=class extends Mt{name;position;euler;quaternion;scale;matrix;matrixWorld;matrixWorldPrev;_matrixWorldHistoryInitialized;autoMatrixUpdate;parent;children;components;componentsSorted;visible;userData;unresolvedComponents;_engine;constructor(e){super(),this._engine=e.engine,this.name=e.name??``,this.position=new M(0,0,0,1),this.euler=new st,this.quaternion=new ct(0,0,0,1),this.scale=new M(1,1,1),this.matrix=new N,this.matrixWorld=new N,this.matrixWorldPrev=new N,this._matrixWorldHistoryInitialized=!1,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.unresolvedComponents=[],this.field(`name`,()=>this.name,e=>this.name=e),this.field(`position`,()=>this.position.getElm(`vec3`),e=>this.position.setFromArray(e),{format:{type:`vector`}}),this.field(`euler`,()=>this.euler.getElm(`vec3`),e=>this.euler.setFromArray(e),{format:{type:`vector`}}),this.field(`scale`,()=>this.scale.getElm(`vec3`),e=>this.scale.setFromArray(e),{format:{type:`vector`}}),this.field(`visible`,()=>this.visible,e=>this.visible=e,{hidden:!0}),this.field(`children`,()=>this.children.map(e=>e.uuid),{hidden:!0}),this.field(`components`,()=>{let e=[];return this.components.forEach(t=>e.push(t.uuid)),e},{hidden:!0})}get engine(){return this._engine}update(e){let t={...e};t.matrix=this.matrixWorld,this.updateImpl(e);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].update(t);this.autoMatrixUpdate&&this.updateMatrix();for(let e=0;e<this.children.length;e++)this.children[e].update(t)}updateImpl(e){}postUpdate(e){let t={...e,matrix:this.matrixWorld};for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].postUpdate(t);for(let e=0;e<this.children.length;e++)this.children[e].postUpdate(t)}prepareRender(e){let t={...e,matrix:this.matrixWorld};this._matrixWorldHistoryInitialized||=(this.matrixWorldPrev.copy(this.matrixWorld),!0);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].prepareRender(t);for(let e=0;e<this.children.length;e++)this.children[e].prepareRender(t)}commitFrame(e){let t={...e,matrix:this.matrixWorld};this.matrixWorldPrev.copy(this.matrixWorld);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].commitFrame(t);for(let e=0;e<this.children.length;e++)this.children[e].commitFrame(t)}add(e){e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),this.noticeField(`children`)}remove(e){this.children=this.children.filter(t=>t.uuid!=e.uuid),this.noticeField(`children`)}updateMatrix(e){this.parent&&e&&this.parent.updateMatrix(!0);let t=this.parent?this.parent.matrixWorld:new N;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(t)}updateMatrixRecursive(e){this.autoMatrixUpdate&&this.updateMatrix(e);for(let e=0;e<this.children.length;e++)this.children[e].updateMatrixRecursive()}decomposeMatrix(e){e.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(e){this.decomposeMatrix(this.matrix.clone().multiply(e))}lookAt(e){let t=e.clone(),n=new M(0,1,0,0);if(this.parent){let e=this.parent.matrixWorld.clone().inverse();t.applyMatrix4AsPosition(e),n.applyMatrix4AsDirection(e).normalize()}let r=new N().lookAt(this.position,t,n);this.quaternion.setFromMatrix(r),this.updateMatrix()}addComponent(e,...t){this.removeComponent(e);let[n]=t,r=new e({entity:this,engine:this._engine,args:n||{}});return this.components.set(e,r),this.componentsSorted.push(r),this.componentsSorted.sort((e,t)=>e.order-t.order),this.noticeField(`components`),this.emit(`componentAdded`,[r]),r}removeComponent(e){let t=this.components.get(e);t&&t.dispose(),this.components.delete(e),this.componentsSorted=this.componentsSorted.filter(e=>e!==t),this.noticeField(`components`),t&&this.emit(`componentRemoved`,[t])}removeComponentByUUID(e){for(let t of this.components){let n=t[0],r=t[1];if(r.uuid===e)return r.dispose(),this.components.delete(n),this.componentsSorted=this.componentsSorted.filter(e=>e!==r),this.noticeField(`components`),this.emit(`componentRemoved`,[r]),r}}getComponent(e){return this.components.get(e)}getComponentByUUID(e){for(let t of this.components.values())if(t.uuid===e)return t;return null}getComponentByTag(e){for(let t of this.components.values())if(t.tag===e)return t;return null}getComponentsByTag(e){let t=[];return this.components.forEach(n=>{n.tag==e&&t.push(n)}),t}findEntityByName(e){if(this.name==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByName(e);if(n)return n}}findEntityByUUID(e){if(this.uuid==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByUUID(e);if(n)return n}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(e){let t=`/`+this.name;return e&&e.uuid==this.uuid||this.parent&&(t=this.parent.getScenePath(e)+t),t}noticeEventChilds(e,t){this.emit(e,t);for(let n=0;n<this.children.length;n++)this.children[n].noticeEventChilds(e,t)}noticeEventParent(e,t){this.emit(e,t),this.parent&&this.parent.noticeEventParent(e,t)}traverse(e){e(this),this.children.forEach(t=>t.traverse(e))}isVisibleTraverse(){return this.visible?!this.parent||this.parent.isVisibleTraverse():!1}dispose(){this.emit(`dispose`),this.parent&&this.parent.remove(this),this.components.forEach(e=>{e.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(e=>{e.disposeRecursive()}),this.children=[]}},Gt=class extends Pt{constructor(e){super();let{innerRadius:t,outerRadius:n,thetaSegments:r,phiSegments:i,extrude:a}={innerRadius:.4,outerRadius:.5,thetaSegments:12,phiSegments:1,extrude:0,...e},o=r+1,s=[],c=[],l=[],u=[],d=(r+1)*(i+1);for(let e=0;e<(a==0?1:2);e++){let f=e==0?-1:1,p=a==0?0:a/2*f;for(let a=0;a<i+1;a++){let m=t+(n-t)*(a/i);for(let t=0;t<=r;t++){let n=t/r*Math.PI*2,h=Math.cos(n)*m,g=Math.sin(n)*m;if(s.push(h,g,p),l.push(t/r,a/i),c.push(0,0,1*f),a>0&&t<r){let n=d*e+a*o+t;e==0?u.push(n,n-o,n+1,n+1,n-o,n+1-o):u.push(n,n+1,n-o,n+1,n+1-o,n-o)}}}}if(a!=0){for(let e=0;e<2;e++){let o=e==0?t:n;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let u=n/r*Math.PI*2,d=Math.cos(u)*o,f=Math.sin(u)*o;s.push(d,f,(-.5+t)*a),l.push(n/r,t/i),e==0?c.push(-Math.cos(u),-Math.sin(u),0):c.push(Math.cos(u),Math.sin(u),0)}}let e=d*2;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let i=e+n+r*2*t,a=n==r-1?-r:0;t==0?u.push(i,i+r,i+r+1+a,i,i+r+1+a,i+1+a):u.push(i,i+r+1+a,i+r,i,i+1+a,i+r+1+a)}}this.setAttribute(`position`,new Float32Array(s),3),this.setAttribute(`normal`,new Float32Array(c),3),this.setAttribute(`uv`,new Float32Array(l),2),this.setAttribute(`index`,new Uint16Array(u),1)}},I=new Map,Kt=(e,t)=>I.get(e)||(I.set(e,t),t),qt=class{origin;direction;constructor(e,t){this.origin=e||new M,this.direction=t||new M(0,0,-1)}setFromCamera(e,t,n){let r=new M(e.x,e.y,-1,1).applyMatrix4(t).applyMatrix4(n);r.x/=r.w,r.y/=r.w,r.z/=r.w;let i=new M(e.x,e.y,1,1).applyMatrix4(t).applyMatrix4(n);return i.x/=i.w,i.y/=i.w,i.z/=i.w,this.origin.set(r.x,r.y,r.z),this.direction.set(i.x-r.x,i.y-r.y,i.z-r.z).normalize(),this}intersectAABB(e,t){let n=1/this.direction.x,r=1/this.direction.y,i=1/this.direction.z,a=(e.x-this.origin.x)*n,o=(t.x-this.origin.x)*n,s=Math.min(a,o),c=Math.max(a,o);if(a=(e.y-this.origin.y)*r,o=(t.y-this.origin.y)*r,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),a=(e.z-this.origin.z)*i,o=(t.z-this.origin.z)*i,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),c<0||s>c)return null;let l=s>=0?s:c;return{distance:l,point:new M(this.origin.x+this.direction.x*l,this.origin.y+this.direction.y*l,this.origin.z+this.direction.z*l)}}intersectTriangle(e,t,n){let r=1e-8,i=t.x-e.x,a=t.y-e.y,o=t.z-e.z,s=n.x-e.x,c=n.y-e.y,l=n.z-e.z,u=this.direction.y*l-this.direction.z*c,d=this.direction.z*s-this.direction.x*l,f=this.direction.x*c-this.direction.y*s,p=i*u+a*d+o*f;if(p>-1e-8&&p<r)return null;let m=1/p,h=this.origin.x-e.x,g=this.origin.y-e.y,_=this.origin.z-e.z,v=m*(h*u+g*d+_*f);if(v<0||v>1)return null;let y=g*o-_*a,b=_*i-h*o,x=h*a-g*i,S=m*(this.direction.x*y+this.direction.y*b+this.direction.z*x);if(S<0||v+S>1)return null;let C=m*(s*y+c*b+l*x);return C>r?{distance:C,point:new M(this.origin.x+this.direction.x*C,this.origin.y+this.direction.y*C,this.origin.z+this.direction.z*C)}:null}},Jt=class{ray;_v0;_v1;_v2;constructor(){this.ray=new qt,this._v0=new M,this._v1=new M,this._v2=new M}setFromCamera(e,t){let n=t.getComponentsByTag(`camera`)[0];if(!n)return;let r=n.projectionMatrix.clone().inverse(),i=n.viewMatrix.clone().inverse();this.ray.setFromCamera(e,r,i)}intersectEntities(e){let t=[];return e.traverse(e=>{if(!e.visible)return;let n=e.getComponent(F);if(!n)return;let r=this.intersectMesh(e,n);r&&t.push(...r)}),t.sort((e,t)=>e.distance-t.distance),t}intersectMesh(e,t){let n=t.geometry,r=n.boundingBox;if(!r)return null;let i=e.matrixWorld.clone().inverse(),a=new qt;a.origin.copy(this.ray.origin),a.origin.w=1,a.origin.applyMatrix4(i),a.origin.x/=a.origin.w,a.origin.y/=a.origin.w,a.origin.z/=a.origin.w;let o=this.ray.origin.clone().add(this.ray.direction);if(o.w=1,o.applyMatrix4(i),o.x/=o.w,o.y/=o.w,o.z/=o.w,a.direction.set(o.x-a.origin.x,o.y-a.origin.y,o.z-a.origin.z).normalize(),!a.intersectAABB(r.min,r.max))return null;let s=this.intersectTriangles(a,n);if(!s)return null;let c=s.point.clone();c.w=1,c.applyMatrix4(e.matrixWorld),c.x/=c.w,c.y/=c.w,c.z/=c.w;let l=c.x-this.ray.origin.x,u=c.y-this.ray.origin.y,d=c.z-this.ray.origin.z;return[{entity:e,distance:Math.sqrt(l*l+u*u+d*d),point:c}]}intersectTriangles(e,t){let n=t.getAttribute(`position`);if(!n)return null;let r=n.array,i=t.getAttribute(`index`),a=i?i.array:null,o=Math.floor((a?a.length:t.vertCount)/3),s=null;for(let t=0;t<o;t++){let n=(a?a[t*3+0]:t*3+0)*3,i=(a?a[t*3+1]:t*3+1)*3,o=(a?a[t*3+2]:t*3+2)*3;this._v0.set(r[n],r[n+1],r[n+2]),this._v1.set(r[i],r[i+1],r[i+2]),this._v2.set(r[o],r[o+1],r[o+2]);let c=e.intersectTriangle(this._v0,this._v1,this._v2);c&&(!s||c.distance<s.distance)&&(s=c)}return s}},L;(function(e){let t=e.assign=(e,...t)=>{for(let n=0;n<t.length;n++)t[n]!=null&&Object.assign(e,t[n]);return e};e.merge=(...e)=>t({},...e)})(L||={});var Yt=class extends Nt{_resolution;_postProcesses;constructor(e){super(e),this._postProcesses=[],this._resolution=new M}get postProcesses(){return this._postProcesses}add(e){return this.postProcesses.push(e),e.resize(this._resolution),e}remove(e){let t=this._postProcesses.indexOf(e);t>-1&&this._postProcesses.splice(t,1)}resize(e){this._resolution.x==e.x&&this._resolution.y==e.y||(this._resolution.copy(e),this.resizePostProcesses())}resizePostProcesses(){this.postProcesses.forEach(e=>{e.resize(this._resolution)})}},Xt=class extends Mt{name;vert;frag;defines;uniforms;useLight;depthTest;depthWrite;cullFace;drawType;blending;renderOrder;visibilityFlag;programCache;constructor(e){super(),e||={},this.name=e.name||``,this.visibilityFlag={},this.setVisibility(e.phase||[`shadowMap`,`deferred`]),this.useLight=e.useLight===void 0||e.useLight,this.depthTest=e.depthTest===void 0||e.depthTest,this.cullFace=e.cullFace!==void 0&&e.cullFace,this.depthWrite=e.depthWrite===void 0||e.depthWrite,this.drawType=e.drawType||`TRIANGLES`,this.blending=e.blending||`NORMAL`,this.renderOrder=e.renderOrder??0,this.vert=e.vert||`#define PI 3.14159265359\r
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
}`,this.defines=e.defines||{},this.uniforms=e.uniforms||{},this.programCache={}}setVisibility(e){this.visibilityFlag={shadowMap:e.indexOf(`shadowMap`)>-1,deferred:e.indexOf(`deferred`)>-1,forward:e.indexOf(`forward`)>-1,ui:e.indexOf(`ui`)>-1,envMap:e.indexOf(`envMap`)>-1,postprocess:e.indexOf(`postprocess`)>-1}}requestUpdate(){this.programCache={}}},Zt=class extends Mt{name;enabled;_passes;constructor(e){super();let t=e||{};this.name=t.name||``,this.enabled=!0,this._passes=e&&e.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(e=>e.enabled)}get output(){for(let e=this._passes.length-1;e>=0;e--){let t=this._passes[e];if(!t.passThrough&&t.enabled)return t.renderTarget}return null}resize(e){if(this._passes)for(let t=0;t<this._passes.length;t++)this._passes[t].resize(e)}dispose(){this.emit(`dispose`)}},R=class extends Xt{enabled;renderTarget;backBufferOverride;clearColor;clearDepth;resolutionRatio;passThrough;resolution;resolutionInv;viewPort;_fixedResolution;constructor(e,t){super({...t,frag:t.frag||`#define PI 3.14159265359\r
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
}`}),this.enabled=!0,this._fixedResolution=t.fixedResotluion?t.fixedResotluion.clone():null,this.resolution=new M,this.resolutionInv=new M,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:`2fv`},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:`2fv`},this.renderTarget=t.renderTarget===void 0?e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]):t.renderTarget,this.clearColor=t.clearColor??null,this.clearDepth=t.clearDepth??null,this.depthTest=t.depthTest!==void 0&&t.depthTest,this.resolutionRatio=t.resolutionRatio||1,this.passThrough=t.passThrough??!1,this.viewPort=t.viewPort||null,this.backBufferOverride=t.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(e){this._fixedResolution=e,this.resize(e||new M)}onAfterRender(){}resize(e){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(e).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(e){this.renderTarget=e,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}},Qt=class extends mt{material;_renderer;_resolution;_postProcess;_frameBuffer;constructor(e,t){let n=e.backend,r=n.gl;super(r),this._renderer=e,this._resolution=t.resolution||new M(1024,1024),this.setting({wrapS:r.REPEAT,wrapT:r.REPEAT,magFilter:r.LINEAR,minFilter:r.LINEAR}),this._frameBuffer=new ht(r).setTexture([this]).setSize(this._resolution),this.material=new R(n,{...t,renderTarget:this._frameBuffer}),this._postProcess=new Zt({passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}},$t=`#define PI 3.14159265359\r
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
}`,en=`#define PI 3.14159265359\r
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

}`,tn=`#define PI 3.14159265359\r
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

}`,nn=`#define PI 3.14159265359\r
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

}`,an=e=>{let t=[];for(let n=0;n<e;n++){let r=new M;r.x=Math.random()*2-1,r.y=Math.random()*2-1,r.z=n/e*.95+.05,r.normalize(),r.multiply(n/e*.95+.05),t.push(...r.getElm(`vec3`))}return t},on=class extends Ct{postprocess;normalSelector_;lightShaft;rtLightShaft1;rtLightShaft2;ssao;rtSSAO1;rtSSAO2;ssaoBlur;ssaoBlurV;ssaoBlurUni;shading;constructor(e){super();let t=e.backend,n=new R(t,{name:`normalSelector`,frag:tn,renderTarget:null,uniforms:L.merge({uNormalTexture:{value:null,type:`1i`},uPosTexture:{value:null,type:`1i`},uSelectorTexture:{value:null,type:`1i`}}),passThrough:!0}),r=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),i=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),a=new R(t,{name:`lightShaft`,frag:en,renderTarget:r,uniforms:L.merge({uLightShaftBackBuffer:{value:i.textures[0],type:`1i`},uDepthTexture:{value:null,type:`1i`}}),resolutionRatio:.5,passThrough:!0}),o=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),s=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),c=new R(t,{name:`ssao`,frag:nn,renderTarget:Kt(`ssao`,o),uniforms:L.merge({uSSAOBackBuffer:{value:s.textures[0],type:`1i`},uSSAOKernel:{value:an(16),type:`3fv`}}),resolutionRatio:.5,passThrough:!0}),l=L.merge({uSSAOTexture:{value:s.textures[0],type:`1i`},uDepthTexture:{value:null,type:`1i`},uNormalTexture:{value:null,type:`1i`},uWeights:{type:`1fv`,value:lt.gaussWeights(8)}}),u=new R(t,{name:`ssaoBlur/h`,frag:Kt(`ssaoBlur`,rn),uniforms:l,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:8}}),d=new R(t,{name:`ssaoBlur/v`,frag:Kt(`ssaoBlur`,rn),uniforms:L.merge(l,{uSSAOTexture:{value:u.renderTarget.textures[0],type:`1i`}}),defines:{SSAOSAMPLE:8,IS_VIRT:``},resolutionRatio:1,passThrough:!0}),f=new R(t,{name:`deferredShading`,frag:Kt(`deferredShading`,$t),uniforms:L.merge({uLightShaftTexture:{value:null,type:`1i`},uSSAOTexture:{value:d.renderTarget.textures[0],type:`1i`},uSSAOResolutionInv:{value:c.resolutionInv,type:`2fv`},uEnvMap:{value:e.envMap,type:`1i`}})});this.postprocess=new Zt({passes:[n,a,c,u,d,f]}),this.shading=f,this.lightShaft=a,this.ssao=c,this.rtSSAO1=o,this.rtSSAO2=s,this.ssaoBlur=u,this.ssaoBlurV=d,this.ssaoBlurUni=l,this.rtLightShaft1=r,this.rtLightShaft2=i,this.normalSelector_=n}update(e){let t=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=t,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],t=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=t,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setPassEnabled(e){e.ssao!==void 0&&(this.ssao.enabled=e.ssao,this.ssaoBlur.enabled=e.ssao,this.ssaoBlurV.enabled=e.ssao,e.ssao||(this.rtSSAO1.clear(),this.rtSSAO2.clear(),this.ssaoBlur.renderTarget&&this.ssaoBlur.renderTarget.clear(),this.ssaoBlurV.renderTarget&&this.ssaoBlurV.renderTarget.clear())),e.lightShaft!==void 0&&(this.lightShaft.enabled=e.lightShaft,e.lightShaft||(this.rtLightShaft1.clear(),this.rtLightShaft2.clear()))}setRenderCamera(e,t){for(let e=0;e<t.gBuffer.textures.length;e++){let n=t.gBuffer.textures[e];e===1&&(n=t.normalBuffer.textures[0]),this.shading.uniforms[`sampler`+e]=this.ssao.uniforms[`sampler`+e]={type:`1i`,value:n}}this.ssaoBlur.uniforms.uDepthTexture.value=t.gBuffer.textures[0],this.lightShaft.uniforms.uDepthTexture.value=t.gBuffer.depthTexture,this.shading.renderTarget=t.shadingBuffer,this.normalSelector_.renderTarget=t.normalBuffer,this.normalSelector_.uniforms.uNormalTexture.value=t.gBuffer.textures[1],this.normalSelector_.uniforms.uPosTexture.value=t.gBuffer.textures[0],this.normalSelector_.uniforms.uSelectorTexture.value=t.gBuffer.textures[3],this.ssaoBlurUni.uNormalTexture.value=t.normalBuffer.textures[0]}resize(e){this.postprocess.resize(e)}},sn=`#define PI 3.14159265359\r
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
}`,cn=`#define PI 3.14159265359\r
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
}`,ln=`#define PI 3.14159265359\r
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
`,un=`#define PI 3.14159265359\r
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

}`,dn=`in vec2 vUv;

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

}`,fn=`in vec2 vUv;
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

}`,pn=`in vec2 vUv;
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

}`,mn=`#define PI 3.14159265359\r
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
}`,hn=`#define PI 3.14159265359\r
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

}`,gn=class{dofCoc;dofBokeh;dofComposite;rtSSR1;rtSSR2;postprocess;_ssr;_ssComposite;_dofParams;_motionBlur;_motionBlurTile;_motionBlurNeighbor;_camera;constructor(e){let t=new R(e,{name:`collection`,frag:sn}),n=e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),r=e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),i=new R(e,{name:`ssr`,frag:Kt(`ssr`,hn),renderTarget:n,uniforms:L.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSceneTex:{value:null,type:`1i`},uSSRBackBuffer:{value:r.textures[0],type:`1i`}}),resolutionRatio:.5,passThrough:!0}),a=new R(e,{name:`ssComposite`,frag:Kt(`ssComposite`,mn),uniforms:L.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSSRTexture:{value:r.textures[0],type:`1i`}})}),o=new M(10,.05,20,.05),s=new R(e,{name:`dof/coc`,frag:ln,uniforms:L.merge({uGbufferPos:{value:null,type:`1i`},uParams:{value:o,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR,internalFormat:P.RGBA16F,type:P.HALF_FLOAT,format:P.RGBA})]),passThrough:!0,resolutionRatio:.5}),c=new R(e,{name:`dof/bokeh`,frag:cn,uniforms:L.merge({uCocTex:{value:s.renderTarget.textures[0],type:`1i`},uParams:{value:o,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),passThrough:!0,resolutionRatio:.5}),l=new R(e,{name:`dof/composite`,frag:un,uniforms:L.merge({uBokeTex:{value:c.renderTarget.textures[0],type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR,internalFormat:P.RGBA16F,type:P.HALF_FLOAT,format:P.RGBA})])}),u=new R(e,{name:`motionBlurTile`,frag:pn,uniforms:L.merge({uVelTex:{value:null,type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA32F,format:P.RGBA})]),defines:{TILE:16},resolutionRatio:1/16,passThrough:!0}),d=new R(e,{name:`motionBlurNeighbor`,frag:fn,uniforms:L.merge({uVelTex:{value:u.renderTarget.textures[0],type:`1i`}}),defines:{TILE:16},renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA32F,format:P.RGBA})]),resolutionRatio:1/16,passThrough:!0}),f=new R(e,{name:`motionBlur`,frag:dn,uniforms:L.merge({uVelNeighborTex:{value:d.renderTarget.textures[0],type:`1i`},uVelTex:{value:null,type:`1i`},uDepthTexture:{value:null,type:`1i`},uPower:{value:1,type:`1f`}}),defines:{TILE:16}});this.postprocess=new Zt({passes:[t,i,a,s,c,l,u,d,f]}),this._ssr=i,this._ssComposite=a,this.dofCoc=s,this.dofBokeh=c,this.dofComposite=l,this._motionBlur=f,this._motionBlurTile=u,this._motionBlurNeighbor=d,this._dofParams=o,this.rtSSR1=n,this.rtSSR2=r,this._camera=null}update(e){if(!this._camera)return;let t=this._camera.fov,n=this._camera.dofParams.focusDistance,r=this._camera.dofParams.kFilmHeight,i=r/Math.tan(.5*(t/180*Math.PI)),a=1/this.dofBokeh.renderTarget.size.y*5,o=1/a,s=i*i/(this._camera.dofParams.fNumber*(n-i)*r*2);this._dofParams.set(n,a,o,s);let c=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=c,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(e){this.postprocess.resize(e)}setPassEnabled(e){e.motionBlur!==void 0&&(this._motionBlurTile.enabled=e.motionBlur,this._motionBlurNeighbor.enabled=e.motionBlur,this._motionBlur.enabled=e.motionBlur,e.motionBlur||(this._motionBlurTile.renderTarget&&this._motionBlurTile.renderTarget.clear(),this._motionBlurNeighbor.renderTarget&&this._motionBlurNeighbor.renderTarget.clear())),e.ssr!==void 0&&(this._ssr.enabled=e.ssr,this._ssComposite.enabled=e.ssr,e.ssr||(this.rtSSR1.clear(),this.rtSSR2.clear())),e.dof!==void 0&&(this.dofCoc.enabled=e.dof,this.dofBokeh.enabled=e.dof,this.dofComposite.enabled=e.dof,e.dof||(this.dofBokeh.renderTarget&&this.dofBokeh.renderTarget.clear(),this.dofComposite.renderTarget&&this.dofComposite.renderTarget.clear()))}setMotionBlurPower(e){this._motionBlur.uniforms.uPower.value=e}setRenderCamera(e,t){this._camera=e,this.postprocess.passes[0]&&(this.postprocess.passes[0].backBufferOverride=t.shadingBuffer.textures),this._ssr.uniforms.uGbufferPos.value=t.gBuffer.textures[0],this._ssr.uniforms.uGbufferNormal.value=t.normalBuffer.textures[0],this._ssr.uniforms.uSceneTex.value=t.forwardBuffer.textures[0],this._ssComposite.uniforms.uGbufferPos.value=t.gBuffer.textures[0],this._ssComposite.uniforms.uGbufferNormal.value=t.gBuffer.textures[1],this.dofCoc.uniforms.uGbufferPos.value=t.gBuffer.textures[0],this._motionBlurTile.uniforms.uVelTex.value=t.gBuffer.textures[4],this._motionBlur.uniforms.uVelTex.value=t.gBuffer.textures[4],this._motionBlur.uniforms.uDepthTexture.value=t.gBuffer.depthTexture}},_n=`#define PI 3.14159265359\r
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

}`,vn=class extends Ct{postprocess;resolution;renderTarget;pmremPasses;swapBuffers;timeUniforms;constructor(e,t){super();let n=t.resolution,r={uTimeEF:{value:0,type:`1f`}},i=e.createFrameBuffer().setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA16F,format:P.RGBA,magFilter:P.LINEAR,minFilter:P.LINEAR,wrapS:P.CLAMP_TO_EDGE,wrapT:P.CLAMP_TO_EDGE})]),a=[],o=[],s=[],c=0;for(let l=0;l<5;l++){let u=1/2**l,d=n.x*u,f=n.y*u*.5,p=new M(0,c,d,f);c+=f,s.push({rt1:e.createFrameBuffer().setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA16F,format:P.RGBA})]),rt2:e.createFrameBuffer().setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA16F,format:P.RGBA})])});let m=1/4*l,h=new R(e,{renderTarget:s[l].rt1,frag:_n,uniforms:L.merge(r,{uRoughness:{value:m,type:`1f`},uEnvMap:{value:t.input,type:`1i`},uPMREMBackBuffer:{value:s[l].rt2.textures,type:`1i`},uRenderCount:{value:1,type:`1f`}}),defines:{NUM_SAMPLES:Math.floor(2**(l+1))}});h.resize(new M(d,f));let g=new R(e,{renderTarget:i,viewPort:p,passThrough:!0});g.resize(n),a.push(h,g),o.push(h)}this.postprocess=new Zt({passes:a}),this.postprocess.passes[0].backBufferOverride=i.textures,this.resolution=n,this.renderTarget=i,this.pmremPasses=o,this.swapBuffers=s,this.timeUniforms=r}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let e=0;e<this.pmremPasses.length;e++){let t=this.pmremPasses[e],n=this.swapBuffers[e],r=n.rt1;n.rt1=n.rt2,n.rt2=r,t.setRendertarget(n.rt1),t.uniforms.uPMREMBackBuffer.value=n.rt2.textures}}resize(e){}},yn=class{backend;pool;constructor(e){this.backend=e,this.pool=new Map}get(e,t,n){let r=e+t,i=this.pool.get(r);if(i!==void 0&&i.program)return i;let a=this.backend.createProgram();return n&&(a.name=n),a.setShader(e,t),this.pool.set(r,a),a}},bn=`#define PI 3.14159265359\r
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
`,xn=class{entity;mesh;material;color;groundColor;_intensity;constructor(e){this.color=new M(1,1,1),this.groundColor=new M(.3,.3,.3),this._intensity=1,this.material=new Xt({phase:[`deferred`,`envMap`],frag:bn,cullFace:!1,uniforms:{uSkyColor:{value:this.color,type:`3fv`},uGroundColor:{value:this.groundColor,type:`3fv`},uSkyIntensity:{value:this._intensity,type:`1f`}}}),this.entity=e.createEntity({name:`sky`}),this.mesh=this.entity.addComponent(F),this.mesh.geometry=new Rt({radius:500,widthSegments:32,heightSegments:32}),this.mesh.material=this.material}get intensity(){return this._intensity}set intensity(e){this._intensity=e,this.material.uniforms.uSkyIntensity.value=e}},Sn=new Xt,Cn=e=>e.material||Sn,wn=0,Tn=new M(1,1,1,1),En=new M(0,0,0,1),Dn=[],On=[],kn=e=>Dn[e]||(Dn[e]={direction:`directionalLight[${e}].direction`,color:`directionalLight[${e}].color`,camNear:`uDirectionalLightCamera[${e}].near`,camFar:`uDirectionalLightCamera[${e}].far`,camViewMatrix:`uDirectionalLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uDirectionalLightCamera[${e}].projectionMatrix`,camResolution:`uDirectionalLightCamera[${e}].resolution`,shadowMap:`directionalLightShadowMap[${e}]`}),An=e=>On[e]||(On[e]={position:`uSpotLight[${e}].position`,direction:`uSpotLight[${e}].direction`,color:`uSpotLight[${e}].color`,angle:`uSpotLight[${e}].angle`,blend:`uSpotLight[${e}].blend`,distance:`uSpotLight[${e}].distance`,decay:`uSpotLight[${e}].decay`,camNear:`uSpotLightCamera[${e}].near`,camFar:`uSpotLightCamera[${e}].far`,camViewMatrix:`uSpotLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uSpotLightCamera[${e}].projectionMatrix`,camResolution:`uSpotLightCamera[${e}].resolution`,shadowMap:`spotLightShadowMap[${e}]`}),jn=class e extends Mt{backend;canvas;resolution;globalUniforms;_renderTarget;_pipelineConfig;_pipelineOverride;programManager;_geometryBuffers;_lights;_lightsUpdated;_lightInfoCache;_envMapCameras;_envMapRenderTarget;_pmremRender;_deferredRenderer;_pipelinePostProcess;sky;_quad;_isCorrentCompiles;compileDrawParams;_tmpNormalMatrix;_tmpModelViewMatrix;_tmpViewMatrixInverseMatrix;_tmpLightDirection;_tmpModelMatrixInverse;_tmpProjectionMatrixInverse;_tmpResolution;_tmpResolutionUniform;_tmpUniformOverride;_tmpDrawParam;constructor(t,n){super(),this.backend=t,this.canvas=t.canvas,this.globalUniforms={},this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new yn(t),this._geometryBuffers=new Map,this.resolution=new M,this._lights={directional:[],spot:[]},this._lightsUpdated=!1,this._lightInfoCache=new Map;let r=t.createCubeTexture();this._envMapRenderTarget=t.createCubeFrameBuffer().setTexture([r]),this._envMapRenderTarget.setSize(256,256);let i=new M(0,0,0),a=new M(0,-1,0),o=[new N().lookAt(i,new M(1,0,0),a),new N().lookAt(i,new M(0,1,0),new M(0,0,1)),new N().lookAt(i,new M(0,0,1),a),new N().lookAt(i,new M(-1,0,0),a),new N().lookAt(i,new M(0,-1,0),new M(0,0,-1)),new N().lookAt(i,new M(0,0,-1),a)];this._envMapCameras=[];for(let e=0;e<6;e++){let t=n.createEntity({name:`envMapCamera/`+e}),r=t.addComponent(zt);r.fov=90,r.near=.1,r.far=1e3,r.aspect=1,t.applyMatrix(o[e].clone()),r.updateViewMatrix(),r.updateProjectionMatrix(),this._envMapCameras.push({entity:t,camera:r})}this._pmremRender=new vn(t,{input:[r],resolution:new M(256*3,256*4)}),this._deferredRenderer=new on({backend:t,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:r}),this._pipelinePostProcess=new gn(t),this._quad=new Lt({width:2,height:2}),this._tmpLightDirection=new M,this._tmpModelMatrixInverse=new N,this._tmpViewMatrixInverseMatrix=new N,this._tmpProjectionMatrixInverse=new N,this._tmpModelViewMatrix=new N,this._tmpNormalMatrix=new N,this._tmpResolution=new M,this._tmpResolutionUniform={value:this._tmpResolution,type:`2fv`},this._tmpUniformOverride={},this._tmpDrawParam={},this._renderTarget=e.createRenderTarget(t),this.sky=new xn(n),this._pipelineConfig={motionBlur:!0,motionBlurPower:1,ssr:!0,ssao:!0,lightShaft:!0,dof:!0},this._pipelineOverride=null;let s=this.fieldDir(`sky`);s.field(`skyColor`,()=>this.sky.color.getElm(`vec3`),e=>{this.sky.color.set(e[0],e[1],e[2])},{format:{type:`vector`}}),s.field(`groundColor`,()=>this.sky.groundColor.getElm(`vec3`),e=>{this.sky.groundColor.set(e[0],e[1],e[2])},{format:{type:`vector`}}),s.field(`intensity`,()=>this.sky.intensity,e=>{this.sky.intensity=e},{step:.1}),s.field(`reset`,()=>()=>{this.setField(`sky/skyColor`,[1,1,1]),this.setField(`sky/groundColor`,[.3,.3,.3]),this.setField(`sky/intensity`,1)},void 0,{label:`Reset to Default`});let c=this.fieldDir(`pipeline`);[`motionBlur`,`ssr`,`ssao`,`dof`,`lightShaft`].forEach(e=>{let t=c.dir(e);t.field(`enabled`,()=>this._pipelineConfig[e],t=>{this._pipelineConfig[e]=t,this.applyPipelineConfig(this._pipelineConfig)}),e===`motionBlur`&&t.field(`power`,()=>this._pipelineConfig.motionBlurPower,e=>{this._pipelineConfig.motionBlurPower=e,this.applyPipelineConfig(this._pipelineConfig)},{step:.1})})}get renderTarget(){return this._renderTarget}static createRenderTarget(e){let t=e.createFrameBuffer();t.setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA32F,format:P.RGBA,magFilter:P.NEAREST,minFilter:P.NEAREST}),e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA32F,format:P.RGBA}),e.createTexture(),e.createTexture(),e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA32F,format:P.RGBA})]);let n=e.createFrameBuffer({disableDepthBuffer:!0});n.setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA16F,format:P.RGBA}),e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA16F,format:P.RGBA})]);let r=e.createFrameBuffer({disableDepthBuffer:!0});r.setDepthTexture(t.depthTexture),r.setTexture([n.textures[0],t.textures[0],t.textures[4]]);let i=e.createFrameBuffer({disableDepthBuffer:!0});i.setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA16F,format:P.RGBA,magFilter:P.LINEAR,minFilter:P.LINEAR})]);let a=e.createFrameBuffer({disableDepthBuffer:!0});a.setDepthTexture(t.depthTexture),a.setTexture([e.createTexture()]);let o=e.createFrameBuffer();return o.setTexture([e.createTexture().setting({type:P.FLOAT,internalFormat:P.RGBA32F,format:P.RGBA,magFilter:P.NEAREST,minFilter:P.NEAREST})]),{gBuffer:t,shadingBuffer:n,forwardBuffer:r,refractionBuffer:i,uiBuffer:a,normalBuffer:o}}static resizeRenderTarget(e,t){e.gBuffer.setSize(t),e.shadingBuffer.setSize(t),e.forwardBuffer.setSize(t),e.refractionBuffer.setSize(t),e.uiBuffer.setSize(t),e.normalBuffer.setSize(t)}getRenderStack(e){let t={light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]};return this._collectRenderStack(e,!0,t),this._collectRenderStack(this.sky.entity,!0,t),t}_collectRenderStack(e,t,n){let r=t&&e.visible,i=e.getComponent(F);if(i&&r){let t=Cn(i);t.visibilityFlag.deferred&&n.deferred.push(e),t.visibilityFlag.shadowMap&&n.shadowMap.push(e),t.visibilityFlag.forward&&n.forward.push(e),t.visibilityFlag.ui&&n.ui.push(e),t.visibilityFlag.envMap&&n.envMap.push(e)}let a=e.getComponent(Vt);a&&a.enabled&&r&&n.light.push(e);for(let t=0;t<e.children.length;t++)this._collectRenderStack(e.children[t],r,n)}render(e,t,n,r){if(this.resolution.x===0||this.resolution.y===0)return;let i=this.getRenderStack(e),a=[],o={},s=Object.keys(this._lights);for(let e=0;e<s.length;e++){let t=s[e];o[t]=this._lights[t].length,this._lights[t]=[]}for(let e=0;e<i.light.length;e++){let t=i.light[e],n=t.getComponent(Vt);if(n){let e=this.collectLight(t,n);n.castShadow&&e.renderTarget&&a.push(e)}}this._lights.directional.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lights.spot.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lightsUpdated=!1;for(let e=0;e<s.length;e++){let t=s[e];if(o[t]!=this._lights[t].length){this._lightsUpdated=!0;break}}for(let e=0;e<a.length;e++){let t=a[e];this.renderCamera(`shadowMap`,t.component.entity,i.shadowMap,t.renderTarget,this.resolution)}for(let e=0;e<this._envMapCameras.length;e++){let{entity:t}=this._envMapCameras[e];this._envMapRenderTarget.face(e),this.renderCamera(`envMap`,t,i.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap();let c=r||this._renderTarget,l=t.getComponentsByTag(`camera`)[0];if(l){this.backend.setBlendEnabled(!1),this.renderCamera(`deferred`,t,i.deferred,c.gBuffer,this.resolution),this._deferredRenderer.setRenderCamera(l,c),this.renderPostProcess(this._deferredRenderer.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:l.viewMatrix,viewMatrixPrev:l.viewMatrixPrev,projectionMatrix:l.projectionMatrix,projectionMatrixPrev:l.projectionMatrixPrev,cameraMatrixWorld:t.matrixWorld}}),this._deferredRenderer.update(n),this._copyToRefraction(c);let e=i.forward.slice().sort((e,t)=>Cn(e.getComponent(F)).renderOrder-Cn(t.getComponent(F)).renderOrder),r=[],a=null;for(let t of e){let e=Cn(t.getComponent(F)).renderOrder;(a===null||e!==a)&&(r.push([]),a=e),r[r.length-1].push(t)}this.backend.setBlendEnabled(!0);for(let e=0;e<r.length;e++)e>0&&this._copyToRefraction(c),this.renderCamera(`forward`,t,r[e],c.forwardBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:c.refractionBuffer.textures[0],type:`1i`},uDeferredResolution:{value:c.shadingBuffer.size,type:`2fv`},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:`1i`},uGbufferNormal:{value:c.normalBuffer.textures[0],type:`1i`},uGbufferAlbedo:{value:c.gBuffer.textures[2],type:`1i`},uGbufferMaterial:{value:c.gBuffer.textures[3],type:`1i`}},disableClear:!0});this.backend.setBlendEnabled(!1),this._pipelinePostProcess.setRenderCamera(l,c),this.renderPostProcess(this._pipelinePostProcess.postprocess,void 0,this.resolution,{cameraOverride:{viewMatrix:l.viewMatrix,projectionMatrix:l.projectionMatrix,cameraMatrixWorld:t.matrixWorld,cameraNear:l.near,cameraFar:l.far}}),this._pipelinePostProcess.update(n);let o=this._pipelinePostProcess.postprocess.output?this._pipelinePostProcess.postprocess.output:void 0,s=t.getComponent(Yt);if(s){s.resize(this.resolution);for(let e=0;e<s.postProcesses.length;e++){let n=s.postProcesses[e];n.enabled&&n.hasOutput&&(this.renderPostProcess(n,o,this.resolution,{cameraOverride:{viewMatrix:l.viewMatrix,projectionMatrix:l.projectionMatrix,cameraMatrixWorld:t.matrixWorld,cameraNear:l.near,cameraFar:l.far}}),o=n.output||void 0)}}if(o){let e=o.size;this.backend.blit(o,c.uiBuffer,e.x,e.y)}this.backend.setBlendEnabled(!0),this.renderCamera(`forward`,t,i.ui,c.uiBuffer,this.resolution,{uniformOverride:{uDeferredTexture:{value:c.refractionBuffer.textures[0],type:`1i`}},disableClear:!0}),this.backend.setBlendEnabled(!1),this.backend.blit(c.uiBuffer,null,this.resolution.x,this.resolution.y)}}renderCamera(e,t,n,r,i,a){let o=t.getComponentsByTag(`camera`)[0]||t.getComponent(Vt);a||={};let s=this._tmpDrawParam;s.viewMatrix=o.viewMatrix,s.viewMatrixPrev=o.viewMatrixPrev,s.projectionMatrix=o.projectionMatrix,s.projectionMatrixPrev=o.projectionMatrixPrev,s.cameraMatrixWorld=t.matrixWorld,s.cameraNear=o.near,s.cameraFar=o.far,s.renderTarget=r,s.uniformOverride=a.uniformOverride||this._tmpUniformOverride,a.cameraOverride&&Object.assign(s,a.cameraOverride),this.backend.bindRenderTarget(r,o.viewPort,i),r?this._tmpResolution.set(r.size.x,r.size.y):this._tmpResolution.set(i.x,i.y),s.uniformOverride.uResolution=this._tmpResolutionUniform,a.disableClear||this.backend.clear(e==`shadowMap`?Tn:En,1);for(let t=0;t<n.length;t++){let r=n[t],i=r.getComponentsByTag(`materialOverride`)[0],a=r.getComponent(F),c=i&&i.material||Cn(a),l=a.geometry;s.modelMatrixWorld=r.matrixWorld,s.modelMatrixWorldPrev=r.matrixWorldPrev,s.label=`cam[${o.uuid}]/${r.name||c.name||`-`}`,this.draw(r.uuid,e,l,c,s)}}_copyToRefraction(e){let t=e.shadingBuffer.size;this.backend.blit(e.shadingBuffer,e.refractionBuffer,t.x,t.y,!0,!0)}collectLight(e,t){let n=t.lightType,r=this._lightInfoCache.get(t);return r||(r={position:new M,direction:new M,color:new M,renderTarget:null,component:t},this._lightInfoCache.set(t,r)),r.position.set(0,0,0,1).applyMatrix4(e.matrixWorld),r.direction.set(0,1,0,0).applyMatrix4(e.matrixWorld).normalize(),r.color.set(t.color.x,t.color.y,t.color.z).multiply(t.intensity*Math.PI),n==`directional`?this._lights.directional.push(r):n==`spot`&&this._lights.spot.push(r),t.castShadow&&r.renderTarget==null&&(r.renderTarget=this.backend.createFrameBuffer().setTexture([this.backend.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),r.renderTarget.setSize(t.shadowMapSize)),r}renderPostProcess(e,t,n,r){let i=t?t.textures:void 0;if(e.passes)for(let t=0;t<e.passes.length;t++){let a=e.passes[t];if(a.enabled===!1)continue;let o=a.renderTarget;this.backend.bindRenderTarget(o,a.viewPort,n),this.backend.clear(a.clearColor,a.clearDepth);let s=a.backBufferOverride||i||null;if(s)for(let e=0;e<s.length;e++)a.uniforms[`uBackBuffer`+e]={type:`1i`,value:s[e]};let c=r&&r.cameraOverride||{};c.label=a.name,c.renderTarget=o,this.draw(a.uuid,`postprocess`,this._quad,a,c),a.onAfterRender(),!a.passThrough&&a.renderTarget&&(i=a.renderTarget.textures)}}draw(e,t,n,r,i){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:e,renderType:t,geometry:n,material:r,param:{...i}});return}wn=0,this.backend.setMaterialState(r.cullFace,r.depthTest,r.depthWrite);let a=r.programCache[t];if(!a||this._lightsUpdated){let e={...r.defines};t==`deferred`?e.IS_DEFERRED=``:t==`forward`||t==`envMap`?e.IS_FORWARD=``:t==`shadowMap`&&(e.IS_DEPTH=``);let n=St(r.vert,e,this._lights),i=St(r.frag,e,this._lights);a=this.programManager.get(n,i,r.name),r.programCache[t]=a}if(i&&(i.modelMatrixWorld&&(a.setUniform(`uModelMatrix`,`Matrix4fv`,i.modelMatrixWorld.elm),a.setUniform(`uModelMatrixInverse`,`Matrix4fv`,this._tmpModelMatrixInverse.copy(i.modelMatrixWorld).inverse().elm),i.modelMatrixWorldPrev&&a.setUniform(`uModelMatrixPrev`,`Matrix4fv`,i.modelMatrixWorldPrev.elm),i.viewMatrix&&(this._tmpModelViewMatrix.copy(i.modelMatrixWorld).preMultiply(i.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),a.setUniform(`uModelViewMatrix`,`Matrix4fv`,this._tmpModelViewMatrix.elm),a.setUniform(`uNormalMatrix`,`Matrix4fv`,this._tmpNormalMatrix.elm),a.setUniform(`uViewMatrixInverse`,`Matrix4fv`,this._tmpViewMatrixInverseMatrix.copy(i.viewMatrix).inverse().elm))),i.viewMatrix&&(a.setUniform(`uViewMatrix`,`Matrix4fv`,i.viewMatrix.elm),i.viewMatrixPrev&&a.setUniform(`uViewMatrixPrev`,`Matrix4fv`,i.viewMatrixPrev.elm)),i.projectionMatrix&&(a.setUniform(`uProjectionMatrix`,`Matrix4fv`,i.projectionMatrix.elm),a.setUniform(`uProjectionMatrixInverse`,`Matrix4fv`,this._tmpProjectionMatrixInverse.copy(i.projectionMatrix).inverse().elm),i.projectionMatrixPrev&&a.setUniform(`uProjectionMatrixPrev`,`Matrix4fv`,i.projectionMatrixPrev.elm)),i.cameraMatrixWorld&&(a.setUniform(`uCameraMatrix`,`Matrix4fv`,i.cameraMatrixWorld.elm),a.setUniform(`uCameraPosition`,`3f`,[i.cameraMatrixWorld.elm[12],i.cameraMatrixWorld.elm[13],i.cameraMatrixWorld.elm[14]])),t!=`deferred`&&(i.cameraNear&&a.setUniform(`uCameraNear`,`1f`,[i.cameraNear]),i.cameraFar&&a.setUniform(`uCameraFar`,`1f`,[i.cameraFar]))),r.useLight&&t!==`deferred`&&t!==`shadowMap`){for(let e=0;e<this._lights.directional.length;e++){let t=this._lights.directional[e],n=kn(e);if(a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),t.renderTarget){let e=t.renderTarget.textures[0].activate(wn++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}for(let e=0;e<this._lights.spot.length;e++){let t=this._lights.spot[e],n=An(e);if(i&&i.viewMatrix&&this._tmpLightDirection.copy(t.direction).applyMatrix3(i.viewMatrix),a.setUniform(n.position,`3fv`,t.position.getElm(`vec3`)),a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),a.setUniform(n.angle,`1fv`,[Math.cos(t.component.angle/2)]),a.setUniform(n.blend,`1fv`,[t.component.blend]),a.setUniform(n.distance,`1fv`,[t.component.distance]),a.setUniform(n.decay,`1fv`,[t.component.decay]),t.renderTarget){let e=t.renderTarget.textures[0].activate(wn++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}}Fn(a,this.globalUniforms,r.uniforms,i&&i.uniformOverride);let o=a.getVAO(e.toString());if(o){let e=this._getGeometryBuffer(n);e.vaoVersions.get(o)!==n.updateVersion&&(n.attributes.forEach((t,n)=>{let r=e.buffers.get(n);r!==void 0&&(n==`index`?o.setIndex(r):o.setAttribute(n,r,t.size,t.opt))}),e.vaoVersions.set(o,n.updateVersion)),this.backend.draw(a,o,r.drawType,r.blending,void 0)}}_getGeometryBuffer(e){let t=this._geometryBuffers.get(e);if(t||(t={buffers:new Map,vaoVersions:new Map,version:-1},this._geometryBuffers.set(e,t)),t.version!==e.updateVersion){let n=t.buffers;n.forEach(e=>e.dispose()),n.clear(),t.vaoVersions.clear(),e.attributes.forEach((e,t)=>{n.set(t,new pt(this.backend.gl).setData(e.array,t==`index`?`ibo`:`vbo`,e.opt&&e.opt.usage))}),t.version=e.updateVersion}return t}applyPipelineConfig(e){this._pipelineConfig={...this._pipelineConfig,...e},this._applyEffectivePipelineConfig()}setPipelineOverride(e){this._pipelineOverride=e,this._applyEffectivePipelineConfig()}_applyEffectivePipelineConfig(){let e={...this._pipelineConfig,...this._pipelineOverride};this._deferredRenderer.setPassEnabled({ssao:e.ssao,lightShaft:e.lightShaft}),this._pipelinePostProcess.setPassEnabled({motionBlur:e.motionBlur,ssr:e.ssr,dof:e.dof}),this._pipelinePostProcess.setMotionBlurPower(e.motionBlurPower)}get pipelineConfig(){return this._pipelineConfig}resize(t){this.resolution.copy(t),e.resizeRenderTarget(this._renderTarget,t),this._deferredRenderer.resize(this.resolution),this._pipelinePostProcess.resize(this.resolution)}async compileShaders(e,t,n,r){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.render(e,t,n),this._isCorrentCompiles=!1;let i=this.compileDrawParams.length,a=0;for(let e=0;e<this.compileDrawParams.length;e++){let t=this.compileDrawParams[e];if(this.backend.bindRenderTarget(t.param.renderTarget||null),this.draw(t.drawId,t.renderType,t.geometry,t.material,t.param),await new Promise(e=>{setTimeout(()=>{e(null)},10)}),r){a++;let e=t.param&&t.param.label||`-`;r(`${t.renderType}/${e}/[${t.drawId}]`,a,i)}}}createTexProcedural(e){let t={...e.uniforms},n=e.textures||{},r=Object.keys(n);for(let e=0;e<r.length;e++)t[r[e]]={value:n[r[e]],type:`1i`};let i=new Qt(this,{frag:e.frag,resolution:e.resolution,uniforms:t});return e.filter===`nearest`&&(i.setting({magFilter:P.NEAREST,minFilter:P.NEAREST}),i.render()),i}},Mn=e=>new jn(new vt(document.createElement(`canvas`).getContext(`webgl2`,{antialias:!1,preserveDrawingBuffer:!0})),e),Nn=[],Pn=(e,t)=>{e!=null&&(typeof e==`number`||typeof e==`boolean`?Nn.push(e):`isVector`in e?Nn.push(...e.getElm(`vec`+t.charAt(0))):`isTexture`in e?(e.activate(wn++),Nn.push(e.unit)):Nn.push(...e.elm))},Fn=(e,...t)=>{for(let n=0;n<t.length;n++){let r=t[n];if(!r)continue;let i=Object.keys(r);for(let t=0;t<i.length;t++){let n=i[t],a=r[n];if(!a)continue;let o=a.type,s=a.value;if(Nn.length=0,Array.isArray(s))for(let e=0;e<s.length;e++)Pn(s[e],o);else Pn(s,o);Nn.length>0&&e.setUniform(n,o,Nn)}}},In=class extends Zt{_passes;date;constructor(e){super({...e}),this._passes=e.passes,this.date=new Date}get passes(){return this._passes}compute(e){let t=Math.min(1/60,(new Date().getTime()-this.date.getTime())/1e3);this.date=new Date,this.passes.forEach(e=>{e.uniforms.uDeltaTime.value=t}),e.renderPostProcess(this)}},Ln=class extends R{size;layerCnt;clearColor;rt1;rt2;outputUniforms;constructor(e,t){let n=Object.assign({type:P.FLOAT,internalFormat:P.RGBA32F,format:P.RGBA,magFilter:P.NEAREST,minFilter:P.NEAREST},t.textureParam),r=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),i=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),a={uGPUResolution:{value:t.size,type:`2fv`}};for(let e=0;e<t.dataLayerCount;e++)a[`uGPUSampler`+e]={value:i.textures[e],type:`1i`};super(e,{...t,vert:t.vert||`layout ( location = 0 ) in vec3 position;\r
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
}`,renderTarget:r,uniforms:L.merge(t.uniforms,a,{uDeltaTime:{value:0,type:`1f`}})}),this.size=t.size,this.layerCnt=t.dataLayerCount,this.rt1=r,this.rt2=i,this.renderTarget=this.rt1,this.clearColor=t.clearColor??null,this.outputUniforms=a}onAfterRender(){super.onAfterRender();for(let e=0;e<this.layerCnt;e++)this.outputUniforms[`uGPUSampler`+e].value=this.renderTarget.textures[e];let e=this.rt1;this.rt1=this.rt2,this.rt2=e,this.renderTarget=this.rt1}initTexture(e){for(let t=0;t<this.layerCnt;t++){let n=[];for(let r=0;r<this.size.y;r++)for(let i=0;i<this.size.x;i++){let a=i,o=r;n.push(...e(t,a,o))}this.rt2.textures[t].subImage(new Float32Array(n),this.size.x,this.size.y)}}},Rn=`#define PI 3.14159265359\r
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
`,zn=`#define PI 3.14159265359\r
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
`,Bn=`#define PI 3.14159265359\r
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
`,Vn=`#define PI 3.14159265359\r
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
`,Un=`uniform sampler2D uBackBuffer0;
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
`,Wn=`//[
precision highp float;
//]

in vec2 vUv;
uniform sampler2D uSrcTexture;
out vec4 fragColor;

void main() {
	fragColor = vec4( texture( uSrcTexture, vUv ).rgb, 1.0 );
}
`,Gn=class{isEditorFrame=!0;texture;textarget;constructor(e,t){this.texture=e,this.textarget=t}},Kn=class extends Gn{isEditorTarget=!0;frameBuffer;autoResize;constructor(e,t){super(e.textures[0],P.TEXTURE_2D),this.frameBuffer=e,this.autoResize=t}},qn=class{isEditorRecipe=!0;postprocess;pass;constructor(e,t){this.pass=t,this.postprocess=new Zt({name:e,passes:[t]})}},Jn=class{_renderer;_gl;_targets;_recipes;_readFrameBuffer;_fullscreenBuffer;_texturePass;_texturePostProcess;constructor(e){this._renderer=e,this._gl=e.backend.gl,this._targets=[],this._recipes=[],this._readFrameBuffer=new ht(this._gl,{disableDepthBuffer:!0}),this._fullscreenBuffer=new ht(this._gl,{disableDepthBuffer:!0}).setTexture([new mt(this._gl).setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]),this._fullscreenBuffer.setSize(e.resolution),this._texturePass=new R(e.backend,{frag:Wn,renderTarget:null}),this._texturePostProcess=new Zt({name:`editorTexture`,passes:[this._texturePass]})}renderEntities(e){let t=this._renderer,n=e.target?e.target.frameBuffer:t.renderTarget.uiBuffer,r=e.materialOverride,i=[];if(r)for(let t=0;t<e.entities.length;t++){let n=e.entities[t].getComponent(F);i.push(n?n.material:null),n&&(n.material=r)}if(e.depthCompare===`lequal`&&this._gl.depthFunc(P.LEQUAL),t.renderCamera(`forward`,e.camera,e.entities,n,t.resolution,{disableClear:e.target===null}),e.depthCompare===`lequal`&&this._gl.depthFunc(P.LESS),r)for(let t=0;t<e.entities.length;t++){let n=e.entities[t].getComponent(F);n&&(n.material=i[t])}}renderFullscreen(e,t){let n=e,r=this._renderer;if(t){let e=t.frameBuffer;n.pass.renderTarget=e,r.renderPostProcess(n.postprocess,void 0,e.size);return}let i=r.renderTarget.uiBuffer,a=r.resolution;n.pass.renderTarget=this._fullscreenBuffer,r.renderPostProcess(n.postprocess,i,a),r.backend.blit(this._fullscreenBuffer,i,a.x,a.y)}blit(e,t,n){let r=this._gl,i=e,a=t?t.frameBuffer:this._renderer.renderTarget.uiBuffer,o=a.size,s=n||{x:0,y:0,width:o.x,height:o.y};this._readFrameBuffer.setSize(i.texture.size),r.bindFramebuffer(r.FRAMEBUFFER,this._readFrameBuffer.getFrameBuffer()),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,i.textarget,i.texture.getTexture(),0),r.bindFramebuffer(r.READ_FRAMEBUFFER,this._readFrameBuffer.getFrameBuffer()),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,a.getFrameBuffer()),r.blitFramebuffer(0,0,i.texture.size.x,i.texture.size.y,s.x,o.y-s.y-s.height,s.x+s.width,o.y-s.y,r.COLOR_BUFFER_BIT,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null)}drawTexture(e,t){let n=t.frameBuffer;this._texturePass.uniforms.uSrcTexture={value:e,type:`1i`},this._texturePass.renderTarget=n,this._renderer.renderPostProcess(this._texturePostProcess,void 0,n.size)}async readPixels(e){let t=this._gl,n=e.frameBuffer,r=n.size,i=new Uint8Array(r.x*r.y*4);return t.bindFramebuffer(t.FRAMEBUFFER,n.getFrameBuffer()),t.readPixels(0,0,r.x,r.y,t.RGBA,t.UNSIGNED_BYTE,i),t.bindFramebuffer(t.FRAMEBUFFER,null),i}present(){let e=this._renderer.resolution;e.x===0||e.y===0||this._renderer.backend.blit(this._renderer.renderTarget.uiBuffer,null,e.x,e.y)}createTarget(e){let t=new ht(this._gl,{disableDepthBuffer:!0}).setTexture([new mt(this._gl).setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]);e&&e.useSceneDepth&&t.setDepthTexture(this._renderer.renderTarget.gBuffer.depthTexture),t.setSize(e&&e.size||this._renderer.resolution);let n=new Kn(t,!(e&&e.size));return this._targets.push(n),n}resize(e){this._fullscreenBuffer.setSize(e);for(let t=0;t<this._targets.length;t++){let n=this._targets[t];n.autoResize&&n.frameBuffer.setSize(e)}for(let t=0;t<this._recipes.length;t++)this._recipes[t].postprocess.resize(e)}onDrawPass(e){this._renderer.on(`drawPass`,(t,n)=>{if(!t)return;let r=t.textures,i=`currentFace`in t?t.currentFace:P.TEXTURE_2D;for(let t=0;t<r.length;t++){let a=n?n+(r.length>1?`_`+t:``):``;e(new Gn(r[t],i),a)}})}materials={flat:e=>new Xt({vert:zn,frag:Rn,phase:[`forward`],drawType:e.lines?`LINES`:`TRIANGLES`,depthTest:e.depthTest??!0,depthWrite:e.depthWrite??!0,uniforms:{uColor:{value:e.color,type:`3fv`}}}),mask:()=>new Xt({vert:Hn,frag:Vn,phase:[`forward`],depthTest:!1}),grid:e=>new Xt({vert:zn,frag:Bn,phase:[`forward`],depthWrite:!1,uniforms:{uColor:{value:e.color,type:`3fv`},uParams:{value:e.params,type:`3fv`}}})};recipes={outline:(e,t)=>{let n=new qn(`editorOutline`,new R(this._renderer.backend,{frag:Un,renderTarget:null,uniforms:{uMaskTexture:{value:e.texture,type:`1i`},uOutlineColor:{value:new M(t[0],t[1],t[2]),type:`3fv`}}}));return this._recipes.push(n),n}}},Yn=e=>new Jn(e.renderer),Xn=`#define PI 3.14159265359\r
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
} `,Zn=`#define PI 3.14159265359\r
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
}`,Qn=12,$n=8,er=e=>{switch(e){case`VEC2`:return 2;case`VEC3`:return 3;case`VEC4`:return 4;case`SCALAR`:return 1;default:return 1}},tr=e=>{switch(e){case`TEXCOORD_0`:return`uv`;default:return e.toLowerCase()}},nr=class extends Ct{_engine;constructor(e){super(),this._engine=e}get backend(){return this._engine.renderer.backend}async load(e){let t=await(await fetch(e)).arrayBuffer(),n=new TextDecoder,r=n.decode(new Uint8Array(t,0,4)),i=new Map,a=null;if(r==`glTF`){let e=new DataView(t),r=Qn,o={length:e.getUint32(r,!0),type:e.getUint32(16,!0)};if(o.type==1313821514&&(a=JSON.parse(n.decode(new Uint8Array(t,20,o.length)))),t.byteLength>$n+o.length+Qn){let n=20+o.length,r={length:e.getUint32(n,!0),type:e.getUint32(n+4,!0)};if(r.type==5130562){let e=n+$n,a=t.slice(e,e+r.length);i.set(0,a)}}}else a=JSON.parse(n.decode(new Uint8Array(t)));if(!a)throw Error(``);let o=a,s=e=>{let t=i.get(e.buffer);return t?t.slice(e.byteOffset,e.byteOffset+e.byteLength):null},c=new Map;a.accessors&&a.accessors.forEach((e,t)=>{let{type:n}=e;if(!o.bufferViews)return;let r=o.bufferViews[e.bufferView],i=s(r);i&&c.set(t,{type:n,buffer:i})});let l=new Map,u=(o.images||[]).map((e,t)=>new Promise(n=>{if(e.bufferView!==void 0){if(!o.bufferViews)return;let r=o.bufferViews[e.bufferView],i=s(r);if(i){let r=new Blob([new Uint8Array(i)],{type:e.mimeType}),a=new Image;a.onload=()=>{n(e)},a.src=URL.createObjectURL(r),l.set(t,a)}}}));await Promise.all(u);let d=new Map,f=e=>{if(!o.textures)return null;let t=o.textures[e];if(t){let e=this.backend.createTexture(),n=l.get(t.source);if(n)return e.attach(n,!0),e}return null};o.materials&&o.materials.forEach((e,t)=>{let n=new Xt({frag:Xn,vert:Zn});if(e.normalTexture){let t=f(e.normalTexture.index);t&&(n.uniforms.uNormalMap={value:t,type:`1i`},n.defines.USE_NORMAL_MAP=``)}if(e.pbrMetallicRoughness){let t=e.pbrMetallicRoughness;if(t.baseColorFactor&&(n.uniforms.uBaseColor={value:t.baseColorFactor,type:`4fv`},n.defines.USE_COLOR=``),t.baseColorTexture){let e=f(t.baseColorTexture.index);e&&(n.uniforms.uBaseColorMap={value:e,type:`1i`},n.defines.USE_COLOR_MAP=``)}if(t.roughnessFactor!==void 0&&(n.uniforms.uRoughness={value:t.roughnessFactor,type:`1f`},n.defines.USE_ROUGHNESS=``),t.metallicFactor!==void 0&&(n.uniforms.uMetalness={value:t.metallicFactor,type:`1f`},n.defines.USE_METALNESS=``),t.metallicRoughnessTexture){let e=f(t.metallicRoughnessTexture.index);e&&(n.uniforms.uMRMap={value:e,type:`1i`},n.defines.USE_MR_MAP=``)}}if(e.emissiveFactor&&(n.uniforms.uEmission={value:e.emissiveFactor,type:`3fv`},n.defines.USE_EMISSION=``),e.emissiveTexture){let t=f(e.emissiveTexture.index);t&&(n.uniforms.uEmissionMap={value:t,type:`1i`},n.defines.USE_EMISSION_MAP=``)}e.extensions&&e.extensions.KHR_materials_emissive_strength&&(n.uniforms.uEmissionStrength={value:e.extensions.KHR_materials_emissive_strength.emissiveStrength,type:`1fv`},n.defines.USE_EMISSION_STRENGTH=``),d.set(t,n)});let p=new Map;o.meshes&&o.meshes.forEach((e,t)=>{let{primitives:n}=e;p.set(t,n.map(e=>{let t=new Pt;if(Object.keys(e.attributes).forEach(n=>{let r=e.attributes[n],i=c.get(r);i&&t.setAttribute(tr(n),new Float32Array(i.buffer),er(i.type))}),e.indices!==void 0){let n=c.get(e.indices);n&&t.setAttribute(`index`,new Uint16Array(n.buffer),1)}let n=null;if(e.material!==void 0){let t=d.get(e.material);t&&(n=t)}return n||=new Xt,t.attributes.has(`tangent`)&&(n.defines.USE_TANGENT=``),{geometry:t,material:n}}))});let m=new Map,h=((e,t)=>{let n=this._engine.createEntity();t.translation&&n.position.set(t.translation[0],t.translation[1],t.translation[2]),t.rotation&&n.quaternion.set(t.rotation[0],t.rotation[1],t.rotation[2],t.rotation[3]),t.scale&&n.scale.set(t.scale[0],t.scale[1],t.scale[2]);let r=p.get(t.mesh);if(n.name=t.name,r)if(r.length==1){let e=r[0],t=n.addComponent(F);t.geometry=e.geometry,t.material=e.material}else r.forEach((e,r)=>{let i=this._engine.createEntity();i.name=t.name+`_`+r;let a=i.addComponent(F);a.geometry=e.geometry,a.material=e.material,n.add(i)});return t.children&&t.children.forEach(e=>{let t=m.get(e);t?n.add(t):o.nodes&&n.add(h(e,o.nodes[e]))}),m.set(e,n),n});o.nodes&&o.nodes.forEach((e,t)=>{h(t,e)});let g=this._engine.createEntity(),_=o.scenes&&o.scenes[0];return _&&_.nodes&&_.nodes.forEach(e=>{let t=m.get(e);t&&g.add(t)}),{scene:g}}},rr=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

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
  
}`,ir=`uniform sampler2D uSrcTexture1;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uSrcTexture1, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`,ar=`#define PI 3.14159265359\r
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

}`,or=class extends Zt{constructor(e,t){let n=[],r=[];for(let t=0;t<4;t++)n.push(e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})])),r.push(e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:P.LINEAR,minFilter:P.LINEAR})]));let i=2,a=new R(e,{name:`bloom/bright/`,frag:ir,passThrough:!0,uniforms:{uSrcTexture1:{value:t,type:`1i`},uThreshold:{value:1.8,type:`1f`},uBrightness:{value:1,type:`1f`}},resolutionRatio:1/i}),o=[],s=a.renderTarget.textures;for(let t=0;t<4;t++){let a=n[t],c=r[t],l={name:`bloom/blur/`+t+`/v`,renderTarget:a,frag:rr,uniforms:{uBackBlurTex:{value:s,type:`1i`},uIsVertical:{type:`1i`,value:!0},uWeights:{type:`1fv`,value:lt.gaussWeights(8)},uBlurRange:{value:2,type:`1f`}},defines:{GAUSS_WEIGHTS:`8`,USE_BACKBLURTEX:``},passThrough:!0,resolutionRatio:1/i};o.push(new R(e,l)),o.push(new R(e,{...l,name:`bloom/blur/`+t+`/h`,renderTarget:c,uniforms:{...l.uniforms,uBackBlurTex:{value:a.textures[0],type:`1i`},uIsVertical:{type:`1i`,value:!1}}})),s=c.textures,i*=2}let c=new R(e,{name:`bloom/composite/`,frag:ar,uniforms:{uBloomTexture:{value:r.map(e=>e.textures[0]),type:`1iv`}}});super({name:`Bloom`,passes:[a,...o,c]})}get threshold(){return this.passes[0].uniforms.uThreshold.value}set threshold(e){this.passes[0].uniforms.uThreshold.value=e}get brightness(){return this.passes[0].uniforms.uBrightness.value}set brightness(e){this.passes[0].uniforms.uBrightness.value=e}},sr=`#define PI 3.14159265359\r
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
}`,cr=class extends Zt{constructor(e){super({name:`ColorGrading`,passes:[new R(e,{frag:sr})]})}},lr=`#define PI 3.14159265359\r
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
}`,ur=class extends Zt{constructor(e){super({name:`Finalize`,passes:[new R(e,{frag:lr})]})}},dr=`uniform sampler2D uBackBuffer0;\r
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
}`,fr=class extends Zt{constructor(e){super({name:`FXAA`,passes:[new R(e,{name:`fxaa`,frag:dr})]})}},pr=(e,t)=>{let n=t.addComponent(Yt),r=e.renderer,i=r.backend,a=new or(i,r.renderTarget.shadingBuffer.textures[0]);return a.threshold=1,a.brightness=1,n.add(new fr(i)),n.add(a),n.add(new cr(i)),n.add(new ur(i)),()=>{t.removeComponent(Yt)}},mr=class{static serializeEntity(e,t){let n=e=>{let r=[];e.children.forEach(e=>{e.initiator!=`script`&&r.push(n(e))});let i=[];e.components.forEach(e=>{let n=e.serialize({mode:`export`}),r=Object.keys(n).length>0;if(e.initiator!==`user`)return;let a={name:t.getName(e),uuid:e.uuid};r&&(a.props=n),i.push(a)});for(let t of e.unresolvedComponents)i.push({name:t.name,uuid:t.uuid,props:t.props});return{name:e.name,uuid:e.uuid,pos:e.position.x==0&&e.position.y==0&&e.position.z==0?void 0:e.position.getElm(`vec3`),rot:e.euler.x==0&&e.euler.y==0&&e.euler.z==0?void 0:e.euler.getElm(`vec3`),scale:e.scale.x==1&&e.scale.y==1&&e.scale.z==1?void 0:e.scale.getElm(`vec3`),components:i.length>0?i:void 0,childs:r.length>0?r:void 0}};return n(e)}static deserializeEntity(e,t,n,r){let i=(e,t)=>{let a=t||r.createEntity();a.initiator=`user`,a.name=e.name,a.restoreUUID(e.uuid);let o=e.pos||[0,0,0];a.position.x=o[0],a.position.y=o[1],a.position.z=o[2];let s=e.rot||[0,0,0];a.euler.x=s[0],a.euler.y=s[1],a.euler.z=s[2];let c=e.scale||[1,1,1];return a.scale.x=c[0],a.scale.y=c[1],a.scale.z=c[2],a.unresolvedComponents=[],e.components&&e.components.forEach(e=>{let t=n.resolve(e.name);if(t){let n=a.getComponent(t.component);n||(n=a.addComponent(t.component),n.initiator=`user`),n.restoreUUID(e.uuid),e.props&&n.deserialize(e.props)}else console.warn(`[ProjectSerializer] Component "${e.name}" not found in resolver. Preserving data for round-trip.`),a.unresolvedComponents.push({name:e.name,uuid:e.uuid,props:e.props})}),e.childs&&([...a.children].forEach(e=>{e.initiator!==`script`&&a.remove(e)}),e.childs.forEach(e=>{a.add(i(e))})),a};e&&i(e,t),t.initiator=`god`}},hr=class extends Mt{name;_frag;_resolution;_filter;_updateEveryFrame;_textures;constructor(e,t){super(),this.name=e;let n=t.data;this._frag=n?.frag||``,this._resolution=n?.resolution||[1024,1024],this._filter=n?.filter||`linear`,this._updateEveryFrame=n?.updateEveryFrame??!1,this._textures=n?.textures||{}}get frag(){return this._frag}get resolution(){return this._resolution}get filter(){return this._filter}get updateEveryFrame(){return this._updateEveryFrame}get textures(){return this._textures}},gr=(e,t)=>{let n={},r=`/${t}/`;for(let[t,i]of Object.entries(e)){let e=t.slice(t.lastIndexOf(r)+r.length).split(`/`).slice(0,-2),a=Object.entries(i).find(([e,t])=>typeof t==`function`&&/^[A-Z]/.test(e));if(!a)continue;let o=n;for(let t of e)o=o[t]=o[t]||{};o[a[0]]=a[1]}return n},_r=class extends Ct{_componentList;_componentGroups;_geometryList;_geometryGroups;_textureResources;_textures;_updateEveryFrameTextures;constructor(){super(),this._componentList=[],this._textures=new Map,this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources=new Map,this._updateEveryFrameTextures=[]}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get geometryList(){return this._geometryList}get geometryGroups(){return this._geometryGroups}get textureList(){return Array.from(this._textureResources.values())}get textures(){return this._textures}get updateEveryFrameTextures(){return this._updateEveryFrameTextures}clear(){this._componentList=[],this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources.clear(),this._textures.clear(),this._updateEveryFrameTextures=[],this.emit(`update`)}getComponent(e){return this._componentList.find(t=>t.name==e)}addComponentGroup(e){let t=this._componentGroups.find(t=>t.name==e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addComponent:(e,n)=>{let r={name:e,component:n};t.push(r),this._componentList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._componentGroups.push(t),this.emit(`update`),t}getGeometry(e){return this._geometryList.find(t=>t.name===e)}addGeometryGroup(e){let t=this._geometryGroups.find(t=>t.name===e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addGeometry:(e,n)=>{let r={name:e,geometryClass:n};t.push(r),this._geometryList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._geometryGroups.push(t),this.emit(`update`),t}addTextureResource(e,t){let n=new hr(e,{data:t});this._textureResources.set(e,n),this.emit(`update`)}getTextureResource(e){return this._textureResources.get(e)}removeTextureResource(e){this._textureResources.delete(e);let t=this._textures.get(e);t&&(t.dispose(),this._textures.delete(e)),this.emit(`update`)}addTexture(e,t){return this._textures.set(e,t),t}getTexture(e){return this._textures.get(e)}_buildTexture(e,t,n,r){let i=e.frag;return i?t.createTexProcedural({name:e.name,frag:i,resolution:new M(e.resolution[0]||1024,e.resolution[1]||1024),filter:e.filter,textures:n,uniforms:e.updateEveryFrame?r:void 0}):null}_ensureTexture(e,t,n,r){let i=this._textures.get(e.name);if(i)return i;if(r.has(e.name))return null;r.add(e.name);let a={},o=e.textures,s=Object.keys(o);for(let e=0;e<s.length;e++){let i=s[e],c=o[i],l=this._textureResources.get(c),u=l?this._ensureTexture(l,t,n,r):this._textures.get(c);u&&(a[i]=u)}let c=this._buildTexture(e,t,a,n);return c?(this._textures.set(e.name,c),e.updateEveryFrame&&this._updateEveryFrameTextures.push(c),c):null}buildTextureInstances(e,t){this._updateEveryFrameTextures=[];let n=new Set;this._textureResources.forEach(r=>{this._ensureTexture(r,e,t,n)}),this.emit(`update`)}},vr=class e extends Mt{static resources;name;enableRender;_renderer;_root;_uniforms;_time;_frame;_frameSetting;_disposed;_cameraEntity;constructor(e){super(),this.name=`OREngine`,this._disposed=!1,this._uniforms={uEnvMapIntensity:{value:1,type:`1f`}},this._renderer=e(this),this._renderer.globalUniforms={uTime:{value:0,type:`1f`},uTimeF:{value:0,type:`1f`},uTimeE:{value:0,type:`1f`},uTimeEF:{value:0,type:`1f`},uDeltaTime:{value:0,type:`1f`},uResolution:{value:new M,type:`2fv`},uAspectRatio:{value:1,type:`1f`}},this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={duration:600,fps:30},this._frame={current:0,playing:!1},this.seek(0),this.enableRender=!0,this._cameraEntity=null,this._root=this.createEntity({name:`root`}),this._root.initiator=`god`,this.field(`name`,()=>this.name,e=>this.name=e),this.field(`scene`,()=>mr.serializeEntity(this._root,this._createComponentResolver()),e=>{mr.deserializeEntity(e,this._root,this._createComponentResolver(),this)}),this.field(`renderer`,()=>this._renderer.serialize({mode:`export`}),e=>this._renderer.deserialize(e));let t=this.fieldDir(`timeline`);t.field(`duration`,()=>this._frameSetting.duration,e=>this._frameSetting.duration=e),t.field(`fps`,()=>this._frameSetting.fps,e=>this._frameSetting.fps=e)}createEntity(e){return new Wt({engine:this,...e})}get canvas(){return this._renderer.canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get uniforms(){return this._uniforms}get disposed(){return this._disposed}set cameraEntity(e){this._cameraEntity=e}get cameraEntity(){return this._cameraEntity}resolveCameraEntity(){return this._cameraEntity||this.findSceneCameraEntity()}_createComponentResolver(){return{resolve:t=>e.resources.getComponent(t),getName:t=>{let n=e.resources.componentList.find(e=>t instanceof e.component);return n?n.name:t.constructor.name}}}init(){this._root.disposeRecursive(),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.name=`New Project`}async load(e){this.init(),this.deserialize(e),this.emit(`update/graph`),this.emit(`loaded`)}update(t){let n=new Date().getTime();this._time.delta=(n-this._time.current)/1e3,this._time.current=n,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*+!!this._frame.playing,this._frame.current=this._time.code*60;let r=this.createEntityUpdateEvent({forceDraw:t?.forceDraw});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1,this._renderer.globalUniforms.uDeltaTime.value=Math.min(this._time.delta,1/60);let i=e.resources.updateEveryFrameTextures;for(let e=0;e<i.length;e++)i[e].render();if(this._root.update(r),this._root.postUpdate(r),this._root.updateMatrixRecursive(),this._root.prepareRender(r),this.enableRender){let e=this.resolveCameraEntity();e&&this._renderer.render(this._root,e,r)}return this._root.commitFrame(r),this._frame.playing&&this.emit(`update/frame/play`,[this._frame]),this._time.delta}createEntityUpdateEvent(e){let t={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return e?{...t,...e}:t}setSize(e){this._renderer.resize(e),this._renderer.canvas.width=e.x,this._renderer.canvas.height=e.y,this._renderer.globalUniforms.uResolution.value.copy(e),this._renderer.globalUniforms.uAspectRatio.value=e.x/Math.max(e.y,1)}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(e){this._time.code=e/60,this._frame.current=e,this.emit(`update/frame/play`,[this._frame])}updateOffline(t,n){let r=t/n,i=1/n;this._time.delta=i,this._time.current=new Date().getTime(),this._time.engine+=i,this._time.code=r,this._frame.current=r*60,this._frame.playing=!0;let a=this.createEntityUpdateEvent({forceDraw:!0});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1;let o=e.resources.updateEveryFrameTextures;for(let e=0;e<o.length;e++)o[e].render();if(this._root.update(a),this._root.postUpdate(a),this._root.updateMatrixRecursive(),this._root.prepareRender(a),this.enableRender){let e=this.resolveCameraEntity();e&&this._renderer.render(this._root,e,a)}this._root.commitFrame(a)}compileShaders(e){let t=this.createEntityUpdateEvent({forceDraw:!0}),n=this.resolveCameraEntity();return n?this.renderer.compileShaders(this._root,n,t,e):Promise.resolve()}findSceneCameraEntity(){let e=null;return this._root.traverse(t=>{if(e)return;let n=t.getComponentsByTag(`camera`);for(let r=0;r<n.length;r++)if(n[r].displayOut){e=t;return}}),e}dispose(){this._disposed=!0,this._root.disposeRecursive()}};vr.resources=new _r;var yr=class extends Ct{_pressedKeys;constructor(){super(),this._pressedKeys={};let e=this._onKeyDown.bind(this),t=this._onKeyUp.bind(this);window.addEventListener(`keydown`,e),window.addEventListener(`keyup`,t),this.once(`dispose`,()=>{window.removeEventListener(`keydown`,e),window.removeEventListener(`keyup`,t)})}get pressedKeys(){return this._pressedKeys}_onKeyDown(e){this._pressedKeys[e.key]=!0,this.emit(`keydown`,[e,this._pressedKeys])}_onKeyUp(e){if(this._pressedKeys[e.key]=!1,e.key==`Meta`||e.key==`Control`){let e=Object.keys(this._pressedKeys);for(let t=0;t<e.length;t++)this._pressedKeys[e[t]]=!1}this.emit(`keyup`,[e,this._pressedKeys])}dispose(){this.emit(`dispose`)}},br=class extends Ct{_isTouching;element=null;position;delta;constructor(){super(),this.position=new M(NaN,NaN),this.delta=new M(NaN,NaN),this._isTouching=!1;let e=this._onPointer.bind(this,`move`),t=this._onPointer.bind(this,`end`);window.addEventListener(`pointermove`,e),window.addEventListener(`pointerup`,t),window.addEventListener(`dragend`,t);let n=()=>{this.element&&this.removeElement(this.element),window.removeEventListener(`pointermove`,e),window.removeEventListener(`pointerup`,t),window.removeEventListener(`dragend`,t),this.off(`dispose`,n)};this.on(`dispose`,n)}setElement(e){this.element&&this.removeElement(this.element),this.element=e;let t=this._onPointer.bind(this,`start`);e.addEventListener(`pointerdown`,t);let n=r=>{e.isEqualNode(r.elm)&&(e.removeEventListener(`pointerdown`,t),this.off(`unregister`,n))};this.on(`unregister`,n)}removeElement(e){this.emit(`unregister`,[e])}getScreenPosition(e){if(this.position.x!=this.position.x)return new M(NaN,NaN);let t=this.position.clone().divide(e).multiply(2).sub(1);return t.y*=-1,t}getRelativePosition(e,t){let n=e.getClientRects()[0],r=this.position.x-n.left,i=this.position.y-n.top;return t&&(r/=n.width,i/=n.height),new M(r,i)}_setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}_onPointer(e,t){let n=t.pointerType;(n==null||n==`mouse`&&(t.button==-1||t.button==0)||n==`touch`)&&this._touchEventHandler(t.pageX,t.pageY,e,t)}_touchEventHandler(e,t,n,r){let i=!1,a=e-window.pageXOffset,o=t-window.pageYOffset;n==`start`?(this._isTouching=!0,this._setPos(a,o),this.delta.set(0,0),i=!0):n==`move`?(this._setPos(a,o),this._isTouching&&(i=!0)):n==`end`&&(`targetTouches`in r?r.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,i=!0),i&&this.emit(n,[{pointerEvent:r,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit(`dispose`)}},xr=(0,y.createContext)(null),Sr=()=>{let e=(0,y.useContext)(xr);if(e===null)throw Error(`useMouseMenu must be used within a MouseMenuProvider`);return e},Cr=(0,y.createContext)(void 0),wr=()=>(0,y.useContext)(Cr),Tr={compoAdd:`ComponentAdd__compoAdd___LmNvb`,directory:`ComponentAdd__directory___LmNvb`,subDirectory:`ComponentAdd__subDirectory___LmNvb`,picker:`ComponentAdd__picker___LmNvb`},Er=({group:e,onClickAdd:t})=>{let n=wr(),[r,i]=(0,y.useState)(!1),a=null,o,s=`dir`,c=e.name.startsWith(`_`)?e.name.slice(1):e.name;`child`in e?a=(0,E.jsx)(E.Fragment,{children:e.child.map((e,n)=>(0,E.jsx)(Er,{group:e,onClickAdd:t},n))}):(o=()=>t(e),s=`item`);let l=window.matchMedia(`(hover: hover)`).matches;return(0,E.jsxs)(`div`,{className:Tr.directory,onPointerEnter:l?()=>i(!0):void 0,onPointerLeave:l?()=>i(!1):void 0,onClick:e=>{o?o():(e.stopPropagation(),i(!r))},"data-type":s,"data-direction":n?.direction,children:[c,r&&(0,E.jsx)(`div`,{className:Tr.subDirectory,children:a})]})},Dr=e=>{let{editor:t}=Le(),{pushContent:n,closeAll:r}=Sr(),i=vr.resources,a=(0,y.useCallback)(a=>{if(!i||!n||!r)return;let o=[],s=n=>{t.api.addComponent(e.entity,n.component),r()};i.componentGroups.forEach((e,t)=>{o.push((0,E.jsx)(Er,{group:e,onClickAdd:s},t))}),n((0,E.jsx)(`div`,{className:Tr.picker,children:o}))},[n,i,e.entity,r,t]);return(0,E.jsx)(`div`,{className:Tr.compAdd,children:(0,E.jsx)(me,{onClick:a,children:`Add Component`})})},Or={cross:`CrossIcon__cross___LmNyb`},kr=()=>(0,E.jsx)(`div`,{className:Or.cross,children:(0,E.jsxs)(`svg`,{viewBox:`0 0 20 20`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{x:`5.12`,y:`16.832`,width:`2.57272`,height:`17.6514`,transform:`rotate(-135 5.12 16.832)`,fill:`#D9D9D9`}),(0,E.jsx)(`rect`,{x:`3.30078`,y:`4.35059`,width:`2.57272`,height:`17.6514`,transform:`rotate(-45 3.30078 4.35059)`,fill:`#D9D9D9`})]})}),Ar={compoView:`ComponentView__compoView___LmNvb`,head:`ComponentView__head___LmNvb`,name:`ComponentView__name___LmNvb`,check:`ComponentView__check___LmNvb`,delete:`ComponentView__delete___LmNvb`,propertyBlock:`ComponentView__propertyBlock___LmNvb`},jr=e=>{let t=Object.keys(e.childs);for(let n=0;n<t.length;n++){let r=e.childs[t[n]],{opt:i}=r,a=!1;if(i&&(a=typeof i.hidden==`function`?i.hidden(r.type===`value`?r.value:null):i.hidden||!1),!a&&(r.type===`value`||jr(r)))return!0}return!1},Mr=({component:e})=>{let{editor:t}=Le(),[n,r]=j(e,`enabled`),i=e.initiator!==`user`,a=jr(e.serializeToDirectory()),o=(0,y.useCallback)(n=>{n.stopPropagation();let r=e.entity;if(r){for(let[n,i]of r.components)if(i.uuid===e.uuid){t.api.removeComponent(r,n,e);break}}},[e,t]),s=(0,E.jsxs)(`div`,{className:Ar.head,children:[(0,E.jsx)(`div`,{className:Ar.name,children:e.constructor.name}),(0,E.jsx)(`div`,{className:Ar.delete,children:(0,E.jsx)(`button`,{onClick:o,children:(0,E.jsx)(kr,{})})})]});return(0,E.jsx)(`div`,{className:Ar.compoView,"data-disable_component":i,children:(0,E.jsx)(`div`,{className:Ar.content,children:(0,E.jsx)(ue,{label:s,accordion:a,bg:!0,defaultClose:!1,children:a&&(0,E.jsx)(ot,{target:e})})})})},Nr={container:`ComponentList__container___LmNvb`},Pr=({entity:e})=>{let[t]=j(e,`components`),n=(0,y.useMemo)(()=>{let n=[];return t?(t.forEach(t=>{let r=e.getComponentByUUID(t);r&&n.push((0,E.jsx)(Mr,{component:r},r.uuid))}),n):null},[t,e]);return(0,E.jsx)(`div`,{className:Nr.container,children:n})},Fr=()=>{let{editor:e,engine:t}=Le(),[n]=j(e,`selectedEntityId`),r=(0,y.useMemo)(()=>{if(n)return t.root.findEntityByUUID(n)},[t,n]);return r?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(ue,{label:`Fields`,accordion:!0,children:(0,E.jsx)(ot,{target:r})}),(0,E.jsxs)(ue,{label:`Components`,accordion:!0,children:[(0,E.jsx)(Pr,{entity:r}),(0,E.jsx)(Dr,{entity:r})]})]}):null},Ir=(0,y.createContext)(null),Lr=()=>{let e=(0,y.useContext)(Ir);if(e===null)throw Error(`useOREngine must be used within a OREngineProvider`);return e},Rr={container:`GPUTimer__container___LmNvb`,headerRow:`GPUTimer__headerRow___LmNvb`,totalTime:`GPUTimer__totalTime___LmNvb`,toggleButton:`GPUTimer__toggleButton___LmNvb`,controls:`GPUTimer__controls___LmNvb`,control:`GPUTimer__control___LmNvb`,controlLabel:`GPUTimer__controlLabel___LmNvb`,select:`GPUTimer__select___LmNvb`,input:`GPUTimer__input___LmNvb`,group:`GPUTimer__group___LmNvb`,item:`GPUTimer__item___LmNvb`,clickable:`GPUTimer__clickable___LmNvb`,itemRow:`GPUTimer__itemRow___LmNvb`,itemName:`GPUTimer__itemName___LmNvb`,itemTime:`GPUTimer__itemTime___LmNvb`,itemStats:`GPUTimer__itemStats___LmNvb`,progressBar:`GPUTimer__progressBar___LmNvb`,progressFill:`GPUTimer__progressFill___LmNvb`},zr=class{buffer;index;size;filled;constructor(e){this.size=e,this.buffer=Array(e),this.index=0,this.filled=!1}push(e){this.buffer[this.index]=e,this.index=(this.index+1)%this.size,!this.filled&&this.index===0&&(this.filled=!0)}getAverage(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=0;for(let n=0;n<e;n++)t+=this.buffer[n];return t/e}getMax(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]>t&&(t=this.buffer[n]);return t}getMin(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]<t&&(t=this.buffer[n]);return t}getCount(){return this.filled?this.size:this.index}},Br=class{buffers;windowSize;currentData;constructor(e=30){this.windowSize=e,this.buffers=new Map,this.currentData=new Map}update(e){let t=performance.now();for(let n=0;n<e.length;n++){let r=e[n],i=r.name.split(`/`),a=i[0]||`unknown`,o,s=i[i.length-1],c=s&&s.match(/\[([^\]]+)\]/);c&&(o=c[1]);let l={name:r.name,duration:r.duration,timestamp:t,renderType:a},u=this.buffers.get(r.name);u||(u=new zr(this.windowSize),this.buffers.set(r.name,u)),u.push(r.duration),this.currentData.set(r.name,{...l,entityId:o})}}getStatistics(){let e=[],t=0,n=performance.now(),r=[];return this.currentData.forEach((e,t)=>{n-e.timestamp>1e3&&r.push(t)}),r.forEach(e=>{this.currentData.delete(e)}),this.currentData.forEach(e=>{t+=e.duration}),this.currentData.forEach(n=>{let r=this.buffers.get(n.name);r&&e.push({name:n.name,renderType:n.renderType,entityId:n.entityId,current:n.duration,avg:r.getAverage(),max:r.getMax(),min:r.getMin(),samples:r.getCount(),percentage:t>0?n.duration/t*100:0})}),e}getTotalTime(){let e=0;return this.currentData.forEach(t=>{e+=t.duration}),e}},Vr=e=>{if(e<2){let t=e/2;return`rgb(${Math.floor(100+t*100)}, 200, 100)`}else if(e<5){let t=(e-2)/3;return`rgb(200, ${Math.floor(200-t*50)}, 100)`}else if(e<10){let t=(e-5)/5;return`rgb(200, ${Math.floor(150-t*80)}, ${Math.floor(100-t*50)})`}else return`rgb(200, 70, 50)`},Hr=e=>e>=10?e.toFixed(1):e>=1?e.toFixed(2):e.toFixed(3),Ur=e=>e.replace(/\[([^\]]{4,})\]/g,(e,t)=>`[${t.slice(0,3)}]`),Wr=()=>{let{editor:e}=Le(),{engine:t}=Lr(),[n,r]=(0,y.useState)([]),[i,a]=(0,y.useState)(0),[o,s]=(0,y.useState)(`all`),[c,l]=(0,y.useState)(0),[u,d]=(0,y.useState)(`time`),[f,p]=(0,y.useState)(!1),m=(0,y.useRef)(new Br(30)),h=(0,y.useRef)(0),g=(0,y.useRef)(!1),_=(0,y.useRef)(0),v=(0,y.useCallback)(n=>{if(!n)return;let r=t.root.findEntityByUUID(n);r&&e.selectEntity(r)},[t,e]);(0,y.useEffect)(()=>{let e=t.renderer,n=m.current,i=e=>{f&&(n.update(e),g.current=!0)},o=e=>{g.current&&e-_.current>=300&&(r(n.getStatistics()),a(n.getTotalTime()),g.current=!1,_.current=e),h.current=requestAnimationFrame(o)};return e.on(`timer`,i),h.current=requestAnimationFrame(o),()=>{e.off(`timer`,i),cancelAnimationFrame(h.current)}},[t,f]);let b=n.filter(e=>!(o!==`all`&&e.renderType!==o||e.avg<c)),x=Array.from(new Set(n.map(e=>e.renderType))),S=[...b].sort((e,t)=>u===`time`?t.avg-e.avg:e.name.localeCompare(t.name)),C=i>0?Math.floor(1e3/i):0;return(0,E.jsxs)(`div`,{className:Rr.container,children:[(0,E.jsxs)(`div`,{className:Rr.headerRow,children:[(0,E.jsxs)(`span`,{className:Rr.totalTime,children:[Hr(i),`ms (`,C,`fps)`]}),(0,E.jsx)(`button`,{className:Rr.toggleButton,onClick:()=>p(!f),title:f?`Stop timer`:`Start timer`,children:f?`⏸`:`▶`})]}),(0,E.jsxs)(`div`,{className:Rr.controls,children:[(0,E.jsxs)(`div`,{className:Rr.control,children:[(0,E.jsx)(`span`,{className:Rr.controlLabel,children:`Type`}),(0,E.jsxs)(`select`,{className:Rr.select,value:o,onChange:e=>s(e.target.value),children:[(0,E.jsx)(`option`,{value:`all`,children:`All`}),x.map(e=>(0,E.jsx)(`option`,{value:e,children:e},e))]})]}),(0,E.jsxs)(`div`,{className:Rr.control,children:[(0,E.jsx)(`span`,{className:Rr.controlLabel,children:`Min`}),(0,E.jsx)(`input`,{className:Rr.input,type:`number`,min:`0`,step:`0.1`,value:c,onChange:e=>l(parseFloat(e.target.value)||0)})]}),(0,E.jsxs)(`div`,{className:Rr.control,children:[(0,E.jsx)(`span`,{className:Rr.controlLabel,children:`Sort`}),(0,E.jsxs)(`select`,{className:Rr.select,value:u,onChange:e=>d(e.target.value),children:[(0,E.jsx)(`option`,{value:`time`,children:`Time`}),(0,E.jsx)(`option`,{value:`name`,children:`Name`})]})]})]}),(0,E.jsx)(`div`,{className:Rr.group,children:S.map((e,t)=>{let n=Vr(e.avg),r=i>0?e.avg/i*100:0,a=!!e.entityId;return(0,E.jsxs)(`div`,{className:`${Rr.item} ${a?Rr.clickable:``}`,onClick:()=>v(e.entityId),children:[(0,E.jsxs)(`div`,{className:Rr.itemRow,children:[(0,E.jsx)(`span`,{className:Rr.itemName,title:e.name,children:Ur(e.name)}),(0,E.jsx)(`span`,{className:Rr.itemTime,style:{color:n},children:Hr(e.avg)}),(0,E.jsx)(`span`,{className:Rr.itemStats,children:Hr(e.max)})]}),(0,E.jsx)(`div`,{className:Rr.progressBar,children:(0,E.jsx)(`div`,{className:Rr.progressFill,style:{width:`${r}%`,backgroundColor:n}})})]},e.name+t)})})]})},Gr=({size:e=24})=>(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{x:`2`,y:`6`,width:`14`,height:`12`,rx:`2`,fill:`#D9D9D9`}),(0,E.jsx)(`path`,{d:`M16 10L22 7V17L16 14V10Z`,fill:`#D9D9D9`})]}),Kr=({size:e=24,selectable:t=!0})=>t?(0,E.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`path`,{d:`M5 3L19 12L12.5 13.5L9.5 20L5 3Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinejoin:`round`})}):(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M5 3L19 12L12.5 13.5L9.5 20L5 3Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinejoin:`round`}),(0,E.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),qr=({size:e=24,visible:t=!0})=>t?(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,E.jsx)(`circle`,{cx:`12`,cy:`12.5`,r:`3`,stroke:`currentColor`,strokeWidth:`1.5`})]}):(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.89 1 12.5A17.89 17.89 0 0 1 5.06 7.06`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,E.jsx)(`path`,{d:`M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.11 23 11.5A17.89 17.89 0 0 1 19.74 15.74`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`}),(0,E.jsx)(`line`,{x1:`1`,y1:`1`,x2:`23`,y2:`23`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),Jr=({size:e=24})=>(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`4`,fill:`#D9D9D9`}),(0,E.jsx)(`path`,{d:`M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07`,stroke:`#D9D9D9`,strokeWidth:`1.5`,strokeLinecap:`round`})]}),Yr=({size:e=24})=>(0,E.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`path`,{d:`M12 3L21 8V16L12 21L3 16V8L12 3Z`,stroke:`#D9D9D9`,strokeWidth:`1.5`,strokeLinejoin:`round`}),(0,E.jsx)(`path`,{d:`M12 3V21M3 8L21 16M21 8L3 16`,stroke:`#D9D9D9`,strokeWidth:`1`,strokeLinejoin:`round`,opacity:`0.5`})]}),Xr={picker:`Picker__picker___LnBpY`,picker_label:`Picker__picker_label___LnBpY`,picker_list:`Picker__picker_list___LnBpY`,picker_list_inner:`Picker__picker_list_inner___LnBpY`,item:`Picker__item___LnBpY`},Zr=e=>(0,E.jsxs)(`div`,{className:Xr.picker,"data-no_bg":e.noBg,children:[e.label&&(0,E.jsx)(`div`,{className:Xr.picker_label,children:e.label}),(0,E.jsx)(`div`,{className:Xr.picker_list,children:(0,E.jsx)(`div`,{className:Xr.picker_list_inner,children:e.list.map((e,t)=>(0,E.jsx)(`div`,{className:Xr.item,onClick:e.onClick,children:e.label},t))})})]}),Qr={group:`InputGroup__group___Lmdyb`,submit:`InputGroup__submit___Lmdyb`},$r=e=>{let t=e.initialValues,n=[],[r,i]=(0,y.useState)(t);(0,y.useEffect)(()=>{i(t)},[t]);let a=Object.keys(r);for(let e=0;e<a.length;e++){let t=a[e],o=r[t];n.push((0,E.jsx)(He,{label:t,value:o,onChange:e=>{i({...r,[t]:e})}},e))}let o=(0,y.useRef)(null);return(0,y.useEffect)(()=>{setTimeout(()=>{o.current&&o.current.querySelector(`input`)?.focus()},0)},[]),(0,E.jsx)(`div`,{className:Qr.group,ref:o,children:(0,E.jsxs)(`form`,{onSubmit:e=>{e.preventDefault()},children:[(0,E.jsx)(ue,{label:e.title,noMargin:!0,children:n}),(0,E.jsx)(`div`,{className:Qr.submit,children:(0,E.jsx)(me,{type:`submit`,onClick:()=>{e.onSubmit&&e.onSubmit(r)},children:`OK`})})]})})},ei={node:`HierarchyNode__node___Lm5vZ`,self:`HierarchyNode__self___Lm5vZ`,self_name:`HierarchyNode__self_name___Lm5vZ`,icon:`HierarchyNode__icon___Lm5vZ`,selectable:`HierarchyNode__selectable___Lm5vZ`,visibility:`HierarchyNode__visibility___Lm5vZ`,menu:`HierarchyNode__menu___Lm5vZ`,fold:`HierarchyNode__fold___Lm5vZ`,fold_button:`HierarchyNode__fold_button___Lm5vZ`,child:`HierarchyNode__child___Lm5vZ`,child_line:`HierarchyNode__child_line___Lm5vZ`},ti=e=>{let{editor:t,engine:n}=Le(),[r]=j(t,`selectedEntityId`),i=r!==void 0&&n.root.findEntityByUUID(r),[a,o]=j(e.entity,`visible`),[s,c]=j(t,`unselectableEntityIds`),[l]=j(e.entity,`children`),u=!(s||[]).includes(e.entity.uuid),d=(l||[]).map(e=>n.root.findEntityByUUID(e)).filter(e=>e!==void 0),f=e.depth||0,p=d&&d.concat().sort((e,t)=>e.name.localeCompare(t.name))||[],m=p.length>0,h=f*20,g=e.entity.initiator==`script`,_=(0,y.useMemo)(()=>e.entity.getComponent(Vt)?(0,E.jsx)(Jr,{size:14}):e.entity.getComponent(zt)?(0,E.jsx)(Gr,{size:14}):e.entity.getComponent(F)?(0,E.jsx)(Yr,{size:14}):null,[e.entity]),v=e.openNodes.has(e.entity.uuid),b=(0,y.useCallback)(t=>{e.setNodeOpen(e.entity.uuid,!v),t.stopPropagation()},[v,e]),x=(0,y.useCallback)(()=>{t&&t.selectEntity(e.entity)},[t,e.entity]),S=(0,y.useCallback)(e=>{e.stopPropagation(),o&&o(!a)},[a,o]),C=(0,y.useCallback)(t=>{t.stopPropagation();let n=new Set(s||[]);u?n.add(e.entity.uuid):n.delete(e.entity.uuid),c(Array.from(n))},[u,s,c,e.entity.uuid]),{pushContent:w,closeAll:T}=Sr(),ee=(0,y.useCallback)(n=>{n.preventDefault(),!(!t||!w||!T||g)&&(t.selectEntity(e.entity),w((0,E.jsx)(Zr,{label:e.entity.name,list:[{label:`Add Entity`,onClick:()=>{w((0,E.jsx)($r,{initialValues:{name:``},onSubmit:n=>{let r=t.api.createEntity(e.entity,n.name);t.api.selectEntity(r),T()}}))}},{label:`Delete Entity`,onClick:()=>{t.api.deleteEntity(e.entity),T()}}]})))},[t,e.entity,w,T,g]);return(0,E.jsxs)(`div`,{className:ei.node,"data-no_export":g,children:[(0,E.jsxs)(`div`,{className:ei.self,style:{paddingLeft:h},onClick:x,onContextMenu:ee,"data-selected":i&&i.uuid==e.entity.uuid,children:[(0,E.jsx)(`div`,{className:ei.fold,"data-hnode_open":v,children:m&&(0,E.jsx)(`button`,{className:ei.fold_button,onClick:b,children:(0,E.jsx)(A,{open:v})})}),_&&(0,E.jsx)(`div`,{className:ei.icon,children:_}),(0,E.jsx)(`div`,{className:ei.self_name,children:(0,E.jsx)(`p`,{children:e.entity.name||`-`})}),(0,E.jsx)(`button`,{className:ei.selectable,onClick:C,"data-selectable":u,children:(0,E.jsx)(Kr,{size:14,selectable:u})}),(0,E.jsx)(`button`,{className:ei.visibility,onClick:S,"data-visible":a!==!1,children:(0,E.jsx)(qr,{size:14,visible:a!==!1})}),!g&&(0,E.jsx)(`button`,{className:ei.menu,onClick:ee,children:`⋯`})]}),m&&(0,E.jsxs)(`div`,{className:ei.child,"data-open":v,children:[p.map(t=>(0,E.jsx)(ti,{entity:t,depth:f+1,openNodes:e.openNodes,setNodeOpen:e.setNodeOpen},t.uuid)),(0,E.jsx)(`div`,{className:ei.child_line,style:{marginLeft:h+4}})]})]})},ni={},ri=`hierarchyOpenNodes`,ii=()=>{try{let e=localStorage.getItem(ri);if(e)return new Set(JSON.parse(e))}catch{}return new Set},ai=e=>{localStorage.setItem(ri,JSON.stringify(Array.from(e)))},oi=()=>{let{editor:e,engine:t}=Le(),[n]=j(e,`selectedEntityId`),r=t.root,[i,a]=(0,y.useState)(ii),o=(0,y.useCallback)((e,t)=>{a(n=>{let r=new Set(n);return t?r.add(e):r.delete(e),ai(r),r})},[]);return(0,y.useEffect)(()=>{if(!n)return;let e=r.findEntityByUUID(n);if(!e)return;let t=[],i=e.parent;for(;i;)t.push(i.uuid),i=i.parent;a(e=>{if(t.every(t=>e.has(t)))return e;let n=new Set(e);return t.forEach(e=>n.add(e)),ai(n),n})},[n,r]),(0,E.jsx)(`div`,{className:ni.hierarchy,children:r&&(0,E.jsx)(ti,{entity:r,openNodes:i,setNodeOpen:o})})},si={inputWindow:`InputWindow__inputWindow___Lmluc`,overlay:`InputWindow__overlay___Lmluc`,window:`InputWindow__window___Lmluc`,label:`InputWindow__label___Lmluc`,input:`InputWindow__input___Lmluc`,buttons:`InputWindow__buttons___Lmluc`,cancelBtn:`InputWindow__cancelBtn___Lmluc`,okBtn:`InputWindow__okBtn___Lmluc`},ci=()=>{let{config:e,close:t}=Ce(),n=(0,y.useRef)(null),[r,i]=(0,y.useState)(``),a=(0,y.useRef)(!1);(0,y.useEffect)(()=>{e&&(i(String(e.value)),a.current=!0)},[e]),(0,y.useEffect)(()=>{a.current&&(a.current=!1,n.current?.focus(),n.current?.select())},[r]);let o=(0,y.useCallback)(()=>{e&&(e.type===`number`?e.onChange(Number(r)):e.onChange(r),t())},[e,r,t]),s=(0,y.useCallback)(()=>{t()},[t]);return e?(0,E.jsxs)(`div`,{className:si.inputWindow,children:[(0,E.jsx)(`div`,{className:si.overlay,onClick:s}),(0,E.jsxs)(`div`,{className:si.window,children:[e.label&&(0,E.jsx)(`div`,{className:si.label,children:e.label}),(0,E.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),o()},children:[(0,E.jsx)(`input`,{ref:n,className:si.input,type:`text`,inputMode:e.type===`number`?`decimal`:`text`,value:r,step:e.step,min:e.min,max:e.max,onChange:e=>i(e.target.value),onKeyDown:e=>{e.key===`Escape`&&s()}}),(0,E.jsxs)(`div`,{className:si.buttons,children:[(0,E.jsx)(`button`,{type:`button`,className:si.cancelBtn,onClick:s,children:`Cancel`}),(0,E.jsx)(`button`,{type:`submit`,className:si.okBtn,children:`OK`})]})]})]})]}):null},li=()=>{let[e,t]=(0,y.useState)(null);return{config:e,open:(0,y.useCallback)(e=>{t(e)},[]),close:(0,y.useCallback)(()=>{t(null)},[])}},ui=e=>{let t=li();return(0,E.jsx)(Se.Provider,{value:t,children:e.children})},di={mouseMenu:`MouseMenu__mouseMenu___Lm1vd`,hide:`MouseMenu__hide___Lm1vd`,menuItem:`MouseMenu__menuItem___Lm1vd`,menuItem_inner:`MouseMenu__menuItem_inner___Lm1vd`,menuItem_inner_inner:`MouseMenu__menuItem_inner_inner___Lm1vd`},fi=()=>{let{itemList:e,containerRef:t,closeAll:n}=Sr();return(0,E.jsxs)(`div`,{className:di.mouseMenu,ref:t,children:[e&&e.length>0&&(0,E.jsx)(`div`,{className:di.hide,onClick:()=>{n&&n()}}),e&&e.map(e=>{let t=e.pos;return(0,E.jsx)(Cr.Provider,{value:e,children:(0,E.jsx)(`div`,{className:di.menuItem,style:{left:0,top:0,transform:`translate(${t.x}px, ${t.y}px)`},children:(0,E.jsx)(`div`,{className:di.menuItem_inner,children:(0,E.jsx)(`div`,{className:di.menuItem_inner_inner,"data-direction":e.direction,children:e.elm})})})},e.id)})]})},pi=0,mi=()=>{let e=(0,y.useRef)(null),t=(0,y.useRef)({x:0,y:0}),n=(0,y.useCallback)(e=>{t.current.x=e.clientX,t.current.y=e.clientY},[]);(0,y.useEffect)(()=>(window.addEventListener(`pointermove`,n),()=>{window.removeEventListener(`pointermove`,n)}),[n]);let[r,i]=(0,y.useState)([]),a=(0,y.useRef)(r);a.current=r;let o=(0,y.useCallback)(e=>{a.current=a.current.filter(t=>t.id!==e),i(a.current)},[]),s=(0,y.useCallback)(()=>{i([])},[]);return{itemList:r,pushContent:(0,y.useCallback)(e=>{let n=pi++,r={x:t.current.x,y:t.current.y},s={id:n,elm:e,pos:r,direction:(r.x<window.innerWidth/2?`right`:`left`)+`-`+(r.y<window.innerHeight/2?`bottom`:`top`),close:()=>o(n)};return i([...a.current,s]),s},[o]),closeAll:s,containerRef:e}},hi=e=>{let t=mi();return(0,E.jsx)(xr.Provider,{value:t,children:e.children})},gi={project:`ProjectControl__project___LnByb`,project_inner:`ProjectControl__project_inner___LnByb`,projectSelector:`ProjectControl__projectSelector___LnByb`,row:`ProjectControl__row___LnByb`,rowItem:`ProjectControl__rowItem___LnByb`,export:`ProjectControl__export___LnByb`},_i=new URLSearchParams(location.search).get(`project`)||`default`,vi=()=>{let{editor:e}=Le(),[t,n]=(0,y.useState)(null);if((0,y.useEffect)(()=>{if(!e)return;let t=()=>{n(e.exportProgress?{...e.exportProgress}:null)};return e.on(`update/export`,t),()=>{e.off(`update/export`,t)}},[e]),!e)return null;let r=e.isExporting;return(0,E.jsx)(`div`,{className:gi.project,children:(0,E.jsx)(`div`,{className:gi.project_inner,children:(0,E.jsxs)(ue,{label:_i,accordion:!0,children:[(0,E.jsx)(me,{onClick:()=>{e&&e.save()},children:`Save`}),(0,E.jsx)(me,{onClick:()=>{window.location.href=`/`},children:`Projects`}),(0,E.jsxs)(`div`,{className:gi.export,children:[(0,E.jsxs)(me,{onClick:()=>{e&&(e.save(),window.open(`/player`,`_blank`))},children:[`Play `,(0,E.jsx)(A,{})]}),(0,E.jsx)(me,{onClick:()=>{e&&!r&&e.exportMP4()},children:t?`Exporting... ${Math.floor(t.current/t.total*100)}%`:`Export MP4`})]})]})})})},yi={renderer:`RendererSettings__renderer___LnJlb`,renderer_inner:`RendererSettings__renderer_inner___LnJlb`},bi=()=>{let{editor:e}=Le(),t=e.engine.renderer;return(0,E.jsx)(`div`,{className:yi.renderer,children:(0,E.jsxs)(`div`,{className:yi.renderer_inner,children:[(0,E.jsx)(ue,{label:`Resolution`,accordion:!0,children:(0,E.jsx)(ot,{target:e,filter:`resolution`})}),(0,E.jsx)(ue,{label:`Pipeline`,accordion:!0,children:(0,E.jsx)(ot,{target:t,filter:`pipeline`})}),(0,E.jsx)(ue,{label:`Sky`,accordion:!0,children:(0,E.jsx)(ot,{target:t,filter:`sky`})})]})})},xi={container:`Canvas__container___LmNvb`},Si=()=>{let{engine:e}=Le(),t=(0,y.useRef)(null);return(0,y.useEffect)(()=>{let n=t.current;if(!e||!n)return;let r=e.canvas;if(!r){console.error(`Canvas element not found in engine`);return}return n.appendChild(r),()=>{n.contains(r)&&n.removeChild(r)}},[e]),(0,E.jsx)(`div`,{className:xi.container,ref:t,role:`presentation`,"aria-label":`3D Canvas`})},Ci={audioView:`AudioView__audioView___LmF1Z`},wi=class extends Ct{wrapperElm;canvas;canvasCtx;viewRangeFrame;viewPort;viewPortRange;musicBuffer;resizeObserver;frameSetting;framePlay;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];let e=window.localStorage.getItem(`audioViweRange`);this.viewRangeFrame=e?Number(e):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){let e=new M(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=e.x,this.canvas.height=e.y}this.render()}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)]*1,s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]*1+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle=`#555`,this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(e){this.framePlay=e,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(e){this.viewRangeFrame=e,this.setFramePlaying(this.framePlay),localStorage.setItem(`audioViweRange`,String(this.viewRangeFrame))}setFrameSetting(e){this.frameSetting=e,this.render()}setMusicBuffer(e){this.musicBuffer=e,this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}},Ti=()=>{let{editor:e}=Le(),t=(0,y.useRef)(null),[n,r]=(0,y.useState)();(0,y.useEffect)(()=>{let e=new wi;if(r(e),t.current)return e.setWrapperElm(t.current),()=>{e.dispose()}},[]);let i=e&&e.audioBuffer,[a,o]=(0,y.useState)(),[s,c]=(0,y.useState)({duration:0,fps:0}),[l,u]=(0,y.useState)({current:0,playing:!1});(0,y.useEffect)(()=>{if(!e)return;let t=e.engine,n=e=>{c({duration:e[`timeline/duration`],fps:e[`timeline/fps`]})},r=0,i=()=>{o(r++)},a=e=>{u({...e})};return n(t.serialize()),a(t.frame),t.on(`fields/update`,n),t.on(`update/music`,i),t.on(`update/frame/play`,a),()=>{t.off(`update/frame/setting`,n),t.off(`update/music`,i),t.off(`update/frame/play`,a)}},[e]),(0,y.useEffect)(()=>{n&&i&&n.setMusicBuffer(i)},[n,i,a]),(0,y.useEffect)(()=>{n&&l&&n.setFramePlaying(l)},[n,l]),(0,y.useEffect)(()=>{n&&s&&n.setFrameSetting(s)},[n,s]);let d=(0,y.useCallback)(e=>{if(n){let t=e.deltaY>0?1.1:.9;n.setViewRangeFrame(n.viewRangeFrame*t)}e.preventDefault()},[n]);return(0,y.useEffect)(()=>{let e=t.current;return e&&e.addEventListener(`wheel`,d,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,d)}},[d]),(0,E.jsx)(`div`,{className:Ci.audioView,ref:t})},Ei={cameraPad:`CameraPad__cameraPad___LmNhb`,btn:`CameraPad__btn___LmNhb`},Di=()=>{let{editor:e}=Le(),[t]=j(e,`selectedEntityId`);return(0,E.jsxs)(`div`,{className:Ei.cameraPad,children:[(0,E.jsx)(`div`,{className:Ei.btn,"data-disabled":!t,onClick:()=>{t&&e.focusSelected()},title:`Focus selected ( . )`,children:`Focus`}),(0,E.jsx)(`div`,{className:Ei.btn,onClick:()=>{e.syncToSceneCamera()},title:`Move to scene camera ( Esc )`,children:`Scene Cam`})]})},z={screen:`Screen__screen___LnNjc`,header:`Screen__header___LnNjc`,header_tabs:`Screen__header_tabs___LnNjc`,header_tab:`Screen__header_tab___LnNjc`,header_right:`Screen__header_right___LnNjc`,header_item:`Screen__header_item___LnNjc`,content:`Screen__content___LnNjc`,gizmoMode:`Screen__gizmoMode___LnNjc`,gizmoMode_btn:`Screen__gizmoMode_btn___LnNjc`,gizmoMode_separator:`Screen__gizmoMode_separator___LnNjc`,modalStatus:`Screen__modalStatus___LnNjc`,canvas:`Screen__canvas___LnNjc`,audioViewHandle:`Screen__audioViewHandle___LnNjc`,audioView:`Screen__audioView___LnNjc`,displayOptions:`Screen__displayOptions___LnNjc`,displayOptions_btn:`Screen__displayOptions_btn___LnNjc`,overlay:`Screen__overlay___LnNjc`,overlay_field:`Screen__overlay_field___LnNjc`,overlay_label:`Screen__overlay_label___LnNjc`,overlay_separator:`Screen__overlay_separator___LnNjc`,externalBtn:`Screen__externalBtn___LnNjc`},Oi=()=>{let{editor:e}=Le(),t=se(),[n,r]=j(e,`enableRender`),[i,a]=j(e,`preview`),[o,s]=j(e,`viewType`),[c,l]=j(e,`resolutionScale`),[u,d]=j(e,`gizmoMode`),[f,p]=j(e,`transformOrientation`),[m]=j(e,`modalStatus`),[h,g]=j(e,`helpers/show`),[_,v]=j(e,`helpers/empty`),[b,x]=j(e,`helpers/camera`),[S,C]=j(e,`helpers/light`),[w,T]=j(e,`helpers/grid`),[ee,te]=j(e,`helpers/wireframe`),[D,O]=j(e,`helpers/gizmo`),[ne,re]=j(e,`helpers/outline`),[ie]=Je(`showAudioView`),[ae,k]=(0,y.useState)(50),oe=(0,y.useRef)(null),[ce,A]=(0,y.useState)(!1),le=(0,y.useRef)(null),ue=(0,y.useCallback)(e=>{le.current&&!le.current.contains(e.target)&&A(!1)},[]);return(0,y.useEffect)(()=>(ce&&document.addEventListener(`pointerdown`,ue),()=>{document.removeEventListener(`pointerdown`,ue)}),[ce,ue]),(0,E.jsxs)(`div`,{className:z.screen,children:[(0,E.jsxs)(`div`,{className:z.header,children:[(0,E.jsx)(`div`,{className:z.header_tabs,children:(0,E.jsx)(`div`,{className:z.header_tab,"data-active":!!i,onClick:()=>a&&a(!i),title:`Camera Render`,children:(0,E.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 512 512`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`,children:(0,E.jsx)(`path`,{d:`M32 144 H336 V368 H32 Z M368 224 L480 152 V360 L368 288 Z`})})})}),(0,E.jsxs)(`div`,{className:z.header_right,children:[(0,E.jsx)(`div`,{className:z.header_item,children:(0,E.jsx)(fe,{title:`View`,children:(0,E.jsx)(He,{value:o,format:{type:`select`,list:[`render`,`debug`]},onChange:e=>s&&s(e)})})}),(0,E.jsx)(`div`,{className:z.header_item,children:(0,E.jsx)(fe,{title:`Res`,children:(0,E.jsx)(He,{value:c,format:{type:`select`,list:[,,,,,,].fill(0).map((e,t)=>{let n=2**t,r=1/n;return{value:r,label:r==1?`1`:`1/`+n}})},onChange:e=>l&&l(e)})})}),t.isPC&&(0,E.jsx)(`div`,{className:z.externalBtn,children:(0,E.jsx)(me,{onClick:()=>{e.openInExternalWindow()},children:(0,E.jsxs)(`svg`,{width:`32`,height:`12`,viewBox:`0 0 512 512`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsxs)(`g`,{clipPath:`url(#clip0_224_2)`,children:[(0,E.jsx)(`path`,{d:`M96 0V416H512V0H96ZM472 376H136V40H472V376Z`,fill:`#aaa`}),(0,E.jsx)(`path`,{d:`M40 472V296V136V96H0V512H416V472H376H40Z`,fill:`#aaa`}),(0,E.jsx)(`path`,{d:`M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z`,fill:`#aaa`})]}),(0,E.jsx)(`defs`,{children:(0,E.jsx)(`clipPath`,{id:`clip0_224_2`,children:(0,E.jsx)(`rect`,{width:`512`,height:`512`,fill:`white`})})})]})})})]})]}),(0,E.jsxs)(`div`,{className:z.content,children:[(0,E.jsxs)(`div`,{className:z.displayOptions,ref:le,children:[(0,E.jsx)(`div`,{className:z.displayOptions_btn,"data-active":ce,onClick:()=>A(!ce),title:`Display Options`,children:`⚙`}),ce&&(0,E.jsxs)(`div`,{className:z.overlay,children:[(0,E.jsx)(`div`,{className:z.overlay_label,children:`Rendering`}),(0,E.jsx)(`div`,{className:z.overlay_field,children:(0,E.jsx)(fe,{title:`Render`,children:(0,E.jsx)(He,{value:n,onChange:e=>r&&r(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_separator}),(0,E.jsx)(`div`,{className:z.overlay_label,children:`Helpers`}),(0,E.jsx)(`div`,{className:z.overlay_field,children:(0,E.jsx)(fe,{title:`Show`,children:(0,E.jsx)(He,{value:h,onChange:e=>g&&g(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_field,"data-indent":`true`,children:(0,E.jsx)(fe,{title:`Empty`,children:(0,E.jsx)(He,{value:_,onChange:e=>v&&v(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_field,"data-indent":`true`,children:(0,E.jsx)(fe,{title:`Camera`,children:(0,E.jsx)(He,{value:b,onChange:e=>x&&x(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_field,"data-indent":`true`,children:(0,E.jsx)(fe,{title:`Light`,children:(0,E.jsx)(He,{value:S,onChange:e=>C&&C(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_separator}),(0,E.jsx)(`div`,{className:z.overlay_field,children:(0,E.jsx)(fe,{title:`Grid`,children:(0,E.jsx)(He,{value:w,onChange:e=>T&&T(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_field,children:(0,E.jsx)(fe,{title:`Wireframe`,children:(0,E.jsx)(He,{value:ee,onChange:e=>te&&te(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_field,children:(0,E.jsx)(fe,{title:`Gizmo`,children:(0,E.jsx)(He,{value:D,onChange:e=>O&&O(e)})})}),(0,E.jsx)(`div`,{className:z.overlay_field,children:(0,E.jsx)(fe,{title:`Outline`,children:(0,E.jsx)(He,{value:ne,onChange:e=>re&&re(e)})})})]})]}),(0,E.jsxs)(`div`,{className:z.gizmoMode,children:[[`select`,`translate`,`rotate`,`scale`].map(e=>(0,E.jsx)(`div`,{className:z.gizmoMode_btn,"data-active":u===e,onClick:()=>d&&d(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`select`?`↖`:e===`translate`?`T`:e===`rotate`?`R`:`S`},e)),(0,E.jsx)(`div`,{className:z.gizmoMode_separator}),[`global`,`local`].map(e=>(0,E.jsx)(`div`,{className:z.gizmoMode_btn,"data-active":f===e,onClick:()=>p&&p(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`global`?`G`:`L`},e))]}),m&&(0,E.jsx)(`div`,{className:z.modalStatus,children:m}),(0,E.jsx)(`div`,{className:z.canvas,children:(0,E.jsx)(Si,{})}),t.isSP&&(0,E.jsx)(Di,{}),t.isPC&&ie&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`div`,{className:z.audioViewHandle,onPointerDown:e=>{e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),oe.current={startY:e.clientY,startHeight:ae}},onPointerMove:e=>{if(!oe.current)return;let t=oe.current.startY-e.clientY,n=Math.max(20,Math.min(400,oe.current.startHeight+t));k(n)},onPointerUp:()=>{oe.current=null}}),(0,E.jsx)(`div`,{className:z.audioView,style:{height:ae},children:(0,E.jsx)(Ti,{})})]})]})]})},ki={textures:`Textures__textures___LnRle`,item:`Textures__item___LnRle`,preview:`Textures__preview___LnRle`,img:`Textures__img___LnRle`,placeholder:`Textures__placeholder___LnRle`,name:`Textures__name___LnRle`},Ai=()=>{let{engine:e,editor:t}=Le(),[,n]=(0,y.useState)(0);(0,y.useEffect)(()=>{let e=()=>{t.assetPreviewManager?.invalidateAll(),n(e=>e+1)},r=()=>n(e=>e+1);return vr.resources.on(`update`,e),t.assetPreviewManager?.on(`update`,r),()=>{vr.resources.off(`update`,e),t.assetPreviewManager?.off(`update`,r)}},[e,t]);let r=vr.resources.textureList;return(0,E.jsx)(`div`,{className:ki.textures,children:r.map(e=>{let n=t.assetPreviewManager?.getTexturePreview(e.name);return(0,E.jsxs)(`div`,{className:ki.item,children:[(0,E.jsx)(`div`,{className:ki.preview,children:n?(0,E.jsx)(`img`,{src:n,className:ki.img}):(0,E.jsx)(`div`,{className:ki.placeholder})}),(0,E.jsx)(`div`,{className:ki.name,children:e.name})]},e.name)})})},ji=(0,y.createContext)(null),Mi=()=>{let e=(0,y.useContext)(ji);if(e===null)throw Error(`useTimeline must be used within a TimelineProvider`);return e},Ni=`#define PI 3.14159265359\r
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

}`,Pi=class extends Ct{wrapperElm;glCanvas;backend;gl;canvasTexture;canvas;canvasCtx;glRenderer;postProcess;viewPort;viewPortRange;viewPortScale;frameSetting;loopSetting;musicBuffer;musicTexture;resizeObserver;canvasSize;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.glCanvas=document.createElement(`canvas`),this.backend=new vt(this.glCanvas.getContext(`webgl2`)),this.gl=this.backend.gl,this.canvasSize=new M(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this));let e={renderer:null,createEntity:t=>new Wt({...t,engine:e})};this.glRenderer=new jn(this.backend,e),e.renderer=this.glRenderer,this.canvasTexture=new mt(this.gl),this.musicBuffer=null,this.musicTexture=new mt(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new Zt({passes:[new R(this.backend,{frag:Ni,uniforms:{uCanvasTex:{type:`1i`,value:null},uMusicTex:{type:`1i`,value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){let e=new M(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);if(e.x===0||e.y===0)return;this.glCanvas.width=this.canvas.width=e.x,this.glCanvas.height=this.canvas.height=e.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(e),this.render()}}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle=`#181818`;let e=this.frameToPx(0),t=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(e,0,t-e,this.canvas.height)}let e=(e,t,n)=>{let r=Math.ceil(this.viewPort[0]/e)*e;this.canvasCtx.beginPath();let i=0;for(;r<this.viewPort[2]&&i<100;){let n=this.frameToPx(r+t);this.canvasCtx.moveTo(n,0),this.canvasCtx.lineTo(n,this.canvas.height),r+=e,i++}this.canvasCtx.strokeStyle=n,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(e(this.viewPortScale,0,`#555`),e(this.viewPortScale,this.viewPortScale/2,`#333`),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)],s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle=`#0009`;let e=this.frameToPx(this.loopSetting.start),t=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,e,this.canvas.height),this.canvasCtx.fillRect(t,0,this.canvas.width-t,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess.passes&&(this.postProcess.passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(e,t){this.viewPort=e,this.viewPortRange=[e[2]-e[0],e[3]-e[1]],this.viewPortScale=t,this.render()}setFrameSetting(e){this.frameSetting={duration:Math.round(e.duration),fps:Math.round(e.fps)},this.render()}setMusicBuffer(e){this.musicBuffer=e,setTimeout(()=>{this.render()},100)}setLoopSetting(e,t,n){this.loopSetting={enabled:e,start:t,end:n},this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}},Fi={timelineCanvas:`TimelineCanvas__timelineCanvas___LnRpb`},Ii=()=>{let{viewPort:e,viewPortScale:t,musicBuffer:n,musicBufferVersion:r,glEditor:i}=Mi(),[a,o]=(0,y.useState)(),s=(0,y.useRef)(null);(0,y.useEffect)(()=>{let e=new Pi;return o(e),s.current&&e.setWrapperElm(s.current),()=>{e.dispose()}},[]),(0,y.useEffect)(()=>{a&&e&&t&&a.setViewPort(e,t)},[a,e,t]);let[c]=j(i?.engine,`timeline/duration`),[l]=j(i?.engine,`timeline/fps`);(0,y.useEffect)(()=>{a&&c&&l&&a.setFrameSetting({duration:c||0,fps:l||0})},[a,c,l]);let[u]=j(i,`frameLoop/enabled`),[d]=j(i,`frameLoop/start`),[f]=j(i,`frameLoop/end`);return(0,y.useEffect)(()=>{a&&a.setLoopSetting(u||!1,d||0,f||0)},[a,u,d,f]),(0,y.useEffect)(()=>{a&&n&&a.setMusicBuffer(n)},[a,n,r]),(0,E.jsx)(`div`,{className:Fi.timelineCanvas,ref:s})},Li={controls:`TimelineControls__controls___LmNvb`},Ri=e=>{let{viewPort:t,setCurrentFrame:n,getFrameViewPort:r,zoom:i,scroll:a,setViewPortCenter:o}=Mi(),s=(0,y.useRef)([0,0,0,0]),c=(0,y.useRef)([0,0]);t&&(s.current=t,c.current=[t[2]-t[0],t[3]-t[1]]);let l=(0,y.useRef)(null),u=(0,y.useRef)(null),d=(0,y.useRef)(null),f=(0,y.useRef)(null),p=(0,y.useRef)(null),m=(0,y.useCallback)(e=>{let t=l.current&&l.current.clientWidth||1;if(d.current==0){if(n&&r&&u.current){let i=(e.clientX-u.current.left)/t;n(r(i))}}else if(d.current==1){let n=[e.clientX,e.clientY];if(f.current&&p.current){let e=-(n[0]-f.current[0])/t*c.current[0];o&&o(p.current+e)}}},[n,r,o]),h=(0,y.useCallback)(e=>{d.current=e.button,p.current=(s.current[2]+s.current[0])/2,f.current=[e.clientX,e.clientY],u.current=e.currentTarget.getBoundingClientRect();let t=(e.clientX-u.current.left)/e.currentTarget.clientWidth;d.current==0&&n&&r&&n(r(t)),window.addEventListener(`pointermove`,m);let i=()=>{f.current=null,d.current=null,p.current=null,window.removeEventListener(`pointermove`,m)};return window.addEventListener(`pointerup`,i),()=>{window.removeEventListener(`pointerup`,i),window.removeEventListener(`pointermove`,m)}},[r,n,m]),g=(0,y.useCallback)(e=>{if(d.current!==null||!i||!a)return;e.preventDefault();let t=e.target&&e.target.clientWidth||1,n=Math.abs(e.deltaY);Math.abs(e.deltaX)<n?i(n>50?e.deltaY<0?.9:1.1:1+e.deltaY*.005):a(e.deltaX/t*.5)},[i,a]);return(0,y.useEffect)(()=>{let e=l.current;return e&&e.addEventListener(`wheel`,g,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,g)}},[g]),t?(0,E.jsx)(`div`,{className:Li.controls,onPointerDown:h,ref:l,children:e.children}):null},zi={cursor:`TimelineCursor__cursor___LmN1c`,frame:`TimelineCursor__frame___LmN1c`},Bi=()=>{let{viewPort:e,framePlay:t}=Mi();if(!e||!t)return null;let n=e[2]-e[0],r=(t.current-e[0])/n;return(0,E.jsx)(`div`,{className:zi.cursor,style:{left:r*100+`%`},children:(0,E.jsx)(`div`,{className:zi.frame})})},Vi={timelineLoop:`TimelineLoop__timelineLoop___LnRpb`,start:`TimelineLoop__start___LnRpb`,end:`TimelineLoop__end___LnRpb`},Hi={cursor:`TimelineLoopCursor__cursor___LmN1c`},Ui=({onMove:e})=>{let t=(0,y.useRef)(!1);return(0,E.jsx)(`div`,{className:Hi.cursor,onPointerDown:e=>{e.buttons==1&&(t.current=!0,e.stopPropagation())},onPointerMove:n=>{let r=n.target;t.current===!1||n.buttons!=1||(r.setPointerCapture(n.pointerId),n.buttons==1&&e&&e(n.clientX),n.nativeEvent.preventDefault(),n.nativeEvent.stopPropagation())},onPointerUp:()=>{t.current=!1}})},Wi=()=>{let{viewPort:e,framePlay:t,glEditor:n}=Mi(),r=(0,y.useRef)(null);Qe(n,[`frameLoop/enabled`,`frameLoop/start`,`frameLoop/end`]);let[i]=j(n,`frameLoop/enabled`),[a,o]=j(n,`frameLoop/start`),[s,c]=j(n,`frameLoop/end`);if(i!==!0||!e||!t||a===void 0||s===void 0)return null;let l=e[2]-e[0],u=(a-e[0])/l,d=(s-e[0])/l,f=(t,n)=>{let r=t.getBoundingClientRect();return(n-r.x)/r.width*(e[2]-e[0])+e[0]};return(0,E.jsx)(`div`,{className:Vi.timelineLoop,ref:r,children:(0,E.jsxs)(`div`,{className:Vi.timelineLoop_inner,children:[(0,E.jsx)(`div`,{className:Vi.start,style:{left:u*100+`%`},children:(0,E.jsx)(Ui,{onMove:e=>{r.current&&o&&o(f(r.current,e))}})}),(0,E.jsx)(`div`,{className:Vi.end,style:{left:d*100+`%`},children:(0,E.jsx)(Ui,{onMove:e=>{r.current&&c&&c(f(r.current,e))}})})]})})},Gi={scale:`TimelineScale__scale___LnNjY`,scale_inner:`TimelineScale__scale_inner___LnNjY`,scale_item:`TimelineScale__scale_item___LnNjY`,scale_item_frame:`TimelineScale__scale_item_frame___LnNjY`,scale_item_time:`TimelineScale__scale_item_time___LnNjY`},Ki=e=>`${(`00`+Math.floor(e%3600/60)).slice(-2)}:${(`00`+Math.floor(e%60)).slice(-2)}`,qi=()=>{let{glEditor:e,viewPort:t,viewPortScale:n}=Mi(),[r,i]=j(e?.engine,`timeline/fps`);if(!t||!n||r===void 0)return null;let a=[],o=Math.ceil(t[0]/n)*n,s=0;for(;o<t[2]&&s<100;){let e=(o-t[0])/(t[2]-t[0]),i=o/(r||0);a.push((0,E.jsxs)(`div`,{className:Gi.scale_item,style:{left:e*100+`%`},children:[(0,E.jsx)(`div`,{className:Gi.scale_item_frame,children:o}),(0,E.jsx)(`div`,{className:Gi.scale_item_time,children:Ki(i)})]},o)),o+=n,s++}return(0,E.jsx)(`div`,{className:Gi.scale,children:(0,E.jsx)(`div`,{className:Gi.scale_inner,children:a})})},Ji={timelineSetting:`TimelineSetting__timelineSetting___LnRpb`},Yi=()=>{let{framePlay:e,glEditor:t}=Mi(),n=(0,y.useCallback)((e,t)=>{t&&t(e)},[]),[r,i]=j(t,`frameLoop/enabled`),[a,o]=j(t?.engine,`timeline/duration`),[s,c]=j(t?.engine,`timeline/fps`);return(0,E.jsx)(`div`,{className:Ji.timelineSetting,children:(0,E.jsxs)(re,{children:[(0,E.jsx)(fe,{title:`current`,children:(0,E.jsx)(He,{value:Math.floor(e?.current||0),readOnly:!0})}),(0,E.jsx)(fe,{title:`duration`,children:(0,E.jsx)(He,{value:a,onChange:e=>n(e,o)})}),(0,E.jsx)(fe,{title:`fps`,children:(0,E.jsx)(He,{value:s,onChange:e=>n(e,c)})}),(0,E.jsx)(fe,{title:`loop`,children:(0,E.jsx)(He,{value:r||!1,onChange:e=>n(e,i)})})]})})},B={timeline:`Timeline__timeline___LnRpb`,inner:`Timeline__inner___LnRpb`,content:`Timeline__content___LnRpb`,setting:`Timeline__setting___LnRpb`},Xi=()=>{let{editor:e}=Le(),[t,n]=(0,y.useState)({current:0,playing:!1}),[r,i]=(0,y.useState)([0,0,100,0]),a=(0,y.useRef)([0,0,0,0]);a.current=r;let o=r[2]-r[0],s=10*2**(0+Math.floor(Math.log2(o/100)));s=Math.max(1,Math.floor(s));let c=e?.audioBuffer,[l,u]=(0,y.useState)();(0,y.useEffect)(()=>{if(e){let t=e.engine,r=e=>{n({...e})};r(t.frame);let a=0,o=()=>{u(a++)},s=()=>{i([0,0,t.frameSetting.duration,0])};return s(),t.on(`update/frame/play`,r),t.on(`update/music`,o),t.on(`loaded`,s),()=>{t.off(`update/frame/play`,r),t.off(`update/music`,o),t.off(`loaded`,s)}}},[e]);let d=(0,y.useCallback)(t=>{e&&e.engine.seek(t)},[e]),f=(0,y.useCallback)(e=>{let t=r[2]-r[0];return Math.floor(r[0]+t*e)},[r]),p=(0,y.useCallback)(e=>{let t=a.current,n=(t[2]+t[0])/2,r=(t[0]-n)*e+n,o=(t[2]-n)*e+n;i([r,t[1],o,t[3]])},[]),m=(0,y.useCallback)(e=>{let t=a.current,n=e*(t[2]-t[0]);i([t[0]+n,t[1],t[2]+n,t[3]])},[]),h=(0,y.useCallback)(e=>{let t=a.current,n=t[2]-t[0];i([e-n/2,t[1],e+n/2,t[3]])},[]);return{glEditor:e,framePlay:t,viewPort:r,viewPortScale:s,musicBuffer:c,musicBufferVersion:l,setCurrentFrame:d,getFrameViewPort:f,zoom:p,scroll:m,setViewPortCenter:h}},Zi=e=>{let t=Xi();return(0,E.jsx)(ji.Provider,{value:t,children:e.children})},Qi=()=>(0,E.jsx)(Zi,{children:(0,E.jsx)(`div`,{className:B.timeline,children:(0,E.jsxs)(`div`,{className:B.inner,children:[(0,E.jsx)(`div`,{className:B.setting,children:(0,E.jsx)(Yi,{})}),(0,E.jsxs)(`div`,{className:B.content,children:[(0,E.jsx)(Ii,{}),(0,E.jsx)(Bi,{}),(0,E.jsx)(Ri,{children:(0,E.jsx)(Wi,{})}),(0,E.jsx)(qi,{})]})]})})}),$i={editor:`OREditor__editor___LmVka`},ea=128,ta=class extends Ct{_draw;_target;_cache;_pending;_canvas2d;_ctx2d;constructor(e){super(),this._draw=e,this._cache=new Map,this._pending=new Set,this._canvas2d=document.createElement(`canvas`),this._canvas2d.width=ea,this._canvas2d.height=ea,this._ctx2d=this._canvas2d.getContext(`2d`),this._target=e.createTarget({size:new M(ea,ea)})}getTexturePreview(e){let t=`tex:`+e,n=this._cache.get(t);if(n)return n;if(this._pending.has(t))return null;let r=vr.resources.getTexture(e);return r?(this._pending.add(t),this._draw.drawTexture(r,this._target),this._draw.readPixels(this._target).then(e=>{this._pending.delete(t),this._cache.set(t,this._toDataURL(e)),this.emit(`update`)}),null):null}invalidate(e){this._cache.delete(e)}invalidateAll(){this._cache.clear(),this._pending.clear()}_toDataURL(e){let t=this._ctx2d.createImageData(ea,ea);for(let n=0;n<ea;n++){let r=(ea-1-n)*ea*4,i=n*ea*4;for(let n=0;n<ea*4;n++)t.data[i+n]=e[r+n]}return this._ctx2d.putImageData(t,0,0),this._canvas2d.toDataURL()}dispose(){this._cache.clear(),this._pending.clear(),this.off(`update`)}},na=class extends Ct{_undoStack=[];_redoStack=[];_mergeWindow=500;_lastExecuteTime=0;execute(e){let t=Date.now();if(this._undoStack.length>0&&t-this._lastExecuteTime<this._mergeWindow){let n=this._undoStack[this._undoStack.length-1];if(n.mergeWith){let r=n.mergeWith(e);if(r){this._undoStack[this._undoStack.length-1]=r,e.execute(),this._lastExecuteTime=t,this.emit(`change`);return}}}e.execute(),this._undoStack.push(e),this._redoStack=[],this._lastExecuteTime=t,this.emit(`change`)}undo(){let e=this._undoStack.pop();e&&(e.undo(),this._redoStack.push(e),this.emit(`change`))}redo(){let e=this._redoStack.pop();e&&(e.execute(),this._undoStack.push(e),this.emit(`change`))}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}clear(){this._undoStack=[],this._redoStack=[],this.emit(`change`)}},ra=class{entity;componentClass;name=`AddComponent`;instance=null;constructor(e,t){this.entity=e,this.componentClass=t}execute(){this.instance=this.entity.addComponent(this.componentClass),this.instance.initiator=`user`}undo(){this.entity.removeComponent(this.componentClass),this.instance=null}},ia=class{_textureName;_config;name=`AddTexture`;constructor(e,t){this._textureName=e,this._config=t}execute(){vr.resources.addTextureResource(this._textureName,this._config)}undo(){vr.resources.removeTextureResource(this._textureName)}},aa=class{engine;parent;entityName;name=`CreateEntity`;entity=null;constructor(e,t,n){this.engine=e,this.parent=t,this.entityName=n}execute(){this.entity?this.parent.add(this.entity):(this.entity=this.engine.createEntity({name:this.entityName}),this.entity.initiator=`user`,this.parent.add(this.entity))}undo(){this.entity&&this.entity.parent&&this.entity.parent.remove(this.entity)}get createdEntity(){return this.entity}},oa=class{entity;name=`DeleteEntity`;parent=null;constructor(e){this.entity=e}execute(){this.parent=this.entity.parent,this.parent&&this.parent.remove(this.entity)}undo(){this.parent&&this.parent.add(this.entity)}},sa=class{entity;componentClass;component;name=`RemoveComponent`;snapshot=null;constructor(e,t,n){this.entity=e,this.componentClass=t,this.component=n}execute(){this.snapshot=this.component.serialize(),this.entity.removeComponent(this.componentClass)}undo(){let e=this.entity.addComponent(this.componentClass);e.initiator=`user`,this.snapshot&&e.deserialize(this.snapshot),this.component=e}},ca=class{_textureName;name=`RemoveTexture`;_snapshot=null;constructor(e){this._textureName=e}execute(){let e=vr.resources.getTextureResource(this._textureName);e&&(this._snapshot=e.serialize({mode:`export`})),vr.resources.removeTextureResource(this._textureName)}undo(){this._snapshot&&vr.resources.addTextureResource(this._textureName,this._snapshot)}},la=class e{target;path;oldValue;newValue;name=`SetField`;constructor(e,t,n,r){this.target=e,this.path=t,this.oldValue=n,this.newValue=r}execute(){this.target.setField(this.path,this.newValue)}undo(){this.target.setField(this.path,this.oldValue)}mergeWith(t){return t instanceof e&&t.target===this.target&&t.path===this.path?new e(this.target,this.path,this.oldValue,t.newValue):null}},ua=class{_commandManager;_editor;constructor(e){this._editor=e,this._commandManager=new na}setField(e,t,n){let r=e.getField(t);this._commandManager.execute(new la(e,t,r,n))}createEntity(e,t){let n=new aa(this._editor.engine,e,t);return this._commandManager.execute(n),n.createdEntity}deleteEntity(e){this._commandManager.execute(new oa(e))}selectEntity(e){this._editor.selectEntity(e)}addComponent(e,t){let n=new ra(e,t);return this._commandManager.execute(n),n.instance}removeComponent(e,t,n){this._commandManager.execute(new sa(e,t,n))}addTexture(e,t){this._commandManager.execute(new ia(e,t))}removeTexture(e){this._commandManager.execute(new ca(e))}updateTexture(e,t){let n=vr.resources.getTextureResource(e);if(!n)throw Error(`Texture not found: ${e}`);let r=Object.keys(t);for(let e of r){let r=n.getField(e);this._commandManager.execute(new la(n,e,r,t[e]))}}undo(){this._commandManager.undo()}redo(){this._commandManager.redo()}get canUndo(){return this._commandManager.canUndo}get canRedo(){return this._commandManager.canRedo}get commandManager(){return this._commandManager}dispose(){this._commandManager.clear()}},da=s({LookAt:()=>fa}),fa=class extends Nt{target;up;targetWorldPos;targetLocalPos;localUp;lookAtMatrix;parentInverse;constructor(e){super(e),this.target=null,this.targetWorldPos=new M,this.targetLocalPos=new M,this.localUp=new M,this.up=new M(0,1,0),this.lookAtMatrix=new N,this.parentInverse=new N,this.order=100}setTarget(e){this.target=e}postUpdateImpl(e){this.target&&this._enabled&&(this.target.matrixWorld.decompose(this.targetWorldPos),this.targetLocalPos.copy(this.targetWorldPos),this.localUp.copy(this.up),this.entity.parent&&(this.parentInverse.copy(this.entity.parent.matrixWorld).inverse(),this.targetLocalPos.applyMatrix4AsPosition(this.parentInverse),this.localUp.applyMatrix4AsDirection(this.parentInverse).normalize()),this.lookAtMatrix.lookAt(this.entity.position,this.targetLocalPos,this.localUp),this.entity.quaternion.setFromMatrix(this.lookAtMatrix))}},pa=s({OrbitControls:()=>ma}),ma=class extends Nt{keyborad_;_pointer;orbit_;mouseVelOrbit_;mouseVelMove_;eye_;target_;up_;lookatMatrix_;distance_;distanceVel_;_memPos;_memTarget;_multiTouching;elmDisposer;constructor(e){super(e),this._pointer=new br,this.keyborad_=new yr,this.orbit_=new M,this.mouseVelOrbit_=new M,this.mouseVelMove_=new M,this.target_=new M,this.eye_=new M,this.up_=new M(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new N,this._memPos=new M,this._memTarget=new M,this._multiTouching=!1,this.order=999;let t=!1,n=e=>{t||=!0},r=e=>{if(!this._enabled||!t||this._multiTouching)return;let n={x:e.delta.x*1,y:e.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(n):this.mouseVelOrbit_.add(n),e.pointerEvent.preventDefault(),e.pointerEvent.stopPropagation()},i=e=>{t&&=!1};this._pointer.on(`move`,r),this._pointer.on(`start`,n),this._pointer.on(`end`,i),this.once(`dispose`,()=>{this._pointer.off(`move`,r),this._pointer.off(`start`,n),this._pointer.off(`end`,i)}),this.setPosition(this.entity.position,this.target_)}set enabled(e){if(this._enabled=e,e){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);let e=this.entity.getComponent(fa);e&&e.target&&this.setPosition(this.entity.position,e.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}get eye(){return this.eye_}get target(){return this.target_}setElm(e){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(e);let t=new Map,n=()=>{let e=Array.from(t.values());if(e.length<2)return 0;let n=e[1].x-e[0].x,r=e[1].y-e[0].y;return Math.sqrt(n*n+r*r)},r=()=>{let e=Array.from(t.values());return e.length<2?{x:0,y:0}:{x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2}},i=0,a={x:0,y:0},o=e=>{e.pointerType===`touch`&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),t.size===2&&(this._multiTouching=!0,i=n(),a=r()))},s=e=>{if(e.pointerType===`touch`&&t.has(e.pointerId)&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._enabled&&t.size>=2)){let e=n(),t=e-i;this.distanceVel_+=-t*5,i=e;let o=r(),s=o.x-a.x,c=o.y-a.y;this.mouseVelMove_.add({x:s,y:c}),a=o}},c=e=>{e.pointerType===`touch`&&(t.delete(e.pointerId),t.size<2&&(this._multiTouching=!1,i=0))};e.addEventListener(`pointerdown`,o),e.addEventListener(`pointermove`,s),e.addEventListener(`pointerup`,c),e.addEventListener(`pointercancel`,c);let l=e=>{e.preventDefault(),this._enabled&&(this.distanceVel_+=e.deltaY)};e.addEventListener(`wheel`,l),this.elmDisposer=()=>{e.removeEventListener(`pointerdown`,o),e.removeEventListener(`pointermove`,s),e.removeEventListener(`pointerup`,c),e.removeEventListener(`pointercancel`,c),e.removeEventListener(`wheel`,l)}}calc(e){let t=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new N().makeRotationAxis({x:1,y:0,z:0},Math.min(t,Math.max(-t,this.orbit_.x)))),this.eye_.applyMatrix3(new N().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(e.position,e.quaternion,e.scale)}updateImpl(e){let t=new M(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);t.applyMatrix3(this.entity.matrix),this.target_.add(t),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);let n=Math.max(0,1-e.timeDelta*10);this.mouseVelOrbit_.multiply(n),this.mouseVelMove_.multiply(n),this.distanceVel_*=n,this.calc(this.entity)}addOrbitVelocity(e,t){this._enabled&&this.mouseVelOrbit_.add({x:e,y:t})}addMoveVelocity(e,t){this._enabled&&this.mouseVelMove_.add({x:e,y:t})}addDistanceVelocity(e){this._enabled&&(this.distanceVel_+=e)}setPosition(e,t){if(this.eye_.copy(e),this.target_.copy(t),this.entity){let e=this.entity.parent;e&&(e.updateMatrix(!0),this.target_.applyMatrix4(e.matrixWorld.clone().inverse()))}let n=this.eye_.x-this.target_.x,r=this.eye_.y-this.target_.y,i=this.eye_.z-this.target_.z;this.orbit_.x=Math.atan2(r,Math.sqrt(n*n+i*i)),this.orbit_.y=-Math.atan2(n,i),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0),this.distanceVel_=0}dispose(){super.dispose(),this._pointer.dispose()}},ha={motionBlur:!1,dof:!1},ga=1.3,_a=1,va=.1,ya=class{_entity;_camera;_orbitControls;_view;_preview;constructor(e){this._entity=e.createEntity({name:`__editorCamera`}),this._camera=this._entity.addComponent(zt),this._orbitControls=this._entity.addComponent(ma),this._orbitControls.setElm(e.canvas),this._view=`editor`,this._preview=!1,this._apply(e)}get entity(){return this._entity}get camera(){return this._camera}get orbitControls(){return this._orbitControls}get view(){return this._view}get preview(){return this._preview}get usingEditorCamera(){return!this._preview&&this._view===`editor`}setView(e,t){this._view=e,this._apply(t)}setPreview(e,t){this._preview=e,this._apply(t)}_apply(e){this.usingEditorCamera?(e.cameraEntity!==this._entity&&this.syncFromSceneCamera(e),e.cameraEntity=this._entity,this._orbitControls.enabled=!0):(e.cameraEntity=null,this._orbitControls.enabled=!1),this.syncPipelineOverride(e)}syncPipelineOverride(e){e.renderer.setPipelineOverride(this.usingEditorCamera?ha:null)}focus(e){e.updateMatrixRecursive(!0);let t=this._getWorldBounds(e),n=new M,r=_a;t?(n.copy(t.min).add(t.max).multiply(.5),r=Math.max(t.max.clone().sub(t.min).length()*.5,va)):e.matrixWorld.decompose(n);let i=r/Math.tan(this._camera.fov*Math.PI/360)*ga,a=this._orbitControls.eye.clone().sub(this._orbitControls.target);a.length()<1e-6&&a.set(0,0,1),a.normalize().multiply(i),this._orbitControls.setPosition(n.clone().add(a),n)}_getWorldBounds(e){let t=new M(1/0,1/0,1/0),n=new M(-1/0,-1/0,-1/0),r=!1;return e.traverse(e=>{if(!e.visible)return;let i=e.getComponent(F);if(!i)return;let a=i.geometry.boundingBox;if(a){for(let r=0;r<8;r++){let i=new M(r&1?a.max.x:a.min.x,r&2?a.max.y:a.min.y,r&4?a.max.z:a.min.z).applyMatrix4AsPosition(e.matrixWorld);t.x=Math.min(t.x,i.x),t.y=Math.min(t.y,i.y),t.z=Math.min(t.z,i.z),n.x=Math.max(n.x,i.x),n.y=Math.max(n.y,i.y),n.z=Math.max(n.z,i.z)}r=!0}}),r?{min:t,max:n}:null}getCameraEntity(e){return e.resolveCameraEntity()}updateBeforeRender(e){if(!this.usingEditorCamera)return;let t=e.createEntityUpdateEvent();this._entity.updateMatrix(),this._camera.aspect=e.renderer.resolution.x/e.renderer.resolution.y,this._camera.needsUpdateProjectionMatrix=!0,this._entity.update(t),this._entity.postUpdate(t),this._entity.updateMatrixRecursive(),this._entity.prepareRender(t)}updateAfterRender(e){if(!this.usingEditorCamera)return;let t=e.createEntityUpdateEvent();this._entity.commitFrame(t)}resize(e){this._camera.aspect=e.x/e.y,this._camera.needsUpdateProjectionMatrix=!0}dispose(){this._entity.dispose()}syncFromSceneCamera(e){let t=e.findSceneCameraEntity();if(!t)return;let n=new M;t.matrixWorld.decompose(n);let r=t.getComponentsByTag(`camera`)[0];this._orbitControls.setPosition(n,this._resolveOrbitTarget(t,r,n)),r&&(this._camera.fov=r.fov,this._camera.near=r.near,this._camera.far=r.far,this._camera.needsUpdateProjectionMatrix=!0)}_resolveOrbitTarget(e,t,n){let r=Math.max(t?t.dofParams.focusDistance:5,.1),i=new M(0,0,-1,0).applyMatrix3(e.matrixWorld).normalize();return n.clone().add(i.multiply(r))}},ba=class extends Ct{_draw;_elm;_outTarget;_frameLabels;_enable;_resolution;_count;_total;_tile;_tilePixelSize;_tileInv;_focus;_prevFrameLabels;_labelCount;_overlay;constructor(e,t){super(),this._draw=t,this._elm=e,this._outTarget=t.createTarget(),this._enable=!1,this._count=0,this._total=1,this._tile=new M(1,1),this._tilePixelSize=new M(1,1),this._tileInv=new M(1,1),this._focus=null,this._frameLabels=[],this._prevFrameLabels=[],this._labelCount=new Map,this._resolution=new M,this._overlay=document.createElement(`div`),this._overlay.style.cssText=`position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;color:#fff;font-family:'Courier New',monospace;font-weight:500;mix-blend-mode:difference;`,t.onDrawPass((e,t)=>this._push(e,t));let n=new M(0,0),r=this._onClick.bind(this),i=e=>{n.set(e.clientX,e.clientY)},a=e=>{let t=new M(e.clientX,e.clientY);n.clone().sub(t).length()<10&&r(e)};this._elm.addEventListener(`pointerdown`,i),this._elm.addEventListener(`pointerup`,a);let o=e=>{if(e.key===`Escape`&&(this._focus=null,this._clear()),e.key==`ArrowRight`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.min(e+1,this._prevFrameLabels.length-1);this._focus=this._prevFrameLabels[t]??this._focus}if(e.key==`ArrowLeft`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.max(e-1,0);this._focus=this._prevFrameLabels[t]??this._focus}};window.addEventListener(`keydown`,o),this.once(`dispose`,()=>{this._elm.removeEventListener(`pointerdown`,i),this._elm.removeEventListener(`pointerup`,a),window.removeEventListener(`keydown`,o),this._overlay.remove()})}_calcTilePos(e){return{x:e%this._tile.x*this._tileInv.x*this._resolution.x,y:Math.floor(e/this._tile.x)*this._tileInv.y*this._resolution.y}}_push(e,t){if(!this._enable)return;let n=t||String(this._count),r=this._labelCount.get(n)||0;this._labelCount.set(n,r+1);let i=r>0?n+`#`+r:n;if(this._focus==null||this._focus==i){let{x:t,y:n}=this._calcTilePos(this._count);this._focus!==null&&(t=0,n=0),this._draw.blit(e,this._outTarget,{x:t,y:n,width:this._tilePixelSize.x,height:this._tilePixelSize.y}),this._frameLabels.push(i)}this._count++}draw(){this._draw.blit(this._outTarget,null),this._drawLabels(),this._clear()}_drawLabels(){let e=this._elm.parentElement;e&&(this._overlay.parentElement!==e&&e.appendChild(this._overlay),this._overlay.style.fontSize=Math.max(10,this._elm.clientHeight/1080*28)+`px`,this._overlay.replaceChildren(...this._frameLabels.map((e,t)=>{let n=document.createElement(`div`);return n.textContent=e,n.style.cssText=`position:absolute;transform:translateY(-100%);white-space:nowrap;`,n.style.left=t%this._tile.x*this._tileInv.x*100+`%`,n.style.top=(Math.floor(t/this._tile.x)+1)*this._tileInv.y*100+`%`,n.style.paddingLeft=`5px`,n})))}_clear(){this._total=this._count,this._prevFrameLabels=this._frameLabels;let e=Math.sqrt(this._focus===null?Math.max(this._total,1):1);this._tile.set(Math.round(e),Math.ceil(e)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameLabels=[],this._count=0,this._labelCount.clear()}reflesh(){this.resize(this._resolution)}resize(e){this._resolution.copy(e)}_onClick(e){if(this._enable){if(this.reflesh(),this._focus===null){let t=new M(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),n=Math.floor(e.offsetX/t.x)+Math.floor(e.offsetY/t.y)*this._tile.x;n>=0&&n<this._prevFrameLabels.length&&(this._focus=this._prevFrameLabels[n])}this._clear()}}set enable(e){this._enable=e,e?this.reflesh():this._overlay.remove()}get enable(){return this._enable}dispose(){this.emit(`dispose`)}};function xa(e,t){let n=e.clone().normalize(),r=Math.sin(t/2),i=new ct;return i.set(n.x*r,n.y*r,n.z*r,Math.cos(t/2)),i}function Sa(e,t){let n=e.clone().normalize(),r=t.clone().normalize(),i=n.dot(r);if(i>.99999)return new ct;if(i<-.99999){let e=Math.abs(n.x)>.9?new M(0,1,0):new M(1,0,0);return xa(n.clone().cross(e),Math.PI)}return xa(n.clone().cross(r),Math.acos(Math.min(1,Math.max(-1,i))))}function Ca(e){let t=new ct;return e.matrixWorld.decompose(void 0,t),t}function wa(e,t){return e.clone().applyMatrix4AsDirection(new N().applyQuaternion(t))}function Ta(e,t,n){let r=new M(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:wa(r,Ca(e)).normalize()}function Ea(e,t,n){return e.clone().multiply(t.clone().multiply(n))}function Da(e,t,n){let r=e.origin.clone().sub(t),i=e.direction.dot(n),a=r.dot(n),o=r.dot(e.direction),s=1-i*i+1e-4;return a+(a*i-o)/s*i}function V(e,t,n){let r=e.direction.dot(n);if(Math.abs(r)<1e-4)return null;let i=t.clone().sub(e.origin).dot(n)/r;return e.origin.clone().add(e.direction.clone().multiply(i))}var Oa={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},ka={xy:`z`,yz:`x`,xz:`y`},Aa={xy:[`x`,`y`],yz:[`y`,`z`],xz:[`x`,`z`]},ja=[.75,.75,.75],Ma=[1,.95,.4],Na=.45,Pa=.18,Fa=class e{static VIEW_SCALE_FACTOR=.15;entity;_engine;_draw;_orientation;_camWorldPos;_records;_hoverHandle;_activeHandle;_dragging;constructor(e,t,n){this._engine=e,this._draw=t,this.entity=e.createEntity({name:n}),this.entity.initiator=`god`,this.entity.visible=!1,this._orientation=`global`,this._camWorldPos=new M,this._records=[],this._hoverHandle=null,this._activeHandle=null,this._dragging=!1}_createEntity(e){let t=this._engine.createEntity({name:e});return t.initiator=`god`,t}_registerHandle(e,t,n){let r=[...n];return this._records.push({handle:e,root:t,color:r,baseColor:[...n]}),this.entity.add(t),r}_addVisual(e,t,n){let r=this._createEntity(`__gizmo_visual`);return r.addComponent(F,{geometry:t,material:this._draw.materials.flat({color:n,depthTest:!1,depthWrite:!1})}),e.add(r),r}_addHit(e,t){let n=this._createEntity(`__gizmo_hit`);return n.addComponent(F,{geometry:t}),e.add(n),n}_addPlaneHandle(e){let t=this._createEntity(`__gizmo_plane_`+e),n=this._registerHandle(e,t,Oa[ka[e]]);return this._addVisual(t,new Lt({width:Pa,height:Pa}),n),this._addHit(t,new Lt({width:Pa*1.6,height:Pa*1.6})),e===`yz`?(t.euler.set(0,Math.PI/2,0),t.position.set(0,Na,Na)):e===`xz`?(t.euler.set(Math.PI/2,0,0),t.position.set(Na,0,Na)):t.position.set(Na,Na,0),t}_addCenterHandle(){let e=this._createEntity(`__gizmo_center`),t=this._registerHandle(`center`,e,ja);return this._addVisual(e,new Gt({innerRadius:.1,outerRadius:.14,thetaSegments:24}),t),this._addHit(e,new Rt({radius:.16,widthSegments:8,heightSegments:6})),e}setHover(e){this._hoverHandle!==e&&(this._hoverHandle=e,this._updateColors())}_updateColors(){let e=this._dragging?this._activeHandle:this._hoverHandle;for(let t of this._records){let n=t.handle===e?Ma:t.baseColor;t.color[0]=n[0],t.color[1]=n[1],t.color[2]=n[2]}}getHandleEntities(){let e=[];for(let t of this._records)t.root.traverse(n=>{let r=n.getComponent(F);r&&!r.material&&e.push({handle:t.handle,entity:n})});return e}setTarget(t,n,r){if(this._orientation=r,!t){this.entity.visible=!1;return}if(this.entity.visible=!0,this.entity.quaternion.copy(this._rootQuaternion(t,r)),this.entity.position.set(t.matrixWorld.elm[12],t.matrixWorld.elm[13],t.matrixWorld.elm[14]),n){let t=n.matrixWorld.elm;this._camWorldPos.set(t[12],t[13],t[14]);let r=this._camWorldPos.distanceTo(this.entity.position),i=Math.max(.01,r*e.VIEW_SCALE_FACTOR);this.entity.scale.set(i,i,i)}this._onTargetUpdated()}_rootQuaternion(e,t){return t===`local`?Ca(e):new ct}_onTargetUpdated(){}_camDirLocal(){return wa(this._camWorldPos.clone().sub(this.entity.position).normalize(),this.entity.quaternion.clone().inverse()).normalize()}_billboardQuat(){return Sa(new M(0,0,1),this._camDirLocal())}get activeHandle(){return this._activeHandle}get dragging(){return this._dragging}startDrag(e,t,n){this._activeHandle=e,this._dragging=!0,this._updateColors(),this._onStartDrag(e,t,n)}endDrag(){this._activeHandle=null,this._dragging=!1,this._updateColors()}},Ia=[`x`,`y`,`z`];function La(e,t,n){let r=[],i=[],a=[],o=[];for(let s=0;s<=n;s++){let c=-Math.PI/2+s/n*Math.PI,l=Math.cos(c),u=Math.sin(c);if(r.push(l*e,u*e,0),r.push(l*t,u*t,0),i.push(0,0,1,0,0,1),a.push(s/n,0,s/n,1),s<n){let e=s*2;o.push(e,e+1,e+2,e+1,e+3,e+2)}}let s=new Pt;return s.setAttribute(`position`,new Float32Array(r),3),s.setAttribute(`normal`,new Float32Array(i),3),s.setAttribute(`uv`,new Float32Array(a),2),s.setAttribute(`index`,new Uint16Array(o),1),s}var Ra=class extends Fa{_rings;_viewRoot;_dragCenter;_dragViewNormal;_dragU;_dragV;_dragAxisN;_dragSign;_dragLastAngle;_dragAccumAngle;_dragStartWorldQuat;_parentWorldQuatInv;constructor(e,t){super(e,t,`__gizmo_rotate`),this._dragCenter=new M,this._dragViewNormal=new M(0,0,1),this._dragU=new M(1,0,0),this._dragV=new M(0,1,0),this._dragAxisN=new M(0,0,1),this._dragSign=1,this._dragLastAngle=0,this._dragAccumAngle=0,this._dragStartWorldQuat=new ct,this._parentWorldQuatInv=new ct;let n={x:xa(new M(0,1,0),Math.PI/2),y:xa(new M(1,0,0),-Math.PI/2),z:new ct};this._rings={};for(let e of Ia){let t=this._createEntity(`__gizmo_ring_`+e),r=this._registerHandle(e,t,Oa[e]);this._addVisual(t,La(.75,.8,48),r),this._addHit(t,La(.6,.95,24)),this._rings[e]={wrapper:t,base:n[e],baseInv:n[e].clone().inverse()}}this._viewRoot=this._createEntity(`__gizmo_ring_view`);let r=this._registerHandle(`view`,this._viewRoot,ja);this._addVisual(this._viewRoot,new Gt({innerRadius:1,outerRadius:1.05,thetaSegments:64}),r),this._addHit(this._viewRoot,new Gt({innerRadius:.92,outerRadius:1.13,thetaSegments:32}))}_onTargetUpdated(){let e=this._camDirLocal();for(let t of Ia){let n=this._rings[t],r=wa(e,n.baseInv),i=Math.atan2(r.y,r.x);n.wrapper.quaternion.copy(n.base.clone().multiply(xa(new M(0,0,1),i)))}this._viewRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){this._dragCenter.copy(this.entity.position);let r=t.origin.clone().sub(this._dragCenter).normalize(),i=Math.abs(r.y)>.99?new M(1,0,0):new M(0,1,0);this._dragViewNormal=r,this._dragU=i.cross(r).normalize(),this._dragV=r.clone().cross(this._dragU).normalize(),e===`view`?(this._dragAxisN=r.clone(),this._dragSign=1):(this._dragAxisN=Ta(n,e,this._orientation),this._dragSign=this._dragAxisN.dot(r)<0?-1:1),this._dragLastAngle=this._angleFromRay(t)??0,this._dragAccumAngle=0,this._dragStartWorldQuat=Ca(n),this._parentWorldQuatInv=n.parent?Ca(n.parent).inverse():new ct}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this._angleFromRay(e);if(n===null)return null;let r=n-this._dragLastAngle;r>Math.PI?r-=Math.PI*2:r<-Math.PI&&(r+=Math.PI*2),this._dragAccumAngle+=r,this._dragLastAngle=n;let i=xa(this._dragAxisN,this._dragAccumAngle*this._dragSign),a=Ea(this._parentWorldQuatInv,i,this._dragStartWorldQuat);return{euler:new st().setFromQuaternion(a)}}_angleFromRay(e){let t=V(e,this._dragCenter,this._dragViewNormal);if(!t)return null;let n=t.sub(this._dragCenter);return Math.atan2(n.dot(this._dragV),n.dot(this._dragU))}},za=.25,Ba=.85,Va=.02,Ha=.1,Ua=.001,Wa=1e-4,Ga=[`x`,`y`,`z`],Ka=[`xy`,`yz`,`xz`],qa=class extends Fa{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartAmount;_dragPlaneNormal;_dragStartScale;constructor(e,t){super(e,t,`__gizmo_scale`),this._dragStartPos=new M,this._dragAxisDir=new M(1,0,0),this._dragStartAmount=1,this._dragPlaneNormal=new M(0,0,1),this._dragStartScale=new M(1,1,1);for(let e of Ga)this._addAxisHandle(e);for(let e of Ka)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addAxisHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,Oa[e]),r=Ba-za,i=this._addVisual(t,new It({radiusTop:Va,radiusBottom:Va,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new Ft({width:Ha,height:Ha,depth:Ha}),n);a.position.set(0,.9,0),this._addHit(t,new It({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new Ft({width:Ha*2,height:Ha*2,depth:Ha*2})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_rootQuaternion(e,t){return Ca(e)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragStartScale.set(n.scale.x,n.scale.y,n.scale.z),e===`x`||e===`y`||e===`z`){this._dragAxisDir=Ta(n,e,`local`);let r=Da(t,this._dragStartPos,this._dragAxisDir);this._dragStartAmount=Math.abs(r)<Wa?Wa:r;return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():Ta(n,ka[e],`local`);let r=V(t,this._dragStartPos,this._dragPlaneNormal),i=r?r.sub(this._dragStartPos).length():0;this._dragStartAmount=Math.max(Wa,i)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle,r;if(n===`x`||n===`y`||n===`z`)r=Da(e,this._dragStartPos,this._dragAxisDir)/this._dragStartAmount;else{let t=V(e,this._dragStartPos,this._dragPlaneNormal);if(!t)return null;r=t.sub(this._dragStartPos).length()/this._dragStartAmount}Math.abs(r)<Ua&&(r=r<0?-.001:Ua);let i={x:!1,y:!1,z:!1};if(n===`center`)i.x=i.y=i.z=!0;else if(n===`x`||n===`y`||n===`z`)i[n]=!0;else for(let e of Aa[n])i[e]=!0;return{scale:new M(this._dragStartScale.x*(i.x?r:1),this._dragStartScale.y*(i.y?r:1),this._dragStartScale.z*(i.z?r:1))}}},Ja=.25,Ya=.85,Xa=.02,Za=.22,Qa=.06,$a=[`x`,`y`,`z`],eo=[`xy`,`yz`,`xz`],to=class extends Fa{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartProjection;_dragPlaneNormal;_dragPlaneStart;constructor(e,t){super(e,t,`__gizmo_translate`),this._dragStartPos=new M,this._dragAxisDir=new M(1,0,0),this._dragStartProjection=0,this._dragPlaneNormal=new M(0,0,1),this._dragPlaneStart=null;for(let e of $a)this._addArrowHandle(e);for(let e of eo)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addArrowHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,Oa[e]),r=Ya-Ja,i=this._addVisual(t,new It({radiusTop:Xa,radiusBottom:Xa,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new It({radiusTop:.001,radiusBottom:Qa,height:Za,radSegments:8,heightSegments:1,caps:!0}),n);a.position.set(0,.96,0),this._addHit(t,new It({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new It({radiusTop:.001,radiusBottom:.11,height:Za*1.5,radSegments:6,heightSegments:1,caps:!0})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragPlaneStart=null,e===`x`||e===`y`||e===`z`){this._dragAxisDir=Ta(n,e,this._orientation),this._dragStartProjection=Da(t,this._dragStartPos,this._dragAxisDir);return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():Ta(n,ka[e],this._orientation),this._dragPlaneStart=V(t,this._dragStartPos,this._dragPlaneNormal)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle;if(n===`x`||n===`y`||n===`z`){let t=Da(e,this._dragStartPos,this._dragAxisDir)-this._dragStartProjection;return{position:this._dragStartPos.clone().add(this._dragAxisDir.clone().multiply(t))}}if(!this._dragPlaneStart)return null;let r=V(e,this._dragStartPos,this._dragPlaneNormal);return r?{position:this._dragStartPos.clone().add(r.sub(this._dragPlaneStart))}:null}},no=class{_draw;_translateGizmo;_rotateGizmo;_scaleGizmo;_activeGizmo;_mode;_orientation;_showGizmo;constructor(e,t){this._draw=t,this._translateGizmo=new to(e,t),this._rotateGizmo=new Ra(e,t),this._scaleGizmo=new qa(e,t),this._mode=`select`,this._orientation=`global`,this._activeGizmo=null,this._showGizmo=!0}get showGizmo(){return this._showGizmo}set showGizmo(e){this._showGizmo=e}get activeGizmo(){return this._activeGizmo}get mode(){return this._mode}setMode(e){this._mode=e,this._activeGizmo&&this._activeGizmo.setHover(null),e===`translate`?this._activeGizmo=this._translateGizmo:e===`rotate`?this._activeGizmo=this._rotateGizmo:e===`scale`?this._activeGizmo=this._scaleGizmo:this._activeGizmo=null}get orientation(){return this._orientation}setOrientation(e){this._orientation=e}render(e,t,n){if(this._translateGizmo.entity.visible=!1,this._rotateGizmo.entity.visible=!1,this._scaleGizmo.entity.visible=!1,!this._showGizmo||!this._activeGizmo||(this._activeGizmo.setTarget(e||null,t,this._orientation),!this._activeGizmo.entity.visible))return;this._activeGizmo.entity.updateMatrix(!0);let r=n.createEntityUpdateEvent();if(this._activeGizmo.entity.update(r),!t)return;let i=[];this._activeGizmo.entity.traverse(e=>{let t=e.getComponent(F);t&&t.material&&i.push(e)}),i.length>0&&this._draw.renderEntities({camera:t,entities:i,target:null})}},ro=class extends Pt{constructor(){super(),this.update(50,1,.1,10)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,a,-n,o,-a,-n,o,-a,-n,-o,-a,-n,-o,-a,-n,-o,a,-n,-c,s,-r,c,s,-r,c,s,-r,c,-s,-r,c,-s,-r,-c,-s,-r,-c,-s,-r,-c,s,-r,-o,a,-n,-c,s,-r,o,a,-n,c,s,-r,o,-a,-n,c,-s,-r,-o,-a,-n,-c,-s,-r]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.requestUpdate()}},io=class extends Pt{constructor(){super(),this.update(50,1,.1,2)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,-a,-n,-o,-a,-n,-c,s,-r,c,s,-r,c,-s,-r,-c,-s,-r]),u=new Uint16Array([0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,6,2,3,7,6,0,4,7,0,7,3,1,2,6,1,6,5]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.setAttribute(`index`,u,1),this.requestUpdate()}},ao=class extends Pt{constructor(e=.5){super();let t=[];for(let n=0;n<16;n++){let r=n/16*Math.PI*2,i=(n+1)/16*Math.PI*2;t.push(Math.cos(r)*e,Math.sin(r)*e,0,Math.cos(i)*e,Math.sin(i)*e,0)}let n=e*2;for(let r=0;r<4;r++){let i=r/4*Math.PI*2,a=Math.cos(i)*e*.5,o=Math.sin(i)*e*.5;t.push(a,o,0,a,o,-n)}let r=new Float32Array(t);this.setAttribute(`position`,r,3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3)}},oo=class extends Pt{constructor(e=.5){super();let t=e*2,n=[],r=[];n.push(0,0,0);for(let t=0;t<12;t++){let r=t/12*Math.PI*2;n.push(Math.cos(r)*e,Math.sin(r)*e,0)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(0,e+1,t+1)}n.push(0,0,-t);for(let r=0;r<12;r++){let i=r/12*Math.PI*2;n.push(Math.cos(i)*e,Math.sin(i)*e,-t)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(13,13+t+1,13+e+1)}for(let e=0;e<12;e++){let t=(e+1)%12,n=e+1,i=t+1,a=13+e+1,o=13+t+1;r.push(n,a,o),r.push(n,o,i)}this.setAttribute(`position`,new Float32Array(n),3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(r),1)}},so=class extends Pt{constructor(e=.3){super();let t=e/2,n=new Float32Array([-t,0,0,t,0,0,0,-t,0,0,t,0,0,0,-t,0,0,t]);this.setAttribute(`position`,n,3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3)}},co=class extends Pt{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[];for(let e=0;e<16;e++){let i=e/16*Math.PI*2,a=(e+1)/16*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t,Math.cos(a)*n,Math.sin(a)*n,-t)}for(let e=0;e<4;e++){let i=e/4*Math.PI*2;r.push(0,0,0,Math.cos(i)*n,Math.sin(i)*n,-t)}let i=new Float32Array(r);this.setAttribute(`position`,i,3),this.setAttribute(`normal`,new Float32Array(i.length).fill(0),3),this.requestUpdate()}},lo=class extends Pt{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[0,0,0];for(let e=0;e<12;e++){let i=e/12*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t)}let i=[];for(let e=0;e<12;e++){let t=(e+1)%12;i.push(0,e+1,t+1)}for(let e=1;e<11;e++)i.push(1,e+2,e+1);this.setAttribute(`position`,new Float32Array(r),3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(i),1),this.requestUpdate()}},uo=class{entity;hitAreaEntity;type;targetEntityUUID;_geometry;_hitAreaGeometry;_matrixOffset;_baseColor;_colorUniform;constructor(e,t,n,r){this.type=n,this.targetEntityUUID=r,this.entity=e.createEntity({name:`__helper`}),this.entity.initiator=`god`;let i=this._getColor();this._baseColor=i,this._colorUniform=[...i];let a=t.materials.flat({color:this._colorUniform,lines:!0});this._geometry=this._createGeometry(),this.entity.addComponent(F,{geometry:this._geometry,material:a}),this._hitAreaGeometry=this._createHitAreaGeometry(),this.hitAreaEntity=e.createEntity({name:`__helper_hit`}),this.hitAreaEntity.initiator=`god`,this._hitAreaGeometry&&this.hitAreaEntity.addComponent(F,{geometry:this._hitAreaGeometry}),n===`spotLight`||n===`directionalLight`?this._matrixOffset=new ct().setFromEuler({x:-Math.PI/2,y:0,z:0}):this._matrixOffset=null}_getColor(){switch(this.type){case`empty`:return[.8,.5,.2];case`camera`:return[.6,.8,1];case`spotLight`:return[1,.9,.4];case`directionalLight`:return[1,.9,.4]}}_createGeometry(){switch(this.type){case`empty`:return new so;case`camera`:return new ro;case`spotLight`:return new co;case`directionalLight`:return new ao}}_createHitAreaGeometry(){switch(this.type){case`empty`:return null;case`camera`:return new io;case`spotLight`:return new lo;case`directionalLight`:return new oo}}getWorldSegments(){let e=this._geometry.getAttribute(`position`);if(!e)return[];let t=e.array,n=[];for(let e=0;e+5<t.length;e+=6)n.push({a:new M(t[e+0],t[e+1],t[e+2]).applyMatrix4AsPosition(this.entity.matrixWorld),b:new M(t[e+3],t[e+4],t[e+5]).applyMatrix4AsPosition(this.entity.matrixWorld)});return n}setSelected(e){let t=e?[1,.6,0]:this._baseColor;this._colorUniform[0]=t[0],this._colorUniform[1]=t[1],this._colorUniform[2]=t[2]}syncTransform(e){if(this.entity.matrixWorld.copy(e.matrixWorld),this.hitAreaEntity.matrixWorld.copy(e.matrixWorld),this._matrixOffset&&(this.entity.matrixWorld.applyQuaternion(this._matrixOffset),this.hitAreaEntity.matrixWorld.applyQuaternion(this._matrixOffset)),this.type===`camera`){let t=e.getComponentsByTag(`camera`)[0];t&&(this._geometry instanceof ro&&this._geometry.update(t.fov,t.aspect,.1,2),this._hitAreaGeometry instanceof io&&this._hitAreaGeometry.update(t.fov,t.aspect,.1,2))}else if(this.type===`spotLight`){let t=e.getComponent(Vt);if(t){let e=Math.min(t.distance,10);this._geometry instanceof co&&this._geometry.update(t.angle,e),this._hitAreaGeometry instanceof lo&&this._hitAreaGeometry.update(t.angle,e)}}}},fo=class{_engine;_draw;_showHelpers;_showEmptyHelpers;_showCameraHelpers;_showLightHelpers;_helpers;constructor(e,t){this._engine=e,this._draw=t,this._showHelpers=!0,this._showEmptyHelpers=!0,this._showCameraHelpers=!0,this._showLightHelpers=!0,this._helpers=new Map}get showHelpers(){return this._showHelpers}set showHelpers(e){this._showHelpers=e}get showEmptyHelpers(){return this._showEmptyHelpers}set showEmptyHelpers(e){this._showEmptyHelpers=e}get showCameraHelpers(){return this._showCameraHelpers}set showCameraHelpers(e){this._showCameraHelpers=e}get showLightHelpers(){return this._showLightHelpers}set showLightHelpers(e){this._showLightHelpers=e}render(e,t,n){if(!this._showHelpers||!e)return;let r=new Set,i=[];t.root.traverse(a=>{if(a.initiator===`god`||!a.visible||a===e)return;let o=this._getHelperType(a);if(!o||!this._isHelperTypeEnabled(o))return;r.add(a.uuid);let s=this._helpers.get(a.uuid);s||(s=new uo(this._engine,this._draw,o,a.uuid),this._helpers.set(a.uuid,s));let c=t.createEntityUpdateEvent();s.entity.update(c),s.hitAreaEntity.update(c),s.setSelected(a.uuid===n),s.syncTransform(a),s.entity.traverse(e=>{e.getComponent(F)&&i.push(e)})}),this._helpers.forEach((e,t)=>{r.has(t)||this._helpers.delete(t)}),i.length>0&&this._draw.renderEntities({camera:e,entities:i,target:null})}getHelpers(){return Array.from(this._helpers.values())}_getHelperType(e){let t=e.getComponent(Vt);return t?t.lightType===`spot`?`spotLight`:`directionalLight`:e.getComponentsByTag(`camera`)[0]?`camera`:e.getComponent(F)?null:`empty`}_isHelperTypeEnabled(e){switch(e){case`empty`:return this._showEmptyHelpers;case`camera`:return this._showCameraHelpers;case`spotLight`:case`directionalLight`:return this._showLightHelpers}}},po=()=>{let e=document.activeElement;return e?e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.isContentEditable:!1},mo=class{_keyboard;constructor(e){this._keyboard=new yr,this._keyboard.on(`keydown`,(t,n)=>{if(t.isComposing)return;let r=n.Meta||n.Control;r&&n.s&&(t.preventDefault(),e.onSave()),!po()&&(e.onTransformKey(t)||(r&&n.z&&(t.preventDefault(),n.Shift?e.onRedo():e.onUndo()),t.key==` `&&!r&&e.onPlayToggle(),(t.code===`Numpad0`||t.key===`0`)&&!r&&e.onCameraViewToggle(),t.key===`9`&&!r&&e.onPreviewToggle(),t.key===`Escape`&&!r&&e.onSyncToSceneCamera(),(t.code===`NumpadDecimal`||t.key===`.`)&&!r&&e.onFocusSelected()))})}dispose(){this._keyboard.dispose()}},ho=e=>{let t=e.getBoundingClientRect(),n=e.width/e.height,r=t.width/t.height,i=t.width,a=t.height,o=0,s=0;return r>n?(i=t.height*n,o=(t.width-i)/2):(a=t.width/n,s=(t.height-a)/2),{left:t.left+o,top:t.top+s,width:i,height:a}},go=(e,t,n)=>{let r=ho(e);return new M((t-r.left)/r.width*2-1,-((n-r.top)/r.height)*2+1)},_o=(e,t,n)=>{let r=ho(e);return new M((t+1)/2*r.width+r.left,(1-n)/2*r.height+r.top)},vo=1,yo=.001,bo=.007,xo=.1,So={translate:`position`,rotate:`euler`,scale:`scale`},Co=[`x`,`y`,`z`],wo=class{_engine;_editorCamera;_api;_getSelectedEntity;_isPointerBusy;_onStatusChange;_canvas;_pointerClient;_session;_disposeListeners;constructor(e){this._engine=e.engine,this._editorCamera=e.editorCamera,this._api=e.api,this._getSelectedEntity=e.getSelectedEntity,this._isPointerBusy=e.isPointerBusy,this._onStatusChange=e.onStatusChange,this._canvas=e.engine.canvas,this._pointerClient=new M,this._session=null;let t=e=>{this._pointerClient.set(e.clientX,e.clientY)};window.addEventListener(`pointermove`,t),this._disposeListeners=()=>{window.removeEventListener(`pointermove`,t)}}get active(){return this._session!==null}get constraintDisplay(){let e=this._session;if(!e||e.trackball||!e.constraint)return null;let t=e.constraint,n=e.mode===`scale`||t.orientation===`local`;return{origin:e.anchorWorldPos,quat:n?e.startWorldQuat:new ct,axes:t.plane?Co.filter(e=>e!==t.axis):[t.axis]}}handleKeyDown(e){let t=this._session;if(!t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return!1;let t=e.key.toLowerCase(),n=t===`g`?`translate`:t===`r`?`rotate`:t===`s`?`scale`:null;return n?this._start(n):!1}let n=e.key.toLowerCase();return e.key===`Enter`?this._confirm():e.key===`Escape`?this._cancel():n===`r`&&t.mode===`rotate`?this._toggleTrackball():t.trackball||(n===`x`||n===`y`||n===`z`?this._toggleConstraint(n,e.shiftKey):this._inputNumber(e.key)),!0}_inputNumber(e){let t=this._session;if(t){if(e.length===1&&e>=`0`&&e<=`9`)t.numberBuffer+=e;else if(e===`.`){if(t.numberBuffer.includes(`.`))return;t.numberBuffer+=`.`}else if(e===`-`)t.numberBuffer=t.numberBuffer.startsWith(`-`)?t.numberBuffer.slice(1):`-`+t.numberBuffer;else if(e===`Backspace`){if(t.numberBuffer===``)return;t.numberBuffer=t.numberBuffer.slice(0,-1)}else return;this._update()}}_start(e){if(this._isPointerBusy())return!1;let t=this._editorCamera.getCameraEntity(this._engine);if(!t)return!1;let n=this._getSelectedEntity(),r=this._editorCamera.view===`camera`&&(!n||n===t);if(r&&e===`scale`)return!1;let i=r?t:n;if(!i)return!1;let a=t.getComponentsByTag(`camera`)[0];if(!a)return!1;let o=t.matrixWorld.elm,s=new M(o[12],o[13],o[14]),c=new M(-o[8],-o[9],-o[10]).normalize(),l=new M(o[0],o[1],o[2]).normalize(),u=new M(o[4],o[5],o[6]).normalize(),d=i.matrixWorld.elm,f=new M(d[12],d[13],d[14]),p=r?f.clone().add(c.clone().multiply(Math.max(a.dofParams.focusDistance,xo))):f.clone(),m=e=>{e.stopPropagation(),this._session&&(this._session.lastPointer.set(e.clientX,e.clientY),this._update())},h=e=>{e.preventDefault(),e.stopPropagation(),e.button===2?this._cancel():e.button===0&&this._confirm()};window.addEventListener(`pointermove`,m,{capture:!0}),window.addEventListener(`pointerdown`,h,{capture:!0});let g=this._editorCamera.orbitControls,_=g.enabled;return g.enabled=!1,this._session={mode:e,entity:i,selfView:r,constraint:null,numberBuffer:``,trackball:!1,trackballQuat:new ct,trackballPointer:this._pointerClient.clone(),startValue:{position:i.position.getElm(`vec3`),euler:i.euler.getElm(`vec3`),scale:i.scale.getElm(`vec3`)},startWorldPos:f,startWorldQuat:Ca(i),parentWorldInv:i.parent?i.parent.matrixWorld.clone().inverse():new N,parentWorldQuatInv:i.parent?Ca(i.parent).inverse():new ct,camForward:c,camRight:l,camUp:u,camWorldPos:s,anchorWorldPos:p,projInv:a.projectionMatrix.clone().inverse(),viewInv:a.viewMatrix.clone().inverse(),centerClient:this._projectToClient(f,a),startPointer:this._pointerClient.clone(),lastPointer:this._pointerClient.clone(),disposeSession:()=>{window.removeEventListener(`pointermove`,m,{capture:!0}),window.removeEventListener(`pointerdown`,h,{capture:!0}),g.enabled=_,this._session&&this._pointerClient.copy(this._session.lastPointer),this._session=null,this._onStatusChange(null)}},this._update(),!0}_confirm(){let e=this._session;if(!e)return;let t=So[e.mode],n=e.entity[t].getElm(`vec3`);this._api.commandManager.execute(new la(e.entity,t,e.startValue[t],n)),e.disposeSession()}_cancel(){let e=this._session;e&&(this._restoreStart(e),e.entity.updateMatrix(!0),e.disposeSession())}_restoreStart(e){e.entity.position.setFromArray(e.startValue.position),e.entity.euler.setFromArray(e.startValue.euler),e.entity.scale.setFromArray(e.startValue.scale)}_toggleConstraint(e,t){let n=this._session;if(!n||t&&n.mode===`rotate`)return;let r=n.constraint;!r||r.axis!==e||r.plane!==t?n.constraint={axis:e,orientation:`global`,plane:t}:r.orientation===`global`?n.constraint={axis:e,orientation:`local`,plane:t}:n.constraint=null,this._update()}_axisWorldDir(e,t,n){let r=new M(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:wa(r,e.startWorldQuat).normalize()}_toggleTrackball(){let e=this._session;e&&(e.trackball=!e.trackball,e.constraint=null,e.numberBuffer=``,e.trackballQuat=new ct,e.trackballPointer.copy(e.lastPointer),this._update())}_accumulateTrackball(e){let t=e.lastPointer.x-e.trackballPointer.x,n=e.lastPointer.y-e.trackballPointer.y;if(e.trackballPointer.copy(e.lastPointer),t===0&&n===0)return;let r=xa(e.camUp,t*bo).multiply(xa(e.camRight,n*bo));e.trackballQuat.preMultiply(r)}_update(){let e=this._session;if(!e)return;let t=e.numberBuffer===``?null:parseFloat(e.numberBuffer),n=0;t!==null&&Number.isNaN(t)?this._restoreStart(e):n=e.mode===`translate`?this._applyTranslate(e,t):e.mode===`rotate`?this._applyRotate(e,t):this._applyScale(e,t),e.entity.updateMatrix(!0),this._onStatusChange(this._statusText(e,n))}_applyTranslate(e,t){let n=e.constraint;if(t!==null){let n=this._numericTranslateDir(e);return this._setWorldPosition(e,e.startWorldPos.clone().add(n.multiply(t))),t}let r=this._rayFromClient(e.startPointer,e),i=this._rayFromClient(e.lastPointer,e);if(n&&!n.plane){let t=this._axisWorldDir(e,n.axis,n.orientation),a=Da(i,e.anchorWorldPos,t)-Da(r,e.anchorWorldPos,t);return this._setWorldPosition(e,e.startWorldPos.clone().add(t.clone().multiply(a))),a}let a=n?this._axisWorldDir(e,n.axis,n.orientation):e.camForward,o=V(r,e.anchorWorldPos,a),s=V(i,e.anchorWorldPos,a);if(!o||!s)return 0;let c=s.sub(o);return this._setWorldPosition(e,e.startWorldPos.clone().add(c)),c.length()}_numericTranslateDir(e){let t=e.constraint;if(!t)return new M(1,0,0);let n=t.plane?t.axis===`x`?`y`:`x`:t.axis;return this._axisWorldDir(e,n,t.orientation)}_applyRotate(e,t){if(e.trackball)return this._accumulateTrackball(e),this._setWorldRotation(e,e.trackballQuat.clone()),0;let n=e.constraint?this._axisWorldDir(e,e.constraint.axis,e.constraint.orientation):e.camForward,r=e.selfView?e.camForward.clone().multiply(-1):e.camWorldPos.clone().sub(e.startWorldPos),i=t!==null&&e.constraint?1:n.dot(r)<0?-1:1,a=t===null?this._screenAngle(e.lastPointer,e.centerClient)-this._screenAngle(e.startPointer,e.centerClient):t*Math.PI/180;return this._setWorldRotation(e,xa(n,a*i)),a*180/Math.PI}_applyScale(e,t){let n;if(t!==null)n=t;else{let t=Math.max(vo,e.startPointer.distanceTo(e.centerClient));n=Math.max(yo,e.lastPointer.distanceTo(e.centerClient)/t)}let r=e.startValue.scale,i=e.constraint,a=Co.map(e=>i?(i.plane?e!==i.axis:e===i.axis)?n:1:n);return e.entity.scale.set(r[0]*a[0],r[1]*a[1],r[2]*a[2]),n}_setWorldPosition(e,t){let n=t.applyMatrix4AsPosition(e.parentWorldInv);e.entity.position.set(n.x,n.y,n.z)}_setWorldRotation(e,t){e.entity.quaternion.copy(Ea(e.parentWorldQuatInv,t,e.startWorldQuat))}_statusText(e,t){if(e.trackball)return`Rot: trackball`;let n=e.mode===`translate`?`Move D`:e.mode===`rotate`?`Rot`:`Scale`,r=e.mode===`rotate`?`°`:``;return`${n}: ${e.numberBuffer===``?t.toFixed(e.mode===`rotate`?1:3):`[${e.numberBuffer}]`}${r} (${this._constraintText(e)})`}_constraintText(e){let t=e.constraint;if(!t)return e.mode===`translate`?`view plane`:e.mode===`rotate`?`view axis`:`uniform`;let n=Co.filter(e=>t.plane?e!==t.axis:e===t.axis).join(``).toUpperCase();return`${e.mode===`scale`?`local`:t.orientation} ${n}`}_rayFromClient(e,t){let n=go(this._canvas,e.x,e.y);return new qt().setFromCamera(n,t.projInv,t.viewInv)}_projectToClient(e,t){let n=new M(e.x,e.y,e.z,1).applyMatrix4(t.viewMatrix).applyMatrix4(t.projectionMatrix);return Math.abs(n.w)<1e-4?_o(this._canvas,0,0):_o(this._canvas,n.x/n.w,n.y/n.w)}_screenAngle(e,t){return Math.atan2(-(e.y-t.y),e.x-t.x)}dispose(){this._cancel(),this._disposeListeners()}},To=12,Eo=12,Do=class{_raycaster;_pointerDownPos;_gizmoDragging;_gizmoDragStartValue;_hoveredTarget;_lastClickNDC;_lastClickCandidateUUIDs;_lastClickCycleIndex;_disposeListeners;constructor(e,t,n,r,i,a,o,s,c,l,u){this._raycaster=new Jt,this._pointerDownPos=null,this._gizmoDragging=!1,this._gizmoDragStartValue=null,this._hoveredTarget=null,this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1;let d=e.canvas,f=()=>t.getCameraEntity(e),p=(e,t)=>{let n=t.getComponentsByTag(`camera`)[0];if(!n)return null;let r=new M(e.x,e.y,e.z,1);return r.applyMatrix4(n.viewMatrix).applyMatrix4(n.projectionMatrix),r.w<=0?null:new M(r.x/r.w,r.y/r.w)},m=new Jt,h=t=>{let n=this._raycaster.ray.origin,r=t.x-n.x,i=t.y-n.y,a=t.z-n.z,o=Math.sqrt(r*r+i*i+a*a);if(o<1e-4)return!1;m.ray.origin.copy(n),m.ray.direction.set(r/o,i/o,a/o);let s=m.intersectEntities(e.root);for(let e of s)if(e.entity.initiator!==`god`)return e.distance<o-.001;return!1},g=new Jt,_=new M,v=(e,t)=>{for(let[n,r]of[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])if(_.set(n,r),g.setFromCamera(_,t),g.intersectEntities(e).length===0)return!1;return!0},y=(e,t,n,r)=>{for(let i of e.getWorldSegments()){let e=p(i.a,n),a=p(i.b,n);if(!e||!a)continue;let o=(e.x-t.x)*r.width*.5,s=(e.y-t.y)*r.height*.5,c=(a.x-t.x)*r.width*.5,l=(a.y-t.y)*r.height*.5,u=c-o,d=l-s,f=u*u+d*d,m=f>0?Math.max(0,Math.min(1,-(o*u+s*d)/f)):0,h=o+u*m,g=s+d*m;if(Math.sqrt(h*h+g*g)<=Eo)return!0}return!1},b=n=>{let i=f();if(!i)return[];this._raycaster.setFromCamera(n,i);let a=[];for(let t of this._raycaster.intersectEntities(e.root))t.entity.initiator!==`god`&&o(t.entity)&&a.push({entity:t.entity,distance:t.distance,type:`mesh`});let s=a.length>0?a[0].distance:1/0,c=[],l=[],u=new Set,m=r.getHelpers(),g=ho(d);for(let t of m){let r=e.root.findEntityByUUID(t.targetEntityUUID);if(!r||!o(r))continue;if(t.type===`empty`){if(!y(t,n,i,g))continue;u.add(t.targetEntityUUID);let e=t.entity.matrixWorld.elm,a=e[12]-this._raycaster.ray.origin.x,o=e[13]-this._raycaster.ray.origin.y,d=e[14]-this._raycaster.ray.origin.z,f=Math.sqrt(a*a+o*o+d*d),p={entity:r,distance:f,type:`helper`};f<=s?c.push(p):l.push(p);continue}let a=this._raycaster.intersectEntities(t.hitAreaEntity);if(a.length===0)continue;u.add(t.targetEntityUUID);let d={entity:r,distance:a[0].distance,type:`helper`};if(v(t.hitAreaEntity,i)){y(t,n,i,g)&&c.push(d);continue}a[0].distance<=s?c.push(d):l.push(d)}t.view===`camera`&&Math.min((1-Math.abs(n.x))*g.width*.5,(1-Math.abs(n.y))*g.height*.5)<=Eo&&o(i)&&c.push({entity:i,distance:0,type:`helper`}),c.sort((e,t)=>e.distance-t.distance),l.sort((e,t)=>e.distance-t.distance);let _=[];for(let{targetEntityUUID:t}of m){if(u.has(t))continue;let r=e.root.findEntityByUUID(t);if(!r||!o(r))continue;let a=r.matrixWorld.elm,s=new M(a[12],a[13],a[14]),c=p(s,i);if(!c)continue;let l=(c.x-n.x)*g.width*.5,d=(c.y-n.y)*g.height*.5,f=Math.sqrt(l*l+d*d);if(f>To||h(s))continue;let m=s.x-this._raycaster.ray.origin.x,v=s.y-this._raycaster.ray.origin.y,y=s.z-this._raycaster.ray.origin.z;_.push({candidate:{entity:r,distance:Math.sqrt(m*m+v*v+y*y),type:`helper`},screenDistance:f})}return _.sort((e,t)=>e.screenDistance-t.screenDistance),[...c,..._.map(e=>e.candidate),...a,...l]},x=()=>{let e=n.activeGizmo;if(!e||!e.entity.visible)return null;let t=null;for(let{handle:n,entity:r}of e.getHandleEntities()){let e=this._raycaster.intersectEntities(r);e.length>0&&(!t||e[0].distance<t.distance)&&(t={handle:n,distance:e[0].distance})}return t},S=r=>{if(!l()&&!(r.pointerType===`mouse`&&r.button!==0)){if(t.preview){r.target.setPointerCapture(r.pointerId),this._pointerDownPos=new M(r.clientX,r.clientY);return}if(!(r.pointerType===`touch`&&this._gizmoDragging)&&(r.target.setPointerCapture(r.pointerId),this._pointerDownPos=new M(r.clientX,r.clientY),n.activeGizmo&&n.activeGizmo.entity.visible)){let i=go(d,r.clientX,r.clientY),o=f();if(o){this._raycaster.setFromCamera(i,o);let r=x();if(r){let i=a(),o=i?e.root.findEntityByUUID(i):null;o&&(this._gizmoDragging=!0,t.orbitControls.enabled=!1,d.style.cursor=`grabbing`,this._gizmoDragStartValue={position:o.position.getElm(`vec3`),euler:o.euler.getElm(`vec3`),scale:o.scale.getElm(`vec3`)},n.activeGizmo.startDrag(r.handle,this._raycaster.ray,o))}}}}},C=r=>{if(l())return;if((t.preview||t.view===`camera`)&&this._pointerDownPos&&!this._gizmoDragging){let e=r.clientX-this._pointerDownPos.x,t=r.clientY-this._pointerDownPos.y;Math.sqrt(e*e+t*t)>5&&u()}if(t.preview){d.style.cursor=``;return}let i=go(d,r.clientX,r.clientY),o=f();if(!o)return;if(this._raycaster.setFromCamera(i,o),this._gizmoDragging){let t=a(),r=t?e.root.findEntityByUUID(t):null;if(!r)return;let i=n.activeGizmo.updateDrag(this._raycaster.ray,r);if(i){if(i.position){let e=i.position.clone();r.parent&&e.applyMatrix4AsPosition(r.parent.matrixWorld.clone().inverse()),r.position.copy(e)}i.euler&&r.euler.set(i.euler.x,i.euler.y,i.euler.z),i.scale&&r.scale.set(i.scale.x,i.scale.y,i.scale.z),r.updateMatrix(!0)}return}let s=null;if(n.activeGizmo&&n.activeGizmo.entity.visible){let e=x();e&&(s=`gizmo`),n.activeGizmo.setHover(e?e.handle:null)}if(!s){let e=b(i);e.length>0&&(s=e[0].type)}s!==this._hoveredTarget&&(this._hoveredTarget=s,s===`gizmo`?d.style.cursor=`grab`:s===`helper`||s===`mesh`?d.style.cursor=`pointer`:d.style.cursor=``)},w=r=>{if(l())return;if(t.preview){this._pointerDownPos=null;return}if(this._gizmoDragging){n.activeGizmo.endDrag(),this._gizmoDragging=!1,t.orbitControls.enabled=t.usingEditorCamera,d.style.cursor=this._hoveredTarget===`gizmo`?`grab`:``;let r=a(),o=r?e.root.findEntityByUUID(r):null;if(o&&this._gizmoDragStartValue){let e=s(),t=e===`translate`?`position`:e===`rotate`?`euler`:`scale`,n=this._gizmoDragStartValue[t],r=o[t].getElm(`vec3`);i.commandManager.execute(new la(o,t,n,r))}this._gizmoDragStartValue=null,this._pointerDownPos=null;return}if(!this._pointerDownPos)return;let o=r.clientX-this._pointerDownPos.x,u=r.clientY-this._pointerDownPos.y,p=Math.sqrt(o*o+u*u);if(this._pointerDownPos=null,p>5)return;let m=go(d,r.clientX,r.clientY);if(!f())return;let h=b(m);if(h.length===0){this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1,c(null);return}let g=.02,_=this._lastClickNDC&&Math.abs(m.x-this._lastClickNDC.x)<g&&Math.abs(m.y-this._lastClickNDC.y)<g,v=h.map(e=>e.entity.uuid),y=_&&v.length===this._lastClickCandidateUUIDs.length&&v.every((e,t)=>e===this._lastClickCandidateUUIDs[t]),x=0;y&&h.length>1&&(x=(this._lastClickCycleIndex+1)%h.length),this._lastClickNDC=new M(m.x,m.y),this._lastClickCandidateUUIDs=v,this._lastClickCycleIndex=x,c(h[x].entity)},T=e=>{e.preventDefault()};d.addEventListener(`pointerdown`,S),d.addEventListener(`pointermove`,C),d.addEventListener(`pointerup`,w),d.addEventListener(`contextmenu`,T),this._disposeListeners=()=>{d.removeEventListener(`pointerdown`,S),d.removeEventListener(`pointermove`,C),d.removeEventListener(`pointerup`,w),d.removeEventListener(`contextmenu`,T)}}get gizmoDragging(){return this._gizmoDragging}dispose(){this._disposeListeners()}},Oo={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},ko=1e3,Ao=class{_draw;_root;_axisEntities;constructor(e,t){this._draw=t,this._root=e.createEntity({name:`__constraint_axis`}),this._root.initiator=`god`,this._axisEntities={x:this._createAxisLine(e,`x`),y:this._createAxisLine(e,`y`),z:this._createAxisLine(e,`z`)},this._root.add(this._axisEntities.x),this._root.add(this._axisEntities.y),this._root.add(this._axisEntities.z)}_createAxisLine(e,t){let n=e.createEntity({name:`__constraint_axis_line`});n.initiator=`god`;let r=t===`x`?[-1,0,0,1,0,0]:t===`y`?[0,-1,0,0,1,0]:[0,0,-1,0,0,1],i=new Pt;return i.setAttribute(`position`,new Float32Array(r),3),i.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),n.addComponent(F,{geometry:i,material:this._draw.materials.flat({color:Oo[t],lines:!0,depthTest:!1,depthWrite:!1})}),n}render(e,t,n){if(!e||!t)return;let r=t.matrixWorld.elm,i=e.origin.x-r[12],a=e.origin.y-r[13],o=e.origin.z-r[14],s=Math.max(1,Math.sqrt(i*i+a*a+o*o))*ko;this._root.position.copy(e.origin),this._root.quaternion.copy(e.quat),this._root.scale.set(s,s,s),this._root.updateMatrix(!0),this._root.update(n.createEntityUpdateEvent()),this._draw.renderEntities({camera:t,entities:e.axes.map(e=>this._axisEntities[e]),target:null})}},jo=class{_draw;_entity;_color;_params;_showGrid;constructor(e,t){this._draw=t,this._showGrid=!0,this._color=[.35,.35,.35],this._params=[1,1,100],this._entity=e.createEntity({name:`__grid`}),this._entity.initiator=`god`,this._entity.addComponent(F,{geometry:new Lt({floor:!0}),material:t.materials.grid({color:this._color,params:this._params})})}get showGrid(){return this._showGrid}set showGrid(e){this._showGrid=e}render(e,t){if(!this._showGrid||!e)return;let n=e.matrixWorld.elm,r=Math.max(Math.abs(n[13]),.5),i=Math.max(0,Math.floor(Math.log10(r)));this._params[0]=10**i,this._params[1]=1-Math.max(0,Math.log10(r)-i),this._params[2]=Math.max(50,r*30),this._entity.position.set(n[12],0,n[14]),this._entity.scale.set(this._params[2]*2,1,this._params[2]*2),this._entity.update(t.createEntityUpdateEvent()),this._draw.renderEntities({camera:e,entities:[this._entity],target:null})}},Mo=[1,.6,0],No=class{_draw;_maskTarget;_maskMaterial;_outline;_showOutline;constructor(e){this._draw=e,this._maskTarget=e.createTarget({useSceneDepth:!0}),this._maskMaterial=e.materials.mask(),this._outline=e.recipes.outline(this._maskTarget,Mo),this._showOutline=!0}get showOutline(){return this._showOutline}set showOutline(e){this._showOutline=e}render(e,t){this._showOutline&&(!e||!t||e.getComponent(F)&&(this._draw.renderEntities({camera:t,entities:[e],target:this._maskTarget,materialOverride:this._maskMaterial,depthCompare:`lequal`}),this._draw.renderFullscreen(this._outline,null)))}},Po=class{_draw;_showWireframe;_wireframeMaterial;_wireframeGeometryCache;constructor(e){this._draw=e,this._showWireframe=!1,this._wireframeGeometryCache=new Map,this._wireframeMaterial=e.materials.flat({color:[.3,.8,.3],lines:!0,depthWrite:!1})}get showWireframe(){return this._showWireframe}set showWireframe(e){this._showWireframe=e}render(e,t){if(!this._showWireframe||!e)return;let n=this._collectMeshEntities(t.root),r=new Map;for(let e of n){let t=e.getComponent(F);if(!t)continue;r.set(e,t.geometry);let n=this._wireframeGeometryCache.get(t.geometry);n||(n=this._createWireframeGeometry(t.geometry),this._wireframeGeometryCache.set(t.geometry,n)),t.geometry=n}this._draw.renderEntities({camera:e,entities:n,target:null,materialOverride:this._wireframeMaterial});for(let e of n){let t=e.getComponent(F);if(!t)continue;let n=r.get(e);n&&(t.geometry=n)}}_collectMeshEntities(e){let t=[],n=(e,r)=>{let i=r&&e.visible;i&&e.getComponent(F)&&t.push(e);for(let t=0;t<e.children.length;t++)n(e.children[t],i)};return n(e,!0),t}_createWireframeGeometry(e){let t=new Pt,n=e.getAttribute(`position`),r=e.getAttribute(`index`);if(!n)return t;t.setAttribute(`position`,n.array,3);let i=e.getAttribute(`normal`);if(i&&t.setAttribute(`normal`,i.array,3),r){let e=r.array,n=new Set,i=[];for(let t=0;t<e.length;t+=3){let r=e[t],a=e[t+1],o=e[t+2],s=[[Math.min(r,a),Math.max(r,a)],[Math.min(a,o),Math.max(a,o)],[Math.min(o,r),Math.max(o,r)]];for(let[e,t]of s){let r=`${e}_${t}`;n.has(r)||(n.add(r),i.push(e,t))}}t.setAttribute(`index`,new Uint16Array(i),1)}return t}};function H(e){if(!e)throw Error(`Assertion failed.`)}var Fo=e=>{let t=(e%360+360)%360;if(t===0||t===90||t===180||t===270)return t;throw Error(`Invalid rotation ${e}.`)},Io=e=>e&&e[e.length-1],Lo=e=>e>=0&&e<2**32,U=e=>{let t=0;for(;e.readBits(1)===0&&t<32;)t++;if(t>=32)throw Error(`Invalid exponential-Golomb code.`);return(1<<t)-1+e.readBits(t)},Ro=e=>{let t=U(e);return t&1?t+1>>1:-(t>>1)},zo=e=>e.constructor===Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),Bo=e=>e.constructor===DataView?e:ArrayBuffer.isView(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(e),Vo=new TextEncoder,Ho={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12},Uo={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18},Wo={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9},Go=e=>!!e&&!!e.primaries&&!!e.transfer&&!!e.matrix&&e.fullRange!==void 0,Ko=e=>e instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e),qo=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(t=>{let n=!1;e=()=>{n||=(t(),this.pending--,!0)}}),n=this.currentPromise;return this.currentPromise=t,this.pending++,await n,e}},Jo=(e,t,n)=>{let r=0,i=e.length-1,a=-1;for(;r<=i;){let o=r+(i-r+1)/2|0;n(e[o])<=t?(a=o,r=o+1):i=o-1}return a},Yo=()=>{let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}},Xo=e=>{throw Error(`Unexpected value: ${e}`)},Zo=(e,t,n,r)=>{n>>>=0,n&=16777215,r?(e.setUint8(t,n&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n>>>16&255)):(e.setUint8(t,n>>>16&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n&255))},Qo=(e,t)=>Math.floor(e*t)/t,$o=/^[a-z]{3}$/,es=e=>$o.test(e),ts=1e6*(1+2**-52),ns=(e,t)=>{let n=e<0?-1:1;e=Math.abs(e);let r=0,i=1,a=1,o=0,s=e;for(;;){let e=Math.floor(s),c=e*a+r,l=e*o+i;if(l>t)return{numerator:n*a,denominator:o};if(r=a,i=o,a=c,o=l,s=1/(s-e),!isFinite(s))break}return{numerator:n*a,denominator:o}},rs=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}},is=null,as=()=>is===null?is=typeof navigator<`u`&&navigator.userAgent?.includes(`Firefox`):is,os=function*(e){for(let t in e){let n=e[t];n!==void 0&&(yield{key:t,value:n})}},ss=()=>{Symbol.dispose??=Symbol(`Symbol.dispose`)},cs=e=>{H(Number.isInteger(e.num)),H(Number.isInteger(e.den)),H(e.den!==0);let t=Math.abs(e.num),n=Math.abs(e.den);for(;n!==0;){let e=t%n;t=n,n=e}let r=t||1;return{num:e.num/r,den:e.den/r}},ls=(e,t)=>{if(typeof e!=`object`||!e)throw TypeError(`${t} must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(`${t}.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(`${t}.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(`${t}.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(`${t}.height must be a non-negative integer.`)},us=e=>Array.isArray(e)?e:[e],ds=class{constructor(){this._listeners=new Map}on(e,t,n){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:n?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,n]=e,r=this._listeners.get(t);if(r)for(let e of r){try{e.fn(n)}catch(e){console.error(e)}e.once&&r.delete(e)}}},fs=e=>Math.ceil(e/2)*2,ps=e=>typeof e==`object`&&!!e&&Object.getPrototypeOf(e)===Object.prototype&&Object.values(e).every(e=>typeof e==`string`),ms=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(typeof t!=`string`)throw TypeError(`mimeType must be a string.`)}},hs=class{constructor(e,t,n,r){if(this.data=e,this.mimeType=t,this.name=n,this.description=r,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==void 0&&typeof t!=`string`)throw TypeError(`mimeType, when provided, must be a string.`);if(n!==void 0&&typeof n!=`string`)throw TypeError(`name, when provided, must be a string.`);if(r!==void 0&&typeof r!=`string`)throw TypeError(`description, when provided, must be a string.`)}},gs=e=>{if(!e||typeof e!=`object`)throw TypeError(`tags must be an object.`);if(e.title!==void 0&&typeof e.title!=`string`)throw TypeError(`tags.title, when provided, must be a string.`);if(e.description!==void 0&&typeof e.description!=`string`)throw TypeError(`tags.description, when provided, must be a string.`);if(e.artist!==void 0&&typeof e.artist!=`string`)throw TypeError(`tags.artist, when provided, must be a string.`);if(e.album!==void 0&&typeof e.album!=`string`)throw TypeError(`tags.album, when provided, must be a string.`);if(e.albumArtist!==void 0&&typeof e.albumArtist!=`string`)throw TypeError(`tags.albumArtist, when provided, must be a string.`);if(e.trackNumber!==void 0&&(!Number.isInteger(e.trackNumber)||e.trackNumber<=0))throw TypeError(`tags.trackNumber, when provided, must be a positive integer.`);if(e.tracksTotal!==void 0&&(!Number.isInteger(e.tracksTotal)||e.tracksTotal<=0))throw TypeError(`tags.tracksTotal, when provided, must be a positive integer.`);if(e.discNumber!==void 0&&(!Number.isInteger(e.discNumber)||e.discNumber<=0))throw TypeError(`tags.discNumber, when provided, must be a positive integer.`);if(e.discsTotal!==void 0&&(!Number.isInteger(e.discsTotal)||e.discsTotal<=0))throw TypeError(`tags.discsTotal, when provided, must be a positive integer.`);if(e.genre!==void 0&&typeof e.genre!=`string`)throw TypeError(`tags.genre, when provided, must be a string.`);if(e.date!==void 0&&(!(e.date instanceof Date)||Number.isNaN(e.date.getTime())))throw TypeError(`tags.date, when provided, must be a valid Date.`);if(e.lyrics!==void 0&&typeof e.lyrics!=`string`)throw TypeError(`tags.lyrics, when provided, must be a string.`);if(e.images!==void 0){if(!Array.isArray(e.images))throw TypeError(`tags.images, when provided, must be an array.`);for(let t of e.images){if(!t||typeof t!=`object`)throw TypeError(`Each image in tags.images must be an object.`);if(!(t.data instanceof Uint8Array))throw TypeError(`Each image.data must be a Uint8Array.`);if(typeof t.mimeType!=`string`)throw TypeError(`Each image.mimeType must be a string.`);if(![`coverFront`,`coverBack`,`unknown`].includes(t.kind))throw TypeError(`Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.`)}}if(e.comment!==void 0&&typeof e.comment!=`string`)throw TypeError(`tags.comment, when provided, must be a string.`);if(e.raw!==void 0){if(!e.raw||typeof e.raw!=`object`)throw TypeError(`tags.raw, when provided, must be an object.`);for(let t of Object.values(e.raw))if(t!==null&&typeof t!=`string`&&!(t instanceof Uint8Array)&&!(t instanceof ms)&&!(t instanceof hs)&&!ps(t))throw TypeError(`Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.`)}},_s=e=>{if(!e||typeof e!=`object`)throw TypeError(`disposition must be an object.`);if(e.default!==void 0&&typeof e.default!=`boolean`)throw TypeError(`disposition.default must be a boolean.`);if(e.primary!==void 0&&typeof e.primary!=`boolean`)throw TypeError(`disposition.primary must be a boolean.`);if(e.forced!==void 0&&typeof e.forced!=`boolean`)throw TypeError(`disposition.forced must be a boolean.`);if(e.original!==void 0&&typeof e.original!=`boolean`)throw TypeError(`disposition.original must be a boolean.`);if(e.commentary!==void 0&&typeof e.commentary!=`boolean`)throw TypeError(`disposition.commentary must be a boolean.`);if(e.hearingImpaired!==void 0&&typeof e.hearingImpaired!=`boolean`)throw TypeError(`disposition.hearingImpaired must be a boolean.`);if(e.visuallyImpaired!==void 0&&typeof e.visuallyImpaired!=`boolean`)throw TypeError(`disposition.visuallyImpaired must be a boolean.`)},vs=class e{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,n=7-(this.pos&7),r=(t&1<<n)>>n;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let n=0;n<e;n++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let n=this.pos+e;for(let e=this.pos;e<n;e++){let r=Math.floor(e/8),i=this.bytes[r],a=7-(e&7);i&=~(1<<a),i|=(t&1<<n-e-1)>>n-e-1<<a,this.bytes[r]=i}this.pos=n}readAlignedByte(){if(this.pos%8!=0)throw Error(`Bitstream is not byte-aligned.`);let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let t=new e(this.bytes);return t.pos=this.pos,t}},ys=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],bs=[-1,1,2,3,4,5,6,8],xs=e=>{let t=ys.indexOf(e.sampleRate),n=null;t===-1&&(t=15,n=e.sampleRate);let r=bs.indexOf(e.numberOfChannels);if(r===-1)throw TypeError(`Unsupported number of channels: ${e.numberOfChannels}`);let i=13;e.objectType>=32&&(i+=6),t===15&&(i+=24);let a=Math.ceil(i/8),o=new Uint8Array(a),s=new vs(o);return e.objectType<32?s.writeBits(5,e.objectType):(s.writeBits(5,31),s.writeBits(6,e.objectType-32)),s.writeBits(4,t),t===15&&s.writeBits(24,n),s.writeBits(4,r),o},Ss=[`avc`,`hevc`,`vp9`,`av1`,`vp8`],Cs=[`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,`pcm-u8`,`pcm-s8`,`ulaw`,`alaw`],ws=[`aac`,`opus`,`mp3`,`vorbis`,`flac`,`ac3`,`eac3`],Ts=[...ws,...Cs],Es=[`webvtt`],Ds=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],Os=[{maxPictureSize:36864,maxBitrate:128e3,tier:`L`,level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:`L`,level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:`L`,level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:`L`,level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:`L`,level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:`L`,level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:`H`,level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:`L`,level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:`H`,level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:`L`,level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:`L`,level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:`L`,level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:`L`,level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:`L`,level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:`L`,level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:186}],ks=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],As=[{maxPictureSize:147456,maxBitrate:15e5,tier:`M`,level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:`M`,level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:`M`,level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:`M`,level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:`M`,level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:`H`,level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:`M`,level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:`H`,level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:`M`,level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:`M`,level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:`M`,level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:`M`,level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:19}],js=(e,t,n,r)=>{if(e===`avc`){let e=Math.ceil(t/16)*Math.ceil(n/16),i=Ds.find(t=>e<=t.maxMacroblocks&&r<=t.maxBitrate)??Io(Ds),a=i?i.level:0;return`avc1.${`64`.padStart(2,`0`)}00${a.toString(16).padStart(2,`0`)}`}else if(e===`hevc`){let e=t*n,i=Os.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??Io(Os);return`hev1.1.6.${i.tier}${i.level}.B0`}else if(e===`vp8`)return`vp8`;else if(e===`vp9`){let e=t*n;return`vp09.00.${(ks.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??Io(ks)).level.toString().padStart(2,`0`)}.08`}else if(e===`av1`){let e=t*n,i=As.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??Io(As);return`av01.0.${i.level.toString().padStart(2,`0`)}${i.tier}.08`}throw TypeError(`Unhandled codec '${e}'.`)},Ms=e=>{let t=e.split(`.`),n=Number(t[1]),r=t[2],i=Number(r.slice(0,-1)),a=(n<<5)+i,o=+(r.slice(-1)===`H`),s=Number(t[3])===8?0:1,c=t[4]?Number(t[4]):0,l=t[5]?Number(t[5][0]):1,u=t[5]?Number(t[5][1]):1,d=t[5]?Number(t[5][2]):0;return[129,a,(o<<7)+(s<<6)+0+(c<<4)+(l<<3)+(u<<2)+d,0]},Ns=/^pcm-([usf])(\d+)+(be)?$/,Ps=e=>{if(H(Cs.includes(e)),e===`ulaw`)return{dataType:`ulaw`,sampleSize:1,littleEndian:!0,silentValue:255};if(e===`alaw`)return{dataType:`alaw`,sampleSize:1,littleEndian:!0,silentValue:213};let t=Ns.exec(e);H(t);let n;n=t[1]===`u`?`unsigned`:t[1]===`s`?`signed`:`float`;let r=Number(t[2])/8,i=t[3]!==`be`;return{dataType:n,sampleSize:r,littleEndian:i,silentValue:e===`pcm-u8`?2**7:0}},Fs=e=>e.startsWith(`avc1`)||e.startsWith(`avc3`)?`avc`:e.startsWith(`hev1`)||e.startsWith(`hvc1`)?`hevc`:e===`vp8`?`vp8`:e.startsWith(`vp09`)?`vp9`:e.startsWith(`av01`)?`av1`:e===`mp3`||e===`mp4a.69`||e===`mp4a.6B`||e===`mp4a.6b`||e===`mp4a.40.34`?`mp3`:e.startsWith(`mp4a.40.`)||e===`mp4a.67`?`aac`:e===`opus`?`opus`:e===`vorbis`?`vorbis`:e===`flac`?`flac`:e===`ac-3`||e===`ac3`?`ac3`:e===`ec-3`||e===`eac3`?`eac3`:e===`ulaw`?`ulaw`:e===`alaw`?`alaw`:Ns.test(e)?e:e===`webvtt`?`webvtt`:null,Is=e=>e===`avc`?{avc:{format:`avc`}}:e===`hevc`?{hevc:{format:`hevc`}}:{},Ls=[`avc1`,`avc3`,`hev1`,`hvc1`,`vp8`,`vp09`,`av01`],Rs=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,zs=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,Bs=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,Vs=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,Hs=e=>{if(!e)throw TypeError(`Video chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Video chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Video chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Video chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Video chunk metadata decoder configuration must specify a codec string.`);if(!Ls.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.codedWidth)||e.decoderConfig.codedWidth<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).`);if(!Number.isInteger(e.decoderConfig.codedHeight)||e.decoderConfig.codedHeight<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).`);if(e.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectWidth)||e.decoderConfig.displayAspectWidth<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectHeight)||e.decoderConfig.displayAspectHeight<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectWidth!==void 0!=(e.decoderConfig.displayAspectHeight!==void 0))throw TypeError(`Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.`);if(e.decoderConfig.description!==void 0&&!Ko(e.decoderConfig.description))throw TypeError(`Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=e.decoderConfig;if(typeof t!=`object`)throw TypeError(`Video chunk metadata decoder configuration colorSpace, when provided, must be an object.`);let n=Object.keys(Ho);if(t.primaries!=null&&!n.includes(t.primaries))throw TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${n.join(`, `)}.`);let r=Object.keys(Uo);if(t.transfer!=null&&!r.includes(t.transfer))throw TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(`, `)}.`);let i=Object.keys(Wo);if(t.matrix!=null&&!i.includes(t.matrix))throw TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(`, `)}.`);if(t.fullRange!=null&&typeof t.fullRange!=`boolean`)throw TypeError(`Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.`)}if(e.decoderConfig.codec.startsWith(`avc1`)||e.decoderConfig.codec.startsWith(`avc3`)){if(!Rs.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.`)}else if(e.decoderConfig.codec.startsWith(`hev1`)||e.decoderConfig.codec.startsWith(`hvc1`)){if(!zs.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.`)}else if(e.decoderConfig.codec.startsWith(`vp8`)){if(e.decoderConfig.codec!==`vp8`)throw TypeError(`Video chunk metadata decoder configuration codec string for VP8 must be "vp8".`)}else if(e.decoderConfig.codec.startsWith(`vp09`)){if(!Bs.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.`)}else if(e.decoderConfig.codec.startsWith(`av01`)&&!Vs.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.`)},Us=[`mp4a`,`mp3`,`opus`,`vorbis`,`flac`,`ulaw`,`alaw`,`pcm`,`ac-3`,`ec-3`],Ws=e=>{if(!e)throw TypeError(`Audio chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Audio chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Audio chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Audio chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Audio chunk metadata decoder configuration must specify a codec string.`);if(!Us.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.sampleRate)||e.decoderConfig.sampleRate<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).`);if(!Number.isInteger(e.decoderConfig.numberOfChannels)||e.decoderConfig.numberOfChannels<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).`);if(e.decoderConfig.description!==void 0&&!Ko(e.decoderConfig.description))throw TypeError(`Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.codec.startsWith(`mp4a`)&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`){if(![`mp4a.40.2`,`mp4a.40.02`,`mp4a.40.5`,`mp4a.40.05`,`mp4a.40.29`,`mp4a.67`].includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`mp3`)||e.decoderConfig.codec.startsWith(`mp4a`)){if(e.decoderConfig.codec!==`mp3`&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`)throw TypeError(`Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".`)}else if(e.decoderConfig.codec.startsWith(`opus`)){if(e.decoderConfig.codec!==`opus`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Opus must be "opus".`);if(e.decoderConfig.description&&e.decoderConfig.description.byteLength<18)throw TypeError(`Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.`)}else if(e.decoderConfig.codec.startsWith(`vorbis`)){if(e.decoderConfig.codec!==`vorbis`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".`);if(!e.decoderConfig.description)throw TypeError(`Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`flac`)){if(e.decoderConfig.codec!==`flac`)throw TypeError(`Audio chunk metadata decoder configuration codec string for FLAC must be "flac".`);if(!e.decoderConfig.description||e.decoderConfig.description.byteLength<42)throw TypeError(`Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`ac-3`)||e.decoderConfig.codec.startsWith(`ac3`)){if(e.decoderConfig.codec!==`ac-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".`)}else if(e.decoderConfig.codec.startsWith(`ec-3`)||e.decoderConfig.codec.startsWith(`eac3`)){if(e.decoderConfig.codec!==`ec-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".`)}else if((e.decoderConfig.codec.startsWith(`pcm`)||e.decoderConfig.codec.startsWith(`ulaw`)||e.decoderConfig.codec.startsWith(`alaw`))&&!Cs.includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${Cs.join(`, `)}).`)},Gs=e=>{if(!e)throw TypeError(`Subtitle metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Subtitle metadata must be an object.`);if(!e.config)throw TypeError(`Subtitle metadata must include a config object.`);if(typeof e.config!=`object`)throw TypeError(`Subtitle metadata config must be an object.`);if(typeof e.config.description!=`string`)throw TypeError(`Subtitle metadata config description must be a string.`)},Ks=[48e3,44100,32e3],qs=[24e3,22050,16e3],Js;(function(e){e[e.NON_IDR_SLICE=1]=`NON_IDR_SLICE`,e[e.SLICE_DPA=2]=`SLICE_DPA`,e[e.SLICE_DPB=3]=`SLICE_DPB`,e[e.SLICE_DPC=4]=`SLICE_DPC`,e[e.IDR=5]=`IDR`,e[e.SEI=6]=`SEI`,e[e.SPS=7]=`SPS`,e[e.PPS=8]=`PPS`,e[e.AUD=9]=`AUD`,e[e.SPS_EXT=13]=`SPS_EXT`})(Js||={});var Ys;(function(e){e[e.RASL_N=8]=`RASL_N`,e[e.RASL_R=9]=`RASL_R`,e[e.BLA_W_LP=16]=`BLA_W_LP`,e[e.RSV_IRAP_VCL23=23]=`RSV_IRAP_VCL23`,e[e.VPS_NUT=32]=`VPS_NUT`,e[e.SPS_NUT=33]=`SPS_NUT`,e[e.PPS_NUT=34]=`PPS_NUT`,e[e.AUD_NUT=35]=`AUD_NUT`,e[e.PREFIX_SEI_NUT=39]=`PREFIX_SEI_NUT`,e[e.SUFFIX_SEI_NUT=40]=`SUFFIX_SEI_NUT`})(Ys||={});var Xs=function*(e){let t=0,n=-1;for(;t<e.length-2;){let r=e.indexOf(0,t);if(r===-1||r>=e.length-2)break;t=r;let i=0;if(t+3<e.length&&e[t+1]===0&&e[t+2]===0&&e[t+3]===1?i=4:e[t+1]===0&&e[t+2]===1&&(i=3),i===0){t++;continue}n!==-1&&t>n&&(yield{offset:n,length:t-n}),n=t+i,t=n}n!==-1&&n<e.length&&(yield{offset:n,length:e.length-n})},Zs=e=>e&31,Qs=e=>{let t=[],n=e.length;for(let r=0;r<n;r++)r+2<n&&e[r]===0&&e[r+1]===0&&e[r+2]===3?(t.push(0,0),r+=2):t.push(e[r]);return new Uint8Array(t)};new Uint8Array([0,0,0,1]);var $s=(e,t)=>{let n=e.reduce((e,n)=>e+t+n.byteLength,0),r=new Uint8Array(n),i=0;for(let n of e){let e=new DataView(r.buffer,r.byteOffset,r.byteLength);switch(t){case 1:e.setUint8(i,n.byteLength);break;case 2:e.setUint16(i,n.byteLength,!1);break;case 3:Zo(e,i,n.byteLength,!1);break;case 4:e.setUint32(i,n.byteLength,!1);break}i+=t,r.set(n,i),i+=n.byteLength}return r},ec=e=>{try{let t=[],n=[],r=[];for(let i of Xs(e)){let a=e.subarray(i.offset,i.offset+i.length),o=Zs(a[0]);o===Js.SPS?t.push(a):o===Js.PPS?n.push(a):o===Js.SPS_EXT&&r.push(a)}if(t.length===0||n.length===0)return null;let i=t[0],a=rc(i);H(a!==null);let o=a.profileIdc===100||a.profileIdc===110||a.profileIdc===122||a.profileIdc===144;return{configurationVersion:1,avcProfileIndication:a.profileIdc,profileCompatibility:a.constraintFlags,avcLevelIndication:a.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:n,chromaFormat:o?a.chromaFormatIdc:null,bitDepthLumaMinus8:o?a.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?a.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?r:null}}catch(e){return console.error(`Error building AVC Decoder Configuration Record:`,e),null}},tc=e=>{let t=[];t.push(e.configurationVersion),t.push(e.avcProfileIndication),t.push(e.profileCompatibility),t.push(e.avcLevelIndication),t.push(252|e.lengthSizeMinusOne&3),t.push(224|e.sequenceParameterSets.length&31);for(let n of e.sequenceParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}t.push(e.pictureParameterSets.length);for(let n of e.pictureParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}if(e.avcProfileIndication===100||e.avcProfileIndication===110||e.avcProfileIndication===122||e.avcProfileIndication===144){H(e.chromaFormat!==null),H(e.bitDepthLumaMinus8!==null),H(e.bitDepthChromaMinus8!==null),H(e.sequenceParameterSetExt!==null),t.push(252|e.chromaFormat&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.sequenceParameterSetExt.length);for(let n of e.sequenceParameterSetExt){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}}return new Uint8Array(t)},nc={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},rc=e=>{try{let t=new vs(Qs(e));if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;let n=t.readAlignedByte(),r=t.readAlignedByte(),i=t.readAlignedByte();U(t);let a=1,o=0,s=0,c=0;if((n===100||n===110||n===122||n===244||n===44||n===83||n===86||n===118||n===128)&&(a=U(t),a===3&&(c=t.readBits(1)),o=U(t),s=U(t),t.skipBits(1),t.readBits(1))){for(let e=0;e<(a===3?12:8);e++)if(t.readBits(1)){let n=e<6?16:64,r=8,i=8;for(let e=0;e<n;e++){if(i!==0){let e=Ro(t);i=(r+e+256)%256}r=i===0?r:i}}}U(t);let l=U(t);if(l===0)U(t);else if(l===1){t.skipBits(1),Ro(t),Ro(t);let e=U(t);for(let n=0;n<e;n++)Ro(t)}U(t),t.skipBits(1);let u=U(t),d=U(t),f=16*(u+1),p=16*(d+1),m=f,h=p,g=t.readBits(1);if(g||t.skipBits(1),t.skipBits(1),t.readBits(1)){let e=U(t),n=U(t),r=U(t),i=U(t),o,s;if((c===0?a:0)===0)o=1,s=2-g;else{let e=a===3?1:2,t=a===1?2:1;o=e,s=t*(2-g)}m-=o*(e+n),h-=s*(r+i)}let _=2,v=2,y=2,b=0,x={num:1,den:1},S=null,C=null;if(t.readBits(1)){if(t.readBits(1)){let e=t.readBits(8);if(e===255)x={num:t.readBits(16),den:t.readBits(16)};else{let t=nc[e];t&&(x=t)}}t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),b=t.readBits(1),t.readBits(1)&&(_=t.readBits(8),v=t.readBits(8),y=t.readBits(8))),t.readBits(1)&&(U(t),U(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));let e=t.readBits(1);e&&ic(t);let n=t.readBits(1);n&&ic(t),(e||n)&&t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(1),U(t),U(t),U(t),U(t),S=U(t),C=U(t))}if(S===null){H(C===null);let e=r&16;if((n===44||n===86||n===100||n===110||n===122||n===244)&&e)S=0,C=0;else{let e=u+1,t=d+1,n=(2-g)*t,r=Ds.find(e=>e.level>=i)??Io(Ds),a=Math.min(Math.floor(r.maxDpbMbs/(e*n)),16);S=a,C=a}}return H(C!==null),{profileIdc:n,constraintFlags:r,levelIdc:i,frameMbsOnlyFlag:g,chromaFormatIdc:a,bitDepthLumaMinus8:o,bitDepthChromaMinus8:s,codedWidth:f,codedHeight:p,displayWidth:m,displayHeight:h,pixelAspectRatio:x,colourPrimaries:_,matrixCoefficients:y,transferCharacteristics:v,fullRangeFlag:b,numReorderFrames:S,maxDecFrameBuffering:C}}catch(e){return console.error(`Error parsing AVC SPS:`,e),null}},ic=e=>{let t=U(e);e.skipBits(4),e.skipBits(4);for(let n=0;n<=t;n++)U(e),U(e),e.skipBits(1);e.skipBits(5),e.skipBits(5),e.skipBits(5),e.skipBits(5)},ac=e=>e>>1&63,oc=e=>{try{let t=new vs(Qs(e));t.skipBits(16),t.readBits(4);let n=t.readBits(3),r=t.readBits(1),{general_profile_space:i,general_tier_flag:a,general_profile_idc:o,general_profile_compatibility_flags:s,general_constraint_indicator_flags:c,general_level_idc:l}=cc(t,n);U(t);let u=U(t),d=0;u===3&&(d=t.readBits(1));let f=U(t),p=U(t),m=f,h=p;if(t.readBits(1)){let e=U(t),n=U(t),r=U(t),i=U(t),a=1,o=1,s=d===0?u:0;s===1?(a=2,o=2):s===2&&(a=2,o=1),m-=(e+n)*a,h-=(r+i)*o}let g=U(t),_=U(t);U(t);let v=t.readBits(1)?0:n,y=0;for(let e=v;e<=n;e++)U(t),y=U(t),U(t);if(U(t),U(t),U(t),U(t),U(t),U(t),t.readBits(1)&&t.readBits(1)&&lc(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(4),t.skipBits(4),U(t),U(t),t.skipBits(1)),uc(t,U(t)),t.readBits(1)){let e=U(t);for(let n=0;n<e;n++)U(t),t.skipBits(1)}t.skipBits(1),t.skipBits(1);let b=2,x=2,S=2,C=0,w=0,T={num:1,den:1};if(t.readBits(1)){let e=fc(t,n);T=e.pixelAspectRatio,b=e.colourPrimaries,x=e.transferCharacteristics,S=e.matrixCoefficients,C=e.fullRangeFlag,w=e.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:h,pixelAspectRatio:T,colourPrimaries:b,transferCharacteristics:x,matrixCoefficients:S,fullRangeFlag:C,maxDecFrameBuffering:y+1,spsMaxSubLayersMinus1:n,spsTemporalIdNestingFlag:r,generalProfileSpace:i,generalTierFlag:a,generalProfileIdc:o,generalProfileCompatibilityFlags:s,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:_,minSpatialSegmentationIdc:w}}catch(e){return console.error(`Error parsing HEVC SPS:`,e),null}},sc=e=>{try{let t=[],n=[],r=[],i=[];for(let a of Xs(e)){let o=e.subarray(a.offset,a.offset+a.length),s=ac(o[0]);s===Ys.VPS_NUT?t.push(o):s===Ys.SPS_NUT?n.push(o):s===Ys.PPS_NUT?r.push(o):(s===Ys.PREFIX_SEI_NUT||s===Ys.SUFFIX_SEI_NUT)&&i.push(o)}if(n.length===0||r.length===0)return null;let a=oc(n[0]);if(!a)return null;let o=0;if(r.length>0){let e=r[0],t=new vs(Qs(e));t.skipBits(16),U(t),U(t),t.skipBits(1),t.skipBits(1),t.skipBits(3),t.skipBits(1),t.skipBits(1),U(t),U(t),Ro(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&U(t),Ro(t),Ro(t),t.skipBits(1),t.skipBits(1),t.skipBits(1),t.skipBits(1);let n=t.readBits(1),i=t.readBits(1);o=!n&&!i?0:n&&!i?2:!n&&i?3:0}let s=[...t.length?[{arrayCompleteness:1,nalUnitType:Ys.VPS_NUT,nalUnits:t}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:Ys.SPS_NUT,nalUnits:n}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:Ys.PPS_NUT,nalUnits:r}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:ac(i[0][0]),nalUnits:i}]:[]];return{configurationVersion:1,generalProfileSpace:a.generalProfileSpace,generalTierFlag:a.generalTierFlag,generalProfileIdc:a.generalProfileIdc,generalProfileCompatibilityFlags:a.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:a.generalConstraintIndicatorFlags,generalLevelIdc:a.generalLevelIdc,minSpatialSegmentationIdc:a.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:a.chromaFormatIdc,bitDepthLumaMinus8:a.bitDepthLumaMinus8,bitDepthChromaMinus8:a.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:a.spsMaxSubLayersMinus1+1,temporalIdNested:a.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:s}}catch(e){return console.error(`Error building HEVC Decoder Configuration Record:`,e),null}},cc=(e,t)=>{let n=e.readBits(2),r=e.readBits(1),i=e.readBits(5),a=0;for(let t=0;t<32;t++)a=a<<1|e.readBits(1);let o=new Uint8Array(6);for(let t=0;t<6;t++)o[t]=e.readBits(8);let s=e.readBits(8),c=[],l=[];for(let n=0;n<t;n++)c.push(e.readBits(1)),l.push(e.readBits(1));if(t>0)for(let n=t;n<8;n++)e.skipBits(2);for(let n=0;n<t;n++)c[n]&&e.skipBits(88),l[n]&&e.skipBits(8);return{general_profile_space:n,general_tier_flag:r,general_profile_idc:i,general_profile_compatibility_flags:a,general_constraint_indicator_flags:o,general_level_idc:s}},lc=e=>{for(let t=0;t<4;t++)for(let n=0;n<(t===3?2:6);n++)if(!e.readBits(1))U(e);else{let n=Math.min(64,1<<4+(t<<1));t>1&&Ro(e);for(let t=0;t<n;t++)Ro(e)}},uc=(e,t)=>{let n=[];for(let r=0;r<t;r++)n[r]=dc(e,r,t,n)},dc=(e,t,n,r)=>{let i=0,a=0,o=0;if(t!==0&&(a=e.readBits(1)),a){o=t===n?t-(U(e)+1):t-1,e.readBits(1),U(e);let a=r[o]??0;for(let t=0;t<=a;t++)e.readBits(1)||e.readBits(1);i=r[o]}else{let t=U(e),n=U(e);for(let n=0;n<t;n++)U(e),e.readBits(1);for(let t=0;t<n;t++)U(e),e.readBits(1);i=t+n}return i},fc=(e,t)=>{let n=2,r=2,i=2,a=0,o=0,s={num:1,den:1};if(e.readBits(1)){let t=e.readBits(8);if(t===255)s={num:e.readBits(16),den:e.readBits(16)};else{let e=nc[t];e&&(s=e)}}return e.readBits(1)&&e.readBits(1),e.readBits(1)&&(e.readBits(3),a=e.readBits(1),e.readBits(1)&&(n=e.readBits(8),r=e.readBits(8),i=e.readBits(8))),e.readBits(1)&&(U(e),U(e)),e.readBits(1),e.readBits(1),e.readBits(1),e.readBits(1)&&(U(e),U(e),U(e),U(e)),e.readBits(1)&&(e.readBits(32),e.readBits(32),e.readBits(1)&&U(e),e.readBits(1)&&pc(e,!0,t)),e.readBits(1)&&(e.readBits(1),e.readBits(1),e.readBits(1),o=U(e),U(e),U(e),U(e),U(e)),{pixelAspectRatio:s,colourPrimaries:n,transferCharacteristics:r,matrixCoefficients:i,fullRangeFlag:a,minSpatialSegmentationIdc:o}},pc=(e,t,n)=>{let r=!1,i=!1,a=!1;t&&(r=e.readBits(1)===1,i=e.readBits(1)===1,(r||i)&&(a=e.readBits(1)===1,a&&(e.readBits(8),e.readBits(5),e.readBits(1),e.readBits(5)),e.readBits(4),e.readBits(4),a&&e.readBits(4),e.readBits(5),e.readBits(5),e.readBits(5)));for(let t=0;t<=n;t++){let t=e.readBits(1)===1,n=!0;t||(n=e.readBits(1)===1);let o=!1;n?U(e):o=e.readBits(1)===1;let s=1;o||(s=U(e)+1),r&&mc(e,s,a),i&&mc(e,s,a)}},mc=(e,t,n)=>{for(let r=0;r<t;r++)U(e),U(e),n&&(U(e),U(e)),e.readBits(1)},hc=e=>{let t=[];t.push(e.configurationVersion),t.push((e.generalProfileSpace&3)<<6|(e.generalTierFlag&1)<<5|e.generalProfileIdc&31),t.push(e.generalProfileCompatibilityFlags>>>24&255),t.push(e.generalProfileCompatibilityFlags>>>16&255),t.push(e.generalProfileCompatibilityFlags>>>8&255),t.push(e.generalProfileCompatibilityFlags&255),t.push(...e.generalConstraintIndicatorFlags),t.push(e.generalLevelIdc&255),t.push(240|e.minSpatialSegmentationIdc>>8&15),t.push(e.minSpatialSegmentationIdc&255),t.push(252|e.parallelismType&3),t.push(252|e.chromaFormatIdc&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.avgFrameRate>>8&255),t.push(e.avgFrameRate&255),t.push((e.constantFrameRate&3)<<6|(e.numTemporalLayers&7)<<3|(e.temporalIdNested&1)<<2|e.lengthSizeMinusOne&3),t.push(e.arrays.length&255);for(let n of e.arrays){t.push((n.arrayCompleteness&1)<<7|0|n.nalUnitType&63),t.push(n.nalUnits.length>>8&255),t.push(n.nalUnits.length&255);for(let e of n.nalUnits){t.push(e.length>>8&255),t.push(e.length&255);for(let n=0;n<e.length;n++)t.push(e[n])}}return new Uint8Array(t)},gc;(function(e){e[e.audAllowed=0]=`audAllowed`,e[e.beforeFirstVcl=1]=`beforeFirstVcl`,e[e.afterFirstVcl=2]=`afterFirstVcl`,e[e.eoBitstreamAllowed=3]=`eoBitstreamAllowed`,e[e.noMoreDataAllowed=4]=`noMoreDataAllowed`})(gc||={});var _c=e=>{let t=Bo(e),n=t.getUint8(9),r=t.getUint16(10,!0),i=t.getUint32(12,!0),a=t.getInt16(16,!0),o=t.getUint8(18),s=null;return o&&(s=e.subarray(19,21+n)),{outputChannelCount:n,preSkip:r,inputSampleRate:i,outputGain:a,channelMappingFamily:o,channelMappingTable:s}},vc;(function(e){e[e.STREAMINFO=0]=`STREAMINFO`,e[e.VORBIS_COMMENT=4]=`VORBIS_COMMENT`,e[e.PICTURE=6]=`PICTURE`})(vc||={});var yc=e=>{if(e.length<7||e[0]!==11||e[1]!==119)return null;let t=new vs(e);t.skipBits(16),t.skipBits(16);let n=t.readBits(2);if(n===3)return null;let r=t.readBits(6),i=t.readBits(5);if(i>8)return null;let a=t.readBits(3),o=t.readBits(3);return o&1&&o!==1&&t.skipBits(2),o&4&&t.skipBits(2),o===2&&t.skipBits(2),{fscod:n,bsid:i,bsmod:a,acmod:o,lfeon:t.readBits(1),bitRateCode:Math.floor(r/2)}};new Uint8Array([5,4,65,67,45,51]),new Uint8Array([5,4,69,65,67,51]);var W=[1,2,3,6],bc=e=>{if(e.length<6||e[0]!==11||e[1]!==119)return null;let t=new vs(e);t.skipBits(16);let n=t.readBits(2);if(t.skipBits(3),n!==0&&n!==2)return null;let r=t.readBits(11),i=t.readBits(2),a=0,o;i===3?(a=t.readBits(2),o=3):o=t.readBits(2);let s=t.readBits(3),c=t.readBits(1),l=t.readBits(5);if(l<11||l>16)return null;let u=W[o],d;return d=i<3?Ks[i]/1e3:qs[a]/1e3,{dataRate:Math.round((r+1)*d/(u*16)),substreams:[{fscod:i,fscod2:a,bsid:l,bsmod:0,acmod:s,lfeon:c,numDepSub:0,chanLoc:0}]}},xc=new Uint8Array,Sc=class e{constructor(e,t,n,r,i=-1,a,o){if(this.data=e,this.type=t,this.timestamp=n,this.duration=r,this.sequenceNumber=i,e===xc&&a===void 0)throw Error(`Internal error: byteLength must be explicitly provided when constructing metadata-only packets.`);if(a===void 0&&(a=e.byteLength),!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==`key`&&t!==`delta`)throw TypeError(`type must be either "key" or "delta".`);if(!Number.isFinite(n))throw TypeError(`timestamp must be a number.`);if(!Number.isFinite(r)||r<0)throw TypeError(`duration must be a non-negative number.`);if(!Number.isFinite(i))throw TypeError(`sequenceNumber must be a number.`);if(!Number.isInteger(a)||a<0)throw TypeError(`byteLength must be a non-negative integer.`);if(o!==void 0&&(typeof o!=`object`||!o))throw TypeError(`sideData, when provided, must be an object.`);if(o?.alpha!==void 0&&!(o.alpha instanceof Uint8Array))throw TypeError(`sideData.alpha, when provided, must be a Uint8Array.`);if(o?.alphaByteLength!==void 0&&(!Number.isInteger(o.alphaByteLength)||o.alphaByteLength<0))throw TypeError(`sideData.alphaByteLength, when provided, must be a non-negative integer.`);this.byteLength=a,this.sideData=o??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===xc}get microsecondTimestamp(){return Math.trunc(ts*this.timestamp)}get microsecondDuration(){return Math.trunc(ts*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw TypeError(`This packet does not contain alpha side data.`);if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to an audio chunk.`);if(typeof EncodedAudioChunk>`u`)throw Error(`Your browser does not support EncodedAudioChunk.`);return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(t,n){if(!(t instanceof EncodedVideoChunk||t instanceof EncodedAudioChunk))throw TypeError(`chunk must be an EncodedVideoChunk or EncodedAudioChunk.`);let r=new Uint8Array(t.byteLength);return t.copyTo(r),new e(r,t.type,t.timestamp/1e6,(t.duration??0)/1e6,void 0,void 0,n)}clone(t){if(t!==void 0&&(typeof t!=`object`||!t))throw TypeError(`options, when provided, must be an object.`);if(t?.data!==void 0&&!(t.data instanceof Uint8Array))throw TypeError(`options.data, when provided, must be a Uint8Array.`);if(t?.type!==void 0&&t.type!==`key`&&t.type!==`delta`)throw TypeError(`options.type, when provided, must be either "key" or "delta".`);if(t?.timestamp!==void 0&&!Number.isFinite(t.timestamp))throw TypeError(`options.timestamp, when provided, must be a number.`);if(t?.duration!==void 0&&!Number.isFinite(t.duration))throw TypeError(`options.duration, when provided, must be a number.`);if(t?.sequenceNumber!==void 0&&!Number.isFinite(t.sequenceNumber))throw TypeError(`options.sequenceNumber, when provided, must be a number.`);if(t?.sideData!==void 0&&(typeof t.sideData!=`object`||t.sideData===null))throw TypeError(`options.sideData, when provided, must be an object.`);return new e(t?.data??this.data,t?.type??this.type,t?.timestamp??this.timestamp,t?.duration??this.duration,t?.sequenceNumber??this.sequenceNumber,this.byteLength,t?.sideData??this.sideData)}},Cc=e=>{let t=(e.hasVideo?`video/`:e.hasAudio?`audio/`:`application/`)+(e.isQuickTime?`quicktime`:`mp4`);if(e.codecStrings.length>0){let n=[...new Set(e.codecStrings)];t+=`; codecs="${n.join(`, `)}"`}return t},wc=e=>{let t=e.filePos,n=new vs(Kc(e,9));if(n.readBits(12)!==4095||(n.skipBits(1),n.readBits(2)!==0))return null;let r=n.readBits(1),i=n.readBits(2)+1,a=n.readBits(4);if(a===15)return null;n.skipBits(1);let o=n.readBits(3);if(o===0)throw Error(`ADTS frames with channel configuration 0 are not supported.`);n.skipBits(1),n.skipBits(1),n.skipBits(1),n.skipBits(1);let s=n.readBits(13);n.skipBits(11);let c=n.readBits(2)+1;if(c!==1)throw Error(`ADTS frames with more than one AAC frame are not supported.`);let l=null;return r===1?e.filePos-=2:l=n.readBits(16),{objectType:i,samplingFrequencyIndex:a,channelConfiguration:o,frameLength:s,numberOfAacFrames:c,crcCheck:l,startPos:t}},Tc=o(((e,t)=>{t.exports={}}));ss();var Ec=-1/0,Dc=-1/0,Oc=null;typeof FinalizationRegistry<`u`&&(Oc=new FinalizationRegistry(e=>{let t=performance.now();e.type===`video`?(t-Ec>=1e3&&(console.error(`A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them.`),Ec=t),typeof VideoFrame<`u`&&e.data instanceof VideoFrame&&e.data.close()):(t-Dc>=1e3&&(console.error(`An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them.`),Dc=t),typeof AudioData<`u`&&e.data instanceof AudioData&&e.data.close())}));var kc=[`I420`,`I420P10`,`I420P12`,`I420A`,`I420AP10`,`I420AP12`,`I422`,`I422P10`,`I422P12`,`I422A`,`I422AP10`,`I422AP12`,`I444`,`I444P10`,`I444P12`,`I444A`,`I444AP10`,`I444AP12`,`NV12`,`RGBA`,`RGBX`,`BGRA`,`BGRX`],Ac=new Set(kc),jc=class e{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180==0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180==0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(ts*this.timestamp)}get microsecondDuration(){return Math.trunc(ts*this.duration)}get hasAlpha(){return this.format&&this.format.includes(`A`)}constructor(t,n){if(this._closed=!1,t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer||ArrayBuffer.isView(t)){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.format===void 0||!Ac.has(n.format))throw TypeError(`init.format must be one of: `+kc.join(`, `));if(!Number.isInteger(n.codedWidth)||n.codedWidth<=0)throw TypeError(`init.codedWidth must be a positive integer.`);if(!Number.isInteger(n.codedHeight)||n.codedHeight<=0)throw TypeError(`init.codedHeight must be a positive integer.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.layout!==void 0){if(!Array.isArray(n.layout))throw TypeError(`init.layout, when provided, must be an array.`);for(let e of n.layout){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Each entry in init.layout must be an object.`);if(!Number.isInteger(e.offset)||e.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(e.stride)||e.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(n.visibleRect!==void 0&&ls(n.visibleRect,`init.visibleRect`),n.displayWidth!==void 0&&(!Number.isInteger(n.displayWidth)||n.displayWidth<=0))throw TypeError(`init.displayWidth, when provided, must be a positive integer.`);if(n.displayHeight!==void 0&&(!Number.isInteger(n.displayHeight)||n.displayHeight<=0))throw TypeError(`init.displayHeight, when provided, must be a positive integer.`);if(n.displayWidth!==void 0!=(n.displayHeight!==void 0))throw TypeError(`init.displayWidth and init.displayHeight must be either both provided or both omitted.`);this._data=zo(t).slice(),this._layout=n.layout??Lc(n.format,n.codedWidth,n.codedHeight),this.format=n.format,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=new Mc(n.colorSpace),this.visibleRect={left:n.visibleRect?.left??0,top:n.visibleRect?.top??0,width:n.visibleRect?.width??n.codedWidth,height:n.visibleRect?.height??n.codedHeight},n.displayWidth===void 0?(this.squarePixelWidth=this.codedWidth,this.squarePixelHeight=this.codedHeight):(this.squarePixelWidth=this.rotation%180==0?n.displayWidth:n.displayHeight,this.squarePixelHeight=this.rotation%180==0?n.displayHeight:n.displayWidth)}else if(typeof VideoFrame<`u`&&t instanceof VideoFrame){if(n?.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n?.timestamp!==void 0&&!Number.isFinite(n?.timestamp))throw TypeError(`init.timestamp, when provided, must be a number.`);if(n?.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);n?.visibleRect!==void 0&&ls(n.visibleRect,`init.visibleRect`),this._data=t,this._layout=null,this.format=t.format,this.visibleRect={left:t.visibleRect?.x??0,top:t.visibleRect?.y??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},this.rotation=n?.rotation??0,this.squarePixelWidth=t.displayWidth,this.squarePixelHeight=t.displayHeight,this.timestamp=n?.timestamp??t.timestamp/1e6,this.duration=n?.duration??(t.duration??0)/1e6,this.colorSpace=new Mc(t.colorSpace)}else if(typeof HTMLImageElement<`u`&&t instanceof HTMLImageElement||typeof SVGImageElement<`u`&&t instanceof SVGImageElement||typeof ImageBitmap<`u`&&t instanceof ImageBitmap||typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement||typeof HTMLCanvasElement<`u`&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<`u`&&t instanceof OffscreenCanvas){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(typeof VideoFrame<`u`)return new e(new VideoFrame(t,{timestamp:Math.trunc(n.timestamp*ts),duration:Math.trunc((n.duration??0)*ts)||void 0}),n);let r=0,i=0;if(`naturalWidth`in t?(r=t.naturalWidth,i=t.naturalHeight):`videoWidth`in t?(r=t.videoWidth,i=t.videoHeight):`width`in t&&(r=Number(t.width),i=Number(t.height)),!r||!i)throw TypeError(`Could not determine dimensions.`);let a=new OffscreenCanvas(r,i),o=a.getContext(`2d`,{alpha:as(),willReadFrequently:!0});H(o),o.drawImage(t,0,0),this._data=a,this._layout=null,this.format=`RGBX`,this.visibleRect={left:0,top:0,width:r,height:i},this.squarePixelWidth=r,this.squarePixelHeight=i,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=new Mc({matrix:`rgb`,primaries:`bt709`,transfer:`iec61966-2-1`,fullRange:!0})}else throw TypeError(`Invalid data type: Must be a BufferSource or CanvasImageSource.`);this.pixelAspectRatio=cs({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),Oc?.register(this,{type:`video`,data:this._data},this)}clone(){if(this._closed)throw Error(`VideoSample is closed.`);return H(this._data!==null),Nc(this._data)?new e(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation}):this._data instanceof Uint8Array?(H(this._layout),new e(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight})):new e(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight})}close(){this._closed||=(Oc?.unregister(this),Nc(this._data)?this._data.close():this._data=null,!0)}allocationSize(e={}){if(Ic(e),this._closed)throw Error(`VideoSample is closed.`);if(this.format===null)throw Error(`Cannot get allocation size when format is null. Sorry!`);if(H(this._data!==null),!Nc(this._data)&&(e.colorSpace||e.format&&e.format!==this.format||e.layout||e.rect)){let t=this.toVideoFrame(),n=t.allocationSize(e);return t.close(),n}return Nc(this._data)?this._data.allocationSize(e):this._data instanceof Uint8Array?this._data.byteLength:this.codedWidth*this.codedHeight*4}async copyTo(e,t={}){if(!Ko(e))throw TypeError(`destination must be an ArrayBuffer or an ArrayBuffer view.`);if(Ic(t),this._closed)throw Error(`VideoSample is closed.`);if(this.format===null)throw Error(`Cannot copy video sample data when format is null. Sorry!`);if(H(this._data!==null),!Nc(this._data)&&(t.colorSpace||t.format&&t.format!==this.format||t.layout||t.rect)){let n=this.toVideoFrame(),r=await n.copyTo(e,t);return n.close(),r}if(Nc(this._data))return this._data.copyTo(e,t);if(this._data instanceof Uint8Array)return H(this._layout),zo(e).set(this._data),this._layout;{let t=this._data.getContext(`2d`);H(t);let n=t.getImageData(0,0,this.codedWidth,this.codedHeight);return zo(e).set(n.data),[{offset:0,stride:4*this.codedWidth}]}}toVideoFrame(){if(this._closed)throw Error(`VideoSample is closed.`);return H(this._data!==null),Nc(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace}):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,n,r,i,a,o,s,c){let l=0,u=0,d=this.displayWidth,f=this.displayHeight,p=0,m=0,h=this.displayWidth,g=this.displayHeight;if(a===void 0?(p=t,m=n,r!==void 0&&(h=r,g=i)):(l=t,u=n,d=r,f=i,p=a,m=o,s===void 0?(h=d,g=f):(h=s,g=c)),!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!Number.isFinite(l))throw TypeError(`sx must be a number.`);if(!Number.isFinite(u))throw TypeError(`sy must be a number.`);if(!Number.isFinite(d)||d<0)throw TypeError(`sWidth must be a non-negative number.`);if(!Number.isFinite(f)||f<0)throw TypeError(`sHeight must be a non-negative number.`);if(!Number.isFinite(p))throw TypeError(`dx must be a number.`);if(!Number.isFinite(m))throw TypeError(`dy must be a number.`);if(!Number.isFinite(h)||h<0)throw TypeError(`dWidth must be a non-negative number.`);if(!Number.isFinite(g)||g<0)throw TypeError(`dHeight must be a non-negative number.`);if(this._closed)throw Error(`VideoSample is closed.`);({sx:l,sy:u,sWidth:d,sHeight:f}=this._rotateSourceRegion(l,u,d,f,this.rotation));let _=this.toCanvasImageSource();e.save();let v=p+h/2,y=m+g/2;e.translate(v,y),e.rotate(this.rotation*Math.PI/180);let b=this.rotation%180==0?1:h/g;e.scale(1/b,b),e.drawImage(_,l,u,d,f,-h/2,-g/2,h,g),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit must be 'fill', 'contain', or 'cover'.`);if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`options.rotation, when provided, must be 0, 90, 180, or 270.`);t.crop!==void 0&&Fc(t.crop,`options.`);let n=e.canvas.width,r=e.canvas.height,i=t.rotation??this.rotation,[a,o]=i%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth];t.crop&&Pc(t.crop,a,o);let s,c,l,u,{sx:d,sy:f,sWidth:p,sHeight:m}=this._rotateSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??a,t.crop?.height??o,i);if(t.fit===`fill`)s=0,c=0,l=n,u=r;else{let[e,i]=t.crop?[t.crop.width,t.crop.height]:[a,o],d=t.fit===`contain`?Math.min(n/e,r/i):Math.max(n/e,r/i);l=e*d,u=i*d,s=(n-l)/2,c=(r-u)/2}e.save();let h=i%180==0?1:l/u;e.translate(n/2,r/2),e.rotate(i*Math.PI/180),e.scale(1/h,h),e.translate(-n/2,-r/2),e.drawImage(this.toCanvasImageSource(),d,f,p,m,s,c,l,u),e.restore()}_rotateSourceRegion(e,t,n,r,i){return i===90?[e,t,n,r]=[t,this.squarePixelHeight-e-n,r,n]:i===180?[e,t]=[this.squarePixelWidth-e-n,this.squarePixelHeight-t-r]:i===270&&([e,t,n,r]=[this.squarePixelWidth-t-r,e,r,n]),{sx:e,sy:t,sWidth:n,sHeight:r}}toCanvasImageSource(){if(this._closed)throw Error(`VideoSample is closed.`);if(H(this._data!==null),this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}else return this._data}setRotation(e){if(![0,90,180,270].includes(e))throw TypeError(`newRotation must be 0, 90, 180, or 270.`);this.rotation=e}setTimestamp(e){if(!Number.isFinite(e))throw TypeError(`newTimestamp must be a number.`);this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw TypeError(`newDuration must be a non-negative number.`);this.duration=e}[Symbol.dispose](){this.close()}},Mc=class{constructor(e){if(e!==void 0){if(!e||typeof e!=`object`)throw TypeError(`init.colorSpace, when provided, must be an object.`);let t=Object.keys(Ho);if(e.primaries!=null&&!t.includes(e.primaries))throw TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(`, `)}.`);let n=Object.keys(Uo);if(e.transfer!=null&&!n.includes(e.transfer))throw TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(`, `)}.`);let r=Object.keys(Wo);if(e.matrix!=null&&!r.includes(e.matrix))throw TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(`, `)}.`);if(e.fullRange!=null&&typeof e.fullRange!=`boolean`)throw TypeError(`init.colorSpace.fullRange, when provided, must be a boolean.`)}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},Nc=e=>typeof VideoFrame<`u`&&e instanceof VideoFrame,Pc=(e,t,n)=>{let r=Math.min(e.left,t),i=Math.min(e.top,n),a=Math.min(e.width,t-r),o=Math.min(e.height,n-i);return H(a>=0),H(o>=0),{left:r,top:i,width:a,height:o}},Fc=(e,t)=>{if(!e||typeof e!=`object`)throw TypeError(t+`crop, when provided, must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(t+`crop.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(t+`crop.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(t+`crop.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(t+`crop.height must be a non-negative integer.`)},Ic=e=>{if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.colorSpace!==void 0&&![`display-p3`,`srgb`].includes(e.colorSpace))throw TypeError(`options.colorSpace, when provided, must be 'display-p3' or 'srgb'.`);if(e.format!==void 0&&typeof e.format!=`string`)throw TypeError(`options.format, when provided, must be a string.`);if(e.layout!==void 0){if(!Array.isArray(e.layout))throw TypeError(`options.layout, when provided, must be an array.`);for(let t of e.layout){if(!t||typeof t!=`object`)throw TypeError(`Each entry in options.layout must be an object.`);if(!Number.isInteger(t.offset)||t.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(t.stride)||t.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(e.rect!==void 0){if(!e.rect||typeof e.rect!=`object`)throw TypeError(`options.rect, when provided, must be an object.`);if(e.rect.x!==void 0&&(!Number.isInteger(e.rect.x)||e.rect.x<0))throw TypeError(`options.rect.x, when provided, must be a non-negative integer.`);if(e.rect.y!==void 0&&(!Number.isInteger(e.rect.y)||e.rect.y<0))throw TypeError(`options.rect.y, when provided, must be a non-negative integer.`);if(e.rect.width!==void 0&&(!Number.isInteger(e.rect.width)||e.rect.width<0))throw TypeError(`options.rect.width, when provided, must be a non-negative integer.`);if(e.rect.height!==void 0&&(!Number.isInteger(e.rect.height)||e.rect.height<0))throw TypeError(`options.rect.height, when provided, must be a non-negative integer.`)}},Lc=(e,t,n)=>{let r=Rc(e),i=[],a=0;for(let e of r){let r=Math.ceil(t/e.widthDivisor),o=Math.ceil(n/e.heightDivisor),s=r*e.sampleBytes,c=s*o;i.push({offset:a,stride:s}),a+=c}return i},Rc=e=>{let t=(e,t,n,r,i)=>{let a=[{sampleBytes:e,widthDivisor:1,heightDivisor:1},{sampleBytes:t,widthDivisor:n,heightDivisor:r},{sampleBytes:t,widthDivisor:n,heightDivisor:r}];return i&&a.push({sampleBytes:e,widthDivisor:1,heightDivisor:1}),a};switch(e){case`I420`:return t(1,1,2,2,!1);case`I420P10`:case`I420P12`:return t(2,2,2,2,!1);case`I420A`:return t(1,1,2,2,!0);case`I420AP10`:case`I420AP12`:return t(2,2,2,2,!0);case`I422`:return t(1,1,2,1,!1);case`I422P10`:case`I422P12`:return t(2,2,2,1,!1);case`I422A`:return t(1,1,2,1,!0);case`I422AP10`:case`I422AP12`:return t(2,2,2,1,!0);case`I444`:return t(1,1,1,1,!1);case`I444P10`:case`I444P12`:return t(2,2,1,1,!1);case`I444A`:return t(1,1,1,1,!0);case`I444AP10`:case`I444AP12`:return t(2,2,1,1,!0);case`NV12`:return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case`RGBA`:case`RGBX`:case`BGRA`:case`BGRX`:return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:Xo(e),H(!1)}},zc=e=>{if(!e||typeof e!=`object`)throw TypeError(`Encoding config must be an object.`);if(!Ss.includes(e.codec))throw TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${Ss.join(`, `)}.`);if(!(e.bitrate instanceof Hc)&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw TypeError(`config.bitrate must be a positive integer or a quality.`);if(e.keyFrameInterval!==void 0&&(!Number.isFinite(e.keyFrameInterval)||e.keyFrameInterval<0))throw TypeError(`config.keyFrameInterval, when provided, must be a non-negative number.`);if(e.sizeChangeBehavior!==void 0&&![`deny`,`passThrough`,`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.`);if(e.transform!==void 0){if(typeof e.transform!=`object`||!e.transform)throw TypeError(`config.transform, when provided, must be an object.`);if(e.transform.width!==void 0&&(!Number.isInteger(e.transform.width)||e.transform.width<=0))throw TypeError(`config.transform.width, when provided, must be a positive integer.`);if(e.transform.height!==void 0&&(!Number.isInteger(e.transform.height)||e.transform.height<=0))throw TypeError(`config.transform.height, when provided, must be a positive integer.`);if(e.transform.fit!==void 0&&![`fill`,`contain`,`cover`].includes(e.transform.fit))throw TypeError(`config.transform.fit, when provided, must be one of "fill", "contain", or "cover".`);if(e.transform.width!==void 0&&e.transform.height!==void 0&&e.transform.fit===void 0&&![`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.`);if(e.transform.fit!==void 0&&[`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`config.transform.fit cannot be used when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.`);if(e.transform.rotate!==void 0&&![0,90,180,270].includes(e.transform.rotate))throw TypeError(`config.transform.rotate, when provided, must be 0, 90, 180 or 270.`);if(e.transform.crop!==void 0&&Fc(e.transform.crop,`config.transform.`),e.transform.process!==void 0&&typeof e.transform.process!=`function`)throw TypeError(`config.transform.process, when provided, must be a function.`);if(e.transform.frameRate!==void 0&&(!Number.isFinite(e.transform.frameRate)||e.transform.frameRate<=0))throw TypeError(`config.transform.frameRate, when provided, must be a finite positive number.`);if(e.transform.force!==void 0&&typeof e.transform.force!=`boolean`)throw TypeError(`config.transform.force, when provided, must be a boolean.`)}if(e.onEncodedPacket!==void 0&&typeof e.onEncodedPacket!=`function`)throw TypeError(`config.onEncodedPacket, when provided, must be a function.`);if(e.onEncoderConfig!==void 0&&typeof e.onEncoderConfig!=`function`)throw TypeError(`config.onEncoderConfig, when provided, must be a function.`);Bc(e.codec,e)},Bc=(e,t)=>{if(!t||typeof t!=`object`)throw TypeError(`Encoding options must be an object.`);if(t.alpha!==void 0&&![`discard`,`keep`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'discard' or 'keep'.`);if(t.bitrateMode!==void 0&&![`constant`,`variable`].includes(t.bitrateMode))throw TypeError(`bitrateMode, when provided, must be 'constant' or 'variable'.`);if(t.latencyMode!==void 0&&![`quality`,`realtime`].includes(t.latencyMode))throw TypeError(`latencyMode, when provided, must be 'quality' or 'realtime'.`);if(t.fullCodecString!==void 0&&typeof t.fullCodecString!=`string`)throw TypeError(`fullCodecString, when provided, must be a string.`);if(t.fullCodecString!==void 0&&Fs(t.fullCodecString)!==e)throw TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${e}).`);if(t.hardwareAcceleration!==void 0&&![`no-preference`,`prefer-hardware`,`prefer-software`].includes(t.hardwareAcceleration))throw TypeError(`hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.`);if(t.scalabilityMode!==void 0&&typeof t.scalabilityMode!=`string`)throw TypeError(`scalabilityMode, when provided, must be a string.`);if(t.contentHint!==void 0&&typeof t.contentHint!=`string`)throw TypeError(`contentHint, when provided, must be a string.`)},Vc=e=>{let t=e.bitrate instanceof Hc?e.bitrate._toVideoBitrate(e.codec,e.width,e.height):e.bitrate;return{codec:e.fullCodecString??js(e.codec,e.width,e.height,t),width:e.width,height:e.height,displayWidth:e.squarePixelWidth,displayHeight:e.squarePixelHeight,bitrate:t,bitrateMode:e.bitrateMode,alpha:e.alpha??`discard`,framerate:e.framerate,latencyMode:e.latencyMode,hardwareAcceleration:e.hardwareAcceleration,scalabilityMode:e.scalabilityMode,contentHint:e.contentHint,...Is(e.codec)}},Hc=class{constructor(e){this._factor=e}_toVideoBitrate(e,t,n){let r=3e6*(t*n/(1920*1080))**.95*{avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2}[e]*this._factor;return Math.ceil(r/1e3)*1e3}_toAudioBitrate(e){if(Cs.includes(e)||e===`flac`)return;let t={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3}[e];if(!t)throw Error(`Unhandled codec: ${e}`);let n=t*this._factor;return e===`aac`?n=[96e3,128e3,16e4,192e3].reduce((e,t)=>Math.abs(t-n)<Math.abs(e-n)?t:e):e===`opus`||e===`vorbis`?n=Math.max(6e3,n):e===`mp3`&&(n=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((e,t)=>Math.abs(t-n)<Math.abs(e-n)?t:e)),Math.round(n/1e3)*1e3}},Uc=[],Wc=class e{constructor(e,t,n,r,i){this.bytes=e,this.view=t,this.offset=n,this.start=r,this.end=i,this.bufferPos=r-n}static tempFromBytes(t){return new e(t,Bo(t),0,0,t.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(t,n=this.end-t){if(t<this.start||t+n>this.end)throw RangeError(`Slicing outside of original slice.`);return new e(this.bytes,this.view,this.offset,t,t+n)}},Gc=(e,t)=>{if(e.filePos<e.start||e.filePos+t>e.end)throw RangeError(`Tried reading [${e.filePos}, ${e.filePos+t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`)},Kc=(e,t)=>{Gc(e,t);let n=e.bytes.subarray(e.bufferPos,e.bufferPos+t);return e.bufferPos+=t,n},qc=class{constructor(e){this.mutex=new qo,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateAndNormalizeTimestamp(e,t,n){if(t+=e.source._timestampOffset,t<0)throw Error(`Timestamps must be non-negative (got ${t}s).`);let r=this.trackTimestampInfo.get(e);if(r){if(n&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!n)throw Error(`First packet must be a key packet.`);r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}return t}},Jc=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,G=e=>{let t=Math.floor(e/(3600*1e3)),n=Math.floor(e%(3600*1e3)/(60*1e3)),r=Math.floor(e%(60*1e3)/1e3),i=e%1e3;return t.toString().padStart(2,`0`)+`:`+n.toString().padStart(2,`0`)+`:`+r.toString().padStart(2,`0`)+`.`+i.toString().padStart(3,`0`)},Yc=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8==7&&this.writer.write(this.helper);e.length%8!=0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let t of e.children)t&&this.writeBox(t);let n=this.writer.getPos(),r=e.size??n-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);H(t!==void 0);let n=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(n)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}},K=new Uint8Array(8),q=new DataView(K.buffer),J=e=>[(e%256+256)%256],Y=e=>(q.setUint16(0,e,!1),[K[0],K[1]]),Xc=e=>(q.setInt16(0,e,!1),[K[0],K[1]]),Zc=e=>(q.setUint32(0,e,!1),[K[1],K[2],K[3]]),X=e=>(q.setUint32(0,e,!1),[K[0],K[1],K[2],K[3]]),Qc=e=>(q.setInt32(0,e,!1),[K[0],K[1],K[2],K[3]]),$c=e=>(q.setUint32(0,Math.floor(e/2**32),!1),q.setUint32(4,e,!1),[K[0],K[1],K[2],K[3],K[4],K[5],K[6],K[7]]),el=e=>(q.setInt32(0,Math.floor(e/2**32),!1),q.setUint32(4,e,!1),[K[0],K[1],K[2],K[3],K[4],K[5],K[6],K[7]]),tl=e=>(q.setInt16(0,2**8*e,!1),[K[0],K[1]]),nl=e=>(q.setInt32(0,2**16*e,!1),[K[0],K[1],K[2],K[3]]),rl=e=>(q.setInt32(0,2**30*e,!1),[K[0],K[1],K[2],K[3]]),il=(e,t)=>{let n=[],r=e;do{let e=r&127;r>>=7,n.length>0&&(e|=128),n.push(e),t!==void 0&&t--}while(r>0||t);return n.reverse()},Z=(e,t=!1)=>{let n=Array(e.length).fill(null).map((t,n)=>e.charCodeAt(n));return t&&n.push(0),n},al=e=>{let t=Math.PI/180*e,n=Math.round(Math.cos(t)),r=Math.round(Math.sin(t));return[n,r,0,-r,n,0,0,0,1]},ol=al(0),sl=e=>[nl(e[0]),nl(e[1]),rl(e[2]),nl(e[3]),nl(e[4]),rl(e[5]),nl(e[6]),nl(e[7]),rl(e[8])],Q=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),$=(e,t,n,r,i)=>Q(e,[J(t),Zc(n),r??[]],i),cl=e=>e.isQuickTime?Q(`ftyp`,[Z(`qt  `),X(512),Z(`qt  `)]):e.fragmented?e.cmaf?Q(`ftyp`,[Z(`iso5`),X(512),Z(`iso5`),Z(`iso6`),Z(`mp41`),Z(`cmfc`),Z(`dash`)]):Q(`ftyp`,[Z(`iso5`),X(512),Z(`iso5`),Z(`iso6`),Z(`mp41`)]):Q(`ftyp`,[Z(`isom`),X(512),Z(`isom`),e.holdsAvc?Z(`avc1`):[],Z(`mp41`)]),ll=()=>Q(`styp`,[Z(`iso5`),X(0),Z(`iso5`),Z(`iso6`),Z(`mp41`),Z(`cmfc`),Z(`dash`)]),ul=(e,t)=>{let n=e.maxWrittenEndTimestamp-e.minWrittenTimestamp;return Number.isFinite(n)||(n=0),$(`sidx`,1,0,[X(1),X(Bu),$c(Uu(e.minWrittenTimestamp,Bu)),$c(0),Y(0),Y(1),X(t&2147483647),X(Uu(n,Bu)),X(0)])},dl=e=>({type:`mdat`,largeSize:e}),fl=e=>({type:`free`,size:e}),pl=e=>Q(`moov`,void 0,[ml(e.creationTime,e.trackDatas),...e.trackDatas.map(t=>gl(t,e.creationTime)),e.isFragmented?ru(e.trackDatas):null,vu(e)]),ml=(e,t)=>{let n=Math.max(0,...t.map(e=>Uu(hl(e),Bu)+Uu(e.startTimestampOffset??0,Bu))),r=Math.max(0,...t.map(e=>e.track.id))+1,i=!Lo(e)||!Lo(n),a=i?$c:X;return $(`mvhd`,+i,0,[a(e),a(e),X(Bu),a(n),nl(1),tl(1),Array(10).fill(0),sl(ol),Array(24).fill(0),X(r)])},hl=e=>{if(e.samples.length===0)return 0;let t=1/0,n=-1/0;for(let r=0;r<e.samples.length;r++){let i=e.samples[r];i.timestamp<t&&(t=i.timestamp),i.timestamp+i.duration>n&&(n=i.timestamp+i.duration)}return t===1/0?0:n-t},gl=(e,t)=>{let n=Hu(e),r=e.startTimestampOffset!==null&&e.startTimestampOffset>0;return Q(`trak`,void 0,[_l(e,t),r?vl(e,e.startTimestampOffset):null,yl(e,t),n.name===void 0?null:Q(`udta`,void 0,[Q(`name`,[...Vo.encode(n.name)])])])},_l=(e,t)=>{let n=Uu(hl(e),Bu)+Uu(e.startTimestampOffset??0,Bu),r=!Lo(t)||!Lo(n),i=r?$c:X,a;if(e.type===`video`){let t=e.track.metadata.rotation;a=al(t??0)}else a=ol;let o=2;return e.track.metadata.disposition?.default!==!1&&(o|=1),$(`tkhd`,+r,o,[i(t),i(t),X(e.track.id),X(0),i(n),Array(8).fill(0),Y(0),Y(e.track.id),tl(+(e.type===`audio`)),Y(0),sl(a),nl(e.type===`video`?e.info.width:0),nl(e.type===`video`?e.info.height:0)])},vl=(e,t)=>{let n=Uu(t,Bu),r=Uu(hl(e),Bu),i=!Lo(n)||!Lo(r),a=i?$c:X,o=i?el:Qc;return Q(`edts`,void 0,[$(`elst`,+!!i,0,[X(2),a(n),o(-1),nl(1),a(r),o(0),nl(1)])])},yl=(e,t)=>Q(`mdia`,void 0,[bl(e,t),Cl(!0,xl[e.type],Sl[e.type]),wl(e)]),bl=(e,t)=>{let n=Uu(hl(e),e.timescale),r=!Lo(t)||!Lo(n),i=r?$c:X;return $(`mdhd`,+r,0,[i(t),i(t),X(e.timescale),i(n),Y(Mu(e.track.metadata.languageCode??`und`)),Y(0)])},xl={video:`vide`,audio:`soun`,subtitle:`text`},Sl={video:`MediabunnyVideoHandler`,audio:`MediabunnySoundHandler`,subtitle:`MediabunnyTextHandler`},Cl=(e,t,n,r=`\0\0\0\0`)=>$(`hdlr`,0,0,[e?Z(`mhlr`):X(0),Z(t),Z(r),X(0),X(0),Z(n,!0)]),wl=e=>Q(`minf`,void 0,[Tl[e.type](),El(),kl(e)]),Tl={video:()=>$(`vmhd`,0,1,[Y(0),Y(0),Y(0),Y(0)]),audio:()=>$(`smhd`,0,0,[Y(0),Y(0)]),subtitle:()=>$(`nmhd`,0,0)},El=()=>Q(`dinf`,void 0,[Dl()]),Dl=()=>$(`dref`,0,0,[X(1)],[Ol()]),Ol=()=>$(`url `,0,1),kl=e=>{let t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(e=>e.sampleCompositionTimeOffset!==0);return Q(`stbl`,void 0,[Al(e),Xl(e),t?tu(e):null,t?nu(e):null,Ql(e),$l(e),eu(e),Zl(e)])},Al=e=>{let t;if(e.type===`video`)t=jl(Eu(e.track.source._codec,e.info.decoderConfig.codec),e);else if(e.type===`audio`){let n=Ou(e.track.source._codec,e.muxer.isQuickTime);H(n),t=Rl(n,e)}else e.type===`subtitle`&&(t=Jl(Au[e.track.source._codec],e));return H(t),$(`stsd`,0,0,[X(1)],[t])},jl=(e,t)=>Q(e,[[,,,,,,].fill(0),Y(1),Y(0),Y(0),Array(12).fill(0),Y(t.info.width),Y(t.info.height),X(4718592),X(4718592),X(0),Y(1),Array(32).fill(0),Y(24),Xc(65535)],[Du[t.track.source._codec](t),Ml(t),Go(t.info.decoderConfig.colorSpace)?Nl(t):null]),Ml=e=>e.info.pixelAspectRatio.num===e.info.pixelAspectRatio.den?null:Q(`pasp`,[X(e.info.pixelAspectRatio.num),X(e.info.pixelAspectRatio.den)]),Nl=e=>Q(`colr`,[Z(`nclx`),Y(Ho[e.info.decoderConfig.colorSpace.primaries]),Y(Uo[e.info.decoderConfig.colorSpace.transfer]),Y(Wo[e.info.decoderConfig.colorSpace.matrix]),J(!!e.info.decoderConfig.colorSpace.fullRange<<7)]),Pl=e=>e.info.decoderConfig&&Q(`avcC`,[...zo(e.info.decoderConfig.description)]),Fl=e=>e.info.decoderConfig&&Q(`hvcC`,[...zo(e.info.decoderConfig.description)]),Il=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig,n=t.codec.split(`.`),r=Number(n[1]),i=Number(n[2]),a=Number(n[3]),o=n[4]?Number(n[4]):1,s=n[8]?Number(n[8]):Number(t.colorSpace?.fullRange??0),c=(a<<4)+(o<<1)+s,l=n[5]?Number(n[5]):t.colorSpace?.primaries?Ho[t.colorSpace.primaries]:2,u=n[6]?Number(n[6]):t.colorSpace?.transfer?Uo[t.colorSpace.transfer]:2,d=n[7]?Number(n[7]):t.colorSpace?.matrix?Wo[t.colorSpace.matrix]:2;return $(`vpcC`,1,0,[J(r),J(i),J(c),J(l),J(u),J(d),Y(0)])},Ll=e=>Q(`av1C`,Ms(e.info.decoderConfig.codec)),Rl=(e,t)=>{let n=0,r,i=16,a=Cs.includes(t.track.source._codec);if(a){let e=t.track.source._codec,{sampleSize:r}=Ps(e);i=8*r,i>16&&(n=1)}if(t.muxer.isQuickTime&&(n=1),n===0)r=[[,,,,,,].fill(0),Y(1),Y(n),Y(0),X(0),Y(t.info.numberOfChannels),Y(i),Y(0),Y(0),Y(t.info.sampleRate<2**16?t.info.sampleRate:0),Y(0)];else{let e=a?0:-2;r=[[,,,,,,].fill(0),Y(1),Y(n),Y(0),X(0),Y(t.info.numberOfChannels),Y(Math.min(i,16)),Xc(e),Y(0),Y(t.info.sampleRate<2**16?t.info.sampleRate:0),Y(0),a?[X(1),X(i/8),X(t.info.numberOfChannels*i/8)]:[X(0),X(0),X(0)],X(2)]}return Q(e,r,[ku(t.track.source._codec,t.muxer.isQuickTime)?.(t)??null])},zl=e=>{let t;switch(e.track.source._codec){case`aac`:t=64;break;case`mp3`:t=107;break;case`vorbis`:t=221;break;default:throw Error(`Unhandled audio codec: ${e.track.source._codec}`)}let n=[...J(t),...J(21),...Zc(0),...X(0),...X(0)];if(e.info.decoderConfig.description){let t=zo(e.info.decoderConfig.description);n=[...n,...J(5),...il(t.byteLength),...t]}return n=[...Y(1),...J(0),...J(4),...il(n.length),...n,...J(6),...J(1),...J(2)],n=[...J(3),...il(n.length),...n],$(`esds`,0,0,n)},Bl=e=>Q(`wave`,void 0,[Vl(e),Hl(e),Q(`\0\0\0\0`)]),Vl=e=>Q(`frma`,[Z(Ou(e.track.source._codec,e.muxer.isQuickTime))]),Hl=e=>{let{littleEndian:t}=Ps(e.track.source._codec);return Q(`enda`,[Y(+t)])},Ul=e=>{let t=e.info.numberOfChannels,n=3840,r=e.info.sampleRate,i=0,a=0,o=new Uint8Array,s=e.info.decoderConfig?.description;if(s){H(s.byteLength>=18);let e=_c(zo(s));t=e.outputChannelCount,n=e.preSkip,r=e.inputSampleRate,i=e.outputGain,a=e.channelMappingFamily,e.channelMappingTable&&(o=e.channelMappingTable)}return Q(`dOps`,[J(0),J(t),Y(n),X(r),Xc(i),J(a),...o])},Wl=e=>{let t=e.info.decoderConfig?.description;return H(t),$(`dfLa`,0,0,[...zo(t).subarray(4)])},Gl=e=>{let{littleEndian:t,sampleSize:n}=Ps(e.track.source._codec);return $(`pcmC`,0,0,[J(+t),J(8*n)])},Kl=e=>{let t=yc(e.info.firstPacket.data);if(!t)throw Error(`Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=new Uint8Array(3),r=new vs(n);return r.writeBits(2,t.fscod),r.writeBits(5,t.bsid),r.writeBits(3,t.bsmod),r.writeBits(3,t.acmod),r.writeBits(1,t.lfeon),r.writeBits(5,t.bitRateCode),r.writeBits(5,0),Q(`dac3`,[...n])},ql=e=>{let t=bc(e.info.firstPacket.data);if(!t)throw Error(`Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=16;for(let e of t.substreams)n+=23,e.numDepSub>0?n+=9:n+=1;let r=Math.ceil(n/8),i=new Uint8Array(r),a=new vs(i);a.writeBits(13,t.dataRate),a.writeBits(3,t.substreams.length-1);for(let e of t.substreams)a.writeBits(2,e.fscod),a.writeBits(5,e.bsid),a.writeBits(1,0),a.writeBits(1,0),a.writeBits(3,e.bsmod),a.writeBits(3,e.acmod),a.writeBits(1,e.lfeon),a.writeBits(3,0),a.writeBits(4,e.numDepSub),e.numDepSub>0?a.writeBits(9,e.chanLoc):a.writeBits(1,0);return Q(`dec3`,[...i])},Jl=(e,t)=>Q(e,[[,,,,,,].fill(0),Y(1)],[ju[t.track.source._codec](t)]),Yl=e=>Q(`vttC`,[...Vo.encode(e.info.config.description)]),Xl=e=>$(`stts`,0,0,[X(e.timeToSampleTable.length),e.timeToSampleTable.map(e=>[X(e.sampleCount),X(e.sampleDelta)])]),Zl=e=>{if(e.samples.every(e=>e.type===`key`))return null;let t=[...e.samples.entries()].filter(([,e])=>e.type===`key`);return $(`stss`,0,0,[X(t.length),t.map(([e])=>X(e+1))])},Ql=e=>$(`stsc`,0,0,[X(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(e=>[X(e.firstChunk),X(e.samplesPerChunk),X(1)])]),$l=e=>{if(e.type===`audio`&&e.info.requiresPcmTransformation){let{sampleSize:t}=Ps(e.track.source._codec);return $(`stsz`,0,0,[X(t*e.info.numberOfChannels),X(e.samples.reduce((t,n)=>t+Uu(n.duration,e.timescale),0))])}return $(`stsz`,0,0,[X(0),X(e.samples.length),e.samples.map(e=>X(e.size))])},eu=e=>e.finalizedChunks.length>0&&Io(e.finalizedChunks).offset>=2**32?$(`co64`,0,0,[X(e.finalizedChunks.length),e.finalizedChunks.map(e=>$c(e.offset))]):$(`stco`,0,0,[X(e.finalizedChunks.length),e.finalizedChunks.map(e=>X(e.offset))]),tu=e=>$(`ctts`,1,0,[X(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(e=>[X(e.sampleCount),Qc(e.sampleCompositionTimeOffset)])]),nu=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;H(e.compositionTimeOffsetTable.length>0),H(e.samples.length>0);for(let r=0;r<e.compositionTimeOffsetTable.length;r++){let i=e.compositionTimeOffsetTable[r];t=Math.min(t,i.sampleCompositionTimeOffset),n=Math.max(n,i.sampleCompositionTimeOffset)}for(let t=0;t<e.samples.length;t++){let n=e.samples[t];r=Math.min(r,Uu(n.timestamp,e.timescale)),i=Math.max(i,Uu(n.timestamp+n.duration,e.timescale))}let a=Math.max(-t,0);return i>=2**31?null:$(`cslg`,0,0,[Qc(a),Qc(t),Qc(n),Qc(r),Qc(i)])},ru=e=>Q(`mvex`,void 0,e.map(iu)),iu=e=>$(`trex`,0,0,[X(e.track.id),X(1),X(0),X(0),X(0)]),au=(e,t)=>Q(`moof`,void 0,[ou(e),...t.map(cu)]),ou=e=>$(`mfhd`,0,0,[X(e)]),su=e=>{let t=0,n=0,r=e.type===`delta`;return n|=+r,r?t|=1:t|=2,t<<24|n<<16|0},cu=e=>Q(`traf`,void 0,[lu(e),uu(e),du(e)]),lu=e=>{H(e.currentChunk);let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],r={duration:n.timescaleUnitsToNextSample,size:n.size,flags:su(n)};return $(`tfhd`,0,t,[X(e.track.id),X(r.duration),X(r.size),X(r.flags)])},uu=e=>(H(e.currentChunk),$(`tfdt`,1,0,[$c(Uu(e.currentChunk.startTimestamp,e.timescale))])),du=e=>{H(e.currentChunk);let t=e.currentChunk.samples.map(e=>e.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(e=>e.size),r=e.currentChunk.samples.map(su),i=e.currentChunk.samples.map(t=>Uu(t.timestamp-t.decodeTimestamp,e.timescale)),a=new Set(t),o=new Set(n),s=new Set(r),c=new Set(i),l=s.size===2&&r[0]!==r[1],u=a.size>1,d=o.size>1,f=!l&&s.size>1,p=c.size>1||[...c].some(e=>e!==0),m=0;return m|=1,m|=4*l,m|=256*u,m|=512*d,m|=1024*f,m|=2048*p,$(`trun`,1,m,[X(e.currentChunk.samples.length),X(e.currentChunk.offset-e.currentChunk.moofOffset||0),l?X(r[0]):[],e.currentChunk.samples.map((e,a)=>[u?X(t[a]):[],d?X(n[a]):[],f?X(r[a]):[],p?Qc(i[a]):[]])])},fu=e=>Q(`mfra`,void 0,[...e.map(pu),mu()]),pu=(e,t)=>$(`tfra`,1,0,[X(e.track.id),X(63),X(e.finalizedChunks.length),e.finalizedChunks.map(n=>[$c(Uu(n.samples[0].timestamp,e.timescale)),$c(n.moofOffset),X(t+1),X(1),X(1)])]),mu=()=>$(`mfro`,0,0,[X(0)]),hu=()=>Q(`vtte`),gu=(e,t,n,r,i)=>Q(`vttc`,void 0,[i===null?null:Q(`vsid`,[Qc(i)]),n===null?null:Q(`iden`,[...Vo.encode(n)]),t===null?null:Q(`ctim`,[...Vo.encode(G(t))]),r===null?null:Q(`sttg`,[...Vo.encode(r)]),Q(`payl`,[...Vo.encode(e)])]),_u=e=>Q(`vtta`,[...Vo.encode(e)]),vu=e=>{let t=[],n=e.format._options.metadataFormat??`auto`,r=e.output._metadataTags;if(n===`mdir`||n===`auto`&&!e.isQuickTime){let e=Cu(r);e&&t.push(e)}else if(n===`mdta`){let e=wu(r);e&&t.push(e)}else(n===`udta`||n===`auto`&&e.isQuickTime)&&yu(t,e.output._metadataTags);return t.length===0?null:Q(`udta`,void 0,t)},yu=(e,t)=>{for(let{key:n,value:r}of os(t))switch(n){case`title`:e.push(bu(`©nam`,r));break;case`description`:e.push(bu(`©des`,r));break;case`artist`:e.push(bu(`©ART`,r));break;case`album`:e.push(bu(`©alb`,r));break;case`albumArtist`:e.push(bu(`albr`,r));break;case`genre`:e.push(bu(`©gen`,r));break;case`date`:e.push(bu(`©day`,r.toISOString().slice(0,10)));break;case`comment`:e.push(bu(`©cmt`,r));break;case`lyrics`:e.push(bu(`©lyr`,r));break;case`raw`:break;case`discNumber`:case`discsTotal`:case`trackNumber`:case`tracksTotal`:case`images`:break;default:Xo(n)}if(t.raw)for(let n in t.raw){let r=t.raw[n];r==null||n.length!==4||e.some(e=>e.type===n)||(typeof r==`string`?e.push(bu(n,r)):r instanceof Uint8Array&&e.push(Q(n,Array.from(r))))}},bu=(e,t)=>{let n=Vo.encode(t);return Q(e,[Y(n.length),Y(Mu(`und`)),Array.from(n)])},xu={"image/jpeg":13,"image/png":14,"image/bmp":27},Su=(e,t)=>{let n=[];for(let{key:r,value:i}of os(e))switch(r){case`title`:n.push({key:t?`title`:`©nam`,value:Tu(i)});break;case`description`:n.push({key:t?`description`:`©des`,value:Tu(i)});break;case`artist`:n.push({key:t?`artist`:`©ART`,value:Tu(i)});break;case`album`:n.push({key:t?`album`:`©alb`,value:Tu(i)});break;case`albumArtist`:n.push({key:t?`album_artist`:`aART`,value:Tu(i)});break;case`comment`:n.push({key:t?`comment`:`©cmt`,value:Tu(i)});break;case`genre`:n.push({key:t?`genre`:`©gen`,value:Tu(i)});break;case`lyrics`:n.push({key:t?`lyrics`:`©lyr`,value:Tu(i)});break;case`date`:n.push({key:t?`date`:`©day`,value:Tu(i.toISOString().slice(0,10))});break;case`images`:for(let e of i)e.kind===`coverFront`&&n.push({key:`covr`,value:Q(`data`,[X(xu[e.mimeType]??0),X(0),Array.from(e.data)])});break;case`trackNumber`:if(t){let t=e.tracksTotal===void 0?i.toString():`${i}/${e.tracksTotal}`;n.push({key:`track`,value:Tu(t)})}else n.push({key:`trkn`,value:Q(`data`,[X(0),X(0),Y(0),Y(i),Y(e.tracksTotal??0),Y(0)])});break;case`discNumber`:t||n.push({key:`disc`,value:Q(`data`,[X(0),X(0),Y(0),Y(i),Y(e.discsTotal??0),Y(0)])});break;case`tracksTotal`:case`discsTotal`:break;case`raw`:break;default:Xo(r)}if(e.raw)for(let r in e.raw){let i=e.raw[r];i==null||!t&&r.length!==4||n.some(e=>e.key===r)||(typeof i==`string`?n.push({key:r,value:Tu(i)}):i instanceof Uint8Array?n.push({key:r,value:Q(`data`,[X(0),X(0),Array.from(i)])}):i instanceof ms&&n.push({key:r,value:Q(`data`,[X(xu[i.mimeType]??0),X(0),Array.from(i.data)])}))}return n},Cu=e=>{let t=Su(e,!1);return t.length===0?null:$(`meta`,0,0,void 0,[Cl(!1,`mdir`,``,`appl`),Q(`ilst`,void 0,t.map(e=>Q(e.key,void 0,[e.value])))])},wu=e=>{let t=Su(e,!0);return t.length===0?null:Q(`meta`,void 0,[Cl(!1,`mdta`,``),$(`keys`,0,0,[X(t.length)],t.map(e=>Q(`mdta`,[...Vo.encode(e.key)]))),Q(`ilst`,void 0,t.map((e,t)=>Q(String.fromCharCode(...X(t+1)),void 0,[e.value])))])},Tu=e=>Q(`data`,[X(1),X(0),...Vo.encode(e)]),Eu=(e,t)=>{switch(e){case`avc`:return t.startsWith(`avc3`)?`avc3`:`avc1`;case`hevc`:return`hvc1`;case`vp8`:return`vp08`;case`vp9`:return`vp09`;case`av1`:return`av01`}},Du={avc:Pl,hevc:Fl,vp8:Il,vp9:Il,av1:Ll},Ou=(e,t)=>{switch(e){case`aac`:return`mp4a`;case`mp3`:return`mp4a`;case`opus`:return`Opus`;case`vorbis`:return`mp4a`;case`flac`:return`fLaC`;case`ulaw`:return`ulaw`;case`alaw`:return`alaw`;case`pcm-u8`:return`raw `;case`pcm-s8`:return`sowt`;case`ac3`:return`ac-3`;case`eac3`:return`ec-3`}if(t)switch(e){case`pcm-s16`:return`sowt`;case`pcm-s16be`:return`twos`;case`pcm-s24`:return`in24`;case`pcm-s24be`:return`in24`;case`pcm-s32`:return`in32`;case`pcm-s32be`:return`in32`;case`pcm-f32`:return`fl32`;case`pcm-f32be`:return`fl32`;case`pcm-f64`:return`fl64`;case`pcm-f64be`:return`fl64`}else switch(e){case`pcm-s16`:return`ipcm`;case`pcm-s16be`:return`ipcm`;case`pcm-s24`:return`ipcm`;case`pcm-s24be`:return`ipcm`;case`pcm-s32`:return`ipcm`;case`pcm-s32be`:return`ipcm`;case`pcm-f32`:return`fpcm`;case`pcm-f32be`:return`fpcm`;case`pcm-f64`:return`fpcm`;case`pcm-f64be`:return`fpcm`}},ku=(e,t)=>{switch(e){case`aac`:return zl;case`mp3`:return zl;case`opus`:return Ul;case`vorbis`:return zl;case`flac`:return Wl;case`ac3`:return Kl;case`eac3`:return ql}if(t)switch(e){case`pcm-s24`:return Bl;case`pcm-s24be`:return Bl;case`pcm-s32`:return Bl;case`pcm-s32be`:return Bl;case`pcm-f32`:return Bl;case`pcm-f32be`:return Bl;case`pcm-f64`:return Bl;case`pcm-f64be`:return Bl}else switch(e){case`pcm-s16`:return Gl;case`pcm-s16be`:return Gl;case`pcm-s24`:return Gl;case`pcm-s24be`:return Gl;case`pcm-s32`:return Gl;case`pcm-s32be`:return Gl;case`pcm-f32`:return Gl;case`pcm-f32be`:return Gl;case`pcm-f64`:return Gl;case`pcm-f64be`:return Gl}return null},Au={webvtt:`wvtt`},ju={webvtt:Yl},Mu=e=>{H(e.length===3);let t=0;for(let n=0;n<3;n++)t<<=5,t+=e.charCodeAt(n)-96;return t},Nu=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw Error(`Can't have multiple Writers for the same Target.`);this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){H(!this.started),this.target._start(),this.started=!0}write(e){H(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return H(this.started&&!this.finalized),this.target._flush()}async finalize(){H(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let n=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<n;)r*=2;if(r!==this.trackedWrites.byteLength){let e=new Uint8Array(r);e.set(this.trackedWrites,0),this.trackedWrites=e}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(2**10),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw Error(`Internal error: Can't get tracked writes since nothing was tracked.`);let e={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,e}};Tc();var Pu=class extends ds{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit(`write`,{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw TypeError(`offset must be a non-negative integer.`);return new Ru(this,e)}},Fu=2**16,Iu=2**32,Lu=class extends Pu{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!=`object`)throw TypeError(`BufferTarget options, when provided, must be an object.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);if(this._options=e,this._supportsResize=`resize`in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(Fu,{maxByteLength:Iu})}catch{this._buffer=new ArrayBuffer(Fu),this._supportsResize=!1}else this._buffer=new ArrayBuffer(Fu);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>Iu)throw Error(`ArrayBuffer exceeded maximum size of ${Iu} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let e=new ArrayBuffer(t),n=new Uint8Array(e);n.set(this._bytes,0),this._buffer=e,this._bytes=n}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit(`finalized`)}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},Ru=class extends Pu{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit(`finalized`)}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},zu=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!=`string`)throw TypeError(`rootPath must be a string.`);if(typeof t!=`function`)throw TypeError(`getTarget must be a function.`)}},Bu=57600,Vu=2082844800,Hu=e=>{let t={},n=e.track;return n.metadata.name!==void 0&&(t.name=n.metadata.name),t},Uu=(e,t,n=!0)=>{let r=e*t;return n?Math.round(r):r},Wu=class extends qc{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new Lu,this.auxWriter=new Nu(this.auxTarget,!1),this.auxBoxWriter=new Yc(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Yo(),this.creationTime=Math.floor(Date.now()/1e3)+Vu,this.finalizedChunks=[],this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.isQuickTime=t instanceof rd,this.isCmaf=t instanceof nd,this.minimumFragmentDuration=t._options.minimumFragmentDuration??(t instanceof nd?1/0:1)}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart=`fragmented`,this.isFragmented=!0):(this.writer=await this.output._getRootWriter(e=>this.format._options.fastStart===void 0?e instanceof Lu:this.format._options.fastStart===`fragmented`),this.boxWriter=new Yc(this.writer),this.fastStart=this.format._options.fastStart??(this.writer.target instanceof Lu&&`in-memory`),this.isFragmented=this.fastStart===`fragmented`),this.isCmaf){if(!this.output._hasInitTarget())throw Error(`CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.`);let e=new Nu(await this.output._getInitTarget(),!0);e.start(),this.initWriter=e,this.initBoxWriter=new Yc(e)}let t=this.output._tracks.some(e=>e.isVideoTrack()&&e.source._codec===`avc`);{let e=this.initBoxWriter??this.boxWriter;if(H(e),this.format._options.onFtyp&&e.writer.startTrackingWrites(),e.writeBox(cl({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.format._options.onFtyp){let{data:t,start:n}=e.writer.stopTrackingWrites();this.format._options.onFtyp(t,n)}this.ftypSize=e.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!==`in-memory`)if(this.fastStart===`reserve`){for(let e of this.output._tracks)if(e.metadata.maximumPacketCount===void 0)throw Error(`All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.`)}else this.isFragmented||(H(this.writer),H(this.boxWriter),this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat=dl(!0),this.boxWriter.writeBox(this.mdat));await this.writer?.flush(),e()}allTracksAreKnown(){for(let e of this.output._tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(e=>e.type===`video`||e.type===`audio`?e.info.decoderConfig.codec:{webvtt:`wvtt`}[e.track.source._codec]);return Cc({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(e=>e.type===`video`),hasAudio:this.trackDatas.some(e=>e.type===`audio`),codecStrings:e})}getVideoTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Hs(n),H(n),H(n.decoderConfig);let i={...n.decoderConfig};H(i.codedWidth!==void 0),H(i.codedHeight!==void 0);let a=!1;if(e.source._codec===`avc`&&!i.description){let e=ec(t.data);if(!e)throw Error(`Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.`);i.description=tc(e),a=!0}else if(e.source._codec===`hevc`&&!i.description){let e=sc(t.data);if(!e)throw Error(`Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.`);i.description=hc(e),a=!0}let o=ns(1/(e.metadata.frameRate??57600),1e6).denominator,s=i.displayAspectWidth,c=i.displayAspectHeight,l=s===void 0||c===void 0?{num:1,den:1}:cs({num:s*i.codedHeight,den:c*i.codedWidth}),u={muxer:this,track:e,type:`video`,info:{width:i.codedWidth,height:i.codedHeight,pixelAspectRatio:l,decoderConfig:i,requiresAnnexBTransformation:a},timescale:o,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(u),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),u}getAudioTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Ws(n),H(n),H(n.decoderConfig);let i={...n.decoderConfig},a=!1;if(e.source._codec===`aac`&&!i.description){let e=wc(Wc.tempFromBytes(t.data));if(!e)throw Error(`Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.`);let n=ys[e.samplingFrequencyIndex],r=bs[e.channelConfiguration];if(n===void 0||r===void 0)throw Error(`Invalid ADTS frame header.`);i.description=xs({objectType:e.objectType,sampleRate:n,numberOfChannels:r}),a=!0}let o={muxer:this,track:e,type:`audio`,info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:i,requiresPcmTransformation:!this.isFragmented&&Cs.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:a,firstPacket:t},timescale:i.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(o),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),o}getSubtitleTrackData(e,t){let n=this.trackDatas.find(t=>t.track===e);if(n)return n;Gs(t),H(t),H(t.config);let r={muxer:this,track:e,type:`subtitle`,info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,lastCueEndTimestamp:0,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getVideoTrackData(e,t,n),i=t.data;if(r.info.requiresAnnexBTransformation){let e=[...Xs(i)].map(e=>i.subarray(e.offset,e.offset+e.length));if(e.length===0)throw Error(`Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.`);i=$s(e,4)}let a=this.validateAndNormalizeTimestamp(r.track,t.timestamp,t.type===`key`),o=this.createSampleForTrack(r,i,a,t.duration,t.type);await this.registerSample(r,o)}finally{r()}}async addEncodedAudioPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getAudioTrackData(e,t,n),i=t.data;if(r.info.requiresAdtsStripping){let e=wc(Wc.tempFromBytes(i));if(!e)throw Error(`Expected ADTS frame, didn't get one.`);let t=e.crcCheck===null?7:9;i=i.subarray(t)}let a=this.validateAndNormalizeTimestamp(r.track,t.timestamp,t.type===`key`),o=t.duration;if(r.info.requiresPcmTransformation){let e=Ps(r.info.decoderConfig.codec).sampleSize*r.info.numberOfChannels;if(o=i.byteLength/e/r.info.sampleRate,r.info.expectedNextPcmPacketTimestamp!==null){let e=a-r.info.expectedNextPcmPacketTimestamp;if(e<.01)a=r.info.expectedNextPcmPacketTimestamp;else{let t=await this.padWithSilence(r,r.info.expectedNextPcmPacketTimestamp,e);a=r.info.expectedNextPcmPacketTimestamp+t}}r.info.expectedNextPcmPacketTimestamp=a+o}let s=this.createSampleForTrack(r,i,a,o,t.type);await this.registerSample(r,s)}finally{r()}}async padWithSilence(e,t,n){let r=Uu(n,e.timescale);if(n=r/e.timescale,r>0){let{sampleSize:i,silentValue:a}=Ps(e.info.decoderConfig.codec),o=r*e.info.numberOfChannels,s=new Uint8Array(i*o).fill(a),c=this.createSampleForTrack(e,new Uint8Array(s.buffer),t,n,`key`);await this.registerSample(e,c)}return n}async addSubtitleCue(e,t,n){let r=await this.mutex.acquire();try{let r=this.getSubtitleTrackData(e,n);this.validateAndNormalizeTimestamp(r.track,t.timestamp,!0),e.source._codec===`webvtt`&&(r.cueQueue.push(t),await this.processWebVTTCues(r,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){let n=new Set([]);for(let r of e.cueQueue)H(r.timestamp<=t),H(e.lastCueEndTimestamp<=r.timestamp+r.duration),n.add(Math.max(r.timestamp,e.lastCueEndTimestamp)),n.add(r.timestamp+r.duration);let r=[...n].sort((e,t)=>e-t),i=r[0],a=r[1]??i;if(t<a)break;if(e.lastCueEndTimestamp<i){this.auxWriter.seek(0);let t=hu();this.auxBoxWriter.writeBox(t);let n=this.auxTarget._getSlice(0,this.auxWriter.getPos()),r=this.createSampleForTrack(e,n,e.lastCueEndTimestamp,i-e.lastCueEndTimestamp,`key`);await this.registerSample(e,r),e.lastCueEndTimestamp=i}this.auxWriter.seek(0);for(let t=0;t<e.cueQueue.length;t++){let n=e.cueQueue[t];if(n.timestamp>=a)break;Jc.lastIndex=0;let r=Jc.test(n.text),o=n.timestamp+n.duration,s=e.cueToSourceId.get(n);if(s===void 0&&a<o&&(s=e.nextSourceId++,e.cueToSourceId.set(n,s)),n.notes){let e=_u(n.notes);this.auxBoxWriter.writeBox(e)}let c=gu(n.text,r?i:null,n.identifier??null,n.settings??null,s??null);this.auxBoxWriter.writeBox(c),o===a&&e.cueQueue.splice(t--,1)}let o=this.auxTarget._getSlice(0,this.auxWriter.getPos()),s=this.createSampleForTrack(e,o,i,a-i,`key`);await this.registerSample(e,s),e.lastCueEndTimestamp=a}}createSampleForTrack(e,t,n,r,i){return{timestamp:n,decodeTimestamp:n,duration:r,data:t,size:t.byteLength,type:i,timescaleUnitsToNextSample:Uu(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type===`audio`&&e.info.requiresPcmTransformation){this.isFragmented||(e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp);let t=0;for(let n=0;n<e.timestampProcessingQueue.length;n++){let r=e.timestampProcessingQueue[n],i=Uu(r.duration,e.timescale);t+=i}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:t,sampleDelta:1});else{let n=Io(e.timeToSampleTable);n.sampleCount+=t}e.timestampProcessingQueue.length=0;return}let n=e.timestampProcessingQueue.map(e=>e.timestamp).sort((e,t)=>e-t);this.isFragmented||(e.startTimestampOffset??=n[0]);for(let t=0;t<e.timestampProcessingQueue.length;t++){let r=e.timestampProcessingQueue[t];r.decodeTimestamp=n[t];let i=Uu(r.timestamp-r.decodeTimestamp,e.timescale),a=Uu(r.duration,e.timescale);if(e.lastTimescaleUnits!==null){H(e.lastSample);let t=Uu(r.decodeTimestamp,e.timescale,!1),n=Math.round(t-e.lastTimescaleUnits);if(H(n>=0),e.lastTimescaleUnits+=n,e.lastSample.timescaleUnitsToNextSample=n,!this.isFragmented){let t=Io(e.timeToSampleTable);if(H(t),t.sampleCount===1){t.sampleDelta=n;let r=e.timeToSampleTable[e.timeToSampleTable.length-2];r&&r.sampleDelta===n&&(r.sampleCount++,e.timeToSampleTable.pop(),t=r)}else t.sampleDelta!==n&&(t.sampleCount--,e.timeToSampleTable.push(t={sampleCount:1,sampleDelta:n}));t.sampleDelta===a?t.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let r=Io(e.compositionTimeOffsetTable);H(r),r.sampleCompositionTimeOffset===i?r.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i})}}else e.lastTimescaleUnits=Uu(r.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i}));e.lastSample=r}if(e.timestampProcessingQueue.length=0,H(e.lastSample),H(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){H(t.type===`key`);let n=Uu(t.timestamp,e.timescale,!1),r=Math.round(n-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=r}}async registerSample(e,t){t.type===`key`&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart===`reserve`?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart===`reserve`)){let t=e.track.metadata.maximumPacketCount;if(H(t!==void 0),e.samples.length>t)throw Error(`Track #${e.track.id} has already reached the maximum packet count (${t}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!e.currentChunk)n=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let i=this.trackDatas.every(n=>{if(e===n)return t.type===`key`;let r=n.sampleQueue[0];return r?r.type===`key`:n.closed});r>=this.minimumFragmentDuration&&i&&t.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=r>=.5}n&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null}),H(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(H(!this.isFragmented),H(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type===`audio`&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((t,n)=>t+Uu(n.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||Io(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart===`in-memory`){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(let t of e.currentChunk.samples)H(t.data),this.writer.write(t.data),t.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(H(this.isFragmented),!(!e&&!this.allTracksAreKnown()))outer:for(;;){let t=null,n=1/0;for(let r of this.trackDatas){if(!e&&r.sampleQueue.length===0&&!r.closed)break outer;r.sampleQueue.length>0&&r.sampleQueue[0].timestamp<n&&(t=r,n=r.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){H(this.isFragmented);let t=this.nextFragmentNumber++;if(t===1){let e=this.initBoxWriter??this.boxWriter;H(e),this.format._options.onMoov&&e.writer.startTrackingWrites();let t=pl(this);if(e.writeBox(t),this.format._options.onMoov){let{data:t,start:n}=e.writer.stopTrackingWrites();this.format._options.onMoov(t,n)}if(this.isCmaf){H(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new Yc(this.writer);let e=this.boxWriter.measureBox(ll()),t=this.boxWriter.measureBox(ul(this,0));this.segmentHeaderSize=e+t,this.writer.seek(this.segmentHeaderSize)}}H(this.writer),H(this.boxWriter);let n=this.trackDatas.filter(e=>e.currentChunk),r=au(t,n),i=this.writer.getPos(),a=i+this.boxWriter.measureBox(r),o=a+8,s=1/0;for(let e of n){e.currentChunk.offset=o,e.currentChunk.moofOffset=i;for(let t of e.currentChunk.samples)o+=t.size;s=Math.min(s,e.currentChunk.startTimestamp)}let c=o-a,l=c>=2**32;if(l)for(let e of n)e.currentChunk.offset+=8;this.format._options.onMoof&&this.writer.startTrackingWrites();let u=au(t,n);if(this.boxWriter.writeBox(u),this.format._options.onMoof){let{data:e,start:t}=this.writer.stopTrackingWrites();this.format._options.onMoof(e,t,s)}H(this.writer.getPos()===a),this.format._options.onMdat&&this.writer.startTrackingWrites();let d=dl(l);d.size=c,this.boxWriter.writeBox(d),this.writer.seek(a+(l?16:8));for(let e of n)for(let t of e.currentChunk.samples)this.writer.write(t.data),t.data=null;if(this.format._options.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.format._options.onMdat(e,t)}for(let e of n)e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk),e.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){if(H(this.writer),H(this.boxWriter),this.allTracksAreKnown()){if(!this.mdat){let e=pl(this),t=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;H(this.ftypSize!==null),this.writer.seek(this.ftypSize+t),this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat=dl(!0),this.boxWriter.writeBox(this.mdat);for(let e of this.trackDatas){for(let t of e.sampleQueue)await this.addSampleToTrack(e,t);e.sampleQueue.length=0}}await this.addSampleToTrack(e,t)}else e.sampleQueue.push(t)}computeSampleTableSizeUpperBound(){H(this.fastStart===`reserve`);let e=0;for(let t of this.trackDatas){let n=t.track.metadata.maximumPacketCount;H(n!==void 0),e+=8*Math.ceil(2/3*n),e+=4*n,e+=8*Math.ceil(2/3*n),e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n}return e}async onTrackClose(e){let t=await this.mutex.acquire(),n=this.trackDatas.find(t=>t.track===e);n&&(n.closed=!0,n.type===`subtitle`&&e.source._codec===`webvtt`&&await this.processWebVTTCues(n,1/0),this.processTimestamps(n)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve();for(let e of this.trackDatas)e.closed=!0,e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let e of this.trackDatas){await this.finalizeCurrentChunk(e),H(e.startTimestampOffset!==null);for(let t=0;t<e.samples.length;t++){let n=e.samples[t];n.timestamp-=e.startTimestampOffset,n.decodeTimestamp-=e.startTimestampOffset}}if(H(this.writer),H(this.boxWriter),this.fastStart===`in-memory`){this.mdat=dl(!1);let e;for(let t=0;t<2;t++){let t=pl(this),n=this.boxWriter.measureBox(t);e=this.boxWriter.measureBox(this.mdat);let r=this.writer.getPos()+n+e;for(let t of this.finalizedChunks){t.offset=r;for(let{data:n}of t.samples)H(n),r+=n.byteLength,e+=n.byteLength}if(r<2**32)break;e>=2**32&&(this.mdat.largeSize=!0)}this.format._options.onMoov&&this.writer.startTrackingWrites();let t=pl(this);if(this.boxWriter.writeBox(t),this.format._options.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.format._options.onMoov(e,t)}this.format._options.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=e,this.boxWriter.writeBox(this.mdat);for(let e of this.finalizedChunks)for(let t of e.samples)H(t.data),this.writer.write(t.data),t.data=null;if(this.format._options.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.format._options.onMdat(e,t)}}else if(this.isFragmented)if(this.isCmaf){let e=this.segmentHeaderSize===null?0:this.writer.getPos()-this.segmentHeaderSize;this.writer.seek(0),this.boxWriter.writeBox(ll()),this.boxWriter.writeBox(ul(this,e))}else{let e=this.writer.getPos(),t=fu(this.trackDatas);this.boxWriter.writeBox(t);let n=this.writer.getPos()-e;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(n)}else{H(this.mdat);let e=this.boxWriter.offsets.get(this.mdat);H(e!==void 0);let t=this.writer.getPos()-e;if(this.mdat.size=t,this.mdat.largeSize=t>=2**32,this.boxWriter.patchBox(this.mdat),this.format._options.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.format._options.onMdat(e,t)}let n=pl(this);if(this.fastStart===`reserve`){H(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.format._options.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);let e=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(fl(e))}else this.format._options.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);if(this.format._options.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.format._options.onMoov(e,t)}}e()}},Gu=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1,this._timestampOffset=0}_ensureValidAdd(){if(!this._connectedTrack)throw Error(`Source is not connected to an output track.`);if(this._connectedTrack.output.state===`canceled`)throw Error(`Output has been canceled.`);if(this._connectedTrack.output.state===`finalizing`||this._connectedTrack.output.state===`finalized`)throw Error(`Output has been finalized.`);if(this._connectedTrack.output.state===`pending`)throw Error(`Output has not started.`);if(this._closed)throw Error(`Source is closed.`)}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw Error(`Cannot call close without connecting the source to an output track.`);if(e.output.state===`pending`)throw Error(`Cannot call close before output has been started.`);this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,!(e.output.state===`finalizing`||e.output.state===`finalized`)&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},Ku=class extends Gu{constructor(e){if(super(),this._connectedTrack=null,!Ss.includes(e))throw TypeError(`Invalid video codec '${e}'. Must be one of: ${Ss.join(`, `)}.`);this._codec=e}},qu=(e,t)=>{if(e.metadata.hasOnlyKeyPackets&&t.type!==`key`)throw Error(`Cannot add non-key packets to a hasOnlyKeyPackets video track.`)},Ju=class{constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.resizeCanvas=null,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new rs,this.customEncoderQueueSize=0,this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.lastMuxerPromise=Promise.resolve();let n=t.sizeChangeBehavior??`deny`;if([`fill`,`contain`,`cover`].includes(n)&&t.transform?.fit!==void 0)throw TypeError(`Cannot set 'fit' when 'sizeChangeBehavior' is '${n}'. The size change behavior determines the fit in this case.`)}async add(e,t,n){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let i=this.encodingConfig,a=i.sizeChangeBehavior??`deny`,o=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(o=!0,a===`deny`))throw Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(i.transform?.width!==void 0||i.transform?.height!==void 0||i.transform?.rotate!==void 0||i.transform?.crop!==void 0||i.transform?.force===!0||o&&a!==`passThrough`){let n=Fo(e.rotation+(i.transform?.rotate??0)),[r,s]=n%180==0?[e.codedWidth,e.codedHeight]:[e.codedHeight,e.codedWidth],c=i.transform?.crop;c&&=Pc(c,r,s);let l=c?c.width:r,u=c?c.height:s,d=l/u,f,p,m=i.transform?.fit??`fill`;o&&a!==`passThrough`?(H(this.outputWidth),H(this.outputHeight),H(a!==`deny`),f=this.outputWidth,p=this.outputHeight,m=a):i.transform?.width!==void 0&&i.transform?.height===void 0?(f=i.transform.width,p=fs(Math.round(f/d))):i.transform?.width===void 0&&i.transform?.height!==void 0?(p=i.transform.height,f=fs(Math.round(p*d))):i.transform?.width!==void 0&&i.transform?.height!==void 0?(f=i.transform?.width,p=i.transform?.height):(f=l,p=u),(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=f,this.outputHeight=p);let h=!1;this.resizeCanvas?(this.resizeCanvas.width!==f||this.resizeCanvas.height!==p)&&(this.resizeCanvas.width=f,this.resizeCanvas.height=p):(typeof document<`u`?(this.resizeCanvas=document.createElement(`canvas`),this.resizeCanvas.width=f,this.resizeCanvas.height=p):this.resizeCanvas=new OffscreenCanvas(f,p),h=!0);let g=this.resizeCanvas.getContext(`2d`,{alpha:this.encodingConfig.alpha===`keep`||as()});H(g),typeof g.resetTransform==`function`&&g.resetTransform(),h||(as()?(g.fillStyle=`black`,g.fillRect(0,0,f,p)):g.clearRect(0,0,f,p)),e.drawWithFit(g,{fit:m,rotation:n,crop:c}),t&&e.close(),e=new jc(this.resizeCanvas,{timestamp:e.timestamp,duration:e.duration,rotation:0}),t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let s=i.transform?.frameRate;if(s!==void 0){let i=e.timestamp+e.duration,a=Qo(e.timestamp,s);if(this.frameRateLastSample!==null)if(a<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=i;return}else await this.padFrameRate(a,n);e===r&&(e=e.clone(),t=!0),e.setTimestamp(a),e.setDuration(1/s),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=a,this.frameRateLastEndTimestamp=i}await this.processAndEncode(e,n)}finally{t&&e.close()}}async processAndEncode(e,t){let n=this.encodingConfig,r;if(n.transform?.process){let t=n.transform.process(e);if(t instanceof Promise&&(t=await t),t===null)return;Array.isArray(t)||(t=[t]),r=t.map(t=>t instanceof jc?t:typeof VideoFrame<`u`&&t instanceof VideoFrame?new jc(t):new jc(t,{timestamp:e.timestamp,duration:e.duration}))}else r=[e];try{for(let e of r){this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),H(this.encoderInitialized);let n=this.encodingConfig.keyFrameInterval??2,r=Math.floor(e.timestamp/n),i={...t,keyFrame:t?.keyFrame||n===0||r!==this.lastMultipleOfKeyFrameInterval};if(this.lastMultipleOfKeyFrameInterval=r,this.customEncoder){this.customEncoderQueueSize++;let t=e.clone(),n=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(t,i)).then(()=>this.customEncoderQueueSize--).catch(e=>this.error??=e).finally(()=>{t.close()});this.customEncoderQueueSize>=4&&await n}else{H(this.encoder);let t=e.toVideoFrame(),n=Jo(this.preciseTimings,t.timestamp,e=>e.microsecondTimestamp),r=n===-1?null:this.preciseTimings[n];if(r&&r.microsecondTimestamp===t.timestamp?(r.timestamp!==e.timestamp&&(r.timestampIsValid=!1),r.duration!==e.duration&&(r.durationIsValid=!1)):(this.preciseTimings.splice(n+1,0,{microsecondTimestamp:t.timestamp,timestamp:e.timestamp,duration:e.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),!this.alphaEncoder)this.encoder.encode(t,i),t.close();else if(t.format&&!t.format.includes(`A`)||this.splitterCreationFailed)this.alphaFrameQueue.push(null),this.encoder.encode(t,i),t.close();else{let e=t.displayWidth,n=t.displayHeight;if(!this.splitter)try{this.splitter=new Yu(e,n)}catch(e){console.error(`Due to an error, only color data will be encoded.`,e),this.splitterCreationFailed=!0,this.alphaFrameQueue.push(null),this.encoder.encode(t,i),t.close()}if(this.splitter){let e=this.splitter.extractColor(t),n=this.splitter.extractAlpha(t);this.alphaFrameQueue.push(n),this.encoder.encode(e,i),e.close(),t.close()}}this.encoder.encodeQueueSize>=4&&await new Promise(e=>this.encoder.addEventListener(`dequeue`,e,{once:!0}))}await this.lastMuxerPromise}}finally{for(let t of r)t!==e&&t.close()}}async padFrameRate(e,t){let n=this.encodingConfig.transform.frameRate;H(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*n);for(let e=1;e<r;e++){let r=this.frameRateLastSample.clone();r.setTimestamp(this.frameRateLastTimestamp+e/n),r.setDuration(1/n),await this.processAndEncode(r,t),r.close()}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=Vc({...this.encodingConfig,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate});this.encodingConfig.onEncoderConfig?.(t);let n=Uc.find(e=>e.supports(this.encodingConfig.codec,t));if(n)this.customEncoder=new n,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=t,this.customEncoder.onPacket=(e,t)=>{if(!(e instanceof Sc))throw TypeError(`The first argument passed to onPacket must be an EncodedPacket.`);if(t!==void 0&&(!t||typeof t!=`object`))throw TypeError(`The second argument passed to onPacket must be an object or undefined.`);qu(this.source._connectedTrack,e),this.encodingConfig.onEncodedPacket?.(e,t),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,e,t).catch(e=>{this.error??=e})},await this.customEncoder.init();else{if(typeof VideoEncoder>`u`)throw Error(`VideoEncoder is not supported by this browser.`);if(t.alpha=`discard`,this.encodingConfig.alpha===`keep`&&(t.latencyMode=`quality`),(t.width%2==1||t.height%2==1)&&(this.encodingConfig.codec===`avc`||this.encodingConfig.codec===`hevc`))throw Error(`The dimensions ${t.width}x${t.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);if(!(await VideoEncoder.isConfigSupported(t)).supported)throw Error(`This specific encoder configuration (${t.codec}, ${t.bitrate} bps, ${t.width}x${t.height}, hardware acceleration: ${t.hardwareAcceleration??`no-preference`}) is not supported by this browser. Consider using another codec or changing your video parameters.`);let e=[],n=[],r=0,i=0,a=(e,t,n)=>{let r={};if(t){let e=new Uint8Array(t.byteLength);t.copyTo(e),r.alpha=e}let i=Sc.fromEncodedChunk(e,r),a=Jo(this.preciseTimings,e.timestamp,e=>e.microsecondTimestamp),o=a===-1?null:this.preciseTimings[a];o&&o.microsecondTimestamp===e.timestamp&&(i=i.clone({timestamp:o.timestampIsValid?o.timestamp:void 0,duration:o.durationIsValid?o.duration:void 0})),qu(this.source._connectedTrack,i),this.encodingConfig.onEncodedPacket?.(i,n),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,i,n).catch(e=>{this.error??=e})},o=Error(`Encoding error`).stack;if(this.encoder=new VideoEncoder({output:(t,o)=>{if(!this.alphaEncoder){a(t,null,o);return}let s=this.alphaFrameQueue.shift();H(s!==void 0),s?(this.alphaEncoder.encode(s,{keyFrame:t.type===`key`}),i++,s.close(),e.push({chunk:t,meta:o})):i===0?a(t,null,o):(n.push(r+i),e.push({chunk:t,meta:o}))},error:e=>{e.stack=o,this.error??=e}}),this.encoder.configure(t),this.encodingConfig.alpha===`keep`){let o=Error(`Encoding error`).stack;this.alphaEncoder=new VideoEncoder({output:(t,o)=>{i--;let s=e.shift();for(H(s!==void 0),a(s.chunk,t,s.meta),r++;n.length>0&&n[0]===r;){n.shift();let t=e.shift();H(t!==void 0),a(t.chunk,null,t.meta)}},error:e=>{e.stack=o,this.error??=e}}),this.alphaEncoder.configure(t)}}H(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}async flushAndClose(e){if(e||this.checkForEncoderError(),!e&&this.frameRateLastSample){let e=this.encodingConfig.transform.frameRate,t=Qo(this.frameRateLastEndTimestamp,e);await this.padFrameRate(t)}this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?(e||this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()),await this.customEncoderCallSerializer.call(()=>this.customEncoder.close())):this.encoder&&(e||(await this.encoder.flush(),await this.alphaEncoder?.flush()),this.encoder.state!==`closed`&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!==`closed`&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.splitter?.close()),e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.error)throw this.error}},Yu=class{constructor(e,t){this.lastFrame=null,typeof OffscreenCanvas<`u`?this.canvas=new OffscreenCanvas(e,t):(this.canvas=document.createElement(`canvas`),this.canvas.width=e,this.canvas.height=t);let n=this.canvas.getContext(`webgl2`,{alpha:!0});if(!n)throw Error(`Couldn't acquire WebGL 2 context.`);this.gl=n,this.colorProgram=this.createColorProgram(),this.alphaProgram=this.createAlphaProgram(),this.vao=this.createVAO(),this.sourceTexture=this.createTexture(),this.alphaResolutionLocation=this.gl.getUniformLocation(this.alphaProgram,`u_resolution`),this.gl.useProgram(this.colorProgram),this.gl.uniform1i(this.gl.getUniformLocation(this.colorProgram,`u_sourceTexture`),0),this.gl.useProgram(this.alphaProgram),this.gl.uniform1i(this.gl.getUniformLocation(this.alphaProgram,`u_sourceTexture`),0)}createVertexShader(){return this.createShader(this.gl.VERTEX_SHADER,`#version 300 es
			in vec2 a_position;
			in vec2 a_texCoord;
			out vec2 v_texCoord;
			
			void main() {
				gl_Position = vec4(a_position, 0.0, 1.0);
				v_texCoord = a_texCoord;
			}
		`)}createColorProgram(){let e=this.createVertexShader(),t=this.createShader(this.gl.FRAGMENT_SHADER,`#version 300 es
			precision highp float;
			
			uniform sampler2D u_sourceTexture;
			in vec2 v_texCoord;
			out vec4 fragColor;
			
			void main() {
				vec4 source = texture(u_sourceTexture, v_texCoord);
				fragColor = vec4(source.rgb, 1.0);
			}
		`),n=this.gl.createProgram();return this.gl.attachShader(n,e),this.gl.attachShader(n,t),this.gl.linkProgram(n),n}createAlphaProgram(){let e=this.createVertexShader(),t=this.createShader(this.gl.FRAGMENT_SHADER,`#version 300 es
			precision highp float;
			
			uniform sampler2D u_sourceTexture;
			uniform vec2 u_resolution; // The width and height of the canvas
			in vec2 v_texCoord;
			out vec4 fragColor;

			// This function determines the value for a single byte in the YUV stream
			float getByteValue(float byteOffset) {
				float width = u_resolution.x;
				float height = u_resolution.y;

				float yPlaneSize = width * height;

				if (byteOffset < yPlaneSize) {
					// This byte is in the luma plane. Find the corresponding pixel coordinates to sample from
					float y = floor(byteOffset / width);
					float x = mod(byteOffset, width);
					
					// Add 0.5 to sample the center of the texel
					vec2 sampleCoord = (vec2(x, y) + 0.5) / u_resolution;
					
					// The luma value is the alpha from the source texture
					return texture(u_sourceTexture, sampleCoord).a;
				} else {
					// Write a fixed value for chroma and beyond
					return 128.0 / 255.0;
				}
			}
			
			void main() {
				// Each fragment writes 4 bytes (R, G, B, A)
				float pixelIndex = floor(gl_FragCoord.y) * u_resolution.x + floor(gl_FragCoord.x);
				float baseByteOffset = pixelIndex * 4.0;

				vec4 result;
				for (int i = 0; i < 4; i++) {
					float currentByteOffset = baseByteOffset + float(i);
					result[i] = getByteValue(currentByteOffset);
				}
				
				fragColor = result;
			}
		`),n=this.gl.createProgram();return this.gl.attachShader(n,e),this.gl.attachShader(n,t),this.gl.linkProgram(n),n}createShader(e,t){let n=this.gl.createShader(e);return this.gl.shaderSource(n,t),this.gl.compileShader(n),this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS)||console.error(`Shader compile error:`,this.gl.getShaderInfoLog(n)),n}createVAO(){let e=this.gl.createVertexArray();this.gl.bindVertexArray(e);let t=new Float32Array([-1,-1,0,1,1,-1,1,1,-1,1,0,0,1,1,1,0]),n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n),this.gl.bufferData(this.gl.ARRAY_BUFFER,t,this.gl.STATIC_DRAW);let r=this.gl.getAttribLocation(this.colorProgram,`a_position`),i=this.gl.getAttribLocation(this.colorProgram,`a_texCoord`);return this.gl.enableVertexAttribArray(r),this.gl.vertexAttribPointer(r,2,this.gl.FLOAT,!1,16,0),this.gl.enableVertexAttribArray(i),this.gl.vertexAttribPointer(i,2,this.gl.FLOAT,!1,16,8),e}createTexture(){let e=this.gl.createTexture();return this.gl.bindTexture(this.gl.TEXTURE_2D,e),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),e}updateTexture(e){this.lastFrame!==e&&((e.displayWidth!==this.canvas.width||e.displayHeight!==this.canvas.height)&&(this.canvas.width=e.displayWidth,this.canvas.height=e.displayHeight),this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,this.sourceTexture),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),this.lastFrame=e)}extractColor(e){return this.updateTexture(e),this.gl.useProgram(this.colorProgram),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),new VideoFrame(this.canvas,{timestamp:e.timestamp,duration:e.duration??void 0,alpha:`discard`})}extractAlpha(e){this.updateTexture(e),this.gl.useProgram(this.alphaProgram),this.gl.uniform2f(this.alphaResolutionLocation,this.canvas.width,this.canvas.height),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.bindVertexArray(this.vao),this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4);let{width:t,height:n}=this.canvas,r=Math.ceil(t/2)*Math.ceil(n/2),i=t*n+r*2,a=Math.ceil(i/(t*4)),o=new Uint8Array(4*t*a);this.gl.readPixels(0,0,t,a,this.gl.RGBA,this.gl.UNSIGNED_BYTE,o),o=o.subarray(0,i),H(o[t*n]===128),H(o[o.length-1]===128);let s={format:`I420`,codedWidth:t,codedHeight:n,timestamp:e.timestamp,duration:e.duration??void 0,transfer:[o.buffer]};return new VideoFrame(o,s)}close(){this.gl.getExtension(`WEBGL_lose_context`)?.loseContext(),this.gl=null}},Xu=class extends Ku{constructor(e,t){if(!(typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas))throw TypeError(`canvas must be an HTMLCanvasElement or OffscreenCanvas.`);zc(t),super(t.codec),this._encoder=new Ju(this,t),this._canvas=e}add(e,t=0,n){if(!Number.isFinite(e)||e<0)throw TypeError(`timestamp must be a non-negative number.`);if(!Number.isFinite(t)||t<0)throw TypeError(`duration must be a non-negative number.`);let r=new jc(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,n)}_flushAndClose(e){return this._encoder.flushAndClose(e)}},Zu=class extends Gu{constructor(e){if(super(),this._connectedTrack=null,!Ts.includes(e))throw TypeError(`Invalid audio codec '${e}'. Must be one of: ${Ts.join(`, `)}.`);this._codec=e}},Qu=class extends Gu{constructor(e){if(super(),this._connectedTrack=null,!Es.includes(e))throw TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${Es.join(`, `)}.`);this._codec=e}},$u=class{getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>Ss.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>Ts.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>Es.includes(e))}_codecUnsupportedHint(e){return``}},ed=class extends $u{constructor(e={}){if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.fastStart!==void 0&&![!1,`in-memory`,`reserve`,`fragmented`].includes(e.fastStart))throw TypeError(`options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.`);if(e.minimumFragmentDuration!==void 0&&(!Number.isFinite(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw TypeError(`options.minimumFragmentDuration, when provided, must be a non-negative number.`);if(e.onFtyp!==void 0&&typeof e.onFtyp!=`function`)throw TypeError(`options.onFtyp, when provided, must be a function.`);if(e.onMoov!==void 0&&typeof e.onMoov!=`function`)throw TypeError(`options.onMoov, when provided, must be a function.`);if(e.onMdat!==void 0&&typeof e.onMdat!=`function`)throw TypeError(`options.onMdat, when provided, must be a function.`);if(e.onMoof!==void 0&&typeof e.onMoof!=`function`)throw TypeError(`options.onMoof, when provided, must be a function.`);if(e.metadataFormat!==void 0&&![`mdir`,`mdta`,`udta`,`auto`].includes(e.metadataFormat))throw TypeError(`options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.`);super(),this._options=e}getSupportedTrackCounts(){let e=2**32-1;return{video:{min:0,max:e},audio:{min:0,max:e},subtitle:{min:0,max:e},total:{min:1,max:e}}}get supportsVideoRotationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}_createMuxer(e){return new Wu(e,this)}},td=class extends ed{constructor(e){super(e)}get _name(){return`MP4`}get fileExtension(){return`.mp4`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...Ss,...ws,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...Es]}_codecUnsupportedHint(e){return new rd().getSupportedCodecs().includes(e)?` Switching to MOV will grant support for this codec.`:``}},nd=class extends ed{constructor(e){super(e)}get _name(){return`CMAF`}get fileExtension(){return`.m4s`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...Ss,...ws,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...Es]}},rd=class extends ed{constructor(e){super(e)}get _name(){return`MOV`}get fileExtension(){return`.mov`}get mimeType(){return`video/quicktime`}getSupportedCodecs(){return[...Ss,...Ts]}_codecUnsupportedHint(e){return new td().getSupportedCodecs().includes(e)?` Switching to MP4 will grant support for this codec.`:``}},id=[`video`,`audio`,`subtitle`],ad=class e{constructor(e,t,n,r,i){this.id=e,this.output=t,this.type=n,this.source=r,this.metadata=i}isVideoTrack(){return this.type===`video`}isAudioTrack(){return this.type===`audio`}isSubtitleTrack(){return this.type===`subtitle`}canBePairedWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrack.`);if(this===t)return!1;let n=us(this.metadata.group),r=us(t.metadata.group);for(let e of n)if(this.type!==t.type&&r.some(t=>e===t)||r.some(t=>e._pairedGroups.has(t)))return!0;return!1}},od=class extends ad{constructor(e,t,n,r){super(e,t,`video`,n,r)}},sd=class extends ad{constructor(e,t,n,r){super(e,t,`audio`,n,r)}},cd=class extends ad{constructor(e,t,n,r){super(e,t,`subtitle`,n,r)}},ld=class e{constructor(){this._pairedGroups=new Set}pairWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrackGroup.`);if(this===t)throw TypeError(`Cannot pair a group with itself.`);this._pairedGroups.add(t),t._pairedGroups.add(this)}},ud=e=>{if(!e||typeof e!=`object`)throw TypeError(`metadata must be an object.`);if(e.languageCode!==void 0&&!es(e.languageCode))throw TypeError(`metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.`);if(e.name!==void 0&&typeof e.name!=`string`)throw TypeError(`metadata.name, when provided, must be a string.`);if(e.disposition!==void 0&&_s(e.disposition),e.maximumPacketCount!==void 0&&(!Number.isInteger(e.maximumPacketCount)||e.maximumPacketCount<0))throw TypeError(`metadata.maximumPacketCount, when provided, must be a non-negative integer.`);if(e.group!==void 0&&!(e.group instanceof ld)&&(!Array.isArray(e.group)||e.group.some(e=>!(e instanceof ld))))throw TypeError(`metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.`)},dd=class extends ds{get target(){let e=`Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.`;if(this._rootTargetPromise)throw TypeError(e);let t=this._getRootTarget();if(t instanceof Promise)throw TypeError(e);return t}constructor(e){if(super(),this.state=`pending`,this.defaultTrackGroup=new ld,this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._tracks=[],this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new qo,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(!(e.format instanceof $u))throw TypeError(`options.format must be an OutputFormat.`);if(!(e.target instanceof Pu||e.target instanceof zu))throw TypeError(`options.target must be a Target or a PathedTarget.`);if(e.target instanceof Pu&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof Pu)&&typeof e.initTarget!=`function`)throw Error(`options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof Pu&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){H(this._target instanceof zu);let t=this._target.getTarget(e),n=e=>{if(!(e instanceof Pu))throw TypeError(`getTarget must return a Target.`);return e};return t instanceof Promise?t.then(n):n(t)}async _getTarget(e){H(this._target instanceof zu);let t=await this._getTargetValidated(e);return this._emit(`target`,{target:t,request:e,isRoot:e.isRoot}),this.state===`canceled`?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on(`finalized`,()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(H(this._initTarget!==null),this._initTarget instanceof Pu)return this._initTarget;let e=await this._initTarget();return this.state===`canceled`?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof Pu)return this._emit(`target`,{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),n=t=>(this.state===`canceled`?t._close():this._rememberTarget(t),this._emit(`target`,{target:t,request:e,isRoot:!0}),this._rootTarget=t,t);return t instanceof Promise?this._rootTargetPromise=t.then(n):n(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),n=new Nu(t,typeof e==`boolean`?e:e(t));return n.start(),n})()}addVideoTrack(e,t={}){if(!(e instanceof Ku))throw TypeError(`source must be a VideoSource.`);if(ud(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(!this.format.supportsVideoRotationMetadata&&t.rotation)throw Error(`${this.format._name} does not support video rotation metadata.`);if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new od(this._tracks.length+1,this,e,n))}addAudioTrack(e,t={}){if(!(e instanceof Zu))throw TypeError(`source must be an AudioSource.`);ud(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new sd(this._tracks.length+1,this,e,n))}addSubtitleTrack(e,t={}){if(!(e instanceof Qu))throw TypeError(`source must be a SubtitleSource.`);ud(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new cd(this._tracks.length+1,this,e,n))}setMetadataTags(e){if(gs(e),this.state!==`pending`)throw Error(`Cannot set metadata tags after output has been started or canceled.`);this._metadataTags=e}_addTrack(e){if(this.state!==`pending`)throw Error(`Cannot add track after output has been started or canceled.`);if(e.source._connectedTrack)throw Error(`Source is already used for a track.`);let t=this.format.getSupportedTrackCounts(),n=this._tracks.reduce((t,n)=>t+ +(n.type===e.type),0),r=t[e.type].max;if(n===r)throw Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?``:`s`}.`);let i=t.total.max;if(this._tracks.length===i)throw Error(`${this.format._name} does not support more than ${i} tracks${i===1?``:`s`} in total.`);if(e.isVideoTrack()){let t=this.format.getSupportedVideoCodecs();if(t.length===0)throw Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let t=this.format.getSupportedAudioCodecs();if(t.length===0)throw Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let t=this.format.getSupportedSubtitleCodecs();if(t.length===0)throw Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}return this._tracks.push(e),e.source._connectedTrack=e,e}async start(){let e=this.format.getSupportedTrackCounts();for(let t of id){let n=this._tracks.reduce((e,n)=>e+ +(n.type===t),0),r=e[t].min;if(n<r)throw Error(r===e[t].max?`${this.format._name} requires exactly ${r} ${t} track${r===1?``:`s`}.`:`${this.format._name} requires at least ${r} ${t} track${r===1?``:`s`}.`)}let t=e.total.min;if(this._tracks.length<t)throw Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?``:`s`}.`:`${this.format._name} requires at least ${t} track${t===1?``:`s`}.`);if(this.state===`canceled`)throw Error(`Output has been canceled.`);return this._startPromise?(console.warn(`Output has already been started.`),this._startPromise):this._startPromise=(async()=>{this.state=`started`;let e=await this._mutex.acquire();try{await this._muxer.start();let e=this._tracks.map(e=>e.source._start());await Promise.all(e)}finally{e()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this._cancelPromise)return console.warn(`Output has already been canceled.`),this._cancelPromise;if(this.state===`finalizing`||this.state===`finalized`){this.state===`finalized`&&console.warn(`Output has already been finalized.`);return}return this._cancelPromise=(async()=>{this.state=`canceled`;let e=await this._mutex.acquire();try{let e=this._tracks.map(e=>e.source._flushOrWaitForOngoingClose(!0));await Promise.all(e),await Promise.all([...this._unfinalizedTargets].map(e=>e._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state===`pending`)throw Error(`Cannot finalize before starting.`);if(this.state===`canceled`)throw Error(`Cannot finalize after canceling.`);return this._finalizePromise?(console.warn(`Output has already been finalized.`),this._finalizePromise):this._finalizePromise=(async()=>{this.state=`finalizing`;let e=await this._mutex.acquire();try{let e=this._tracks.map(e=>e.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(e),await this._muxer.finalize(),this._rootWriterPromise){let e=await this._rootWriterPromise;e.finalized||(await e.flush(),await e.finalize())}this._onFinalize&&await this._onFinalize(),this.state=`finalized`}finally{e()}})()}},fd=class{_engine;constructor(e){this._engine=e}async export(e,t){let{fps:n,duration:r,resolution:i,bitrate:a=8e6}=e,o=Math.ceil(r/60*n),s=this._engine.canvas,c=this._engine.renderer.resolution.clone();this._engine.setSize(i);let l=new Lu,u=new dd({format:new td,target:l}),d=new Xu(s,{codec:`avc`,bitrate:a,keyFrameInterval:2});u.addVideoTrack(d),await u.start();for(let e=0;e<o;e++)this._engine.updateOffline(e,n),await d.add(e/n,1/n),t&&t({current:e+1,total:o,phase:`encoding`}),e%10==0&&await new Promise(e=>setTimeout(e,0));return t&&t({current:o,total:o,phase:`finalizing`}),await u.finalize(),this._engine.setSize(c),t&&t({current:o,total:o,phase:`done`}),new Blob([l.buffer],{type:`video/mp4`})}static download(e,t=`scene.mp4`){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}},pd=class extends Mt{_engine;_selectedEntityId;_unselectableEntityIds;_selectedAsset;_navigateAsset;_propertyTarget;_audioBuffer;_frameLoop;_resolutionScale;_baseResolution;_viewType;_frameDebugger;_assetPreviewManager;_externalWindow;_externalCanvasBitmapContext;_modalStatus;_disposed;_api;_draw;_editorCamera;_gizmoManager;_helperManager;_gridRenderer;_constraintAxisRenderer;_wireframeRenderer;_selectionOutline;_pointerHandler;_keyboardHandler;_modalTransformHandler;_sceneExporter;_isExporting;_exportProgress;constructor(e){super(),this._engine=e,this._viewType=`render`,this._selectedEntityId=null,this._unselectableEntityIds=new Set,this._selectedAsset=null,this._navigateAsset=null,this._propertyTarget=`entity`,this._resolutionScale=1,this._baseResolution=new M(1920,1080),this._externalWindow=null,this._externalCanvasBitmapContext=null,this._modalStatus=null,this._disposed=!1,this._api=new ua(this),this._draw=Yn(e),this._assetPreviewManager=new ta(this._draw),this._sceneExporter=new fd(e),this._isExporting=!1,this._exportProgress=null,this._editorCamera=new ya(e),this._gizmoManager=new no(e,this._draw),this._helperManager=new fo(e,this._draw),this._gridRenderer=new jo(e,this._draw),this._constraintAxisRenderer=new Ao(e,this._draw),this._wireframeRenderer=new Po(this._draw),this._selectionOutline=new No(this._draw),this._pointerHandler=new Do(e,this._editorCamera,this._gizmoManager,this._helperManager,this._api,()=>this._selectedEntityId,e=>!this._unselectableEntityIds.has(e.uuid),()=>this._gizmoManager.mode,e=>this.selectEntity(e),()=>this._modalTransformHandler.active,()=>{this._editorCamera.preview&&this.setField(`preview`,!1),this.setField(`cameraView`,`editor`)}),this._modalTransformHandler=new wo({engine:e,editorCamera:this._editorCamera,api:this._api,getSelectedEntity:()=>this._selectedEntityId?e.root.findEntityByUUID(this._selectedEntityId)??null:null,isPointerBusy:()=>this._pointerHandler.gizmoDragging,onStatusChange:e=>{this._modalStatus!==e&&(this._modalStatus=e,this.noticeField(`modalStatus`))}}),this._keyboardHandler=new mo({onSave:()=>this.save(),onUndo:()=>this._api.undo(),onRedo:()=>this._api.redo(),onPlayToggle:()=>{this._engine.frame.playing?this._engine.stop():this._engine.play()},onCameraViewToggle:()=>{this._editorCamera.preview?(this.setField(`preview`,!1),this.setField(`cameraView`,`editor`)):this.setField(`cameraView`,this._editorCamera.view===`editor`?`camera`:`editor`)},onPreviewToggle:()=>{this.setField(`preview`,!this._editorCamera.preview)},onSyncToSceneCamera:()=>this.syncToSceneCamera(),onFocusSelected:()=>this.focusSelected(),onTransformKey:e=>!this._editorCamera.preview&&this._modalTransformHandler.handleKeyDown(e)}),this._frameDebugger=new ba(e.canvas,this._draw),this._audioBuffer=null,this._engine.on(`update/music`,e=>{this._audioBuffer=e}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on(`update/blidge/frame`,e=>{this._engine.seek(e.current),e.playing&&!this._engine.frame.playing?this._engine.play():!e.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field(`enableRender`,()=>this._engine.enableRender,e=>this._engine.enableRender=e),this.field(`resolutionScale`,()=>this._resolutionScale,e=>{this._resolutionScale=Number(e),this._resize()});let t=this.fieldDir(`resolution`);t.field(`width`,()=>this._baseResolution.x,e=>{this._baseResolution.x=e,this._resize()},{step:1}),t.field(`height`,()=>this._baseResolution.y,e=>{this._baseResolution.y=e,this._resize()},{step:1}),this.field(`viewType`,()=>this._viewType,e=>{this._viewType=e,this._frameDebugger.enable=this._viewType===`debug`});let n=this.fieldDir(`frameLoop`);n.field(`enabled`,()=>this._frameLoop.enabled,e=>this._frameLoop.enabled=e),n.field(`start`,()=>this._frameLoop.start,e=>this._frameLoop.start=e),n.field(`end`,()=>this._frameLoop.end,e=>this._frameLoop.end=e),this.field(`selectedEntityId`,()=>this._selectedEntityId,e=>{this._selectedEntityId=e,e&&(this._propertyTarget=`entity`,this.noticeField(`propertyTarget`))}),this.field(`unselectableEntityIds`,()=>Array.from(this._unselectableEntityIds),e=>{this._unselectableEntityIds=new Set(e)},{hidden:!0}),this.field(`selectedAsset`,()=>this._selectedAsset,e=>{this._selectedAsset=e,e&&(this._propertyTarget=`asset`,this.noticeField(`propertyTarget`))}),this.field(`navigateAsset`,()=>this._navigateAsset,e=>{this._navigateAsset=e}),this.field(`propertyTarget`,()=>this._propertyTarget,e=>{this._propertyTarget=e}),this.field(`cameraView`,()=>this._editorCamera.view,t=>{this._editorCamera.setView(t,e)}),this.field(`preview`,()=>this._editorCamera.preview,t=>{this._editorCamera.setPreview(t,e)}),this.field(`gizmoMode`,()=>this._gizmoManager.mode,e=>{this._gizmoManager.setMode(e)}),this.field(`transformOrientation`,()=>this._gizmoManager.orientation,e=>{this._gizmoManager.setOrientation(e)}),this.field(`modalStatus`,()=>this._modalStatus,{noExport:!0});let r=this.fieldDir(`helpers`);r.field(`show`,()=>this._helperManager.showHelpers,e=>this._helperManager.showHelpers=e),r.field(`grid`,()=>this._gridRenderer.showGrid,e=>this._gridRenderer.showGrid=e),r.field(`empty`,()=>this._helperManager.showEmptyHelpers,e=>this._helperManager.showEmptyHelpers=e),r.field(`camera`,()=>this._helperManager.showCameraHelpers,e=>this._helperManager.showCameraHelpers=e),r.field(`light`,()=>this._helperManager.showLightHelpers,e=>this._helperManager.showLightHelpers=e),r.field(`wireframe`,()=>this._wireframeRenderer.showWireframe,e=>this._wireframeRenderer.showWireframe=e),r.field(`gizmo`,()=>this._gizmoManager.showGizmo,e=>this._gizmoManager.showGizmo=e),r.field(`outline`,()=>this._selectionOutline.showOutline,e=>this._selectionOutline.showOutline=e);let i=this.fieldDir(`camera`);i.field(`position`,()=>{let e=this._editorCamera.orbitControls.eye;return[e.x,e.y,e.z]},e=>{let t=this._editorCamera.orbitControls.target;this._editorCamera.orbitControls.setPosition(new M(e[0],e[1],e[2]),new M(t.x,t.y,t.z))}),i.field(`target`,()=>{let e=this._editorCamera.orbitControls.target;return[e.x,e.y,e.z]},e=>{let t=this._editorCamera.orbitControls.eye;this._editorCamera.orbitControls.setPosition(new M(t.x,t.y,t.z),new M(e[0],e[1],e[2]))}),this._animate()}bootstrap(e){e&&this.deserialize(e),this._resize()}get engine(){return this._engine}get api(){return this._api}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}get editorCamera(){return this._editorCamera}get assetPreviewManager(){return this._assetPreviewManager}_animate(){if(!this._disposed){if(!this._isExporting){this._editorCamera.updateBeforeRender(this._engine),this._engine.update();let e=this._editorCamera.getCameraEntity(this._engine),t=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null,n=this._editorCamera.preview;if(n||(this._gridRenderer.render(e,this._engine),this._helperManager.render(e,this._engine,this._selectedEntityId),this._wireframeRenderer.render(e,this._engine)),this._gizmoManager.render(n||this._modalTransformHandler.active?null:t,e,this._engine),n||(this._constraintAxisRenderer.render(this._modalTransformHandler.constraintDisplay,e,this._engine),this._selectionOutline.render(t,e)),this._frameDebugger.enable&&this._frameDebugger.draw(),this._draw.present(),this._editorCamera.updateAfterRender(this._engine),this._externalCanvasBitmapContext){let e=this._externalCanvasBitmapContext;createImageBitmap(this.engine.canvas).then(t=>{e.transferFromImageBitmap(t)})}this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start))}window.requestAnimationFrame(this._animate.bind(this))}}get isExporting(){return this._isExporting}get exportProgress(){return this._exportProgress}async exportMP4(){if(this._isExporting)return;this._isExporting=!0,this._exportProgress=null,this.emit(`update/export`);let e=this._engine.frame.playing;this._engine.stop();let t=this._engine.cameraEntity;this._engine.cameraEntity=null,this._engine.renderer.setPipelineOverride(null);try{let e=await this._sceneExporter.export({fps:this._engine.frameSetting.fps,duration:this._engine.frameSetting.duration,resolution:this._baseResolution.clone()},e=>{this._exportProgress=e,this.emit(`update/export`)});fd.download(e)}catch(e){console.error(`Export failed:`,e)}this._engine.cameraEntity=t,this._editorCamera.syncPipelineOverride(this._engine),this._isExporting=!1,this._exportProgress=null,this.emit(`update/export`),e&&this._engine.play()}selectEntity(e){this.setField(`selectedEntityId`,e?e.uuid:null)}syncToSceneCamera(){this._editorCamera.preview&&this.setField(`preview`,!1),this.setField(`cameraView`,`editor`),this._editorCamera.syncFromSceneCamera(this._engine)}focusSelected(){if(this._editorCamera.preview)return;let e=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null;e&&(this.setField(`cameraView`,`editor`),this._editorCamera.focus(e))}createEntity(e,t){let n=this._engine.createEntity({name:t});return n.initiator=`user`,e.add(n),n}deleteEntity(e){e.disposeRecursive();let t=e.parent;t&&t.remove(e)}save(){this.emit(`save`,[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:`export`})}exportEngine(){return this._engine.serialize({mode:`export`})}openInExternalWindow(){if(this._externalWindow=window.open(``,`_blank`),!this._externalWindow)return;let e=this._externalWindow.document.createElement(`canvas`);e.style.width=`100%`,e.style.height=`100%`,e.style.objectFit=`contain`,e.style.cursor=`none`,this._externalWindow.document.body.style.margin=`0`,this._externalWindow.document.body.style.background=`#000`,this._externalWindow.document.body.appendChild(e),this._externalCanvasBitmapContext=e.getContext(`bitmaprenderer`),this._externalWindow.addEventListener(`unload`,()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){this._externalWindow&&(this._externalWindow.close(),this._externalWindow=null,this._externalCanvasBitmapContext=null)}_resize(){let e=this._baseResolution.clone().multiply(this._resolutionScale);this.engine.setSize(e),this._draw.resize(e),this._frameDebugger.resize(e),this._editorCamera.resize(e),this._externalCanvasBitmapContext&&(this._externalCanvasBitmapContext.canvas.width=e.x,this._externalCanvasBitmapContext.canvas.height=e.y)}dispose(){this._disposed=!0,this._api.dispose(),this._editorCamera.dispose(),this._pointerHandler.dispose(),this._keyboardHandler.dispose(),this._modalTransformHandler.dispose(),this._frameDebugger.dispose(),this._assetPreviewManager.dispose()}},md=e=>{let{engine:t}=Lr(),[n,r]=(0,y.useState)(()=>new pd(t)),i=y.useRef(n);return i.current=n,(0,y.useEffect)(()=>{if(!i.current.disposed&&i.current.engine.uuid==t.uuid)return;let e=new pd(t);r(e)},[t]),(0,y.useEffect)(()=>()=>{n.dispose()},[n]),{engine:t,editor:n,projectName:e}},hd=e=>{let t=md(e.projectName);return(0,y.useEffect)(()=>{if(!(!t.editor||!e.onSave))return t.editor.on(`save`,e.onSave),()=>{t.editor.off(`save`,e.onSave)}},[t.editor,e.onSave]),(0,y.useEffect)(()=>{t.editor&&t.editor.bootstrap(e.editorData)},[e.editorData,t.editor]),(0,E.jsx)(Ie.Provider,{value:t,children:e.children})},gd=e=>e?e.map(e=>(0,E.jsx)(k.Tab,{title:e.title,children:(0,E.jsx)(re,{children:e.content})},e.title)):null,_d=e=>e?.find(e=>e.default)?.title,vd=e=>{let t=se(),n=null;return n=t.isPC?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(O,{direction:`vertical`,storageKey:`orengine-editor-pc-main`,children:[(0,E.jsx)(O.Item,{flex:1,minSize:300,children:(0,E.jsxs)(O,{direction:`horizontal`,storageKey:`orengine-editor-pc-horizontal`,children:[(0,E.jsx)(O.Item,{size:`300px`,minSize:200,children:(0,E.jsxs)(O,{direction:`vertical`,storageKey:`orengine-editor-pc-left`,children:[(0,E.jsx)(O.Item,{flex:1,minSize:150,children:(0,E.jsxs)(k,{storageKey:`orengine-panel-scene`,defaultTabTitle:_d(e.customTabs?.leftTop),children:[(0,E.jsx)(k.Tab,{title:`Scene`,children:(0,E.jsx)(re,{children:(0,E.jsx)(oi,{})})}),gd(e.customTabs?.leftTop)]})}),(0,E.jsx)(O.Item,{size:`20vh`,minSize:100,children:(0,E.jsxs)(k,{storageKey:`orengine-panel-timer`,defaultTabTitle:_d(e.customTabs?.leftBottom),children:[(0,E.jsx)(k.Tab,{title:`Timer`,children:(0,E.jsx)(re,{noPadding:!0,children:(0,E.jsx)(Wr,{})})}),gd(e.customTabs?.leftBottom)]})})]})}),(0,E.jsx)(O.Item,{flex:1,minSize:300,children:(0,E.jsxs)(O,{direction:`vertical`,storageKey:`orengine-editor-pc-center`,children:[(0,E.jsx)(O.Item,{flex:1,minSize:200,children:(0,E.jsx)(Oi,{})}),e.customTabs?.mainBottom&&(0,E.jsx)(O.Item,{size:`200px`,minSize:120,children:(0,E.jsx)(k,{storageKey:`orengine-panel-assets`,defaultTabTitle:_d(e.customTabs?.mainBottom),children:gd(e.customTabs?.mainBottom)})})]})}),(0,E.jsx)(O.Item,{size:`300px`,minSize:200,children:(0,E.jsxs)(k,{storageKey:`orengine-panel-property`,defaultTabTitle:_d(e.customTabs?.rightTop),children:[(0,E.jsx)(k.Tab,{title:`Property`,children:(0,E.jsx)(re,{children:(0,E.jsx)(Fr,{})})}),(0,E.jsx)(k.Tab,{title:`Textures`,children:(0,E.jsx)(re,{noPadding:!0,children:(0,E.jsx)(Ai,{})})}),(0,E.jsx)(k.Tab,{title:`Project`,children:(0,E.jsx)(re,{children:(0,E.jsx)(vi,{})})}),(0,E.jsx)(k.Tab,{title:`Renderer`,children:(0,E.jsx)(re,{children:(0,E.jsx)(bi,{})})}),(0,E.jsx)(k.Tab,{title:`Editor`,children:(0,E.jsx)(re,{children:(0,E.jsx)(Xe,{})})}),gd(e.customTabs?.rightTop)]})})]})}),(0,E.jsx)(O.Item,{size:`160px`,minSize:80,children:(0,E.jsxs)(k,{storageKey:`orengine-panel-timeline`,defaultTabTitle:_d(e.customTabs?.footer),children:[(0,E.jsx)(k.Tab,{title:`Timeline`,children:(0,E.jsx)(re,{noPadding:!0,children:(0,E.jsx)(Qi,{})})}),gd(e.customTabs?.footer)]})})]}),(0,E.jsx)(fi,{})]}):(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(O,{direction:`vertical`,storageKey:`orengine-editor-sp-main`,children:[(0,E.jsx)(O.Item,{size:`calc( min( 56.25vw, 55vh ) + 77px )`,minSize:200,style:{minHeight:`200px`},children:(0,E.jsx)(Oi,{})}),(0,E.jsx)(O.Item,{flex:1,minSize:200,children:(0,E.jsxs)(k,{storageKey:`orengine-panel-sp-main`,defaultTabTitle:_d(e.customTabs?.mainBottom)??_d(e.customTabs?.leftTop)??_d(e.customTabs?.leftBottom)??_d(e.customTabs?.rightTop)??_d(e.customTabs?.footer),children:[(0,E.jsx)(k.Tab,{title:`Scene / Property`,children:(0,E.jsxs)(O,{direction:`horizontal`,storageKey:`orengine-editor-sp-sceneProp`,children:[(0,E.jsx)(O.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,E.jsx)(oi,{})}),(0,E.jsx)(O.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,E.jsx)(Fr,{})})]})}),(0,E.jsx)(k.Tab,{title:`Textures`,children:(0,E.jsx)(re,{noPadding:!0,children:(0,E.jsx)(Ai,{})})}),(0,E.jsx)(k.Tab,{title:`Project`,children:(0,E.jsx)(re,{children:(0,E.jsx)(vi,{})})}),(0,E.jsx)(k.Tab,{title:`Renderer`,children:(0,E.jsx)(re,{children:(0,E.jsx)(bi,{})})}),(0,E.jsx)(k.Tab,{title:`Editor`,children:(0,E.jsx)(re,{children:(0,E.jsx)(Xe,{})})}),gd(e.customTabs?.leftTop),gd(e.customTabs?.leftBottom),gd(e.customTabs?.mainBottom),gd(e.customTabs?.rightTop),gd(e.customTabs?.footer)]})}),(0,E.jsx)(O.Item,{size:`120px`,minSize:80,children:(0,E.jsx)(k,{storageKey:`orengine-panel-sp-timeline`,children:(0,E.jsx)(k.Tab,{title:`Timeline`,children:(0,E.jsx)(re,{noPadding:!0,children:(0,E.jsx)(S,{fallback:(0,E.jsx)(`div`,{children:`エラーだよ`}),children:(0,E.jsx)(Qi,{})})})})})})]}),(0,E.jsx)(fi,{})]}),(0,E.jsx)(hd,{projectName:e.projectName,onSave:e.onSave,editorData:e.editorData,children:(0,E.jsx)(hi,{children:(0,E.jsxs)(ui,{children:[(0,E.jsx)(`div`,{className:$i.editor,children:n}),(0,E.jsx)(ci,{})]})})})},yd=()=>{let[e,t]=y.useState(()=>new vr(Mn)),n=y.useRef(e);return n.current=e,(0,y.useEffect)(()=>{n.current.disposed&&t(new vr(Mn))},[]),(0,y.useEffect)(()=>()=>{e.dispose()},[e]),{engine:e,load:(0,y.useCallback)(t=>{t&&e.load(t)},[e])}},bd=e=>{let t=yd(),{engine:n}=t,r=(0,y.useRef)(e.onEngineInit);return r.current=e.onEngineInit,(0,y.useEffect)(()=>{r.current?.(n)},[n]),(0,y.useEffect)(()=>{e.project?n.load(e.project):n.init()},[n,e.project]),(0,E.jsx)(Ir.Provider,{value:t,children:e.children})},xd=e=>(0,E.jsx)(bd,{project:e.sceneData,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,E.jsx)(vd,{editorData:e.editorData,projectName:e.projectName??`Static`,customTabs:e.customTabs,onSave:()=>{}})}),Sd=`#define PI 3.14159265359\r
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

}`,Cd=`#define PI 3.14159265359\r
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

}`,wd=s({EyeRings:()=>Td}),Td=class extends Nt{constructor(e){super(e);let t=this.engine,n=new Gt({thetaSegments:64,innerRadius:4,outerRadius:4.01,extrude:.01}),r=[];for(let e=0;e<8;e++)r.push(-1,e,e/7),r.push(1,e,e/7);n.setAttribute(`instance`,new Float32Array(r),3,{instanceDivisor:1});let i=new Xt({phase:[`deferred`,`shadowMap`],frag:Sd,vert:Cd,uniforms:t.uniforms});this.entity.addComponent(F,{geometry:n,material:i})}dispose(){super.dispose(),this.entity.removeComponent(F)}},Ed=`#define PI 3.14159265359\r
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

}`,Dd=`#define PI 3.14159265359\r
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

}`,Od=s({FlashLine:()=>kd}),kd=class extends Nt{geometry;material;constructor(e){super(e);let t=this.engine;this.geometry=new It({radiusBottom:.02,radiusTop:.02,radSegments:8,height:50});let n=[];for(let e=0;e<32;e++){let e=lt.randomVector().multiply(new M(20,1,20));n.push(e.x,e.y,e.z,Math.random())}this.geometry.setAttribute(`oPos`,new Float32Array(n),4,{instanceDivisor:1}),this.material=new Xt({phase:[`forward`,`envMap`],frag:Kt(`flFrag`,Ed),vert:Kt(`flVert`,Dd),uniforms:L.merge(t.uniforms)}),this.entity.addComponent(F,{material:this.material,geometry:this.geometry})}},Ad=`#define PI 3.14159265359\r
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

}`,jd=s({SkyBox:()=>Md}),Md=class extends Nt{material;constructor(e){super(e);let t=this.engine;this.material=new Xt({name:`SkyBox`,phase:[`deferred`,`envMap`],frag:Kt(`SkyBoxFrag`,Ad),uniforms:L.merge(t.uniforms,{uAspectRatio:{value:0,type:`1f`}})}),t.renderer.sky.mesh.material=this.material}},Nd=`#define PI 3.14159265359\r
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

}`,Pd=`#define PI 3.14159265359\r
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

}`,Fd=s({GridCross:()=>Id}),Id=class extends Nt{constructor(e){super(e);let t=new Ft({width:.05,height:.5,depth:.05}),n=[],r=[],i=new M(16,2,16);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(Math.PI/2,0,0),n.push(o,s,c),r.push(0,0,Math.PI/2)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new Xt({frag:Kt(`gridCrossFrag`,Nd),vert:Kt(`gridCrossVert`,Pd),phase:[`forward`]});this.entity.addComponent(F,{geometry:t,material:a})}},Ld=`#define PI 3.14159265359\r
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

}`,Rd=`#define PI 3.14159265359\r
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

}`,zd=s({GridDots:()=>Bd}),Bd=class extends Nt{constructor(e){super(e);let t=new Rt({radius:.1}),n=[],r=[],i=new M(32,2,32);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(0,0,0)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new Xt({frag:Kt(`gridDotsFrag`,Ld),vert:Kt(`gridDotsVert`,Rd),phase:[`forward`]});this.entity.addComponent(F,{geometry:t,material:a})}},Vd=`#define PI 3.14159265359\r
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
}`,Hd=`#define PI 3.14159265359\r
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
}`,Ud=s({WireCube:()=>Wd}),Wd=class extends Nt{constructor(e){super(e);let t=this.engine,n=3.3,r=n/2,i=new Ft({width:.01,height:n,depth:.01,segmentsHeight:16}),a=[],o=[];for(let e=0;e<3;e++)for(let t=0;t<4;t++)[[r,0,r],[r,0,-1.65],[-1.65,0,r],[-1.65,0,-1.65]][t].forEach(e=>{a.push(e)}),[[0,0,0],[Math.PI/2,0,0],[0,0,Math.PI/2]][e].forEach(e=>{o.push(e)});i.setAttribute(`instancePos`,new Float32Array(a),3,{instanceDivisor:1}),i.setAttribute(`instanceRot`,new Float32Array(o),3,{instanceDivisor:1});let s=new Xt({phase:[`deferred`],frag:Vd,vert:Hd,uniforms:L.merge(t.uniforms)});this.entity.addComponent(F,{geometry:i,material:s})}},Gd=`#define PI 3.14159265359\r
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

}`,Kd=`#define PI 3.14159265359\r
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

}`,qd=s({OREngineCube:()=>Jd}),Jd=class extends Nt{material;constructor(e){super(e);let t=this.engine;this.material=new Xt({name:`OREngineCube`,phase:[`shadowMap`,`deferred`],vert:Kt(`OREngineCubeVert`,Kd),frag:Kt(`OREngineCubeFrag`,Gd),uniforms:L.merge(t.uniforms,{uNoiseTex:{value:vr.resources.getTexture(`noise`),type:`1i`}})});let n=this.entity.getComponent(F);n&&(n.material=this.material)}},Yd=`#define PI 3.14159265359\r
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

}`,Xd=`#define PI 3.14159265359\r
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

}`,Zd=s({OREngineLogo:()=>Qd}),Qd=class extends Nt{material;constructor(e){super(e);let t=this.engine;this.material=new Xt({name:`OREngineLogo`,phase:[`deferred`,`shadowMap`],vert:Kt(`OREngineLogoVert`,Xd),frag:Kt(`OREngineLogoFrag`,Yd),uniforms:L.merge(t.uniforms)});let n=this.entity.getComponent(F);n&&(n.material=this.material)}},$d=`#define PI 3.14159265359\r
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

}`,ef=`#define PI 3.14159265359\r
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

}`,tf=s({Dust:()=>nf}),nf=class extends Nt{constructor(e){super(e);let t=this.engine,n=new Pt,r=e.args?.num||2048,i=new M(20,5,20),a=[],o=[];for(let e=0;e<r;e++)a.push((Math.random()-.5)*i.x),a.push((Math.random()-.5)*i.y),a.push((Math.random()-.5)*i.z),o.push(Math.random());n.setAttribute(`position`,new Float32Array(a),3);let s=new Xt({phase:[`forward`],drawType:`POINTS`,frag:$d,vert:ef,uniforms:L.merge(t.uniforms)});this.entity.addComponent(F,{geometry:n,material:s})}dispose(){super.dispose(),this.entity.removeComponent(F)}},rf=`#define PI 3.14159265359\r
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

}`,af=`#define PI 3.14159265359\r
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
	
}`,of=`#define PI 3.14159265359\r
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

} `,sf=s({YakiSoba:()=>cf}),cf=class extends Nt{_gpu;constructor(e){super(e);let t=this.engine,n=new M(64,512);this._gpu=new In({passes:[new Ln(t.renderer.backend,{name:`yakisoba`,size:n,dataLayerCount:2,frag:Kt(`yakiSobaCompute`,of),uniforms:L.merge({},t.uniforms,t.renderer.globalUniforms)})]}),this._gpu.passes[0].initTexture((e,t,n)=>[0,0,0,0]);let r=new Ft({width:.05,height:.05,depth:.05,segmentsHeight:n.x}),i=[],a=[];for(let e=0;e<n.y;e++)i.push(e/n.y),a.push(Math.random(),Math.random(),Math.random());r.setAttribute(`trailId`,new Float32Array(i),1,{instanceDivisor:1}),r.setAttribute(`id`,new Float32Array(a),3,{instanceDivisor:1});let o=new Xt({frag:Kt(`chainFrag`,rf),vert:Kt(`chainVert`,af),phase:[`deferred`,`shadowMap`],uniforms:L.merge({},this._gpu.passes[0].outputUniforms)});this.entity.addComponent(F,{geometry:r,material:o})}updateImpl(e){this.entity.isVisibleTraverse()&&this._gpu.compute(e.renderer)}dispose(){super.dispose(),this.entity.removeComponent(F),this._gpu.dispose()}},lf=s({CameraController:()=>uf}),uf=class extends Nt{_lookAt;_lookAtTargetUUID;_dofTarget;_dofTargetUUID;_tmpVector1;_tmpVector2;_focusMode;_focusDistance;_focusSpeed;_focusCurrent;constructor(e){super(e),this._lookAt=this.entity.addComponent(fa),this._lookAtTargetUUID=null,this.fieldDir(`lookAt`).field(`target`,()=>this._lookAtTargetUUID,e=>{this._lookAtTargetUUID=e||null,this._lookAt.setTarget(null)},{format:{type:`entity`}}),this._dofTarget=null,this._dofTargetUUID=null,this._tmpVector1=new M,this._tmpVector2=new M,this._focusMode=`auto`,this._focusDistance=5,this._focusSpeed=8,this._focusCurrent=null;let t=this.fieldDir(`focus`);t.field(`mode`,()=>this._focusMode,e=>{this._focusMode=e},{format:{type:`select`,list:[`auto`,`target`,`manual`]}}),t.field(`target`,()=>this._dofTargetUUID,e=>{this._dofTargetUUID=e||null,this._dofTarget=null},{format:{type:`entity`}}),t.field(`distance`,()=>this._focusDistance,e=>{this._focusDistance=e},{step:.1}),t.field(`speed`,()=>this._focusSpeed,e=>{this._focusSpeed=e},{step:.5});let n=pr(this.engine,this.entity);this.once(`dispose`,()=>{n()})}_resolveTargets(){if(!this._lookAtTargetUUID&&!this._dofTargetUUID)return;let e=this.entity.getRootEntity();this._lookAtTargetUUID&&!this._lookAt.target&&this._lookAt.setTarget(e.findEntityByUUID(this._lookAtTargetUUID)||null),this._dofTargetUUID&&!this._dofTarget&&(this._dofTarget=e.findEntityByUUID(this._dofTargetUUID)||null)}updateImpl(){this._resolveTargets()}get focusMode(){return this._focusMode}set focusMode(e){this._focusMode=e}get focusDistance(){return this._focusDistance}set focusDistance(e){this._focusDistance=e}get focusSpeed(){return this._focusSpeed}set focusSpeed(e){this._focusSpeed=e}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=this._resolveFocusTarget(e);n!==null&&(this._focusCurrent===null||this._focusSpeed<=0?this._focusCurrent=n:this._focusCurrent+=(n-this._focusCurrent)*(1-Math.exp(-this._focusSpeed*e.timeDelta)),t.dofParams.focusDistance=this._focusCurrent)}_resolveFocusTarget(e){if(this._focusMode===`manual`)return this._focusDistance;if(this._focusMode===`auto`){let t=e.renderer.centerDepth;if(typeof t==`number`)return t}if(!this._dofTarget)return null;this.entity.matrixWorld.decompose(this._tmpVector1),this._dofTarget.matrixWorld.decompose(this._tmpVector2),this._tmpVector2.sub(this._tmpVector1);let t=this.entity.matrixWorld.elm;return this._tmpVector1.set(t[8],t[9],t[10]).normalize(),-this._tmpVector2.dot(this._tmpVector1)}dispose(){super.dispose(),this.entity.removeComponent(fa)}},df=s({CameraOrbitAnim:()=>ff}),ff=class extends Nt{time;radius;heightAmp;speed;baseHeight;constructor(e){super(e),this.time=0,this.radius=6,this.heightAmp=2,this.speed=.3,this.baseHeight=1.5,this.field(`radius`,()=>this.radius,e=>this.radius=e),this.field(`heightAmp`,()=>this.heightAmp,e=>this.heightAmp=e),this.field(`speed`,()=>this.speed,e=>this.speed=e),this.field(`baseHeight`,()=>this.baseHeight,e=>this.baseHeight=e)}updateImpl(e){this.time+=e.timeDelta;let t=this.time*this.speed,n=Math.cos(t)*this.radius,r=Math.sin(t)*this.radius,i=this.baseHeight+Math.sin(t*1.7)*this.heightAmp;this.entity.position.set(n,i,r),this.entity.lookAt(new M(0,0,0))}},pf=s({ShakeViewer:()=>mf}),mf=class extends Nt{shakePower;shakeSpeed;shakeMatrix;cameraMatrixWorld;shakeQua;constructor(e){super(e),this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new N,this.cameraMatrixWorld=new N,this.shakeQua=new ct,this.order=1e3,this.field(`power`,()=>this.shakePower,e=>this.shakePower=e),this.field(`speed`,()=>this.shakeSpeed,e=>this.shakeSpeed=e)}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=.008*this.shakePower;n*=t.fov/50;let r=e.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(r*2)*n,y:Math.sin(r*2.5)*n,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.cameraMatrixWorld.copy(this.entity.matrixWorld).multiply(this.shakeMatrix),t.viewMatrix.copy(this.cameraMatrixWorld).inverse()}},hf=s({ObjectRotate:()=>gf}),gf=class extends Nt{speed;rotQuaternion;constructor(e){super(e),this.speed=1,this.rotQuaternion=new ct}updateImpl(e){this.rotQuaternion.setFromEuler(new st(0,-.4*e.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}},_f=s({BLidgeClient:()=>vf}),vf=class e extends Nt{blidge;type;blidgeRoot;entities;attachments;_attachmentsApplied;_unresolvedByEntity;static sceneData=null;connection;useGLTF;gltfPath;constructor(t){super(t),this.entities=new Map,this.attachments=[],this._attachmentsApplied=!1,this._unresolvedByEntity=new Map,this.type=`websocket`,this.connection={enabled:!0,url:`ws://localhost:3100`},this.useGLTF=!1,this.gltfPath=`/OREngine/pr-preview/pr-30/scene.glb`,this.blidgeRoot=null,this.blidge=new jt(this.engine);let n=this.onSyncScene.bind(this),r=e=>{this.entity&&this.entity.noticeEventParent(`update/blidge/frame`,[e])};this.blidge.on(`sync/scene`,n),this.blidge.on(`sync/timeline`,r),this.once(`dispose`,()=>{this.blidge.off(`sync/scene`,n),this.blidge.off(`sync/timeline`,r)});let i=async()=>{if(this.type==`json`){let t=e.sceneData;if(!t){let e=await fetch(`/OREngine/pr-preview/pr-30/blidge-scene.json`);if(!e.ok){console.warn(`BLidgeClient: failed to load /blidge-scene.json (${e.status})`);return}t=await e.json()}await this.blidge.loadScene(t,this.useGLTF?this.gltfPath:void 0),this.emit(`loaded`)}else this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field(`mode`,()=>this.type,e=>{this.type=e,i()},{format:{type:`select`,list:[`websocket`,`json`]}}),this.field(`gltf`,()=>this.useGLTF,e=>{this.useGLTF=e,i()}),this.field(`gltfPath`,()=>this.gltfPath,e=>{this.gltfPath=e,i()});let a=this.fieldDir(`websocket`,{hidden:()=>this.type!=`websocket`});a.field(`reconnect`,()=>()=>i(),void 0,{label:`Reconnect`}),a.field(`url`,()=>this.connection.url,e=>this.connection.url=e),this.field(`attachments`,()=>!this.blidgeRoot||!this._attachmentsApplied?this.attachments:this.serializeAttachments(),e=>{this.attachments=e||[],this._attachmentsApplied=!1,this._unresolvedByEntity.clear()},{hidden:!0})}serializeAttachments(){if(!this.blidgeRoot)return[];let e={getName:e=>{let t=vr.resources.componentList.find(t=>e instanceof t.component);return t?t.name:e.constructor.name}},t=[];return this.blidgeRoot.traverse(n=>{let r=[];n.components.forEach(t=>{if(t.initiator!==`user`)return;let n=t.serialize({mode:`export`}),i=Object.keys(n).length>0,a={name:e.getName(t),uuid:t.uuid};i&&(a.props=n),r.push(a)});let i=this._unresolvedByEntity.get(n.name);i&&r.push(...i),r.length>0&&t.push({name:n.name,components:r})}),t}applyAttachments(e){if(this._unresolvedByEntity.clear(),!this.attachments.length)return;let t=new Map;this.attachments.forEach(e=>t.set(e.name,e)),e.traverse(e=>{let n=t.get(e.name);n&&n.components.forEach(t=>{let n=vr.resources.getComponent(t.name);if(n){e.removeComponent(n.component);let r=e.addComponent(n.component);r.initiator=`user`,r.restoreUUID(t.uuid),t.props&&r.deserialize(t.props)}else{console.warn(`[BLidgeClient] unresolved attachment component "${t.name}" on entity "${e.name}". Preserving data for round-trip.`);let n=this._unresolvedByEntity.get(e.name)||[];n.push({name:t.name,uuid:t.uuid,props:t.props}),this._unresolvedByEntity.set(e.name,n)}})})}async onSyncScene(e){this._attachmentsApplied=!1;let t=new Date().getTime(),n=r=>{let i=this.entities.get(r.name)||this.engine.createEntity();if(r.type==`camera`){let e=r.param;i.userData.cameraParam=e}return i.removeComponent(Ut),i.addComponent(Ut,{blidge:e,node:r}),r.children.forEach(e=>{let t=n(e);i.add(t)}),this.entities.set(i.name,i),i.userData.updateTime=t,i},r=e.root&&n(e.root);r&&(r.name=`blidgeRoot`,this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=r,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(e=>{if(e.userData.updateTime!=t){let t=e.parent;t&&t.remove(e),e.dispose(),this.entities.delete(e.name)}}),e.gltf&&await e.gltfPrm,this.blidgeRoot&&(this.applyAttachments(this.blidgeRoot),this._attachmentsApplied=!0),this.entity&&(this.entity.noticeEventChilds(`sceneCreated`,[this.blidgeRoot]),this.entity.noticeEventParent(`update/blidge/scene`,[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&=(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),null),this._attachmentsApplied=!1,this._unresolvedByEntity.clear()}},yf=s({Cube:()=>bf}),bf=class extends Ft{},xf=s({Cylinder:()=>Sf}),Sf=class extends It{},Cf=s({Plane:()=>wf}),wf=class extends Lt{},Tf=s({Sphere:()=>Ef}),Ef=class extends Rt{},Df=gr(Object.assign({"./Components/Camera/CameraController/index.ts":lf,"./Components/Camera/CameraOrbitAnim/index.ts":df,"./Components/Camera/CameraShake/index.ts":pf,"./Components/Camera/LookAt/index.ts":da,"./Components/Camera/OrbitControls/index.ts":pa,"./Components/Object/ObjectRotate/index.ts":hf,"./Components/Utility/BLidgeClient/index.ts":_f}),`Components`),Of=gr(Object.assign({"./Geometries/Cube/index.ts":yf,"./Geometries/Cylinder/index.ts":xf,"./Geometries/Plane/index.ts":Cf,"./Geometries/Sphere/index.ts":Tf}),`Geometries`),kf={name:`hash`,resolution:[512,512],filter:`nearest`,updateEveryFrame:!1,frag:`#define PI 3.14159265359\r
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
} `},Af={name:`noise`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!0,frag:`#define PI 3.14159265359\r
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
} `},jf=`#define PI 3.14159265359\r
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
} `,Mf=Object.assign({"../../demo-webgl/Resources/Textures/hash.tex":kf,"../../demo-webgl/Resources/Textures/noise.tex":Af,"../../demo-webgl/Resources/Textures/noiseCyclic.tex":{name:`noiseCyclic`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!1,frag:jf},"../../demo-webgl/Resources/Textures/noiseCyclicAnime.tex":{name:`noiseCyclicAnime`,resolution:[512,512],filter:`linear`,updateEveryFrame:!0,frag:jf}}),Nf=()=>{for(let e of Object.values(Mf))e&&vr.resources.addTextureResource(e.name,{frag:e.frag,resolution:e.resolution||[1024,1024],filter:e.filter,updateEveryFrame:e.updateEveryFrame,textures:e.textures})},Pf=e=>{vr.resources.buildTextureInstances(e.renderer,e.uniforms)},Ff=Object.assign({"../../demo-webgl/Resources/Components/Samples/Effects/EyeRings/index.ts":wd,"../../demo-webgl/Resources/Components/Samples/Effects/FlashLine/index.ts":Od,"../../demo-webgl/Resources/Components/Samples/Environment/SkyBox/index.ts":jd,"../../demo-webgl/Resources/Components/Samples/Geometry/GridCross/index.ts":Fd,"../../demo-webgl/Resources/Components/Samples/Geometry/GridDots/index.ts":zd,"../../demo-webgl/Resources/Components/Samples/Geometry/WireCube/index.ts":Ud,"../../demo-webgl/Resources/Components/Samples/Objects/OREngineCube/index.ts":qd,"../../demo-webgl/Resources/Components/Samples/Objects/OREngineLogo/index.ts":Zd,"../../demo-webgl/Resources/Components/Samples/Particles/Dust/index.ts":tf,"../../demo-webgl/Resources/Components/Samples/Particles/YakiSoba/index.ts":sf}),If=Object.assign({}),Lf=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];typeof a==`function`?t.addComponent(i,a):Lf(a,t.createGroup(i))}},Rf=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];typeof a==`function`?t.addGeometry(i,a):Rf(a,t.createGroup(i))}};document.title=`demo-webgl`,(()=>{jt.gltfLoaderFactory=e=>new nr(e),vr.resources.clear();let e=vr.resources.addComponentGroup(`_Built-in`);e.addComponent(`Light`,Vt),e.addComponent(`Camera`,zt),e.addComponent(`Mesh`,F);let t=Object.keys(Df);for(let e=0;e<t.length;e++){let n=t[e],r=Df[n];Lf(r,vr.resources.addComponentGroup(n))}let n=Object.keys(Of);for(let e=0;e<n.length;e++){let t=n[e],r=Of[t];Rf(r,vr.resources.addGeometryGroup(t))}let r=gr(Ff,`Components`),i=Object.keys(r);for(let e=0;e<i.length;e++){let t=i[e],n=r[t];Lf(n,vr.resources.addComponentGroup(t))}let a=gr(If,`Geometries`),o=Object.keys(a);for(let e=0;e<o.length;e++){let t=o[e],n=a[t];Rf(n,vr.resources.addGeometryGroup(t))}Nf()})(),g.createRoot(document.getElementById(`root`)).render((0,E.jsx)(xd,{projectName:`demo-webgl`,sceneData:v,editorData:_,initResourceInstances:Pf}));