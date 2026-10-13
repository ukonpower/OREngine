import{a as e,n as t,r as n,t as r}from"./rolldown-runtime-DkW27tQK.js";import{r as i}from"./iframe-Qr2i3i6A.js";import{t as a}from"./ArrowIcon-DTg42cjh.js";import{t as o}from"./jsx-runtime-DeHZSEgm.js";import{t as s}from"./Block-BC3i1Qau.js";import{t as c}from"./Button-C0LgJv2v.js";import{A as l,E as u,S as d,c as f,g as p,m,o as h,u as g,v as _,w as v}from"./Icons-BugE91nR.js";import{t as y}from"./InputCheckBox-c29KxitH.js";import{t as b}from"./InputColor-C6IuOFZz.js";import{b as x,f as S,g as C,i as ee,l as w,m as T,n as te,o as ne,t as E,u as re,v as ie,x as ae}from"./uipower-DZqvvb33.js";import{t as oe}from"./InputSelect-DnI9eZnn.js";import{n as se}from"./useAnchoredPosition-DV0uhtu7.js";import{t as ce}from"./Modal-BixftiIw.js";import{t as le}from"./Label-CQTuDIV0.js";import{t as ue}from"./LayoutSplit-CfYIRoVM.js";import{t as de}from"./ListItem-CojBT_d0.js";import{t as fe}from"./Menu-Bdtf_aQo.js";import{t as pe}from"./Panel-h7tqFVYO.js";import{t as me}from"./PanelContainer-CY-vF9kX.js";import{t as he}from"./SegmentedControl-2_W7IND2.js";import{n as ge,t as _e}from"./DragOverlay-qIkNb4yC.js";import{n as ve,t as ye}from"./SceneWindow-BSg2tayr.js";var be,xe,Se;function Ce(){return(Ce=t((()=>{be=i(),xe=900,Se=()=>{let[e,t]=(0,be.useState)(()=>window.innerWidth<=xe);return(0,be.useEffect)(()=>{let e=null,n=()=>{let n=window.innerWidth;(e===null||(n-xe)*(e-xe)<=0)&&t(n<=xe),e=n};return n(),window.addEventListener(`resize`,n),()=>{window.removeEventListener(`resize`,n)}},[]),{isPC:!e,isSP:e}}})))()}var D;function we(){return(we=t((()=>{D=class e{x;y;z;w;constructor(e,t,n,r){this.x=0,this.y=0,this.z=0,this.w=0,this.set(e,t,n,r)}get isVector(){return!0}set(e,t,n,r){return this.x=e??0,this.y=t??0,this.z=n??0,this.w=r??0,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setFromArray(e){return this.x=e[0]||0,this.y=e[1]||0,this.z=e[2]||0,this.w=e[3]||0,this}add(e){return typeof e==`number`?(this.x+=e,this.y+=e,this.z+=e,this.w+=e):(this.x+=e.x??0,this.y+=e.y??0,this.z+=e.z??0,this.w+=e.w??0),this}sub(e){return typeof e==`number`?(this.x-=e,this.y-=e,this.z-=e):(this.x-=e.x??0,this.y-=e.y??0,this.z-=e.z??0,this.w-=e.w??0),this}multiply(e){return typeof e==`number`?(this.x*=e,this.y*=e,this.z*=e,this.w*=e):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w),this}divide(e){return typeof e==`number`?(this.x/=e,this.y/=e,this.z/=e,this.w/=e):(this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w),this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distanceTo(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return Math.sqrt(t*t+n*n+r*r)}normalize(){let e=this.length()||1;return this.x/=e,this.y/=e,this.z/=e,this}cross(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z;return this.x=n*o-r*a,this.y=r*i-t*o,this.z=t*a-n*i,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}applyMatrix3(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[4],o=t[5],s=t[6],c=t[8],l=t[9],u=t[10],d=this.x*n+this.y*a+this.z*c,f=this.x*r+this.y*o+this.z*l,p=this.x*i+this.y*s+this.z*u;return this.x=d,this.y=f,this.z=p,this.w=0,this}applyMatrix4(e){let t=e.elm,n=t[0],r=t[1],i=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],p=t[11],m=t[12],h=t[13],g=t[14],_=t[15],v=this.x*n+this.y*o+this.z*u+this.w*m,y=this.x*r+this.y*s+this.z*d+this.w*h,b=this.x*i+this.y*c+this.z*f+this.w*g,x=this.x*a+this.y*l+this.z*p+this.w*_;return this.x=v,this.y=y,this.z=b,this.w=x,this}applyMatrix4AsPosition(e){let t=this.w;return this.w=1,this.applyMatrix4(e),this.w=t,this}applyMatrix4AsDirection(e){let t=this.w;return this.w=0,this.applyMatrix4(e),this.w=t,this}floor(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this}clone(){return new e(this.x,this.y,this.z,this.w)}getElm(e){return e==`vec2`?[this.x,this.y]:e==`vec3`?[this.x,this.y,this.z]:[this.x,this.y,this.z,this.w]}}})))()}var O;function Te(){return(Te=t((()=>{we(),O=class e{elm;constructor(e){this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e&&this.set(e)}identity(){return this.elm=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],this}clone(){return new e().copy(this)}copy(e){return this.set(e.elm),this}perspective(e,t,n,r){let i=1/Math.tan(e*Math.PI/360),a=r-n;return this.elm=[i/t,0,0,0,0,i,0,0,0,0,-(r+n)/a,-1,0,0,-(r*n*2)/a,0],this}orthographic(e,t,n,r){return this.elm=[2/e,0,0,0,0,2/t,0,0,0,0,-2/(r-n),0,0,0,-(r+n)/(r-n),1],this}lookAt(e,t,n){let r=e.clone().sub(t).normalize(),i=n.clone().cross(r).normalize(),a=r.clone().cross(i).normalize();return this.elm=[i.x,i.y,i.z,0,a.x,a.y,a.z,0,r.x,r.y,r.z,0,e.x,e.y,e.z,1],this}inverse(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15],g=e*a-t*i,_=e*o-n*i,v=e*s-r*i,y=t*o-n*a,b=t*s-r*a,x=n*s-r*o,S=c*p-l*f,C=c*m-u*f,ee=c*h-d*f,w=l*m-u*p,T=l*h-d*p,te=u*h-d*m,ne=g*te-_*T+v*w+y*ee-b*C+x*S,E=1/ne;return ne==0?this.identity():(this.elm[0]=(a*te-o*T+s*w)*E,this.elm[1]=(-t*te+n*T-r*w)*E,this.elm[2]=(p*x-m*b+h*y)*E,this.elm[3]=(-l*x+u*b-d*y)*E,this.elm[4]=(-i*te+o*ee-s*C)*E,this.elm[5]=(e*te-n*ee+r*C)*E,this.elm[6]=(-f*x+m*v-h*_)*E,this.elm[7]=(c*x-u*v+d*_)*E,this.elm[8]=(i*T-a*ee+s*S)*E,this.elm[9]=(-e*T+t*ee-r*S)*E,this.elm[10]=(f*b-p*v+h*g)*E,this.elm[11]=(-c*b+l*v-d*g)*E,this.elm[12]=(-i*w+a*C-o*S)*E,this.elm[13]=(e*w-t*C+n*S)*E,this.elm[14]=(-f*y+p*_-m*g)*E,this.elm[15]=(c*y-l*_+u*g)*E,this)}transpose(){let e=this.elm[0],t=this.elm[1],n=this.elm[2],r=this.elm[3],i=this.elm[4],a=this.elm[5],o=this.elm[6],s=this.elm[7],c=this.elm[8],l=this.elm[9],u=this.elm[10],d=this.elm[11],f=this.elm[12],p=this.elm[13],m=this.elm[14],h=this.elm[15];return this.elm[0]=e,this.elm[1]=i,this.elm[2]=c,this.elm[3]=f,this.elm[4]=t,this.elm[5]=a,this.elm[6]=l,this.elm[7]=p,this.elm[8]=n,this.elm[9]=o,this.elm[10]=u,this.elm[11]=m,this.elm[12]=r,this.elm[13]=s,this.elm[14]=d,this.elm[15]=h,this}set(e){for(let t=0;t<this.elm.length;t++)this.elm[t]=e[t]??0;return this}setFromTransform(e,t,n){return this.identity(),e&&this.applyPosition(e),t&&this.applyQuaternion(t),n&&this.applyScale(n),this}applyPosition(e){return this.matmul([1,0,0,0,0,1,0,0,0,0,1,0,e.x,e.y,e.z,1]),this}applyQuaternion(e){let t=e.x,n=e.y,r=e.z,i=e.w,a=t*t,o=n*n,s=r*r,c=i*i,l=t*n,u=t*r,d=t*i,f=n*r,p=n*i,m=r*i;return this.matmul([a-o-s+c,2*(l+m),2*(u-p),0,2*(l-m),-a+o-s+c,2*(f+d),0,2*(u+p),2*(f-d),-a-o+s+c,0,0,0,0,1]),this}applyScale(e){return this.matmul([e.x,0,0,0,0,e.y,0,0,0,0,e.z,0,0,0,0,1]),this}matmul(e){let t=Array(16);for(let n=0;n<4;n++)for(let r=0;r<4;r++){let i=0;for(let t=0;t<4;t++)i+=this.elm[t*4+r]*e[t+n*4];t[r+n*4]=i}this.elm=t}setRotationFromDirection(e,t){t||={x:0,y:1,z:0};let n=new D().copy(e).normalize(),r=new D().copy(t).cross(n).normalize();r.length()==0&&(n.x+=.001,r.copy(t).cross(n).normalize());let i=n.clone().cross(r).normalize();return this.set([r.x,r.y,r.z,0,i.x,i.y,i.z,0,n.x,n.y,n.z,0,0,0,0,1]),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set([c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1]),this}multiply(e){return this.matmul(e.elm),this}preMultiply(e){let t=this.copyToArray([]);return this.set(e.elm),this.matmul(t),this}decompose(e,t,n){e&&(e.x=this.elm[12],e.y=this.elm[13],e.z=this.elm[14]),t&&t.setFromMatrix(this)}copyToArray(e){e.length=this.elm.length;for(let t=0;t<this.elm.length;t++)e[t]=this.elm[t];return e}}})))()}var Ee;function De(){return(De=t((()=>{Te(),we(),Ee=class extends D{order;constructor(e,t,n,r){super(e,t,n,0),this.order=r||`XYZ`}copy(e){return`order`in e&&(this.order=e.order),super.copy(e)}setFromQuaternion(e){let t=new O().applyQuaternion(e);return this.setFromRotationMatrix(t),this}setFromRotationMatrix(e){let t=e.elm,n=t[0],r=t[4],i=t[8],a=t[5],o=t[9],s=t[6],c=t[10];return this.order=`XYZ`,this.y=Math.asin(Math.min(1,Math.max(-1,i))),Math.abs(i)<.9999999?(this.x=Math.atan2(-o,c),this.z=Math.atan2(-r,n)):(this.x=Math.atan2(s,a),this.z=0),this}}})))()}var Oe;function ke(){return(ke=t((()=>{Oe=class e{x;y;z;w;updated=!1;constructor(e,t,n,r){this.x=e||0,this.y=t||0,this.z=n||0,this.w=r||1}set(e,t,n,r){this.x=e??this.x,this.y=t??this.y,this.z=n??this.z,this.w=r??this.w,this.updated=!0}setFromEuler(e,t){let n=t||(`order`in e?e.order:`XYZ`),r=Math.sin(e.x/2),i=Math.sin(e.y/2),a=Math.sin(e.z/2),o=Math.cos(e.x/2),s=Math.cos(e.y/2),c=Math.cos(e.z/2);return n==`XYZ`?(this.x=o*i*a+r*s*c,this.y=-r*s*a+o*i*c,this.z=o*s*a+r*i*c,this.w=-r*i*a+o*s*c):n==`XZY`?(this.x=-o*i*a+r*s*c,this.y=o*i*c-r*s*a,this.z=r*i*c+o*s*a,this.w=r*i*a+o*s*c):n==`YZX`?(this.x=r*s*c+o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=-r*i*a+o*s*c):n==`ZYX`&&(this.x=r*s*c-o*i*a,this.y=r*s*a+o*i*c,this.z=-r*i*c+o*s*a,this.w=r*i*a+o*s*c),this.updated=!0,this}setFromMatrix(e){let t=e.elm,n=t[0]+t[5]+t[10],r,i,a,o;if(n>0){let e=Math.sqrt(n+1)*2;o=.25*e,r=(t[6]-t[9])/e,i=(t[8]-t[2])/e,a=(t[1]-t[4])/e}else if(t[0]>t[5]&&t[0]>t[10]){let e=Math.sqrt(1+t[0]-t[5]-t[10])*2;o=(t[6]-t[9])/e,r=.25*e,i=(t[1]+t[4])/e,a=(t[2]+t[8])/e}else if(t[5]>t[10]){let e=Math.sqrt(1+t[5]-t[0]-t[10])*2;o=(t[8]-t[2])/e,r=(t[1]+t[4])/e,i=.25*e,a=(t[6]+t[9])/e}else{let e=Math.sqrt(1+t[10]-t[0]-t[5])*2;o=(t[1]-t[4])/e,r=(t[2]+t[8])/e,i=(t[6]+t[9])/e,a=.25*e}let s=Math.sqrt(r*r+i*i+a*a+o*o);return r/=s,i/=s,a/=s,o/=s,this.x=r,this.y=i,this.z=a,this.w=o,this.updated=!0,this}multiply(e){let t=this.w*e.w-this.x*e.x-this.y*e.y-this.z*e.z,n=this.w*e.x+this.x*e.w+this.y*e.z-this.z*e.y,r=this.w*e.y-this.x*e.z+this.y*e.w+this.z*e.x,i=this.w*e.z+this.x*e.y-this.y*e.x+this.z*e.w;return this.set(n,r,i,t),this.updated=!0,this}preMultiply(e){let t=e.clone().multiply(this);this.set(t.x,t.y,t.z,t.w)}inverse(){return this.set(-this.x,-this.y,-this.z,this.w),this.updated=!0,this}copy(e){return this.x=e.x??0,this.y=e.y??0,this.z=e.z??0,this.w=e.w??0,this.updated=!0,this}clone(){return new e(this.x,this.y,this.z,this.w)}}})))()}var Ae;function je(){return(je=t((()=>{we(),(function(e){let t=e.gauss=(e,t,n)=>{let r=e-t,i=-(r*r)/(2*n*n);return 1/Math.sqrt(2*Math.PI*n)*Math.exp(i)};e.gaussWeights=e=>{let n=0,r=[];if(e<=1)return[.5];for(let i=0;i<e;i++){let a=i/(e-1),o=t(a,0,1);n+=o*(i>0?2:1),r.push(o)}for(let t=0;t<e;t++)r[t]/=n;return r},e.randomSeed=e=>{e^=e<<13,e^=0,e^=e<<5;let t=123456789^e;e^=e<<13,e^=0,e^=e<<5;let n=362436069^e;e^=e<<13,e^=0,e^=e<<5;let r=521288629^e;e^=e<<13,e^=0,e^=e<<5;let i=88675123^e,a;return()=>(a=t^t<<11,t=n,n=r,r=i,i=(i^i>>>19^(a^a>>>8))>>>0,i/4294967296)};let n=e.randomRange=(e=-1,t=1)=>e+Math.random()*(t-e);e.randomVector=(e=new D(-1,-1,-1,-1),t=new D(1,1,1,1))=>new D(n(e.x,t.x),n(e.y,t.y),n(e.z,t.z),n(e.w,t.w)),e.randomInSphere=(e=1,t=Math.random)=>{let n=t(),r=t(),i=t(),a=2*Math.PI*n,o=Math.acos(2*r-1),s=Math.cbrt(i)*e,c=Math.sin(o);return{x:s*c*Math.cos(a),y:s*c*Math.sin(a),z:s*Math.cos(o)}},e.smoothstep=(e,t,n)=>n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))})(Ae||={})})))()}function k(){return(k=t((()=>{we(),De(),ke(),Te(),je()})))()}var Me;function Ne(){return(Ne=t((()=>{Me=class{gl;vao;program;indexBuffer;attributes;vertCount;indexCount;instanceCount;attribPointerDiect;attribTypeDict;constructor(e,t){this.gl=e,this.program=t,this.vao=this.gl.createVertexArray(),this.attributes=new Map,this.indexBuffer=null,this.vertCount=0,this.indexCount=0,this.instanceCount=0,this.attribPointerDiect=new Map([[`Float32Array`,this.gl.vertexAttribPointer.bind(this.gl)],[`Int32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`Int8Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt32Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt16Array`,this.gl.vertexAttribIPointer.bind(this.gl)],[`UInt8Array`,this.gl.vertexAttribIPointer.bind(this.gl)]]),this.attribTypeDict=new Map([[`Float32Array`,this.gl.FLOAT],[`Int32Array`,this.gl.INT],[`Int16Array`,this.gl.SHORT],[`Int8Array`,this.gl.BYTE],[`UInt32Array`,this.gl.UNSIGNED_INT],[`UInt16Array`,this.gl.UNSIGNED_SHORT],[`UInt8Array`,this.gl.UNSIGNED_BYTE]])}calcVertCount(){this.vertCount=0,this.instanceCount=0,this.attributes.forEach((e,t)=>{e.instanceDivisor==null&&t!=`index`&&(this.vertCount=Math.max(this.vertCount,e.count)),e.instanceDivisor!==void 0&&e.instanceDivisor>0&&(this.instanceCount=this.instanceCount==0?e.count:Math.min(this.instanceCount,e.count))})}setAttribute(e,t,n,r){if(t.array===null)return;let i={buffer:t,size:n,count:t.array?t.array.length/n:0,location:void 0,...r};this.attributes.set(e,i),this.gl.bindVertexArray(this.vao),i.location=this.gl.getAttribLocation(this.program,e);let a=this.attribPointerDiect.get(t.array.constructor.name),o=this.attribTypeDict.get(t.array.constructor.name);if(i.location>-1){if(this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i.buffer.buffer),i.size==16){for(let e=0;e<4;e++)this.gl.enableVertexAttribArray(i.location+e);for(let e=0;e<4;e++)this.gl.vertexAttribPointer(i.location+e,4,o,!1,64,16*e);if(i.instanceDivisor!==void 0)for(let e=0;e<4;e++)this.gl.vertexAttribDivisor(i.location+e,i.instanceDivisor)}else this.gl.enableVertexAttribArray(i.location),a(i.location,i.size,o,!1,0,0),i.instanceDivisor!==void 0&&this.gl.vertexAttribDivisor(i.location,i.instanceDivisor)}return this.gl.bindVertexArray(null),this.calcVertCount(),this}removeAttribute(e){return this.attributes.delete(e),this.calcVertCount(),this}setIndex(e){this.indexBuffer=e,this.vao&&(this.gl.bindVertexArray(this.vao),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer?this.indexBuffer.buffer:null),this.gl.bindVertexArray(null),this.indexBuffer&&this.indexBuffer.array&&(this.indexCount=this.indexBuffer.array.length))}use(e){this.gl.bindVertexArray(this.vao),e&&e(this),this.gl.bindVertexArray(null)}getVAO(){return this.vao}dispose(){this.attributes.forEach(e=>{e.buffer.dispose()})}}})))()}var Pe,Fe;function Ie(){return(Ie=t((()=>{Ne(),Pe=new Map,Fe=class{gl;program;name=``;vao;uniforms;constructor(e){this.gl=e,this.program=this.gl.createProgram(),this.vao=new Map,this.uniforms=new Map}setShader(e,t,n){if(this.program===null){console.warn(`program is null.`);return}let r=this.createShader(e,this.gl.VERTEX_SHADER),i=this.createShader(t,this.gl.FRAGMENT_SHADER);if(this.name){let e=[];r.error&&e.push(`[VERTEX]
`+r.error),i.error&&e.push(`[FRAGMENT]
`+i.error),e.length>0?Pe.set(this.name,e.join(`

`)):Pe.delete(this.name)}if(!(!r.shader||!i.shader)){if(this.gl.attachShader(this.program,r.shader),this.gl.attachShader(this.program,i.shader),n&&n.transformFeedbackVaryings&&this.gl.transformFeedbackVaryings(this.program,n.transformFeedbackVaryings,this.gl.SEPARATE_ATTRIBS),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)){let e=this.gl.getProgramInfoLog(this.program);if(console.error(`program link error:`,e),this.name&&e){let t=Pe.get(this.name);Pe.set(this.name,(t?t+`

`:``)+`[LINK]
`+e)}}return this}}createShader(e,t){let n=this.gl.createShader(t);return n?(this.gl.shaderSource(n,e),this.gl.compileShader(n),this.gl.getShaderParameter(n,this.gl.COMPILE_STATUS)?{shader:n,error:null}:{shader:null,error:this.gl.getShaderInfoLog(n)||`Unknown shader error`}):{shader:null,error:null}}setUniform(e,t,n){let r=this.uniforms.get(e);if(r){r.type=t;let e=r.value;e.length=n.length;for(let t=0;t<n.length;t++)e[t]=n[t];if(r.cache){if(r.cache.length!==e.length)r.needsUpdate=!0;else for(let t=0;t<e.length;t++)if(r.cache[t]!==e[t]){r.needsUpdate=!0;break}}else r.needsUpdate=!0}else this.uniforms.set(e,{value:n.concat(),type:t,location:null,needsUpdate:!0}),this.updateUniformLocations()}updateUniformLocations(e){this.program&&this.uniforms.forEach((t,n)=>{(t.location===null||e)&&(t.location=this.gl.getUniformLocation(this.program,n))})}uploadUniforms(){this.uniforms.forEach(e=>{e.needsUpdate&&e.location!==null&&(/Matrix[2|3|4]fv/.test(e.type)?this.gl[`uniform`+e.type](e.location,!1,e.value):/[1|2|3|4][f|i]$/.test(e.type)?this.gl[`uniform`+e.type](e.location,...e.value):this.gl[`uniform`+e.type](e.location,e.value),e.cache=e.value.concat(),e.needsUpdate=!1)})}getVAO(e=`_`){if(!this.program)return null;let t=this.vao.get(e);return t||(t=new Me(this.gl,this.program),this.vao.set(e,t),t)}use(e){this.program&&(this.gl.useProgram(this.program),e&&e(this),this.gl.useProgram(null))}getProgram(){return this.program}dispose(){this.vao.forEach(e=>{e.dispose()}),this.vao.clear(),this.gl.deleteProgram(this.program)}}})))()}var Le;function Re(){return(Re=t((()=>{Le=class{gl;buffer;array;constructor(e){this.gl=e,this.buffer=this.gl.createBuffer(),this.array=null}setData(e,t=`vbo`,n){let r=t==`vbo`?this.gl.ARRAY_BUFFER:this.gl.ELEMENT_ARRAY_BUFFER;return this.gl.bindBuffer(r,this.buffer),this.gl.bufferData(r,e,n||this.gl.STATIC_DRAW),this.gl.bindBuffer(r,null),this.array=e,this}read(e){return this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.buffer),this.gl.getBufferSubData(this.gl.ARRAY_BUFFER,0,e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this}dispose(){this.gl.deleteBuffer(this.buffer)}}})))()}var ze;function Be(){return(Be=t((()=>{k(),ze=class{unit;image;size;gl;glTex;textureType;_setting;constructor(e){this.gl=e,this.image=null,this.unit=0,this.size=new D,this.glTex=this.gl.createTexture(),this._setting={type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.RGBA,format:this.gl.RGBA,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST,generateMipmap:!1,wrapS:this.gl.CLAMP_TO_EDGE,wrapT:this.gl.CLAMP_TO_EDGE},this.textureType=e.TEXTURE_2D}get isTexture(){return!0}setting(e){return this._setting={...this._setting,...e},this.attach(this.image),this}attach(e,t){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.image){let e=Array.isArray(this.image)?this.image[0]:this.image;this.size.set(e.width,e.height),e instanceof HTMLImageElement||e instanceof HTMLCanvasElement?this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this._setting.format,this._setting.type,e):this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,e.width,e.height,0,this._setting.format,this._setting.type,e.data||null)}else this.size.set(1,1),this.gl.texImage2D(this.textureType,0,this._setting.internalFormat,this.size.x,this.size.y,0,this._setting.format,this._setting.type,null);return t&&this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}subImage(e,t,n){return this.gl.bindTexture(this.textureType,this.glTex),this.gl.texSubImage2D(this.textureType,0,0,0,t,n,this._setting.format,this._setting.type,e),this.gl.bindTexture(this.textureType,null),this}activate(e){return this.gl.activeTexture(this.gl.TEXTURE0+e),this.gl.bindTexture(this.textureType,this.glTex),this.unit=e,this}load(e,t){let n=new Image;return n.onload=()=>{this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0),this.attach(n),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),t&&t()},n.src=e,this}getTexture(){return this.glTex}get type(){return this.textureType}dispose(){this.gl.deleteTexture(this.glTex)}}})))()}var Ve;function He(){return(He=t((()=>{k(),Be(),Ve=class{size;gl;glFrameBuffer;textures;depthTexture;textureAttachmentList;constructor(e,t){this.gl=e,this.size=new D(1,1),this.glFrameBuffer=this.gl.createFramebuffer(),this.depthTexture=null,this.textures=[],this.textureAttachmentList=[],(!t||!t.disableDepthBuffer)&&this.setDepthTexture(new ze(this.gl).setting({internalFormat:this.gl.DEPTH_COMPONENT32F,format:this.gl.DEPTH_COMPONENT,type:this.gl.FLOAT,magFilter:this.gl.NEAREST,minFilter:this.gl.NEAREST}))}setDepthTexture(e){this.depthTexture=e,this.depthTexture&&(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.getTexture(),0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null))}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textures.forEach((e,t)=>{e.attach({width:this.size.x,height:this.size.y});let n=this.gl.COLOR_ATTACHMENT0+t;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,n,this.gl.TEXTURE_2D,e.getTexture(),0),this.textureAttachmentList.push(n)}),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this}setSize(e,t){return typeof e==`number`?(this.size.x=e,t!==void 0&&(this.size.y=t)):this.size.copy(e),this.size.floor(),this.setTexture(this.textures),this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this.depthTexture&&this.depthTexture.attach({width:this.size.x,height:this.size.y}),this}getFrameBuffer(){return this.glFrameBuffer}clear(){let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,this.glFrameBuffer),e.drawBuffers(this.textureAttachmentList),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)}dispose(){this.gl.deleteFramebuffer(this.glFrameBuffer)}}})))()}var Ue;function We(){return(We=t((()=>{He(),Ue=class extends Ve{cubeTarget;textures;currentFace;constructor(e,t){super(e,t),this.textures=[],this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z],this.currentFace=this.cubeTarget[0]}setTexture(e){return this.textures=e,this.textureAttachmentList=[],this.textures.forEach(e=>{e.attach({width:this.size.x,height:this.size.y})}),this}face(e){this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.glFrameBuffer),this.textureAttachmentList=[],this.textures.forEach((t,n)=>{let r=this.gl.COLOR_ATTACHMENT0+n;this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,r,this.cubeTarget[e],t.getTexture(),0),this.textureAttachmentList.push(r)}),this.currentFace=this.cubeTarget[e],this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}}})))()}var Ge;function Ke(){return(Ke=t((()=>{Be(),Ge=class extends ze{cubeTarget;constructor(e){super(e),this.textureType=e.TEXTURE_CUBE_MAP,this.cubeTarget=[this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]}attach(e){if(this.image=e,this.gl.bindTexture(this.textureType,this.glTex),this.image)for(let e=0;e<6;e++){let t=Array.isArray(this.image)?this.image[e]:this.image;this.size.set(t.width,t.height),t instanceof HTMLImageElement||t instanceof HTMLCanvasElement?this.gl.texImage2D(this.cubeTarget[e],0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t):this.gl.texImage2D(this.cubeTarget[e],0,this._setting.internalFormat,t.width,t.height,0,this._setting.format,this._setting.type,t.data||null)}return this._setting.generateMipmap&&this.gl.generateMipmap(this.textureType),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MAG_FILTER,this._setting.magFilter),this.gl.texParameteri(this.textureType,this.gl.TEXTURE_MIN_FILTER,this._setting.minFilter),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_S,this._setting.wrapS),this.gl.texParameterf(this.textureType,this.gl.TEXTURE_WRAP_T,this._setting.wrapT),this.gl.bindTexture(this.textureType,null),this}}})))()}function qe(){return(qe=t((()=>{Ie(),Re(),He(),We(),Be(),Ke()})))()}var A,Je;function Ye(){return(Ye=t((()=>{qe(),A=WebGL2RenderingContext,Je=class{gl;canvas;_stateCache;_extDisJointTimerQuery;_queryList;_queryListQueued;constructor(e){this.gl=e,this.canvas=e.canvas,this._stateCache={},this._queryList=[],this._queryListQueued=[],e.getExtension(`EXT_color_buffer_float`),e.getExtension(`EXT_color_buffer_half_float`),e.getExtension(`OES_texture_float_linear`),this._extDisJointTimerQuery=e.getExtension(`EXT_disjoint_timer_query_webgl2`),this._extDisJointTimerQuery||console.warn(`[Renderer] EXT_disjoint_timer_query_webgl2 extension is not supported. GPU timing features will be disabled.`),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)}createTexture(){return new ze(this.gl)}createCubeTexture(){return new Ge(this.gl)}createFrameBuffer(e){return new Ve(this.gl,e)}createCubeFrameBuffer(){return new Ue(this.gl)}createProgram(){return new Fe(this.gl)}_setState(e,t){this._stateCache[e]!==t&&(t?this.gl.enable(e):this.gl.disable(e),this._stateCache[e]=t)}setMaterialState(e,t,n){this._setState(this.gl.CULL_FACE,e),this._setState(this.gl.DEPTH_TEST,t),this.gl.depthMask(n)}setBlendEnabled(e){e?this.gl.enable(this.gl.BLEND):this.gl.disable(this.gl.BLEND)}bindRenderTarget(e,t,n){t?this.gl.viewport(t.x,t.y,t.z,t.w):e?this.gl.viewport(0,0,e.size.x,e.size.y):n&&this.gl.viewport(0,0,n.x,n.y),e?(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,e.getFrameBuffer()),this.gl.drawBuffers(e.textureAttachmentList)):this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}setDrawBuffers(e,t){if(!t){this.gl.drawBuffers(e.textureAttachmentList);return}let n=[];for(let r=0;r<e.textureAttachmentList.length;r++)t.indexOf(r)>-1?n.push(e.textureAttachmentList[r]):n.push(this.gl.NONE);this.gl.drawBuffers(n)}setDepthFunc(e){this.gl.depthFunc(e)}clear(e,t){let n=0;e&&(this.gl.clearColor(e.x,e.y,e.z,e.w),n|=this.gl.COLOR_BUFFER_BIT),t!==null&&(this.gl.clearDepth(t),n|=this.gl.DEPTH_BUFFER_BIT),n!==0&&this.gl.clear(n)}blit(e,t,n,r,i,a){let o=this.gl;o.bindFramebuffer(o.READ_FRAMEBUFFER,e?e.getFrameBuffer():null),a&&o.readBuffer(o.COLOR_ATTACHMENT0),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,t?t.getFrameBuffer():null),a&&t&&o.drawBuffers([o.COLOR_ATTACHMENT0]),o.blitFramebuffer(0,0,n,r,0,0,n,r,o.COLOR_BUFFER_BIT,i?o.LINEAR:o.NEAREST),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null)}draw(e,t,n,r,i){e.use(e=>{e.uploadUniforms(),this.gl.bindVertexArray(t.getVAO());let i=t.indexBuffer,a=this.gl.UNSIGNED_SHORT;i&&i.array&&i.array.BYTES_PER_ELEMENT==4&&(a=this.gl.UNSIGNED_INT),r==`NORMAL`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA):r==`ADD`?this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE):r==`DIFF`&&this.gl.blendFunc(this.gl.ONE_MINUS_DST_COLOR,this.gl.ONE_MINUS_DST_COLOR);let o=this.gl[n];t.instanceCount>0?i?this.gl.drawElementsInstanced(o,t.indexCount,a,0,t.instanceCount):this.gl.drawArraysInstanced(o,0,t.vertCount,t.instanceCount):i?this.gl.drawElements(o,t.indexCount,a,0):this.gl.drawArrays(o,0,t.vertCount),this.gl.bindVertexArray(null)})}collectTimerQueries(){if(!this._extDisJointTimerQuery)return null;if(this.gl.getParameter(this._extDisJointTimerQuery.GPU_DISJOINT_EXT))return this._queryList.forEach(e=>this.gl.deleteQuery(e)),this._queryList.length=0,null;let e=[];if(this._queryListQueued.length>0){let t=this._queryListQueued.length;for(let n=t-1;n>=0;n--){let t=this._queryListQueued[n];if(this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT_AVAILABLE)){let r=this.gl.getQueryParameter(t.query,this.gl.QUERY_RESULT);e.push({name:t.name,duration:r/1e3/1e3}),this._queryList.push(t.query),this._queryListQueued.splice(n,1)}}}return e}}})))()}var Xe,Ze,Qe,$e;function et(){return(et=t((()=>{Xe=(e,t)=>{if(!t)return e;let n=Object.keys(t),r=``;for(let e=0;e<n.length;e++)r+=`#define `+n[e]+` `+t[n[e]]+`
`;return r+=e,r},Ze=(e,t)=>(e=e.replaceAll(`NUM_LIGHT_DIR`,t?t.directional.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_DIR`,t?Math.min(2,t.directional.filter(e=>e.component.castShadow).length).toString():`0`),e=e.replaceAll(`NUM_LIGHT_SPOT`,t?t.spot.length.toString():`0`),e=e.replaceAll(`NUM_SHADOWMAP_SPOT`,t?Math.min(2,t.spot.filter(e=>e.component.castShadow).length).toString():`0`),e),Qe=e=>(e=e.replace(/#pragma\sloop_start\s(\d+)*([\s\S]+?)#pragma\sloop_end/g,(e,t,n)=>{let r=``;for(let e=0;e<Number(t);e++)r+=n.replaceAll(`LOOP_INDEX`,e.toString());return r}),e),$e=(e,t,n)=>(e=Xe(e,t),e=`#version 300 es
precision highp float;
`+e,e=Ze(e,n),e=Qe(e),e)})))()}var tt;function nt(){return(nt=t((()=>{tt=class{listeners;constructor(){this.listeners=[]}on(e,t){this.listeners.push({event:e,cb:t})}once(e,t){this.listeners.push({event:e,cb:t,once:!0})}off(e,t){this.listeners=this.listeners.filter(n=>t==null?n.event!=e:n.event!=e||n.cb!=t)}emit(e,t){let n=this.listeners.concat();for(let r=0;r<n.length;r++){let i=n[r];i.event==e&&(i.cb.apply(this,t||[]),i.once&&this.off(e,i.cb))}}hasEvent(e){return this.listeners.some(t=>t.event==e)}}})))()}var rt;function it(){return(it=t((()=>{(function(e){function t(){let e=crypto.getRandomValues(new Uint8Array(16));e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t=Array.from(e,e=>e.toString(16).padStart(2,`0`)).join(``);return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}e.genUUID=t})(rt||={})})))()}function at(){return(at=t((()=>{nt(),it()})))()}var ot;function st(){return(st=t((()=>{(function(e){let t=e.NEWTON_ITERATIONS=4;e.NEWTON_MIN_SLOPE=.001,e.SUBDIVISION_PRECISION=1e-7;let n=e.SUBDIVISION_MAX_ITERATIONS=10,r=e.BEZIER_EASING_CACHE_SIZE=11,i=e.BEZIER_EASING_SAMPLE_STEP_SIZE=1/r;function a(e){return-e.p0+3*e.p1-3*e.p2+e.p3}function o(e){return 3*e.p0-6*e.p1+3*e.p2}function s(e){return-3*e.p0+3*e.p1}function c(e,t){return 3*a(e)*t*t+2*o(e)*t+s(e)}e.calcBezierSlope=c;function l(e,t){return((a(e)*t+o(e))*t+s(e))*t+e.p0}e.calcBezier=l;function u(e,t,r,i){let a=0,o=0;for(let s=0;s<n;s++)o=t+(r-t)/2,a=l(i,o),a>e?r=o:t=o;return o}function d(e,n,r){for(let i=0;i<t;i++){let t=c(n,r);if(t==0)return r;let i=l(n,r)-e;r-=i/t}return r}function f(e,t,n){e.p1=Math.max(e.p0,Math.min(e.p3,e.p1)),e.p2=Math.max(e.p0,Math.min(e.p3,e.p2));let a=0;for(let e=1;e<n.length&&(a=e-1,!(t<n[e]));e++);let o=a/(r-1),s=c(e,o)/(e.p3-e.p0);return s==0?o:s>.01?d(t,e,o):u(t,o,o+i,e)}e.getBezierTfromX=f})(ot||={})})))()}function ct(e,t,n,r){let i=Array(ot.BEZIER_EASING_CACHE_SIZE);for(let a=0;a<ot.BEZIER_EASING_CACHE_SIZE;++a)i[a]=ot.calcBezier({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a/(ot.BEZIER_EASING_CACHE_SIZE-1));return a=>a<=e.x?e.y:r.x<=a?r.y:ot.calcBezier({p0:e.y,p1:t.y,p2:n.y,p3:r.y},ot.getBezierTfromX({p0:e.x,p1:t.x,p2:n.x,p3:r.x},a,i))}function lt(){return(lt=t((()=>{st()})))()}var ut;function dt(){return(dt=t((()=>{(function(e){e.number=(e,t,n)=>e+(t-e)*n,e.vector=(e,t,n)=>e.lerp(t,n)})(ut||={})})))()}function ft(){return(ft=t((()=>{at(),lt(),dt()})))()}var pt;function mt(){return(mt=t((()=>{at(),pt=class extends tt{keyframes=[];cache={frame:NaN,value:NaN};frameStart;frameEnd;frameDuration;constructor(e){super(),this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes=[],e.forEach(e=>{this.addKeyFrame(e)}))}addKeyFrame(e){let t=0;for(let n=0;n<this.keyframes.length&&this.keyframes[n].coordinate.x<e.coordinate.x;n++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let n=0;n<this.keyframes.length;n++){let r=this.keyframes[n];if(e<r.coordinate.x){let i=this.keyframes[n-1];t=i?i.to(r,e):r.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t===null?0:(this.cache={frame:e,value:t},t)}}})))()}var ht;function gt(){return(gt=t((()=>{at(),k(),ht=class extends tt{name;curves;frameStart;frameEnd;frameDuration;updatedFrame=-1;value;constructor(e,t,n,r,i){super(),this.name=e||``,this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curves=new Map,this.value=new D,t&&this.setFCurve(t,`x`),n&&this.setFCurve(n,`y`),r&&this.setFCurve(r,`z`),i&&this.setFCurve(i,`w`)}setFCurve(e,t){this.curves.set(t,e);let n=1/0,r=-1/0;this.curves.forEach(e=>{e.frameStart<n&&(n=e.frameStart),e.frameEnd>r&&(r=e.frameEnd)}),(n==-1/0||r==1/0)&&(n=0,r=1),this.frameStart=n,this.frameEnd=r,this.frameDuration=this.frameEnd-this.frameStart}getFCurve(e){return this.curves.get(e)||null}setFrame(e){if(e==this.updatedFrame)return this;let t=this.curves.get(`x`),n=this.curves.get(`y`),r=this.curves.get(`z`),i=this.curves.get(`w`);return t&&(this.value.x=t.getValue(e)),n&&(this.value.y=n.getValue(e)),r&&(this.value.z=r.getValue(e)),i&&(this.value.w=i.getValue(e)),this.updatedFrame=e,this}}})))()}var _t;function vt(){return(vt=t((()=>{at(),lt(),_t=class extends tt{coordinate={x:0,y:0};handleLeft={x:0,y:0};handleRight={x:0,y:0};interpolation=`BEZIER`;easing=null;nextFrame=null;constructor(e,t,n,r){super(),this.set(e,t,n,r)}set(e,t,n,r){this.coordinate=e,this.handleLeft=t||e,this.handleRight=n||e,this.interpolation=r||`BEZIER`}getEasing(e,t){return e==`BEZIER`?ct(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):e==`CONSTANT`?()=>this.coordinate.y:e=>{let n=t.coordinate.y-this.coordinate.y;return e=(e-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+e*n}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}}})))()}function yt(e){let t=[],n=0;for(let[r,i]of e){n+=i[0];let e,a;i.length>=4&&(e={x:i[2],y:i[3]}),i.length>=6&&(a={x:i[4],y:i[5]}),t.push(new _t({x:n,y:i[1]},e,a,bt[r]))}return t}var bt;function xt(){return(xt=t((()=>{vt(),bt=[`LINEAR`,`CONSTANT`,`BEZIER`]})))()}var St;function Ct(){return(Ct=t((()=>{at(),mt(),gt(),xt(),St=class e extends tt{static gltfLoaderFactory=null;_engine;connection;frame;nodes;curveGroups;root;gltf;currentScene;constructor(e,t){super(),this._engine=e,this.root=null,this.nodes=[],this.curveGroups=[],this.currentScene=null,this.frame={start:0,end:100,current:0,fps:30,playing:!1},t&&this.connect(t)}connect(e,t){}disconnect(){}binaryStringToArrayBuffer(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t[n]=r}return t.buffer}async loadScene(t,n){this.currentScene=t,n&&(e.gltfLoaderFactory?await e.gltfLoaderFactory(this._engine).load(n).then(e=>{this.gltf=e,this.emit(`gltfLoaded`,[e])}):console.warn(`BLidge: gltfLoaderFactory not wired`)),await new Promise(e=>{setTimeout(()=>{e(null)},100)}),this.frame.start=t.frame.start,this.frame.end=t.frame.end,this.frame.fps=t.frame.fps,this.curveGroups=[],this.nodes=[];let r=[];for(let e of t.fcurves)r.push(new pt(yt(e.k)));for(let e=0;e<t.animations.length;e++){let n=new ht(String(e));for(let i of t.animations[e])n.setFCurve(r[i],t.fcurves[i].axis);this.curveGroups.push(n)}this.nodes=[];let i=e=>{let t={name:e.name,children:[],animations:e.animation||{},position:e.position||[0,0,0],rotation:e.rotation||[0,0,0],scale:e.scale||[1,1,1],uniforms:e.uniforms||{},type:e.type||`empty`,visible:e.visible!==!1},n=e.param;return t.param=n&&`position`in n?{position:new Float32Array(this.binaryStringToArrayBuffer(atob(n.position))),normal:new Float32Array(this.binaryStringToArrayBuffer(atob(n.normal))),uv:new Float32Array(this.binaryStringToArrayBuffer(atob(n.uv))),index:new Uint16Array(this.binaryStringToArrayBuffer(atob(n.index)))}:n,e.children&&e.children.forEach(e=>{t.children.push(i(e))}),this.nodes.push(t),t};this.root=i(t.root),this.emit(`sync/scene`,[this]),this.onSyncTimeline(this.frame)}onSyncTimeline(e){this.frame=e,this.emit(`sync/timeline`,[this.frame])}onOpen(e){}onMessage(e){}onClose(e){this.disconnect()}getCurveGroup(e){return this.curveGroups[e]}setFrame(e){this.onSyncTimeline({...this.frame,playing:!0,current:e})}get gltfPrm(){return this.gltf?Promise.resolve(this.gltf):new Promise(e=>{this.on(`gltfLoaded`,t=>{e(t)})})}dispose(){this.disconnect()}}})))()}var wt,Tt;function Et(){return(Et=t((()=>{at(),wt=(e,t)=>{if(typeof e==`number`){let n=e;return t.int&&(n=Math.round(n)),t.min!==void 0&&(n=Math.max(t.min,n)),t.max!==void 0&&(n=Math.min(t.max,n)),n}if(Array.isArray(e)){if(!e.every(e=>typeof e==`number`))return e;let n=[];for(let r of e)n.push(wt(r,t));return n}return e},Tt=class extends tt{uuid;initiator;fields_;constructor(){super(),this.uuid=rt.genUUID(),this.fields_=new Map,this.initiator=`script`}restoreUUID(e){this.uuid=e}serialize(e){e||={mode:`view`};let t={};return this.fields_.forEach((n,r)=>{let i=this.getFieldOpt(r);e.mode==`export`&&i&&i&&i.noExport||(t[r]=n.get(e))}),t}serializeToDirectory(){return(e=>{let t={type:`folder`,childs:{},opt:{}},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=this.getFieldOpt(i);if(!i)continue;let o=t,s=i.split(`/`);for(let e=0;e<s.length;e++){let t=s[e];t&&o.type!=`value`&&(o.childs[t]||(e==s.length-1?o.childs[t]={type:`value`,value:null,opt:a}:o.childs[t]={type:`folder`,childs:{},opt:a}),o=o.childs[t])}o.type==`value`&&(o.value=e[i])}return t})(this.serialize())}deserialize(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let r=t[n],i=this.fields_.get(r);i&&i.set(e[r])}}exportEditor(){this.serialize({mode:`export`})}field(e,t,n,r){let i=typeof n==`function`?n:void 0,a=typeof n==`object`&&n||r||{};i||(a.readOnly=!0,a.noExport=!0);let o=e.startsWith(`/`)?e.slice(1):e;this.fields_.set(o,{get:t,set:(t=>{i&&i(wt(t,a)),this.noticeField(e)}),opt:a})}fieldDir(e,t){let n=e;return this.field(n+`/`,()=>null,void 0,{...t,isFolder:!0}),{dir:e=>this.fieldDir(`${n}/${e}`),field:(e,t,r,i)=>{this.field(`${n}/${e}`,t,r,i)}}}removeField(e){let t=e.startsWith(`/`)?e.slice(1):e;this.fields_.delete(t)}setField(e,t){let n=this.fields_.get(e);if(!n)throw Error(`Unknown field path: ${e}`);n.set(t)}getField(e,t){let n=this.fields_.get(e);if(n)return t||={mode:`view`},n.get(t)}getFieldOpt(e){let t=this.fields_.get(e);if(t)return t.opt}noticeField(e){this.emit(`fields/update/`+e),this.emit(`fields/update`,[[e]])}}})))()}var j;function Dt(){return(Dt=t((()=>{Et(),j=class extends Tt{disableEdit;order;_entity;_engine;_enabled;_tag;_disposed;constructor(e){super(),this.disableEdit=!1,this._entity=e.entity,this._engine=e.engine,this._enabled=!0,this._disposed=!1,this._tag=``,this.order=0,this.field(`enabled`,()=>this.enabled,e=>this.enabled=e,{hidden:!0,noExport:!0}),this.field(`tag`,()=>this.tag,e=>this._tag=e,{readOnly:!0,noExport:!0,hidden:e=>e==``})}get tag(){return this._tag}get entity(){return this._entity}get engine(){return this._engine}set enabled(e){this._enabled=e}get enabled(){return this._enabled}update(e){this.enabled&&this.updateImpl(e)}updateImpl(e){}postUpdate(e){this.enabled&&this.postUpdateImpl(e)}postUpdateImpl(e){}prepareRender(e){this.enabled&&this.prepareRenderImpl(e)}prepareRenderImpl(e){}commitFrame(e){this.enabled&&this.commitFrameImpl(e)}commitFrameImpl(e){}dispose(){this._disposed=!0,this.emit(`dispose`)}}})))()}var Ot;function kt(){return(kt=t((()=>{k(),Et(),Ot=class extends Tt{vertCount;attributes;boundingBox;updateVersion;constructor(){super(),this.vertCount=0,this.attributes=new Map,this.boundingBox=null,this.updateVersion=0}setAttribute(e,t,n,r){return this.attributes.set(e,{array:t,size:n,opt:r}),this.updateVersion++,this.updateVertCount(),e===`position`&&this.computeBoundingBox(),this}getAttribute(e){return this.attributes.get(e)}updateVertCount(){this.vertCount=this.attributes.size>0?1/0:0,this.attributes.forEach((e,t)=>{t==`index`||e.opt&&e.opt.instanceDivisor||(this.vertCount=Math.min(e.array.length/e.size,this.vertCount))})}computeBoundingBox(){let e=this.attributes.get(`position`);if(!e){this.boundingBox=null;return}let t=e.array,n=new D(1/0,1/0,1/0),r=new D(-1/0,-1/0,-1/0);for(let e=0;e<t.length;e+=3){let i=t[e],a=t[e+1],o=t[e+2];i<n.x&&(n.x=i),a<n.y&&(n.y=a),o<n.z&&(n.z=o),i>r.x&&(r.x=i),a>r.y&&(r.y=a),o>r.z&&(r.z=o)}this.boundingBox={min:n,max:r}}requestUpdate(){this.updateVersion++}}})))()}var At;function jt(){return(jt=t((()=>{kt(),At=class extends Ot{constructor(e){super();let t=[],n=[],r=[],i=[],a=[],{width:o,height:s,depth:c,segmentsWidth:l,segmentsHeight:u,segmentsDepth:d}={width:1,height:1,depth:1,segmentsWidth:1,segmentsHeight:1,segmentsDepth:1,...e},f=[{normal:[0,0,1],dir:[1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[0,0,-1],dir:[-1,0,0],up:[0,1,0],w:o,h:s,d:c,segW:l,segH:u},{normal:[1,0,0],dir:[0,0,-1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[-1,0,0],dir:[0,0,1],up:[0,1,0],w:c,h:s,d:o,segW:d,segH:u},{normal:[0,1,0],dir:[-1,0,0],up:[0,0,1],w:o,h:c,d:s,segW:l,segH:d},{normal:[0,-1,0],dir:[-1,0,0],up:[0,0,-1],w:o,h:c,d:s,segW:l,segH:d}],p=0;for(let e of f){let o=e.normal,s=e.dir,c=e.up,l=e.segW,u=e.segH,d=e.w/2,f=e.h/2,m=e.d/2,h=e.w/l,g=e.h/u;for(let e=0;e<=u;e++)for(let _=0;_<=l;_++){let v=-d+_*h,y=-f+e*g,b=-m,x=_/l,S=e/u,C=v*-s[0]+y*c[0]+b*-o[0],ee=v*-s[1]+y*c[1]+b*-o[1],w=v*-s[2]+y*c[2]+b*-o[2];if(t.push(C,ee,w),n.push(...o),r.push(x,S),a.push(e/u*c[1]+Math.max(0,c[2])),e<u&&_<l){let t=p+e*(l+1)+_,n=p+(e+1)*(l+1)+_,r=p+(e+1)*(l+1)+(_+1),a=p+e*(l+1)+(_+1);i.push(t,n,a),i.push(n,r,a)}}p+=(l+1)*(u+1)}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`posY`,new Float32Array(a),1),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var Mt;function Nt(){return(Nt=t((()=>{k(),kt(),Mt=class extends Ot{constructor(e){super();let t=[],n=[],r=[],i=[],{height:a,radiusTop:o,radiusBottom:s,radSegments:c,heightSegments:l,caps:u}={height:1,radiusTop:1,radiusBottom:1,radSegments:8,heightSegments:1,caps:!0,...e};for(let e=0;e<=l+2;e++)for(let d=0;d<=c;d++){let f=Math.PI*2/c*d;if(e<=l){let u=1-e/l,p=(1-u)*o+u*s,m=Math.cos(f)*p,h=-(a/2)+a/l*e,g=Math.sin(f)*p;t.push(m,h,g),r.push(d/c,e/l);let _=new D(Math.cos(f),0,Math.sin(f)).normalize();if(n.push(_.x,_.y,_.z),e<l){let t=c+1;i.push(e*t+d,(e+1)*t+(d+1)%t,e*t+(d+1)%t,e*t+d,(e+1)*t+d,(e+1)*t+(d+1)%t)}}else{if(!u)continue;let p=e-l-1,m=p?o:s,h=Math.cos(f)*m,g=-(a/2)+a*p,_=Math.sin(f)*m;t.push(h,g,_),r.push((h+m)*.5/m,(_+m)*.5/m),n.push(0,-1+p*2,0);let v=(c+1)*(l+(p+1));d<=c-2&&(p==0?i.push(v,v+d,v+d+1):i.push(v,v+d+1,v+d))}}this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var Pt;function Ft(){return(Ft=t((()=>{kt(),Pt=class extends Ot{constructor(e){super();let{width:t,height:n,widthSegments:r,heightSegments:i,floor:a}={width:1,height:1,widthSegments:1,heightSegments:1,...e},o=t/2,s=n/2,c=[],l=[],u=[],d=[];for(let e=0;e<=i;e++)for(let f=0;f<=r;f++){let p=f/r,m=e/i;if(a?(c.push(-o+t*p,0,s-n*m),l.push(0,1,0)):(c.push(-o+t*p,-s+n*m,0),l.push(0,0,1)),u.push(p,m),e>0&&f>0){let t=r+1,n=t*e+f,i=t*(e-1)+f-1;d.push(n,t*e+f-1,i,n,i,t*(e-1)+f)}}this.setAttribute(`position`,new Float32Array(c),3),this.setAttribute(`normal`,new Float32Array(l),3),this.setAttribute(`uv`,new Float32Array(u),2),this.setAttribute(`index`,new Uint16Array(d),1)}}})))()}var It;function Lt(){return(Lt=t((()=>{k(),kt(),It=class extends Ot{constructor(e){super();let t=[],n=[],r=[],i=[],{radius:a,widthSegments:o,heightSegments:s}={radius:.5,widthSegments:8,heightSegments:8,...e};for(let e=0;e<=s;e++){let c=e/s*Math.PI;for(let l=0;l<=o;l++){let u=l/o*Math.PI*2,d=Math.sin(c)*a,f=Math.cos(u)*d,p=-Math.cos(c)*a,m=-Math.sin(u)*d;t.push(f,p,m),r.push(l/o,e/s);let h=new D(f,p,m).normalize();if(n.push(h.x,h.y,h.z),l<o&&e<s){let t=o+1;i.push(e*t+l,e*t+(l+1)%t,(e+1)*t+(l+1)%t,e*t+l,(e+1)*t+(l+1)%t,(e+1)*t+l)}}}for(let e=0;e<i.length;e++)i[e]=Math.min(t.length/3-1,i[e]);this.setAttribute(`position`,new Float32Array(t),3),this.setAttribute(`normal`,new Float32Array(n),3),this.setAttribute(`uv`,new Float32Array(r),2),this.setAttribute(`index`,new Uint16Array(i),1)}}})))()}var Rt;function zt(){return(zt=t((()=>{k(),Dt(),Rt=class extends j{cameraType;fov;aspect;near;far;orthHeight;projectionMatrix;viewMatrix;projectionMatrixPrev;viewMatrixPrev;_historyInitialized;needsUpdateProjectionMatrix;displayOut;viewPort;dofParams;focusEnabled;focusMode;focusTarget;_focusTargetUUID;focusManualDistance;focusSpeed;_focusCurrent;_tmpVector1;_tmpVector2;constructor(e){super(e),this.cameraType=`perspective`,this.viewMatrix=new O,this.projectionMatrix=new O,this.viewMatrixPrev=new O,this.projectionMatrixPrev=new O,this._historyInitialized=!1,this.viewPort=null,this.fov=50,this.near=.1,this.far=1e3,this.aspect=1,this.orthHeight=1,this.needsUpdateProjectionMatrix=!0,this.displayOut=!0,this.dofParams={focusDistance:.5,kFilmHeight:.024,fNumber:.3};let t=()=>{this.needsUpdateProjectionMatrix=!0};this.field(`cameraType`,()=>this.cameraType,e=>{this.cameraType=e,t()},{format:{type:`select`,list:[`perspective`,`orthographic`]}}),this.field(`fov`,()=>this.fov,e=>{this.fov=e,t()}),this.field(`near`,()=>this.near,e=>{this.near=e,t()}),this.field(`far`,()=>this.far,e=>{this.far=e,t()}),this.field(`orthHeight`,()=>this.orthHeight,e=>{this.orthHeight=e,t()}),this.focusEnabled=!0,this.focusMode=`auto`,this.focusTarget=null,this._focusTargetUUID=null,this.focusManualDistance=5,this.focusSpeed=8,this._focusCurrent=null,this._tmpVector1=new D,this._tmpVector2=new D;let n=this.fieldDir(`focus`);n.field(`mode`,()=>this.focusMode,e=>{this.focusMode=e},{format:{type:`select`,list:[`auto`,`target`,`manual`]}}),n.field(`target`,()=>this._focusTargetUUID,e=>{this._focusTargetUUID=e||null,this.focusTarget=null},{format:{type:`entity`}}),n.field(`distance`,()=>this.focusManualDistance,e=>{this.focusManualDistance=e},{step:.1}),n.field(`speed`,()=>this.focusSpeed,e=>{this.focusSpeed=e},{step:.5}),n.field(`fNumber`,()=>this.dofParams.fNumber,e=>{this.dofParams.fNumber=e},{step:.05}),this._tag=`camera`}updateProjectionMatrix(){this.cameraType==`perspective`?this.projectionMatrix.perspective(this.fov,this.aspect,this.near,this.far):this.projectionMatrix.orthographic(this.orthHeight*this.aspect,this.orthHeight,this.near,this.far),this.needsUpdateProjectionMatrix=!1}updateViewMatrix(){this.viewMatrix.copy(this.entity.matrixWorld).inverse()}updateImpl(e){if(this._resolveFocusTarget(),this.displayOut){let t=e.resolution.x/e.resolution.y;this.aspect!==t&&(this.aspect=t,this.needsUpdateProjectionMatrix=!0)}}prepareRenderImpl(e){this.updateViewMatrix(),this.needsUpdateProjectionMatrix&&this.updateProjectionMatrix(),this.focusEnabled&&this._updateFocus(e),this._historyInitialized||=(this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix),!0)}_resolveFocusTarget(){if(!this._focusTargetUUID||this.focusTarget)return;let e=this.entity.getRootEntity();this.focusTarget=e.findEntityByUUID(this._focusTargetUUID)||null}_updateFocus(e){let t=this._calcFocusDistance(e);t!==null&&(this._focusCurrent===null||this.focusSpeed<=0?this._focusCurrent=t:this._focusCurrent+=(t-this._focusCurrent)*(1-Math.exp(-this.focusSpeed*e.timeDelta)),this.dofParams.focusDistance=this._focusCurrent)}_calcFocusDistance(e){if(this.focusMode===`manual`)return this.focusManualDistance;if(this.focusMode===`auto`){let t=e.renderer.centerDepth;if(typeof t==`number`)return t}if(!this.focusTarget)return null;this.entity.matrixWorld.decompose(this._tmpVector1),this.focusTarget.matrixWorld.decompose(this._tmpVector2),this._tmpVector2.sub(this._tmpVector1);let t=this.entity.matrixWorld.elm;return this._tmpVector1.set(t[8],t[9],t[10]).normalize(),-this._tmpVector2.dot(this._tmpVector1)}commitFrameImpl(e){this.viewMatrixPrev.copy(this.viewMatrix),this.projectionMatrixPrev.copy(this.projectionMatrix)}}})))()}var Bt;function Vt(){return(Vt=t((()=>{k(),zt(),Bt=class extends Rt{viewMatrixOffset;constructor(e){super(e),this.viewMatrixOffset=new Oe().setFromEuler({x:-Math.PI/2,y:0,z:0}),this.near=.1,this.far=100,this.displayOut=!1,this.focusEnabled=!1,this.removeField(`focus/`),this.removeField(`focus/mode`),this.removeField(`focus/target`),this.removeField(`focus/distance`),this.removeField(`focus/speed`)}prepareRenderImpl(e){super.prepareRenderImpl(e),this.viewMatrix.copy(this.entity.matrixWorld).applyQuaternion(this.viewMatrixOffset).inverse()}}})))()}var Ht;function Ut(){return(Ut=t((()=>{k(),Vt(),Ht=class extends Bt{lightType;color;intensity;castShadow;shadowMapSize;shadowDistance;_shadowCenter;_shadowDirection;_shadowUp;_origin;angle;blend;distance;constructor(e){super(e),this.lightType=`spot`,this.cameraType=`perspective`,this.color=new D(1,1,1,0),this.intensity=1,this.castShadow=!0,this.shadowMapSize=new D(1024,1024),this.shadowDistance=30,this._shadowCenter=new D,this._shadowDirection=new D,this._shadowUp=new D,this._origin=new D,this.angle=Math.PI*.5,this.blend=1,this.distance=100,this.field(`lightType`,()=>this.lightType,e=>this.lightType=e,{format:{type:`select`,list:[`directional`,`spot`]}}),this.field(`color`,()=>this.color.getElm(`vec3`),e=>this.color.setFromArray(e),{format:{type:`color`}}),this.field(`castShadow`,()=>this.castShadow,e=>this.castShadow=e),this.field(`angle`,()=>this.angle,e=>{this.angle=e,this.needsUpdateProjectionMatrix=!0}),this.field(`blend`,()=>this.blend,e=>this.blend=e),this.field(`distance`,()=>this.distance,e=>{this.distance=e,this.needsUpdateProjectionMatrix=!0}),this.removeField(`far`),this.field(`shadowDistance`,()=>this.shadowDistance,e=>this.shadowDistance=e),this.field(`intensity`,()=>this.intensity,e=>this.intensity=e),this.updateProjectionMatrix()}updateProjectionMatrix(){this.fov=this.angle/Math.PI*180,this.far=this.distance,super.updateProjectionMatrix()}prepareRenderImpl(e){this.lightType!==`directional`&&super.prepareRenderImpl(e)}fitShadowToCamera(e,t){let n=e.near,r=Math.max(Math.min(e.far,this.shadowDistance),n+.01),i,a;if(e.cameraType===`perspective`){let t=Math.tan(e.fov*Math.PI/360),o=t*t*(1+e.aspect*e.aspect);i=n*n*o,a=r*r*o}else{let t=e.orthHeight/2;i=t*t*(1+e.aspect*e.aspect),a=i}let o=(r*r-n*n+a-i)/(2*(r-n));o=Math.min(Math.max(o,n),r);let s=o-n,c=r-o,l=Math.sqrt(Math.max(s*s+i,c*c+a));this._shadowCenter.set(0,0,-o,1).applyMatrix4(e.entity.matrixWorld),this._shadowDirection.set(0,1,0,0).applyMatrix4(this.entity.matrixWorld).normalize().multiply(-1),this._shadowUp.set(0,0,-1,0).applyMatrix4(this.entity.matrixWorld).normalize(),this.viewMatrix.lookAt(this._origin,this._shadowDirection,this._shadowUp).inverse();let u=l*2/t;this._shadowCenter.applyMatrix4(this.viewMatrix);let d=l,f=this.viewMatrix.elm;f[12]=-Math.round(this._shadowCenter.x/u)*u,f[13]=-Math.round(this._shadowCenter.y/u)*u,f[14]=-(this._shadowCenter.z+l+d),this.near=0,this.far=l*2+d,this.projectionMatrix.orthographic(l*2,l*2,this.near,this.far)}lookAt(e){this.entity.lookAt(e),this.entity.quaternion.multiply(new Oe().setFromEuler(new Ee(Math.PI/2)))}}})))()}var Wt,M;function Gt(){return(Gt=t((()=>{Dt(),kt(),Wt=new Ot,M=class extends j{geometry;material;instanceCount;constructor(e){super(e);let t=e.args||{};this.geometry=t.geometry||Wt,this.material=t.material||null,this.instanceCount=t.instanceCount||1}}})))()}var Kt;function qt(){return(qt=t((()=>{Dt(),jt(),Nt(),Ft(),Lt(),kt(),zt(),Ut(),Gt(),Kt=class extends j{node;rotationOffsetX;animations;uniforms;uniformCurves;transformAutoUpdate;_blidge;_lightComponent;constructor(e){super(e),this.rotationOffsetX=0,this.animations=new Map,this.uniforms={},this.uniformCurves=new Map,this.transformAutoUpdate=!0,this._blidge=e.args.blidge,this.node=e.args.node,this.node.type==`camera`&&(this.rotationOffsetX=-Math.PI/2);let t=Object.keys(this.node.animations);for(let e=0;e<t.length;e++){let n=t[e];this.animations.set(n,this._blidge.getCurveGroup(this.node.animations[n]))}let n=Object.keys(this.node.uniforms);for(let e=0;e<n.length;e++){let t=n[e],r=this.node.uniforms[t],i=this._blidge.curveGroups[r];i&&(this.uniformCurves.set(t,i),this.uniforms[t]={type:`4fv`,value:i.value})}let r=this.entity;if(r.name=this.node.name,r.position.set(this.node.position[0],this.node.position[1],this.node.position[2]),r.quaternion.setFromEuler({x:this.node.rotation[0]+this.rotationOffsetX,y:this.node.rotation[1],z:this.node.rotation[2]},`YZX`),r.quaternion.updated=!1,r.euler.setFromQuaternion(r.quaternion),r.scale.set(this.node.scale[0],this.node.scale[1],this.node.scale[2]),this.node.type==`cube`){let e=r.addComponent(M),t=this.node.param;e.geometry=new At({width:t.x,height:t.y,depth:t.z,segmentsWidth:10,segmentsHeight:10,segmentsDepth:10})}else if(this.node.type==`sphere`){let e=r.addComponent(M),t=this.node.param;e.geometry=new It({radius:t.r,widthSegments:32,heightSegments:16})}else if(this.node.type==`cylinder`){let e=r.addComponent(M);e.geometry=new Mt}else if(this.node.type==`plane`){let e=r.addComponent(M),t=this.node.param;e.geometry=new Pt({width:t.x,height:t.y})}else if(this.node.type==`mesh`){let e=r.addComponent(M),t=this.node.param,n=new Ot;n.setAttribute(`position`,t.position,3),n.setAttribute(`uv`,t.uv,2),n.setAttribute(`normal`,t.normal,3),n.setAttribute(`index`,t.index,3),e.geometry=n}else if(this.node.type==`gltf`){let e=r.addComponent(M);this._blidge.gltfPrm.then(t=>{let n=t.scene.findEntityByName(this.node.name);if(n){let t=n.getComponent(M);t&&(e.geometry=t.geometry,e.material||=t.material)}})}if(this.node.type==`camera`){let e=e=>{e.fov=this.node.param.fov,e.needsUpdateProjectionMatrix=!0},t=r.getComponentsByTag(`camera`)[0];t&&e(t);let n=t=>{t instanceof Rt&&e(t)};r.on(`componentAdded`,n),this.once(`dispose`,()=>{r.off(`componentAdded`,n)})}if(this.node.type==`light`){let e=this.node.param;this._lightComponent=r.addComponent(Ht);let t={lightType:e.type,color:[e.color.x,e.color.y,e.color.z],intensity:e.intensity,castShadow:e.shadow_map};e.type==`spot`&&(t.angle=e.angle,t.blend=e.blend),this._lightComponent.deserialize(t)}r.visible=this.node.visible}updateImpl(e){if(!this._blidge||!this.node)return;let t=e.timeCode*this._blidge.frame.fps;if(this.animations.forEach(e=>{e.setFrame(t)}),this.transformAutoUpdate){let e=this.animations.get(`position`);if(e){let t=e.value;e.getFCurve(`x`)&&(this.entity.position.x=t.x),e.getFCurve(`y`)&&(this.entity.position.y=t.y),e.getFCurve(`z`)&&(this.entity.position.z=t.z)}let n=this.animations.get(`rotation`);if(n){let e={x:this.node.rotation[0],y:this.node.rotation[1],z:this.node.rotation[2]},t=n.value;n.getFCurve(`x`)&&(e.x=t.x),n.getFCurve(`y`)&&(e.y=t.y),n.getFCurve(`z`)&&(e.z=t.z),this.entity.quaternion.setFromEuler({x:e.x+this.rotationOffsetX,y:e.y,z:e.z},`YZX`)}let r=this.animations.get(`scale`);if(r){let e=r.setFrame(t).value;r.getFCurve(`x`)&&(this.entity.scale.x=e.x),r.getFCurve(`y`)&&(this.entity.scale.y=e.y),r.getFCurve(`z`)&&(this.entity.scale.z=e.z)}}let n=this.animations.get(`hide`);if(n&&(this.entity.visible=n.value.x<.5),this._lightComponent){let e=this.animations.get(`color`);e&&this._lightComponent.color.copy(e.setFrame(t).value);let n=this.animations.get(`power`);n&&(this._lightComponent.intensity=n.value.x)}this.uniformCurves.forEach((e,n)=>{this.uniforms[n].value=e.setFrame(t).value})}}})))()}function Jt(){return(Jt=t((()=>{Dt(),qt()})))()}function Yt(){return(Yt=t((()=>{Dt()})))()}var Xt;function Zt(){return(Zt=t((()=>{k(),Et(),Xt=class extends Tt{name;position;euler;quaternion;scale;matrix;matrixWorld;matrixWorldPrev;_matrixWorldHistoryInitialized;autoMatrixUpdate;parent;children;components;componentsSorted;visible;renderHidden;editorHidden;cloneSource;userData;unresolvedComponents;_engine;constructor(e){super(),this._engine=e.engine,this.name=e.name??``,this.position=new D(0,0,0,1),this.euler=new Ee,this.quaternion=new Oe(0,0,0,1),this.scale=new D(1,1,1),this.matrix=new O,this.matrixWorld=new O,this.matrixWorldPrev=new O,this._matrixWorldHistoryInitialized=!1,this.autoMatrixUpdate=!0,this.parent=null,this.children=[],this.components=new Map,this.componentsSorted=[],this.visible=!0,this.renderHidden=!1,this.editorHidden=!1,this.cloneSource=null,this.userData={},this.unresolvedComponents=[],this.field(`name`,()=>this.name,e=>this.name=e),this.field(`position`,()=>this.position.getElm(`vec3`),e=>this.position.setFromArray(e),{format:{type:`vector`}}),this.field(`euler`,()=>this.euler.getElm(`vec3`),e=>this.euler.setFromArray(e),{format:{type:`vector`}}),this.field(`scale`,()=>this.scale.getElm(`vec3`),e=>this.scale.setFromArray(e),{format:{type:`vector`}}),this.field(`visible`,()=>this.visible,e=>this.visible=e),this.field(`children`,()=>this.children.map(e=>e.uuid),{hidden:!0}),this.field(`components`,()=>{let e=[];return this.components.forEach(t=>e.push(t.uuid)),e},{hidden:!0})}get engine(){return this._engine}update(e){let t={...e};t.matrix=this.matrixWorld,this.updateImpl(e);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].update(t);this.autoMatrixUpdate&&this.updateMatrix();for(let e=0;e<this.children.length;e++)this.children[e].update(t)}updateImpl(e){}postUpdate(e){let t={...e,matrix:this.matrixWorld};for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].postUpdate(t);for(let e=0;e<this.children.length;e++)this.children[e].postUpdate(t)}prepareRender(e){let t={...e,matrix:this.matrixWorld};this._matrixWorldHistoryInitialized||=(this.matrixWorldPrev.copy(this.matrixWorld),!0);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].prepareRender(t);for(let e=0;e<this.children.length;e++)this.children[e].prepareRender(t)}commitFrame(e){let t={...e,matrix:this.matrixWorld};this.matrixWorldPrev.copy(this.matrixWorld);for(let e=0;e<this.componentsSorted.length;e++)this.componentsSorted[e].commitFrame(t);for(let e=0;e<this.children.length;e++)this.children[e].commitFrame(t)}add(e){e.parent&&e.parent.remove(e),e.parent=this,this.children.push(e),this.noticeField(`children`)}remove(e){this.children=this.children.filter(t=>t.uuid!=e.uuid),this.noticeField(`children`)}updateMatrix(e){this.parent&&e&&this.parent.updateMatrix(!0);let t=this.parent?this.parent.matrixWorld:new O;this.quaternion.updated?this.euler.setFromQuaternion(this.quaternion):this.quaternion.setFromEuler(this.euler),this.quaternion.updated=!1,this.matrix.setFromTransform(this.position,this.quaternion,this.scale),this.matrixWorld.copy(this.matrix).preMultiply(t)}updateMatrixRecursive(e){this.autoMatrixUpdate&&this.updateMatrix(e);for(let e=0;e<this.children.length;e++)this.children[e].updateMatrixRecursive()}decomposeMatrix(e){e.decompose(this.position,this.quaternion,this.scale),this.updateMatrix()}applyMatrix(e){this.decomposeMatrix(this.matrix.clone().multiply(e))}lookAt(e){let t=e.clone(),n=new D(0,1,0,0);if(this.parent){let e=this.parent.matrixWorld.clone().inverse();t.applyMatrix4AsPosition(e),n.applyMatrix4AsDirection(e).normalize()}let r=new O().lookAt(this.position,t,n);this.quaternion.setFromMatrix(r),this.updateMatrix()}addComponent(e,...t){this.removeComponent(e);let[n]=t,r=new e({entity:this,engine:this._engine,args:n||{}});return this.components.set(e,r),this.componentsSorted.push(r),this.componentsSorted.sort((e,t)=>e.order-t.order),this.noticeField(`components`),this.emit(`componentAdded`,[r]),r}removeComponent(e){let t=this.components.get(e);t&&t.dispose(),this.components.delete(e),this.componentsSorted=this.componentsSorted.filter(e=>e!==t),this.noticeField(`components`),t&&this.emit(`componentRemoved`,[t])}removeComponentByUUID(e){for(let t of this.components){let n=t[0],r=t[1];if(r.uuid===e)return r.dispose(),this.components.delete(n),this.componentsSorted=this.componentsSorted.filter(e=>e!==r),this.noticeField(`components`),this.emit(`componentRemoved`,[r]),r}}getComponent(e){return this.components.get(e)}getComponentByUUID(e){for(let t of this.components.values())if(t.uuid===e)return t;return null}getComponentByTag(e){for(let t of this.components.values())if(t.tag===e)return t;return null}getComponentsByTag(e){let t=[];return this.components.forEach(n=>{n.tag==e&&t.push(n)}),t}findEntityByName(e){if(this.name==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByName(e);if(n)return n}}findEntityByUUID(e){if(this.uuid==e)return this;for(let t=0;t<this.children.length;t++){let n=this.children[t].findEntityByUUID(e);if(n)return n}}getRootEntity(){return this.parent?this.parent.getRootEntity():this}getScenePath(e){let t=`/`+this.name;return e&&e.uuid==this.uuid||this.parent&&(t=this.parent.getScenePath(e)+t),t}noticeEventChilds(e,t){this.emit(e,t);for(let n=0;n<this.children.length;n++)this.children[n].noticeEventChilds(e,t)}noticeEventParent(e,t){this.emit(e,t),this.parent&&this.parent.noticeEventParent(e,t)}traverse(e){e(this),this.children.forEach(t=>t.traverse(e))}isVisibleTraverse(){return this.visible?!this.parent||this.parent.isVisibleTraverse():!1}isRenderHiddenTraverse(){return this.renderHidden?!0:this.parent?this.parent.isRenderHiddenTraverse():!1}traverseEditable(e){if(!this.editorHidden){e(this);for(let t of this.children)t.traverseEditable(e)}}dispose(){this.emit(`dispose`),this.parent&&this.parent.remove(this),this.components.forEach(e=>{e.dispose()}),this.components.clear(),this.componentsSorted=[]}disposeRecursive(){this.dispose(),this.children.concat().forEach(e=>{e.disposeRecursive()}),this.children=[]}}})))()}function Qt(){return(Qt=t((()=>{at(),k()})))()}function $t(){return($t=t((()=>{k(),kt(),Qt()})))()}var en;function tn(){return(tn=t((()=>{kt(),en=class extends Ot{constructor(e){super();let{innerRadius:t,outerRadius:n,thetaSegments:r,phiSegments:i,extrude:a}={innerRadius:.4,outerRadius:.5,thetaSegments:12,phiSegments:1,extrude:0,...e},o=r+1,s=[],c=[],l=[],u=[],d=(r+1)*(i+1);for(let e=0;e<(a==0?1:2);e++){let f=e==0?-1:1,p=a==0?0:a/2*f;for(let a=0;a<i+1;a++){let m=t+(n-t)*(a/i);for(let t=0;t<=r;t++){let n=t/r*Math.PI*2,h=Math.cos(n)*m,g=Math.sin(n)*m;if(s.push(h,g,p),l.push(t/r,a/i),c.push(0,0,1*f),a>0&&t<r){let n=d*e+a*o+t;e==0?u.push(n,n-o,n+1,n+1,n-o,n+1-o):u.push(n,n+1,n-o,n+1,n+1-o,n-o)}}}}if(a!=0){for(let e=0;e<2;e++){let o=e==0?t:n;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let u=n/r*Math.PI*2,d=Math.cos(u)*o,f=Math.sin(u)*o;s.push(d,f,(-.5+t)*a),l.push(n/r,t/i),e==0?c.push(-Math.cos(u),-Math.sin(u),0):c.push(Math.cos(u),Math.sin(u),0)}}let e=d*2;for(let t=0;t<2;t++)for(let n=0;n<r;n++){let i=e+n+r*2*t,a=n==r-1?-r:0;t==0?u.push(i,i+r,i+r+1+a,i,i+r+1+a,i+1+a):u.push(i,i+r+1+a,i+r,i,i+1+a,i+r+1+a)}}this.setAttribute(`position`,new Float32Array(s),3),this.setAttribute(`normal`,new Float32Array(c),3),this.setAttribute(`uv`,new Float32Array(l),2),this.setAttribute(`index`,new Uint16Array(u),1)}}})))()}var nn;function rn(){return(rn=t((()=>{at(),nn=(e,t)=>{let n=e.createEntity({name:t.name});n.initiator=`user`,n.position.setFromArray(t.position.getElm(`vec3`)),n.euler.setFromArray(t.euler.getElm(`vec3`)),n.scale.setFromArray(t.scale.getElm(`vec3`)),n.visible=t.visible;for(let e of t.components.values()){if(e.initiator!==`user`)continue;let t=e.constructor,r=n.addComponent(t);r.initiator=`user`,r.deserialize(e.serialize({mode:`export`}))}for(let e of t.unresolvedComponents)n.unresolvedComponents.push({name:e.name,uuid:rt.genUUID(),props:e.props});for(let r of t.children)r.initiator!==`script`&&n.add(nn(e,r));return n}})))()}var an,on;function sn(){return(sn=t((()=>{an=new Map,on=(e,t)=>an.get(e)||(an.set(e,t),t)})))()}var cn;function ln(){return(ln=t((()=>{k(),cn=class{origin;direction;constructor(e,t){this.origin=e||new D,this.direction=t||new D(0,0,-1)}setFromCamera(e,t,n){let r=new D(e.x,e.y,-1,1).applyMatrix4(t).applyMatrix4(n);r.x/=r.w,r.y/=r.w,r.z/=r.w;let i=new D(e.x,e.y,1,1).applyMatrix4(t).applyMatrix4(n);return i.x/=i.w,i.y/=i.w,i.z/=i.w,this.origin.set(r.x,r.y,r.z),this.direction.set(i.x-r.x,i.y-r.y,i.z-r.z).normalize(),this}intersectAABB(e,t){let n=1/this.direction.x,r=1/this.direction.y,i=1/this.direction.z,a=(e.x-this.origin.x)*n,o=(t.x-this.origin.x)*n,s=Math.min(a,o),c=Math.max(a,o);if(a=(e.y-this.origin.y)*r,o=(t.y-this.origin.y)*r,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),a=(e.z-this.origin.z)*i,o=(t.z-this.origin.z)*i,s=Math.max(s,Math.min(a,o)),c=Math.min(c,Math.max(a,o)),c<0||s>c)return null;let l=s>=0?s:c;return{distance:l,point:new D(this.origin.x+this.direction.x*l,this.origin.y+this.direction.y*l,this.origin.z+this.direction.z*l)}}intersectTriangle(e,t,n){let r=1e-8,i=t.x-e.x,a=t.y-e.y,o=t.z-e.z,s=n.x-e.x,c=n.y-e.y,l=n.z-e.z,u=this.direction.y*l-this.direction.z*c,d=this.direction.z*s-this.direction.x*l,f=this.direction.x*c-this.direction.y*s,p=i*u+a*d+o*f;if(p>-1e-8&&p<r)return null;let m=1/p,h=this.origin.x-e.x,g=this.origin.y-e.y,_=this.origin.z-e.z,v=m*(h*u+g*d+_*f);if(v<0||v>1)return null;let y=g*o-_*a,b=_*i-h*o,x=h*a-g*i,S=m*(this.direction.x*y+this.direction.y*b+this.direction.z*x);if(S<0||v+S>1)return null;let C=m*(s*y+c*b+l*x);return C>r?{distance:C,point:new D(this.origin.x+this.direction.x*C,this.origin.y+this.direction.y*C,this.origin.z+this.direction.z*C)}:null}}})))()}var un;function dn(){return(dn=t((()=>{k(),Gt(),ln(),un=class{ray;_v0;_v1;_v2;constructor(){this.ray=new cn,this._v0=new D,this._v1=new D,this._v2=new D}setFromCamera(e,t){let n=t.getComponentsByTag(`camera`)[0];if(!n)return;let r=n.projectionMatrix.clone().inverse(),i=n.viewMatrix.clone().inverse();this.ray.setFromCamera(e,r,i)}intersectEntities(e){let t=[];return e.traverse(e=>{if(!e.visible||e.isRenderHiddenTraverse())return;let n=e.getComponent(M);if(!n)return;let r=this.intersectMesh(e,n);r&&t.push(...r)}),t.sort((e,t)=>e.distance-t.distance),t}intersectMesh(e,t){let n=t.geometry,r=n.boundingBox;if(!r)return null;let i=e.matrixWorld.clone().inverse(),a=new cn;a.origin.copy(this.ray.origin),a.origin.w=1,a.origin.applyMatrix4(i),a.origin.x/=a.origin.w,a.origin.y/=a.origin.w,a.origin.z/=a.origin.w;let o=this.ray.origin.clone().add(this.ray.direction);if(o.w=1,o.applyMatrix4(i),o.x/=o.w,o.y/=o.w,o.z/=o.w,a.direction.set(o.x-a.origin.x,o.y-a.origin.y,o.z-a.origin.z).normalize(),!a.intersectAABB(r.min,r.max))return null;let s=this.intersectTriangles(a,n);if(!s)return null;let c=s.point.clone();c.w=1,c.applyMatrix4(e.matrixWorld),c.x/=c.w,c.y/=c.w,c.z/=c.w;let l=c.x-this.ray.origin.x,u=c.y-this.ray.origin.y,d=c.z-this.ray.origin.z;return[{entity:e,distance:Math.sqrt(l*l+u*u+d*d),point:c}]}intersectTriangles(e,t){let n=t.getAttribute(`position`);if(!n)return null;let r=n.array,i=t.getAttribute(`index`),a=i?i.array:null,o=Math.floor((a?a.length:t.vertCount)/3),s=null;for(let t=0;t<o;t++){let n=(a?a[t*3+0]:t*3+0)*3,i=(a?a[t*3+1]:t*3+1)*3,o=(a?a[t*3+2]:t*3+2)*3;this._v0.set(r[n],r[n+1],r[n+2]),this._v1.set(r[i],r[i+1],r[i+2]),this._v2.set(r[o],r[o+1],r[o+2]);let c=e.intersectTriangle(this._v0,this._v1,this._v2);c&&(!s||c.distance<s.distance)&&(s=c)}return s}}})))()}var fn,pn;function mn(){return(mn=t((()=>{fn=[],pn=async()=>{for(;fn.length>0;){let e=fn.splice(0,fn.length);await Promise.all(e)}}})))()}var hn;function gn(){return(gn=t((()=>{(function(e){let t=e.assign=(e,...t)=>{for(let n=0;n<t.length;n++)t[n]!=null&&Object.assign(e,t[n]);return e};e.merge=(...e)=>t({},...e)})(hn||={})})))()}function _n(){return(_n=t((()=>{ft(),st(),lt(),mt(),gt(),vt(),xt(),Ct(),Dt(),qt(),Jt(),zt(),Vt(),Ut(),Yt(),Gt(),Zt(),kt(),jt(),$t(),Nt(),Ft(),tn(),Lt(),Et(),Qt(),rn(),sn(),ln(),dn(),mn(),gn()})))()}var vn;function yn(){return(yn=t((()=>{Dt(),vn=class extends j{_params;constructor(e){super(e),this._params=[]}get params(){return this._params}add(...e){this._params=this._params.concat(e)}remove(e){let t=this._params.indexOf(e);if(t<0)return;let n=this._params.slice();n.splice(t,1),this._params=n}rebuild(){this._params=this._params.slice()}}})))()}function bn(){return(bn=t((()=>{})))()}function xn(){return(xn=t((()=>{})))()}var Sn;function Cn(){return(Cn=t((()=>{Et(),bn(),xn(),Sn=class extends Tt{name;vert;frag;defines;uniforms;useLight;depthTest;depthWrite;cullFace;drawType;blending;renderOrder;transparent;writeGBuffer;visibilityFlag;programCache;constructor(e){super(),e||={},this.name=e.name||``,this.visibilityFlag={},this.setVisibility(e.phase||[`shadowMap`,`deferred`]),this.useLight=e.useLight===void 0||e.useLight,this.depthTest=e.depthTest===void 0||e.depthTest,this.cullFace=e.cullFace!==void 0&&e.cullFace,this.depthWrite=e.depthWrite===void 0||e.depthWrite,this.drawType=e.drawType||`TRIANGLES`,this.blending=e.blending||`NORMAL`,this.renderOrder=e.renderOrder??0,this.transparent=e.transparent??!1,this.writeGBuffer=e.writeGBuffer??!0,this.vert=e.vert||`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outSSS = 0.0;\r
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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif\r
\r
}`,this.defines=e.defines||{},this.uniforms=e.uniforms||{},this.programCache={}}setVisibility(e){this.visibilityFlag={shadowMap:e.indexOf(`shadowMap`)>-1,deferred:e.indexOf(`deferred`)>-1,forward:e.indexOf(`forward`)>-1,ui:e.indexOf(`ui`)>-1,envMap:e.indexOf(`envMap`)>-1,postprocess:e.indexOf(`postprocess`)>-1}}requestUpdate(){this.programCache={}}}})))()}var wn;function Tn(){return(Tn=t((()=>{Et(),wn=class extends Tt{name;enabled;_passes;constructor(e){super();let t=e||{};this.name=t.name||``,this.enabled=!0,this._passes=e&&e.passes||[]}get passes(){return this._passes}get hasOutput(){return this._passes.length>0&&this._passes.some(e=>e.enabled)}get output(){for(let e=this._passes.length-1;e>=0;e--){let t=this._passes[e];if(!t.passThrough&&t.enabled)return t.renderTarget}return null}resize(e){if(this._passes)for(let t=0;t<this._passes.length;t++)this._passes[t].resize(e)}dispose(){this.emit(`dispose`)}}})))()}function En(){return(En=t((()=>{})))()}function Dn(){return(Dn=t((()=>{})))()}var N;function On(){return(On=t((()=>{k(),Ye(),Cn(),En(),Dn(),N=class extends Sn{enabled;renderTarget;backBufferOverride;clearColor;clearDepth;resolutionRatio;passThrough;resolution;resolutionInv;viewPort;_fixedResolution;constructor(e,t){super({...t,frag:t.frag||`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
}`}),this.enabled=!0,this._fixedResolution=t.fixedResotluion?t.fixedResotluion.clone():null,this.resolution=new D,this.resolutionInv=new D,this.viewPort=null,this.uniforms.uPPResolution={value:this.resolution,type:`2fv`},this.uniforms.uPPPixelSize={value:this.resolutionInv,type:`2fv`},this.renderTarget=t.renderTarget===void 0?e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:A.LINEAR,minFilter:A.LINEAR})]):t.renderTarget,this.clearColor=t.clearColor??null,this.clearDepth=t.clearDepth??null,this.depthTest=t.depthTest!==void 0&&t.depthTest,this.resolutionRatio=t.resolutionRatio||1,this.passThrough=t.passThrough??!1,this.viewPort=t.viewPort||null,this.backBufferOverride=t.backBufferOverride||null}get fixedResolution(){return this._fixedResolution}set fixedResolution(e){this._fixedResolution=e,this.resize(e||new D)}onAfterRender(){}resize(e){this._fixedResolution?this.resolution.copy(this._fixedResolution):this.resolution.copy(e).multiply(this.resolutionRatio),this.resolutionInv.set(1/this.resolution.x,1/this.resolution.y),this.renderTarget&&this.renderTarget.setSize(this.resolution)}setRendertarget(e){this.renderTarget=e,this.renderTarget&&(this.renderTarget.size.x!=this.resolution.x||this.renderTarget.size.y!=this.resolution.y)&&this.renderTarget.setSize(this.resolution)}}})))()}var kn;function An(){return(An=t((()=>{qe(),k(),Tn(),On(),kn=class extends ze{material;_renderer;_resolution;_postProcess;_frameBuffer;constructor(e,t){let n=e.backend,r=n.gl;super(r),this._renderer=e,this._resolution=t.resolution||new D(1024,1024),this.setting({wrapS:r.REPEAT,wrapT:r.REPEAT,magFilter:r.LINEAR,minFilter:r.LINEAR}),this._frameBuffer=new Ve(r).setTexture([this]).setSize(this._resolution),this.material=new N(n,{...t,renderTarget:this._frameBuffer}),this._postProcess=new wn({passes:[this.material]}),this.render()}render(){this._renderer.renderPostProcess(this._postProcess,void 0,this._resolution)}},kn.__docgenInfo={description:``,methods:[],displayName:`TexProcedural`}})))()}var jn;function Mn(){return(Mn=t((()=>{jn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

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

}`})))()}var Nn;function Pn(){return(Pn=t((()=>{at(),k(),P(),Ye(),Mn(),Nn=class extends tt{postprocess;resolution;renderTarget;pmremPasses;swapBuffers;timeUniforms;constructor(e,t){super();let n=t.resolution,r={uTimeEF:{value:0,type:`1f`}},i=e.createFrameBuffer().setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA,magFilter:A.LINEAR,minFilter:A.LINEAR,wrapS:A.CLAMP_TO_EDGE,wrapT:A.CLAMP_TO_EDGE})]),a=[],o=[],s=[],c=0;for(let l=0;l<5;l++){let u=1/2**l,d=n.x*u,f=n.y*u*.5,p=new D(0,c,d,f);c+=f,s.push({rt1:e.createFrameBuffer().setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA})]),rt2:e.createFrameBuffer().setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA})])});let m=1/4*l,h=new N(e,{renderTarget:s[l].rt1,frag:jn,uniforms:hn.merge(r,{uRoughness:{value:m,type:`1f`},uEnvMap:{value:t.input,type:`1i`},uPMREMBackBuffer:{value:s[l].rt2.textures,type:`1i`},uRenderCount:{value:1,type:`1f`}}),defines:{NUM_SAMPLES:Math.floor(2**(l+1))}});h.resize(new D(d,f));let g=new N(e,{renderTarget:i,viewPort:p,passThrough:!0});g.resize(n),a.push(h,g),o.push(h)}this.postprocess=new wn({passes:a}),this.postprocess.passes[0].backBufferOverride=i.textures,this.resolution=n,this.renderTarget=i,this.pmremPasses=o,this.swapBuffers=s,this.timeUniforms=r}swap(){this.timeUniforms.uTimeEF.value=(this.timeUniforms.uTimeEF.value+.016)%1;for(let e=0;e<this.pmremPasses.length;e++){let t=this.pmremPasses[e],n=this.swapBuffers[e],r=n.rt1;n.rt1=n.rt2,n.rt2=r,t.setRendertarget(n.rt1),t.uniforms.uPMREMBackBuffer.value=n.rt2.textures}}resize(e){}}})))()}var Fn;function In(){return(In=t((()=>{Fn=class{backend;pool;constructor(e){this.backend=e,this.pool=new Map}get(e,t,n){let r=e+t,i=this.pool.get(r);if(i!==void 0&&i.program)return i;let a=this.backend.createProgram();return n&&(a.name=n),a.setShader(e,t),this.pool.set(r,a),a}}})))()}var Ln,Rn,zn,Bn,Vn,Hn;function Un(){return(Un=t((()=>{Ln=[[.1,.0484],[.118,.187],[.113,.567],[.358,1.99],[.078,7.41]],Rn=[1,.37,.3],zn=[.48,.41,.28],Bn=2,Vn=(e,t)=>{let n=e/(.001+Rn[t]),r=0;for(let[e,t]of Ln)r+=e*Math.exp(-(n*n)/(2*t))/(2*Math.PI*t);return r},Hn=e=>{let t=[];for(let n=0;n<e;n++){let r=Bn*n/(e-1);t.push(r*r/Bn)}let n=[];for(let r=0;r<e;r++){let i=0;i=r===0?t[1]:r===e-1?(t[r]-t[r-1])/2:(t[r+1]-t[r-1])/2,n.push(i)}let r=[];for(let i=0;i<3;i++){let a=[],o=0;for(let r=0;r<e;r++){let e=n[r]*Vn(t[r],i);a.push(e),o+=r===0?e:e*2}let s=zn[i];for(let t=0;t<e;t++){let e=a[t]/o*s;t===0&&(e+=1-s),r[t*4+i]=e}}for(let n=0;n<e;n++)r[n*4+3]=t[n]/Bn;return r}})))()}var Wn;function Gn(){return(Gn=t((()=>{Wn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
	// 影を落とすライトが無いと長さ0の配列になり、コンパイルエラーになる\r
	#if NUM_SHADOWMAP_DIR > 0\r
		uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	#endif\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	#if NUM_SHADOWMAP_SPOT > 0\r
		uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	#endif\r
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
// 1灯ぶんの反射を diffuse と specular に分けて足す（SSS が diffuse だけをぼかすため）\r
void RE( Geometry geo, Material mat, Light light, inout vec3 diffuse, inout vec3 specular ) {\r
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
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
\r
	diffuse += lambert( mat.diffuseColor ) * irradiance * ( 1.0 - F );\r
	specular += (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance;\r
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
uniform sampler2D sampler2; // albedo, sss\r
uniform sampler2D sampler3; // roughness, metallic, normalSelect, envSelect, \r
uniform sampler2D sampler4; // velocity.xy, 0.0, emission.z\r
\r
uniform sampler2D uSSAOTexture;\r
uniform sampler2D uLightShaftTexture;\r
uniform sampler2D uSSRTexture;\r
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
// SSR を環境マップの鏡面反射の代わりに使う粗さの範囲。SSR は鏡面方向の1本のレイしか引かずぼけないので、\r
// MIN 以下では当たった分をすべて SSR にし、MAX へ向けて環境マップへ戻す。webgpu 側 shading.wgsl と一致させる\r
#define SSR_ROUGHNESS_MIN 0.1\r
#define SSR_ROUGHNESS_MAX 0.4\r
\r
// ssr.fs の ssrCompress で圧縮した反射色を元の明るさへ戻す。\r
// 圧縮後の輝度は 1 未満だが、半精度の丸めで 1 に届くと 0 除算になるので上限を置く（0.99 は元の輝度で約 99）\r
vec3 ssrDecompress( vec3 c ) {\r
\r
	return c / ( 1.0 - min( dot( c, vec3( 0.2126, 0.7152, 0.0722 ) ), 0.99 ) );\r
\r
}\r
\r
// out（1 は SSS がぼかす diffuse だけの結果）\r
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
	vec3 diffuse = vec3( 0.0 );\r
	vec3 specular = vec3( 0.0 );\r
\r
	// lighting\r
\r
	// required common, light,\r
// diffuse / specular（vec3）へ足し込む。SSS が diffuse だけをぼかすため分けて持つ\r
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
		light.direction = dLight.direction;\r
		light.color = dLight.color * shadow;\r
\r
		RE( geo, mat, light, diffuse, specular );\r
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
		// 逆二乗の減衰。光源の位置で 0 除算しないよう下限を置く\r
		light.color = sLight.color * spotAttenuation / max( spotDistance * spotDistance, 0.0001 ) * shadow;\r
\r
		RE( geo, mat, light, diffuse, specular );\r
\r
	#pragma loop_end\r
\r
#endif\r
\r
	// env（SSR が当たった分 ssrWeight は、環境マップの鏡面反射の代わりに画面に映っている物 ssrHit を使う）\r
\r
	vec4 ssr = texture( uSSRTexture, vUv );\r
	vec3 ssrHit = ssrDecompress( ssr.xyz / max( ssr.w, 0.0001 ) );\r
	float ssrWeight = ssr.w * ( 1.0 - smoothstep( SSR_ROUGHNESS_MIN, SSR_ROUGHNESS_MAX, roughness ) );\r
\r
	vec3 refDir = reflect( -geo.viewDir, geo.normal );\r
float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );\r
float EF = mix( fresnel( dNV ), 1.0, mat.metallic );\r
\r
// 環境の鏡面反射に置き換わる割合。直接光も含め diffuse / specular を同じ割合で減らす\r
vec3 envReflect = EF * mat.specularColor * mat.envMapIntensity;\r
\r
diffuse = ( diffuse + getPmrem( uEnvMap, geo.normal, 1.0 ) * mat.diffuseColor * mat.envMapIntensity ) * ( 1.0 - envReflect );\r
// 鏡面反射に入ってくる光。SSR が当たった分は画面に映っている物を使う（ssrHit / ssrWeight は deferredShading.fs が用意する）\r
specular = mix( specular, mix( getPmrem( uEnvMap, refDir, mat.roughness ), ssrHit, ssrWeight ), envReflect );\r
	\r
	// occlusion\r
\r
	float ao = max( 0.0, 1.0 - geo.occulusion * 1.5 );\r
\r
	diffuse *= ao;\r
	specular *= ao;\r
\r
	vec3 outColor = diffuse + specular;\r
\r
	// emission\r
\r
	outColor += mat.emission;\r
\r
	// light shaft\r
	\r
	outColor += texture( uLightShaftTexture, vUv ).xyz;\r
\r
	glFragOut0 = vec4( max( vec3( 0.0 ), outColor ), 1.0 );\r
	glFragOut1 = vec4( max( vec3( 0.0 ), diffuse ), 1.0 );\r
\r
}`})))()}var Kn;function qn(){return(qn=t((()=>{Kn=`// カメラからの視線をレイマーチしてシャドウマップを引き、光の筋を積む。
// 1フレームぶんのレイマーチはサンプルが足りないので、開始位置をピクセルごとにずらして
// 前フレームの結果へ足し込む。空間方向のならしは lightShaftBlur が担当する。
// webgpu 側の lightShaft.wgsl と同じ処理

#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
	// 影を落とすライトが無いと長さ0の配列になり、コンパイルエラーになる\r
	#if NUM_SHADOWMAP_DIR > 0\r
		uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	#endif\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	#if NUM_SHADOWMAP_SPOT > 0\r
		uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	#endif\r
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
// 1灯ぶんの反射を diffuse と specular に分けて足す（SSS が diffuse だけをぼかすため）\r
void RE( Geometry geo, Material mat, Light light, inout vec3 diffuse, inout vec3 specular ) {\r
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
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
\r
	diffuse += lambert( mat.diffuseColor ) * irradiance * ( 1.0 - F );\r
	specular += (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance;\r
\r
}

// uniforms

uniform sampler2D uLightShaftBackBuffer;
uniform sampler2D uPosTexture;

// ジッタを回すためのフレーム番号
uniform float uFrame;
uniform mat4 uCameraMatrix;
uniform mat4 uProjectionMatrixInverse;
uniform mat4 uViewMatrixPrev;
uniform mat4 uProjectionMatrixPrev;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;

const float MARCH_LENGTH = 60.0;
const int MARCH = 32;

const vec3 LUMA = vec3( 0.299, 0.587, 0.114 );

// 新しい結果の重み。小さいほどノイズは減るが、影の出入りが尾を引く（webgpu 側の既定値と同じ）
const float TEMPORAL_BLEND = 0.3;

// 再投影が画面上で動いた量に対して履歴を捨てる強さ。
// 画面の5%ぶん動いたら履歴を使わなくなる（1.0 / 0.05）
const float TEMPORAL_REJECT = 20.0;

// 明るさの変わり方に対して履歴を捨てる境目（前フレームとの相対差）。
// 遮蔽物が動いた画素は影が丸ごと入れ替わるので大きく振れる。
// 下限はレイマーチのばらつきぶんで、ここを下げすぎると蓄積が効かなくなる
const float CHANGE_LOW = 0.25;
const float CHANGE_HIGH = 1.0;

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

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

}


void main( void ) {

	vec3 lightShaftSum = vec3( 0.0 );

	vec2 screen = vUv * 2.0 - 1.0;
	mat4 cp = uCameraMatrix * uProjectionMatrixInverse;

	// 始点は near 面上の点。並行投影ではカメラ位置から出ないので、画素ごとに near/far 面の点から求める
	vec4 np = cp * vec4( screen, -1.0, 1.0 );
	vec4 fp = cp * vec4( screen, 1.0, 1.0 );
	vec3 rayPos = np.xyz / np.w;
	vec3 rayDir = normalize( fp.xyz / fp.w - rayPos );

	// レイの終端はgBufferのワールド座標。書かれていなければ十分遠くまで進める
	vec3 rayEndPos = texture( uPosTexture, vUv ).xyz;

	if( dot( rayEndPos, rayEndPos ) == 0.0 ) {

		rayEndPos = rayPos + rayDir * 100.0;

	}

	float rayLength = length( rayEndPos - rayPos );

	float rayStepLength = MARCH_LENGTH / float( MARCH );
	vec3 rayStep = rayDir * rayStepLength;

	// 開始位置をステップ1つぶんの範囲で散らして等間隔の縞を崩す
	float totalRayLength = interleavedGradientNoise( gl_FragCoord.xy, uFrame ) * rayStepLength;
	rayPos += rayDir * totalRayLength;

	for( int i = 0; i < MARCH; i ++ ) {

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
					spotAttenuation / max( spotDistance * spotDistance, 0.0001 ) *
					rayStepLength * 0.02;

			#pragma loop_end

		#endif

	}

	lightShaftSum *= 0.4;

	// レイの終端を前フレームのカメラで見たときの画面位置。そこに前フレームの筋が残っている
	vec4 prevClip = uProjectionMatrixPrev * uViewMatrixPrev * vec4( rayEndPos, 1.0 );
	vec2 prevUv = prevClip.xy / prevClip.w * 0.5 + 0.5;

	vec3 history = texture( uLightShaftBackBuffer, prevUv ).xyz;

	// 画面上で大きく動いたピクセルは、遮蔽の入れ替わりで前の値が別物になっている
	float motion = length( prevUv - vUv );

	// 遮蔽物だけが動いた場合は再投影では捉えられないので、明るさの変化そのものからも判断する
	float lumSum = dot( lightShaftSum, LUMA );
	float lumHistory = dot( history, LUMA );
	float change = abs( lumSum - lumHistory ) / max( max( lumSum, lumHistory ), 0.0001 );

	float alpha = TEMPORAL_BLEND + motion * TEMPORAL_REJECT;
	alpha = mix( alpha, 1.0, smoothstep( CHANGE_LOW, CHANGE_HIGH, change ) );

	// 画面の外から来たピクセルには履歴が無い
	if( prevClip.w <= 0.0 || prevUv.x < 0.0 || prevUv.y < 0.0 || prevUv.x > 1.0 || prevUv.y > 1.0 ) {

		alpha = 1.0;

	}

	outColor = vec4( mix( history, lightShaftSum, clamp( alpha, 0.0, 1.0 ) ), 1.0 );

}
`})))()}var Jn;function Yn(){return(Yn=t((()=>{Jn=`// 光の筋のならし。レイマーチのジッタが残したざらつきを消す。縦横で2回かける（IS_VIRT で縦）。
// 筋そのものは低周波なので、手前の面と奥の空間をまたいで滲まないぶんだけ重みを落とせば足りる。
// webgpu 側の lightShaftBlur.wgsl と同じ処理

// uniforms

uniform sampler2D uLightShaftTexture;
uniform sampler2D uPosTexture;
uniform vec2 uPPPixelSize;
uniform vec3 uCameraPosition;

uniform float uWeights[BLUR_SAMPLES];

// varying

in vec2 vUv;

// out

layout (location = 0) out vec4 outColor;

// カメラ距離がこれだけ離れると重みが半分になる
const float DEPTH_FALLOFF = 1.0;

// gBufferに何も書かれていない画素の扱い。カメラ位置に依らず一定にしたいので、
// 原点までの距離ではなく決め打ちの遠方を返す（lightShaft がレイを伸ばす距離と同じ）
const float BACKGROUND_DEPTH = 100.0;

// gBufferのワールド座標からカメラ距離を求める
float viewDepth( vec2 uv ) {

	vec3 gPos = texture( uPosTexture, uv ).xyz;

	if( dot( gPos, gPos ) == 0.0 ) {

		return BACKGROUND_DEPTH;

	}

	return length( gPos - uCameraPosition );

}

// 基準の画素とカメラ距離が離れているほど小さくなる重み
float depthWeight( vec2 uv, float depthBasis ) {

	return 1.0 / ( 1.0 + abs( viewDepth( uv ) - depthBasis ) / DEPTH_FALLOFF );

}

void main( void ) {

	vec2 direction;

	#ifdef IS_VIRT

		direction = vec2( 0.0, 1.0 );

	#else

		direction = vec2( 1.0, 0.0 );

	#endif

	float depthBasis = viewDepth( vUv );

	vec3 sum = texture( uLightShaftTexture, vUv ).xyz * uWeights[ 0 ];
	float weight = uWeights[ 0 ];

	for( int i = 1; i < BLUR_SAMPLES; i ++ ) {

		vec2 offset = float( i ) * direction * uPPPixelSize;

		vec2 uvP = vUv + offset;
		vec2 uvN = vUv - offset;

		float wP = depthWeight( uvP, depthBasis ) * uWeights[ i ];
		float wN = depthWeight( uvN, depthBasis ) * uWeights[ i ];

		sum += texture( uLightShaftTexture, uvP ).xyz * wP;
		sum += texture( uLightShaftTexture, uvN ).xyz * wN;

		weight += wP + wN;

	}

	outColor = vec4( sum / weight, 1.0 );

}
`})))()}var Xn;function Zn(){return(Zn=t((()=>{Xn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var Qn;function $n(){return($n=t((()=>{Qn=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
	// 影を落とすライトが無いと長さ0の配列になり、コンパイルエラーになる\r
	#if NUM_SHADOWMAP_DIR > 0\r
		uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	#endif\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	#if NUM_SHADOWMAP_SPOT > 0\r
		uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	#endif\r
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
// 1灯ぶんの反射を diffuse と specular に分けて足す（SSS が diffuse だけをぼかすため）\r
void RE( Geometry geo, Material mat, Light light, inout vec3 diffuse, inout vec3 specular ) {\r
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
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
\r
	diffuse += lambert( mat.diffuseColor ) * irradiance * ( 1.0 - F );\r
	specular += (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance;\r
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

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

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

}`})))()}var er;function tr(){return(tr=t((()=>{er=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
	// 影を落とすライトが無いと長さ0の配列になり、コンパイルエラーになる\r
	#if NUM_SHADOWMAP_DIR > 0\r
		uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	#endif\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	#if NUM_SHADOWMAP_SPOT > 0\r
		uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	#endif\r
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
// 1灯ぶんの反射を diffuse と specular に分けて足す（SSS が diffuse だけをぼかすため）\r
void RE( Geometry geo, Material mat, Light light, inout vec3 diffuse, inout vec3 specular ) {\r
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
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
\r
	diffuse += lambert( mat.diffuseColor ) * irradiance * ( 1.0 - F );\r
	specular += (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance;\r
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

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

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

}`})))()}var nr;function rr(){return(rr=t((()=>{nr=`// 反射方向へレイマーチしてシーンを引く。今フレームの結果だけを出し、時間方向の蓄積は ssrTemporal.fs が行う。
// シェーディングより前に走るので今フレームのシーン色はまだ無い。当たった面の速度で前フレームの位置へ戻し、
// 前フレームの不透明の forward まで描き終えたシーン（uPrevScene）を引く（透明の forward は当たり判定にも色にも入らない）。
// 出力の a は当たった度合い（0 = 外れ）で、deferredShading.fs が環境マップの鏡面反射と混ぜる割合に使う。webgpu 側 ssr.wgsl と同じ処理

#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

}


// uniforms

uniform sampler2D uGbufferPos;
uniform sampler2D uGbufferNormal;
uniform sampler2D uVelTex;
uniform sampler2D uPrevScene;

uniform float uTimeEF;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform float uCameraFar;

// varying

in vec2 vUv;

layout (location = 0) out vec4 outColor;
#define MARCH 16.0
#define LENGTH 5.0
#define OBJDEPTH 0.5

// 画面の端に近い当たりを弱める幅（uv）。画面の外は引けないので、端で反射が急に切れて見えないようにする
#define EDGE_FADE 0.1

// HDR のヒット色を輝度 1 未満へ圧縮する。一瞬だけ当たった高輝度の点が履歴に大きく残って尾を引かないように、
// ssrTemporal.fs は圧縮した値どうしで近傍の範囲を取って混ぜる。deferredShading.fs の ssrDecompress と対
vec3 ssrCompress( vec3 c ) {

	return c / ( 1.0 + dot( c, vec3( 0.2126, 0.7152, 0.0722 ) ) );

}

void main( void ) {

	outColor = vec4( 0.0 );

	vec3 rayPos = texture( uGbufferPos, vUv ).xyz;

	if( isBackground( rayPos, uCameraPosition, uCameraFar ) || length( rayPos - uCameraPosition ) > 100.0 ) return;

	vec3 rayDir = reflect( - viewDirection( rayPos, uCameraPosition, uViewMatrix, uProjectionMatrix ), texture( uGbufferNormal, vUv ).xyz );

	float rayStepLength = LENGTH / MARCH;
	vec3 rayStep = rayDir * rayStepLength;

	rayPos += rayDir * ( random( vUv + uTimeEF ) * rayStepLength + 0.1 );

	for( int i = 0; i < int( MARCH ); i ++ ) {

		vec4 depthCoord = ( uProjectionMatrix * uViewMatrix * vec4( rayPos, 1.0 ) );
		depthCoord.xy /= depthCoord.w;

		if( abs( depthCoord.x ) > 1.0 || abs( depthCoord.y ) > 1.0 ) break;

		vec2 uv = depthCoord.xy * 0.5 + 0.5;

		vec3 gBufferPos = texture( uGbufferPos, uv ).xyz;

		if( length( gBufferPos ) == 0.0 ) break;

		vec4 samplerPos = ( uViewMatrix * vec4( gBufferPos, 1.0 ) );
		vec4 sampleViewPos = uViewMatrix * vec4( rayPos, 1.0 );

		if( sampleViewPos.z < samplerPos.z && sampleViewPos.z >= samplerPos.z - OBJDEPTH ) {

			// 速度は「NDC の移動量 × 0.2」（vert_out.part.glsl）。uv の移動量は NDC の半分なので 0.5 / 0.2 = 2.5 倍して戻す
			vec2 prevUv = uv - texture( uVelTex, uv ).xy * 2.5;

			vec2 edge = min( prevUv, 1.0 - prevUv );
			float weight = smoothstep( 0.0, EDGE_FADE, min( edge.x, edge.y ) );

			vec3 color = texture( uPrevScene, prevUv ).xyz;

			// 時間方向に均したあとも rgb / a が当たった色の平均になるよう、色にも重みを掛けておく
			outColor = vec4( ssrCompress( color ) * weight, weight );
			return;

		}

		rayPos += rayStep;

	}

}
`})))()}var ir;function ar(){return(ar=t((()=>{ir=`// ssr.fs の今フレームの結果を、前フレームの結果と混ぜて均す。
// 履歴は今フレームの近傍 3x3 の範囲へクランプしてから混ぜる（TAA の近傍クランプ）。
// 反射像は反射先の奥行きで動くので面の速度で再投影してもずれが残り、ディスオクルージョンでは別の物の反射を引き継ぐ。
// どちらも今フレームの近傍に無い色として捨てられる。webgpu 側 ssrTemporal.wgsl と同じ処理

#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

uniform sampler2D uSSRCurrent;
uniform sampler2D uSSRBackBuffer;
uniform sampler2D uGbufferPos;
uniform sampler2D uVelTex;

uniform vec2 uPPPixelSize;
uniform vec3 uCameraPosition;
uniform float uCameraFar;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

// 新しい結果に与える重み
#define BLEND 0.2

void main( void ) {

	// isBackground の引数へ直接 texture() を渡すと、shader_minifier が uniform の引数を削って関数本体へ移し、
	// uniform の宣言より前で参照する壊れたコードになる。いったんローカル変数に受ける
	vec3 pos = texture( uGbufferPos, vUv ).xyz;

	// 空・背景には反射を足さないので、履歴も持たない
	if( isBackground( pos, uCameraPosition, uCameraFar ) ) {

		outColor = vec4( 0.0 );
		return;

	}

	// uSSRCurrent はこのパスと同じ解像度なので、画素中心を引けば線形補間でも隣と混ざらない
	vec4 current = texture( uSSRCurrent, vUv );

	vec4 minCol = current;
	vec4 maxCol = current;

	for( int y = -1; y <= 1; y ++ ) {

		for( int x = -1; x <= 1; x ++ ) {

			vec4 neighbor = texture( uSSRCurrent, vUv + vec2( x, y ) * uPPPixelSize );

			minCol = min( minCol, neighbor );
			maxCol = max( maxCol, neighbor );

		}

	}

	// 速度は「NDC の移動量 × 0.2」（vert_out.part.glsl）。uv の移動量は NDC の半分なので 0.5 / 0.2 = 2.5 倍して戻す
	vec2 prevUv = vUv - texture( uVelTex, vUv ).xy * 2.5;

	// 画面の外から来た画素には履歴が無いので、そのフレームの値だけを使う
	if( any( lessThan( prevUv, vec2( 0.0 ) ) ) || any( greaterThan( prevUv, vec2( 1.0 ) ) ) ) {

		outColor = current;
		return;

	}

	vec4 history = clamp( texture( uSSRBackBuffer, prevUv ), minCol, maxCol );

	outColor = mix( history, current, BLEND );

}
`})))()}var or;function sr(){return(sr=t((()=>{or=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

// 肌の拡散プロファイルでの分離可能ブラー（Jimenez 式）。横 → 縦の2回かける。
// 横は diffuse をぼかすだけ。縦はシェーディング結果の diffuse を、ぼかした diffuse へ置き換える。
// 境界の扱いは ssaoBlur と同じ（法線と深度が離れたサンプルの重みを下げる）

// uniforms

uniform sampler2D uDiffuseTexture;
uniform sampler2D uShadingTexture;
uniform sampler2D uShadingDiffuseTexture;
uniform sampler2D uAlbedoTexture;
uniform sampler2D uNormalTexture;
uniform sampler2D uPosTexture;

uniform vec3 uCameraPosition;
uniform mat4 uProjectionMatrix;

uniform float uSSSRadius;

// [ r, g, b, 中心からの距離（0〜1） ]。中心から片側ぶん（core/utils/SSSKernel）
uniform vec4 uKernel[SSS_SAMPLES];

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

// 法線・深度の近さと、サンプル先の SSS の強さで決まる重み（SSS の無い面から色を持ち込まない）
float getWeight( vec2 uv, vec3 normalBasis, float depthBasis ) {

	vec3 normalOffset = texture( uNormalTexture, uv ).xyz;
	float depthOffset = viewDepth( uv );
	float bilateralWeight = pow( ( dot( normalBasis, normalOffset ) + 1.0 ) / 2.0, alpha ) * pow( 1.0 / ( abs( depthBasis - depthOffset ) + 0.001 ), beta );

	return bilateralWeight * texture( uAlbedoTexture, uv ).w;

}

void main( void ) {

	vec3 diffuse = texture( uDiffuseTexture, vUv ).xyz;
	float sss = texture( uAlbedoTexture, vUv ).w;

	vec2 direction;

	#ifdef IS_VIRT

		direction = vec2( 0.0, 1.0 );

	#else

		direction = vec2( 1.0, 0.0 );

	#endif

	vec3 blurred = diffuse;

	if( sss > 0.0 ) {

		vec3 normalBasis = texture( uNormalTexture, vUv ).xyz;
		float depthBasis = viewDepth( vUv );

		// 散乱半径（ワールド単位）を画面の UV の長さへ直す。遠いほど短くなり、SSS の強さに比例して広がる
		vec2 radiusUV = direction * uSSSRadius * sss * 0.5 * vec2( uProjectionMatrix[ 0 ][ 0 ], uProjectionMatrix[ 1 ][ 1 ] ) / depthBasis;

		vec3 weight = uKernel[ 0 ].xyz * getWeight( vUv, normalBasis, depthBasis );
		vec3 sum = diffuse * weight;

		for( int i = 1; i < SSS_SAMPLES; i++ ) {

			vec2 offset = radiusUV * uKernel[ i ].w;

			vec2 uvOffsetP = vUv + offset;
			vec2 uvOffsetN = vUv - offset;

			vec3 wP = uKernel[ i ].xyz * getWeight( uvOffsetP, normalBasis, depthBasis );
			vec3 wN = uKernel[ i ].xyz * getWeight( uvOffsetN, normalBasis, depthBasis );

			sum += texture( uDiffuseTexture, uvOffsetP ).xyz * wP;
			sum += texture( uDiffuseTexture, uvOffsetN ).xyz * wN;

			weight += wP + wN;

		}

		blurred = sum / weight;

	}

	#ifdef IS_VIRT

		outColor = vec4( texture( uShadingTexture, vUv ).xyz - texture( uShadingDiffuseTexture, vUv ).xyz + blurred, 1.0 );

	#else

		outColor = vec4( blurred, 1.0 );

	#endif

}
`})))()}var cr,lr,ur,dr,fr;function pr(){return(pr=t((()=>{at(),k(),P(),Un(),Ye(),Gn(),qn(),Yn(),Zn(),$n(),tr(),rr(),ar(),sr(),cr=e=>{let t=[];for(let n=0;n<e;n++){let r=new D;r.x=Math.random()*2-1,r.y=Math.random()*2-1,r.z=n/e*.95+.05,r.normalize(),r.multiply(n/e*.95+.05),t.push(...r.getElm(`vec3`))}return t},lr=9,ur=6,dr=64,fr=class extends tt{postprocess;normalSelector_;lightShaft;rtLightShaft1;rtLightShaft2;lightShaftBlurH;lightShaftBlurV;ssao;rtSSAO1;rtSSAO2;ssaoBlur;ssaoBlurV;ssr;ssrTemporal;rtSSR1;rtSSR2;shading;sssH;sssV;sssCopy;constructor(e){super();let t=e.backend,n=e.renderTarget,r=new N(t,{name:`normalSelector`,frag:Xn,renderTarget:null,uniforms:hn.merge({uNormalTexture:{value:null,type:`1i`},uPosTexture:{value:null,type:`1i`},uSelectorTexture:{value:null,type:`1i`}}),passThrough:!0}),i=()=>t.createFrameBuffer({disableDepthBuffer:!0}).setTexture([t.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA,magFilter:A.LINEAR,minFilter:A.LINEAR})]),a=i(),o=i(),s=new N(t,{name:`lightShaft`,frag:Kn,renderTarget:a,uniforms:hn.merge({uLightShaftBackBuffer:{value:o.textures[0],type:`1i`},uPosTexture:{value:n.gBuffer.textures[0],type:`1i`},uFrame:{value:0,type:`1f`}}),resolutionRatio:.5,passThrough:!0}),c=hn.merge({uLightShaftTexture:{value:a.textures[0],type:`1i`},uPosTexture:{value:n.gBuffer.textures[0],type:`1i`},uWeights:{type:`1fv`,value:Ae.gaussWeights(ur)}}),l=new N(t,{name:`lightShaft/blur/h`,frag:Jn,uniforms:c,renderTarget:i(),resolutionRatio:.5,passThrough:!0,defines:{BLUR_SAMPLES:ur}}),u=new N(t,{name:`lightShaft/blur/v`,frag:Jn,uniforms:hn.merge(c,{uLightShaftTexture:{value:l.renderTarget.textures[0],type:`1i`}}),renderTarget:i(),resolutionRatio:.5,passThrough:!0,defines:{BLUR_SAMPLES:ur,IS_VIRT:``}}),d=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:A.LINEAR,minFilter:A.LINEAR})]),f=t.createFrameBuffer().setTexture([t.createTexture().setting({magFilter:A.LINEAR,minFilter:A.LINEAR})]),p=new N(t,{name:`ssao`,frag:Qn,renderTarget:on(`ssao`,d),uniforms:hn.merge({uSSAOBackBuffer:{value:f.textures[0],type:`1i`},uSSAOKernel:{value:cr(16),type:`3fv`}}),resolutionRatio:.5,passThrough:!0}),m=hn.merge({uSSAOTexture:{value:f.textures[0],type:`1i`},uPosTexture:{value:null,type:`1i`},uNormalTexture:{value:null,type:`1i`},uWeights:{type:`1fv`,value:Ae.gaussWeights(8)}}),h=new N(t,{name:`ssaoBlur/h`,frag:on(`ssaoBlur`,er),uniforms:m,resolutionRatio:1,passThrough:!0,defines:{SSAOSAMPLE:8}}),g=new N(t,{name:`ssaoBlur/v`,frag:on(`ssaoBlur`,er),uniforms:hn.merge(m,{uSSAOTexture:{value:h.renderTarget.textures[0],type:`1i`}}),defines:{SSAOSAMPLE:8,IS_VIRT:``},resolutionRatio:1,passThrough:!0}),_=()=>t.createFrameBuffer({disableDepthBuffer:!0}).setTexture([t.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA,magFilter:A.LINEAR,minFilter:A.LINEAR})]),v=new N(t,{name:`ssr`,frag:on(`ssr`,nr),renderTarget:_(),uniforms:hn.merge({uGbufferPos:{value:n.gBuffer.textures[0],type:`1i`},uGbufferNormal:{value:n.normalBuffer.textures[0],type:`1i`},uVelTex:{value:n.gBuffer.textures[4],type:`1i`},uPrevScene:{value:n.prevSceneBuffer.textures[0],type:`1i`}}),resolutionRatio:.5,passThrough:!0}),y=_(),b=_(),x=new N(t,{name:`ssrTemporal`,frag:on(`ssrTemporal`,ir),renderTarget:y,uniforms:hn.merge({uSSRCurrent:{value:v.renderTarget.textures[0],type:`1i`},uSSRBackBuffer:{value:b.textures[0],type:`1i`},uGbufferPos:{value:n.gBuffer.textures[0],type:`1i`},uVelTex:{value:n.gBuffer.textures[4],type:`1i`}}),resolutionRatio:.5,passThrough:!0}),S=new N(t,{name:`deferredShading`,frag:on(`deferredShading`,Wn),uniforms:hn.merge({uLightShaftTexture:{value:u.renderTarget.textures[0],type:`1i`},uSSAOTexture:{value:g.renderTarget.textures[0],type:`1i`},uSSAOResolutionInv:{value:p.resolutionInv,type:`2fv`},uSSRTexture:{value:y.textures[0],type:`1i`},uEnvMap:{value:e.envMap,type:`1i`}})}),C=()=>t.createFrameBuffer({disableDepthBuffer:!0}).setTexture([t.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA,magFilter:A.LINEAR,minFilter:A.LINEAR})]),ee=hn.merge({uDiffuseTexture:{value:n.shadingBuffer.textures[1],type:`1i`},uAlbedoTexture:{value:n.gBuffer.textures[2],type:`1i`},uPosTexture:{value:n.gBuffer.textures[0],type:`1i`},uNormalTexture:{value:n.normalBuffer.textures[0],type:`1i`},uSSSRadius:{value:.05,type:`1f`},uKernel:{value:Hn(lr),type:`4fv`}}),w=new N(t,{name:`sss/h`,frag:on(`sss`,or),uniforms:ee,renderTarget:C(),passThrough:!0,defines:{SSS_SAMPLES:lr}}),T=new N(t,{name:`sss/v`,frag:on(`sss`,or),uniforms:hn.merge(ee,{uDiffuseTexture:{value:w.renderTarget.textures[0],type:`1i`},uShadingTexture:{value:n.shadingBuffer.textures[0],type:`1i`},uShadingDiffuseTexture:{value:n.shadingBuffer.textures[1],type:`1i`}}),renderTarget:C(),defines:{SSS_SAMPLES:lr,IS_VIRT:``}}),te=new N(t,{name:`sss/copy`,renderTarget:t.createFrameBuffer({disableDepthBuffer:!0}).setTexture([n.shadingBuffer.textures[0]])});this.postprocess=new wn({passes:[r,s,l,u,p,h,g,v,x,S,w,T,te]}),this.shading=S,this.lightShaft=s,this.ssao=p,this.rtSSAO1=d,this.rtSSAO2=f,this.ssaoBlur=h,this.ssaoBlurV=g,this.ssr=v,this.ssrTemporal=x,this.rtSSR1=y,this.rtSSR2=b,this.sssH=w,this.sssV=T,this.sssCopy=te,this.rtLightShaft1=a,this.rtLightShaft2=o,this.lightShaftBlurH=l,this.lightShaftBlurV=u,this.normalSelector_=r;for(let e=0;e<n.gBuffer.textures.length;e++){let t=n.gBuffer.textures[e];e===1&&(t=n.normalBuffer.textures[0]),S.uniforms[`sampler`+e]=p.uniforms[`sampler`+e]={type:`1i`,value:t}}S.renderTarget=n.shadingBuffer,r.renderTarget=n.normalBuffer,r.uniforms.uNormalTexture.value=n.gBuffer.textures[1],r.uniforms.uPosTexture.value=n.gBuffer.textures[0],r.uniforms.uSelectorTexture.value=n.gBuffer.textures[3],m.uPosTexture.value=n.gBuffer.textures[0],m.uNormalTexture.value=n.normalBuffer.textures[0]}update(){let e=this.rtLightShaft1;this.rtLightShaft1=this.rtLightShaft2,this.rtLightShaft2=e,this.lightShaft.setRendertarget(this.rtLightShaft1),this.lightShaftBlurH.uniforms.uLightShaftTexture.value=this.rtLightShaft1.textures[0],this.lightShaft.uniforms.uLightShaftBackBuffer.value=this.rtLightShaft2.textures[0];let t=this.lightShaft.uniforms.uFrame;t.value=(t.value+1)%dr,e=this.rtSSAO1,this.rtSSAO1=this.rtSSAO2,this.rtSSAO2=e,this.ssao.setRendertarget(this.rtSSAO1),this.ssaoBlur.uniforms.uSSAOTexture.value=this.rtSSAO1.textures[0],this.ssao.uniforms.uSSAOBackBuffer.value=this.rtSSAO2.textures[0],e=this.rtSSR1,this.rtSSR1=this.rtSSR2,this.rtSSR2=e,this.ssrTemporal.setRendertarget(this.rtSSR1),this.shading.uniforms.uSSRTexture.value=this.rtSSR1.textures[0],this.ssrTemporal.uniforms.uSSRBackBuffer.value=this.rtSSR2.textures[0]}setPassEnabled(e){e.ssao!==void 0&&(this.ssao.enabled=e.ssao,this.ssaoBlur.enabled=e.ssao,this.ssaoBlurV.enabled=e.ssao,e.ssao||(this.rtSSAO1.clear(),this.rtSSAO2.clear(),this.ssaoBlur.renderTarget&&this.ssaoBlur.renderTarget.clear(),this.ssaoBlurV.renderTarget&&this.ssaoBlurV.renderTarget.clear())),e.ssr!==void 0&&(this.ssr.enabled=e.ssr,this.ssrTemporal.enabled=e.ssr,e.ssr||(this.rtSSR1.clear(),this.rtSSR2.clear())),e.sss!==void 0&&(this.sssH.enabled=e.sss,this.sssV.enabled=e.sss,this.sssCopy.enabled=e.sss),e.lightShaft!==void 0&&(this.lightShaft.enabled=e.lightShaft,this.lightShaftBlurH.enabled=e.lightShaft,this.lightShaftBlurV.enabled=e.lightShaft,e.lightShaft||(this.rtLightShaft1.clear(),this.rtLightShaft2.clear(),this.lightShaftBlurV.renderTarget.clear()))}setSSSRadius(e){this.sssH.uniforms.uSSSRadius.value=e}resize(e){this.postprocess.resize(e)}dispose(){this.postprocess.dispose(),this.rtLightShaft1.dispose(),this.rtLightShaft2.dispose(),this.rtSSAO1.dispose(),this.rtSSAO2.dispose(),this.rtSSR1.dispose(),this.rtSSR2.dispose(),this.rtLightShaft1.textures[0].dispose(),this.rtLightShaft2.textures[0].dispose();for(let e of[this.lightShaftBlurH,this.lightShaftBlurV,this.sssH,this.sssV])e.renderTarget.textures[0].dispose(),e.renderTarget.dispose();this.sssCopy.renderTarget.dispose()}}})))()}var mr;function hr(){return(hr=t((()=>{mr=`uniform sampler2D uShadingTexture;
uniform float uThreshold;
uniform float uBrightness;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uShadingTexture, vUv );
  
	vec3 f;
	f = max( c.xyz - uThreshold, vec3( 0.0 ) ) / 10.0 * uBrightness;
	outColor = vec4( f, 1.0 );
	
}`})))()}var gr;function _r(){return(_r=t((()=>{gr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var vr;function yr(){return(yr=t((()=>{vr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
uniform float uToneMap;\r
uniform float uExposure;\r
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
    col = mix( col, ACESFitted( col * uExposure ), uToneMap );\r
\r
	// WebGL には sRGB の drawingBuffer が無いので、表示用の sRGB へはここで変換する\r
	outColor = vec4( linearToSrgb( col ), 1.0 );\r
\r
}`})))()}var br;function xr(){return(xr=t((()=>{br=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
`})))()}var Sr;function Cr(){return(Cr=t((()=>{Sr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
}`})))()}var wr;function Tr(){return(Tr=t((()=>{wr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
`})))()}var Er;function Dr(){return(Dr=t((()=>{Er=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

// Fragment shader: Upsampling and composition
void main( void ) {

	vec4 cs = texture(uBackBuffer0, vUv);
	vec4 cb = texture(uBokeTex, vUv);

	outColor = vec4(cs.rgb * cb.a + cb.rgb, cs.a);

}
`})))()}var Or;function kr(){return(kr=t((()=>{Or=`uniform sampler2D uBackBuffer0;\r
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
}`})))()}var Ar;function jr(){return(jr=t((()=>{Ar=`// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

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
  
}`})))()}var Mr;function Nr(){return(Nr=t((()=>{Mr=`in vec2 vUv;

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

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

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

}`})))()}var Pr;function Fr(){return(Fr=t((()=>{Pr=`in vec2 vUv;
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

}`})))()}var Ir;function Lr(){return(Lr=t((()=>{Ir=`in vec2 vUv;
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

}`})))()}var Rr,zr,Br,Vr,Hr;function Ur(){return(Ur=t((()=>{k(),P(),Ye(),hr(),_r(),yr(),xr(),Cr(),Tr(),Dr(),kr(),jr(),Nr(),Fr(),Lr(),Rr=4,zr=8,Br=14/1080,Vr=e=>e.createFrameBuffer().setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA,magFilter:A.LINEAR,minFilter:A.LINEAR})]),Hr=class{dofCoc;dofBokeh;dofBlur;dofComposite;postprocess;_dofParams;_motionBlur;_motionBlurTile;_motionBlurNeighbor;_colorCollection;_bloomBright;_bloomPasses;constructor(e,t){let n=new N(e,{name:`collection`,frag:vr,uniforms:{uToneMap:{value:1,type:`1f`},uExposure:{value:1,type:`1f`}}}),r=new D(10,.05,20,.05),i=new N(e,{name:`dof/coc`,frag:wr,uniforms:hn.merge({uGbufferPos:{value:null,type:`1i`},uParams:{value:r,type:`4f`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:A.LINEAR,minFilter:A.LINEAR,internalFormat:A.RGBA16F,type:A.HALF_FLOAT,format:A.RGBA})]),passThrough:!0,resolutionRatio:.5}),a=new N(e,{name:`dof/bokeh`,frag:Sr,uniforms:hn.merge({uCocTex:{value:i.renderTarget.textures[0],type:`1i`},uParams:{value:r,type:`4f`}}),renderTarget:Vr(e),passThrough:!0,resolutionRatio:.5}),o=new N(e,{name:`dof/blur`,frag:br,uniforms:hn.merge({uBokeTex:{value:a.renderTarget.textures[0],type:`1i`}}),renderTarget:Vr(e),passThrough:!0,resolutionRatio:.5}),s=new N(e,{name:`dof/composite`,frag:Er,uniforms:hn.merge({uBokeTex:{value:o.renderTarget.textures[0],type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({magFilter:A.LINEAR,minFilter:A.LINEAR,internalFormat:A.RGBA16F,type:A.HALF_FLOAT,format:A.RGBA})])}),c=new N(e,{name:`motionBlurTile`,frag:Ir,uniforms:hn.merge({uVelTex:{value:null,type:`1i`}}),renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA32F,format:A.RGBA})]),defines:{TILE:16},resolutionRatio:1/16,passThrough:!0}),l=new N(e,{name:`motionBlurNeighbor`,frag:Pr,uniforms:hn.merge({uVelTex:{value:c.renderTarget.textures[0],type:`1i`}}),defines:{TILE:16},renderTarget:e.createFrameBuffer().setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA32F,format:A.RGBA})]),resolutionRatio:1/16,passThrough:!0}),u=new N(e,{name:`motionBlur`,frag:Mr,uniforms:hn.merge({uVelNeighborTex:{value:l.renderTarget.textures[0],type:`1i`},uVelTex:{value:null,type:`1i`},uDepthTexture:{value:null,type:`1i`},uPower:{value:1,type:`1f`}}),defines:{TILE:16},renderTarget:Vr(e)}),d=new N(e,{name:`fxaa`,frag:Or}),f=new N(e,{name:`bloom/bright`,frag:mr,uniforms:{uShadingTexture:{value:t.shadingBuffer.textures[0],type:`1i`},uThreshold:{value:1,type:`1f`},uBrightness:{value:1,type:`1f`}},renderTarget:Vr(e),resolutionRatio:.5,passThrough:!0}),p=[f],m=[],h=f.renderTarget.textures[0],g=2;for(let t=0;t<Rr;t++){let n=Vr(e),r=Vr(e),i={name:`bloom/blur/`+t+`/v`,renderTarget:n,frag:Ar,uniforms:{uBackBlurTex:{value:h,type:`1i`},uIsVertical:{type:`1i`,value:!0},uWeights:{type:`1fv`,value:Ae.gaussWeights(zr)},uBlurRange:{value:2,type:`1f`}},defines:{GAUSS_WEIGHTS:zr.toString(),USE_BACKBLURTEX:``},passThrough:!0,resolutionRatio:1/g};p.push(new N(e,i)),p.push(new N(e,{...i,name:`bloom/blur/`+t+`/h`,renderTarget:r,uniforms:{...i.uniforms,uBackBlurTex:{value:n.textures[0],type:`1i`},uIsVertical:{type:`1i`,value:!1}}})),m.push(r.textures[0]),h=r.textures[0],g*=2}p.push(new N(e,{name:`bloom/composite`,frag:gr,uniforms:{uBloomTexture:{value:m,type:`1iv`}},renderTarget:Vr(e)})),this.postprocess=new wn({passes:[i,a,o,s,c,l,u,...p,n,d]}),this.dofCoc=i,this.dofBokeh=a,this.dofBlur=o,this.dofComposite=s,this._motionBlur=u,this._motionBlurTile=c,this._motionBlurNeighbor=l,this._colorCollection=n,this._bloomBright=f,this._bloomPasses=p,this._dofParams=r,i.uniforms.uGbufferPos.value=t.gBuffer.textures[0],c.uniforms.uVelTex.value=t.gBuffer.textures[4],u.uniforms.uVelTex.value=t.gBuffer.textures[4],u.uniforms.uDepthTexture.value=t.gBuffer.depthTexture}update(e){let t=e.dofParams.kFilmHeight,n=.5*t/Math.tan(.5*(e.fov/180*Math.PI)),r=Math.max(e.dofParams.focusDistance,n),i=Br,a=1/i,o=n*n/(e.dofParams.fNumber*(r-n)*t*2);this._dofParams.set(r,i,a,o)}resize(e){this.postprocess.resize(e)}setPassEnabled(e){if(e.toneMap!==void 0&&(this._colorCollection.uniforms.uToneMap.value=+!!e.toneMap),e.bloom!==void 0)for(let t of this._bloomPasses)t.enabled=e.bloom;e.motionBlur!==void 0&&(this._motionBlurTile.enabled=e.motionBlur,this._motionBlurNeighbor.enabled=e.motionBlur,this._motionBlur.enabled=e.motionBlur,e.motionBlur||(this._motionBlurTile.renderTarget&&this._motionBlurTile.renderTarget.clear(),this._motionBlurNeighbor.renderTarget&&this._motionBlurNeighbor.renderTarget.clear())),e.dof!==void 0&&(this.dofCoc.enabled=e.dof,this.dofBokeh.enabled=e.dof,this.dofBlur.enabled=e.dof,this.dofComposite.enabled=e.dof,e.dof||(this.dofBokeh.renderTarget&&this.dofBokeh.renderTarget.clear(),this.dofBlur.renderTarget&&this.dofBlur.renderTarget.clear(),this.dofComposite.renderTarget&&this.dofComposite.renderTarget.clear()))}setMotionBlurPower(e){this._motionBlur.uniforms.uPower.value=e}setExposure(e){this._colorCollection.uniforms.uExposure.value=2**e}setBloomParams(e,t){this._bloomBright.uniforms.uThreshold.value=e,this._bloomBright.uniforms.uBrightness.value=t}dispose(){this.postprocess.dispose()}}})))()}var Wr,Gr;function Kr(){return(Kr=t((()=>{k(),Ye(),Tn(),On(),pr(),Ur(),Wr=e=>{let t=e.createFrameBuffer();t.setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA32F,format:A.RGBA,magFilter:A.NEAREST,minFilter:A.NEAREST}),e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA32F,format:A.RGBA}),e.createTexture().setting({internalFormat:A.SRGB8_ALPHA8}),e.createTexture(),e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA32F,format:A.RGBA})]);let n=e.createFrameBuffer({disableDepthBuffer:!0});n.setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA}),e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA})]);let r=e.createFrameBuffer({disableDepthBuffer:!0});r.setDepthTexture(t.depthTexture),r.setTexture([n.textures[0],t.textures[0],t.textures[4]]);let i=e.createFrameBuffer({disableDepthBuffer:!0});i.setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA,magFilter:A.LINEAR,minFilter:A.LINEAR})]);let a=e.createFrameBuffer({disableDepthBuffer:!0});a.setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA16F,format:A.RGBA,magFilter:A.LINEAR,minFilter:A.LINEAR})]);let o=e.createFrameBuffer({disableDepthBuffer:!0});o.setDepthTexture(t.depthTexture),o.setTexture([e.createTexture()]);let s=e.createFrameBuffer();return s.setTexture([e.createTexture().setting({type:A.FLOAT,internalFormat:A.RGBA32F,format:A.RGBA,magFilter:A.NEAREST,minFilter:A.NEAREST})]),{gBuffer:t,shadingBuffer:n,forwardBuffer:r,refractionBuffer:i,prevSceneBuffer:a,uiBuffer:o,normalBuffer:s}},Gr=class{camera;size;resolution;offscreen;renderTarget;deferredRenderer;pipelinePostProcess;_backend;_pipelineOverride;_sceneConfig;_onDispose;_userPostProcess;_userPostProcessParams;constructor(e){this.camera=null,this.size=null,this.resolution=new D,this.offscreen=e.offscreen,this._backend=e.backend,this._pipelineOverride=null,this._userPostProcess=null,this._userPostProcessParams=null,this._sceneConfig=e.sceneConfig,this._onDispose=e.onDispose,this.renderTarget=Wr(e.backend),this.deferredRenderer=new fr({backend:e.backend,envMap:e.envMap,envMapCube:e.envMapCube,renderTarget:this.renderTarget}),this.pipelinePostProcess=new Hr(e.backend,this.renderTarget),this.fit(e.resolution),this.applyPipelineConfig()}get pipelineOverride(){return this._pipelineOverride}set pipelineOverride(e){this._pipelineOverride=e,this.applyPipelineConfig()}applyPipelineConfig(){let e={...this._sceneConfig,...this._pipelineOverride};this.deferredRenderer.setPassEnabled({ssao:e.ssao,lightShaft:e.lightShaft,ssr:e.ssr,sss:e.sss}),this.deferredRenderer.setSSSRadius(e.sssRadius??.05),this.pipelinePostProcess.setPassEnabled({toneMap:e.toneMap,motionBlur:e.motionBlur,dof:e.dof,bloom:e.bloom}),this.pipelinePostProcess.setMotionBlurPower(e.motionBlurPower??1),this.pipelinePostProcess.setExposure(e.exposure??0),this.pipelinePostProcess.setBloomParams(e.bloomThreshold??1,e.bloomBrightness??1)}fit(e){e.x<=0||e.y<=0||(this.resolution.x!==e.x||this.resolution.y!==e.y)&&this.resize(e)}resize(e){this.resolution.copy(e);let t=this.renderTarget;t.gBuffer.setSize(e),t.shadingBuffer.setSize(e),t.forwardBuffer.setSize(e),t.refractionBuffer.setSize(e),t.prevSceneBuffer.setSize(e),t.uiBuffer.setSize(e),t.normalBuffer.setSize(e),this.deferredRenderer.resize(e),this.pipelinePostProcess.resize(e),this._userPostProcess&&this._userPostProcess.resize(e)}fitUserPostProcess(e){if(e===this._userPostProcessParams)return this._userPostProcess;if(this._disposeUserPostProcess(),this._userPostProcessParams=e,!e||e.length===0)return null;let t=[];for(let n of e)t.push(new N(this._backend,{...n,uniforms:{...n.uniforms}}));return this._userPostProcess=new wn({passes:t}),this._userPostProcess.resize(this.resolution),this._userPostProcess}_disposeUserPostProcess(){let e=this._userPostProcess;if(e){for(let t of e.passes){let e=t.renderTarget;if(e){for(let t of e.textures)t.dispose();e.dispose()}}e.dispose(),this._userPostProcess=null}}dispose(){this._onDispose(this);let e=this.renderTarget;e.forwardBuffer.dispose();let t=[e.gBuffer,e.shadingBuffer,e.refractionBuffer,e.prevSceneBuffer,e.uiBuffer,e.normalBuffer];for(let e=0;e<t.length;e++){let n=t[e];for(let e=0;e<n.textures.length;e++)n.textures[e].dispose();n.dispose()}e.gBuffer.depthTexture&&e.gBuffer.depthTexture.dispose(),this.deferredRenderer.dispose(),this.pipelinePostProcess.dispose(),this._disposeUserPostProcess()}}})))()}var qr;function Jr(){return(Jr=t((()=>{qr=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// 空の模様を作るための仮想のワールド座標。空の球はカメラに追従するので実際の位置（outPos）は模様に使えない。
// normal は半径1の球の外向き法線（= カメラから見た向き）。
// 500 は追従前の「原点中心・半径500」の球と同じ座標にするための値で、既存の模様の細かさを保つ。
// 模様の計算にだけ使い、outPos には書かない（深度とポストエフェクトは実際の位置を読むため）
vec3 skyPosition( vec3 normal ) {

	return normalize( normal ) * 500.0;

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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

	float t = clamp( normalize( skyPosition( vNormal ) ).y * 0.5 + 0.5, 0.0, 1.0 );
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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}
`})))()}var Yr;function Xr(){return(Xr=t((()=>{k(),Gt(),Lt(),Cn(),Jr(),Yr=class{entity;mesh;material;color;groundColor;_intensity;_position;_positionPrev;_scale;_viewMatrixPrevInverse;constructor(e){this.color=new D(1,1,1),this.groundColor=new D(.3,.3,.3),this._intensity=1,this._position=new D,this._positionPrev=new D,this._scale=new D,this._viewMatrixPrevInverse=new O,this.material=new Sn({phase:[`deferred`,`envMap`],frag:qr,cullFace:!1,uniforms:{uSkyColor:{value:this.color,type:`3fv`},uGroundColor:{value:this.groundColor,type:`3fv`},uSkyIntensity:{value:this._intensity,type:`1f`}}}),this.entity=e.createEntity({name:`sky`}),this.mesh=this.entity.addComponent(M),this.mesh.geometry=new It({radius:1,widthSegments:32,heightSegments:32}),this.mesh.material=this.material}followCamera(e,t){let n=t.far*.99,r=e.matrixWorld.elm,i=this._viewMatrixPrevInverse.copy(t.viewMatrixPrev).inverse().elm;this._position.set(r[12],r[13],r[14]),this._positionPrev.set(i[12],i[13],i[14]),this._scale.set(n,n,n),this.entity.matrixWorld.setFromTransform(this._position,void 0,this._scale),this.entity.matrixWorldPrev.setFromTransform(this._positionPrev,void 0,this._scale)}get intensity(){return this._intensity}set intensity(e){this._intensity=e,this.material.uniforms.uSkyIntensity.value=e}}})))()}var Zr,Qr,$r,ei,ti,ni,ri,ii,ai,oi,si,ci,li,ui,di,fi,pi;function mi(){return(mi=t((()=>{qe(),k(),zt(),Ut(),Gt(),Ft(),Et(),Ye(),et(),yn(),Cn(),An(),Pn(),In(),Kr(),Xr(),Zr=[0,1,4],Qr=[0],$r=()=>({motionBlur:!0,motionBlurPower:1,ssr:!0,ssao:!0,lightShaft:!0,dof:!0,toneMap:!0,exposure:0,bloom:!0,bloomThreshold:1,bloomBrightness:1,sss:!1,sssRadius:.05}),ei=new Sn,ti=e=>e.material||ei,ni=(e,t)=>ti(e.getComponent(M)).renderOrder-ti(t.getComponent(M)).renderOrder,ri=0,ii=new D(1,1,1,1),ai=new D(0,0,0,1),oi=[],si=[],ci=e=>oi[e]||(oi[e]={direction:`directionalLight[${e}].direction`,color:`directionalLight[${e}].color`,camNear:`uDirectionalLightCamera[${e}].near`,camFar:`uDirectionalLightCamera[${e}].far`,camViewMatrix:`uDirectionalLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uDirectionalLightCamera[${e}].projectionMatrix`,camResolution:`uDirectionalLightCamera[${e}].resolution`,shadowMap:`directionalLightShadowMap[${e}]`}),li=e=>si[e]||(si[e]={position:`uSpotLight[${e}].position`,direction:`uSpotLight[${e}].direction`,color:`uSpotLight[${e}].color`,angle:`uSpotLight[${e}].angle`,blend:`uSpotLight[${e}].blend`,camNear:`uSpotLightCamera[${e}].near`,camFar:`uSpotLightCamera[${e}].far`,camViewMatrix:`uSpotLightCamera[${e}].viewMatrix`,camProjectionMatrix:`uSpotLightCamera[${e}].projectionMatrix`,camResolution:`uSpotLightCamera[${e}].resolution`,shadowMap:`spotLightShadowMap[${e}]`}),ui=class extends Tt{backend;canvas;resolution;globalUniforms;_views;_pipelineConfig;programManager;_geometryBuffers;_lights;_lightsUpdated;_lightInfoCache;_envMapCameras;_envMapRenderTarget;_envMapCube;_pmremRender;_stack;_sceneCamera;sky;_engine;_quad;_isCorrentCompiles;compileDrawParams;_tmpNormalMatrix;_tmpModelViewMatrix;_tmpViewMatrixInverseMatrix;_tmpLightDirection;_tmpModelMatrixInverse;_tmpProjectionMatrixInverse;_tmpResolution;_tmpResolutionUniform;_tmpUniformOverride;_tmpDrawParam;constructor(e,t){super(),this.backend=e,this.canvas=e.canvas,this.globalUniforms={},this._isCorrentCompiles=!1,this.compileDrawParams=[],this.programManager=new Fn(e),this._geometryBuffers=new Map,this.resolution=new D,this._views=[],this._stack=this._createRenderStack(),this._sceneCamera=null,this._lights={directional:[],spot:[]},this._lightsUpdated=!1,this._lightInfoCache=new Map;let n=e.createCubeTexture();this._envMapCube=n,this._envMapRenderTarget=e.createCubeFrameBuffer().setTexture([n]),this._envMapRenderTarget.setSize(256,256);let r=new D(0,0,0),i=new D(0,-1,0),a=[new O().lookAt(r,new D(1,0,0),i),new O().lookAt(r,new D(0,1,0),new D(0,0,1)),new O().lookAt(r,new D(0,0,1),i),new O().lookAt(r,new D(-1,0,0),i),new O().lookAt(r,new D(0,-1,0),new D(0,0,-1)),new O().lookAt(r,new D(0,0,-1),i)];this._envMapCameras=[];for(let e=0;e<6;e++){let n=t.createEntity({name:`envMapCamera/`+e}),r=n.addComponent(Rt);r.fov=90,r.near=.1,r.far=1e3,r.aspect=1,n.applyMatrix(a[e].clone()),r.updateViewMatrix(),r.updateProjectionMatrix(),this._envMapCameras.push({entity:n,camera:r})}this._pmremRender=new Nn(e,{input:[n],resolution:new D(768,1024)}),this._quad=new Pt({width:2,height:2}),this._tmpLightDirection=new D,this._tmpModelMatrixInverse=new O,this._tmpViewMatrixInverseMatrix=new O,this._tmpProjectionMatrixInverse=new O,this._tmpModelViewMatrix=new O,this._tmpNormalMatrix=new O,this._tmpResolution=new D,this._tmpResolutionUniform={value:this._tmpResolution,type:`2fv`},this._tmpUniformOverride={},this._tmpDrawParam={},this._engine=t,this.sky=new Yr(t),this._pipelineConfig=$r();let o=this.fieldDir(`sky`);o.field(`skyColor`,()=>this.sky.color.getElm(`vec3`),e=>{this.sky.color.set(e[0],e[1],e[2])},{format:{type:`color`}}),o.field(`groundColor`,()=>this.sky.groundColor.getElm(`vec3`),e=>{this.sky.groundColor.set(e[0],e[1],e[2])},{format:{type:`color`}}),o.field(`intensity`,()=>this.sky.intensity,e=>{this.sky.intensity=e},{step:.1}),o.field(`reset`,()=>()=>{this._resetSky(),this.noticeField(`sky/skyColor`),this.noticeField(`sky/groundColor`),this.noticeField(`sky/intensity`)},void 0,{label:`Reset to Default`});let s=this.fieldDir(`pipeline`);[`motionBlur`,`ssr`,`ssao`,`dof`,`lightShaft`,`toneMap`,`bloom`].forEach(e=>{let t=s.dir(e);t.field(`enabled`,()=>this._pipelineConfig[e]??!0,t=>{this.applyPipelineConfig({[e]:t})}),e===`motionBlur`&&t.field(`power`,()=>this._pipelineConfig.motionBlurPower??1,e=>{this.applyPipelineConfig({motionBlurPower:e})},{step:.1}),e===`toneMap`&&t.field(`exposure`,()=>this._pipelineConfig.exposure??0,e=>{this.applyPipelineConfig({exposure:e})},{step:.1}),e===`bloom`&&(t.field(`threshold`,()=>this._pipelineConfig.bloomThreshold??1,e=>{this.applyPipelineConfig({bloomThreshold:e})},{step:.1}),t.field(`brightness`,()=>this._pipelineConfig.bloomBrightness??1,e=>{this.applyPipelineConfig({bloomBrightness:e})},{step:.1}))});let c=s.dir(`sss`);c.field(`enabled`,()=>this._pipelineConfig.sss??!1,e=>{this.applyPipelineConfig({sss:e})}),c.field(`radius`,()=>this._pipelineConfig.sssRadius??.05,e=>{this.applyPipelineConfig({sssRadius:e})},{step:.01})}createView(e){let t=new Gr({backend:this.backend,envMap:this._pmremRender.renderTarget.textures[0],envMapCube:this._envMapCube,sceneConfig:this._pipelineConfig,resolution:this.resolution,offscreen:e?.offscreen??!1,onDispose:e=>{this._views.splice(this._views.indexOf(e),1)}});return this._views.push(t),t}_createRenderStack(){return{light:[],deferred:[],forward:[],transparent:[],ui:[],shadowMap:[],envMap:[]}}_collectRenderStack(e,t,n){let r=t&&e.visible&&!e.renderHidden,i=e.getComponent(M);if(i&&r){let t=ti(i);t.visibilityFlag.deferred&&n.deferred.push(e),t.visibilityFlag.shadowMap&&n.shadowMap.push(e),t.visibilityFlag.forward&&(t.transparent?n.transparent.push(e):n.forward.push(e)),t.visibilityFlag.ui&&n.ui.push(e),t.visibilityFlag.envMap&&n.envMap.push(e)}let a=e.getComponent(Ht);if(a&&a.enabled&&r&&n.light.push(e),!this._sceneCamera){let t=e.getComponentsByTag(`camera`);for(let n=0;n<t.length;n++)t[n].displayOut&&(this._sceneCamera=e)}for(let t=0;t<e.children.length;t++)this._collectRenderStack(e.children[t],r,n)}prepareScene(e,t){if(this.resolution.x===0||this.resolution.y===0)return;let n=this._stack=this._createRenderStack();this._sceneCamera=null,this._collectRenderStack(e,!0,n),this._collectRenderStack(this.sky.entity,!0,n),n.forward.sort(ni),n.transparent.sort(ni);let r=[],i={},a=Object.keys(this._lights);for(let e=0;e<a.length;e++){let t=a[e];i[t]=this._lights[t].length,this._lights[t]=[]}for(let e=0;e<n.light.length;e++){let t=n.light[e],i=t.getComponent(Ht);if(i){let e=this.collectLight(t,i);i.castShadow&&e.renderTarget&&i.lightType!==`directional`&&r.push(e)}}this._lights.directional.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lights.spot.sort((e,t)=>!e.component.castShadow-+!t.component.castShadow),this._lightsUpdated=!1;for(let e=0;e<a.length;e++){let t=a[e];if(i[t]!=this._lights[t].length){this._lightsUpdated=!0;break}}for(let e=0;e<r.length;e++){let t=r[e];this.renderCamera(`shadowMap`,t.component.entity,n.shadowMap,t.renderTarget,this.resolution)}for(let e=0;e<this._envMapCameras.length;e++){let{entity:t}=this._envMapCameras[e];this._envMapRenderTarget.face(e),this.renderCamera(`envMap`,t,n.envMap,this._envMapRenderTarget,this.resolution)}this.renderPostProcess(this._pmremRender.postprocess,void 0,this._pmremRender.resolution),this._pmremRender.swap()}render(e,t){let n=e;n.fit(n.size||this.resolution);let r=n.resolution;if(r.x===0||r.y===0)return;let i=n.camera||this._sceneCamera;if(!i)return;let a=i.getComponentsByTag(`camera`)[0];if(!a)return;let o=this._stack,s=n.renderTarget;this.backend.setBlendEnabled(!1);for(let e=0;e<this._lights.directional.length;e++){let t=this._lights.directional[e];!t.component.castShadow||!t.renderTarget||(t.component.fitShadowToCamera(a,t.component.shadowMapSize.x),this.renderCamera(`shadowMap`,t.component.entity,o.shadowMap,t.renderTarget,this.resolution))}this.renderCamera(`deferred`,i,o.deferred,s.gBuffer,r),o.forward.length>0&&this.renderCamera(`forwardPrepass`,i,o.forward,s.gBuffer,r,{disableClear:!0}),this.renderPostProcess(n.deferredRenderer.postprocess,void 0,r,{cameraOverride:{viewMatrix:a.viewMatrix,viewMatrixPrev:a.viewMatrixPrev,projectionMatrix:a.projectionMatrix,projectionMatrixPrev:a.projectionMatrixPrev,cameraMatrixWorld:i.matrixWorld,cameraNear:a.near,cameraFar:a.far}}),n.deferredRenderer.update();let c={uDeferredTexture:{value:s.refractionBuffer.textures[0],type:`1i`},uDeferredResolution:{value:s.shadingBuffer.size,type:`2fv`},uEnvMap:{value:this._pmremRender.renderTarget.textures[0],type:`1i`},uGbufferNormal:{value:s.normalBuffer.textures[0],type:`1i`},uGbufferAlbedo:{value:s.gBuffer.textures[2],type:`1i`},uGbufferMaterial:{value:s.gBuffer.textures[3],type:`1i`}};o.forward.length>0&&(this._copyToRefraction(s),this.backend.setDepthFunc(A.LEQUAL),this.renderCamera(`forward`,i,o.forward,s.forwardBuffer,r,{uniformOverride:c,disableClear:!0}),this.backend.setDepthFunc(A.LESS)),this.backend.blit(s.shadingBuffer,s.prevSceneBuffer,r.x,r.y,!0,!0);let l=[],u=null;for(let e of o.transparent){let t=ti(e.getComponent(M)).renderOrder;(u===null||t!==u)&&(l.push([]),u=t),l[l.length-1].push(e)}this.backend.setBlendEnabled(!0);for(let e=0;e<l.length;e++)this._copyToRefraction(s),this.renderCamera(`forward`,i,l[e],s.forwardBuffer,r,{uniformOverride:c,disableClear:!0});this.backend.setBlendEnabled(!1),this.renderPostProcess(n.pipelinePostProcess.postprocess,s.shadingBuffer,r,{cameraOverride:{viewMatrix:a.viewMatrix,projectionMatrix:a.projectionMatrix,cameraMatrixWorld:i.matrixWorld,cameraNear:a.near,cameraFar:a.far}}),n.pipelinePostProcess.update(a);let d=n.pipelinePostProcess.postprocess.output?n.pipelinePostProcess.postprocess.output:void 0,f=(this._sceneCamera||i).getComponent(vn),p=n.fitUserPostProcess(f?f.params:null);p&&p.hasOutput&&(this.renderPostProcess(p,d,r,{cameraOverride:{viewMatrix:a.viewMatrix,projectionMatrix:a.projectionMatrix,cameraMatrixWorld:i.matrixWorld,cameraNear:a.near,cameraFar:a.far}}),d=p.output||void 0);let m=n.offscreen?s.uiBuffer:null;if(d){let e=d.size;this.backend.blit(d,m,e.x,e.y)}this.backend.setBlendEnabled(!0),this.renderCamera(`forward`,i,o.ui,m,r,{uniformOverride:{uDeferredTexture:{value:s.refractionBuffer.textures[0],type:`1i`}},disableClear:!0}),this.backend.setBlendEnabled(!1)}renderCamera(e,t,n,r,i,a){let o=t.getComponentsByTag(`camera`)[0]||t.getComponent(Ht);a||={},(e==`deferred`||e==`envMap`)&&this.sky.followCamera(t,o);let s=this._tmpDrawParam;s.viewMatrix=o.viewMatrix,s.viewMatrixPrev=o.viewMatrixPrev,s.projectionMatrix=o.projectionMatrix,s.projectionMatrixPrev=o.projectionMatrixPrev,s.cameraMatrixWorld=t.matrixWorld,s.cameraNear=o.near,s.cameraFar=o.far,s.renderTarget=r,s.uniformOverride=a.uniformOverride||this._tmpUniformOverride,a.cameraOverride&&Object.assign(s,a.cameraOverride),this.backend.bindRenderTarget(r,o.viewPort,i),r?this._tmpResolution.set(r.size.x,r.size.y):this._tmpResolution.set(i.x,i.y),s.uniformOverride.uResolution=this._tmpResolutionUniform,a.disableClear||this.backend.clear(e==`shadowMap`?ii:ai,1);for(let t=0;t<n.length;t++){let r=n[t],i=r.getComponentsByTag(`materialOverride`)[0],a=r.getComponent(M),c=i&&i.material||ti(a),l=a.geometry;s.modelMatrixWorld=r.matrixWorld,s.modelMatrixWorldPrev=r.matrixWorldPrev,s.label=`cam[${o.uuid}]/${r.name||c.name||`-`}`,this.draw(r.uuid,e,l,c,s)}}_copyToRefraction(e){let t=e.shadingBuffer.size;this.backend.blit(e.shadingBuffer,e.refractionBuffer,t.x,t.y,!0,!0)}collectLight(e,t){let n=t.lightType,r=this._lightInfoCache.get(t);return r||(r={position:new D,direction:new D,color:new D,renderTarget:null,component:t},this._lightInfoCache.set(t,r)),r.position.set(0,0,0,1).applyMatrix4(e.matrixWorld),r.direction.set(0,1,0,0).applyMatrix4(e.matrixWorld).normalize(),r.color.set(t.color.x,t.color.y,t.color.z).multiply(t.intensity),n==`spot`&&r.color.multiply(1/(4*Math.PI)),n==`directional`?this._lights.directional.push(r):n==`spot`&&this._lights.spot.push(r),t.castShadow&&r.renderTarget==null&&(r.renderTarget=this.backend.createFrameBuffer().setTexture([this.backend.createTexture().setting({magFilter:A.LINEAR,minFilter:A.LINEAR})]),r.renderTarget.setSize(t.shadowMapSize)),r}renderPostProcess(e,t,n,r){let i=t?t.textures:void 0;if(e.passes)for(let t=0;t<e.passes.length;t++){let a=e.passes[t];if(a.enabled===!1)continue;let o=a.renderTarget;this.backend.bindRenderTarget(o,a.viewPort,n),this.backend.clear(a.clearColor,a.clearDepth);let s=a.backBufferOverride||i||null;if(s)for(let e=0;e<s.length;e++)a.uniforms[`uBackBuffer`+e]={type:`1i`,value:s[e]};let c=r&&r.cameraOverride||{};c.label=a.name,c.renderTarget=o,c.uniformOverride=r&&r.uniformOverride,this.draw(a.uuid,`postprocess`,this._quad,a,c),a.onAfterRender(),!a.passThrough&&a.renderTarget&&(i=a.renderTarget.textures)}}draw(e,t,n,r,i){if(this._isCorrentCompiles){this.compileDrawParams.push({drawId:e,renderType:t,geometry:n,material:r,param:{...i}});return}ri=0,this.backend.setMaterialState(r.cullFace,r.depthTest,r.depthWrite);let a=r.programCache[t];if(!a||this._lightsUpdated){let e={...r.defines};t==`deferred`?e.IS_DEFERRED=``:t==`forward`||t==`envMap`?e.IS_FORWARD=``:t==`shadowMap`&&(e.IS_DEPTH=``),t==`forwardPrepass`&&(e.IS_FORWARD=``,e.IS_PREPASS=``);let n=$e(r.vert,e,this._lights),i=$e(r.frag,e,this._lights);a=this.programManager.get(n,i,r.name),r.programCache[t]=a}if(i&&(i.modelMatrixWorld&&(a.setUniform(`uModelMatrix`,`Matrix4fv`,i.modelMatrixWorld.elm),a.setUniform(`uModelMatrixInverse`,`Matrix4fv`,this._tmpModelMatrixInverse.copy(i.modelMatrixWorld).inverse().elm),i.modelMatrixWorldPrev&&a.setUniform(`uModelMatrixPrev`,`Matrix4fv`,i.modelMatrixWorldPrev.elm),i.viewMatrix&&(this._tmpModelViewMatrix.copy(i.modelMatrixWorld).preMultiply(i.viewMatrix),this._tmpNormalMatrix.copy(this._tmpModelViewMatrix),this._tmpNormalMatrix.inverse(),this._tmpNormalMatrix.transpose(),a.setUniform(`uModelViewMatrix`,`Matrix4fv`,this._tmpModelViewMatrix.elm),a.setUniform(`uNormalMatrix`,`Matrix4fv`,this._tmpNormalMatrix.elm),a.setUniform(`uViewMatrixInverse`,`Matrix4fv`,this._tmpViewMatrixInverseMatrix.copy(i.viewMatrix).inverse().elm))),i.viewMatrix&&(a.setUniform(`uViewMatrix`,`Matrix4fv`,i.viewMatrix.elm),i.viewMatrixPrev&&a.setUniform(`uViewMatrixPrev`,`Matrix4fv`,i.viewMatrixPrev.elm)),i.projectionMatrix&&(a.setUniform(`uProjectionMatrix`,`Matrix4fv`,i.projectionMatrix.elm),a.setUniform(`uProjectionMatrixInverse`,`Matrix4fv`,this._tmpProjectionMatrixInverse.copy(i.projectionMatrix).inverse().elm),i.projectionMatrixPrev&&a.setUniform(`uProjectionMatrixPrev`,`Matrix4fv`,i.projectionMatrixPrev.elm)),i.cameraMatrixWorld&&(a.setUniform(`uCameraMatrix`,`Matrix4fv`,i.cameraMatrixWorld.elm),a.setUniform(`uCameraPosition`,`3f`,[i.cameraMatrixWorld.elm[12],i.cameraMatrixWorld.elm[13],i.cameraMatrixWorld.elm[14]])),t!=`deferred`&&(i.cameraNear&&a.setUniform(`uCameraNear`,`1f`,[i.cameraNear]),i.cameraFar&&a.setUniform(`uCameraFar`,`1f`,[i.cameraFar]))),r.useLight&&t!==`deferred`&&t!==`shadowMap`){for(let e=0;e<this._lights.directional.length;e++){let t=this._lights.directional[e],n=ci(e);if(a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),t.renderTarget){let e=t.renderTarget.textures[0].activate(ri++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}for(let e=0;e<this._lights.spot.length;e++){let t=this._lights.spot[e],n=li(e);if(i&&i.viewMatrix&&this._tmpLightDirection.copy(t.direction).applyMatrix3(i.viewMatrix),a.setUniform(n.position,`3fv`,t.position.getElm(`vec3`)),a.setUniform(n.direction,`3fv`,t.direction.getElm(`vec3`)),a.setUniform(n.color,`3fv`,t.color.getElm(`vec3`)),a.setUniform(n.angle,`1fv`,[Math.cos(t.component.angle/2)]),a.setUniform(n.blend,`1fv`,[t.component.blend]),t.renderTarget){let e=t.renderTarget.textures[0].activate(ri++);a.setUniform(n.camNear,`1fv`,[t.component.near]),a.setUniform(n.camFar,`1fv`,[t.component.far]),a.setUniform(n.camViewMatrix,`Matrix4fv`,t.component.viewMatrix.elm),a.setUniform(n.camProjectionMatrix,`Matrix4fv`,t.component.projectionMatrix.elm),a.setUniform(n.camResolution,`2fv`,e.size.getElm(`vec2`)),a.setUniform(n.shadowMap,`1i`,[e.unit])}}}pi(a,this.globalUniforms,r.uniforms,i&&i.uniformOverride);let o=a.getVAO(e.toString());if(o){let e=this._getGeometryBuffer(n);e.vaoVersions.get(o)!==n.updateVersion&&(n.attributes.forEach((t,n)=>{let r=e.buffers.get(n);r!==void 0&&(n==`index`?o.setIndex(r):o.setAttribute(n,r,t.size,t.opt))}),e.vaoVersions.set(o,n.updateVersion));let s=i&&i.renderTarget,c=null;t==`forwardPrepass`?c=Zr:t==`forward`&&(!r.transparent||!r.writeGBuffer)&&(c=Qr),s&&c&&this.backend.setDrawBuffers(s,c),this.backend.draw(a,o,r.drawType,r.blending,void 0),s&&c&&this.backend.setDrawBuffers(s,null)}}_getGeometryBuffer(e){let t=this._geometryBuffers.get(e);if(t||(t={buffers:new Map,vaoVersions:new Map,version:-1},this._geometryBuffers.set(e,t)),t.version!==e.updateVersion){let n=t.buffers;n.forEach(e=>e.dispose()),n.clear(),t.vaoVersions.clear(),e.attributes.forEach((e,t)=>{n.set(t,new Le(this.backend.gl).setData(e.array,t==`index`?`ibo`:`vbo`,e.opt&&e.opt.usage))}),t.version=e.updateVersion}return t}applyPipelineConfig(e){Object.assign(this._pipelineConfig,e);for(let e=0;e<this._views.length;e++)this._views[e].applyPipelineConfig()}get pipelineConfig(){return this._pipelineConfig}resize(e){this.resolution.copy(e);for(let t=0;t<this._views.length;t++){let n=this._views[t];n.fit(n.size||e)}}_resetSky(){this.sky.entity.disposeRecursive(),this.sky=new Yr(this._engine)}reset(){this._resetSky(),this.applyPipelineConfig($r()),this._geometryBuffers.forEach(e=>{e.buffers.forEach(e=>e.dispose())}),this._geometryBuffers.clear(),this._lightInfoCache.forEach(e=>{e.renderTarget&&(e.renderTarget.textures.forEach(e=>e.dispose()),e.renderTarget.dispose())}),this._lightInfoCache.clear()}async compileShaders(e,t,n,r){this._isCorrentCompiles=!0,this.compileDrawParams=[],this.prepareScene(e,n),this.render(t,n),this._isCorrentCompiles=!1;let i=this.compileDrawParams.length,a=0;for(let e=0;e<this.compileDrawParams.length;e++){let t=this.compileDrawParams[e];if(this.backend.bindRenderTarget(t.param.renderTarget||null),this.draw(t.drawId,t.renderType,t.geometry,t.material,t.param),await new Promise(e=>{setTimeout(()=>{e(null)},10)}),r){a++;let e=t.param&&t.param.label||`-`;r(`${t.renderType}/${e}/[${t.drawId}]`,a,i)}}}createTexProcedural(e){let t={},n=e.textures||{},r=Object.keys(n);for(let e=0;e<r.length;e++)t[r[e]]={value:n[r[e]],type:`1i`};let i=new kn(this,{frag:e.frag,resolution:e.resolution,uniforms:t});return e.filter===`nearest`&&(i.setting({magFilter:A.NEAREST,minFilter:A.NEAREST}),i.render()),i}},di=[],fi=(e,t)=>{e!=null&&(typeof e==`number`||typeof e==`boolean`?di.push(e):`isVector`in e?di.push(...e.getElm(`vec`+t.charAt(0))):`isTexture`in e?(e.activate(ri++),di.push(e.unit)):di.push(...e.elm))},pi=(e,...t)=>{for(let n=0;n<t.length;n++){let r=t[n];if(!r)continue;let i=Object.keys(r);for(let t=0;t<i.length;t++){let n=i[t],a=r[n];if(!a)continue;let o=a.type,s=a.value;if(di.length=0,Array.isArray(s))for(let e=0;e<s.length;e++)fi(s[e],o);else fi(s,o);di.length>0&&e.setUniform(n,o,di)}}},ui.__docgenInfo={description:``,methods:[{name:`createView`,docblock:null,modifiers:[],params:[{name:`opt`,optional:!0,type:{name:`signature`,type:`object`,raw:`{
	offscreen?: boolean;
}`,signature:{properties:[{key:`offscreen`,value:{name:`boolean`,required:!1}}]},alias:`RenderViewOptions`}}],returns:{type:{name:`RenderView`}}},{name:`prepareScene`,docblock:null,modifiers:[],params:[{name:`root`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`_event`,optional:!1,type:{name:`EntityUpdateEvent`,alias:`EntityUpdateEvent`}}],returns:null},{name:`renderCamera`,docblock:null,modifiers:[],params:[{name:`renderType`,optional:!1,type:{name:`union`,raw:`MaterialRenderType | 'forwardPrepass'`,elements:[{name:`union`,raw:`"shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"`,elements:[{name:`literal`,value:`"shadowMap"`},{name:`literal`,value:`"deferred"`},{name:`literal`,value:`"forward"`},{name:`literal`,value:`"envMap"`},{name:`literal`,value:`'ui'`},{name:`literal`,value:`"postprocess"`}]},{name:`literal`,value:`'forwardPrepass'`}],alias:`MaterialDrawPass`}},{name:`cameraEntity`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`entities`,optional:!1,type:{name:`Array`,elements:[{name:`Entity`}],raw:`Entity[]`}},{name:`renderTarget`,optional:!1,type:{name:`union`,raw:`GLP.GLPowerFrameBuffer | null`,elements:[{name:`GLP.GLPowerFrameBuffer`},{name:`null`}]}},{name:`canvasSize`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}},{name:`renderOption`,optional:!0,type:{name:`RenderOption`,alias:`RenderOption`}}],returns:null},{name:`renderPostProcess`,docblock:null,modifiers:[],params:[{name:`postprocess`,optional:!1,type:{name:`PostProcess`,alias:`PostProcess`}},{name:`input`,optional:!0,type:{name:`GLP.GLPowerFrameBuffer`,alias:`GLP.GLPowerFrameBuffer`}},{name:`canvasSize`,optional:!0,type:{name:`MTP.Vector`,alias:`MTP.Vector`}},{name:`renderOption`,optional:!0,type:{name:`RenderOption`,alias:`RenderOption`}}],returns:null},{name:`draw`,docblock:null,modifiers:[],params:[{name:`drawId`,optional:!1,type:{name:`string`}},{name:`renderType`,optional:!1,type:{name:`union`,raw:`MaterialRenderType | 'forwardPrepass'`,elements:[{name:`union`,raw:`"shadowMap" | "deferred" | "forward" | "envMap" | 'ui' | "postprocess"`,elements:[{name:`literal`,value:`"shadowMap"`},{name:`literal`,value:`"deferred"`},{name:`literal`,value:`"forward"`},{name:`literal`,value:`"envMap"`},{name:`literal`,value:`'ui'`},{name:`literal`,value:`"postprocess"`}]},{name:`literal`,value:`'forwardPrepass'`}],alias:`MaterialDrawPass`}},{name:`geometry`,optional:!1,type:{name:`Geometry`,alias:`Geometry`}},{name:`material`,optional:!1,type:{name:`Material`,alias:`Material`}},{name:`param`,optional:!0,type:{name:`DrawParam`,alias:`DrawParam`}}],returns:null},{name:`applyPipelineConfig`,docblock:null,modifiers:[],params:[{name:`config`,optional:!1,type:{name:`signature`,type:`object`,raw:`{
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// ACES トーンマップ。オフだとシェーダーで書いた色がそのまま画面へ出る
	toneMap?: boolean;
	// 露出（EV）。トーンマップの直前で色に 2^exposure を掛ける（Blender の Color Management > Exposure と同じ意味）。toneMap がオフだと掛からない
	exposure?: number;
	// ブルームの輝度抽出はトーンマップ前の HDR から行うので、しきい値は HDR の値で指定する
	bloom?: boolean;
	bloomThreshold?: number;
	bloomBrightness?: number;
	// SSS（肌の表面下散乱）。albedo.w に強さを書いたディファードの物体の diffuse をぼかす。
	// 半径はシーン全体で1つで、ワールド単位の散乱距離
	sss?: boolean;
	sssRadius?: number;
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
}`,signature:{properties:[{key:`motionBlur`,value:{name:`boolean`,required:!1}},{key:`motionBlurPower`,value:{name:`number`,required:!1}},{key:`ssr`,value:{name:`boolean`,required:!1}},{key:`ssao`,value:{name:`boolean`,required:!1}},{key:`lightShaft`,value:{name:`boolean`,required:!1}},{key:`dof`,value:{name:`boolean`,required:!1}},{key:`toneMap`,value:{name:`boolean`,required:!1}},{key:`exposure`,value:{name:`number`,required:!1}},{key:`bloom`,value:{name:`boolean`,required:!1}},{key:`bloomThreshold`,value:{name:`number`,required:!1}},{key:`bloomBrightness`,value:{name:`number`,required:!1}},{key:`sss`,value:{name:`boolean`,required:!1}},{key:`sssRadius`,value:{name:`number`,required:!1}},{key:`lightShaftIntensity`,value:{name:`number`,required:!1}},{key:`lightShaftBlur`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporal`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporalBlend`,value:{name:`number`,required:!1}},{key:`ssaoIntensity`,value:{name:`number`,required:!1}},{key:`ssaoBlur`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporal`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporalBlend`,value:{name:`number`,required:!1}}]},alias:`PipelineConfig`}}],returns:{type:{name:`void`}}},{name:`pipelineConfig`,docblock:null,modifiers:[`get`],params:[],returns:{type:{name:`signature`,type:`object`,raw:`{
	motionBlur?: boolean;
	motionBlurPower?: number;
	ssr?: boolean;
	ssao?: boolean;
	lightShaft?: boolean;
	dof?: boolean;
	// ACES トーンマップ。オフだとシェーダーで書いた色がそのまま画面へ出る
	toneMap?: boolean;
	// 露出（EV）。トーンマップの直前で色に 2^exposure を掛ける（Blender の Color Management > Exposure と同じ意味）。toneMap がオフだと掛からない
	exposure?: number;
	// ブルームの輝度抽出はトーンマップ前の HDR から行うので、しきい値は HDR の値で指定する
	bloom?: boolean;
	bloomThreshold?: number;
	bloomBrightness?: number;
	// SSS（肌の表面下散乱）。albedo.w に強さを書いたディファードの物体の diffuse をぼかす。
	// 半径はシーン全体で1つで、ワールド単位の散乱距離
	sss?: boolean;
	sssRadius?: number;
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
}`,signature:{properties:[{key:`motionBlur`,value:{name:`boolean`,required:!1}},{key:`motionBlurPower`,value:{name:`number`,required:!1}},{key:`ssr`,value:{name:`boolean`,required:!1}},{key:`ssao`,value:{name:`boolean`,required:!1}},{key:`lightShaft`,value:{name:`boolean`,required:!1}},{key:`dof`,value:{name:`boolean`,required:!1}},{key:`toneMap`,value:{name:`boolean`,required:!1}},{key:`exposure`,value:{name:`number`,required:!1}},{key:`bloom`,value:{name:`boolean`,required:!1}},{key:`bloomThreshold`,value:{name:`number`,required:!1}},{key:`bloomBrightness`,value:{name:`number`,required:!1}},{key:`sss`,value:{name:`boolean`,required:!1}},{key:`sssRadius`,value:{name:`number`,required:!1}},{key:`lightShaftIntensity`,value:{name:`number`,required:!1}},{key:`lightShaftBlur`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporal`,value:{name:`boolean`,required:!1}},{key:`lightShaftTemporalBlend`,value:{name:`number`,required:!1}},{key:`ssaoIntensity`,value:{name:`number`,required:!1}},{key:`ssaoBlur`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporal`,value:{name:`boolean`,required:!1}},{key:`ssaoTemporalBlend`,value:{name:`number`,required:!1}}]}}}},{name:`resize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`reset`,docblock:null,modifiers:[],params:[],returns:null},{name:`compileShaders`,docblock:null,modifiers:[`async`],params:[{name:`root`,optional:!1,type:{name:`Entity`,alias:`Entity`}},{name:`view`,optional:!1,type:{name:`RenderViewContract`,alias:`RenderViewContract`}},{name:`event`,optional:!1,type:{name:`EntityUpdateEvent`,alias:`EntityUpdateEvent`}},{name:`cb`,optional:!0,type:{name:`signature`,type:`function`,raw:`( label: string, loaded: number, total: number ) => void`,signature:{arguments:[{type:{name:`string`},name:`label`},{type:{name:`number`},name:`loaded`},{type:{name:`number`},name:`total`}],return:{name:`void`}}}}],returns:null},{name:`createTexProcedural`,docblock:null,modifiers:[],params:[{name:`param`,optional:!1,type:{name:`TexProceduralParam`,alias:`TexProceduralParam`}}],returns:{type:{name:`TexProcedural`}}}],displayName:`Renderer`}})))()}var hi;function gi(){return(gi=t((()=>{Tn(),hi=class extends wn{_passes;date;constructor(e){super({...e}),this._passes=e.passes,this.date=new Date}get passes(){return this._passes}compute(e){let t=Math.min(1/60,(new Date().getTime()-this.date.getTime())/1e3);this.date=new Date,this.passes.forEach(e=>{e.uniforms.uDeltaTime.value=t}),e.renderPostProcess(this)}}})))()}function _i(){return(_i=t((()=>{})))()}var vi;function yi(){return(yi=t((()=>{gn(),Ye(),On(),_i(),vi=class extends N{size;layerCnt;clearColor;rt1;rt2;outputUniforms;constructor(e,t){let n=Object.assign({type:A.FLOAT,internalFormat:A.RGBA32F,format:A.RGBA,magFilter:A.NEAREST,minFilter:A.NEAREST},t.textureParam),r=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),i=e.createFrameBuffer().setTexture(Array(t.dataLayerCount).fill(0).map(()=>e.createTexture().setting(n))).setSize(t.size),a={uGPUResolution:{value:t.size,type:`2fv`}};for(let e=0;e<t.dataLayerCount;e++)a[`uGPUSampler`+e]={value:i.textures[e],type:`1i`};super(e,{...t,vert:t.vert||`layout ( location = 0 ) in vec3 position;\r
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
}`,renderTarget:r,uniforms:hn.merge(t.uniforms,a,{uDeltaTime:{value:0,type:`1f`}})}),this.size=t.size,this.layerCnt=t.dataLayerCount,this.rt1=r,this.rt2=i,this.renderTarget=this.rt1,this.clearColor=t.clearColor??null,this.outputUniforms=a}onAfterRender(){super.onAfterRender();for(let e=0;e<this.layerCnt;e++)this.outputUniforms[`uGPUSampler`+e].value=this.renderTarget.textures[e];let e=this.rt1;this.rt1=this.rt2,this.rt2=e,this.renderTarget=this.rt1}initTexture(e){for(let t=0;t<this.layerCnt;t++){let n=[];for(let r=0;r<this.size.y;r++)for(let i=0;i<this.size.x;i++){let a=i,o=r;n.push(...e(t,a,o))}this.rt2.textures[t].subImage(new Float32Array(n),this.size.x,this.size.y)}}}})))()}function bi(){return(bi=t((()=>{qe(),k(),Gt(),Ye(),Cn(),Tn(),On()})))()}function xi(){return(xi=t((()=>{at(),Gt(),kt(),Ye(),Cn()})))()}function P(){return(P=t((()=>{Ye(),_n(),mi(),Cn(),gi(),yi(),yn(),pr(),Kr(),bi(),xi(),Tn(),On(),An()})))()}var Si,Ci,wi,Ti;function Ei(){return(Ei=t((()=>{Si=class{static serializeEntity(e,t){let n=e=>{let r=[];e.children.forEach(e=>{e.initiator!=`script`&&r.push(n(e))});let i=[];e.components.forEach(e=>{let n=e.serialize({mode:`export`}),r=Object.keys(n).length>0;if(e.initiator!==`user`)return;let a={name:t.getName(e),uuid:e.uuid};r&&(a.props=n),i.push(a)});for(let t of e.unresolvedComponents)i.push({name:t.name,uuid:t.uuid,props:t.props});return{name:e.name,uuid:e.uuid,pos:e.position.x==0&&e.position.y==0&&e.position.z==0?void 0:e.position.getElm(`vec3`),rot:e.euler.x==0&&e.euler.y==0&&e.euler.z==0?void 0:e.euler.getElm(`vec3`),scale:e.scale.x==1&&e.scale.y==1&&e.scale.z==1?void 0:e.scale.getElm(`vec3`),components:i.length>0?i:void 0,childs:r.length>0?r:void 0}};return n(e)}static deserializeEntity(e,t,n,r){let i=(e,t)=>{let a=t||r.createEntity();a.initiator=`user`,a.setField(`name`,e.name),a.restoreUUID(e.uuid);let o=e.pos||[0,0,0];a.position.x=o[0],a.position.y=o[1],a.position.z=o[2];let s=e.rot||[0,0,0];a.euler.x=s[0],a.euler.y=s[1],a.euler.z=s[2];let c=e.scale||[1,1,1];return a.scale.x=c[0],a.scale.y=c[1],a.scale.z=c[2],a.unresolvedComponents=[],e.components&&e.components.forEach(e=>{let t=n.resolve(e.name);if(t){let n=a.getComponent(t.component);n||(n=a.addComponent(t.component),n.initiator=`user`),n.restoreUUID(e.uuid),e.props&&n.deserialize(e.props)}else console.warn(`[ProjectSerializer] Component "${e.name}" not found in resolver. Preserving data for round-trip.`),a.unresolvedComponents.push({name:e.name,uuid:e.uuid,props:e.props})}),e.childs&&([...a.children].forEach(e=>{e.initiator!==`script`&&a.remove(e)}),e.childs.forEach(e=>{a.add(i(e))})),a};e&&i(e,t),t.initiator=`god`}},Ci=(e,t)=>{if(Array.isArray(e)){for(let n of e)Ci(n,t);return}if(typeof e!=`object`||!e)return;let n=e;for(let e of Object.keys(n)){let r=n[e];if(e===`links`&&typeof r==`object`&&r)for(let e of Object.values(r))wi(e,t);Ci(r,t)}},wi=(e,t)=>{if(Array.isArray(e)){if(typeof e[0]==`string`){t.add(e[0]);return}for(let n of e)Array.isArray(n)&&typeof n[0]==`string`&&t.add(n[0])}},Ti=e=>{let t=e.curves;if(!t)return e;let n=new Set;Ci(e,n);let r={},i=0;for(let e of Object.keys(t))n.has(e)&&(r[e]=t[e],i++);let a={...e};return i>0?a.curves=r:delete a.curves,a}})))()}var Di;function Oi(){return(Oi=t((()=>{P(),Di=class extends Tt{name;_frag;_resolution;_filter;_updateEveryFrame;_textures;constructor(e,t){super(),this.name=e;let n=t.data;this._frag=n?.frag||``,this._resolution=n?.resolution||[1024,1024],this._filter=n?.filter||`linear`,this._updateEveryFrame=n?.updateEveryFrame??!1,this._textures=n?.textures||{}}get frag(){return this._frag}get resolution(){return this._resolution}get filter(){return this._filter}get updateEveryFrame(){return this._updateEveryFrame}get textures(){return this._textures}}})))()}var ki,Ai;function ji(){return(ji=t((()=>{ki=/\/Library\/([^/]+)\/([^/]+)\/index\.ts$/,Ai=e=>{let t=[];for(let n of Object.keys(e)){let r=n.match(ki);if(!r)continue;let i=e[n];!i||i.default===void 0||t.push({kind:r[1],name:r[2],item:i.default})}return t}})))()}var Mi;function Ni(){return(Ni=t((()=>{Mi=(e,t)=>{let n={},r=`/${t}/`;for(let[t,i]of Object.entries(e)){let e=t.slice(t.lastIndexOf(r)+r.length).split(`/`).slice(0,-2),a=Object.entries(i).find(([e,t])=>typeof t==`function`&&/^[A-Z]/.test(e));if(!a)continue;let o=n;for(let t of e)o=o[t]=o[t]||{};o[a[0]]=a[1]}return n}})))()}var Pi;function Fi(){return(Fi=t((()=>{at(),k(),Oi(),ji(),Ni(),Pi=class extends tt{_componentList;_componentGroups;_geometryList;_geometryGroups;_textureResources;_textures;_updateEveryFrameTextures;_library;constructor(){super(),this._componentList=[],this._textures=new Map,this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources=new Map,this._updateEveryFrameTextures=[],this._library=new Map}get componentList(){return this._componentList}get componentGroups(){return this._componentGroups}get geometryList(){return this._geometryList}get geometryGroups(){return this._geometryGroups}get textureList(){return Array.from(this._textureResources.values())}get textures(){return this._textures}get updateEveryFrameTextures(){return this._updateEveryFrameTextures}clear(){this._componentList=[],this._componentGroups=[],this._geometryList=[],this._geometryGroups=[],this._textureResources.clear(),this._textures.clear(),this._updateEveryFrameTextures=[],this._library.clear(),this.emit(`update`)}getComponent(e){return this._componentList.find(t=>t.name==e)}getComponentName(e){let t=this._componentList.find(t=>e instanceof t.component);return t?t.name:e.constructor.name}addComponentGroup(e){let t=this._componentGroups.find(t=>t.name==e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addComponent:(e,n)=>{let r={name:e,component:n};t.push(r),this._componentList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._componentGroups.push(t),this.emit(`update`),t}getGeometry(e){return this._geometryList.find(t=>t.name===e)}addGeometryGroup(e){let t=this._geometryGroups.find(t=>t.name===e);if(t)return t;let n=e=>{let t=[];return{child:t,name:e,addGeometry:(e,n)=>{let r={name:e,geometryClass:n};t.push(r),this._geometryList.push(r)},createGroup:e=>{let r=n(e);return t.push(r),r}}};return t=n(e),this._geometryGroups.push(t),this.emit(`update`),t}addLibraryItem(e,t,n){let r=this._library.get(e);r||(r=new Map,this._library.set(e,r)),r.set(t,n),this.emit(`update`)}getLibraryItem(e,t){let n=this._library.get(e);if(n)return n.get(t)}getLibraryItemNames(e){let t=this._library.get(e);return t?Array.from(t.keys()):[]}addTextureResource(e,t){let n=new Di(e,{data:t});this._textureResources.set(e,n),this.emit(`update`)}getTextureResource(e){return this._textureResources.get(e)}removeTextureResource(e){this._textureResources.delete(e);let t=this._textures.get(e);t&&(t.dispose(),this._textures.delete(e)),this.emit(`update`)}addTexture(e,t){return this._textures.set(e,t),t}getTexture(e){return this._textures.get(e)}_buildTexture(e,t,n){let r=e.frag;return r?t.createTexProcedural({name:e.name,frag:r,resolution:new D(e.resolution[0]||1024,e.resolution[1]||1024),filter:e.filter,textures:n}):null}_ensureTexture(e,t,n){let r=this._textures.get(e.name);if(r)return r;if(n.has(e.name))return null;n.add(e.name);let i={},a=e.textures,o=Object.keys(a);for(let e=0;e<o.length;e++){let r=o[e],s=a[r],c=this._textureResources.get(s),l=c?this._ensureTexture(c,t,n):this._textures.get(s);l&&(i[r]=l)}let s=this._buildTexture(e,t,i);return s?(this._textures.set(e.name,s),e.updateEveryFrame&&this._updateEveryFrameTextures.push(s),s):null}buildTextureInstances(e){this._updateEveryFrameTextures=[];let t=new Set;this._textureResources.forEach(n=>{this._ensureTexture(n,e,t)}),this.emit(`update`)}}})))()}var Ii,F;function Li(){return(Li=t((()=>{k(),P(),Ei(),Fi(),Ii={duration:600,fps:30},F=class e extends Tt{static resources;name;curves;_renderer;_root;_time;_frame;_frameSetting;_disposed;_frameEvent;constructor(e){super(),this.name=`OREngine`,this._disposed=!1,this._renderer=e(this),this._renderer.globalUniforms={uTime:{value:0,type:`1f`},uTimeF:{value:0,type:`1f`},uTimeE:{value:0,type:`1f`},uTimeEF:{value:0,type:`1f`},uTimePrev:{value:0,type:`1f`},uDeltaTime:{value:0,type:`1f`},uResolution:{value:new D,type:`2fv`},uAspectRatio:{value:1,type:`1f`}},this._time={current:new Date().getTime(),engine:0,delta:0,code:0},this._frameSetting={...Ii},this._frame={current:0,playing:!1},this.seek(0),this._frameEvent=null,this.curves={},this._root=this.createEntity({name:`root`}),this._root.initiator=`god`,this.field(`name`,()=>this.name,e=>this.name=e),this.field(`scene`,()=>Si.serializeEntity(this._root,this._createComponentResolver()),e=>{Si.deserializeEntity(e,this._root,this._createComponentResolver(),this)}),this.field(`renderer`,()=>this._renderer.serialize({mode:`export`}),e=>this._renderer.deserialize(e));let t=this.fieldDir(`timeline`);t.field(`duration`,()=>this._frameSetting.duration,e=>this._frameSetting.duration=e),t.field(`fps`,()=>this._frameSetting.fps,e=>this._frameSetting.fps=e),this.field(`curves`,()=>this.curves,e=>this.curves=e)}createEntity(e){return new Xt({engine:this,...e})}get canvas(){return this._renderer.canvas}get renderer(){return this._renderer}get root(){return this._root}get frame(){return this._frame}get time(){return this._time}get frameSetting(){return this._frameSetting}get disposed(){return this._disposed}createView(e){return this._renderer.createView(e)}_createComponentResolver(){return{resolve:t=>e.resources.getComponent(t),getName:t=>e.resources.getComponentName(t)}}init(){this._root.disposeRecursive(),this._root.position.set(0,0,0),this._root.euler.set(0,0,0),this._root.scale.set(1,1,1),this.name=`New Project`,this._renderer.reset(),Object.assign(this._frameSetting,Ii),this.curves={},this.stop(),this.seek(0)}async load(e){this.init(),this.deserialize(e),this.emit(`update/graph`),this.emit(`loaded`)}update(t){let n=new Date().getTime();this._time.delta=(n-this._time.current)/1e3,this._time.current=n,this._time.engine+=this._time.delta,this._time.code+=this._time.delta*+!!this._frame.playing,this._frame.current=this._time.code*60;let r=this.createEntityUpdateEvent({forceDraw:t?.forceDraw});this._renderer.globalUniforms.uTimePrev.value=this._renderer.globalUniforms.uTime.value,this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1,this._renderer.globalUniforms.uDeltaTime.value=Math.min(this._time.delta,1/60);let i=e.resources.updateEveryFrameTextures;for(let e=0;e<i.length;e++)i[e].render();return this.step(r),this._frame.playing&&this.emit(`update/frame/play`,[this._frame]),this._time.delta}step(e){this._root.commitFrame(e),this._root.update(e),this._root.postUpdate(e),this._root.updateMatrixRecursive(),this._root.prepareRender(e),this._renderer.prepareScene(this._root,e),this._frameEvent=e}render(e){this._frameEvent&&this._renderer.render(e,this._frameEvent)}createEntityUpdateEvent(e){let t={playing:this._frame.playing,timeElapsed:this._time.engine,timeDelta:this._time.delta,timeCode:this._time.code,timeCodeFrame:this._frame.current,resolution:this.renderer.resolution,renderer:this.renderer,forceDraw:!1};return e?{...t,...e}:t}setSize(e){this._renderer.resize(e),this._renderer.canvas.width=e.x,this._renderer.canvas.height=e.y,this._renderer.globalUniforms.uResolution.value.copy(e),this._renderer.globalUniforms.uAspectRatio.value=e.x/Math.max(e.y,1)}play(){this._frame.playing=!0,this._time.current=new Date().getTime()}stop(){this._frame.playing=!1}seek(e){this._time.code=e/60,this._frame.current=e,this.emit(`update/frame/play`,[this._frame])}updateOffline(t,n){let r=t/n,i=1/n;this._time.delta=i,this._time.current=new Date().getTime(),this._time.engine+=i,this._time.code=r,this._frame.current=r*60,this._frame.playing=!0;let a=this.createEntityUpdateEvent({forceDraw:!0,offline:!0});this._renderer.globalUniforms.uTimePrev.value=this._renderer.globalUniforms.uTime.value,this._renderer.globalUniforms.uTime.value=this._time.code,this._renderer.globalUniforms.uTimeF.value=this._time.code%1,this._renderer.globalUniforms.uTimeE.value=this._time.engine,this._renderer.globalUniforms.uTimeEF.value=this._time.engine%1;let o=e.resources.updateEveryFrameTextures;for(let e=0;e<o.length;e++)o[e].render();this.step(a)}compileShaders(e,t){let n=this.createEntityUpdateEvent({forceDraw:!0});return this.renderer.compileShaders(this._root,e,n,t)}dispose(){this._disposed=!0,this._root.disposeRecursive()}},F.resources=new Pi,F.__docgenInfo={description:``,methods:[{name:`createEntity`,docblock:null,modifiers:[],params:[{name:`params`,optional:!0,type:{name:`Omit`,elements:[{name:`MXP.EntityParams`},{name:`literal`,value:`'engine'`}],raw:`Omit<MXP.EntityParams, 'engine'>`,alias:`Omit`}}],returns:{type:{name:`MXP.Entity`}}},{name:`canvas`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`renderer`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`root`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`frame`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`time`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`frameSetting`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`disposed`,docblock:null,modifiers:[`get`],params:[],returns:null},{name:`createView`,docblock:null,modifiers:[],params:[{name:`opt`,optional:!0,type:{name:`MXP.RenderViewOptions`,alias:`MXP.RenderViewOptions`}}],returns:null},{name:`init`,docblock:null,modifiers:[],params:[],returns:null},{name:`load`,docblock:null,modifiers:[`async`],params:[{name:`project`,optional:!1,type:{name:`OREngineProjectData`,alias:`OREngineProjectData`}}],returns:null},{name:`update`,docblock:null,modifiers:[],params:[{name:`param`,optional:!0,type:{name:`Partial`,elements:[{name:`MXP.EntityUpdateEvent`}],raw:`Partial<MXP.EntityUpdateEvent>`,alias:`Partial`}}],returns:null},{name:`step`,docblock:null,modifiers:[],params:[{name:`event`,optional:!1,type:{name:`MXP.EntityUpdateEvent`,alias:`MXP.EntityUpdateEvent`}}],returns:null},{name:`createEntityUpdateEvent`,docblock:null,modifiers:[],params:[{name:`overrideParams`,optional:!0,type:{name:`Partial`,elements:[{name:`MXP.EntityUpdateEvent`}],raw:`Partial<MXP.EntityUpdateEvent>`,alias:`Partial`}}],returns:{type:{name:`MXP.EntityUpdateEvent`}}},{name:`setSize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`play`,docblock:null,modifiers:[],params:[],returns:null},{name:`stop`,docblock:null,modifiers:[],params:[],returns:null},{name:`seek`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`number`}}],returns:null},{name:`updateOffline`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`number`}},{name:`fps`,optional:!1,type:{name:`number`}}],returns:null},{name:`compileShaders`,docblock:null,modifiers:[],params:[{name:`view`,optional:!1,type:{name:`MXP.RenderViewContract`,alias:`MXP.RenderViewContract`}},{name:`onProgress`,optional:!0,type:{name:`signature`,type:`function`,raw:`( label: string, loaded: number, total: number ) => void`,signature:{arguments:[{type:{name:`string`},name:`label`},{type:{name:`number`},name:`loaded`},{type:{name:`number`},name:`total`}],return:{name:`void`}}}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`Engine`}})))()}var Ri;function zi(){return(zi=t((()=>{at(),Ri=class extends tt{_pressedKeys;constructor(){super(),this._pressedKeys={};let e=this._onKeyDown.bind(this),t=this._onKeyUp.bind(this);window.addEventListener(`keydown`,e),window.addEventListener(`keyup`,t),this.once(`dispose`,()=>{window.removeEventListener(`keydown`,e),window.removeEventListener(`keyup`,t)})}get pressedKeys(){return this._pressedKeys}_onKeyDown(e){this._pressedKeys[e.key]=!0,this.emit(`keydown`,[e,this._pressedKeys])}_onKeyUp(e){if(this._pressedKeys[e.key]=!1,e.key==`Meta`||e.key==`Control`){let e=Object.keys(this._pressedKeys);for(let t=0;t<e.length;t++)this._pressedKeys[e[t]]=!1}this.emit(`keyup`,[e,this._pressedKeys])}dispose(){this.emit(`dispose`)}}})))()}var Bi;function Vi(){return(Vi=t((()=>{at(),k(),Bi=class extends tt{_isTouching;element=null;position;delta;constructor(){super(),this.position=new D(NaN,NaN),this.delta=new D(NaN,NaN),this._isTouching=!1;let e=this._onPointer.bind(this,`move`),t=this._onPointer.bind(this,`end`);window.addEventListener(`pointermove`,e),window.addEventListener(`pointerup`,t),window.addEventListener(`dragend`,t);let n=()=>{this.element&&this.removeElement(this.element),window.removeEventListener(`pointermove`,e),window.removeEventListener(`pointerup`,t),window.removeEventListener(`dragend`,t),this.off(`dispose`,n)};this.on(`dispose`,n)}setElement(e){this.element&&this.removeElement(this.element),this.element=e;let t=this._onPointer.bind(this,`start`);e.addEventListener(`pointerdown`,t);let n=r=>{e.isEqualNode(r.elm)&&(e.removeEventListener(`pointerdown`,t),this.off(`unregister`,n))};this.on(`unregister`,n)}removeElement(e){this.emit(`unregister`,[e])}getScreenPosition(e){if(this.position.x!=this.position.x)return new D(NaN,NaN);let t=this.position.clone().divide(e).multiply(2).sub(1);return t.y*=-1,t}getRelativePosition(e,t){let n=e.getClientRects()[0],r=this.position.x-n.left,i=this.position.y-n.top;return t&&(r/=n.width,i/=n.height),new D(r,i)}_setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y?this.delta.set(0,0):this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}_onPointer(e,t){let n=t.pointerType;(n==null||n==`mouse`&&(t.button==-1||t.button==0)||n==`touch`)&&this._touchEventHandler(t.pageX,t.pageY,e,t)}_touchEventHandler(e,t,n,r){let i=!1,a=e-window.pageXOffset,o=t-window.pageYOffset;n==`start`?(this._isTouching=!0,this._setPos(a,o),this.delta.set(0,0),i=!0):n==`move`?(this._setPos(a,o),this._isTouching&&(i=!0)):n==`end`&&(`targetTouches`in r?r.targetTouches.length==0&&(this._isTouching=!1):this._isTouching=!1,i=!0),i&&this.emit(n,[{pointerEvent:r,position:this.position.clone(),delta:this.delta.clone()}])}dispose(){this.emit(`dispose`)}}})))()}function Hi(){return(Hi=t((()=>{Li(),Fi(),zi(),Vi()})))()}function Ui(){return(Ui=t((()=>{Hi()})))()}var Wi,Gi;function Ki(){return(Ki=t((()=>{Wi=i(),Gi=(0,Wi.createContext)(null)})))()}var qi,I;function L(){return(L=t((()=>{qi=i(),Ki(),I=()=>{let e=(0,qi.useContext)(Gi);if(e===null)throw Error(`useEditor must be used within a EditorProvider`);return e}})))()}var Ji,Yi,Xi;function Zi(){return(Zi=t((()=>{Ji=i(),Ui(),E(),L(),Yi=o(),Xi=e=>{let{engine:t}=I(),n=(0,Ji.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverseEditable(n=>{n.components.forEach(r=>{e.push({label:`${n.getScenePath(t.root)} > ${F.resources.getComponentName(r)}`,value:r.uuid})})}),e},[t]),[r,i]=(0,Ji.useState)(n);return(0,Ji.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,Yi.jsx)(oe,{value:e.value||``,selectList:r,onChange:t=>{e.onChange&&e.onChange(t||null)}})},Xi.__docgenInfo={description:``,methods:[],displayName:`InputComponentRef`,props:{value:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: string | null ) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var Qi,$i,ea;function ta(){return(ta=t((()=>{Qi=i(),E(),L(),$i=o(),ea=e=>{let{engine:t}=I(),n=(0,Qi.useCallback)(()=>{let e=[{label:`(None)`,value:``}];return t.root.traverseEditable(n=>{e.push({label:n.getScenePath(t.root),value:n.uuid})}),e},[t]),[r,i]=(0,Qi.useState)(n);return(0,Qi.useEffect)(()=>{let e=()=>i(n());return t.on(`update/graph`,e),()=>{t.off(`update/graph`,e)}},[t,n]),(0,$i.jsx)(oe,{value:e.value||``,selectList:r,onChange:t=>{e.onChange&&e.onChange(t||null)}})},ea.__docgenInfo={description:``,methods:[],displayName:`InputEntityRef`,props:{value:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: string | null ) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var na,ra,ia,aa;function oa(){return(oa=t((()=>{na=`InputResourceSelect__inputResourceSelect___Lmluc`,ra=`InputResourceSelect__select___Lmluc`,ia=`InputResourceSelect__editButton___Lmluc`,aa={inputResourceSelect:na,select:ra,editButton:ia}})))()}var sa,ca,la;function ua(){return(ua=t((()=>{sa=i(),E(),L(),oa(),ca=o(),la=e=>{let{editor:t}=I(),n=(0,sa.useCallback)(()=>{e.value&&(t.setField(`navigateAsset`,{assetType:e.resourceType,name:String(e.value)}),t.setField(`selectedAsset`,{name:String(e.value),assetType:e.resourceType}))},[t,e.value,e.resourceType]);return(0,ca.jsxs)(`div`,{className:aa.inputResourceSelect,children:[(0,ca.jsx)(`div`,{className:aa.select,children:(0,ca.jsx)(oe,{value:e.value,selectList:e.selectList,onChange:e.onChange})}),e.value&&(0,ca.jsx)(`button`,{className:aa.editButton,onClick:n,title:`Edit resource`,children:`✎`})]})},la.__docgenInfo={description:``,methods:[],displayName:`InputResourceSelect`,props:{value:{required:!0,tsType:{name:`T`},description:``},selectList:{required:!0,tsType:{name:`union`,raw:`SelectList | ( () => SelectList )`,elements:[{name:`SelectList`},{name:`unknown`}]},description:``},resourceType:{required:!0,tsType:{name:`union`,raw:`"material" | "texture" | "shader"`,elements:[{name:`literal`,value:`"material"`},{name:`literal`,value:`"texture"`},{name:`literal`,value:`"shader"`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}}},description:``}}}})))()}var da,fa;function pa(){return(pa=t((()=>{i(),E(),Zi(),ta(),ua(),da=o(),fa=e=>{let t=null,n=e.onChange,r=e.value,i=e.format,a=e=>{n&&n(e)};if(i&&(i.type==`entity`?t=(0,da.jsx)(ea,{value:r,onChange:a}):i.type==`component`?t=(0,da.jsx)(Xi,{value:r,onChange:a}):i.type==`vector`&&Array.isArray(r)?t=(0,da.jsx)(te,{value:r,onChange:a,onDragStart:e.onDragStart,onDragEnd:e.onDragEnd,onDragCancel:e.onDragCancel}):i.type==`color`&&Array.isArray(r)?t=(0,da.jsx)(b,{value:r,onChange:a}):i.type==`select`?t=(0,da.jsx)(oe,{value:r,onChange:a,selectList:i.list}):i.type==`resource`&&(t=(0,da.jsx)(la,{value:r,onChange:a,selectList:i.list,resourceType:i.resourceType}))),r==null)return t;if(!t){if(typeof r==`number`)t=(0,da.jsx)(C,{...e,value:r,onChange:a});else if(typeof r==`string`)t=(0,da.jsx)(T,{...e,value:r,onChange:a});else if(typeof r==`boolean`)t=(0,da.jsx)(y,{...e,checked:r,onChange:a});else if(typeof r==`function`){let n=e.label||`Run`;t=(0,da.jsx)(c,{onClick:()=>{r()},children:n})}else t=(0,da.jsx)(T,{...e,value:JSON.stringify(r),onChange:()=>{}})}return t}})))()}var ma,ha,ga,_a,va,ya,ba,xa;function Sa(){return(Sa=t((()=>{ma=i(),ha={showAudioView:!0},ga=`orengine-editor-ui-settings`,_a=()=>{try{let e=localStorage.getItem(ga);if(e)return{...ha,...JSON.parse(e)}}catch{}return{...ha}},va=_a(),ya=new Set,ba=e=>(ya.add(e),()=>{ya.delete(e)}),xa=e=>[(0,ma.useSyncExternalStore)(ba,()=>va[e]),(0,ma.useCallback)(t=>{va={...va,[e]:t};try{localStorage.setItem(ga,JSON.stringify(va))}catch{}ya.forEach(e=>e())},[e])]})))()}var Ca,wa,Ta;function Ea(){return(Ea=t((()=>{Ca=`EditorSettings__editorSettings___LmVka`,wa=`EditorSettings__editorSettings_inner___LmVka`,Ta={editorSettings:Ca,editorSettings_inner:wa}})))()}var Da,Oa;function ka(){return(ka=t((()=>{E(),pa(),Sa(),Ea(),Da=o(),Oa=()=>{let[e,t]=xa(`showAudioView`);return(0,Da.jsx)(`div`,{className:Ta.editorSettings,children:(0,Da.jsx)(`div`,{className:Ta.editorSettings_inner,children:(0,Da.jsx)(s,{label:`View`,accordion:!0,children:(0,Da.jsx)(le,{title:`AudioView`,children:(0,Da.jsx)(fa,{value:e,onChange:e=>t(e)})})})})})},Oa.__docgenInfo={description:``,methods:[],displayName:`EditorSettings`}})))()}var Aa,ja;function Ma(){return(Ma=t((()=>{Ui(),Aa=(e,t,n)=>{let r=e.name;if(r.startsWith(`_`)&&(r=r.slice(1)),`child`in e){let i=[];for(let r of e.child){let e=Aa(r,t,n);e&&i.push(e)}return{label:r,children:i}}return n.includes(e.component)?null:{label:r,onClick:()=>t(e)}},ja=(e,t=[])=>{let n=[];for(let r of F.resources.componentGroups){let i=Aa(r,e,t);i&&n.push(i)}return n}})))()}var Na,Pa;function Fa(){return(Fa=t((()=>{P(),E(),Ma(),L(),Na=[M],Pa=(e,t)=>{let{editor:n}=I(),{closeAll:r}=w(),i=(i,a)=>{let o;t&&(o=t());let s=n.api.createEntity(e,{name:i,components:a,position:o});n.api.selectEntity(s),r()},a=ja(e=>{i(e.name,[e.component])},Na),o=[{label:`Empty`,onClick:()=>i(`Empty`,[])}];for(let e of a)o.push(e);return o}})))()}var Ia,La,Ra;function za(){return(za=t((()=>{Ia=i(),E(),Fa(),L(),La=o(),Ra=()=>{let{editor:e,engine:t}=I(),{open:n,closeAll:r}=w(),i=Pa(t.root,()=>{let t=e.activeViewport;if(!t)return;let n=t.editorCamera.orbitControls.target;return[n.x,n.y,n.z]}),a=(0,Ia.useRef)({x:0,y:0});return(0,Ia.useEffect)(()=>{let e=e=>{a.current.x=e.clientX,a.current.y=e.clientY};return window.addEventListener(`pointermove`,e),()=>{window.removeEventListener(`pointermove`,e)}},[]),(0,Ia.useEffect)(()=>{let t=()=>{r(),n((0,La.jsx)(fe,{title:`Add Entity`,items:i}),se(a.current.x,a.current.y))};return e.on(`request/addEntity`,t),()=>{e.off(`request/addEntity`,t)}},[e,t,n,r,i]),null}})))()}var Ba,Va;function Ha(){return(Ha=t((()=>{Ba=i(),Va=(0,Ba.createContext)(void 0)})))()}var Ua,Wa;function Ga(){return(Ga=t((()=>{Ua=i(),Wa=(e,t)=>{let[n,r]=(0,Ua.useState)(()=>e?e.serialize():{}),i=t?[...t]:[],a=(0,Ua.useMemo)(()=>i,i);return(0,Ua.useEffect)(()=>{if(e===void 0)return;r(e.serialize());let t=t=>{let n=a.length==0;for(let e=0;e<a.length;e++)if(t.find(t=>t==a[e])){n=!0;break}n&&r(e.serialize())};return e.on(`fields/update`,t),()=>{e.off(`fields/update`,t)}},[e,a]),{fields:n}}})))()}var Ka;function qa(){return(qa=t((()=>{Ga(),Ka=e=>(Wa(e.target),{target:e.target})})))()}var Ja;function Ya(){return(Ya=t((()=>{Ja=(e,t,n)=>{if(!e)return null;for(let r of e){if(t.constructor!==r.target)continue;let e=r.fields[n];if(e)return e}return null}})))()}var Xa,Za;function Qa(){return(Qa=t((()=>{Xa=`KeyFrameIndicator__indicator___LmluZ`,Za={indicator:Xa}})))()}var $a,eo;function to(){return(to=t((()=>{E(),Qa(),$a=o(),eo=e=>{let t=`animated`;return e.state.changed?t=`changed`:e.state.keyed&&(t=`keyed`),(0,$a.jsx)(`span`,{className:Za.indicator,"data-tone":t,children:(0,$a.jsx)(_,{size:10,filled:e.state.keyed})})},eo.__docgenInfo={description:``,methods:[],displayName:`KeyFrameIndicator`,props:{state:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
	keyed: boolean;
	changed: boolean;
}`,signature:{properties:[{key:`keyed`,value:{name:`boolean`,required:!0}},{key:`changed`,value:{name:`boolean`,required:!0}}]}},description:``}}}})))()}var no,ro,io;function ao(){return(ao=t((()=>{no=`SharedCurveLabel__shared___LnNoY`,ro=`SharedCurveLabel__curve___LnNoY`,io={shared:no,curve:ro}})))()}var oo,so;function co(){return(co=t((()=>{E(),ao(),oo=o(),so=e=>{let t=[];for(let n of e.curves)t.push((0,oo.jsxs)(`span`,{className:io.curve,children:[(0,oo.jsx)(m,{size:10}),n.label,` (`,n.uses,`)`]},n.curveId));return(0,oo.jsx)(`span`,{className:io.shared,children:t})},so.__docgenInfo={description:``,methods:[],displayName:`SharedCurveLabel`,props:{curves:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	curveId: string;
	label: string;
	uses: number;
}`,signature:{properties:[{key:`curveId`,value:{name:`string`,required:!0}},{key:`label`,value:{name:`string`,required:!0}},{key:`uses`,value:{name:`number`,required:!0}}]}}],raw:`SharedCurve[]`},description:``}}}})))()}var R,lo,uo;function fo(){return(fo=t((()=>{R=class extends Error{candidates;constructor(e,t){super(e),this.candidates=t}},lo=(e,t,n)=>{let r=e.args[t];if(r===void 0)throw new R(`引数が足りません。使い方: ${n}`);return r},uo=e=>e instanceof Error?e.message:String(e)})))()}var po,mo;function ho(){return(ho=t((()=>{po=[],mo=()=>po})))()}var go;function _o(){return(_o=t((()=>{go=class{commands;name=`Group`;constructor(e){this.commands=e}execute(){for(let e of this.commands)e.execute()}undo(){for(let e=this.commands.length-1;e>=0;e--)this.commands[e].undo()}}})))()}var vo;function yo(){return(yo=t((()=>{vo=class e{target;path;oldValue;newValue;name=`SetField`;constructor(e,t,n,r){this.target=e,this.path=t,this.oldValue=n,this.newValue=r}execute(){this.target.setField(this.path,this.newValue)}undo(){this.target.setField(this.path,this.oldValue)}mergeWith(t){return t instanceof e&&t.target===this.target&&t.path===this.path?new e(this.target,this.path,this.oldValue,t.newValue):null}}})))()}var bo,xo,So,Co,wo,To,Eo,Do,Oo,ko,Ao,jo,Mo,No,Po,Fo,Io,Lo,Ro,zo,Bo,Vo,Ho,Uo,Wo,Go,Ko,qo,Jo,Yo,Xo,Zo,Qo,$o,es,ts,ns,rs,is;function as(){return(as=t((()=>{P(),bo=1e-4,xo=2.5614,So=5,Co=[`AUTO_CLAMPED`,`AUTO`,`VECTOR`,`ALIGNED`,`FREE`],wo=(e,t)=>{for(let n=0;n<e.length;n++)if(Math.abs(e[n].coordinate.x-t)<bo)return n;return-1},To=e=>{let t=[];if(!e)return t;let n=yt(e.k);for(let r=0;r<n.length;r++){let i=n[r],a=`AUTO_CLAMPED`;e.h&&Co[e.h[r]]&&(a=Co[e.h[r]]),t.push({coordinate:{...i.coordinate},handleLeft:{...i.handleLeft},handleRight:{...i.handleRight},interpolation:i.interpolation,handleType:a})}return Zo(t),t},Eo=(e,t)=>{let n={...t,k:Do(e)},r=[],i=!1;for(let t of e){let e=Co.indexOf(t.handleType);e!=0&&(i=!0),r.push(e)}return i?n.h=r:delete n.h,n},Do=e=>{let t=[],n=0,r=!1;for(let i of e){let e=i.interpolation==`BEZIER`,a=[i.coordinate.x-n,i.coordinate.y];(e||r)&&a.push(i.handleLeft.x,i.handleLeft.y),e&&a.push(i.handleRight.x,i.handleRight.y);let o=bt.indexOf(i.interpolation);t.push([o,a]),n=i.coordinate.x,r=e}return t},Oo=(e,t,n,r)=>{let i=To(e),a=wo(i,t);if(a>=0)Ko(i[a],i[a].coordinate.x,n);else{let e={x:t,y:n};i.push({coordinate:e,handleLeft:{...e},handleRight:{...e},interpolation:r,handleType:`AUTO_CLAMPED`}),Jo(i)}return Zo(i),Eo(i,e)},ko=(e,t)=>{let n=To(e),r=wo(n,t);return r<0?null:(n.splice(r,1),Zo(n),Eo(n,e))},Ao=(e,t)=>{let n=To(e),r=new Set(t),i=[];for(let e=0;e<n.length;e++)r.has(e)||i.push(n[e]);return Zo(i),Eo(i,e)},jo=(e,t,n,r,i=!1)=>{let a=To(e),o=new Set(t),s=[],c=[],l=[...a];for(let e=0;e<a.length;e++){let t=a[e];if(o.has(e)&&i){let n=qo(t);Uo(n,r),s.push(n),c.push(t),l[e]=n}else o.has(e)?(Uo(t,r),s.push(t)):c.push(t)}let u=new Map;for(let e of n){let t=a[e.index];if(!t||o.has(e.index))continue;let n=u.get(t);n||(n=[],u.set(t,n)),n.indexOf(e.side)<0&&n.push(e.side)}for(let[e,t]of u)Wo(e,t,r);let d=Yo(c,s),f=[];for(let e of s){let t=d.indexOf(e);t>=0&&f.push(t)}let p=[];for(let[e,t]of u){let n=d.indexOf(e);if(!(n<0))for(let e of t)p.push({index:n,side:e})}return{curve:Eo(d,e),indices:f,handles:p,indexMap:Ho(l,d)}},Mo=(e,t,n,r)=>{let i=[];for(let e of t){let t=qo(e);Ko(t,r(e.coordinate.x+n),e.coordinate.y),i.push(t)}let a=Yo(To(e),i),o=[];for(let e of i){let t=a.indexOf(e);t>=0&&o.push(t)}return{curve:Eo(a,e),indices:o}},No=(e,t,n)=>{let r=To(e);for(let e of t)r[e]&&(r[e].interpolation=n);return Zo(r),Eo(r,e)},Po=(e,t,n)=>{let r=To(e);for(let e of t){let t=r[e];t&&(t.handleType=n,n==`ALIGNED`&&Xo(t,`left`))}return Zo(r),Eo(r,e)},Fo=(e,t,n)=>{let r=To(e),i=zo(r,t);if(i.length<=2)return null;let a=i[0].coordinate,o=i[i.length-1].coordinate,s=i.length-1,c=[a];for(let e=1;e<s;e++){let t=n(a.x+(o.x-a.x)*e/s);c.push({x:t,y:Bo(a,o,t)})}c.push(o);for(let e=1;e<c.length;e++)if(c[e].x-c[e-1].x<bo)return null;return Vo(e,r,i,c)},Io=(e,t)=>{let n=To(e),r=zo(n,t);if(r.length<=2)return null;let i=r[0].coordinate,a=r[r.length-1].coordinate,o=[];for(let e of r){let t=e.coordinate.x;o.push({x:t,y:Bo(i,a,t)})}return Vo(e,n,r,o)},Lo=(e,t)=>{let n=To(e)[t];if(!n)return null;let r=n.coordinate;return{left:{x:n.handleLeft.x-r.x,y:n.handleLeft.y-r.y},right:{x:n.handleRight.x-r.x,y:n.handleRight.y-r.y},handleType:n.handleType}},Ro=(e,t,n)=>{let r=To(e),i=`FREE`;n.handleType==`ALIGNED`&&(i=`ALIGNED`);for(let e of t){let t=r[e];if(!t)continue;let a=t.coordinate;t.handleLeft={x:rs(a.x+n.left.x,a.x),y:rs(a.y+n.left.y,a.y)},t.handleRight={x:rs(a.x+n.right.x,a.x),y:rs(a.y+n.right.y,a.y)},t.handleType=i,t.interpolation=`BEZIER`}return Zo(r),Eo(r,e)},zo=(e,t)=>{let n=[...t];n.sort((e,t)=>e-t);let r=[];for(let t of n)e[t]&&r.indexOf(e[t])<0&&r.push(e[t]);return r},Bo=(e,t,n)=>e.y+(t.y-e.y)*(n-e.x)/(t.x-e.x),Vo=(e,t,n,r)=>{for(let e=0;e<n.length;e++)Ko(n[e],r[e].x,r[e].y);let i=[];for(let e of t)n.indexOf(e)<0&&i.push(e);let a=Yo(i,n),o=[];for(let e of n)o.push(a.indexOf(e));return{curve:Eo(a,e),indices:o,indexMap:Ho(t,a)}},Ho=(e,t)=>{let n=new Map;for(let r=0;r<e.length;r++){let i=t.indexOf(e[r]);i>=0&&n.set(r,i)}return n},Uo=(e,t)=>{let n=e.coordinate,r=t.point(n,n),i=n.y;r.y!=n.y&&(i=r.y,t.roundValue&&(i=t.roundValue(i)));let a=t.snapTime(r.x);if(!t.transformHandles){Ko(e,a,i);return}let o={x:a-r.x,y:i-r.y},s=e=>{let r=t.point(e,n);return Go({x:r.x+o.x,y:r.y+o.y},t)},c=s(e.handleLeft),l=s(e.handleRight);e.coordinate={x:a,y:i},e.handleLeft={x:Math.min(c.x,a),y:c.y},e.handleRight={x:Math.max(l.x,a),y:l.y}},Wo=(e,t,n)=>{e.handleType==`AUTO_CLAMPED`||e.handleType==`AUTO`?e.handleType=`ALIGNED`:e.handleType==`VECTOR`&&(e.handleType=`FREE`);let r=e.coordinate;for(let i of t)if(i==`left`){let t=Go(n.point(e.handleLeft,r),n);e.handleLeft={x:Math.min(t.x,r.x),y:t.y}}else{let t=Go(n.point(e.handleRight,r),n);e.handleRight={x:Math.max(t.x,r.x),y:t.y}}e.handleType==`ALIGNED`&&t.length==1&&Xo(e,t[0])},Go=(e,t)=>{let n=e.x,r=e.y;return t.roundTime&&(n=t.roundTime(n)),t.roundValue&&(r=t.roundValue(r)),{x:n,y:r}},Ko=(e,t,n)=>{let r=t-e.coordinate.x,i=n-e.coordinate.y;e.coordinate={x:t,y:n},e.handleLeft={x:e.handleLeft.x+r,y:e.handleLeft.y+i},e.handleRight={x:e.handleRight.x+r,y:e.handleRight.y+i}},qo=e=>({coordinate:{...e.coordinate},handleLeft:{...e.handleLeft},handleRight:{...e.handleRight},interpolation:e.interpolation,handleType:e.handleType}),Jo=e=>{e.sort((e,t)=>e.coordinate.x-t.coordinate.x)},Yo=(e,t)=>{let n=[];for(let e of t){let t=wo(n,e.coordinate.x);t>=0?n[t]=e:n.push(e)}let r=[];for(let t of e)wo(n,t.coordinate.x)<0&&r.push(t);for(let e of n)r.push(e);return Jo(r),Zo(r),r},Xo=(e,t)=>{let n=e.coordinate,r=e.handleRight,i=e.handleLeft;t==`left`&&(r=e.handleLeft,i=e.handleRight);let a=Math.hypot(r.x-n.x,r.y-n.y),o=Math.hypot(i.x-n.x,i.y-n.y);if(a==0)return;let s={x:rs(n.x-(r.x-n.x)/a*o,n.x),y:rs(n.y-(r.y-n.y)/a*o,n.y)};t==`left`?e.handleRight=s:e.handleLeft=s},Zo=e=>{for(let t=0;t<e.length;t++){let n=e[t].handleType;n==`AUTO_CLAMPED`?$o(e,t,!0):n==`AUTO`?$o(e,t,!1):n==`VECTOR`?es(e,t):ts(e,t)}},Qo=(e,t)=>{let n=e[t].coordinate,r=e[t-1],i=e[t+1];if(r&&i)return{prev:r.coordinate,next:i.coordinate};if(i){let e=i.coordinate;return{prev:{x:2*n.x-e.x,y:2*n.y-e.y},next:e}}if(r){let e=r.coordinate;return{prev:e,next:{x:2*n.x-e.x,y:2*n.y-e.y}}}return null},$o=(e,t,n)=>{let r=e[t],i=r.coordinate,a=Qo(e,t);if(!a){r.handleLeft={x:i.x,y:i.y},r.handleRight={x:i.x,y:i.y};return}let o=a.prev,s=a.next,c=i.x-o.x,l=s.x-i.x;c==0&&(c=1),l==0&&(l=1);let u=(s.x-i.x)/l+(i.x-o.x)/c,d=(s.y-i.y)/l+(i.y-o.y)/c,f=u*xo;c>So*l&&(c=So*l),l>So*c&&(l=So*c);let p={x:i.x-u*c/f,y:i.y-d*c/f},m={x:i.x+u*l/f,y:i.y+d*l/f};e[t-1]&&e[t+1]?n&&is(o,i,s,p,m):(p.y=i.y,m.y=i.y),r.handleLeft={x:rs(p.x,i.x),y:rs(p.y,i.y)},r.handleRight={x:rs(m.x,i.x),y:rs(m.y,i.y)}},es=(e,t)=>{let n=e[t],r=n.coordinate,i=Qo(e,t);if(!i){n.handleLeft={x:r.x,y:r.y},n.handleRight={x:r.x,y:r.y};return}let a=i.prev,o=i.next;n.handleLeft={x:rs(r.x+(a.x-r.x)/3,r.x),y:rs(r.y+(a.y-r.y)/3,r.y)},n.handleRight={x:rs(r.x+(o.x-r.x)/3,r.x),y:rs(r.y+(o.y-r.y)/3,r.y)}},ts=(e,t)=>{let n=e[t],r=e[t-1],i=e[t+1];r&&(n.handleLeft=ns(n.coordinate,n.handleLeft,n.coordinate.x-r.coordinate.x)),i&&(n.handleRight=ns(n.coordinate,n.handleRight,i.coordinate.x-n.coordinate.x))},ns=(e,t,n)=>{let r=Math.abs(t.x-e.x);if(r<=n)return t;let i=n/r;return{x:rs(e.x+(t.x-e.x)*i,e.x),y:rs(e.y+(t.y-e.y)*i,e.y)}},rs=(e,t)=>{let n=Math.abs(e-t);if(n==0)return e;let r=10**Math.max(0,3-Math.floor(Math.log10(n)));return Math.round(e*r)/r},is=(e,t,n,r,i)=>{let a=e.y-t.y,o=n.y-t.y;if(a<=0&&o<=0||a>=0&&o>=0){r.y=t.y,i.y=t.y;return}let s=!1,c=!1;a<=0?(e.y>r.y&&(r.y=e.y,s=!0),n.y<i.y&&(i.y=n.y,c=!0)):(e.y<r.y&&(r.y=e.y,s=!0),n.y>i.y&&(i.y=n.y,c=!0)),s?i.y=t.y+(t.y-r.y)/(t.x-r.x)*(i.x-t.x):c&&(r.y=t.y-(i.y-t.y)/(i.x-t.x)*(t.x-r.x))}})))()}var os=n({Animation:()=>cs}),ss,cs;function ls(){return(ls=t((()=>{P(),Ui(),ss=.001,cs=class extends j{links_;linksChanged_;frame_;curves_;fcurves_;constructor(e){super(e),this.order=-1,this.links_={},this.linksChanged_=!1,this.frame_=0,this.curves_=null,this.fcurves_=new Map,this.field(`links`,()=>this.links_,e=>{this.links_=e,this.linksChanged_=!0},{hidden:!0})}updateImpl(e){let t=e.timeCodeFrame,n=this.frame_,r=this.engine.curves;if(t==n&&r==this.curves_&&!this.linksChanged_)return;r!=this.curves_&&this.fcurves_.clear(),this.frame_=t,this.curves_=r,this.linksChanged_=!1;let i=t-n,a=e.playing&&i>0&&Math.abs(i-e.timeDelta*60)<ss,o=[];for(let e of Object.keys(this.links_)){let r=this.links_[e],i=e.indexOf(`:`),s=this.entity,c=e;if(i>=0){let t=F.resources.getComponent(e.slice(0,i));s=t&&this.entity.getComponent(t.component),c=e.slice(i+1)}if(!s)continue;let l=s.getField(c);if(l===void 0)continue;if(typeof l==`function`){a&&this.collectEvents(r,n,t,l,o);continue}if(Array.isArray(l)){let e=r,n=l.slice();for(let r=0;r<n.length;r++){let i=e[r];if(!i)continue;let a=this.linkValue(i,t);a!==void 0&&(n[r]=a)}s.setField(c,n);continue}let u=this.linkValue(r,t);if(u===void 0)continue;let d=u,f=s.getFieldOpt(c),p=f&&f.format;if(p&&p.type==`select`){let e=p.list;typeof e==`function`&&(e=e());let t=e[u];if(t===void 0)continue;d=t,typeof t==`object`&&(d=t.value)}else typeof l==`boolean`&&(d=u>.5);s.setField(c,d)}o.sort((e,t)=>e[0]-t[0]);for(let[,e]of o)e()}linkValue(e,t){let n=this.getCurve(e[0]);if(n)return n.getValue(t)*e[1]+e[2]}collectEvents(e,t,n,r,i){let a=this.getCurve(e[0]);if(a)for(let e of a.keyframes){let a=e.coordinate.x;a>=t&&a<n&&i.push([a,r])}}getCurve(e){let t=this.fcurves_.get(e);if(t)return t;let n=this.engine.curves[e];if(!(!n||n.k.length==0))return t=new pt(yt(n.k)),this.fcurves_.set(e,t),t}}})))()}var us;function ds(){return(ds=t((()=>{us=class{entity;componentClass;name=`AddComponent`;instance=null;constructor(e,t){this.entity=e,this.componentClass=t}execute(){this.instance=this.entity.addComponent(this.componentClass),this.instance.initiator=`user`}undo(){this.entity.removeComponent(this.componentClass),this.instance=null}}})))()}var fs;function ps(){return(ps=t((()=>{fs=class{entity;componentClass;path;oldValue;newValue;name=`SetComponentField`;constructor(e,t,n,r,i){this.entity=e,this.componentClass=t,this.path=n,this.oldValue=r,this.newValue=i}execute(){this.getComponent().setField(this.path,this.newValue)}undo(){this.getComponent().setField(this.path,this.oldValue)}getComponent(){let e=this.entity.getComponent(this.componentClass);if(!e)throw Error(`Component not found on entity: ${this.entity.name}`);return e}}})))()}var ms,hs,gs,_s,vs,ys,bs,xs,Ss,Cs,ws,Ts,Es,Ds,Os,ks,As,js,Ms,Ns,Ps,Fs,Is,Ls,Rs,zs,Bs,Vs,Hs,Us,Ws,Gs,Ks,qs,Js,Ys,Xs,Zs;function Qs(){return(Qs=t((()=>{P(),ls(),Li(),ds(),_o(),ps(),yo(),as(),ms=1e-4,hs=e=>{let t=e.frameSetting.fps;return t<=0?e.frame.current:Math.round(e.time.code*t)*60/t},gs=e=>{let t=e;typeof t==`function`&&(t=t());let n=[];for(let e of t)typeof e==`object`?n.push(e.value):n.push(e);return n},_s=(e,t=e.target.getField(e.path))=>{let n=e.target,r,i=e.path;if(n instanceof Xt)r=n;else if(n instanceof j)r=n.entity,i=F.resources.getComponentName(n)+`:`+e.path;else return null;let a=n.getFieldOpt(e.path)||{};if(typeof t==`function`)return{entity:r,linkKey:i,kind:`event`,values:[0],opt:a};if(a.readOnly)return null;let o=a.format;if(o&&o.type==`select`){let e=gs(o.list).indexOf(t);return e<0?null:{entity:r,linkKey:i,kind:`select`,values:[e],opt:a}}if(o&&o.type!=`vector`&&o.type!=`color`)return null;if(typeof t==`number`)return{entity:r,linkKey:i,kind:`number`,values:[t],opt:a};if(typeof t==`boolean`)return{entity:r,linkKey:i,kind:`boolean`,values:[+!!t],opt:a};if(Array.isArray(t)&&t.length>0){let e=[];for(let n of t){if(typeof n!=`number`)return null;e.push(n)}return{entity:r,linkKey:i,kind:`array`,values:e,opt:a}}return null},vs=e=>_s(e)!==null,ys=e=>{let t=e.getComponent(cs);return t&&t.getField(`links`)||{}},bs=e=>{let t=ys(e),n=[];for(let e of[`position`,`euler`,`scale`])t[e]&&n.push(e);return n},xs=(e,t)=>{if(!e)return[];let n=typeof e[0]==`string`;return t==`array`?n?[]:e.slice():n?[e]:[]},Ss=(e,t)=>{let n=!1;for(let t of e)t&&(n=!0);if(n)return t==`array`?e:e[0]},Cs=e=>{let t=1;for(;e[`c`+t];)t++;return`c`+t},ws=e=>e==`number`||e==`array`?`BEZIER`:`CONSTANT`,Ts=(e,t)=>{let n=e.get(t);return n||(n={links:{...ys(t)},changed:!1},e.set(t,n)),n},Es=(e,t,n)=>{let r=[];for(let[e,t]of n)t.changed&&!e.getComponent(cs)&&r.push(new us(e,cs));r.push(new vo(e,`curves`,e.curves,t));for(let[e,t]of n)t.changed&&r.push(new fs(e,cs,`links`,ys(e),t.links));return new go(r)},Ds=(e,t)=>{if(e.element!==void 0&&(e.element<0||e.element>=t.values.length))throw Error(`"${e.path}" has no element ${e.element}`)},Os=(e,t)=>e.element===void 0||e.element==t,ks=(e,t,n)=>{let r={...e.curves},i=new Map;for(let e of t){let t=e.target.getField(e.path);e.value!==void 0&&(t=e.value);let a=_s(e,t);if(!a)throw Error(`Cannot insert a keyframe on "${e.path}"`);Ds(e,a);let o=Ts(i,a.entity),s=xs(o.links[a.linkKey],a.kind);for(let t=0;t<a.values.length;t++){if(!Os(e,t))continue;for(;s.length<t;)s.push(null);let i=s[t];if(i||(i=[Cs(r),1,0],s[t]=i,o.changed=!0),i[1]==0)throw Error(`Cannot insert a keyframe on "${e.path}": the link scale is 0`);let c=(a.values[t]-i[2])/i[1];r[i[0]]=Oo(r[i[0]],n,c,ws(a.kind))}o.changed&&(o.links[a.linkKey]=Ss(s,a.kind))}return Es(e,r,i)},As=(e,t,n)=>{let r={...e.curves},i=new Map,a=!1;for(let e of t){let t=_s(e);if(!t)continue;Ds(e,t);let o=Ts(i,t.entity),s=xs(o.links[t.linkKey],t.kind);for(let t=0;t<s.length;t++){let i=s[t];if(!i||!Os(e,t))continue;let c=r[i[0]];if(!c)continue;let l=ko(c,n);l&&(r[i[0]]=l,a=!0,l.k.length==0&&(s[t]=null,o.changed=!0))}if(o.changed){let e=Ss(s,t.kind);e?o.links[t.linkKey]=e:delete o.links[t.linkKey]}}return a?Es(e,r,i):null},js=new WeakMap,Ms=e=>{let t=js.get(e);return t||(t=new pt(yt(e)),js.set(e,t)),t},Ns=(e,t)=>{let n=e;return t.int&&(n=Math.round(n)),t.min!==void 0&&(n=Math.max(t.min,n)),t.max!==void 0&&(n=Math.min(t.max,n)),n},Ps=(e,t,n,r)=>{let i=Ms(t.k).getValue(n)*e[1]+e[2];return r.kind==`boolean`?+(i>.5):r.kind==`select`?i:Ns(i,r.opt)},Fs=(e,t,n,r)=>{let i=_s(t);if(!i)return null;let a=xs(ys(i.entity)[i.linkKey],i.kind),o=!1,s=!1,c=!1;for(let t=0;t<a.length;t++){let l=a[t];if(!l)continue;let u=e.curves[l[0]];!u||u.k.length==0||(o=!0,wo(Ms(u.k).keyframes,n)>=0&&(s=!0),!(i.kind==`event`||t>=i.values.length)&&Math.abs(Ps(l,u,r,i)-i.values[t])>ms&&(c=!0))}return o?{keyed:s,changed:c}:null},Is=e=>e==`select`||e==`event`,Ls=e=>{let t={k:e.k};return e.h&&(t.h=e.h),t},Rs=e=>{let t=new Map;return e.root.traverseEditable(e=>{let n=e.getComponent(cs);if(!n)return;let r=n.getField(`links`)||{};for(let e of Object.keys(r)){let n=r[e],i=[n];typeof n[0]!=`string`&&(i=n);for(let e of i){if(!e)continue;let n=e[0];t.set(n,(t.get(n)||0)+1)}}}),t},zs=(e,t)=>xs(ys(e.entity)[e.linkKey],e.kind)[t]||null,Bs=(e,t)=>{let n=_s(t);if(!n)return null;let r=zs(n,t.element);if(!r)return null;let i=e.curves[r[0]];return i?{curveId:r[0],name:i.name,scale:r[1],offset:r[2],uses:Rs(e).get(r[0])||0,fixedScale:Is(n.kind)}:null},Vs=e=>{let t=_s(e);return t?t.values.length:0},Hs=(e,t)=>{let n=_s(t);if(!n)return[];let r=xs(ys(n.entity)[n.linkKey],n.kind),i=[];if(r.length==0)return i;let a=Rs(e);for(let t of r){if(!t)continue;let n=e.curves[t[0]],r=a.get(t[0])||0;if(!n||r<2)continue;let o=!1;for(let e of i)e.curveId==t[0]&&(o=!0);if(o)continue;let s=t[0];n.name&&(s=n.name),i.push({curveId:t[0],label:s,uses:r})}return i},Us=(e,t,n,r)=>{let i=Ts(e,t.entity),a=xs(i.links[t.linkKey],t.kind);for(;a.length<n;)a.push(null);a[n]=r,i.links[t.linkKey]=Ss(a,t.kind),i.changed=!0},Ws=e=>{let t=_s(e);if(!t)throw Error(`Cannot link a curve to "${e.path}"`);if(e.element<0||e.element>=t.values.length)throw Error(`"${e.path}" has no element ${e.element}`);return t},Gs=(e,t,n,r)=>{let i=Ws(t),a=e.curves[n];if(!a)throw Error(`The copied curve "${n}" no longer exists`);let o=zs(i,t.element),s={...e.curves},c=n;if(r==`duplicate`)c=Cs(s),s[c]=Ls(a);else if(o&&o[0]==n)return null;let l=1,u=0;o&&!Is(i.kind)&&(l=o[1],u=o[2]);let d=new Map;return Us(d,i,t.element,[c,l,u]),Es(e,s,d)},Ks=(e,t)=>{let n=Ws(t),r=zs(n,t.element);if(!r||!e.curves[r[0]])throw Error(`"${t.path}" has no curve to unlink`);let i={...e.curves},a=Cs(i);i[a]=Ls(i[r[0]]);let o=new Map;return Us(o,n,t.element,[a,r[1],r[2]]),Es(e,i,o)},qs=(e,t,n)=>{let r=Ws(t),i=zs(r,t.element);if(!i||!e.curves[i[0]])throw Error(`"${t.path}" has no curve link`);let a=e.curves[i[0]],o={...e.curves},s=new Map,c=!1,l=n.name.trim();if(l!=(a.name||``)){let e=Ls(a);l!=``&&(e.name=l),o[i[0]]=e,c=!0}return(n.scale!=i[1]||n.offset!=i[2])&&!Is(r.kind)&&(Us(s,r,t.element,[i[0],n.scale,n.offset]),c=!0),c?Es(e,o,s):null},Js=(e,t)=>t<=0?e:Math.round(e*t/60)*60/t,Ys=e=>{let t=_s(e);return t?t.kind:null},Xs=(e,t)=>{let n=new Set;for(let r of Object.keys(t)){let i=e.curves[r];t[r].k.length==0&&i&&i.k.length>0&&n.add(r)}let r=new Map;return n.size>0&&e.root.traverseEditable(e=>{let t=ys(e);for(let i of Object.keys(t)){let a=Zs(t[i],n);if(a===t[i])continue;let o=Ts(r,e);o.changed=!0,a?o.links[i]=a:delete o.links[i]}}),Es(e,t,r)},Zs=(e,t)=>{if(typeof e[0]==`string`)return t.has(e[0])?void 0:e;let n=e.slice(),r=!1;for(let e=0;e<n.length;e++){let i=n[e];i&&t.has(i[0])&&(n[e]=null,r=!0)}return r?Ss(n,`array`):e}})))()}var $s,ec,tc,nc,rc,ic,ac,oc;function sc(){return(sc=t((()=>{k(),P(),Li(),fo(),$s=e=>{let t=[],n=e;for(;n;)t.unshift(n.name),n=n.parent;return t.join(`/`)},ec=(e,t)=>{let n=e.root.findEntityByUUID(t);if(n)return n;let r=t.split(`/`).filter(e=>e!==``).join(`/`),i=[];if(e.root.traverseEditable(e=>{$s(e)===r&&i.push(e)}),i.length===0)throw new R(`エンティティが見つかりません: ${t}（uuid か root から始まる名前パスで指定します。一覧は tree で確認できます）`);if(i.length>1){let e=[];for(let t of i)e.push({uuid:t.uuid,path:$s(t)});throw new R(`名前パスが ${i.length} 件に一致しました。uuid で指定してください: ${t}`,e)}return i[0]},tc=e=>[e.x,e.y,e.z],nc=e=>{let t=e.getComponent(M);if(!t||!t.geometry.boundingBox)return null;let n=t.geometry.boundingBox,r=new D(1/0,1/0,1/0),i=new D(-1/0,-1/0,-1/0);for(let t=0;t<8;t++){let a=new D(t&1?n.max.x:n.min.x,t&2?n.max.y:n.min.y,t&4?n.max.z:n.min.z).applyMatrix4AsPosition(e.matrixWorld);r.x=Math.min(r.x,a.x),r.y=Math.min(r.y,a.y),r.z=Math.min(r.z,a.z),i.x=Math.max(i.x,a.x),i.y=Math.max(i.y,a.y),i.z=Math.max(i.z,a.z)}return{min:tc(r),max:tc(i)}},rc=e=>{let t=new D(0,0,0,1).applyMatrix4(e.matrixWorld),n=new D(0,0,-1,0).applyMatrix4(e.matrixWorld).normalize(),r=new D(0,1,0,0).applyMatrix4(e.matrixWorld).normalize();return{position:tc(t),forward:tc(n),up:tc(r),bounds:nc(e)}},ic=e=>F.resources.getComponentName(e),ac=e=>{let t=e;typeof t==`function`&&(t=t());let n=[];for(let e of t)typeof e==`string`?n.push(e):n.push(e.value);return n},oc=e=>{let t=e.serialize({mode:`view`}),n=[];for(let r of Object.keys(t)){let i=e.getFieldOpt(r)??{};if(i.isFolder)continue;let a=t[r],o=a;typeof a==`function`&&(o=`(action)`);let s={path:r,value:o};i.format&&(s.format=i.format.type,(i.format.type===`select`||i.format.type===`resource`)&&(s.options=ac(i.format.list))),i.readOnly&&(s.readOnly=!0),i.noExport&&(s.noExport=!0);let c=!1;typeof i.hidden==`function`?c=i.hidden(a):i.hidden&&(c=!0),c&&(s.hidden=!0),n.push(s)}return n}})))()}var cc,lc,uc,dc,fc,pc,mc,hc,gc,_c,vc,yc,bc,xc,Sc,Cc,wc,Tc,Ec;function Dc(){return(Dc=t((()=>{ls(),Li(),Qs(),fo(),sc(),cc=(e,t)=>{let n=[];for(let[r,i]of e.components){let e=ic(i);if(e===t||i.uuid===t)return{componentClass:r,component:i};n.push(e)}throw new R(`コンポーネントが付いていません: ${t}（${$s(e)}）`,n)},lc=(e,t)=>{if(e.initiator===`script`)throw new R(`${$s(e)} はスクリプト（BLidge / glb 等）が生成したエンティティなので${t}できません`)},uc=(e,t)=>{if(e.initiator!==`user`)throw new R(`${ic(e)} は initiator が ${e.initiator} のコンポーネントなので${t}できません（シーン JSON に載るのは user が付けたものだけ）`)},dc=e=>{let t=[],n=e.serialize({mode:`view`});for(let r of Object.keys(n)){let i=e.getFieldOpt(r)??{};i.isFolder||i.readOnly||typeof n[r]!=`function`&&t.push(r)}return t},fc=(e,t)=>{let n=Number(e);if(e.trim()===``||!Number.isFinite(n))throw new R(`${t} は数値のフィールドです: ${e}`);return n},pc=(e,t,n,r)=>{let i;if(e.trim().startsWith(`[`)){try{i=JSON.parse(e)}catch{throw new R(`${n} の値を JSON の配列として読めません: ${e}`)}if(!Array.isArray(i))throw new R(`${n} は配列のフィールドです: ${e}`)}else{i=[];for(let t of e.split(`,`))i.push(t.trim())}if((r===`vector`||r===`color`)&&i.length!==t.length)throw new R(`${n} は要素数 ${t.length} の ${r} です（例: ${t.join(`,`)}）: ${e}`);let a=[];for(let e=0;e<i.length;e++){let r=i[e];typeof(t[e]??t[0])==`number`&&typeof r==`string`?a.push(fc(r,`${n}[${e}]`)):a.push(r)}return a},mc=(e,t,n,r)=>{let i=t.getFieldOpt(n)??{},a=t.getField(n);if(i.format&&i.format.type===`entity`){if(r===`null`)return null;if(!e.root.findEntityByUUID(r))throw new R(`${n} はエンティティの uuid で指定します（外すときは null）。uuid は tree で確認できます: ${r}`);return r}if(i.format&&(i.format.type===`select`||i.format.type===`resource`)){let e=ac(i.format.list);for(let t of e)if(String(t)===r)return t;throw new R(`${n} は選択肢から選ぶフィールドです: ${r}`,e)}if(Array.isArray(a))return pc(r,a,n,i.format?.type);if(typeof a==`number`)return fc(r,n);if(typeof a==`boolean`){if(r===`true`)return!0;if(r===`false`)return!1;throw new R(`${n} は真偽値のフィールドです（true か false）: ${r}`)}if(typeof a==`string`)return r;if(a==null){if(r===`null`)return null;try{return JSON.parse(r)}catch{return r}}try{return JSON.parse(r)}catch{throw new R(`${n} はオブジェクトのフィールドなので JSON で指定してください: ${r}`)}},hc=`add-entity <parent> [--name <name>]`,gc=(e,t)=>{let n=ec(e.engine,lo(t,0,hc));lc(n,`子を追加`);let r=`Empty`;if(t.options.name!==void 0){if(typeof t.options.name!=`string`)throw new R(`--name に名前がありません。使い方: ${hc}`);if(t.options.name.includes(`/`))throw new R(`名前に / は使えません: ${t.options.name}`);r=t.options.name}let i=e.editor.api.createEntity(n,{name:r,components:[]});return{uuid:i.uuid,name:i.name,path:$s(i)}},_c=(e,t)=>{let n=ec(e.engine,lo(t,0,`remove-entity <entity>`));if(n===e.engine.root)throw new R(`root は削除できません`);lc(n,`削除`);let r=$s(n);return e.editor.api.deleteEntities([n]),{uuid:n.uuid,path:r}},vc=`reparent <entity> <parent>`,yc=(e,t)=>{let n=ec(e.engine,lo(t,0,vc)),r=ec(e.engine,lo(t,1,vc));try{e.editor.api.reparentEntities([n],r)}catch(e){throw new R(e.message)}let i={uuid:n.uuid,path:$s(n),parent:$s(r)},a=bs(n);return a.length>0&&(i.warning=`${a.join(` / `)} にキーが打たれているので、時刻が変わるとキーの値に戻ります（ワールド座標は保たれません）`),i},bc=(e,t)=>{let n=`add-component <entity> <Name>`,r=ec(e.engine,lo(t,0,n)),i=lo(t,1,n),a=F.resources.getComponent(i);if(!a){let e=[];for(let t of F.resources.componentList)e.push(t.name);throw new R(`登録されていないコンポーネントです: ${i}（一覧は components で確認できます）`,e)}if(r.getComponent(a.component))throw new R(`${$s(r)} には ${i} がすでに付いています`);let o=e.editor.api.addComponent(r,a.component);return{entity:$s(r),name:i,uuid:o.uuid}},xc=(e,t)=>{let n=`remove-component <entity> <Name>`,r=ec(e.engine,lo(t,0,n)),{componentClass:i,component:a}=cc(r,lo(t,1,n));uc(a,`削除`);let o=ic(a);return e.editor.api.removeComponent(r,i,a),{entity:$s(r),name:o,uuid:a.uuid}},Sc=`set <entity> [<component>] <path> <value>`,Cc=(e,t)=>{let n=ec(e.engine,lo(t,0,Sc)),r=n,i=$s(n),a=1;if(t.args.length>=4){let{component:e}=cc(n,t.args[1]);uc(e,`編集`),r=e,i=`${i} ${ic(e)}`,a=2}let o=lo(t,a,Sc),s=lo(t,a+1,Sc);if(r instanceof cs&&o===`links`)throw new R(`Animation の links は set では書き換えられません。キーは key-insert / key-delete、カーブの共有は curve-paste / curve-unlink / curve-link-settings で編集します`);let c=dc(r);if(!c.includes(o)){let e=``;throw r===n&&(e=`（コンポーネントのフィールドは set <entity> <component> <path> <value>）`),new R(`書き換えられるフィールドではありません: ${o}（${i}）${e}`,c)}return e.editor.api.setField(r,o,mc(e.engine,r,o,s),{merge:!1}),{target:i,path:o,value:r.getField(o)}},wc=e=>{if(!e.editor.api.canUndo)throw new R(`取り消せる操作がありません`);return e.editor.api.undo(),{canUndo:e.editor.api.canUndo,canRedo:e.editor.api.canRedo}},Tc=e=>{if(!e.editor.api.canRedo)throw new R(`やり直せる操作がありません`);return e.editor.api.redo(),{canUndo:e.editor.api.canUndo,canRedo:e.editor.api.canRedo}},Ec={"add-entity":gc,"remove-entity":_c,reparent:yc,"add-component":bc,"remove-component":xc,set:Cc,undo:wc,redo:Tc}})))()}var Oc,kc,Ac,jc,Mc,Nc,Pc,Fc,Ic,Lc,Rc,zc,Bc,Vc,Hc,Uc,Wc,Gc,Kc,qc,Jc,Yc,Xc,Zc,Qc,$c,el,tl,nl,rl,il,al,ol,sl,cl,ll,ul,dl,fl;function pl(){return(pl=t((()=>{P(),_o(),yo(),as(),Qs(),fo(),sc(),Dc(),Oc=60,kc=e=>e/Oc,Ac=e=>{let t=[];for(let n of Object.keys(e.serialize({mode:`view`})))(e.getFieldOpt(n)??{}).isFolder||vs({target:e,path:n})&&t.push(n);return t},jc=(e,t,n)=>{let r=Ac(e);if(r.includes(t))return{path:t,element:null};let i=t.lastIndexOf(`/`),a=t.slice(0,i),o=t.slice(i+1);if(i>0&&r.includes(a)&&/^\d+$/.test(o)){if(!Array.isArray(e.getField(a)))throw new R(`${a} は数値配列のフィールドではないので要素を指定できません（${n}）`);let r=Number(o),i=Vs({target:e,path:a});if(r>=i)throw new R(`${a} の要素は 0〜${i-1} です: ${t}（${n}）`);return{path:a,element:r}}throw new R(`キーを打てるフィールドではありません: ${t}（${n}）。数値配列の要素1つは <path>/<番号>（position/1 = y）で指します`,r)},Mc=(e,t,n,r)=>{let i=t.args.length-r;if(i!==2&&i!==3)throw new R(`引数の数が合いません。使い方: ${n}`);let a=ec(e.engine,t.args[0]),o=a,s=$s(a);if(i===3){let{component:e}=cc(a,t.args[1]);uc(e,`キーフレームの編集`),o=e,s=`${s} ${ic(e)}`}let{path:c,element:l}=jc(o,t.args[i-1],s);return{target:o,path:c,element:l,label:s}},Nc=e=>{if(e.element!==null)return e.element;if(Array.isArray(e.target.getField(e.path)))throw new R(`${e.path} は数値配列なので、要素を <path>/<番号>（${e.path}/0 等）で指定してください（${e.label}）`);return 0},Pc=e=>e.element===null?e.path:`${e.path}/${e.element}`,Fc=e=>{try{return e()}catch(e){throw new R(uo(e))}},Ic=e=>{let t=new Map,n=(e,n)=>{let r=t.get(e);r||(r=[],t.set(e,r)),r.push(n)};return e.root.traverseEditable(e=>{let t=ys(e);for(let r of Object.keys(t)){let i=r.indexOf(`:`),a,o=r;i>=0&&(a=r.slice(0,i),o=r.slice(i+1));let s=t[r];if(typeof s[0]==`string`){let t=s;n(t[0],{entity:$s(e),uuid:e.uuid,component:a,path:o,scale:t[1],offset:t[2]});continue}let c=s;for(let t=0;t<c.length;t++){let r=c[t];r&&n(r[0],{entity:$s(e),uuid:e.uuid,component:a,path:`${o}/${t}`,scale:r[1],offset:r[2]})}}}),t},Lc=(e,t)=>{let n=[],r=Vs(t);for(let i=0;i<r;i++){if(t.element!==null&&t.element!==i)continue;let r=Bs(e,{target:t.target,path:t.path,element:i});r&&n.push(r.curveId)}return n},Rc=(e,t)=>{let n=[];for(let r of Lc(e,t))for(let t of yt(e.curves[r].k)){let e=kc(t.coordinate.x);n.includes(e)||n.push(e)}return n.sort((e,t)=>e-t),n},zc=(e,t)=>{let n=e.curves[t];if(!n)throw new R(`カーブがありません: ${t}（一覧は curves で確認できます）`,Object.keys(e.curves));return n},Bc=e=>{let t=[];for(let n of To(e))t.push({time:kc(n.coordinate.x),value:n.coordinate.y,interpolation:n.interpolation,handleType:n.handleType,left:[kc(n.handleLeft.x),n.handleLeft.y],right:[kc(n.handleRight.x),n.handleRight.y]});return e.name===void 0?{keys:t}:{name:e.name,keys:t}},Vc=(e,t)=>{for(let n of t)if(kc(n)===e)return n;let n=e*Oc;for(let t=1;t<=17;t++){let r=Number(n.toPrecision(t));if(kc(r)===e)return r}return n},Hc=[`AUTO_CLAMPED`,`AUTO`,`VECTOR`],Uc=e=>typeof e==`number`&&Number.isFinite(e),Wc=(e,t,n)=>{if(!Array.isArray(e)||e.length!==2||!Uc(e[0])||!Uc(e[1]))throw new R(`${t} は [ 秒, 値 ] で指定してください: ${JSON.stringify(e)}`);return{x:Vc(e[0],n),y:e[1]}},Gc=(e,t,n)=>{let r=`keys[${t}]`;if(typeof e!=`object`||!e)throw new R(`${r} はオブジェクトで指定してください: ${JSON.stringify(e)}`);let i=e;if(!Uc(i.time))throw new R(`${r}.time は秒の数値で指定してください: ${JSON.stringify(i.time)}`);if(!Uc(i.value))throw new R(`${r}.value は数値で指定してください: ${JSON.stringify(i.value)}`);let a=bt.find(e=>e===i.interpolation);if(!a)throw new R(`${r}.interpolation が不正です: ${JSON.stringify(i.interpolation)}`,bt);let o=Co.find(e=>e===i.handleType);if(!o)throw new R(`${r}.handleType が不正です: ${JSON.stringify(i.handleType)}`,Co);let s={x:Vc(i.time,n),y:i.value};if(Hc.includes(o))return{coordinate:s,handleLeft:{...s},handleRight:{...s},interpolation:a,handleType:o};if(i.left===void 0||i.right===void 0)throw new R(`${r} は handleType が ${o} なので left / right（[ 秒, 値 ]）が必要です`);let c=Wc(i.left,`${r}.left`,n),l=Wc(i.right,`${r}.right`,n);return c.x=Math.min(c.x,s.x),l.x=Math.max(l.x,s.x),{coordinate:s,handleLeft:c,handleRight:l,interpolation:a,handleType:o}},Kc=(e,t)=>{let n;try{n=JSON.parse(e)}catch{throw new R(`カーブの JSON を読めません: ${e}`)}if(typeof n!=`object`||!n||!Array.isArray(n.keys))throw new R(`カーブは { "name"?: 名前, "keys": [ … ] } の形で指定してください（curve-get の出力と同じ形）: ${e}`);let r=n;if(r.name!==void 0&&typeof r.name!=`string`)throw new R(`name は文字列で指定してください: ${JSON.stringify(r.name)}`);let i=[];for(let e of To(t))i.push(e.coordinate.x,e.handleLeft.x,e.handleRight.x);let a=[];for(let e=0;e<r.keys.length;e++)a.push(Gc(r.keys[e],e,i));a.sort((e,t)=>e.coordinate.x-t.coordinate.x);for(let e=1;e<a.length;e++)if(wo([a[e-1]],a[e].coordinate.x)>=0)throw new R(`同じ時刻のキーが2つあります: ${kc(a[e].coordinate.x)} 秒（1本のカーブの1つの時刻に置けるキーは1つ）`);Zo(a);let o,s=(r.name??``).trim();return s!==``&&(o={name:s,k:[]}),Eo(a,o)},qc=e=>{let t=Ic(e.engine),n=[];for(let r of Object.keys(e.engine.curves)){let i=e.engine.curves[r],a=t.get(r)??[];n.push({id:r,name:i.name??null,keys:i.k.length,uses:a.length,users:a})}return{curves:n}},Jc=(e,t)=>{let n=lo(t,0,`curve-get <curveId>`);return Bc(zc(e.engine,n))},Yc=`curve-set <curveId> <json>`,Xc=(e,t)=>{let n=lo(t,0,Yc),r=lo(t,1,Yc),i=Kc(r,zc(e.engine,n));return e.editor.api.setCurves({...e.engine.curves,[n]:i}),{id:n,curve:Bc(i)}},Zc=`key-insert <entity> [<component>] <path> --time <秒> [--value <値>]`,Qc=`key-delete <entity> [<component>] <path> --time <秒>`,$c=(e,t,n)=>{let r=t.options.time,i=Number(r);if(typeof r!=`string`||r.trim()===``||!Number.isFinite(i))throw new R(`--time に秒の数値を指定してください。使い方: ${n}`);return Js(i*Oc,e.engine.frameSetting.fps)},el=(e,t,n)=>{if(Ys(t)===`event`)throw new R(`${t.path} は関数（イベント）のフィールドなので --value は指定できません（${t.label}）`);if(t.element===null)return mc(e.engine,t.target,t.path,n);let r=Number(n);if(n.trim()===``||!Number.isFinite(r))throw new R(`${Pc(t)} は数値の要素です: ${n}`);let i=t.target.getField(t.path).slice();return i[t.element]=r,i},tl=(e,t)=>{let n=Mc(e,t,Zc,0),r=$c(e,t,Zc),i;n.element!==null&&(i=n.element);let a;if(t.options.value===void 0)a=Fc(()=>ks(e.engine,[{target:n.target,path:n.path,element:i}],r));else{if(typeof t.options.value!=`string`)throw new R(`--value に値がありません。使い方: ${Zc}`);let o=el(e,n,t.options.value),s=Fc(()=>ks(e.engine,[{target:n.target,path:n.path,element:i,value:o}],r)),c=new vo(n.target,n.path,n.target.getField(n.path),o);a=new go([c,s])}return e.editor.api.commandManager.execute(a,{merge:!1}),{target:n.label,path:Pc(n),time:kc(r),curves:Lc(e.engine,n)}},nl=(e,t)=>{let n=Mc(e,t,Qc,0),r=$c(e,t,Qc),i;n.element!==null&&(i=n.element);let a=Fc(()=>As(e.engine,[{target:n.target,path:n.path,element:i}],r));if(!a)throw new R(`${kc(r)} 秒にキーがありません（${n.label} ${Pc(n)}）。候補はキーのある時刻（秒）です`,Rc(e.engine,n));return e.editor.api.commandManager.execute(a,{merge:!1}),{target:n.label,path:Pc(n),time:kc(r),curves:Lc(e.engine,n)}},rl=`curve-paste <entity> [<component>] <path> <curveId> --link | --copy`,il=`curve-unlink <entity> [<component>] <path>`,al=`curve-link-settings <entity> [<component>] <path> [--scale <倍率>] [--offset <足し算>] [--name <カーブ名>]`,ol=(e,t,n)=>{let r=Bs(e.engine,{target:t.target,path:t.path,element:n});return r?{curveId:r.curveId,name:r.name??null,scale:r.scale,offset:r.offset,uses:r.uses}:null},sl=(e,t)=>{let n=Mc(e,t,rl,1),r=Nc(n),i=t.args[t.args.length-1];zc(e.engine,i);let a=t.options.link===!0,o=t.options.copy===!0;if(a===o)throw new R(`--link か --copy のどちらか一方を指定してください。使い方: ${rl}`);let s=`link`;o&&(s=`duplicate`);let c=Fc(()=>Gs(e.engine,{target:n.target,path:n.path,element:r},i,s));return c&&e.editor.api.commandManager.execute(c,{merge:!1}),{target:n.label,path:`${n.path}/${r}`,changed:c!==null,link:ol(e,n,r)}},cl=(e,t)=>{let n=Mc(e,t,il,0),r=Nc(n),i=ol(e,n,r);if(!i)throw new R(`${n.label} ${n.path}/${r} にはカーブのリンクがありません`);if(i.uses<2)throw new R(`${n.label} ${n.path}/${r} のカーブ ${i.curveId} はほかと共有していないので、解除するリンクがありません`);return e.editor.api.commandManager.execute(Fc(()=>Ks(e.engine,{target:n.target,path:n.path,element:r})),{merge:!1}),{target:n.label,path:`${n.path}/${r}`,from:i.curveId,link:ol(e,n,r)}},ll=(e,t)=>{let n=e.options[t];if(n===void 0)return;let r=Number(n);if(typeof n!=`string`||n.trim()===``||!Number.isFinite(r))throw new R(`--${t} は数値で指定してください: ${n}`);return r},ul=(e,t)=>{let n=Mc(e,t,al,0),r=Nc(n),i={target:n.target,path:n.path,element:r},a=Bs(e.engine,i);if(!a)throw new R(`${n.label} ${n.path}/${r} にはカーブのリンクがありません`);let o=ll(t,`scale`),s=ll(t,`offset`),c=t.options.name;if(typeof c==`boolean`)throw new R(`--name に名前がありません（名前を外すときは --name ""）。使い方: ${al}`);if(o===void 0&&s===void 0&&c===void 0)throw new R(`--scale / --offset / --name のどれかを指定してください。使い方: ${al}`);if(a.fixedScale&&(o!==void 0||s!==void 0))throw new R(`${n.path} は選択肢か関数（イベント）のフィールドなので、倍率・足し算は変えられません（--name だけ指定できます）`);let l={name:a.name??``,scale:a.scale,offset:a.offset};c!==void 0&&(l.name=c),o!==void 0&&(l.scale=o),s!==void 0&&(l.offset=s);let u=Fc(()=>qs(e.engine,i,l));return u&&e.editor.api.commandManager.execute(u,{merge:!1}),{target:n.label,path:`${n.path}/${r}`,changed:u!==null,link:ol(e,n,r)}},dl={curves:qc,"curve-get":Jc},fl={"curve-set":Xc,"key-insert":tl,"key-delete":nl,"curve-paste":sl,"curve-unlink":cl,"curve-link-settings":ul}})))()}var ml,hl,gl,_l,vl,yl,bl,xl;function Sl(){return(Sl=t((()=>{qe(),Li(),fo(),sc(),ho(),ml=e=>{let t=`tab`;return e.headless&&(t=`headless`),{connection:t,tabId:e.tabId,url:location.href,scene:e.sceneName,unsaved:e.unsaved,frame:{current:e.engine.frame.current,playing:e.engine.frame.playing,duration:e.engine.frameSetting.duration,fps:e.engine.frameSetting.fps}}},hl=e=>{let t=[];e.components.forEach(e=>{t.push(ic(e))});for(let n of e.unresolvedComponents)t.push(`${n.name} (unresolved)`);return t},gl=e=>{let t=[];return e.engine.root.traverseEditable(e=>{t.push({path:$s(e),uuid:e.uuid,initiator:e.initiator,visible:e.visible,...rc(e),components:hl(e)})}),t},_l=(e,t)=>{let n=ec(e.engine,lo(t,0,`get <entity>`)),r=[];n.components.forEach(e=>{r.push({name:ic(e),uuid:e.uuid,initiator:e.initiator,fields:oc(e)})});let i=[];for(let e of n.children)e.editorHidden||i.push({uuid:e.uuid,name:e.name});return{path:$s(n),uuid:n.uuid,initiator:n.initiator,world:rc(n),fields:oc(n),components:r,unresolvedComponents:n.unresolvedComponents,children:i}},vl=(e,t)=>{let n=e.createEntity({name:`__agent_probe__`});try{let e=n.addComponent(t.component);return{fields:oc(e)}}catch(e){return{error:`フィールド定義を読めませんでした: ${uo(e)}`}}finally{n.disposeRecursive()}},yl=e=>{let t=[],n=(r,i)=>{for(let a of r.child)`component`in a?t.push({name:a.name,group:i,...vl(e.engine,a)}):n(a,`${i}/${a.name}`)};for(let e of F.resources.componentGroups)n(e,e.name);return t},bl=e=>{let t=[];Pe.forEach((e,n)=>{t.push({name:n,message:e})});let n=[],r=[];for(let e of mo())e.message.startsWith(`[webgpu]`)?n.push(e):r.push(e);let i=[];return e.engine.root.traverseEditable(e=>{for(let t of e.unresolvedComponents)i.push({entity:$s(e),entityUuid:e.uuid,name:t.name,uuid:t.uuid})}),{shader:t,gpu:n,console:r,unresolvedComponents:i}},xl={status:ml,tree:gl,get:_l,components:yl,errors:bl}})))()}var Cl;function wl(){return(wl=t((()=>{Cl=`agent-headless`})))()}var Tl,El,Dl,Ol,kl,Al,jl,Ml,Nl,Pl;function Fl(){return(Fl=t((()=>{fo(),Tl=/^[A-Za-z0-9_-]+$/,El=e=>{if(!e.scenes)throw new R(`このページはシーンを切り替えられません（シーンを焼き込んだページです）`);return e.scenes},Dl=(e,t)=>{if(!e.names.includes(t))throw new R(`シーンがありません: ${t}`,e.names)},Ol=e=>{if(e.unsaved)throw new R(`開いているシーン（${e.sceneName}）に未保存の変更があります。タブで保存（Ctrl+S）するか破棄してから切り替えてください`)},kl=async(e,t,n)=>{let r=()=>{},i=new Promise(e=>{r=e});e.engine.once(`loaded`,r);try{await t.onSelect(n)}catch(t){throw e.engine.off(`loaded`,r),t}await i},Al=`scene-create <name> [--from <scene>] [--open]`,jl=async(e,t)=>{let n=El(e),r=lo(t,0,Al);if(!Tl.test(r))throw new R(`シーン名に使えるのは英数字・-・_ だけです: ${r}`);if(n.names.includes(r))throw new R(`シーンはすでにあります: ${r}`,n.names);let i;if(t.options.from!==void 0){if(typeof t.options.from!=`string`)throw new R(`--from にシーン名がありません。使い方: ${Al}`);Dl(n,t.options.from),i=t.options.from}let a=t.options.open===!0;return a&&Ol(e),await n.onCreate(r,i),a&&await kl(e,n,r),{scene:r,from:i??null,opened:a}},Ml=async(e,t)=>{let n=El(e),r=lo(t,0,`scene-delete <name>`);if(Dl(n,r),r===n.current)throw new R(`開いているシーンは削除できません: ${r}（scene-open で別のシーンを開いてから削除してください）`);return await n.onDelete(r),{scene:r}},Nl=async(e,t)=>{let n=El(e),r=lo(t,0,`scene-open <name>`);Dl(n,r);let i=n.current;return r===i?{scene:r,previous:i,opened:!1}:(Ol(e),await kl(e,n,r),{scene:r,previous:i,opened:!0})},Pl={"scene-create":jl,"scene-delete":Ml,"scene-open":Nl}})))()}var Il,Ll,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl,Kl;function ql(){return(ql=t((()=>{fo(),sc(),Dc(),Il=[`renderer`,`timeline`,`editor`],Ll=[`resolution/`,`frameLoop/`],Rl=/^viewports\/[^/]+\/resolutionScale$/,zl=e=>e.sceneName===null?null:`scenes/${e.sceneName}.json`,Bl=(e,t)=>{if(t===`renderer`)return{serializable:e.engine.renderer,file:zl(e),accepts:()=>!0};if(t===`timeline`)return{serializable:e.engine,file:zl(e),accepts:e=>e.startsWith(`timeline/`)};if(t===`editor`)return{serializable:e.editor,file:`editor.json`,accepts:e=>{for(let t of Ll)if(e.startsWith(t))return!0;return Rl.test(e)}};throw new R(`設定の名前が違います: ${t}`,Il)},Vl=e=>{let t=[];for(let n of dc(e.serializable))e.accepts(n)&&t.push(n);return t},Hl=(e,t)=>{let n=Il;t.args[0]!==void 0&&(n=[t.args[0]]);let r={};for(let t of n){let n=Bl(e,t),i=Vl(n),a=[];for(let e of oc(n.serializable))i.includes(e.path)&&a.push(e);r[t]={file:n.file,fields:a}}return r},Ul=`set-setting <renderer|timeline|editor> <path> <value>`,Wl=(e,t)=>{let n=lo(t,0,Ul),r=lo(t,1,Ul),i=lo(t,2,Ul),a=Bl(e,n),o=Vl(a);if(!o.includes(r))throw new R(`書き換えられる設定ではありません: ${r}（${n}）`,o);let s=a.serializable;return e.editor.api.setField(s,r,mc(e.engine,s,r,i),{merge:!1}),{target:n,file:a.file,path:r,value:s.getField(r)}},Gl={settings:Hl},Kl={"set-setting":Wl}})))()}var Jl=n({LookAt:()=>Yl}),Yl;function Xl(){return(Xl=t((()=>{k(),P(),Yl=class extends j{target;_targetUUID;up;targetWorldPos;targetLocalPos;localUp;lookAtMatrix;parentInverse;constructor(e){super(e),this.target=null,this._targetUUID=null,this.targetWorldPos=new D,this.targetLocalPos=new D,this.localUp=new D,this.up=new D(0,1,0),this.lookAtMatrix=new O,this.parentInverse=new O,this.order=100,this.field(`target`,()=>this._targetUUID,e=>{this._targetUUID=e||null,this.target=null},{format:{type:`entity`}})}setTarget(e){this.target=e,this._targetUUID=e?e.uuid:null}updateImpl(){if(!this._targetUUID||this.target)return;let e=this.entity.getRootEntity();this.target=e.findEntityByUUID(this._targetUUID)||null}postUpdateImpl(e){this.target&&this._enabled&&(this.target.matrixWorld.decompose(this.targetWorldPos),this.targetLocalPos.copy(this.targetWorldPos),this.localUp.copy(this.up),this.entity.parent&&(this.parentInverse.copy(this.entity.parent.matrixWorld).inverse(),this.targetLocalPos.applyMatrix4AsPosition(this.parentInverse),this.localUp.applyMatrix4AsDirection(this.parentInverse).normalize()),this.lookAtMatrix.lookAt(this.entity.position,this.targetLocalPos,this.localUp),this.entity.quaternion.setFromMatrix(this.lookAtMatrix))}}})))()}var Zl=n({OrbitControls:()=>Ql}),Ql;function $l(){return($l=t((()=>{k(),P(),Ui(),Xl(),Ql=class extends j{keyborad_;_pointer;orbit_;mouseVelOrbit_;mouseVelMove_;eye_;target_;up_;lookatMatrix_;distance_;distanceVel_;_memPos;_memTarget;_multiTouching;elmDisposer;constructor(e){super(e),this._pointer=new Bi,this.keyborad_=new Ri,this.orbit_=new D,this.mouseVelOrbit_=new D,this.mouseVelMove_=new D,this.target_=new D,this.eye_=new D,this.up_=new D(0,1,0),this.distance_=5,this.distanceVel_=0,this.lookatMatrix_=new O,this._memPos=new D,this._memTarget=new D,this._multiTouching=!1,this.order=999;let t=!1,n=e=>{t||=!0},r=e=>{if(!this._enabled||!t||this._multiTouching)return;let n={x:e.delta.x*1,y:e.delta.y*1};this.keyborad_.pressedKeys.Shift?this.mouseVelMove_.add(n):this.mouseVelOrbit_.add(n),e.pointerEvent.preventDefault(),e.pointerEvent.stopPropagation()},i=e=>{t&&=!1};this._pointer.on(`move`,r),this._pointer.on(`start`,n),this._pointer.on(`end`,i),this.once(`dispose`,()=>{this._pointer.off(`move`,r),this._pointer.off(`start`,n),this._pointer.off(`end`,i)}),this.setPosition(this.entity.position,this.target_)}set enabled(e){if(this._enabled=e,e){this._memTarget.copy(this.target_),this._memPos.copy(this.entity.position);let e=this.entity.getComponent(Yl);e&&e.target&&this.setPosition(this.entity.position,e.target.position),this.calc(this.entity)}}get enabled(){return this._enabled}get eye(){return this.eye_}get target(){return this.target_}setElm(e){this.elmDisposer&&this.elmDisposer(),this._pointer.setElement(e);let t=new Map,n=()=>{let e=Array.from(t.values());if(e.length<2)return 0;let n=e[1].x-e[0].x,r=e[1].y-e[0].y;return Math.sqrt(n*n+r*r)},r=()=>{let e=Array.from(t.values());return e.length<2?{x:0,y:0}:{x:(e[0].x+e[1].x)/2,y:(e[0].y+e[1].y)/2}},i=0,a={x:0,y:0},o=e=>{e.pointerType===`touch`&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),t.size===2&&(this._multiTouching=!0,i=n(),a=r()))},s=e=>{if(e.pointerType===`touch`&&t.has(e.pointerId)&&(t.set(e.pointerId,{x:e.clientX,y:e.clientY}),this._enabled&&t.size>=2)){let e=n(),t=e-i;this.distanceVel_+=-t*5,i=e;let o=r(),s=o.x-a.x,c=o.y-a.y;this.mouseVelMove_.add({x:s,y:c}),a=o}},c=e=>{e.pointerType===`touch`&&(t.delete(e.pointerId),t.size<2&&(this._multiTouching=!1,i=0))};e.addEventListener(`pointerdown`,o),e.addEventListener(`pointermove`,s),e.addEventListener(`pointerup`,c),e.addEventListener(`pointercancel`,c);let l=e=>{e.preventDefault(),this._enabled&&(this.distanceVel_+=e.deltaY)};e.addEventListener(`wheel`,l),this.elmDisposer=()=>{e.removeEventListener(`pointerdown`,o),e.removeEventListener(`pointermove`,s),e.removeEventListener(`pointerup`,c),e.removeEventListener(`pointercancel`,c),e.removeEventListener(`wheel`,l)}}calc(e){let t=Math.PI/2-.001;this.eye_.set(0,0,0),this.eye_.z+=this.distance_,this.eye_.applyMatrix3(new O().makeRotationAxis({x:1,y:0,z:0},Math.min(t,Math.max(-t,this.orbit_.x)))),this.eye_.applyMatrix3(new O().makeRotationAxis({x:0,y:1,z:0},this.orbit_.y)),this.eye_.add(this.target_),this.lookatMatrix_.lookAt(this.eye_,this.target_,this.up_),this.lookatMatrix_.decompose(e.position,e.quaternion,e.scale)}updateImpl(e){let t=new D(-this.mouseVelMove_.x*this.distance_*25e-5,this.mouseVelMove_.y*this.distance_*25e-5,0,0);t.applyMatrix3(this.entity.matrix),this.target_.add(t),this.orbit_.x+=this.mouseVelOrbit_.y*.001,this.orbit_.x=Math.min(Math.PI/2,Math.max(-Math.PI/2,this.orbit_.x)),this.orbit_.y+=this.mouseVelOrbit_.x*.001,this.distance_+=this.distanceVel_*.01*this.distance_*.025,this.distance_=Math.max(.1,this.distance_);let n=Math.max(0,1-e.timeDelta*10);this.mouseVelOrbit_.multiply(n),this.mouseVelMove_.multiply(n),this.distanceVel_*=n,this.calc(this.entity)}addOrbitVelocity(e,t){this._enabled&&this.mouseVelOrbit_.add({x:e,y:t})}addMoveVelocity(e,t){this._enabled&&this.mouseVelMove_.add({x:e,y:t})}addDistanceVelocity(e){this._enabled&&(this.distanceVel_+=e)}setPosition(e,t){if(this.eye_.copy(e),this.target_.copy(t),this.entity){let e=this.entity.parent;e&&(e.updateMatrix(!0),this.target_.applyMatrix4(e.matrixWorld.clone().inverse()))}let n=this.eye_.x-this.target_.x,r=this.eye_.y-this.target_.y,i=this.eye_.z-this.target_.z;this.orbit_.x=Math.atan2(r,Math.sqrt(n*n+i*i)),this.orbit_.y=-Math.atan2(n,i),this.distance_=this.eye_.clone().sub(this.target_).length(),this.mouseVelOrbit_.set(0,0,0),this.mouseVelMove_.set(0,0,0),this.distanceVel_=0}dispose(){super.dispose(),this._pointer.dispose(),this.elmDisposer&&this.elmDisposer()}}})))()}var eu,tu,nu,ru,iu,au,ou;function su(){return(su=t((()=>{k(),P(),$l(),eu={motionBlur:!1,dof:!1},tu=1.3,nu=1,ru=.1,iu={front:[0,0,1],right:[1,0,0],top:[0,1,0]},au=e=>{let t=null;return e.traverseEditable(e=>{if(t)return;let n=e.getComponentsByTag(`camera`);for(let r=0;r<n.length;r++)if(n[r].displayOut){t=e;return}}),t},ou=class{_entity;_camera;_orbitControls;_renderView;_view;_preview;constructor(e,t,n){this._entity=e.createEntity({name:`__editorCamera`}),this._camera=this._entity.addComponent(Rt),this._camera.displayOut=!1,this._orbitControls=this._entity.addComponent(Ql),this._orbitControls.setElm(n),this._renderView=t,this._view=`editor`,this._preview=!1,this._apply(e)}get entity(){return this._entity}get camera(){return this._camera}get orbitControls(){return this._orbitControls}get view(){return this._view}get preview(){return this._preview}get usingEditorCamera(){return!this._preview&&this._view===`editor`}setView(e,t){this._view=e,this._apply(t)}setPreview(e,t){this._preview=e,this._apply(t)}_apply(e){let t=this._renderView;this.usingEditorCamera?(t.camera!==this._entity&&this.syncFromSceneCamera(e),t.camera=this._entity,this._orbitControls.enabled=!0):(t.camera=null,this._orbitControls.enabled=!1),t.pipelineOverride=this.usingEditorCamera?eu:null}alignView(e,t){let n=this._orbitControls.target.clone(),r=this._orbitControls.eye.clone().sub(n).length(),i=iu[e],a=new D(i[0],i[1],i[2]);t&&a.multiply(-1);let o=n.clone().add(a.multiply(r));this._orbitControls.setPosition(o,n)}toggleProjection(){this._camera.cameraType===`perspective`?this._camera.cameraType=`orthographic`:this._camera.cameraType=`perspective`,this._camera.needsUpdateProjectionMatrix=!0}focus(e){e.updateMatrixRecursive(!0);let t=this._getWorldBounds(e),n=new D,r=nu;t?(n.copy(t.min).add(t.max).multiply(.5),r=Math.max(t.max.clone().sub(t.min).length()*.5,ru)):e.matrixWorld.decompose(n);let i=r/Math.tan(this._camera.fov*Math.PI/360)*tu,a=this._orbitControls.eye.clone().sub(this._orbitControls.target);a.length()<1e-6&&a.set(0,0,1),a.normalize().multiply(i),this._orbitControls.setPosition(n.clone().add(a),n)}_getWorldBounds(e){let t=new D(1/0,1/0,1/0),n=new D(-1/0,-1/0,-1/0),r=!1;return e.traverse(e=>{if(!e.visible)return;let i=e.getComponent(M);if(!i)return;let a=i.geometry.boundingBox;if(a){for(let r=0;r<8;r++){let i=new D(r&1?a.max.x:a.min.x,r&2?a.max.y:a.min.y,r&4?a.max.z:a.min.z).applyMatrix4AsPosition(e.matrixWorld);t.x=Math.min(t.x,i.x),t.y=Math.min(t.y,i.y),t.z=Math.min(t.z,i.z),n.x=Math.max(n.x,i.x),n.y=Math.max(n.y,i.y),n.z=Math.max(n.z,i.z)}r=!0}}),r?{min:t,max:n}:null}getCameraEntity(e){return this._renderView.camera||au(e.root)}updateBeforeRender(e){if(!this.usingEditorCamera)return;let t=e.createEntityUpdateEvent();this._entity.commitFrame(t),this._entity.updateMatrix();let n=this._renderView.size||e.renderer.resolution;if(this._camera.aspect=n.x/n.y,this._camera.needsUpdateProjectionMatrix=!0,this._entity.update(t),this._camera.cameraType===`orthographic`){let e=this._orbitControls.eye.clone().sub(this._orbitControls.target).length();this._camera.orthHeight=2*e*Math.tan(this._camera.fov*Math.PI/360)}this._entity.postUpdate(t),this._entity.updateMatrixRecursive(),this._entity.prepareRender(t)}dispose(){this._entity.dispose()}syncFromSceneCamera(e){let t=au(e.root);if(!t)return;let n=new D;t.matrixWorld.decompose(n);let r=t.getComponentsByTag(`camera`)[0];this._orbitControls.setPosition(n,this._resolveOrbitTarget(t,r,n)),r&&(this._camera.fov=r.fov,this._camera.near=r.near,this._camera.far=r.far,this._camera.needsUpdateProjectionMatrix=!0)}_resolveOrbitTarget(e,t,n){let r=Math.max(t?t.dofParams.focusDistance:5,.1),i=new D(0,0,-1,0).applyMatrix3(e.matrixWorld).normalize();return n.clone().add(i.multiply(r))}}})))()}var cu;function lu(){return(lu=t((()=>{at(),k(),cu=class e extends tt{static paused=!1;_draw;_view;_elm;_outTarget;_frameLabels;_enable;_resolution;_count;_total;_tile;_tilePixelSize;_tileInv;_focus;_prevFrameLabels;_labelCount;_overlay;constructor(e,t,n){super(),this._draw=t,this._view=n,this._elm=e,this._outTarget=t.createTarget(),this._enable=!1,this._count=0,this._total=1,this._tile=new D(1,1),this._tilePixelSize=new D(1,1),this._tileInv=new D(1,1),this._focus=null,this._frameLabels=[],this._prevFrameLabels=[],this._labelCount=new Map,this._resolution=new D,this._overlay=document.createElement(`div`),this._overlay.style.cssText=`position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;color:#fff;font-family:'Courier New',monospace;font-weight:500;mix-blend-mode:difference;`;let r=t.onDrawPass((e,t)=>this._push(e,t)),i=new D(0,0),a=this._onClick.bind(this),o=e=>{i.set(e.clientX,e.clientY)},s=e=>{let t=new D(e.clientX,e.clientY);i.clone().sub(t).length()<10&&a(e)};this._elm.addEventListener(`pointerdown`,o),this._elm.addEventListener(`pointerup`,s);let c=e=>{if(e.key===`Escape`&&(this._focus=null,this._clear()),e.key==`ArrowRight`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.min(e+1,this._prevFrameLabels.length-1);this._focus=this._prevFrameLabels[t]??this._focus}if(e.key==`ArrowLeft`&&this._focus!==null){let e=this._prevFrameLabels.indexOf(this._focus),t=Math.max(e-1,0);this._focus=this._prevFrameLabels[t]??this._focus}};window.addEventListener(`keydown`,c),this.once(`dispose`,()=>{r(),this._elm.removeEventListener(`pointerdown`,o),this._elm.removeEventListener(`pointerup`,s),window.removeEventListener(`keydown`,c),this._overlay.remove()})}_calcTilePos(e){return{x:e%this._tile.x*this._tileInv.x*this._resolution.x,y:Math.floor(e/this._tile.x)*this._tileInv.y*this._resolution.y}}_push(t,n){if(!this._enable||e.paused)return;let r=n||String(this._count),i=this._labelCount.get(r)||0;this._labelCount.set(r,i+1);let a=i>0?r+`#`+i:r;if(this._focus==null||this._focus==a){let{x:e,y:n}=this._calcTilePos(this._count);this._focus!==null&&(e=0,n=0),this._draw.blit(this._view,t,this._outTarget,{x:e,y:n,width:this._tilePixelSize.x,height:this._tilePixelSize.y}),this._frameLabels.push(a)}this._count++}draw(){this._draw.blit(this._view,this._outTarget,null),this._drawLabels(),this._clear()}_drawLabels(){let e=this._elm.parentElement;e&&(this._overlay.parentElement!==e&&e.appendChild(this._overlay),this._overlay.style.fontSize=Math.max(10,this._elm.clientHeight/1080*28)+`px`,this._overlay.replaceChildren(...this._frameLabels.map((e,t)=>{let n=document.createElement(`div`);return n.textContent=e,n.style.cssText=`position:absolute;transform:translateY(-100%);white-space:nowrap;`,n.style.left=t%this._tile.x*this._tileInv.x*100+`%`,n.style.top=(Math.floor(t/this._tile.x)+1)*this._tileInv.y*100+`%`,n.style.paddingLeft=`5px`,n})))}_clear(){this._total=this._count,this._prevFrameLabels=this._frameLabels;let e=Math.sqrt(this._focus===null?Math.max(this._total,1):1);this._tile.set(Math.round(e),Math.ceil(e)),this._tileInv.set(1,1).divide(this._tile),this._tilePixelSize.copy(this._tileInv).multiply(this._resolution),this._frameLabels=[],this._count=0,this._labelCount.clear()}reflesh(){this.resize(this._resolution)}resize(e){this._resolution.copy(e)}_onClick(e){if(this._enable){if(this.reflesh(),this._focus===null){let t=new D(this._elm.clientWidth/this._tile.x,this._elm.clientHeight/this._tile.y),n=Math.floor(e.offsetX/t.x)+Math.floor(e.offsetY/t.y)*this._tile.x;n>=0&&n<this._prevFrameLabels.length&&(this._focus=this._prevFrameLabels[n])}this._clear()}}set enable(e){this._enable=e,e?this.reflesh():this._overlay.remove()}get enable(){return this._enable}dispose(){this.emit(`dispose`)}}})))()}var uu,du,fu,pu,mu,hu,gu,_u,vu,yu,bu,xu,Su,Cu;function wu(){return(wu=t((()=>{k(),P(),Li(),su(),lu(),fo(),sc(),uu=`shot <out.png> [--camera <entity> | --from x,y,z --to x,y,z] [--time <秒>] [--view <final|パス名>]`,du=1/60,fu=new WeakMap,pu=(e,t)=>{let n=e[t];if(typeof n!=`string`)throw new R(`--${t} には x,y,z を指定してください。使い方: ${uu}`);let r=n.replace(/^\[(.*)\]$/,`$1`).split(`,`),i=[];for(let e of r){let r=Number(e);if(e.trim()===``||!Number.isFinite(r))throw new R(`--${t} は数値3つで指定してください: ${n}`);i.push(r)}if(i.length!==3)throw new R(`--${t} は数値3つで指定してください: ${n}`);return new D(i[0],i[1],i[2])},mu=(e,t)=>{let n=t.time;if(n===void 0)return e.engine.time.code;let r=Number(n);if(typeof n!=`string`||!Number.isFinite(r))throw new R(`--time は秒の数値で指定してください: ${n}`);return r},hu=e=>{let t=e.view;if(t===void 0)return`final`;if(typeof t!=`string`)throw new R(`--view には final かパス名を指定してください。使い方: ${uu}`);return t},gu=e=>{let t=e.getComponentsByTag(`camera`)[0];return t.displayOut||t.viewPort?null:t},_u=(e,t)=>{let n=t.from!==void 0||t.to!==void 0;if(t.camera!==void 0&&n)throw new R(`--camera と --from / --to は同時に指定できません。使い方: ${uu}`);if(t.camera!==void 0){if(typeof t.camera!=`string`)throw new R(`--camera にはエンティティを指定してください。使い方: ${uu}`);let n=ec(e.engine,t.camera);if(n.getComponentsByTag(`camera`).length===0)throw new R(`カメラのコンポーネントが付いていません: ${$s(n)}`);return{entity:n,description:$s(n),temporary:null,fitAspect:gu(n)}}if(n){let n=pu(t,`from`),r=pu(t,`to`),i=r.clone();if(i.sub(n),i.length()===0)throw new R(`--from と --to が同じ位置です`);let a=e.engine.createEntity({name:`__agentShotCamera`}),o=a.addComponent(Rt);return a.position.copy(n),a.lookAt(r),{entity:a,description:{from:[n.x,n.y,n.z],to:[r.x,r.y,r.z]},temporary:o,fitAspect:null}}let r=au(e.engine.root);if(!r)throw new R(`シーンに displayOut のカメラがありません。--camera か --from / --to を指定してください`);return{entity:null,description:$s(r),temporary:null,fitAspect:null}},vu=(e,t,n)=>{let r=e.entity;e.aspect=t.renderer.resolution.x/t.renderer.resolution.y,e.needsUpdateProjectionMatrix=!0,r.update(n),r.postUpdate(n),r.updateMatrixRecursive(),r.prepareRender(n)},yu=(e,t,n,r)=>{let i=e.createEntityUpdateEvent({...n,timeCode:t,timeCodeFrame:t*60,playing:!1,forceDraw:!0,offline:!0});e.renderer.globalUniforms.uTimePrev.value=e.renderer.globalUniforms.uTime.value,e.renderer.globalUniforms.uTime.value=t,e.renderer.globalUniforms.uTimeF.value=t%1;let a=F.resources.updateEveryFrameTextures;for(let e=0;e<a.length;e++)a[e].render();return r?r.during(()=>e.step(i)):e.step(i),i},bu=class{labels;found;_draw;_view;_target;_name;_counts;constructor(e,t,n,r){this.labels=[],this.found=!1,this._draw=e,this._view=t,this._target=n,this._name=r,this._counts=new Map}during(e){let t=this._draw.onDrawPass((e,t)=>this._push(e,t));try{e()}finally{t()}}_push(e,t){let n=t||String(this.labels.length),r=this._counts.get(n)||0;this._counts.set(n,r+1);let i=n;r>0&&(i=n+`#`+r),this.labels.push(i),!this.found&&i===this._name&&(this._draw.blit(this._view,e,this._target),this.found=!0)}},xu=async(e,t,n)=>{let r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`),a=i.createImageData(t,n),o=t*4;for(let t=0;t<n;t++){let r=(n-1-t)*o;a.data.set(e.subarray(r,r+o),t*o)}for(let e=3;e<a.data.length;e+=4)a.data[e]=255;i.putImageData(a,0,0);let s=await new Promise(e=>r.toBlob(e,`image/png`));if(!s)throw Error(`PNG にエンコードできませんでした`);let c=await new Promise((e,t)=>{let n=new FileReader;n.onload=()=>e(n.result),n.onerror=()=>t(n.error),n.readAsDataURL(s)});return c.slice(c.indexOf(`,`)+1)},Su=async(e,t)=>{lo(t,0,uu);let n=t.options,r=e.engine,i=e.editor.draw,a=n.time!==void 0,o=mu(e,n),s=hu(n),c=_u(e,n),l=r.createView({offscreen:!0});l.camera=c.entity;let u=Math.max(Math.floor(r.renderer.resolution.x),1),d=Math.max(Math.floor(r.renderer.resolution.y),1),f,p=c.fitAspect,m=1;p&&(m=p.aspect),cu.paused=!0;try{p&&(p.aspect=r.renderer.resolution.x/r.renderer.resolution.y,p.needsUpdateProjectionMatrix=!0);let e=null;if(s!==`final`){let t=fu.get(i);t||(t=i.createTarget(),fu.set(i,t)),e=new bu(i,l,t,s)}let t;a?(yu(r,o-du,{timeDelta:du},null),t=yu(r,o,{timeDelta:du},e)):t=yu(r,o,{},e),c.temporary&&vu(c.temporary,r,t),await pn();for(let e=0;e<3;e++)r.render(l);if(e){if(e.during(()=>r.render(l)),!e.found)throw new R(`--view に一致するパスがありません: ${s}（final かパスのラベルを指定してください）`,[`final`,...e.labels]);f=i.readPixels(fu.get(i))}else r.render(l),f=i.readView(l)}catch(e){throw l.dispose(),e}finally{cu.paused=!1,p&&(p.aspect=m,p.needsUpdateProjectionMatrix=!0),c.temporary&&c.temporary.entity.dispose()}let h;try{h=await f}finally{l.dispose()}if(h.length!==u*d*4)throw new R(`読み戻したサイズが描画解像度と一致しません（${h.length} bytes, ${u}x${d}）。撮影中に Screen の大きさが変わった可能性があります。再実行してください`);return{png:await xu(h,u,d),width:u,height:d,view:s,time:o,camera:c.description}},Cu={shot:Su}})))()}var Tu,Eu,Du,Ou,ku,Au,ju;function Mu(){return(Mu=t((()=>{at(),pl(),Sl(),wl(),Fl(),ql(),wu(),Dc(),Tu={...Ec,...Kl,...fl,...Pl},{...xl,...Gl,...dl,...Tu,...Cu},rt.genUUID(),Eu=new URLSearchParams(location.search).has(Cl),Du=2,Ou=null,ku=()=>{},new Promise(e=>{ku=e}),Au=e=>new Promise(t=>{let n=e=>{if(e<=0){t();return}requestAnimationFrame(()=>n(e-1))};n(e)}),ju=e=>{let t={...e,unsaved:!1},n=()=>{t.unsaved=!0},r=()=>{t.unsaved=!1},i=()=>{t.unsaved=!1,Eu&&Au(Du).then(ku)};return e.editor.api.commandManager.on(`change`,n),e.editor.on(`save`,r),e.editor.engine.on(`loaded`,i),Ou=t,()=>{e.editor.api.commandManager.off(`change`,n),e.editor.off(`save`,r),e.editor.engine.off(`loaded`,i),Ou===t&&(Ou=null)}}})))()}var Nu,Pu,Fu,Iu;function Lu(){return(Lu=t((()=>{Nu=class{isEditorFrame=!0;isEditorTarget=!0;size;constructor(e){this.size=e||null}},Pu=class{isEditorRecipe=!0},Fu=class{_resolution;constructor(e){this._resolution=e.resolution.clone()}renderEntities(){}renderFullscreen(){}blit(){}drawToCanvas(){}drawTexture(){}readPixels(e){let t=e.size||this._resolution;return Promise.resolve(new Uint8Array(t.x*t.y*4))}readView(){return Promise.resolve(new Uint8Array(this._resolution.x*this._resolution.y*4))}createTarget(e){return new Nu(e&&e.size)}resize(e){this._resolution.copy(e)}onDrawPass(){return()=>{}}materials={flat:()=>({name:`editorFlat`}),mask:()=>({name:`editorMask`}),grid:()=>({name:`editorGrid`})};recipes={outline:()=>new Pu}},Iu=e=>new Fu(e.renderer)})))()}var Ru;function zu(){return(zu=t((()=>{Ru=class{_engine;constructor(e){this._engine=e}load(){return Promise.resolve({scene:this._engine.createEntity({name:`gltf`})})}}})))()}var Bu;function Vu(){return(Vu=t((()=>{Bu=class{render(){}dispose(){}}})))()}var Hu,Uu,Wu;function Gu(){return(Gu=t((()=>{k(),Et(),Vu(),Hu=class{camera;pipelineOverride;size;constructor(){this.camera=null,this.pipelineOverride=null,this.size=null}dispose(){}},Uu=class extends Tt{canvas;resolution;globalUniforms;constructor(){super(),this.canvas=document.createElement(`canvas`),this.resolution=new D,this.globalUniforms={}}createView(){return new Hu}prepareScene(){}render(){}resize(e){this.resolution.copy(e)}reset(){}compileShaders(){return Promise.resolve()}createTexProcedural(){return new Bu}},Wu=e=>new Uu,Uu.__docgenInfo={description:``,methods:[{name:`createView`,docblock:null,modifiers:[],params:[],returns:{type:{name:`RenderView`}}},{name:`prepareScene`,docblock:null,modifiers:[],params:[],returns:null},{name:`resize`,docblock:null,modifiers:[],params:[{name:`resolution`,optional:!1,type:{name:`MTP.Vector`,alias:`MTP.Vector`}}],returns:null},{name:`reset`,docblock:null,modifiers:[],params:[],returns:null},{name:`compileShaders`,docblock:null,modifiers:[],params:[],returns:{type:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},{name:`createTexProcedural`,docblock:null,modifiers:[],params:[],returns:{type:{name:`TexProcedural`}}}],displayName:`Renderer`}})))()}function Ku(){return(Ku=t((()=>{_n(),Lu(),zu(),Gu()})))()}var qu,Ju;function Yu(){return(Yu=t((()=>{at(),k(),Li(),qu=128,Ju=class extends tt{_draw;_target;_cache;_pending;_canvas2d;_ctx2d;constructor(e){super(),this._draw=e,this._cache=new Map,this._pending=new Set,this._canvas2d=document.createElement(`canvas`),this._canvas2d.width=qu,this._canvas2d.height=qu,this._ctx2d=this._canvas2d.getContext(`2d`),this._target=e.createTarget({size:new D(qu,qu)})}getTexturePreview(e){let t=`tex:`+e,n=this._cache.get(t);if(n)return n;if(this._pending.has(t))return null;let r=F.resources.getTexture(e);return r?(this._pending.add(t),this._draw.drawTexture(r,this._target),this._draw.readPixels(this._target).then(e=>{this._pending.delete(t),this._cache.set(t,this._toDataURL(e)),this.emit(`update`)}),null):null}invalidate(e){this._cache.delete(e)}invalidateAll(){this._cache.clear(),this._pending.clear()}_toDataURL(e){let t=this._ctx2d.createImageData(qu,qu);for(let n=0;n<qu;n++){let r=(127-n)*qu*4,i=n*qu*4;for(let n=0;n<512;n++)t.data[i+n]=e[r+n]}return this._ctx2d.putImageData(t,0,0),this._canvas2d.toDataURL()}dispose(){this._cache.clear(),this._pending.clear(),this.off(`update`)}}})))()}var Xu,Zu;function Qu(){return(Qu=t((()=>{Xu=e=>{let t=e;return t?t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.isContentEditable===!0:!1},Zu=e=>{let t=e=>{Xu(e.target)||e.preventDefault()};return e.addEventListener(`contextmenu`,t),()=>{e.removeEventListener(`contextmenu`,t)}}})))()}var $u,ed,td;function nd(){return(nd=t((()=>{P(),$u={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},ed=1e3,td=class{_draw;_root;_axisEntities;constructor(e,t){this._draw=t,this._root=e.createEntity({name:`__constraint_axis`}),this._root.initiator=`god`,this._axisEntities={x:this._createAxisLine(e,`x`),y:this._createAxisLine(e,`y`),z:this._createAxisLine(e,`z`)},this._root.add(this._axisEntities.x),this._root.add(this._axisEntities.y),this._root.add(this._axisEntities.z)}_createAxisLine(e,t){let n=e.createEntity({name:`__constraint_axis_line`});n.initiator=`god`;let r=t===`x`?[-1,0,0,1,0,0]:t===`y`?[0,-1,0,0,1,0]:[0,0,-1,0,0,1],i=new Ot;return i.setAttribute(`position`,new Float32Array(r),3),i.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),n.addComponent(M,{geometry:i,material:this._draw.materials.flat({color:$u[t],lines:!0,depthTest:!1,depthWrite:!1})}),n}render(e,t,n,r){if(!t||!n)return;let i=n.matrixWorld.elm,a=t.origin.x-i[12],o=t.origin.y-i[13],s=t.origin.z-i[14],c=Math.max(1,Math.sqrt(a*a+o*o+s*s))*ed;this._root.position.copy(t.origin),this._root.quaternion.copy(t.quat),this._root.scale.set(c,c,c),this._root.updateMatrix(!0),this._root.update(r.createEntityUpdateEvent()),this._draw.renderEntities({view:e,camera:n,entities:t.axes.map(e=>this._axisEntities[e]),target:null})}}})))()}var rd;function id(){return(id=t((()=>{at(),rd=class extends tt{_undoStack=[];_redoStack=[];_mergeWindow=500;_lastExecuteTime=0;_lastMergeable=!1;execute(e,t){let n=Date.now(),r=t?.merge??!0;if(r&&this._lastMergeable&&this._undoStack.length>0&&n-this._lastExecuteTime<this._mergeWindow){let t=this._undoStack[this._undoStack.length-1];if(t.mergeWith){let r=t.mergeWith(e);if(r){this._undoStack[this._undoStack.length-1]=r,e.execute(),this._lastExecuteTime=n,this.emit(`change`);return}}}e.execute(),this._undoStack.push(e),this._redoStack=[],this._lastExecuteTime=n,this._lastMergeable=r,this.emit(`change`)}undo(){let e=this._undoStack.pop();e&&(e.undo(),this._redoStack.push(e),this.emit(`change`))}redo(){let e=this._redoStack.pop();e&&(e.execute(),this._undoStack.push(e),this.emit(`change`))}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}clear(){this._undoStack=[],this._redoStack=[],this.emit(`change`)}}})))()}var ad;function od(){return(od=t((()=>{Li(),ad=class{_textureName;_config;name=`AddTexture`;constructor(e,t){this._textureName=e,this._config=t}execute(){F.resources.addTextureResource(this._textureName,this._config)}undo(){F.resources.removeTextureResource(this._textureName)}}})))()}var sd;function cd(){return(cd=t((()=>{sd=(e,t)=>{let n=new Set;for(let t of e.children)n.add(t.name);if(!n.has(t))return t;let r=1;for(;n.has(`${t}.${String(r).padStart(3,`0`)}`);)r++;return`${t}.${String(r).padStart(3,`0`)}`}})))()}var ld;function ud(){return(ud=t((()=>{cd(),ld=class{engine;parent;options;name=`CreateEntity`;entity=null;constructor(e,t,n){this.engine=e,this.parent=t,this.options=n}execute(){if(!this.entity){this.entity=this.engine.createEntity({name:sd(this.parent,this.options.name)}),this.entity.initiator=`user`,this.options.position&&this.entity.position.setFromArray(this.options.position);for(let e of this.options.components){let t=this.entity.addComponent(e);t.initiator=`user`}}this.parent.add(this.entity)}undo(){this.entity&&this.entity.parent&&this.entity.parent.remove(this.entity)}get createdEntity(){return this.entity}}})))()}var dd;function fd(){return(fd=t((()=>{dd=class{entity;name=`DeleteEntity`;parent=null;constructor(e){this.entity=e}execute(){this.parent=this.entity.parent,this.parent&&this.parent.remove(this.entity)}undo(){this.parent&&this.parent.add(this.entity)}}})))()}var pd,md;function hd(){return(hd=t((()=>{P(),cd(),pd=/\.\d{3}$/,md=class{engine;parent;source;name=`DuplicateEntity`;entity=null;constructor(e,t,n){this.engine=e,this.parent=t,this.source=n}execute(){if(!this.entity){this.entity=nn(this.engine,this.source);let e=this.source.name.replace(pd,``);this.entity.name=sd(this.parent,e)}this.parent.add(this.entity)}undo(){this.entity&&this.entity.parent&&this.entity.parent.remove(this.entity)}get duplicatedEntity(){return this.entity}}})))()}var gd;function _d(){return(_d=t((()=>{gd=class{entity;componentClass;component;name=`RemoveComponent`;snapshot=null;constructor(e,t,n){this.entity=e,this.componentClass=t,this.component=n}execute(){this.snapshot=this.component.serialize(),this.entity.removeComponent(this.componentClass)}undo(){let e=this.entity.addComponent(this.componentClass);e.initiator=`user`,this.snapshot&&e.deserialize(this.snapshot),this.component=e}}})))()}var vd;function yd(){return(yd=t((()=>{Li(),vd=class{_textureName;name=`RemoveTexture`;_snapshot=null;constructor(e){this._textureName=e}execute(){let e=F.resources.getTextureResource(this._textureName);e&&(this._snapshot=e.serialize({mode:`export`})),F.resources.removeTextureResource(this._textureName)}undo(){this._snapshot&&F.resources.addTextureResource(this._textureName,this._snapshot)}}})))()}function bd(e,t){let n=e.clone().normalize(),r=Math.sin(t/2),i=new Oe;return i.set(n.x*r,n.y*r,n.z*r,Math.cos(t/2)),i}function xd(e,t){let n=e.clone().normalize(),r=t.clone().normalize(),i=n.dot(r);if(i>.99999)return new Oe;if(i<-.99999){let e=Math.abs(n.x)>.9?new D(0,1,0):new D(1,0,0);return bd(n.clone().cross(e),Math.PI)}return bd(n.clone().cross(r),Math.acos(Math.min(1,Math.max(-1,i))))}function Sd(e){return Td(e.matrixWorld).quaternion}function Cd(e,t){return e.clone().applyMatrix4AsDirection(new O().applyQuaternion(t))}function wd(e,t,n){let r=new D(+(t===`x`),+(t===`y`),+(t===`z`));return n===`global`?r:Cd(r,e).normalize()}function Td(e){let t=e.elm,n=Math.hypot(t[0],t[1],t[2]),r=Math.hypot(t[4],t[5],t[6]),i=Math.hypot(t[8],t[9],t[10]);t[0]*(t[5]*t[10]-t[6]*t[9])+t[1]*(t[6]*t[8]-t[4]*t[10])+t[2]*(t[4]*t[9]-t[5]*t[8])<0&&(n=-n);let a=new O,o=[n,r,i];for(let e=0;e<3;e++){let n=o[e];n===0&&(n=1);for(let r=0;r<3;r++)a.elm[e*4+r]=t[e*4+r]/n}return{position:new D(t[12],t[13],t[14]),quaternion:new Oe().setFromMatrix(a),scale:new D(n,r,i)}}function Ed(e,t,n){return e.clone().multiply(t.clone().multiply(n))}function Dd(e,t,n){let r=e.origin.clone().sub(t),i=e.direction.dot(n),a=r.dot(n),o=r.dot(e.direction),s=1-i*i+1e-4;return a+(a*i-o)/s*i}function Od(e,t,n){let r=e.direction.dot(n);if(Math.abs(r)<1e-4)return null;let i=t.clone().sub(e.origin).dot(n)/r;return e.origin.clone().add(e.direction.clone().multiply(i))}function kd(){return(kd=t((()=>{k()})))()}var Ad,jd,Md;function Nd(){return(Nd=t((()=>{k(),cd(),kd(),Ad=class{entity;parent;name=`ReparentEntity`;oldParent=null;oldState=null;newState=null;constructor(e,t){this.entity=e,this.parent=t}execute(){this.newState||=(this.oldParent=this.entity.parent,this.oldState=jd(this.entity),this.computeNewState()),this.parent.add(this.entity),Md(this.entity,this.newState)}undo(){!this.oldParent||!this.oldState||(this.oldParent.add(this.entity),Md(this.entity,this.oldState))}computeNewState(){this.entity.updateMatrix(!0),this.parent.updateMatrix(!0);let{position:e,quaternion:t,scale:n}=Td(this.entity.matrixWorld.clone().preMultiply(this.parent.matrixWorld.clone().inverse())),r=new Ee().setFromQuaternion(t);return{name:sd(this.parent,this.entity.name),position:[e.x,e.y,e.z],euler:[r.x,r.y,r.z],scale:[n.x,n.y,n.z]}}},jd=e=>({name:e.name,position:e.position.getElm(`vec3`),euler:e.euler.getElm(`vec3`),scale:e.scale.getElm(`vec3`)}),Md=(e,t)=>{e.setField(`name`,t.name),e.setField(`position`,t.position),e.setField(`euler`,t.euler),e.setField(`scale`,t.scale)}})))()}var Pd,Fd;function Id(){return(Id=t((()=>{Li(),id(),ds(),od(),ud(),fd(),hd(),_o(),_d(),yd(),Nd(),yo(),Qs(),Pd=e=>{let t=e;for(;t;){if(t.editorHidden)return!0;t=t.parent}return!1},Fd=class{_commandManager;_editor;constructor(e){this._editor=e,this._commandManager=new rd}setField(e,t,n,r){let i=e.getField(t);this._commandManager.execute(new vo(e,t,i,n),r)}beginEdit(e,t){let n=e.getField(t),r=!1;return{set:n=>{e.setField(t,n),r=!0},commit:()=>{if(!r)return;let i=e.getField(t);this._commandManager.execute(new vo(e,t,n,i),{merge:!1})},cancel:()=>{r&&e.setField(t,n)}}}createEntity(e,t){let n=new ld(this._editor.engine,e,t);return this._commandManager.execute(n),n.createdEntity}deleteEntities(e){let t=[];for(let n of e)t.push(new dd(n));this._commandManager.execute(new go(t))}duplicateEntities(e){let t=[];for(let n of e){let e=n.parent;if(!e)throw Error(`Entity has no parent: ${n.name}`);t.push(new md(this._editor.engine,e,n))}this._commandManager.execute(new go(t));let n=[];for(let e of t)n.push(e.duplicatedEntity);return n}reparentEntities(e,t){let n=this.getReparentError(e,t);if(n)throw Error(n);let r=[];for(let n of e)n.parent!==t&&r.push(new Ad(n,t));r.length!==0&&this._commandManager.execute(new go(r),{merge:!1})}getReparentError(e,t){let n=this._editor.engine.root;if(e.length===0)return`移すエンティティがありません`;if(t.getRootEntity()!==n)return`${t.name} はシーンの中にありません`;if(t.initiator===`script`)return`${t.name} はスクリプト（BLidge / glb 等）が生成したエンティティなので、子を入れられません`;if(Pd(t))return`${t.name} は Cloner の複製なので、子を入れられません`;for(let r of e){if(r===n||!r.parent)return`root は移せません`;if(r.getRootEntity()!==n)return`${r.name} はシーンの中にありません`;if(r.initiator!==`user`)return`${r.name} はスクリプト（BLidge / glb 等）が生成したエンティティなので移せません`;if(Pd(r))return`${r.name} は Cloner の複製なので移せません`;let e=t;for(;e;){if(e===r)return`${r.name} を自分自身か自分の子孫の下へは移せません`;e=e.parent}}return null}selectEntity(e){this._editor.selectEntity(e)}addComponent(e,t){let n=new us(e,t);return this._commandManager.execute(n),n.instance}removeComponent(e,t,n){this._commandManager.execute(new gd(e,t,n))}insertKeys(e){let t=this._editor.engine;this._commandManager.execute(ks(t,e,hs(t)),{merge:!1})}deleteKeys(e){let t=this._editor.engine,n=As(t,e,hs(t));n&&this._commandManager.execute(n,{merge:!1})}setCurves(e){this._commandManager.execute(Xs(this._editor.engine,e),{merge:!1})}pasteCurve(e,t,n){let r=Gs(this._editor.engine,e,t,n);r&&this._commandManager.execute(r,{merge:!1})}unlinkCurve(e){this._commandManager.execute(Ks(this._editor.engine,e),{merge:!1})}setCurveLinkSettings(e,t){let n=qs(this._editor.engine,e,t);n&&this._commandManager.execute(n,{merge:!1})}addTexture(e,t){this._commandManager.execute(new ad(e,t))}removeTexture(e){this._commandManager.execute(new vd(e))}updateTexture(e,t){let n=F.resources.getTextureResource(e);if(!n)throw Error(`Texture not found: ${e}`);let r=Object.keys(t);for(let e of r){let r=n.getField(e);this._commandManager.execute(new vo(n,e,r,t[e]))}}undo(){this._commandManager.undo()}redo(){this._commandManager.redo()}get canUndo(){return this._commandManager.canUndo}get canRedo(){return this._commandManager.canRedo}get commandManager(){return this._commandManager}dispose(){this._commandManager.clear()}}})))()}var Ld,Rd,zd,Bd,Vd,Hd,Ud,Wd;function Gd(){return(Gd=t((()=>{k(),P(),kd(),Ld={x:[1,.2,.2],y:[.2,1,.2],z:[.4,.4,1]},Rd={xy:`z`,yz:`x`,xz:`y`},zd={xy:[`x`,`y`],yz:[`y`,`z`],xz:[`x`,`z`]},Bd=[.75,.75,.75],Vd=[1,.95,.4],Hd=.45,Ud=.18,Wd=class e{static VIEW_HEIGHT_RATIO=1/6;entity;_engine;_draw;_orientation;_targetQuat;_camWorldPos;_records;_hoverHandle;_activeHandle;_dragging;constructor(e,t,n){this._engine=e,this._draw=t,this.entity=e.createEntity({name:n}),this.entity.initiator=`god`,this.entity.visible=!1,this._orientation=`global`,this._targetQuat=new Oe,this._camWorldPos=new D,this._records=[],this._hoverHandle=null,this._activeHandle=null,this._dragging=!1}_createEntity(e){let t=this._engine.createEntity({name:e});return t.initiator=`god`,t}_registerHandle(e,t,n){let r=[...n];return this._records.push({handle:e,root:t,color:r,baseColor:[...n]}),this.entity.add(t),r}_addVisual(e,t,n){let r=this._createEntity(`__gizmo_visual`);return r.addComponent(M,{geometry:t,material:this._draw.materials.flat({color:n,depthTest:!1,depthWrite:!1})}),e.add(r),r}_addHit(e,t){let n=this._createEntity(`__gizmo_hit`);return n.addComponent(M,{geometry:t}),e.add(n),n}_addPlaneHandle(e){let t=this._createEntity(`__gizmo_plane_`+e),n=this._registerHandle(e,t,Ld[Rd[e]]);return this._addVisual(t,new Pt({width:Ud,height:Ud}),n),this._addHit(t,new Pt({width:Ud*1.6,height:Ud*1.6})),e===`yz`?(t.euler.set(0,Math.PI/2,0),t.position.set(0,Hd,Hd)):e===`xz`?(t.euler.set(Math.PI/2,0,0),t.position.set(Hd,0,Hd)):t.position.set(Hd,Hd,0),t}_addCenterHandle(){let e=this._createEntity(`__gizmo_center`),t=this._registerHandle(`center`,e,Bd);return this._addVisual(e,new en({innerRadius:.1,outerRadius:.14,thetaSegments:24}),t),this._addHit(e,new It({radius:.16,widthSegments:8,heightSegments:6})),e}setHover(e){this._hoverHandle!==e&&(this._hoverHandle=e,this._updateColors())}_updateColors(){let e=this._dragging?this._activeHandle:this._hoverHandle;for(let t of this._records){let n=t.handle===e?Vd:t.baseColor;t.color[0]=n[0],t.color[1]=n[1],t.color[2]=n[2]}}getHandleEntities(){let e=[];for(let t of this._records)t.root.traverse(n=>{let r=n.getComponent(M);r&&!r.material&&e.push({handle:t.handle,entity:n})});return e}setTarget(t,n,r){if(this._orientation=r,!t){this.entity.visible=!1;return}if(this._targetQuat.copy(t.quaternion),this.entity.visible=!0,this.entity.quaternion.copy(this._rootQuaternion(r)),this.entity.position.copy(t.position),n){let t=n.matrixWorld.elm;this._camWorldPos.set(t[12],t[13],t[14]);let r=n.getComponentsByTag(`camera`)[0];if(r){let t=r.orthHeight;r.cameraType===`perspective`&&(t=2*this._camWorldPos.distanceTo(this.entity.position)*Math.tan(r.fov*Math.PI/360));let n=Math.max(.01,t*e.VIEW_HEIGHT_RATIO);this.entity.scale.set(n,n,n)}}this._onTargetUpdated()}_rootQuaternion(e){return e===`local`?this._targetQuat.clone():new Oe}_axisWorldDir(e,t){return wd(this._targetQuat,e,t)}_onTargetUpdated(){}_camDirLocal(){return Cd(this._camWorldPos.clone().sub(this.entity.position).normalize(),this.entity.quaternion.clone().inverse()).normalize()}_billboardQuat(){return xd(new D(0,0,1),this._camDirLocal())}get activeHandle(){return this._activeHandle}get dragging(){return this._dragging}startDrag(e,t){this._activeHandle=e,this._dragging=!0,this._updateColors(),this._onStartDrag(e,t)}endDrag(){this._activeHandle=null,this._dragging=!1,this._updateColors()}}})))()}function Kd(e,t,n){let r=[],i=[],a=[],o=[];for(let s=0;s<=n;s++){let c=-Math.PI/2+s/n*Math.PI,l=Math.cos(c),u=Math.sin(c);if(r.push(l*e,u*e,0),r.push(l*t,u*t,0),i.push(0,0,1,0,0,1),a.push(s/n,0,s/n,1),s<n){let e=s*2;o.push(e,e+1,e+2,e+1,e+3,e+2)}}let s=new Ot;return s.setAttribute(`position`,new Float32Array(r),3),s.setAttribute(`normal`,new Float32Array(i),3),s.setAttribute(`uv`,new Float32Array(a),2),s.setAttribute(`index`,new Uint16Array(o),1),s}var qd,Jd;function Yd(){return(Yd=t((()=>{k(),P(),kd(),Gd(),qd=[`x`,`y`,`z`],Jd=class extends Wd{_rings;_viewRoot;_dragCenter;_dragViewNormal;_dragU;_dragV;_dragAxisN;_dragSign;_dragLastAngle;_dragAccumAngle;constructor(e,t){super(e,t,`__gizmo_rotate`),this._dragCenter=new D,this._dragViewNormal=new D(0,0,1),this._dragU=new D(1,0,0),this._dragV=new D(0,1,0),this._dragAxisN=new D(0,0,1),this._dragSign=1,this._dragLastAngle=0,this._dragAccumAngle=0;let n={x:bd(new D(0,1,0),Math.PI/2),y:bd(new D(1,0,0),-Math.PI/2),z:new Oe};this._rings={};for(let e of qd){let t=this._createEntity(`__gizmo_ring_`+e),r=this._registerHandle(e,t,Ld[e]);this._addVisual(t,Kd(.75,.8,48),r),this._addHit(t,Kd(.6,.95,24)),this._rings[e]={wrapper:t,base:n[e],baseInv:n[e].clone().inverse()}}this._viewRoot=this._createEntity(`__gizmo_ring_view`);let r=this._registerHandle(`view`,this._viewRoot,Bd);this._addVisual(this._viewRoot,new en({innerRadius:1,outerRadius:1.05,thetaSegments:64}),r),this._addHit(this._viewRoot,new en({innerRadius:.92,outerRadius:1.13,thetaSegments:32}))}_onTargetUpdated(){let e=this._camDirLocal();for(let t of qd){let n=this._rings[t],r=Cd(e,n.baseInv),i=Math.atan2(r.y,r.x);n.wrapper.quaternion.copy(n.base.clone().multiply(bd(new D(0,0,1),i)))}this._viewRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t){this._dragCenter.copy(this.entity.position);let n=t.origin.clone().sub(this._dragCenter).normalize(),r=Math.abs(n.y)>.99?new D(1,0,0):new D(0,1,0);this._dragViewNormal=n,this._dragU=r.cross(n).normalize(),this._dragV=n.clone().cross(this._dragU).normalize(),e===`view`?(this._dragAxisN=n.clone(),this._dragSign=1):(this._dragAxisN=this._axisWorldDir(e,this._orientation),this._dragSign=this._dragAxisN.dot(n)<0?-1:1),this._dragLastAngle=this._angleFromRay(t)??0,this._dragAccumAngle=0}updateDrag(e){if(!this.dragging||!this.activeHandle)return null;let t=this._angleFromRay(e);if(t===null)return null;let n=t-this._dragLastAngle;return n>Math.PI?n-=Math.PI*2:n<-Math.PI&&(n+=Math.PI*2),this._dragAccumAngle+=n,this._dragLastAngle=t,{rotate:bd(this._dragAxisN,this._dragAccumAngle*this._dragSign)}}_angleFromRay(e){let t=Od(e,this._dragCenter,this._dragViewNormal);if(!t)return null;let n=t.sub(this._dragCenter);return Math.atan2(n.dot(this._dragV),n.dot(this._dragU))}}})))()}var Xd,Zd,Qd,$d,ef,tf,nf;function rf(){return(rf=t((()=>{k(),P(),kd(),Gd(),Xd=.02,Zd=.1,Qd=.001,$d=1e-4,ef=[`x`,`y`,`z`],tf=[`xy`,`yz`,`xz`],nf=class extends Wd{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartAmount;_dragPlaneNormal;constructor(e,t){super(e,t,`__gizmo_scale`),this._dragStartPos=new D,this._dragAxisDir=new D(1,0,0),this._dragStartAmount=1,this._dragPlaneNormal=new D(0,0,1);for(let e of ef)this._addAxisHandle(e);for(let e of tf)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addAxisHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,Ld[e]),r=.6,i=this._addVisual(t,new Mt({radiusTop:Xd,radiusBottom:Xd,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new At({width:Zd,height:Zd,depth:Zd}),n);a.position.set(0,.9,0),this._addHit(t,new Mt({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new At({width:Zd*2,height:Zd*2,depth:Zd*2})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_rootQuaternion(e){return this._targetQuat.clone()}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t){if(this._dragStartPos.copy(this.entity.position),e===`x`||e===`y`||e===`z`){this._dragAxisDir=this._axisWorldDir(e,`local`);let n=Dd(t,this._dragStartPos,this._dragAxisDir);this._dragStartAmount=Math.abs(n)<$d?$d:n;return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():this._axisWorldDir(Rd[e],`local`);let n=Od(t,this._dragStartPos,this._dragPlaneNormal),r=n?n.sub(this._dragStartPos).length():0;this._dragStartAmount=Math.max($d,r)}updateDrag(e){if(!this.dragging||!this.activeHandle)return null;let t=this.activeHandle,n;if(t===`x`||t===`y`||t===`z`)n=Dd(e,this._dragStartPos,this._dragAxisDir)/this._dragStartAmount;else{let t=Od(e,this._dragStartPos,this._dragPlaneNormal);if(!t)return null;n=t.sub(this._dragStartPos).length()/this._dragStartAmount}Math.abs(n)<Qd&&(n=n<0?-.001:Qd);let r={x:!1,y:!1,z:!1};if(t===`center`)r.x=r.y=r.z=!0;else if(t===`x`||t===`y`||t===`z`)r[t]=!0;else for(let e of zd[t])r[e]=!0;let i=[];for(let e of ef)r[e]?i.push(n):i.push(1);return{scale:i}}}})))()}var af,of,sf,cf,lf,uf;function df(){return(df=t((()=>{k(),P(),kd(),Gd(),af=.02,of=.22,sf=.06,cf=[`x`,`y`,`z`],lf=[`xy`,`yz`,`xz`],uf=class extends Wd{_centerRoot;_dragStartPos;_dragAxisDir;_dragStartProjection;_dragPlaneNormal;_dragPlaneStart;constructor(e,t){super(e,t,`__gizmo_translate`),this._dragStartPos=new D,this._dragAxisDir=new D(1,0,0),this._dragStartProjection=0,this._dragPlaneNormal=new D(0,0,1),this._dragPlaneStart=null;for(let e of cf)this._addArrowHandle(e);for(let e of lf)this._addPlaneHandle(e);this._centerRoot=this._addCenterHandle()}_addArrowHandle(e){let t=this._createEntity(`__gizmo_axis_`+e),n=this._registerHandle(e,t,Ld[e]),r=.6,i=this._addVisual(t,new Mt({radiusTop:af,radiusBottom:af,height:r,radSegments:8,heightSegments:1,caps:!1}),n);i.position.set(0,.55,0);let a=this._addVisual(t,new Mt({radiusTop:.001,radiusBottom:sf,height:of,radSegments:8,heightSegments:1,caps:!0}),n);a.position.set(0,.96,0),this._addHit(t,new Mt({radiusTop:.07,radiusBottom:.07,height:r,radSegments:6,heightSegments:1,caps:!0})).position.copy(i.position),this._addHit(t,new Mt({radiusTop:.001,radiusBottom:.11,height:of*1.5,radSegments:6,heightSegments:1,caps:!0})).position.copy(a.position),e===`x`?t.euler.set(0,0,-Math.PI/2):e===`z`&&t.euler.set(Math.PI/2,0,0)}_onTargetUpdated(){this._centerRoot.quaternion.copy(this._billboardQuat())}_onStartDrag(e,t){if(this._dragStartPos.copy(this.entity.position),this._dragPlaneStart=null,e===`x`||e===`y`||e===`z`){this._dragAxisDir=this._axisWorldDir(e,this._orientation),this._dragStartProjection=Dd(t,this._dragStartPos,this._dragAxisDir);return}this._dragPlaneNormal=e===`center`?t.origin.clone().sub(this._dragStartPos).normalize():this._axisWorldDir(Rd[e],this._orientation),this._dragPlaneStart=Od(t,this._dragStartPos,this._dragPlaneNormal)}updateDrag(e){if(!this.dragging||!this.activeHandle)return null;let t=this.activeHandle;if(t===`x`||t===`y`||t===`z`){let t=Dd(e,this._dragStartPos,this._dragAxisDir)-this._dragStartProjection;return{translate:this._dragAxisDir.clone().multiply(t)}}if(!this._dragPlaneStart)return null;let n=Od(e,this._dragStartPos,this._dragPlaneNormal);return n?{translate:n.sub(this._dragPlaneStart)}:null}}})))()}var ff;function pf(){return(pf=t((()=>{P(),Yd(),rf(),df(),ff=class{_draw;_translateGizmo;_rotateGizmo;_scaleGizmo;_activeGizmo;_mode;_orientation;constructor(e,t){this._draw=t,this._translateGizmo=new uf(e,t),this._rotateGizmo=new Jd(e,t),this._scaleGizmo=new nf(e,t),this._mode=`select`,this._orientation=`global`,this._activeGizmo=null}get activeGizmo(){return this._activeGizmo}get mode(){return this._mode}setMode(e){this._mode=e,this._activeGizmo&&this._activeGizmo.setHover(null),this._activeGizmo=e===`translate`?this._translateGizmo:e===`rotate`?this._rotateGizmo:e===`scale`?this._scaleGizmo:null}get orientation(){return this._orientation}setOrientation(e){this._orientation=e}render(e,t,n,r){if(this._translateGizmo.entity.visible=!1,this._rotateGizmo.entity.visible=!1,this._scaleGizmo.entity.visible=!1,!this._activeGizmo||(this._activeGizmo.setTarget(t,n,this._orientation),!this._activeGizmo.entity.visible))return;this._activeGizmo.entity.updateMatrix(!0);let i=r.createEntityUpdateEvent();if(this._activeGizmo.entity.update(i),!n)return;let a=[];this._activeGizmo.entity.traverse(e=>{let t=e.getComponent(M);t&&t.material&&a.push(e)}),a.length>0&&this._draw.renderEntities({view:e,camera:n,entities:a,target:null})}}})))()}var mf;function hf(){return(hf=t((()=>{P(),mf=class{_draw;_entity;_color;_params;constructor(e,t){this._draw=t,this._color=[.35,.35,.35],this._params=[1,1,100],this._entity=e.createEntity({name:`__grid`}),this._entity.initiator=`god`,this._entity.addComponent(M,{geometry:new Pt({floor:!0}),material:t.materials.grid({color:this._color,params:this._params})})}render(e,t,n){if(!t)return;let r=t.matrixWorld.elm,i=Math.max(Math.abs(r[13]),.5),a=Math.max(0,Math.floor(Math.log10(i)));this._params[0]=10**a,this._params[1]=1-Math.max(0,Math.log10(i)-a),this._params[2]=Math.max(50,i*30),this._entity.position.set(r[12],0,r[14]),this._entity.scale.set(this._params[2]*2,1,this._params[2]*2),this._entity.update(n.createEntityUpdateEvent()),this._draw.renderEntities({view:e,camera:t,entities:[this._entity],target:null})}}})))()}var gf,_f;function vf(){return(vf=t((()=>{gf=[1,.6,0],_f=[.85,.3,0]})))()}var yf;function bf(){return(bf=t((()=>{P(),yf=class extends Ot{constructor(){super(),this.update(50,1,.1,10)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,a,-n,o,-a,-n,o,-a,-n,-o,-a,-n,-o,-a,-n,-o,a,-n,-c,s,-r,c,s,-r,c,s,-r,c,-s,-r,c,-s,-r,-c,-s,-r,-c,-s,-r,-c,s,-r,-o,a,-n,-c,s,-r,o,a,-n,c,s,-r,o,-a,-n,c,-s,-r,-o,-a,-n,-c,-s,-r]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.requestUpdate()}}})))()}var xf;function Sf(){return(Sf=t((()=>{P(),xf=class extends Ot{constructor(){super(),this.update(50,1,.1,2)}update(e,t,n,r){let i=e*Math.PI/180,a=Math.tan(i/2)*n,o=a*t,s=Math.tan(i/2)*r,c=s*t,l=new Float32Array([-o,a,-n,o,a,-n,o,-a,-n,-o,-a,-n,-c,s,-r,c,s,-r,c,-s,-r,-c,-s,-r]),u=new Uint16Array([0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,3,6,2,3,7,6,0,4,7,0,7,3,1,2,6,1,6,5]);this.setAttribute(`position`,l,3),this.setAttribute(`normal`,new Float32Array(l.length).fill(0),3),this.setAttribute(`index`,u,1),this.requestUpdate()}}})))()}var Cf;function wf(){return(wf=t((()=>{P(),Cf=class extends Ot{constructor(e=.5){super();let t=[];for(let n=0;n<16;n++){let r=n/16*Math.PI*2,i=(n+1)/16*Math.PI*2;t.push(Math.cos(r)*e,Math.sin(r)*e,0,Math.cos(i)*e,Math.sin(i)*e,0)}let n=e*2;for(let r=0;r<4;r++){let i=r/4*Math.PI*2,a=Math.cos(i)*e*.5,o=Math.sin(i)*e*.5;t.push(a,o,0,a,o,-n)}let r=new Float32Array(t);this.setAttribute(`position`,r,3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3)}}})))()}var Tf;function Ef(){return(Ef=t((()=>{P(),Tf=class extends Ot{constructor(e=.5){super();let t=e*2,n=[],r=[];n.push(0,0,0);for(let t=0;t<12;t++){let r=t/12*Math.PI*2;n.push(Math.cos(r)*e,Math.sin(r)*e,0)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(0,e+1,t+1)}n.push(0,0,-t);for(let r=0;r<12;r++){let i=r/12*Math.PI*2;n.push(Math.cos(i)*e,Math.sin(i)*e,-t)}for(let e=0;e<12;e++){let t=(e+1)%12;r.push(13,13+t+1,13+e+1)}for(let e=0;e<12;e++){let t=(e+1)%12,n=e+1,i=t+1,a=13+e+1,o=13+t+1;r.push(n,a,o),r.push(n,o,i)}this.setAttribute(`position`,new Float32Array(n),3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(r),1)}}})))()}var Df;function Of(){return(Of=t((()=>{P(),Df=class extends Ot{constructor(e=.3){super();let t=e/2,n=new Float32Array([-t,0,0,t,0,0,0,-t,0,0,t,0,0,0,-t,0,0,t]);this.setAttribute(`position`,n,3),this.setAttribute(`normal`,new Float32Array(n.length).fill(0),3)}}})))()}var kf;function Af(){return(Af=t((()=>{P(),kf=class extends Ot{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[];for(let e=0;e<16;e++){let i=e/16*Math.PI*2,a=(e+1)/16*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t,Math.cos(a)*n,Math.sin(a)*n,-t)}for(let e=0;e<4;e++){let i=e/4*Math.PI*2;r.push(0,0,0,Math.cos(i)*n,Math.sin(i)*n,-t)}let i=new Float32Array(r);this.setAttribute(`position`,i,3),this.setAttribute(`normal`,new Float32Array(i.length).fill(0),3),this.requestUpdate()}}})))()}var jf;function Mf(){return(Mf=t((()=>{P(),jf=class extends Ot{constructor(){super(),this.update(Math.PI/4,5)}update(e,t){let n=Math.tan(e/2)*t,r=[0,0,0];for(let e=0;e<12;e++){let i=e/12*Math.PI*2;r.push(Math.cos(i)*n,Math.sin(i)*n,-t)}let i=[];for(let e=0;e<12;e++){let t=(e+1)%12;i.push(0,e+1,t+1)}for(let e=1;e<11;e++)i.push(1,e+2,e+1);this.setAttribute(`position`,new Float32Array(r),3),this.setAttribute(`normal`,new Float32Array(r.length).fill(0),3),this.setAttribute(`index`,new Uint16Array(i),1),this.requestUpdate()}}})))()}var Nf;function Pf(){return(Pf=t((()=>{k(),P(),vf(),bf(),Sf(),wf(),Ef(),Of(),Af(),Mf(),Nf=class{entity;hitAreaEntity;type;targetEntityUUID;_geometry;_hitAreaGeometry;_matrixOffset;_baseColor;_colorUniform;constructor(e,t,n,r){this.type=n,this.targetEntityUUID=r,this.entity=e.createEntity({name:`__helper`}),this.entity.initiator=`god`;let i=this._getColor();this._baseColor=i,this._colorUniform=[...i];let a=t.materials.flat({color:this._colorUniform,lines:!0});this._geometry=this._createGeometry(),this.entity.addComponent(M,{geometry:this._geometry,material:a}),this._hitAreaGeometry=this._createHitAreaGeometry(),this.hitAreaEntity=e.createEntity({name:`__helper_hit`}),this.hitAreaEntity.initiator=`god`,this._hitAreaGeometry&&this.hitAreaEntity.addComponent(M,{geometry:this._hitAreaGeometry}),this._matrixOffset=n===`spotLight`||n===`directionalLight`?new Oe().setFromEuler({x:-Math.PI/2,y:0,z:0}):null}_getColor(){switch(this.type){case`empty`:return[.8,.5,.2];case`camera`:return[.6,.8,1];case`spotLight`:return[1,.9,.4];case`directionalLight`:return[1,.9,.4]}}_createGeometry(){switch(this.type){case`empty`:return new Df;case`camera`:return new yf;case`spotLight`:return new kf;case`directionalLight`:return new Cf}}_createHitAreaGeometry(){switch(this.type){case`empty`:return null;case`camera`:return new xf;case`spotLight`:return new jf;case`directionalLight`:return new Tf}}getWorldSegments(){let e=this._geometry.getAttribute(`position`);if(!e)return[];let t=e.array,n=[];for(let e=0;e+5<t.length;e+=6)n.push({a:new D(t[e+0],t[e+1],t[e+2]).applyMatrix4AsPosition(this.entity.matrixWorld),b:new D(t[e+3],t[e+4],t[e+5]).applyMatrix4AsPosition(this.entity.matrixWorld)});return n}setSelection(e){let t=this._baseColor;e===`active`?t=gf:e===`selected`&&(t=_f),this._colorUniform[0]=t[0],this._colorUniform[1]=t[1],this._colorUniform[2]=t[2]}syncTransform(e){if(this.entity.matrixWorld.copy(e.matrixWorld),this.hitAreaEntity.matrixWorld.copy(e.matrixWorld),this._matrixOffset&&(this.entity.matrixWorld.applyQuaternion(this._matrixOffset),this.hitAreaEntity.matrixWorld.applyQuaternion(this._matrixOffset)),this.type===`camera`){let t=e.getComponentsByTag(`camera`)[0];t&&(this._geometry instanceof yf&&this._geometry.update(t.fov,t.aspect,.1,2),this._hitAreaGeometry instanceof xf&&this._hitAreaGeometry.update(t.fov,t.aspect,.1,2))}else if(this.type===`spotLight`){let t=e.getComponent(Ht);if(t){let e=Math.min(t.distance,10);this._geometry instanceof kf&&this._geometry.update(t.angle,e),this._hitAreaGeometry instanceof jf&&this._hitAreaGeometry.update(t.angle,e)}}}}})))()}var Ff;function If(){return(If=t((()=>{P(),Pf(),Ff=class{_engine;_draw;_helpers;constructor(e,t){this._engine=e,this._draw=t,this._helpers=new Map}sync(e,t,n){let r=new Set;e.root.traverseEditable(i=>{if(i.initiator===`god`||!i.visible)return;let a=this._getHelperType(i);if(!a)return;r.add(i.uuid);let o=this._helpers.get(i.uuid);o||(o=new Nf(this._engine,this._draw,a,i.uuid),this._helpers.set(i.uuid,o));let s=e.createEntityUpdateEvent();o.entity.update(s),o.hitAreaEntity.update(s);let c=`none`;i.uuid===n?c=`active`:t.has(i.uuid)&&(c=`selected`),o.setSelection(c),o.syncTransform(i)}),this._helpers.forEach((e,t)=>{r.has(t)||this._helpers.delete(t)})}render(e,t,n){if(!t)return;let r=[];for(let e of this._helpers.values())this.isVisible(e,n)&&e.targetEntityUUID!==t.uuid&&e.entity.traverse(e=>{e.getComponent(M)&&r.push(e)});r.length>0&&this._draw.renderEntities({view:e,camera:t,entities:r,target:null})}getHelpers(){return Array.from(this._helpers.values())}isVisible(e,t){if(!t.show)return!1;switch(e.type){case`empty`:return t.empty;case`camera`:return t.camera;case`spotLight`:case`directionalLight`:return t.light}}_getHelperType(e){let t=e.getComponent(Ht);return t?t.lightType===`spot`?`spotLight`:`directionalLight`:e.getComponentsByTag(`camera`)[0]?`camera`:e.getComponent(M)?null:`empty`}}})))()}var Lf,Rf,zf;function Bf(){return(Bf=t((()=>{zi(),Lf=[{code:`Numpad1`,key:`1`,axis:`front`},{code:`Numpad3`,key:`3`,axis:`right`},{code:`Numpad7`,key:`7`,axis:`top`}],Rf=()=>{let e=document.activeElement;return e?e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.isContentEditable:!1},zf=class{_keyboard;constructor(e){this._keyboard=new Ri,this._keyboard.on(`keydown`,(t,n)=>{if(t.isComposing)return;let r=n.Meta||n.Control;if(r&&n.s&&(t.preventDefault(),e.onSave()),!Rf()&&!e.onTransformKey(t)){r&&n.z&&(t.preventDefault(),n.Shift?e.onRedo():e.onUndo()),r&&t.code===`KeyC`&&e.onCopy(),r&&t.code===`KeyV`&&e.onPaste(),t.code===`KeyB`&&!r&&!t.altKey&&!n.Shift&&e.onBoxSelect(),t.code===`KeyA`&&!r&&!n.Shift&&e.onSelectAll(!t.altKey),t.key===`Home`&&!r&&e.onFrameAll(),t.code===`KeyW`&&!r&&!t.altKey&&!n.Shift&&e.onContextMenu(),t.code===`KeyI`&&!r&&!n.Shift&&(t.preventDefault(),e.onInsertKey(t.altKey)),t.key==` `&&!r&&e.onPlayToggle(),(t.code===`Numpad0`||t.key===`0`)&&!r&&e.onCameraViewToggle(),t.key===`9`&&!r&&e.onPreviewToggle(),t.key===`Escape`&&!r&&e.onSyncToSceneCamera(),t.code===`KeyA`&&n.Shift&&!r&&(t.preventDefault(),e.onAddEntity());for(let r of Lf)(t.code===r.code||t.key===r.key)&&(n.Meta||(t.preventDefault(),e.onAlignView(r.axis,!!n.Control)));(t.code===`Numpad5`||t.key===`5`)&&!r&&e.onProjectionToggle(),(t.code===`NumpadDecimal`||t.key===`.`)&&!r&&e.onFocusSelected(),(t.code===`KeyX`||t.key===`Delete`)&&!r&&e.onDeleteSelected(),t.code===`KeyD`&&n.Shift&&!r&&e.onDuplicateSelected(),t.key===`F2`&&!r&&e.onRenameSelected(),t.code===`KeyP`&&r&&!t.altKey&&(t.preventDefault(),e.onParentToActive()),t.code===`KeyP`&&t.altKey&&!r&&(t.preventDefault(),e.onClearParent()),t.key===`ArrowLeft`&&!r&&(t.preventDefault(),n.Shift?e.onSeekToStart():e.onStepFrame(-1)),t.key===`ArrowRight`&&!r&&(t.preventDefault(),e.onStepFrame(1))}})}dispose(){this._keyboard.dispose()}}})))()}var Vf,Hf,Uf;function Wf(){return(Wf=t((()=>{k(),Vf=e=>{let t=e.getBoundingClientRect(),n=e.width/e.height,r=t.width/t.height,i=t.width,a=t.height,o=0,s=0;return r>n?(i=t.height*n,o=(t.width-i)/2):(a=t.width/n,s=(t.height-a)/2),{left:t.left+o,top:t.top+s,width:i,height:a}},Hf=(e,t,n)=>{let r=Vf(e),i=(t-r.left)/r.width*2-1,a=-((n-r.top)/r.height)*2+1;return new D(i,a)},Uf=(e,t,n)=>{let r=Vf(e),i=(t+1)/2*r.width+r.left,a=(1-n)/2*r.height+r.top;return new D(i,a)}})))()}var Gf,Kf,qf,Jf,Yf,Xf;function Zf(){return(Zf=t((()=>{k(),_o(),yo(),kd(),Gf=[`position`,`euler`,`scale`],Kf=e=>{let t=new Set(e),n=[];for(let r of e){let e=!1,i=r.parent;for(;i;){if(t.has(i)){e=!0;break}i=i.parent}e||n.push(r)}return n},qf=e=>{let t=new D;for(let n of e){let e=n.matrixWorld.elm;t.x+=e[12],t.y+=e[13],t.z+=e[14]}return e.length>0&&t.multiply(1/e.length),t},Jf=(e,t)=>t?Sd(t):e.length>0?Sd(e[0]):new Oe,Yf=class{pivot;basis;_basisInv;_targets;constructor(e,t){for(let t of e)t.updateMatrix(!0);this.pivot=qf(e),this.basis=Jf(e,t),this._basisInv=this.basis.clone().inverse(),this._targets=[];for(let t of e){let e=t.matrixWorld.elm,n=new O,r=new Oe;t.parent&&(n=t.parent.matrixWorld.clone().inverse(),r=Sd(t.parent).inverse()),this._targets.push({entity:t,values:{position:t.position.getElm(`vec3`),euler:t.euler.getElm(`vec3`),scale:t.scale.getElm(`vec3`)},worldPos:new D(e[12],e[13],e[14]),worldQuat:Sd(t),parentWorldInv:n,parentWorldQuatInv:r})}}translate(e){for(let t of this._targets)this._restoreTarget(t),this._setWorldPosition(t,t.worldPos.clone().add(e)),t.entity.updateMatrix(!0)}rotate(e){let t=this._targets.length>1;for(let n of this._targets){if(this._restoreTarget(n),n.entity.quaternion.copy(Ed(n.parentWorldQuatInv,e,n.worldQuat)),t){let t=Cd(n.worldPos.clone().sub(this.pivot),e);this._setWorldPosition(n,this.pivot.clone().add(t))}n.entity.updateMatrix(!0)}}scale(e){let t=this._targets.length>1;for(let n of this._targets){this._restoreTarget(n);let r=n.values.scale;if(n.entity.scale.set(r[0]*e[0],r[1]*e[1],r[2]*e[2]),t){let t=Cd(n.worldPos.clone().sub(this.pivot),this._basisInv);t.x*=e[0],t.y*=e[1],t.z*=e[2],this._setWorldPosition(n,this.pivot.clone().add(Cd(t,this.basis)))}n.entity.updateMatrix(!0)}}restore(){for(let e of this._targets)this._restoreTarget(e),e.entity.updateMatrix(!0)}buildCommand(){let e=[];for(let t of this._targets)for(let n of Gf){let r=t.values[n],i=t.entity[n].getElm(`vec3`);Xf(r,i)||e.push(new vo(t.entity,n,r,i))}return e.length===0?null:e.length===1?e[0]:new go(e)}_restoreTarget(e){e.entity.position.setFromArray(e.values.position),e.entity.euler.setFromArray(e.values.euler),e.entity.scale.setFromArray(e.values.scale)}_setWorldPosition(e,t){let n=t.applyMatrix4AsPosition(e.parentWorldInv);e.entity.position.set(n.x,n.y,n.z)}},Xf=(e,t)=>{for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}})))()}var Qf,$f,ep,tp,np,rp,ip;function ap(){return(ap=t((()=>{k(),P(),Wf(),Zf(),kd(),Qf=1,$f=.001,ep=.007,tp=.1,np=[`x`,`y`,`z`],rp=e=>{if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return null;let t=e.key.toLowerCase();return t===`g`?`translate`:t===`r`?`rotate`:t===`s`?`scale`:null},ip=class{_engine;_getViewport;_api;_getSelection;_isPointerBusy;_onStatusChange;_pointerClient;_session;_disposeListeners;constructor(e){this._engine=e.engine,this._getViewport=e.getViewport,this._api=e.api,this._getSelection=e.getSelection,this._isPointerBusy=e.isPointerBusy,this._onStatusChange=e.onStatusChange,this._pointerClient=new D,this._session=null;let t=e=>{this._pointerClient.set(e.clientX,e.clientY)};window.addEventListener(`pointermove`,t),this._disposeListeners=()=>{window.removeEventListener(`pointermove`,t)}}get active(){return this._session!==null}get constraintDisplay(){let e=this._session;if(!e||e.trackball||!e.constraint)return null;let t=e.constraint,n=e.mode===`scale`||t.orientation===`local`;return{origin:e.anchorWorldPos,quat:n?e.targets.basis:new Oe,axes:t.plane?np.filter(e=>e!==t.axis):[t.axis]}}handleKeyDown(e){let t=this._session;if(!t){let t=rp(e);return t?this.start(t):!1}let n=e.key.toLowerCase();return e.key===`Enter`?this._confirm():e.key===`Escape`?this._cancel():n===`r`&&t.mode===`rotate`?this._toggleTrackball():t.trackball||(n===`x`||n===`y`||n===`z`?this._toggleConstraint(n,e.shiftKey):this._inputNumber(e.key)),!0}_inputNumber(e){let t=this._session;if(t){if(e.length===1&&e>=`0`&&e<=`9`)t.numberBuffer+=e;else if(e===`.`){if(t.numberBuffer.includes(`.`))return;t.numberBuffer+=`.`}else if(e===`-`)t.numberBuffer=t.numberBuffer.startsWith(`-`)?t.numberBuffer.slice(1):`-`+t.numberBuffer;else if(e===`Backspace`){if(t.numberBuffer===``)return;t.numberBuffer=t.numberBuffer.slice(0,-1)}else return;this._update()}}start(e){if(this._isPointerBusy())return!1;let t=this._getViewport();if(!t)return!1;let n=t.editorCamera,r=n.getCameraEntity(this._engine);if(!r)return!1;let i=this._getSelection(),a=i.entities.length===1&&i.entities[0]===r,o=!n.usingEditorCamera&&(i.entities.length===0||a);if(o&&e===`scale`)return!1;let s;if(o)s=new Yf([r],r);else{if(i.entities.length===0)return!1;s=new Yf(i.entities,i.active)}let c=r.getComponentsByTag(`camera`)[0];if(!c)return!1;let l=r.matrixWorld.elm,u=new D(l[12],l[13],l[14]),d=new D(-l[8],-l[9],-l[10]).normalize(),f=new D(l[0],l[1],l[2]).normalize(),p=new D(l[4],l[5],l[6]).normalize(),m=o?s.pivot.clone().add(d.clone().multiply(Math.max(c.dofParams.focusDistance,tp))):s.pivot.clone(),h=e=>{e.stopPropagation(),this._session&&(this._session.lastPointer.set(e.clientX,e.clientY),this._update())},g=e=>{e.preventDefault(),e.stopPropagation(),e.button===2?this._cancel():e.button===0&&this._confirm()};window.addEventListener(`pointermove`,h,{capture:!0}),window.addEventListener(`pointerdown`,g,{capture:!0});let _=n.orbitControls,v=_.enabled;return _.enabled=!1,this._session={mode:e,targets:s,canvas:t.canvas,selfView:o,constraint:null,numberBuffer:``,trackball:!1,trackballQuat:new Oe,trackballPointer:this._pointerClient.clone(),camForward:d,camRight:f,camUp:p,camWorldPos:u,anchorWorldPos:m,projInv:c.projectionMatrix.clone().inverse(),viewInv:c.viewMatrix.clone().inverse(),centerClient:this._projectToClient(s.pivot,c,t.canvas),startPointer:this._pointerClient.clone(),lastPointer:this._pointerClient.clone(),disposeSession:()=>{window.removeEventListener(`pointermove`,h,{capture:!0}),window.removeEventListener(`pointerdown`,g,{capture:!0}),_.enabled=v,this._session&&this._pointerClient.copy(this._session.lastPointer),this._session=null,this._onStatusChange(null)}},this._update(),!0}_confirm(){let e=this._session;if(!e)return;let t=e.targets.buildCommand();t&&this._api.commandManager.execute(t,{merge:!1}),e.disposeSession()}_cancel(){let e=this._session;e&&(e.targets.restore(),e.disposeSession())}_toggleConstraint(e,t){let n=this._session;if(!n||t&&n.mode===`rotate`)return;let r=n.constraint;n.constraint=!r||r.axis!==e||r.plane!==t?{axis:e,orientation:`global`,plane:t}:r.orientation===`global`?{axis:e,orientation:`local`,plane:t}:null,this._update()}_axisWorldDir(e,t,n){return wd(e.targets.basis,t,n)}_toggleTrackball(){let e=this._session;e&&(e.trackball=!e.trackball,e.constraint=null,e.numberBuffer=``,e.trackballQuat=new Oe,e.trackballPointer.copy(e.lastPointer),this._update())}_accumulateTrackball(e){let t=e.lastPointer.x-e.trackballPointer.x,n=e.lastPointer.y-e.trackballPointer.y;if(e.trackballPointer.copy(e.lastPointer),t===0&&n===0)return;let r=bd(e.camUp,t*ep).multiply(bd(e.camRight,n*ep));e.trackballQuat.preMultiply(r)}_update(){let e=this._session;if(!e)return;let t=e.numberBuffer===``?null:parseFloat(e.numberBuffer),n=0;t!==null&&Number.isNaN(t)?e.targets.restore():n=e.mode===`translate`?this._applyTranslate(e,t):e.mode===`rotate`?this._applyRotate(e,t):this._applyScale(e,t),this._onStatusChange(this._statusText(e,n))}_applyTranslate(e,t){let n=e.constraint;if(t!==null){let n=this._numericTranslateDir(e);return e.targets.translate(n.multiply(t)),t}let r=this._rayFromClient(e.startPointer,e),i=this._rayFromClient(e.lastPointer,e);if(n&&!n.plane){let t=this._axisWorldDir(e,n.axis,n.orientation),a=Dd(i,e.anchorWorldPos,t)-Dd(r,e.anchorWorldPos,t);return e.targets.translate(t.clone().multiply(a)),a}let a=n?this._axisWorldDir(e,n.axis,n.orientation):e.camForward,o=Od(r,e.anchorWorldPos,a),s=Od(i,e.anchorWorldPos,a);if(!o||!s)return 0;let c=s.sub(o);return e.targets.translate(c),c.length()}_numericTranslateDir(e){let t=e.constraint;if(!t)return new D(1,0,0);let n=t.plane?t.axis===`x`?`y`:`x`:t.axis;return this._axisWorldDir(e,n,t.orientation)}_applyRotate(e,t){if(e.trackball)return this._accumulateTrackball(e),e.targets.rotate(e.trackballQuat.clone()),0;let n=e.constraint?this._axisWorldDir(e,e.constraint.axis,e.constraint.orientation):e.camForward,r=e.selfView?e.camForward.clone().multiply(-1):e.camWorldPos.clone().sub(e.targets.pivot),i=t!==null&&e.constraint?1:n.dot(r)<0?-1:1,a=t===null?this._screenAngle(e.lastPointer,e.centerClient)-this._screenAngle(e.startPointer,e.centerClient):t*Math.PI/180;return e.targets.rotate(bd(n,a*i)),a*180/Math.PI}_applyScale(e,t){let n;if(t!==null)n=t;else{let t=Math.max(Qf,e.startPointer.distanceTo(e.centerClient));n=Math.max($f,e.lastPointer.distanceTo(e.centerClient)/t)}let r=e.constraint,i=np.map(e=>r?(r.plane?e!==r.axis:e===r.axis)?n:1:n);return e.targets.scale(i),n}_statusText(e,t){if(e.trackball)return`Rot: trackball`;let n=e.mode===`translate`?`Move D`:e.mode===`rotate`?`Rot`:`Scale`,r=e.mode===`rotate`?`°`:``;return`${n}: ${e.numberBuffer===``?t.toFixed(e.mode===`rotate`?1:3):`[${e.numberBuffer}]`}${r} (${this._constraintText(e)})`}_constraintText(e){let t=e.constraint;if(!t)return e.mode===`translate`?`view plane`:e.mode===`rotate`?`view axis`:`uniform`;let n=np.filter(e=>t.plane?e!==t.axis:e===t.axis).join(``).toUpperCase();return`${e.mode===`scale`?`local`:t.orientation} ${n}`}_rayFromClient(e,t){let n=Hf(t.canvas,e.x,e.y);return new cn().setFromCamera(n,t.projInv,t.viewInv)}_projectToClient(e,t,n){let r=new D(e.x,e.y,e.z,1).applyMatrix4(t.viewMatrix).applyMatrix4(t.projectionMatrix);return Math.abs(r.w)<1e-4?Uf(n,0,0):Uf(n,r.x/r.w,r.y/r.w)}_screenAngle(e,t){return Math.atan2(-(e.y-t.y),e.x-t.x)}dispose(){this._cancel(),this._disposeListeners()}}})))()}var op,sp,cp,lp,up;function dp(){return(dp=t((()=>{k(),P(),kd(),op=[.55,.55,.55],sp=2/90,cp=128,lp=new D(0,0,1),up=class{_engine;_draw;_material;_root;_geometries;_lines;constructor(e,t){this._engine=e,this._draw=t,this._material=t.materials.flat({color:op,lines:!0}),this._geometries=new Map,this._lines=[],this._root=e.createEntity({name:`__relationship_lines`}),this._root.initiator=`god`}render(e,t,n){if(!t)return;let r=t.getComponentsByTag(`camera`)[0];if(!r)return;let i=[];n.root.traverseEditable(e=>{let t=e.parent;if(!t||t===n.root||e.initiator===`god`||t.initiator===`god`||!e.isVisibleTraverse()||e.isRenderHiddenTraverse())return;let a=e.matrixWorld.elm,o=t.matrixWorld.elm,s=new D(a[12],a[13],a[14]),c=new D(o[12],o[13],o[14]),l=c.clone().sub(s),u=l.length();if(u<1e-6)return;let d=this._getLine(i.length),f=d.getComponent(M);f.geometry=this._getGeometry(this._dashCount(s,c,r)),d.position.copy(s),d.quaternion.copy(xd(lp,l)),d.scale.set(1,1,u),i.push(d)}),i.length!==0&&(this._root.updateMatrix(!0),this._root.update(n.createEntityUpdateEvent()),this._draw.renderEntities({view:e,camera:t,entities:i,target:null}))}_dashCount(e,t,n){let r=this._projectToNDC(e,n),i=this._projectToNDC(t,n);if(!r||!i)return cp;let a=(i.x-r.x)*n.aspect,o=i.y-r.y,s=Math.round(Math.sqrt(a*a+o*o)/sp);return Math.min(cp,Math.max(1,s))}_projectToNDC(e,t){let n=new D(e.x,e.y,e.z,1).applyMatrix4(t.viewMatrix).applyMatrix4(t.projectionMatrix);return n.w<=0?null:new D(n.x/n.w,n.y/n.w)}_getLine(e){let t=this._lines[e];if(t)return t;let n=this._engine.createEntity({name:`__relationship_line`});return n.initiator=`god`,n.addComponent(M,{geometry:this._getGeometry(1),material:this._material}),this._root.add(n),this._lines.push(n),n}_getGeometry(e){let t=this._geometries.get(e);if(t)return t;let n=[];for(let t=0;t<e;t++)n.push(0,0,t/e),n.push(0,0,(t+.5)/e);let r=new Ot;return r.setAttribute(`position`,new Float32Array(n),3),r.setAttribute(`normal`,new Float32Array(n.length).fill(0),3),this._geometries.set(e,r),r}}})))()}function z(e){if(!e)throw Error(`Assertion failed.`)}var fp,pp,mp,B,hp,gp,_p,vp,yp,bp,xp,Sp,Cp,wp,Tp,Ep,Dp,Op,kp,Ap,jp,Mp,Np,Pp,Fp,Ip,Lp,Rp,zp,Bp,Vp,Hp,Up,Wp,Gp,Kp,qp,Jp,Yp,Xp,Zp,Qp,$p;function em(){return(em=t((()=>{fp=e=>{let t=(e%360+360)%360;if(t===0||t===90||t===180||t===270)return t;throw Error(`Invalid rotation ${e}.`)},pp=e=>e&&e[e.length-1],mp=e=>e>=0&&e<2**32,B=e=>{let t=0;for(;e.readBits(1)===0&&t<32;)t++;if(t>=32)throw Error(`Invalid exponential-Golomb code.`);return(1<<t)-1+e.readBits(t)},hp=e=>{let t=B(e);return t&1?t+1>>1:-(t>>1)},gp=e=>e.constructor===Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),_p=e=>e.constructor===DataView?e:ArrayBuffer.isView(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(e),vp=new TextEncoder,yp={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12},bp={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18},xp={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9},Sp=e=>!!e&&!!e.primaries&&!!e.transfer&&!!e.matrix&&e.fullRange!==void 0,Cp=e=>e instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e),wp=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(t=>{let n=!1;e=()=>{n||=(t(),this.pending--,!0)}}),n=this.currentPromise;return this.currentPromise=t,this.pending++,await n,e}},Tp=(e,t,n)=>{let r=0,i=e.length-1,a=-1;for(;r<=i;){let o=r+(i-r+1)/2|0;n(e[o])<=t?(a=o,r=o+1):i=o-1}return a},Ep=()=>{let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}},Dp=e=>{throw Error(`Unexpected value: ${e}`)},Op=(e,t,n)=>{let r=e.getUint8(t),i=e.getUint8(t+1),a=e.getUint8(t+2);return n?r|i<<8|a<<16:r<<16|i<<8|a},kp=(e,t,n,r)=>{n>>>=0,n&=16777215,r?(e.setUint8(t,n&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n>>>16&255)):(e.setUint8(t,n>>>16&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n&255))},Ap=(e,t,n)=>Math.max(t,Math.min(n,e)),jp=(e,t,n)=>e+(t-e)*n,Mp=(e,t)=>Math.round(e/t)*t,Np=(e,t)=>Math.floor(e*t)/t,Pp=/^[a-z]{3}$/,Fp=e=>Pp.test(e),Ip=1e6*(1+2**-52),Lp=(e,t)=>{let n=e<0?-1:1;e=Math.abs(e);let r=0,i=1,a=1,o=0,s=e;for(;;){let e=Math.floor(s),c=e*a+r,l=e*o+i;if(l>t)return{num:n*a,den:o};if(r=a,i=o,a=c,o=l,s=1/(s-e),!isFinite(s))break}return{num:n*a,den:o}},Rp=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}},zp=null,Bp=()=>zp===null?zp=typeof navigator<`u`&&navigator.userAgent?.includes(`Firefox`):zp,Vp=null,Hp=()=>Vp===null?Vp=!!(typeof navigator<`u`&&(navigator.vendor?.includes(`Google Inc`)||/Chrome/.test(navigator.userAgent))):Vp,Up=null,Wp=()=>{if(Up!==null)return Up;if(typeof navigator>`u`)return null;let e=/\bChrome\/(\d+)/.exec(navigator.userAgent);return e?Up=Number(e[1]):null},Gp=function*(e){for(let t in e){let n=e[t];n!==void 0&&(yield{key:t,value:n})}},Kp=()=>{Symbol.dispose??=Symbol(`Symbol.dispose`)},qp=(e,t)=>{let n=-1,r=1/0;for(let i=0;i<e.length;i++){let a=t(e[i]);a<r&&(r=a,n=i)}return n},Jp=e=>{z(Number.isInteger(e.num)),z(Number.isInteger(e.den)),z(e.den!==0);let t=Math.abs(e.num),n=Math.abs(e.den);for(;n!==0;){let e=t%n;t=n,n=e}let r=t||1;return{num:e.num/r,den:e.den/r}},Yp=(e,t)=>{if(typeof e!=`object`||!e)throw TypeError(`${t} must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(`${t}.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(`${t}.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(`${t}.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(`${t}.height must be a non-negative integer.`)},Xp=e=>new Promise(t=>setTimeout(t,e)),Zp=e=>Array.isArray(e)?e:[e],Qp=class{constructor(){this._listeners=new Map}on(e,t,n){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:n?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,n]=e,r=this._listeners.get(t);if(r)for(let e of r){try{e.fn(n)}catch(e){console.error(e)}e.once&&r.delete(e)}}},$p=e=>typeof e==`object`&&!!e&&Object.getPrototypeOf(e)===Object.prototype&&Object.values(e).every(e=>typeof e==`string`)})))()}var tm,nm;function rm(){return(rm=t((()=>{em(),(function(e){e[e.Silent=0]=`Silent`,e[e.Errors=1]=`Errors`,e[e.Warnings=2]=`Warnings`,e[e.Info=3]=`Info`})(tm||={}),nm=class e{constructor(){}static get level(){return e._level}static set level(t){if(t!==tm.Silent&&t!==tm.Errors&&t!==tm.Warnings&&t!==tm.Info)throw TypeError(`Invalid log level. Use one of the values of the LogLevel enum.`);e._level=t}static get _emitter(){return e._emitterInstance??=new Qp}static on(t,n,r){return e._emitter.on(t,n,r)}static _error(...t){e._emitter._emit(`error`,t),e._level>=tm.Errors&&console.error(...t)}static _warn(...t){e._emitter._emit(`warn`,t),e._level>=tm.Warnings&&console.warn(...t)}static _info(...t){e._emitter._emit(`info`,t),e._level>=tm.Info&&console.info(...t)}},nm._level=tm.Info,nm._emitterInstance=null})))()}var im,am,om,sm;function cm(){return(cm=t((()=>{em(),im=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(typeof t!=`string`)throw TypeError(`mimeType must be a string.`)}},am=class{constructor(e,t,n,r){if(this.data=e,this.mimeType=t,this.name=n,this.description=r,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==void 0&&typeof t!=`string`)throw TypeError(`mimeType, when provided, must be a string.`);if(n!==void 0&&typeof n!=`string`)throw TypeError(`name, when provided, must be a string.`);if(r!==void 0&&typeof r!=`string`)throw TypeError(`description, when provided, must be a string.`)}},om=e=>{if(!e||typeof e!=`object`)throw TypeError(`tags must be an object.`);if(e.title!==void 0&&typeof e.title!=`string`)throw TypeError(`tags.title, when provided, must be a string.`);if(e.description!==void 0&&typeof e.description!=`string`)throw TypeError(`tags.description, when provided, must be a string.`);if(e.artist!==void 0&&typeof e.artist!=`string`)throw TypeError(`tags.artist, when provided, must be a string.`);if(e.album!==void 0&&typeof e.album!=`string`)throw TypeError(`tags.album, when provided, must be a string.`);if(e.albumArtist!==void 0&&typeof e.albumArtist!=`string`)throw TypeError(`tags.albumArtist, when provided, must be a string.`);if(e.trackNumber!==void 0&&(!Number.isInteger(e.trackNumber)||e.trackNumber<=0))throw TypeError(`tags.trackNumber, when provided, must be a positive integer.`);if(e.tracksTotal!==void 0&&(!Number.isInteger(e.tracksTotal)||e.tracksTotal<=0))throw TypeError(`tags.tracksTotal, when provided, must be a positive integer.`);if(e.discNumber!==void 0&&(!Number.isInteger(e.discNumber)||e.discNumber<=0))throw TypeError(`tags.discNumber, when provided, must be a positive integer.`);if(e.discsTotal!==void 0&&(!Number.isInteger(e.discsTotal)||e.discsTotal<=0))throw TypeError(`tags.discsTotal, when provided, must be a positive integer.`);if(e.genre!==void 0&&typeof e.genre!=`string`)throw TypeError(`tags.genre, when provided, must be a string.`);if(e.date!==void 0&&(!(e.date instanceof Date)||Number.isNaN(e.date.getTime())))throw TypeError(`tags.date, when provided, must be a valid Date.`);if(e.lyrics!==void 0&&typeof e.lyrics!=`string`)throw TypeError(`tags.lyrics, when provided, must be a string.`);if(e.images!==void 0){if(!Array.isArray(e.images))throw TypeError(`tags.images, when provided, must be an array.`);for(let t of e.images){if(!t||typeof t!=`object`)throw TypeError(`Each image in tags.images must be an object.`);if(!(t.data instanceof Uint8Array))throw TypeError(`Each image.data must be a Uint8Array.`);if(typeof t.mimeType!=`string`)throw TypeError(`Each image.mimeType must be a string.`);if(![`coverFront`,`coverBack`,`unknown`].includes(t.kind))throw TypeError(`Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.`)}}if(e.comment!==void 0&&typeof e.comment!=`string`)throw TypeError(`tags.comment, when provided, must be a string.`);if(e.raw!==void 0){if(!e.raw||typeof e.raw!=`object`)throw TypeError(`tags.raw, when provided, must be an object.`);for(let t of Object.values(e.raw))if(t!==null&&typeof t!=`string`&&!(t instanceof Uint8Array)&&!(t instanceof im)&&!(t instanceof am)&&!$p(t))throw TypeError(`Each value in tags.raw must be a string, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.`)}},sm=e=>{if(!e||typeof e!=`object`)throw TypeError(`disposition must be an object.`);if(e.default!==void 0&&typeof e.default!=`boolean`)throw TypeError(`disposition.default must be a boolean.`);if(e.primary!==void 0&&typeof e.primary!=`boolean`)throw TypeError(`disposition.primary must be a boolean.`);if(e.forced!==void 0&&typeof e.forced!=`boolean`)throw TypeError(`disposition.forced must be a boolean.`);if(e.original!==void 0&&typeof e.original!=`boolean`)throw TypeError(`disposition.original must be a boolean.`);if(e.commentary!==void 0&&typeof e.commentary!=`boolean`)throw TypeError(`disposition.commentary must be a boolean.`);if(e.hearingImpaired!==void 0&&typeof e.hearingImpaired!=`boolean`)throw TypeError(`disposition.hearingImpaired must be a boolean.`);if(e.visuallyImpaired!==void 0&&typeof e.visuallyImpaired!=`boolean`)throw TypeError(`disposition.visuallyImpaired must be a boolean.`)}})))()}var lm;function um(){return(um=t((()=>{lm=class e{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,n=7-(this.pos&7),r=(t&1<<n)>>n;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let n=0;n<e;n++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let n=this.pos+e;for(let e=this.pos;e<n;e++){let r=Math.floor(e/8),i=this.bytes[r],a=7-(e&7);i&=~(1<<a),i|=(t&1<<n-e-1)>>n-e-1<<a,this.bytes[r]=i}this.pos=n}readAlignedByte(){if(this.pos%8!=0)throw Error(`Bitstream is not byte-aligned.`);let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let t=new e(this.bytes);return t.pos=this.pos,t}}})))()}var dm,fm,pm;function mm(){return(mm=t((()=>{um(),dm=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],fm=[-1,1,2,3,4,5,6,8],pm=e=>{let t=dm.indexOf(e.sampleRate),n=null;t===-1&&(t=15,n=e.sampleRate);let r=fm.indexOf(e.numberOfChannels);if(r===-1)throw TypeError(`Unsupported number of channels: ${e.numberOfChannels}`);let i=13;e.objectType>=32&&(i+=6),t===15&&(i+=24);let a=Math.ceil(i/8),o=new Uint8Array(a),s=new lm(o);return e.objectType<32?s.writeBits(5,e.objectType):(s.writeBits(5,31),s.writeBits(6,e.objectType-32)),s.writeBits(4,t),t===15&&s.writeBits(24,n),s.writeBits(4,r),o}})))()}var hm,gm,_m,vm,ym,bm,xm,Sm,Cm,wm,Tm,Em,Dm,Om,km,Am,jm,Mm,Nm,Pm,Fm,Im,Lm,Rm,zm,Bm;function Vm(){return(Vm=t((()=>{em(),hm=[`avc`,`hevc`,`vp9`,`av1`,`vp8`,`prores`],gm=[`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,`pcm-u8`,`pcm-s8`,`ulaw`,`alaw`],_m=[`aac`,`opus`,`mp3`,`vorbis`,`flac`,`ac3`,`eac3`],vm=[..._m,...gm],ym=[`webvtt`],bm=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],xm=[{maxPictureSize:36864,maxBitrate:128e3,tier:`L`,level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:`L`,level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:`L`,level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:`L`,level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:`L`,level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:`L`,level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:`H`,level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:`L`,level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:`H`,level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:`L`,level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:`L`,level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:`L`,level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:`L`,level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:`L`,level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:`L`,level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:186}],Sm=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],Cm=[{maxPictureSize:147456,maxBitrate:15e5,tier:`M`,level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:`M`,level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:`M`,level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:`M`,level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:`M`,level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:`H`,level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:`M`,level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:`H`,level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:`M`,level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:`M`,level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:`M`,level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:`M`,level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:19}],wm=[`ap4x`,`ap4h`,`apch`,`apcn`,`apcs`,`apco`],Tm=[{fourCc:`apco`,bitrate:45e6,alpha:!1},{fourCc:`apcs`,bitrate:102e6,alpha:!1},{fourCc:`apcn`,bitrate:147e6,alpha:!1},{fourCc:`apch`,bitrate:22e7,alpha:!1},{fourCc:`ap4h`,bitrate:33e7,alpha:!0},{fourCc:`ap4x`,bitrate:5e8,alpha:!0}],Em=(e,t,n,r,i)=>{if(e===`avc`){let e=Math.ceil(t/16)*Math.ceil(n/16),i=bm.find(t=>e<=t.maxMacroblocks&&r<=t.maxBitrate)??pp(bm),a=i?i.level:0;return`avc1.${`64`.padStart(2,`0`)}00${a.toString(16).padStart(2,`0`)}`}if(e===`hevc`){let e=t*n,i=xm.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??pp(xm);return`hev1.1.6.${i.tier}${i.level}.B0`}if(e===`vp8`)return`vp8`;if(e===`vp9`){let e=t*n;return`vp09.00.${(Sm.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??pp(Sm)).level.toString().padStart(2,`0`)}.08`}if(e===`av1`){let e=t*n,i=Cm.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??pp(Cm);return`av01.0.${i.level.toString().padStart(2,`0`)}${i.tier}.08`}if(e===`prores`){let e=(t*n/2073600)**.95,a=Tm.filter(e=>e.alpha===i),o=a[0].fourCc,s=1/0;for(let{fourCc:t,bitrate:n}of a){let i=Math.abs(n*e-r);i<s&&(s=i,o=t)}return o}throw Dp(e),TypeError(`Unhandled codec '${String(e)}'.`)},Dm=e=>{let t=e.split(`.`),n=Number(t[1]),r=t[2],i=Number(r.slice(0,-1)),a=(n<<5)+i,o=+(r.slice(-1)===`H`),s=Number(t[3])===8?0:1,c=t[4]?Number(t[4]):0,l=t[5]?Number(t[5][0]):1,u=t[5]?Number(t[5][1]):1,d=t[5]?Number(t[5][2]):0;return[129,a,(o<<7)+(s<<6)+0+(c<<4)+(l<<3)+(u<<2)+d,0]},Om=/^pcm-([usf])(\d+)(be)?$/,km=e=>{if(z(gm.includes(e)),e===`ulaw`)return{dataType:`ulaw`,sampleSize:1,littleEndian:!0,silentValue:255};if(e===`alaw`)return{dataType:`alaw`,sampleSize:1,littleEndian:!0,silentValue:213};let t=Om.exec(e);z(t);let n;n=t[1]===`u`?`unsigned`:t[1]===`s`?`signed`:`float`;let r=Number(t[2])/8,i=t[3]!==`be`;return{dataType:n,sampleSize:r,littleEndian:i,silentValue:e===`pcm-u8`?128:0}},Am=e=>e.startsWith(`avc1`)||e.startsWith(`avc3`)?`avc`:e.startsWith(`hev1`)||e.startsWith(`hvc1`)?`hevc`:e===`vp8`?`vp8`:e.startsWith(`vp09`)?`vp9`:e.startsWith(`av01`)?`av1`:wm.includes(e)?`prores`:e===`mp3`||e===`mp4a.69`||e===`mp4a.6B`||e===`mp4a.6b`||e===`mp4a.40.34`?`mp3`:e.startsWith(`mp4a.40.`)||e===`mp4a.67`?`aac`:e===`opus`?`opus`:e===`vorbis`?`vorbis`:e===`flac`?`flac`:e===`ac-3`||e===`ac3`?`ac3`:e===`ec-3`||e===`eac3`?`eac3`:e===`ulaw`?`ulaw`:e===`alaw`?`alaw`:Om.test(e)?e:e===`webvtt`?`webvtt`:null,jm=e=>e===`avc`?{avc:{format:`avc`}}:e===`hevc`?{hevc:{format:`hevc`}}:{},Mm=[`avc1`,`avc3`,`hev1`,`hvc1`,`vp8`,`vp09`,`av01`,...wm],Nm=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,Pm=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,Fm=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,Im=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,Lm=(e,t)=>{if(!e)throw TypeError(`Video chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Video chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Video chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Video chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Video chunk metadata decoder configuration must specify a codec string.`);if(!Mm.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.codedWidth)||e.decoderConfig.codedWidth<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).`);if(!Number.isInteger(e.decoderConfig.codedHeight)||e.decoderConfig.codedHeight<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).`);if(e.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectWidth)||e.decoderConfig.displayAspectWidth<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectHeight)||e.decoderConfig.displayAspectHeight<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectWidth!==void 0!=(e.decoderConfig.displayAspectHeight!==void 0))throw TypeError(`Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.`);if(e.decoderConfig.description!==void 0&&!Cp(e.decoderConfig.description))throw TypeError(`Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=e.decoderConfig;if(typeof t!=`object`)throw TypeError(`Video chunk metadata decoder configuration colorSpace, when provided, must be an object.`);let n=Object.keys(yp);if(t.primaries!=null&&!n.includes(t.primaries))throw TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${n.join(`, `)}.`);let r=Object.keys(bp);if(t.transfer!=null&&!r.includes(t.transfer))throw TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(`, `)}.`);let i=Object.keys(xp);if(t.matrix!=null&&!i.includes(t.matrix))throw TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(`, `)}.`);if(t.fullRange!=null&&typeof t.fullRange!=`boolean`)throw TypeError(`Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.`)}if(e.decoderConfig.codec.startsWith(`avc1`)||e.decoderConfig.codec.startsWith(`avc3`)){if(!Nm.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.`)}else if(e.decoderConfig.codec.startsWith(`hev1`)||e.decoderConfig.codec.startsWith(`hvc1`)){if(!Pm.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.`)}else if(e.decoderConfig.codec.startsWith(`vp8`)){if(e.decoderConfig.codec!==`vp8`)throw TypeError(`Video chunk metadata decoder configuration codec string for VP8 must be "vp8".`)}else if(e.decoderConfig.codec.startsWith(`vp09`)){if(!Fm.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.`)}else if(e.decoderConfig.codec.startsWith(`av01`)){if(!Im.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.`)}else if(wm.some(t=>e.decoderConfig.codec.startsWith(t))&&!wm.some(t=>e.decoderConfig.codec===t))throw TypeError(`Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${wm.join(`, `)}.`);if(t!==null&&Am(e.decoderConfig.codec)!==t)throw TypeError(`Video chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},Rm=[`mp4a`,`mp3`,`opus`,`vorbis`,`flac`,`ulaw`,`alaw`,`pcm`,`ac-3`,`ec-3`],zm=(e,t)=>{if(!e)throw TypeError(`Audio chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Audio chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Audio chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Audio chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Audio chunk metadata decoder configuration must specify a codec string.`);if(!Rm.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.sampleRate)||e.decoderConfig.sampleRate<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).`);if(!Number.isInteger(e.decoderConfig.numberOfChannels)||e.decoderConfig.numberOfChannels<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).`);if(e.decoderConfig.description!==void 0&&!Cp(e.decoderConfig.description))throw TypeError(`Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.codec.startsWith(`mp4a`)&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`){if(![`mp4a.40.2`,`mp4a.40.02`,`mp4a.40.5`,`mp4a.40.05`,`mp4a.40.29`,`mp4a.67`].includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`mp3`)||e.decoderConfig.codec.startsWith(`mp4a`)){if(e.decoderConfig.codec!==`mp3`&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`)throw TypeError(`Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".`)}else if(e.decoderConfig.codec.startsWith(`opus`)){if(e.decoderConfig.codec!==`opus`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Opus must be "opus".`);if(e.decoderConfig.description&&e.decoderConfig.description.byteLength<18)throw TypeError(`Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.`)}else if(e.decoderConfig.codec.startsWith(`vorbis`)){if(e.decoderConfig.codec!==`vorbis`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".`);if(!e.decoderConfig.description)throw TypeError(`Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`flac`)){if(e.decoderConfig.codec!==`flac`)throw TypeError(`Audio chunk metadata decoder configuration codec string for FLAC must be "flac".`);if(!e.decoderConfig.description||e.decoderConfig.description.byteLength<42)throw TypeError(`Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`ac-3`)||e.decoderConfig.codec.startsWith(`ac3`)){if(e.decoderConfig.codec!==`ac-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".`)}else if(e.decoderConfig.codec.startsWith(`ec-3`)||e.decoderConfig.codec.startsWith(`eac3`)){if(e.decoderConfig.codec!==`ec-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".`)}else if((e.decoderConfig.codec.startsWith(`pcm`)||e.decoderConfig.codec.startsWith(`ulaw`)||e.decoderConfig.codec.startsWith(`alaw`))&&!gm.includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${gm.join(`, `)}).`);if(t!==null&&Am(e.decoderConfig.codec)!==t)throw TypeError(`Audio chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},Bm=e=>{if(!e)throw TypeError(`Subtitle metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Subtitle metadata must be an object.`);if(!e.config)throw TypeError(`Subtitle metadata must include a config object.`);if(typeof e.config!=`object`)throw TypeError(`Subtitle metadata config must be an object.`);if(typeof e.config.description!=`string`)throw TypeError(`Subtitle metadata config description must be a string.`)}})))()}var Hm,Um;function Wm(){return(Wm=t((()=>{Hm=[48e3,44100,32e3],Um=[24e3,22050,16e3]})))()}var Gm,Km,qm,Jm,Ym,Xm,Zm,Qm,$m,eh,th,nh,rh,ih,ah,oh,sh,ch,lh,uh,dh,fh,ph,mh,hh,gh,_h,vh,yh,bh,xh,Sh,Ch;function wh(){return(wh=t((()=>{Vm(),em(),rm(),Wm(),um(),(function(e){e[e.NON_IDR_SLICE=1]=`NON_IDR_SLICE`,e[e.SLICE_DPA=2]=`SLICE_DPA`,e[e.SLICE_DPB=3]=`SLICE_DPB`,e[e.SLICE_DPC=4]=`SLICE_DPC`,e[e.IDR=5]=`IDR`,e[e.SEI=6]=`SEI`,e[e.SPS=7]=`SPS`,e[e.PPS=8]=`PPS`,e[e.AUD=9]=`AUD`,e[e.SPS_EXT=13]=`SPS_EXT`})(Gm||={}),(function(e){e[e.RASL_N=8]=`RASL_N`,e[e.RASL_R=9]=`RASL_R`,e[e.BLA_W_LP=16]=`BLA_W_LP`,e[e.RSV_IRAP_VCL23=23]=`RSV_IRAP_VCL23`,e[e.VPS_NUT=32]=`VPS_NUT`,e[e.SPS_NUT=33]=`SPS_NUT`,e[e.PPS_NUT=34]=`PPS_NUT`,e[e.AUD_NUT=35]=`AUD_NUT`,e[e.PREFIX_SEI_NUT=39]=`PREFIX_SEI_NUT`,e[e.SUFFIX_SEI_NUT=40]=`SUFFIX_SEI_NUT`})(Km||={}),qm=function*(e){let t=0,n=-1;for(;t<e.length-2;){let r=e.indexOf(0,t);if(r===-1||r>=e.length-2)break;t=r;let i=0;if(t+3<e.length&&e[t+1]===0&&e[t+2]===0&&e[t+3]===1?i=4:e[t+1]===0&&e[t+2]===1&&(i=3),i===0){t++;continue}n!==-1&&t>n&&(yield{offset:n,length:t-n}),n=t+i,t=n}n!==-1&&n<e.length&&(yield{offset:n,length:e.length-n})},Jm=function*(e,t){let n=0,r=new DataView(e.buffer,e.byteOffset,e.byteLength);for(;n+t<=e.length;){let e;t===1?e=r.getUint8(n):t===2?e=r.getUint16(n,!1):t===3?e=Op(r,n,!1):(z(t===4),e=r.getUint32(n,!1)),n+=t,yield{offset:n,length:e},n+=e}},Ym=(e,t)=>{if(t.description){let n=(gp(t.description)[4]&3)+1;return Jm(e,n)}return qm(e)},Xm=e=>e&31,Zm=e=>{let t=[],n=e.length;for(let r=0;r<n;r++)r+2<n&&e[r]===0&&e[r+1]===0&&e[r+2]===3?(t.push(0,0),r+=2):t.push(e[r]);return new Uint8Array(t)},new Uint8Array([0,0,0,1]),Qm=(e,t)=>{let n=e.reduce((e,n)=>e+t+n.byteLength,0),r=new Uint8Array(n),i=0;for(let n of e){let e=new DataView(r.buffer,r.byteOffset,r.byteLength);switch(t){case 1:e.setUint8(i,n.byteLength);break;case 2:e.setUint16(i,n.byteLength,!1);break;case 3:kp(e,i,n.byteLength,!1);break;case 4:e.setUint32(i,n.byteLength,!1)}i+=t,r.set(n,i),i+=n.byteLength}return r},$m=e=>{try{let t=[],n=[],r=[];for(let i of qm(e)){let a=e.subarray(i.offset,i.offset+i.length),o=Xm(a[0]);o===Gm.SPS?t.push(a):o===Gm.PPS?n.push(a):o===Gm.SPS_EXT&&r.push(a)}if(t.length===0||n.length===0)return null;let i=t[0],a=nh(i);z(a!==null);let o=a.profileIdc===100||a.profileIdc===110||a.profileIdc===122||a.profileIdc===144;return{configurationVersion:1,avcProfileIndication:a.profileIdc,profileCompatibility:a.constraintFlags,avcLevelIndication:a.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:n,chromaFormat:o?a.chromaFormatIdc:null,bitDepthLumaMinus8:o?a.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?a.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?r:null}}catch(e){return nm._error(`Error building AVC Decoder Configuration Record:`,e),null}},eh=e=>{let t=[];t.push(e.configurationVersion),t.push(e.avcProfileIndication),t.push(e.profileCompatibility),t.push(e.avcLevelIndication),t.push(252|e.lengthSizeMinusOne&3),t.push(224|e.sequenceParameterSets.length&31);for(let n of e.sequenceParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}t.push(e.pictureParameterSets.length);for(let n of e.pictureParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}if(e.avcProfileIndication===100||e.avcProfileIndication===110||e.avcProfileIndication===122||e.avcProfileIndication===144){z(e.chromaFormat!==null),z(e.bitDepthLumaMinus8!==null),z(e.bitDepthChromaMinus8!==null),z(e.sequenceParameterSetExt!==null),t.push(252|e.chromaFormat&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.sequenceParameterSetExt.length);for(let n of e.sequenceParameterSetExt){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}}return new Uint8Array(t)},th={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},nh=e=>{try{let t=new lm(Zm(e));if(t.skipBits(1),t.skipBits(2),t.readBits(5)!==7)return null;let n=t.readAlignedByte(),r=t.readAlignedByte(),i=t.readAlignedByte();B(t);let a=1,o=0,s=0,c=0;if((n===100||n===110||n===122||n===244||n===44||n===83||n===86||n===118||n===128)&&(a=B(t),a===3&&(c=t.readBits(1)),o=B(t),s=B(t),t.skipBits(1),t.readBits(1))){for(let e=0;e<(a===3?12:8);e++)if(t.readBits(1)){let n=e<6?16:64,r=8,i=8;for(let e=0;e<n;e++){if(i!==0){let e=hp(t);i=(r+e+256)%256}r=i===0?r:i}}}B(t);let l=B(t);if(l===0)B(t);else if(l===1){t.skipBits(1),hp(t),hp(t);let e=B(t);for(let n=0;n<e;n++)hp(t)}B(t),t.skipBits(1);let u=B(t),d=B(t),f=16*(u+1),p=16*(d+1),m=f,h=p,g=t.readBits(1);if(g||t.skipBits(1),t.skipBits(1),t.readBits(1)){let e=B(t),n=B(t),r=B(t),i=B(t),o,s;if((c===0?a:0)===0)o=1,s=2-g;else{let e=a===3?1:2,t=a===1?2:1;o=e,s=t*(2-g)}m-=o*(e+n),h-=s*(r+i)}let _=2,v=2,y=2,b=0,x={num:1,den:1},S=null,C=null;if(t.readBits(1)){if(t.readBits(1)){let e=t.readBits(8);if(e===255)x={num:t.readBits(16),den:t.readBits(16)};else{let t=th[e];t&&(x=t)}}t.readBits(1)&&t.skipBits(1),t.readBits(1)&&(t.skipBits(3),b=t.readBits(1),t.readBits(1)&&(_=t.readBits(8),v=t.readBits(8),y=t.readBits(8))),t.readBits(1)&&(B(t),B(t)),t.readBits(1)&&(t.skipBits(32),t.skipBits(32),t.skipBits(1));let e=t.readBits(1);e&&rh(t);let n=t.readBits(1);n&&rh(t),(e||n)&&t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(1),B(t),B(t),B(t),B(t),S=B(t),C=B(t))}if(S===null){z(C===null);let e=r&16;if((n===44||n===86||n===100||n===110||n===122||n===244)&&e)S=0,C=0;else{let e=u+1,t=d+1,n=(2-g)*t,r=bm.find(e=>e.level>=i)??pp(bm),a=Math.min(Math.floor(r.maxDpbMbs/(e*n)),16);S=a,C=a}}return z(C!==null),{profileIdc:n,constraintFlags:r,levelIdc:i,frameMbsOnlyFlag:g,chromaFormatIdc:a,bitDepthLumaMinus8:o,bitDepthChromaMinus8:s,codedWidth:f,codedHeight:p,displayWidth:m,displayHeight:h,pixelAspectRatio:x,colourPrimaries:_,matrixCoefficients:y,transferCharacteristics:v,fullRangeFlag:b,numReorderFrames:S,maxDecFrameBuffering:C}}catch(e){return nm._error(`Error parsing AVC SPS:`,e),null}},rh=e=>{let t=B(e);e.skipBits(4),e.skipBits(4);for(let n=0;n<=t;n++)B(e),B(e),e.skipBits(1);e.skipBits(5),e.skipBits(5),e.skipBits(5),e.skipBits(5)},ih=(e,t)=>{if(t.description){let n=(gp(t.description)[21]&3)+1;return Jm(e,n)}return qm(e)},ah=e=>e>>1&63,oh=e=>{try{let t=new lm(Zm(e));t.skipBits(16),t.readBits(4);let n=t.readBits(3),r=t.readBits(1),{general_profile_space:i,general_tier_flag:a,general_profile_idc:o,general_profile_compatibility_flags:s,general_constraint_indicator_flags:c,general_level_idc:l}=ch(t,n);B(t);let u=B(t),d=0;u===3&&(d=t.readBits(1));let f=B(t),p=B(t),m=f,h=p;if(t.readBits(1)){let e=B(t),n=B(t),r=B(t),i=B(t),a=1,o=1,s=d===0?u:0;s===1?(a=2,o=2):s===2&&(a=2,o=1),m-=(e+n)*a,h-=(r+i)*o}let g=B(t),_=B(t);B(t);let v=t.readBits(1)?0:n,y=0;for(let e=v;e<=n;e++)B(t),y=B(t),B(t);B(t),B(t),B(t),B(t),B(t),B(t),t.readBits(1)&&t.readBits(1)&&lh(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(4),t.skipBits(4),B(t),B(t),t.skipBits(1));let b=B(t);if(uh(t,b),t.readBits(1)){let e=B(t);for(let n=0;n<e;n++)B(t),t.skipBits(1)}t.skipBits(1),t.skipBits(1);let x=2,S=2,C=2,ee=0,w=0,T={num:1,den:1};if(t.readBits(1)){let e=fh(t,n);T=e.pixelAspectRatio,x=e.colourPrimaries,S=e.transferCharacteristics,C=e.matrixCoefficients,ee=e.fullRangeFlag,w=e.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:h,pixelAspectRatio:T,colourPrimaries:x,transferCharacteristics:S,matrixCoefficients:C,fullRangeFlag:ee,maxDecFrameBuffering:y+1,spsMaxSubLayersMinus1:n,spsTemporalIdNestingFlag:r,generalProfileSpace:i,generalTierFlag:a,generalProfileIdc:o,generalProfileCompatibilityFlags:s,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:_,minSpatialSegmentationIdc:w}}catch(e){return nm._error(`Error parsing HEVC SPS:`,e),null}},sh=e=>{try{let t=[],n=[],r=[],i=[];for(let a of qm(e)){let o=e.subarray(a.offset,a.offset+a.length),s=ah(o[0]);s===Km.VPS_NUT?t.push(o):s===Km.SPS_NUT?n.push(o):s===Km.PPS_NUT?r.push(o):(s===Km.PREFIX_SEI_NUT||s===Km.SUFFIX_SEI_NUT)&&i.push(o)}if(n.length===0||r.length===0)return null;let a=oh(n[0]);if(!a)return null;let o=0;if(r.length>0){let e=r[0],t=new lm(Zm(e));t.skipBits(16),B(t),B(t),t.skipBits(1),t.skipBits(1),t.skipBits(3),t.skipBits(1),t.skipBits(1),B(t),B(t),hp(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&B(t),hp(t),hp(t),t.skipBits(1),t.skipBits(1),t.skipBits(1),t.skipBits(1);let n=t.readBits(1),i=t.readBits(1);o=!n&&!i?0:n&&!i?2:!n&&i?3:0}let s=[...t.length?[{arrayCompleteness:1,nalUnitType:Km.VPS_NUT,nalUnits:t}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:Km.SPS_NUT,nalUnits:n}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:Km.PPS_NUT,nalUnits:r}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:ah(i[0][0]),nalUnits:i}]:[]];return{configurationVersion:1,generalProfileSpace:a.generalProfileSpace,generalTierFlag:a.generalTierFlag,generalProfileIdc:a.generalProfileIdc,generalProfileCompatibilityFlags:a.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:a.generalConstraintIndicatorFlags,generalLevelIdc:a.generalLevelIdc,minSpatialSegmentationIdc:a.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:a.chromaFormatIdc,bitDepthLumaMinus8:a.bitDepthLumaMinus8,bitDepthChromaMinus8:a.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:a.spsMaxSubLayersMinus1+1,temporalIdNested:a.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:s}}catch(e){return nm._error(`Error building HEVC Decoder Configuration Record:`,e),null}},ch=(e,t)=>{let n=e.readBits(2),r=e.readBits(1),i=e.readBits(5),a=0;for(let t=0;t<32;t++)a=a<<1|e.readBits(1);let o=new Uint8Array(6);for(let t=0;t<6;t++)o[t]=e.readBits(8);let s=e.readBits(8),c=[],l=[];for(let n=0;n<t;n++)c.push(e.readBits(1)),l.push(e.readBits(1));if(t>0)for(let n=t;n<8;n++)e.skipBits(2);for(let n=0;n<t;n++)c[n]&&e.skipBits(88),l[n]&&e.skipBits(8);return{general_profile_space:n,general_tier_flag:r,general_profile_idc:i,general_profile_compatibility_flags:a,general_constraint_indicator_flags:o,general_level_idc:s}},lh=e=>{for(let t=0;t<4;t++)for(let n=0;n<(t===3?2:6);n++)if(!e.readBits(1))B(e);else{let n=Math.min(64,1<<4+(t<<1));t>1&&hp(e);for(let t=0;t<n;t++)hp(e)}},uh=(e,t)=>{let n=[];for(let r=0;r<t;r++)n[r]=dh(e,r,t,n)},dh=(e,t,n,r)=>{let i=0,a=0,o=0;if(t!==0&&(a=e.readBits(1)),a){o=t===n?t-(B(e)+1):t-1,e.readBits(1),B(e);let a=r[o]??0;for(let t=0;t<=a;t++)e.readBits(1)||e.readBits(1);i=r[o]}else{let t=B(e),n=B(e);for(let n=0;n<t;n++)B(e),e.readBits(1);for(let t=0;t<n;t++)B(e),e.readBits(1);i=t+n}return i},fh=(e,t)=>{let n=2,r=2,i=2,a=0,o=0,s={num:1,den:1};if(e.readBits(1)){let t=e.readBits(8);if(t===255)s={num:e.readBits(16),den:e.readBits(16)};else{let e=th[t];e&&(s=e)}}return e.readBits(1)&&e.readBits(1),e.readBits(1)&&(e.readBits(3),a=e.readBits(1),e.readBits(1)&&(n=e.readBits(8),r=e.readBits(8),i=e.readBits(8))),e.readBits(1)&&(B(e),B(e)),e.readBits(1),e.readBits(1),e.readBits(1),e.readBits(1)&&(B(e),B(e),B(e),B(e)),e.readBits(1)&&(e.readBits(32),e.readBits(32),e.readBits(1)&&B(e),e.readBits(1)&&ph(e,!0,t)),e.readBits(1)&&(e.readBits(1),e.readBits(1),e.readBits(1),o=B(e),B(e),B(e),B(e),B(e)),{pixelAspectRatio:s,colourPrimaries:n,transferCharacteristics:r,matrixCoefficients:i,fullRangeFlag:a,minSpatialSegmentationIdc:o}},ph=(e,t,n)=>{let r=!1,i=!1,a=!1;t&&(r=e.readBits(1)===1,i=e.readBits(1)===1,(r||i)&&(a=e.readBits(1)===1,a&&(e.readBits(8),e.readBits(5),e.readBits(1),e.readBits(5)),e.readBits(4),e.readBits(4),a&&e.readBits(4),e.readBits(5),e.readBits(5),e.readBits(5)));for(let t=0;t<=n;t++){let t=e.readBits(1)===1,n=!0;t||(n=e.readBits(1)===1);let o=!1;n?B(e):o=e.readBits(1)===1;let s=1;o||(s=B(e)+1),r&&mh(e,s,a),i&&mh(e,s,a)}},mh=(e,t,n)=>{for(let r=0;r<t;r++)B(e),B(e),n&&(B(e),B(e)),e.readBits(1)},hh=e=>{let t=[];t.push(e.configurationVersion),t.push((e.generalProfileSpace&3)<<6|(e.generalTierFlag&1)<<5|e.generalProfileIdc&31),t.push(e.generalProfileCompatibilityFlags>>>24&255),t.push(e.generalProfileCompatibilityFlags>>>16&255),t.push(e.generalProfileCompatibilityFlags>>>8&255),t.push(e.generalProfileCompatibilityFlags&255),t.push(...e.generalConstraintIndicatorFlags),t.push(e.generalLevelIdc&255),t.push(240|e.minSpatialSegmentationIdc>>8&15),t.push(e.minSpatialSegmentationIdc&255),t.push(252|e.parallelismType&3),t.push(252|e.chromaFormatIdc&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.avgFrameRate>>8&255),t.push(e.avgFrameRate&255),t.push((e.constantFrameRate&3)<<6|(e.numTemporalLayers&7)<<3|(e.temporalIdNested&1)<<2|e.lengthSizeMinusOne&3),t.push(e.arrays.length&255);for(let n of e.arrays){t.push((n.arrayCompleteness&1)<<7|0|n.nalUnitType&63),t.push(n.nalUnits.length>>8&255),t.push(n.nalUnits.length&255);for(let e of n.nalUnits){t.push(e.length>>8&255),t.push(e.length&255);for(let n=0;n<e.length;n++)t.push(e[n])}}return new Uint8Array(t)},(function(e){e[e.audAllowed=0]=`audAllowed`,e[e.beforeFirstVcl=1]=`beforeFirstVcl`,e[e.afterFirstVcl=2]=`afterFirstVcl`,e[e.eoBitstreamAllowed=3]=`eoBitstreamAllowed`,e[e.noMoreDataAllowed=4]=`noMoreDataAllowed`})(gh||={}),_h=function*(e){let t=new lm(e),n=()=>{let e=0;for(let n=0;n<8;n++){let r=t.readAlignedByte();if(e|=(r&127)<<n*7,!(r&128))break;if(n===7&&r&128)return null}return e>=2**32-1?null:e};for(;t.getBitsLeft()>=8;){t.skipBits(1);let r=t.readBits(4),i=t.readBits(1),a=t.readBits(1);t.skipBits(1),i&&t.skipBits(8);let o;if(a){let e=n();if(e===null)return;o=e}else o=Math.floor(t.getBitsLeft()/8);z(t.pos%8==0),yield{type:r,data:e.subarray(t.pos/8,t.pos/8+o)},t.skipBits(o*8)}},vh=e=>{let t=_p(e),n=t.getUint8(9),r=t.getUint16(10,!0),i=t.getUint32(12,!0),a=t.getInt16(16,!0),o=t.getUint8(18),s=null;return o&&(s=e.subarray(19,21+n)),{outputChannelCount:n,preSkip:r,inputSampleRate:i,outputGain:a,channelMappingFamily:o,channelMappingTable:s}},yh=(e,t,n)=>{switch(e){case`avc`:for(let e of Ym(n,t)){let t=n[e.offset],r=Xm(t);if(r>=Gm.NON_IDR_SLICE&&r<=Gm.SLICE_DPC)return`delta`;if(r===Gm.IDR)return`key`;if(r===Gm.SEI&&(!Hp()||Wp()>=144)){let t=n.subarray(e.offset,e.offset+e.length),r=Zm(t),i=1;do{let e=0;for(;;){let t=r[i++];if(t===void 0||(e+=t,t<255))break}let t=0;for(;;){let e=r[i++];if(e===void 0||(t+=e,e<255))break}if(e===6){let e=new lm(r);e.pos=8*i;let t=B(e),n=e.readBits(1);if(t===0&&n===1)return`key`}i+=t}while(i<r.length-1)}}return`delta`;case`hevc`:for(let e of ih(n,t)){let t=ah(n[e.offset]);if(t<Km.BLA_W_LP)return`delta`;if(t<=Km.RSV_IRAP_VCL23)return`key`}return`delta`;case`vp8`:return n[0]&1?`delta`:`key`;case`vp9`:{let e=new lm(n);if(e.readBits(2)!==2)return null;let t=e.readBits(1);return(e.readBits(1)<<1)+t===3&&e.skipBits(1),e.readBits(1)?null:e.readBits(1)===0?`key`:`delta`}case`av1`:{let e=!1;for(let{type:t,data:r}of _h(n))if(t===1){let t=new lm(r);t.skipBits(4),e=!!t.readBits(1)}else if(t===3||t===6||t===7){if(e)return`key`;let t=new lm(r);return t.readBits(1)?null:t.readBits(2)===0?`key`:`delta`}return null}case`prores`:return`key`;default:Dp(e),z(!1)}},(function(e){e[e.STREAMINFO=0]=`STREAMINFO`,e[e.VORBIS_COMMENT=4]=`VORBIS_COMMENT`,e[e.PICTURE=6]=`PICTURE`})(bh||={}),xh=e=>{if(e.length<7||e[0]!==11||e[1]!==119)return null;let t=new lm(e);t.skipBits(16),t.skipBits(16);let n=t.readBits(2);if(n===3)return null;let r=t.readBits(6),i=t.readBits(5);if(i>8)return null;let a=t.readBits(3),o=t.readBits(3);return o&1&&o!==1&&t.skipBits(2),o&4&&t.skipBits(2),o===2&&t.skipBits(2),{fscod:n,bsid:i,bsmod:a,acmod:o,lfeon:t.readBits(1),bitRateCode:Math.floor(r/2)}},new Uint8Array([5,4,65,67,45,51]),new Uint8Array([5,4,69,65,67,51]),Sh=[1,2,3,6],Ch=e=>{if(e.length<6||e[0]!==11||e[1]!==119)return null;let t=new lm(e);t.skipBits(16);let n=t.readBits(2);if(t.skipBits(3),n!==0&&n!==2)return null;let r=t.readBits(11),i=t.readBits(2),a=0,o;i===3?(a=t.readBits(2),o=3):o=t.readBits(2);let s=t.readBits(3),c=t.readBits(1),l=t.readBits(5);if(l<11||l>16)return null;let u=Sh[o],d;return d=i<3?Hm[i]/1e3:Um[a]/1e3,{dataRate:Math.round((r+1)*d/(u*16)),substreams:[{fscod:i,fscod2:a,bsid:l,bsmod:0,acmod:s,lfeon:c,numDepSub:0,chanLoc:0}]}}})))()}var Th,Eh;function Dh(){return(Dh=t((()=>{em(),Th=new Uint8Array,Eh=class e{constructor(e,t,n,r,i=-1,a,o){if(this.data=e,this.type=t,this.timestamp=n,this.duration=r,this.sequenceNumber=i,e===Th&&a===void 0)throw Error(`Internal error: byteLength must be explicitly provided when constructing metadata-only packets.`);if(a===void 0&&(a=e.byteLength),!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==`key`&&t!==`delta`)throw TypeError(`type must be either "key" or "delta".`);if(!Number.isFinite(n))throw TypeError(`timestamp must be a number.`);if(!Number.isFinite(r)||r<0)throw TypeError(`duration must be a non-negative number.`);if(!Number.isFinite(i))throw TypeError(`sequenceNumber must be a number.`);if(!Number.isInteger(a)||a<0)throw TypeError(`byteLength must be a non-negative integer.`);if(o!==void 0&&(typeof o!=`object`||!o))throw TypeError(`sideData, when provided, must be an object.`);if(o?.alpha!==void 0&&!(o.alpha instanceof Uint8Array))throw TypeError(`sideData.alpha, when provided, must be a Uint8Array.`);if(o?.alphaByteLength!==void 0&&(!Number.isInteger(o.alphaByteLength)||o.alphaByteLength<0))throw TypeError(`sideData.alphaByteLength, when provided, must be a non-negative integer.`);this.byteLength=a,this.sideData=o??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===Th}get microsecondTimestamp(){return Math.trunc(Ip*this.timestamp)}get microsecondDuration(){return Math.trunc(Ip*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw TypeError(`This packet does not contain alpha side data.`);if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`Your browser does not support EncodedVideoChunk.`);return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to an audio chunk.`);if(typeof EncodedAudioChunk>`u`)throw Error(`Your browser does not support EncodedAudioChunk.`);return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(t,n){if(!(t instanceof EncodedVideoChunk||t instanceof EncodedAudioChunk))throw TypeError(`chunk must be an EncodedVideoChunk or EncodedAudioChunk.`);let r=new Uint8Array(t.byteLength);return t.copyTo(r),new e(r,t.type,t.timestamp/1e6,(t.duration??0)/1e6,void 0,void 0,n)}clone(t){if(t!==void 0&&(typeof t!=`object`||!t))throw TypeError(`options, when provided, must be an object.`);if(t?.data!==void 0&&!(t.data instanceof Uint8Array))throw TypeError(`options.data, when provided, must be a Uint8Array.`);if(t?.type!==void 0&&t.type!==`key`&&t.type!==`delta`)throw TypeError(`options.type, when provided, must be either "key" or "delta".`);if(t?.timestamp!==void 0&&!Number.isFinite(t.timestamp))throw TypeError(`options.timestamp, when provided, must be a number.`);if(t?.duration!==void 0&&!Number.isFinite(t.duration))throw TypeError(`options.duration, when provided, must be a number.`);if(t?.sequenceNumber!==void 0&&!Number.isFinite(t.sequenceNumber))throw TypeError(`options.sequenceNumber, when provided, must be a number.`);if(t?.sideData!==void 0&&(typeof t.sideData!=`object`||t.sideData===null))throw TypeError(`options.sideData, when provided, must be an object.`);return new e(t?.data??this.data,t?.type??this.type,t?.timestamp??this.timestamp,t?.duration??this.duration,t?.sequenceNumber??this.sequenceNumber,this.byteLength,t?.sideData??this.sideData)}}})))()}var Oh;function kh(){return(kh=t((()=>{Oh=e=>{let t=(e.hasVideo?`video/`:e.hasAudio?`audio/`:`application/`)+(e.isQuickTime?`quicktime`:`mp4`);if(e.codecStrings.length>0){let n=[...new Set(e.codecStrings)];t+=`; codecs="${n.join(`, `)}"`}return t}})))()}var Ah;function jh(){return(jh=t((()=>{um(),xg(),Ah=e=>{let t=e.filePos,n=bg(e,9),r=new lm(n);if(r.readBits(12)!==4095||(r.skipBits(1),r.readBits(2)!==0))return null;let i=r.readBits(1),a=r.readBits(2)+1,o=r.readBits(4);if(o===15)return null;r.skipBits(1);let s=r.readBits(3);if(s===0)throw Error(`ADTS frames with channel configuration 0 are not supported.`);r.skipBits(1),r.skipBits(1),r.skipBits(1),r.skipBits(1);let c=r.readBits(13);r.skipBits(11);let l=r.readBits(2)+1;if(l!==1)throw Error(`ADTS frames with more than one AAC frame are not supported.`);let u=null;return i===1?e.filePos-=2:u=r.readBits(16),{objectType:a,samplingFrequencyIndex:o,channelConfiguration:s,frameLength:c,numberOfAacFrames:l,crcCheck:u,startPos:t}}})))()}var Mh=r(((e,t)=>{t.exports={}})),Nh,Ph,Fh,Ih,Lh,Rh,zh,Bh,Vh,Hh,Uh,Wh,Gh,Kh,qh,Jh,Yh,Xh,Zh,Qh,$h,eg,tg,ng,rg;function ig(){return(ig=t((()=>{em(),rm(),Nh=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},Ph=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),Kp(),Fh=-1/0,Ih=-1/0,Lh=null,typeof FinalizationRegistry<`u`&&(Lh=new FinalizationRegistry(e=>{let t=performance.now();e.type===`video`?(t-Fh>=1e3&&(nm._error(`A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them.`),Fh=t),typeof VideoFrame<`u`&&e.data instanceof VideoFrame&&e.data.close()):(t-Ih>=1e3&&(nm._error(`An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them.`),Ih=t),typeof AudioData<`u`&&e.data instanceof AudioData&&e.data.close())})),Rh=class{constructor(){this._referenceCount=0,this._lastAllocationBuffer=null}},zh=[`I420`,`I420P10`,`I420P12`,`I420A`,`I420AP10`,`I420AP12`,`I422`,`I422P10`,`I422P12`,`I422A`,`I422AP10`,`I422AP12`,`I444`,`I444P10`,`I444P12`,`I444A`,`I444AP10`,`I444AP12`,`NV12`,`RGBA`,`RGBX`,`BGRA`,`BGRX`],Bh=new Set(zh),Vh=class e{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180==0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180==0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(Ip*this.timestamp)}get microsecondDuration(){return Math.trunc(Ip*this.duration)}get hasAlpha(){return this.format&&this.format.includes(`A`)}constructor(t,n){if(this._closed=!1,t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer||ArrayBuffer.isView(t)){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.format===void 0||!Bh.has(n.format))throw TypeError(`init.format must be one of: `+zh.join(`, `));if(!Number.isInteger(n.codedWidth)||n.codedWidth<=0)throw TypeError(`init.codedWidth must be a positive integer.`);if(!Number.isInteger(n.codedHeight)||n.codedHeight<=0)throw TypeError(`init.codedHeight must be a positive integer.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.layout!==void 0){if(!Array.isArray(n.layout))throw TypeError(`init.layout, when provided, must be an array.`);for(let e of n.layout){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Each entry in init.layout must be an object.`);if(!Number.isInteger(e.offset)||e.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(e.stride)||e.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(n.visibleRect!==void 0&&Yp(n.visibleRect,`init.visibleRect`),n.displayWidth!==void 0&&(!Number.isInteger(n.displayWidth)||n.displayWidth<=0))throw TypeError(`init.displayWidth, when provided, must be a positive integer.`);if(n.displayHeight!==void 0&&(!Number.isInteger(n.displayHeight)||n.displayHeight<=0))throw TypeError(`init.displayHeight, when provided, must be a positive integer.`);if(n.displayWidth!==void 0!=(n.displayHeight!==void 0))throw TypeError(`init.displayWidth and init.displayHeight must be either both provided or both omitted.`);this.format=n.format,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0;let e=n.layout??Qh(n.format,n.codedWidth,n.codedHeight),r=n.colorSpace??null;r===null&&(r=this.format===`RGBA`||this.format===`RGBX`||this.format===`BGRA`||this.format===`BGRX`?{primaries:`bt709`,transfer:`iec61966-2-1`,matrix:`rgb`,fullRange:!0}:{primaries:`bt709`,transfer:`bt709`,matrix:`bt709`,fullRange:!1}),this.visibleRect={left:n.visibleRect?.left??0,top:n.visibleRect?.top??0,width:n.visibleRect?.width??n.codedWidth,height:n.visibleRect?.height??n.codedHeight},n.displayWidth===void 0?(this.squarePixelWidth=this.visibleRect.width,this.squarePixelHeight=this.visibleRect.height):(this.squarePixelWidth=this.rotation%180==0?n.displayWidth:n.displayHeight,this.squarePixelHeight=this.rotation%180==0?n.displayHeight:n.displayWidth),this._data=n._doNotCopy?gp(t):gp(t).slice(),this._layout=e,this.colorSpace=new qh(r)}else if(typeof VideoFrame<`u`&&t instanceof VideoFrame){if(n?.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n?.timestamp!==void 0&&!Number.isFinite(n?.timestamp))throw TypeError(`init.timestamp, when provided, must be a number.`);if(n?.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);n?.visibleRect!==void 0&&Yp(n.visibleRect,`init.visibleRect`),this._data=t,this._layout=null,this.format=t.format,this.visibleRect={left:t.visibleRect?.x??0,top:t.visibleRect?.y??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},this.rotation=n?.rotation??0,this.squarePixelWidth=t.displayWidth,this.squarePixelHeight=t.displayHeight,this.timestamp=n?.timestamp??t.timestamp/1e6,this.duration=n?.duration??(t.duration??0)/1e6,this.colorSpace=new qh(t.colorSpace)}else if(typeof HTMLImageElement<`u`&&t instanceof HTMLImageElement||typeof SVGImageElement<`u`&&t instanceof SVGImageElement||typeof ImageBitmap<`u`&&t instanceof ImageBitmap||typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement||typeof HTMLCanvasElement<`u`&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<`u`&&t instanceof OffscreenCanvas){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.visibleRect!==void 0&&Yp(n.visibleRect,`init.visibleRect`),typeof VideoFrame<`u`)return new e(new VideoFrame(t,{timestamp:Math.trunc(n.timestamp*Ip),duration:Math.trunc((n.duration??0)*Ip)||void 0,visibleRect:n.visibleRect&&{x:n.visibleRect.left,y:n.visibleRect.top,width:n.visibleRect.width,height:n.visibleRect.height}}),n);let r=0,i=0;if(`naturalWidth`in t?(r=t.naturalWidth,i=t.naturalHeight):`videoWidth`in t?(r=t.videoWidth,i=t.videoHeight):`width`in t&&(r=Number(t.width),i=Number(t.height)),!r||!i)throw TypeError(`Could not determine dimensions.`);let a=n.visibleRect??{left:0,top:0,width:r,height:i},o=new OffscreenCanvas(a.width,a.height),s=o.getContext(`2d`,{alpha:Bp(),willReadFrequently:!0});if(!s)throw Error(`OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.`);s.drawImage(t,-a.left,-a.top),this._data=o,this._layout=null,this.format=`RGBX`,this.visibleRect={left:0,top:0,width:a.width,height:a.height},this.squarePixelWidth=a.width,this.squarePixelHeight=a.height,this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=new qh({matrix:`rgb`,primaries:`bt709`,transfer:`iec61966-2-1`,fullRange:!0})}else if(t instanceof Rh){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(this._data=t,t._referenceCount++,this.format=t.getFormat(),this.format!==null&&!zh.includes(this.format))throw TypeError(`getFormat() must return a VideoSamplePixelFormat or null.`);if(this.visibleRect={left:0,top:0,width:t.getCodedWidth(),height:t.getCodedHeight()},!Number.isInteger(this.visibleRect.width)||this.visibleRect.width<=0)throw TypeError(`getCodedWidth() must return a positive integer.`);if(!Number.isInteger(this.visibleRect.height)||this.visibleRect.height<=0)throw TypeError(`getCodedHeight() must return a positive integer.`);if(this.squarePixelWidth=t.getSquarePixelWidth(),!Number.isInteger(this.squarePixelWidth)||this.squarePixelWidth<=0)throw TypeError(`getSquarePixelWidth() must return a positive integer.`);if(this.squarePixelHeight=t.getSquarePixelHeight(),!Number.isInteger(this.squarePixelHeight)||this.squarePixelHeight<=0)throw TypeError(`getSquarePixelHeight() must return a positive integer.`);this.rotation=n.rotation??0,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=t.getColorSpace()}else throw TypeError(`Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.`);this.encodeOptions=n?.encodeOptions??{},this.pixelAspectRatio=Jp({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),Lh?.register(this,{type:`video`,data:this._data},this)}clone(){if(this._closed)throw Error(`VideoSample is closed.`);return z(this._data!==null),this._data instanceof Rh?new e(this._data,{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):Jh(this._data)?new e(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,encodeOptions:this.encodeOptions}):this._data instanceof Uint8Array?(z(this._layout),new e(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions,_doNotCopy:!0})):new e(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions})}close(){this._closed||=(Lh?.unregister(this),this._data instanceof Rh?(this._data._referenceCount--,this._data._referenceCount===0&&this._data.close()):Jh(this._data)?this._data.close():this._data=null,!0)}allocationSize(e={}){if(Zh(e),this._closed)throw Error(`VideoSample is closed.`);if((e.format??this.format)==null)throw Error(`Cannot get allocation size when format is null.`);return Jh(this._data)?this._data.allocationSize(e):eg(this,e).allocationSize}async copyTo(t,n={}){if(!Cp(t))throw TypeError(`destination must be an ArrayBuffer or an ArrayBuffer view.`);if(Zh(n),this._closed)throw Error(`VideoSample is closed.`);if((n.format??this.format)==null)throw Error(`Cannot copy video sample data when format is null.`);if(z(this._data!==null),Jh(this._data))return this._data.copyTo(t,n);if(n.format&&![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(this.format)&&[`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(n.format)){if(this._data instanceof Rh){let r={stack:[],error:void 0,hasError:!1};try{let i=Nh(r,await this._data.toRgbSample({timestamp:this.timestamp,duration:this.duration,rotation:this.rotation},n.colorSpace??`srgb`),!1);if(!(i instanceof e))throw TypeError(`toRgbSample() must return a VideoSample.`);if(![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(i.format))throw Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${i.format}' instead.`);return await i.copyTo(t,n)}catch(e){r.error=e,r.hasError=!0}finally{Ph(r)}}else{if(typeof VideoFrame>`u`)throw Error(`For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.`);let e=this.toVideoFrame(),r=await e.copyTo(t,n);return e.close(),r}}let r=eg(this,n);z(this.format);let i=gp(t);if(i.byteLength<r.allocationSize)throw TypeError(`Destination buffer too small. Required: ${r.allocationSize}, Available: ${i.byteLength}`);let a=$h(this.format),o;if(this._data instanceof Rh){let e=this._data.getDataPlanes();if(e instanceof Promise&&(e=await e),!Array.isArray(e)||e.some(e=>!(e.data instanceof Uint8Array)||!Number.isInteger(e.stride)||e.stride<0))throw TypeError(`getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.`);o=e}else if(this._data instanceof Uint8Array)z(this._layout),z(this._layout.length===a.length),o=this._layout.map((e,t)=>{let n=Math.ceil(this.codedHeight/a[t].heightDivisor);return{data:this._data.subarray(e.offset,e.offset+e.stride*n),stride:e.stride}});else{let e=this._data.getContext(`2d`);z(e);let t=e.getImageData(0,0,this.codedWidth,this.codedHeight);o=[{data:gp(t.data),stride:4*this.codedWidth}]}let s=[],c=a.length;for(let e=0;e<c;e++){let t=r.computedLayouts[e],n=o[e].stride,a=o[e].data,c=t.sourceTop*n;c+=t.sourceLeftBytes;let l=t.destinationOffset,u=t.sourceWidthBytes,d={offset:l,stride:t.destinationStride};for(let e=0;e<t.sourceHeight;e++){if(c+u>a.byteLength)throw Error(`Source buffer OOB read.`);if(l+u>i.byteLength)throw Error(`Destination buffer OOB write.`);let e=a.subarray(c,c+u);i.set(e,l),c+=n,l+=t.destinationStride}s.push(d)}if(n.format!==void 0){let e=this.format.startsWith(`RGB`)!==n.format.startsWith(`RGB`),t=this.format.includes(`X`)&&n.format.includes(`A`);if(e||t)for(let n=0;n<r.allocationSize;n+=4){if(e){let e=i[n],t=i[n+2];i[n]=t,i[n+2]=e}t&&(i[n+3]=255)}}return s}toVideoFrame(){if(this._closed)throw Error(`VideoSample is closed.`);if(z(this._data!==null),this._data instanceof Rh){if(this.format===null)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.`);let e=this._data.getDataPlanes();if(e instanceof Promise)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.`);let t=e.reduce((e,t)=>e+t.data.byteLength,0),n=new Uint8Array(t),r=0,i=[];for(let t of e)n.set(t.data,r),i.push(r),r+=t.data.byteLength;return new VideoFrame(n,{format:this.format,layout:e.map((e,t)=>({offset:i[t],stride:e.stride})),codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})}return Jh(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?(z(this._layout),new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,layout:this._layout,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,n,r,i,a,o,s,c){let l=0,u=0,d=this.displayWidth,f=this.displayHeight,p=0,m=0,h=this.displayWidth,g=this.displayHeight;if(a===void 0?(p=t,m=n,r!==void 0&&(h=r,g=i)):(l=t,u=n,d=r,f=i,p=a,m=o,s===void 0?(h=d,g=f):(h=s,g=c)),!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!Number.isFinite(l))throw TypeError(`sx must be a number.`);if(!Number.isFinite(u))throw TypeError(`sy must be a number.`);if(!Number.isFinite(d)||d<0)throw TypeError(`sWidth must be a non-negative number.`);if(!Number.isFinite(f)||f<0)throw TypeError(`sHeight must be a non-negative number.`);if(!Number.isFinite(p))throw TypeError(`dx must be a number.`);if(!Number.isFinite(m))throw TypeError(`dy must be a number.`);if(!Number.isFinite(h)||h<0)throw TypeError(`dWidth must be a non-negative number.`);if(!Number.isFinite(g)||g<0)throw TypeError(`dHeight must be a non-negative number.`);if(this._closed)throw Error(`VideoSample is closed.`);({sx:l,sy:u,sWidth:d,sHeight:f}=this._rotateSourceRegion(l,u,d,f,this.rotation));let _=this.toCanvasImageSource();e.save();let v=p+h/2,y=m+g/2;e.translate(v,y),e.rotate(this.rotation*Math.PI/180);let b=this.rotation%180==0?1:h/g;e.scale(1/b,b),e.drawImage(_,l,u,d,f,-h/2,-g/2,h,g),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit must be 'fill', 'contain', or 'cover'.`);if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`options.rotation, when provided, must be 0, 90, 180, or 270.`);t.crop!==void 0&&Xh(t.crop,`options.`);let n=e.canvas.width,r=e.canvas.height,i=t.rotation??this.rotation,[a,o]=i%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=t.crop;s&&=Yh(s,a,o);let c,l,u,d,{sx:f,sy:p,sWidth:m,sHeight:h}=this._rotateSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??a,t.crop?.height??o,i);if(t.fit===`fill`)c=0,l=0,u=n,d=r;else{let[e,i]=t.crop?[t.crop.width,t.crop.height]:[a,o],s=t.fit===`contain`?Math.min(n/e,r/i):Math.max(n/e,r/i);u=e*s,d=i*s,c=(n-u)/2,l=(r-d)/2}e.save();let g=i%180==0?1:u/d;e.translate(n/2,r/2),e.rotate(i*Math.PI/180),e.scale(1/g,g),e.translate(-n/2,-r/2),e.drawImage(this.toCanvasImageSource(),f,p,m,h,c,l,u,d),e.restore()}_rotateSourceRegion(e,t,n,r,i){return i===90?[e,t,n,r]=[t,this.squarePixelHeight-e-n,r,n]:i===180?[e,t]=[this.squarePixelWidth-e-n,this.squarePixelHeight-t-r]:i===270&&([e,t,n,r]=[this.squarePixelWidth-t-r,e,r,n]),{sx:e,sy:t,sWidth:n,sHeight:r}}_drawWithFitAndMipmapping(e,t,n){let r=e.width,i=e.height,[a,o]=n.rotation%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=n.crop?n.crop.width:a,c=n.crop?n.crop.height:o,l=0;2*r<s&&2*i<c&&(l=Math.floor(Math.log2(Math.min(s/r,c/i))));let u=r*2**l,d=i*2**l,{canvas:f,context:p,isNew:m}=l>0?Kh(u,d):{canvas:e,context:t,isNew:n.targetIsFresh};p.imageSmoothingQuality=`high`,n.fillBlack?(p.fillStyle=`black`,p.fillRect(0,0,u,d)):m||p.clearRect(0,0,u,d),this.drawWithFit(p,{fit:n.fit,rotation:n.rotation,crop:n.crop}),p.globalCompositeOperation=`copy`;for(let e=l;e>1;e--){let t=r*2**e,n=i*2**e;p.drawImage(f,0,0,t,n,0,0,t/2,n/2)}p.globalCompositeOperation=`source-over`,l>0&&(t.imageSmoothingQuality=`high`,t.globalCompositeOperation=`copy`,t.drawImage(f,0,0,2*r,2*i,0,0,r,i),t.globalCompositeOperation=`source-over`)}toCanvasImageSource(){if(this._closed)throw Error(`VideoSample is closed.`);if(z(this._data!==null),this._data instanceof Rh||this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}return this._data}async transform(t){if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(t.width!==void 0&&(!Number.isInteger(t.width)||t.width<=0))throw TypeError(`options.width, when provided, must be a positive integer.`);if(t.height!==void 0&&(!Number.isInteger(t.height)||t.height<=0))throw TypeError(`options.height, when provided, must be a positive integer.`);if(t.roundDimensionsTo!==void 0&&(!Number.isInteger(t.roundDimensionsTo)||t.roundDimensionsTo<=0))throw TypeError(`options.roundDimensionsTo, when provided, must be a positive integer.`);if(t.fit!==void 0&&![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit, when provided, must be one of "fill", "contain", or "cover".`);if(t.width!==void 0&&t.height!==void 0&&t.fit===void 0)throw TypeError(`When both options.width and options.height are provided, options.fit must also be provided.`);if(t.rotate!==void 0&&![0,90,180,270].includes(t.rotate))throw TypeError(`options.rotate, when provided, must be 0, 90, 180 or 270.`);if(t.crop!==void 0&&Xh(t.crop,`options.`),t.alpha!==void 0&&![`keep`,`discard`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'keep' or 'discard'.`);let n=fp(this.rotation+(t.rotate??0)),[r,i]=n%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],a=t.crop;a&&=Yh(a,r,i);let o=a?a.width:r,s=a?a.height:i,c=o/s,l,u;t.width!==void 0&&t.height===void 0?(l=t.width,u=l/c):t.width===void 0&&t.height!==void 0?(u=t.height,l=u*c):t.width!==void 0&&t.height!==void 0?(l=t.width,u=t.height):(l=o,u=s),l=Mp(l,t.roundDimensionsTo??1),u=Mp(u,t.roundDimensionsTo??1);let d={width:l,height:u,fit:t.fit??`fill`,rotation:n,crop:a??{left:0,top:0,width:r,height:i},alpha:t.alpha??`keep`};for(let e of Hh){let t=e(this,d);if(t instanceof Promise&&(t=await t),t!==null)return t}let{canvas:f,context:p,isNew:m}=Kh(d.width,d.height);return this._drawWithFitAndMipmapping(f,p,{fit:d.fit,rotation:d.rotation,crop:d.crop,targetIsFresh:m,fillBlack:d.alpha===`discard`}),new e(f,{timestamp:this.timestamp,duration:this.duration,rotation:0})}setRotation(e){if(![0,90,180,270].includes(e))throw TypeError(`newRotation must be 0, 90, 180, or 270.`);this.rotation=e}setTimestamp(e){if(!Number.isFinite(e))throw TypeError(`newTimestamp must be a number.`);this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw TypeError(`newDuration must be a non-negative number.`);this.duration=e}setEncodeOptions(e){if(!e||typeof e!=`object`)throw TypeError(`newEncodeOptions must be an object.`);this.encodeOptions=e}[Symbol.dispose](){this.close()}},Hh=[],Uh=3,Wh=[],Gh=0,Kh=(e,t)=>{for(let n of Wh)if(n.canvas.width===e&&n.canvas.height===t)return n.age=Gh++,{canvas:n.canvas,context:n.context,isNew:!1};let n;if(typeof OffscreenCanvas<`u`)n=new OffscreenCanvas(e,t);else{if(typeof window>`u`||typeof document>`u`)throw Error(`Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().`);n=document.createElement(`canvas`),n.width=e,n.height=t}let r=n.getContext(`2d`,{alpha:!0,willReadFrequently:!1});if(!r)throw Error(`The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.`);return Wh.length>=Uh&&Wh.splice(qp(Wh,e=>e.age),1),Wh.push({canvas:n,context:r,age:Gh++}),{canvas:n,context:r,isNew:!0}},qh=class{constructor(e){if(e!==void 0){if(!e||typeof e!=`object`)throw TypeError(`init.colorSpace, when provided, must be an object.`);let t=Object.keys(yp);if(e.primaries!=null&&!t.includes(e.primaries))throw TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(`, `)}.`);let n=Object.keys(bp);if(e.transfer!=null&&!n.includes(e.transfer))throw TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(`, `)}.`);let r=Object.keys(xp);if(e.matrix!=null&&!r.includes(e.matrix))throw TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(`, `)}.`);if(e.fullRange!=null&&typeof e.fullRange!=`boolean`)throw TypeError(`init.colorSpace.fullRange, when provided, must be a boolean.`)}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},Jh=e=>typeof VideoFrame<`u`&&e instanceof VideoFrame,Yh=(e,t,n)=>{let r=Math.min(e.left,t),i=Math.min(e.top,n),a=Math.min(e.width,t-r),o=Math.min(e.height,n-i);return z(a>=0),z(o>=0),{left:r,top:i,width:a,height:o}},Xh=(e,t)=>{if(!e||typeof e!=`object`)throw TypeError(t+`crop, when provided, must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(t+`crop.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(t+`crop.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(t+`crop.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(t+`crop.height must be a non-negative integer.`)},Zh=e=>{if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.colorSpace!==void 0&&![`display-p3`,`srgb`].includes(e.colorSpace))throw TypeError(`options.colorSpace, when provided, must be 'display-p3' or 'srgb'.`);if(e.format!==void 0&&typeof e.format!=`string`)throw TypeError(`options.format, when provided, must be a string.`);if(e.layout!==void 0){if(!Array.isArray(e.layout))throw TypeError(`options.layout, when provided, must be an array.`);for(let t of e.layout){if(!t||typeof t!=`object`)throw TypeError(`Each entry in options.layout must be an object.`);if(!Number.isInteger(t.offset)||t.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(t.stride)||t.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(e.rect!==void 0){if(!e.rect||typeof e.rect!=`object`)throw TypeError(`options.rect, when provided, must be an object.`);if(e.rect.x!==void 0&&(!Number.isInteger(e.rect.x)||e.rect.x<0))throw TypeError(`options.rect.x, when provided, must be a non-negative integer.`);if(e.rect.y!==void 0&&(!Number.isInteger(e.rect.y)||e.rect.y<0))throw TypeError(`options.rect.y, when provided, must be a non-negative integer.`);if(e.rect.width!==void 0&&(!Number.isInteger(e.rect.width)||e.rect.width<0))throw TypeError(`options.rect.width, when provided, must be a non-negative integer.`);if(e.rect.height!==void 0&&(!Number.isInteger(e.rect.height)||e.rect.height<0))throw TypeError(`options.rect.height, when provided, must be a non-negative integer.`)}},Qh=(e,t,n)=>{let r=$h(e),i=[],a=0;for(let e of r){let r=Math.ceil(t/e.widthDivisor),o=Math.ceil(n/e.heightDivisor),s=r*e.sampleBytes,c=s*o;i.push({offset:a,stride:s}),a+=c}return i},$h=e=>{let t=(e,t,n,r,i)=>{let a=[{sampleBytes:e,widthDivisor:1,heightDivisor:1},{sampleBytes:t,widthDivisor:n,heightDivisor:r},{sampleBytes:t,widthDivisor:n,heightDivisor:r}];return i&&a.push({sampleBytes:e,widthDivisor:1,heightDivisor:1}),a};switch(e){case`I420`:return t(1,1,2,2,!1);case`I420P10`:case`I420P12`:return t(2,2,2,2,!1);case`I420A`:return t(1,1,2,2,!0);case`I420AP10`:case`I420AP12`:return t(2,2,2,2,!0);case`I422`:return t(1,1,2,1,!1);case`I422P10`:case`I422P12`:return t(2,2,2,1,!1);case`I422A`:return t(1,1,2,1,!0);case`I422AP10`:case`I422AP12`:return t(2,2,2,1,!0);case`I444`:return t(1,1,1,1,!1);case`I444P10`:case`I444P12`:return t(2,2,1,1,!1);case`I444A`:return t(1,1,1,1,!0);case`I444AP10`:case`I444AP12`:return t(2,2,1,1,!0);case`NV12`:return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case`RGBA`:case`RGBX`:case`BGRA`:case`BGRX`:return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:Dp(e),z(!1)}},eg=(e,t)=>{let n={left:0,top:0,width:e.codedWidth,height:e.codedHeight},r=t.rect,i=tg(n,r,e.codedWidth,e.codedHeight,e.format),a=t.layout,o;if(!t.format||t.format===e.format)o=e.format;else if([`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(t.format))o=t.format;else throw Error(`NotSupportedError: Invalid destination format.`);return rg(i,o,a)},tg=(e,t,n,r,i)=>{let a={...e};if(t!==void 0){if(t.width===0||t.height===0)throw TypeError(`visibleRect dimensions cannot be zero.`);if((t.x||0)+(t.width||0)>n)throw TypeError(`visibleRect exceeds codedWidth.`);if((t.y||0)+(t.height||0)>r)throw TypeError(`visibleRect exceeds codedHeight.`);a.x=t.x||0,a.y=t.y||0,a.width=t.width||0,a.height=t.height||0}if(!ng(i,a))throw TypeError(`visibleRect alignment is invalid for the format.`);return a},ng=(e,t)=>{if(e===null)return!0;let n=$h(e);for(let e=0;e<n.length;e++){let r=n[e],i=r.widthDivisor,a=r.heightDivisor;if((t.x||0)%i!==0||(t.y||0)%a!==0)return!1}return!0},rg=(e,t,n)=>{let r=$h(t),i=r.length;if(n!==void 0&&n.length!==i)throw TypeError(`Layout must have ${i} planes.`);let a=0,o=[],s=[];for(let t=0;t<i;t++){let i=r[t],c=i.sampleBytes,l=i.widthDivisor,u=i.heightDivisor,d={destinationOffset:0,destinationStride:0,sourceTop:0,sourceHeight:0,sourceLeftBytes:0,sourceWidthBytes:0};if(d.sourceTop=Math.ceil(Math.trunc(e.y||0)/u),d.sourceHeight=Math.ceil(Math.trunc(e.height||0)/u),d.sourceLeftBytes=Math.floor(Math.trunc(e.x||0)/l)*c,d.sourceWidthBytes=Math.floor(Math.trunc(e.width||0)/l)*c,n!==void 0){let e=n[t];if(e.stride<d.sourceWidthBytes)throw TypeError(`Stride for plane ${t} is too small.`);d.destinationOffset=e.offset,d.destinationStride=e.stride}else d.destinationOffset=a,d.destinationStride=d.sourceWidthBytes;let f=d.destinationStride*d.sourceHeight+d.destinationOffset;if(f>4294967295)throw TypeError(`Allocation size exceeds limit.`);s.push(f),a=Math.max(a,f);for(let e=0;e<t;e++){let n=o[e];if(!(s[t]<=n.destinationOffset||s[e]<=d.destinationOffset))throw TypeError(`Planes overlap.`)}o.push(d)}return{allocationSize:a,computedLayouts:o}}})))()}var ag,og,sg,cg,lg,ug,dg,fg,pg,mg;function hg(){return(hg=t((()=>{Vm(),em(),ig(),ag=e=>{if(!e||typeof e!=`object`)throw TypeError(`Encoding config must be an object.`);if(!hm.includes(e.codec))throw TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${hm.join(`, `)}.`);let t=e.bitrate;if(e.quality===void 0&&t===void 0)throw TypeError(`config.quality must be provided.`);if(e.quality!==void 0&&t!==void 0)throw TypeError(`config.quality and config.bitrate cannot both be provided.`);if(e.quality!==void 0&&!(e.quality instanceof cg))throw TypeError(`config.quality, when provided, must be a Quality.`);if(t!==void 0&&!(t instanceof cg)&&(!Number.isInteger(t)||t<=0))throw TypeError(`config.bitrate, when provided, must be a positive integer or a quality.`);if(e.keyFrameInterval!==void 0&&(!Number.isFinite(e.keyFrameInterval)||e.keyFrameInterval<0))throw TypeError(`config.keyFrameInterval, when provided, must be a non-negative number.`);if(e.sizeChangeBehavior!==void 0&&![`deny`,`passThrough`,`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.`);if(e.transform!==void 0){if(typeof e.transform!=`object`||!e.transform)throw TypeError(`config.transform, when provided, must be an object.`);if(e.transform.width!==void 0&&(!Number.isInteger(e.transform.width)||e.transform.width<=0))throw TypeError(`config.transform.width, when provided, must be a positive integer.`);if(e.transform.height!==void 0&&(!Number.isInteger(e.transform.height)||e.transform.height<=0))throw TypeError(`config.transform.height, when provided, must be a positive integer.`);if(e.transform.fit!==void 0&&![`fill`,`contain`,`cover`].includes(e.transform.fit))throw TypeError(`config.transform.fit, when provided, must be one of "fill", "contain", or "cover".`);if(e.transform.width!==void 0&&e.transform.height!==void 0&&e.transform.fit===void 0&&![`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.`);if(e.transform.fit!==void 0&&[`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior)&&e.transform.fit!==e.sizeChangeBehavior)throw TypeError(`config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.`);if(e.transform.rotate!==void 0&&![0,90,180,270].includes(e.transform.rotate))throw TypeError(`config.transform.rotate, when provided, must be 0, 90, 180 or 270.`);if(e.transform.crop!==void 0&&Xh(e.transform.crop,`config.transform.`),e.transform.process!==void 0&&typeof e.transform.process!=`function`)throw TypeError(`config.transform.process, when provided, must be a function.`);if(e.transform.frameRate!==void 0&&(!Number.isFinite(e.transform.frameRate)||e.transform.frameRate<=0))throw TypeError(`config.transform.frameRate, when provided, must be a finite positive number.`);if(e.transform.force!==void 0&&typeof e.transform.force!=`boolean`)throw TypeError(`config.transform.force, when provided, must be a boolean.`)}if(e.onEncodedPacket!==void 0&&typeof e.onEncodedPacket!=`function`)throw TypeError(`config.onEncodedPacket, when provided, must be a function.`);if(e.onEncoderConfig!==void 0&&typeof e.onEncoderConfig!=`function`)throw TypeError(`config.onEncoderConfig, when provided, must be a function.`);if(e.onEncodedSample!==void 0&&typeof e.onEncodedSample!=`function`)throw TypeError(`config.onEncodedSample, when provided, must be a function.`);og(e.codec,e)},og=(e,t)=>{if(!t||typeof t!=`object`)throw TypeError(`Encoding options must be an object.`);if(t.alpha!==void 0&&![`discard`,`keep`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'discard' or 'keep'.`);let n=t.bitrateMode;if(n!==void 0&&![`constant`,`variable`].includes(n))throw TypeError(`bitrateMode, when provided, must be 'constant' or 'variable'.`);if(t.latencyMode!==void 0&&![`quality`,`realtime`].includes(t.latencyMode))throw TypeError(`latencyMode, when provided, must be 'quality' or 'realtime'.`);if(t.fullCodecString!==void 0&&typeof t.fullCodecString!=`string`)throw TypeError(`fullCodecString, when provided, must be a string.`);if(t.fullCodecString!==void 0&&Am(t.fullCodecString)!==e)throw TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${e}).`);if(t.hardwareAcceleration!==void 0&&![`no-preference`,`prefer-hardware`,`prefer-software`].includes(t.hardwareAcceleration))throw TypeError(`hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.`);if(t.scalabilityMode!==void 0&&typeof t.scalabilityMode!=`string`)throw TypeError(`scalabilityMode, when provided, must be a string.`);if(t.contentHint!==void 0&&typeof t.contentHint!=`string`)throw TypeError(`contentHint, when provided, must be a string.`)},sg=e=>{let t=e.bitrateMode,n=e.quality._toVideoRateControl(e.codec,e.width,e.height,t),r=(t,n,r)=>({codec:e.fullCodecString??Em(e.codec,e.width,e.height,r,e.alpha===`keep`),width:e.width,height:e.height,displayWidth:e.squarePixelWidth,displayHeight:e.squarePixelHeight,bitrate:t,bitrateMode:n,alpha:e.alpha??`discard`,framerate:e.framerate,latencyMode:e.latencyMode,hardwareAcceleration:e.hardwareAcceleration,scalabilityMode:e.scalabilityMode,contentHint:e.contentHint,...jm(e.codec)}),i=[];return n.quantizer!==null&&i.push({config:r(void 0,`quantizer`,n.bitrate),quantizer:n.quantizer}),n.bitrateMode!==`quantizer`&&i.push({config:r(n.bitrate,n.bitrateMode,n.bitrate),quantizer:null}),z(i.length>0),i},cg=class{constructor(e){if((typeof e==`number`||typeof e==`string`)&&(e={quality:e}),!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.bitrateMode!==void 0&&![`constant`,`variable`].includes(e.bitrateMode))throw TypeError(`options.bitrateMode, when provided, must be 'constant' or 'variable'.`);if(`quality`in e){if(typeof e.quality==`string`?!(e.quality in lg):typeof e.quality!=`number`||Number.isNaN(e.quality))throw TypeError(`options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.`);if(e.preferBitrate!==void 0&&typeof e.preferBitrate!=`boolean`)throw TypeError(`options.preferBitrate, when provided, must be a boolean.`);if(`bitrate`in e||`quantizer`in e)throw TypeError(`options.quality cannot be combined with options.bitrate or options.quantizer.`);this._quality=typeof e.quality==`string`?lg[e.quality]:e.quality,this._preferBitrate=e.preferBitrate??!1,this._bitrate=void 0,this._quantizer=void 0}else{if(e.bitrate!==void 0&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw TypeError(`options.bitrate, when provided, must be a positive integer.`);if(e.quantizer!==void 0&&(!Number.isInteger(e.quantizer)||e.quantizer<0))throw TypeError(`options.quantizer, when provided, must be a non-negative integer.`);if(e.bitrate===void 0&&e.quantizer===void 0)throw TypeError(`At least one of options.bitrate or options.quantizer must be set.`);if(`preferBitrate`in e)throw TypeError(`options.preferBitrate can only be combined with options.quality.`);this._quality=void 0,this._preferBitrate=!1,this._bitrate=e.bitrate,this._quantizer=e.quantizer}this._bitrateMode=e.bitrateMode}_toVideoRateControl(e,t,n,r){let i=ug[e],a=null,o=this._bitrateMode??r??`variable`;if(this._quantizer!==void 0){if(!i){if(this._bitrate===void 0)throw Error(`Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`)}else if(this._quantizer<i.min||this._quantizer>i.max){if(this._bitrate===void 0)throw Error(`Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${i.min} and ${i.max}.`)}else a=this._quantizer,this._bitrate===void 0&&(o=`quantizer`)}else this._bitrate===void 0&&i&&!this._preferBitrate&&(z(this._quality!==void 0),a=Ap(Math.round(jp(i.worst,i.best,this._quality)),i.min,i.max));let s;if(this._bitrate!==void 0)s=this._bitrate;else{let r=this._quality;r===void 0&&(z(a!==null&&i),r=Ap((a-i.worst)/(i.best-i.worst),0,1)),s=fg(e,t,n,dg(r))}return{quantizer:a,bitrate:s,bitrateMode:o}}_toVideoBitrate(e,t,n){return this._bitrate===void 0?(z(this._quality!==void 0),fg(e,t,n,dg(this._quality))):this._bitrate}_toAudioBitrate(e){if(gm.includes(e)||e===`flac`)return;if(this._bitrate!==void 0)return this._bitrate;if(this._quality===void 0)throw Error(`This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.`);let t=dg(this._quality),n={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3}[e];if(!n)throw Error(`Unhandled codec: ${e}`);let r=n*t;return e===`aac`?r=[96e3,128e3,16e4,192e3].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e):e===`opus`||e===`vorbis`?r=Math.max(6e3,r):e===`mp3`&&(r=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e)),Math.round(r/1e3)*1e3}},lg={"very-low":0,low:.25,medium:.5,high:.75,"very-high":1},ug={avc:{min:0,max:51,worst:41,best:16},hevc:{min:0,max:51,worst:41,best:16},vp9:{min:0,max:63,worst:52,best:20},av1:{min:0,max:255,worst:208,best:80}},dg=e=>.3*Math.exp(2.5538*e),fg=(e,t,n,r)=>{let i=t*n,a=3e6,o=a*(i/2073600)**.95*{avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2,prores:22e7/a}[e]*r;return Math.ceil(o/1e3)*1e3},pg=(e,t)=>{if(e===`avc`)return{avc:{quantizer:t}};if(e===`hevc`)return{hevc:{quantizer:t}};if(e===`vp9`)return{vp9:{quantizer:t}};if(e===`av1`)return{av1:{quantizer:t}};z(!1)},mg=(e,t)=>{if(e!==void 0)return e;if(t!==void 0)return t instanceof cg?t:new cg({bitrate:t})}})))()}var gg;function _g(){return(_g=t((()=>{gg=[]})))()}var vg,yg,bg;function xg(){return(xg=t((()=>{em(),vg=class e{constructor(e,t,n,r,i){this.bytes=e,this.view=t,this.offset=n,this.start=r,this.end=i,this.bufferPos=r-n}static tempFromBytes(t){return new e(t,_p(t),0,0,t.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(t,n=this.end-t){if(t<this.start||t+n>this.end)throw RangeError(`Slicing outside of original slice.`);return new e(this.bytes,this.view,this.offset,t,t+n)}},yg=(e,t)=>{if(e.filePos<e.start||e.filePos+t>e.end)throw RangeError(`Tried reading [${e.filePos}, ${e.filePos+t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`)},bg=(e,t)=>{yg(e,t);let n=e.bytes.subarray(e.bufferPos,e.bufferPos+t);return e.bufferPos+=t,n}})))()}var Sg;function Cg(){return(Cg=t((()=>{em(),Sg=class{constructor(e){this.mutex=new wp,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateTimestamp(e,t,n){if(t<0)throw Error(`Timestamps must be non-negative (got ${t}s).`);let r=this.trackTimestampInfo.get(e);if(r){if(n&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!n)throw Error(`First packet must be a key packet.`);r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}}}})))()}var wg,Tg;function Eg(){return(Eg=t((()=>{wg=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,Tg=e=>{let t=Math.floor(e/36e5),n=Math.floor(e%36e5/6e4),r=Math.floor(e%6e4/1e3),i=e%1e3;return t.toString().padStart(2,`0`)+`:`+n.toString().padStart(2,`0`)+`:`+r.toString().padStart(2,`0`)+`.`+i.toString().padStart(3,`0`)}})))()}var Dg,V,Og,kg,H,Ag,jg,U,Mg,Ng,Pg,Fg,Ig,Lg,Rg,W,zg,Bg,Vg,G,K,Hg,Ug,Wg,Gg,Kg,qg,Jg,Yg,Xg,Zg,Qg,$g,e_,t_,n_,r_,i_,a_,o_,s_,c_,l_,u_,d_,f_,p_,m_,h_,g_,__,v_,y_,b_,x_,S_,C_,w_,T_,E_,D_,O_,k_,A_,j_,M_,N_,P_,F_,I_,L_,R_,z_,B_,V_,H_,U_,W_,G_,K_,q_,J_,Y_,X_,Z_,Q_,$_,ev,tv,nv,rv,iv,av,ov,sv,cv,lv,uv,dv,fv,pv,mv,hv;function gv(){return(gv=t((()=>{em(),Vm(),Eg(),Av(),wh(),cm(),um(),Dg=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8==7&&this.writer.write(this.helper);e.length%8!=0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let t of e.children)t&&this.writeBox(t);let n=this.writer.getPos(),r=e.size??n-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);z(t!==void 0);let n=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(n)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}},V=new Uint8Array(8),Og=new DataView(V.buffer),kg=e=>[(e%256+256)%256],H=e=>(Og.setUint16(0,e,!1),[V[0],V[1]]),Ag=e=>(Og.setInt16(0,e,!1),[V[0],V[1]]),jg=e=>(Og.setUint32(0,e,!1),[V[1],V[2],V[3]]),U=e=>(Og.setUint32(0,e,!1),[V[0],V[1],V[2],V[3]]),Mg=e=>(Og.setInt32(0,e,!1),[V[0],V[1],V[2],V[3]]),Ng=e=>(Og.setUint32(0,Math.floor(e/2**32),!1),Og.setUint32(4,e,!1),[V[0],V[1],V[2],V[3],V[4],V[5],V[6],V[7]]),Pg=e=>(Og.setInt32(0,Math.floor(e/2**32),!1),Og.setUint32(4,e,!1),[V[0],V[1],V[2],V[3],V[4],V[5],V[6],V[7]]),Fg=e=>(Og.setInt16(0,256*e,!1),[V[0],V[1]]),Ig=e=>(Og.setInt32(0,2**16*e,!1),[V[0],V[1],V[2],V[3]]),Lg=e=>(Og.setInt32(0,2**30*e,!1),[V[0],V[1],V[2],V[3]]),Rg=(e,t)=>{let n=[],r=e;do{let e=r&127;r>>=7,n.length>0&&(e|=128),n.push(e),t!==void 0&&t--}while(r>0||t);return n.reverse()},W=(e,t=!1)=>{let n=Array(e.length).fill(null).map((t,n)=>e.charCodeAt(n));return t&&n.push(0),n},zg=e=>{let t=Math.PI/180*e,n=Math.round(Math.cos(t)),r=Math.round(Math.sin(t));return[n,r,0,-r,n,0,0,0,1]},Bg=zg(0),Vg=e=>[Ig(e[0]),Ig(e[1]),Lg(e[2]),Ig(e[3]),Ig(e[4]),Lg(e[5]),Ig(e[6]),Ig(e[7]),Lg(e[8])],G=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),K=(e,t,n,r,i)=>G(e,[kg(t),jg(n),r??[]],i),Hg=e=>e.isQuickTime?G(`ftyp`,[W(`qt  `),U(512),W(`qt  `)]):e.fragmented?e.cmaf?G(`ftyp`,[W(`iso5`),U(512),W(`iso5`),W(`iso6`),W(`mp41`),W(`cmfc`),W(`dash`)]):G(`ftyp`,[W(`iso5`),U(512),W(`iso5`),W(`iso6`),W(`mp41`)]):G(`ftyp`,[W(`isom`),U(512),W(`isom`),e.holdsAvc?W(`avc1`):[],W(`mp41`)]),Ug=()=>G(`styp`,[W(`iso5`),U(0),W(`iso5`),W(`iso6`),W(`mp41`),W(`cmfc`),W(`dash`)]),Wg=(e,t)=>{let n=e.maxWrittenEndTimestamp-e.minWrittenTimestamp;return Number.isFinite(n)||(n=0),K(`sidx`,1,0,[U(1),U(Ev),Ng(q(e.minWrittenTimestamp,Ev)),Ng(0),H(0),H(1),U(t&2147483647),U(q(n,Ev)),U(0)])},Gg=e=>({type:`mdat`,largeSize:e}),Kg=e=>({type:`free`,size:e}),qg=e=>G(`moov`,void 0,[Jg(e.creationTime,e.trackDatas),...e.trackDatas.map(t=>Xg(t,e.creationTime)),e.isFragmented?B_(e.trackDatas):null,tv(e)]),Jg=(e,t)=>{let n=Math.max(0,...t.map(e=>q(Yg(e),Ev)+q(e.startTimestampOffset??0,Ev))),r=Math.max(0,...t.map(e=>e.track.id))+1,i=!mp(e)||!mp(n),a=i?Ng:U;return K(`mvhd`,+i,0,[a(e),a(e),U(Ev),a(n),Ig(1),Fg(1),Array(10).fill(0),Vg(Bg),Array(24).fill(0),U(r)])},Yg=e=>{if(e.samples.length===0)return 0;let t=1/0,n=-1/0;for(let r=0;r<e.samples.length;r++){let i=e.samples[r];i.timestamp<t&&(t=i.timestamp),i.timestamp+i.duration>n&&(n=i.timestamp+i.duration)}return t===1/0?0:n-t},Xg=(e,t)=>{let n=Ov(e),r=e.startTimestampOffset!==null&&e.startTimestampOffset>0;return G(`trak`,void 0,[Zg(e,t),r?Qg(e,e.startTimestampOffset):null,$g(e,t),n.name===void 0?null:G(`udta`,void 0,[G(`name`,[...vp.encode(n.name)])])])},Zg=(e,t)=>{let n=q(Yg(e),Ev)+q(e.startTimestampOffset??0,Ev),r=!mp(t)||!mp(n),i=r?Ng:U,a;if(e.type===`video`){let t=e.track.metadata.rotation;a=zg(t??0)}else a=Bg;let o=2;e.track.metadata.disposition?.default!==!1&&(o|=1);let s=e.type===`video`?0:e.type===`audio`?1:e.type===`subtitle`?2:Dp(e);return K(`tkhd`,+r,o,[i(t),i(t),U(e.track.id),U(0),i(n),Array(8).fill(0),H(0),H(s),Fg(+(e.type===`audio`)),H(0),Vg(a),Ig(e.type===`video`?e.info.width:0),Ig(e.type===`video`?e.info.height:0)])},Qg=(e,t)=>{let n=q(t,Ev),r=q(Yg(e),Ev),i=!mp(n)||!mp(r),a=i?Ng:U,o=i?Pg:Mg;return G(`edts`,void 0,[K(`elst`,+!!i,0,[U(2),a(n),o(-1),Ig(1),a(r),o(0),Ig(1)])])},$g=(e,t)=>G(`mdia`,void 0,[e_(e,t),r_(!0,t_[e.type],n_[e.type]),i_(e)]),e_=(e,t)=>{let n=q(Yg(e),e.timescale),r=!mp(t)||!mp(n),i=r?Ng:U;return K(`mdhd`,+r,0,[i(t),i(t),U(e.timescale),i(n),H(hv(e.track.metadata.languageCode??`und`)),H(0)])},t_={video:`vide`,audio:`soun`,subtitle:`text`},n_={video:`MediabunnyVideoHandler`,audio:`MediabunnySoundHandler`,subtitle:`MediabunnyTextHandler`},r_=(e,t,n,r=`\0\0\0\0`)=>K(`hdlr`,0,0,[e?W(`mhlr`):U(0),W(t),W(r),U(0),U(0),W(n,!0)]),i_=e=>G(`minf`,void 0,[c_[e.type](),l_(),f_(e)]),a_=()=>K(`vmhd`,0,1,[H(0),H(0),H(0),H(0)]),o_=()=>K(`smhd`,0,0,[H(0),H(0)]),s_=()=>K(`nmhd`,0,0),c_={video:a_,audio:o_,subtitle:s_},l_=()=>G(`dinf`,void 0,[u_()]),u_=()=>K(`dref`,0,0,[U(1)],[d_()]),d_=()=>K(`url `,0,1),f_=e=>{let t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(e=>e.sampleCompositionTimeOffset!==0);return G(`stbl`,void 0,[p_(e),N_(e),t?R_(e):null,t?z_(e):null,F_(e),I_(e),L_(e),P_(e)])},p_=e=>{let t;if(e.type===`video`)t=m_(lv(e.track.source._codec,e.info.decoderConfig.codec),e);else if(e.type===`audio`){let n=dv(e.track.source._codec,e.muxer.isQuickTime);z(n),t=x_(n,e)}else e.type===`subtitle`&&(t=j_(pv[e.track.source._codec],e));return z(t),K(`stsd`,0,0,[U(1)],[t])},m_=(e,t)=>G(e,[[,,,,,,].fill(0),H(1),H(0),H(0),Array(12).fill(0),H(t.info.width),H(t.info.height),U(4718592),U(4718592),U(0),H(1),kg(10),W(`Mediabunny`),Array(21).fill(0),H(t.info.hasAlphaChannel?32:24),Ag(65535)],[uv[t.track.source._codec]?.(t)??null,h_(t),Sp(t.info.decoderConfig.colorSpace)?g_(t):null]),h_=e=>e.info.pixelAspectRatio.num===e.info.pixelAspectRatio.den?null:G(`pasp`,[U(e.info.pixelAspectRatio.num),U(e.info.pixelAspectRatio.den)]),g_=e=>G(`colr`,[W(e.muxer.isQuickTime?`nclc`:`nclx`),H(yp[e.info.decoderConfig.colorSpace.primaries]),H(bp[e.info.decoderConfig.colorSpace.transfer]),H(xp[e.info.decoderConfig.colorSpace.matrix]),e.muxer.isQuickTime?[]:kg(!!e.info.decoderConfig.colorSpace.fullRange<<7)]),__=e=>e.info.decoderConfig&&G(`avcC`,[...gp(e.info.decoderConfig.description)]),v_=e=>e.info.decoderConfig&&G(`hvcC`,[...gp(e.info.decoderConfig.description)]),y_=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig,n=t.codec.split(`.`),r=Number(n[1]),i=Number(n[2]),a=Number(n[3]),o=n[4]?Number(n[4]):1,s=n[8]?Number(n[8]):Number(t.colorSpace?.fullRange??0),c=(a<<4)+(o<<1)+s,l=n[5]?Number(n[5]):t.colorSpace?.primaries?yp[t.colorSpace.primaries]:2,u=n[6]?Number(n[6]):t.colorSpace?.transfer?bp[t.colorSpace.transfer]:2,d=n[7]?Number(n[7]):t.colorSpace?.matrix?xp[t.colorSpace.matrix]:2;return K(`vpcC`,1,0,[kg(r),kg(i),kg(c),kg(l),kg(u),kg(d),H(0)])},b_=e=>G(`av1C`,Dm(e.info.decoderConfig.codec)),x_=(e,t)=>{let n=0,r,i=16,a=gm.includes(t.track.source._codec);if(a){let e=t.track.source._codec,{sampleSize:r}=km(e);i=8*r,i>16&&(n=1)}if(t.muxer.isQuickTime&&(n=1),n===0)r=[[,,,,,,].fill(0),H(1),H(n),H(0),U(0),H(t.info.numberOfChannels),H(i),H(0),H(0),H(t.info.sampleRate<2**16?t.info.sampleRate:0),H(0)];else{let e=a?0:-2;r=[[,,,,,,].fill(0),H(1),H(n),H(0),U(0),H(t.info.numberOfChannels),H(Math.min(i,16)),Ag(e),H(0),H(t.info.sampleRate<2**16?t.info.sampleRate:0),H(0),a?[U(1),U(i/8),U(t.info.numberOfChannels*i/8)]:[U(0),U(0),U(0)],U(2)]}return G(e,r,[fv(t.track.source._codec,t.muxer.isQuickTime)?.(t)??null])},S_=e=>{let t;switch(e.track.source._codec){case`aac`:t=64;break;case`mp3`:t=107;break;case`vorbis`:t=221;break;default:throw Error(`Unhandled audio codec: ${e.track.source._codec}`)}let n=[...kg(t),...kg(21),...jg(0),...U(0),...U(0)];if(e.info.decoderConfig.description){let t=gp(e.info.decoderConfig.description);n=[...n,...kg(5),...Rg(t.byteLength),...t]}return n=[...H(1),...kg(0),...kg(4),...Rg(n.length),...n,...kg(6),...kg(1),...kg(2)],n=[...kg(3),...Rg(n.length),...n],K(`esds`,0,0,n)},C_=e=>G(`wave`,void 0,[w_(e),T_(e),G(`\0\0\0\0`)]),w_=e=>G(`frma`,[W(dv(e.track.source._codec,e.muxer.isQuickTime))]),T_=e=>{let{littleEndian:t}=km(e.track.source._codec);return G(`enda`,[H(+t)])},E_=e=>{let t=e.info.numberOfChannels,n=3840,r=e.info.sampleRate,i=0,a=0,o=new Uint8Array,s=e.info.decoderConfig?.description;if(s){z(s.byteLength>=18);let e=gp(s),c=vh(e);t=c.outputChannelCount,n=c.preSkip,r=c.inputSampleRate,i=c.outputGain,a=c.channelMappingFamily,c.channelMappingTable&&(o=c.channelMappingTable)}return G(`dOps`,[kg(0),kg(t),H(n),U(r),Ag(i),kg(a),...o])},D_=e=>{let t=e.info.decoderConfig?.description;z(t);let n=gp(t);return K(`dfLa`,0,0,[...n.subarray(4)])},O_=e=>{let{littleEndian:t,sampleSize:n}=km(e.track.source._codec),r=+t;return K(`pcmC`,0,0,[kg(r),kg(8*n)])},k_=e=>{z(e.info.primingPacket);let t=xh(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=new Uint8Array(3),r=new lm(n);return r.writeBits(2,t.fscod),r.writeBits(5,t.bsid),r.writeBits(3,t.bsmod),r.writeBits(3,t.acmod),r.writeBits(1,t.lfeon),r.writeBits(5,t.bitRateCode),r.writeBits(5,0),G(`dac3`,[...n])},A_=e=>{z(e.info.primingPacket);let t=Ch(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=16;for(let e of t.substreams)n+=23,e.numDepSub>0?n+=9:n+=1;let r=Math.ceil(n/8),i=new Uint8Array(r),a=new lm(i);a.writeBits(13,t.dataRate),a.writeBits(3,t.substreams.length-1);for(let e of t.substreams)a.writeBits(2,e.fscod),a.writeBits(5,e.bsid),a.writeBits(1,0),a.writeBits(1,0),a.writeBits(3,e.bsmod),a.writeBits(3,e.acmod),a.writeBits(1,e.lfeon),a.writeBits(3,0),a.writeBits(4,e.numDepSub),e.numDepSub>0?a.writeBits(9,e.chanLoc):a.writeBits(1,0);return G(`dec3`,[...i])},j_=(e,t)=>G(e,[[,,,,,,].fill(0),H(1)],[mv[t.track.source._codec](t)]),M_=e=>G(`vttC`,[...vp.encode(e.info.config.description)]),N_=e=>K(`stts`,0,0,[U(e.timeToSampleTable.length),e.timeToSampleTable.map(e=>[U(e.sampleCount),U(e.sampleDelta)])]),P_=e=>{if(e.samples.every(e=>e.type===`key`))return null;let t=[...e.samples.entries()].filter(([,e])=>e.type===`key`);return K(`stss`,0,0,[U(t.length),t.map(([e])=>U(e+1))])},F_=e=>K(`stsc`,0,0,[U(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(e=>[U(e.firstChunk),U(e.samplesPerChunk),U(1)])]),I_=e=>{if(e.type===`audio`&&e.info.requiresPcmTransformation){let{sampleSize:t}=km(e.track.source._codec);return K(`stsz`,0,0,[U(t*e.info.numberOfChannels),U(e.samples.reduce((t,n)=>t+q(n.duration,e.timescale),0))])}return K(`stsz`,0,0,[U(0),U(e.samples.length),e.samples.map(e=>U(e.size))])},L_=e=>e.finalizedChunks.length>0&&pp(e.finalizedChunks).offset>=2**32?K(`co64`,0,0,[U(e.finalizedChunks.length),e.finalizedChunks.map(e=>Ng(e.offset))]):K(`stco`,0,0,[U(e.finalizedChunks.length),e.finalizedChunks.map(e=>U(e.offset))]),R_=e=>K(`ctts`,1,0,[U(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(e=>[U(e.sampleCount),Mg(e.sampleCompositionTimeOffset)])]),z_=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;z(e.compositionTimeOffsetTable.length>0),z(e.samples.length>0);for(let r=0;r<e.compositionTimeOffsetTable.length;r++){let i=e.compositionTimeOffsetTable[r];t=Math.min(t,i.sampleCompositionTimeOffset),n=Math.max(n,i.sampleCompositionTimeOffset)}for(let t=0;t<e.samples.length;t++){let n=e.samples[t];r=Math.min(r,q(n.timestamp,e.timescale)),i=Math.max(i,q(n.timestamp+n.duration,e.timescale))}let a=Math.max(-t,0);return i>=2**31?null:K(`cslg`,0,0,[Mg(a),Mg(t),Mg(n),Mg(r),Mg(i)])},B_=e=>G(`mvex`,void 0,e.map(V_)),V_=e=>K(`trex`,0,0,[U(e.track.id),U(1),U(0),U(0),U(0)]),H_=(e,t)=>G(`moof`,void 0,[U_(e),...t.map(G_)]),U_=e=>K(`mfhd`,0,0,[U(e)]),W_=e=>{let t=0,n=0,r=e.type===`delta`;return n|=+r,t|=r?1:2,t<<24|n<<16|0},G_=e=>G(`traf`,void 0,[K_(e),q_(e),J_(e)]),K_=e=>{z(e.currentChunk);let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],r={duration:n.timescaleUnitsToNextSample,size:n.size,flags:W_(n)};return K(`tfhd`,0,t,[U(e.track.id),U(r.duration),U(r.size),U(r.flags)])},q_=e=>(z(e.currentChunk),K(`tfdt`,1,0,[Ng(q(e.currentChunk.startTimestamp,e.timescale))])),J_=e=>{z(e.currentChunk);let t=e.currentChunk.samples.map(e=>e.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(e=>e.size),r=e.currentChunk.samples.map(W_),i=e.currentChunk.samples.map(t=>q(t.timestamp-t.decodeTimestamp,e.timescale)),a=new Set(t),o=new Set(n),s=new Set(r),c=new Set(i),l=s.size===2&&r[0]!==r[1],u=a.size>1,d=o.size>1,f=!l&&s.size>1,p=c.size>1||[...c].some(e=>e!==0),m=0;return m|=1,m|=4*l,m|=256*u,m|=512*d,m|=1024*f,m|=2048*p,K(`trun`,1,m,[U(e.currentChunk.samples.length),U(e.currentChunk.offset-e.currentChunk.moofOffset||0),l?U(r[0]):[],e.currentChunk.samples.map((e,a)=>[u?U(t[a]):[],d?U(n[a]):[],f?U(r[a]):[],p?Mg(i[a]):[]])])},Y_=e=>G(`mfra`,void 0,[...e.map(X_),Z_()]),X_=e=>K(`tfra`,1,0,[U(e.track.id),U(63),U(e.finalizedChunks.length),e.finalizedChunks.map(t=>[Ng(q(t.samples[0].timestamp,e.timescale)),Ng(t.moofOffset),U(t.trafIndex+1),U(1),U(1)])]),Z_=()=>K(`mfro`,0,0,[U(0)]),Q_=()=>G(`vtte`),$_=(e,t,n,r,i)=>G(`vttc`,void 0,[i===null?null:G(`vsid`,[Mg(i)]),n===null?null:G(`iden`,[...vp.encode(n)]),t===null?null:G(`ctim`,[...vp.encode(Tg(t))]),r===null?null:G(`sttg`,[...vp.encode(r)]),G(`payl`,[...vp.encode(e)])]),ev=e=>G(`vtta`,[...vp.encode(e)]),tv=e=>{let t=[],n=e.format._options.metadataFormat??`auto`,r=e.output._metadataTags;if(n===`mdir`||n===`auto`&&!e.isQuickTime){let e=ov(r);e&&t.push(e)}else if(n===`mdta`){let e=sv(r);e&&t.push(e)}else(n===`udta`||n===`auto`&&e.isQuickTime)&&nv(t,e.output._metadataTags);return t.length===0?null:G(`udta`,void 0,t)},nv=(e,t)=>{for(let{key:n,value:r}of Gp(t))switch(n){case`title`:e.push(rv(`©nam`,r));break;case`description`:e.push(rv(`©des`,r));break;case`artist`:e.push(rv(`©ART`,r));break;case`album`:e.push(rv(`©alb`,r));break;case`albumArtist`:e.push(rv(`albr`,r));break;case`genre`:e.push(rv(`©gen`,r));break;case`date`:e.push(rv(`©day`,r.toISOString().slice(0,10)));break;case`comment`:e.push(rv(`©cmt`,r));break;case`lyrics`:e.push(rv(`©lyr`,r));break;case`raw`:break;case`discNumber`:case`discsTotal`:case`trackNumber`:case`tracksTotal`:case`images`:break;default:Dp(n)}if(t.raw)for(let n in t.raw){let r=t.raw[n];r==null||n.length!==4||e.some(e=>e.type===n)||(typeof r==`string`?e.push(rv(n,r)):r instanceof Uint8Array&&e.push(G(n,Array.from(r))))}},rv=(e,t)=>{let n=vp.encode(t);return G(e,[H(n.length),H(hv(`und`)),Array.from(n)])},iv={"image/jpeg":13,"image/png":14,"image/bmp":27},av=(e,t)=>{let n=[];for(let{key:r,value:i}of Gp(e))switch(r){case`title`:n.push({key:t?`title`:`©nam`,value:cv(i)});break;case`description`:n.push({key:t?`description`:`©des`,value:cv(i)});break;case`artist`:n.push({key:t?`artist`:`©ART`,value:cv(i)});break;case`album`:n.push({key:t?`album`:`©alb`,value:cv(i)});break;case`albumArtist`:n.push({key:t?`album_artist`:`aART`,value:cv(i)});break;case`comment`:n.push({key:t?`comment`:`©cmt`,value:cv(i)});break;case`genre`:n.push({key:t?`genre`:`©gen`,value:cv(i)});break;case`lyrics`:n.push({key:t?`lyrics`:`©lyr`,value:cv(i)});break;case`date`:n.push({key:t?`date`:`©day`,value:cv(i.toISOString().slice(0,10))});break;case`images`:for(let e of i)e.kind===`coverFront`&&n.push({key:`covr`,value:G(`data`,[U(iv[e.mimeType]??0),U(0),Array.from(e.data)])});break;case`trackNumber`:if(t){let t=e.tracksTotal===void 0?i.toString():`${i}/${e.tracksTotal}`;n.push({key:`track`,value:cv(t)})}else n.push({key:`trkn`,value:G(`data`,[U(0),U(0),H(0),H(i),H(e.tracksTotal??0),H(0)])});break;case`discNumber`:t||n.push({key:`disc`,value:G(`data`,[U(0),U(0),H(0),H(i),H(e.discsTotal??0),H(0)])});break;case`tracksTotal`:case`discsTotal`:break;case`raw`:break;default:Dp(r)}if(e.raw)for(let r in e.raw){let i=e.raw[r];i==null||!t&&r.length!==4||n.some(e=>e.key===r)||(typeof i==`string`?n.push({key:r,value:cv(i)}):i instanceof Uint8Array?n.push({key:r,value:G(`data`,[U(0),U(0),Array.from(i)])}):i instanceof im&&n.push({key:r,value:G(`data`,[U(iv[i.mimeType]??0),U(0),Array.from(i.data)])}))}return n},ov=e=>{let t=av(e,!1);return t.length===0?null:K(`meta`,0,0,void 0,[r_(!1,`mdir`,``,`appl`),G(`ilst`,void 0,t.map(e=>G(e.key,void 0,[e.value])))])},sv=e=>{let t=av(e,!0);return t.length===0?null:G(`meta`,void 0,[r_(!1,`mdta`,``),K(`keys`,0,0,[U(t.length)],t.map(e=>G(`mdta`,[...vp.encode(e.key)]))),G(`ilst`,void 0,t.map((e,t)=>{let n=String.fromCharCode(...U(t+1));return G(n,void 0,[e.value])}))])},cv=e=>G(`data`,[U(1),U(0),...vp.encode(e)]),lv=(e,t)=>{switch(e){case`avc`:return t.startsWith(`avc3`)?`avc3`:`avc1`;case`hevc`:return`hvc1`;case`vp8`:return`vp08`;case`vp9`:return`vp09`;case`av1`:return`av01`;case`prores`:return t}},uv={avc:__,hevc:v_,vp8:y_,vp9:y_,av1:b_,prores:null},dv=(e,t)=>{switch(e){case`aac`:return`mp4a`;case`mp3`:return`mp4a`;case`opus`:return`Opus`;case`vorbis`:return`mp4a`;case`flac`:return`fLaC`;case`ulaw`:return`ulaw`;case`alaw`:return`alaw`;case`pcm-u8`:return`raw `;case`pcm-s8`:return`sowt`;case`ac3`:return`ac-3`;case`eac3`:return`ec-3`}if(t)switch(e){case`pcm-s16`:return`sowt`;case`pcm-s16be`:return`twos`;case`pcm-s24`:return`in24`;case`pcm-s24be`:return`in24`;case`pcm-s32`:return`in32`;case`pcm-s32be`:return`in32`;case`pcm-f32`:return`fl32`;case`pcm-f32be`:return`fl32`;case`pcm-f64`:return`fl64`;case`pcm-f64be`:return`fl64`}else switch(e){case`pcm-s16`:return`ipcm`;case`pcm-s16be`:return`ipcm`;case`pcm-s24`:return`ipcm`;case`pcm-s24be`:return`ipcm`;case`pcm-s32`:return`ipcm`;case`pcm-s32be`:return`ipcm`;case`pcm-f32`:return`fpcm`;case`pcm-f32be`:return`fpcm`;case`pcm-f64`:return`fpcm`;case`pcm-f64be`:return`fpcm`}},fv=(e,t)=>{switch(e){case`aac`:return S_;case`mp3`:return S_;case`opus`:return E_;case`vorbis`:return S_;case`flac`:return D_;case`ac3`:return k_;case`eac3`:return A_}if(t)switch(e){case`pcm-s24`:return C_;case`pcm-s24be`:return C_;case`pcm-s32`:return C_;case`pcm-s32be`:return C_;case`pcm-f32`:return C_;case`pcm-f32be`:return C_;case`pcm-f64`:return C_;case`pcm-f64be`:return C_}else switch(e){case`pcm-s16`:return O_;case`pcm-s16be`:return O_;case`pcm-s24`:return O_;case`pcm-s24be`:return O_;case`pcm-s32`:return O_;case`pcm-s32be`:return O_;case`pcm-f32`:return O_;case`pcm-f32be`:return O_;case`pcm-f64`:return O_;case`pcm-f64be`:return O_}return null},pv={webvtt:`wvtt`},mv={webvtt:M_},hv=e=>{z(e.length===3);let t=0;for(let n=0;n<3;n++)t<<=5,t+=e.charCodeAt(n)-96;return t}})))()}var _v;function vv(){return(vv=t((()=>{em(),_v=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw Error(`Can't have multiple Writers for the same Target.`);this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){z(!this.started),this.target._start(),this.started=!0}write(e){z(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return z(this.started&&!this.finalized),this.target._flush()}async finalize(){z(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let n=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<n;)r*=2;if(r!==this.trackedWrites.byteLength){let e=new Uint8Array(r);e.set(this.trackedWrites,0),this.trackedWrites=e}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(1024),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw Error(`Internal error: Can't get tracked writes since nothing was tracked.`);let e={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,e}}})))()}var yv,bv,xv,Sv,Cv,wv;function Tv(){return(Tv=t((()=>{Mh(),em(),yv=class extends Qp{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit(`write`,{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw TypeError(`offset must be a non-negative integer.`);return new Cv(this,e)}},bv=2**16,xv=2**32,Sv=class extends yv{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!=`object`)throw TypeError(`BufferTarget options, when provided, must be an object.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);if(this._options=e,this._supportsResize=`resize`in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(bv,{maxByteLength:xv})}catch{this._buffer=new ArrayBuffer(bv),this._supportsResize=!1}else this._buffer=new ArrayBuffer(bv);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>xv)throw Error(`ArrayBuffer exceeded maximum size of ${xv} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let e=new ArrayBuffer(t),n=new Uint8Array(e);n.set(this._bytes,0),this._buffer=e,this._bytes=n}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit(`finalized`)}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},Cv=class extends yv{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit(`finalized`)}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},wv=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!=`string`)throw TypeError(`rootPath must be a string.`);if(typeof t!=`function`)throw TypeError(`getTarget must be a function.`)}}})))()}var Ev,Dv,Ov,q,kv;function Av(){return(Av=t((()=>{gv(),Cg(),vv(),Tv(),em(),Yv(),Eg(),mm(),Vm(),jh(),xg(),wh(),kh(),Ev=57600,Dv=2082844800,Ov=e=>{let t={},n=e.track;return n.metadata.name!==void 0&&(t.name=n.metadata.name),t},q=(e,t,n=!0)=>{let r=e*t;return n?Math.round(r):r},kv=class extends Sg{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new Sv,this.auxWriter=new _v(this.auxTarget,!1),this.auxBoxWriter=new Dg(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Ep(),this.creationTime=Math.floor(Date.now()/1e3)+Dv,this.finalizedChunks=[],this.wroteFragmentedHeader=!1,this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.formatOptions={...t._options},this.isQuickTime=t instanceof Jv,this.isCmaf=t instanceof qv,this.minimumFragmentDuration=this.formatOptions.minimumFragmentDuration??(t instanceof qv?1/0:1),this.auxWriter.start()}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart=`fragmented`,this.isFragmented=!0):(this.writer=await this.output._getRootWriter(e=>this.formatOptions.fastStart===void 0?e instanceof Sv:this.formatOptions.fastStart===`fragmented`),this.boxWriter=new Dg(this.writer),this.fastStart=this.formatOptions.fastStart??(this.writer.target instanceof Sv&&`in-memory`),this.isFragmented=this.fastStart===`fragmented`),this.isCmaf){if(!this.output._hasInitTarget())throw Error(`CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.`);let e=await this.output._getInitTarget(),t=new _v(e,!0);t.start(),this.initWriter=t,this.initBoxWriter=new Dg(t)}let t=this.output.tracks.some(e=>e.isVideoTrack()&&e.source._codec===`avc`);{let e=this.initBoxWriter??this.boxWriter;if(z(e),this.formatOptions.onFtyp&&e.writer.startTrackingWrites(),e.writeBox(Hg({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.formatOptions.onFtyp){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onFtyp(t,n)}this.ftypSize=e.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!==`in-memory`){if(this.fastStart===`reserve`){for(let e of this.output.tracks)if(e.metadata.maximumPacketCount===void 0)throw Error(`All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.`)}else this.isFragmented||(z(this.writer),z(this.boxWriter),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=Gg(!0),this.boxWriter.writeBox(this.mdat))}await this.writer?.flush();for(let e of this.output.tracks)e.isVideoTrack()&&e.metadata.decoderConfig?this.getVideoTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig}):e.isAudioTrack()&&e.metadata.decoderConfig&&this.getAudioTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig});e()}allTracksAreKnown(){for(let e of this.output.tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(e=>e.type===`video`||e.type===`audio`?e.info.decoderConfig.codec:{webvtt:`wvtt`}[e.track.source._codec]);return Oh({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(e=>e.type===`video`),hasAudio:this.trackDatas.some(e=>e.type===`audio`),codecStrings:e})}getVideoTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Lm(n,e.source._codec),z(n),z(n.decoderConfig);let i={...n.decoderConfig};z(i.codedWidth!==void 0),z(i.codedHeight!==void 0);let a=!1;if(e.source._codec===`avc`&&!i.description){if(!t)throw Error(`No AVC description provided; you must therefore provide a priming packet.`);let e=$m(t.data);if(!e)throw Error(`Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.`);i.description=eh(e),a=!0}else if(e.source._codec===`hevc`&&!i.description){if(!t)throw Error(`No HEVC description provided; you must therefore provide a priming packet.`);let e=sh(t.data);if(!e)throw Error(`Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.`);i.description=hh(e),a=!0}let o=Lp(1/(e.metadata.frameRate??57600),1e6).den,s=i.displayAspectWidth,c=i.displayAspectHeight,l=s===void 0||c===void 0?{num:1,den:1}:Jp({num:s*i.codedHeight,den:c*i.codedWidth}),u=i.codec===`ap4h`||i.codec===`ap4x`,d={muxer:this,track:e,type:`video`,info:{width:i.codedWidth,height:i.codedHeight,pixelAspectRatio:l,decoderConfig:i,requiresAnnexBTransformation:a,hasAlphaChannel:u},timescale:o,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(d),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),d}getAudioTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;zm(n,e.source._codec),z(n),z(n.decoderConfig);let i={...n.decoderConfig},a=!1;if(e.source._codec===`aac`&&!i.description){if(!t)throw Error(`No AAC description provided; you must therefore provide a priming packet.`);let e=Ah(vg.tempFromBytes(t.data));if(!e)throw Error(`Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.`);let n=dm[e.samplingFrequencyIndex],r=fm[e.channelConfiguration];if(n===void 0||r===void 0)throw Error(`Invalid ADTS frame header.`);i.description=pm({objectType:e.objectType,sampleRate:n,numberOfChannels:r}),a=!0}if((e.source._codec===`ac3`||e.source._codec===`eac3`)&&!t)throw Error(`AC-3/E-AC-3 require a priming packet.`);let o={muxer:this,track:e,type:`audio`,info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:i,requiresPcmTransformation:!this.isFragmented&&gm.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:a,primingPacket:t},timescale:i.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1};return this.trackDatas.push(o),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),o}getSubtitleTrackData(e,t){let n=this.trackDatas.find(t=>t.track===e);if(n)return n;Bm(t),z(t),z(t.config);let r={muxer:this,track:e,type:`subtitle`,info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,lastCueEndTimestamp:0,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getVideoTrackData(e,t,n),i=t.data;if(r.info.requiresAnnexBTransformation){let e=[...qm(i)].map(e=>i.subarray(e.offset,e.offset+e.length));if(e.length===0)throw Error(`Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.`);i=Qm(e,4)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=this.createSampleForTrack(r,i,t.timestamp,t.duration,t.type);await this.registerSample(r,a)}finally{r()}}async addEncodedAudioPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getAudioTrackData(e,t,n),i=t.data;if(r.info.requiresAdtsStripping){let e=Ah(vg.tempFromBytes(i));if(!e)throw Error(`Expected ADTS frame, didn't get one.`);let t=e.crcCheck===null?7:9;i=i.subarray(t)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=t.timestamp,o=t.duration;if(r.info.requiresPcmTransformation){let e=km(r.info.decoderConfig.codec).sampleSize*r.info.numberOfChannels;if(o=i.byteLength/e/r.info.sampleRate,r.info.expectedNextPcmPacketTimestamp!==null){let e=a-r.info.expectedNextPcmPacketTimestamp;if(e<.01)a=r.info.expectedNextPcmPacketTimestamp;else{let t=await this.padWithSilence(r,r.info.expectedNextPcmPacketTimestamp,e);a=r.info.expectedNextPcmPacketTimestamp+t}}r.info.expectedNextPcmPacketTimestamp=a+o}let s=this.createSampleForTrack(r,i,a,o,t.type);await this.registerSample(r,s)}finally{r()}}async padWithSilence(e,t,n){let r=q(n,e.timescale);if(n=r/e.timescale,r>0){let{sampleSize:i,silentValue:a}=km(e.info.decoderConfig.codec),o=r*e.info.numberOfChannels,s=new Uint8Array(i*o).fill(a),c=this.createSampleForTrack(e,new Uint8Array(s.buffer),t,n,`key`);await this.registerSample(e,c)}return n}async addSubtitleCue(e,t,n){let r=await this.mutex.acquire();try{let r=this.getSubtitleTrackData(e,n);this.validateTimestamp(r.track,t.timestamp,!0),e.source._codec===`webvtt`&&(r.cueQueue.push(t),await this.processWebVTTCues(r,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){let n=new Set([]);for(let r of e.cueQueue)z(r.timestamp<=t),z(e.lastCueEndTimestamp<=r.timestamp+r.duration),n.add(Math.max(r.timestamp,e.lastCueEndTimestamp)),n.add(r.timestamp+r.duration);let r=[...n].sort((e,t)=>e-t),i=r[0],a=r[1]??i;if(t<a)break;if(e.lastCueEndTimestamp<i){this.auxWriter.seek(0);let t=Q_();this.auxBoxWriter.writeBox(t);let n=this.auxTarget._getSlice(0,this.auxWriter.getPos()),r=this.createSampleForTrack(e,n,e.lastCueEndTimestamp,i-e.lastCueEndTimestamp,`key`);await this.registerSample(e,r),e.lastCueEndTimestamp=i}this.auxWriter.seek(0);for(let t=0;t<e.cueQueue.length;t++){let n=e.cueQueue[t];if(n.timestamp>=a)break;wg.lastIndex=0;let r=wg.test(n.text),o=n.timestamp+n.duration,s=e.cueToSourceId.get(n);if(s===void 0&&a<o&&(s=e.nextSourceId++,e.cueToSourceId.set(n,s)),n.notes){let e=ev(n.notes);this.auxBoxWriter.writeBox(e)}let c=$_(n.text,r?i:null,n.identifier??null,n.settings??null,s??null);this.auxBoxWriter.writeBox(c),o===a&&e.cueQueue.splice(t--,1)}let o=this.auxTarget._getSlice(0,this.auxWriter.getPos()),s=this.createSampleForTrack(e,o,i,a-i,`key`);await this.registerSample(e,s),e.lastCueEndTimestamp=a}}createSampleForTrack(e,t,n,r,i){return{timestamp:n,decodeTimestamp:n,duration:r,data:t,size:t.byteLength,type:i,timescaleUnitsToNextSample:q(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type===`audio`&&e.info.requiresPcmTransformation){this.isFragmented||(e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp);let t=0;for(let n=0;n<e.timestampProcessingQueue.length;n++){let r=e.timestampProcessingQueue[n],i=q(r.duration,e.timescale);t+=i}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:t,sampleDelta:1});else{let n=pp(e.timeToSampleTable);n.sampleCount+=t}e.timestampProcessingQueue.length=0;return}let n=e.timestampProcessingQueue.map(e=>e.timestamp).sort((e,t)=>e-t);this.isFragmented||(e.startTimestampOffset??=n[0]);for(let t=0;t<e.timestampProcessingQueue.length;t++){let r=e.timestampProcessingQueue[t];r.decodeTimestamp=n[t];let i=q(r.timestamp-r.decodeTimestamp,e.timescale),a=q(r.duration,e.timescale);if(e.lastTimescaleUnits!==null){z(e.lastSample);let t=q(r.decodeTimestamp,e.timescale,!1),n=Math.round(t-e.lastTimescaleUnits);if(z(n>=0),e.lastTimescaleUnits+=n,e.lastSample.timescaleUnitsToNextSample=n,!this.isFragmented){let t=pp(e.timeToSampleTable);if(z(t),t.sampleCount===1){t.sampleDelta=n;let r=e.timeToSampleTable[e.timeToSampleTable.length-2];r&&r.sampleDelta===n&&(r.sampleCount++,e.timeToSampleTable.pop(),t=r)}else t.sampleDelta!==n&&(t.sampleCount--,e.timeToSampleTable.push(t={sampleCount:1,sampleDelta:n}));t.sampleDelta===a?t.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let r=pp(e.compositionTimeOffsetTable);z(r),r.sampleCompositionTimeOffset===i?r.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i})}}else e.lastTimescaleUnits=q(r.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i}));e.lastSample=r}if(e.timestampProcessingQueue.length=0,z(e.lastSample),z(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){z(t.type===`key`);let n=q(t.timestamp,e.timescale,!1),r=Math.round(n-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=r}}async registerSample(e,t){t.type===`key`&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart===`reserve`?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart===`reserve`)){let t=e.track.metadata.maximumPacketCount;if(z(t!==void 0),e.samples.length>t)throw Error(`Track #${e.track.id} has already reached the maximum packet count (${t}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!e.currentChunk)n=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let i=this.trackDatas.every(n=>{if(e===n)return t.type===`key`;let r=n.sampleQueue[0];return r?r.type===`key`:n.closed});r>=this.minimumFragmentDuration&&i&&t.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=r>=.5}n&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null,trafIndex:null}),z(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(z(!this.isFragmented),z(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type===`audio`&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((t,n)=>t+q(n.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||pp(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart===`in-memory`){e.currentChunk.offset=0;return}e.currentChunk.offset=this.writer.getPos();for(let t of e.currentChunk.samples)z(t.data),this.writer.write(t.data),t.data=null;await this.writer.flush()}async interleaveSamples(e=!1){if(z(this.isFragmented),!(!e&&!this.allTracksAreKnown()))outer:for(;;){let t=null,n=1/0;for(let r of this.trackDatas){if(!e&&r.sampleQueue.length===0&&!r.closed)break outer;r.sampleQueue.length>0&&r.sampleQueue[0].timestamp<n&&(t=r,n=r.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){if(z(this.isFragmented),!this.wroteFragmentedHeader){this.wroteFragmentedHeader=!0;let e=this.initBoxWriter??this.boxWriter;z(e),this.formatOptions.onMoov&&e.writer.startTrackingWrites(),this.ensureOneEnabledTrack();let t=qg(this);if(e.writeBox(t),this.formatOptions.onMoov){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onMoov(t,n)}if(this.isCmaf){z(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new Dg(this.writer);let e=this.boxWriter.measureBox(Ug()),t=this.boxWriter.measureBox(Wg(this,0));this.segmentHeaderSize=e+t,this.writer.seek(this.segmentHeaderSize)}}z(this.writer),z(this.boxWriter);let t=this.trackDatas.filter(e=>e.currentChunk);if(t.length===0){e&&await this.writer.flush();return}let n=this.nextFragmentNumber++,r=H_(n,t),i=this.writer.getPos(),a=i+this.boxWriter.measureBox(r),o=a+8,s=1/0;for(let e=0;e<t.length;e++){let n=t[e];n.currentChunk.offset=o,n.currentChunk.moofOffset=i,n.currentChunk.trafIndex=e;for(let e of n.currentChunk.samples)o+=e.size;s=Math.min(s,n.currentChunk.startTimestamp)}let c=o-a,l=c>=2**32;if(l)for(let e of t)e.currentChunk.offset+=8;this.formatOptions.onMoof&&this.writer.startTrackingWrites();let u=H_(n,t);if(this.boxWriter.writeBox(u),this.formatOptions.onMoof){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoof(e,t,s)}z(this.writer.getPos()===a),this.formatOptions.onMdat&&this.writer.startTrackingWrites();let d=Gg(l);d.size=c,this.boxWriter.writeBox(d),this.writer.seek(a+(l?16:8));for(let e of t)for(let t of e.currentChunk.samples)this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}for(let e of t)e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk),e.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){this.allTracksAreKnown()?(this.mdat||await this.createFastStartReserveMdat(),await this.addSampleToTrack(e,t)):e.sampleQueue.push(t)}async createFastStartReserveMdat(){z(this.writer),z(this.boxWriter),this.ensureOneEnabledTrack();let e=qg(this),t=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;z(this.ftypSize!==null),this.writer.seek(this.ftypSize+t),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=Gg(!0),this.boxWriter.writeBox(this.mdat);for(let e of this.trackDatas){for(let t of e.sampleQueue)await this.addSampleToTrack(e,t);e.sampleQueue.length=0}}computeSampleTableSizeUpperBound(){z(this.fastStart===`reserve`);let e=0;for(let t of this.trackDatas){let n=t.track.metadata.maximumPacketCount;z(n!==void 0),e+=8*Math.ceil(2/3*n),e+=4*n,e+=8*Math.ceil(2/3*n),e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n}return e}async onTrackClose(e){let t=await this.mutex.acquire(),n=this.trackDatas.find(t=>t.track===e);n&&(n.closed=!0,n.type===`subtitle`&&e.source._codec===`webvtt`&&await this.processWebVTTCues(n,1/0),this.processTimestamps(n)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}ensureOneEnabledTrack(){for(let e of[`video`,`audio`,`subtitle`]){let t=this.trackDatas.filter(t=>t.type===e);if(t.length!==0&&!t.some(e=>e.track.metadata.disposition?.default!==!1)){let e=t[0];e.track.metadata.disposition={...e.track.metadata.disposition,default:!0}}}}async forceFragmentFinalization(){z(this.isFragmented);let e=await this.mutex.acquire();try{for(let e of this.trackDatas)e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);await this.interleaveSamples(!0),await this.finalizeFragment()}finally{e()}}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve(),this.ensureOneEnabledTrack(),!this.mdat&&this.fastStart===`reserve`&&await this.createFastStartReserveMdat();for(let e of this.trackDatas)e.closed=!0,e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let e of this.trackDatas)if(await this.finalizeCurrentChunk(e),e.startTimestampOffset!==null)for(let t=0;t<e.samples.length;t++){let n=e.samples[t];n.timestamp-=e.startTimestampOffset,n.decodeTimestamp-=e.startTimestampOffset}if(z(this.writer),z(this.boxWriter),this.fastStart===`in-memory`){this.mdat=Gg(!1);let e;for(let t=0;t<2;t++){let t=qg(this),n=this.boxWriter.measureBox(t);e=this.boxWriter.measureBox(this.mdat);let r=this.writer.getPos()+n+e;for(let t of this.finalizedChunks){t.offset=r;for(let{data:n}of t.samples)z(n),r+=n.byteLength,e+=n.byteLength}if(r<2**32)break;e>=2**32&&(this.mdat.largeSize=!0)}this.formatOptions.onMoov&&this.writer.startTrackingWrites();let t=qg(this);if(this.boxWriter.writeBox(t),this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=e,this.boxWriter.writeBox(this.mdat);for(let e of this.finalizedChunks)for(let t of e.samples)z(t.data),this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}}else if(this.isFragmented){if(this.isCmaf){let e=this.segmentHeaderSize===null?0:this.writer.getPos()-this.segmentHeaderSize;this.writer.seek(0),this.boxWriter.writeBox(Ug()),this.boxWriter.writeBox(Wg(this,e))}else{let e=this.writer.getPos(),t=Y_(this.trackDatas);this.boxWriter.writeBox(t);let n=this.writer.getPos()-e;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(n)}}else{z(this.mdat);let e=this.boxWriter.offsets.get(this.mdat);z(e!==void 0);let t=this.writer.getPos()-e;if(this.mdat.size=t,this.mdat.largeSize=t>=2**32,this.boxWriter.patchBox(this.mdat),this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}let n=qg(this);if(this.fastStart===`reserve`){z(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);let e=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(Kg(e))}else this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);if(this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}}e()}}})))()}var jv,Mv,Nv,Pv,Fv,Iv,Lv,Rv,zv,Bv,Vv,Hv;function Uv(){return(Uv=t((()=>{Vm(),em(),_g(),Dh(),ig(),hg(),wh(),jv=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},Mv=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),Nv=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1}_ensureValidAdd(){if(!this._connectedTrack)throw Error(`Source is not connected to an output track.`);if(this._connectedTrack.output.state===`canceled`)throw Error(`Output has been canceled.`);if(this._connectedTrack.output.state===`finalizing`||this._connectedTrack.output.state===`finalized`)throw Error(`Output has been finalized.`);if(this._connectedTrack.output.state===`pending`)throw Error(`Output has not started.`);if(this._closed)throw Error(`Source is closed.`)}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw Error(`Cannot call close without connecting the source to an output track.`);if(e.output.state===`pending`)throw Error(`Cannot call close before output has been started.`);this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,e.output.state!==`finalizing`&&e.output.state!==`finalized`&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},Pv=class extends Nv{constructor(e){if(super(),this._connectedTrack=null,!hm.includes(e))throw TypeError(`Invalid video codec '${e}'. Must be one of: ${hm.join(`, `)}.`);this._codec=e}},Fv=(e,t)=>{if(e.metadata.hasOnlyKeyPackets&&t.type!==`key`)throw Error(`Cannot add non-key packets to a hasOnlyKeyPackets video track.`)},Iv=class{setError(e){this.errorSet||=(this.error=e,!0)}constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.emittedEncoderPackets=0,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new Rp,this.customEncoderQueueSize=0,this.defaultEncodeOptions={},this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorSet=!1,this.lastMuxerPromise=Promise.resolve(),this.closed=!1}async add(e,t,n){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let i=this.encodingConfig,a=i.sizeChangeBehavior??`deny`,o=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(o=!0,a===`deny`))throw Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(i.transform?.width!==void 0||i.transform?.height!==void 0||i.transform?.rotate!==void 0||i.transform?.crop!==void 0||i.transform?.force===!0||o&&a!==`passThrough`){let n=i.transform?.width,r=i.transform?.height,s=i.transform?.fit??`fill`;o&&a!==`passThrough`&&(z(this.outputWidth),z(this.outputHeight),z(a!==`deny`),n=this.outputWidth,r=this.outputHeight,s=a);let c=await e.transform({width:n,height:r,roundDimensionsTo:2,crop:i.transform?.crop,rotate:i.transform?.rotate,fit:s,alpha:i.alpha});(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=c.displayWidth,this.outputHeight=c.displayHeight),t&&e.close(),e=c,t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let s=i.transform?.frameRate;if(s!==void 0){let i=e.timestamp+e.duration,a=Np(e.timestamp,s);if(this.frameRateLastSample!==null){if(a<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=i;return}await this.padFrameRate(a,n)}e===r&&(e=e.clone(),t=!0),e.setTimestamp(a),e.setDuration(1/s),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=a,this.frameRateLastEndTimestamp=i}await this.processAndEncode(e,n)}finally{t&&e.close()}}async processAndEncode(e,t){let n=this.encodingConfig,r;if(n.transform?.process){let t=n.transform.process(e);if(t instanceof Promise&&(t=await t),t===null)return;Array.isArray(t)||(t=[t]);let i=[];try{for(let n of t)n instanceof Vh?i.push(n):typeof VideoFrame<`u`&&n instanceof VideoFrame?i.push(new Vh(n)):i.push(new Vh(n,{timestamp:e.timestamp,duration:e.duration}))}catch(n){for(let t of i)t!==e&&t.close();for(let n of t)(n instanceof Vh&&n!==e||typeof VideoFrame<`u`&&n instanceof VideoFrame)&&n.close();throw n}r=i}else r=[e];try{for(let e of r){if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),z(this.encoderInitialized),this.closed)break;let n=this.encodingConfig.keyFrameInterval??2,r=Math.floor(e.timestamp/n),i={...this.defaultEncodeOptions,...e.encodeOptions,...t},a={...i,keyFrame:i.keyFrame===void 0?n===0||r!==this.lastMultipleOfKeyFrameInterval:i.keyFrame};if(this.lastMultipleOfKeyFrameInterval=r,this.encodingConfig.onEncodedSample?.(e),this.customEncoder){this.customEncoderQueueSize++;let t=e.clone(),n=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(t,a)).catch(e=>this.setError(e)).finally(()=>{this.customEncoderQueueSize--,t.close()});this.customEncoderQueueSize>=4&&await n}else{z(this.encoder);let t=e.toVideoFrame(),n=Tp(this.preciseTimings,t.timestamp,e=>e.microsecondTimestamp),r=n===-1?null:this.preciseTimings[n];if(r&&r.microsecondTimestamp===t.timestamp?(r.timestamp!==e.timestamp&&(r.timestampIsValid=!1),r.duration!==e.duration&&(r.durationIsValid=!1)):(this.preciseTimings.splice(n+1,0,{microsecondTimestamp:t.timestamp,timestamp:e.timestamp,duration:e.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),!this.alphaEncoder)try{this.encoder.encode(t,a)}finally{t.close()}else if(t.format&&!t.format.includes(`A`)||this.splitterCreationFailed){this.alphaFrameQueue.push(null);try{this.encoder.encode(t,a)}finally{t.close()}}else{this.splitter||=new Rv;let{colorFrame:e,alphaFrame:n}=await this.splitter.split(t);this.alphaFrameQueue.push(n);try{this.encoder.encode(e,a)}finally{e.close()}}this.encoder.encodeQueueSize>=4&&await new Promise(e=>this.encoder.addEventListener(`dequeue`,e,{once:!0}))}await this.lastMuxerPromise}}finally{for(let t of r)t!==e&&t.close()}}async padFrameRate(e,t){let n=this.encodingConfig.transform.frameRate;z(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*n);for(let e=1;e<r;e++){let r={stack:[],error:void 0,hasError:!1};try{let i=jv(r,this.frameRateLastSample.clone(),!1);i.setTimestamp(this.frameRateLastTimestamp+e/n),i.setDuration(1/n),await this.processAndEncode(i,t)}catch(e){r.error=e,r.hasError=!0}finally{Mv(r)}}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=mg(this.encodingConfig.quality,this.encodingConfig.bitrate);z(t!==void 0);let n=sg({...this.encodingConfig,quality:t,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate}),r=null,i;for(let e of n){let t=e.config;if(this.encodingConfig.onEncoderConfig?.(t),i=gg.find(e=>e.supports(this.encodingConfig.codec,t)),i){r=e;break}if(!(typeof VideoEncoder>`u`)){if(t.alpha=`discard`,this.encodingConfig.alpha===`keep`&&(t.latencyMode=`quality`),(t.width%2==1||t.height%2==1)&&(this.encodingConfig.codec===`avc`||this.encodingConfig.codec===`hevc`))throw Error(`The dimensions ${t.width}x${t.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);try{if((await VideoEncoder.isConfigSupported(t)).supported){r=e;break}}catch{}}}if(!r){if(typeof VideoEncoder>`u`)throw Error(`VideoEncoder is not supported by this browser.`);let e=n[0].config,t=n.map(({config:e,quantizer:t})=>t===null?`${e.bitrate} bps`:`quantizer ${t}`);throw Error(`This specific encoder configuration (${e.codec}, ${t.join(` / `)}, ${e.width}x${e.height}, hardware acceleration: ${e.hardwareAcceleration??`no-preference`}) is not supported by this browser. Consider using another codec or changing your video parameters.`)}let a=r.config;if(r.quantizer!==null&&(this.defaultEncodeOptions=pg(this.encodingConfig.codec,r.quantizer)),i)this.customEncoder=new i,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=a,this.customEncoder.onPacket=(e,t)=>{if(!(e instanceof Eh))throw TypeError(`The first argument passed to onPacket must be an EncodedPacket.`);if(t!==void 0&&(!t||typeof t!=`object`))throw TypeError(`The second argument passed to onPacket must be an object or undefined.`);Fv(this.source._connectedTrack,e),this.encodingConfig.onEncodedPacket?.(e,t),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,e,t).catch(e=>{this.setError(e)})},this.customEncoder.onError=e=>{this.setError(e)},await this.customEncoder.init();else{let e=[],t=[],n=0,r=0,i=(e,t,n)=>{let r={};if(t){let e=new Uint8Array(t.byteLength);t.copyTo(e),r.alpha=e}let i=Eh.fromEncodedChunk(e,r),a=Tp(this.preciseTimings,e.timestamp,e=>e.microsecondTimestamp),o=a===-1?null:this.preciseTimings[a],s=null;this.emittedEncoderPackets===0&&i.type===`delta`&&n?.decoderConfig&&(s=yh(this.encodingConfig.codec,n.decoderConfig,i.data)),(o&&o.microsecondTimestamp===e.timestamp||s!==null)&&(i=i.clone({timestamp:o?.timestampIsValid?o.timestamp:void 0,duration:o?.durationIsValid?o.duration:void 0,type:s??void 0})),Fv(this.source._connectedTrack,i),this.encodingConfig.onEncodedPacket?.(i,n),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,i,n).catch(e=>{this.setError(e)}),this.emittedEncoderPackets++},o=Error(`Encoding error`).stack;if(this.encoder=new VideoEncoder({output:(a,o)=>{if(!this.alphaEncoder){i(a,null,o);return}let s=this.alphaFrameQueue.shift();z(s!==void 0),s?(this.alphaEncoder.encode(s,{...this.defaultEncodeOptions,keyFrame:a.type===`key`}),r++,s.close(),e.push({chunk:a,meta:o})):r===0?i(a,null,o):(t.push(n+r),e.push({chunk:a,meta:o}))},error:e=>{e.stack=o,this.setError(e)}}),this.encoder.configure(a),this.encodingConfig.alpha===`keep`){let o=Error(`Encoding error`).stack;this.alphaEncoder=new VideoEncoder({output:(a,o)=>{r--;let s=e.shift();for(z(s!==void 0),i(s.chunk,a,s.meta),n++;t.length>0&&t[0]===n;){t.shift();let n=e.shift();z(n!==void 0),i(n.chunk,null,n.meta)}},error:e=>{e.stack=o,this.setError(e)}}),this.alphaEncoder.configure(a)}}z(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}async flushAndClose(e){try{if(!e&&(this.checkForEncoderError(),this.frameRateLastSample)){let e=this.encodingConfig.transform.frameRate,t=Np(this.frameRateLastEndTimestamp,e);await this.padFrameRate(t)}this.closed=!0,e||(this.customEncoder?this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()):this.encoder&&(await this.encoder.flush(),await this.alphaEncoder?.flush(),await Xp(25)))}finally{this.closed=!0,this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?await this.customEncoderCallSerializer.call(()=>this.customEncoder.close()).catch(e=>this.setError(e)):this.encoder&&(this.encoder.state!==`closed`&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!==`closed`&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.splitter?.close())}e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.errorSet)throw this.error}},Lv=null,Rv=class{constructor(){this.worker=null,this.pendingRequests=new Map,this.nextRequestId=0}split(e){if(!this.worker){if(!Lv){let e=new Blob([`(${zv.toString()})()`],{type:`application/javascript`});Lv=URL.createObjectURL(e)}this.worker=new Worker(Lv),this.worker.addEventListener(`message`,e=>{let t=e.data,n=this.pendingRequests.get(t.id);n&&(this.pendingRequests.delete(t.id),`error`in t?n.reject(Error(t.error)):n.resolve({colorFrame:t.colorFrame,alphaFrame:t.alphaFrame}))}),this.worker.addEventListener(`error`,e=>{let t=Error(e.message||`Color/alpha splitter worker error.`);for(let e of this.pendingRequests.values())e.reject(t);this.pendingRequests.clear()})}let t=this.nextRequestId++,n=Ep();return this.pendingRequests.set(t,n),this.worker.postMessage({id:t,sourceFrame:e},{transfer:[e]}),n.promise}close(){this.worker?.terminate(),this.worker=null;let e=Error(`Color/alpha splitter closed.`);for(let t of this.pendingRequests.values())t.reject(e);this.pendingRequests.clear()}},zv=()=>{let e=null,t=Promise.resolve();self.addEventListener(`message`,e=>{let{id:r,sourceFrame:i}=e.data;t=t.then(async()=>{try{let{colorFrame:e,alphaFrame:t}=await n(i);self.postMessage({id:r,colorFrame:e,alphaFrame:t},{transfer:[e,t]})}catch(e){self.postMessage({id:r,error:e.message})}finally{i.close()}})});let n=async t=>{let n=t.format;if(!n)throw Error(`CPU color/alpha splitting requires a known VideoFrame format.`);let a=t.allocationSize();if((!e||e.byteLength!==a)&&(e=new Uint8Array(a)),await t.copyTo(e),n===`RGBA`||n===`BGRA`)return r(e,n,t);if(n===`I420A`||n===`I420AP10`||n===`I420AP12`||n===`I422A`||n===`I422AP10`||n===`I422AP12`||n===`I444A`||n===`I444AP10`||n===`I444AP12`)return i(e,n,t);throw Error(`CPU color/alpha splitting does not support format '${n}'.`)},r=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=r*i,o=a+Math.ceil(r/2)*Math.ceil(i/2)*2,s=new Uint8Array(o);for(let t=0,n=3;t<a;t++,n+=4)s[t]=e[n];s.fill(128,a);let c=new VideoFrame(e,{format:t===`RGBA`?`RGBX`:`BGRX`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),l={format:`I420`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[s.buffer]};return{colorFrame:c,alphaFrame:new VideoFrame(s,l)}},i=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=t.includes(`P10`),o=t.includes(`P12`),s=a||o?2:1,c,l;t.startsWith(`I420`)?(c=Math.ceil(r/2),l=Math.ceil(i/2)):t.startsWith(`I422`)?(c=Math.ceil(r/2),l=i):(c=r,l=i);let u=r*i,d=c*l,f=u*s,p=d*s,m=u*s,h=f+p*2,g=t.replace(`A`,``),_=Math.ceil(r/2)*Math.ceil(i/2),v=m+_*s*2,y=new Uint8Array(v),b=h;y.set(e.subarray(b,b+m),0);let x=m,S=a?512:o?2048:128;s===1?y.fill(S,x):new Uint16Array(y.buffer,x,2*_).fill(S);let C=a?`I420P10`:o?`I420P12`:`I420`,ee=new VideoFrame(e.subarray(0,h),{format:g,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),w={format:C,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,transfer:[y.buffer]};return{colorFrame:ee,alphaFrame:new VideoFrame(y,w)}}},Bv=class extends Pv{constructor(e,t){if(!(typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement)&&!(typeof OffscreenCanvas<`u`&&e instanceof OffscreenCanvas))throw TypeError(`canvas must be an HTMLCanvasElement or OffscreenCanvas.`);ag(t),super(t.codec),this._encoder=new Iv(this,t),this._canvas=e}add(e,t=0,n){if(!Number.isFinite(e)||e<0)throw TypeError(`timestamp must be a non-negative number.`);if(!Number.isFinite(t)||t<0)throw TypeError(`duration must be a non-negative number.`);let r=new Vh(this._canvas,{timestamp:e,duration:t});return this._encoder.add(r,!0,n)}_flushAndClose(e){return this._encoder.flushAndClose(e)}},Vv=class extends Nv{constructor(e){if(super(),this._connectedTrack=null,!vm.includes(e))throw TypeError(`Invalid audio codec '${e}'. Must be one of: ${vm.join(`, `)}.`);this._codec=e}},Hv=class extends Nv{constructor(e){if(super(),this._connectedTrack=null,!ym.includes(e))throw TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${ym.join(`, `)}.`);this._codec=e}}})))()}var Wv,Gv,Kv,qv,Jv;function Yv(){return(Yv=t((()=>{Vm(),Av(),Wv=class{getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>hm.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>vm.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>ym.includes(e))}_codecUnsupportedHint(e){return``}_isFragmentedIsobmff(){return!1}},Gv=class extends Wv{constructor(e={}){if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.fastStart!==void 0&&![!1,`in-memory`,`reserve`,`fragmented`].includes(e.fastStart))throw TypeError(`options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.`);if(e.minimumFragmentDuration!==void 0&&(!Number.isFinite(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw TypeError(`options.minimumFragmentDuration, when provided, must be a non-negative number.`);if(e.onFtyp!==void 0&&typeof e.onFtyp!=`function`)throw TypeError(`options.onFtyp, when provided, must be a function.`);if(e.onMoov!==void 0&&typeof e.onMoov!=`function`)throw TypeError(`options.onMoov, when provided, must be a function.`);if(e.onMdat!==void 0&&typeof e.onMdat!=`function`)throw TypeError(`options.onMdat, when provided, must be a function.`);if(e.onMoof!==void 0&&typeof e.onMoof!=`function`)throw TypeError(`options.onMoof, when provided, must be a function.`);if(e.metadataFormat!==void 0&&![`mdir`,`mdta`,`udta`,`auto`].includes(e.metadataFormat))throw TypeError(`options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.`);super(),this._options=e}getSupportedTrackCounts(){let e=2**32-1;return{video:{min:0,max:e},audio:{min:0,max:e},subtitle:{min:0,max:e},total:{min:0,max:e}}}get supportsVideoRotationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}_createMuxer(e){return new kv(e,this)}_isFragmentedIsobmff(){return this._options.fastStart===`fragmented`}},Kv=class extends Gv{constructor(e){super(e)}get _name(){return`MP4`}get fileExtension(){return`.mp4`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...hm,..._m,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...ym]}_codecUnsupportedHint(e){return new Jv().getSupportedCodecs().includes(e)?` Switching to MOV will grant support for this codec.`:``}},qv=class extends Gv{constructor(e){super(e)}get _name(){return`CMAF`}get fileExtension(){return`.m4s`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...hm,..._m,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...ym]}},Jv=class extends Gv{constructor(e){super(e)}get _name(){return`MOV`}get fileExtension(){return`.mov`}get mimeType(){return`video/quicktime`}getSupportedCodecs(){return[...hm,...vm]}_codecUnsupportedHint(e){return new Kv().getSupportedCodecs().includes(e)?` Switching to MP4 will grant support for this codec.`:``}}})))()}var Xv,Zv,Qv,$v,ey,ty,ny,ry;function iy(){return(iy=t((()=>{em(),cm(),Yv(),Uv(),Tv(),vv(),rm(),Dh(),Vm(),Xv=[`video`,`audio`,`subtitle`],Zv=class e{constructor(e,t,n,r,i){this.id=e,this.output=t,this.type=n,this.source=r,this.metadata=i}isVideoTrack(){return this.type===`video`}isAudioTrack(){return this.type===`audio`}isSubtitleTrack(){return this.type===`subtitle`}canBePairedWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrack.`);if(this===t)return!1;let n=Zp(this.metadata.group),r=Zp(t.metadata.group);for(let e of n)if(this.type!==t.type&&r.some(t=>e===t)||r.some(t=>e._pairedGroups.has(t)))return!0;return!1}},Qv=class extends Zv{constructor(e,t,n,r){super(e,t,`video`,n,r)}},$v=class extends Zv{constructor(e,t,n,r){super(e,t,`audio`,n,r)}},ey=class extends Zv{constructor(e,t,n,r){super(e,t,`subtitle`,n,r)}},ty=class e{constructor(){this._pairedGroups=new Set}pairWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrackGroup.`);if(this===t)throw TypeError(`Cannot pair a group with itself.`);this._pairedGroups.add(t),t._pairedGroups.add(this)}},ny=e=>{if(!e||typeof e!=`object`)throw TypeError(`metadata must be an object.`);if(e.languageCode!==void 0&&!Fp(e.languageCode))throw TypeError(`metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.`);if(e.name!==void 0&&typeof e.name!=`string`)throw TypeError(`metadata.name, when provided, must be a string.`);if(e.disposition!==void 0&&sm(e.disposition),e.maximumPacketCount!==void 0&&(!Number.isInteger(e.maximumPacketCount)||e.maximumPacketCount<0))throw TypeError(`metadata.maximumPacketCount, when provided, must be a non-negative integer.`);if(e.group!==void 0&&!(e.group instanceof ty)&&(!Array.isArray(e.group)||e.group.some(e=>!(e instanceof ty))))throw TypeError(`metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.`)},ry=class extends Qp{get target(){let e=`Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.`;if(this._rootTargetPromise)throw TypeError(e);let t=this._getRootTarget();if(t instanceof Promise)throw TypeError(e);return t}constructor(e){if(super(),this.state=`pending`,this.defaultTrackGroup=new ty,this.tracks=[],this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new wp,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(!(e.format instanceof Wv))throw TypeError(`options.format must be an OutputFormat.`);if(!(e.target instanceof yv||e.target instanceof wv))throw TypeError(`options.target must be a Target or a PathedTarget.`);if(e.target instanceof yv&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof yv)&&typeof e.initTarget!=`function`)throw Error(`options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof yv&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){z(this._target instanceof wv);let t=this._target.getTarget(e),n=e=>{if(!(e instanceof yv))throw TypeError(`getTarget must return a Target.`);return e};return t instanceof Promise?t.then(n):n(t)}async _getTarget(e){z(this._target instanceof wv);let t=await this._getTargetValidated(e);return this._emit(`target`,{target:t,request:e,isRoot:e.isRoot}),this.state===`canceled`?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on(`finalized`,()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(z(this._initTarget!==null),this._initTarget instanceof yv)return this._initTarget;let e=await this._initTarget();return this.state===`canceled`?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof yv)return this._emit(`target`,{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),n=t=>(this.state===`canceled`?t._close():this._rememberTarget(t),this._emit(`target`,{target:t,request:e,isRoot:!0}),this._rootTarget=t,t);return t instanceof Promise?this._rootTargetPromise=t.then(n):n(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),n=new _v(t,typeof e==`boolean`?e:e(t));return n.start(),n})()}addVideoTrack(e,t={}){if(!(e instanceof Pv))throw TypeError(`source must be a VideoSource.`);if(ny(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(!this.format.supportsVideoRotationMetadata&&t.rotation)throw Error(`${this.format._name} does not support video rotation metadata.`);if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);if(t.decoderConfig!==void 0&&Lm({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof Eh))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new Qv(this.tracks.length+1,this,e,n))}addAudioTrack(e,t={}){if(!(e instanceof Vv))throw TypeError(`source must be an AudioSource.`);if(ny(t),t.decoderConfig!==void 0&&zm({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof Eh))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new $v(this.tracks.length+1,this,e,n))}addSubtitleTrack(e,t={}){if(!(e instanceof Hv))throw TypeError(`source must be a SubtitleSource.`);ny(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new ey(this.tracks.length+1,this,e,n))}setMetadataTags(e){if(om(e),this.state!==`pending`)throw Error(`Cannot set metadata tags after output has been started or canceled.`);this._metadataTags=e}_addTrack(e){if(this.state!==`pending`)throw Error(`Cannot add track after output has been started or canceled.`);if(e.source._connectedTrack)throw Error(`Source is already used for a track.`);let t=this.format.getSupportedTrackCounts(),n=this.tracks.reduce((t,n)=>t+ +(n.type===e.type),0),r=t[e.type].max;if(n===r)throw Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?``:`s`}.`);let i=t.total.max;if(this.tracks.length===i)throw Error(`${this.format._name} does not support more than ${i} tracks${i===1?``:`s`} in total.`);if(e.isVideoTrack()){let t=this.format.getSupportedVideoCodecs();if(t.length===0)throw Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let t=this.format.getSupportedAudioCodecs();if(t.length===0)throw Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let t=this.format.getSupportedSubtitleCodecs();if(t.length===0)throw Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}return this.tracks.push(e),e.source._connectedTrack=e,e}hasEnoughTracks(){let e=this.format.getSupportedTrackCounts();for(let t of Xv)if(this.tracks.reduce((e,n)=>e+ +(n.type===t),0)<e[t].min)return!1;let t=e.total.min;return!(this.tracks.length<t)}async start(){let e=this.format.getSupportedTrackCounts();for(let t of Xv){let n=this.tracks.reduce((e,n)=>e+ +(n.type===t),0),r=e[t].min;if(n<r)throw Error(r===e[t].max?`${this.format._name} requires exactly ${r} ${t} track${r===1?``:`s`}.`:`${this.format._name} requires at least ${r} ${t} track${r===1?``:`s`}.`)}let t=e.total.min;if(this.tracks.length<t)throw Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?``:`s`}.`:`${this.format._name} requires at least ${t} track${t===1?``:`s`}.`);if(this.state===`canceled`)throw Error(`Output has been canceled.`);return this._startPromise?(nm._warn(`Output has already been started.`),this._startPromise):this._startPromise=(async()=>{this.state=`started`;let e=this._mutex.acquire();try{await this._muxer.start();let e=this.tracks.map(e=>e.source._start());await Promise.all(e)}finally{(await e)()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this._cancelPromise)return nm._warn(`Output has already been canceled.`),this._cancelPromise;if(this.state===`finalizing`||this.state===`finalized`){this.state===`finalized`&&nm._warn(`Output has already been finalized.`);return}return this._cancelPromise=(async()=>{this.state=`canceled`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!0));await Promise.all(e),await Promise.all([...this._unfinalizedTargets].map(e=>e._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state===`pending`)throw Error(`Cannot finalize before starting.`);if(this.state===`canceled`)throw Error(`Cannot finalize after canceling.`);return this._finalizePromise?(nm._warn(`Output has already been finalized.`),this._finalizePromise):this._finalizePromise=(async()=>{this.state=`finalizing`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(e),await this._muxer.finalize(),this._rootWriterPromise){let e=await this._rootWriterPromise;e.finalized||(await e.flush(),await e.finalize())}this._onFinalize&&await this._onFinalize(),this.state=`finalized`}finally{await Promise.all([...this._unfinalizedTargets].map(e=>e._close().catch(()=>{}))),this._unfinalizedTargets.clear(),e()}})()}}})))()}var ay;function oy(){return(oy=t((()=>{iy(),Tv(),Yv(),Uv(),P(),ay=class{_engine;constructor(e){this._engine=e}async export(e,t){let{fps:n,duration:r,resolution:i,bitrate:a=8e6}=e,o=Math.ceil(r/60*n),s=this._engine.canvas,c=this._engine.renderer.resolution.clone();this._engine.setSize(i);let l=this._engine.createView(),u=new Sv,d=new ry({format:new Kv,target:u}),f=new Bv(s,{codec:`avc`,bitrate:a,keyFrameInterval:2});d.addVideoTrack(f);try{await d.start();for(let e=0;e<o;e++)this._engine.updateOffline(e,n),await pn(),this._engine.render(l),await f.add(e/n,1/n),t&&t({current:e+1,total:o,phase:`encoding`}),e%10==0&&await new Promise(e=>setTimeout(e,0));t&&t({current:o,total:o,phase:`finalizing`}),await d.finalize()}finally{l.dispose(),this._engine.setSize(c)}return t&&t({current:o,total:o,phase:`done`}),new Blob([u.buffer],{type:`video/mp4`})}static download(e,t=`scene.mp4`){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}}})))()}var sy;function cy(){return(cy=t((()=>{P(),vf(),sy=class{_draw;_maskMaterial;_selectedPass;_activePass;constructor(e){this._draw=e,this._maskMaterial=e.materials.mask(),this._selectedPass=this._createPass(_f),this._activePass=this._createPass(gf)}_createPass(e){let t=this._draw.createTarget();return{maskTarget:t,outline:this._draw.recipes.outline(t,e)}}render(e,t,n,r){if(!r)return;let i=[];for(let e of t)e!==n&&e.getComponent(M)&&i.push(e);this._renderPass(e,this._selectedPass,i,r),n&&n.getComponent(M)&&this._renderPass(e,this._activePass,[n],r)}_renderPass(e,t,n,r){n.length!==0&&(this._draw.renderEntities({view:e,camera:r,entities:n,target:t.maskTarget,useSceneDepth:!0,materialOverride:this._maskMaterial,depthCompare:`lequal`}),this._draw.renderFullscreen(e,t.outline,null))}}})))()}var ly,uy,dy,fy;function py(){return(py=t((()=>{k(),P(),Wf(),Zf(),ly=e=>e.pointerType===`mouse`?e.button===0?`mouseLeft`:e.button===2?`mouseRight`:null:`touch`,uy=12,dy=12,fy=class{_raycaster;_pointerDownPos;_pointerDownButton;_gizmoDragging;_gizmoTargets;_lastClickNDC;_lastClickCandidateUUIDs;_lastClickCycleIndex;_disposeListeners;constructor(e){let{engine:t,editorCamera:n,gizmoManager:r,helperManager:i,api:a,getTransformSelection:o,isEntitySelectable:s,isGizmoVisible:c,getHelperVisibility:l,onSelectEntity:u,onToggleEntity:d,isModalActive:f,onEscapeToEditorCamera:p}=e;this._raycaster=new un,this._pointerDownPos=null,this._pointerDownButton=null,this._gizmoDragging=!1,this._gizmoTargets=null,this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1;let m=e.canvas,h=()=>n.getCameraEntity(t),g=(e,t)=>{let n=t.getComponentsByTag(`camera`)[0];if(!n)return null;let r=new D(e.x,e.y,e.z,1);return r.applyMatrix4(n.viewMatrix).applyMatrix4(n.projectionMatrix),r.w<=0?null:new D(r.x/r.w,r.y/r.w)},_=new un,v=e=>{let n=this._raycaster.ray.origin,r=e.x-n.x,i=e.y-n.y,a=e.z-n.z,o=Math.sqrt(r*r+i*i+a*a);if(o<1e-4)return!1;_.ray.origin.copy(n),_.ray.direction.set(r/o,i/o,a/o);let s=_.intersectEntities(t.root);for(let e of s)if(e.entity.initiator!==`god`)return e.distance<o-.001;return!1},y=new un,b=new D,x=(e,t)=>{for(let[n,r]of[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]])if(b.set(n,r),y.setFromCamera(b,t),y.intersectEntities(e).length===0)return!1;return!0},S=(e,t,n,r)=>{for(let i of e.getWorldSegments()){let e=g(i.a,n),a=g(i.b,n);if(!e||!a)continue;let o=(e.x-t.x)*r.width*.5,s=(e.y-t.y)*r.height*.5,c=(a.x-t.x)*r.width*.5,l=(a.y-t.y)*r.height*.5,u=c-o,d=l-s,f=u*u+d*d,p=f>0?Math.max(0,Math.min(1,-(o*u+s*d)/f)):0,m=o+u*p,h=s+d*p;if(Math.sqrt(m*m+h*h)<=dy)return!0}return!1},C=e=>{let t=e;for(;t;){if(t.cloneSource)return t.cloneSource;t=t.parent}return e},ee=e=>{let r=h();if(!r)return[];this._raycaster.setFromCamera(e,r);let a=[],o=new Set;for(let e of this._raycaster.intersectEntities(t.root)){let t=C(e.entity);t.initiator!==`god`&&s(t)&&(o.has(t.uuid)||(o.add(t.uuid),a.push({entity:t,distance:e.distance,type:`mesh`})))}let c=a.length>0?a[0].distance:1/0,u=[],d=[],f=new Set,p=i.getHelpers(),_=l(),y=Vf(m);for(let n of p){if(!i.isVisible(n,_))continue;let a=t.root.findEntityByUUID(n.targetEntityUUID);if(!a||!s(a))continue;if(n.type===`empty`){if(!S(n,e,r,y))continue;f.add(n.targetEntityUUID);let t=n.entity.matrixWorld.elm,i=t[12]-this._raycaster.ray.origin.x,o=t[13]-this._raycaster.ray.origin.y,s=t[14]-this._raycaster.ray.origin.z,l=Math.sqrt(i*i+o*o+s*s),p={entity:a,distance:l,type:`helper`};l<=c?u.push(p):d.push(p);continue}let o=this._raycaster.intersectEntities(n.hitAreaEntity);if(o.length===0)continue;f.add(n.targetEntityUUID);let l={entity:a,distance:o[0].distance,type:`helper`};if(x(n.hitAreaEntity,r)){S(n,e,r,y)&&u.push(l);continue}o[0].distance<=c?u.push(l):d.push(l)}n.view===`camera`&&Math.min((1-Math.abs(e.x))*y.width*.5,(1-Math.abs(e.y))*y.height*.5)<=dy&&s(r)&&u.push({entity:r,distance:0,type:`helper`}),u.sort((e,t)=>e.distance-t.distance),d.sort((e,t)=>e.distance-t.distance);let b=[];for(let{targetEntityUUID:n}of p){if(f.has(n))continue;let i=t.root.findEntityByUUID(n);if(!i||!s(i))continue;let a=i.matrixWorld.elm,o=new D(a[12],a[13],a[14]),c=g(o,r);if(!c)continue;let l=(c.x-e.x)*y.width*.5,u=(c.y-e.y)*y.height*.5,d=Math.sqrt(l*l+u*u);if(d>uy||v(o))continue;let p=o.x-this._raycaster.ray.origin.x,m=o.y-this._raycaster.ray.origin.y,h=o.z-this._raycaster.ray.origin.z;b.push({candidate:{entity:i,distance:Math.sqrt(p*p+m*m+h*h),type:`helper`},screenDistance:d})}return b.sort((e,t)=>e.screenDistance-t.screenDistance),[...u,...b.map(e=>e.candidate),...a,...d]},w=()=>{let e=r.activeGizmo;if(!e||!e.entity.visible||!c())return null;let t=null;for(let{handle:n,entity:r}of e.getHandleEntities()){let e=this._raycaster.intersectEntities(r);e.length>0&&(!t||e[0].distance<t.distance)&&(t={handle:n,distance:e[0].distance})}return t},T=e=>{if(f())return;let t=ly(e);if(t){if(n.preview){e.target.setPointerCapture(e.pointerId),this._pointerDownPos=new D(e.clientX,e.clientY),this._pointerDownButton=t;return}if(!(e.pointerType===`touch`&&this._gizmoDragging)&&(e.target.setPointerCapture(e.pointerId),this._pointerDownPos=new D(e.clientX,e.clientY),this._pointerDownButton=t,t!==`mouseRight`&&r.activeGizmo&&r.activeGizmo.entity.visible&&c())){let t=Hf(m,e.clientX,e.clientY),i=h();if(i){this._raycaster.setFromCamera(t,i);let e=w(),a=o();e&&a.entities.length>0&&(this._gizmoDragging=!0,n.orbitControls.enabled=!1,this._gizmoTargets=new Yf(a.entities,a.active),r.activeGizmo.startDrag(e.handle,this._raycaster.ray))}}}},te=e=>{if(f())return;let t=this._pointerDownButton!==`mouseRight`;if((n.preview||n.view===`camera`)&&this._pointerDownPos&&t&&!this._gizmoDragging){let t=e.clientX-this._pointerDownPos.x,n=e.clientY-this._pointerDownPos.y;Math.sqrt(t*t+n*n)>5&&p()}if(n.preview)return;let i=Hf(m,e.clientX,e.clientY),a=h();if(a){if(this._raycaster.setFromCamera(i,a),this._gizmoDragging){let e=this._gizmoTargets,t=r.activeGizmo.updateDrag(this._raycaster.ray);if(!e||!t)return;t.translate?e.translate(t.translate):t.rotate?e.rotate(t.rotate):t.scale&&e.scale(t.scale);return}if(r.activeGizmo&&r.activeGizmo.entity.visible&&c()){let e=w();r.activeGizmo.setHover(e?e.handle:null)}}},ne=e=>{if(f())return;if(this._gizmoDragging){if(r.activeGizmo.endDrag(),this._gizmoDragging=!1,n.orbitControls.enabled=n.usingEditorCamera,this._gizmoTargets){let e=this._gizmoTargets.buildCommand();e&&a.commandManager.execute(e,{merge:!1})}this._gizmoTargets=null,this._pointerDownPos=null,this._pointerDownButton=null;return}if(!this._pointerDownPos)return;let t=e.clientX-this._pointerDownPos.x,i=e.clientY-this._pointerDownPos.y,o=Math.sqrt(t*t+i*i),s=this._pointerDownButton;if(this._pointerDownPos=null,this._pointerDownButton=null,o>5||s===`mouseLeft`)return;let c=Hf(m,e.clientX,e.clientY);if(!h())return;let l=ee(c);if(e.shiftKey&&s===`mouseRight`){l.length>0&&d(l[0].entity);return}if(l.length===0){this._lastClickNDC=null,this._lastClickCandidateUUIDs=[],this._lastClickCycleIndex=-1,u(null);return}let p=.02,g=this._lastClickNDC&&Math.abs(c.x-this._lastClickNDC.x)<p&&Math.abs(c.y-this._lastClickNDC.y)<p,_=l.map(e=>e.entity.uuid),v=g&&_.length===this._lastClickCandidateUUIDs.length&&_.every((e,t)=>e===this._lastClickCandidateUUIDs[t]),y=0;v&&l.length>1&&(y=(this._lastClickCycleIndex+1)%l.length),this._lastClickNDC=new D(c.x,c.y),this._lastClickCandidateUUIDs=_,this._lastClickCycleIndex=y,u(l[y].entity)};m.addEventListener(`pointerdown`,T),m.addEventListener(`pointermove`,te),m.addEventListener(`pointerup`,ne),this._disposeListeners=()=>{m.removeEventListener(`pointerdown`,T),m.removeEventListener(`pointermove`,te),m.removeEventListener(`pointerup`,ne)}}get gizmoDragging(){return this._gizmoDragging}dispose(){this._disposeListeners()}}})))()}var my;function hy(){return(hy=t((()=>{k(),su(),lu(),py(),my=class{id;canvas;view;editorCamera;frameDebugger;displaySize;_pointerHandler;_onDispose;_disposeListeners;_disposed;_hovered;_resizeObserver;constructor(e){let{engine:t,canvas:n}=e;this.id=e.id,this.canvas=n,this.view=t.createView({offscreen:!0}),this.editorCamera=new ou(t,this.view,n),this.frameDebugger=new cu(n,e.draw,this.view),this._pointerHandler=new fy({engine:t,canvas:n,editorCamera:this.editorCamera,gizmoManager:e.gizmoManager,helperManager:e.helperManager,api:e.api,getTransformSelection:e.getTransformSelection,isEntitySelectable:e.isEntitySelectable,isGizmoVisible:e.isGizmoVisible,getHelperVisibility:e.getHelperVisibility,onSelectEntity:e.onSelectEntity,onToggleEntity:e.onToggleEntity,isModalActive:e.isModalActive,onEscapeToEditorCamera:e.onEscapeToEditorCamera}),this._hovered=!1;let r=()=>{this._hovered=!0,e.onActivate()},i=()=>{this._hovered=!1};n.addEventListener(`pointerenter`,r),n.addEventListener(`pointerleave`,i),this.displaySize=new D(n.clientWidth,n.clientHeight),this._resizeObserver=new ResizeObserver(e=>{let t=e[0].contentRect;this.displaySize.set(t.width,t.height)}),this._resizeObserver.observe(n),this._onDispose=e.onDispose,this._disposeListeners=()=>{n.removeEventListener(`pointerenter`,r),n.removeEventListener(`pointerleave`,i)},this._disposed=!1}get gizmoDragging(){return this._pointerHandler.gizmoDragging}get hovered(){return this._hovered}fit(e){let t=this.view.size;return t&&t.x===e.x&&t.y===e.y?!1:(this.view.size=e.clone(),this.canvas.width=e.x,this.canvas.height=e.y,this.frameDebugger.resize(e),!0)}dispose(){this._disposed||(this._disposed=!0,this._onDispose(),this._disposeListeners(),this._resizeObserver.disconnect(),this._pointerHandler.dispose(),this.frameDebugger.dispose(),this.editorCamera.dispose(),this.view.dispose())}}})))()}var gy;function _y(){return(_y=t((()=>{P(),gy=class{_draw;_wireframeMaterial;_wireframeGeometryCache;constructor(e){this._draw=e,this._wireframeGeometryCache=new Map,this._wireframeMaterial=e.materials.flat({color:[.3,.8,.3],lines:!0,depthWrite:!1})}render(e,t,n){if(!t)return;let r=this._collectMeshEntities(n.root),i=new Map;for(let e of r){let t=e.getComponent(M);if(!t)continue;i.set(e,t.geometry);let n=this._wireframeGeometryCache.get(t.geometry);n||(n=this._createWireframeGeometry(t.geometry),this._wireframeGeometryCache.set(t.geometry,n)),t.geometry=n}this._draw.renderEntities({view:e,camera:t,entities:r,target:null,materialOverride:this._wireframeMaterial});for(let e of r){let t=e.getComponent(M);if(!t)continue;let n=i.get(e);n&&(t.geometry=n)}}_collectMeshEntities(e){let t=[],n=(e,r)=>{let i=r&&e.visible&&!e.renderHidden;i&&e.getComponent(M)&&t.push(e);for(let t=0;t<e.children.length;t++)n(e.children[t],i)};return n(e,!0),t}_createWireframeGeometry(e){let t=new Ot,n=e.getAttribute(`position`),r=e.getAttribute(`index`);if(!n)return t;t.setAttribute(`position`,n.array,3);let i=e.getAttribute(`normal`);if(i&&t.setAttribute(`normal`,i.array,3),r){let e=r.array,n=new Set,i=[];for(let t=0;t<e.length;t+=3){let r=e[t],a=e[t+1],o=e[t+2],s=[[Math.min(r,a),Math.max(r,a)],[Math.min(a,o),Math.max(a,o)],[Math.min(o,r),Math.max(o,r)]];for(let[e,t]of s){let r=`${e}_${t}`;n.has(r)||(n.add(r),i.push(e,t))}}t.setAttribute(`index`,new Uint16Array(i),1)}return t}}})))()}var vy,yy,by;function xy(){return(xy=t((()=>{Ku(),k(),P(),Ei(),Yu(),Qu(),nd(),Id(),pf(),hf(),If(),Bf(),Qs(),ap(),dp(),oy(),cy(),Zf(),hy(),_y(),vy={show:!0,empty:!0,camera:!0,light:!0,grid:!0,wireframe:!1,gizmo:!0,outline:!0,relationships:!0},yy=[`cameraView`,`preview`,`resolutionScale`,...Object.keys(vy).map(e=>`helpers/${e}`),`camera/position`,`camera/target`],by=class extends Tt{_engine;_selectedEntityId;_selectedEntityIds;_unselectableEntityIds;_selectedAsset;_navigateAsset;_propertyTarget;_audioBuffer;_frameLoop;_enableRender;_baseResolution;_viewportResolution;_viewType;_assetPreviewManager;_externalWindow;_modalStatus;_panelLayout;_panelLayoutSP;_hoveredKeyField;_hoveredEditArea;_editModal;_copiedCurveId;_disposed;_bootstrapping;_api;_draw;_viewports;_activeViewport;_viewportSettings;_gizmoManager;_helperManager;_gridRenderer;_constraintAxisRenderer;_wireframeRenderer;_relationshipLineRenderer;_selectionOutline;_keyboardHandler;_disposeBrowserContextMenu;_modalTransformHandler;_sceneExporter;_isExporting;_exportProgress;constructor(e){super(),this._engine=e,this._viewType=`render`,this._selectedEntityId=null,this._selectedEntityIds=[],this._unselectableEntityIds=new Set,this._selectedAsset=null,this._navigateAsset=null,this._propertyTarget=`entity`,this._enableRender=!0,this._baseResolution=new D(1920,1080),this._viewportResolution=new D,this._externalWindow=null,this._modalStatus=null,this._panelLayout=null,this._panelLayoutSP=null,this._hoveredKeyField=null,this._hoveredEditArea=null,this._editModal=null,this._copiedCurveId=null,this._disposed=!1,this._bootstrapping=!1,this._api=new Fd(this),this._draw=Iu(e),this._viewports=[],this._activeViewport=null,this._viewportSettings=new Map,this._assetPreviewManager=new Ju(this._draw),this._sceneExporter=new ay(e),this._isExporting=!1,this._exportProgress=null,this._gizmoManager=new ff(e,this._draw),this._helperManager=new Ff(e,this._draw),this._gridRenderer=new mf(e,this._draw),this._constraintAxisRenderer=new td(e,this._draw),this._wireframeRenderer=new gy(this._draw),this._relationshipLineRenderer=new up(e,this._draw),this._selectionOutline=new sy(this._draw),this._modalTransformHandler=new ip({engine:e,getViewport:()=>this._activeViewport,api:this._api,getSelection:()=>this._getTransformSelection(),isPointerBusy:()=>this._viewports.some(e=>e.gizmoDragging),onStatusChange:e=>this.setModalStatus(e)}),this._keyboardHandler=new zf({onSave:()=>this.save(),onUndo:()=>this._api.undo(),onRedo:()=>this._api.redo(),onPlayToggle:()=>this.togglePlay(),onCameraViewToggle:()=>this.toggleCameraView(),onPreviewToggle:()=>{let e=this._activeViewport;e&&this.setField(`viewports/${e.id}/preview`,!e.editorCamera.preview)},onSyncToSceneCamera:()=>this.syncToSceneCamera(),onFocusSelected:()=>this.focusSelected(),onAlignView:(e,t)=>this.alignEditorView(e,t),onProjectionToggle:()=>this.toggleEditorProjection(),onAddEntity:()=>this.emit(`request/addEntity`),onDeleteSelected:()=>{let e=this._hoveredEditArea;if(e){e.deleteSelected&&e.deleteSelected();return}this.deleteSelected()},onCopy:()=>{let e=this._hoveredEditArea;e&&e.copy&&e.copy()},onPaste:()=>{let e=this._hoveredEditArea;e&&e.paste&&e.paste()},onBoxSelect:()=>{let e=this._hoveredEditArea;e&&e.boxSelect&&e.boxSelect()},onSelectAll:e=>{let t=this._hoveredEditArea;t&&t.selectAll&&t.selectAll(e)},onFrameAll:()=>{let e=this._hoveredEditArea;e&&e.frameAll&&e.frameAll()},onContextMenu:()=>{let e=this._hoveredEditArea;e&&e.openMenu&&e.openMenu()},onDuplicateSelected:()=>{let e=this._hoveredEditArea;if(e){e.duplicate&&e.duplicate();return}this.duplicateSelected()&&this._modalTransformHandler.start(`translate`)},onRenameSelected:()=>this.requestRenameSelected(),onParentToActive:()=>this.parentSelectedToActive(),onClearParent:()=>this.clearParentOfSelected(),onStepFrame:e=>this.stepFrame(e),onSeekToStart:()=>this.seekToStart(),onTransformKey:e=>this._onModalKey(e),onInsertKey:e=>this._onKeyFrameShortcut(e)}),this._disposeBrowserContextMenu=Zu(window),this._audioBuffer=null,this._engine.on(`update/music`,e=>{this._audioBuffer=e}),this._frameLoop={enabled:!1,start:0,end:0},this._engine.on(`loaded`,()=>{let e=this.selectedEntities;e.length!==this._selectedEntityIds.length&&this.setSelection(e,this.activeEntity)}),this._engine.on(`update/blidge/frame`,e=>{this._engine.seek(e.current),e.playing&&!this._engine.frame.playing?this._engine.play():!e.playing&&this._engine.frame.playing&&this._engine.stop()}),this._engine.on(`update/blidge/selection`,e=>{if(!e.active)return;let t=this._engine.root.findEntityByUUID(`blidge:`+e.active.name);if(!t)return;let n=[];for(let r of e.selected){let e=this._engine.root.findEntityByUUID(`blidge:`+r.name);e&&e!==t&&n.push(e)}n.push(t),this.setSelection(n,t)}),this.field(`enableRender`,()=>this._enableRender,e=>this._enableRender=e);let t=this.fieldDir(`resolution`);t.field(`width`,()=>this._baseResolution.x,e=>{this._baseResolution.x=e,this._resize()},{step:1}),t.field(`height`,()=>this._baseResolution.y,e=>{this._baseResolution.y=e,this._resize()},{step:1}),this.field(`viewType`,()=>this._viewType,e=>{this._viewType=e;for(let e of this._viewports)e.frameDebugger.enable=this._viewType===`debug`});let n=this.fieldDir(`frameLoop`);n.field(`enabled`,()=>this._frameLoop.enabled,e=>this._frameLoop.enabled=e),n.field(`start`,()=>this._frameLoop.start,e=>this._frameLoop.start=e),n.field(`end`,()=>this._frameLoop.end,e=>this._frameLoop.end=e),this.field(`selectedEntityId`,()=>this._selectedEntityId,e=>{this._selectedEntityId=e,e&&!this._selectedEntityIds.includes(e)&&(this._selectedEntityIds=[e],this.noticeField(`selectedEntityIds`)),e&&(this._propertyTarget=`entity`,this.noticeField(`propertyTarget`))}),this.field(`selectedEntityIds`,()=>this._selectedEntityIds,e=>{this._selectedEntityIds=e,this._selectedEntityId&&!e.includes(this._selectedEntityId)&&(this._selectedEntityId=null,this.noticeField(`selectedEntityId`))},{hidden:!0}),this.field(`unselectableEntityIds`,()=>Array.from(this._unselectableEntityIds),e=>{this._unselectableEntityIds=new Set(e)},{hidden:!0}),this.field(`selectedAsset`,()=>this._selectedAsset,e=>{this._selectedAsset=e,e&&(this._propertyTarget=`asset`,this.noticeField(`propertyTarget`))}),this.field(`navigateAsset`,()=>this._navigateAsset,e=>{this._navigateAsset=e}),this.field(`propertyTarget`,()=>this._propertyTarget,e=>{this._propertyTarget=e}),this.field(`gizmoMode`,()=>this._gizmoManager.mode,e=>{this._gizmoManager.setMode(e)}),this.field(`transformOrientation`,()=>this._gizmoManager.orientation,e=>{this._gizmoManager.setOrientation(e)}),this.field(`modalStatus`,()=>this._modalStatus,{noExport:!0}),this.field(`panelLayout`,()=>this._panelLayout,e=>this._panelLayout=e,{hidden:!0}),this.field(`panelLayoutSP`,()=>this._panelLayoutSP,e=>this._panelLayoutSP=e,{hidden:!0}),this._animate()}get bootstrapping(){return this._bootstrapping}bootstrap(e){if(e){this._bootstrapping=!0;try{this.deserialize(e)}finally{this._bootstrapping=!1}}this._resize()}deserialize(e){for(let t of Object.keys(e)){let e=t.match(/^viewports\/([^/]+)\//);e&&this._registerViewportFields(e[1])}super.deserialize(e)}get engine(){return this._engine}get api(){return this._api}get audioBuffer(){return this._audioBuffer}get disposed(){return this._disposed}get viewports(){return this._viewports}get activeViewport(){return this._activeViewport}get assetPreviewManager(){return this._assetPreviewManager}get draw(){return this._draw}createViewport(e,t){this._registerViewportFields(e);let n=this._viewportSettings.get(e),r=this._engine,i=new my({id:e,engine:r,draw:this._draw,canvas:t,gizmoManager:this._gizmoManager,helperManager:this._helperManager,api:this._api,getTransformSelection:()=>this._getTransformSelection(),isEntitySelectable:e=>!this._unselectableEntityIds.has(e.uuid),isGizmoVisible:()=>n.helpers.gizmo,getHelperVisibility:()=>n.helpers,onSelectEntity:e=>this.selectEntity(e),onToggleEntity:e=>this.toggleEntitySelection(e),isModalActive:()=>this._modalTransformHandler.active,onEscapeToEditorCamera:()=>this._escapeToEditorCamera(i),onActivate:()=>{this._activeViewport=i},onDispose:()=>{let e=i.editorCamera,t=e.orbitControls;n.cameraView=e.view,n.preview=e.preview,n.cameraPosition=[t.eye.x,t.eye.y,t.eye.z],n.cameraTarget=[t.target.x,t.target.y,t.target.z],this._viewports.splice(this._viewports.indexOf(i),1),this._activeViewport===i&&(this._activeViewport=this._viewports[0]??null)}});i.editorCamera.setView(n.cameraView,r),i.editorCamera.setPreview(n.preview,r),(n.cameraPosition||n.cameraTarget)&&this._setOrbit(i,n.cameraPosition,n.cameraTarget),i.frameDebugger.enable=this._viewType===`debug`,this._viewports.push(i),this._activeViewport||=i;for(let t of yy)this.noticeField(`viewports/${e}/${t}`);return i}pruneViewportSettings(e){for(let t of this._viewportSettings.keys())if(!(e.has(t)||this._viewports.some(e=>e.id===t))){this._viewportSettings.delete(t);for(let e of[``,`helpers/`,`camera/`,...yy])this.removeField(`viewports/${t}/${e}`)}}_registerViewportFields(e){if(this._viewportSettings.has(e))return;let t={cameraView:`editor`,preview:!1,resolutionScale:1,helpers:{...vy},cameraPosition:null,cameraTarget:null};this._viewportSettings.set(e,t);let n=()=>this._viewports.find(t=>t.id===e)??null,r=this._engine,i=this.fieldDir(`viewports/${e}`);i.field(`cameraView`,()=>n()?.editorCamera.view??t.cameraView,e=>{let i=n();i?i.editorCamera.setView(e,r):t.cameraView=e}),i.field(`preview`,()=>n()?.editorCamera.preview??t.preview,e=>{let i=n();i?i.editorCamera.setPreview(e,r):t.preview=e}),i.field(`resolutionScale`,()=>t.resolutionScale,e=>{t.resolutionScale=Number(e)});let a=i.dir(`helpers`);for(let e of Object.keys(vy))a.field(e,()=>t.helpers[e],n=>{t.helpers[e]=n});let o=i.dir(`camera`);o.field(`position`,()=>{let e=n();if(!e)return t.cameraPosition;let r=e.editorCamera.orbitControls.eye;return[r.x,r.y,r.z]},e=>{let r=n();r?this._setOrbit(r,e,null):t.cameraPosition=e}),o.field(`target`,()=>{let e=n();if(!e)return t.cameraTarget;let r=e.editorCamera.orbitControls.target;return[r.x,r.y,r.z]},e=>{let r=n();r?this._setOrbit(r,null,e):t.cameraTarget=e})}_setOrbit(e,t,n){let r=e.editorCamera.orbitControls;r.setPosition(t?new D(t[0],t[1],t[2]):r.eye.clone(),n?new D(n[0],n[1],n[2]):r.target.clone())}_escapeToEditorCamera(e){e.editorCamera.preview&&this.setField(`viewports/${e.id}/preview`,!1),this.setField(`viewports/${e.id}/cameraView`,`editor`)}_animate(){if(!this._disposed){if(!this._isExporting){this._fitViewports();for(let e of this._viewports)e.editorCamera.updateBeforeRender(this._engine);this._engine.update(),this._helperManager.sync(this._engine,new Set(this._selectedEntityIds),this._selectedEntityId);let e=this.selectedEntities,t=this.activeEntity,n=this._getGizmoTarget();for(let r of this._viewports)this._enableRender&&this._engine.render(r.view),this._renderOverlay(r,e,t,n),this._draw.drawToCanvas(r.view,r.canvas);let r=this._externalWindow;r&&(this._enableRender&&this._engine.render(r.view),this._draw.drawToCanvas(r.view,r.canvas)),this._engine.frame.playing&&((this._engine.frame.current<0||this._engine.frame.current>this._engine.frameSetting.duration)&&this._engine.seek(0),this._frameLoop.enabled&&(this._engine.frame.current<this._frameLoop.start||this._engine.frame.current>this._frameLoop.end)&&this._engine.seek(this._frameLoop.start)),this.emit(`frame`)}window.requestAnimationFrame(this._animate.bind(this))}}_renderOverlay(e,t,n,r){let i=e.editorCamera.getCameraEntity(this._engine),a=e.editorCamera.preview,o=e.view,s=this._viewportSettings.get(e.id).helpers;a||(s.grid&&this._gridRenderer.render(o,i,this._engine),this._helperManager.render(o,i,s),s.relationships&&this._relationshipLineRenderer.render(o,i,this._engine),s.wireframe&&this._wireframeRenderer.render(o,i,this._engine));let c=a||!s.gizmo||this._modalTransformHandler.active;this._gizmoManager.render(o,c?null:r,i,this._engine),this._constraintAxisRenderer.render(o,this._modalTransformHandler.constraintDisplay,i,this._engine),!a&&s.outline&&this._selectionOutline.render(o,t,n,i),e.frameDebugger.enable&&e.frameDebugger.draw()}get isExporting(){return this._isExporting}get exportProgress(){return this._exportProgress}async exportMP4(){if(this._isExporting)return;this._isExporting=!0,this._exportProgress=null,this.emit(`update/export`);let e=this._engine.frame.playing;this._engine.stop();try{let e=await this._sceneExporter.export({fps:this._engine.frameSetting.fps,duration:this._engine.frameSetting.duration,resolution:this._baseResolution.clone()},e=>{this._exportProgress=e,this.emit(`update/export`)});ay.download(e)}catch(e){console.error(`Export failed:`,e)}this._isExporting=!1,this._exportProgress=null,this.emit(`update/export`),e&&this._engine.play()}selectEntity(e){e?this.setSelection([e],e):this.setSelection([],null)}setSelection(e,t){let n=[];for(let t of e)n.includes(t.uuid)||n.push(t.uuid);let r=null;t&&(r=t.uuid),this.setField(`selectedEntityIds`,n),this.setField(`selectedEntityId`,r)}toggleEntitySelection(e){let t=this.selectedEntities;if(!t.includes(e)){t.push(e),this.setSelection(t,e);return}if(this._selectedEntityId!==e.uuid){this.setSelection(t,e);return}let n=[];for(let r of t)r!==e&&n.push(r);this.setSelection(n,null)}get selectedEntities(){let e=[];for(let t of this._selectedEntityIds){let n=this._engine.root.findEntityByUUID(t);n&&e.push(n)}return e}get activeEntity(){return this._selectedEntityId?this._engine.root.findEntityByUUID(this._selectedEntityId)??null:null}_getTransformSelection(){return{entities:Kf(this.selectedEntities),active:this.activeEntity}}_getGizmoTarget(){let e=this._getTransformSelection();return e.entities.length===0?null:{position:qf(e.entities),quaternion:Jf(e.entities,e.active)}}togglePlay(){this._engine.frame.playing?this._engine.stop():this._engine.play(),this._engine.emit(`update/frame/play`,[this._engine.frame])}syncToSceneCamera(){let e=this._activeViewport;e&&(this._escapeToEditorCamera(e),e.editorCamera.syncFromSceneCamera(this._engine))}toggleCameraView(){let e=this._activeViewport;e&&(e.editorCamera.usingEditorCamera?(this.setField(`viewports/${e.id}/cameraView`,`camera`),this.setField(`viewports/${e.id}/preview`,!0)):this._escapeToEditorCamera(e))}focusSelected(){let e=this._activeViewport;if(!e||e.editorCamera.preview)return;let t=this.activeEntity;t&&(this.setField(`viewports/${e.id}/cameraView`,`editor`),e.editorCamera.focus(t))}alignEditorView(e,t){let n=this._activeViewport;!n||n.editorCamera.preview||(this.setField(`viewports/${n.id}/cameraView`,`editor`),n.editorCamera.alignView(e,t))}toggleEditorProjection(){let e=this._activeViewport;!e||e.editorCamera.preview||(this.setField(`viewports/${e.id}/cameraView`,`editor`),e.editorCamera.toggleProjection())}_isEditableEntity(e){return e.initiator===`user`&&e.parent!==null}_getEditableSelectedEntities(){let e=[];for(let t of Kf(this.selectedEntities))this._isEditableEntity(t)&&e.push(t);return e}deleteSelected(){let e=this._getEditableSelectedEntities();e.length!==0&&(this._api.deleteEntities(e),this.selectEntity(null))}duplicateSelected(){let e=this._getEditableSelectedEntities();if(e.length===0)return!1;let t=this.activeEntity,n=this._api.duplicateEntities(e),r=n[n.length-1];return t&&e.includes(t)&&(r=n[e.indexOf(t)]),this.setSelection(n,r),!0}requestRenameSelected(){let e=this.activeEntity;!e||!this._isEditableEntity(e)||this.emit(`request/renameEntity`,[e])}reparentEntities(e,t){let n=Kf(e);try{this._api.reparentEntities(n,t)}catch(e){return this.emit(`message`,[e.message]),!1}let r=[];for(let e of n){let t=bs(e);t.length>0&&r.push(`${e.name}（${t.join(` / `)}）`)}return r.length>0&&this.emit(`message`,[`キーが打たれているので、時刻が変わるとキーの値に戻ります: ${r.join(`、`)}`]),!0}getReparentError(e,t){return this._api.getReparentError(Kf(e),t)}parentSelectedToActive(){let e=this.activeEntity;if(!e){this.emit(`message`,[`親にするエンティティを最後に選んでください（アクティブが親になります）`]);return}let t=[];for(let n of this.selectedEntities)n!==e&&t.push(n);if(t.length===0){this.emit(`message`,[`子にするエンティティを選んでから、親にするエンティティを最後に選んでください`]);return}this.reparentEntities(t,e)}clearParentOfSelected(){let e=this.selectedEntities;e.length!==0&&this.reparentEntities(e,this._engine.root)}stepFrame(e){let t=this._engine.frameSetting.fps;if(t<=0)return;let n=Math.round(this._engine.time.code*t),r=Math.max(0,n+e);this._engine.seek(r*60/t)}seekToStart(){this._engine.seek(0)}enterKeyField(e){this._hoveredKeyField=e}leaveKeyField(e){let t=this._hoveredKeyField;t&&t.target===e.target&&t.path===e.path&&(this._hoveredKeyField=null)}insertKeys(e){try{this._api.insertKeys(e)}catch(e){this.emit(`message`,[e.message]);return}this._engine.frame.playing||this._engine.seek(hs(this._engine))}deleteKeys(e){this._api.deleteKeys(e)}_onModalKey(e){if(this._editModal&&this._editModal.handleKeyDown(e))return!0;let t=this._modalTransformHandler;if(t.active)return t.handleKeyDown(e);let n=rp(e);if(!n)return!1;let r=this._hoveredEditArea;if(r)return r.transform&&r.transform(n),!0;let i=this._activeViewport;return!i||!i.hovered?!1:t.handleKeyDown(e)}enterEditArea(e){this._hoveredEditArea=e}leaveEditArea(e){this._hoveredEditArea===e&&(this._hoveredEditArea=null)}beginEditModal(e){this._editModal=e}endEditModal(e){this._editModal===e&&(this._editModal=null)}setModalStatus(e){this._modalStatus!==e&&(this._modalStatus=e,this.noticeField(`modalStatus`))}get copiedCurveId(){return this._copiedCurveId}copyCurve(e){this._copiedCurveId=e}pasteCurve(e,t){let n=this._copiedCurveId;n&&this._runKeyFrameCommand(()=>this._api.pasteCurve(e,n,t))}unlinkCurve(e){this._runKeyFrameCommand(()=>this._api.unlinkCurve(e))}setCurveLinkSettings(e,t){this._runKeyFrameCommand(()=>this._api.setCurveLinkSettings(e,t))}_runKeyFrameCommand(e){try{e()}catch(e){this.emit(`message`,[e.message])}}_onKeyFrameShortcut(e){let t=this._hoveredKeyField;if(t){e?this.deleteKeys([t]):this.insertKeys([t]);return}if(e)return;let n=this._activeViewport;if(!n||!n.hovered)return;let r=this.activeEntity;r&&this.emit(`request/insertKeyMenu`,[r])}createEntity(e,t){let n=this._engine.createEntity({name:t});return n.initiator=`user`,e.add(n),n}deleteEntity(e){e.disposeRecursive();let t=e.parent;t&&t.remove(e)}save(){this.emit(`save`,[this.exportEngine(),this.exportEditor()])}exportEditor(){return this.serialize({mode:`export`})}exportEngine(){return Ti(this._engine.serialize({mode:`export`}))}openInExternalWindow(){if(this._externalWindow){this._externalWindow.window.focus();return}let e=window.open(``,`_blank`);if(!e)return;let t=e.document.createElement(`canvas`);t.style.width=`100%`,t.style.height=`100%`,t.style.objectFit=`contain`,t.style.cursor=`none`,e.document.body.style.margin=`0`,e.document.body.style.background=`#000`,e.document.body.appendChild(t),Zu(e);let n=this._engine.createView({offscreen:!0});this._externalWindow={window:e,canvas:t,view:n},e.addEventListener(`unload`,()=>{this.closeExternalWindow()}),this._resize()}closeExternalWindow(){let e=this._externalWindow;e&&(this._externalWindow=null,e.view.dispose(),e.window.close())}_resize(){let e=this._baseResolution;this.engine.setSize(e),this._draw.resize(e),this._externalWindow&&(this._externalWindow.canvas.width=e.x,this._externalWindow.canvas.height=e.y)}_fitViewports(){let e=!1;for(let t of this._viewports){let n=this._viewportSettings.get(t.id).resolutionScale,r=this._viewportResolution;if(t.editorCamera.usingEditorCamera)r.copy(t.displaySize).multiply(window.devicePixelRatio*n);else{let e=t.displaySize.x*window.devicePixelRatio/this._baseResolution.x,i=t.displaySize.y*window.devicePixelRatio/this._baseResolution.y,a=Math.min(e,i,1);r.copy(this._baseResolution).multiply(a*n)}r.set(Math.max(Math.floor(r.x),1),Math.max(Math.floor(r.y),1)),t.fit(r)&&(e=!0)}e&&this._draw.resize(this._baseResolution)}dispose(){this._disposed=!0,this._api.dispose(),this._keyboardHandler.dispose(),this._disposeBrowserContextMenu(),this._modalTransformHandler.dispose(),this._assetPreviewManager.dispose(),this.closeExternalWindow();for(let e of[...this._viewports])e.dispose()}}})))()}var Sy,Cy,wy,Ty;function Ey(){return(Ey=t((()=>{E(),Sy=(e,t)=>{for(let n of t)if(!e.has(n))return!1;return t.length>0},Cy=(e,t,n,r,i)=>{let a=Sy(e,n),o=t;if(r&&(o=r),i&&a&&r&&r!=t)return{selection:e,active:r,wasSelected:a};if(i){let t=new Set(e);for(let e of n)a?t.delete(e):t.add(e);return{selection:t,active:o,wasSelected:a}}return a?{selection:e,active:o,wasSelected:a}:{selection:new Set(n),active:r,wasSelected:a}},wy=(e,t,n)=>{let r=new Set;n&&(r=new Set(e));for(let e of t)r.add(e);return r},Ty=class{_editor;_onEnd;_ended;_disposeListeners;constructor(e){this._editor=e.editor,this._onEnd=e.onEnd,this._ended=!1;let t=t=>{if(t.button==2){t.preventDefault(),t.stopPropagation(),x(),this.end();return}t.button==0&&t.target instanceof Node&&e.area.contains(t.target)||this.end()};window.addEventListener(`pointerdown`,t,{capture:!0}),this._disposeListeners=()=>{window.removeEventListener(`pointerdown`,t,{capture:!0})},this._editor.beginEditModal(this)}handleKeyDown(e){return e.key==`Escape`&&(this.end(),!0)}end(){this._ended||(this._ended=!0,this._disposeListeners(),this._editor.endEditModal(this),this._onEnd())}}})))()}var Dy,Oy,ky,Ay;function jy(){return(jy=t((()=>{E(),Dy=1,Oy=.001,ky=class{_params;_pointer;_constraint;_numberBuffer;_disposeListeners;constructor(e){this._params=e,this._pointer={...e.pointer},this._constraint=null,this._numberBuffer=``;let t=e=>{e.stopPropagation(),this._pointer={x:e.clientX,y:e.clientY},this._update()},n=e=>{e.preventDefault(),e.stopPropagation(),e.button===2?(x(),this._end(!1)):e.button===0&&this._end(!0)};window.addEventListener(`pointermove`,t,{capture:!0}),window.addEventListener(`pointerdown`,n,{capture:!0}),this._disposeListeners=()=>{window.removeEventListener(`pointermove`,t,{capture:!0}),window.removeEventListener(`pointerdown`,n,{capture:!0})},this._update()}handleKeyDown(e){let t=e.key.toLowerCase();return e.key===`Enter`?this._end(!0):e.key===`Escape`?this._end(!1):t===`x`||t===`y`?this._toggleConstraint(t):this._inputNumber(e.key),!0}_toggleConstraint(e){this._params.axes!==`x`&&this._params.mode!==`rotate`&&(this._constraint=this._constraint===e?null:e,this._update())}_inputNumber(e){if(e.length===1&&e>=`0`&&e<=`9`)this._numberBuffer+=e;else if(e===`.`){if(this._numberBuffer.includes(`.`))return;this._numberBuffer+=`.`}else if(e===`-`)this._numberBuffer=this._numberBuffer.startsWith(`-`)?this._numberBuffer.slice(1):`-`+this._numberBuffer;else if(e===`Backspace`){if(this._numberBuffer===``)return;this._numberBuffer=this._numberBuffer.slice(0,-1)}else return;this._update()}_update(){let e=this._params.mode,t=null;if(this._numberBuffer!==``&&(t=parseFloat(this._numberBuffer)),t!==null&&Number.isNaN(t)){this._params.onChange(e=>e),this._params.onStatus(this._statusText(``));return}e===`translate`?this._translate(t):e===`rotate`?this._rotate(t):this._scale(t)}_translate(e){let t=this._params,n={x:0,y:0};if(e!==null)n=this._constraint===`y`?{x:0,y:e}:{x:e,y:0};else{let e=this._pointer.x-t.pointer.x,r=this._pointer.y-t.pointer.y;(this._constraint===`x`||t.axes===`x`)&&(r=0),this._constraint===`y`&&(e=0);let i=t.mapping.toPoint(t.pointer),a=t.mapping.toPoint({x:t.pointer.x+e,y:t.pointer.y+r});n={x:a.x-i.x,y:a.y-i.y}}t.onChange(e=>({x:e.x+n.x,y:e.y+n.y}));let r=n.x.toFixed(t.digits.x);t.axes===`xy`&&(r+=`, `+n.y.toFixed(t.digits.y)),this._params.onStatus(this._statusText(r))}_rotate(e){let t=this._params,n=t.mapping.toScreen(t.center),r=0;r=e===null?Ay(this._pointer,n)-Ay(t.pointer,n):e*Math.PI/180;let i=Math.cos(r),a=Math.sin(r);if(this._params.onStatus(this._statusText((r*180/Math.PI).toFixed(1))),r===0){t.onChange(e=>e);return}t.onChange((e,n)=>{let r=t.center;t.individual&&(r=n);let o=t.mapping.toScreen(r),s=t.mapping.toScreen(e),c=s.x-o.x,l=s.y-o.y;return t.mapping.toPoint({x:o.x+c*i+l*a,y:o.y-c*a+l*i})})}_scale(e){let t=this._params,n=t.mapping.toScreen(t.center),r=1;if(e!==null)r=e;else{let e=Math.hypot(t.pointer.x-n.x,t.pointer.y-n.y),i=Math.hypot(this._pointer.x-n.x,this._pointer.y-n.y);t.axes===`x`&&(e=Math.abs(t.pointer.x-n.x),i=Math.abs(this._pointer.x-n.x)),r=Math.max(Oy,i/Math.max(Dy,e))}let i=r,a=r;(this._constraint===`x`||t.axes===`x`)&&(a=1),this._constraint===`y`&&(i=1),t.onChange((e,n)=>{let r=t.center;t.individual&&(r=n);let o=t.mapping.toScreen(r),s=t.mapping.toScreen(e),c=t.mapping.toPoint({x:o.x+(s.x-o.x)*i,y:o.y+(s.y-o.y)*a}),l=c.x,u=c.y;return i===1&&(l=e.x),a===1&&(u=e.y),{x:l,y:u}}),this._params.onStatus(this._statusText(r.toFixed(3)))}_statusText(e){let t=this._params.mode,n=`Scale`,r=``;t===`translate`&&(n=`Move`),t===`rotate`&&(n=`Rot`,r=`°`);let i=e;return this._numberBuffer!==``&&(i=`[${this._numberBuffer}]`),`${n}: ${i}${r} (${this._constraintText()})`}_constraintText(){let e=this._params.axisLabels;return this._params.axes===`x`||this._constraint===`x`?e.x:this._constraint===`y`?e.y:this._params.mode===`rotate`?`view`:this._params.mode===`scale`?`uniform`:`free`}_end(e){this._disposeListeners(),this._params.onStatus(null),e?this._params.onConfirm():this._params.onCancel()}cancel(){this._end(!1)}},Ay=(e,t)=>Math.atan2(-(e.y-t.y),e.x-t.x)})))()}function My(){return(My=t((()=>{Mu(),xy(),as(),Qs(),Ey(),jy()})))()}var Ny,Py;function Fy(){return(Fy=t((()=>{Ny=i(),L(),Py=e=>{let{editor:t}=I(),n=(0,Ny.useRef)(e);n.current=e,(0,Ny.useEffect)(()=>{let e=()=>{n.current()};return t.on(`frame`,e),()=>{t.off(`frame`,e)}},[t])}})))()}var Iy,Ly,Ry,zy;function By(){return(By=t((()=>{Iy=`CurveLinkForm__form___LmZvc`,Ly=`CurveLinkForm__title___LmZvc`,Ry=`CurveLinkForm__footer___LmZvc`,zy={form:Iy,title:Ly,footer:Ry}})))()}var Vy,Hy,Uy;function Wy(){return(Wy=t((()=>{Vy=i(),E(),By(),Hy=o(),Uy=e=>{let[t,n]=(0,Vy.useState)(e.info.name||``),[r,i]=(0,Vy.useState)(e.info.scale),[a,o]=(0,Vy.useState)(e.info.offset),s=()=>{e.onSubmit({name:t,scale:r,offset:a})},l=null;return e.info.fixedScale||(l=(0,Hy.jsxs)(Hy.Fragment,{children:[(0,Hy.jsx)(le,{title:`Scale`,children:(0,Hy.jsx)(C,{value:r,onChange:i})}),(0,Hy.jsx)(le,{title:`Offset`,children:(0,Hy.jsx)(C,{value:a,onChange:o})})]})),(0,Hy.jsxs)(`div`,{className:zy.form,children:[(0,Hy.jsxs)(`div`,{className:zy.title,children:[`Link Settings (`,e.info.curveId,` / `,e.info.uses,` uses)`]}),(0,Hy.jsx)(le,{title:`Name`,children:(0,Hy.jsx)(T,{value:t,onChange:n})}),l,(0,Hy.jsxs)(`div`,{className:zy.footer,children:[(0,Hy.jsx)(c,{onClick:e.onClose,children:`Cancel`}),(0,Hy.jsx)(c,{onClick:s,children:`OK`})]})]})},Uy.__docgenInfo={description:``,methods:[],displayName:`CurveLinkForm`,props:{info:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{
	curveId: string;
	name: string | undefined;
	scale: number;
	offset: number;
	// このカーブを指しているリンクの数（シーン全体）。2 以上なら共有している
	uses: number;
	// select とイベントは倍率・足し算を 1 / 0 に固定し、設定に出さない
	fixedScale: boolean;
}`,signature:{properties:[{key:`curveId`,value:{name:`string`,required:!0}},{key:`name`,value:{name:`union`,raw:`string | undefined`,elements:[{name:`string`},{name:`undefined`}],required:!0}},{key:`scale`,value:{name:`number`,required:!0}},{key:`offset`,value:{name:`number`,required:!0}},{key:`uses`,value:{name:`number`,required:!0}},{key:`fixedScale`,value:{name:`boolean`,required:!0}}]}},description:``},onSubmit:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( settings: CurveLinkSettings ) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{
	name: string;
	scale: number;
	offset: number;
}`,signature:{properties:[{key:`name`,value:{name:`string`,required:!0}},{key:`scale`,value:{name:`number`,required:!0}},{key:`offset`,value:{name:`number`,required:!0}}]}},name:`settings`}],return:{name:`void`}}},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var Gy,Ky,qy,Jy,Yy,Xy,Zy;function Qy(){return(Qy=t((()=>{Gy=i(),My(),E(),Fy(),L(),Wy(),Ky=[`x`,`y`,`z`,`w`],qy=[`r`,`g`,`b`,`a`],Jy=(e,t)=>{if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++)if(e[n].curveId!=t[n].curveId||e[n].label!=t[n].label||e[n].uses!=t[n].uses)return!1;return!0},Yy=e=>{let t=e.target.closest(`[data-element]`);return!t||!e.currentTarget.contains(t)?null:Number(t.getAttribute(`data-element`))},Xy=(e,t)=>{let n=e&&e.format;return n&&n.type==`vector`&&Ky[t]?Ky[t]:n&&n.type==`color`&&qy[t]?qy[t]:String(t)},Zy=(e,t)=>{let{editor:n,engine:r}=I(),{open:i,closeAll:a}=w(),o=(0,Gy.useMemo)(()=>({target:e,path:t}),[e,t]),s=vs(o),[c,l]=(0,Gy.useState)(!1),[u,d]=(0,Gy.useState)(!1),[f,p]=(0,Gy.useState)(!1),[m,h]=(0,Gy.useState)([]);if(Py(()=>{if(!s)return;let e=Fs(r,o,hs(r),r.frame.current);l(e!==null),d(e!==null&&e.keyed),p(e!==null&&e.changed);let t=Hs(r,o);h(e=>Jy(e,t)?e:t)}),(0,Gy.useEffect)(()=>()=>{n.leaveKeyField(o)},[n,o]),!s)return{state:null,shared:m,rowProps:void 0};let g=(e,t,o)=>{let s=[],c=Bs(r,e),l=n.copiedCurveId;return c&&s.push({label:`Copy Curve`,onClick:()=>{n.copyCurve(c.curveId),a()}}),l&&r.curves[l]&&(s.push({label:`Paste Curve (Link)`,onClick:()=>{n.pasteCurve(e,`link`),a()}}),s.push({label:`Paste Curve (Duplicate)`,onClick:()=>{n.pasteCurve(e,`duplicate`),a()}})),c&&c.uses>1&&s.push({label:`Unlink Curve`,onClick:()=>{n.unlinkCurve(e),a()}}),c&&s.push({label:`Link Settings`,onClick:()=>{a();let r=(0,Gy.createElement)(Uy,{info:c,onSubmit:t=>{n.setCurveLinkSettings(e,t),a()},onClose:a});i(r,se(t,o))}}),s},_=r=>{r.preventDefault();let s=[{label:`Insert Keyframe`,onClick:()=>{n.insertKeys([o]),a()}}];u&&s.push({label:`Delete Keyframe`,onClick:()=>{n.deleteKeys([o]),a()}});let c=0;if(Array.isArray(e.getField(t))&&(c=Yy(r)),c!==null)for(let n of g({target:e,path:t,element:c},r.clientX,r.clientY))s.push(n);else{let n=e.getFieldOpt(t),i=Vs(o);for(let a=0;a<i;a++){let i=g({target:e,path:t,element:a},r.clientX,r.clientY);i.length!=0&&s.push({label:`Curve `+Xy(n,a),children:i})}}i((0,Gy.createElement)(fe,{title:t,items:s}),se(r.clientX,r.clientY))},v=null;return c&&(v={keyed:u,changed:f}),{state:v,shared:m,rowProps:{onPointerEnter:()=>n.enterKeyField(o),onPointerLeave:()=>n.leaveKeyField(o),onContextMenu:_}}}})))()}var $y,eb;function tb(){return(tb=t((()=>{$y=i(),L(),eb=(e,t)=>{let{editor:n}=I(),r=(0,$y.useRef)(null);return{onChange:i=>{r.current?r.current.set(i):n.api.setField(e,t,i)},onDragStart:()=>{r.current=n.api.beginEdit(e,t)},onDragEnd:()=>{r.current&&r.current.commit(),r.current=null},onDragCancel:()=>{r.current&&r.current.cancel(),r.current=null}}}})))()}var nb,rb;function ib(){return(ib=t((()=>{nb=i(),Ha(),rb=()=>{let e=(0,nb.useContext)(Va);if(!e)throw Error(`SerializeFieldViewContext is not defined`);return e}})))()}var ab,ob;function sb(){return(sb=t((()=>{ab=`ValueArray__container___LmNvb`,ob={container:ab}})))()}var cb,lb;function ub(){return(ub=t((()=>{i(),E(),pa(),sb(),cb=o(),lb=e=>{let t=[],n=e.value,r=e.format,i=r?.type==`array`?r.labels:void 0;if(n===void 0)return null;for(let r=0;r<n.length;r++){let a=n[r],o=r.toString();i&&(o+=`/ `+i(a,r)),t.push((0,cb.jsx)(`div`,{"data-element":r,children:(0,cb.jsx)(le,{title:o,children:(0,cb.jsx)(fa,{...e,value:a,onChange:t=>{let i=n.concat();i[r]=t,e.onChange&&e.onChange(i)}})})},r))}return(0,cb.jsx)(`div`,{className:ob.container,children:t})},lb.__docgenInfo={description:``,methods:[],displayName:`ValueArray`,props:{value:{required:!0,tsType:{name:`union`,raw:`T | undefined`,elements:[{name:`T`},{name:`undefined`}]},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}}},description:``},onDragStart:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onDragEnd:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onDragCancel:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},format:{required:!1,tsType:{name:`SerializableFieldFormat`},description:``},label:{required:!1,tsType:{name:`union`,raw:`string | React.ReactNode`,elements:[{name:`string`},{name:`ReactReactNode`,raw:`React.ReactNode`}]},description:``},readOnly:{required:!1,tsType:{name:`boolean`},description:``},step:{required:!1,tsType:{name:`number`},description:``},min:{required:!1,tsType:{name:`number`},description:``},max:{required:!1,tsType:{name:`number`},description:``},int:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``}}}})))()}var db,fb;function pb(){return(pb=t((()=>{db=`SerializeFieldViewValue__action___LmFjd`,fb={action:db}})))()}var mb,hb,gb;function _b(){return(_b=t((()=>{mb=e(i(),1),E(),L(),Ya(),to(),co(),Qy(),tb(),ib(),pa(),ub(),pb(),hb=o(),gb=e=>{let{editor:t,engine:n,fieldUIs:r}=I(),{target:i}=rb(),a=eb(i,e.path),o=Zy(i,e.path),s=e.field.value,c=typeof s,l=e.field.opt,u=l?.format,d=l?.label||e.path.split(`/`).pop(),f=u&&u.type==`vector`,p=null;o.state&&(p=(0,hb.jsx)(eo,{state:o.state}));let m=null;o.shared.length>0&&(m=(0,hb.jsx)(so,{curves:o.shared}));let h=(0,hb.jsxs)(hb.Fragment,{children:[d,p,m]}),g=Ja(r,i,e.path);if(g){let r=(0,mb.createElement)(g.ui,{value:s,setValue:n=>t.api.setField(i,e.path,n),beginEdit:()=>t.api.beginEdit(i,e.path),target:i,path:e.path,opt:l,engine:n,editor:t});return(0,hb.jsx)(`div`,{...o.rowProps,children:(0,hb.jsx)(le,{title:h,vertical:g.layout===`block`,children:r})})}let _=null;if(Array.isArray(s))_=u?.type==`vector`?(0,hb.jsx)(te,{value:s,...l,...a}):u?.type==`color`?(0,hb.jsx)(b,{value:s,...l,onChange:n=>{t.api.setField(i,e.path,n)}}):(0,hb.jsx)(lb,{value:s,...l,...a});else if(_=(0,hb.jsx)(fa,{value:s,...l,...a}),c===`function`)return(0,hb.jsxs)(`div`,{className:fb.action,...o.rowProps,children:[_,(0,hb.jsxs)(`span`,{children:[p,m]})]});return(0,hb.jsx)(`div`,{...o.rowProps,children:(0,hb.jsx)(le,{title:h,vertical:f,children:_})})},gb.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldViewValue`,props:{path:{required:!0,tsType:{name:`string`},description:``},field:{required:!0,tsType:{name:`SerializeFieldDirectoryValue`},description:``}}}})))()}var vb,yb,bb,xb;function Sb(){return(Sb=t((()=>{vb=`SerializeFieldViewDir__container___LmNvb`,yb=`SerializeFieldViewDir__field___LmNvb`,bb=`SerializeFieldViewDir__block___LmNvb`,xb={container:vb,field:yb,block:bb}})))()}var Cb,wb;function Tb(){return(Tb=t((()=>{i(),E(),_b(),Sb(),Cb=o(),wb=e=>{let t=[],n=Object.keys(e.fields.childs);for(let r=0;r<n.length;r++){let i=n[r],a=e.fields.childs[i],{opt:o}=a,c=!1;if(o&&(c=typeof o.hidden==`function`?o.hidden(a.type==`value`?a.value:null):o.hidden||!1),c)continue;let l=`field`+i,u=(e.basePath?e.basePath+`/`:``)+i,d=null;d=a.type===`value`?(0,Cb.jsx)(gb,{path:u,field:a},l):(0,Cb.jsx)(`div`,{className:xb.block,children:(0,Cb.jsx)(s,{accordion:!0,label:i,children:(0,Cb.jsx)(wb,{fields:a,basePath:u})},l)},l),d&&t.push(d)}return(0,Cb.jsx)(`div`,{className:xb.container,children:t})},wb.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldViewDir`,props:{fields:{required:!0,tsType:{name:`MXP.SerializeFieldDirectoryFolder`},description:``},basePath:{required:!1,tsType:{name:`string`},description:``}}}})))()}var Eb,Db;function Ob(){return(Ob=t((()=>{Ha(),qa(),Tb(),Eb=o(),Db=e=>{let t=Ka(e),n=t.target.serializeToDirectory();if(e.filter){let t=n.childs[e.filter];t&&t.type===`folder`&&(n=t)}return(0,Eb.jsx)(Va.Provider,{value:t,children:(0,Eb.jsx)(wb,{fields:n,basePath:e.filter})})},Db.__docgenInfo={description:``,methods:[],displayName:`SerializeFieldView`}})))()}var J;function kb(){return(kb=t((()=>{Ga(),J=(e,t)=>{let n=n=>{e?.setField(t,n)},{fields:r}=Wa(e,[t]);return[r&&r[t],n]}})))()}var Ab,jb;function Mb(){return(Mb=t((()=>{Ab=`ComponentAdd__compAdd___LmNvb`,jb={compAdd:Ab}})))()}var Nb,Pb;function Fb(){return(Fb=t((()=>{E(),Ma(),L(),Mb(),Nb=o(),Pb=e=>{let{editor:t}=I(),{open:n,closeAll:r}=w(),i=ja(n=>{t.api.addComponent(e.entity,n.component),r()});return(0,Nb.jsx)(`div`,{className:jb.compAdd,children:(0,Nb.jsx)(c,{onClick:e=>{n((0,Nb.jsx)(fe,{items:i}),se(e.clientX,e.clientY))},children:`Add Component`})})},Pb.__docgenInfo={description:``,methods:[],displayName:`ComponentAdd`,props:{entity:{required:!0,tsType:{name:`MXP.Entity`},description:``}}}})))()}var Ib,Lb,Rb,zb,Bb,Vb;function Hb(){return(Hb=t((()=>{Ib=`ComponentView__compoView___LmNvb`,Lb=`ComponentView__head___LmNvb`,Rb=`ComponentView__name___LmNvb`,zb=`ComponentView__check___LmNvb`,Bb=`ComponentView__propertyBlock___LmNvb`,Vb={compoView:Ib,head:Lb,name:Rb,check:zb,delete:`ComponentView__delete___LmNvb`,propertyBlock:Bb}})))()}var Ub,Wb,Gb,Kb;function qb(){return(qb=t((()=>{Ub=i(),Ui(),E(),L(),to(),co(),Qy(),Ob(),kb(),Hb(),Wb=o(),Gb=e=>{let t=Object.keys(e.childs);for(let n=0;n<t.length;n++){let r=e.childs[t[n]],{opt:i}=r,a=!1;if(i&&(a=typeof i.hidden==`function`?i.hidden(r.type===`value`?r.value:null):i.hidden||!1),!a&&(r.type===`value`||Gb(r)))return!0}return!1},Kb=({component:e})=>{let{editor:t}=I(),[n]=J(e,`enabled`),r=Zy(e,`enabled`),i=e.initiator!==`user`,a=Gb(e.serializeToDirectory()),o=(0,Ub.useCallback)(n=>{n.stopPropagation();let r=e.entity;if(r){for(let[n,i]of r.components)if(i.uuid===e.uuid){t.api.removeComponent(r,n,e);break}}},[e,t]),c=(0,Ub.useCallback)(n=>{t.api.setField(e,`enabled`,n)},[e,t]),l=null;r.state&&(l=(0,Wb.jsx)(eo,{state:r.state}));let d=null;r.shared.length>0&&(d=(0,Wb.jsx)(so,{curves:r.shared}));let f=(0,Wb.jsxs)(`div`,{className:Vb.head,children:[(0,Wb.jsx)(`div`,{className:Vb.check,...r.rowProps,children:(0,Wb.jsx)(y,{checked:n||!1,onChange:c,readOnly:i})}),l,d,(0,Wb.jsx)(`div`,{className:Vb.name,children:F.resources.getComponentName(e)}),(0,Wb.jsx)(`div`,{className:Vb.delete,children:(0,Wb.jsx)(`button`,{onClick:o,children:(0,Wb.jsx)(u,{})})})]});return(0,Wb.jsx)(`div`,{className:Vb.compoView,"data-disable_component":i,children:(0,Wb.jsx)(`div`,{className:Vb.content,children:(0,Wb.jsx)(s,{label:f,accordion:a,bg:!0,defaultClose:!1,children:a&&(0,Wb.jsx)(Db,{target:e})})})})},Kb.__docgenInfo={description:``,methods:[],displayName:`ComponentView`,props:{component:{required:!0,tsType:{name:`MXP.Component`},description:``}}}})))()}var Jb,Yb;function Xb(){return(Xb=t((()=>{Jb=`ComponentList__container___LmNvb`,Yb={container:Jb}})))()}var Zb,Qb,$b;function ex(){return(ex=t((()=>{Zb=i(),kb(),qb(),Xb(),Qb=o(),$b=({entity:e})=>{let[t]=J(e,`components`),n=(0,Zb.useMemo)(()=>{let n=[];return t?(t.forEach(t=>{let r=e.getComponentByUUID(t);r&&n.push((0,Qb.jsx)(Kb,{component:r},r.uuid))}),n):null},[t,e]);return(0,Qb.jsx)(`div`,{className:Yb.container,children:n})},$b.__docgenInfo={description:``,methods:[],displayName:`ComponentList`}})))()}var tx,nx,rx;function ix(){return(ix=t((()=>{tx=i(),E(),L(),Ob(),kb(),Fb(),ex(),nx=o(),rx=()=>{let{editor:e,engine:t}=I(),[n]=J(e,`selectedEntityId`),r=(0,tx.useMemo)(()=>{if(n)return t.root.findEntityByUUID(n)},[t,n]);return r?(0,nx.jsxs)(nx.Fragment,{children:[(0,nx.jsx)(s,{label:`Fields`,accordion:!0,children:(0,nx.jsx)(Db,{target:r})}),(0,nx.jsxs)(s,{label:`Components`,accordion:!0,children:[(0,nx.jsx)($b,{entity:r}),(0,nx.jsx)(Pb,{entity:r})]})]}):null},rx.__docgenInfo={description:``,methods:[],displayName:`EntityProperty`}})))()}var ax,ox,sx;function cx(){return(cx=t((()=>{ax=`ExportControl__exportControl___LmV4c`,ox=`ExportControl__exportControl_inner___LmV4c`,sx={exportControl:ax,exportControl_inner:ox,export:`ExportControl__export___LmV4c`}})))()}var lx,ux,dx;function fx(){return(fx=t((()=>{lx=i(),E(),L(),cx(),ux=o(),dx=()=>{let{editor:e}=I(),[t,n]=(0,lx.useState)(null);return(0,lx.useEffect)(()=>{let t=()=>{n(e.exportProgress?{...e.exportProgress}:null)};return e.on(`update/export`,t),()=>{e.off(`update/export`,t)}},[e]),(0,ux.jsx)(`div`,{className:sx.exportControl,children:(0,ux.jsx)(`div`,{className:sx.exportControl_inner,children:(0,ux.jsx)(s,{label:`MP4`,accordion:!0,children:(0,ux.jsx)(`div`,{className:sx.export,children:(0,ux.jsx)(c,{onClick:()=>{e.isExporting||e.exportMP4()},children:t?`Exporting... ${Math.floor(t.current/t.total*100)}%`:`Export MP4`})})})})})},dx.__docgenInfo={description:``,methods:[],displayName:`ExportControl`}})))()}var px,mx;function hx(){return(hx=t((()=>{px=i(),mx=(0,px.createContext)(null)})))()}var gx,_x;function vx(){return(vx=t((()=>{gx=i(),hx(),_x=()=>{let e=(0,gx.useContext)(mx);if(e===null)throw Error(`useOREngine must be used within a OREngineProvider`);return e}})))()}var yx,bx,xx,Sx,Cx,wx,Tx,Ex,Dx,Ox,kx,Ax,jx,Mx,Nx,Px,Fx,Ix,Lx;function Rx(){return(Rx=t((()=>{yx=`GPUTimer__container___LmNvb`,bx=`GPUTimer__headerRow___LmNvb`,xx=`GPUTimer__totalTime___LmNvb`,Sx=`GPUTimer__toggleButton___LmNvb`,Cx=`GPUTimer__controls___LmNvb`,wx=`GPUTimer__control___LmNvb`,Tx=`GPUTimer__controlLabel___LmNvb`,Ex=`GPUTimer__select___LmNvb`,Dx=`GPUTimer__input___LmNvb`,Ox=`GPUTimer__group___LmNvb`,kx=`GPUTimer__item___LmNvb`,Ax=`GPUTimer__clickable___LmNvb`,jx=`GPUTimer__itemRow___LmNvb`,Mx=`GPUTimer__itemName___LmNvb`,Nx=`GPUTimer__itemTime___LmNvb`,Px=`GPUTimer__itemStats___LmNvb`,Fx=`GPUTimer__progressBar___LmNvb`,Ix=`GPUTimer__progressFill___LmNvb`,Lx={container:yx,headerRow:bx,totalTime:xx,toggleButton:Sx,controls:Cx,control:wx,controlLabel:Tx,select:Ex,input:Dx,group:Ox,item:kx,clickable:Ax,itemRow:jx,itemName:Mx,itemTime:Nx,itemStats:Px,progressBar:Fx,progressFill:Ix}})))()}var zx,Bx;function Vx(){return(Vx=t((()=>{zx=class{buffer;index;size;filled;constructor(e){this.size=e,this.buffer=Array(e),this.index=0,this.filled=!1}push(e){this.buffer[this.index]=e,this.index=(this.index+1)%this.size,!this.filled&&this.index===0&&(this.filled=!0)}getAverage(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=0;for(let n=0;n<e;n++)t+=this.buffer[n];return t/e}getMax(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]>t&&(t=this.buffer[n]);return t}getMin(){let e=this.filled?this.size:this.index;if(e===0)return 0;let t=this.buffer[0];for(let n=1;n<e;n++)this.buffer[n]<t&&(t=this.buffer[n]);return t}getCount(){return this.filled?this.size:this.index}},Bx=class{buffers;windowSize;currentData;constructor(e=30){this.windowSize=e,this.buffers=new Map,this.currentData=new Map}update(e){let t=performance.now();for(let n=0;n<e.length;n++){let r=e[n],i=r.name.split(`/`),a=i[0]||`unknown`,o,s=i[i.length-1],c=s&&s.match(/\[([^\]]+)\]/);c&&(o=c[1]);let l={name:r.name,duration:r.duration,timestamp:t,renderType:a},u=this.buffers.get(r.name);u||(u=new zx(this.windowSize),this.buffers.set(r.name,u)),u.push(r.duration),this.currentData.set(r.name,{...l,entityId:o})}}getStatistics(){let e=[],t=0,n=performance.now(),r=[];return this.currentData.forEach((e,t)=>{n-e.timestamp>1e3&&r.push(t)}),r.forEach(e=>{this.currentData.delete(e)}),this.currentData.forEach(e=>{t+=e.duration}),this.currentData.forEach(n=>{let r=this.buffers.get(n.name);r&&e.push({name:n.name,renderType:n.renderType,entityId:n.entityId,current:n.duration,avg:r.getAverage(),max:r.getMax(),min:r.getMin(),samples:r.getCount(),percentage:t>0?n.duration/t*100:0})}),e}getTotalTime(){let e=0;return this.currentData.forEach(t=>{e+=t.duration}),e}}})))()}var Hx,Y,Ux,Wx,Gx,Kx;function qx(){return(qx=t((()=>{Hx=i(),vx(),L(),Rx(),Vx(),Y=o(),Ux=e=>{if(e<2){let t=e/2;return`rgb(${Math.floor(100+t*100)}, 200, 100)`}if(e<5){let t=(e-2)/3;return`rgb(200, ${Math.floor(200-t*50)}, 100)`}if(e<10){let t=(e-5)/5;return`rgb(200, ${Math.floor(150-t*80)}, ${Math.floor(100-t*50)})`}return`rgb(200, 70, 50)`},Wx=e=>e>=10?e.toFixed(1):e>=1?e.toFixed(2):e.toFixed(3),Gx=e=>e.replace(/\[([^\]]{4,})\]/g,(e,t)=>`[${t.slice(0,3)}]`),Kx=()=>{let{editor:e}=I(),{engine:t}=_x(),[n,r]=(0,Hx.useState)([]),[i,a]=(0,Hx.useState)(0),[o,s]=(0,Hx.useState)(`all`),[c,l]=(0,Hx.useState)(0),[u,d]=(0,Hx.useState)(`time`),[f,p]=(0,Hx.useState)(!1),m=(0,Hx.useRef)(new Bx(30)),h=(0,Hx.useRef)(0),g=(0,Hx.useRef)(!1),_=(0,Hx.useRef)(0),v=(0,Hx.useCallback)(n=>{if(!n)return;let r=t.root.findEntityByUUID(n);r&&e.selectEntity(r)},[t,e]);(0,Hx.useEffect)(()=>{let e=t.renderer,n=m.current,i=e=>{f&&(n.update(e),g.current=!0)},o=e=>{g.current&&e-_.current>=300&&(r(n.getStatistics()),a(n.getTotalTime()),g.current=!1,_.current=e),h.current=requestAnimationFrame(o)};return e.on(`timer`,i),h.current=requestAnimationFrame(o),()=>{e.off(`timer`,i),cancelAnimationFrame(h.current)}},[t,f]);let y=n.filter(e=>!(o!==`all`&&e.renderType!==o||e.avg<c)),b=Array.from(new Set(n.map(e=>e.renderType))),x=[...y].sort((e,t)=>u===`time`?t.avg-e.avg:e.name.localeCompare(t.name)),S=i>0?Math.floor(1e3/i):0;return(0,Y.jsxs)(`div`,{className:Lx.container,children:[(0,Y.jsxs)(`div`,{className:Lx.headerRow,children:[(0,Y.jsxs)(`span`,{className:Lx.totalTime,children:[Wx(i),`ms (`,S,`fps)`]}),(0,Y.jsx)(`button`,{className:Lx.toggleButton,onClick:()=>p(!f),title:f?`Stop timer`:`Start timer`,children:f?`⏸`:`▶`})]}),(0,Y.jsxs)(`div`,{className:Lx.controls,children:[(0,Y.jsxs)(`div`,{className:Lx.control,children:[(0,Y.jsx)(`span`,{className:Lx.controlLabel,children:`Type`}),(0,Y.jsxs)(`select`,{className:Lx.select,value:o,onChange:e=>s(e.target.value),children:[(0,Y.jsx)(`option`,{value:`all`,children:`All`}),b.map(e=>(0,Y.jsx)(`option`,{value:e,children:e},e))]})]}),(0,Y.jsxs)(`div`,{className:Lx.control,children:[(0,Y.jsx)(`span`,{className:Lx.controlLabel,children:`Min`}),(0,Y.jsx)(`input`,{className:Lx.input,type:`number`,min:`0`,step:`0.1`,value:c,onChange:e=>l(parseFloat(e.target.value)||0)})]}),(0,Y.jsxs)(`div`,{className:Lx.control,children:[(0,Y.jsx)(`span`,{className:Lx.controlLabel,children:`Sort`}),(0,Y.jsxs)(`select`,{className:Lx.select,value:u,onChange:e=>d(e.target.value),children:[(0,Y.jsx)(`option`,{value:`time`,children:`Time`}),(0,Y.jsx)(`option`,{value:`name`,children:`Name`})]})]})]}),(0,Y.jsx)(`div`,{className:Lx.group,children:x.map((e,t)=>{let n=Ux(e.avg),r=i>0?e.avg/i*100:0,a=!!e.entityId;return(0,Y.jsxs)(`div`,{className:`${Lx.item} ${a?Lx.clickable:``}`,onClick:()=>v(e.entityId),children:[(0,Y.jsxs)(`div`,{className:Lx.itemRow,children:[(0,Y.jsx)(`span`,{className:Lx.itemName,title:e.name,children:Gx(e.name)}),(0,Y.jsx)(`span`,{className:Lx.itemTime,style:{color:n},children:Wx(e.avg)}),(0,Y.jsx)(`span`,{className:Lx.itemStats,children:Wx(e.max)})]}),(0,Y.jsx)(`div`,{className:Lx.progressBar,children:(0,Y.jsx)(`div`,{className:Lx.progressFill,style:{width:`${r}%`,backgroundColor:n}})})]},e.name+t)})})]})},Kx.__docgenInfo={description:``,methods:[],displayName:`Timer`}})))()}var Jx,Yx;function Xx(){return(Xx=t((()=>{Jx=e=>{let t=[];for(let n of e.children)n.editorHidden||t.push(n);return t.sort((e,t)=>e.name.localeCompare(t.name)),t},Yx=(e,t)=>{let n=[],r=e=>{if(n.push(e),t.has(e.uuid))for(let t of Jx(e))r(t)};return r(e),n}})))()}var Zx,Qx,$x,eS,tS,nS,rS,iS,aS,oS,sS,cS,lS,uS;function dS(){return(dS=t((()=>{Zx=`HierarchyNode__node___Lm5vZ`,Qx=`HierarchyNode__self___Lm5vZ`,$x=`HierarchyNode__self_drop___Lm5vZ`,eS=`HierarchyNode__self_name___Lm5vZ`,tS=`HierarchyNode__self_name_input___Lm5vZ`,nS=`HierarchyNode__icon___Lm5vZ`,rS=`HierarchyNode__selectable___Lm5vZ`,iS=`HierarchyNode__visibility___Lm5vZ`,aS=`HierarchyNode__menu___Lm5vZ`,oS=`HierarchyNode__fold___Lm5vZ`,sS=`HierarchyNode__fold_button___Lm5vZ`,cS=`HierarchyNode__child___Lm5vZ`,lS=`HierarchyNode__child_line___Lm5vZ`,uS={node:Zx,self:Qx,self_drop:$x,self_name:eS,self_name_input:tS,icon:nS,selectable:rS,visibility:iS,menu:aS,fold:oS,fold_button:sS,child:cS,child_line:lS}})))()}var fS,pS,mS;function hS(){return(hS=t((()=>{fS=i(),P(),E(),Fa(),L(),kb(),Xx(),dS(),pS=o(),mS=e=>{let{editor:t}=I(),[n]=J(t,`selectedEntityId`),[r]=J(t,`selectedEntityIds`),i=(r||[]).includes(e.entity.uuid),o=n===e.entity.uuid,[s]=J(e.entity,`name`),[c,u]=J(e.entity,`visible`),[f,m]=J(t,`unselectableEntityIds`);J(e.entity,`children`);let h=!(f||[]).includes(e.entity.uuid),_=e.depth||0,y=Jx(e.entity),b=y.length>0,x=_*20,S=e.entity.initiator==`script`,C=(0,fS.useMemo)(()=>e.entity.getComponent(Ht)?(0,pS.jsx)(p,{size:14}):e.entity.getComponent(Rt)?(0,pS.jsx)(l,{size:14}):e.entity.getComponent(M)?(0,pS.jsx)(g,{size:14}):null,[e.entity]),ee=e.openNodes.has(e.entity.uuid),T=(0,fS.useCallback)(t=>{e.setNodeOpen(e.entity.uuid,!ee),t.stopPropagation()},[ee,e]),{onNodePointerDown:te}=e,ne=(0,fS.useCallback)(t=>{te(t,e.entity)},[te,e.entity]),E=(0,fS.useCallback)(e=>{e.stopPropagation(),u&&u(!c)},[c,u]),re=(0,fS.useCallback)(t=>{t.stopPropagation();let n=new Set(f||[]);h?n.add(e.entity.uuid):n.delete(e.entity.uuid),m(Array.from(n))},[h,f,m,e.entity.uuid]),[ie,ae]=(0,fS.useState)(null),oe=(0,fS.useRef)(!1),ce=(0,fS.useCallback)(()=>{S||ae(e.entity.name)},[S,e.entity]);(0,fS.useEffect)(()=>{let n=t=>{t===e.entity&&ce()};return t.on(`request/renameEntity`,n),()=>{t.off(`request/renameEntity`,n)}},[t,e.entity,ce]);let le=(0,fS.useCallback)(e=>{e.key===`Enter`&&e.currentTarget.blur(),e.key===`Escape`&&(oe.current=!0,e.currentTarget.blur())},[]),ue=(0,fS.useCallback)(()=>{let n=oe.current;if(oe.current=!1,ae(null),n||ie===null)return;let r=ie.trim();r!==``&&r!==e.entity.name&&t.api.setField(e.entity,`name`,r)},[ie,t,e.entity]),{open:pe,closeAll:me}=w(),he=Pa(e.entity),ge=(0,fS.useCallback)(n=>{if(n.preventDefault(),!t||S)return;t.selectedEntities.includes(e.entity)||t.selectEntity(e.entity);let r=t.selectedEntities.length,i=[{label:`Add Entity`,children:he}];e.entity.parent&&i.push({label:`Duplicate`,onClick:()=>{t.duplicateSelected(),me()}}),i.push({label:`Rename`,onClick:()=>{t.emit(`request/renameEntity`,[e.entity]),me()}},{label:`Delete Entity`,onClick:()=>{t.deleteSelected(),me()}});let a=e.entity.name;r>1&&(a=`${r} Entities`),pe((0,pS.jsx)(fe,{title:a,items:i}),se(n.clientX,n.clientY))},[t,e.entity,pe,me,S,he]),_e=(0,pS.jsx)(`p`,{children:s||`-`});ie!==null&&(_e=(0,pS.jsx)(`input`,{className:uS.self_name_input,value:ie,autoFocus:!0,onChange:e=>ae(e.target.value),onFocus:e=>e.currentTarget.select(),onKeyDown:le,onBlur:ue,onClick:e=>e.stopPropagation()}));let ve=uS.self;return e.dropTargetId===e.entity.uuid&&(ve=`${uS.self} ${uS.self_drop}`),(0,pS.jsxs)(`div`,{className:uS.node,"data-no_export":S,children:[(0,pS.jsx)(`div`,{"data-hnode_uuid":e.entity.uuid,onPointerDown:ne,children:(0,pS.jsxs)(de,{className:ve,style:{paddingLeft:x},onContextMenu:ge,selected:i,active:o,children:[(0,pS.jsx)(`div`,{className:uS.fold,"data-hnode_open":ee,children:b&&(0,pS.jsx)(`button`,{className:uS.fold_button,onClick:T,children:(0,pS.jsx)(a,{open:ee})})}),C&&(0,pS.jsx)(`div`,{className:uS.icon,children:C}),(0,pS.jsx)(`div`,{className:uS.self_name,onDoubleClick:ce,children:_e}),(0,pS.jsx)(`button`,{className:uS.selectable,onClick:re,"data-selectable":h,children:(0,pS.jsx)(v,{size:14,selectable:h})}),(0,pS.jsx)(`button`,{className:uS.visibility,onClick:E,"data-visible":c!==!1,children:(0,pS.jsx)(d,{size:14,visible:c!==!1})}),!S&&(0,pS.jsx)(`button`,{className:uS.menu,onClick:ge,children:`⋯`})]})}),b&&(0,pS.jsxs)(`div`,{className:uS.child,"data-open":ee,children:[y.map(t=>(0,pS.jsx)(mS,{entity:t,depth:_+1,openNodes:e.openNodes,setNodeOpen:e.setNodeOpen,dropTargetId:e.dropTargetId,onNodePointerDown:e.onNodePointerDown},t.uuid)),(0,pS.jsx)(`div`,{className:uS.child_line,style:{marginLeft:x+4}})]})]})},mS.__docgenInfo={description:``,methods:[],displayName:`HierarchyNode`,props:{depth:{required:!1,tsType:{name:`number`},description:``},entity:{required:!0,tsType:{name:`MXP.Entity`},description:``},openNodes:{required:!0,tsType:{name:`Set`,elements:[{name:`string`}],raw:`Set<string>`},description:``},setNodeOpen:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( uuid: string, open: boolean ) => void`,signature:{arguments:[{type:{name:`string`},name:`uuid`},{type:{name:`boolean`},name:`open`}],return:{name:`void`}}},description:``},dropTargetId:{required:!0,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},onNodePointerDown:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( e: PointerEvent, entity: MXP.Entity ) => void`,signature:{arguments:[{type:{name:`PointerEvent`},name:`e`},{type:{name:`MXP.Entity`},name:`entity`}],return:{name:`void`}}},description:``}}}})))()}var gS;function _S(){return(_S=t((()=>{gS={}})))()}var vS,yS,bS,xS,SS,CS,wS,TS;function ES(){return(ES=t((()=>{vS=i(),L(),kb(),hS(),_S(),Xx(),yS=o(),bS=`hierarchyOpenNodes`,xS=()=>{try{let e=localStorage.getItem(bS);if(e)return new Set(JSON.parse(e))}catch{}return new Set},SS=e=>{localStorage.setItem(bS,JSON.stringify(Array.from(e)))},CS=4,wS=`data-hnode_uuid`,TS=()=>{let{editor:e,engine:t}=I(),[n]=J(e,`selectedEntityId`),r=t.root,[i,a]=(0,vS.useState)(xS),o=(0,vS.useCallback)((e,t)=>{a(n=>{let r=new Set(n);return t?r.add(e):r.delete(e),SS(r),r})},[]);(0,vS.useEffect)(()=>{if(!n)return;let e=r.findEntityByUUID(n);if(!e)return;let t=[],i=e.parent;for(;i;)t.push(i.uuid),i=i.parent;a(e=>{if(t.every(t=>e.has(t)))return e;let n=new Set(e);return t.forEach(e=>n.add(e)),SS(n),n})},[n,r]);let s=(0,vS.useCallback)((t,n)=>{if(n.toggle){e.toggleEntitySelection(t);return}let a=e.activeEntity;if(!n.range||!a){e.selectEntity(t);return}let o=Yx(r,i),s=o.indexOf(a),c=o.indexOf(t);if(s<0||c<0){e.selectEntity(t);return}let l=o.slice(Math.min(s,c),Math.max(s,c)+1);e.setSelection(l,a)},[e,r,i]),[c,l]=(0,vS.useState)(null),u=(0,vS.useRef)(null);(0,vS.useEffect)(()=>()=>{u.current&&u.current()},[]);let d=(0,vS.useCallback)((t,n)=>{if(t.button!==0||t.target.closest(`button, input`))return;let i=t.clientX,a=t.clientY,o={toggle:t.ctrlKey||t.metaKey,range:t.shiftKey},c=null,d=null,f=(e,t)=>{let n=document.elementFromPoint(e,t);if(!n)return null;let i=n.closest(`[${wS}]`);return i?r.findEntityByUUID(i.getAttribute(wS))??null:null},p=t=>{if(!c){let r=t.clientX-i,o=t.clientY-a;if(Math.sqrt(r*r+o*o)<CS)return;let s=e.selectedEntities;s.includes(n)?c=s:(e.selectEntity(n),c=[n])}let r=f(t.clientX,t.clientY);d=null,r&&e.getReparentError(c,r)===null?(d=r,l(r.uuid)):l(null)},m=()=>{if(h(),!c){s(n,o);return}d&&e.reparentEntities(c,d)},h=()=>{window.removeEventListener(`pointermove`,p),window.removeEventListener(`pointerup`,m),window.removeEventListener(`pointercancel`,h),window.removeEventListener(`contextmenu`,h),u.current=null,l(null)};u.current&&u.current(),u.current=h,window.addEventListener(`pointermove`,p),window.addEventListener(`pointerup`,m),window.addEventListener(`pointercancel`,h),window.addEventListener(`contextmenu`,h)},[e,r,s]);return(0,yS.jsx)(`div`,{className:gS.hierarchy,children:r&&(0,yS.jsx)(mS,{entity:r,openNodes:i,setNodeOpen:o,dropTargetId:c,onNodePointerDown:d})})},TS.__docgenInfo={description:``,methods:[],displayName:`Hierarchy`}})))()}var DS,OS,kS,AS;function jS(){return(jS=t((()=>{DS=i(),E(),L(),OS=o(),kS=[{label:`Position`,paths:[`position`]},{label:`Rotation`,paths:[`euler`]},{label:`Scale`,paths:[`scale`]},{label:`All`,paths:[`position`,`euler`,`scale`]}],AS=()=>{let{editor:e}=I(),{open:t,closeAll:n}=w(),[r,i]=(0,DS.useState)(null),a=(0,DS.useRef)({x:0,y:0});return(0,DS.useEffect)(()=>{let e=e=>{a.current.x=e.clientX,a.current.y=e.clientY};return window.addEventListener(`pointermove`,e),()=>{window.removeEventListener(`pointermove`,e)}},[]),(0,DS.useEffect)(()=>{let r=r=>{n();let i=[];for(let t of kS)i.push({label:t.label,onClick:()=>{let i=[];for(let e of t.paths)i.push({target:r,path:e});e.insertKeys(i),n()}});t((0,OS.jsx)(fe,{title:`Insert Keyframe`,items:i}),se(a.current.x,a.current.y))},o=e=>{i({text:e,anchor:se(a.current.x,a.current.y)})};return e.on(`request/insertKeyMenu`,r),e.on(`message`,o),()=>{e.off(`request/insertKeyMenu`,r),e.off(`message`,o)}},[e,t,n]),r?(0,OS.jsx)(ce,{title:`Keyframe`,anchor:r.anchor,onClose:()=>i(null),children:r.text}):null},AS.__docgenInfo={description:``,methods:[],displayName:`KeyFrame`}})))()}var MS,NS;function PS(){return(PS=t((()=>{MS=`Canvas__container___LmNvb`,NS={container:MS}})))()}var FS,IS,LS;function RS(){return(RS=t((()=>{FS=i(),L(),PS(),IS=o(),LS=({viewportId:e})=>{let{engine:t,editor:n}=I(),r=(0,FS.useRef)(null);return(0,FS.useEffect)(()=>{let i=r.current;if(!t||!i)return;let a=n.createViewport(e,i);return()=>{a.dispose()}},[t,n,e]),(0,IS.jsx)(`div`,{className:NS.container,role:`presentation`,"aria-label":`3D Canvas`,children:(0,IS.jsx)(`canvas`,{ref:r})})},LS.__docgenInfo={description:``,methods:[],displayName:`Canvas`}})))()}var zS,BS;function VS(){return(VS=t((()=>{zS=`AudioView__audioView___LmF1Z`,BS={audioView:zS}})))()}var HS;function US(){return(US=t((()=>{at(),k(),HS=class extends tt{wrapperElm;canvas;canvasCtx;viewRangeFrame;viewPort;viewPortRange;musicBuffer;resizeObserver;framePlay;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0];let e=window.localStorage.getItem(`audioViweRange`);this.viewRangeFrame=e?Number(e):2,this.framePlay={current:0,playing:!1},this.musicBuffer=null,this.resizeObserver=new ResizeObserver(this.onResize.bind(this))}onResize(){if(this.wrapperElm){let e=new D(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);this.canvas.width=e.x,this.canvas.height=e.y}this.render()}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.musicBuffer){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/60,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)]*1,s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]*1+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}this.canvasCtx.fillStyle=`#555`,this.canvasCtx.fillRect(this.canvas.width/2,0,1,this.canvas.height)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.canvas),this.onResize()}setFramePlaying(e){this.framePlay=e,this.viewPort=[this.framePlay.current-this.viewRangeFrame,0,this.framePlay.current+this.viewRangeFrame,0],this.viewPortRange=[this.viewPort[2]-this.viewPort[0],this.viewPort[3]-this.viewPort[1]],this.render()}setViewRangeFrame(e){this.viewRangeFrame=e,this.setFramePlaying(this.framePlay),localStorage.setItem(`audioViweRange`,String(this.viewRangeFrame))}setMusicBuffer(e){this.musicBuffer=e,this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.canvas),this.resizeObserver.disconnect()}},HS.__docgenInfo={description:``,methods:[{name:`setWrapperElm`,docblock:null,modifiers:[],params:[{name:`elm`,optional:!1,type:{name:`HTMLElement`,alias:`HTMLElement`}}],returns:null},{name:`setFramePlaying`,docblock:null,modifiers:[],params:[{name:`frame`,optional:!1,type:{name:`FramePlay`,alias:`FramePlay`}}],returns:null},{name:`setViewRangeFrame`,docblock:null,modifiers:[],params:[{name:`rangeFrame`,optional:!1,type:{name:`number`}}],returns:null},{name:`setMusicBuffer`,docblock:null,modifiers:[],params:[{name:`buffer`,optional:!1,type:{name:`AudioBuffer`,alias:`AudioBuffer`}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`AudioViewRenderer`}})))()}var WS,GS,KS;function qS(){return(qS=t((()=>{WS=i(),L(),VS(),US(),GS=o(),KS=()=>{let{editor:e}=I(),t=(0,WS.useRef)(null),[n,r]=(0,WS.useState)();(0,WS.useEffect)(()=>{let e=new HS;if(r(e),t.current)return e.setWrapperElm(t.current),()=>{e.dispose()}},[]);let i=e&&e.audioBuffer,[a,o]=(0,WS.useState)(),[s,c]=(0,WS.useState)({current:0,playing:!1});(0,WS.useEffect)(()=>{if(!e)return;let t=e.engine,n=0,r=()=>{o(n++)},i=e=>{c({...e})};return i(t.frame),t.on(`update/music`,r),t.on(`update/frame/play`,i),()=>{t.off(`update/music`,r),t.off(`update/frame/play`,i)}},[e]),(0,WS.useEffect)(()=>{n&&i&&n.setMusicBuffer(i)},[n,i,a]),(0,WS.useEffect)(()=>{n&&s&&n.setFramePlaying(s)},[n,s]);let l=(0,WS.useCallback)(e=>{if(n){let t=e.deltaY>0?1.1:.9;n.setViewRangeFrame(n.viewRangeFrame*t)}e.preventDefault()},[n]);return(0,WS.useEffect)(()=>{let e=t.current;return e&&e.addEventListener(`wheel`,l,{passive:!1}),()=>{e&&e.removeEventListener(`wheel`,l)}},[l]),(0,GS.jsx)(`div`,{className:BS.audioView,ref:t})},KS.__docgenInfo={description:``,methods:[],displayName:`AudioView`}})))()}var JS,YS,XS;function ZS(){return(ZS=t((()=>{JS=`CameraPad__cameraPad___LmNhb`,YS=`CameraPad__btn___LmNhb`,XS={cameraPad:JS,btn:YS}})))()}var QS,$S;function eC(){return(eC=t((()=>{L(),kb(),ZS(),QS=o(),$S=({viewportId:e})=>{let{editor:t}=I(),[n]=J(t,`selectedEntityId`),[r]=J(t,`viewports/${e}/cameraView`);return(0,QS.jsxs)(`div`,{className:XS.cameraPad,children:[(0,QS.jsx)(`div`,{className:XS.btn,"data-disabled":!n,onClick:()=>{n&&t.focusSelected()},title:`Focus selected ( . )`,children:`Focus`}),(0,QS.jsx)(`div`,{className:XS.btn,"data-active":r===`camera`,onClick:()=>{t.toggleCameraView()},title:`Toggle scene camera view ( 0 )`,children:`Scene Cam`})]})},$S.__docgenInfo={description:``,methods:[],displayName:`CameraPad`}})))()}var tC,nC,rC,iC,aC,oC,sC,cC,lC,uC,dC,fC,pC,mC,hC,gC,_C,vC,yC,bC,xC,X;function SC(){return(SC=t((()=>{tC=`Screen__screen___LnNjc`,nC=`Screen__header___LnNjc`,rC=`Screen__header_tabs___LnNjc`,iC=`Screen__header_tab___LnNjc`,aC=`Screen__header_right___LnNjc`,oC=`Screen__header_item___LnNjc`,sC=`Screen__content___LnNjc`,cC=`Screen__gizmoMode___LnNjc`,lC=`Screen__gizmoMode_btn___LnNjc`,uC=`Screen__gizmoMode_separator___LnNjc`,dC=`Screen__modalStatus___LnNjc`,fC=`Screen__canvas___LnNjc`,pC=`Screen__audioViewHandle___LnNjc`,mC=`Screen__audioView___LnNjc`,hC=`Screen__displayOptions___LnNjc`,gC=`Screen__displayOptions_btn___LnNjc`,_C=`Screen__overlay___LnNjc`,vC=`Screen__overlay_field___LnNjc`,yC=`Screen__overlay_label___LnNjc`,bC=`Screen__overlay_separator___LnNjc`,xC=`Screen__externalBtn___LnNjc`,X={screen:tC,header:nC,header_tabs:rC,header_tab:iC,header_right:aC,header_item:oC,content:sC,gizmoMode:cC,gizmoMode_btn:lC,gizmoMode_separator:uC,modalStatus:dC,canvas:fC,audioViewHandle:pC,audioView:mC,displayOptions:hC,displayOptions_btn:gC,overlay:_C,overlay_field:vC,overlay_label:yC,overlay_separator:bC,externalBtn:xC}})))()}var CC,Z,wC,TC;function EC(){return(EC=t((()=>{CC=i(),E(),Ce(),L(),Sa(),RS(),pa(),kb(),qS(),eC(),SC(),Z=o(),wC=`viewport`,TC=({viewportId:e})=>{let{editor:t}=I(),n=Se(),[r,i]=J(t,`enableRender`),[a,o]=J(t,`viewports/${e}/preview`),[s,l]=J(t,`viewType`),[u,d]=J(t,`viewports/${e}/resolutionScale`),[f,p]=J(t,`gizmoMode`),[m,h]=J(t,`transformOrientation`),[g]=J(t,`modalStatus`),[_,v]=J(t,`viewports/${e}/helpers/show`),[y,b]=J(t,`viewports/${e}/helpers/empty`),[x,S]=J(t,`viewports/${e}/helpers/camera`),[C,ee]=J(t,`viewports/${e}/helpers/light`),[w,T]=J(t,`viewports/${e}/helpers/grid`),[te,ne]=J(t,`viewports/${e}/helpers/wireframe`),[E,re]=J(t,`viewports/${e}/helpers/gizmo`),[ie,ae]=J(t,`viewports/${e}/helpers/outline`),[oe,se]=J(t,`viewports/${e}/helpers/relationships`),[ce]=xa(`showAudioView`),[ue,de]=(0,CC.useState)(50),fe=(0,CC.useRef)(null),[pe,me]=(0,CC.useState)(!1),he=(0,CC.useRef)(null),ge=(0,CC.useCallback)(e=>{he.current&&!he.current.contains(e.target)&&me(!1)},[]);return(0,CC.useEffect)(()=>(pe&&document.addEventListener(`pointerdown`,ge),()=>{document.removeEventListener(`pointerdown`,ge)}),[pe,ge]),(0,Z.jsxs)(`div`,{className:X.screen,children:[(0,Z.jsxs)(`div`,{className:X.header,children:[(0,Z.jsx)(`div`,{className:X.header_tabs,children:(0,Z.jsx)(`div`,{className:X.header_tab,"data-active":!!a,onClick:()=>o&&o(!a),title:`Camera Render`,children:(0,Z.jsx)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 512 512`,fill:`currentColor`,xmlns:`http://www.w3.org/2000/svg`,children:(0,Z.jsx)(`path`,{d:`M32 144 H336 V368 H32 Z M368 224 L480 152 V360 L368 288 Z`})})})}),(0,Z.jsxs)(`div`,{className:X.header_right,children:[(0,Z.jsx)(`div`,{className:X.header_item,children:(0,Z.jsx)(le,{title:`View`,children:(0,Z.jsx)(fa,{value:s,format:{type:`select`,list:[`render`,`debug`]},onChange:e=>l&&l(e)})})}),(0,Z.jsx)(`div`,{className:X.header_item,children:(0,Z.jsx)(le,{title:`Res`,children:(0,Z.jsx)(fa,{value:u,format:{type:`select`,list:[,,,,,,].fill(0).map((e,t)=>{let n=2**t,r=1/n;return{value:r,label:r==1?`1`:`1/`+n}})},onChange:e=>d&&d(e)})})}),n.isPC&&(0,Z.jsx)(`div`,{className:X.externalBtn,children:(0,Z.jsx)(c,{onClick:()=>{t.openInExternalWindow()},children:(0,Z.jsxs)(`svg`,{width:`32`,height:`12`,viewBox:`0 0 512 512`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,Z.jsxs)(`g`,{clipPath:`url(#clip0_224_2)`,children:[(0,Z.jsx)(`path`,{d:`M96 0V416H512V0H96ZM472 376H136V40H472V376Z`,fill:`#aaa`}),(0,Z.jsx)(`path`,{d:`M40 472V296V136V96H0V512H416V472H376H40Z`,fill:`#aaa`}),(0,Z.jsx)(`path`,{d:`M232.812 312.829L350.671 194.969V279.766H390.671V126.688H237.594V166.688H322.39L204.531 284.547L232.812 312.829Z`,fill:`#aaa`})]}),(0,Z.jsx)(`defs`,{children:(0,Z.jsx)(`clipPath`,{id:`clip0_224_2`,children:(0,Z.jsx)(`rect`,{width:`512`,height:`512`,fill:`white`})})})]})})})]})]}),(0,Z.jsxs)(`div`,{className:X.content,children:[(0,Z.jsxs)(`div`,{className:X.displayOptions,ref:he,children:[(0,Z.jsx)(`div`,{className:X.displayOptions_btn,"data-active":pe,onClick:()=>me(!pe),title:`Display Options`,children:`⚙`}),pe&&(0,Z.jsxs)(`div`,{className:X.overlay,children:[(0,Z.jsx)(`div`,{className:X.overlay_label,children:`Rendering`}),(0,Z.jsx)(`div`,{className:X.overlay_field,children:(0,Z.jsx)(le,{title:`Render`,children:(0,Z.jsx)(fa,{value:r,onChange:e=>i&&i(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_separator}),(0,Z.jsx)(`div`,{className:X.overlay_label,children:`Helpers`}),(0,Z.jsx)(`div`,{className:X.overlay_field,children:(0,Z.jsx)(le,{title:`Show`,children:(0,Z.jsx)(fa,{value:_,onChange:e=>v&&v(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_field,"data-indent":`true`,children:(0,Z.jsx)(le,{title:`Empty`,children:(0,Z.jsx)(fa,{value:y,onChange:e=>b&&b(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_field,"data-indent":`true`,children:(0,Z.jsx)(le,{title:`Camera`,children:(0,Z.jsx)(fa,{value:x,onChange:e=>S&&S(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_field,"data-indent":`true`,children:(0,Z.jsx)(le,{title:`Light`,children:(0,Z.jsx)(fa,{value:C,onChange:e=>ee&&ee(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_separator}),(0,Z.jsx)(`div`,{className:X.overlay_field,children:(0,Z.jsx)(le,{title:`Grid`,children:(0,Z.jsx)(fa,{value:w,onChange:e=>T&&T(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_field,children:(0,Z.jsx)(le,{title:`Wireframe`,children:(0,Z.jsx)(fa,{value:te,onChange:e=>ne&&ne(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_field,children:(0,Z.jsx)(le,{title:`Gizmo`,children:(0,Z.jsx)(fa,{value:E,onChange:e=>re&&re(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_field,children:(0,Z.jsx)(le,{title:`Outline`,children:(0,Z.jsx)(fa,{value:ie,onChange:e=>ae&&ae(e)})})}),(0,Z.jsx)(`div`,{className:X.overlay_field,children:(0,Z.jsx)(le,{title:`Relationships`,children:(0,Z.jsx)(fa,{value:oe,onChange:e=>se&&se(e)})})})]})]}),(0,Z.jsxs)(`div`,{className:X.gizmoMode,children:[[`select`,`translate`,`rotate`,`scale`].map(e=>(0,Z.jsx)(`div`,{className:X.gizmoMode_btn,"data-active":f===e,onClick:()=>p&&p(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`select`?`↖`:e===`translate`?`T`:e===`rotate`?`R`:`S`},e)),(0,Z.jsx)(`div`,{className:X.gizmoMode_separator}),[`global`,`local`].map(e=>(0,Z.jsx)(`div`,{className:X.gizmoMode_btn,"data-active":m===e,onClick:()=>h&&h(e),title:e.charAt(0).toUpperCase()+e.slice(1),children:e===`global`?`G`:`L`},e))]}),g&&(0,Z.jsx)(`div`,{className:X.modalStatus,children:g}),(0,Z.jsx)(`div`,{className:X.canvas,children:(0,Z.jsx)(LS,{viewportId:e})}),n.isSP&&(0,Z.jsx)($S,{viewportId:e}),n.isPC&&ce&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`div`,{className:X.audioViewHandle,onPointerDown:e=>{e.preventDefault(),e.currentTarget.setPointerCapture(e.pointerId),fe.current={startY:e.clientY,startHeight:ue}},onPointerMove:e=>{if(!fe.current)return;let t=fe.current.startY-e.clientY,n=Math.max(20,Math.min(400,fe.current.startHeight+t));de(n)},onPointerUp:()=>{fe.current=null}}),(0,Z.jsx)(`div`,{className:X.audioView,style:{height:ue},children:(0,Z.jsx)(KS,{})})]})]})]})},TC.__docgenInfo={description:``,methods:[],displayName:`Screen`}})))()}function DC(){let e=(0,OC.useRef)(null),t=(0,OC.useRef)(!1),n=(0,OC.useRef)(0);return(0,OC.useEffect)(()=>{let r=n=>{let r=null;if(n.target instanceof Element){let e=n.target.closest(`[data-pane-id]`);e instanceof HTMLElement&&(r=e.dataset.paneId??null)}e.current=r,t.current=!0},i=()=>{t.current=!1,n.current=performance.now()};return window.addEventListener(`pointerdown`,r,!0),window.addEventListener(`pointerup`,i,!0),window.addEventListener(`pointercancel`,i,!0),()=>{window.removeEventListener(`pointerdown`,r,!0),window.removeEventListener(`pointerup`,i,!0),window.removeEventListener(`pointercancel`,i,!0)}},[]),{currentPaneId:(0,OC.useCallback)(()=>t.current||performance.now()-n.current<kC?e.current:null,[])}}var OC,kC;function AC(){return(AC=t((()=>{OC=i(),kC=500})))()}function jC(e,t){let n=e.get(t);if(n)return n;let r=t.indexOf(`:`);if(r===-1)return;let i=e.get(t.slice(0,r));return i?.multiple?i:void 0}function MC(e){return e.slice(e.indexOf(`:`)+1)}function NC(e){return e.multiple?`${e.id}:${rt.genUUID()}`:e.id}function PC(e,t){return e.multiple?e.content(MC(t)):e.content}function FC(){return KC(`vertical`,[{ratio:881/1076,node:KC(`horizontal`,[{ratio:300/1912,node:KC(`vertical`,[{ratio:661/877,node:qC([`hierarchy`,`scene`])},{ratio:216/877,node:qC([`timer`])}])},{ratio:1312/1912,node:qC([`viewport:main`])},{ratio:300/1912,node:qC([`property`,`textures`,`renderer`,`editor-settings`])}])},{ratio:195/1076,node:qC([`timeline`,`export`])}])}function IC(){return KC(`vertical`,[{ratio:.4,node:qC([`viewport:main`])},{ratio:.35,node:qC([`hierarchy`,`property`,`scene`,`textures`,`renderer`,`export`])},{ratio:.25,node:qC([`timeline`])}])}function LC(e){return e.type===`pane`?[e]:e.children.flatMap(e=>LC(e.node))}function RC(e,t){let n=new Set,r=new Set,i=e=>{let t=typeof e==`string`&&e!==``&&!n.has(e)?e:rt.genUUID();return n.add(t),t},a=e=>{if(typeof e!=`object`||!e)return null;let n=e;if(n.type===`pane`){if(!Array.isArray(n.tabs))return null;let e=[...new Set(n.tabs.filter(e=>typeof e==`string`))].filter(e=>{let n=t(e);return n?!n.multiple||!r.has(e)&&(r.add(e),!0):!1});if(e.length===0)return null;let a=typeof n.active==`string`&&e.includes(n.active)?n.active:e[0];return{type:`pane`,id:i(n.id),tabs:e,active:a}}if(n.type===`split`){if(n.direction!==`horizontal`&&n.direction!==`vertical`||!Array.isArray(n.children))return null;let e=[];return n.children.forEach(t=>{if(typeof t!=`object`||!t)return;let n=t,r=a(n.node);if(!r)return;let i=typeof n.ratio==`number`&&isFinite(n.ratio)&&n.ratio>0?n.ratio:1;e.push({ratio:i,node:r})}),e.length===0?null:e.length===1?e[0].node:{type:`split`,id:i(n.id),direction:n.direction,children:e}}return null},o=a(e);return o?JC(o):null}function zC(e,t,n){return YC(e,t,e=>e.type!==`pane`||!e.tabs.includes(n)?e:{...e,active:n})}function BC(e,t,n){let r=e;for(let i of LC(e))if(i.id!==n)for(let e of t)i.tabs.includes(e)&&i.active!==e&&(r=zC(r,i.id,e));return r}function VC(e,t,n,r){return YC(e,t,e=>{if(e.type!==`pane`||e.tabs.includes(n))return e;let t=[...e.tabs];return t.splice(Math.max(0,Math.min(r??t.length,t.length)),0,n),{...e,tabs:t,active:n}})}function HC(e,t,n,r,i){if(t===r)return YC(e,t,e=>{if(e.type!==`pane`)return e;let t=e.tabs.indexOf(n);if(t===-1)return e;let r=e.tabs.filter(e=>e!==n),a=i??e.tabs.length,o=Math.max(0,Math.min(t<a?a-1:a,r.length));return o===t?e:(r.splice(o,0,n),{...e,tabs:r,active:n})});let a=LC(e),o=a.find(e=>e.id===t),s=a.find(e=>e.id===r);return!o||!s||!o.tabs.includes(n)||s.tabs.includes(n)?e:VC(WC(e,t,n),r,n,i)}function UC(e,t,n,r,i){let a=LC(e),o=a.find(e=>e.id===r);if(!o||!o.tabs.includes(i)||!a.some(e=>e.id===t)||r===t&&o.tabs.length===1)return e;let s=WC(e,r,i),c={type:`pane`,id:rt.genUUID(),tabs:[i],active:i},l=YC(s,t,e=>{let t=[{ratio:.5,node:c},{ratio:.5,node:e}];return(n===`right`||n===`bottom`)&&t.reverse(),{type:`split`,id:rt.genUUID(),direction:n===`left`||n===`right`?`horizontal`:`vertical`,children:t}});return l===s?e:JC(l)??e}function WC(e,t,n){let r=YC(e,t,e=>{if(e.type!==`pane`||!e.tabs.includes(n))return e;let t=e.tabs.indexOf(n),r=e.tabs.filter(e=>e!==n),i=e.active!==n||r.length===0?e.active:r[Math.min(t,r.length-1)];return{...e,tabs:r,active:i}});return r===e?e:JC(r)??e}function GC(e,t,n){return YC(e,t,e=>e.type!==`split`||e.children.length!==n.length?e:{...e,children:e.children.map((e,t)=>({...e,ratio:n[t]}))})}var KC,qC,JC,YC;function XC(){return(XC=t((()=>{at(),KC=(e,t)=>({type:`split`,id:rt.genUUID(),direction:e,children:t}),qC=e=>({type:`pane`,id:rt.genUUID(),tabs:e,active:e[0]}),JC=e=>{if(e.type===`pane`)return e.tabs.length>0?e:null;let t=[];if(e.children.forEach(n=>{let r=JC(n.node);r&&(r.type===`split`&&r.direction===e.direction?r.children.forEach(e=>t.push({ratio:n.ratio*e.ratio,node:e.node})):t.push(r===n.node?n:{...n,node:r}))}),t.length===0)return null;if(t.length===1)return t[0].node;let n=t.reduce((e,t)=>e+t.ratio,0);return Math.abs(n-1)>1e-6?{...e,children:t.map(e=>({...e,ratio:e.ratio/n}))}:t.length!==e.children.length||t.some((t,n)=>t!==e.children[n])?{...e,children:t}:e},YC=(e,t,n)=>{if(e.id===t)return n(e);if(e.type===`split`){let r=!1,i=e.children.map(e=>{let i=YC(e.node,t,n);return i===e.node?e:(r=!0,{...e,node:i})});if(r)return{...e,children:i}}return e}})))()}function ZC(e,t,n){let[r,i]=(0,QC.useState)(null),a=(0,QC.useRef)(e);a.current=e;let o=(0,QC.useRef)(t);o.current=t;let s=(0,QC.useRef)(null);return(0,QC.useEffect)(()=>()=>s.current?.(),[]),{dragState:r,onTabPointerDown:(e,t,r)=>{if(r.button!==0||s.current)return;let c=r.clientX,l=r.clientY,u=!1,d=null,f=r=>{if(r.buttons===0){p(!1);return}if(!u){if(Math.hypot(r.clientX-c,r.clientY-l)<$C)return;u=!0,i({panelId:t,title:n(t)?.title??t,startX:r.clientX,startY:r.clientY,target:null})}let o=rw(r.clientX,r.clientY,a.current,e,t);iw(o,d)||(d=o,i(e=>e&&{...e,target:o}))},p=n=>{if(g(),n&&u&&d){let n=a.current;d.kind===`tabs`?o.current(HC(n,e,t,d.paneId,d.index)):d.zone===`center`?o.current(HC(n,e,t,d.paneId)):o.current(UC(n,d.paneId,d.zone,e,t))}u&&i(null)},m=()=>p(!0),h=()=>p(!1),g=()=>{window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,m),window.removeEventListener(`pointercancel`,h),s.current=null};s.current=g,window.addEventListener(`pointermove`,f),window.addEventListener(`pointerup`,m),window.addEventListener(`pointercancel`,h)}}}var QC,$C,ew,tw,nw,rw,iw;function aw(){return(aw=t((()=>{QC=i(),XC(),$C=4,ew=.25,tw=(e,t)=>{let n={left:e.left,top:e.top,width:e.width,height:e.height};return(t===`left`||t===`right`)&&(n.width/=2),t===`right`&&(n.left+=n.width),(t===`top`||t===`bottom`)&&(n.height/=2),t===`bottom`&&(n.top+=n.height),n},nw=(e,t,n,r,i)=>{if(n.id!==r&&n.tabs.includes(i))return null;let a=[...t.querySelectorAll(`[data-panel-tab-id]`)].filter(e=>e instanceof HTMLElement),o=a.length;for(let t=0;t<a.length;t++){let n=a[t].getBoundingClientRect();if(e<n.left+n.width/2){o=t;break}}let s=t.getBoundingClientRect(),c=o<a.length?a[o].getBoundingClientRect().left:a.length>0?a[a.length-1].getBoundingClientRect().right:s.left;return{kind:`tabs`,paneId:n.id,index:o,rect:{left:c-1,top:s.top,width:2,height:s.height}}},rw=(e,t,n,r,i)=>{let a=document.elementFromPoint(e,t);if(!a)return null;let o=a.closest(`[data-pane-id]`);if(!(o instanceof HTMLElement))return null;let s=LC(n).find(e=>e.id===o.dataset.paneId);if(!s)return null;let c=a.closest(`[data-panel-tab-header]`);if(c instanceof HTMLElement)return nw(e,c,s,r,i);let l=o.querySelector(`[data-panel-content]`);if(!(l instanceof HTMLElement))return null;let u=l.getBoundingClientRect();if(u.width<=0||u.height<=0)return null;let d=(e-u.left)/u.width,f=(t-u.top)/u.height;if(d<0||d>1||f<0||f>1)return null;if(Math.min(d,1-d)>ew&&Math.min(f,1-f)>ew)return s.id===r||s.tabs.includes(i)?null:{kind:`zone`,paneId:s.id,zone:`center`,rect:tw(u,`center`)};if(s.id===r&&s.tabs.length===1)return null;let p=d-.5,m=f-.5,h=Math.abs(p)>=Math.abs(m)?p<0?`left`:`right`:m<0?`top`:`bottom`;return{kind:`zone`,paneId:s.id,zone:h,rect:tw(u,h)}},iw=(e,t)=>e===null||t===null?e===t:e.paneId===t.paneId?e.kind===`tabs`&&t.kind===`tabs`?e.index===t.index:e.kind===`zone`&&t.kind===`zone`&&e.zone===t.zone:!1})))()}function ow(e){let t=(0,cw.useRef)(e);t.current=e;let n=(0,cw.useRef)(null);return(0,cw.useEffect)(()=>()=>n.current?.(),[]),{onTabPointerDown:(e,r,i)=>{n.current?.();let a=i.pointerId,o=i.clientX,s=i.clientY,c=e=>{e.pointerId===a&&Math.hypot(e.clientX-o,e.clientY-s)>uw&&d()},l=e=>{e.pointerId===a&&d()},u=window.setTimeout(()=>{d(),sw(),t.current(e,r,o,s)},lw),d=()=>{window.clearTimeout(u),window.removeEventListener(`pointermove`,c),window.removeEventListener(`pointerup`,l),window.removeEventListener(`pointercancel`,l),n.current=null};n.current=d,window.addEventListener(`pointermove`,c),window.addEventListener(`pointerup`,l),window.addEventListener(`pointercancel`,l)}}}function sw(){let e=e=>{e.stopPropagation(),e.preventDefault(),t()},t=()=>{window.removeEventListener(`click`,e,!0),window.removeEventListener(`pointerdown`,t,!0)};window.addEventListener(`click`,e,!0),window.addEventListener(`pointerdown`,t,!0)}var cw,lw,uw;function dw(){return(dw=t((()=>{cw=i(),lw=500,uw=8})))()}var fw,pw;function mw(){return(mw=t((()=>{fw=`PanelLayout__pane___LnBhb`,pw={pane:fw}})))()}function hw(e,t){let n=[];for(let r of e){let e=n;if(r.category)for(let t of r.category.split(`/`)){if(t===``)continue;let n;for(let r of e)if(r.label===t&&`children`in r){n=r;break}n||(n={label:t,children:[]},e.push(n)),e=n.children}e.push({label:r.title,onClick:()=>t(r)})}return n}var gw,_w,vw,yw,bw,xw;function Sw(){return(Sw=t((()=>{gw=i(),E(),L(),EC(),kb(),ge(),AC(),aw(),dw(),mw(),XC(),_w=o(),vw={pc:{field:`panelLayout`,defaultLayout:FC},sp:{field:`panelLayoutSP`,defaultLayout:IC}},yw=(e,t)=>{let n=new Set;for(let r of Object.values(vw)){let i=RC(e.getField(r.field),t)??r.defaultLayout();for(let e of LC(i))for(let r of e.tabs)t(r)?.id===`viewport`&&n.add(MC(r))}return n},bw=e=>{let t=e.node;if(t.type===`split`)return(0,_w.jsx)(ue,{direction:t.direction,ratios:t.children.map(e=>e.ratio),onRatiosChange:n=>e.onRatiosChange(t.id,n),children:t.children.map(t=>(0,_w.jsx)(ue.Item,{children:(0,_w.jsx)(bw,{...e,node:t.node})},t.node.id))});let n=t.tabs.flatMap(t=>{let n=e.resolve(t);return n?[{id:t,title:n.title,content:PC(n,t)}]:[]});if(n.length===0)return null;let r=e.hasAddable(t);return(0,_w.jsx)(`div`,{className:pw.pane,"data-pane-id":t.id,children:(0,_w.jsx)(me,{tabs:n,active:t.active,onSelect:n=>e.onSelectTab(t.id,n),onTabContextMenu:(n,r)=>e.onTabContextMenu(t.id,n,r),onTabPointerDown:(n,r)=>e.onTabPointerDown(t.id,n,r),onAddClick:r?n=>e.onAddTab(t.id,n):void 0})})},xw=e=>{let{editor:t}=I(),{open:n,closeAll:r}=w(),i=(0,gw.useMemo)(()=>{let t=new Map;return e.panels.forEach(e=>t.set(e.id,e)),t},[e.panels]),a=(0,gw.useMemo)(()=>e=>jC(i,e),[i]),o=vw[e.mode],[s,c]=J(t,o.field),l=(0,gw.useMemo)(()=>RC(s,a)??o.defaultLayout(),[s,a,o]);(0,gw.useEffect)(()=>{t.pruneViewportSettings(yw(t,a))},[l,a,t]);let{currentPaneId:u}=DC(),[d,f]=(0,gw.useState)(null);(0,gw.useEffect)(()=>{let e=()=>{t.bootstrapping||t.getField(`selectedEntityId`)&&f({keepPaneId:u()})};return t.on(`fields/update/selectedEntityId`,e),()=>{t.off(`fields/update/selectedEntityId`,e)}},[t,u]);let p=e=>{e!==l&&c(e)},m=e.activateOnSelect;(0,gw.useEffect)(()=>{if(!d||(f(null),!m))return;let e=BC(l,m,d.keepPaneId);e!==l&&t.setField(o.field,e)},[d,m,l,t,o]);let h=(e,t)=>p(zC(l,e,t)),g=(e,t)=>p(GC(l,e,t)),{dragState:_,onTabPointerDown:v}=ZC(l,p,a),y=e=>[...i.values()].filter(t=>t.multiple||!e.tabs.includes(t.id)),b=(e,t)=>{let i=LC(l).find(t=>t.id===e);if(!i)return;let a=y(i);if(a.length===0)return;let o=hw(a,t=>{p(VC(l,e,NC(t))),r()});n((0,_w.jsx)(fe,{items:o}),se(t.clientX,t.clientY))},x=(e,t,i,o)=>{LC(l).reduce((e,t)=>e+t.tabs.length,0)>1&&n((0,_w.jsx)(fe,{title:a(t)?.title,items:[{label:`Close Tab`,onClick:()=>{p(WC(l,e,t)),r()}}]}),se(i,o))},S=(e,t,n)=>x(e,t,n.clientX,n.clientY),{onTabPointerDown:C}=ow(x);return(0,_w.jsxs)(_w.Fragment,{children:[(0,_w.jsx)(bw,{node:l,resolve:a,onSelectTab:h,onRatiosChange:g,onTabContextMenu:S,onTabPointerDown:(e,t,n)=>{n.pointerType===`touch`?C(e,t,n):v(e,t,n)},onAddTab:b,hasAddable:e=>y(e).length>0}),_&&(0,_w.jsx)(_e,{drag:_})]})},xw.__docgenInfo={description:``,methods:[],displayName:`PanelLayout`,props:{mode:{required:!0,tsType:{name:`union`,raw:`"pc" | "sp"`,elements:[{name:`literal`,value:`"pc"`},{name:`literal`,value:`"sp"`}]},description:``},panels:{required:!0,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`category`,value:{name:`string`,required:!1}}]}},{name:`unknown`}]}],raw:`PanelDefinition[]`},description:``},activateOnSelect:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`PanelId[]`},description:``}}}})))()}var Cw,ww,Tw;function Ew(){return(Ew=t((()=>{Cw=`RendererSettings__renderer___LnJlb`,ww=`RendererSettings__renderer_inner___LnJlb`,Tw={renderer:Cw,renderer_inner:ww}})))()}var Dw,Ow;function kw(){return(kw=t((()=>{E(),L(),Ob(),Ew(),Dw=o(),Ow=()=>{let{editor:e}=I(),t=e.engine.renderer;return(0,Dw.jsx)(`div`,{className:Tw.renderer,children:(0,Dw.jsxs)(`div`,{className:Tw.renderer_inner,children:[(0,Dw.jsx)(s,{label:`Resolution`,accordion:!0,children:(0,Dw.jsx)(Db,{target:e,filter:`resolution`})}),(0,Dw.jsx)(s,{label:`Pipeline`,accordion:!0,children:(0,Dw.jsx)(Db,{target:t,filter:`pipeline`})}),(0,Dw.jsx)(s,{label:`Sky`,accordion:!0,children:(0,Dw.jsx)(Db,{target:t,filter:`sky`})})]})})},Ow.__docgenInfo={description:``,methods:[],displayName:`RendererSettings`}})))()}var Aw,jw,Mw,Nw,Pw,Fw;function Iw(){return(Iw=t((()=>{Aw=`SceneControl__sceneControl___LnNjZ`,jw=`SceneControl__sceneControl_inner___LnNjZ`,Mw=`SceneControl__select___LnNjZ`,Nw=`SceneControl__select_name___LnNjZ`,Pw=`SceneControl__save___LnNjZ`,Fw={sceneControl:Aw,sceneControl_inner:jw,select:Mw,select_name:Nw,save:Pw}})))()}var Lw,Rw,zw;function Bw(){return(Bw=t((()=>{Lw=i(),E(),L(),ve(),Iw(),Rw=o(),zw=()=>{let{editor:e,projectName:t,scenes:n}=I(),[r,i]=(0,Lw.useState)(null),o=null;return n&&(o=(0,Rw.jsx)(le,{title:`scene`,children:(0,Rw.jsxs)(`button`,{className:Fw.select,onClick:e=>{i(se(e.clientX,e.clientY))},children:[(0,Rw.jsx)(`span`,{className:Fw.select_name,children:n.current??`-`}),(0,Rw.jsx)(a,{open:!0})]})})),(0,Rw.jsxs)(`div`,{className:Fw.sceneControl,children:[(0,Rw.jsx)(`div`,{className:Fw.sceneControl_inner,children:(0,Rw.jsxs)(s,{label:t,accordion:!0,children:[o,(0,Rw.jsx)(`div`,{className:Fw.save,children:(0,Rw.jsx)(c,{onClick:()=>{e.save()},children:`Save`})})]})}),r&&n&&(0,Rw.jsx)(ye,{scenes:n,projectName:t,anchor:r,onClose:()=>{i(null)}})]})},zw.__docgenInfo={description:``,methods:[],displayName:`SceneControl`}})))()}var Vw,Hw,Uw,Ww,Gw,Kw,qw;function Jw(){return(Jw=t((()=>{Vw=`Textures__textures___LnRle`,Hw=`Textures__item___LnRle`,Uw=`Textures__preview___LnRle`,Ww=`Textures__img___LnRle`,Gw=`Textures__placeholder___LnRle`,Kw=`Textures__name___LnRle`,qw={textures:Vw,item:Hw,preview:Uw,img:Ww,placeholder:Gw,name:Kw}})))()}var Yw,Xw,Zw;function Qw(){return(Qw=t((()=>{Yw=i(),Ui(),L(),Jw(),Xw=o(),Zw=()=>{let{engine:e,editor:t}=I(),[,n]=(0,Yw.useState)(0);(0,Yw.useEffect)(()=>{let e=()=>{t.assetPreviewManager?.invalidateAll(),n(e=>e+1)},r=()=>n(e=>e+1);return F.resources.on(`update`,e),t.assetPreviewManager?.on(`update`,r),()=>{F.resources.off(`update`,e),t.assetPreviewManager?.off(`update`,r)}},[e,t]);let r=F.resources.textureList;return(0,Xw.jsx)(`div`,{className:qw.textures,children:r.map(e=>{let n=t.assetPreviewManager?.getTexturePreview(e.name);return(0,Xw.jsxs)(`div`,{className:qw.item,children:[(0,Xw.jsx)(`div`,{className:qw.preview,children:n?(0,Xw.jsx)(`img`,{src:n,className:qw.img}):(0,Xw.jsx)(`div`,{className:qw.placeholder})}),(0,Xw.jsx)(`div`,{className:qw.name,children:e.name})]},e.name)})})},Zw.__docgenInfo={description:``,methods:[],displayName:`Textures`}})))()}var $w,eT;function tT(){return(tT=t((()=>{$w=i(),eT=(0,$w.createContext)(null)})))()}var nT,rT;function iT(){return(iT=t((()=>{nT=i(),tT(),rT=()=>{let e=(0,nT.useContext)(eT);if(e===null)throw Error(`useTimeline must be used within a TimelineProvider`);return e}})))()}var aT;function oT(){return(oT=t((()=>{aT=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var sT;function cT(){return(cT=t((()=>{at(),qe(),k(),P(),oT(),sT=class extends tt{wrapperElm;glCanvas;backend;gl;canvasTexture;canvas;canvasCtx;glRenderer;postProcess;viewPort;viewPortRange;viewPortScale;duration;loopSetting;musicBuffer;musicTexture;resizeObserver;canvasSize;constructor(){super(),this.wrapperElm=null,this.canvas=document.createElement(`canvas`),this.canvasCtx=this.canvas.getContext(`2d`),this.glCanvas=document.createElement(`canvas`),this.backend=new Je(this.glCanvas.getContext(`webgl2`)),this.gl=this.backend.gl,this.canvasSize=new D(this.glCanvas.width,this.glCanvas.height),this.viewPort=[0,0,0,0],this.viewPortRange=[0,0],this.viewPortScale=50,this.duration=null,this.loopSetting={enabled:!1,start:0,end:0},this.resizeObserver=new ResizeObserver(this.onResize.bind(this));let e={renderer:null,curves:{},createEntity:t=>new Xt({...t,engine:e})};this.glRenderer=new ui(this.backend,e),e.renderer=this.glRenderer,this.canvasTexture=new ze(this.gl),this.musicBuffer=null,this.musicTexture=new ze(this.gl),this.musicTexture.setting({type:this.gl.UNSIGNED_BYTE,internalFormat:this.gl.LUMINANCE,format:this.gl.LUMINANCE,magFilter:this.gl.LINEAR,minFilter:this.gl.LINEAR,wrapS:this.gl.MIRRORED_REPEAT}),this.postProcess=new wn({passes:[new N(this.backend,{frag:aT,uniforms:{uCanvasTex:{type:`1i`,value:null},uMusicTex:{type:`1i`,value:this.musicTexture}},renderTarget:null})]})}onResize(){if(this.wrapperElm){let e=new D(this.wrapperElm.clientWidth,this.wrapperElm.clientHeight);if(e.x===0||e.y===0)return;this.glCanvas.width=this.canvas.width=e.x,this.glCanvas.height=this.canvas.height=e.y,this.canvasSize.set(this.glCanvas.width,this.glCanvas.height),this.postProcess.resize(e),this.render()}}render(){if(this.canvasCtx.fillStyle=`#000`,this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height),this.duration!==null){this.canvasCtx.fillStyle=`#181818`;let e=this.frameToPx(0),t=this.frameToPx(this.duration);this.canvasCtx.fillRect(e,0,t-e,this.canvas.height)}let e=(e,t,n)=>{let r=Math.ceil(this.viewPort[0]/e)*e;this.canvasCtx.beginPath();let i=0;for(;r<this.viewPort[2]&&i<100;){let n=this.frameToPx(r+t);this.canvasCtx.moveTo(n,0),this.canvasCtx.lineTo(n,this.canvas.height),r+=e,i++}this.canvasCtx.strokeStyle=n,this.canvasCtx.lineWidth=1,this.canvasCtx.stroke()};if(e(this.viewPortScale,0,`#555`),e(this.viewPortScale,this.viewPortScale/2,`#333`),this.musicBuffer&&this.duration!==null){this.canvasCtx.strokeStyle=`#888`,this.canvasCtx.fillStyle=`#888`;let e=this.musicBuffer.getChannelData(0),t=this.viewPortRange[0]/60,n=this.musicBuffer.sampleRate*t,r=n/this.canvas.width,i=this.frameToPx(0);this.canvasCtx.beginPath();for(let t=0;t<n;t+=r){let a=Math.floor(t-i*r),o=e[Math.round(a)],s=t/n*this.canvas.width,c=(o+1)*(this.canvas.height/2),l=c,u=c;for(let t=0;t<16;t++){let n=(e[Math.round(a+t/16*r)]+1)*(this.canvas.height/2);l>n&&(l=n),u<n&&(u=n)}let d=u-l;d>3&&this.canvasCtx.fillRect(s,l,1,d),t==0?this.canvasCtx.moveTo(s,c):this.canvasCtx.lineTo(s,c)}this.canvasCtx.stroke()}if(this.loopSetting.enabled){this.canvasCtx.fillStyle=`#0009`;let e=this.frameToPx(this.loopSetting.start),t=this.frameToPx(this.loopSetting.end);this.canvasCtx.fillRect(0,0,e,this.canvas.height),this.canvasCtx.fillRect(t,0,this.canvas.width-t,this.canvas.height)}this.canvasTexture.attach(this.canvas),this.postProcess.passes&&(this.postProcess.passes[0].uniforms.uCanvasTex.value=this.canvasTexture),this.glRenderer.renderPostProcess(this.postProcess,void 0,this.canvasSize)}setWrapperElm(e){this.wrapperElm&&this.resizeObserver.observe(this.wrapperElm),this.wrapperElm=e,this.resizeObserver.observe(e),this.wrapperElm.appendChild(this.glCanvas),this.onResize()}setViewPort(e,t){this.viewPort=e,this.viewPortRange=[e[2]-e[0],e[3]-e[1]],this.viewPortScale=t,this.render()}setDuration(e){this.duration=Math.round(e),this.render()}setMusicBuffer(e){this.musicBuffer=e,setTimeout(()=>{this.render()},100)}setLoopSetting(e,t,n){this.loopSetting={enabled:e,start:t,end:n},this.render()}frameToPx(e){return(e-this.viewPort[0])/this.viewPortRange[0]*this.canvas.width}dispose(){this.wrapperElm&&this.wrapperElm.removeChild(this.glCanvas),this.resizeObserver.disconnect()}},sT.__docgenInfo={description:``,methods:[{name:`setWrapperElm`,docblock:null,modifiers:[],params:[{name:`elm`,optional:!1,type:{name:`HTMLElement`,alias:`HTMLElement`}}],returns:null},{name:`setViewPort`,docblock:null,modifiers:[],params:[{name:`viewPort`,optional:!1,type:{name:`Array`,elements:[{name:`number`}],raw:`number[]`}},{name:`scale`,optional:!1,type:{name:`number`}}],returns:null},{name:`setDuration`,docblock:null,modifiers:[],params:[{name:`duration`,optional:!1,type:{name:`number`}}],returns:null},{name:`setMusicBuffer`,docblock:null,modifiers:[],params:[{name:`buffer`,optional:!1,type:{name:`AudioBuffer`,alias:`AudioBuffer`}}],returns:null},{name:`setLoopSetting`,docblock:null,modifiers:[],params:[{name:`enabled`,optional:!1,type:{name:`boolean`}},{name:`start`,optional:!1,type:{name:`number`}},{name:`end`,optional:!1,type:{name:`number`}}],returns:null},{name:`dispose`,docblock:null,modifiers:[],params:[],returns:null}],displayName:`TimelineCanvasRenderer`}})))()}var lT,uT;function dT(){return(dT=t((()=>{lT=`TimelineCanvas__timelineCanvas___LnRpb`,uT={timelineCanvas:lT}})))()}var fT,pT,mT;function hT(){return(hT=t((()=>{fT=i(),kb(),iT(),cT(),dT(),pT=o(),mT=()=>{let{viewPort:e,viewPortScale:t,musicBuffer:n,musicBufferVersion:r,glEditor:i}=rT(),[a,o]=(0,fT.useState)(),s=(0,fT.useRef)(null);(0,fT.useEffect)(()=>{let e=new sT;return o(e),s.current&&e.setWrapperElm(s.current),()=>{e.dispose()}},[]),(0,fT.useEffect)(()=>{a&&e&&t&&a.setViewPort(e,t)},[a,e,t]);let[c]=J(i?.engine,`timeline/duration`);(0,fT.useEffect)(()=>{a&&c&&a.setDuration(c)},[a,c]);let[l]=J(i,`frameLoop/enabled`),[u]=J(i,`frameLoop/start`),[d]=J(i,`frameLoop/end`);return(0,fT.useEffect)(()=>{a&&a.setLoopSetting(l||!1,u||0,d||0)},[a,l,u,d]),(0,fT.useEffect)(()=>{a&&n&&a.setMusicBuffer(n)},[a,n,r]),(0,pT.jsx)(`div`,{className:uT.timelineCanvas,ref:s})},mT.__docgenInfo={description:``,methods:[],displayName:`TimelineCanvas`}})))()}var gT,_T,vT,yT,bT,xT,ST,CT,wT,TT,ET,DT,OT,kT,AT,jT,MT,NT,PT;function FT(){return(FT=t((()=>{gT=1.1,_T=40,vT=50,yT=120,bT=-3,xT=200,ST=.005,CT=.01,wT=.005,TT=!1,ET=-1/0,DT=new WeakMap,OT=e=>e.ctrlKey||e.metaKey,kT=()=>{let e=e=>{e.key==`Control`&&(TT=!0)},t=e=>{e.key==`Control`&&(TT=!1)},n=()=>{TT=!1};return window.addEventListener(`keydown`,e,{capture:!0}),window.addEventListener(`keyup`,t,{capture:!0}),window.addEventListener(`blur`,n),()=>{window.removeEventListener(`keydown`,e,{capture:!0}),window.removeEventListener(`keyup`,t,{capture:!0}),window.removeEventListener(`blur`,n)}},AT=e=>{if(e.deltaMode!=WheelEvent.DOM_DELTA_PIXEL)return!0;if(e.timeStamp-ET<xT||e.deltaX!=0&&e.deltaY!=0)return!1;let t=e.deltaX+e.deltaY,n=e;if(n.wheelDeltaX===void 0||n.wheelDeltaY===void 0)return Math.abs(t)>=vT;let r=n.wheelDeltaX+n.wheelDeltaY;return r!=t*bT&&r!=0&&r%yT==0},jT=e=>{let t=e.deltaY;t==0&&(t=e.deltaX);let n=Math.sign(t)*_T;if(OT(e))return{type:`pan`,x:n,y:0};if(e.shiftKey)return{type:`pan`,x:0,y:n};if(e.deltaY==0)return{type:`pan`,x:n,y:0};let r=gT;return e.deltaY<0&&(r=1/gT),{type:`zoom`,x:r,y:r,linked:!0}},MT=e=>{if(ET=e.timeStamp,e.ctrlKey&&!TT){let t=Math.exp(e.deltaY*CT);return{type:`zoom`,x:t,y:t,linked:!0}}return OT(e)?{type:`zoom`,x:Math.exp(-e.deltaX*ST),y:Math.exp(e.deltaY*ST),linked:!1}:{type:`pan`,x:e.deltaX,y:e.deltaY}},NT=e=>{let t=DT.get(e);if(t)return t;e.ctrlKey||(TT=!1);let n;return n=e.ctrlKey&&!TT?MT(e):AT(e)?jT(e):MT(e),DT.set(e,n),n},PT=e=>Math.exp(e*wT)})))()}var IT,LT;function RT(){return(RT=t((()=>{IT=i(),FT(),LT=(e,t)=>{let n=(0,IT.useRef)(t);n.current=t,(0,IT.useEffect)(()=>{let t=e.current;if(!t)return;let r=e=>{n.current(NT(e),e)};t.addEventListener(`wheel`,r,{passive:!1});let i=kT();return()=>{t.removeEventListener(`wheel`,r),i()}},[e])}})))()}var zT,BT;function VT(){return(VT=t((()=>{zT=`TimelineControls__controls___LmNvb`,BT={controls:zT}})))()}var HT,UT,WT;function GT(){return(GT=t((()=>{HT=e(i(),1),E(),iT(),RT(),FT(),VT(),UT=o(),WT=e=>{let{viewPort:t,setCurrentFrame:n,getFrameViewPort:r,zoom:i,scroll:a,setViewPortCenter:o}=rT(),s=(0,HT.useRef)([0,0,0,0]),c=(0,HT.useRef)([0,0]);t&&(s.current=t,c.current=[t[2]-t[0],t[3]-t[1]]);let l=(0,HT.useRef)(null),u=(0,HT.useRef)(null),d=(0,HT.useRef)(null),f=(0,HT.useCallback)(e=>{let t=l.current&&l.current.clientWidth||1;if(d.current==0&&n&&r&&u.current){let i=(e.clientX-u.current.left)/t;n(r(i))}},[n,r]),p=(0,HT.useCallback)((e,t)=>{let n=e.currentTarget.clientWidth||1,r=(s.current[2]+s.current[0])/2,a=OT(e),l=0;ae(e,{lock:!0,onMove:e=>{if(a){i(PT(l-e),t),l=e;return}o(r-e/n*c.current[0])},onEnd:()=>{d.current=null}})},[i,o]),m=(0,HT.useCallback)(e=>{d.current=e.button,u.current=e.currentTarget.getBoundingClientRect();let t=(e.clientX-u.current.left)/e.currentTarget.clientWidth;if(e.button==1){p(e,t);return}e.button==0&&n&&r&&n(r(t)),window.addEventListener(`pointermove`,f);let i=()=>{d.current=null,window.removeEventListener(`pointermove`,f),window.removeEventListener(`pointerup`,i)};window.addEventListener(`pointerup`,i)},[r,n,f,p]);return LT(l,(e,t)=>{t.preventDefault();let n=l.current;if(d.current!==null||!n)return;let r=n.getBoundingClientRect(),o=Math.max(1,r.width);e.type==`pan`?e.x!=0&&a(e.x/o):e.x!=1&&i(e.x,(t.clientX-r.left)/o)}),t?(0,UT.jsx)(`div`,{className:BT.controls,onPointerDown:m,ref:l,children:e.children}):null},WT.__docgenInfo={description:``,methods:[],displayName:`TimelineControls`,props:{children:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``}}}})))()}var KT,qT,JT;function YT(){return(YT=t((()=>{KT=`TimelineCursor__cursor___LmN1c`,qT=`TimelineCursor__frame___LmN1c`,JT={cursor:KT,frame:qT}})))()}var XT,ZT;function QT(){return(QT=t((()=>{iT(),YT(),XT=o(),ZT=()=>{let{viewPort:e,framePlay:t}=rT();if(!e||!t)return null;let n=e[2]-e[0],r=(t.current-e[0])/n;return(0,XT.jsx)(`div`,{className:JT.cursor,style:{left:r*100+`%`},children:(0,XT.jsx)(`div`,{className:JT.frame})})},ZT.__docgenInfo={description:``,methods:[],displayName:`TimelineCursor`}})))()}var $T,eE,tE,nE;function rE(){return(rE=t((()=>{$T=`TimelineLoop__timelineLoop___LnRpb`,eE=`TimelineLoop__start___LnRpb`,tE=`TimelineLoop__end___LnRpb`,nE={timelineLoop:$T,start:eE,end:tE}})))()}var iE,aE;function oE(){return(oE=t((()=>{iE=`TimelineLoopCursor__cursor___LmN1c`,aE={cursor:iE}})))()}var sE,cE,lE;function uE(){return(uE=t((()=>{sE=i(),oE(),cE=o(),lE=({onMove:e})=>{let t=(0,sE.useRef)(!1);return(0,cE.jsx)(`div`,{className:aE.cursor,onPointerDown:e=>{e.buttons==1&&(t.current=!0,e.stopPropagation())},onPointerMove:n=>{let r=n.target;t.current!==!1&&n.buttons==1&&(r.setPointerCapture(n.pointerId),n.buttons==1&&e&&e(n.clientX),n.nativeEvent.preventDefault(),n.nativeEvent.stopPropagation())},onPointerUp:()=>{t.current=!1}})},lE.__docgenInfo={description:``,methods:[],displayName:`TimelineLoopCursor`}})))()}var dE,fE,pE;function mE(){return(mE=t((()=>{dE=i(),kb(),Ga(),iT(),rE(),uE(),fE=o(),pE=()=>{let{viewPort:e,framePlay:t,glEditor:n}=rT(),r=(0,dE.useRef)(null);Wa(n,[`frameLoop/enabled`,`frameLoop/start`,`frameLoop/end`]);let[i]=J(n,`frameLoop/enabled`),[a,o]=J(n,`frameLoop/start`),[s,c]=J(n,`frameLoop/end`);if(i!==!0||!e||!t||a===void 0||s===void 0)return null;let l=e[2]-e[0],u=(a-e[0])/l,d=(s-e[0])/l,f=(t,n)=>{let r=t.getBoundingClientRect();return(n-r.x)/r.width*(e[2]-e[0])+e[0]};return(0,fE.jsx)(`div`,{className:nE.timelineLoop,ref:r,children:(0,fE.jsxs)(`div`,{className:nE.timelineLoop_inner,children:[(0,fE.jsx)(`div`,{className:nE.start,style:{left:u*100+`%`},children:(0,fE.jsx)(lE,{onMove:e=>{r.current&&o&&o(f(r.current,e))}})}),(0,fE.jsx)(`div`,{className:nE.end,style:{left:d*100+`%`},children:(0,fE.jsx)(lE,{onMove:e=>{r.current&&c&&c(f(r.current,e))}})})]})})},pE.__docgenInfo={description:``,methods:[],displayName:`TimelineLoop`}})))()}var hE,gE,_E,vE,yE,bE,xE;function SE(){return(SE=t((()=>{hE=`TimelineScale__scale___LnNjY`,gE=`TimelineScale__scale_inner___LnNjY`,_E=`TimelineScale__band___LnNjY`,vE=`TimelineScale__scale_item___LnNjY`,yE=`TimelineScale__scale_item_frame___LnNjY`,bE=`TimelineScale__scale_item_time___LnNjY`,xE={scale:hE,scale_inner:gE,band:_E,scale_item:vE,scale_item_frame:yE,scale_item_time:bE}})))()}var CE,wE,TE;function EE(){return(EE=t((()=>{iT(),SE(),CE=o(),wE=e=>`${(`00`+Math.floor(e%3600/60)).slice(-2)}:${(`00`+Math.floor(e%60)).slice(-2)}`,TE=()=>{let{viewPort:e,viewPortScale:t}=rT();if(!e||!t)return null;let n=[],r=Math.ceil(e[0]/t)*t,i=0;for(;r<e[2]&&i<100;){let a=(r-e[0])/(e[2]-e[0]),o=r/60;n.push((0,CE.jsxs)(`div`,{className:xE.scale_item,style:{left:a*100+`%`},children:[(0,CE.jsx)(`div`,{className:xE.scale_item_frame,children:r}),(0,CE.jsx)(`div`,{className:xE.scale_item_time,children:wE(o)})]},r)),r+=t,i++}return(0,CE.jsxs)(`div`,{className:xE.scale,children:[(0,CE.jsx)(`div`,{className:xE.band}),(0,CE.jsx)(`div`,{className:xE.scale_inner,children:n})]})},TE.__docgenInfo={description:``,methods:[],displayName:`TimelineScale`}})))()}var DE,OE,kE,AE,jE;function ME(){return(ME=t((()=>{DE=`TimelineSetting__timelineSetting___LnRpb`,OE=`TimelineSetting__field___LnRpb`,kE=`TimelineSetting__name___LnRpb`,AE=`TimelineSetting__input___LnRpb`,jE={timelineSetting:DE,field:OE,name:kE,input:AE}})))()}var NE,PE,FE;function IE(){return(IE=t((()=>{NE=i(),E(),pa(),kb(),iT(),ME(),PE=o(),FE=()=>{let{framePlay:e,glEditor:t}=rT(),n=(0,NE.useCallback)((e,t)=>{t&&t(e)},[]),[r,i]=J(t,`frameLoop/enabled`),[a]=J(t?.engine,`timeline/duration`),[o]=J(t?.engine,`timeline/fps`),s=(0,NE.useCallback)((e,n)=>{t&&t.api.setField(t.engine,e,n)},[t]),l=(0,NE.useCallback)(()=>{t&&t.togglePlay()},[t]);return(0,PE.jsxs)(`div`,{className:jE.timelineSetting,children:[(0,PE.jsx)(c,{square:!0,onClick:l,children:e.playing?(0,PE.jsx)(f,{size:14}):(0,PE.jsx)(h,{size:14})}),(0,PE.jsxs)(`div`,{className:jE.field,children:[(0,PE.jsx)(`span`,{className:jE.name,children:`current`}),(0,PE.jsx)(`div`,{className:jE.input,children:(0,PE.jsx)(fa,{value:Math.floor(e?.current||0),readOnly:!0})})]}),(0,PE.jsxs)(`div`,{className:jE.field,children:[(0,PE.jsx)(`span`,{className:jE.name,children:`duration`}),(0,PE.jsx)(`div`,{className:jE.input,children:(0,PE.jsx)(fa,{value:a,onChange:e=>s(`timeline/duration`,e)})})]}),(0,PE.jsxs)(`div`,{className:jE.field,children:[(0,PE.jsx)(`span`,{className:jE.name,children:`fps`}),(0,PE.jsx)(`div`,{className:jE.input,children:(0,PE.jsx)(fa,{value:o,onChange:e=>s(`timeline/fps`,e)})})]}),(0,PE.jsxs)(`div`,{className:jE.field,children:[(0,PE.jsx)(`span`,{className:jE.name,children:`loop`}),(0,PE.jsx)(fa,{value:r||!1,onChange:e=>n(e,i)})]})]})},FE.__docgenInfo={description:``,methods:[],displayName:`TimelineSetting`}})))()}var LE,RE;function zE(){return(zE=t((()=>{LE=i(),RE=e=>{let[t,n]=(0,LE.useState)({width:0,height:0});return(0,LE.useEffect)(()=>{let t=e.current;if(!t)return;let r=()=>{n({width:t.clientWidth,height:t.clientHeight})};r();let i=new ResizeObserver(r);return i.observe(t),()=>{i.disconnect()}},[e]),t}})))()}var BE,VE;function HE(){return(HE=t((()=>{BE=i(),VE=(0,BE.createContext)(null)})))()}var UE,WE;function GE(){return(GE=t((()=>{UE=i(),HE(),WE=()=>{let e=(0,UE.useContext)(VE);if(e===null)throw Error(`useKeyEditor must be used within a KeyEditorProvider`);return e}})))()}var KE,qE,JE,YE,XE,ZE,QE,$E,eD,tD;function nD(){return(nD=t((()=>{KE=(e,t)=>e+`:`+t,qE=(e,t,n)=>KE(e,t)+`:`+n,JE=e=>{let t=e,n=null;if(e.endsWith(`:left`)||e.endsWith(`:right`)){let r=e.lastIndexOf(`:`);n=e.slice(r+1),t=e.slice(0,r)}let r=t.lastIndexOf(`:`);return{curveId:t.slice(0,r),index:Number(t.slice(r+1)),side:n}},YE=(e,t)=>{let n=new Map;for(let r of e){let{curveId:e,index:i}=JE(r),a=t[e];if(!a||i>=a.k.length)continue;let o=n.get(e);o||(o=[],n.set(e,o)),o.indexOf(i)<0&&o.push(i)}return n},XE=(e,t)=>{let n=new Map,r=new Map;for(let i of e){let{curveId:a,index:o,side:s}=JE(i),c=t[a];if(!c||o>=c.k.length)continue;if(!s){let e=n.get(a);e||(e=[],n.set(a,e)),e.push(o);continue}if(e.has(KE(a,o)))continue;let l=r.get(a);l||(l=[],r.set(a,l)),l.push({index:o,side:s})}return{keys:n,handles:r}},ZE=(e,t,n,r)=>e.has(KE(t,n))||e.has(qE(t,n,r)),QE=(e,t)=>{let{curveId:n,index:r}=JE(t);return e.has(t)||e.has(qE(n,r,`left`))||e.has(qE(n,r,`right`))},$E=e=>{let t=new Set;for(let n of e){let{curveId:e,index:r}=JE(n);t.add(KE(e,r))}return t.size==1?Array.from(t)[0]:null},eD=e=>{if(!(e instanceof Element))return null;let t=e.closest(`[data-refs]`);if(!t)return null;let n=t.getAttribute(`data-refs`);return n?n.split(` `):null},tD=(e,t)=>{let n=[];for(let r of e.querySelectorAll(`[data-refs]`)){let e=r.getBoundingClientRect();if(!(e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom))for(let e of(r.getAttribute(`data-refs`)||``).split(` `))n.push(e)}return n}})))()}var rD,iD,aD,oD,sD,cD,lD,uD,dD,fD,pD,mD;function hD(){return(hD=t((()=>{Ui(),My(),nD(),rD=`#entity`,iD=[`x`,`y`,`z`,`w`],aD=[`r`,`g`,`b`,`a`],oD=1e-4,sD=(e,t)=>{let n=t.indexOf(`:`);if(n<0)return{target:e,component:null,path:t};let r=t.slice(0,n),i=t.slice(n+1),a=F.resources.getComponent(r),o=null;return a&&(o=e.getComponent(a.component)||null),{target:o,component:r,path:i}},cD=(e,t,n)=>{let r=iD;if(e){let n=e.getFieldOpt(t);n&&n.format&&n.format.type==`color`&&(r=aD)}return n<r.length?r[n]:String(n)},lD=(e,t,n)=>{let r=n.get(e)||0;if(r<2)return null;let i=e,a=t[e];return a&&a.name&&(i=a.name),{name:i,count:r}},uD=(e,t)=>{e.curveIds.indexOf(t)<0&&e.curveIds.push(t)},dD=(e,t,n)=>{let r=ys(e),i=Object.keys(r),a={id:rD,parentId:null,depth:0,component:null,label:e.name,curveIds:[],leaf:!1,hasChildren:i.length>0,kind:null,element:null,shared:null},o=[a];for(let s of i){let i=r[s],c=sD(e,s),l=null;c.target&&(l=Ys({target:c.target,path:c.path}));let u={id:s,parentId:rD,depth:1,component:c.component,label:c.path,curveIds:[],leaf:!0,hasChildren:!1,kind:l,element:null,shared:null};if(o.push(u),typeof i[0]==`string`){let e=i[0];uD(u,e),uD(a,e),u.shared=lD(e,t,n);continue}u.leaf=!1,u.hasChildren=!0;let d=i;for(let e=0;e<d.length;e++){let r=d[e];if(!r)continue;let i=r[0];o.push({id:s+`#`+e,parentId:s,depth:2,component:null,label:cD(c.target,c.path,e),curveIds:[i],leaf:!0,hasChildren:!1,kind:l,element:e,shared:lD(i,t,n)}),uD(u,i),uD(a,i)}}return o},fD=new WeakMap,pD=e=>{if(!e)return[];let t=fD.get(e);return t||(t=To(e),fD.set(e,t)),t},mD=(e,t)=>{let n=new Map;for(let r of t){let t=pD(e[r]);for(let e=0;e<t.length;e++){let i=t[e].coordinate.x,a=Math.round(i/oD),o=n.get(a);o||(o={frame:i,refs:[]},n.set(a,o)),o.refs.push(KE(r,e))}}let r=Array.from(n.values());return r.sort((e,t)=>e.frame-t.frame),r}})))()}var gD,_D,vD,yD,bD,xD,SD,CD,wD,TD,ED,DD,OD,kD,AD;function jD(){return(jD=t((()=>{P(),hD(),gD=[`var(--or-axis-x)`,`var(--or-axis-y)`,`var(--or-axis-z)`,`var(--or-axis-w)`],_D=e=>e===null||e>=gD.length?`var(--or-text-muted)`:gD[e],vD=.1,yD=40,bD=2,xD=(e,t)=>{let n=1/0,r=-1/0;for(let i of t){let t=pD(e[i]);for(let e=0;e<t.length;e++){let i=t[e],a=[i.coordinate.y];for(let n of AD(t,e))n==`left`?a.push(i.handleLeft.y):a.push(i.handleRight.y);for(let e of a)n=Math.min(n,e),r=Math.max(r,e)}}if(n>r)return{min:-1,max:1};if(r-n<1e-6)return{min:n-1,max:r+1};let i=(r-n)*vD;return{min:n-i,max:r+i}},SD=e=>10**Math.floor(Math.log10(e)),CD=(e,t)=>{let n=SD(t),r=Math.max(0,-Math.floor(Math.log10(n)));return Number((Math.round(e/n)*n).toFixed(r))},wD=(e,t)=>{let n=[],r=Math.max(1,Math.floor(t/yD)),i=(e.max-e.min)/r,a=10**Math.floor(Math.log10(i)),o=a*10;i<=a?o=a:i<=a*2?o=a*2:i<=a*5&&(o=a*5);let s=Math.max(0,-Math.floor(Math.log10(o)));for(let t=Math.ceil(e.min/o)*o;t<=e.max;t+=o)n.push(Number(t.toFixed(s)));return n},TD=new WeakMap,ED=e=>{let t=TD.get(e);return t||(t=new pt(yt(e.k)),TD.set(e,t)),t},DD=(e,t,n,r)=>{if(e.k.length==0)return``;let i=ED(e),a=[];for(let e=0;e<=r+bD;e+=bD)a.push(e+`,`+n(i.getValue(t(e))).toFixed(1));return`M`+a.join(`L`)},OD=(e,t,n)=>({min:t+(e.min-t)*n,max:t+(e.max-t)*n}),kD=(e,t,n,r)=>{let i=(e[2]-e[0])/Math.max(1,n),a=(t.max-t.min)/Math.max(1,r);return{framePerPx:i,valuePerPx:a,toX:t=>(t-e[0])/i,toY:e=>(t.max-e)/a,toFrame:t=>e[0]+t*i,toValue:e=>t.max-e*a}},AD=(e,t)=>{let n=[];return t>0&&e[t-1].interpolation==`BEZIER`&&n.push(`left`),e[t].interpolation==`BEZIER`&&t<e.length-1&&n.push(`right`),n}})))()}var MD,ND,PD,FD,ID,LD,RD,zD,BD,VD;function HD(){return(HD=t((()=>{MD=`KeyCurveGraph__graph___LmdyY`,ND=`KeyCurveGraph__svg___LmdyY`,PD=`KeyCurveGraph__tick___LmdyY`,FD=`KeyCurveGraph__curve___LmdyY`,ID=`KeyCurveGraph__handleLine___LmdyY`,LD=`KeyCurveGraph__tickLabel___LmdyY`,RD=`KeyCurveGraph__sharedLabel___LmdyY`,zD=`KeyCurveGraph__point___LmdyY`,BD=`KeyCurveGraph__handle___LmdyY`,VD={graph:MD,svg:ND,tick:PD,curve:FD,handleLine:ID,tickLabel:LD,sharedLabel:RD,point:zD,handle:BD}})))()}var UD,WD,GD,KD;function qD(){return(qD=t((()=>{UD=i(),E(),iT(),RT(),FT(),zE(),GE(),jD(),hD(),nD(),HD(),WD=o(),GD=1e-6,KD=()=>{let{viewPort:e}=rT(),{curves:t,graphCurves:n,selection:r,active:i,valueRange:a,setValueRange:o}=WE(),s=(0,UD.useRef)(null),{width:c,height:l}=RE(s),u=kD(e,a,c,l),{toX:d,toY:f}=u,p=(0,UD.useMemo)(()=>{let r=[],i=kD(e,a,c,l);for(let e of n)r.push({id:e.id,element:e.element,d:DD(t[e.id],i.toFrame,i.toY,c)});return r},[n,t,e,a,c,l]),m=(e,t)=>{o(n=>{let r=n.max-t*(n.max-n.min),i=OD(n,r,e);return i.max-i.min<GD?n:i})};LT(s,(e,t)=>{let n=s.current;if(!n)return;let r=n.getBoundingClientRect(),i=Math.max(1,r.height);if(e.type==`pan`){if(e.y==0)return;o(t=>{let n=e.y*(t.max-t.min)/i;return{min:t.min-n,max:t.max-n}})}else e.y!=1&&m(e.y,(t.clientY-r.top)/i)});let h=e=>{if(e.button!=1)return;let t=a,n=u.valuePerPx,r=e.currentTarget.getBoundingClientRect(),i=(e.clientY-r.top)/Math.max(1,r.height),s=OT(e),c=0;ae(e,{lock:!0,onMove:(e,r)=>{if(s){m(PT(r-c),i),c=r;return}o({min:t.min+r*n,max:t.max+r*n})},onEnd:()=>{}})},g=[],_=[],v=[];for(let e of n){let n=pD(t[e.id]);for(let t=0;t<n.length;t++){let i=n[t],a=KE(e.id,t),o=d(i.coordinate.x),s=f(i.coordinate.y);if(o<0||o>c)continue;g.push({ref:a,x:o,y:s});let l=AD(n,t),u=r.has(a);for(let n of l)r.has(qE(e.id,t,n))&&(u=!0);if(u)for(let n of l){let a=i.handleRight;n==`left`&&(a=i.handleLeft),_.push({ref:qE(e.id,t,n),selected:ZE(r,e.id,t,n),x:d(a.x),y:f(a.y),keyX:o,keyY:s})}}e.shared&&n.length>0&&v.push({id:e.id,x:Math.max(0,d(n[0].coordinate.x)),y:f(n[0].coordinate.y),text:`⇄ ${e.shared.name} (${e.shared.count})`})}let y=wD(a,l);return(0,WD.jsxs)(`div`,{className:VD.graph,ref:s,onPointerDown:h,children:[c>0&&(0,WD.jsxs)(`svg`,{className:VD.svg,width:c,height:l,children:[y.map(e=>(0,WD.jsx)(`line`,{className:VD.tick,x1:0,x2:c,y1:f(e),y2:f(e)},e)),p.map(e=>(0,WD.jsx)(`path`,{className:VD.curve,style:{stroke:_D(e.element)},d:e.d},e.id)),_.map(e=>(0,WD.jsx)(`line`,{className:VD.handleLine,x1:e.keyX,y1:e.keyY,x2:e.x,y2:e.y},e.ref))]}),y.map(e=>(0,WD.jsx)(`div`,{className:VD.tickLabel,style:{top:f(e)},children:e},e)),v.map(e=>(0,WD.jsx)(`div`,{className:VD.sharedLabel,style:{left:e.x,top:e.y},children:e.text},e.id)),g.map(e=>(0,WD.jsx)(`div`,{className:VD.point,"data-refs":e.ref,"data-selected":r.has(e.ref),"data-active":e.ref==i,style:{left:e.x,top:e.y}},e.ref)),_.map(e=>(0,WD.jsx)(`div`,{className:VD.handle,"data-refs":e.ref,"data-selected":e.selected,style:{left:e.x,top:e.y}},e.ref))]})},KD.__docgenInfo={description:``,methods:[],displayName:`KeyCurveGraph`}})))()}var JD,YD,XD,ZD;function QD(){return(QD=t((()=>{JD=`KeyDopeSheet__dopeSheet___LmRvc`,YD=`KeyDopeSheet__row___LmRvc`,XD=`KeyDopeSheet__key___LmRvc`,ZD={dopeSheet:JD,row:YD,key:XD}})))()}var $D,eO,tO;function nO(){return(nO=t((()=>{$D=i(),My(),E(),iT(),RT(),FT(),GE(),hD(),QD(),eO=o(),tO=()=>{let{viewPort:e,zoom:t}=rT(),{curves:n,visibleChannels:r,selection:i,active:a,scrollTop:o,channelListRef:s}=WE(),c=(0,$D.useRef)(null);LT(c,(e,n)=>{let r=s.current,i=c.current;if(e.type==`pan`)r&&(r.scrollTop+=e.y);else if(!e.linked&&e.y!=1&&i){let r=i.getBoundingClientRect();t(e.y,(n.clientX-r.left)/Math.max(1,r.width))}});let l=e[2]-e[0];return(0,eO.jsx)(`div`,{className:ZD.dopeSheet,ref:c,onPointerDown:e=>{let t=s.current;if(e.button!=1||OT(e)||!t)return;let n=t.scrollTop;ae(e,{lock:!0,onMove:(e,r)=>{t.scrollTop=n-r},onEnd:()=>{}})},children:(0,eO.jsx)(`div`,{className:ZD.rows,style:{transform:`translateY(${-o}px)`},children:r.map(t=>{let r=t.kind==`event`;return(0,eO.jsx)(`div`,{className:ZD.row,"data-depth":t.depth,children:mD(n,t.curveIds).map(t=>{let n=(t.frame-e[0])/l;return n<-.05||n>1.05?null:(0,eO.jsx)(`div`,{className:ZD.key,"data-refs":t.refs.join(` `),"data-selected":Sy(i,t.refs),"data-active":a!=null&&t.refs.indexOf(a)>=0,"data-event":r,style:{left:n*100+`%`},children:!r&&(0,eO.jsx)(_,{size:10})},t.frame)})},t.id)})})})},tO.__docgenInfo={description:``,methods:[],displayName:`KeyDopeSheet`}})))()}var rO,iO,aO;function oO(){return(oO=t((()=>{rO=`KeyEditor__keyEditor___Lmtle`,iO=`KeyEditor__box___Lmtle`,aO={keyEditor:rO,box:iO}})))()}var sO,cO,lO,uO,dO;function fO(){return(fO=t((()=>{sO=i(),E(),L(),qD(),nO(),GE(),oO(),nD(),cO=o(),lO=[{label:`Constant`,value:`CONSTANT`},{label:`Linear`,value:`LINEAR`},{label:`Bezier`,value:`BEZIER`}],uO=[{label:`Auto Clamped`,value:`AUTO_CLAMPED`},{label:`Auto`,value:`AUTO`},{label:`Vector`,value:`VECTOR`},{label:`Aligned`,value:`ALIGNED`},{label:`Free`,value:`FREE`}],dO=()=>{let{editor:e}=I(),{open:t,closeAll:n}=w(),{entity:r,channels:i,mode:a,select:o,selectRefs:s,pressKeys:c,beginDrag:l,editAreaActions:u,areaRef:d,pointerRef:f,openMenuRef:p,boxSelecting:m,endBoxSelect:h,deleteSelectedKeys:g,copySelectedKeys:_,pasteCopiedKeys:v,setSelectedInterpolation:y,setSelectedHandleType:b,distributeSelectedKeys:x,straightenSelectedKeys:S,applyActiveHandles:C}=WE(),[ee,T]=(0,sO.useState)(null);if((0,sO.useEffect)(()=>()=>{e.leaveEditArea(u)},[e,u]),p.current=()=>{let e=e=>()=>{e(),n()},r=[];for(let t of lO)r.push({label:t.label,onClick:e(()=>y(t.value))});let i=[];for(let t of uO)i.push({label:t.label,onClick:e(()=>b(t.value))});let a=[{label:`Distribute`,onClick:e(x)},{label:`Straighten Values`,onClick:e(S)}],o=[{label:`Interpolation`,children:r},{label:`Handle Type`,children:i},{label:`Align`,children:a},{label:`Apply Active Handles`,onClick:e(C)},{label:`Copy`,onClick:e(_)},{label:`Paste`,onClick:e(v)},{label:`Delete`,onClick:e(g)}];t((0,cO.jsx)(fe,{title:`Keyframes`,items:o}),se(f.current.x,f.current.y))},!r||i.length<=1)return null;let te=e=>{let t=d.current;if(!t)return;let n=t.getBoundingClientRect(),r=e.shiftKey,i={clientX:e.clientX,clientY:e.clientY};ae(i,{onMove:(e,t,r)=>{let a=ie(i,r);T({left:a.left-n.left,top:a.top-n.top,width:a.right-a.left,height:a.bottom-a.top})},onEnd:(e,n)=>{T(null);let a=[];e&&(a=tD(t,ie(i,n))),s(a,r)}})},ne=(e,t)=>{let n=e.shiftKey,r=c(t,n),i=null,a=!1;ae({clientX:e.clientX,clientY:e.clientY},{onMove:(e,t)=>{a||(a=!0,i=l()),i&&i.move(e,t)},onEnd:e=>{i&&i.end(),!e&&!n&&r&&o(new Set(t))}})},E=e=>{e.button!=0||!m||(e.stopPropagation(),h(),te(e))},re=e=>{if(e.button!=2)return;e.stopPropagation();let t=eD(e.target);t?ne(e,t):te(e)},oe=e=>{f.current={x:e.clientX,y:e.clientY}},ce=(0,cO.jsx)(tO,{});return a==`curves`&&(ce=(0,cO.jsx)(KD,{})),(0,cO.jsxs)(`div`,{className:aO.keyEditor,ref:d,"data-box-selecting":m,onPointerEnter:t=>{oe(t),e.enterEditArea(u)},onPointerMove:oe,onPointerLeave:()=>e.leaveEditArea(u),onPointerDownCapture:E,onPointerDown:re,children:[ce,ee&&(0,cO.jsx)(`div`,{className:aO.box,style:ee})]})},dO.__docgenInfo={description:``,methods:[],displayName:`KeyEditor`}})))()}var pO,mO,hO,gO,_O,vO,yO,bO,xO,SO;function CO(){return(CO=t((()=>{pO=`KeyChannelList__channelList___LmNoY`,mO=`KeyChannelList__header___LmNoY`,hO=`KeyChannelList__list___LmNoY`,gO=`KeyChannelList__empty___LmNoY`,_O=`KeyChannelList__row___LmNoY`,vO=`KeyChannelList__toggle___LmNoY`,yO=`KeyChannelList__component___LmNoY`,bO=`KeyChannelList__label___LmNoY`,xO=`KeyChannelList__shared___LmNoY`,SO={channelList:pO,header:mO,list:hO,empty:gO,row:_O,toggle:vO,component:yO,label:bO,shared:xO}})))()}var wO,TO,EO;function DO(){return(DO=t((()=>{E(),GE(),jD(),CO(),wO=o(),TO=[{value:`keys`,label:`Keys`,title:`Dope Sheet`},{value:`curves`,label:`Curves`,title:`Graph Editor`}],EO=()=>{let{entity:e,visibleChannels:t,mode:n,setMode:r,collapsed:i,toggleCollapsed:o,activeChannelId:s,setActiveChannelId:c,channelListRef:l,setScrollTop:u}=WE();return(0,wO.jsxs)(`div`,{className:SO.channelList,children:[(0,wO.jsx)(`div`,{className:SO.header,children:(0,wO.jsx)(he,{options:TO,value:n,onChange:r})}),(0,wO.jsxs)(`div`,{className:SO.list,ref:l,onScroll:e=>u(e.currentTarget.scrollTop),children:[!e&&(0,wO.jsx)(`div`,{className:SO.empty,children:`No entity selected`}),t.map(e=>{let t;return n==`curves`&&e.element!==null&&(t=_D(e.element)),(0,wO.jsxs)(`div`,{className:SO.row,"data-depth":e.depth,"data-active":n==`curves`&&e.id==s,onClick:()=>c(e.id),children:[(0,wO.jsx)(`span`,{className:SO.toggle,children:e.hasChildren&&(0,wO.jsx)(`button`,{onClick:t=>{t.stopPropagation(),o(e.id)},children:(0,wO.jsx)(a,{open:!i.has(e.id)})})}),e.component&&(0,wO.jsx)(`span`,{className:SO.component,children:e.component}),(0,wO.jsx)(`span`,{className:SO.label,style:{color:t},children:e.label}),e.shared&&(0,wO.jsxs)(`span`,{className:SO.shared,title:`Shared with ${e.shared.count} fields`,children:[`⇄ `,e.shared.name,` (`,e.shared.count,`)`]})]},e.id)})]})]})},EO.__docgenInfo={description:``,methods:[],displayName:`KeyChannelList`}})))()}var Q,OO,kO,AO,jO,MO,NO,PO,FO;function IO(){return(IO=t((()=>{Q=i(),My(),Fy(),L(),iT(),jD(),hD(),nD(),OO={entity:null,curves:{},channels:[]},kO=e=>{let t=e.getField(`selectedEntityId`);return t&&e.engine.root.findEntityByUUID(t)||null},AO=e=>{let t=[kO(e),e.engine.curves];return e.engine.root.traverseEditable(e=>{let n=ys(e);Object.keys(n).length>0&&t.push(n)}),t},jO=(e,t)=>{if(e.length!=t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0},MO=e=>{let t=kO(e),n=e.engine.curves;return t?{entity:t,curves:n,channels:dD(t,n,Rs(e.engine))}:{...OO,curves:n}},NO=e=>e.kind==`number`||e.kind==`array`,PO=e=>{let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a.x),n=Math.min(n,a.y),r=Math.max(r,a.x),i=Math.max(i,a.y);return{x:(t+r)/2,y:(n+i)/2}},FO=()=>{let{editor:e,engine:t}=I(),{viewPort:n}=rT(),[r,i]=(0,Q.useState)(()=>MO(e)),a=(0,Q.useRef)([]),o=(0,Q.useRef)(null),[s,c]=(0,Q.useState)(`keys`),[l,u]=(0,Q.useState)(()=>new Set),[d,f]=(0,Q.useState)(null),[p,m]=(0,Q.useState)(()=>new Set),[h,g]=(0,Q.useState)(rD),[_,v]=(0,Q.useState)(0),y=(0,Q.useRef)(l),b=(0,Q.useRef)(d),x=(0,Q.useRef)(null),S=(0,Q.useRef)(null),C=(0,Q.useRef)(null),ee=(0,Q.useRef)({x:0,y:0}),w=(0,Q.useRef)(null),T=(0,Q.useRef)(null),te=(0,Q.useRef)(null),[ne,E]=(0,Q.useState)(!1),re=(0,Q.useCallback)((e,t=b.current)=>{let n=t;n&&!QE(e,n)&&(n=null),y.current=e,b.current=n,u(e),f(n)},[]),ie=(e,t)=>{if(!e)return null;let{curveId:n,index:r}=JE(e),i=t.get(n);if(!i)return e;let a=i.get(r);return a===void 0?null:KE(n,a)};Py(()=>{let t=AO(e),n=a.current;if(jO(t,n))return;a.current=t;let r=t[0]!==n[0],s=t[1]!==n[1]&&t[1]!==o.current;n.length>0&&(r||s)&&re(new Set),i(MO(e))});let ae=r.channels,oe=(0,Q.useMemo)(()=>{let e=new Set,t=[];for(let n of ae){if(n.parentId&&(e.has(n.parentId)||p.has(n.parentId))){e.add(n.id);continue}t.push(n)}return t},[ae,p]),se=(0,Q.useMemo)(()=>{let e=ae[0];for(let t of ae)t.id==h&&(e=t);let t=[],n=new Set;if(!e)return t;for(let r of ae){if(!r.leaf||!NO(r)||e.id!=`#entity`&&r.id!=e.id&&r.parentId!=e.id)continue;let i=r.curveIds[0];n.has(i)||(n.add(i),t.push({id:i,element:r.element,shared:r.shared}))}return t},[ae,h]),ce=(0,Q.useMemo)(()=>{let e=[];for(let t of se)e.push(t.id);return e},[se]),[le,ue]=(0,Q.useState)({min:-1,max:1}),[de,fe]=(0,Q.useState)(null),pe=!1;for(let e of ce)pD(r.curves[e]).length>0&&(pe=!0);(!de||de.entity!==r.entity||de.empty&&pe)&&(fe({entity:r.entity,empty:!pe}),ue(xD(r.curves,ce)));let me=()=>{ue(xD(t.curves,ce))},he=(0,Q.useCallback)(e=>{m(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},[]),ge=(0,Q.useCallback)((e,t)=>{let n=Cy(y.current,b.current,e,$E(e),t);return re(n.selection,n.active),n.wasSelected},[re]),_e=(0,Q.useCallback)((e,t)=>{re(wy(y.current,e,t))},[re]),ve=e=>{let n=new Set;if(e){let e=[];ae.length>0&&(e=ae[0].curveIds),s==`curves`&&(e=ce);for(let r of e){let e=pD(t.curves[r]);for(let t=0;t<e.length;t++)n.add(KE(r,t))}}re(n)},ye=()=>{if(te.current||T.current)return;let t=S.current;t&&(te.current=new Ty({editor:e,area:t,onEnd:()=>{te.current=null,E(!1)}}),E(!0))},be=()=>{te.current&&te.current.end()},xe=e=>Js(e,t.frameSetting.fps),Se=t=>{o.current=t,e.api.setCurves(t)},Ce=new Set;for(let e of ae)e.leaf&&NO(e)&&Ce.add(e.curveIds[0]);let D=()=>{let e=YE(y.current,t.curves);if(e.size==0)return;let n={...t.curves};for(let[r,i]of e)n[r]=Ao(t.curves[r],i);Se(n),re(new Set)},we=e=>{let n=YE(y.current,t.curves),r={...t.curves},i=!1;for(let[a,o]of n)Ce.has(a)&&(r[a]=e(t.curves[a],o),i=!0);i&&Se(r)},O=e=>{we((t,n)=>No(t,n,e))},Te=e=>{we((t,n)=>Po(t,n,e))},Ee=e=>{let n=YE(y.current,t.curves),r={...t.curves},i=new Map,a=new Map;for(let[o,s]of n){if(!Ce.has(o))continue;let n=e(t.curves[o],s);n&&(r[o]=n.curve,i.set(o,n.indices),a.set(o,n.indexMap))}if(i.size==0)return;let o=new Set;for(let e of y.current)i.has(JE(e).curveId)||o.add(e);for(let[e,t]of i)for(let n of t)o.add(KE(e,n));Se(r),re(o,ie(b.current,a))},De=()=>{Ee((e,t)=>Fo(e,t,xe))},Oe=()=>{Ee(Io)},ke=()=>{let e=b.current;if(!e)return;let{curveId:n,index:r}=JE(e);if(!Ce.has(n))return;let i=Lo(t.curves[n],r);if(!i)return;let a=YE(y.current,t.curves),o={...t.curves},s=!1;for(let[e,c]of a){if(!Ce.has(e))continue;let a=[];for(let t of c)(e!=n||t!=r)&&a.push(t);a.length!=0&&(o[e]=Ro(t.curves[e],a,i),s=!0)}s&&Se(o)},Ae=()=>{let e=YE(y.current,t.curves),n=[],r=new Set,i=1/0;for(let a of ae){if(!a.leaf)continue;let o=a.curveIds[0],s=e.get(o);if(!s||r.has(o))continue;r.add(o);let c=pD(t.curves[o]),l=[];for(let e of s)l.push(c[e]),i=Math.min(i,c[e].coordinate.x);n.push({channelId:a.id,keys:l})}n.length!=0&&(x.current={entries:n,start:i})},je=()=>{let e=x.current;if(!e)return;let n=hs(t)-e.start,r={...t.curves},i=new Set,a=!1;for(let t of e.entries){let e=null;for(let n of ae)n.leaf&&n.id==t.channelId&&(e=n);if(!e)continue;let o=e.curveIds[0],s=Mo(r[o],t.keys,n,xe);r[o]=s.curve,a=!0;for(let e of s.indices)i.add(KE(o,e))}a&&(Se(r),re(i,null))},k=()=>{let e=S.current;if(!e)return null;let t=e.getBoundingClientRect(),r=kD(n,le,t.width,t.height);return{mapping:{toScreen:e=>({x:t.left+r.toX(e.x),y:t.top+r.toY(e.y)}),toPoint:e=>({x:r.toFrame(e.x-t.left),y:r.toValue(e.y-t.top)})},framePerPx:r.framePerPx,valuePerPx:r.valuePerPx}},Me=(e,n)=>{let{keys:r,handles:i}=XE(y.current,t.curves);if((s==`keys`||n)&&i.clear(),s==`curves`&&e!=`translate`){let e=new Set(ce);for(let t of Array.from(r.keys()))e.has(t)||r.delete(t);for(let t of Array.from(i.keys()))e.has(t)||i.delete(t)}if(r.size==0&&i.size==0)return null;let a=[],o=[];for(let[e,n]of r){let r=pD(t.curves[e]);for(let e of n)a.push(r[e].coordinate)}for(let[e,n]of i){let r=pD(t.curves[e]);for(let e of n)o.push(r[e.index].coordinate)}let c=a.length==0;c&&(a=o);let l=new Map;if(s==`curves`&&e!=`translate`&&a.length==1&&!c){for(let[e,n]of r){let r=i.get(e)||[];for(let i of AD(pD(t.curves[e]),n[0]))r.push({index:n[0],side:i});i.set(e,r),l.set(e,n[0])}r.clear()}return{keys:r,handles:i,keptKeys:l,center:PO(a),individual:c,duplicate:n}},Ne=n=>{let r=t.curves,i=y.current,a=b.current,s=e.api.beginEdit(t,`curves`),c=new Set;for(let e of n.keys.keys())c.add(e);for(let e of n.handles.keys())c.add(e);let l=!1;return{apply:e=>{let t={...r},u=new Set,d=new Map;for(let e of i)!n.duplicate&&!c.has(JE(e).curveId)&&u.add(e);for(let i of c){let a=jo(r[i],n.keys.get(i)||[],n.handles.get(i)||[],e(i),n.duplicate);t[i]=a.curve,d.set(i,a.indexMap);for(let e of a.indices)u.add(KE(i,e));let o=n.keptKeys.get(i);o!==void 0&&u.add(KE(i,o));for(let e of a.handles)e.index!==o&&u.add(qE(i,e.index,e.side))}o.current=t,s.set(t),re(u,ie(a,d)),l=!0},commit:()=>{l&&s.commit()},cancel:()=>{o.current=r,s.cancel(),re(i,a)}}},Pe=(e,t,n)=>{let r=new Set(ce);return i=>{if(s==`keys`)return{point:e,transformHandles:!1,snapTime:xe};let a=e;return r.has(i)||(a=(t,n)=>({x:e(t,n).x,y:t.y})),{point:a,transformHandles:t!=`translate`,snapTime:xe,roundTime:e=>CD(e,n.framePerPx),roundValue:e=>CD(e,n.valuePerPx)}}},Fe=()=>{let e=k(),t=Me(`translate`,!1);if(!e||!t)return null;let n=Ne(t),r=e.mapping.toPoint({x:0,y:0});return{move:(t,i)=>{let a=e.mapping.toPoint({x:t,y:i}),o=a.y-r.y;s==`keys`&&(o=0);let c={x:a.x-r.x,y:o};n.apply(Pe(e=>({x:e.x+c.x,y:e.y+c.y}),`translate`,e))},end:()=>n.commit()}},Ie=(n,r)=>{if(T.current||s==`keys`&&n==`rotate`)return;be();let i=k(),a=Me(n,r);if(!i||!a)return;let o=Ne(a),c=a.center;s==`keys`&&(c={x:hs(t),y:0});let l=()=>{T.current&&e.endEditModal(T.current),T.current=null},u=`xy`;s==`keys`&&(u=`x`);let d=new ky({mode:n,mapping:i.mapping,pointer:{...ee.current},center:c,individual:a.individual,axes:u,axisLabels:{x:`time`,y:`value`},digits:{x:1,y:3},onChange:e=>o.apply(Pe(e,n,i)),onStatus:t=>e.setModalStatus(t),onConfirm:()=>{o.commit(),l()},onCancel:()=>{o.cancel(),l()}});T.current=d,e.beginEditModal(d)};(0,Q.useEffect)(()=>()=>{T.current&&T.current.cancel(),te.current&&te.current.end()},[e]);let Le=(0,Q.useRef)({deleteSelectedKeys:D,copySelectedKeys:Ae,pasteCopiedKeys:je,startTransform:Ie,beginBoxSelect:ye,selectAllKeys:ve,frameAll:me});Le.current={deleteSelectedKeys:D,copySelectedKeys:Ae,pasteCopiedKeys:je,startTransform:Ie,beginBoxSelect:ye,selectAllKeys:ve,frameAll:me};let Re=(0,Q.useMemo)(()=>({deleteSelected:()=>Le.current.deleteSelectedKeys(),copy:()=>Le.current.copySelectedKeys(),paste:()=>Le.current.pasteCopiedKeys(),transform:e=>Le.current.startTransform(e,!1),duplicate:()=>Le.current.startTransform(`translate`,!0),boxSelect:()=>Le.current.beginBoxSelect(),selectAll:e=>Le.current.selectAllKeys(e),frameAll:()=>Le.current.frameAll(),openMenu:()=>{w.current&&w.current()}}),[]);return{entity:r.entity,curves:r.curves,channels:ae,visibleChannels:oe,graphCurves:se,mode:s,setMode:c,selection:l,active:d,areaRef:S,channelListRef:C,pointerRef:ee,openMenuRef:w,valueRange:le,setValueRange:ue,boxSelecting:ne,endBoxSelect:be,collapsed:p,toggleCollapsed:he,activeChannelId:h,setActiveChannelId:g,scrollTop:_,setScrollTop:v,pressKeys:ge,selectRefs:_e,select:re,deleteSelectedKeys:D,copySelectedKeys:Ae,pasteCopiedKeys:je,setSelectedInterpolation:O,setSelectedHandleType:Te,distributeSelectedKeys:De,straightenSelectedKeys:Oe,applyActiveHandles:ke,beginDrag:Fe,editAreaActions:Re}}})))()}var LO,RO;function zO(){return(zO=t((()=>{HE(),IO(),LO=o(),RO=e=>{let t=FO();return(0,LO.jsx)(VE.Provider,{value:t,children:e.children})},RO.__docgenInfo={description:``,methods:[],displayName:`KeyEditorProvider`}})))()}var BO,VO,HO,UO,WO,GO;function KO(){return(KO=t((()=>{BO=`Timeline__timeline___LnRpb`,VO=`Timeline__header___LnRpb`,HO=`Timeline__inner___LnRpb`,UO=`Timeline__content___LnRpb`,WO=`Timeline__channels___LnRpb`,GO={timeline:BO,header:VO,inner:HO,content:UO,channels:WO}})))()}var qO,JO;function YO(){return(YO=t((()=>{qO=i(),L(),JO=()=>{let{editor:e}=I(),[t,n]=(0,qO.useState)({current:0,playing:!1}),[r,i]=(0,qO.useState)([0,0,100,0]),a=(0,qO.useRef)([0,0,0,0]);a.current=r;let o=r[2]-r[0],s=10*2**(0+Math.floor(Math.log2(o/100)));s=Math.max(1,Math.floor(s));let c=e?.audioBuffer,[l,u]=(0,qO.useState)();(0,qO.useEffect)(()=>{if(e){let t=e.engine,r=e=>{n({...e})};r(t.frame);let a=0,o=()=>{u(a++)},s=()=>{i([0,0,t.frameSetting.duration,0])};return s(),t.on(`update/frame/play`,r),t.on(`update/music`,o),t.on(`loaded`,s),()=>{t.off(`update/frame/play`,r),t.off(`update/music`,o),t.off(`loaded`,s)}}},[e]);let d=(0,qO.useCallback)(t=>{e&&e.engine.seek(t)},[e]),f=(0,qO.useCallback)(e=>{let t=r[2]-r[0];return Math.floor(r[0]+t*e)},[r]),p=(0,qO.useCallback)(e=>{a.current=e,i(e)},[]),m=(0,qO.useCallback)((e,t)=>{let n=a.current,r=n[0]+(n[2]-n[0])*t,i=(n[0]-r)*e+r,o=(n[2]-r)*e+r;p([i,n[1],o,n[3]])},[p]),h=(0,qO.useCallback)(e=>{let t=a.current,n=e*(t[2]-t[0]);p([t[0]+n,t[1],t[2]+n,t[3]])},[p]),g=(0,qO.useCallback)(e=>{let t=a.current,n=t[2]-t[0];p([e-n/2,t[1],e+n/2,t[3]])},[p]);return{glEditor:e,framePlay:t,viewPort:r,viewPortScale:s,musicBuffer:c,musicBufferVersion:l,setCurrentFrame:d,getFrameViewPort:f,zoom:m,scroll:h,setViewPortCenter:g}}})))()}var XO,ZO;function QO(){return(QO=t((()=>{tT(),YO(),XO=o(),ZO=e=>{let t=JO();return(0,XO.jsx)(eT.Provider,{value:t,children:e.children})},ZO.__docgenInfo={description:``,methods:[],displayName:`TimelineProvider`}})))()}var $O,ek;function tk(){return(tk=t((()=>{hT(),GT(),QT(),mE(),EE(),IE(),fO(),DO(),zO(),KO(),QO(),$O=o(),ek=()=>(0,$O.jsx)(ZO,{children:(0,$O.jsx)(RO,{children:(0,$O.jsxs)(`div`,{className:GO.timeline,children:[(0,$O.jsx)(`div`,{className:GO.header,children:(0,$O.jsx)(FE,{})}),(0,$O.jsxs)(`div`,{className:GO.inner,children:[(0,$O.jsx)(`div`,{className:GO.channels,children:(0,$O.jsx)(EO,{})}),(0,$O.jsxs)(`div`,{className:GO.content,children:[(0,$O.jsx)(mT,{}),(0,$O.jsx)(ZT,{}),(0,$O.jsxs)(WT,{children:[(0,$O.jsx)(dO,{}),(0,$O.jsx)(pE,{})]}),(0,$O.jsx)(TE,{})]})]})]})})}),ek.__docgenInfo={description:``,methods:[],displayName:`Timeline`}})))()}var nk,rk;function ik(){return(ik=t((()=>{nk=`OREditor__editor___LmVka`,rk={editor:nk}})))()}var ak,ok;function sk(){return(sk=t((()=>{ak=e(i(),1),My(),vx(),ok=e=>{let{engine:t}=_x(),[n,r]=(0,ak.useState)(()=>new by(t)),i=ak.useRef(n);return i.current=n,(0,ak.useEffect)(()=>{if(!i.current.disposed&&i.current.engine.uuid==t.uuid)return;let e=new by(t);r(e)},[t]),(0,ak.useEffect)(()=>()=>{n.dispose()},[n]),{engine:t,editor:n,projectName:e}}})))()}var ck,lk,uk;function dk(){return(dk=t((()=>{ck=i(),My(),Ki(),sk(),lk=o(),uk=e=>{let t=ok(e.projectName),n=(0,ck.useRef)(Promise.resolve());(0,ck.useEffect)(()=>{if(!t.editor||!e.onSave)return;let r=e.onSave,i=(e,t)=>{n.current=Promise.resolve(r(e,t))};return t.editor.on(`save`,i),()=>{t.editor.off(`save`,i)}},[t.editor,e.onSave]);let r=(0,ck.useRef)(null),i=e.scenes??null;return(0,ck.useEffect)(()=>{r.current=i},[i]),(0,ck.useEffect)(()=>ju({editor:t.editor,getScenes:()=>r.current,waitForSave:()=>n.current}),[t.editor]),(0,ck.useEffect)(()=>{t.editor&&t.editor.bootstrap(e.editorData)},[e.editorData,t.editor]),(0,lk.jsx)(Gi.Provider,{value:{...t,scenes:e.scenes,fieldUIs:e.fieldUIs},children:e.children})},uk.__docgenInfo={description:``,methods:[],displayName:`OREditorProvider`}})))()}var fk,$,pk,mk,hk;function gk(){return(gk=t((()=>{fk=e(i(),1),E(),Ce(),ka(),za(),ix(),fx(),qx(),ES(),jS(),Sw(),kw(),Bw(),EC(),Qw(),tk(),ik(),dk(),$=o(),pk=[{id:`hierarchy`,title:`Hierarchy`,category:`General`,content:(0,$.jsx)(pe,{children:(0,$.jsx)(TS,{})})},{id:`timer`,title:`Timer`,category:`Rendering`,content:(0,$.jsx)(pe,{noPadding:!0,children:(0,$.jsx)(Kx,{})})},{id:wC,title:`Screen`,category:`General`,multiple:!0,content:e=>(0,$.jsx)(TC,{viewportId:e})},{id:`property`,title:`Property`,category:`General`,content:(0,$.jsx)(pe,{children:(0,$.jsx)(rx,{})})},{id:`textures`,title:`Textures`,category:`Rendering`,content:(0,$.jsx)(pe,{noPadding:!0,children:(0,$.jsx)(Zw,{})})},{id:`scene`,title:`Scene`,category:`General`,content:(0,$.jsx)(pe,{children:(0,$.jsx)(zw,{})})},{id:`export`,title:`Export`,category:`Project`,content:(0,$.jsx)(pe,{children:(0,$.jsx)(dx,{})})},{id:`renderer`,title:`Renderer`,category:`Rendering`,content:(0,$.jsx)(pe,{children:(0,$.jsx)(Ow,{})})},{id:`editor-settings`,title:`Editor`,category:`Project`,content:(0,$.jsx)(pe,{children:(0,$.jsx)(Oa,{})})},{id:`timeline`,title:`Timeline`,category:`Animation`,content:(0,$.jsx)(pe,{noPadding:!0,children:(0,$.jsx)(ek,{})})}],mk=[`hierarchy`,`property`],hk=e=>{let t=Se(),n=(0,fk.useMemo)(()=>e.panels?[...pk,...e.panels]:pk,[e.panels]),r=`pc`;return t.isSP&&(r=`sp`),(0,$.jsx)(uk,{projectName:e.projectName,onSave:e.onSave,editorData:e.editorData,scenes:e.scenes,fieldUIs:e.fieldUIs,children:(0,$.jsx)(ee,{children:(0,$.jsxs)(re,{children:[(0,$.jsx)(`div`,{className:rk.editor,children:(0,$.jsx)(xw,{mode:r,panels:n,activateOnSelect:mk})}),(0,$.jsx)(Ra,{}),(0,$.jsx)(AS,{}),(0,$.jsx)(S,{}),(0,$.jsx)(ne,{})]})})})},hk.__docgenInfo={description:``,methods:[],displayName:`OREditor`,props:{onSave:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( projectData: OREngineProjectData, editorData: MXP.SerializeField ) => Promise<void> | void`,signature:{arguments:[{type:{name:`OREngineProjectData`},name:`projectData`},{type:{name:`MXP.SerializeField`},name:`editorData`}],return:{name:`union`,raw:`Promise<void> | void`,elements:[{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`},{name:`void`}]}}},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},projectName:{required:!1,tsType:{name:`string`},description:``},panels:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
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
}`,signature:{properties:[{key:`names`,value:{name:`Array`,elements:[{name:`string`}],raw:`string[]`,required:!0}},{key:`current`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!0}},{key:`onSelect`,value:{name:`signature`,type:`function`,raw:`( name: string ) => Promise<void>`,signature:{arguments:[{type:{name:`string`},name:`name`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}},required:!0}},{key:`onCreate`,value:{name:`signature`,type:`function`,raw:`( name: string, from?: string ) => Promise<void>`,signature:{arguments:[{type:{name:`string`},name:`name`},{type:{name:`string`},name:`from`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}},required:!0}},{key:`onDelete`,value:{name:`signature`,type:`function`,raw:`( name: string ) => Promise<void>`,signature:{arguments:[{type:{name:`string`},name:`name`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}},required:!0}}]}},description:``},fieldUIs:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	target: abstract new ( ...args: any[] ) => MXP.Serializable;
	fields: { [ path: string ]: FieldUIEntry };
}`,signature:{properties:[{key:`target`,value:{name:`unknown`,required:!0}},{key:`fields`,value:{name:`signature`,type:`object`,raw:`{ [ path: string ]: FieldUIEntry }`,signature:{properties:[{key:{name:`string`},value:{name:`signature`,type:`object`,raw:`{
	ui: FieldUI;
	layout: FieldUILayout;
}`,signature:{properties:[{key:`ui`,value:{name:`ReactFC`,raw:`React.FC<FieldUIProps<T, C>>`,elements:[{name:`signature`,type:`object`,raw:`{
	value: T;
	// 1回で終わる変更（クリック等）。連続した変更は beginEdit を使う
	setValue: ( value: T ) => void;
	// ドラッグ等の連続した変更。commit した時点で undo 1回ぶんになる
	beginEdit: () => FieldEdit;
	target: C;
	path: string;
	opt?: MXP.SerializableFieldOpt;
	engine: Engine;
	editor: Editor;
}`,signature:{properties:[{key:`value`,value:{name:`T`,required:!0}},{key:`setValue`,value:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}},required:!0}},{key:`beginEdit`,value:{name:`signature`,type:`function`,raw:`() => FieldEdit`,signature:{arguments:[],return:{name:`FieldEdit`}},required:!0}},{key:`target`,value:{name:`C`,required:!0}},{key:`path`,value:{name:`string`,required:!0}},{key:`opt`,value:{name:`MXP.SerializableFieldOpt`,required:!1}},{key:`engine`,value:{name:`Engine`,required:!0}},{key:`editor`,value:{name:`Editor`,required:!0}}]}}],required:!0}},{key:`layout`,value:{name:`union`,raw:`'inline' | 'block'`,elements:[{name:`literal`,value:`'inline'`},{name:`literal`,value:`'block'`}],required:!0}}]},required:!0}}]},required:!0}}]}}],raw:`FieldUIDefinition[]`},description:``}}}})))()}var _k,vk;function yk(){return(yk=t((()=>{_k=e(i(),1),Ku(),Li(),vk=()=>{let[e,t]=_k.useState(()=>new F(Wu)),n=_k.useRef(e);return n.current=e,(0,_k.useEffect)(()=>{n.current.disposed&&t(new F(Wu))},[]),(0,_k.useEffect)(()=>()=>{e.dispose()},[e]),{engine:e,load:(0,_k.useCallback)(t=>{t&&e.load(t)},[e])}}})))()}var bk,xk,Sk;function Ck(){return(Ck=t((()=>{bk=i(),hx(),yk(),xk=o(),Sk=e=>{let t=vk(),{engine:n}=t,r=(0,bk.useRef)(e.onEngineInit);return r.current=e.onEngineInit,(0,bk.useEffect)(()=>{r.current?.(n)},[n]),(0,bk.useEffect)(()=>{e.project?n.load(e.project):n.init()},[n,e.project]),(0,xk.jsx)(mx.Provider,{value:t,children:e.children})},Sk.__docgenInfo={description:``,methods:[],displayName:`OREngineProvider`}})))()}var wk,Tk,Ek,Dk,Ok,kk,Ak;function jk(){return(jk=t((()=>{wk=i(),gk(),Ck(),Tk=o(),Ek=`scene`,Dk=async e=>{try{let t=await fetch(e);return t.ok?await t.json():null}catch{return null}},Ok=(e,t)=>fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)}),kk=e=>({name:e,scene:{name:`Root`,uuid:`0`}}),Ak=e=>{let t=e.projectName??`DefaultProject`,n=`/api/projects/${t}`,[r,i]=(0,wk.useState)(e.sceneData),[a,o]=(0,wk.useState)(e.editorData),[s,c]=(0,wk.useState)([]),[l,u]=(0,wk.useState)(null),d=(0,wk.useCallback)(async e=>{let t=await Dk(`${n}/scenes/${e}`);if(!t)throw Error(`シーンを読み込めません: ${e}`);u(e),i(t)},[n]);(0,wk.useEffect)(()=>{e.sceneData||(async()=>{let[e,t]=await Promise.all([Dk(`${n}/editor`),Dk(`${n}/scenes`)]);e&&o(e);let r=t??[];if(c(r),r.length===0)return;let i=r[0],a=e?e[Ek]:void 0;typeof a==`string`&&r.includes(a)&&(i=a),await d(i)})()},[e.sceneData,n,d]),(0,wk.useEffect)(()=>{l&&(document.title=`${l} | OREngine`)},[l]);let f={names:s,current:l,onSelect:d,onCreate:(0,wk.useCallback)(async(e,t)=>{let r=kk(e);if(t!==void 0){let i=await Dk(`${n}/scenes/${t}`);if(!i)throw Error(`複製元のシーンを読み込めません: ${t}`);r={...i,name:e}}let i=await Ok(`${n}/scenes/${e}`,r);if(!i.ok)throw Error(`シーンを作成できません: ${e}（HTTP ${i.status}）`);let a=await Dk(`${n}/scenes`);a&&c(a)},[n]),onDelete:(0,wk.useCallback)(async e=>{let t=await fetch(`${n}/scenes/${e}`,{method:`DELETE`});if(!t.ok)throw Error(`シーンを削除できません: ${e}（HTTP ${t.status}）`);let r=await Dk(`${n}/scenes`)??[];c(r),e===l&&r.length>0&&await d(r[0])},[n,l,d])};return(0,Tk.jsx)(Sk,{project:r,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,Tk.jsx)(hk,{editorData:a,projectName:t,panels:e.panels,fieldUIs:e.fieldUIs,scenes:f,onSave:async(t,r)=>{e.onBeforeSave?.();let i=[Ok(`${n}/editor`,{...r,[Ek]:l})];l&&i.push(Ok(`${n}/scenes/${l}`,t));for(let e of await Promise.all(i))if(!e.ok)throw Error(`保存に失敗しました（POST ${new URL(e.url).pathname}: HTTP ${e.status}）`)}})})},Ak.__docgenInfo={description:``,methods:[],displayName:`EditorPage`,props:{projectName:{required:!1,tsType:{name:`string`},description:``},sceneData:{required:!1,tsType:{name:`OREngineProjectData`},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},initResourceInstances:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( engine: Engine ) => void`,signature:{arguments:[{type:{name:`Engine`},name:`engine`}],return:{name:`void`}}},description:``},panels:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`category`,value:{name:`string`,required:!1}}]}},{name:`unknown`}]}],raw:`PanelDefinition[]`},description:``},fieldUIs:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	target: abstract new ( ...args: any[] ) => MXP.Serializable;
	fields: { [ path: string ]: FieldUIEntry };
}`,signature:{properties:[{key:`target`,value:{name:`unknown`,required:!0}},{key:`fields`,value:{name:`signature`,type:`object`,raw:`{ [ path: string ]: FieldUIEntry }`,signature:{properties:[{key:{name:`string`},value:{name:`signature`,type:`object`,raw:`{
	ui: FieldUI;
	layout: FieldUILayout;
}`,signature:{properties:[{key:`ui`,value:{name:`ReactFC`,raw:`React.FC<FieldUIProps<T, C>>`,elements:[{name:`signature`,type:`object`,raw:`{
	value: T;
	// 1回で終わる変更（クリック等）。連続した変更は beginEdit を使う
	setValue: ( value: T ) => void;
	// ドラッグ等の連続した変更。commit した時点で undo 1回ぶんになる
	beginEdit: () => FieldEdit;
	target: C;
	path: string;
	opt?: MXP.SerializableFieldOpt;
	engine: Engine;
	editor: Editor;
}`,signature:{properties:[{key:`value`,value:{name:`T`,required:!0}},{key:`setValue`,value:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}},required:!0}},{key:`beginEdit`,value:{name:`signature`,type:`function`,raw:`() => FieldEdit`,signature:{arguments:[],return:{name:`FieldEdit`}},required:!0}},{key:`target`,value:{name:`C`,required:!0}},{key:`path`,value:{name:`string`,required:!0}},{key:`opt`,value:{name:`MXP.SerializableFieldOpt`,required:!1}},{key:`engine`,value:{name:`Engine`,required:!0}},{key:`editor`,value:{name:`Editor`,required:!0}}]}}],required:!0}},{key:`layout`,value:{name:`union`,raw:`'inline' | 'block'`,elements:[{name:`literal`,value:`'inline'`},{name:`literal`,value:`'block'`}],required:!0}}]},required:!0}}]},required:!0}}]}}],raw:`FieldUIDefinition[]`},description:``},onBeforeSave:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})))()}var Mk,Nk;function Pk(){return(Pk=t((()=>{gk(),Ck(),Mk=o(),Nk=e=>(0,Mk.jsx)(Sk,{project:e.sceneData,onEngineInit:t=>{e.initResourceInstances(t)},children:(0,Mk.jsx)(hk,{editorData:e.editorData,projectName:e.projectName??`Static`,panels:e.panels,fieldUIs:e.fieldUIs,onSave:()=>{}})}),Nk.__docgenInfo={description:``,methods:[],displayName:`EditorPageStatic`,props:{projectName:{required:!1,tsType:{name:`string`},description:``},sceneData:{required:!0,tsType:{name:`OREngineProjectData`},description:``},editorData:{required:!1,tsType:{name:`MXP.SerializeField`},description:``},initResourceInstances:{required:!0,tsType:{name:`signature`,type:`function`,raw:`( engine: Engine ) => void`,signature:{arguments:[{type:{name:`Engine`},name:`engine`}],return:{name:`void`}}},description:``},panels:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`{
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
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}},{key:`category`,value:{name:`string`,required:!1}}]}},{name:`unknown`}]}],raw:`PanelDefinition[]`},description:``},fieldUIs:{required:!1,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
	target: abstract new ( ...args: any[] ) => MXP.Serializable;
	fields: { [ path: string ]: FieldUIEntry };
}`,signature:{properties:[{key:`target`,value:{name:`unknown`,required:!0}},{key:`fields`,value:{name:`signature`,type:`object`,raw:`{ [ path: string ]: FieldUIEntry }`,signature:{properties:[{key:{name:`string`},value:{name:`signature`,type:`object`,raw:`{
	ui: FieldUI;
	layout: FieldUILayout;
}`,signature:{properties:[{key:`ui`,value:{name:`ReactFC`,raw:`React.FC<FieldUIProps<T, C>>`,elements:[{name:`signature`,type:`object`,raw:`{
	value: T;
	// 1回で終わる変更（クリック等）。連続した変更は beginEdit を使う
	setValue: ( value: T ) => void;
	// ドラッグ等の連続した変更。commit した時点で undo 1回ぶんになる
	beginEdit: () => FieldEdit;
	target: C;
	path: string;
	opt?: MXP.SerializableFieldOpt;
	engine: Engine;
	editor: Editor;
}`,signature:{properties:[{key:`value`,value:{name:`T`,required:!0}},{key:`setValue`,value:{name:`signature`,type:`function`,raw:`( value: T ) => void`,signature:{arguments:[{type:{name:`T`},name:`value`}],return:{name:`void`}},required:!0}},{key:`beginEdit`,value:{name:`signature`,type:`function`,raw:`() => FieldEdit`,signature:{arguments:[],return:{name:`FieldEdit`}},required:!0}},{key:`target`,value:{name:`C`,required:!0}},{key:`path`,value:{name:`string`,required:!0}},{key:`opt`,value:{name:`MXP.SerializableFieldOpt`,required:!1}},{key:`engine`,value:{name:`Engine`,required:!0}},{key:`editor`,value:{name:`Editor`,required:!0}}]}}],required:!0}},{key:`layout`,value:{name:`union`,raw:`'inline' | 'block'`,elements:[{name:`literal`,value:`'inline'`},{name:`literal`,value:`'block'`}],required:!0}}]},required:!0}}]},required:!0}}]}}],raw:`FieldUIDefinition[]`},description:``}}}})))()}var Fk,Ik;function Lk(){return(Lk=t((()=>{Fk=`ComponentPanel__empty___LmVtc`,Ik={empty:Fk}})))()}var Rk,zk,Bk;function Vk(){return(Vk=t((()=>{Rk=i(),E(),L(),kb(),Ga(),Lk(),zk=o(),Bk=({target:e,ui:t,title:n})=>{let{editor:r,engine:i}=I(),[a]=J(r,`selectedEntityId`),o=(0,Rk.useMemo)(()=>{if(a)return i.root.findEntityByUUID(a)},[i,a]);Wa(o,[`components`]);let s=o?.getComponent(e);return!o||!s?(0,zk.jsx)(pe,{children:(0,zk.jsxs)(`p`,{className:Ik.empty,children:[`Select an entity with `,n]})}):(0,zk.jsx)(pe,{children:(0,zk.jsx)(t,{target:s,entity:o,engine:i,editor:r},s.uuid)})},Bk.__docgenInfo={description:``,methods:[],displayName:`ComponentPanel`,props:{target:{required:!0,tsType:{name:`unknown`},description:``},ui:{required:!0,tsType:{name:`ReactFC`,raw:`React.FC<ComponentPanelProps<C>>`,elements:[{name:`signature`,type:`object`,raw:`{
	// 選択中（アクティブ）のエンティティが持つ対象コンポーネント
	target: C;
	entity: MXP.Entity;
	engine: Engine;
	editor: Editor;
}`,signature:{properties:[{key:`target`,value:{name:`C`,required:!0}},{key:`entity`,value:{name:`MXP.Entity`,required:!0}},{key:`engine`,value:{name:`Engine`,required:!0}},{key:`editor`,value:{name:`Editor`,required:!0}}]}}]},description:``},title:{required:!0,tsType:{name:`string`},description:``}}}})))()}function Hk(){return(Hk=t((()=>{Vk(),o()})))()}var Uk,Wk,Gk;function Kk(){return(Kk=t((()=>{Uk=`InputGroup__group___Lmdyb`,Wk=`InputGroup__submit___Lmdyb`,Gk={group:Uk,submit:Wk}})))()}var qk,Jk,Yk;function Xk(){return(Xk=t((()=>{qk=i(),E(),pa(),Kk(),Jk=o(),Yk=e=>{let t=e.initialValues,n=[],[r,i]=(0,qk.useState)(t);(0,qk.useEffect)(()=>{i(t)},[t]);let a=Object.keys(r);for(let e=0;e<a.length;e++){let t=a[e],o=r[t];n.push((0,Jk.jsx)(fa,{label:t,value:o,onChange:e=>{i({...r,[t]:e})}},e))}let o=(0,qk.useRef)(null);return(0,qk.useEffect)(()=>{setTimeout(()=>{o.current&&o.current.querySelector(`input`)?.focus()},0)},[]),(0,Jk.jsx)(`div`,{className:Gk.group,ref:o,children:(0,Jk.jsxs)(`form`,{onSubmit:e=>{e.preventDefault()},children:[(0,Jk.jsx)(s,{label:e.title,noMargin:!0,children:n}),(0,Jk.jsx)(`div`,{className:Gk.submit,children:(0,Jk.jsx)(c,{type:`submit`,onClick:()=>{e.onSubmit&&e.onSubmit(r)},children:`OK`})})]})})},Yk.__docgenInfo={description:``,methods:[],displayName:`InputGroup`,props:{title:{required:!1,tsType:{name:`string`},description:``},initialValues:{required:!0,tsType:{name:`signature`,type:`object`,raw:`{[key: string]:ValueType}`,signature:{properties:[{key:{name:`string`},value:{name:`SerializeFieldObjective`,required:!0}}]}},description:``},onSubmit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`( values: {[key: string]:ValueType} ) => void`,signature:{arguments:[{type:{name:`signature`,type:`object`,raw:`{[key: string]:ValueType}`,signature:{properties:[{key:{name:`string`},value:{name:`SerializeFieldObjective`,required:!0}}]}},name:`values`}],return:{name:`void`}}},description:``}}}})))()}function Zk(){return(Zk=t((()=>{jk(),Pk(),gk(),dk(),L(),Fy(),Hk(),Ck(),vx(),ES(),ix(),EC(),qS(),eC(),tk(),iT(),Bw(),fx(),qx(),kw(),ka(),Sa(),Qw(),Ob(),RS(),pa(),ub(),Xk(),Zi(),ta(),ua(),kb(),Ga(),ib(),Ce()})))()}var Qk;function $k(){return($k=t((()=>{Qk=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var eA;function tA(){return(tA=t((()=>{eA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var nA=n({EyeRings:()=>rA}),rA;function iA(){return(iA=t((()=>{P(),$k(),tA(),rA=class extends j{constructor(e){super(e);let t=new en({thetaSegments:64,innerRadius:4,outerRadius:4.01,extrude:.01}),n=[];for(let e=0;e<8;e++)n.push(-1,e,e/7),n.push(1,e,e/7);t.setAttribute(`instance`,new Float32Array(n),3,{instanceDivisor:1});let r=new Sn({phase:[`deferred`,`shadowMap`],frag:Qk,vert:eA});this.entity.addComponent(M,{geometry:t,material:r})}dispose(){super.dispose(),this.entity.removeComponent(M)}}})))()}var aA;function oA(){return(oA=t((()=>{aA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var sA;function cA(){return(cA=t((()=>{sA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var lA=n({FlashLine:()=>uA}),uA;function dA(){return(dA=t((()=>{k(),P(),oA(),cA(),uA=class extends j{geometry;material;constructor(e){super(e),this.geometry=new Mt({radiusBottom:.02,radiusTop:.02,radSegments:8,height:50});let t=[];for(let e=0;e<32;e++){let e=Ae.randomVector().multiply(new D(20,1,20));t.push(e.x,e.y,e.z,Math.random())}this.geometry.setAttribute(`oPos`,new Float32Array(t),4,{instanceDivisor:1}),this.material=new Sn({phase:[`forward`,`envMap`],transparent:!0,frag:on(`flFrag`,aA),vert:on(`flVert`,sA)}),this.entity.addComponent(M,{material:this.material,geometry:this.geometry})}}})))()}var fA;function pA(){return(pA=t((()=>{fA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
// 空の模様を作るための仮想のワールド座標。空の球はカメラに追従するので実際の位置（outPos）は模様に使えない。
// normal は半径1の球の外向き法線（= カメラから見た向き）。
// 500 は追従前の「原点中心・半径500」の球と同じ座標にするための値で、既存の模様の細かさを保つ。
// 模様の計算にだけ使い、outPos には書かない（深度とポストエフェクトは実際の位置を読むため）
vec3 skyPosition( vec3 normal ) {

	return normalize( normal ) * 500.0;

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
float outEnv = 1.0;\r
float outSSS = 0.0;

	outRoughness = 1.0;
	outColor *= 0.0;
	outColor.xyz = vec3( 0.0, 0.05, 0.1);

	vec3 sPos = skyPosition( vNormal ) * 0.1;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var mA=n({SkyBox:()=>hA}),hA;function gA(){return(gA=t((()=>{P(),pA(),hA=class extends j{material;constructor(e){super(e);let t=this.engine;this.material=new Sn({name:`SkyBox`,phase:[`deferred`,`envMap`],frag:on(`SkyBoxFrag`,fA),uniforms:{uAspectRatio:{value:0,type:`1f`}}}),t.renderer.sky.mesh.material=this.material}}})))()}var _A;function vA(){return(vA=t((()=>{_A=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var yA;function bA(){return(bA=t((()=>{yA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var xA=n({GridCross:()=>SA}),SA;function CA(){return(CA=t((()=>{k(),P(),vA(),bA(),SA=class extends j{constructor(e){super(e);let t=new At({width:.05,height:.5,depth:.05}),n=[],r=[],i=new D(16,2,16);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(Math.PI/2,0,0),n.push(o,s,c),r.push(0,0,Math.PI/2)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new Sn({frag:on(`gridCrossFrag`,_A),vert:on(`gridCrossVert`,yA),phase:[`forward`],transparent:!0});this.entity.addComponent(M,{geometry:t,material:a})}}})))()}var wA;function TA(){return(TA=t((()=>{wA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var EA;function DA(){return(DA=t((()=>{EA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var OA=n({GridDots:()=>kA}),kA;function AA(){return(AA=t((()=>{k(),P(),TA(),DA(),kA=class extends j{constructor(e){super(e);let t=new It({radius:.1}),n=[],r=[],i=new D(32,2,32);for(let e=0;e<i.x;e++)for(let t=0;t<i.y;t++)for(let a=0;a<i.z;a++){let o=(e/(i.x-1)-.5)*1,s=(t/(i.y-1)-.5)*1,c=(a/(i.z-1)-.5)*1;n.push(o,s,c),r.push(0,0,0)}t.setAttribute(`instanceRot`,new Float32Array(r),3,{instanceDivisor:1}),t.setAttribute(`instancePos`,new Float32Array(n),3,{instanceDivisor:1});let a=new Sn({frag:on(`gridDotsFrag`,wA),vert:on(`gridDotsVert`,EA),phase:[`forward`],transparent:!0});this.entity.addComponent(M,{geometry:t,material:a})}}})))()}var jA;function MA(){return(MA=t((()=>{jA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outSSS = 0.0;\r
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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif\r
\r
}`})))()}var NA;function PA(){return(PA=t((()=>{NA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
}`})))()}var FA=n({WireCube:()=>IA}),IA;function LA(){return(LA=t((()=>{P(),MA(),PA(),IA=class extends j{constructor(e){super(e);let t=3.3,n=t/2,r=new At({width:.01,height:t,depth:.01,segmentsHeight:16}),i=[],a=[];for(let e=0;e<3;e++)for(let t=0;t<4;t++)[[n,0,n],[n,0,-1.65],[-1.65,0,n],[-1.65,0,-1.65]][t].forEach(e=>{i.push(e)}),[[0,0,0],[Math.PI/2,0,0],[0,0,Math.PI/2]][e].forEach(e=>{a.push(e)});r.setAttribute(`instancePos`,new Float32Array(i),3,{instanceDivisor:1}),r.setAttribute(`instanceRot`,new Float32Array(a),3,{instanceDivisor:1});let o=new Sn({phase:[`deferred`],frag:jA,vert:NA});this.entity.addComponent(M,{geometry:r,material:o})}}})))()}var RA=n({FieldUISample:()=>zA}),zA;function BA(){return(BA=t((()=>{k(),P(),zA=class extends j{speed;wave;rotQuaternion;constructor(e){super(e),this.speed=1,this.wave=.5,this.rotQuaternion=new Oe,this.field(`speed`,()=>this.speed,e=>this.speed=e,{step:.1}),this.field(`wave`,()=>this.wave,e=>this.wave=e,{step:.05,min:0})}updateImpl(e){this.rotQuaternion.setFromEuler(new Ee(0,e.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion),this.entity.position.y=Math.sin(e.timeElapsed*2)*this.wave}}})))()}var VA;function HA(){return(HA=t((()=>{VA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var UA;function WA(){return(WA=t((()=>{UA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var GA=n({OREngineCube:()=>KA}),KA;function qA(){return(qA=t((()=>{P(),Ui(),HA(),WA(),KA=class extends j{material;constructor(e){super(e),this.material=new Sn({name:`OREngineCube`,phase:[`shadowMap`,`deferred`],vert:on(`OREngineCubeVert`,UA),frag:on(`OREngineCubeFrag`,VA),uniforms:{uNoiseTex:{value:F.resources.getTexture(`noise`),type:`1i`}}});let t=this.entity.getComponent(M);t&&(t.material=this.material)}}})))()}var JA;function YA(){return(YA=t((()=>{JA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var XA;function ZA(){return(ZA=t((()=>{XA=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var QA=n({OREngineLogo:()=>$A}),$A;function ej(){return(ej=t((()=>{P(),YA(),ZA(),$A=class extends j{material;constructor(e){super(e),this.material=new Sn({name:`OREngineLogo`,phase:[`deferred`,`shadowMap`],vert:on(`OREngineLogoVert`,XA),frag:on(`OREngineLogoFrag`,JA)});let t=this.entity.getComponent(M);t&&(t.material=this.material)}}})))()}var tj;function nj(){return(nj=t((()=>{tj=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
	// 影を落とすライトが無いと長さ0の配列になり、コンパイルエラーになる\r
	#if NUM_SHADOWMAP_DIR > 0\r
		uniform sampler2D directionalLightShadowMap[NUM_SHADOWMAP_DIR];\r
	#endif\r
	\r
#endif\r
\r
#if NUM_LIGHT_SPOT > 0 \r
\r
	uniform SpotLight uSpotLight[NUM_LIGHT_SPOT];\r
	uniform LightCamera uSpotLightCamera[NUM_LIGHT_SPOT];\r
	#if NUM_SHADOWMAP_SPOT > 0\r
		uniform sampler2D uSpotLightShadowMap[NUM_SHADOWMAP_SPOT];\r
	#endif\r
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
// 1灯ぶんの反射を diffuse と specular に分けて足す（SSS が diffuse だけをぼかすため）\r
void RE( Geometry geo, Material mat, Light light, inout vec3 diffuse, inout vec3 specular ) {\r
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
	float D = ggx( dNH, mat.roughness );\r
	float G = gSmith( dNV, dNL, mat.roughness );\r
	float F = fresnel( dLH );\r
\r
	diffuse += lambert( mat.diffuseColor ) * irradiance * ( 1.0 - F );\r
	specular += (( D * G * F ) / ( 4.0 * dNL * dNV + 0.0001 ) * mat.specularColor ) * irradiance;\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var rj;function ij(){return(ij=t((()=>{rj=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

}`})))()}var aj=n({Dust:()=>oj}),oj;function sj(){return(sj=t((()=>{k(),P(),nj(),ij(),oj=class extends j{constructor(e){super(e);let t=new Ot,n=e.args?.num||2048,r=new D(20,5,20),i=[],a=[];for(let e=0;e<n;e++)i.push((Math.random()-.5)*r.x),i.push((Math.random()-.5)*r.y),i.push((Math.random()-.5)*r.z),a.push(Math.random());t.setAttribute(`position`,new Float32Array(i),3);let o=new Sn({phase:[`forward`],transparent:!0,drawType:`POINTS`,frag:tj,vert:rj});this.entity.addComponent(M,{geometry:t,material:o})}dispose(){super.dispose(),this.entity.removeComponent(M)}}})))()}var cj;function lj(){return(lj=t((()=>{cj=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
float outEnv = 1.0;\r
float outSSS = 0.0;

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
	outColor2 = vec4( outColor.xyz, outSSS );\r
	outColor3 = vec4( outRoughness, outMetallic, outSSN, outEnv );\r
	outColor4 = vec4( vVelocity, 0.0, outEmission.z );\r
#endif\r
\r
// emission の入る w は 0 にする（シェーディングが塗った色は forward が上書きする）\r
#ifdef IS_PREPASS\r
	outColor0 = vec4( outPos, 0.0 );\r
	outColor1 = vec4( normalize( outNormal * ( gl_FrontFacing ? 1.0 : -1.0 ) ), 0.0 );\r
	outColor4 = vec4( vVelocity, 0.0, 0.0 );\r
#elif defined(IS_FORWARD)\r
	outColor0 = outColor;\r
	outColor1 = vec4(outPos, 1.0);\r
	outColor2 = vec4(vVelocity, 0.0, 1.0);\r
#endif

}`})))()}var uj;function dj(){return(dj=t((()=>{uj=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
	
}`})))()}var fj;function pj(){return(pj=t((()=>{fj=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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

} `})))()}var mj=n({YakiSoba:()=>hj}),hj;function gj(){return(gj=t((()=>{k(),P(),lj(),dj(),pj(),hj=class extends j{_gpu;constructor(e){super(e);let t=this.engine,n=new D(64,512);this._gpu=new hi({passes:[new vi(t.renderer.backend,{name:`yakisoba`,size:n,dataLayerCount:2,frag:on(`yakiSobaCompute`,fj),uniforms:hn.merge({},t.renderer.globalUniforms)})]}),this._gpu.passes[0].initTexture((e,t,n)=>[0,0,0,0]);let r=new At({width:.05,height:.05,depth:.05,segmentsHeight:n.x}),i=[],a=[];for(let e=0;e<n.y;e++)i.push(e/n.y),a.push(Math.random(),Math.random(),Math.random());r.setAttribute(`trailId`,new Float32Array(i),1,{instanceDivisor:1}),r.setAttribute(`id`,new Float32Array(a),3,{instanceDivisor:1});let o=new Sn({frag:on(`chainFrag`,cj),vert:on(`chainVert`,uj),phase:[`deferred`,`shadowMap`],uniforms:hn.merge({},this._gpu.passes[0].outputUniforms)});this.entity.addComponent(M,{geometry:r,material:o})}updateImpl(e){this.entity.isVisibleTraverse()&&this._gpu.compute(e.renderer)}dispose(){super.dispose(),this.entity.removeComponent(M),this._gpu.dispose()}}})))()}var _j;function vj(){return(vj=t((()=>{_j=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
}

// Interleaved Gradient Noise。隣り合うピクセルの値が斜めの縞として散るので、
// 白色ノイズのように無相関な粒にならず、同じサンプル数でもざらつきが目立たない。
// frameIndex にフレーム番号を渡すと、時間方向にも重ならないよう位相がずれる
float interleavedGradientNoise( vec2 pixel, float frameIndex ) {

	vec2 p = pixel + frameIndex * 5.588238;

	return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );

}
\r
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
}`})))()}var yj=n({Finalize:()=>bj}),bj;function xj(){return(xj=t((()=>{P(),vj(),bj=class extends j{constructor(e){super(e);let t=this.entity.getComponent(vn);t||=this.entity.addComponent(vn);let n={name:`finalize`,frag:_j};t.add(n),this.once(`dispose`,()=>{t.remove(n)})}}})))()}var Sj=n({CameraOrbitAnim:()=>Cj}),Cj;function wj(){return(wj=t((()=>{k(),P(),Cj=class extends j{time;radius;heightAmp;speed;baseHeight;constructor(e){super(e),this.time=0,this.radius=6,this.heightAmp=2,this.speed=.3,this.baseHeight=1.5,this.field(`radius`,()=>this.radius,e=>this.radius=e),this.field(`heightAmp`,()=>this.heightAmp,e=>this.heightAmp=e),this.field(`speed`,()=>this.speed,e=>this.speed=e),this.field(`baseHeight`,()=>this.baseHeight,e=>this.baseHeight=e)}updateImpl(e){this.time+=e.timeDelta;let t=this.time*this.speed,n=Math.cos(t)*this.radius,r=Math.sin(t)*this.radius,i=this.baseHeight+Math.sin(t*1.7)*this.heightAmp;this.entity.position.set(n,i,r),this.entity.lookAt(new D(0,0,0))}}})))()}var Tj=n({ShakeViewer:()=>Ej}),Ej;function Dj(){return(Dj=t((()=>{k(),P(),Ej=class extends j{shakePower;shakeSpeed;shakeMatrix;cameraMatrixWorld;shakeQua;constructor(e){super(e),this.shakePower=.15,this.shakeSpeed=1,this.shakeMatrix=new O,this.cameraMatrixWorld=new O,this.shakeQua=new Oe,this.order=1e3,this.field(`power`,()=>this.shakePower,e=>this.shakePower=e),this.field(`speed`,()=>this.shakeSpeed,e=>this.shakeSpeed=e)}prepareRenderImpl(e){let t=this.entity.getComponentsByTag(`camera`)[0];if(!t)return;let n=.008*this.shakePower;n*=t.fov/50;let r=e.timeElapsed*this.shakeSpeed;this.shakeQua.setFromEuler({x:Math.sin(r*2)*n,y:Math.sin(r*2.5)*n,z:0}),this.shakeMatrix.identity().applyQuaternion(this.shakeQua),this.cameraMatrixWorld.copy(this.entity.matrixWorld).multiply(this.shakeMatrix),t.viewMatrix.copy(this.cameraMatrixWorld).inverse()}}})))()}var Oj=n({ObjectRotate:()=>kj}),kj;function Aj(){return(Aj=t((()=>{k(),P(),kj=class extends j{speed;rotQuaternion;constructor(e){super(e),this.speed=1,this.rotQuaternion=new Oe}updateImpl(e){this.rotQuaternion.setFromEuler(new Ee(0,-.4*e.timeDelta*this.speed,0)),this.entity.quaternion.multiply(this.rotQuaternion)}}})))()}var jj=n({BLidgeClient:()=>Mj}),Mj;function Nj(){return(Nj=t((()=>{P(),Ui(),Mj=class e extends j{blidge;type;blidgeRoot;entities;attachments;_attachmentsApplied;_unresolvedByEntity;static sceneData=null;connection;useGLTF;gltfPath;constructor(t){super(t),this.entities=new Map,this.attachments=[],this._attachmentsApplied=!1,this._unresolvedByEntity=new Map,this.type=`websocket`,this.connection={enabled:!0,url:`ws://localhost:3100`},this.useGLTF=!1,this.gltfPath=`/scene.glb`,this.blidgeRoot=null,this.blidge=new St(this.engine);let n=this.onSyncScene.bind(this),r=this.engine,i=e=>{r.emit(`update/blidge/frame`,[e])};this.blidge.on(`sync/scene`,n),this.blidge.on(`sync/timeline`,i),this.once(`dispose`,()=>{this.blidge.off(`sync/scene`,n),this.blidge.off(`sync/timeline`,i)});let a=async()=>{if(this.type==`json`){let t=e.sceneData;if(!t){let e=await fetch(`/blidge-scene.json`);if(!e.ok){console.warn(`BLidgeClient: failed to load /blidge-scene.json (${e.status})`);return}t=await e.json()}await this.blidge.loadScene(t,this.useGLTF?this.gltfPath:void 0),this.emit(`loaded`)}else this.blidge.connect(this.connection.url,this.useGLTF?this.gltfPath:void 0)};this.field(`mode`,()=>this.type,e=>{this.type=e,a()},{format:{type:`select`,list:[`websocket`,`json`]}}),this.field(`gltf`,()=>this.useGLTF,e=>{this.useGLTF=e,a()}),this.field(`gltfPath`,()=>this.gltfPath,e=>{this.gltfPath=e,a()});let o=this.fieldDir(`websocket`,{hidden:()=>this.type!=`websocket`});o.field(`reconnect`,()=>()=>a(),void 0,{label:`Reconnect`}),o.field(`url`,()=>this.connection.url,e=>this.connection.url=e),this.field(`attachments`,()=>!this.blidgeRoot||!this._attachmentsApplied?this.attachments:this.serializeAttachments(),e=>{this.attachments=e||[],this._attachmentsApplied=!1,this._unresolvedByEntity.clear()},{hidden:!0})}serializeAttachments(){if(!this.blidgeRoot)return[];let e={getName:e=>F.resources.getComponentName(e)},t=[];return this.blidgeRoot.traverse(n=>{let r=[];n.components.forEach(t=>{if(t.initiator!==`user`)return;let n=t.serialize({mode:`export`}),i=Object.keys(n).length>0,a={name:e.getName(t),uuid:t.uuid};i&&(a.props=n),r.push(a)});let i=this._unresolvedByEntity.get(n.name);i&&r.push(...i),r.length>0&&t.push({name:n.name,components:r})}),t}applyAttachments(e){if(this._unresolvedByEntity.clear(),!this.attachments.length)return;let t=new Map;this.attachments.forEach(e=>t.set(e.name,e)),e.traverse(e=>{let n=t.get(e.name);n&&n.components.forEach(t=>{let n=F.resources.getComponent(t.name);if(n){e.removeComponent(n.component);let r=e.addComponent(n.component);r.initiator=`user`,r.restoreUUID(t.uuid),t.props&&r.deserialize(t.props)}else{console.warn(`[BLidgeClient] unresolved attachment component "${t.name}" on entity "${e.name}". Preserving data for round-trip.`);let n=this._unresolvedByEntity.get(e.name)||[];n.push({name:t.name,uuid:t.uuid,props:t.props}),this._unresolvedByEntity.set(e.name,n)}})})}async onSyncScene(e){this._attachmentsApplied=!1;let t=new Date().getTime(),n=r=>{let i=this.entities.get(r.name);if(i||(i=this.engine.createEntity(),i.restoreUUID(`blidge:`+r.name)),r.type==`camera`){let e=r.param;i.userData.cameraParam=e}return i.removeComponent(Kt),i.addComponent(Kt,{blidge:e,node:r}),r.children.forEach(e=>{let t=n(e);i.add(t)}),this.entities.set(i.name,i),i.userData.updateTime=t,i},r=e.root&&n(e.root);r&&(r.name=`blidgeRoot`,this.blidgeRoot&&this.entity&&this.entity.remove(this.blidgeRoot),this.blidgeRoot=r,this.entity&&this.entity.add(this.blidgeRoot)),this.entities.forEach(e=>{if(e.userData.updateTime!=t){let t=e.parent;t&&t.remove(e),e.dispose(),this.entities.delete(e.name)}}),e.gltf&&await e.gltfPrm,this.blidgeRoot&&(this.applyAttachments(this.blidgeRoot),this._attachmentsApplied=!0),this.entity&&this.entity.noticeEventChilds(`sceneCreated`,[this.blidgeRoot])}dispose(){super.dispose(),this.blidgeRoot&&=(this.blidgeRoot.disposeRecursive(),this.entity.remove(this.blidgeRoot),null),this._attachmentsApplied=!1,this._unresolvedByEntity.clear()}}})))()}var Pj,Fj,Ij,Lj;function Rj(){return(Rj=t((()=>{k(),Pj=1e-9,Fj=(e,t,n,r,i)=>e===`layout`?r===void 0?t:r:e===`center`?Math.hypot(n[0],n[1],n[2]):e===`x`?n[0]:e===`y`?n[1]:e===`z`?n[2]:e===`random`?i:t,Ij=(e,t,n)=>{let r=e.count(t),i=Ae.randomSeed(n.seed+1),a=[],o=[],s=Ae.randomSeed(n.seed);for(let c=0;c<r;c++){let l=e.place(c,r,t);a.push(Fj(n.order,c,l.position,l.order,i()));let u=[];for(let e=0;e<3;e++){let t=s();u.push(l.position[e]+(t*2-1)*n.jitterPosition[e])}let d=[0,0,0];l.rotation&&(d=l.rotation);let f=[];for(let e=0;e<3;e++){let t=s();f.push(d[e]+(t*2-1)*n.jitterRotation[e])}let p=[1,1,1];l.scale&&(p=l.scale);let m=1+(s()*2-1)*n.jitterScale,h=[];for(let e=0;e<3;e++)h.push(p[e]*m);o.push({position:u,rotation:f,scale:h,delay:0})}let c=1/0,l=-1/0;for(let e of a)c=Math.min(c,e),l=Math.max(l,e);let u=l-c;for(let e=0;e<o.length;e++){let t=0;u>=Pj&&(t=(a[e]-c)/u),o[e].delay=t*n.spread}return o},Lj=(e,t,n)=>{let r=e-t;return n===null||n<=0?r:(r%n+n)%n}})))()}var zj;function Bj(){return(Bj=t((()=>{P(),Rj(),zj=class extends Xt{delayFrames;loopFrames;constructor(e){super(e),this.delayFrames=0,this.loopFrames=null}shiftEvent_(e){let t=Lj(e.timeCodeFrame,this.delayFrames,this.loopFrames);return{...e,timeCodeFrame:t,timeCode:t/60}}update(e){super.update(this.shiftEvent_(e))}postUpdate(e){super.postUpdate(this.shiftEvent_(e))}prepareRender(e){super.prepareRender(this.shiftEvent_(e))}commitFrame(e){super.commitFrame(this.shiftEvent_(e))}}})))()}var Vj,Hj;function Uj(){return(Uj=t((()=>{Vj=`ClonerLayouts`,Hj=`Grid`})))()}var Wj=n({Cloner:()=>Xj}),Gj,Kj,qj,Jj,Yj,Xj;function Zj(){return(Zj=t((()=>{P(),Ui(),ls(),Bj(),Uj(),Rj(),Gj=[`layout`,`index`,`center`,`x`,`y`,`z`,`random`],Kj=e=>{let t=[];for(let n of e)t.push(n);return t},qj=e=>Array.isArray(e)?Kj(e):e,Jj=e=>{let t=[];for(let n of e.children)n.initiator===`user`&&t.push(n);return t},Yj=(e,t)=>{if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n].uuid!==t[n].uuid)return!1;return!0},Xj=class extends j{layoutName_;paramValues_;trailingFieldPaths_;order_;spread_;loop_;jitterPosition_;jitterRotation_;jitterScale_;seed_;slots_;templates_;counterparts_;listeners_;rebuildRequested_;placementDirty_;builtHidden_;onEntityUpdate_;onSelfUpdate_;constructor(e){super(e),this.layoutName_=Hj,this.paramValues_=new Map,this.trailingFieldPaths_=[],this.order_=`layout`,this.spread_=0,this.loop_=!0,this.jitterPosition_=[0,0,0],this.jitterRotation_=[0,0,0],this.jitterScale_=0,this.seed_=0,this.slots_=[],this.templates_=[],this.counterparts_=new Map,this.listeners_=[],this.rebuildRequested_=!0,this.placementDirty_=!1,this.builtHidden_=!1,this.field(`layout`,()=>this.layoutName_,e=>this.setLayout_(e),{format:{type:`select`,list:()=>F.resources.getLibraryItemNames(Vj)}}),this.applyTrailingFields_(),this.onEntityUpdate_=e=>{e.indexOf(`children`)!==-1&&(Yj(Jj(this.entity),this.templates_)||(this.rebuildRequested_=!0))},this.onSelfUpdate_=e=>{e.indexOf(`enabled`)!==-1&&(this.enabled?this.rebuildRequested_=!0:this.teardown_())},this.entity.on(`fields/update`,this.onEntityUpdate_),this.on(`fields/update`,this.onSelfUpdate_)}setLayout_(e){this.layoutName_=e,this.applyTrailingFields_(),this.rebuildRequested_=!0}applyTrailingFields_(){for(let e of this.trailingFieldPaths_)this.removeField(e);this.trailingFieldPaths_=[],this.applyParamFields_(),this.applySettingFields_()}addTrailingField_(e,t,n,r){this.field(e,t,n,r),this.trailingFieldPaths_.push(e)}applyParamFields_(){let e=F.resources.getLibraryItem(Vj,this.layoutName_);if(!e)return;let t=this.paramValues_.get(this.layoutName_);if(!t){t={};for(let n of Object.keys(e.params))t[n]=qj(e.params[n]);this.paramValues_.set(this.layoutName_,t)}let n=t;for(let t of Object.keys(e.params)){let r={};e.paramOptions&&e.paramOptions[t]&&(r={...e.paramOptions[t]}),Array.isArray(e.params[t])&&(r.format={type:`vector`}),this.addTrailingField_(`params/${t}`,()=>qj(n[t]),e=>{n[t]=qj(e),this.placementDirty_=!0},r)}}applySettingFields_(){this.addTrailingField_(`delay/order`,()=>this.order_,e=>{this.order_=e,this.placementDirty_=!0},{format:{type:`select`,list:Gj}}),this.addTrailingField_(`delay/spread`,()=>this.spread_,e=>{this.spread_=e,this.placementDirty_=!0}),this.addTrailingField_(`delay/loop`,()=>this.loop_,e=>{this.loop_=e,this.placementDirty_=!0}),this.addTrailingField_(`jitter/position`,()=>Kj(this.jitterPosition_),e=>{this.jitterPosition_=Kj(e),this.placementDirty_=!0},{format:{type:`vector`}}),this.addTrailingField_(`jitter/rotation`,()=>Kj(this.jitterRotation_),e=>{this.jitterRotation_=Kj(e),this.placementDirty_=!0},{format:{type:`vector`}}),this.addTrailingField_(`jitter/scale`,()=>this.jitterScale_,e=>{this.jitterScale_=e,this.placementDirty_=!0}),this.addTrailingField_(`jitter/seed`,()=>this.seed_,e=>{this.seed_=e,this.placementDirty_=!0},{int:!0,min:0,step:1})}updateImpl(e){this.entity.isRenderHiddenTraverse()!==this.builtHidden_&&(this.rebuildRequested_=!0),this.rebuildRequested_?(this.rebuildRequested_=!1,this.placementDirty_=!1,this.rebuild_()):this.placementDirty_&&(this.placementDirty_=!1,this.updatePlacement_());let t=null;this.loop_&&(t=this.engine.frameSetting.duration);for(let e of this.slots_)e.loopFrames=t}computeSpecs_(){let e=F.resources.getLibraryItem(Vj,this.layoutName_);if(!e)return null;this.paramValues_.has(this.layoutName_)||this.applyTrailingFields_();let t=this.paramValues_.get(this.layoutName_);if(!t)return null;let n={order:this.order_,spread:this.spread_,jitterPosition:this.jitterPosition_,jitterRotation:this.jitterRotation_,jitterScale:this.jitterScale_,seed:this.seed_};return Ij(e,t,n)}rebuild_(){if(this.teardown_(),this.templates_=Jj(this.entity),this.builtHidden_=this.entity.isRenderHiddenTraverse(),this.builtHidden_)return;let e=this.computeSpecs_();if(!e){console.warn(`[Cloner] layout "${this.layoutName_}" not found`);return}for(let e of this.templates_)e.renderHidden=!0;for(let t=0;t<e.length;t++){let n=new zj({engine:this.engine,name:`${this.entity.name}#${t}`});n.editorHidden=!0,this.applySpec_(n,e[t]),this.entity.add(n);for(let e of this.templates_){let t=nn(this.engine,e);this.linkCounterparts_(e,t),n.add(t)}this.slots_.push(n)}this.subscribeTemplates_()}teardown_(){for(let e of this.slots_)e.disposeRecursive();this.slots_=[];for(let e of this.listeners_)e.target.off(`fields/update`,e.listener);this.listeners_=[],this.counterparts_.clear();for(let e of this.templates_)e.renderHidden=!1}applySpec_(e,t){e.position.setFromArray(t.position),e.euler.setFromArray(t.rotation),e.scale.setFromArray(t.scale),e.delayFrames=t.delay*60}updatePlacement_(){let e=this.computeSpecs_();if(!e||e.length!==this.slots_.length){this.rebuild_();return}for(let t=0;t<e.length;t++)this.applySpec_(this.slots_[t],e[t])}addCounterpart_(e,t){let n=this.counterparts_.get(e);n||(n=[],this.counterparts_.set(e,n)),n.push(t)}linkCounterparts_(e,t){t.cloneSource=e,this.addCounterpart_(e,t);for(let n of e.components.values()){if(n.initiator!==`user`)continue;let e=t.getComponent(n.constructor);e&&this.addCounterpart_(n,e)}let n=Jj(e),r=Jj(t);for(let e=0;e<n.length&&!(e>=r.length);e++)this.linkCounterparts_(n[e],r[e])}listen_(e,t){e.on(`fields/update`,t),this.listeners_.push({target:e,listener:t})}subscribeTemplates_(){for(let e of this.templates_)this.subscribeEntity_(e)}subscribeEntity_(e){this.listen_(e,t=>this.onTemplateUpdate_(e,e,t));for(let t of e.components.values())t.initiator===`user`&&this.listen_(t,n=>this.onTemplateUpdate_(e,t,n));for(let t of Jj(e))this.subscribeEntity_(t)}onTemplateUpdate_(e,t,n){for(let r of n){if(t===e&&(r===`children`||r===`components`)){this.rebuildRequested_=!0;continue}if(this.isAnimated_(e,t,r))continue;let n=t.getField(r);if(n===void 0||typeof n==`function`)continue;let i=this.counterparts_.get(t);if(i)for(let e of i)e.getFieldOpt(r)!==void 0&&e.setField(r,n)}}isAnimated_(e,t,n){let r=e.getComponent(cs);if(!r)return!1;let i=r.getField(`links`);if(!i)return!1;let a=n;return t!==e&&(a=`${F.resources.getComponentName(t)}:${n}`),Object.prototype.hasOwnProperty.call(i,a)}dispose(){super.dispose(),this.teardown_(),this.entity.off(`fields/update`,this.onEntityUpdate_),this.off(`fields/update`,this.onSelfUpdate_)}}})))()}var Qj=n({Cube:()=>$j}),$j;function eM(){return(eM=t((()=>{P(),$j=class extends At{}})))()}var tM=n({Cylinder:()=>nM}),nM;function rM(){return(rM=t((()=>{P(),nM=class extends Mt{}})))()}var iM=n({Plane:()=>aM}),aM;function oM(){return(oM=t((()=>{P(),aM=class extends Pt{}})))()}var sM=n({Sphere:()=>cM}),cM;function lM(){return(lM=t((()=>{P(),cM=class extends It{}})))()}var uM=n({default:()=>dM}),dM;function fM(){return(fM=t((()=>{dM={params:{count:12,radius:1,arc:360},paramOptions:{count:{int:!0,min:0,step:1}},count(e){return e.count},place(e,t,n){let r=n.radius,i=n.arc,a=i*Math.PI/180,o=0;i>=360?o=Math.PI*2/t:t>=2&&(o=a/(t-1));let s=e*o;return{position:[Math.cos(s)*r,0,-Math.sin(s)*r],rotation:[0,s,0],order:e/t}}}})))()}var pM=n({default:()=>mM}),mM;function hM(){return(hM=t((()=>{mM={params:{count:[3,3,3],spacing:[1,1,1]},paramOptions:{count:{int:!0,min:1,step:1}},count(e){let t=e.count,n=t[0],r=t[1],i=t[2];return n*r*i},place(e,t,n){let r=n.count,i=n.spacing,a=r[0],o=r[1],s=r[2],c=e%a,l=Math.floor(e/a)%o,u=Math.floor(e/(a*o));return{position:[(c-(a-1)/2)*i[0],(l-(o-1)/2)*i[1],(u-(s-1)/2)*i[2]]}}}})))()}var gM=n({default:()=>_M}),_M;function vM(){return(vM=t((()=>{_M={params:{count:10,length:4,direction:[1,0,0]},paramOptions:{count:{int:!0,min:0,step:1}},count(e){return e.count},place(e,t,n){let r=n.length,i=n.direction,a=1,o=0,s=0,c=Math.sqrt(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]);c>0&&(a=i[0]/c,o=i[1]/c,s=i[2]/c);let l=.5;t>=2&&(l=e/(t-1));let u=(l-.5)*r;return{position:[a*u,o*u,s*u]}}}})))()}var yM=n({default:()=>xM}),bM,xM;function SM(){return(SM=t((()=>{bM=(e,t)=>{let n=e*7919+t*104729>>>0;return()=>{n=n+1831565813>>>0;let e=Math.imul(n^n>>>15,n|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}},xM={params:{count:32,size:[2,2,2],seed:0},paramOptions:{count:{int:!0,min:0,step:1},seed:{int:!0,min:0,step:1}},count(e){return e.count},place(e,t,n){let r=n.size,i=bM(n.seed,e);return{position:[(i()-.5)*r[0],(i()-.5)*r[1],(i()-.5)*r[2]]}}}})))()}var CM=n({default:()=>wM}),wM;function TM(){return(TM=t((()=>{wM={params:{count:64,radius:1},paramOptions:{count:{int:!0,min:0,step:1}},count(e){return e.count},place(e,t,n){let r=n.radius,i=1-2*(e+.5)/t,a=Math.sqrt(1-i*i),o=e*Math.PI*(3-Math.sqrt(5));return{position:[Math.cos(o)*a*r,i*r,Math.sin(o)*a*r],order:e/t}}}})))()}var EM,DM,OM;function kM(){return(kM=t((()=>{wj(),Dj(),Xl(),$l(),Aj(),ls(),Nj(),Zj(),eM(),rM(),oM(),lM(),fM(),hM(),vM(),SM(),TM(),Ni(),ji(),EM=Mi(Object.assign({"./Components/Camera/CameraOrbitAnim/index.ts":Sj,"./Components/Camera/CameraShake/index.ts":Tj,"./Components/Camera/LookAt/index.ts":Jl,"./Components/Camera/OrbitControls/index.ts":Zl,"./Components/Object/ObjectRotate/index.ts":Oj,"./Components/Utility/Animation/index.ts":os,"./Components/Utility/BLidgeClient/index.ts":jj,"./Components/Utility/Cloner/index.ts":Wj}),`Components`),DM=Mi(Object.assign({"./Geometries/Cube/index.ts":Qj,"./Geometries/Cylinder/index.ts":tM,"./Geometries/Plane/index.ts":iM,"./Geometries/Sphere/index.ts":sM}),`Geometries`),OM=Ai(Object.assign({"./Library/ClonerLayouts/Circle/index.ts":uM,"./Library/ClonerLayouts/Grid/index.ts":pM,"./Library/ClonerLayouts/Line/index.ts":gM,"./Library/ClonerLayouts/Random/index.ts":yM,"./Library/ClonerLayouts/Sphere/index.ts":CM}))})))()}var AM;function jM(){return(jM=t((()=>{AM=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
} `})))()}var MM;function NM(){return(NM=t((()=>{jM(),MM={name:`hash`,resolution:[512,512],filter:`nearest`,updateEveryFrame:!1,frag:AM}})))()}var PM;function FM(){return(FM=t((()=>{PM=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
// IS_PREPASS は不透明の forward が gBuffer の段で位置・法線・速度だけを書くパス（IS_FORWARD と一緒に define される）。\r
// 位置は gBuffer の並びの 0 / 1 / 4 番に合わせる\r
#ifdef IS_PREPASS\r
	layout (location = 0) out vec4 outColor0;\r
	layout (location = 1) out vec4 outColor1;\r
	layout (location = 4) out vec4 outColor4;\r
#elif defined(IS_FORWARD) || defined(IS_DEPTH)\r
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
} `})))()}var IM;function LM(){return(LM=t((()=>{FM(),IM={name:`noise`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!0,frag:PM}})))()}var RM;function zM(){return(zM=t((()=>{RM=`#define PI 3.14159265359\r
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
// 表面からカメラへ向かう単位ベクトル。\r
// 並行投影（projectionMatrix[3][3] が 1。透視投影では 0）は視線が平行なので、位置によらずカメラの +Z 軸になる\r
vec3 viewDirection( vec3 pos, vec3 cameraPosition, mat4 viewMatrix, mat4 projectionMatrix ) {\r
\r
	return normalize( mix( cameraPosition - pos, vec3( 0.0, 0.0, 1.0 ) * mat3( viewMatrix ), projectionMatrix[ 3 ][ 3 ] ) );\r
\r
}\r
\r
// gBuffer の position が空・背景か。何も描かれていない画素は 0 のまま、空（Sky）はカメラ中心の半径 far * 0.99 の球。\r
// 球は 32 分割の多面体なので面の中ほどは半径より少し内側に来る（約 0.984 * far）。余裕を見て 0.95 で切る。\r
// webgpu 側 view.wgsl の isBackground と同じ判定\r
bool isBackground( vec3 pos, vec3 cameraPosition, float cameraFar ) {\r
\r
	return dot( pos, pos ) == 0.0 || length( pos - cameraPosition ) > cameraFar * 0.95;\r
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
} `})))()}var BM;function VM(){return(VM=t((()=>{zM(),BM={name:`noiseCyclic`,resolution:[1024,1024],filter:`linear`,updateEveryFrame:!1,frag:RM}})))()}var HM;function UM(){return(UM=t((()=>{zM(),HM={name:`noiseCyclicAnime`,resolution:[512,512],filter:`linear`,updateEveryFrame:!0,frag:RM}})))()}var WM,GM,KM;function qM(){return(qM=t((()=>{NM(),LM(),VM(),UM(),Ui(),WM=Object.assign({"/demo-webgl/Resources/Textures/hash.tex":MM,"/demo-webgl/Resources/Textures/noise.tex":IM,"/demo-webgl/Resources/Textures/noiseCyclic.tex":BM,"/demo-webgl/Resources/Textures/noiseCyclicAnime.tex":HM}),GM=()=>{for(let e of Object.values(WM))e&&F.resources.addTextureResource(e.name,{frag:e.frag,resolution:e.resolution||[1024,1024],filter:e.filter,updateEveryFrame:e.updateEveryFrame,textures:e.textures})},KM=e=>{F.resources.buildTextureInstances(e.renderer)}})))()}var JM,YM,XM,ZM,QM,$M;function eN(){return(eN=t((()=>{iA(),dA(),gA(),CA(),AA(),LA(),BA(),qA(),ej(),sj(),gj(),xj(),Ku(),Ui(),kM(),qM(),JM=Object.assign({"/demo-webgl/Resources/Components/Samples/Effects/EyeRings/index.ts":nA,"/demo-webgl/Resources/Components/Samples/Effects/FlashLine/index.ts":lA,"/demo-webgl/Resources/Components/Samples/Environment/SkyBox/index.ts":mA,"/demo-webgl/Resources/Components/Samples/Geometry/GridCross/index.ts":xA,"/demo-webgl/Resources/Components/Samples/Geometry/GridDots/index.ts":OA,"/demo-webgl/Resources/Components/Samples/Geometry/WireCube/index.ts":FA,"/demo-webgl/Resources/Components/Samples/Objects/FieldUISample/index.ts":RA,"/demo-webgl/Resources/Components/Samples/Objects/OREngineCube/index.ts":GA,"/demo-webgl/Resources/Components/Samples/Objects/OREngineLogo/index.ts":QA,"/demo-webgl/Resources/Components/Samples/Particles/Dust/index.ts":aj,"/demo-webgl/Resources/Components/Samples/Particles/YakiSoba/index.ts":mj,"/demo-webgl/Resources/Components/Samples/PostProcess/Finalize/index.ts":yj}),YM=Object.assign({}),XM=Object.assign({}),ZM=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];if(typeof a==`function`)t.addComponent(i,a);else{let e=t.createGroup(i);ZM(a,e)}}},QM=(e,t)=>{let n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],a=e[i];if(typeof a==`function`)t.addGeometry(i,a);else{let e=t.createGroup(i);QM(a,e)}}},$M=()=>{St.gltfLoaderFactory=e=>new Ru(e),F.resources.clear();let e=F.resources.addComponentGroup(`_Built-in`);e.addComponent(`Light`,Ht),e.addComponent(`Camera`,Rt),e.addComponent(`Mesh`,M);let t=Object.keys(EM);for(let e=0;e<t.length;e++){let n=t[e],r=EM[n],i=F.resources.addComponentGroup(n);ZM(r,i)}let n=Object.keys(DM);for(let e=0;e<n.length;e++){let t=n[e],r=DM[t],i=F.resources.addGeometryGroup(t);QM(r,i)}let r=new Set;for(let{kind:e,name:t,item:n}of OM)F.resources.addLibraryItem(e,t,n),r.add(`${e}/${t}`);for(let{kind:e,name:t,item:n}of Ai(XM))r.has(`${e}/${t}`)&&console.warn(`[Resources] library "${e}/${t}" overrides the built-in one`),F.resources.addLibraryItem(e,t,n);let i=Mi(JM,`Components`),a=Object.keys(i);for(let e=0;e<a.length;e++){let t=a[e],n=i[t],r=F.resources.addComponentGroup(t);ZM(n,r)}let o=Mi(YM,`Geometries`),s=Object.keys(o);for(let e=0;e<s.length;e++){let t=s[e],n=o[t],r=F.resources.addGeometryGroup(t);QM(n,r)}GM()}})))()}var tN,nN,rN,iN,aN,oN;function sN(){return(sN=t((()=>{tN=i(),Zk(),E(),eN(),nN=o(),$M(),rN=({setup:e})=>{let{editor:t}=I();return(0,tN.useEffect)(()=>{let n=t.engine,r=()=>e(t);return n.on(`loaded`,r),()=>{n.off(`loaded`,r)}},[t,e]),null},iN=e=>(0,nN.jsx)(Sk,{project:e.fixture.scene,onEngineInit:KM,children:(0,nN.jsx)(uk,{projectName:`storybook`,editorData:e.fixture.editorData,scenes:e.fixture.scenes,children:(0,nN.jsx)(ee,{children:(0,nN.jsxs)(re,{children:[e.children,e.fixture.setup&&(0,nN.jsx)(rN,{setup:e.fixture.setup}),(0,nN.jsx)(S,{}),(0,nN.jsx)(ne,{})]})})})}),aN=e=>t=>(0,nN.jsx)(iN,{fixture:e,children:(0,nN.jsx)(t,{})}),oN=e=>t=>(0,nN.jsx)(Sk,{project:e,onEngineInit:KM,children:(0,nN.jsx)(t,{})}),iN.__docgenInfo={description:``,methods:[],displayName:`OREditorFixtureHost`}})))()}var cN,lN,uN,dN,fN;function pN(){return(pN=t((()=>{cN={name:`Camera`,uuid:`sb-camera`,pos:[0,2,12],components:[{name:`Camera`,uuid:`sb-camera-lens`},{name:`LookAt`,uuid:`sb-camera-lookat`}]},lN={name:`storybook`,scene:{name:`root`,uuid:`0`,childs:[cN,{name:`OREngineCube`,uuid:`sb-cube`,components:[{name:`OREngineCube`,uuid:`sb-cube-body`}]},{name:`OREngineLogo`,uuid:`sb-logo`,components:[{name:`OREngineLogo`,uuid:`sb-logo-body`}]}]},"timeline/duration":600,"timeline/fps":60},uN={...lN,scene:{name:`root`,uuid:`0`,childs:[cN]}},dN={enableRender:!0,"viewports/main/resolutionScale":.5,"resolution/width":1920,"resolution/height":1080,viewType:`render`,"frameLoop/enabled":!1,"frameLoop/start":0,"frameLoop/end":0,cameraMode:`preview`,gizmoMode:`translate`},fN={scene:lN,editorData:dN}})))()}export{Oa as A,L as B,fx as C,Ob as D,Db as E,ua as F,Ui as H,ea as I,ta as L,fa as M,pa as N,lb as O,la as P,Xi as R,dx as S,ix as T,F as U,I as V,Li as W,Bw as _,lN as a,TS as b,aN as c,Xk as d,hk as f,zw as g,tk as h,fN as i,ka as j,ub as k,oN as l,ek as m,dN as n,iN as o,gk as p,uN as r,sN as s,pN as t,Yk as u,Ow as v,rx as w,ES as x,kw as y,Zi as z};