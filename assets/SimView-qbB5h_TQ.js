import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./index-DS_PjEr0.js";var s=a(),c,l,u,d,f,p,m,h,g,_=1e3,v=1001,y=1002,b=1003,x=1004,S=1005,C=1006,w=1007,T=1008,E=1009,D=1010,O=1011,k=1012,A=1013,j=1014,M=1015,N=1016,ee=1017,P=1018,te=1020,ne=35902,re=35899,ie=1021,ae=1022,F=1023,oe=1026,se=1027,I=1028,ce=1029,le=1030,ue=1031,de=1033,fe=33776,pe=33777,me=33778,he=33779,ge=35840,_e=35841,ve=35842,ye=35843,be=36196,xe=37492,Se=37496,L=37488,Ce=37489,we=37490,Te=37491,Ee=37808,De=37809,Oe=37810,ke=37811,Ae=37812,je=37813,R=37814,Me=37815,Ne=37816,Pe=37817,z=37818,Fe=37819,B=37820,V=37821,Ie=36492,Le=36494,Re=36495,ze=36283,Be=36284,Ve=36285,He=36286,Ue=2300,We=2301,Ge=2302,Ke=2303,qe=2400,Je=2401,Ye=2402,Xe=3200,Ze=`srgb`,Qe=`srgb-linear`,$e=`linear`,et=`srgb`,tt=7680,nt=35044,rt=35048,it=2e3;function at(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function ot(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function st(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function ct(){let e=st(`canvas`);return e.style.display=`block`,e}var lt={};function ut(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function dt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=dt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=dt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function ft(...e){let t=e.join(` `);t in lt||(lt[t]=!0,H(...e))}function pt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var mt={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},ht=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},gt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),_t=Math.PI/180,vt=180/Math.PI;function yt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(gt[e&255]+gt[e>>8&255]+gt[e>>16&255]+gt[e>>24&255]+`-`+gt[t&255]+gt[t>>8&255]+`-`+gt[t>>16&15|64]+gt[t>>24&255]+`-`+gt[n&63|128]+gt[n>>8&255]+`-`+gt[n>>16&255]+gt[n>>24&255]+gt[r&255]+gt[r>>8&255]+gt[r>>16&255]+gt[r>>24&255]).toLowerCase()}function W(e,t,n){return Math.max(t,Math.min(n,e))}function bt(e,t){return(e%t+t)%t}function xt(e,t,n){return(1-n)*e+n*t}function St(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ct(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function wt(e,t){if(t.constructor===Float32Array)return e;let n=Ct(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Tt(e,t){if(t.constructor===Float32Array)return e;let n=Ct(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}m=Symbol.iterator;var G=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[m](){yield this.x,yield this.y}};c=G,c.prototype.isVector2=!0;var Et=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(W(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};h=Symbol.iterator;var K=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ot.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ot.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dt.copy(this).projectOnVector(e),this.sub(Dt)}reflect(e){return this.sub(Dt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[h](){yield this.x,yield this.y,yield this.z}};l=K,l.prototype.isVector3=!0;var Dt=new K,Ot=new Et,q=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return ft(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(kt.makeScale(e,t)),this}rotate(e){return ft(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(kt.makeRotation(-e)),this}translate(e,t){return ft(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(kt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};u=q,u.prototype.isMatrix3=!0;var kt=new q,At=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jt=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mt(){let e={enabled:!0,workingColorSpace:Qe,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Pt(e.r),e.g=Pt(e.g),e.b=Pt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ft(e.r),e.g=Ft(e.g),e.b=Ft(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?$e:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Qe]:{primaries:t,whitePoint:r,transfer:$e,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:t,whitePoint:r,transfer:et,toXYZ:At,fromXYZ:jt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}}),e}var Nt=Mt();function Pt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ft(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var It,Lt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{It===void 0&&(It=st(`canvas`)),It.width=e.width,It.height=e.height;let t=It.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=It}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=st(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Pt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Pt(t[e]/255)*255):t[e]=Pt(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Rt=0,zt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Rt++}),this.uuid=yt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Bt(r[t].image)):e.push(Bt(r[t]))}else e=Bt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Bt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Lt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var Vt=0,Ht=new K,Ut=class e extends ht{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=v,i=v,a=C,o=T,s=F,c=E,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vt++}),this.uuid=yt(),this.name=``,this.source=new zt(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Ht).x}get height(){return this.source.getSize(Ht).y}get depth(){return this.source.getSize(Ht).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _:e.x-=Math.floor(e.x);break;case v:e.x=e.x<0?0:1;break;case y:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case _:e.y-=Math.floor(e.y);break;case v:e.y=e.y<0?0:1;break;case y:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ut.DEFAULT_IMAGE=null,Ut.DEFAULT_MAPPING=300,Ut.DEFAULT_ANISOTROPY=1,g=Symbol.iterator;var Wt=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this.w=W(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this.w=W(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[g](){yield this.x,yield this.y,yield this.z,yield this.w}};d=Wt,d.prototype.isVector4=!0;var Gt=class extends ht{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:C,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Wt(0,0,e,t),this.scissorTest=!1,this.viewport=new Wt(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new Ut({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:C,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new zt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Kt=class extends Gt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},qt=class extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=b,this.minFilter=b,this.wrapR=v,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Jt=class extends Ut{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=b,this.minFilter=b,this.wrapR=v,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Yt=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Xt.setFromMatrixColumn(e,0).length(),i=1/Xt.setFromMatrixColumn(e,1).length(),a=1/Xt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qt,e,$t)}lookAt(e,t,n){let r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),en.crossVectors(n,nn),en.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),en.crossVectors(n,nn)),en.normalize(),tn.crossVectors(nn,en),r[0]=en.x,r[4]=tn.x,r[8]=nn.x,r[1]=en.y,r[5]=tn.y,r[9]=nn.y,r[2]=en.z,r[6]=tn.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],P=r[11],te=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*M+c*te,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*M+f*te,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*M+g*te,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*M+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Xt.set(r[0],r[1],r[2]).length(),o=Xt.set(r[4],r[5],r[6]).length(),s=Xt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Zt.copy(this);let c=1/a,l=1/o,u=1/s;return Zt.elements[0]*=c,Zt.elements[1]*=c,Zt.elements[2]*=c,Zt.elements[4]*=l,Zt.elements[5]*=l,Zt.elements[6]*=l,Zt.elements[8]*=u,Zt.elements[9]*=u,Zt.elements[10]*=u,t.setFromRotationMatrix(Zt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=it,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=it,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};f=Yt,f.prototype.isMatrix4=!0;var Xt=new K,Zt=new Yt,Qt=new K(0,0,0),$t=new K(1,1,1),en=new K,tn=new K,nn=new K,rn=new Yt,an=new Et,on=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(W(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-W(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(W(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-W(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(W(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-W(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return an.setFromEuler(this),this.setFromQuaternion(an,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};on.DEFAULT_ORDER=`XYZ`;var sn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},cn=0,ln=new K,un=new Et,dn=new Yt,fn=new K,pn=new K,mn=new K,hn=new Et,gn=new K(1,0,0),_n=new K(0,1,0),vn=new K(0,0,1),yn={type:`added`},bn={type:`removed`},xn={type:`childadded`,child:null},Sn={type:`childremoved`,child:null},Cn=class e extends ht{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cn++}),this.uuid=yt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new on,r=new Et,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Yt},normalMatrix:{value:new q}}),this.matrix=new Yt,this.matrixWorld=new Yt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return un.setFromAxisAngle(e,t),this.quaternion.multiply(un),this}rotateOnWorldAxis(e,t){return un.setFromAxisAngle(e,t),this.quaternion.premultiply(un),this}rotateX(e){return this.rotateOnAxis(gn,e)}rotateY(e){return this.rotateOnAxis(_n,e)}rotateZ(e){return this.rotateOnAxis(vn,e)}translateOnAxis(e,t){return ln.copy(e).applyQuaternion(this.quaternion),this.position.add(ln.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gn,e)}translateY(e){return this.translateOnAxis(_n,e)}translateZ(e){return this.translateOnAxis(vn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?fn.copy(e):fn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),pn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(pn,fn,this.up):dn.lookAt(fn,pn,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),un.setFromRotationMatrix(dn),this.quaternion.premultiply(un.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bn),Sn.child=e,this.dispatchEvent(Sn),Sn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pn,e,mn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pn,hn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Cn.DEFAULT_UP=new K(0,1,0),Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=class extends Cn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Tn={type:`move`},En=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Dn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},kn={h:0,s:0,l:0};function An(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ze){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Nt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Nt.workingColorSpace){if(e=bt(e,1),t=W(t,0,1),n=W(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=An(i,r,e+1/3),this.g=An(i,r,e),this.b=An(i,r,e-1/3)}return Nt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ze){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ze){let n=Dn[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pt(e.r),this.g=Pt(e.g),this.b=Pt(e.b),this}copyLinearToSRGB(e){return this.r=Ft(e.r),this.g=Ft(e.g),this.b=Ft(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ze){return Nt.workingToColorSpace(jn.copy(this),e),Math.round(W(jn.r*255,0,255))*65536+Math.round(W(jn.g*255,0,255))*256+Math.round(W(jn.b*255,0,255))}getHexString(e=Ze){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Nt.workingColorSpace){Nt.workingToColorSpace(jn.copy(this),t);let n=jn.r,r=jn.g,i=jn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Nt.workingColorSpace){return Nt.workingToColorSpace(jn.copy(this),t),e.r=jn.r,e.g=jn.g,e.b=jn.b,e}getStyle(e=Ze){Nt.workingToColorSpace(jn.copy(this),e);let t=jn.r,n=jn.g,r=jn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(kn);let n=xt(On.h,kn.h,t),r=xt(On.s,kn.s,t),i=xt(On.l,kn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},jn=new J;J.NAMES=Dn;var Mn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new J(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Nn=class extends Cn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pn=new K,Fn=new K,In=new K,Ln=new K,Rn=new K,zn=new K,Bn=new K,Vn=new K,Hn=new K,Un=new K,Wn=new Wt,Gn=new Wt,Kn=new Wt,qn=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Pn.subVectors(e,t),r.cross(Pn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Pn.subVectors(r,t),Fn.subVectors(n,t),In.subVectors(e,t);let a=Pn.dot(Pn),o=Pn.dot(Fn),s=Pn.dot(In),c=Fn.dot(Fn),l=Fn.dot(In),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ln)!==null&&Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Ln)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Ln.x),s.addScaledVector(a,Ln.y),s.addScaledVector(o,Ln.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Wn.setScalar(0),Gn.setScalar(0),Kn.setScalar(0),Wn.fromBufferAttribute(e,t),Gn.fromBufferAttribute(e,n),Kn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Wn,i.x),a.addScaledVector(Gn,i.y),a.addScaledVector(Kn,i.z),a}static isFrontFacing(e,t,n,r){return Pn.subVectors(n,t),Fn.subVectors(e,t),Pn.cross(Fn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),Pn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Rn.subVectors(r,n),zn.subVectors(i,n),Vn.subVectors(e,n);let s=Rn.dot(Vn),c=zn.dot(Vn);if(s<=0&&c<=0)return t.copy(n);Hn.subVectors(e,r);let l=Rn.dot(Hn),u=zn.dot(Hn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Rn,a);Un.subVectors(e,i);let f=Rn.dot(Un),p=zn.dot(Un);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(zn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Bn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Bn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Rn,a).addScaledVector(zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jn=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Xn):Xn.fromBufferAttribute(r,t),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Zn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Zn.copy(e.boundingBox)),Zn.applyMatrix4(e.matrixWorld),this.union(Zn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),ar.subVectors(this.max,ir),Qn.subVectors(e.a,ir),$n.subVectors(e.b,ir),er.subVectors(e.c,ir),tr.subVectors($n,Qn),nr.subVectors(er,$n),rr.subVectors(Qn,er);let t=[0,-tr.z,tr.y,0,-nr.z,nr.y,0,-rr.z,rr.y,tr.z,0,-tr.x,nr.z,0,-nr.x,rr.z,0,-rr.x,-tr.y,tr.x,0,-nr.y,nr.x,0,-rr.y,rr.x,0];return!cr(t,Qn,$n,er,ar)||(t=[1,0,0,0,1,0,0,0,1],!cr(t,Qn,$n,er,ar))?!1:(or.crossVectors(tr,nr),t=[or.x,or.y,or.z],cr(t,Qn,$n,er,ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Yn=[new K,new K,new K,new K,new K,new K,new K,new K],Xn=new K,Zn=new Jn,Qn=new K,$n=new K,er=new K,tr=new K,nr=new K,rr=new K,ir=new K,ar=new K,or=new K,sr=new K;function cr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){sr.fromArray(e,a);let o=i.x*Math.abs(sr.x)+i.y*Math.abs(sr.y)+i.z*Math.abs(sr.z),s=t.dot(sr),c=n.dot(sr),l=r.dot(sr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var lr=new K,ur=new G,dr=0,fr=class extends ht{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=nt,this.updateRanges=[],this.gpuType=M,this.version=0,this._normalizationScale=e===void 0?void 0:Ct(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ur.fromBufferAttribute(this,t),ur.applyMatrix3(e),this.setXY(t,ur.x,ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix4(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyNormalMatrix(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.transformDirection(e),this.setXYZ(t,lr.x,lr.y,lr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?wt(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Tt(e,this.array):Math.round(e*t)}},pr=class extends fr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},mr=class extends fr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},hr=class extends fr{constructor(e,t,n){super(new Float32Array(e),t,n)}},gr=new Jn,_r=new K,vr=new K,yr=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?gr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_r.subVectors(e,this.center);let t=_r.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(_r,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_r.copy(e.center).add(vr)),this.expandByPoint(_r.copy(e.center).sub(vr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},br=0,xr=new Yt,Sr=new Cn,Cr=new K,wr=new Jn,Tr=new Jn,Er=new K,Dr=class e extends ht{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:br++}),this.uuid=yt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(at(e)?mr:pr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xr.makeRotationFromQuaternion(e),this.applyMatrix4(xr),this}rotateX(e){return xr.makeRotationX(e),this.applyMatrix4(xr),this}rotateY(e){return xr.makeRotationY(e),this.applyMatrix4(xr),this}rotateZ(e){return xr.makeRotationZ(e),this.applyMatrix4(xr),this}translate(e,t,n){return xr.makeTranslation(e,t,n),this.applyMatrix4(xr),this}scale(e,t,n){return xr.makeScale(e,t,n),this.applyMatrix4(xr),this}lookAt(e){return Sr.lookAt(e),Sr.updateMatrix(),this.applyMatrix4(Sr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new hr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Er.addVectors(this.boundingBox.min,wr.min),this.boundingBox.expandByPoint(Er),Er.addVectors(this.boundingBox.max,wr.max),this.boundingBox.expandByPoint(Er)):(this.boundingBox.expandByPoint(wr.min),this.boundingBox.expandByPoint(wr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);else if(e){let n=this.boundingSphere.center;if(wr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Tr.setFromBufferAttribute(n),this.morphTargetsRelative?(Er.addVectors(wr.min,Tr.min),wr.expandByPoint(Er),Er.addVectors(wr.max,Tr.max),wr.expandByPoint(Er)):(wr.expandByPoint(Tr.min),wr.expandByPoint(Tr.max))}wr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Er.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Er));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Er.fromBufferAttribute(a,t),o&&(Cr.fromBufferAttribute(e,t),Er.add(Cr)),r=Math.max(r,n.distanceToSquared(Er))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new fr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let l=new K,u=new K,d=new K,f=new G,p=new G,m=new G,h=new K,g=new K;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new K,b=new K,x=new K,S=new K;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new fr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Er.fromBufferAttribute(e,t),Er.normalize(),e.setXYZ(t,Er.x,Er.y,Er.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new fr(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Or=new K,kr=new K,Ar=new q,jr=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Or.subVectors(n,t).cross(kr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Or),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ar.getNormalMatrix(e),r=this.coplanarPoint(Or).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Mr=0,Nr=class extends ht{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Mr++}),this.uuid=yt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=tt,this.stencilZFail=tt,this.stencilZPass=tt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new jr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Pr=new K,Fr=new K,Ir=new K,Lr=new K,Rr=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pr.copy(this.origin).addScaledVector(this.direction,t),Pr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Fr.copy(e).add(t).multiplyScalar(.5),Ir.copy(t).sub(e).normalize(),Lr.copy(this.origin).sub(Fr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ir),o=Lr.dot(this.direction),s=-Lr.dot(Ir),c=Lr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Fr).addScaledVector(Ir,d),f}intersectSphere(e,t){if(e.radius<0)return null;Pr.subVectors(e.center,this.origin);let n=Pr.dot(this.direction),r=Pr.dot(Pr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Pr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,P=C/w,te=1/w,ne=T-ee*D,re=E-P*D,ie=O-ee*A,ae=k-P*A,F=j-ee*N,oe=M-P*N,se=F*ae-oe*ie,I=ne*oe-re*F,ce=ie*re-ae*ne;if(r){if(se<0||I<0||ce<0)return null}else if((se<0||I<0||ce<0)&&(se>0||I>0||ce>0))return null;let le=se+I+ce;if(le===0)return null;let ue=te*(se*D+I*A+ce*N);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},zr=class extends Nr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Br=new Yt,Vr=new Rr,Hr=new yr,Ur=new K,Wr=new K,Gr=new K,Kr=new K,qr=new K,Jr=new K,Yr=new K,Xr=new K,Zr=class extends Cn{constructor(e=new Dr,t=new zr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Jr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(qr.fromBufferAttribute(s,e),a?Jr.addScaledVector(qr,r):Jr.addScaledVector(qr.sub(t),r))}t.add(Jr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(i),Vr.copy(e.ray).recast(e.near),Hr.containsPoint(Vr.origin)===!1&&(Vr.intersectSphere(Hr,Ur)===null||Vr.origin.distanceToSquared(Ur)>(e.far-e.near)**2)||(Br.copy(i).invert(),Vr.copy(e.ray).applyMatrix4(Br),(n.boundingBox===null||Vr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Vr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=$r(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=$r(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=$r(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=$r(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Qr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Xr.copy(s),Xr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Xr);return l<n.near||l>n.far?null:{distance:l,point:Xr.clone(),object:e}}function $r(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Wr),e.getVertexPosition(c,Gr),e.getVertexPosition(l,Kr);let u=Qr(e,t,n,r,Wr,Gr,Kr,Yr);if(u){let e=new K;qn.getBarycoord(Yr,Wr,Gr,Kr,e),i&&(u.uv=qn.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=qn.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=qn.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};qn.getNormal(Wr,Gr,Kr,t.normal),u.face=t,u.barycoord=e}return u}var ei=class extends Ut{constructor(e=null,t=1,n=1,r,i,a,o,s,c=b,l=b,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ti=class extends fr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ni=new Yt,ri=new Yt,ii=[],ai=new Jn,oi=new Yt,si=new Zr,ci=new yr,li=class extends Zr{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ti(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,oi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ni),ai.copy(e.boundingBox).applyMatrix4(ni),this.boundingBox.union(ai)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ni),ci.copy(e.boundingSphere).applyMatrix4(ni),this.boundingSphere.union(ci)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(si.geometry=this.geometry,si.material=this.material,si.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ci.copy(this.boundingSphere),ci.applyMatrix4(n),e.ray.intersectsSphere(ci)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ni),ri.multiplyMatrices(n,ni),si.matrixWorld=ri,si.raycast(e,ii);for(let e=0,n=ii.length;e<n;e++){let n=ii[e];n.instanceId=i,n.object=this,t.push(n)}ii.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ti(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ei(new Float32Array(r*this.count),r,this.count,I,M));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ui=new yr,di=new G(.5,.5),fi=new K,pi=class{constructor(e=new jr,t=new jr,n=new jr,r=new jr,i=new jr,a=new jr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=it,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){return ui.center.set(0,0,0),ui.radius=.7071067811865476+di.distanceTo(e.center),ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(fi.x=r.normal.x>0?e.max.x:e.min.x,fi.y=r.normal.y>0?e.max.y:e.min.y,fi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},mi=new Yt,hi=class e{constructor(){this.coordinateSystem=it,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];mi.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new pi),n[e].setFromProjectionMatrix(mi,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new pi),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},gi=class extends Ut{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},_i=class extends Ut{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},vi=class extends Ut{constructor(e,t,n=j,r,i,a,o=b,s=b,c,l=oe,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},yi=class extends vi{constructor(e,t=j,n=301,r,i,a=b,o=b,s,c=oe){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},bi=class extends Ut{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},xi=class e extends Dr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new hr(c,3)),this.setAttribute(`normal`,new hr(l,3)),this.setAttribute(`uv`,new hr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Si=class e extends Dr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new hr(u,3)),this.setAttribute(`normal`,new hr(d,3)),this.setAttribute(`uv`,new hr(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ci=class e extends Si{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},wi=class e extends Dr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new hr(i,3)),this.setAttribute(`normal`,new hr(i.slice(),3)),this.setAttribute(`uv`,new hr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new K,r=new K,i=new K;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new K;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new K;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new K,t=new K,n=new K,r=new K,o=new G,s=new G,c=new G;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ti=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){H(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new G:new K);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new K,r=[],i=[],a=[],o=new K,s=new Yt;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new K)}i[0]=new K,a[0]=new K;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(W(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(W(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},Ei=class extends Ti{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new G){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Di=class extends Ei{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Oi(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ki=new K,Ai=new K,ji=new Oi,Mi=new Oi,Ni=new Oi,Pi=class extends Ti{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new K){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ai.subVectors(r[0],r[1]).add(r[0]),c=Ai);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ki.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ki),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ji.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Mi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ni.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ji.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Mi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ni.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ji.calc(s),Mi.calc(s),Ni.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Fi(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Ii(e,t){let n=1-e;return n*n*t}function Li(e,t){return 2*(1-e)*e*t}function Ri(e,t){return e*e*t}function zi(e,t,n,r){return Ii(e,t)+Li(e,n)+Ri(e,r)}function Bi(e,t){let n=1-e;return n*n*n*t}function Vi(e,t){let n=1-e;return 3*n*n*e*t}function Hi(e,t){return 3*(1-e)*e*e*t}function Ui(e,t){return e*e*e*t}function Wi(e,t,n,r,i){return Bi(e,t)+Vi(e,n)+Hi(e,r)+Ui(e,i)}var Gi=class extends Ti{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Wi(e,r.x,i.x,a.x,o.x),Wi(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ki=class extends Ti{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Wi(e,r.x,i.x,a.x,o.x),Wi(e,r.y,i.y,a.y,o.y),Wi(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qi=class extends Ti{constructor(e=new G,t=new G){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ji=class extends Ti{constructor(e=new K,t=new K){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yi=class extends Ti{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(zi(e,r.x,i.x,a.x),zi(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xi=class extends Ti{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(zi(e,r.x,i.x,a.x),zi(e,r.y,i.y,a.y),zi(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zi=class extends Ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new G){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Fi(o,s.x,c.x,l.x,u.x),Fi(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this}},Qi=Object.freeze({__proto__:null,ArcCurve:Di,CatmullRomCurve3:Pi,CubicBezierCurve:Gi,CubicBezierCurve3:Ki,EllipseCurve:Ei,LineCurve:qi,LineCurve3:Ji,QuadraticBezierCurve:Yi,QuadraticBezierCurve3:Xi,SplineCurve:Zi}),$i=class extends Ti{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Qi[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Qi[n.type]().fromJSON(n))}return this.cacheLengths=null,this}},ea=class extends $i{constructor(e){super(),this.type=`Path`,this.currentPoint=new G,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new qi(this.currentPoint.clone(),new G(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Yi(this.currentPoint.clone(),new G(e,t),new G(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Gi(this.currentPoint.clone(),new G(e,t),new G(n,r),new G(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Zi([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Ei(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ta=class extends ea{constructor(e){super(e),this.uuid=yt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ea().fromJSON(n))}return this}};function na(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=ra(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=ua(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return aa(a,o,n,s,c,l,0),o}function ra(e,t,n,r,i){let a;if(i===Pa(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=ja(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=ja(i/r|0,e[i],e[i+1],a);return a&&Ca(a,a.next)&&(Ma(a),a=a.next),a}function ia(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ca(n,n.next)||Sa(n.prev,n,n.next)===0)){if(Ma(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function aa(e,t,n,r,i,a,o){if(!e)return;!o&&a&&ha(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?sa(e,r,i,a):oa(e))t.push(c.i,e.i,l.i),Ma(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=ca(ia(e),t),aa(e,t,n,r,i,a,2)):o===2&&la(e,t,n,r,i,a):aa(ia(e),t,n,r,i,a,1);break}}}function oa(e){let t=e.prev,n=e,r=e.next;if(Sa(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&ba(i,s,a,c,o,l,m.x,m.y)&&Sa(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function sa(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Sa(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=_a(p,m,t,n,r),v=_a(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&ba(s,u,c,d,l,f,y.x,y.y)&&Sa(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&ba(s,u,c,d,l,f,b.x,b.y)&&Sa(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&ba(s,u,c,d,l,f,y.x,y.y)&&Sa(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&ba(s,u,c,d,l,f,b.x,b.y)&&Sa(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function ca(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ca(r,i)&&wa(r,n,n.next,i)&&Oa(r,i)&&Oa(i,r)&&(t.push(r.i,n.i,i.i),Ma(n),Ma(n.next),n=e=i),n=n.next}while(n!==e);return ia(n)}function la(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&xa(o,e)){let s=Aa(o,e);o=ia(o,o.next),s=ia(s,s.next),aa(o,t,n,r,i,a,0),aa(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function ua(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=ra(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(va(o))}i.sort(da);for(let e=0;e<i.length;e++)n=fa(i[e],n);return n}function da(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function fa(e,t){let n=pa(e,t);if(!n)return t;let r=Aa(n,e);return ia(r,r.next),ia(n,n.next)}function pa(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ca(e,n))return n;do{if(Ca(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&ya(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Oa(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&ma(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function ma(e,t){return Sa(e.prev,e,t.prev)<0&&Sa(t.next,e,e.next)<0}function ha(e,t,n,r){let i=e;do i.z===0&&(i.z=_a(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,ga(i)}function ga(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function _a(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function va(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function ya(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function ba(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&ya(e,t,n,r,i,a,o,s)}function xa(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Da(e,t)&&(Oa(e,t)&&Oa(t,e)&&ka(e,t)&&(Sa(e.prev,e,t.prev)||Sa(e,t.prev,t))||Ca(e,t)&&Sa(e.prev,e,e.next)>0&&Sa(t.prev,t,t.next)>0)}function Sa(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ca(e,t){return e.x===t.x&&e.y===t.y}function wa(e,t,n,r){let i=Ea(Sa(e,t,n)),a=Ea(Sa(e,t,r)),o=Ea(Sa(n,r,e)),s=Ea(Sa(n,r,t));return!!(i!==a&&o!==s||i===0&&Ta(e,n,t)||a===0&&Ta(e,r,t)||o===0&&Ta(n,e,r)||s===0&&Ta(n,t,r))}function Ta(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ea(e){return e>0?1:e<0?-1:0}function Da(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&wa(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Oa(e,t){return Sa(e.prev,e,e.next)<0?Sa(e,t,e.next)>=0&&Sa(e,e.prev,t)>=0:Sa(e,t,e.prev)<0||Sa(e,e.next,t)<0}function ka(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Aa(e,t){let n=Na(e.i,e.x,e.y),r=Na(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function ja(e,t,n,r){let i=Na(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Ma(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Na(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Pa(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Fa=class{static triangulate(e,t,n=2){return na(e,t,n)}},Ia=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];La(e),Ra(n,e);let a=e.length;t.forEach(La);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Ra(n,t[e]);let o=Fa.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function La(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Ra(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var za=class e extends Dr{constructor(e=new ta([new G(.5,.5),new G(-.5,.5),new G(-.5,-.5),new G(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new hr(r,3)),this.setAttribute(`uv`,new hr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Ba:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new K,b=new K,x=new K}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Ia.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Ia.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||U(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new G(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new G(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,ee=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),ee=ee.concat(N)}let P;if(p===0)P=Ia.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);F(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);F(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}P=Ia.triangulateShape(e,t)}let te=P.length,ne=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],ee[e],ne):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),F(x.x,x.y,x.z)):F(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],ee[t],ne):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),F(x.x,x.y,x.z)):F(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);F(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?F(i.x,i.y+g[s-1].y,g[s-1].x+n):F(i.x,i.y,c+n)}}}re(),ie();function re(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<te;e++){let n=P[e];oe(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<te;e++){let n=P[e];oe(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<te;e++){let t=P[e];oe(t[2],t[1],t[0])}for(let e=0;e<te;e++){let t=P[e];oe(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ie(){let e=r.length/3,t=0;ae(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ae(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ae(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);se(t+r+n,t+i+n,t+i+a,t+r+a)}}}function F(e,t,n){a.push(e),a.push(t),a.push(n)}function oe(e,t,i){I(e),I(t),I(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ce(o[0]),ce(o[1]),ce(o[2])}function se(e,t,i,a){I(e),I(t),I(a),I(t),I(i),I(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ce(s[0]),ce(s[1]),ce(s[3]),ce(s[1]),ce(s[2]),ce(s[3])}function I(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ce(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Va(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Qi[i.type]().fromJSON(i)),new e(r,t.options)}},Ba={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new G(a,o),new G(s,c),new G(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new G(o,1-c),new G(l,1-d),new G(f,1-m),new G(h,1-_)]:[new G(s,1-c),new G(u,1-d),new G(p,1-m),new G(g,1-_)]}};function Va(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Ha=class e extends wi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ua=class e extends Dr{constructor(e=[new G(0,-.5),new G(.5,0),new G(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=W(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new K,d=new G,f=new K,p=new K,m=new K,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new hr(a,3)),this.setAttribute(`uv`,new hr(o,2)),this.setAttribute(`normal`,new hr(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Wa=class e extends Dr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new hr(p,3)),this.setAttribute(`normal`,new hr(m,3)),this.setAttribute(`uv`,new hr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ga=class e extends Dr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new hr(p,3)),this.setAttribute(`normal`,new hr(m,3)),this.setAttribute(`uv`,new hr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Ka=class e extends Dr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new K,f=new K,p=new K;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new hr(c,3)),this.setAttribute(`normal`,new hr(l,3)),this.setAttribute(`uv`,new hr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function qa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ya(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ya(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ja(e){let t={};for(let n=0;n<e.length;n++){let r=qa(e[n]);for(let e in r)t[e]=r[e]}return t}function Ya(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Xa(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Za(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Nt.workingColorSpace}var Qa={clone:qa,merge:Ja},$a=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,to=class extends Nr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$a,this.fragmentShader=eo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qa(e.uniforms),this.uniformsGroups=Xa(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Wt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Yt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},no=class extends to{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ro=class extends Nr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new J(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},io=class extends ro{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new G(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return W(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new J(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new J(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new J(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return ft(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){ft(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},ao=class extends Nr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},oo=class extends Nr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Xe,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},so=class extends Nr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function co(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function lo(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var uo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},fo=class extends uo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qe,endingEnd:qe}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Je:i=e,o=2*t-n;break;case Ye:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Je:a=e,s=2*n-t;break;case Ye:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},po=class extends uo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},mo=class extends uo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},ho=class extends uo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=vo(n,t,g,y,r);i[p]=go(x,o,_,b,m)}return i}};function go(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function _o(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function vo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=go(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=_o(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var yo=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=co(t,this.TimeBufferType),this.values=co(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:co(e.times,Array),values:co(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),lo(e.settings)&&(n.settings={inTangents:co(e.settings.inTangents,Array),outTangents:co(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ho(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ue:t=this.InterpolantFactoryMethodDiscrete;break;case We:t=this.InterpolantFactoryMethodLinear;break;case Ge:t=this.InterpolantFactoryMethodSmooth;break;case Ke:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ue;case this.InterpolantFactoryMethodLinear:return We;case this.InterpolantFactoryMethodSmooth:return Ge;case this.InterpolantFactoryMethodBezier:return Ke}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;lo(this.settings)&&(bo(this.settings.inTangents,e),bo(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;lo(this.settings)&&(xo(this.settings.inTangents,e),xo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&ot(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ge,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,lo(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function bo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function xo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}yo.prototype.ValueTypeName=``,yo.prototype.TimeBufferType=Float32Array,yo.prototype.ValueBufferType=Float32Array,yo.prototype.DefaultInterpolation=We;var So=class extends yo{constructor(e,t,n){super(e,t,n)}};So.prototype.ValueTypeName=`bool`,So.prototype.ValueBufferType=Array,So.prototype.DefaultInterpolation=Ue,So.prototype.InterpolantFactoryMethodLinear=void 0,So.prototype.InterpolantFactoryMethodSmooth=void 0;var Co=class extends yo{constructor(e,t,n,r){super(e,t,n,r)}};Co.prototype.ValueTypeName=`color`;var wo=class extends yo{constructor(e,t,n,r){super(e,t,n,r)}};wo.prototype.ValueTypeName=`number`;var To=class extends uo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Et.slerpFlat(i,0,a,c-o,a,c,s);return i}},Eo=class extends yo{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new To(this.times,this.values,this.getValueSize(),e)}};Eo.prototype.ValueTypeName=`quaternion`,Eo.prototype.InterpolantFactoryMethodSmooth=void 0;var Do=class extends yo{constructor(e,t,n){super(e,t,n)}};Do.prototype.ValueTypeName=`string`,Do.prototype.ValueBufferType=Array,Do.prototype.DefaultInterpolation=Ue,Do.prototype.InterpolantFactoryMethodLinear=void 0,Do.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends yo{constructor(e,t,n,r){super(e,t,n,r)}};Oo.prototype.ValueTypeName=`vector`;var ko=class extends Cn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ao=class extends ko{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},jo=new Yt,Mo=new K,No=new K,Po=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.mapType=E,this.map=null,this.mapPass=null,this.matrix=new Yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pi,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new Wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Mo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mo),No.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(No),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){jo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(jo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(jo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fo=new K,Io=new Et,Lo=new K,Ro=class extends Cn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Yt,this.projectionMatrix=new Yt,this.projectionMatrixInverse=new Yt,this.coordinateSystem=it,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fo,Io,Lo),Lo.x===1&&Lo.y===1&&Lo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Io,Lo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fo,Io,Lo),Lo.x===1&&Lo.y===1&&Lo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fo,Io,Lo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},zo=new K,Bo=new G,Vo=new G,Ho=class extends Ro{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(_t*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vt*2*Math.atan(Math.tan(_t*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zo.x,zo.y).multiplyScalar(-e/zo.z),zo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zo.x,zo.y).multiplyScalar(-e/zo.z)}getViewSize(e,t){return this.getViewBounds(e,Bo,Vo),t.subVectors(Vo,Bo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(_t*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Uo=class extends Ro{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Wo=class extends Po{constructor(){super(new Uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Go=class extends ko{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new Wo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ko=-90,qo=1,Jo=class extends Cn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ho(Ko,qo,e,t);r.layers=this.layers,this.add(r);let i=new Ho(Ko,qo,e,t);i.layers=this.layers,this.add(i);let a=new Ho(Ko,qo,e,t);a.layers=this.layers,this.add(a);let o=new Ho(Ko,qo,e,t);o.layers=this.layers,this.add(o);let s=new Ho(Ko,qo,e,t);s.layers=this.layers,this.add(s);let c=new Ho(Ko,qo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Yo=class extends Ho{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Xo=`\\[\\]\\.:\\/`,Zo=RegExp(`[\\[\\]\\.:\\/]`,`g`),Qo=`[^\\[\\]\\.:\\/]`,$o=`[^`+Xo.replace(`\\.`,``)+`]`,es=`((?:WC+[\\/:])*)`.replace(`WC`,Qo),ts=`(WCOD+)?`.replace(`WCOD`,$o),ns=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Qo),rs=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Qo),is=RegExp(`^`+es+ts+ns+rs+`$`),as=[`material`,`materials`,`bones`,`map`],os=class{constructor(e,t,n){let r=n||ss.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ss=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Zo,``)}static parseTrackName(e){let t=is.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);as.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ss.Composite=os,ss.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ss.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ss.prototype.GetterByBindingType=[ss.prototype._getValue_direct,ss.prototype._getValue_array,ss.prototype._getValue_arrayElement,ss.prototype._getValue_toArray],ss.prototype.SetterByBindingTypeAndVersioning=[[ss.prototype._setValue_direct,ss.prototype._setValue_direct_setNeedsUpdate,ss.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ss.prototype._setValue_array,ss.prototype._setValue_array_setNeedsUpdate,ss.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ss.prototype._setValue_arrayElement,ss.prototype._setValue_arrayElement_setNeedsUpdate,ss.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ss.prototype._setValue_fromArray,ss.prototype._setValue_fromArray_setNeedsUpdate,ss.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],p=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},p.prototype.isMatrix2=!0;function cs(e,t,n,r){let i=ls(r);switch(n){case ie:return e*t;case I:return e*t/i.components*i.byteLength;case ce:return e*t/i.components*i.byteLength;case le:return e*t*2/i.components*i.byteLength;case ue:return e*t*2/i.components*i.byteLength;case ae:return e*t*3/i.components*i.byteLength;case F:return e*t*4/i.components*i.byteLength;case de:return e*t*4/i.components*i.byteLength;case fe:case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case me:case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case _e:case ye:return Math.max(e,16)*Math.max(t,8)/4;case ge:case ve:return Math.max(e,8)*Math.max(t,8)/2;case be:case xe:case L:case Ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Se:case we:case Te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ee:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case De:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Oe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ke:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Ae:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case je:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case R:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Me:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ne:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Pe:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case z:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Fe:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case B:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case V:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ie:case Le:case Re:return Math.ceil(e/4)*Math.ceil(t/4)*16;case ze:case Be:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ve:case He:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ls(e){switch(e){case E:case D:return{byteLength:1,components:1};case k:case O:case N:return{byteLength:2,components:1};case ee:case P:return{byteLength:2,components:4};case j:case A:case M:return{byteLength:4,components:1};case ne:case re:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function us(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ds(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var fs={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Y={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},ps={basic:{uniforms:Ja([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:fs.meshbasic_vert,fragmentShader:fs.meshbasic_frag},lambert:{uniforms:Ja([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:fs.meshlambert_vert,fragmentShader:fs.meshlambert_frag},phong:{uniforms:Ja([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:fs.meshphong_vert,fragmentShader:fs.meshphong_frag},standard:{uniforms:Ja([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fs.meshphysical_vert,fragmentShader:fs.meshphysical_frag},toon:{uniforms:Ja([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new J(0)}}]),vertexShader:fs.meshtoon_vert,fragmentShader:fs.meshtoon_frag},matcap:{uniforms:Ja([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:fs.meshmatcap_vert,fragmentShader:fs.meshmatcap_frag},points:{uniforms:Ja([Y.points,Y.fog]),vertexShader:fs.points_vert,fragmentShader:fs.points_frag},dashed:{uniforms:Ja([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fs.linedashed_vert,fragmentShader:fs.linedashed_frag},depth:{uniforms:Ja([Y.common,Y.displacementmap]),vertexShader:fs.depth_vert,fragmentShader:fs.depth_frag},normal:{uniforms:Ja([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:fs.meshnormal_vert,fragmentShader:fs.meshnormal_frag},sprite:{uniforms:Ja([Y.sprite,Y.fog]),vertexShader:fs.sprite_vert,fragmentShader:fs.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fs.background_vert,fragmentShader:fs.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:fs.backgroundCube_vert,fragmentShader:fs.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fs.cube_vert,fragmentShader:fs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fs.equirect_vert,fragmentShader:fs.equirect_frag},distance:{uniforms:Ja([Y.common,Y.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fs.distance_vert,fragmentShader:fs.distance_frag},shadow:{uniforms:Ja([Y.lights,Y.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:fs.shadow_vert,fragmentShader:fs.shadow_frag}};ps.physical={uniforms:Ja([ps.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new q},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:fs.meshphysical_vert,fragmentShader:fs.meshphysical_frag};var ms={r:0,b:0,g:0},hs=new Yt,gs=new q;gs.set(-1,0,0,0,1,0,0,0,1);function _s(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new Zr(new xi(1,1,1),new to({name:`BackgroundCubeMaterial`,uniforms:qa(ps.backgroundCube.uniforms),vertexShader:ps.backgroundCube.vertexShader,fragmentShader:ps.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(hs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(gs),l.material.toneMapped=Nt.getTransfer(i.colorSpace)!==et,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Zr(new Wa(2,2),new to({name:`BackgroundMaterial`,uniforms:qa(ps.background.uniforms),vertexShader:ps.background.vertexShader,fragmentShader:ps.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Nt.getTransfer(i.colorSpace)!==et,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ms,Za(e)),n.buffers.color.setClear(ms.r,ms.g,ms.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function vs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ys(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function bs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&H(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function xs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new jr,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ss=class extends Kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new gi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new xi(5,5,5),i=new to({name:`CubemapFromEquirect`,uniforms:qa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Zr(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=C),new Jo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Cs=256,ws=3,Ts=20,Es=256,Ds=16,Os=3,ks=new K,As=new J,js=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Jo(1,10,null),this._boxMesh=new Zr(new xi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ks}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(As));let h=new Jo(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ls(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Cs,St(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Cs:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Ms(e,!1,!1),n=Math.log2(e)-ws;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Ms(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rs()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Ls()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Ps(),this._integrationMaterial=Fs());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Ds);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Os)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Es*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Is());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Ms(e,t,n){return new Ss(e,{minFilter:T,generateMipmaps:t,type:N,colorSpace:Qe,depthBuffer:n})}function Ns(e,t,n){return new to({name:e,uniforms:t,vertexShader:fs.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Ps(){return Ns(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Es}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Fs(){return Ns(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ds}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Is(){return Ns(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ts}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Ls(){return Ns(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Rs(){return Ns(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function zs(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Ss(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new js(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new js(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Bs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&ft(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Vs(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?mr:pr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Hs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Us(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ws(e,t,n){let r=new WeakMap,i=new Wt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new qt(h,p,m,u);g.type=M,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Gs(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Ks={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function qs(e,t,n,r,i,a){let o=new Kt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Dr;u.setAttribute(`position`,new hr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new hr([0,2,0,0,2,0],2));let d=new no({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Zr(u,d),p=new Uo(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Kt(t,n,{type:N,depthBuffer:!1,stencilBuffer:!1}),c=new Kt(t,n,{type:N,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new vi(t,n),a===!0&&(l.format=se,l.type=te)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Nt.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Ks[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var Js=new Ut,Ys=new vi(1,1),Xs=new yi(1),Zs=new qt,Qs=new Jt,$s=new gi,ec=[],tc=[],nc=new Float32Array(16),rc=new Float32Array(9),ic=new Float32Array(4);function ac(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ec[i];if(a===void 0&&(a=new Float32Array(i),ec[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function oc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function sc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function cc(e,t){let n=tc[t];n===void 0&&(n=new Int32Array(t),tc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function lc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(oc(n,t))return;e.uniform2fv(this.addr,t),sc(n,t)}}function dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(oc(n,t))return;e.uniform3fv(this.addr,t),sc(n,t)}}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(oc(n,t))return;e.uniform4fv(this.addr,t),sc(n,t)}}function pc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(oc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),sc(n,t)}else{if(oc(n,r))return;ic.set(r),e.uniformMatrix2fv(this.addr,!1,ic),sc(n,r)}}function mc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(oc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),sc(n,t)}else{if(oc(n,r))return;rc.set(r),e.uniformMatrix3fv(this.addr,!1,rc),sc(n,r)}}function hc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(oc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),sc(n,t)}else{if(oc(n,r))return;nc.set(r),e.uniformMatrix4fv(this.addr,!1,nc),sc(n,r)}}function gc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function _c(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(oc(n,t))return;e.uniform2iv(this.addr,t),sc(n,t)}}function vc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(oc(n,t))return;e.uniform3iv(this.addr,t),sc(n,t)}}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(oc(n,t))return;e.uniform4iv(this.addr,t),sc(n,t)}}function bc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(oc(n,t))return;e.uniform2uiv(this.addr,t),sc(n,t)}}function Sc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(oc(n,t))return;e.uniform3uiv(this.addr,t),sc(n,t)}}function Cc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(oc(n,t))return;e.uniform4uiv(this.addr,t),sc(n,t)}}function wc(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Tc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?wc(Ys):Js,n.setTexture2D(t||a,i)}function Ec(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Qs,i)}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?wc(Xs):$s,n.setTextureCube(t||a,i)}function Oc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Zs,i)}function kc(e){switch(e){case 5126:return lc;case 35664:return uc;case 35665:return dc;case 35666:return fc;case 35674:return pc;case 35675:return mc;case 35676:return hc;case 5124:case 35670:return gc;case 35667:case 35671:return _c;case 35668:case 35672:return vc;case 35669:case 35673:return yc;case 5125:return bc;case 36294:return xc;case 36295:return Sc;case 36296:return Cc;case 35678:case 36198:case 36298:case 36306:case 35682:return Tc;case 35679:case 36299:case 36307:return Ec;case 35680:case 36300:case 36308:case 36293:return Dc;case 36289:case 36303:case 36311:case 36292:return Oc}}function Ac(e,t){e.uniform1fv(this.addr,t)}function jc(e,t){let n=ac(t,this.size,2);e.uniform2fv(this.addr,n)}function Mc(e,t){let n=ac(t,this.size,3);e.uniform3fv(this.addr,n)}function Nc(e,t){let n=ac(t,this.size,4);e.uniform4fv(this.addr,n)}function Pc(e,t){let n=ac(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Fc(e,t){let n=ac(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ic(e,t){let n=ac(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Lc(e,t){e.uniform1iv(this.addr,t)}function Rc(e,t){e.uniform2iv(this.addr,t)}function zc(e,t){e.uniform3iv(this.addr,t)}function Bc(e,t){e.uniform4iv(this.addr,t)}function Vc(e,t){e.uniform1uiv(this.addr,t)}function Hc(e,t){e.uniform2uiv(this.addr,t)}function Uc(e,t){e.uniform3uiv(this.addr,t)}function Wc(e,t){e.uniform4uiv(this.addr,t)}function Gc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?wc(Ys):Js;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Kc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Qs,a[e])}function qc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?wc(Xs):$s;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function Jc(e,t,n){let r=this.cache,i=t.length,a=cc(n,i);oc(r,a)||(e.uniform1iv(this.addr,a),sc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Zs,a[e])}function Yc(e){switch(e){case 5126:return Ac;case 35664:return jc;case 35665:return Mc;case 35666:return Nc;case 35674:return Pc;case 35675:return Fc;case 35676:return Ic;case 5124:case 35670:return Lc;case 35667:case 35671:return Rc;case 35668:case 35672:return zc;case 35669:case 35673:return Bc;case 5125:return Vc;case 36294:return Hc;case 36295:return Uc;case 36296:return Wc;case 35678:case 36198:case 36298:case 36306:case 35682:return Gc;case 35679:case 36299:case 36307:return Kc;case 35680:case 36300:case 36308:case 36293:return qc;case 36289:case 36303:case 36311:case 36292:return Jc}}var Xc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kc(t.type)}},Zc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yc(t.type)}},Qc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},$c=/(\w+)(\])?(\[|\.)?/g;function el(e,t){e.seq.push(t),e.map[t.id]=t}function tl(e,t,n){let r=e.name,i=r.length;for($c.lastIndex=0;;){let a=$c.exec(r),o=$c.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){el(n,l===void 0?new Xc(s,e,t):new Zc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Qc(s),el(n,e)),n=e}}}var nl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);tl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function rl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var il=37297,al=0;function ol(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var sl=new q;function cl(e){Nt._getMatrix(sl,Nt.workingColorSpace,e);let t=`mat3( ${sl.elements.map(e=>e.toFixed(4))} )`;switch(Nt.getTransfer(e)){case $e:return[t,`LinearTransferOETF`];case et:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ll(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ol(e.getShaderSource(t),r)}return i}function ul(e,t){let n=cl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var dl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function fl(e,t){let n=dl[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var pl=new K;function ml(){return Nt.getLuminanceCoefficients(pl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${pl.x.toFixed(4)}, ${pl.y.toFixed(4)}, ${pl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function hl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(vl).join(`
`)}function gl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function _l(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function vl(e){return e!==``}function yl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function bl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var xl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sl(e){return e.replace(xl,Cl)}function Cl(e,t){let n=fs[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return Sl(n)}var wl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tl(e){return e.replace(wl,El)}function El(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Dl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ol={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function kl(e){return Ol[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Al={302:`ENVMAP_MODE_REFRACTION`};function jl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Al[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ml={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Nl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ml[e.combine]||`ENVMAP_BLENDING_NONE`}function Pl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=kl(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=jl(n),d=Nl(n),f=hl(n),p=gl(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(vl).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(vl).join(`
`),g.length>0&&(g+=`
`)):(h=[Dl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(vl).join(`
`),g=[Dl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:fs.tonemapping_pars_fragment,n.toneMapping===0?``:fl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,fs.colorspace_pars_fragment,ul(`linearToOutputTexel`,n.outputColorSpace),ml(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(vl).join(`
`)),o=Sl(o),o=yl(o,n),o=bl(o,n),s=Sl(s),s=yl(s,n),s=bl(s,n),o=Tl(o),s=Tl(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=rl(i,i.VERTEX_SHADER,v),x=rl(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=ll(i,b,`vertex`),n=ll(i,x,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new nl(i,m),w=_l(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,il)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=al++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Fl=0,Il=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ll(e),t.set(e,n)),n}},Ll=class{constructor(e){this.id=Fl++,this.code=e,this.usedTimes=0}};function Rl(e){return e===1030||e===37490||e===36285}function zl(e,t,n,r,i,a){let o=new sn,s=new Il,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=ps[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,ee=!!i.map,P=!!i.matcap,te=!!b,ne=te&&b.isPMREMTexture===!0,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,F=!!i.normalMap,oe=!!i.displacementMap,se=!!i.emissiveMap,I=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.diffuseRoughness>0,fe=i.dispersion>0,pe=i.retroreflectivity>0,me=i.iridescence>0,he=i.sheen>0,ge=i.transmission>0,_e=le&&!!i.anisotropyMap,ve=ue&&!!i.clearcoatMap,ye=ue&&!!i.clearcoatNormalMap,be=ue&&!!i.clearcoatRoughnessMap,xe=de&&!!i.diffuseRoughnessMap,Se=me&&!!i.iridescenceMap,L=me&&!!i.iridescenceThicknessMap,Ce=he&&!!i.sheenColorMap,we=he&&!!i.sheenRoughnessMap,Te=!!i.specularMap,Ee=!!i.specularColorMap,De=!!i.specularIntensityMap,Oe=ge&&!!i.transmissionMap,ke=ge&&!!i.thicknessMap,Ae=!!i.gradientMap,je=!!i.alphaMap,R=i.alphaTest>0,Me=!!i.alphaHash,Ne=!!i.extensions,Pe=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Pe=e.toneMapping);let z=ne?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Fe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Nt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:P,envMap:te,envMapMode:te&&b.mapping,envMapPMREM:ne,envMapMaxLod:ne?z.length-1:null,envMapSize:ne?z[0].width:null,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:F,displacementMap:oe,emissiveMap:se,normalMapObjectSpace:F&&i.normalMapType===1,normalMapTangentSpace:F&&i.normalMapType===0,packedNormalMap:F&&i.normalMapType===0&&Rl(i.normalMap.format),metalnessMap:I,roughnessMap:ce,anisotropy:le,anisotropyMap:_e,clearcoat:ue,clearcoatMap:ve,clearcoatNormalMap:ye,clearcoatRoughnessMap:be,diffuseRoughness:de,diffuseRoughnessMap:xe,dispersion:fe,retroreflection:pe,iridescence:me,iridescenceMap:Se,iridescenceThicknessMap:L,sheen:he,sheenColorMap:Ce,sheenRoughnessMap:we,specularMap:Te,specularColorMap:Ee,specularIntensityMap:De,transmission:ge,transmissionMap:Oe,thicknessMap:ke,gradientMap:Ae,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:je,alphaTest:R,alphaHash:Me,combine:i.combine,mapUv:ee&&p(i.map.channel),aoMapUv:re&&p(i.aoMap.channel),lightMapUv:ie&&p(i.lightMap.channel),bumpMapUv:ae&&p(i.bumpMap.channel),normalMapUv:F&&p(i.normalMap.channel),displacementMapUv:oe&&p(i.displacementMap.channel),emissiveMapUv:se&&p(i.emissiveMap.channel),metalnessMapUv:I&&p(i.metalnessMap.channel),roughnessMapUv:ce&&p(i.roughnessMap.channel),anisotropyMapUv:_e&&p(i.anisotropyMap.channel),clearcoatMapUv:ve&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:ye&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:xe&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:Se&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:L&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:we&&p(i.sheenRoughnessMap.channel),specularMapUv:Te&&p(i.specularMap.channel),specularColorMapUv:Ee&&p(i.specularColorMap.channel),specularIntensityMapUv:De&&p(i.specularIntensityMap.channel),transmissionMapUv:Oe&&p(i.transmissionMap.channel),thicknessMapUv:ke&&p(i.thicknessMap.channel),alphaMapUv:je&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(F||le),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(ee||je),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&F===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&Nt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ne&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ne&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=ps[t];n=Qa.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Pl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function Bl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Vl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Hl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ul(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Vl),r.length>1&&r.sort(t||Hl),i.length>1&&i.sort(t||Hl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Wl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Ul,e.set(t,[i])):n>=r.length?(i=new Ul,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Gl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new K,color:new J};break;case`SpotLight`:n={position:new K,direction:new K,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function Kl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ql=0;function Jl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Yl(e){let t=new Gl,n=Kl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new Yt,o=new Yt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Jl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ql++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Xl(e){let t=new Yl(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Zl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Xl(e),t.set(n,[a])):r>=i.length?(a=new Xl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ql=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$l=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,eu=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],tu=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],nu=new Yt,ru=new K,iu=new K;function au(e,t,n){let r=new pi,i=new G,a=new G,o=new Wt,s=new oo,c=new so,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new to({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:Ql,fragmentShader:$l}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Dr;m.setAttribute(`position`,new fr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Zr(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Kt(i.x,i.y,{format:le,type:N,minFilter:C,magFilter:C,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new vi(i.x,i.y,M),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=oe,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=b,d.map.depthTexture.magFilter=b}else l.isPointLight?(d.map=new Ss(i.x),d.map.depthTexture=new yi(i.x,j)):(d.map=new Kt(i.x,i.y),d.map.depthTexture=new vi(i.x,i.y,j)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=oe,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=C,d.map.depthTexture.magFilter=C):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=b,d.map.depthTexture.magFilter=b);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ru.setFromMatrixPosition(l.matrixWorld),e.position.copy(ru),iu.copy(e.position),iu.add(eu[t]),e.up.copy(tu[t]),e.lookAt(iu),e.updateMatrixWorld(),n.makeTranslation(-ru.x,-ru.y,-ru.z),nu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(nu,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),x(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Kt(i.x,i.y,{format:le,type:N}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)x(l[e],i,a,o,s,c)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ou(e,t){function n(){let t=!1,n=new Wt,r=null,i=new Wt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?I(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=mt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?I(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(P)[1]),N=ee>=1);let te=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new Wt().fromArray(re),F=new Wt().fromArray(ie);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),I(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),I(e.CULL_FACE),me(0);function I(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ce(e.BLEND),g=!1);else if(g===!1&&(I(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?ce(e.CULL_FACE):I(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?I(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?ce(e.CULL_FACE):(I(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(I(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function be(t){t?I(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function xe(t){t===void 0&&(t=e.TEXTURE0+M-1),te!==t&&(e.activeTexture(t),te=t)}function Se(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+M-1:te);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function L(){let t=ne[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function R(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Me(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ne(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Pe(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function z(t){F.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),F.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function B(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function V(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,ne={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),F.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:I,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:xe,bindTexture:Se,unbindTexture:L,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:je,texImage3D:R,pixelStorei:Ne,getParameter:Me,updateUBOMapping:Fe,uniformBlockBinding:B,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:Te,texSubImage3D:Ee,compressedTexSubImage2D:De,compressedTexSubImage3D:Oe,scissor:Pe,viewport:z,reset:V}}function su(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function E(e,t){return g?new OffscreenCanvas(e,t):st(`canvas`)}function D(e,t,n){let r=1,i=V(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=E(n,a));let o=t?E(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function O(e){return e.generateMipmaps}function k(t){e.generateMipmap(t)}function A(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function j(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?$e:Nt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function M(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function N(e,t){return O(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ee(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function P(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function te(e){re(e.target)}function ne(e){ie(e.target)}function re(e){e.removeEventListener(`dispose`,te),P(e),F(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function ie(e){e.removeEventListener(`dispose`,ne),P(e),I(e)}function ae(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ie(t):re(t))}m.clear(),d.clear()}function F(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&oe(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function oe(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function I(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&re(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let ce=0;function le(){ce=0}function ue(){return ce}function de(e){ce=e}function fe(){let e=ce;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ce+=1,e}function pe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function me(t,i){let a=r.get(t);if(t.isVideoTexture&&Fe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{we(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function he(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?we(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ge(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?we(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function _e(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?Te(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ve={[_]:e.REPEAT,[v]:e.CLAMP_TO_EDGE,[y]:e.MIRRORED_REPEAT},ye={[b]:e.NEAREST,[x]:e.NEAREST_MIPMAP_NEAREST,[S]:e.NEAREST_MIPMAP_LINEAR,[C]:e.LINEAR,[w]:e.LINEAR_MIPMAP_NEAREST,[T]:e.LINEAR_MIPMAP_LINEAR},be={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function xe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ve[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ve[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ve[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ye[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ye[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,be[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function Se(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,te),ee(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=pe(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&oe(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function L(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Ce(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=L(n.start,r.width,4),c=L(t.start,r.width,4);n.start<=i+1&&a===c&&L(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function we(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=Se(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Nt.getPrimaries(Nt.workingColorSpace),r=o.colorSpace===``?null:Nt.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=D(o.image,!1,i.maxTextureSize);t=B(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=j(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);xe(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,v=f.__version===void 0||l===!0,y=u.dataReady,b=N(o,t);if(o.isDepthTexture)m=M(o.format===se,o.type),v&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&v&&n.texStorage2D(e.TEXTURE_2D,b,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(v&&n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height),y&&Ce(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(y){if(o.layerUpdates.size>0){let t=cs(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?y&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&v&&n.texStorage2D(e.TEXTURE_2D,b,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?y&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(v&&n.texStorage3D(e.TEXTURE_2D_ARRAY,b,m,t.width,t.height,t.depth),y){if(o.layerUpdates.size>0){let i=cs(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(v&&n.texStorage3D(e.TEXTURE_3D,b,m,t.width,t.height,t.depth),y&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(v){if(_)n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<b;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&v){let t=V(g[0]);n.texStorage2D(e.TEXTURE_2D,b,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?y&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(v){let r=V(t);n.texStorage2D(e.TEXTURE_2D,b,m,r.width,r.height)}y&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);O(o)&&o.mipmapsAutoUpdate===!0&&k(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Te(t,o,s){if(o.image.length!==6)return;let c=Se(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Nt.getPrimaries(Nt.workingColorSpace),r=o.colorSpace===``?null:Nt.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=D(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=B(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=j(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=N(o,h);xe(e.TEXTURE_CUBE_MAP,o);let C;if(o.isDepthTexture){if(v=M(o.format===se,o.type),b){if(y)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,h.width,h.height,0,g,_,null)}}else if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=V(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}O(o)&&o.mipmapsAutoUpdate===!0&&k(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ee(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),z(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Pe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function De(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=M(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;z(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Pe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Pe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=j(o.internalFormat,c,l,o.normalized,o.colorSpace);z(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Pe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Pe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Oe(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?_e(i.depthTexture,0):me(i.depthTexture,0);let u=c.__webglTexture,d=Pe(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)z(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)z(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ke(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Oe(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Oe(i.__webglFramebuffer[0],t,0):Oe(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),De(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),De(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ae(t,n,i){let a=r.get(t);n!==void 0&&Ee(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ke(t)}function je(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,ne),ee(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&z(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=j(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Pe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),De(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),xe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Ee(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Ee(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);O(i)?k(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),xe(c,a),Ee(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),O(a)&&k(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),xe(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Ee(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Ee(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);O(i)?k(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&ke(t)}function R(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(O(a)&&a.mipmapsAutoUpdate===!0){let t=A(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),k(t),n.unbindTexture()}}}let Me=[];function Ne(t){if(t.samples>0){if(z(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Me.length=0,Me.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Me.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Me))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Pe(e){return Math.min(i.maxSamples,e.samples)}function z(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Fe(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function B(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Nt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function V(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=fe,this.resetTextureUnits=le,this.getTextureUnits=ue,this.setTextureUnits=de,this.setTexture2D=me,this.setTexture2DArray=he,this.setTexture3D=ge,this.setTextureCube=_e,this.rebindTextures=Ae,this.setupRenderTarget=je,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=z,this.dispose=ae}function cu(e,t){function n(n,r=``){let i,a=Nt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var lu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,du=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new bi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new to({vertexShader:lu,fragmentShader:uu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Zr(new Wa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fu=class extends ht{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new du,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=null,T=new Ho;T.viewport=new Wt;let D=new Ho;D.viewport=new Wt;let O=[T,D],k=new Yo,A=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new En,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new En,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new En,b[e]=t),t.getHandSpace()};function N(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,N),r.removeEventListener(`selectstart`,N),r.removeEventListener(`selectend`,N),r.removeEventListener(`squeeze`,N),r.removeEventListener(`squeezestart`,N),r.removeEventListener(`squeezeend`,N),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,P);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}A=null,M=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,I.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,N),r.addEventListener(`selectstart`,N),r.addEventListener(`selectend`,N),r.addEventListener(`squeeze`,N),r.addEventListener(`squeezestart`,N),r.addEventListener(`squeezeend`,N),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,P),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?se:oe,a=_.stencil?te:j);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Kt(d.textureWidth,d.textureHeight,{format:F,type:E,depthTexture:new vi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Kt(f.framebufferWidth,f.framebufferHeight,{format:F,type:E,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),I.setContext(r),I.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function P(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function ne(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),k.near=D.near=T.near=t,k.far=D.far=T.far=n,(A!==k.near||M!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),A=k.near,M=k.far),k.layers.mask=e.layers.mask|6,T.layers.mask=k.layers.mask&-5,D.layers.mask=k.layers.mask&-3;let i=e.parent,a=k.cameras;ne(k,i);for(let e=0;e<a.length;e++)ne(a[e],i);k.projectionMatrix.copy(T.projectionMatrix),k.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),re(e,k,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=vt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(k)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==k.cameras.length&&(k.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=O[n];o===void 0&&(o=new Ho,o.layers.enable(n),o.viewport=new Wt,O[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(k.matrix.copy(o.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),i===!0&&k.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new bi,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let I=new us;I.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},pu=new Yt,mu=new q;mu.set(-1,0,0,0,1,0,0,0,1);function hu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Za(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(pu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(mu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function gu(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var _u=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),vu=null;function yu(){return vu===null&&(vu=new ei(_u,16,16,le,N),vu.name=`DFG_LUT`,vu.minFilter=C,vu.magFilter=C,vu.wrapS=v,vu.wrapT=v,vu.generateMipmaps=!1,vu.needsUpdate=!0),vu}var bu=class{constructor(e={}){let{canvas:t=ct(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=E}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([de,ue,ce]),g=new Set([E,j,k,te,ee,P]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,O=!1,A=null,M=null,ne=null,re=null;this._outputColorSpace=Ze;let ie=0,ae=0,F=null,oe=-1,se=null,I=new Wt,le=new Wt,fe=null,pe=new J(0),me=0,he=t.width,ge=t.height,_e=1,ve=null,ye=null,be=new Wt(0,0,he,ge),xe=new Wt(0,0,he,ge),Se=!1,L=new pi,Ce=new hi,we=!1,Te=!1,Ee=new Yt,De=new K,Oe=new Wt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return F===null?_e:1}let R=n;function Me(e,n){return t.getContext(e,n)}let Ne,Pe,z,Fe,B,V,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Qe,$e;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,nt,!1),t.addEventListener(`webglcontextrestored`,rt,!1),t.addEventListener(`webglcontextcreationerror`,at,!1),R===null){let t=`webgl2`;if(R=Me(t,e),R===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}et()}catch(e){throw t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,at,!1),U(`WebGLRenderer: `+e.message),e}function et(){Ne=new Bs(R),Ne.init(),Xe=new cu(R,Ne),Pe=new bs(R,Ne,e,Xe),z=new ou(R,Ne),Pe.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),M=R.createFramebuffer(),ne=R.createFramebuffer(),re=R.createFramebuffer(),Fe=new Us(R),B=new Bl,V=new su(R,Ne,z,B,Pe,Xe,Fe),Ie=new zs(D),Le=new ds(R),Qe=new vs(R,Le),Re=new Vs(R,Le,Fe,Qe),ze=new Gs(R,Re,Le,Qe,Fe),qe=new Ws(R,Pe,V),We=new xs(B),Be=new zl(D,Ie,Ne,Pe,Qe,We),Ve=new hu(D,B),He=new Wl,Ue=new Zl(Ne),Ke=new _s(D,Ie,z,ze,p,s),Ge=new au(D,ze,Pe),$e=new gu(R,Fe,Pe,z),Je=new ys(R,Ne,Fe),Ye=new Hs(R,Ne,Fe),Fe.programs=Be.programs,D.capabilities=Pe,D.extensions=Ne,D.properties=B,D.renderLists=He,D.shadowMap=Ge,D.state=z,D.info=Fe}m!==1009&&(w=new qs(m,t.width,t.height,o,r,i));let tt=new fu(D,R);this.xr=tt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(e){e!==void 0&&(_e=e,this.setSize(he,ge,!1))},this.getSize=function(e){return e.set(he,ge)},this.setSize=function(e,n,r=!0){tt.isPresenting?H(`WebGLRenderer: Can't change size while VR device is presenting.`):(he=e,ge=n,t.width=Math.floor(e*_e),t.height=Math.floor(n*_e),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(he*_e,ge*_e).floor()},this.setDrawingBufferSize=function(e,n,r){he=e,ge=n,_e=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(be)},this.setViewport=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),z.viewport(I.copy(be).multiplyScalar(je()).round())},this.getScissor=function(e){return e.copy(xe)},this.setScissor=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),z.scissor(le.copy(xe).multiplyScalar(je()).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(e){z.setScissorTest(Se=e)},this.setOpaqueSort=function(e){ve=e},this.setTransparentSort=function(e){ye=e},this.getClearColor=function(e){return e.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=h.has(t)}if(e){let e=F.texture.type,t=g.has(e),n=Ke.getClearColor(),r=Ke.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferiv(R.COLOR,0,v))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),A=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,nt,!1),t.removeEventListener(`webglcontextrestored`,rt,!1),t.removeEventListener(`webglcontextcreationerror`,at,!1),Ke.dispose(),He.dispose(),Ue.dispose(),V.dispose(),B.dispose(),Ie.dispose(),ze.dispose(),Re.dispose(),Qe.dispose(),$e.dispose(),Be.dispose(),tt.dispose(),tt.removeEventListener(`sessionstart`,ht),tt.removeEventListener(`sessionend`,gt),_t.stop()};function nt(e){e.preventDefault(),ut(`WebGLRenderer: Context Lost.`),O=!0}function rt(){ut(`WebGLRenderer: Context Restored.`),O=!1;let e=Fe.autoReset,t=Ge.enabled,n=Ge.autoUpdate,r=Ge.needsUpdate,i=Ge.type;et(),Fe.autoReset=e,Ge.enabled=t,Ge.autoUpdate=n,Ge.needsUpdate=r,Ge.type=i}function at(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ot(e){let t=e.target;t.removeEventListener(`dispose`,ot),st(t)}function st(e){lt(e),B.remove(e)}function lt(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Be.releaseProgram(e)}),e.isShaderMaterial&&Be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ke);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Et(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Re.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Qe.setup(i,r,s,n,c);let h,g=Je;if(c!==null&&(h=Le.get(c),g=Ye,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*je()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*je()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Ne.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Le.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){A!==null&&e.isNodeMaterial&&A.setObject(r,e),we===!0&&We.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Ct(e,t,r),e.side=0,e.needsUpdate=!0,Ct(e,t,r),e.side=2):Ct(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),A!==null&&A.renderStart(e,t,n),x=Ue.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),A!==null&&A.updateLights(x.state.lightsArray),Te=this.localClippingEnabled,we=We.init(this.clippingPlanes,Te),we===!0&&We.setGlobalState(this.clippingPlanes,t),A!==null&&Ge.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),x=C.pop(),A!==null&&A.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Ne.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ft=null;function mt(e){ft&&ft(e)}function ht(){_t.stop()}function gt(){_t.start()}let _t=new us;_t.setAnimationLoop(mt),typeof self<`u`&&_t.setContext(self),this.setAnimationLoop=function(e){ft=e,tt.setAnimationLoop(e),e===null?_t.stop():_t.start()},tt.addEventListener(`sessionstart`,ht),tt.addEventListener(`sessionend`,gt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(O===!0)return;A!==null&&A.renderStart(e,t);let n=tt.enabled===!0&&tt.isPresenting===!0,r=w!==null&&(F===null||n)&&w.begin(D,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(t),t=tt.getCamera()),e.isScene===!0&&e.onBeforeRender(D,e,t,F),x=Ue.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),Ee.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Ce.setFromArrayCamera(t):L.setFromProjectionMatrix(Ee,it,t.reversedDepth),Te=this.localClippingEnabled,we=We.init(this.clippingPlanes,Te),b=He.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,tt.enabled===!0&&tt.isPresenting===!0){let e=D.xr.getDepthSensingMesh();e!==null&&vt(e,t,-1/0,D.sortObjects)}vt(e,t,0,D.sortObjects),b.finish(),A!==null&&A.updateLights(x.state.lightsArray),D.sortObjects===!0&&b.sort(ve,ye),Ae=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,Ae&&Ke.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),we===!0&&We.beginShadows();let i=x.state.shadowsArray;if(Ge.render(i,e,t),we===!0&&We.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];W(n,r,e,a)}Ae&&Ke.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];yt(b,e,n,n.viewport)}}else r.length>0&&W(n,r,e,t),Ae&&Ke.render(e),yt(b,e,t)}F!==null&&ae===0&&(V.updateMultisampleRenderTarget(F),V.updateRenderTargetMipmap(F)),r&&w.end(D),e.isScene===!0&&e.onAfterRender(D,e,t),Qe.resetDefaultState(),oe=-1,se=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),we===!0&&We.setGlobalState(D.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,A!==null&&A.renderEnd()};function vt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Ce:L;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);let i=ze.update(e),a=e.material;a.visible&&b.push(e,i,a,n,Oe.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Ce:L;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Oe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Oe.copy(e.boundingSphere.center)),Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,Oe.z,s,t)}}else a.visible&&b.push(e,i,a,n,Oe.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)vt(i[e],t,n,r)}function yt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),we===!0&&We.setGlobalState(D.clippingPlanes,n),r&&z.viewport(I.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function W(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Ne.has(`EXT_color_buffer_half_float`)||Ne.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Kt(1,1,{generateMipmaps:!0,type:e?N:E,minFilter:T,samples:Math.max(4,Pe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Nt.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*D.transmissionResolutionScale,o.w*D.transmissionResolutionScale);let s=D.getRenderTarget(),c=D.getActiveCubeFace(),l=D.getActiveMipmapLevel();D.setRenderTarget(a),D.getClearColor(pe),me=D.getClearAlpha(),me<1&&D.setClearColor(16777215,.5),D.clear(),Ae&&Ke.render(n);let u=D.toneMapping;D.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),we===!0&&We.setGlobalState(D.clippingPlanes,r),bt(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),Ne.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,xt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}D.setRenderTarget(s,c,l),D.setClearColor(pe,me),d!==void 0&&(r.viewport=d),D.toneMapping=u}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&xt(o,t,n,s,l,c)}}function xt(e,t,n,r,i,a){A!==null&&i.isNodeMaterial&&A.setObject(e,i),e.onBeforeRender(D,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(D,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=2):D.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(D,t,n,r,i,a)}function St(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Ct(e,t,n){t.isScene!==!0&&(t=ke);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Be.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Be.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ie.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ot),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return G(e,s),d}else s.uniforms=Be.getUniforms(e),A!==null&&e.isNodeMaterial&&A.build(e,n,s),e.onBeforeCompile(s,D),d=Be.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=We.uniform),G(e,s),r.needsLights=Ot(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=St(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function wt(e,t,n,r,i){let a=B.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Ct(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=nl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function G(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Et(e,t,n,r,i){t.isScene!==!0&&(t=ke),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?D.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Nt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ie.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=D.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),b=x.state.lights;if(we===!0&&(Te===!0||e!==se)){let t=e===se&&r.id===oe;We.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==We.numPlanes||v.numIntersection!==We.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===St(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?wt(r,t,i,s,h):Ct(r,t,i),A&&r.isNodeMaterial&&A.onUpdateProgram(r,w,v));let T=!1,E=!1,O=!1,k=w.getUniforms(),j=v.uniforms;if(z.useProgram(w.program)&&(T=!0,E=!0,O=!0),r.id!==oe&&(oe=r.id,E=!0),T||se!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),k.setValue(R,`projectionMatrix`,e.projectionMatrix),k.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=k.map.cameraPosition;t!==void 0&&t.setValue(R,De.setFromMatrixPosition(e.matrixWorld)),Pe.logarithmicDepthBuffer&&k.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&k.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),se!==e&&(se=e,E=!0,O=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&k.setValue(R,`sunShadowMap`,b.state.sunShadowMap,V),b.state.directionalShadowMap.length>0&&k.setValue(R,`directionalShadowMap`,b.state.directionalShadowMap,V),b.state.spotShadowMap.length>0&&k.setValue(R,`spotShadowMap`,b.state.spotShadowMap,V),b.state.pointShadowMap.length>0&&k.setValue(R,`pointShadowMap`,b.state.pointShadowMap,V)),i.isSkinnedMesh){k.setOptional(R,i,`bindMatrix`),k.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),k.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(k.setOptional(R,i,`batchingTexture`),k.setValue(R,`batchingTexture`,i._matricesTexture,V),k.setOptional(R,i,`batchingIdTexture`),k.setValue(R,`batchingIdTexture`,i._indirectTexture,V),k.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&k.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let M=n.morphAttributes;if((M.position!==void 0||M.normal!==void 0||M.color!==void 0)&&qe.update(i,n,w),(E||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,k.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=yu()),E){if(k.setValue(R,`toneMappingExposure`,D.toneMappingExposure),v.needsLights&&Dt(j,O),a&&r.fog===!0&&Ve.refreshFogUniforms(j,a),Ve.refreshMaterialUniforms(j,r,_e,ge,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}nl.upload(R,Tt(v),j,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(nl.upload(R,Tt(v),j,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&k.setValue(R,`center`,i.center),k.setValue(R,`modelViewMatrix`,i.modelViewMatrix),k.setValue(R,`normalMatrix`,i.normalMatrix),k.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];$e.update(n,w),$e.bind(n,w)}}return w}function Dt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ot(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return ae},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,ie=t,ae=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),le.copy(e.scissor),fe=e.scissorTest,z.viewport(I),z.scissor(le),z.setScissorTest(fe),oe=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),le.copy(e.scissor),fe=e.scissorTest}else I.copy(be).multiplyScalar(_e).floor(),le.copy(xe).multiplyScalar(_e).floor(),fe=Se;if(n!==0&&(r=M),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(I),z.scissor(le),z.setScissorTest(fe),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}oe=-1};function q(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Pe.textureFormatReadable(e.format),t.__typeReadable=Pe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=q(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,Xe.convert(c),Xe.convert(l),a)}finally{let e=F===null?null:B.get(F).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=q(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,Xe.convert(l),Xe.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=F===null?null:B.get(F).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await pt(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Xe.convert(t.format),_=Xe.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,ne),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,re);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){ie=0,ae=0,F=null,z.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return it}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Nt._getUnpackColorSpace()}};function xu(e){let t=-e.uz,n=e.ux;return[[1,1],[1,-1],[-1,-1],[-1,1]].map(([r,i])=>({x:e.cx+e.ux*e.hu*r+t*e.hv*i,z:e.cz+e.uz*e.hu*r+n*e.hv*i}))}function Su(e,t,n){let r=t-e.cx,i=n-e.cz,a=-e.uz,o=e.ux,s=Math.max(-e.hu,Math.min(e.hu,r*e.ux+i*e.uz)),c=Math.max(-e.hv,Math.min(e.hv,r*a+i*o));return{x:e.cx+e.ux*s+a*c,z:e.cz+e.uz*s+o*c}}function Cu(e,t,n=0){let r=xu(e),i=xu(t);for(let a of[{x:e.ux,z:e.uz},{x:-e.uz,z:e.ux},{x:t.ux,z:t.uz},{x:-t.uz,z:t.ux}]){let e=r.map(e=>e.x*a.x+e.z*a.z),t=i.map(e=>e.x*a.x+e.z*a.z);if(Math.max(...e)+n<Math.min(...t)||Math.max(...t)+n<Math.min(...e))return!1}return!0}function wu(e){let t=xu(e);return{minX:Math.min(...t.map(e=>e.x)),maxX:Math.max(...t.map(e=>e.x)),minZ:Math.min(...t.map(e=>e.z)),maxZ:Math.max(...t.map(e=>e.z)),obb:e}}var Tu=3.5,Eu=[-240,-120,0,120,240],Du=[-180,-60,60,180],Ou=11,ku={x:0,z:60,rIn:10,rOut:18},Au={hx:480,hz:420,r:220,median:3,lane:3.75,width:21},ju={z:-Au.hz,x0:-150,x1:150,halfWidth:12,height:6.5},Mu={minX:-397,maxX:-300,minZ:250,maxZ:340},Nu=Math.PI/4,Pu={x:Math.sin(Nu),z:Math.cos(Nu)},Fu=e=>({x:e,z:312}),Iu=e=>({x:Fu(e).x+Pu.x*2.6,z:Fu(e).z+Pu.z*2.6,heading:Nu}),Lu={linea:{x:-361.9,z:256.25,heading:Math.PI/2,length:6.9,width:2.3},bateria:{x:-372,z:292.6,heading:0,length:5,width:2.6},oblicuo:{...Iu(-350),length:5.2,width:2.6},sentido:{x:-362.5,z:331,heading:Math.PI/2,length:60,width:8}},Ru=[{x:-367.5,z:256.25,heading:Math.PI/2},{x:-356.3,z:256.25,heading:Math.PI/2},{x:-378.5,z:256.25,heading:Math.PI/2},...[-377.2,-374.6,-369.4,-366.8,-361.6].map(e=>({x:e,z:292.6,heading:Math.PI})),...[-357.4,-353.7,-346.3].map(e=>Iu(e))];function zu(){let e=Lu;return[{minX:-395,maxX:-325,minZ:254.6,maxZ:255},{minX:-385,maxX:-355,minZ:295.1,maxZ:295.5},{minX:-395,maxX:-330,minZ:e.sentido.z-4.4,maxZ:e.sentido.z-4},{minX:-395,maxX:-330,minZ:e.sentido.z+4,maxZ:e.sentido.z+4.4}]}function Bu(e,t){return e>=Mu.minX&&e<=Mu.maxX&&t>=Mu.minZ&&t<=Mu.maxZ}function Vu(e,t,n){let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)}function Hu(e,t){return 8*Vu(-130,-230,e)*Vu(-440,-350,e)*Vu(0,-100,t)*Vu(-340,-270,t)}function Uu(e,t,n=5){let r=Math.hypot(t.x-e.x,t.z-e.z),i=Math.max(1,Math.ceil(r/n)),a=[];for(let n=0;n<=i;n++)a.push({x:e.x+(t.x-e.x)*n/i,z:e.z+(t.z-e.z)*n/i});return a}function Wu(e,t,n,r,i=4){let a=Math.max(2,Math.ceil(Math.abs(r-n)*t/i)),o=[];for(let i=0;i<=a;i++){let s=n+(r-n)*i/a;o.push({x:e.x+t*Math.sin(s),z:e.z-t*Math.cos(s)})}return o}function Gu(...e){let t=[];for(let n of e)for(let e of n){let n=t[t.length-1];(!n||Math.hypot(n.x-e.x,n.z-e.z)>.01)&&t.push(e)}return t}var Ku=[{offset:Tu/2,dir:1},{offset:-3.5/2,dir:-1}],qu=[{offset:Tu/2,dir:1},{offset:-3.5/2,dir:1}];function Ju(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Yu=(e,t)=>e===ku.x&&t===ku.z,Xu=new Set([`0_60`,`240_-60`,`-240_60`]);function Zu(){let e=[];return Eu.forEach((t,n)=>Du.forEach((r,i)=>{let a=t,o=r;if(!Xu.has(`${t}_${r}`)){let e=Ju(1e3+n*31+i*7);a+=(e()*2-1)*Ou,o+=(e()*2-1)*Ou}e.push({id:`j${t}_${r}`,x:a,z:o,kind:Yu(t,r)?`rotonda`:`cruce`,xi:n,zi:i,arms:[]})})),e}var Qu=e=>e.kind===`rotonda`?ku.rOut-.6:7;function $u(e,t,n,r=3){let i=Math.hypot(t.x-e.x,t.z-e.z),a=Math.max(2,Math.ceil(i/r)),o=-(t.z-e.z)/i,s=(t.x-e.x)/i,c=[];for(let r=0;r<=a;r++){let i=r/a,l=n*Math.sin(Math.PI*i);c.push({x:e.x+(t.x-e.x)*i+o*l,z:e.z+(t.z-e.z)*i+s*l})}return c}function ed(e,t,n,r,i){let a=(e,t,n)=>{let r=0;for(;r<e.length-1&&Math.hypot(e[r].x-t.x,e[r].z-t.z)<n;)r++;if(r===0)return e;let i=e[r-1],a=e[r],o=Math.hypot(i.x-t.x,i.z-t.z),s=Math.hypot(a.x-t.x,a.z-t.z),c=(n-o)/(s-o||1);return[{x:i.x+(a.x-i.x)*c,z:i.z+(a.z-i.z)*c},...e.slice(r)]};return a(a(e,t,n).reverse(),r,i).reverse()}function td(e){let t=(t,n)=>e.find(e=>e.xi===t&&e.zi===n),n=[],r=(e,t,n)=>{let r=Ju(n);return ed($u(e,t,r()<.3?0:(r()*2-1)*7),e,Qu(e),t,Qu(t))};for(let e=0;e<Du.length;e++)for(let i=0;i<Eu.length-1;i++){let a=e===0,o=r(t(i,e),t(i+1,e),500+e*13+i);n.push({id:`h${e}-${i}`,name:`Calle ${[`Mayor`,`del Sol`,`de la Paz`,`del Río`][e]}`,kind:`calle`,axis:`h`,pts:a?o.reverse():o,width:7,lanes:a?qu:Ku,limit:a?50:md.includes(`h${e}-${i}`)?20:30,sidewalk:!0,oneWay:a})}for(let e=0;e<Eu.length;e++)for(let i=0;i<Du.length-1;i++){let a=e===1;n.push({id:`v${e}-${i}`,name:`Avenida ${[`Norte`,`de la Estación`,`Central`,`del Parque`,`del Puerto`][e]}`,kind:`calle`,axis:`v`,pts:r(t(e,i),t(e,i+1),700+e*13+i),width:7,lanes:a?qu:Ku,limit:a?50:md.includes(`v${e}-${i}`)?20:30,sidewalk:!0,oneWay:a})}return n}function nd(e,t){for(let n of e.sections??[])if(t>=n.from&&t<n.to)return n.limit;return e.limit}function rd(e,t=3){let n=[];for(let r=0;r<e.length-1;r++){let i=e[Math.max(0,r-1)],a=e[r],o=e[r+1],s=e[Math.min(e.length-1,r+2)],c=Math.max(2,Math.ceil(Math.hypot(o.x-a.x,o.z-a.z)/t));for(let e=0;e<c;e++){let t=e/c,r=t*t,l=r*t,u=(e,n,i,a)=>.5*(2*n+(-e+i)*t+(2*e-5*n+4*i-a)*r+(-e+3*n-3*i+a)*l);n.push({x:u(i.x,a.x,o.x,s.x),z:u(i.z,a.z,o.z,s.z)})}}return n.push(e[e.length-1]),n}var id=-300,ad=`cv-sierra`;function od(e){let t=e.find(e=>e.xi===0&&e.zi===0),n=e.find(e=>e.xi===1&&e.zi===0),r=ed(rd([{x:t.x,z:t.z},{x:-272,z:-181},{x:-310,z:-178},{x:-345,z:-190},{x:-375,z:-215},{x:-388,z:-243},{x:-372,z:-268},{x:-345,z:-268},{x:-322,z:-270},{x:-306,z:-285},{x:-314,z:-307},{x:-338,z:-318},{x:-358,z:-324},{x:-373,z:-337},{x:-373,z:-352},{x:-357,z:-363},{x:-322,z:-364},{x:-250,z:-349},{x:-200,z:-338},{x:-160,z:-318},{x:-136,z:-286},{x:-125,z:-246},{x:n.x-1,z:n.z-32},{x:n.x,z:n.z}],3),t,7,n,7),i=0,a=-1,o=-1;for(let e=0;e<r.length;e++)e&&(i+=Math.hypot(r[e].x-r[e-1].x,r[e].z-r[e-1].z)),r[e].x<-300&&(a<0&&(a=i),o=i);let s=i;return{id:ad,name:`Carretera de la Sierra (CV-12)`,kind:`calle`,axis:`v`,pts:r,width:7.4,lanes:Ku,limit:70,sidewalk:!1,oneWay:!1,rural:!0,sections:[{from:0,to:a,limit:50},{from:a,to:o,limit:40},{from:o,to:s-70,limit:70},{from:s-70,to:s+1,limit:50}]}}function sd(){let{hx:e,hz:t,r:n}=Au,r=e-n,i=t-n;return Gu(Uu({x:-r,z:-t},{x:r,z:-t},6),Wu({x:r,z:-i},n,0,Math.PI/2),Uu({x:e,z:-i},{x:e,z:i},6),Wu({x:r,z:i},n,Math.PI/2,Math.PI),Uu({x:r,z:t},{x:-r,z:t},6),Wu({x:-r,z:i},n,Math.PI,3*Math.PI/2),Uu({x:-e,z:i},{x:-e,z:-i},6),Wu({x:-r,z:-i},n,3*Math.PI/2,2*Math.PI)).slice(0,-1)}var cd=3.75,ld=Au.median/2+2*Au.lane,ud=ld+cd/2;function dd(){let e={id:`autovia`,name:`Autovía de circunvalación A-90`,kind:`autovia`,pts:sd(),closed:!0,width:Au.width,median:Au.median,oneWay:!1,limit:120,sidewalk:!1,lanes:[{offset:Au.median/2+Au.lane/2,dir:1},{offset:Au.median/2+Au.lane*1.5,dir:1},{offset:-(Au.median/2+Au.lane/2),dir:-1},{offset:-(Au.median/2+Au.lane*1.5),dir:-1}]},t=Au.hx-ud,n=Gu(Uu({x:Eu[4]+7,z:-60},{x:t-60,z:-60}),Wu({x:t-60,z:0},60,0,Math.PI/2),Uu({x:t,z:0},{x:t,z:200},6)),r=[],i=[];for(let e=1;e<=10;e++){let t=cd*(1-e/10);r.push({x:Au.hx-ld-t/2,z:200+e*6}),i.push(t)}let a={id:`ramal-entrada`,name:`Incorporación a la A-90`,kind:`ramal`,pts:[...n,...r],widths:[...n.map(()=>cd),...i],width:cd,lanes:[{offset:0,dir:1}],limit:80,sidewalk:!1,oneWay:!0},o=-Au.hx+ud,s=[],c=[];for(let e=0;e<10;e++){let t=cd*((e+1)/10);s.push({x:-Au.hx+ld+t/2,z:260-e*6}),c.push(t)}let l=Gu(Uu({x:o,z:200},{x:o,z:120},6),Wu({x:o+60,z:120},60,3*Math.PI/2,2*Math.PI),Uu({x:o+60,z:60},{x:Eu[0]-7,z:60}));return[e,a,{id:`ramal-salida`,name:`Salida 3 · Centro ciudad`,kind:`ramal`,pts:[...s,...l],widths:[...c,...l.map(()=>cd)],width:cd,lanes:[{offset:0,dir:1}],limit:60,sidewalk:!1,oneWay:!0}]}var fd={residencial:[14273460,14735048,13615792,15129803,14203290],oficinas:[12108492,11121855,13094870],antiguo:[14133634,14926749,13209451,15258536,12558462],moderno:[15658730,13949148,10134445],industrial:[12041410,10465471,13223096,9214374]},pd={i:3,j:0},md=[`h3-2`,`v3-2`,`v2-2`],hd={i:1,j:2};function gd(e,t){let n=!1;for(let r=0,i=t.length-1;r<t.length;i=r++){let a=t[r],o=t[i];a.z>e.z!=o.z>e.z&&e.x<(o.x-a.x)*(e.z-a.z)/(o.z-a.z)+a.x&&(n=!n)}return n}function _d(e,t){let n=0;for(let r=1;r<e.length;r++){let i=e[r-1],a=e[r],o=Math.hypot(a.x-i.x,a.z-i.z);if(n+o>=t||r===e.length-1){let e=Math.max(0,Math.min(1,(t-n)/(o||1)));return{p:{x:i.x+(a.x-i.x)*e,z:i.z+(a.z-i.z)*e},t:{x:(a.x-i.x)/(o||1),z:(a.z-i.z)/(o||1)}}}n+=o}return{p:e[0],t:{x:1,z:0}}}function vd(e){let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n].x-e[n-1].x,e[n].z-e[n-1].z);return t}var yd=40,bd=(e,t)=>e*100003+t,xd=class{constructor(){e(this,`roads`,void 0),e(this,`junctions`,void 0),e(this,`buildings`,void 0),e(this,`obstacles`,void 0),e(this,`spawns`,void 0),e(this,`blocks`,void 0),e(this,`trees`,void 0),e(this,`lamps`,void 0),e(this,`grid`,new Map),e(this,`obstacleGrid`,new Map),this.junctions=Zu(),this.roads=[...td(this.junctions),od(this.junctions),...dd()];for(let e of this.junctions)for(let t of this.roads)if(!t.closed)for(let n of[!0,!1]){let r=t.pts.length,i=n?t.pts[0]:t.pts[r-1],a=n?t.pts[1]:t.pts[r-2];if(Math.hypot(i.x-e.x,i.z-e.z)>Qu(e)+.6)continue;let o=Math.hypot(a.x-e.x,a.z-e.z)||1;e.arms.push({x:(a.x-e.x)/o,z:(a.z-e.z)/o})}for(let e of this.roads)this.index(e);this.blocks=this.buildBlocks(),this.buildings=this.buildBuildings();let t=this.buildFurniture();this.trees=t.trees,this.lamps=t.lamps;let n=(e,t)=>({minX:e.x-t,maxX:e.x+t,minZ:e.z-t,maxZ:e.z+t});this.obstacles=[...this.buildings,...Sd(),...zu(),...this.trees.map(e=>n(e,.35)),...this.lamps.map(e=>n(e,.15))];for(let e of this.obstacles)this.indexBox(e);this.spawns=[{id:`centro`,name:`Centro`,...this.roadPose(`h3-1`,25,0)},{id:`cuesta`,name:`Pie de la cuesta`,...this.roadPose(`h1-0`,12,1)},{id:`rotonda`,name:`Acceso a la rotonda`,...this.roadPose(`h2-1`,50,0)},{id:`autovia`,name:`Ramal de la autovía`,x:300,z:-60,heading:Math.PI/2},{id:`maniobras`,name:`Zona de maniobras`,x:-390,z:275,heading:Math.PI/2}]}roadPose(e,t,n){let r=this.roads.find(t=>t.id===e),i=r.lanes[n],a=vd(r.pts),{p:o,t:s}=_d(r.pts,i.dir===1?t:a-t),c={x:-s.z,z:s.x},l=Math.atan2(s.x*i.dir,s.z*i.dir);return{x:o.x+c.x*i.offset,z:o.z+c.z*i.offset,heading:l}}buildBlocks(){let e=(e,t)=>this.junctions.find(n=>n.xi===e&&n.zi===t),t=e=>this.roads.find(t=>t.id===e),n=[];for(let r=0;r<Eu.length-1;r++)for(let i=0;i<Du.length-1;i++){let a=[e(r,i),e(r+1,i),e(r+1,i+1),e(r,i+1)],o=[{road:t(`h${i}-${r}`),from:a[0],to:a[1]},{road:t(`v${r+1}-${i}`),from:a[1],to:a[2]},{road:t(`h${i+1}-${r}`),from:a[2],to:a[3]},{road:t(`v${r}-${i}`),from:a[3],to:a[0]}],s={x:a.reduce((e,t)=>e+t.x,0)/4,z:a.reduce((e,t)=>e+t.z,0)/4};n.push({i:r,j:i,corners:a,edges:o,center:s})}return n}buildBuildings(){let e=Ju(1234),t=[],n=[`residencial`,`residencial`,`antiguo`,`oficinas`,`moderno`];for(let r of this.blocks)if(r.i!==hd.i||r.j!==hd.j){for(let i of r.edges){let a=i.road.pts,o=vd(a),s=_d(a,o/2),c=Math.sign((r.center.x-s.p.x)*-s.t.z+(r.center.z-s.p.z)*s.t.x)||1,l=i.road.axis===`v`?36:12,u=l;for(;u<o-l-8;){let i=12+e()*12;if(u+i>o-l&&(i=o-l-u),i<8)break;let{p:s,t:d}=_d(a,u+i/2),f=15+e()*11,p={x:-d.z*c,z:d.x*c},m=7.1,h={cx:s.x+p.x*(m+f/2),cz:s.z+p.z*(m+f/2),ux:d.x,uz:d.z,hu:i/2,hv:f/2};if(u+=i+(e()<.2?6+e()*5:e()*1.5),Math.hypot(h.cx-ku.x,h.cz-ku.z)<44||t.some(e=>Cu(e.obb,h,.5)))continue;let g=xu(h);if([...g,...g.map((e,t)=>({x:(e.x+g[(t+1)%4].x)/2,z:(e.z+g[(t+1)%4].z)/2}))].some(e=>this.query(e.x,e.z).surface!==`fuera`))continue;let _=1-Math.min(1,Math.hypot(h.cx,h.cz)/300),v=r.i===pd.i&&r.j===pd.j,y=v?(e(),`industrial`):n[Math.floor(e()*n.length)],b=v?(e(),1+(r.i+Math.round(h.cx))%2*.8):y===`antiguo`?3+Math.floor(e()*3):3+Math.floor(e()*(4+_*16)),x=g.map(e=>Hu(e.x,e.z)),S=fd[y];t.push({...wu(h),obb:h,style:y,base:Math.min(...x)-1,height:Math.max(...x)+4.2+b*3.2,color:S[Math.floor(e()*S.length)]})}}for(let n=0;n<2;n++){let i=r.edges[n*2],a=vd(i.road.pts),{t:o}=_d(i.road.pts,a/2),s={cx:r.center.x+(e()*2-1)*8+(n===0?-12:12)*o.x,cz:r.center.z+(e()*2-1)*8+(n===0?-12:12)*o.z,ux:o.x,uz:o.z,hu:7+e()*6,hv:6+e()*5};if(Math.hypot(s.cx-ku.x,s.cz-ku.z)<44||t.some(e=>Cu(e.obb,s,4)))continue;let c=xu(s);if(c.some(e=>this.query(e.x,e.z).surface!==`fuera`))continue;let l=c.map(e=>Hu(e.x,e.z)),u=r.i===pd.i&&r.j===pd.j,d=1+Math.floor(e()*3),f=Math.floor(e()*5);t.push({...wu(s),obb:s,style:u?`industrial`:`residencial`,base:Math.min(...l)-1,height:Math.max(...l)+(u?7:4.2+d*3.2),color:u?fd.industrial[f%4]:fd.residencial[f]})}}return t}cityOutline(){let e=(e,t)=>this.junctions.find(n=>n.xi===e&&n.zi===t),t=Eu.length-1,n=Du.length-1,r=[];for(let n=0;n<=t;n++)r.push(e(n,0));for(let i=1;i<=n;i++)r.push(e(t,i));for(let i=t-1;i>=0;i--)r.push(e(i,n));for(let t=n-1;t>=1;t--)r.push(e(0,t));return r.map(e=>({x:e.x,z:e.z}))}buildFurniture(){let e=[],t=[];for(let n of this.roads){if(n.kind!==`calle`)continue;let r=vd(n.pts);if(n.rural){let t=Ju(77);for(let i=30;i<r-30;i+=22){let{p:r,t:a}=_d(n.pts,i),o=(t()<.5?1:-1)*(n.width/2+6+t()*4);t()<.55&&e.push({x:r.x-a.z*o,z:r.z+a.x*o})}}else{for(let t=12;t<r-10;t+=16){let{p:r,t:i}=_d(n.pts,t);for(let t of[1,-1]){let a=t*(n.width/2+2.3);e.push({x:r.x-i.z*a,z:r.z+i.x*a})}}for(let e=20;e<r-10;e+=32){let{p:r,t:i}=_d(n.pts,e);for(let e of[1,-1]){let a=e*(n.width/2+.6),o=-i.z,s=i.x;t.push({x:r.x+o*a,z:r.z+s*a,heading:Math.atan2(-o*e,-s*e)})}}}}let n=Ju(99),r=this.blocks.find(e=>e.i===hd.i&&e.j===hd.j),i=r.corners.map(e=>({x:e.x,z:e.z}));for(let t=0;t<90;t++){let t=r.center.x+(n()*2-1)*55,a=r.center.z+(n()*2-1)*55;gd({x:t,z:a},i)&&this.query(t,a).surface===`fuera`&&(Math.hypot(t-ku.x,a-ku.z)<26||e.some(e=>Math.hypot(e.x-t,e.z-a)<7)||e.push({x:t,z:a}))}let a=0,o=0;for(;o<380&&a++<6e3;){let t=(n()*2-1)*760,r=(n()*2-1)*760;if(Math.abs(t)<280&&Math.abs(r)<218||Math.abs(r-ju.z)<50&&t>ju.x0-10&&t<ju.x1+10)continue;let i=!0;for(let[e,n]of[[0,0],[9,0],[-9,0],[0,9],[0,-9]])this.query(t+e,r+n).surface!==`fuera`&&(i=!1);i&&(e.push({x:t,z:r}),o++)}return{trees:e,lamps:t}}index(e){let t=e.pts.length,n=e.closed?t:t-1,r=0;for(let i=0;i<n;i++){let n=e.pts[i],a=e.pts[(i+1)%t],o=e.widths?.[i]??e.width,s=e.widths?.[(i+1)%t]??e.width,c=Math.hypot(a.x-n.x,a.z-n.z),l={road:e,i,ax:n.x,az:n.z,bx:a.x,bz:a.z,len:c,s0:r,wa:o,wb:s};r+=c;let u=Math.max(o,s)/2+3+1;this.forCells(Math.min(n.x,a.x)-u,Math.max(n.x,a.x)+u,Math.min(n.z,a.z)-u,Math.max(n.z,a.z)+u,e=>{let t=this.grid.get(e);t?t.push(l):this.grid.set(e,[l])})}}indexBox(e){this.forCells(e.minX-2,e.maxX+2,e.minZ-2,e.maxZ+2,t=>{let n=this.obstacleGrid.get(t);n?n.push(e):this.obstacleGrid.set(t,[e])})}forCells(e,t,n,r,i){for(let a=Math.floor(e/yd);a<=Math.floor(t/yd);a++)for(let e=Math.floor(n/yd);e<=Math.floor(r/yd);e++)i(bd(a,e))}obstaclesNear(e,t){return this.obstacleGrid.get(bd(Math.floor(e/yd),Math.floor(t/yd)))??[]}query(e,t){for(let n of this.junctions){let r=e-n.x,i=t-n.z,a=Math.hypot(r,i),o=()=>n.arms.some(e=>r*e.x+i*e.z>0&&Math.abs(-r*e.z+i*e.x)<=7/2);if(n.kind===`rotonda`){if(a>ku.rOut+3+1)continue;let e=Math.atan2(i,-r);if(a<ku.rIn)return{surface:`isleta`,junction:n,lateral:0,heading:e,limit:30,s:0};if(a<=ku.rOut)return{surface:`calzada`,junction:n,lateral:a-(ku.rIn+ku.rOut)/2,heading:e,limit:30,s:0};if(a<=ku.rOut+3&&!o())return{surface:`acera`,junction:n,lateral:0,heading:e,limit:30,s:0}}else{if(a>10)continue;if(a<=7)return{surface:`calzada`,junction:n,lateral:0,heading:0,limit:30,s:0};if(!o())return{surface:`acera`,junction:n,lateral:0,heading:0,limit:30,s:0}}}if(Bu(e,t))return{surface:`calzada`,lateral:0,heading:0,limit:20,s:0,area:`maniobras`};let n=this.grid.get(bd(Math.floor(e/yd),Math.floor(t/yd))),r=null;if(n)for(let i of n){let n=i.bx-i.ax,a=i.bz-i.az,o=Math.max(0,Math.min(1,((e-i.ax)*n+(t-i.az)*a)/(i.len*i.len||1))),s=i.ax+n*o,c=i.az+a*o,l=Math.hypot(e-s,t-c),u=i.wa+(i.wb-i.wa)*o,d=((e-s)*-a+(t-c)*n)/(i.len||1);l<=u/2+(i.road.sidewalk?3:.5)&&(!r||l-u/2<r.d-r.w/2)&&(r={seg:i,d:l,lat:d,w:u,t:o})}if(!r)return{surface:`fuera`,lateral:0,heading:0,limit:90,s:0};let{seg:i,lat:a,w:o,t:s}=r,c=i.road,l=Math.atan2(i.bx-i.ax,i.bz-i.az),u=i.s0+i.len*s,d={road:c,lateral:a,heading:l,limit:nd(c,u),s:u};return c.median&&Math.abs(a)<c.median/2?{...d,surface:`mediana`}:Math.abs(a)<=o/2?c.kind===`autovia`&&Math.abs(a)>ld?{...d,surface:`arcen`}:{...d,surface:`calzada`}:{...d,surface:c.sidewalk?`acera`:`fuera`}}drivable(e,t){let n=this.query(e,t).surface;return n===`calzada`||n===`arcen`}};function Sd(){let{z:e,x0:t,x1:n,halfWidth:r}=ju;return[{minX:t,maxX:n,minZ:e-r-1,maxZ:e-r},{minX:t,maxX:n,minZ:e+r,maxZ:e+r+1},{minX:t,maxX:n,minZ:e-45,maxZ:e-r-1},{minX:t,maxX:n,minZ:e+r+1,maxZ:e+45}]}var Cd=null;function wd(){return Cd??=new xd,Cd}function Td(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Ed=(e,t=32)=>Math.max(t,2**Math.round(Math.log2(e)));function Dd(e,t,n){let r=Math.max(1,Math.round(t)),i=new Float32Array(r*r);for(let e=0;e<i.length;e++)i[e]=n();let a=new Float32Array(e*e),o=r/e;for(let t=0;t<e;t++){let n=t*o,s=Math.floor(n),c=n-s;c=c*c*(3-2*c);let l=s%r*r,u=(s+1)%r*r;for(let n=0;n<e;n++){let s=n*o,d=Math.floor(s),f=s-d;f=f*f*(3-2*f);let p=d%r,m=(d+1)%r,h=i[l+p]+(i[l+m]-i[l+p])*f,g=i[u+p]+(i[u+m]-i[u+p])*f;a[t*e+n]=h+(g-h)*c}}return a}function Od(e,t,n,r){let i=new Float32Array(e*e),a=1,o=0;for(let s=0;s<n;s++){let n=Dd(e,Math.min(e,t*2**s),r);for(let e=0;e<i.length;e++)i[e]+=n[e]*a;o+=a,a*=.5}let s=1/0,c=-1/0;for(let e=0;e<i.length;e++)i[e]/=o,s=Math.min(s,i[e]),c=Math.max(c,i[e]);let l=c-s||1;for(let e=0;e<i.length;e++)i[e]=(i[e]-s)/l;return i}function kd(e,t,n,r){let i=document.createElement(`canvas`);i.width=e,i.height=t;let a=i.getContext(`2d`),o=a.createImageData(e,t);for(let r=0;r<e*t;r++)n(r,o.data,r*4),o.data[r*4+3]=255;return a.putImageData(o,0,0),Ad(new _i(i),r)}function Ad(e,t){return e.wrapS=e.wrapT=_,e.colorSpace=t?Ze:``,e.anisotropy=4,e.generateMipmaps=!0,e.minFilter=T,e.magFilter=C,e}function jd(){let e=Od(256,4,5,Td(15));return kd(256,256,(t,n,r)=>{n[r]=n[r+1]=n[r+2]=e[t]*255},!1)}function Md(e){let t=Ed(512*e,64),n=Td(16),r=Od(t,6,4,n),i=Dd(t,t/2,n);return kd(t,t,(e,t,n)=>{let a=r[e]*.75+i[e]*.45;t[n]=t[n+1]=t[n+2]=a>.42?255:0},!1)}function Nd(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,`rgb(255,255,255)`),n.addColorStop(.55,`rgb(150,150,150)`),n.addColorStop(1,`rgb(0,0,0)`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=new _i(e);return r.colorSpace=``,r}function Pd(e,t){let n=Ed(512*t,128),r=n/2,i=n/512,a=document.createElement(`canvas`);a.width=n,a.height=r;let o=a.getContext(`2d`),s=Td(e.length*7+1);o.scale(i,i),o.fillStyle=e===`oficinas`?`#a3adb8`:e===`moderno`?`#e6e5e0`:`#f2f0eb`,o.fillRect(0,0,512,256);for(let e=0;e<1400;e++){o.fillStyle=`rgba(${s()<.5?`0,0,0`:`255,255,255`},${s()*.05})`;let e=1+s()*3;o.fillRect(s()*512,s()*256,e,e)}let c=(e,t,n,r)=>{let i=o.createLinearGradient(e,t,e+n*.6,t+r);i.addColorStop(0,`#8aa3bb`),i.addColorStop(.45,`#4b6077`),i.addColorStop(1,`#1f2a36`),o.fillStyle=i,o.fillRect(e,t,n,r);let a=s();if(a<.3)o.fillStyle=`rgba(${200+s()*50},${190+s()*40},${170+s()*40},0.75)`,o.fillRect(e,t,n*(.25+s()*.2),r),o.fillRect(e+n*(.6+s()*.15),t,n,r);else if(a<.5){let i=r*(.2+s()*.6);o.fillStyle=`#c9c2b4`,o.fillRect(e,t,n,i),o.fillStyle=`rgba(0,0,0,0.18)`;for(let r=t+3;r<t+i;r+=3)o.fillRect(e,r,n,1)}else a<.58&&(o.fillStyle=`rgba(255,226,160,0.35)`,o.fillRect(e+2,t+r*.4,n-4,r*.6-2));o.fillStyle=`rgba(255,255,255,0.18)`,o.beginPath(),o.moveTo(e,t+r*.15),o.lineTo(e+n*.5,t),o.lineTo(e+n*.75,t),o.lineTo(e,t+r*.55),o.fill()},l=(e,t,n,r,i)=>{o.strokeStyle=i,o.lineWidth=3,o.strokeRect(e,t,n,r),o.lineWidth=2,o.beginPath(),o.moveTo(e+n/2,t),o.lineTo(e+n/2,t+r),o.stroke()},u=[0,128];if(e===`industrial`){o.fillStyle=`#e4e6e8`,o.fillRect(0,0,512,256);for(let e=0;e<512;e+=8)o.fillStyle=`rgba(0,0,0,0.10)`,o.fillRect(e,0,3,256),o.fillStyle=`rgba(255,255,255,0.18)`,o.fillRect(e+4,0,1,256);for(let e=16;e<512;e+=64)c(e,18,48,22);for(let e of[40,296]){o.fillStyle=`#9aa3ac`,o.fillRect(e,120,176,136),o.fillStyle=`rgba(0,0,0,0.25)`;for(let t=128;t<256;t+=16)o.fillRect(e,t,176,2);o.strokeStyle=`#d9a21b`,o.lineWidth=6,o.strokeRect(e-3,117,182,139)}let e=o.createLinearGradient(0,200,0,256);e.addColorStop(0,`rgba(60,50,40,0)`),e.addColorStop(1,`rgba(60,50,40,0.2)`),o.fillStyle=e,o.fillRect(0,200,512,56)}else if(e===`oficinas`)for(let e of u){for(let t=0;t<4;t++)c(4+t*128,e+10,120,104);o.fillStyle=`#c9d0d7`;for(let t=0;t<=4;t++)o.fillRect(t*128-3,e,6,128);o.fillStyle=`#7d8893`,o.fillRect(0,e+114,512,14)}else if(e===`moderno`)for(let e of u){o.fillStyle=`#2e3a47`,o.fillRect(0,e+26,512,70),c(0,e+30,512,62),o.fillStyle=`rgba(30,36,44,0.8)`;for(let t=0;t<=8;t++)o.fillRect(t*64-1,e+30,2,62);o.fillStyle=`#d9d8d2`,o.fillRect(0,e+96,512,32),o.fillStyle=`rgba(0,0,0,0.12)`,o.fillRect(0,e+96,512,3)}else for(let t of u){for(let n=0;n<4;n++){let r=36+n*128,i=t+24;if(o.fillStyle=e===`antiguo`?`#d8d0c0`:`#e2e2de`,o.fillRect(r-6,i-8,68,8),o.fillRect(r-8,i+78,72,6),c(r,i,56,78),l(r,i,56,78,e===`antiguo`?`#5a4a3a`:`#eeeeea`),e===`antiguo`){if(o.fillStyle=s()<.5?`#3f6b4a`:`#5b4a33`,s()<.7){o.fillRect(r-24,i,20,78),o.fillRect(r+56+4,i,20,78),o.fillStyle=`rgba(0,0,0,0.2)`;for(let e=i+4;e<i+78;e+=6)o.fillRect(r-24,e,20,2),o.fillRect(r+56+4,e,20,2)}else{o.fillRect(r,i,56,78),o.fillStyle=`rgba(0,0,0,0.2)`;for(let e=i+4;e<i+78;e+=6)o.fillRect(r,e,56,2)}}else if(s()<.6){o.fillStyle=`rgba(0,0,0,0.2)`,o.fillRect(r-14,i+78+6,84,4),o.fillStyle=`#2f343b`,o.fillRect(r-14,i+78-22,84,3);for(let e=0;e<=14;e++)o.fillRect(r-14+e*6,i+78-22,2,28)}let a=o.createLinearGradient(0,i+78+6,0,i+78+46);a.addColorStop(0,`rgba(60,50,40,0.18)`),a.addColorStop(1,`rgba(60,50,40,0)`),o.fillStyle=a,o.fillRect(r-4,i+78+6,64,40)}o.fillStyle=`rgba(0,0,0,0.07)`,o.fillRect(0,t+122,512,6)}return Ad(new _i(a),!0)}function Fd(e){let t=Ed(1024*e,256),n=t/4,r=t/1024,i=document.createElement(`canvas`);i.width=t,i.height=n;let a=i.getContext(`2d`),o=Td(21);a.scale(r,r),a.fillStyle=`#d6d0c6`,a.fillRect(0,0,1024,256);for(let e=0;e<900;e++)a.fillStyle=`rgba(0,0,0,${o()*.05})`,a.fillRect(o()*1024,o()*256,2,2);a.fillStyle=`#8f8a80`,a.fillRect(0,236,1024,20);let s=[`#b3261e`,`#1d3f8a`,`#2e5c3a`,`#c79a2b`,`#5b3b8c`,`#1f6f78`,`#333333`];for(let e=0;e<4;e++){let t=e*256+10,n=s[Math.floor(o()*s.length)];a.fillStyle=n,a.fillRect(t,22,170,30),a.fillStyle=`rgba(255,255,255,0.85)`;let r=t+12;for(;r<t+150;){let e=6+o()*10;a.fillRect(r,30,e,14),r+=e+4+(o()<.2?10:0)}if(o()<.25){a.fillStyle=`#8b9096`,a.fillRect(t,60,170,176),a.fillStyle=`rgba(0,0,0,0.25)`;for(let e=64;e<236;e+=6)a.fillRect(t,e,170,2)}else{let e=a.createLinearGradient(0,60,0,236);e.addColorStop(0,`#3b4a5c`),e.addColorStop(1,`#1b232d`),a.fillStyle=e,a.fillRect(t,60,170,176),a.fillStyle=`rgba(255,240,205,0.28)`,a.fillRect(t+6,90,158,120);for(let e=120;e<210;e+=30){a.fillStyle=`rgba(40,30,20,0.5)`,a.fillRect(t+10,e,150,3);for(let n=t+12;n<t+156;n+=8+o()*8)a.fillStyle=`hsla(${o()*360},45%,${45+o()*20}%,0.7)`,a.fillRect(n,e-6-o()*10,5,16)}if(a.fillStyle=`rgba(255,255,255,0.16)`,a.fillRect(t+8,64,30,168),a.strokeStyle=`#2a2f36`,a.lineWidth=4,a.strokeRect(t,60,170,176),o()<.6){a.fillStyle=n,a.beginPath(),a.moveTo(t-6,56),a.lineTo(t+176,56),a.lineTo(t+168,84),a.lineTo(t+2,84),a.fill(),a.fillStyle=`rgba(255,255,255,0.35)`;for(let e=t;e<t+170;e+=22)a.fillRect(e,56,10,28)}}a.fillStyle=`#4a3a2c`,a.fillRect(t+192,92,48,144),a.fillStyle=`rgba(255,255,255,0.12)`,a.fillRect(t+198,100,16,70),a.fillStyle=`#c8b27a`,a.fillRect(t+230,160,4,10)}let c=a.createLinearGradient(0,200,0,256);return c.addColorStop(0,`rgba(50,40,30,0)`),c.addColorStop(1,`rgba(50,40,30,0.25)`),a.fillStyle=c,a.fillRect(0,200,1024,56),Ad(new _i(i),!0)}function Id(e){return{uDetail:{value:e},uDetailK:{value:1},uWet:{value:0}}}var Ld=`
mat3 pbrFrame(vec3 eye_pos, vec3 surf_norm, vec2 st0, vec2 st1) {
  vec3 q0 = dFdx(eye_pos.xyz);
  vec3 q1 = dFdy(eye_pos.xyz);
  vec3 q1perp = cross(q1, surf_norm);
  vec3 q0perp = cross(surf_norm, q0);
  vec3 T = q1perp * st0.x + q0perp * st1.x;
  vec3 B = q1perp * st0.y + q0perp * st1.y;
  float det = max(dot(T, T), dot(B, B));
  float scale = (det == 0.0) ? 0.0 : inversesqrt(det);
  return mat3(T * scale, B * scale, surf_norm);
}
`,Rd=`
uniform sampler2D uDetail;
uniform float uDetailK;
float pbrDetail(vec2 uv, float amount, float dist) {
  float fd = uDetailK * (1.0 - smoothstep(5.0, 24.0, dist));
  if (fd < 0.004) return 1.0;
  return 1.0 + (texture2D(uDetail, uv * 8.0).r - 0.5) * amount * fd;
}
`;function zd(e,t,n,r){let i={uPbrA:{value:t.albedo},uPbrN:{value:t.normal},uPbrP:{value:t.packed}},a=e=>e.toFixed(4),o=r.albedo??1.2,s=r.normal??1,c=r.ao??.7,l=r.detail??.35,u=r.space===`world`;return e.onBeforeCompile=e=>{Object.assign(e.uniforms,i,n);let t=u?`
        vec4 pbrW = vec4(transformed, 1.0);
        vec3 pbrNn = objectNormal;
        #ifdef USE_INSTANCING
          pbrW = instanceMatrix * pbrW;
          pbrNn = mat3(instanceMatrix) * pbrNn;
        #endif
        vPbrP = (modelMatrix * pbrW).xyz;
        vPbrN = mat3(modelMatrix) * pbrNn;
      `:`vPbrP = transformed;
vPbrN = objectNormal;
`,d=`
      uniform sampler2D uPbrA;
      uniform sampler2D uPbrN;
      uniform sampler2D uPbrP;
      varying vec3 vPbrP;
      varying vec3 vPbrN;
      vec2 gUv; vec2 gDx; vec2 gDy; vec4 gPk;
      ${Ld}
      ${Rd}
    `,f=`
      {
        // Proyección por el eje dominante. Las derivadas salen de la posición (continua),
        // así no aparecen líneas en el cambio de eje.
        vec3 an = abs(vPbrN);
        vec3 p = vPbrP * ${a(1/r.tile)};
        vec3 px = dFdx(p), py = dFdy(p);
        if (an.y >= an.x && an.y >= an.z) { gUv = p.xz; gDx = px.xz; gDy = py.xz; }
        else if (an.x > an.z) { gUv = p.zy; gDx = px.zy; gDy = py.zy; }
        else { gUv = p.xy; gDx = px.xy; gDy = py.xy; }
        gPk = textureGrad(uPbrP, gUv, gDx, gDy);
        ${o>0?`diffuseColor.rgb *= textureGrad(uPbrA, gUv, gDx, gDy).rgb * ${a(o)};`:``}
        diffuseColor.rgb *= mix(1.0, gPk.r, ${a(c)});
        ${l>0?`diffuseColor.rgb *= pbrDetail(gUv, ${a(l)}, length(vViewPosition));`:``}
      }
    `,p=`roughnessFactor = clamp(${r.clearcoatScratch?`roughnessFactor + `:``}gPk.g * ${a(r.roughMul??1)} + ${a(r.roughAdd??0)}, 0.04, 1.0);\n`,m=s>0?`
      {
        vec3 pn = textureGrad(uPbrN, gUv, gDx, gDy).xyz * 2.0 - 1.0;
        pn.xy *= ${a(s)};
        normal = normalize(pbrFrame(-vViewPosition, normal, gDx, gDy) * pn);
      }
    `:``;e.vertexShader=`varying vec3 vPbrP;
varying vec3 vPbrN;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+t);let h=d+e.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
`+f);h=h.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
`+p),m&&(h=h.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
`+m)),r.clearcoatScratch&&(h=h.replace(`#include <lights_physical_fragment>`,`#include <lights_physical_fragment>\nmaterial.clearcoatRoughness = clamp(material.clearcoatRoughness + gPk.g * ${a(r.clearcoatScratch)}, 0.0525, 1.0);\n`)),e.fragmentShader=h},e.customProgramCacheKey=()=>`pbr-${r.space}-${r.tile}-${o}-${s}-${c}-${l}-${r.roughMul??1}-${r.roughAdd??0}-${r.clearcoatScratch??0}`,e.needsUpdate=!0,{set(e){i.uPbrA.value=e.albedo,i.uPbrN.value=e.normal,i.uPbrP.value=e.packed}}}function Bd(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Vd=e=>e<0?0:e>1?1:e,X=(e,t,n)=>{let r=Vd((n-e)/(t-e));return r*r*(3-2*r)};function Hd(e,t,n,r,i){let a=Math.max(1,Math.min(t,Math.round(n))),o=new Float32Array(a*a);for(let e=0;e<o.length;e++)o[e]=r();let s=a/t,c=new Int32Array(t),l=new Int32Array(t),u=new Float32Array(t);for(let e=0;e<t;e++){let t=e*s,n=Math.floor(t),r=t-n;c[e]=n%a,l[e]=(n+1)%a,u[e]=r*r*(3-2*r)}for(let n=0;n<t;n++){let r=n*s,d=Math.floor(r),f=r-d;f=f*f*(3-2*f);let p=d%a*a,m=(d+1)%a*a,h=n*t;for(let n=0;n<t;n++){let t=o[p+c[n]],r=o[p+l[n]],a=o[m+c[n]],s=o[m+l[n]],d=u[n],g=t+(r-t)*d;e[h+n]+=(g+(a+(s-a)*d-g)*f)*i}}}function Ud(e){let t=1/0,n=-1/0;for(let r=0;r<e.length;r++){let i=e[r];i<t&&(t=i),i>n&&(n=i)}let r=1/(n-t||1);for(let n=0;n<e.length;n++)e[n]=(e[n]-t)*r;return e}function Z(e,t,n,r,i=.5){let a=new Float32Array(e*e),o=1;for(let s=0;s<n;s++){let n=t*2**s;if(n>e)break;Hd(a,e,n,r,o),o*=i}return Ud(a)}function Wd(e,t,n,r){let i=Z(e,t,n,r);for(let e=0;e<i.length;e++)i[e]=1-Math.abs(i[e]*2-1);return i}function Gd(e,t,n,r=1){let i=new Float32Array(t*t),a=new Float32Array(t*t),o=new Float32Array(t*t);for(let e=0;e<i.length;e++)i[e]=.5+(n()-.5)*r,a[e]=.5+(n()-.5)*r,o[e]=n();let s=new Float32Array(e*e),c=new Float32Array(e*e),l=new Float32Array(e*e),u=t/e;for(let n=0;n<e;n++){let r=n*u,d=Math.floor(r);for(let f=0;f<e;f++){let p=f*u,m=Math.floor(p),h=9,g=9,_=0;for(let e=-1;e<=1;e++){let n=((d+e)%t+t)%t;for(let o=-1;o<=1;o++){let s=((m+o)%t+t)%t,c=n*t+s,l=m+o+i[c]-p,u=d+e+a[c]-r,f=l*l+u*u;f<h?(g=h,h=f,_=c):f<g&&(g=f)}}let v=n*e+f,y=Math.sqrt(h),b=Math.sqrt(g);s[v]=y,c[v]=b-y,l[v]=o[_]}}return{f1:s,edge:c,id:l}}function Kd(e,t,n,r,i,a,o=`max`,s=.5){let c=Math.ceil(i);for(let l=-c;l<=c;l++){let u=((Math.round(r)+l)%t+t)%t;for(let r=-c;r<=c;r++){let c=Math.hypot(r,l)/i;if(c>=1)continue;let d=(1-X(s,1,c))*a,f=u*t+((Math.round(n)+r)%t+t)%t;o===`max`?d>e[f]&&(e[f]=d):o===`min`?d<e[f]&&(e[f]=d):e[f]+=d}}}function qd(e,t,n,r,i,a,o,s,c=`max`){let l=Math.hypot(i-n,a-r),u=Math.max(1,Math.ceil(l/Math.max(.5,o*.5)));for(let l=0;l<=u;l++){let d=l/u;Kd(e,t,n+(i-n)*d,r+(a-r)*d,Math.max(.75,o),s,c,.35)}}function Jd(e,t,n,r,i=.035){let a=new Float32Array(e*e),o=(n,r,s,c,l,u)=>{let d=Math.max(2,e/256);for(let f=0;f<l;f++){s+=(t()-.5)*.7;let f=n+Math.cos(s)*d,p=r+Math.sin(s)*d;qd(a,e,n,r,f,p,c,1,`max`),n=f,r=p,c*=.996,u<3&&t()<i&&o(n,r,s+(t()<.5?1:-1)*(.5+t()*.8),c*.7,l*.45,u+1)}};for(let i=0;i<n;i++)o(t()*e,t()*e,t()*Math.PI*2,r,e/Math.max(2,e/256)*(.25+t()*.45),0);return a}function Yd(e,t,n){let r=Math.max(1,Math.round(n)),i=new Float32Array(t*t),a=new Float32Array(t*t),o=1/(2*r+1);for(let n=0;n<t;n++){let a=n*t,s=0;for(let n=-r;n<=r;n++)s+=e[a+(n%t+t)%t];for(let n=0;n<t;n++)i[a+n]=s*o,s+=e[a+(n+r+1)%t]-e[a+((n-r)%t+t)%t]}for(let e=0;e<t;e++){let n=0;for(let a=-r;a<=r;a++)n+=i[(a%t+t)%t*t+e];for(let s=0;s<t;s++)a[s*t+e]=n*o,n+=i[(s+r+1)%t*t+e]-i[((s-r)%t+t)%t*t+e]}return a}function Xd(e,t,n){let r=new Uint8Array(t*t*4);for(let i=0;i<t;i++){let a=(i-1+t)%t*t,o=i*t,s=(i+1)%t*t;for(let i=0;i<t;i++){let c=(i-1+t)%t,l=(i+1)%t,u=e[a+c],d=e[a+i],f=e[a+l],p=e[o+c],m=e[o+l],h=e[s+c],g=e[s+i],_=e[s+l],v=f+2*m+_-(u+2*p+h),y=h+2*g+_-(u+2*d+f),b=-v*n,x=y*n,S=1/Math.sqrt(b*b+x*x+1),C=(o+i)*4;r[C]=(b*S*.5+.5)*255,r[C+1]=(x*S*.5+.5)*255,r[C+2]=(S*.5+.5)*255,r[C+3]=255}}return r}function Zd(e,t,n,r){let i=Yd(e,t,n),a=new Float32Array(t*t);for(let t=0;t<a.length;t++)a[t]=Vd(1-Math.max(0,i[t]-e[t])*r);return a}function Qd(e,t){let n=t>>1,r=new Uint8Array(n*n*4);for(let i=0;i<n;i++)for(let a=0;a<n;a++){let o=(i*2*t+a*2)*4,s=o+4,c=o+t*4,l=c+4,u=(i*n+a)*4;for(let t=0;t<4;t++)r[u+t]=e[o+t]+e[s+t]+e[c+t]+e[l+t]+2>>2}return r}var $d=e=>e<=0?0:e>=1?255:e*255+.5|0;function ef(e,t,n,r,i){let a=new Uint8Array(e*e*4),o=new Uint8Array(e*e*4),s=r>0?Zd(t,e,Math.max(2,e/96),r):null,c=new Float32Array(5);for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*e+n,l=r*4;c[4]=0,i(r,n,t,c),a[l]=$d(c[0]),a[l+1]=$d(c[1]),a[l+2]=$d(c[2]),a[l+3]=255,o[l]=$d(s?s[r]:1),o[l+1]=$d(c[3]),o[l+2]=$d(c[4]),o[l+3]=255}return{size:e,albedo:a,normal:Xd(t,e,e/1024*n),packed:o}}function tf(e){let t=Bd(101),n=Z(e,e/6,3,t,.6),r=Gd(e,Math.round(e/9),t),i=Z(e,3,5,t),a=Z(e,2,4,t),o=Z(e,4,4,t),s=Gd(e,7,t),c=Jd(e,t,5,Math.max(.8,e/520)),l=new Float32Array(e*e),u=new Float32Array(e*e);for(let n=0;n<3;n++)Kd(l,e,t()*e,t()*e,e*(.022+t()*.02),1,`max`,.3);for(let n=0;n<7;n++)Kd(u,e,t()*e,t()*e,e*(.02+t()*.05),.5+t()*.5,`max`,.1);let d=new Float32Array(e*e),f=new Float32Array(e*e);for(let n=0;n<2;n++){let n=Math.floor(t()*e),r=Math.floor(t()*e),i=Math.floor(e*(.14+t()*.14)),a=Math.floor(e*(.1+t()*.12));for(let t=0;t<a;t++)for(let a=0;a<i;a++)d[(r+t)%e*e+(n+a)%e]=1;let o=Math.max(1,e/340);qd(f,e,n,r,n+i,r,o,1),qd(f,e,n,r+a,n+i,r+a,o,1),qd(f,e,n,r,n,r+a,o,1),qd(f,e,n+i,r,n+i,r+a,o,1)}let p=new Float32Array(e*e),m=new Float32Array(e*e);for(let e=0;e<m.length;e++){let t=(1-X(0,.022,s.edge[e]))*X(.56,.7,o[e]),i=Math.max(c[e],t)*(1-d[e]);p[e]=i;let u=1-X(.15,.6,r.f1[e]);m[e]=.5+(n[e]-.5)*.5+u*.22*(1-d[e]*.5)-i*.9-l[e]*.7+d[e]*.05+f[e]*.08+(a[e]-.5)*.25}let h=Ud(Yd(a,e,e/48));return ef(e,m,5.5,5,(e,t,o,s)=>{let c=1-X(.15,.6,r.f1[e]),m=r.id[e]>.82?c*.16:r.id[e]<.15?-c*.07:0,g=.3+(n[e]-.5)*.13+(i[e]-.5)*.14+m;g*=1-d[e]*.2,g*=1-u[e]*.38,g*=1-p[e]*.7,g*=1-l[e]*.45,g*=1-f[e]*.6;let _=(a[e]-.5)*.025;s[0]=g+_,s[1]=g+_*.4,s[2]=g-_+.008,s[3]=Vd(.9-u[e]*.42-d[e]*.1-f[e]*.3+p[e]*.06-(r.id[e]>.6?c*.1:0)+(i[e]-.5)*.08),s[4]=Vd(X(.52,.3,h[e])+l[e])})}function nf(e){let t=Bd(202),n=Z(e,e/5,3,t,.6),r=Z(e,5,5,t),i=Gd(e,14,t),a=Z(e,24,4,t),o=new Float32Array(e*e);for(let e=0;e<o.length;e++)o[e]=.5+(n[e]-.5)*.35-(1-X(0,.02,i.edge[e]))*.35-X(.7,.85,a[e])*.5;return ef(e,o,3,4,(e,t,o,s)=>{let c=(1-X(0,.02,i.edge[e]))*.25,l=X(.7,.85,a[e]),u=(.9+(n[e]-.5)*.08-X(.45,.8,r[e])*.2)*(1-c)*(1-l*.45);s[0]=u,s[1]=u*.99,s[2]=u*.95,s[3]=Vd(.55+l*.3+X(.45,.8,r[e])*.2+(n[e]-.5)*.15)})}function rf(e){let t=Bd(303),n=e/4,r=Z(e,e/5,3,t,.6),i=Z(e,3,5,t),a=Z(e,20,4,t),o=Jd(e,t,2,Math.max(.8,e/600),.02),s=new Float32Array(e*e);for(let n=0;n<14;n++)Kd(s,e,t()*e,t()*e,e*(.006+t()*.008),1,`max`,.6);let c=Array.from({length:16},()=>.9+t()*.14),l=Array.from({length:16},()=>(t()-.5)*.03),u=new Float32Array(e*e),d=new Float32Array(e*e),f=Math.max(1.5,e/170);for(let t=0;t<e;t++)for(let i=0;i<e;i++){let c=t*e+i,l=Math.min(i%n,n-i%n),p=Math.min(t%n,n-t%n),m=Math.min(l,p),h=a[c]>.62?(a[c]-.62)*e*.05:0,g=1-X(f*.5,f+h,m);u[c]=g,d[c]=.25+X(f,f*3.5,m)*.5+(r[c]-.5)*.12-g*.3-o[c]*.5+s[c]*.04}return ef(e,d,4.5,6,(e,t,a,d)=>{let f=Math.floor(a/n)*4+Math.floor(t/n),p=(.7+(r[e]-.5)*.14+(i[e]-.5)*.12)*c[f];p*=1-u[e]*.42,p*=1-o[e]*.55,p*=1-s[e]*.45,d[0]=p+l[f]+.01,d[1]=p,d[2]=p-l[f]-.015,d[3]=Vd(.82+u[e]*.12-s[e]*.3+(r[e]-.5)*.1)})}function af(e,t){let n=Bd(t?505:404),r=Wd(e,e/10,3,n),i=Z(e,e/4,2,n),a=Z(e,10,5,n),o=Z(e,3,4,n),s=t?Gd(e,46,n):null,c=new Float32Array(e*e);for(let e=0;e<c.length;e++){let t=s?(1-X(.15,.5,s.f1[e]))*X(.5,.7,a[e]):0;c[e]=r[e]*.55+a[e]*.35+i[e]*.15+t*.2}return ef(e,c,4,5,(e,n,c,l)=>{let u=.62+r[e]*.26+(a[e]-.5)*.3+(i[e]-.5)*.1,d=X(t?.5:.62,.85,o[e]*.6+a[e]*.4),f=s?(1-X(.15,.5,s.f1[e]))*X(.5,.7,a[e]):0;l[0]=u*(.86+d*.34)*(1-f*.3),l[1]=u*(1-d*.04)*(1-f*.12),l[2]=u*(.8-d*.3)*(1-f*.3),l[3]=.95})}function of(e){let t=Bd(606),n=Z(e,6,6,t),r=Z(e,e/5,3,t,.6),i=Gd(e,56,t),a=Z(e,2,4,t),o=Gd(e,9,t),s=e=>i.id[e]>.84?1-X(.08,.3+r[e]*.12,i.f1[e]):0,c=new Float32Array(e*e);for(let e=0;e<c.length;e++)c[e]=n[e]*.5+r[e]*.2+s(e)*.3-(1-X(0,.03,o.edge[e]))*X(.55,.75,a[e])*.3;return ef(e,c,5,5,(e,t,c,l)=>{let u=s(e)*.85,d=(1-X(0,.03,o.edge[e]))*X(.55,.75,a[e]),f=(.82+(n[e]-.5)*.4+(r[e]-.5)*.16)*(1-d*.35),p=.4+i.id[e]*.16+(r[e]-.5)*.1;l[0]=f*.56*(1-u)+(p+.03)*u,l[1]=f*.46*(1-u)+p*u,l[2]=f*.34*(1-u)+(p-.04)*u,l[3]=Vd(.95-u*.2)})}function sf(e){let t=Bd(707),n=Gd(e,34,t),r=Gd(e,90,t),i=Z(e,e/4,2,t),a=Z(e,3,4,t),o=new Float32Array(e*e);for(let e=0;e<o.length;e++){let t=X(0,.16,n.edge[e])*(1-n.f1[e]*.6),a=X(0,.2,r.edge[e])*.45;o[e]=Math.max(t,a)+i[e]*.08}return ef(e,o,6,7,(e,t,o,s)=>{let c=1-X(0,.1,Math.min(n.edge[e],r.edge[e]*1.6)),l=n.id[e],u=(.5+l*.3+(i[e]-.5)*.12+(a[e]-.5)*.1)*(1-c*.6),d=(l-.5)*.08;s[0]=u+d,s[1]=u+d*.5,s[2]=u-d,s[3]=Vd(.82+c*.15-l*.12)})}function cf(e){let t=Bd(808),n=Z(e,4,6,t),r=Z(e,e/4,3,t,.6),i=Z(e,e/3,1,t),a=Z(e,2,4,t),o=Gd(e,6,t),s=Z(e,5,3,t),c=new Float32Array(e*e),l=Z(e,48,3,t);for(let t=0;t<e;t++)for(let n=0;n<e;n++)c[t*e+n]=l[Math.floor(t/14)%e*e+n];let u=new Float32Array(e*e),d=Math.max(1.5,e/220);qd(u,e,0,e*.5,e,e*.5,d,1),qd(u,e,e*.5,0,e*.5,e,d,1);let f=new Float32Array(e*e);for(let e=0;e<f.length;e++){let t=X(.8,.95,i[e]),a=(1-X(0,.014,o.edge[e]))*X(.6,.75,s[e]);f[e]=.5+(n[e]-.5)*.3+(r[e]-.5)*.14-t*.5-a*.5-u[e]*.7}return ef(e,f,3.2,5,(e,t,l,d)=>{let f=X(.8,.95,i[e]),p=(1-X(0,.014,o.edge[e]))*X(.6,.75,s[e]),m=X(.55,.9,c[e])*X(.4,.7,a[e]),h=.64+(n[e]-.5)*.18+(r[e]-.5)*.08+(a[e]-.5)*.1;h*=(1-f*.35)*(1-p*.5)*(1-u[e]*.5)*(1-m*.22),d[0]=h+.01,d[1]=h+.005,d[2]=h-.012-m*.02,d[3]=Vd(.84+f*.1-m*.1+(r[e]-.5)*.1)})}function lf(e){let t=Bd(909),n=e/16,r=e/8,i=Z(e,e/5,3,t,.6),a=Z(e,30,4,t),o=Z(e,3,4,t),s=Array.from({length:128},()=>t()),c=Array.from({length:128},()=>t()<.12?.75:1),l=new Float32Array(e*e),u=new Int32Array(e*e),d=new Float32Array(e*e),f=Math.max(1.5,e/240);for(let t=0;t<e;t++){let o=Math.floor(t/n),c=o%2?r/2:0;for(let p=0;p<e;p++){let m=t*e+p,h=(p+c)%e,g=Math.floor(h/r)%8,_=Math.min(h%r,r-h%r),v=Math.min(t%n,n-t%n),y=Math.min(_,v),b=a[m]>.6?(a[m]-.6)*e*.04:0,x=1-X(f*.6,f+b,y);l[m]=x,u[m]=o*8+g,d[m]=.2+(1-x)*.55+(i[m]-.5)*.14*(1-x)+(s[o*8+g]-.5)*.08}}return ef(e,d,4,6,(e,t,n,r)=>{let a=l[e],d=s[u[e]],f=c[u[e]],p=(.9+(i[e]-.5)*.22+(o[e]-.5)*.14)*f,m=(.6+d*.14)*p,h=(.33+d*.07)*p,g=(.25+d*.04)*p,_=.66+(i[e]-.5)*.12;r[0]=m*(1-a)+_*a,r[1]=h*(1-a)+_*.97*a,r[2]=g*(1-a)+_*.92*a,r[3]=Vd(.82+a*.12+(d-.5)*.1)})}function uf(e){let t=Bd(1010),n=Z(e,e/3,2,t),r=Z(e,3,5,t),i=Gd(e,12,t),a=Z(e,14,5,t),o=new Float32Array(e*e);for(let n=0;n<60;n++){let n=t()*e,r=t()*e,i=(t()-.5)*1.2+Math.PI/2,a=e*(.03+t()*.12);qd(o,e,n,r,n+Math.cos(i)*a,r+Math.sin(i)*a,Math.max(.6,e/1100),.5+t()*.5)}let s=new Float32Array(e*e),c=new Float32Array(e*e);for(let t=0;t<e;t++)for(let r=0;r<e;r++)s[t*e+r]=n[Math.floor(t/24)%e*e+r];for(let e=0;e<c.length;e++){let t=X(.72,.86,a[e]);c[e]=.5+(s[e]-.5)*.12-o[e]*.3+t*.25*a[e]}return ef(e,c,2.2,3,(e,t,n,c)=>{let l=X(.72,.86,a[e]),u=.86+(s[e]-.5)*.1+(i.id[e]-.5)*.06+(r[e]-.5)*.12+o[e]*.12;c[0]=u*(1-l)+.52*l,c[1]=u*(1-l)+.3*l,c[2]=u*(1-l)+.16*l,c[3]=Vd(.42+(s[e]-.5)*.15+l*.5-o[e]*.15+(r[e]-.5)*.15),c[4]=l})}function df(e){let t=Bd(1111),n=Z(e,4,5,t),r=Z(e,40,3,t),i=Gd(e,30,t),a=Z(e,9,4,t),o=new Float32Array(e*e),s=new Float32Array(e*e);for(let t=0;t<e;t++)for(let n=0;n<e;n++)o[t*e+n]=r[Math.floor(t/10)%e*e+n];let c=e=>{let t=i.id[e]>.6?X(.2,.3,i.f1[e])*(1-X(.3,.38,i.f1[e])):0;return Vd(X(.45,.85,n[e])*.6+X(.6,.9,o[e])*.35+t*.5+X(.62,.8,a[e])*.3)};for(let e=0;e<s.length;e++)s[e]=.5+c(e)*.08;return ef(e,s,.6,0,(e,t,n,r)=>{let i=c(e);r[0]=.86+i*.14,r[1]=.86+i*.13,r[2]=.86+i*.1,r[3]=Vd(.05+i*.5),r[4]=i})}function ff(e){let t=Bd(1212),n=Z(e,e/4,3,t,.6),r=Z(e,4,5,t),i=Gd(e,70,t),a=new Float32Array(e*e);for(let n=0;n<26;n++){let n=t()*e,r=t()*e,i=t()*Math.PI,o=e*(.04+t()*.1);qd(a,e,n,r,n+Math.cos(i)*o,r+Math.sin(i)*o,e/260,.4+t()*.6)}let o=new Float32Array(e*e);for(let e=0;e<o.length;e++)o[e]=.5+(n[e]-.5)*.35+X(0,.12,i.edge[e])*.15-a[e]*.1;return ef(e,o,3,4,(e,t,i,o)=>{let s=X(.55,.85,r[e])*.22,c=.66+(n[e]-.5)*.16+a[e]*.22+s;o[0]=c+s*.06,o[1]=c+s*.03,o[2]=c,o[3]=Vd(.9-a[e]*.2+s*.1+(n[e]-.5)*.1)})}function pf(e){let t=Bd(1313),n=Gd(e,Math.round(e/7),t),r=Z(e,4,4,t),i=Z(e,e/3,2,t),a=new Float32Array(e*e);for(let e=0;e<a.length;e++)a[e]=X(0,.22,n.edge[e])*.7+(n.id[e]-.5)*.15+i[e]*.1;return ef(e,a,3.2,3,(e,t,i,a)=>{let o=1-X(0,.14,n.edge[e]),s=o*X(.45,.8,r[e])*.25,c=.8+(r[e]-.5)*.08-o*.12+s;a[0]=c,a[1]=c,a[2]=c+.01,a[3]=Vd(.62+o*.2-(r[e]-.5)*.2)})}function mf(e){let t=Bd(1414),n=Z(e,e/3,2,t),r=Z(e,4,4,t),i=Math.round(e/8),a=Math.PI*2*i/e,o=new Float32Array(e*e);for(let t=0;t<e;t++)for(let r=0;r<e;r++){let s=Math.sin(r*a),c=Math.sin(t*a),l=(Math.floor(r*i/e)+Math.floor(t*i/e))%2?Math.abs(s):Math.abs(c);o[t*e+r]=l*.7+n[t*e+r]*.3}return ef(e,o,3.5,4,(e,t,i,a)=>{let s=.68+o[e]*.26+(r[e]-.5)*.1+(n[e]-.5)*.08;a[0]=s,a[1]=s,a[2]=s,a[3]=.96})}function hf(e){let t=Bd(1515),n=Gd(e,Math.round(e/12),t),r=Wd(e,10,4,t),i=Z(e,3,4,t),a=Z(e,e/3,2,t),o=new Float32Array(e*e);for(let e=0;e<o.length;e++)o[e]=X(0,.18,n.edge[e])*.6-X(.86,1,r[e])*.5+a[e]*.1;return ef(e,o,2.8,4,(e,t,a,o)=>{let s=1-X(0,.12,n.edge[e]),c=X(.86,1,r[e]),l=X(.5,.8,i[e]),u=.78-s*.14-c*.18+l*.1;o[0]=u+.01,o[1]=u,o[2]=u-.01,o[3]=Vd(.58-l*.28+s*.15+c*.1)})}function gf(e){let t=Bd(1616),n=Z(e,26,3,t),r=Z(e,e/2,1,t),i=Z(e,5,5,t),a=new Float32Array(e*e);for(let n=0;n<520;n++){let n=t()*e,r=t()*e,i=t()*Math.PI*2,o=(t()-.5)*.12,s=.25+t()*.75,c=6+Math.floor(t()*14);for(let t=0;t<c;t++){let t=n+e/170*Math.cos(i),c=r+e/170*Math.sin(i);qd(a,e,n,r,t,c,Math.max(.55,e/1500),s),n=t,r=c,i+=o}}let o=new Float32Array(e*e);for(let e=0;e<o.length;e++)o[e]=.5+(n[e]-.5)*.25-a[e]*.12;return ef(e,o,.9,0,(e,t,n,o)=>{let s=.93+(r[e]-.5)*.12;o[0]=s,o[1]=s,o[2]=s,o[3]=Vd(a[e]*.75+X(.6,.9,i[e])*.35),o[4]=a[e]})}var _f={asphalt:tf,line:nf,paving:rf,grassA:e=>af(e,0),grassB:e=>af(e,1),dirt:of,gravel:sf,concrete:cf,brick:lf,metal:uf,glass:df,rubber:ff,plastic:pf,fabric:mf,leather:hf,carpaint:gf};function vf(e,t){return _f[e](t)}function yf(e){let t=Bd(77),n=Z(e,e/4,3,t,.65),r=Gd(e,Math.round(e/5),t),i=new Uint8Array(e*e*4);for(let t=0;t<e*e;t++){let e=$d(Vd(.5+(n[t]-.5)*.8+(X(0,.3,r.edge[t])-.6)*.3));i[t*4]=i[t*4+1]=i[t*4+2]=e,i[t*4+3]=255}return i}var bf=[`frenada-doble`,`frenada-curva`,`parche`,`parche-irregular`,`aceite`,`goteo`,`goma`,`marca-borrada`,`grieta-sellada`,`grieta-ramificada`,`tapa`,`rejilla`,`humedad`,`hojas`,`linea-desgastada`,`arena`];function xf(e){let t=e/4,n=new Uint8Array(e*e*4),r=Bd(4242);return bf.forEach((i,a)=>{let o=new Float32Array(t*t),s=new Float32Array(t*t*3),c=Z(t,8,4,r),l=Z(t,t/3,2,r),u=(e,n,r)=>{for(let i=0;i<t*t;i++)s[i*3]=e,s[i*3+1]=n,s[i*3+2]=r};u(.05,.05,.055);let d=e=>{let n=Math.floor(e/t)/t;return X(.04,.3,n)*X(.96,.6,n)};switch(i){case`frenada-doble`:case`frenada-curva`:{let e=i===`frenada-curva`?.18:0;for(let n of i===`frenada-curva`?[0]:[-1,1]){let r=t*(.5+n*.24),i=t*.06;for(let a=t*.06;a<t*.94;a+=2){let s=t*(.5+n*.24)+Math.sin(a/t*Math.PI)*t*e;qd(o,t,r,i,s,a,t*.035,1),r=s,i=a}}for(let e=0;e<t*t;e++)o[e]=o[e]*d(e)*(.45+c[e]*.5)*(.6+l[e]*.5);break}case`parche`:case`parche-irregular`:{let e=i===`parche-irregular`;for(let n=0;n<t;n++)for(let r=0;r<t;r++){let i=Math.abs(r/t-.5)*2,a=Math.abs(n/t-.5)*2,u=e?Math.hypot(i,a)+(c[n*t+r]-.5)*.5:Math.max(i,a)+(c[n*t+r]-.5)*.06,d=1-X(.74,.8,u),f=X(.66,.74,u)*d,p=n*t+r;o[p]=d*(.5+l[p]*.2)+f*.4;let m=.09+l[p]*.06-f*.06;s[p*3]=s[p*3+1]=m,s[p*3+2]=m+.005}break}case`aceite`:for(let e=0;e<5;e++)Kd(o,t,t*(.35+r()*.3),t*(.35+r()*.3),t*(.1+r()*.14),.8,`max`,.15);for(let e=0;e<t*t;e++)o[e]=o[e]*(.6+c[e]*.5);u(.03,.03,.035);break;case`goteo`:for(let e=0;e<16;e++)Kd(o,t,t*(.45+r()*.1),t*(.08+e/16*.84),t*(.012+r()*.03),.85,`max`,.3);u(.03,.03,.035);break;case`goma`:for(let e=0;e<t*t;e++){let n=e%t/t;o[e]=X(.12,.4,n)*X(.88,.6,n)*d(e)*(.2+c[e]*.35)}break;case`marca-borrada`:case`linea-desgastada`:{let e=i===`marca-borrada`?.16:.07;for(let n=0;n<t*t;n++){let r=n%t/t,a=1-X(e*.7,e,Math.abs(r-.5));o[n]=a*d(n)*X(.35,.7,c[n]*.7+l[n]*.4)*(i===`marca-borrada`?.45:.7)}u(.82,.81,.77);break}case`grieta-sellada`:case`grieta-ramificada`:{let e=Bd(a*31+5),n=t*.5,r=t*.06,s=Math.PI/2;for(;r<t*.94;){s+=(e()-.5)*.5,s=Math.max(1,Math.min(2.14,s));let a=n+Math.cos(s)*4,c=r+Math.sin(s)*4;if(qd(o,t,n,r,a,c,t*.016,1),i===`grieta-ramificada`&&e()<.05){let n=a,r=c,i=s+(e()<.5?.9:-.9);for(let a=0;a<14&&n>t*.1&&n<t*.9;a++){let a=n+Math.cos(i)*4,s=r+Math.sin(i)*4;qd(o,t,n,r,a,s,t*.012,.9),n=a,r=s,i+=(e()-.5)*.4}}n=Math.max(t*.2,Math.min(t*.8,a)),r=c}for(let e=0;e<t*t;e++)o[e]=Math.min(1,o[e]*1.3)*.9;u(.035,.035,.04);break}case`tapa`:case`rejilla`:for(let e=0;e<t;e++)for(let n=0;n<t;n++){let r=e*t+n,a=n/t-.5,c=e/t-.5,u=i===`tapa`,d=u?Math.hypot(a,c):Math.max(Math.abs(a)*1.25,Math.abs(c)),f=1-X(.4,.42,d),p=X(.33,.35,d)*f,m=u?+(Math.sin(a*60)*Math.sin(c*60)>0):Math.sin(c*70)>.2?0:1,h=u?.2+m*.07+l[r]*.06:m?.24+l[r]*.06:.02;o[r]=f,s[r*3]=h*(1-p*.4)+.02,s[r*3+1]=h*(1-p*.4)+.012,s[r*3+2]=h*(1-p*.4)}break;case`humedad`:for(let e=0;e<4;e++)Kd(o,t,t*(.35+r()*.3),t*(.35+r()*.3),t*(.16+r()*.14),.42,`max`,.1);for(let e=0;e<t*t;e++)o[e]=o[e]*(.5+c[e]*.7);u(.08,.085,.09);break;case`hojas`:for(let e=0;e<46;e++){let e=t*(.12+r()*.76),n=t*(.12+r()*.76),i=r()*Math.PI,a=t*(.012+r()*.02);qd(o,t,e-Math.cos(i)*a,n-Math.sin(i)*a,e+Math.cos(i)*a,n+Math.sin(i)*a,t*.012,.95)}for(let e=0;e<t*t;e++)s[e*3]=.42+c[e]*.25,s[e*3+1]=.3+c[e]*.16,s[e*3+2]=.1+l[e]*.06;break;case`arena`:for(let e=0;e<t*t;e++){let n=e%t/t-.5,r=Math.floor(e/t)/t-.5;o[e]=(1-X(.2,.46,Math.hypot(n,r)+(c[e]-.5)*.3))*(.25+l[e]*.4)}u(.55,.48,.36)}let f=a%4*t,p=Math.floor(a/4)*t;for(let r=0;r<t;r++)for(let i=0;i<t;i++){let a=r*t+i,c=Math.min(i,r,t-1-i,t-1-r)/t,l=((p+r)*e+f+i)*4;n[l]=$d(s[a*3]),n[l+1]=$d(s[a*3+1]),n[l+2]=$d(s[a*3+2]),n[l+3]=$d(Vd(o[a])*X(.015,.06,c))}}),n}function Sf(e){if(e.kind===`decals`)return{kind:`decals`,size:e.size,data:xf(e.size)};if(e.kind===`detail`)return{kind:`detail`,size:e.size,data:yf(e.size)};let t=[...e.sizes].sort((e,t)=>t-e),n=vf(e.id,t[0]),r=[n];for(let e of t.slice(1)){for(;n.size>e;)n={size:n.size>>1,albedo:Qd(n.albedo,n.size),normal:Qd(n.normal,n.size),packed:Qd(n.packed,n.size)};r.push(n)}return{kind:`mat`,id:e.id,maps:r}}function Cf(e){let t=e.kind===`mat`?Math.max(...e.sizes):e.size;return t*t/1048576}var wf=[`asphalt`,`paving`,`grassA`,`grassB`,`dirt`,`gravel`,`concrete`,`brick`],Tf=[`line`,`metal`,`glass`,`rubber`,`plastic`,`fabric`,`leather`,`carpaint`],Ef=[`grassA`,`grassB`,`dirt`,`gravel`,`concrete`,`brick`];function Df(e,t={}){let n=e===`baja`,r=!n&&!t.touch&&!t.noWorkers,i=[];for(let e of wf)n?i.push({kind:`mat`,id:e,sizes:[512]}):e===`asphalt`&&r?i.push({kind:`mat`,id:e,sizes:[2048,1024,512]}):i.push({kind:`mat`,id:e,sizes:[1024,512]});for(let e of Tf)i.push({kind:`mat`,id:e,sizes:[512]});return i.push({kind:`decals`,size:n?512:1024},{kind:`detail`,size:256}),i}var Of=new K(60,110,40),kf={x0:-300,z0:-300,size:600};function Af(e){let t=[...e].sort((e,t)=>e.x-t.x||e.z-t.z),n=(e,t,n)=>(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x),r=[];for(let e of t){for(;r.length>=2&&n(r[r.length-2],r[r.length-1],e)<=0;)r.pop();r.push(e)}let i=[];for(let e=t.length-1;e>=0;e--){let r=t[e];for(;i.length>=2&&n(i[i.length-2],i[i.length-1],r)<=0;)i.pop();i.push(r)}return[...r.slice(0,-1),...i.slice(0,-1)]}function jf(e,t,n,r){let i=e.getImageData(0,0,t,t),a=i.data,o=new Float32Array(t*t),s=new Float32Array(t*t);for(let e=0;e<t*t;e++)o[e]=a[e*4];let c=2*n+1;for(let e=0;e<r;e++)for(let e of[!0,!1]){for(let r=0;r<t;r++){let i=0,a=n=>e?r*t+Math.min(t-1,Math.max(0,n)):Math.min(t-1,Math.max(0,n))*t+r;for(let e=-n;e<=n;e++)i+=o[a(e)];for(let l=0;l<t;l++)s[e?r*t+l:l*t+r]=i/c,i+=o[a(l+n+1)]-o[a(l-n)]}[o,s]=[s,o]}for(let e=0;e<t*t;e++)a[e*4]=a[e*4+1]=a[e*4+2]=o[e];e.putImageData(i,0,0)}function Mf(e){let t=new _i(e);return t.flipY=!1,t.colorSpace=``,t.wrapS=t.wrapT=v,t.anisotropy=4,t}function Nf(e,t=1024){let n=document.createElement(`canvas`);n.width=n.height=t;let r=n.getContext(`2d`);r.fillStyle=`#fff`,r.fillRect(0,0,t,t);let i=t/kf.size,a=e=>(e-kf.x0)*i,o=e=>(e-kf.z0)*i,s=Of.x/Of.y,c=Of.z/Of.y,l=e=>{r.beginPath(),e.forEach((e,t)=>t?r.lineTo(a(e.x),o(e.z)):r.moveTo(a(e.x),o(e.z))),r.closePath()};r.fillStyle=`rgb(0,0,0)`;for(let t of e.buildings){let e=xu(t.obb),n=t.height-Hu(t.obb.cx,t.obb.cz),i=e.map(e=>({x:e.x-s*n,z:e.z-c*n}));l(Af([...e,...i])),r.fill()}r.strokeStyle=`rgba(0,0,0,0.55)`,r.lineWidth=2.4*i;for(let t of e.buildings)l(xu(t.obb)),r.stroke();r.fillStyle=`rgba(0,0,0,0.6)`;for(let t of e.trees){let e=t.x-s*3.6,n=t.z-c*3.6;e<kf.x0||n<kf.z0||e>kf.x0+kf.size||n>kf.z0+kf.size||(r.beginPath(),r.ellipse(a(e),o(n),2.3*i,1.9*i,.6,0,Math.PI*2),r.fill(),r.beginPath(),r.arc(a(t.x),o(t.z),.8*i,0,Math.PI*2),r.fill())}return jf(r,t,Math.max(1,Math.round(t/1024)),2),Mf(n)}function Pf(e,t=1024){let n=document.createElement(`canvas`);n.width=n.height=t;let r=n.getContext(`2d`);r.fillStyle=`#000`,r.fillRect(0,0,t,t);let i=t/1600,a=e=>(e+800)*i,o=e=>(e+800)*i;r.lineJoin=r.lineCap=`round`;for(let t of e.roads)(t.kind!==`calle`||t.rural)&&(r.strokeStyle=`rgba(255,255,255,0.9)`,r.lineWidth=(t.width+5)*i,r.beginPath(),t.pts.forEach((e,t)=>t?r.lineTo(a(e.x),o(e.z)):r.moveTo(a(e.x),o(e.z))),t.closed&&r.closePath(),r.stroke());r.fillStyle=`rgba(255,255,255,0.85)`;let s=Mu;r.fillRect(a(s.minX-5),o(s.minZ-5),(s.maxX-s.minX+10)*i,(s.maxZ-s.minZ+10)*i);let c=e.blocks.find(e=>e.i===hd.i&&e.j===hd.j);if(c){let e=c.corners,t=e.map(e=>({x:e.x,z:e.z}));r.save(),r.beginPath(),t.forEach((e,t)=>t?r.lineTo(a(e.x),o(e.z)):r.moveTo(a(e.x),o(e.z))),r.closePath(),r.clip(),r.strokeStyle=`rgba(255,255,255,1)`,r.lineWidth=3*i;let n=e.reduce((e,t)=>e+t.x,0)/e.length,s=e.reduce((e,t)=>e+t.z,0)/e.length;for(let t of e)r.beginPath(),r.moveTo(a(n),o(s)),r.quadraticCurveTo(a((n+t.x)/2+6),o((s+t.z)/2-6),a(t.x),o(t.z)),r.stroke();r.beginPath(),r.arc(a(n),o(s),7*i,0,Math.PI*2),r.fillStyle=`rgba(255,255,255,1)`,r.fill(),r.restore()}return jf(r,t,1,2),Mf(n)}function Ff(){return{uBake:{value:null},uBakeRect:{value:new Wt(kf.x0,kf.z0,1/kf.size,1/kf.size)},uMacro:{value:null},uSplat:{value:null},uSplatRect:{value:new Wt(-800,-800,1/1600,1/1600)},uDirt:{value:null},uGrassB:{value:null},uGravel:{value:null},uGrassN:{value:null},uDirtN:{value:null}}}var If=`
uniform sampler2D uBake;
uniform vec4 uBakeRect;
uniform sampler2D uMacro;
uniform float uWet;
varying vec2 vWXZ;
float bakeLight() {
  vec2 uv = (vWXZ - uBakeRect.xy) * uBakeRect.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 1.0;
  return texture2D(uBake, uv).r;
}
`+Rd,Lf=`0.42`;function Rf(e,t,n,r,i={}){let a=(i.macro??.3).toFixed(3),o=(i.detail??.35).toFixed(3),s=!!i.extra?.uPk;e.onBeforeCompile=e=>{Object.assign(e.uniforms,n,r,i.extra??{});let c=e.vertexShader,l=e.fragmentShader,u=`varying vec2 vWXZ;
`,d=`vWXZ = (modelMatrix * vec4(transformed, 1.0)).xz;
`,f=If+(s?`uniform sampler2D uPk;
`:``),p=``,m=``,h=``;t===`asphalt`?(u+=`attribute vec2 laneUv;
varying vec2 vLane;
`,d+=`vLane = laneUv;
`,f+=`varying vec2 vLane;
float gRut = 0.0;
float gShoulder = 0.0;
float gMacro = 0.5;
float gPud = 0.0;
vec4 gPk = vec4(1.0);
`,p=`
        {
          float m = texture2D(uMacro, vWXZ * 0.0061).r;
          float m2 = texture2D(uMacro, vWXZ * 0.021 + vec2(0.37, 0.11)).r;
          gMacro = m;
          #ifdef USE_MAP
            // Segunda muestra girada 37° y a otra escala: rompe el patrón de repetición.
            vec4 alt = texture2D(map, mat2(0.8, -0.6, 0.6, 0.8) * vMapUv * 0.63 + vec2(0.21, 0.47));
            diffuseColor.rgb = mix(diffuseColor.rgb, diffuse * alt.rgb, smoothstep(0.3, 0.7, m2));
            ${s?`gPk = texture2D(uPk, vMapUv);`:``}
            diffuseColor.rgb *= mix(1.0, gPk.r, 0.8) * pbrDetail(vMapUv, ${o}, length(vViewPosition));
          #endif
          diffuseColor.rgb *= 1.0 + (m - 0.5) * ${a};
          float lanes = vLane.y;
          float lu = vLane.x;
          if (lanes > 0.0) {
            if (lu > 0.0 && lu < lanes) {
              float fu = fract(lu);
              gRut = exp(-pow((fu - 0.27) / 0.065, 2.0)) + exp(-pow((fu - 0.73) / 0.065, 2.0));
              gRut *= 0.65 + 0.35 * m2;
              // Goma y aceite en el centro de cada carril
              diffuseColor.rgb *= 1.0 - 0.07 * exp(-pow((fu - 0.5) / 0.09, 2.0)) * (0.4 + m);
            }
            gShoulder = clamp(max(-lu, lu - lanes) * 3.0, 0.0, 1.0);
          }
          diffuseColor.rgb *= 1.0 - 0.16 * gRut;
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.16 + vec3(0.025, 0.022, 0.015), gShoulder);
          // Lluvia: asfalto más oscuro y charcos en las zonas bajas (y algo más en las rodadas).
          gPud = uWet * smoothstep(0.42, 0.7, gPk.b * (0.45 + m2) + gRut * 0.12) * (1.0 - gShoulder);
          diffuseColor.rgb *= mix(1.0, 0.68, uWet) * mix(1.0, 0.55, gPud);
          diffuseColor.rgb *= mix(${Lf}, 1.0, bakeLight());
        }
      `,m=`
        roughnessFactor = ${s?`gPk.g`:`roughnessFactor`};
        roughnessFactor = clamp(roughnessFactor - 0.2 * gRut + 0.06 * gShoulder + (gMacro - 0.5) * 0.12, 0.3, 1.0);
        roughnessFactor = mix(roughnessFactor, 0.36, uWet * 0.75);
        roughnessFactor = mix(roughnessFactor, 0.03, gPud);
      `,h=`normal = normalize(mix(normal, normalize(vNormal), gPud));
`):t===`ground`?(u+=`attribute vec3 gtint;
varying vec3 vTint;
`,d+=`vTint = gtint;
`,f+=`uniform sampler2D uSplat;
uniform vec4 uSplatRect;
uniform sampler2D uDirt;
uniform sampler2D uGrassB;
uniform sampler2D uGravel;
uniform sampler2D uGrassN;
uniform sampler2D uDirtN;
varying vec3 vTint;
float gW = 0.0;
vec2 gUvA = vec2(0.0);
`,p=`
        {
          float m = texture2D(uMacro, vWXZ * 0.0042).r;
          float m2 = texture2D(uMacro, vWXZ * 0.017 + vec2(0.5, 0.23)).r;
          vec2 uvA = vWXZ / 9.0;
          vec2 uvB = mat2(0.866, -0.5, 0.5, 0.866) * vWXZ / 13.7 + vec2(0.31, 0.77);
          #ifdef USE_MAP
            // Dos variantes de hierba mezcladas por manchas grandes
            vec3 g = mix(texture2D(map, uvA).rgb, texture2D(uGrassB, uvB).rgb, smoothstep(0.3, 0.7, m2)) * 1.12;
          #else
            vec3 g = vec3(0.78);
          #endif
          // Tierra, con grava donde el ruido lo dice
          vec3 d = mix(texture2D(uDirt, uvA * 1.7).rgb, texture2D(uGravel, uvB * 2.3).rgb, smoothstep(0.5, 0.75, m) * 0.85);
          float s = texture2D(uSplat, (vWXZ - uSplatRect.xy) * uSplatRect.zw).r;
          // Calvas de tierra sueltas en el campo y borde irregular de los arcenes.
          float w = smoothstep(0.42, 0.62, s + (m2 - 0.5) * 0.55 + smoothstep(0.78, 0.92, m) * 0.6);
          gW = w;
          gUvA = uvA;
          diffuseColor.rgb = mix(g * vTint, d, w) * (1.0 + (m - 0.5) * ${a}) * pbrDetail(uvA, ${o}, length(vViewPosition));
          diffuseColor.rgb *= mix(1.0, 0.8, uWet * w);
          diffuseColor.rgb *= mix(${Lf}, 1.0, bakeLight());
        }
      `,h=`
        {
          vec3 gn = mix(texture2D(uGrassN, gUvA).xyz, texture2D(uDirtN, gUvA * 1.7).xyz, gW) * 2.0 - 1.0;
          normal = normalize(normal + (viewMatrix * vec4(gn.x, 0.0, gn.y, 0.0)).xyz * 0.85);
        }
      `):t===`facade`?(f+=Ld+`uniform sampler2D uWallA;
uniform sampler2D uWallN;
uniform sampler2D uWallMask;
uniform vec3 uWallK;
float gWall = 0.0;
vec2 gWuv = vec2(0.0);
`,p=`
        {
          #ifdef USE_MAP
            // Solo el muro (la máscara deja fuera ventanas, persianas y balcones)
            gWall = texture2D(uWallMask, vMapUv).r;
            gWuv = vMapUv * uWallK.xy;
            diffuseColor.rgb *= mix(vec3(1.0), texture2D(uWallA, gWuv).rgb * 1.8, gWall * uWallK.z);
            diffuseColor.rgb *= pbrDetail(gWuv, ${o} * gWall, length(vViewPosition));
          #endif
        }
      `,h=`
        {
          vec3 wn = texture2D(uWallN, gWuv).xyz * 2.0 - 1.0;
          wn.xy *= gWall * 1.3;
          normal = normalize(pbrFrame(-vViewPosition, normal, dFdx(gWuv), dFdy(gWuv)) * wn);
        }
      `):p=`
        {
          float m = texture2D(uMacro, vWXZ * 0.008).r;
          #ifdef USE_MAP
            ${s?`diffuseColor.rgb *= mix(1.0, texture2D(uPk, vMapUv).r, 0.85);`:``}
            ${Number(o)>0?`diffuseColor.rgb *= pbrDetail(vMapUv, ${o}, length(vViewPosition));`:``}
          #endif
          diffuseColor.rgb *= (1.0 + (m - 0.5) * ${a}) * mix(${Lf}, 1.0, bakeLight());
          diffuseColor.rgb *= mix(1.0, 0.82, uWet);
        }
      `,c=u+c.replace(`#include <begin_vertex>`,`#include <begin_vertex>
`+d),t===`ground`&&(l=l.replace(`#include <map_fragment>`,``)),l=f+l.replace(`#include <color_fragment>`,`#include <color_fragment>
`+p),m&&(l=l.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
`+m)),h&&(l=l.replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
`+h)),e.vertexShader=c,e.fragmentShader=l},e.customProgramCacheKey=()=>`world-${t}-${a}-${o}-${s}`}var zf=[`bajo`,`medio`,`alto`],Bf={alto:`Alto`,medio:`Medio`,bajo:`Bajo`},Vf={alto:{shadowMap:1024,far:900,detail:260,tex:1,mirrorEvery:1},medio:{shadowMap:512,far:650,detail:170,tex:.5,mirrorEvery:1},bajo:{shadowMap:0,far:420,detail:100,tex:.25,mirrorEvery:2}},Hf=.6,Uf=1.5,Wf=55,Gf=62,Kf=class{constructor(t,n=`medio`,r=!0){e(this,`allowAuto`,void 0),e(this,`ratio`,void 0),e(this,`level`,void 0),e(this,`maxRatio`,void 0),e(this,`fps`,0),e(this,`tex`,0),e(this,`highFor`,0),e(this,`lowStreak`,0),e(this,`terribleStreak`,0),e(this,`atMaxFor`,0),e(this,`peak`,0),e(this,`failedAt`,{}),e(this,`warmup`,2),this.allowAuto=r,this.maxRatio=Math.max(Hf,Math.min(t||1,Uf)),this.ratio=this.maxRatio,this.level=n}get upThreshold(){return this.peak>0?Math.min(Gf,this.peak-3):Gf}sample(e,t){if(this.fps=e,this.warmup>0)return this.warmup--,null;this.peak=Math.max(this.peak,Math.min(240,Math.round(e)));let n={};if(e<Wf){this.highFor=0,this.atMaxFor=0,this.lowStreak++,this.terribleStreak=e<40?this.terribleStreak+1:0,this.lowStreak%3==0&&this.tex<2&&(this.tex++,n.tex=this.tex);let r=this.ratio<=.600001;if(this.allowAuto&&this.level!==`bajo`&&(r&&this.lowStreak>=2||this.terribleStreak>=2))return this.failedAt[this.level]=t,this.level=zf[zf.indexOf(this.level)-1],n.level=this.level,this.ratio=Math.max(Hf,Math.min(this.maxRatio,1)),n.ratio=this.ratio,this.lowStreak=this.terribleStreak=0,n;let i=Math.max(Hf,qf(this.ratio*.9));return i!==this.ratio&&(this.ratio=i,n.ratio=i),n.ratio!==void 0||n.tex!==void 0?n:null}if(this.lowStreak=this.terribleStreak=0,e>=this.upThreshold){if(this.highFor++,this.ratio>=this.maxRatio-1e-6?this.atMaxFor++:this.atMaxFor=0,this.highFor>=3&&this.ratio<this.maxRatio)return this.ratio=Math.min(this.maxRatio,qf(this.ratio*1.1)),this.highFor=0,{ratio:this.ratio};if(this.atMaxFor>=8&&this.tex>0)return this.tex--,this.atMaxFor=0,this.highFor=0,{tex:this.tex};if(this.allowAuto&&this.atMaxFor>=8&&this.level!==`alto`){let e=zf[zf.indexOf(this.level)+1],n=this.failedAt[e];if(n===void 0||t-n>60)return this.level=e,this.atMaxFor=0,this.highFor=0,{level:e}}}else this.highFor=0,this.atMaxFor=0;return null}},qf=e=>Math.round(e*100)/100,Jf=[[-1,0],[-1,0],[-1,0],[-1,0]],Yf=class{constructor(t=0,n=!1){e(this,`autoUv`,void 0),e(this,`lanes`,void 0),e(this,`pos`,[]),e(this,`uv`,[]),e(this,`col`,[]),e(this,`lane`,[]),e(this,`withUv`,!1),e(this,`withCol`,!1),e(this,`uvT`,{c:1,s:0,k:1,ox:0,oz:0}),this.autoUv=t,this.lanes=n,this.uvT.k=t||1}setUvTransform(e,t,n=0,r=0){this.uvT={c:Math.cos(e),s:Math.sin(e),k:t,ox:n,oz:r}}tri(e,t,n){this.pos.push(...e,...t,...n)}quad(e,t,n,r,i=[0,1,0],a,o,s){let c=t[0]-e[0],l=t[1]-e[1],u=t[2]-e[2],d=n[0]-e[0],f=n[1]-e[1],p=n[2]-e[2],m=l*p-u*f,h=u*d-c*p,g=c*f-l*d,_=m*i[0]+h*i[1]+g*i[2]<0,v=_?[e,r,n,e,n,t]:[e,t,n,e,n,r];for(let e of v)this.pos.push(...e);if(!a&&this.autoUv){let i=this.uvT,o=e=>[(i.c*e[0]-i.s*e[2])/i.k+i.ox,(i.s*e[0]+i.c*e[2])/i.k+i.oz];a=[o(e),o(t),o(n),o(r)]}if(this.lanes){let e=s??Jf,t=_?[e[0],e[3],e[2],e[0],e[2],e[1]]:[e[0],e[1],e[2],e[0],e[2],e[3]];for(let e of t)this.lane.push(...e)}if(a){this.withUv=!0;let[e,t,n,r]=a,i=_?[e,r,n,e,n,t]:[e,t,n,e,n,r];for(let e of i)this.uv.push(...e)}if(o){this.withCol=!0;for(let e=0;e<6;e++)this.col.push(o.r,o.g,o.b)}}build(){let e=new Dr;return e.setAttribute(`position`,new hr(this.pos,3)),this.withUv&&e.setAttribute(`uv`,new hr(this.uv,2)),this.withCol&&e.setAttribute(`color`,new hr(this.col,3)),this.lanes&&e.setAttribute(`laneUv`,new hr(this.lane,2)),e.computeVertexNormals(),e.computeBoundingSphere(),e}};function Xf(e,t){let n=e.length;return e.map((r,i)=>{let a=e[t?(i-1+n)%n:Math.max(0,i-1)],o=e[t?(i+1)%n:Math.min(n-1,i+1)],s=o.x-a.x,c=o.z-a.z,l=Math.hypot(s,c)||1;return{x:-c/l,z:s/l}})}var Zf=(e,t,n,r)=>[e.x+t.x*n,Hu(e.x+t.x*n,e.z+t.z*n)+r,e.z+t.z*n];function Qf(e,t,n,r,i){let a=t.pts,o=Xf(a,!!t.closed),s=a.length,c=t.closed?s:s-1;for(let t=0;t<c;t++){let c=(t+1)%s;e.quad(Zf(a[t],o[t],n(t),i),Zf(a[c],o[c],n(c),i),Zf(a[c],o[c],r(c),i),Zf(a[t],o[t],r(t),i))}}function $f(e,t,n,r,i,a){let o=t.pts,s=Xf(o,!!t.closed),c=o.length,l=t.closed?c:c-1;for(let t=0;t<l;t++){let l=(t+1)%c,u=Zf(o[t],s[t],n,r),d=Zf(o[t],s[t],n,i),f=Zf(o[l],s[l],n,r),p=Zf(o[l],s[l],n,i),m=s[t];e.quad(u,f,p,d,[m.x*a,0,m.z*a])}}function ep(e,t,n,r,i,a){let o=t.pts,s=Xf(o,!!t.closed),c=o.length,l=t.closed?c:c-1,u=0,d=.03;for(let t=0;t<l;t++){let l=(t+1)%c,f=o[t],p=o[l],m=Math.hypot(p.x-f.x,p.z-f.z),h=s[t],g=s[l],_=[];if(!i)_.push([0,m]);else{let e=i[0]+i[1],t=-(u%e);for(;t<m;){let n=Math.max(0,t),r=Math.min(m,t+i[0]);r>n&&_.push([n,r]),t+=e}}for(let[t,i]of _){let o={x:f.x+(p.x-f.x)*t/m,z:f.z+(p.z-f.z)*t/m},s={x:f.x+(p.x-f.x)*i/m,z:f.z+(p.z-f.z)*i/m};if(a&&(a(o)||a(s)))continue;let c={x:h.x+(g.x-h.x)*t/m,z:h.z+(g.z-h.z)*t/m},l={x:h.x+(g.x-h.x)*i/m,z:h.z+(g.z-h.z)*i/m};e.quad(Zf(o,c,n-r/2,d),Zf(s,l,n-r/2,d),Zf(s,l,n+r/2,d),Zf(o,c,n+r/2,d))}u+=m}}function tp(e,t,n,r,i,a){e.quad([t,Hu(t,r)+a,r],[n,Hu(n,r)+a,r],[n,Hu(n,i)+a,i],[t,Hu(t,i)+a,i])}function np(e,t,n,r,i,a,o){e.quad([t,i,a],[n,i,a],[n,i,o],[t,i,o],[0,1,0]),e.quad([t,r,a],[n,r,a],[n,i,a],[t,i,a],[0,0,-1]),e.quad([t,r,o],[n,r,o],[n,i,o],[t,i,o],[0,0,1]),e.quad([t,r,a],[t,r,o],[t,i,o],[t,i,a],[-1,0,0]),e.quad([n,r,a],[n,r,o],[n,i,o],[n,i,a],[1,0,0])}function rp(e,t,n,r,i){let a=t.arms.map(e=>Math.atan2(e.z,e.x)).sort((e,t)=>e-t),o=e=>Math.asin(Math.min(.99,3.55/e)),s=a.length;for(let c=0;c<s;c++){let l=a[c],u=a[(c+1)%s];u<=l&&(u+=Math.PI*2),s===1&&(u=l+Math.PI*2);let d=Math.max(3,Math.ceil((u-l)*r/2.5)),f=e=>[l+o(e),u-o(e)],[p,m]=f(n),[h,g]=f(r);if(m<=p)continue;let _=(e,n)=>[t.x+e*Math.cos(n),Hu(t.x+e*Math.cos(n),t.z+e*Math.sin(n))+i,t.z+e*Math.sin(n)];for(let t=0;t<d;t++){let a=t/d,o=(t+1)/d,s=p+(m-p)*a,c=p+(m-p)*o,l=h+(g-h)*a,u=h+(g-h)*o;e.quad(_(n,s),_(n,c),_(r,u),_(r,l));let f=_(n,s),v=_(n,c);e.quad([f[0],f[1]-i,f[2]],[v[0],v[1]-i,v[2]],v,f,[-Math.cos(s),0,-Math.sin(s)])}}}function ip(e,t,n,r,i,a=40){for(let o=0;o<a;o++){let s=o/a*Math.PI*2,c=(o+1)/a*Math.PI*2,l=(e,r)=>[t+e*Math.cos(r),Hu(t+e*Math.cos(r),n+e*Math.sin(r))+i,n+e*Math.sin(r)];e.quad(l(0,s),l(r,s),l(r,c),l(0,s))}}function ap(e,t,n,r,i,a,o=0,s=64){let c=o?[[0,o],[0,o],[o,o],[o,o]]:Jf;for(let o=0;o<s;o++){let l=Math.PI*2*o/s,u=Math.PI*2*(o+1)/s,d=(e,r)=>[t+e*Math.cos(r),a,n+e*Math.sin(r)];e.quad(d(r,l),d(r,u),d(i,u),d(i,l),void 0,void 0,void 0,c)}}function op(e){if(!e.lanes.length)return null;let t=e.lanes.map(e=>e.offset).filter(e=>e>0).sort((e,t)=>e-t),n=e.lanes.filter(e=>e.offset<0).length;if(t.length&&t.length===n){let e=t.length>1?t[1]-t[0]:t[0]*2;return{sym:!0,inner:t[0]-e/2,lw:e,n:t.length,off:0}}let r=Math.min(3.75,e.width);return{sym:!1,inner:0,lw:r,n:1,off:e.lanes[0].offset-r/2}}function sp(e,t,n,r){let i=op(t),a=t.pts,o=Xf(a,!!t.closed),s=a.length,c=t.closed?s:s-1,l=e=>i?[i.sym?(Math.abs(e)-i.inner)/i.lw:(e-i.off)/i.lw,i.n]:[-1,0],u=i?.sym?[[e=>-n(e),()=>0],[()=>0,e=>n(e)]]:[[e=>-n(e),e=>n(e)]];for(let[t,n]of u)for(let i=0;i<c;i++){let c=(i+1)%s;e.quad(Zf(a[i],o[i],t(i),r),Zf(a[c],o[c],t(c),r),Zf(a[c],o[c],n(c),r),Zf(a[i],o[i],n(i),r),void 0,void 0,void 0,[l(t(i)),l(t(c)),l(n(c)),l(n(i))])}}var cp=(e,t)=>Math.abs(e)<280&&Math.abs(t)<218;function lp(e,t,n){let r=new Ga(e,24,12,0,Math.PI*2,0,Math.PI/2+.15),i=r.attributes.position,a=[],o=new J;for(let r=0;r<i.count;r++){let s=Math.max(0,i.getY(r)/e);o.copy(t).lerp(n,s**.6),a.push(o.r,o.g,o.b)}r.setAttribute(`color`,new hr(a,3));let s=new Zr(r,new zr({vertexColors:!0,side:1,fog:!1,depthWrite:!1}));return s.renderOrder=-10,s.frustumCulled=!1,s}function up(e,t){let n=new Yf,r=(()=>{let e=77;return()=>(e=e*16807%2147483647)/2147483647})(),i=e/770,a=Array.from({length:90},(e,t)=>(18+30*Math.abs(Math.sin(t*.37))+r()*25)*i);for(let o=0;o<2;o++){let s=e*(o?.97:1);for(let e=0;e<90;e++){let c=e/90*Math.PI*2+o*.03,l=(e+1)/90*Math.PI*2+o*.03,u=a[(e+o*37)%90]*(o?.6:1),d=a[(e+1+o*37)%90]*(o?.6:1),f=(e,t,n)=>[Math.cos(t)*e,n,Math.sin(t)*e],p=new J().setHSL(.3+r()*.05,.22,.34+r()*.06).lerp(t,o?.45:.62);n.quad(f(s,c,-8*i),f(s,l,-8*i),f(s,l,d),f(s,c,u),[-Math.cos(c),0,-Math.sin(c)],void 0,p)}}return n.build()}var dp=[`residencial`,`oficinas`,`antiguo`,`moderno`,`industrial`];function fp(e){return{wear:Md(e),shop:Fd(e),facades:Object.fromEntries(dp.map(t=>[t,Pd(t,e)]))}}function pp(e){return[e.wear,e.shop,...Object.values(e.facades)]}var mp=(e,t)=>cp(e,t)?`c${Math.floor(e/150)},${Math.floor(t/150)}`:`r${Math.floor(e/300)},${Math.floor(t/300)}`;function hp(e){let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e4/1e4}function gp(e){let t=new Uint8Array(131072).fill(255),n=e===`antiguo`?{x:27,t:10,b:8}:{x:16,t:10,b:12};for(let e of[0,128])for(let r=0;r<4;r++){let i=36+r*128-n.x,a=36+r*128+56+n.x,o=e+24-n.t,s=e+24+78+n.b;for(let e=Math.floor(o/2);e<Math.ceil(s/2);e++)for(let n=Math.floor(i/2);n<Math.ceil(a/2);n++){let r=((127-e)*256+(n%256+256)%256)*4;t[r]=t[r+1]=t[r+2]=0}}let r=new ei(t,256,128,F,E);return r.wrapS=r.wrapT=_,r.magFilter=C,r.minFilter=T,r.generateMipmaps=!0,r.needsUpdate=!0,r}function _p(e,t,n){return t===`bajo`||n>=1&&Ef.includes(e)?512:e===`asphalt`&&t===`alto`?2048:1024}var vp={"frenada-doble":{w:2,l:9,weight:3},"frenada-curva":{w:1.6,l:8,weight:2},parche:{w:2.6,l:3.4,weight:3},"parche-irregular":{w:2.4,l:2.4,weight:2},aceite:{w:1.3,l:1.3,weight:4},goteo:{w:.7,l:6,weight:3},goma:{w:2.4,l:10,weight:2},"marca-borrada":{w:1.6,l:5,weight:2},"grieta-sellada":{w:.9,l:6,weight:4},"grieta-ramificada":{w:1.6,l:6,weight:3},tapa:{w:.8,l:.8,weight:3},rejilla:{w:.5,l:.7,weight:2,side:1},humedad:{w:2.6,l:2.6,weight:2},hojas:{w:1.6,l:1.6,weight:2,side:1},"linea-desgastada":{w:.7,l:5,weight:2},arena:{w:2.2,l:2.2,weight:2,side:1}};function yp(e,t,n,r,i=!1){let a=new wn,o=[],s=[],c=Ff(),l=e=>(o.push(e),e),u=(e,t,n={})=>{o.push(e);let r=new Zr(e,t);if(r.castShadow=!1,r.receiveShadow=!!n.receive,r.matrixAutoUpdate=!1,r.updateMatrix(),n.order!==void 0&&(r.renderOrder=n.order),a.add(r),n.chunk){e.computeBoundingSphere();let t=e.boundingSphere;s.push({obj:r,center:t.center.clone(),radius:t.radius,kind:n.chunk}),n.chunk===`detail`&&r.layers.set(1)}return r},d=fp(i?.5:1),f=t,p=0,m=e=>n.get(e,_p(e,f,p)),h=[],g=(e,t,n,i={})=>(h.push({h:zd(e,m(t),r,{space:`world`,tile:n,...i}),id:t}),e),_=jd(),v=Nf(e),y=Pf(e),b=Nd();o.push(_,v,y,b),c.uMacro.value=_,c.uBake.value=v,c.uSplat.value=y,o.push(...pp(d));let x=new Wa(1600,1600,170,170);x.rotateX(-Math.PI/2);let S=x.attributes.position,C=[],w=e.blocks.find(e=>e.i===hd.i&&e.j===hd.j).corners.map(e=>({x:e.x,z:e.z})),T=e.cityOutline(),E=new J(10130826),D=new J(7309906),O=new J(6257221),k=new J(7244366),A=new J(6064714);for(let e=0;e<S.count;e++){let t=S.getX(e),n=S.getZ(e);S.setY(e,Hu(t,n)-.18);let r=gd({x:t,z:n},w),i=gd({x:t,z:n},T),a=r?A:i?Math.sin(t*.11+n*.07)+Math.cos(n*.13-t*.05)>.9?D:E:Math.sin(t*.05)+Math.cos(n*.07)>0?O:k;C.push(a.r,a.g,a.b)}x.setAttribute(`gtint`,new hr(C,3)),x.computeVertexNormals();let j=l(new ao({map:m(`grassA`).albedo}));Rf(j,`ground`,c,r,{macro:.35,detail:.4}),u(x,j,{receive:!0});let M=new Yf(5,!0),N=new Yf(5,!0),ee=new Yf(2),P=new Yf(3),te=new Yf,ne=e=>e.x>Au.hx-20&&e.z>-2&&e.z<262,re=e=>e.x<-Au.hx+20&&e.z>118&&e.z<262;for(let t of e.roads){let e=e=>(t.widths?.[e]??t.width)/2,n=hp(t.id),r=t.kind===`ramal`?N:M;if(r.setUvTransform(n*Math.PI*2,4.4+n*1.6,n*7.3,n*3.1),sp(r,t,e,t.kind===`ramal`?.012:0),t.sidewalk){let n=.15;for(let r of[1,-1])Qf(ee,t,()=>r*e(0),()=>r*(e(0)+3),n),$f(ee,t,r*e(0),0,n,r===1?-1:1)}if(t.kind===`calle`&&t.rural){let e=t.width/2-.25;ep(P,t,e,.12,null),ep(P,t,-e,.12,null);let n=e=>e.x<id;ep(P,t,0,.12,[4,6],n),ep(P,t,0,.12,null,e=>!n(e))}if(t.kind===`calle`){t.rural||ep(P,t,0,.12,[3,3]);let e=t.pts.length;for(let[n,r]of[[t.pts[0],t.pts[1]],[t.pts[e-1],t.pts[e-2]]]){let e=Math.hypot(r.x-n.x,r.z-n.z),t=(r.x-n.x)/e,i=(r.z-n.z)/e,a=-i,o=t;for(let e=-3;e<=3;e++){let r=e*1,s={x:n.x+t*1.5+a*(r-.25),z:n.z+i*1.5+o*(r-.25)},c=[[s.x,0,s.z],[s.x+t*4,0,s.z+i*4],[s.x+t*4+a*.5,0,s.z+i*4+o*.5],[s.x+a*.5,0,s.z+o*.5]];for(let e of c)e[1]=Hu(e[0],e[2])+.03;P.quad(c[0],c[1],c[2],c[3])}}}else if(t.kind===`autovia`){let e=Au.median/2;for(let n of[1,-1])ep(P,t,n*(e+.25),.15,null),ep(P,t,n*(e+Au.lane),.15,[4,8]),ep(P,t,n*ld,.2,null,n===1?e=>ne(e)||re(e):void 0);Qf(ee,t,()=>-e,()=>e,.12),Qf(te,t,()=>-.3,()=>.3,.85),$f(te,t,.3,0,.85,1),$f(te,t,-.3,0,.85,-1)}else{let e=t.width/2-.2;ep(P,t,e,.15,null),ep(P,t,-e,.3,null,e=>ne(e)||re(e)),ep(P,t,-e,.3,[1,1],e=>!(ne(e)||re(e)))}}M.setUvTransform(.4,5);for(let t of e.junctions)t.kind!==`rotonda`&&(ip(M,t.x,t.z,7.05,0),rp(ee,t,7,10,.15));{let e=Mu;M.setUvTransform(1.1,5.5),tp(M,e.minX,e.maxX,e.minZ,e.maxZ,.004);let t=(e,t,n,r,i=.12)=>{let a=Math.hypot(n-e,r-t),o=-(r-t)/a*(i/2),s=(n-e)/a*(i/2);P.quad([e-o,.03,t-s],[n-o,.03,r-s],[n+o,.03,r+s],[e+o,.03,t+s])},n=Lu.linea;for(let e=n.x-n.length/2-13-4.3;e<=n.x+n.length/2+6.5;e+=6.5)t(e,255,e,255+n.width);t(-395,255+n.width,-325,255+n.width);let r=Lu.bateria;for(let e=-5;e<=6;e++){let n=r.x-r.width/2+e*r.width;t(n,r.z-r.length/2,n,r.z+r.length/2)}let i=Lu.oblicuo,a={x:Math.sin(i.heading),z:Math.cos(i.heading)},o={x:-a.z,z:a.x};for(let e=-3;e<=2;e++){let n=i.x-a.x*i.length/2+o.x*(i.width/2+e*i.width),r=i.z-a.z*i.length/2+o.z*(i.width/2+e*i.width);t(n,r,n+a.x*i.length,r+a.z*i.length)}let s=Lu.sentido;for(let e=-393;e<-332;e+=6)t(e,s.z,e+3,s.z);for(let e of zu())np(ee,e.minX,e.maxX,0,.15,e.minZ,e.maxZ)}let ie=ku;M.setUvTransform(.9,5),ap(M,ie.x,ie.z,ie.rIn,ie.rOut,.001,2),rp(ee,e.junctions.find(e=>e.kind===`rotonda`),ie.rOut,ie.rOut+3,.151);let ae=new Si(ie.rIn,ie.rIn+.2,.3,48);ae.translate(ie.x,.15,ie.z),u(ae,l(new ao({color:6064714})),{receive:!0});let F=e=>({id:`rot`,name:``,kind:`calle`,closed:!0,width:0,lanes:[],limit:30,sidewalk:!1,oneWay:!0,pts:Array.from({length:64},(t,n)=>({x:ie.x+e*Math.cos(n/64*Math.PI*2),z:ie.z+e*Math.sin(n/64*Math.PI*2)}))});ep(P,F(ie.rIn+.3),0,.15,null),ep(P,F((ie.rIn+ie.rOut)/2),0,.12,[2.5,2.5]);let oe={uPk:{value:m(`asphalt`).packed}},se=l(new ro({color:15921906,map:m(`asphalt`).albedo,normalMap:m(`asphalt`).normal,roughness:1,metalness:0,normalScale:new G(1,1)}));Rf(se,`asphalt`,c,r,{macro:.3,detail:.45,extra:oe});let I=l(new ro({color:16777215,map:m(`asphalt`).albedo,normalMap:m(`asphalt`).normal,roughness:1,metalness:0,normalScale:new G(1,1),polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));Rf(I,`asphalt`,c,r,{macro:.3,detail:.45,extra:oe});let ce=l(new ao({color:16052712,map:m(`line`).albedo,normalMap:m(`line`).normal,alphaMap:d.wear,alphaTest:.5,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));Rf(ce,`baked`,c,r,{macro:.25,detail:.2});let le={uPk:{value:m(`paving`).packed}},ue=l(new ao({color:16777215,map:m(`paving`).albedo,normalMap:m(`paving`).normal}));Rf(ue,`baked`,c,r,{macro:.22,detail:.35,extra:le}),u(M.build(),se,{receive:!0}),u(N.build(),I,{receive:!0}),u(ee.build(),ue,{receive:!0}),u(P.build(),ce,{receive:!0,order:1}),u(te.build(),g(l(new ao({color:16777215})),`concrete`,2.4,{albedo:1.25}),{receive:!0});let de=new Map,fe=new Map,pe=new Map,me=new Map,he=(e,t)=>{let n=e.get(t);return n||e.set(t,n=new Yf),n},ge={w:12,h:6.4},_e=(()=>{let e=4242;return()=>(e=e*16807%2147483647)/2147483647})();for(let t of e.buildings){let e=mp(t.obb.cx,t.obb.cz),n=new J(t.color),r=xu(t.obb),i=t.base,a=t.base+1+4.2,o=t.height,s=t.style===`antiguo`?new J(10508090):n.clone().multiplyScalar(.62);he(pe,e).quad([r[0].x,o,r[0].z],[r[1].x,o,r[1].z],[r[2].x,o,r[2].z],[r[3].x,o,r[3].z],[0,1,0],void 0,s);let c=he(de,`${t.style}|${e}`),l=he(fe,e),u=(t.obb.cx*.37+t.obb.cz*.11)%1;for(let e=0;e<4;e++){let s=r[e],d=r[(e+1)%4],f=Math.hypot(d.x-s.x,d.z-s.z),p=[(s.z-d.z)/f,0,(d.x-s.x)/f],m=(s.x+d.x)/2-t.obb.cx,h=(s.z+d.z)/2-t.obb.cz;p[0]*m+p[2]*h<0&&(p[0]=-p[0],p[2]=-p[2]);let g=f/ge.w;if(t.style===`industrial`){c.quad([s.x,i,s.z],[d.x,i,d.z],[d.x,o,d.z],[s.x,o,s.z],p,[[u,0],[u+g,0],[u+g,1],[u,1]],n);continue}l.quad([s.x,i,s.z],[d.x,i,d.z],[d.x,a,d.z],[s.x,a,s.z],p,[[u,-.24],[u+f/24,-.24],[u+f/24,1],[u,1]],n.clone().lerp(new J(16777215),.3));let _=(o-a)/ge.h;c.quad([s.x,a,s.z],[d.x,a,d.z],[d.x,o,d.z],[s.x,o,s.z],p,[[u,0],[u+g,0],[u+g,_],[u,_]],n)}let d=he(me,e),f=1+Math.floor(_e()*3);for(let e=0;e<f;e++){let e=t.obb,n=(_e()*2-1)*(e.hu-2.5),r=(_e()*2-1)*(e.hv-2.5),i=e.cx+e.ux*n-e.uz*r,a=e.cz+e.uz*n+e.ux*r,s=1+_e()*2.2;np(d,i-s/2,i+s/2,o,o+.8+_e()*1.8,a-s/2,a+s/2)}}let ve=new Map(dp.map(e=>[e,l(new ao({map:d.facades[e],vertexColors:!0}))])),ye={uWallA:{value:m(`brick`).albedo},uWallN:{value:m(`brick`).normal}};for(let[e,t]of[[`antiguo`,.85],[`residencial`,.5]]){let n=gp(e);o.push(n),Rf(ve.get(e),`facade`,c,r,{detail:.3,extra:{...ye,uWallMask:{value:n},uWallK:{value:new K(12/1.3,6.4/1.3,t)}}})}for(let[e,t]of de)u(t.build(),ve.get(e.split(`|`)[0]),{chunk:`far`});let be=l(new ao({map:d.shop,vertexColors:!0}));for(let e of fe.values())u(e.build(),be,{chunk:`far`});let xe=g(l(new ao({color:14210508,vertexColors:!0})),`gravel`,3,{albedo:1.45,normal:.8,detail:0});for(let e of pe.values())u(e.build(),xe,{chunk:`far`});let Se=g(l(new ao({color:13158077})),`metal`,1.6,{albedo:1.1,detail:0});for(let e of me.values())u(e.build(),Se,{chunk:`detail`});let L=ju,Ce=new ta;Ce.moveTo(-34,0),Ce.bezierCurveTo(-24,10,-12,15,0,15),Ce.bezierCurveTo(12,15,24,10,34,0),Ce.lineTo(L.halfWidth,0),Ce.lineTo(L.halfWidth,L.height),Ce.lineTo(-L.halfWidth,L.height),Ce.lineTo(-L.halfWidth,0),Ce.lineTo(-34,0);let we=new za(Ce,{depth:L.x1-L.x0,bevelEnabled:!1,curveSegments:10});we.rotateY(-Math.PI/2),we.translate(L.x1,-.2,L.z),u(we,l(new ao({color:5599294})),{receive:!0});let Te=new Yf,Ee=.15;Te.quad([L.x0,L.height-Ee,L.z-L.halfWidth],[L.x1,L.height-Ee,L.z-L.halfWidth],[L.x1,L.height-Ee,L.z+L.halfWidth],[L.x0,L.height-Ee,L.z+L.halfWidth],[0,-1,0]);for(let e of[1,-1]){let t=L.z+e*(L.halfWidth-Ee);Te.quad([L.x0,0,t],[L.x1,0,t],[L.x1,L.height,t],[L.x0,L.height,t],[0,0,-e])}u(Te.build(),g(l(new ao({color:13816010})),`concrete`,3,{albedo:1.2}));let De=new Yf;for(let e=L.x0+6;e<L.x1;e+=12)for(let t of[1,-1])np(De,e-1.2,e+1.2,L.height-.35,L.height-Ee-.01,L.z+t*5-.15,L.z+t*5+.15);u(De.build(),l(new zr({color:16769704})));let Oe=new Si(.18,.25,2.4,6);Oe.translate(0,1.2,0);let ke=new Ha(2,0);ke.translate(0,3.6,0);let Ae=new Ha(1.4,0);Ae.translate(.9,4.6,.3);let je=new Dr;{let e=e=>e.index?e.toNonIndexed():e,t=e(ke),n=e(Ae),r=new Float32Array([...t.attributes.position.array,...n.attributes.position.array]);je.setAttribute(`position`,new fr(r,3)),je.computeVertexNormals(),t.dispose(),n.dispose()}let R=new Ci(1.9,6.5,7);R.translate(0,5.2,0);let Me=new Wa(1,1).rotateX(-Math.PI/2);o.push(Oe,ke,Ae,je,R,Me);let Ne=l(new ao({color:7032629})),Pe=l(new ao({color:16777215})),z=l(new zr({color:0,alphaMap:b,transparent:!0,opacity:.4,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})),Fe=(e,t)=>e>kf.x0&&t>kf.z0&&e<kf.x0+kf.size&&t<kf.z0+kf.size,B=(e,t)=>!cp(t.x,t.z)&&e%2==0,V=new Map;e.trees.forEach((e,t)=>{let n=mp(e.x,e.z),r=V.get(n);r?r.push(t):V.set(n,[t])});let Ie=new Yt,Le=new Et,Re=new K,ze=new K,Be=new K(0,1,0),Ve=new J,He=Of.x/Of.y,Ue=Of.z/Of.y,We=(e,t,n)=>{let r=new li(e,t,Math.max(1,n));return r.count=n,r.matrixAutoUpdate=!1,o.push(r),r},Ge=(e,t)=>{e.count!==0&&(e.computeBoundingSphere(),a.add(e),s.push({obj:e,center:e.boundingSphere.center.clone(),radius:e.boundingSphere.radius,kind:t}),t===`detail`&&e.layers.set(1))};for(let t of V.values()){let n=t.filter(t=>B(t,e.trees[t])).length,r=t.filter(t=>!Fe(e.trees[t].x,e.trees[t].z)).length,i=We(Oe,Ne,t.length),a=We(je,Pe,t.length-n),o=We(R,Pe,n),s=We(Me,z,r);s.renderOrder=1;let c=0,l=0,u=0;t.forEach((t,n)=>{let r=e.trees[t],d=.8+t*7919%100/220;Le.setFromAxisAngle(Be,t);let f=Hu(r.x,r.z)+(cp(r.x,r.z)?.15:-.1);if(Ie.compose(ze.set(r.x,f,r.z),Le,Re.set(d,d,d)),i.setMatrixAt(n,Ie),B(t,r)?(o.setMatrixAt(l,Ie),o.setColorAt(l++,Ve.setHSL(.33+t*7%10/300,.4,.2+t*17%10/120))):(a.setMatrixAt(c,Ie),a.setColorAt(c++,Ve.setHSL(.24+t*13%10/160,.42,.17+t*31%10/110))),!Fe(r.x,r.z)){let e=2.2*d;Ie.compose(ze.set(r.x-He*e,f+.2,r.z-Ue*e),Le.identity(),Re.set(5.5*d,1,4.6*d)),s.setMatrixAt(u++,Ie)}}),Ge(i,`detail`),Ge(a,`trees`),Ge(o,`trees`),Ge(s,`detail`)}let Ke=new Si(.07,.1,6,6);Ke.translate(0,3,0);let qe=new xi(.35,.18,1.2);qe.translate(0,6,.5),o.push(Ke,qe);let Je=g(l(new ro({color:6054771,metalness:.35,roughness:1})),`metal`,.9,{albedo:1.15,detail:0}),Ye=g(l(new ro({color:11187138,metalness:.35,roughness:1})),`metal`,.9,{albedo:1.15,detail:0}),Xe=new Map;e.lamps.forEach((e,t)=>{let n=mp(e.x,e.z),r=Xe.get(n);r?r.push(t):Xe.set(n,[t])});for(let t of Xe.values()){let n=We(Ke,Je,t.length),r=We(qe,Ye,t.length);t.forEach((t,i)=>{let a=e.lamps[t];Le.setFromAxisAngle(Be,a.heading),Ie.compose(ze.set(a.x,Hu(a.x,a.z)+.15,a.z),Le,Re.set(1,1,1)),n.setMatrixAt(i,Ie),r.setMatrixAt(i,Ie)}),Ge(n,`far`),Ge(r,`detail`)}let Ze=new J(14411503),Qe=new wn,$e=lp(400,Ze,new J(6131664)),et=new Zr(up(390,Ze),new zr({vertexColors:!0,fog:!1,depthWrite:!1}));et.renderOrder=-9,et.frustumCulled=!1,Qe.add($e,et),o.push($e.geometry,$e.material,et.geometry,et.material),a.add(Qe);{let t=(()=>{let e=9001;return()=>(e=e*16807%2147483647)/2147483647})(),i=bf,a=i.reduce((e,t)=>e+vp[t].weight,0),o=()=>{let e=t()*a;for(let t of i)if((e-=vp[t].weight)<=0)return t;return i[0]},s=new Map,d=(e,t,n,r,a=1)=>{let o=vp[e],c=o.w*a/2,l=o.l*a/2,u=Math.sin(r),d=Math.cos(r),f=d,p=-u,m=(e,r)=>{let i=t+f*c*e+u*l*r,a=n+p*c*e+d*l*r;return[i,Hu(i,a)+.035,a]},h=i.indexOf(e),g=h%4/4,_=Math.floor(h/4)/4,v=1/4;he(s,mp(t,n)).quad(m(-1,-1),m(1,-1),m(1,1),m(-1,1),[0,1,0],[[g,_],[g+v,_],[g+v,_+v],[g,_+v]])};for(let n of e.roads){if(n.closed||n.kind===`autovia`||n.kind===`ramal`)continue;let r=vd(n.pts),i=n.width/Math.max(1,n.lanes.length);n.lanes.forEach((a,s)=>{for(let a=14+t()*20;a<r-16;a+=16+t()*30){let r=o(),c=e.roadPose(n.id,a,s),l=vp[r].side?i*.38:(t()-.5)*i*.35,u=c.x+Math.cos(c.heading)*l,f=c.z-Math.sin(c.heading)*l;e.query(u,f).surface===`calzada`&&d(r,u,f,c.heading+(r===`aceite`||r===`humedad`||r===`arena`?t()*6:(t()-.5)*.08),.85+t()*.3)}if(r>60&&t()<.7){let i=e.roadPose(n.id,r-20-t()*8,s);e.query(i.x,i.z).surface===`calzada`&&d(t()<.5?`frenada-doble`:`frenada-curva`,i.x,i.z,i.heading,1)}})}let f=l(new ao({map:n.decals,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}));Rf(f,`baked`,c,r,{macro:0,detail:0});for(let e of s.values())u(e.build(),f,{receive:!0,order:2,chunk:`detail`})}let tt=Vf[t],nt=0,rt=null,it=!1,at=()=>{let e=m(`asphalt`);for(let t of[se,I])t.map=e.albedo,t.normalMap=e.normal;oe.uPk.value=e.packed,j.map=m(`grassA`).albedo,c.uGrassN.value=m(`grassA`).normal,c.uGrassB.value=m(`grassB`).albedo,c.uDirt.value=m(`dirt`).albedo,c.uDirtN.value=m(`dirt`).normal,c.uGravel.value=m(`gravel`).albedo,ce.map=m(`line`).albedo,ce.normalMap=m(`line`).normal,ue.map=m(`paving`).albedo,ue.normalMap=m(`paving`).normal,le.uPk.value=m(`paving`).packed,ye.uWallA.value=m(`brick`).albedo,ye.uWallN.value=m(`brick`).normal;for(let e of h)e.h.set(m(e.id))};return at(),{group:a,sky:Qe,uniforms:c,setLevel(e){tt=Vf[e],e!==f&&(f=e,at())},setTexDegrade(e){e!==p&&(p=e,at())},setEnvMap(e){rt=e},setWeather(e,t){$e.material.color.setHex(e),et.material.color.setHex(e),r.uWet.value=t;let n=t>.05&&!!rt;if(n!==it){it=n;for(let e of[se,I])e.envMap=n?rt:null,e.envMapIntensity=.85,e.needsUpdate=!0}},cull(e){nt=0;for(let t of s){let n=t.kind===`detail`?tt.detail:t.kind===`trees`?tt.far*.8:tt.far,r=Math.hypot(t.center.x-e.x,t.center.z-e.z)-t.radius;t.obj.visible=r<n,t.obj.visible&&nt++}},visibleChunks:()=>nt,dispose(){for(let e of o)e.dispose()}}}function bp(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Dr;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=xp(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=xp(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function xp(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new fr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Q={mass:1250,wheelbase:2.6,track:1.5,length:4.2,width:1.8,wheelRadius:.31,ratios:{R:-3.4,N:0,1:3.6,2:2.1,3:1.45,4:1.1,5:.87},finalDrive:4.1,efficiency:.9,idleRpm:850,stallRpm:500,redlineRpm:6200,limiterRpm:6500,engineInertia:.18,idleTorqueMax:80,clutchMaxTorque:260,clutchBiteStart:.7,clutchBiteEnd:.18,brakeForce:11e3,handbrakeForce:5200,rollingCoef:.013,offroadRollingCoef:.09,dragCoef:.43,maxSteer:34*Math.PI/180,steerRate:1.3,maxLateralAccel:7.5,tankLiters:45},Sp=[[0,0],[800,95],[1500,122],[2500,142],[3500,150],[4500,147],[5500,135],[6200,118],[6800,0]];function Cp(e){if(e<=0)return 0;for(let t=1;t<Sp.length;t++){let[n,r]=Sp[t],[i,a]=Sp[t-1];if(e<=n)return a+(r-a)*(e-i)/(n-i)}return 0}function wp(e){return 1-(1-Math.min(1,Math.max(0,e)))**2.2}function Tp(e){return e<=0?0:11+.0045*e}function Ep(e){return(Q.ratios[String(e)]??0)*Q.finalDrive}function Dp(e){let t=(Q.clutchBiteStart-e)/(Q.clutchBiteStart-Q.clutchBiteEnd),n=Math.min(1,Math.max(0,t));return n*n}var Op=60/(2*Math.PI),kp={facil:{rpm:400,assist:1.3,label:`Fácil (400 rpm, más tolerante)`},normal:{rpm:500,assist:1,label:`Normal (500 rpm)`},realista:{rpm:600,assist:.85,label:`Realista (600 rpm)`}},Ap={"embrague-brusco":`embrague soltado de golpe`,"frenar-sin-embrague":`frenar hasta parar sin pisar el embrague`,"marcha-larga":`salir en marcha larga sin acelerar`,pendiente:`cuesta arriba con poco gas`,"poco-gas":`poco acelerador al soltar el embrague`};function jp(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,{c:n,ctx:n.getContext(`2d`)}}function Mp(e,t,n,r,i,a){e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+i,a),e.arcTo(t+r,n+i,t,n+i,a),e.arcTo(t,n+i,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath()}function Np(e,t,n,r,i){if(t===`interior`){Mp(e,i,i,n-2*i,r-2*i,(r-2*i)*.42);return}let a=i,o=n-i,s=i,c=r-i;e.beginPath(),e.moveTo(a+(o-a)*.08,s+(c-s)*.12),e.lineTo(a+(o-a)*.55,s),e.quadraticCurveTo(o,s,o,s+(c-s)*.42),e.quadraticCurveTo(o,c,a+(o-a)*.6,c),e.lineTo(a+(o-a)*.1,c),e.quadraticCurveTo(a,c,a,c-(c-s)*.2),e.lineTo(a,s+(c-s)*.25),e.quadraticCurveTo(a,s+(c-s)*.14,a+(o-a)*.08,s+(c-s)*.12),e.closePath()}function Pp(e,t){let n=new _i(e);return n.colorSpace=t?Ze:``,n}function Fp(e,t=3){let[n,r]=e===`interior`?[256,72]:[160,100],{c:i,ctx:a}=jp(n,r);return a.fillStyle=`#000`,a.fillRect(0,0,n,r),a.fillStyle=`#fff`,Np(a,e,n,r,t),a.fill(),Pp(i,!1)}function Ip(e){let[t,n]=e===`interior`?[512,144]:[160,100],{c:r,ctx:i}=jp(t,n);if(i.clearRect(0,0,t,n),e===`interior`){i.fillStyle=`rgba(14,16,20,0.86)`,i.beginPath(),i.moveTo(0,0),i.lineTo(t,0),i.lineTo(t,n*.13),i.quadraticCurveTo(t/2,n*.2,0,n*.13),i.closePath(),i.fill();for(let e of[0,1])i.beginPath(),e===0?(i.moveTo(0,0),i.lineTo(t*.09,0),i.lineTo(t*.04,n),i.lineTo(0,n)):(i.moveTo(t,0),i.lineTo(t*.91,0),i.lineTo(t*.96,n),i.lineTo(t,n)),i.closePath(),i.fill();i.fillRect(0,n*.9,t,n*.1),i.fillStyle=`rgba(28,30,34,0.9)`;for(let e of[.28,.72])Mp(i,t*e-t*.055,n*.68,t*.11,n*.26,n*.08),i.fill();i.strokeStyle=`rgba(120,70,40,0.16)`,i.lineWidth=1;for(let e=n*.34;e<n*.8;e+=n*.07)i.beginPath(),i.moveTo(t*.12,e),i.lineTo(t*.88,e),i.stroke()}let a=Math.min(t,n)*.22;for(let[e,r,o,s]of[[0,0,a,0],[t,0,t-a,0],[0,0,0,a],[0,n,0,n-a]]){let a=i.createLinearGradient(e,r,o,s);a.addColorStop(0,`rgba(0,0,0,0.35)`),a.addColorStop(1,`rgba(0,0,0,0)`),i.fillStyle=a,i.fillRect(0,0,t,n)}let o=i.createLinearGradient(0,0,t,n);return o.addColorStop(0,`rgba(255,255,255,0.14)`),o.addColorStop(.35,`rgba(255,255,255,0.02)`),o.addColorStop(1,`rgba(255,255,255,0)`),i.fillStyle=o,i.fillRect(0,0,t,n),i.globalCompositeOperation=`destination-in`,i.fillStyle=`#fff`,Np(i,e,t,n,e===`interior`?6:3),i.fill(),i.globalCompositeOperation=`source-over`,i.strokeStyle=`rgba(200,210,220,0.35)`,i.lineWidth=2,Np(i,e,t,n,e===`interior`?6:3),i.stroke(),Pp(r,!0)}var Lp=new K(.37,1.17,-.12),Rp=Q.length/2,zp=Q.wheelbase/2,Bp=.42,Vp=(e,t,n)=>Math.exp(-(((e-t)/n)**2));function Hp(e){let t=.885;return e>1.65&&(t-=.22*((e-1.65)/.45)**2),e<-1.8&&(t-=.1*((-1.8-e)/.3)**2),t+=.02*(Vp(e,zp,.35)+Vp(e,-zp,.35)),t}function Up(e){return e>.95?.885-.13*((e-.95)/(Rp-.95))**1.6:e<-1.78?.985-.16*((-1.78-e)/.32)**1.5:.9+.08*((.95-e)/2.73)}function Wp(e){let t=.22;e>1.8&&(t+=.2*((e-1.8)/.3)**2),e<-1.85&&(t+=.16*((-1.85-e)/.25)**2);for(let n of[zp,-zp]){let r=(e-n)/Bp;Math.abs(r)<1&&(t=Math.max(t,.13+.56*Math.sqrt(1-r*r)))}return t}var Gp=.36;function Kp(e){return e>Gp?1.44-(1.44-Up(.98))*((e-Gp)/.62)**1.15:e<-1.28?1.45-(1.45-1)*((-1.28-e)/.66)**1.4:1.44+.012*Math.cos((e+.6)/.7*1.2)}var qp=(e,t)=>Math.sign(e)*Math.abs(e)**t;function Jp(e,t,n,r={}){let i=[],a=2/n;for(let n of e){let e=(n.yb+n.yt)/2,o=(n.yt-n.yb)/2;for(let s=0;s<t;s++){let c=s/t*Math.PI*2,l=qp(Math.sin(c),a),u=qp(Math.cos(c),a),d=(l+1)/2,f=u*(n.wb+(n.wt-n.wb)*d),p=e+l*o;r.deform&&(p+=r.deform(f,p,n,l>.2)),i.push(f,p,n.z)}}let o=[[],[],[]],s=new K,c=new K,l=new K,u=new K,d=new K,f=(e,t)=>t.set(i[e*3],i[e*3+1],i[e*3+2]),p=new K,m=(e,t,n,i,a)=>r.classify?(f(e,l),f(t,u),f(n,d),f(i,p),s.copy(l).add(u).add(d).add(p).multiplyScalar(.25),c.subVectors(d,l).cross(p.clone().sub(u)).normalize(),r.classify(s,c,a)):0,h=(e,t,n,i,a=-1)=>{a<0&&(a=0,r.classify&&(f(e,l),f(t,u),f(n,d),s.copy(l).add(u).add(d).multiplyScalar(1/3),c.subVectors(u,l).cross(d.clone().sub(l)).normalize(),a=r.classify(s,c,i))),o[a].push(e,t,n)};for(let n=0;n<e.length-1;n++)for(let r=0;r<t;r++){let i=(r+1)%t,a=n*t+r,o=n*t+i,s=(n+1)*t+i,c=(n+1)*t+r,l=m(a,o,s,c,e[n]);h(a,o,s,e[n],l),h(a,s,c,e[n],l)}if(r.caps!==!1)for(let[n,r]of[[0,!0],[e.length-1,!1]]){let a=e[n],o=i.length/3,s=0,c=0;for(let e=0;e<t;e++)s+=i[(n*t+e)*3],c+=i[(n*t+e)*3+1];i.push(s/t,c/t,a.z+(r?-.02:.02));for(let e=0;e<t;e++){let i=(e+1)%t;r?h(o,n*t+i,n*t+e,a):h(o,n*t+e,n*t+i,a)}}let g=new Dr;g.setAttribute(`position`,new hr(i,3));let _=[],v=0;return o.forEach((e,t)=>{e.length&&(_.push(...e),g.addGroup(v,e.length,t),v+=e.length)}),g.setIndex(_),g.computeVertexNormals(),g}function Yp(e,t){let n=new ta,r=e.length;for(let i=0;i<r;i++){let a=e[i],o=e[(i-1+r)%r],s=e[(i+1)%r],c=Math.hypot(a[0]-o[0],a[1]-o[1]),l=Math.hypot(s[0]-a[0],s[1]-a[1]),u=Math.min(t,c/2,l/2),d=[a[0]+(o[0]-a[0])/c*u,a[1]+(o[1]-a[1])/c*u],f=[a[0]+(s[0]-a[0])/l*u,a[1]+(s[1]-a[1])/l*u];i===0?n.moveTo(d[0],d[1]):n.lineTo(d[0],d[1]),n.quadraticCurveTo(a[0],a[1],f[0],f[1])}return n.closePath(),n}var Xp=e=>e.index?e.toNonIndexed():e,Zp=e=>(e.deleteAttribute(`uv`),e);function Qp(e,t,n,r,i){e.fillStyle=`#05070b`,e.fillRect(0,0,256,128);let a=(t,n,r,i,a,o)=>{let s=Math.PI*.75,c=Math.PI*1.5;e.lineWidth=2,e.strokeStyle=`#2a3a55`,e.beginPath(),e.arc(t,64,54,s,s+c),e.stroke(),i<r&&(e.strokeStyle=`#b3261e`,e.lineWidth=4,e.beginPath(),e.arc(t,64,52,s+i/r*c,s+c),e.stroke()),e.fillStyle=`#9fb3d1`,e.font=`9px Helvetica, Arial, sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`;for(let n=0;n<=r;n+=o){let i=s+n/r*c;e.strokeStyle=`#cfe0ff`,e.lineWidth=1.5,e.beginPath(),e.moveTo(t+Math.cos(i)*47,64+Math.sin(i)*47),e.lineTo(t+Math.cos(i)*54,64+Math.sin(i)*54),e.stroke(),e.fillText(String(a===`x1000`?n/1e3:n),t+Math.cos(i)*38,64+Math.sin(i)*38)}let l=s+c*Math.min(1,n/r);e.strokeStyle=`#ff5a3c`,e.lineWidth=2.5,e.beginPath(),e.moveTo(t,64),e.lineTo(t+Math.cos(l)*48,64+Math.sin(l)*48),e.stroke(),e.fillStyle=`#1d2a40`,e.beginPath(),e.arc(t,64,5,0,Math.PI*2),e.fill(),e.fillStyle=`#6f84a6`,e.font=`8px Helvetica, Arial, sans-serif`,e.fillText(a===`x1000`?`rpm ×1000`:`km/h`,t,96)};a(64,n,7e3,6e3,`x1000`,1e3),a(192,t,200,999,`kmh`,20),e.fillStyle=`#e8f0ff`,e.font=`bold 16px Helvetica, Arial, sans-serif`,e.textAlign=`center`,e.fillText(String(Math.round(t)),192,80),e.fillStyle=`#7cc4ff`,e.font=`bold 15px Helvetica, Arial, sans-serif`,e.fillText(r,128,64);let o=(t,n,r,i)=>{e.fillStyle=n?r:`#1a2232`,e.font=`bold 10px Helvetica, Arial, sans-serif`,e.fillText(i,t,12)};o(110,i.blinkL,`#2cff6a`,`◀`),o(146,i.blinkR,`#2cff6a`,`▶`),o(128,i.beam,`#3aa0ff`,`≡`),o(128,!1,`#000`,``),e.fillStyle=i.brake?`#ff3b30`:`#1a2232`,e.fillText(`(P)`,128,112),e.fillStyle=i.engine?`#1a2232`:`#ffb020`,e.fillText(`⚡`,128,30),i.stalled&&(e.fillStyle=`#ff3b30`,e.fillRect(112,40,14,9),e.fillRect(114,38,3,2),e.fillRect(121,38,3,2),e.fillStyle=`#05070b`,e.fillRect(114,44,3,1),e.fillRect(121,44,3,1),e.fillRect(122,43,1,3),e.fillStyle=`#ff3b30`,e.beginPath(),e.moveTo(131,47),e.lineTo(144,47),e.lineTo(146,42),e.lineTo(140,42),e.lineTo(138,40),e.lineTo(133,40),e.lineTo(133,43),e.lineTo(131,43),e.fill())}function $p(e,t=null,n=null,r=null){let i=new wn,a=new wn;i.add(a);let o=[],s=e=>(o.push(e),e),c=e=>(o.push(e),e),l=0,u=(t,n,r=a,i=!0)=>{let o=new Zr(t,n);return o.castShadow=i&&e,r.add(o),l+=(t.index?t.index.count:t.attributes.position.count)/3,o},d=s(new io({color:2381512,metalness:.55,roughness:.38,clearcoat:1,clearcoatRoughness:.06,envMap:t,envMapIntensity:1})),f=s(new ro({color:1713457,metalness:.2,roughness:.04,envMap:t,envMapIntensity:1.6})),p=s(new ro({color:1382171,metalness:.1,roughness:.65})),m=s(new ro({color:13225686,metalness:.85,roughness:.28,envMap:t})),h=s(new ro({color:1579034,roughness:.92})),g=s(new ro({color:16777215,metalness:0,roughness:.03,transparent:!0,opacity:.28,envMap:t,envMapIntensity:1.5,depthWrite:!1})),_=s(new ro({color:14212580,metalness:.6,roughness:.25,envMap:t,emissive:16774108,emissiveIntensity:0})),v=s(new ro({color:3801088,roughness:.3,emissive:16711680,emissiveIntensity:.2,toneMapped:!1})),y=s(new ro({color:8014346,roughness:.3,emissive:16753178,emissiveIntensity:0})),b=y.clone();o.push(b);let x=s(new ro({color:10132122,roughness:.3,emissive:16777215,emissiveIntensity:0})),S=s(new ro({color:2500910,roughness:.85})),C=s(new ro({color:1842722,roughness:.6})),w=s(new ro({color:12105133,roughness:.95,emissive:2763046})),T=s(new ro({color:3816512,roughness:.9}));if(r){let{lib:e,globals:t}=r,n={space:`object`,detail:0};zd(d,e.get(`carpaint`),t,{...n,tile:.55,albedo:1.06,normal:.2,ao:0,roughMul:.16,clearcoatScratch:.3}),zd(f,e.get(`glass`),t,{...n,tile:.9,albedo:1.16,normal:.25,ao:0,roughMul:.4}),zd(h,e.get(`rubber`),t,{...n,tile:.3,albedo:1.45,normal:1}),zd(p,e.get(`plastic`),t,{...n,tile:.14,albedo:1.25,normal:.7,roughMul:.95}),zd(S,e.get(`plastic`),t,{...n,tile:.1,albedo:1.25,normal:.9,roughMul:1.15,roughAdd:.08}),zd(w,e.get(`fabric`),t,{...n,tile:.09,albedo:1.2,normal:.9}),zd(T,e.get(`fabric`),t,{...n,tile:.09,albedo:1.2,normal:.9}),zd(C,e.get(`leather`),t,{...n,tile:.07,albedo:1.3,normal:.9})}let E=[];for(let e=0;e<=64;e++){let t=-Rp+.01+(Q.length-.02)*e/64,n=Hp(t);E.push({z:t,yb:Wp(t),yt:Up(t),wb:n*.97,wt:n})}let D=[Jp(E,36,4.5,{deform:(e,t,n,r)=>{if(!r)return 0;let i=0;return n.z>.95&&(i+=.018*Vp(Math.abs(e),.42,.06)+.025*Vp(Math.abs(e),.78,.07)),i+=.012*Vp(Math.abs(e),.86,.04),i}}),...[1,-1].map(e=>Zp(new Ga(.11,12,8)).scale(1,.62,.75).translate(e*.99,1,.78))],O=u(c(bp(D,!1)),d);D.forEach(e=>e.dispose()),O.receiveShadow=!1;let k=[];for(let e=0;e<=44;e++){let t=-1.94+2.91*e/44,n=Up(t)-.03,r=Math.max(n+.005,Kp(t));k.push({z:t,yb:n,yt:r,wb:Hp(t)-.03,wt:.66})}u(c(Jp(k,28,5,{classify:(e,t,n)=>{let r=n.wb+(n.wt-n.wb)*Math.min(1,Math.max(0,(e.y-n.yb)/Math.max(.01,n.yt-n.yb))),i=Math.abs(e.x)/r;return t.y>.75&&e.z<.32999999999999996&&e.z>-1.3||e.z>.31&&i>.84&&e.y>n.yb+.04?0:Math.abs(e.z+.42)<.06&&Math.abs(t.x)>.5?2:e.z<-1.15&&i>.72&&Math.abs(t.x)>.35?0:e.y<n.yb+.035?2:1}})),[d,f,p]);let A=[],j=new za(Yp([[-.42,-.1],[.42,-.1],[.36,.1],[-.36,.1]],.05),{depth:.06,bevelEnabled:!1,curveSegments:4});j.translate(0,.52,Rp-.045),A.push(j);let M=new xi(1.1,.06,.1).translate(0,.42,Rp-.03);A.push(M);let N=new xi(1.2,.1,.08).translate(0,.45,-Rp-0);A.push(N);for(let e of[1,-1]){A.push(new xi(.05,.07,2*zp-2*Bp-.1).translate(e*.815,.27,0)),A.push(new xi(.16,.04,.08).translate(e*.9,.97,.76));let t=new xi(.012,.01,1.05);t.rotateX(.05),t.translate(e*.66,Up(1.5)+.03*Vp(.66,.78,.07)+.018*Vp(.66,.42,.06)+.002,1.5),A.push(t),A.push(new xi(.03,.025,.16).translate(e*.9,.86,.15)),A.push(new xi(.03,.025,.16).translate(e*.9,.88,-.85));for(let t of[.92,-.4,-1.42])A.push(new xi(.012,Up(t)-Wp(t)-.08,.008).translate(e*(Hp(t)+.002),(Up(t)+Wp(t))/2,t))}A.push(new xi(1.2,.01,.012).translate(0,Up(2)-.005,1.98)),A.forEach(Zp);let ee=c(bp(A.map(e=>Xp(e)),!1));A.forEach(e=>e.dispose()),u(ee,p);let P=[[-.2,-.05],[.18,-.07],[.22,.06],[-.16,.07]],te=[[-.2,-.05],[.17,-.06],[.2,.05],[-.18,.06]],ne=(e,t,n)=>Yp(t>0?e:e.map(([e,t])=>[-e,t]).reverse(),n),re=(e,t,n)=>{let r=ne(e?P:te,t,e?.04:.03),i=n===`inner`?new za(r,{depth:.05,bevelEnabled:!1,curveSegments:4}):new za(r,{depth:.02,bevelEnabled:!0,bevelThickness:.02,bevelSize:.01,bevelSegments:2,curveSegments:4});e||i.rotateY(Math.PI),i.rotateY(e?t*.28:-t*.2);let a=n===`cover`?.02:0,o=e?Rp-.035+a:-Rp+.035-a;return i.translate(t*(e?.47:.55),e?.64:.76,o),i},ie=[1,-1].map(e=>re(!0,e,`inner`)),ae=[1,-1].map(e=>re(!0,e,`cover`)),F=[1,-1].map(e=>re(!1,e,`inner`));[...ie,...ae,...F].forEach(Zp),u(c(bp(ie.map(e=>Xp(e)))),_,a,!1),u(c(bp(ae.map(e=>Xp(e)))),g,a,!1).renderOrder=2,u(c(bp(F.map(e=>Xp(e)))),v,a,!1),[...ie,...ae,...F].forEach(e=>e.dispose());let oe=e=>bp([new xi(.08,.035,.03).translate(e*.6,.58,Rp+.005),new xi(.1,.04,.03).translate(e*.6,.68,-Rp-.005)].map(e=>Xp(Zp(e))));u(c(oe(1)),y,a,!1),u(c(oe(-1)),b,a,!1),u(c(Zp(new xi(.12,.04,.03)).translate(-.3,.68,-Rp-.005)),x,a,!1);let se=Q.wheelRadius,I=[],ce=.2;for(let e=0;e<=10;e++){let t=-Math.PI/2+Math.PI*e/10;I.push(new G(se-.035+Math.cos(t)*.035,Math.sin(t)*ce/2))}I.unshift(new G(se*.66,-.2/2+.01)),I.push(new G(se*.66,ce/2-.01));let le=new Ua(I,28);le.rotateZ(Math.PI/2);let ue=new ta;ue.absarc(0,0,se*.68,0,Math.PI*2,!1);for(let e=0;e<5;e++){let t=new ea,n=e/5*Math.PI*2+.22,r=n+Math.PI*2/5-.44;t.absarc(0,0,se*.58,n,r,!1),t.absarc(0,0,se*.22,r,n,!0),ue.holes.push(t)}let de=new za(ue,{depth:.035,bevelEnabled:!0,bevelThickness:.01,bevelSize:.008,bevelSegments:1,curveSegments:10});de.rotateY(Math.PI/2),de.translate(ce/2-.045,0,0);let fe=new Si(.05,.05,.04,12).rotateZ(Math.PI/2).translate(ce/2-.02,0,0),pe=new Si(se*.6,se*.6,.03,20).rotateZ(Math.PI/2).translate(-.01,0,0);[le,de,fe,pe].forEach(Zp);let me=c(bp([Xp(le),Xp(pe),Xp(de),Xp(fe)],!0));[le,de,fe,pe].forEach(e=>e.dispose());let he=[h,p,m,m],ge=[];for(let[e,t,n]of[[Q.track/2+.03,zp,!0],[-Q.track/2-.03,zp,!0],[Q.track/2+.03,-zp,!1],[-Q.track/2-.03,-zp,!1]]){let r=new wn;r.position.set(e,se,t),i.add(r);let a=new wn;e<0&&(a.scale.x=-1),r.add(a),u(me,he,a),ge.push({spin:a,steer:n?r:void 0})}let _e=new Zr(c(new Wa(Q.width+1.2,Q.length+1.6).rotateX(-Math.PI/2)),s(new zr({color:0,alphaMap:n,transparent:!0,opacity:.75,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})));_e.position.y=.04,_e.renderOrder=1,_e.visible=!1,i.add(_e);let ve=(()=>{let e=document.createElement(`canvas`);e.width=64,e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(32,128,4,32,110,120);n.addColorStop(0,`rgba(255,240,215,1)`),n.addColorStop(.5,`rgba(255,235,200,0.45)`),n.addColorStop(1,`rgba(255,235,200,0)`),t.fillStyle=n,t.fillRect(0,0,64,128);let r=new _i(e);return r.colorSpace=Ze,r})();o.push(ve);let ye=s(new zr({map:ve,transparent:!0,opacity:0,blending:2,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),be=new Zr(c(new Wa(7,16).rotateX(-Math.PI/2).translate(0,.05,Rp+8)),ye);be.renderOrder=2,be.visible=!1,i.add(be);let xe=0,Se=new wn;a.add(Se);let L=[];for(let e=0;e<=8;e++){let t=.1+.86*e/8,n=t<.5?.9+.05*((t-.1)/.4):.95-.06*((t-.5)/.46)**2;L.push({z:t,yb:.6,yt:n,wb:.8,wt:.78})}u(c(Jp(L,20,6)),S,Se,!1),u(c(Zp(new xi(.27,.13,.03)).rotateX(-.3).translate(Lp.x,.995,.615)),S,Se,!1);let Ce=document.createElement(`canvas`);Ce.width=256,Ce.height=128;let we=Ce.getContext(`2d`),Te=new _i(Ce);Te.colorSpace=Ze,o.push(Te);let Ee=new Zr(c(new Wa(.25,.115)),s(new zr({map:Te,toneMapped:!1})));Ee.position.set(Lp.x,.997,.598),Ee.rotation.order=`YXZ`,Ee.rotation.set(.3,Math.PI,0),Se.add(Ee);let De=``,Oe=new wn;Oe.position.set(Lp.x,.83,.38),Oe.rotation.x=-.38,Se.add(Oe);let ke=new wn;Oe.add(ke),u(c(bp([Zp(new Ka(.18,.022,8,32)),Zp(new xi(.3,.035,.025)),Zp(new xi(.035,.16,.025).translate(0,-.08,0)),Zp(new Si(.055,.055,.04,16).rotateX(Math.PI/2))].map(e=>Xp(e)))),C,ke,!1),u(c(Zp(new Si(.035,.045,.3,8)).rotateX(Math.PI/2-.38).translate(Lp.x,.78,.52)),S,Se,!1);let Ae=e=>{let t=new K(e*(Hp(.95)-.06),Up(.95)+.02,.93),n=new K(e*.67,Kp(.38)-.03,.38),r=Zp(new xi(.05,t.distanceTo(n),.07)),i=new Yt().lookAt(t,n,new K(0,1,0));return r.rotateX(Math.PI/2),r.applyMatrix4(i),r.translate((t.x+n.x)/2,(t.y+n.y)/2,(t.z+n.z)/2),r};u(c(Zp(new Wa(1.32,1.6).rotateX(Math.PI/2).translate(0,Kp(-.5)-.04,-.45))),w,Se,!1),u(c(bp([Xp(Ae(1)),Xp(Ae(-1))])),T,Se,!1);function je(){let e=Zp(new Wa(1.62,2.15,1,8).rotateX(-Math.PI/2).translate(0,0,-.8)),t=e.attributes.position;for(let e=0;e<t.count;e++)t.setY(e,Up(t.getZ(e))+.015);return e.computeVertexNormals(),e}u(c(bp([...[1,-1].map(e=>Xp(Zp(new xi(.06,.36,2)).translate(e*.8,Up(-.4)-.14,-.4))),Xp(je())])),S,Se,!1);let R=Fp(`interior`,3),Me=Fp(`interior`,0),Ne=Fp(`lateral`,3),Pe=Fp(`lateral`,0),z=Ip(`interior`),Fe=Ip(`lateral`);o.push(R,Me,Ne,Pe,z,Fe);let B=c(new Wa(1,1)),V=e=>s(new zr({color:3358800,toneMapped:!1,alphaMap:e,alphaTest:.5})),Ie=e=>s(new zr({color:1316636,alphaMap:e,alphaTest:.5})),Le=e=>s(new zr({map:e,transparent:!0,depthWrite:!1,toneMapped:!1})),Re=(e,t,n,r)=>{let i=new Zr(B,V(e)),a=new Zr(B,Ie(t));a.scale.set(r,r*1.12,1),a.position.z=-.004;let o=new Zr(B,Le(n));return o.position.z=.002,o.renderOrder=2,i.add(a,o),i},ze=Re(R,Me,z,1.06);ze.scale.set(.24,.068,1),ze.position.set(.12,Kp(.33999999999999997)-.12,.32999999999999996),ze.lookAt(Lp);let Be=new Zr(c(Zp(new xi(.22,.06,.025))),S);Be.quaternion.copy(ze.quaternion),Be.position.copy(ze.position).add(new K(0,0,-.016).applyQuaternion(ze.quaternion));let Ve=new Zr(c(Zp(new Si(.008,.008,.08,6))),S);Ve.position.copy(Be.position).add(new K(0,.07,.01)),Se.add(ze,Be,Ve);let He=e=>{let t=Re(Ne,Pe,Fe,1.08);return t.scale.set(.2,.125,1),t.position.set(e*.99,1,.692),t.lookAt(Lp),a.add(t),t},Ue=He(1),We=He(-1);l+=18;let Ge=(()=>{let e=document.createElement(`canvas`);e.width=256,e.height=64;let t=e.getContext(`2d`),n=t.createLinearGradient(0,64,0,0);n.addColorStop(0,`rgba(200,210,225,0.9)`),n.addColorStop(.5,`rgba(160,170,185,0.35)`),n.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=n,t.fillRect(0,0,256,64),t.fillStyle=`rgba(0,0,0,0.55)`,t.fillRect(150,30,70,34);for(let e=30;e<110;e+=8)t.fillRect(e,50,4,14);let r=new _i(e);return r.colorSpace=Ze,r})();o.push(Ge);let Ke=new K(0,Up(.95)+.02,.9),qe=new K(0,Kp(.39)-.02,.39),Je=new Zr(c(new Wa(1.35,Ke.distanceTo(qe)*.45)),s(new zr({map:Ge,transparent:!0,opacity:.07,blending:2,depthWrite:!1,side:2}))),Ye=Ke.clone().lerp(qe,.22);Je.position.copy(Ye),Je.lookAt(Ye.clone().add(new K(0,qe.z-Ke.z,-(qe.y-Ke.y)).normalize().multiplyScalar(-1))),Je.renderOrder=3,Se.add(Je),Se.visible=!1,Se.traverse(e=>e.layers.set(1)),Ue.traverse(e=>e.layers.set(1)),We.traverse(e=>e.layers.set(1));let Xe=2.2,Qe={pitch:0,pitchV:0,roll:0,rollV:0,lastV:0,acc:0},$e=0,et=0;return{root:i,body:a,mirrorSurfaces:{top:ze,left:Ue,right:We},triangles:Math.round(l),update(e,t,n=1/60){i.position.set(e.x,e.y,e.z),i.rotation.set(0,0,0),i.rotateY(e.heading),i.rotateX(-e.pitch);let r=Math.min(.05,Math.max(.001,n)),o=(e.v-Qe.lastV)/r;Qe.lastV=e.v,Qe.acc+=(Math.max(-9,Math.min(9,o))-Qe.acc)*Math.min(1,r*8);let s=e.v*Math.tan(e.steerAngle)/Q.wheelbase,c=Math.max(-8,Math.min(8,e.v*s)),l=-Qe.acc*.0035,u=c*.003;Qe.pitchV+=((l-Qe.pitch)*90-Qe.pitchV*13)*r,Qe.pitch+=Qe.pitchV*r,Qe.rollV+=((u-Qe.roll)*90-Qe.rollV*13)*r,Qe.roll+=Qe.rollV*r,a.rotation.set(Qe.pitch,0,Qe.roll),a.position.y=-Math.abs(Qe.pitch)*.6;for(let t of ge)t.spin.rotation.x=e.wheelSpin,t.steer&&(t.steer.rotation.y=e.steerAngle);et+=r,ke.rotation.z=-e.steerAngle*14*.5+Math.sin(et*71)*.012*$e;let d=e.lights===`cortas`||e.lights===`largas`;_.emissiveIntensity=d?e.lights===`largas`?Xe*1.3:Xe:e.lights===`posicion`?.25:0,v.emissiveIntensity=e.brake>.05?1:e.lights===`apagadas`?.08:.45;let f=t&&(e.blinker===`izquierda`||e.blinker===`emergencia`),p=t&&(e.blinker===`derecha`||e.blinker===`emergencia`);if(y.emissiveIntensity=f?2.5:0,b.emissiveIntensity=p?2.5:0,x.emissiveIntensity=e.gear===`R`?1.5:0,be.visible=d&&xe>.05,ye.opacity=(e.lights===`largas`?.75:.55)*xe,Se.visible){let t=Math.round(Math.abs(e.v)*3.6),n=Math.round(e.rpm/50)*50,r=!e.engineOn&&e.stallCause!==null,i=`${t}|${n}|${e.gear}|${f}|${p}|${e.handbrake}|${e.engineOn}|${e.lights}|${r}`;i!==De&&(De=i,Qp(we,t,n,String(e.gear),{blinkL:f,blinkR:p,brake:e.handbrake,engine:e.engineOn,beam:e.lights===`largas`,stalled:r}),Te.needsUpdate=!0)}},setInteriorVisible(e){Se.visible=e},setBlob(e){_e.visible=e},setDarkness(e){xe=Math.max(0,Math.min(1,e))},kick(e){Qe.pitchV+=e},setVibration(e){$e=e},dispose(){for(let e of o)e.dispose()}}}var em={w:256,h:128},tm=class{constructor(t){e(this,`quality`,void 0),e(this,`overlay`,new Nn),e(this,`ortho`,new Uo(0,1,1,0,-1,1)),e(this,`mirrors`,[]),e(this,`tmp`,new K),e(this,`acc`,1),e(this,`interior`,!1),e(this,`levelOn`,!0),e(this,`surfaces`,{}),e(this,`unit`,new Wa(1,1)),e(this,`textures`,[]),e(this,`enabled`,!0),e(this,`renders`,0),this.quality=t;let n=(e,t,n,r,i,a,o)=>{let s=new Ho(a,r/i,o,220),c=new Kt(em.w,em.h);c.texture.colorSpace=Ze;let l=e===`top`?`interior`:`lateral`,u=t=>(e===`right`&&(t.wrapS=_,t.repeat.x=-1,t.offset.x=1),this.textures.push(t),t),d=new zr({map:c.texture,alphaMap:u(Fp(l,3)),transparent:!0,depthTest:!1,toneMapped:!1}),f=new Zr(this.unit,d);f.scale.x=-1;let p=new Zr(this.unit,new zr({color:724761,alphaMap:u(Fp(l,0)),transparent:!0,depthTest:!1})),m=new Zr(this.unit,new zr({map:u(Ip(l)),transparent:!0,depthTest:!1,toneMapped:!1}));p.renderOrder=0,f.renderOrder=1,m.renderOrder=2,this.overlay.add(p,f,m),this.mirrors.push({cam:s,target:c,quad:f,frame:p,decor:m,local:t,look:n,w:r,h:i,anchor:e,onScreen:!0})};n(`top`,new K(0,1.3,.3),new K(0,1.12,-10),300,76,26,2.6),n(`left`,new K(1,1,.66),new K(2.4,.85,-10),150,96,32,.5),n(`right`,new K(-1,1,.66),new K(-2.4,.85,-10),150,96,40,.5)}attachSurfaces(e){this.surfaces=e;for(let t of this.mirrors){let n=e[t.anchor];n&&(n.scale.x=-Math.abs(n.scale.x),n.material.map=t.target.texture)}this.applySurfaces()}setInterior(e){this.interior=e}setLevelEnabled(e){this.levelOn!==e&&(this.levelOn=e,this.acc=1,this.applySurfaces())}get active(){return this.enabled&&this.levelOn}applySurfaces(){for(let e of this.mirrors){let t=this.surfaces[e.anchor];if(!t)continue;let n=t.material,r=this.active;(n.map!==null!==r||n.color.getHex()===16777215!==r)&&(n.map=r?e.target.texture:null,n.color.setHex(r?16777215:3358800),n.needsUpdate=!0)}}setRefreshEvery(e){this.quality}setFar(e){for(let t of this.mirrors)t.cam.far=e,t.cam.updateProjectionMatrix()}layout(e,t){let n=e<700||t<500,r=t>e;this.ortho.right=e,this.ortho.top=t,this.ortho.updateProjectionMatrix();let i=n?.65:1;for(let a of this.mirrors){let o=a.w*i,s=a.h*i;a.onScreen=(!n||a.anchor===`top`)&&(this.quality!==`baja`||a.anchor===`top`);let c=e/2,l=n&&r?t-258-s/2:t-s/2-10;a.anchor===`left`?(c=o/2+12,l=t*.62):a.anchor===`right`&&(c=e-o/2-12,l=t*.62),a.quad.position.set(c,l,0),a.quad.scale.set(-o,s,1),a.frame.position.set(c,l,0),a.frame.scale.set(-(o+8),s+8,1),a.decor.position.set(c,l,0),a.decor.scale.set(-o,s,1)}}surfaceVisible(e,t){let n=this.surfaces[e.anchor];return n?(n.getWorldPosition(this.tmp).project(t),this.tmp.z<1&&Math.abs(this.tmp.x)<.92&&Math.abs(this.tmp.y)<.92):!1}render(e,t,n,r,i){if(this.applySurfaces(),!this.active)return;if(this.acc+=r,this.acc>=1/20){this.acc=Math.min(this.acc-1/20,1/20);for(let r of this.mirrors)(this.interior||r.onScreen)&&(r.cam.position.copy(r.local).applyMatrix4(n.matrixWorld),r.cam.lookAt(this.tmp.copy(r.look).applyMatrix4(n.matrixWorld)),e.setRenderTarget(r.target),e.clear(),e.render(t,r.cam));this.renders++,e.setRenderTarget(null)}let a=!1;for(let e of this.mirrors){let t=e.onScreen&&(!this.interior||(i?!this.surfaceVisible(e,i):!1));e.quad.visible=e.frame.visible=e.decor.visible=t,a||=t}a&&(e.clearDepth(),e.render(this.overlay,this.ortho))}dispose(){for(let e of this.mirrors){e.target.dispose();for(let t of[e.quad,e.frame,e.decor])t.material.dispose()}this.unit.dispose();for(let e of this.textures)e.dispose()}},nm=.25;function rm(e){let t=((e+180)%360+360)%360-180;return t===-180&&(t=180),t}function im(e){return(Math.round(e/90)*90%360+360)%360}function am(e,t){let n=e*Math.PI/180,r=t*Math.PI/180;return{x:Math.cos(n)*Math.sin(r),y:-Math.sin(n),z:-Math.cos(n)*Math.cos(r)}}function om(e,t,n,r){let i=im(e);return t===null||(i===90||i===270)===t?i:t?n<0?90:270:r<0?0:180}function sm(e,t,n,r=null){let i=am(e,t),a=om(n,r,i.x,i.y)*Math.PI/180,o=i.x*Math.cos(a)-i.y*Math.sin(a),s=i.x*Math.sin(a)+i.y*Math.cos(a);return Math.hypot(o,s)<.2?null:Math.atan2(o,-s)*180/Math.PI}function cm(e,t=3){return Math.abs(e)<=t?0:e-Math.sign(e)*t}function lm(e){return Math.max(-1,Math.min(1,cm(e)/42))}function um(e,t,n=nm){return e+(t-e)*n}function dm(){if(typeof screen<`u`&&screen.orientation&&typeof screen.orientation.angle==`number`)return screen.orientation.angle;let e=window.orientation;return typeof e==`number`?e:0}var fm=class t{constructor(){e(this,`active`,!1),e(this,`invert`,!1),e(this,`angle`,0),e(this,`raw`,0),e(this,`offset`,0),e(this,`gotData`,!1),e(this,`onOrientation`,e=>{e.beta!==null&&e.gamma!==null&&(this.gotData=!0,this.feed(e.beta,e.gamma,dm(),window.innerWidth>window.innerHeight))})}static supported(){return typeof window<`u`&&`DeviceOrientationEvent`in window}async enable(){if(!t.supported())return`unsupported`;let e=window.DeviceOrientationEvent.requestPermission;if(typeof e==`function`){let t;try{t=await e.call(window.DeviceOrientationEvent)}catch{return window.isSecureContext?`denied`:`insecure`}if(t!==`granted`)return`denied`}return window.isSecureContext?(this.gotData=!1,window.addEventListener(`deviceorientation`,this.onOrientation),await new Promise(e=>setTimeout(e,900)),this.gotData?(this.active=!0,this.calibrate(),`ok`):(window.removeEventListener(`deviceorientation`,this.onOrientation),`no-data`)):`insecure`}disable(){window.removeEventListener(`deviceorientation`,this.onOrientation),this.active=!1,this.angle=0}calibrate(){this.offset=this.raw,this.angle=0}steer(){return this.active?lm(this.invert?-this.angle:this.angle):0}visualAngle(){let e=this.invert?-this.angle:this.angle;return Math.max(-90,Math.min(90,cm(e)))}feed(e,t,n,r=null){let i=sm(e,t,n,r);i===null?this.angle=um(this.angle,0,.08):(this.raw=i,this.angle=um(this.angle,rm(this.raw-this.offset)))}},pm=[{keys:`W / ↑`,label:`Acelerador`},{keys:`S / ↓`,label:`Freno`},{keys:`A D / ← →`,label:`Dirección`},{keys:`C o Mayús`,label:`Embrague (mantener; al soltar sube despacio)`},{keys:`1–5 · R · N`,label:`Marchas (con embrague pisado)`},{keys:`E / Q`,label:`Subir / bajar marcha`},{keys:`I`,label:`Llave: arrancar / apagar`},{keys:`Espacio`,label:`Freno de mano`},{keys:`Z / X`,label:`Intermitente izquierdo / derecho`},{keys:`G`,label:`Luces de emergencia`},{keys:`L`,label:`Luces (posición → cortas → largas)`},{keys:`B`,label:`Cinturón`},{keys:`V`,label:`Cámara 1.ª / 3.ª persona`},{keys:`M`,label:`Retrovisores`},{keys:`Ratón`,label:`Arrastra para mirar alrededor (doble clic centra)`},{keys:`Esc / P`,label:`Pausa`}],mm={Digit1:{type:`gear`,gear:1},Digit2:{type:`gear`,gear:2},Digit3:{type:`gear`,gear:3},Digit4:{type:`gear`,gear:4},Digit5:{type:`gear`,gear:5},KeyR:{type:`gear`,gear:`R`},KeyN:{type:`gear`,gear:`N`},Digit0:{type:`gear`,gear:`N`},KeyE:{type:`gearUp`},KeyQ:{type:`gearDown`},KeyI:{type:`ignition`},Space:{type:`handbrake`},KeyZ:{type:`blinker`,side:`izquierda`},KeyX:{type:`blinker`,side:`derecha`},KeyG:{type:`blinker`,side:`emergencia`},KeyL:{type:`lights`},KeyB:{type:`belt`},KeyV:{type:`camera`},KeyM:{type:`mirrors`},KeyP:{type:`pause`},Escape:{type:`pause`},KeyF:{type:`fps`}},hm=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Space`]),gm=(e,t,n,r,i)=>e<t?Math.min(t,e+n*i):Math.max(t,e-r*i),_m=class{constructor(t){e(this,`surface`,void 0),e(this,`keys`,new Set),e(this,`queue`,[]),e(this,`kb`,{throttle:0,brake:0,clutch:0,steer:0}),e(this,`virtual`,new Set),e(this,`tilt`,new fm),e(this,`touchClutch`,0),e(this,`vibration`,0),e(this,`last`,{throttle:0,brake:0,clutch:0,steer:0}),e(this,`look`,{yaw:0,pitch:0}),e(this,`gamepadName`,null),e(this,`padButtons`,[]),e(this,`padClutch`,0),e(this,`dragging`,!1),e(this,`lastPointer`,{x:0,y:0}),e(this,`onKeyDown`,e=>{if(!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)&&(hm.has(e.code)&&e.preventDefault(),!(e.metaKey||e.ctrlKey||e.altKey))){if(!e.repeat){let t=mm[e.code];t&&this.queue.push(t)}this.keys.add(e.code)}}),e(this,`onKeyUp`,e=>{this.keys.delete(e.code)}),e(this,`onBlur`,()=>this.keys.clear()),e(this,`onPointerDown`,e=>{e.pointerType===`mouse`&&(this.dragging=!0,this.lastPointer={x:e.clientX,y:e.clientY})}),e(this,`onPointerMove`,e=>{if(!this.dragging)return;let t=e.clientX-this.lastPointer.x,n=e.clientY-this.lastPointer.y;this.lastPointer={x:e.clientX,y:e.clientY},this.look.yaw=Math.max(-1.9,Math.min(1.9,this.look.yaw-t*.005)),this.look.pitch=Math.max(-.6,Math.min(.5,this.look.pitch-n*.004))}),e(this,`onPointerUp`,()=>{this.dragging=!1}),e(this,`onDblClick`,()=>{this.look.yaw=0,this.look.pitch=0}),this.surface=t,window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`keyup`,this.onKeyUp),window.addEventListener(`blur`,this.onBlur),t.addEventListener(`pointerdown`,this.onPointerDown),window.addEventListener(`pointermove`,this.onPointerMove),window.addEventListener(`pointerup`,this.onPointerUp),t.addEventListener(`dblclick`,this.onDblClick)}dispose(){window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp),window.removeEventListener(`blur`,this.onBlur),this.surface.removeEventListener(`pointerdown`,this.onPointerDown),window.removeEventListener(`pointermove`,this.onPointerMove),window.removeEventListener(`pointerup`,this.onPointerUp),this.surface.removeEventListener(`dblclick`,this.onDblClick),this.tilt.disable()}clearVirtual(){this.virtual.clear()}setVirtual(e,t){t?this.virtual.add(e):this.virtual.delete(e)}push(e){this.queue.push(e)}drain(){let e=this.queue;return this.queue=[],e}down(...e){return e.some(e=>this.keys.has(e)||this.virtual.has(e))}sample(e){let t=this.kb;if(t.throttle=gm(t.throttle,+!!this.down(`KeyW`,`ArrowUp`),2.2,5,e),t.brake=gm(t.brake,+!!this.down(`KeyS`,`ArrowDown`),2.5,6,e),this.down(`KeyC`,`ShiftLeft`,`ShiftRight`))t.clutch=gm(t.clutch,1,6,0,e);else{let n=t.clutch<=Q.clutchBiteStart+.04&&t.clutch>Q.clutchBiteEnd-.06;t.clutch=gm(t.clutch,0,0,n?.45:2.5,e)}let n=+!!this.down(`KeyD`,`ArrowRight`)-!!this.down(`KeyA`,`ArrowLeft`),r=n===0||Math.sign(n)!==Math.sign(t.steer);t.steer=gm(t.steer,n,r?3.5:1.6,r?3.5:1.6,e);let i=this.readGamepad(),a=this.tilt.steer(),o=(e,t,n)=>Math.abs(e)>=Math.abs(t)&&Math.abs(e)>=Math.abs(n)?e:Math.abs(t)>=Math.abs(n)?t:n;return this.last={throttle:Math.max(t.throttle,i.throttle),brake:Math.max(t.brake,i.brake),clutch:Math.max(t.clutch,i.clutch,this.touchClutch),steer:o(t.steer,a,i.steer)},this.last}readGamepad(){let e={throttle:0,brake:0,clutch:0,steer:0},t=typeof navigator<`u`&&navigator.getGamepads?navigator.getGamepads():[],n=Array.from(t??[]).find(e=>e&&e.connected);if(!n)return this.gamepadName=null,e;this.gamepadName=n.id;let r=(e,t=.06)=>Math.abs(e)<t?0:(e-Math.sign(e)*t)/(1-t),i=e=>n.buttons[e]?.value??0,a=e=>!!n.buttons[e]?.pressed,o=(e,t)=>{let n=a(e);n&&!this.padButtons[e]&&this.queue.push(t),this.padButtons[e]=n};if(n.mapping===`standard`){o(5,{type:`gearUp`}),o(2,{type:`gearDown`}),o(0,{type:`ignition`}),o(1,{type:`handbrake`}),o(14,{type:`blinker`,side:`izquierda`}),o(15,{type:`blinker`,side:`derecha`}),o(3,{type:`camera`}),o(9,{type:`pause`});let e=i(4);return this.padClutch=e>.5?Math.min(1,this.padClutch+.1):Math.max(0,this.padClutch-(this.padClutch>Q.clutchBiteEnd&&this.padClutch<Q.clutchBiteStart+.04?.004:.03)),{steer:r(n.axes[0]??0),throttle:i(7),brake:i(6),clutch:Math.max(this.padClutch,e<1&&e>0?e:0)}}let s=e=>n.axes[e]===void 0?0:Math.min(1,Math.max(0,(1-(n.axes[e]??1))/2));return o(4,{type:`gearUp`}),o(5,{type:`gearDown`}),{steer:r(n.axes[0]??0,.02),throttle:s(1),brake:s(2),clutch:s(3)}}},vm=class{constructor(t,n){e(this,`enabled`,void 0),e(this,`volume`,void 0),e(this,`ctx`,null),e(this,`osc1`,null),e(this,`osc2`,null),e(this,`filter`,null),e(this,`gain`,null),this.enabled=t,this.volume=n}unlock(){if(this.enabled)try{let e=window.AudioContext??window.webkitAudioContext;if(!e)return;if(!this.ctx){let t=new e,n=t.createGain();n.gain.value=0;let r=t.createBiquadFilter();r.type=`lowpass`,r.frequency.value=600;let i=t.createOscillator();i.type=`sawtooth`;let a=t.createOscillator();a.type=`square`;let o=t.createGain();o.gain.value=.35,i.connect(r),a.connect(o).connect(r),r.connect(n).connect(t.destination),i.start(),a.start(),this.ctx=t,this.osc1=i,this.osc2=a,this.filter=r,this.gain=n}this.ctx.resume()}catch{this.ctx=null}}update(e,t,n){if(!this.ctx||!this.osc1||!this.osc2||!this.filter||!this.gain)return;let r=this.ctx.currentTime,i=Math.max(8,e/30);this.osc1.frequency.setTargetAtTime(i,r,.03),this.osc2.frequency.setTargetAtTime(i/2,r,.03),this.filter.frequency.setTargetAtTime(350+t*1400+e*.12,r,.05);let a=n?(.05+t*.07)*this.volume:0;this.gain.gain.setTargetAtTime(a,r,.08)}stall(){if(this.ctx&&this.enabled)try{let e=this.ctx,t=e.currentTime,n=e.createOscillator();n.type=`sawtooth`,n.frequency.setValueAtTime(70,t),n.frequency.exponentialRampToValueAtTime(14,t+.45);let r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.22*this.volume+1e-4,t+.03),r.gain.exponentialRampToValueAtTime(1e-4,t+.5);let i=e.createBiquadFilter();i.type=`lowpass`,i.frequency.value=260,n.connect(i).connect(r).connect(e.destination),n.start(t),n.stop(t+.55)}catch{}}suspend(){this.ctx?.suspend()}resume(){this.ctx?.resume()}dispose(){try{this.osc1?.stop(),this.osc2?.stop(),this.ctx?.close()}catch{}this.ctx=null}},ym=9.81,bm=.5,xm=.7,Sm=.5;function Cm(e=0,t=0,n=0){return{x:e,z:t,y:0,heading:n,pitch:0,v:0,steerAngle:0,wheelSpin:0,engineOn:!1,rpm:0,gear:`N`,throttle:0,brake:0,clutch:0,clutchSlipping:!1,handbrake:!0,lights:`apagadas`,blinker:`ninguno`,blinkerYaw:0,belt:!1,fuelL:32,odometerM:0,stallCause:null,lug:0,clutchRate:0,jerk:0,stallT:0}}var wm=(e,t,n)=>Math.min(n,Math.max(t,e));function Tm(e,t,n,r){let i=Q.mass;if(Math.abs(e)>.001){let a=e+(t-Math.sign(e)*n)/i*r;return Math.sign(a)!==Math.sign(e)&&Math.abs(t)<=n?0:a}return Math.abs(t)<=n?0:e+(t-Math.sign(t)*n)/i*r}function Em(e){let t=e*e;return t<1?Q.maxSteer:Math.min(Q.maxSteer,Math.atan(Q.wheelbase*Q.maxLateralAccel/t))}function Dm(e,t,n,r){let i=[],a=e.clutch;e.throttle=wm(t.throttle,0,1),e.brake=wm(t.brake,0,1),e.clutch=wm(t.clutch,0,1),r>0&&(e.clutchRate+=((a-e.clutch)/r-e.clutchRate)*Math.min(1,r*6)),e.jerk=Math.max(0,e.jerk-r*2.5);let o=n.stallRpm??Q.stallRpm,s=-wm(t.steer,-1,1)*Math.min(Q.maxSteer,Em(e.v)*1.2),c=s-e.steerAngle,l=Q.steerRate*(Math.abs(s)<Math.abs(e.steerAngle)?1.6:1);e.steerAngle+=wm(c,-l*r,l*r);let u=Q.mass,d=Q.wheelRadius,f=Q.engineInertia,p=Q.efficiency,m=Ep(e.gear),h=e.rpm/Op,g=0;if(e.engineOn){let t=e.rpm>=Q.limiterRpm?0:e.throttle,r=n.idleAssist??1,i=wm((e.rpm-xm*o)/(Sm*o),0,1),a=wm(Tp(e.rpm)+(Q.idleRpm-e.rpm)*.35*r,0,Q.idleTorqueMax*r)*i,s=Cp(Math.max(e.rpm,1200)),c=wp(t)*s;g=Math.max(c,Math.min(c+a*(1-.5*t),Math.max(s,Q.idleTorqueMax*r)))}let _=g-Tp(e.rpm),v=-u*ym*n.grade-Q.dragCoef*e.v*Math.abs(e.v),y=(n.offroad?Q.offroadRollingCoef:Q.rollingCoef)*u*ym+e.brake*Q.brakeForce+(e.handbrake?Q.handbrakeForce:0),b=m===0?0:Dp(e.clutch)*Q.clutchMaxTorque;n.noStall&&e.engineOn&&e.rpm<Q.idleRpm*.85&&(b*=wm((e.rpm-o)/(Q.idleRpm*.85-o),0,1)*.5);let x=e.clutchSlipping;if(e.clutchSlipping=!1,b>0){let t=e.v*m/d,n=h-t,i=!1;if(Math.abs(n)<1.5){let n=Math.abs(e.v)>.05?Math.sign(e.v):0,a=v-n*y,o=(_*m*p/d+a)/(u*d/m+f*m*p/d),s=_-f*o;if(Math.abs(s)<=b){i=!0,h=Math.max(0,t+o*r);let a=h*d/m;e.v=n!==0&&Math.sign(a)!==n&&y>0?0:a,e.v===0&&(h=0)}}if(!i){let t=b*wm(n/.8,-1,1);e.clutchSlipping=Math.abs(n)>2,h+=(_-t)/f*r,e.v=Tm(e.v,t*m*p/d+v,y,r);let i=e.v*m/d;Math.sign(h-i)!==Math.sign(n)&&(h=i)}}else h+=_/f*r,e.v=Tm(e.v,v,y,r);h=Math.max(0,h),e.rpm=h*Op,x&&!e.clutchSlipping&&e.clutchRate>2&&(e.jerk=Math.max(e.jerk,.6));let S=e.engineOn&&m!==0&&Dp(e.clutch)>.05?wm((Q.idleRpm*.95-e.rpm)/(Q.idleRpm*.95-o),0,1):0;if(e.lug+=(S-e.lug)*Math.min(1,r*12),e.stallT=e.engineOn&&e.rpm<o?e.stallT+r:0,e.engineOn&&(e.stallT>bm||e.rpm<o*.5)&&(e.stallT=0,n.noStall?e.rpm=o:(e.stallCause=Om(e,n),e.engineOn=!1,e.lug=0,e.jerk=1,i.push(`calado`))),e.engineOn){let t=g*h/1e3;e.fuelL=Math.max(0,e.fuelL-(t*.3/3600/.745+.6/3600)*r),e.fuelL<=0&&(e.engineOn=!1,i.push(`sin-combustible`))}let C=e.v*Math.tan(e.steerAngle)/Q.wheelbase,w=Math.abs(e.v);return w>1&&(C=wm(C,-Q.maxLateralAccel/w,Q.maxLateralAccel/w)),e.heading+=C*r,e.x+=Math.sin(e.heading)*e.v*r,e.z+=Math.cos(e.heading)*e.v*r,e.odometerM+=w*r,e.wheelSpin+=e.v/d*r,(e.blinker===`izquierda`||e.blinker===`derecha`)&&(e.blinkerYaw+=C*r,(e.blinker===`izquierda`?e.blinkerYaw>.9:e.blinkerYaw<-.9)&&Math.abs(e.steerAngle)<.05&&(e.blinker=`ninguno`,e.blinkerYaw=0)),i}function Om(e,t){let n=Math.abs(e.v);return typeof e.gear==`number`&&e.gear>=2&&n<2.5*(e.gear-1)&&e.brake<.15?`marcha-larga`:e.brake>.15&&n<1.5?`frenar-sin-embrague`:t.grade>.035&&e.throttle<.4?`pendiente`:e.clutchRate>1.2||Dp(e.clutch)>.95&&e.throttle<.05?`embrague-brusco`:`poco-gas`}function km(e,t){return t===e.gear?null:e.engineOn&&e.clutch<.85?`cambio-sin-embrague`:t===`R`&&e.v>.4||t!==`R`&&t!==`N`&&e.v<-.4?`marcha-atras-en-movimiento`:(e.gear=t,`cambio`)}function Am(e){return e.engineOn?(e.engineOn=!1,`motor-apagado`):e.fuelL<=0?`sin-combustible`:e.gear!==`N`&&e.clutch<.85?`arranque-sin-embrague`:(e.engineOn=!0,e.stallCause=null,e.rpm=Math.max(e.rpm,Q.idleRpm),`arrancado`)}function jm(e,t){e.blinker=e.blinker===t?`ninguno`:t,e.blinkerYaw=0}var Mm=[`apagadas`,`posicion`,`cortas`,`largas`];function Nm(e){e.lights=Mm[(Mm.indexOf(e.lights)+1)%Mm.length]}var Pm=[`j-120_-60`,`j0_-60`,`j120_-60`,`j-120_60`,`j120_60`],Fm=3.5,Im=6.5,Lm=.4,Rm=e=>({x:-e.z,z:e.x}),zm=e=>Math.atan2(e.x,e.z),Bm=class t{constructor(t){e(this,`map`,void 0),e(this,`arms`,[]),e(this,`crosswalks`,[]),e(this,`signs`,[]),e(this,`lights`,[]),e(this,`stopLines`,[]),e(this,`armByRoadEnd`,new Map),e(this,`armsByJunction`,new Map),this.map=t;for(let e of t.roads)if(!e.closed)for(let n of[!0,!1]){let r=e.pts.length,i=n?e.pts[0]:e.pts[r-1],a=n?e.pts[1]:e.pts[r-2],o=t.junctions.find(e=>Math.hypot(e.x-i.x,e.z-i.z)<=(e.kind===`rotonda`?ku.rOut+.5:7.6));if(!o)continue;let s=Math.hypot(a.x-i.x,a.z-i.z),c={x:(a.x-i.x)/s,z:(a.z-i.z)/s},l=e.axis??(Math.abs(c.x)>Math.abs(c.z)?`h`:`v`),{xi:u,zi:d}=o,f;f=o.kind===`rotonda`?`rotonda`:e.kind===`ramal`?`ceda`:Pm.includes(o.id)?`semaforo`:l===`h`?`prioridad`:(u+d)%2==0?`stop`:`ceda`;let p={id:`${e.id}:${n?`start`:`end`}`,junction:o,road:e,atStart:n,u:c,axis:l,control:f,lineDist:o.kind===`rotonda`?Lm:Im};this.arms.push(p),this.armByRoadEnd.set(p.id,p);let m=this.armsByJunction.get(o.id);m?m.push(p):this.armsByJunction.set(o.id,[p]),this.decorate(p,i)}this.speedSigns()}armAt(e,t){return this.armByRoadEnd.get(`${e}:${t?`start`:`end`}`)}armsOf(e){return this.armsByJunction.get(e)??[]}crosswalk(e){return this.crosswalks.find(t=>t.id===e)}static hasIncoming(e){return e.road.lanes.some(t=>e.atStart?t.dir===-1:t.dir===1)}decorate(e,n){let{road:r,u:i,control:a}=e,o=r.width/2;if(r.kind===`calle`&&this.crosswalks.push({id:e.id,road:r,atStart:e.atStart,junctionId:e.junction.id,center:{x:n.x+i.x*Fm,z:n.z+i.z*Fm},along:i,halfWidth:o}),!t.hasIncoming(e)||a===`prioridad`)return;let s=Rm({x:-i.x,z:-i.z}),c={x:n.x+i.x*e.lineDist,z:n.z+i.z*e.lineDist},l={x:c.x+s.x*(o+.9),z:c.z+s.z*(o+.9)},u=zm(i),d=r.oneWay?{x:c.x-s.x*o,z:c.z-s.z*o}:c,f={x:c.x+s.x*o,z:c.z+s.z*o};this.stopLines.push({a:d,b:f,dashed:a===`ceda`||a===`rotonda`}),a===`semaforo`?this.lights.push({junctionId:e.junction.id,axis:e.axis,x:l.x,z:l.z,facing:u}):this.signs.push({kind:a===`stop`?`stop`:`ceda`,x:l.x,z:l.z,facing:u})}speedSigns(){for(let e of this.map.roads){if(e.kind!==`calle`)continue;let t=vd(e.pts);if(t<40)continue;let n=e.width/2+.9,r=(t,r,i,a=0)=>{let{p:o,t:s}=_d(e.pts,t),c=Rm(s);this.signs.push({kind:r,value:i,x:o.x+c.x*(n+a),z:o.z+c.z*(n+a),facing:zm({x:-s.x,z:-s.z})})},i=(t,r,i,a=0)=>{let{p:o,t:s}=_d(e.pts,t),c=Rm(s);this.signs.push({kind:r,value:i,x:o.x-c.x*(n+a),z:o.z-c.z*(n+a),facing:zm(s)})};if(md.includes(e.id)&&(r(24,`escolar`),e.oneWay||i(t-24,`escolar`)),e.sections?.length)for(let n of e.sections)n.to-n.from<30||(r(n.from+(n.from<=0?14:4),`limite`,n.limit,1),e.oneWay||i(Math.min(t,n.to)-(n.to>=t?14:4),`limite`,n.limit,1));else{{let{p:t,t:r}=_d(e.pts,14),i=Rm(r);this.signs.push({kind:`limite`,value:e.limit,x:t.x+i.x*n,z:t.z+i.z*n,facing:zm({x:-r.x,z:-r.z})})}if(!e.oneWay){let{p:r,t:i}=_d(e.pts,t-14),a=Rm(i);this.signs.push({kind:`limite`,value:e.limit,x:r.x-a.x*n,z:r.z-a.z*n,facing:zm(i)})}}}let e=Au.hx-ld-3.75-1.6;this.signs.push({kind:`limite`,value:80,x:262,z:-57,facing:-Math.PI/2}),this.signs.push({kind:`limite`,value:120,x:e,z:150,facing:Math.PI}),this.signs.push({kind:`limite`,value:60,x:-Au.hx+ld+6.5,z:180,facing:0})}},Vm=null;function Hm(e){return Vm&&Vm.map===e||(Vm=new Bm(e)),Vm}var Um={green:14,amber:3,allRed:2},Wm=2*(Um.green+Um.amber+Um.allRed);function Gm(e,t,n){let r=((n+Math.max(0,Pm.indexOf(e))*7)%Wm+Wm)%Wm,i=Wm/2,a=t===`h`?r:(r+i)%Wm;return a<Um.green?`verde`:a<Um.green+Um.amber?`ambar`:`rojo`}var Km=e=>e/3.6,qm=e=>({x:-e.z,z:e.x});function Jm(e,t=!1){let n=[0];for(let t=1;t<e.length;t++)n.push(n[t-1]+Math.hypot(e[t].x-e[t-1].x,e[t].z-e[t-1].z));return t&&n.push(n[n.length-1]+Math.hypot(e[0].x-e[e.length-1].x,e[0].z-e[e.length-1].z)),n}function Ym(e,t,n,r,i={}){let a=Jm(n,i.closed);return{id:e,kind:t,pts:n,cum:a,length:a[a.length-1],limit:r,next:[],crosswalks:[],...i}}function Xm(e,t,n=!1){let r=e.length;return e.map((i,a)=>{let o=e[n?(a-1+r)%r:Math.max(0,a-1)],s=e[n?(a+1)%r:Math.min(r-1,a+1)],c=Math.hypot(s.x-o.x,s.z-o.z)||1,l=qm({x:(s.x-o.x)/c,z:(s.z-o.z)/c});return{x:i.x+l.x*t,z:i.z+l.z*t}})}function Zm(e,t,n,r,i=10){let a=Math.hypot(n.x-e.x,n.z-e.z)*.45,o={x:e.x+t.x*a,z:e.z+t.z*a},s={x:n.x-r.x*a,z:n.z-r.z*a},c=[];for(let t=0;t<=i;t++){let r=t/i,a=(1-r)**3,l=3*(1-r)**2*r,u=3*(1-r)*r*r,d=r**3;c.push({x:a*e.x+l*o.x+u*s.x+d*n.x,z:a*e.z+l*o.z+u*s.z+d*n.z})}return c}var Qm=(e,t)=>{let n=e.pts.length,r=t?e.pts[n-2]:e.pts[0],i=t?e.pts[n-1]:e.pts[1],a=Math.hypot(i.x-r.x,i.z-r.z)||1;return{x:(i.x-r.x)/a,z:(i.z-r.z)/a}},$m=class{constructor(t,n){e(this,`map`,void 0),e(this,`signals`,void 0),e(this,`lanes`,new Map),e(this,`incoming`,new Map),e(this,`outgoing`,new Map),e(this,`connectorsByJunction`,new Map),e(this,`ringPassByArm`,new Map),e(this,`ringLinkBeforeArm`,new Map),e(this,`feeders`,new Map),this.map=t,this.signals=n,this.buildStreetLanes(),this.buildJunctions(),this.buildRoundabout(),this.buildHighway();for(let e of this.lanes.values())if(!e.closed)for(let t of e.next){let n=this.feeders.get(t);n?n.push(e.id):this.feeders.set(t,[e.id])}}get(e){let t=this.lanes.get(e);if(!t)throw Error(`Carril desconocido: ${e}`);return t}add(e){return this.lanes.set(e.id,e),e}buildStreetLanes(){for(let e of this.map.roads)e.kind===`calle`&&e.lanes.forEach((t,n)=>{let r=Xm(e.pts,t.offset);t.dir===-1&&(r=r.reverse());let i=e.sections?.length?Math.min(...e.sections.map(e=>e.limit)):e.limit,a=this.add(Ym(`${e.id}#${n}`,`calle`,r,Km(i),{road:e})),o=this.signals.armAt(e.id,t.dir===1),s=this.signals.armAt(e.id,t.dir!==1);o&&this.push(this.outgoing,o.id,a),s&&(this.push(this.incoming,s.id,a),a.arrive=s,a.control=s.control,a.lineS=a.length-s.lineDist);for(let n of[!0,!1]){let r=this.signals.crosswalk(`${e.id}:${n?`start`:`end`}`);if(!r)continue;let i=n?3.5:a.length-3.5;a.crosswalks.push({id:r.id,s:t.dir===1?i:a.length-i})}a.crosswalks.sort((e,t)=>e.s-t.s)})}push(e,t,n){let r=e.get(t);r?r.push(n):e.set(t,[n])}rightness(e,t,n){let r=n?e.pts[0]:e.pts[e.pts.length-1],i=qm(n?t.u:{x:-t.u.x,z:-t.u.z});return(r.x-t.junction.x)*i.x+(r.z-t.junction.z)*i.z}buildJunctions(){for(let e of this.map.junctions){if(e.kind!==`cruce`)continue;let t=this.signals.armsOf(e.id).filter(e=>e.road.kind===`calle`),n=[];for(let r of t){let i=(this.incoming.get(r.id)??[]).slice().sort((e,t)=>this.rightness(t,r,!1)-this.rightness(e,r,!1));for(let a of t){if(a===r)continue;let t=(this.outgoing.get(a.id)??[]).slice().sort((e,t)=>this.rightness(t,a,!0)-this.rightness(e,a,!0));if(!t.length||!i.length)continue;let o={x:-r.u.x,z:-r.u.z},s=o.x*a.u.x+o.z*a.u.z,c=qm(o),l=s>.7?`recto`:c.x*a.u.x+c.z*a.u.z>0?`derecha`:`izquierda`,u=[];l===`derecha`?u.push([i[0],t[0]]):l===`izquierda`?u.push([i[i.length-1],t[t.length-1]]):i.forEach((e,n)=>u.push([e,t[Math.min(n,t.length-1)]]));for(let[t,i]of u){let a=t.pts[t.pts.length-1],o=i.pts[0],s=l===`recto`?[a,o]:Zm(a,Qm(t,!0),o,Qm(i,!1)),c=`${t.id}>${i.id}`,u=this.add(Ym(c,`conector`,s,l===`recto`?Math.min(t.limit,i.limit):Km(l===`derecha`?16:22),{junctionId:e.id,fromArm:r.id,turn:l,next:[i.id]}));t.next.push(u.id),n.push(u.id)}}}for(let r of t)for(let i of this.incoming.get(r.id)??[])if(!i.next.length){for(let a of t){if(a===r)continue;let t={x:-r.u.x,z:-r.u.z},o=qm(t),s=t.x*a.u.x+t.z*a.u.z>.7?`recto`:o.x*a.u.x+o.z*a.u.z>0?`derecha`:`izquierda`;for(let t of(this.outgoing.get(a.id)??[]).slice(0,1)){let a=Zm(i.pts[i.pts.length-1],Qm(i,!0),t.pts[0],Qm(t,!1)),o=this.add(Ym(`${i.id}>${t.id}`,`conector`,a,Km(16),{junctionId:e.id,fromArm:r.id,turn:s,next:[t.id]}));i.next.push(o.id),n.push(o.id)}}if(!i.next.length)for(let t of this.outgoing.get(r.id)??[]){let a=Zm(i.pts[i.pts.length-1],Qm(i,!0),t.pts[0],Qm(t,!1),12),o=this.add(Ym(`${i.id}>${t.id}`,`conector`,a,Km(10),{junctionId:e.id,fromArm:r.id,turn:`izquierda`,next:[t.id]}));i.next.push(o.id),n.push(o.id)}}this.connectorsByJunction.set(e.id,n)}}buildRoundabout(){let e=this.map.junctions.find(e=>e.kind===`rotonda`);if(!e)return;let t={x:e.x,z:e.z},n=(ku.rIn+ku.rOut)/2+1,r=this.signals.armsOf(e.id).map(e=>({arm:e,phi:Math.atan2(e.u.z,e.u.x)}));r.sort((e,t)=>t.phi-e.phi);let i=.42,a=e=>({x:t.x+n*Math.cos(e),z:t.z+n*Math.sin(e)}),o=e=>({x:Math.sin(e),z:-Math.cos(e)}),s=(e,t)=>{let r=Math.max(3,Math.ceil(Math.abs(t-e)*n/2));return Array.from({length:r+1},(n,i)=>a(e+(t-e)*i/r))},c=Km(25),l=[];r.forEach(({arm:t,phi:n},a)=>{let o=r[(a+1)%r.length],u=o.phi;for(;u>=n;)u-=Math.PI*2;let d=this.add(Ym(`rot-pasa-${t.id}`,`anillo`,s(n+i,n-i),c,{junctionId:e.id})),f=this.add(Ym(`rot-tramo-${t.id}`,`anillo`,s(n-i,u+i),c,{junctionId:e.id}));this.ringPassByArm.set(t.id,d.id),this.ringLinkBeforeArm.set(o.arm.id,f.id),d.next.push(f.id),l.push(d.id,f.id)}),r.forEach(({arm:t,phi:n})=>{let r=this.get(this.ringPassByArm.get(t.id)),s=this.get(this.ringLinkBeforeArm.get(t.id)),u=this.get(r.next[0]);s.next.push(r.id);for(let r of this.incoming.get(t.id)??[]){let s=r.pts[r.pts.length-1],d=this.add(Ym(`rot-entra-${r.id}`,`conector`,Zm(s,Qm(r,!0),a(n-i),o(n-i),8),c,{junctionId:e.id,fromArm:t.id,turn:`derecha`,next:[u.id]}));r.next.push(d.id),l.push(d.id)}for(let r of this.outgoing.get(t.id)??[]){let t=this.add(Ym(`rot-sale-${r.id}`,`conector`,Zm(a(n+i),o(n+i),r.pts[0],Qm(r,!1),8),c,{junctionId:e.id,turn:`derecha`,next:[r.id]}));s.next.push(t.id),l.push(t.id)}}),this.connectorsByJunction.set(e.id,l)}buildHighway(){let e=this.map.roads.find(e=>e.kind===`autovia`);e&&e.lanes.forEach((t,n)=>{let r=Xm(e.pts,t.offset,!0);t.dir===-1&&(r=r.reverse());let i=this.add(Ym(`autovia#${n}`,`autovia`,r,Km(e.limit),{closed:!0,road:e}));i.next.push(i.id)})}};function eh(e,t){let n=e.length,r=e.closed?(t%n+n)%n:Math.max(0,Math.min(n,t)),i=e.pts.length,a=0,o=e.cum.length-1;for(;o-a>1;){let t=a+o>>1;e.cum[t]<=r?a=t:o=t}let s=e.pts[a%i],c=e.pts[(a+1)%i]??s,l=e.cum[a+1]-e.cum[a]||1;r=Math.min(l,r-e.cum[a]);let u=r/l;return{x:s.x+(c.x-s.x)*u,z:s.z+(c.z-s.z)*u,heading:Math.atan2(c.x-s.x,c.z-s.z)}}var th=null;function nh(e,t){return th&&th.map===e||(th=new $m(e,t)),th}var rh=4.3,ih={a:1.6,b:2.8,s0:2.2,T:1.3},ah=80,oh=[14277081,2039586,9410206,11740702,1916810,15262675,3038266,5979020,13081131,4212303];function sh(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var ch=class{constructor(t,n,r){e(this,`graph`,void 0),e(this,`signals`,void 0),e(this,`cars`,[]),e(this,`rand`,void 0),e(this,`byLane`,new Map),e(this,`nextId`,1),e(this,`cityLanes`,void 0),e(this,`highwayLanes`,void 0),e(this,`enabled`,!0),e(this,`pool`,[]),e(this,`pinned`,null),this.graph=t,this.signals=n,this.rand=sh(r.seed??7),this.cityLanes=[...t.lanes.values()].filter(e=>e.kind===`calle`),this.highwayLanes=[...t.lanes.values()].filter(e=>e.kind===`autovia`);for(let e=0;e<r.city;e++)this.spawnCity(r.avoid??null);for(let e=0;e<r.highway;e++){let t=this.highwayLanes[e%this.highwayLanes.length],n=Math.floor(e/this.highwayLanes.length),i=Math.ceil(r.highway/this.highwayLanes.length);this.addCar(t,(n+this.rand()*.5)/i*t.length,t.id.endsWith(`#0`)||t.id.endsWith(`#2`)?.95:.82)}this.reindex();for(let e of this.cars)this.place(e)}addCar(e,t,n){let r={id:this.nextId++,lane:e,prev:null,s:t,v:e.limit*n*.6,factor:n,plan:[],color:oh[Math.floor(this.rand()*oh.length)],waitT:0,stuckT:0,cleared:new Set,x:0,z:0,heading:0,braking:!1,blinker:null};return this.cars.push(r),r}freeSpot(e,t,n){if(this.cars.some(n=>n.lane===e&&Math.abs(n.s-t)<16))return!1;if(n){let r=eh(e,t);if(Math.hypot(r.x-n.x,r.z-n.z)<45)return!1}return!0}spawnCity(e,t){for(let n=0;n<60;n++){let n=this.cityLanes[Math.floor(this.rand()*this.cityLanes.length)];if(n.length<40)continue;let r=8+this.rand()*(n.length-30);if(this.freeSpot(n,r,e)){if(t){Object.assign(t,{lane:n,prev:null,s:r,v:0,plan:[],waitT:0,stuckT:0}),t.cleared.clear();return}this.addCar(n,r,.85+this.rand()*.15);return}}}spawnAt(e,t,n){let r=this.graph.get(e),i=this.pool.pop()??null;return i?this.cars.push(i):i=this.cars.find(e=>e.lane.kind!==`conector`&&e.lane.kind!==`anillo`)??this.addCar(r,t,1),Object.assign(i,{lane:r,prev:null,s:t,plan:[],waitT:0,stuckT:0,factor:Math.min(1.2,n/3.6/r.limit)}),i.cleared.clear(),this.pinned=i,i.v=n/3.6,i.color=13081131,this.reindex(),this.place(i),i}get capacity(){return this.cars.length+this.pool.length}setActive(e,t){if(e=Math.max(0,Math.min(this.capacity,Math.round(e))),this.cars.length>e){let n=e=>t?Math.hypot(e.x-t.x,e.z-t.z):0,r=this.cars.filter(e=>e.lane.kind!==`conector`&&e.lane.kind!==`anillo`&&e!==this.pinned).sort((e,t)=>n(t)-n(e));for(let t of r.slice(0,this.cars.length-e))this.cars.splice(this.cars.indexOf(t),1),this.pool.push(t)}else for(;this.cars.length<e&&this.pool.length;){let e=this.pool.pop();e.lane.kind===`autovia`?e.s=(e.s+300)%e.lane.length:this.spawnCity(t,e),this.cars.push(e)}this.reindex();for(let e of this.cars)this.place(e)}clearAround(e,t,n){for(let r of this.cars)Math.hypot(r.x-e,r.z-t)>=n||(r.lane.kind===`autovia`?r.s=(r.s+250)%r.lane.length:this.spawnCity({x:e,z:t},r));this.reindex();for(let e of this.cars)this.place(e)}reindex(){this.byLane.clear();for(let e of this.cars){let t=this.byLane.get(e.lane.id);t?t.push(e):this.byLane.set(e.lane.id,[e])}}choose(e){let t=e.next.map(e=>this.graph.get(e));if(t.length===1)return t[0];let n=t.map(e=>e.id.startsWith(`rot-sale`)?1.3:e.id.startsWith(`rot-pasa`)?1:e.turn===`recto`?2:1),r=this.rand()*n.reduce((e,t)=>e+t,0);for(let e=0;e<t.length;e++)if(r-=n[e],r<=0)return t[e];return t[t.length-1]}path(e){let t=[{lane:e.lane,d0:-e.s}];if(e.lane.closed)return t.push({lane:e.lane,d0:e.lane.length-e.s}),t;let n=e.lane.length-e.s,r=e.lane,i=0;for(;n<ah;){let a=e.plan[i];a||(a=this.choose(r),e.plan.push(a)),t.push({lane:a,d0:n}),n+=a.length,r=a,i++}return t}boxCars(e,t){for(let n of this.cars){let r=n.lane.kind===`conector`?n.lane:n.prev?.kind===`conector`&&n.s<5.8?n.prev:null;if(r&&r.junctionId===e.id){if(!t||r.fromArm!==t)return!0;continue}let i=n.lane.arrive;if(i&&i.junction.id===e.id&&n.cleared.has(n.lane.id)&&(!t||i.id!==t))return!0}return!1}playerInBox(e,t){return!!t&&Math.hypot(t.x-e.x,t.z-e.z)<8}approaching(e,t,n=48,r){for(let t of this.graph.incoming.get(e.id)??[])for(let e of this.byLane.get(t.id)??[]){if(r&&!r(e))continue;let i=t.length-e.s;if(i<n&&(e.v>.8||i<5))return!0}if(t){let r=e.junction,i=t.x-r.x,a=t.z-r.z,o=i*e.u.x+a*e.u.z,s=-i*e.u.z+a*e.u.x,c=-(Math.sin(t.heading)*e.u.x+Math.cos(t.heading)*e.u.z)*t.v;if(o>3&&o<n&&Math.abs(s)<e.road.width/2+.5&&c>.8)return!0}return!1}clearToEnter(e,t,n,r=0){let i=e.junction;if(e.control===`rotonda`)return this.roundaboutClear(e,t);if(n===`izquierda`){let n=this.signals.armsOf(i.id).find(t=>t.u.x*e.u.x+t.u.z*e.u.z<-.9);if(n&&this.approaching(n,t,45,e=>e.plan[0]?.turn!==`izquierda`||e.id<r))return!1}if(e.control===`prioridad`||e.control===`semaforo`)return!(this.boxCars(i,e.id)||this.playerInBox(i,t));if(this.boxCars(i)||this.playerInBox(i,t))return!1;for(let n of this.signals.armsOf(i.id))if(n!==e&&n.control===`prioridad`&&this.approaching(n,t))return!1;return!0}roundaboutClear(e,t){let n=this.graph.ringPassByArm.get(e.id),r=this.graph.ringLinkBeforeArm.get(e.id);if(n&&(this.byLane.get(n)?.length??0)>0)return!1;if(r){let e=this.graph.get(r);for(let t of this.byLane.get(r)??[])if(e.length-t.s<16)return!1}if(t){let n=e.junction,r=Math.hypot(t.x-n.x,t.z-n.z),i=Math.atan2(e.u.z,e.u.x),a=n.x+15*Math.cos(i+.6),o=n.z+15*Math.sin(i+.6);if(r<ku.rOut+1&&r>ku.rIn-1&&Math.hypot(t.x-a,t.z-o)<15)return!1}return!0}step(e,t){if(this.enabled){this.reindex();for(let n of this.cars)this.drive(n,e,t);this.reindex();for(let e of this.cars)this.place(e)}}drive(e,t,n){let r=this.path(e),i=1/0,a=0,o=(e,t)=>{e<i&&(i=e,a=t)},s=e.lane.limit*e.factor,c=!1;e.blinker=null;for(let i=0;i<r.length;i++){let a=r[i],l=a.lane;i>0&&l.limit*e.factor<s&&(s=Math.min(s,Math.sqrt((l.limit*e.factor)**2+3.6*Math.max(0,a.d0)))),i>0&&l.turn&&l.turn!==`recto`&&a.d0<35&&l.kind===`conector`&&(e.blinker??=l.turn);for(let t of this.byLane.get(l.id)??[]){if(t===e)continue;let n=a.d0+t.s;if(i===0&&t.s<=e.s){if(!l.closed)continue;n+=l.length}i===1&&l.closed&&l===e.lane||o(n-rh,t.v)}if(i<=1&&!l.closed&&l.next.length===1){let e=l.next[0],t=a.d0+l.length;for(let n of this.graph.feeders.get(e)??[]){if(n===l.id)continue;let e=this.graph.get(n);for(let r of this.byLane.get(n)??[]){let n=t-(e.length-r.s);n>.5&&e.length-r.s<25&&o(n-rh,r.v)}}}for(let e of l.crosswalks){let t=a.d0+e.s;t-2.6<-.5||t>ah||n.crosswalkBusy(e.id)&&o(t-2.6-1+ih.s0,0)}if(!c&&l.lineS!==void 0&&l.arrive&&!e.cleared.has(l.id)){let s=a.d0+l.lineS;if(s>-.5&&s<ah){let a=r[i+1]?.lane.turn;this.mustStop(e,l,l.arrive,s,a,n,t)&&(o(s-.6+ih.s0,0),c=!0)}}}let l=n.player;if(l&&Math.hypot(l.x-e.x,l.z-e.z)<90)for(let e=1;e<Math.min(i+4,ah);e+=2){let t=this.posAlong(r,e);if(!t)break;if(Math.hypot(t.x-l.x,t.z-l.z)<2.1){o(e-2.4,Math.max(0,l.v*Math.cos(l.heading-t.heading)));break}}s=Math.max(.5,s);let u=e.v,d=ih.s0+Math.max(0,u*ih.T+u*(u-a)/(2*Math.sqrt(ih.a*ih.b))),f=Math.max(.05,i),p=ih.a*(1-(u/s)**4-(i===1/0?0:(d/f)**2));for(p=Math.max(-9,Math.min(ih.a,p)),e.braking=p<-.8||u<.2&&i<6,e.v=Math.max(0,u+p*t),i<.05&&(e.v=0),e.s+=e.v*t;e.s>e.lane.length;)e.lane.closed?e.s-=e.lane.length:(e.s-=e.lane.length,e.prev=e.lane,e.lane=e.plan.shift()??this.choose(e.lane),e.waitT=0,e.lane.kind===`calle`&&e.cleared.clear());e.stuckT=e.v<.05?e.stuckT+t:0,e.stuckT>40&&e.lane.kind!==`autovia`&&(!l||Math.hypot(l.x-e.x,l.z-e.z)>110)&&this.spawnCity(l,e)}mustStop(e,t,n,r,i,a,o){let s=a.player;switch(n.control){case`semaforo`:{let t=Gm(n.junction.id,n.axis,a.t);return t===`rojo`?!0:t===`ambar`?r>e.v*e.v/6.4+1:!!(i===`izquierda`&&r<12&&!this.clearToEnter(n,s,i,e.id)||r<8&&r>.5&&this.boxCars(n.junction,n.id))}case`stop`:return r<1.5&&e.v<.3&&(e.waitT+=o),e.waitT>1.2&&this.clearToEnter(n,s,i,e.id)?(e.cleared.add(t.id),!1):!0;case`ceda`:case`rotonda`:return r>14?!1:this.clearToEnter(n,s,i,e.id)?(r<4&&e.cleared.add(t.id),!1):!(r<.8&&e.v>2.5);case`prioridad`:return r>10?!1:this.clearToEnter(n,s,i,e.id)?(r<3&&e.cleared.add(t.id),!1):!(r<1.2&&e.v>3)}}posAlong(e,t){for(let n=e.length-1;n>=0;n--){let r=e[n];if(t>=r.d0)return eh(r.lane,t-r.d0)}return null}place(e){let t=eh(e.lane,e.s),n=e.s-rh*.85,r=n>=0||e.lane.closed||!e.prev?eh(e.lane,e.lane.closed?n:Math.max(0,n)):eh(e.prev,e.prev.length+n);e.heading=Math.atan2(t.x-r.x,t.z-r.z),e.x=(t.x+r.x)/2,e.z=(t.z+r.z)/2}leaderOf(e){let t=Math.sin(e.heading),n=Math.cos(e.heading),r=null;for(let i of this.cars){let a=i.x-e.x,o=i.z-e.z,s=a*t+o*n,c=Math.abs(-a*n+o*t);if(s<2||s>70||c>1.6||Math.cos(i.heading-e.heading)<.8)continue;let l=s-rh;(!r||l<r.dist)&&(r={dist:l,v:i.v})}return r}},lh=5,uh=[3099516,9186605,3042127,7032622,4475735,10185374,12886874,4161439];function dh(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var fh=e=>(e.kind===`rotonda`?ku.rOut:7)+1.5,ph=e=>({x:-e.z,z:e.x});function mh(e,t){let n=e.length;return e.map((r,i)=>{let a=e[Math.max(0,i-1)],o=e[Math.min(n-1,i+1)],s=Math.hypot(o.x-a.x,o.z-a.z)||1,c=ph({x:(o.x-a.x)/s,z:(o.z-a.z)/s});return{x:r.x+c.x*t,z:r.z+c.z*t}})}var hh=class{constructor(t,n,r=5){e(this,`signals`,void 0),e(this,`peds`,[]),e(this,`loops`,[]),e(this,`rand`,void 0),e(this,`crossing`,new Map),e(this,`map`,void 0),e(this,`pool`,[]),this.signals=t,this.rand=dh(r),this.map=t.map,this.loops=this.map.blocks.map(e=>this.blockLoop(e)),this.map.blocks.forEach((e,t)=>this.addCrossings(e,t));for(let e=0;e<n;e++){let t=Math.floor(this.rand()*this.loops.length),n=this.loops[t],r=Math.floor(this.rand()*n.length),i=n[r],a=n[(r+1)%n.length],o=this.rand(),s={id:e+1,x:i.x+(a.x-i.x)*o,z:i.z+(a.z-i.z)*o,y:0,heading:0,speed:1.1+this.rand()*.5,phase:this.rand()*6,color:uh[e%uh.length],state:`walk`,route:[],block:t,idx:r,dir:1,crosswalk:null,after:null,waitT:0,pauseT:0,pending:[]};s.route=[a],s.idx=(r+1)%n.length,this.peds.push(s)}}get capacity(){return this.peds.length+this.pool.length}setActive(e){for(e=Math.max(0,Math.min(this.capacity,Math.round(e)));this.peds.length>e;){let e=this.peds.findIndex(e=>!e.crosswalk&&e.state===`walk`&&!e.bold);if(e<0)break;this.pool.push(this.peds.splice(e,1)[0])}for(;this.peds.length<e&&this.pool.length;)this.peds.push(this.pool.pop())}busy(e){return(this.crossing.get(e)??0)>0}forceCrossing(e){let t=this.peds.find(e=>e.state===`walk`&&!e.crosswalk)??this.peds[0];if(!t)return;let n={x:-e.along.z,z:e.along.x},r=e.halfWidth+1.5,i={x:e.center.x+n.x*r,z:e.center.z+n.z*r},a={x:e.center.x-n.x*r,z:e.center.z-n.z*r};t.x=i.x,t.z=i.z,t.route=[],t.state=`wait`,t.waitT=0,t.crosswalk=e.id,t.pending=[a,{x:a.x+e.along.x*1.5,z:a.z+e.along.z*1.5}],t.after=null,t.bold=!0}startle(e,t=3){e.pauseT=Math.max(e.pauseT,t)}step(e,t){for(let n of this.peds)this.move(n,e,t)}blockLoop(e){let t=e.edges.map(t=>{let n=t.road.pts,r=Math.hypot(n[0].x-t.from.x,n[0].z-t.from.z);Math.hypot(n[n.length-1].x-t.from.x,n[n.length-1].z-t.from.z)<r&&(n=[...n].reverse());let i=n[Math.floor(n.length/2)],a=n[Math.floor(n.length/2)+1]??n[n.length-1],o={x:a.x-i.x,z:a.z-i.z},s=Math.sign((e.center.x-i.x)*-o.z+(e.center.z-i.z)*o.x)||1;return mh(n,s*lh).filter(e=>Math.hypot(e.x-t.from.x,e.z-t.from.z)>fh(t.from)&&Math.hypot(e.x-t.to.x,e.z-t.to.z)>fh(t.to))}),n=[];return e.edges.forEach((e,r)=>{let i=t[r],a=t[(r+1)%4];n.push(...i);let o=e.to,s=fh(o),c=i[i.length-1],l=a[0],u=Math.atan2(c.z-o.z,c.x-o.x),d=Math.atan2(l.z-o.z,l.x-o.x);for(;d-u>Math.PI;)d-=2*Math.PI;for(;u-d>Math.PI;)d+=2*Math.PI;for(let e=0;e<=6;e++){let t=u+(d-u)*e/6;n.push({x:o.x+s*Math.cos(t),z:o.z+s*Math.sin(t)})}}),n}addCrossings(e,t){let n=this.loops[t];e.edges.forEach((r,i)=>{let a=r.to,o=e.edges[(i+1)%4].road,s=fh(a),c=n.filter(e=>Math.abs(Math.hypot(e.x-a.x,e.z-a.z)-s)<.05);if(c.length<3)return;let l=c[Math.floor(c.length/2)],u=[];for(let[n,i]of[[r.road,c[0]],[o,c[c.length-1]]]){let r=Math.hypot(n.pts[0].x-a.x,n.pts[0].z-a.z)<Math.hypot(n.pts[n.pts.length-1].x-a.x,n.pts[n.pts.length-1].z-a.z),o=this.signals.crosswalk(`${n.id}:${r?`start`:`end`}`),s=this.map.blocks.findIndex((e,r)=>r!==t&&e.edges.some(e=>e.road===n));if(!o||s<0)continue;let c=ph(o.along),l=Math.sign((e.center.x-o.center.x)*c.x+(e.center.z-o.center.z)*c.z)||1;u.push({cw:o.id,arcEnd:i,block:s,p1:{x:o.center.x+c.x*l*lh,z:o.center.z+c.z*l*lh},p2:{x:o.center.x-c.x*l*lh,z:o.center.z-c.z*l*lh}})}u.length&&(l.corner=u)})}maybeCross(e,t){if(!t.corner||this.rand()>.4)return!1;let n=t.corner[Math.floor(this.rand()*t.corner.length)],r=this.loops[n.block],i=r[0];for(let e of r)Math.hypot(e.x-n.p2.x,e.z-n.p2.z)<Math.hypot(i.x-n.p2.x,i.z-n.p2.z)&&(i=e);return e.route=[n.arcEnd,n.p1],e.crosswalk=n.cw,e.after={block:n.block,point:i},e.pending=[n.p2,i],!0}move(e,t,n){if(e.phase+=t*e.speed*5,e.pauseT>0){e.pauseT-=t;return}if(e.state===`wait`){e.waitT+=t,e.crosswalk&&(e.bold&&e.waitT>.8||!n.vehicleApproaching(e.crosswalk))?(e.state=`cross`,this.crossing.set(e.crosswalk,(this.crossing.get(e.crosswalk)??0)+1),e.route=e.pending.slice(0,1)):e.waitT>25&&(e.state=`walk`,e.crosswalk=null,e.after=null,this.nextLoopPoint(e));return}let r=e.route[0];if(!r){this.nextLoopPoint(e);return}let i=r.x-e.x,a=r.z-e.z,o=Math.hypot(i,a),s=e.speed*t;o>.001&&(e.heading=Math.atan2(i,a)),o>s?(e.x+=i/o*s,e.z+=a/o*s):(e.x=r.x,e.z=r.z,e.route.shift(),this.arrived(e)),e.y=Hu(e.x,e.z)+(e.state===`cross`?0:.15)}arrived(e){if(e.crosswalk&&e.state===`walk`&&e.route.length===0)e.state=`wait`,e.waitT=0;else if(e.state===`cross`&&e.route.length===0)e.crosswalk&&this.crossing.set(e.crosswalk,Math.max(0,(this.crossing.get(e.crosswalk)??1)-1)),e.state=`walk`,e.crosswalk=null,e.route=e.pending.slice(1),e.pending=[];else if(e.state===`walk`&&e.route.length===0&&e.bold&&!e.after){let t={block:e.block,idx:e.idx,d:1/0};this.loops.forEach((n,r)=>n.forEach((n,i)=>{let a=Math.hypot(n.x-e.x,n.z-e.z);a<t.d&&(t={block:r,idx:i,d:a})})),e.block=t.block,e.idx=t.idx,e.bold=!1,e.route=[this.loops[t.block][t.idx]]}else if(e.state===`walk`&&e.route.length===0&&e.after){let t=this.loops[e.after.block],n=e.after.point,r=0;t.forEach((e,i)=>{Math.hypot(e.x-n.x,e.z-n.z)<Math.hypot(t[r].x-n.x,t[r].z-n.z)&&(r=i)}),e.block=e.after.block,e.idx=r,e.dir=this.rand()<.5?1:-1,e.after=null}}nextLoopPoint(e){let t=this.loops[e.block],n=t[e.idx];Math.hypot(n.x-e.x,n.z-e.z)<.5&&this.maybeCross(e,n)||(e.idx=(e.idx+e.dir+t.length)%t.length,e.route=[t[e.idx]])}};function gh(e,t){for(let n of t){let t=n.x-e.center.x,r=n.z-e.center.z,i=t*e.along.x+r*e.along.z,a=-t*e.along.z+r*e.along.x;if(Math.abs(a)>e.halfWidth+.8||Math.abs(i)>26)continue;if(Math.abs(i)<4.5&&n.v>.3)return!0;let o=-(Math.sin(n.heading)*e.along.x+Math.cos(n.heading)*e.along.z)*Math.sign(i)*n.v;if(o>1.5&&(Math.abs(i)-4)/o<4)return!0}return!1}var _h={"aviso-semaforo":`aviso`,"aviso-stop":`aviso`,"aviso-ceda":`aviso`,"aviso-rotonda":`aviso`,"aviso-peaton":`aviso`,"aviso-tunel":`aviso`,"consejo-subir-marcha":`aviso`,"consejo-reducir-marcha":`aviso`,"semaforo-rojo":`falta`,"stop-sin-detenerse":`falta`,"no-ceder-paso":`falta`,"no-ceder-peaton":`falta`,"exceso-velocidad":`falta`,"sentido-contrario":`falta`,"giro-sin-intermitente":`falta`,"salida-rotonda-sin-intermitente":`falta`,"sin-cinturon":`falta`,"tunel-sin-luces":`falta`,"subir-acera":`falta`,"distancia-seguridad":`falta`,"freno-mano":`falta`,calado:`falta`,colision:`falta`,atropello:`falta`,"cambio-carril-sin-intermitente":`falta`,"incorporacion-lenta":`falta`,"no-seguir-indicaciones":`falta`,"no-retrovisor":`falta`,"mala-posicion":`falta`,"stop-correcto":`bien`,"ceda-correcto":`bien`,"giro-correcto":`bien`,"semaforo-detenido":`bien`,"peaton-cedido":`bien`,"rotonda-correcta":`bien`,"cambio-carril-correcto":`bien`,"incorporacion-correcta":`bien`,"reduccion-marcha":`bien`,"semaforo-respetado":`bien`},vh=e=>Math.atan2(Math.sin(e),Math.cos(e));function yh(e){let t=0;for(let n=1;n<e.pts.length;n++)t+=Math.hypot(e.pts[n].x-e.pts[n-1].x,e.pts[n].z-e.pts[n-1].z);return t}var bh=class{constructor(t){e(this,`signals`,void 0),e(this,`ahead`,null),e(this,`approachArm`,null),e(this,`lengths`,new Map),e(this,`crosswalksByRoad`,new Map),e(this,`approach`,null),e(this,`junctionIn`,null),e(this,`lastBlink`,{t:-99,side:``}),e(this,`cooldown`,new Map),e(this,`timers`,{over:0,wrong:0,close:0,high:0,low:0,center:0}),e(this,`crosswalkFault`,new Set),e(this,`inTunnel`,!1),e(this,`lane`,null),e(this,`prevRoad`,null),e(this,`prevGear`,`N`),e(this,`redStopDone`,!1),this.signals=t;for(let e of t.crosswalks){let t=this.crosswalksByRoad.get(e.road.id);t?t.push(e):this.crosswalksByRoad.set(e.road.id,[e])}}len(e){let t=this.lengths.get(e.id);return t===void 0&&(t=yh(e),this.lengths.set(e.id,t)),t}emit(e,t,n,r,i=8,a=``,o={}){let s=n+a;(this.cooldown.get(s)??-99)>t||(this.cooldown.set(s,t+i),e.push({code:n,kind:_h[n],detail:r,...o}))}checkMirror(e,t){t.mirrorGlanceT!==void 0&&t.t-t.mirrorGlanceT>7&&this.emit(e,t.t,`no-retrovisor`,void 0,10)}blinkedRecently(e,t,n=6){return e-this.lastBlink.t<n&&this.lastBlink.side===t}step(e){let t=[],{v:n,info:r,t:i,dt:a}=e,o=Math.abs(n.v),s=o*3.6;for(let n of e.external??[])n===`calado`&&this.emit(t,i,`calado`,void 0,3),typeof n==`object`&&n.code===`calado`&&this.emit(t,i,`calado`,n.crossing?`${n.cause}; en un cruce con vehículos acercándose`:n.cause,3,``,{value:+!!n.crossing}),n===`atropello`&&this.emit(t,i,`atropello`,void 0,3),typeof n==`object`&&n.code===`colision`&&this.emit(t,i,`colision`,`${Math.round(n.kmh)} km/h`,3,``,{value:n.kmh});typeof n.gear==`number`&&typeof this.prevGear==`number`&&n.gear<this.prevGear&&o>1.5&&this.emit(t,i,`reduccion-marcha`,`${this.prevGear}.ª → ${n.gear}.ª`,0),this.prevGear=n.gear,(n.blinker===`izquierda`||n.blinker===`derecha`)&&(this.lastBlink={t:i,side:n.blinker}),o>1.5&&!n.belt&&this.emit(t,i,`sin-cinturon`,void 0,30),o>2&&n.handbrake&&this.emit(t,i,`freno-mano`,void 0,8),r.surface===`acera`&&o>.5&&this.emit(t,i,`subir-acera`,void 0,6);let c=r.surface===`calzada`||r.surface===`arcen`;c&&s>r.limit+3?this.timers.over+=a:this.timers.over=0,this.timers.over>2&&this.emit(t,i,`exceso-velocidad`,`${Math.round(s)} km/h donde el límite es ${r.limit}`,10,``,{value:s,limit:r.limit}),n.engineOn&&n.gear!==`N`&&n.gear!==`R`&&(this.timers.high=n.rpm>4200&&n.throttle<.6&&n.gear!==5?this.timers.high+a:0,this.timers.low=n.rpm<1150&&n.gear!==1&&n.throttle>.5&&n.clutch<.2?this.timers.low+a:0,this.timers.high>3&&this.emit(t,i,`consejo-subir-marcha`,void 0,20),this.timers.low>1.5&&this.emit(t,i,`consejo-reducir-marcha`,void 0,20)),e.leader&&o>5&&e.leader.dist/o<1?this.timers.close+=a:this.timers.close=0,this.timers.close>2&&this.emit(t,i,`distancia-seguridad`,void 0,12);let l=n.x>ju.x0&&n.x<ju.x1&&Math.abs(n.z-ju.z)<ju.halfWidth,u=!l&&n.x>ju.x0-70&&n.x<ju.x1+70&&Math.abs(n.z-ju.z)<ju.halfWidth&&o>3,d=n.lights===`cortas`||n.lights===`largas`;u&&!d&&this.emit(t,i,`aviso-tunel`,void 0,30),l&&!this.inTunnel&&!d&&this.emit(t,i,`tunel-sin-luces`,void 0,20),this.inTunnel=l;let f=r.road,p=0;if(f&&c){let e=Math.cos(n.heading-r.heading)*Math.sign(n.v||1);p=e>.3?1:e<-.3?-1:0;let t=!1;p!==0&&o>2&&(t=f.oneWay?p===-1:Math.abs(r.lateral)>(f.median?f.median/2:.8)&&Math.sign(r.lateral)===-p),this.timers.wrong=t?this.timers.wrong+a:0}else r.junction?.kind===`rotonda`&&r.surface===`calzada`&&o>2?this.timers.wrong=Math.cos(n.heading-r.heading)*Math.sign(n.v||1)<-.3?this.timers.wrong+a:0:this.timers.wrong=0;this.timers.wrong>1.2&&this.emit(t,i,`sentido-contrario`,void 0,8);let m=!!f&&c&&!f.oneWay&&!f.median&&f.kind===`calle`&&!r.junction&&p!==0&&o>4&&Math.sign(r.lateral)===p&&Math.abs(r.lateral)<.55;if(this.timers.center=m?this.timers.center+a:0,this.timers.center>2.5&&this.emit(t,i,`mala-posicion`,`pisando el eje de la calzada`,12),f&&c&&p!==0&&o>3&&(f.oneWay&&f.kind===`calle`||f.kind===`autovia`)){let n;n=f.kind===`autovia`?Math.abs(r.lateral)<(f.median??0)/2+3.75?`izquierdo`:`derecho`:r.lateral>0?`derecho`:`izquierdo`;let a=f.id+(f.kind===`autovia`?Math.sign(r.lateral)>0?`+`:`-`:``);if(this.lane&&this.lane.road===a&&this.lane.side!==n){let r=n===`izquierdo`?`izquierda`:`derecha`;this.blinkedRecently(i,r)?this.emit(t,i,`cambio-carril-correcto`,r,0):this.emit(t,i,`cambio-carril-sin-intermitente`,r,4),this.checkMirror(t,e)}this.lane={road:a,side:n}}else f&&f.kind===`autovia`||(this.lane=null);f&&this.prevRoad===`ramal-entrada`&&f.kind===`autovia`&&(this.checkMirror(t,e),s>=70&&this.blinkedRecently(i,`izquierda`,10)?this.emit(t,i,`incorporacion-correcta`,`${Math.round(s)} km/h`,0):s<70?this.emit(t,i,`incorporacion-lenta`,`${Math.round(s)} km/h`,5,``,{value:s}):this.emit(t,i,`cambio-carril-sin-intermitente`,`izquierda`,4)),f&&(this.prevRoad=f.id),this.ahead=null;let h,g=1/0;f&&c&&p!==0&&!f.closed&&(h=this.signals.armAt(f.id,p===-1),h&&(g=(p===1?this.len(f)-r.s:r.s)-h.lineDist),h&&!f.oneWay&&Math.sign(r.lateral)!==p&&(h=void 0)),this.approachArm=h?{arm:h,dist:g}:null;let _=this.approach;if(_&&(!h||h!==_.arm)&&(_.lastDist<9&&(r.junction?.id===_.arm.junction.id||h===void 0&&_.lastDist<2)&&this.crossLine(t,e,_),this.approach=null),h&&h.control!==`prioridad`){this.approach||(this.approach={arm:h,lastDist:g,minV:1/0,warned:!1},this.redStopDone=!1);let n=this.approach,r=h.control===`semaforo`?e.light(h):void 0;g<120&&(this.ahead={control:h.control,dist:Math.max(0,g),light:r}),g<12&&g>-1.5&&(n.minV=Math.min(n.minV,o)),h.control===`semaforo`&&r===`rojo`&&g<10&&g>-.5&&o<.3&&!this.redStopDone&&(this.redStopDone=!0,this.emit(t,i,`semaforo-detenido`,void 0,0)),!n.warned&&g<45&&g>8&&o>3&&(h.control===`semaforo`&&r!==`verde`?(this.emit(t,i,`aviso-semaforo`,r,6,h.id),n.warned=!0):h.control===`stop`&&g<40?(this.emit(t,i,`aviso-stop`,void 0,6,h.id),n.warned=!0):(h.control===`ceda`||h.control===`rotonda`)&&g<30&&(this.emit(t,i,h.control===`rotonda`?`aviso-rotonda`:`aviso-ceda`,void 0,6,h.id),n.warned=!0)),n.lastDist>0&&g<=0?(this.crossLine(t,e,n),n.lastDist=-999):n.lastDist!==-999&&(n.lastDist=g)}if(f&&o>.2){let r=Math.sin(n.heading)*Math.sign(n.v||1),a=Math.cos(n.heading)*Math.sign(n.v||1);for(let c of this.crosswalksByRoad.get(f.id)??[]){let l=c.center.x-n.x,u=c.center.z-n.z,d=l*r+u*a;if(Math.abs(-l*a+u*r)>c.halfWidth+1.5)continue;let f=e.crosswalkBusy(c.id);f&&d>4&&d<30&&s>8&&this.emit(t,i,`aviso-peaton`,void 0,8,c.id),f&&d>2&&d<16&&o<1&&this.emit(t,i,`peaton-cedido`,void 0,20,c.id);let p=Math.abs((n.x-c.center.x)*c.along.x+(n.z-c.center.z)*c.along.z)<2+Q.length/2;f&&p&&o>1&&!this.crosswalkFault.has(c.id)&&(this.crosswalkFault.add(c.id),this.emit(t,i,`no-ceder-peaton`,void 0,5,c.id)),p||this.crosswalkFault.delete(c.id)}}let v=r.junction;if(v&&!this.junctionIn&&(this.junctionIn={id:v.id,kind:v.kind,heading:n.heading}),this.junctionIn&&(!v||v.id!==this.junctionIn.id)){let r=this.junctionIn;if(this.junctionIn=v?{id:v.id,kind:v.kind,heading:n.heading}:null,o>.5){if(r.kind===`rotonda`)this.blinkedRecently(i,`derecha`,5)?this.emit(t,i,`rotonda-correcta`,void 0,0):this.emit(t,i,`salida-rotonda-sin-intermitente`,void 0,10),this.checkMirror(t,e);else{let a=vh(n.heading-r.heading);if(Math.abs(a)>.9){let n=a>0?`izquierda`:`derecha`;this.blinkedRecently(i,n)?this.emit(t,i,`giro-correcto`,n,0):this.emit(t,i,`giro-sin-intermitente`,n,6),this.checkMirror(t,e)}}}}return t}crossLine(e,t,n){let{t:r}=t;switch(n.arm.control){case`semaforo`:t.light(n.arm)===`rojo`?this.emit(e,r,`semaforo-rojo`,void 0,5,n.arm.id):this.emit(e,r,`semaforo-respetado`,void 0,0);break;case`stop`:n.minV>.3?this.emit(e,r,`stop-sin-detenerse`,void 0,5,n.arm.id):this.emit(e,r,`stop-correcto`,void 0,30);break;case`ceda`:case`rotonda`:t.clearToEnter&&!t.clearToEnter(n.arm)?this.emit(e,r,`no-ceder-paso`,void 0,5,n.arm.id):n.minV<3&&this.emit(e,r,`ceda-correcto`,void 0,45)}}},xh={"aviso-semaforo":e=>({text:e===`ambar`?`Semáforo en ámbar: si puedes detenerte con seguridad, hazlo.`:`Semáforo en rojo delante. Reduce y detente antes de la línea.`,tone:`warn`}),"aviso-stop":()=>({text:`STOP delante: detén el coche por completo antes de la línea y mira a ambos lados.`,tone:`warn`}),"aviso-ceda":()=>({text:`Ceda el paso: reduce y deja pasar a quien circula por la vía preferente.`,tone:`warn`}),"aviso-rotonda":()=>({text:`Rotonda: cede el paso a quien ya circula por ella y entra por la derecha.`,tone:`warn`}),"aviso-peaton":()=>({text:`Hay un peatón cruzando: frena y cédele el paso.`,tone:`warn`}),"aviso-tunel":()=>({text:`Túnel a la vista: enciende las luces de cruce (L).`,tone:`warn`}),"consejo-subir-marcha":()=>({text:`El motor va muy revolucionado: sube de marcha.`,tone:`info`}),"consejo-reducir-marcha":()=>({text:`El motor va forzado: reduce una marcha.`,tone:`info`}),"semaforo-rojo":()=>({text:`Te has saltado un semáforo en rojo. Es una falta muy grave.`,tone:`bad`}),"stop-sin-detenerse":()=>({text:`En un STOP hay que detenerse por completo, aunque no venga nadie.`,tone:`bad`}),"no-ceder-paso":()=>({text:`No has cedido el paso. Espera a que la vía esté libre antes de entrar.`,tone:`bad`}),"no-ceder-peaton":()=>({text:`Has pasado con un peatón en el paso de cebra. Debes detenerte y cederle el paso.`,tone:`bad`}),"exceso-velocidad":e=>({text:`Vas demasiado rápido: ${e??`por encima del límite`}.`,tone:`bad`}),"sentido-contrario":()=>({text:`¡Circulas en sentido contrario! Vuelve a tu carril.`,tone:`bad`}),"giro-sin-intermitente":e=>({text:`Has girado a la ${e??`otra calle`} sin poner el intermitente (${e===`derecha`?`X`:`Z`}).`,tone:`bad`}),"salida-rotonda-sin-intermitente":()=>({text:`Para salir de la rotonda, señaliza con el intermitente derecho.`,tone:`bad`}),"sin-cinturon":()=>({text:`Ponte el cinturón (B) antes de circular.`,tone:`bad`}),"tunel-sin-luces":()=>({text:`En los túneles es obligatorio llevar encendidas las luces de cruce.`,tone:`bad`}),"subir-acera":()=>({text:`Te has subido a la acera. Controla la trayectoria.`,tone:`bad`}),"distancia-seguridad":()=>({text:`Vas demasiado pegado al de delante: deja al menos dos segundos.`,tone:`bad`}),"freno-mano":()=>({text:`Llevas el freno de mano puesto. Quítalo con Espacio.`,tone:`warn`}),calado:()=>({text:`Se ha calado. Embrague a fondo, punto muerto y vuelve a arrancar con calma.`,tone:`info`}),colision:()=>({text:`Has chocado. Detén el coche y revisa la maniobra.`,tone:`bad`}),atropello:()=>({text:`¡Has atropellado a un peatón! Es una falta eliminatoria.`,tone:`bad`}),"cambio-carril-sin-intermitente":()=>({text:`Antes de cambiar de carril: retrovisor, intermitente y después la maniobra.`,tone:`bad`}),"incorporacion-lenta":e=>({text:`Te has incorporado demasiado despacio (${e??``}). Usa el carril de aceleración para alcanzar la velocidad de la vía.`,tone:`bad`}),"no-seguir-indicaciones":()=>({text:`No has seguido la indicación. No pasa nada: continúa y atiende a la siguiente.`,tone:`warn`}),"no-retrovisor":()=>({text:`Antes de maniobrar, mira el retrovisor: mueve la vista hacia el espejo unos segundos antes.`,tone:`warn`}),"mala-posicion":()=>({text:`Vas pisando el eje: céntrate en tu carril.`,tone:`warn`}),"giro-correcto":()=>({text:`Bien señalizado el giro.`,tone:`good`}),"semaforo-detenido":()=>({text:`Bien, detenido antes de la línea con el semáforo en rojo.`,tone:`good`}),"peaton-cedido":()=>({text:`Bien, has cedido el paso al peatón.`,tone:`good`}),"rotonda-correcta":()=>({text:`Bien: salida de la rotonda señalizada.`,tone:`good`}),"cambio-carril-correcto":()=>({text:`Cambio de carril correcto.`,tone:`good`}),"incorporacion-correcta":()=>({text:`Buena incorporación a la autovía.`,tone:`good`}),"reduccion-marcha":()=>({text:`Bien reducida la marcha.`,tone:`good`}),"semaforo-respetado":()=>({text:`Semáforo respetado.`,tone:`good`}),"stop-correcto":()=>({text:`Bien: detención completa en el STOP.`,tone:`good`}),"ceda-correcto":()=>({text:`Bien cedido el paso.`,tone:`good`})};function Sh(e){return xh[e.code](e.detail)}var Ch={bad:0,warn:1,info:2,good:3},wh=class t{constructor(t){if(e(this,`speak`,void 0),e(this,`enabled`,!0),e(this,`lastSpoken`,new Map),e(this,`busyUntil`,0),e(this,`voice`,null),this.speak=t,t&&typeof speechSynthesis<`u`){let e=()=>{let e=speechSynthesis.getVoices();this.voice=e.find(e=>e.lang===`es-ES`)??e.find(e=>e.lang.startsWith(`es`))??null};e(),speechSynthesis.addEventListener?.(`voiceschanged`,e)}}handle(e,t){if(!this.enabled||!e.length)return null;let n=e.map(e=>({e,line:Sh(e)})).sort((e,t)=>Ch[e.line.tone]-Ch[t.line.tone]);for(let{e,line:r}of n){let n=this.lastSpoken.get(e.code)??-99,i=r.tone===`bad`;if(!(t-n<(i?6:r.tone===`good`?40:15))&&!(!i&&t<this.busyUntil))return this.lastSpoken.set(e.code,t),this.busyUntil=t+3,this.say(r.text,i),r}return null}say(e,t){if(this.speak&&typeof speechSynthesis<`u`)try{t&&speechSynthesis.cancel();let n=new SpeechSynthesisUtterance(e);n.lang=`es-ES`,this.voice&&(n.voice=this.voice),n.rate=1.05,speechSynthesis.speak(n)}catch{}}greet(){this.say(t.GREETING,!1)}speakRaw(e){this.say(e,!1)}dispose(){this.speak&&typeof speechSynthesis<`u`&&speechSynthesis.cancel()}};e(wh,`GREETING`,`Hola, soy tu instructor. Ponte el cinturón, comprueba el punto muerto y arranca cuando quieras.`);function Th(e){let t=document.createElement(`canvas`);t.width=t.height=128,e(t.getContext(`2d`));let n=new _i(t);return n.colorSpace=Ze,n.anisotropy=4,n}var Eh=(e,t)=>{e.beginPath();for(let n=0;n<8;n++){let r=Math.PI/8+n*Math.PI/4;e.lineTo(64+t*Math.cos(r),64+t*Math.sin(r))}e.closePath()},Dh=(e,t)=>{e.beginPath(),e.moveTo(6+t,14+t*.6),e.lineTo(122-t,14+t*.6),e.lineTo(64,118-t*1.2),e.closePath()},Oh={stop:(e,t)=>{Eh(e,62),e.fillStyle=t?`#8a8f98`:`#ffffff`,e.fill(),t||(Eh(e,56),e.fillStyle=`#c8102e`,e.fill(),e.fillStyle=`#ffffff`,e.font=`bold 40px Helvetica, Arial, sans-serif`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(`STOP`,64,66))},ceda:(e,t)=>{Dh(e,0),e.fillStyle=t?`#8a8f98`:`#c8102e`,e.fill(),t||(Dh(e,16),e.fillStyle=`#ffffff`,e.fill())},limite:()=>void 0,escolar:(e,t)=>{if(e.beginPath(),e.moveTo(64,6),e.lineTo(124,116),e.lineTo(4,116),e.closePath(),e.fillStyle=t?`#8a8f98`:`#c8102e`,e.fill(),!t){e.beginPath(),e.moveTo(64,26),e.lineTo(110,108),e.lineTo(18,108),e.closePath(),e.fillStyle=`#ffffff`,e.fill(),e.fillStyle=`#111111`;for(let[t,n]of[[54,1],[76,.8]])e.beginPath(),e.arc(t,58+(1-n)*10,6*n,0,Math.PI*2),e.fill(),e.fillRect(t-5*n,66+(1-n)*10,10*n,18*n),e.fillRect(t-5*n,84+(1-n)*6,4*n,14*n),e.fillRect(t+1*n,84+(1-n)*6,4*n,14*n)}}};function kh(e){return(t,n)=>{t.beginPath(),t.arc(64,64,62,0,Math.PI*2),t.fillStyle=n?`#8a8f98`:`#c8102e`,t.fill(),n||(t.beginPath(),t.arc(64,64,50,0,Math.PI*2),t.fillStyle=`#ffffff`,t.fill(),t.fillStyle=`#111111`,t.font=`bold ${e>=100?44:54}px Helvetica, Arial, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(String(e),64,68))}}var Ah=[],jh=[],Mh=new J(16722458),Nh=new J(3803912),Ph=new J(16756768),Fh=new J(3811848),Ih=new J(2948970),Lh=new J(536602),Rh=class{constructor(t,n,r,i=null,a=null,o=null){e(this,`signals`,void 0),e(this,`group`,new wn),e(this,`disposables`,[]),e(this,`bodies`,void 0),e(this,`darks`,void 0),e(this,`brakes`,void 0),e(this,`blinkL`,void 0),e(this,`blinkR`,void 0),e(this,`pedBodies`,void 0),e(this,`pedHeads`,void 0),e(this,`lamps`,void 0),e(this,`carBlobs`,void 0),e(this,`pedBlobs`,void 0),e(this,`m`,new Yt),e(this,`q`,new Et),e(this,`p`,new K),e(this,`s`,new K(1,1,1)),e(this,`up`,new K(0,1,0)),e(this,`c`,new J),e(this,`parked`,Ru.map((e,t)=>({x:e.x,z:e.z,heading:e.heading,color:[9410206,11740702,15262675,1916810,4212303][t%5],braking:!1,blinker:null}))),this.signals=t;let s=e=>(o&&zd(e,o.lib.get(`metal`),o.globals,{space:`world`,tile:.8,albedo:1.15,detail:0}),e),c=e=>(this.disposables.push(e),e),l=e=>(this.disposables.push(e),e),u=new xi(1.76,.62,4.25);u.translate(0,.6,0);let d=new xi(1.6,.5,2.1);d.translate(0,1.15,-.3),n+=Ru.length,this.bodies=new li(c(bp([u,d])),l(new ro({color:16777215,metalness:.4,roughness:.38,envMap:i,envMapIntensity:1})),n),u.dispose(),d.dispose();let f=[],p=new xi(1.62,.42,2);p.translate(0,1.16,-.3),f.push(p);for(let[e,t]of[[.78,1.3],[-.78,1.3],[.78,-1.3],[-.78,-1.3]]){let n=new Si(.31,.31,.22,10);n.rotateZ(Math.PI/2),n.translate(e,.31,t),f.push(n)}this.darks=new li(c(bp(f)),l(new ao({color:1711911})),n),f.forEach(e=>e.dispose());let m=bp([.55,-.55].map(e=>new xi(.36,.14,.05).translate(e,.76,-2.15)));this.brakes=new li(c(m),l(new zr({color:16777215})),n);let h=e=>bp([2.15,-2.15].map(t=>new xi(.14,.1,.05).translate(e,.74,t)));this.blinkL=new li(c(h(.8)),l(new zr({color:16753178})),n),this.blinkR=new li(c(h(-.8)),l(new zr({color:16753178})),n);let g=l(new zr({color:0,alphaMap:a,transparent:!0,opacity:.55,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));this.carBlobs=new li(c(new Wa(2.5,5.1).rotateX(-Math.PI/2).translate(0,.04,0)),g,n),this.carBlobs.renderOrder=1;for(let e of[this.bodies,this.darks,this.brakes,this.blinkL,this.blinkR,this.carBlobs])e.frustumCulled=!1,e.instanceMatrix.setUsage(rt),this.group.add(e);let _=new Si(.2,.17,1.35,8);_.translate(0,.68,0),this.pedBodies=new li(c(_),l(new ao({color:16777215})),r);let v=new Ga(.13,10,8);v.translate(0,1.52,0),this.pedHeads=new li(c(v),l(new ao({color:14264191})),r),this.pedBlobs=new li(c(new Wa(.9,.9).rotateX(-Math.PI/2).translate(0,.03,0)),g,r),this.pedBlobs.renderOrder=1;for(let e of[this.pedBodies,this.pedHeads,this.pedBlobs])e.frustumCulled=!1,e.instanceMatrix.setUsage(rt),this.group.add(e);let y=t.lights,b=c(new Si(.07,.08,3.4,6).translate(0,1.7,0)),x=c(new xi(.34,.95,.24).translate(0,3,0)),S=new li(b,s(l(new ao({color:4541532}))),y.length),C=new li(x,l(new ao({color:1777188})),y.length);this.lamps=new li(c(new Ga(.1,10,8)),l(new zr({color:16777215})),y.length*3),y.forEach((e,t)=>{this.q.setFromAxisAngle(this.up,e.facing),this.m.compose(this.p.set(e.x,Hu(e.x,e.z)+.15,e.z),this.q,this.s.set(1,1,1)),S.setMatrixAt(t,this.m),C.setMatrixAt(t,this.m);for(let n=0;n<3;n++){let r=new K(0,3.3-n*.3,.13).applyQuaternion(this.q);this.m.compose(this.p.set(e.x+r.x,Hu(e.x,e.z)+.15+r.y,e.z+r.z),this.q,this.s),this.lamps.setMatrixAt(t*3+n,this.m),this.lamps.setColorAt(t*3+n,Nh)}}),this.group.add(S,C,this.lamps);let w=new Map;for(let e of t.signs){let t=e.kind===`limite`?`limite-${e.value}`:e.kind,n=w.get(t);n?n.push(e):w.set(t,[e])}let T=new li(c(new Si(.04,.04,2.1,6).translate(0,1.05,0)),s(l(new ao({color:10923449}))),t.signs.length),E=0,D=c(new Wa(.8,.8));for(let[e,t]of w){let n=e.startsWith(`limite-`)?kh(Number(e.slice(7))):Oh[e],r=Th(e=>n(e,!1)),i=Th(e=>n(e,!0));this.disposables.push(r,i);let a=new li(D,l(new ao({map:r,transparent:!0,alphaTest:.5})),t.length),o=new li(D,l(new ao({map:i,transparent:!0,alphaTest:.5})),t.length);t.forEach((e,t)=>{let n=Hu(e.x,e.z)+.15;this.q.setFromAxisAngle(this.up,e.facing),this.m.compose(this.p.set(e.x,n,e.z),this.q,this.s.set(1,1,1)),T.setMatrixAt(E++,this.m);let r=new K(0,2.15,.05).applyQuaternion(this.q);this.m.compose(this.p.set(e.x+r.x,n+r.y,e.z+r.z),this.q,this.s),a.setMatrixAt(t,this.m);let i=this.q.clone().multiply(new Et().setFromAxisAngle(this.up,Math.PI)),s=new K(0,2.15,.03).applyQuaternion(this.q);this.m.compose(this.p.set(e.x+s.x,n+s.y,e.z+s.z),i,this.s),o.setMatrixAt(t,this.m)}),this.group.add(a,o)}this.group.add(T);let O=[];for(let e of t.stopLines){let t=Math.hypot(e.b.x-e.a.x,e.b.z-e.a.z),n=(e.b.x-e.a.x)/t,r=(e.b.z-e.a.z)/t,i=-r*.2,a=n*.2,o=e.dashed?Array.from({length:Math.floor(t/.9)},(e,t)=>[t*.9,t*.9+.5]):[[0,t]];for(let[t,s]of o){let o={x:e.a.x+n*t,z:e.a.z+r*t},c={x:e.a.x+n*s,z:e.a.z+r*s},l=(e,t)=>Hu(e,t)+.035,u=[[o.x-i,o.z-a],[c.x-i,c.z-a],[c.x+i,c.z+a],[o.x+i,o.z+a]],d=(e,t,n)=>{for(let r of[e,t,n])O.push(u[r][0],l(u[r][0],u[r][1]),u[r][1])};(u[1][0]-u[0][0])*(u[2][1]-u[0][1])-(u[1][1]-u[0][1])*(u[2][0]-u[0][0])<0?(d(0,1,2),d(0,2,3)):(d(0,2,1),d(0,3,2))}}let k=c(new Dr);k.setAttribute(`position`,new hr(O,3)),k.computeVertexNormals();let A=new Zr(k,l(new ao({color:15921902,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})));A.renderOrder=1,this.group.add(A);let j=new J(16777215);for(let e of[this.bodies,this.brakes,this.pedBodies])for(let t=0;t<e.count;t++)e.setColorAt(t,j);for(let e of this.group.children)e instanceof li&&this.disposables.push(e)}update(e,t,n,r){let i=e?.enabled?e.cars:Ah,a=Math.min(i.length+this.parked.length,this.bodies.instanceMatrix.count),o=0,s=0;for(let e=0;e<a;e++){let t=e<i.length?i[e]:this.parked[e-i.length];this.q.setFromAxisAngle(this.up,t.heading),this.m.compose(this.p.set(t.x,Hu(t.x,t.z),t.z),this.q,this.s.set(1,1,1)),this.bodies.setMatrixAt(e,this.m),this.darks.setMatrixAt(e,this.m),this.brakes.setMatrixAt(e,this.m),this.carBlobs.setMatrixAt(e,this.m),this.bodies.setColorAt(e,this.c.setHex(t.color)),this.brakes.setColorAt(e,this.c.setHex(t.braking?16722458:4853005)),r&&t.blinker===`izquierda`&&this.blinkL.setMatrixAt(o++,this.m),r&&t.blinker===`derecha`&&this.blinkR.setMatrixAt(s++,this.m)}for(let e of[this.bodies,this.darks,this.brakes,this.carBlobs])e.count=a,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0);this.blinkL.count=o,this.blinkR.count=s,this.blinkL.instanceMatrix.needsUpdate=this.blinkR.instanceMatrix.needsUpdate=!0;let c=t?.peds??jh,l=Math.min(c.length,this.pedBodies.instanceMatrix.count);for(let e=0;e<l;e++){let t=c[e],n=t.state!==`wait`&&t.pauseT<=0?Math.abs(Math.sin(t.phase))*.05:0;this.q.setFromAxisAngle(this.up,t.heading),this.m.compose(this.p.set(t.x,t.y,t.z),this.q,this.s.set(1,1,1)),this.pedBlobs.setMatrixAt(e,this.m),this.m.compose(this.p.set(t.x,t.y+n,t.z),this.q,this.s),this.pedBodies.setMatrixAt(e,this.m),this.pedHeads.setMatrixAt(e,this.m),this.pedBodies.setColorAt(e,this.c.setHex(t.color))}for(let e of[this.pedBodies,this.pedHeads,this.pedBlobs])e.count=l,e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0);let u=this.signals.lights;for(let e=0;e<u.length;e++){let t=u[e],r=Gm(t.junctionId,t.axis,n);this.lamps.setColorAt(e*3,r===`rojo`?Mh:Nh),this.lamps.setColorAt(e*3+1,r===`ambar`?Ph:Fh),this.lamps.setColorAt(e*3+2,r===`verde`?Ih:Lh)}this.lamps.instanceColor&&(this.lamps.instanceColor.needsUpdate=!0)}dispose(){for(let e of this.disposables)e.dispose()}};function zh(){return{value:1,hold:0}}function Bh(e,t){e.value=1,e.hold=.3,t.clutch=Math.max(t.clutch,1)}function Vh(e,t,n,r,i){let a=Math.abs(t.v);if(e.hold>0)return e.hold-=i,e.value=1,e.value;if(t.gear===`N`||!t.engineOn)return e.value=Math.min(1,e.value+6*i),t.engineOn?0:e.value;if(a<2.2&&n<.05||r>.3&&t.rpm<Q.idleRpm*1.25)e.value=Math.min(1,e.value+6*i);else if(t.rpm<Q.idleRpm*1.1&&a<5)e.value=Math.min(1,e.value+1.5*i);else{let t=e.value<=Q.clutchBiteStart+.02;e.value=Math.max(0,e.value-(t?.9:3)*i)}return e.value}function Hh(){return{cool:0}}function Uh(e,t,n,r){if(e.cool=Math.max(0,e.cool-r),typeof t.gear!=`number`||!t.engineOn||e.cool>0)return null;let i=t.gear,a=Math.abs(t.v),o=i;return a<1.5&&i>1?o=1:t.rpm>2300+2400*n&&i<5&&!t.clutchSlipping?o=i+1:t.rpm<1150&&i>1&&(o=i-1),o===i?null:(e.cool=.9,o)}var Wh={"semaforo-rojo":{label:`Saltarse un semáforo en rojo`,sev:`eliminatoria`},"stop-sin-detenerse":{label:`No detenerse en un STOP`,sev:`eliminatoria`},"no-ceder-paso":{label:`No ceder el paso`,sev:`eliminatoria`},"no-ceder-peaton":{label:`No ceder el paso a un peatón`,sev:`eliminatoria`},atropello:{label:`Atropello`,sev:`eliminatoria`},"sentido-contrario":{label:`Circular en sentido contrario`,sev:`eliminatoria`},colision:{label:`Colisión`,sev:`deficiente`},"exceso-velocidad":{label:`Exceso de velocidad`,sev:`deficiente`},"giro-sin-intermitente":{label:`Girar sin señalizar`,sev:`deficiente`},"salida-rotonda-sin-intermitente":{label:`Salir de la rotonda sin señalizar`,sev:`deficiente`},"cambio-carril-sin-intermitente":{label:`Cambiar de carril sin señalizar`,sev:`deficiente`},"sin-cinturon":{label:`Circular sin cinturón`,sev:`deficiente`},"tunel-sin-luces":{label:`Túnel sin luces`,sev:`deficiente`},"subir-acera":{label:`Subirse a la acera`,sev:`deficiente`},"distancia-seguridad":{label:`No guardar la distancia de seguridad`,sev:`deficiente`},"incorporacion-lenta":{label:`Incorporación lenta a la autovía`,sev:`deficiente`},"freno-mano":{label:`Circular con el freno de mano`,sev:`leve`},calado:{label:`Calar el motor`,sev:`leve`},"consejo-subir-marcha":{label:`Uso inadecuado de las marchas`,sev:`leve`},"consejo-reducir-marcha":{label:`Uso inadecuado de las marchas`,sev:`leve`},"no-seguir-indicaciones":{label:`No seguir las indicaciones del examinador`,sev:`leve`},"no-retrovisor":{label:`No mirar por los retrovisores antes de maniobrar`,sev:`leve`},"mala-posicion":{label:`Posición incorrecta en la calzada`,sev:`leve`}},Gh={"semaforo-rojo":`Con el semáforo en rojo (o en ámbar si puedes parar con seguridad) hay que detenerse antes de la línea. Anticipa: si lleva tiempo en verde, prepárate para frenar.`,"stop-sin-detenerse":`En un STOP hay que parar por completo (velocidad cero) en la línea, aunque no venga nadie, y luego mirar y salir.`,"no-ceder-paso":`Si debes ceder el paso, reduce y entra solo cuando quien tiene prioridad no tenga que frenar ni cambiar de trayectoria por ti.`,"no-ceder-peaton":`Al acercarte a un paso de peatones, reduce y detente si alguien está cruzando o va a cruzar. Al girar, el peatón que cruza la vía tiene prioridad.`,atropello:`Velocidad adaptada y vista lejos: en zonas con peatones, circula preparado para detenerte.`,"sentido-contrario":`Circula siempre por tu carril. Antes de entrar en una calle, comprueba la señal de dirección prohibida o de sentido obligatorio.`,colision:`Mantén la distancia, controla la trayectoria en las curvas y reduce antes de los obstáculos.`,"exceso-velocidad":`Respeta el límite de cada tramo (fíjate en las señales al entrar en zona escolar, montaña o ciudad) y adapta además la velocidad a la vía y al tiempo.`,"giro-sin-intermitente":`Señaliza con antelación (unos 3 s antes) cualquier giro, aunque no veas a nadie.`,"salida-rotonda-sin-intermitente":`Antes de salir de la rotonda, pon el intermitente derecho al pasar la salida anterior a la tuya.`,"cambio-carril-sin-intermitente":`Para cambiar de carril: retrovisor, intermitente con antelación y, después, la maniobra suave.`,"sin-cinturon":`Abróchate el cinturón antes de iniciar la marcha.`,"tunel-sin-luces":`Enciende las luces de cruce antes de entrar en un túnel, también de día.`,"subir-acera":`Gira más tarde y con menos ángulo; en curvas cerradas, reduce antes.`,"distancia-seguridad":`Deja al menos 2 segundos con el vehículo de delante (más con lluvia o niebla).`,"incorporacion-lenta":`En el carril de aceleración, alcanza una velocidad parecida a la de la autovía antes de incorporarte, mirando y señalizando a la izquierda.`,"freno-mano":`Quita el freno de mano al iniciar la marcha; si el testigo sigue encendido, no avances.`,calado:`Suelta el embrague despacio en el punto de fricción y acompaña con algo de acelerador.`,"consejo-subir-marcha":`Sube de marcha hacia 2.000–2.500 rpm: el motor va forzado y gasta más.`,"consejo-reducir-marcha":`Reduce de marcha cuando el motor va por debajo de unas 1.200 rpm o al subir una pendiente.`,"no-seguir-indicaciones":`Escucha la indicación completa, colócate con antelación en el carril adecuado y, si no puedes seguirla con seguridad, continúa y espera la siguiente.`,"no-retrovisor":`Antes de girar, cambiar de carril, incorporarte o salir de la rotonda, mira el retrovisor (mueve la vista hacia el espejo) unos segundos antes de la maniobra.`,"mala-posicion":`En doble sentido, circula centrado en tu carril, sin pisar la línea del eje.`};function Kh(e){let t=Wh[e.code];return t?e.code===`exceso-velocidad`&&e.value!==void 0&&e.limit!==void 0&&e.value>e.limit*1.5?`eliminatoria`:e.code===`colision`&&e.value!==void 0?e.value>=10?`eliminatoria`:`deficiente`:e.code===`calado`&&e.value===1?`deficiente`:t.sev:null}function qh(e,t,n){let r=`Sin faltas que impidan el APTO.`,i=!0;return e>=1?(i=!1,r=`Una falta eliminatoria.`):t>=2?(i=!1,r=`Dos faltas deficientes.`):t===1&&n>=5?(i=!1,r=`Una falta deficiente y cinco leves.`):n>=10&&(i=!1,r=`Diez faltas leves.`),{passed:i,eliminatory:e,deficient:t,minor:n,reason:r}}var Jh=class{constructor(){e(this,`faults`,[]),e(this,`good`,new Map),e(this,`zone`,void 0)}add(e,t,n=!0){for(let r of e){if(r.kind===`bien`){this.good.set(r.code,(this.good.get(r.code)??0)+1);continue}let e=Kh(r);e&&(n||r.code!==`consejo-subir-marcha`&&r.code!==`consejo-reducir-marcha`)&&this.faults.push({code:r.code,label:Wh[r.code].label,sev:e,t,detail:r.detail,...this.zone?{zone:this.zone}:{}})}}count(e){return this.faults.filter(t=>t.sev===e).length}verdict(){return qh(this.count(`eliminatoria`),this.count(`deficiente`),this.count(`leve`))}score(){return Math.max(0,Math.round(100-40*this.count(`eliminatoria`)-15*this.count(`deficiente`)-4*this.count(`leve`)))}byLabel(){let e={};for(let t of this.faults)e[t.label]=(e[t.label]??0)+1;return e}};function Yh(e){let t=new Nn,n=[],r=new Ga(50,24,12),i=r.attributes.position,a=[],o=new J,s=new J(14411503),c=new J(5211856),l=new J(4869194);for(let e=0;e<i.count;e++){let t=i.getY(e)/50;t>=0?o.copy(s).lerp(c,t**.6):o.copy(s).lerp(l,Math.min(1,-t*6)),a.push(o.r,o.g,o.b)}r.setAttribute(`color`,new hr(a,3));let u=new zr({vertexColors:!0,side:1});t.add(new Zr(r,u));let d=new Ga(2.5,12,8),f=new zr({color:new J(6,5.6,5)}),p=new Zr(d,f);p.position.set(60,110,40).normalize().multiplyScalar(40),t.add(p);let m=new xi(1,1,1),h=new zr({color:9209984});for(let e=0;e<14;e++){let n=e/14*Math.PI*2,r=new Zr(m,h),i=6+e*37%10;r.scale.set(8+e%3*3,i,6),r.position.set(Math.cos(n)*30,i/2-1.5,Math.sin(n)*30),r.lookAt(0,r.position.y,0),t.add(r)}n.push(r,u,d,f,m,h);let g=new js(e),_=g.fromScene(t,.02,.1,100,{size:128});g.dispose();for(let e of n)e.dispose();return _}var Xh=[{id:`centro`,name:`Centro con semáforos`,desc:`Semáforos, pasos de peatones y calles de sentido único.`,roads:[`h1-1`,`h1-2`,`v1-1`,`v3-1`],junctions:[`j-120_-60`,`j0_-60`,`j120_-60`,`j-120_60`,`j120_60`]},{id:`residencial`,name:`Zona residencial (30)`,desc:`Calles de doble sentido limitadas a 30 km/h, STOP y ceda el paso.`,roads:[`h3-0`,`h3-1`,`h2-0`,`v0-1`,`v0-2`],junctions:[`j-240_60`,`j-240_180`,`j-120_180`,`j0_180`]},{id:`industrial`,name:`Polígono industrial`,desc:`Naves, calles anchas y acceso a la autovía.`,roads:[`h0-3`,`h1-3`,`v3-0`,`v4-0`],junctions:[`j120_-180`,`j240_-180`,`j240_-60`]},{id:`escolar`,name:`Zona escolar (20)`,desc:`Señal de niños, límite de 20 km/h y peatones.`,roads:[`h3-2`,`v3-2`,`v2-2`],junctions:[`j120_180`]},{id:`rotondas`,name:`Rotonda`,desc:`Entrar cediendo el paso y salir señalizando.`,roads:[`h2-1`,`h2-2`,`v2-1`],junctions:[`j0_60`]},{id:`autovia`,name:`Autovía con incorporaciones`,desc:`Carril de aceleración, incorporación, túnel y salida.`,roads:[`ramal-entrada`,`autovia`,`ramal-salida`],spawnRoads:[`ramal-entrada`]},{id:`montana`,name:`Tramo de montaña`,desc:`Curvas cerradas, pendiente y línea continua (40 km/h).`,roads:[ad],section:1,junctions:[`j-240_-180`]},{id:`convencional`,name:`Carretera convencional`,desc:`Doble sentido sin separación, arcén de tierra (70 km/h).`,roads:[ad],section:2,junctions:[`j-120_-180`]}],Zh=e=>Xh.find(t=>t.id===e);function Qh(e,t){if(t.junction)return Xh.find(e=>e.junctions?.includes(t.junction.id))?.id??null;let n=t.road;if(!n)return null;for(let e of Xh)if(e.roads.includes(n.id)){if(e.section!==void 0){let r=n.sections?.[e.section];if(e.id===`montana`&&r&&(t.s<r.from||t.s>=r.to))continue}return e.id}return null}function $h(e,t=.15){let n=Q.length/2+t,r=Q.width/2+t,i=Math.sin(e.heading),a=Math.cos(e.heading),o=-a,s=i;return[[1,1],[1,-1],[-1,-1],[-1,1]].map(([t,c])=>({x:e.x+i*n*t+o*r*c,z:e.z+a*n*t+s*r*c}))}function eg(e,t,n){let r=e.query(n.x,n.z);if(r.surface!==`calzada`||r.junction||r.road?.id!==n.road)return!1;let i=r.road,a=i.lanes[n.lane];if(Math.cos(n.heading-r.heading)*a.dir<.9||!i.oneWay&&Math.sign(r.lateral)!==a.dir)return!1;for(let t of $h(n)){let r=e.query(t.x,t.z);if(r.surface!==`calzada`&&r.surface!==`arcen`||r.road&&r.road.id!==n.road&&!r.junction)return!1;for(let n of e.obstaclesNear(t.x,t.z))if(t.x>n.minX-.2&&t.x<n.maxX+.2&&t.z>n.minZ-.2&&t.z<n.maxZ+.2)return!1;for(let e of Ru)if(Math.hypot(e.x-t.x,e.z-t.z)<3)return!1}for(let t of e.junctions){let e=t.kind===`rotonda`?ku.rOut:7;if(Math.hypot(t.x-n.x,t.z-n.z)<e+14)return!1}for(let e of t.crosswalks)if(Math.hypot(e.center.x-n.x,e.center.z-n.z)<10)return!1;return!0}var tg=new Map;function ng(e,t,n){let r=tg.get(n);if(r)return r;let i=Zh(n),a=[];for(let r of i.spawnRoads??i.roads){let o=e.roads.find(e=>e.id===r);if(!o||o.closed)continue;let s=vd(o.pts),c=i.section===void 0?void 0:o.sections?.[i.section];o.lanes.forEach((r,i)=>{let l=o.kind===`ramal`?Math.min(140,s-20):s-20;for(let u=16;u<=l;u+=7){let l=r.dir===1?u:s-u;if(c&&(l<c.from+10||l>c.to-10))continue;let d={...e.roadPose(o.id,u,i),zone:n,road:o.id,lane:i,s:u};eg(e,t,d)&&a.push(d)}})}return tg.set(n,a),a}var rg={despejado:`Despejado`,nublado:`Nublado`,lluvia:`Lluvia`,niebla:`Niebla`};function ig(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var ag=999999,og=(e=Math.random)=>1+Math.floor(e()*ag),sg=[[`despejado`,.45],[`nublado`,.25],[`lluvia`,.18],[`niebla`,.12]];function cg(e){return Xh[Math.floor(ig(e)()*Xh.length)].id}function lg(e,t,n,r){let i=ig(n),a=Xh[Math.floor(i()*Xh.length)].id,o=r??a,s=ng(e,t,o),c=s[Math.floor(i()*s.length)],l=i(),u=`despejado`;for(let[e,t]of sg){if(l<t){u=e;break}l-=t}let d=1+Math.floor(i()*9973),f=3+Math.floor(i()*7919),p=Xh.map(e=>e.id).filter(e=>e!==o);for(let e=p.length-1;e>0;e--){let t=Math.floor(i()*(e+1));[p[e],p[t]]=[p[t],p[e]]}return{seed:n,zone:o,manualZone:r!==void 0,spawn:c,weather:u,trafficSeed:d,pedSeed:f,route:p}}function ug(e,t,n,r=Math.random){let i=new Set(n.length>=Xh.length?[]:n),a=og(r);for(let e=0;e<400&&i.has(cg(a));e++)a=og(r);return lg(e,t,a)}var dg=`driving-academy.zonas-recientes`,fg=2;function pg(){try{let e=localStorage.getItem(dg),t=e?JSON.parse(e):[],n=new Set(Xh.map(e=>e.id));return Array.isArray(t)?t.filter(e=>typeof e==`string`&&n.has(e)).slice(0,fg):[]}catch{return[]}}function mg(e){try{let t=[e,...pg().filter(t=>t!==e)].slice(0,fg);localStorage.setItem(dg,JSON.stringify(t))}catch{}}var hg=1/120,gg=2,_g={despejado:{sun:2.9,hemi:1.45,fogNear:1/0,fogFar:1/0,color:14411503,tint:16777215,wet:0},nublado:{sun:1.3,hemi:1.75,fogNear:180,fogFar:600,color:12897234,tint:12765390,wet:0},lluvia:{sun:.9,hemi:1.55,fogNear:60,fogFar:330,color:11121338,tint:10134443,wet:1},niebla:{sun:.8,hemi:1.6,fogNear:8,fogFar:140,color:13093839,tint:13093839,wet:.4}},vg={cars:48,highway:12,peds:54},yg={alto:1,medio:.75,bajo:.5},bg={arrancado:[`Motor en marcha.`,`info`],"motor-apagado":[`Motor apagado.`,`info`],"arranque-sin-embrague":[`Para arrancar con una marcha metida, pisa el embrague a fondo.`,`warn`],"cambio-sin-embrague":[`Pisa el embrague a fondo para cambiar de marcha.`,`warn`],"marcha-atras-en-movimiento":[`Detén el vehículo antes de engranar esa marcha.`,`warn`],"sin-combustible":[`Sin combustible.`,`bad`]},xg=class t{constructor(t,n,r,i,a={},o=`centro`,s=null,c=null){e(this,`container`,void 0),e(this,`lib`,void 0),e(this,`cb`,void 0),e(this,`session`,void 0),e(this,`map`,void 0),e(this,`input`,void 0),e(this,`renderer`,void 0),e(this,`scene`,new Nn),e(this,`camera`,void 0),e(this,`world`,void 0),e(this,`car`,void 0),e(this,`mirrors`,void 0),e(this,`sound`,void 0),e(this,`sun`,void 0),e(this,`vehicle`,void 0),e(this,`cameraMode`,void 0),e(this,`chase`,new K),e(this,`chaseInit`,!1),e(this,`raf`,0),e(this,`last`,0),e(this,`acc`,0),e(this,`paused`,!0),e(this,`started`,!1),e(this,`messages`,[]),e(this,`msgId`,0),e(this,`clock`,0),e(this,`fps`,0),e(this,`fpsFrames`,0),e(this,`fpsStart`,0),e(this,`showFps`,!1),e(this,`aq`,void 0),e(this,`level`,void 0),e(this,`shadowsAllowed`,void 0),e(this,`envRT`,void 0),e(this,`blobTex`,void 0),e(this,`drawCalls`,0),e(this,`prepTimer`,0),e(this,`frameDt`,1/60),e(this,`shake`,{pitch:0,y:0,lastY:0,t:0,dark:0}),e(this,`frameN`,0),e(this,`tmpDir`,new K),e(this,`tmpTarget`,new K),e(this,`road`,{name:``,limit:null,surface:`fuera`}),e(this,`pending`,{meters:0,seconds:0}),e(this,`lastOdo`,0),e(this,`hbWarnAt`,0),e(this,`resizeObs`,void 0),e(this,`disposed`,!1),e(this,`signals`,void 0),e(this,`traffic`,void 0),e(this,`peds`,void 0),e(this,`monitor`,void 0),e(this,`instructor`,void 0),e(this,`trafficRender`,void 0),e(this,`worldT`,0),e(this,`pedsOn`,!0),e(this,`contacts`,0),e(this,`slowCar`,null),e(this,`forcedCrossing`,null),e(this,`freeEval`,new Jh),e(this,`assist`,zh()),e(this,`assistOn`,!1),e(this,`automatic`,!1),e(this,`autoBox`,Hh()),e(this,`stall`,kp.normal),e(this,`jolt`,0),e(this,`slowAcc`,0),e(this,`external`,[]),e(this,`ruleLog`,[]),e(this,`hemi`,void 0),e(this,`weather`,`despejado`),e(this,`scenario`,null),e(this,`zoneNow`,null),e(this,`mirrorGlanceT`,-99),e(this,`examinerVoice`,null),e(this,`pbrG`,void 0),e(this,`texStep`,0),e(this,`onVisibility`,()=>{document.hidden&&(this.setPaused(!0),this.flushStats())}),e(this,`frame`,e=>{if(this.disposed)return;this.raf=requestAnimationFrame(this.frame);let t=(e-(this.last||e))/1e3,n=Math.min(.05,t);this.frameDt=n,this.last=e,this.measure(e,t);for(let e of this.input.drain())this.handle(e);if(!this.paused){this.acc+=n;let e=0;for(;this.acc>=hg&&e++<12;)this.fixed(hg),this.acc-=hg;this.clock+=n,this.pending.seconds+=n;let t=this.vehicle.odometerM;this.pending.meters+=t-this.lastOdo,this.lastOdo=t,this.pending.seconds>15&&this.flushStats()}this.messages=this.messages.filter(e=>e.until>this.clock),this.sound.update(this.vehicle.rpm,this.vehicle.throttle,this.vehicle.engineOn&&!this.paused),this.render()}),e(this,`lastContactT`,-1),e(this,`flushStats`,()=>{(this.pending.meters>0||this.pending.seconds>0)&&this.cb.onDriveStats?.(this.pending.meters,this.pending.seconds),this.pending={meters:0,seconds:0}}),this.container=n,this.lib=i,this.cb=a,this.session=s,this.map=wd();let l=r.quality,u=l===`alta`?`alto`:l===`baja`?`bajo`:`medio`;this.level=u,this.aq=new Kf(window.devicePixelRatio,u),this.renderer=new bu({canvas:t,antialias:l!==`baja`,powerPreference:`high-performance`}),this.renderer.setPixelRatio(this.aq.ratio),this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Ze,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.shadowsAllowed=r.shadows,this.renderer.shadowMap.enabled=r.shadows,this.renderer.shadowMap.type=1,this.renderer.shadowMap.autoUpdate=!1;let d=Vf[u],f=new J(14411503);this.scene.background=f,this.scene.fog=new Mn(f,d.far*.3,d.far*.98),this.camera=new Ho(70,1,.1,d.far),this.camera.layers.enable(1),this.hemi=new Ao(14083839,6971728,1.45),this.scene.add(this.hemi),this.sun=new Go(16772300,2.9),this.sun.castShadow=this.shadowsAllowed&&d.shadowMap>0,this.sun.shadow.mapSize.set(d.shadowMap||512,d.shadowMap||512);let p=this.sun.shadow.camera;p.left=p.bottom=-6.5,p.right=p.top=6.5;let m=Of.length();p.near=m-20,p.far=m+20,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.02,this.scene.add(this.sun,this.sun.target),this.pbrG=Id(i.detail),this.world=yp(this.map,u,i,this.pbrG,l===`baja`),this.scene.add(this.world.group),this.envRT=Yh(this.renderer),this.world.setEnvMap(this.envRT.texture),this.blobTex=Nd(),this.car=$p(this.shadowsAllowed,this.envRT.texture,this.blobTex,{lib:i,globals:this.pbrG}),this.scene.add(this.car.root),this.mirrors=new tm(l),this.mirrors.attachSurfaces(this.car.mirrorSurfaces),this.sound=new vm(r.sound,r.volume),this.input=new _m(t),this.cameraMode=r.defaultCamera,this.vehicle=Cm(),this.automatic=r.transmission===`automatica`,this.stall=kp[r.stallDifficulty]??kp.normal,this.signals=Hm(this.map);let h=nh(this.map,this.signals),g={map:this.map,signals:this.signals,graph:h};this.scenario=c,c&&s?.setScenario&&s.setScenario(c);let _=s?s.setup.pose(g):c?c.spawn:this.map.spawns.find(e=>e.id===o)??this.map.spawns[0],v=[vg.cars-vg.highway,vg.highway,vg.peds];this.traffic=new ch(h,this.signals,{city:v[0],highway:v[1],seed:c?.trafficSeed??Date.now()%9973+1,avoid:_}),this.peds=new hh(this.signals,v[2],c?.pedSeed??Date.now()%7919+3),s?.kind===`examen`&&r.sound&&(this.examinerVoice=new wh(!0)),this.monitor=new bh(this.signals),this.instructor=new wh(r.instructorVoice),this.instructor.enabled=r.instructorText,this.trafficRender=new Rh(this.signals,v[0]+v[1],v[2],this.envRT.texture,this.blobTex,{lib:i,globals:this.pbrG}),this.scene.add(this.trafficRender.group),s?this.applySetup(s.setup,_):c?this.teleportPose(_):this.teleport(o),this.applyWeather(c?.weather??`despejado`),this.applyLevel(u),i.upload(this.renderer),this.precompile(),this.resizeObs=new ResizeObserver(()=>this.resize()),this.resizeObs.observe(n),this.resize(),document.addEventListener(`visibilitychange`,this.onVisibility),window.addEventListener(`pagehide`,this.flushStats),s?this.say(s.kind===`examen`?`Examen práctico: el examinador te dará las indicaciones.`:`Lección: ${s.title}. Mira los objetivos a la derecha.`,`info`,8):this.instructor.enabled?this.instructorSay(wh.GREETING,`info`,9):this.say(`Pon el cinturón (B), comprueba punto muerto y gira la llave (I) para arrancar.`,`info`,9),this.raf=requestAnimationFrame(this.frame)}begin(){this.started=!0,this.sound.unlock(),this.instructor.enabled&&!this.session&&this.instructor.greet(),this.setPaused(!1)}setPaused(e){!this.started&&!e&&(this.started=!0),this.paused!==e&&(this.paused=e,e?this.sound.suspend():(this.sound.resume(),this.last=performance.now()),this.cb.onPauseChange?.(e))}isPaused(){return this.paused}resize(){let e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.mirrors.layout(e,t)}measure(e,t){if(!this.fpsStart||t>.25){this.fpsStart=e,this.fpsFrames=0;return}this.fpsFrames++;let n=e-this.fpsStart;if(n>=1e3){this.fps=Math.round(this.fpsFrames*1e3/n),this.fpsStart=e,this.fpsFrames=0;let t=this.aq.sample(this.fps,e/1e3);t&&this.applyQuality(t)}}applyQuality(e){e.level&&e.level!==this.level&&this.applyLevel(e.level),e.tex!==void 0&&this.applyTexStep(e.tex),e.ratio!==void 0&&(this.renderer.setPixelRatio(e.ratio),this.resize())}applyTexStep(e){this.texStep=e,this.world.setTexDegrade(+(e>=1)),this.lib.setAnisotropy(this.renderer,e>=1?2:this.level===`alto`?8:4),this.pbrG.uDetailK.value=e>=2?0:1}applyLevel(e){this.level=e;let t=Vf[e];this.camera.far=t.far,this.camera.updateProjectionMatrix(),this.applyFog();let n=this.shadowsAllowed&&t.shadowMap>0;this.sun.castShadow=n,n&&this.sun.shadow.mapSize.x!==t.shadowMap&&(this.sun.shadow.mapSize.set(t.shadowMap,t.shadowMap),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.car.setBlob(!n),this.world.setLevel(e),this.texStep===0&&this.lib.setAnisotropy(this.renderer,e===`alto`?8:4),this.mirrors.setRefreshEvery(t.mirrorEvery),this.mirrors.setLevelEnabled(e!==`bajo`),this.mirrors.setFar(Math.min(220,t.far)),this.applyDensity()}applyFog(){let e=Vf[this.level],t=_g[this.weather],n=this.scene.fog;n.near=Math.min(e.far*.3,t.fogNear),n.far=Math.min(e.far*.98,t.fogFar)}applyWeather(e){this.weather=e;let t=_g[e];this.sun.intensity=t.sun,this.hemi.intensity=t.hemi,this.scene.background.setHex(t.color),this.scene.fog.color.setHex(t.color),this.world.setWeather(t.tint,t.wet),this.applyFog()}applyDensity(){let e=yg[this.level]*(this.session?.kind===`examen`?.7:1),t=this.vehicle;this.traffic.setActive(vg.cars*e,t?{x:t.x,z:t.z}:null),this.peds.setActive(vg.peds*e)}setScenario(e){if(this.started)return;this.scenario=e;let t=this.traffic.graph,n=this.traffic.enabled;if(this.traffic=new ch(t,this.signals,{city:vg.cars-vg.highway,highway:vg.highway,seed:e.trafficSeed,avoid:e.spawn}),this.traffic.enabled=n,this.peds=new hh(this.signals,vg.peds,e.pedSeed),this.session?.setScenario){this.session.setScenario(e);let n={map:this.map,signals:this.signals,graph:t};this.applySetup(this.session.setup,this.session.setup.pose(n))}else this.teleportPose(e.spawn);this.applyWeather(e.weather),this.applyDensity()}scenarioFor(e,t){return lg(this.map,this.signals,e,t)}precompile(){if(!this.shadowsAllowed){this.renderer.compile(this.scene,this.camera);return}let e=this.sun.castShadow;for(let e of[!0,!1])this.sun.castShadow=e,this.renderer.compile(this.scene,this.camera);this.sun.castShadow=e}fixed(e){let t=this.vehicle,n={...this.input.sample(e)};if(this.automatic){let r=Uh(this.autoBox,t,n.throttle,e);r!==null&&(Bh(this.assist,t),km(t,r)),n.clutch=Vh(this.assist,t,n.throttle,n.brake,e)}else this.assistOn&&(n.clutch=Math.max(n.clutch,Vh(this.assist,t,n.throttle,n.brake,e)));let r=Q.wheelbase/2,i=t.x+Math.sin(t.heading)*r,a=t.z+Math.cos(t.heading)*r,o=t.x-Math.sin(t.heading)*r,s=t.z-Math.cos(t.heading)*r,c=this.map.query(t.x,t.z),l=c.surface===`fuera`||c.surface===`isleta`||c.surface===`mediana`,u=c.surface===`acera`||c.surface===`isleta`?.15:0,d=Hu(i,a),f=Hu(o,s),p=(d-f)/Q.wheelbase,m=e/gg;for(let e=0;e<gg;e++)for(let e of Dm(t,n,{grade:p,offroad:l,stallRpm:this.stall.rpm,idleAssist:this.stall.assist,noStall:this.automatic},m))this.onVehicleEvent(e);if(t.pitch=Math.atan(p),t.y+=((d+f)/2+u-t.y)*Math.min(1,e*12),this.road={name:c.area===`maniobras`?`Zona de maniobras`:c.road?.name??(c.junction?c.junction.kind===`rotonda`?`Glorieta de la Constitución`:`Intersección`:`Fuera de la vía`),limit:c.surface===`fuera`?null:c.limit,surface:c.surface},this.collide(),this.worldT+=e,this.slowAcc+=e,this.slowAcc>=1/30){let e=this.slowAcc;this.slowAcc=0,this.stepWorld(e)}!this.instructor.enabled&&t.handbrake&&Math.abs(t.v)>2&&this.clock>this.hbWarnAt&&(this.hbWarnAt=this.clock+6,this.say(`Llevas el freno de mano puesto (Espacio para quitarlo).`,`warn`))}playerView(){let e=this.vehicle;return{x:e.x,z:e.z,heading:e.heading,v:Math.abs(e.v)}}stepWorld(e){let t=this.vehicle,n=this.playerView(),r=this.signals.crosswalks;if(this.pedsOn){let t=this.traffic.enabled?[...this.traffic.cars,n]:[n];this.peds.step(e,{vehicleApproaching:e=>gh(r.find(t=>t.id===e),t)})}if(this.traffic.enabled&&this.traffic.step(e,{t:this.worldT,player:n,crosswalkBusy:e=>this.pedsOn&&this.peds.busy(e)}),this.forcedCrossing&&!this.forcedCrossing.done){let e=this.forcedCrossing.cw;Math.hypot(e.center.x-t.x,e.center.z-t.z)<42&&(this.peds.forceCrossing(e),this.forcedCrossing.done=!0)}let i=this.map.query(t.x,t.z),a=Qh(this.map,i);a&&(this.zoneNow=a);let o=this.cameraMode===`primera`;o&&(Math.abs(this.input.look.yaw)>.3||this.input.look.pitch>.1)&&(this.mirrorGlanceT=this.worldT),this.session&&(this.session.evaluator.zone=this.zoneNow?Zh(this.zoneNow).name:void 0);let s=this.monitor.step({t:this.worldT,dt:e,v:t,info:i,light:e=>Gm(e.junction.id,e.axis,this.worldT),clearToEnter:this.traffic.enabled?e=>this.traffic.clearToEnter(e,null):null,leader:this.traffic.enabled?this.traffic.leaderOf(n):null,crosswalkBusy:e=>this.pedsOn&&this.peds.busy(e),external:this.external.splice(0),mirrorGlanceT:o?this.mirrorGlanceT:void 0});for(let e of s)this.ruleLog.push({...e,t:this.worldT}),this.ruleLog.length>200&&this.ruleLog.shift();if(this.session||this.freeEval.add(s,this.worldT,!1),!this.session)for(let e of s){if(e.kind!==`falta`||e.code===`calado`||e.code===`colision`)continue;let t=Kh(e);t&&this.say(`Infracción ${t}: ${Wh[e.code].label}${e.detail?` (${e.detail})`:``}`,`bad`,5)}if(!this.session||this.session.coaching){let e=this.instructor.handle(s.filter(e=>e.code!==`calado`&&e.code!==`colision`&&(this.session||e.kind!==`falta`)),this.worldT);e&&this.instructorSay(e.text,e.tone===`good`?`good`:e.tone,6)}if(this.session){let n=this.session.step({t:this.worldT,dt:e,v:t,info:i,events:s,contacts:this.contacts,monitor:this.monitor,slowCar:this.slowCar?{x:this.slowCar.x,z:this.slowCar.z,heading:this.slowCar.heading}:null});for(let e of n){let t=this.session.kind===`examen`,n=t?e.replace(/^Examinador: /,``):e,r=n.charAt(0).toUpperCase()+n.slice(1);this.say(r,e.startsWith(`✓`)?`good`:e.startsWith(`Objetivo no`)?`bad`:`info`,7);let i=this.messages.find(e=>e.text===r);i&&(t||!e.startsWith(`✓`))&&(i.who=t?`examinador`:`instructor`),t&&(this.examinerVoice??(this.instructor.enabled?this.instructor:null))?.speakRaw(r)}}}applySetup(e,t){this.teleportPose(t);let n=this.vehicle;n.belt=e.belt??!1,n.handbrake=e.handbrake??!0,n.lights=e.lights??`apagadas`,n.gear=e.gear??`N`,n.engineOn=e.engineOn??!1,n.v=(e.speedKmh??0)/3.6;let r=Ep(n.gear);if(n.rpm=n.engineOn?Math.max(850,Math.abs(n.v*r/.31)*Op):0,this.traffic.enabled=e.traffic,e.slowCar){let n=this.traffic.graph.get(e.slowCar.laneId),r=0;n.pts.forEach((e,i)=>{Math.hypot(e.x-t.x,e.z-t.z)<Math.hypot(n.pts[r].x-t.x,n.pts[r].z-t.z)&&(r=i)}),this.traffic.clearAround(t.x,t.z,e.slowCar.aheadM+60),this.slowCar=this.traffic.spawnAt(n.id,(n.cum[r]+e.slowCar.aheadM)%n.length,e.slowCar.kmh)}if(e.forceCrossing){let e=Math.sin(t.heading),n=Math.cos(t.heading),r=null;for(let i of this.signals.crosswalks){let a=i.center.x-t.x,o=i.center.z-t.z,s=a*e+o*n,c=Math.abs(-a*n+o*e);s>20&&c<3&&(!r||s<r.d)&&(r={cw:i,d:s})}r&&(this.forcedCrossing={cw:r.cw,done:!1})}}instructorSay(e,t,n){this.say(e,t,n);let r=this.messages.find(t=>t.text===e);r&&(r.who=`instructor`)}collide(){let e=this.vehicle,t=Math.sin(e.heading),n=Math.cos(e.heading),r=Q.width/2,i=0;for(let a of[-1.45,0,1.45]){let o=e.x+t*a,s=e.z+n*a;for(let a of this.map.obstaclesNear(o,s)){if(o<a.minX-r||o>a.maxX+r||s<a.minZ-r||s>a.maxZ+r)continue;let c=a.obb?Su(a.obb,o,s):{x:Math.max(a.minX,Math.min(o,a.maxX)),z:Math.max(a.minZ,Math.min(s,a.maxZ))},l=o-c.x,u=s-c.z,d=Math.hypot(l,u);if(d>=r)continue;let f=l,p=u,m=r-d;if(d<1e-4){if(a.obb){let e=a.obb,t=(o-e.cx)*e.ux+(s-e.cz)*e.uz,n=-(o-e.cx)*e.uz+(s-e.cz)*e.ux;e.hu-Math.abs(t)<e.hv-Math.abs(n)?(f=e.ux*Math.sign(t||1),p=e.uz*Math.sign(t||1),m=e.hu-Math.abs(t)+r):(f=-e.uz*Math.sign(n||1),p=e.ux*Math.sign(n||1),m=e.hv-Math.abs(n)+r)}else{let e=[[o-a.minX,-1,0],[a.maxX-o,1,0],[s-a.minZ,0,-1],[a.maxZ-s,0,1]].reduce((e,t)=>t[0]<e[0]?t:e);f=e[1],p=e[2],m=e[0]+r}}else f/=d,p/=d;e.x+=f*m,e.z+=p*m,this.contact();let h=(t*f+n*p)*e.v;h<0&&(i=Math.max(i,-h))}}let a=this.map.query(e.x,e.z);if(a.road?.median&&Math.abs(a.lateral)<a.road.median/2+r){let o=a.lateral>=0?1:-1,s=a.road.median/2+r-Math.abs(a.lateral),c=-Math.cos(a.heading),l=Math.sin(a.heading);e.x+=c*o*s,e.z+=l*o*s;let u=-(t*c+n*l)*o*e.v;u>0&&(i=Math.max(i,u))}if(this.traffic.enabled){for(let a of this.traffic.cars){if(Math.abs(a.x-e.x)>8||Math.abs(a.z-e.z)>8)continue;let o=Math.sin(a.heading),s=Math.cos(a.heading);for(let c of[-1.45,0,1.45])for(let l of[-1.45,0,1.45]){let u=e.x+t*c,d=e.z+n*c,f=a.x+o*l,p=a.z+s*l,m=u-f,h=d-p,g=Math.hypot(m,h);if(g>=r*2||g<1e-4)continue;let _=r*2-g;e.x+=m/g*_,e.z+=h/g*_,this.contact();let v=(t*e.v-o*a.v)*(m/g)+(n*e.v-s*a.v)*(h/g);v<0&&(i=Math.max(i,-v)),a.v=0}}for(let i of this.peds.peds)if(!(Math.abs(i.x-e.x)>4||Math.abs(i.z-e.z)>4))for(let a of[-1.45,0,1.45]){let o=e.x+t*a,s=e.z+n*a;Math.hypot(o-i.x,s-i.z)<r+.35&&(Math.abs(e.v)>.6&&i.pauseT<=0&&(this.external.push(`atropello`),this.say(`¡Has atropellado a un peatón!`,`bad`,6)),this.peds.startle(i,4),e.v=0)}}for(let a of Ru){if(Math.abs(a.x-e.x)>7||Math.abs(a.z-e.z)>7)continue;let o=Math.sin(a.heading),s=Math.cos(a.heading);for(let c of[-1.45,0,1.45])for(let l of[-1.45,0,1.45]){let u=e.x+t*c,d=e.z+n*c,f=a.x+o*l,p=a.z+s*l,m=u-f,h=d-p,g=Math.hypot(m,h);if(g>=r*2||g<1e-4)continue;e.x+=m/g*(r*2-g),e.z+=h/g*(r*2-g),this.contact();let _=t*e.v*(m/g)+n*e.v*(h/g);_<0&&(i=Math.max(i,-_))}}(Math.abs(e.x)>795||Math.abs(e.z)>795)&&(e.x=Math.max(-795,Math.min(795,e.x)),e.z=Math.max(-795,Math.min(795,e.z)),i=Math.max(i,Math.abs(e.v))),i>.3&&(e.v*=-.15,i>1&&(this.say(`Colisión a ${Math.round(i*3.6)} km/h.`,`bad`),this.external.push({code:`colision`,kmh:i*3.6})))}onVehicleEvent(e){if(e===`calado`){let e=Ap[this.vehicle.stallCause??`poco-gas`];this.external.push({code:`calado`,cause:e,crossing:this.stalledAtBusyJunction()}),this.say(`Se ha calado el motor: ${e}. Pisa el embrague a fondo y arranca de nuevo (I).`,`bad`,7),this.car.kick(.5),this.jolt=1,this.sound.stall();try{navigator.vibrate?.(180)}catch{}}let t=bg[e];t&&this.say(t[0],t[1])}handle(e){let t=this.vehicle;if(e.type===`pause`)return this.setPaused(!this.paused);if(e.type===`fps`)this.showFps=!this.showFps;else if(!this.paused)switch(e.type){case`gear`:case`gearUp`:case`gearDown`:{let n=e.type===`gear`?e.gear:t.gear;if(e.type!==`gear`){let r=[`R`,`N`,1,2,3,4,5],i=r.indexOf(t.gear)+(e.type===`gearUp`?1:-1);n=r[Math.max(0,Math.min(r.length-1,i))]}if(this.automatic){if(e.type!==`gear`){let r=[`R`,`N`,1],i=(typeof t.gear==`number`?2:r.indexOf(t.gear))+(e.type===`gearUp`?1:-1);n=r[Math.max(0,Math.min(2,i))]}typeof n==`number`&&(n=typeof t.gear==`number`?t.gear:1)}(this.assistOn||this.automatic)&&n!==t.gear&&Bh(this.assist,t);let r=km(t,n);r&&r!==`cambio`&&this.onVehicleEvent(r);break}case`ignition`:this.onVehicleEvent(Am(t));break;case`handbrake`:t.handbrake=!t.handbrake;break;case`blinker`:jm(t,e.side);break;case`lights`:Nm(t),this.say(`Luces: ${t.lights===`posicion`?`de posición`:t.lights}.`,`info`,2);break;case`belt`:t.belt=!t.belt,this.say(t.belt?`Cinturón abrochado.`:`Cinturón desabrochado.`,t.belt?`info`:`warn`,2);break;case`camera`:this.setCamera(this.cameraMode===`primera`?`tercera`:`primera`);break;case`mirrors`:this.mirrors.enabled=!this.mirrors.enabled}}stalledAtBusyJunction(){if(!this.traffic.enabled)return!1;let e=this.vehicle,t=this.map.query(e.x,e.z),n=this.monitor.approachArm;if(!t.junction&&!(n&&n.dist<10))return!1;for(let t of this.traffic.cars){if(t.v<1.5)continue;let n=e.x-t.x,r=e.z-t.z,i=Math.hypot(n,r);if(!(i>45||i<.1)&&(Math.sin(t.heading)*n+Math.cos(t.heading)*r)/i>.6)return!0}return!1}setClutchAssist(e){this.assistOn=e,this.assist=zh()}setTrafficEnabled(e){this.traffic.enabled=e,this.pedsOn=e}contact(){this.clock-this.lastContactT>.5&&this.contacts++,this.lastContactT=this.clock}setInstructorEnabled(e){this.instructor.enabled=e}setCamera(e){this.cameraMode=e,this.chaseInit=!1}teleport(e){let t=this.map.spawns.find(t=>t.id===e)??this.map.spawns[0];this.teleportPose(t)}teleportPose(e){let t=this.vehicle,n=Cm(e.x,e.z,e.heading);n.belt=t.belt,n.lights=t.lights,n.fuelL=t.fuelL,n.odometerM=t.odometerM,n.y=Hu(e.x,e.z),this.vehicle=n,this.lastOdo=n.odometerM,this.traffic?.clearAround(e.x,e.z,40),this.signals&&(this.monitor=new bh(this.signals)),this.chaseInit=!1,this.input.look.yaw=0,this.input.look.pitch=0}say(e,t=`info`,n=4.5){let r=this.messages.find(t=>t.text===e);r?r.until=this.clock+n:this.messages=[...this.messages.slice(-2),{id:++this.msgId,text:e,kind:t,until:this.clock+n}]}render(){let e=this.vehicle,n=Math.floor(this.clock*3)%2==0,r=this.frameDt,i=e.x>ju.x0&&e.x<ju.x1&&Math.abs(e.z-ju.z)<ju.halfWidth;this.shake.dark+=(+!!i-this.shake.dark)*Math.min(1,r*3),this.car.setDarkness(this.shake.dark),this.jolt=Math.max(Math.max(0,this.jolt-r*2.2),e.jerk*.7);let a=this.paused?0:Math.min(1,e.lug+this.jolt);this.car.setVibration(a),this.input.vibration=a,this.car.update(e,n,this.paused?.001:r),this.trafficRender.update(this.traffic,this.traffic.enabled?this.peds:null,this.worldT,n),this.car.root.updateMatrixWorld();let o=this.cameraMode===`primera`;this.car.setInteriorVisible(o),this.mirrors.setInterior(o);let s=this.camera,c=this.input.look;if(o){let t=this.shake,n=Math.abs(e.v);this.paused||(t.t+=r);let i=(e.y-t.lastY)/Math.max(r,.001);t.lastY=e.y;let o=Math.max(-.03,Math.min(.03,-i*.004))+Math.sin(t.t*23)*.0012*Math.min(1,n/25)*!!e.engineOn;t.y+=(o-t.y)*Math.min(1,r*10);let l=a*(Math.sin(t.t*61)*.0035+Math.sin(t.t*97)*.002),u=Math.sin(t.t*1.7)*.0015*Math.min(1,n/20)+Math.max(-.02,Math.min(.02,i*.003));t.pitch+=(u-t.pitch)*Math.min(1,r*6);let d=this.car.body.matrixWorld;s.position.copy(Lp).applyMatrix4(d),s.position.y+=t.y+l;let f=c.pitch-.08+t.pitch+l*1.5,p=this.tmpDir.set(Math.sin(c.yaw)*Math.cos(f),Math.sin(f),Math.cos(c.yaw)*Math.cos(f)),m=this.tmpTarget.copy(Lp).add(p).applyMatrix4(d);m.y+=t.y,s.up.set(0,1,0),s.lookAt(m),s.fov=72,s.near=.05}else{let e=this.tmpDir.set(Math.sin(c.yaw)*-6.8,2.7,Math.cos(c.yaw)*-6.8).applyMatrix4(this.car.root.matrixWorld);this.chaseInit||=(this.chase.copy(e),!0),this.chase.lerp(e,.12);let n=Hu(this.chase.x,this.chase.z)+1;this.chase.y<n&&(this.chase.y=n),s.position.copy(this.chase),s.lookAt(this.tmpTarget.copy(t.CHASE_LOOK).applyMatrix4(this.car.root.matrixWorld)),s.fov=60,s.near=.1}s.updateProjectionMatrix(),this.world.sky.position.copy(s.position),this.frameN++%4==0&&this.world.cull(s.position),this.sun.position.set(e.x+Of.x,e.y+Of.y,e.z+Of.z),this.sun.target.position.set(e.x,e.y,e.z),this.renderer.info.reset(),this.renderer.shadowMap.needsUpdate=!0,this.renderer.setRenderTarget(null),this.renderer.clear(),this.renderer.render(this.scene,s),this.mirrors.render(this.renderer,this.scene,this.car.body,this.frameDt,this.camera),this.drawCalls=this.renderer.info.render.calls}hud(){let e=this.vehicle;return{speedKmh:Math.abs(e.v)*3.6,rpm:e.rpm,gear:e.gear,engineOn:e.engineOn,throttle:e.throttle,brake:e.brake,clutch:e.clutch,slipping:e.clutchSlipping,handbrake:e.handbrake,lights:e.lights,blinker:e.blinker,blinkOn:Math.floor(this.clock*3)%2==0,belt:e.belt,fuelPct:e.fuelL/Q.tankLiters,odometerKm:e.odometerM/1e3,roadName:this.road.name,limit:this.road.limit,surface:this.road.surface,camera:this.cameraMode,mirrors:this.mirrors.enabled,messages:this.messages,paused:this.paused,fps:this.fps,showFps:this.showFps,quality:Bf[this.level],pixelRatio:this.aq.ratio,texStep:this.texStep,drawCalls:this.drawCalls,gamepad:this.input.gamepadName,clutchAssist:this.assistOn||this.automatic,automatic:this.automatic,stalled:!e.engineOn&&e.stallCause?Ap[e.stallCause]:null,lug:e.lug,session:this.session?.view()??null,ahead:this.monitor.ahead,trafficOn:this.traffic.enabled,instructorOn:this.instructor.enabled,scenario:this.scenario?{zone:Zh(this.scenario.zone).name,seed:this.scenario.seed,weather:rg[this.scenario.weather],manual:this.scenario.manualZone}:null,zoneNow:this.zoneNow?Zh(this.zoneNow).name:null,weather:this.weather}}toggleCamera(){this.setCamera(this.cameraMode===`primera`?`tercera`:`primera`)}carTriangles(){return this.car.triangles}perf(){let e=this.renderer.info;return{fps:this.fps,level:this.level,ratio:this.aq.ratio,calls:e.render.calls,triangles:e.render.triangles,textures:e.memory.textures,geometries:e.memory.geometries,chunks:this.world.visibleChunks()}}debugSetLevel(e){this.aq.level=e,this.applyLevel(e)}debugState(){return this.vehicle}dispose(){this.flushStats(),this.disposed=!0,cancelAnimationFrame(this.raf),clearTimeout(this.prepTimer),document.removeEventListener(`visibilitychange`,this.onVisibility),window.removeEventListener(`pagehide`,this.flushStats),this.resizeObs.disconnect(),this.input.dispose(),this.sound.dispose(),this.mirrors.dispose(),this.car.dispose(),this.trafficRender.dispose(),this.instructor.dispose(),this.examinerVoice?.dispose(),this.world.dispose(),this.lib.dispose(),this.envRT.dispose(),this.blobTex.dispose(),this.renderer.dispose()}};e(xg,`CHASE_LOOK`,new K(0,1.1,2.5));var Sg=class{constructor(t){e(this,`def`,void 0),e(this,`kind`,`leccion`),e(this,`evaluator`,new Jh),e(this,`coaching`,!0),e(this,`states`,void 0),e(this,`status`,`activa`),e(this,`t0`,null),e(this,`elapsed`,0),e(this,`start`,null),e(this,`odo0`,0),e(this,`good`,new Map),e(this,`st`,{}),e(this,`result`,void 0),e(this,`penalty`,0),e(this,`still`,0),this.def=t,this.states=t.objectives.map(()=>`pendiente`)}get id(){return this.def.id}get title(){return this.def.title}get briefing(){return this.def.briefing}get setup(){return this.def.setup}objectiveTexts(){return this.def.objectives.map(e=>e.text)}step(e){if(this.status!==`activa`)return[];let t=[];this.t0===null&&(this.t0=e.t,this.start={x:e.v.x,z:e.v.z,heading:e.v.heading},this.odo0=e.v.odometerM),this.elapsed=e.t-this.t0,this.evaluator.add(e.events,e.t,!1);for(let t of e.events)t.kind===`bien`&&(this.good.set(t.code,(this.good.get(t.code)??0)+1),t.detail&&this.good.set(`${t.code}:${t.detail}`,(this.good.get(`${t.code}:${t.detail}`)??0)+1));let n=this.start;this.still=Math.abs(e.v.v)<.1?this.still+e.dt:0;let r={...e,good:this.good,start:n,distM:e.v.odometerM-this.odo0,st:this.st,stillT:this.still,along:(e.v.x-n.x)*Math.sin(n.heading)+(e.v.z-n.z)*Math.cos(n.heading)},i=this.def.objectives;i.forEach((n,i)=>{this.states[i]===`pendiente`&&(n.avoid&&e.events.some(e=>n.avoid.includes(e.code))||n.fail&&n.fail(r)?(this.states[i]=`fallado`,this.penalty+=20,t.push(`Objetivo no cumplido: ${n.text}.`)):n.done&&(n.sequential&&i>0&&this.states[i-1]!==`hecho`||n.done(r)&&(this.states[i]=`hecho`,t.push(`✓ ${n.text}`))))});let a=this.evaluator.count(`eliminatoria`),o=i.every((e,t)=>!e.done||this.states[t]===`hecho`);if(a>0)this.finish(!1,`Falta eliminatoria: la lección se da por no superada.`);else if(this.def.timeLimit&&this.elapsed>this.def.timeLimit)this.finish(!1,`Se ha agotado el tiempo de la lección.`);else if(o){this.states=this.states.map(e=>e===`pendiente`?`hecho`:e);let e=this.states.includes(`fallado`);this.finish(!e,e?`Has completado la maniobra, pero algún objetivo no se ha cumplido.`:`¡Lección superada!`)}return this.result&&t.push(this.result.summary),t}finish(e,t){let n=Math.max(0,this.evaluator.score()-this.penalty);this.status=e?`superada`:`no-superada`,this.result={passed:e,score:e?n:Math.min(n,49),faults:[...this.evaluator.faults],summary:t}}view(){return{kind:`leccion`,title:this.def.title,objectives:this.def.objectives.map((e,t)=>({text:e.text,state:this.states[t]})),status:this.status,elapsed:this.elapsed,result:this.result}}},Cg=e=>Math.atan2(Math.sin(e),Math.cos(e)),wg=(e,t,n=1)=>(e.good.get(t)??0)>=n,Tg=e=>Math.abs(e.v.v)*3.6;function Eg(e,t){return n=>{for(let r of n.graph.lanes.values()){if(r.kind!==`calle`||r.lineS===void 0||r.lineS<t+10||!e(r))continue;let n=r.pts[0],i=r.pts[r.pts.length-1];if(Hu(n.x,n.z)>.2||Hu(i.x,i.z)>.2)continue;let a=eh(r,r.lineS-t);return{x:a.x,z:a.z,heading:a.heading}}throw Error(`No hay carril adecuado para la lección`)}}function Dg(e,t,n){return r=>{let i=r.graph.get(e),a=0;i.pts.forEach((e,r)=>{let o=i.pts[a];Math.hypot(e.x-t,e.z-n)<Math.hypot(o.x-t,o.z-n)&&(a=r)});let o=eh(i,i.cum[a]);return{x:o.x,z:o.z,heading:o.heading}}}var Og=e=>t=>{let n=t.map.spawns.find(t=>t.id===e);return{x:n.x,z:n.z,heading:n.heading}},kg=e=>()=>e;function Ag(e){let t={x:Math.sin(e.heading),z:Math.cos(e.heading)},n={x:-t.z,z:t.x},r=Q.length/2,i=Q.width/2;return[[1,1],[1,-1],[-1,-1],[-1,1]].map(([a,o])=>({x:e.x+t.x*r*a+n.x*i*o,z:e.z+t.z*r*a+n.z*i*o}))}function jg(e,t,n=.2){let r={x:Math.sin(t.heading),z:Math.cos(t.heading)},i={x:-r.z,z:r.x};return Ag(e).every(e=>{let a=e.x-t.x,o=e.z-t.z;return Math.abs(a*r.x+o*r.z)<=t.length/2+n&&Math.abs(a*i.x+o*i.z)<=t.width/2+n})}var Mg=(e,t,n=.2)=>Math.abs(Cg(e.heading-t))<n,Ng=e=>(e.st.contacts0===void 0&&(e.st.contacts0=e.contacts),e.contacts>e.st.contacts0),Pg=e=>(e.v.v<-.3&&(e.st.rev=!0),!!e.st.rev),Fg={engineOn:!0,belt:!0,handbrake:!0,gear:`N`},Ig=[{id:`l1-mandos`,title:`Conoce los mandos`,briefing:[`Antes de mover el coche hay que conocer los mandos y prepararse.`,`Teclado: B cinturón · C embrague · I llave · 1 primera · Z intermitente izquierdo · L luces · Espacio freno de mano.`,`En iPad usa los botones de la pantalla y el pedal deslizante de embrague.`],setup:{pose:Og(`centro`),traffic:!1,engineOn:!1,belt:!1,handbrake:!0,gear:`N`},objectives:[{text:`Abrochar el cinturón`,done:e=>e.v.belt},{text:`Pisar el embrague a fondo`,done:e=>e.v.clutch>.9},{text:`Arrancar el motor`,done:e=>e.v.engineOn},{text:`Meter la primera`,done:e=>e.v.gear===1},{text:`Señalizar a la izquierda (salida)`,done:e=>e.v.blinker===`izquierda`},{text:`Encender las luces de cruce`,done:e=>e.v.lights===`cortas`},{text:`Quitar el freno de mano`,done:e=>!e.v.handbrake}]},{id:`l1-arranque`,title:`Arrancar sin calar`,briefing:[`Embrague a fondo, primera, un poco de gas y suelta el embrague despacio hasta notar que el coche empuja (punto de fricción).`,`Quita el freno de mano y sigue soltando el embrague suavemente. Recorre 30 m y detente pisando el embrague.`],setup:{pose:Og(`centro`),traffic:!1,...Fg},objectives:[{text:`Recorrer 30 m`,done:e=>e.distM>=30},{text:`Detenerte sin calar el motor`,done:e=>e.stillT>1&&e.v.engineOn,sequential:!0},{text:`Sin calar ni una vez`,avoid:[`calado`]}],timeLimit:300},{id:`l1-segunda`,title:`Primera y segunda`,briefing:[`Sal en primera y, cuando el coche vaya a unos 15 km/h, embrague, segunda y suelta. Recorre 150 m y detente correctamente.`],setup:{pose:Og(`centro`),traffic:!1,...Fg},objectives:[{text:`Circular en segunda a más de 15 km/h`,done:e=>e.v.gear===2&&Tg(e)>15},{text:`Recorrer 150 m`,done:e=>e.distM>=150},{text:`Detener el vehículo sin calar`,done:e=>e.stillT>1&&e.v.engineOn,sequential:!0}],timeLimit:360},{id:`l2-recta`,title:`Línea recta y marchas`,briefing:[`Calle de sentido único con dos carriles (50 km/h). Sube hasta tercera y mantén el coche en tu carril durante 300 m.`],setup:{pose:e=>e.map.roadPose(`v1-0`,8,0),traffic:!0,...Fg},objectives:[{text:`Circular en tercera`,done:e=>e.v.gear===3&&Tg(e)>22},{text:`Recorrer 300 m`,done:e=>e.distM>=300},{text:`Sin invadir la acera ni el sentido contrario`,avoid:[`subir-acera`,`sentido-contrario`]},{text:`Respetar el límite de velocidad`,avoid:[`exceso-velocidad`]}],timeLimit:420},{id:`l2-giros`,title:`Giros a derecha e izquierda`,briefing:[`Gira una vez a la derecha y otra a la izquierda en un cruce. Antes de cada giro: retrovisor, intermitente, reduce la velocidad y gira.`],setup:{pose:Og(`centro`),traffic:!0,...Fg},objectives:[{text:`Girar a la derecha señalizando`,done:e=>wg(e,`giro-correcto:derecha`)},{text:`Girar a la izquierda señalizando`,done:e=>wg(e,`giro-correcto:izquierda`)},{text:`No girar sin intermitente`,avoid:[`giro-sin-intermitente`]}],timeLimit:600},{id:`l2-frenado`,title:`Frenado progresivo`,briefing:[`Hay un STOP delante. Sube a segunda o tercera, reduce de marcha al acercarte y detén el coche por completo justo antes de la línea.`],setup:{pose:Eg(e=>e.control===`stop`,95),traffic:!1,...Fg},objectives:[{text:`Reducir de marcha en movimiento`,done:e=>wg(e,`reduccion-marcha`)},{text:`Detenerte en la línea del STOP`,done:e=>wg(e,`stop-correcto`)},{text:`Sin pasarte la línea`,avoid:[`stop-sin-detenerse`]}],timeLimit:300},{id:`l3-semaforos`,title:`Semáforos y cruces`,briefing:[`Atraviesa dos cruces con semáforo. Si está en rojo, detente antes de la línea; en ámbar, solo pasa si no puedes parar con seguridad.`],setup:{pose:Eg(e=>e.control===`semaforo`,95),traffic:!0,...Fg},objectives:[{text:`Pasar dos semáforos correctamente`,done:e=>wg(e,`semaforo-respetado`,2)},{text:`Detenerte ante un semáforo en rojo`,done:e=>wg(e,`semaforo-detenido`)||wg(e,`semaforo-respetado`,3)},{text:`No saltarte ningún rojo`,avoid:[`semaforo-rojo`]}],timeLimit:600},{id:`l3-prioridad`,title:`Prioridades y STOP`,briefing:[`En un STOP: detención total antes de la línea y mira. En un ceda el paso: reduce y deja pasar a quien venga por la vía principal.`,`Busca un STOP y un ceda el paso (el recuadro de la izquierda te avisa de la próxima señal).`],setup:{pose:Eg(e=>e.control===`stop`,90),traffic:!0,...Fg},objectives:[{text:`Detención completa en un STOP`,done:e=>wg(e,`stop-correcto`)},{text:`Ceder el paso en un cruce o rotonda`,done:e=>wg(e,`ceda-correcto`)},{text:`No quitar la prioridad a nadie`,avoid:[`no-ceder-paso`,`stop-sin-detenerse`]}],timeLimit:900},{id:`l3-peatones`,title:`Pasos de peatones`,briefing:[`Un peatón va a cruzar por el paso de cebra que tienes delante. En el paso de peatones él tiene prioridad: reduce y detente antes de la marca.`],setup:{pose:Eg(e=>e.control===`stop`&&e.crosswalks.length>0,70),traffic:!1,forceCrossing:!0,...Fg},objectives:[{text:`Ceder el paso al peatón`,done:e=>wg(e,`peaton-cedido`)},{text:`No pasar con el peatón en el paso`,avoid:[`no-ceder-peaton`,`atropello`]}],timeLimit:300},{id:`l3-rotondas`,title:`Rotondas`,briefing:[`Entra en la rotonda cediendo el paso a quien ya circula por ella. Para salir, señaliza con el intermitente derecho.`],setup:{pose:Og(`rotonda`),traffic:!0,...Fg},objectives:[{text:`Salir de la rotonda señalizando a la derecha`,done:e=>wg(e,`rotonda-correcta`)},{text:`Ceder el paso al entrar`,avoid:[`no-ceder-paso`]},{text:`Circular en el sentido correcto`,avoid:[`sentido-contrario`]}],timeLimit:420},{id:`l3-carril`,title:`Cambios de carril`,briefing:[`Calle de sentido único con dos carriles. Cámbiate al carril izquierdo y luego vuelve al derecho: retrovisor, intermitente y maniobra suave.`],setup:{pose:e=>e.map.roadPose(`v1-0`,8,0),traffic:!1,...Fg},objectives:[{text:`Pasar al carril izquierdo señalizando`,done:e=>wg(e,`cambio-carril-correcto:izquierda`)},{text:`Volver al carril derecho señalizando`,done:e=>wg(e,`cambio-carril-correcto:derecha`),sequential:!0},{text:`Señalizar siempre`,avoid:[`cambio-carril-sin-intermitente`]}],timeLimit:420},{id:`l4-convencional`,title:`Curvas y distancia de seguridad`,briefing:[`Circulas por la autovía a 80 km/h. Recorre 1,5 km adaptando la velocidad a las curvas y dejando al menos dos segundos con el vehículo de delante.`,`El mapa no tiene carretera convencional de doble sentido: esta lección practica curvas y distancia en la autovía.`],setup:{pose:Dg(`autovia#1`,180,-413),speedKmh:80,gear:4,engineOn:!0,belt:!0,handbrake:!1,lights:`cortas`,traffic:!0},objectives:[{text:`Recorrer 1,5 km`,done:e=>e.distM>=1500},{text:`Mantener la distancia de seguridad`,avoid:[`distancia-seguridad`]},{text:`No superar el límite`,avoid:[`exceso-velocidad`]}],timeLimit:300},{id:`l4-incorporacion`,title:`Incorporación a autovía`,briefing:[`Toma el ramal, acelera por el carril de aceleración hasta la velocidad de la autovía (al menos 70 km/h), señaliza a la izquierda e incorpórate sin obligar a frenar a nadie.`],setup:{pose:Og(`autovia`),traffic:!0,...Fg},objectives:[{text:`Incorporarte a la velocidad adecuada y señalizando`,done:e=>wg(e,`incorporacion-correcta`)},{text:`No incorporarte demasiado despacio`,avoid:[`incorporacion-lenta`]}],timeLimit:300},{id:`l4-adelantamiento`,title:`Adelantamientos`,briefing:[`Delante va un vehículo lento. Adelántalo: retrovisor, intermitente izquierdo, cambia de carril, rebásalo y vuelve al carril derecho señalizando cuando lo veas en el retrovisor interior.`],setup:{pose:Dg(`autovia#1`,473,-170),speedKmh:90,gear:4,engineOn:!0,belt:!0,handbrake:!1,lights:`cortas`,traffic:!0,slowCar:{aheadM:90,kmh:65,laneId:`autovia#1`}},objectives:[{text:`Pasar al carril izquierdo señalizando`,done:e=>wg(e,`cambio-carril-correcto:izquierda`)},{text:`Rebasar al vehículo lento`,sequential:!0,done:e=>{let t=e.slowCar;return t?(e.v.x-t.x)*Math.sin(t.heading)+(e.v.z-t.z)*Math.cos(t.heading)>Q.length+4:!1}},{text:`Volver al carril derecho señalizando`,done:e=>wg(e,`cambio-carril-correcto:derecha`),sequential:!0},{text:`Señalizar los cambios de carril`,avoid:[`cambio-carril-sin-intermitente`]}],timeLimit:240},{id:`l5-linea`,title:`Aparcamiento en línea`,briefing:[`Hay un hueco entre dos coches junto al bordillo. Colócate en paralelo al coche de delante del hueco, mete la marcha atrás (R) y entra girando hacia el bordillo; luego endereza.`,`Termina dentro de la plaza, paralelo al bordillo y parado, sin tocar nada. Usa la cámara exterior (V) si te ayuda.`],setup:{pose:kg({x:-352,z:259.1,heading:Math.PI/2}),traffic:!1,...Fg},objectives:[{text:`Entrar marcha atrás`,done:e=>Pg(e)},{text:`Quedar dentro de la plaza, paralelo y parado`,done:e=>jg(e.v,Lu.linea)&&Mg(e.v,Math.PI/2)&&e.stillT>1},{text:`Sin tocar coches ni bordillo`,fail:Ng}],timeLimit:300},{id:`l5-bateria`,title:`Aparcamiento en batería`,briefing:[`Aparca marcha atrás en la plaza libre entre los coches. Adelanta el coche pasada la plaza, gira y entra en R; termina recto, dentro de las líneas y parado.`],setup:{pose:kg({x:-381,z:285.5,heading:Math.PI/2}),traffic:!1,...Fg},objectives:[{text:`Entrar en la plaza marcha atrás`,done:e=>(e.v.v<-.2&&jg({...e.v},{...Lu.bateria,length:Lu.bateria.length+3},.6)&&(e.st.revIn=!0),!!e.st.revIn)},{text:`Quedar recto dentro de la plaza y parado`,done:e=>jg(e.v,Lu.bateria)&&Mg(e.v,Math.PI)&&e.stillT>1,sequential:!0},{text:`Sin tocar coches ni bordillo`,fail:Ng}],timeLimit:300},{id:`l5-oblicuo`,title:`Aparcamiento en oblicuo`,briefing:[`Las plazas están inclinadas 45°. Circula despacio junto a ellas y entra de frente girando a la derecha en la plaza libre; termina dentro y parado.`],setup:{pose:kg({x:-366,z:305.5,heading:Math.PI/2}),traffic:!1,...Fg},objectives:[{text:`Quedar dentro de la plaza, bien orientado y parado`,done:e=>jg(e.v,Lu.oblicuo)&&Mg(e.v,Lu.oblicuo.heading,.25)&&e.stillT>1},{text:`Sin tocar otros coches`,fail:Ng}],timeLimit:240},{id:`l5-pendiente`,title:`Arranque en pendiente`,briefing:[`Estás parado en una cuesta con el freno de mano puesto. Primera, gas, embrague hasta el punto de fricción (el coche «tira») y entonces quita el freno de mano. Sube 25 m sin irte hacia atrás.`],setup:{pose:e=>e.map.roadPose(`h0-0`,42,0),traffic:!1,...Fg},objectives:[{text:`Subir 25 m`,done:e=>e.along>25},{text:`No retroceder más de 30 cm`,fail:e=>e.along<-.3},{text:`Sin calar`,avoid:[`calado`]}],timeLimit:240},{id:`l5-sentido`,title:`Cambio de sentido`,briefing:[`En esta calle estrecha, da la vuelta en tres maniobras: adelante girando a la izquierda, atrás girando a la derecha y adelante otra vez. Termina en el carril contrario, mirando al otro lado y parado.`],setup:{pose:kg({x:-372,z:333,heading:Math.PI/2}),traffic:!1,...Fg},objectives:[{text:`Usar la marcha atrás`,done:e=>Pg(e)},{text:`Terminar en sentido contrario y parado`,done:e=>Mg(e.v,-Math.PI/2,.3)&&e.v.z<Lu.sentido.z&&e.stillT>1,sequential:!0},{text:`Sin tocar los bordillos`,fail:Ng}],timeLimit:300}];function Lg(e){return Ig.find(t=>t.id===e)}var Rg=[``,`primera`,`segunda`,`tercera`];function zg(e){return e.kind===`rotonda`?`En la rotonda, tome la ${Rg[e.exit]} salida.`:e.kind===`autovia`?e.want===`recto`?`En el próximo cruce, siga recto hacia la autovía A-90.`:`En el próximo cruce, gire a la ${e.want} para incorporarse a la autovía A-90.`:e.kind===`salida`?`Incorpórese a la autovía y tome la salida 3, Centro ciudad.`:e.want===`recto`?`En el próximo cruce, continúe recto.`:`En la próxima intersección, gire a la ${e.want}.`}function Bg(e){return e.kind===`rotonda`?`${Rg[e.exit][0].toUpperCase()}${Rg[e.exit].slice(1)} salida.`:e.kind===`giro`||e.kind===`autovia`?e.want===`recto`?`Aquí, recto.`:`Aquí, a la ${e.want}.`:``}function Vg(e,t){let n=e-t;for(;n<=.3;)n+=Math.PI*2;for(;n>Math.PI*2+.3;)n-=Math.PI*2;return Math.max(1,Math.round(n/(Math.PI/2)))}function Hg(e){let t=Math.atan2(Math.sin(e),Math.cos(e));return Math.abs(t)<.5?`recto`:t>.9?`izquierda`:t<-.9?`derecha`:null}var Ug=1500,Wg=1350,Gg=1920,Kg=4,qg=`j240_-60`,Jg=class{constructor(t,n=`examen`,r=Date.now()){e(this,`graph`,void 0),e(this,`id`,void 0),e(this,`kind`,`examen`),e(this,`evaluator`,new Jh),e(this,`coaching`,!1),e(this,`title`,`Examen práctico`),e(this,`briefing`,[`Un examinador virtual te dará las indicaciones por voz y en pantalla, con antelación. Antes de salir: cinturón, retrovisores, motor y luces si hacen falta.`,`La prueba dura unos ${Ug/60} minutos y recorre varias zonas (ciudad, rotonda, autovía, carretera…). Al final te pedirá que detengas el vehículo.`,`Criterio orientativo de la DGT: NO APTO con 1 falta eliminatoria, 2 deficientes, 1 deficiente + 5 leves o 10 leves.`]),e(this,`setup`,void 0),e(this,`phase`,`preparacion`),e(this,`t0`,null),e(this,`elapsed`,0),e(this,`given`,0),e(this,`followed`,0),e(this,`pending`,null),e(this,`highway`,null),e(this,`inside`,null),e(this,`instructedArm`,new Set),e(this,`result`,void 0),e(this,`hint`,``),e(this,`rand`,void 0),e(this,`scenario`,null),e(this,`targets`,[]),e(this,`visited`,[]),e(this,`distCache`,new Map),this.graph=t,this.id=n;let i=r>>>0;this.rand=()=>{i=i+1831565813>>>0;let e=i;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},this.setup={pose:e=>{if(this.scenario)return{x:this.scenario.spawn.x,z:this.scenario.spawn.z,heading:this.scenario.spawn.heading};let t=e.map.spawns.find(e=>e.id===`centro`);return{x:t.x,z:t.z,heading:t.heading}},traffic:!0,engineOn:!1,belt:!1,handbrake:!0,gear:`N`}}setScenario(e){this.scenario=e,this.targets=e.route.slice(0,Kg),this.visited=[e.zone],this.rand=(()=>{let t=e.seed*7919>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}})(),e.zone===`autovia`&&(this.highway={since:0,exitOk:!1})}objectiveTexts(){return[`Seguir las indicaciones del examinador por varias zonas (≈ 25 min)`,`Detener el vehículo al final`,`Sin faltas que impidan el APTO`]}targetLanes(e){if(e===`autovia`)return this.graph.signals.armsOf(qg).flatMap(e=>(this.graph.incoming.get(e.id)??[]).map(e=>e.id));let t=Zh(e).roads;return[...this.graph.lanes.values()].filter(e=>e.kind===`calle`&&e.road&&t.includes(e.road.id)).map(e=>e.id)}distTo(e){let t=this.distCache.get(e);if(t)return t;let n=new Map,r=[];for(let t of this.targetLanes(e))n.set(t,0),r.push([t,0]);for(;r.length;){r.sort((e,t)=>e[1]-t[1]);let[e,t]=r.shift();if(!(t>(n.get(e)??1/0)))for(let i of this.graph.feeders.get(e)??[]){let e=this.graph.lanes.get(i);if(!e)continue;let a=t+e.length;a<(n.get(i)??1/0)&&(n.set(i,a),r.push([i,a]))}}return this.distCache.set(e,n),n}options(e){if(e.junction.kind===`rotonda`)return[1,2,3].map(e=>({kind:`rotonda`,exit:e}));let t=new Set;for(let n of this.graph.incoming.get(e.id)??[])for(let e of n.next){let r=this.graph.lanes.get(e);r?.turn&&!e.includes(`>`+n.id.split(`#`)[0])&&t.add(r.turn)}return[...t].map(e=>({kind:`giro`,want:e}))}rampTurn(e){let t=this.graph.signals.armsOf(e.junction.id).find(e=>e.road.id===`ramal-entrada`);if(!t||t===e)return null;let n={x:-e.u.x,z:-e.u.z};return n.x*t.u.x+n.z*t.u.z>.7?`recto`:-n.z*t.u.x+n.x*t.u.z>0?`derecha`:`izquierda`}plan(e,t){if(t===`autovia`&&e.junction.id===qg){let t=this.rampTurn(e);if(t)return{kind:`autovia`,want:t}}let n=this.distTo(t),r=null,i=this.graph.incoming.get(e.id)??[];if(e.junction.kind===`rotonda`){let t=Math.atan2(e.u.z,e.u.x);for(let i of this.graph.signals.armsOf(e.junction.id))if(i!==e)for(let e of this.graph.outgoing.get(i.id)??[]){let a=n.get(e.id);if(a===void 0)continue;let o=Vg(t,Math.atan2(i.u.z,i.u.x));o>3||(!r||a<r.cost)&&(r={ins:{kind:`rotonda`,exit:o},cost:a})}return r?.ins??null}for(let e of i)for(let t of e.next){let i=this.graph.lanes.get(t);if(!i?.turn||t.includes(`>`+e.id.split(`#`)[0]))continue;let a=n.get(i.next[0]);if(a===void 0)continue;let o=i.length+a;(!r||o<r.cost)&&(r={ins:{kind:`giro`,want:i.turn},cost:o})}return r?.ins??null}pick(e){if(!e.length)return null;let t=e.map(e=>e.kind===`giro`&&e.want===`recto`?2:1),n=this.rand()*t.reduce((e,t)=>e+t,0);for(let r=0;r<e.length;r++)if(n-=t[r],n<=0)return e[r];return e[e.length-1]}get currentTarget(){return this.targets.find(e=>!this.visited.includes(e))??null}step(e){if(this.phase===`terminado`)return[];let t=[];this.t0===null&&(this.t0=e.t,t.push(this.highway?`Examinador: cuando esté preparado, inicie la marcha. ${zg({kind:`salida`})}`:`Examinador: cuando esté preparado, inicie la marcha y siga recto hasta que le indique.`),this.highway&&(this.hint=zg({kind:`salida`}))),this.elapsed=e.t-this.t0,this.evaluator.add(e.events,e.t,!0);let n=e.v,r=Math.abs(n.v);if(this.evaluator.count(`eliminatoria`)>0)return t.push(`Examinador: por seguridad, damos por finalizada la prueba.`),this.finish(t),t;if(this.elapsed>Gg)return t.push(`Examinador: se ha agotado el tiempo de la prueba.`),this.finish(t),t;this.phase===`preparacion`&&r>1&&(this.phase=`recorrido`);let i=Qh(this.graph.map,e.info);i&&!this.visited.includes(i)&&this.visited.push(i);let a=e.info.road?.id;this.highway&&(a===`ramal-salida`&&!this.highway.exitOk&&(this.highway.exitOk=!0,this.followed++,this.hint=``),this.highway.exitOk&&a!==`ramal-salida`&&a!==`autovia`?this.highway=null:!this.highway.exitOk&&this.elapsed-this.highway.since>360&&(this.evaluator.add([{code:`no-seguir-indicaciones`,kind:`falta`,detail:`no tomó la salida 3`}],e.t),t.push(`Examinador: no ha tomado la salida indicada. Tome la próxima salida 3.`),this.highway.since=this.elapsed));let o=e.monitor.approachArm,s=Math.max(55,r*7);if(this.phase===`recorrido`&&r>.5&&o&&!this.pending&&o.dist<s&&o.dist>8&&!this.instructedArm.has(o.arm.id)){let e=this.currentTarget,n=(e?this.plan(o.arm,e):null)??this.pick(this.options(o.arm));n&&(this.instructedArm.add(o.arm.id),this.pending={armId:o.arm.id,junctionId:o.arm.junction.id,ins:n,reminded:!1},this.given++,this.hint=zg(n),t.push(`Examinador: ${this.hint}`))}let c=this.pending;if(c&&!c.reminded&&o&&o.arm.id===c.armId&&o.dist<25&&r>1){c.reminded=!0;let e=Bg(c.ins);e&&t.push(`Examinador: ${e}`)}let l=e.info.junction;if(l&&!this.inside&&(this.inside={junctionId:l.id,heading:n.heading,phi:Math.atan2(n.z-l.z,n.x-l.x)}),this.inside&&(!l||l.id!==this.inside.junctionId)){let r=this.inside;this.inside=l?{junctionId:l.id,heading:n.heading,phi:Math.atan2(n.z-l.z,n.x-l.x)}:null;let i=this.pending;if(i&&i.junctionId===r.junctionId){let o;if(i.ins.kind===`rotonda`){let e=this.graph.map.junctions.find(e=>e.id===r.junctionId);o=Vg(r.phi,Math.atan2(n.z-e.z,n.x-e.x))===i.ins.exit}else i.ins.kind===`autovia`?(o=a===`ramal-entrada`,o&&(this.highway={since:this.elapsed,exitOk:!1},t.push(`Examinador: ${zg({kind:`salida`})}`))):o=i.ins.kind===`giro`&&Hg(n.heading-r.heading)===i.ins.want;o?this.followed++:this.evaluator.add([{code:`no-seguir-indicaciones`,kind:`falta`}],e.t),this.pending=null,this.hint=this.highway&&!this.highway.exitOk?zg({kind:`salida`}):``,o||t.push(`Examinador: no ha seguido la indicación. Continúe; le iré indicando.`)}this.instructedArm.clear()}return this.phase===`recorrido`&&this.elapsed>=Wg&&!this.pending&&!this.highway&&!e.info.junction&&(this.phase=`final`,this.hint=`Busque un lugar seguro, detenga el vehículo a la derecha y ponga el freno de mano.`,t.push(`Examinador: muy bien. ${this.hint}`)),this.phase===`final`&&r<.1&&n.handbrake&&(e.info.surface===`calzada`||e.info.surface===`arcen`)&&!e.info.junction&&(t.push(`Examinador: hemos terminado la prueba.`),this.finish(t)),t}finish(e){let t=this.phase===`final`;this.phase=`terminado`;let n=this.evaluator.verdict(),r=t&&this.followed>0,i=n.passed&&r,a=i?`APTO. ${n.reason}`:`NO APTO. ${r?n.reason:n.passed?`No se ha completado el recorrido.`:n.reason}`,o=this.scenario;this.result={passed:i,score:this.evaluator.score(),faults:this.evaluator.faults.map(e=>({...e,t:Math.max(0,e.t-(this.t0??0))})),verdict:n,summary:a,...o?{scenario:{zone:Zh(o.zone).name,seed:o.seed,weather:rg[o.weather],visited:this.visited.map(e=>Zh(e).name)}}:{}},e.push(`Resultado: ${a}`)}view(){let e=this.targets.length+1,t=this.visited.filter(e=>e===this.scenario?.zone||this.targets.includes(e)).length,n=this.currentTarget,r=[{text:`Recorrido: ${Math.floor(this.elapsed/60)} de ${Ug/60} min · zonas ${Math.min(t,e)}/${e}${n?` · siguiente: ${Zh(n).name}`:``}`,state:this.phase===`final`||this.phase===`terminado`?`hecho`:`pendiente`},{text:`Indicaciones: ${this.given} (${this.followed} seguidas)`,state:`pendiente`},{text:`Detener el vehículo al final`,state:this.phase===`terminado`&&this.result?.passed?`hecho`:`pendiente`},{text:`Faltas: ${this.evaluator.count(`eliminatoria`)} E · ${this.evaluator.count(`deficiente`)} D · ${this.evaluator.count(`leve`)} L`,state:this.evaluator.verdict().passed?`pendiente`:`fallado`}];return{kind:`examen`,title:this.title,objectives:r,status:this.phase===`terminado`?this.result?.passed?`superada`:`no-superada`:`activa`,elapsed:this.elapsed,hint:this.hint||void 0,result:this.result}}};Xh.map(e=>e.id);var $=o();function Yg({value:e,max:t,red:n,label:r,unit:i,big:a}){let o=-210*Math.PI/180,s=240*Math.PI/180,c=e=>{let t=o+s*Math.min(1,Math.max(0,e));return`${50+46*Math.cos(t)} ${55+46*Math.sin(t)}`},l=(e,t)=>`M ${c(e)} A 46 46 0 ${+((t-e)*240>180)} 1 ${c(t)}`,u=e/t;return(0,$.jsxs)(`svg`,{viewBox:`0 0 100 92`,className:`hud-gauge`,role:`img`,"aria-label":`${r}: ${a} ${i}`,children:[(0,$.jsx)(`path`,{d:l(0,1),className:`hud-gauge-track`}),n!==void 0&&(0,$.jsx)(`path`,{d:l(n/t,1),className:`hud-gauge-red`}),u>.002&&(0,$.jsx)(`path`,{d:l(0,Math.min(1,u)),className:`hud-gauge-fill`}),(0,$.jsx)(`text`,{x:`50`,y:`58`,className:`hud-gauge-big`,children:a}),(0,$.jsx)(`text`,{x:`50`,y:`74`,className:`hud-gauge-unit`,children:i})]})}function Xg({v:e,label:t,cls:n}){return(0,$.jsxs)(`div`,{className:`pedal-bar`,title:t,children:[(0,$.jsx)(`div`,{className:`pedal-fill ${n}`,style:{height:`${Math.round(e*100)}%`}}),(0,$.jsx)(`span`,{children:t[0]})]})}function Zg({a:e}){let t=e.control===`semaforo`?`Semáforo ${e.light??``}`:e.control===`stop`?`STOP`:e.control===`rotonda`?`Rotonda: ceda el paso`:`Ceda el paso`;return(0,$.jsxs)(`div`,{className:`hud-ahead`,"aria-label":`${t} a ${Math.round(e.dist)} metros`,children:[e.control===`semaforo`?(0,$.jsxs)(`span`,{className:`ahead-light ${e.light??``}`,"aria-hidden":`true`,children:[(0,$.jsx)(`i`,{}),(0,$.jsx)(`i`,{}),(0,$.jsx)(`i`,{})]}):e.control===`stop`?(0,$.jsx)(`span`,{className:`ahead-stop`,"aria-hidden":`true`,children:`STOP`}):(0,$.jsx)(`span`,{className:`ahead-ceda`,"aria-hidden":`true`}),(0,$.jsxs)(`span`,{children:[(0,$.jsx)(`b`,{children:t}),(0,$.jsx)(`br`,{}),(0,$.jsxs)(`span`,{className:`num`,children:[Math.round(e.dist),` m`]})]})]})}var Qg={apagadas:``,posicion:`Posición`,cortas:`Cortas`,largas:`Largas`};function $g({h:e}){let t=e.blinkOn&&(e.blinker===`izquierda`||e.blinker===`emergencia`),n=e.blinkOn&&(e.blinker===`derecha`||e.blinker===`emergencia`),r=e.limit!==null&&e.speedKmh>e.limit+1;return(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`div`,{className:`hud-road`,children:[e.limit!==null&&(0,$.jsx)(`div`,{className:`limit-sign ${r?`over`:``}`,"aria-label":`Límite genérico ${e.limit} km/h`,children:e.limit}),(0,$.jsxs)(`div`,{children:[(0,$.jsx)(`div`,{className:`hud-road-name`,children:e.roadName}),(0,$.jsx)(`div`,{className:`hud-road-sub`,children:e.surface===`calzada`?`Calzada`:e.surface===`arcen`?`Arcén`:e.surface===`acera`?`Sobre la acera`:e.surface===`fuera`?`Fuera de la vía`:e.surface})]})]}),e.ahead&&(0,$.jsx)(Zg,{a:e.ahead}),(0,$.jsx)(`div`,{className:`hud-msgs`,"aria-live":`polite`,children:e.messages.map(e=>(0,$.jsxs)(`div`,{className:`hud-msg ${e.kind} ${e.who?`instr`:``}`,children:[e.who&&(0,$.jsx)(`span`,{className:`instr-tag ${e.who}`,children:e.who===`examinador`?`Examinador`:`Instructor`}),e.text]},e.id))}),e.stalled&&(0,$.jsxs)(`div`,{className:`hud-stalled`,role:`alert`,children:[(0,$.jsx)(`b`,{children:`Motor calado`}),(0,$.jsxs)(`span`,{children:[e.stalled,`. Embrague a fondo y arranca.`]})]}),(0,$.jsxs)(`div`,{className:`hud-fps num`,title:`FPS y nivel de calidad (se ajusta solo). F: más detalles`,children:[e.fps,` FPS · `,e.quality,e.showFps&&(0,$.jsxs)(`span`,{children:[` · ×`,e.pixelRatio.toFixed(2),` · `,e.drawCalls,` dibujos`,e.texStep>0?` · texturas −${e.texStep}`:``]})]}),(0,$.jsxs)(`div`,{className:`hud-dash`,children:[(0,$.jsxs)(`div`,{className:`hud-tells`,"aria-label":`Testigos`,children:[(0,$.jsx)(`span`,{className:`tell arrow ${t?`on green`:``}`,title:`Intermitente izquierdo`,children:`◀`}),(0,$.jsx)(`span`,{className:`tell ${e.engineOn?e.lug>.4?`on amber`:``:`on red`}`,title:e.stalled?`Motor calado`:`Motor apagado`,children:`⚡`}),(0,$.jsx)(`span`,{className:`tell ${e.handbrake?`on red`:``}`,title:`Freno de mano`,children:`(P)`}),(0,$.jsx)(`span`,{className:`tell ${e.belt?``:`on red`}`,title:`Cinturón sin abrochar`,children:`⛑`}),(0,$.jsx)(`span`,{className:`tell ${e.lights===`apagadas`?``:e.lights===`largas`?`on blue`:`on green`}`,title:`Luces ${Qg[e.lights]}`,children:`☀`}),(0,$.jsx)(`span`,{className:`tell ${e.fuelPct<.12?`on amber`:``}`,title:`Reserva de combustible`,children:`⛽`}),(0,$.jsx)(`span`,{className:`tell arrow ${n?`on green`:``}`,title:`Intermitente derecho`,children:`▶`})]}),(0,$.jsxs)(`div`,{className:`hud-gauges`,children:[(0,$.jsx)(Yg,{value:e.rpm,max:7e3,red:Q.redlineRpm,label:`Revoluciones`,unit:`× 1000 rpm`,big:(e.rpm/1e3).toFixed(1)}),(0,$.jsxs)(`div`,{className:`hud-gear`,"aria-label":`Marcha ${e.gear}`,children:[(0,$.jsx)(`div`,{className:`gear-big`,children:e.automatic&&typeof e.gear==`number`?`D`:e.gear}),(0,$.jsx)(`div`,{className:`gear-sub`,children:e.automatic?typeof e.gear==`number`?`auto · ${e.gear}.ª`:`automático`:e.slipping?`patinando`:`marcha`})]}),(0,$.jsx)(Yg,{value:e.speedKmh,max:200,label:`Velocidad`,unit:`km/h`,big:String(Math.round(e.speedKmh))})]}),(0,$.jsxs)(`div`,{className:`hud-bottom`,children:[(0,$.jsxs)(`div`,{className:`pedals`,"aria-label":`Pedales`,children:[(0,$.jsx)(Xg,{v:e.clutch,label:`Embrague`,cls:`c`}),(0,$.jsx)(Xg,{v:e.brake,label:`Freno`,cls:`b`}),(0,$.jsx)(Xg,{v:e.throttle,label:`Acelerador`,cls:`t`})]}),(0,$.jsxs)(`div`,{className:`hud-info`,children:[(0,$.jsxs)(`div`,{className:`fuel`,children:[(0,$.jsx)(`span`,{children:`⛽`}),(0,$.jsx)(`div`,{className:`bar`,children:(0,$.jsx)(`span`,{style:{width:`${Math.round(e.fuelPct*100)}%`}})})]}),(0,$.jsxs)(`div`,{className:`dim num`,children:[e.odometerKm.toFixed(2),` km `,Qg[e.lights]&&`· ${Qg[e.lights]}`]})]})]})]})]})}function e_({input:e,code:t,label:n,className:r}){let[i,a]=(0,s.useState)(!1),o=n=>{a(n),e.setVirtual(t,n)};return(0,$.jsx)(`button`,{type:`button`,className:`t-hold ${r} ${i?`down`:``}`,onPointerDown:e=>{e.preventDefault();try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}o(!0)},onPointerUp:()=>o(!1),onPointerCancel:()=>o(!1),onLostPointerCapture:()=>o(!1),onContextMenu:e=>e.preventDefault(),"aria-label":n,"aria-pressed":i,children:n})}function t_({input:e}){let t=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let n=0,r=()=>{let i=(e.tilt.active?e.tilt.visualAngle():e.last.steer*90)+Math.sin(performance.now()*.07)*2.2*e.vibration;t.current&&(t.current.style.transform=`rotate(${i.toFixed(1)}deg)`),n=requestAnimationFrame(r)};return n=requestAnimationFrame(r),()=>cancelAnimationFrame(n)},[e]),(0,$.jsxs)(`svg`,{ref:t,viewBox:`-50 -50 100 100`,className:`t-wheel`,"aria-hidden":`true`,children:[(0,$.jsx)(`circle`,{r:`44`,className:`t-wheel-rim`}),(0,$.jsx)(`circle`,{r:`9`,className:`t-wheel-hub`}),(0,$.jsx)(`path`,{d:`M -42 -4 L -9 -2 M 42 -4 L 9 -2 M 0 9 L 0 42`,className:`t-wheel-spoke`}),(0,$.jsx)(`rect`,{x:`-3`,y:`-47`,width:`6`,height:`9`,rx:`2`,className:`t-wheel-mark`})]})}var n_={denied:`Permiso de movimiento denegado. Actívalo en Ajustes › Safari › Movimiento y orientación, o usa los botones ◀ ▶.`,unsupported:`Este navegador no ofrece el sensor de inclinación. Usa los botones ◀ ▶ o las flechas.`,insecure:`El sensor solo funciona con conexión segura (HTTPS). Abre la app con «npm run dev:movil» (ver README) o usa los botones ◀ ▶.`,"no-data":`Este dispositivo no tiene sensor de inclinación. Usa los botones ◀ ▶ o las flechas del teclado.`},r_=[`R`,`N`,1,2,3,4,5];function i_({onTap:e,className:t=``,label:n,children:r,active:i}){return(0,$.jsx)(`button`,{type:`button`,className:`t-btn ${t} ${i?`on`:``}`,"aria-label":n,"aria-pressed":i,onPointerDown:t=>{t.preventDefault(),e()},onContextMenu:e=>e.preventDefault(),children:r})}function a_({input:e,assist:t}){let n=(0,s.useRef)(null),[r,i]=(0,s.useState)(e.touchClutch),a=t=>{let n=Math.min(1,Math.max(0,t));e.touchClutch=n,i(n)},o=e=>{let t=n.current.getBoundingClientRect();return(t.bottom-e.clientY)/t.height},c=(1-Q.clutchBiteStart)*100,l=(Q.clutchBiteStart-Q.clutchBiteEnd)*100;return(0,$.jsxs)(`div`,{ref:n,className:`t-clutch`,role:`slider`,"aria-label":`Embrague: desliza hacia arriba para pisarlo; se queda donde lo sueltas`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(r*100),onPointerDown:e=>{e.preventDefault();try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}a(o(e))},onPointerMove:e=>{(e.buttons||e.pointerType!==`mouse`)&&a(o(e))},children:[(0,$.jsx)(`div`,{className:`t-clutch-bite`,style:{top:`${c}%`,height:`${l}%`}}),(0,$.jsx)(`div`,{className:`t-clutch-fill`,style:{height:`${Math.round(r*100)}%`}}),(0,$.jsxs)(`span`,{className:`t-clutch-label`,children:[`Embrague`,t?` (auto)`:``]}),(0,$.jsx)(`span`,{className:`t-clutch-hint`,children:r>.85?`pisado`:r>Q.clutchBiteEnd?`fricción`:`suelto`})]})}function o_({input:e,onMessage:t,gear:n,assist:r,automatic:i=!1,engineOn:a=!0,stalled:o=!1}){let[c,l]=(0,s.useState)(e.tilt.active),[u,d]=(0,s.useState)(!1),[f,p]=(0,s.useState)(!fm.supported()),[,m]=(0,s.useState)(0),h=t=>()=>e.push(t);return(0,s.useEffect)(()=>()=>e.clearVirtual(),[e]),(0,$.jsxs)(`div`,{className:`touch-layer`,children:[(0,$.jsxs)(`div`,{className:`t-left`,children:[(0,$.jsxs)(`div`,{className:`t-buttons`,children:[(0,$.jsx)(i_,{className:`start ${a?``:`off`} ${o?`stalled`:``}`,label:a?`Apagar el motor`:`Arrancar el motor`,onTap:h({type:`ignition`}),children:a?`Motor ⏻`:`ARRANCAR`}),(0,$.jsx)(i_,{onTap:h({type:`handbrake`}),children:`(P)`}),(0,$.jsx)(i_,{onTap:h({type:`belt`}),children:`Cint.`}),(0,$.jsx)(i_,{onTap:h({type:`blinker`,side:`izquierda`}),label:`Intermitente izquierdo`,children:`◂ Int`}),(0,$.jsx)(i_,{onTap:h({type:`blinker`,side:`derecha`}),label:`Intermitente derecho`,children:`Int ▸`}),(0,$.jsx)(i_,{onTap:h({type:`lights`}),children:`Luces`})]}),(0,$.jsxs)(`div`,{className:`t-steer-area`,children:[!c&&(0,$.jsx)(e_,{input:e,code:`ArrowLeft`,label:`◀`,className:`steer`}),(0,$.jsxs)(`div`,{className:`t-wheel-box`,children:[(0,$.jsx)(t_,{input:e}),c?(0,$.jsxs)(`div`,{className:`t-wheel-actions`,children:[(0,$.jsx)(i_,{className:`small`,onTap:()=>{e.tilt.calibrate(),t(`Posición actual fijada como «recto».`,`info`)},children:`Calibrar`}),(0,$.jsx)(i_,{className:`small`,active:e.tilt.invert,label:`Invertir el sentido del volante`,onTap:()=>{e.tilt.invert=!e.tilt.invert,m(e=>e+1)},children:`⇄`}),(0,$.jsx)(i_,{className:`small`,onTap:()=>{e.tilt.disable(),l(!1)},children:`Botones`})]}):!f&&(0,$.jsx)(`button`,{type:`button`,className:`t-btn small accent`,onClick:()=>{d(!0),e.tilt.enable().then(e=>{d(!1),e===`ok`?(l(!0),t(`Volante activado: gira el aparato como un volante. Pulsa «Calibrar» con él recto.`,`info`)):((e===`no-data`||e===`unsupported`)&&p(!0),t(n_[e],`warn`))})},disabled:u,children:u?`Activando…`:`Activar volante`})]}),!c&&(0,$.jsx)(e_,{input:e,code:`ArrowRight`,label:`▶`,className:`steer`})]})]}),(0,$.jsxs)(`div`,{className:`t-right`,children:[(0,$.jsx)(`div`,{className:`t-gears`,"aria-label":`Palanca de cambios`,children:i?[`R`,`N`,1].map(e=>(0,$.jsx)(i_,{className:`gear auto`,active:e===1?typeof n==`number`:n===e,label:e===1?`Marcha adelante (D)`:`Marcha ${e}`,onTap:h({type:`gear`,gear:e}),children:e===1?typeof n==`number`?`D${n}`:`D`:e},String(e))):r_.map(e=>(0,$.jsx)(i_,{className:`gear`,active:n===e,label:`Marcha ${e}`,onTap:h({type:`gear`,gear:e}),children:e},String(e)))}),(0,$.jsxs)(`div`,{className:`t-pedals`,children:[!i&&(0,$.jsx)(a_,{input:e,assist:r}),(0,$.jsx)(e_,{input:e,code:`KeyS`,label:`Freno`,className:`brake`}),(0,$.jsx)(e_,{input:e,code:`KeyW`,label:`Gas`,className:`gas`})]})]})]})}var s_=new Map;function c_(e){if(e.kind===`mat`)for(let t of e.maps)s_.set(`${e.id}@${t.size}`,t);else s_.set(`${e.kind}@${e.size}`,e.data)}function l_(e){return e.kind===`mat`?e.sizes.some(t=>!s_.has(`${e.id}@${t}`)):!s_.has(`${e.kind}@${e.size}`)}var u_=()=>new Promise(e=>setTimeout(e,0));async function d_(e,t){let n=e.filter(l_).sort((e,t)=>Cf(t)-Cf(e)),r=n.reduce((e,t)=>e+Cf(t),0)||1,i=0,a=(e,n)=>{c_(n),i+=Cf(e),t(Math.min(1,i/r))};if(!n.length){t(1);return}t(0);let o=[...n],s=typeof navigator<`u`&&navigator.hardwareConcurrency||4,c=Math.max(1,Math.min(4,s-1,o.length)),l=[];try{for(let e=0;e<c;e++)l.push(new Worker(new URL(new URL(`worker-DRSzRnxt.js`,import.meta.url).href,``+import.meta.url),{type:`module`}))}catch{for(let e of l)e.terminate();l=[]}if(l.length){let e=[];await Promise.all(l.map(t=>new Promise(n=>{let r=null,i=()=>{if(r=o.shift()??null,!r)return n();t.postMessage(r)};t.onmessage=e=>{r&&a(r,e.data),i()},t.onerror=()=>{r&&e.push(r),n()},i()})));for(let e of l)e.terminate();o.push(...e)}for(;o.length;){let e=o.shift();await u_(),a(e,Sf(e))}}function f_(e,t,n,r){let i=new ei(e,t,t,F,E);return i.wrapS=i.wrapT=_,i.colorSpace=n?Ze:``,i.generateMipmaps=!0,i.minFilter=T,i.magFilter=C,i.anisotropy=r,i.needsUpdate=!0,i}var p_=class{constructor(t,n){e(this,`sets`,new Map),e(this,`sizes`,new Map),e(this,`detail`,void 0),e(this,`decals`,void 0),e(this,`aniso`,void 0),this.aniso=n;for(let e of t)if(e.kind===`mat`){this.sizes.set(e.id,[...e.sizes].sort((e,t)=>t-e));for(let t of e.sizes){let r=s_.get(`${e.id}@${t}`);this.sets.set(`${e.id}@${t}`,{size:t,albedo:f_(r.albedo,t,!0,n),normal:f_(r.normal,t,!1,n),packed:f_(r.packed,t,!1,n)})}}let r=t.find(e=>e.kind===`decals`),i=t.find(e=>e.kind===`detail`);this.decals=f_(s_.get(`decals@${r.size}`),r.size,!0,n),this.decals.wrapS=this.decals.wrapT=v,this.detail=f_(s_.get(`detail@${i.size}`),i.size,!1,1)}get(e,t=4096){let n=this.sizes.get(e),r=n.find(e=>e<=t)??n[n.length-1];return this.sets.get(`${e}@${r}`)}maxSize(e){return this.sizes.get(e)[0]}all(){let e=[this.detail,this.decals];for(let t of this.sets.values())e.push(t.albedo,t.normal,t.packed);return e}upload(e){for(let t of this.all())e.initTexture(t)}get anisotropy(){return this.aniso}setAnisotropy(e,t){let n=Math.max(1,Math.min(t,e.capabilities.getMaxAnisotropy()));if(n===this.aniso)return;this.aniso=n;let r=e.getContext(),i=e.extensions.get(`EXT_texture_filter_anisotropic`);for(let t of this.all()){if(t===this.detail)continue;t.anisotropy=n;let a=e.properties.get(t).__webglTexture;i&&a&&(r.bindTexture(r.TEXTURE_2D,a),r.texParameterf(r.TEXTURE_2D,i.TEXTURE_MAX_ANISOTROPY_EXT,n))}r.bindTexture(r.TEXTURE_2D,null),e.resetState()}dispose(){for(let e of this.all())e.dispose()}};async function m_(e,t={},n=()=>void 0){let r=typeof Worker>`u`,i=Df(e,{...t,noWorkers:r});return await d_(i,n),new p_(i,e===`alta`?8:4)}function h_(){try{return!!document.createElement(`canvas`).getContext(`webgl2`)}catch{return!1}}var g_=()=>typeof matchMedia<`u`&&matchMedia(`(pointer: coarse)`).matches,__=()=>typeof matchMedia<`u`?matchMedia(`(orientation: portrait)`):null;function v_(){let[e,t]=(0,s.useState)(()=>!!__()?.matches);return(0,s.useEffect)(()=>{let e=__();if(!e)return;let n=()=>t(e.matches);return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}function y_(e){if(e.kind===`libre`)return null;let t=wd(),n=nh(t,Hm(t));if(e.kind===`examen`||e.id===`l6-examen`)return new Jg(n,e.kind===`leccion`?e.id:`examen`);let r=Lg(e.id);return r?new Sg(r):null}var b_={eliminatoria:`Eliminatorias`,deficiente:`Deficientes`,leve:`Leves`};function x_(e){return`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`}function S_({v:e}){return(0,$.jsxs)(`div`,{className:`sim-session`,"aria-live":`polite`,children:[(0,$.jsxs)(`div`,{className:`card-row`,children:[(0,$.jsx)(`b`,{children:e.title}),(0,$.jsx)(`span`,{className:`dim num`,children:x_(e.elapsed)})]}),e.hint&&(0,$.jsx)(`div`,{className:`sim-session-hint`,children:e.hint}),(0,$.jsx)(`ul`,{children:e.objectives.map(e=>(0,$.jsxs)(`li`,{className:e.state,children:[(0,$.jsx)(`span`,{"aria-hidden":`true`,children:e.state===`hecho`?`✓`:e.state===`fallado`?`✗`:`○`}),` `,e.text]},e.text))})]})}function C_(e,t){let r=t.result;r&&n.update(n=>{let i={...n.practice,lessons:{...n.practice.lessons},exams:[...n.practice.exams]},a=0,o=e.kind===`leccion`?e.id:null;if(o){let e=i.lessons[o];i.lessons[o]={completed:(e?.completed??!1)||r.passed,attempts:(e?.attempts??0)+1,bestScore:Math.max(e?.bestScore??0,r.score),lastAt:Date.now()},a+=r.passed?e?.completed?15:60:5}return t.kind===`examen`&&(i.exams.push({id:`px-${Date.now()}`,date:new Date().toISOString(),passed:r.passed,eliminatory:r.verdict?.eliminatory??0,deficient:r.verdict?.deficient??0,minor:r.verdict?.minor??0,durationSec:Math.round(t.elapsed)}),a+=r.passed?150:25),{...n,practice:i,xp:n.xp+a}})}function w_(e){let n=t.findIndex(t=>t.id===e);return n>=0&&n<t.length-1?t[n+1].id:null}function T_({mode:e={kind:`libre`}}){let[t,n]=(0,s.useState)(0);return(0,$.jsx)(E_,{mode:e,onRestart:()=>n(e=>e+1)},t)}function E_({mode:e,onRestart:t}){let{settings:a}=i(),o=(0,s.useRef)(null),c=(0,s.useRef)(null),[l,u]=(0,s.useState)(null),[d,f]=(0,s.useState)(null),[p,m]=(0,s.useState)(!1),[h,g]=(0,s.useState)(null),[_,v]=(0,s.useState)(0),[y,b]=(0,s.useState)(g_),[x,S]=(0,s.useState)(!1),[C,w]=(0,s.useState)(!1),T=v_(),E=(0,s.useRef)(a),[D]=(0,s.useState)(()=>y_(e)),O=(0,s.useRef)(!1),k=e.kind===`libre`||e.kind===`examen`,[A,j]=(0,s.useState)(()=>{if(!k)return null;let e=wd();return ug(e,Hm(e),pg())}),[M,N]=(0,s.useState)(`aleatorio`),[ee,P]=(0,s.useState)(()=>A?String(A.seed):``);(0,s.useEffect)(()=>{if(!c.current||!o.current)return;if(!h_()){g(`Este navegador no tiene WebGL 2 activado. Actualiza Safari (15 o posterior) o activa la aceleración por hardware.`);return}let e=null,t=!1,r=0,i=e=>e.preventDefault();return document.addEventListener(`gesturestart`,i),v(0),m_(E.current.quality,{touch:g_()},e=>!t&&v(e)).then(i=>{if(t||!c.current||!o.current){i.dispose();return}try{e=new xg(c.current,o.current,E.current,i,{onDriveStats:(e,t)=>n.update(n=>({...n,practice:{...n.practice,distanceKm:n.practice.distanceKm+e/1e3,timeSec:n.practice.timeSec+t}}))},`centro`,D,A)}catch(e){g(`No se pudo iniciar el simulador 3D: ${e instanceof Error?e.message:String(e)}`);return}let a=e;u(a),v(null),r=window.setInterval(()=>f(a.hud()),66)}).catch(e=>g(`No se pudieron generar las texturas: ${e instanceof Error?e.message:String(e)}`)),()=>{if(t=!0,window.clearInterval(r),document.removeEventListener(`gesturestart`,i),delete window.__sim,!e)return;let a=(D?.evaluator??e.freeEval).byLabel();Object.keys(a).length&&n.update(e=>{let t={...e.practice.infractions};for(let[e,n]of Object.entries(a))t[e]=(t[e]??0)+n;return{...e,practice:{...e.practice,infractions:t}}}),e.dispose()}},[]);let te=e=>{j(e),P(String(e.seed)),l?.setScenario(e),l&&f(l.hud())},ne=e=>{N(e);let t=wd(),n=Hm(t);te(e===`aleatorio`?ug(t,n,pg()):lg(t,n,1+Math.floor(Math.random()*ag),e))},re=()=>{let e=Math.floor(Number(ee));if(!Number.isFinite(e)||e<1||e>999999)return;let t=wd();te(lg(t,Hm(t),e,M===`aleatorio`?void 0:M))},ie=()=>{A&&mg(A.zone),l?.setClutchAssist(y),l?.begin(),m(!0),c.current?.focus();let e=screen.orientation;y&&e?.lock&&e.lock(`landscape`).catch(()=>void 0)},ae=()=>r(`/simulador`),F=d?.session??null;if((0,s.useEffect)(()=>{F&&F.status!==`activa`&&!O.current&&(O.current=!0,C_(e,F),window.setTimeout(()=>l?.setPaused(!0),2500))},[F?.status]),h)return(0,$.jsxs)(`div`,{className:`sim-error card`,children:[(0,$.jsx)(`h2`,{children:`Simulador no disponible`}),(0,$.jsx)(`p`,{className:`muted`,style:{margin:`8px 0 16px`},children:h}),(0,$.jsx)(`button`,{className:`btn primary`,onClick:ae,children:`Volver`})]});let oe=d?.paused??!0;return(0,$.jsxs)(`div`,{className:`sim-root`,ref:o,children:[(0,$.jsx)(`canvas`,{ref:c,className:`sim-canvas`,tabIndex:0,"aria-label":`Vista del simulador de conducción`}),_!==null&&(0,$.jsx)(`div`,{className:`sim-loading`,role:`status`,"aria-live":`polite`,children:(0,$.jsxs)(`div`,{className:`sim-loading-box`,children:[(0,$.jsx)(`b`,{children:`Generando texturas…`}),(0,$.jsx)(`div`,{className:`sim-loading-bar`,role:`progressbar`,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(_*100),children:(0,$.jsx)(`span`,{style:{width:`${Math.round(_*100)}%`}})}),(0,$.jsxs)(`span`,{className:`dim num`,children:[Math.round(_*100),` %`]})]})}),d&&p&&(0,$.jsx)($g,{h:d}),d&&p&&d.scenario&&(0,$.jsxs)(`div`,{className:`sim-scenario`,"aria-label":`Escenario`,children:[d.zoneNow??d.scenario.zone,` · semilla `,(0,$.jsx)(`b`,{className:`num`,children:d.scenario.seed}),` · `,d.scenario.weather]}),p&&d?.weather===`lluvia`&&(0,$.jsx)(`div`,{className:`sim-rain`,"aria-hidden":`true`}),F&&p&&F.status===`activa`&&(0,$.jsx)(S_,{v:F}),l&&p&&y&&!oe&&(0,$.jsx)(o_,{input:l.input,gear:d?.gear??`N`,assist:d?.clutchAssist??!1,automatic:d?.automatic??!1,engineOn:d?.engineOn??!1,stalled:!!d?.stalled,onMessage:(e,t)=>l.say(e,t,6)}),p&&y&&T&&!C&&!oe&&(0,$.jsxs)(`div`,{className:`sim-rotate`,role:`dialog`,"aria-label":`Gira el dispositivo`,children:[(0,$.jsx)(`div`,{className:`sim-rotate-icon`,"aria-hidden":`true`,children:`⟲`}),(0,$.jsx)(`p`,{children:`Gira el dispositivo a horizontal: se conduce como un volante.`}),(0,$.jsx)(`button`,{className:`btn small`,onClick:()=>w(!0),children:`Seguir en vertical`})]}),p&&!oe&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(`button`,{className:`sim-pause-btn`,onClick:()=>l?.setPaused(!0),"aria-label":`Pausa`,children:`❚❚`}),(0,$.jsx)(`button`,{className:`sim-cam-btn`,onClick:()=>l?.toggleCamera(),"aria-label":d?.camera===`primera`?`Cambiar a vista exterior`:`Cambiar a vista interior`,title:`Vista interior / exterior (V)`,children:d?.camera===`primera`?`Exterior`:`Interior`})]}),F&&F.result&&oe&&(0,$.jsx)(`div`,{className:`sim-overlay`,children:(0,$.jsxs)(`div`,{className:`sim-panel card`,role:`dialog`,"aria-label":`Resultado`,children:[(0,$.jsx)(`div`,{className:`result-hero ${F.result.passed?`pass`:`fail`}`,style:{padding:0},children:(0,$.jsx)(`div`,{className:`big`,children:F.kind===`examen`?F.result.passed?`APTO`:`NO APTO`:F.result.passed?`¡Superada!`:`No superada`})}),(0,$.jsx)(`p`,{className:`muted`,style:{marginTop:8},children:F.result.summary}),F.kind===`leccion`&&(0,$.jsxs)(`p`,{style:{marginTop:8},children:[`Puntuación: `,(0,$.jsx)(`b`,{className:`num`,children:F.result.score}),`/100`]}),(0,$.jsx)(`ul`,{className:`sim-result-obj`,children:F.objectives.map(e=>(0,$.jsxs)(`li`,{className:e.state,children:[e.state===`hecho`?`✓`:e.state===`fallado`?`✗`:`○`,` `,e.text]},e.text))}),[`eliminatoria`,`deficiente`,`leve`].map(e=>{let t=F.result.faults.filter(t=>t.sev===e);return t.length?(0,$.jsxs)(`div`,{className:`sim-faults`,children:[(0,$.jsxs)(`h3`,{children:[b_[e],` (`,t.length,`)`]}),(0,$.jsx)(`ul`,{children:t.map((e,t)=>(0,$.jsxs)(`li`,{children:[(0,$.jsx)(`b`,{children:e.label}),e.detail?` · ${e.detail}`:``,(0,$.jsxs)(`span`,{className:`dim`,children:[F.kind===`examen`?` · ${x_(e.t)}`:``,e.zone?` · ${e.zone}`:``]}),Gh[e.code]&&(0,$.jsxs)(`div`,{className:`dim sim-advice`,children:[`Cómo corregirlo: `,Gh[e.code]]})]},t))})]},e):null}),F.result.faults.length===0&&(0,$.jsx)(`p`,{className:`dim`,style:{marginTop:8},children:`Sin faltas registradas.`}),F.result.scenario&&(0,$.jsxs)(`p`,{className:`dim`,style:{marginTop:10},children:[`Salida: `,F.result.scenario.zone,` · semilla `,(0,$.jsx)(`b`,{className:`num`,children:F.result.scenario.seed}),` · `,F.result.scenario.weather,`. Zonas recorridas: `,F.result.scenario.visited.join(`, `),`. Para repetir este escenario, introduce la semilla antes de empezar.`]}),F.kind===`examen`&&(0,$.jsx)(`p`,{className:`dim`,style:{marginTop:10},children:`Calificación orientativa basada en el sistema de la DGT. No sustituye a una autoescuela ni al examen oficial.`}),(0,$.jsxs)(`div`,{className:`session-actions`,style:{marginTop:16},children:[(0,$.jsx)(`button`,{className:`btn primary`,onClick:t,children:`Repetir`}),e.kind===`leccion`&&F.result.passed&&w_(e.id)&&(0,$.jsx)(`button`,{className:`btn`,onClick:()=>r(`/simulador/leccion/${w_(e.id)}`),children:`Siguiente lección`}),(0,$.jsx)(`button`,{className:`btn`,onClick:ae,children:`Volver`})]})]})}),(!p||oe)&&!(F&&F.result&&oe)&&(0,$.jsx)(`div`,{className:`sim-overlay`,children:(0,$.jsxs)(`div`,{className:`sim-panel card`,children:[(0,$.jsx)(`h2`,{children:p?`Pausa`:D?D.title:`Conducción libre`}),!p&&D&&(0,$.jsxs)($.Fragment,{children:[D.briefing.map(e=>(0,$.jsx)(`p`,{className:`muted`,style:{marginTop:6},children:e},e)),(0,$.jsx)(`ul`,{className:`sim-result-obj`,children:D.objectiveTexts().map(e=>(0,$.jsxs)(`li`,{children:[`○ `,e]},e))})]}),!p&&!D&&(0,$.jsx)(`p`,{className:`muted`,style:{marginTop:6},children:`Ciudad con calles de uno y dos sentidos, rotonda, barrio en cuesta y autovía con túnel. Turismo manual de 5 marchas. Con tráfico, peatones, semáforos y un instructor que te corrige en tiempo real.`}),d?.gamepad&&(0,$.jsxs)(`p`,{className:`dim`,style:{marginTop:8},children:[`Mando detectado: `,d.gamepad]}),!p&&k&&A&&(0,$.jsxs)(`div`,{className:`sim-scenario-pick`,children:[(0,$.jsxs)(`label`,{children:[(0,$.jsx)(`span`,{className:`dim`,children:`Zona de salida`}),(0,$.jsxs)(`select`,{value:M,onChange:e=>ne(e.target.value),"aria-label":`Zona de salida`,children:[(0,$.jsx)(`option`,{value:`aleatorio`,children:`Aleatorio`}),Xh.map(e=>(0,$.jsx)(`option`,{value:e.id,children:e.name},e.id))]})]}),(0,$.jsxs)(`label`,{children:[(0,$.jsx)(`span`,{className:`dim`,children:`Semilla`}),(0,$.jsx)(`input`,{className:`num`,inputMode:`numeric`,value:ee,onChange:e=>P(e.target.value.replace(/\D/g,``).slice(0,6)),onKeyDown:e=>e.key===`Enter`&&re(),"aria-label":`Semilla`})]}),(0,$.jsx)(`button`,{className:`btn small`,onClick:re,disabled:!l,children:`Usar semilla`}),(0,$.jsxs)(`p`,{className:`dim`,style:{gridColumn:`1 / -1`},children:[`Empiezas en: `,(0,$.jsx)(`b`,{children:Xh.find(e=>e.id===A.zone).name}),` — `,Xh.find(e=>e.id===A.zone).desc,` Tiempo: `,d?.scenario?.weather??``,`.`,M===`aleatorio`?` La zona sale al azar sin repetir las dos últimas.`:` Zona elegida a mano: para repetir, usa la misma zona y semilla.`]})]}),(0,$.jsxs)(`div`,{className:`session-actions`,style:{marginTop:16},children:[(0,$.jsx)(`button`,{className:`btn primary`,onClick:p?()=>l?.setPaused(!1):ie,disabled:!l,children:p?`Continuar`:l?`Empezar`:`Cargando…`}),(0,$.jsx)(`button`,{className:`btn`,onClick:()=>S(e=>!e),children:x?`Ocultar controles`:`Controles`}),(0,$.jsx)(`button`,{className:`btn`,onClick:ae,children:`Salir`})]}),p&&l&&!D&&(0,$.jsxs)(`div`,{className:`sim-options`,children:[(0,$.jsx)(`span`,{className:`dim`,children:`Ir a:`}),l.map.spawns.map(e=>(0,$.jsx)(`button`,{className:`btn small`,onClick:()=>{l.teleport(e.id),l.setPaused(!1)},children:e.name},e.id))]}),(0,$.jsxs)(`label`,{className:`sim-check`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:y,onChange:e=>b(e.target.checked)}),` Mostrar controles táctiles`]}),l&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(`label`,{className:`sim-check`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:d?.clutchAssist??!1,onChange:e=>{l.setClutchAssist(e.target.checked),f(l.hud())}}),` Embrague asistido (pisa y suelta el embrague por ti; tú eliges la marcha)`]}),!D&&(0,$.jsxs)(`label`,{className:`sim-check`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:d?.trafficOn??!0,onChange:e=>{l.setTrafficEnabled(e.target.checked),f(l.hud())}}),` Tráfico y peatones`]}),(0,$.jsxs)(`label`,{className:`sim-check`,children:[(0,$.jsx)(`input`,{type:`checkbox`,checked:d?.instructorOn??!0,onChange:e=>{l.setInstructorEnabled(e.target.checked),f(l.hud())}}),` Instructor (indicaciones en pantalla`,E.current.instructorVoice?` y voz`:``,`)`]})]}),x&&(0,$.jsxs)(`div`,{className:`keys`,children:[pm.map(e=>(0,$.jsxs)(`div`,{className:`key-row`,children:[(0,$.jsx)(`span`,{className:`kbd`,children:e.keys}),(0,$.jsx)(`span`,{children:e.label})]},e.keys)),(0,$.jsx)(`p`,{className:`dim`,style:{marginTop:8},children:`Mando: stick izquierdo dirige, gatillos frenan y aceleran, LB embrague, RB/X suben/bajan marcha, A llave, B freno de mano. Los volantes se detectan con un mapeo genérico (sin probar con hardware real).`})]}),(0,$.jsxs)(`p`,{className:`dim`,style:{marginTop:12},children:[`Calidad gráfica inicial: `,E.current.quality,E.current.shadows?`, con sombras`:``,`; después se ajusta sola según los FPS. Se cambia en Configuración.`]})]})})]})}export{T_ as default};