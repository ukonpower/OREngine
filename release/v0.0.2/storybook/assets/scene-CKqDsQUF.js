import{a as e,n as t,r as n,t as r}from"./rolldown-runtime-DkW27tQK.js";import{r as i}from"./iframe-B3tnGPef.js";import{t as a}from"./ArrowIcon-DMjVW0Ym.js";import{t as o}from"./jsx-runtime-DeHZSEgm.js";import{t as s}from"./Block-TnSoGZyO.js";import{t as c}from"./Button-DU166UZk.js";import{E as l,S as u,b as d,c as f,m as p,o as m,u as h,v as g}from"./Icons-D-S7auC9.js";import{t as _}from"./InputCheckBox-c29KxitH.js";import{t as v}from"./InputColor-C6IuOFZz.js";import{f as y,g as b,i as x,l as S,m as C,n as ee,o as te,t as w,u as ne}from"./uipower-DoAetkTZ.js";import{t as re}from"./InputSelect-DnI9eZnn.js";import{n as T}from"./useAnchoredPosition-iFSdmdzV.js";import{t as ie}from"./Label-DBjwtFw_.js";import{t as ae}from"./LayoutSplit-By-9MZL7.js";import{t as oe}from"./ListItem-BgW5r1XD.js";import{t as se}from"./Menu-BTFpZ-W8.js";import{t as ce}from"./Panel-h7tqFVYO.js";import{t as le}from"./PanelContainer-7wDWJHBx.js";import{n as ue,t as de}from"./DragOverlay-wAE9ntts.js";import{n as fe,t as pe}from"./SceneWindow-BYZuAgVN.js";function me(e=[],t=[]){return e.length!==t.length||e.some((e,n)=>!Object.is(e,t[n]))}var he,ge,_e,ve;function ye(){return(ye=t((()=>{he=i(),ge=(0,he.createContext)(null),_e={didCatch:!1,error:null},ve=class extends he.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=_e}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(...e){let{error:t}=this.state;t!==null&&(this.props.onReset?.({args:e,reason:`imperative-api`}),this.setState(_e))}componentDidCatch(e,t){this.props.onError?.(e,t)}componentDidUpdate(e,t){let{didCatch:n}=this.state,{resetKeys:r}=this.props;n&&t.error!==null&&me(e.resetKeys,r)&&(this.props.onReset?.({next:r,prev:e.resetKeys,reason:`keys`}),this.setState(_e))}render(){let{children:e,fallbackRender:t,FallbackComponent:n,fallback:r}=this.props,{didCatch:i,error:a}=this.state,o=e;if(i){let e={error:a,resetErrorBoundary:this.resetErrorBoundary};if(typeof t==`function`)o=t(e);else if(n)o=(0,he.createElement)(n,e);else if(r!==void 0)o=r;else throw a}return(0,he.createElement)(ge.Provider,{value:{didCatch:i,error:a,resetErrorBoundary:this.resetErrorBoundary}},o)}}})))()}var be,xe,Se;function Ce(){return(Ce=t((()=>{be=i(),xe=900,Se=()=>{let[e,t]=(0,be.useState)(!1);return(0,be.useEffect)(()=>{let e=null,n=()=>{let n=window.innerWidth;(e===null||(n-xe)*(e-xe)<=0)&&t(n<=xe),e=n};return n(),window.addEventListener(`resize`,n),()=>{window.removeEventListener(`resize`,n)}},[]),{isPC:!e,isSP:e}}})))()}var E;function we(){return(we=t((()=>{E=class e{x;y;z;w;constructor(e,t,n,r){this.x=0,this.y=0,this.z=0,this.w=0,this.set(e,t,n,r)}get isVector(){return!0}set(e,t,n,r){return this.x=e??0,this.y=t??0,this.z=n??0,this.w=r??0,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setFromArray(e){return this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0,this.w=e[3]||0,this}add(e){return typeof e==`number`?(this.x+=e,this.y+=e,this.z+=e,this.w+=e):(this.x+=e.x??0,this.y+=e.y??0,this.z+=e.z??0,this.w+=e.w??0),this}sub(e){return typeof e==`number`?(this.x-=e,this.y-=e,this.z-=e):(this.x-=e.x??0,this.y-=e.y??0,this.z-=e.z??0,this.w-=e.w??0),this}multiply(e){return typeof e==`number`?(this.x*=e,this.y*=e,this.z*=e,this.w*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w),this}divide(e){return typeof e==`number`?(this.x/=e,this.y/=e,this.z/=e,this.w/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return Math.sqrt(t*t+n*n+r*r)}normalize(){let e=this.length()||1;return this.x/=e,this.y/=e,this.z/=e,this}cross(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z;return this.x=n*o-r*a,this.y=r*i-t*o,this.z=t*a-n*i,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}applyMatrix3(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10],d=this.x*n+this.y*a+this.z*c,f=this.x*r+this.y*o+this.z*l,p=this.x*i+this.y*s+this.z*u;return this.x=d,this.y=f,this.z=p,this.w=0,this}applyMatrix4(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=this.x*n+this.y*o+this.z*u+this.w*m,y=this.x*r+this.y*s+this.z*d+this.w*h,b=this.x*i+this.y*c+this.z*f+this.w*g,x=this.x*a+this.y*l+this.z*p+this.w*_;return this.x=v,this.y=y,this.z=b,this.w=x,this}applyMatrix4AsPosition(e){let t=this.w;return this.w=1,this.applyMatrix4(e),this.w=t,this}applyMatrix4AsDirection(e){let t=this.w;return this.w=0,this.applyMatrix4(e),this.w=t,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this}clone(){return new e(this.x,this.y,this.z,this.w)}getElm(e){return e==`vec2`?[this.x,this.y]:e==`vec3`?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}})))()}var D;function Te(){return(Te=t((()=>{we(),D=class e{elm;constructor(e){this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e&&this.set(e)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new e().copy(this)}copy(e){return this.set(e.elm),this}perspective(e,t,n,r){let i=1/Math.tan(e*Math.PI/360),a=r-n;return this.elm=[i/t,0,0,0,0,i,0,0,0,0,-(r+n)/a,-1,0,0,-(r*n*2)/a,0],this}orthographic(e,t,n,r){return this.elm=[2/e,0,0,0,0,2/t,0,0,0,0,-2/(r-n),0,0,0,-(r+n)/(r-n),1],this}lookAt(e,t,n){let r=e.clone().sub(t).normalize(),i=n.clone().cross(r).normalize(),a=r.clone().cross(i).normalize();return this.elm=[i.x,i.y,i.z,0,a.x,a.y,a.z,0,r.x,r.y,r.z,0,e.x,e.y,e.z,1],this}inverse(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15],g=e*a-t*i,_=e*o-n*i,v=e*s-r*i,y=t*o-n*a,b=t*s-r*a,x=n*s-r*o,S=c*p-l*f,C=c*m-u*f,ee=c*h-d*f,te=l*m-u*p,w=l*h-d*p,ne=u*h-d*m,re=g*ne-_*w+v*te+y*ee-b*C+x*S,T=1/re;return re==0?this.identity():(this.elm[0]=(a*ne-o*w+s*te)*T,this.elm[1]=(-t*ne+n*w-r*te)*T,this.elm[2]=(p*x-m*b+h*y)*T,this.elm[3]=(-l*x+u*b-d*y)*T,this.elm[4]=(-i*ne+o*ee-s*C)*T,this.elm[5]=(e*ne-n*ee+r*C)*T,this.elm[6]=(-f*x+m*v-h*_)*T,this.elm[7]=(c*x-u*v+d*_)*T,this.elm[8]=(i*w-a*ee+s*S)*T,this.elm[9]=(-e*w+t*ee-r*S)*T,this.elm[10]=(f*b-p*v+h*g)*T,this.elm[11]=(-c*b+l*v-d*g)*T,this.elm[12]=(-i*te+a*C-o*S)*T,this.elm[13]=(e*te-t*C+n*S)*T,this.elm[14]=(-f*y+p*_-m*g)*T,this.elm[15]=(c*y-l*_+u*g)*T,this)}transpose(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15];return this.elm[0]=e,this.elm[1]=i,this.elm[2]=c,this.elm[3]=f,this.elm[4]=t,this.elm[5]=a,this.elm[6]=l,this.elm[7]=p,this.elm[8]=n,this.elm[9]=o,this.elm[10]=u,this.elm[11]=m,this.elm[12]=r,this.elm[13]=s,this.elm[14]=d,this.elm[15]=h,this}set(e){for(let t=0;t<this.elm.length;t++)this.elm[t]=e[t]??0;return this}setFromTransform(e,t,n){return this.identity(),e&&this.applyPosition(e),t&&this.applyQuaternion(t),n&&this.applyScale(n),this}applyPosition(e){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,e.x,e.y,e.z,1]),this}applyQuaternion(e){let t=e.x,n=e.y,r=e.z,i=e.w,a=t*t,o=n*n,s=r*r,c=i*i,l=t*n,u=t*r,d=t*i,f=n*r,p=n*i,m=r*i;return this.matmul([a-o-s+c,2*(l+m),2*(u-p),0,2*(l-m),-a+o-s+c,2*(f+d),0,2*(u+p),2*(f-d),-a-o+s+c,0,0,0,0,1]),this}applyScale(e){return this.matmul([e.x,0,0,0,0,e.y,0,0,0,0,e.z,0,0,0,0,1]),this}matmul(e){let t=Array(16);for(let n=0;n<4;n++)for(let r=0;r<4;r++){let i=0;for(let t=0;t<4;t++)i+=this.elm[t*4+r]*e[t+n*4];t[r+n*4]=i}this.elm=t}setRotationFromDirection(e,t){t||={x:0,y:1,z:0};let n=new E().copy(e).normalize(),r=new E().copy(t).cross(n).normalize();r.length()==0&&(n.x+=.001,r.copy(t).cross(n).normalize());let i=n.clone().cross(r).normalize();return this.set([r.x,r.y,r.z,0,i.x,i.y,i.z,0,n.x,n.y,n.z,0,0,0,0,1]),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set([c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1]),this}multiply(e){return this.matmul(e.elm),this}preMultiply(e){let t=this.copyToArray([]);return this.set(e.elm),this.matmul(t),this}decompose(e,t,n){e&&(e.x=this.elm[12],e.y=this.elm[13],e.z=this.elm[14]),t&&t.setFromMatrix(this)}copyToArray(e){e.length=this.elm.length;for(let t=0;t<this.elm.length;t++)e[t]=this.elm[t];return e}}})))()}var Ee;function De(){return(De=t((()=>{Te(),we(),Ee=class extends E{order;constructor(e,t,n,r){super(e,t,n,0),this.order=r||`XYZ`}copy(e){return`order`in e&&(this.order=e.order),super.copy(e)}setFromQuaternion(e){let t=new D().applyQuaternion(e);return this.setFromRotationMatrix(t),this}setFromRotationMatrix(e){let t=e.elm,n=t[0],r=t[4],i=t[8],a=t[5],o=t[9],s=t[6],c=t[10];return this.order=`XYZ`,this.y=Math.asin(Math.min(1,Math.max(-1,i))),Math.abs(i)<.9999999?(this.x=Math.atan2(-o,c),this.z=Math.atan2(-r,n)):(this.x=Math.atan2(s,a),this.z=0),this}}})))()}var Oe;function ke(){return(ke=t((()=>{Oe=class e{x;y;z;w;updated=!1;constructor(e,t,n,r){this.x=e||0,this.y=t||0,this.z=n||0,this.w=r||1}set(e,t,n,r){this.x=e??this.x,this.y=t??this.y,this.z=n??this.z,this.w=r??this.w,this.updated=!0}setFromEuler(e,t){let n=t||(`order`in e?e.order:`XYZ`),r=Math.sin(e.x/2),i=Math.sin(e.y/2),a=Math.sin(e.z/2),o=Math.cos(e.x/2),s=Math.cos(e.y/2),c=Math.cos(e.z/2);return n==`XYZ`?(this.x=o*i*a+r*s*c,this.y=-r*s*a+o*i*c,this.z=o*s*a+r*i*c,this.w=-r*i*a+o*s*c):n==`XZY`?(this.x=-o*i*a+r*s*c,this.y=o*i*c-r*s*a,this.z=r*i*c+o*s*a,this.w=r*i*a+o*s*c):n==`YZX`?(this.x=r*s*c+o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=-r*i*a+o*s*c):n==`ZYX`&&(this.x=r*s*c-o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=r*i*a+o*s*c),this.updated=!0,this}setFromMatrix(e){let t=e.elm,n=t[0]+t[5]+t[10],r,i,a,o;if(n>0){let e=Math.sqrt(n+1)*2;o=.25*e,r=(t[6]-t[9])/e,i=(t[8]-t[2])/e,a=(t[1]-t[4])/e}else if(t[0]>t[5]&&t[0]>t[10]){let e=Math.sqrt(1+t[0]-t[5]-t[10])*2;o=(t[6]-t[9])/e,r=.25*e,i=(t[1]+t[4])/e,a=(t[2]+t[8])/e}else if(t[5]>t[10]){let e=Math.sqrt(1+t[5]-t[0]-t[10])*2;o=(t[8]-t[2])/e,r=(t[1]+t[4])/e,i=.25*e,a=(t[6]+t[9])/e}else{let e=Math.sqrt(1+t[10]-t[0]-t[5])*2;o=(t[1]-t[4])/e,r=(t[2]+t[8])/e,i=(t[6]+t[9])/e,a=.25*e}let s=Math.sqrt(r*r+i*i+a*a+o*o);return r/=s,i/=s,a/=s,o/=s,this.x=r,this.y=i,this.z=a,this.w=o,this.updated=!0,this}multiply(e){let t=this.w*e.w-this.x*e.x-this.y*e.y-this.z*e.z,n=this.w*e.x+this.x*e.w+this.y*e.z-this.z*e.y,r=this.w*e.y-this.x*e.z+this.y*e.w+this.z*e.x,i=this.w*e.z+this.x*e.y-this.y*e.x+this.z*e.w;return this.set(n,r,i,t),this.updated=!0,this}preMultiply(e){let t=e.clone().multiply(this);this.set(t.x,t.y,t.z,t.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this.updated=!0,this}clone(){return new e(this.x,this.y,this.z,this.w)}}})))()}var Ae;function je(){return(je=t((()=>{we(),(function(e){let t=e.gauss=(e,t,n)=>{let r=e-t,i=-(r*r)/(2*n*n);return 1/Math.sqrt(2*Math.PI*n)*Math.exp(i)};e.gaussWeights=e=>{let n=0,r=[];if(e<=1)return[.5];for(let i=0;i<e;i++){let a=i/(e-1),o=t(a,0,1);n+=o*(i>0?2:1),r.push(o)}for(let t=0;t<e;t++)r[t]/=n;return r},e.randomSeed=e=>{e^=e<<13,e^=0,e^=e<<5;let t=123456789^e;e^=e<<13,e^=0,e^=e<<5;let n=362436069^e;e^=e<<13,e^=0,e^=e<<5;let r=521288629^e;e^=e<<13,e^=0,e^=e<<5;let i=88675123^e,a;return()=>(a=t^t<<11,t=n,n=r,r=i,i=(i^i>>>19^(a^a>>>8))>>>0,i/4294967296)};let n=e.randomRange=(e=-1,t=1)=>e+Math.random()*(t-e);e.randomVector=(e=new E(-1,-1,-1,-1),t=new E(1,1,1,1))=>new E(n(e.x,t.x),n(e.y,t.y),n(e.z,t.z),n(e.w,t.w)),e.randomInSphere=(e=1,t=Math.random)=>{let n=t(),r=t(),i=t(),a=2*Math.PI*n,o=Math.acos(2*r-1),s=Math.cbrt(i)*e,c=Math.sin(o);return{x:s*c*Math.cos(a),y:s*c*Math.sin(a),z:s*Math.cos(o)}},e.smoothstep=(e,t,n)=>n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))})(Ae||={})})))()}function O(){return(O=t((()=>{we(),De(),ke(),Te(),je()})))()}var Me;function Ne(){return(Ne=t((()=>{Me=class{gl;vao;program;indexBuffer;attributes;vertCount;indexCount;instanceCount;attribPointerDiect;attribTypeDict;constructor(e,t){this.gl=e,this.program=t,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([[`Float32Array`,this.gl.vertexAttribPointer.bind(this.gl)],[`Int32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int8Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt8Array`,this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([[`Float32Array`,this.gl.FLOAT],[`Int32Array`,this.gl.INT],[`Int16Array`,this.gl.SHORT],[`Int8Array`,this.gl.BYTE],[`UInt32Array`,this.gl.UNSIGNED_INT],[`UInt16Array`,this.gl.UNSIGNED_SHORT],[`UInt8Array`,this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((e,t)=>{e.instanceDivisor==null&&t!=`index`&&(this.vertCount=Math.max(this.vertCount,e.count)),e.instanceDivisor!==void 0&&e.instanceDivisor>0&&(this.instanceCount=this.instanceCount==0?e.count:Math.min(this.instanceCount,e.count))})}setAttribute(e,t,n,r){if(t.array===null)return;let i={buffer:t,size:n,count:t.array?t.array.length/n:0,location:void 0,...r};this.attributes.set(e,i),this.gl.bindVertexArray(this.vao),i.location=this.gl.getAttribLocation(this.program,e);let a=this.attribPointerDiect.get(t.array.constructor.name),o=this.attribTypeDict.get(t.array.constructor.name);if(i.location>-1){if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i.buffer.buffer),i.size==16){for(let e=0;e<4;e++)this.gl.enableVertexAttribArray(i.location+e);for(let e=0;e<4;e++)this.gl.vertexAttribPointer(i.location+e,4,o,!1,64,16*e);if(i.instanceDivisor!==void 0)for(let e=0;e<4;e++)this.gl.vertexAttribDivisor(i.location+e,i.instanceDivisor)}else this.gl.enableVertexAttribArray(i.location),a(i.location,i.size,o,!1,0,0),i.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(i.location,i.instanceDivisor)}return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(e){return this.attributes.delete(e),this.calcVertCount(),this}setIndex(e){this.indexBuffer=e,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(e){this.gl.bindVertexArray(this.vao),e&&e(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(e=>{e.buffer.dispose()})}}})))()}var Pe,Fe;function Ie(){return(Ie=t((()=>{Ne(),Pe=new Map,Fe=class{gl;program;name=``;vao;uniforms;constructor(e){this.gl=e,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(e,t,n){if(this.program===null){console.warn(`program is null.`);return}let r=this.createShader(e,this.gl.VERTEX_SHADER),i=this.createShader(t,this.gl.FRAGMENT_SHADER);if(this.name){let e=[];r.error&&e.push(`[VERTEX]
`+r.error),i.error&&e.push(`[FRAGMENT]
`+i.error),e.length>0?Pe.set(this.name,e.join(`

`)):Pe.delete(this.name)}if(!(!r.shader||!i.shader)){if(this.gl.attachShader(this.program,r.shader),this.gl.attachShader(this.program,i.shader),n&&n.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,n.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)){let e=this.gl.getProgramInfoLog(this.program);if(console.error(`program link error:`,e),this.name&&e){let t=Pe.get(this.name);Pe.set(this.name,(t?t+`

`:``)+`[LINK]
`+e)}}return this}}createShader(e,t){let n=this.gl.createShader(t);return n?(this.gl.shaderSource(n,e),this.gl.compileShader(n),this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS)?{shader:n,error:null}:{shader:null,error:this.gl.getShaderInfoLog(n)||`Unknown shader error`}):{shader:null,error:null}}setUniform(e,t,n){let r=this.uniforms.get(e);if(r){r.type=t;let e=r.value;e.length=n.length;for(let t=0;t<n.length;t++)e[t]=n[t];if(r.cache){if(r.cache.length!==e.length)r.needsUpdate=!0;else for(let t=0;t<e.length;t++)if(r.cache[t]!==e[t]){r.needsUpdate=!0;break}}else r.needsUpdate=!0}else this.uniforms.set(e,{value:n.concat(),type:t,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(e){this.program&&this.uniforms.forEach((t,n)=>{(t.location===null||e)&&(t.location=this.gl.getUniformLocation(this.program,n))})}uploadUniforms(){this.uniforms.forEach(e=>{e.needsUpdate&&e.location!==null&&(/Matrix[2|3|4]fv/.test(e.type)?this.gl[`uniform`+e.type](e.location,!1,e.value):/[1|2|3|4][f|i]$/.test(e.type)?this.gl[`uniform`+e.type](e.location,...e.value):this.gl[`uniform`+e.type](e.location,e.value),e.cache=e.value.concat(),e.needsUpdate=!1)})}getVAO(e=`_`){if(!this.program)return null;let t=this.vao.get(e);return t||(t=new Me(this.gl,this.program),this.vao.set(e,t),t)}use(e){this.program&&(this.gl.useProgram(this.program),e&&e(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(e=>{e.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}})))()}var Le;function Re(){return(Re=t((()=>{Le=class{gl;buffer;array;constructor(e){this.gl=e,this.buffer=this.gl.createBuffer(),this.array=null}setData(e,t=`vbo`,n){let r=t==`vbo`?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(r,this.buffer),this.gl.bufferData(r,e,n||this.gl.STATIC_DRAW),this.gl.bindBuffer(r,null),this.array=e,this}read(e){return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this}dispose(){this.gl.deleteBuffer(this.buffer)}}})))()}var ze;function Be(){return(Be=t((()=>{O(),ze=class{unit;image;size;gl;glTex;textureType;_setting;constructor(e){this.gl=e,this.image=null,this.unit=0,this.size=new E,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=e.TEXTURE_2D}get isTexture(){return!0}setting(e){return this._setting={...this._setting,...e},this.attach(this.image),this}attach(e,t){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.image){let e=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(e.width,e.height),e instanceof HTMLImageElement||e instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,e):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,e.width,e.height,0,this._setting.format,this._setting.type,e.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}subImage(e,t,n){return this.gl.bindTexture(this.textureType,this.glTex),this.gl.texSubImage2D(this.textureType,0,0,0,t,n,this._setting.format,this._setting.type,e),this.gl.bindTexture(this.textureType,null),this}activate(e){return this.gl.activeTexture(this.gl.TEXTURE0+e),this.gl.bindTexture(this.textureType,this.glTex),this.unit=e,this}load(e,t){let n=new Image;return n.onload=()=>{this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.attach(n),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),t&&t()},n.src=e,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}})))()}var Ve;function He(){return(He=t((()=>{O(),Be(),Ve=class{size;gl;glFrameBuffer;textures;depthTexture;textureAttachmentList;constructor(e,t){this.gl=e,this.size=new E(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!t||!t.disableDepthBuffer)&&this.setDepthTexture(new ze(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(e){this.depthTexture=e,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((e,t)=>{e.attach({width:this.size.x,height:this.size.y});let n=this.gl.COLOR_ATTACHMENT0+t;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,n,this.gl.TEXTURE_2D,e.getTexture(),0),this.textureAttachmentList.push(n)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(e,t){return typeof e==`number`?(this.size.x=e,t!==void 0&&(this.size.y=t)):this.size.copy(e),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}clear(){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,this.glFrameBuffer),e.drawBuffers(this.textureAttachmentList),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}})))()}var Ue;function We(){return(We=t((()=>{He(),Ue=class extends Ve{cubeTarget;textures;currentFace;constructor(e,t){super(e,t),this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this}face(e){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((t,n)=>{let r=this.gl.COLOR_ATTACHMENT0+n;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,r,this.cubeTarget[e],t.getTexture(),0),this.textureAttachmentList.push(r)}),this.currentFace=this.cubeTarget[e],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}})))()}var Ge;function Ke(){return(Ke=t((()=>{Be(),Ge=class extends ze{cubeTarget;constructor(e){super(e),this.textureType=e.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(e){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let e=0;e<6;e++){let t=Array.isArray(this.image)?this.image[e]:this.image;this.size.set(t.width,t.height),t instanceof HTMLImageElement||t instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[e],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t):this.gl.texImage2D(this.cubeTarget[e],0,this._setting.internalFormat,t.width,t.height,0,this._setting.format,this._setting.type,t.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}})))()}function qe(){return(qe=t((()=>{Ie(),Re(),He(),We(),Be(),Ke()})))()}var k,Je;function Ye(){return(Ye=t((()=>{qe(),k=WebGL2RenderingContext,Je=class{gl;canvas;_stateCache;_extDisJointTimerQuery;_queryList;_queryListQueued;constructor(e){this.gl=e,this.canvas=e.canvas,this._stateCache={},this._queryList=[],this._queryListQueued=[],e.getExtension(`EXT_color_buffer_float`),e.getExtension(`EXT_color_buffer_half_float`),e.getExtension(`OES_texture_float_linear`),this._extDisJointTimerQuery=e.getExtension(`EXT_disjoint_timer_query_webgl2`),this._extDisJointTimerQuery||console.warn(`[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled.`),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)}createTexture(){return new ze(this.gl)}createCubeTexture(){return new Ge(this.gl)}createFrameBuffer(e){return new Ve(this.gl,e)}createCubeFrameBuffer(){return new Ue(this.gl)}createProgram(){return new Fe(this.gl)}_setState(e,t){this._stateCache[e]!==t&&(t?this.gl.enable(e):this.gl.disable(e),this._stateCache[e]=t)}setMaterialState(e,t,n){this._setState(this.gl.CULL_FACE,e),this._setState(this.gl.DEPTH_TEST,t),this.gl.depthMask(n)}setBlendEnabled(e){e?this.gl.enable(this.gl.BLEND):this.gl.disable(this.gl.BLEND)}bindRenderTarget(e,t,n){t?this.gl.viewport(t.x,t.y,t.z,t.w):e?this.gl.viewport(0,0,e.size.x,e.size.y):n&&this.gl.viewport(0,0,n.x,n.y),e?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e.getFrameBuffer()),this.gl.drawBuffers(e.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}clear(e,t){let n=0;e&&(this.gl.clearColor(e.x,e.y,e.z,e.w),n|=this.gl.COLOR_BUFFER_BIT),t!==null&&(this.gl.clearDepth(t),n|=this.gl.DEPTH_BUFFER_BIT),n!==0&&this.gl.clear(n)}blit(e,t,n,r,i,a){let o=this.gl;o.bindFramebuffer(o.READ_FRAMEBUFFER,e?e.getFrameBuffer():null),a&&o.readBuffer(o.COLOR_ATTACHMENT0),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,t?t.getFrameBuffer():null),a&&t&&o.drawBuffers([o.COLOR_ATTACHMENT0]),o.blitFramebuffer(0,0,n,r,0,0,n,r,o.COLOR_BUFFER_BIT,i?o.LINEAR:o.NEAREST)}draw(e,t,n,r,i){e.use(e=>{e.uploadUniforms(),this.gl.bindVertexArray(t.getVAO());let i=t.indexBuffer,a=this.gl.UNSIGNED_SHORT;i&&i.array&&i.array.BYTES_PER_ELEMENT==4&&(a=this.gl.UNSIGNED_INT),r==`NORMAL`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):r==`ADD`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):r==`DIFF`&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);let o=this.gl[n];t.instanceCount>0?i?this.gl.drawElementsInstanced(o,t.indexCount,a,0,t.instanceCount):this.gl.drawArraysInstanced(o,0,t.vertCount,t.instanceCount):i?this.gl.drawElements(o,t.indexCount,a,0):this.gl.drawArrays(o,0,t.vertCount),this.gl.bindVertexArray(null)})}collectTimerQueries(){if(!this._extDisJointTimerQuery)return null;if(this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))return this._queryList.forEach(e=>this.gl.deleteQuery(e)),this._queryList.length=0,null;let e=[];if(this._queryListQueued.length>0){let t=this._queryListQueued.length;for(let n=t-1;n>=0;n--){let t=this._queryListQueued[n];if(this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT_AVAILABLE)){let r=this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT);e.push({name:t.name,duration:r/1e3/1e3}),this._queryList.push(t.query),this._queryListQueued.splice(n,1)}}}return e}}})))()}var Xe,Ze,Qe,$e;function et(){return(et=t((()=>{Xe=(e,t)=>{if(!t)return e;let n=Object.keys(t),r=``;for(let e=0;e<n.length;e++)r+=`#define `+n[e]+` `+t[n[e]]+`
`;return r+=e,r},Ze=(e,t)=>(e=e.replaceAll(`NUM_LIGHT_DIR`,t?t.directional.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_DIR`,t?Math.min(2,t.directional.filter(e=>e.component.castShadow).length).toString():`0`),e=e.replaceAll(`NUM_LIGHT_SPOT`,t?t.spot.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_SPOT`,t?Math.min(2,t.spot.filter(e=>e.component.castShadow).length).toString():`0`),e),Qe=e=>(e=e.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(e,t,n)=>{let r=``;for(let e=0;e<Number(t);e++)r+=n.replaceAll(`LOOP_INDEX`,e.toString());return r}),e),$e=(e,t,n)=>(e=Xe(e,t),e=`#version 300 es
precision highp float;
`+e,e=Ze(e,n),e=Qe(e),e)})))()}var tt;function nt(){return(nt=t((()=>{tt=class{listeners;constructor(){this.listeners=[]}on(e,t){this.listeners.push({event:e,cb:t})}once(e,t){this.listeners.push({event:e,cb:t,once:!0})}off(e,t){this.listeners=this.listeners.filter(n=>t==null?n.event!=e:n.event!=e||n.cb!=t)}emit(e,t){let n=this.listeners.concat();for(let r=0;r<n.length;r++){let i=n[r];i.event==e&&(i.cb.apply(this,t||[]),i.once&&this.off(e,i.cb))}}hasEvent(e){return this.listeners.some(t=>t.event==e)}}})))()}var rt;function it(){return(it=t((()=>{(function(e){function t(){let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``);return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}e.genUUID=t})(rt||={})})))()}function at(){return(at=t((()=>{nt(),it()})))()}var ot;function st(){return(st=t((()=>{(function(e){let t=e.NEWTON_ITERATIONS=4;e.NEWTON_MIN_SLOPE=.001,e.SUBDIVISION_PRECISION=1e-7;let n=e.SUBDIVISION_MAX_ITERATIONS=10,r=e.BEZIER_EASING_CACHE_SIZE=11,i=e.BEZIER_EASING_SAMPLE_STEP_SIZE=1/r;function a(e){return-e.p0+3*e.p1-3*e.p2+e.p3}function o(e){return 3*e.p0-6*e.p1+3*e.p2}function s(e){return-3*e.p0+3*e.p1}function c(e,t){return 3*a(e)*t*t+2*o(e)*t+s(e)}e.calcBezierSlope=c;function l(e,t){return((a(e)*t+o(e))*t+s(e))*t+e.p0}e.calcBezier=l;function u(e,t,r,i){let a=0,o=0;for(let s=0;s<n;s++)o=t+(r-t)/2,a=l(i,o),a>e?r=o:t=o;return o}function d(e,n,r){for(let i=0;i<t;i++){let t=c(n,r);if(t==0)return r;let i=l(n,r)-e;r-=i/t}return r}function f(e,t,n){e.p1=Math.max(e.p0,Math.min(e.p3,e.p1)),e.p2=Math.max(e.p0,Math.min(e.p3,e.p2));let a=0;for(let e=1;e<n.length&&(a=e-1,!(t<n[e]));e++);let o=a/(r-1),s=c(e,o)/(e.p3-e.p0);return s==0?o:s>.01?d(t,e,o):u(t,o,o+i,e)}e.getBezierTfromX=f})(ot||={})})))()}function ct(e,t,n,r){let i=Array(ot.BEZIER_EASING_CACHE_SIZE);for(let a=0;a<ot.BEZIER_EASING_CACHE_SIZE;++a)i[a]=ot.calcBezier({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a/(ot.BEZIER_EASING_CACHE_SIZE-1));return a=>a<=e.x?e.y:r.x<=a?r.y:ot.calcBezier({p0:e.y,p1:t.y,p2:n.y,p3:r.y},ot.getBezierTfromX({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a,i))}function lt(){return(lt=t((()=>{st()})))()}var ut;function dt(){return(dt=t((()=>{(function(e){e.number=(e,t,n)=>e+(t-e)*n,e.vector=(e,t,n)=>e.lerp(t,n)})(ut||={})})))()}function ft(){return(ft=t((()=>{at(),lt(),dt()})))()}var pt;function mt(){return(mt=t((()=>{at(),pt=class extends tt{keyframes=[];cache={frame:NaN,value:NaN};frameStart;frameEnd;frameDuration;constructor(e){super(),this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes=[],e.forEach(e=>{this.addKeyFrame(e)}))}addKeyFrame(e){let t=0;for(let n=0;n<this.keyframes.length&&this.keyframes[n].coordinate.x<e.coordinate.x;n++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let n=0;n<this.keyframes.length;n++){let r=this.keyframes[n];if(e<r.coordinate.x){let i=this.keyframes[n-1];t=i?i.to(r,e):r.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t===null?0:(this.cache={frame:e,value:t},t)}}})))()}var ht;function gt(){return(gt=t((()=>{at(),O(),ht=class extends tt{name;curves;frameStart;frameEnd;frameDuration;updatedFrame=-1;value;constructor(e,t,n,r,i){super(),this.name=e||``,this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new E,t&&this.setFCurve(t,`x`),n&&this.setFCurve(n,`y`),r&&this.setFCurve(r,`z`),i&&this.setFCurve(i,`w`)}setFCurve(e,t){this.curves.set(t,e);let n=1/0,r=-1/0;this.curves.forEach(e=>{e.frameStart<n&&(n=e.frameStart),e.frameEnd>r&&(r=e.frameEnd)}),(n==-1/0||r==1/0)&&(n=0,r=1),this.frameStart=n,this.frameEnd=r,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(e){return this.curves.get(e)||null}setFrame(e){if(e==this.updatedFrame)return this;let t=this.curves.get(`x`),n=this.curves.get(`y`),r=this.curves.get(`z`),i=this.curves.get(`w`);return t&&(this.value.x=t.getValue(e)),n&&(this.value.y=n.getValue(e)),r&&(this.value.z=r.getValue(e)),i&&(this.value.w=i.getValue(e)),this.updatedFrame=e,this}}})))()}var _t;function vt(){return(vt=t((()=>{at(),lt(),_t=class extends tt{coordinate={x:0,y:0};handleLeft={x:0,y:0};handleRight={x:0,y:0};interpolation=`BEZIER`;easing=null;nextFrame=null;constructor(e,t,n,r){super(),this.set(e,t,n,r)}set(e,t,n,r){this.coordinate=e,this.handleLeft=t||e,this.handleRight=n||e,this.interpolation=r||`BEZIER`}getEasing(e,t){return e==`BEZIER`?ct(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):e==`CONSTANT`?()=>this.coordinate.y:e=>{let n=t.coordinate.y-this.coordinate.y;return e=(e-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+e*n}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}}})))()}var yt;function bt(){return(bt=t((()=>{at(),mt(),gt(),vt(),yt=class e extends tt{static gltfLoaderFactory=null;_engine;connection;frame;nodes;curveGroups;root;gltf;currentScene;constructor(e,t){super(),this._engine=e,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},t&&this.connect(t)}connect(e,t){}disconnect(){}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[n]=r}return t.buffer}async loadScene(t,n){this.currentScene=t,n&&(e.gltfLoaderFactory?await e.gltfLoaderFactory(this._engine).load(n).then(e=>{this.gltf=e,this.emit(`gltfLoaded`,[e])}):console.warn(`BLidge: gltfLoaderFactory not wired`)),await new Promise(e=>{setTimeout(()=>{e(null)},100)}),this.frame.start=t.frame.start,this.frame.end=t.frame.end,this.frame.fps=t.frame.fps,this.curveGroups=[],this.nodes=[];let r=Object.keys(t.animations);for(let e=0;e<r.length;e++){let n=r[e],i=new ht(n);t.animations[e].forEach(e=>{let t=new pt;t.set(e.k.map(e=>{let t={B:`BEZIER`,C:`CONSTANT`,L:`LINEAR`}[e[0]],n=e[1];return new _t({x:n[0],y:n[1]},n[2]!==void 0&&{x:n[2],y:n[3]}||void 0,n[4]!==void 0&&{x:n[4],y:n[5]}||void 0,t)})),i.setFCurve(t,e.axis)}),this.curveGroups.push(i)}this.nodes=[];let i=e=>{let t={name:``,uniforms:{}};e.material&&(t.name=e.material.name||``,t.uniforms=e.material.uniforms||{});let n={name:e.name,class:e.class,parent:e.parent,children:[],animations:e.animation||{},position:e.position||[0,0,0],rotation:e.rotation||[0,0,0],scale:e.scale||[1,1,1],material:t,type:e.type,visible:e.visible},r=e.param;return n.param=r&&`position`in r?{position:new Float32Array(this.binaryStringToArrayBuffer(atob(r.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(r.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(r.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(r.index)))}:r,e.children&&e.children.forEach(e=>{n.children.push(i(e))}),this.nodes.push(n),n};this.root=i(t.root),this.emit(`sync/scene`,[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(e){this.frame=e,this.emit(`sync/timeline`,[this.frame])}onOpen(e){}onMessage(e){}onClose(e){this.disconnect()}getCurveGroup(e){return this.curveGroups[e]}setFrame(e){this.onSyncTimeline({...this.frame,playing:!0,current:e})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(e=>{this.on(`gltfLoaded`,t=>{e(t)})})}dispose(){this.disconnect()}}})))()}var xt,St;function Ct(){return(Ct=t((()=>{at(),xt=(e,t)=>{if(typeof e==`number`){let n=e;return t.int&&(n=Math.round(n)),t.min!==void 0&&(n=Math.max(t.min,n)),t.max!==void 0&&(n=Math.min(t.max,n)),n}if(Array.isArray(e)){if(!e.every(e=>typeof e==`number`))return e;let n=[];for(let r of e)n.push(xt(r,t));return n}return e},St=class extends tt{uuid;initiator;fields_;constructor(){super(),this.uuid=rt.genUUID(),this.fields_=new Map,this.initiator=`script`}restoreUUID(e){this.uuid=e}serialize(e){e||={mode:`view`};let t={};return this.fields_.forEach((n,r)=>{let i=this.getFieldOpt(r);e.mode==`export`&&i&&i&&i.noExport||(t[r]=n.get(e))}),t}serializeToDirectory(){return(e=>{let t={type:`folder`,childs:{},opt:{}},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=this.getFieldOpt(i);if(!i)continue;let o=t,s=i.split(`/`);for(let e=0;e<s.length;e++){let t=s[e];t&&o.type!=`value`&&(o.childs[t]||(e==s.length-1?o.childs[t]={type:`value`,value:null,opt:a}:o.childs[t]={type:`folder`,childs:{},opt:a}),o=o.childs[t])}o.type==`value`&&(o.value=e[i])}return t})(this.serialize())}deserialize(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let r=t[n],i=this.fields_.get(r);i&&i.set(e[r])}}exportEditor(){this.serialize({mode:`export`})}field(e,t,n,r){let i=typeof n==`function`?n:void 0,a=typeof n==`object`&&n||r||{};i||(a.readOnly=!0,a.noExport=!0);let o=e.startsWith(`/`)?e.slice(1):e;this.fields_.set(o,{get:t,set:(t=>{i&&i(xt(t,a)),this.noticeField(e)}),opt:a})}fieldDir(e,t){let n=e;return this.field(n+`/`,()=>null,void 0,{...t,isFolder:!0}),{dir:e=>this.fieldDir(`${n}/${e}`),field:(e,t,r,i)=>{this.field(`${n}/${e}`,t,r,i)}}}removeField(e){let t=e.startsWith(`/`)?e.slice(1):e;this.fields_.delete(t)}setField(e,t){let n=this.fields_.get(e);if(!n)throw Error(`Unknown field path: ${e}`);n.set(t)}getField(e,t){let n=this.fields_.get(e);if(n)return t||={mode:`view`},n.get(t)}getFieldOpt(e){let t=this.fields_.get(e);if(t)return t.opt}noticeField(e){this.emit(`fields/update/`+e),this.emit(`fields/update`,[[e]])}}})))()}var wt;function Tt(){return(Tt=t((()=>{Ct(),wt=class extends St{disableEdit;order;_entity;_engine;_enabled;_tag;_disposed;constructor(e){super(),this.disableEdit=!1,this._entity=e.entity,this._engine=e.engine,this._enabled=!0,this._disposed=!1,this._tag=``,this.order=0,this.field(`enabled`,()=>this.enabled,e=>this.enabled=e,{hidden:!0,noExport:!0}),this.field(`tag`,()=>this.tag,e=>this._tag=e,{readOnly:!0,noExport:!0,hidden:e=>e==``})}get tag(){return this._tag}get entity(){return this._entity}get engine(){return this._engine}set enabled(e){this._enabled=e}get enabled(){return this._enabled}update(e){this.enabled&&this.updateImpl(e)}updateImpl(e){}postUpdate(e){this.enabled&&this.postUpdateImpl(e)}postUpdateImpl(e){}prepareRender(e){this.enabled&&this.prepareRenderImpl(e)}prepareRenderImpl(e){}commitFrame(e){this.enabled&&this.commitFrameImpl(e)}commitFrameImpl(e){}dispose(){this._disposed=!0,this.emit(`dispose`)}}})))()}var Et;function Dt(){return(Dt=t((()=>{O(),Ct(),Et=class extends St{vertCount;attributes;boundingBox;updateVersion;constructor(){super(),this.vertCount=0,this.attributes=new Map,this.boundingBox=null,this.updateVersion=0}setAttribute(e,t,n,r){return this.attributes.set(e,{array:t,size:n,opt:r}),this.updateVersion++,this.updateVertCount(),e===`position`&&this.computeBoundingBox(),this}getAttribute(e){return this.attributes.get(e)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((e,t)=>{t==`index`||e.opt&&e.opt.instanceDivisor||(this.vertCount=Math.min(e.array.length/e.size,this.vertCount))})}computeBoundingBox(){let e=this.attributes.get(`position`);if(!e){this.boundingBox=null;return}let t=e.array,n=new E(1/0,1/0,1/0),r=new E(-1/0,-1/0,-1/0);for(let e=0;e<t.length;e+=3){let i=t[e],a=t[e+1],o=t[e+2];i<n.x&&(n.x=i),a<n.y&&(n.y=a),o<n.z&&(n.z=o),i>r.x&&(r.x=i),a>r.y&&(r.y=a),o>r.z&&(r.z=o)}this.boundingBox={min:n,max:r}}requestUpdate(){this.updateVersion++}}})))()}var Ot;function kt(){return(kt=t((()=>{Dt(),Ot=class extends Et{constructor(e){super();let t=[],n=[],r=[],i=[],a=[],{width:o,height:s,depth:c,segmentsWidth:l,segmentsHeight:u,segmentsDepth:d}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...e},f=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:o,h:c,d:s,segW:l,segH:d},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:o,h:c,d:s,segW:l,segH:d}],p=0;for(let e of f){let o=e.normal,s=e.dir,c=e.up,l=e.segW,u=e.segH,d=e.w/2,f=e.h/2,m=e.d/2,h=e.w/l,g=e.h/u;for(let e=0;e<=u;e++)for(let _=0;_<=l;_++){let v=-d+_*h,y=-f+e*g,b=-m,x=_/l,S=e/u,C=v*-s[0]+y*c[0]+b*-o[0],ee=v*-s[1]+y*c[1]+b*-o[1],te=v*-s[2]+y*c[2]+b*-o[2];if(t.push(C,ee,te),n.push(...o),r.push(x,S),a.push(e/u*c[1]+Math.max(0,c[2])),e<u&&_<l){let t=p+e*(l+1)+_,n=p+(e+1)*(l+1)+_,r=p+(e+1)*(l+1)+(_+1),a=p+e*(l+1)+(_+1);i.push(t,n,a),i.push(n,r,a)}}p+=(l+1)*(u+1)}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`posY`,new Float32Array(a),1),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var At;function jt(){return(jt=t((()=>{O(),Dt(),At=class extends Et{constructor(e){super();let t=[],n=[],r=[],i=[],{height:a,radiusTop:o,radiusBottom:s,radSegments:c,heightSegments:l,caps:u}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...e};for(let e=0;e<=l+2;e++)for(let d=0;d<=c;d++){let f=Math.PI*2/c*d;if(e<=l){let u=1-e/l,p=(1-u)*o+u*s,m=Math.cos(f)*p,h=-(a/2)+a/l*e,g=Math.sin(f)*p;t.push(m,h,g),r.push(d/c,e/l);let _=new E(Math.cos(f),0,Math.sin(f)).normalize();if(n.push(_.x,_.y,_.z),e<l){let t=c+1;i.push(e*t+d,(e+1)*t+(d+1)%t,e*t+(d+1)%t,e*t+d,(e+1)*t+d,(e+1)*t+(d+1)%t)}}else{if(!u)continue;let p=e-l-1,m=p?o:s,h=Math.cos(f)*m,g=-(a/2)+a*p,_=Math.sin(f)*m;t.push(h,g,_),r.push((h+m)*.5/m,(_+m)*.5/m),n.push(0,-1+p*2,0);let v=(c+1)*(l+(p+1));d<=c-2&&(p==0?i.push(v,v+d,v+d+1):i.push(v,v+d+1,v+d))}}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var Mt;function Nt(){return(Nt=t((()=>{Dt(),Mt=class extends Et{constructor(e){super();let{width:t,height:n,widthSegments:r,heightSegments:i,floor:a}={width:1,height:1,widthSegments:1,heightSegments:1,...e},o=t/2,s=n/2,c=[],l=[],u=[],d=[];for(let e=0;e<=i;e++)for(let f=0;f<=r;f++){let p=f/r,m=e/i;if(a?(c.push(-o+t*p,0,s-n*m),l.push(0,1,0)):(c.push(-o+t*p,-s+n*m,0),l.push(0,0,1)),u.push(p,m),e>0&&f>0){let t=r+1,n=t*e+f,i=t*(e-1)+f-1;d.push(n,t*e+f-1,i,n,i,t*(e-1)+f)}}this.setAttribute(`position`,new Float32Array(c),3),this.setAttribute(`normal`,new Float32Array(l),3),this.setAttribute(`uv`,new Float32Array(u),2),this.setAttribute(`index`,new Uint16Array(d),1)}}})))()}var Pt;function Ft(){return(Ft=t((()=>{O(),Dt(),Pt=class extends Et{constructor(e){super();let t=[],n=[],r=[],i=[],{radius:a,widthSegments:o,heightSegments:s}={radius:.5,widthSegments:8,heightSegments:8,...e};for(let e=0;e<=s;e++){let c=e/s*Math.PI;for(let l=0;l<=o;l++){let u=l/o*Math.PI*2,d=Math.sin(c)*a,f=Math.cos(u)*d,p=-Math.cos(c)*a,m=-Math.sin(u)*d;t.push(f,p,m),r.push(l/o,e/s);let h=new E(f,p,m).normalize();if(n.push(h.x,h.y,h.z),l<o&&e<s){let t=o+1;i.push(e*t+l,e*t+(l+1)%t,(e+1)*t+(l+1)%t,e*t+l,(e+1)*t+(l+1)%t,(e+1)*t+l)}}}for(let e=0;e<i.length;e++)i[e]=Math.min(t.length/3-1,i[e]);this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var It;function Lt(){return(Lt=t((()=>{O(),Tt(),It=class extends wt{cameraType;fov;aspect;near;far;orthHeight;projectionMatrix;viewMatrix;projectionMatrixPrev;viewMatrixPrev;_historyInitialized;needsUpdateProjectionMatrix;displayOut;viewPort;dofParams;focusEnabled;focusMode;focusTarget;_focusTargetUUID;focusManualDistance;focusSpeed;_focusCurrent;_tmpVector1;_tmpVector2;constructor(e){super(e),this.cameraType=`perspective`,this.viewMatrix=new D,this.projectionMatrix=new D,this.viewMatrixPrev=new D,this.projectionMatrixPrev=new D,this._historyInitialized=!1,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.dofParams={focusDistance:.5,kFilmHeight:.024,fNumber:.3};let t=()=>{this.needsUpdateProjectionMatrix=!0};this.field(`cameraType`,()=>this.cameraType,e=>{this.cameraType=e,t()},{format:{type:`select`,list:[`perspective`,`orthographic`]}}),this.field(`fov`,()=>this.fov,e=>{this.fov=e,t()}),this.field(`near`,()=>this.near,e=>{this.near=e,t()}),this.field(`far`,()=>this.far,e=>{this.far=e,t()}),this.field(`orthHeight`,()=>this.orthHeight,e=>{this.orthHeight=e,t()}),this.focusEnabled=!0,this.focusMode=`auto`,this.focusTarget=null,this._focusTargetUUID=null,this.focusManualDistance=5,this.focusSpeed=8,this._focusCurrent=null,this._tmpVector1=new E,this._tmpVector2=new E;let n=this.fieldDir(`focus`);n.field(`mode`,()=>this.focusMode,e=>{this.focusMode=e},{format:{type:`select`,list:[`auto`,`target`,`manual`]}}),n.field(`target`,()=>this._focusTargetUUID,e=>{this._focusTargetUUID=e||null,this.focusTarget=null},{format:{type:`entity`}}),n.field(`distance`,()=>this.focusManualDistance,e=>{this.focusManualDistance=e},{step:.1}),n.field(`speed`,()=>this.focusSpeed,e=>{this.focusSpeed=e},{step:.5}),n.field(`fNumber`,()=>this.dofParams.fNumber,e=>{this.dofParams.fNumber=e},{step:.05}),this._tag=`camera`}updateProjectionMatrix(){this.cameraType==`perspective`?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthHeight*this.aspect,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}updateImpl(e){if(this._resolveFocusTarget(),this.displayOut){let t=e.resolution.x/e.resolution.y;this.aspect!==t&&(this.aspect=t,this.needsUpdateProjectionMatrix=!0)}}prepareRenderImpl(e){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix(),this.focusEnabled&&this._updateFocus(e),this._historyInitialized||=(this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix),!0)}_resolveFocusTarget(){if(!this._focusTargetUUID||this.focusTarget)return;let e=this.entity.getRootEntity();this.focusTarget=e.findEntityByUUID(this._focusTargetUUID)||null}_updateFocus(e){let t=this._calcFocusDistance(e);t!==null&&(this._focusCurrent===null||this.focusSpeed<=0?this._focusCurrent=t:this._focusCurrent+=(t-this._focusCurrent)*(1-Math.exp(-this.focusSpeed*e.timeDelta)),this.dofParams.focusDistance=this._focusCurrent)}_calcFocusDistance(e){if(this.focusMode===`manual`)return this.focusManualDistance;if(this.focusMode===`auto`){let t=e.renderer.centerDepth;if(typeof t==`number`)return t}if(!this.focusTarget)return null;this.entity.matrixWorld.decompose(this._tmpVector1),this.focusTarget.matrixWorld.decompose(this._tmpVector2),this._tmpVector2.sub(this._tmpVector1);let t=this.entity.matrixWorld.elm;return this._tmpVector1.set(t[8],t[9],t[10]).normalize(),-this._tmpVector2.dot(this._tmpVector1)}commitFrameImpl(e){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}})))()}var Rt;function zt(){return(zt=t((()=>{O(),Lt(),Rt=class extends It{viewMatrixOffset;constructor(e){super(e),this.viewMatrixOffset=new Oe().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100,this.displayOut=!1,this.focusEnabled=!1,this.removeField(`focus/`),this.removeField(`focus/mode`),this.removeField(`focus/target`),this.removeField(`focus/distance`),this.removeField(`focus/speed`)}prepareRenderImpl(e){super.prepareRenderImpl(e),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}})))()}var Bt;function Vt(){return(Vt=t((()=>{O(),zt(),Bt=class extends Rt{lightType;color;intensity;castShadow;shadowMapSize;shadowDistance;_shadowCenter;_shadowDirection;_shadowUp;_origin;angle;blend;distance;decay;constructor(e){super(e),this.lightType=`spot`,this.cameraType=`perspective`,this.color=new E(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new E(1024,1024),this.shadowDistance=30,this._shadowCenter=new E,this._shadowDirection=new E,this._shadowUp=new E,this._origin=new E,this.angle=Math.PI*.5,this.blend=1,this.distance=30,this.decay=2,this.field(`lightType`,()=>this.lightType,e=>this.lightType=e,{format:{type:`select`,list:[`directional`,`spot`]}}),this.field(`color`,()=>this.color.getElm(`vec3`),e=>this.color.setFromArray(e),{format:{type:`color`}}),this.field(`castShadow`,()=>this.castShadow,e=>this.castShadow=e),this.field(`angle`,()=>this.angle,e=>{this.angle=e,this.needsUpdateProjectionMatrix=!0}),this.field(`blend`,()=>this.blend,e=>this.blend=e),this.field(`shadowDistance`,()=>this.shadowDistance,e=>this.shadowDistance=e),this.field(`intensity`,()=>this.intensity,e=>this.intensity=e),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,super.updateProjectionMatrix()}prepareRenderImpl(e){this.lightType!==`directional`&&super.prepareRenderImpl(e)}fitShadowToCamera(e,t){let n=e.near,r=Math.max(Math.min(e.far,this.shadowDistance),n+.01),i,a;if(e.cameraType===`perspective`){let t=Math.tan(e.fov*Math.PI/360),o=t*t*(1+e.aspect*e.aspect);i=n*n*o,a=r*r*o}else{let t=e.orthHeight/2;i=t*t*(1+e.aspect*e.aspect),a=i}let o=(r*r-n*n+a-i)/(2*(r-n));o=Math.min(Math.max(o,n),r);let s=o-n,c=r-o,l=Math.sqrt(Math.max(s*s+i,c*c+a));this._shadowCenter.set(0,0,-o,1).applyMatrix4(e.entity.matrixWorld),this._shadowDirection.set(0,1,0,0).applyMatrix4(this.entity.matrixWorld).normalize().multiply(-1),this._shadowUp.set(0,0,-1,0).applyMatrix4(this.entity.matrixWorld).normalize(),this.viewMatrix.lookAt(this._origin,this._shadowDirection,this._shadowUp).inverse();let u=l*2/t;this._shadowCenter.applyMatrix4(this.viewMatrix);let d=l,f=this.viewMatrix.elm;f[12]=-Math.round(this._shadowCenter.x/u)*u,f[13]=-Math.round(this._shadowCenter.y/u)*u,f[14]=-(this._shadowCenter.z+l+d),this.near=0,this.far=l*2+d,this.projectionMatrix.orthographic(l*2,l*2,this.near,this.far)}lookAt(e){this.entity.lookAt(e),this.entity.quaternion.multiply(new Oe().setFromEuler(new Ee(Math.PI/2)))}}})))()}var Ht,A;function Ut(){return(Ut=t((()=>{Tt(),Dt(),Ht=new Et,A=class extends wt{geometry;material;instanceCount;constructor(e){super(e);let t=e.args||{};this.geometry=t.geometry||Ht,this.material=t.material||null,this.instanceCount=t.instanceCount||1}}})))()}var Wt;function Gt(){return(Gt=t((()=>{Tt(),kt(),jt(),Nt(),Ft(),Dt(),Lt(),Vt(),Ut(),Wt=class extends wt{node;rotationOffsetX;animations;uniforms;uniformCurves;transformAutoUpdate;_blidge;_lightComponent;constructor(e){super(e),this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=e.args.blidge,this.node=e.args.node,this.node.type==`camera`&&(this.rotationOffsetX=-Math.PI/2);let t=Object.keys(this.node.animations);for(let e=0;e<t.length;e++){let n=t[e];this.animations.set(n,this._blidge.getCurveGroup(this.node.animations[n]))}let n=Object.keys(this.node.material.uniforms);for(let e=0;e<n.length;e++){let t=n[e],r=this.node.material.uniforms[t],i=this._blidge.curveGroups[r];i&&(this.uniformCurves.set(t,i),this.uniforms[t]={type:`4fv`,value:i.value})}let r=this.entity;if(r.name=this.node.name,r.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),r.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},`YZX`),r.quaternion.updated=!1,r.euler.setFromQuaternion(r.quaternion),r.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type==`cube`){let e=r.addComponent(A),t=this.node.param;e.geometry=new Ot({width:t.x,height:t.y,depth:t.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type==`sphere`){let e=r.addComponent(A),t=this.node.param;e.geometry=new Pt({radius:t.r,widthSegments:32,heightSegments:16})}else if(this.node.type==`cylinder`){let e=r.addComponent(A);e.geometry=new At}else if(this.node.type==`plane`){let e=r.addComponent(A),t=this.node.param;e.geometry=new Mt({width:t.x,height:t.y})}else if(this.node.type==`mesh`){let e=r.addComponent(A),t=this.node.param,n=new Et;n.setAttribute(`position`,t.position,3),n.setAttribute(`uv`,t.uv,2),n.setAttribute(`normal`,t.normal,3),n.setAttribute(`index`,t.index,3),e.geometry=n}else if(this.node.type==`gltf`){let e=r.addComponent(A);this._blidge.gltfPrm.then(t=>{let n=t.scene.findEntityByName(this.node.name);if(n){let t=n.getComponent(A);t&&(e.geometry=t.geometry,e.material||=t.material)}r.noticeEventParent(`update/blidge/scene`,[r])})}if(this.node.type==`camera`){let e=e=>{e.fov=this.node.param.fov,e.needsUpdateProjectionMatrix=!0},t=r.getComponentsByTag(`camera`)[0];t&&e(t);let n=t=>{t instanceof It&&e(t)};r.on(`componentAdded`,n),this.once(`dispose`,()=>{r.off(`componentAdded`,n)})}if(this.node.type==`light`){let e=this.node.param;this._lightComponent=r.addComponent(Bt),this._lightComponent.deserialize({...e,lightType:e.type,color:[e.color.x,e.color.y,e.color.z],castShadow:e.shadowMap})}r.visible=this.node.visible}updateImpl(e){if(!this._blidge||!this.node)return;let t=e.timeCode*this._blidge.frame.fps;if(this.animations.forEach(e=>{e.setFrame(t)}),this.transformAutoUpdate){let e=this.animations.get(`position`);if(e){let t=e.value;e.getFCurve(`x`)&&(this.entity.position.x=t.x),e.getFCurve(`y`)&&(this.entity.position.y=t.y),e.getFCurve(`z`)&&(this.entity.position.z=t.z)}let n=this.animations.get(`rotation`);if(n){let e={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},t=n.value;n.getFCurve(`x`)&&(e.x=t.x),n.getFCurve(`y`)&&(e.y=t.y),n.getFCurve(`z`)&&(e.z=t.z),this.entity.quaternion.setFromEuler({x:e.x+this.rotationOffsetX,y:e.y,z:e.z},`YZX`)}let r=this.animations.get(`scale`);if(r){let e=r.setFrame(t).value;r.getFCurve(`x`)&&(this.entity.scale.x=e.x),r.getFCurve(`y`)&&(this.entity.scale.y=e.y),r.getFCurve(`z`)&&(this.entity.scale.z=e.z)}}let n=this.animations.get(`hide`);if(n&&(this.entity.visible=n.value.x<.5),this._lightComponent){let e=this.animations.get(`color`);e&&this._lightComponent.color.copy(e.setFrame(t).value)}this.uniformCurves.forEach((e,n)=>{this.uniforms[n].value=e.setFrame(t).value})}}})))()}function Kt(){return(Kt=t((()=>{Tt(),Gt()})))()}function qt(){return(qt=t((()=>{Tt()})))()}var Jt;function Yt(){return(Yt=t((()=>{O(),Ct(),Jt=class extends St{name;position;euler;quaternion;scale;matrix;matrixWorld;matrixWorldPrev;_matrixWorldHistoryInitialized;autoMatrixUpdate;parent;children;components;componentsSorted;visible;userData;unresolvedComponents;_engine;constructor(e){super(),this._engine=e.engine,this.name=e.name??``,this.position=new E(0,0,0,1),this.euler=new Ee,this.quaternion=new Oe(0,0,0,1),this.scale=new E(1,1,1),this.matrix=new D,this.matrixWorld=new D,this.matrixWorldPrev=new D,this._matrixWorldHistoryInitialized=!1,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.userData={},this.unresolvedComponents=[],this.field(`name`,()=>this.name,e=>this.name=e),this.field(`position`,()=>this.position.getElm(`vec3`),e=>this.position.setFromArray(e),{format:{type:`vector`}}),this.field(`euler`,()=>this.euler.getElm(`vec3`),e=>this.euler.setFromArray(e),{format:{type:`vector`}}),this.field(`scale`,()=>this.scale.getElm(`vec3`),e=>this.scale.setFromArray(e),{format:{type:`vector`}}),this.field(`visible`,()=>this.visible,e=>this.visible=e,{hidden:!0}),this.field(`children`,()=>this.children.map(e=>e.uuid),{hidden:!0}),this.field(`components`,()=>{let e=[];return this.components.forEach(t=>e.push(t.uuid)),e},{hidden:!0})}get engine(){return this._engine}update(e){let t={...e};t.matrix=this.matrixWorld,this.updateImpl(e);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].update(t);this.autoMatrixUpdate&&this.updateMatrix();for(let e=0;e<this.children.length;e++)this.children[e].update(t)}updateImpl(e){}postUpdate(e){let t={...e,matrix:this.matrixWorld};for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].postUpdate(t);for(let e=0;e<this.children.length;e++)this.children[e].postUpdate(t)}prepareRender(e){let t={...e,matrix:this.matrixWorld};this._matrixWorldHistoryInitialized||=(this.matrixWorldPrev.copy(this.matrixWorld),!0);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].prepareRender(t);for(let e=0;e<this.children.length;e++)this.children[e].prepareRender(t)}commitFrame(e){let t={...e,matrix:this.matrixWorld};this.matrixWorldPrev.copy(this.matrixWorld);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].commitFrame(t);for(let e=0;e<this.children.length;e++)this.children[e].commitFrame(t)}add(e){e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),this.noticeField(`children`)}remove(e){this.children=this.children.filter(t=>t.uuid!=e.uuid),this.noticeField(`children`)}updateMatrix(e){this.parent&&e&&this.parent.updateMatrix(!0);let t=this.parent?this.parent.matrixWorld:new D;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(t)}updateMatrixRecursive(e){this.autoMatrixUpdate&&this.updateMatrix(e);for(let e=0;e<this.children.length;e++)this.children[e].updateMatrixRecursive()}decomposeMatrix(e){e.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(e){this.decomposeMatrix(this.matrix.clone().multiply(e))}lookAt(e){let t=e.clone(),n=new E(0,1,0,0);if(this.parent){let e=this.parent.matrixWorld.clone().inverse();t.applyMatrix4AsPosition(e),n.applyMatrix4AsDirection(e).normalize()}let r=new D().lookAt(this.position,t,n);this.quaternion.setFromMatrix(r),this.updateMatrix()}addComponent(e,...t){this.removeComponent(e);let[n]=t,r=new e({entity:this,engine:this._engine,args:n||{}});return this.components.set(e,r),this.componentsSorted.push(r),this.componentsSorted.sort((e,t)=>e.order-t.order),this.noticeField(`components`),this.emit(`componentAdded`,[r]),r}removeComponent(e){let t=this.components.get(e);t&&t.dispose(),this.components.delete(e),this.componentsSorted=this.componentsSorted.filter(e=>e!==t),this.noticeField(`components`),t&&this.emit(`componentRemoved`,[t])}removeComponentByUUID(e){for(let t of this.components){let n=t[0],r=t[1];if(r.uuid===e)return r.dispose(),this.components.delete(n),this.componentsSorted=this.componentsSorted.filter(e=>e!==r),this.noticeField(`components`),this.emit(`componentRemoved`,[r]),r}}getComponent(e){return this.components.get(e)}getComponentByUUID(e){for(let t of this.components.values())if(t.uuid===e)return t;return null}getComponentByTag(e){for(let t of this.components.values())if(t.tag===e)return t;return null}getComponentsByTag(e){let t=[];return this.components.forEach(n=>{n.tag==e&&t.push(n)}),t}findEntityByName(e){if(this.name==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByName(e);if(n)return n}}findEntityByUUID(e){if(this.uuid==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByUUID(e);if(n)return n}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(e){let t=`/`+this.name;return e&&e.uuid==this.uuid||this.parent&&(t=this.parent.getScenePath(e)+t),t}noticeEventChilds(e,t){this.emit(e,t);for(let n=0;n<this.children.length;n++)this.children[n].noticeEventChilds(e,t)}noticeEventParent(e,t){this.emit(e,t),this.parent&&this.parent.noticeEventParent(e,t)}traverse(e){e(this),this.children.forEach(t=>t.traverse(e))}isVisibleTraverse(){return this.visible?!this.parent||this.parent.isVisibleTraverse():!1}dispose(){this.emit(`dispose`),this.parent&&this.parent.remove(this),this.components.forEach(e=>{e.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(e=>{e.disposeRecursive()}),this.children=[]}}})))()}function Xt(){return(Xt=t((()=>{at(),O()})))()}function Zt(){return(Zt=t((()=>{O(),Dt(),Xt()})))()}var Qt;function $t(){return($t=t((()=>{Dt(),Qt=class extends Et{constructor(e){super();let{innerRadius:t,outerRadius:n,thetaSegments:r,phiSegments:i,extrude:a}={innerRadius:.4,outerRadius:.5,thetaSegments:12,phiSegments:1,extrude:0,...e},o=r+1,s=[],c=[],l=[],u=[],d=(r+1)*(i+1);for(let e=0;e<(a==0?1:2);e++){let f=e==0?-1:1,p=a==0?0:a/2*f;for(let a=0;a<i+1;a++){let m=t+(n-t)*(a/i);for(let t=0;t<=r;t++){let n=t/r*Math.PI*2,h=Math.cos(n)*m,g=Math.sin(n)*m;if(s.push(h,g,p),l.push(t/r,a/i),c.push(0,0,1*f),a>0&&t<r){let n=d*e+a*o+t;e==0?u.push(n,n-o,n+1,n+1,n-o,n+1-o):u.push(n,n+1,n-o,n+1,n+1-o,n-o)}}}}if(a!=0){for(let e=0;e<2;e++){let o=e==0?t:n;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let u=n/r*Math.PI*2,d=Math.cos(u)*o,f=Math.sin(u)*o;s.push(d,f,(-.5+t)*a),l.push(n/r,t/i),e==0?c.push(-Math.cos(u),-Math.sin(u),0):c.push(Math.cos(u),Math.sin(u),0)}}let e=d*2;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let i=e+n+r*2*t,a=n==r-1?-r:0;t==0?u.push(i,i+r,i+r+1+a,i,i+r+1+a,i+1+a):u.push(i,i+r+1+a,i+r,i,i+1+a,i+r+1+a)}}this.setAttribute(`position`,new Float32Array(s),3),this.setAttribute(`normal`,new Float32Array(c),3),this.setAttribute(`uv`,new Float32Array(l),2),this.setAttribute(`index`,new Uint16Array(u),1)}}})))()}var en,tn;function nn(){return(nn=t((()=>{en=new Map,tn=(e,t)=>en.get(e)||(en.set(e,t),t)})))()}var rn;function an(){return(an=t((()=>{O(),rn=class{origin;direction;constructor(e,t){this.origin=e||new E,this.direction=t||new E(0,0,-1)}setFromCamera(e,t,n){let r=new E(e.x,e.y,-1,1).applyMatrix4(t).applyMatrix4(n);r.x/=r.w,r.y/=r.w,r.z/=r.w;let i=new E(e.x,e.y,1,1).applyMatrix4(t).applyMatrix4(n);return i.x/=i.w,i.y/=i.w,i.z/=i.w,this.origin.set(r.x,r.y,r.z),this.direction.set(i.x-r.x,i.y-r.y,i.z-r.z).normalize(),this}intersectAABB(e,t){let n=1/this.direction.x,r=1/this.direction.y,i=1/this.direction.z,a=(e.x-this.origin.x)*n,o=(t.x-this.origin.x)*n,s=Math.min(a,o),c=Math.max(a,o);if(a=(e.y-this.origin.y)*r,o=(t.y-this.origin.y)*r,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),a=(e.z-this.origin.z)*i,o=(t.z-this.origin.z)*i,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),c<0||s>c)return null;let l=s>=0?s:c;return{distance:l,point:new E(this.origin.x+this.direction.x*l,this.origin.y+this.direction.y*l,this.origin.z+this.direction.z*l)}}intersectTriangle(e,t,n){let r=1e-8,i=t.x-e.x,a=t.y-e.y,o=t.z-e.z,s=n.x-e.x,c=n.y-e.y,l=n.z-e.z,u=this.direction.y*l-this.direction.z*c,d=this.direction.z*s-this.direction.x*l,f=this.direction.x*c-this.direction.y*s,p=i*u+a*d+o*f;if(p>-1e-8&&p<r)return null;let m=1/p,h=this.origin.x-e.x,g=this.origin.y-e.y,_=this.origin.z-e.z,v=m*(h*u+g*d+_*f);if(v<0||v>1)return null;let y=g*o-_*a,b=_*i-h*o,x=h*a-g*i,S=m*(this.direction.x*y+this.direction.y*b+this.direction.z*x);if(S<0||v+S>1)return null;let C=m*(s*y+c*b+l*x);return C>r?{distance:C,point:new E(this.origin.x+this.direction.x*C,this.origin.y+this.direction.y*C,this.origin.z+this.direction.z*C)}:null}}})))()}var on;function sn(){return(sn=t((()=>{O(),Ut(),an(),on=class{ray;_v0;_v1;_v2;constructor(){this.ray=new rn,this._v0=new E,this._v1=new E,this._v2=new E}setFromCamera(e,t){let n=t.getComponentsByTag(`camera`)[0];if(!n)return;let r=n.projectionMatrix.clone().inverse(),i=n.viewMatrix.clone().inverse();this.ray.setFromCamera(e,r,i)}intersectEntities(e){let t=[];return e.traverse(e=>{if(!e.visible)return;let n=e.getComponent(A);if(!n)return;let r=this.intersectMesh(e,n);r&&t.push(...r)}),t.sort((e,t)=>e.distance-t.distance),t}intersectMesh(e,t){let n=t.geometry,r=n.boundingBox;if(!r)return null;let i=e.matrixWorld.clone().inverse(),a=new rn;a.origin.copy(this.ray.origin),a.origin.w=1,a.origin.applyMatrix4(i),a.origin.x/=a.origin.w,a.origin.y/=a.origin.w,a.origin.z/=a.origin.w;let o=this.ray.origin.clone().add(this.ray.direction);if(o.w=1,o.applyMatrix4(i),o.x/=o.w,o.y/=o.w,o.z/=o.w,a.direction.set(o.x-a.origin.x,o.y-a.origin.y,o.z-a.origin.z).normalize(),!a.intersectAABB(r.min,r.max))return null;let s=this.intersectTriangles(a,n);if(!s)return null;let c=s.point.clone();c.w=1,c.applyMatrix4(e.matrixWorld),c.x/=c.w,c.y/=c.w,c.z/=c.w;let l=c.x-this.ray.origin.x,u=c.y-this.ray.origin.y,d=c.z-this.ray.origin.z;return[{entity:e,distance:Math.sqrt(l*l+u*u+d*d),point:c}]}intersectTriangles(e,t){let n=t.getAttribute(`position`);if(!n)return null;let r=n.array,i=t.getAttribute(`index`),a=i?i.array:null,o=Math.floor((a?a.length:t.vertCount)/3),s=null;for(let t=0;t<o;t++){let n=(a?a[t*3+0]:t*3+0)*3,i=(a?a[t*3+1]:t*3+1)*3,o=(a?a[t*3+2]:t*3+2)*3;this._v0.set(r[n],r[n+1],r[n+2]),this._v1.set(r[i],r[i+1],r[i+2]),this._v2.set(r[o],r[o+1],r[o+2]);let c=e.intersectTriangle(this._v0,this._v1,this._v2);c&&(!s||c.distance<s.distance)&&(s=c)}return s}}})))()}var cn;function ln(){return(ln=t((()=>{(function(e){let t=e.assign=(e,...t)=>{for(let n=0;n<t.length;n++)t[n]!=null&&Object.assign(e,t[n]);return e};e.merge=(...e)=>t({},...e)})(cn||={})})))()}function un(){return(un=t((()=>{ft(),st(),lt(),mt(),gt(),vt(),bt(),Tt(),Gt(),Kt(),Lt(),zt(),Vt(),qt(),Ut(),Yt(),Dt(),kt(),Zt(),jt(),Nt(),$t(),Ft(),Ct(),Xt(),nn(),an(),sn(),ln()})))()}var dn;function fn(){return(fn=t((()=>{O(),Tt(),dn=class extends wt{_resolution;_postProcesses;constructor(e){super(e),this._postProcesses=[],this._resolution=new E}get postProcesses(){return this._postProcesses}add(e){return this.postProcesses.push(e),e.resize(this._resolution),e}remove(e){let t=this._postProcesses.indexOf(e);t>-1&&this._postProcesses.splice(t,1)}resize(e){(this._resolution.x!=e.x||this._resolution.y!=e.y)&&(this._resolution.copy(e),this.resizePostProcesses())}resizePostProcesses(){this.postProcesses.forEach(e=>{e.resize(this._resolution)})}}})))()}function pn(){return(pn=t((()=>{})))()}function mn(){return(mn=t((()=>{})))()}var hn;function gn(){return(gn=t((()=>{Ct(),pn(),mn(),hn=class extends St{name;vert;frag;defines;uniforms;useLight;depthTest;depthWrite;cullFace;drawType;blending;renderOrder;visibilityFlag;programCache;constructor(e){super(),e||={},this.name=e.name||``,this.visibilityFlag={},this.setVisibility(e.phase||[`shadowMap`,`deferred`]),this.useLight=e.useLight===void 0||e.useLight,this.depthTest=e.depthTest===void 0||e.depthTest,this.cullFace=e.cullFace!==void 0&&e.cullFace,this.depthWrite=e.depthWrite===void 0||e.depthWrite,this.drawType=e.drawType||`TRIANGLES`,this.blending=e.blending||`NORMAL`,this.renderOrder=e.renderOrder??0,this.vert=e.vert||`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
}`,this.defines=e.defines||{},this.uniforms=e.uniforms||{},this.programCache={}}setVisibility(e){this.visibilityFlag={shadowMap:e.indexOf(`shadowMap`)>-1,deferred:e.indexOf(`deferred`)>-1,forward:e.indexOf(`forward`)>-1,ui:e.indexOf(`ui`)>-1,envMap:e.indexOf(`envMap`)>-1,postprocess:e.indexOf(`postprocess`)>-1}}requestUpdate(){this.programCache={}}}})))()}var _n;function vn(){return(vn=t((()=>{Ct(),_n=class extends St{name;enabled;_passes;constructor(e){super();let t=e||{};this.name=t.name||``,this.enabled=!0,this._passes=e&&e.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(e=>e.enabled)}get output(){for(let e=this._passes.length-1;e>=0;e--){let t=this._passes[e];if(!t.passThrough&&t.enabled)return t.renderTarget}return null}resize(e){if(this._passes)for(let t=0;t<this._passes.length;t++)this._passes[t].resize(e)}dispose(){this.emit(`dispose`)}}})))()}function yn(){return(yn=t((()=>{})))()}function bn(){return(bn=t((()=>{})))()}var j;function xn(){return(xn=t((()=>{O(),Ye(),gn(),yn(),bn(),j=class extends hn{enabled;renderTarget;backBufferOverride;clearColor;clearDepth;resolutionRatio;passThrough;resolution;resolutionInv;viewPort;_fixedResolution;constructor(e,t){super({...t,frag:t.frag||`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
}`}),this.enabled=!0,this._fixedResolution=t.fixedResotluion?t.fixedResotluion.clone():null,this.resolution=new E,this.resolutionInv=new E,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:`2fv`},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:`2fv`},this.renderTarget=t.renderTarget===void 0?e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR})]):t.renderTarget,this.clearColor=t.clearColor??null,this.clearDepth=t.clearDepth??null,this.depthTest=t.depthTest!==void 0&&t.depthTest,this.resolutionRatio=t.resolutionRatio||1,this.passThrough=t.passThrough??!1,this.viewPort=t.viewPort||null,this.backBufferOverride=t.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(e){this._fixedResolution=e,this.resize(e||new E)}onAfterRender(){}resize(e){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(e).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(e){this.renderTarget=e,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}})))()}var Sn;function Cn(){return(Cn=t((()=>{qe(),O(),vn(),xn(),Sn=class extends ze{material;_renderer;_resolution;_postProcess;_frameBuffer;constructor(e,t){let n=e.backend,r=n.gl;super(r),this._renderer=e,this._resolution=t.resolution||new E(1024,1024),this.setting({wrapS:r.REPEAT,wrapT:r.REPEAT,magFilter:r.LINEAR,minFilter:r.LINEAR}),this._frameBuffer=new Ve(r).setTexture([this]).setSize(this._resolution),this.material=new j(n,{...t,renderTarget:this._frameBuffer}),this._postProcess=new _n({passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}},Sn.__docgenInfo={description:``,methods:[],displayName:`TexProcedural`}})))()}var wn;function Tn(){return(Tn=t((()=>{wn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var En;function Dn(){return(Dn=t((()=>{at(),O(),M(),Ye(),Tn(),En=class extends tt{postprocess;resolution;renderTarget;pmremPasses;swapBuffers;timeUniforms;constructor(e,t){super();let n=t.resolution,r={uTimeEF:{value:0,type:`1f`}},i=e.createFrameBuffer().setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA16F,format:k.RGBA,magFilter:k.LINEAR,minFilter:k.LINEAR,wrapS:k.CLAMP_TO_EDGE,wrapT:k.CLAMP_TO_EDGE})]),a=[],o=[],s=[],c=0;for(let l=0;l<5;l++){let u=1/2**l,d=n.x*u,f=n.y*u*.5,p=new E(0,c,d,f);c+=f,s.push({rt1:e.createFrameBuffer().setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA16F,format:k.RGBA})]),rt2:e.createFrameBuffer().setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA16F,format:k.RGBA})])});let m=1/4*l,h=new j(e,{renderTarget:s[l].rt1,frag:wn,uniforms:cn.merge(r,{uRoughness:{value:m,type:`1f`},uEnvMap:{value:t.input,type:`1i`},uPMREMBackBuffer:{value:s[l].rt2.textures,type:`1i`},uRenderCount:{value:1,type:`1f`}}),defines:{NUM_SAMPLES:Math.floor(2**(l+1))}});h.resize(new E(d,f));let g=new j(e,{renderTarget:i,viewPort:p,passThrough:!0});g.resize(n),a.push(h,g),o.push(h)}this.postprocess=new _n({passes:a}),this.postprocess.passes[0].backBufferOverride=i.textures,this.resolution=n,this.renderTarget=i,this.pmremPasses=o,this.swapBuffers=s,this.timeUniforms=r}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let e=0;e<this.pmremPasses.length;e++){let t=this.pmremPasses[e],n=this.swapBuffers[e],r=n.rt1;n.rt1=n.rt2,n.rt2=r,t.setRendertarget(n.rt1),t.uniforms.uPMREMBackBuffer.value=n.rt2.textures}}resize(e){}}})))()}var On;function kn(){return(kn=t((()=>{On=class{backend;pool;constructor(e){this.backend=e,this.pool=new Map}get(e,t,n){let r=e+t,i=this.pool.get(r);if(i!==void 0&&i.program)return i;let a=this.backend.createProgram();return n&&(a.name=n),a.setShader(e,t),this.pool.set(r,a),a}}})))()}var An;function jn(){return(jn=t((()=>{An=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
uniform mat4 uProjectionMatrix;\r
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
		viewDirection( tex0.xyz, uCameraPosition, uViewMatrix, uProjectionMatrix ),\r
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
}`})))()}var Mn;function Nn(){return(Nn=t((()=>{Mn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

	// 始点は near 面上の点。並行投影ではカメラ位置から出ないので、画素ごとに near/far 面の点から求める
	vec4 np = cp * vec4( screen, -1.0, 1.0 );
	vec4 fp = cp * vec4( screen, 1.0, 1.0 );
	vec3 rayPos = np.xyz / np.w;
	vec3 rayDir = normalize( fp.xyz / fp.w - rayPos );
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

}`})))()}var Pn;function Fn(){return(Fn=t((()=>{Pn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var In;function Ln(){return(Ln=t((()=>{In=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var Rn;function zn(){return(zn=t((()=>{Rn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
uniform sampler2D uPosTexture;
uniform vec3 uCameraPosition;

uniform float uWeights[SSAOSAMPLE];

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

const float alpha = 32.0;
const float beta = 0.25;

// 深度はgBufferのワールド座標からカメラ距離として求める（gBuffer[0].w には emission が入っているので使えない）
float viewDepth( vec2 uv ) {

	return length( texture( uPosTexture, uv ).xyz - uCameraPosition );

}

float getWeight( vec2 uv, vec3 normalBasis, float depthBasis ) {

	vec3 normalOffset = texture( uNormalTexture, uv ).xyz;
	float depthOffset = viewDepth( uv );
	float bilateralWeight = pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, alpha ) * pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), beta );

	return bilateralWeight;

}

void main( void ) {

	float occlusion = 0.0;

	vec3 normalBasis = texture( uNormalTexture, vUv ).xyz;
	float depthBasis = viewDepth( vUv );

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

}`})))()}var Bn,Vn;function Hn(){return(Hn=t((()=>{at(),O(),M(),Ye(),jn(),Nn(),Fn(),Ln(),zn(),Bn=e=>{let t=[];for(let n=0;n<e;n++){let r=new E;r.x=Math.random()*2-1,r.y=Math.random()*2-1,r.z=n/e*.95+.05,r.normalize(),r.multiply(n/e*.95+.05),t.push(...r.getElm(`vec3`))}return t},Vn=class extends tt{postprocess;normalSelector_;lightShaft;rtLightShaft1;rtLightShaft2;ssao;rtSSAO1;rtSSAO2;ssaoBlur;ssaoBlurV;shading;constructor(e){super();let t=e.backend,n=new j(t,{name:`normalSelector`,frag:Pn,renderTarget:null,uniforms:cn.merge({uNormalTexture:{value:null,type:`1i`},uPosTexture:{value:null,type:`1i`},uSelectorTexture:{value:null,type:`1i`}}),passThrough:!0}),r=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR})]),i=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR})]),a=new j(t,{name:`lightShaft`,frag:Mn,renderTarget:r,uniforms:cn.merge({uLightShaftBackBuffer:{value:i.textures[0],type:`1i`},uDepthTexture:{value:null,type:`1i`}}),resolutionRatio:.5,passThrough:!0}),o=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR})]),s=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR})]),c=new j(t,{name:`ssao`,frag:In,renderTarget:tn(`ssao`,o),uniforms:cn.merge({uSSAOBackBuffer:{value:s.textures[0],type:`1i`},uSSAOKernel:{value:Bn(16),type:`3fv`}}),resolutionRatio:.5,passThrough:!0}),l=cn.merge({uSSAOTexture:{value:s.textures[0],type:`1i`},uPosTexture:{value:null,type:`1i`},uNormalTexture:{value:null,type:`1i`},uWeights:{type:`1fv`,value:Ae.gaussWeights(8)}}),u=new j(t,{name:`ssaoBlur/h`,frag:tn(`ssaoBlur`,Rn),uniforms:l,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:8}}),d=new j(t,{name:`ssaoBlur/v`,frag:tn(`ssaoBlur`,Rn),uniforms:cn.merge(l,{uSSAOTexture:{value:u.renderTarget.textures[0],type:`1i`}}),defines:{SSAOSAMPLE:8,IS_VIRT:``},resolutionRatio:1,passThrough:!0}),f=new j(t,{name:`deferredShading`,frag:tn(`deferredShading`,An),uniforms:cn.merge({uLightShaftTexture:{value:null,type:`1i`},uSSAOTexture:{value:d.renderTarget.textures[0],type:`1i`},uSSAOResolutionInv:{value:c.resolutionInv,type:`2fv`},uEnvMap:{value:e.envMap,type:`1i`}})});this.postprocess=new _n({passes:[n,a,c,u,d,f]}),this.shading=f,this.lightShaft=a,this.ssao=c,this.rtSSAO1=o,this.rtSSAO2=s,this.ssaoBlur=u,this.ssaoBlurV=d,this.rtLightShaft1=r,this.rtLightShaft2=i,this.normalSelector_=n;let p=e.renderTarget;for(let e=0;e<p.gBuffer.textures.length;e++){let t=p.gBuffer.textures[e];e===1&&(t=p.normalBuffer.textures[0]),f.uniforms[`sampler`+e]=c.uniforms[`sampler`+e]={type:`1i`,value:t}}a.uniforms.uDepthTexture.value=p.gBuffer.depthTexture,f.renderTarget=p.shadingBuffer,n.renderTarget=p.normalBuffer,n.uniforms.uNormalTexture.value=p.gBuffer.textures[1],n.uniforms.uPosTexture.value=p.gBuffer.textures[0],n.uniforms.uSelectorTexture.value=p.gBuffer.textures[3],l.uPosTexture.value=p.gBuffer.textures[0],l.uNormalTexture.value=p.normalBuffer.textures[0]}update(){let e=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=e,this.lightShaft.setRendertarget(this.rtLightShaft1),this.shading.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0],e=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=e,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0]}setPassEnabled(e){e.ssao!==void 0&&(this.ssao.enabled=e.ssao,this.ssaoBlur.enabled=e.ssao,this.ssaoBlurV.enabled=e.ssao,e.ssao||(this.rtSSAO1.clear(),this.rtSSAO2.clear(),this.ssaoBlur.renderTarget&&this.ssaoBlur.renderTarget.clear(),this.ssaoBlurV.renderTarget&&this.ssaoBlurV.renderTarget.clear())),e.lightShaft!==void 0&&(this.lightShaft.enabled=e.lightShaft,e.lightShaft||(this.rtLightShaft1.clear(),this.rtLightShaft2.clear()))}resize(e){this.postprocess.resize(e)}dispose(){this.postprocess.dispose(),this.rtLightShaft1.dispose(),this.rtLightShaft2.dispose(),this.rtSSAO1.dispose(),this.rtSSAO2.dispose()}}})))()}var Un;function Wn(){return(Wn=t((()=>{Un=`uniform sampler2D uShadingTexture;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uShadingTexture, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`})))()}var Gn;function Kn(){return(Kn=t((()=>{Gn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var qn;function Jn(){return(Jn=t((()=>{qn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
uniform float uToneMap;\r
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
    col = mix( col, ACESFitted( col ), uToneMap );\r
\r
	// WebGL には sRGB の drawingBuffer が無いので、表示用の sRGB へはここで変換する\r
	outColor = vec4( linearToSrgb( col ), 1.0 );\r
\r
}`})))()}var Yn;function Xn(){return(Xn=t((()=>{Yn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

uniform sampler2D uBokeTex;
uniform vec2 uPPPixelSize;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// https://github.com/keijiro/KinoBokeh/blob/master/Assets/Kino/Bokeh/Shader/Composition.cginc

// Fragment shader: Additional blur
void main( void ) {

	// 9-tap tent filter
	vec4 duv = uPPPixelSize.xyxy * vec4(1, 1, -1, 0);
	vec4 acc;

	acc  = texture(uBokeTex, vUv - duv.xy);
	acc += texture(uBokeTex, vUv - duv.wy) * 2.0;
	acc += texture(uBokeTex, vUv - duv.zy);

	acc += texture(uBokeTex, vUv + duv.zw) * 2.0;
	acc += texture(uBokeTex, vUv         ) * 4.0;
	acc += texture(uBokeTex, vUv + duv.xw) * 2.0;

	acc += texture(uBokeTex, vUv + duv.zy);
	acc += texture(uBokeTex, vUv + duv.wy) * 2.0;
	acc += texture(uBokeTex, vUv + duv.xy);

	outColor = acc / 16.0;

}
`})))()}var Zn;function Qn(){return(Qn=t((()=>{Zn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
}`})))()}var $n;function er(){return(er=t((()=>{$n=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
	vec4 depths = vec4(d0, d1, d2, d3);\r
\r
	// Calculate the radiuses of CoCs at these sample points.\r
	vec4 cocs = (depths - _Distance) * _LensCoeff / depths;\r
	cocs = clamp(cocs, -_MaxCoC, _MaxCoC);\r
\r
	// Premultiply CoC to reduce background bleeding.\r
	vec4 weights = clamp(abs(cocs) * _RcpMaxCoC, 0.0, 1.0 );\r
\r
	// Apply luma weights to reduce flickering.\r
	// Inspired by goo.gl/j1fhLe goo.gl/mfuZ4h\r
	weights.x *= 1.0 / (max3(c0) + 1.0);\r
	weights.y *= 1.0 / (max3(c1) + 1.0);\r
	weights.z *= 1.0 / (max3(c2) + 1.0);\r
	weights.w *= 1.0 / (max3(c3) + 1.0);\r
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
	outColor = vec4(avg, coc);\r
\r
}\r
`})))()}var tr;function nr(){return(nr=t((()=>{tr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

// Fragment shader: Upsampling and composition
void main( void ) {

	vec4 cs = texture(uBackBuffer0, vUv);
	vec4 cb = texture(uBokeTex, vUv);

	outColor = vec4(cs.rgb * cb.a + cb.rgb, cs.a);

}
`})))()}var rr;function ir(){return(ir=t((()=>{rr=`uniform sampler2D uBackBuffer0;\r
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
}`})))()}var ar;function or(){return(or=t((()=>{ar=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

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
  
}`})))()}var sr;function cr(){return(cr=t((()=>{sr=`in vec2 vUv;

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
	vec4 depthRayPos = uProjectionMatrixInverse * vec4( uv * 2.0 - 1.0, texture( uDepthTexture, uv ).x * 2.0 - 1.0, 1.0 );
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

}`})))()}var lr;function ur(){return(ur=t((()=>{lr=`in vec2 vUv;
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

}`})))()}var dr;function fr(){return(fr=t((()=>{dr=`in vec2 vUv;
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

}`})))()}var pr;function mr(){return(mr=t((()=>{pr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
uniform mat4 uViewMatrix;\r
uniform mat4 uProjectionMatrix;\r
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
	vec3 dir = viewDirection( gCol0.xyz, uCameraPosition, uViewMatrix, uProjectionMatrix );\r
	float f = fresnel( clamp( dot( dir, gCol1.xyz ), 0.0, 1.0 ) );\r
\r
	vec4 ssrCol = texture( uSSRTexture, vUv );\r
\r
	outColor.xyz += f * ssrCol.xyz * 0.15;\r
\r
}`})))()}var hr;function gr(){return(gr=t((()=>{hr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

	vec3 rayDir = reflect( - viewDirection( rayPos, uCameraPosition, uViewMatrix, uProjectionMatrix ), texture( uGbufferNormal, vUv ).xyz );

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

}`})))()}var _r,vr,yr,br,xr,Sr;function Cr(){return(Cr=t((()=>{O(),M(),Ye(),Wn(),Kn(),Jn(),Xn(),Qn(),er(),nr(),ir(),or(),cr(),ur(),fr(),mr(),gr(),_r=4,vr=8,yr=14,br=.05,xr=e=>e.createFrameBuffer().setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA16F,format:k.RGBA,magFilter:k.LINEAR,minFilter:k.LINEAR})]),Sr=class{dofCoc;dofBokeh;dofBlur;dofComposite;rtSSR1;rtSSR2;postprocess;_ssr;_ssComposite;_dofParams;_motionBlur;_motionBlurTile;_motionBlurNeighbor;_colorCollection;_bloomBright;_bloomPasses;constructor(e,t){let n=new j(e,{name:`collection`,frag:qn,uniforms:{uToneMap:{value:1,type:`1f`}}}),r=xr(e),i=xr(e),a=new j(e,{name:`ssr`,frag:tn(`ssr`,hr),renderTarget:r,uniforms:cn.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSceneTex:{value:null,type:`1i`},uSSRBackBuffer:{value:i.textures[0],type:`1i`}}),resolutionRatio:.5,passThrough:!0}),o=new j(e,{name:`ssComposite`,frag:tn(`ssComposite`,pr),uniforms:cn.merge({uGbufferPos:{value:null,type:`1i`},uGbufferNormal:{value:null,type:`1i`},uSSRTexture:{value:i.textures[0],type:`1i`}}),renderTarget:xr(e)}),s=new E(10,.05,20,.05),c=new j(e,{name:`dof/coc`,frag:$n,uniforms:cn.merge({uGbufferPos:{value:null,type:`1i`},uParams:{value:s,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR,internalFormat:k.RGBA16F,type:k.HALF_FLOAT,format:k.RGBA})]),passThrough:!0,resolutionRatio:.5}),l=new j(e,{name:`dof/bokeh`,frag:Zn,uniforms:cn.merge({uCocTex:{value:c.renderTarget.textures[0],type:`1i`},uParams:{value:s,type:`4f`}}),renderTarget:xr(e),passThrough:!0,resolutionRatio:.5}),u=new j(e,{name:`dof/blur`,frag:Yn,uniforms:cn.merge({uBokeTex:{value:l.renderTarget.textures[0],type:`1i`}}),renderTarget:xr(e),passThrough:!0,resolutionRatio:.5}),d=new j(e,{name:`dof/composite`,frag:tr,uniforms:cn.merge({uBokeTex:{value:u.renderTarget.textures[0],type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR,internalFormat:k.RGBA16F,type:k.HALF_FLOAT,format:k.RGBA})])}),f=new j(e,{name:`motionBlurTile`,frag:dr,uniforms:cn.merge({uVelTex:{value:null,type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA32F,format:k.RGBA})]),defines:{TILE:16},resolutionRatio:1/16,passThrough:!0}),p=new j(e,{name:`motionBlurNeighbor`,frag:lr,uniforms:cn.merge({uVelTex:{value:f.renderTarget.textures[0],type:`1i`}}),defines:{TILE:16},renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA32F,format:k.RGBA})]),resolutionRatio:1/16,passThrough:!0}),m=new j(e,{name:`motionBlur`,frag:sr,uniforms:cn.merge({uVelNeighborTex:{value:p.renderTarget.textures[0],type:`1i`},uVelTex:{value:null,type:`1i`},uDepthTexture:{value:null,type:`1i`},uPower:{value:1,type:`1f`}}),defines:{TILE:16},renderTarget:xr(e)}),h=new j(e,{name:`fxaa`,frag:rr}),g=new j(e,{name:`bloom/bright`,frag:Un,uniforms:{uShadingTexture:{value:t.shadingBuffer.textures[0],type:`1i`},uThreshold:{value:1,type:`1f`},uBrightness:{value:1,type:`1f`}},renderTarget:xr(e),resolutionRatio:.5,passThrough:!0}),_=[g],v=[],y=g.renderTarget.textures[0],b=2;for(let t=0;t<_r;t++){let n=xr(e),r=xr(e),i={name:`bloom/blur/`+t+`/v`,renderTarget:n,frag:ar,uniforms:{uBackBlurTex:{value:y,type:`1i`},uIsVertical:{type:`1i`,value:!0},uWeights:{type:`1fv`,value:Ae.gaussWeights(vr)},uBlurRange:{value:2,type:`1f`}},defines:{GAUSS_WEIGHTS:vr.toString(),USE_BACKBLURTEX:``},passThrough:!0,resolutionRatio:1/b};_.push(new j(e,i)),_.push(new j(e,{...i,name:`bloom/blur/`+t+`/h`,renderTarget:r,uniforms:{...i.uniforms,uBackBlurTex:{value:n.textures[0],type:`1i`},uIsVertical:{type:`1i`,value:!1}}})),v.push(r.textures[0]),y=r.textures[0],b*=2}_.push(new j(e,{name:`bloom/composite`,frag:Gn,uniforms:{uBloomTexture:{value:v,type:`1iv`}},renderTarget:xr(e)})),this.postprocess=new _n({passes:[a,o,c,l,u,d,f,p,m,..._,n,h]}),this._ssr=a,this._ssComposite=o,this.dofCoc=c,this.dofBokeh=l,this.dofBlur=u,this.dofComposite=d,this._motionBlur=m,this._motionBlurTile=f,this._motionBlurNeighbor=p,this._colorCollection=n,this._bloomBright=g,this._bloomPasses=_,this._dofParams=s,this.rtSSR1=r,this.rtSSR2=i,a.uniforms.uGbufferPos.value=t.gBuffer.textures[0],a.uniforms.uGbufferNormal.value=t.normalBuffer.textures[0],a.uniforms.uSceneTex.value=t.forwardBuffer.textures[0],o.uniforms.uGbufferPos.value=t.gBuffer.textures[0],o.uniforms.uGbufferNormal.value=t.gBuffer.textures[1],c.uniforms.uGbufferPos.value=t.gBuffer.textures[0],f.uniforms.uVelTex.value=t.gBuffer.textures[4],m.uniforms.uVelTex.value=t.gBuffer.textures[4],m.uniforms.uDepthTexture.value=t.gBuffer.depthTexture}update(e){let t=e.dofParams.kFilmHeight,n=.5*t/Math.tan(.5*(e.fov/180*Math.PI)),r=Math.max(e.dofParams.focusDistance,n),i=Math.min(br,yr/this.dofComposite.renderTarget.size.y),a=1/i,o=n*n/(e.dofParams.fNumber*(r-n)*t*2);this._dofParams.set(r,i,a,o);let s=this.rtSSR1;this.rtSSR1=this.rtSSR2,this.rtSSR2=s,this._ssr.setRendertarget(this.rtSSR1),this._ssComposite.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this._ssr.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}resize(e){this.postprocess.resize(e)}setPassEnabled(e){if(e.toneMap!==void 0&&(this._colorCollection.uniforms.uToneMap.value=+!!e.toneMap),e.bloom!==void 0)for(let t of this._bloomPasses)t.enabled=e.bloom;e.motionBlur!==void 0&&(this._motionBlurTile.enabled=e.motionBlur,this._motionBlurNeighbor.enabled=e.motionBlur,this._motionBlur.enabled=e.motionBlur,e.motionBlur||(this._motionBlurTile.renderTarget&&this._motionBlurTile.renderTarget.clear(),this._motionBlurNeighbor.renderTarget&&this._motionBlurNeighbor.renderTarget.clear())),e.ssr!==void 0&&(this._ssr.enabled=e.ssr,this._ssComposite.enabled=e.ssr,e.ssr||(this.rtSSR1.clear(),this.rtSSR2.clear())),e.dof!==void 0&&(this.dofCoc.enabled=e.dof,this.dofBokeh.enabled=e.dof,this.dofBlur.enabled=e.dof,this.dofComposite.enabled=e.dof,e.dof||(this.dofBokeh.renderTarget&&this.dofBokeh.renderTarget.clear(),this.dofBlur.renderTarget&&this.dofBlur.renderTarget.clear(),this.dofComposite.renderTarget&&this.dofComposite.renderTarget.clear()))}setMotionBlurPower(e){this._motionBlur.uniforms.uPower.value=e}setBloomParams(e,t){this._bloomBright.uniforms.uThreshold.value=e,this._bloomBright.uniforms.uBrightness.value=t}dispose(){this.postprocess.dispose(),this.rtSSR1.dispose(),this.rtSSR2.dispose()}}})))()}var wr,Tr;function Er(){return(Er=t((()=>{O(),Ye(),Hn(),Cr(),wr=e=>{let t=e.createFrameBuffer();t.setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA32F,format:k.RGBA,magFilter:k.NEAREST,minFilter:k.NEAREST}),e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA32F,format:k.RGBA}),e.createTexture().setting({internalFormat:k.SRGB8_ALPHA8}),e.createTexture(),e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA32F,format:k.RGBA})]);let n=e.createFrameBuffer({disableDepthBuffer:!0});n.setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA16F,format:k.RGBA}),e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA16F,format:k.RGBA})]);let r=e.createFrameBuffer({disableDepthBuffer:!0});r.setDepthTexture(t.depthTexture),r.setTexture([n.textures[0],t.textures[0],t.textures[4]]);let i=e.createFrameBuffer({disableDepthBuffer:!0});i.setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA16F,format:k.RGBA,magFilter:k.LINEAR,minFilter:k.LINEAR})]);let a=e.createFrameBuffer({disableDepthBuffer:!0});a.setDepthTexture(t.depthTexture),a.setTexture([e.createTexture()]);let o=e.createFrameBuffer();return o.setTexture([e.createTexture().setting({type:k.FLOAT,internalFormat:k.RGBA32F,format:k.RGBA,magFilter:k.NEAREST,minFilter:k.NEAREST})]),{gBuffer:t,shadingBuffer:n,forwardBuffer:r,refractionBuffer:i,uiBuffer:a,normalBuffer:o}},Tr=class{camera;size;resolution;offscreen;renderTarget;deferredRenderer;pipelinePostProcess;_pipelineOverride;_sceneConfig;_onDispose;constructor(e){this.camera=null,this.size=null,this.resolution=new E,this.offscreen=e.offscreen,this._pipelineOverride=null,this._sceneConfig=e.sceneConfig,this._onDispose=e.onDispose,this.renderTarget=wr(e.backend),this.deferredRenderer=new Vn({backend:e.backend,envMap:e.envMap,envMapCube:e.envMapCube,renderTarget:this.renderTarget}),this.pipelinePostProcess=new Sr(e.backend,this.renderTarget),this.fit(e.resolution),this.applyPipelineConfig()}get pipelineOverride(){return this._pipelineOverride}set pipelineOverride(e){this._pipelineOverride=e,this.applyPipelineConfig()}applyPipelineConfig(){let e={...this._sceneConfig,...this._pipelineOverride};this.deferredRenderer.setPassEnabled({ssao:e.ssao,lightShaft:e.lightShaft}),this.pipelinePostProcess.setPassEnabled({toneMap:e.toneMap,motionBlur:e.motionBlur,ssr:e.ssr,dof:e.dof,bloom:e.bloom}),this.pipelinePostProcess.setMotionBlurPower(e.motionBlurPower??1),this.pipelinePostProcess.setBloomParams(e.bloomThreshold??1,e.bloomBrightness??1)}fit(e){e.x<=0||e.y<=0||(this.resolution.x!==e.x||this.resolution.y!==e.y)&&this.resize(e)}resize(e){this.resolution.copy(e);let t=this.renderTarget;t.gBuffer.setSize(e),t.shadingBuffer.setSize(e),t.forwardBuffer.setSize(e),t.refractionBuffer.setSize(e),t.uiBuffer.setSize(e),t.normalBuffer.setSize(e),this.deferredRenderer.resize(e),this.pipelinePostProcess.resize(e)}dispose(){this._onDispose(this);let e=this.renderTarget;e.forwardBuffer.dispose();let t=[e.gBuffer,e.shadingBuffer,e.refractionBuffer,e.uiBuffer,e.normalBuffer];for(let e=0;e<t.length;e++){let n=t[e];for(let e=0;e<n.textures.length;e++)n.textures[e].dispose();n.dispose()}e.gBuffer.depthTexture&&e.gBuffer.depthTexture.dispose(),this.deferredRenderer.dispose(),this.pipelinePostProcess.dispose()}}})))()}var Dr;function Or(){return(Or=t((()=>{Dr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
`})))()}var kr;function Ar(){return(Ar=t((()=>{O(),Ut(),Ft(),gn(),Or(),kr=class{entity;mesh;material;color;groundColor;_intensity;constructor(e){this.color=new E(1,1,1),this.groundColor=new E(.3,.3,.3),this._intensity=1,this.material=new hn({phase:[`deferred`,`envMap`],frag:Dr,cullFace:!1,uniforms:{uSkyColor:{value:this.color,type:`3fv`},uGroundColor:{value:this.groundColor,type:`3fv`},uSkyIntensity:{value:this._intensity,type:`1f`}}}),this.entity=e.createEntity({name:`sky`}),this.mesh=this.entity.addComponent(A),this.mesh.geometry=new Pt({radius:500,widthSegments:32,heightSegments:32}),this.mesh.material=this.material}get intensity(){return this._intensity}set intensity(e){this._intensity=e,this.material.uniforms.uSkyIntensity.value=e}}})))()}var jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr;function Gr(){return(Gr=t((()=>{qe(),O(),Lt(),Vt(),Ut(),Nt(),Ct(),Ye(),et(),fn(),gn(),Cn(),Dn(),kn(),Er(),Ar(),jr=()=>({motionBlur:!0,motionBlurPower:1,ssr:!0,ssao:!0,lightShaft:!0,dof:!0,toneMap:!0,bloom:!0,bloomThreshold:1,bloomBrightness:1}),Mr=new hn,Nr=e=>e.material||Mr,Pr=0,Fr=new E(1,1,1,1),Ir=new E(0,0,0,1),Lr=[],Rr=[],zr=e=>Lr[e]||(Lr[e]={direction:`directionalLight[${e}].direction`,color:`directionalLight[${e}].color`,camNear:`uDirectionalLightCamera[${e}].near`,camFar:`uDirectionalLightCamera[${e}].far`,camViewMatrix:`uDirectionalLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uDirectionalLightCamera[${e}].projectionMatrix`,camResolution:`uDirectionalLightCamera[${e}].resolution`,shadowMap:`directionalLightShadowMap[${e}]`}),Br=e=>Rr[e]||(Rr[e]={position:`uSpotLight[${e}].position`,direction:`uSpotLight[${e}].direction`,color:`uSpotLight[${e}].color`,angle:`uSpotLight[${e}].angle`,blend:`uSpotLight[${e}].blend`,distance:`uSpotLight[${e}].distance`,decay:`uSpotLight[${e}].decay`,camNear:`uSpotLightCamera[${e}].near`,camFar:`uSpotLightCamera[${e}].far`,camViewMatrix:`uSpotLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uSpotLightCamera[${e}].projectionMatrix`,camResolution:`uSpotLightCamera[${e}].resolution`,shadowMap:`spotLightShadowMap[${e}]`}),Vr=class extends St{backend;canvas;resolution;globalUniforms;_views;_pipelineConfig;programManager;_geometryBuffers;_lights;_lightsUpdated;_lightInfoCache;_envMapCameras;_envMapRenderTarget;_envMapCube;_pmremRender;_stack;_sceneCamera;sky;_engine;_quad;_isCorrentCompiles;compileDrawParams;_tmpNormalMatrix;_tmpModelViewMatrix;_tmpViewMatrixInverseMatrix;_tmpLightDirection;_tmpModelMatrixInverse;_tmpProjectionMatrixInverse;_tmpResolution;_tmpResolutionUniform;_tmpUniformOverride;_tmpDrawParam;constructor(e,t){super(),this.backend=e,this.canvas=e.canvas,this.globalUniforms={},this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new On(e),this._geometryBuffers=new Map,this.resolution=new E,this._views=[],this._stack=this._createRenderStack(),this._sceneCamera=null,this._lights={directional:[],spot:[]},this._lightsUpdated=!1,this._lightInfoCache=new Map;let n=e.createCubeTexture();this._envMapCube=n,this._envMapRenderTarget=e.createCubeFrameBuffer().setTexture([n]),this._envMapRenderTarget.setSize(256,256);let r=new E(0,0,0),i=new E(0,-1,0),a=[new D().lookAt(r,new E(1,0,0),i),new D().lookAt(r,new E(0,1,0),new E(0,0,1)),new D().lookAt(r,new E(0,0,1),i),new D().lookAt(r,new E(-1,0,0),i),new D().lookAt(r,new E(0,-1,0),new E(0,0,-1)),new D().lookAt(r,new E(0,0,-1),i)];this._envMapCameras=[];for(let e=0;e<6;e++){let n=t.createEntity({name:`envMapCamera/`+e}),r=n.addComponent(It);r.fov=90,r.near=.1,r.far=1e3,r.aspect=1,n.applyMatrix(a[e].clone()),r.updateViewMatrix(),r.updateProjectionMatrix(),this._envMapCameras.push({entity:n,camera:r})}this._pmremRender=new En(e,{input:[n],resolution:new E(768,1024)}),this._quad=new Mt({width:2,height:2}),this._tmpLightDirection=new E,this._tmpModelMatrixInverse=new D,this._tmpViewMatrixInverseMatrix=new D,this._tmpProjectionMatrixInverse=new D,this._tmpModelViewMatrix=new D,this._tmpNormalMatrix=new D,this._tmpResolution=new E,this._tmpResolutionUniform={value:this._tmpResolution,type:`2fv`},this._tmpUniformOverride={},this._tmpDrawParam={},this._engine=t,this.sky=new kr(t),this._pipelineConfig=jr();let o=this.fieldDir(`sky`);o.field(`skyColor`,()=>this.sky.color.getElm(`vec3`),e=>{this.sky.color.set(e[0],e[1],e[2])},{format:{type:`color`}}),o.field(`groundColor`,()=>this.sky.groundColor.getElm(`vec3`),e=>{this.sky.groundColor.set(e[0],e[1],e[2])},{format:{type:`color`}}),o.field(`intensity`,()=>this.sky.intensity,e=>{this.sky.intensity=e},{step:.1}),o.field(`reset`,()=>()=>{this._resetSky(),this.noticeField(`sky/skyColor`),this.noticeField(`sky/groundColor`),this.noticeField(`sky/intensity`)},void 0,{label:`Reset to Default`});let s=this.fieldDir(`pipeline`);[`motionBlur`,`ssr`,`ssao`,`dof`,`lightShaft`,`toneMap`,`bloom`].forEach(e=>{let t=s.dir(e);t.field(`enabled`,()=>this._pipelineConfig[e]??!0,t=>{this.applyPipelineConfig({[e]:t})}),e===`motionBlur`&&t.field(`power`,()=>this._pipelineConfig.motionBlurPower??1,e=>{this.applyPipelineConfig({motionBlurPower:e})},{step:.1}),e===`bloom`&&(t.field(`threshold`,()=>this._pipelineConfig.bloomThreshold??1,e=>{this.applyPipelineConfig({bloomThreshold:e})},{step:.1}),t.field(`brightness`,()=>this._pipelineConfig.bloomBrightness??1,e=>{this.applyPipelineConfig({bloomBrightness:e})},{step:.1}))})}createView(e){let t=new Tr({backend:this.backend,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:this._envMapCube,sceneConfig:this._pipelineConfig,resolution:this.resolution,offscreen:e?.offscreen??!1,onDispose:e=>{this._views.splice(this._views.indexOf(e),1)}});return this._views.push(t),t}_createRenderStack(){return{light:[],deferred:[],forward:[],ui:[],shadowMap:[],envMap:[]}}_collectRenderStack(e,t,n){let r=t&&e.visible,i=e.getComponent(A);if(i&&r){let t=Nr(i);t.visibilityFlag.deferred&&n.deferred.push(e),t.visibilityFlag.shadowMap&&n.shadowMap.push(e),t.visibilityFlag.forward&&n.forward.push(e),t.visibilityFlag.ui&&n.ui.push(e),t.visibilityFlag.envMap&&n.envMap.push(e)}let a=e.getComponent(Bt);if(a&&a.enabled&&r&&n.light.push(e),!this._sceneCamera){let t=e.getComponentsByTag(`camera`);for(let n=0;n<t.length;n++)t[n].displayOut&&(this._sceneCamera=e)}for(let t=0;t<e.children.length;t++)this._collectRenderStack(e.children[t],r,n)}prepareScene(e,t){if(this.resolution.x===0||this.resolution.y===0)return;let n=this._stack=this._createRenderStack();this._sceneCamera=null,this._collectRenderStack(e,!0,n),this._collectRenderStack(this.sky.entity,!0,n);let r=[],i={},a=Object.keys(this._lights);for(let e=0;e<a.length;e++){let t=a[e];i[t]=this._lights[t].length,this._lights[t]=[]}for(let e=0;e<n.light.length;e++){let t=n.light[e],i=t.getComponent(Bt);if(i){let e=this.collectLight(t,i);i.castShadow&&e.renderTarget&&i.lightType!==`directional`&&r.push(e)}}this._lights.directional.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lights.spot.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lightsUpdated=!1;for(let e=0;e<a.length;e++){let t=a[e];if(i[t]!=this._lights[t].length){this._lightsUpdated=!0;break}}for(let e=0;e<r.length;e++){let t=r[e];this.renderCamera(`shadowMap`,t.component.entity,n.shadowMap,t.renderTarget,this.resolution)}for(let e=0;e<this._envMapCameras.length;e++){let{entity:t}=this._envMapCameras[e];this._envMapRenderTarget.face(e),this.renderCamera(`envMap`,t,n.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap()}render(e,t){let n=e;n.fit(n.size||this.resolution);let r=n.resolution;if(r.x===0||r.y===0)return;let i=n.camera||this._sceneCamera;if(!i)return;let a=i.getComponentsByTag(`camera`)[0];if(!a)return;let o=this._stack,s=n.renderTarget;this.backend.setBlendEnabled(!1);for(let e=0;e<this._lights.directional.length;e++){let t=this._lights.directional[e];!t.component.castShadow||!t.renderTarget||(t.component.fitShadowToCamera(a,t.component.shadowMapSize.x),this.renderCamera(`shadowMap`,t.component.entity,o.shadowMap,t.renderTarget,this.resolution))}this.renderCamera(`deferred`,i,o.deferred,s.gBuffer,r),this.renderPostProcess(n.deferredRenderer.postprocess,void 0,r,{cameraOverride:{viewMatrix:a.viewMatrix,viewMatrixPrev:a.viewMatrixPrev,projectionMatrix:a.projectionMatrix,projectionMatrixPrev:a.projectionMatrixPrev,cameraMatrixWorld:i.matrixWorld}}),n.deferredRenderer.update(),this._copyToRefraction(s);let c=o.forward.slice().sort((e,t)=>Nr(e.getComponent(A)).renderOrder-Nr(t.getComponent(A)).renderOrder),l=[],u=null;for(let e of c){let t=Nr(e.getComponent(A)).renderOrder;(u===null||t!==u)&&(l.push([]),u=t),l[l.length-1].push(e)}this.backend.setBlendEnabled(!0);for(let e=0;e<l.length;e++)e>0&&this._copyToRefraction(s),this.renderCamera(`forward`,i,l[e],s.forwardBuffer,r,{uniformOverride:{uDeferredTexture:{value:s.refractionBuffer.textures[0],type:`1i`},uDeferredResolution:{value:s.shadingBuffer.size,type:`2fv`},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:`1i`},uGbufferNormal:{value:s.normalBuffer.textures[0],type:`1i`},uGbufferAlbedo:{value:s.gBuffer.textures[2],type:`1i`},uGbufferMaterial:{value:s.gBuffer.textures[3],type:`1i`}},disableClear:!0});this.backend.setBlendEnabled(!1),this.renderPostProcess(n.pipelinePostProcess.postprocess,s.shadingBuffer,r,{cameraOverride:{viewMatrix:a.viewMatrix,projectionMatrix:a.projectionMatrix,cameraMatrixWorld:i.matrixWorld,cameraNear:a.near,cameraFar:a.far}}),n.pipelinePostProcess.update(a);let d=n.pipelinePostProcess.postprocess.output?n.pipelinePostProcess.postprocess.output:void 0,f=(this._sceneCamera||i).getComponent(dn);if(f){f.resize(r);for(let e=0;e<f.postProcesses.length;e++){let t=f.postProcesses[e];t.enabled&&t.hasOutput&&(this.renderPostProcess(t,d,r,{cameraOverride:{viewMatrix:a.viewMatrix,projectionMatrix:a.projectionMatrix,cameraMatrixWorld:i.matrixWorld,cameraNear:a.near,cameraFar:a.far}}),d=t.output||void 0)}}let p=n.offscreen?s.uiBuffer:null;if(d){let e=d.size;this.backend.blit(d,p,e.x,e.y)}this.backend.setBlendEnabled(!0),this.renderCamera(`forward`,i,o.ui,p,r,{uniformOverride:{uDeferredTexture:{value:s.refractionBuffer.textures[0],type:`1i`}},disableClear:!0}),this.backend.setBlendEnabled(!1)}renderCamera(e,t,n,r,i,a){let o=t.getComponentsByTag(`camera`)[0]||t.getComponent(Bt);a||={};let s=this._tmpDrawParam;s.viewMatrix=o.viewMatrix,s.viewMatrixPrev=o.viewMatrixPrev,s.projectionMatrix=o.projectionMatrix,s.projectionMatrixPrev=o.projectionMatrixPrev,s.cameraMatrixWorld=t.matrixWorld,s.cameraNear=o.near,s.cameraFar=o.far,s.renderTarget=r,s.uniformOverride=a.uniformOverride||this._tmpUniformOverride,a.cameraOverride&&Object.assign(s,a.cameraOverride),this.backend.bindRenderTarget(r,o.viewPort,i),r?this._tmpResolution.set(r.size.x,r.size.y):this._tmpResolution.set(i.x,i.y),s.uniformOverride.uResolution=this._tmpResolutionUniform,a.disableClear||this.backend.clear(e==`shadowMap`?Fr:Ir,1);for(let t=0;t<n.length;t++){let r=n[t],i=r.getComponentsByTag(`materialOverride`)[0],a=r.getComponent(A),c=i&&i.material||Nr(a),l=a.geometry;s.modelMatrixWorld=r.matrixWorld,s.modelMatrixWorldPrev=r.matrixWorldPrev,s.label=`cam[${o.uuid}]/${r.name||c.name||`-`}`,this.draw(r.uuid,e,l,c,s)}}_copyToRefraction(e){let t=e.shadingBuffer.size;this.backend.blit(e.shadingBuffer,e.refractionBuffer,t.x,t.y,!0,!0)}collectLight(e,t){let n=t.lightType,r=this._lightInfoCache.get(t);return r||(r={position:new E,direction:new E,color:new E,renderTarget:null,component:t},this._lightInfoCache.set(t,r)),r.position.set(0,0,0,1).applyMatrix4(e.matrixWorld),r.direction.set(0,1,0,0).applyMatrix4(e.matrixWorld).normalize(),r.color.set(t.color.x,t.color.y,t.color.z).multiply(t.intensity*Math.PI),n==`directional`?this._lights.directional.push(r):n==`spot`&&this._lights.spot.push(r),t.castShadow&&r.renderTarget==null&&(r.renderTarget=this.backend.createFrameBuffer().setTexture([this.backend.createTexture().setting({magFilter:k.LINEAR,minFilter:k.LINEAR})]),r.renderTarget.setSize(t.shadowMapSize)),r}renderPostProcess(e,t,n,r){let i=t?t.textures:void 0;if(e.passes)for(let t=0;t<e.passes.length;t++){let a=e.passes[t];if(a.enabled===!1)continue;let o=a.renderTarget;this.backend.bindRenderTarget(o,a.viewPort,n),this.backend.clear(a.clearColor,a.clearDepth);let s=a.backBufferOverride||i||null;if(s)for(let e=0;e<s.length;e++)a.uniforms[`uBackBuffer`+e]={type:`1i`,value:s[e]};let c=r&&r.cameraOverride||{};c.label=a.name,c.renderTarget=o,c.uniformOverride=r&&r.uniformOverride,this.draw(a.uuid,`postprocess`,this._quad,a,c),a.onAfterRender(),!a.passThrough&&a.renderTarget&&(i=a.renderTarget.textures)}}draw(e,t,n,r,i){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:e,renderType:t,geometry:n,material:r,param:{...i}});return}Pr=0,this.backend.setMaterialState(r.cullFace,r.depthTest,r.depthWrite);let a=r.programCache[t];if(!a||this._lightsUpdated){let e={...r.defines};t==`deferred`?e.IS_DEFERRED=``:t==`forward`||t==`envMap`?e.IS_FORWARD=``:t==`shadowMap`&&(e.IS_DEPTH=``);let n=$e(r.vert,e,this._lights),i=$e(r.frag,e,this._lights);a=this.programManager.get(n,i,r.name),r.programCache[t]=a}if(i&&(i.modelMatrixWorld&&(a.setUniform(`uModelMatrix`,`Matrix4fv`,i.modelMatrixWorld.elm),a.setUniform(`uModelMatrixInverse`,`Matrix4fv`,this._tmpModelMatrixInverse.copy(i.modelMatrixWorld).inverse().elm),i.modelMatrixWorldPrev&&a.setUniform(`uModelMatrixPrev`,`Matrix4fv`,i.modelMatrixWorldPrev.elm),i.viewMatrix&&(this._tmpModelViewMatrix.copy(i.modelMatrixWorld).preMultiply(i.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),a.setUniform(`uModelViewMatrix`,`Matrix4fv`,this._tmpModelViewMatrix.elm),a.setUniform(`uNormalMatrix`,`Matrix4fv`,this._tmpNormalMatrix.elm),a.setUniform(`uViewMatrixInverse`,`Matrix4fv`,this._tmpViewMatrixInverseMatrix.copy(i.viewMatrix).inverse().elm))),i.viewMatrix&&(a.setUniform(`uViewMatrix`,`Matrix4fv`,i.viewMatrix.elm),i.viewMatrixPrev&&a.setUniform(`uViewMatrixPrev`,`Matrix4fv`,i.viewMatrixPrev.elm)),i.projectionMatrix&&(a.setUniform(`uProjectionMatrix`,`Matrix4fv`,i.projectionMatrix.elm),a.setUniform(`uProjectionMatrixInverse`,`Matrix4fv`,this._tmpProjectionMatrixInverse.copy(i.projectionMatrix).inverse().elm),i.projectionMatrixPrev&&a.setUniform(`uProjectionMatrixPrev`,`Matrix4fv`,i.projectionMatrixPrev.elm)),i.cameraMatrixWorld&&(a.setUniform(`uCameraMatrix`,`Matrix4fv`,i.cameraMatrixWorld.elm),a.setUniform(`uCameraPosition`,`3f`,[i.cameraMatrixWorld.elm[12],i.cameraMatrixWorld.elm[13],i.cameraMatrixWorld.elm[14]])),t!=`deferred`&&(i.cameraNear&&a.setUniform(`uCameraNear`,`1f`,[i.cameraNear]),i.cameraFar&&a.setUniform(`uCameraFar`,`1f`,[i.cameraFar]))),r.useLight&&t!==`deferred`&&t!==`shadowMap`){for(let e=0;e<this._lights.directional.length;e++){let t=this._lights.directional[e],n=zr(e);if(a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),t.renderTarget){let e=t.renderTarget.textures[0].activate(Pr++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}for(let e=0;e<this._lights.spot.length;e++){let t=this._lights.spot[e],n=Br(e);if(i&&i.viewMatrix&&this._tmpLightDirection.copy(t.direction).applyMatrix3(i.viewMatrix),a.setUniform(n.position,`3fv`,t.position.getElm(`vec3`)),a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),a.setUniform(n.angle,`1fv`,[Math.cos(t.component.angle/2)]),a.setUniform(n.blend,`1fv`,[t.component.blend]),a.setUniform(n.distance,`1fv`,[t.component.distance]),a.setUniform(n.decay,`1fv`,[t.component.decay]),t.renderTarget){let e=t.renderTarget.textures[0].activate(Pr++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}}Wr(a,this.globalUniforms,r.uniforms,i&&i.uniformOverride);let o=a.getVAO(e.toString());if(o){let e=this._getGeometryBuffer(n);e.vaoVersions.get(o)!==n.updateVersion&&(n.attributes.forEach((t,n)=>{let r=e.buffers.get(n);r!==void 0&&(n==`index`?o.setIndex(r):o.setAttribute(n,r,t.size,t.opt))}),e.vaoVersions.set(o,n.updateVersion)),this.backend.draw(a,o,r.drawType,r.blending,void 0)}}_getGeometryBuffer(e){let t=this._geometryBuffers.get(e);if(t||(t={buffers:new Map,vaoVersions:new Map,version:-1},this._geometryBuffers.set(e,t)),t.version!==e.updateVersion){let n=t.buffers;n.forEach(e=>e.dispose()),n.clear(),t.vaoVersions.clear(),e.attributes.forEach((e,t)=>{n.set(t,new Le(this.backend.gl).setData(e.array,t==`index`?`ibo`:`vbo`,e.opt&&e.opt.usage))}),t.version=e.updateVersion}return t}applyPipelineConfig(e){Object.assign(this._pipelineConfig,e);for(let e=0;e<this._views.length;e++)this._views[e].applyPipelineConfig()}get pipelineConfig(){return this._pipelineConfig}resize(e){this.resolution.copy(e);for(let t=0;t<this._views.length;t++){let n=this._views[t];n.fit(n.size||e)}}_resetSky(){this.sky.entity.disposeRecursive(),this.sky=new kr(this._engine)}reset(){this._resetSky(),this.applyPipelineConfig(jr()),this._geometryBuffers.forEach(e=>{e.buffers.forEach(e=>e.dispose())}),this._geometryBuffers.clear(),this._lightInfoCache.forEach(e=>{e.renderTarget&&(e.renderTarget.textures.forEach(e=>e.dispose()),e.renderTarget.dispose())}),this._lightInfoCache.clear()}async compileShaders(e,t,n,r){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.prepareScene(e,n),this.render(t,n),this._isCorrentCompiles=!1;let i=this.compileDrawParams.length,a=0;for(let e=0;e<this.compileDrawParams.length;e++){let t=this.compileDrawParams[e];if(this.backend.bindRenderTarget(t.param.renderTarget||null),this.draw(t.drawId,t.renderType,t.geometry,t.material,t.param),await new Promise(e=>{setTimeout(()=>{e(null)},10)}),r){a++;let e=t.param&&t.param.label||`-`;r(`${t.renderType}/${e}/[${t.drawId}]`,a,i)}}}createTexProcedural(e){let t={},n=e.textures||{},r=Object.keys(n);for(let e=0;e<r.length;e++)t[r[e]]={value:n[r[e]],type:`1i`};let i=new Sn(this,{frag:e.frag,resolution:e.resolution,uniforms:t});return e.filter===`nearest`&&(i.setting({magFilter:k.NEAREST,minFilter:k.NEAREST}),i.render()),i}},Hr=[],Ur=(e,t)=>{e!=null&&(typeof e==`number`||typeof e==`boolean`?Hr.push(e):`isVector`in e?Hr.push(...e.getElm(`vec`+t.charAt(0))):`isTexture`in e?(e.activate(Pr++),Hr.push(e.unit)):Hr.push(...e.elm))},Wr=(e,...t)=>{for(let n=0;n<t.length;n++){let r=t[n];if(!r)continue;let i=Object.keys(r);for(let t=0;t<i.length;t++){let n=i[t],a=r[n];if(!a)continue;let o=a.type,s=a.value;if(Hr.length=0,Array.isArray(s))for(let e=0;e<s.length;e++)Ur(s[e],o);else Ur(s,o);Hr.length>0&&e.setUniform(n,o,Hr)}}},Vr.__docgenInfo={description:``,methods:[{name:`createView`,docblock:null,modifiers:[],params:[{name:`opt`,optional:!0,type:{name:`signature`,type:`object`,raw:`{
	offscreen?: boolean;
}`,signature:{properties:[{key:`offscreen`,value:{name:`boolean`,required:!1}}]},alias:`RenderViewOptions`}}],returns:{type:{name:`RenderView`}}},{name:`prepareScene`,docblock:null,modifiers:[],params:[{name:`root`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`_event`,optional:!1,type:{name:`EntityUpdateEvent`,alias:`EntityUpdateEvent`}}],returns:null},{name:`renderCamera`,docblock:null,modifiers:[],params:[{name:`renderType`,optional:!1,type:{name:`union`,raw:`"shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"`,elements:[{name:`literal`,value:`"shadowMap"`},{name:`literal`,value:`"deferred"`},{name:`literal`,value:`"forward"`},{name:`literal`,value:`"envMap"`},{name:`literal`,value:`'ui'`},{name:`literal`,value:`"postprocess"`}],alias:`MaterialRenderType`}},{name:`cameraEntity`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`entities`,optional:!1,type:{name:`Array`,elements:[{name:`Entity`}],raw:`Entity[]`}},{name:`renderTarget`,optional:!1,type:{name:`union`,raw:`GLP.GLPowerFrameBuffer | null`,elements:[{name:`GLP.GLPowerFrameBuffer`},{name:`null`}]}},{name:`canvasSize`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}},{name:`renderOption`,optional:!0,type:{name:`RenderOption`,alias:`RenderOption`}}],returns:null},{name:`renderPostProcess`,docblock:null,modifiers:[],params:[{name:`postprocess`,optional:!1,type:{name:`PostProcess`,alias:`PostProcess`}},{name:`input`,optional:!0,type:{name:`GLP.GLPowerFrameBuffer`,alias:`GLP.GLPowerFrameBuffer`}},{name:`canvasSize`,optional:!0,type:{name:`MTP.Vector`,alias:`MTP.Vector`}},{name:`renderOption`,optional:!0,type:{name:`RenderOption`,alias:`RenderOption`}}],returns:null},{name:`draw`,docblock:null,modifiers:[],params:[{name:`drawId`,optional:!1,type:{name:`string`}},{name:`renderType`,optional:!1,type:{name:`union`,raw:`"shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"`,elements:[{name:`literal`,value:`"shadowMap"`},{name:`literal`,value:`"deferred"`},{name:`literal`,value:`"forward"`},{name:`literal`,value:`"envMap"`},{name:`literal`,value:`'ui'`},{name:`literal`,value:`"postprocess"`}],alias:`MaterialRenderType`}},{name:`geometry`,optional:!1,type:{name:`Geometry`,alias:`Geometry`}},{name:`material`,optional:!1,type:{name:`Material`,alias:`Material`}},{name:`param`,optional:!0,type:{name:`DrawParam`,alias:`DrawParam`}}],returns:null},{name:`applyPipelineConfig`,docblock:null,modifiers:[],params:[{name:`config`,optional:!1,type:{name:`signature`,type:`object`,raw:`{
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// ACES トーンマップ。オフだとシェーダーで書いた色がそのまま画面へ出る
	toneMap?: boolean;
	// ブルームの輝度抽出はトーンマップ前の HDR から行うので、しきい値は HDR の値で指定する
	bloom?: boolean;
	bloomThreshold?: number;
	bloomBrightness?: number;
	// lightShaft の細かい調整（WebGPU バックエンドのみ。WebGL は無視する）
	lightShaftIntensity?: number;
	lightShaftBlur?: boolean;
	lightShaftTemporal?: boolean;
	lightShaftTemporalBlend?: number;
	// SSAO の細かい調整（WebGPU バックエンドのみ。WebGL は無視する）
	ssaoIntensity?: number;
	ssaoBlur?: boolean;
	ssaoTemporal?: boolean;
	ssaoTemporalBlend?: number;
}`,signature:{properties:[{key:`motionBlur`,value:{name:`boolean`,required:!1}},{key:`motionBlurPower`,value:{name:`number`,required:!1}},{key:`ssr`,value:{name:`boolean`,required:!1}},{key:`ssao`,value:{name:`boolean`,required:!1}},{key:`lightShaft`,value:{name:`boolean`,required:!1}},{key:`dof`,value:{name:`boolean`,required:!1}},{key:`toneMap`,value:{name:`boolean`,required:!1}},{key:`bloom`,value:{name:`boolean`,required:!1}},{key:`bloomThreshold`,value:{name:`number`,required:!1}},{key:`bloomBrightness`,value:{name:`number`,required:!1}},{key:`lightShaftIntensity`,value:{name:`number`,required:!1}},{key:`lightShaftBlur`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporal`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporalBlend`,value:{name:`number`,required:!1}},{key:`ssaoIntensity`,value:{name:`number`,required:!1}},{key:`ssaoBlur`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporal`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporalBlend`,value:{name:`number`,required:!1}}]},alias:`PipelineConfig`}}],returns:{type:{name:`void`}}},{name:`pipelineConfig`,docblock:null,modifiers:[`get`],params:[],returns:{type:{name:`signature`,type:`object`,raw:`{
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// ACES トーンマップ。オフだとシェーダーで書いた色がそのまま画面へ出る
	toneMap?: boolean;
	// ブルームの輝度抽出はトーンマップ前の HDR から行うので、しきい値は HDR の値で指定する
	bloom?: boolean;
	bloomThreshold?: number;
	bloomBrightness?: number;
	// lightShaft の細かい調整（WebGPU バックエンドのみ。WebGL は無視する）
	lightShaftIntensity?: number;
	lightShaftBlur?: boolean;
	lightShaftTemporal?: boolean;
	lightShaftTemporalBlend?: number;
	// SSAO の細かい調整（WebGPU バックエンドのみ。WebGL は無視する）
	ssaoIntensity?: number;
	ssaoBlur?: boolean;
	ssaoTemporal?: boolean;
	ssaoTemporalBlend?: number;
}`,signature:{properties:[{key:`motionBlur`,value:{name:`boolean`,required:!1}},{key:`motionBlurPower`,value:{name:`number`,required:!1}},{key:`ssr`,value:{name:`boolean`,required:!1}},{key:`ssao`,value:{name:`boolean`,required:!1}},{key:`lightShaft`,value:{name:`boolean`,required:!1}},{key:`dof`,value:{name:`boolean`,required:!1}},{key:`toneMap`,value:{name:`boolean`,required:!1}},{key:`bloom`,value:{name:`boolean`,required:!1}},{key:`bloomThreshold`,value:{name:`number`,required:!1}},{key:`bloomBrightness`,value:{name:`number`,required:!1}},{key:`lightShaftIntensity`,value:{name:`number`,required:!1}},{key:`lightShaftBlur`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporal`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporalBlend`,value:{name:`number`,required:!1}},{key:`ssaoIntensity`,value:{name:`number`,required:!1}},{key:`ssaoBlur`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporal`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporalBlend`,value:{name:`number`,required:!1}}]}}}},{name:`resize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`reset`,docblock:null,modifiers:[],params:[],returns:null},{name:`compileShaders`,docblock:null,modifiers:[`async`],params:[{name:`root`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`view`,optional:!1,type:{name:`RenderViewContract`,alias:`RenderViewContract`}},{name:`event`,optional:!1,type:{name:`EntityUpdateEvent`,alias:`EntityUpdateEvent`}},{name:`cb`,optional:!0,type:{name:`signature`,type:`function`,raw:`( label: string, loaded: number, total: number ) => void`,signature:{arguments:[{type:{name:`string`},name:`label`},{type:{name:`number`},name:`loaded`},{type:{name:`number`},name:`total`}],return:{name:`void`}}}}],returns:null},{name:`createTexProcedural`,docblock:null,modifiers:[],params:[{name:`param`,optional:!1,type:{name:`TexProceduralParam`,alias:`TexProceduralParam`}}],returns:{type:{name:`TexProcedural`}}}],displayName:`Renderer`}})))()}var Kr;function qr(){return(qr=t((()=>{vn(),Kr=class extends _n{_passes;date;constructor(e){super({...e}),this._passes=e.passes,this.date=new Date}get passes(){return this._passes}compute(e){let t=Math.min(1/60,(new Date().getTime()-this.date.getTime())/1e3);this.date=new Date,this.passes.forEach(e=>{e.uniforms.uDeltaTime.value=t}),e.renderPostProcess(this)}}})))()}function Jr(){return(Jr=t((()=>{})))()}var Yr;function Xr(){return(Xr=t((()=>{ln(),Ye(),xn(),Jr(),Yr=class extends j{size;layerCnt;clearColor;rt1;rt2;outputUniforms;constructor(e,t){let n=Object.assign({type:k.FLOAT,internalFormat:k.RGBA32F,format:k.RGBA,magFilter:k.NEAREST,minFilter:k.NEAREST},t.textureParam),r=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),i=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),a={uGPUResolution:{value:t.size,type:`2fv`}};for(let e=0;e<t.dataLayerCount;e++)a[`uGPUSampler`+e]={value:i.textures[e],type:`1i`};super(e,{...t,vert:t.vert||`layout ( location = 0 ) in vec3 position;\r
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
}`,renderTarget:r,uniforms:cn.merge(t.uniforms,a,{uDeltaTime:{value:0,type:`1f`}})}),this.size=t.size,this.layerCnt=t.dataLayerCount,this.rt1=r,this.rt2=i,this.renderTarget=this.rt1,this.clearColor=t.clearColor??null,this.outputUniforms=a}onAfterRender(){super.onAfterRender();for(let e=0;e<this.layerCnt;e++)this.outputUniforms[`uGPUSampler`+e].value=this.renderTarget.textures[e];let e=this.rt1;this.rt1=this.rt2,this.rt2=e,this.renderTarget=this.rt1}initTexture(e){for(let t=0;t<this.layerCnt;t++){let n=[];for(let r=0;r<this.size.y;r++)for(let i=0;i<this.size.x;i++){let a=i,o=r;n.push(...e(t,a,o))}this.rt2.textures[t].subImage(new Float32Array(n),this.size.x,this.size.y)}}}})))()}function Zr(){return(Zr=t((()=>{qe(),O(),Ut(),Ye(),gn(),vn(),xn()})))()}function Qr(){return(Qr=t((()=>{at(),Ut(),Dt(),Ye(),gn()})))()}function M(){return(M=t((()=>{Ye(),un(),Gr(),gn(),qr(),Xr(),fn(),Hn(),Er(),Zr(),Qr(),vn(),xn(),Cn()})))()}var $r;function ei(){return(ei=t((()=>{$r=class{static serializeEntity(e,t){let n=e=>{let r=[];e.children.forEach(e=>{e.initiator!=`script`&&r.push(n(e))});let i=[];e.components.forEach(e=>{let n=e.serialize({mode:`export`}),r=Object.keys(n).length>0;if(e.initiator!==`user`)return;let a={name:t.getName(e),uuid:e.uuid};r&&(a.props=n),i.push(a)});for(let t of e.unresolvedComponents)i.push({name:t.name,uuid:t.uuid,props:t.props});return{name:e.name,uuid:e.uuid,pos:e.position.x==0&&e.position.y==0&&e.position.z==0?void 0:e.position.getElm(`vec3`),rot:e.euler.x==0&&e.euler.y==0&&e.euler.z==0?void 0:e.euler.getElm(`vec3`),scale:e.scale.x==1&&e.scale.y==1&&e.scale.z==1?void 0:e.scale.getElm(`vec3`),components:i.length>0?i:void 0,childs:r.length>0?r:void 0}};return n(e)}static deserializeEntity(e,t,n,r){let i=(e,t)=>{let a=t||r.createEntity();a.initiator=`user`,a.setField(`name`,e.name),a.restoreUUID(e.uuid);let o=e.pos||[0,0,0];a.position.x=o[0],a.position.y=o[1],a.position.z=o[2];let s=e.rot||[0,0,0];a.euler.x=s[0],a.euler.y=s[1],a.euler.z=s[2];let c=e.scale||[1,1,1];return a.scale.x=c[0],a.scale.y=c[1],a.scale.z=c[2],a.unresolvedComponents=[],e.components&&e.components.forEach(e=>{let t=n.resolve(e.name);if(t){let n=a.getComponent(t.component);n||(n=a.addComponent(t.component),n.initiator=`user`),n.restoreUUID(e.uuid),e.props&&n.deserialize(e.props)}else console.warn(`[ProjectSerializer] Component "${e.name}" not found in resolver. Preserving data for round-trip.`),a.unresolvedComponents.push({name:e.name,uuid:e.uuid,props:e.props})}),e.childs&&([...a.children].forEach(e=>{e.initiator!==`script`&&a.remove(e)}),e.childs.forEach(e=>{a.add(i(e))})),a};e&&i(e,t),t.initiator=`god`}}})))()}var ti;function ni(){return(ni=t((()=>{M(),ti=class extends St{name;_frag;_resolution;_filter;_updateEveryFrame;_textures;constructor(e,t){super(),this.name=e;let n=t.data;this._frag=n?.frag||``,this._resolution=n?.resolution||[1024,1024],this._filter=n?.filter||`linear`,this._updateEveryFrame=n?.updateEveryFrame??!1,this._textures=n?.textures||{}}get frag(){return this._frag}get resolution(){return this._resolution}get filter(){return this._filter}get updateEveryFrame(){return this._updateEveryFrame}get textures(){return this._textures}}})))()}var ri;function ii(){return(ii=t((()=>{ri=(e,t)=>{let n={},r=`/${t}/`;for(let[t,i]of Object.entries(e)){let e=t.slice(t.lastIndexOf(r)+r.length).split(`/`).slice(0,-2),a=Object.entries(i).find(([e,t])=>typeof t==`function`&&/^[A-Z]/.test(e));if(!a)continue;let o=n;for(let t of e)o=o[t]=o[t]||{};o[a[0]]=a[1]}return n}})))()}var ai;function oi(){return(oi=t((()=>{at(),O(),ni(),ii(),ai=class extends tt{_componentList;_componentGroups;_geometryList;_geometryGroups;_textureResources;_textures;_updateEveryFrameTextures;constructor(){super(),this._componentList=[],this._textures=new Map,this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources=new Map,this._updateEveryFrameTextures=[]}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get geometryList(){return this._geometryList}get geometryGroups(){return this._geometryGroups}get textureList(){return Array.from(this._textureResources.values())}get textures(){return this._textures}get updateEveryFrameTextures(){return this._updateEveryFrameTextures}clear(){this._componentList=[],this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources.clear(),this._textures.clear(),this._updateEveryFrameTextures=[],this.emit(`update`)}getComponent(e){return this._componentList.find(t=>t.name==e)}getComponentName(e){let t=this._componentList.find(t=>e instanceof t.component);return t?t.name:e.constructor.name}addComponentGroup(e){let t=this._componentGroups.find(t=>t.name==e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addComponent:(e,n)=>{let r={name:e,component:n};t.push(r),this._componentList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._componentGroups.push(t),this.emit(`update`),t}getGeometry(e){return this._geometryList.find(t=>t.name===e)}addGeometryGroup(e){let t=this._geometryGroups.find(t=>t.name===e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addGeometry:(e,n)=>{let r={name:e,geometryClass:n};t.push(r),this._geometryList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._geometryGroups.push(t),this.emit(`update`),t}addTextureResource(e,t){let n=new ti(e,{data:t});this._textureResources.set(e,n),this.emit(`update`)}getTextureResource(e){return this._textureResources.get(e)}removeTextureResource(e){this._textureResources.delete(e);let t=this._textures.get(e);t&&(t.dispose(),this._textures.delete(e)),this.emit(`update`)}addTexture(e,t){return this._textures.set(e,t),t}getTexture(e){return this._textures.get(e)}_buildTexture(e,t,n){let r=e.frag;return r?t.createTexProcedural({name:e.name,frag:r,resolution:new E(e.resolution[0]||1024,e.resolution[1]||1024),filter:e.filter,textures:n}):null}_ensureTexture(e,t,n){let r=this._textures.get(e.name);if(r)return r;if(n.has(e.name))return null;n.add(e.name);let i={},a=e.textures,o=Object.keys(a);for(let e=0;e<o.length;e++){let r=o[e],s=a[r],c=this._textureResources.get(s),l=c?this._ensureTexture(c,t,n):this._textures.get(s);l&&(i[r]=l)}let s=this._buildTexture(e,t,i);return s?(this._textures.set(e.name,s),e.updateEveryFrame&&this._updateEveryFrameTextures.push(s),s):null}buildTextureInstances(e){this._updateEveryFrameTextures=[];let t=new Set;this._textureResources.forEach(n=>{this._ensureTexture(n,e,t)}),this.emit(`update`)}}})))()}var si,N;function ci(){return(ci=t((()=>{O(),M(),ei(),oi(),si={duration:600,fps:30},N=class e extends St{static resources;name;_renderer;_root;_time;_frame;_frameSetting;_disposed;_frameEvent;constructor(e){super(),this.name=`OREngine`,this._disposed=!1,this._renderer=e(this),this._renderer.globalUniforms={uTime:{value:0,type:`1f`},uTimeF:{value:0,type:`1f`},uTimeE:{value:0,type:`1f`},uTimeEF:{value:0,type:`1f`},uDeltaTime:{value:0,type:`1f`},uResolution:{value:new E,type:`2fv`},uAspectRatio:{value:1,type:`1f`}},this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={...si},this._frame={current:0,playing:!1},this.seek(0),this._frameEvent=null,this._root=this.createEntity({name:`root`}),this._root.initiator=`god`,this.field(`name`,()=>this.name,e=>this.name=e),this.field(`scene`,()=>$r.serializeEntity(this._root,this._createComponentResolver()),e=>{$r.deserializeEntity(e,this._root,this._createComponentResolver(),this)}),this.field(`renderer`,()=>this._renderer.serialize({mode:`export`}),e=>this._renderer.deserialize(e));let t=this.fieldDir(`timeline`);t.field(`duration`,()=>this._frameSetting.duration,e=>this._frameSetting.duration=e),t.field(`fps`,()=>this._frameSetting.fps,e=>this._frameSetting.fps=e)}createEntity(e){return new Jt({engine:this,...e})}get canvas(){return this._renderer.canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get disposed(){return this._disposed}createView(e){return this._renderer.createView(e)}_createComponentResolver(){return{resolve:t=>e.resources.getComponent(t),getName:t=>e.resources.getComponentName(t)}}init(){this._root.disposeRecursive(),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.name=`New Project`,this._renderer.reset(),Object.assign(this._frameSetting,si),this.stop(),this.seek(0)}async load(e){this.init(),this.deserialize(e),this.emit(`update/graph`),this.emit(`loaded`)}update(t){let n=new Date().getTime();this._time.delta=(n-this._time.current)/1e3,this._time.current=n,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*+!!this._frame.playing,this._frame.current=this._time.code*60;let r=this.createEntityUpdateEvent({forceDraw:t?.forceDraw});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1,this._renderer.globalUniforms.uDeltaTime.value=Math.min(this._time.delta,1/60);let i=e.resources.updateEveryFrameTextures;for(let e=0;e<i.length;e++)i[e].render();return this.step(r),this._frame.playing&&this.emit(`update/frame/play`,[this._frame]),this._time.delta}step(e){this._root.commitFrame(e),this._root.update(e),this._root.postUpdate(e),this._root.updateMatrixRecursive(),this._root.prepareRender(e),this._renderer.prepareScene(this._root,e),this._frameEvent=e}render(e){this._frameEvent&&this._renderer.render(e,this._frameEvent)}createEntityUpdateEvent(e){let t={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return e?{...t,...e}:t}setSize(e){this._renderer.resize(e),this._renderer.canvas.width=e.x,this._renderer.canvas.height=e.y,this._renderer.globalUniforms.uResolution.value.copy(e),this._renderer.globalUniforms.uAspectRatio.value=e.x/Math.max(e.y,1)}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(e){this._time.code=e/60,this._frame.current=e,this.emit(`update/frame/play`,[this._frame])}updateOffline(t,n){let r=t/n,i=1/n;this._time.delta=i,this._time.current=new Date().getTime(),this._time.engine+=i,this._time.code=r,this._frame.current=r*60,this._frame.playing=!0;let a=this.createEntityUpdateEvent({forceDraw:!0});this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1;let o=e.resources.updateEveryFrameTextures;for(let e=0;e<o.length;e++)o[e].render();this.step(a)}compileShaders(e,t){let n=this.createEntityUpdateEvent({forceDraw:!0});return this.renderer.compileShaders(this._root,e,n,t)}dispose(){this._disposed=!0,this._root.disposeRecursive()}},N.resources=new ai,N.__docgenInfo={description:``,methods:[{name:`createEntity`,docblock:null,modifiers:[],params:[{name:`params`,optional:!0,type:{name:`Omit`,elements:[{name:`MXP.EntityParams`},{name:`literal`,value:`'engine'`}],raw:`Omit<MXP.EntityParams, 'engine'>`,alias:`Omit`}}],returns:{type:{name:`MXP.Entity`}}},{name:`canvas`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`renderer`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`root`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`frame`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`time`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`frameSetting`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`disposed`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`createView`,docblock:null,modifiers:[],params:[{name:`opt`,optional:!0,type:{name:`MXP.RenderViewOptions`,alias:`MXP.RenderViewOptions`}}],returns:null},{name:`init`,docblock:null,modifiers:[],params:[],returns:null},{name:`load`,docblock:null,modifiers:[`async`],params:[{name:`project`,optional:!1,type:{name:`OREngineProjectData`,alias:`OREngineProjectData`}}],returns:null},{name:`update`,docblock:null,modifiers:[],params:[{name:`param`,optional:!0,type:{name:`Partial`,elements:[{name:`MXP.EntityUpdateEvent`}],raw:`Partial<MXP.EntityUpdateEvent>`,alias:`Partial`}}],returns:null},{name:`step`,docblock:null,modifiers:[],params:[{name:`event`,optional:!1,type:{name:`MXP.EntityUpdateEvent`,alias:`MXP.EntityUpdateEvent`}}],returns:null},{name:`createEntityUpdateEvent`,docblock:null,modifiers:[],params:[{name:`overrideParams`,optional:!0,type:{name:`Partial`,elements:[{name:`MXP.EntityUpdateEvent`}],raw:`Partial<MXP.EntityUpdateEvent>`,alias:`Partial`}}],returns:{type:{name:`MXP.EntityUpdateEvent`}}},{name:`setSize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`play`,docblock:null,modifiers:[],params:[],returns:null},{name:`stop`,docblock:null,modifiers:[],params:[],returns:null},{name:`seek`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`number`}}],returns:null},{name:`updateOffline`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`number`}},{name:`fps`,optional:!1,type:{name:`number`}}],returns:null},{name:`compileShaders`,docblock:null,modifiers:[],params:[{name:`view`,optional:!1,type:{name:`MXP.RenderViewContract`,alias:`MXP.RenderViewContract`}},{name:`onProgress`,optional:!0,type:{name:`signature`,type:`function`,raw:`( label: string, loaded: number, total: number ) => void`,signature:{arguments:[{type:{name:`string`},name:`label`},{type:{name:`number`},name:`loaded`},{type:{name:`number`},name:`total`}],return:{name:`void`}}}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`Engine`}})))()}var li;function ui(){return(ui=t((()=>{at(),li=class extends tt{_pressedKeys;constructor(){super(),this._pressedKeys={};let e=this._onKeyDown.bind(this),t=this._onKeyUp.bind(this);window.addEventListener(`keydown`,e),window.addEventListener(`keyup`,t),this.once(`dispose`,()=>{window.removeEventListener(`keydown`,e),window.removeEventListener(`keyup`,t)})}get pressedKeys(){return this._pressedKeys}_onKeyDown(e){this._pressedKeys[e.key]=!0,this.emit(`keydown`,[e,this._pressedKeys])}_onKeyUp(e){if(this._pressedKeys[e.key]=!1,e.key==`Meta`||e.key==`Control`){let e=Object.keys(this._pressedKeys);for(let t=0;t<e.length;t++)this._pressedKeys[e[t]]=!1}this.emit(`keyup`,[e,this._pressedKeys])}dispose(){this.emit(`dispose`)}}})))()}var di;function fi(){return(fi=t((()=>{at(),O(),di=class extends tt{_isTouching;element=null;position;delta;constructor(){super(),this.position=new E(NaN,NaN),this.delta=new E(NaN,NaN),this._isTouching=!1;let e=this._onPointer.bind(this,`move`),t=this._onPointer.bind(this,`end`);window.addEventListener(`pointermove`,e),window.addEventListener(`pointerup`,t),window.addEventListener(`dragend`,t);let n=()=>{this.element&&this.removeElement(this.element),window.removeEventListener(`pointermove`,e),window.removeEventListener(`pointerup`,t),window.removeEventListener(`dragend`,t),this.off(`dispose`,n)};this.on(`dispose`,n)}setElement(e){this.element&&this.removeElement(this.element),this.element=e;let t=this._onPointer.bind(this,`start`);e.addEventListener(`pointerdown`,t);let n=r=>{e.isEqualNode(r.elm)&&(e.removeEventListener(`pointerdown`,t),this.off(`unregister`,n))};this.on(`unregister`,n)}removeElement(e){this.emit(`unregister`,[e])}getScreenPosition(e){if(this.position.x!=this.position.x)return new E(NaN,NaN);let t=this.position.clone().divide(e).multiply(2).sub(1);return t.y*=-1,t}getRelativePosition(e,t){let n=e.getClientRects()[0],r=this.position.x-n.left,i=this.position.y-n.top;return t&&(r/=n.width,i/=n.height),new E(r,i)}_setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}_onPointer(e,t){let n=t.pointerType;(n==null||n==`mouse`&&(t.button==-1||t.button==0)||n==`touch`)&&this._touchEventHandler(t.pageX,t.pageY,e,t)}_touchEventHandler(e,t,n,r){let i=!1,a=e-window.pageXOffset,o=t-window.pageYOffset;n==`start`?(this._isTouching=!0,this._setPos(a,o),this.delta.set(0,0),i=!0):n==`move`?(this._setPos(a,o),this._isTouching&&(i=!0)):n==`end`&&(`targetTouches`in r?r.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,i=!0),i&&this.emit(n,[{pointerEvent:r,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit(`dispose`)}}})))()}function pi(){return(pi=t((()=>{ci(),oi(),ui(),fi()})))()}function mi(){return(mi=t((()=>{pi()})))()}var hi,gi;function _i(){return(_i=t((()=>{hi=i(),gi=(0,hi.createContext)(null)})))()}var vi,P;function F(){return(F=t((()=>{vi=i(),_i(),P=()=>{let e=(0,vi.useContext)(gi);if(e===null)throw Error(`useEditor must be used within a EditorProvider`);return e}})))()}var yi,bi,xi;function Si(){return(Si=t((()=>{yi=i(),mi(),w(),F(),bi=o(),xi=e=>{let{engine:t}=P(),n=(0,yi.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{n.components.forEach(r=>{e.push({label:`${n.getScenePath(t.root)} > ${N.resources.getComponentName(r)}`,value:r.uuid})})}),e},[t]),[r,i]=(0,yi.useState)(n);return(0,yi.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,bi.jsx)(re,{value:e.value||``,selectList:r,onChange:t=>{e.onChange&&e.onChange(t||null)}})},xi.__docgenInfo={description:``,methods:[],displayName:`InputComponentRef`,props:{value:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: string | null ) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var Ci,wi,Ti;function Ei(){return(Ei=t((()=>{Ci=i(),w(),F(),wi=o(),Ti=e=>{let{engine:t}=P(),n=(0,Ci.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverse(n=>{e.push({label:n.getScenePath(t.root),value:n.uuid})}),e},[t]),[r,i]=(0,Ci.useState)(n);return(0,Ci.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,wi.jsx)(re,{value:e.value||``,selectList:r,onChange:t=>{e.onChange&&e.onChange(t||null)}})},Ti.__docgenInfo={description:``,methods:[],displayName:`InputEntityRef`,props:{value:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: string | null ) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var Di,Oi,ki,Ai;function ji(){return(ji=t((()=>{Di=`InputResourceSelect__inputResourceSelect___Lmluc`,Oi=`InputResourceSelect__select___Lmluc`,ki=`InputResourceSelect__editButton___Lmluc`,Ai={inputResourceSelect:Di,select:Oi,editButton:ki}})))()}var Mi,Ni,Pi;function Fi(){return(Fi=t((()=>{Mi=i(),w(),F(),ji(),Ni=o(),Pi=e=>{let{editor:t}=P(),n=(0,Mi.useCallback)(()=>{e.value&&(t.setField(`navigateAsset`,{assetType:e.resourceType,name:String(e.value)}),t.setField(`selectedAsset`,{name:String(e.value),assetType:e.resourceType}))},[t,e.value,e.resourceType]);return(0,Ni.jsxs)(`div`,{className:Ai.inputResourceSelect,children:[(0,Ni.jsx)(`div`,{className:Ai.select,children:(0,Ni.jsx)(re,{value:e.value,selectList:e.selectList,onChange:e.onChange})}),e.value&&(0,Ni.jsx)(`button`,{className:Ai.editButton,onClick:n,title:`Edit resource`,children:`✎`})]})},Pi.__docgenInfo={description:``,methods:[],displayName:`InputResourceSelect`,props:{value:{required:!0,tsType:{name:`T`},description:``},selectList:{required:!0,tsType:{name:`union`,raw:`SelectList | ( () => SelectList )`,elements:[{name:`SelectList`},{name:`unknown`}]},description:``},resourceType:{required:!0,tsType:{name:`union`,raw:`"material" | "texture" | "shader"`,elements:[{name:`literal`,value:`"material"`},{name:`literal`,value:`"texture"`},{name:`literal`,value:`"shader"`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var Ii,Li;function Ri(){return(Ri=t((()=>{i(),w(),Si(),Ei(),Fi(),Ii=o(),Li=e=>{let t=null,n=e.onChange,r=e.value,i=e.format,a=e=>{n&&n(e)};if(i&&(i.type==`entity`?t=(0,Ii.jsx)(Ti,{value:r,onChange:a}):i.type==`component`?t=(0,Ii.jsx)(xi,{value:r,onChange:a}):i.type==`vector`&&Array.isArray(r)?t=(0,Ii.jsx)(ee,{value:r,onChange:a}):i.type==`color`&&Array.isArray(r)?t=(0,Ii.jsx)(v,{value:r,onChange:a}):i.type==`select`?t=(0,Ii.jsx)(re,{value:r,onChange:a,selectList:i.list}):i.type==`resource`&&(t=(0,Ii.jsx)(Pi,{value:r,onChange:a,selectList:i.list,resourceType:i.resourceType}))),r==null)return t;if(!t){if(typeof r==`number`)t=(0,Ii.jsx)(b,{...e,value:r,onChange:a});else if(typeof r==`string`)t=(0,Ii.jsx)(C,{...e,value:r,onChange:a});else if(typeof r==`boolean`)t=(0,Ii.jsx)(_,{...e,checked:r,onChange:a});else if(typeof r==`function`){let n=e.label||`Run`;t=(0,Ii.jsx)(c,{onClick:()=>{r()},children:n})}else t=(0,Ii.jsx)(C,{...e,value:JSON.stringify(r),onChange:()=>{}})}return t}})))()}var zi,Bi,Vi,Hi,Ui,Wi,Gi,Ki;function qi(){return(qi=t((()=>{zi=i(),Bi={showAudioView:!0},Vi=`orengine-editor-ui-settings`,Hi=()=>{try{let e=localStorage.getItem(Vi);if(e)return{...Bi,...JSON.parse(e)}}catch{}return{...Bi}},Ui=Hi(),Wi=new Set,Gi=e=>(Wi.add(e),()=>{Wi.delete(e)}),Ki=e=>[(0,zi.useSyncExternalStore)(Gi,()=>Ui[e]),(0,zi.useCallback)(t=>{Ui={...Ui,[e]:t};try{localStorage.setItem(Vi,JSON.stringify(Ui))}catch{}Wi.forEach(e=>e())},[e])]})))()}var Ji,Yi,Xi;function Zi(){return(Zi=t((()=>{Ji=`EditorSettings__editorSettings___LmVka`,Yi=`EditorSettings__editorSettings_inner___LmVka`,Xi={editorSettings:Ji,editorSettings_inner:Yi}})))()}var Qi,$i;function ea(){return(ea=t((()=>{w(),Ri(),qi(),Zi(),Qi=o(),$i=()=>{let[e,t]=Ki(`showAudioView`);return(0,Qi.jsx)(`div`,{className:Xi.editorSettings,children:(0,Qi.jsx)(`div`,{className:Xi.editorSettings_inner,children:(0,Qi.jsx)(s,{label:`View`,accordion:!0,children:(0,Qi.jsx)(ie,{title:`AudioView`,children:(0,Qi.jsx)(Li,{value:e,onChange:e=>t(e)})})})})})},$i.__docgenInfo={description:``,methods:[],displayName:`EditorSettings`}})))()}var ta,na;function ra(){return(ra=t((()=>{mi(),ta=(e,t,n)=>{let r=e.name;if(r.startsWith(`_`)&&(r=r.slice(1)),`child`in e){let i=[];for(let r of e.child){let e=ta(r,t,n);e&&i.push(e)}return{label:r,children:i}}return n.includes(e.component)?null:{label:r,onClick:()=>t(e)}},na=(e,t=[])=>{let n=[];for(let r of N.resources.componentGroups){let i=ta(r,e,t);i&&n.push(i)}return n}})))()}var ia,aa;function oa(){return(oa=t((()=>{M(),w(),ra(),F(),ia=[A],aa=e=>{let{editor:t}=P(),{closeAll:n}=S(),r=(r,i)=>{let a=t.api.createEntity(e,{name:r,components:i});t.api.selectEntity(a),n()},i=na(e=>{r(e.name,[e.component])},ia),a=[{label:`Empty`,onClick:()=>r(`Empty`,[])}];for(let e of i)a.push(e);return a}})))()}var sa,ca,la;function ua(){return(ua=t((()=>{sa=i(),w(),oa(),F(),ca=o(),la=()=>{let{editor:e,engine:t}=P(),{open:n,closeAll:r}=S(),i=aa(t.root),a=(0,sa.useRef)({x:0,y:0});return(0,sa.useEffect)(()=>{let e=e=>{a.current.x=e.clientX,a.current.y=e.clientY};return window.addEventListener(`pointermove`,e),()=>{window.removeEventListener(`pointermove`,e)}},[]),(0,sa.useEffect)(()=>{let t=()=>{r(),n((0,ca.jsx)(se,{title:`Add Entity`,items:i}),T(a.current.x,a.current.y))};return e.on(`request/addEntity`,t),()=>{e.off(`request/addEntity`,t)}},[e,t,n,r,i]),null}})))()}var da,fa;function pa(){return(pa=t((()=>{da=i(),fa=(0,da.createContext)(void 0)})))()}var ma,ha;function ga(){return(ga=t((()=>{ma=i(),ha=(e,t)=>{let[n,r]=(0,ma.useState)(()=>e?e.serialize():{}),i=t?[...t]:[],a=(0,ma.useMemo)(()=>i,i);return(0,ma.useEffect)(()=>{if(e===void 0)return;r(e.serialize());let t=t=>{let n=a.length==0;for(let e=0;e<a.length;e++)if(t.find(t=>t==a[e])){n=!0;break}n&&r(e.serialize())};return e.on(`fields/update`,t),()=>{e.off(`fields/update`,t)}},[e,a]),{fields:n}}})))()}var _a;function va(){return(va=t((()=>{ga(),_a=e=>(ha(e.target),{target:e.target})})))()}var ya,ba;function xa(){return(xa=t((()=>{ya=i(),pa(),ba=()=>{let e=(0,ya.useContext)(fa);if(!e)throw Error(`SerializeFieldViewContext is not defined`);return e}})))()}var Sa,Ca;function wa(){return(wa=t((()=>{Sa=`ValueArray__container___LmNvb`,Ca={container:Sa}})))()}var Ta,Ea;function Da(){return(Da=t((()=>{i(),w(),Ri(),wa(),Ta=o(),Ea=e=>{let t=[],n=e.value,r=e.format,i=r?.type==`array`?r.labels:void 0;if(n===void 0)return null;for(let r=0;r<n.length;r++){let a=n[r],o=r.toString();i&&(o+=`/ `+i(a,r)),t.push((0,Ta.jsx)(ie,{title:o,children:(0,Ta.jsx)(Li,{...e,value:a,onChange:t=>{let i=n.concat();i[r]=t,e.onChange&&e.onChange(i)}})},r))}return(0,Ta.jsx)(`div`,{className:Ca.container,children:t})},Ea.__docgenInfo={description:``,methods:[],displayName:`ValueArray`,props:{value:{required:!0,tsType:{name:`union`,raw:`T | undefined`,elements:[{name:`T`},{name:`undefined`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}}},description:``},format:{required:!1,tsType:{name:`SerializableFieldFormat`},description:``},label:{required:!1,tsType:{name:`union`,raw:`string | React.ReactNode`,elements:[{name:`string`},{name:`ReactReactNode`,raw:`React.ReactNode`}]},description:``},readOnly:{required:!1,tsType:{name:`boolean`},description:``},step:{required:!1,tsType:{name:`number`},description:``},min:{required:!1,tsType:{name:`number`},description:``},max:{required:!1,tsType:{name:`number`},description:``},int:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var Oa,ka;function Aa(){return(Aa=t((()=>{Oa=`SerializeFieldViewValue__action___LmFjd`,ka={action:Oa}})))()}var ja,Ma;function Na(){return(Na=t((()=>{i(),w(),F(),xa(),Ri(),Da(),Aa(),ja=o(),Ma=e=>{let{editor:t}=P(),{target:n}=ba(),r=e.field.value,i=typeof r,a=e.field.opt,o=a?.format,s=a?.label||e.path.split(`/`).pop(),c=o&&o.type==`vector`,l=null;if(Array.isArray(r))l=o?.type==`vector`?(0,ja.jsx)(ee,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):o?.type==`color`?(0,ja.jsx)(v,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}):(0,ja.jsx)(Ea,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}});else if(l=(0,ja.jsx)(Li,{value:r,...a,onChange:r=>{t.api.setField(n,e.path,r)}}),i===`function`)return(0,ja.jsx)(`div`,{className:ka.action,children:l});return(0,ja.jsx)(ie,{title:s,vertical:c,children:l})},Ma.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldViewValue`,props:{path:{required:!0,tsType:{name:`string`},description:``},field:{required:!0,tsType:{name:`SerializeFieldDirectoryValue`},description:``}}}})))()}var Pa,Fa,Ia,La;function Ra(){return(Ra=t((()=>{Pa=`SerializeFieldViewDir__container___LmNvb`,Fa=`SerializeFieldViewDir__field___LmNvb`,Ia=`SerializeFieldViewDir__block___LmNvb`,La={container:Pa,field:Fa,block:Ia}})))()}var za,Ba;function Va(){return(Va=t((()=>{i(),w(),Na(),Ra(),za=o(),Ba=e=>{let t=[],n=Object.keys(e.fields.childs);for(let r=0;r<n.length;r++){let i=n[r],a=e.fields.childs[i],{opt:o}=a,c=!1;if(o&&(c=typeof o.hidden==`function`?o.hidden(a.type==`value`?a.value:null):o.hidden||!1),c)continue;let l=`field`+i,u=(e.basePath?e.basePath+`/`:``)+i,d=null;d=a.type===`value`?(0,za.jsx)(Ma,{path:u,field:a},l):(0,za.jsx)(`div`,{className:La.block,children:(0,za.jsx)(s,{accordion:!0,label:i,children:(0,za.jsx)(Ba,{fields:a,basePath:u})},l)},l),d&&t.push(d)}return(0,za.jsx)(`div`,{className:La.container,children:t})},Ba.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldViewDir`,props:{fields:{required:!0,tsType:{name:`MXP.SerializeFieldDirectoryFolder`},description:``},basePath:{required:!1,tsType:{name:`string`},description:``}}}})))()}var Ha,Ua;function Wa(){return(Wa=t((()=>{pa(),va(),Va(),Ha=o(),Ua=e=>{let t=_a(e),n=t.target.serializeToDirectory();if(e.filter){let t=n.childs[e.filter];t&&t.type===`folder`&&(n=t)}return(0,Ha.jsx)(fa.Provider,{value:t,children:(0,Ha.jsx)(Ba,{fields:n,basePath:e.filter})})},Ua.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldView`}})))()}var I;function Ga(){return(Ga=t((()=>{ga(),I=(e,t)=>{let n=n=>{e?.setField(t,n)},{fields:r}=ha(e,[t]);return[r&&r[t],n]}})))()}var Ka,qa;function Ja(){return(Ja=t((()=>{Ka=`ComponentAdd__compAdd___LmNvb`,qa={compAdd:Ka}})))()}var Ya,Xa;function Za(){return(Za=t((()=>{w(),ra(),F(),Ja(),Ya=o(),Xa=e=>{let{editor:t}=P(),{open:n,closeAll:r}=S(),i=na(n=>{t.api.addComponent(e.entity,n.component),r()});return(0,Ya.jsx)(`div`,{className:qa.compAdd,children:(0,Ya.jsx)(c,{onClick:e=>{n((0,Ya.jsx)(se,{items:i}),T(e.clientX,e.clientY))},children:`Add Component`})})},Xa.__docgenInfo={description:``,methods:[],displayName:`ComponentAdd`,props:{entity:{required:!0,tsType:{name:`MXP.Entity`},description:``}}}})))()}var Qa,$a,eo,to,no,ro;function io(){return(io=t((()=>{Qa=`ComponentView__compoView___LmNvb`,$a=`ComponentView__head___LmNvb`,eo=`ComponentView__name___LmNvb`,to=`ComponentView__check___LmNvb`,no=`ComponentView__propertyBlock___LmNvb`,ro={compoView:Qa,head:$a,name:eo,check:to,delete:`ComponentView__delete___LmNvb`,propertyBlock:no}})))()}var ao,oo,so,co;function lo(){return(lo=t((()=>{ao=i(),mi(),w(),F(),Wa(),Ga(),io(),oo=o(),so=e=>{let t=Object.keys(e.childs);for(let n=0;n<t.length;n++){let r=e.childs[t[n]],{opt:i}=r,a=!1;if(i&&(a=typeof i.hidden==`function`?i.hidden(r.type===`value`?r.value:null):i.hidden||!1),!a&&(r.type===`value`||so(r)))return!0}return!1},co=({component:e})=>{let{editor:t}=P(),[n,r]=I(e,`enabled`),i=e.initiator!==`user`,a=so(e.serializeToDirectory()),o=(0,ao.useCallback)(n=>{n.stopPropagation();let r=e.entity;if(r){for(let[n,i]of r.components)if(i.uuid===e.uuid){t.api.removeComponent(r,n,e);break}}},[e,t]),c=(0,oo.jsxs)(`div`,{className:ro.head,children:[(0,oo.jsx)(`div`,{className:ro.name,children:N.resources.getComponentName(e)}),(0,oo.jsx)(`div`,{className:ro.delete,children:(0,oo.jsx)(`button`,{onClick:o,children:(0,oo.jsx)(u,{})})})]});return(0,oo.jsx)(`div`,{className:ro.compoView,"data-disable_component":i,children:(0,oo.jsx)(`div`,{className:ro.content,children:(0,oo.jsx)(s,{label:c,accordion:a,bg:!0,defaultClose:!1,children:a&&(0,oo.jsx)(Ua,{target:e})})})})},co.__docgenInfo={description:``,methods:[],displayName:`ComponentView`,props:{component:{required:!0,tsType:{name:`MXP.Component`},description:``}}}})))()}var uo,fo;function po(){return(po=t((()=>{uo=`ComponentList__container___LmNvb`,fo={container:uo}})))()}var mo,ho,go;function _o(){return(_o=t((()=>{mo=i(),Ga(),lo(),po(),ho=o(),go=({entity:e})=>{let[t]=I(e,`components`),n=(0,mo.useMemo)(()=>{let n=[];return t?(t.forEach(t=>{let r=e.getComponentByUUID(t);r&&n.push((0,ho.jsx)(co,{component:r},r.uuid))}),n):null},[t,e]);return(0,ho.jsx)(`div`,{className:fo.container,children:n})},go.__docgenInfo={description:``,methods:[],displayName:`ComponentList`}})))()}var vo,yo,bo;function xo(){return(xo=t((()=>{vo=i(),w(),F(),Wa(),Ga(),Za(),_o(),yo=o(),bo=()=>{let{editor:e,engine:t}=P(),[n]=I(e,`selectedEntityId`),r=(0,vo.useMemo)(()=>{if(n)return t.root.findEntityByUUID(n)},[t,n]);return r?(0,yo.jsxs)(yo.Fragment,{children:[(0,yo.jsx)(s,{label:`Fields`,accordion:!0,children:(0,yo.jsx)(Ua,{target:r})}),(0,yo.jsxs)(s,{label:`Components`,accordion:!0,children:[(0,yo.jsx)(go,{entity:r}),(0,yo.jsx)(Xa,{entity:r})]})]}):null},bo.__docgenInfo={description:``,methods:[],displayName:`EntityProperty`}})))()}var So,Co,wo;function To(){return(To=t((()=>{So=`ExportControl__exportControl___LmV4c`,Co=`ExportControl__exportControl_inner___LmV4c`,wo={exportControl:So,exportControl_inner:Co,export:`ExportControl__export___LmV4c`}})))()}var Eo,Do,Oo;function ko(){return(ko=t((()=>{Eo=i(),w(),F(),To(),Do=o(),Oo=()=>{let{editor:e}=P(),[t,n]=(0,Eo.useState)(null);return(0,Eo.useEffect)(()=>{let t=()=>{n(e.exportProgress?{...e.exportProgress}:null)};return e.on(`update/export`,t),()=>{e.off(`update/export`,t)}},[e]),(0,Do.jsx)(`div`,{className:wo.exportControl,children:(0,Do.jsx)(`div`,{className:wo.exportControl_inner,children:(0,Do.jsx)(s,{label:`MP4`,accordion:!0,children:(0,Do.jsx)(`div`,{className:wo.export,children:(0,Do.jsx)(c,{onClick:()=>{e.isExporting||e.exportMP4()},children:t?`Exporting... ${Math.floor(t.current/t.total*100)}%`:`Export MP4`})})})})})},Oo.__docgenInfo={description:``,methods:[],displayName:`ExportControl`}})))()}var Ao,jo;function Mo(){return(Mo=t((()=>{Ao=i(),jo=(0,Ao.createContext)(null)})))()}var No,Po;function Fo(){return(Fo=t((()=>{No=i(),Mo(),Po=()=>{let e=(0,No.useContext)(jo);if(e===null)throw Error(`useOREngine must be used within a OREngineProvider`);return e}})))()}var Io,Lo,Ro,zo,Bo,Vo,Ho,Uo,Wo,Go,Ko,qo,Jo,Yo,Xo,Zo,Qo,$o,L;function es(){return(es=t((()=>{Io=`GPUTimer__container___LmNvb`,Lo=`GPUTimer__headerRow___LmNvb`,Ro=`GPUTimer__totalTime___LmNvb`,zo=`GPUTimer__toggleButton___LmNvb`,Bo=`GPUTimer__controls___LmNvb`,Vo=`GPUTimer__control___LmNvb`,Ho=`GPUTimer__controlLabel___LmNvb`,Uo=`GPUTimer__select___LmNvb`,Wo=`GPUTimer__input___LmNvb`,Go=`GPUTimer__group___LmNvb`,Ko=`GPUTimer__item___LmNvb`,qo=`GPUTimer__clickable___LmNvb`,Jo=`GPUTimer__itemRow___LmNvb`,Yo=`GPUTimer__itemName___LmNvb`,Xo=`GPUTimer__itemTime___LmNvb`,Zo=`GPUTimer__itemStats___LmNvb`,Qo=`GPUTimer__progressBar___LmNvb`,$o=`GPUTimer__progressFill___LmNvb`,L={container:Io,headerRow:Lo,totalTime:Ro,toggleButton:zo,controls:Bo,control:Vo,controlLabel:Ho,select:Uo,input:Wo,group:Go,item:Ko,clickable:qo,itemRow:Jo,itemName:Yo,itemTime:Xo,itemStats:Zo,progressBar:Qo,progressFill:$o}})))()}var ts,ns;function rs(){return(rs=t((()=>{ts=class{buffer;index;size;filled;constructor(e){this.size=e,this.buffer=Array(e),this.index=0,this.filled=!1}push(e){this.buffer[this.index]=e,this.index=(this.index+1)%this.size,!this.filled&&this.index===0&&(this.filled=!0)}getAverage(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=0;for(let n=0;n<e;n++)t+=this.buffer[n];return t/e}getMax(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]>t&&(t=this.buffer[n]);return t}getMin(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]<t&&(t=this.buffer[n]);return t}getCount(){return this.filled?this.size:this.index}},ns=class{buffers;windowSize;currentData;constructor(e=30){this.windowSize=e,this.buffers=new Map,this.currentData=new Map}update(e){let t=performance.now();for(let n=0;n<e.length;n++){let r=e[n],i=r.name.split(`/`),a=i[0]||`unknown`,o,s=i[i.length-1],c=s&&s.match(/\[([^\]]+)\]/);c&&(o=c[1]);let l={name:r.name,duration:r.duration,timestamp:t,renderType:a},u=this.buffers.get(r.name);u||(u=new ts(this.windowSize),this.buffers.set(r.name,u)),u.push(r.duration),this.currentData.set(r.name,{...l,entityId:o})}}getStatistics(){let e=[],t=0,n=performance.now(),r=[];return this.currentData.forEach((e,t)=>{n-e.timestamp>1e3&&r.push(t)}),r.forEach(e=>{this.currentData.delete(e)}),this.currentData.forEach(e=>{t+=e.duration}),this.currentData.forEach(n=>{let r=this.buffers.get(n.name);r&&e.push({name:n.name,renderType:n.renderType,entityId:n.entityId,current:n.duration,avg:r.getAverage(),max:r.getMax(),min:r.getMin(),samples:r.getCount(),percentage:t>0?n.duration/t*100:0})}),e}getTotalTime(){let e=0;return this.currentData.forEach(t=>{e+=t.duration}),e}}})))()}var is,R,as,os,ss,cs;function ls(){return(ls=t((()=>{is=i(),Fo(),F(),es(),rs(),R=o(),as=e=>{if(e<2){let t=e/2;return`rgb(${Math.floor(100+t*100)}, 200, 100)`}if(e<5){let t=(e-2)/3;return`rgb(200, ${Math.floor(200-t*50)}, 100)`}if(e<10){let t=(e-5)/5;return`rgb(200, ${Math.floor(150-t*80)}, ${Math.floor(100-t*50)})`}return`rgb(200, 70, 50)`},os=e=>e>=10?e.toFixed(1):e>=1?e.toFixed(2):e.toFixed(3),ss=e=>e.replace(/\[([^\]]{4,})\]/g,(e,t)=>`[${t.slice(0,3)}]`),cs=()=>{let{editor:e}=P(),{engine:t}=Po(),[n,r]=(0,is.useState)([]),[i,a]=(0,is.useState)(0),[o,s]=(0,is.useState)(`all`),[c,l]=(0,is.useState)(0),[u,d]=(0,is.useState)(`time`),[f,p]=(0,is.useState)(!1),m=(0,is.useRef)(new ns(30)),h=(0,is.useRef)(0),g=(0,is.useRef)(!1),_=(0,is.useRef)(0),v=(0,is.useCallback)(n=>{if(!n)return;let r=t.root.findEntityByUUID(n);r&&e.selectEntity(r)},[t,e]);(0,is.useEffect)(()=>{let e=t.renderer,n=m.current,i=e=>{f&&(n.update(e),g.current=!0)},o=e=>{g.current&&e-_.current>=300&&(r(n.getStatistics()),a(n.getTotalTime()),g.current=!1,_.current=e),h.current=requestAnimationFrame(o)};return e.on(`timer`,i),h.current=requestAnimationFrame(o),()=>{e.off(`timer`,i),cancelAnimationFrame(h.current)}},[t,f]);let y=n.filter(e=>!(o!==`all`&&e.renderType!==o||e.avg<c)),b=Array.from(new Set(n.map(e=>e.renderType))),x=[...y].sort((e,t)=>u===`time`?t.avg-e.avg:e.name.localeCompare(t.name)),S=i>0?Math.floor(1e3/i):0;return(0,R.jsxs)(`div`,{className:L.container,children:[(0,R.jsxs)(`div`,{className:L.headerRow,children:[(0,R.jsxs)(`span`,{className:L.totalTime,children:[os(i),`ms (`,S,`fps)`]}),(0,R.jsx)(`button`,{className:L.toggleButton,onClick:()=>p(!f),title:f?`Stop timer`:`Start timer`,children:f?`⏸`:`▶`})]}),(0,R.jsxs)(`div`,{className:L.controls,children:[(0,R.jsxs)(`div`,{className:L.control,children:[(0,R.jsx)(`span`,{className:L.controlLabel,children:`Type`}),(0,R.jsxs)(`select`,{className:L.select,value:o,onChange:e=>s(e.target.value),children:[(0,R.jsx)(`option`,{value:`all`,children:`All`}),b.map(e=>(0,R.jsx)(`option`,{value:e,children:e},e))]})]}),(0,R.jsxs)(`div`,{className:L.control,children:[(0,R.jsx)(`span`,{className:L.controlLabel,children:`Min`}),(0,R.jsx)(`input`,{className:L.input,type:`number`,min:`0`,step:`0.1`,value:c,onChange:e=>l(parseFloat(e.target.value)||0)})]}),(0,R.jsxs)(`div`,{className:L.control,children:[(0,R.jsx)(`span`,{className:L.controlLabel,children:`Sort`}),(0,R.jsxs)(`select`,{className:L.select,value:u,onChange:e=>d(e.target.value),children:[(0,R.jsx)(`option`,{value:`time`,children:`Time`}),(0,R.jsx)(`option`,{value:`name`,children:`Name`})]})]})]}),(0,R.jsx)(`div`,{className:L.group,children:x.map((e,t)=>{let n=as(e.avg),r=i>0?e.avg/i*100:0,a=!!e.entityId;return(0,R.jsxs)(`div`,{className:`${L.item} ${a?L.clickable:``}`,onClick:()=>v(e.entityId),children:[(0,R.jsxs)(`div`,{className:L.itemRow,children:[(0,R.jsx)(`span`,{className:L.itemName,title:e.name,children:ss(e.name)}),(0,R.jsx)(`span`,{className:L.itemTime,style:{color:n},children:os(e.avg)}),(0,R.jsx)(`span`,{className:L.itemStats,children:os(e.max)})]}),(0,R.jsx)(`div`,{className:L.progressBar,children:(0,R.jsx)(`div`,{className:L.progressFill,style:{width:`${r}%`,backgroundColor:n}})})]},e.name+t)})})]})},cs.__docgenInfo={description:``,methods:[],displayName:`Timer`}})))()}var us,ds,fs,ps,ms,hs,gs,_s,vs,ys,bs,xs,Ss;function Cs(){return(Cs=t((()=>{us=`HierarchyNode__node___Lm5vZ`,ds=`HierarchyNode__self_name___Lm5vZ`,fs=`HierarchyNode__self_name_input___Lm5vZ`,ps=`HierarchyNode__icon___Lm5vZ`,ms=`HierarchyNode__selectable___Lm5vZ`,hs=`HierarchyNode__self___Lm5vZ`,gs=`HierarchyNode__visibility___Lm5vZ`,_s=`HierarchyNode__menu___Lm5vZ`,vs=`HierarchyNode__fold___Lm5vZ`,ys=`HierarchyNode__fold_button___Lm5vZ`,bs=`HierarchyNode__child___Lm5vZ`,xs=`HierarchyNode__child_line___Lm5vZ`,Ss={node:us,self_name:ds,self_name_input:fs,icon:ps,selectable:ms,self:hs,visibility:gs,menu:_s,fold:vs,fold_button:ys,child:bs,child_line:xs}})))()}var ws,z,Ts;function Es(){return(Es=t((()=>{ws=i(),M(),w(),oa(),F(),Ga(),Cs(),z=o(),Ts=e=>{let{editor:t,engine:n}=P(),[r]=I(t,`selectedEntityId`),i=r!==void 0&&n.root.findEntityByUUID(r),o=!!(i&&i.uuid==e.entity.uuid),[s]=I(e.entity,`name`),[c,u]=I(e.entity,`visible`),[f,m]=I(t,`unselectableEntityIds`),[_]=I(e.entity,`children`),v=!(f||[]).includes(e.entity.uuid),y=(_||[]).map(e=>n.root.findEntityByUUID(e)).filter(e=>e!==void 0),b=e.depth||0,x=y&&y.concat().sort((e,t)=>e.name.localeCompare(t.name))||[],C=x.length>0,ee=b*20,te=e.entity.initiator==`script`,w=(0,ws.useMemo)(()=>e.entity.getComponent(Bt)?(0,z.jsx)(p,{size:14}):e.entity.getComponent(It)?(0,z.jsx)(l,{size:14}):e.entity.getComponent(A)?(0,z.jsx)(h,{size:14}):null,[e.entity]),ne=e.openNodes.has(e.entity.uuid),re=(0,ws.useCallback)(t=>{e.setNodeOpen(e.entity.uuid,!ne),t.stopPropagation()},[ne,e]),ie=(0,ws.useCallback)(()=>{t&&t.selectEntity(e.entity)},[t,e.entity]),ae=(0,ws.useCallback)(e=>{e.stopPropagation(),u&&u(!c)},[c,u]),ce=(0,ws.useCallback)(t=>{t.stopPropagation();let n=new Set(f||[]);v?n.add(e.entity.uuid):n.delete(e.entity.uuid),m(Array.from(n))},[v,f,m,e.entity.uuid]),[le,ue]=(0,ws.useState)(null),de=(0,ws.useRef)(!1),fe=(0,ws.useCallback)(()=>{te||ue(e.entity.name)},[te,e.entity]);(0,ws.useEffect)(()=>{let n=t=>{t===e.entity&&fe()};return t.on(`request/renameEntity`,n),()=>{t.off(`request/renameEntity`,n)}},[t,e.entity,fe]);let pe=(0,ws.useCallback)(e=>{e.key===`Enter`&&e.currentTarget.blur(),e.key===`Escape`&&(de.current=!0,e.currentTarget.blur())},[]),me=(0,ws.useCallback)(()=>{let n=de.current;if(de.current=!1,ue(null),n||le===null)return;let r=le.trim();r!==``&&r!==e.entity.name&&t.api.setField(e.entity,`name`,r)},[le,t,e.entity]),{open:he,closeAll:ge}=S(),_e=aa(e.entity),ve=(0,ws.useCallback)(n=>{n.preventDefault(),!(!t||te)&&(t.selectEntity(e.entity),he((0,z.jsx)(se,{title:e.entity.name,items:[{label:`Add Entity`,children:_e},{label:`Delete Entity`,onClick:()=>{t.api.deleteEntity(e.entity),ge()}}]}),T(n.clientX,n.clientY)))},[t,e.entity,he,ge,te,_e]),ye=(0,z.jsx)(`p`,{children:s||`-`});return le!==null&&(ye=(0,z.jsx)(`input`,{className:Ss.self_name_input,value:le,autoFocus:!0,onChange:e=>ue(e.target.value),onFocus:e=>e.currentTarget.select(),onKeyDown:pe,onBlur:me,onClick:e=>e.stopPropagation()})),(0,z.jsxs)(`div`,{className:Ss.node,"data-no_export":te,children:[(0,z.jsxs)(oe,{className:Ss.self,style:{paddingLeft:ee},onClick:ie,onContextMenu:ve,selected:o,children:[(0,z.jsx)(`div`,{className:Ss.fold,"data-hnode_open":ne,children:C&&(0,z.jsx)(`button`,{className:Ss.fold_button,onClick:re,children:(0,z.jsx)(a,{open:ne})})}),w&&(0,z.jsx)(`div`,{className:Ss.icon,children:w}),(0,z.jsx)(`div`,{className:Ss.self_name,onDoubleClick:fe,children:ye}),(0,z.jsx)(`button`,{className:Ss.selectable,onClick:ce,"data-selectable":v,children:(0,z.jsx)(d,{size:14,selectable:v})}),(0,z.jsx)(`button`,{className:Ss.visibility,onClick:ae,"data-visible":c!==!1,children:(0,z.jsx)(g,{size:14,visible:c!==!1})}),!te&&(0,z.jsx)(`button`,{className:Ss.menu,onClick:ve,children:`⋯`})]}),C&&(0,z.jsxs)(`div`,{className:Ss.child,"data-open":ne,children:[x.map(t=>(0,z.jsx)(Ts,{entity:t,depth:b+1,openNodes:e.openNodes,setNodeOpen:e.setNodeOpen},t.uuid)),(0,z.jsx)(`div`,{className:Ss.child_line,style:{marginLeft:ee+4}})]})]})},Ts.__docgenInfo={description:``,methods:[],displayName:`HierarchyNode`,props:{depth:{required:!1,tsType:{name:`number`},description:``},entity:{required:!0,tsType:{name:`MXP.Entity`},description:``},openNodes:{required:!0,tsType:{name:`Set`,elements:[{name:`string`}],raw:`Set<string>`},description:``},setNodeOpen:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( uuid: string, open: boolean ) => void`,signature:{arguments:[{type:{name:`string`},name:`uuid`},{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``}}}})))()}var Ds;function Os(){return(Os=t((()=>{Ds={}})))()}var ks,As,js,Ms,Ns,Ps;function Fs(){return(Fs=t((()=>{ks=i(),F(),Ga(),Es(),Os(),As=o(),js=`hierarchyOpenNodes`,Ms=()=>{try{let e=localStorage.getItem(js);if(e)return new Set(JSON.parse(e))}catch{}return new Set},Ns=e=>{localStorage.setItem(js,JSON.stringify(Array.from(e)))},Ps=()=>{let{editor:e,engine:t}=P(),[n]=I(e,`selectedEntityId`),r=t.root,[i,a]=(0,ks.useState)(Ms),o=(0,ks.useCallback)((e,t)=>{a(n=>{let r=new Set(n);return t?r.add(e):r.delete(e),Ns(r),r})},[]);return(0,ks.useEffect)(()=>{if(!n)return;let e=r.findEntityByUUID(n);if(!e)return;let t=[],i=e.parent;for(;i;)t.push(i.uuid),i=i.parent;a(e=>{if(t.every(t=>e.has(t)))return e;let n=new Set(e);return t.forEach(e=>n.add(e)),Ns(n),n})},[n,r]),(0,As.jsx)(`div`,{className:Ds.hierarchy,children:r&&(0,As.jsx)(Ts,{entity:r,openNodes:i,setNodeOpen:o})})},Ps.__docgenInfo={description:``,methods:[],displayName:`Hierarchy`}})))()}var Is,Ls;function Rs(){return(Rs=t((()=>{Is=`Canvas__container___LmNvb`,Ls={container:Is}})))()}var zs,Bs,Vs;function Hs(){return(Hs=t((()=>{zs=i(),F(),Rs(),Bs=o(),Vs=({viewportId:e})=>{let{engine:t,editor:n}=P(),r=(0,zs.useRef)(null);return(0,zs.useEffect)(()=>{let i=r.current;if(!t||!i)return;let a=n.createViewport(e,i);return()=>{a.dispose()}},[t,n,e]),(0,Bs.jsx)(`div`,{className:Ls.container,role:`presentation`,"aria-label":`3D Canvas`,children:(0,Bs.jsx)(`canvas`,{ref:r})})},Vs.__docgenInfo={description:``,methods:[],displayName:`Canvas`}})))()}var Us,Ws;function Gs(){return(Gs=t((()=>{Us=`AudioView__audioView___LmF1Z`,Ws={audioView:Us}})))()}var Ks;function qs(){return(qs=t((()=>{at(),O(),Ks=class extends tt{wrapperElm;canvas;canvasCtx;viewRangeFrame;viewPort;viewPortRange;musicBuffer;resizeObserver;frameSetting;framePlay;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];let e=window.localStorage.getItem(`audioViweRange`);this.viewRangeFrame=e?Number(e):2,this.frameSetting={duration:0,fps:60},this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){let e=new E(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=e.x,this.canvas.height=e.y}this.render()}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)]*1,s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]*1+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle=`#555`,this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(e){this.framePlay=e,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(e){this.viewRangeFrame=e,this.setFramePlaying(this.framePlay),localStorage.setItem(`audioViweRange`,String(this.viewRangeFrame))}setFrameSetting(e){this.frameSetting=e,this.render()}setMusicBuffer(e){this.musicBuffer=e,this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}},Ks.__docgenInfo={description:``,methods:[{name:`setWrapperElm`,docblock:null,modifiers:[],params:[{name:`elm`,optional:!1,type:{name:`HTMLElement`,alias:`HTMLElement`}}],returns:null},{name:`setFramePlaying`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`FramePlay`,alias:`FramePlay`}}],returns:null},{name:`setViewRangeFrame`,docblock:null,modifiers:[],params:[{name:`rangeFrame`,optional:!1,type:{name:`number`}}],returns:null},{name:`setFrameSetting`,docblock:null,modifiers:[],params:[{name:`frameSetting`,optional:!1,type:{name:`OREngineProjectFrame`,alias:`OREngineProjectFrame`}}],returns:null},{name:`setMusicBuffer`,docblock:null,modifiers:[],params:[{name:`buffer`,optional:!1,type:{name:`AudioBuffer`,alias:`AudioBuffer`}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`AudioViewRenderer`}})))()}var Js,Ys,Xs;function Zs(){return(Zs=t((()=>{Js=i(),F(),Gs(),qs(),Ys=o(),Xs=()=>{let{editor:e}=P(),t=(0,Js.useRef)(null),[n,r]=(0,Js.useState)();(0,Js.useEffect)(()=>{let e=new Ks;if(r(e),t.current)return e.setWrapperElm(t.current),()=>{e.dispose()}},[]);let i=e&&e.audioBuffer,[a,o]=(0,Js.useState)(),[s,c]=(0,Js.useState)({duration:0,fps:0}),[l,u]=(0,Js.useState)({current:0,playing:!1});(0,Js.useEffect)(()=>{if(!e)return;let t=e.engine,n=e=>{c({duration:e[`timeline/duration`],fps:e[`timeline/fps`]})},r=0,i=()=>{o(r++)},a=e=>{u({...e})};return n(t.serialize()),a(t.frame),t.on(`fields/update`,n),t.on(`update/music`,i),t.on(`update/frame/play`,a),()=>{t.off(`update/frame/setting`,n),t.off(`update/music`,i),t.off(`update/frame/play`,a)}},[e]),(0,Js.useEffect)(()=>{n&&i&&n.setMusicBuffer(i)},[n,i,a]),(0,Js.useEffect)(()=>{n&&l&&n.setFramePlaying(l)},[n,l]),(0,Js.useEffect)(()=>{n&&s&&n.setFrameSetting(s)},[n,s]);let d=(0,Js.useCallback)(e=>{if(n){let t=e.deltaY>0?1.1:.9;n.setViewRangeFrame(n.viewRangeFrame*t)}e.preventDefault()},[n]);return(0,Js.useEffect)(()=>{let e=t.current;return e&&e.addEventListener(`wheel`,d,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,d)}},[d]),(0,Ys.jsx)(`div`,{className:Ws.audioView,ref:t})},Xs.__docgenInfo={description:``,methods:[],displayName:`AudioView`}})))()}var Qs,$s,ec;function tc(){return(tc=t((()=>{Qs=`CameraPad__cameraPad___LmNhb`,$s=`CameraPad__btn___LmNhb`,ec={cameraPad:Qs,btn:$s}})))()}var nc,rc;function ic(){return(ic=t((()=>{F(),Ga(),tc(),nc=o(),rc=({viewportId:e})=>{let{editor:t}=P(),[n]=I(t,`selectedEntityId`),[r]=I(t,`viewports/${e}/cameraView`);return(0,nc.jsxs)(`div`,{className:ec.cameraPad,children:[(0,nc.jsx)(`div`,{className:ec.btn,"data-disabled":!n,onClick:()=>{n&&t.focusSelected()},title:`Focus selected ( . )`,children:`Focus`}),(0,nc.jsx)(`div`,{className:ec.btn,"data-active":r===`camera`,onClick:()=>{t.toggleCameraView()},title:`Toggle scene camera view ( 0 )`,children:`Scene Cam`})]})},rc.__docgenInfo={description:``,methods:[],displayName:`CameraPad`}})))()}var ac,oc,sc,cc,lc,uc,dc,fc,pc,mc,hc,gc,_c,vc,yc,bc,xc,Sc,Cc,wc,Tc,B;function Ec(){return(Ec=t((()=>{ac=`Screen__screen___LnNjc`,oc=`Screen__header___LnNjc`,sc=`Screen__header_tabs___LnNjc`,cc=`Screen__header_tab___LnNjc`,lc=`Screen__header_right___LnNjc`,uc=`Screen__header_item___LnNjc`,dc=`Screen__content___LnNjc`,fc=`Screen__gizmoMode___LnNjc`,pc=`Screen__gizmoMode_btn___LnNjc`,mc=`Screen__gizmoMode_separator___LnNjc`,hc=`Screen__modalStatus___LnNjc`,gc=`Screen__canvas___LnNjc`,_c=`Screen__audioViewHandle___LnNjc`,vc=`Screen__audioView___LnNjc`,yc=`Screen__displayOptions___LnNjc`,bc=`Screen__displayOptions_btn___LnNjc`,xc=`Screen__overlay___LnNjc`,Sc=`Screen__overlay_field___LnNjc`,Cc=`Screen__overlay_label___LnNjc`,wc=`Screen__overlay_separator___LnNjc`,Tc=`Screen__externalBtn___LnNjc`,B={screen:ac,header:oc,header_tabs:sc,header_tab:cc,header_right:lc,header_item:uc,content:dc,gizmoMode:fc,gizmoMode_btn:pc,gizmoMode_separator:mc,modalStatus:hc,canvas:gc,audioViewHandle:_c,audioView:vc,displayOptions:yc,displayOptions_btn:bc,overlay:xc,overlay_field:Sc,overlay_label:Cc,overlay_separator:wc,externalBtn:Tc}})))()}var Dc,V,Oc,kc;function Ac(){return(Ac=t((()=>{Dc=i(),w(),Ce(),F(),qi(),Hs(),Ri(),Ga(),Zs(),ic(),Ec(),V=o(),Oc=`viewport`,kc=({viewportId:e})=>{let{editor:t}=P(),n=Se(),[r,i]=I(t,`enableRender`),[a,o]=I(t,`viewports/${e}/preview`),[s,l]=I(t,`viewType`),[u,d]=I(t,`viewports/${e}/resolutionScale`),[f,p]=I(t,`gizmoMode`),[m,h]=I(t,`transformOrientation`),[g]=I(t,`modalStatus`),[_,v]=I(t,`viewports/${e}/helpers/show`),[y,b]=I(t,`viewports/${e}/helpers/empty`),[x,S]=I(t,`viewports/${e}/helpers/camera`),[C,ee]=I(t,`viewports/${e}/helpers/light`),[te,w]=I(t,`viewports/${e}/helpers/grid`),[ne,re]=I(t,`viewports/${e}/helpers/wireframe`),[T,ae]=I(t,`viewports/${e}/helpers/gizmo`),[oe,se]=I(t,`viewports/${e}/helpers/outline`),[ce]=Ki(`showAudioView`),[le,ue]=(0,Dc.useState)(50),de=(0,Dc.useRef)(null),[fe,pe]=(0,Dc.useState)(!1),me=(0,Dc.useRef)(null),he=(0,Dc.useCallback)(e=>{me.current&&!me.current.contains(e.target)&&pe(!1)},[]);return(0,Dc.useEffect)(()=>(fe&&document.addEventListener(`pointerdown`,he),()=>{document.removeEventListener(`pointerdown`,he)}),[fe,he]),(0,V.jsxs)(`div`,{className:B.screen,children:[(0,V.jsxs)(`div`,{className:B.header,children:[(0,V.jsx)(`div`,{className:B.header_tabs,children:(0,V.jsx)(`div`,{className:B.header_tab,"data-active":!!a,onClick:()=>o&&o(!a),title:`Camera Render`,children:(0,V.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 512 512`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`,children:(0,V.jsx)(`path`,{d:`M32 144 H336 V368 H32 Z M368 224 L480 152 V360 L368 288 Z`})})})}),(0,V.jsxs)(`div`,{className:B.header_right,children:[(0,V.jsx)(`div`,{className:B.header_item,children:(0,V.jsx)(ie,{title:`View`,children:(0,V.jsx)(Li,{value:s,format:{type:`select`,list:[`render`,`debug`]},onChange:e=>l&&l(e)})})}),(0,V.jsx)(`div`,{className:B.header_item,children:(0,V.jsx)(ie,{title:`Res`,children:(0,V.jsx)(Li,{value:u,format:{type:`select`,list:[,,,,,,].fill(0).map((e,t)=>{let n=2**t,r=1/n;return{value:r,label:r==1?`1`:`1/`+n}})},onChange:e=>d&&d(e)})})}),n.isPC&&(0,V.jsx)(`div`,{className:B.externalBtn,children:(0,V.jsx)(c,{onClick:()=>{t.openInExternalWindow()},children:(0,V.jsxs)(`svg`,{width:`32`,height:`12`,viewBox:`0 0 512 512`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,V.jsxs)(`g`,{clipPath:`url(#clip0_224_2)`,children:[(0,V.jsx)(`path`,{d:`M96 0V416H512V0H96ZM472 376H136V40H472V376Z`,fill:`#aaa`}),(0,V.jsx)(`path`,{d:`M40 472V296V136V96H0V512H416V472H376H40Z`,fill:`#aaa`}),(0,V.jsx)(`path`,{d:`M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z`,fill:`#aaa`})]}),(0,V.jsx)(`defs`,{children:(0,V.jsx)(`clipPath`,{id:`clip0_224_2`,children:(0,V.jsx)(`rect`,{width:`512`,height:`512`,fill:`white`})})})]})})})]})]}),(0,V.jsxs)(`div`,{className:B.content,children:[(0,V.jsxs)(`div`,{className:B.displayOptions,ref:me,children:[(0,V.jsx)(`div`,{className:B.displayOptions_btn,"data-active":fe,onClick:()=>pe(!fe),title:`Display Options`,children:`⚙`}),fe&&(0,V.jsxs)(`div`,{className:B.overlay,children:[(0,V.jsx)(`div`,{className:B.overlay_label,children:`Rendering`}),(0,V.jsx)(`div`,{className:B.overlay_field,children:(0,V.jsx)(ie,{title:`Render`,children:(0,V.jsx)(Li,{value:r,onChange:e=>i&&i(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_separator}),(0,V.jsx)(`div`,{className:B.overlay_label,children:`Helpers`}),(0,V.jsx)(`div`,{className:B.overlay_field,children:(0,V.jsx)(ie,{title:`Show`,children:(0,V.jsx)(Li,{value:_,onChange:e=>v&&v(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_field,"data-indent":`true`,children:(0,V.jsx)(ie,{title:`Empty`,children:(0,V.jsx)(Li,{value:y,onChange:e=>b&&b(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_field,"data-indent":`true`,children:(0,V.jsx)(ie,{title:`Camera`,children:(0,V.jsx)(Li,{value:x,onChange:e=>S&&S(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_field,"data-indent":`true`,children:(0,V.jsx)(ie,{title:`Light`,children:(0,V.jsx)(Li,{value:C,onChange:e=>ee&&ee(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_separator}),(0,V.jsx)(`div`,{className:B.overlay_field,children:(0,V.jsx)(ie,{title:`Grid`,children:(0,V.jsx)(Li,{value:te,onChange:e=>w&&w(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_field,children:(0,V.jsx)(ie,{title:`Wireframe`,children:(0,V.jsx)(Li,{value:ne,onChange:e=>re&&re(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_field,children:(0,V.jsx)(ie,{title:`Gizmo`,children:(0,V.jsx)(Li,{value:T,onChange:e=>ae&&ae(e)})})}),(0,V.jsx)(`div`,{className:B.overlay_field,children:(0,V.jsx)(ie,{title:`Outline`,children:(0,V.jsx)(Li,{value:oe,onChange:e=>se&&se(e)})})})]})]}),(0,V.jsxs)(`div`,{className:B.gizmoMode,children:[[`select`,`translate`,`rotate`,`scale`].map(e=>(0,V.jsx)(`div`,{className:B.gizmoMode_btn,"data-active":f===e,onClick:()=>p&&p(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`select`?`↖`:e===`translate`?`T`:e===`rotate`?`R`:`S`},e)),(0,V.jsx)(`div`,{className:B.gizmoMode_separator}),[`global`,`local`].map(e=>(0,V.jsx)(`div`,{className:B.gizmoMode_btn,"data-active":m===e,onClick:()=>h&&h(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`global`?`G`:`L`},e))]}),g&&(0,V.jsx)(`div`,{className:B.modalStatus,children:g}),(0,V.jsx)(`div`,{className:B.canvas,children:(0,V.jsx)(Vs,{viewportId:e})}),n.isSP&&(0,V.jsx)(rc,{viewportId:e}),n.isPC&&ce&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`div`,{className:B.audioViewHandle,onPointerDown:e=>{e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),de.current={startY:e.clientY,startHeight:le}},onPointerMove:e=>{if(!de.current)return;let t=de.current.startY-e.clientY,n=Math.max(20,Math.min(400,de.current.startHeight+t));ue(n)},onPointerUp:()=>{de.current=null}}),(0,V.jsx)(`div`,{className:B.audioView,style:{height:le},children:(0,V.jsx)(Xs,{})})]})]})]})},kc.__docgenInfo={description:``,methods:[],displayName:`Screen`}})))()}function jc(e,t){let n=e.get(t);if(n)return n;let r=t.indexOf(`:`);if(r===-1)return;let i=e.get(t.slice(0,r));return i?.multiple?i:void 0}function Mc(e){return e.slice(e.indexOf(`:`)+1)}function Nc(e){return e.multiple?`${e.id}:${rt.genUUID()}`:e.id}function Pc(e,t){return e.multiple?e.content(Mc(t)):e.content}function Fc(){return Wc(`vertical`,[{ratio:916/1076,node:Wc(`horizontal`,[{ratio:300/1912,node:Wc(`vertical`,[{ratio:696/912,node:Gc([`hierarchy`,`scene`])},{ratio:216/912,node:Gc([`timer`])}])},{ratio:1312/1912,node:Gc([`viewport:main`])},{ratio:300/1912,node:Gc([`property`,`textures`,`renderer`,`editor-settings`])}])},{ratio:160/1076,node:Gc([`timeline`,`export`])}])}function Ic(e){return e.type===`pane`?[e]:e.children.flatMap(e=>Ic(e.node))}function Lc(e,t){let n=new Set,r=new Set,i=e=>{let t=typeof e==`string`&&e!==``&&!n.has(e)?e:rt.genUUID();return n.add(t),t},a=e=>{if(typeof e!=`object`||!e)return null;let n=e;if(n.type===`pane`){if(!Array.isArray(n.tabs))return null;let e=[...new Set(n.tabs.filter(e=>typeof e==`string`))].filter(e=>{let n=t(e);return n?!n.multiple||!r.has(e)&&(r.add(e),!0):!1});if(e.length===0)return null;let a=typeof n.active==`string`&&e.includes(n.active)?n.active:e[0];return{type:`pane`,id:i(n.id),tabs:e,active:a}}if(n.type===`split`){if(n.direction!==`horizontal`&&n.direction!==`vertical`||!Array.isArray(n.children))return null;let e=[];return n.children.forEach(t=>{if(typeof t!=`object`||!t)return;let n=t,r=a(n.node);if(!r)return;let i=typeof n.ratio==`number`&&isFinite(n.ratio)&&n.ratio>0?n.ratio:1;e.push({ratio:i,node:r})}),e.length===0?null:e.length===1?e[0].node:{type:`split`,id:i(n.id),direction:n.direction,children:e}}return null},o=a(e);return o?Kc(o):null}function Rc(e,t,n){return qc(e,t,e=>e.type!==`pane`||!e.tabs.includes(n)?e:{...e,active:n})}function zc(e,t,n,r){return qc(e,t,e=>{if(e.type!==`pane`||e.tabs.includes(n))return e;let t=[...e.tabs];return t.splice(Math.max(0,Math.min(r??t.length,t.length)),0,n),{...e,tabs:t,active:n}})}function Bc(e,t,n,r,i){if(t===r)return qc(e,t,e=>{if(e.type!==`pane`)return e;let t=e.tabs.indexOf(n);if(t===-1)return e;let r=e.tabs.filter(e=>e!==n),a=i??e.tabs.length,o=Math.max(0,Math.min(t<a?a-1:a,r.length));return o===t?e:(r.splice(o,0,n),{...e,tabs:r,active:n})});let a=Ic(e),o=a.find(e=>e.id===t),s=a.find(e=>e.id===r);return!o||!s||!o.tabs.includes(n)||s.tabs.includes(n)?e:zc(Hc(e,t,n),r,n,i)}function Vc(e,t,n,r,i){let a=Ic(e),o=a.find(e=>e.id===r);if(!o||!o.tabs.includes(i)||!a.some(e=>e.id===t)||r===t&&o.tabs.length===1)return e;let s=Hc(e,r,i),c={type:`pane`,id:rt.genUUID(),tabs:[i],active:i},l=qc(s,t,e=>{let t=[{ratio:.5,node:c},{ratio:.5,node:e}];return(n===`right`||n===`bottom`)&&t.reverse(),{type:`split`,id:rt.genUUID(),direction:n===`left`||n===`right`?`horizontal`:`vertical`,children:t}});return l===s?e:Kc(l)??e}function Hc(e,t,n){let r=qc(e,t,e=>{if(e.type!==`pane`||!e.tabs.includes(n))return e;let t=e.tabs.indexOf(n),r=e.tabs.filter(e=>e!==n),i=e.active!==n||r.length===0?e.active:r[Math.min(t,r.length-1)];return{...e,tabs:r,active:i}});return r===e?e:Kc(r)??e}function Uc(e,t,n){return qc(e,t,e=>e.type!==`split`||e.children.length!==n.length?e:{...e,children:e.children.map((e,t)=>({...e,ratio:n[t]}))})}var Wc,Gc,Kc,qc;function Jc(){return(Jc=t((()=>{at(),Wc=(e,t)=>({type:`split`,id:rt.genUUID(),direction:e,children:t}),Gc=e=>({type:`pane`,id:rt.genUUID(),tabs:e,active:e[0]}),Kc=e=>{if(e.type===`pane`)return e.tabs.length>0?e:null;let t=[];if(e.children.forEach(n=>{let r=Kc(n.node);r&&(r.type===`split`&&r.direction===e.direction?r.children.forEach(e=>t.push({ratio:n.ratio*e.ratio,node:e.node})):t.push(r===n.node?n:{...n,node:r}))}),t.length===0)return null;if(t.length===1)return t[0].node;let n=t.reduce((e,t)=>e+t.ratio,0);return Math.abs(n-1)>1e-6?{...e,children:t.map(e=>({...e,ratio:e.ratio/n}))}:t.length!==e.children.length||t.some((t,n)=>t!==e.children[n])?{...e,children:t}:e},qc=(e,t,n)=>{if(e.id===t)return n(e);if(e.type===`split`){let r=!1,i=e.children.map(e=>{let i=qc(e.node,t,n);return i===e.node?e:(r=!0,{...e,node:i})});if(r)return{...e,children:i}}return e}})))()}function Yc(e,t,n){let[r,i]=(0,Xc.useState)(null),a=(0,Xc.useRef)(e);a.current=e;let o=(0,Xc.useRef)(t);o.current=t;let s=(0,Xc.useRef)(null);return(0,Xc.useEffect)(()=>()=>s.current?.(),[]),{dragState:r,onTabPointerDown:(e,t,r)=>{if(r.button!==0||s.current)return;let c=r.clientX,l=r.clientY,u=!1,d=null,f=r=>{if(r.buttons===0){p(!1);return}if(!u){if(Math.hypot(r.clientX-c,r.clientY-l)<Zc)return;u=!0,i({panelId:t,title:n(t)?.title??t,startX:r.clientX,startY:r.clientY,target:null})}let o=tl(r.clientX,r.clientY,a.current,e,t);nl(o,d)||(d=o,i(e=>e&&{...e,target:o}))},p=n=>{if(g(),n&&u&&d){let n=a.current;d.kind===`tabs`?o.current(Bc(n,e,t,d.paneId,d.index)):d.zone===`center`?o.current(Bc(n,e,t,d.paneId)):o.current(Vc(n,d.paneId,d.zone,e,t))}u&&i(null)},m=()=>p(!0),h=()=>p(!1),g=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,m),window.removeEventListener(`pointercancel`,h),s.current=null};s.current=g,window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,m),window.addEventListener(`pointercancel`,h)}}}var Xc,Zc,Qc,$c,el,tl,nl;function rl(){return(rl=t((()=>{Xc=i(),Jc(),Zc=4,Qc=.25,$c=(e,t)=>{let n={left:e.left,top:e.top,width:e.width,height:e.height};return(t===`left`||t===`right`)&&(n.width/=2),t===`right`&&(n.left+=n.width),(t===`top`||t===`bottom`)&&(n.height/=2),t===`bottom`&&(n.top+=n.height),n},el=(e,t,n,r,i)=>{if(n.id!==r&&n.tabs.includes(i))return null;let a=[...t.querySelectorAll(`[data-panel-tab-id]`)].filter(e=>e instanceof HTMLElement),o=a.length;for(let t=0;t<a.length;t++){let n=a[t].getBoundingClientRect();if(e<n.left+n.width/2){o=t;break}}let s=t.getBoundingClientRect(),c=o<a.length?a[o].getBoundingClientRect().left:a.length>0?a[a.length-1].getBoundingClientRect().right:s.left;return{kind:`tabs`,paneId:n.id,index:o,rect:{left:c-1,top:s.top,width:2,height:s.height}}},tl=(e,t,n,r,i)=>{let a=document.elementFromPoint(e,t);if(!a)return null;let o=a.closest(`[data-pane-id]`);if(!(o instanceof HTMLElement))return null;let s=Ic(n).find(e=>e.id===o.dataset.paneId);if(!s)return null;let c=a.closest(`[data-panel-tab-header]`);if(c instanceof HTMLElement)return el(e,c,s,r,i);let l=o.querySelector(`[data-panel-content]`);if(!(l instanceof HTMLElement))return null;let u=l.getBoundingClientRect();if(u.width<=0||u.height<=0)return null;let d=(e-u.left)/u.width,f=(t-u.top)/u.height;if(d<0||d>1||f<0||f>1)return null;if(Math.min(d,1-d)>Qc&&Math.min(f,1-f)>Qc)return s.id===r||s.tabs.includes(i)?null:{kind:`zone`,paneId:s.id,zone:`center`,rect:$c(u,`center`)};if(s.id===r&&s.tabs.length===1)return null;let p=d-.5,m=f-.5,h=Math.abs(p)>=Math.abs(m)?p<0?`left`:`right`:m<0?`top`:`bottom`;return{kind:`zone`,paneId:s.id,zone:h,rect:$c(u,h)}},nl=(e,t)=>e===null||t===null?e===t:e.paneId===t.paneId?e.kind===`tabs`&&t.kind===`tabs`?e.index===t.index:e.kind===`zone`&&t.kind===`zone`&&e.zone===t.zone:!1})))()}var il,al;function ol(){return(ol=t((()=>{il=`PanelLayout__pane___LnBhb`,al={pane:il}})))()}function sl(e,t){let n=[];for(let r of e){let e=n;if(r.category)for(let t of r.category.split(`/`)){if(t===``)continue;let n;for(let r of e)if(r.label===t&&`children`in r){n=r;break}n||(n={label:t,children:[]},e.push(n)),e=n.children}e.push({label:r.title,onClick:()=>t(r)})}return n}var cl,ll,ul,dl;function fl(){return(fl=t((()=>{cl=i(),w(),F(),Ac(),Ga(),ue(),rl(),ol(),Jc(),ll=o(),ul=e=>{let t=e.node;if(t.type===`split`)return(0,ll.jsx)(ae,{direction:t.direction,ratios:t.children.map(e=>e.ratio),onRatiosChange:n=>e.onRatiosChange(t.id,n),children:t.children.map(t=>(0,ll.jsx)(ae.Item,{children:(0,ll.jsx)(ul,{...e,node:t.node})},t.node.id))});let n=t.tabs.flatMap(t=>{let n=e.resolve(t);return n?[{id:t,title:n.title,content:Pc(n,t)}]:[]});if(n.length===0)return null;let r=e.hasAddable(t);return(0,ll.jsx)(`div`,{className:al.pane,"data-pane-id":t.id,children:(0,ll.jsx)(le,{tabs:n,active:t.active,onSelect:n=>e.onSelectTab(t.id,n),onTabContextMenu:(n,r)=>e.onTabContextMenu(t.id,n,r),onTabPointerDown:(n,r)=>e.onTabPointerDown(t.id,n,r),onAddClick:r?n=>e.onAddTab(t.id,n):void 0})})},dl=e=>{let{editor:t}=P(),{open:n,closeAll:r}=S(),i=(0,cl.useMemo)(()=>{let t=new Map;return e.panels.forEach(e=>t.set(e.id,e)),t},[e.panels]),a=(0,cl.useMemo)(()=>e=>jc(i,e),[i]),[o,s]=I(t,`panelLayout`),c=(0,cl.useMemo)(()=>Lc(o,a)??Fc(),[o,a]);(0,cl.useEffect)(()=>{let e=new Set(Ic(c).flatMap(e=>e.tabs).filter(e=>a(e)?.id===Oc).map(Mc));t.pruneViewportSettings(e)},[c,a,t]);let l=e=>{e!==c&&s(e)},u=(e,t)=>l(Rc(c,e,t)),d=(e,t)=>l(Uc(c,e,t)),{dragState:f,onTabPointerDown:p}=Yc(c,l,a),m=e=>[...i.values()].filter(t=>t.multiple||!e.tabs.includes(t.id));return(0,ll.jsxs)(ll.Fragment,{children:[(0,ll.jsx)(ul,{node:c,resolve:a,onSelectTab:u,onRatiosChange:d,onTabContextMenu:(e,t,i)=>{i.preventDefault(),Ic(c).reduce((e,t)=>e+t.tabs.length,0)>1&&n((0,ll.jsx)(se,{title:a(t)?.title,items:[{label:`Close Tab`,onClick:()=>{l(Hc(c,e,t)),r()}}]}),T(i.clientX,i.clientY))},onTabPointerDown:p,onAddTab:(e,t)=>{let i=Ic(c).find(t=>t.id===e);if(!i)return;let a=m(i);if(a.length===0)return;let o=sl(a,t=>{l(zc(c,e,Nc(t))),r()});n((0,ll.jsx)(se,{items:o}),T(t.clientX,t.clientY))},hasAddable:e=>m(e).length>0}),f&&(0,ll.jsx)(de,{drag:f})]})},dl.__docgenInfo={description:``,methods:[],displayName:`PanelLayout`,props:{panels:{required:!0,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
} & (
	// レイアウト内に同時1つまで。Panel ラッパー込みの完成形を持つ
	| { multiple?: false; content: React.ReactNode }
	// 「+」で追加するたびに "<id>:<instance>" のタブが新しく増える（Screen 用。タブごとに独立したビューポートを持つ）
	| { multiple: true; content: ( instanceId: string ) => React.ReactNode }
)`,elements:[{name:`signature`,type:`object`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`category`,value:{name:`string`,required:!1}}]}},{name:`unknown`}]}],raw:`PanelDefinition[]`},description:``}}}})))()}var pl,ml,hl;function gl(){return(gl=t((()=>{pl=`RendererSettings__renderer___LnJlb`,ml=`RendererSettings__renderer_inner___LnJlb`,hl={renderer:pl,renderer_inner:ml}})))()}var _l,vl;function yl(){return(yl=t((()=>{w(),F(),Wa(),gl(),_l=o(),vl=()=>{let{editor:e}=P(),t=e.engine.renderer;return(0,_l.jsx)(`div`,{className:hl.renderer,children:(0,_l.jsxs)(`div`,{className:hl.renderer_inner,children:[(0,_l.jsx)(s,{label:`Resolution`,accordion:!0,children:(0,_l.jsx)(Ua,{target:e,filter:`resolution`})}),(0,_l.jsx)(s,{label:`Pipeline`,accordion:!0,children:(0,_l.jsx)(Ua,{target:t,filter:`pipeline`})}),(0,_l.jsx)(s,{label:`Sky`,accordion:!0,children:(0,_l.jsx)(Ua,{target:t,filter:`sky`})})]})})},vl.__docgenInfo={description:``,methods:[],displayName:`RendererSettings`}})))()}var bl,xl,Sl,Cl,wl,Tl;function El(){return(El=t((()=>{bl=`SceneControl__sceneControl___LnNjZ`,xl=`SceneControl__sceneControl_inner___LnNjZ`,Sl=`SceneControl__select___LnNjZ`,Cl=`SceneControl__select_name___LnNjZ`,wl=`SceneControl__save___LnNjZ`,Tl={sceneControl:bl,sceneControl_inner:xl,select:Sl,select_name:Cl,save:wl}})))()}var Dl,Ol,kl;function Al(){return(Al=t((()=>{Dl=i(),w(),F(),fe(),El(),Ol=o(),kl=()=>{let{editor:e,projectName:t,scenes:n}=P(),[r,i]=(0,Dl.useState)(null),o=null;return n&&(o=(0,Ol.jsx)(ie,{title:`scene`,children:(0,Ol.jsxs)(`button`,{className:Tl.select,onClick:e=>{i(T(e.clientX,e.clientY))},children:[(0,Ol.jsx)(`span`,{className:Tl.select_name,children:n.current??`-`}),(0,Ol.jsx)(a,{open:!0})]})})),(0,Ol.jsxs)(`div`,{className:Tl.sceneControl,children:[(0,Ol.jsx)(`div`,{className:Tl.sceneControl_inner,children:(0,Ol.jsxs)(s,{label:t,accordion:!0,children:[o,(0,Ol.jsx)(`div`,{className:Tl.save,children:(0,Ol.jsx)(c,{onClick:()=>{e.save()},children:`Save`})})]})}),r&&n&&(0,Ol.jsx)(pe,{scenes:n,projectName:t,anchor:r,onClose:()=>{i(null)}})]})},kl.__docgenInfo={description:``,methods:[],displayName:`SceneControl`}})))()}var jl,Ml,Nl,Pl,Fl,Il,Ll;function Rl(){return(Rl=t((()=>{jl=`Textures__textures___LnRle`,Ml=`Textures__item___LnRle`,Nl=`Textures__preview___LnRle`,Pl=`Textures__img___LnRle`,Fl=`Textures__placeholder___LnRle`,Il=`Textures__name___LnRle`,Ll={textures:jl,item:Ml,preview:Nl,img:Pl,placeholder:Fl,name:Il}})))()}var zl,Bl,Vl;function Hl(){return(Hl=t((()=>{zl=i(),mi(),F(),Rl(),Bl=o(),Vl=()=>{let{engine:e,editor:t}=P(),[,n]=(0,zl.useState)(0);(0,zl.useEffect)(()=>{let e=()=>{t.assetPreviewManager?.invalidateAll(),n(e=>e+1)},r=()=>n(e=>e+1);return N.resources.on(`update`,e),t.assetPreviewManager?.on(`update`,r),()=>{N.resources.off(`update`,e),t.assetPreviewManager?.off(`update`,r)}},[e,t]);let r=N.resources.textureList;return(0,Bl.jsx)(`div`,{className:Ll.textures,children:r.map(e=>{let n=t.assetPreviewManager?.getTexturePreview(e.name);return(0,Bl.jsxs)(`div`,{className:Ll.item,children:[(0,Bl.jsx)(`div`,{className:Ll.preview,children:n?(0,Bl.jsx)(`img`,{src:n,className:Ll.img}):(0,Bl.jsx)(`div`,{className:Ll.placeholder})}),(0,Bl.jsx)(`div`,{className:Ll.name,children:e.name})]},e.name)})})},Vl.__docgenInfo={description:``,methods:[],displayName:`Textures`}})))()}var Ul,Wl;function Gl(){return(Gl=t((()=>{Ul=i(),Wl=(0,Ul.createContext)(null)})))()}var Kl,ql;function Jl(){return(Jl=t((()=>{Kl=i(),Gl(),ql=()=>{let e=(0,Kl.useContext)(Wl);if(e===null)throw Error(`useTimeline must be used within a TimelineProvider`);return e}})))()}var Yl;function Xl(){return(Xl=t((()=>{Yl=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var Zl;function Ql(){return(Ql=t((()=>{at(),qe(),O(),M(),Xl(),Zl=class extends tt{wrapperElm;glCanvas;backend;gl;canvasTexture;canvas;canvasCtx;glRenderer;postProcess;viewPort;viewPortRange;viewPortScale;frameSetting;loopSetting;musicBuffer;musicTexture;resizeObserver;canvasSize;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.glCanvas=document.createElement(`canvas`),this.backend=new Je(this.glCanvas.getContext(`webgl2`)),this.gl=this.backend.gl,this.canvasSize=new E(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.frameSetting=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this));let e={renderer:null,createEntity:t=>new Jt({...t,engine:e})};this.glRenderer=new Vr(this.backend,e),e.renderer=this.glRenderer,this.canvasTexture=new ze(this.gl),this.musicBuffer=null,this.musicTexture=new ze(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new _n({passes:[new j(this.backend,{frag:Yl,uniforms:{uCanvasTex:{type:`1i`,value:null},uMusicTex:{type:`1i`,value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){let e=new E(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);if(e.x===0||e.y===0)return;this.glCanvas.width=this.canvas.width=e.x,this.glCanvas.height=this.canvas.height=e.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(e),this.render()}}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.frameSetting){this.canvasCtx.fillStyle=`#181818`;let e=this.frameToPx(0),t=this.frameToPx(this.frameSetting.duration);this.canvasCtx.fillRect(e,0,t-e,this.canvas.height)}let e=(e,t,n)=>{let r=Math.ceil(this.viewPort[0]/e)*e;this.canvasCtx.beginPath();let i=0;for(;r<this.viewPort[2]&&i<100;){let n=this.frameToPx(r+t);this.canvasCtx.moveTo(n,0),this.canvasCtx.lineTo(n,this.canvas.height),r+=e,i++}this.canvasCtx.strokeStyle=n,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(e(this.viewPortScale,0,`#555`),e(this.viewPortScale,this.viewPortScale/2,`#333`),this.musicBuffer&&this.frameSetting){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/this.frameSetting.fps,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)],s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle=`#0009`;let e=this.frameToPx(this.loopSetting.start),t=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,e,this.canvas.height),this.canvasCtx.fillRect(t,0,this.canvas.width-t,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess.passes&&(this.postProcess.passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(e,t){this.viewPort=e,this.viewPortRange=[e[2]-e[0],e[3]-e[1]],this.viewPortScale=t,this.render()}setFrameSetting(e){this.frameSetting={duration:Math.round(e.duration),fps:Math.round(e.fps)},this.render()}setMusicBuffer(e){this.musicBuffer=e,setTimeout(()=>{this.render()},100)}setLoopSetting(e,t,n){this.loopSetting={enabled:e,start:t,end:n},this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}},Zl.__docgenInfo={description:``,methods:[{name:`setWrapperElm`,docblock:null,modifiers:[],params:[{name:`elm`,optional:!1,type:{name:`HTMLElement`,alias:`HTMLElement`}}],returns:null},{name:`setViewPort`,docblock:null,modifiers:[],params:[{name:`viewPort`,optional:!1,type:{name:`Array`,elements:[{name:`number`}],raw:`number[]`}},{name:`scale`,optional:!1,type:{name:`number`}}],returns:null},{name:`setFrameSetting`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`OREngineProjectFrame`,alias:`OREngineProjectFrame`}}],returns:null},{name:`setMusicBuffer`,docblock:null,modifiers:[],params:[{name:`buffer`,optional:!1,type:{name:`AudioBuffer`,alias:`AudioBuffer`}}],returns:null},{name:`setLoopSetting`,docblock:null,modifiers:[],params:[{name:`enabled`,optional:!1,type:{name:`boolean`}},{name:`start`,optional:!1,type:{name:`number`}},{name:`end`,optional:!1,type:{name:`number`}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`TimelineCanvasRenderer`}})))()}var $l,eu;function tu(){return(tu=t((()=>{$l=`TimelineCanvas__timelineCanvas___LnRpb`,eu={timelineCanvas:$l}})))()}var nu,ru,iu;function au(){return(au=t((()=>{nu=i(),Ga(),Jl(),Ql(),tu(),ru=o(),iu=()=>{let{viewPort:e,viewPortScale:t,musicBuffer:n,musicBufferVersion:r,glEditor:i}=ql(),[a,o]=(0,nu.useState)(),s=(0,nu.useRef)(null);(0,nu.useEffect)(()=>{let e=new Zl;return o(e),s.current&&e.setWrapperElm(s.current),()=>{e.dispose()}},[]),(0,nu.useEffect)(()=>{a&&e&&t&&a.setViewPort(e,t)},[a,e,t]);let[c]=I(i?.engine,`timeline/duration`),[l]=I(i?.engine,`timeline/fps`);(0,nu.useEffect)(()=>{a&&c&&l&&a.setFrameSetting({duration:c||0,fps:l||0})},[a,c,l]);let[u]=I(i,`frameLoop/enabled`),[d]=I(i,`frameLoop/start`),[f]=I(i,`frameLoop/end`);return(0,nu.useEffect)(()=>{a&&a.setLoopSetting(u||!1,d||0,f||0)},[a,u,d,f]),(0,nu.useEffect)(()=>{a&&n&&a.setMusicBuffer(n)},[a,n,r]),(0,ru.jsx)(`div`,{className:eu.timelineCanvas,ref:s})},iu.__docgenInfo={description:``,methods:[],displayName:`TimelineCanvas`}})))()}var ou,su;function cu(){return(cu=t((()=>{ou=`TimelineControls__controls___LmNvb`,su={controls:ou}})))()}var lu,uu,du;function fu(){return(fu=t((()=>{lu=e(i(),1),Jl(),cu(),uu=o(),du=e=>{let{viewPort:t,setCurrentFrame:n,getFrameViewPort:r,zoom:i,scroll:a,setViewPortCenter:o}=ql(),s=(0,lu.useRef)([0,0,0,0]),c=(0,lu.useRef)([0,0]);t&&(s.current=t,c.current=[t[2]-t[0],t[3]-t[1]]);let l=(0,lu.useRef)(null),u=(0,lu.useRef)(null),d=(0,lu.useRef)(null),f=(0,lu.useRef)(null),p=(0,lu.useRef)(null),m=(0,lu.useCallback)(e=>{let t=l.current&&l.current.clientWidth||1;if(d.current==0){if(n&&r&&u.current){let i=(e.clientX-u.current.left)/t;n(r(i))}}else if(d.current==1){let n=[e.clientX,e.clientY];if(f.current&&p.current){let e=-(n[0]-f.current[0])/t*c.current[0];o&&o(p.current+e)}}},[n,r,o]),h=(0,lu.useCallback)(e=>{d.current=e.button,p.current=(s.current[2]+s.current[0])/2,f.current=[e.clientX,e.clientY],u.current=e.currentTarget.getBoundingClientRect();let t=(e.clientX-u.current.left)/e.currentTarget.clientWidth;d.current==0&&n&&r&&n(r(t)),window.addEventListener(`pointermove`,m);let i=()=>{f.current=null,d.current=null,p.current=null,window.removeEventListener(`pointermove`,m)};return window.addEventListener(`pointerup`,i),()=>{window.removeEventListener(`pointerup`,i),window.removeEventListener(`pointermove`,m)}},[r,n,m]),g=(0,lu.useCallback)(e=>{if(d.current!==null||!i||!a)return;e.preventDefault();let t=e.target&&e.target.clientWidth||1,n=Math.abs(e.deltaY);Math.abs(e.deltaX)<n?i(n>50?e.deltaY<0?.9:1.1:1+e.deltaY*.005):a(e.deltaX/t*.5)},[i,a]);return(0,lu.useEffect)(()=>{let e=l.current;return e&&e.addEventListener(`wheel`,g,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,g)}},[g]),t?(0,uu.jsx)(`div`,{className:su.controls,onPointerDown:h,ref:l,children:e.children}):null},du.__docgenInfo={description:``,methods:[],displayName:`TimelineControls`,props:{children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})))()}var pu,mu,hu;function gu(){return(gu=t((()=>{pu=`TimelineCursor__cursor___LmN1c`,mu=`TimelineCursor__frame___LmN1c`,hu={cursor:pu,frame:mu}})))()}var _u,vu;function yu(){return(yu=t((()=>{Jl(),gu(),_u=o(),vu=()=>{let{viewPort:e,framePlay:t}=ql();if(!e||!t)return null;let n=e[2]-e[0],r=(t.current-e[0])/n;return(0,_u.jsx)(`div`,{className:hu.cursor,style:{left:r*100+`%`},children:(0,_u.jsx)(`div`,{className:hu.frame})})},vu.__docgenInfo={description:``,methods:[],displayName:`TimelineCursor`}})))()}var bu,xu,Su,Cu;function wu(){return(wu=t((()=>{bu=`TimelineLoop__timelineLoop___LnRpb`,xu=`TimelineLoop__start___LnRpb`,Su=`TimelineLoop__end___LnRpb`,Cu={timelineLoop:bu,start:xu,end:Su}})))()}var Tu,Eu;function Du(){return(Du=t((()=>{Tu=`TimelineLoopCursor__cursor___LmN1c`,Eu={cursor:Tu}})))()}var Ou,ku,Au;function ju(){return(ju=t((()=>{Ou=i(),Du(),ku=o(),Au=({onMove:e})=>{let t=(0,Ou.useRef)(!1);return(0,ku.jsx)(`div`,{className:Eu.cursor,onPointerDown:e=>{e.buttons==1&&(t.current=!0,e.stopPropagation())},onPointerMove:n=>{let r=n.target;t.current!==!1&&n.buttons==1&&(r.setPointerCapture(n.pointerId),n.buttons==1&&e&&e(n.clientX),n.nativeEvent.preventDefault(),n.nativeEvent.stopPropagation())},onPointerUp:()=>{t.current=!1}})},Au.__docgenInfo={description:``,methods:[],displayName:`TimelineLoopCursor`}})))()}var Mu,Nu,Pu;function Fu(){return(Fu=t((()=>{Mu=i(),Ga(),ga(),Jl(),wu(),ju(),Nu=o(),Pu=()=>{let{viewPort:e,framePlay:t,glEditor:n}=ql(),r=(0,Mu.useRef)(null);ha(n,[`frameLoop/enabled`,`frameLoop/start`,`frameLoop/end`]);let[i]=I(n,`frameLoop/enabled`),[a,o]=I(n,`frameLoop/start`),[s,c]=I(n,`frameLoop/end`);if(i!==!0||!e||!t||a===void 0||s===void 0)return null;let l=e[2]-e[0],u=(a-e[0])/l,d=(s-e[0])/l,f=(t,n)=>{let r=t.getBoundingClientRect();return(n-r.x)/r.width*(e[2]-e[0])+e[0]};return(0,Nu.jsx)(`div`,{className:Cu.timelineLoop,ref:r,children:(0,Nu.jsxs)(`div`,{className:Cu.timelineLoop_inner,children:[(0,Nu.jsx)(`div`,{className:Cu.start,style:{left:u*100+`%`},children:(0,Nu.jsx)(Au,{onMove:e=>{r.current&&o&&o(f(r.current,e))}})}),(0,Nu.jsx)(`div`,{className:Cu.end,style:{left:d*100+`%`},children:(0,Nu.jsx)(Au,{onMove:e=>{r.current&&c&&c(f(r.current,e))}})})]})})},Pu.__docgenInfo={description:``,methods:[],displayName:`TimelineLoop`}})))()}var Iu,Lu,Ru,zu,Bu,Vu;function Hu(){return(Hu=t((()=>{Iu=`TimelineScale__scale___LnNjY`,Lu=`TimelineScale__scale_inner___LnNjY`,Ru=`TimelineScale__scale_item___LnNjY`,zu=`TimelineScale__scale_item_frame___LnNjY`,Bu=`TimelineScale__scale_item_time___LnNjY`,Vu={scale:Iu,scale_inner:Lu,scale_item:Ru,scale_item_frame:zu,scale_item_time:Bu}})))()}var Uu,Wu,Gu;function Ku(){return(Ku=t((()=>{Ga(),Jl(),Hu(),Uu=o(),Wu=e=>`${(`00`+Math.floor(e%3600/60)).slice(-2)}:${(`00`+Math.floor(e%60)).slice(-2)}`,Gu=()=>{let{glEditor:e,viewPort:t,viewPortScale:n}=ql(),[r,i]=I(e?.engine,`timeline/fps`);if(!t||!n||r===void 0)return null;let a=[],o=Math.ceil(t[0]/n)*n,s=0;for(;o<t[2]&&s<100;){let e=(o-t[0])/(t[2]-t[0]),i=o/(r||0);a.push((0,Uu.jsxs)(`div`,{className:Vu.scale_item,style:{left:e*100+`%`},children:[(0,Uu.jsx)(`div`,{className:Vu.scale_item_frame,children:o}),(0,Uu.jsx)(`div`,{className:Vu.scale_item_time,children:Wu(i)})]},o)),o+=n,s++}return(0,Uu.jsx)(`div`,{className:Vu.scale,children:(0,Uu.jsx)(`div`,{className:Vu.scale_inner,children:a})})},Gu.__docgenInfo={description:``,methods:[],displayName:`TimelineScale`}})))()}var qu,Ju,Yu;function Xu(){return(Xu=t((()=>{qu=`TimelineSetting__timelineSetting___LnRpb`,Ju=`TimelineSetting__play___LnRpb`,Yu={timelineSetting:qu,play:Ju}})))()}var Zu,Qu,$u;function ed(){return(ed=t((()=>{Zu=i(),w(),Ri(),Ga(),Jl(),Xu(),Qu=o(),$u=()=>{let{framePlay:e,glEditor:t}=ql(),n=(0,Zu.useCallback)((e,t)=>{t&&t(e)},[]),[r,i]=I(t,`frameLoop/enabled`),[a]=I(t?.engine,`timeline/duration`),[o]=I(t?.engine,`timeline/fps`),s=(0,Zu.useCallback)((e,n)=>{t&&t.api.setField(t.engine,e,n)},[t]),l=(0,Zu.useCallback)(()=>{t&&t.togglePlay()},[t]);return(0,Qu.jsx)(`div`,{className:Yu.timelineSetting,children:(0,Qu.jsxs)(ce,{children:[(0,Qu.jsx)(`div`,{className:Yu.play,children:(0,Qu.jsx)(c,{onClick:l,children:e.playing?(0,Qu.jsx)(f,{size:14}):(0,Qu.jsx)(m,{size:14})})}),(0,Qu.jsx)(ie,{title:`current`,children:(0,Qu.jsx)(Li,{value:Math.floor(e?.current||0),readOnly:!0})}),(0,Qu.jsx)(ie,{title:`duration`,children:(0,Qu.jsx)(Li,{value:a,onChange:e=>s(`timeline/duration`,e)})}),(0,Qu.jsx)(ie,{title:`fps`,children:(0,Qu.jsx)(Li,{value:o,onChange:e=>s(`timeline/fps`,e)})}),(0,Qu.jsx)(ie,{title:`loop`,children:(0,Qu.jsx)(Li,{value:r||!1,onChange:e=>n(e,i)})})]})})},$u.__docgenInfo={description:``,methods:[],displayName:`TimelineSetting`}})))()}var td,nd,rd,id,ad;function od(){return(od=t((()=>{td=`Timeline__timeline___LnRpb`,nd=`Timeline__inner___LnRpb`,rd=`Timeline__content___LnRpb`,id=`Timeline__setting___LnRpb`,ad={timeline:td,inner:nd,content:rd,setting:id}})))()}var sd,cd;function ld(){return(ld=t((()=>{sd=i(),F(),cd=()=>{let{editor:e}=P(),[t,n]=(0,sd.useState)({current:0,playing:!1}),[r,i]=(0,sd.useState)([0,0,100,0]),a=(0,sd.useRef)([0,0,0,0]);a.current=r;let o=r[2]-r[0],s=10*2**(0+Math.floor(Math.log2(o/100)));s=Math.max(1,Math.floor(s));let c=e?.audioBuffer,[l,u]=(0,sd.useState)();(0,sd.useEffect)(()=>{if(e){let t=e.engine,r=e=>{n({...e})};r(t.frame);let a=0,o=()=>{u(a++)},s=()=>{i([0,0,t.frameSetting.duration,0])};return s(),t.on(`update/frame/play`,r),t.on(`update/music`,o),t.on(`loaded`,s),()=>{t.off(`update/frame/play`,r),t.off(`update/music`,o),t.off(`loaded`,s)}}},[e]);let d=(0,sd.useCallback)(t=>{e&&e.engine.seek(t)},[e]),f=(0,sd.useCallback)(e=>{let t=r[2]-r[0];return Math.floor(r[0]+t*e)},[r]),p=(0,sd.useCallback)(e=>{let t=a.current,n=(t[2]+t[0])/2,r=(t[0]-n)*e+n,o=(t[2]-n)*e+n;i([r,t[1],o,t[3]])},[]),m=(0,sd.useCallback)(e=>{let t=a.current,n=e*(t[2]-t[0]);i([t[0]+n,t[1],t[2]+n,t[3]])},[]),h=(0,sd.useCallback)(e=>{let t=a.current,n=t[2]-t[0];i([e-n/2,t[1],e+n/2,t[3]])},[]);return{glEditor:e,framePlay:t,viewPort:r,viewPortScale:s,musicBuffer:c,musicBufferVersion:l,setCurrentFrame:d,getFrameViewPort:f,zoom:p,scroll:m,setViewPortCenter:h}}})))()}var ud,dd;function fd(){return(fd=t((()=>{Gl(),ld(),ud=o(),dd=e=>{let t=cd();return(0,ud.jsx)(Wl.Provider,{value:t,children:e.children})},dd.__docgenInfo={description:``,methods:[],displayName:`TimelineProvider`}})))()}var pd,md;function hd(){return(hd=t((()=>{au(),fu(),yu(),Fu(),Ku(),ed(),od(),fd(),pd=o(),md=()=>(0,pd.jsx)(dd,{children:(0,pd.jsx)(`div`,{className:ad.timeline,children:(0,pd.jsxs)(`div`,{className:ad.inner,children:[(0,pd.jsx)(`div`,{className:ad.setting,children:(0,pd.jsx)($u,{})}),(0,pd.jsxs)(`div`,{className:ad.content,children:[(0,pd.jsx)(iu,{}),(0,pd.jsx)(vu,{}),(0,pd.jsx)(du,{children:(0,pd.jsx)(Pu,{})}),(0,pd.jsx)(Gu,{})]})]})})}),md.__docgenInfo={description:``,methods:[],displayName:`Timeline`}})))()}var gd,_d;function vd(){return(vd=t((()=>{gd=`OREditor__editor___LmVka`,_d={editor:gd}})))()}var H,yd,bd;function xd(){return(xd=t((()=>{H=class extends Error{candidates;constructor(e,t){super(e),this.candidates=t}},yd=(e,t,n)=>{let r=e.args[t];if(r===void 0)throw new H(`引数が足りません。使い方: ${n}`);return r},bd=e=>e instanceof Error?e.message:String(e)})))()}var Sd,Cd;function wd(){return(wd=t((()=>{Sd=[],Cd=()=>Sd})))()}var Td,Ed,Dd,Od,kd,Ad,jd,Md;function Nd(){return(Nd=t((()=>{O(),M(),ci(),xd(),Td=e=>{let t=[],n=e;for(;n;)t.unshift(n.name),n=n.parent;return t.join(`/`)},Ed=(e,t)=>{let n=e.root.findEntityByUUID(t);if(n)return n;let r=t.split(`/`).filter(e=>e!==``).join(`/`),i=[];if(e.root.traverse(e=>{Td(e)===r&&i.push(e)}),i.length===0)throw new H(`エンティティが見つかりません: ${t}（uuid か root から始まる名前パスで指定します。一覧は tree で確認できます）`);if(i.length>1){let e=[];for(let t of i)e.push({uuid:t.uuid,path:Td(t)});throw new H(`名前パスが ${i.length} 件に一致しました。uuid で指定してください: ${t}`,e)}return i[0]},Dd=e=>[e.x,e.y,e.z],Od=e=>{let t=e.getComponent(A);if(!t||!t.geometry.boundingBox)return null;let n=t.geometry.boundingBox,r=new E(1/0,1/0,1/0),i=new E(-1/0,-1/0,-1/0);for(let t=0;t<8;t++){let a=new E(t&1?n.max.x:n.min.x,t&2?n.max.y:n.min.y,t&4?n.max.z:n.min.z).applyMatrix4AsPosition(e.matrixWorld);r.x=Math.min(r.x,a.x),r.y=Math.min(r.y,a.y),r.z=Math.min(r.z,a.z),i.x=Math.max(i.x,a.x),i.y=Math.max(i.y,a.y),i.z=Math.max(i.z,a.z)}return{min:Dd(r),max:Dd(i)}},kd=e=>{let t=new E(0,0,0,1).applyMatrix4(e.matrixWorld),n=new E(0,0,-1,0).applyMatrix4(e.matrixWorld).normalize(),r=new E(0,1,0,0).applyMatrix4(e.matrixWorld).normalize();return{position:Dd(t),forward:Dd(n),up:Dd(r),bounds:Od(e)}},Ad=e=>N.resources.getComponentName(e),jd=e=>{let t=e;typeof t==`function`&&(t=t());let n=[];for(let e of t)typeof e==`string`?n.push(e):n.push(e.value);return n},Md=e=>{let t=e.serialize({mode:`view`}),n=[];for(let r of Object.keys(t)){let i=e.getFieldOpt(r)??{};if(i.isFolder)continue;let a=t[r],o=a;typeof a==`function`&&(o=`(action)`);let s={path:r,value:o};i.format&&(s.format=i.format.type,(i.format.type===`select`||i.format.type===`resource`)&&(s.options=jd(i.format.list))),i.readOnly&&(s.readOnly=!0),i.noExport&&(s.noExport=!0);let c=!1;typeof i.hidden==`function`?c=i.hidden(a):i.hidden&&(c=!0),c&&(s.hidden=!0),n.push(s)}return n}})))()}var Pd,Fd,Id,Ld,Rd,zd,Bd,Vd;function Hd(){return(Hd=t((()=>{qe(),ci(),xd(),Nd(),wd(),Pd=e=>{let t=`tab`;return e.headless&&(t=`headless`),{connection:t,tabId:e.tabId,url:location.href,scene:e.sceneName,unsaved:e.unsaved,frame:{current:e.engine.frame.current,playing:e.engine.frame.playing,duration:e.engine.frameSetting.duration,fps:e.engine.frameSetting.fps}}},Fd=e=>{let t=[];e.components.forEach(e=>{t.push(Ad(e))});for(let n of e.unresolvedComponents)t.push(`${n.name} (unresolved)`);return t},Id=e=>{let t=[];return e.engine.root.traverse(e=>{t.push({path:Td(e),uuid:e.uuid,initiator:e.initiator,visible:e.visible,...kd(e),components:Fd(e)})}),t},Ld=(e,t)=>{let n=Ed(e.engine,yd(t,0,`get <entity>`)),r=[];n.components.forEach(e=>{r.push({name:Ad(e),uuid:e.uuid,initiator:e.initiator,fields:Md(e)})});let i=[];for(let e of n.children)i.push({uuid:e.uuid,name:e.name});return{path:Td(n),uuid:n.uuid,initiator:n.initiator,world:kd(n),fields:Md(n),components:r,unresolvedComponents:n.unresolvedComponents,children:i}},Rd=(e,t)=>{let n=e.createEntity({name:`__agent_probe__`});try{let e=n.addComponent(t.component);return{fields:Md(e)}}catch(e){return{error:`フィールド定義を読めませんでした: ${bd(e)}`}}finally{n.disposeRecursive()}},zd=e=>{let t=[],n=(r,i)=>{for(let a of r.child)`component`in a?t.push({name:a.name,group:i,...Rd(e.engine,a)}):n(a,`${i}/${a.name}`)};for(let e of N.resources.componentGroups)n(e,e.name);return t},Bd=e=>{let t=[];Pe.forEach((e,n)=>{t.push({name:n,message:e})});let n=[],r=[];for(let e of Cd())e.message.startsWith(`[webgpu]`)?n.push(e):r.push(e);let i=[];return e.engine.root.traverse(e=>{for(let t of e.unresolvedComponents)i.push({entity:Td(e),entityUuid:e.uuid,name:t.name,uuid:t.uuid})}),{shader:t,gpu:n,console:r,unresolvedComponents:i}},Vd={status:Pd,tree:Id,get:Ld,components:zd,errors:Bd}})))()}var Ud;function Wd(){return(Wd=t((()=>{Ud=`agent-headless`})))()}var Gd,Kd,qd,Jd,Yd,Xd,Zd,Qd,$d,ef;function tf(){return(tf=t((()=>{xd(),Gd=/^[A-Za-z0-9_-]+$/,Kd=e=>{if(!e.scenes)throw new H(`このページはシーンを切り替えられません（シーンを焼き込んだページです）`);return e.scenes},qd=(e,t)=>{if(!e.names.includes(t))throw new H(`シーンがありません: ${t}`,e.names)},Jd=e=>{if(e.unsaved)throw new H(`開いているシーン（${e.sceneName}）に未保存の変更があります。タブで保存（Ctrl+S）するか破棄してから切り替えてください`)},Yd=async(e,t,n)=>{let r=()=>{},i=new Promise(e=>{r=e});e.engine.once(`loaded`,r);try{await t.onSelect(n)}catch(t){throw e.engine.off(`loaded`,r),t}await i},Xd=`scene-create <name> [--from <scene>] [--open]`,Zd=async(e,t)=>{let n=Kd(e),r=yd(t,0,Xd);if(!Gd.test(r))throw new H(`シーン名に使えるのは英数字・-・_ だけです: ${r}`);if(n.names.includes(r))throw new H(`シーンはすでにあります: ${r}`,n.names);let i;if(t.options.from!==void 0){if(typeof t.options.from!=`string`)throw new H(`--from にシーン名がありません。使い方: ${Xd}`);qd(n,t.options.from),i=t.options.from}let a=t.options.open===!0;return a&&Jd(e),await n.onCreate(r,i),a&&await Yd(e,n,r),{scene:r,from:i??null,opened:a}},Qd=async(e,t)=>{let n=Kd(e),r=yd(t,0,`scene-delete <name>`);if(qd(n,r),r===n.current)throw new H(`開いているシーンは削除できません: ${r}（scene-open で別のシーンを開いてから削除してください）`);return await n.onDelete(r),{scene:r}},$d=async(e,t)=>{let n=Kd(e),r=yd(t,0,`scene-open <name>`);qd(n,r);let i=n.current;return r===i?{scene:r,previous:i,opened:!1}:(Jd(e),await Yd(e,n,r),{scene:r,previous:i,opened:!0})},ef={"scene-create":Zd,"scene-delete":Qd,"scene-open":$d}})))()}var nf,rf,af,of,sf,cf,lf,uf,df,ff,pf,mf,hf,gf,_f,vf,yf;function bf(){return(bf=t((()=>{ci(),xd(),Nd(),nf=(e,t)=>{let n=[];for(let[r,i]of e.components){let e=Ad(i);if(e===t||i.uuid===t)return{componentClass:r,component:i};n.push(e)}throw new H(`コンポーネントが付いていません: ${t}（${Td(e)}）`,n)},rf=(e,t)=>{if(e.initiator===`script`)throw new H(`${Td(e)} はスクリプト（BLidge / glb 等）が生成したエンティティなので${t}できません`)},af=(e,t)=>{if(e.initiator!==`user`)throw new H(`${Ad(e)} は initiator が ${e.initiator} のコンポーネントなので${t}できません（シーン JSON に載るのは user が付けたものだけ）`)},of=e=>{let t=[],n=e.serialize({mode:`view`});for(let r of Object.keys(n)){let i=e.getFieldOpt(r)??{};i.isFolder||i.readOnly||typeof n[r]!=`function`&&t.push(r)}return t},sf=(e,t)=>{let n=Number(e);if(e.trim()===``||!Number.isFinite(n))throw new H(`${t} は数値のフィールドです: ${e}`);return n},cf=(e,t,n,r)=>{let i;if(e.trim().startsWith(`[`)){try{i=JSON.parse(e)}catch{throw new H(`${n} の値を JSON の配列として読めません: ${e}`)}if(!Array.isArray(i))throw new H(`${n} は配列のフィールドです: ${e}`)}else{i=[];for(let t of e.split(`,`))i.push(t.trim())}if((r===`vector`||r===`color`)&&i.length!==t.length)throw new H(`${n} は要素数 ${t.length} の ${r} です（例: ${t.join(`,`)}）: ${e}`);let a=[];for(let e=0;e<i.length;e++){let r=i[e];typeof(t[e]??t[0])==`number`&&typeof r==`string`?a.push(sf(r,`${n}[${e}]`)):a.push(r)}return a},lf=(e,t,n,r)=>{let i=t.getFieldOpt(n)??{},a=t.getField(n);if(i.format&&i.format.type===`entity`){if(r===`null`)return null;if(!e.root.findEntityByUUID(r))throw new H(`${n} はエンティティの uuid で指定します（外すときは null）。uuid は tree で確認できます: ${r}`);return r}if(i.format&&(i.format.type===`select`||i.format.type===`resource`)){let e=jd(i.format.list);for(let t of e)if(String(t)===r)return t;throw new H(`${n} は選択肢から選ぶフィールドです: ${r}`,e)}if(Array.isArray(a))return cf(r,a,n,i.format?.type);if(typeof a==`number`)return sf(r,n);if(typeof a==`boolean`){if(r===`true`)return!0;if(r===`false`)return!1;throw new H(`${n} は真偽値のフィールドです（true か false）: ${r}`)}if(typeof a==`string`)return r;if(a==null){if(r===`null`)return null;try{return JSON.parse(r)}catch{return r}}try{return JSON.parse(r)}catch{throw new H(`${n} はオブジェクトのフィールドなので JSON で指定してください: ${r}`)}},uf=`add-entity <parent> [--name <name>]`,df=(e,t)=>{let n=Ed(e.engine,yd(t,0,uf));rf(n,`子を追加`);let r=`Empty`;if(t.options.name!==void 0){if(typeof t.options.name!=`string`)throw new H(`--name に名前がありません。使い方: ${uf}`);if(t.options.name.includes(`/`))throw new H(`名前に / は使えません: ${t.options.name}`);r=t.options.name}let i=e.editor.api.createEntity(n,{name:r,components:[]});return{uuid:i.uuid,name:i.name,path:Td(i)}},ff=(e,t)=>{let n=Ed(e.engine,yd(t,0,`remove-entity <entity>`));if(n===e.engine.root)throw new H(`root は削除できません`);rf(n,`削除`);let r=Td(n);return e.editor.api.deleteEntity(n),{uuid:n.uuid,path:r}},pf=(e,t)=>{let n=`add-component <entity> <Name>`,r=Ed(e.engine,yd(t,0,n)),i=yd(t,1,n),a=N.resources.getComponent(i);if(!a){let e=[];for(let t of N.resources.componentList)e.push(t.name);throw new H(`登録されていないコンポーネントです: ${i}（一覧は components で確認できます）`,e)}if(r.getComponent(a.component))throw new H(`${Td(r)} には ${i} がすでに付いています`);let o=e.editor.api.addComponent(r,a.component);return{entity:Td(r),name:i,uuid:o.uuid}},mf=(e,t)=>{let n=`remove-component <entity> <Name>`,r=Ed(e.engine,yd(t,0,n)),{componentClass:i,component:a}=nf(r,yd(t,1,n));af(a,`削除`);let o=Ad(a);return e.editor.api.removeComponent(r,i,a),{entity:Td(r),name:o,uuid:a.uuid}},hf=`set <entity> [<component>] <path> <value>`,gf=(e,t)=>{let n=Ed(e.engine,yd(t,0,hf)),r=n,i=Td(n),a=1;if(t.args.length>=4){let{component:e}=nf(n,t.args[1]);af(e,`編集`),r=e,i=`${i} ${Ad(e)}`,a=2}let o=yd(t,a,hf),s=yd(t,a+1,hf),c=of(r);if(!c.includes(o)){let e=``;throw r===n&&(e=`（コンポーネントのフィールドは set <entity> <component> <path> <value>）`),new H(`書き換えられるフィールドではありません: ${o}（${i}）${e}`,c)}return e.editor.api.setField(r,o,lf(e.engine,r,o,s),{merge:!1}),{target:i,path:o,value:r.getField(o)}},_f=e=>{if(!e.editor.api.canUndo)throw new H(`取り消せる操作がありません`);return e.editor.api.undo(),{canUndo:e.editor.api.canUndo,canRedo:e.editor.api.canRedo}},vf=e=>{if(!e.editor.api.canRedo)throw new H(`やり直せる操作がありません`);return e.editor.api.redo(),{canUndo:e.editor.api.canUndo,canRedo:e.editor.api.canRedo}},yf={"add-entity":df,"remove-entity":ff,"add-component":pf,"remove-component":mf,set:gf,undo:_f,redo:vf}})))()}var xf,Sf,Cf,wf,Tf,Ef,Df,Of,kf,Af,jf;function Mf(){return(Mf=t((()=>{xd(),Nd(),bf(),xf=[`renderer`,`timeline`,`editor`],Sf=[`resolution/`,`frameLoop/`],Cf=/^viewports\/[^/]+\/resolutionScale$/,wf=e=>e.sceneName===null?null:`scenes/${e.sceneName}.json`,Tf=(e,t)=>{if(t===`renderer`)return{serializable:e.engine.renderer,file:wf(e),accepts:()=>!0};if(t===`timeline`)return{serializable:e.engine,file:wf(e),accepts:e=>e.startsWith(`timeline/`)};if(t===`editor`)return{serializable:e.editor,file:`editor.json`,accepts:e=>{for(let t of Sf)if(e.startsWith(t))return!0;return Cf.test(e)}};throw new H(`設定の名前が違います: ${t}`,xf)},Ef=e=>{let t=[];for(let n of of(e.serializable))e.accepts(n)&&t.push(n);return t},Df=(e,t)=>{let n=xf;t.args[0]!==void 0&&(n=[t.args[0]]);let r={};for(let t of n){let n=Tf(e,t),i=Ef(n),a=[];for(let e of Md(n.serializable))i.includes(e.path)&&a.push(e);r[t]={file:n.file,fields:a}}return r},Of=`set-setting <renderer|timeline|editor> <path> <value>`,kf=(e,t)=>{let n=yd(t,0,Of),r=yd(t,1,Of),i=yd(t,2,Of),a=Tf(e,n),o=Ef(a);if(!o.includes(r))throw new H(`書き換えられる設定ではありません: ${r}（${n}）`,o);let s=a.serializable;return e.editor.api.setField(s,r,lf(e.engine,s,r,i),{merge:!1}),{target:n,file:a.file,path:r,value:s.getField(r)}},Af={settings:Df},jf={"set-setting":kf}})))()}var Nf=n({LookAt:()=>Pf}),Pf;function Ff(){return(Ff=t((()=>{O(),M(),Pf=class extends wt{target;_targetUUID;up;targetWorldPos;targetLocalPos;localUp;lookAtMatrix;parentInverse;constructor(e){super(e),this.target=null,this._targetUUID=null,this.targetWorldPos=new E,this.targetLocalPos=new E,this.localUp=new E,this.up=new E(0,1,0),this.lookAtMatrix=new D,this.parentInverse=new D,this.order=100,this.field(`target`,()=>this._targetUUID,e=>{this._targetUUID=e||null,this.target=null},{format:{type:`entity`}})}setTarget(e){this.target=e,this._targetUUID=e?e.uuid:null}updateImpl(){if(!this._targetUUID||this.target)return;let e=this.entity.getRootEntity();this.target=e.findEntityByUUID(this._targetUUID)||null}postUpdateImpl(e){this.target&&this._enabled&&(this.target.matrixWorld.decompose(this.targetWorldPos),this.targetLocalPos.copy(this.targetWorldPos),this.localUp.copy(this.up),this.entity.parent&&(this.parentInverse.copy(this.entity.parent.matrixWorld).inverse(),this.targetLocalPos.applyMatrix4AsPosition(this.parentInverse),this.localUp.applyMatrix4AsDirection(this.parentInverse).normalize()),this.lookAtMatrix.lookAt(this.entity.position,this.targetLocalPos,this.localUp),this.entity.quaternion.setFromMatrix(this.lookAtMatrix))}}})))()}var If=n({OrbitControls:()=>Lf}),Lf;function Rf(){return(Rf=t((()=>{O(),M(),mi(),Ff(),Lf=class extends wt{keyborad_;_pointer;orbit_;mouseVelOrbit_;mouseVelMove_;eye_;target_;up_;lookatMatrix_;distance_;distanceVel_;_memPos;_memTarget;_multiTouching;elmDisposer;constructor(e){super(e),this._pointer=new di,this.keyborad_=new li,this.orbit_=new E,this.mouseVelOrbit_=new E,this.mouseVelMove_=new E,this.target_=new E,this.eye_=new E,this.up_=new E(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new D,this._memPos=new E,this._memTarget=new E,this._multiTouching=!1,this.order=999;let t=!1,n=e=>{t||=!0},r=e=>{if(!this._enabled||!t||this._multiTouching)return;let n={x:e.delta.x*1,y:e.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(n):this.mouseVelOrbit_.add(n),e.pointerEvent.preventDefault(),e.pointerEvent.stopPropagation()},i=e=>{t&&=!1};this._pointer.on(`move`,r),this._pointer.on(`start`,n),this._pointer.on(`end`,i),this.once(`dispose`,()=>{this._pointer.off(`move`,r),this._pointer.off(`start`,n),this._pointer.off(`end`,i)}),this.setPosition(this.entity.position,this.target_)}set enabled(e){if(this._enabled=e,e){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);let e=this.entity.getComponent(Pf);e&&e.target&&this.setPosition(this.entity.position,e.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}get eye(){return this.eye_}get target(){return this.target_}setElm(e){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(e);let t=new Map,n=()=>{let e=Array.from(t.values());if(e.length<2)return 0;let n=e[1].x-e[0].x,r=e[1].y-e[0].y;return Math.sqrt(n*n+r*r)},r=()=>{let e=Array.from(t.values());return e.length<2?{x:0,y:0}:{x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2}},i=0,a={x:0,y:0},o=e=>{e.pointerType===`touch`&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),t.size===2&&(this._multiTouching=!0,i=n(),a=r()))},s=e=>{if(e.pointerType===`touch`&&t.has(e.pointerId)&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._enabled&&t.size>=2)){let e=n(),t=e-i;this.distanceVel_+=-t*5,i=e;let o=r(),s=o.x-a.x,c=o.y-a.y;this.mouseVelMove_.add({x:s,y:c}),a=o}},c=e=>{e.pointerType===`touch`&&(t.delete(e.pointerId),t.size<2&&(this._multiTouching=!1,i=0))};e.addEventListener(`pointerdown`,o),e.addEventListener(`pointermove`,s),e.addEventListener(`pointerup`,c),e.addEventListener(`pointercancel`,c);let l=e=>{e.preventDefault(),this._enabled&&(this.distanceVel_+=e.deltaY)};e.addEventListener(`wheel`,l),this.elmDisposer=()=>{e.removeEventListener(`pointerdown`,o),e.removeEventListener(`pointermove`,s),e.removeEventListener(`pointerup`,c),e.removeEventListener(`pointercancel`,c),e.removeEventListener(`wheel`,l)}}calc(e){let t=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new D().makeRotationAxis({x:1,y:0,z:0},Math.min(t,Math.max(-t,this.orbit_.x)))),this.eye_.applyMatrix3(new D().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(e.position,e.quaternion,e.scale)}updateImpl(e){let t=new E(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);t.applyMatrix3(this.entity.matrix),this.target_.add(t),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);let n=Math.max(0,1-e.timeDelta*10);this.mouseVelOrbit_.multiply(n),this.mouseVelMove_.multiply(n),this.distanceVel_*=n,this.calc(this.entity)}addOrbitVelocity(e,t){this._enabled&&this.mouseVelOrbit_.add({x:e,y:t})}addMoveVelocity(e,t){this._enabled&&this.mouseVelMove_.add({x:e,y:t})}addDistanceVelocity(e){this._enabled&&(this.distanceVel_+=e)}setPosition(e,t){if(this.eye_.copy(e),this.target_.copy(t),this.entity){let e=this.entity.parent;e&&(e.updateMatrix(!0),this.target_.applyMatrix4(e.matrixWorld.clone().inverse()))}let n=this.eye_.x-this.target_.x,r=this.eye_.y-this.target_.y,i=this.eye_.z-this.target_.z;this.orbit_.x=Math.atan2(r,Math.sqrt(n*n+i*i)),this.orbit_.y=-Math.atan2(n,i),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0),this.distanceVel_=0}dispose(){super.dispose(),this._pointer.dispose(),this.elmDisposer&&this.elmDisposer()}}})))()}var zf,Bf,Vf,Hf,Uf,Wf,Gf;function Kf(){return(Kf=t((()=>{O(),M(),Rf(),zf={motionBlur:!1,dof:!1},Bf=1.3,Vf=1,Hf=.1,Uf={front:[0,0,1],right:[1,0,0],top:[0,1,0]},Wf=e=>{let t=null;return e.traverse(e=>{if(t)return;let n=e.getComponentsByTag(`camera`);for(let r=0;r<n.length;r++)if(n[r].displayOut){t=e;return}}),t},Gf=class{_entity;_camera;_orbitControls;_renderView;_view;_preview;constructor(e,t,n){this._entity=e.createEntity({name:`__editorCamera`}),this._camera=this._entity.addComponent(It),this._orbitControls=this._entity.addComponent(Lf),this._orbitControls.setElm(n),this._renderView=t,this._view=`editor`,this._preview=!1,this._apply(e)}get entity(){return this._entity}get camera(){return this._camera}get orbitControls(){return this._orbitControls}get view(){return this._view}get preview(){return this._preview}get usingEditorCamera(){return!this._preview&&this._view===`editor`}setView(e,t){this._view=e,this._apply(t)}setPreview(e,t){this._preview=e,this._apply(t)}_apply(e){let t=this._renderView;this.usingEditorCamera?(t.camera!==this._entity&&this.syncFromSceneCamera(e),t.camera=this._entity,this._orbitControls.enabled=!0):(t.camera=null,this._orbitControls.enabled=!1),t.pipelineOverride=this.usingEditorCamera?zf:null}alignView(e,t){let n=this._orbitControls.target.clone(),r=this._orbitControls.eye.clone().sub(n).length(),i=Uf[e],a=new E(i[0],i[1],i[2]);t&&a.multiply(-1);let o=n.clone().add(a.multiply(r));this._orbitControls.setPosition(o,n)}toggleProjection(){this._camera.cameraType===`perspective`?this._camera.cameraType=`orthographic`:this._camera.cameraType=`perspective`,this._camera.needsUpdateProjectionMatrix=!0}focus(e){e.updateMatrixRecursive(!0);let t=this._getWorldBounds(e),n=new E,r=Vf;t?(n.copy(t.min).add(t.max).multiply(.5),r=Math.max(t.max.clone().sub(t.min).length()*.5,Hf)):e.matrixWorld.decompose(n);let i=r/Math.tan(this._camera.fov*Math.PI/360)*Bf,a=this._orbitControls.eye.clone().sub(this._orbitControls.target);a.length()<1e-6&&a.set(0,0,1),a.normalize().multiply(i),this._orbitControls.setPosition(n.clone().add(a),n)}_getWorldBounds(e){let t=new E(1/0,1/0,1/0),n=new E(-1/0,-1/0,-1/0),r=!1;return e.traverse(e=>{if(!e.visible)return;let i=e.getComponent(A);if(!i)return;let a=i.geometry.boundingBox;if(a){for(let r=0;r<8;r++){let i=new E(r&1?a.max.x:a.min.x,r&2?a.max.y:a.min.y,r&4?a.max.z:a.min.z).applyMatrix4AsPosition(e.matrixWorld);t.x=Math.min(t.x,i.x),t.y=Math.min(t.y,i.y),t.z=Math.min(t.z,i.z),n.x=Math.max(n.x,i.x),n.y=Math.max(n.y,i.y),n.z=Math.max(n.z,i.z)}r=!0}}),r?{min:t,max:n}:null}getCameraEntity(e){return this._renderView.camera||Wf(e.root)}updateBeforeRender(e){if(!this.usingEditorCamera)return;let t=e.createEntityUpdateEvent();if(this._entity.commitFrame(t),this._entity.updateMatrix(),this._camera.aspect=e.renderer.resolution.x/e.renderer.resolution.y,this._camera.needsUpdateProjectionMatrix=!0,this._entity.update(t),this._camera.cameraType===`orthographic`){let e=this._orbitControls.eye.clone().sub(this._orbitControls.target).length();this._camera.orthHeight=2*e*Math.tan(this._camera.fov*Math.PI/360)}this._entity.postUpdate(t),this._entity.updateMatrixRecursive(),this._entity.prepareRender(t)}resize(e){this._camera.aspect=e.x/e.y,this._camera.needsUpdateProjectionMatrix=!0}dispose(){this._entity.dispose()}syncFromSceneCamera(e){let t=Wf(e.root);if(!t)return;let n=new E;t.matrixWorld.decompose(n);let r=t.getComponentsByTag(`camera`)[0];this._orbitControls.setPosition(n,this._resolveOrbitTarget(t,r,n)),r&&(this._camera.fov=r.fov,this._camera.near=r.near,this._camera.far=r.far,this._camera.needsUpdateProjectionMatrix=!0)}_resolveOrbitTarget(e,t,n){let r=Math.max(t?t.dofParams.focusDistance:5,.1),i=new E(0,0,-1,0).applyMatrix3(e.matrixWorld).normalize();return n.clone().add(i.multiply(r))}}})))()}var qf;function Jf(){return(Jf=t((()=>{at(),O(),qf=class e extends tt{static paused=!1;_draw;_view;_elm;_outTarget;_frameLabels;_enable;_resolution;_count;_total;_tile;_tilePixelSize;_tileInv;_focus;_prevFrameLabels;_labelCount;_overlay;constructor(e,t,n){super(),this._draw=t,this._view=n,this._elm=e,this._outTarget=t.createTarget(),this._enable=!1,this._count=0,this._total=1,this._tile=new E(1,1),this._tilePixelSize=new E(1,1),this._tileInv=new E(1,1),this._focus=null,this._frameLabels=[],this._prevFrameLabels=[],this._labelCount=new Map,this._resolution=new E,this._overlay=document.createElement(`div`),this._overlay.style.cssText=`position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;color:#fff;font-family:'Courier New',monospace;font-weight:500;mix-blend-mode:difference;`;let r=t.onDrawPass((e,t)=>this._push(e,t)),i=new E(0,0),a=this._onClick.bind(this),o=e=>{i.set(e.clientX,e.clientY)},s=e=>{let t=new E(e.clientX,e.clientY);i.clone().sub(t).length()<10&&a(e)};this._elm.addEventListener(`pointerdown`,o),this._elm.addEventListener(`pointerup`,s);let c=e=>{if(e.key===`Escape`&&(this._focus=null,this._clear()),e.key==`ArrowRight`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.min(e+1,this._prevFrameLabels.length-1);this._focus=this._prevFrameLabels[t]??this._focus}if(e.key==`ArrowLeft`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.max(e-1,0);this._focus=this._prevFrameLabels[t]??this._focus}};window.addEventListener(`keydown`,c),this.once(`dispose`,()=>{r(),this._elm.removeEventListener(`pointerdown`,o),this._elm.removeEventListener(`pointerup`,s),window.removeEventListener(`keydown`,c),this._overlay.remove()})}_calcTilePos(e){return{x:e%this._tile.x*this._tileInv.x*this._resolution.x,y:Math.floor(e/this._tile.x)*this._tileInv.y*this._resolution.y}}_push(t,n){if(!this._enable||e.paused)return;let r=n||String(this._count),i=this._labelCount.get(r)||0;this._labelCount.set(r,i+1);let a=i>0?r+`#`+i:r;if(this._focus==null||this._focus==a){let{x:e,y:n}=this._calcTilePos(this._count);this._focus!==null&&(e=0,n=0),this._draw.blit(this._view,t,this._outTarget,{x:e,y:n,width:this._tilePixelSize.x,height:this._tilePixelSize.y}),this._frameLabels.push(a)}this._count++}draw(){this._draw.blit(this._view,this._outTarget,null),this._drawLabels(),this._clear()}_drawLabels(){let e=this._elm.parentElement;e&&(this._overlay.parentElement!==e&&e.appendChild(this._overlay),this._overlay.style.fontSize=Math.max(10,this._elm.clientHeight/1080*28)+`px`,this._overlay.replaceChildren(...this._frameLabels.map((e,t)=>{let n=document.createElement(`div`);return n.textContent=e,n.style.cssText=`position:absolute;transform:translateY(-100%);white-space:nowrap;`,n.style.left=t%this._tile.x*this._tileInv.x*100+`%`,n.style.top=(Math.floor(t/this._tile.x)+1)*this._tileInv.y*100+`%`,n.style.paddingLeft=`5px`,n})))}_clear(){this._total=this._count,this._prevFrameLabels=this._frameLabels;let e=Math.sqrt(this._focus===null?Math.max(this._total,1):1);this._tile.set(Math.round(e),Math.ceil(e)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameLabels=[],this._count=0,this._labelCount.clear()}reflesh(){this.resize(this._resolution)}resize(e){this._resolution.copy(e)}_onClick(e){if(this._enable){if(this.reflesh(),this._focus===null){let t=new E(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),n=Math.floor(e.offsetX/t.x)+Math.floor(e.offsetY/t.y)*this._tile.x;n>=0&&n<this._prevFrameLabels.length&&(this._focus=this._prevFrameLabels[n])}this._clear()}}set enable(e){this._enable=e,e?this.reflesh():this._overlay.remove()}get enable(){return this._enable}dispose(){this.emit(`dispose`)}}})))()}var Yf,Xf,Zf,Qf,$f,ep,tp,np,rp,ip,ap,op,sp,cp;function lp(){return(lp=t((()=>{O(),M(),ci(),Kf(),Jf(),xd(),Nd(),Yf=`shot <out.png> [--camera <entity> | --from x,y,z --to x,y,z] [--time <秒>] [--view <final|パス名>]`,Xf=1/60,Zf=new WeakMap,Qf=(e,t)=>{let n=e[t];if(typeof n!=`string`)throw new H(`--${t} には x,y,z を指定してください。使い方: ${Yf}`);let r=n.replace(/^\[(.*)\]$/,`$1`).split(`,`),i=[];for(let e of r){let r=Number(e);if(e.trim()===``||!Number.isFinite(r))throw new H(`--${t} は数値3つで指定してください: ${n}`);i.push(r)}if(i.length!==3)throw new H(`--${t} は数値3つで指定してください: ${n}`);return new E(i[0],i[1],i[2])},$f=(e,t)=>{let n=t.time;if(n===void 0)return e.engine.time.code;let r=Number(n);if(typeof n!=`string`||!Number.isFinite(r))throw new H(`--time は秒の数値で指定してください: ${n}`);return r},ep=e=>{let t=e.view;if(t===void 0)return`final`;if(typeof t!=`string`)throw new H(`--view には final かパス名を指定してください。使い方: ${Yf}`);return t},tp=e=>{let t=e.getComponentsByTag(`camera`)[0];return t.displayOut||t.viewPort?null:t},np=(e,t)=>{let n=t.from!==void 0||t.to!==void 0;if(t.camera!==void 0&&n)throw new H(`--camera と --from / --to は同時に指定できません。使い方: ${Yf}`);if(t.camera!==void 0){if(typeof t.camera!=`string`)throw new H(`--camera にはエンティティを指定してください。使い方: ${Yf}`);let n=Ed(e.engine,t.camera);if(n.getComponentsByTag(`camera`).length===0)throw new H(`カメラのコンポーネントが付いていません: ${Td(n)}`);return{entity:n,description:Td(n),temporary:null,fitAspect:tp(n)}}if(n){let n=Qf(t,`from`),r=Qf(t,`to`),i=r.clone();if(i.sub(n),i.length()===0)throw new H(`--from と --to が同じ位置です`);let a=e.engine.createEntity({name:`__agentShotCamera`}),o=a.addComponent(It);return a.position.copy(n),a.lookAt(r),{entity:a,description:{from:[n.x,n.y,n.z],to:[r.x,r.y,r.z]},temporary:o,fitAspect:null}}let r=Wf(e.engine.root);if(!r)throw new H(`シーンに displayOut のカメラがありません。--camera か --from / --to を指定してください`);return{entity:null,description:Td(r),temporary:null,fitAspect:null}},rp=(e,t,n)=>{let r=e.entity;e.aspect=t.renderer.resolution.x/t.renderer.resolution.y,e.needsUpdateProjectionMatrix=!0,r.update(n),r.postUpdate(n),r.updateMatrixRecursive(),r.prepareRender(n)},ip=(e,t,n,r)=>{let i=e.createEntityUpdateEvent({...n,timeCode:t,timeCodeFrame:t*60,playing:!1,forceDraw:!0});e.renderer.globalUniforms.uTime.value=t,e.renderer.globalUniforms.uTimeF.value=t%1;let a=N.resources.updateEveryFrameTextures;for(let e=0;e<a.length;e++)a[e].render();return r?r.during(()=>e.step(i)):e.step(i),i},ap=class{labels;found;_draw;_view;_target;_name;_counts;constructor(e,t,n,r){this.labels=[],this.found=!1,this._draw=e,this._view=t,this._target=n,this._name=r,this._counts=new Map}during(e){let t=this._draw.onDrawPass((e,t)=>this._push(e,t));try{e()}finally{t()}}_push(e,t){let n=t||String(this.labels.length),r=this._counts.get(n)||0;this._counts.set(n,r+1);let i=n;r>0&&(i=n+`#`+r),this.labels.push(i),!this.found&&i===this._name&&(this._draw.blit(this._view,e,this._target),this.found=!0)}},op=async(e,t,n)=>{let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`),a=i.createImageData(t,n),o=t*4;for(let t=0;t<n;t++){let r=(n-1-t)*o;a.data.set(e.subarray(r,r+o),t*o)}for(let e=3;e<a.data.length;e+=4)a.data[e]=255;i.putImageData(a,0,0);let s=await new Promise(e=>r.toBlob(e,`image/png`));if(!s)throw Error(`PNG にエンコードできませんでした`);let c=await new Promise((e,t)=>{let n=new FileReader;n.onload=()=>e(n.result),n.onerror=()=>t(n.error),n.readAsDataURL(s)});return c.slice(c.indexOf(`,`)+1)},sp=async(e,t)=>{yd(t,0,Yf);let n=t.options,r=e.engine,i=e.editor.draw,a=n.time!==void 0,o=$f(e,n),s=ep(n),c=np(e,n),l=r.createView({offscreen:!0});l.camera=c.entity;let u=Math.max(Math.floor(r.renderer.resolution.x),1),d=Math.max(Math.floor(r.renderer.resolution.y),1),f,p=c.fitAspect,m=1;p&&(m=p.aspect),qf.paused=!0;try{p&&(p.aspect=r.renderer.resolution.x/r.renderer.resolution.y,p.needsUpdateProjectionMatrix=!0);let e=null;if(s!==`final`){let t=Zf.get(i);t||(t=i.createTarget(),Zf.set(i,t)),e=new ap(i,l,t,s)}let t;a?(ip(r,o-Xf,{timeDelta:Xf},null),t=ip(r,o,{timeDelta:Xf},e)):t=ip(r,o,{},e),c.temporary&&rp(c.temporary,r,t);for(let e=0;e<3;e++)r.render(l);if(e){if(e.during(()=>r.render(l)),!e.found)throw new H(`--view に一致するパスがありません: ${s}（final かパスのラベルを指定してください）`,[`final`,...e.labels]);f=i.readPixels(Zf.get(i))}else r.render(l),f=i.readView(l)}catch(e){throw l.dispose(),e}finally{qf.paused=!1,p&&(p.aspect=m,p.needsUpdateProjectionMatrix=!0),c.temporary&&c.temporary.entity.dispose()}let h;try{h=await f}finally{l.dispose()}if(h.length!==u*d*4)throw new H(`読み戻したサイズが描画解像度と一致しません（${h.length} bytes, ${u}x${d}）。撮影中に Screen の大きさが変わった可能性があります。再実行してください`);return{png:await op(h,u,d),width:u,height:d,view:s,time:o,camera:c.description}},cp={shot:sp}})))()}var up,dp,fp,pp,mp,hp,gp;function _p(){return(_p=t((()=>{at(),Hd(),Wd(),tf(),Mf(),lp(),bf(),up={...yf,...jf,...ef},{...Vd,...Af,...up,...cp},rt.genUUID(),dp=new URLSearchParams(location.search).has(Ud),fp=2,pp=null,mp=()=>{},new Promise(e=>{mp=e}),hp=e=>new Promise(t=>{let n=e=>{if(e<=0){t();return}requestAnimationFrame(()=>n(e-1))};n(e)}),gp=e=>{let t={...e,unsaved:!1},n=()=>{t.unsaved=!0},r=()=>{t.unsaved=!1},i=()=>{t.unsaved=!1,dp&&hp(fp).then(mp)};return e.editor.api.commandManager.on(`change`,n),e.editor.on(`save`,r),e.editor.engine.on(`loaded`,i),pp=t,()=>{e.editor.api.commandManager.off(`change`,n),e.editor.off(`save`,r),e.editor.engine.off(`loaded`,i),pp===t&&(pp=null)}}})))()}var vp,yp,bp,xp;function Sp(){return(Sp=t((()=>{vp=class{isEditorFrame=!0;isEditorTarget=!0;size;constructor(e){this.size=e||null}},yp=class{isEditorRecipe=!0},bp=class{_resolution;constructor(e){this._resolution=e.resolution.clone()}renderEntities(){}renderFullscreen(){}blit(){}drawToCanvas(){}drawTexture(){}readPixels(e){let t=e.size||this._resolution;return Promise.resolve(new Uint8Array(t.x*t.y*4))}readView(){return Promise.resolve(new Uint8Array(this._resolution.x*this._resolution.y*4))}createTarget(e){return new vp(e&&e.size)}resize(e){this._resolution.copy(e)}onDrawPass(){return()=>{}}materials={flat:()=>({name:`editorFlat`}),mask:()=>({name:`editorMask`}),grid:()=>({name:`editorGrid`})};recipes={outline:()=>new yp}},xp=e=>new bp(e.renderer)})))()}var Cp;function wp(){return(wp=t((()=>{Cp=class{_engine;constructor(e){this._engine=e}load(){return Promise.resolve({scene:this._engine.createEntity({name:`gltf`})})}}})))()}var Tp;function Ep(){return(Ep=t((()=>{Tp=class{render(){}dispose(){}}})))()}var Dp,Op,kp;function Ap(){return(Ap=t((()=>{O(),Ct(),Ep(),Dp=class{camera;pipelineOverride;size;constructor(){this.camera=null,this.pipelineOverride=null,this.size=null}dispose(){}},Op=class extends St{canvas;resolution;globalUniforms;constructor(){super(),this.canvas=document.createElement(`canvas`),this.resolution=new E,this.globalUniforms={}}createView(){return new Dp}prepareScene(){}render(){}resize(e){this.resolution.copy(e)}reset(){}compileShaders(){return Promise.resolve()}createTexProcedural(){return new Tp}},kp=e=>new Op,Op.__docgenInfo={description:``,methods:[{name:`createView`,docblock:null,modifiers:[],params:[],returns:{type:{name:`RenderView`}}},{name:`prepareScene`,docblock:null,modifiers:[],params:[],returns:null},{name:`resize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`reset`,docblock:null,modifiers:[],params:[],returns:null},{name:`compileShaders`,docblock:null,modifiers:[],params:[],returns:{type:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},{name:`createTexProcedural`,docblock:null,modifiers:[],params:[],returns:{type:{name:`TexProcedural`}}}],displayName:`Renderer`}})))()}function jp(){return(jp=t((()=>{un(),Sp(),wp(),Ap()})))()}var Mp,Np;function Pp(){return(Pp=t((()=>{at(),O(),ci(),Mp=128,Np=class extends tt{_draw;_target;_cache;_pending;_canvas2d;_ctx2d;constructor(e){super(),this._draw=e,this._cache=new Map,this._pending=new Set,this._canvas2d=document.createElement(`canvas`),this._canvas2d.width=Mp,this._canvas2d.height=Mp,this._ctx2d=this._canvas2d.getContext(`2d`),this._target=e.createTarget({size:new E(Mp,Mp)})}getTexturePreview(e){let t=`tex:`+e,n=this._cache.get(t);if(n)return n;if(this._pending.has(t))return null;let r=N.resources.getTexture(e);return r?(this._pending.add(t),this._draw.drawTexture(r,this._target),this._draw.readPixels(this._target).then(e=>{this._pending.delete(t),this._cache.set(t,this._toDataURL(e)),this.emit(`update`)}),null):null}invalidate(e){this._cache.delete(e)}invalidateAll(){this._cache.clear(),this._pending.clear()}_toDataURL(e){let t=this._ctx2d.createImageData(Mp,Mp);for(let n=0;n<Mp;n++){let r=(127-n)*Mp*4,i=n*Mp*4;for(let n=0;n<512;n++)t.data[i+n]=e[r+n]}return this._ctx2d.putImageData(t,0,0),this._canvas2d.toDataURL()}dispose(){this._cache.clear(),this._pending.clear(),this.off(`update`)}}})))()}var Fp,Ip,Lp;function Rp(){return(Rp=t((()=>{M(),Fp={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},Ip=1e3,Lp=class{_draw;_root;_axisEntities;constructor(e,t){this._draw=t,this._root=e.createEntity({name:`__constraint_axis`}),this._root.initiator=`god`,this._axisEntities={x:this._createAxisLine(e,`x`),y:this._createAxisLine(e,`y`),z:this._createAxisLine(e,`z`)},this._root.add(this._axisEntities.x),this._root.add(this._axisEntities.y),this._root.add(this._axisEntities.z)}_createAxisLine(e,t){let n=e.createEntity({name:`__constraint_axis_line`});n.initiator=`god`;let r=t===`x`?[-1,0,0,1,0,0]:t===`y`?[0,-1,0,0,1,0]:[0,0,-1,0,0,1],i=new Et;return i.setAttribute(`position`,new Float32Array(r),3),i.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),n.addComponent(A,{geometry:i,material:this._draw.materials.flat({color:Fp[t],lines:!0,depthTest:!1,depthWrite:!1})}),n}render(e,t,n,r){if(!t||!n)return;let i=n.matrixWorld.elm,a=t.origin.x-i[12],o=t.origin.y-i[13],s=t.origin.z-i[14],c=Math.max(1,Math.sqrt(a*a+o*o+s*s))*Ip;this._root.position.copy(t.origin),this._root.quaternion.copy(t.quat),this._root.scale.set(c,c,c),this._root.updateMatrix(!0),this._root.update(r.createEntityUpdateEvent()),this._draw.renderEntities({view:e,camera:n,entities:t.axes.map(e=>this._axisEntities[e]),target:null})}}})))()}var zp;function Bp(){return(Bp=t((()=>{at(),zp=class extends tt{_undoStack=[];_redoStack=[];_mergeWindow=500;_lastExecuteTime=0;execute(e,t){let n=Date.now();if((t?.merge??!0)&&this._undoStack.length>0&&n-this._lastExecuteTime<this._mergeWindow){let t=this._undoStack[this._undoStack.length-1];if(t.mergeWith){let r=t.mergeWith(e);if(r){this._undoStack[this._undoStack.length-1]=r,e.execute(),this._lastExecuteTime=n,this.emit(`change`);return}}}e.execute(),this._undoStack.push(e),this._redoStack=[],this._lastExecuteTime=n,this.emit(`change`)}undo(){let e=this._undoStack.pop();e&&(e.undo(),this._redoStack.push(e),this.emit(`change`))}redo(){let e=this._redoStack.pop();e&&(e.execute(),this._undoStack.push(e),this.emit(`change`))}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}clear(){this._undoStack=[],this._redoStack=[],this.emit(`change`)}}})))()}var Vp;function Hp(){return(Hp=t((()=>{Vp=class{entity;componentClass;name=`AddComponent`;instance=null;constructor(e,t){this.entity=e,this.componentClass=t}execute(){this.instance=this.entity.addComponent(this.componentClass),this.instance.initiator=`user`}undo(){this.entity.removeComponent(this.componentClass),this.instance=null}}})))()}var Up;function Wp(){return(Wp=t((()=>{ci(),Up=class{_textureName;_config;name=`AddTexture`;constructor(e,t){this._textureName=e,this._config=t}execute(){N.resources.addTextureResource(this._textureName,this._config)}undo(){N.resources.removeTextureResource(this._textureName)}}})))()}var Gp;function Kp(){return(Kp=t((()=>{Gp=(e,t)=>{let n=new Set;for(let t of e.children)n.add(t.name);if(!n.has(t))return t;let r=1;for(;n.has(`${t}.${String(r).padStart(3,`0`)}`);)r++;return`${t}.${String(r).padStart(3,`0`)}`}})))()}var qp;function Jp(){return(Jp=t((()=>{Kp(),qp=class{engine;parent;options;name=`CreateEntity`;entity=null;constructor(e,t,n){this.engine=e,this.parent=t,this.options=n}execute(){if(!this.entity){this.entity=this.engine.createEntity({name:Gp(this.parent,this.options.name)}),this.entity.initiator=`user`;for(let e of this.options.components){let t=this.entity.addComponent(e);t.initiator=`user`}}this.parent.add(this.entity)}undo(){this.entity&&this.entity.parent&&this.entity.parent.remove(this.entity)}get createdEntity(){return this.entity}}})))()}var Yp;function Xp(){return(Xp=t((()=>{Yp=class{entity;name=`DeleteEntity`;parent=null;constructor(e){this.entity=e}execute(){this.parent=this.entity.parent,this.parent&&this.parent.remove(this.entity)}undo(){this.parent&&this.parent.add(this.entity)}}})))()}var Zp,Qp,$p;function em(){return(em=t((()=>{at(),Kp(),Zp=/\.\d{3}$/,Qp=(e,t)=>{let n=e.createEntity({name:t.name});n.initiator=`user`,n.position.setFromArray(t.position.getElm(`vec3`)),n.euler.setFromArray(t.euler.getElm(`vec3`)),n.scale.setFromArray(t.scale.getElm(`vec3`)),n.visible=t.visible;for(let e of t.components.values()){if(e.initiator!==`user`)continue;let t=e.constructor,r=n.addComponent(t);r.initiator=`user`,r.deserialize(e.serialize({mode:`export`}))}for(let e of t.unresolvedComponents)n.unresolvedComponents.push({name:e.name,uuid:rt.genUUID(),props:e.props});for(let r of t.children)r.initiator!==`script`&&n.add(Qp(e,r));return n},$p=class{engine;parent;source;name=`DuplicateEntity`;entity=null;constructor(e,t,n){this.engine=e,this.parent=t,this.source=n}execute(){if(!this.entity){this.entity=Qp(this.engine,this.source);let e=this.source.name.replace(Zp,``);this.entity.name=Gp(this.parent,e)}this.parent.add(this.entity)}undo(){this.entity&&this.entity.parent&&this.entity.parent.remove(this.entity)}get duplicatedEntity(){return this.entity}}})))()}var tm;function nm(){return(nm=t((()=>{tm=class{entity;componentClass;component;name=`RemoveComponent`;snapshot=null;constructor(e,t,n){this.entity=e,this.componentClass=t,this.component=n}execute(){this.snapshot=this.component.serialize(),this.entity.removeComponent(this.componentClass)}undo(){let e=this.entity.addComponent(this.componentClass);e.initiator=`user`,this.snapshot&&e.deserialize(this.snapshot),this.component=e}}})))()}var rm;function im(){return(im=t((()=>{ci(),rm=class{_textureName;name=`RemoveTexture`;_snapshot=null;constructor(e){this._textureName=e}execute(){let e=N.resources.getTextureResource(this._textureName);e&&(this._snapshot=e.serialize({mode:`export`})),N.resources.removeTextureResource(this._textureName)}undo(){this._snapshot&&N.resources.addTextureResource(this._textureName,this._snapshot)}}})))()}var am;function om(){return(om=t((()=>{am=class e{target;path;oldValue;newValue;name=`SetField`;constructor(e,t,n,r){this.target=e,this.path=t,this.oldValue=n,this.newValue=r}execute(){this.target.setField(this.path,this.newValue)}undo(){this.target.setField(this.path,this.oldValue)}mergeWith(t){return t instanceof e&&t.target===this.target&&t.path===this.path?new e(this.target,this.path,this.oldValue,t.newValue):null}}})))()}var sm;function cm(){return(cm=t((()=>{ci(),Bp(),Hp(),Wp(),Jp(),Xp(),em(),nm(),im(),om(),sm=class{_commandManager;_editor;constructor(e){this._editor=e,this._commandManager=new zp}setField(e,t,n,r){let i=e.getField(t);this._commandManager.execute(new am(e,t,i,n),r)}createEntity(e,t){let n=new qp(this._editor.engine,e,t);return this._commandManager.execute(n),n.createdEntity}deleteEntity(e){this._commandManager.execute(new Yp(e))}duplicateEntity(e){let t=e.parent;if(!t)throw Error(`Entity has no parent: ${e.name}`);let n=new $p(this._editor.engine,t,e);return this._commandManager.execute(n),n.duplicatedEntity}selectEntity(e){this._editor.selectEntity(e)}addComponent(e,t){let n=new Vp(e,t);return this._commandManager.execute(n),n.instance}removeComponent(e,t,n){this._commandManager.execute(new tm(e,t,n))}addTexture(e,t){this._commandManager.execute(new Up(e,t))}removeTexture(e){this._commandManager.execute(new rm(e))}updateTexture(e,t){let n=N.resources.getTextureResource(e);if(!n)throw Error(`Texture not found: ${e}`);let r=Object.keys(t);for(let e of r){let r=n.getField(e);this._commandManager.execute(new am(n,e,r,t[e]))}}undo(){this._commandManager.undo()}redo(){this._commandManager.redo()}get canUndo(){return this._commandManager.canUndo}get canRedo(){return this._commandManager.canRedo}get commandManager(){return this._commandManager}dispose(){this._commandManager.clear()}}})))()}function lm(e,t){let n=e.clone().normalize(),r=Math.sin(t/2),i=new Oe;return i.set(n.x*r,n.y*r,n.z*r,Math.cos(t/2)),i}function um(e,t){let n=e.clone().normalize(),r=t.clone().normalize(),i=n.dot(r);if(i>.99999)return new Oe;if(i<-.99999){let e=Math.abs(n.x)>.9?new E(0,1,0):new E(1,0,0);return lm(n.clone().cross(e),Math.PI)}return lm(n.clone().cross(r),Math.acos(Math.min(1,Math.max(-1,i))))}function dm(e){let t=new Oe;return e.matrixWorld.decompose(void 0,t),t}function fm(e,t){return e.clone().applyMatrix4AsDirection(new D().applyQuaternion(t))}function pm(e,t,n){let r=new E(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:fm(r,dm(e)).normalize()}function mm(e,t,n){return e.clone().multiply(t.clone().multiply(n))}function hm(e,t,n){let r=e.origin.clone().sub(t),i=e.direction.dot(n),a=r.dot(n),o=r.dot(e.direction),s=1-i*i+1e-4;return a+(a*i-o)/s*i}function gm(e,t,n){let r=e.direction.dot(n);if(Math.abs(r)<1e-4)return null;let i=t.clone().sub(e.origin).dot(n)/r;return e.origin.clone().add(e.direction.clone().multiply(i))}function _m(){return(_m=t((()=>{O()})))()}var vm,ym,bm,xm,Sm,Cm,wm,Tm;function Em(){return(Em=t((()=>{O(),M(),_m(),vm={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},ym={xy:`z`,yz:`x`,xz:`y`},bm={xy:[`x`,`y`],yz:[`y`,`z`],xz:[`x`,`z`]},xm=[.75,.75,.75],Sm=[1,.95,.4],Cm=.45,wm=.18,Tm=class e{static VIEW_HEIGHT_RATIO=1/6;entity;_engine;_draw;_orientation;_camWorldPos;_records;_hoverHandle;_activeHandle;_dragging;constructor(e,t,n){this._engine=e,this._draw=t,this.entity=e.createEntity({name:n}),this.entity.initiator=`god`,this.entity.visible=!1,this._orientation=`global`,this._camWorldPos=new E,this._records=[],this._hoverHandle=null,this._activeHandle=null,this._dragging=!1}_createEntity(e){let t=this._engine.createEntity({name:e});return t.initiator=`god`,t}_registerHandle(e,t,n){let r=[...n];return this._records.push({handle:e,root:t,color:r,baseColor:[...n]}),this.entity.add(t),r}_addVisual(e,t,n){let r=this._createEntity(`__gizmo_visual`);return r.addComponent(A,{geometry:t,material:this._draw.materials.flat({color:n,depthTest:!1,depthWrite:!1})}),e.add(r),r}_addHit(e,t){let n=this._createEntity(`__gizmo_hit`);return n.addComponent(A,{geometry:t}),e.add(n),n}_addPlaneHandle(e){let t=this._createEntity(`__gizmo_plane_`+e),n=this._registerHandle(e,t,vm[ym[e]]);return this._addVisual(t,new Mt({width:wm,height:wm}),n),this._addHit(t,new Mt({width:wm*1.6,height:wm*1.6})),e===`yz`?(t.euler.set(0,Math.PI/2,0),t.position.set(0,Cm,Cm)):e===`xz`?(t.euler.set(Math.PI/2,0,0),t.position.set(Cm,0,Cm)):t.position.set(Cm,Cm,0),t}_addCenterHandle(){let e=this._createEntity(`__gizmo_center`),t=this._registerHandle(`center`,e,xm);return this._addVisual(e,new Qt({innerRadius:.1,outerRadius:.14,thetaSegments:24}),t),this._addHit(e,new Pt({radius:.16,widthSegments:8,heightSegments:6})),e}setHover(e){this._hoverHandle!==e&&(this._hoverHandle=e,this._updateColors())}_updateColors(){let e=this._dragging?this._activeHandle:this._hoverHandle;for(let t of this._records){let n=t.handle===e?Sm:t.baseColor;t.color[0]=n[0],t.color[1]=n[1],t.color[2]=n[2]}}getHandleEntities(){let e=[];for(let t of this._records)t.root.traverse(n=>{let r=n.getComponent(A);r&&!r.material&&e.push({handle:t.handle,entity:n})});return e}setTarget(t,n,r){if(this._orientation=r,!t){this.entity.visible=!1;return}if(this.entity.visible=!0,this.entity.quaternion.copy(this._rootQuaternion(t,r)),this.entity.position.set(t.matrixWorld.elm[12],t.matrixWorld.elm[13],t.matrixWorld.elm[14]),n){let t=n.matrixWorld.elm;this._camWorldPos.set(t[12],t[13],t[14]);let r=n.getComponentsByTag(`camera`)[0];if(r){let t=r.orthHeight;r.cameraType===`perspective`&&(t=2*this._camWorldPos.distanceTo(this.entity.position)*Math.tan(r.fov*Math.PI/360));let n=Math.max(.01,t*e.VIEW_HEIGHT_RATIO);this.entity.scale.set(n,n,n)}}this._onTargetUpdated()}_rootQuaternion(e,t){return t===`local`?dm(e):new Oe}_onTargetUpdated(){}_camDirLocal(){return fm(this._camWorldPos.clone().sub(this.entity.position).normalize(),this.entity.quaternion.clone().inverse()).normalize()}_billboardQuat(){return um(new E(0,0,1),this._camDirLocal())}get activeHandle(){return this._activeHandle}get dragging(){return this._dragging}startDrag(e,t,n){this._activeHandle=e,this._dragging=!0,this._updateColors(),this._onStartDrag(e,t,n)}endDrag(){this._activeHandle=null,this._dragging=!1,this._updateColors()}}})))()}function Dm(e,t,n){let r=[],i=[],a=[],o=[];for(let s=0;s<=n;s++){let c=-Math.PI/2+s/n*Math.PI,l=Math.cos(c),u=Math.sin(c);if(r.push(l*e,u*e,0),r.push(l*t,u*t,0),i.push(0,0,1,0,0,1),a.push(s/n,0,s/n,1),s<n){let e=s*2;o.push(e,e+1,e+2,e+1,e+3,e+2)}}let s=new Et;return s.setAttribute(`position`,new Float32Array(r),3),s.setAttribute(`normal`,new Float32Array(i),3),s.setAttribute(`uv`,new Float32Array(a),2),s.setAttribute(`index`,new Uint16Array(o),1),s}var Om,km;function Am(){return(Am=t((()=>{O(),M(),_m(),Em(),Om=[`x`,`y`,`z`],km=class extends Tm{_rings;_viewRoot;_dragCenter;_dragViewNormal;_dragU;_dragV;_dragAxisN;_dragSign;_dragLastAngle;_dragAccumAngle;_dragStartWorldQuat;_parentWorldQuatInv;constructor(e,t){super(e,t,`__gizmo_rotate`),this._dragCenter=new E,this._dragViewNormal=new E(0,0,1),this._dragU=new E(1,0,0),this._dragV=new E(0,1,0),this._dragAxisN=new E(0,0,1),this._dragSign=1,this._dragLastAngle=0,this._dragAccumAngle=0,this._dragStartWorldQuat=new Oe,this._parentWorldQuatInv=new Oe;let n={x:lm(new E(0,1,0),Math.PI/2),y:lm(new E(1,0,0),-Math.PI/2),z:new Oe};this._rings={};for(let e of Om){let t=this._createEntity(`__gizmo_ring_`+e),r=this._registerHandle(e,t,vm[e]);this._addVisual(t,Dm(.75,.8,48),r),this._addHit(t,Dm(.6,.95,24)),this._rings[e]={wrapper:t,base:n[e],baseInv:n[e].clone().inverse()}}this._viewRoot=this._createEntity(`__gizmo_ring_view`);let r=this._registerHandle(`view`,this._viewRoot,xm);this._addVisual(this._viewRoot,new Qt({innerRadius:1,outerRadius:1.05,thetaSegments:64}),r),this._addHit(this._viewRoot,new Qt({innerRadius:.92,outerRadius:1.13,thetaSegments:32}))}_onTargetUpdated(){let e=this._camDirLocal();for(let t of Om){let n=this._rings[t],r=fm(e,n.baseInv),i=Math.atan2(r.y,r.x);n.wrapper.quaternion.copy(n.base.clone().multiply(lm(new E(0,0,1),i)))}this._viewRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){this._dragCenter.copy(this.entity.position);let r=t.origin.clone().sub(this._dragCenter).normalize(),i=Math.abs(r.y)>.99?new E(1,0,0):new E(0,1,0);this._dragViewNormal=r,this._dragU=i.cross(r).normalize(),this._dragV=r.clone().cross(this._dragU).normalize(),e===`view`?(this._dragAxisN=r.clone(),this._dragSign=1):(this._dragAxisN=pm(n,e,this._orientation),this._dragSign=this._dragAxisN.dot(r)<0?-1:1),this._dragLastAngle=this._angleFromRay(t)??0,this._dragAccumAngle=0,this._dragStartWorldQuat=dm(n),this._parentWorldQuatInv=n.parent?dm(n.parent).inverse():new Oe}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this._angleFromRay(e);if(n===null)return null;let r=n-this._dragLastAngle;r>Math.PI?r-=Math.PI*2:r<-Math.PI&&(r+=Math.PI*2),this._dragAccumAngle+=r,this._dragLastAngle=n;let i=lm(this._dragAxisN,this._dragAccumAngle*this._dragSign),a=mm(this._parentWorldQuatInv,i,this._dragStartWorldQuat);return{euler:new Ee().setFromQuaternion(a)}}_angleFromRay(e){let t=gm(e,this._dragCenter,this._dragViewNormal);if(!t)return null;let n=t.sub(this._dragCenter);return Math.atan2(n.dot(this._dragV),n.dot(this._dragU))}}})))()}var jm,Mm,Nm,Pm,Fm,Im,Lm;function Rm(){return(Rm=t((()=>{O(),M(),_m(),Em(),jm=.02,Mm=.1,Nm=.001,Pm=1e-4,Fm=[`x`,`y`,`z`],Im=[`xy`,`yz`,`xz`],Lm=class extends Tm{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartAmount;_dragPlaneNormal;_dragStartScale;constructor(e,t){super(e,t,`__gizmo_scale`),this._dragStartPos=new E,this._dragAxisDir=new E(1,0,0),this._dragStartAmount=1,this._dragPlaneNormal=new E(0,0,1),this._dragStartScale=new E(1,1,1);for(let e of Fm)this._addAxisHandle(e);for(let e of Im)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addAxisHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,vm[e]),r=.6,i=this._addVisual(t,new At({radiusTop:jm,radiusBottom:jm,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new Ot({width:Mm,height:Mm,depth:Mm}),n);a.position.set(0,.9,0),this._addHit(t,new At({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new Ot({width:Mm*2,height:Mm*2,depth:Mm*2})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_rootQuaternion(e,t){return dm(e)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragStartScale.set(n.scale.x,n.scale.y,n.scale.z),e===`x`||e===`y`||e===`z`){this._dragAxisDir=pm(n,e,`local`);let r=hm(t,this._dragStartPos,this._dragAxisDir);this._dragStartAmount=Math.abs(r)<Pm?Pm:r;return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():pm(n,ym[e],`local`);let r=gm(t,this._dragStartPos,this._dragPlaneNormal),i=r?r.sub(this._dragStartPos).length():0;this._dragStartAmount=Math.max(Pm,i)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle,r;if(n===`x`||n===`y`||n===`z`)r=hm(e,this._dragStartPos,this._dragAxisDir)/this._dragStartAmount;else{let t=gm(e,this._dragStartPos,this._dragPlaneNormal);if(!t)return null;r=t.sub(this._dragStartPos).length()/this._dragStartAmount}Math.abs(r)<Nm&&(r=r<0?-.001:Nm);let i={x:!1,y:!1,z:!1};if(n===`center`)i.x=i.y=i.z=!0;else if(n===`x`||n===`y`||n===`z`)i[n]=!0;else for(let e of bm[n])i[e]=!0;return{scale:new E(this._dragStartScale.x*(i.x?r:1),this._dragStartScale.y*(i.y?r:1),this._dragStartScale.z*(i.z?r:1))}}}})))()}var zm,Bm,Vm,Hm,Um,Wm;function Gm(){return(Gm=t((()=>{O(),M(),_m(),Em(),zm=.02,Bm=.22,Vm=.06,Hm=[`x`,`y`,`z`],Um=[`xy`,`yz`,`xz`],Wm=class extends Tm{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartProjection;_dragPlaneNormal;_dragPlaneStart;constructor(e,t){super(e,t,`__gizmo_translate`),this._dragStartPos=new E,this._dragAxisDir=new E(1,0,0),this._dragStartProjection=0,this._dragPlaneNormal=new E(0,0,1),this._dragPlaneStart=null;for(let e of Hm)this._addArrowHandle(e);for(let e of Um)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addArrowHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,vm[e]),r=.6,i=this._addVisual(t,new At({radiusTop:zm,radiusBottom:zm,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new At({radiusTop:.001,radiusBottom:Vm,height:Bm,radSegments:8,heightSegments:1,caps:!0}),n);a.position.set(0,.96,0),this._addHit(t,new At({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new At({radiusTop:.001,radiusBottom:.11,height:Bm*1.5,radSegments:6,heightSegments:1,caps:!0})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t,n){if(this._dragStartPos.copy(this.entity.position),this._dragPlaneStart=null,e===`x`||e===`y`||e===`z`){this._dragAxisDir=pm(n,e,this._orientation),this._dragStartProjection=hm(t,this._dragStartPos,this._dragAxisDir);return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():pm(n,ym[e],this._orientation),this._dragPlaneStart=gm(t,this._dragStartPos,this._dragPlaneNormal)}updateDrag(e,t){if(!this.dragging||!this.activeHandle)return null;let n=this.activeHandle;if(n===`x`||n===`y`||n===`z`){let t=hm(e,this._dragStartPos,this._dragAxisDir)-this._dragStartProjection;return{position:this._dragStartPos.clone().add(this._dragAxisDir.clone().multiply(t))}}if(!this._dragPlaneStart)return null;let r=gm(e,this._dragStartPos,this._dragPlaneNormal);return r?{position:this._dragStartPos.clone().add(r.sub(this._dragPlaneStart))}:null}}})))()}var Km;function qm(){return(qm=t((()=>{M(),Am(),Rm(),Gm(),Km=class{_draw;_translateGizmo;_rotateGizmo;_scaleGizmo;_activeGizmo;_mode;_orientation;constructor(e,t){this._draw=t,this._translateGizmo=new Wm(e,t),this._rotateGizmo=new km(e,t),this._scaleGizmo=new Lm(e,t),this._mode=`select`,this._orientation=`global`,this._activeGizmo=null}get activeGizmo(){return this._activeGizmo}get mode(){return this._mode}setMode(e){this._mode=e,this._activeGizmo&&this._activeGizmo.setHover(null),this._activeGizmo=e===`translate`?this._translateGizmo:e===`rotate`?this._rotateGizmo:e===`scale`?this._scaleGizmo:null}get orientation(){return this._orientation}setOrientation(e){this._orientation=e}render(e,t,n,r){if(this._translateGizmo.entity.visible=!1,this._rotateGizmo.entity.visible=!1,this._scaleGizmo.entity.visible=!1,!this._activeGizmo||(this._activeGizmo.setTarget(t||null,n,this._orientation),!this._activeGizmo.entity.visible))return;this._activeGizmo.entity.updateMatrix(!0);let i=r.createEntityUpdateEvent();if(this._activeGizmo.entity.update(i),!n)return;let a=[];this._activeGizmo.entity.traverse(e=>{let t=e.getComponent(A);t&&t.material&&a.push(e)}),a.length>0&&this._draw.renderEntities({view:e,camera:n,entities:a,target:null})}}})))()}var Jm;function Ym(){return(Ym=t((()=>{M(),Jm=class{_draw;_entity;_color;_params;constructor(e,t){this._draw=t,this._color=[.35,.35,.35],this._params=[1,1,100],this._entity=e.createEntity({name:`__grid`}),this._entity.initiator=`god`,this._entity.addComponent(A,{geometry:new Mt({floor:!0}),material:t.materials.grid({color:this._color,params:this._params})})}render(e,t,n){if(!t)return;let r=t.matrixWorld.elm,i=Math.max(Math.abs(r[13]),.5),a=Math.max(0,Math.floor(Math.log10(i)));this._params[0]=10**a,this._params[1]=1-Math.max(0,Math.log10(i)-a),this._params[2]=Math.max(50,i*30),this._entity.position.set(r[12],0,r[14]),this._entity.scale.set(this._params[2]*2,1,this._params[2]*2),this._entity.update(n.createEntityUpdateEvent()),this._draw.renderEntities({view:e,camera:t,entities:[this._entity],target:null})}}})))()}var Xm;function Zm(){return(Zm=t((()=>{M(),Xm=class extends Et{constructor(){super(),this.update(50,1,.1,10)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,a,-n,o,-a,-n,o,-a,-n,-o,-a,-n,-o,-a,-n,-o,a,-n,-c,s,-r,c,s,-r,c,s,-r,c,-s,-r,c,-s,-r,-c,-s,-r,-c,-s,-r,-c,s,-r,-o,a,-n,-c,s,-r,o,a,-n,c,s,-r,o,-a,-n,c,-s,-r,-o,-a,-n,-c,-s,-r]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.requestUpdate()}}})))()}var Qm;function $m(){return($m=t((()=>{M(),Qm=class extends Et{constructor(){super(),this.update(50,1,.1,2)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,-a,-n,-o,-a,-n,-c,s,-r,c,s,-r,c,-s,-r,-c,-s,-r]),u=new Uint16Array([0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,6,2,3,7,6,0,4,7,0,7,3,1,2,6,1,6,5]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.setAttribute(`index`,u,1),this.requestUpdate()}}})))()}var eh;function th(){return(th=t((()=>{M(),eh=class extends Et{constructor(e=.5){super();let t=[];for(let n=0;n<16;n++){let r=n/16*Math.PI*2,i=(n+1)/16*Math.PI*2;t.push(Math.cos(r)*e,Math.sin(r)*e,0,Math.cos(i)*e,Math.sin(i)*e,0)}let n=e*2;for(let r=0;r<4;r++){let i=r/4*Math.PI*2,a=Math.cos(i)*e*.5,o=Math.sin(i)*e*.5;t.push(a,o,0,a,o,-n)}let r=new Float32Array(t);this.setAttribute(`position`,r,3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3)}}})))()}var nh;function rh(){return(rh=t((()=>{M(),nh=class extends Et{constructor(e=.5){super();let t=e*2,n=[],r=[];n.push(0,0,0);for(let t=0;t<12;t++){let r=t/12*Math.PI*2;n.push(Math.cos(r)*e,Math.sin(r)*e,0)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(0,e+1,t+1)}n.push(0,0,-t);for(let r=0;r<12;r++){let i=r/12*Math.PI*2;n.push(Math.cos(i)*e,Math.sin(i)*e,-t)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(13,13+t+1,13+e+1)}for(let e=0;e<12;e++){let t=(e+1)%12,n=e+1,i=t+1,a=13+e+1,o=13+t+1;r.push(n,a,o),r.push(n,o,i)}this.setAttribute(`position`,new Float32Array(n),3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(r),1)}}})))()}var ih;function ah(){return(ah=t((()=>{M(),ih=class extends Et{constructor(e=.3){super();let t=e/2,n=new Float32Array([-t,0,0,t,0,0,0,-t,0,0,t,0,0,0,-t,0,0,t]);this.setAttribute(`position`,n,3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3)}}})))()}var oh;function sh(){return(sh=t((()=>{M(),oh=class extends Et{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[];for(let e=0;e<16;e++){let i=e/16*Math.PI*2,a=(e+1)/16*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t,Math.cos(a)*n,Math.sin(a)*n,-t)}for(let e=0;e<4;e++){let i=e/4*Math.PI*2;r.push(0,0,0,Math.cos(i)*n,Math.sin(i)*n,-t)}let i=new Float32Array(r);this.setAttribute(`position`,i,3),this.setAttribute(`normal`,new Float32Array(i.length).fill(0),3),this.requestUpdate()}}})))()}var ch;function lh(){return(lh=t((()=>{M(),ch=class extends Et{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[0,0,0];for(let e=0;e<12;e++){let i=e/12*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t)}let i=[];for(let e=0;e<12;e++){let t=(e+1)%12;i.push(0,e+1,t+1)}for(let e=1;e<11;e++)i.push(1,e+2,e+1);this.setAttribute(`position`,new Float32Array(r),3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(i),1),this.requestUpdate()}}})))()}var uh;function dh(){return(dh=t((()=>{O(),M(),Zm(),$m(),th(),rh(),ah(),sh(),lh(),uh=class{entity;hitAreaEntity;type;targetEntityUUID;_geometry;_hitAreaGeometry;_matrixOffset;_baseColor;_colorUniform;constructor(e,t,n,r){this.type=n,this.targetEntityUUID=r,this.entity=e.createEntity({name:`__helper`}),this.entity.initiator=`god`;let i=this._getColor();this._baseColor=i,this._colorUniform=[...i];let a=t.materials.flat({color:this._colorUniform,lines:!0});this._geometry=this._createGeometry(),this.entity.addComponent(A,{geometry:this._geometry,material:a}),this._hitAreaGeometry=this._createHitAreaGeometry(),this.hitAreaEntity=e.createEntity({name:`__helper_hit`}),this.hitAreaEntity.initiator=`god`,this._hitAreaGeometry&&this.hitAreaEntity.addComponent(A,{geometry:this._hitAreaGeometry}),this._matrixOffset=n===`spotLight`||n===`directionalLight`?new Oe().setFromEuler({x:-Math.PI/2,y:0,z:0}):null}_getColor(){switch(this.type){case`empty`:return[.8,.5,.2];case`camera`:return[.6,.8,1];case`spotLight`:return[1,.9,.4];case`directionalLight`:return[1,.9,.4]}}_createGeometry(){switch(this.type){case`empty`:return new ih;case`camera`:return new Xm;case`spotLight`:return new oh;case`directionalLight`:return new eh}}_createHitAreaGeometry(){switch(this.type){case`empty`:return null;case`camera`:return new Qm;case`spotLight`:return new ch;case`directionalLight`:return new nh}}getWorldSegments(){let e=this._geometry.getAttribute(`position`);if(!e)return[];let t=e.array,n=[];for(let e=0;e+5<t.length;e+=6)n.push({a:new E(t[e+0],t[e+1],t[e+2]).applyMatrix4AsPosition(this.entity.matrixWorld),b:new E(t[e+3],t[e+4],t[e+5]).applyMatrix4AsPosition(this.entity.matrixWorld)});return n}setSelected(e){let t=e?[1,.6,0]:this._baseColor;this._colorUniform[0]=t[0],this._colorUniform[1]=t[1],this._colorUniform[2]=t[2]}syncTransform(e){if(this.entity.matrixWorld.copy(e.matrixWorld),this.hitAreaEntity.matrixWorld.copy(e.matrixWorld),this._matrixOffset&&(this.entity.matrixWorld.applyQuaternion(this._matrixOffset),this.hitAreaEntity.matrixWorld.applyQuaternion(this._matrixOffset)),this.type===`camera`){let t=e.getComponentsByTag(`camera`)[0];t&&(this._geometry instanceof Xm&&this._geometry.update(t.fov,t.aspect,.1,2),this._hitAreaGeometry instanceof Qm&&this._hitAreaGeometry.update(t.fov,t.aspect,.1,2))}else if(this.type===`spotLight`){let t=e.getComponent(Bt);if(t){let e=Math.min(t.distance,10);this._geometry instanceof oh&&this._geometry.update(t.angle,e),this._hitAreaGeometry instanceof ch&&this._hitAreaGeometry.update(t.angle,e)}}}}})))()}var fh;function ph(){return(ph=t((()=>{M(),dh(),fh=class{_engine;_draw;_helpers;constructor(e,t){this._engine=e,this._draw=t,this._helpers=new Map}sync(e,t){let n=new Set;e.root.traverse(r=>{if(r.initiator===`god`||!r.visible)return;let i=this._getHelperType(r);if(!i)return;n.add(r.uuid);let a=this._helpers.get(r.uuid);a||(a=new uh(this._engine,this._draw,i,r.uuid),this._helpers.set(r.uuid,a));let o=e.createEntityUpdateEvent();a.entity.update(o),a.hitAreaEntity.update(o),a.setSelected(r.uuid===t),a.syncTransform(r)}),this._helpers.forEach((e,t)=>{n.has(t)||this._helpers.delete(t)})}render(e,t,n){if(!t)return;let r=[];for(let e of this._helpers.values())this.isVisible(e,n)&&e.targetEntityUUID!==t.uuid&&e.entity.traverse(e=>{e.getComponent(A)&&r.push(e)});r.length>0&&this._draw.renderEntities({view:e,camera:t,entities:r,target:null})}getHelpers(){return Array.from(this._helpers.values())}isVisible(e,t){if(!t.show)return!1;switch(e.type){case`empty`:return t.empty;case`camera`:return t.camera;case`spotLight`:case`directionalLight`:return t.light}}_getHelperType(e){let t=e.getComponent(Bt);return t?t.lightType===`spot`?`spotLight`:`directionalLight`:e.getComponentsByTag(`camera`)[0]?`camera`:e.getComponent(A)?null:`empty`}}})))()}var mh,hh,gh;function _h(){return(_h=t((()=>{ui(),mh=[{code:`Numpad1`,key:`1`,axis:`front`},{code:`Numpad3`,key:`3`,axis:`right`},{code:`Numpad7`,key:`7`,axis:`top`}],hh=()=>{let e=document.activeElement;return e?e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.isContentEditable:!1},gh=class{_keyboard;constructor(e){this._keyboard=new li,this._keyboard.on(`keydown`,(t,n)=>{if(t.isComposing)return;let r=n.Meta||n.Control;if(r&&n.s&&(t.preventDefault(),e.onSave()),!hh()&&!e.onTransformKey(t)){r&&n.z&&(t.preventDefault(),n.Shift?e.onRedo():e.onUndo()),t.key==` `&&!r&&e.onPlayToggle(),(t.code===`Numpad0`||t.key===`0`)&&!r&&e.onCameraViewToggle(),t.key===`9`&&!r&&e.onPreviewToggle(),t.key===`Escape`&&!r&&e.onSyncToSceneCamera(),t.code===`KeyA`&&n.Shift&&!r&&(t.preventDefault(),e.onAddEntity());for(let r of mh)(t.code===r.code||t.key===r.key)&&(n.Meta||(t.preventDefault(),e.onAlignView(r.axis,!!n.Control)));(t.code===`Numpad5`||t.key===`5`)&&!r&&e.onProjectionToggle(),(t.code===`NumpadDecimal`||t.key===`.`)&&!r&&e.onFocusSelected(),(t.code===`KeyX`||t.key===`Delete`)&&!r&&e.onDeleteSelected(),t.code===`KeyD`&&n.Shift&&!r&&e.onDuplicateSelected(),t.key===`F2`&&!r&&e.onRenameSelected(),t.key===`ArrowLeft`&&!r&&(t.preventDefault(),n.Shift?e.onSeekToStart():e.onStepFrame(-1)),t.key===`ArrowRight`&&!r&&(t.preventDefault(),e.onStepFrame(1))}})}dispose(){this._keyboard.dispose()}}})))()}var vh,yh,bh;function xh(){return(xh=t((()=>{O(),vh=e=>{let t=e.getBoundingClientRect(),n=e.width/e.height,r=t.width/t.height,i=t.width,a=t.height,o=0,s=0;return r>n?(i=t.height*n,o=(t.width-i)/2):(a=t.width/n,s=(t.height-a)/2),{left:t.left+o,top:t.top+s,width:i,height:a}},yh=(e,t,n)=>{let r=vh(e),i=(t-r.left)/r.width*2-1,a=-((n-r.top)/r.height)*2+1;return new E(i,a)},bh=(e,t,n)=>{let r=vh(e),i=(t+1)/2*r.width+r.left,a=(1-n)/2*r.height+r.top;return new E(i,a)}})))()}var Sh,Ch,wh,Th,Eh,Dh,Oh;function kh(){return(kh=t((()=>{O(),M(),om(),xh(),_m(),Sh=1,Ch=.001,wh=.007,Th=.1,Eh={translate:`position`,rotate:`euler`,scale:`scale`},Dh=[`x`,`y`,`z`],Oh=class{_engine;_getViewport;_api;_getSelectedEntity;_isPointerBusy;_onStatusChange;_pointerClient;_session;_disposeListeners;constructor(e){this._engine=e.engine,this._getViewport=e.getViewport,this._api=e.api,this._getSelectedEntity=e.getSelectedEntity,this._isPointerBusy=e.isPointerBusy,this._onStatusChange=e.onStatusChange,this._pointerClient=new E,this._session=null;let t=e=>{this._pointerClient.set(e.clientX,e.clientY)};window.addEventListener(`pointermove`,t),this._disposeListeners=()=>{window.removeEventListener(`pointermove`,t)}}get active(){return this._session!==null}get constraintDisplay(){let e=this._session;if(!e||e.trackball||!e.constraint)return null;let t=e.constraint,n=e.mode===`scale`||t.orientation===`local`;return{origin:e.anchorWorldPos,quat:n?e.startWorldQuat:new Oe,axes:t.plane?Dh.filter(e=>e!==t.axis):[t.axis]}}handleKeyDown(e){let t=this._session;if(!t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return!1;let t=e.key.toLowerCase(),n=t===`g`?`translate`:t===`r`?`rotate`:t===`s`?`scale`:null;return n?this.start(n):!1}let n=e.key.toLowerCase();return e.key===`Enter`?this._confirm():e.key===`Escape`?this._cancel():n===`r`&&t.mode===`rotate`?this._toggleTrackball():t.trackball||(n===`x`||n===`y`||n===`z`?this._toggleConstraint(n,e.shiftKey):this._inputNumber(e.key)),!0}_inputNumber(e){let t=this._session;if(t){if(e.length===1&&e>=`0`&&e<=`9`)t.numberBuffer+=e;else if(e===`.`){if(t.numberBuffer.includes(`.`))return;t.numberBuffer+=`.`}else if(e===`-`)t.numberBuffer=t.numberBuffer.startsWith(`-`)?t.numberBuffer.slice(1):`-`+t.numberBuffer;else if(e===`Backspace`){if(t.numberBuffer===``)return;t.numberBuffer=t.numberBuffer.slice(0,-1)}else return;this._update()}}start(e){if(this._isPointerBusy())return!1;let t=this._getViewport();if(!t)return!1;let n=t.editorCamera,r=n.getCameraEntity(this._engine);if(!r)return!1;let i=this._getSelectedEntity(),a=n.view===`camera`&&(!i||i===r);if(a&&e===`scale`)return!1;let o=a?r:i;if(!o)return!1;let s=r.getComponentsByTag(`camera`)[0];if(!s)return!1;let c=r.matrixWorld.elm,l=new E(c[12],c[13],c[14]),u=new E(-c[8],-c[9],-c[10]).normalize(),d=new E(c[0],c[1],c[2]).normalize(),f=new E(c[4],c[5],c[6]).normalize(),p=o.matrixWorld.elm,m=new E(p[12],p[13],p[14]),h=a?m.clone().add(u.clone().multiply(Math.max(s.dofParams.focusDistance,Th))):m.clone(),g=e=>{e.stopPropagation(),this._session&&(this._session.lastPointer.set(e.clientX,e.clientY),this._update())},_=e=>{e.preventDefault(),e.stopPropagation(),e.button===2?this._cancel():e.button===0&&this._confirm()};window.addEventListener(`pointermove`,g,{capture:!0}),window.addEventListener(`pointerdown`,_,{capture:!0});let v=n.orbitControls,y=v.enabled;return v.enabled=!1,this._session={mode:e,entity:o,canvas:t.canvas,selfView:a,constraint:null,numberBuffer:``,trackball:!1,trackballQuat:new Oe,trackballPointer:this._pointerClient.clone(),startValue:{position:o.position.getElm(`vec3`),euler:o.euler.getElm(`vec3`),scale:o.scale.getElm(`vec3`)},startWorldPos:m,startWorldQuat:dm(o),parentWorldInv:o.parent?o.parent.matrixWorld.clone().inverse():new D,parentWorldQuatInv:o.parent?dm(o.parent).inverse():new Oe,camForward:u,camRight:d,camUp:f,camWorldPos:l,anchorWorldPos:h,projInv:s.projectionMatrix.clone().inverse(),viewInv:s.viewMatrix.clone().inverse(),centerClient:this._projectToClient(m,s,t.canvas),startPointer:this._pointerClient.clone(),lastPointer:this._pointerClient.clone(),disposeSession:()=>{window.removeEventListener(`pointermove`,g,{capture:!0}),window.removeEventListener(`pointerdown`,_,{capture:!0}),v.enabled=y,this._session&&this._pointerClient.copy(this._session.lastPointer),this._session=null,this._onStatusChange(null)}},this._update(),!0}_confirm(){let e=this._session;if(!e)return;let t=Eh[e.mode],n=e.entity[t].getElm(`vec3`);this._api.commandManager.execute(new am(e.entity,t,e.startValue[t],n)),e.disposeSession()}_cancel(){let e=this._session;e&&(this._restoreStart(e),e.entity.updateMatrix(!0),e.disposeSession())}_restoreStart(e){e.entity.position.setFromArray(e.startValue.position),e.entity.euler.setFromArray(e.startValue.euler),e.entity.scale.setFromArray(e.startValue.scale)}_toggleConstraint(e,t){let n=this._session;if(!n||t&&n.mode===`rotate`)return;let r=n.constraint;n.constraint=!r||r.axis!==e||r.plane!==t?{axis:e,orientation:`global`,plane:t}:r.orientation===`global`?{axis:e,orientation:`local`,plane:t}:null,this._update()}_axisWorldDir(e,t,n){let r=new E(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:fm(r,e.startWorldQuat).normalize()}_toggleTrackball(){let e=this._session;e&&(e.trackball=!e.trackball,e.constraint=null,e.numberBuffer=``,e.trackballQuat=new Oe,e.trackballPointer.copy(e.lastPointer),this._update())}_accumulateTrackball(e){let t=e.lastPointer.x-e.trackballPointer.x,n=e.lastPointer.y-e.trackballPointer.y;if(e.trackballPointer.copy(e.lastPointer),t===0&&n===0)return;let r=lm(e.camUp,t*wh).multiply(lm(e.camRight,n*wh));e.trackballQuat.preMultiply(r)}_update(){let e=this._session;if(!e)return;let t=e.numberBuffer===``?null:parseFloat(e.numberBuffer),n=0;t!==null&&Number.isNaN(t)?this._restoreStart(e):n=e.mode===`translate`?this._applyTranslate(e,t):e.mode===`rotate`?this._applyRotate(e,t):this._applyScale(e,t),e.entity.updateMatrix(!0),this._onStatusChange(this._statusText(e,n))}_applyTranslate(e,t){let n=e.constraint;if(t!==null){let n=this._numericTranslateDir(e);return this._setWorldPosition(e,e.startWorldPos.clone().add(n.multiply(t))),t}let r=this._rayFromClient(e.startPointer,e),i=this._rayFromClient(e.lastPointer,e);if(n&&!n.plane){let t=this._axisWorldDir(e,n.axis,n.orientation),a=hm(i,e.anchorWorldPos,t)-hm(r,e.anchorWorldPos,t);return this._setWorldPosition(e,e.startWorldPos.clone().add(t.clone().multiply(a))),a}let a=n?this._axisWorldDir(e,n.axis,n.orientation):e.camForward,o=gm(r,e.anchorWorldPos,a),s=gm(i,e.anchorWorldPos,a);if(!o||!s)return 0;let c=s.sub(o);return this._setWorldPosition(e,e.startWorldPos.clone().add(c)),c.length()}_numericTranslateDir(e){let t=e.constraint;if(!t)return new E(1,0,0);let n=t.plane?t.axis===`x`?`y`:`x`:t.axis;return this._axisWorldDir(e,n,t.orientation)}_applyRotate(e,t){if(e.trackball)return this._accumulateTrackball(e),this._setWorldRotation(e,e.trackballQuat.clone()),0;let n=e.constraint?this._axisWorldDir(e,e.constraint.axis,e.constraint.orientation):e.camForward,r=e.selfView?e.camForward.clone().multiply(-1):e.camWorldPos.clone().sub(e.startWorldPos),i=t!==null&&e.constraint?1:n.dot(r)<0?-1:1,a=t===null?this._screenAngle(e.lastPointer,e.centerClient)-this._screenAngle(e.startPointer,e.centerClient):t*Math.PI/180;return this._setWorldRotation(e,lm(n,a*i)),a*180/Math.PI}_applyScale(e,t){let n;if(t!==null)n=t;else{let t=Math.max(Sh,e.startPointer.distanceTo(e.centerClient));n=Math.max(Ch,e.lastPointer.distanceTo(e.centerClient)/t)}let r=e.startValue.scale,i=e.constraint,a=Dh.map(e=>i?(i.plane?e!==i.axis:e===i.axis)?n:1:n);return e.entity.scale.set(r[0]*a[0],r[1]*a[1],r[2]*a[2]),n}_setWorldPosition(e,t){let n=t.applyMatrix4AsPosition(e.parentWorldInv);e.entity.position.set(n.x,n.y,n.z)}_setWorldRotation(e,t){e.entity.quaternion.copy(mm(e.parentWorldQuatInv,t,e.startWorldQuat))}_statusText(e,t){if(e.trackball)return`Rot: trackball`;let n=e.mode===`translate`?`Move D`:e.mode===`rotate`?`Rot`:`Scale`,r=e.mode===`rotate`?`°`:``;return`${n}: ${e.numberBuffer===``?t.toFixed(e.mode===`rotate`?1:3):`[${e.numberBuffer}]`}${r} (${this._constraintText(e)})`}_constraintText(e){let t=e.constraint;if(!t)return e.mode===`translate`?`view plane`:e.mode===`rotate`?`view axis`:`uniform`;let n=Dh.filter(e=>t.plane?e!==t.axis:e===t.axis).join(``).toUpperCase();return`${e.mode===`scale`?`local`:t.orientation} ${n}`}_rayFromClient(e,t){let n=yh(t.canvas,e.x,e.y);return new rn().setFromCamera(n,t.projInv,t.viewInv)}_projectToClient(e,t,n){let r=new E(e.x,e.y,e.z,1).applyMatrix4(t.viewMatrix).applyMatrix4(t.projectionMatrix);return Math.abs(r.w)<1e-4?bh(n,0,0):bh(n,r.x/r.w,r.y/r.w)}_screenAngle(e,t){return Math.atan2(-(e.y-t.y),e.x-t.x)}dispose(){this._cancel(),this._disposeListeners()}}})))()}function U(e){if(!e)throw Error(`Assertion failed.`)}var Ah,jh,Mh,W,Nh,Ph,Fh,Ih,Lh,Rh,zh,Bh,Vh,Hh,Uh,Wh,Gh,Kh,qh,Jh,Yh,Xh,Zh,Qh,$h,eg,tg,ng,rg,ig,ag,og,sg,cg,lg,ug,dg,fg,pg,mg,hg,gg,_g;function vg(){return(vg=t((()=>{Ah=e=>{let t=(e%360+360)%360;if(t===0||t===90||t===180||t===270)return t;throw Error(`Invalid rotation ${e}.`)},jh=e=>e&&e[e.length-1],Mh=e=>e>=0&&e<2**32,W=e=>{let t=0;for(;e.readBits(1)===0&&t<32;)t++;if(t>=32)throw Error(`Invalid exponential-Golomb code.`);return(1<<t)-1+e.readBits(t)},Nh=e=>{let t=W(e);return t&1?t+1>>1:-(t>>1)},Ph=e=>e.constructor===Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),Fh=e=>e.constructor===DataView?e:ArrayBuffer.isView(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(e),Ih=new TextEncoder,Lh={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12},Rh={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18},zh={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9},Bh=e=>!!e&&!!e.primaries&&!!e.transfer&&!!e.matrix&&e.fullRange!==void 0,Vh=e=>e instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e),Hh=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(t=>{let n=!1;e=()=>{n||=(t(),this.pending--,!0)}}),n=this.currentPromise;return this.currentPromise=t,this.pending++,await n,e}},Uh=(e,t,n)=>{let r=0,i=e.length-1,a=-1;for(;r<=i;){let o=r+(i-r+1)/2|0;n(e[o])<=t?(a=o,r=o+1):i=o-1}return a},Wh=()=>{let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}},Gh=e=>{throw Error(`Unexpected value: ${e}`)},Kh=(e,t,n)=>{let r=e.getUint8(t),i=e.getUint8(t+1),a=e.getUint8(t+2);return n?r|i<<8|a<<16:r<<16|i<<8|a},qh=(e,t,n,r)=>{n>>>=0,n&=16777215,r?(e.setUint8(t,n&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n>>>16&255)):(e.setUint8(t,n>>>16&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n&255))},Jh=(e,t,n)=>Math.max(t,Math.min(n,e)),Yh=(e,t,n)=>e+(t-e)*n,Xh=(e,t)=>Math.round(e/t)*t,Zh=(e,t)=>Math.floor(e*t)/t,Qh=/^[a-z]{3}$/,$h=e=>Qh.test(e),eg=1e6*(1+2**-52),tg=(e,t)=>{let n=e<0?-1:1;e=Math.abs(e);let r=0,i=1,a=1,o=0,s=e;for(;;){let e=Math.floor(s),c=e*a+r,l=e*o+i;if(l>t)return{num:n*a,den:o};if(r=a,i=o,a=c,o=l,s=1/(s-e),!isFinite(s))break}return{num:n*a,den:o}},ng=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}},rg=null,ig=()=>rg===null?rg=typeof navigator<`u`&&navigator.userAgent?.includes(`Firefox`):rg,ag=null,og=()=>ag===null?ag=!!(typeof navigator<`u`&&(navigator.vendor?.includes(`Google Inc`)||/Chrome/.test(navigator.userAgent))):ag,sg=null,cg=()=>{if(sg!==null)return sg;if(typeof navigator>`u`)return null;let e=/\bChrome\/(\d+)/.exec(navigator.userAgent);return e?sg=Number(e[1]):null},lg=function*(e){for(let t in e){let n=e[t];n!==void 0&&(yield{key:t,value:n})}},ug=()=>{Symbol.dispose??=Symbol(`Symbol.dispose`)},dg=(e,t)=>{let n=-1,r=1/0;for(let i=0;i<e.length;i++){let a=t(e[i]);a<r&&(r=a,n=i)}return n},fg=e=>{U(Number.isInteger(e.num)),U(Number.isInteger(e.den)),U(e.den!==0);let t=Math.abs(e.num),n=Math.abs(e.den);for(;n!==0;){let e=t%n;t=n,n=e}let r=t||1;return{num:e.num/r,den:e.den/r}},pg=(e,t)=>{if(typeof e!=`object`||!e)throw TypeError(`${t} must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(`${t}.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(`${t}.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(`${t}.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(`${t}.height must be a non-negative integer.`)},mg=e=>new Promise(t=>setTimeout(t,e)),hg=e=>Array.isArray(e)?e:[e],gg=class{constructor(){this._listeners=new Map}on(e,t,n){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:n?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,n]=e,r=this._listeners.get(t);if(r)for(let e of r){try{e.fn(n)}catch(e){console.error(e)}e.once&&r.delete(e)}}},_g=e=>typeof e==`object`&&!!e&&Object.getPrototypeOf(e)===Object.prototype&&Object.values(e).every(e=>typeof e==`string`)})))()}var yg,bg;function xg(){return(xg=t((()=>{vg(),(function(e){e[e.Silent=0]=`Silent`,e[e.Errors=1]=`Errors`,e[e.Warnings=2]=`Warnings`,e[e.Info=3]=`Info`})(yg||={}),bg=class e{constructor(){}static get level(){return e._level}static set level(t){if(t!==yg.Silent&&t!==yg.Errors&&t!==yg.Warnings&&t!==yg.Info)throw TypeError(`Invalid log level. Use one of the values of the LogLevel enum.`);e._level=t}static get _emitter(){return e._emitterInstance??=new gg}static on(t,n,r){return e._emitter.on(t,n,r)}static _error(...t){e._emitter._emit(`error`,t),e._level>=yg.Errors&&console.error(...t)}static _warn(...t){e._emitter._emit(`warn`,t),e._level>=yg.Warnings&&console.warn(...t)}static _info(...t){e._emitter._emit(`info`,t),e._level>=yg.Info&&console.info(...t)}},bg._level=yg.Info,bg._emitterInstance=null})))()}var Sg,Cg,wg,Tg;function Eg(){return(Eg=t((()=>{vg(),Sg=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(typeof t!=`string`)throw TypeError(`mimeType must be a string.`)}},Cg=class{constructor(e,t,n,r){if(this.data=e,this.mimeType=t,this.name=n,this.description=r,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==void 0&&typeof t!=`string`)throw TypeError(`mimeType, when provided, must be a string.`);if(n!==void 0&&typeof n!=`string`)throw TypeError(`name, when provided, must be a string.`);if(r!==void 0&&typeof r!=`string`)throw TypeError(`description, when provided, must be a string.`)}},wg=e=>{if(!e||typeof e!=`object`)throw TypeError(`tags must be an object.`);if(e.title!==void 0&&typeof e.title!=`string`)throw TypeError(`tags.title, when provided, must be a string.`);if(e.description!==void 0&&typeof e.description!=`string`)throw TypeError(`tags.description, when provided, must be a string.`);if(e.artist!==void 0&&typeof e.artist!=`string`)throw TypeError(`tags.artist, when provided, must be a string.`);if(e.album!==void 0&&typeof e.album!=`string`)throw TypeError(`tags.album, when provided, must be a string.`);if(e.albumArtist!==void 0&&typeof e.albumArtist!=`string`)throw TypeError(`tags.albumArtist, when provided, must be a string.`);if(e.trackNumber!==void 0&&(!Number.isInteger(e.trackNumber)||e.trackNumber<=0))throw TypeError(`tags.trackNumber, when provided, must be a positive integer.`);if(e.tracksTotal!==void 0&&(!Number.isInteger(e.tracksTotal)||e.tracksTotal<=0))throw TypeError(`tags.tracksTotal, when provided, must be a positive integer.`);if(e.discNumber!==void 0&&(!Number.isInteger(e.discNumber)||e.discNumber<=0))throw TypeError(`tags.discNumber, when provided, must be a positive integer.`);if(e.discsTotal!==void 0&&(!Number.isInteger(e.discsTotal)||e.discsTotal<=0))throw TypeError(`tags.discsTotal, when provided, must be a positive integer.`);if(e.genre!==void 0&&typeof e.genre!=`string`)throw TypeError(`tags.genre, when provided, must be a string.`);if(e.date!==void 0&&(!(e.date instanceof Date)||Number.isNaN(e.date.getTime())))throw TypeError(`tags.date, when provided, must be a valid Date.`);if(e.lyrics!==void 0&&typeof e.lyrics!=`string`)throw TypeError(`tags.lyrics, when provided, must be a string.`);if(e.images!==void 0){if(!Array.isArray(e.images))throw TypeError(`tags.images, when provided, must be an array.`);for(let t of e.images){if(!t||typeof t!=`object`)throw TypeError(`Each image in tags.images must be an object.`);if(!(t.data instanceof Uint8Array))throw TypeError(`Each image.data must be a Uint8Array.`);if(typeof t.mimeType!=`string`)throw TypeError(`Each image.mimeType must be a string.`);if(![`coverFront`,`coverBack`,`unknown`].includes(t.kind))throw TypeError(`Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.`)}}if(e.comment!==void 0&&typeof e.comment!=`string`)throw TypeError(`tags.comment, when provided, must be a string.`);if(e.raw!==void 0){if(!e.raw||typeof e.raw!=`object`)throw TypeError(`tags.raw, when provided, must be an object.`);for(let t of Object.values(e.raw))if(t!==null&&typeof t!=`string`&&!(t instanceof Uint8Array)&&!(t instanceof Sg)&&!(t instanceof Cg)&&!_g(t))throw TypeError(`Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.`)}},Tg=e=>{if(!e||typeof e!=`object`)throw TypeError(`disposition must be an object.`);if(e.default!==void 0&&typeof e.default!=`boolean`)throw TypeError(`disposition.default must be a boolean.`);if(e.primary!==void 0&&typeof e.primary!=`boolean`)throw TypeError(`disposition.primary must be a boolean.`);if(e.forced!==void 0&&typeof e.forced!=`boolean`)throw TypeError(`disposition.forced must be a boolean.`);if(e.original!==void 0&&typeof e.original!=`boolean`)throw TypeError(`disposition.original must be a boolean.`);if(e.commentary!==void 0&&typeof e.commentary!=`boolean`)throw TypeError(`disposition.commentary must be a boolean.`);if(e.hearingImpaired!==void 0&&typeof e.hearingImpaired!=`boolean`)throw TypeError(`disposition.hearingImpaired must be a boolean.`);if(e.visuallyImpaired!==void 0&&typeof e.visuallyImpaired!=`boolean`)throw TypeError(`disposition.visuallyImpaired must be a boolean.`)}})))()}var Dg;function Og(){return(Og=t((()=>{Dg=class e{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,n=7-(this.pos&7),r=(t&1<<n)>>n;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let n=0;n<e;n++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let n=this.pos+e;for(let e=this.pos;e<n;e++){let r=Math.floor(e/8),i=this.bytes[r],a=7-(e&7);i&=~(1<<a),i|=(t&1<<n-e-1)>>n-e-1<<a,this.bytes[r]=i}this.pos=n}readAlignedByte(){if(this.pos%8!=0)throw Error(`Bitstream is not byte-aligned.`);let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let t=new e(this.bytes);return t.pos=this.pos,t}}})))()}var kg,Ag,jg;function Mg(){return(Mg=t((()=>{Og(),kg=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],Ag=[-1,1,2,3,4,5,6,8],jg=e=>{let t=kg.indexOf(e.sampleRate),n=null;t===-1&&(t=15,n=e.sampleRate);let r=Ag.indexOf(e.numberOfChannels);if(r===-1)throw TypeError(`Unsupported number of channels: ${e.numberOfChannels}`);let i=13;e.objectType>=32&&(i+=6),t===15&&(i+=24);let a=Math.ceil(i/8),o=new Uint8Array(a),s=new Dg(o);return e.objectType<32?s.writeBits(5,e.objectType):(s.writeBits(5,31),s.writeBits(6,e.objectType-32)),s.writeBits(4,t),t===15&&s.writeBits(24,n),s.writeBits(4,r),o}})))()}var Ng,Pg,Fg,Ig,Lg,Rg,zg,Bg,Vg,Hg,Ug,Wg,Gg,Kg,qg,Jg,Yg,Xg,Zg,Qg,$g,e_,t_,n_,r_,i_;function a_(){return(a_=t((()=>{vg(),Ng=[`avc`,`hevc`,`vp9`,`av1`,`vp8`,`prores`],Pg=[`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,`pcm-u8`,`pcm-s8`,`ulaw`,`alaw`],Fg=[`aac`,`opus`,`mp3`,`vorbis`,`flac`,`ac3`,`eac3`],Ig=[...Fg,...Pg],Lg=[`webvtt`],Rg=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],zg=[{maxPictureSize:36864,maxBitrate:128e3,tier:`L`,level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:`L`,level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:`L`,level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:`L`,level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:`L`,level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:`L`,level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:`H`,level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:`L`,level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:`H`,level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:`L`,level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:`L`,level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:`L`,level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:`L`,level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:`L`,level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:`L`,level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:186}],Bg=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],Vg=[{maxPictureSize:147456,maxBitrate:15e5,tier:`M`,level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:`M`,level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:`M`,level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:`M`,level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:`M`,level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:`H`,level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:`M`,level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:`H`,level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:`M`,level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:`M`,level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:`M`,level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:`M`,level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:19}],Hg=[`ap4x`,`ap4h`,`apch`,`apcn`,`apcs`,`apco`],Ug=[{fourCc:`apco`,bitrate:45e6,alpha:!1},{fourCc:`apcs`,bitrate:102e6,alpha:!1},{fourCc:`apcn`,bitrate:147e6,alpha:!1},{fourCc:`apch`,bitrate:22e7,alpha:!1},{fourCc:`ap4h`,bitrate:33e7,alpha:!0},{fourCc:`ap4x`,bitrate:5e8,alpha:!0}],Wg=(e,t,n,r,i)=>{if(e===`avc`){let e=Math.ceil(t/16)*Math.ceil(n/16),i=Rg.find(t=>e<=t.maxMacroblocks&&r<=t.maxBitrate)??jh(Rg),a=i?i.level:0;return`avc1.${`64`.padStart(2,`0`)}00${a.toString(16).padStart(2,`0`)}`}if(e===`hevc`){let e=t*n,i=zg.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??jh(zg);return`hev1.1.6.${i.tier}${i.level}.B0`}if(e===`vp8`)return`vp8`;if(e===`vp9`){let e=t*n;return`vp09.00.${(Bg.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??jh(Bg)).level.toString().padStart(2,`0`)}.08`}if(e===`av1`){let e=t*n,i=Vg.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??jh(Vg);return`av01.0.${i.level.toString().padStart(2,`0`)}${i.tier}.08`}if(e===`prores`){let e=(t*n/2073600)**.95,a=Ug.filter(e=>e.alpha===i),o=a[0].fourCc,s=1/0;for(let{fourCc:t,bitrate:n}of a){let i=Math.abs(n*e-r);i<s&&(s=i,o=t)}return o}throw Gh(e),TypeError(`Unhandled codec '${String(e)}'.`)},Gg=e=>{let t=e.split(`.`),n=Number(t[1]),r=t[2],i=Number(r.slice(0,-1)),a=(n<<5)+i,o=+(r.slice(-1)===`H`),s=Number(t[3])===8?0:1,c=t[4]?Number(t[4]):0,l=t[5]?Number(t[5][0]):1,u=t[5]?Number(t[5][1]):1,d=t[5]?Number(t[5][2]):0;return[129,a,(o<<7)+(s<<6)+0+(c<<4)+(l<<3)+(u<<2)+d,0]},Kg=/^pcm-([usf])(\d+)(be)?$/,qg=e=>{if(U(Pg.includes(e)),e===`ulaw`)return{dataType:`ulaw`,sampleSize:1,littleEndian:!0,silentValue:255};if(e===`alaw`)return{dataType:`alaw`,sampleSize:1,littleEndian:!0,silentValue:213};let t=Kg.exec(e);U(t);let n;n=t[1]===`u`?`unsigned`:t[1]===`s`?`signed`:`float`;let r=Number(t[2])/8,i=t[3]!==`be`;return{dataType:n,sampleSize:r,littleEndian:i,silentValue:e===`pcm-u8`?128:0}},Jg=e=>e.startsWith(`avc1`)||e.startsWith(`avc3`)?`avc`:e.startsWith(`hev1`)||e.startsWith(`hvc1`)?`hevc`:e===`vp8`?`vp8`:e.startsWith(`vp09`)?`vp9`:e.startsWith(`av01`)?`av1`:Hg.includes(e)?`prores`:e===`mp3`||e===`mp4a.69`||e===`mp4a.6B`||e===`mp4a.6b`||e===`mp4a.40.34`?`mp3`:e.startsWith(`mp4a.40.`)||e===`mp4a.67`?`aac`:e===`opus`?`opus`:e===`vorbis`?`vorbis`:e===`flac`?`flac`:e===`ac-3`||e===`ac3`?`ac3`:e===`ec-3`||e===`eac3`?`eac3`:e===`ulaw`?`ulaw`:e===`alaw`?`alaw`:Kg.test(e)?e:e===`webvtt`?`webvtt`:null,Yg=e=>e===`avc`?{avc:{format:`avc`}}:e===`hevc`?{hevc:{format:`hevc`}}:{},Xg=[`avc1`,`avc3`,`hev1`,`hvc1`,`vp8`,`vp09`,`av01`,...Hg],Zg=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,Qg=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,$g=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,e_=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,t_=(e,t)=>{if(!e)throw TypeError(`Video chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Video chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Video chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Video chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Video chunk metadata decoder configuration must specify a codec string.`);if(!Xg.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.codedWidth)||e.decoderConfig.codedWidth<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).`);if(!Number.isInteger(e.decoderConfig.codedHeight)||e.decoderConfig.codedHeight<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).`);if(e.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectWidth)||e.decoderConfig.displayAspectWidth<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectHeight)||e.decoderConfig.displayAspectHeight<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectWidth!==void 0!=(e.decoderConfig.displayAspectHeight!==void 0))throw TypeError(`Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.`);if(e.decoderConfig.description!==void 0&&!Vh(e.decoderConfig.description))throw TypeError(`Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=e.decoderConfig;if(typeof t!=`object`)throw TypeError(`Video chunk metadata decoder configuration colorSpace, when provided, must be an object.`);let n=Object.keys(Lh);if(t.primaries!=null&&!n.includes(t.primaries))throw TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${n.join(`, `)}.`);let r=Object.keys(Rh);if(t.transfer!=null&&!r.includes(t.transfer))throw TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(`, `)}.`);let i=Object.keys(zh);if(t.matrix!=null&&!i.includes(t.matrix))throw TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(`, `)}.`);if(t.fullRange!=null&&typeof t.fullRange!=`boolean`)throw TypeError(`Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.`)}if(e.decoderConfig.codec.startsWith(`avc1`)||e.decoderConfig.codec.startsWith(`avc3`)){if(!Zg.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.`)}else if(e.decoderConfig.codec.startsWith(`hev1`)||e.decoderConfig.codec.startsWith(`hvc1`)){if(!Qg.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.`)}else if(e.decoderConfig.codec.startsWith(`vp8`)){if(e.decoderConfig.codec!==`vp8`)throw TypeError(`Video chunk metadata decoder configuration codec string for VP8 must be "vp8".`)}else if(e.decoderConfig.codec.startsWith(`vp09`)){if(!$g.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.`)}else if(e.decoderConfig.codec.startsWith(`av01`)){if(!e_.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.`)}else if(Hg.some(t=>e.decoderConfig.codec.startsWith(t))&&!Hg.some(t=>e.decoderConfig.codec===t))throw TypeError(`Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${Hg.join(`, `)}.`);if(t!==null&&Jg(e.decoderConfig.codec)!==t)throw TypeError(`Video chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},n_=[`mp4a`,`mp3`,`opus`,`vorbis`,`flac`,`ulaw`,`alaw`,`pcm`,`ac-3`,`ec-3`],r_=(e,t)=>{if(!e)throw TypeError(`Audio chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Audio chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Audio chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Audio chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Audio chunk metadata decoder configuration must specify a codec string.`);if(!n_.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.sampleRate)||e.decoderConfig.sampleRate<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).`);if(!Number.isInteger(e.decoderConfig.numberOfChannels)||e.decoderConfig.numberOfChannels<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).`);if(e.decoderConfig.description!==void 0&&!Vh(e.decoderConfig.description))throw TypeError(`Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.codec.startsWith(`mp4a`)&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`){if(![`mp4a.40.2`,`mp4a.40.02`,`mp4a.40.5`,`mp4a.40.05`,`mp4a.40.29`,`mp4a.67`].includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`mp3`)||e.decoderConfig.codec.startsWith(`mp4a`)){if(e.decoderConfig.codec!==`mp3`&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`)throw TypeError(`Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".`)}else if(e.decoderConfig.codec.startsWith(`opus`)){if(e.decoderConfig.codec!==`opus`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Opus must be "opus".`);if(e.decoderConfig.description&&e.decoderConfig.description.byteLength<18)throw TypeError(`Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.`)}else if(e.decoderConfig.codec.startsWith(`vorbis`)){if(e.decoderConfig.codec!==`vorbis`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".`);if(!e.decoderConfig.description)throw TypeError(`Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`flac`)){if(e.decoderConfig.codec!==`flac`)throw TypeError(`Audio chunk metadata decoder configuration codec string for FLAC must be "flac".`);if(!e.decoderConfig.description||e.decoderConfig.description.byteLength<42)throw TypeError(`Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`ac-3`)||e.decoderConfig.codec.startsWith(`ac3`)){if(e.decoderConfig.codec!==`ac-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".`)}else if(e.decoderConfig.codec.startsWith(`ec-3`)||e.decoderConfig.codec.startsWith(`eac3`)){if(e.decoderConfig.codec!==`ec-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".`)}else if((e.decoderConfig.codec.startsWith(`pcm`)||e.decoderConfig.codec.startsWith(`ulaw`)||e.decoderConfig.codec.startsWith(`alaw`))&&!Pg.includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${Pg.join(`, `)}).`);if(t!==null&&Jg(e.decoderConfig.codec)!==t)throw TypeError(`Audio chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},i_=e=>{if(!e)throw TypeError(`Subtitle metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Subtitle metadata must be an object.`);if(!e.config)throw TypeError(`Subtitle metadata must include a config object.`);if(typeof e.config!=`object`)throw TypeError(`Subtitle metadata config must be an object.`);if(typeof e.config.description!=`string`)throw TypeError(`Subtitle metadata config description must be a string.`)}})))()}var o_,s_;function c_(){return(c_=t((()=>{o_=[48e3,44100,32e3],s_=[24e3,22050,16e3]})))()}var l_,u_,d_,f_,p_,m_,h_,g_,__,v_,y_,b_,x_,S_,C_,w_,T_,E_,D_,O_,k_,A_,j_,M_,N_,P_,F_,I_,L_,R_,z_,B_,V_;function H_(){return(H_=t((()=>{a_(),vg(),xg(),c_(),Og(),(function(e){e[e.NON_IDR_SLICE=1]=`NON_IDR_SLICE`,e[e.SLICE_DPA=2]=`SLICE_DPA`,e[e.SLICE_DPB=3]=`SLICE_DPB`,e[e.SLICE_DPC=4]=`SLICE_DPC`,e[e.IDR=5]=`IDR`,e[e.SEI=6]=`SEI`,e[e.SPS=7]=`SPS`,e[e.PPS=8]=`PPS`,e[e.AUD=9]=`AUD`,e[e.SPS_EXT=13]=`SPS_EXT`})(l_||={}),(function(e){e[e.RASL_N=8]=`RASL_N`,e[e.RASL_R=9]=`RASL_R`,e[e.BLA_W_LP=16]=`BLA_W_LP`,e[e.RSV_IRAP_VCL23=23]=`RSV_IRAP_VCL23`,e[e.VPS_NUT=32]=`VPS_NUT`,e[e.SPS_NUT=33]=`SPS_NUT`,e[e.PPS_NUT=34]=`PPS_NUT`,e[e.AUD_NUT=35]=`AUD_NUT`,e[e.PREFIX_SEI_NUT=39]=`PREFIX_SEI_NUT`,e[e.SUFFIX_SEI_NUT=40]=`SUFFIX_SEI_NUT`})(u_||={}),d_=function*(e){let t=0,n=-1;for(;t<e.length-2;){let r=e.indexOf(0,t);if(r===-1||r>=e.length-2)break;t=r;let i=0;if(t+3<e.length&&e[t+1]===0&&e[t+2]===0&&e[t+3]===1?i=4:e[t+1]===0&&e[t+2]===1&&(i=3),i===0){t++;continue}n!==-1&&t>n&&(yield{offset:n,length:t-n}),n=t+i,t=n}n!==-1&&n<e.length&&(yield{offset:n,length:e.length-n})},f_=function*(e,t){let n=0,r=new DataView(e.buffer,e.byteOffset,e.byteLength);for(;n+t<=e.length;){let e;t===1?e=r.getUint8(n):t===2?e=r.getUint16(n,!1):t===3?e=Kh(r,n,!1):(U(t===4),e=r.getUint32(n,!1)),n+=t,yield{offset:n,length:e},n+=e}},p_=(e,t)=>{if(t.description){let n=(Ph(t.description)[4]&3)+1;return f_(e,n)}return d_(e)},m_=e=>e&31,h_=e=>{let t=[],n=e.length;for(let r=0;r<n;r++)r+2<n&&e[r]===0&&e[r+1]===0&&e[r+2]===3?(t.push(0,0),r+=2):t.push(e[r]);return new Uint8Array(t)},new Uint8Array([0,0,0,1]),g_=(e,t)=>{let n=e.reduce((e,n)=>e+t+n.byteLength,0),r=new Uint8Array(n),i=0;for(let n of e){let e=new DataView(r.buffer,r.byteOffset,r.byteLength);switch(t){case 1:e.setUint8(i,n.byteLength);break;case 2:e.setUint16(i,n.byteLength,!1);break;case 3:qh(e,i,n.byteLength,!1);break;case 4:e.setUint32(i,n.byteLength,!1)}i+=t,r.set(n,i),i+=n.byteLength}return r},__=e=>{try{let t=[],n=[],r=[];for(let i of d_(e)){let a=e.subarray(i.offset,i.offset+i.length),o=m_(a[0]);o===l_.SPS?t.push(a):o===l_.PPS?n.push(a):o===l_.SPS_EXT&&r.push(a)}if(t.length===0||n.length===0)return null;let i=t[0],a=b_(i);U(a!==null);let o=a.profileIdc===100||a.profileIdc===110||a.profileIdc===122||a.profileIdc===144;return{configurationVersion:1,avcProfileIndication:a.profileIdc,profileCompatibility:a.constraintFlags,avcLevelIndication:a.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:n,chromaFormat:o?a.chromaFormatIdc:null,bitDepthLumaMinus8:o?a.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?a.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?r:null}}catch(e){return bg._error(`Error building AVC Decoder Configuration Record:`,e),null}},v_=e=>{let t=[];t.push(e.configurationVersion),t.push(e.avcProfileIndication),t.push(e.profileCompatibility),t.push(e.avcLevelIndication),t.push(252|e.lengthSizeMinusOne&3),t.push(224|e.sequenceParameterSets.length&31);for(let n of e.sequenceParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}t.push(e.pictureParameterSets.length);for(let n of e.pictureParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}if(e.avcProfileIndication===100||e.avcProfileIndication===110||e.avcProfileIndication===122||e.avcProfileIndication===144){U(e.chromaFormat!==null),U(e.bitDepthLumaMinus8!==null),U(e.bitDepthChromaMinus8!==null),U(e.sequenceParameterSetExt!==null),t.push(252|e.chromaFormat&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.sequenceParameterSetExt.length);for(let n of e.sequenceParameterSetExt){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}}return new Uint8Array(t)},y_={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},b_=e=>{try{let t=new Dg(h_(e));if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;let n=t.readAlignedByte(),r=t.readAlignedByte(),i=t.readAlignedByte();W(t);let a=1,o=0,s=0,c=0;if((n===100||n===110||n===122||n===244||n===44||n===83||n===86||n===118||n===128)&&(a=W(t),a===3&&(c=t.readBits(1)),o=W(t),s=W(t),t.skipBits(1),t.readBits(1))){for(let e=0;e<(a===3?12:8);e++)if(t.readBits(1)){let n=e<6?16:64,r=8,i=8;for(let e=0;e<n;e++){if(i!==0){let e=Nh(t);i=(r+e+256)%256}r=i===0?r:i}}}W(t);let l=W(t);if(l===0)W(t);else if(l===1){t.skipBits(1),Nh(t),Nh(t);let e=W(t);for(let n=0;n<e;n++)Nh(t)}W(t),t.skipBits(1);let u=W(t),d=W(t),f=16*(u+1),p=16*(d+1),m=f,h=p,g=t.readBits(1);if(g||t.skipBits(1),t.skipBits(1),t.readBits(1)){let e=W(t),n=W(t),r=W(t),i=W(t),o,s;if((c===0?a:0)===0)o=1,s=2-g;else{let e=a===3?1:2,t=a===1?2:1;o=e,s=t*(2-g)}m-=o*(e+n),h-=s*(r+i)}let _=2,v=2,y=2,b=0,x={num:1,den:1},S=null,C=null;if(t.readBits(1)){if(t.readBits(1)){let e=t.readBits(8);if(e===255)x={num:t.readBits(16),den:t.readBits(16)};else{let t=y_[e];t&&(x=t)}}t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),b=t.readBits(1),t.readBits(1)&&(_=t.readBits(8),v=t.readBits(8),y=t.readBits(8))),t.readBits(1)&&(W(t),W(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));let e=t.readBits(1);e&&x_(t);let n=t.readBits(1);n&&x_(t),(e||n)&&t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(1),W(t),W(t),W(t),W(t),S=W(t),C=W(t))}if(S===null){U(C===null);let e=r&16;if((n===44||n===86||n===100||n===110||n===122||n===244)&&e)S=0,C=0;else{let e=u+1,t=d+1,n=(2-g)*t,r=Rg.find(e=>e.level>=i)??jh(Rg),a=Math.min(Math.floor(r.maxDpbMbs/(e*n)),16);S=a,C=a}}return U(C!==null),{profileIdc:n,constraintFlags:r,levelIdc:i,frameMbsOnlyFlag:g,chromaFormatIdc:a,bitDepthLumaMinus8:o,bitDepthChromaMinus8:s,codedWidth:f,codedHeight:p,displayWidth:m,displayHeight:h,pixelAspectRatio:x,colourPrimaries:_,matrixCoefficients:y,transferCharacteristics:v,fullRangeFlag:b,numReorderFrames:S,maxDecFrameBuffering:C}}catch(e){return bg._error(`Error parsing AVC SPS:`,e),null}},x_=e=>{let t=W(e);e.skipBits(4),e.skipBits(4);for(let n=0;n<=t;n++)W(e),W(e),e.skipBits(1);e.skipBits(5),e.skipBits(5),e.skipBits(5),e.skipBits(5)},S_=(e,t)=>{if(t.description){let n=(Ph(t.description)[21]&3)+1;return f_(e,n)}return d_(e)},C_=e=>e>>1&63,w_=e=>{try{let t=new Dg(h_(e));t.skipBits(16),t.readBits(4);let n=t.readBits(3),r=t.readBits(1),{general_profile_space:i,general_tier_flag:a,general_profile_idc:o,general_profile_compatibility_flags:s,general_constraint_indicator_flags:c,general_level_idc:l}=E_(t,n);W(t);let u=W(t),d=0;u===3&&(d=t.readBits(1));let f=W(t),p=W(t),m=f,h=p;if(t.readBits(1)){let e=W(t),n=W(t),r=W(t),i=W(t),a=1,o=1,s=d===0?u:0;s===1?(a=2,o=2):s===2&&(a=2,o=1),m-=(e+n)*a,h-=(r+i)*o}let g=W(t),_=W(t);W(t);let v=t.readBits(1)?0:n,y=0;for(let e=v;e<=n;e++)W(t),y=W(t),W(t);W(t),W(t),W(t),W(t),W(t),W(t),t.readBits(1)&&t.readBits(1)&&D_(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(4),t.skipBits(4),W(t),W(t),t.skipBits(1));let b=W(t);if(O_(t,b),t.readBits(1)){let e=W(t);for(let n=0;n<e;n++)W(t),t.skipBits(1)}t.skipBits(1),t.skipBits(1);let x=2,S=2,C=2,ee=0,te=0,w={num:1,den:1};if(t.readBits(1)){let e=A_(t,n);w=e.pixelAspectRatio,x=e.colourPrimaries,S=e.transferCharacteristics,C=e.matrixCoefficients,ee=e.fullRangeFlag,te=e.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:h,pixelAspectRatio:w,colourPrimaries:x,transferCharacteristics:S,matrixCoefficients:C,fullRangeFlag:ee,maxDecFrameBuffering:y+1,spsMaxSubLayersMinus1:n,spsTemporalIdNestingFlag:r,generalProfileSpace:i,generalTierFlag:a,generalProfileIdc:o,generalProfileCompatibilityFlags:s,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:_,minSpatialSegmentationIdc:te}}catch(e){return bg._error(`Error parsing HEVC SPS:`,e),null}},T_=e=>{try{let t=[],n=[],r=[],i=[];for(let a of d_(e)){let o=e.subarray(a.offset,a.offset+a.length),s=C_(o[0]);s===u_.VPS_NUT?t.push(o):s===u_.SPS_NUT?n.push(o):s===u_.PPS_NUT?r.push(o):(s===u_.PREFIX_SEI_NUT||s===u_.SUFFIX_SEI_NUT)&&i.push(o)}if(n.length===0||r.length===0)return null;let a=w_(n[0]);if(!a)return null;let o=0;if(r.length>0){let e=r[0],t=new Dg(h_(e));t.skipBits(16),W(t),W(t),t.skipBits(1),t.skipBits(1),t.skipBits(3),t.skipBits(1),t.skipBits(1),W(t),W(t),Nh(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&W(t),Nh(t),Nh(t),t.skipBits(1),t.skipBits(1),t.skipBits(1),t.skipBits(1);let n=t.readBits(1),i=t.readBits(1);o=!n&&!i?0:n&&!i?2:!n&&i?3:0}let s=[...t.length?[{arrayCompleteness:1,nalUnitType:u_.VPS_NUT,nalUnits:t}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:u_.SPS_NUT,nalUnits:n}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:u_.PPS_NUT,nalUnits:r}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:C_(i[0][0]),nalUnits:i}]:[]];return{configurationVersion:1,generalProfileSpace:a.generalProfileSpace,generalTierFlag:a.generalTierFlag,generalProfileIdc:a.generalProfileIdc,generalProfileCompatibilityFlags:a.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:a.generalConstraintIndicatorFlags,generalLevelIdc:a.generalLevelIdc,minSpatialSegmentationIdc:a.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:a.chromaFormatIdc,bitDepthLumaMinus8:a.bitDepthLumaMinus8,bitDepthChromaMinus8:a.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:a.spsMaxSubLayersMinus1+1,temporalIdNested:a.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:s}}catch(e){return bg._error(`Error building HEVC Decoder Configuration Record:`,e),null}},E_=(e,t)=>{let n=e.readBits(2),r=e.readBits(1),i=e.readBits(5),a=0;for(let t=0;t<32;t++)a=a<<1|e.readBits(1);let o=new Uint8Array(6);for(let t=0;t<6;t++)o[t]=e.readBits(8);let s=e.readBits(8),c=[],l=[];for(let n=0;n<t;n++)c.push(e.readBits(1)),l.push(e.readBits(1));if(t>0)for(let n=t;n<8;n++)e.skipBits(2);for(let n=0;n<t;n++)c[n]&&e.skipBits(88),l[n]&&e.skipBits(8);return{general_profile_space:n,general_tier_flag:r,general_profile_idc:i,general_profile_compatibility_flags:a,general_constraint_indicator_flags:o,general_level_idc:s}},D_=e=>{for(let t=0;t<4;t++)for(let n=0;n<(t===3?2:6);n++)if(!e.readBits(1))W(e);else{let n=Math.min(64,1<<4+(t<<1));t>1&&Nh(e);for(let t=0;t<n;t++)Nh(e)}},O_=(e,t)=>{let n=[];for(let r=0;r<t;r++)n[r]=k_(e,r,t,n)},k_=(e,t,n,r)=>{let i=0,a=0,o=0;if(t!==0&&(a=e.readBits(1)),a){o=t===n?t-(W(e)+1):t-1,e.readBits(1),W(e);let a=r[o]??0;for(let t=0;t<=a;t++)e.readBits(1)||e.readBits(1);i=r[o]}else{let t=W(e),n=W(e);for(let n=0;n<t;n++)W(e),e.readBits(1);for(let t=0;t<n;t++)W(e),e.readBits(1);i=t+n}return i},A_=(e,t)=>{let n=2,r=2,i=2,a=0,o=0,s={num:1,den:1};if(e.readBits(1)){let t=e.readBits(8);if(t===255)s={num:e.readBits(16),den:e.readBits(16)};else{let e=y_[t];e&&(s=e)}}return e.readBits(1)&&e.readBits(1),e.readBits(1)&&(e.readBits(3),a=e.readBits(1),e.readBits(1)&&(n=e.readBits(8),r=e.readBits(8),i=e.readBits(8))),e.readBits(1)&&(W(e),W(e)),e.readBits(1),e.readBits(1),e.readBits(1),e.readBits(1)&&(W(e),W(e),W(e),W(e)),e.readBits(1)&&(e.readBits(32),e.readBits(32),e.readBits(1)&&W(e),e.readBits(1)&&j_(e,!0,t)),e.readBits(1)&&(e.readBits(1),e.readBits(1),e.readBits(1),o=W(e),W(e),W(e),W(e),W(e)),{pixelAspectRatio:s,colourPrimaries:n,transferCharacteristics:r,matrixCoefficients:i,fullRangeFlag:a,minSpatialSegmentationIdc:o}},j_=(e,t,n)=>{let r=!1,i=!1,a=!1;t&&(r=e.readBits(1)===1,i=e.readBits(1)===1,(r||i)&&(a=e.readBits(1)===1,a&&(e.readBits(8),e.readBits(5),e.readBits(1),e.readBits(5)),e.readBits(4),e.readBits(4),a&&e.readBits(4),e.readBits(5),e.readBits(5),e.readBits(5)));for(let t=0;t<=n;t++){let t=e.readBits(1)===1,n=!0;t||(n=e.readBits(1)===1);let o=!1;n?W(e):o=e.readBits(1)===1;let s=1;o||(s=W(e)+1),r&&M_(e,s,a),i&&M_(e,s,a)}},M_=(e,t,n)=>{for(let r=0;r<t;r++)W(e),W(e),n&&(W(e),W(e)),e.readBits(1)},N_=e=>{let t=[];t.push(e.configurationVersion),t.push((e.generalProfileSpace&3)<<6|(e.generalTierFlag&1)<<5|e.generalProfileIdc&31),t.push(e.generalProfileCompatibilityFlags>>>24&255),t.push(e.generalProfileCompatibilityFlags>>>16&255),t.push(e.generalProfileCompatibilityFlags>>>8&255),t.push(e.generalProfileCompatibilityFlags&255),t.push(...e.generalConstraintIndicatorFlags),t.push(e.generalLevelIdc&255),t.push(240|e.minSpatialSegmentationIdc>>8&15),t.push(e.minSpatialSegmentationIdc&255),t.push(252|e.parallelismType&3),t.push(252|e.chromaFormatIdc&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.avgFrameRate>>8&255),t.push(e.avgFrameRate&255),t.push((e.constantFrameRate&3)<<6|(e.numTemporalLayers&7)<<3|(e.temporalIdNested&1)<<2|e.lengthSizeMinusOne&3),t.push(e.arrays.length&255);for(let n of e.arrays){t.push((n.arrayCompleteness&1)<<7|0|n.nalUnitType&63),t.push(n.nalUnits.length>>8&255),t.push(n.nalUnits.length&255);for(let e of n.nalUnits){t.push(e.length>>8&255),t.push(e.length&255);for(let n=0;n<e.length;n++)t.push(e[n])}}return new Uint8Array(t)},(function(e){e[e.audAllowed=0]=`audAllowed`,e[e.beforeFirstVcl=1]=`beforeFirstVcl`,e[e.afterFirstVcl=2]=`afterFirstVcl`,e[e.eoBitstreamAllowed=3]=`eoBitstreamAllowed`,e[e.noMoreDataAllowed=4]=`noMoreDataAllowed`})(P_||={}),F_=function*(e){let t=new Dg(e),n=()=>{let e=0;for(let n=0;n<8;n++){let r=t.readAlignedByte();if(e|=(r&127)<<n*7,!(r&128))break;if(n===7&&r&128)return null}return e>=2**32-1?null:e};for(;t.getBitsLeft()>=8;){t.skipBits(1);let r=t.readBits(4),i=t.readBits(1),a=t.readBits(1);t.skipBits(1),i&&t.skipBits(8);let o;if(a){let e=n();if(e===null)return;o=e}else o=Math.floor(t.getBitsLeft()/8);U(t.pos%8==0),yield{type:r,data:e.subarray(t.pos/8,t.pos/8+o)},t.skipBits(o*8)}},I_=e=>{let t=Fh(e),n=t.getUint8(9),r=t.getUint16(10,!0),i=t.getUint32(12,!0),a=t.getInt16(16,!0),o=t.getUint8(18),s=null;return o&&(s=e.subarray(19,21+n)),{outputChannelCount:n,preSkip:r,inputSampleRate:i,outputGain:a,channelMappingFamily:o,channelMappingTable:s}},L_=(e,t,n)=>{switch(e){case`avc`:for(let e of p_(n,t)){let t=n[e.offset],r=m_(t);if(r>=l_.NON_IDR_SLICE&&r<=l_.SLICE_DPC)return`delta`;if(r===l_.IDR)return`key`;if(r===l_.SEI&&(!og()||cg()>=144)){let t=n.subarray(e.offset,e.offset+e.length),r=h_(t),i=1;do{let e=0;for(;;){let t=r[i++];if(t===void 0||(e+=t,t<255))break}let t=0;for(;;){let e=r[i++];if(e===void 0||(t+=e,e<255))break}if(e===6){let e=new Dg(r);e.pos=8*i;let t=W(e),n=e.readBits(1);if(t===0&&n===1)return`key`}i+=t}while(i<r.length-1)}}return`delta`;case`hevc`:for(let e of S_(n,t)){let t=C_(n[e.offset]);if(t<u_.BLA_W_LP)return`delta`;if(t<=u_.RSV_IRAP_VCL23)return`key`}return`delta`;case`vp8`:return n[0]&1?`delta`:`key`;case`vp9`:{let e=new Dg(n);if(e.readBits(2)!==2)return null;let t=e.readBits(1);return(e.readBits(1)<<1)+t===3&&e.skipBits(1),e.readBits(1)?null:e.readBits(1)===0?`key`:`delta`}case`av1`:{let e=!1;for(let{type:t,data:r}of F_(n))if(t===1){let t=new Dg(r);t.skipBits(4),e=!!t.readBits(1)}else if(t===3||t===6||t===7){if(e)return`key`;let t=new Dg(r);return t.readBits(1)?null:t.readBits(2)===0?`key`:`delta`}return null}case`prores`:return`key`;default:Gh(e),U(!1)}},(function(e){e[e.STREAMINFO=0]=`STREAMINFO`,e[e.VORBIS_COMMENT=4]=`VORBIS_COMMENT`,e[e.PICTURE=6]=`PICTURE`})(R_||={}),z_=e=>{if(e.length<7||e[0]!==11||e[1]!==119)return null;let t=new Dg(e);t.skipBits(16),t.skipBits(16);let n=t.readBits(2);if(n===3)return null;let r=t.readBits(6),i=t.readBits(5);if(i>8)return null;let a=t.readBits(3),o=t.readBits(3);return o&1&&o!==1&&t.skipBits(2),o&4&&t.skipBits(2),o===2&&t.skipBits(2),{fscod:n,bsid:i,bsmod:a,acmod:o,lfeon:t.readBits(1),bitRateCode:Math.floor(r/2)}},new Uint8Array([5,4,65,67,45,51]),new Uint8Array([5,4,69,65,67,51]),B_=[1,2,3,6],V_=e=>{if(e.length<6||e[0]!==11||e[1]!==119)return null;let t=new Dg(e);t.skipBits(16);let n=t.readBits(2);if(t.skipBits(3),n!==0&&n!==2)return null;let r=t.readBits(11),i=t.readBits(2),a=0,o;i===3?(a=t.readBits(2),o=3):o=t.readBits(2);let s=t.readBits(3),c=t.readBits(1),l=t.readBits(5);if(l<11||l>16)return null;let u=B_[o],d;return d=i<3?o_[i]/1e3:s_[a]/1e3,{dataRate:Math.round((r+1)*d/(u*16)),substreams:[{fscod:i,fscod2:a,bsid:l,bsmod:0,acmod:s,lfeon:c,numDepSub:0,chanLoc:0}]}}})))()}var U_,W_;function G_(){return(G_=t((()=>{vg(),U_=new Uint8Array,W_=class e{constructor(e,t,n,r,i=-1,a,o){if(this.data=e,this.type=t,this.timestamp=n,this.duration=r,this.sequenceNumber=i,e===U_&&a===void 0)throw Error(`Internal error: byteLength must be explicitly provided when constructing metadata-only packets.`);if(a===void 0&&(a=e.byteLength),!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==`key`&&t!==`delta`)throw TypeError(`type must be either "key" or "delta".`);if(!Number.isFinite(n))throw TypeError(`timestamp must be a number.`);if(!Number.isFinite(r)||r<0)throw TypeError(`duration must be a non-negative number.`);if(!Number.isFinite(i))throw TypeError(`sequenceNumber must be a number.`);if(!Number.isInteger(a)||a<0)throw TypeError(`byteLength must be a non-negative integer.`);if(o!==void 0&&(typeof o!=`object`||!o))throw TypeError(`sideData, when provided, must be an object.`);if(o?.alpha!==void 0&&!(o.alpha instanceof Uint8Array))throw TypeError(`sideData.alpha, when provided, must be a Uint8Array.`);if(o?.alphaByteLength!==void 0&&(!Number.isInteger(o.alphaByteLength)||o.alphaByteLength<0))throw TypeError(`sideData.alphaByteLength, when provided, must be a non-negative integer.`);this.byteLength=a,this.sideData=o??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===U_}get microsecondTimestamp(){return Math.trunc(eg*this.timestamp)}get microsecondDuration(){return Math.trunc(eg*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw TypeError(`This packet does not contain alpha side data.`);if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to an audio chunk.`);if(typeof EncodedAudioChunk>`u`)throw Error(`Your browser does not support EncodedAudioChunk.`);return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(t,n){if(!(t instanceof EncodedVideoChunk||t instanceof EncodedAudioChunk))throw TypeError(`chunk must be an EncodedVideoChunk or EncodedAudioChunk.`);let r=new Uint8Array(t.byteLength);return t.copyTo(r),new e(r,t.type,t.timestamp/1e6,(t.duration??0)/1e6,void 0,void 0,n)}clone(t){if(t!==void 0&&(typeof t!=`object`||!t))throw TypeError(`options, when provided, must be an object.`);if(t?.data!==void 0&&!(t.data instanceof Uint8Array))throw TypeError(`options.data, when provided, must be a Uint8Array.`);if(t?.type!==void 0&&t.type!==`key`&&t.type!==`delta`)throw TypeError(`options.type, when provided, must be either "key" or "delta".`);if(t?.timestamp!==void 0&&!Number.isFinite(t.timestamp))throw TypeError(`options.timestamp, when provided, must be a number.`);if(t?.duration!==void 0&&!Number.isFinite(t.duration))throw TypeError(`options.duration, when provided, must be a number.`);if(t?.sequenceNumber!==void 0&&!Number.isFinite(t.sequenceNumber))throw TypeError(`options.sequenceNumber, when provided, must be a number.`);if(t?.sideData!==void 0&&(typeof t.sideData!=`object`||t.sideData===null))throw TypeError(`options.sideData, when provided, must be an object.`);return new e(t?.data??this.data,t?.type??this.type,t?.timestamp??this.timestamp,t?.duration??this.duration,t?.sequenceNumber??this.sequenceNumber,this.byteLength,t?.sideData??this.sideData)}}})))()}var K_;function q_(){return(q_=t((()=>{K_=e=>{let t=(e.hasVideo?`video/`:e.hasAudio?`audio/`:`application/`)+(e.isQuickTime?`quicktime`:`mp4`);if(e.codecStrings.length>0){let n=[...new Set(e.codecStrings)];t+=`; codecs="${n.join(`, `)}"`}return t}})))()}var J_;function Y_(){return(Y_=t((()=>{Og(),zv(),J_=e=>{let t=e.filePos,n=Rv(e,9),r=new Dg(n);if(r.readBits(12)!==4095||(r.skipBits(1),r.readBits(2)!==0))return null;let i=r.readBits(1),a=r.readBits(2)+1,o=r.readBits(4);if(o===15)return null;r.skipBits(1);let s=r.readBits(3);if(s===0)throw Error(`ADTS frames with channel configuration 0 are not supported.`);r.skipBits(1),r.skipBits(1),r.skipBits(1),r.skipBits(1);let c=r.readBits(13);r.skipBits(11);let l=r.readBits(2)+1;if(l!==1)throw Error(`ADTS frames with more than one AAC frame are not supported.`);let u=null;return i===1?e.filePos-=2:u=r.readBits(16),{objectType:a,samplingFrequencyIndex:o,channelConfiguration:s,frameLength:c,numberOfAacFrames:l,crcCheck:u,startPos:t}}})))()}var X_=r(((e,t)=>{t.exports={}})),Z_,Q_,$_,ev,tv,nv,rv,iv,av,ov,sv,cv,lv,uv,dv,fv,pv,mv,hv,gv,_v,vv,yv,bv,xv;function Sv(){return(Sv=t((()=>{vg(),xg(),Z_=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},Q_=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),ug(),$_=-1/0,ev=-1/0,tv=null,typeof FinalizationRegistry<`u`&&(tv=new FinalizationRegistry(e=>{let t=performance.now();e.type===`video`?(t-$_>=1e3&&(bg._error(`A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them.`),$_=t),typeof VideoFrame<`u`&&e.data instanceof VideoFrame&&e.data.close()):(t-ev>=1e3&&(bg._error(`An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them.`),ev=t),typeof AudioData<`u`&&e.data instanceof AudioData&&e.data.close())})),nv=class{constructor(){this._referenceCount=0,this._lastAllocationBuffer=null}},rv=[`I420`,`I420P10`,`I420P12`,`I420A`,`I420AP10`,`I420AP12`,`I422`,`I422P10`,`I422P12`,`I422A`,`I422AP10`,`I422AP12`,`I444`,`I444P10`,`I444P12`,`I444A`,`I444AP10`,`I444AP12`,`NV12`,`RGBA`,`RGBX`,`BGRA`,`BGRX`],iv=new Set(rv),av=class e{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180==0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180==0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(eg*this.timestamp)}get microsecondDuration(){return Math.trunc(eg*this.duration)}get hasAlpha(){return this.format&&this.format.includes(`A`)}constructor(t,n){if(this._closed=!1,t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer||ArrayBuffer.isView(t)){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.format===void 0||!iv.has(n.format))throw TypeError(`init.format must be one of: `+rv.join(`, `));if(!Number.isInteger(n.codedWidth)||n.codedWidth<=0)throw TypeError(`init.codedWidth must be a positive integer.`);if(!Number.isInteger(n.codedHeight)||n.codedHeight<=0)throw TypeError(`init.codedHeight must be a positive integer.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.layout!==void 0){if(!Array.isArray(n.layout))throw TypeError(`init.layout, when provided, must be an array.`);for(let e of n.layout){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Each entry in init.layout must be an object.`);if(!Number.isInteger(e.offset)||e.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(e.stride)||e.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(n.visibleRect!==void 0&&pg(n.visibleRect,`init.visibleRect`),n.displayWidth!==void 0&&(!Number.isInteger(n.displayWidth)||n.displayWidth<=0))throw TypeError(`init.displayWidth, when provided, must be a positive integer.`);if(n.displayHeight!==void 0&&(!Number.isInteger(n.displayHeight)||n.displayHeight<=0))throw TypeError(`init.displayHeight, when provided, must be a positive integer.`);if(n.displayWidth!==void 0!=(n.displayHeight!==void 0))throw TypeError(`init.displayWidth and init.displayHeight must be either both provided or both omitted.`);this.format=n.format,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0;let e=n.layout??gv(n.format,n.codedWidth,n.codedHeight),r=n.colorSpace??null;r===null&&(r=this.format===`RGBA`||this.format===`RGBX`||this.format===`BGRA`||this.format===`BGRX`?{primaries:`bt709`,transfer:`iec61966-2-1`,matrix:`rgb`,fullRange:!0}:{primaries:`bt709`,transfer:`bt709`,matrix:`bt709`,fullRange:!1}),this.visibleRect={left:n.visibleRect?.left??0,top:n.visibleRect?.top??0,width:n.visibleRect?.width??n.codedWidth,height:n.visibleRect?.height??n.codedHeight},n.displayWidth===void 0?(this.squarePixelWidth=this.visibleRect.width,this.squarePixelHeight=this.visibleRect.height):(this.squarePixelWidth=this.rotation%180==0?n.displayWidth:n.displayHeight,this.squarePixelHeight=this.rotation%180==0?n.displayHeight:n.displayWidth),this._data=n._doNotCopy?Ph(t):Ph(t).slice(),this._layout=e,this.colorSpace=new dv(r)}else if(typeof VideoFrame<`u`&&t instanceof VideoFrame){if(n?.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n?.timestamp!==void 0&&!Number.isFinite(n?.timestamp))throw TypeError(`init.timestamp, when provided, must be a number.`);if(n?.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);n?.visibleRect!==void 0&&pg(n.visibleRect,`init.visibleRect`),this._data=t,this._layout=null,this.format=t.format,this.visibleRect={left:t.visibleRect?.x??0,top:t.visibleRect?.y??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},this.rotation=n?.rotation??0,this.squarePixelWidth=t.displayWidth,this.squarePixelHeight=t.displayHeight,this.timestamp=n?.timestamp??t.timestamp/1e6,this.duration=n?.duration??(t.duration??0)/1e6,this.colorSpace=new dv(t.colorSpace)}else if(typeof HTMLImageElement<`u`&&t instanceof HTMLImageElement||typeof SVGImageElement<`u`&&t instanceof SVGImageElement||typeof ImageBitmap<`u`&&t instanceof ImageBitmap||typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement||typeof HTMLCanvasElement<`u`&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<`u`&&t instanceof OffscreenCanvas){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.visibleRect!==void 0&&pg(n.visibleRect,`init.visibleRect`),typeof VideoFrame<`u`)return new e(new VideoFrame(t,{timestamp:Math.trunc(n.timestamp*eg),duration:Math.trunc((n.duration??0)*eg)||void 0,visibleRect:n.visibleRect&&{x:n.visibleRect.left,y:n.visibleRect.top,width:n.visibleRect.width,height:n.visibleRect.height}}),n);let r=0,i=0;if(`naturalWidth`in t?(r=t.naturalWidth,i=t.naturalHeight):`videoWidth`in t?(r=t.videoWidth,i=t.videoHeight):`width`in t&&(r=Number(t.width),i=Number(t.height)),!r||!i)throw TypeError(`Could not determine dimensions.`);let a=n.visibleRect??{left:0,top:0,width:r,height:i},o=new OffscreenCanvas(a.width,a.height),s=o.getContext(`2d`,{alpha:ig(),willReadFrequently:!0});if(!s)throw Error(`OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.`);s.drawImage(t,-a.left,-a.top),this._data=o,this._layout=null,this.format=`RGBX`,this.visibleRect={left:0,top:0,width:a.width,height:a.height},this.squarePixelWidth=a.width,this.squarePixelHeight=a.height,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=new dv({matrix:`rgb`,primaries:`bt709`,transfer:`iec61966-2-1`,fullRange:!0})}else if(t instanceof nv){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(this._data=t,t._referenceCount++,this.format=t.getFormat(),this.format!==null&&!rv.includes(this.format))throw TypeError(`getFormat() must return a VideoSamplePixelFormat or null.`);if(this.visibleRect={left:0,top:0,width:t.getCodedWidth(),height:t.getCodedHeight()},!Number.isInteger(this.visibleRect.width)||this.visibleRect.width<=0)throw TypeError(`getCodedWidth() must return a positive integer.`);if(!Number.isInteger(this.visibleRect.height)||this.visibleRect.height<=0)throw TypeError(`getCodedHeight() must return a positive integer.`);if(this.squarePixelWidth=t.getSquarePixelWidth(),!Number.isInteger(this.squarePixelWidth)||this.squarePixelWidth<=0)throw TypeError(`getSquarePixelWidth() must return a positive integer.`);if(this.squarePixelHeight=t.getSquarePixelHeight(),!Number.isInteger(this.squarePixelHeight)||this.squarePixelHeight<=0)throw TypeError(`getSquarePixelHeight() must return a positive integer.`);this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=t.getColorSpace()}else throw TypeError(`Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.`);this.encodeOptions=n?.encodeOptions??{},this.pixelAspectRatio=fg({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),tv?.register(this,{type:`video`,data:this._data},this)}clone(){if(this._closed)throw Error(`VideoSample is closed.`);return U(this._data!==null),this._data instanceof nv?new e(this._data,{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):fv(this._data)?new e(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):this._data instanceof Uint8Array?(U(this._layout),new e(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions,_doNotCopy:!0})):new e(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions})}close(){this._closed||=(tv?.unregister(this),this._data instanceof nv?(this._data._referenceCount--,this._data._referenceCount===0&&this._data.close()):fv(this._data)?this._data.close():this._data=null,!0)}allocationSize(e={}){if(hv(e),this._closed)throw Error(`VideoSample is closed.`);if((e.format??this.format)==null)throw Error(`Cannot get allocation size when format is null.`);return fv(this._data)?this._data.allocationSize(e):vv(this,e).allocationSize}async copyTo(t,n={}){if(!Vh(t))throw TypeError(`destination must be an ArrayBuffer or an ArrayBuffer view.`);if(hv(n),this._closed)throw Error(`VideoSample is closed.`);if((n.format??this.format)==null)throw Error(`Cannot copy video sample data when format is null.`);if(U(this._data!==null),fv(this._data))return this._data.copyTo(t,n);if(n.format&&![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(this.format)&&[`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(n.format)){if(this._data instanceof nv){let r={stack:[],error:void 0,hasError:!1};try{let i=Z_(r,await this._data.toRgbSample({timestamp:this.timestamp,duration:this.duration,rotation:this.rotation},n.colorSpace??`srgb`),!1);if(!(i instanceof e))throw TypeError(`toRgbSample() must return a VideoSample.`);if(![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(i.format))throw Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${i.format}' instead.`);return await i.copyTo(t,n)}catch(e){r.error=e,r.hasError=!0}finally{Q_(r)}}else{if(typeof VideoFrame>`u`)throw Error(`For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.`);let e=this.toVideoFrame(),r=await e.copyTo(t,n);return e.close(),r}}let r=vv(this,n);U(this.format);let i=Ph(t);if(i.byteLength<r.allocationSize)throw TypeError(`Destination buffer too small. Required: ${r.allocationSize}, Available: ${i.byteLength}`);let a=_v(this.format),o;if(this._data instanceof nv){let e=this._data.getDataPlanes();if(e instanceof Promise&&(e=await e),!Array.isArray(e)||e.some(e=>!(e.data instanceof Uint8Array)||!Number.isInteger(e.stride)||e.stride<0))throw TypeError(`getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.`);o=e}else if(this._data instanceof Uint8Array)U(this._layout),U(this._layout.length===a.length),o=this._layout.map((e,t)=>{let n=Math.ceil(this.codedHeight/a[t].heightDivisor);return{data:this._data.subarray(e.offset,e.offset+e.stride*n),stride:e.stride}});else{let e=this._data.getContext(`2d`);U(e);let t=e.getImageData(0,0,this.codedWidth,this.codedHeight);o=[{data:Ph(t.data),stride:4*this.codedWidth}]}let s=[],c=a.length;for(let e=0;e<c;e++){let t=r.computedLayouts[e],n=o[e].stride,a=o[e].data,c=t.sourceTop*n;c+=t.sourceLeftBytes;let l=t.destinationOffset,u=t.sourceWidthBytes,d={offset:l,stride:t.destinationStride};for(let e=0;e<t.sourceHeight;e++){if(c+u>a.byteLength)throw Error(`Source buffer OOB read.`);if(l+u>i.byteLength)throw Error(`Destination buffer OOB write.`);let e=a.subarray(c,c+u);i.set(e,l),c+=n,l+=t.destinationStride}s.push(d)}if(n.format!==void 0){let e=this.format.startsWith(`RGB`)!==n.format.startsWith(`RGB`),t=this.format.includes(`X`)&&n.format.includes(`A`);if(e||t)for(let n=0;n<r.allocationSize;n+=4){if(e){let e=i[n],t=i[n+2];i[n]=t,i[n+2]=e}t&&(i[n+3]=255)}}return s}toVideoFrame(){if(this._closed)throw Error(`VideoSample is closed.`);if(U(this._data!==null),this._data instanceof nv){if(this.format===null)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.`);let e=this._data.getDataPlanes();if(e instanceof Promise)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.`);let t=e.reduce((e,t)=>e+t.data.byteLength,0),n=new Uint8Array(t),r=0,i=[];for(let t of e)n.set(t.data,r),i.push(r),r+=t.data.byteLength;return new VideoFrame(n,{format:this.format,layout:e.map((e,t)=>({offset:i[t],stride:e.stride})),codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})}return fv(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?(U(this._layout),new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,layout:this._layout,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,n,r,i,a,o,s,c){let l=0,u=0,d=this.displayWidth,f=this.displayHeight,p=0,m=0,h=this.displayWidth,g=this.displayHeight;if(a===void 0?(p=t,m=n,r!==void 0&&(h=r,g=i)):(l=t,u=n,d=r,f=i,p=a,m=o,s===void 0?(h=d,g=f):(h=s,g=c)),!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!Number.isFinite(l))throw TypeError(`sx must be a number.`);if(!Number.isFinite(u))throw TypeError(`sy must be a number.`);if(!Number.isFinite(d)||d<0)throw TypeError(`sWidth must be a non-negative number.`);if(!Number.isFinite(f)||f<0)throw TypeError(`sHeight must be a non-negative number.`);if(!Number.isFinite(p))throw TypeError(`dx must be a number.`);if(!Number.isFinite(m))throw TypeError(`dy must be a number.`);if(!Number.isFinite(h)||h<0)throw TypeError(`dWidth must be a non-negative number.`);if(!Number.isFinite(g)||g<0)throw TypeError(`dHeight must be a non-negative number.`);if(this._closed)throw Error(`VideoSample is closed.`);({sx:l,sy:u,sWidth:d,sHeight:f}=this._rotateSourceRegion(l,u,d,f,this.rotation));let _=this.toCanvasImageSource();e.save();let v=p+h/2,y=m+g/2;e.translate(v,y),e.rotate(this.rotation*Math.PI/180);let b=this.rotation%180==0?1:h/g;e.scale(1/b,b),e.drawImage(_,l,u,d,f,-h/2,-g/2,h,g),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit must be 'fill', 'contain', or 'cover'.`);if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`options.rotation, when provided, must be 0, 90, 180, or 270.`);t.crop!==void 0&&mv(t.crop,`options.`);let n=e.canvas.width,r=e.canvas.height,i=t.rotation??this.rotation,[a,o]=i%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=t.crop;s&&=pv(s,a,o);let c,l,u,d,{sx:f,sy:p,sWidth:m,sHeight:h}=this._rotateSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??a,t.crop?.height??o,i);if(t.fit===`fill`)c=0,l=0,u=n,d=r;else{let[e,i]=t.crop?[t.crop.width,t.crop.height]:[a,o],s=t.fit===`contain`?Math.min(n/e,r/i):Math.max(n/e,r/i);u=e*s,d=i*s,c=(n-u)/2,l=(r-d)/2}e.save();let g=i%180==0?1:u/d;e.translate(n/2,r/2),e.rotate(i*Math.PI/180),e.scale(1/g,g),e.translate(-n/2,-r/2),e.drawImage(this.toCanvasImageSource(),f,p,m,h,c,l,u,d),e.restore()}_rotateSourceRegion(e,t,n,r,i){return i===90?[e,t,n,r]=[t,this.squarePixelHeight-e-n,r,n]:i===180?[e,t]=[this.squarePixelWidth-e-n,this.squarePixelHeight-t-r]:i===270&&([e,t,n,r]=[this.squarePixelWidth-t-r,e,r,n]),{sx:e,sy:t,sWidth:n,sHeight:r}}_drawWithFitAndMipmapping(e,t,n){let r=e.width,i=e.height,[a,o]=n.rotation%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=n.crop?n.crop.width:a,c=n.crop?n.crop.height:o,l=0;2*r<s&&2*i<c&&(l=Math.floor(Math.log2(Math.min(s/r,c/i))));let u=r*2**l,d=i*2**l,{canvas:f,context:p,isNew:m}=l>0?uv(u,d):{canvas:e,context:t,isNew:n.targetIsFresh};p.imageSmoothingQuality=`high`,n.fillBlack?(p.fillStyle=`black`,p.fillRect(0,0,u,d)):m||p.clearRect(0,0,u,d),this.drawWithFit(p,{fit:n.fit,rotation:n.rotation,crop:n.crop}),p.globalCompositeOperation=`copy`;for(let e=l;e>1;e--){let t=r*2**e,n=i*2**e;p.drawImage(f,0,0,t,n,0,0,t/2,n/2)}p.globalCompositeOperation=`source-over`,l>0&&(t.imageSmoothingQuality=`high`,t.globalCompositeOperation=`copy`,t.drawImage(f,0,0,2*r,2*i,0,0,r,i),t.globalCompositeOperation=`source-over`)}toCanvasImageSource(){if(this._closed)throw Error(`VideoSample is closed.`);if(U(this._data!==null),this._data instanceof nv||this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}return this._data}async transform(t){if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(t.width!==void 0&&(!Number.isInteger(t.width)||t.width<=0))throw TypeError(`options.width, when provided, must be a positive integer.`);if(t.height!==void 0&&(!Number.isInteger(t.height)||t.height<=0))throw TypeError(`options.height, when provided, must be a positive integer.`);if(t.roundDimensionsTo!==void 0&&(!Number.isInteger(t.roundDimensionsTo)||t.roundDimensionsTo<=0))throw TypeError(`options.roundDimensionsTo, when provided, must be a positive integer.`);if(t.fit!==void 0&&![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit, when provided, must be one of "fill", "contain", or "cover".`);if(t.width!==void 0&&t.height!==void 0&&t.fit===void 0)throw TypeError(`When both options.width and options.height are provided, options.fit must also be provided.`);if(t.rotate!==void 0&&![0,90,180,270].includes(t.rotate))throw TypeError(`options.rotate, when provided, must be 0, 90, 180 or 270.`);if(t.crop!==void 0&&mv(t.crop,`options.`),t.alpha!==void 0&&![`keep`,`discard`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'keep' or 'discard'.`);let n=Ah(this.rotation+(t.rotate??0)),[r,i]=n%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],a=t.crop;a&&=pv(a,r,i);let o=a?a.width:r,s=a?a.height:i,c=o/s,l,u;t.width!==void 0&&t.height===void 0?(l=t.width,u=l/c):t.width===void 0&&t.height!==void 0?(u=t.height,l=u*c):t.width!==void 0&&t.height!==void 0?(l=t.width,u=t.height):(l=o,u=s),l=Xh(l,t.roundDimensionsTo??1),u=Xh(u,t.roundDimensionsTo??1);let d={width:l,height:u,fit:t.fit??`fill`,rotation:n,crop:a??{left:0,top:0,width:r,height:i},alpha:t.alpha??`keep`};for(let e of ov){let t=e(this,d);if(t instanceof Promise&&(t=await t),t!==null)return t}let{canvas:f,context:p,isNew:m}=uv(d.width,d.height);return this._drawWithFitAndMipmapping(f,p,{fit:d.fit,rotation:d.rotation,crop:d.crop,targetIsFresh:m,fillBlack:d.alpha===`discard`}),new e(f,{timestamp:this.timestamp,duration:this.duration,rotation:0})}setRotation(e){if(![0,90,180,270].includes(e))throw TypeError(`newRotation must be 0, 90, 180, or 270.`);this.rotation=e}setTimestamp(e){if(!Number.isFinite(e))throw TypeError(`newTimestamp must be a number.`);this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw TypeError(`newDuration must be a non-negative number.`);this.duration=e}setEncodeOptions(e){if(!e||typeof e!=`object`)throw TypeError(`newEncodeOptions must be an object.`);this.encodeOptions=e}[Symbol.dispose](){this.close()}},ov=[],sv=3,cv=[],lv=0,uv=(e,t)=>{for(let n of cv)if(n.canvas.width===e&&n.canvas.height===t)return n.age=lv++,{canvas:n.canvas,context:n.context,isNew:!1};let n;if(typeof OffscreenCanvas<`u`)n=new OffscreenCanvas(e,t);else{if(typeof window>`u`||typeof document>`u`)throw Error(`Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().`);n=document.createElement(`canvas`),n.width=e,n.height=t}let r=n.getContext(`2d`,{alpha:!0,willReadFrequently:!1});if(!r)throw Error(`The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.`);return cv.length>=sv&&cv.splice(dg(cv,e=>e.age),1),cv.push({canvas:n,context:r,age:lv++}),{canvas:n,context:r,isNew:!0}},dv=class{constructor(e){if(e!==void 0){if(!e||typeof e!=`object`)throw TypeError(`init.colorSpace, when provided, must be an object.`);let t=Object.keys(Lh);if(e.primaries!=null&&!t.includes(e.primaries))throw TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(`, `)}.`);let n=Object.keys(Rh);if(e.transfer!=null&&!n.includes(e.transfer))throw TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(`, `)}.`);let r=Object.keys(zh);if(e.matrix!=null&&!r.includes(e.matrix))throw TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(`, `)}.`);if(e.fullRange!=null&&typeof e.fullRange!=`boolean`)throw TypeError(`init.colorSpace.fullRange, when provided, must be a boolean.`)}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},fv=e=>typeof VideoFrame<`u`&&e instanceof VideoFrame,pv=(e,t,n)=>{let r=Math.min(e.left,t),i=Math.min(e.top,n),a=Math.min(e.width,t-r),o=Math.min(e.height,n-i);return U(a>=0),U(o>=0),{left:r,top:i,width:a,height:o}},mv=(e,t)=>{if(!e||typeof e!=`object`)throw TypeError(t+`crop, when provided, must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(t+`crop.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(t+`crop.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(t+`crop.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(t+`crop.height must be a non-negative integer.`)},hv=e=>{if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.colorSpace!==void 0&&![`display-p3`,`srgb`].includes(e.colorSpace))throw TypeError(`options.colorSpace, when provided, must be 'display-p3' or 'srgb'.`);if(e.format!==void 0&&typeof e.format!=`string`)throw TypeError(`options.format, when provided, must be a string.`);if(e.layout!==void 0){if(!Array.isArray(e.layout))throw TypeError(`options.layout, when provided, must be an array.`);for(let t of e.layout){if(!t||typeof t!=`object`)throw TypeError(`Each entry in options.layout must be an object.`);if(!Number.isInteger(t.offset)||t.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(t.stride)||t.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(e.rect!==void 0){if(!e.rect||typeof e.rect!=`object`)throw TypeError(`options.rect, when provided, must be an object.`);if(e.rect.x!==void 0&&(!Number.isInteger(e.rect.x)||e.rect.x<0))throw TypeError(`options.rect.x, when provided, must be a non-negative integer.`);if(e.rect.y!==void 0&&(!Number.isInteger(e.rect.y)||e.rect.y<0))throw TypeError(`options.rect.y, when provided, must be a non-negative integer.`);if(e.rect.width!==void 0&&(!Number.isInteger(e.rect.width)||e.rect.width<0))throw TypeError(`options.rect.width, when provided, must be a non-negative integer.`);if(e.rect.height!==void 0&&(!Number.isInteger(e.rect.height)||e.rect.height<0))throw TypeError(`options.rect.height, when provided, must be a non-negative integer.`)}},gv=(e,t,n)=>{let r=_v(e),i=[],a=0;for(let e of r){let r=Math.ceil(t/e.widthDivisor),o=Math.ceil(n/e.heightDivisor),s=r*e.sampleBytes,c=s*o;i.push({offset:a,stride:s}),a+=c}return i},_v=e=>{let t=(e,t,n,r,i)=>{let a=[{sampleBytes:e,widthDivisor:1,heightDivisor:1},{sampleBytes:t,widthDivisor:n,heightDivisor:r},{sampleBytes:t,widthDivisor:n,heightDivisor:r}];return i&&a.push({sampleBytes:e,widthDivisor:1,heightDivisor:1}),a};switch(e){case`I420`:return t(1,1,2,2,!1);case`I420P10`:case`I420P12`:return t(2,2,2,2,!1);case`I420A`:return t(1,1,2,2,!0);case`I420AP10`:case`I420AP12`:return t(2,2,2,2,!0);case`I422`:return t(1,1,2,1,!1);case`I422P10`:case`I422P12`:return t(2,2,2,1,!1);case`I422A`:return t(1,1,2,1,!0);case`I422AP10`:case`I422AP12`:return t(2,2,2,1,!0);case`I444`:return t(1,1,1,1,!1);case`I444P10`:case`I444P12`:return t(2,2,1,1,!1);case`I444A`:return t(1,1,1,1,!0);case`I444AP10`:case`I444AP12`:return t(2,2,1,1,!0);case`NV12`:return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case`RGBA`:case`RGBX`:case`BGRA`:case`BGRX`:return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:Gh(e),U(!1)}},vv=(e,t)=>{let n={left:0,top:0,width:e.codedWidth,height:e.codedHeight},r=t.rect,i=yv(n,r,e.codedWidth,e.codedHeight,e.format),a=t.layout,o;if(!t.format||t.format===e.format)o=e.format;else if([`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(t.format))o=t.format;else throw Error(`NotSupportedError: Invalid destination format.`);return xv(i,o,a)},yv=(e,t,n,r,i)=>{let a={...e};if(t!==void 0){if(t.width===0||t.height===0)throw TypeError(`visibleRect dimensions cannot be zero.`);if((t.x||0)+(t.width||0)>n)throw TypeError(`visibleRect exceeds codedWidth.`);if((t.y||0)+(t.height||0)>r)throw TypeError(`visibleRect exceeds codedHeight.`);a.x=t.x||0,a.y=t.y||0,a.width=t.width||0,a.height=t.height||0}if(!bv(i,a))throw TypeError(`visibleRect alignment is invalid for the format.`);return a},bv=(e,t)=>{if(e===null)return!0;let n=_v(e);for(let e=0;e<n.length;e++){let r=n[e],i=r.widthDivisor,a=r.heightDivisor;if((t.x||0)%i!==0||(t.y||0)%a!==0)return!1}return!0},xv=(e,t,n)=>{let r=_v(t),i=r.length;if(n!==void 0&&n.length!==i)throw TypeError(`Layout must have ${i} planes.`);let a=0,o=[],s=[];for(let t=0;t<i;t++){let i=r[t],c=i.sampleBytes,l=i.widthDivisor,u=i.heightDivisor,d={destinationOffset:0,destinationStride:0,sourceTop:0,sourceHeight:0,sourceLeftBytes:0,sourceWidthBytes:0};if(d.sourceTop=Math.ceil(Math.trunc(e.y||0)/u),d.sourceHeight=Math.ceil(Math.trunc(e.height||0)/u),d.sourceLeftBytes=Math.floor(Math.trunc(e.x||0)/l)*c,d.sourceWidthBytes=Math.floor(Math.trunc(e.width||0)/l)*c,n!==void 0){let e=n[t];if(e.stride<d.sourceWidthBytes)throw TypeError(`Stride for plane ${t} is too small.`);d.destinationOffset=e.offset,d.destinationStride=e.stride}else d.destinationOffset=a,d.destinationStride=d.sourceWidthBytes;let f=d.destinationStride*d.sourceHeight+d.destinationOffset;if(f>4294967295)throw TypeError(`Allocation size exceeds limit.`);s.push(f),a=Math.max(a,f);for(let e=0;e<t;e++){let n=o[e];if(!(s[t]<=n.destinationOffset||s[e]<=d.destinationOffset))throw TypeError(`Planes overlap.`)}o.push(d)}return{allocationSize:a,computedLayouts:o}}})))()}var Cv,wv,Tv,Ev,Dv,Ov,kv,Av,jv,Mv;function Nv(){return(Nv=t((()=>{a_(),vg(),Sv(),Cv=e=>{if(!e||typeof e!=`object`)throw TypeError(`Encoding config must be an object.`);if(!Ng.includes(e.codec))throw TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${Ng.join(`, `)}.`);let t=e.bitrate;if(e.quality===void 0&&t===void 0)throw TypeError(`config.quality must be provided.`);if(e.quality!==void 0&&t!==void 0)throw TypeError(`config.quality and config.bitrate cannot both be provided.`);if(e.quality!==void 0&&!(e.quality instanceof Ev))throw TypeError(`config.quality, when provided, must be a Quality.`);if(t!==void 0&&!(t instanceof Ev)&&(!Number.isInteger(t)||t<=0))throw TypeError(`config.bitrate, when provided, must be a positive integer or a quality.`);if(e.keyFrameInterval!==void 0&&(!Number.isFinite(e.keyFrameInterval)||e.keyFrameInterval<0))throw TypeError(`config.keyFrameInterval, when provided, must be a non-negative number.`);if(e.sizeChangeBehavior!==void 0&&![`deny`,`passThrough`,`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.`);if(e.transform!==void 0){if(typeof e.transform!=`object`||!e.transform)throw TypeError(`config.transform, when provided, must be an object.`);if(e.transform.width!==void 0&&(!Number.isInteger(e.transform.width)||e.transform.width<=0))throw TypeError(`config.transform.width, when provided, must be a positive integer.`);if(e.transform.height!==void 0&&(!Number.isInteger(e.transform.height)||e.transform.height<=0))throw TypeError(`config.transform.height, when provided, must be a positive integer.`);if(e.transform.fit!==void 0&&![`fill`,`contain`,`cover`].includes(e.transform.fit))throw TypeError(`config.transform.fit, when provided, must be one of "fill", "contain", or "cover".`);if(e.transform.width!==void 0&&e.transform.height!==void 0&&e.transform.fit===void 0&&![`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.`);if(e.transform.fit!==void 0&&[`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior)&&e.transform.fit!==e.sizeChangeBehavior)throw TypeError(`config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.`);if(e.transform.rotate!==void 0&&![0,90,180,270].includes(e.transform.rotate))throw TypeError(`config.transform.rotate, when provided, must be 0, 90, 180 or 270.`);if(e.transform.crop!==void 0&&mv(e.transform.crop,`config.transform.`),e.transform.process!==void 0&&typeof e.transform.process!=`function`)throw TypeError(`config.transform.process, when provided, must be a function.`);if(e.transform.frameRate!==void 0&&(!Number.isFinite(e.transform.frameRate)||e.transform.frameRate<=0))throw TypeError(`config.transform.frameRate, when provided, must be a finite positive number.`);if(e.transform.force!==void 0&&typeof e.transform.force!=`boolean`)throw TypeError(`config.transform.force, when provided, must be a boolean.`)}if(e.onEncodedPacket!==void 0&&typeof e.onEncodedPacket!=`function`)throw TypeError(`config.onEncodedPacket, when provided, must be a function.`);if(e.onEncoderConfig!==void 0&&typeof e.onEncoderConfig!=`function`)throw TypeError(`config.onEncoderConfig, when provided, must be a function.`);if(e.onEncodedSample!==void 0&&typeof e.onEncodedSample!=`function`)throw TypeError(`config.onEncodedSample, when provided, must be a function.`);wv(e.codec,e)},wv=(e,t)=>{if(!t||typeof t!=`object`)throw TypeError(`Encoding options must be an object.`);if(t.alpha!==void 0&&![`discard`,`keep`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'discard' or 'keep'.`);let n=t.bitrateMode;if(n!==void 0&&![`constant`,`variable`].includes(n))throw TypeError(`bitrateMode, when provided, must be 'constant' or 'variable'.`);if(t.latencyMode!==void 0&&![`quality`,`realtime`].includes(t.latencyMode))throw TypeError(`latencyMode, when provided, must be 'quality' or 'realtime'.`);if(t.fullCodecString!==void 0&&typeof t.fullCodecString!=`string`)throw TypeError(`fullCodecString, when provided, must be a string.`);if(t.fullCodecString!==void 0&&Jg(t.fullCodecString)!==e)throw TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${e}).`);if(t.hardwareAcceleration!==void 0&&![`no-preference`,`prefer-hardware`,`prefer-software`].includes(t.hardwareAcceleration))throw TypeError(`hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.`);if(t.scalabilityMode!==void 0&&typeof t.scalabilityMode!=`string`)throw TypeError(`scalabilityMode, when provided, must be a string.`);if(t.contentHint!==void 0&&typeof t.contentHint!=`string`)throw TypeError(`contentHint, when provided, must be a string.`)},Tv=e=>{let t=e.bitrateMode,n=e.quality._toVideoRateControl(e.codec,e.width,e.height,t),r=(t,n,r)=>({codec:e.fullCodecString??Wg(e.codec,e.width,e.height,r,e.alpha===`keep`),width:e.width,height:e.height,displayWidth:e.squarePixelWidth,displayHeight:e.squarePixelHeight,bitrate:t,bitrateMode:n,alpha:e.alpha??`discard`,framerate:e.framerate,latencyMode:e.latencyMode,hardwareAcceleration:e.hardwareAcceleration,scalabilityMode:e.scalabilityMode,contentHint:e.contentHint,...Yg(e.codec)}),i=[];return n.quantizer!==null&&i.push({config:r(void 0,`quantizer`,n.bitrate),quantizer:n.quantizer}),n.bitrateMode!==`quantizer`&&i.push({config:r(n.bitrate,n.bitrateMode,n.bitrate),quantizer:null}),U(i.length>0),i},Ev=class{constructor(e){if((typeof e==`number`||typeof e==`string`)&&(e={quality:e}),!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.bitrateMode!==void 0&&![`constant`,`variable`].includes(e.bitrateMode))throw TypeError(`options.bitrateMode, when provided, must be 'constant' or 'variable'.`);if(`quality`in e){if(typeof e.quality==`string`?!(e.quality in Dv):typeof e.quality!=`number`||Number.isNaN(e.quality))throw TypeError(`options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.`);if(e.preferBitrate!==void 0&&typeof e.preferBitrate!=`boolean`)throw TypeError(`options.preferBitrate, when provided, must be a boolean.`);if(`bitrate`in e||`quantizer`in e)throw TypeError(`options.quality cannot be combined with options.bitrate or options.quantizer.`);this._quality=typeof e.quality==`string`?Dv[e.quality]:e.quality,this._preferBitrate=e.preferBitrate??!1,this._bitrate=void 0,this._quantizer=void 0}else{if(e.bitrate!==void 0&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw TypeError(`options.bitrate, when provided, must be a positive integer.`);if(e.quantizer!==void 0&&(!Number.isInteger(e.quantizer)||e.quantizer<0))throw TypeError(`options.quantizer, when provided, must be a non-negative integer.`);if(e.bitrate===void 0&&e.quantizer===void 0)throw TypeError(`At least one of options.bitrate or options.quantizer must be set.`);if(`preferBitrate`in e)throw TypeError(`options.preferBitrate can only be combined with options.quality.`);this._quality=void 0,this._preferBitrate=!1,this._bitrate=e.bitrate,this._quantizer=e.quantizer}this._bitrateMode=e.bitrateMode}_toVideoRateControl(e,t,n,r){let i=Ov[e],a=null,o=this._bitrateMode??r??`variable`;if(this._quantizer!==void 0){if(!i){if(this._bitrate===void 0)throw Error(`Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`)}else if(this._quantizer<i.min||this._quantizer>i.max){if(this._bitrate===void 0)throw Error(`Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${i.min} and ${i.max}.`)}else a=this._quantizer,this._bitrate===void 0&&(o=`quantizer`)}else this._bitrate===void 0&&i&&!this._preferBitrate&&(U(this._quality!==void 0),a=Jh(Math.round(Yh(i.worst,i.best,this._quality)),i.min,i.max));let s;if(this._bitrate!==void 0)s=this._bitrate;else{let r=this._quality;r===void 0&&(U(a!==null&&i),r=Jh((a-i.worst)/(i.best-i.worst),0,1)),s=Av(e,t,n,kv(r))}return{quantizer:a,bitrate:s,bitrateMode:o}}_toVideoBitrate(e,t,n){return this._bitrate===void 0?(U(this._quality!==void 0),Av(e,t,n,kv(this._quality))):this._bitrate}_toAudioBitrate(e){if(Pg.includes(e)||e===`flac`)return;if(this._bitrate!==void 0)return this._bitrate;if(this._quality===void 0)throw Error(`This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.`);let t=kv(this._quality),n={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3}[e];if(!n)throw Error(`Unhandled codec: ${e}`);let r=n*t;return e===`aac`?r=[96e3,128e3,16e4,192e3].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e):e===`opus`||e===`vorbis`?r=Math.max(6e3,r):e===`mp3`&&(r=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e)),Math.round(r/1e3)*1e3}},Dv={"very-low":0,low:.25,medium:.5,high:.75,"very-high":1},Ov={avc:{min:0,max:51,worst:41,best:16},hevc:{min:0,max:51,worst:41,best:16},vp9:{min:0,max:63,worst:52,best:20},av1:{min:0,max:255,worst:208,best:80}},kv=e=>.3*Math.exp(2.5538*e),Av=(e,t,n,r)=>{let i=t*n,a=3e6,o=a*(i/2073600)**.95*{avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2,prores:22e7/a}[e]*r;return Math.ceil(o/1e3)*1e3},jv=(e,t)=>{if(e===`avc`)return{avc:{quantizer:t}};if(e===`hevc`)return{hevc:{quantizer:t}};if(e===`vp9`)return{vp9:{quantizer:t}};if(e===`av1`)return{av1:{quantizer:t}};U(!1)},Mv=(e,t)=>{if(e!==void 0)return e;if(t!==void 0)return t instanceof Ev?t:new Ev({bitrate:t})}})))()}var Pv;function Fv(){return(Fv=t((()=>{Pv=[]})))()}var Iv,Lv,Rv;function zv(){return(zv=t((()=>{vg(),Iv=class e{constructor(e,t,n,r,i){this.bytes=e,this.view=t,this.offset=n,this.start=r,this.end=i,this.bufferPos=r-n}static tempFromBytes(t){return new e(t,Fh(t),0,0,t.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(t,n=this.end-t){if(t<this.start||t+n>this.end)throw RangeError(`Slicing outside of original slice.`);return new e(this.bytes,this.view,this.offset,t,t+n)}},Lv=(e,t)=>{if(e.filePos<e.start||e.filePos+t>e.end)throw RangeError(`Tried reading [${e.filePos}, ${e.filePos+t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`)},Rv=(e,t)=>{Lv(e,t);let n=e.bytes.subarray(e.bufferPos,e.bufferPos+t);return e.bufferPos+=t,n}})))()}var Bv;function Vv(){return(Vv=t((()=>{vg(),Bv=class{constructor(e){this.mutex=new Hh,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateTimestamp(e,t,n){if(t<0)throw Error(`Timestamps must be non-negative (got ${t}s).`);let r=this.trackTimestampInfo.get(e);if(r){if(n&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!n)throw Error(`First packet must be a key packet.`);r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}}}})))()}var Hv,Uv;function Wv(){return(Wv=t((()=>{Hv=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,Uv=e=>{let t=Math.floor(e/36e5),n=Math.floor(e%36e5/6e4),r=Math.floor(e%6e4/1e3),i=e%1e3;return t.toString().padStart(2,`0`)+`:`+n.toString().padStart(2,`0`)+`:`+r.toString().padStart(2,`0`)+`.`+i.toString().padStart(3,`0`)}})))()}var Gv,G,Kv,K,q,qv,Jv,J,Yv,Xv,Zv,Qv,$v,ey,ty,Y,ny,ry,iy,X,Z,ay,oy,sy,cy,ly,uy,dy,fy,py,my,hy,gy,_y,vy,yy,by,xy,Sy,Cy,wy,Ty,Ey,Dy,Oy,ky,Ay,jy,My,Ny,Py,Fy,Iy,Ly,Ry,zy,By,Vy,Hy,Uy,Wy,Gy,Ky,qy,Jy,Yy,Xy,Zy,Qy,$y,eb,tb,nb,rb,ib,ab,ob,sb,cb,lb,ub,db,fb,pb,mb,hb,gb,_b,vb,yb,bb,xb,Sb,Cb,wb,Tb,Eb,Db,Ob,kb,Ab,jb,Mb;function Nb(){return(Nb=t((()=>{vg(),a_(),Wv(),qb(),H_(),Eg(),Og(),Gv=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8==7&&this.writer.write(this.helper);e.length%8!=0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let t of e.children)t&&this.writeBox(t);let n=this.writer.getPos(),r=e.size??n-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);U(t!==void 0);let n=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(n)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}},G=new Uint8Array(8),Kv=new DataView(G.buffer),K=e=>[(e%256+256)%256],q=e=>(Kv.setUint16(0,e,!1),[G[0],G[1]]),qv=e=>(Kv.setInt16(0,e,!1),[G[0],G[1]]),Jv=e=>(Kv.setUint32(0,e,!1),[G[1],G[2],G[3]]),J=e=>(Kv.setUint32(0,e,!1),[G[0],G[1],G[2],G[3]]),Yv=e=>(Kv.setInt32(0,e,!1),[G[0],G[1],G[2],G[3]]),Xv=e=>(Kv.setUint32(0,Math.floor(e/2**32),!1),Kv.setUint32(4,e,!1),[G[0],G[1],G[2],G[3],G[4],G[5],G[6],G[7]]),Zv=e=>(Kv.setInt32(0,Math.floor(e/2**32),!1),Kv.setUint32(4,e,!1),[G[0],G[1],G[2],G[3],G[4],G[5],G[6],G[7]]),Qv=e=>(Kv.setInt16(0,256*e,!1),[G[0],G[1]]),$v=e=>(Kv.setInt32(0,2**16*e,!1),[G[0],G[1],G[2],G[3]]),ey=e=>(Kv.setInt32(0,2**30*e,!1),[G[0],G[1],G[2],G[3]]),ty=(e,t)=>{let n=[],r=e;do{let e=r&127;r>>=7,n.length>0&&(e|=128),n.push(e),t!==void 0&&t--}while(r>0||t);return n.reverse()},Y=(e,t=!1)=>{let n=Array(e.length).fill(null).map((t,n)=>e.charCodeAt(n));return t&&n.push(0),n},ny=e=>{let t=Math.PI/180*e,n=Math.round(Math.cos(t)),r=Math.round(Math.sin(t));return[n,r,0,-r,n,0,0,0,1]},ry=ny(0),iy=e=>[$v(e[0]),$v(e[1]),ey(e[2]),$v(e[3]),$v(e[4]),ey(e[5]),$v(e[6]),$v(e[7]),ey(e[8])],X=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),Z=(e,t,n,r,i)=>X(e,[K(t),Jv(n),r??[]],i),ay=e=>e.isQuickTime?X(`ftyp`,[Y(`qt  `),J(512),Y(`qt  `)]):e.fragmented?e.cmaf?X(`ftyp`,[Y(`iso5`),J(512),Y(`iso5`),Y(`iso6`),Y(`mp41`),Y(`cmfc`),Y(`dash`)]):X(`ftyp`,[Y(`iso5`),J(512),Y(`iso5`),Y(`iso6`),Y(`mp41`)]):X(`ftyp`,[Y(`isom`),J(512),Y(`isom`),e.holdsAvc?Y(`avc1`):[],Y(`mp41`)]),oy=()=>X(`styp`,[Y(`iso5`),J(0),Y(`iso5`),Y(`iso6`),Y(`mp41`),Y(`cmfc`),Y(`dash`)]),sy=(e,t)=>{let n=e.maxWrittenEndTimestamp-e.minWrittenTimestamp;return Number.isFinite(n)||(n=0),Z(`sidx`,1,0,[J(1),J(Ub),Xv(Q(e.minWrittenTimestamp,Ub)),Xv(0),q(0),q(1),J(t&2147483647),J(Q(n,Ub)),J(0)])},cy=e=>({type:`mdat`,largeSize:e}),ly=e=>({type:`free`,size:e}),uy=e=>X(`moov`,void 0,[dy(e.creationTime,e.trackDatas),...e.trackDatas.map(t=>py(t,e.creationTime)),e.isFragmented?rb(e.trackDatas):null,vb(e)]),dy=(e,t)=>{let n=Math.max(0,...t.map(e=>Q(fy(e),Ub)+Q(e.startTimestampOffset??0,Ub))),r=Math.max(0,...t.map(e=>e.track.id))+1,i=!Mh(e)||!Mh(n),a=i?Xv:J;return Z(`mvhd`,+i,0,[a(e),a(e),J(Ub),a(n),$v(1),Qv(1),Array(10).fill(0),iy(ry),Array(24).fill(0),J(r)])},fy=e=>{if(e.samples.length===0)return 0;let t=1/0,n=-1/0;for(let r=0;r<e.samples.length;r++){let i=e.samples[r];i.timestamp<t&&(t=i.timestamp),i.timestamp+i.duration>n&&(n=i.timestamp+i.duration)}return t===1/0?0:n-t},py=(e,t)=>{let n=Gb(e),r=e.startTimestampOffset!==null&&e.startTimestampOffset>0;return X(`trak`,void 0,[my(e,t),r?hy(e,e.startTimestampOffset):null,gy(e,t),n.name===void 0?null:X(`udta`,void 0,[X(`name`,[...Ih.encode(n.name)])])])},my=(e,t)=>{let n=Q(fy(e),Ub)+Q(e.startTimestampOffset??0,Ub),r=!Mh(t)||!Mh(n),i=r?Xv:J,a;if(e.type===`video`){let t=e.track.metadata.rotation;a=ny(t??0)}else a=ry;let o=2;e.track.metadata.disposition?.default!==!1&&(o|=1);let s=e.type===`video`?0:e.type===`audio`?1:e.type===`subtitle`?2:Gh(e);return Z(`tkhd`,+r,o,[i(t),i(t),J(e.track.id),J(0),i(n),Array(8).fill(0),q(0),q(s),Qv(+(e.type===`audio`)),q(0),iy(a),$v(e.type===`video`?e.info.width:0),$v(e.type===`video`?e.info.height:0)])},hy=(e,t)=>{let n=Q(t,Ub),r=Q(fy(e),Ub),i=!Mh(n)||!Mh(r),a=i?Xv:J,o=i?Zv:Yv;return X(`edts`,void 0,[Z(`elst`,+!!i,0,[J(2),a(n),o(-1),$v(1),a(r),o(0),$v(1)])])},gy=(e,t)=>X(`mdia`,void 0,[_y(e,t),by(!0,vy[e.type],yy[e.type]),xy(e)]),_y=(e,t)=>{let n=Q(fy(e),e.timescale),r=!Mh(t)||!Mh(n),i=r?Xv:J;return Z(`mdhd`,+r,0,[i(t),i(t),J(e.timescale),i(n),q(Mb(e.track.metadata.languageCode??`und`)),q(0)])},vy={video:`vide`,audio:`soun`,subtitle:`text`},yy={video:`MediabunnyVideoHandler`,audio:`MediabunnySoundHandler`,subtitle:`MediabunnyTextHandler`},by=(e,t,n,r=`\0\0\0\0`)=>Z(`hdlr`,0,0,[e?Y(`mhlr`):J(0),Y(t),Y(r),J(0),J(0),Y(n,!0)]),xy=e=>X(`minf`,void 0,[Ty[e.type](),Ey(),ky(e)]),Sy=()=>Z(`vmhd`,0,1,[q(0),q(0),q(0),q(0)]),Cy=()=>Z(`smhd`,0,0,[q(0),q(0)]),wy=()=>Z(`nmhd`,0,0),Ty={video:Sy,audio:Cy,subtitle:wy},Ey=()=>X(`dinf`,void 0,[Dy()]),Dy=()=>Z(`dref`,0,0,[J(1)],[Oy()]),Oy=()=>Z(`url `,0,1),ky=e=>{let t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(e=>e.sampleCompositionTimeOffset!==0);return X(`stbl`,void 0,[Ay(e),Xy(e),t?tb(e):null,t?nb(e):null,Qy(e),$y(e),eb(e),Zy(e)])},Ay=e=>{let t;if(e.type===`video`)t=jy(Eb(e.track.source._codec,e.info.decoderConfig.codec),e);else if(e.type===`audio`){let n=Ob(e.track.source._codec,e.muxer.isQuickTime);U(n),t=Ry(n,e)}else e.type===`subtitle`&&(t=Jy(Ab[e.track.source._codec],e));return U(t),Z(`stsd`,0,0,[J(1)],[t])},jy=(e,t)=>X(e,[[,,,,,,].fill(0),q(1),q(0),q(0),Array(12).fill(0),q(t.info.width),q(t.info.height),J(4718592),J(4718592),J(0),q(1),K(10),Y(`Mediabunny`),Array(21).fill(0),q(t.info.hasAlphaChannel?32:24),qv(65535)],[Db[t.track.source._codec]?.(t)??null,My(t),Bh(t.info.decoderConfig.colorSpace)?Ny(t):null]),My=e=>e.info.pixelAspectRatio.num===e.info.pixelAspectRatio.den?null:X(`pasp`,[J(e.info.pixelAspectRatio.num),J(e.info.pixelAspectRatio.den)]),Ny=e=>X(`colr`,[Y(e.muxer.isQuickTime?`nclc`:`nclx`),q(Lh[e.info.decoderConfig.colorSpace.primaries]),q(Rh[e.info.decoderConfig.colorSpace.transfer]),q(zh[e.info.decoderConfig.colorSpace.matrix]),e.muxer.isQuickTime?[]:K(!!e.info.decoderConfig.colorSpace.fullRange<<7)]),Py=e=>e.info.decoderConfig&&X(`avcC`,[...Ph(e.info.decoderConfig.description)]),Fy=e=>e.info.decoderConfig&&X(`hvcC`,[...Ph(e.info.decoderConfig.description)]),Iy=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig,n=t.codec.split(`.`),r=Number(n[1]),i=Number(n[2]),a=Number(n[3]),o=n[4]?Number(n[4]):1,s=n[8]?Number(n[8]):Number(t.colorSpace?.fullRange??0),c=(a<<4)+(o<<1)+s,l=n[5]?Number(n[5]):t.colorSpace?.primaries?Lh[t.colorSpace.primaries]:2,u=n[6]?Number(n[6]):t.colorSpace?.transfer?Rh[t.colorSpace.transfer]:2,d=n[7]?Number(n[7]):t.colorSpace?.matrix?zh[t.colorSpace.matrix]:2;return Z(`vpcC`,1,0,[K(r),K(i),K(c),K(l),K(u),K(d),q(0)])},Ly=e=>X(`av1C`,Gg(e.info.decoderConfig.codec)),Ry=(e,t)=>{let n=0,r,i=16,a=Pg.includes(t.track.source._codec);if(a){let e=t.track.source._codec,{sampleSize:r}=qg(e);i=8*r,i>16&&(n=1)}if(t.muxer.isQuickTime&&(n=1),n===0)r=[[,,,,,,].fill(0),q(1),q(n),q(0),J(0),q(t.info.numberOfChannels),q(i),q(0),q(0),q(t.info.sampleRate<2**16?t.info.sampleRate:0),q(0)];else{let e=a?0:-2;r=[[,,,,,,].fill(0),q(1),q(n),q(0),J(0),q(t.info.numberOfChannels),q(Math.min(i,16)),qv(e),q(0),q(t.info.sampleRate<2**16?t.info.sampleRate:0),q(0),a?[J(1),J(i/8),J(t.info.numberOfChannels*i/8)]:[J(0),J(0),J(0)],J(2)]}return X(e,r,[kb(t.track.source._codec,t.muxer.isQuickTime)?.(t)??null])},zy=e=>{let t;switch(e.track.source._codec){case`aac`:t=64;break;case`mp3`:t=107;break;case`vorbis`:t=221;break;default:throw Error(`Unhandled audio codec: ${e.track.source._codec}`)}let n=[...K(t),...K(21),...Jv(0),...J(0),...J(0)];if(e.info.decoderConfig.description){let t=Ph(e.info.decoderConfig.description);n=[...n,...K(5),...ty(t.byteLength),...t]}return n=[...q(1),...K(0),...K(4),...ty(n.length),...n,...K(6),...K(1),...K(2)],n=[...K(3),...ty(n.length),...n],Z(`esds`,0,0,n)},By=e=>X(`wave`,void 0,[Vy(e),Hy(e),X(`\0\0\0\0`)]),Vy=e=>X(`frma`,[Y(Ob(e.track.source._codec,e.muxer.isQuickTime))]),Hy=e=>{let{littleEndian:t}=qg(e.track.source._codec);return X(`enda`,[q(+t)])},Uy=e=>{let t=e.info.numberOfChannels,n=3840,r=e.info.sampleRate,i=0,a=0,o=new Uint8Array,s=e.info.decoderConfig?.description;if(s){U(s.byteLength>=18);let e=Ph(s),c=I_(e);t=c.outputChannelCount,n=c.preSkip,r=c.inputSampleRate,i=c.outputGain,a=c.channelMappingFamily,c.channelMappingTable&&(o=c.channelMappingTable)}return X(`dOps`,[K(0),K(t),q(n),J(r),qv(i),K(a),...o])},Wy=e=>{let t=e.info.decoderConfig?.description;U(t);let n=Ph(t);return Z(`dfLa`,0,0,[...n.subarray(4)])},Gy=e=>{let{littleEndian:t,sampleSize:n}=qg(e.track.source._codec),r=+t;return Z(`pcmC`,0,0,[K(r),K(8*n)])},Ky=e=>{U(e.info.primingPacket);let t=z_(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=new Uint8Array(3),r=new Dg(n);return r.writeBits(2,t.fscod),r.writeBits(5,t.bsid),r.writeBits(3,t.bsmod),r.writeBits(3,t.acmod),r.writeBits(1,t.lfeon),r.writeBits(5,t.bitRateCode),r.writeBits(5,0),X(`dac3`,[...n])},qy=e=>{U(e.info.primingPacket);let t=V_(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=16;for(let e of t.substreams)n+=23,e.numDepSub>0?n+=9:n+=1;let r=Math.ceil(n/8),i=new Uint8Array(r),a=new Dg(i);a.writeBits(13,t.dataRate),a.writeBits(3,t.substreams.length-1);for(let e of t.substreams)a.writeBits(2,e.fscod),a.writeBits(5,e.bsid),a.writeBits(1,0),a.writeBits(1,0),a.writeBits(3,e.bsmod),a.writeBits(3,e.acmod),a.writeBits(1,e.lfeon),a.writeBits(3,0),a.writeBits(4,e.numDepSub),e.numDepSub>0?a.writeBits(9,e.chanLoc):a.writeBits(1,0);return X(`dec3`,[...i])},Jy=(e,t)=>X(e,[[,,,,,,].fill(0),q(1)],[jb[t.track.source._codec](t)]),Yy=e=>X(`vttC`,[...Ih.encode(e.info.config.description)]),Xy=e=>Z(`stts`,0,0,[J(e.timeToSampleTable.length),e.timeToSampleTable.map(e=>[J(e.sampleCount),J(e.sampleDelta)])]),Zy=e=>{if(e.samples.every(e=>e.type===`key`))return null;let t=[...e.samples.entries()].filter(([,e])=>e.type===`key`);return Z(`stss`,0,0,[J(t.length),t.map(([e])=>J(e+1))])},Qy=e=>Z(`stsc`,0,0,[J(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(e=>[J(e.firstChunk),J(e.samplesPerChunk),J(1)])]),$y=e=>{if(e.type===`audio`&&e.info.requiresPcmTransformation){let{sampleSize:t}=qg(e.track.source._codec);return Z(`stsz`,0,0,[J(t*e.info.numberOfChannels),J(e.samples.reduce((t,n)=>t+Q(n.duration,e.timescale),0))])}return Z(`stsz`,0,0,[J(0),J(e.samples.length),e.samples.map(e=>J(e.size))])},eb=e=>e.finalizedChunks.length>0&&jh(e.finalizedChunks).offset>=2**32?Z(`co64`,0,0,[J(e.finalizedChunks.length),e.finalizedChunks.map(e=>Xv(e.offset))]):Z(`stco`,0,0,[J(e.finalizedChunks.length),e.finalizedChunks.map(e=>J(e.offset))]),tb=e=>Z(`ctts`,1,0,[J(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(e=>[J(e.sampleCount),Yv(e.sampleCompositionTimeOffset)])]),nb=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;U(e.compositionTimeOffsetTable.length>0),U(e.samples.length>0);for(let r=0;r<e.compositionTimeOffsetTable.length;r++){let i=e.compositionTimeOffsetTable[r];t=Math.min(t,i.sampleCompositionTimeOffset),n=Math.max(n,i.sampleCompositionTimeOffset)}for(let t=0;t<e.samples.length;t++){let n=e.samples[t];r=Math.min(r,Q(n.timestamp,e.timescale)),i=Math.max(i,Q(n.timestamp+n.duration,e.timescale))}let a=Math.max(-t,0);return i>=2**31?null:Z(`cslg`,0,0,[Yv(a),Yv(t),Yv(n),Yv(r),Yv(i)])},rb=e=>X(`mvex`,void 0,e.map(ib)),ib=e=>Z(`trex`,0,0,[J(e.track.id),J(1),J(0),J(0),J(0)]),ab=(e,t)=>X(`moof`,void 0,[ob(e),...t.map(cb)]),ob=e=>Z(`mfhd`,0,0,[J(e)]),sb=e=>{let t=0,n=0,r=e.type===`delta`;return n|=+r,t|=r?1:2,t<<24|n<<16|0},cb=e=>X(`traf`,void 0,[lb(e),ub(e),db(e)]),lb=e=>{U(e.currentChunk);let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],r={duration:n.timescaleUnitsToNextSample,size:n.size,flags:sb(n)};return Z(`tfhd`,0,t,[J(e.track.id),J(r.duration),J(r.size),J(r.flags)])},ub=e=>(U(e.currentChunk),Z(`tfdt`,1,0,[Xv(Q(e.currentChunk.startTimestamp,e.timescale))])),db=e=>{U(e.currentChunk);let t=e.currentChunk.samples.map(e=>e.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(e=>e.size),r=e.currentChunk.samples.map(sb),i=e.currentChunk.samples.map(t=>Q(t.timestamp-t.decodeTimestamp,e.timescale)),a=new Set(t),o=new Set(n),s=new Set(r),c=new Set(i),l=s.size===2&&r[0]!==r[1],u=a.size>1,d=o.size>1,f=!l&&s.size>1,p=c.size>1||[...c].some(e=>e!==0),m=0;return m|=1,m|=4*l,m|=256*u,m|=512*d,m|=1024*f,m|=2048*p,Z(`trun`,1,m,[J(e.currentChunk.samples.length),J(e.currentChunk.offset-e.currentChunk.moofOffset||0),l?J(r[0]):[],e.currentChunk.samples.map((e,a)=>[u?J(t[a]):[],d?J(n[a]):[],f?J(r[a]):[],p?Yv(i[a]):[]])])},fb=e=>X(`mfra`,void 0,[...e.map(pb),mb()]),pb=e=>Z(`tfra`,1,0,[J(e.track.id),J(63),J(e.finalizedChunks.length),e.finalizedChunks.map(t=>[Xv(Q(t.samples[0].timestamp,e.timescale)),Xv(t.moofOffset),J(t.trafIndex+1),J(1),J(1)])]),mb=()=>Z(`mfro`,0,0,[J(0)]),hb=()=>X(`vtte`),gb=(e,t,n,r,i)=>X(`vttc`,void 0,[i===null?null:X(`vsid`,[Yv(i)]),n===null?null:X(`iden`,[...Ih.encode(n)]),t===null?null:X(`ctim`,[...Ih.encode(Uv(t))]),r===null?null:X(`sttg`,[...Ih.encode(r)]),X(`payl`,[...Ih.encode(e)])]),_b=e=>X(`vtta`,[...Ih.encode(e)]),vb=e=>{let t=[],n=e.format._options.metadataFormat??`auto`,r=e.output._metadataTags;if(n===`mdir`||n===`auto`&&!e.isQuickTime){let e=Cb(r);e&&t.push(e)}else if(n===`mdta`){let e=wb(r);e&&t.push(e)}else(n===`udta`||n===`auto`&&e.isQuickTime)&&yb(t,e.output._metadataTags);return t.length===0?null:X(`udta`,void 0,t)},yb=(e,t)=>{for(let{key:n,value:r}of lg(t))switch(n){case`title`:e.push(bb(`©nam`,r));break;case`description`:e.push(bb(`©des`,r));break;case`artist`:e.push(bb(`©ART`,r));break;case`album`:e.push(bb(`©alb`,r));break;case`albumArtist`:e.push(bb(`albr`,r));break;case`genre`:e.push(bb(`©gen`,r));break;case`date`:e.push(bb(`©day`,r.toISOString().slice(0,10)));break;case`comment`:e.push(bb(`©cmt`,r));break;case`lyrics`:e.push(bb(`©lyr`,r));break;case`raw`:break;case`discNumber`:case`discsTotal`:case`trackNumber`:case`tracksTotal`:case`images`:break;default:Gh(n)}if(t.raw)for(let n in t.raw){let r=t.raw[n];r==null||n.length!==4||e.some(e=>e.type===n)||(typeof r==`string`?e.push(bb(n,r)):r instanceof Uint8Array&&e.push(X(n,Array.from(r))))}},bb=(e,t)=>{let n=Ih.encode(t);return X(e,[q(n.length),q(Mb(`und`)),Array.from(n)])},xb={"image/jpeg":13,"image/png":14,"image/bmp":27},Sb=(e,t)=>{let n=[];for(let{key:r,value:i}of lg(e))switch(r){case`title`:n.push({key:t?`title`:`©nam`,value:Tb(i)});break;case`description`:n.push({key:t?`description`:`©des`,value:Tb(i)});break;case`artist`:n.push({key:t?`artist`:`©ART`,value:Tb(i)});break;case`album`:n.push({key:t?`album`:`©alb`,value:Tb(i)});break;case`albumArtist`:n.push({key:t?`album_artist`:`aART`,value:Tb(i)});break;case`comment`:n.push({key:t?`comment`:`©cmt`,value:Tb(i)});break;case`genre`:n.push({key:t?`genre`:`©gen`,value:Tb(i)});break;case`lyrics`:n.push({key:t?`lyrics`:`©lyr`,value:Tb(i)});break;case`date`:n.push({key:t?`date`:`©day`,value:Tb(i.toISOString().slice(0,10))});break;case`images`:for(let e of i)e.kind===`coverFront`&&n.push({key:`covr`,value:X(`data`,[J(xb[e.mimeType]??0),J(0),Array.from(e.data)])});break;case`trackNumber`:if(t){let t=e.tracksTotal===void 0?i.toString():`${i}/${e.tracksTotal}`;n.push({key:`track`,value:Tb(t)})}else n.push({key:`trkn`,value:X(`data`,[J(0),J(0),q(0),q(i),q(e.tracksTotal??0),q(0)])});break;case`discNumber`:t||n.push({key:`disc`,value:X(`data`,[J(0),J(0),q(0),q(i),q(e.discsTotal??0),q(0)])});break;case`tracksTotal`:case`discsTotal`:break;case`raw`:break;default:Gh(r)}if(e.raw)for(let r in e.raw){let i=e.raw[r];i==null||!t&&r.length!==4||n.some(e=>e.key===r)||(typeof i==`string`?n.push({key:r,value:Tb(i)}):i instanceof Uint8Array?n.push({key:r,value:X(`data`,[J(0),J(0),Array.from(i)])}):i instanceof Sg&&n.push({key:r,value:X(`data`,[J(xb[i.mimeType]??0),J(0),Array.from(i.data)])}))}return n},Cb=e=>{let t=Sb(e,!1);return t.length===0?null:Z(`meta`,0,0,void 0,[by(!1,`mdir`,``,`appl`),X(`ilst`,void 0,t.map(e=>X(e.key,void 0,[e.value])))])},wb=e=>{let t=Sb(e,!0);return t.length===0?null:X(`meta`,void 0,[by(!1,`mdta`,``),Z(`keys`,0,0,[J(t.length)],t.map(e=>X(`mdta`,[...Ih.encode(e.key)]))),X(`ilst`,void 0,t.map((e,t)=>{let n=String.fromCharCode(...J(t+1));return X(n,void 0,[e.value])}))])},Tb=e=>X(`data`,[J(1),J(0),...Ih.encode(e)]),Eb=(e,t)=>{switch(e){case`avc`:return t.startsWith(`avc3`)?`avc3`:`avc1`;case`hevc`:return`hvc1`;case`vp8`:return`vp08`;case`vp9`:return`vp09`;case`av1`:return`av01`;case`prores`:return t}},Db={avc:Py,hevc:Fy,vp8:Iy,vp9:Iy,av1:Ly,prores:null},Ob=(e,t)=>{switch(e){case`aac`:return`mp4a`;case`mp3`:return`mp4a`;case`opus`:return`Opus`;case`vorbis`:return`mp4a`;case`flac`:return`fLaC`;case`ulaw`:return`ulaw`;case`alaw`:return`alaw`;case`pcm-u8`:return`raw `;case`pcm-s8`:return`sowt`;case`ac3`:return`ac-3`;case`eac3`:return`ec-3`}if(t)switch(e){case`pcm-s16`:return`sowt`;case`pcm-s16be`:return`twos`;case`pcm-s24`:return`in24`;case`pcm-s24be`:return`in24`;case`pcm-s32`:return`in32`;case`pcm-s32be`:return`in32`;case`pcm-f32`:return`fl32`;case`pcm-f32be`:return`fl32`;case`pcm-f64`:return`fl64`;case`pcm-f64be`:return`fl64`}else switch(e){case`pcm-s16`:return`ipcm`;case`pcm-s16be`:return`ipcm`;case`pcm-s24`:return`ipcm`;case`pcm-s24be`:return`ipcm`;case`pcm-s32`:return`ipcm`;case`pcm-s32be`:return`ipcm`;case`pcm-f32`:return`fpcm`;case`pcm-f32be`:return`fpcm`;case`pcm-f64`:return`fpcm`;case`pcm-f64be`:return`fpcm`}},kb=(e,t)=>{switch(e){case`aac`:return zy;case`mp3`:return zy;case`opus`:return Uy;case`vorbis`:return zy;case`flac`:return Wy;case`ac3`:return Ky;case`eac3`:return qy}if(t)switch(e){case`pcm-s24`:return By;case`pcm-s24be`:return By;case`pcm-s32`:return By;case`pcm-s32be`:return By;case`pcm-f32`:return By;case`pcm-f32be`:return By;case`pcm-f64`:return By;case`pcm-f64be`:return By}else switch(e){case`pcm-s16`:return Gy;case`pcm-s16be`:return Gy;case`pcm-s24`:return Gy;case`pcm-s24be`:return Gy;case`pcm-s32`:return Gy;case`pcm-s32be`:return Gy;case`pcm-f32`:return Gy;case`pcm-f32be`:return Gy;case`pcm-f64`:return Gy;case`pcm-f64be`:return Gy}return null},Ab={webvtt:`wvtt`},jb={webvtt:Yy},Mb=e=>{U(e.length===3);let t=0;for(let n=0;n<3;n++)t<<=5,t+=e.charCodeAt(n)-96;return t}})))()}var Pb;function Fb(){return(Fb=t((()=>{vg(),Pb=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw Error(`Can't have multiple Writers for the same Target.`);this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){U(!this.started),this.target._start(),this.started=!0}write(e){U(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return U(this.started&&!this.finalized),this.target._flush()}async finalize(){U(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let n=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<n;)r*=2;if(r!==this.trackedWrites.byteLength){let e=new Uint8Array(r);e.set(this.trackedWrites,0),this.trackedWrites=e}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(1024),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw Error(`Internal error: Can't get tracked writes since nothing was tracked.`);let e={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,e}}})))()}var Ib,Lb,Rb,zb,Bb,Vb;function Hb(){return(Hb=t((()=>{X_(),vg(),Ib=class extends gg{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit(`write`,{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw TypeError(`offset must be a non-negative integer.`);return new Bb(this,e)}},Lb=2**16,Rb=2**32,zb=class extends Ib{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!=`object`)throw TypeError(`BufferTarget options, when provided, must be an object.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);if(this._options=e,this._supportsResize=`resize`in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(Lb,{maxByteLength:Rb})}catch{this._buffer=new ArrayBuffer(Lb),this._supportsResize=!1}else this._buffer=new ArrayBuffer(Lb);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>Rb)throw Error(`ArrayBuffer exceeded maximum size of ${Rb} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let e=new ArrayBuffer(t),n=new Uint8Array(e);n.set(this._bytes,0),this._buffer=e,this._bytes=n}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit(`finalized`)}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},Bb=class extends Ib{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit(`finalized`)}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},Vb=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!=`string`)throw TypeError(`rootPath must be a string.`);if(typeof t!=`function`)throw TypeError(`getTarget must be a function.`)}}})))()}var Ub,Wb,Gb,Q,Kb;function qb(){return(qb=t((()=>{Nb(),Vv(),Fb(),Hb(),vg(),fx(),Wv(),Mg(),a_(),Y_(),zv(),H_(),q_(),Ub=57600,Wb=2082844800,Gb=e=>{let t={},n=e.track;return n.metadata.name!==void 0&&(t.name=n.metadata.name),t},Q=(e,t,n=!0)=>{let r=e*t;return n?Math.round(r):r},Kb=class extends Bv{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new zb,this.auxWriter=new Pb(this.auxTarget,!1),this.auxBoxWriter=new Gv(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Wh(),this.creationTime=Math.floor(Date.now()/1e3)+Wb,this.finalizedChunks=[],this.wroteFragmentedHeader=!1,this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.formatOptions={...t._options},this.isQuickTime=t instanceof dx,this.isCmaf=t instanceof ux,this.minimumFragmentDuration=this.formatOptions.minimumFragmentDuration??(t instanceof ux?1/0:1),this.auxWriter.start()}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart=`fragmented`,this.isFragmented=!0):(this.writer=await this.output._getRootWriter(e=>this.formatOptions.fastStart===void 0?e instanceof zb:this.formatOptions.fastStart===`fragmented`),this.boxWriter=new Gv(this.writer),this.fastStart=this.formatOptions.fastStart??(this.writer.target instanceof zb&&`in-memory`),this.isFragmented=this.fastStart===`fragmented`),this.isCmaf){if(!this.output._hasInitTarget())throw Error(`CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.`);let e=await this.output._getInitTarget(),t=new Pb(e,!0);t.start(),this.initWriter=t,this.initBoxWriter=new Gv(t)}let t=this.output.tracks.some(e=>e.isVideoTrack()&&e.source._codec===`avc`);{let e=this.initBoxWriter??this.boxWriter;if(U(e),this.formatOptions.onFtyp&&e.writer.startTrackingWrites(),e.writeBox(ay({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.formatOptions.onFtyp){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onFtyp(t,n)}this.ftypSize=e.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!==`in-memory`){if(this.fastStart===`reserve`){for(let e of this.output.tracks)if(e.metadata.maximumPacketCount===void 0)throw Error(`All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.`)}else this.isFragmented||(U(this.writer),U(this.boxWriter),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=cy(!0),this.boxWriter.writeBox(this.mdat))}await this.writer?.flush();for(let e of this.output.tracks)e.isVideoTrack()&&e.metadata.decoderConfig?this.getVideoTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig}):e.isAudioTrack()&&e.metadata.decoderConfig&&this.getAudioTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig});e()}allTracksAreKnown(){for(let e of this.output.tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(e=>e.type===`video`||e.type===`audio`?e.info.decoderConfig.codec:{webvtt:`wvtt`}[e.track.source._codec]);return K_({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(e=>e.type===`video`),hasAudio:this.trackDatas.some(e=>e.type===`audio`),codecStrings:e})}getVideoTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;t_(n,e.source._codec),U(n),U(n.decoderConfig);let i={...n.decoderConfig};U(i.codedWidth!==void 0),U(i.codedHeight!==void 0);let a=!1;if(e.source._codec===`avc`&&!i.description){if(!t)throw Error(`No AVC description provided; you must therefore provide a priming packet.`);let e=__(t.data);if(!e)throw Error(`Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.`);i.description=v_(e),a=!0}else if(e.source._codec===`hevc`&&!i.description){if(!t)throw Error(`No HEVC description provided; you must therefore provide a priming packet.`);let e=T_(t.data);if(!e)throw Error(`Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.`);i.description=N_(e),a=!0}let o=tg(1/(e.metadata.frameRate??57600),1e6).den,s=i.displayAspectWidth,c=i.displayAspectHeight,l=s===void 0||c===void 0?{num:1,den:1}:fg({num:s*i.codedHeight,den:c*i.codedWidth}),u=i.codec===`ap4h`||i.codec===`ap4x`,d={muxer:this,track:e,type:`video`,info:{width:i.codedWidth,height:i.codedHeight,pixelAspectRatio:l,decoderConfig:i,requiresAnnexBTransformation:a,hasAlphaChannel:u},timescale:o,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(d),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),d}getAudioTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;r_(n,e.source._codec),U(n),U(n.decoderConfig);let i={...n.decoderConfig},a=!1;if(e.source._codec===`aac`&&!i.description){if(!t)throw Error(`No AAC description provided; you must therefore provide a priming packet.`);let e=J_(Iv.tempFromBytes(t.data));if(!e)throw Error(`Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.`);let n=kg[e.samplingFrequencyIndex],r=Ag[e.channelConfiguration];if(n===void 0||r===void 0)throw Error(`Invalid ADTS frame header.`);i.description=jg({objectType:e.objectType,sampleRate:n,numberOfChannels:r}),a=!0}if((e.source._codec===`ac3`||e.source._codec===`eac3`)&&!t)throw Error(`AC-3/E-AC-3 require a priming packet.`);let o={muxer:this,track:e,type:`audio`,info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:i,requiresPcmTransformation:!this.isFragmented&&Pg.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:a,primingPacket:t},timescale:i.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(o),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),o}getSubtitleTrackData(e,t){let n=this.trackDatas.find(t=>t.track===e);if(n)return n;i_(t),U(t),U(t.config);let r={muxer:this,track:e,type:`subtitle`,info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,lastCueEndTimestamp:0,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getVideoTrackData(e,t,n),i=t.data;if(r.info.requiresAnnexBTransformation){let e=[...d_(i)].map(e=>i.subarray(e.offset,e.offset+e.length));if(e.length===0)throw Error(`Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.`);i=g_(e,4)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=this.createSampleForTrack(r,i,t.timestamp,t.duration,t.type);await this.registerSample(r,a)}finally{r()}}async addEncodedAudioPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getAudioTrackData(e,t,n),i=t.data;if(r.info.requiresAdtsStripping){let e=J_(Iv.tempFromBytes(i));if(!e)throw Error(`Expected ADTS frame, didn't get one.`);let t=e.crcCheck===null?7:9;i=i.subarray(t)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=t.timestamp,o=t.duration;if(r.info.requiresPcmTransformation){let e=qg(r.info.decoderConfig.codec).sampleSize*r.info.numberOfChannels;if(o=i.byteLength/e/r.info.sampleRate,r.info.expectedNextPcmPacketTimestamp!==null){let e=a-r.info.expectedNextPcmPacketTimestamp;if(e<.01)a=r.info.expectedNextPcmPacketTimestamp;else{let t=await this.padWithSilence(r,r.info.expectedNextPcmPacketTimestamp,e);a=r.info.expectedNextPcmPacketTimestamp+t}}r.info.expectedNextPcmPacketTimestamp=a+o}let s=this.createSampleForTrack(r,i,a,o,t.type);await this.registerSample(r,s)}finally{r()}}async padWithSilence(e,t,n){let r=Q(n,e.timescale);if(n=r/e.timescale,r>0){let{sampleSize:i,silentValue:a}=qg(e.info.decoderConfig.codec),o=r*e.info.numberOfChannels,s=new Uint8Array(i*o).fill(a),c=this.createSampleForTrack(e,new Uint8Array(s.buffer),t,n,`key`);await this.registerSample(e,c)}return n}async addSubtitleCue(e,t,n){let r=await this.mutex.acquire();try{let r=this.getSubtitleTrackData(e,n);this.validateTimestamp(r.track,t.timestamp,!0),e.source._codec===`webvtt`&&(r.cueQueue.push(t),await this.processWebVTTCues(r,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){let n=new Set([]);for(let r of e.cueQueue)U(r.timestamp<=t),U(e.lastCueEndTimestamp<=r.timestamp+r.duration),n.add(Math.max(r.timestamp,e.lastCueEndTimestamp)),n.add(r.timestamp+r.duration);let r=[...n].sort((e,t)=>e-t),i=r[0],a=r[1]??i;if(t<a)break;if(e.lastCueEndTimestamp<i){this.auxWriter.seek(0);let t=hb();this.auxBoxWriter.writeBox(t);let n=this.auxTarget._getSlice(0,this.auxWriter.getPos()),r=this.createSampleForTrack(e,n,e.lastCueEndTimestamp,i-e.lastCueEndTimestamp,`key`);await this.registerSample(e,r),e.lastCueEndTimestamp=i}this.auxWriter.seek(0);for(let t=0;t<e.cueQueue.length;t++){let n=e.cueQueue[t];if(n.timestamp>=a)break;Hv.lastIndex=0;let r=Hv.test(n.text),o=n.timestamp+n.duration,s=e.cueToSourceId.get(n);if(s===void 0&&a<o&&(s=e.nextSourceId++,e.cueToSourceId.set(n,s)),n.notes){let e=_b(n.notes);this.auxBoxWriter.writeBox(e)}let c=gb(n.text,r?i:null,n.identifier??null,n.settings??null,s??null);this.auxBoxWriter.writeBox(c),o===a&&e.cueQueue.splice(t--,1)}let o=this.auxTarget._getSlice(0,this.auxWriter.getPos()),s=this.createSampleForTrack(e,o,i,a-i,`key`);await this.registerSample(e,s),e.lastCueEndTimestamp=a}}createSampleForTrack(e,t,n,r,i){return{timestamp:n,decodeTimestamp:n,duration:r,data:t,size:t.byteLength,type:i,timescaleUnitsToNextSample:Q(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type===`audio`&&e.info.requiresPcmTransformation){this.isFragmented||(e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp);let t=0;for(let n=0;n<e.timestampProcessingQueue.length;n++){let r=e.timestampProcessingQueue[n],i=Q(r.duration,e.timescale);t+=i}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:t,sampleDelta:1});else{let n=jh(e.timeToSampleTable);n.sampleCount+=t}e.timestampProcessingQueue.length=0;return}let n=e.timestampProcessingQueue.map(e=>e.timestamp).sort((e,t)=>e-t);this.isFragmented||(e.startTimestampOffset??=n[0]);for(let t=0;t<e.timestampProcessingQueue.length;t++){let r=e.timestampProcessingQueue[t];r.decodeTimestamp=n[t];let i=Q(r.timestamp-r.decodeTimestamp,e.timescale),a=Q(r.duration,e.timescale);if(e.lastTimescaleUnits!==null){U(e.lastSample);let t=Q(r.decodeTimestamp,e.timescale,!1),n=Math.round(t-e.lastTimescaleUnits);if(U(n>=0),e.lastTimescaleUnits+=n,e.lastSample.timescaleUnitsToNextSample=n,!this.isFragmented){let t=jh(e.timeToSampleTable);if(U(t),t.sampleCount===1){t.sampleDelta=n;let r=e.timeToSampleTable[e.timeToSampleTable.length-2];r&&r.sampleDelta===n&&(r.sampleCount++,e.timeToSampleTable.pop(),t=r)}else t.sampleDelta!==n&&(t.sampleCount--,e.timeToSampleTable.push(t={sampleCount:1,sampleDelta:n}));t.sampleDelta===a?t.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let r=jh(e.compositionTimeOffsetTable);U(r),r.sampleCompositionTimeOffset===i?r.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i})}}else e.lastTimescaleUnits=Q(r.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i}));e.lastSample=r}if(e.timestampProcessingQueue.length=0,U(e.lastSample),U(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){U(t.type===`key`);let n=Q(t.timestamp,e.timescale,!1),r=Math.round(n-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=r}}async registerSample(e,t){t.type===`key`&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart===`reserve`?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart===`reserve`)){let t=e.track.metadata.maximumPacketCount;if(U(t!==void 0),e.samples.length>t)throw Error(`Track #${e.track.id} has already reached the maximum packet count (${t}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!e.currentChunk)n=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let i=this.trackDatas.every(n=>{if(e===n)return t.type===`key`;let r=n.sampleQueue[0];return r?r.type===`key`:n.closed});r>=this.minimumFragmentDuration&&i&&t.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=r>=.5}n&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null,trafIndex:null}),U(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(U(!this.isFragmented),U(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type===`audio`&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((t,n)=>t+Q(n.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||jh(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart===`in-memory`){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(let t of e.currentChunk.samples)U(t.data),this.writer.write(t.data),t.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(U(this.isFragmented),!(!e&&!this.allTracksAreKnown()))outer:for(;;){let t=null,n=1/0;for(let r of this.trackDatas){if(!e&&r.sampleQueue.length===0&&!r.closed)break outer;r.sampleQueue.length>0&&r.sampleQueue[0].timestamp<n&&(t=r,n=r.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){if(U(this.isFragmented),!this.wroteFragmentedHeader){this.wroteFragmentedHeader=!0;let e=this.initBoxWriter??this.boxWriter;U(e),this.formatOptions.onMoov&&e.writer.startTrackingWrites(),this.ensureOneEnabledTrack();let t=uy(this);if(e.writeBox(t),this.formatOptions.onMoov){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onMoov(t,n)}if(this.isCmaf){U(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new Gv(this.writer);let e=this.boxWriter.measureBox(oy()),t=this.boxWriter.measureBox(sy(this,0));this.segmentHeaderSize=e+t,this.writer.seek(this.segmentHeaderSize)}}U(this.writer),U(this.boxWriter);let t=this.trackDatas.filter(e=>e.currentChunk);if(t.length===0){e&&await this.writer.flush();return}let n=this.nextFragmentNumber++,r=ab(n,t),i=this.writer.getPos(),a=i+this.boxWriter.measureBox(r),o=a+8,s=1/0;for(let e=0;e<t.length;e++){let n=t[e];n.currentChunk.offset=o,n.currentChunk.moofOffset=i,n.currentChunk.trafIndex=e;for(let e of n.currentChunk.samples)o+=e.size;s=Math.min(s,n.currentChunk.startTimestamp)}let c=o-a,l=c>=2**32;if(l)for(let e of t)e.currentChunk.offset+=8;this.formatOptions.onMoof&&this.writer.startTrackingWrites();let u=ab(n,t);if(this.boxWriter.writeBox(u),this.formatOptions.onMoof){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoof(e,t,s)}U(this.writer.getPos()===a),this.formatOptions.onMdat&&this.writer.startTrackingWrites();let d=cy(l);d.size=c,this.boxWriter.writeBox(d),this.writer.seek(a+(l?16:8));for(let e of t)for(let t of e.currentChunk.samples)this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}for(let e of t)e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk),e.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){this.allTracksAreKnown()?(this.mdat||await this.createFastStartReserveMdat(),await this.addSampleToTrack(e,t)):e.sampleQueue.push(t)}async createFastStartReserveMdat(){U(this.writer),U(this.boxWriter),this.ensureOneEnabledTrack();let e=uy(this),t=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;U(this.ftypSize!==null),this.writer.seek(this.ftypSize+t),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=cy(!0),this.boxWriter.writeBox(this.mdat);for(let e of this.trackDatas){for(let t of e.sampleQueue)await this.addSampleToTrack(e,t);e.sampleQueue.length=0}}computeSampleTableSizeUpperBound(){U(this.fastStart===`reserve`);let e=0;for(let t of this.trackDatas){let n=t.track.metadata.maximumPacketCount;U(n!==void 0),e+=8*Math.ceil(2/3*n),e+=4*n,e+=8*Math.ceil(2/3*n),e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n}return e}async onTrackClose(e){let t=await this.mutex.acquire(),n=this.trackDatas.find(t=>t.track===e);n&&(n.closed=!0,n.type===`subtitle`&&e.source._codec===`webvtt`&&await this.processWebVTTCues(n,1/0),this.processTimestamps(n)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}ensureOneEnabledTrack(){for(let e of[`video`,`audio`,`subtitle`]){let t=this.trackDatas.filter(t=>t.type===e);if(t.length!==0&&!t.some(e=>e.track.metadata.disposition?.default!==!1)){let e=t[0];e.track.metadata.disposition={...e.track.metadata.disposition,default:!0}}}}async forceFragmentFinalization(){U(this.isFragmented);let e=await this.mutex.acquire();try{for(let e of this.trackDatas)e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);await this.interleaveSamples(!0),await this.finalizeFragment()}finally{e()}}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve(),this.ensureOneEnabledTrack(),!this.mdat&&this.fastStart===`reserve`&&await this.createFastStartReserveMdat();for(let e of this.trackDatas)e.closed=!0,e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let e of this.trackDatas)if(await this.finalizeCurrentChunk(e),e.startTimestampOffset!==null)for(let t=0;t<e.samples.length;t++){let n=e.samples[t];n.timestamp-=e.startTimestampOffset,n.decodeTimestamp-=e.startTimestampOffset}if(U(this.writer),U(this.boxWriter),this.fastStart===`in-memory`){this.mdat=cy(!1);let e;for(let t=0;t<2;t++){let t=uy(this),n=this.boxWriter.measureBox(t);e=this.boxWriter.measureBox(this.mdat);let r=this.writer.getPos()+n+e;for(let t of this.finalizedChunks){t.offset=r;for(let{data:n}of t.samples)U(n),r+=n.byteLength,e+=n.byteLength}if(r<2**32)break;e>=2**32&&(this.mdat.largeSize=!0)}this.formatOptions.onMoov&&this.writer.startTrackingWrites();let t=uy(this);if(this.boxWriter.writeBox(t),this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=e,this.boxWriter.writeBox(this.mdat);for(let e of this.finalizedChunks)for(let t of e.samples)U(t.data),this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}}else if(this.isFragmented){if(this.isCmaf){let e=this.segmentHeaderSize===null?0:this.writer.getPos()-this.segmentHeaderSize;this.writer.seek(0),this.boxWriter.writeBox(oy()),this.boxWriter.writeBox(sy(this,e))}else{let e=this.writer.getPos(),t=fb(this.trackDatas);this.boxWriter.writeBox(t);let n=this.writer.getPos()-e;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(n)}}else{U(this.mdat);let e=this.boxWriter.offsets.get(this.mdat);U(e!==void 0);let t=this.writer.getPos()-e;if(this.mdat.size=t,this.mdat.largeSize=t>=2**32,this.boxWriter.patchBox(this.mdat),this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}let n=uy(this);if(this.fastStart===`reserve`){U(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);let e=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(ly(e))}else this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);if(this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}}e()}}})))()}var Jb,Yb,Xb,Zb,Qb,$b,ex,tx,nx,rx,ix,ax;function ox(){return(ox=t((()=>{a_(),vg(),Fv(),G_(),Sv(),Nv(),H_(),Jb=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},Yb=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),Xb=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1}_ensureValidAdd(){if(!this._connectedTrack)throw Error(`Source is not connected to an output track.`);if(this._connectedTrack.output.state===`canceled`)throw Error(`Output has been canceled.`);if(this._connectedTrack.output.state===`finalizing`||this._connectedTrack.output.state===`finalized`)throw Error(`Output has been finalized.`);if(this._connectedTrack.output.state===`pending`)throw Error(`Output has not started.`);if(this._closed)throw Error(`Source is closed.`)}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw Error(`Cannot call close without connecting the source to an output track.`);if(e.output.state===`pending`)throw Error(`Cannot call close before output has been started.`);this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,e.output.state!==`finalizing`&&e.output.state!==`finalized`&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},Zb=class extends Xb{constructor(e){if(super(),this._connectedTrack=null,!Ng.includes(e))throw TypeError(`Invalid video codec '${e}'. Must be one of: ${Ng.join(`, `)}.`);this._codec=e}},Qb=(e,t)=>{if(e.metadata.hasOnlyKeyPackets&&t.type!==`key`)throw Error(`Cannot add non-key packets to a hasOnlyKeyPackets video track.`)},$b=class{setError(e){this.errorSet||=(this.error=e,!0)}constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.emittedEncoderPackets=0,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new ng,this.customEncoderQueueSize=0,this.defaultEncodeOptions={},this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorSet=!1,this.lastMuxerPromise=Promise.resolve(),this.closed=!1}async add(e,t,n){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let i=this.encodingConfig,a=i.sizeChangeBehavior??`deny`,o=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(o=!0,a===`deny`))throw Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(i.transform?.width!==void 0||i.transform?.height!==void 0||i.transform?.rotate!==void 0||i.transform?.crop!==void 0||i.transform?.force===!0||o&&a!==`passThrough`){let n=i.transform?.width,r=i.transform?.height,s=i.transform?.fit??`fill`;o&&a!==`passThrough`&&(U(this.outputWidth),U(this.outputHeight),U(a!==`deny`),n=this.outputWidth,r=this.outputHeight,s=a);let c=await e.transform({width:n,height:r,roundDimensionsTo:2,crop:i.transform?.crop,rotate:i.transform?.rotate,fit:s,alpha:i.alpha});(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=c.displayWidth,this.outputHeight=c.displayHeight),t&&e.close(),e=c,t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let s=i.transform?.frameRate;if(s!==void 0){let i=e.timestamp+e.duration,a=Zh(e.timestamp,s);if(this.frameRateLastSample!==null){if(a<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=i;return}await this.padFrameRate(a,n)}e===r&&(e=e.clone(),t=!0),e.setTimestamp(a),e.setDuration(1/s),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=a,this.frameRateLastEndTimestamp=i}await this.processAndEncode(e,n)}finally{t&&e.close()}}async processAndEncode(e,t){let n=this.encodingConfig,r;if(n.transform?.process){let t=n.transform.process(e);if(t instanceof Promise&&(t=await t),t===null)return;Array.isArray(t)||(t=[t]);let i=[];try{for(let n of t)n instanceof av?i.push(n):typeof VideoFrame<`u`&&n instanceof VideoFrame?i.push(new av(n)):i.push(new av(n,{timestamp:e.timestamp,duration:e.duration}))}catch(n){for(let t of i)t!==e&&t.close();for(let n of t)(n instanceof av&&n!==e||typeof VideoFrame<`u`&&n instanceof VideoFrame)&&n.close();throw n}r=i}else r=[e];try{for(let e of r){if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),U(this.encoderInitialized),this.closed)break;let n=this.encodingConfig.keyFrameInterval??2,r=Math.floor(e.timestamp/n),i={...this.defaultEncodeOptions,...e.encodeOptions,...t},a={...i,keyFrame:i.keyFrame===void 0?n===0||r!==this.lastMultipleOfKeyFrameInterval:i.keyFrame};if(this.lastMultipleOfKeyFrameInterval=r,this.encodingConfig.onEncodedSample?.(e),this.customEncoder){this.customEncoderQueueSize++;let t=e.clone(),n=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(t,a)).catch(e=>this.setError(e)).finally(()=>{this.customEncoderQueueSize--,t.close()});this.customEncoderQueueSize>=4&&await n}else{U(this.encoder);let t=e.toVideoFrame(),n=Uh(this.preciseTimings,t.timestamp,e=>e.microsecondTimestamp),r=n===-1?null:this.preciseTimings[n];if(r&&r.microsecondTimestamp===t.timestamp?(r.timestamp!==e.timestamp&&(r.timestampIsValid=!1),r.duration!==e.duration&&(r.durationIsValid=!1)):(this.preciseTimings.splice(n+1,0,{microsecondTimestamp:t.timestamp,timestamp:e.timestamp,duration:e.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),!this.alphaEncoder)try{this.encoder.encode(t,a)}finally{t.close()}else if(t.format&&!t.format.includes(`A`)||this.splitterCreationFailed){this.alphaFrameQueue.push(null);try{this.encoder.encode(t,a)}finally{t.close()}}else{this.splitter||=new tx;let{colorFrame:e,alphaFrame:n}=await this.splitter.split(t);this.alphaFrameQueue.push(n);try{this.encoder.encode(e,a)}finally{e.close()}}this.encoder.encodeQueueSize>=4&&await new Promise(e=>this.encoder.addEventListener(`dequeue`,e,{once:!0}))}await this.lastMuxerPromise}}finally{for(let t of r)t!==e&&t.close()}}async padFrameRate(e,t){let n=this.encodingConfig.transform.frameRate;U(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*n);for(let e=1;e<r;e++){let r={stack:[],error:void 0,hasError:!1};try{let i=Jb(r,this.frameRateLastSample.clone(),!1);i.setTimestamp(this.frameRateLastTimestamp+e/n),i.setDuration(1/n),await this.processAndEncode(i,t)}catch(e){r.error=e,r.hasError=!0}finally{Yb(r)}}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=Mv(this.encodingConfig.quality,this.encodingConfig.bitrate);U(t!==void 0);let n=Tv({...this.encodingConfig,quality:t,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate}),r=null,i;for(let e of n){let t=e.config;if(this.encodingConfig.onEncoderConfig?.(t),i=Pv.find(e=>e.supports(this.encodingConfig.codec,t)),i){r=e;break}if(!(typeof VideoEncoder>`u`)){if(t.alpha=`discard`,this.encodingConfig.alpha===`keep`&&(t.latencyMode=`quality`),(t.width%2==1||t.height%2==1)&&(this.encodingConfig.codec===`avc`||this.encodingConfig.codec===`hevc`))throw Error(`The dimensions ${t.width}x${t.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);try{if((await VideoEncoder.isConfigSupported(t)).supported){r=e;break}}catch{}}}if(!r){if(typeof VideoEncoder>`u`)throw Error(`VideoEncoder is not supported by this browser.`);let e=n[0].config,t=n.map(({config:e,quantizer:t})=>t===null?`${e.bitrate} bps`:`quantizer ${t}`);throw Error(`This specific encoder configuration (${e.codec}, ${t.join(` / `)}, ${e.width}x${e.height}, hardware acceleration: ${e.hardwareAcceleration??`no-preference`}) is not supported by this browser. Consider using another codec or changing your video parameters.`)}let a=r.config;if(r.quantizer!==null&&(this.defaultEncodeOptions=jv(this.encodingConfig.codec,r.quantizer)),i)this.customEncoder=new i,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=a,this.customEncoder.onPacket=(e,t)=>{if(!(e instanceof W_))throw TypeError(`The first argument passed to onPacket must be an EncodedPacket.`);if(t!==void 0&&(!t||typeof t!=`object`))throw TypeError(`The second argument passed to onPacket must be an object or undefined.`);Qb(this.source._connectedTrack,e),this.encodingConfig.onEncodedPacket?.(e,t),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,e,t).catch(e=>{this.setError(e)})},this.customEncoder.onError=e=>{this.setError(e)},await this.customEncoder.init();else{let e=[],t=[],n=0,r=0,i=(e,t,n)=>{let r={};if(t){let e=new Uint8Array(t.byteLength);t.copyTo(e),r.alpha=e}let i=W_.fromEncodedChunk(e,r),a=Uh(this.preciseTimings,e.timestamp,e=>e.microsecondTimestamp),o=a===-1?null:this.preciseTimings[a],s=null;this.emittedEncoderPackets===0&&i.type===`delta`&&n?.decoderConfig&&(s=L_(this.encodingConfig.codec,n.decoderConfig,i.data)),(o&&o.microsecondTimestamp===e.timestamp||s!==null)&&(i=i.clone({timestamp:o?.timestampIsValid?o.timestamp:void 0,duration:o?.durationIsValid?o.duration:void 0,type:s??void 0})),Qb(this.source._connectedTrack,i),this.encodingConfig.onEncodedPacket?.(i,n),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,i,n).catch(e=>{this.setError(e)}),this.emittedEncoderPackets++},o=Error(`Encoding error`).stack;if(this.encoder=new VideoEncoder({output:(a,o)=>{if(!this.alphaEncoder){i(a,null,o);return}let s=this.alphaFrameQueue.shift();U(s!==void 0),s?(this.alphaEncoder.encode(s,{...this.defaultEncodeOptions,keyFrame:a.type===`key`}),r++,s.close(),e.push({chunk:a,meta:o})):r===0?i(a,null,o):(t.push(n+r),e.push({chunk:a,meta:o}))},error:e=>{e.stack=o,this.setError(e)}}),this.encoder.configure(a),this.encodingConfig.alpha===`keep`){let o=Error(`Encoding error`).stack;this.alphaEncoder=new VideoEncoder({output:(a,o)=>{r--;let s=e.shift();for(U(s!==void 0),i(s.chunk,a,s.meta),n++;t.length>0&&t[0]===n;){t.shift();let n=e.shift();U(n!==void 0),i(n.chunk,null,n.meta)}},error:e=>{e.stack=o,this.setError(e)}}),this.alphaEncoder.configure(a)}}U(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}async flushAndClose(e){try{if(!e&&(this.checkForEncoderError(),this.frameRateLastSample)){let e=this.encodingConfig.transform.frameRate,t=Zh(this.frameRateLastEndTimestamp,e);await this.padFrameRate(t)}this.closed=!0,e||(this.customEncoder?this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()):this.encoder&&(await this.encoder.flush(),await this.alphaEncoder?.flush(),await mg(25)))}finally{this.closed=!0,this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?await this.customEncoderCallSerializer.call(()=>this.customEncoder.close()).catch(e=>this.setError(e)):this.encoder&&(this.encoder.state!==`closed`&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!==`closed`&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.splitter?.close())}e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.errorSet)throw this.error}},ex=null,tx=class{constructor(){this.worker=null,this.pendingRequests=new Map,this.nextRequestId=0}split(e){if(!this.worker){if(!ex){let e=new Blob([`(${nx.toString()})()`],{type:`application/javascript`});ex=URL.createObjectURL(e)}this.worker=new Worker(ex),this.worker.addEventListener(`message`,e=>{let t=e.data,n=this.pendingRequests.get(t.id);n&&(this.pendingRequests.delete(t.id),`error`in t?n.reject(Error(t.error)):n.resolve({colorFrame:t.colorFrame,alphaFrame:t.alphaFrame}))}),this.worker.addEventListener(`error`,e=>{let t=Error(e.message||`Color/alpha splitter worker error.`);for(let e of this.pendingRequests.values())e.reject(t);this.pendingRequests.clear()})}let t=this.nextRequestId++,n=Wh();return this.pendingRequests.set(t,n),this.worker.postMessage({id:t,sourceFrame:e},{transfer:[e]}),n.promise}close(){this.worker?.terminate(),this.worker=null;let e=Error(`Color/alpha splitter closed.`);for(let t of this.pendingRequests.values())t.reject(e);this.pendingRequests.clear()}},nx=()=>{let e=null,t=Promise.resolve();self.addEventListener(`message`,e=>{let{id:r,sourceFrame:i}=e.data;t=t.then(async()=>{try{let{colorFrame:e,alphaFrame:t}=await n(i);self.postMessage({id:r,colorFrame:e,alphaFrame:t},{transfer:[e,t]})}catch(e){self.postMessage({id:r,error:e.message})}finally{i.close()}})});let n=async t=>{let n=t.format;if(!n)throw Error(`CPU color/alpha splitting requires a known VideoFrame format.`);let a=t.allocationSize();if((!e||e.byteLength!==a)&&(e=new Uint8Array(a)),await t.copyTo(e),n===`RGBA`||n===`BGRA`)return r(e,n,t);if(n===`I420A`||n===`I420AP10`||n===`I420AP12`||n===`I422A`||n===`I422AP10`||n===`I422AP12`||n===`I444A`||n===`I444AP10`||n===`I444AP12`)return i(e,n,t);throw Error(`CPU color/alpha splitting does not support format '${n}'.`)},r=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=r*i,o=a+Math.ceil(r/2)*Math.ceil(i/2)*2,s=new Uint8Array(o);for(let t=0,n=3;t<a;t++,n+=4)s[t]=e[n];s.fill(128,a);let c=new VideoFrame(e,{format:t===`RGBA`?`RGBX`:`BGRX`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),l={format:`I420`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[s.buffer]};return{colorFrame:c,alphaFrame:new VideoFrame(s,l)}},i=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=t.includes(`P10`),o=t.includes(`P12`),s=a||o?2:1,c,l;t.startsWith(`I420`)?(c=Math.ceil(r/2),l=Math.ceil(i/2)):t.startsWith(`I422`)?(c=Math.ceil(r/2),l=i):(c=r,l=i);let u=r*i,d=c*l,f=u*s,p=d*s,m=u*s,h=f+p*2,g=t.replace(`A`,``),_=Math.ceil(r/2)*Math.ceil(i/2),v=m+_*s*2,y=new Uint8Array(v),b=h;y.set(e.subarray(b,b+m),0);let x=m,S=a?512:o?2048:128;s===1?y.fill(S,x):new Uint16Array(y.buffer,x,2*_).fill(S);let C=a?`I420P10`:o?`I420P12`:`I420`,ee=new VideoFrame(e.subarray(0,h),{format:g,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),te={format:C,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[y.buffer]};return{colorFrame:ee,alphaFrame:new VideoFrame(y,te)}}},rx=class extends Zb{constructor(e,t){if(!(typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas))throw TypeError(`canvas must be an HTMLCanvasElement or OffscreenCanvas.`);Cv(t),super(t.codec),this._encoder=new $b(this,t),this._canvas=e}add(e,t=0,n){if(!Number.isFinite(e)||e<0)throw TypeError(`timestamp must be a non-negative number.`);if(!Number.isFinite(t)||t<0)throw TypeError(`duration must be a non-negative number.`);let r=new av(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,n)}_flushAndClose(e){return this._encoder.flushAndClose(e)}},ix=class extends Xb{constructor(e){if(super(),this._connectedTrack=null,!Ig.includes(e))throw TypeError(`Invalid audio codec '${e}'. Must be one of: ${Ig.join(`, `)}.`);this._codec=e}},ax=class extends Xb{constructor(e){if(super(),this._connectedTrack=null,!Lg.includes(e))throw TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${Lg.join(`, `)}.`);this._codec=e}}})))()}var sx,cx,lx,ux,dx;function fx(){return(fx=t((()=>{a_(),qb(),sx=class{getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>Ng.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>Ig.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>Lg.includes(e))}_codecUnsupportedHint(e){return``}_isFragmentedIsobmff(){return!1}},cx=class extends sx{constructor(e={}){if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.fastStart!==void 0&&![!1,`in-memory`,`reserve`,`fragmented`].includes(e.fastStart))throw TypeError(`options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.`);if(e.minimumFragmentDuration!==void 0&&(!Number.isFinite(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw TypeError(`options.minimumFragmentDuration, when provided, must be a non-negative number.`);if(e.onFtyp!==void 0&&typeof e.onFtyp!=`function`)throw TypeError(`options.onFtyp, when provided, must be a function.`);if(e.onMoov!==void 0&&typeof e.onMoov!=`function`)throw TypeError(`options.onMoov, when provided, must be a function.`);if(e.onMdat!==void 0&&typeof e.onMdat!=`function`)throw TypeError(`options.onMdat, when provided, must be a function.`);if(e.onMoof!==void 0&&typeof e.onMoof!=`function`)throw TypeError(`options.onMoof, when provided, must be a function.`);if(e.metadataFormat!==void 0&&![`mdir`,`mdta`,`udta`,`auto`].includes(e.metadataFormat))throw TypeError(`options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.`);super(),this._options=e}getSupportedTrackCounts(){let e=2**32-1;return{video:{min:0,max:e},audio:{min:0,max:e},subtitle:{min:0,max:e},total:{min:0,max:e}}}get supportsVideoRotationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}_createMuxer(e){return new Kb(e,this)}_isFragmentedIsobmff(){return this._options.fastStart===`fragmented`}},lx=class extends cx{constructor(e){super(e)}get _name(){return`MP4`}get fileExtension(){return`.mp4`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...Ng,...Fg,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...Lg]}_codecUnsupportedHint(e){return new dx().getSupportedCodecs().includes(e)?` Switching to MOV will grant support for this codec.`:``}},ux=class extends cx{constructor(e){super(e)}get _name(){return`CMAF`}get fileExtension(){return`.m4s`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...Ng,...Fg,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...Lg]}},dx=class extends cx{constructor(e){super(e)}get _name(){return`MOV`}get fileExtension(){return`.mov`}get mimeType(){return`video/quicktime`}getSupportedCodecs(){return[...Ng,...Ig]}_codecUnsupportedHint(e){return new lx().getSupportedCodecs().includes(e)?` Switching to MP4 will grant support for this codec.`:``}}})))()}var px,mx,hx,gx,_x,vx,yx,bx;function xx(){return(xx=t((()=>{vg(),Eg(),fx(),ox(),Hb(),Fb(),xg(),G_(),a_(),px=[`video`,`audio`,`subtitle`],mx=class e{constructor(e,t,n,r,i){this.id=e,this.output=t,this.type=n,this.source=r,this.metadata=i}isVideoTrack(){return this.type===`video`}isAudioTrack(){return this.type===`audio`}isSubtitleTrack(){return this.type===`subtitle`}canBePairedWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrack.`);if(this===t)return!1;let n=hg(this.metadata.group),r=hg(t.metadata.group);for(let e of n)if(this.type!==t.type&&r.some(t=>e===t)||r.some(t=>e._pairedGroups.has(t)))return!0;return!1}},hx=class extends mx{constructor(e,t,n,r){super(e,t,`video`,n,r)}},gx=class extends mx{constructor(e,t,n,r){super(e,t,`audio`,n,r)}},_x=class extends mx{constructor(e,t,n,r){super(e,t,`subtitle`,n,r)}},vx=class e{constructor(){this._pairedGroups=new Set}pairWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrackGroup.`);if(this===t)throw TypeError(`Cannot pair a group with itself.`);this._pairedGroups.add(t),t._pairedGroups.add(this)}},yx=e=>{if(!e||typeof e!=`object`)throw TypeError(`metadata must be an object.`);if(e.languageCode!==void 0&&!$h(e.languageCode))throw TypeError(`metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.`);if(e.name!==void 0&&typeof e.name!=`string`)throw TypeError(`metadata.name, when provided, must be a string.`);if(e.disposition!==void 0&&Tg(e.disposition),e.maximumPacketCount!==void 0&&(!Number.isInteger(e.maximumPacketCount)||e.maximumPacketCount<0))throw TypeError(`metadata.maximumPacketCount, when provided, must be a non-negative integer.`);if(e.group!==void 0&&!(e.group instanceof vx)&&(!Array.isArray(e.group)||e.group.some(e=>!(e instanceof vx))))throw TypeError(`metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.`)},bx=class extends gg{get target(){let e=`Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.`;if(this._rootTargetPromise)throw TypeError(e);let t=this._getRootTarget();if(t instanceof Promise)throw TypeError(e);return t}constructor(e){if(super(),this.state=`pending`,this.defaultTrackGroup=new vx,this.tracks=[],this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new Hh,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(!(e.format instanceof sx))throw TypeError(`options.format must be an OutputFormat.`);if(!(e.target instanceof Ib||e.target instanceof Vb))throw TypeError(`options.target must be a Target or a PathedTarget.`);if(e.target instanceof Ib&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof Ib)&&typeof e.initTarget!=`function`)throw Error(`options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof Ib&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){U(this._target instanceof Vb);let t=this._target.getTarget(e),n=e=>{if(!(e instanceof Ib))throw TypeError(`getTarget must return a Target.`);return e};return t instanceof Promise?t.then(n):n(t)}async _getTarget(e){U(this._target instanceof Vb);let t=await this._getTargetValidated(e);return this._emit(`target`,{target:t,request:e,isRoot:e.isRoot}),this.state===`canceled`?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on(`finalized`,()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(U(this._initTarget!==null),this._initTarget instanceof Ib)return this._initTarget;let e=await this._initTarget();return this.state===`canceled`?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof Ib)return this._emit(`target`,{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),n=t=>(this.state===`canceled`?t._close():this._rememberTarget(t),this._emit(`target`,{target:t,request:e,isRoot:!0}),this._rootTarget=t,t);return t instanceof Promise?this._rootTargetPromise=t.then(n):n(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),n=new Pb(t,typeof e==`boolean`?e:e(t));return n.start(),n})()}addVideoTrack(e,t={}){if(!(e instanceof Zb))throw TypeError(`source must be a VideoSource.`);if(yx(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(!this.format.supportsVideoRotationMetadata&&t.rotation)throw Error(`${this.format._name} does not support video rotation metadata.`);if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);if(t.decoderConfig!==void 0&&t_({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof W_))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new hx(this.tracks.length+1,this,e,n))}addAudioTrack(e,t={}){if(!(e instanceof ix))throw TypeError(`source must be an AudioSource.`);if(yx(t),t.decoderConfig!==void 0&&r_({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof W_))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new gx(this.tracks.length+1,this,e,n))}addSubtitleTrack(e,t={}){if(!(e instanceof ax))throw TypeError(`source must be a SubtitleSource.`);yx(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new _x(this.tracks.length+1,this,e,n))}setMetadataTags(e){if(wg(e),this.state!==`pending`)throw Error(`Cannot set metadata tags after output has been started or canceled.`);this._metadataTags=e}_addTrack(e){if(this.state!==`pending`)throw Error(`Cannot add track after output has been started or canceled.`);if(e.source._connectedTrack)throw Error(`Source is already used for a track.`);let t=this.format.getSupportedTrackCounts(),n=this.tracks.reduce((t,n)=>t+ +(n.type===e.type),0),r=t[e.type].max;if(n===r)throw Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?``:`s`}.`);let i=t.total.max;if(this.tracks.length===i)throw Error(`${this.format._name} does not support more than ${i} tracks${i===1?``:`s`} in total.`);if(e.isVideoTrack()){let t=this.format.getSupportedVideoCodecs();if(t.length===0)throw Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let t=this.format.getSupportedAudioCodecs();if(t.length===0)throw Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let t=this.format.getSupportedSubtitleCodecs();if(t.length===0)throw Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}return this.tracks.push(e),e.source._connectedTrack=e,e}hasEnoughTracks(){let e=this.format.getSupportedTrackCounts();for(let t of px)if(this.tracks.reduce((e,n)=>e+ +(n.type===t),0)<e[t].min)return!1;let t=e.total.min;return!(this.tracks.length<t)}async start(){let e=this.format.getSupportedTrackCounts();for(let t of px){let n=this.tracks.reduce((e,n)=>e+ +(n.type===t),0),r=e[t].min;if(n<r)throw Error(r===e[t].max?`${this.format._name} requires exactly ${r} ${t} track${r===1?``:`s`}.`:`${this.format._name} requires at least ${r} ${t} track${r===1?``:`s`}.`)}let t=e.total.min;if(this.tracks.length<t)throw Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?``:`s`}.`:`${this.format._name} requires at least ${t} track${t===1?``:`s`}.`);if(this.state===`canceled`)throw Error(`Output has been canceled.`);return this._startPromise?(bg._warn(`Output has already been started.`),this._startPromise):this._startPromise=(async()=>{this.state=`started`;let e=this._mutex.acquire();try{await this._muxer.start();let e=this.tracks.map(e=>e.source._start());await Promise.all(e)}finally{(await e)()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this._cancelPromise)return bg._warn(`Output has already been canceled.`),this._cancelPromise;if(this.state===`finalizing`||this.state===`finalized`){this.state===`finalized`&&bg._warn(`Output has already been finalized.`);return}return this._cancelPromise=(async()=>{this.state=`canceled`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!0));await Promise.all(e),await Promise.all([...this._unfinalizedTargets].map(e=>e._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state===`pending`)throw Error(`Cannot finalize before starting.`);if(this.state===`canceled`)throw Error(`Cannot finalize after canceling.`);return this._finalizePromise?(bg._warn(`Output has already been finalized.`),this._finalizePromise):this._finalizePromise=(async()=>{this.state=`finalizing`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(e),await this._muxer.finalize(),this._rootWriterPromise){let e=await this._rootWriterPromise;e.finalized||(await e.flush(),await e.finalize())}this._onFinalize&&await this._onFinalize(),this.state=`finalized`}finally{await Promise.all([...this._unfinalizedTargets].map(e=>e._close().catch(()=>{}))),this._unfinalizedTargets.clear(),e()}})()}}})))()}var Sx;function Cx(){return(Cx=t((()=>{xx(),Hb(),fx(),ox(),Sx=class{_engine;constructor(e){this._engine=e}async export(e,t){let{fps:n,duration:r,resolution:i,bitrate:a=8e6}=e,o=Math.ceil(r/60*n),s=this._engine.canvas,c=this._engine.renderer.resolution.clone();this._engine.setSize(i);let l=this._engine.createView(),u=new zb,d=new bx({format:new lx,target:u}),f=new rx(s,{codec:`avc`,bitrate:a,keyFrameInterval:2});d.addVideoTrack(f);try{await d.start();for(let e=0;e<o;e++)this._engine.updateOffline(e,n),this._engine.render(l),await f.add(e/n,1/n),t&&t({current:e+1,total:o,phase:`encoding`}),e%10==0&&await new Promise(e=>setTimeout(e,0));t&&t({current:o,total:o,phase:`finalizing`}),await d.finalize()}finally{l.dispose(),this._engine.setSize(c)}return t&&t({current:o,total:o,phase:`done`}),new Blob([u.buffer],{type:`video/mp4`})}static download(e,t=`scene.mp4`){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}}})))()}var wx,Tx;function Ex(){return(Ex=t((()=>{M(),wx=[1,.6,0],Tx=class{_draw;_maskTarget;_maskMaterial;_outline;constructor(e){this._draw=e,this._maskTarget=e.createTarget(),this._maskMaterial=e.materials.mask(),this._outline=e.recipes.outline(this._maskTarget,wx)}render(e,t,n){!t||!n||t.getComponent(A)&&(this._draw.renderEntities({view:e,camera:n,entities:[t],target:this._maskTarget,useSceneDepth:!0,materialOverride:this._maskMaterial,depthCompare:`lequal`}),this._draw.renderFullscreen(e,this._outline,null))}}})))()}var Dx,Ox,kx;function Ax(){return(Ax=t((()=>{O(),M(),om(),xh(),Dx=12,Ox=12,kx=class{_raycaster;_pointerDownPos;_gizmoDragging;_gizmoDragStartValue;_hoveredTarget;_lastClickNDC;_lastClickCandidateUUIDs;_lastClickCycleIndex;_disposeListeners;constructor(e){let{engine:t,editorCamera:n,gizmoManager:r,helperManager:i,api:a,getSelectedEntityId:o,isEntitySelectable:s,isGizmoVisible:c,getHelperVisibility:l,getGizmoMode:u,onSelectEntity:d,isModalActive:f,onEscapeToEditorCamera:p}=e;this._raycaster=new on,this._pointerDownPos=null,this._gizmoDragging=!1,this._gizmoDragStartValue=null,this._hoveredTarget=null,this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1;let m=e.canvas,h=()=>n.getCameraEntity(t),g=(e,t)=>{let n=t.getComponentsByTag(`camera`)[0];if(!n)return null;let r=new E(e.x,e.y,e.z,1);return r.applyMatrix4(n.viewMatrix).applyMatrix4(n.projectionMatrix),r.w<=0?null:new E(r.x/r.w,r.y/r.w)},_=new on,v=e=>{let n=this._raycaster.ray.origin,r=e.x-n.x,i=e.y-n.y,a=e.z-n.z,o=Math.sqrt(r*r+i*i+a*a);if(o<1e-4)return!1;_.ray.origin.copy(n),_.ray.direction.set(r/o,i/o,a/o);let s=_.intersectEntities(t.root);for(let e of s)if(e.entity.initiator!==`god`)return e.distance<o-.001;return!1},y=new on,b=new E,x=(e,t)=>{for(let[n,r]of[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])if(b.set(n,r),y.setFromCamera(b,t),y.intersectEntities(e).length===0)return!1;return!0},S=(e,t,n,r)=>{for(let i of e.getWorldSegments()){let e=g(i.a,n),a=g(i.b,n);if(!e||!a)continue;let o=(e.x-t.x)*r.width*.5,s=(e.y-t.y)*r.height*.5,c=(a.x-t.x)*r.width*.5,l=(a.y-t.y)*r.height*.5,u=c-o,d=l-s,f=u*u+d*d,p=f>0?Math.max(0,Math.min(1,-(o*u+s*d)/f)):0,m=o+u*p,h=s+d*p;if(Math.sqrt(m*m+h*h)<=Ox)return!0}return!1},C=e=>{let r=h();if(!r)return[];this._raycaster.setFromCamera(e,r);let a=[];for(let e of this._raycaster.intersectEntities(t.root))e.entity.initiator!==`god`&&s(e.entity)&&a.push({entity:e.entity,distance:e.distance,type:`mesh`});let o=a.length>0?a[0].distance:1/0,c=[],u=[],d=new Set,f=i.getHelpers(),p=l(),_=vh(m);for(let n of f){if(!i.isVisible(n,p))continue;let a=t.root.findEntityByUUID(n.targetEntityUUID);if(!a||!s(a))continue;if(n.type===`empty`){if(!S(n,e,r,_))continue;d.add(n.targetEntityUUID);let t=n.entity.matrixWorld.elm,i=t[12]-this._raycaster.ray.origin.x,s=t[13]-this._raycaster.ray.origin.y,l=t[14]-this._raycaster.ray.origin.z,f=Math.sqrt(i*i+s*s+l*l),p={entity:a,distance:f,type:`helper`};f<=o?c.push(p):u.push(p);continue}let l=this._raycaster.intersectEntities(n.hitAreaEntity);if(l.length===0)continue;d.add(n.targetEntityUUID);let f={entity:a,distance:l[0].distance,type:`helper`};if(x(n.hitAreaEntity,r)){S(n,e,r,_)&&c.push(f);continue}l[0].distance<=o?c.push(f):u.push(f)}n.view===`camera`&&Math.min((1-Math.abs(e.x))*_.width*.5,(1-Math.abs(e.y))*_.height*.5)<=Ox&&s(r)&&c.push({entity:r,distance:0,type:`helper`}),c.sort((e,t)=>e.distance-t.distance),u.sort((e,t)=>e.distance-t.distance);let y=[];for(let{targetEntityUUID:n}of f){if(d.has(n))continue;let i=t.root.findEntityByUUID(n);if(!i||!s(i))continue;let a=i.matrixWorld.elm,o=new E(a[12],a[13],a[14]),c=g(o,r);if(!c)continue;let l=(c.x-e.x)*_.width*.5,u=(c.y-e.y)*_.height*.5,f=Math.sqrt(l*l+u*u);if(f>Dx||v(o))continue;let p=o.x-this._raycaster.ray.origin.x,m=o.y-this._raycaster.ray.origin.y,h=o.z-this._raycaster.ray.origin.z;y.push({candidate:{entity:i,distance:Math.sqrt(p*p+m*m+h*h),type:`helper`},screenDistance:f})}return y.sort((e,t)=>e.screenDistance-t.screenDistance),[...c,...y.map(e=>e.candidate),...a,...u]},ee=()=>{let e=r.activeGizmo;if(!e||!e.entity.visible||!c())return null;let t=null;for(let{handle:n,entity:r}of e.getHandleEntities()){let e=this._raycaster.intersectEntities(r);e.length>0&&(!t||e[0].distance<t.distance)&&(t={handle:n,distance:e[0].distance})}return t},te=e=>{if(!f()&&(e.pointerType!==`mouse`||e.button===0)){if(n.preview){e.target.setPointerCapture(e.pointerId),this._pointerDownPos=new E(e.clientX,e.clientY);return}if(!(e.pointerType===`touch`&&this._gizmoDragging)&&(e.target.setPointerCapture(e.pointerId),this._pointerDownPos=new E(e.clientX,e.clientY),r.activeGizmo&&r.activeGizmo.entity.visible&&c())){let i=yh(m,e.clientX,e.clientY),a=h();if(a){this._raycaster.setFromCamera(i,a);let e=ee();if(e){let i=o(),a=i?t.root.findEntityByUUID(i):null;a&&(this._gizmoDragging=!0,n.orbitControls.enabled=!1,m.style.cursor=`grabbing`,this._gizmoDragStartValue={position:a.position.getElm(`vec3`),euler:a.euler.getElm(`vec3`),scale:a.scale.getElm(`vec3`)},r.activeGizmo.startDrag(e.handle,this._raycaster.ray,a))}}}}},w=e=>{if(f())return;if((n.preview||n.view===`camera`)&&this._pointerDownPos&&!this._gizmoDragging){let t=e.clientX-this._pointerDownPos.x,n=e.clientY-this._pointerDownPos.y;Math.sqrt(t*t+n*n)>5&&p()}if(n.preview){m.style.cursor=``;return}let i=yh(m,e.clientX,e.clientY),a=h();if(!a)return;if(this._raycaster.setFromCamera(i,a),this._gizmoDragging){let e=o(),n=e?t.root.findEntityByUUID(e):null;if(!n)return;let i=r.activeGizmo.updateDrag(this._raycaster.ray,n);if(i){if(i.position){let e=i.position.clone();n.parent&&e.applyMatrix4AsPosition(n.parent.matrixWorld.clone().inverse()),n.position.copy(e)}i.euler&&n.euler.set(i.euler.x,i.euler.y,i.euler.z),i.scale&&n.scale.set(i.scale.x,i.scale.y,i.scale.z),n.updateMatrix(!0)}return}let s=null;if(r.activeGizmo&&r.activeGizmo.entity.visible&&c()){let e=ee();e&&(s=`gizmo`),r.activeGizmo.setHover(e?e.handle:null)}if(!s){let e=C(i);e.length>0&&(s=e[0].type)}s!==this._hoveredTarget&&(this._hoveredTarget=s,s===`gizmo`?m.style.cursor=`grab`:s===`helper`||s===`mesh`?m.style.cursor=`pointer`:m.style.cursor=``)},ne=e=>{if(f())return;if(n.preview){this._pointerDownPos=null;return}if(this._gizmoDragging){r.activeGizmo.endDrag(),this._gizmoDragging=!1,n.orbitControls.enabled=n.usingEditorCamera,m.style.cursor=this._hoveredTarget===`gizmo`?`grab`:``;let e=o(),i=e?t.root.findEntityByUUID(e):null;if(i&&this._gizmoDragStartValue){let e=u(),t=e===`translate`?`position`:e===`rotate`?`euler`:`scale`,n=this._gizmoDragStartValue[t],r=i[t].getElm(`vec3`);a.commandManager.execute(new am(i,t,n,r))}this._gizmoDragStartValue=null,this._pointerDownPos=null;return}if(!this._pointerDownPos)return;let i=e.clientX-this._pointerDownPos.x,s=e.clientY-this._pointerDownPos.y,c=Math.sqrt(i*i+s*s);if(this._pointerDownPos=null,c>5)return;let l=yh(m,e.clientX,e.clientY);if(!h())return;let p=C(l);if(p.length===0){this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1,d(null);return}let g=.02,_=this._lastClickNDC&&Math.abs(l.x-this._lastClickNDC.x)<g&&Math.abs(l.y-this._lastClickNDC.y)<g,v=p.map(e=>e.entity.uuid),y=_&&v.length===this._lastClickCandidateUUIDs.length&&v.every((e,t)=>e===this._lastClickCandidateUUIDs[t]),b=0;y&&p.length>1&&(b=(this._lastClickCycleIndex+1)%p.length),this._lastClickNDC=new E(l.x,l.y),this._lastClickCandidateUUIDs=v,this._lastClickCycleIndex=b,d(p[b].entity)},re=e=>{e.preventDefault()};m.addEventListener(`pointerdown`,te),m.addEventListener(`pointermove`,w),m.addEventListener(`pointerup`,ne),m.addEventListener(`contextmenu`,re),this._disposeListeners=()=>{m.removeEventListener(`pointerdown`,te),m.removeEventListener(`pointermove`,w),m.removeEventListener(`pointerup`,ne),m.removeEventListener(`contextmenu`,re)}}get gizmoDragging(){return this._gizmoDragging}dispose(){this._disposeListeners()}}})))()}var jx;function Mx(){return(Mx=t((()=>{Kf(),Jf(),Ax(),jx=class{id;canvas;view;editorCamera;frameDebugger;_pointerHandler;_onDispose;_disposeListeners;_disposed;constructor(e){let{engine:t,canvas:n}=e;this.id=e.id,this.canvas=n,this.view=t.createView({offscreen:!0}),this.editorCamera=new Gf(t,this.view,n),this.frameDebugger=new qf(n,e.draw,this.view),this._pointerHandler=new kx({engine:t,canvas:n,editorCamera:this.editorCamera,gizmoManager:e.gizmoManager,helperManager:e.helperManager,api:e.api,getSelectedEntityId:e.getSelectedEntityId,isEntitySelectable:e.isEntitySelectable,isGizmoVisible:e.isGizmoVisible,getHelperVisibility:e.getHelperVisibility,getGizmoMode:()=>e.gizmoManager.mode,onSelectEntity:e.onSelectEntity,isModalActive:e.isModalActive,onEscapeToEditorCamera:e.onEscapeToEditorCamera});let r=()=>e.onActivate();n.addEventListener(`pointerenter`,r),this._onDispose=e.onDispose,this._disposeListeners=()=>n.removeEventListener(`pointerenter`,r),this._disposed=!1}get gizmoDragging(){return this._pointerHandler.gizmoDragging}resize(e){this.view.size=e.clone(),this.canvas.width=e.x,this.canvas.height=e.y,this.editorCamera.resize(e),this.frameDebugger.resize(e)}dispose(){this._disposed||(this._disposed=!0,this._onDispose(),this._disposeListeners(),this._pointerHandler.dispose(),this.frameDebugger.dispose(),this.editorCamera.dispose(),this.view.dispose())}}})))()}var Nx;function Px(){return(Px=t((()=>{M(),Nx=class{_draw;_wireframeMaterial;_wireframeGeometryCache;constructor(e){this._draw=e,this._wireframeGeometryCache=new Map,this._wireframeMaterial=e.materials.flat({color:[.3,.8,.3],lines:!0,depthWrite:!1})}render(e,t,n){if(!t)return;let r=this._collectMeshEntities(n.root),i=new Map;for(let e of r){let t=e.getComponent(A);if(!t)continue;i.set(e,t.geometry);let n=this._wireframeGeometryCache.get(t.geometry);n||(n=this._createWireframeGeometry(t.geometry),this._wireframeGeometryCache.set(t.geometry,n)),t.geometry=n}this._draw.renderEntities({view:e,camera:t,entities:r,target:null,materialOverride:this._wireframeMaterial});for(let e of r){let t=e.getComponent(A);if(!t)continue;let n=i.get(e);n&&(t.geometry=n)}}_collectMeshEntities(e){let t=[],n=(e,r)=>{let i=r&&e.visible;i&&e.getComponent(A)&&t.push(e);for(let t=0;t<e.children.length;t++)n(e.children[t],i)};return n(e,!0),t}_createWireframeGeometry(e){let t=new Et,n=e.getAttribute(`position`),r=e.getAttribute(`index`);if(!n)return t;t.setAttribute(`position`,n.array,3);let i=e.getAttribute(`normal`);if(i&&t.setAttribute(`normal`,i.array,3),r){let e=r.array,n=new Set,i=[];for(let t=0;t<e.length;t+=3){let r=e[t],a=e[t+1],o=e[t+2],s=[[Math.min(r,a),Math.max(r,a)],[Math.min(a,o),Math.max(a,o)],[Math.min(o,r),Math.max(o,r)]];for(let[e,t]of s){let r=`${e}_${t}`;n.has(r)||(n.add(r),i.push(e,t))}}t.setAttribute(`index`,new Uint16Array(i),1)}return t}}})))()}var Fx,Ix,Lx;function Rx(){return(Rx=t((()=>{jp(),O(),M(),Pp(),Rp(),cm(),qm(),Ym(),ph(),_h(),kh(),Cx(),Ex(),Mx(),Px(),Fx={show:!0,empty:!0,camera:!0,light:!0,grid:!0,wireframe:!1,gizmo:!0,outline:!0},Ix=[`cameraView`,`preview`,`resolutionScale`,...Object.keys(Fx).map(e=>`helpers/${e}`),`camera/position`,`camera/target`],Lx=class extends St{_engine;_selectedEntityId;_unselectableEntityIds;_selectedAsset;_navigateAsset;_propertyTarget;_audioBuffer;_frameLoop;_enableRender;_baseResolution;_viewType;_assetPreviewManager;_externalWindow;_modalStatus;_panelLayout;_disposed;_api;_draw;_viewports;_activeViewport;_viewportSettings;_gizmoManager;_helperManager;_gridRenderer;_constraintAxisRenderer;_wireframeRenderer;_selectionOutline;_keyboardHandler;_modalTransformHandler;_sceneExporter;_isExporting;_exportProgress;constructor(e){super(),this._engine=e,this._viewType=`render`,this._selectedEntityId=null,this._unselectableEntityIds=new Set,this._selectedAsset=null,this._navigateAsset=null,this._propertyTarget=`entity`,this._enableRender=!0,this._baseResolution=new E(1920,1080),this._externalWindow=null,this._modalStatus=null,this._panelLayout=null,this._disposed=!1,this._api=new sm(this),this._draw=xp(e),this._viewports=[],this._activeViewport=null,this._viewportSettings=new Map,this._assetPreviewManager=new Np(this._draw),this._sceneExporter=new Sx(e),this._isExporting=!1,this._exportProgress=null,this._gizmoManager=new Km(e,this._draw),this._helperManager=new fh(e,this._draw),this._gridRenderer=new Jm(e,this._draw),this._constraintAxisRenderer=new Lp(e,this._draw),this._wireframeRenderer=new Nx(this._draw),this._selectionOutline=new Tx(this._draw),this._modalTransformHandler=new Oh({engine:e,getViewport:()=>this._activeViewport,api:this._api,getSelectedEntity:()=>this._selectedEntityId?e.root.findEntityByUUID(this._selectedEntityId)??null:null,isPointerBusy:()=>this._viewports.some(e=>e.gizmoDragging),onStatusChange:e=>{this._modalStatus!==e&&(this._modalStatus=e,this.noticeField(`modalStatus`))}}),this._keyboardHandler=new gh({onSave:()=>this.save(),onUndo:()=>this._api.undo(),onRedo:()=>this._api.redo(),onPlayToggle:()=>this.togglePlay(),onCameraViewToggle:()=>this.toggleCameraView(),onPreviewToggle:()=>{let e=this._activeViewport;e&&this.setField(`viewports/${e.id}/preview`,!e.editorCamera.preview)},onSyncToSceneCamera:()=>this.syncToSceneCamera(),onFocusSelected:()=>this.focusSelected(),onAlignView:(e,t)=>this.alignEditorView(e,t),onProjectionToggle:()=>this.toggleEditorProjection(),onAddEntity:()=>this.emit(`request/addEntity`),onDeleteSelected:()=>this.deleteSelected(),onDuplicateSelected:()=>this.duplicateSelected(),onRenameSelected:()=>this.requestRenameSelected(),onStepFrame:e=>this.stepFrame(e),onSeekToStart:()=>this.seekToStart(),onTransformKey:e=>!this._activeViewport?.editorCamera.preview&&this._modalTransformHandler.handleKeyDown(e)}),this._audioBuffer=null,this._engine.on(`update/music`,e=>{this._audioBuffer=e}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on(`loaded`,()=>{this._selectedEntityId&&(this._engine.root.findEntityByUUID(this._selectedEntityId)||this.selectEntity(null))}),this._engine.on(`update/blidge/frame`,e=>{this._engine.seek(e.current),e.playing&&!this._engine.frame.playing?this._engine.play():!e.playing&&this._engine.frame.playing&&this._engine.stop()}),this.field(`enableRender`,()=>this._enableRender,e=>this._enableRender=e);let t=this.fieldDir(`resolution`);t.field(`width`,()=>this._baseResolution.x,e=>{this._baseResolution.x=e,this._resize()},{step:1}),t.field(`height`,()=>this._baseResolution.y,e=>{this._baseResolution.y=e,this._resize()},{step:1}),this.field(`viewType`,()=>this._viewType,e=>{this._viewType=e;for(let e of this._viewports)e.frameDebugger.enable=this._viewType===`debug`});let n=this.fieldDir(`frameLoop`);n.field(`enabled`,()=>this._frameLoop.enabled,e=>this._frameLoop.enabled=e),n.field(`start`,()=>this._frameLoop.start,e=>this._frameLoop.start=e),n.field(`end`,()=>this._frameLoop.end,e=>this._frameLoop.end=e),this.field(`selectedEntityId`,()=>this._selectedEntityId,e=>{this._selectedEntityId=e,e&&(this._propertyTarget=`entity`,this.noticeField(`propertyTarget`))}),this.field(`unselectableEntityIds`,()=>Array.from(this._unselectableEntityIds),e=>{this._unselectableEntityIds=new Set(e)},{hidden:!0}),this.field(`selectedAsset`,()=>this._selectedAsset,e=>{this._selectedAsset=e,e&&(this._propertyTarget=`asset`,this.noticeField(`propertyTarget`))}),this.field(`navigateAsset`,()=>this._navigateAsset,e=>{this._navigateAsset=e}),this.field(`propertyTarget`,()=>this._propertyTarget,e=>{this._propertyTarget=e}),this.field(`gizmoMode`,()=>this._gizmoManager.mode,e=>{this._gizmoManager.setMode(e)}),this.field(`transformOrientation`,()=>this._gizmoManager.orientation,e=>{this._gizmoManager.setOrientation(e)}),this.field(`modalStatus`,()=>this._modalStatus,{noExport:!0}),this.field(`panelLayout`,()=>this._panelLayout,e=>this._panelLayout=e,{hidden:!0}),this._animate()}bootstrap(e){e&&this.deserialize(e),this._resize()}deserialize(e){for(let t of Object.keys(e)){let e=t.match(/^viewports\/([^/]+)\//);e&&this._registerViewportFields(e[1])}super.deserialize(e)}get engine(){return this._engine}get api(){return this._api}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}get viewports(){return this._viewports}get activeViewport(){return this._activeViewport}get assetPreviewManager(){return this._assetPreviewManager}get draw(){return this._draw}createViewport(e,t){this._registerViewportFields(e);let n=this._viewportSettings.get(e),r=this._engine,i=new jx({id:e,engine:r,draw:this._draw,canvas:t,gizmoManager:this._gizmoManager,helperManager:this._helperManager,api:this._api,getSelectedEntityId:()=>this._selectedEntityId,isEntitySelectable:e=>!this._unselectableEntityIds.has(e.uuid),isGizmoVisible:()=>n.helpers.gizmo,getHelperVisibility:()=>n.helpers,onSelectEntity:e=>this.selectEntity(e),isModalActive:()=>this._modalTransformHandler.active,onEscapeToEditorCamera:()=>this._escapeToEditorCamera(i),onActivate:()=>{this._activeViewport=i},onDispose:()=>{let e=i.editorCamera,t=e.orbitControls;n.cameraView=e.view,n.preview=e.preview,n.cameraPosition=[t.eye.x,t.eye.y,t.eye.z],n.cameraTarget=[t.target.x,t.target.y,t.target.z],this._viewports.splice(this._viewports.indexOf(i),1),this._activeViewport===i&&(this._activeViewport=this._viewports[0]??null)}});i.editorCamera.setView(n.cameraView,r),i.editorCamera.setPreview(n.preview,r),(n.cameraPosition||n.cameraTarget)&&this._setOrbit(i,n.cameraPosition,n.cameraTarget),i.frameDebugger.enable=this._viewType===`debug`,i.resize(this._viewportResolution(n)),this._viewports.push(i),this._activeViewport||=i;for(let t of Ix)this.noticeField(`viewports/${e}/${t}`);return i}pruneViewportSettings(e){for(let t of this._viewportSettings.keys())if(!(e.has(t)||this._viewports.some(e=>e.id===t))){this._viewportSettings.delete(t);for(let e of[``,`helpers/`,`camera/`,...Ix])this.removeField(`viewports/${t}/${e}`)}}_registerViewportFields(e){if(this._viewportSettings.has(e))return;let t={cameraView:`editor`,preview:!1,resolutionScale:1,helpers:{...Fx},cameraPosition:null,cameraTarget:null};this._viewportSettings.set(e,t);let n=()=>this._viewports.find(t=>t.id===e)??null,r=this._engine,i=this.fieldDir(`viewports/${e}`);i.field(`cameraView`,()=>n()?.editorCamera.view??t.cameraView,e=>{let i=n();i?i.editorCamera.setView(e,r):t.cameraView=e}),i.field(`preview`,()=>n()?.editorCamera.preview??t.preview,e=>{let i=n();i?i.editorCamera.setPreview(e,r):t.preview=e}),i.field(`resolutionScale`,()=>t.resolutionScale,e=>{t.resolutionScale=Number(e),this._resize()});let a=i.dir(`helpers`);for(let e of Object.keys(Fx))a.field(e,()=>t.helpers[e],n=>{t.helpers[e]=n});let o=i.dir(`camera`);o.field(`position`,()=>{let e=n();if(!e)return t.cameraPosition;let r=e.editorCamera.orbitControls.eye;return[r.x,r.y,r.z]},e=>{let r=n();r?this._setOrbit(r,e,null):t.cameraPosition=e}),o.field(`target`,()=>{let e=n();if(!e)return t.cameraTarget;let r=e.editorCamera.orbitControls.target;return[r.x,r.y,r.z]},e=>{let r=n();r?this._setOrbit(r,null,e):t.cameraTarget=e})}_setOrbit(e,t,n){let r=e.editorCamera.orbitControls;r.setPosition(t?new E(t[0],t[1],t[2]):r.eye.clone(),n?new E(n[0],n[1],n[2]):r.target.clone())}_escapeToEditorCamera(e){e.editorCamera.preview&&this.setField(`viewports/${e.id}/preview`,!1),this.setField(`viewports/${e.id}/cameraView`,`editor`)}_animate(){if(!this._disposed){if(!this._isExporting){for(let e of this._viewports)e.editorCamera.updateBeforeRender(this._engine);this._engine.update(),this._helperManager.sync(this._engine,this._selectedEntityId);let e=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null;for(let t of this._viewports)this._enableRender&&this._engine.render(t.view),this._renderOverlay(t,e),this._draw.drawToCanvas(t.view,t.canvas);let t=this._externalWindow;t&&(this._enableRender&&this._engine.render(t.view),this._draw.drawToCanvas(t.view,t.canvas)),this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start))}window.requestAnimationFrame(this._animate.bind(this))}}_renderOverlay(e,t){let n=e.editorCamera.getCameraEntity(this._engine),r=e.editorCamera.preview,i=e.view,a=this._viewportSettings.get(e.id).helpers;r||(a.grid&&this._gridRenderer.render(i,n,this._engine),this._helperManager.render(i,n,a),a.wireframe&&this._wireframeRenderer.render(i,n,this._engine));let o=r||!a.gizmo||this._modalTransformHandler.active;this._gizmoManager.render(i,o?null:t,n,this._engine),r||(this._constraintAxisRenderer.render(i,this._modalTransformHandler.constraintDisplay,n,this._engine),a.outline&&this._selectionOutline.render(i,t,n)),e.frameDebugger.enable&&e.frameDebugger.draw()}get isExporting(){return this._isExporting}get exportProgress(){return this._exportProgress}async exportMP4(){if(this._isExporting)return;this._isExporting=!0,this._exportProgress=null,this.emit(`update/export`);let e=this._engine.frame.playing;this._engine.stop();try{let e=await this._sceneExporter.export({fps:this._engine.frameSetting.fps,duration:this._engine.frameSetting.duration,resolution:this._baseResolution.clone()},e=>{this._exportProgress=e,this.emit(`update/export`)});Sx.download(e)}catch(e){console.error(`Export failed:`,e)}this._isExporting=!1,this._exportProgress=null,this.emit(`update/export`),e&&this._engine.play()}selectEntity(e){this.setField(`selectedEntityId`,e?e.uuid:null)}togglePlay(){this._engine.frame.playing?this._engine.stop():this._engine.play(),this._engine.emit(`update/frame/play`,[this._engine.frame])}syncToSceneCamera(){let e=this._activeViewport;e&&(this._escapeToEditorCamera(e),e.editorCamera.syncFromSceneCamera(this._engine))}toggleCameraView(){let e=this._activeViewport;e&&(e.editorCamera.preview?this._escapeToEditorCamera(e):this.setField(`viewports/${e.id}/cameraView`,e.editorCamera.view===`editor`?`camera`:`editor`))}focusSelected(){let e=this._activeViewport;if(!e||e.editorCamera.preview)return;let t=this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null;t&&(this.setField(`viewports/${e.id}/cameraView`,`editor`),e.editorCamera.focus(t))}alignEditorView(e,t){let n=this._activeViewport;!n||n.editorCamera.preview||(this.setField(`viewports/${n.id}/cameraView`,`editor`),n.editorCamera.alignView(e,t))}toggleEditorProjection(){let e=this._activeViewport;!e||e.editorCamera.preview||(this.setField(`viewports/${e.id}/cameraView`,`editor`),e.editorCamera.toggleProjection())}_getEditableSelectedEntity(){if(!this._selectedEntityId)return null;let e=this._engine.root.findEntityByUUID(this._selectedEntityId);return!e||e.initiator!==`user`||!e.parent?null:e}deleteSelected(){let e=this._getEditableSelectedEntity();e&&(this._api.deleteEntity(e),this.selectEntity(null))}duplicateSelected(){let e=this._getEditableSelectedEntity();if(!e)return;let t=this._api.duplicateEntity(e);this.selectEntity(t),!this._activeViewport?.editorCamera.preview&&this._modalTransformHandler.start(`translate`)}requestRenameSelected(){let e=this._getEditableSelectedEntity();e&&this.emit(`request/renameEntity`,[e])}stepFrame(e){let t=this._engine.frameSetting.fps;if(t<=0)return;let n=Math.round(this._engine.time.code*t),r=Math.max(0,n+e);this._engine.seek(r/t*60)}seekToStart(){this._engine.seek(0)}createEntity(e,t){let n=this._engine.createEntity({name:t});return n.initiator=`user`,e.add(n),n}deleteEntity(e){e.disposeRecursive();let t=e.parent;t&&t.remove(e)}save(){this.emit(`save`,[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:`export`})}exportEngine(){return this._engine.serialize({mode:`export`})}openInExternalWindow(){if(this._externalWindow){this._externalWindow.window.focus();return}let e=window.open(``,`_blank`);if(!e)return;let t=e.document.createElement(`canvas`);t.style.width=`100%`,t.style.height=`100%`,t.style.objectFit=`contain`,t.style.cursor=`none`,e.document.body.style.margin=`0`,e.document.body.style.background=`#000`,e.document.body.appendChild(t);let n=this._engine.createView({offscreen:!0});this._externalWindow={window:e,canvas:t,view:n},e.addEventListener(`unload`,()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){let e=this._externalWindow;e&&(this._externalWindow=null,e.view.dispose(),e.window.close())}_resize(){let e=this._baseResolution;this.engine.setSize(e),this._draw.resize(e);for(let e of this._viewports)e.resize(this._viewportResolution(this._viewportSettings.get(e.id)));this._externalWindow&&(this._externalWindow.canvas.width=e.x,this._externalWindow.canvas.height=e.y)}_viewportResolution(e){return this._baseResolution.clone().multiply(e.resolutionScale)}dispose(){this._disposed=!0,this._api.dispose(),this._keyboardHandler.dispose(),this._modalTransformHandler.dispose(),this._assetPreviewManager.dispose(),this.closeExternalWindow();for(let e of[...this._viewports])e.dispose()}}})))()}function zx(){return(zx=t((()=>{_p(),Rx()})))()}var Bx,Vx;function Hx(){return(Hx=t((()=>{Bx=e(i(),1),zx(),Fo(),Vx=e=>{let{engine:t}=Po(),[n,r]=(0,Bx.useState)(()=>new Lx(t)),i=Bx.useRef(n);return i.current=n,(0,Bx.useEffect)(()=>{if(!i.current.disposed&&i.current.engine.uuid==t.uuid)return;let e=new Lx(t);r(e)},[t]),(0,Bx.useEffect)(()=>()=>{n.dispose()},[n]),{engine:t,editor:n,projectName:e}}})))()}var Ux,Wx,Gx;function Kx(){return(Kx=t((()=>{Ux=i(),zx(),_i(),Hx(),Wx=o(),Gx=e=>{let t=Vx(e.projectName),n=(0,Ux.useRef)(Promise.resolve());(0,Ux.useEffect)(()=>{if(!t.editor||!e.onSave)return;let r=e.onSave,i=(e,t)=>{n.current=Promise.resolve(r(e,t))};return t.editor.on(`save`,i),()=>{t.editor.off(`save`,i)}},[t.editor,e.onSave]);let r=(0,Ux.useRef)(null),i=e.scenes??null;return(0,Ux.useEffect)(()=>{r.current=i},[i]),(0,Ux.useEffect)(()=>gp({editor:t.editor,getScenes:()=>r.current,waitForSave:()=>n.current}),[t.editor]),(0,Ux.useEffect)(()=>{t.editor&&t.editor.bootstrap(e.editorData)},[e.editorData,t.editor]),(0,Wx.jsx)(gi.Provider,{value:{...t,scenes:e.scenes},children:e.children})},Gx.__docgenInfo={description:``,methods:[],displayName:`OREditorProvider`}})))()}var qx,$,Jx,Yx,Xx;function Zx(){return(Zx=t((()=>{qx=e(i(),1),ye(),w(),Ce(),ea(),ua(),xo(),ko(),ls(),Fs(),fl(),yl(),Al(),Ac(),Hl(),hd(),vd(),Kx(),$=o(),Jx=[{id:`hierarchy`,title:`Hierarchy`,category:`General`,content:(0,$.jsx)(ce,{children:(0,$.jsx)(Ps,{})})},{id:`timer`,title:`Timer`,category:`Rendering`,content:(0,$.jsx)(ce,{noPadding:!0,children:(0,$.jsx)(cs,{})})},{id:Oc,title:`Screen`,category:`General`,multiple:!0,content:e=>(0,$.jsx)(kc,{viewportId:e})},{id:`property`,title:`Property`,category:`General`,content:(0,$.jsx)(ce,{children:(0,$.jsx)(bo,{})})},{id:`textures`,title:`Textures`,category:`Rendering`,content:(0,$.jsx)(ce,{noPadding:!0,children:(0,$.jsx)(Vl,{})})},{id:`scene`,title:`Scene`,category:`General`,content:(0,$.jsx)(ce,{children:(0,$.jsx)(kl,{})})},{id:`export`,title:`Export`,category:`Project`,content:(0,$.jsx)(ce,{children:(0,$.jsx)(Oo,{})})},{id:`renderer`,title:`Renderer`,category:`Rendering`,content:(0,$.jsx)(ce,{children:(0,$.jsx)(vl,{})})},{id:`editor-settings`,title:`Editor`,category:`Project`,content:(0,$.jsx)(ce,{children:(0,$.jsx)($i,{})})},{id:`timeline`,title:`Timeline`,category:`Animation`,content:(0,$.jsx)(ce,{noPadding:!0,children:(0,$.jsx)(md,{})})}],Yx=e=>{let t=[];for(let n of e)n.multiple||n.id!==`hierarchy`&&n.id!==`property`&&n.id!==`timeline`&&t.push({id:n.id,title:n.title,content:n.content});return t},Xx=e=>{let t=Se(),n=(0,qx.useMemo)(()=>e.panels?[...Jx,...e.panels]:Jx,[e.panels]),r=null;return r=t.isPC?(0,$.jsx)(dl,{panels:n}):(0,$.jsx)($.Fragment,{children:(0,$.jsxs)(ae,{direction:`vertical`,storageKey:`orengine-editor-sp-main`,children:[(0,$.jsx)(ae.Item,{size:`calc( min( 56.25vw, 55vh ) + 77px )`,minSize:200,style:{minHeight:`200px`},children:(0,$.jsx)(kc,{viewportId:`main`})}),(0,$.jsx)(ae.Item,{flex:1,minSize:200,children:(0,$.jsxs)(le,{storageKey:`orengine-panel-sp-main`,children:[(0,$.jsx)(le.Tab,{title:`Hierarchy / Property`,children:(0,$.jsxs)(ae,{direction:`horizontal`,storageKey:`orengine-editor-sp-hierarchyProp`,children:[(0,$.jsx)(ae.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,$.jsx)(Ps,{})}),(0,$.jsx)(ae.Item,{flex:1,minSize:120,overflow:!0,padding:!0,children:(0,$.jsx)(bo,{})})]})}),Yx(n).map(e=>(0,$.jsx)(le.Tab,{title:e.title,children:e.content},e.id))]})}),(0,$.jsx)(ae.Item,{size:`120px`,minSize:80,children:(0,$.jsx)(le,{storageKey:`orengine-panel-sp-timeline`,children:(0,$.jsx)(le.Tab,{title:`Timeline`,children:(0,$.jsx)(ce,{noPadding:!0,children:(0,$.jsx)(ve,{fallback:(0,$.jsx)(`div`,{children:`エラーだよ`}),children:(0,$.jsx)(md,{})})})})})})]})}),(0,$.jsx)(Gx,{projectName:e.projectName,onSave:e.onSave,editorData:e.editorData,scenes:e.scenes,children:(0,$.jsx)(x,{children:(0,$.jsxs)(ne,{children:[(0,$.jsx)(`div`,{className:_d.editor,children:r}),(0,$.jsx)(la,{}),(0,$.jsx)(y,{}),(0,$.jsx)(te,{})]})})})},Xx.__docgenInfo={description:``,methods:[],displayName:`OREditor`,props:{onSave:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => Promise<void> | void`,signature:{arguments:[{type:{name:`OREngineProjectData`},name:`projectData`},{type:{name:`MXP.SerializeField`},name:`editorData`}],return:{name:`union`,raw:`Promise<void> | void`,elements:[{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`},{name:`void`}]}}},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},projectName:{required:!1,tsType:{name:`string`},description:``},panels:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
} & (
	// レイアウト内に同時1つまで。Panel ラッパー込みの完成形を持つ
	| { multiple?: false; content: React.ReactNode }
	// 「+」で追加するたびに "<id>:<instance>" のタブが新しく増える（Screen 用。タブごとに独立したビューポートを持つ）
	| { multiple: true; content: ( instanceId: string ) => React.ReactNode }
)`,elements:[{name:`signature`,type:`object`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`category`,value:{name:`string`,required:!1}}]}},{name:`unknown`}]}],raw:`PanelDefinition[]`},description:``},scenes:{required:!1,tsType:{name:`signature`,type:`object`,raw:`{
	names: string[];
	current: string | null;
	// 読み込みの開始まで。エンジンの読み込み完了は engine の loaded で分かる
	onSelect: ( name: string ) => Promise<void>;
	// ファイルを作るだけで開かない。from を渡すとそのシーンの中身を複製する
	onCreate: ( name: string, from?: string ) => Promise<void>;
	onDelete: ( name: string ) => Promise<void>;
}`,signature:{properties:[{key:`names`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`current`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`onSelect`,value:{name:`signature`,type:`function`,raw:`( name: string ) => Promise<void>`,signature:{arguments:[{type:{name:`string`},name:`name`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}},required:!0}},{key:`onCreate`,value:{name:`signature`,type:`function`,raw:`( name: string, from?: string ) => Promise<void>`,signature:{arguments:[{type:{name:`string`},name:`name`},{type:{name:`string`},name:`from`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}},required:!0}},{key:`onDelete`,value:{name:`signature`,type:`function`,raw:`( name: string ) => Promise<void>`,signature:{arguments:[{type:{name:`string`},name:`name`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}},required:!0}}]}},description:``}}}})))()}var Qx,$x;function eS(){return(eS=t((()=>{Qx=e(i(),1),jp(),ci(),$x=()=>{let[e,t]=Qx.useState(()=>new N(kp)),n=Qx.useRef(e);return n.current=e,(0,Qx.useEffect)(()=>{n.current.disposed&&t(new N(kp))},[]),(0,Qx.useEffect)(()=>()=>{e.dispose()},[e]),{engine:e,load:(0,Qx.useCallback)(t=>{t&&e.load(t)},[e])}}})))()}var tS,nS,rS;function iS(){return(iS=t((()=>{tS=i(),Mo(),eS(),nS=o(),rS=e=>{let t=$x(),{engine:n}=t,r=(0,tS.useRef)(e.onEngineInit);return r.current=e.onEngineInit,(0,tS.useEffect)(()=>{r.current?.(n)},[n]),(0,tS.useEffect)(()=>{e.project?n.load(e.project):n.init()},[n,e.project]),(0,nS.jsx)(jo.Provider,{value:t,children:e.children})},rS.__docgenInfo={description:``,methods:[],displayName:`OREngineProvider`}})))()}var aS,oS,sS,cS,lS,uS,dS;function fS(){return(fS=t((()=>{aS=i(),Zx(),iS(),oS=o(),sS=`scene`,cS=async e=>{try{let t=await fetch(e);return t.ok?await t.json():null}catch{return null}},lS=(e,t)=>fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),uS=e=>({name:e,scene:{name:`Root`,uuid:`0`}}),dS=e=>{let t=e.projectName??`DefaultProject`,n=`/api/projects/${t}`,[r,i]=(0,aS.useState)(e.sceneData),[a,o]=(0,aS.useState)(e.editorData),[s,c]=(0,aS.useState)([]),[l,u]=(0,aS.useState)(null),d=(0,aS.useCallback)(async e=>{let t=await cS(`${n}/scenes/${e}`);if(!t)throw Error(`シーンを読み込めません: ${e}`);u(e),i(t)},[n]);(0,aS.useEffect)(()=>{e.sceneData||(async()=>{let[e,t]=await Promise.all([cS(`${n}/editor`),cS(`${n}/scenes`)]);e&&o(e);let r=t??[];if(c(r),r.length===0)return;let i=r[0],a=e?e[sS]:void 0;typeof a==`string`&&r.includes(a)&&(i=a),await d(i)})()},[e.sceneData,n,d]),(0,aS.useEffect)(()=>{l&&(document.title=`${l} | OREngine`)},[l]);let f={names:s,current:l,onSelect:d,onCreate:(0,aS.useCallback)(async(e,t)=>{let r=uS(e);if(t!==void 0){let i=await cS(`${n}/scenes/${t}`);if(!i)throw Error(`複製元のシーンを読み込めません: ${t}`);r={...i,name:e}}let i=await lS(`${n}/scenes/${e}`,r);if(!i.ok)throw Error(`シーンを作成できません: ${e}（HTTP ${i.status}）`);let a=await cS(`${n}/scenes`);a&&c(a)},[n]),onDelete:(0,aS.useCallback)(async e=>{let t=await fetch(`${n}/scenes/${e}`,{method:`DELETE`});if(!t.ok)throw Error(`シーンを削除できません: ${e}（HTTP ${t.status}）`);let r=await cS(`${n}/scenes`)??[];c(r),e===l&&r.length>0&&await d(r[0])},[n,l,d])};return(0,oS.jsx)(rS,{project:r,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,oS.jsx)(Xx,{editorData:a,projectName:t,panels:e.panels,scenes:f,onSave:async(t,r)=>{e.onBeforeSave?.();let i=[lS(`${n}/editor`,{...r,[sS]:l})];l&&i.push(lS(`${n}/scenes/${l}`,t));for(let e of await Promise.all(i))if(!e.ok)throw Error(`保存に失敗しました（POST ${new URL(e.url).pathname}: HTTP ${e.status}）`)}})})},dS.__docgenInfo={description:``,methods:[],displayName:`EditorPage`,props:{projectName:{required:!1,tsType:{name:`string`},description:``},sceneData:{required:!1,tsType:{name:`OREngineProjectData`},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},initResourceInstances:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( engine: Engine ) => void`,signature:{arguments:[{type:{name:`Engine`},name:`engine`}],return:{name:`void`}}},description:``},panels:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
} & (
	// レイアウト内に同時1つまで。Panel ラッパー込みの完成形を持つ
	| { multiple?: false; content: React.ReactNode }
	// 「+」で追加するたびに "<id>:<instance>" のタブが新しく増える（Screen 用。タブごとに独立したビューポートを持つ）
	| { multiple: true; content: ( instanceId: string ) => React.ReactNode }
)`,elements:[{name:`signature`,type:`object`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`category`,value:{name:`string`,required:!1}}]}},{name:`unknown`}]}],raw:`PanelDefinition[]`},description:``},onBeforeSave:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var pS,mS;function hS(){return(hS=t((()=>{Zx(),iS(),pS=o(),mS=e=>(0,pS.jsx)(rS,{project:e.sceneData,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,pS.jsx)(Xx,{editorData:e.editorData,projectName:e.projectName??`Static`,panels:e.panels,onSave:()=>{}})}),mS.__docgenInfo={description:``,methods:[],displayName:`EditorPageStatic`,props:{projectName:{required:!1,tsType:{name:`string`},description:``},sceneData:{required:!0,tsType:{name:`OREngineProjectData`},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},initResourceInstances:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( engine: Engine ) => void`,signature:{arguments:[{type:{name:`Engine`},name:`engine`}],return:{name:`void`}}},description:``},panels:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
} & (
	// レイアウト内に同時1つまで。Panel ラッパー込みの完成形を持つ
	| { multiple?: false; content: React.ReactNode }
	// 「+」で追加するたびに "<id>:<instance>" のタブが新しく増える（Screen 用。タブごとに独立したビューポートを持つ）
	| { multiple: true; content: ( instanceId: string ) => React.ReactNode }
)`,elements:[{name:`signature`,type:`object`,raw:`{
	id: PanelId;
	title: string;
	// タブ追加メニュー上の階層。"/" 区切りで、省略時はルート直下に出る。タブ名は title のまま
	category?: string;
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`category`,value:{name:`string`,required:!1}}]}},{name:`unknown`}]}],raw:`PanelDefinition[]`},description:``}}}})))()}var gS,_S,vS;function yS(){return(yS=t((()=>{gS=`InputGroup__group___Lmdyb`,_S=`InputGroup__submit___Lmdyb`,vS={group:gS,submit:_S}})))()}var bS,xS,SS;function CS(){return(CS=t((()=>{bS=i(),w(),Ri(),yS(),xS=o(),SS=e=>{let t=e.initialValues,n=[],[r,i]=(0,bS.useState)(t);(0,bS.useEffect)(()=>{i(t)},[t]);let a=Object.keys(r);for(let e=0;e<a.length;e++){let t=a[e],o=r[t];n.push((0,xS.jsx)(Li,{label:t,value:o,onChange:e=>{i({...r,[t]:e})}},e))}let o=(0,bS.useRef)(null);return(0,bS.useEffect)(()=>{setTimeout(()=>{o.current&&o.current.querySelector(`input`)?.focus()},0)},[]),(0,xS.jsx)(`div`,{className:vS.group,ref:o,children:(0,xS.jsxs)(`form`,{onSubmit:e=>{e.preventDefault()},children:[(0,xS.jsx)(s,{label:e.title,noMargin:!0,children:n}),(0,xS.jsx)(`div`,{className:vS.submit,children:(0,xS.jsx)(c,{type:`submit`,onClick:()=>{e.onSubmit&&e.onSubmit(r)},children:`OK`})})]})})},SS.__docgenInfo={description:``,methods:[],displayName:`InputGroup`,props:{title:{required:!1,tsType:{name:`string`},description:``},initialValues:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{[key: string]:ValueType}`,signature:{properties:[{key:{name:`string`},value:{name:`SerializeFieldObjective`,required:!0}}]}},description:``},onSubmit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( values: {[key: string]:ValueType} ) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{[key: string]:ValueType}`,signature:{properties:[{key:{name:`string`},value:{name:`SerializeFieldObjective`,required:!0}}]}},name:`values`}],return:{name:`void`}}},description:``}}}})))()}function wS(){return(wS=t((()=>{fS(),hS(),Zx(),Kx(),F(),iS(),Fo(),Fs(),xo(),Ac(),Zs(),ic(),hd(),Jl(),Al(),ko(),ls(),yl(),ea(),qi(),Hl(),Wa(),Hs(),Ri(),Da(),CS(),Si(),Ei(),Fi(),Ga(),ga(),xa(),Ce()})))()}var TS;function ES(){return(ES=t((()=>{TS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var DS;function OS(){return(OS=t((()=>{DS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var kS=n({EyeRings:()=>AS}),AS;function jS(){return(jS=t((()=>{M(),ES(),OS(),AS=class extends wt{constructor(e){super(e);let t=new Qt({thetaSegments:64,innerRadius:4,outerRadius:4.01,extrude:.01}),n=[];for(let e=0;e<8;e++)n.push(-1,e,e/7),n.push(1,e,e/7);t.setAttribute(`instance`,new Float32Array(n),3,{instanceDivisor:1});let r=new hn({phase:[`deferred`,`shadowMap`],frag:TS,vert:DS});this.entity.addComponent(A,{geometry:t,material:r})}dispose(){super.dispose(),this.entity.removeComponent(A)}}})))()}var MS;function NS(){return(NS=t((()=>{MS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var PS;function FS(){return(FS=t((()=>{PS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var IS=n({FlashLine:()=>LS}),LS;function RS(){return(RS=t((()=>{O(),M(),NS(),FS(),LS=class extends wt{geometry;material;constructor(e){super(e),this.geometry=new At({radiusBottom:.02,radiusTop:.02,radSegments:8,height:50});let t=[];for(let e=0;e<32;e++){let e=Ae.randomVector().multiply(new E(20,1,20));t.push(e.x,e.y,e.z,Math.random())}this.geometry.setAttribute(`oPos`,new Float32Array(t),4,{instanceDivisor:1}),this.material=new hn({phase:[`forward`,`envMap`],frag:tn(`flFrag`,MS),vert:tn(`flVert`,PS)}),this.entity.addComponent(A,{material:this.material,geometry:this.geometry})}}})))()}var zS;function BS(){return(BS=t((()=>{zS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var VS=n({SkyBox:()=>HS}),HS;function US(){return(US=t((()=>{M(),BS(),HS=class extends wt{material;constructor(e){super(e);let t=this.engine;this.material=new hn({name:`SkyBox`,phase:[`deferred`,`envMap`],frag:tn(`SkyBoxFrag`,zS),uniforms:{uAspectRatio:{value:0,type:`1f`}}}),t.renderer.sky.mesh.material=this.material}}})))()}var WS;function GS(){return(GS=t((()=>{WS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var KS;function qS(){return(qS=t((()=>{KS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var JS=n({GridCross:()=>YS}),YS;function XS(){return(XS=t((()=>{O(),M(),GS(),qS(),YS=class extends wt{constructor(e){super(e);let t=new Ot({width:.05,height:.5,depth:.05}),n=[],r=[],i=new E(16,2,16);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(Math.PI/2,0,0),n.push(o,s,c),r.push(0,0,Math.PI/2)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new hn({frag:tn(`gridCrossFrag`,WS),vert:tn(`gridCrossVert`,KS),phase:[`forward`]});this.entity.addComponent(A,{geometry:t,material:a})}}})))()}var ZS;function QS(){return(QS=t((()=>{ZS=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var $S;function eC(){return(eC=t((()=>{$S=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var tC=n({GridDots:()=>nC}),nC;function rC(){return(rC=t((()=>{O(),M(),QS(),eC(),nC=class extends wt{constructor(e){super(e);let t=new Pt({radius:.1}),n=[],r=[],i=new E(32,2,32);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(0,0,0)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new hn({frag:tn(`gridDotsFrag`,ZS),vert:tn(`gridDotsVert`,$S),phase:[`forward`]});this.entity.addComponent(A,{geometry:t,material:a})}}})))()}var iC;function aC(){return(aC=t((()=>{iC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
}`})))()}var oC;function sC(){return(sC=t((()=>{oC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
}`})))()}var cC=n({WireCube:()=>lC}),lC;function uC(){return(uC=t((()=>{M(),aC(),sC(),lC=class extends wt{constructor(e){super(e);let t=3.3,n=t/2,r=new Ot({width:.01,height:t,depth:.01,segmentsHeight:16}),i=[],a=[];for(let e=0;e<3;e++)for(let t=0;t<4;t++)[[n,0,n],[n,0,-1.65],[-1.65,0,n],[-1.65,0,-1.65]][t].forEach(e=>{i.push(e)}),[[0,0,0],[Math.PI/2,0,0],[0,0,Math.PI/2]][e].forEach(e=>{a.push(e)});r.setAttribute(`instancePos`,new Float32Array(i),3,{instanceDivisor:1}),r.setAttribute(`instanceRot`,new Float32Array(a),3,{instanceDivisor:1});let o=new hn({phase:[`deferred`],frag:iC,vert:oC});this.entity.addComponent(A,{geometry:r,material:o})}}})))()}var dC;function fC(){return(fC=t((()=>{dC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var pC;function mC(){return(mC=t((()=>{pC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var hC=n({OREngineCube:()=>gC}),gC;function _C(){return(_C=t((()=>{M(),mi(),fC(),mC(),gC=class extends wt{material;constructor(e){super(e),this.material=new hn({name:`OREngineCube`,phase:[`shadowMap`,`deferred`],vert:tn(`OREngineCubeVert`,pC),frag:tn(`OREngineCubeFrag`,dC),uniforms:{uNoiseTex:{value:N.resources.getTexture(`noise`),type:`1i`}}});let t=this.entity.getComponent(A);t&&(t.material=this.material)}}})))()}var vC;function yC(){return(yC=t((()=>{vC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var bC;function xC(){return(xC=t((()=>{bC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var SC=n({OREngineLogo:()=>CC}),CC;function wC(){return(wC=t((()=>{M(),yC(),xC(),CC=class extends wt{material;constructor(e){super(e),this.material=new hn({name:`OREngineLogo`,phase:[`deferred`,`shadowMap`],vert:tn(`OREngineLogoVert`,bC),frag:tn(`OREngineLogoFrag`,vC)});let t=this.entity.getComponent(A);t&&(t.material=this.material)}}})))()}var TC;function EC(){return(EC=t((()=>{TC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var DC;function OC(){return(OC=t((()=>{DC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var kC=n({Dust:()=>AC}),AC;function jC(){return(jC=t((()=>{O(),M(),EC(),OC(),AC=class extends wt{constructor(e){super(e);let t=new Et,n=e.args?.num||2048,r=new E(20,5,20),i=[],a=[];for(let e=0;e<n;e++)i.push((Math.random()-.5)*r.x),i.push((Math.random()-.5)*r.y),i.push((Math.random()-.5)*r.z),a.push(Math.random());t.setAttribute(`position`,new Float32Array(i),3);let o=new hn({phase:[`forward`],drawType:`POINTS`,frag:TC,vert:DC});this.entity.addComponent(A,{geometry:t,material:o})}dispose(){super.dispose(),this.entity.removeComponent(A)}}})))()}var MC;function NC(){return(NC=t((()=>{MC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

}`})))()}var PC;function FC(){return(FC=t((()=>{PC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
	
}`})))()}var IC;function LC(){return(LC=t((()=>{IC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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

} `})))()}var RC=n({YakiSoba:()=>zC}),zC;function BC(){return(BC=t((()=>{O(),M(),NC(),FC(),LC(),zC=class extends wt{_gpu;constructor(e){super(e);let t=this.engine,n=new E(64,512);this._gpu=new Kr({passes:[new Yr(t.renderer.backend,{name:`yakisoba`,size:n,dataLayerCount:2,frag:tn(`yakiSobaCompute`,IC),uniforms:cn.merge({},t.renderer.globalUniforms)})]}),this._gpu.passes[0].initTexture((e,t,n)=>[0,0,0,0]);let r=new Ot({width:.05,height:.05,depth:.05,segmentsHeight:n.x}),i=[],a=[];for(let e=0;e<n.y;e++)i.push(e/n.y),a.push(Math.random(),Math.random(),Math.random());r.setAttribute(`trailId`,new Float32Array(i),1,{instanceDivisor:1}),r.setAttribute(`id`,new Float32Array(a),3,{instanceDivisor:1});let o=new hn({frag:tn(`chainFrag`,MC),vert:tn(`chainVert`,PC),phase:[`deferred`,`shadowMap`],uniforms:cn.merge({},this._gpu.passes[0].outputUniforms)});this.entity.addComponent(A,{geometry:r,material:o})}updateImpl(e){this.entity.isVisibleTraverse()&&this._gpu.compute(e.renderer)}dispose(){super.dispose(),this.entity.removeComponent(A),this._gpu.dispose()}}})))()}var VC;function HC(){return(HC=t((()=>{VC=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
}`})))()}var UC=n({Finalize:()=>WC}),WC;function GC(){return(GC=t((()=>{M(),HC(),WC=class extends wt{constructor(e){super(e);let t=this.engine,n=this.entity.getComponent(dn);n||=this.entity.addComponent(dn);let r=new j(t.renderer.backend,{name:`finalize`,frag:VC}),i=n.add(new _n({name:`Finalize`,passes:[r]}));this.once(`dispose`,()=>{n.remove(i)})}}})))()}var KC=n({CameraOrbitAnim:()=>qC}),qC;function JC(){return(JC=t((()=>{O(),M(),qC=class extends wt{time;radius;heightAmp;speed;baseHeight;constructor(e){super(e),this.time=0,this.radius=6,this.heightAmp=2,this.speed=.3,this.baseHeight=1.5,this.field(`radius`,()=>this.radius,e=>this.radius=e),this.field(`heightAmp`,()=>this.heightAmp,e=>this.heightAmp=e),this.field(`speed`,()=>this.speed,e=>this.speed=e),this.field(`baseHeight`,()=>this.baseHeight,e=>this.baseHeight=e)}updateImpl(e){this.time+=e.timeDelta;let t=this.time*this.speed,n=Math.cos(t)*this.radius,r=Math.sin(t)*this.radius,i=this.baseHeight+Math.sin(t*1.7)*this.heightAmp;this.entity.position.set(n,i,r),this.entity.lookAt(new E(0,0,0))}}})))()}var YC=n({ShakeViewer:()=>XC}),XC;function ZC(){return(ZC=t((()=>{O(),M(),XC=class extends wt{shakePower;shakeSpeed;shakeMatrix;cameraMatrixWorld;shakeQua;constructor(e){super(e),this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new D,this.cameraMatrixWorld=new D,this.shakeQua=new Oe,this.order=1e3,this.field(`power`,()=>this.shakePower,e=>this.shakePower=e),this.field(`speed`,()=>this.shakeSpeed,e=>this.shakeSpeed=e)}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=.008*this.shakePower;n*=t.fov/50;let r=e.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(r*2)*n,y:Math.sin(r*2.5)*n,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.cameraMatrixWorld.copy(this.entity.matrixWorld).multiply(this.shakeMatrix),t.viewMatrix.copy(this.cameraMatrixWorld).inverse()}}})))()}var QC=n({ObjectRotate:()=>$C}),$C;function ew(){return(ew=t((()=>{O(),M(),$C=class extends wt{speed;rotQuaternion;constructor(e){super(e),this.speed=1,this.rotQuaternion=new Oe}updateImpl(e){this.rotQuaternion.setFromEuler(new Ee(0,-.4*e.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}}})))()}var tw=n({BLidgeClient:()=>nw}),nw;function rw(){return(rw=t((()=>{M(),mi(),nw=class e extends wt{blidge;type;blidgeRoot;entities;attachments;_attachmentsApplied;_unresolvedByEntity;static sceneData=null;connection;useGLTF;gltfPath;constructor(t){super(t),this.entities=new Map,this.attachments=[],this._attachmentsApplied=!1,this._unresolvedByEntity=new Map,this.type=`websocket`,this.connection={enabled:!0,url:`ws://localhost:3100`},this.useGLTF=!1,this.gltfPath=`/scene.glb`,this.blidgeRoot=null,this.blidge=new yt(this.engine);let n=this.onSyncScene.bind(this),r=e=>{this.entity&&this.entity.noticeEventParent(`update/blidge/frame`,[e])};this.blidge.on(`sync/scene`,n),this.blidge.on(`sync/timeline`,r),this.once(`dispose`,()=>{this.blidge.off(`sync/scene`,n),this.blidge.off(`sync/timeline`,r)});let i=async()=>{if(this.type==`json`){let t=e.sceneData;if(!t){let e=await fetch(`/blidge-scene.json`);if(!e.ok){console.warn(`BLidgeClient: failed to load /blidge-scene.json (${e.status})`);return}t=await e.json()}await this.blidge.loadScene(t,this.useGLTF?this.gltfPath:void 0),this.emit(`loaded`)}else this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field(`mode`,()=>this.type,e=>{this.type=e,i()},{format:{type:`select`,list:[`websocket`,`json`]}}),this.field(`gltf`,()=>this.useGLTF,e=>{this.useGLTF=e,i()}),this.field(`gltfPath`,()=>this.gltfPath,e=>{this.gltfPath=e,i()});let a=this.fieldDir(`websocket`,{hidden:()=>this.type!=`websocket`});a.field(`reconnect`,()=>()=>i(),void 0,{label:`Reconnect`}),a.field(`url`,()=>this.connection.url,e=>this.connection.url=e),this.field(`attachments`,()=>!this.blidgeRoot||!this._attachmentsApplied?this.attachments:this.serializeAttachments(),e=>{this.attachments=e||[],this._attachmentsApplied=!1,this._unresolvedByEntity.clear()},{hidden:!0})}serializeAttachments(){if(!this.blidgeRoot)return[];let e={getName:e=>N.resources.getComponentName(e)},t=[];return this.blidgeRoot.traverse(n=>{let r=[];n.components.forEach(t=>{if(t.initiator!==`user`)return;let n=t.serialize({mode:`export`}),i=Object.keys(n).length>0,a={name:e.getName(t),uuid:t.uuid};i&&(a.props=n),r.push(a)});let i=this._unresolvedByEntity.get(n.name);i&&r.push(...i),r.length>0&&t.push({name:n.name,components:r})}),t}applyAttachments(e){if(this._unresolvedByEntity.clear(),!this.attachments.length)return;let t=new Map;this.attachments.forEach(e=>t.set(e.name,e)),e.traverse(e=>{let n=t.get(e.name);n&&n.components.forEach(t=>{let n=N.resources.getComponent(t.name);if(n){e.removeComponent(n.component);let r=e.addComponent(n.component);r.initiator=`user`,r.restoreUUID(t.uuid),t.props&&r.deserialize(t.props)}else{console.warn(`[BLidgeClient] unresolved attachment component "${t.name}" on entity "${e.name}". Preserving data for round-trip.`);let n=this._unresolvedByEntity.get(e.name)||[];n.push({name:t.name,uuid:t.uuid,props:t.props}),this._unresolvedByEntity.set(e.name,n)}})})}async onSyncScene(e){this._attachmentsApplied=!1;let t=new Date().getTime(),n=r=>{let i=this.entities.get(r.name);if(i||(i=this.engine.createEntity(),i.restoreUUID(`blidge:`+r.name)),r.type==`camera`){let e=r.param;i.userData.cameraParam=e}return i.removeComponent(Wt),i.addComponent(Wt,{blidge:e,node:r}),r.children.forEach(e=>{let t=n(e);i.add(t)}),this.entities.set(i.name,i),i.userData.updateTime=t,i},r=e.root&&n(e.root);r&&(r.name=`blidgeRoot`,this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=r,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(e=>{if(e.userData.updateTime!=t){let t=e.parent;t&&t.remove(e),e.dispose(),this.entities.delete(e.name)}}),e.gltf&&await e.gltfPrm,this.blidgeRoot&&(this.applyAttachments(this.blidgeRoot),this._attachmentsApplied=!0),this.entity&&(this.entity.noticeEventChilds(`sceneCreated`,[this.blidgeRoot]),this.entity.noticeEventParent(`update/blidge/scene`,[this.blidgeRoot]))}dispose(){super.dispose(),this.blidgeRoot&&=(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),null),this._attachmentsApplied=!1,this._unresolvedByEntity.clear()}}})))()}var iw=n({Cube:()=>aw}),aw;function ow(){return(ow=t((()=>{M(),aw=class extends Ot{}})))()}var sw=n({Cylinder:()=>cw}),cw;function lw(){return(lw=t((()=>{M(),cw=class extends At{}})))()}var uw=n({Plane:()=>dw}),dw;function fw(){return(fw=t((()=>{M(),dw=class extends Mt{}})))()}var pw=n({Sphere:()=>mw}),mw;function hw(){return(hw=t((()=>{M(),mw=class extends Pt{}})))()}var gw,_w;function vw(){return(vw=t((()=>{JC(),ZC(),Ff(),Rf(),ew(),rw(),ow(),lw(),fw(),hw(),ii(),gw=ri(Object.assign({"./Components/Camera/CameraOrbitAnim/index.ts":KC,"./Components/Camera/CameraShake/index.ts":YC,"./Components/Camera/LookAt/index.ts":Nf,"./Components/Camera/OrbitControls/index.ts":If,"./Components/Object/ObjectRotate/index.ts":QC,"./Components/Utility/BLidgeClient/index.ts":tw}),`Components`),_w=ri(Object.assign({"./Geometries/Cube/index.ts":iw,"./Geometries/Cylinder/index.ts":sw,"./Geometries/Plane/index.ts":uw,"./Geometries/Sphere/index.ts":pw}),`Geometries`)})))()}var yw;function bw(){return(bw=t((()=>{yw=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
} `})))()}var xw;function Sw(){return(Sw=t((()=>{bw(),xw={name:`hash`,resolution:[512,512],filter:`nearest`,updateEveryFrame:!1,frag:yw}})))()}var Cw;function ww(){return(ww=t((()=>{Cw=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
} `})))()}var Tw;function Ew(){return(Ew=t((()=>{ww(),Tw={name:`noise`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!0,frag:Cw}})))()}var Dw;function Ow(){return(Ow=t((()=>{Dw=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {

	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );

}

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
} `})))()}var kw;function Aw(){return(Aw=t((()=>{Ow(),kw={name:`noiseCyclic`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!1,frag:Dw}})))()}var jw;function Mw(){return(Mw=t((()=>{Ow(),jw={name:`noiseCyclicAnime`,resolution:[512,512],filter:`linear`,updateEveryFrame:!0,frag:Dw}})))()}var Nw,Pw,Fw;function Iw(){return(Iw=t((()=>{Sw(),Ew(),Aw(),Mw(),mi(),Nw=Object.assign({"/demo-webgl/Resources/Textures/hash.tex":xw,"/demo-webgl/Resources/Textures/noise.tex":Tw,"/demo-webgl/Resources/Textures/noiseCyclic.tex":kw,"/demo-webgl/Resources/Textures/noiseCyclicAnime.tex":jw}),Pw=()=>{for(let e of Object.values(Nw))e&&N.resources.addTextureResource(e.name,{frag:e.frag,resolution:e.resolution||[1024,1024],filter:e.filter,updateEveryFrame:e.updateEveryFrame,textures:e.textures})},Fw=e=>{N.resources.buildTextureInstances(e.renderer)}})))()}var Lw,Rw,zw,Bw,Vw;function Hw(){return(Hw=t((()=>{jS(),RS(),US(),XS(),rC(),uC(),_C(),wC(),jC(),BC(),GC(),jp(),mi(),vw(),Iw(),Lw=Object.assign({"/demo-webgl/Resources/Components/Samples/Effects/EyeRings/index.ts":kS,"/demo-webgl/Resources/Components/Samples/Effects/FlashLine/index.ts":IS,"/demo-webgl/Resources/Components/Samples/Environment/SkyBox/index.ts":VS,"/demo-webgl/Resources/Components/Samples/Geometry/GridCross/index.ts":JS,"/demo-webgl/Resources/Components/Samples/Geometry/GridDots/index.ts":tC,"/demo-webgl/Resources/Components/Samples/Geometry/WireCube/index.ts":cC,"/demo-webgl/Resources/Components/Samples/Objects/OREngineCube/index.ts":hC,"/demo-webgl/Resources/Components/Samples/Objects/OREngineLogo/index.ts":SC,"/demo-webgl/Resources/Components/Samples/Particles/Dust/index.ts":kC,"/demo-webgl/Resources/Components/Samples/Particles/YakiSoba/index.ts":RC,"/demo-webgl/Resources/Components/Samples/PostProcess/Finalize/index.ts":UC}),Rw=Object.assign({}),zw=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];if(typeof a==`function`)t.addComponent(i,a);else{let e=t.createGroup(i);zw(a,e)}}},Bw=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];if(typeof a==`function`)t.addGeometry(i,a);else{let e=t.createGroup(i);Bw(a,e)}}},Vw=()=>{yt.gltfLoaderFactory=e=>new Cp(e),N.resources.clear();let e=N.resources.addComponentGroup(`_Built-in`);e.addComponent(`Light`,Bt),e.addComponent(`Camera`,It),e.addComponent(`Mesh`,A);let t=Object.keys(gw);for(let e=0;e<t.length;e++){let n=t[e],r=gw[n],i=N.resources.addComponentGroup(n);zw(r,i)}let n=Object.keys(_w);for(let e=0;e<n.length;e++){let t=n[e],r=_w[t],i=N.resources.addGeometryGroup(t);Bw(r,i)}let r=ri(Lw,`Components`),i=Object.keys(r);for(let e=0;e<i.length;e++){let t=i[e],n=r[t],a=N.resources.addComponentGroup(t);zw(n,a)}let a=ri(Rw,`Geometries`),o=Object.keys(a);for(let e=0;e<o.length;e++){let t=o[e],n=a[t],r=N.resources.addGeometryGroup(t);Bw(n,r)}Pw()}})))()}var Uw,Ww,Gw,Kw,qw,Jw;function Yw(){return(Yw=t((()=>{Uw=i(),wS(),w(),Hw(),Ww=o(),Vw(),Gw=({setup:e})=>{let{editor:t}=P();return(0,Uw.useEffect)(()=>{let n=t.engine,r=()=>e(t);return n.on(`loaded`,r),()=>{n.off(`loaded`,r)}},[t,e]),null},Kw=e=>(0,Ww.jsx)(rS,{project:e.fixture.scene,onEngineInit:Fw,children:(0,Ww.jsx)(Gx,{projectName:`storybook`,editorData:e.fixture.editorData,scenes:e.fixture.scenes,children:(0,Ww.jsx)(x,{children:(0,Ww.jsxs)(ne,{children:[e.children,e.fixture.setup&&(0,Ww.jsx)(Gw,{setup:e.fixture.setup}),(0,Ww.jsx)(y,{}),(0,Ww.jsx)(te,{})]})})})}),qw=e=>t=>(0,Ww.jsx)(Kw,{fixture:e,children:(0,Ww.jsx)(t,{})}),Jw=e=>t=>(0,Ww.jsx)(rS,{project:e,onEngineInit:Fw,children:(0,Ww.jsx)(t,{})}),Kw.__docgenInfo={description:``,methods:[],displayName:`OREditorFixtureHost`}})))()}var Xw,Zw,Qw,$w,eT;function tT(){return(tT=t((()=>{Xw={name:`Camera`,uuid:`sb-camera`,pos:[0,2,12],components:[{name:`Camera`,uuid:`sb-camera-lens`},{name:`LookAt`,uuid:`sb-camera-lookat`}]},Zw={name:`storybook`,scene:{name:`root`,uuid:`0`,childs:[Xw,{name:`OREngineCube`,uuid:`sb-cube`,components:[{name:`OREngineCube`,uuid:`sb-cube-body`}]},{name:`OREngineLogo`,uuid:`sb-logo`,components:[{name:`OREngineLogo`,uuid:`sb-logo-body`}]}]},"timeline/duration":600,"timeline/fps":60},Qw={...Zw,scene:{name:`root`,uuid:`0`,childs:[Xw]}},$w={enableRender:!0,"viewports/main/resolutionScale":.5,"resolution/width":1920,"resolution/height":1080,viewType:`render`,"frameLoop/enabled":!1,"frameLoop/start":0,"frameLoop/end":0,cameraMode:`preview`,gizmoMode:`translate`},eT={scene:Zw,editorData:$w}})))()}export{$i as A,F as B,ko as C,Wa as D,Ua as E,Fi as F,mi as H,Ti as I,Ei as L,Li as M,Ri as N,Ea as O,Pi as P,xi as R,Oo as S,xo as T,N as U,P as V,ci as W,Al as _,Zw as a,Ps as b,qw as c,CS as d,Xx as f,kl as g,hd as h,eT as i,ea as j,Da as k,Jw as l,md as m,$w as n,Kw as o,Zx as p,Qw as r,Yw as s,tT as t,SS as u,vl as v,bo as w,Fs as x,yl as y,Si as z};