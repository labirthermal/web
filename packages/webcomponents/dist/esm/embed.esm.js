var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),l=e=>({fromAttribute:t=>t==null||t?.trim().length===0?e:t===`true`,toAttribute:e=>e===!0?`true`:`false`}),u=o(((e,t)=>{t.exports={}})),d=c(o(((e,t,n)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e):typeof define==`function`&&define.amd?define([`exports`],r):(n=typeof globalThis<`u`?globalThis:n||self,r(n.workerpool={}))})(n,(function(e){var t={},n={exports:{}};(function(e){var t=function(e){return e!==void 0&&e.versions!=null&&e.versions.node!=null&&e+``==`[object process]`};e.exports.isNode=t,e.exports.platform=typeof process<`u`&&t(process)?`node`:`browser`;var n=e.exports.platform===`node`&&u();e.exports.isMainThread=e.exports.platform===`node`?(!n||n.isMainThread)&&!process.connected:typeof Window<`u`,e.exports.cpus=e.exports.platform===`browser`?self.navigator.hardwareConcurrency:u().cpus().length})(n);var r=n.exports;function i(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function a(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function o(e,t,n){return t=p(t),y(e,g()?Reflect.construct(t,n||[],p(e).constructor):t.apply(e,n))}function s(e,t){if(!(e instanceof t))throw TypeError(`Cannot call a class as a function`)}function c(e,t,n){if(g())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,t);var i=new(e.bind.apply(e,r));return n&&b(i,n.prototype),i}function l(e,t,n){return Object.defineProperty(e,"prototype",{writable:!1}),e}function d(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(!n){if(Array.isArray(e)||(n=ee(e))||t){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var a,o=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){s=!0,a=e},f:function(){try{o||n.return==null||n.return()}finally{if(s)throw a}}}}function f(e,t,n){return(t=S(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){return p=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},p(e)}function m(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Super expression must either be null or a function`);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}function h(e){try{return Function.toString.call(e).indexOf(`[native code]`)!==-1}catch{return typeof e==`function`}}function g(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(g=function(){return!!e})()}function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?_(Object(n),!0).forEach(function(t){f(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function y(e,t){if(t&&(typeof t==`object`||typeof t==`function`))return t;if(t!==void 0)throw TypeError(`Derived constructors may only return object or undefined`);return a(e)}function b(e,t){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},b(e,t)}function x(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function S(e){var t=x(e,`string`);return typeof t==`symbol`?t:t+``}function C(e){"@babel/helpers - typeof";return C=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},C(e)}function ee(e,t){if(e){if(typeof e==`string`)return i(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function w(e){var t=typeof Map==`function`?new Map:void 0;return w=function(e){if(e===null||!h(e))return e;if(typeof e!=`function`)throw TypeError(`Super expression must either be null or a function`);if(t!==void 0){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return c(e,arguments,p(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),b(n,e)},w(e)}var T={exports:{}},te={},ne;function re(){if(ne)return te;ne=1;function e(i,a){var o=this;if(!(this instanceof e))throw SyntaxError(`Constructor must be called with the new operator`);if(typeof i!=`function`)throw SyntaxError(`Function parameter handler(resolve, reject) missing`);var s=[],c=[];this.resolved=!1,this.rejected=!1,this.pending=!0,this[Symbol.toStringTag]=`Promise`;var l=function(e,t){s.push(e),c.push(t)};this.then=function(n,r){return new e(function(e,i){var a=n?t(n,e,i):e,o=r?t(r,e,i):i;l(a,o)},o)};var u=function(e){return o.resolved=!0,o.rejected=!1,o.pending=!1,s.forEach(function(t){t(e)}),l=function(t,n){t(e)},u=d=function(){},o},d=function(e){return o.resolved=!1,o.rejected=!0,o.pending=!1,c.forEach(function(t){t(e)}),l=function(t,n){n(e)},u=d=function(){},o};this.cancel=function(){return a?a.cancel():d(new n),o},this.timeout=function(e){if(a)a.timeout(e);else{var t=setTimeout(function(){d(new r(`Promise timed out after `+e+` ms`))},e);o.always(function(){clearTimeout(t)})}return o},i(function(e){u(e)},function(e){d(e)})}function t(e,t,n){return function(r){try{var i=e(r);i&&typeof i.then==`function`&&typeof i.catch==`function`?i.then(t,n):t(i)}catch(e){n(e)}}}e.prototype.catch=function(e){return this.then(null,e)},e.prototype.always=function(e){return this.then(e,e)},e.prototype.finally=function(t){var n=this,r=function(){return new e(function(e){return e()}).then(t).then(function(){return n})};return this.then(r,r)},e.all=function(t){return new e(function(e,n){var r=t.length,i=[];r?t.forEach(function(t,a){t.then(function(t){i[a]=t,r--,r==0&&e(i)},function(e){r=0,n(e)})}):e(i)})},e.defer=function(){var t={};return t.promise=new e(function(e,n){t.resolve=e,t.reject=n}),t};function n(e){this.message=e||`promise cancelled`,this.stack=Error().stack}n.prototype=Error(),n.prototype.constructor=Error,n.prototype.name=`CancellationError`,e.CancellationError=n;function r(e){this.message=e||`timeout exceeded`,this.stack=Error().stack}return r.prototype=Error(),r.prototype.constructor=Error,r.prototype.name=`TimeoutError`,e.TimeoutError=r,te.Promise=e,te}var ie={};ie.validateOptions=function(e,t,n){if(e){var r=e?Object.keys(e):[],i=r.find(function(e){return!t.includes(e)});if(i)throw Error(`Object "`+n+`" contains an unknown option "`+i+`"`);var a=t.find(function(e){return Object.prototype[e]&&!r.includes(e)});if(a)throw Error(`Object "`+n+`" contains an inherited option "`+a+`" which is not defined in the object itself but in its prototype. Only plain objects are allowed. Please remove the option from the prototype or override it with a value "undefined".`);return e}},ie.workerOptsNames=[`credentials`,`name`,`type`],ie.forkOptsNames=[`cwd`,`detached`,`env`,`execPath`,`execArgv`,`gid`,`serialization`,`signal`,`killSignal`,`silent`,`stdio`,`uid`,`windowsVerbatimArguments`,`timeout`],ie.workerThreadOptsNames=[`argv`,`env`,`eval`,`execArgv`,`stdin`,`stdout`,`stderr`,`workerData`,`trackUnmanagedFds`,`transferList`,`resourceLimits`,`name`];var ae,oe;function se(){return oe||(oe=1,ae=`!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).worker=n()}(this,function(){"use strict";function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}function n(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t={};var r=function(e,n){this.message=e,this.transfer=n},o={};function i(e,n){var t=this;if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if("function"!=typeof e)throw new SyntaxError("Function parameter handler(resolve, reject) missing");var r=[],o=[];this.resolved=!1,this.rejected=!1,this.pending=!0,this[Symbol.toStringTag]="Promise";var a=function(e,n){r.push(e),o.push(n)};this.then=function(e,n){return new i(function(t,r){var o=e?s(e,t,r):t,i=n?s(n,t,r):r;a(o,i)},t)};var f=function(e){return t.resolved=!0,t.rejected=!1,t.pending=!1,r.forEach(function(n){n(e)}),a=function(n,t){n(e)},f=d=function(){},t},d=function(e){return t.resolved=!1,t.rejected=!0,t.pending=!1,o.forEach(function(n){n(e)}),a=function(n,t){t(e)},f=d=function(){},t};this.cancel=function(){return n?n.cancel():d(new u),t},this.timeout=function(e){if(n)n.timeout(e);else{var r=setTimeout(function(){d(new c("Promise timed out after "+e+" ms"))},e);t.always(function(){clearTimeout(r)})}return t},e(function(e){f(e)},function(e){d(e)})}function s(e,n,t){return function(r){try{var o=e(r);o&&"function"==typeof o.then&&"function"==typeof o.catch?o.then(n,t):n(o)}catch(e){t(e)}}}function u(e){this.message=e||"promise cancelled",this.stack=(new Error).stack}function c(e){this.message=e||"timeout exceeded",this.stack=(new Error).stack}return i.prototype.catch=function(e){return this.then(null,e)},i.prototype.always=function(e){return this.then(e,e)},i.prototype.finally=function(e){var n=this,t=function(){return new i(function(e){return e()}).then(e).then(function(){return n})};return this.then(t,t)},i.all=function(e){return new i(function(n,t){var r=e.length,o=[];r?e.forEach(function(e,i){e.then(function(e){o[i]=e,0==--r&&n(o)},function(e){r=0,t(e)})}):n(o)})},i.defer=function(){var e={};return e.promise=new i(function(n,t){e.resolve=n,e.reject=t}),e},u.prototype=new Error,u.prototype.constructor=Error,u.prototype.name="CancellationError",i.CancellationError=u,c.prototype=new Error,c.prototype.constructor=Error,c.prototype.name="TimeoutError",i.TimeoutError=c,o.Promise=i,function(n){var t=r,i=o.Promise,s="__workerpool-cleanup__",u={exit:function(){}},c={addAbortListener:function(e){u.abortListeners.push(e)},emit:u.emit};if("undefined"!=typeof self&&"function"==typeof postMessage&&"function"==typeof addEventListener)u.on=function(e,n){addEventListener(e,function(e){n(e.data)})},u.send=function(e,n){n?postMessage(e,n):postMessage(e)};else{if("undefined"==typeof process)throw new Error("Script must be executed as a worker");var a;try{a=require("worker_threads")}catch(n){if("object"!==e(n)||null===n||"MODULE_NOT_FOUND"!==n.code)throw n}if(a&&null!==a.parentPort){var f=a.parentPort;u.send=f.postMessage.bind(f),u.on=f.on.bind(f),u.exit=process.exit.bind(process)}else u.on=process.on.bind(process),u.send=function(e){process.send(e)},u.on("disconnect",function(){process.exit(1)}),u.exit=process.exit.bind(process)}function d(e){return e&&e.toJSON?JSON.parse(JSON.stringify(e)):JSON.parse(JSON.stringify(e,Object.getOwnPropertyNames(e)))}function l(e){return e&&"function"==typeof e.then&&"function"==typeof e.catch}u.methods={},u.methods.run=function(e,n){var t=new Function("return ("+e+").apply(this, arguments);");return t.worker=c,t.apply(t,n)},u.methods.methods=function(){return Object.keys(u.methods)},u.terminationHandler=void 0,u.abortListenerTimeout=1e3,u.abortListeners=[],u.terminateAndExit=function(e){var n=function(){u.exit(e)};if(!u.terminationHandler)return n();var t=u.terminationHandler(e);return l(t)?(t.then(n,n),t):(n(),new i(function(e,n){n(new Error("Worker terminating"))}))},u.cleanup=function(e){if(!u.abortListeners.length)return u.send({id:e,method:s,error:d(new Error("Worker terminating"))}),new i(function(e){e()});var n,t=u.abortListeners.map(function(e){return e()}),r=new i(function(e,t){n=setTimeout(function(){t(new Error("Timeout occurred waiting for abort handler, killing worker"))},u.abortListenerTimeout)}),o=i.all(t).then(function(){clearTimeout(n),u.abortListeners.length&&(u.abortListeners=[])},function(){clearTimeout(n),u.exit()});return new i(function(e,n){o.then(e,n),r.then(e,n)}).then(function(){u.send({id:e,method:s,error:null})},function(n){u.send({id:e,method:s,error:n?d(n):null})})};var p=null;u.on("message",function(e){if("__workerpool-terminate__"===e)return u.terminateAndExit(0);if(e.method===s)return u.cleanup(e.id);try{var n=u.methods[e.method];if(!n)throw new Error('Unknown method "'+e.method+'"');p=e.id;var r=n.apply(n,e.params);l(r)?r.then(function(n){n instanceof t?u.send({id:e.id,result:n.message,error:null},n.transfer):u.send({id:e.id,result:n,error:null}),p=null}).catch(function(n){u.send({id:e.id,result:null,error:d(n)}),p=null}):(r instanceof t?u.send({id:e.id,result:r.message,error:null},r.transfer):u.send({id:e.id,result:r,error:null}),p=null)}catch(n){u.send({id:e.id,result:null,error:d(n)})}}),u.register=function(e,n){if(e)for(var t in e)e.hasOwnProperty(t)&&(u.methods[t]=e[t],u.methods[t].worker=c);n&&(u.terminationHandler=n.onTerminate,u.abortListenerTimeout=n.abortListenerTimeout||1e3),u.send("ready")},u.emit=function(e){if(p){if(e instanceof t)return void u.send({id:p,isEvent:!0,payload:e.message},e.transfer);u.send({id:p,isEvent:!0,payload:e})}},n.add=u.register,n.emit=u.emit}(t),n(t)});
//# sourceMappingURL=worker.min.js.map
`),ae}var ce=re().Promise,le=r,ue=ie.validateOptions,de=ie.forkOptsNames,fe=ie.workerThreadOptsNames,pe=ie.workerOptsNames,me=`__workerpool-terminate__`,he=`__workerpool-cleanup__`;function ge(){var e=ve();if(!e)throw Error(`WorkerPool: workerType = 'thread' is not supported, Node >= 11.7.0 required`);return e}function _e(){if(typeof Worker!=`function`&&((typeof Worker>`u`?`undefined`:C(Worker))!==`object`||typeof Worker.prototype.constructor!=`function`))throw Error(`WorkerPool: Web Workers not supported`)}function ve(){try{return u()}catch(e){if(C(e)===`object`&&e!==null&&e.code===`MODULE_NOT_FOUND`)return null;throw e}}function ye(){if(le.platform===`browser`){if(typeof Blob>`u`)throw Error(`Blob not supported by the browser`);if(!window.URL||typeof window.URL.createObjectURL!=`function`)throw Error(`URL.createObjectURL not supported by the browser`);var e=new Blob([se()],{type:`text/javascript`});return window.URL.createObjectURL(e)}return __dirname+`/worker.js`}function be(e,t){if(t.workerType===`web`)return _e(),xe(e,t.workerOpts,Worker);if(t.workerType===`thread`)return n=ge(),Se(e,n,t);if(t.workerType===`process`||!t.workerType)return Ce(e,we(t),u());if(le.platform===`browser`)return _e(),xe(e,t.workerOpts,Worker);var n=ve();return n?Se(e,n,t):Ce(e,we(t),u())}function xe(e,t,n){ue(t,pe,`workerOpts`);var r=new n(e,t);return r.isBrowserWorker=!0,r.on=function(e,t){this.addEventListener(e,function(e){t(e.data)})},r.send=function(e,t){this.postMessage(e,t)},r}function Se(e,t,n){ue(n?.workerThreadOpts,fe,`workerThreadOpts`);var r=new t.Worker(e,v({stdout:n?.emitStdStreams??!1,stderr:n?.emitStdStreams??!1},n?.workerThreadOpts));return r.isWorkerThread=!0,r.send=function(e,t){this.postMessage(e,t)},r.kill=function(){return this.terminate(),!0},r.disconnect=function(){this.terminate()},n!=null&&n.emitStdStreams&&(r.stdout.on(`data`,function(e){return r.emit(`stdout`,e)}),r.stderr.on(`data`,function(e){return r.emit(`stderr`,e)})),r}function Ce(e,t,n){ue(t.forkOpts,de,`forkOpts`);var r=n.fork(e,t.forkArgs,t.forkOpts),i=r.send;return r.send=function(e){return i.call(r,e)},t.emitStdStreams&&(r.stdout.on(`data`,function(e){return r.emit(`stdout`,e)}),r.stderr.on(`data`,function(e){return r.emit(`stderr`,e)})),r.isChildProcess=!0,r}function we(e){e||={};var t=process.execArgv.join(` `),n=t.indexOf(`--inspect`)!==-1,r=t.indexOf(`--debug-brk`)!==-1,i=[];return n&&(i.push(`--inspect=`+e.debugPort),r&&i.push(`--debug-brk`)),process.execArgv.forEach(function(e){e.indexOf(`--max-old-space-size`)>-1&&i.push(e)}),Object.assign({},e,{forkArgs:e.forkArgs,forkOpts:Object.assign({},e.forkOpts,{execArgv:(e.forkOpts&&e.forkOpts.execArgv||[]).concat(i),stdio:e.emitStdStreams?`pipe`:void 0})})}function Te(e){for(var t=Error(``),n=Object.keys(e),r=0;r<n.length;r++)t[n[r]]=e[n[r]];return t}function Ee(e,t){Object.values(e.processing).forEach(function(e){var n;return e==null||(n=e.options)==null?void 0:n.on(t)}),Object.values(e.tracking).forEach(function(e){var n;return e==null||(n=e.options)==null?void 0:n.on(t)})}function De(e,t){var n=this,r=t||{};this.script=e||ye(),this.worker=be(this.script,r),this.debugPort=r.debugPort,this.forkOpts=r.forkOpts,this.forkArgs=r.forkArgs,this.workerOpts=r.workerOpts,this.workerThreadOpts=r.workerThreadOpts,this.workerTerminateTimeout=r.workerTerminateTimeout,e||(this.worker.ready=!0),this.requestQueue=[],this.worker.on(`stdout`,function(e){Ee(n,{stdout:e.toString()})}),this.worker.on(`stderr`,function(e){Ee(n,{stderr:e.toString()})}),this.worker.on(`message`,function(e){if(!n.terminated){if(typeof e==`string`&&e===`ready`)n.worker.ready=!0,a();else{var t=e.id,r=n.processing[t];if(r!==void 0)e.isEvent?r.options&&typeof r.options.on==`function`&&r.options.on(e.payload):(delete n.processing[t],n.terminating===!0&&n.terminate(),e.error?r.resolver.reject(Te(e.error)):r.resolver.resolve(e.result));else{var r=n.tracking[t];r!==void 0&&e.isEvent&&r.options&&typeof r.options.on==`function`&&r.options.on(e.payload)}if(e.method===he){var i=n.tracking[e.id];i!==void 0&&(e.error?(clearTimeout(i.timeoutId),i.resolver.reject(Te(e.error))):(n.tracking&&clearTimeout(i.timeoutId),i.resolver.reject(new Oe(i.error)))),delete n.tracking[t]}}}});function i(e){for(var t in n.terminated=!0,n.processing)n.processing[t]!==void 0&&n.processing[t].resolver.reject(e);n.processing=Object.create(null)}function a(){var e=d(n.requestQueue.splice(0)),t;try{for(e.s();!(t=e.n()).done;){var r=t.value;n.worker.send(r.message,r.transfer)}}catch(t){e.e(t)}finally{e.f()}}var o=this.worker;this.worker.on(`error`,function(e){i(new ke(`Workerpool Worker error: `+(e&&e.message?e.message:String(e||`Unknown worker error`)),e))}),this.worker.on(`exit`,function(e,t){var r=`Workerpool Worker terminated Unexpectedly
`;r+="    exitCode: `"+e+`\`
`,r+="    signalCode: `"+t+`\`
`,r+="    workerpool.script: `"+n.script+`\`
`,r+="    spawnArgs: `"+o.spawnargs+`\`
`,r+="    spawnfile: `"+o.spawnfile+`\`
`,r+="    stdout: `"+o.stdout+`\`
`,r+="    stderr: `"+o.stderr+`\`
`,i(new ke(r))}),this.processing=Object.create(null),this.tracking=Object.create(null),this.terminating=!1,this.terminated=!1,this.cleaning=!1,this.terminationHandler=null,this.lastId=0}De.prototype.methods=function(){return this.exec(`methods`)},De.prototype.exec=function(e,t,n,r){n||=ce.defer();var i=++this.lastId;this.processing[i]={id:i,resolver:n,options:r};var a={message:{id:i,method:e,params:t},transfer:r&&r.transfer};this.terminated?n.reject(new ke(`Worker is terminated`)):this.worker.ready?this.worker.send(a.message,a.transfer):this.requestQueue.push(a);var o=this;return n.promise.catch(function(e){if(e instanceof ce.CancellationError||e instanceof ce.TimeoutError)return o.tracking[i]={id:i,resolver:ce.defer(),options:r,error:e},delete o.processing[i],o.tracking[i].resolver.promise=o.tracking[i].resolver.promise.catch(function(e){if(delete o.tracking[i],e instanceof Oe)throw e.error;return o.terminateAndNotify(!0).then(function(){throw e},function(e){throw e})}),o.worker.send({id:i,method:he}),o.tracking[i].timeoutId=setTimeout(function(){o.tracking[i].resolver.reject(e)},o.workerTerminateTimeout),o.tracking[i].resolver.promise;throw e})},De.prototype.busy=function(){return this.cleaning||Object.keys(this.processing).length>0||Object.keys(this.tracking).length>0},De.prototype.terminate=function(e,t){var n=this;if(e){for(var r in this.processing)this.processing[r]!==void 0&&this.processing[r].resolver.reject(Error(`Worker terminated`));this.processing=Object.create(null)}for(var i=0,a=Object.values(n.tracking);i<a.length;i++){var o=a[i];clearTimeout(o.timeoutId),o.resolver.reject(Error(`Worker Terminating`))}if(n.tracking=Object.create(null),typeof t==`function`&&(this.terminationHandler=t),this.busy())this.terminating=!0;else{var s=function(e){if(n.terminated=!0,n.cleaning=!1,n.worker!=null&&n.worker.removeAllListeners&&n.worker.removeAllListeners(`message`),n.worker=null,n.terminating=!1,n.terminationHandler)n.terminationHandler(e,n);else if(e)throw e};if(this.worker){if(typeof this.worker.kill==`function`){if(this.worker.killed){s(Error(`worker already killed!`));return}var c=setTimeout(function(){n.worker&&n.worker.kill()},this.workerTerminateTimeout);this.worker.once(`exit`,function(){clearTimeout(c),n.worker&&(n.worker.killed=!0),s()}),this.worker.ready?this.worker.send(me):this.requestQueue.push({message:me}),this.cleaning=!0;return}if(typeof this.worker.terminate==`function`)this.worker.terminate(),this.worker.killed=!0;else throw Error(`Failed to terminate worker`)}s()}},De.prototype.terminateAndNotify=function(e,t){var n=ce.defer();return t&&n.promise.timeout(t),this.terminate(e,function(e,t){e?n.reject(e):n.resolve(t)}),n.promise};function Oe(e){this.error=e,this.stack=Error().stack}var ke=function(e){function t(e,n){var r;return s(this,t),r=o(this,t,[e||`worker terminated`]),r.cause=n,r}return m(t,e),l(t)}(w(Error));T.exports=De,T.exports._tryRequireWorkerThreads=ve,T.exports._setupProcessWorker=Ce,T.exports._setupBrowserWorker=xe,T.exports._setupWorkerThreadWorker=Se,T.exports.ensureWorkerThreads=ge,T.exports.TerminateError=ke;var Ae=T.exports,je,Me;function Ne(){if(Me)return je;Me=1;function e(){this.tasks=[]}e.prototype.push=function(e){this.tasks.push(e)},e.prototype.pop=function(){return this.tasks.shift()},e.prototype.size=function(){return this.tasks.length},e.prototype.contains=function(e){return this.tasks.includes(e)},e.prototype.clear=function(){this.tasks.length=0};function t(){this.tasks=[]}return t.prototype.push=function(e){this.tasks.push(e)},t.prototype.pop=function(){return this.tasks.pop()},t.prototype.size=function(){return this.tasks.length},t.prototype.contains=function(e){return this.tasks.includes(e)},t.prototype.clear=function(){this.tasks.length=0},je={FIFOQueue:e,LIFOQueue:t},je}var Pe,Fe;function Ie(){if(Fe)return Pe;Fe=1;var e=65535;Pe=t;function t(){this.ports=Object.create(null),this.length=0}return t.prototype.nextAvailableStartingAt=function(t){for(;this.ports[t]===!0;)t++;if(t>=e)throw Error(`WorkerPool debug port limit reached: `+t+`>= `+e);return this.ports[t]=!0,this.length++,t},t.prototype.releasePort=function(e){delete this.ports[e],this.length--},Pe}var Le,Re;function ze(){if(Re)return Le;Re=1;var e=re().Promise,t=Ae,n=r,i=Ne(),a=i.FIFOQueue,o=i.LIFOQueue,s=new(Ie());function c(e,r){typeof e==`string`?this.script=e||null:(this.script=null,r=e),this.workers=[],this.taskQueue=this._createQueue(r&&r.queueStrategy||`fifo`),r||={},this.forkArgs=Object.freeze(r.forkArgs||[]),this.forkOpts=Object.freeze(r.forkOpts||{}),this.workerOpts=Object.freeze(r.workerOpts||{}),this.workerThreadOpts=Object.freeze(r.workerThreadOpts||{}),this.debugPortStart=r.debugPortStart||43210,this.nodeWorker=r.nodeWorker,this.workerType=r.workerType||r.nodeWorker||`auto`,this.maxQueueSize=r.maxQueueSize||1/0,this.workerTerminateTimeout=r.workerTerminateTimeout||1e3,this.onCreateWorker=r.onCreateWorker||function(){return null},this.onTerminateWorker=r.onTerminateWorker||function(){return null},this.emitStdStreams=r.emitStdStreams||!1,r&&`maxWorkers`in r?(l(r.maxWorkers),this.maxWorkers=r.maxWorkers):this.maxWorkers=Math.max((n.cpus||4)-1,1),r&&`minWorkers`in r&&(r.minWorkers===`max`?this.minWorkers=this.maxWorkers:(u(r.minWorkers),this.minWorkers=r.minWorkers,this.maxWorkers=Math.max(this.minWorkers,this.maxWorkers)),this._ensureMinWorkers()),this._boundNext=this._next.bind(this),this.workerType===`thread`&&t.ensureWorkerThreads()}c.prototype.exec=function(t,n,r){if(n&&!Array.isArray(n))throw TypeError(`Array expected as argument "params"`);if(typeof t==`string`){var i=e.defer();if(this.taskQueue.size()>=this.maxQueueSize)throw Error(`Max queue size of `+this.maxQueueSize+` reached`);var a={method:t,params:n,resolver:i,timeout:null,options:r};this.taskQueue.push(a);var o=i.promise.timeout,s=this.taskQueue;return i.promise.timeout=function(e){return s.contains(a)?(a.timeout=e,i.promise):o.call(i.promise,e)},this._next(),i.promise}if(typeof t==`function`)return this.exec(`run`,[String(t),n],r);throw TypeError(`Function or string expected as argument "method"`)},c.prototype.proxy=function(){if(arguments.length>0)throw Error(`No arguments expected`);var e=this;return this.exec(`methods`).then(function(t){var n={};return t.forEach(function(t){n[t]=function(){return e.exec(t,Array.prototype.slice.call(arguments))}}),n})},c.prototype._next=function(){if(this.taskQueue.size()>0){var e=this._getWorker();if(e){var t=this,n=this.taskQueue.pop();if(n.resolver.promise.pending){var r=e.exec(n.method,n.params,n.resolver,n.options).then(t._boundNext).catch(function(){if(e.terminated)return t._removeWorker(e)}).then(function(){t._next()});typeof n.timeout==`number`&&r.timeout(n.timeout)}else t._next()}}},c.prototype._getWorker=function(){for(var e=this.workers,t=0;t<e.length;t++){var n=e[t];if(n.busy()===!1)return n}return e.length<this.maxWorkers?(n=this._createWorkerHandler(),e.push(n),n):null},c.prototype._removeWorker=function(t){var n=this;return s.releasePort(t.debugPort),this._removeWorkerFromList(t),this._ensureMinWorkers(),new e(function(e,r){t.terminate(!1,function(i){n.onTerminateWorker({forkArgs:t.forkArgs,forkOpts:t.forkOpts,workerThreadOpts:t.workerThreadOpts,script:t.script}),i?r(i):e(t)})})},c.prototype._removeWorkerFromList=function(e){var t=this.workers.indexOf(e);t!==-1&&this.workers.splice(t,1)},c.prototype.terminate=function(t,n){for(var r=this,i=this.taskQueue;i.size()>0;){var a=i.pop();if(a)a.resolver.reject(Error(`Pool terminated`));else break}i.clear();var o=function(e){s.releasePort(e.debugPort),this._removeWorkerFromList(e)}.bind(this),c=[];return this.workers.slice().forEach(function(e){var i=e.terminateAndNotify(t,n).then(o).always(function(){r.onTerminateWorker({forkArgs:e.forkArgs,forkOpts:e.forkOpts,workerThreadOpts:e.workerThreadOpts,script:e.script})});c.push(i)}),e.all(c)},c.prototype.stats=function(){var e=this.workers.length,t=this.workers.filter(function(e){return e.busy()}).length;return{totalWorkers:e,busyWorkers:t,idleWorkers:e-t,pendingTasks:this.taskQueue.size(),activeTasks:t}},c.prototype._ensureMinWorkers=function(){if(this.minWorkers)for(var e=this.workers.length;e<this.minWorkers;e++)this.workers.push(this._createWorkerHandler())},c.prototype._createWorkerHandler=function(){var e=this.onCreateWorker({forkArgs:this.forkArgs,forkOpts:this.forkOpts,workerOpts:this.workerOpts,workerThreadOpts:this.workerThreadOpts,script:this.script})||{};return new t(e.script||this.script,{forkArgs:e.forkArgs||this.forkArgs,forkOpts:e.forkOpts||this.forkOpts,workerOpts:e.workerOpts||this.workerOpts,workerThreadOpts:e.workerThreadOpts||this.workerThreadOpts,debugPort:s.nextAvailableStartingAt(this.debugPortStart),workerType:this.workerType,workerTerminateTimeout:this.workerTerminateTimeout,emitStdStreams:this.emitStdStreams})},c.prototype._createQueue=function(e){if(typeof e==`string`)switch(e){case`fifo`:return new a;case`lifo`:return new o;default:throw Error(`Unknown queue strategy: `+e)}if(!e)throw Error(`Queue strategy cannot be null or undefined`);for(var t=[`push`,`pop`,`size`,`contains`,`clear`],n=0;n<t.length;n++){var r=t[n];if(typeof e[r]!=`function`)throw Error(`Queue strategy must implement method: `+r)}return e};function l(e){if(!d(e)||!f(e)||e<1)throw TypeError(`Option maxWorkers must be an integer number >= 1`)}function u(e){if(!d(e)||!f(e)||e<0)throw TypeError(`Option minWorkers must be an integer number >= 0`)}function d(e){return typeof e==`number`}function f(e){return Math.round(e)==e}return Le=c,Le}var Be={},Ve,He;function Ue(){if(He)return Ve;He=1;function e(e,t){this.message=e,this.transfer=t}return Ve=e,Ve}var We;function Ge(){return We||(We=1,(function(e){var t=Ue(),n=re().Promise,r=`__workerpool-terminate__`,i=`__workerpool-cleanup__`,a=1e3,o={exit:function(){}},s={addAbortListener:function(e){o.abortListeners.push(e)},emit:o.emit};if(typeof self<`u`&&typeof postMessage==`function`&&typeof addEventListener==`function`)o.on=function(e,t){addEventListener(e,function(e){t(e.data)})},o.send=function(e,t){t?postMessage(e,t):postMessage(e)};else if(typeof process<`u`){var c;try{c=u()}catch(e){if(C(e)!==`object`||e===null||e.code!==`MODULE_NOT_FOUND`)throw e}if(c&&c.parentPort!==null){var l=c.parentPort;o.send=l.postMessage.bind(l),o.on=l.on.bind(l),o.exit=process.exit.bind(process)}else o.on=process.on.bind(process),o.send=function(e){process.send(e)},o.on(`disconnect`,function(){process.exit(1)}),o.exit=process.exit.bind(process)}else throw Error(`Script must be executed as a worker`);function d(e){return e&&e.toJSON?JSON.parse(JSON.stringify(e)):JSON.parse(JSON.stringify(e,Object.getOwnPropertyNames(e)))}function f(e){return e&&typeof e.then==`function`&&typeof e.catch==`function`}o.methods={},o.methods.run=function(e,t){var n=Function(`return (`+e+`).apply(this, arguments);`);return n.worker=s,n.apply(n,t)},o.methods.methods=function(){return Object.keys(o.methods)},o.terminationHandler=void 0,o.abortListenerTimeout=a,o.abortListeners=[],o.terminateAndExit=function(e){var t=function(){o.exit(e)};if(!o.terminationHandler)return t();var r=o.terminationHandler(e);return f(r)?(r.then(t,t),r):(t(),new n(function(e,t){t(Error(`Worker terminating`))}))},o.cleanup=function(e){if(!o.abortListeners.length)return o.send({id:e,method:i,error:d(Error(`Worker terminating`))}),new n(function(e){e()});var t=function(){o.exit()},r=function(){o.abortListeners.length&&(o.abortListeners=[])},a=o.abortListeners.map(function(e){return e()}),s,c=new n(function(e,t){s=setTimeout(function(){t(Error(`Timeout occurred waiting for abort handler, killing worker`))},o.abortListenerTimeout)}),l=n.all(a).then(function(){clearTimeout(s),r()},function(){clearTimeout(s),t()});return new n(function(e,t){l.then(e,t),c.then(e,t)}).then(function(){o.send({id:e,method:i,error:null})},function(t){o.send({id:e,method:i,error:t?d(t):null})})};var p=null;o.on(`message`,function(e){if(e===r)return o.terminateAndExit(0);if(e.method===i)return o.cleanup(e.id);try{var n=o.methods[e.method];if(n){p=e.id;var a=n.apply(n,e.params);f(a)?a.then(function(n){n instanceof t?o.send({id:e.id,result:n.message,error:null},n.transfer):o.send({id:e.id,result:n,error:null}),p=null}).catch(function(t){o.send({id:e.id,result:null,error:d(t)}),p=null}):(a instanceof t?o.send({id:e.id,result:a.message,error:null},a.transfer):o.send({id:e.id,result:a,error:null}),p=null)}else throw Error(`Unknown method "`+e.method+`"`)}catch(t){o.send({id:e.id,result:null,error:d(t)})}}),o.register=function(e,t){if(e)for(var n in e)e.hasOwnProperty(n)&&(o.methods[n]=e[n],o.methods[n].worker=s);t&&(o.terminationHandler=t.onTerminate,o.abortListenerTimeout=t.abortListenerTimeout||a),o.send(`ready`)},o.emit=function(e){if(p){if(e instanceof t){o.send({id:p,isEvent:!0,payload:e.message},e.transfer);return}o.send({id:p,isEvent:!0,payload:e})}},e.add=o.register,e.emit=o.emit})(Be)),Be}var Ke=r.platform,qe=r.isMainThread,Je=r.cpus,Ye=Ae.TerminateError;function Xe(e,t){return new(ze())(e,t)}var Ze=t.pool=Xe;function Qe(e,t){Ge().add(e,t)}var $e=t.worker=Qe;function et(e){Ge().emit(e)}var tt=t.workerEmit=et,nt=t.Promise=re().Promise,rt=t.Transfer=Ue(),it=t.platform=Ke,at=t.isMainThread=qe,E=t.cpus=Je,ot=t.TerminateError=Ye;e.Promise=nt,e.TerminateError=ot,e.Transfer=rt,e.cpus=E,e.default=t,e.isMainThread=at,e.platform=it,e.pool=Ze,e.worker=$e,e.workerEmit=tt,Object.defineProperty(e,"__esModule",{value:!0})}))}))(),1),f;(e=>{e.csv=`text/csv`,e.tsv=`text/tab-separated-values`,e.plain=`text/plain`})(f||={});var p=e=>e,m=e=>e,h=p,g=p,_=p,v=p,y=p,b={fieldSeparator:`,`,decimalSeparator:`.`,quoteStrings:!0,quoteCharacter:`"`,showTitle:!1,title:`My Generated Report`,filename:`generated`,showColumnHeaders:!0,useTextFile:!1,fileExtension:`csv`,mediaType:`text/csv`,useBom:!0,columnHeaders:[],useKeysAsHeaders:!1,boolDisplay:{true:`TRUE`,false:`FALSE`},replaceUndefinedWith:``,escapeFormulas:!1},x=`\r
`,S=`﻿`,C=e=>Object.assign({},b,e),ee=class extends Error{constructor(e){super(e),this.name=`CsvGenerationError`}},w=class extends Error{constructor(e){super(e),this.name=`EmptyHeadersError`}},T=class extends Error{constructor(e){super(e),this.name=`CsvDownloadEnvironmentError`}},te=class extends Error{constructor(e){super(e),this.name=`UnsupportedDataFormatError`}},ne=e=>v(typeof e==`object`?e.key:e),re=e=>y(typeof e==`object`?e.displayLabel:e),ie=(e,...t)=>t.reduce((e,t)=>t(e),e),ae=e=>t=>e.useBom?g(m(t)+S):t,oe=e=>t=>e.showTitle?se(g(m(t)+e.title))(_(``)):t,se=e=>t=>g(m(e)+m(t)+x),ce=e=>(t,n)=>le(e)(_(m(t)+m(n))),le=e=>t=>p(m(t)+e.fieldSeparator),ue=(e,t)=>n=>{if(!e.showColumnHeaders)return n;if(t.length<1)throw new w(`Option to show headers but none supplied. Make sure there are keys in your collection or that you've supplied headers through the config options.`);let r=_(``);for(let n=0;n<t.length;n++){let i=re(t[n]);r=ce(e)(r,ye(e,m(i)))}return r=_(m(r).slice(0,-1)),se(n)(r)},de=(e,t,n)=>r=>{let i=r;for(let r=0;r<n.length;r++){let a=_(``);for(let i=0;i<t.length;i++){let o=ne(t[i]),s=n[r][m(o)];a=ce(e)(a,ye(e,s))}a=_(m(a).slice(0,-1)),i=se(i)(a)}return i},fe=e=>+e===e&&(!Number.isFinite(e)||!!(e%1)),pe=e=>new RegExp(/^[=+\-@\t\r]/).test(e),me=e=>pe(e)?`'${e}`:e,he=(e,t)=>{if(fe(t)){if(e.decimalSeparator===`locale`)return h(t.toLocaleString());if(e.decimalSeparator)return h(t.toString().replace(`.`,e.decimalSeparator))}return h(t.toString())},ge=(e,t)=>{let n=t;return e.escapeFormulas&&(n=me(t)),(e.quoteStrings||e.fieldSeparator&&t.indexOf(e.fieldSeparator)>-1||e.quoteCharacter&&t.indexOf(e.quoteCharacter)>-1||t.indexOf(`
`)>-1||t.indexOf(`\r`)>-1)&&(n=e.quoteCharacter+be(n,e.quoteCharacter)+e.quoteCharacter),h(n)},_e=(e,t)=>{let n=t?`true`:`false`;return h(e.boolDisplay[n])},ve=(e,t)=>typeof t>`u`&&e.replaceUndefinedWith!==void 0?ge(e,e.replaceUndefinedWith+``):t===null?ge(e,`null`):ge(e,``),ye=(e,t)=>{if(typeof t==`number`)return he(e,t);if(typeof t==`string`)return ge(e,t);if(typeof t==`boolean`&&e.boolDisplay)return _e(e,t);if(t===null||typeof t>`u`)return ve(e,t);throw new te(`
    typeof ${typeof t} isn't supported. Only number, string, boolean, null and undefined are supported.
    Please convert the data in your object to one of those before generating the CSV.
    `)};function be(e,t){return t===`"`&&e.indexOf(`"`)>-1?e.replace(/"/g,`""`):e}var xe=e=>t=>{let n=C(e),r=n.useKeysAsHeaders?Object.keys(t[0]):n.columnHeaders,i=ie(g(``),ae(n),oe(n),ue(n,r),de(n,r,t));if(m(i).length<1)throw new ee(`Output is empty. Is your data formatted correctly?`);return i},Se=e=>t=>{let n=C(e),r=m(t),i=n.useTextFile?`text/plain`:n.mediaType;return new Blob([r],{type:`${i};charset=utf8;`})},Ce=e=>t=>{if(!window)throw new T(`Downloading only supported in a browser environment.`);let n=Se(e)(t),r=C(e),i=r.useTextFile?`txt`:r.fileExtension,a=`${r.filename}.${i}`,o=document.createElement(`a`);o.download=a,o.href=URL.createObjectURL(n),o.setAttribute(`visibility`,`hidden`),document.body.appendChild(o),o.click(),document.body.removeChild(o)},we=6048e5,Te=864e5,Ee=Symbol.for(`constructDateFrom`);function De(e,t){return typeof e==`function`?e(t):e&&typeof e==`object`&&Ee in e?e[Ee](t):e instanceof Date?new e.constructor(t):new Date(t)}function Oe(e,t){return De(t||e,e)}var ke={};function Ae(){return ke}function je(e,t){let n=Ae(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,i=Oe(e,t?.in),a=i.getDay(),o=(a<r?7:0)+a-r;return i.setDate(i.getDate()-o),i.setHours(0,0,0,0),i}function Me(e,t){return je(e,{...t,weekStartsOn:1})}function Ne(e,t){let n=Oe(e,t?.in),r=n.getFullYear(),i=De(n,0);i.setFullYear(r+1,0,4),i.setHours(0,0,0,0);let a=Me(i),o=De(n,0);o.setFullYear(r,0,4),o.setHours(0,0,0,0);let s=Me(o);return n.getTime()>=a.getTime()?r+1:n.getTime()>=s.getTime()?r:r-1}function Pe(e){let t=Oe(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-n}function Fe(e,...t){let n=De.bind(null,e||t.find(e=>typeof e==`object`));return t.map(n)}function Ie(e,t){let n=Oe(e,t?.in);return n.setHours(0,0,0,0),n}function Le(e,t,n){let[r,i]=Fe(n?.in,e,t),a=Ie(r),o=Ie(i),s=+a-Pe(a),c=+o-Pe(o);return Math.round((s-c)/Te)}function Re(e,t){let n=Ne(e,t),r=De(t?.in||e,0);return r.setFullYear(n,0,4),r.setHours(0,0,0,0),Me(r)}function ze(e){return e instanceof Date||typeof e==`object`&&Object.prototype.toString.call(e)===`[object Date]`}function Be(e){return!(!ze(e)&&typeof e!=`number`||isNaN(+Oe(e)))}function Ve(e,t){let n=Oe(e,t?.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}var He={lessThanXSeconds:{one:`less than a second`,other:`less than {{count}} seconds`},xSeconds:{one:`1 second`,other:`{{count}} seconds`},halfAMinute:`half a minute`,lessThanXMinutes:{one:`less than a minute`,other:`less than {{count}} minutes`},xMinutes:{one:`1 minute`,other:`{{count}} minutes`},aboutXHours:{one:`about 1 hour`,other:`about {{count}} hours`},xHours:{one:`1 hour`,other:`{{count}} hours`},xDays:{one:`1 day`,other:`{{count}} days`},aboutXWeeks:{one:`about 1 week`,other:`about {{count}} weeks`},xWeeks:{one:`1 week`,other:`{{count}} weeks`},aboutXMonths:{one:`about 1 month`,other:`about {{count}} months`},xMonths:{one:`1 month`,other:`{{count}} months`},aboutXYears:{one:`about 1 year`,other:`about {{count}} years`},xYears:{one:`1 year`,other:`{{count}} years`},overXYears:{one:`over 1 year`,other:`over {{count}} years`},almostXYears:{one:`almost 1 year`,other:`almost {{count}} years`}},Ue=(e,t,n)=>{let r,i=He[e];return r=typeof i==`string`?i:t===1?i.one:i.other.replace(`{{count}}`,t.toString()),n?.addSuffix?n.comparison&&n.comparison>0?`in `+r:r+` ago`:r};function We(e){return(t={})=>{let n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}var Ge={date:We({formats:{full:`EEEE, MMMM do, y`,long:`MMMM do, y`,medium:`MMM d, y`,short:`MM/dd/yyyy`},defaultWidth:`full`}),time:We({formats:{full:`h:mm:ss a zzzz`,long:`h:mm:ss a z`,medium:`h:mm:ss a`,short:`h:mm a`},defaultWidth:`full`}),dateTime:We({formats:{full:`{{date}} 'at' {{time}}`,long:`{{date}} 'at' {{time}}`,medium:`{{date}}, {{time}}`,short:`{{date}}, {{time}}`},defaultWidth:`full`})},Ke={lastWeek:`'last' eeee 'at' p`,yesterday:`'yesterday at' p`,today:`'today at' p`,tomorrow:`'tomorrow at' p`,nextWeek:`eeee 'at' p`,other:`P`},qe=(e,t,n,r)=>Ke[e];function Je(e){return(t,n)=>{let r=n?.context?String(n.context):`standalone`,i;if(r===`formatting`&&e.formattingValues){let t=e.defaultFormattingWidth||e.defaultWidth,r=n?.width?String(n.width):t;i=e.formattingValues[r]||e.formattingValues[t]}else{let t=e.defaultWidth,r=n?.width?String(n.width):e.defaultWidth;i=e.values[r]||e.values[t]}let a=e.argumentCallback?e.argumentCallback(t):t;return i[a]}}var Ye={ordinalNumber:(e,t)=>{let n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+`st`;case 2:return n+`nd`;case 3:return n+`rd`}return n+`th`},era:Je({values:{narrow:[`B`,`A`],abbreviated:[`BC`,`AD`],wide:[`Before Christ`,`Anno Domini`]},defaultWidth:`wide`}),quarter:Je({values:{narrow:[`1`,`2`,`3`,`4`],abbreviated:[`Q1`,`Q2`,`Q3`,`Q4`],wide:[`1st quarter`,`2nd quarter`,`3rd quarter`,`4th quarter`]},defaultWidth:`wide`,argumentCallback:e=>e-1}),month:Je({values:{narrow:[`J`,`F`,`M`,`A`,`M`,`J`,`J`,`A`,`S`,`O`,`N`,`D`],abbreviated:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],wide:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`]},defaultWidth:`wide`}),day:Je({values:{narrow:[`S`,`M`,`T`,`W`,`T`,`F`,`S`],short:[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`],abbreviated:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],wide:[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`]},defaultWidth:`wide`}),dayPeriod:Je({values:{narrow:{am:`a`,pm:`p`,midnight:`mi`,noon:`n`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`},abbreviated:{am:`AM`,pm:`PM`,midnight:`midnight`,noon:`noon`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`},wide:{am:`a.m.`,pm:`p.m.`,midnight:`midnight`,noon:`noon`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`}},defaultWidth:`wide`,formattingValues:{narrow:{am:`a`,pm:`p`,midnight:`mi`,noon:`n`,morning:`in the morning`,afternoon:`in the afternoon`,evening:`in the evening`,night:`at night`},abbreviated:{am:`AM`,pm:`PM`,midnight:`midnight`,noon:`noon`,morning:`in the morning`,afternoon:`in the afternoon`,evening:`in the evening`,night:`at night`},wide:{am:`a.m.`,pm:`p.m.`,midnight:`midnight`,noon:`noon`,morning:`in the morning`,afternoon:`in the afternoon`,evening:`in the evening`,night:`at night`}},defaultFormattingWidth:`wide`})};function Xe(e){return(t,n={})=>{let r=n.width,i=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],a=t.match(i);if(!a)return null;let o=a[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(s)?Qe(s,e=>e.test(o)):Ze(s,e=>e.test(o)),l;l=e.valueCallback?e.valueCallback(c):c,l=n.valueCallback?n.valueCallback(l):l;let u=t.slice(o.length);return{value:l,rest:u}}}function Ze(e,t){for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t(e[n]))return n}function Qe(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return n}function $e(e){return(t,n={})=>{let r=t.match(e.matchPattern);if(!r)return null;let i=r[0],a=t.match(e.parsePattern);if(!a)return null;let o=e.valueCallback?e.valueCallback(a[0]):a[0];o=n.valueCallback?n.valueCallback(o):o;let s=t.slice(i.length);return{value:o,rest:s}}}var et={code:`en-US`,formatDistance:Ue,formatLong:Ge,formatRelative:qe,localize:Ye,match:{ordinalNumber:$e({matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)}),era:Xe({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:`wide`,parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:`any`}),quarter:Xe({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:`wide`,parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:`any`,valueCallback:e=>e+1}),month:Xe({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:`wide`,parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:`any`}),day:Xe({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:`wide`,parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:`any`}),dayPeriod:Xe({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:`any`,parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:`any`})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function tt(e,t){let n=Oe(e,t?.in);return Le(n,Ve(n))+1}function nt(e,t){let n=Oe(e,t?.in),r=+Me(n)-Re(n);return Math.round(r/we)+1}function rt(e,t){let n=Oe(e,t?.in),r=n.getFullYear(),i=Ae(),a=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??i.firstWeekContainsDate??i.locale?.options?.firstWeekContainsDate??1,o=De(t?.in||e,0);o.setFullYear(r+1,0,a),o.setHours(0,0,0,0);let s=je(o,t),c=De(t?.in||e,0);c.setFullYear(r,0,a),c.setHours(0,0,0,0);let l=je(c,t);return+n>=+s?r+1:+n>=+l?r:r-1}function it(e,t){let n=Ae(),r=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,i=rt(e,t),a=De(t?.in||e,0);return a.setFullYear(i,0,r),a.setHours(0,0,0,0),je(a,t)}function at(e,t){let n=Oe(e,t?.in),r=+je(n,t)-it(n,t);return Math.round(r/we)+1}function E(e,t){return(e<0?`-`:``)+Math.abs(e).toString().padStart(t,`0`)}var ot={y(e,t){let n=e.getFullYear(),r=n>0?n:1-n;return E(t===`yy`?r%100:r,t.length)},M(e,t){let n=e.getMonth();return t===`M`?String(n+1):E(n+1,2)},d(e,t){return E(e.getDate(),t.length)},a(e,t){let n=e.getHours()/12>=1?`pm`:`am`;switch(t){case`a`:case`aa`:return n.toUpperCase();case`aaa`:return n;case`aaaaa`:return n[0];default:return n===`am`?`a.m.`:`p.m.`}},h(e,t){return E(e.getHours()%12||12,t.length)},H(e,t){return E(e.getHours(),t.length)},m(e,t){return E(e.getMinutes(),t.length)},s(e,t){return E(e.getSeconds(),t.length)},S(e,t){let n=t.length,r=e.getMilliseconds();return E(Math.trunc(r*10**(n-3)),t.length)}},st={am:`am`,pm:`pm`,midnight:`midnight`,noon:`noon`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`},ct={G:function(e,t,n){let r=+(e.getFullYear()>0);switch(t){case`G`:case`GG`:case`GGG`:return n.era(r,{width:`abbreviated`});case`GGGGG`:return n.era(r,{width:`narrow`});default:return n.era(r,{width:`wide`})}},y:function(e,t,n){if(t===`yo`){let t=e.getFullYear(),r=t>0?t:1-t;return n.ordinalNumber(r,{unit:`year`})}return ot.y(e,t)},Y:function(e,t,n,r){let i=rt(e,r),a=i>0?i:1-i;return t===`YY`?E(a%100,2):t===`Yo`?n.ordinalNumber(a,{unit:`year`}):E(a,t.length)},R:function(e,t){return E(Ne(e),t.length)},u:function(e,t){return E(e.getFullYear(),t.length)},Q:function(e,t,n){let r=Math.ceil((e.getMonth()+1)/3);switch(t){case`Q`:return String(r);case`QQ`:return E(r,2);case`Qo`:return n.ordinalNumber(r,{unit:`quarter`});case`QQQ`:return n.quarter(r,{width:`abbreviated`,context:`formatting`});case`QQQQQ`:return n.quarter(r,{width:`narrow`,context:`formatting`});default:return n.quarter(r,{width:`wide`,context:`formatting`})}},q:function(e,t,n){let r=Math.ceil((e.getMonth()+1)/3);switch(t){case`q`:return String(r);case`qq`:return E(r,2);case`qo`:return n.ordinalNumber(r,{unit:`quarter`});case`qqq`:return n.quarter(r,{width:`abbreviated`,context:`standalone`});case`qqqqq`:return n.quarter(r,{width:`narrow`,context:`standalone`});default:return n.quarter(r,{width:`wide`,context:`standalone`})}},M:function(e,t,n){let r=e.getMonth();switch(t){case`M`:case`MM`:return ot.M(e,t);case`Mo`:return n.ordinalNumber(r+1,{unit:`month`});case`MMM`:return n.month(r,{width:`abbreviated`,context:`formatting`});case`MMMMM`:return n.month(r,{width:`narrow`,context:`formatting`});default:return n.month(r,{width:`wide`,context:`formatting`})}},L:function(e,t,n){let r=e.getMonth();switch(t){case`L`:return String(r+1);case`LL`:return E(r+1,2);case`Lo`:return n.ordinalNumber(r+1,{unit:`month`});case`LLL`:return n.month(r,{width:`abbreviated`,context:`standalone`});case`LLLLL`:return n.month(r,{width:`narrow`,context:`standalone`});default:return n.month(r,{width:`wide`,context:`standalone`})}},w:function(e,t,n,r){let i=at(e,r);return t===`wo`?n.ordinalNumber(i,{unit:`week`}):E(i,t.length)},I:function(e,t,n){let r=nt(e);return t===`Io`?n.ordinalNumber(r,{unit:`week`}):E(r,t.length)},d:function(e,t,n){return t===`do`?n.ordinalNumber(e.getDate(),{unit:`date`}):ot.d(e,t)},D:function(e,t,n){let r=tt(e);return t===`Do`?n.ordinalNumber(r,{unit:`dayOfYear`}):E(r,t.length)},E:function(e,t,n){let r=e.getDay();switch(t){case`E`:case`EE`:case`EEE`:return n.day(r,{width:`abbreviated`,context:`formatting`});case`EEEEE`:return n.day(r,{width:`narrow`,context:`formatting`});case`EEEEEE`:return n.day(r,{width:`short`,context:`formatting`});default:return n.day(r,{width:`wide`,context:`formatting`})}},e:function(e,t,n,r){let i=e.getDay(),a=(i-r.weekStartsOn+8)%7||7;switch(t){case`e`:return String(a);case`ee`:return E(a,2);case`eo`:return n.ordinalNumber(a,{unit:`day`});case`eee`:return n.day(i,{width:`abbreviated`,context:`formatting`});case`eeeee`:return n.day(i,{width:`narrow`,context:`formatting`});case`eeeeee`:return n.day(i,{width:`short`,context:`formatting`});default:return n.day(i,{width:`wide`,context:`formatting`})}},c:function(e,t,n,r){let i=e.getDay(),a=(i-r.weekStartsOn+8)%7||7;switch(t){case`c`:return String(a);case`cc`:return E(a,t.length);case`co`:return n.ordinalNumber(a,{unit:`day`});case`ccc`:return n.day(i,{width:`abbreviated`,context:`standalone`});case`ccccc`:return n.day(i,{width:`narrow`,context:`standalone`});case`cccccc`:return n.day(i,{width:`short`,context:`standalone`});default:return n.day(i,{width:`wide`,context:`standalone`})}},i:function(e,t,n){let r=e.getDay(),i=r===0?7:r;switch(t){case`i`:return String(i);case`ii`:return E(i,t.length);case`io`:return n.ordinalNumber(i,{unit:`day`});case`iii`:return n.day(r,{width:`abbreviated`,context:`formatting`});case`iiiii`:return n.day(r,{width:`narrow`,context:`formatting`});case`iiiiii`:return n.day(r,{width:`short`,context:`formatting`});default:return n.day(r,{width:`wide`,context:`formatting`})}},a:function(e,t,n){let r=e.getHours()/12>=1?`pm`:`am`;switch(t){case`a`:case`aa`:return n.dayPeriod(r,{width:`abbreviated`,context:`formatting`});case`aaa`:return n.dayPeriod(r,{width:`abbreviated`,context:`formatting`}).toLowerCase();case`aaaaa`:return n.dayPeriod(r,{width:`narrow`,context:`formatting`});default:return n.dayPeriod(r,{width:`wide`,context:`formatting`})}},b:function(e,t,n){let r=e.getHours(),i;switch(i=r===12?st.noon:r===0?st.midnight:r/12>=1?`pm`:`am`,t){case`b`:case`bb`:return n.dayPeriod(i,{width:`abbreviated`,context:`formatting`});case`bbb`:return n.dayPeriod(i,{width:`abbreviated`,context:`formatting`}).toLowerCase();case`bbbbb`:return n.dayPeriod(i,{width:`narrow`,context:`formatting`});default:return n.dayPeriod(i,{width:`wide`,context:`formatting`})}},B:function(e,t,n){let r=e.getHours(),i;switch(i=r>=17?st.evening:r>=12?st.afternoon:r>=4?st.morning:st.night,t){case`B`:case`BB`:case`BBB`:return n.dayPeriod(i,{width:`abbreviated`,context:`formatting`});case`BBBBB`:return n.dayPeriod(i,{width:`narrow`,context:`formatting`});default:return n.dayPeriod(i,{width:`wide`,context:`formatting`})}},h:function(e,t,n){if(t===`ho`){let t=e.getHours()%12;return t===0&&(t=12),n.ordinalNumber(t,{unit:`hour`})}return ot.h(e,t)},H:function(e,t,n){return t===`Ho`?n.ordinalNumber(e.getHours(),{unit:`hour`}):ot.H(e,t)},K:function(e,t,n){let r=e.getHours()%12;return t===`Ko`?n.ordinalNumber(r,{unit:`hour`}):E(r,t.length)},k:function(e,t,n){let r=e.getHours();return r===0&&(r=24),t===`ko`?n.ordinalNumber(r,{unit:`hour`}):E(r,t.length)},m:function(e,t,n){return t===`mo`?n.ordinalNumber(e.getMinutes(),{unit:`minute`}):ot.m(e,t)},s:function(e,t,n){return t===`so`?n.ordinalNumber(e.getSeconds(),{unit:`second`}):ot.s(e,t)},S:function(e,t){return ot.S(e,t)},X:function(e,t,n){let r=e.getTimezoneOffset();if(r===0)return`Z`;switch(t){case`X`:return ut(r);case`XXXX`:case`XX`:return dt(r);default:return dt(r,`:`)}},x:function(e,t,n){let r=e.getTimezoneOffset();switch(t){case`x`:return ut(r);case`xxxx`:case`xx`:return dt(r);default:return dt(r,`:`)}},O:function(e,t,n){let r=e.getTimezoneOffset();switch(t){case`O`:case`OO`:case`OOO`:return`GMT`+lt(r,`:`);default:return`GMT`+dt(r,`:`)}},z:function(e,t,n){let r=e.getTimezoneOffset();switch(t){case`z`:case`zz`:case`zzz`:return`GMT`+lt(r,`:`);default:return`GMT`+dt(r,`:`)}},t:function(e,t,n){return E(Math.trunc(e/1e3),t.length)},T:function(e,t,n){return E(+e,t.length)}};function lt(e,t=``){let n=e>0?`-`:`+`,r=Math.abs(e),i=Math.trunc(r/60),a=r%60;return a===0?n+String(i):n+String(i)+t+E(a,2)}function ut(e,t){return e%60==0?(e>0?`-`:`+`)+E(Math.abs(e)/60,2):dt(e,t)}function dt(e,t=``){let n=e>0?`-`:`+`,r=Math.abs(e),i=E(Math.trunc(r/60),2),a=E(r%60,2);return n+i+t+a}var ft=(e,t)=>{switch(e){case`P`:return t.date({width:`short`});case`PP`:return t.date({width:`medium`});case`PPP`:return t.date({width:`long`});default:return t.date({width:`full`})}},pt=(e,t)=>{switch(e){case`p`:return t.time({width:`short`});case`pp`:return t.time({width:`medium`});case`ppp`:return t.time({width:`long`});default:return t.time({width:`full`})}},mt={p:pt,P:(e,t)=>{let n=e.match(/(P+)(p+)?/)||[],r=n[1],i=n[2];if(!i)return ft(e,t);let a;switch(r){case`P`:a=t.dateTime({width:`short`});break;case`PP`:a=t.dateTime({width:`medium`});break;case`PPP`:a=t.dateTime({width:`long`});break;default:a=t.dateTime({width:`full`})}return a.replace(`{{date}}`,ft(r,t)).replace(`{{time}}`,pt(i,t))}},ht=/^D+$/,gt=/^Y+$/,_t=[`D`,`DD`,`YY`,`YYYY`];function vt(e){return ht.test(e)}function yt(e){return gt.test(e)}function bt(e,t,n){let r=xt(e,t,n);if(console.warn(r),_t.includes(e))throw RangeError(r)}function xt(e,t,n){let r=e[0]===`Y`?`years`:`days of the month`;return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}var St=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Ct=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,wt=/^'([^]*?)'?$/,Tt=/''/g,Et=/[a-zA-Z]/;function Dt(e,t,n){let r=Ae(),i=n?.locale??r.locale??et,a=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,o=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,s=Oe(e,n?.in);if(!Be(s))throw RangeError(`Invalid time value`);let c=t.match(Ct).map(e=>{let t=e[0];if(t===`p`||t===`P`){let n=mt[t];return n(e,i.formatLong)}return e}).join(``).match(St).map(e=>{if(e===`''`)return{isToken:!1,value:`'`};let t=e[0];if(t===`'`)return{isToken:!1,value:Ot(e)};if(ct[t])return{isToken:!0,value:e};if(t.match(Et))throw RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return{isToken:!1,value:e}});i.localize.preprocessor&&(c=i.localize.preprocessor(s,c));let l={firstWeekContainsDate:a,weekStartsOn:o,locale:i};return c.map(r=>{if(!r.isToken)return r.value;let a=r.value;(!n?.useAdditionalWeekYearTokens&&yt(a)||!n?.useAdditionalDayOfYearTokens&&vt(a))&&bt(a,t,String(e));let o=ct[a[0]];return o(s,a,i.localize,l)}).join(``)}function Ot(e){let t=e.match(wt);return t?t[1].replace(Tt,`'`):e}function kt(e,t){let n=Oe(e,t?.in);if(!Be(n))throw RangeError(`Invalid time value`);let r=t?.format??`extended`,i=t?.representation??`complete`,a=``,o=r===`extended`?`-`:``,s=r===`extended`?`:`:``;if(i!==`time`){let e=E(n.getDate(),2),t=E(n.getMonth()+1,2);a=`${E(n.getFullYear(),4)}${o}${t}${o}${e}`}if(i!==`date`){let e=E(n.getHours(),2),t=E(n.getMinutes(),2),r=E(n.getSeconds(),2);a=`${a}${a===``?``:` `}${e}${s}${t}${s}${r}`}return a}var At=c(o(((e,t,n)=>{(function(e){var n=y(),r=b(),i=x(),a=S(),o={imagePlaceholder:void 0,cacheBust:!1},s={toSvg:c,toPng:u,toJpeg:d,toBlob:f,toPixelData:l,impl:{fontFaces:i,images:a,util:n,inliner:r,options:{}}};t===void 0?e.domtoimage=s:t.exports=s;function c(e,t){return t||={},p(t),Promise.resolve(e).then(function(e){return h(e,t.filter,!0)}).then(g).then(_).then(r).then(function(r){return v(r,t.width||n.width(e),t.height||n.height(e))});function r(e){return t.bgcolor&&(e.style.backgroundColor=t.bgcolor),t.width&&(e.style.width=t.width+`px`),t.height&&(e.style.height=t.height+`px`),t.style&&Object.keys(t.style).forEach(function(n){e.style[n]=t.style[n]}),e}}function l(e,t){return m(e,t||{}).then(function(t){return t.getContext(`2d`).getImageData(0,0,n.width(e),n.height(e)).data})}function u(e,t){return m(e,t||{}).then(function(e){return e.toDataURL()})}function d(e,t){return t||={},m(e,t).then(function(e){return e.toDataURL(`image/jpeg`,t.quality||1)})}function f(e,t){return m(e,t||{}).then(n.canvasToBlob)}function p(e){e.imagePlaceholder===void 0?s.impl.options.imagePlaceholder=o.imagePlaceholder:s.impl.options.imagePlaceholder=e.imagePlaceholder,e.cacheBust===void 0?s.impl.options.cacheBust=o.cacheBust:s.impl.options.cacheBust=e.cacheBust}function m(e,t){return c(e,t).then(n.makeImage).then(n.delay(100)).then(function(t){var n=r(e);return n.getContext(`2d`).drawImage(t,0,0),n});function r(e){var r=document.createElement(`canvas`);if(r.width=t.width||n.width(e),r.height=t.height||n.height(e),t.bgcolor){var i=r.getContext(`2d`);i.fillStyle=t.bgcolor,i.fillRect(0,0,r.width,r.height)}return r}}function h(e,t,r){return!r&&t&&!t(e)?Promise.resolve():Promise.resolve(e).then(i).then(function(n){return a(e,n,t)}).then(function(t){return o(e,t)});function i(e){return e instanceof HTMLCanvasElement?n.makeImage(e.toDataURL()):e.cloneNode(!1)}function a(e,t,r){var i=e.childNodes;return i.length===0?Promise.resolve(t):a(t,n.asArray(i),r).then(function(){return t});function a(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return h(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}}function o(e,t){return t instanceof Element?Promise.resolve().then(r).then(i).then(a).then(o).then(function(){return t}):t;function r(){r(window.getComputedStyle(e),t.style);function r(e,t){e.cssText?t.cssText=e.cssText:r(e,t);function r(e,t){n.asArray(e).forEach(function(n){t.setProperty(n,e.getPropertyValue(n),e.getPropertyPriority(n))})}}}function i(){[`:before`,`:after`].forEach(function(e){r(e)});function r(r){var i=window.getComputedStyle(e,r),a=i.getPropertyValue(`content`);if(a===``||a===`none`)return;var o=n.uid();t.className=t.className+` `+o;var s=document.createElement(`style`);s.appendChild(c(o,r,i)),t.appendChild(s);function c(e,t,r){var i=`.`+e+`:`+t,a=r.cssText?o(r):s(r);return document.createTextNode(i+`{`+a+`}`);function o(e){var t=e.getPropertyValue(`content`);return e.cssText+` content: `+t+`;`}function s(e){return n.asArray(e).map(t).join(`; `)+`;`;function t(t){return t+`: `+e.getPropertyValue(t)+(e.getPropertyPriority(t)?` !important`:``)}}}}}function a(){e instanceof HTMLTextAreaElement&&(t.innerHTML=e.value),e instanceof HTMLInputElement&&t.setAttribute(`value`,e.value)}function o(){t instanceof SVGElement&&(t.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),t instanceof SVGRectElement&&[`width`,`height`].forEach(function(e){var n=t.getAttribute(e);n&&t.style.setProperty(e,n)}))}}}function g(e){return i.resolveAll().then(function(t){var n=document.createElement(`style`);return e.appendChild(n),n.appendChild(document.createTextNode(t)),e})}function _(e){return a.inlineAll(e).then(function(){return e})}function v(e,t,r){return Promise.resolve(e).then(function(e){return e.setAttribute(`xmlns`,`http://www.w3.org/1999/xhtml`),new XMLSerializer().serializeToString(e)}).then(n.escapeXhtml).then(function(e){return`<foreignObject x="0" y="0" width="100%" height="100%">`+e+`</foreignObject>`}).then(function(e){return`<svg xmlns="http://www.w3.org/2000/svg" width="`+t+`" height="`+r+`">`+e+`</svg>`}).then(function(e){return`data:image/svg+xml;charset=utf-8,`+e})}function y(){return{escape:f,parseExtension:t,mimeType:n,dataAsUrl:d,isDataUrl:r,canvasToBlob:a,resolveUrl:o,getAndEncode:u,uid:c(),delay:p,asArray:m,escapeXhtml:h,makeImage:l,width:g,height:_};function e(){var e=`application/font-woff`,t=`image/jpeg`;return{woff:e,woff2:e,ttf:`application/font-truetype`,eot:`application/vnd.ms-fontobject`,png:`image/png`,jpg:t,jpeg:t,gif:`image/gif`,tiff:`image/tiff`,svg:`image/svg+xml`}}function t(e){var t=/\.([^\.\/]*?)$/g.exec(e);return t?t[1]:``}function n(n){var r=t(n).toLowerCase();return e()[r]||``}function r(e){return e.search(/^(data:)/)!==-1}function i(e){return new Promise(function(t){for(var n=window.atob(e.toDataURL().split(`,`)[1]),r=n.length,i=new Uint8Array(r),a=0;a<r;a++)i[a]=n.charCodeAt(a);t(new Blob([i],{type:`image/png`}))})}function a(e){return e.toBlob?new Promise(function(t){e.toBlob(t)}):i(e)}function o(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement(`base`);n.head.appendChild(r);var i=n.createElement(`a`);return n.body.appendChild(i),r.href=t,i.href=e,i.href}function c(){var e=0;return function(){return`u`+t()+e++;function t(){return(`0000`+(Math.random()*36**4|0).toString(36)).slice(-4)}}}function l(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e})}function u(e){return s.impl.options.cacheBust&&(e+=(/\?/.test(e)?`&`:`?`)+new Date().getTime()),new Promise(function(t){var n=new XMLHttpRequest;n.onreadystatechange=a,n.ontimeout=o,n.responseType=`blob`,n.timeout=3e4,n.open(`GET`,e,!0),n.send();var r;if(s.impl.options.imagePlaceholder){var i=s.impl.options.imagePlaceholder.split(/,/);i&&i[1]&&(r=i[1])}function a(){if(n.readyState===4){if(n.status!==200)r?t(r):c(`cannot fetch resource: `+e+`, status: `+n.status);else{var i=new FileReader;i.onloadend=function(){var e=i.result.split(/,/)[1];t(e)},i.readAsDataURL(n.response)}}}function o(){r?t(r):c(`timeout of 30000ms occured while fetching resource: `+e)}function c(e){console.error(e),t(``)}})}function d(e,t){return`data:`+t+`;base64,`+e}function f(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,`\\$1`)}function p(e){return function(t){return new Promise(function(n){setTimeout(function(){n(t)},e)})}}function m(e){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}function h(e){return e.replace(/#/g,`%23`).replace(/\n/g,`%0A`)}function g(e){var t=v(e,`border-left-width`),n=v(e,`border-right-width`);return e.scrollWidth+t+n}function _(e){var t=v(e,`border-top-width`),n=v(e,`border-bottom-width`);return e.scrollHeight+t+n}function v(e,t){var n=window.getComputedStyle(e).getPropertyValue(t);return parseFloat(n.replace(`px`,``))}}function b(){var e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:a,shouldProcess:t,impl:{readUrls:r,inline:i}};function t(t){return t.search(e)!==-1}function r(t){for(var r=[],i;(i=e.exec(t))!==null;)r.push(i[1]);return r.filter(function(e){return!n.isDataUrl(e)})}function i(e,t,r,i){return Promise.resolve(t).then(function(e){return r?n.resolveUrl(e,r):e}).then(i||n.getAndEncode).then(function(e){return n.dataAsUrl(e,n.mimeType(t))}).then(function(n){return e.replace(a(t),`$1`+n+`$3`)});function a(e){return RegExp(`(url\\(['"]?)(`+n.escape(e)+`)(['"]?\\))`,`g`)}}function a(e,n,a){return o()?Promise.resolve(e):Promise.resolve(e).then(r).then(function(t){var r=Promise.resolve(e);return t.forEach(function(e){r=r.then(function(t){return i(t,e,n,a)})}),r});function o(){return!t(e)}}}function x(){return{resolveAll:e,impl:{readAll:t}};function e(){return t(document).then(function(e){return Promise.all(e.map(function(e){return e.resolve()}))}).then(function(e){return e.join(`
`)})}function t(){return Promise.resolve(n.asArray(document.styleSheets)).then(t).then(e).then(function(e){return e.map(i)});function e(e){return e.filter(function(e){return e.type===CSSRule.FONT_FACE_RULE}).filter(function(e){return r.shouldProcess(e.style.getPropertyValue(`src`))})}function t(e){var t=[];return e.forEach(function(e){try{n.asArray(e.cssRules||[]).forEach(t.push.bind(t))}catch(t){console.log(`Error while reading CSS rules from `+e.href,t.toString())}}),t}function i(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return r.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue(`src`)}}}}}function S(){return{inlineAll:t,impl:{newImage:e}};function e(e){return{inline:t};function t(t){return n.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(t||n.getAndEncode).then(function(t){return n.dataAsUrl(t,n.mimeType(e.src))}).then(function(t){return new Promise(function(n,r){e.onload=n,e.onerror=r,e.src=t})})}}function t(i){return i instanceof Element?a(i).then(function(){return i instanceof HTMLImageElement?e(i).inline():Promise.all(n.asArray(i.childNodes).map(function(e){return t(e)}))}):Promise.resolve(i);function a(e){var t=e.style.getPropertyValue(`background`);return t?r.inlineAll(t).then(function(t){e.style.setProperty(`background`,t,e.style.getPropertyPriority(`background`))}).then(function(){return e}):Promise.resolve(e)}}}})(n)}))(),1);`stream`in Blob.prototype||Object.defineProperty(Blob.prototype,"stream",{value(){return new Response(this).body}}),`setBigUint64`in DataView.prototype||Object.defineProperty(DataView.prototype,"setBigUint64",{value(e,t,n){let r=Number(4294967295n&t),i=Number(t>>32n);this.setUint32(e+(n?0:4),r,n),this.setUint32(e+(n?4:0),i,n)}});var jt=e=>new DataView(new ArrayBuffer(e)),Mt=e=>new Uint8Array(e.buffer||e),Nt=e=>new TextEncoder().encode(String(e)),Pt=e=>Math.min(4294967295,Number(e)),Ft=e=>Math.min(65535,Number(e));function It(e,t,n){t===void 0||t instanceof Date||(t=new Date(t));let r=e!==void 0;if(n||=r?436:509,e instanceof File)return{isFile:r,t:t||new Date(e.lastModified),bytes:e.stream(),mode:n};if(e instanceof Response)return{isFile:r,t:t||new Date(e.headers.get(`Last-Modified`)||Date.now()),bytes:e.body,mode:n};if(t===void 0)t=new Date;else if(isNaN(t))throw Error(`Invalid modification date.`);if(!r)return{isFile:r,t,mode:n};if(typeof e==`string`)return{isFile:r,t,bytes:Nt(e),mode:n};if(e instanceof Blob)return{isFile:r,t,bytes:e.stream(),mode:n};if(e instanceof Uint8Array||e instanceof ReadableStream)return{isFile:r,t,bytes:e,mode:n};if(e instanceof ArrayBuffer||ArrayBuffer.isView(e))return{isFile:r,t,bytes:Mt(e),mode:n};if(Symbol.asyncIterator in e)return{isFile:r,t,bytes:Lt(e[Symbol.asyncIterator]()),mode:n};throw TypeError(`Unsupported input format.`)}function Lt(e,t=e){return new ReadableStream({async pull(t){let n=0;for(;t.desiredSize>n;){let r=await e.next();if(!r.value){t.close();break}{let e=Rt(r.value);t.enqueue(e),n+=e.byteLength}}},async cancel(e){await t.throw?.(e)}})}function Rt(e){return typeof e==`string`?Nt(e):e instanceof Uint8Array?e:Mt(e)}function zt(e,t,n){let[r,i]=function(e){return e?e instanceof Uint8Array?[e,1]:ArrayBuffer.isView(e)||e instanceof ArrayBuffer?[Mt(e),1]:[Nt(e),0]:[void 0,0]}(t);if(e instanceof File)return{i:Vt(r||Nt(e.name)),o:BigInt(e.size),u:i};if(e instanceof Response){let t=e.headers.get(`content-disposition`),a=t&&t.match(/;\s*filename\*?\s*=\s*(?:UTF-\d+''|)["']?([^;"'\r\n]*)["']?(?:;|$)/i),o=a&&a[1]||e.url&&new URL(e.url).pathname.split(`/`).findLast(Boolean),s=o&&decodeURIComponent(o),c=n||+e.headers.get(`content-length`);return{i:Vt(r||Nt(s)),o:BigInt(c),u:i}}return r=Vt(r,e!==void 0||n!==void 0),typeof e==`string`?{i:r,o:BigInt(Nt(e).length),u:i}:e instanceof Blob?{i:r,o:BigInt(e.size),u:i}:e instanceof ArrayBuffer||ArrayBuffer.isView(e)?{i:r,o:BigInt(e.byteLength),u:i}:{i:r,o:Bt(e,n),u:i}}function Bt(e,t){return t>-1?BigInt(t):e?void 0:0n}function Vt(e,t=1){if(!e||e.every((e=>e===47)))throw Error(`The file must have a name.`);if(t)for(;e[e.length-1]===47;)e=e.subarray(0,-1);else e[e.length-1]!==47&&(e=new Uint8Array([...e,47]));return e}var Ht=new Uint32Array(256);for(let e=0;e<256;++e){let t=e;for(let e=0;e<8;++e)t=t>>>1^(1&t&&3988292384);Ht[e]=t}function Ut(e,t=0){t=~t;for(var n=0,r=e.length;n<r;n++)t=t>>>8^Ht[255&t^e[n]];return~t>>>0}function Wt(e,t,n=0){let r=e.getSeconds()>>1|e.getMinutes()<<5|e.getHours()<<11,i=e.getDate()|e.getMonth()+1<<5|e.getFullYear()-1980<<9;t.setUint16(n,r,1),t.setUint16(n+2,i,1)}function Gt({i:e,u:t},n){return 8*(!t||(n??function(e){try{Kt.decode(e)}catch{return 0}return 1}(e)))}var Kt=new TextDecoder(`utf8`,{fatal:1});function qt(e,t=0){let n=jt(30);return n.setUint32(0,1347093252),n.setUint32(4,754976768|t),Wt(e.t,n,10),n.setUint16(26,e.i.length,1),Mt(n)}async function*Jt(e){let{bytes:t}=e;if(`then`in t&&(t=await t),t instanceof Uint8Array)yield t,e.l=Ut(t,0),e.o=BigInt(t.length);else{e.o=0n;let n=t.getReader();for(;;){let{value:t,done:r}=await n.read();if(r)break;e.l=Ut(t,e.l),e.o+=BigInt(t.length),yield t}}}function Yt(e,t){let n=jt(16+(t?8:0));return n.setUint32(0,1347094280),n.setUint32(4,e.isFile?e.l:0,1),t?(n.setBigUint64(8,e.o,1),n.setBigUint64(16,e.o,1)):(n.setUint32(8,Pt(e.o),1),n.setUint32(12,Pt(e.o),1)),Mt(n)}function Xt(e,t,n=0,r=0){let i=jt(46);return i.setUint32(0,1347092738),i.setUint32(4,755182848),i.setUint16(8,2048|n),Wt(e.t,i,12),i.setUint32(16,e.isFile?e.l:0,1),i.setUint32(20,Pt(e.o),1),i.setUint32(24,Pt(e.o),1),i.setUint16(28,e.i.length,1),i.setUint16(30,r,1),i.setUint16(40,e.mode|(e.isFile?32768:16384),1),i.setUint32(42,Pt(t),1),Mt(i)}function Zt(e,t,n){let r=jt(n);return r.setUint16(0,1,1),r.setUint16(2,n-4,1),16&n&&(r.setBigUint64(4,e.o,1),r.setBigUint64(12,e.o,1)),r.setBigUint64(n-8,t,1),Mt(r)}function Qt(e){return e instanceof File||e instanceof Response?[[e],[e]]:[[e.input,e.name,e.size],[e.input,e.lastModified,e.mode]]}var $t=e=>function(e){let t=BigInt(22),n=0n,r=0;for(let i of e){if(!i.i)throw Error(`Every file must have a non-empty name.`);if(i.o===void 0)throw Error(`Missing size for file "${new TextDecoder().decode(i.i)}".`);let e=i.o>=4294967295n,a=n>=4294967295n;n+=BigInt(46+i.i.length+(e&&8))+i.o,t+=BigInt(i.i.length+46+(12*a|28*e)),r||=e}return(r||n>=4294967295n)&&(t+=BigInt(76)),t+n}(function*(e){for(let t of e)yield zt(...Qt(t)[0])}(e));function en(e,t={}){let n={"Content-Type":`application/zip`,"Content-Disposition":`attachment`};return(typeof t.length==`bigint`||Number.isInteger(t.length))&&t.length>0&&(n[`Content-Length`]=String(t.length)),t.metadata&&(n[`Content-Length`]=String($t(t.metadata))),new Response(tn(e,t),{headers:n})}function tn(e,t={}){let n=function(e){let t=e[Symbol.iterator in e?Symbol.iterator:Symbol.asyncIterator]();return{async next(){let e=await t.next();if(e.done)return e;let[n,r]=Qt(e.value);return{done:0,value:Object.assign(It(...r),zt(...n))}},throw:t.throw?.bind(t),[Symbol.asyncIterator](){return this}}}(e);return Lt(async function*(e,t){let n=[],r=0n,i=0n,a=0;for await(let o of e){let e=Gt(o,t.buffersAreUTF8);yield qt(o,e),yield new Uint8Array(o.i),o.isFile&&(yield*Jt(o));let s=o.o>=4294967295n,c=12*(r>=4294967295n)|28*s;yield Yt(o,s),n.push(Xt(o,r,e,c)),n.push(o.i),c&&n.push(Zt(o,r,c)),s&&(r+=8n),i++,r+=BigInt(46+o.i.length)+o.o,a||=s}let o=0n;for(let e of n)yield e,o+=BigInt(e.length);if(a||r>=4294967295n){let e=jt(76);e.setUint32(0,1347094022),e.setBigUint64(4,BigInt(44),1),e.setUint32(12,755182848),e.setBigUint64(24,i,1),e.setBigUint64(32,i,1),e.setBigUint64(40,o,1),e.setBigUint64(48,r,1),e.setUint32(56,1347094023),e.setBigUint64(64,r+o,1),e.setUint32(72,1,1),yield Mt(e)}let s=jt(22);s.setUint32(0,1347093766),s.setUint16(8,Ft(i),1),s.setUint16(10,Ft(i),1),s.setUint32(12,Pt(o),1),s.setUint32(16,Pt(r),1),yield Mt(s)}(n,t),n)}var nn=`1.3.4`,D=class extends Map{add(e,t,n=!1){n?this.set(e,((...n)=>{t(...n),this.delete(e)})):this.set(e,t)}call(...e){this.forEach(t=>t(...e))}},rn=class{},an=class{parent;_layers=[];get layers(){return this._layers}onLayers=new D;setLayers(e){e.length!==this._layers.length&&(this._layers=e,this.onLayers.call(this.layers))}constructor(e){this.parent=e}getActiveFilters(){return this.layers.filter(e=>e.bypass===!1)}addFilter(e){this.layers.includes(e)&&console.error(`filter ${e} is already in ${this.parent}`),this._layers.push(e),this.onLayers.call(this.layers)}removeFilter(e){this.layers.includes(e)&&(this._layers=this.layers.filter(t=>t!==e),this.onLayers.call(this.layers))}applyFilters(){this.parent.getInstances().forEach(e=>{e.applyAllAvailableFilters()})}getFiltersArray(){}},on=class extends Error{code;url;constructor(e,t,n){super(n),this.code=e,this.url=t}},sn=Object.freeze({name:`LabIR Recording (.lrc)`,description:`Radiometric data developed by the Infrared Technologies research team at the University of West Bohemia in Pilsen (CZ)`,devices:[{deviceName:`TIMI Edu Infrared Camera`,deviceUrl:`https://edu.labir.cz`,deviceDescription:`A thermal camera designed for school education.`,manufacturer:`TIMI Creation, s.r.o.`,manufacturerUrl:`https://timic.cz`},{deviceName:`Custom measurement systems by IRT UWB in Pilsen (CZ)`,deviceUrl:`https://irt.zcu.cz`,deviceDescription:`Specialised applications of IR diagnostics in the field of industry, research, medicine, security or education.`,manufacturer:`IRT UWB in Pilsen (CZ)`,manufacturerUrl:`https://irt.zcu.cz`}],extensions:[{extension:`lrc`,minme:`application/octet-stream`}],is:(e,t)=>{let n=t.endsWith(`lrc`),r=new TextDecoder().decode(e.slice(0,4))===`LRC\0`;return n&&r},baseInfo:async e=>{let t=new DataView(e),n=t.getUint16(17,!0),r=t.getUint16(19,!0),i=e.byteLength,a=(e,t)=>{let n=e.getBigInt64(t,!0),r=10000n,i=24n*60n*60n*1000n*r,a=4611686018427387904n,o=n&4611686018427387903n;n&9223372036854775808n&&(o>a-i&&(o-=a),o<0&&(o+=i));let s=o/r-62135596800000n;return Number(s)},o=t.getUint8(15),s=2;o===1&&(s=4);let c=57+n*r*s,l=e.slice(25),u=l.byteLength/c,d=e=>{let t=e*c,n=t+c,r=l.slice(t,n),i=new DataView(r),o=i.getFloat32(8,!0),s=i.getFloat32(12,!0);return{timestamp:a(i,0),min:o,max:s,emissivity:i.getFloat32(24,!0),reflectedKelvins:i.getFloat32(28,!0)}},f=[];for(let e=0;e<u;e++){let t=d(e);f.push(t)}let p={emissivity:0,reflectedKelvins:0},m=1/0,h=-1/0,g=[];f.forEach(e=>{p.emissivity+=e.emissivity,p.reflectedKelvins+=e.reflectedKelvins,e.min<m&&(m=e.min),e.max>h&&(h=e.max),g.push(e.timestamp)});let _=g[0],v=0,y=[],b=[];g.forEach((e,t)=>{let n=g[t+1],r=0;r=n===void 0?0:n-e;let i=e-_;y.push(r),v+=r,b.push({absolute:e,relative:i,offset:isNaN(r)?0:r,index:t})});let x=f[f.length-1].timestamp-f[0].timestamp,S=x/u,C=1e3/S;return{width:n,height:r,timestamp:f[0].timestamp,bytesize:i,frameCount:u,duration:x,frameInterval:S,fps:C,timeline:b,min:m,max:h,averageEmissivity:p.emissivity/f.length,averageReflectedKelvins:p.reflectedKelvins/f.length}},getFrameSubset:(e,t)=>{let n=new DataView(e.slice(0,25)),r=n.getUint8(15),i=n.getUint16(17,!0),a=n.getUint16(19,!0),o=r===1?4:2,s=57+i*a*o,c=e.slice(25),l=t*s,u=l+s;return{array:c.slice(l,u),dataType:r}},frameData:async(e,t)=>{let n=new DataView(e),r=n.getBigInt64(0,!0),i=10000n,a=24n*60n*60n*1000n*i,o=4611686018427387904n,s=r&4611686018427387903n;r&9223372036854775808n&&(s>o-a&&(s-=o),s<0&&(s+=a));let c=s/i-62135596800000n,l=Number(c),u=n.getFloat32(8,!0),d=n.getFloat32(12,!0),f=n.getFloat32(24,!0),p=n.getFloat32(28,!0),m=e.slice(57),h=[];if(t===0){let e=new Uint16Array(m),t=Math.abs(u-d);e.forEach(e=>{let n=e/65535;h.push(u+t*n)})}else t===1&&(h=Array.from(new Float32Array(m)));return{timestamp:l,min:u,max:d,emissivity:f,reflectedKelvins:p,pixels:h}},registryHistogram:async e=>{let t=[],n=async e=>{let t=new DataView(e.slice(0,25)),n=t.getUint8(15),r=t.getUint16(17,!0),i=t.getUint16(19,!0),a=n===1?4:2,o=r*i*a,s=57+o,c=e.slice(25),l=c.byteLength/s,u=[];for(let e=0;e<l;e++){let t=e*s,r=t+57,i=r+o,a=c.slice(r,i);if(n===0){let e=new DataView(c.slice(t,56)),n=e.getFloat32(8,!0),r=e.getFloat32(12,!0),i=new Uint16Array(a),o=Math.abs(n-r);i.forEach(e=>{let t=e/65535;u.push(n+o*t)})}else n===1&&(u=u.concat(Array.from(new Float32Array(a))))}return u};(await Promise.all(e.map(e=>n(e)))).forEach(e=>{t=t.concat(e)}),t.sort((e,t)=>e-t);let r=t[0],i=t[t.length-1],a=Math.abs(r-i)/255,o=[],s=[...t];for(let e=0;e<255;e++){let n=r+a*e,i=n+a,c=s.findIndex(e=>e>i);if(c===0){let e={from:n,to:i,count:0,percentage:0};o.push(e)}else{let e=s.slice(0,c-1).length,r={from:n,to:i,count:e,percentage:e/t.length*100};o.push(r),s=s.slice(c)}}let c=[...o].sort((e,t)=>e.percentage-t.percentage),l=c[0].percentage,u=c[c.length-1].percentage,d=Math.abs(l-u);return o.map(e=>({...e,height:e.percentage/d*100}))},pointAnalysisData:async(e,t,n)=>{let r=new DataView(e),i=r.getUint16(17,!0),a=r.getUint16(19,!0),o=(e,t)=>{let n=e.getBigInt64(t,!0),r=10000n,i=24n*60n*60n*1000n*r,a=4611686018427387904n,o=n&4611686018427387903n;n&9223372036854775808n&&(o>a-i&&(o-=a),o<0&&(o+=i));let s=o/r-62135596800000n;return Number(s)},s=r.getUint8(15),c=2;s===1&&(c=4);let l=57+i*a*c,u=e.slice(25),d=u.byteLength/l,f={},p=e=>{let r=e*l,a=r+l,d=u.slice(r,a),f=new DataView(d),p=o(f,0),m=f.getFloat32(8,!0),h=f.getFloat32(12,!0)-m,g=57+n*c*i+t*c,_=0;return s===1?_=f.getFloat32(g,!0):s===0&&(_=m+h*(f.getInt16(g,!0)/65535)),{timestamp:p,temperature:_}},m=0;for(let e=0;e<d;e++){let t=p(e);m===0&&(m=t.timestamp),f[t.timestamp-m]=t.temperature}return f},rectAnalysisData:async(e,t,n,r,i)=>{let a=new DataView(e),o=a.getUint16(17,!0),s=a.getUint16(19,!0),c=(e,t)=>{let n=e.getBigInt64(t,!0),r=10000n,i=24n*60n*60n*1000n*r,a=4611686018427387904n,o=n&4611686018427387903n;n&9223372036854775808n&&(o>a-i&&(o-=a),o<0&&(o+=i));let s=o/r-62135596800000n;return Number(s)},l=a.getUint8(15),u=2;l===1&&(u=4);let d=57+o*s*u,f=e.slice(25),p=f.byteLength/d,m={},h=e=>{let a=e*d,s=a+d,p=f.slice(a,s),m=new DataView(p),h=c(m,0),g=m.getFloat32(8,!0),_=m.getFloat32(12,!0)-g,v=t,y=t+r,b=n,x=n+i,S=1/0,C=-1/0,ee=0,w=0;for(let e=b;e<=x;e++){let t=e*o;for(let e=v;e<=y;e++){let n=57+(t+e)*u,r=NaN;r=l===1?m.getFloat32(n,!0):g+_*(m.getInt16(n,!0)/65535),r<S&&(S=r),r>C&&(C=r),w+=r,ee++}}return{timestamp:h,result:{min:S,max:C,avg:w/ee,count:ee}}},g=0;for(let e=0;e<p;e++){let t=h(e);g===0&&(g=t.timestamp),m[t.timestamp-g]=t.result}return m},ellipsisAnalysisData:async(e,t,n,r,i)=>{let a=new DataView(e),o=a.getUint16(17,!0),s=a.getUint16(19,!0),c=(e,t)=>{let n=e.getBigInt64(t,!0),r=10000n,i=24n*60n*60n*1000n*r,a=4611686018427387904n,o=n&4611686018427387903n;n&9223372036854775808n&&(o>a-i&&(o-=a),o<0&&(o+=i));let s=o/r-62135596800000n;return Number(s)},l=a.getUint8(15),u=2;l===1&&(u=4);let d=57+o*s*u,f=e.slice(25),p=f.byteLength/d,m={},h=(e,a)=>{let o=t+r/2,s=n+i/2,c=(e-o)/(r/2),l=(a-s)/(i/2);return c*c+l*l<=1},g=e=>{let a=e*d,s=a+d,p=f.slice(a,s),m=new DataView(p),g=c(m,0),_=m.getFloat32(8,!0),v=m.getFloat32(12,!0)-_,y=t,b=t+r,x=n,S=n+i,C=1/0,ee=-1/0,w=0,T=0;for(let e=x;e<=S;e++){let t=e*o;for(let n=y;n<=b;n++)if(h(n,e)){let e=57+(t+n)*u,r=NaN;r=l===1?m.getFloat32(e,!0):_+v*(m.getInt16(e,!0)/65535),r<C&&(C=r),r>ee&&(ee=r),T+=r,w++}}return{timestamp:g,result:{min:C,max:ee,avg:T/w,count:w}}},_=0;for(let e=0;e<p;e++){let t=g(e);_===0&&(_=t.timestamp),m[t.timestamp-_]=t.result}return m}}),cn=Object.values({LrcParser:sn}),ln=(e,t)=>{let n=cn.find(n=>n.is(e,t));if(n===void 0)throw new on(2,t,`No parser found for '${t}'.`);return n},un=cn.map(e=>e.extensions).map(e=>e.map(e=>e.minme+`, .`+e.extension).join(`, `)).join(`, `),dn=class e{service;element;_hover=!1;get hover(){return this._hover}onMouseEnter=new D;onMouseLeave=new D;onDrop=new D;onProcessingEnd=new D;input;hydrated=!1;multiple;bindedEnterListener;bindedLeaveListener;bindedDropListener;bindedInputChangeListener;bindedDragoverListener;bindedClickListener;constructor(e,t,n=!0){this.service=e,this.element=t,this.multiple=n,this.bindedLeaveListener=this.handleLeave.bind(this),this.bindedEnterListener=this.handleEnter.bind(this),this.bindedDropListener=this.handleDrop.bind(this),this.bindedInputChangeListener=this.handleInputChange.bind(this),this.bindedDragoverListener=this.handleDragover.bind(this),this.bindedClickListener=this.handleClick.bind(this)}static listenOnElement(t,n,r=!0){let i=new e(t,n,r);return i.hydrate(),i}hydrate(){this.hydrated===!1&&(this.hydrated=!0,this.input=this.getInput(),this.element.addEventListener(`dragover`,this.bindedDragoverListener),this.element.addEventListener(`dragleave`,this.bindedLeaveListener),this.element.addEventListener(`dragend`,this.bindedLeaveListener),this.element.addEventListener(`pointerdown`,this.bindedClickListener),this.element.addEventListener(`drop`,this.bindedDropListener),this.input.addEventListener(`change`,this.bindedInputChangeListener))}dehydrate(){this.hydrated===!0&&(this.hydrated=!1,this.input&&this.input.remove(),this.element.removeEventListener(`dragover`,this.bindedDragoverListener),this.element.removeEventListener(`dragleave`,this.bindedLeaveListener),this.element.removeEventListener(`dragend`,this.bindedLeaveListener),this.element.removeEventListener(`pointerdown`,this.bindedClickListener),this.element.removeEventListener(`drop`,this.bindedDropListener))}handleClick(e){e.preventDefault(),this.input&&this.input.click()}handleDragover(e){e.preventDefault(),this.handleEnter()}async handleFiles(e){let t=[];if(this.multiple)t=await Promise.all(e.map(async e=>await this.service.loadUploadedFile(e)));else{let n=e[0];n&&t.push(await this.service.loadUploadedFile(n))}return t}async handleDrop(e){e.preventDefault(),this.onDrop.call();let t=[],n=e.dataTransfer;return n&&n.files&&(t=await this.handleFiles(Array.from(n.files))),this.onProcessingEnd.call(t,e),this.handleLeave(),{results:t,event:e}}async handleInputChange(e){e.preventDefault(),this.onDrop.call();let t=e.target,n=[];return t.files&&(n=await this.handleFiles(Array.from(t.files)),this.onProcessingEnd.call(n,e),this.handleLeave()),{results:n,event:e}}handleEnter(){this._hover===!1&&(this._hover=!0,this.onMouseEnter.call())}handleLeave(){this._hover===!0&&(this._hover=!1,this.onMouseLeave.call())}getInput(){let e=document.createElement(`input`);return e.type=`file`,e.accept=un,this.multiple&&(e.multiple=!0),e}openFileDialog(e=!0){this.input!==void 0&&(this.input.multiple=e,this.input.click())}},fn=class{thermalUrl;visibleUrl;constructor(e,t){this.thermalUrl=e,this.visibleUrl=t}},pn=class e extends fn{code;message;constructor(e,t,n){super(e),this.code=t,this.message=n}isSuccess(){return!1}static fromError(t){return new e(t.url,t.code,t.message)}},mn=class{parent;_initial;_value;get value(){return this._value}get valueInitial(){return this._initial}set value(e){this._value=this.validate(e),this.afterSetEffect(this._value),this._listeners.call(this._value)}_listeners=new D;constructor(e,t){this.parent=e,this._initial=t,this._value=this.validate(this._initial)}reset(){this.value=this._initial}addListener(e,t){this._listeners.set(e,t)}removeListener(e){this._listeners.delete(e)}clearAllListeners(){this._listeners.clear()}callAllListenersWithCurrentValue(){this._listeners.call(this._value)}},hn=class e{key;file;static LISTENER_PROMOTE_PROPERTIES_CHANGE=`pch`;static LISTENER_PROMOTE_MOVE_RESIZE=`mvr`;static SERIALISABLE_CHANGES=[`name`,`color`,`min`,`max`,`avg`];static VALID_ANALYSIS_TYPES=[`point`,`ellipsis`,`rectangle`];static COLOR_ACTIVE=`yellow`;static COLOR_INACTIVE=`black`;_ready=!1;get ready(){return this._ready}setReady(){if(this.ready)throw Error(`Trying to set ready an analysis that is already ready!`);this._ready=!0}layerRoot;get renderRoot(){return this.file.dom.canvasLayer.getLayerRoot()}points=new Map;get arrayOfPoints(){return Array.from(this.points.values())}get arrayOfActivePoints(){return this.arrayOfPoints.filter(e=>e.active)}get layers(){return this.file.analysis.layers}_selected=!1;get selected(){return this._selected}onSelected=new D;onDeselected=new D;onSerializableChange=new D;onValues=new D;onMoveOrResize=new D;onSetInitialColor=new D;onSetColor=new D;onSetName=new D;_min;_max;_avg;get min(){return this._min}get max(){return this._max}get avg(){return this._avg}_top;_left;_width;_height;get left(){return this._left}get top(){return this._top}get width(){return this._width}get height(){return this._height}get right(){return this._left+this._width}get bottom(){return this._top+this._height}setTop(e){if(isNaN(e)||e===this.top)return;let{top:t,height:n}=this.getVerticalDimensionFromNewValue(e,`top`),r=!1;t!==this.top&&(this._top=t,this.onSetTop(t),r=!0),n!==this.height&&(this._height=n,this.onSetHeight(n),r=!0),r&&this.onSerializableChange.call(this,`top`)}setLeft(e){if(isNaN(e)||e===this.left)return;let{left:t,width:n}=this.getHorizontalDimensionsFromNewValue(e,`left`),r=!1;t!==this.left&&(this._left=t,this.onSetLeft(t),r=!0),n!==this.width&&(this._width=n,this.onSetWidth(n),r=!0),r&&this.onSerializableChange.call(this,`left`)}setWidth(e){if(e===this.height)return;let t=this.validateWidth(e);!isNaN(t)&&t!==this.width&&(this._width=t,this.onSetWidth(t),this.onSerializableChange.call(this,`width`))}setHeight(e){if(e===this.height)return;let t=this.validateHeight(e);!isNaN(t)&&t!==this.height&&(this._height=t,this.onSetHeight(t),this.onSerializableChange.call(this,`height`))}setBottom(e){if(isNaN(e)||e===this.bottom)return;let{top:t,height:n}=this.getVerticalDimensionFromNewValue(e,`bottom`),r=!1;t!==this.top&&(this._top=t,this.onSetTop(t),r=!0),n!==this.height&&(this._height=n,this.onSetHeight(n),r=!0),r&&this.onSerializableChange.call(this,`bottom`)}setRight(e){if(isNaN(e)||e===this.right)return;let{left:t,width:n}=this.getHorizontalDimensionsFromNewValue(e,`right`),r=!1;t!==this.left&&(this._left=t,this.onSetLeft(t),r=!0),n!==this.width&&(this._width=n,this.onSetWidth(n),r=!0),r&&this.onSerializableChange.call(this,`right`)}_color=e.COLOR_INACTIVE;get color(){return this._color}setColor(e){this._color=e,this.setColorCallback(e),this.onSetColor.call(e)}_initialColor;get initialColor(){return this._initialColor}setInitialColor(e){e!==this.initialColor&&(this._initialColor=e,this.onSetInitialColor.call(e),this.onSerializableChange.call(this,`color`),this.selected===!0&&this.setColor(e))}nameInitial;_name;get name(){return this._name}setName(e){e!==this.name&&(this._name=e,this.onSerializableChange.call(this,`name`),this.onSetName.call(e))}constructor(t,n,r){this.key=t,this.file=n,this._initialColor=r,this.nameInitial=t,this._name=t,this.layerRoot=document.createElement(`div`),this.layerRoot.style.position=`absolute`,this.layerRoot.style.top=`0px`,this.layerRoot.style.left=`0px`,this.layerRoot.style.width=`100%`,this.layerRoot.style.height=`100%`,this.layerRoot.style.overflow=`hidden`,this.layerRoot.id=`analysis_${this.key}`,this.renderRoot.appendChild(this.layerRoot),this.onMoveOrResize.set(e.LISTENER_PROMOTE_MOVE_RESIZE,()=>{this.recalculateValues(),this.onSerializableChange.call(this,`moveOrResize`),this.layers.onAnySerializableChange.call(this,2)}),this.onSerializableChange.set(e.LISTENER_PROMOTE_PROPERTIES_CHANGE,(t,n)=>{e.SERIALISABLE_CHANGES.includes(n)&&this.layers.onAnySerializableChange.call(t,3)})}serializedIsValid(t){let n=t.split(`;`).map(e=>e.trim());return!(n.length<2||!e.VALID_ANALYSIS_TYPES.includes(n[1])||n[1]!==this.getType())}static serializedSegmentsHasExact(e,t){return!!e.find(e=>e===t)}static serializedGetStringValueByKey(e,t){let n=RegExp(`${t}:*`);return e.find(e=>{if(e.match(n))return isNaN(parseInt(e.split(`:`)[1]))})?.split(`:`)[1].trim()}static serializedGetNumericalValueByKey(e,t){let n=RegExp(`${t}:\\d+`),r=e.find(e=>e.match(n));if(r!==void 0)return parseInt(r.split(`:`)[1])}destroyDom(){this.setDeselected(),this.renderRoot.removeChild(this.layerRoot)}setSelected(e=!1,t=!0){if(this.selected===!0)return;this._selected=!0,this.onSelected.call(this),this.setColor(this.initialColor),e===!0&&this.layers.all.filter(e=>e.key!==this.key).forEach(e=>{e.selected&&e.setDeselected(!1)}),t===!0&&this.layers.onSelectionChange.call(this.layers.selectedOnly);let n=this.file.slots.getAnalysisSlot(this);n&&this.file.group.analysisSync.setSlotSelected(this.file,n)}setDeselected(t=!0){if(this.selected===!1)return;this._selected=!1,this.onDeselected.call(this),this.setColor(e.COLOR_INACTIVE),this.arrayOfActivePoints.forEach(e=>e.deactivate()),t===!0&&this.file.analysis.layers.onSelectionChange.call(this.file.analysis.layers.selectedOnly);let n=this.file.slots.getAnalysisSlot(this);n&&this.file.group.analysisSync.setSlotDeselected(this.file,n)}recalculateValues(){let{min:e,max:t,avg:n}=this.getValues();this._min=e,this._max=t,this._avg=n,this.onValues.call(this.min,this.max,this.avg)}dangerouslySetValues(e,t=void 0,n=void 0){this._avg=e,this._min=t,this._max=n,this.onValues.call(this.min,this.max,this.avg)}},gn=class{key;analysis;get file(){return this.analysis.file}pxX;_x;get x(){return this._x}onX=new D;pxY;_y;get y(){return this._y}onY=new D;setXFromTool(e){let{x:t,placement:n}=this.analyzeXFromTool(e);if(this.mayMoveToX(t)){let e=this.x;this._x=t;let r=this.getXStyle(t,n);this.container.style.left=r,this.sideEffectOnXFromTool(t,n),this.onX.call(this.x,e)}}setXDirectly(e,t){if(this.mayMoveToX(e)){let n=this.x;this._x=e;let r=this.getXStyle(e,t);this.container.style.left=r,this.onX.call(this.x,n)}}setYFromTool(e){let{y:t,placement:n}=this.analyzeYFromTool(e);if(this.mayMoveToY(t)){let e=this.y;this._y=t;let r=this.getYStyle(t,n);this.container.style.top=r,this.sideEffectOnYFromTool(t,n),this.onY.call(this.y,e)}}setYDirectly(e,t){if(this.mayMoveToY(e)){let n=this.y;this._y=e;let r=this.getYStyle(e,t);this.container.style.top=r,this.onY.call(this.y,n)}}getXStyle(e,t){let n=this.calculatePercentageX(e),r=t===1?0:t===3?this.pxX:this.pxX/2;return this.formatPositionStyle(n,r)}getYStyle(e,t){let n=this.calculatePercentageY(e),r=t===1?0:t===3?this.pxY:this.pxY/2;return this.formatPositionStyle(n,r)}formatPositionStyle(e,t){return t===0||isNaN(t)?`${e}%`:`calc( ${e}% + ${t}% )`}_color;get color(){return this._color}setColor(e){this._color=e,this.onSetColor(e)}get initialColor(){return this.analysis.initialColor}get activeColor(){return vn.COLOR_ACTIVE}get inactiveColor(){return vn.COLOR_INACTIVE}_active=!1;get active(){return this._active}_isHover=!1;get isHover(){return this._isHover}_isDragging=!1;get isDragging(){return this._isDragging}get root(){return this.analysis.layerRoot}container;innerElement;constructor(e,t,n,r,i,a,o){this.key=e,this.analysis=r,this.pxX=100/this.analysis.file.width,this.pxY=100/this.analysis.file.height,this._x=n,this._y=t,this._color=i,this.container=document.createElement(`div`),this.container.style.position=`absolute`,this.container.id=`analysis_${this.analysis.key}_${this.key}_${this.file.id}`,this.innerElement=this.createInnerElement(),this.container.appendChild(this.innerElement),this.setColor(i),this.setXDirectly(n,a),this.setYDirectly(t,o),this.root.appendChild(this.container)}isWithin(e,t){let n=this.getRadius()/2,r=this.x-n,i=this.x+n,a=this.y-n,o=this.y+n;return t>=r&&t<=i&&e>=a&&e<=o}isInSelectedLayer(){return this.analysis.selected}calculatePercentageX(e){return e/this.analysis.file.width*100}calculatePercentageY(e){return e/this.analysis.file.height*100}getPercentageX(){return this.x/this.analysis.file.width*100}getPercentageY(){return this.y/this.analysis.file.height*100}getPercentageCoordinates(){return{x:this.getPercentageX(),y:this.getPercentageY()}}mouseEnter(){this.isHover===!1&&(this._isHover=!0,this.actionOnMouseEnter(),this.onMouseEnter.call(this))}mouseLeave(){this.isHover===!0&&(this._isHover=!1,this.actionOnMouseLeave(),this.onMouseLeave.call(this))}onMouseEnter=new D;onMouseLeave=new D;onActivate=new D;onDeactivate=new D;activate(){this._active=!0,this.actionOnActivate()}deactivate(){this._active=!1,this.actionOnDeactivate()}},_n=class e extends gn{static size=20;static sizePx(t=1){return Math.round(e.size*t).toString()+`px`}axisX;axisY;center;analyzeXFromTool(e){return{x:e,placement:2}}analyzeYFromTool(e){return{y:e,placement:2}}sideEffectOnXFromTool(){this.analysis.setLeft(this.x)}sideEffectOnYFromTool(){this.analysis.setTop(this.y)}constructor(e,t,n,r,i){super(e,t,n,r,i,2,2),this.axisX=this.buildAxisX(),this.axisY=this.buildAxisY(),this.center=this.buildCenter(),this.innerElement.appendChild(this.axisX),this.innerElement.appendChild(this.axisY),this.innerElement.appendChild(this.center),this.analysis.onValues.set(this.key,()=>{let e=this.analysis.file.getColorAtPoint(this.x,this.y);this.center&&e&&(this.center.style.backgroundColor=e)})}mayMoveToX(e){return e<=this.file.width&&e>=0}mayMoveToY(e){return e<=this.file.height&&e>=0}createInnerElement(){let t=document.createElement(`div`);return t.classList.add(`innerElement`),t.style.position=`absolute`,t.style.top=e.sizePx(-.5),t.style.left=e.sizePx(-.5),t.style.width=e.sizePx(),t.style.height=e.sizePx(),t}buildAxisX(){let t=document.createElement(`div`);return t.style.position=`absolute`,t.style.width=`100%`,t.style.height=`1px`,t.style.left=`0px`,t.style.top=e.sizePx(.5),t}buildAxisY(){let t=document.createElement(`div`);return t.style.position=`absolute`,t.style.width=`1px`,t.style.height=`100%`,t.style.left=e.sizePx(.5),t.style.top=`0px`,t}buildCenter(){let t=document.createElement(`div`);t.style.position=`absolute`,t.style.top=`calc( ${e.sizePx(.5)} - 3px )`,t.style.left=`calc( ${e.sizePx(.5)} - 3px )`,t.style.width=`5px`,t.style.height=`5px`,t.style.borderStyle=`solid`,t.style.borderWidth=`1px`;let n=this.analysis.file.getColorAtPoint(this.x,this.y);return n&&(t.style.backgroundColor=n),t}onSetColor(e){this.axisX&&(this.axisX.style.backgroundColor=e),this.axisY&&(this.axisY.style.backgroundColor=e),this.center&&(this.center.style.borderColor=e)}actionOnMouseEnter(){this.isInSelectedLayer()&&(this.setColor(this.activeColor),this.setBoxShadow(`white`))}actionOnMouseLeave(){this.isInSelectedLayer()?this.setColor(this.analysis.initialColor):this.setColor(this.inactiveColor),this.setBoxShadow(void 0)}actionOnActivate(){this.innerElement&&this.setColor(this.activeColor)}actionOnDeactivate(){this.innerElement&&this.setColor(this.inactiveColor)}getRadius(){return 10}setBoxShadow(e=void 0){if(e===void 0)this.axisX?.style.removeProperty(`box-shadow`),this.axisY?.style.removeProperty(`box-shadow`),this.center?.style.removeProperty(`box-shadow`);else{let t=`0 0 5px 2px ${e}`;this.axisX&&(this.axisX.style.boxShadow=t),this.axisY&&(this.axisY.style.boxShadow=t),this.center&&(this.center.style.boxShadow=t)}}},vn=class e extends hn{getType(){return`point`}center;_graph;get graph(){return this._graph||=new yn(this),this._graph}static addAtPoint(t,n,r,i,a){return new e(t,n,r,i,a)}constructor(e,t,n,r,i){super(e,n,t),this._top=r,this._left=i,this._width=0,this._height=0,this.center=new _n(`center`,r,i,this,t),this.points.set(`center`,this.center),this.recalculateValues()}setColorCallback(e){this.center.setColor(e)}isWithin(e,t){return this.center.isWithin(t,e)}getValues(){let e=this.file.getTemperatureAtPoint(this.center.x,this.center.y);return{min:e,max:e,avg:e}}async getAnalysisData(){return await this.file.reader.pointAnalysisData(this.center.x,this.center.y)}validateWidth(){return 0}validateHeight(){return 0}onSetLeft(e){this.center.setXDirectly(e,2),this.onSerializableChange.call(this,`left`)}onSetTop(e){this.center.setYDirectly(e,2),this.onSerializableChange.call(this,`top`)}onSetWidth(){}onSetHeight(){}getVerticalDimensionFromNewValue(e){let t=Math.min(this.file.height-1,Math.max(0,Math.round(e)));return{top:t,bottom:t,height:0}}getHorizontalDimensionsFromNewValue(e){let t=Math.min(this.file.width-1,Math.max(0,Math.round(e)));return{left:t,right:t,width:0}}recievedSerialized(e){if(!this.serializedIsValid(e))return;let t=e.split(`;`).map(e=>e.trim()),n=!1,r=t[0];r!==this.name&&this.setName(r);let i=hn.serializedSegmentsHasExact(t,`avg`);i!==this.graph.state.AVG&&(this.graph.setAvgActivation(i),n=!0);let a=hn.serializedGetStringValueByKey(t,`color`);a===void 0||a!==this.initialColor&&this.setInitialColor(a);let o=hn.serializedGetNumericalValueByKey(t,`top`),s=hn.serializedGetNumericalValueByKey(t,`left`);o!==void 0&&(this.setTop(o),n=!0),s!==void 0&&(this.setLeft(s),n=!0),n&&this.recalculateValues()}toSerialized(){let e=[];return e.push(this.name),e.push(`point`),e.push(`top:${this.top}`),e.push(`left:${this.left}`),e.push(`color:${this.initialColor}`),this.graph.state.AVG&&e.push(`avg`),e.join(`;`)}},yn=class{analysis;constructor(e){this.analysis=e,this.hydrate()}_min=!1;_max=!1;_avg=!1;get state(){return{MIN:this._min,MAX:this._max,AVG:this._avg}}_value;get value(){return this._value}set value(e){this._value=e,this.onGraphData.call(e,this.analysis)}setMinActivation(e){this._min!==e&&(this._min=e,this.emitGraphActivation(),this.analysis.onSerializableChange.call(this.analysis,`min`))}setMaxActivation(e){this._max!==e&&(this._max=e,this.emitGraphActivation(),this.analysis.onSerializableChange.call(this.analysis,`max`))}setAvgActivation(e){this._avg!==e&&(this._avg=e,this.emitGraphActivation(),this.analysis.onSerializableChange.call(this.analysis,`avg`))}onGraphActivation=new D;onGraphData=new D;onAnalysisSelection=new D;emitGraphActivation(){this.onGraphActivation.call(this._min,this._max,this._avg)}async hydrate(){this.analysis.onSetInitialColor.set(`__graphs`,()=>{this.analysis.file.analysisData.listeners.refreshOutput()}),this.analysis.onSelected.set(`__graphs`,e=>{this.onAnalysisSelection.call(!0,e)}),this.analysis.onMoveOrResize.set(`__graphs`,async e=>{let t=await e.getAnalysisData();this.value=t});let e=await this.getGraphData();this.value=e}async getGraphData(){return await this.analysis.getAnalysisData()}getGraphColors(){if(this.analysis instanceof vn)return this._avg?[this.analysis.initialColor]:[];let e=[];return Object.values(this.state).forEach(t=>{t&&e.push(this.analysis.initialColor)}),e}getGraphLabels(){if(this.analysis instanceof vn)return this._avg?[this.analysis.name]:[];let e=[];return Object.entries(this.state).forEach(([t,n])=>{n&&e.push(`${this.analysis.name} ${t}`)}),e}hasDataToPrint(){return this.analysis instanceof vn?this._avg:this._min||this._max||this._avg}getDtaAtTime(e){if(this.analysis instanceof vn)return this._avg?[this.value[e]]:[];let t=[],n=this.value;return this._min&&t.push(n[e].min),this._max&&t.push(n[e].max),this._avg&&t.push(n[e].avg),t}},bn=class extends gn{constructor(e,t,n,r,i,a,o){super(e,t,n,r,i,a,o)}createInnerElement(){let e=document.createElement(`div`);return e.style.position=`absolute`,e.style.top=`-5px`,e.style.left=`-5px`,e.style.width=`10px`,e.style.height=`10px`,e.style.position=`absolute`,e.style.backgroundColor=this.color,e}actionOnMouseEnter(){this.innerElement&&this.isInSelectedLayer()&&(this.innerElement.style.boxShadow=`0px 0px 10px 2px white`,this.innerElement.style.borderWidth=`1px`,this.innerElement.style.borderStyle=`solid`,this.innerElement.style.borderColor=`white`)}actionOnMouseLeave(){this.innerElement&&(this.innerElement.style.removeProperty(`box-shadow`),this.innerElement.style.removeProperty(`border-width`),this.innerElement.style.removeProperty(`border-style`),this.innerElement.style.removeProperty(`border-color`))}},xn=class extends bn{_pairX;_pairY;get pairX(){return this._pairX}get pairY(){return this._pairY}setPairX(e){this._pairX=e}setPairY(e){this._pairY=e}getRadius(){return 10}mayMoveToX(e){return e<=this.file.width&&e>=0}mayMoveToY(e){return e<=this.file.height&&e>=0}getCenterX(){return this.analysis.left+this.analysis.width/2}getCenterY(){return this.analysis.top+this.analysis.height/2}get isLeftSide(){return this.x<=this.getCenterX()}get isTopSide(){return this.y<=this.getCenterY()}get isRightSide(){return this.x>this.getCenterX()}get isBottomSide(){return this.y>this.getCenterY()}analyzeXFromTool(e){return{x:e,placement:this.isLeftSide?1:3}}analyzeYFromTool(e){return{y:e,placement:this.isTopSide?1:3}}sideEffectOnXFromTool(e,t){this.pairX.setXDirectly(e,t),e>this.pairY.x?this.analysis.leftSidePoints.forEach(e=>{e.setXDirectly(e.x,1)}):this.analysis.rightSidePoints.forEach(e=>{e.setXDirectly(e.x,3)})}sideEffectOnYFromTool(e,t){this.pairY.setYDirectly(e,t),e>this.pairX.y?this.analysis.topSidePoints.forEach(e=>{e.setYDirectly(e.y,1)}):this.analysis.bottomSidePoints.forEach(e=>{e.setYDirectly(e.y,3)})}isMoving=!1;onSetColor(e){this.innerElement&&(this.innerElement.style.backgroundColor=e)}actionOnActivate(){this.innerElement&&this.setColor(this.activeColor)}actionOnDeactivate(){this.innerElement&&this.setColor(this.isInSelectedLayer()?this.initialColor:this.inactiveColor)}},Sn=class extends hn{wPx=(100/this.file.width/2).toString()+`%`;hPx=(100/this.file.height/2).toString()+`%`;tl;tr;bl;br;area;_graph;get graph(){return this._graph||=new yn(this),this._graph}isWithin(e,t){return e>=this.left&&e<=this.left+this.width&&t>=this.top&&t<=this.top+this.height}static calculateDimensionsFromCorners(e,t,n,r){let i=Math.min(e,r),a=Math.max(e,r),o=Math.min(t,n);return{top:i,left:o,width:Math.max(t,n)-o,height:a-i}}constructor(e,t,n,r,i,a,o){super(e,n,t);let s=i,c=r;a!==void 0&&o!==void 0&&(s=i+a,c=r+o),this.area=this.buildArea(r,i,a,o),this.tl=this.addPoint(`tl`,r,i,1,1),this.tr=this.addPoint(`tr`,r,s,3,1),this.bl=this.addPoint(`bl`,c,i,1,3),this.br=this.addPoint(`br`,c,s,3,3),this.tl.setPairX(this.bl),this.tl.setPairY(this.tr),this.tr.setPairX(this.br),this.tr.setPairY(this.tl),this.bl.setPairX(this.tl),this.bl.setPairY(this.br),this.br.setPairX(this.tr),this.br.setPairY(this.bl),this.calculateBounds(),this.onMoveOrResize.set(`sync the area`,()=>{this.calculateBounds()})}setColorCallback(e){this.points.forEach(t=>t.setColor(e)),this.area.setColor(e)}calculateBounds(){let e=this.file.width,t=0,n=this.file.height,r=0;this.points.forEach(i=>{i.x>t&&(t=i.x),i.x<e&&(e=i.x),i.y<n&&(n=i.y),i.y>r&&(r=i.y)}),this._left=e,this._top=n,this._width=t-e,this._height=r-n,this.area.left=this.left,this.area.top=this.top,this.area.height=this.height,this.area.width=this.width}addPoint(e,t,n,r,i){let a=new xn(e,t,n,this,this.color,r,i);return this.points.set(e,a),a}validateWidth(e){let t=this.file.width-1-this.left;return Math.max(0,Math.min(t,Math.round(e)))}validateHeight(e){let t=this.file.height-1-this.top;return Math.max(0,Math.min(t,Math.round(e)))}onSetLeft(e){this.area.left=e,this.forPoints(this.leftSidePoints,t=>{t.setXDirectly(e,1)}),this.forPoints(this.rightSidePoints,e=>{e.setXDirectly(this.right,3)})}onSetTop(e){this.area.top=e,this.forPoints(this.topSidePoints,t=>{t.setYDirectly(e,1)}),this.forPoints(this.bottomSidePoints,e=>{e.setYDirectly(this.bottom,3)})}onSetWidth(e){this.area.width=e,this.forPoints(this.leftSidePoints,e=>{e.setXDirectly(this.left,1)}),this.forPoints(this.rightSidePoints,e=>{e.setXDirectly(this.right,3)})}onSetHeight(e){this.area.height=e,this.forPoints(this.topSidePoints,e=>{e.setYDirectly(this.top,1)}),this.forPoints(this.bottomSidePoints,e=>{e.setYDirectly(this.bottom,3)})}getVerticalDimensionFromNewValue(e,t){let n=Math.round(e),r=this.file.height-1,i=t===`top`?this.bottom:this.top;return n<=0?{top:0,bottom:i,height:i}:n>r?{top:i,bottom:r,height:r-i}:t===`bottom`?n<=this.top?{top:n,bottom:this.top,height:this.top-n}:{top:this.top,bottom:n,height:n-this.top}:n>=this.bottom?{top:this.bottom,bottom:n,height:n-this.bottom}:{top:n,bottom:this.bottom,height:this.bottom-n}}getHorizontalDimensionsFromNewValue(e,t){let n=Math.round(e),r=this.file.width-1,i=t===`left`?this.right:this.left;return n<=0?{left:0,right:i,width:i}:n>r?{left:i,right:r,width:r-i}:t===`right`?n<=this.left?{left:n,right:this.left,width:this.left-n}:{left:this.left,right:n,width:n-this.left}:n>=this.right?{left:this.right,right:n,width:n-this.right}:{left:n,right:this.right,width:this.right-n}}get leftSidePoints(){return Array.from(this.points.values()).filter(e=>e.isLeftSide)}get rightSidePoints(){return Array.from(this.points.values()).filter(e=>e.isRightSide)}get topSidePoints(){return Array.from(this.points.values()).filter(e=>e.isTopSide)}get bottomSidePoints(){return Array.from(this.points.values()).filter(e=>e.isBottomSide)}forPoints(e,t){e.forEach(e=>t(e))}recievedSerialized(e){if(!this.serializedIsValid(e))return;let t=e.split(`;`).map(e=>e.trim()),n=!1,r=t[0];r!==this.name&&this.setName(r);let i=hn.serializedSegmentsHasExact(t,`avg`);i!==this.graph.state.AVG&&this.graph.setAvgActivation(i);let a=hn.serializedSegmentsHasExact(t,`min`);a!==this.graph.state.MIN&&this.graph.setMinActivation(a);let o=hn.serializedSegmentsHasExact(t,`max`);o!==this.graph.state.MAX&&this.graph.setMaxActivation(o);let s=hn.serializedGetStringValueByKey(t,`color`);s===void 0||s!==this.initialColor&&this.setInitialColor(s);let c=hn.serializedGetNumericalValueByKey(t,`top`),l=hn.serializedGetNumericalValueByKey(t,`left`),u=hn.serializedGetNumericalValueByKey(t,`width`),d=hn.serializedGetNumericalValueByKey(t,`height`);c!==void 0&&c!==this.top&&(this.setTop(c),n=!0),l!==void 0&&l!==this.left&&(this.setLeft(l),n=!0),u!==void 0&&u!==this.width&&(this.setWidth(u),n=!0),d!==void 0&&d!==this.height&&(this.setHeight(d),n=!0),n&&this.recalculateValues()}toSerialized(){let e=[];return e.push(this.name),e.push(this.getType()),e.push(`color:${this.initialColor}`),e.push(`top:${this.top}`),e.push(`left:${this.left}`),e.push(`width:${this.width}`),e.push(`height:${this.height}`),this.graph.state.AVG&&e.push(`avg`),this.graph.state.MIN&&e.push(`min`),this.graph.state.MAX&&e.push(`max`),e.join(`;`)}},Cn=class{analysis;pxX;pxY;get fileWidth(){return this.analysis.file.width}get fileHeight(){return this.analysis.file.height}get root(){return this.analysis.layerRoot}element;_top;_width;_left;_height;get top(){return this._top}set top(e){this._top=e,this.element&&(this.element.style.top=`${this._top/this.fileHeight*100}%`)}get left(){return this._left}set left(e){this._left=e,this.element&&(this.element.style.left=`${this._left/this.fileWidth*100}%`)}get height(){return this._height}set height(e){this._height=e,this.element&&(this.element.style.height=`calc( ${this.height/this.fileHeight*100}% + ${this.pxY}% )`)}get width(){return this._width}set width(e){this._width=e,this.element&&(this.element.style.width=`calc( ${this.width/this.fileWidth*100}% + ${this.pxX}% )`)}get center(){return{x:this.left+this.width/2,y:this.top+this.height/2}}constructor(e,t,n,r,i){this.analysis=e,this.pxX=100/this.analysis.file.width,this.pxY=100/this.analysis.file.height,this.build(),this.top=t,this.left=r,this.width=n,this.height=i}build(){this.element=document.createElement(`div`),this.element.style.position=`absolute`,this.onBuild(),this.root.appendChild(this.element)}setColor(e){this.onSetColor(e)}},wn=class extends Cn{onBuild(){this.element.style.borderWidth=`1px`,this.element.style.borderColor=this.analysis.color,this.element.style.borderStyle=`solid`,this.element.style.borderRadius=`50%`}onSetColor(e){this.element.style.borderColor=e}},Tn=class e extends Sn{getType(){return`ellipsis`}static startAddingAtPoint(t,n,r,i,a){let o=new e(t,n,r,i,a);return o.br.activate(),o}static build(t,n,r,i,a,o,s){let{top:c,left:l,width:u,height:d}=e.calculateDimensionsFromCorners(i,a,o,s),f=new e(t,n,r,c,l,u,d);return f.recalculateValues(),f}buildArea(e,t,n,r){return n!==void 0&&r!==void 0?new wn(this,e,t,e+n,t+r):new wn(this,e,t,e,t)}getValues(){let e=this.left,t=this.left+this.width,n=this.top,r=this.top+this.height,i=1/0,a=-1/0,o=0,s=0;for(let c=n;c<r;c++){let n=this.file.width*c;for(let r=e;r<=t;r++)if(this.isWithin(r,c)){let e=this.file.pixels[n+r];e<i&&(i=e),e>a&&(a=e),s+=e,o++}}return{min:i,max:a,avg:s/o}}isWithin(e,t){let n=this.left+this.width/2,r=this.top+this.height/2,i=(e-n)/(this.width/2),a=(t-r)/(this.height/2);return i*i+a*a<=1}async getAnalysisData(){return await this.file.reader.ellipsisAnalysisData(this.left,this.top,this.width,this.height)}},En=class extends Cn{onBuild(){this.element.style.borderWidth=`1px`,this.element.style.borderColor=this.analysis.color,this.element.style.borderStyle=`solid`}onSetColor(e){this.element.style.borderColor=e}},Dn=class e extends Sn{getType(){return`rectangle`}static startAddingAtPoint(t,n,r,i,a){let o=new e(t,n,r,i,a);return o.br.activate(),o}static build(t,n,r,i,a,o,s){let{top:c,left:l,width:u,height:d}=e.calculateDimensionsFromCorners(i,a,o,s),f=new e(t,n,r,c,l,u,d);return f.recalculateValues(),f}buildArea(e,t,n,r){return n!==void 0&&r!==void 0?new En(this,e,t,e+n,t+r):new En(this,e,t,e,t)}getValues(){let e=this.left,t=this.left+this.width,n=this.top,r=this.top+this.height,i=1/0,a=-1/0,o=0,s=0;for(let c=n;c<r;c++){let n=this.file.width*c;for(let r=e;r<=t;r++){let e=this.file.pixels[n+r];e<i&&(i=e),e>a&&(a=e),s+=e,o++}}return{min:i,max:a,avg:s/o}}async getAnalysisData(){return await this.file.reader.rectAnalysisData(this.left,this.top,this.width,this.height)}},On=[`Blue`,`Red`,`Lightblue`,`Green`,`Brown`,`Yellow`,`Navy`,`Pink`,`DarkGoldenRod`,`GreenYellow`,`SpringGreen`,`SkyBlue`],kn=class extends Map{drive;layers=[];get slots(){return this.drive.parent.slots}get all(){return this.layers}get selectedOnly(){return this.all.filter(e=>e.selected===!0)}onAdd=new D;onRemove=new D;onSelectionChange=new D;onAnySerializableChange=new D;colors=On;constructor(e){super(),this.drive=e}addAnalysis(e,t){this.has(e.key)&&this.removeAnalysis(e.key),e.setColor(e.initialColor),this.set(e.key,e),this.layers=[...this.layers,e];let n=t===!0?this.slots.getNextFreeSlotNumber():t===!1?void 0:t;return n!==void 0&&this.slots.assignAnalysisToSlot(n,e),this.onAdd.call(e,this.all),this.onAnySerializableChange.call(e,0),this.drive.dangerouslySetValueFromStorage(this.all),this}removeAnalysis(e){if(this.has(e)){let t=this.get(e);t&&(this.slots.unassignAnalysisFromItsSlot(t),t.destroyDom(),this.delete(e),this.layers=this.layers.filter(t=>t.key!==e),this.drive.dangerouslySetValueFromStorage(this.all),this.onRemove.call(e),this.onAnySerializableChange.call(t,1))}}removeAllAnalyses(){this.forEach(e=>{this.removeAnalysis(e.key)})}createRectFrom(e,t){let n=Dn.startAddingAtPoint(this.getNextName(`Rectangle`),this.getNextColor(),this.drive.parent,e,t);return this.addAnalysis(n,!1),n}placeRectAt(e,t,n,r,i,a,o){let s=Dn.build(e,a??this.getNextColor(),this.drive.parent,t,n,r,i);return s.setReady(),this.addAnalysis(s,o),s}createEllipsisFrom(e,t){let n=Tn.startAddingAtPoint(this.getNextName(`Ellipsis`),this.getNextColor(),this.drive.parent,e,t);return this.addAnalysis(n,!1),n}placeEllipsisAt(e,t,n,r,i,a,o){let s=Tn.build(e,a??this.getNextColor(),this.drive.parent,t,n,r,i);return s.setReady(),this.addAnalysis(s,o),s}createPointAt(e,t){let n=vn.addAtPoint(this.getNextName(`Point`),this.getNextColor(),this.drive.parent,e,t);return this.addAnalysis(n,!0),n}placePointAt(e,t,n,r,i){let a=vn.addAtPoint(e,r??this.getNextColor(),this.drive.parent,t,n);return a.setReady(),this.addAnalysis(a,i),a}selectAll(){this.all.filter(e=>{e.selected===!1&&e.setSelected(!1,!1)}),this.onSelectionChange.call(this.selectedOnly)}deselectAll(){this.selectedOnly.forEach(e=>{e.setDeselected(!1)}),this.onSelectionChange.call(this.selectedOnly)}getNextColor(){let e=this.all.map(e=>e.initialColor),t=On.filter(t=>!e.includes(t));return t.length>0?t[0]:On[0]}getNextName(e){let t=this.all.length;for(;this.has(`${e} ${t}`);)t++;return`${e} ${t}`}},An=class{drive;constructor(e){this.drive=e}get all(){return this.extractPointsFromLayers(this.drive.layers.all)}get allInSelectedLayers(){return this.extractPointsFromLayers(this.drive.layers.selectedOnly)}get activeInSelectedLayers(){return this.extractPointsFromLayers(this.drive.layers.selectedOnly,!0)}extractPointsFromLayers(e,t=!1){return e.reduce((e,n)=>{let r=t?n.arrayOfActivePoints:n.arrayOfPoints;return[...e,...r]},[])}},jn=class extends mn{layers=new kn(this);points=new An(this);listener;get currentTool(){return this.parent.group.tool.value}bindedPointerMoveListener;bindedPointerDownListener;bindedPointerUpListener;dangerouslySetValueFromStorage(e){this.value=e}validate(e){return e}afterSetEffect(){}getRelativePosition(e){if(!this.listener)return{top:0,left:0};let t=this.listener.clientWidth,n=this.parent.width,r=e.layerX/t,i=Math.round(n*r),a=this.listener.clientHeight,o=this.parent.height,s=e.layerY/a;return{top:Math.round(o*s),left:i}}activateListeners(e){this.listener=e,this.bindedPointerMoveListener=e=>{let t=this.getRelativePosition(e);this.points.all.forEach(e=>{e.active&&this.currentTool.onPointMove(e,t.top,t.left);let n=e.isWithin(t.top,t.left);n?this.currentTool.onPointEnter(e):n||this.currentTool.onPointLeave(e)})},this.bindedPointerDownListener=e=>{let t=this.getRelativePosition(e);this.currentTool.onCanvasClick(t.top,t.left,this.parent),this.points.all.forEach(e=>{e.isWithin(t.top,t.left)&&this.currentTool.onPointDown(e)})},this.bindedPointerUpListener=()=>{this.points.all.forEach(e=>{this.currentTool.onPointUp(e)})},this.listener.addEventListener(`pointermove`,this.bindedPointerMoveListener),this.listener.addEventListener(`pointerdown`,this.bindedPointerDownListener),this.listener.addEventListener(`pointerup`,this.bindedPointerUpListener)}deactivateListeners(){this.bindedPointerMoveListener&&this.listener&&this.listener.removeEventListener(`pointermove`,this.bindedPointerMoveListener),this.bindedPointerDownListener&&this.listener&&this.listener.removeEventListener(`pointerdown`,this.bindedPointerDownListener),this.bindedPointerUpListener&&this.listener&&this.listener.removeEventListener(`pointerup`,this.bindedPointerUpListener)}},Mn=class{drive;listenerKey=`___listen-to-graphs___`;get layers(){return this.drive.parent.analysis.layers}_graphs=new Map;get graphs(){return this._graphs}addGraph(e){this._graphs.set(e.analysis.key,e),this.onAddGraph.call(e)}removeGraph(e){this._graphs.delete(e),this.onRemoveGraph.call(e)}_output={values:[[]],colors:[]};get output(){return this._output}set output(e){this._output=e,this.onOutput.call(e)}onOutput=new D;onAddGraph=new D;onRemoveGraph=new D;constructor(e){this.drive=e,this.layers.onAdd.set(this.listenerKey,async e=>{let t=e.graph;this.addGraph(t),t.onAnalysisSelection.set(this.listenerKey,async()=>{this.refreshOutput()}),t.onGraphActivation.set(this.listenerKey,async()=>{this.refreshOutput()}),t.onGraphData.set(this.listenerKey,async()=>{this.refreshOutput()}),t.analysis.onSetName.set(this.listenerKey,()=>{this.refreshOutput()})}),this.layers.onRemove.set(this.listenerKey,async e=>{this.removeGraph(e),this.refreshOutput()})}refreshOutput(){let e={values:[[`Time`]],colors:[]};return this.graphs.forEach(t=>{e.values[0].push(...t.getGraphLabels()),e.colors.push(...t.getGraphColors())}),this.graphs.forEach(t=>{t.hasDataToPrint()&&t.value&&Object.keys(t.value).forEach((n,r)=>{let i=e.values[r+1];if(i===void 0){let t=new Date;t.setTime(parseInt(n)),i=[t],e.values[r+1]=i}i.push(...t.getDtaAtTime(parseInt(n)))})}),this.output=e,e}hasGraph(){return Object.values(this.graphs).find(e=>e.hasDataToPrint()).length>0}generateExportData(){let e={},t=[{key:`time_relative`,displayLabel:`Relative Time`},{key:`time_absolute`,displayLabel:`Absolute Time`},{key:`millisecondy`,displayLabel:`Milliseconds`},{key:`timestamp`,displayLabel:`Timestamp`}];for(let n of this.graphs.values()){let r=n.getGraphLabels();for(let e of r)t.push({key:e,displayLabel:`${e} (${n.analysis.initialColor}, ${n.analysis.width} x ${n.analysis.height} px)`});n.value&&Object.keys(n.value).forEach(i=>{if(!Object.keys(e).includes(i)){let r=parseInt(i),a=r+n.analysis.file.timestamp;e[i]={[t[0].key]:Dt(r,`m:ss:SSS`)+` `,[t[1].key]:Dt(a,`d. M.y m:ss:SSS`)+` `,[t[2].key]:r,[t[3].key]:a}}let a=n.getDtaAtTime(parseInt(i));r.forEach((t,n)=>{e[i][t]=a[n]})})}return{header:t,data:Object.values(e)}}},Nn=class extends mn{_hasActiveGraphs=!1;get hasActiveGraphs(){return this._hasActiveGraphs}onGraphsPresence=new D;listeners=new Mn(this);constructor(e){super(e,{values:[[]],colors:[]}),this.listeners.onOutput.set(`__mirror_output_to_local_state`,async e=>{this.value=e,e.colors.length>0?this.hasActiveGraphs||(this._hasActiveGraphs=!0,this.onGraphsPresence.call(!0)):this.hasActiveGraphs&&(this._hasActiveGraphs=!1,this.onGraphsPresence.call(!1))})}validate(e){return e}afterSetEffect(){}dangerouslyUpdateValue(e){this.value=e}downloadData(){let{data:e,header:t}=this.listeners.generateExportData(),n=C({fieldSeparator:`;`,filename:`analysis_${this.parent.fileName}_${Date.now()}.csv`,columnHeaders:t}),r=xe(n)(e);Ce(n)(r)}async updateAllAnalysesValues(){let e=this.parent;try{let t=e.analysis.value.map(e=>e instanceof vn?[e.getType(),e.key,e.top,e.left,1,1]:[e.getType(),e.key,e.top,e.left,e.width,e.height]);(await e.pool.exec(async(e,t,n,r)=>{let i=r.map(e=>({id:e[1],type:e[0],min:{value:1/0},max:{value:-1/0},avg:{value:0,sum:0,count:0}}));for(let a=0;a<e;a++)for(let o=0;o<t;o++){let s=n[a+o*e],c=(e,t,n,r,i,a)=>{let o=n+i/2,s=r+a/2,c=(e-o)/(i/2),l=(t-s)/(a/2);return c*c+l*l<=1};r.forEach((n,r)=>{let l=i[r],u=n[0],d=n[2],f=n[3],p=n[4],m=n[5];u===`point`?a===f&&o===d&&(l.avg.value=s):u===`rectangle`?a>=f&&a<f+p&&o>=d&&o<d+m&&(s<l.min.value&&(l.min.value=s),s>l.max.value&&(l.max.value=s),l.avg.count=l.avg.count+1,l.avg.sum=l.avg.sum+s):u===`ellipsis`&&c(a,o,f,d,e,t)&&(s<l.min.value&&(l.min.value=s),s>l.max.value&&(l.max.value=s),l.avg.count=l.avg.count+1,l.avg.sum=l.avg.sum+s)})}return{stats:i.map(e=>({id:e.id,min:e.min.value===1/0?void 0:e.min.value,max:e.max.value===-1/0?void 0:e.max.value,avg:e.type===`point`?e.avg.value:e.avg.sum/e.avg.count}))}},[e.width,e.height,e.pixels,t],{})).stats.forEach(t=>{e.analysis.layers.get(t.id)?.dangerouslySetValues(t.avg,t.min,t.max)})}catch(e){e instanceof Error&&console.error(e)}}},Pn=class{slot;_analysis;get analysis(){return this._analysis}_serialized;get serialized(){return this._serialized}onSerialize=new D;enqueuedSerialisation;constructor(e,t){this.slot=e,this._analysis=t,this.hydrate(t),this._serialized=this.analysis.toSerialized(),this.propagateSerialisationUp(this._serialized)}listenerKey(e){return`slot ${this.slot} ${e}`}dehydrate(e){e.onSerializableChange.delete(this.listenerKey(`serializable change`))}hydrate(e){e.onSerializableChange.set(this.listenerKey(`serializable change`),()=>{this.enqueueSerialisation()})}enqueueSerialisation(){this.enqueuedSerialisation||=setTimeout(()=>{this.serialize(),this.enqueuedSerialisation=void 0},0)}serialize(){this._serialized=this.analysis.toSerialized(),this.onSerialize.call(this._serialized,this.analysis),this.propagateSerialisationUp(this._serialized)}recieveSerialized(e){this.analysis.recievedSerialized(e);let t=this.analysis.toSerialized();t!==e&&(this._serialized=t,this.onSerialize.call(this._serialized,this.analysis))}propagateSerialisationUp(e){let t=this.analysis.file.slots.getOnSerializeManager(this.slot);t&&(t.call(e),this.analysis.file.slots.markAsChanged())}},Fn=class e extends mn{static MAX_SLOTS=7;onAnySlotChanged=new D;_onAnySlotChangedTimeout;markAsChanged(){this._onAnySlotChangedTimeout&&clearTimeout(this._onAnySlotChangedTimeout),this._onAnySlotChangedTimeout=setTimeout(()=>{this.onAnySlotChanged.call(),this._onAnySlotChangedTimeout=void 0},0)}onSlot1Assignement=new D;onSlot2Assignement=new D;onSlot3Assignement=new D;onSlot4Assignement=new D;onSlot5Assignement=new D;onSlot6Assignement=new D;onSlot7Assignement=new D;onSlot1Serialize=new D;onSlot2Serialize=new D;onSlot3Serialize=new D;onSlot4Serialize=new D;onSlot5Serialize=new D;onSlot6Serialize=new D;onSlot7Serialize=new D;getNextFreeSlotNumber(){for(let t=1;t<=e.MAX_SLOTS;t++)if(!this.hasSlot(t))return t}assignAnalysisToSlot(e,t){this.getSlot(e)!==void 0&&this.removeSlotAndAnalysis(e);let n=this.getAnalysisSlot(t);n!==void 0&&this.unassignAnalysisFromItsSlot(this.getSlot(n).analysis);let r=new Pn(e,t);this.value.set(e,r);let i=this.getOnAssignementManager(e),a=this.getOnSerializeManager(e);return i&&i.call(r),a&&a.call(r.serialized),this.callAllListenersWithCurrentValue(),r}hasSlot(e){return this.value.has(e)}getSlot(e){return this.value.get(e)}getFullSlotsMap(){let e=new Map;return[1,2,3,4,5,6,7].forEach(t=>{this.hasSlot(t)?e.set(t,this.getSlot(t)):e.set(t,void 0)}),e}getAnalysisSlot(e){for(let t of this.value.values())if(t.analysis.key===e.key)return t.slot}removeSlotAndAnalysis(e){let t=this.value.get(e);if(t){let n=t.analysis;this.emitOnAssignement(e,void 0),this.value.delete(e),this.parent.analysis.layers.removeAnalysis(n.key),this.callAllListenersWithCurrentValue()}}unassignAnalysisFromItsSlot(e){for(let t of this.value.values())t.analysis.key===e.key&&(this.emitOnAssignement(t.slot,void 0),this.value.delete(t.slot),this.parent.group.analysisSync.value===!0&&this.parent.group.analysisSync.deleteSlot(this.parent,t.slot),this.callAllListenersWithCurrentValue())}createAnalysisFromSerialized(e,t){let n=e.split(`;`).map(e=>e.trim());if(n.length<2)return;let r=n[0]!==void 0&&n[0].length>0?n[0]:void 0;if(r===void 0)return;let i=n[1];if(![`rectangle`,`ellipsis`,`point`].includes(i))return;let a=hn.serializedGetNumericalValueByKey(n,`top`),o=hn.serializedGetNumericalValueByKey(n,`left`),s=hn.serializedGetStringValueByKey(n,`color`),c=hn.serializedGetNumericalValueByKey(n,`width`),l=hn.serializedGetNumericalValueByKey(n,`height`),u=hn.serializedSegmentsHasExact(n,`avg`),d=hn.serializedSegmentsHasExact(n,`min`),f=hn.serializedSegmentsHasExact(n,`max`);a!==void 0&&(a<0&&(a=0),a>this.parent.height-1&&(a=this.parent.height-1)),o!==void 0&&(o<0&&(o=0),o>this.parent.width-1&&(o=this.parent.width-1));let p;if(i===`point`){if(a===void 0||o===void 0)return;p=this.parent.analysis.layers.placePointAt(r,a,o,s,!1)}else{if(a===void 0||o===void 0||c===void 0||l===void 0)return;c<0&&(c=0),c+o>this.parent.width-1&&(c=this.parent.width-o-1),l<0&&(l=0),l+a>this.parent.height-1&&(l=this.parent.height-a-1),p=i===`rectangle`?this.parent.analysis.layers.placeRectAt(r,a,o,c+o,l+a,s,!1):this.parent.analysis.layers.placeEllipsisAt(r,a,o,c+o,l+a,s,!1)}if(p!==void 0){if(p instanceof vn?u&&p.graph.setAvgActivation(!0):p instanceof Sn&&(u&&p.graph.setAvgActivation(!0),d&&p.graph.setMinActivation(!0),f&&p.graph.setMaxActivation(!0)),t!==!1){if(t===!0){let e=this.getNextFreeSlotNumber();e!==void 0&&this.assignAnalysisToSlot(e,p)}else t!==void 0&&this.assignAnalysisToSlot(t,p)}return p}}validate(e){return e}afterSetEffect(){}emitOnAssignement(e,t){let n=this.getOnAssignementManager(e);n&&n.call(t);let r=this.getOnSerializeManager(e);r&&r.call(t?t.serialized:void 0)}getOnSerializeManager(e){if(e===1)return this.onSlot1Serialize;if(e===2)return this.onSlot2Serialize;if(e===3)return this.onSlot3Serialize;if(e===4)return this.onSlot4Serialize;if(e===5)return this.onSlot5Serialize;if(e===6)return this.onSlot6Serialize;if(e===7)return this.onSlot7Serialize}getOnAssignementManager(e){if(e===1)return this.onSlot1Assignement;if(e===2)return this.onSlot2Assignement;if(e===3)return this.onSlot3Assignement;if(e===4)return this.onSlot4Assignement;if(e===5)return this.onSlot5Assignement;if(e===6)return this.onSlot6Assignement;if(e===7)return this.onSlot7Assignement}getSlotValue(e){if(this.hasSlot(e))return this.getSlot(e)?.serialized}forEveryExistingSlot(e){for(let t=1;t<=7;t++){let n=this.getSlot(t);n&&e(n,t)}}},In=class extends mn{validate(e){return e}afterSetEffect(){}recalculateFromCursor(e){e&&(this.value=this._getValueAtCoordinate(e.x,e.y))}_getValueAtCoordinate(e,t){if(e===void 0||t===void 0||e===this.parent.meta.width||t===this.parent.meta.height)return;let n=e+t*this.parent.meta.width;return this.parent.pixels[n]}},Ln=class{drive;_currentFrame;get currentFrame(){return this._currentFrame}set currentFrame(e){this._currentFrame=e,this.drive.parent.setPixels(this.currentFrame.pixels)}get currentStep(){return this.drive.stepsByAbsolute.get(this._currentFrame.timestamp)}bufferSize=3;buffer=new Map;get preloadedSteps(){return Array.from(this.buffer.keys())}get preloadedTimestampsRelative(){return this.preloadedSteps.map(e=>e.relative)}constructor(e,t){this.drive=e,this.currentFrame=t}async init(){return await this.preloadAfterFrameSet(this.currentStep)}async recieveStep(e){let t=this.buffer.get(e);return t===void 0&&(t=await this.drive.parent.reader.frameData(e.index)),this.currentFrame=t,await this.preloadAfterFrameSet(e)}async preloadAfterFrameSet(e){let t=e.index+1<this.drive.relativeSteps.length?e.index+1:NaN,n=isNaN(t)?NaN:this.drive._validateIndex(t+this.bufferSize);if(isNaN(t)||isNaN(n)||t>n||t===n)return e.relative===this.drive.parent.duration&&this.buffer.clear(),{absoluteTime:this.drive.currentStep.absolute,relativeTime:this.drive.value,currentFrame:this.currentFrame,currentStep:this.currentStep,buffer:this.preloadedSteps,preloaded:!1,hasChanged:!0};let r=Array.from(this.drive.stepsByIndex.values()).filter(e=>e.index>=t&&e.index<n),i=r.filter(e=>!this.preloadedSteps.includes(e));return(await Promise.all(i.map(e=>this.drive.parent.reader.frameData(e.index)))).forEach((e,t)=>{let n=i[t];this.buffer.set(n,e)}),this.preloadedSteps.forEach(e=>{r.includes(e)||this.buffer.delete(e)}),{absoluteTime:this.drive.currentStep.absolute,currentFrame:this.currentFrame,currentStep:this.currentStep,relativeTime:this.drive.value,buffer:this.preloadedSteps,preloaded:!0,hasChanged:!0}}},Rn={1:1,.5:2,2:.5,3:.333333333333,5:.25,10:.1},zn=class extends mn{steps;_playbackSpeed=1;get playbackSpeed(){return this._playbackSpeed}set playbackSpeed(e){this._playbackSpeed=e,this.callbackdPlaybackSpeed.call(this._playbackSpeed)}get playbackSpeedAspect(){return Rn[this.playbackSpeed]}onFrame=new D;get duration(){return this.parent.duration}get frameCount(){return this.steps.length}startTimestampRelative;endTimestampRelative;stepsByAbsolute=new Map;stepsByRelative=new Map;stepsByIndex=new Map;relativeSteps=[];_currentStep;get currentStep(){return this._currentStep}isSequence;_isPlaying=!1;get isPlaying(){return this._isPlaying}timer;buffer;callbackdPlaybackSpeed=new D;callbacksPlay=new D;callbacksPause=new D;callbacksStop=new D;callbacksEnd=new D;callbacksChangeFrame=new D;get currentMs(){return this.currentStep.relative}get currentPercentage(){return this._convertRelativeToPercent(this.currentStep.relative)}get currentFrameIndex(){return this.currentStep.index}get currentTime(){return this.formatDuration(this.currentStep.relative)}get frames(){return this.parent.meta.current.timeline}constructor(e,t,n,r){super(e,Math.max(Math.min(t,n.length),0)),this.steps=n,this._currentStep=this.steps[this.valueInitial],this.startTimestampRelative=0,this.endTimestampRelative=this.steps[this.steps.length-1].relative,this.isSequence=this.parent.meta.current.timeline.length>1,this.steps.forEach(e=>{this.stepsByIndex.set(e.index,e),this.stepsByAbsolute.set(e.absolute,e),this.stepsByRelative.set(e.relative,e),this.relativeSteps.push(e.relative)}),this.buffer=new Ln(this,r)}init(){this.buffer.init()}afterSetEffect(){this.onFrame.call(this._currentStep),this.steps.length}validate(e){return this.steps===void 0?e:this.steps.length===1?0:this._validateRelativeTime(e)}_validateRelativeTime(e){return Math.max(Math.min(e,this.steps[this.steps.length-1].relative),0)}_validateIndex(e){return Math.max(Math.min(e,this.steps.length),0)}_convertRelativeToAspect(e){return e/this.duration}_convertRelativeToPercent(e){return this._convertRelativeToAspect(e)*100}_convertPercenttRelative(e){return this.duration*e/100}formatDuration(e){let t=new Date(0);return t.setMilliseconds(e),Dt(t,`mm:ss:SSS`)}next(){let e=this.findNextRelative(this.value);e&&this.setRelativeTime(e.relative)}prev(){let e=this.findPreviousRelative(this.value);this.setRelativeTime(e.relative)}findPreviousOrThis(e){return this.stepsByRelative.has(e)?this.stepsByRelative.get(e):this.findPreviousRelative(e)}findPreviousRelative(e){if(this.steps.length===1)return this.steps[0];e=this._validateRelativeTime(e);let t=this._convertRelativeToAspect(e),n=Math.max(Math.ceil(t*this.steps.length)+5,this.steps.length),r;for(;n>=0&&r===void 0;){let t=this.stepsByIndex.get(n);t!==void 0&&t.relative<e&&(r=t),--n}return r===void 0?this.steps[0]:r}findNextRelative(e){if(this.steps.length===1)return this.steps[0];let t=this._convertRelativeToAspect(e),n=Math.floor(t*this.steps.length)-5,r=this._validateIndex(n),i=this._validateIndex(n+40),a=this.steps.slice(r,i).find(t=>t.relative>e);return a!==void 0&&a}async setRelativeTime(e){e=this._validateRelativeTime(e),this.value=e;let t=this.findPreviousOrThis(this.value);if(t!==this._currentStep){this._currentStep=t;let e=await this.buffer.recieveStep(this._currentStep);return this.callbacksChangeFrame.call(this._currentStep),e}return{absoluteTime:this._currentStep.absolute,relativeTime:this.value,currentStep:this._currentStep,currentFrame:this.buffer.currentFrame,buffer:[],preloaded:!1,hasChanged:!1}}async setValueByPercent(e){e=Math.max(Math.min(e,100),0);let t=this._convertPercenttRelative(e);return await this.setRelativeTime(t)}createNextStepTimer(){this.timer!==void 0&&clearTimeout(this.timer),this.isSequence&&this._isPlaying!==!1&&(this.timer=setTimeout(()=>{let e=this.findNextRelative(this._currentStep.relative);e?(this.value=e.relative,this._isPlaying&&(this.value=e.relative,this._currentStep=e,this.buffer.recieveStep(e),this.callbacksChangeFrame.call(e),this.createNextStepTimer())):(this._isPlaying=!1,this.callbacksEnd.call())},this._currentStep.offset*this.playbackSpeedAspect))}play(){this.steps.length>1&&(this._isPlaying=!0,this.createNextStepTimer(),this.callbacksPlay.call())}pause(){this._isPlaying=!1,clearTimeout(this.timer),this.callbacksPause.call()}stop(){this.pause(),this.value=0,this.callbacksStop.call()}},Bn=class extends mn{stream;recorder;mimeType;fileExt;_isRecording=!1;_mayStop=!0;get mayStop(){return this._mayStop}set mayStop(e){this._mayStop=e,this.callbackMayStop.call(this.mayStop)}recordedChunks=[];callbackMayStop=new D;validate(e){return e}afterSetEffect(e){}start(){if(this.value===!0)throw Error(`Recording already in process - can not start another one`);let{stream:e,recorder:t}=this.initRecording();this.stream=e,this.recorder=t,this.value=!0,this.recorder.addEventListener(`dataavailable`,e=>{e.data.size>0&&(this.recordedChunks.push(e.data),this.download(),this.clearRecording())}),this.recorder.start()}end(){if(this.value===!1)throw Error(`Recording has not started yet - can not end it!`);if(this.recorder===void 0)throw Error(`Error ending recording - no MediaRecorder instance created.`);this.recorder.stop(),this.value=!1,this.mayStop=!0}async recordEntireFile(){if(this.value===!0)throw Error(`Already recording the entire file. Can not start until the current recording ends.`);await this.parent.timeline.setValueByPercent(0),this.mayStop=!1;let e=`recording entire file`;this.parent.timeline.callbacksEnd.add(e,()=>{this.end(),this.parent.timeline.callbacksEnd.delete(e)}),this.parent.timeline.play(),this.start()}getOutputMimeType(){let e;for(let t of[{mime:`video/webm;codecs=vp9`,ext:`webm`},{mime:`video/webm;codecs=vp8`,ext:`webm`},{mime:`video/webm;codecs=vp9,opus`,ext:`webm`},{mime:`video/webm;codecs=vp8,opus`,ext:`webm`},{mime:`video/webm`,ext:`webm`},{mime:`video/mp4;codecs=h264`,ext:`mp4`},{mime:`video/mp4`,ext:`mp4`}])MediaRecorder.isTypeSupported(t.mime)&&(e=t);return e}initRecording(){if(this.stream||this.recorder)throw Error(`Recording was already initialised! Can not initialise it again until it stops!`);let e=this.parent.dom?.canvasLayer;if(!e)throw Error(`Canvas layer not found - can not initialise recording.`);let t=e.canvas.captureStream(25),n=this.getOutputMimeType();if(n===void 0)throw Error(`No supported mime type found for MediaRecorder!`);this.mimeType=n.mime,this.fileExt=n.ext;let r={mimeType:this.mimeType};return{stream:t,recorder:new MediaRecorder(t,r),options:r}}createRecordingFileName(){let e=this.parent.fileName,t=[`from_`+this.parent.group.registry.range.value.from.toFixed(2),`to_`+this.parent.group.registry.range.value.to.toFixed(2)].join(`__`),n=this.fileExt?this.fileExt:`webm`,r=`__`+t+`.`+n;return e.replace(/\.lrc$/i,r)}download(){let e=new Blob(this.recordedChunks,{type:this.mimeType}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.style.display=`none`,n.href=t,n.download=this.createRecordingFileName(),document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(t),document.body.removeChild(n)}clearRecording(){this.recorder&&(this.recorder.stop(),delete this.recorder),this.stream&&delete this.stream,this.recordedChunks.length>0&&(this.recordedChunks=[]),this.value=!1,this.mimeType=void 0}},Vn=class e{static createCanvasContainer(){let e=document.createElement(`div`);return e.classList.add(`thermalCanvasWrapper`),e.style.position=`relative`,e.style.userSelect=`none`,e.part=`thermal-canvas-wrapper`,e}static createCanvas(){let e=document.createElement(`canvas`);return e.classList.add(`thermalCanvas`),e.style.padding=`0px`,e.style.margin=`0px`,e.style.objectFit=`contain`,e.style.width=`100%`,e.style.height=`100%`,e.style.objectPosition=`top left`,e.style.imageRendering=`pixelated`,e.style.userSelect=`none`,e.part=`thermal-file-canvas`,e}static createDateLayerInner(){let e=document.createElement(`div`);return e.classList.add(`dateLayerInner`),e.style.margin=`0px`,e.style.padding=`.3rem 0rem`,e.style.backgroundColor=`black`,e.style.color=`white`,e.style.borderRadius=`.5rem .5rem 0 0`,e.style.width=`calc(100% + 4px )`,e.style.position=`absolute`,e.style.top=`0rem`,e.style.left=`-2px`,e.style.opacity=`0`,e.style.transition=`opacity .1s ease-in-out`,e.style.textAlign=`center`,e.style.userSelect=`none`,e}static createVisibleLayer(){let e=document.createElement(`div`);return e.classList.add(`visibleLayer`),e.style.margin=`0px`,e.style.padding=`0px`,e.style.height=`100%`,e.style.width=`100%`,e.style.position=`absolute`,e.style.top=`0px`,e.style.left=`0px`,e.style.userSelect=`none`,e}static createVisibleImage(){let e=document.createElement(`img`);return e.classList.add(`visibleLayerImage`),e.style.padding=`0px`,e.style.margin=`0px`,e.style.objectFit=`contain`,e.style.width=`100%`,e.style.height=`100%`,e.style.objectPosition=`top left`,e.style.userSelect=`none`,e}static createListener(){let e=document.createElement(`div`);return e.classList.add(`thermalListener`),e.style.margin=`0px`,e.style.padding=`0px`,e.style.height=`100%`,e.style.width=`100%`,e.style.position=`absolute`,e.style.top=`0px`,e.style.left=`0px`,e.style.cursor=`pointer`,e.style.touchAction=`none`,e.style.userSelect=`none`,e.setAttribute(`id`,Math.random().toString()),e}static createCursorLayerRoot(){let e=document.createElement(`div`);return e.classList.add(`cursorLayerRoot`),e.style.width=`100%`,e.style.height=`100%`,e.style.position=`absolute`,e.style.top=`0`,e.style.left=`0`,e.style.opacity=`0`,e.style.overflow=`hidden`,e.style.lineHeight=`1rem`,e.style.userSelect=`none`,e}static createCursorLayerCenter(){let e=document.createElement(`div`);return e.classList.add(`cursorLayerCenter`),e.style.position=`absolute`,e.style.top=`0px`,e.style.left=`0px`,e.style.width=`0px`,e.style.height=`0px`,e.style.userSelect=`none`,e}static createCursorLayerAxeBase(){let e=document.createElement(`div`);return e.classList.add(`cursorLayerAxe`),e.style.backdropFilter=`invert(100)`,e.style.position=`absolute`,e.style.top=`0px`,e.style.left=`0px`,e.style.content=``,e.style.userSelect=`none`,e}static createCursorLayerX(){let t=e.createCursorLayerAxeBase();return t.classList.add(`cursorLayerAxeX`),t.style.width=`1px`,t.style.height=`20px`,t.style.top=`-10px`,t.style.userSelect=`none`,t}static createCursorLayerY(){let t=e.createCursorLayerAxeBase();return t.classList.add(`cursorLayerAxeY`),t.style.width=`20px`,t.style.height=`1px`,t.style.left=`-10px`,t.style.userSelect=`none`,t}static createCursorLayerLabel(){let e=document.createElement(`div`);return e.classList.add(`cursorLayerLabel`),e.style.position=`absolute`,e.style.padding=`1px 3px`,e.style.backgroundColor=`rgba( 0,0,0,0.5 )`,e.style.color=`white`,e.style.whiteSpace=`nowrap`,e.style.fontSize=`small`,e.style.borderRadius=`5px`,e.style.userSelect=`none`,e}},Hn=class{dom;get instance(){return this.dom.parent}constructor(e){this.dom=e}_mounted=!1;get mounted(){return this._mounted}mount(){this._mounted||this.dom.root!==null&&(this._mounted=!0,this.dom.root.appendChild(this.getLayerRoot()))}unmount(){this._mounted&&this.dom.root!==null&&(this._mounted=!1,this.dom.root.removeChild(this.getLayerRoot()))}destroy(){this.onDestroy()}},Un=class extends Hn{container;canvas;_opacity=1;get opacity(){return this._opacity}set opacity(e){this.instance.visibleUrl!==null&&this.instance.visibleUrl!==void 0&&this.instance.visibleUrl.trim().length!==0&&(this._opacity=Math.max(Math.min(e,1),0),this._opacity===1?this.canvas.style.removeProperty(`opacity`):this.canvas.style.opacity=this._opacity.toString())}constructor(e){super(e),this.container=Vn.createCanvasContainer(),this.canvas=Vn.createCanvas(),this.canvas.width=this.instance.width,this.canvas.height=this.instance.height,this.canvas.setAttribute(`data-video-canvas`,``),this.canvas.setAttribute(`crossorigin`,`anonymous`),this.canvas.setAttribute(`crossOrigin`,`Anonymous`),this.container.appendChild(this.canvas),this.opacity=this.instance.group.registry.opacity.value}getLayerRoot(){return this.container}onDestroy(){this.canvas.remove(),this.container.remove()}},Wn=class extends Hn{layerRoot;center;axisX;axisY;label;constructor(e){super(e),this.layerRoot=Vn.createCursorLayerRoot(),this.center=Vn.createCursorLayerCenter(),this.axisX=Vn.createCursorLayerX(),this.axisY=Vn.createCursorLayerY(),this.label=Vn.createCursorLayerLabel(),this.layerRoot.appendChild(this.center),this.center.appendChild(this.axisX),this.center.appendChild(this.axisY),this.center.appendChild(this.label)}_show=!1;get show(){return this._show}setShow(e){this._show=e,this.layerRoot.style.opacity=this._show?`1`:`0`}_hover=!1;get hover(){return this._hover}set hover(e){this._hover=e,this.label.style.backgroundColor=this._hover?`black`:`rgba( 0,0,0,0.5 )`}recalculateLabelPosition(e,t){if(this.dom.root!==null){let n=this.dom.root.offsetWidth/this.instance.width,r=Math.round(e*n),i=Math.round(t*n),a=100/this.instance.width/2,o=100/this.instance.height/2;this.center.style.left=`calc( ${this.px(r)} + ${a}%)`,this.center.style.top=`calc( ${this.px(i)} + ${o}%)`,e>this.instance.width/3?(this.label.style.right=`3px`,this.label.style.removeProperty(`left`)):(this.label.style.left=`3px`,this.label.style.removeProperty(`right`)),t>this.instance.height/4?this.label.style.bottom!==`3px`&&(this.label.style.bottom=`3px`,this.label.style.removeProperty(`top`)):this.label.style.top!==`3px`&&(this.label.style.top=`3px`,this.label.style.removeProperty(`bottom`))}}setLabel(e,t,n){this.dom.root===null||(this.recalculateLabelPosition(e,t),this.label.innerHTML=n)}setValue(e){e&&(this.label.innerHTML=`${e.toFixed(3)} °C`)}resetCursor(){this.center.style.top=`0px`,this.center.style.left=`0px`,this.label.style.removeProperty(`right`),this.label.style.removeProperty(`bottom`),this.label.style.top=`3px`,this.label.style.left=`3px`,this.label.innerHTML=``}px(e){return`${e}px`}getLayerRoot(){return this.layerRoot}onDestroy(){this.label.remove(),this.axisX.remove(),this.axisY.remove(),this.center.remove(),this.layerRoot.remove()}},Gn=class extends Hn{container;constructor(e){super(e),this.container=Vn.createListener()}getLayerRoot(){return this.container}onDestroy(){this.container.remove()}},Kn=class extends Hn{_url;container;image;get url(){return this._url}set url(e){this._url=e,this.image&&e&&(this.image.src=e)}get exists(){return this._url!==void 0}constructor(e,t){super(e),this._url=t,this.container=Vn.createVisibleLayer(),this._url&&(this.image=Vn.createVisibleImage(),this.url=this._url,this.container.appendChild(this.image))}getLayerRoot(){return this.container}onDestroy(){this.image&&this.image.remove(),this.container.remove()}},qn=class e{parent;root;static CLASS_BASE=`thermalImageRoot`;static CLASS_BUILT=e.CLASS_BASE+`__built`;static CLASS_HYDRATED=e.CLASS_BASE+`__mounted`;static CLASS_HOVER=e.CLASS_BASE+`__hover`;_built=!1;get built(){return this._built}setBuilt(t){this._built=t,t===!0?(this.root.classList.add(e.CLASS_BUILT),this.root.dataset.built=`true`,this.root.style.transition=`border-color .1s ease-in-out`,this.root.style.zIndex=`10`,this.root.style.position=`relative`,this.root.style.lineHeight=`0`,this.parent.onMount.call()):(this.root.classList.remove(e.CLASS_BUILT),delete this.root.dataset.built,this.root.style.removeProperty(`transition`),this.root.style.removeProperty(`zIndex`),this.root.style.removeProperty(`position`),this.root.style.removeProperty(`lineHeight`),this.parent.onUnmount.call())}_hydrated=!1;get hydrated(){return this._hydrated}setHydrated(t){this._hydrated=t,t===!0?(this.root.classList.add(e.CLASS_HYDRATED),this.root.dataset.hydrated=`true`):(this.root.classList.remove(e.CLASS_HYDRATED),delete this.root.dataset.hydrated)}_hover=!1;get hover(){return this._hover}setHover(t){this._hover=t,t===!0?(this.root.classList.add(e.CLASS_HOVER),this.root.dataset.hover=`true`):(this.root.classList.remove(e.CLASS_HOVER),delete this.root.dataset.hover)}_canvasLayer;get canvasLayer(){return this._canvasLayer}_visibleLayer;get visibleLayer(){return this._visibleLayer}_cursorLayer;get cursorLayer(){return this._cursorLayer}_listenerLayer;get listenerLayer(){return this._listenerLayer}constructor(t,n){this.parent=t,this.root=n,this.root.classList.add(e.CLASS_BASE),this.root.dataset.thermalInstanceId=this.parent.id,this.root.dataset.thermalInstanceUrl=this.parent.thermalUrl}build(){this.root!==null&&this.built===!0&&(console.info(`Building instance ${this.parent.id} which is already built. Destroying any previous DOM and creating a new one in a new container ${this.root.nodeName}`),this.destroy()),this._canvasLayer=new Un(this),this._visibleLayer=new Kn(this,this.parent.visibleUrl),this._cursorLayer=new Wn(this),this._listenerLayer=new Gn(this),this._canvasLayer.mount(),this._visibleLayer.mount(),this._cursorLayer.mount(),this._listenerLayer.mount(),this.root.appendChild(this._visibleLayer.getLayerRoot()),this.root.appendChild(this._canvasLayer.getLayerRoot()),this.root.appendChild(this._cursorLayer.getLayerRoot()),this.root.appendChild(this._listenerLayer.getLayerRoot()),this.setBuilt(!0)}destroy(){this.built===!0&&(this._canvasLayer&&=(this._canvasLayer.unmount(),delete this._canvasLayer,void 0),this._visibleLayer&&=(this._visibleLayer.unmount(),delete this._visibleLayer,void 0),this._cursorLayer&&=(this._cursorLayer.unmount(),delete this._cursorLayer,void 0),this._listenerLayer&&=(this.hydrated===!0&&this.dehydrate(),this._listenerLayer.unmount(),delete this._listenerLayer,void 0),this.setBuilt(!1),this.root.classList.remove(e.CLASS_BASE),delete this.root.dataset.thermalInstanceId,delete this.root.dataset.thermalInstanceUrl,this.root.innerHTML=``)}hydrate(){this.listenerLayer===void 0?console.error(`Instance ${this.parent.thermalUrl} does not have a listener layer yet when trying to hydrate! Stopping hydration.`):(this.hydrated===!0&&this.dehydrate(),this.parent.hydrateListener(this),this.setHydrated(!0))}dehydrate(){this.hydrated===!1?console.error(`Trying to dehydrate the instance ${this.parent.thermalUrl} which is not yet hydrated!}`):this.listenerLayer===void 0?console.error(`Trying to dehydrate the instance ${this.parent.thermalUrl} which does not have a listener layer yet!`):(this.parent.dehydrateListener(this),this.setHydrated(!1))}},Jn=class{file;canvas;_initialised=!1;get initialised(){return this._initialised}get registry(){return this.file.group.registry}get width(){return this.file.width}get height(){return this.file.height}get from(){return this.registry.range.value===void 0?this.file.min:this.registry.range.value.from}get to(){return this.registry.range.value===void 0?this.file.max:this.registry.range.value.to}get palette(){return this.registry.palette.currentPalette.pixels}constructor(e,t){this.file=e,this.canvas=t}async init(){this.initialised?console.warn(`Renderer of ${this.file.id} is already initialised`):await this.onInit()?(this._initialised=!0,await this.render()):console.warn(`Renderer of ${this.file.id} failed to initialise`)}async render(){if(!this.initialised)console.warn(`Renderer of ${this.file.id} is not initialised`);else return await this.executeRender()}},Yn=class extends Jn{get pool(){return this.registry.pool}context;async onInit(){let e=this.canvas.getContext(`2d`);return e!==null&&(this.context=e,!0)}async executeRender(){let e=await this.pool.exec(async(e,t,n,r,i,a)=>{let o=new OffscreenCanvas(n,r).getContext(`2d`),s=t-e;for(let c=0;c<n;c++)for(let l=0;l<r;l++){let r=i[c+l*n];r<e&&(r=e),r>t&&(r=t);let u=(r-e)/s;o.fillStyle=a[Math.floor((a.length-1)*u)],o.fillRect(c,l,1,1)}let c=o.getImageData(0,0,n,r);return await createImageBitmap(c)},[this.from,this.to,this.width,this.height,this.file.pixels,this.palette],{});this.context.drawImage(e,0,0)}async destroy(){}},Xn=class e extends Jn{context;program;fragmentShader;vertexShader;pixelsBuffer;pixelsTexture;uploadedPixelsVersion;paletteBuffer;paletteTexture;vertexBuffer;get listenerIdPalette(){return this.file.id+`_palette`}get listenerIdRange(){return this.file.id+`_range`}get listenerIdPixels(){return this.file.id+`_pixels`}async onInit(){let e=this.canvas.getContext(`webgl2`,{preserveDrawingBuffer:!0});if(e===null)return!1;this.context=e,this.pixelsBuffer=this.initPixelsBuffer(),this.pixelsTexture=this.initPixelsTexture(),this.paletteBuffer=this.initPaletteBuffer(),this.paletteTexture=this.initPaletteTexture(),this.registry.palette.addListener(this.listenerIdPalette,()=>{let e=this.registry.palette.currentPalette.texturePixels;this.writePaletteTexture(e)}),this.registry.range.addListener(this.listenerIdRange,()=>{let e=this.registry.range.currentRange,t=e?e.from:this.file.min,n=e?e.to:this.file.max;this.writeRangeUniform(t,n)}),this.initGl();let t=this.registry.range.currentRange,n=t?t.from:this.file.min,r=t?t.to:this.file.max;this.writeRangeUniform(n,r);let i=this.registry.palette.currentPalette.texturePixels;return this.writePaletteTexture(i),this.context.viewport(0,0,this.canvas.width,this.canvas.height),!0}static VERTEX_SHADER=`#version 300 es
        in vec2 a_position;
        out vec2 v_uv;
        void main() {
            v_uv = ( a_position + 1.0 ) * 0.5;
            v_uv.y = 1.0 - v_uv.y;  // Převrácení Y osy pro správnou orientaci textury
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;static FRAGMENT_SHADER=`#version 300 es
        precision highp float;
        in vec2 v_uv;
        uniform sampler2D u_pixels;
        uniform sampler2D u_palette;
        uniform float u_from;
        uniform float u_to;
        out vec4 outColor;
        void main() {
            float temp = texture(u_pixels, v_uv).r;
            float t = clamp( (temp - u_from) / (u_to - u_from), 0.0, 1.0 );
            outColor = texture( u_palette, vec2(t, 0.5) );
        }
    `;initGl(){let t=this.context;this.vertexBuffer=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW),this.vertexShader=t.createShader(t.VERTEX_SHADER),t.shaderSource(this.vertexShader,e.VERTEX_SHADER),t.compileShader(this.vertexShader),this.fragmentShader=t.createShader(t.FRAGMENT_SHADER),t.shaderSource(this.fragmentShader,e.FRAGMENT_SHADER),t.compileShader(this.fragmentShader),this.program=t.createProgram(),t.attachShader(this.program,this.vertexShader),t.attachShader(this.program,this.fragmentShader),t.linkProgram(this.program),t.useProgram(this.program);let n=t.getAttribLocation(this.program,`a_position`);t.enableVertexAttribArray(n),t.vertexAttribPointer(n,2,t.FLOAT,!1,0,0)}createTexture(e,t,n,r,i,a){let o=this.context.createTexture();return this.context.bindTexture(this.context.TEXTURE_2D,o),this.context.texImage2D(this.context.TEXTURE_2D,0,n,e,t,0,r,i,a),this.context.texParameteri(this.context.TEXTURE_2D,this.context.TEXTURE_MIN_FILTER,this.context.NEAREST),this.context.texParameteri(this.context.TEXTURE_2D,this.context.TEXTURE_MAG_FILTER,this.context.NEAREST),this.context.texParameteri(this.context.TEXTURE_2D,this.context.TEXTURE_WRAP_S,this.context.CLAMP_TO_EDGE),this.context.texParameteri(this.context.TEXTURE_2D,this.context.TEXTURE_WRAP_T,this.context.CLAMP_TO_EDGE),o}initPixelsBuffer(){return new Float32Array(this.file.pixels)}initPixelsTexture(){return this.createTexture(this.width,this.height,this.context.R32F,this.context.RED,this.context.FLOAT,this.pixelsBuffer)}writePixelsTexture(e){e instanceof Float32Array,this.pixelsBuffer.set(e,0),this.context.activeTexture(this.context.TEXTURE0),this.context.bindTexture(this.context.TEXTURE_2D,this.pixelsTexture),this.context.texSubImage2D(this.context.TEXTURE_2D,0,0,0,this.width,this.height,this.context.RED,this.context.FLOAT,this.pixelsBuffer)}initPaletteBuffer(){return new Float32Array(1024)}initPaletteTexture(){return this.createTexture(256,1,this.context.RGBA32F,this.context.RGBA,this.context.FLOAT,this.paletteBuffer)}writePaletteTexture(e){e instanceof Float32Array?(this.paletteBuffer.set(e,0),this.context.bindTexture(this.context.TEXTURE_2D,this.paletteTexture),this.context.texSubImage2D(this.context.TEXTURE_2D,0,0,0,256,1,this.context.RGBA,this.context.FLOAT,this.paletteBuffer)):(this.context.bindTexture(this.context.TEXTURE_2D,this.paletteTexture),this.context.texSubImage2D(this.context.TEXTURE_2D,0,0,0,256,1,this.context.RGBA,this.context.UNSIGNED_BYTE,e))}writeRangeUniform(e,t){let n=this.context;n.useProgram(this.program);let r=n.getUniformLocation(this.program,`u_from`),i=n.getUniformLocation(this.program,`u_to`);n.uniform1f(r,e),n.uniform1f(i,t)}async executeRender(){let e=this.context;this.writePixelsTexture(this.file.pixels),this.uploadedPixelsVersion=this.file.pixelsVersion,e.useProgram(this.program),e.bindBuffer(e.ARRAY_BUFFER,this.vertexBuffer);let t=e.getUniformLocation(this.program,`u_pixels`),n=e.getUniformLocation(this.program,`u_palette`);e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.pixelsTexture),e.uniform1i(t,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.paletteTexture),e.uniform1i(n,1),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.drawArrays(e.TRIANGLE_STRIP,0,4)}async destroy(){this.context.deleteProgram(this.program),this.context.deleteShader(this.vertexShader),this.context.deleteShader(this.fragmentShader),this.context.deleteTexture(this.pixelsTexture),this.context.deleteTexture(this.paletteTexture)}},Zn=class{_current;get current(){return this._current}_onChange;get onChange(){return this._onChange||=new D,this._onChange}get width(){return this.current.width}get height(){return this.current.height}constructor(e){this._current=e}set(e){this._current=e,this.onChange.call(this.current)}},Qn=class extends rn{_label;get label(){return this._label}setLabel(e){this._label!==e&&(this._label=e,this.onLabelChange.call(e))}onLabelChange=new D;id;horizontalLimit;verticalLimit;group;get registry(){return this.group.registry}get manager(){return this.group.registry.manager}get pool(){return this.manager.pool}thermalUrl;_visibleUrl;get visibleUrl(){return this._visibleUrl}fileName;signature=`unknown`;version=-1;streamCount=-1;fileDataType=-1;unit=-1;meta;get width(){return this.meta.current.width}get height(){return this.meta.current.height}get timestamp(){return this.meta.current.timestamp}get duration(){return this.meta.current.duration}get min(){return this.meta.current.min}get max(){return this.meta.current.max}get bytesize(){return this.meta.current.bytesize}get averageEmissivity(){return this.meta.current.averageEmissivity}get averageReflectedKelvins(){return this.meta.current.averageReflectedKelvins}get fps(){return this.meta.current.fps}get frameCount(){return this.meta.current.frameCount}_dom;get dom(){return this._dom}onMount=new D;onUnmount=new D;renderer;get hover(){return this.dom?this.dom.hover:!1}timeline;cursorValue;analysis;recording;_preferWebGl=!0;get preferWebGl(){return this._preferWebGl}switchToCPURenderer(){if(this.renderer instanceof Yn)return;this.renderer?.destroy();let e=this.dom?.root;this.unmountFromDom(),this.mountToDom(e),this.renderer=new Yn(this,this.dom.canvasLayer.canvas),this.renderer.init()}_pixels;_pixelsVersion=0;get pixels(){return this._pixels}get pixelsVersion(){return this._pixelsVersion}setPixels(e){this._pixels=e,this._pixelsVersion++,this.onSetPixels(e)}constructor(e,t,n,r,i){super(),this.group=e,this.id=this.formatId(r),this.meta=new Zn(t),this.thermalUrl=r,this._visibleUrl=i,this.fileName=this.thermalUrl.substring(this.thermalUrl.lastIndexOf(`/`)+1),this.horizontalLimit=this.width/4*3,this.verticalLimit=this.height/4*3,this._pixels=n}removeVisibleFile(){return this._visibleUrl=void 0,this}setPreferWebGl(e){return this._preferWebGl=e,this}rendererFactory(e){return this._preferWebGl===!0&&e.getContext(`webgl2`)?new Xn(this,e):new Yn(this,e)}mountToDom(e){this._dom!==void 0&&(this._dom.destroy(),this._dom=void 0),this._dom=new qn(this,e),this._dom.build(),this.renderer=this.rendererFactory(this._dom.canvasLayer.canvas),this.renderer.init(),this._dom.hydrate()}unmountFromDom(){this.renderer?.destroy(),this.dom&&this.dom.destroy(),delete this._dom,this._dom=void 0}async draw(){if(this.dom&&this.dom.canvasLayer)return await Promise.resolve(),await this.renderer?.render()}destroySelfAndBelow(){this.dom&&this.dom.destroy()}removeAllChildren(){this.destroySelfAndBelow()}getTemperatureAtPoint(e,t){let n=Math.min(this.meta.width-1,Math.max(0,e)),r=Math.min(this.meta.height-1,Math.max(0,t))*this.width+n;return this.pixels[r]}getColorAtPoint(e,t){let n=this.getTemperatureAtPoint(e,t),r=this.group.registry.range.value?.from,i=this.group.registry.range.value?.to;if(r!==void 0&&i!==void 0){let e=(n-r)/(i-r),t=Math.round(255*e);return this.group.registry.palette.currentPalette.pixels[t]}}reset(){}},$n=class e{static FONT_SIZE_NORMAL=`16px`;static FONT_SIZE_SMALL=`12px`;static COLOR_BASE=`black`;static COLOR_GRAY=`gray`;static COLOR_LIGHT=`lightgray`;static WIDTH=`1600px`;static FONT_FAMILY=`sans-serif`;static GAP_BASE=`10px`;static GAP_SMALL=`5px`;static DEBUG=!1;wrapper;container;_exporting=!1;get exporting(){return this._exporting}onExportingStatusChange=new D;setExporting(e){this._exporting=e,this.onExportingStatusChange.call(this._exporting)}createElementWithText(t,n,r=e.FONT_SIZE_NORMAL,i=`normal`,a=e.COLOR_BASE){let o=document.createElement(t);return o.innerHTML=n,o.style.fontSize=r,o.style.lineHeight=`1em`,o.style.fontWeight=i,o.style.color=a,o}buildWrapper(){let t=document.createElement(`div`);return e.DEBUG===!1&&(t.style.position=`absolute`,t.style.width=`0px`,t.style.height=`0px`,t.style.overflow=`hidden`),t}buildContainer(t,n){let r=document.createElement(`div`);return r.style.width=t.toFixed(0)+`px`,r.style.fontSize=e.FONT_SIZE_NORMAL,r.style.fontFamily=e.FONT_FAMILY,r.style.color=e.COLOR_BASE,r.style.backgroundColor=n,r}clear(){this.beforeDomRemoved(),this.wrapper&&document.body.removeChild(this.wrapper),this.afterDomRemoved(),delete this.container,delete this.wrapper}buildDom(e){this.wrapper=this.buildWrapper(),this.container=this.buildContainer(e.width,e.backgroundColor),this.wrapper.appendChild(this.container),this.onBuildDom(e),document.body.prepend(this.wrapper)}makeSureFileNameIsValid(e){return e.endsWith(`.PNG`)&&(e=e.replaceAll(`.PNG`,`.png`)),e.endsWith(`.png`)||(e+=`.png`),e}async downloadPng(e){let t=this.getFinalParams(e);t.fileName=this.makeSureFileNameIsValid(t.fileName),this.exporting===!0?console.warn(`PNG export of ${t.fileName} is already working. New requests are allowed after the export finishes.`):(this.setExporting(!0),this.buildDom(t),this.onDownload(t))}downloadImage(t,n){At.default.toPng(n).then(n=>{let r=document.createElement(`a`);r.download=t,r.href=n,r.click(),e.DEBUG===!1&&this.clear(),this.setExporting(!1)})}buildHorizontalScale(t,n,r,i,a,o,s,c,l){let u=t.clientWidth/100,d=document.createElement(`div`);d.style.width=`100%`,d.style.position=`relative`,d.style.paddingLeft=`30px`,d.style.paddingRight=`30px`,d.style.boxSizing=`border-box`;let f=document.createElement(`div`);f.style.width=`100%`,f.style.position=`relative`,f.style.backgroundColor=s,f.style.height=`30px`;let p=r-n,m=i-n,h=a-n,g=m/p*100,_=h/p*100,v=document.createElement(`div`);v.style.position=`absolute`,v.style.backgroundImage=o,v.style.height=`100%`,v.style.top=`0px`,v.style.left=g+`%`,v.style.width=_-g+`%`,f.appendChild(v),d.appendChild(f);let y=document.createElement(`div`);y.style.width=`100%`,y.style.height=`40px`,y.style.position=`relative`;let b=(t,r=!1,i,a)=>{let o=t/p*100,s=document.createElement(`div`);s.style.position=`absolute`,s.style.top=`0px`,s.style.left=`calc( ${o}% - 30px )`,s.style.width=`60px`,s.style.textAlign=`center`,s.style.lineHeight=`0px`;let c=document.createElement(`div`),l=document.createElement(`div`),u=document.createElement(`div`);c.innerHTML=(n+t).toFixed(2)+` °C`,c.style.display=`inline-block`,c.style.fontSize=e.FONT_SIZE_SMALL,c.style.lineHeight=`1em`,c.style.padding=`3px`,c.style.position=`relative`,l.style.width=`100%`,l.style.height=`7px`,l.style.textAlign=`center`,l.style.position=`relative`,l.style.lineHeight=`0px`,u.style.content=``,u.style.display=`inline-block`,r?(u.style.width=`14px`,u.style.height=`14px`,u.style.rotate=`45deg`,u.style.backgroundColor=a,c.style.backgroundColor=a,c.style.zIndex=`99`,c.style.color=i):(u.style.width=`1px`,u.style.height=`7px`,u.style.backgroundColor=i),l.appendChild(u),s.appendChild(l),s.appendChild(c),y.appendChild(s)};if(l){let e=document.createElement(`div`);e.style.position=`absolute`,e.style.border=`2px solid ${c}`,e.style.height=`100%`,e.style.boxSizing=`border-box`;let t=(l.from-n)/p*100,r=(l.to-n)/p*100-t;e.style.left=t+`%`,e.style.width=r+`%`,f.appendChild(e),b(l.from-n,!0,`white`,s),b(l.to-n,!0,`white`,s)}let x=p/u,S=0;for(;S<=p;)b(S,!1,c,`transparent`),S+=x;return b(m,!0,`white`,c),b(h,!0,`white`,c),d.appendChild(y),d}},er=class{static inputToDate=e=>{if(typeof e==`number`){let t=new Date;return t.setTime(e),t}return e}},tr=class e extends er{static isoDate=t=>(t=e.inputToDate(t),kt(t,{representation:`date`}));static isoTime=t=>(t=e.inputToDate(t),kt(t,{representation:`time`}));static isoComplete=t=>(t=e.inputToDate(t),kt(t));static humanTime=(t,n=!1)=>(t=e.inputToDate(t),Dt(t,n?`HH:mm:ss`:`HH:mm`));static duration=e=>{if(!Number.isFinite(e)||e<0)throw RangeError(`Duration must be a finite, non-negative number.`);let t=Math.floor(e),n=Math.floor(t/36e5),r=Math.floor(t%36e5/6e4),i=Math.floor(t%6e4/1e3),a=t%1e3,o=`${String(i).padStart(2,`0`)}.${String(a).padStart(3,`0`)}`;return n>0?`${n}:${String(r).padStart(2,`0`)}:${o}`:`${r}:${o}`};static humanDate=(t,n=!1)=>(t=e.inputToDate(t),Dt(t,n?`d. M.`:`d. M. yyyy`));static humanRangeDates(t,n){return t=e.inputToDate(t),n=e.inputToDate(n),t.getUTCDate()===n.getUTCDate()?e.humanDate(t):[e.humanDate(t),e.humanDate(n)].join(` - `)}static human(t){return`${e.humanDate(t)} ${e.humanTime(t,!0)} `}},nr=class e extends $n{file;static DEFAULT_PARAMS={fileName:`sth`,width:1200,fontSize:20,textColor:`black`,backgroundColor:`white`,showAnalysis:!0,showFileName:!1,showFileDate:!1,license:void 0,showThermalScale:!0};localInstance;constructor(e){super(),this.file=e}onBuildDom(){}beforeDomRemoved(){}afterDomRemoved(){this.localInstance?.group.registry.manager.removeRegistry(this.localInstance.group.registry.id),delete this.localInstance}getFinalParams(t){let n=t&&t.fileName?t.fileName:`${this.file.fileName}__export`;return{...e.DEFAULT_PARAMS,...t,fileName:n}}async onDownload(t){let n=Math.random().toString(),r=this.file.group.registry.manager,i=r.addOrGetRegistry(n),a=i.groups.addOrGetGroup(n),o=`${t.fontSize}px`;r.palette.setPalette(this.file.group.registry.manager.palette.value),i.range.imposeRange(this.file.group.registry.range.value),this.localInstance=await this.file.reader.createInstance(a),this.localInstance.removeVisibleFile();let s=this.file.timeline.currentStep.relative;if(s!==0&&this.localInstance.timeline.setRelativeTime(s),this.container){this.container.style.lineHeight=`${t.fontSize*1.5}px`;let n=this.file.group.registry.minmax.value.min,r=this.file.group.registry.minmax.value.max;if(t.showFileName||t.showFileDate){let e=document.createElement(`div`);if(e.style.paddingBottom=`${t.fontSize/3}px`,t.showFileDate){let n=tr.human(this.file.timestamp);e.appendChild(this.createElementWithText(`span`,n,o,`bold`,t.textColor))}if(t.showFileName){let n=(t.showFileDate?` - `:``)+this.file.fileName,r=t.showFileDate?`normal`:`bold`;e.appendChild(this.createElementWithText(`span`,n,o,r,t.textColor))}this.container.appendChild(e)}if(t.showThermalScale===!0){let e=n!==this.file.meta.current.min||r!==this.file.meta.current.max?{from:this.file.meta.current.min,to:this.file.meta.current.max}:void 0;this.container.appendChild(this.buildHorizontalScale(this.container,n,r,this.file.group.registry.range.value.from,this.file.group.registry.range.value.to,this.file.group.registry.palette.currentPalette.gradient,`gray`,`black`,e))}if(this.localInstance.mountToDom(this.container),this.localInstance.dom&&this.localInstance.dom.visibleLayer&&(this.localInstance.dom.visibleLayer.getLayerRoot().style.display=`none`),await this.localInstance.draw(),t.showAnalysis&&this.file.analysis.value.length>0){let n=document.createElement(`table`);n.style.width=`100%`,n.style.borderCollapse=`collapse`,n.style.marginTop=`${t.fontSize/3}px`;let r=document.createElement(`tr`);[`Analysis`,`AVG`,`MIN`,`MAX`].forEach(n=>{let i=this.createElementWithText(`th`,n,o,void 0,e.COLOR_GRAY);i.style.textAlign=`left`,i.style.borderBottom=`1px solid ${e.COLOR_LIGHT}`,i.style.padding=`${t.fontSize/3}px 0px ${t.fontSize/3} 0px`,r.appendChild(i)}),n.appendChild(r),this.container.appendChild(n),this.file.slots.forEveryExistingSlot((r,i)=>{let a=this.localInstance?.slots.createAnalysisFromSerialized(r.serialized,i);if(a){let i=document.createElement(`tr`),s=this.createElementWithText(`td`,r.analysis.name,o,void 0,r.analysis.initialColor);s.style.borderBottom=`1px solid ${e.COLOR_LIGHT}`,s.style.padding=`${t.fontSize/3}px 0px ${t.fontSize/3} 0px`,i.appendChild(s);let c=(n,r)=>{let a=this.createElementWithText(`td`,r?r.toFixed(3)+` °C`:``,o,void 0);a.style.borderBottom=`1px solid ${e.COLOR_LIGHT}`,a.style.paddingTop=`${t.fontSize/3}px`,a.style.paddingBottom=`${t.fontSize/3}px`,i.appendChild(a)};r.analysis instanceof Sn?(c(r.analysis.initialColor,a.avg),c(r.analysis.initialColor,a.min),c(r.analysis.initialColor,a.max)):r.analysis instanceof vn&&(c(r.analysis.initialColor,a.avg),c(r.analysis.initialColor),c(r.analysis.initialColor)),n.appendChild(i)}})}if(t.author||t.license){let n=document.createElement(`div`);n.style.lineHeight=`1.5em`,n.style.color=e.COLOR_GRAY,n.style.paddingTop=`${t.fontSize/3}px`,t.author&&n.appendChild(this.createElementWithText(`span`,t.author,o)),t.author&&t.license&&n.appendChild(this.createElementWithText(`span`,` - `,o)),t.license&&n.appendChild(this.createElementWithText(`span`,t.license,o)),this.container.appendChild(n)}setTimeout(()=>{this.container&&this.downloadImage(t.fileName,this.container)},0)}}},rr=class e extends Qn{group;reader;firstFrame;slots;filters=new an(this);_export;get export(){if(!this._export){let e=new nr(this);this._export=e}return this._export}constructor(e,t,n,r){super(e,n,r.pixels,t.thermalUrl,t.visibleUrl),this.group=e,this.reader=t,this.firstFrame=r,this.setPixels(r.pixels)}hydrateListener(e){if(!e.listenerLayer||!e.cursorLayer)return;let t=e.listenerLayer.getLayerRoot();t&&(e.parent.analysis.activateListeners(t),e.listenerLayer.getLayerRoot().onmousemove=t=>{e.cursorLayer&&e.cursorLayer.setShow(!0),e.setHover(!0);let n=e.parent.meta.width/e.root.clientWidth,r=Math.round(t.offsetX*n),i=Math.round(t.offsetY*n);e.parent.group.cursorPosition.recieveCursorPosition({x:r,y:i})},e.listenerLayer.getLayerRoot().onmouseleave=()=>{e.cursorLayer&&e.cursorLayer.setShow(!1),e.setHover(!1),e.parent.group.cursorPosition.recieveCursorPosition(void 0)},e.listenerLayer.getLayerRoot().onmouseenter=()=>{this.group.analysisSync.setCurrentPointer(this)})}dehydrateListener(e){e.parent.analysis.deactivateListeners()}buildInternalProperties(){return this.cursorValue=new In(this,void 0),this.timeline=new zn(this,0,this.meta.current.timeline,this.firstFrame),this.timeline.init(),this.recording=new Bn(this,!1),this.analysis=new jn(this,[]),this.analysisData=new Nn(this),this.slots=new Fn(this,new Map),this}formatId(e){return`instance_${this.group.id}_${e}`}onSetPixels(){if(this.dom&&this.dom.built){if(this.draw(),this.cursorValue.recalculateFromCursor(this.group.cursorPosition.value),this.group.cursorPosition.value){let e=this.group.tool.value.getLabelValue(this.group.cursorPosition.value.x,this.group.cursorPosition.value.y,this);this.dom.cursorLayer?.setLabel(this.group.cursorPosition.value.x,this.group.cursorPosition.value.y,e)}this.analysisData.updateAllAnalysesValues()}}getPixelsForHistogram(){return[]}static fromService(t,n,r,i){return new e(t,n,r,i).buildInternalProperties()}recieveCursorPosition(e){if(e!==void 0){let t=Math.min(this.meta.width,Math.max(0,e.x)),n=Math.min(this.meta.height,Math.max(0,e.y)),r=this.group.tool.value.getLabelValue(t,n,this);this.dom&&(this.dom.cursorLayer?.setLabel(t,n,r),this.dom.cursorLayer&&this.dom.cursorLayer.setShow(!0))}else this.dom&&(this.dom.cursorLayer?.resetCursor(),this.dom.cursorLayer?.setShow(!1));this.cursorValue.recalculateFromCursor(e)}getInstances(){return[this]}getAllApplicableFilters(){let e=this.group.registry.manager.filters.getActiveFilters(),t=this.group.registry.filters.getActiveFilters(),n=this.group.filters.getActiveFilters(),r=this.filters.getActiveFilters();return[...e,...t,...n,...r]}async applyAllAvailableFilters(){let e=await this.reader.baseInfo(),t=await this.reader.frameData(this.timeline.currentStep.index);if(this.dom?.root){let e=this.dom.root;this.unmountFromDom(),this.mountToDom(e)}this.meta.set(e),this.setPixels(t.pixels)}},ir=class extends fn{service;parser;id=Math.random();baseInfoCache;fileName;get pool(){return this.service.pool}originalBuffer;_buffer;get buffer(){return this._buffer}set buffer(e){this._buffer=e}constructor(e,t,n,r,i,a){super(r,i),this.service=e,this.parser=n,this._buffer=t,this.fileName=this.thermalUrl.substring(this.thermalUrl.lastIndexOf(`/`)+1),a===!0&&(this.originalBuffer=this.copyBuffer(this.buffer))}isSuccess(){return!0}copyBuffer(e){let t=new ArrayBuffer(e.byteLength),n=new Uint8Array(t);return n.set(new Uint8Array(e)),n.buffer}cloneForInstance(){return this}async baseInfo(){if(this.baseInfoCache)return this.baseInfoCache;let e=await this.pool.exec(this.parser.baseInfo,[this.buffer]);return this.baseInfoCache=e,e}getFrameSubset(e){return this.parser.getFrameSubset(this.buffer,e)}async frameData(e){let t=this.getFrameSubset(e);return await this.parser.frameData(t.array,t.dataType)}async pointAnalysisData(e,t){return await this.parser.pointAnalysisData(this.buffer,e,t)}async rectAnalysisData(e,t,n,r){return await this.parser.rectAnalysisData(this.buffer,e,t,n,r)}async ellipsisAnalysisData(e,t,n,r){return await this.parser.ellipsisAnalysisData(this.buffer,e,t,n,r)}async applyFilters(e){if(this.originalBuffer===void 0)return console.error(`trying to apply filters on a filereader template`),this;this.buffer=this.copyBuffer(this.originalBuffer);for(let t of e)this.buffer=await t.apply(this.buffer);return this.baseInfoCache=void 0,await this.baseInfo(),this}async createInstance(e,t=!0){let n=this.cloneForInstance(),r=await n.baseInfo(),i=await n.frameData(0),a=rr.fromService(e,n,r,i);return t&&e.files.addFile(a),a}},ar=class e{service;thermalUrl;visibleUrl;constructor(e,t,n){this.service=e,this.thermalUrl=t,this.visibleUrl=n}static fromUrl(t,n,r){return new e(t,n,r)}response;async load(){return this.response===void 0&&(this.response=this.processResponse(await fetch(this.thermalUrl))),this.response}async processResponse(e){let t=e;if(t.status!==200)return this.pocessTheService(new pn(this.thermalUrl,1,`File '${this.thermalUrl}' was not found.`));let n=await t.arrayBuffer();try{let e=ln(n,this.thermalUrl);return this.pocessTheService(new ir(this.service,n,e,this.thermalUrl,this.visibleUrl))}catch(e){if(e instanceof on)return this.pocessTheService(pn.fromError(e));throw e}}pocessTheService(e){return e}},or=class{manager;get pool(){return this.manager.pool}constructor(e){this.manager=e}static isolatedInstance(e,t=`isolated_registry`){let n=new di(e).addOrGetRegistry(t);return{service:n.service,registry:n}}requestsByUrl=new Map;get requestsCount(){return this.requestsByUrl.size}fileIsPending(e){return this.requestsByUrl.has(e)}cacheByUrl=new Map;get cachedServicesCount(){return this.cacheByUrl.size}fileIsInCache(e){return this.cacheByUrl.has(e)}async loadUploadedFile(e){try{let t=await e.arrayBuffer(),n=ln(t,e.name);return new ir(this,t,n,e.name)}catch(t){return new pn(e.name,3,t.message)}}handleDropzone(e,t=!0){return dn.listenOnElement(this,e,t)}async loadFile(e,t){if(this.cacheByUrl.has(e))return this.cacheByUrl.get(e);if(this.requestsByUrl.has(e))return this.requestsByUrl.get(e).load();{let n=ar.fromUrl(this,e,t);this.requestsByUrl.set(e,n);let r=await n.load();return this.requestsByUrl.delete(e),this.cacheByUrl.set(e,r),r}}async loadFiles(e){return Promise.all(e.map(async e=>{let t=await this.loadFile(e.lrc,e.png);return e.callback&&await e.callback(t),t}))}},sr=class extends mn{validate(e){return e}afterSetEffect(){}setGraphSmooth(e){this.value=e}},cr=e=>{let t=Array(256),n=[...e].sort((e,t)=>e.percent-t.percent);for(let e=0;e<256;e++){let r=e/255*100,i=n[0],a=n[n.length-1];for(let e=0;e<n.length-1;e++)if(r>=n[e].percent&&r<=n[e+1].percent){i=n[e],a=n[e+1];break}let o=a.percent-i.percent,s=o===0?0:(r-i.percent)/o,c=Math.round(i.color[0]+s*(a.color[0]-i.color[0])),l=Math.round(i.color[1]+s*(a.color[1]-i.color[1])),u=Math.round(i.color[2]+s*(a.color[2]-i.color[2]));t[e]=`rgb(${c},${l},${u})`}return t},lr=e=>`linear-gradient(90deg, ${[...e].sort((e,t)=>e.percent-t.percent).map(e=>`rgb(${e.color.join(`,`)}) ${e.percent}%`).join(`, `)})`,ur=e=>{let t=[...e].sort((e,t)=>e.percent-t.percent),n=new Float32Array(1024);for(let e=0;e<256;e++){let r=e/255*100,i=t[0],a=t[t.length-1];for(let e=0;e<t.length-1;e++)if(r>=t[e].percent&&r<=t[e+1].percent){i=t[e],a=t[e+1];break}let o=(r-i.percent)/(a.percent-i.percent||1),s=i.color[0]+(a.color[0]-i.color[0])*o,c=i.color[1]+(a.color[1]-i.color[1])*o,l=i.color[2]+(a.color[2]-i.color[2])*o;n[e*4]=s/255,n[e*4+1]=c/255,n[e*4+2]=l/255,n[e*4+3]=1}return n},dr=[{percent:0,color:[0,0,0]},{percent:30,color:[10,12,77]},{percent:49,color:[86,20,101]},{percent:64,color:[255,0,0]},{percent:84,color:[249,255,0]},{percent:100,color:[255,255,255]}],fr=[{percent:0,color:[31,0,157]},{percent:8,color:[0,5,255]},{percent:36,color:[0,255,239]},{percent:66,color:[255,252,0]},{percent:94,color:[255,2,0]},{percent:100,color:[145,0,0]}],pr=[{percent:0,color:[0,0,0]},{percent:100,color:[255,255,255]}],mr=[{percent:0,color:[255,255,255]},{percent:100,color:[0,0,0]}],hr=[{percent:0,color:[0,0,0]},{percent:12,color:[30,78,149]},{percent:32,color:[33,128,127]},{percent:41,color:[102,48,108]},{percent:64,color:[233,37,37]},{percent:90,color:[255,255,0]},{percent:100,color:[255,255,255]}],gr=[{percent:0,color:[17,13,133]},{percent:15,color:[23,50,248]},{percent:30,color:[75,245,255]},{percent:55,color:[100,91,86]},{percent:70,color:[239,86,28]},{percent:87,color:[255,255,0]},{percent:100,color:[255,255,255]}],_r=[{percent:0,color:[12,11,65]},{percent:23,color:[36,108,212]},{percent:42,color:[100,255,30]},{percent:55,color:[255,255,0]},{percent:80,color:[255,0,69]},{percent:100,color:[255,255,255]}],vr=[{percent:0,color:[0,0,0]},{percent:13,color:[212,0,217]},{percent:25,color:[21,28,151]},{percent:37,color:[55,230,255]},{percent:50,color:[17,75,22]},{percent:62,color:[255,255,0]},{percent:80,color:[119,0,11]},{percent:90,color:[255,40,32]},{percent:100,color:[255,255,255]}],yr=cr(dr),br=cr(fr),xr=cr(pr),Sr=cr(mr),Cr=cr(hr),wr=cr(gr),Tr=cr(_r),Er=cr(vr),Dr={iron:{name:`IRON`,gradient:lr(dr),pixels:yr,texturePixels:ur(dr),slug:`iron`},jet:{name:`JET`,gradient:lr(fr),pixels:br,texturePixels:ur(fr),slug:`jet`},white_hot:{name:`White Hot`,gradient:lr(pr),pixels:xr,texturePixels:ur(pr),slug:`white_hot`},black_hot:{name:`Black Hot`,gradient:lr(mr),pixels:Sr,texturePixels:ur(mr),slug:`black_hot`},lava:{name:`Lava`,gradient:lr(hr),pixels:Cr,texturePixels:ur(hr),slug:`lava`},arctic:{name:`Arctic`,gradient:lr(gr),pixels:wr,texturePixels:ur(gr),slug:`arctic`},rainbow:{name:`Rainbow`,gradient:lr(_r),pixels:Tr,texturePixels:ur(_r),slug:`rainbow`},rainbow_hc:{name:`Rainbow HC`,gradient:lr(vr),pixels:Er,texturePixels:ur(vr),slug:`rainbow_hc`}},Or=class extends mn{get availablePalettes(){return Dr}get currentPalette(){return this.availablePalettes[this.value]}validate(e){return e}afterSetEffect(){this.parent.forEveryRegistry(e=>{e.forEveryInstance(e=>e.draw())})}setPalette(e){this.value=e}sanitizeInputKey(e){if(e==null)return`jet`;let t=this.availablePalettes[e];return t?t.slug:`jet`}},kr=class extends mn{validate(e){return e}afterSetEffect(e){this.parent.forEveryRegistry(t=>t.forEveryInstance(t=>{let n=t.dom?.canvasLayer;n?n.canvas.style.imageRendering=e===!0?`auto`:`pixelated`:console.warn(`Canvas layer not found when trying to set image smooth rendering`,t)}))}setSmooth(e){this.value=e}},Ar=class e{loader;id;_loading=!1;get loading(){return this._loading}onResolve=new D;timeout=void 0;queue=[];get size(){return this.queue.length}constructor(e,t){this.loader=e,this.id=t}static init(t,n){return new e(t,n)}static initWithRequest(t,n,r=void 0,i,a){let o=new e(t);return o.request(n,r,i,a),o}request(e,t,n,r){this.queue.push({thermalUrl:e,visibleUrl:t,group:n,callback:r}),this.timeout!==void 0&&clearTimeout(this.timeout),this.timeout=setTimeout(async()=>{this._loading=!0;let e=await Promise.all(this.queue.map(async e=>({result:await this.loader.registry.service.loadFile(e.thermalUrl,e.visibleUrl),callback:e.callback,group:e.group}))),t=await Promise.all(e.map(async e=>({result:e.result instanceof ir?await e.result.createInstance(e.group):await e.result,callback:e.callback})));this.loader.registry.postLoadedProcessing();let n=await Promise.all(t.map(async e=>(await e.callback(e.result),e.result)));this.loader.onBatchComplete.call(n),this.loader.batchFinished(this),this.onResolve.call(n)},0)}close(){this._loading=!0}},jr=class{registry;onBatchStart=new D;onBatchComplete=new D;set=new Set;get numberOfBatches(){return this.set.size}get currentOpenBatch(){return Array.from(this.set).find(e=>e.loading===!1)}get hasLoadingBatches(){return Array.from(this.set).some(e=>e.loading===!0)}get numLoadingBatches(){return Array.from(this.set).filter(e=>e.loading===!0).length}constructor(e){this.registry=e}getBatchById(e){return Array.from(this.set).find(t=>t.id===e)||this.createBatch(e)}createBatch(e){let t=Ar.init(this,e);return this.set.add(t),t}request(e,t,n,r,i){let a=i?this.getBatchById(i):this.currentOpenBatch;return a===void 0&&(a=Ar.init(this),this.set.add(a),this.registry.loading.markAsLoading()),a.request(e,t,n,r),a}closeBatch(){this.currentOpenBatch!==void 0&&this.currentOpenBatch.close()}batchFinished(e){this.set.delete(e),this.numberOfBatches===0&&this.registry.loading.markAsLoaded()}},Mr=class extends mn{validate(e){return Math.min(Math.max(0,e),1)}afterSetEffect(e){this.parent.forEveryInstance(t=>{t.dom!==void 0&&t.dom.canvasLayer!==void 0&&t.dom.visibleLayer!==void 0&&(t.dom.canvasLayer.opacity=e)})}imposeOpacity(e){return this.value=e,this.value}},Nr=class e extends mn{static LISTENER_ID=`AnalysisGroupGraph`;constructor(e){super(e,void 0)}timeout;calculateData(){let e=[],t=[],n=[],r=this.parent.files.value.sort((e,t)=>e.timestamp-t.timestamp),i=r[0].analysisData.value.values[0];t.push(...i),e.push(...r[0].analysisData.value.colors),this.parent.files.forEveryInstance(e=>{let t=[new Date(e.timestamp)];e.analysis.value.forEach(async e=>{e.graph.state.MIN===!0&&e.min&&t.push(e.min),e.graph.state.MAX===!0&&e.max&&t.push(e.max),e.graph.state.AVG===!0&&e.avg&&t.push(e.avg)}),t.length>1&&n.push(t)}),this.value=e.length>0?{colors:e,data:[t,...n]}:void 0}turnOn(){this.parent.files.forEveryInstance(t=>{t.analysisData.addListener(e.LISTENER_ID,()=>{this.timeout!==void 0&&clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.calculateData()},0)})})}turnOff(){this.parent.files.forEveryInstance(t=>{t.analysisData.removeListener(e.LISTENER_ID)})}validate(e){return e}afterSetEffect(){}},Pr=class{drive;constructor(e){this.drive=e}formatAnalysisDisplayName(e,t){let n=`${e.name} (${e.getType()}, ${e.initialColor}})`;return e instanceof Sn&&t?n+` `+t.toUpperCase():n}formatAnalysisKey(e,t){let n=e.key;return e instanceof Sn&&t?n+`_`+t:n}formatFrameSlotValue(e,t){if(e.analysis instanceof Sn&&t){let n=e.analysis.avg;return t===`min`&&(n=e.analysis.min),t===`max`&&(n=e.analysis.max),{key:this.formatAnalysisKey(e.analysis,t),value:n.toString()}}return{key:this.formatAnalysisKey(e.analysis),value:e.analysis.avg.toString()}}getData(){let e=[{key:`file`,displayLabel:`File name`},{key:`timestamp`,displayLabel:`Frame time`},{key:`frame`,displayLabel:`Frame ID`}];this.drive.forEveryExistingSlot(t=>{t.analysis instanceof Sn?(e.push({key:this.formatAnalysisKey(t.analysis,`min`),displayLabel:this.formatAnalysisDisplayName(t.analysis,`min`)}),e.push({key:this.formatAnalysisKey(t.analysis,`max`),displayLabel:this.formatAnalysisDisplayName(t.analysis,`max`)}),e.push({key:this.formatAnalysisKey(t.analysis,`avg`),displayLabel:this.formatAnalysisDisplayName(t.analysis,`avg`)})):e.push({key:this.formatAnalysisKey(t.analysis),displayLabel:this.formatAnalysisDisplayName(t.analysis)})});let t=[];return this.drive.parent.files.value.sort((e,t)=>e.timestamp-t.timestamp).forEach(e=>{let n={file:e.fileName,timestamp:tr.human(e.timeline.currentStep.absolute),frame:e.timeline.currentStep.index};e.slots.forEveryExistingSlot(e=>{if(e.analysis instanceof Sn){let t=this.formatFrameSlotValue(e,`min`),r=this.formatFrameSlotValue(e,`max`),i=this.formatFrameSlotValue(e,`avg`);n[t.key]=t.value,n[r.key]=r.value,n[i.key]=i.value}else{let t=this.formatFrameSlotValue(e);n[t.key]=t.value}}),t.push(n)}),{header:e,data:t}}downloadAsCsv(){let e=this.drive.parent,t=e.name??e.id??e.hash,{header:n,data:r}=this.getData(),i=C({fieldSeparator:`;`,filename:`group_${t}`,columnHeaders:n}),a=xe(i)(r);Ce(i)(a)}},Fr=class e extends $n{drive;static DEFAULT_PROPS={fileName:`export.png`,columns:3,width:1600,showAnalysis:!0,showFileDate:!0,showFileName:!1,showThermalScale:!0,license:void 0,textColor:`black`,fontSize:12,showGroupName:!0,backgroundColor:`white`};get group(){return this.drive.parent}localGroup;header;list;constructor(e){super(),this.drive=e}buildHeader(){return document.createElement(`div`)}buildList(){let e=document.createElement(`div`);return e.style.boxSizing=`border-box`,e.style.width=`100%`,e.style.display=`flex`,e.style.flexWrap=`wrap`,e}buildInstance(t,n,r,i,a,o){let s=document.createElement(`div`);s.style.width=n.toString()+`%`,s.style.padding=e.GAP_SMALL,s.style.boxSizing=`border-box`;let c=document.createElement(`div`);if(s.appendChild(c),i||a){let n=document.createElement(`div`);if(i){let e=this.createElementWithText(`div`,`${tr.human(t.timeline.currentStep.absolute)}`,o,`bold`);n.appendChild(e)}if(a){let r=this.createElementWithText(`div`,i?` - `+t.fileName:t.fileName,e.FONT_SIZE_SMALL,i?`normal`:`bold`);n.appendChild(r)}c.appendChild(n)}if(this.list){let n=this.group.files.value.find(e=>e.fileName===t.fileName);if(n&&t.timeline.setRelativeTime(n?.timeline.currentMs),this.list.appendChild(s),t.removeVisibleFile(),t.setPreferWebGl(!1),t.mountToDom(c),t.draw(),t.dom&&t.dom.visibleLayer&&(t.dom.visibleLayer.getLayerRoot().style.display=`none`),r){let r=n;if(r&&r.analysis.value.length>0){let n=document.createElement(`table`);n.style.width=`100%`,n.style.borderCollapse=`collapse`;let i=document.createElement(`tr`);[``,`AVG`,`MIN`,`MAX`].forEach(t=>{let n=this.createElementWithText(`th`,t,o,void 0,e.COLOR_GRAY);n.style.padding=e.GAP_SMALL+`px`,n.style.textAlign=`left`,i.appendChild(n)}),n.appendChild(i),c.appendChild(n),r.slots.forEveryExistingSlot((r,i)=>{let a=t.slots.createAnalysisFromSerialized(r.serialized,i);if(a){let t=document.createElement(`tr`),i=this.createElementWithText(`td`,r.analysis.name,o,void 0,r.analysis.initialColor);i.style.borderTop=`1px solid ${e.COLOR_LIGHT}`,i.style.padding=`${e.GAP_SMALL}px 0px ${e.GAP_SMALL} 0px`,t.appendChild(i);let s=(n,r)=>{let i=this.createElementWithText(`td`,r?r.toFixed(3)+` °C`:``,o,void 0);i.style.borderTop=`1px solid ${e.COLOR_LIGHT}`,i.style.paddingTop=`${e.GAP_SMALL}px`,i.style.paddingBottom=`${e.GAP_SMALL}px`,t.appendChild(i)};r.analysis instanceof Sn?(s(r.analysis.initialColor,a.avg),s(r.analysis.initialColor,a.min),s(r.analysis.initialColor,a.max)):r.analysis instanceof vn&&(s(r.analysis.initialColor,a.avg),s(r.analysis.initialColor),s(r.analysis.initialColor)),n.appendChild(t)}})}}}}onBuildDom(){this.header=this.buildHeader(),this.list=this.buildList(),this.container?.appendChild(this.header),this.container?.appendChild(this.list)}beforeDomRemoved(){this.localGroup&&(this.localGroup.files.forEveryInstance(e=>e.unmountFromDom()),this.localGroup.files.removeAllInstances())}afterDomRemoved(){delete this.header,delete this.list,delete this.localGroup}onDownload(t){let n=Math.random().toFixed(),r=this.group.registry.manager,i=r.addOrGetRegistry(n),a=i.groups.addOrGetGroup(this.group.id);if(t.showGroupName&&this.header){let n=t.label?t.label:this.group.label;this.header.appendChild(this.createElementWithText(`div`,n,t.fontSize.toString()+`px`,`bold`)),this.header.style.paddingBottom=e.GAP_BASE}t.showThermalScale&&this.list?.appendChild(this.buildHorizontalScale(this.list,this.group.registry.minmax.value.min,this.group.registry.minmax.value.max,this.group.registry.range.value.from,this.group.registry.range.value.to,this.group.registry.palette.currentPalette.gradient,`gray`,`black`)),this.localGroup=a,r.palette.setPalette(this.group.registry.manager.palette.value),i.range.imposeRange(this.group.registry.range.value);let o=this.group.files.sortedFiles.map(e=>e.thermalUrl),s;o.forEach(e=>{s=i.batch.request(e,void 0,a,async()=>{})}),s.onResolve.set(`temporary export listener`,e=>{let n=100/t.columns;e.forEach(e=>{e instanceof rr&&this.buildInstance(e,n,t.showAnalysis,t.showFileDate,t.showFileName,t.fontSize.toString()+`px`)}),setTimeout(()=>{this.container&&this.downloadImage(t.fileName,this.container)},2e3)})}getFinalParams(t){let n=t?.fileName?t.fileName:`group__${this.group.label}__export`;return t===void 0?{...e.DEFAULT_PROPS,fileName:n}:{...e.DEFAULT_PROPS,...t,fileName:n}}},Ir=class e extends mn{static LISTENER_KEY=`__analysis__sync`;onSlotSync=new D;_currentPointer;get currentPointer(){return this._currentPointer}_csv;get csv(){return this._csv||=new Pr(this),this._csv}_png;get png(){return this._png||=new Fr(this),this._png}validate(e){return e}afterSetEffect(){}turnOn(e){this.value=!0,this.setCurrentPointer(e)}turnOff(){this.value=!1,this.setCurrentPointer(void 0)}forEveryExistingSlot(e){this._currentPointer!==void 0&&this._currentPointer.slots.forEveryExistingSlot(e)}setCurrentPointer(e){e===void 0&&this._currentPointer&&(this.endSyncingSlot(this._currentPointer,1),this.endSyncingSlot(this._currentPointer,2),this.endSyncingSlot(this._currentPointer,3),this.endSyncingSlot(this._currentPointer,4),this.endSyncingSlot(this._currentPointer,5),this.endSyncingSlot(this._currentPointer,6),this.endSyncingSlot(this._currentPointer,7)),e!==this._currentPointer&&(this._currentPointer!==void 0&&(this.endSyncingSlot(this._currentPointer,1),this.endSyncingSlot(this._currentPointer,2),this.endSyncingSlot(this._currentPointer,3),this.endSyncingSlot(this._currentPointer,4),this.endSyncingSlot(this._currentPointer,5),this.endSyncingSlot(this._currentPointer,6),this.endSyncingSlot(this._currentPointer,7)),this._currentPointer=e,this._currentPointer!==void 0&&(this.startSyncingSlot(this._currentPointer,1),this.startSyncingSlot(this._currentPointer,2),this.startSyncingSlot(this._currentPointer,3),this.startSyncingSlot(this._currentPointer,4),this.startSyncingSlot(this._currentPointer,5),this.startSyncingSlot(this._currentPointer,6),this.startSyncingSlot(this._currentPointer,7)))}getSlotListeners(e,t){let n=e.slots.getSlot(t);if(t===1)return{slot:n,serialise:e.slots.onSlot1Serialize,assign:e.slots.onSlot1Assignement};if(t===2)return{slot:n,serialise:e.slots.onSlot2Serialize,assign:e.slots.onSlot2Assignement};if(t===3)return{slot:n,serialise:e.slots.onSlot3Serialize,assign:e.slots.onSlot3Assignement};if(t===4)return{slot:n,serialise:e.slots.onSlot4Serialize,assign:e.slots.onSlot4Assignement};if(t===5)return{slot:n,serialise:e.slots.onSlot5Serialize,assign:e.slots.onSlot5Assignement};if(t===6)return{slot:n,serialise:e.slots.onSlot6Serialize,assign:e.slots.onSlot6Assignement};if(t===7)return{slot:n,serialise:e.slots.onSlot7Serialize,assign:e.slots.onSlot7Assignement}}startSyncingSlot(t,n){let{serialise:r}=this.getSlotListeners(t,n);r.set(e.LISTENER_KEY,e=>{this.forEveryOtherSlot(t,n,(t,r)=>{r.group.analysisSync.value!==!1&&r.dom?.built&&(this.onSlotSync.call(e,n),t===void 0&&e?r.slots.createAnalysisFromSerialized(e,n)?.setSelected():t!==void 0&&e?(t.recieveSerialized(e),this.onSlotSync.call(t?t.serialized:void 0,n)):t!==void 0&&e===void 0&&t.analysis.file.slots.removeSlotAndAnalysis(n))})})}endSyncingSlot(t,n){let{assign:r,serialise:i}=this.getSlotListeners(t,n);r.delete(e.LISTENER_KEY),i.delete(e.LISTENER_KEY)}deleteSlot(e,t){this.forEveryOtherSlot(e,t,e=>{e?.analysis.file.slots.removeSlotAndAnalysis(t)})}setSlotSelected(e,t){this.forEveryOtherSlot(e,t,e=>{e?.analysis.setSelected(!1)})}setSlotDeselected(e,t){this.forEveryOtherSlot(e,t,e=>{e?.analysis.setDeselected()})}forEveryOtherSlot(e,t,n){this.parent.files.forEveryInstance(r=>{r!==e&&n(r.slots.getSlot(t),r)})}recieveSlotSerialized(e,t){this.parent.files.forEveryInstance(n=>{if(n!==this.currentPointer&&n.group.analysisSync.value!==!1){if(e){let r=n.slots.getSlot(t);r?r.recieveSerialized(e):n.slots.createAnalysisFromSerialized(e,t)}else n.slots.removeSlotAndAnalysis(t)}})}copyOneSlotToAllInstances(e,t){this.setCurrentPointer(e);let n=e.slots.getSlot(t),r=n?.serialized??n?.analysis.toSerialized();this.parent.files.forEveryInstance(n=>{n!==e&&(n.slots.hasSlot(t)&&n.slots.removeSlotAndAnalysis(t),r&&n.slots.createAnalysisFromSerialized(r,t)?.setSelected())})}copyAllSlotsToAllInstances(e){[1,2,3,4,5,6,7].forEach(t=>{this.copyOneSlotToAllInstances(e,t)})}},Lr=class extends mn{_hover=this.value!==void 0;get hover(){return this._hover}validate(e){return e}afterSetEffect(e){this._hover=this.value!==void 0,this.parent.files.forEveryInstance(t=>t.recieveCursorPosition(e))}recieveCursorPosition(e){this.value=e}},Rr=class extends mn{_map=new Map;get map(){return this._map}validate(e){return e.sort((e,t)=>e.timestamp-t.timestamp)}get sortedFiles(){return this.value.sort((e,t)=>e.timestamp-t.timestamp)}afterSetEffect(e){this.map.clear(),e.forEach(e=>this._map.set(e.thermalUrl,e)),console.log(`afterSetEffect`,this._map)}addFile(e){return this._map.has(e.thermalUrl)?this._map.get(e.thermalUrl):(this.value=[...this.value,e],e)}removeFile(e){let t=e instanceof rr?e:this.map.get(e);t&&(t.unmountFromDom(),this.value=this.value.filter(e=>e.thermalUrl!==t.thermalUrl))}removeAllInstances(){this.forEveryInstance(e=>e.destroySelfAndBelow()),this.value=[]}forEveryInstance(e){this.value.forEach(t=>e(t))}downloadAllFiles(){let e=[];this.forEveryInstance(t=>{let n=new Blob([t.reader.buffer],{type:`application/octet-stream`}),r=new File([n],t.fileName,{type:`application/octet-stream`});e.push(r)}),en(e).blob().then(e=>{let t=document.createElement(`a`);t.download=`${this.parent.name||this.parent.id||`thermal_group`}_files.zip`,t.href=URL.createObjectURL(e),document.body.appendChild(t),t.click(),document.body.removeChild(t),t.remove()})}async batchCreateInstances(e,t=!1){let n=await Promise.all(e.map(async e=>await e.createInstance(this.parent,!1)));t?(this.forEveryInstance(e=>e.destroySelfAndBelow()),this.value=n):this.value=[...this.value,...n]}},zr=class extends mn{get distanceInCelsius(){if(this.value!==void 0)return Math.abs(this.value.min-this.value.max)}},Br=class extends zr{validate(e){return e}afterSetEffect(){}recalculateFromInstances(){return this.value=this._getMinmaxFromInstances(),this.value}_getMinmaxFromInstances(){let e=this.parent.files.value;if(e.length!==0)return e.reduce((e,t)=>t.min<e.min||t.max>e.max?{min:t.min<e.min?t.min:e.min,max:t.max>e.max?t.max:e.max}:e,{min:1/0,max:-1/0})}},Vr=class extends mn{_hasAnyPlayback=!1;get hasAnyPlayback(){return this._hasAnyPlayback}set hasAnyPlayback(e){this._hasAnyPlayback!==e&&(this._hasAnyPlayback=e,this.onHasAnyCallback.call(e))}onHasAnyCallback=new D;recalculateHasAnyPlayback(e){let t=!1;e.forEach(e=>{e.timeline.isSequence&&(t=!0)}),this.hasAnyPlayback=t}_playing=!1;get playing(){return this._playing}set playing(e){this._playing!==e&&(this._playing=e,this.onPlayingStatusChange.call(this._playing))}onPlayingStatusChange=new D;loopStep=0;loopTimer;_loopInterval=20;get loopInterval(){return this._loopInterval}setLoopInterval(e){this._loopInterval=Math.round(e),this.onLoopIntervalChanged.call(this._loopInterval)}onLoopIntervalChanged=new D;_duration=0;get duration(){return this._duration}set duration(e){e!==this._duration&&(this._duration=e,this.onDurationChanged.call(this._duration))}onDurationChanged=new D;recalculateDuration(e){let t=0;e.forEach(e=>{e.timeline.duration>t&&(t=e.timeline.duration)}),this.duration=t}UUID=this.parent.id+`__listener`;constructor(e,t){super(e,t),this.recalculateDuration(this.parent.files.value),this.recalculateHasAnyPlayback(this.parent.files.value),this.parent.registry.batch.onBatchComplete.set(this.UUID,e=>{let t=e.filter(e=>e instanceof rr);this.recalculateDuration(t),this.recalculateHasAnyPlayback(t);let n=this.value;this.value=n})}validate(e){return Math.min(Math.max(e,0),this.duration)}afterSetEffect(e){this.parent.files.forEveryInstance(t=>t.timeline.setRelativeTime(e))}setValueByPercent(e){let t=this.percentToMs(e);t!==this.value&&(this.value=t,this.loopStep=Math.floor(this.duration/this.value),this.playing&&this.createTimerStep(!0))}setValueByRelativeMs(e){this.value=e,this.loopStep=Math.floor(this.duration/this.value),this.playing&&this.createTimerStep(!0)}percentToMs(e){return Math.floor(this.duration*(e/100))}msToPercent(e){return e/this.duration*100}createTimerStep(e=!1){if(this.duration===void 0||this.playing===!1)return;let t=this.loopStep+1,n=t*this.loopInterval;this.loopStep=t,n<=this.duration?(this.loopTimer&&clearTimeout(this.loopTimer),this.loopTimer=setTimeout(()=>{this.createTimerStep(e),this.value=n},this.loopInterval)):this.playing=!1}play(){this.playing===!1&&(this.playing=!0,this.createTimerStep(!0))}stop(){this.playing===!0&&(this.playing=!1,this.loopTimer&&clearTimeout(this.loopTimer))}reset(){this.value!==0&&(this.value=0,this.loopStep=0)}},Hr=class extends rn{registry;id;name;description;hash=Math.random();get label(){return this.name??this.id??this.hash}get pool(){return this.registry.manager.pool}constructor(e,t,n,r){super(),this.registry=e,this.id=t,this.name=n,this.description=r}minmax=new Br(this,void 0);get tool(){return this.registry.manager.tool}files=new Rr(this,[]);cursorPosition=new Lr(this,void 0);analysisSync=new Ir(this,!1);analysisGraph=new Nr(this);_playback;get playback(){return this._playback||=new Vr(this,0),this._playback}forEveryInstance=e=>{this.files.value.forEach(t=>e(t))};destroySelfAndBelow(){this.removeAllChildren(),this.minmax.reset()}removeAllChildren(){this.files.removeAllInstances()}reset(){this.files.reset(),this.minmax.reset(),this.cursorPosition.reset(),this.analysisSync.reset()}filters=new an(this);getInstances(){return this.files.value}startBatch(e){return this.registry.batch.getBatchById(e)}},Ur=class extends mn{_map=new Map;get map(){return this._map}validate(e){return e}afterSetEffect(e){this._map.clear(),e.forEach(e=>this._map.set(e.id,e))}addExistingGroup(e){this.value.map(e=>e.hash).includes(e.hash)||(this.value=[...this.value,e])}addOrGetGroup(e,t,n){if(this._map.has(e))return this._map.get(e);let r=new Hr(this.parent,e,t,n);return this._map.set(e,r),this.value.push(r),this.value=[...this.value],r}removeGroup(e){this._map.has(e)&&(this._map.get(e)?.destroySelfAndBelow(),this._map.delete(e),this.value=Array.from(this._map.values()))}removeAllGroups(){this.value.forEach(e=>e.destroySelfAndBelow()),this.value=[]}},Wr=class extends zr{validate(e){return e}afterSetEffect(){}recalculateFromGroups(){let e=this.parent.groups.value;return this.value=this._getMinmaxFromAllGroups(e),this.value}_getMinmaxFromAllGroups(e){if(e.length!==0)return e.reduce((e,t)=>t.minmax.value===void 0?e:{min:t.minmax.value.min<e.min?t.minmax.value.min:e.min,max:t.minmax.value.max>e.max?t.minmax.value.max:e.max},{min:1/0,max:-1/0})}},Gr=class extends mn{onAutoValueChanged=new D;_autoValue=void 0;get currentRange(){return this.value}validate(e){if(e===void 0)return;let t=this.parent.minmax.value;if(t===void 0)return e;let n={...e};return e.from<t.min&&(n.from=t.min),e.to>t.max&&(n.to=t.max),n}afterSetEffect(e){e&&this.parent.forEveryInstance(e=>e.draw()),this.recalculateAutoValue()}imposeRange(e){return e===void 0&&this.value===void 0||e===void 0&&this.value!==void 0&&(this.value=e),(e!==void 0&&this.value===void 0||e!==void 0&&this.value!==void 0&&(this.value.from!==e.from||this.value.to!==e.to))&&(this.value=e),this.value}applyMinmax(){if(this.parent.minmax.value){let e={from:this.parent.minmax.value.min,to:this.parent.minmax.value.max};this.imposeRange(e)}}applyAuto(){this.imposeRange(this._autoValue)}get autoValue(){return this._autoValue}recalculateAutoValue(){let e=this._autoValue;if(this.parent.histogram.value){let e=this.parent.histogram.value.filter(e=>e.height>=10);this._autoValue=e.length>0?{from:e[0].from,to:e[e.length-1].to}:void 0}else this._autoValue=void 0;return(e?.from!==this._autoValue?.from||e?.to!==this._autoValue?.to)&&this.onAutoValueChanged.call(this._autoValue),this._autoValue}},Kr=64,qr=1,Jr=e=>e.map(e=>({...e})),Yr=new class{readerIds=new WeakMap;nextReaderId=0;entries=new Map;inFlight=new Map;getOrCalculate(e,t){let n=this.createKey(e),r=this.entries.get(n);if(r!==void 0)return this.touch(n,r),Promise.resolve(Jr(r));let i=this.inFlight.get(n);if(i)return i.then(Jr);let a=Promise.resolve().then(t).then(e=>{let t=Jr(e);return this.entries.set(n,t),this.evictOverflow(),t}).finally(()=>{this.inFlight.get(n)===a&&this.inFlight.delete(n)});return this.inFlight.set(n,a),a.then(Jr)}createKey(e){return`${qr}:${e.map(e=>this.getReaderId(e)).sort((e,t)=>e-t).join(`,`)}`}getReaderId(e){let t=this.readerIds.get(e);return t===void 0&&(t=++this.nextReaderId,this.readerIds.set(e,t)),t}touch(e,t){this.entries.delete(e),this.entries.set(e,t)}evictOverflow(){for(;this.entries.size>Kr;){let e=this.entries.keys().next().value;if(e===void 0)return;this.entries.delete(e)}}},Xr=class extends mn{_resolution=150;get resolution(){return this._resolution}buffer=new Map;bufferPixelsCount=0;_bufferResolution=1e3;set bufferResolution(e){this._bufferResolution=Math.round(Math.max(e,1e3))}get bufferResolution(){return this._bufferResolution}_loading=!1;get loading(){return this._loading}set loading(e){this._loading=e}onCalculationStart=new D;onCalculationEnd=new D;setResolution(e){this._resolution=Math.round(Math.min(Math.max(e,2),1e3))}validate(e){return e}afterSetEffect(){this.parent.range.recalculateAutoValue()}recalculateHistogramBufferInWorker(){this.recalculateHistogram()}async recalculateHistogram(){let e=this.parent.groups.value.map(e=>e.files.value).reduce((e,t)=>(e=e.concat(t),e),[]);if(e.length!==0&&this.parent.minmax.value!==void 0&&this.parent.minmax.distanceInCelsius!==void 0){this.onCalculationStart.call(),this.loading=!0;try{let t=await Yr.getOrCalculate(e.map(e=>e.reader),()=>this.parent.pool.exec(sn.registryHistogram,[e.map(e=>e.reader.buffer)]));this.value=t,this.loading=!1,this.onCalculationEnd.call(!0)}catch(e){this.loading=!1,this.onCalculationEnd.call(!1),console.error(`Error calculating histogram`,e)}}}},Zr=class extends mn{validate(e){return e}afterSetEffect(){}markAsLoading(){this.value===!1&&(this.value=!0)}markAsLoaded(){this.value===!0&&(this.value=!1)}},Qr=class extends rn{id;manager;hash=Math.random();constructor(e,t,n){super(),this.id=e,this.manager=t,this.palette=this.manager.palette,n&&n.histogramResolution!==void 0&&n.histogramResolution>0&&this.histogram.setResolution(n.histogramResolution)}get service(){return this.manager.service}get pool(){return this.manager.pool}groups=new Ur(this,[]);forEveryGroup(e){this.groups.value.forEach(e)}forEveryInstance(e){this.forEveryGroup(t=>t.files.forEveryInstance(e))}async loadFullMultipleFiles(e){this.reset(),this.loading.markAsLoading();let t=await Promise.all(Object.entries(e).map(async([e,t])=>({group:this.groups.addOrGetGroup(e),groupFiles:await Promise.all(t.map(e=>this.service.loadFile(e.thermalUrl,e.visibleUrl)))}))),n=await Promise.all(t.map(async({group:e,groupFiles:t})=>await Promise.all(t.map(async t=>t instanceof ir&&await t.createInstance(e)))));return this.postLoadedProcessing(),n}async loadFullOneFile(e,t){this.reset(),this.loading.markAsLoading();let n=this.groups.addOrGetGroup(t),r=await this.service.loadFile(e.thermalUrl,e.visibleUrl),i=r instanceof ir?await r.createInstance(n):r;return this.loading.markAsLoaded(),this.postLoadedProcessing(),i}_batch;get batch(){return this._batch||=new jr(this),this._batch}registerRequest(e,t=void 0,n,r){this.batch.request(e,t,n,r)}onProcessingStart=new D;onProcessingEnd=new D;async postLoadedProcessing(){if(this.onProcessingStart.call(),this.forEveryGroup(e=>e.minmax.recalculateFromInstances()),this.minmax.recalculateFromGroups(),this.minmax.value){if(this.range.value===void 0)this.range.imposeRange({from:this.minmax.value.min,to:this.minmax.value.max});else{let e=Math.max(this.range.value.from,this.minmax.value.min),t=Math.min(this.range.value.to,this.minmax.value.max);(e!==this.range.value.from||t!==this.range.value.to)&&this.range.imposeRange({from:Math.max(this.range.value.from,this.minmax.value.min),to:Math.min(this.range.value.to,this.minmax.value.max)})}}this.histogram.recalculateHistogramBufferInWorker(),this.loading.markAsLoaded(),this.onProcessingEnd.call()}reset(){this.groups.removeAllGroups(),this.opacity.reset(),this.minmax.reset()}removeAllChildren(){this.groups.removeAllGroups()}destroySelfAndBelow(){this.reset()}destroySelfInTheManager(){this.manager.removeRegistry(this.id)}opacity=new Mr(this,1);minmax=new Wr(this,void 0);loading=new Zr(this,!1);range=new Gr(this,void 0);histogram=new Xr(this,[]);palette;filters=new an(this);getInstances(){let e=[];return this.groups.value.forEach(t=>{e=[...e,...t.getInstances()]}),e}},$r=class{manager;active=!1;constructor(e){this.manager=e}activate(){this.onActivate()}deactivate(){this.onDeactivate()}},ei=class extends $r{},ti=class extends ei{key=`add-ellipsis`;name=`addellipsisanalysis`;description=`clickandaddellipsis`;icon=`<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path fill="currentcolor" d="M48.87,21.96C47.6,9.62,37.17,0,24.5,0,10.97,0,0,10.97,0,24.5h0c0,12.67,9.62,23.1,21.96,24.37,2.71,8.76,10.88,15.13,20.54,15.13,11.87,0,21.5-9.63,21.5-21.5,0-9.66-6.37-17.82-15.13-20.54ZM4,24.5C4,13.2,13.2,4,24.5,4c10.15,0,18.57,7.42,20.2,17.11-.72-.07-1.45-.11-2.2-.11-11.87,0-21.5,9.63-21.5,21.5,0,.74.04,1.47.11,2.2-9.69-1.62-17.11-10.05-17.11-20.2ZM55.23,44.5h-10.65v10.65h-4v-10.65h-10.65v-4h10.65v-10.65h4v10.65h10.65v4Z"/>
</svg>`;onActivate(){this.manager.forEveryInstance(e=>{e.analysis.layers.selectedOnly.forEach(e=>{e.setDeselected()})})}onDeactivate(){}onCanvasLeave(){}onCanvasClick(e,t,n){n.analysis.layers.createEllipsisFrom(e,t).setSelected(!0)}onPointDown(){}onPointUp(e){if(e.isInSelectedLayer()){if(e.deactivate(),e.analysis.file.group.tool.selectTool(`edit`),e.analysis.setReady(),e.analysis.width<=0||e.analysis.height<=0)e.analysis.layers.removeAnalysis(e.analysis.key);else if(e.analysis.file.slots.value.size<=Fn.MAX_SLOTS){let t=e.analysis.file.slots.getNextFreeSlotNumber();t!==void 0&&e.file.slots.assignAnalysisToSlot(t,e.analysis)}}}onPointMove(e,t,n){e.isInSelectedLayer()&&e.active&&(e.setXFromTool(n),e.setYFromTool(t),e.analysis.onMoveOrResize.call(e.analysis))}onPointLeave(){}onPointEnter(){}getLabelValue=(e,t,n)=>`X:${e}<br />Y:${t}<br />${n.group.tool.tools.inspect.getLabelValue(e,t,n)}`},ni=class extends ei{key=`add-rect`;name=`addrectangleanalysis`;description=`clickandaddrectangle`;icon=`<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M49,22.01V0H0v49h22.01c2.76,8.7,10.89,15,20.49,15,11.87,0,21.5-9.63,21.5-21.5,0-9.61-6.3-17.74-15-20.49ZM4,45V4h41v17.16c-.82-.1-1.65-.16-2.5-.16-11.87,0-21.5,9.63-21.5,21.5,0,.85.06,1.68.16,2.5H4ZM55.23,44.5h-10.65v10.65h-4v-10.65h-10.65v-4h10.65v-10.65h4v10.65h10.65v4Z" fill="currentcolor"/>
</svg>`;onActivate(){this.manager.forEveryInstance(e=>{e.analysis.layers.selectedOnly.forEach(e=>{e.setDeselected()})})}onDeactivate(){}onCanvasLeave(){}onCanvasClick(e,t,n){n.analysis.layers.createRectFrom(e,t).setSelected(!0)}onPointDown(){}onPointUp(e){if(e.isInSelectedLayer()){if(e.deactivate(),e.analysis.file.group.tool.selectTool(`edit`),e.analysis.setReady(),e.analysis.width<=0||e.analysis.height<=0)e.analysis.layers.removeAnalysis(e.analysis.key);else{let t=e.analysis.file.slots.getNextFreeSlotNumber();t!==void 0&&e.file.slots.assignAnalysisToSlot(t,e.analysis)}}}onPointMove(e,t,n){e.isInSelectedLayer()&&e.active&&(e.setXFromTool(n),e.setYFromTool(t),e.analysis.onMoveOrResize.call(e.analysis))}onPointLeave(){}onPointEnter(){}getLabelValue=(e,t,n)=>`X:${e}<br />Y:${t}<br />${n.group.tool.tools.inspect.getLabelValue(e,t,n)}`},ri=class extends ei{key=`add-point`;name=`addpointanalysis`;description=`clickandaddpoint`;icon=`<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path fill="currentcolor" d="M34,19h-15v15h-4v-15H0v-4h15V0h4v15h15v4ZM64,42.5c0,11.87-9.63,21.5-21.5,21.5s-21.5-9.63-21.5-21.5,9.63-21.5,21.5-21.5,21.5,9.63,21.5,21.5ZM55.23,40.5h-10.65v-10.65h-4v10.65h-10.65v4h10.65v10.65h4v-10.65h10.65v-4Z"/>
</svg>`;onActivate(){this.manager.forEveryInstance(e=>{e.analysis.layers.selectedOnly.forEach(e=>{e.setDeselected()})})}onDeactivate(){}onCanvasLeave(){}onCanvasClick(e,t,n){n.analysis.layers.createPointAt(e,t).setSelected(!0)}onPointDown(){}onPointUp(e){e.isInSelectedLayer()&&(e.deactivate(),e.analysis.file.group.tool.selectTool(`edit`),e.analysis.setReady(),e.analysis.onMoveOrResize.call(e.analysis))}onPointMove(){}onPointLeave(){}onPointEnter(){}getLabelValue=(e,t,n)=>`X:${e}<br />Y:${t}<br />${n.group.tool.tools.inspect.getLabelValue(e,t,n)}`},ii=class extends $r{key=`edit`;name=`editanalysis`;description=`dragcornersofselectedanalysis`;icon=`<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <polygon points="34 17.03 34 -.02 30 -.02 30 17.03 17 17.03 17 32 0 32 0 36 17 36 17 47 46.97 47 46.97 17.03 34 17.03" fill="currentcolor"/>
</svg>`;onActivate(){}onDeactivate(){}onCanvasLeave(){}onCanvasClick(){}onPointEnter(e){e.mouseEnter()}onPointLeave(e){e.active===!1&&e.mouseLeave()}onPointMove(e,t,n){e.isInSelectedLayer()&&e.active&&(e.setXFromTool(n),e.setYFromTool(t),e.analysis.onMoveOrResize.call(e.analysis))}onPointDown(e){e.isInSelectedLayer()&&e.active===!1&&e.activate()}onPointUp(e){e.active===!0&&e.deactivate()}getLabelValue(e,t,n){let r=n.getTemperatureAtPoint(e,t),i=n.analysis.layers.all.filter(n=>n.isWithin(e,t)).map(e=>{let t=e.selected?`span`:`s`;return`<${t} style="color: ${e.initialColor};">
                    ${e.name}
                </${t}>`});return`${i.length>0?i.join(`<br />`)+`<br />`:``}${r&&r.toFixed(2)+` °C<br />`}X: ${e}<br />Y: ${t}`}},ai=class extends $r{key=`inspect`;name=`inspecttemperatures`;description=`usemousetoinspecttemperaturevalues`;icon=`<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M17.58,42.03c-1.39,0-2.65-.34-3.79-1.01-1.14-.68-2.04-1.58-2.72-2.72-.68-1.14-1.01-2.4-1.01-3.78s.34-2.65,1.01-3.79c.67-1.14,1.58-2.04,2.72-2.72,1.14-.68,2.4-1.01,3.79-1.01s2.65.34,3.79,1.01c1.14.68,2.04,1.58,2.72,2.72s1.01,2.4,1.01,3.79-.34,2.64-1.01,3.78c-.68,1.14-1.58,2.05-2.72,2.72-1.14.68-2.4,1.01-3.79,1.01ZM17.58,37.04c.47,0,.9-.11,1.28-.34.38-.23.69-.53.91-.92.22-.39.34-.81.34-1.27s-.11-.9-.34-1.28c-.23-.38-.53-.69-.91-.91s-.81-.34-1.28-.34-.88.11-1.27.34c-.39.23-.69.53-.92.91-.23.38-.34.81-.34,1.28s.11.88.34,1.27c.22.39.53.69.92.92.39.23.81.34,1.27.34ZM56.24,38.45h-8.28c-.06-.69-.21-1.31-.46-1.87-.25-.56-.59-1.04-1.03-1.45-.44-.41-.96-.72-1.58-.94s-1.32-.33-2.1-.33c-1.37,0-2.53.33-3.47,1s-1.66,1.62-2.14,2.86-.73,2.74-.73,4.48c0,1.84.25,3.38.74,4.62s1.21,2.17,2.15,2.79c.94.62,2.07.93,3.39.93.75,0,1.43-.1,2.03-.29.6-.19,1.12-.47,1.56-.83.44-.36.8-.8,1.08-1.31.28-.51.47-1.09.57-1.74l8.28.06c-.1,1.27-.46,2.57-1.07,3.88-.62,1.32-1.49,2.53-2.62,3.64s-2.53,2-4.19,2.68c-1.67.68-3.6,1.01-5.8,1.01-2.76,0-5.24-.59-7.43-1.78-2.19-1.18-3.92-2.93-5.18-5.23-1.27-2.3-1.9-5.12-1.9-8.45s.65-6.17,1.94-8.47c1.29-2.3,3.04-4.03,5.23-5.21,2.19-1.18,4.64-1.77,7.34-1.77,1.9,0,3.65.26,5.24.78,1.6.52,3,1.28,4.2,2.27,1.2.99,2.17,2.22,2.91,3.66s1.18,3.11,1.34,4.98ZM30,0H0v30L30,0Z" fill="currentcolor"/>
</svg>`;onActivate(){}onDeactivate(){}onCanvasClick(){}onCanvasLeave(){}onPointEnter(){}onPointLeave(){}onPointMove(){}onPointDown(){}onPointUp(){}getLabelValue=(e,t,n)=>{if(n===void 0)return``;try{return n.getTemperatureAtPoint(e,t).toFixed(2)+` °C`}catch(e){return console.error(`Error getting tool label at point`,e),``}}},oi=[ai,ri,ni,ti,ii],si=e=>{let t=oi.map(t=>{let n=new t(e);return[n.key,n]});return Object.fromEntries(t)},ci=class extends mn{_tools=si(this.parent);get tools(){return this._tools}constructor(e,t){super(e,t)}validate(e){return e}afterSetEffect(e){e&&(e.activate(),Object.values(this.tools).forEach(t=>{t.key!==e.key&&t.deactivate()}))}selectTool(e){this.value=e instanceof $r?e:this.tools[e]}},li=`chrome`in window?{maxWorkers:4}:{},ui=d.pool(li),di=class extends rn{id;service=new or(this);registries={};palette=new Or(this,`jet`);smooth=new kr(this,!1);graphSmooth=new sr(this,!1);tool=new ci(this,new ai(this));pool;constructor(e,t){super(),this.pool=e||ui,this.id=Math.random(),t&&t.palette&&this.palette.setPalette(t.palette)}forEveryRegistry(e){Object.values(this.registries).forEach(t=>e(t))}addOrGetRegistry(e,t){return this.registries[e]===void 0&&(this.registries[e]=new Qr(e,this,t)),this.registries[e]}removeRegistry(e){this.registries[e]!==void 0&&(this.registries[e].destroySelfAndBelow(),delete this.registries[e])}filters=new an(this);getInstances(){let e=[];return this.forEveryRegistry(t=>{e=[...e,...t.getInstances()]}),e}forEveryInstance(e){this.forEveryRegistry(t=>t.forEveryInstance(e))}destroySelfAndBelow(){this.removeAllChildren(),this.reset()}removeAllChildren(){this.forEveryRegistry(e=>{this.removeRegistry(e.id)})}reset(){this.palette.reset(),this.smooth.reset(),this.graphSmooth.reset(),this.tool.reset()}};console.info(`@labirthermal/core`,nn);var fi={fromAttribute:e=>e==null||typeof e!=`string`||e===``||!(e in Dr)?`iron`:e,toAttribute:e=>e},pi={fromAttribute(e){if(typeof e!=`string`)return;let t=e.trim();if(t.length!==0)return t},toAttribute(e){let t=e?.trim();return t?.length?t:void 0}},mi=new Map;function hi(e){let t=mi.get(e);if(t)return t;let n=document.createElement(`span`);if(n.style.color=e,!n.style.color)throw Error(`Invalid background color: ${e}`);n.style.display=`none`,document.body.append(n);let r=getComputedStyle(n).color;n.remove();let i=r.match(/^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/);if(!i||i[4]!==void 0&&Number(i[4])!==1)throw Error(`Expected an opaque RGB background color: ${e}`);let a=[Number(i[1]),Number(i[2]),Number(i[3])].map(e=>{let t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4}),o=.2126*a[0]+.7152*a[1]+.0722*a[2],s=(o+.05)/.05>=1.05/(o+.05)?`#000000`:`#FFFFFF`;return mi.set(e,s),s}var gi=globalThis,_i=gi.ShadowRoot&&(gi.ShadyCSS===void 0||gi.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,vi=Symbol(),yi=new WeakMap,bi=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==vi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(_i&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=yi.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&yi.set(t,e))}return e}toString(){return this.cssText}},xi=e=>new bi(typeof e==`string`?e:e+``,void 0,vi),O=(e,...t)=>new bi(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,vi),Si=(e,t)=>{if(_i)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=gi.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},Ci=_i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return xi(t)})(e):e,{is:wi,defineProperty:Ti,getOwnPropertyDescriptor:Ei,getOwnPropertyNames:Di,getOwnPropertySymbols:Oi,getPrototypeOf:ki}=Object,Ai=globalThis,ji=Ai.trustedTypes,Mi=ji?ji.emptyScript:``,Ni=Ai.reactiveElementPolyfillSupport,Pi=(e,t)=>e,Fi={toAttribute(e,t){switch(t){case Boolean:e=e?Mi:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ii=(e,t)=>!wi(e,t),Li={attribute:!0,type:String,converter:Fi,reflect:!1,useDefault:!1,hasChanged:Ii};Symbol.metadata??=Symbol(`metadata`),Ai.litPropertyMetadata??=new WeakMap;var Ri=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Li){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Ti(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=Ei(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Li}static _$Ei(){if(this.hasOwnProperty(Pi(`elementProperties`)))return;let e=ki(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Pi(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Pi(`properties`))){let e=this.properties,t=[...Di(e),...Oi(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(Ci(e))}else e!==void 0&&t.push(Ci(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Si(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?Fi:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?Fi:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??Ii)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};Ri.elementStyles=[],Ri.shadowRootOptions={mode:`open`},Ri[Pi(`elementProperties`)]=new Map,Ri[Pi(`finalized`)]=new Map,Ni?.({ReactiveElement:Ri}),(Ai.reactiveElementVersions??=[]).push(`2.1.2`);var zi=globalThis,Bi=e=>e,Vi=zi.trustedTypes,Hi=Vi?Vi.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Ui=`$lit$`,Wi=`lit$${Math.random().toFixed(9).slice(2)}$`,Gi=`?`+Wi,Ki=`<${Gi}>`,qi=document,Ji=()=>qi.createComment(``),Yi=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Xi=Array.isArray,Zi=e=>Xi(e)||typeof e?.[Symbol.iterator]==`function`,Qi=`[ 	
\f\r]`,$i=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ea=/-->/g,ta=/>/g,na=RegExp(`>|${Qi}(?:([^\\s"'>=/]+)(${Qi}*=${Qi}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ra=/'/g,ia=/"/g,aa=/^(?:script|style|textarea|title)$/i,k=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),oa=Symbol.for(`lit-noChange`),A=Symbol.for(`lit-nothing`),sa=new WeakMap,ca=qi.createTreeWalker(qi,129);function la(e,t){if(!Xi(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Hi===void 0?t:Hi.createHTML(t)}var ua=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=$i;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===$i?c[1]===`!--`?o=ea:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=na):(aa.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=na):o=ta:o===na?c[0]===`>`?(o=i??$i,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?na:c[3]===`"`?ia:ra):o===ia||o===ra?o=na:o===ea||o===ta?o=$i:(o=na,i=void 0);let d=o===na&&e[t+1].startsWith(`/>`)?` `:``;a+=o===$i?n+Ki:l>=0?(r.push(s),n.slice(0,l)+Ui+n.slice(l)+Wi+d):n+Wi+(l===-2?t:d)}return[la(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},da=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ua(t,n);if(this.el=e.createElement(l,r),ca.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=ca.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(Ui)){let t=u[o++],n=i.getAttribute(e).split(Wi),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ga:r[1]===`?`?_a:r[1]===`@`?va:ha}),i.removeAttribute(e)}else e.startsWith(Wi)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(aa.test(i.tagName)){let e=i.textContent.split(Wi),t=e.length-1;if(t>0){i.textContent=Vi?Vi.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],Ji()),ca.nextNode(),c.push({type:2,index:++a});i.append(e[t],Ji())}}}else if(i.nodeType===8){if(i.data===Gi)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Wi,e+1))!==-1;)c.push({type:7,index:a}),e+=Wi.length-1}}a++}}static createElement(e,t){let n=qi.createElement(`template`);return n.innerHTML=e,n}};function fa(e,t,n=e,r){if(t===oa)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=Yi(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=fa(e,i._$AS(e,t.values),i,r)),t}var pa=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??qi).importNode(t,!0);ca.currentNode=r;let i=ca.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new ma(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ya(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=ca.nextNode(),a++)}return ca.currentNode=qi,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},ma=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=fa(this,e,t),Yi(e)?e===A||e==null||e===``?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==oa&&this._(e):e._$litType$===void 0?e.nodeType===void 0?Zi(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&Yi(this._$AH)?this._$AA.nextSibling.data=e:this.T(qi.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=da.createElement(la(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new pa(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=sa.get(e.strings);return t===void 0&&sa.set(e.strings,t=new da(e)),t}k(t){Xi(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(Ji()),this.O(Ji()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=Bi(e).nextSibling;Bi(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ha=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=A}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=fa(this,e,t,0),a=!Yi(e)||e!==this._$AH&&e!==oa,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=fa(this,r[n+o],t,o),s===oa&&(s=this._$AH[o]),a||=!Yi(s)||s!==this._$AH[o],s===A?e=A:e!==A&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ga=class extends ha{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},_a=class extends ha{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},va=class extends ha{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=fa(this,e,t,0)??A)===oa)return;let n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ya=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){fa(this,e)}},ba={M:Ui,P:Wi,A:Gi,C:1,L:ua,R:pa,D:Zi,V:fa,I:ma,H:ha,N:_a,U:va,B:ga,F:ya},xa=zi.litHtmlPolyfillSupport;xa?.(da,ma),(zi.litHtmlVersions??=[]).push(`3.3.2`);var Sa=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new ma(t.insertBefore(Ji(),e),e,void 0,n??{})}return i._$AI(e),i},Ca=globalThis,wa=class extends Ri{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Sa(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return oa}};wa._$litElement$=!0,wa.finalized=!0,Ca.litElementHydrateSupport?.({LitElement:wa});var Ta=Ca.litElementPolyfillSupport;Ta?.({LitElement:wa}),(Ca.litElementVersions??=[]).push(`4.2.2`);var Ea={lock:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clip-rule="evenodd" />
</svg>
`},document:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>`},eye:{solid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
        </svg>`},play:{solid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
        </svg>`},pause:{solid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
        </svg>`},info:{mini:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />
        </svg>`,solid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
        </svg>`,outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>`},settings:{solid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
</svg>`,outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
`},back:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z" clip-rule="evenodd" />
</svg>`},share:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M12 6a2 2 0 1 0-1.994-1.842L5.323 6.5a2 2 0 1 0 0 3l4.683 2.342a2 2 0 1 0 .67-1.342L5.995 8.158a2.03 2.03 0 0 0 0-.316L10.677 5.5c.353.311.816.5 1.323.5Z" />
        </svg>`,mini:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
        </svg>`},folder:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H12.5A1.5 1.5 0 0 1 14 5.5v1.401a2.986 2.986 0 0 0-1.5-.401h-9c-.546 0-1.059.146-1.5.401V3.5ZM2 9.5v3A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 12.5 8h-9A1.5 1.5 0 0 0 2 9.5Z" />
        </svg>`},wifi:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M14.188 7.063a8.75 8.75 0 0 0-12.374 0 .75.75 0 0 1-1.061-1.06c4.003-4.004 10.493-4.004 14.496 0a.75.75 0 1 1-1.061 1.06Zm-2.121 2.121a5.75 5.75 0 0 0-8.132 0 .75.75 0 0 1-1.06-1.06 7.25 7.25 0 0 1 10.252 0 .75.75 0 0 1-1.06 1.06Zm-2.122 2.122a2.75 2.75 0 0 0-3.889 0 .75.75 0 1 1-1.06-1.061 4.25 4.25 0 0 1 6.01 0 .75.75 0 0 1-1.06 1.06Zm-2.828 1.06a1.25 1.25 0 0 1 1.768 0 .75.75 0 0 1 0 1.06l-.355.355a.75.75 0 0 1-1.06 0l-.354-.354a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>`},user:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clip-rule="evenodd" />
        </svg>`},image:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
        </svg>`},upwards:{outline:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M20.24 20.249a.75.75 0 0 0-.75-.75H8.989V5.56l2.47 2.47a.75.75 0 0 0 1.06-1.061l-3.75-3.75a.75.75 0 0 0-1.06 0l-3.75 3.75a.75.75 0 1 0 1.06 1.06l2.47-2.469V20.25c0 .414.335.75.75.75h11.25a.75.75 0 0 0 .75-.75Z" clip-rule="evenodd" />
        </svg>`},copy:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>`,mini:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
            <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
        </svg>`},right:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
        </svg>`},trash:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
        </svg>`},addfolder:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M3.5 2A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H9.621a1.5 1.5 0 0 1-1.06-.44L7.439 2.44A1.5 1.5 0 0 0 6.38 2H3.5ZM8 6a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 6Z" clip-rule="evenodd" />
        </svg>`},upload:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z" />
            <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
        </svg>`},clock:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>`},close:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>`},edit:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
        <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
        </svg>`},comment:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
        </svg>`},grid:{solid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v2A1.5 1.5 0 0 0 3.5 7h2A1.5 1.5 0 0 0 7 5.5v-2A1.5 1.5 0 0 0 5.5 2h-2ZM3.5 9A1.5 1.5 0 0 0 2 10.5v2A1.5 1.5 0 0 0 3.5 14h2A1.5 1.5 0 0 0 7 12.5v-2A1.5 1.5 0 0 0 5.5 9h-2ZM9 3.5A1.5 1.5 0 0 1 10.5 2h2A1.5 1.5 0 0 1 14 3.5v2A1.5 1.5 0 0 1 12.5 7h-2A1.5 1.5 0 0 1 9 5.5v-2ZM10.5 9A1.5 1.5 0 0 0 9 10.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 12.5 9h-2Z" />
        </svg>`},list:{solid:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>`},check:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
        </svg>`},"check-circle":{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" />
</svg>`},"circle-dots":{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5.5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
</svg>`},save:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h11l3 3v13H5V3Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 3v4h8V3M7 10h10M7 12h8" />
            <circle cx="17" cy="15" r="1.5" stroke="currentColor" fill="none" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="size-4">
            <path d="M2 2h9l3 3v8H2V2Zm2 1v3h6V3H4Zm0 4h8v1H4V7Zm0 2h6v1H4V9Zm8 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>`},restore:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
  <path fillRule="evenodd" d="M6.25 12.5A2.75 2.75 0 0 0 9 9.75V4.56L6.78 6.78a.75.75 0 0 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06L10.5 4.56v5.19a4.25 4.25 0 0 1-8.5 0v-1a.75.75 0 0 1 1.5 0v1a2.75 2.75 0 0 0 2.75 2.75Z" clipRule="evenodd" />
</svg>`},unlink:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M2.22 2.22a.75.75 0 0 1 1.06 0l4.46 4.46c.128-.178.272-.349.432-.508l3-3a4 4 0 0 1 5.657 5.656l-1.225 1.225a.75.75 0 1 1-1.06-1.06l1.224-1.225a2.5 2.5 0 0 0-3.536-3.536l-3 3a2.504 2.504 0 0 0-.406.533l2.59 2.59a2.49 2.49 0 0 0-.79-1.254.75.75 0 1 1 .977-1.138 3.997 3.997 0 0 1 1.306 3.886l4.871 4.87a.75.75 0 1 1-1.06 1.061l-5.177-5.177-.006-.005-4.134-4.134a.65.65 0 0 1-.005-.006L2.22 3.28a.75.75 0 0 1 0-1.06Zm3.237 7.727a.75.75 0 0 1 0 1.06l-1.225 1.225a2.5 2.5 0 0 0 3.536 3.536l1.879-1.879a.75.75 0 1 1 1.06 1.06L8.83 16.83a4 4 0 0 1-5.657-5.657l1.224-1.225a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
        </svg>`},link:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
            <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>`},zoom:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M6.25 8.75v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 1.5 0v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0Z" />
            <path fill-rule="evenodd" d="M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" clip-rule="evenodd" />
        </svg>`},adjustment:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z" />
        </svg>`,outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>`},range:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <g>
                <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="1.5"/>
                <line x1="5" y1="9" x2="5" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="19" y1="9" x2="19" y2="15" stroke="currentColor" stroke-width="2"/>
            </g>
        </svg>`,micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="size-4">
            <g>
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1"/>
                <line x1="3" y1="6" x2="3" y2="10" stroke="currentColor" stroke-width="1.5"/>
                <line x1="13" y1="6" x2="13" y2="10" stroke="currentColor" stroke-width="1.5"/>
            </g>
        </svg>`},bigger:{mini:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path d="m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z" />
</svg>
`},smaller:{mini:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H2.75a.75.75 0 0 0 0 1.5h4.5A.75.75 0 0 0 8 7.25v-4.5a.75.75 0 0 0-1.5 0v2.69L3.28 2.22ZM13.5 2.75a.75.75 0 0 0-1.5 0v4.5c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-2.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L13.5 5.44V2.75ZM3.28 17.78l3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06ZM13.5 14.56l3.22 3.22a.75.75 0 1 0 1.06-1.06l-3.22-3.22h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-2.69Z" />
</svg>`},ellipsis:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
</svg>`},download:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
  <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
</svg>`,outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>`},clipboard:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>`},bulb:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
</svg>`},reload:{micro:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clip-rule="evenodd" />
</svg>`},warning:{outline:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>`},move:{mini:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
  <path fill-rule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" clip-rule="evenodd" />
</svg>`}},Da=(e,t,n,r)=>{let i=Ea[e][t];if(!i)return console.warn(`Icon variant "${String(t)}" not found for icon "${String(e)}"`),k``;let a=i;return(n||r)&&(a=a.includes(`class="`)?a.replace(/class="([^"]*)"/,`class="$1 ${n||``}"`):a.replace(/<svg([^>]*)>/,`<svg$1 class="${n||``}">`),r&&(a=a.includes(`style="`)?a.replace(/style="([^"]*)"/,`style="$1; ${r}"`):a.replace(/<svg([^>]*)>/,`<svg$1 style="${r}">`))),a},Oa=(()=>{let e={};for(let t in Ea){let n=t;e[n]={};let r=Ea[n];for(let i in r)e[n][i]=(e,n)=>Da(t,i,e,n)}return e})(),j=e=>typeof e==`string`,ka=()=>{let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n},Aa=e=>e==null?``:String(e),ja=(e,t,n)=>{e.forEach(e=>{t[e]&&(n[e]=t[e])})},Ma=/###/g,Na=e=>e&&e.includes(`###`)?e.replace(Ma,`.`):e,Pa=e=>!e||j(e),Fa=(e,t,n)=>{let r=j(t)?t.split(`.`):t,i=0;for(;i<r.length-1;){if(Pa(e))return{};let t=Na(r[i]);!e[t]&&n&&(e[t]=new n),e=Object.prototype.hasOwnProperty.call(e,t)?e[t]:{},++i}return Pa(e)?{}:{obj:e,k:Na(r[i])}},Ia=(e,t,n)=>{let{obj:r,k:i}=Fa(e,t,Object);if(r!==void 0||t.length===1){r[i]=n;return}let a=t[t.length-1],o=t.slice(0,t.length-1),s=Fa(e,o,Object);for(;s.obj===void 0&&o.length;)a=`${o[o.length-1]}.${a}`,o=o.slice(0,o.length-1),s=Fa(e,o,Object),s?.obj&&s.obj[`${s.k}.${a}`]!==void 0&&(s.obj=void 0);s.obj[`${s.k}.${a}`]=n},La=(e,t,n,r)=>{let{obj:i,k:a}=Fa(e,t,Object);i[a]=i[a]||[],i[a].push(n)},Ra=(e,t)=>{let{obj:n,k:r}=Fa(e,t);if(n&&Object.prototype.hasOwnProperty.call(n,r))return n[r]},za=(e,t,n)=>{let r=Ra(e,n);return r===void 0?Ra(t,n):r},Ba=(e,t,n)=>{for(let r in t)r!==`__proto__`&&r!==`constructor`&&(Object.prototype.hasOwnProperty.call(e,r)?j(e[r])||e[r]instanceof String||j(t[r])||t[r]instanceof String?n&&(e[r]=t[r]):Ba(e[r],t[r],n):e[r]=t[r]);return e},Va=e=>e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,`\\$&`),Ha={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`,"/":`&#x2F;`},Ua=e=>j(e)?e.replace(/[&<>"'\/]/g,e=>Ha[e]):e,Wa=class{constructor(e){this.capacity=e,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(e){let t=this.regExpMap.get(e);if(t!==void 0)return t;let n=new RegExp(e);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(e,n),this.regExpQueue.push(e),n}},Ga=[` `,`,`,`?`,`!`,`;`],Ka=new Wa(20),qa=(e,t,n)=>{t||=``,n||=``;let r=Ga.filter(e=>!t.includes(e)&&!n.includes(e));if(r.length===0)return!0;let i=Ka.getRegExp(`(${r.map(e=>e===`?`?`\\?`:e).join(`|`)})`),a=!i.test(e);if(!a){let t=e.indexOf(n);t>0&&!i.test(e.substring(0,t))&&(a=!0)}return a},Ja=(e,t,n=`.`)=>{if(!e)return;if(e[t])return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0;let r=t.split(n),i=e;for(let e=0;e<r.length;){if(!i||typeof i!=`object`)return;let t,a=``;for(let o=e;o<r.length;++o)if(o!==e&&(a+=n),a+=r[o],t=i[a],t!==void 0){if([`string`,`number`,`boolean`].includes(typeof t)&&o<r.length-1)continue;e+=o-e+1;break}i=t}return i},Ya=e=>e?.replace(/_/g,`-`),Xa={type:`logger`,log(e){this.output(`log`,e)},warn(e){this.output(`warn`,e)},error(e){this.output(`error`,e)},output(e,t){console?.[e]?.apply?.(console,t)}},Za=new class e{constructor(e,t={}){this.init(e,t)}init(e,t={}){this.prefix=t.prefix||`i18next:`,this.logger=e||Xa,this.options=t,this.debug=t.debug}log(...e){return this.forward(e,`log`,``,!0)}warn(...e){return this.forward(e,`warn`,``,!0)}error(...e){return this.forward(e,`error`,``)}deprecate(...e){return this.forward(e,`warn`,`WARNING DEPRECATED: `,!0)}forward(e,t,n,r){return r&&!this.debug?null:(e=e.map(e=>j(e)?e.replace(/[\r\n\x00-\x1F\x7F]/g,` `):e),j(e[0])&&(e[0]=`${n}${this.prefix} ${e[0]}`),this.logger[t](e))}create(t){return new e(this.logger,{prefix:`${this.prefix}:${t}:`,...this.options})}clone(t){return t||=this.options,t.prefix=t.prefix||this.prefix,new e(this.logger,t)}},Qa=class{constructor(){this.observers={}}on(e,t){return e.split(` `).forEach(e=>{this.observers[e]||(this.observers[e]=new Map);let n=this.observers[e].get(t)||0;this.observers[e].set(t,n+1)}),this}off(e,t){this.observers[e]&&(t?this.observers[e].delete(t):delete this.observers[e])}once(e,t){let n=(...r)=>{t(...r),this.off(e,n)};return this.on(e,n),this}emit(e,...t){this.observers[e]&&Array.from(this.observers[e].entries()).forEach(([e,n])=>{for(let r=0;r<n;r++)e(...t)}),this.observers[`*`]&&Array.from(this.observers[`*`].entries()).forEach(([n,r])=>{for(let i=0;i<r;i++)n(e,...t)})}},$a=new WeakSet,eo=class extends Qa{constructor(e,t={ns:[`translation`],defaultNS:`translation`}){super(),this.data=e||{},this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator=`.`),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(e){this.options.ns.includes(e)||this.options.ns.push(e)}removeNamespaces(e){let t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)}getResource(e,t,n,r={}){let i=r.keySeparator===void 0?this.options.keySeparator:r.keySeparator,a=r.ignoreJSONStructure===void 0?this.options.ignoreJSONStructure:r.ignoreJSONStructure,o;e.includes(`.`)?o=e.split(`.`):(o=[e,t],n&&(Array.isArray(n)?o.push(...n):j(n)&&i?o.push(...n.split(i)):o.push(n)));let s=Ra(this.data,o);return!s&&!t&&!n&&e.includes(`.`)&&(e=o[0],t=o[1],n=o.slice(2).join(`.`)),s||!a||!j(n)?s:Ja(this.data?.[e]?.[t],n,i)}addResource(e,t,n,r,i={silent:!1}){let a=i.keySeparator===void 0?this.options.keySeparator:i.keySeparator,o=[e,t];n&&(o=o.concat(a?n.split(a):n)),e.includes(`.`)&&(o=e.split(`.`),r=t,t=o[1]),this.addNamespaces(t),Ia(this.data,o,r),i.silent||this.emit(`added`,e,t,n,r)}addResources(e,t,n,r={silent:!1}){for(let r in n)(j(n[r])||Array.isArray(n[r]))&&this.addResource(e,t,r,n[r],{silent:!0});r.silent||this.emit(`added`,e,t,n)}addResourceBundle(e,t,n,r,i,a={silent:!1,skipCopy:!1}){let o=[e,t];e.includes(`.`)&&(o=e.split(`.`),r=n,n=t,t=o[1]),this.addNamespaces(t);let s=Ra(this.data,o)||{};a.skipCopy||(n=JSON.parse(JSON.stringify(n))),r?Ba(s,n,i):s={...s,...n},Ia(this.data,o,s),a.silent||this.emit(`added`,e,t,n)}removeResourceBundle(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit(`removed`,e,t)}hasResourceBundle(e,t){return this.getResource(e,t)!==void 0}getResourceBundle(e,t){return t||=this.options.defaultNS,this.getResource(e,t)}getDataByLanguage(e){return this.data[e]}hasLanguageSomeTranslations(e){let t=this.getDataByLanguage(e);return!!(t&&Object.keys(t)||[]).find(e=>{let n=t[e];return $a.has(n)?!0:!n||Object.keys(n).length===0?!1:(typeof n==`object`&&$a.add(n),!0)})}toJSON(){return this.data}},to={processors:{},addPostProcessor(e){this.processors[e.name]=e},handle(e,t,n,r,i){return e.forEach(e=>{t=this.processors[e]?.process(t,n,r,i)??t}),t}},no=Symbol(`i18next/PATH_KEY`);function ro(){let e=[],t=Object.create(null),n;return t.get=(r,i)=>(n?.revoke?.(),i===no?e:(e.push(i),n=Proxy.revocable(r,t),n.proxy)),Proxy.revocable(Object.create(null),t).proxy}function io(e,t){let{[no]:n}=e(ro()),r=t?.keySeparator??`.`,i=t?.nsSeparator??`:`,a=t?.enableSelector===`strict`;if(n.length>1&&i){let e=t?.ns,o=a?Array.isArray(e)?e:e?[e]:null:Array.isArray(e)?e:null;if(o&&(a?o:o.length>1?o.slice(1):[]).includes(n[0]))return`${n[0]}${i}${n.slice(1).join(r)}`}return n.join(r)}var ao=e=>!j(e)&&typeof e!=`boolean`&&typeof e!=`number`,oo=class e extends Qa{constructor(e,t={}){super(),ja([`resourceStore`,`languageUtils`,`pluralResolver`,`interpolator`,`backendConnector`,`i18nFormat`,`utils`],e,this),this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator=`.`),this.logger=Za.create(`translator`),this.checkedLoadedFor={}}changeLanguage(e){e&&(this.language=e)}exists(e,t={interpolation:{}}){let n={...t};if(e==null)return!1;let r=this.resolve(e,n);if(r?.res===void 0)return!1;let i=ao(r.res);return!(n.returnObjects===!1&&i)}extractFromKey(e,t){let n=t.nsSeparator===void 0?this.options.nsSeparator:t.nsSeparator;n===void 0&&(n=`:`);let r=t.keySeparator===void 0?this.options.keySeparator:t.keySeparator,i=t.ns||this.options.defaultNS||[],a=n&&e.includes(n),o=!this.options.userDefinedKeySeparator&&!t.keySeparator&&!this.options.userDefinedNsSeparator&&!t.nsSeparator&&!qa(e,n,r);if(a&&!o){let t=e.match(this.interpolator.nestingRegexp);if(t&&t.length>0)return{key:e,namespaces:j(i)?[i]:i};let a=e.split(n);(n!==r||n===r&&this.options.ns.includes(a[0]))&&(i=a.shift()),e=a.join(r)}return{key:e,namespaces:j(i)?[i]:i}}translate(t,n,r){let i=typeof n==`object`?{...n}:n;if(typeof i!=`object`&&this.options.overloadTranslationOptionHandler&&(i=this.options.overloadTranslationOptionHandler(arguments)),typeof i==`object`&&(i={...i}),i||={},t==null)return``;typeof t==`function`&&(t=io(t,{...this.options,...i})),Array.isArray(t)||(t=[String(t)]),t=t.map(e=>typeof e==`function`?io(e,{...this.options,...i}):String(e));let a=i.returnDetails===void 0?this.options.returnDetails:i.returnDetails,o=i.keySeparator===void 0?this.options.keySeparator:i.keySeparator,{key:s,namespaces:c}=this.extractFromKey(t[t.length-1],i),l=c[c.length-1],u=i.nsSeparator===void 0?this.options.nsSeparator:i.nsSeparator;u===void 0&&(u=`:`);let d=i.lng||this.language,f=i.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if(d?.toLowerCase()===`cimode`)return f?a?{res:`${l}${u}${s}`,usedKey:s,exactUsedKey:s,usedLng:d,usedNS:l,usedParams:this.getUsedParamsDetails(i)}:`${l}${u}${s}`:a?{res:s,usedKey:s,exactUsedKey:s,usedLng:d,usedNS:l,usedParams:this.getUsedParamsDetails(i)}:s;let p=this.resolve(t,i),m=p?.res,h=p?.usedKey||s,g=p?.exactUsedKey||s,_=[`[object Number]`,`[object Function]`,`[object RegExp]`],v=i.joinArrays===void 0?this.options.joinArrays:i.joinArrays,y=!this.i18nFormat||this.i18nFormat.handleAsObject,b=i.count!==void 0&&!j(i.count),x=e.hasDefaultValue(i),S=b?this.pluralResolver.getSuffix(d,i.count,i):``,C=i.ordinal&&b?this.pluralResolver.getSuffix(d,i.count,{ordinal:!1}):``,ee=b&&!i.ordinal&&i.count===0,w=ee&&i[`defaultValue${this.options.pluralSeparator}zero`]||i[`defaultValue${S}`]||i[`defaultValue${C}`]||i.defaultValue,T=m;y&&!m&&x&&(T=w);let te=ao(T),ne=Object.prototype.toString.apply(T);if(y&&T&&te&&!_.includes(ne)&&!(j(v)&&Array.isArray(T))){if(!i.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn(`accessing an object - but returnObjects options is not enabled!`);let e=this.options.returnedObjectHandler?this.options.returnedObjectHandler(h,T,{...i,ns:c}):`key '${s} (${this.language})' returned an object instead of string.`;return a?(p.res=e,p.usedParams=this.getUsedParamsDetails(i),p):e}if(o){let e=Array.isArray(T),t=e?[]:{},n=e?g:h;for(let e in T)if(Object.prototype.hasOwnProperty.call(T,e)){let r=`${n}${o}${e}`;t[e]=x&&!m?this.translate(r,{...i,defaultValue:ao(w)?w[e]:void 0,joinArrays:!1,ns:c}):this.translate(r,{...i,joinArrays:!1,ns:c}),t[e]===r&&(t[e]=T[e])}m=t}}else if(y&&j(v)&&Array.isArray(m))m=m.join(v),m&&=this.extendTranslation(m,t,i,r);else{let e=!1,n=!1;!this.isValidLookup(m)&&x&&(e=!0,m=w),this.isValidLookup(m)||(n=!0,m=s);let a=(i.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&n?void 0:m,c=x&&w!==m&&this.options.updateMissing;if(n||e||c){if(this.logger.log(c?`updateKey`:`missingKey`,d,l,b&&!c?`${s}${this.pluralResolver.getSuffix(d,i.count,i)}`:s,c?w:m),o){let e=this.resolve(s,{...i,keySeparator:!1});e&&e.res&&this.logger.warn(`Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.`)}let e=[],t=this.languageUtils.getFallbackCodes(this.options.fallbackLng,i.lng||this.language);if(this.options.saveMissingTo===`fallback`&&t&&t[0])for(let n=0;n<t.length;n++)e.push(t[n]);else this.options.saveMissingTo===`all`?e=this.languageUtils.toResolveHierarchy(i.lng||this.language):e.push(i.lng||this.language);let n=(e,t,n)=>{let r=x&&n!==m?n:a;this.options.missingKeyHandler?this.options.missingKeyHandler(e,l,t,r,c,i):this.backendConnector?.saveMissing&&this.backendConnector.saveMissing(e,l,t,r,c,i),this.emit(`missingKey`,e,l,t,m)};this.options.saveMissing&&(this.options.saveMissingPlurals&&b?e.forEach(e=>{let t=this.pluralResolver.getSuffixes(e,i);ee&&i[`defaultValue${this.options.pluralSeparator}zero`]&&!t.includes(`${this.options.pluralSeparator}zero`)&&t.push(`${this.options.pluralSeparator}zero`),t.forEach(t=>{n([e],s+t,i[`defaultValue${t}`]||w)})}):n(e,s,w))}m=this.extendTranslation(m,t,i,p,r),n&&m===s&&this.options.appendNamespaceToMissingKey&&(m=`${l}${u}${s}`),(n||e)&&this.options.parseMissingKeyHandler&&(m=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${l}${u}${s}`:s,e?m:void 0,i))}return a?(p.res=m,p.usedParams=this.getUsedParamsDetails(i),p):m}extendTranslation(e,t,n,r,i){if(this.i18nFormat?.parse)e=this.i18nFormat.parse(e,{...this.options.interpolation.defaultVariables,...n},n.lng||this.language||r.usedLng,r.usedNS,r.usedKey,{resolved:r});else if(!n.skipInterpolation){n.interpolation&&this.interpolator.init({...n,interpolation:{...this.options.interpolation,...n.interpolation}});let a=j(e)&&(n?.interpolation?.skipOnVariables===void 0?this.options.interpolation.skipOnVariables:n.interpolation.skipOnVariables),o;if(a){let t=e.match(this.interpolator.nestingRegexp);o=t&&t.length}let s=n.replace&&!j(n.replace)?n.replace:n;if(this.options.interpolation.defaultVariables&&(s={...this.options.interpolation.defaultVariables,...s}),e=this.interpolator.interpolate(e,s,n.lng||this.language||r.usedLng,n),a){let t=e.match(this.interpolator.nestingRegexp),r=t&&t.length;o<r&&(n.nest=!1)}!n.lng&&r&&r.res&&(n.lng=this.language||r.usedLng),n.nest!==!1&&(e=this.interpolator.nest(e,(...e)=>i?.[0]===e[0]&&!n.context?(this.logger.warn(`It seems you are nesting recursively key: ${e[0]} in key: ${t[0]}`),null):this.translate(...e,t),n)),n.interpolation&&this.interpolator.reset()}let a=n.postProcess||this.options.postProcess,o=j(a)?[a]:a;return e!=null&&o?.length&&n.applyPostProcessor!==!1&&(e=to.handle(o,e,t,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...r,usedParams:this.getUsedParamsDetails(n)},...n}:n,this)),e}resolve(e,t={}){let n,r,i,a,o;return j(e)&&(e=[e]),Array.isArray(e)&&(e=e.map(e=>typeof e==`function`?io(e,{...this.options,...t}):e)),e.forEach(e=>{if(this.isValidLookup(n))return;let s=this.extractFromKey(e,t),c=s.key;r=c;let l=s.namespaces;this.options.fallbackNS&&(l=l.concat(this.options.fallbackNS));let u=t.count!==void 0&&!j(t.count),d=u&&!t.ordinal&&t.count===0,f=t.context!==void 0&&(j(t.context)||typeof t.context==`number`)&&t.context!==``,p=t.lngs?t.lngs:this.languageUtils.toResolveHierarchy(t.lng||this.language,t.fallbackLng);l.forEach(e=>{this.isValidLookup(n)||(o=e,!this.checkedLoadedFor[`${p[0]}-${e}`]&&this.utils?.hasLoadedNamespace&&!this.utils?.hasLoadedNamespace(o)&&(this.checkedLoadedFor[`${p[0]}-${e}`]=!0,this.logger.warn(`key "${r}" for languages "${p.join(`, `)}" won't get resolved as namespace "${o}" was not yet loaded`,`This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!`)),p.forEach(r=>{if(this.isValidLookup(n))return;a=r;let o=[c];if(this.i18nFormat?.addLookupKeys)this.i18nFormat.addLookupKeys(o,c,r,e,t);else{let e;u&&(e=this.pluralResolver.getSuffix(r,t.count,t));let n=`${this.options.pluralSeparator}zero`,i=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(u&&(t.ordinal&&e.startsWith(i)&&o.push(c+e.replace(i,this.options.pluralSeparator)),o.push(c+e),d&&o.push(c+n)),f){let r=`${c}${this.options.contextSeparator||`_`}${t.context}`;o.push(r),u&&(t.ordinal&&e.startsWith(i)&&o.push(r+e.replace(i,this.options.pluralSeparator)),o.push(r+e),d&&o.push(r+n))}}let s;for(;s=o.pop();)this.isValidLookup(n)||(i=s,n=this.getResource(r,e,s,t))}))})}),{res:n,usedKey:r,exactUsedKey:i,usedLng:a,usedNS:o}}isValidLookup(e){return e!==void 0&&!(!this.options.returnNull&&e===null)&&!(!this.options.returnEmptyString&&e===``)}getResource(e,t,n,r={}){return this.i18nFormat?.getResource?this.i18nFormat.getResource(e,t,n,r):this.resourceStore.getResource(e,t,n,r)}getUsedParamsDetails(e={}){let t=[`defaultValue`,`ordinal`,`context`,`replace`,`lng`,`lngs`,`fallbackLng`,`ns`,`keySeparator`,`nsSeparator`,`returnObjects`,`returnDetails`,`joinArrays`,`postProcess`,`interpolation`],n=e.replace&&!j(e.replace),r=n?e.replace:e;if(n&&e.count!==void 0&&(r={...r,count:e.count}),this.options.interpolation.defaultVariables&&(r={...this.options.interpolation.defaultVariables,...r}),!n){r={...r};for(let e of t)delete r[e]}return r}static hasDefaultValue(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&t.startsWith(`defaultValue`)&&e[t]!==void 0)return!0;return!1}},so=class{constructor(e){this.options=e,this.supportedLngs=this.options.supportedLngs||!1,this.logger=Za.create(`languageUtils`),this.resolveHierarchyCache={}}clearCache(){this.resolveHierarchyCache={}}getScriptPartFromCode(e){if(e=Ya(e),!e||!e.includes(`-`))return null;let t=e.split(`-`);return t.length===2||(t.pop(),t[t.length-1].toLowerCase()===`x`)?null:this.formatLanguageCode(t.join(`-`))}getLanguagePartFromCode(e){if(e=Ya(e),!e||!e.includes(`-`))return e;let t=e.split(`-`);return this.formatLanguageCode(t[0])}formatLanguageCode(e){if(j(e)&&e.includes(`-`)){let t;try{t=Intl.getCanonicalLocales(e)[0]}catch{}return t&&this.options.lowerCaseLng&&(t=t.toLowerCase()),t||(this.options.lowerCaseLng?e.toLowerCase():e)}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e}isSupportedCode(e){return(this.options.load===`languageOnly`||this.options.nonExplicitSupportedLngs)&&(e=this.getLanguagePartFromCode(e)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(e)}getBestMatchFromCodes(e){if(!e)return null;let t;return e.forEach(e=>{if(t)return;let n=this.formatLanguageCode(e);(!this.options.supportedLngs||this.isSupportedCode(n))&&(t=n)}),!t&&this.options.supportedLngs&&e.forEach(e=>{if(t)return;let n=this.getScriptPartFromCode(e);if(this.isSupportedCode(n))return t=n;let r=this.getLanguagePartFromCode(e);if(this.isSupportedCode(r))return t=r;t=this.options.supportedLngs.find(e=>e===r?!0:!e.includes(`-`)&&!r.includes(`-`)?!1:!!(e.includes(`-`)&&!r.includes(`-`)&&e.slice(0,e.indexOf(`-`))===r||e.startsWith(r)&&r.length>1))}),t||=this.getFallbackCodes(this.options.fallbackLng)[0],t}getFallbackCodes(e,t){if(!e)return[];if(typeof e==`function`&&(e=e(t)),j(e)&&(e=[e]),Array.isArray(e))return e;if(!t)return e.default||[];let n=e[t];return n||=e[this.getScriptPartFromCode(t)],n||=e[this.formatLanguageCode(t)],n||=e[this.getLanguagePartFromCode(t)],n||=e.default,n||[]}toResolveHierarchy(e,t){let n=this.options.fallbackLng,r=Array.isArray(n)?n.join(`|`):n;r!==this._cachedFallbackLng&&(this.resolveHierarchyCache={},this._cachedFallbackLng=r);let i=t===void 0||t===!1||j(t),a=t===void 0&&typeof this.options.fallbackLng==`function`,o=j(e)&&i&&!a,s=null;if(o){let n;n=t===void 0?`undefined`:t===!1?`boolean:false`:`string:${t}`,s=`${e.length}:${e}|${n}`}if(s!==null){let e=this.resolveHierarchyCache[s];if(e!==void 0)return e.slice()}let c=this.getFallbackCodes((t===!1?[]:t)||this.options.fallbackLng||[],e),l=[],u=e=>{e&&(this.isSupportedCode(e)?l.push(e):this.logger.warn(`rejecting language code not found in supportedLngs: ${e}`))};return j(e)&&(e.includes(`-`)||e.includes(`_`))?(this.options.load!==`languageOnly`&&u(this.formatLanguageCode(e)),this.options.load!==`languageOnly`&&this.options.load!==`currentOnly`&&u(this.getScriptPartFromCode(e)),this.options.load!==`currentOnly`&&u(this.getLanguagePartFromCode(e))):j(e)&&u(this.formatLanguageCode(e)),c.forEach(e=>{l.includes(e)||u(this.formatLanguageCode(e))}),s===null?l:(this.resolveHierarchyCache[s]=l,l.slice())}},co={zero:0,one:1,two:2,few:3,many:4,other:5},lo={select:e=>e===1?`one`:`other`,resolvedOptions:()=>({pluralCategories:[`one`,`other`]})},uo=class{constructor(e,t={}){this.languageUtils=e,this.options=t,this.logger=Za.create(`pluralResolver`),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(e,t={}){let n=Ya(e===`dev`?`en`:e),r=t.ordinal?`ordinal`:`cardinal`,i=JSON.stringify({cleanedCode:n,type:r});if(i in this.pluralRulesCache)return this.pluralRulesCache[i];let a;try{a=new Intl.PluralRules(n,{type:r})}catch{if(typeof Intl>`u`)return this.logger.error(`No Intl support, please use an Intl polyfill!`),lo;if(!e.match(/-|_/))return lo;let n=this.languageUtils.getLanguagePartFromCode(e);a=this.getRule(n,t)}return this.pluralRulesCache[i]=a,a}needsPlural(e,t={}){let n=this.getRule(e,t);return n||=this.getRule(`dev`,t),n?.resolvedOptions().pluralCategories.length>1}getPluralFormsOfKey(e,t,n={}){return this.getSuffixes(e,n).map(e=>`${t}${e}`)}getSuffixes(e,t={}){let n=this.getRule(e,t);return n||=this.getRule(`dev`,t),n?n.resolvedOptions().pluralCategories.sort((e,t)=>co[e]-co[t]).map(e=>`${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:``}${e}`):[]}getSuffix(e,t,n={}){let r=this.getRule(e,n);return r?`${this.options.prepend}${n.ordinal?`ordinal${this.options.prepend}`:``}${r.select(t)}`:(this.logger.warn(`no plural rule found for: ${e}`),this.getSuffix(`dev`,t,n))}},fo=(e,t,n,r=`.`,i=!0)=>{let a=za(e,t,n);return!a&&i&&j(n)&&(a=Ja(e,n,r),a===void 0&&(a=Ja(t,n,r))),a},po=e=>e.replace(/\$/g,`$$$$`),mo=class{constructor(e={}){this.logger=Za.create(`interpolator`),this.options=e,this.format=e?.interpolation?.format||(e=>e),this.init(e)}init(e={}){e.interpolation||={escapeValue:!0};let{escape:t,escapeValue:n,useRawValueToEscape:r,prefix:i,prefixEscaped:a,suffix:o,suffixEscaped:s,formatSeparator:c,unescapeSuffix:l,unescapePrefix:u,nestingPrefix:d,nestingPrefixEscaped:f,nestingSuffix:p,nestingSuffixEscaped:m,nestingOptionsSeparator:h,maxReplaces:g,alwaysFormat:_}=e.interpolation;this.escape=t===void 0?Ua:t,this.escapeValue=n===void 0||n,this.useRawValueToEscape=r!==void 0&&r,this.prefix=i?Va(i):a||`{{`,this.suffix=o?Va(o):s||`}}`,this.formatSeparator=c||`,`,this.unescapePrefix=l?``:u?Va(u):`-`,this.unescapeSuffix=this.unescapePrefix?``:l?Va(l):``,this.nestingPrefix=d?Va(d):f||Va(`$t(`),this.nestingSuffix=p?Va(p):m||Va(`)`),this.nestingOptionsSeparator=h||`,`,this.maxReplaces=g||1e3,this.alwaysFormat=_!==void 0&&_,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){let e=(e,t)=>e?.source===t?(e.lastIndex=0,e):new RegExp(t,`g`);this.regexp=e(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=e(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=e(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']|"[^"]*"|'[^']*'|\\((?:[^()"']|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(e,t,n,r){let i,a,o,s=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},c=e=>{if(!e.includes(this.formatSeparator)){let i=fo(t,s,e,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format(i,void 0,n,{...r,...t,interpolationkey:e}):i}let i=e.split(this.formatSeparator),a=i.shift().trim(),o=i.join(this.formatSeparator).trim();return this.format(fo(t,s,a,this.options.keySeparator,this.options.ignoreJSONStructure),o,n,{...r,...t,interpolationkey:a})};this.resetRegExp(),!this.escapeValue&&typeof e==`string`&&/\$t\([^)]*\{[^}]*\{\{/.test(e)&&this.logger.warn(`nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.`);let l=r?.missingInterpolationHandler||this.options.missingInterpolationHandler,u=r?.interpolation?.skipOnVariables===void 0?this.options.interpolation.skipOnVariables:r.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:e=>e},{regex:this.regexp,safeValue:e=>this.escapeValue?this.escape(e):e}].forEach(t=>{for(o=0;i=t.regex.exec(e);){let n=i[1].trim();if(a=c(n),a===void 0){if(typeof l==`function`){let t=l(e,i,r);a=j(t)?t:``}else if(r&&Object.prototype.hasOwnProperty.call(r,n))a=``;else if(u){a=i[0];continue}else this.logger.warn(`missed to pass in variable ${n} for interpolating ${e}`),a=``}else!j(a)&&!this.useRawValueToEscape&&(a=Aa(a));let s=t.safeValue(a);if(e=e.replace(i[0],po(s)),u?(t.regex.lastIndex+=s.length,t.regex.lastIndex-=i[0].length):t.regex.lastIndex=0,o++,o>=this.maxReplaces)break}}),e}nest(e,t,n={}){let r,i,a,o=(e,t)=>{let n=this.nestingOptionsSeparator;if(!e.includes(n))return e;let r=e.split(RegExp(`${Va(n)}[ ]*{`)),i=`{${r[1]}`;e=r[0],i=this.interpolate(i,a);let o=i.match(/'/g),s=i.match(/"/g);((o?.length??0)%2==0&&!s||(s?.length??0)%2!=0)&&(i=i.replace(/'/g,`"`));try{a=JSON.parse(i),t&&(a={...t,...a})}catch(t){return this.logger.warn(`failed parsing options string in nesting for key ${e}`,t),`${e}${n}${i}`}return a.defaultValue&&a.defaultValue.includes(this.prefix)&&delete a.defaultValue,e},s=new RegExp(this.nestingRegexp),c=``,l=0;for(;r=s.exec(e);){let u=[];a={...n},a=a.replace&&!j(a.replace)?a.replace:a,a.applyPostProcessor=!1,delete a.defaultValue;let d=/{.*}/s.test(r[1])?r[1].lastIndexOf(`}`)+1:r[1].indexOf(this.formatSeparator);if(d!==-1&&(u=r[1].slice(d).split(this.formatSeparator).map(e=>e.trim()).filter(Boolean),r[1]=r[1].slice(0,d)),i=t(o.call(this,r[1].trim(),a),a),i&&r[0]===e&&!j(i))return i;j(i)||(i=Aa(i)),i||=(this.logger.warn(`missed to resolve ${r[1]} for nesting ${e}`),``),u.length&&(i=u.reduce((e,t)=>this.format(e,t,n.lng,{...n,interpolationkey:r[1].trim()}),i.trim())),c+=e.slice(l,r.index)+Aa(i),l=s.lastIndex,this.regexp.lastIndex=0}return l?c+e.slice(l):e}},ho=e=>{let t=e.toLowerCase().trim(),n={};if(e.includes(`(`)){let r=e.split(`(`);t=r[0].toLowerCase().trim();let i=r[1].slice(0,-1);t===`currency`&&!i.includes(`:`)?n.currency||=i.trim():t===`relativetime`&&!i.includes(`:`)?n.range||=i.trim():i.split(`;`).forEach(e=>{if(e){let[t,...r]=e.split(`:`),i=r.join(`:`).trim().replace(/^'+|'+$/g,``),a=t.trim();n[a]||(n[a]=i),i===`false`&&(n[a]=!1),i===`true`&&(n[a]=!0),isNaN(i)||(n[a]=parseInt(i,10))}})}return{formatName:t,formatOptions:n}},go=e=>{let t={};return(n,r,i)=>{let a=i;i&&i.interpolationkey&&i.formatParams&&i.formatParams[i.interpolationkey]&&i[i.interpolationkey]&&(a={...a,[i.interpolationkey]:void 0});let o=r+JSON.stringify(a),s=t[o];return s||(s=e(Ya(r),i),t[o]=s),s(n)}},_o=e=>(t,n,r)=>e(Ya(n),r)(t),vo=class{constructor(e={}){this.logger=Za.create(`formatter`),this.options=e,this.init(e)}init(e,t={interpolation:{}}){this.formatSeparator=t.interpolation.formatSeparator||`,`;let n=t.cacheInBuiltFormats?go:_o;this.formats={number:n((e,t)=>{let n=new Intl.NumberFormat(e,{...t});return e=>n.format(e)}),currency:n((e,t)=>{let n=new Intl.NumberFormat(e,{...t,style:`currency`});return e=>n.format(e)}),datetime:n((e,t)=>{let n=new Intl.DateTimeFormat(e,{...t});return e=>n.format(e)}),relativetime:n((e,t)=>{let n=new Intl.RelativeTimeFormat(e,{...t});return e=>n.format(e,t.range||`day`)}),list:n((e,t)=>{let n=new Intl.ListFormat(e,{...t});return e=>n.format(e)})}}add(e,t){this.formats[e.toLowerCase().trim()]=t}addCached(e,t){this.formats[e.toLowerCase().trim()]=go(t)}format(e,t,n,r={}){if(!t||e==null)return e;let i=t.split(this.formatSeparator),a=[];for(let e=0;e<i.length;e++){let t=i[e];for(;t.indexOf(`(`)>-1&&!t.includes(`)`)&&e+1<i.length;)t=`${t}${this.formatSeparator}${i[++e]}`;a.push(t)}return a.reduce((e,t)=>{let{formatName:i,formatOptions:a}=ho(t);if(this.formats[i]){let t=e;try{let o=r?.formatParams?.[r.interpolationkey]||{},s=o.locale||o.lng||r.locale||r.lng||n;t=this.formats[i](e,s,{...a,...r,...o})}catch(e){this.logger.warn(e)}return t}return this.logger.warn(`there was no format function for ${i}`),e},e)}},yo=(e,t)=>{e.pending[t]!==void 0&&(delete e.pending[t],e.pendingCount--)},bo=class extends Qa{constructor(e,t,n,r={}){super(),this.backend=e,this.store=t,this.services=n,this.languageUtils=n.languageUtils,this.options=r,this.logger=Za.create(`backendConnector`),this.waitingReads=[],this.maxParallelReads=r.maxParallelReads||10,this.readingCalls=0,this.maxRetries=r.maxRetries>=0?r.maxRetries:5,this.retryTimeout=r.retryTimeout>=1?r.retryTimeout:350,this.state={},this.queue=[],this.backend?.init?.(n,r.backend,r)}queueLoad(e,t,n,r){let i={},a={},o={},s={};return e.forEach(e=>{let r=!0;t.forEach(t=>{let o=`${e}|${t}`;!n.reload&&this.store.hasResourceBundle(e,t)?this.state[o]=2:this.state[o]<0||(this.state[o]===1?a[o]===void 0&&(a[o]=!0):(this.state[o]=1,r=!1,a[o]===void 0&&(a[o]=!0),i[o]===void 0&&(i[o]=!0),s[t]===void 0&&(s[t]=!0)))}),r||(o[e]=!0)}),(Object.keys(i).length||Object.keys(a).length)&&this.queue.push({pending:a,pendingCount:Object.keys(a).length,loaded:{},errors:[],callback:r}),{toLoad:Object.keys(i),pending:Object.keys(a),toLoadLanguages:Object.keys(o),toLoadNamespaces:Object.keys(s)}}loaded(e,t,n){let r=e.split(`|`),i=r[0],a=r[1];t&&this.emit(`failedLoading`,i,a,t),!t&&n&&this.store.addResourceBundle(i,a,n,void 0,void 0,{skipCopy:!0}),this.state[e]=t?-1:2,t&&n&&(this.state[e]=0);let o={};this.queue.forEach(n=>{La(n.loaded,[i],a),yo(n,e),t&&n.errors.push(t),n.pendingCount===0&&!n.done&&(Object.keys(n.loaded).forEach(e=>{o[e]||(o[e]={});let t=n.loaded[e];t.length&&t.forEach(t=>{o[e][t]===void 0&&(o[e][t]=!0)})}),n.done=!0,n.errors.length?n.callback(n.errors):n.callback())}),this.emit(`loaded`,o),this.queue=this.queue.filter(e=>!e.done)}read(e,t,n,r=0,i=this.retryTimeout,a){if(!e.length)return a(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:e,ns:t,fcName:n,tried:r,wait:i,callback:a});return}this.readingCalls++;let o=(o,s)=>{if(this.readingCalls--,this.waitingReads.length>0){let e=this.waitingReads.shift();this.read(e.lng,e.ns,e.fcName,e.tried,e.wait,e.callback)}o&&s&&r<this.maxRetries?setTimeout(()=>{this.read(e,t,n,r+1,i*2,a)},i):a(o,s)},s=this.backend[n].bind(this.backend);if(s.length===2)try{let n=s(e,t);n&&typeof n.then==`function`?n.then(e=>o(null,e)).catch(o):o(null,n)}catch(e){o(e)}else return s(e,t,o)}prepareLoading(e,t,n={},r){if(!this.backend)return this.logger.warn(`No backend was added via i18next.use. Will not load resources.`),r&&r();j(e)&&(e=this.languageUtils.toResolveHierarchy(e)),j(t)&&(t=[t]);let i=this.queueLoad(e,t,n,r);if(!i.toLoad.length)return i.pending.length||r(),null;i.toLoad.forEach(e=>{this.loadOne(e)})}load(e,t,n){this.prepareLoading(e,t,{},n)}reload(e,t,n){this.prepareLoading(e,t,{reload:!0},n)}loadOne(e,t=``){let n=e.split(`|`),r=n[0],i=n[1];this.read(r,i,`read`,void 0,void 0,(n,a)=>{n&&this.logger.warn(`${t}loading namespace ${i} for language ${r} failed`,n),!n&&a&&this.logger.log(`${t}loaded namespace ${i} for language ${r}`,a),this.loaded(e,n,a)})}saveMissing(e,t,n,r,i,a={},o=()=>{}){if(this.services?.utils?.hasLoadedNamespace&&!this.services?.utils?.hasLoadedNamespace(t))this.logger.warn(`did not save key "${n}" as the namespace "${t}" was not yet loaded`,`This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!`);else if(n!=null&&n!==``){if(this.backend?.create){let s={...a,isUpdate:i},c=this.backend.create.bind(this.backend);if(c.length<6)try{let i;i=c.length===5?c(e,t,n,r,s):c(e,t,n,r),i&&typeof i.then==`function`?i.then(e=>o(null,e)).catch(o):o(null,i)}catch(e){o(e)}else c(e,t,n,r,o,s)}e&&e[0]&&this.store.addResource(e[0],t,n,r)}}},xo=()=>({debug:!1,initAsync:!0,ns:[`translation`],defaultNS:[`translation`],fallbackLng:[`dev`],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:`all`,preload:!1,keySeparator:`.`,nsSeparator:`:`,pluralSeparator:`_`,contextSeparator:`_`,enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:`fallback`,saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:e=>{let t={};if(typeof e[1]==`object`&&(t=e[1]),j(e[1])&&(t.defaultValue=e[1]),j(e[2])&&(t.tDescription=e[2]),typeof e[2]==`object`||typeof e[3]==`object`){let n=e[3]||e[2];Object.keys(n).forEach(e=>{t[e]=n[e]})}return t},interpolation:{escapeValue:!0,prefix:`{{`,suffix:`}}`,formatSeparator:`,`,unescapePrefix:`-`,nestingPrefix:`$t(`,nestingSuffix:`)`,nestingOptionsSeparator:`,`,maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),So=e=>(j(e.ns)&&(e.ns=[e.ns]),j(e.fallbackLng)&&(e.fallbackLng=[e.fallbackLng]),j(e.fallbackNS)&&(e.fallbackNS=[e.fallbackNS]),e.supportedLngs&&!e.supportedLngs.includes(`cimode`)&&(e.supportedLngs=e.supportedLngs.concat([`cimode`])),e),Co=()=>{},wo=e=>{Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach(t=>{typeof e[t]==`function`&&(e[t]=e[t].bind(e))})},M=class e extends Qa{constructor(e={},t){if(super(),this.options=So(e),this.services={},this.logger=Za,this.modules={external:[]},wo(this),t&&!this.isInitialized&&!e.isClone){if(!this.options.initAsync)return this.init(e,t),this;setTimeout(()=>{this.init(e,t)},0)}}init(e={},t){this.isInitializing=!0,typeof e==`function`&&(t=e,e={}),e.defaultNS==null&&e.ns&&(j(e.ns)?e.defaultNS=e.ns:e.ns.includes(`translation`)||(e.defaultNS=e.ns[0]));let n=xo();this.options={...n,...this.options,...So(e)},this.options.interpolation={...n.interpolation,...this.options.interpolation},e.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=e.keySeparator),e.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=e.nsSeparator),typeof this.options.overloadTranslationOptionHandler!=`function`&&(this.options.overloadTranslationOptionHandler=n.overloadTranslationOptionHandler);let r=e=>e?typeof e==`function`?new e:e:null;if(!this.options.isClone){this.modules.logger?Za.init(r(this.modules.logger),this.options):Za.init(null,this.options);let e;e=this.modules.formatter?this.modules.formatter:vo;let t=new so(this.options);this.store=new eo(this.options.resources,this.options);let n=this.services;n.logger=Za,n.resourceStore=this.store,n.languageUtils=t,n.pluralResolver=new uo(t,{prepend:this.options.pluralSeparator}),e&&(n.formatter=r(e),n.formatter.init&&n.formatter.init(n,this.options),this.options.interpolation.format=n.formatter.format.bind(n.formatter)),n.interpolator=new mo(this.options),n.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},n.backendConnector=new bo(r(this.modules.backend),n.resourceStore,n,this.options),n.backendConnector.on(`*`,(e,...t)=>{this.emit(e,...t)}),this.modules.languageDetector&&(n.languageDetector=r(this.modules.languageDetector),n.languageDetector.init&&n.languageDetector.init(n,this.options.detection,this.options)),this.modules.i18nFormat&&(n.i18nFormat=r(this.modules.i18nFormat),n.i18nFormat.init&&n.i18nFormat.init(this)),this.translator=new oo(this.services,this.options),this.translator.on(`*`,(e,...t)=>{this.emit(e,...t)}),this.modules.external.forEach(e=>{e.init&&e.init(this)})}if(this.format=this.options.interpolation.format,t||=Co,this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){let e=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);e.length>0&&e[0]!==`dev`&&(this.options.lng=e[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn(`init: no languageDetector is used and no lng is defined`),[`getResource`,`hasResourceBundle`,`getResourceBundle`,`getDataByLanguage`].forEach(e=>{this[e]=(...t)=>this.store[e](...t)}),[`addResource`,`addResources`,`addResourceBundle`,`removeResourceBundle`].forEach(e=>{this[e]=(...t)=>(this.store[e](...t),this)});let i=ka(),a=()=>{let e=(e,n)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn(`init: i18next is already initialized. You should call init just once!`),this.isInitialized=!0,this.options.isClone||this.logger.log(`initialized`,this.options),this.emit(`initialized`,this.options),i.resolve(n),t(e,n)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return e(null,this.t.bind(this));this.changeLanguage(this.options.lng,e)};return this.options.resources||!this.options.initAsync?a():setTimeout(a,0),i}loadResources(e,t=Co){let n=t,r=j(e)?e:this.language;if(typeof e==`function`&&(n=e),!this.options.resources||this.options.partialBundledLanguages){if(r?.toLowerCase()===`cimode`&&(!this.options.preload||this.options.preload.length===0))return n();let e=[],t=t=>{t&&t!==`cimode`&&this.services.languageUtils.toResolveHierarchy(t).forEach(t=>{t!==`cimode`&&(e.includes(t)||e.push(t))})};r?t(r):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(e=>t(e)),this.options.preload?.forEach?.(e=>t(e)),this.services.backendConnector.load(e,this.options.ns,e=>{!e&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),n(e)})}else n(null)}reloadResources(e,t,n){let r=ka();return typeof e==`function`&&(n=e,e=void 0),typeof t==`function`&&(n=t,t=void 0),e||=this.languages,t||=this.options.ns,n||=Co,this.services.backendConnector.reload(e,t,e=>{r.resolve(),n(e)}),r}use(e){if(!e)throw Error(`You are passing an undefined module! Please check the object you are passing to i18next.use()`);if(!e.type)throw Error(`You are passing a wrong module! Please check the object you are passing to i18next.use()`);return e.type===`backend`&&(this.modules.backend=e),(e.type===`logger`||e.log&&e.warn&&e.error)&&(this.modules.logger=e),e.type===`languageDetector`&&(this.modules.languageDetector=e),e.type===`i18nFormat`&&(this.modules.i18nFormat=e),e.type===`postProcessor`&&to.addPostProcessor(e),e.type===`formatter`&&(this.modules.formatter=e),e.type===`3rdParty`&&this.modules.external.push(e),this}setResolvedLanguage(e){if(e&&this.languages&&![`cimode`,`dev`].includes(e)){for(let e=0;e<this.languages.length;e++){let t=this.languages[e];if(![`cimode`,`dev`].includes(t)&&this.store.hasLanguageSomeTranslations(t)){this.resolvedLanguage=t;break}}!this.resolvedLanguage&&!this.languages.includes(e)&&this.store.hasLanguageSomeTranslations(e)&&(this.resolvedLanguage=e,this.languages.unshift(e))}}changeLanguage(e,t){this.isLanguageChangingTo=e;let n=ka();this.emit(`languageChanging`,e);let r=e=>{this.language=e,this.languages=this.services.languageUtils.toResolveHierarchy(e),this.resolvedLanguage=void 0,this.setResolvedLanguage(e)},i=(i,a)=>{a?this.isLanguageChangingTo===e&&(r(a),this.translator.changeLanguage(a),this.isLanguageChangingTo=void 0,this.emit(`languageChanged`,a),this.logger.log(`languageChanged`,a)):this.isLanguageChangingTo=void 0,n.resolve((...e)=>this.t(...e)),t&&t(i,(...e)=>this.t(...e))},a=t=>{!e&&!t&&this.services.languageDetector&&(t=[]);let n=j(t)?t:t&&t[0],a=this.store.hasLanguageSomeTranslations(n)?n:this.services.languageUtils.getBestMatchFromCodes(j(t)?[t]:t);a&&(this.language||r(a),this.translator.language||this.translator.changeLanguage(a),this.services.languageDetector?.cacheUserLanguage?.(a)),this.loadResources(a,e=>{i(e,a)})};return!e&&this.services.languageDetector&&!this.services.languageDetector.async?a(this.services.languageDetector.detect()):!e&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(a):this.services.languageDetector.detect(a):a(e),n}getFixedT(e,t,n,r){let i=r?.scopeNs,a=(e,t,...r)=>{let o;o=typeof t==`object`?{...t}:this.options.overloadTranslationOptionHandler([e,t].concat(r)),o.lng=o.lng||a.lng,o.lngs=o.lngs||a.lngs;let s=o.ns!==void 0&&o.ns!==null;o.ns=o.ns||a.ns,o.keyPrefix!==``&&(o.keyPrefix=o.keyPrefix||n||a.keyPrefix);let c={...this.options,...o};Array.isArray(i)&&!s&&(c.ns=i),typeof o.keyPrefix==`function`&&(o.keyPrefix=io(o.keyPrefix,c));let l=this.options.keySeparator||`.`,u;return o.keyPrefix&&Array.isArray(e)?u=e.map(e=>(typeof e==`function`&&(e=io(e,c)),`${o.keyPrefix}${l}${e}`)):(typeof e==`function`&&(e=io(e,c)),u=o.keyPrefix?`${o.keyPrefix}${l}${e}`:e),this.t(u,o)};return j(e)?a.lng=e:a.lngs=e,a.ns=t,a.keyPrefix=n,a}t(...e){return this.translator?.translate(...e)}exists(...e){return this.translator?.exists(...e)}setDefaultNamespace(e){this.options.defaultNS=e}hasLoadedNamespace(e,t={}){if(!this.isInitialized)return this.logger.warn(`hasLoadedNamespace: i18next was not initialized`,this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn(`hasLoadedNamespace: i18n.languages were undefined or empty`,this.languages),!1;let n=t.lng||this.resolvedLanguage||this.languages[0],r=this.options?this.options.fallbackLng:!1,i=this.languages[this.languages.length-1];if(n.toLowerCase()===`cimode`)return!0;let a=(e,t)=>{let n=this.services.backendConnector.state[`${e}|${t}`];return n===-1||n===0||n===2};if(t.precheck){let e=t.precheck(this,a);if(e!==void 0)return e}if(this.hasResourceBundle(n,e)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages)return!0;let{languageUtils:o}=this.services,s=t.lng?o.isSupportedCode(n)&&o.toResolveHierarchy(n,!1)[0]:n;return!(s&&!a(s,e)||r&&!a(i,e))}loadNamespaces(e,t){let n=ka();return this.options.ns?(j(e)&&(e=[e]),e.forEach(e=>{this.options.ns.includes(e)||this.options.ns.push(e)}),this.loadResources(e=>{n.resolve(),t&&t(e)}),n):(t&&t(),Promise.resolve())}loadLanguages(e,t){let n=ka();j(e)&&(e=[e]);let r=this.options.preload||[],i=e.filter(e=>!r.includes(e)&&this.services.languageUtils.isSupportedCode(e));return i.length?(this.options.preload=r.concat(i),this.loadResources(e=>{n.resolve(),t&&t(e)}),n):(t&&t(),Promise.resolve())}dir(e){if(e||=this.resolvedLanguage||(this.languages?.length>0?this.languages[0]:this.language),!e)return`rtl`;try{let t=new Intl.Locale(e);if(t&&t.getTextInfo){let e=t.getTextInfo();if(e&&e.direction)return e.direction}}catch{}let t=`ar.shu.sqr.ssh.xaa.yhd.yud.aao.abh.abv.acm.acq.acw.acx.acy.adf.ads.aeb.aec.afb.ajp.apc.apd.arb.arq.ars.ary.arz.auz.avl.ayh.ayl.ayn.ayp.bbz.pga.he.iw.ps.pbt.pbu.pst.prp.prd.ug.ur.ydd.yds.yih.ji.yi.hbo.men.xmn.fa.jpr.peo.pes.prs.dv.sam.ckb`.split(`.`),n=this.services?.languageUtils||new so(xo());return e.toLowerCase().indexOf(`-latn`)>1?`ltr`:t.includes(n.getLanguagePartFromCode(e))||e.toLowerCase().indexOf(`-arab`)>1?`rtl`:`ltr`}static createInstance(t={},n){let r=new e(t,n);return r.createInstance=e.createInstance,r}cloneInstance(t={},n=Co){let r=t.forkResourceStore;r&&delete t.forkResourceStore;let i={...this.options,...t,isClone:!0},a=new e(i);if((t.debug!==void 0||t.prefix!==void 0)&&(a.logger=a.logger.clone(t)),[`store`,`services`,`language`].forEach(e=>{a[e]=this[e]}),a.services={...this.services},a.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},r&&(a.store=new eo(Object.keys(this.store.data).reduce((e,t)=>(e[t]={...this.store.data[t]},e[t]=Object.keys(e[t]).reduce((n,r)=>(n[r]={...e[t][r]},n),e[t]),e),{}),i),a.services.resourceStore=a.store),t.interpolation){let e={...xo().interpolation,...this.options.interpolation,...t.interpolation},n={...i,interpolation:e};a.services.interpolator=new mo(n)}return a.translator=new oo(a.services,i),a.translator.on(`*`,(e,...t)=>{a.emit(e,...t)}),a.init(i,n),a.translator.options=i,a.translator.backendConnector.services.utils={hasLoadedNamespace:a.hasLoadedNamespace.bind(a)},a}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}.createInstance();M.createInstance,M.dir,M.init,M.loadResources,M.reloadResources,M.use,M.changeLanguage,M.getFixedT;var N=M.t;M.exists,M.setDefaultNamespace,M.hasLoadedNamespace,M.loadNamespaces,M.loadLanguages;var{I:To}=ba,Eo=e=>e,Do=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,Oo=e=>e?._$litType$?.h!=null,ko=e=>e.strings===void 0,Ao=()=>document.createComment(``),jo=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new To(r.insertBefore(Ao(),i),r.insertBefore(Ao(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Eo(e).nextSibling;Eo(r).insertBefore(e,i),e=t}}}return n},Mo=(e,t,n=e)=>(e._$AI(t,n),e),No={},Po=(e,t=No)=>e._$AH=t,Fo=e=>e._$AH,Io=e=>{e._$AR(),e._$AA.remove()},Lo=e=>{e._$AR()},Ro={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zo=e=>(...t)=>({_$litDirective$:e,values:t}),Bo=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Vo=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Vo(e,t);return!0},Ho=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Uo=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Ko(t)}};function Wo(e){this._$AN===void 0?this._$AM=e:(Ho(this),this._$AM=e,Uo(this))}function Go(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Vo(r[e],!1),Ho(r[e]);else r!=null&&(Vo(r,!1),Ho(r))}else Vo(this,e)}}var Ko=e=>{e.type==Ro.CHILD&&(e._$AP??=Go,e._$AQ??=Wo)},qo=class extends Bo{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Uo(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Vo(this,e),Ho(this))}setValue(e){if(ko(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Jo=null,Yo=()=>{};new Promise(e=>{Yo=e});var Xo={type:`3rdParty`,init(e){Zo(e)}},Zo=e=>{Jo=e,Yo(Jo)},Qo=new Map;setInterval(()=>{Qo.forEach((e,t)=>{(t.isConnected===!1||ns(t)===!1)&&Qo.delete(t)})},1e4);var $o=!1,es=()=>{Qo.forEach((e,t)=>{if(t.isConnected&&ns(t)){let n=ts(e.keys,e.options);t.setValue(n)}})};function ts(e,t){if(!Jo)return``;$o===!1&&(Jo.on(`languageChanged`,es),Jo.store.on(`added`,es),$o=!0);let n=Jo.t(e,t);return typeof n==`string`?n:``}var ns=e=>{let t=e.part;if(t.type===Ro.ATTRIBUTE)return t.element.isConnected;if(t.type===Ro.CHILD)return t.parentNode?t.parentNode.isConnected:!1;if(t.type===Ro.PROPERTY||t.type===Ro.BOOLEAN_ATTRIBUTE||t.type===Ro.EVENT||t.type===Ro.ELEMENT)return t.element.isConnected;throw Error(`Unsupported Part`)},{slice:rs,forEach:is}=[];function as(e){return is.call(rs.call(arguments,1),t=>{if(t)for(let n in t)e[n]===void 0&&(e[n]=t[n])}),e}function os(e){return typeof e==`string`&&[/<\s*script.*?>/i,/<\s*\/\s*script\s*>/i,/<\s*img.*?on\w+\s*=/i,/<\s*\w+\s*on\w+\s*=.*?>/i,/javascript\s*:/i,/vbscript\s*:/i,/expression\s*\(/i,/eval\s*\(/i,/alert\s*\(/i,/document\.cookie/i,/document\.write\s*\(/i,/window\.location/i,/innerHTML/i].some(t=>t.test(e))}var ss=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/,cs=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{path:`/`},r=`${e}=${encodeURIComponent(t)}`;if(n.maxAge>0){let e=n.maxAge-0;if(Number.isNaN(e))throw Error(`maxAge should be a Number`);r+=`; Max-Age=${Math.floor(e)}`}if(n.domain){if(!ss.test(n.domain))throw TypeError(`option domain is invalid`);r+=`; Domain=${n.domain}`}if(n.path){if(!ss.test(n.path))throw TypeError(`option path is invalid`);r+=`; Path=${n.path}`}if(n.expires){if(typeof n.expires.toUTCString!=`function`)throw TypeError(`option expires is invalid`);r+=`; Expires=${n.expires.toUTCString()}`}if(n.httpOnly&&(r+=`; HttpOnly`),n.secure&&(r+=`; Secure`),n.sameSite)switch(typeof n.sameSite==`string`?n.sameSite.toLowerCase():n.sameSite){case!0:r+=`; SameSite=Strict`;break;case`lax`:r+=`; SameSite=Lax`;break;case`strict`:r+=`; SameSite=Strict`;break;case`none`:r+=`; SameSite=None`;break;default:throw TypeError(`option sameSite is invalid`)}return n.partitioned&&(r+=`; Partitioned`),r},ls={create(e,t,n,r){let i=arguments.length>4&&arguments[4]!==void 0?arguments[4]:{path:`/`,sameSite:`strict`};n&&(i.expires=new Date,i.expires.setTime(i.expires.getTime()+n*60*1e3)),r&&(i.domain=r),document.cookie=cs(e,t,i)},read(e){let t=`${e}=`,n=document.cookie.split(`;`);for(let e=0;e<n.length;e++){let r=n[e];for(;r.charAt(0)===` `;)r=r.substring(1,r.length);if(r.indexOf(t)===0)return r.substring(t.length,r.length)}return null},remove(e,t){this.create(e,``,-1,t)}},us={name:`cookie`,lookup(e){let{lookupCookie:t}=e;if(t&&typeof document<`u`)return ls.read(t)||void 0},cacheUserLanguage(e,t){let{lookupCookie:n,cookieMinutes:r,cookieDomain:i,cookieOptions:a}=t;n&&typeof document<`u`&&ls.create(n,e,r,i,a)}},ds={name:`querystring`,lookup(e){let{lookupQuerystring:t}=e,n;if(typeof window<`u`){let{search:e}=window.location;!window.location.search&&window.location.hash?.indexOf(`?`)>-1&&(e=window.location.hash.substring(window.location.hash.indexOf(`?`)));let r=e.substring(1).split(`&`);for(let e=0;e<r.length;e++){let i=r[e].indexOf(`=`);i>0&&r[e].substring(0,i)===t&&(n=r[e].substring(i+1))}}return n}},fs={name:`hash`,lookup(e){let{lookupHash:t,lookupFromHashIndex:n}=e,r;if(typeof window<`u`){let{hash:e}=window.location;if(e&&e.length>2){let i=e.substring(1);if(t){let e=i.split(`&`);for(let n=0;n<e.length;n++){let i=e[n].indexOf(`=`);i>0&&e[n].substring(0,i)===t&&(r=e[n].substring(i+1))}}if(r)return r;if(!r&&n>-1){let t=e.match(/\/([a-zA-Z-]*)/g);return Array.isArray(t)?t[typeof n==`number`?n:0]?.replace(`/`,``):void 0}}}return r}},ps=null,ms=()=>{if(ps!==null)return ps;try{if(ps=typeof window<`u`&&window.localStorage!==null,!ps)return!1;let e=`i18next.translate.boo`;window.localStorage.setItem(e,`foo`),window.localStorage.removeItem(e)}catch{ps=!1}return ps},hs={name:`localStorage`,lookup(e){let{lookupLocalStorage:t}=e;if(t&&ms())return window.localStorage.getItem(t)||void 0},cacheUserLanguage(e,t){let{lookupLocalStorage:n}=t;n&&ms()&&window.localStorage.setItem(n,e)}},gs=null,_s=()=>{if(gs!==null)return gs;try{if(gs=typeof window<`u`&&window.sessionStorage!==null,!gs)return!1;let e=`i18next.translate.boo`;window.sessionStorage.setItem(e,`foo`),window.sessionStorage.removeItem(e)}catch{gs=!1}return gs},vs={name:`sessionStorage`,lookup(e){let{lookupSessionStorage:t}=e;if(t&&_s())return window.sessionStorage.getItem(t)||void 0},cacheUserLanguage(e,t){let{lookupSessionStorage:n}=t;n&&_s()&&window.sessionStorage.setItem(n,e)}},ys={name:`navigator`,lookup(e){let t=[];if(typeof navigator<`u`){let{languages:e,userLanguage:n,language:r}=navigator;if(e)for(let n=0;n<e.length;n++)t.push(e[n]);n&&t.push(n),r&&t.push(r)}return t.length>0?t:void 0}},bs={name:`htmlTag`,lookup(e){let{htmlTag:t}=e,n,r=t||(typeof document<`u`?document.documentElement:null);return r&&typeof r.getAttribute==`function`&&(n=r.getAttribute(`lang`)),n}},xs={name:`path`,lookup(e){let{lookupFromPathIndex:t}=e;if(typeof window>`u`)return;let n=window.location.pathname.match(/\/([a-zA-Z-]*)/g);if(Array.isArray(n))return n[typeof t==`number`?t:0]?.replace(`/`,``)}},Ss={name:`subdomain`,lookup(e){let{lookupFromSubdomainIndex:t}=e,n=typeof t==`number`?t+1:1,r=typeof window<`u`&&window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);if(r)return r[n]}},Cs=!1;try{document.cookie,Cs=!0}catch{}var ws=[`querystring`,`cookie`,`localStorage`,`sessionStorage`,`navigator`,`htmlTag`];Cs||ws.splice(1,1);var Ts=()=>({order:ws,lookupQuerystring:`lng`,lookupCookie:`i18next`,lookupLocalStorage:`i18nextLng`,lookupSessionStorage:`i18nextLng`,caches:[`localStorage`],excludeCacheFor:[`cimode`],convertDetectedLanguage:e=>e}),Es=class{constructor(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this.type=`languageDetector`,this.detectors={},this.init(e,t)}init(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{languageUtils:{}},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};this.services=e,this.options=as(t,this.options||{},Ts()),typeof this.options.convertDetectedLanguage==`string`&&this.options.convertDetectedLanguage.indexOf(`15897`)>-1&&(this.options.convertDetectedLanguage=e=>e.replace(`-`,`_`)),this.options.lookupFromUrlIndex&&(this.options.lookupFromPathIndex=this.options.lookupFromUrlIndex),this.i18nOptions=n,this.addDetector(us),this.addDetector(ds),this.addDetector(hs),this.addDetector(vs),this.addDetector(ys),this.addDetector(bs),this.addDetector(xs),this.addDetector(Ss),this.addDetector(fs)}addDetector(e){return this.detectors[e.name]=e,this}detect(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.options.order,t=[];return e.forEach(e=>{if(this.detectors[e]){let n=this.detectors[e].lookup(this.options);n&&typeof n==`string`&&(n=[n]),n&&(t=t.concat(n))}}),t=t.filter(e=>e!=null&&!os(e)).map(e=>this.options.convertDetectedLanguage(e)),this.services&&this.services.languageUtils&&this.services.languageUtils.getBestMatchFromCodes?t:t.length>0?t[0]:null}cacheUserLanguage(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.options.caches;t&&(this.options.excludeCacheFor&&this.options.excludeCacheFor.indexOf(e)>-1||t.forEach(t=>{this.detectors[t]&&this.detectors[t].cacheUserLanguage(e,this.options)}))}};Es.type=`languageDetector`,M.use(Xo).use(Es).init({fallbackLng:`en`,resources:{cs:{translation:{moreoptions:`Více možností`,delete:`Smazat`,create:`Vytvořit`,createfolder:`Vytvořit složku`,createsubfolder:`Vytvořit podsložku`,subfolder:`Podsložka`,display:`Zobrazení`,syncanalyses:`Synchronizovat analýzy`,uploadedby:`Nahráno uživatelem`,uploadeddat:`Nahráno dne`,overviewofyourfolders:`Přehled vašich složek`,content:`Obsah`,palette:`Paleta`,loading:`Načítám`,config:`Nastavení`,layout_simple:`Jednoduché rozvržení`,layout_advanced:`Analytické rozvržení`,layout_nogui:`Bez GUI`,layout_lesson:`Rozvržení lekce`,share:`Sdílet`,fileloadingerror:`Chyba při načítání souboru`,embedhint:`Chcete-li vložit tento blok na jinou webovou stránku, použijte následující kód:`,embedlibrary:`Vložte knihovnu – jednou v HTML hlavičce`,embedcomponent:`Použijte následující kód kdekoli v HTML těle`,copy:`Kopírovat`,remotefoldersbrowseraddfolderhint:`Pokud v úložišti přidáte další složku, uvidíte zde další možnosti vyhodnocení.`,temperature:`Teplota`,upload:`Nahrát`,uploadafile:`Nahrát soubor`,selectfile:`Vybrat soubor`,addfiles:`Přidat soubor(y)`,clear:`Smazat`,dragorselectfile:`Přetáhněte LRC soubor nebo jej vyberte z disku`,file:`soubor`,detail:`Detail`,showeverything:`Zobrazit vše`,next:`Další`,prev:`Předchozí`,back:`Zpět`,close:`Zavřít`,reload:`Načíst znovu`,open:`Otevřít`,description:`Popis`,author:`Autor`,license:`Licence`,recordedat:`Nahráno`,displaysettings:`Nastavení zobrazení`,filerendering:`Vykreslování termogramu`,pixelated:`Pixelované`,smooth:`Vyhlazené`,filerenderinghint:`Režim 'Pixelované' vypne vyhlazování a zobrazí pixely termogramu přesně tak, jak jsou`,adjusttimescale:`Teplotní rozsah`,automaticrange:`Automatický rozsah`,fullrange:`Plný rozsah`,adjusttimescalehint:`Nastavit teplotní škálu automaticky (nejčastější teploty z histogramu) anebo ji roztáhnout na minimální a maximální teploty.`,palettename:`Paleta {{name}}`,colourpalettehint:`Zvolte barevnou paletu`,numfiles:`{{num}} souborů`,fileinfo:`Informace o souboru`,thermalfilename:`Název IR souboru`,thermalfileurl:`URL IR souboru`,thermalfiledownload:`Stáhnout IR soubor`,visiblefilename:`Název visible souboru`,visiblefileurl:`URL visible souboru`,visiblefiledownload:`Stáhnout visible obrázek`,togglevisibleimage:`Přepnout IR / VIS obraz`,time:`Čas`,duration:`Délka sekvence`,resolution:`Rozlišení`,bytesize:`Bytů`,minimaltemperature:`Minimální teplota`,maximaltemperature:`Maximální teplota`,filetype:`Typ souboru`,type:`Typ`,supporteddevices:`Kompatibilní zařízení`,download:`Stáhnout`,downloadoriginalfiles:`- jednotlivé soubory`,downloadoriginalfileshint:`Stáhnout jednotlivé zdrojové termogramy`,downloadoriginalfile:`- Původní IR soubor {{type}}`,exportcurrentframeaspng:`- Aktuální snímek`,convertentiresequencetovideo:`- Převést celou sekvenci do videa`,pngofindividualimages:`- jednotlivé soubory`,pngofindividualimageshint:`Exportovat všechny soubor po jednom, každý do samostatného obrázku.`,pngofentiregroup:`- skupina`,pngofentiregrouphint:`Exportovat celou skupinu do 1 obrázku.`,csvofanalysisdata:`- data analýz`,csvofanalysisdatahint:`Tabulka s teplotami v aktuálně nastavených analýzách`,exportimagewidth:`Šířka exportovaných obrázků`,exportimagefontsize:`Velikost písma v exportovaných obrázcích`,exportgroupname:`Název skupiny`,exportfilenames:`Názvy souborů`,exportdimensions:`Rozměry exportu`,exportgroup:`Export skupiny`,exportcontent:`Obsah exportu`,numberofcolumns:`Počet sloupců`,thermalscale:`Teplotní škála`,thermalrange:`Teplotní rozsah`,analyses:`Analýzy`,filedate:`File date`,folder:`Složka`,folders:`Složky`,range:`Rozsah`,info:`Info`,note:`Pozn.`,group:`Skupina`,donotgroup:`Neseskupovat`,groupby:`Seskupit {{era}}`,groupped:`seskupené`,showingfolder:`Zobrazuji složku`,showingfolders:`Zobrazuji složky`,and:`a`,or:`či`,doyouwanttoadd:`Chcete přidat ještě`,youmayalsoadd:`Můžete přidat ještě`,bydays:`po dnech`,byhours:`po hodinách`,byweeks:`po týdnech`,bymonths:`po měsících`,byyears:`po rocích`,play:`Přehrát`,pause:`Pozastavit`,stop:`Stop`,date:`Datum`,frame:`Snímek`,playbackspeed:`Rychlost přehrávání`,graphlines:`Čáry v grafu`,straightlines:`Přímé linie`,smoothlines:`Hladké linie`,graphlineshint:`'Hladké linie' mohou lépe ilustrovat trendy, ale jsou méně přesné. Potřebujete-li vidět přesně to, co v termogramu je, zvolte 'Přímé linie'.`,analysis:`Analýza`,avg:`PRŮM`,min:`MIN`,max:`MAX`,size:`Velikost`,edit:`Upravit`,editsth:`Upravit {{what}}`,remove:`Odstranit`,addpoint:`Přidat bod`,addellipsis:`Přidat elipsu`,addrectangle:`Přidat obdélník`,analysishint:`Vyznačte oblast v termogramu a zde uvidíte přehled jejích teplot.`,graph:`Graf`,graphhint1:`Nejprve přidejte analýzu!`,graphhint2:`Pro zobrazení grafu klikněte na <thermal-btn variant='background' interactive='false' tooltip='Najdete je v tabulce výše...'>hodnotu</thermal-btn> některé analýzy!`,rectangle:`obdélník`,ellipsis:`elipsu`,point:`bod`,name:`Název`,color:`Barva`,top:`Horní strana`,left:`Levá strana`,right:`Pravá strana`,bottom:`Spodní strana`,columns:`{{num}} souborů na řádku`,fromto:`Od {{from}} do {{to}}`,downloadgraphdataascsv:`Stáhnout data grafu jako CSV`,analysissync:`Synchronizovat analýzy`,apparenttemperature:`Pocitová teplota`,apparenttemperaturehint:`Tento převodník využívá model pocitové teploty <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.`,airtemperature:`Teplota vzduchu`,relativeairhumidity:`Relativní vlhkost vzduchu`,windspeed:`Rychlost větru`,inpercent:`v procentech`,apparenttemperatureverbose:`Na teploměru vidíte {{t}} °C, ale vlivem vlhkosti a větru se venku cítíte jako by bylo {{app}} °C.`,youfeelwarmer:`Pocitová teplota je o {{diff}} °C vyšší než teplota vzduchu.`,youfeelcolder:`Pocitová teplota je o {{diff}} °C nižší než teplota vzduchu.`,inspecttemperatures:`Prohlížet teploty`,usemousetoinspecttemperaturevalues:`S pomocí kurzoru prohlížejte teploty v termogramu.`,editanalysis:`Upravit analýzu`,dragcornersofselectedanalysis:`Klikněte a táhněte roh aktivní analýzy.`,addpointanalysis:`Přidat bodovou analýzu`,clickandaddpoint:`Klikněte na termogram a přidejte bodovou analýzu.`,addrectangleanalysis:`Přidat obdélníkovou analýzu`,clickandaddrectangle:`Klikněte a táhněte na termogramu pro přidání obdélníkové analýzy.`,addellipsisanalysis:`Přidat eliptickou analýzu`,clickandaddellipsis:`Klikněte a táhněte na termogramu pro přidání eliptické analýzy.`,tutorial:`Tutorial`,colourpalette:`Barevná paleta`,palettehint:`Rozbalovací nabídka pro přepínání barevné palety.`,remotefoldersbrowser:`Prohlížeč vzdálených složek`,server:`Server`,networklog:`Síťový záznam`,editfile:`Upravit soubor`,editfolder:`Upravit složku`,editcomment:`Upravit komentář`,user:`Uživatel`,griddisplay:`Zobrazit jako mřížku`,tabledisplay:`Zobrazit jako tabulku`,deletefile:`Smazat soubor`,deletefolder:`Smazat složku`,comments:`Komentáře`,deletecomment:`Smazat komentář`,savecomment:`Uložit komentář`,addcomment:`Přidat komentář`,nocomments:`Žádné komentáře`,savechanges:`Uložit změny`,uploadfile:`Nahrát soubor`,compactview:`Kompaktní zobrazení`,showdiscussion:`Zobrazit diskuzi`,edittags:`Upravit štítky`,availabletags:`Dostupné štítky`,assignedtags:`Přiřazené štítky`,connectioninformation:`Informace o připojení`,serverurl:`URL serveru`,servername:`Název serveru`,login:`Přihlášení`,logout:`Odhlášení`,password:`Heslo`,logoutmessage:`Opravdu se chcete odhlásit?`,loginerror:`Nelze se přihlásit.`,accessibletologgedinusers:`Tato stránka je přístupná pouze přihlášeným uživatelům.`,export:`Export`,exportvideo:`Exportovat video`,exportpng:`Exportovat obrázek`,exportdonotclosewindowhint:`Nezavírejte toto okno, soubor se stáhne automaticky.`,exportencodingfile:`Enkóduji video soubor...`,exportrecordingframes:`Zaznamenávám snímky...`,histogram:`Histogram`,timeline:`Časová osa`,exportwidth:`Šířka `,exportmargin:`Okraje`,exportgap:`Mezera`,exportgrahpheight:`Výška grafu`,videoquality:`Kvalita videa`,imagecompression:`Komprese obrázku`,theme:`Motiv`,light:`Světlý`,dark:`Tmavý`,foldermayhavefiles:`Složka pro soubory`,foldermayhavesubfolders:`Složka pro podsložky`}},cy:{translation:{moreoptions:`Mwy o opsiynau`,delete:`Dileu`,create:`Creu`,createfolder:`Creu ffolder`,createsubfolder:`Creu is-ffolder`,subfolder:`Is-ffolder`,display:`Arddangos`,syncanalyses:`Cydamseru dadansoddiadau`,uploadedby:`Wedi'i lwytho i fyny gan`,uploadeddat:`Wedi'i lwytho i fyny ar`,overviewofyourfolders:`Trosolwg o'ch ffolderi`,content:`Cynnwys`,palette:`Palet`,loading:`Llwytho`,config:`Gosodiadau`,temperature:`Tymheredd`,upload:`Llwytho i fyny`,uploadafile:`Llwytho ffeil i fyny`,selectfile:`Dewis ffeil`,addfiles:`Ychwanegu ffeil(iau)`,clear:`Clirio`,dragorselectfile:`Llusgwch ffeil LRC neu dewiswch hi o'r ddisg`,share:`Rhannu`,fileloadingerror:`Gwall wrth lwytho'r ffeil`,embedhint:`I fewnosod y bloc hwn mewn gwefan arall, defnyddiwch y cod canlynol:`,embedlibrary:`Mewnosodwch y llyfrgell – unwaith yn pennyn HTML`,embedcomponent:`Defnyddiwch y cod canlynol yn unrhyw le yn y corff HTML`,copy:`Copïo`,remotefoldersbrowseraddfolderhint:`Os ychwanegwch ffolder arall yn y gadwrfa, fe welwch opsiynau gwerthuso ychwanegol yma.`,analysissync:`Cydamseru dadansoddiadau`,file:`ffeil`,detail:`Manylder`,open:`Agor`,showeverything:`Dangos popeth`,layout_simple:`Cynllun syml`,layout_advanced:`Cynllun dadansoddi`,layout_nogui:`Dim GUI`,layout_lesson:`Cynllun gwers`,next:`Nesaf`,prev:`Blaenorol`,back:`Yn ôl`,close:`Cau`,reload:`Ail-lwytho`,description:`Disgrifiad`,author:`Awdur`,license:`Trwydded`,recordedat:`Wedi recordio yn`,displaysettings:`Gosodiadau arddangos`,filerendering:`Rendro ffeil`,pixelated:`Picselaidd`,smooth:`Llyfn`,filerenderinghint:`Mae modd 'Picselaidd' yn analluogi gwrth-alwio'r delwedd isgoch ac yn eich galluogi i weld ei bicseli fel ag y maent.`,adjusttimescale:`Graddfa tymheredd`,automaticrange:`Ystod awtomatig`,fullrange:`Ystod llawn`,adjusttimescalehint:`Addaswch yr ystod thermol yn awtomatig neu cyflewch yr ystod i fand lawn.`,palettename:`Palet {{name}}`,colourpalettehint:`Dewiswch balet lliw o arddangos thermol.`,fileinfo:`Gwybodaeth ffeil`,thermalfilename:`Enw ffeil isgoch`,thermalfileurl:`URL ffeil isgoch`,thermalfiledownload:`Lawrlwythwch y ffeil isgoch`,visiblefilename:`Enw ffeil weledol`,visiblefileurl:`URL ffeil weledol`,visiblefiledownload:`Lawrlwythwch y ffeil weledol`,togglevisibleimage:`Newid delwedd IR/VIS`,time:`Amser`,duration:`Hyd`,resolution:`Datrysiad`,bytesize:`Maint`,minimaltemperature:`Tymheredd lleiaf`,maximaltemperature:`Tymheredd uchaf`,filetype:`Math o ffeil`,type:`Math`,supporteddevices:`Dyfeisiau a gefnogir`,numfiles:`{{num}} ffeil`,download:`Lawrlwythwch`,downloadoriginalfiles:`- ffeiliau thermol wreiddiol unigol`,downloadoriginalfileshint:`Lawrlwythwch ffeiliau isgoch unigol.`,downloadoriginalfile:`- Ffeil thermol wreiddiol {{type}}`,exportcurrentframeaspng:`- Ffrâm gyfredol fel delwedd`,convertentiresequencetovideo:`- Trosi dilyniant cyfan i fideo`,pngofindividualimages:`- ffeiliau unigol`,pngofindividualimageshint:`Allforio pob ffeil yn unigol.`,pngofentiregroup:`- grwp`,pngofentiregrouphint:`Allforio'r grŵp cyfan fel un ddelwedd`,csvofanalysisdata:`- data dadansoddi`,csvofanalysisdatahint:`Tabl tymheredd mewn dadansoddiadau`,exportimagewidth:`Lled delwedd wedi'i hallforio`,exportimagefontsize:`Maint ffont delwedd wedi'i hallforio`,exportgroupname:`Enw'r grŵp allforio`,exportfilenames:`Enwau'r ffeiliau allforio`,exportdimensions:`Dimensiynau allforio`,exportgroup:`Allforio'r grŵp`,exportcontent:`Allforio'r cynnwys`,numberofcolumns:`Nifer y colofnau`,thermalscale:`Graddfa thermol`,thermalrange:`Ystod thermol`,analyses:`Dadansoddiadau`,filedate:`Dyddiad y ffeil`,folder:`Ffolder`,folders:`Ffolderi`,range:`Ystod`,info:`Gwybodaeth`,note:`Nodyn`,group:`Grwp`,donotgroup:`Peidiwch â grwpio`,groupby:`grwpio {{era}}`,groupped:`wedi'u cetegoreiddio`,showingfolder:`Yn dangos y ffolder`,showingfolders:`Yn dangos y ffolderi`,and:`a`,or:`neu`,doyouwanttoadd:`Ydych chi eisiau arddangos hefyd`,youmayalsoadd:`Gallwch hefyd ddangos`,bydays:`yn ôl dydd`,byhours:`yn ôl awr`,byweeks:`yn ôl wythnos`,bymonths:`yn ôl mis`,byyears:`yn ôl blwyddyn`,play:`Chwarae`,pause:`Oedwch`,stop:`Stopio`,date:`Dyddiad`,frame:`Ffrâm`,playbackspeed:`Cyflymder chwarae`,graphlines:`Llinellau graff`,straightlines:`Llinellau syth`,smoothlines:`Llinellau llyfn`,graphlineshint:`Gall 'llinellau llyfn' ddangos tueddiadau'n well, ond maent yn llai manwl gywir. Os oes angen i chi weld yn union beth sydd yn y lliw thermol, defnyddiwch 'Llinellau syth'.`,analysis:`Dadansoddi`,avg:`Cyfartaledd`,min:`Lleiaf`,max:`Uchafswm`,size:`Maint`,edit:`Golygu`,editsth:`Golygu {{what}}`,remove:`Dileu`,addpoint:`Addio pwynt`,addellipsis:`Addio elips`,addrectangle:`Addio petryal`,analysishint:`Gallwch ddewis ardal yn y ddelwedd IR i weld ei thymhereddau.`,graph:`Graff`,graphhint1:`Addio ddadansoddiad yn gyntaf i weld y graff!`,graphhint2:`Cliciwch ar <thermal-btn variant='background' interactive='false'  tooltip='Fe welwch nhw yn y tabl uchod...'>werth</thermal-btn> dadansoddiad i weld ei graff yma!`,rectangle:`petryal`,ellipsis:`elipsis`,point:`pwynt`,name:`Enw`,color:`Lliw`,top:`Ochr uchaf`,left:`Ochr chwith`,right:`Ochr dde`,bottom:`Ochr gwaelod`,columns:`{{num}} delwedd mewn rhes`,fromto:`O {{from}} i {{to}}`,downloadgraphdataascsv:`Lawrlwythwch data graff fel CSV`,apparenttemperature:`Tymheredd tebygol`,apparenttemperaturehint:`Mae'r trawsnewidydd hwn yn defnyddio'r model tymheredd tebygol <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.`,airtemperature:`Tymheredd aer`,relativeairhumidity:`Lleithder cymharol aer`,windspeed:`Cyflymder gwynt`,inpercent:`mewn canran`,apparenttemperatureverbose:`Mae'r thermomedr yn dangos {{t}} °C, ond oherwydd lleithder a gwynt, mae'n teimlo fel {{app}} °C y tu allan.`,youfeelwarmer:`Mae'r tymheredd teimladol yn {{diff}} °C yn uwch na thymheredd yr aer.`,youfeelcolder:`Mae'r tymheredd teimladol yn {{diff}} °C yn is na thymheredd yr aer.`,inspecttemperatures:`Archwilio'r tymheredd`,usemousetoinspecttemperaturevalues:`Defnyddiwch y llygoden i archwilio gwerthoedd tymheredd.`,editanalysis:`Golygu dadansoddiad`,dragcornersofselectedanalysis:`Llusgwch gorneli'r dadansoddiad a ddewiswyd.`,addpointanalysis:`Adio dadansoddiad pwynt`,clickandaddpoint:`Cliciwch ar y delwedd isgoch i ychwanegu dadansoddiad pwynt.`,addrectangleanalysis:`Adio dadansoddiad petryal`,clickandaddrectangle:`Cliciwch a dragiwuch ar y delwedd isgoch i ychwanegu dadansoddiad petryal.`,addellipsisanalysis:`Adio dadansoddiad eliptig`,clickandaddellipsis:`Cliciwch a dragiwuch ar y delwedd isgoch i ychwanegu dadansoddiad eliptig.`,tutorial:`Tiwtorial`,colourpalette:`Palet lliw`,palettehint:`Defnyddiwch y gwymplen i newid y palet.`,remotefoldersbrowser:`Porwr o ffolderi anghysbell`,server:`Gweinydd`,networklog:`Log rhwydwaith`,editfile:`Golygu ffeil`,editfolder:`Golygu ffolder`,editcomment:`Golygu sylw`,user:`Defnyddiwr`,griddisplay:`Dangos fel grid`,tabledisplay:`Dangos fel tabl`,deletefile:`Dileu ffeil`,deletefolder:`Dileu ffolder`,comments:`Sylwadau`,deletecomment:`Dileu sylw`,savecomment:`Cadw sylw`,addcomment:`Ychwanegu sylw`,nocomments:`Dim sylwadau`,savechanges:`Cadw newidiadau`,uploadfile:`Uwchlwytho ffeil`,compactview:`Golwg gryno`,showdiscussion:`Dangos trafodaeth`,edittags:`Golygu tagiau`,availabletags:`Tagiau ar gael`,assignedtags:`Tagiau a neilltuwyd`,connectioninformation:`Gwybodaeth cysylltiad`,serverurl:`URL y gweinydd`,servername:`Enw'r gweinydd`,login:`Mewngofnodi`,logout:`Allgofnodi`,password:`Cyfrinair`,logoutmessage:`Ydych chi’n siŵr eich bod eisiau allgofnodi?`,loginerror:`Methu mewngofnodi.`,accessibletologgedinusers:`Mae'r dudalen hon ar gael i ddefnyddwyr sydd wedi mewngofnodi yn unig.`,export:`Allforio`,exportvideo:`Allforio fideo`,exportpng:`Allforio delwedd`,exportdonotclosewindowhint:`Peidiwch â chau'r ffenestr hon, bydd y ffeil yn cael ei lawrlwytho'n awtomatig.`,exportencodingfile:`Wrthi'n amgodio'r ffeil fideo...`,exportrecordingframes:`Wrthi'n cofnodi fframiau...`,histogram:`Histogram`,timeline:`Llinell amser`,exportwidth:`Lled`,exportmargin:`Ymylon`,exportgap:`Bwlch`,exportgrahpheight:`Uchder y graff`,videoquality:`Ansawdd fideo`,imagecompression:`Cywasgu delwedd`,theme:`Thema`,light:`Golau`,dark:`Tywyll`,foldermayhavefiles:`Ffolder ar gyfer ffeiliau`,foldermayhavesubfolders:`Ffolder ar gyfer is-ffolderi`}},de:{translation:{moreoptions:`Mehr Optionen`,delete:`Löschen`,create:`Erstellen`,createfolder:`Einen Ordner erstellen`,createsubfolder:`Einen Unterordner erstellen`,subfolder:`Unterordner`,display:`Anzeige`,syncanalyses:`Analysen synchronisieren`,uploadedby:`Hochgeladen von`,uploadeddat:`Hochgeladen am`,overviewofyourfolders:`Übersicht Ihrer Ordner`,content:`Inhalt`,palette:`Palette`,loading:`Loading`,config:`Paramètres`,layout_simple:`Einfaches Layout`,layout_advanced:`Analyse-Layout`,layout_nogui:`Kein GUI`,layout_lesson:`Lektions-Layout`,share:`Teilen`,fileloadingerror:`Fehler beim Laden der Datei`,embedhint:`Um diesen Block in eine andere Website einzubetten, verwenden Sie den folgenden Code:`,embedlibrary:`Bibliothek einfügen – einmal im HTML-Head`,embedcomponent:`Verwenden Sie den folgenden Code überall im HTML-Body`,copy:`Kopieren`,remotefoldersbrowseraddfolderhint:`Wenn Sie einen weiteren Ordner im Repository hinzufügen, werden Ihnen hier zusätzliche Auswertungsmöglichkeiten angezeigt.`,temperature:`Temperatur`,upload:`Hochladen`,uploadafile:`Datei hochladen`,selectfile:`Datei auswählen`,addfiles:`Datei(en) hinzufügen`,clear:`Löschen`,dragorselectfile:`Ziehen Sie eine LRC-Datei hierher oder wählen Sie sie von der Festplatte aus`,analysissync:`Analysen synchronisieren`,file:`Datei`,detail:`Detail`,showeverything:`Alles anzeigen`,next:`Weiter`,prev:`Zurück`,back:`Zurück`,close:`Schließen`,reload:`Neu laden`,open:`Öffnen`,description:`Beschreibung`,author:`Autor`,license:`Lizenz`,recordedat:`Aufgenommen am`,displaysettings:`Anzeigeeinstellungen`,filerendering:`Thermogramm-Wiedergabe`,pixelated:`Pixelig`,smooth:`Glatt`,filerenderinghint:`Der Modus 'Pixelig' deaktiviert das Glätten und zeigt die Pixel des Thermogramms exakt so, wie sie sind.`,adjusttimescale:`Temperaturbereich`,automaticrange:`Automatischer Bereich`,fullrange:`Voller Bereich`,adjusttimescalehint:`Temperaturskala automatisch (häufigste Temperaturen im Histogramm) oder auf die minimalen und maximalen Temperaturen erweitern.`,palettename:`Palette {{name}}`,colourpalettehint:`Wählen Sie eine Farbpalette`,numfiles:`{{num}} Dateien`,fileinfo:`Dateiinformationen`,thermalfilename:`Name der IR-Datei`,thermalfileurl:`URL der IR-Datei`,thermalfiledownload:`IR-Datei herunterladen`,visiblefilename:`Name der sichtbaren Datei`,visiblefileurl:`URL der sichtbaren Datei`,visiblefiledownload:`Sichtbares Bild herunterladen`,togglevisibleimage:`IR/VIS-Bild umschalten`,time:`Zeit`,duration:`Sequenzdauer`,resolution:`Auflösung`,bytesize:`Bytes`,minimaltemperature:`Minimale Temperatur`,maximaltemperature:`Maximale Temperatur`,filetype:`Dateityp`,type:`Typ`,supporteddevices:`Kompatible Geräte`,download:`Herunterladen`,downloadoriginalfiles:`- Einzelne Dateien`,downloadoriginalfileshint:`Laden Sie alle Original-IR-Dateien herunter`,downloadoriginalfile:`- Original-IR-Datei {{type}}`,exportcurrentframeaspng:`- Aktuelles Bild`,convertentiresequencetovideo:`- Gesamte Sequenz in Video umwandeln`,pngofindividualimages:`- Einzelne Dateien`,pngofindividualimageshint:`Exportieren Sie jede Datei einzeln als Bild.`,pngofentiregroup:`- Gruppe`,pngofentiregrouphint:`Exportieren Sie die gesamte Gruppe in eine einzelne Datei.`,csvofanalysisdata:`- Analysedaten`,csvofanalysisdatahint:`Tabelle mit Temperaturen aus den aktuell festgelegten Analysen`,exportimagewidth:`Exportierte Bildbreite`,exportimagefontsize:`Exportierte Bildschriftgröße`,exportgroupname:`Exportgruppenname`,exportfilenames:`Dateinamen exportieren`,exportdimensions:`Exportabmessungen`,exportgroup:`Gruppe exportieren`,exportcontent:`Inhalt exportieren`,numberofcolumns:`Anzahl der Spalten`,thermalscale:`Thermische Skala`,thermalrange:`Temperaturbereich`,analyses:`Analysen`,filedate:`Dateidatum`,folder:`Ordner`,folders:`Ordner`,range:`Bereich`,info:`Info`,note:`Hinweis`,group:`Gruppe`,donotgroup:`Nicht gruppieren`,groupby:`Gruppieren nach {{era}}`,groupped:`grupiert`,showingfolder:`Ordner anzeigen`,showingfolders:`Ordner anzeigen`,and:`und`,or:`oder`,doyouwanttoadd:`Möchten Sie auch anzeigen`,youmayalsoadd:`Sie können auch anzeigen`,bydays:`nach Tagen`,byhours:`nach Stunden`,byweeks:`nach Wochen`,bymonths:`nach Monaten`,byyears:`nach Jahren`,play:`Abspielen`,pause:`Pause`,stop:`Stopp`,date:`Datum`,frame:`Bild`,playbackspeed:`Abspielgeschwindigkeit`,graphlines:`Grafiklinien`,straightlines:`Gerade Linien`,smoothlines:`Glatte Linien`,graphlineshint:`'Glatte Linien' können Trends besser darstellen, sind jedoch weniger präzise. Wenn Sie genau sehen möchten, was im Thermogramm ist, wählen Sie 'Gerade Linien'.`,analysis:`Analyse`,avg:`MITTL`,min:`MIN`,max:`MAX`,size:`Größe`,edit:`Bearbeiten`,editsth:`{{what}} bearbeiten`,remove:`Entfernen`,addpoint:`Punkt hinzufügen`,addellipsis:`Ellipse hinzufügen`,addrectangle:`Rechteck hinzufügen`,analysishint:`Markieren Sie einen Bereich im Thermogramm, um hier eine Übersicht seiner Temperaturen zu sehen.`,graph:`Grafik`,graphhint1:`Fügen Sie zuerst eine Analyse hinzu!`,graphhint2:`Klicken Sie auf einen <thermal-btn variant='background' interactive='false' tooltip='Sie finden sie in der obigen Tabelle...'>Wert</thermal-btn> einer Analyse, um hier die Grafik zu sehen!`,rectangle:`Rechteck`,ellipsis:`Ellipse`,point:`Punkt`,name:`Name`,color:`Farbe`,top:`Oben`,left:`Links`,right:`Rechts`,bottom:`Unten`,columns:`{{num}} Bilder in einer Reihe`,fromto:`Von {{from}} bis {{to}}`,downloadgraphdataascsv:`Grafikdaten als CSV herunterladen`,apparenttemperature:`Gefühlte Temperatur`,apparenttemperaturehint:`Dieser Konverter verwendet das Modell der gefühlten Temperatur <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.`,airtemperature:`Lufttemperatur`,relativeairhumidity:`Relative Luftfeuchtigkeit`,windspeed:`Windgeschwindigkeit`,inpercent:`in Prozent`,apparenttemperatureverbose:`Das Thermometer zeigt {{t}} °C, aber durch Feuchtigkeit und Wind fühlt es sich wie {{app}} °C an.`,youfeelwarmer:`Die gefühlte Temperatur ist {{diff}} °C höher als die Lufttemperatur.`,youfeelcolder:`Die gefühlte Temperatur ist {{diff}} °C niedriger als die Lufttemperatur.`,inspecttemperatures:`Temperaturen inspizieren`,usemousetoinspecttemperaturevalues:`Verwenden Sie die Maus, um Temperaturwerte zu inspizieren.`,editanalysis:`Analyse bearbeiten`,dragcornersofselectedanalysis:`Ziehen Sie die Ecken der ausgewählten Analyse.`,addpointanalysis:`Punktanalyse hinzufügen`,clickandaddpoint:`Klicken Sie auf das Thermogramm, um eine Punktanalyse hinzuzufügen.`,addrectangleanalysis:`Rechteckanalyse hinzufügen`,clickandaddrectangle:`Klicken und ziehen Sie auf dem Thermogramm, um eine Rechteckanalyse hinzuzufügen.`,addellipsisanalysis:`Elliptische Analyse hinzufügen`,clickandaddellipsis:`Klicken und ziehen Sie auf dem Thermogramm, um eine elliptische Analyse hinzuzufügen.`,tutorial:`Tutorial`,colourpalette:`Farbpalette`,palettehint:`Dropdown-Menü zum Wechseln der Farbpalette.`,remotefoldersbrowser:`Browser für Remote-Ordner`,server:`Server`,networklog:`Netzwerkprotokoll`,editfile:`Datei bearbeiten`,editfolder:`Ordner bearbeiten`,editcomment:`Kommentar bearbeiten`,user:`Benutzer`,griddisplay:`Als Raster anzeigen`,tabledisplay:`Als Tabelle anzeigen`,deletefile:`Datei löschen`,deletefolder:`Ordner löschen`,comments:`Kommentare`,deletecomment:`Kommentar löschen`,savecomment:`Kommentar speichern`,addcomment:`Kommentar hinzufügen`,nocomments:`Keine Kommentare`,savechanges:`Änderungen speichern`,uploadfile:`Datei hochladen`,compactview:`Kompaktansicht`,showdiscussion:`Diskussion anzeigen`,edittags:`Tags bearbeiten`,availabletags:`Verfügbare Tags`,assignedtags:`Zugewiesene Tags`,connectioninformation:`Verbindungsinformationen`,serverurl:`Server-URL`,servername:`Servername`,login:`Anmelden`,logout:`Abmelden`,password:`Passwort`,logoutmessage:`Möchten Sie sich wirklich abmelden?`,loginerror:`Anmeldung nicht möglich.`,accessibletologgedinusers:`Diese Seite ist nur für angemeldete Benutzer zugänglich.`,export:`Export`,exportvideo:`Video exportieren`,exportpng:`Bild exportieren`,exportdonotclosewindowhint:`Schließen Sie dieses Fenster nicht, die Datei wird automatisch heruntergeladen.`,exportencodingfile:`Videodatei wird kodiert...`,exportrecordingframes:`Frames werden aufgezeichnet...`,histogram:`Histogramm`,timeline:`Zeitleiste`,exportwidth:`Breite`,exportmargin:`Ränder`,exportgap:`Abstand`,exportgrahpheight:`Grafikhöhe`,videoquality:`Videoqualität`,imagecompression:`Bildkompression`,theme:`Design`,light:`Hell`,dark:`Dunkel`,foldermayhavefiles:`Ordner für Dateien`,foldermayhavesubfolders:`Ordner für Unterordner`}},en:{translation:{moreoptions:`More options`,delete:`Delete`,create:`Create`,createfolder:`Create a folder`,createsubfolder:`Create a subfolder`,subfolder:`Subfolder`,display:`Display`,syncanalyses:`Synchronise analyses`,uploadedby:`Uploaded by`,uploadeddat:`Uploaded at`,overviewofyourfolders:`Overview of your folders`,content:`Content`,palette:`Palette`,layout_simple:`Simple layout`,layout_advanced:`Evaluation layout`,layout_nogui:`No GUI`,layout_lesson:`Lesson layout`,share:`Share`,fileloadingerror:`File loading error`,embedhint:`To embed this block in another website, use the following code:`,embedlibrary:`Insert the library - once in HTML head`,embedcomponent:`Use the following code anywhere in HTML body`,copy:`Copy`,remotefoldersbrowseraddfolderhint:`If you add another folder in the storage, you will see additional evaluation options here.`,loading:`Loading`,config:`Settings`,temperature:`Temperature`,file:`File`,upload:`Upload`,uploadafile:`Upload a file`,selectfile:`Select a file`,addfiles:`Add file(s)`,clear:`Clear`,dragorselectfile:`Drag and drop an LRC file or select it from disk`,detail:`Detail`,showeverything:`Show everything`,next:`Next`,prev:`Previous`,back:`Back`,close:`Close`,reload:`Reload`,open:`Open`,description:`Description`,author:`Author`,license:`License`,recordedat:`Recorded at`,displaysettings:`Display settings`,filerendering:`File rendering`,pixelated:`Pixelated`,smooth:`Smooth`,filerenderinghint:`'Pixelated' mode disables antialising of the thermogram and enables you to see its pixels as they are.`,adjusttimescale:`Adjust temperature scale`,automaticrange:`Automatic range`,fullrange:`Full range`,adjusttimescalehint:`Adjust the time scale automatically (based on histogram) or set its values to the full range (min and max).`,palettename:`{{name}} palette`,colourpalettehint:`Select colour palette of thermal display.`,fileinfo:`File info`,thermalfilename:`IR file name`,thermalfileurl:`IR file URL`,thermalfiledownload:`Download the IR file`,visiblefilename:`Visual file name`,visiblefileurl:`Visual file URL`,visiblefiledownload:`Visual file download`,togglevisibleimage:`Switch IR / VIS image`,time:`Time`,duration:`Duration`,resolution:`Resolution`,bytesize:`Bytesize`,minimaltemperature:`Minimal temperature`,maximaltemperature:`Maximal temperature`,filetype:`File type`,type:`Type`,supporteddevices:`Supported devices`,numfiles:`{{num}} files`,download:`Download`,downloadoriginalfiles:`- individual files`,downloadoriginalfileshint:`Download all source IR files`,downloadoriginalfile:`- Original thermal file {{type}}`,exportcurrentframeaspng:`- Current frame`,convertentiresequencetovideo:`- Convert entire sequence to video`,pngofindividualimages:`- individual files`,pngofindividualimageshint:`Export all files individually.`,pngofentiregroup:`- group`,pngofentiregrouphint:`Export the entire group as one image`,csvofanalysisdata:`- analysis data`,csvofanalysisdatahint:`Table of temperatures in analyses`,exportimagewidth:`Exported image width`,exportimagefontsize:`Exported image font size`,exportgroupname:`Export group name`,exportfilenames:`Export file names`,exportdimensions:`Export dimensions`,exportgroup:`Export group`,exportcontent:`Export content`,numberofcolumns:`Number of columns`,thermalscale:`Thermal scale`,thermalrange:`Thermal range`,filedate:`File date`,folder:`Folder`,folders:`Folders`,range:`Range`,info:`Info`,note:`Note`,group:`Group`,donotgroup:`Do not group`,groupby:`Group {{era}}`,groupped:`groupped`,showingfolder:`Displaying the folder`,showingfolders:`Displaying folders`,and:`and`,or:`or`,doyouwanttoadd:`Do you want to diaplay also`,youmayalsoadd:`You may also display`,bydays:`by day`,byhours:`by hour`,byweeks:`by week`,bymonths:`by month`,byyears:`by year`,play:`Play`,pause:`Pause`,stop:`Stop`,date:`Date`,frame:`Frame`,playbackspeed:`Playback speed`,graphlines:`Graph lines`,straightlines:`Straight lines`,smoothlines:`Smooth lines`,graphlineshint:`'Smooth lines' can illustrate trends better, but are less precise. If you need to see exactly what is in the thermogram, use 'Straight lines'.`,analysis:`Analysis`,analyses:`Analyses`,avg:`AVG`,min:`MIN`,max:`MAX`,size:`Size`,edit:`Edit`,editsth:`Edit {{what}}`,remove:`Remove`,addpoint:`Add point`,addellipsis:`Add ellipsis`,addrectangle:`Add rectangle`,analysishint:`You may select area in the IR image to see its temperatures.`,graph:`Graph`,graphhint1:`Add analysis first to see the graph!`,graphhint2:`Click on an analysis <thermal-btn variant='background' interactive='false' tooltip='You can see them in the table above...'>value</thermal-btn> to see its graph here!`,rectangle:`rectangle`,ellipsis:`ellipsis`,point:`point`,name:`Name`,color:`Color`,top:`Top`,left:`Left`,right:`Right`,bottom:`Bottom`,columns:`{{num}} images in a row`,fromto:`From {{from}} to {{to}}`,downloadgraphdataascsv:`Download graph data as CSV`,apparenttemperature:`Apparent temperature`,apparenttemperaturehint:`This converter uses the apparent temperature model <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.`,airtemperature:`Air temperature`,relativeairhumidity:`Relative air humidity`,windspeed:`Wind speed`,inpercent:`in percent`,analysissync:`Synchronise analyses`,apparenttemperatureverbose:`The thermometer shows {{t}} °C, but due to humidity and wind, it feels like {{app}} °C outside.`,youfeelwarmer:`The apparent temperature is {{diff}} °C higher than the air temperature.`,youfeelcolder:`The apparent temperature is {{diff}} °C lower than the air temperature.`,inspecttemperatures:`Inspect temperatures`,usemousetoinspecttemperaturevalues:`Use mouse to inspect temperature values.`,editanalysis:`Edit analysis`,dragcornersofselectedanalysis:`Drag corners of any selected analysis.`,addpointanalysis:`Add a point analysis`,clickandaddpoint:`Click on the IR image to add a point analysis`,addrectangleanalysis:`Add a rectangular analysis`,clickandaddrectangle:`Click and drag on the IR image to add a rectangular analysis.`,addellipsisanalysis:`Add an elyptical analysis`,clickandaddellipsis:`Click and drag on the thermogram to add an elyptical analysis.`,tutorial:`Tutorial`,colourpalette:`Colour palette`,palettehint:`Use the menu to change the colour palette.`,remotefoldersbrowser:`Remote folders browser`,server:`Server`,networklog:`Network Log`,editfile:`Edit File`,editfolder:`Edit Folder`,editcomment:`Edit Comment`,user:`User`,griddisplay:`Grid display`,tabledisplay:`Table display`,deletefile:`Delete File`,deletefolder:`Delete Folder`,comments:`Comments`,deletecomment:`Delete Comment`,savecomment:`Save Comment`,addcomment:`Add Comment`,nocomments:`No comments`,savechanges:`Save Changes`,uploadfile:`Upload File`,compactview:`Compact View`,showdiscussion:`Show Discussion`,edittags:`Edit Tags`,availabletags:`Available Tags`,assignedtags:`Assigned Tags`,connectioninformation:`Connection Information`,serverurl:`Server URL`,servername:`Server Name`,login:`Login`,logout:`Logout`,password:`Password`,logoutmessage:`Are you sure you want to log out?`,loginerror:`Unable to log in.`,accessibletologgedinusers:`This page is accessible only to logged-in users.`,export:`Export`,exportvideo:`Export Video`,exportpng:`Export Image`,exportdonotclosewindowhint:`Do not close this window, the file will download automatically.`,exportencodingfile:`Encoding video file...`,exportrecordingframes:`Recording frames...`,histogram:`Histogram`,timeline:`Timeline`,exportwidth:`Width`,exportmargin:`Margins`,exportgap:`Gap`,exportgrahpheight:`Graph height`,videoquality:`Video quality`,imagecompression:`Image compression`,theme:`Theme`,light:`Light`,dark:`Dark`,foldermayhavefiles:`Folder for files`,foldermayhavesubfolders:`Folder for subfolders`}},fr:{translation:{moreoptions:`Plus d'options`,delete:`Supprimer`,create:`Créer`,createfolder:`Créer un dossier`,createsubfolder:`Créer un sous-dossier`,subfolder:`Sous-dossier`,display:`Affichage`,syncanalyses:`Synchroniser les analyses`,uploadedby:`Téléversé par`,uploadeddat:`Téléversé le`,overviewofyourfolders:`Aperçu de vos dossiers`,content:`Contenu`,palette:`Palette`,loading:`Chargement`,config:`Einstellungen`,temperature:`Temperature`,upload:`Téléverser`,uploadafile:`Téléverser un fichier`,selectfile:`Sélectionner un fichier`,addfiles:`Ajouter un/des fichier(s)`,clear:`Effacer`,dragorselectfile:`Glissez-déposez un fichier LRC ou sélectionnez-le depuis le disque`,share:`Partager`,fileloadingerror:`Erreur de chargement du fichier`,embedhint:`Pour intégrer ce bloc dans un autre site Web, utilisez le code suivant :`,embedlibrary:`Insérez la bibliothèque – une seule fois dans l'en-tête HTML`,embedcomponent:`Utilisez le code suivant n'importe où dans le corps HTML`,copy:`Copier`,remotefoldersbrowseraddfolderhint:`Si vous ajoutez un autre dossier dans le référentiel, vous verrez ici des options d'évaluation supplémentaires.`,file:`fichier`,detail:`Détail`,showeverything:`Montrer tout`,analysissync:`Synchroniser les analyses`,layout_simple:`Disposition simple`,layout_advanced:`Disposition d'analyse`,layout_nogui:`Pas d'interface graphique`,layout_lesson:`Disposition de leçon`,next:`Avancer`,prev:`Rétourner`,back:`Au derriére`,close:`Fermer`,reload:`Recharger`,open:`Ouvrir`,description:`Description`,author:`Auteur`,license:`License`,recordedat:`Enrégistré à`,displaysettings:`Paramètres d'affichage`,filerendering:`Rendu de l'image`,pixelated:`Pixelisé`,smooth:`Lisse`,filerenderinghint:`Le mode 'Pixelisé' désactives le anticrénelage de l'image et monttres les pixels tels qu'ils sont.`,adjusttimescale:`Ajuster l'échelle de température`,automaticrange:`Gamme automatique`,fullrange:`Gamme compléte`,adjusttimescalehint:`Ajustez l'échelle de temps automatiquement (en fonction de l'histogramme) ou définissez ses valeurs sur la plage complète (min et max).`,palettename:`Palette {{name}}`,colourpalettehint:`Sélectionnez la palette de couleurs de l'affichage thermique.`,fileinfo:`Informations sur le fichier`,thermalfilename:`Nom du fichier IR`,thermalfileurl:`URL du fichier IR`,thermalfiledownload:`Télécharger le fichier IR`,visiblefilename:`Nom de l'image visuel`,visiblefileurl:`URL de l'image visuel`,visiblefiledownload:`Télécharger l'image visuel`,togglevisibleimage:`Commuter l'image IR / VIS`,time:`Temps`,duration:`Durée`,resolution:`Résolution`,minimaltemperature:`Température minimale`,maximaltemperature:`Température maximale`,filetype:`Genre du fichier`,type:`Genre`,supporteddevices:`Appareils compatibles`,bytesize:`Taille en octets`,numfiles:`{{num}} fichiers`,download:`Télécharger`,downloadoriginalfiles:`- fichiers individuels`,downloadoriginalfileshint:`Téléchargez tous les fichiers IR sources`,downloadoriginalfile:`- Fichier thermique original {{type}}`,exportcurrentframeaspng:`- Cadre actuel en tant qu'image`,convertentiresequencetovideo:`- Convertir la séquence entière en vidéo`,pngofindividualimages:`- fichiers individuels`,pngofindividualimageshint:`Exporter tous les fichiers individuellement.`,pngofentiregroup:`- groupe`,pngofentiregrouphint:`Exporter l'ensemble du groupe sous forme d'une seule image`,csvofanalysisdata:`- données d'analyse`,csvofanalysisdatahint:`Tableau des températures dans les analyses`,exportimagewidth:`Largeur de l'image exportée`,exportimagefontsize:`Taille de la police de l'image exportée`,exportgroupname:`Nom du groupe exporté`,exportfilenames:`Noms de fichiers exportés`,exportdimensions:`Dimensions d'exportation`,exportgroup:`Exporter le groupe`,exportcontent:`Exporter le contenu`,numberofcolumns:`Nombre de colonnes`,thermalscale:`Échelle thermique`,thermalrange:`Plage thermique`,analyses:`Analyses`,filedate:`Date du fichier`,folder:`Dossier`,folders:`Dossiers`,range:`Gamme`,info:`Info`,note:`Note`,group:`Groupe`,donotgroup:`Ne pas groupper`,groupby:`Groupe {{era}}`,groupped:`groupés`,showingfolder:`Affichage du dossier`,showingfolders:`Affichage des dossiers`,and:`et`,or:`ou`,doyouwanttoadd:`Voulez-vous afficher aussi`,youmayalsoadd:`Vous pouvez afficher aussi`,bydays:`par jour`,byhours:`par heure`,byweeks:`par semaine`,bymonths:`par mois`,byyears:`par année`,play:`Lecture`,pause:`Pause`,stop:`Arrêter`,date:`Date`,frame:`Image`,playbackspeed:`Vitesse de lecture`,graphlines:`Lignes graphiques`,straightlines:`Lignes droites`,smoothlines:`Lignes lisses`,graphlineshint:`Les « lignes lisses » peuvent mieux illustrer les tendances, mais sont moins précises. Si vous avez besoin de voir exactement ce qui se trouve sur le thermogramme, utilisez « Lignes droites ».`,analysis:`Analyse`,avg:`AVG`,min:`MIN`,max:`MAX`,size:`Taille`,edit:`Modifier`,editsth:`Modifier {{what}}`,remove:`Retirer`,addpoint:`Ajouter un point`,addellipsis:`Ajouter une ellipse`,addrectangle:`Ajouter un rectangle`,analysishint:`Vous pouvez sélectionner une zone dans l'image IR pour voir ses températures.`,graph:`Graphique`,graphhint1:`Ajoutez d'abord une analyse pour voir le graphique !`,graphhint2:`Cliquez sur une <thermal-btn variant='background' interactive='false' tooltip='Vous pouvez les voir dans le tableau ci-dessus...'>valeur</thermal-btn> d'analyse pour voir son graphique ici !`,rectangle:`rectangle`,ellipsis:`ellipse`,point:`point`,name:`Nom`,color:`Couleur`,top:`Côté supérieure`,left:`Côté gauche`,right:`Côté droite`,bottom:`Côté inférieure`,columns:`{{num}} images par ligne`,fromto:`De {{from}} à {{to}}`,downloadgraphdataascsv:`Télécharger les données graphiques au format CSV`,apparenttemperature:`Température ressentie`,apparenttemperaturehint:`Ce convertisseur utilise le modèle de température ressentie <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.`,airtemperature:`Température de l'air`,relativeairhumidity:`Humidité relative de l'air`,windspeed:`Vitesse du vent`,inpercent:`en pourcentage`,apparenttemperatureverbose:`Le thermomètre indique {{t}} °C, mais en raison de l'humidité et du vent, la température ressentie est de {{app}} °C.`,youfeelwarmer:`La température ressentie est de {{diff}} °C supérieure à la température de l'air.`,youfeelcolder:`La température ressentie est de {{diff}} °C inférieure à la température de l'air.`,inspecttemperatures:`Inspecter les températures`,usemousetoinspecttemperaturevalues:`Utilisez la souris pour inspecter les valeurs de température.`,editanalysis:`Modifier l'analyse`,dragcornersofselectedanalysis:`Faites glisser les coins de l'analyse sélectionnée.`,addpointanalysis:`Ajouter une analyse de point`,clickandaddpoint:`Cliquez sur le thermogramme pour ajouter une analyse de point.`,addrectangleanalysis:`Ajouter une analyse rectangulaire`,clickandaddrectangle:`Cliquez et faites glisser sur le thermogramme pour ajouter une analyse rectangulaire.`,addellipsisanalysis:`Ajouter une analyse elliptique`,clickandaddellipsis:`Cliquez et faites glisser sur le thermogramme pour ajouter une analyse elliptique.`,tutorial:`Tutoriel`,colourpalette:`Palette`,palettehint:`Utilisez le menu pour changer le palette.`,remotefoldersbrowser:`Navigateur de dossiers distants`,server:`Serveur`,networklog:`Journal réseau`,editfile:`Modifier le fichier`,editfolder:`Modifier le dossier`,editcomment:`Modifier le commentaire`,user:`Utilisateur`,griddisplay:`Afficher en grille`,tabledisplay:`Afficher en tableau`,deletefile:`Supprimer le fichier`,deletefolder:`Supprimer le dossier`,comments:`Commentaires`,deletecomment:`Supprimer le commentaire`,savecomment:`Enregistrer le commentaire`,addcomment:`Ajouter un commentaire`,nocomments:`Aucun commentaire`,savechanges:`Enregistrer les modifications`,uploadfile:`Téléverser un fichier`,compactview:`Vue compacte`,showdiscussion:`Afficher la discussion`,edittags:`Modifier les tags`,assignedtags:`Tags assignés`,availabletags:`Tags disponibles`,connectioninformation:`Informations de connexion`,serverurl:`URL du serveur`,servername:`Nom du serveur`,login:`Connexion`,logout:`Déconnexion`,password:`Mot de passe`,logoutmessage:`Êtes-vous sûr de vouloir vous déconnecter ?`,loginerror:`Impossible de se connecter.`,accessibletologgedinusers:`Cette page est accessible uniquement aux utilisateurs connectés.`,export:`Exporter`,exportvideo:`Exporter la vidéo`,exportpng:`Exporter l'image`,exportdonotclosewindowhint:`Ne fermez pas cette fenêtre, le fichier sera téléchargé automatiquement.`,exportencodingfile:`Encodage du fichier vidéo...`,exportrecordingframes:`Enregistrement des images...`,histogram:`Histogramme`,timeline:`Chronologie`,exportwidth:`Largeur`,exportmargin:`Marges`,exportgap:`Espace`,exportgrahpheight:`Hauteur du graphique`,videoquality:`Qualité vidéo`,imagecompression:`Compression d'image`,theme:`Thème`,light:`Clair`,dark:`Sombre`,foldermayhavefiles:`Dossier pour les fichiers`,foldermayhavesubfolders:`Dossier pour les sous-dossiers`}}}}),window.i18next=M;var Ds=`1.3.4`;window.matchMedia(`(prefers-color-scheme: dark)`),Ds.toString().replaceAll(`.`,`-`);var Os=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};function P(e){return e}var ks=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&=(this.unsubscribe(),void 0)}dispatchRequest(){this.host.dispatchEvent(new Os(this.context,this.host,this.t,this.subscribe))}},As=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},js=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},F=class extends As{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new Os(this.context,n,e,!0)));e.stopPropagation()},this.host=e,this.context=t.context===void 0?t:t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new js(this.context,this.host))}};function Ms({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new F(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer((t=>{r.set(t,new F(t,{context:e}))}));let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}Object.defineProperty(t,n,a);return}}}function I({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer((function(){new ks(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})})):n.constructor.addInitializer((n=>{new ks(n,{context:e,callback:e=>{n[r]=e},subscribe:t})}))}}var Ns=class extends Bo{constructor(e){if(super(e),this.it=A,e.type!==Ro.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===A||e==null)return this._t=void 0,this.it=e;if(e===oa)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Ns.directiveName=`unsafeHTML`,Ns.resultType=1;var Ps=zo(Ns),Fs=class extends Ns{};Fs.directiveName=`unsafeSVG`,Fs.resultType=2;var Is=zo(Fs),L=function(e){return e.moreoptions=`moreoptions`,e.loading=`loading`,e.config=`config`,e.temperature=`temperature`,e.upload=`upload`,e.uploadafile=`uploadafile`,e.selectfile=`selectfile`,e.addfiles=`addfiles`,e.clear=`clear`,e.dragorselectfile=`dragorselectfile`,e.share=`share`,e.fileloadingerror=`fileloadingerror`,e.embedhint=`embedhint`,e.embedlibrary=`embedlibrary`,e.embedcomponent=`embedcomponent`,e.copy=`copy`,e.create=`create`,e.remotefoldersbrowseraddfolderhint=`remotefoldersbrowseraddfolderhint`,e.file=`file`,e.layout_simple=`layout_simple`,e.layout_advanced=`layout_advanced`,e.layout_nogui=`layout_nogui`,e.layout_lesson=`layout_lesson`,e.next=`next`,e.prev=`prev`,e.back=`back`,e.close=`close`,e.open=`open`,e.detail=`detail`,e.showeverything=`showeverything`,e.palette=`palette`,e.description=`description`,e.author=`author`,e.license=`license`,e.recordedat=`recordedat`,e.displaysettings=`displaysettings`,e.filerendering=`filerendering`,e.pixelated=`pixelated`,e.smooth=`smooth`,e.filerenderinghint=`filerenderinghint`,e.adjusttimescale=`adjusttimescale`,e.automaticrange=`automaticrange`,e.fullrange=`fullrange`,e.adjusttimescalehint=`adjusttimescalehint`,e.colourpalettehint=`colourpalettehint`,e.palettename=`palettename`,e.fileinfo=`fileinfo`,e.thermalfilename=`thermalfilename`,e.thermalfileurl=`thermalfileurl`,e.thermalfiledownload=`thermalfiledownload`,e.visiblefilename=`visiblefilename`,e.visiblefileurl=`visiblefileurl`,e.visiblefiledownload=`visiblefiledownload`,e.togglevisibleimage=`togglevisibleimage`,e.time=`time`,e.duration=`duration`,e.resolution=`resolution`,e.bytesize=`bytesize`,e.minimaltemperature=`minimaltemperature`,e.maximaltemperature=`maximaltemperature`,e.filetype=`filetype`,e.type=`type`,e.supporteddevices=`supporteddevices`,e.numfiles=`numfiles`,e.download=`download`,e.downloadoriginalfiles=`downloadoriginalfiles`,e.downloadoriginalfileshint=`downloadoriginalfileshint`,e.downloadoriginalfile=`downloadoriginalfile`,e.exportcurrentframeaspng=`exportcurrentframeaspng`,e.convertentiresequencetovideo=`convertentiresequencetovideo`,e.pngofindividualimages=`pngofindividualimages`,e.pngofindividualimageshint=`pngofindividualimageshint`,e.pngofentiregroup=`pngofentiregroup`,e.pngofentiregrouphint=`pngofentiregrouphint`,e.csvofanalysisdata=`csvofanalysisdata`,e.csvofanalysisdatahint=`csvofanalysisdatahint`,e.exportimagewidth=`exportimagewidth`,e.exportimagefontsize=`exportimagefontsize`,e.exportgroupname=`exportgroupname`,e.exportfilenames=`exportfilenames`,e.numberofcolumns=`numberofcolumns`,e.exportdimensions=`exportdimensions`,e.exportgroup=`exportgroup`,e.thermalscale=`thermalscale`,e.thermalrange=`thermalrange`,e.filedate=`filedate`,e.folder=`folder`,e.folders=`folders`,e.showingfolder=`showingfolder`,e.showingfolders=`showingfolders`,e.and=`and`,e.or=`or`,e.doyouwanttoadd=`doyouwanttoadd`,e.youmayalsoadd=`youmayalsoadd`,e.range=`range`,e.info=`info`,e.note=`note`,e.group=`group`,e.donotgroup=`donotgroup`,e.groupby=`groupby`,e.groupped=`groupped`,e.bydays=`bydays`,e.byhours=`byhours`,e.byweeks=`byweeks`,e.bymonths=`bymonths`,e.byyears=`byyears`,e.play=`play`,e.pause=`pause`,e.stop=`stop`,e.date=`date`,e.frame=`frame`,e.playbackspeed=`playbackspeed`,e.graphlines=`graphlines`,e.straightlines=`straightlines`,e.smoothlines=`smoothlines`,e.graphlineshint=`graphlineshint`,e.reload=`reload`,e.analysis=`analysis`,e.analyses=`analyses`,e.avg=`avg`,e.min=`min`,e.max=`max`,e.size=`size`,e.edit=`edit`,e.editsth=`editsth`,e.remove=`remove`,e.addpoint=`addpoint`,e.addrectangle=`addrectangle`,e.addellipsis=`addellipsis`,e.analysishint=`analysishint`,e.graph=`graph`,e.graphhint1=`graphhint1`,e.graphhint2=`graphhint2`,e.rectangle=`rectangle`,e.ellipsis=`ellipsis`,e.point=`point`,e.name=`name`,e.color=`color`,e.top=`top`,e.left=`left`,e.right=`right`,e.bottom=`bottom`,e.columns=`columns`,e.fromto=`fromto`,e.downloadgraphdataascsv=`downloadgraphdataascsv`,e.apparenttemperature=`apparenttemperature`,e.airtemperature=`airtemperature`,e.relativeairhumidity=`relativeairhumidity`,e.windspeed=`windspeed`,e.inpercent=`inpercent`,e.apparenttemperatureverbose=`apparenttemperatureverbose`,e.youfeelwarmer=`youfeelwarmer`,e.youfeelcolder=`youfeelcolder`,e.apparenttemperaturehint=`apparenttemperaturehint`,e.analysissync=`analysissync`,e.inspecttemperatures=`inspecttemperatures`,e.usemousetoinspecttemperaturevalues=`usemousetoinspecttemperaturevalues`,e.editanalysis=`editanalysis`,e.dragcornersofselectedanalysis=`dragcornersofselectedanalysis`,e.addpointanalysis=`addpointanalysis`,e.clickandaddpoint=`clickandaddpoint`,e.addrectangleanalysis=`addrectangleanalysis`,e.clickandaddrectangle=`clickandaddrectangle`,e.addellipsisanalysis=`addellipsisanalysis`,e.clickandaddellipsis=`clickandaddellipsis`,e.tutorial=`tutorial`,e.colourpalette=`colourpalette`,e.palettehint=`palettehint`,e.remotefoldersbrowser=`remotefoldersbrowser`,e.server=`server`,e.networklog=`networklog`,e.editfile=`editfile`,e.editfolder=`editfolder`,e.editcomment=`editcomment`,e.user=`user`,e.griddisplay=`griddisplay`,e.tabledisplay=`tabledisplay`,e.deletefile=`deletefile`,e.deletefolder=`deletefolder`,e.comments=`comments`,e.deletecomment=`deletecomment`,e.savecomment=`savecomment`,e.addcomment=`addcomment`,e.nocomments=`nocomments`,e.savechanges=`savechanges`,e.uploadfile=`uploadfile`,e.compactview=`compactview`,e.showdiscussion=`showdiscussion`,e.edittags=`edittags`,e.assignedtags=`assignedtags`,e.availabletags=`availabletags`,e.connectioninformation=`connectioninformation`,e.serverurl=`serverurl`,e.servername=`servername`,e.login=`login`,e.logout=`logout`,e.logoutmessage=`logoutmessage`,e.loginerror=`logineerror`,e.password=`password`,e.accessibletologgedinusers=`accessibletologgedinusers`,e.display=`display`,e.content=`content`,e.syncanalyses=`syncanalyses`,e.overviewofyourfolders=`overviewofyourfolders`,e.uploadedby=`uploadedby`,e.uploadeddat=`uploadeddat`,e.createfolder=`createfolder`,e.subfolder=`subfolder`,e.createsubfolder=`createsubfolder`,e.delete=`delete`,e.export=`export`,e.exportcontent=`exportcontent`,e.histogram=`histogram`,e.timeline=`timeline`,e.exportwidth=`exportwidth`,e.exportmargin=`exportmargin`,e.exportgap=`exportgap`,e.exportgrahpheight=`exportgrahpheight`,e.imagecompression=`imagecompression`,e.videoquality=`videoquality`,e.exportvideo=`exportvideo`,e.exportpng=`exportpng`,e.exportrecordingframes=`exportrecordingframes`,e.exportencodingfile=`exportencodingfile`,e.exportdonotclosewindowhint=`exportdonotclosewindowhint`,e.theme=`theme`,e.light=`light`,e.dark=`dark`,e.foldermayhavefiles=`foldermayhavefiles`,e.foldermayhavesubfolders=`foldermayhavesubfolders`,e}({}),Ls=Object.fromEntries([{code:`cs`,name:`Čeština`,flag:`🇨🇿`},{code:`cy`,name:`Cymraeg`,flag:`🏴󠁧󠁢󠁷󠁬󠁳󠁿`,disabled:!0},{code:`de`,name:`Deutsch`,flag:`🇩🇪`},{code:`en`,name:`English`,flag:`🇬🇧`},{code:`fr`,name:`Français`,flag:`🇫🇷`}].map(e=>[e.code,e])),Rs=P(`localeContext`),zs=e=>{M.on(`languageChanged`,t=>{e.locale=t}),e.locale===void 0?e.locale=M.language:M.changeLanguage(e.locale)},Bs={cs:[`cs`,`cz`,`cs_CZ`,`cs_CS`],fr:[`fr`,`fr_FR`,`fr_CA`],de:[`de`,`de_DE`,`de_AT`,`de_CH`],cy:[`cy`,`cy_GB`,`cy`],en:[`en`,`en_US`,`en_GB`,`en_CA`,`en_AU`,`en_NZ`,`en_IE`,`en_ZA`]},Vs={fromAttribute:e=>{let t,n=0;for(;n<Object.keys(Bs).length&&t===void 0;){let r=Object.keys(Bs)[n];Bs[r].includes(e)&&(t=r),n++}return t??`en`},toAttribute:e=>e},Hs=`abcdefghijklmnopqrstuvwxyz0123456789`,Us=8,Ws=new Set,Gs=e=>{let t=typeof globalThis<`u`?globalThis.crypto:void 0;if(t&&typeof t.getRandomValues==`function`)return t.getRandomValues(e),e;for(let t=0;t<e.length;t++)e[t]=Math.floor(Math.random()*256);return e},Ks=e=>{let t=Gs(new Uint8Array(e)),n=``;for(let r=0;r<e;r++)n+=Hs[t[r]%36];return n},qs=(e=Us)=>{let t=Math.max(1,Math.floor(e)),n=0;for(;;){let e=Ks(t);if(!Ws.has(e))return Ws.add(e),e;n++,n%5==0&&t++}},Js=class{constructor(){this._controllers=[]}register(e){return this._controllers.push(e),e}willUpdate(e){for(let t of this._controllers)t.hostWillUpdateWatcher?.(e)}updated(e){for(let t of this._controllers)t.hostUpdatedWatcher?.(e)}};function R(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var z=class extends wa{constructor(...e){super(...e),this.languageChanged=e=>{this._locale=e}}initHierarchy(){return this._hierarchy||=new Js,this._hierarchy}get UUID(){return this._UUID===void 0&&(this._UUID=qs()),this._UUID}getUUID(e){return this.UUID+`_`+e}log(...e){console.log(this.tagName,this.UUID,...e)}static{this.shadowRootOptions={...wa.shadowRootOptions,mode:`open`}}connectedCallback(){super.connectedCallback(),this._locale=M.language,M.on(`languageChanged`,this.languageChanged)}disconnectedCallback(){M.off(`languageChanged`,this.languageChanged),super.disconnectedCallback()}i(e){return k`${Is(e)}`}t(e){return N(L[e])}willUpdate(e){super.willUpdate?.(e),this._hierarchy?.willUpdate(e)}updated(e){super.updated?.(e),this._hierarchy?.updated(e)}};R([I({context:Rs,subscribe:!0})],z.prototype,`_locale`,void 0);var Ys=class{constructor(e){this.host=e,e.addController(this)}log(...e){this.host.log(this.constructor.name,...e)}},Xs={reflect:!1,state:!0},Zs=class extends Ys{constructor(e){super(e),this.host.initHierarchy().register(this)}_getDefaultSlugFromHost(e){return this.host.getAttribute(e)??this.host.getAttribute(`slug`)??this.UUID}},Qs=class e{static normalize(e){return e?.trim()||void 0}get _attributeValue(){return this._controller.host[this._attribute]}set _attributeValue(e){e!==this._controller.host[this._attribute]&&(this._controller.host[this._attribute]=e)}get _mountKey(){return`${this._controller.UUID}_slot_${this._slotNumber}`}get _internalSerialized(){return this._slotObject?.serialized}get _slotObject(){return this._fileObject?.slots.getSlot(this._slotNumber)}constructor(e,t){this._controller=e,this._slotNumber=t,this._attribute=`analysis${this._slotNumber}`}fileAssigned(t,n=!1){this._fileObject=t,t.slots.getOnSerializeManager(this._slotNumber)?.set(this._controller.UUID,e=>{e!==this._attributeValue&&(this._attributeValue=e)});let r=()=>{let t=e.normalize(this._attributeValue);n||t===void 0?this._attributeValue=this._slotObject?.serialized:this._applyToCore(t)};t.dom?.built?r():t.onMount.set(this._mountKey,()=>{r()})}fileUnassigned(){this._fileObject?.slots.getOnSerializeManager(this._slotNumber)?.delete(this._controller.UUID),this._fileObject?.onMount.delete(this._mountKey),this._fileObject=void 0}handleHostUpdate(t){if(t.has(this._attribute)){let t=e.normalize(this._attributeValue);this._internalSerialized!==t&&this._fileObject?.dom?.built&&this._applyToCore(t)}}_applyToCore(e){let t=this._fileObject;if(!t)return;let n=this._slotObject;if(e===void 0)n&&t.slots.removeSlotAndAnalysis(this._slotNumber);else if(n){n.recieveSerialized(e);let r=t.dom?.canvasLayer?.getLayerRoot();r&&!r.contains(n.analysis.layerRoot)&&r.appendChild(n.analysis.layerRoot)}else t.slots.createAnalysisFromSerialized(e,this._slotNumber)?.setSelected()}},$s=class{constructor(e){this._controller=e,this._synchronisators=[];for(let e=1;e<=7;e++)this._synchronisators.push(new Qs(this._controller,e))}_forEach(e){for(let t of this._synchronisators)e(t)}handleHostUpdate(e){this._forEach(t=>t.handleHostUpdate(e))}handleFileAssigned(e,t=!1){this._forEach(n=>n.fileAssigned(e,t))}handleFileUnassigned(){this._forEach(e=>e.fileUnassigned())}},ec=P(`file-controller-context`),tc=P(`file-object-context`),nc=P(`file-failure-object`),rc=P(`file-loading`),ic=P(`file-ready-context`),ac=P(`file-ms-context`),oc=P(`file-time-cursor`),sc=P(`file-current-frame-context`),cc=P(`file-duration-context`),lc=P(`file-playing-context`),uc=P(`file-playback-speed`),dc=P(`file-is-recording-state`),fc=P(`file-may-stop-state`),pc=P(`file-analysis-list`),mc={type:String,reflect:!0},hc=class extends Zs{get UUID(){return this._UUID}static{this.HOST_PROPERTIES={managerController:Xs,registryController:Xs,groupController:Xs,fileController:Xs,file:Xs,failure:Xs,loading:Xs,ms:{type:Number,reflect:!0,attribute:`ms`},playbackSpeed:{type:Number,reflect:!0,attribute:`speed`},analysis1:mc,analysis2:mc,analysis3:mc,analysis4:mc,analysis5:mc,analysis6:mc,analysis7:mc,autoHighlight:{type:Boolean,reflect:!0,attribute:`autohighlight`}}}get fileObject(){return this.host.file}get failure(){return this.host.failure}get ms(){return this.host.ms}get playbackSpeed(){return this.host.playbackSpeed}get analysis1(){return this.host.analysis1}get analysis2(){return this.host.analysis2}get analysis3(){return this.host.analysis3}get analysis4(){return this.host.analysis4}get analysis5(){return this.host.analysis5}get analysis6(){return this.host.analysis6}get analysis7(){return this.host.analysis7}get autoHighlight(){return this.host.autoHighlight}get ready(){return this.readyContextProvider.value}get recording(){return this.fileRecordingContextProvider.value}get playing(){return this.filePlayingContextProvider.value}get mayStop(){return this.fileMayStopContextProvider.value}get cursor(){return this.fileCursorContextProvider.value}get currentFrame(){return this.fileCurrentFrameContextProvider.value}get analyses(){return this.fileAnalysesContextProvider.value}get duration(){return this.fileDurationContextProvider.value}constructor(e){super(e),this.onLoadingStart=new D,this.onSuccess=new D,this.onFailure=new D,this._analysisSynchronisators=new $s(this),this._UUID=e.UUID+`_file-controller`,this.fileControllerContextProvider=new F(this.host,{context:ec,initialValue:this}),this.fileContextProvider=new F(this.host,{context:tc}),this.fileFailureContextProvider=new F(this.host,{context:nc}),this.loadingContextProvider=new F(this.host,{context:rc,initialValue:!1}),this.readyContextProvider=new F(this.host,{context:ic,initialValue:!1}),this.fileDurationContextProvider=new F(this.host,{context:cc}),this.fileCurrentFrameContextProvider=new F(this.host,{context:sc}),this.fileCursorContextProvider=new F(this.host,{context:oc}),this.fileMsContextProvider=new F(this.host,{context:ac}),this.filePlaybackSpeedContextProvider=new F(this.host,{context:uc}),this.filePlayingContextProvider=new F(this.host,{context:lc}),this.fileRecordingContextProvider=new F(this.host,{context:dc}),this.fileMayStopContextProvider=new F(this.host,{context:fc}),this.fileAnalysesContextProvider=new F(this.host,{context:pc,initialValue:[]}),this._propagateHighlightCache=()=>this._propagateHighlight(),this._unpropagateHighlightCache=()=>this._unpropagateHighlight()}hostConnected(){this.host.addEventListener(`mouseenter`,this._propagateHighlightCache),this.host.addEventListener(`focus`,this._propagateHighlightCache),this.host.addEventListener(`mouseleave`,this._unpropagateHighlightCache),this.host.addEventListener(`blur`,this._unpropagateHighlightCache),this._attached&&(this._propagateContexts(this._attached),this._bindListeners(this._attached,!0))}hostDisconnected(){this.host.removeEventListener(`mouseenter`,this._propagateHighlightCache),this.host.removeEventListener(`focus`,this._propagateHighlightCache),this.host.removeEventListener(`mouseleave`,this._unpropagateHighlightCache),this.host.removeEventListener(`blur`,this._unpropagateHighlightCache),this._unpropagateHighlight(),this._attached&&this._unbindListeners(this._attached)}hostWillUpdateWatcher(e){e.has(`file`)&&this._syncAssignment(),this._analysisSynchronisators.handleHostUpdate(e),e.has(`ms`)&&this.setMs(this.host.ms),e.has(`playbackSpeed`)&&this.host.file&&this.host.file.timeline.isSequence&&this.host.playbackSpeed!==this.host.file.timeline.playbackSpeed&&(this.host.file.timeline.playbackSpeed=this.host.playbackSpeed)}hostUpdatedWatcher(){}_propagateContexts(e){this.fileContextProvider.setValue(e),this.readyContextProvider.setValue(!0),this.fileDurationContextProvider.setValue({ms:e.timeline.duration,time:e.timeline.formatDuration(e.timeline.duration)}),this._propagateInstanceCurrentFrame(e),this._propagateInstanceAnalysesArray(e),this.fileMsContextProvider.setValue(e.timeline.currentMs),this.filePlaybackSpeedContextProvider.setValue(e.timeline.playbackSpeed),this.filePlayingContextProvider.setValue(e.timeline.isPlaying),this.fileMayStopContextProvider.setValue(e.recording.mayStop),this.fileRecordingContextProvider.setValue(e.recording.value)}_resetAllContexts(){this.readyContextProvider.setValue(!1),this.fileDurationContextProvider.setValue(void 0),this.fileCurrentFrameContextProvider.setValue(void 0),this.fileAnalysesContextProvider.setValue([]),this.fileContextProvider.setValue(void 0),this.fileRecordingContextProvider.setValue(!1),this.filePlayingContextProvider.setValue(!1),this.fileMayStopContextProvider.setValue(!0),this.fileMsContextProvider.setValue(0),this.fileCursorContextProvider.setValue(void 0)}_syncAssignment(){let e=this.host.file;if(e===this._attached)return;let t=this._attached;t&&this._detach(t),e?this._attach(e,t!==void 0):(this._resetAllContexts(),this.host.ms=0)}_attach(e,t){this._attached=e,this.fileContextProvider.setValue(e),this.host.failure=void 0,this.fileFailureContextProvider.setValue(void 0),this.host.playbackSpeed!==void 0&&(e.timeline.playbackSpeed=this.host.playbackSpeed),this._propagateContexts(e),this._bindListeners(e),!t&&this.host.ms>0&&e.timeline.isSequence?this.setMs(this.host.ms):this.host.ms=e.timeline.currentMs,this.setLoading(!1),this.onSuccess.call(e)}_detach(e){this._unbindListeners(e),this._unpropagateHighlight(),this._attached=void 0,e.unmountFromDom()}_bindListeners(e,t=!1){e.timeline.callbacksPlay.set(this.UUID,()=>{this.filePlayingContextProvider.setValue(!0)}),e.timeline.callbacksPause.set(this.UUID,()=>{this.filePlayingContextProvider.setValue(!1)}),e.timeline.callbacksStop?.set(this.UUID,()=>{this.filePlayingContextProvider.setValue(!1)}),e.timeline.callbacksEnd?.set(this.UUID,()=>{this.filePlayingContextProvider.setValue(!1)}),e.timeline.callbacksChangeFrame.set(this.UUID,t=>{let n={ms:t.relative,time:e.timeline.currentTime,percentage:e.timeline.currentPercentage,index:t.index,absolute:t.absolute};this.fileCurrentFrameContextProvider.setValue(n),this.host.ms=t.relative,this.fileMsContextProvider.setValue(t.relative)}),e.timeline.callbackdPlaybackSpeed.set(this.UUID,e=>{this.host.playbackSpeed=e,this.filePlaybackSpeedContextProvider.setValue(e)}),e.recording.callbackMayStop.set(this.UUID,e=>{this.fileMayStopContextProvider.setValue(e)}),e.recording.addListener(this.UUID,e=>{this.fileRecordingContextProvider.setValue(e)}),e.analysis.addListener(this.UUID,e=>{this.fileAnalysesContextProvider.setValue(e)}),this._analysisSynchronisators.handleFileAssigned(e,t)}_unbindListeners(e){e.timeline.callbacksPlay.delete(this.UUID),e.timeline.callbacksPause.delete(this.UUID),e.timeline.callbacksStop.delete(this.UUID),e.timeline.callbacksEnd.delete(this.UUID),e.timeline.callbacksChangeFrame.delete(this.UUID),e.timeline.callbackdPlaybackSpeed.delete(this.UUID),e.recording.removeListener(this.UUID),e.recording.callbackMayStop?.delete(this.UUID),e.analysis.removeListener(this.UUID),this._analysisSynchronisators.handleFileUnassigned()}receiveInstance(e){this.host.file=e,this._syncAssignment(),this.setLoading(!1)}removeInstance(){this.host.file=void 0,this._syncAssignment(),this.setLoading(!1)}receiveFailure(e){this.removeInstance(),this.host.failure=e,this.fileFailureContextProvider.setValue(e),this.setLoading(!1),this.onFailure.call(e)}_propagateInstanceCurrentFrame(e){this.fileCurrentFrameContextProvider.setValue({ms:e.timeline.currentMs,time:e.timeline.currentTime,percentage:e.timeline.currentPercentage,index:e.timeline.currentStep.index,absolute:e.timeline.currentStep.absolute})}_propagateInstanceAnalysesArray(e){this.fileAnalysesContextProvider.setValue(e.analysis.layers.all)}setTimeCursorPercentage(e){if(e!==void 0&&!Number.isFinite(e))return;let t=e===void 0?void 0:Math.max(0,Math.min(e,100));t!==this.fileCursorContextProvider.value&&this.fileCursorContextProvider.setValue(t)}setTimePercentage(e){let t=this._attached;if(!t?.timeline.isSequence)return;let n=Math.max(0,Math.min(e,100));n!==t.timeline.currentPercentage&&t.timeline.setValueByPercent(n)}play(){this._attached?.timeline.play()}stop(){this._attached?.timeline.stop()}pause(){this._attached?.timeline.pause()}setMs(e){let t=this._attached;if(!t?.timeline.isSequence)return;let n=Math.max(0,Math.min(e,t.timeline.duration));n!==t.timeline.currentMs&&t.timeline.setRelativeTime(n)}_propagateHighlight(){this.autoHighlight&&this.fileObject&&(this.host.setAttribute(`is-highlight`,`true`),this.host.registryController.setHighlight({from:this.fileObject.min,to:this.fileObject.max}))}_unpropagateHighlight(){this.host.hasAttribute(`is-highlight`)&&(this.host.removeAttribute(`is-highlight`),this.host.registryController.setHighlight(void 0))}startLoading(){this.host.failure=void 0,this.fileFailureContextProvider.setValue(void 0),this.setLoading(!0),this.onLoadingStart.call(),this.readyContextProvider.setValue(!1)}setLoading(e){this.host.loading!==e&&(this.host.loading=e),this.loadingContextProvider.setValue(e)}endLoading(){this.readyContextProvider.setValue(!0)}},gc=class extends Zs{get UUID(){return this._UUID}get group(){return this.host.fileController.host.groupController.groupObject}get registry(){return this.group.registry}static{this.HOST_PROPERTIES={thermal:{type:String,reflect:!0,attribute:`thermal`},visible:{type:String,reflect:!0,attribute:`visible`}}}constructor(e){super(e),this._UUID=e.UUID}hostWillUpdateWatcher(e){e.has(`thermal`)&&this.host.thermal&&this._load(this.host.thermal,this.host.visible)}hostUpdatedWatcher(){}hostConnected(){}hostDisconnected(){}async _load(e,t){return this.host.fileController.fileObject&&this.group.files.removeFile(this.host.fileController.fileObject),this.host.fileController.startLoading(),this.registry.batch.request(e,t,this.group,async e=>{e instanceof rr?this.host.fileController.receiveInstance(e):e instanceof pn&&this.host.fileController.receiveFailure(e)})}},_c=P(`group-controller-context`),vc=P(`group-object-context`),yc=class extends Zs{get UUID(){return this._UUID}static{this.HOST_PROPERTIES={managerController:Xs,registryController:Xs,groupSlug:{type:String,reflect:!1,attribute:`group-slug`},groupObject:Xs,autoclearGroup:{type:Boolean,reflect:!0,attribute:`autoclear-group`,converter:l(!0)},groupController:Xs}}get groupObject(){return this.host.groupObject}get registryController(){return this.host.registryController}get slug(){return this.host.groupSlug}get autoclearGroup(){return this.host.autoclearGroup}constructor(e){super(e),this.onInternalObject=new D,this._UUID=e.UUID+`_group-controller`,this.groupControllerContextProvider=new F(this.host,{context:_c,initialValue:this}),this.groupObjectContextProvider=new F(this.host,{context:vc})}hostConnected(){let e=this._getDefaultSlugFromHost(`group-slug`);this.host.groupSlug=e,this.host.groupObject=this.host.registryController.addOrGetGroup(e),this.onInternalObject.call(this.host.groupObject),this.groupObjectContextProvider.setValue(this.host.groupObject)}hostDisconnected(){this.autoclearGroup&&this.host.groupObject&&this.host.registryController.removeGroup(this.host.groupObject)}hostWillUpdateWatcher(){}hostUpdatedWatcher(){}},bc=class e extends Zs{get UUID(){return this._UUID}static{this.HOST_PROPERTIES={filesString:{type:String,reflect:!0,attribute:`group-files`}}}static{this.FILE_RECORD_SEPARATOR=`;`}static{this.FILE_SEGMENT_SEPAROATOR=`|`}static{this.FILE_COMPONENT_SEPAROATOR=`~`}static{this.FILE_THERMAL_KEY=`thermal`}static{this.FILE_VISIBLE_KEY=`visible`}static{this.FILE_LABEL_KEY=`label`}static{this.FILE_NOTE_KEY=`note`}get group(){return this.host.groupController.groupObject}static stringOrUndefined(e){return typeof e==`string`&&(e=e.trim()),e??void 0}static encodeAttribute(e,t){return`${e}${this.FILE_COMPONENT_SEPAROATOR}${t??``}`}static encodeFileRequest(e,t,n){let r=this.stringOrUndefined(e);if(t=this.stringOrUndefined(t),n=this.stringOrUndefined(n),!r)return;if(!t||!n)return this.encodeAttribute(this.FILE_THERMAL_KEY,e);let i=this.encodeAttribute(this.FILE_THERMAL_KEY,e);return t&&(i+=this.FILE_SEGMENT_SEPAROATOR+this.encodeAttribute(this.FILE_VISIBLE_KEY,t)),n&&(i+=this.FILE_SEGMENT_SEPAROATOR+this.encodeAttribute(this.FILE_LABEL_KEY,n)),i}encodeFileRequests(t){if(t&&t.length!==0)return t.map(t=>e.encodeFileRequest(t.thermal,t.visible,t.label)).filter(e=>e!==void 0).join(e.FILE_RECORD_SEPARATOR)||void 0}static decodeAttribute(t){return t.split(e.FILE_RECORD_SEPARATOR).map(t=>{let n,r,i;if(t.trim().split(e.FILE_SEGMENT_SEPAROATOR).forEach(t=>{let[a,o]=t.split(e.FILE_COMPONENT_SEPAROATOR);switch(a=a.trim(),o=o?.trim(),a){case e.FILE_THERMAL_KEY:n=o;break;case e.FILE_VISIBLE_KEY:r=o;break;case e.FILE_LABEL_KEY:i=o}}),n)return{thermal:n,visible:r,label:i}}).filter(e=>e!==void 0)}constructor(e){super(e),this.errors=[],this._UUID=e.UUID+`_group-load-controller`}hostConnected(){}hostDisconnected(){}hostWillUpdateWatcher(e){e.has(`filesString`)&&this._loadFromAttributes()}hostUpdatedWatcher(){}_loadFromAttributes(){let t=this.host.filesString?e.decodeAttribute(this.host.filesString):[];this._load(t)}async _load(e){if(e.length===0){this.group.files.removeAllInstances();return}let t=this.group.registry,n=t.service;this.errors=[],t.loading.markAsLoading();try{let r=await Promise.all(e.map(async e=>({result:await n.loadFile(e.thermal,e.visible),label:e.label})));for(let e of r)e.result instanceof pn&&this.errors.push(`${e.result.thermalUrl}: ${e.result.message}`);let i=r.filter(e=>e.result instanceof ir);this.host.groupListingController.backupReaders(i.map(e=>e.result)),await this.host.groupListingController.restoreTheEntireBackup();for(let e of this.group.files.value){let t=i.find(t=>t.result===e.reader);t?.label!==void 0&&e.setLabel(t.label)}await t.postLoadedProcessing(),t.range.applyMinmax()}catch(e){this.errors.push(e instanceof Error?e.message:String(e))}finally{t.loading.markAsLoaded(),this.host.requestUpdate()}}},B=e=>e??A,xc=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Sc=zo(class extends Bo{constructor(e){if(super(e),e.type!==Ro.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Fo(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=Mo(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=Mo(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=Mo(i[d],a[m]),jo(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=Mo(i[f],a[p]),jo(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=xc(o,p,m),u=xc(s,d,f)),l.has(s[d])){if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=jo(e,i[d]);Mo(t,a[p]),c[p]=t}else c[p]=Mo(n,a[p]),jo(e,i[d],n),i[t]=null;p++}else Io(i[f]),f--}else Io(i[d]),d++;for(;p<=m;){let t=jo(e,c[m+1]);Mo(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Io(e)}return this.ut=o,Po(e,c),oa}}),Cc=`important`,wc=` !`+Cc,Tc=zo(class extends Bo{constructor(e){if(super(e),e.type!==Ro.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(wc);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Cc:``):n[e]=r}}return oa}}),Ec=function(e){return e.DATE=`date`,e.LABEL=`label`,e.MANUAL=`manual`,e}({}),Dc=function(e){return e.ASC=`asc`,e.DESC=`desc`,e}({}),Oc=class extends Zs{get UUID(){return this._UUID}static{this.HOST_PROPERTIES={orderby:{type:String,reflect:!0,attribute:`group-order-by`},ordering:{type:String,reflect:!0,attribute:`group-ordering`}}}get group(){return this.host.groupController.groupObject}get hasBackup(){return this.backup.size>0}constructor(e){super(e),this.backup=new Set,this._numColumns=3,this._asTable=!1,this._previewWidth=50,this._UUID=e.UUID+`_group-display-controller`}clearBackup(){this.backup.clear()}backupReadersFromInstances(e){this.backup.clear(),e.forEach(e=>this.backup.add(e.reader))}backupReaders(e){this.backup.clear(),e.forEach(e=>this.backup.add(e)),this.log(`backup`,this.backup)}async restoreTheEntireBackup(){return this.group.files.batchCreateInstances(Array.from(this.backup),!0)}async showOneAndBackup(e){let t=e.reader;this.backup.clear(),this.backupReadersFromInstances(this.group.files.value),this.host.fileController.host.registryController.setHighlight(void 0),this.host.fileController.removeInstance(),this.group.files.removeAllInstances(),await t.createInstance(this.group)}static{this.CLASS_TABLE=`group-listing-table`}static{this.CLASS_COLUMNS=`group-listing-columns`}static{this.styles=O`
        .group-listing {
            display: grid;
            width: 100%;
            min-width: 0;
            gap: 1em;
            align-items: start;
            grid-template-columns: repeat(var(--group-listing-columns, 3), minmax(0, 1fr));
        }

        .group-listing[data-layout="table"] {
            grid-template-columns: minmax(0, 1fr);
            overflow-x: auto;
        }

        .group-listing .file-card {
            display: grid;
            min-width: 0;
            box-sizing: border-box;
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: "header" "canvas" "analysis" "timeline";
            background: var(--thermal-background);
            border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
        }

        .group-listing[data-layout="grid"] .file-media,
        .group-listing[data-layout="grid"] .file-details,
        .group-listing[data-layout="grid"] .file-details-content {
            display: contents;
        }

        .file-card .file-header {
            grid-area: header;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            gap: .5em;
            padding: .5em;
            min-width: 0;
            box-sizing: border-box;
        }

        .file-card .file-label {
            cursor: pointer;
            min-width: 0;
            overflow-wrap: anywhere;
        }

        .file-card file-canvas {
            grid-area: canvas;
            min-width: 0;
        }

        .file-card file-timeline {
            grid-area: timeline;
            display: block;
            min-width: 0;
        }

        .file-card .file-analysis {
            grid-area: analysis;
            min-width: 0;
            box-sizing: border-box;
        }

        .group-listing[data-layout="table"] .file-card {
            grid-template-columns: var(--thermal-list-preview-width, 50%) minmax(0, 1fr);
            grid-template-areas: "media details";
            align-items: stretch;
            background: transparent;
        }

        .group-listing[data-layout="table"] .file-media {
            grid-area: media;
            min-width: 0;
            padding: 0;
        }

        .group-listing[data-layout="table"] .file-details {
            grid-area: details;
            position: relative;
            min-width: 0;
            min-height: 0;
            background: var(--thermal-background);
            border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
        }

        /* Only the media determines the row height; longer details scroll inside it. */
        .group-listing[data-layout="table"] .file-details-content {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            overflow: auto;
        }

        .group-listing[data-layout="table"] .file-details-content > * {
            flex: none;
        }
    `}setPreviewWidth(e){if(!Number.isInteger(e)||e<20||e>80)throw RangeError(`Preview width must be an integer from 20 to 80 percent.`);this._previewWidth=e,this.host.requestUpdate()}setNumColumns(e){this._numColumns=e,this.host.requestUpdate()}setAsTable(e){this._asTable=e,this.host.requestUpdate()}renderListContainer(e){return k`
            <div
                class="group-listing"
                data-layout=${this._asTable?`table`:`grid`}
                style=${Tc({"--group-listing-columns":String(this._numColumns),"--thermal-list-preview-width":`${this._previewWidth}%`})}
            >
                ${e}
            </div>
        `}_renderButton(e,t,n,r,i,a){return k`
            <thermal-btn
                icon="${e}"
                iconStyle="${t}"
                tooltip=${B(r?void 0:n)}
                variant=${r?`background`:`default`}
                @click=${i}
                slot=${B(a)}
            >
            </thermal-btn>
        `}renderLayoutSwitch(e){return k`<thermal-btn-group>
            ${this._renderButton(`list`,`micro`,`Switch to table view`,this._asTable,()=>this.setAsTable(!0),e)}
            ${this._renderButton(`grid`,`micro`,`Switch to grid view`,!this._asTable,()=>this.setAsTable(!1),e)}
        </thermal-btn-group>`}renderColumnsSlider(e){let t=this._asTable?20:1,n=this._asTable?80:Math.min(3,this.group.files.value.length),r=this._asTable?this._previewWidth:this._numColumns,i=this._asTable?`Šířka náhledu`:`Počet sloupců`;return k`<div slot=${B(e)} style=${Tc({display:`flex`,flexDirection:`column`,fontSize:`small`})}>
        <input type="range" aria-label=${i} min=${t} max=${n} step="1" .value=${String(r)} @input=${e=>{let t=e.target,n=parseInt(t.value,10);this._asTable?this.setPreviewWidth(n):this.setNumColumns(n)}}>
        <div style=${Tc({textAlign:`center`,fontSize:`.7em`,opacity:`.7`,marginTop:`-0.2rem`})}>${i}: ${r}${this._asTable?` %`:``}</div>
        </div>`}hostConnected(){}hostDisconnected(){}hostWillUpdateWatcher(){}hostUpdatedWatcher(){}_orderFiles(){let e=Array.from(this.group.files.value);switch(this.host.orderby){case`label`:this.host.ordering===`asc`?e.sort((e,t)=>(e.label??``).localeCompare(t.label??``)):e.sort((e,t)=>(t.label??``).localeCompare(e.label??``));break;case`date`:this.host.ordering===`asc`?e.sort((e,t)=>e.timestamp-t.timestamp):e.sort((e,t)=>t.timestamp-e.timestamp)}return e}renderList(e,t){return this.group.files.value.length===0?t?.():Sc(this._orderFiles(),e=>e.id,e)}async handleFileDropAdd(e){let t=[];for(let n of e)n instanceof ir&&(t.push(n),this.backup.add(n));await this.group.files.batchCreateInstances(t,!1)}renderListHeader(e,t={}){return k`<div slot="${B(e)}" style=${Tc({display:`flex`,flexDirection:`row`,justifyContent:`flex-start`,alignItems:`center`,boxSizing:`border-box`,gap:`0.5em`})}>

            <thermal-btn 
                variant="default" 
                style="cursor: default; font-size: .9em;"
                icon="folder"
                iconStyle="micro"
            >${t.allowFileChanges===!1?`Počet souborů: ${this.group.files.value.length}`:`${this.group.files.value.length} nahraných souborů`}</thermal-btn>

            ${t.allowFileChanges===!1?void 0:k`<thermal-btn
                tooltip="Smazat všechny soubory a nahrát nové"
                icon="trash"
                iconStyle="micro"
                variant="background"
                @click=${()=>{this.host.fileController.host.registryController.setHighlight(void 0),this.clearBackup(),this.group.files.removeAllInstances()}}
            ></thermal-btn>
            <group-dropin-input 
                slot="bar-pre"
                variant="background"
                icon="upload"
                iconStyle="micro"
                tooltip="Nahrát další soubory"
                .onDrop=${async e=>{await this.handleFileDropAdd(e)}}
            ></group-dropin-input>`}
            <group-download-dropdown 
                variant="background"
                icon="download"
                iconStyle="micro"
            >
                <span slot="invoker">Stáhnout skupinu</span>
            </group-download-dropdown>
            <div style="flex-grow: 1;"></div>
            ${this.renderLayoutSwitch()}
            ${this.renderColumnsSlider()}
        </div>`}renderThumbnail(e,t={}){let n=()=>{t.onOpenDetail?t.onOpenDetail(e):this.showOneAndBackup(e)};return k`<file-provider
            class="file-card"
            .file=${e}
            @mouseenter=${()=>{this.host.groupController.registryController.setHighlight({from:e.min,to:e.max})}}
            @mouseleave=${()=>{this.host.groupController.registryController.setHighlight(void 0)}}
        >
            <div class="file-media">
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>
            <div class="file-details">
                <div class="file-details-content">
                    <header class="file-header">
                        <div class="file-label" @click=${n}>
                            <div>${tr.human(e.timestamp)}</div>
                            <div style="font-size: small; opacity: .5;">${e.fileName}</div>
                        </div>

                        <div style="flex-grow: 1;"></div>
                        ${t.allowFileChanges===!1?void 0:k`<thermal-btn
                            tooltip="Smazat soubor"
                            icon="trash"
                            iconStyle="micro"
                            @click=${async()=>{this.backup.delete(e.reader),this.group.files.removeAllInstances(),await this.restoreTheEntireBackup(),this.host.requestUpdate()}}
                        ></thermal-btn>`}
                        <file-download-dropdown>
                            <thermal-icon
                                icon="download"
                                variant="micro"
                                slot="invoker"
                                style="width: 1.1em;"
                            ></thermal-icon>
                        </file-download-dropdown>
                        <thermal-btn
                            icon="range"
                            iconStyle="outline"
                            @click=${()=>{this.host.groupController.registryController.registryObject.range.imposeRange({from:e.min,to:e.max})}}
                        ></thermal-btn>
                        <thermal-btn
                            tooltip="Zobrazit detail"
                            icon="eye"
                            iconStyle="solid"
                            @click=${n}
                        ></thermal-btn>
                    </header>
                    <div class="file-analysis">
                        <file-analysis-table
                            table-mode="compact"
                            ?forceinteractiveanalysis=${!0}
                            ?graph-activation-enabled=${!0}
                        ></file-analysis-table>
                        <file-analysis-graph ?standalone=${!0}></file-analysis-graph>
                    </div>
                </div>
            </div>
        </file-provider>`}renderDetailHeader(e,t,n={}){let r={display:`flex`,flexDirection:`row`,justifyContent:`flex-start`,alignItems:`center`,boxSizing:`border-box`,gap:`0.5em`},i=!n.onCloseDetail&&this.backup.size<=1,a=n.onCloseDetail?this.group.files.value.length:this.backup.size,o=i?`Zavřít`:`Zpět`,s=n.allowFileChanges===!1?`Zpět na seznam souborů`:i?`Zavřít soubor a nahrát nový/é`:`Zpět na Vašich ${a} souborů`,c=i?`close`:`back`;return k`<div style=${Tc(r)} slot=${B(t)}>

            <thermal-btn 
                variant="foreground" 
                tooltip="Název souboru" 
                style="cursor: default; font-size: .9em;"
                icon="image"
                iconStyle="micro"
            >${e.fileName}</thermal-btn>

            <thermal-btn 
                variant="foreground" 
                tooltip="Čas pořízení snímku" 
                style="cursor: default; font-size: .9em;"
                icon="clock"
                iconStyle="outline"
            >${tr.human(e.timestamp)}</thermal-btn>

            <thermal-btn
                icon=${c}
                iconStyle=${`micro`}
                tooltip="${s}"
                variant="foreground"
                @click=${()=>{n.onCloseDetail?n.onCloseDetail():this.backup.size<=1?(this.group.files.removeAllInstances(),this.host.fileController.removeInstance(),this.host.requestUpdate()):this.restoreTheEntireBackup()}}
            >${o}</thermal-btn>
            <file-info-button>
                <thermal-btn 
                    slot="invoker" 
                    icon="info" 
                    iconStyle="solid"
                    variant="background"
                >Informace o souboru</thermal-btn>
            </file-info-button>

            <file-download-dropdown
                icon="download"
                iconStyle="micro"
                variant="background"
            ></file-download-dropdown>

        </div>`}renderDetailBody(){return k`<div style=${Tc({display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`1em`,width:`100%`})}>
            <div>
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>
            <file-analysis-complex
                table-mode="full"
                forceinteractiveanalysis="true"
                ?graph-activation-enabled=${!0}
            ></file-analysis-complex>
        </div>`}},kc=[1,2,3,4,5,6,7],Ac=P(`group-analysis-sync-context`);(class e extends Zs{get UUID(){return this.host.UUID+`_group-analysis-sync-controller`}static{this.ANALYSIS_PROPERTY_DECLARATION={type:String,reflect:!0,converter:pi}}static{this.HOST_PROPERTIES={groupAnalysisSyncOn:{type:Boolean,reflect:!0,converter:l(!1),attribute:`group-analysis-sync-on`},analysis1:e.ANALYSIS_PROPERTY_DECLARATION,analysis2:e.ANALYSIS_PROPERTY_DECLARATION,analysis3:e.ANALYSIS_PROPERTY_DECLARATION,analysis4:e.ANALYSIS_PROPERTY_DECLARATION,analysis5:e.ANALYSIS_PROPERTY_DECLARATION,analysis6:e.ANALYSIS_PROPERTY_DECLARATION,analysis7:e.ANALYSIS_PROPERTY_DECLARATION}}get on(){return this._onContextProvider.value}constructor(e){super(e),this._files=new Set,this._values=new Map,this._fileValues=new Map,this._applying=!1,this._changingCore=!1,this._initialized=!1,this._onContextProvider=new F(this.host,{context:Ac,initialValue:!1})}_property(e){return`analysis${e}`}_hostValue(e){return this.host[this._property(e)]?.trim()||void 0}_setOn(e){this.host.groupAnalysisSyncOn=e,this._onContextProvider.setValue(e)}hostConnected(){this._group=this.host.groupController.groupObject;let e=this._group;e.analysisSync.addListener(this.UUID,t=>{this._changingCore||(this._setOn(t),t?queueMicrotask(()=>{this._group===e&&this.on&&e.analysisSync.value&&this._initialize()}):this._initialized=!1)}),e.files.addListener(this.UUID,()=>this._syncFiles()),e.registry.onProcessingEnd.set(this.UUID,()=>this.onLoaded()),this._setOn(this.host.groupAnalysisSyncOn||e.analysisSync.value),this._syncFiles(),this.on&&this._initialize()}hostDisconnected(){this._group?.analysisSync.removeListener(this.UUID),this._group?.files.removeListener(this.UUID),this._group?.registry.onProcessingEnd.delete(this.UUID);for(let e of this._files)this._unbindFile(e);this._files.clear(),this._fileValues.clear(),this._group=void 0,this._initialized=!1}hostWillUpdateWatcher(e){if(this._group&&e.has(`groupAnalysisSyncOn`)){if(!this.host.groupAnalysisSyncOn){this.turnOff();return}(!this.on||!this._initialized)&&this._initialize()}}hostUpdatedWatcher(e){if(!this._group||!this.on)return;let t=kc.filter(t=>e.has(this._property(t))&&this._hostValue(t)!==this._values.get(t));t.length&&this._applyHostValues(t)}_syncFiles(){let e=this._group;if(e){for(let t of this._files)e.files.value.includes(t)||(this._unbindFile(t),this._files.delete(t));for(let t of e.files.value){if(this._files.has(t))continue;this._files.add(t);let n=new Map;this._fileValues.set(t,n);for(let r of kc)t.slots.getOnSerializeManager(r)?.set(this.UUID,i=>{let a=n.has(r)&&n.get(r)===i;n.set(r,i),!a&&this.on&&!this._applying&&t===e.analysisSync.currentPointer&&(this._values.set(r,i),this.host[this._property(r)]=i)});t.onMount.set(this.UUID,()=>this.onLoaded())}this.on&&this.onLoaded()}}_unbindFile(e){for(let t of kc)e.slots.getOnSerializeManager(t)?.delete(this.UUID);e.onMount.delete(this.UUID),this._fileValues.delete(e)}_getFirstInstanceWithAnalyses(){return this._group?.files.value.find(e=>kc.some(t=>e.slots.hasSlot(t)))}_initialize(){let e=this._group;if(e){if(this._setOn(!0),!this._initialized){let t=kc.some(e=>this._hostValue(e)!==void 0),n=e.analysisSync.currentPointer,r=n&&e.files.value.includes(n)?n:this._getFirstInstanceWithAnalyses()??e.files.value[0];!t&&r&&this._analysesFromInstanceToGroup(r),this._initialized=t||r!==void 0}this._enableCore(),this._initialized&&this._applyHostValues(kc)}}_enableCore(){let e=this._group;if(!e)return;let t=e.analysisSync.currentPointer,n=t&&e.files.value.includes(t)?t:e.files.value.find(e=>e.dom?.built)??e.files.value[0];if(!n)e.analysisSync.setCurrentPointer(void 0);else{this._changingCore=!0;try{e.analysisSync.value?n!==t&&e.analysisSync.setCurrentPointer(n):e.analysisSync.turnOn(n)}finally{this._changingCore=!1}}}_applyHostValues(e){let t=this._group;if(!t)return;for(let t of e)this._values.set(t,this._hostValue(t));this._applying=!0;let n=t.analysisSync.currentPointer;t.analysisSync.setCurrentPointer(void 0);try{for(let t of this._files)if(t.dom?.built)for(let n of e)this._applySlot(t,n,this._values.get(n)),this._fileValues.get(t)?.set(n,t.slots.getSlot(n)?.analysis.toSerialized())}finally{n&&t.files.value.includes(n)&&t.analysisSync.setCurrentPointer(n),this._applying=!1}}_applySlot(e,t,n){let r=e.slots.getSlot(t);if(n===void 0){r&&e.slots.removeSlotAndAnalysis(t);return}let i=r?.analysis.toSerialized().split(`;`)[1]?.trim()===n.split(`;`)[1]?.trim();if(r&&i){if(!r.analysis.serializedIsValid(n)){this.log(`Invalid group analysis slot value`,t,e.id);return}r.analysis.toSerialized()!==n&&r.recieveSerialized(n);let i=e.dom?.canvasLayer?.getLayerRoot();i&&!i.contains(r.analysis.layerRoot)&&i.appendChild(r.analysis.layerRoot)}else e.slots.createAnalysisFromSerialized(n,t)||this.log(`Unable to create group analysis slot`,t,e.id)}onLoaded(){this.on&&!this._applying&&(this._initialized?(this._enableCore(),this._applyHostValues(kc)):this._initialize())}_analysesFromInstanceToGroup(e){for(let t of kc){let n=e.slots.getSlot(t)?.analysis.toSerialized();this._values.set(t,n),this.host[this._property(t)]=n}}turnOnOnFirstInstanceWithAnalyses(){let e=this._getFirstInstanceWithAnalyses();e&&this.turnOn(e)}turnOnWithAttributeAnalyses(){this._setOn(!0),this._initialized=!0,this._enableCore(),this._applyHostValues(kc)}turnOn(e){if(!this._group?.files.value.includes(e))this.log(`Cannot synchronize analyses from a file outside the group`,e.id);else{this._analysesFromInstanceToGroup(e),this._setOn(!0),this._initialized=!0,this._changingCore=!0;try{this._group.analysisSync.turnOn(e)}finally{this._changingCore=!1}this._applyHostValues(kc)}}turnOff(){this._setOn(!1),this._initialized=!1,this._changingCore=!0;try{this._group?.analysisSync.value&&this._group.analysisSync.turnOff()}finally{this._changingCore=!1}}});var jc=P(`registry-controller-context`),Mc=P(`registry-object-context`),Nc=P(`registry-opacity`),Pc=P(`registry-range-from`),Fc=P(`registry-range-to`),Ic=P(`registry-loading`),Lc=P(`registry-min`),Rc=P(`registry-max`),zc=P(`registry-highlight`),Bc=class extends Zs{get UUID(){return this._UUID}static{this.HOST_PROPERTIES={managerController:Xs,registrySlug:{type:String,reflect:!1,attribute:`registry-slug`},registryObject:Xs,registryController:Xs,opacity:{type:Number,reflect:!0,attribute:`opacity`},min:{type:Number,reflect:!1,state:!0},max:{type:Number,reflect:!1,state:!0},from:{type:Number,reflect:!0,attribute:`from`},to:{type:Number,reflect:!0,attribute:`to`},loading:{type:Boolean,attribute:`is-loading`,reflect:!0},highlight:{type:Object,reflect:!1,state:!0}}}get registryObject(){return this.host.registryObject}get slug(){return this.host.registrySlug}get opacity(){return this.host.opacity}get min(){return this.host.min}get max(){return this.host.max}get from(){return this.host.from}get to(){return this.host.to}get loading(){return this.host.loading}constructor(e){super(e),this.onInternalObject=new D,this._UUID=e.UUID+`_registry-controller`,this.registryControllerContextProvider=new F(this.host,{context:jc,initialValue:this}),this.registryObjectContextProvider=new F(this.host,{context:Mc}),this.opacityContextProvider=new F(this.host,{context:Nc}),this.minContextProvider=new F(this.host,{context:Lc}),this.maxContextProvider=new F(this.host,{context:Rc}),this.fromContextProvider=new F(this.host,{context:Pc}),this.toContextProvider=new F(this.host,{context:Fc}),this.loadingContextProvider=new F(this.host,{context:Ic}),this.highlightContextProvider=new F(this.host,{context:zc})}hostConnected(){let e=this._getDefaultSlugFromHost(`registry-slug`);this.host.registrySlug=e,this.host.registryObject=this.host.managerController.createRegistry(e),this.registryObjectContextProvider.setValue(this.host.registryObject),this.onInternalObject.call(this.host.registryObject),this.setOpacity(this.host.opacity??1),this.registryObject.opacity.addListener(this.UUID,this.setOpacity.bind(this)),this.registryObject.minmax.addListener(this.UUID,e=>{e===void 0?(this.host.min=void 0,this.host.max=void 0,this.minContextProvider.setValue(void 0),this.maxContextProvider.setValue(void 0)):(e.min!==this.host.min&&(this.host.min=e.min),e.max!==this.host.max&&(this.host.max=e.max),e.min!==this.minContextProvider.value&&this.minContextProvider.setValue(e.min),e.max!==this.maxContextProvider.value&&this.maxContextProvider.setValue(e.max))}),this.registryObject.range.addListener(this.UUID,this._rangeListener.bind(this)),this.registryObject.loading.addListener(this.UUID,this._loadingListener.bind(this))}hostDisconnected(){this.registryObject.opacity.removeListener(this.UUID),this.registryObject.minmax.removeListener(this.UUID),this.registryObject.range.removeListener(this.UUID),this.registryObject.loading.removeListener(this.UUID)}hostWillUpdateWatcher(e){e.has(`opacity`)&&this.setOpacity(this.host.opacity??1),(e.has(`from`)||e.has(`to`))&&(this.host.from===void 0||this.host.to===void 0?this._clearRange():this.setRange(this.host.from,this.host.to))}hostUpdatedWatcher(){}addOrGetGroup(e){return this.registryObject.groups.addOrGetGroup(e)}removeGroup(e){this.registryObject.groups.removeGroup(e.id)}setOpacity(e){let t=isNaN(e)?1:Math.max(0,Math.min(1,e));this.host.opacity!==t&&(this.host.opacity=t),this.registryObject&&this.registryObject.opacity.value!==t&&this.registryObject.opacity.imposeOpacity(t),this.opacityContextProvider.value!==t&&this.opacityContextProvider.setValue(t)}setRange(e,t){(this.registryObject.range.value===void 0||this.registryObject.range.value.from!==e||this.registryObject.range.value.to!==t)&&this.registryObject.range.imposeRange({from:e,to:t});let n=this.registryObject.range.value;n===void 0?this._clearRange():(this.host.from=n.from,this.host.to=n.to,this.fromContextProvider.setValue(n.from),this.toContextProvider.setValue(n.to))}setRangeFull(){this.host.min!==void 0&&this.host.max!==void 0&&this.setRange(this.host.min,this.host.max)}_rangeListener(e){e===void 0?this._clearRange():this.setRange(e.from,e.to)}_clearRange(){this.host.from=void 0,this.host.to=void 0,this.fromContextProvider.setValue(void 0),this.toContextProvider.setValue(void 0)}_loadingListener(e){e!==this.host.loading&&(this.host.loading=e),e!==this.loadingContextProvider.value&&this.loadingContextProvider.setValue(e)}setHighlight(e){this.highlightContextProvider.value!==e&&this.highlightContextProvider.setValue(e)}},Vc=new di;window.Thermal={managers:new Map},window.Thermal.managers.set(`default`,Vc);var Hc=(e,t)=>{if(e===void 0)return window.Thermal.managers.get(`default`);if(window.Thermal.managers.has(e))return window.Thermal.managers.get(e);{let n=new di(void 0,t);return window.Thermal.managers.set(e,n),n}},Uc=e=>{let t;if(window.Thermal.managers.forEach((n,r)=>{n.id===e.id&&(t=r)}),console.log(`removing`,e),t!==void 0){console.log(`found and removing`,t);let e=window.Thermal.managers.get(t);e&&(e.forEveryRegistry(t=>e.removeRegistry(t.id)),window.Thermal.managers.delete(t))}},Wc=P(`manager-controller-context`),Gc=P(`manager-instance`),Kc=P(`manager-palette-context`),qc=P(`manager-advanced-palettes-context`),Jc=P(`manager-smooth-context`),Yc=P(`manager-graph-function-context`),Xc=P(`manager-tool-context`),Zc=P(`manager-interactive-analysis-context`),Qc=class extends Zs{get UUID(){return this._UUID}static{this.HOST_PROPERTIES={managerSlug:{type:String,reflect:!1,attribute:`manager-slug`},managerObject:Xs,managerController:Xs,palette:{type:String,reflect:!0,attribute:`palette`,converter:fi},advancedPalettes:{reflect:!0,attribute:`advanced-palettes`,converter:l(!1)},smoothThermograms:{reflect:!0,attribute:`smooth-thermograms`,converter:l(!1)},smoothGraph:{reflect:!0,attribute:`smooth-graph`,converter:l(!1)},tool:{type:String,reflect:!0,attribute:`tool`}}}get slug(){return this.host.managerSlug}get managerObject(){return this.host.managerObject}get palette(){return this.host.palette}get smoothThermograms(){return this.host.smoothThermograms}get tool(){return this.host.tool}get toolObject(){return this.managerObject.tool.value}get smoothGraph(){return this.host.smoothGraph}constructor(e){super(e),this.onInternalObject=new D,this._UUID=e.UUID+`_manager-controller`,this.managerControllerContextProvider=new F(this.host,{context:Wc,initialValue:this}),this.managerObjectContextPtovider=new F(this.host,{context:Gc}),this.paletteContextProvider=new F(this.host,{context:Kc}),this.advancedPalettesContextProvider=new F(this.host,{context:qc}),this.smoothThermogramsContextProvider=new F(this.host,{context:Jc}),this.toolContextProvider=new F(this.host,{context:Xc}),this.smoothGraphContextProvider=new F(this.host,{context:Yc})}hostConnected(){let e=this._getDefaultSlugFromHost(`manager-slug`);this.host.managerSlug=e,this.host.managerObject=Hc(e),this.managerObjectContextPtovider.setValue(this.host.managerObject),this.onInternalObject.call(this.host.managerObject);let t=fi.fromAttribute(this.host.palette);this.setPalette(t),this.managerObject.palette.addListener(this.UUID,this.setPalette.bind(this)),this.setAdvancedPalettes(this.host.advancedPalettes),this.setSmoothThermograms(this.host.smoothThermograms),this.managerObject.smooth.addListener(this.UUID,this.setSmoothThermograms.bind(this)),this.setSmoothGraph(this.host.smoothGraph),this.managerObject.graphSmooth.addListener(this.UUID,this.setSmoothGraph.bind(this)),this._setToolByKey(this.host.tool),this.managerObject.tool.addListener(this.UUID,this.setTool.bind(this))}hostDisconnected(){this.managerObject.palette.removeListener(this.UUID),this.managerObject.smooth.removeListener(this.UUID),this.managerObject.graphSmooth.removeListener(this.UUID),this.managerObject.tool.removeListener(this.UUID)}hostUpdate(){}hostWillUpdateWatcher(e){e&&(e.has(`palette`)&&this.setPalette(this.host.palette),e.has(`advancedPalettes`)&&this.setAdvancedPalettes(this.host.advancedPalettes),e.has(`smoothThermograms`)&&this.setSmoothThermograms(this.host.smoothThermograms),e.has(`smoothGraph`)&&this.setSmoothGraph(this.host.smoothGraph),e.has(`tool`)&&this._setToolByKey(this.host.tool))}hostUpdatedWatcher(){}createRegistry(e){return this.managerObject.addOrGetRegistry(e)}_paletteStringToContextValue(e){return{key:e,data:Dr[e]}}setAdvancedPalettes(e){this.host.advancedPalettes!==e&&(this.host.advancedPalettes=e),this.advancedPalettesContextProvider.value!==e&&this.advancedPalettesContextProvider.setValue(e)}setPalette(e){let t=fi.fromAttribute(e);this.managerObject.palette.value!==t&&this.managerObject.palette.setPalette(t),this.paletteContextProvider.value?this.paletteContextProvider.value.key!==t&&this.paletteContextProvider.setValue(this._paletteStringToContextValue(t)):this.paletteContextProvider.setValue(this._paletteStringToContextValue(t)),this.host.palette!==t&&(this.host.palette=t)}setSmoothThermograms(e){this.host.smoothThermograms!==e&&(this.host.smoothThermograms=e),this.smoothThermogramsContextProvider.value!==e&&this.smoothThermogramsContextProvider.setValue(e),this.managerObject.smooth.value!==e&&this.managerObject.smooth.setSmooth(e)}setTool(e){e=this._toolStringToObject(e.key),e&&e.key!==this.host.tool&&(this.host.tool=e.key),this.toolContextProvider.value!==e&&this.toolContextProvider.setValue(e),this.managerObject.tool.value!==e&&this.managerObject.tool.selectTool(e)}_setToolByKey(e){let t=this._toolStringToObject(e);this.setTool(t)}_toolStringToObject(e=`inspect`){return this.managerObject.tool.tools[e]||this.managerObject.tool.tools.inspect}setSmoothGraph(e){this.host.smoothGraph!==e&&(this.host.smoothGraph=e),this.smoothGraphContextProvider.value!==e&&this.smoothGraphContextProvider.setValue(e),this.managerObject.graphSmooth.value!==e&&this.managerObject.graphSmooth.setGraphSmooth(e)}},$c=P(`config-context`),el=class extends Ys{get UUID(){return this._UUID}constructor(e){super(e),this._settings={export:{png:{width:1200,fontSize:20,analyses:!0,thermalScale:!0,license:!0,fileName:!1,fileDate:!0},group:{groupName:!0,columns:2}},visibility:{showAllOptions:!1}},this._UUID=this.host.UUID+`__config-controller`,this.contextProvider=new F(e,{context:$c,initialValue:this})}hostConnected(){}hostDisconnected(){}get settings(){return this._settings}setPngWidth(e){let t=Math.max(100,e);this._setPngSetting(`width`,t)}setPngFontSize(e){let t=Math.max(6,e);this._setPngSetting(`fontSize`,t)}setPngAnalyses(e){this._setPngSetting(`analyses`,e)}setPngThermalScale(e){this._setPngSetting(`thermalScale`,e)}setPngFileName(e){this._setPngSetting(`fileName`,e)}setPngFileDate(e){this._setPngSetting(`fileDate`,e)}setPngLicense(e){this._setPngSetting(`license`,e)}setGroupColumns(e){let t=Math.max(1,e);this._setGroupSetting(`columns`,t)}setGroupGroupName(e){this._setGroupSetting(`groupName`,e)}setShowAllOptions(e){this._settings={...this._settings,visibility:{...this._settings.visibility,showAllOptions:e}},this._publish()}_setPngSetting(e,t){this._settings={...this._settings,export:{...this._settings.export,png:{...this._settings.export.png,[e]:t}}},this._publish()}_setGroupSetting(e,t){this._settings={...this._settings,export:{...this._settings.export,group:{...this._settings.export.group,[e]:t}}},this._publish()}_publish(){this.contextProvider.setValue(this,!0)}},tl={attribute:!0,type:String,converter:Fi,reflect:!1,hasChanged:Ii},nl=(e=tl,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function V(e){return(t,n)=>typeof n==`object`?nl(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function H(e){return V({...e,state:!0,attribute:!1})}var rl=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function il(e){return(t,n)=>{let{slot:r,selector:i}=e??{},a=`slot`+(r?`[name=${r}]`:`:not([name])`);return rl(t,n,{get(){let t=(this.renderRoot?.querySelector(a))?.assignedElements(e)??[];return i===void 0?t:t.filter(e=>e.matches(i))}})}}var al=class extends z{constructor(...e){super(...e),this.configController=new el(this),this.showFullscreen=!1}firstUpdated(e){super.firstUpdated(e),zs(this)}};R([Ms({context:Rs}),V({reflect:!0,converter:Vs})],al.prototype,`locale`,void 0),R([V({type:String,reflect:!0,attribute:`label`})],al.prototype,`label`,void 0),R([V({type:String,reflect:!0,attribute:`author`})],al.prototype,`author`,void 0),R([V({type:String,reflect:!0,attribute:`license`})],al.prototype,`license`,void 0),R([V({type:Boolean,converter:l(!1),attribute:`show-fullscreen`})],al.prototype,`showFullscreen`,void 0);var ol=e=>Oo(e)?e._$litType$.h:e.strings,sl=zo(class extends Bo{constructor(e){super(e),this.et=new WeakMap}render(e){return[e]}update(e,[t]){let n=Do(this.it)?ol(this.it):null,r=Do(t)?ol(t):null;if(n!==null&&(r===null||n!==r)){let t=Fo(e).pop(),r=this.et.get(n);r===void 0&&(r=Sa(A,document.createDocumentFragment()),r.setConnected(!1),this.et.set(n,r)),Po(r,[t]),jo(r,void 0,t)}if(r!==null){if(n===null||n!==r){let t=this.et.get(r);if(t!==void 0){let n=Fo(t).pop();Lo(e),jo(e,void 0,n),Po(e,[n])}}this.it=t}else this.it=void 0;return this.render(t)}});function*cl(e,t){if(e!==void 0){let n=0;for(let r of e)yield t(r,n++)}}var U=()=>new ll,ll=class{},ul=new WeakMap,W=zo(class extends qo{render(e){return A}update(e,[t]){let n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),A}rt(e){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=ul.get(t);n===void 0&&(n=new WeakMap,ul.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G==`function`?ul.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),dl=class e extends z{constructor(...e){super(...e),this.language=M.language,this._overflowCount=0,this._overflowOpen=!1,this._hasPre=!1,this._hasContent=!1,this._hasPreBar=!1,this._hasBarHeader=!1,this.fullscreen=`off`,this.showfullscreen=!1,this.labelVariant=`foreground`,this.headerRef=U(),this.contentRef=U(),this.barItemsRef=U(),this._overflowObserver=null,this._rafId=null,this._barSlotAssignments=new Map,this._handleLanguageChange=e=>{this.language=e},this._handleFullscreenChange=()=>{this.fullscreen=document.fullscreenElement===this?`on`:`off`},this._onSlotChange=e=>{let t=e.target;this._setSlotFlag(t.name,t.assignedElements({flatten:!0}).length>0)},this._onBarSlotChange=()=>{for(let e of[`bar-pre`,`bar-post`,`bar-overflow`]){let t=this.shadowRoot?.querySelector(`slot[name="${e}"]`)?.assignedElements()??[],n=this._barSlotAssignments.get(e);if(!n||n.length!==t.length||t.some((e,t)=>e!==n[t])){this._scheduleOverflowUpdate();return}}}}connectedCallback(){super.connectedCallback(),document.addEventListener(`fullscreenchange`,this._handleFullscreenChange),M.language!==void 0&&(this.language=M.language),M.on(`languageChanged`,this._handleLanguageChange),this.requestUpdate()}disconnectedCallback(){document.removeEventListener(`fullscreenchange`,this._handleFullscreenChange),M.off(`languageChanged`,this._handleLanguageChange),this.observer?.disconnect(),this.observer=void 0,this._overflowObserver&&=(this._overflowObserver.disconnect(),null),this._rafId!==null&&(cancelAnimationFrame(this._rafId),this._rafId=null),this._barSlotAssignments.clear(),super.disconnectedCallback()}_toggleOverflow(){this._overflowOpen=!this._overflowOpen}_setSlotFlag(e,t){switch(e){case`pre`:this._hasPre=t;break;case`content`:this._hasContent=t;break;case`pre-bar`:this._hasPreBar=t;break;case`bar-header`:this._hasBarHeader=t}}_syncSlotFlags(){let e=this.shadowRoot;if(e)for(let t of[`pre`,`content`,`pre-bar`,`bar-header`]){let n=e.querySelector(`slot[name="${t}"]`),r=n?n.assignedElements({flatten:!0}).length>0:Array.from(this.children).some(e=>e.slot===t?!(e instanceof HTMLSlotElement)||e.assignedElements({flatten:!0}).length>0:!1);this._setSlotFlag(t,r)}}willUpdate(e){super.willUpdate(e),this._syncSlotFlags()}_scheduleOverflowUpdate(){this.isConnected&&this._rafId===null&&(this._rafId=requestAnimationFrame(()=>{if(this._rafId=null,this.isConnected){this._doOverflowUpdate();for(let e of[`bar-pre`,`bar-post`,`bar-overflow`]){let t=this.shadowRoot?.querySelector(`slot[name="${e}"]`)?.assignedElements()??[];this._barSlotAssignments.set(e,t)}}}))}_doOverflowUpdate(){let e=this.shadowRoot;if(!e)return;let t=e.querySelector(`slot[name="bar-overflow"]`);if(t){let e=[...t.assignedElements()];for(let t of e)t.slot=t.dataset.originalSlot??`bar-pre`,delete t.dataset.originalSlot}let n=this.barItemsRef.value;if(!n)return;let r=e.querySelector(`slot[name="bar-pre"]`),i=e.querySelector(`slot[name="bar-post"]`),a=[...r?.assignedElements({flatten:!0})??[],...i?.assignedElements({flatten:!0})??[]];if(a.length===0){this._overflowCount=0,this._overflowOpen=!1;return}let o=a.reduce((e,t,n)=>e+t.offsetWidth+(n>0?5:0),0),s=n.offsetWidth;if(o<=s){this._overflowCount=0,this._overflowOpen=!1;return}let c=s-44,l=0,u=a.length;for(let e=0;e<a.length;e++){let t=a[e].offsetWidth+(e>0?5:0);if(l+t>c){u=e;break}l+=t}for(let e=u;e<a.length;e++){let t=a[e];t.dataset.originalSlot=t.slot,t.slot=`bar-overflow`}let d=a.length-u;this._overflowCount=d,d===0&&(this._overflowOpen=!1)}toggleFullscreen(){this.fullscreen=this.fullscreen===`on`?`off`:`on`}updated(e){super.updated(e),this.isConnected&&(this.observer===void 0&&this.contentRef.value!==void 0&&(this.observer=new ResizeObserver(()=>{this.isConnected&&this.fullscreen===`off`&&this.contentRef.value&&this.contentRef.value.removeAttribute(`style`)}),this.observer.observe(this)),!this._overflowObserver&&this.barItemsRef.value&&(this._overflowObserver=new ResizeObserver(()=>{this._scheduleOverflowUpdate()}),this._overflowObserver.observe(this.barItemsRef.value),this._scheduleOverflowUpdate()))}attributeChangedCallback(e,t,n){if(super.attributeChangedCallback(e,t,n),e===`fullscreen`&&t!==n){if(n===`on`){if(document.fullscreenElement===this)return;if(typeof this.requestFullscreen!=`function`){this.log(`Fullscreen API is unavailable`),this.fullscreen=`off`;return}this.requestFullscreen().catch(e=>{this.log(`Unable to enter fullscreen`,e),this._handleFullscreenChange()})}else n===`off`&&t!==null&&document.fullscreenElement===this&&document.exitFullscreen().catch(e=>{this.log(`Unable to exit fullscreen`,e),this._handleFullscreenChange()})}}static{this.styles=O`

        :host {
            font-family: sans-serif;
            font-weight: normal;
            font-size: var( --thermal-fs );
            line-height: 1em;
            color: var( --thermal-foreground );

            display: block;

            padding: calc( var( --thermal-gap ) / 3 );
            background-color: var( --thermal-slate-light );
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );    
            position: relative; 
        }

        .bar {
            padding-bottom: calc( var( --thermal-gap ) * 0.5 );
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .bar-label {
            flex: 0 1 auto;
            min-width: 50px;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .bar-header,
        .pre-bar {
            display: flex;
            gap: 5px;
            align-items: flex-start;
        }

        .pre-bar {
            width: 100%;
        }

        .bar-header[hidden],
        .pre-bar[hidden],
        .pre[hidden] {
            display: none;
        }

        .bar-items {
            flex: 1 1 0;
            min-width: 0;
            display: flex;
            gap: 5px;
            align-items: center;
            --thermal-direction: row;
        }

        .bar-items ::slotted([slot="bar-pre"]),
        .bar-items ::slotted([slot="bar-post"]) {
            flex-shrink: 0;
        }

        .bar-spacer {
            flex: 1 1 0;
            min-width: 0;
        }

        .bar-overflow-toggle {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            color: var(--thermal-foreground);
            cursor: pointer;
            padding: 0.3em 0.5em;
            line-height: 0;
        }

        .bar-overflow-toggle:hover {
            background-color: var(--thermal-slate-light);
        }

        .bar-overflow-panel {
            
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            align-items: center;
            padding: calc( var(--thermal-gap) * 0.4 ) 0;
            
            border-top: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            --thermal-direction: row;

            padding: .3em;
            
            background: var(--thermal-slate);
            border-radius: var(--thermal-radius);
            
            margin-bottom: .5em;

            > slot > * {
                width: 100%; 
            }

        }

        .bar-overflow-panel[hidden] {
            display: none;
        }

        :host([fullscreen="on"]) {
            box-sizing: border-box;
            width: 100vw;
            height: 100vh;
            overflow: auto;
            padding: calc( var( --thermal-gap ) / 3 );
            border: 0;
            border-radius: 0;
        }


        .credits {

            display: flex;
            width: 100%;
            flex-wrap: wrap;
            font-size: calc( var(--thermal-fs-sm) * 0.8 );

            & > div {
                padding-top: calc( var(--thermal-gap) * .5 );
                padding-right: var( --thermal-gap );
            }
        
        }

        .credits-field {
            display: inline;
            opacity: .5;
        }

        .credit-value {
            display: inline;
        }

        .content {
            width: 100%;
            box-sizing: border-box;
        }

        .has-content {
            margin-top: calc( var(--thermal-gap) * .5);
            &::before {
                opacity: .5;
                font-size: calc( var(--thermal-fs-sm) * 0.8 );
                display: block;
                padding-bottom: calc( var(--thermal-gap) * .5);
            }
        }

        .app-header {
            position: sticky;
            top: 0;
            z-index: 9999;
            background: var(--thermal-slate-light);
            background: linear-gradient(var(--thermal-slate-light) calc(100% - 10px), transparent);
        }
    
    `}renderLabel(){let e=this.onlabel===void 0?`false`:`true`;return k`
    <slot name="label">
        ${this.label?k`<thermal-btn
    variant="${this.labelVariant}"
    interactive=${e}
    icon=${B(this.labelIcon)}
    iconStyle=${B(this.labelIconStyle)}
    tooltip=${B(this.labelTooltip)}
    @click=${this.onlabel}
>${this.label}</thermal-btn>`:A}
    </slot>`}renderCreditField(e,t){return t===void 0||t.trim().length===0?A:k`<div>
    <div class="credits-field">${e}:</div>
    <div class="credit-value">${t}</div>
</div>`}renderCredits(){return this.author||this.license||this.recorded?k`<div class="credits">
    ${this.renderCreditField(N(L.recordedat),this.recorded)}
    ${this.renderCreditField(N(L.author),this.author)}
    ${this.renderCreditField(N(L.license),this.license)}
</div>`:A}static{this.languages=[`en`,`cs`,`de`,`fr`,`cy`]}renderLanguageSwitcher(){return k`<thermal-dropdown>
    <span slot="invoker">${this.language.toUpperCase()}</span>
    ${sl(cl(e.languages,e=>k`<div slot="option">
        <thermal-btn
            @click=${()=>{M.changeLanguage(e),this.language=e}}
        >${Ls[e].flag} ${Ls[e].name}</thermal-btn>
    </div>`))}
</thermal-dropdown>`}renderFullscreenButton(){return this.showfullscreen===!1?A:k`<thermal-btn
    class="app-fullscreen-button"
    @click=${this.toggleFullscreen.bind(this)}
    icon=${this.fullscreen===`on`?`smaller`:`bigger`}
    iconStyle="mini"
    tooltip=${this.fullscreen===`on`?N(L.close):`Fullscreen`}
></thermal-btn>`}renderOverflowToggle(){if(this._overflowCount===0)return A;let e=`adjustment`,t=`outline`,n=`default`;return this._overflowOpen&&(e=`close`,t=`outline`,n=`background`),k`<thermal-btn 
    @click=${this._toggleOverflow} 
    tooltip="${this.t(`moreoptions`)}" 
    icon=${e} 
    iconStyle=${t} 
    variant=${n}
></thermal-btn>`}render(){return k`<header ${W(this.headerRef)} class="app-header">

        <div class="bar">

            <div class="bar-label">
                ${this.renderLabel()}
            </div>

            <div class="bar-header" ?hidden=${!this._hasBarHeader}>
                <slot name="bar-header" @slotchange=${this._onSlotChange}></slot>
            </div>

            <div class="bar-items" ${W(this.barItemsRef)}>

                <slot name="bar-pre" @slotchange=${this._onBarSlotChange}></slot>
                <div class="bar-spacer"></div>
                <slot name="bar-post" @slotchange=${this._onBarSlotChange}></slot>

                ${this.renderOverflowToggle()}

            </div>

            <slot name="close"></slot>

            ${this.renderFullscreenButton()}

            ${this.renderLanguageSwitcher()}

        </div>

        <div class="bar-overflow-panel" ?hidden=${this._overflowCount===0||!this._overflowOpen}>
            <slot name="bar-overflow" @slotchange=${this._onBarSlotChange}></slot>
        </div>

        <div class="pre" ?hidden=${!this._hasPre}>
            <slot name="pre" @slotchange=${this._onSlotChange}></slot>
        </div>

        <div class="pre-bar" ?hidden=${!this._hasPreBar}>
            <slot name="pre-bar" @slotchange=${this._onSlotChange}></slot>
        </div>

    </header>

    <div class="content" part="app-content" ${W(this.contentRef)}>
        <slot></slot>
    </div>

    <div class="post">
        <slot name="post"></slot>
    </div>

    ${this.renderCredits()}

    <div class="content ${this._hasContent?`has-content`:``}">
        <slot name="content" @slotchange=${this._onSlotChange}></slot>
    </div>
`}};R([H()],dl.prototype,`language`,void 0),R([H()],dl.prototype,`_overflowCount`,void 0),R([H()],dl.prototype,`_overflowOpen`,void 0),R([H()],dl.prototype,`_hasPre`,void 0),R([H()],dl.prototype,`_hasContent`,void 0),R([H()],dl.prototype,`_hasPreBar`,void 0),R([H()],dl.prototype,`_hasBarHeader`,void 0),R([V({type:String,reflect:!0})],dl.prototype,`fullscreen`,void 0),R([V({type:Boolean,reflect:!0,converter:l(!1),attribute:`show-fullscreen`})],dl.prototype,`showfullscreen`,void 0),R([V()],dl.prototype,`author`,void 0),R([V()],dl.prototype,`recorded`,void 0),R([V()],dl.prototype,`license`,void 0),R([V()],dl.prototype,`label`,void 0),R([V()],dl.prototype,`labelIcon`,void 0),R([V()],dl.prototype,`labelIconStyle`,void 0),R([V()],dl.prototype,`labelTooltip`,void 0),R([V()],dl.prototype,`labelVariant`,void 0),R([V({type:Object})],dl.prototype,`onlabel`,void 0);var fl=class extends wa{constructor(...e){super(...e),this.collapsed=!1,this.drawerRef=U(),this.contentRef=U(),this.rulerContentRef=U()}static{this.styles=O`

        .container {
            // width: 100%;
            display: flex;
            gap: 5px;
            position: relative;
        }


        .ruler {
            width: 100%;
            position: absolute;
            height: 0;
            top: 0;
            left: 0;
        }

        .ruler-item {}

        .ruler-item__current {
            border: var(--thermal-border-width) var(--thermal-border-style) transparent;
            height: 0;
            margin-top: -1px;
            content: "";
        }

        .ruler-item__content {
            border: var(--thermal-border-width) var(--thermal-border-style) red;
            position: absolute;
            display: none;
        }


        .content {
            
            display: flex;
            gap: calc( 5px );
            width: max-content;

            align-items: center;
        
        }



        .icon {
            width: var( --thermal-gap );
            line-height: 0;
        }

        .collapsed-menu {
            --thermal-direction: column;
            --thermal-collapsible-display: block !important;
            --thermal-collapsible-width: 100%;
            --thermal-collapsible-grow: 1;
        }

    `}connectedCallback(){super.connectedCallback()}firstUpdated(e){super.firstUpdated(e),this.hydrateObserver()}hydrateObserver(){this.drawerRef.value&&this.observer===void 0&&(this.observer=new ResizeObserver(e=>{if(this.collapsed===!1){let e=this.contentRef.value.clientWidth;this.lastContentWidth=e}let t=e[0];this.lastContentWidth<t.contentRect.width?this.collapsed&&=!1:this.collapsed===!1&&(this.collapsed=!0)}),this.observer.observe(this.drawerRef.value))}disconnectedCallback(){super.disconnectedCallback(),this.drawerRef.value&&this.observer.unobserve(this.drawerRef.value),this.observer&&this.observer.disconnect()}render(){return k`

            <div class="container">

                <div class="ruler">
                    <div class="ruler-item ruler-item__current" ${W(this.drawerRef)}></div>
                    <div class="ruler-item ruler-item__content" ${W(this.rulerContentRef)} style="width: ${this.lastContentWidth+1}px"></div>
                </div>
                <div class="content" ${W(this.contentRef)}>

                    ${this.collapsed===!1?k`
                        <slot></slot>    
                    `:A}
                
                </div>

            </div>

            ${this.collapsed?k`
                <thermal-dropdown class="collapsed-menu">
                    <div slot="invoker" class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    </div>

                    <slot slot="option" stacked="true"></slot>
                </thermal-dropdown>
            `:A}
        
        `}};R([H()],fl.prototype,`collapsed`,void 0),R([H()],fl.prototype,`lastContentWidth`,void 0);var pl=Math.min,ml=Math.max,hl=Math.round,gl=Math.floor,_l=e=>({x:e,y:e}),vl={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function yl(e,t,n){return ml(e,pl(t,n))}function bl(e,t){return typeof e==`function`?e(t):e}function xl(e){return e.split(`-`)[0]}function Sl(e){return e.split(`-`)[1]}function Cl(e){return e===`x`?`y`:`x`}function wl(e){return e===`y`?`height`:`width`}function Tl(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function El(e){return Cl(Tl(e))}function Dl(e,t,n){n===void 0&&(n=!1);let r=Sl(e),i=El(e),a=wl(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=Il(o)),[o,Il(o)]}function Ol(e){let t=Il(e);return[kl(e),t,kl(t)]}function kl(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var Al=[`left`,`right`],jl=[`right`,`left`],Ml=[`top`,`bottom`],Nl=[`bottom`,`top`];function Pl(e,t,n){switch(e){case`top`:case`bottom`:return n?t?jl:Al:t?Al:jl;case`left`:case`right`:return t?Ml:Nl;default:return[]}}function Fl(e,t,n,r){let i=Sl(e),a=Pl(xl(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(kl)))),a}function Il(e){let t=xl(e);return vl[t]+e.slice(t.length)}function Ll(e){return{top:e.top??0,right:e.right??0,bottom:e.bottom??0,left:e.left??0}}function Rl(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:Ll(e)}function zl(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function Bl(e,t,n){let{reference:r,floating:i}=e,a=Tl(t),o=El(t),s=wl(o),c=xl(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}let m=Sl(t);return m&&(p[o]+=f*(m===`end`?1:-1)*(n&&l?-1:1)),p}async function Vl(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=bl(t,e),p=Rl(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=zl(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=zl(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var Hl=50,Ul=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:Vl},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=Bl(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<Hl&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=Bl(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},Wl=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0}=bl(e,t)||{};if(l==null)return{};let d=Rl(u),f={x:n,y:r},p=El(i),m=wl(p),h=await o.getDimensions(l),g=p===`y`,_=g?`top`:`left`,v=g?`bottom`:`right`,y=g?`clientHeight`:`clientWidth`,b=a.reference[m]+a.reference[p]-f[p]-a.floating[m],x=f[p]-a.reference[p],S=await(o.getOffsetParent==null?void 0:o.getOffsetParent(l)),C=S?S[y]:0;(!C||!await(o.isElement==null?void 0:o.isElement(S)))&&(C=s.floating[y]||a.floating[m]);let ee=b/2-x/2,w=C/2-h[m]/2-1,T=pl(d[_],w),te=pl(d[v],w),ne=C-h[m]-te,re=C/2-h[m]/2+ee,ie=yl(T,re,ne),ae=!c.arrow&&Sl(i)!=null&&re!==ie&&a.reference[m]/2-(re<T?T:te)-h[m]/2<0,oe=ae?re<T?re-T:re-ne:0;return{[p]:f[p]+oe,data:{[p]:ie,centerOffset:re-ie-oe,...ae&&{alignmentOffset:oe}},reset:ae}}}),Gl=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=bl(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=xl(r),_=Tl(o),v=xl(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[Il(o)]:Ol(o)),x=p!==`none`;!d&&x&&b.push(...Fl(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),ee=[],w=i.flip?.overflows||[];if(l&&ee.push(C[g]),u){let e=Dl(r,a,y);ee.push(C[e[0]],C[e[1]])}if(w=[...w,{placement:r,overflows:ee}],!ee.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===Tl(t)||w.every(e=>Tl(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:w},reset:{placement:t}};let n=w.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=w.filter(e=>{if(x){let t=Tl(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}};function Kl(e){let t=pl(...e.map(e=>e.left)),n=pl(...e.map(e=>e.top)),r=ml(...e.map(e=>e.right)),i=ml(...e.map(e=>e.bottom));return{x:t,y:n,width:r-t,height:i-n}}function ql(e){let t=e.slice().sort((e,t)=>e.y-t.y),n=[],r=null;for(let e=0;e<t.length;e++){let i=t[e];!r||i.y-r.y>r.height/2?n.push([i]):n[n.length-1].push(i),r=i}return n.map(e=>zl(Kl(e)))}var Jl=function(e){return e===void 0&&(e={}),{name:`inline`,options:e,async fn(t){let{placement:n,elements:r,rects:i,platform:a,strategy:o}=t,{padding:s=2,x:c,y:l}=bl(e,t),u=Array.from(await(a.getClientRects==null?void 0:a.getClientRects(r.reference))||[]);if(!u.length)return{};let d=ql(u),f=zl(Kl(u)),p=Rl(s);function m(){if(d.length===2&&(d[0].left>d[1].right||d[1].left>d[0].right)&&c!=null&&l!=null)return d.find(e=>c>e.left-p.left&&c<e.right+p.right&&l>e.top-p.top&&l<e.bottom+p.bottom)||f;if(d.length>=2){if(Tl(n)===`y`){let e=d[0],t=d[d.length-1],r=xl(n)===`top`,i=e.top,a=t.bottom,o=r?e.left:t.left;return zl({x:o,y:i,width:(r?e.right:t.right)-o,height:a-i})}let e=xl(n)===`left`,t=ml(...d.map(e=>e.right)),r=pl(...d.map(e=>e.left)),i=d.filter(n=>e?n.left===r:n.right===t),a=i[0].top,o=i[i.length-1].bottom;return zl({x:r,y:a,width:t-r,height:o-a})}return f}let h=await a.getElementRects({reference:{getBoundingClientRect:m},floating:r.floating,strategy:o});return i.reference.x!==h.reference.x||i.reference.y!==h.reference.y||i.reference.width!==h.reference.width||i.reference.height!==h.reference.height?{reset:{rects:h}}:{}}}},Yl=new Set([`left`,`top`]);async function Xl(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=xl(n),s=Sl(n),c=Tl(n)===`y`,l=Yl.has(o)?-1:1,u=a&&c?-1:1,d=bl(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var Zl=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await Xl(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},Ql=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=bl(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=Tl(i),p=Cl(f),m=u[p],h=u[f],g=(e,t)=>yl(t+d[e===`y`?`top`:`left`],t,t-d[e===`y`?`bottom`:`right`]);o&&(m=g(p,m)),s&&(h=g(f,h));let _=c.fn({...t,[p]:m,[f]:h});return{..._,data:{x:_.x-n,y:_.y-r,enabled:{[p]:o,[f]:s}}}}}};function $l(){return typeof window<`u`}function eu(e){return ru(e)?(e.nodeName||``).toLowerCase():`#document`}function tu(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function nu(e){return((ru(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function ru(e){return $l()?e instanceof Node||e instanceof tu(e).Node:!1}function iu(e){return $l()?e instanceof Element||e instanceof tu(e).Element:!1}function au(e){return $l()?e instanceof HTMLElement||e instanceof tu(e).HTMLElement:!1}function ou(e){return!$l()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof tu(e).ShadowRoot}function su(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=vu(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function cu(e){return/^(table|td|th)$/.test(eu(e))}function lu(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var uu=/transform|translate|scale|rotate|perspective|filter/,du=/paint|layout|strict|content/,fu=e=>!!e&&e!==`none`,pu;function mu(e){let t=iu(e)?vu(e):e;return fu(t.transform)||fu(t.translate)||fu(t.scale)||fu(t.rotate)||fu(t.perspective)||!gu()&&(fu(t.backdropFilter)||fu(t.filter))||uu.test(t.willChange||``)||du.test(t.contain||``)}function hu(e){let t=bu(e);for(;au(t)&&!_u(t);){if(mu(t))return t;if(lu(t))return null;t=bu(t)}return null}function gu(){return pu??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),pu}function _u(e){return/^(html|body|#document)$/.test(eu(e))}function vu(e){return tu(e).getComputedStyle(e)}function yu(e){return iu(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function bu(e){if(eu(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||ou(e)&&e.host||nu(e);return ou(t)?t.host:t}function xu(e){let t=bu(e);return _u(t)?(e.ownerDocument||e).body:au(t)&&su(t)?t:xu(t)}function Su(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=xu(e),i=r===e.ownerDocument?.body,a=tu(r);if(i){let e=Cu(a);return t.concat(a,a.visualViewport||[],su(r)?r:[],e&&n?Su(e):[])}return t.concat(r,Su(r,[],n))}function Cu(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function wu(e){let t=vu(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=au(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=hl(n)!==a||hl(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function Tu(e){return iu(e)?e:e.contextElement}function Eu(e){let t=Tu(e);if(!au(t))return _l(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=wu(t),o=(a?hl(n.width):n.width)/r,s=(a?hl(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var Du=_l(0);function Ou(e){let t=tu(e);return!gu()||!t.visualViewport?Du:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function ku(e,t,n){return t===void 0&&(t=!1),!!n&&t&&n===tu(e)}function Au(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=Tu(e),o=_l(1);t&&(r?iu(r)&&(o=Eu(r)):o=Eu(e));let s=ku(a,n,r)?Ou(a):_l(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a&&r){let e=tu(a),t=iu(r)?tu(r):r,n=e,i=Cu(n);for(;i&&t!==n;){let e=Eu(i),t=i.getBoundingClientRect(),r=vu(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=tu(i),i=Cu(n)}}return zl({width:u,height:d,x:c,y:l})}function ju(e,t){let n=yu(e).scrollLeft;return t?t.left+n:Au(nu(e)).left+n}function Mu(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-ju(e,n),y:n.top+t.scrollTop}}function Nu(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=nu(r),s=t?lu(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=_l(1),u=_l(0),d=au(r);if((d||!a)&&((eu(r)!==`body`||su(o))&&(c=yu(r)),d)){let e=Au(r);l=Eu(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Mu(o,c):_l(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Pu(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function Fu(e){let t=yu(e),n=e.ownerDocument.body,r=ml(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),i=ml(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),a=-t.scrollLeft+ju(e),o=-t.scrollTop;return vu(n).direction===`rtl`&&(a+=ml(e.clientWidth,n.clientWidth)-r),{width:r,height:i,x:a,y:o}}var Iu=25;function Lu(e,t,n){n===void 0&&(n=`viewport`);let r=n===`layoutViewport`,i=tu(e),a=nu(e),o=i.visualViewport,s=a.clientWidth,c=a.clientHeight,l=0,u=0;if(o){let e=!gu()||t===`fixed`;r?e||(l=-o.offsetLeft,u=-o.offsetTop):(s=o.width,c=o.height,e&&(l=o.offsetLeft,u=o.offsetTop))}if(ju(a)<=0){let e=a.ownerDocument,t=e.body,n=getComputedStyle(t),r=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,i=Math.abs(a.clientWidth-t.clientWidth-r),o=getComputedStyle(a).scrollbarGutter===`stable both-edges`?i/2:i;o<=Iu&&(s-=o)}return{width:s,height:c,x:l,y:u}}function Ru(e,t){let n=Au(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=Eu(e);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function zu(e,t,n){let r;if(t===`viewport`||t===`layoutViewport`)r=Lu(e,n,t);else if(t===`document`)r=Fu(nu(e));else if(iu(t))r=Ru(t,n);else{let n=Ou(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return zl(r)}function Bu(e,t){let n=t.get(e);if(n)return n;let r=Su(e,[],!1).filter(e=>iu(e)&&eu(e)!==`body`),i=null,a=vu(e).position===`fixed`,o=a?bu(e):e;for(;iu(o)&&!_u(o);){let e=vu(o),t=mu(o),n=i?i.position:a?`fixed`:``;!t&&(n===`fixed`||n===`absolute`&&e.position===`static`)?r=r.filter(e=>e!==o):i=e,o=bu(o)}return t.set(e,r),r}function Vu(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?lu(t)?[]:Bu(t,this._c):[].concat(n),r],o=zu(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=zu(t,a[e],i);s=ml(n.top,s),c=pl(n.right,c),l=pl(n.bottom,l),u=ml(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Hu(e){let{width:t,height:n}=wu(e);return{width:t,height:n}}function Uu(e,t,n){let r=au(t),i=nu(t),a=n===`fixed`,o=Au(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=_l(0);if((r||!a)&&((eu(t)!==`body`||su(i))&&(s=yu(t)),r)){let e=Au(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}!r&&i&&(c.x=ju(i));let l=i&&!r&&!a?Mu(i,s):_l(0);return{x:o.left+s.scrollLeft-c.x-l.x,y:o.top+s.scrollTop-c.y-l.y,width:o.width,height:o.height}}function Wu(e){return vu(e).position===`static`}function Gu(e,t){if(!au(e)||vu(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return nu(e)===n&&(n=n.ownerDocument.body),n}function Ku(e,t){let n=tu(e);if(lu(e))return n;if(!au(e)){let t=bu(e);for(;t&&!_u(t);){if(iu(t)&&!Wu(t))return t;t=bu(t)}return n}let r=Gu(e,t);for(;r&&cu(r)&&Wu(r);)r=Gu(r,t);return r&&_u(r)&&Wu(r)&&!mu(r)?n:r||hu(e)||n}var qu=async function(e){let t=this.getOffsetParent||Ku,n=this.getDimensions,r=await n(e.floating);return{reference:Uu(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Ju(e){return vu(e).direction===`rtl`}var Yu={convertOffsetParentRelativeRectToViewportRelativeRect:Nu,getDocumentElement:nu,getClippingRect:Vu,getOffsetParent:Ku,getElementRects:qu,getClientRects:Pu,getDimensions:Hu,getScale:Eu,isElement:iu,isRTL:Ju};function Xu(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Zu(e,t,n){let r=null,i,a=nu(e);function o(){var e;clearTimeout(i),(e=r)==null||e.disconnect(),r=null}function s(n,c){n===void 0&&(n=!1),c===void 0&&(c=1),o();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(n||t(),!f||!p)return;let m=gl(d),h=gl(a.clientWidth-(u+f)),g=gl(a.clientHeight-(d+p)),_=gl(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:ml(0,pl(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(!Xu(l,e.getBoundingClientRect()))return s();if(n!==c){if(!y)return s();n?s(!1,n):i=setTimeout(()=>{s(!1,1e-7)},1e3)}y=!1}try{r=new IntersectionObserver(b,{...v,root:a.ownerDocument})}catch{r=new IntersectionObserver(b,v)}r.observe(e)}let c=tu(e),l=()=>s(n);return c.addEventListener(`resize`,l),s(!0),()=>{c.removeEventListener(`resize`,l),o()}}function Qu(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=Tu(e),u=i||a?[...l?Su(l):[],...t?Su(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n),a&&e.addEventListener(`resize`,n)});let d=l&&s?Zu(l,n,a):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Au(e):null;c&&g();function g(){let t=Au(e);h&&!Xu(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var $u=Zl,ed=Ql,td=Gl,nd=Wl,rd=Jl,id=(e,t,n)=>{let r=new Map,i=n??{},a={...Yu,...i.platform,_c:r};return Ul(e,t,{...i,platform:a})},ad=class extends z{constructor(...e){super(...e),this.tooltipPlacement=`top`,this.iconStyle=`outline`,this.tabindex=0,this.align=`center`,this.showTooltip=async()=>{if(!this.tooltipElement||!this.arrowElement)return;this.tooltipElement.style.display=`block`,this.tooltipElement.style.visibility=`visible`,this.tooltipElement.style.opacity=`1`;let e=async()=>{if(!this.tooltipElement||!this.arrowElement)return;let{x:e,y:t,placement:n,middlewareData:r}=await id(this,this.tooltipElement,{placement:this.tooltipPlacement,strategy:`fixed`,middleware:[$u(6),td(),ed({padding:8}),nd({element:this.arrowElement})]});Object.assign(this.tooltipElement.style,{left:`${e}px`,top:`${t}px`});let{x:i,y:a}=r.arrow||{},o={top:`bottom`,right:`left`,bottom:`top`,left:`right`}[n.split(`-`)[0]];Object.assign(this.arrowElement.style,{left:i==null?``:`${i}px`,top:a==null?``:`${a}px`,right:``,bottom:``,[o]:`-4px`})};e(),this.cleanupAutoUpdate=Qu(this,this.tooltipElement,e)},this.hideTooltip=()=>{this.tooltipElement&&(this.tooltipElement.style.opacity=`0`,this.tooltipElement.style.visibility=`hidden`,this.tooltipElement.style.display=`none`,this.cleanupAutoUpdate&&=(this.cleanupAutoUpdate(),void 0))},this.handleClick=e=>{this.disabled&&(e.preventDefault(),e.stopPropagation())},this.handleKeydown=e=>{this.disabled||(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this.click())}}firstUpdated(){this.hasAttribute(`tabindex`)||this.setAttribute(`tabindex`,`0`),this.addEventListener(`keydown`,this.handleKeydown),this.addEventListener(`click`,this.handleClick),this.tooltip&&(this.addEventListener(`mouseenter`,this.showTooltip),this.addEventListener(`mouseleave`,this.hideTooltip),this.addEventListener(`focus`,this.showTooltip),this.addEventListener(`blur`,this.hideTooltip))}updated(e){e.has(`tooltip`)&&(this.tooltip?(this.addEventListener(`mouseenter`,this.showTooltip),this.addEventListener(`mouseleave`,this.hideTooltip),this.addEventListener(`focus`,this.showTooltip),this.addEventListener(`blur`,this.hideTooltip)):(this.removeEventListener(`mouseenter`,this.showTooltip),this.removeEventListener(`mouseleave`,this.hideTooltip),this.removeEventListener(`focus`,this.showTooltip),this.removeEventListener(`blur`,this.hideTooltip)))}removeTooltip(){this.tooltipElement=void 0,this.arrowElement=void 0,this.cleanupAutoUpdate&&=(this.cleanupAutoUpdate(),void 0),this.removeEventListener(`mouseenter`,this.showTooltip),this.removeEventListener(`mouseleave`,this.hideTooltip),this.removeEventListener(`focus`,this.showTooltip),this.removeEventListener(`blur`,this.hideTooltip)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(`keydown`,this.handleKeydown),this.removeEventListener(`click`,this.handleClick),this.removeTooltip(),this.highlightTimeout&&=(clearTimeout(this.highlightTimeout),void 0),this.classList.remove(`highlight`)}static{this.styles=O`

        :host {

            font-family: var( --thermal-font-family );
            font-size: calc( var( --thermal-fs ) * .8);
            line-height: var( --thermal-line-height );
        
            --color: var( --thermal-foreground );
            --color-hover: var( --color );

            --bg: var( --thermal-slate-light );
            --bg-hover: var( --bg );

            --border-width: var(--thermal-border-width);
            --border-style: var(--thermal-border-style);
            --border-color: var( --thermal-slate );
            --border-color-hover: var( --border-color );

            --radius: var( --custom-radius, var( --thermal-radius ) );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );
            
            --padding: .5em .7em;
            --icon-size: 1em;
            --gap: .5em;
            --opacity: 1;
            --letter-spacing: normal;

            --cursor: pointer;
            --transition-duration: .15s;

            --tooltip-bg: var(--thermal-foreground, black);
            --tooltip-color: var( --thermal-background, white);
            --tooltip-padding: 0.5em 0.75em;
            --tooltip-border-radius: var(--thermal-radius, 4px);
            --tooltip-font-size: 0.9em;
            --tooltip-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        }



        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 0;
            gap: var(--gap);
            vertical-align: middle;
            
            position: relative;

            margin: 0;
            padding: var(--padding);
            width: fit-content;
            box-sizing: border-box;

            border-width: var( --border-width );
            border-style: var( --border-style );
            border-color: var( --border-color );
            border-radius: var( --radius );
            
            background-color: var(--bg);
            color: var(--color);

            box-shadow: var( --shadow ); 
            
            cursor: var( --cursor );
            opacity: var( --opacity );
            
            --letter-spacing: var( --letter-spacing );
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;

            transition: all var(--transition-duration) ease-in-out;

            /* Focus styling */
            outline: none;

            
        }

        :host([align="left"]) {
            justify-content: flex-start;
        }


        :host(:focus),
        :host(:focus-visible),
        :host(:hover) {
            outline: none;
            box-shadow: var( --shadow-hover );
            background-color: var(--bg-hover);
            color: var(--color-hover);
            border-color: var( --border-color-hover );
        }

        svg,
        span {
            vertical-align: middle;
            display: inline-block;
        }



        :host([disabled=true]),
        :host([disabled="true"])
        :host([disabled="true"]:hover),
        :host([disabled="true"]:focus) {

            cursor: not-allowed;
            color: color-mix(in srgb, var(--color) 50%, transparent);
            background: color-mix(in srgb, var(--bg) 50%, transparent);
            border-color: color-mix(in srgb, var(--border-color) 50%, transparent);
            --cursor: not-allowed;
            --shadow: none;
            --shadow-hover: none;

            button {
                outline: 0 !important;
                pointer-events: none;
            }
        }


        :host([interactive="false"]),
        :host([interactive=false]),
        :host([interactive="false"]:hover),
        :host([interactive=false]:hover),
        :host([interactive="false"]:focus),
        :host([interactive=false]:focus) {
            --shadow-hover: none;
            --cursor: text;
            --color-hover: var( --color );
            --bg-hover: var( --bg );
        }





        :host([size="sm"]),
        :host([size=sm]) {
            --padding: .1em .2em;
            line-height: 1.2;
            --letter-spacing: 0.5px;
            font-size: .7em;
        }

        :host([size="lg"]),
        :host([size=lg]) {
            --padding: .7em .9em;
            line-height: 1.2;
            font-size: 1em;
        }

        :host([size="xl"]),
        :host([size=xl]) {
            line-height: 1.2;
            font-size: 2em;
        }

        :host([plain="true"]),
        :host([plain=true]) {
            --border-color: transparent;
            --border-color-hover: transparent;
            --border-width: 0px;
            border: none !important;
        }







        :host([variant="primary"]),
        :host([variant=primary]) {
            
            --color: var( --thermal-background );
            --color-hover: var( --thermal-background );
            
            --bg: var( --thermal-primary );
            --bg-hover: var( --thermal-primary-dark );

            --border-color: var( --thermal-slate );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );

        }

        :host([variant="foreground"]),
        :host([variant=foreground]) {

            --color: var( --thermal-background );
            --color-hover: var( --thermal-background );
            
            --bg: var( --thermal-foreground );
            --bg-hover: var( --thermal-slate-dark );

            --border-color: var( --thermal-slate );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );
        }


        :host([variant="background"]),
        :host([variant=background]) {

            --color: var( --thermal-foreground );
            --color-hover: var( --thermal-foreground );
            
            --bg: var( --thermal-background );
            --bg-hover: var( --bg );

            --border-color: var( --thermal-slate );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );
        }



        :host([variant="text"]),
        :host([variant=text]) {

            --bg: transparent;
            --bg-hover: transparent;

            --border-color: transparent;
            --border-color-hover: transparent;

            --border-width: 0px;
            border: none !important;

            --shadow: none;
            --shadow-hover: none;

            --padding: 0px;
            --letter-spacing: normal;
        }

        



        .btn-icon {
            width: 1.3em;
        }


        /* Global tooltip styles */

        .thermal-tooltip {
            background-color: var(--tooltip-bg, #334155);
            color: var(--tooltip-color, white);
            padding: var(--tooltip-padding, 0.5em 0.75em);
            border-radius: var(--tooltip-border-radius, 4px);
            font-size: var(--tooltip-font-size, 1em);
            box-shadow: var(--tooltip-box-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
            z-index: 9999;
            pointer-events: none;
            word-wrap: break-word;
            font-size: calc( var( --thermal-fs ) * 0.8 );
        }

        .thermal-tooltip-arrow {
            position: absolute;
            width: 8px;
            height: 8px;
            background: inherit;
            transform: rotate(45deg);
        }

        .prefix {
            font-weight: bold;
            padding-right: 0.25em;
        }

        .badge {
            position: absolute;
            top: 0;
            right: 0;
            width: .5em;
            height: .5em;
            background: red;
            border-radius: 50%;
        }

        /* highlight animation for attention-grabbing effect */
        @keyframes thermal-highlight {
            0%,100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        :host(.highlight) {
            animation: thermal-highlight 0.4s ease-in-out infinite;
            box-shadow: var(--thermal-shadow);
        }

    `}renderBadge(){return this.badge?k`<span class="badge" style="background-color: ${this.badge}"></span>`:A}highlight(e){if(e<=0)return;this.highlightTimeout&&=(clearTimeout(this.highlightTimeout),void 0),this.classList.add(`highlight`);let t=()=>{this.classList.remove(`highlight`),this.highlightTimeout&&=(clearTimeout(this.highlightTimeout),void 0),this.removeEventListener(`mouseenter`,t),this.removeEventListener(`focus`,t)};this.addEventListener(`mouseenter`,t),this.addEventListener(`focus`,t),this.highlightTimeout=window.setTimeout(t,e)}render(){let e=A;if(this.icon&&this.icon in Oa){let t=Oa[this.icon];typeof t[this.iconStyle]==`function`&&(e=t[this.iconStyle](`btn-icon`))}let t=A;return this.tooltip&&(t=k`
                <div
                    class="thermal-tooltip"
                    style="display: none; position: fixed; top: 0; left: 0; visibility: hidden; opacity: 0; transition: opacity 0.2s ease-in-out;"
                    @mouseenter=${this.showTooltip}
                    @mouseleave=${this.hideTooltip}
                    @focus=${this.showTooltip}
                    @blur=${this.hideTooltip}
                    ${W(e=>{this.tooltipElement=e})}
                >
                    ${this.tooltip}
                    <div class="thermal-tooltip-arrow" ${W(e=>{this.arrowElement=e})}></div>
                </div>
            `),k`
            ${Is(e)}${this.pre?k`<span class="prefix">${this.pre}</span>`:A}<slot></slot>
            ${t}
            ${this.renderBadge()}
        `}};R([V({type:String,attribute:`tooltip-placement`})],ad.prototype,`tooltipPlacement`,void 0),R([V({type:String})],ad.prototype,`pre`,void 0),R([V({type:String,attribute:!0,reflect:!0})],ad.prototype,`variant`,void 0),R([V({type:String,attribute:!0,reflect:!0})],ad.prototype,`size`,void 0),R([V({type:String})],ad.prototype,`icon`,void 0),R([V({type:String})],ad.prototype,`iconStyle`,void 0),R([V({type:String,converter:l(!1)})],ad.prototype,`disabled`,void 0),R([V({type:String,converter:l(!1)})],ad.prototype,`interactive`,void 0),R([V({type:Boolean,attribute:!0})],ad.prototype,`plain`,void 0),R([V({type:String})],ad.prototype,`tooltip`,void 0),R([V({type:Number,reflect:!0})],ad.prototype,`tabindex`,void 0),R([V({type:String,attribute:`badge`,reflect:!0})],ad.prototype,`badge`,void 0),R([V({type:String,reflect:!0})],ad.prototype,`align`,void 0);var od=class extends wa{constructor(...e){super(...e),this.button=N(L.close),this.dialogRef=U(),this.closeButtonRef=U(),this.invokerRef=U(),this.isFullscreen=!1,this._open=!1}static{this.shadowRootOptions={...wa.shadowRootOptions,mode:`open`}}get open(){return this._open}setClose(){this.dialogRef.value?.close(),window.document.body.style.removeProperty(`overflow-y`),window.document.body.style.removeProperty(`height`),this.removeAttribute(`open`),this._open=!1,this.onCloseEveryTime&&this.onCloseEveryTime()}setOpen(){this.dialogRef.value?.showModal(),window.document.body.style.overflowY=`hidden`,window.document.body.style.height=`100vh`,this.setAttribute(`open`,`true`),this._open=!0}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`open`&&(n===`true`?this.setOpen():this.setClose())}connectedCallback(){super.connectedCallback()}static{this.styles=O`

        :host {

            display: contents;

        }

        .dialog {
            background: var( --thermal-slate-light );
            color: var( --thermal-foreground );
            border-style: var( --thermal-border-style );
            border-radius: var( --thermal-radius );
            border-color: var( --thermal-slate );
            border-width: var(--thermal-border-width);
            padding: calc( var( --thermal-gap ) * 1.5 );
            font-size: var( --thermal-fs-small );

            &::backdrop {
                backdrop-filter: blur(3px);
            }

            min-width: 150px;
            box-sizing: border-box;

            @media ( min-width: 300px ) {
                min-width: 250px;
            }

            @media ( min-width: 600px ) {
                min-width: 450px;
            }
        }

        .dialog-header {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between; 
        }

        .dialog-title {
            margin: 0;
            padding: 0;
        }

        .dialog-content {
            padding: var( --thermal-gap ) 0;
            white-space: normal;
        }

        .dialog-footer {

            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;

        }

        

        .dialog-close {

            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: var( --thermal-foreground );
            cursor: pointer;

            width: calc( var( --thermal-gap ) * 1.5);

            &:hover {
                color: var( --thermal-primary );
            }
        
        }

        :host([is-fullscreen="true"][open]) .dialog {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            display: grid;
            grid-template-rows: auto 1fr auto;

            .dialog-content {
                overflow: auto;
            }
        }

        
    
    `}render(){return k`
            <slot name="invoker" ${W(this.invokerRef)} @click=${this.setOpen}></slot>
            <dialog ${W(this.dialogRef)} class="dialog">

                <header class="dialog-header">

                    <h2 class="dialog-title">${this.label}</h2>

                    <button class="dialog-close" ${W(this.closeButtonRef)} @click=${this.setClose}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                    </button>
                
                
                </header>
                	
                <div class="dialog-content">
                    ${this._open?k`<slot name="content"></slot>`:A}
                </div>

                <div class="dialog-footer">
                    <slot name="button"></slot>
                    <thermal-btn variant="foreground" @click=${async()=>{this.beforeClose?await this.beforeClose()&&this.setClose():this.setClose()}}>
                        ${this.button}
                    </thermal-btn>
                </div>
                
            
            </dialog>
        `}async closeFromTheOutside(){this.beforeClose?await this.beforeClose()&&this.setClose():this.setClose()}};R([V({type:String,reflect:!1})],od.prototype,`button`,void 0),R([V({type:Boolean,reflect:!0,converter:l(!1),attribute:`is-fullscreen`})],od.prototype,`isFullscreen`,void 0),R([V({type:String,reflect:!0})],od.prototype,`label`,void 0),R([V({type:Object})],od.prototype,`beforeClose`,void 0),R([H()],od.prototype,`_open`,void 0),R([V({type:Object})],od.prototype,`onCloseEveryTime`,void 0);var sd=zo(class extends Bo{constructor(e){if(super(e),e.type!==Ro.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return oa}}),cd=class extends z{constructor(...e){super(...e),this.dropdownRef=U(),this.invokerRef=U(),this.optionsRef=U(),this.isOpen=`close`,this.interactive=`on`}static{this.shadowRootOptions={...wa.shadowRootOptions}}setOpen(){this.isOpen=`open`}setClose(){this.isOpen=`close`}toggle(){this.interactive!==`off`&&(this.isOpen=this.isOpen===`open`?`close`:`open`)}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}placeOptions(){this.invokerRef.value&&this.optionsRef.value&&id(this.invokerRef.value,this.optionsRef.value,{middleware:[$u(2),td(),rd(),ed()],placement:`bottom-start`,strategy:`fixed`}).then(({x:e,y:t})=>{this.optionsRef.value&&(this.optionsRef.value.style.left=`${e}px`,this.optionsRef.value.style.top=`${t}px`)})}updated(e){super.updated(e),e.has(`isOpen`)&&this.placeOptions()}firstUpdated(e){super.firstUpdated(e),this._options.forEach(e=>{e.childNodes.forEach(e=>e.addEventListener(`click`,()=>{this.setClose()}))})}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n),e===`isopen`&&(n===`open`?(this.optionsRef.value?.classList.add(`dropdown-options__show`),this.dropdownRef.value?.classList.add(`dropdown__open`)):(this.optionsRef.value?.classList.remove(`dropdown-options__show`),this.dropdownRef.value?.classList.remove(`dropdown__open`)))}static{this.styles=O`

        .mayNot {
            opacity: .5;
            cursor: not-allowed;
        }

        .dropdown {
            width: max-content;
        }

        .dropdown-invoker {
            width: max-content;
            display: flex;
        }

        .dropdown-invoker-wrapper {
            display: flex;
            align-items: center;
        }

        .dropdown-invoker-wrapper-icon {
            width: calc( var( --thermal-gap ) * .856 );
            line-height: 0;
            padding-left: calc( var( --thermal-gap ) * .5 );
        }

        .dropdown-options {

            z-index: 9999;

            width: max-content;
            /** position: absolute; */
            position: fixed;
            top: 0;
            left: 0;
            
            padding: 5px 10px;

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );

            background-color: var( --thermal-slate-light );

            box-shadow: var( --thermal-shadow );

            display: none;

            ::slotted( div:not(:last-child) ) {
                margin-bottom: calc( var( --thermal-gap ) * .5 );
            }

        }

        .dropdown-options__show {
            display: block;
        }

        .clicker {
            display: none;
        }

        .dropdown__open {
        
            .clicker {
                z-index: 9998;
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
            }
        }

        slot[name="option"]::slotted(*) {

            width: 100%;

            margin-top: 5px;
            margin-bottom: 5px;
            width: 100%;

        }


    
    `}render(){let e={"dropdown-invoker":!0,may:this.interactive===`on`,mayNot:this.interactive===`off`},t=this.interactive===`off`?`true`:`false`;return k`

            <div class="dropdown" ${W(this.dropdownRef)}>
                <thermal-btn 
                    ${W(this.invokerRef)} 
                    class="${sd(e)}" 
                    @click=${this.toggle.bind(this)} 
                    variant=${B(this.variant)}
                    size=${B(this.size)}
                    icon="${B(this.icon)}"
                    iconStyle="${B(this.iconStyle)}"
                    ?plain=${this.plain}
                    disabled=${t}
                    tooltip="${this.tooltip===void 0?``:this.tooltip}"
                    part="invoker"
                >
                    <div class="dropdown-invoker-wrapper">
                        <slot name="invoker">
                            <div>Dropdown</div>
                        </slot>
                        <div class="dropdown-invoker-wrapper-icon">
                        ${this.isOpen===`close`?k`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>`:k`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>`}
                        </div>
                    </div>
                </thermal-btn>
                <div class="clicker" @click=${this.setClose}></div>
                <div class="dropdown-options" ${W(this.optionsRef)} >
                    <slot name="option"></slot>
                </div>
            
            </div>
        `}};R([il({slot:`option`})],cd.prototype,`_options`,void 0),R([V({type:String,reflect:!0})],cd.prototype,`isOpen`,void 0),R([V({type:String,reflect:!0,attribute:!0})],cd.prototype,`interactive`,void 0),R([V({type:String,reflect:!0})],cd.prototype,`variant`,void 0),R([V({type:String,reflect:!0,attribute:!0})],cd.prototype,`size`,void 0),R([V({type:String})],cd.prototype,`plain`,void 0),R([V({type:String,attribute:!0})],cd.prototype,`tooltip`,void 0),R([V({type:String,reflect:!0})],cd.prototype,`icon`,void 0),R([V({type:String,reflect:!0})],cd.prototype,`iconStyle`,void 0);var ld=class extends z{static{this.styles=O`
    
        :host {
            display: block;
            box-sizing: border-box;

            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);

            

            border: var(--thermal-border-width) var(--thermal-slate)var(--thermal-border-style);
            border-radius: var(--thermal-radius);

            transition: all .5s ease-in-out;

            position: relative;
            overflow: hidden;

            cursor: pointer;
            
        }

        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transition: all .3s ease-in-out;

            background: radial-gradient(circle, var(--thermal-slate-light) 0%, var(--thermal-slate) 100%);
        }

        .content {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            padding: var(--thermal-gap);
            box-sizing: border-box;
        }

        :host {
        
            &:hover,
            &:focus {
            
                .bg {
                    transform: scale(1.05);
                }
            
            }
        
        }

        :host(:hover),
        :host(:focus) {
        
            .bg {
                transform: scale(1.05);
            }

        
        }
    
    `}render(){return k`
            <div class="bg"></div>
            <div class="content">
                <div>Thermal Dropin Component</div>
            </div>
        `}};R([V({type:String})],ld.prototype,`prompt`,void 0);var ud=class extends z{constructor(...e){super(...e),this.closeIcon=!1,this.iconStyle=`outline`,this.expanded=!1}static{this.styles=O`
:host {
    --color: var(--thermal-foreground);
    --background: var(--thermal-slate-light);
    --font-size: var(--thermal-fs);
    --border-color: var(--thermal-slate);
    --border-radius: var(--thermal-radius);
    --display: block;
    --position: relative;
    --width: 100%;
    --padding: var(--thermal-gap);
    --spacing: var(--thermal-gap);
    --box-shadow: none;

    font-size: var(--font-size);
    color: var(--color);
}

aside.content {

    display: none;
    position: var(--position);

    box-sizing: border-box;
    width: var(--width);
    box-sizing: border-box;

    background: var(--background);
    border: var(--thermal-border-width) var(--thermal-border-style) var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--padding);
    box-shadow: var(--box-shadow);

}

:host([expanded="true"]) aside.content {
    display: var(--display);
    margin-top: var(--spacing);
}

thermal-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
}
`}render(){return k`<thermal-btn
    .variant=${B(this.expanded&&this.variantExpanded?this.variantExpanded:this.variant)}
    .size=${B(this.size)}
    .icon=${B(this.icon)}
    .iconStyle=${this.iconStyle}
    .disabled=${B(this.disabled)}
    .plain=${B(this.plain)}
    .tooltip=${B(this.tooltip)}
    .interactive=${B(this.interactive)}
    @click=${()=>this.expanded=!this.expanded}
>${B(this.label)}${this.closeIcon&&this.expanded?k`<thermal-icon
    icon="close"
    variant="micro"
></thermal-icon>`:A}</thermal-btn>
<aside class="content">
    <slot></slot>
</aside>
`}};R([V({type:String})],ud.prototype,`label`,void 0),R([V({attribute:!0,reflect:!0,converter:l(!1)})],ud.prototype,`closeIcon`,void 0),R([V({type:String,attribute:!0,reflect:!0})],ud.prototype,`variant`,void 0),R([V({type:String,attribute:!0,reflect:!0})],ud.prototype,`variantExpanded`,void 0),R([V({type:String,attribute:!0,reflect:!0})],ud.prototype,`size`,void 0),R([V({type:String})],ud.prototype,`icon`,void 0),R([V({type:String})],ud.prototype,`iconStyle`,void 0),R([V({type:String,converter:l(!1)})],ud.prototype,`disabled`,void 0),R([V({type:String,converter:l(!1)})],ud.prototype,`interactive`,void 0),R([V({type:Boolean,attribute:!0})],ud.prototype,`plain`,void 0),R([V({type:String})],ud.prototype,`tooltip`,void 0),R([V({converter:l(!1),reflect:!0})],ud.prototype,`expanded`,void 0);var dd=class extends wa{static{this.styles=O`
    
        :host {

            display: table-row;
            width: 100%;
            font-size: var( --thermal-fs );

        }

        .cell {

            display: table-cell;
            padding: calc( var( --thermal-gap ) * .5 );
        
        }

        .label {

        }

        .content {

        }

        .hint {
            font-size: calc( var( --thermal-fs-sm ) * .75 );
            padding-top: .5em;
            opacity: .5;
            max-width: 300px;
        }

    `}render(){return k`

            <div class="cell">${this.label}</div>

            <div class="cell">

                <div class="content">
                    <slot></slot>
                </div>

                ${this.hint&&k`
                <div class="hint">
                    ${this.hint}
                </div>`}

            </div>
        
        `}};R([V({type:String})],dd.prototype,`label`,void 0),R([V({type:String})],dd.prototype,`hint`,void 0);var fd=class extends z{connectedCallback(){super.connectedCallback(),this.updateIcon()}updated(e){super.updated(e),this.updateIcon()}updateIcon(){if(this.icon===void 0||this.icon.trim()===``||this.variant===void 0||this.variant.trim()===``)this.element=void 0;else{let e=Oa[this.icon&&this.icon.trim()!==``?this.icon:!1];if(e&&this.variant in e){let t=e[this.variant];this.element=t(this.classes,this.css)}}}render(){return this.element?k`${Is(this.element)}`:A}};R([V({type:String,reflect:!0})],fd.prototype,`icon`,void 0),R([V({type:String,reflect:!0})],fd.prototype,`variant`,void 0),R([V({type:String,reflect:!0})],fd.prototype,`classes`,void 0),R([V({type:String,reflect:!0})],fd.prototype,`css`,void 0),R([H()],fd.prototype,`element`,void 0);var pd=class extends z{constructor(...e){super(...e),this.loaded=!1,this.loading=!0,this.bordercolor=`var(--thermal-slate)`,this.bgcolor=`var(--thermal-slate-light)`,this.textcolor=`var(--thermal-slate-dark)`}updated(e){super.updated(e),this.style.borderColor=this.bordercolor,this.style.backgroundColor=this.bgcolor,this.style.color=this.textcolor}static{this.styles=O`
    
        :host {
            font-size: var(--thermal-fs);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: .5em;
            width: 100%;
            min-height: 300px;

            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            
            box-sizing: border-box;
            padding: var(--thermal-gap);
            color: var(--thermal-slate-dark);
            background: var(--thermal-slate-light);
            
        }
    
    `}render(){let e=[];return this.loading?e.push(k`<thermal-spinner style="display: block"></thermal-spinner>`):(e.push(k`<thermal-icon icon="${this.icon}" variant="${this.iconStyle}" style="height: 2em; aspect-ratio: 1 / 1; display: block;"></thermal-icon>`),this.message&&e.push(k`<div>${this.message}</div>`)),e.push(k`<slot></slot>`),e}};R([H()],pd.prototype,`loaded`,void 0),R([V({type:Boolean,reflect:!0})],pd.prototype,`loading`,void 0),R([V({type:String})],pd.prototype,`icon`,void 0),R([V({type:String})],pd.prototype,`iconStyle`,void 0),R([V({type:String})],pd.prototype,`message`,void 0),R([V({type:String})],pd.prototype,`bordercolor`,void 0),R([V({type:String})],pd.prototype,`bgcolor`,void 0),R([V({type:String})],pd.prototype,`textcolor`,void 0);var md=class extends z{constructor(...e){super(...e),this.type=`radio`,this.checked=!1}handleChange(e){let t=e.target;this.checked=t.checked,this.onChange&&this.onChange(this.checked),this.requestUpdate()}updated(e){if(e.has(`checked`)){let e=this.shadowRoot?.querySelector(`input`);e&&(e.checked=this.checked)}}handleClick(e){e.preventDefault(),this.checked=!this.checked,this.onChange&&this.onChange(this.checked),this.requestUpdate()}connectedCallback(){super.connectedCallback()}static{this.styles=O`
    
        :host {
            display: contents;
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
        }

        .radio {

            display: flex;
            align-items: center;
            gap: .25em;

            cursor: pointer;

            input,
            span {
                display: block;
            }

            span {
                font-size: .8em;
            }

            input[type="radio"] {
                transform: translateY(-.15em);
                pointer-events: none;
            }
        }

        input {    
            pointer-events: none;
        }
    
    `}render(){return k`
            <label class="radio" @click=${this.handleClick}>
                <input
                    type="${this.type}"
                    checked="${this.checked}"
                />
                <span><slot></slot></span>
            </label>
        `}};R([V({type:String,reflect:!0})],md.prototype,`type`,void 0),R([V({type:Boolean,reflect:!0})],md.prototype,`checked`,void 0),R([V({type:Function})],md.prototype,`onChange`,void 0);var hd=class extends z{constructor(...e){super(...e),this._slottedElements=[]}get slottedElements(){return Array.from(this.children)}handleSlotChange(e){let t=e.target;this._slottedElements=t.assignedElements(),this.requestUpdate()}static{this.styles=O`

        :host {
            font-size: var( --thermal-fs );
        }
    
        h3 {

            margin: 0 0 .5em 0;
            padding: 0;
            
            font-weight: normal;
            font-size: .7em;
            text-transform: uppercase;

            color: var(--thermal-slate);
            
            display: flex;
            align-items: center;
            gap: .5em;

            &::after {
                content: "";
                flex: 1;
                height: var(--thermal-border-width);
                background: var(--thermal-slate-light);
            }

        }

        .content {
            display: flex;
            flex-wrap: wrap;
            gap: .5em;
        }

        :host(:hover) {
            h3 {
                color: var(--thermal-foreground);
                &::after {
                    background: var(--thermal-slate);
                }
            }


        }
    
    `}render(){return this.slottedElements.length===0?A:k`<section>

            ${this.label?k`<h3>${this.label}</h3>`:A}
            <div class="content">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        </section>
        `}};R([V()],hd.prototype,`label`,void 0),R([H()],hd.prototype,`_slottedElements`,void 0);var gd=class extends z{constructor(...e){super(...e),this.color=`var(--thermal-primary)`}static{this.shadowRootOptions={...wa.shadowRootOptions,mode:`open`}}static{this.styles=O`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
            text-align: center;
        }
        .spinner {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 5px solid var(--thermal-primary);
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .message {
            margin-top: var(--thermal-gap);
            color: var(--thermal-slate-dark);
        }
    `}render(){return k`
            <div class="spinner" style="border-color: ${this.color}; border-top-color: transparent;"></div>
            ${this.message?k`<div class="message">${this.message}</div>`:A}
        `}};R([V({type:String})],gd.prototype,`message`,void 0),R([V({type:String})],gd.prototype,`color`,void 0);var _d=class extends z{constructor(...e){super(...e),this.icon=`bulb`,this.iconStyle=`outline`}static{this.styles=O`
:host {

    --color: var(--thermal-foreground);
    --background: var(--thermal-slate-light);
    --font-size: var(--thermal-fs);
    --border-color: var(--thermal-slate);
    --icon-size: 1.5em;
    --radius: var(--thermal-radius);
    --padding: .5em;
    --spacing: var(--thermal-gap);
    --align-items: flex-start;

    font-size: var(--font-size);
    color: var(--color);
    background: var(--background);
    
    border: var(--thermal-border-width) var(--thermal-border-style) var(--border-color);
    border-radius: var(--radius);

    width: 100%;
    box-sizing: border-box;
    padding: var(--padding);

    display: flex;
    align-items: var(--align-items);
    gap: var(--spacing);

}

thermal-icon {
    display: block;
    width: var(--icon-size);
    height: var(--icon-size);
    color: var(--border-color);
}

:host( [variant="info"] ) {
    --background: #bed5fdff;
    --color: #0e46a1;
    --border-color: var(--color);
}

:host([variant="error"]) {
    --background: #e2b1b1ff;
    --color: #a10e0e;
    --border-color: var(--color);
}
`}render(){return k`<thermal-icon 
    icon=${this.icon} 
    variant=${this.iconStyle}
></thermal-icon>
<div class="tip-content">
    <slot></slot>
</div>`}};R([V({type:String})],_d.prototype,`icon`,void 0),R([V({type:String})],_d.prototype,`iconStyle`,void 0);var vd=class extends z{get managerObject(){return this.managerController.managerObject}};R([I({context:Wc,subscribe:!0})],vd.prototype,`managerController`,void 0);var yd=class extends vd{get registryObject(){return this.registryController.registryObject}};R([I({context:jc,subscribe:!0})],yd.prototype,`registryController`,void 0);var bd=class extends yd{get groupObject(){return this.groupController.groupObject}};R([I({context:_c,subscribe:!0})],bd.prototype,`groupController`,void 0);var xd=class extends bd{constructor(...e){super(...e),this.fileController=new hc(this),this.loading=!1,this.ready=!1,this.ms=0,this.playbackSpeed=1,this.recording=!1,this.playing=!1,this.analyses=[],this.autoHighlight=!1}static{this.properties={...hc.HOST_PROPERTIES}}recieveInstance(e){this.fileController.receiveInstance(e)}removeInstance(){this.fileController.removeInstance()}deleteFile(){this.file&&this.removeInstance()}render(){return k`
            <slot></slot>
            <slot name="mark"></slot>
            <slot name="analysis"></slot>
        `}},Sd=class extends yd{constructor(...e){super(...e),this.groupController=new yc(this),this.autoclearGroup=!0}static{this.properties={...yc.HOST_PROPERTIES}}render(){return k`<slot></slot>`}},Cd=class extends z{constructor(...e){super(...e),this.managerController=new Qc(this),this.palette=`jet`,this.advancedPalettes=!1,this.smoothThermograms=!1,this.smoothGraph=!1,this.autoclear=!1}static{this.properties={...Qc.HOST_PROPERTIES}}disconnectedCallback(){super.disconnectedCallback(),this.autoclear===!0&&this.managerObject!==void 0&&Uc(this.managerObject)}render(){return k`<slot></slot>`}};R([V({type:String,reflect:!0})],Cd.prototype,`palette`,void 0),R([V({type:Boolean,reflect:!0})],Cd.prototype,`advancedPalettes`,void 0),R([V({type:String,reflect:!0})],Cd.prototype,`smoothThermograms`,void 0),R([V({type:String,reflect:!0})],Cd.prototype,`smoothGraph`,void 0);var wd=class extends vd{constructor(...e){super(...e),this.registryController=new Bc(this),this.opacity=1,this.loading=!1,this.autoclear=!1}static{this.properties={...Bc.HOST_PROPERTIES}}disconnectedCallback(){super.disconnectedCallback(),this.autoclear===!0&&this.registryObject!==void 0&&this.managerObject.removeRegistry(this.registryObject.id)}render(){return k`<slot></slot>`}},Td=class extends bd{constructor(...e){super(...e),this.fileIsLoading=!1,this.fileIsRecording=!1}getUUID(){return`${this.UUID}__internal_callback`}connectedCallback(){super.connectedCallback(),this.hookCallbacks()}disconnectedCallback(){super.disconnectedCallback(),this.fileController&&(this.fileController.onSuccess.delete(this.UUID),this.fileController.onFailure.delete(this.UUID))}hookCallbacks(){if(this.fileController)this.fileController.onSuccess.set(this.UUID,e=>{this.onInstanceCreated(e)}),this.fileController.onFailure.set(this.UUID,e=>{this.onFailure(e)});else throw Error(`Tento komponent není v souboru!`)}};R([I({context:ec,subscribe:!0})],Td.prototype,`fileController`,void 0),R([I({context:rc,subscribe:!0}),H()],Td.prototype,`fileIsLoading`,void 0),R([I({context:tc,subscribe:!0}),H()],Td.prototype,`file`,void 0),R([I({context:nc,subscribe:!0}),H()],Td.prototype,`failure`,void 0),R([I({context:dc,subscribe:!0}),H()],Td.prototype,`fileIsRecording`,void 0),class extends z{static{this.styles=O`

        .content {
            color: var( --thermal-foreground );
        }

        hr {
            border-top-color: currentcolor;
            border-bottom-width: 0;
        }

        small {
            opacity: .5;
        }

        a {
            color: var( --thermal-primary );
        }

        .logo {
            max-width: 200px;
            margin: 0 auto;
            padding: var( --thermal-gap ) 0;
            svg {
                width: 100%;
                height: auto;
            }
        }

        .row {

            &:not(:last-child) {
                padding-bottom: var( --thermal-gap );
                padding-top: var( --thermal-gap );
            }
        
        }

        @media ( min-width: 700px ) {
            .row {

                display: flex;
                flex-wrap: wrap;

                margin: 0 calc( var( --thermal-gap ) * -1 );

                & > div {

                    box-sizing: border-box;
                    width: 50%;
                    padding: 0 var( --thermal-gap );

                }
            
            }
        
        }
    
    `}render(){return k`
            <thermal-dialog label="Thermal images in the browser">
                <thermal-btn slot="invoker">About</thermal-btn>
                <div slot="content">
                    <div class="content">
                        <div class="logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="531.66" height="166.67" viewBox="0 0 531.66 166.67">
                                <g id="Vrstva_2" data-name="Vrstva 2">
                                    <g id="Podkres">
                                        <path
                                            d="M286.47,78.12c-1.77-1.54-4.43-2.32-8-2.32H261.56V95.59H278.5c3.54,0,6.2-.78,8-2.36s2.66-4.14,2.66-7.68S288.25,79.66,286.47,78.12Z" 
                                            fill="currentcolor"
                                            />
                                        <path
                                            d="M262,0,186,29.54h-.21V166.67h152V29.54H338ZM232.52,134.09H217.06V63.79h15.46Zm58.68,0a27.45,27.45,0,0,1-1.58-8c-.19-3.08-.49-6-.88-8.86-.53-3.67-1.64-6.36-3.35-8.07s-4.5-2.56-8.37-2.56H261.56v27.47H246.11V63.79H284a22.61,22.61,0,0,1,8.52,1.53A19.8,19.8,0,0,1,299,69.5a18.2,18.2,0,0,1,4.13,6.16,19.75,19.75,0,0,1,1.43,7.53A21.14,21.14,0,0,1,302,93.92a16.37,16.37,0,0,1-8.52,6.89v.2a11.89,11.89,0,0,1,4.73,2.41,13.28,13.28,0,0,1,3.05,3.84,17.8,17.8,0,0,1,1.72,4.87,42.51,42.51,0,0,1,.74,5.32c.07,1.12.13,2.43.2,3.94s.18,3,.35,4.63a30.6,30.6,0,0,0,.78,4.47,10.2,10.2,0,0,0,1.63,3.6Z"
                                            fill="currentcolor"
                                         />
                                        <path d="M414,63.79v13H376.89V91.85H411v12H376.89v17.23H414.8v13H361.43V63.79Z" fill="currentcolor" />
                                        <path
                                            d="M459.89,127.59a14.43,14.43,0,0,1-6.45,6,23.53,23.53,0,0,1-19.05-.4,20,20,0,0,1-7.14-6,27.21,27.21,0,0,1-4.23-8.72,36.59,36.59,0,0,1-1.43-10.23A34.4,34.4,0,0,1,423,98.3a25.75,25.75,0,0,1,4.23-8.42,20.53,20.53,0,0,1,16.89-8.07,20,20,0,0,1,8.61,1.92,15,15,0,0,1,6.45,5.66h.2V63.79h14v70.3H460.09v-6.5Zm-.59-25.15a14.68,14.68,0,0,0-2-5.12,11.34,11.34,0,0,0-3.69-3.6,10.83,10.83,0,0,0-5.71-1.38,11.33,11.33,0,0,0-5.81,1.38,10.93,10.93,0,0,0-3.79,3.64,16.39,16.39,0,0,0-2.07,5.17,27.93,27.93,0,0,0-.64,6.06,25.91,25.91,0,0,0,.69,5.91,16,16,0,0,0,2.22,5.26,12,12,0,0,0,3.84,3.74,10.29,10.29,0,0,0,5.56,1.43,11.12,11.12,0,0,0,5.76-1.38,10.36,10.36,0,0,0,3.69-3.69,16.42,16.42,0,0,0,2-5.27,31.24,31.24,0,0,0,.59-6.1A30.51,30.51,0,0,0,459.3,102.44Z" fill="currentcolor" />
                                        <path
                                            d="M518.37,134.09V127h-.29a15.75,15.75,0,0,1-6.9,6.4,20.37,20.37,0,0,1-8.66,2,24.39,24.39,0,0,1-9.21-1.48,13.32,13.32,0,0,1-5.66-4.18,16.59,16.59,0,0,1-2.9-6.6,40.82,40.82,0,0,1-.84-8.61V83.19h14v28.75q0,6.3,2,9.4t7,3.1q5.72,0,8.27-3.4t2.56-11.17V83.19h14v50.9Z" fill="currentcolor"/>
                                        <path d="M15.46,63.79v57.3H49.72v13H0V63.79Z" fill="currentcolor"/>
                                        <path
                                            d="M56.32,98.84a16.13,16.13,0,0,1,2.46-8.17,16.77,16.77,0,0,1,5.51-5.22,23.86,23.86,0,0,1,7.53-2.8,42.71,42.71,0,0,1,8.42-.84,57.28,57.28,0,0,1,7.78.54,23.87,23.87,0,0,1,7.19,2.12,14.2,14.2,0,0,1,5.31,4.38,12.23,12.23,0,0,1,2.07,7.43v26.49a53.68,53.68,0,0,0,.39,6.59,12.18,12.18,0,0,0,1.38,4.73H90.18a21.91,21.91,0,0,1-.64-2.41,20.76,20.76,0,0,1-.34-2.51A18.29,18.29,0,0,1,81.32,134a31.55,31.55,0,0,1-9.25,1.38,25,25,0,0,1-6.79-.89,15.64,15.64,0,0,1-5.52-2.75A13,13,0,0,1,56.07,127a15.91,15.91,0,0,1-1.33-6.79,14.81,14.81,0,0,1,1.53-7.14,12.72,12.72,0,0,1,3.94-4.48,17.47,17.47,0,0,1,5.51-2.51A58.91,58.91,0,0,1,72,104.75q3.15-.5,6.2-.79a36.91,36.91,0,0,0,5.42-.89,9.35,9.35,0,0,0,3.74-1.72,3.79,3.79,0,0,0,1.28-3.3,7.44,7.44,0,0,0-.74-3.59,5.45,5.45,0,0,0-2-2.07,7.7,7.7,0,0,0-2.85-1,22.69,22.69,0,0,0-3.5-.25,10.63,10.63,0,0,0-6.5,1.77c-1.57,1.19-2.49,3.15-2.75,5.91Zm32.29,10.34a6.25,6.25,0,0,1-2.22,1.23,22.33,22.33,0,0,1-2.85.74c-1,.2-2.09.36-3.2.49s-2.23.3-3.35.49a25.6,25.6,0,0,0-3.1.79,9.21,9.21,0,0,0-2.66,1.33,6.34,6.34,0,0,0-1.82,2.12,6.78,6.78,0,0,0-.69,3.25,6.61,6.61,0,0,0,.69,3.15,5.25,5.25,0,0,0,1.87,2,7.85,7.85,0,0,0,2.76,1,17.31,17.31,0,0,0,3.25.29,12.37,12.37,0,0,0,6.4-1.37,9.19,9.19,0,0,0,3.34-3.3,10.36,10.36,0,0,0,1.33-3.89,25.55,25.55,0,0,0,.25-3.15Z" fill="currentcolor"/>
                                        <path
                                            d="M127.4,63.79v25.6h.2a15,15,0,0,1,6.94-5.76,23.54,23.54,0,0,1,9.1-1.82A19.34,19.34,0,0,1,158,88.21a24.53,24.53,0,0,1,4.87,8.32,34.8,34.8,0,0,1,1.87,12.06,34.8,34.8,0,0,1-1.87,12.06A24.62,24.62,0,0,1,158,129a19.44,19.44,0,0,1-14.33,6.4,26.9,26.9,0,0,1-10-1.77,12.8,12.8,0,0,1-6.69-6h-.2v6.5H113.42V63.79ZM150,102.48a16.35,16.35,0,0,0-2.16-5.21,11.52,11.52,0,0,0-3.69-3.6,11.41,11.41,0,0,0-10.69,0,11.28,11.28,0,0,0-3.74,3.6,16.13,16.13,0,0,0-2.16,5.21,27.23,27.23,0,0,0-.69,6.21,26.72,26.72,0,0,0,.69,6.1,16.09,16.09,0,0,0,2.16,5.22,11.15,11.15,0,0,0,3.74,3.59,11.41,11.41,0,0,0,10.69,0,11.38,11.38,0,0,0,3.69-3.59,16.32,16.32,0,0,0,2.16-5.22,26.72,26.72,0,0,0,.69-6.1A27.23,27.23,0,0,0,150,102.48Z" fill="currentcolor" />
                                    </g>
                                </g>
                            </svg>
                    </div>
                    
                    <div style="text-align: center">
                        <p>A webapp reading thermal images from infrared cameras TIMI Edu.</p>
                        <p>version ${Ds}</p>
                    </div>


                    <hr />

                    <div class="row">

                        <div>
                            <h3>Source code</h3>
                            <p>
                                <a href="https://github.com/moichim/labir" target="_blank">github.com/moichim/labir</a>
                            </p>
                        </div>


                        <div>
                            <h3>Authors</h3>
                            <p>The code is being developed by the <a href="https://irt.zcu.cz/" target="_blank">Infrared technologies</a> research team at <a href="https://ntc.zcu.cz" target="_blank">NTC UWB</a> in Pilsen.</p>
                        </div>

                    </div>
                </div>
                </div>
            </thermal-dialog>

        `}};var Ed=class extends z{constructor(...e){super(...e),this.advancedPalettes=!1}static{this.styles=O`
    
        :host {
            display: contents;
        }
    
    `}render(){return k`
        <thermal-field label="${N(L.colourpalette)}" hint="Zvolte, jaké chcete používat palety.">
            <thermal-btn-group>
                <thermal-btn 
                    variant="${this.advancedPalettes?`default`:`foreground`}"
                    @click=${()=>this.managerController.setAdvancedPalettes(!1)}
                    tooltip="IRON, JET, White hot, Black hot"
                >Základní</thermal-btn>
                <thermal-btn 
                    variant="${this.advancedPalettes?`foreground`:`default`}"
                    @click=${()=>this.managerController.setAdvancedPalettes(!0)}
                    tooltip="Všechny dostupné palety"
                >Pokročilé</thermal-btn>
            </thermal-btn-group>
        </thermal-field>
        <thermal-field label="${N(L.filerendering)}" hint="${N(L.filerenderinghint)}">
            <manager-image-smooth-switch></manager-image-smooth-switch>
        </thermal-field>
        <thermal-field label="${N(L.graphlines)}" hint="${N(L.graphlineshint)}">
            <manager-graph-smooth-switch></manager-graph-smooth-switch>
        </thermal-field>
        `}};R([I({context:qc,subscribe:!0}),H()],Ed.prototype,`advancedPalettes`,void 0),R([I({context:Wc,subscribe:!0}),H()],Ed.prototype,`managerController`,void 0);var Dd=class extends z{constructor(...e){super(...e),this.withAnalyses=!0,this.managerController=new Qc(this),this.advancedPalettes=!0,this.smoothThermograms=!1,this.smoothGraph=!1,this.tool=`edit`,this.registryController=new Bc(this),this.opacity=1,this.loading=!1,this.groupController=new yc(this),this.autoclearGroup=!0,this.fileController=new hc(this),this.ms=0,this.playbackSpeed=1,this.autoHighlight=!1,this._canRenderChildren=!1}static{this.properties={...Qc.HOST_PROPERTIES,...Bc.HOST_PROPERTIES,...yc.HOST_PROPERTIES,...hc.HOST_PROPERTIES}}getSlugManager(){return this._slugBase+`__copy-manager`}getSlugRegistry(){return this._slugBase+`__copy-registry`}getSlugGroup(){return this._slugBase+`__copy-group`}connectedCallback(){let e=this.originalFile,t=e.thermalUrl+`__`+this.UUID;this._slugBase=t,this.setAttribute(`manager-slug`,this.getSlugManager()),this.setAttribute(`group-slug`,this.getSlugGroup()),this.setAttribute(`registry-slug`,this.getSlugRegistry()),this.palette=this.originalFile.group.registry.manager.palette.value,this.opacity=this.originalFile.group.registry.opacity.value,this.ms=e.timeline.currentMs,this.withAnalyses&&this.copyAnalysesFromParent(),super.connectedCallback(),this.originalFile.reader.createInstance(this.groupObject).then(t=>{if(!this.isConnected)return;this.registryObject.postLoadedProcessing(),this.fileController.receiveInstance(t);let n=e.group.registry.range.value;n&&this.registryObject?.range.imposeRange(n),this._canRenderChildren=!0})}disconnectedCallback(){super.disconnectedCallback(),this._canRenderChildren=!1,this.fileController.removeInstance(),this.registryController.removeGroup(this.groupObject),this.managerObject.removeRegistry(this.registryObject.id),window.Thermal.managers.delete(this.managerSlug)}copyAnalysesFromParent(){let e=this.originalFile.slots;this.analysis1=e.getSlot(1)?.serialized,this.analysis2=e.getSlot(2)?.serialized,this.analysis3=e.getSlot(3)?.serialized,this.analysis4=e.getSlot(4)?.serialized,this.analysis5=e.getSlot(5)?.serialized,this.analysis6=e.getSlot(6)?.serialized,this.analysis7=e.getSlot(7)?.serialized}clearAnalyses(){this.analysis1=void 0,this.analysis2=void 0,this.analysis3=void 0,this.analysis4=void 0,this.analysis5=void 0,this.analysis6=void 0,this.analysis7=void 0}updated(e){super.updated(e),e.has(`withAnalyses`)&&e.get(`withAnalyses`)!==void 0&&(this.withAnalyses?this.copyAnalysesFromParent():this.clearAnalyses())}static{this.styles=O`
    
        :host,
        registry-provider,
        group-provider {
            display: contents;
        }

    `}render(){return k`${this._canRenderChildren?k`<slot></slot>`:A}`}};R([V({type:Object,attribute:!1})],Dd.prototype,`originalFile`,void 0),R([V({type:Boolean,attribute:!1})],Dd.prototype,`withAnalyses`,void 0),R([H()],Dd.prototype,`_canRenderChildren`,void 0);var Od=class extends xd{constructor(...e){super(...e),this.fileLoadController=new gc(this)}static{this.properties={...xd.properties,...gc.HOST_PROPERTIES}}},kd=class extends Sd{},Ad=class extends Cd{},jd=class extends wd{},Md=class extends z{renderRow(e,t,n){return k`<thermal-field label="${e}">
                <div>${t}</div>
                ${n||A}
            </thermal-field>`}renderGroup(e,t){return k`<fieldset>
            <legend>${e}</legend>
            ${t}
        </fieldset>`}formatTip(e){return e?k`<div class="hint">${e}</div>`:``}renderCheckbox(e,t,n,r){return k`<div>${k`<input name="${e}" type="checkbox" ?checked="${n}" @input=${e=>{let t=e.target.checked;r(t)}}>`}<label for="${e}">${t}</label></div>`}renderSlider(e,t,n,r,i,a,o,s,c){let l=k`<input 
                name="${e}"
                value="${n}"
                min="${i}"
                max="${a}"
                step="${o}"
                type="range"
                @input="${e=>{s(Math.min(a,Math.max(0,parseFloat(e.target.value))))}}"
            ></input>`,u=k`<strong>${n} ${r}</strong> (${i} - ${a} ${r})${c?`<br />`+c:``}`,d=this.formatTip(u);return this.renderRow(t,l,d)}static{this.styles=O`
        
            :host {
                display: contents;
            }

            .hint {
                font-size: calc( var( --thermal-fs-sm ) * .75 );
                padding-top: .2em;
            }

            fieldset {
                border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                border-radius: var(--thermal-radius);
                margin-bottom: var(--thermal-gap);

                legend {
                    border-radius: var(--thermal-radius);
                    border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                    padding: 0.3em 0.5em;
                }

            }

            
        
        `}updated(e){if(super.updated(e),!this.configController||!e.has(`config`))return;let t=this.configController.settings.export.png,n=[[`pngWidth`,t.width],[`pngFs`,t.fontSize]];for(let[e,t]of n){let n=this.shadowRoot?.querySelector(`input[name="${e}"]`);n&&Number(n.value)!==t&&(n.value=t.toString())}}render(){if(!this.configController)return A;let{png:e,group:t}=this.configController.settings.export;return k`

        ${this.renderGroup(N(L.exportcontent),k`
            ${this.renderCheckbox(`pngExportAnalyses`,N(L.analyses),e.analyses,e=>this.configController.setPngAnalyses(e))}
            ${this.renderCheckbox(`pngExportScale`,N(L.thermalscale),e.thermalScale,e=>this.configController.setPngThermalScale(e))}
            ${this.renderCheckbox(`pngExportFileName`,N(L.exportfilenames),e.fileName,e=>this.configController.setPngFileName(e))}
            ${this.renderCheckbox(`pngExportFileDate`,N(L.filedate),e.fileDate,e=>this.configController.setPngFileDate(e))}
        `)}

        ${this.renderGroup(N(L.exportdimensions),k`
            ${this.renderSlider(`pngWidth`,N(L.exportimagewidth),e.width,`px`,500,2e3,50,e=>this.configController.setPngWidth(e))}

            ${this.renderSlider(`pngFs`,N(L.exportimagefontsize),e.fontSize,`px`,10,50,1,e=>this.configController.setPngFontSize(e))}
        `)}

        ${this.renderGroup(N(L.exportgroup),k`
            ${this.renderCheckbox(`pngExportGroupName`,N(L.exportgroupname),t.groupName,e=>this.configController.setGroupGroupName(e))}
            ${this.renderSlider(`pngColumns`,N(L.exportfilenames),t.columns,`sloupců`,1,5,1,e=>this.configController.setGroupColumns(e))}
        `)}

        `}};R([H(),I({context:$c,subscribe:!0})],Md.prototype,`configController`,void 0);var Nd=class extends vd{static{this.styles=O`
    
        :host {
            display: inline-block;
        }

    `}render(){return k`
            <thermal-btn-group>
                <thermal-btn
                    variant=${this.smooth?`default`:`foreground`}
                    @click=${()=>this.managerObject.graphSmooth.setGraphSmooth(!1)}
                >${N(L.straightlines)}</thermal-btn>
                <thermal-btn
                    variant=${this.smooth?`foreground`:`default`}
                    @click=${()=>this.managerObject.graphSmooth.setGraphSmooth(!0)}
                >${N(L.smoothlines)}</thermal-btn>
            </thermal-btn-group>
        `}};R([I({context:Yc,subscribe:!0})],Nd.prototype,`smooth`,void 0);var Pd=class extends vd{static{this.styles=O`
    
        :host {
            display: block;
        }

    `}render(){return k`<thermal-btn-group>
            <thermal-btn
    variant=${this.smooth?`default`:`foreground`}
    @click=${()=>this.managerObject.smooth.setSmooth(!1)}
>${N(L.pixelated)}</thermal-btn>

<thermal-btn
    variant=${this.smooth?`foreground`:`default`}
    @click=${()=>this.managerObject.smooth.setSmooth(!0)}
>${N(L.smooth)}</thermal-btn>
        </thermal-btn-group>`}};R([I({context:Jc,subscribe:!0})],Pd.prototype,`smooth`,void 0);var Fd=class e extends vd{constructor(...e){super(...e),this.advancedPalettesContext=!1,this.palettes=[]}static{this.BASIC_PALETTES=[`iron`,`jet`,`white_hot`,`black_hot`]}willUpdate(t){super.willUpdate(t);let n=this.advancedPalettesProperty??this.advancedPalettesContext,r=e.BASIC_PALETTES,i=t.has(`advancedPalettesContext`)||t.has(`advancedPalettesProperty`);i&&(this.palettes=n?Object.values(Dr):Object.entries(Dr).filter(([t])=>e.BASIC_PALETTES.includes(t)).map(([,e])=>e)),(i||t.has(`value`))&&this.value!==void 0&&!n&&!r.includes(this.value.key)&&this.onSelect(`iron`)}onSelect(e){this.managerObject.palette.setPalette(e)}};R([I({context:qc,subscribe:!0}),H()],Fd.prototype,`advancedPalettesContext`,void 0),R([V({type:Boolean,attribute:`advanced-palettes`})],Fd.prototype,`advancedPalettesProperty`,void 0),R([H()],Fd.prototype,`palettes`,void 0),R([I({context:Kc,subscribe:!0}),H()],Fd.prototype,`value`,void 0);var Id=class extends Fd{static{this.styles=O`
:host {
    display: flex;
    width: content-width;
    gap: 5px;
}

.palette {
    width: calc( var( --thermal-gap ) * 2 );
    height: calc( var( --thermal-fs ) * .8 );
    border-radius: var( --thermal-fs-small );
}`}paletteTemplate(e){return k`<span class="palette" style="background:${e.gradient}"></span>`}render(){return this.palettes.map((e=>k`<thermal-btn 
    @click=${()=>this.onSelect(e.slug)} 
    variant="${e.name===this.managerObject.palette.currentPalette.name?`background`:`default`}"
    tooltip="${N(L.palettename,{name:e.name})}"
>
    ${this.paletteTemplate(e)}
</thermal-btn>`))}},Ld=class extends Fd{static{this.styles=O`

    .palette {
        display: block;
        width: calc( var( --thermal-gap ) * 2 );
        height: calc( var( --thermal-fs ) * .8 );
        border-radius: var( --thermal-fs-small );
    }

    thermal-btn {
        width: 100%;
        justify-content: flex-start;
    }

    `}paletteTemplate(e){return k`<span class="palette" style="background:${e.gradient}"></span><span>${e.name}</span>`}render(){return k`

            <thermal-dropdown .tooltip=${N(L.colourpalette)}>
                    <span slot="invoker" class="palette" style="background:${this.managerObject.palette.currentPalette.gradient}"></span>

                ${this.palettes.map(e=>k`
                    <div slot="option"><thermal-btn @click=${()=>this.onSelect(e.slug)} variant="${e.name===this.managerObject.palette.currentPalette.name?`background`:`slate`}">
                        ${this.paletteTemplate(e)}
                    </thermal-btn></div>
                `)}
            
            </thermal-dropdown>

            <slot></slot>

        `}},Rd=class extends vd{onSelect(e){this.managerObject.tool.selectTool(e)}static{this.styles=O`
:host {
    display: flex;
    font-size: var(--thermal-fs);
    flex-direction: column;
    gap: 0.25em;
}

:host([horizontal="true"]) {
    flex-direction: row;
}

.active {
    color: var( --thermal-foreground );
}

thermal-btn {
    width: 2.5em;
    padding: 3px;
    &:hover {
        color: var(--thermal-primary);
    }
}`}renderTool(e,t){let n={[e]:!0,button:!0,active:t.key===this.value.key};return k`<thermal-btn 
    tooltip=${N(L[t.name])}
    tooltip-placement="right"
    class=${sd(n)} 
    @click=${()=>{this.managerObject.tool.selectTool(t)}}
    variant=${t.key===this.value.key?`background`:`default`}
>
    ${Is(t.icon)}
</thermal-btn>`}render(){return this.managerObject===void 0?A:Object.entries(this.managerObject.tool.tools).map(([e,t])=>this.renderTool(e,t))}};R([I({context:Xc,subscribe:!0}),H()],Rd.prototype,`value`,void 0);var zd=class extends yd{constructor(...e){super(...e),this.stacked=!1,this.step=1,this.availableSteps=[.01,.1,.5,1,5,10],this.inputValues={from:``,to:``},this.isUpdatingFromRegistry=!1,this.autoRangeHovered=!1,this.recieveMinmax=e=>{e?(this.min!==e.min&&(this.min=e.min),this.max!==e.max&&(this.max=e.max)):(this.min=void 0,this.max=void 0,this.from=void 0,this.to=void 0,this.inputValues={from:``,to:``})},this.recieveRange=e=>{this.isUpdatingFromRegistry=!0,e?(this.from!==e.from&&(this.from=e.from,this.inputValues={...this.inputValues,from:e.from?.toFixed(2)??``}),this.to!==e.to&&(this.to=e.to,this.inputValues={...this.inputValues,to:e.to?.toFixed(2)??``})):(this.from=void 0,this.to=void 0,this.inputValues={from:``,to:``}),this.isUpdatingFromRegistry=!1},this.recieveAutoValue=e=>{this.autoValue=e,this.autoRangeHovered&&this.registryController.setHighlight(e)},this.handleFullRangeMouseEnter=()=>{let e=this.registryObject.minmax.value;e!==void 0&&this.registryController.setHighlight({from:e.min,to:e.max})},this.handleFullRangeClick=()=>{this.registryObject.range.applyMinmax()},this.handleAutoRangeMouseEnter=()=>{this.autoRangeHovered=!0,this.registryController.setHighlight(this.autoValue)},this.handleAutoRangeClick=()=>{this.registryObject.range.applyAuto()},this.handleHighlightMouseLeave=()=>{this.autoRangeHovered=!1,this.registryController.setHighlight(void 0)}}connectedCallback(){super.connectedCallback(),this.hydrate()}willUpdate(e){super.willUpdate(e),this.hydrate()}disconnectedCallback(){super.disconnectedCallback(),this.dehydrate(),this.debounceTimer&&clearTimeout(this.debounceTimer)}hydrate(){let e=this.registryController?.registryObject;e!==void 0&&e!==this.subscribedRegistry&&(this.dehydrate(),this.subscribedRegistry=e,this.recieveMinmax(e.minmax.value),this.recieveRange(e.range.value),this.recieveAutoValue(e.range.autoValue),e.minmax.addListener(this.UUID,this.recieveMinmax),e.range.addListener(this.UUID,this.recieveRange),e.range.onAutoValueChanged.set(this.UUID,this.recieveAutoValue))}dehydrate(){let e=this.subscribedRegistry;e!==void 0&&(e.minmax.removeListener(this.UUID),e.range.removeListener(this.UUID),e.range.onAutoValueChanged.delete(this.UUID),this.subscribedRegistry=void 0)}updateFrom(e){this.registryObject&&e!==void 0&&this.to!==void 0&&(this.from=e,this.registryObject.range.imposeRange({from:e,to:this.to}))}updateTo(e){this.registryObject&&e!==void 0&&this.from!==void 0&&(this.to=e,this.registryObject.range.imposeRange({from:this.from,to:e}))}debouncedUpdate(e,t){this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=window.setTimeout(()=>{if(this.isUpdatingFromRegistry)return;let n=parseFloat(t);isNaN(n)||(e===`from`&&this.isValidFromValue(n)?this.updateFrom(n):e===`to`&&this.isValidToValue(n)&&this.updateTo(n))},300)}isValidFromValue(e){return!(this.min!==void 0&&e<this.min||this.to!==void 0&&e>this.to)}isValidToValue(e){return!(this.max!==void 0&&e>this.max||this.from!==void 0&&e<this.from)}canStepFrom(e){if(this.from===void 0)return!1;let t=e===`up`?this.from+this.step:this.from-this.step;return this.isValidFromValue(t)}canStepTo(e){if(this.to===void 0)return!1;let t=e===`up`?this.to+this.step:this.to-this.step;return this.isValidToValue(t)}canSetMin(){return this.min!==void 0&&this.to!==void 0&&this.min<=this.to&&this.from!==this.min}canSetMax(){return this.max!==void 0&&this.from!==void 0&&this.max>=this.from&&this.to!==this.max}stepFrom(e){if(this.from===void 0||!this.canStepFrom(e))return;let t=e===`up`?this.from+this.step:this.from-this.step,n=parseFloat(t.toFixed(2));this.inputValues.from=n.toFixed(2),this.updateFrom(n)}stepTo(e){if(this.to===void 0||!this.canStepTo(e))return;let t=e===`up`?this.to+this.step:this.to-this.step,n=parseFloat(t.toFixed(2));this.inputValues.to=n.toFixed(2),this.updateTo(n)}setMinValue(){this.canSetMin()&&this.min!==void 0&&(this.inputValues.from=this.min.toFixed(2),this.updateFrom(this.min))}setMaxValue(){this.canSetMax()&&this.max!==void 0&&(this.inputValues.to=this.max.toFixed(2),this.updateTo(this.max))}setStep(e){this.step=e}roundToNearestInteger(e){let t=e===`from`?this.from:this.to;if(t===void 0)return;let n=Math.round(t),r=n;e===`from`&&n<this.min&&(r=Math.ceil(t)),e===`to`&&n>this.max&&(r=Math.floor(t)),(e===`from`?this.isValidFromValue(r):this.isValidToValue(r))&&(e===`from`?(this.inputValues.from=r.toFixed(2),this.updateFrom(r)):(this.inputValues.to=r.toFixed(2),this.updateTo(r)))}getAvailableSteps(){return this.availableSteps.filter(e=>{let t=this.from!==void 0&&(this.isValidFromValue(this.from+e)||this.isValidFromValue(this.from-e)),n=this.to!==void 0&&(this.isValidToValue(this.to+e)||this.isValidToValue(this.to-e));return t||n})}isWholeNumber(e){return e!==void 0&&Math.round(e)===e}getClosestValidValue(e,t){if(!e.trim())return t===`from`?this.from:this.to;let n=parseFloat(e);if(isNaN(n))return t===`from`?this.from:this.to;if(t===`from`){let e=this.min??-1/0,t=this.to??1/0;return n<e?e:n>t?t:n}{let e=this.from??-1/0,t=this.max??1/0;return n<e?e:n>t?t:n}}handleInputBlur(e,t){let n=this.getClosestValidValue(t,e);n!==void 0&&(this.inputValues={...this.inputValues,[e]:n.toFixed(2)},e===`from`?this.updateFrom(n):this.updateTo(n))}static{this.styles=O`

        :host {
            font-family: inherit;
            font-style: normal;
            font-size: var(--font-size);
            display: flex !important;
            flex-wrap: wrap;
            flex-direction: var( --thermal-direction, row );
            gap: .5em;
        }

        .fields {

            display: flex;
            flex-wrap: no-wrap;
            gap: 0em;
        
        }

        .fields__buttons {

            thermal-btn {
                min-height: 2em;
                flex-grow: var(--thermal-collapsible-grow, 0);
            }
        
        }

        .fields__separated {
            gap: .5em;
        }


        .separator {
            width: .5em;
            &.separator__line {
                display: flex;
                align-items: center;
                &::after {
                    content: "";
                    display: block;
                    height: var(--thermal-border-width);
                    width: 100%;
                    background: var( --thermal-slate );
                }
            }
        }

        .input-group {
            position: relative;
        }
    
        .input-group-inner {
            display: flex;
            align-items: stretch;
            height: 2em;
            position: relative;
            z-index: 1;
        }


        .input-group-outer {
            position: absolute;
            z-index: 0;
            text-align: center;
            width: 100%;

            font-size: .75em;
            height: 2em;
            background: var( --thermal-slate-light );

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );

            opacity: 0;

            transition: all .25s ease-in-out;

            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .25em;

            &.input-group-outer__top {
                top: 3px;
                padding-bottom: .5em;
                border-radius: var( --thermal-radius ) var( --thermal-radius ) 0 0;
            }

            &.input-group-outer__bottom {
                bottom: 3px;
                padding-top: .5em;
                border-radius: 0 0 var( --thermal-radius ) var( --thermal-radius );
            }
        }

        .input-group:focus-within .input-group-outer {

            opacity: 1;

            &.input-group-outer__top {
                top: -1.5em;
            }

            &.input-group-outer__bottom {
                bottom: -1.5em;
            }
        }

        .input-group.is-whole-number .input-group-outer__bottom {
            opacity: 0;
            bottom: 3px;
        }

        .input-group button,
        .input-group aside,
        .input-group input {

            border: 0;
            border-top: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            border-bottom: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );

            color: var( --thermal-foreground );
            background: var( --thermal-background );
            
            font-family: inherit;
            font-size: 1em;
            line-height: 1em;

            transition: all .25s ease-in-out;
        
        }

        .input-group-inner input, 
        .input-group-inner aside {
            display: block;
            vertical-align: middle;
        }

        .input-group-inner aside {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: .3em;
        }

        .input-group-inner input {

            outline: 0;
            padding: 0;
            margin: 0;

            text-align: right;

            width: 3.5em;

            &:hover,
            &:focus {
                color: var( --thermal-primary );
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }

            &[type=number] {
                -moz-appearance:textfield; /* Firefox */
            }
            
        }

        .input-group-inner > button {

            cursor: pointer;

            outline: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            &.left {
                border-right: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            }

            &.right {
                border-left: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            }

            &:hover,
            &:focus {
                background: var( --thermal-slate-light );
            }

            &:disabled {
                
                cursor: not-allowed;
                color: var( --thermal-slate-light );
                
                &:hover,
                &:focus {
                    background: var( --thermal-background );
                }
            }

            &:first-child {
                border-left: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
                border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            }

            &:last-child {
                border-right: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
                border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
            }

            svg {
                display: block;
            }
        
        }

        .step-button {
            
            color: var( --thermal-slate ) !important;
            cursor: pointer;
            font-size: .7em;
            padding: .2em .3em;
            transition: all .25s ease-in-out;

            background: transparent !important;
            border: none !important;

            &:hover:not(:disabled) {
                color: var( --thermal-primary );
            }

            &.active {
                font-weight: bold;
                color: var( --thermal-foreground ) !important;
            }

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        }

        .round-button {
            
            color: var( --thermal-foreground );
            cursor: pointer;
            font-size: .8em;
            padding: .3em .6em;
            transition: all .25s ease-in-out;
            border: 0 !important;
            background: transparent !important;

            &:hover:not(:disabled) {
                color: var( --thermal-primary );
            }

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        }
    
    `}renderInput(e,t=void 0,n=void 0){let r=e===`from`?this.from:this.to,i=this.inputValues[e],a=e===`from`?this.canStepFrom(`down`):this.canStepTo(`down`),o=e===`from`?this.canStepFrom(`up`):this.canStepTo(`up`),s=this.getAvailableSteps();return k`
        <div class="input-group ${this.isWholeNumber(r)?`is-whole-number`:``}">
            <div class="input-group-outer input-group-outer__top">
                ${s.map(e=>k`
                    <button 
                        class="step-button ${e===this.step?`active`:``}"
                        ?disabled=${!s.includes(e)}
                        @click=${()=>this.setStep(e)}
                    >
                        ${e}
                    </button>
                `)}
            </div>
            <div class="input-group-inner">
                ${t}
                <button 
                    class="left"
                    ?disabled=${!a}
                    @click=${()=>e===`from`?this.stepFrom(`down`):this.stepTo(`down`)}
                >-</button>
                <input
                    .value=${i}
                    type="number"
                    step=${this.step}
                    min=${B(e===`from`?this.min:this.from)}
                    max=${B(e===`from`?this.to:this.max)}
                    @input=${t=>{let n=t.target;this.inputValues={...this.inputValues,[e]:n.value},this.debouncedUpdate(e,n.value)}}
                    @blur=${t=>{let n=t.target;this.handleInputBlur(e,n.value)}}
                    @keydown=${t=>{if(t.key===`ArrowUp`||t.key===`ArrowDown`){t.preventDefault();let n=t.key===`ArrowUp`?`up`:`down`;e===`from`?this.stepFrom(n):this.stepTo(n)}}}
                ></input>
                <aside>°C</aside>
                <button 
                    class="right"
                    ?disabled=${!o}
                    @click=${()=>e===`from`?this.stepFrom(`up`):this.stepTo(`up`)}
                >+</button>
                ${n}
            </div>
            <div class="input-group-outer input-group-outer__bottom">
                <button 
                    class="round-button"
                    @click=${()=>this.roundToNearestInteger(e)}
                >
                    Zaokrouhlit
                </button>
            </div>
        </div>
        `}render(){return k`
        <div class="fields">

            ${this.renderInput(`from`,k`<button 
                    class="left"
                    ?disabled=${!this.canSetMin()}
                    @click=${()=>this.setMinValue()}
                >
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <line x1="5" y1="2" x2="5" y2="14" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="10" y2="4" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="16" y2="8" stroke="currentColor" stroke-width="1"/>
                    </svg>
                </button>`,void 0)}
            <div class="separator separator__line"></div>
            ${this.renderInput(`to`,void 0,k`<button 
                    class="right"
                    ?disabled=${!this.canSetMax()}
                    @click=${()=>this.setMaxValue()}
                >
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <line x1="15" y1="2" x2="15" y2="14" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="10" y2="4" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="4" y2="8" stroke="currentColor" stroke-width="1"/>
                    </svg>
                </button>`)}

        </div>

        <div class="fields fields__separated fields__buttons">
            <thermal-btn
                tooltip=${N(L.fullrange)}
                @click=${this.handleFullRangeClick}
                @mouseenter=${this.handleFullRangeMouseEnter}
                @mouseleave=${this.handleHighlightMouseLeave}
                @focusin=${this.handleFullRangeMouseEnter}
                @focusout=${this.handleHighlightMouseLeave}
                style="padding: 0 0.5em; display: flex; align-items: center; justify-content: center;"
                ?disabled=${!this.canSetMin()&&!this.canSetMax()}
            >
                <svg width="35" height="16" viewBox="0 0 35 16" fill="none" style="display: block;" stroke-linecap="butt" stroke-linejoin="miter">
                    <!-- Minimum-bound icon. -->
                    <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" stroke-width="1"/>
                    <line x1="3" y1="8" x2="8" y2="3" stroke="currentColor" stroke-width="1"/>
                    <line x1="3" y1="8" x2="8" y2="13" stroke="currentColor" stroke-width="1"/>
                    <!-- Line connecting the endpoint arrows. -->
                    <line x1="3" y1="8" x2="32" y2="8" stroke="currentColor" stroke-width="1"/>
                    <!-- Maximum-bound icon. -->
                    <line x1="32" y1="2" x2="32" y2="14" stroke="currentColor" stroke-width="1"/>
                    <line x1="32" y1="8" x2="27" y2="3" stroke="currentColor" stroke-width="1"/>
                    <line x1="32" y1="8" x2="27" y2="13" stroke="currentColor" stroke-width="1"/>
                </svg>
            </thermal-btn>
            
            <thermal-btn
                tooltip=${N(L.automaticrange)}
                @click=${this.handleAutoRangeClick}
                @mouseenter=${this.handleAutoRangeMouseEnter}
                @mouseleave=${this.handleHighlightMouseLeave}
                @focusin=${this.handleAutoRangeMouseEnter}
                @focusout=${this.handleHighlightMouseLeave}
                ?disabled=${this.autoValue===void 0}
                style="padding: 0 0.5em; display: flex; align-items: center; justify-content: center;"
            >
                <svg width="56" height="16" viewBox="0 0 56 16" fill="none" style="display: block;">
                    <!-- All bars sorted by X coordinate - background (slate color) -->
                    <rect x="2" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="4" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="6" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="8" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="10" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="12" y="9" width="2" height="5" fill="var(--thermal-slate)"/>
                    <rect x="14" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="16" y="11" width="2" height="3" fill="var(--thermal-slate)"/>
                    <rect x="18" y="6" width="2" height="8" fill="var(--thermal-slate)"/>
                    <rect x="20" y="2" width="2" height="12" fill="var(--thermal-slate)"/>
                    <rect x="22" y="3" width="2" height="11" fill="var(--thermal-slate)"/>
                    <rect x="24" y="1" width="2" height="13" fill="var(--thermal-slate)"/>
                    <rect x="26" y="2" width="2" height="12" fill="var(--thermal-slate)"/>
                    <rect x="28" y="4" width="2" height="10" fill="var(--thermal-slate)"/>
                    <rect x="30" y="8" width="2" height="6" fill="var(--thermal-slate)"/>
                    <rect x="32" y="10" width="2" height="4" fill="var(--thermal-slate)"/>
                    <rect x="34" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="36" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="38" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="40" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="42" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="44" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="46" y="11" width="2" height="3" fill="var(--thermal-slate)"/>
                    <rect x="48" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="50" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="52" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <!-- Highlighted section - foreground color (sorted by X) -->
                    <rect x="18" y="6" width="2" height="8" fill="var(--thermal-foreground)"/>
                    <rect x="20" y="2" width="2" height="12" fill="var(--thermal-foreground)"/>
                    <rect x="22" y="3" width="2" height="11" fill="var(--thermal-foreground)"/>
                    <rect x="24" y="1" width="2" height="13" fill="var(--thermal-foreground)"/>
                    <rect x="26" y="2" width="2" height="12" fill="var(--thermal-foreground)"/>
                    <rect x="28" y="4" width="2" height="10" fill="var(--thermal-foreground)"/>
                    <!-- Bottom line with offset -->
                    <line x1="17" y1="15.5" x2="31" y2="15.5" stroke="currentColor" stroke-width="1"/>
                </svg>
            </thermal-btn>
        </div>

        `}};R([V({reflect:!0,converter:l(!0)})],zd.prototype,`stacked`,void 0),R([H()],zd.prototype,`min`,void 0),R([H()],zd.prototype,`max`,void 0),R([H()],zd.prototype,`from`,void 0),R([H()],zd.prototype,`to`,void 0),R([H()],zd.prototype,`step`,void 0),R([H()],zd.prototype,`availableSteps`,void 0),R([H()],zd.prototype,`inputValues`,void 0),R([H()],zd.prototype,`isUpdatingFromRegistry`,void 0),R([H()],zd.prototype,`autoValue`,void 0);var Bd=class e extends yd{constructor(...e){super(...e),this.ticksRef=U(),this.ticksWidth=0,this.placement=`top`,this.minmax=void 0,this.ticks=[],this.containerRef=U()}static{this.TICK_WIDTH=40}static{this.TICK_FIXED=2}connectedCallback(){super.connectedCallback(),this.bindRegistry(),this.minmax=this.boundRegistry?.minmax.value,this.ticksWidth=this.ticksRef.value?.clientWidth??0,this.requestUpdate()}disconnectedCallback(){this.unbindRegistry(),this.disconnectObserver(),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),this.boundRegistry!==this.registryController?.registryObject&&this.isConnected&&(this.bindRegistry(),this.minmax=this.boundRegistry?.minmax.value),(e.has(`minmax`)||e.has(`ticksWidth`))&&this.calculateTicks(this.minmax,this.ticksWidth)}updated(e){super.updated(e),this.observeTicks()}bindRegistry(){let e=this.registryController?.registryObject;this.isConnected&&e!==this.boundRegistry&&(this.unbindRegistry(),this.boundRegistry=e,e?.minmax.addListener(this.UUID,e=>{this.minmax=e}))}unbindRegistry(){this.boundRegistry?.minmax.removeListener(this.UUID),this.boundRegistry=void 0}observeTicks(){let e=this.isConnected?this.ticksRef.value:void 0;e!==this.observedTicks&&(this.disconnectObserver(),e&&(this.observedTicks=e,this.observer=new ResizeObserver(t=>{if(!this.isConnected||this.observedTicks!==e)return;let n=t.find(t=>t.target===e);n&&(this.ticksWidth=n.contentRect.width)}),this.observer.observe(e)))}disconnectObserver(){this.observer?.disconnect(),this.observer=void 0,this.observedTicks=void 0}clamp(e,t,n){return e<t?t:e>n?n:e}map(e,t,n,r,i){let a=(e-t)*(i-r)/(n-t)+r;return this.clamp(a,r,i)}calculateTicks(t,n){if(t===void 0)this.ticks=[];else{let r=[0],i=Math.floor(n/e.TICK_WIDTH)-2,a=100/i;for(let e=1;e<i;e++)r.push(a*e);r.push(100),this.ticks=r.map(e=>this.calculateOneTick(t,e)).filter(e=>e!==void 0)}}calculateOneTick(e,t){if(e!==void 0)return{percentage:t,value:this.map(t,0,100,e.min,e.max)}}static{this.styles=O`

        .container {
            padding: 0 calc( var( --thermal-gap ) * .5 );
            height: var( --thermal-fs );
            
        }

        .skeleton {
            height: 100%;
            background: var( --thermal-slate-light );
        }

        .ready {
            .skeleton {
                display: none;
            }
        }

        .ticks {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            width: 100%;
            position: relative;
            color: var( --thermal-slate-dark );
            font-family: sans-serif;
            height: 1em;
        }

        .tick {

            position: relative;

        }

        .tick-marker {
            display: block;
            width: 1px;
            height: 10px;
            background: var(--thermal-slate);
        }

        .placement-top {
            margin-top: 10x;
            padding-bottom: var( --thermal-gap );
        }

        .placement-bottom {
            .tick-marker {
                height: 5px;
                background: currentcolor;
                position: absolute;
                top: 12px;
            }
        }

        .tick-value {

            position: absolute;
            width: 40px;
            left: -20px;
            text-align: center;
        
        }


    `}render(){let t,n;if(this.minmax&&this.highlight){let e=this.minmax.min,r=this.minmax.max-e;t=(this.highlight.from-e)/r*100,n=(this.highlight.to-e)/r*100-t}return k`

            <div class="container ${this.minmax===void 0?`loading`:`ready`} placement-${this.placement}" ${W(this.containerRef)}>

                <div class="skeleton" data-video-ignore></div>

                <div class="ticks" ${W(this.ticksRef)}>

                    ${t!==void 0&&n!==void 0?k`<div class="highlight" style="position: absolute; top: 0px; height: 5px; left:${t}%; width: ${n}%; background-color: var(--thermal-foreground)"></div>`:A}

                    ${this.ticks.map(t=>k`
                    <div class="tick" >
                        <div class="tick-marker"></div>
                        <div class="tick-value">
                            ${t.value.toFixed(e.TICK_FIXED)}
                        </div>
                    </div>
                        `)}

                </div>                

            </div>
        
        `}};R([H()],Bd.prototype,`ticksWidth`,void 0),R([I({context:zc,subscribe:!0})],Bd.prototype,`highlight`,void 0),R([V({type:String,reflect:!0})],Bd.prototype,`placement`,void 0),R([H()],Bd.prototype,`minmax`,void 0),R([H()],Bd.prototype,`ticks`,void 0);var Vd=class extends yd{constructor(...e){super(...e),this.height=null,this.heightStyle=null,this.loading=!1,this.activeHandle=`from`}getClassName(){return`RangeSliderElement`}disconnectedCallback(){this.cancelDrag(),super.disconnectedCallback()}willUpdate(e){if(super.willUpdate(e),e.has(`height`)||e.has(`heightStyle`)){let t=this.height?.trim(),n=document.createElement(`div`).style;t&&(n.height=t);let r=this.style.getPropertyValue(`--_range-slider-attribute-height`);t&&n.height&&!/^(auto|inherit|initial|unset|revert|revert-layer|min-content|max-content|fit-content|stretch|contain)$/i.test(t)?r!==t&&this.style.setProperty(`--_range-slider-attribute-height`,t):(r&&this.style.removeProperty(`--_range-slider-attribute-height`),t&&e.has(`height`)&&this.log(`Invalid range slider height`,{height:this.height}))}[`min`,`max`,`from`,`to`,`loading`,`registryController`].some(t=>e.has(t))&&(this.cancelDrag(),this.min!==void 0&&this.max!==void 0&&this.from!==void 0&&this.to!==void 0&&!this.values&&this.log(`Invalid range slider values`,{min:this.min,max:this.max,from:this.from,to:this.to}))}get values(){let{min:e,max:t,from:n,to:r}=this;if(e!==void 0&&t!==void 0&&n!==void 0&&r!==void 0&&!(![e,t,n,r,t-e].every(Number.isFinite)||e>t||n<e||r>t||n>r))return{min:e,max:t,from:n,to:r}}percent(e,t){return t.max===t.min?0:(e-t.min)/(t.max-t.min)*100}constrain(e,t,n,r){return e===`from`?{from:Math.max(n.min,Math.min(r.to,t)),to:r.to}:{from:r.from,to:Math.min(n.max,Math.max(r.from,t))}}commit(e){this.cancelDrag(),(e.from!==this.from||e.to!==this.to)&&(this.registryController.setRange(e.from,e.to),this.from=this.registryController.from,this.to=this.registryController.to)}cancelDrag(){let e=this.drag;this.drag=void 0,this.draft=void 0,e?.element.hasPointerCapture(e.pointerId)&&e.element.releasePointerCapture(e.pointerId)}pointerDown(e){let t=this.values;if(!t||this.loading||t.min===t.max||this.drag||e.button!==0)return;let n=e.currentTarget,r=e.target;if(!(n instanceof HTMLElement)||!(r instanceof HTMLElement))return;let i=n.getBoundingClientRect();if(i.width===0)return;let a=(e.clientX-i.left)/i.width*100,o=r.closest(`[data-handle]`)?.dataset.handle,s;if(o===`from`||o===`to`)s=o;else{let e=Math.abs(a-this.percent(t.from,t)),n=Math.abs(a-this.percent(t.to,t));s=e===n?this.activeHandle:e<n?`from`:`to`}e.preventDefault(),this.activeHandle=s,n.querySelector(`[data-handle="${s}"]`)?.focus({preventScroll:!0}),this.draft={from:t.from,to:t.to};let c=o?e.clientX-i.left-this.percent(t[s],t)/100*i.width:0;this.drag={pointerId:e.pointerId,handle:s,offset:c,element:n,values:t,controller:this.registryController},n.setPointerCapture(e.pointerId),this.pointerMove(e)}pointerMove(e){let t=this.drag,n=this.values;if(!t||e.pointerId!==t.pointerId)return;if(!n||!this.draft||this.loading||this.registryController!==t.controller||n.min!==t.values.min||n.max!==t.values.max||n.from!==t.values.from||n.to!==t.values.to){this.cancelDrag();return}let r=t.element.getBoundingClientRect();if(r.width===0)return;let i=Math.max(0,Math.min(1,(e.clientX-r.left-t.offset)/r.width)),a=i===0?n.min:i===1?n.max:n.min+i*(n.max-n.min);this.draft=this.constrain(t.handle,a,n,this.draft)}pointerUp(e){if(this.drag?.pointerId!==e.pointerId)return;this.pointerMove(e);let t=this.draft;t?this.commit(t):this.cancelDrag()}pointerCancel(e){this.drag?.pointerId===e.pointerId&&this.cancelDrag()}keyDown(e,t){let n=this.values;if(!n||this.loading||n.min===n.max)return;let r;switch(e.key){case`ArrowLeft`:r=Number((n[t]-(n.max-n.min)/100).toPrecision(15));break;case`ArrowRight`:r=Number((n[t]+(n.max-n.min)/100).toPrecision(15));break;case`ArrowUp`:case`Home`:r=n.min;break;case`ArrowDown`:case`End`:r=n.max;break;default:return}e.preventDefault(),e.stopPropagation(),this.activeHandle=t,this.commit(this.constrain(t,r,n,n))}wheel(e,t){let n=this.values;if(!n||this.loading||n.min===n.max||e.deltaY===0||this.drag)return;e.preventDefault(),e.stopPropagation(),this.activeHandle=t;let r=Number((n[t]+Math.sign(e.deltaY)*(n.max-n.min)/100).toPrecision(15));this.commit(this.constrain(t,r,n,n))}renderHandle(e,t,n){let r=t.min===t.max;return k`
            <div class="handle-position ${this.activeHandle===e?`active`:``}"
                style=${Tc({left:`${this.percent(n[e],t)}%`})}>
                <button type="button" class="handle" data-handle=${e} role="slider"
                    aria-label=${this.t(e===`from`?`minimaltemperature`:`maximaltemperature`)}
                    aria-orientation="horizontal"
                    aria-valuemin=${e===`from`?t.min:n.from}
                    aria-valuemax=${e===`from`?n.to:t.max}
                    aria-valuenow=${n[e]}
                    aria-valuetext=${`${n[e].toFixed(2)} \u00b0C`}
                    ?disabled=${r}
                    style=${Tc({background:e===`from`?this.palette?.data.pixels[0]:this.palette?.data.pixels[this.palette.data.pixels.length-1]})}
                    @focus=${()=>{this.activeHandle=e}}
                    @keydown=${t=>this.keyDown(t,e)}
                    @wheel=${t=>this.wheel(t,e)}>
                </button>
                <span class="tooltip" aria-hidden="true">${n[e].toFixed(2)}</span>
            </div>`}static{this.styles=O`
        :host {
            display: block; box-sizing: content-box;
            --_range-slider-attribute-height: initial;
            height: var(--_range-slider-attribute-height, var(--thermal-range-slider-height, 15px));
            padding-bottom: max(0px, calc(var(--thermal-gap) - 15px));
            margin-bottom: -6px;
        }
        .container {
            height: 100%;
            padding: 0 calc(var(--thermal-gap) * .5);
            color: var(--thermal-slate-dark);
            font-size: 12px;
        }
        .slider-row { display: flex; align-items: center; height: 100%; }
        .track {
            position: relative; flex: 1; min-width: 0; height: 100%;
            background: var(--thermal-slate); cursor: pointer; touch-action: none;
        }
        .fill { position: absolute; height: 100%; pointer-events: none; }
        .handle-position { position: absolute; top: 0; height: 100%; z-index: 20; }
        .handle-position.active { z-index: 21; }
        .handle {
            position: absolute; top: 50%; transform: translate(-50%, -50%);
            box-sizing: border-box; width: 14px; height: calc(100% + 5px); padding: 0; border-radius: 0;
            border: 2px solid var(--thermal-primary); background: var(--thermal-background);
            box-shadow: 0 0 5px var(--thermal-primary); cursor: grab; touch-action: none;
        }
        .handle:hover, .handle:focus-visible { box-shadow: 0 0 10px var(--thermal-primary); }
        .handle:focus-visible { outline: 2px solid var(--thermal-primary); outline-offset: 2px; }
        .handle:active { cursor: grabbing; }
        .handle:disabled { cursor: default; }
        .tooltip {
            position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none;
            top: calc(100% + 16.5px); min-width: 40px; height: 20px; line-height: 20px; text-align: center;
            padding: 0 3px; background: var(--thermal-slate-dark); color: var(--thermal-background);
            border: 1px solid var(--thermal-slate-dark); border-radius: 3px;
        }
        .tooltip::before {
            content: ""; position: absolute; top: -4px; left: calc(50% - 4px);
            width: 7px; height: 7px; transform: rotate(45deg);
            background: var(--thermal-slate-dark);
        }
        .skeleton { height: 100%; background: var(--thermal-slate); }
    `}render(){let e=this.values;if(this.loading||!e)return k`<div class="container loading" aria-busy=${this.loading}><div class="skeleton"></div></div><slot></slot>`;let t=this.draft??e,n=this.percent(t.from,e),r=this.percent(t.to,e);return k`
            <div class="container ready">
                <div class="slider-row">
                    <div class="track"
                        @pointerdown=${this.pointerDown}
                        @pointermove=${this.pointerMove}
                        @pointerup=${this.pointerUp}
                        @pointercancel=${this.pointerCancel}
                        @lostpointercapture=${this.pointerCancel}
                        @wheel=${e=>this.wheel(e,this.activeHandle)}>
                        <div class="fill" style=${Tc({left:`${n}%`,width:`${r-n}%`,background:this.palette?.data.gradient})}></div>
                        ${this.renderHandle(`from`,e,t)}
                        ${this.renderHandle(`to`,e,t)}
                    </div>
                </div>
            </div>
            <slot></slot>`}};R([V({type:String,reflect:!0})],Vd.prototype,`height`,void 0),R([V({type:String,attribute:`style`})],Vd.prototype,`heightStyle`,void 0),R([I({context:Lc,subscribe:!0}),H()],Vd.prototype,`min`,void 0),R([I({context:Rc,subscribe:!0}),H()],Vd.prototype,`max`,void 0),R([I({context:Pc,subscribe:!0}),H()],Vd.prototype,`from`,void 0),R([I({context:Fc,subscribe:!0}),H()],Vd.prototype,`to`,void 0),R([I({context:Kc,subscribe:!0}),H()],Vd.prototype,`palette`,void 0),R([I({context:Ic,subscribe:!0}),H()],Vd.prototype,`loading`,void 0),R([H()],Vd.prototype,`draft`,void 0),R([H()],Vd.prototype,`activeHandle`,void 0);var Hd=class extends yd{constructor(...e){super(...e),this.histogram=[],this.height=`calc( var( --thermal-gap ) * 1.5 )`,this.heightExpanded=`400px`,this.expandable=!1,this.expanded=!1,this.loading=!1,this.error=!1}getClassName(){return`HistogramElement`}connectedCallback(){super.connectedCallback(),this.loading=this.registryObject.histogram.loading,this.registryObject.histogram.onCalculationStart.set(this.UUID,()=>{this.loading=!0,this.error=!1}),this.registryObject.histogram.onCalculationEnd.set(this.UUID,e=>{this.loading=!1,this.error=!e}),this.registryObject.loading.addListener(this.UUID,e=>{e===!0&&(this.loading=!0)})}firstUpdated(e){super.firstUpdated(e),this.registryObject.histogram.addListener(this.UUID,e=>{this.histogram=e})}disconnectedCallback(){super.disconnectedCallback(),this.registryObject.loading.removeListener(this.UUID),this.registryObject.histogram.removeListener(this.UUID),this.registryObject.histogram.onCalculationStart.delete(this.UUID),this.registryObject.histogram.onCalculationEnd.delete(this.UUID)}static{this.styles=O`

        @keyframes spinner {
            0% {left: 0px; width: 0%;}
            50% {left: 25%; width: 50%;}
            100% {left: 100%; width: 0%;}
        }

        .container {
            padding: 0 calc( var( --thermal-gap ) * .5 );
            position: relative;

            .spinner {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: none;
                align-items: center;
                justify-content: center;
                

                span {
                    width: calc( 100% - var(--thermal-gap) );
                    height: 6px;
                    display: block;
                    position: relative;
                    overflow: hidden;
                    border-radius: 3px;

                    &::after {
                        content: "";
                        display: block;
                        background: var(--thermal-slate-dark);
                        position: absolute;
                        opacity: .2;
                        height: 100%;
                        animation-name: spinner;
                        animation-duration: 1s;
                        animation-iteration-count: infinite;
                        animation-timing-function: linear
                    }
                }

            }

            &.loading:not(.has-error) {

                .spinner {
                    display: flex;
                }

                .histogram {
                    opacity: .8;
                }
            }

        }

        .histogram {
            display: flex;
            width: 100%;
            background:  transparent;
            transition: opacity .3s ease-in-out;

            &.expandable {
                transition: all .2s ease-in-out;
                cursor: pointer;
                &:hover {
                    background: var(--thermal-background);
                }
            }
        }

        .histogram-bar {
            flex-grow: 1;
            position: relative;
            height: 100%;

            &:hover {
                .histogram-bar-inner {
                    background: var(--thermal-foreground);
                }
            }
        }

        .histogram-bar-inner {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            background: var(--thermal-slate-dark);
            transition: height .5s ease-in-out;
        }

        .error {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--thermal-slate-light);
            color: var(--thermal-slate);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }


    `}render(){return k`

            <div class="container ${this.histogram.length>0&&this.loading===!1?`ready`:`loading`} ${this.error?`has-error`:`is-ok`}">

                <div class="histogram ${this.expandable===!0?`expandable`:``}" style="height: ${this.expanded?this.heightExpanded:this.height}" part="bg" @click=${()=>{this.expandable===!0&&(this.expanded=!this.expanded)}}>

                    ${this.histogram.map(e=>k`
                            <div class="histogram-bar" data-height="${e.height}" data-percentage="${e.percentage}" data-count="${e.count}" data-from="${e.from}" data-to="${e.to}">
                                <div style="height: ${e.height}%" class="histogram-bar-inner"></div>
                            </div
                        `)}

                </div>

                ${this.error===!0?k`<div class="error">Unable to calculate the histogram</div>`:A}

                <div class="spinner">
                    <span></span>
                </div>

            </div>
        
        `}};R([H()],Hd.prototype,`histogram`,void 0),R([V({type:String,reflect:!0})],Hd.prototype,`height`,void 0),R([V({type:String,reflect:!0})],Hd.prototype,`heightExpanded`,void 0),R([V({type:Boolean,reflect:!0,converter:l(!1)})],Hd.prototype,`expandable`,void 0),R([H()],Hd.prototype,`expanded`,void 0),R([H()],Hd.prototype,`loading`,void 0),R([H()],Hd.prototype,`error`,void 0);var Ud=class extends yd{constructor(...e){super(...e),this.buttonRef=U()}connectedCallback(){super.connectedCallback(),this.registryObject.minmax.addListener(this.UUID,()=>this.setValue())}setValue(){let e=this.registryController.registryObject.minmax.value;this.value=e?`${e.min.toFixed(2)} — ${e.max.toFixed(2)} °C`:void 0}doAction(){this.registryObject.range.applyMinmax()}mouseenter(){this.registryObject.minmax.value!==void 0&&this.registryController&&this.registryController.setHighlight({from:this.registryObject.minmax.value.min,to:this.registryObject.minmax.value.max})}mouseleave(){this.registryController&&this.registryController.setHighlight(void 0)}render(){return k`<thermal-btn 
    ${W(this.buttonRef)} 
    @click=${this.doAction} 
    @mouseenter="${this.mouseenter}" 
    @mouseleave="${this.mouseleave}"
    @focus="${this.mouseenter}"
    @blur="${this.mouseleave}"
    tooltip="${B(this.value)}"
>${N(L.fullrange)}</thermal-btn>`}};R([H()],Ud.prototype,`value`,void 0);var Wd=class extends yd{connectedCallback(){super.connectedCallback(),this.registryObject.histogram.addListener(this.UUID,()=>this.setValue())}setValue(){let e=this.registryController.registryObject.range.autoValue;this.value=e?`${e.from.toFixed(2)} — ${e.to.toFixed(2)} °C`:void 0}doAction(){this.registryObject.range.applyAuto()}onHighlight(){this.registryController.registryObject.range.autoValue&&this.registryController.setHighlight(this.registryController.registryObject.range.autoValue)}onOut(){this.registryController.setHighlight(void 0)}render(){return k`<thermal-btn 
            @click=${this.doAction}
            @mouseenter=${this.onHighlight}
            @mouseleave=${this.onOut}
            @onfocus=${this.onHighlight}
            @onblur=${this.onOut}
            tooltip="${B(this.value)}"
        >${N(L.automaticrange)}</thermal-btn>`}};R([H()],Wd.prototype,`value`,void 0);var Gd=class extends yd{constructor(...e){super(...e),this.fixed=2,this.separator=`-`}render(){return this.from===void 0||this.to===void 0?A:k`
            <div>
                <span>${this.from?.toFixed(this.fixed)} °C</span>
                <span>${this.separator}</span>
                <span>${this.to?.toFixed(this.fixed)} °C</span>
            </div>
        `}};R([I({context:Pc,subscribe:!0})],Gd.prototype,`from`,void 0),R([I({context:Fc,subscribe:!0})],Gd.prototype,`to`,void 0),R([V({type:String,reflect:!0,attribute:!0,converter:{fromAttribute:e=>Math.round(parseFloat(e)),toAttribute:e=>e.toString()}})],Gd.prototype,`fixed`,void 0),R([V({type:String,reflect:!0,attribute:!0})],Gd.prototype,`separator`,void 0);var Kd=zo(class extends Bo{constructor(e){if(super(e),e.type!==Ro.PROPERTY&&e.type!==Ro.ATTRIBUTE&&e.type!==Ro.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ko(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===oa||t===A)return t;let n=e.element,r=e.name;if(e.type===Ro.PROPERTY){if(t===n[r])return oa}else if(e.type===Ro.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return oa}else if(e.type===Ro.ATTRIBUTE&&n.getAttribute(r)===t+``)return oa;return Po(e),t}}),qd=class extends yd{constructor(...e){super(...e),this.containerRef=U()}handleUserChangeEvent(e){let t=parseFloat(e.target.value);this.registryObject.opacity.imposeOpacity(t)}static{this.styles=O`

        :host {
        }

        .thermal-opacity-handler {
            display: block;
            width: 100%;
            max-width: 100px;
            min-width: 75px;
            cursor: pointer;
            accent-color: var(--thermal-primary);
            
        }
        
        .thermal-opacity-container {
            display: flex;
            width: 100%;
            align-items: space-between;
            justify-content: space-between;
            color: var( --thermal-slate-dark );
            font-size: calc( var( --thermal-fs-sm ) * .7 );
            max-width: 100px;
            min-width: 75px;
        }
    
    `}render(){return k`
            <div ${W(this.containerRef)}>
                <input
                    id="handler"
                    class="thermal-opacity-handler"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    .value=${Kd(String(this.value))}
                    @input="${this.handleUserChangeEvent}"
                />
                <div class="thermal-opacity-container">
                    <div>VIS</div>
                    <div>${this.value}</div>
                    <div>IR</div>
                </div>
            </div>
            <slot></slot>
        `}};R([I({context:Nc,subscribe:!0})],qd.prototype,`value`,void 0);var Jd=class extends bd{constructor(...e){super(...e),this.instances=[],this.on=!1}firstUpdated(e){super.firstUpdated(e),this.groupObject.files.addListener(this.UUID,()=>{this.groupObject.analysisGraph.turnOn()}),this.groupObject.analysisGraph.addListener(this.UUID,e=>{e===void 0?(this.data=void 0,this.colors=void 0,this.on=!1):(this.data=e.data,this.colors=e.colors,this.on=!0)})}static{this.styles=O`
    
        .wrapper {
            transition: all 0.3s ease-in-out;
            width: 100%;
            overflow: hidden;
        }

        .on {
            height: 300px;
            border-bottom: 1px solid var( --thermalforeground );
        }

        .off {
            height: 0px;
        }

    `}download(){let e=this.shadowRoot?.querySelectorAll(`google-chart`);console.log(e)}render(){return k`
            <div class="wrapper ${this.on?`on`:`off`}">

                ${this.on===!0?k`
                    <google-chart 
                        .data=${this.data} 
                        .options=${{colors:this.colors,legend:{position:`bottom`},hAxis:{title:`Time`},vAxis:{title:`Temperature °C`},chartArea:{width:`90%`}}}
                        type="line"
                        width="100%"
                        style="width: 100%;height: 300px"
                    ></google-chart>
                `:A}
                
            </div>
        `}};R([H()],Jd.prototype,`instances`,void 0),R([H()],Jd.prototype,`timeout`,void 0),R([H()],Jd.prototype,`data`,void 0),R([H()],Jd.prototype,`colors`,void 0),R([H()],Jd.prototype,`on`,void 0);var Yd=class extends bd{connectedCallback(){if(super.connectedCallback(),this.on){let e=this.UUID+`__initial`;this.groupObject.files.addListener(e,t=>{t.length>0&&(this.groupObject.analysisSync.turnOn(t[0]),this.groupObject.files.removeListener(e))})}else this.on=this.groupObject.analysisSync.value;this.groupObject.analysisSync.addListener(this.UUID,e=>{this.on=e}),this.addEventListener(`click`,()=>{this.toggle()})}turnOn(){this.groupObject.files.value.length>0&&this.groupObject.analysisSync.turnOn(this.groupObject.files.value[0])}turnOff(){this.groupObject.analysisSync.turnOff()}toggle(){this.on?this.turnOff():this.turnOn()}static{this.styles=O`
    
        :host {
            font-size: var(--thermal-fs);
            cursor: pointer;
        }

        :host(:hover) {
            span {

            }

        }

        :host([on=true]) {
            span i {
                background: var(--thermal-primary);
            }
        }

        :host([on=false]) {
            span i {
                background: var(--thermal-slate);
            }
        }

        span {
            transition: all .3s ease-in-out;
            display: inline-block;
            width: .8em;
            height: .8em;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            position: relative;
            overflow: hidden;
        }

        i {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--thermal-background);
            box-sizing: border-box;
        }

        input {
            display: none;
        }

        div {
            font-size: .9em;
            pointer-events: visible;
            display: inline-block;
        }
    
    `}render(){return k`  
        <span><i></i></span>      
        <div>${N(L.analysissync)}</div>
        `}};R([V({type:Boolean,reflect:!0,converter:l(!1)})],Yd.prototype,`on`,void 0);var Xd=class extends bd{static{this.styles=O`
        thermal-btn {
            text-align: left;
        }
    `}render(){let e=this.configController?.settings.export.png,t=this.configController?.settings.export.group;return k`
        
            <thermal-dropdown class="download ${this.classList.contains(`small`)?`small`:``}" .variant=${this.variant} .icon=${this.icon} .iconStyle=${this.iconStyle}>
            
                <span slot="invoker">${N(L.download)}</span>
            
                <thermal-btn 
                    slot="option" 
                    pre="LRC" 
                    @click=${()=>this.groupObject.files.downloadAllFiles()}
                    tooltip=${N(L.downloadoriginalfileshint)}
                    tooltip-placement="right"
                >
                    ${N(L.downloadoriginalfiles)}
                </thermal-btn>

                <thermal-btn 
                    slot="option" 
                    pre="PNG" 
                    @click=${()=>this.groupObject.forEveryInstance(e=>e.export.downloadPng())}
                    tooltip=${N(L.pngofindividualimageshint)}
                    tooltip-placement="right"
                >
                    ${N(L.pngofindividualimages)}
                </thermal-btn>

                <thermal-btn 
                    slot="option"
                    pre="PNG" 
                    @click=${()=>this.groupObject.analysisSync.png.downloadPng({columns:t?.columns??3,showGroupName:t?.groupName??!1,fontSize:e?.fontSize??12,showAnalysis:e?.analyses??!0,showFileDate:e?.fileDate??!0,showFileName:e?.fileName??!1,showThermalScale:e?.thermalScale??!0,width:e?.width??800})}
                    tooltip="${N(L.pngofentiregrouphint)}"
                    tooltip-placement="right"
                >
                    ${N(L.pngofentiregroup)}
                </thermal-btn>

                <thermal-btn 
                    slot="option" 
                    pre="CSV" 
                    @click=${()=>{this.groupObject.analysisSync.csv.downloadAsCsv()}}
                    tooltip=${N(L.csvofanalysisdatahint)}
                    tooltip-placement="right"
                >
                    ${N(L.csvofanalysisdata)}
                </thermal-btn>
            
            </thermal-dropdown>
        
        `}};R([H(),I({context:$c,subscribe:!0})],Xd.prototype,`configController`,void 0),R([V({type:String,reflect:!0})],Xd.prototype,`icon`,void 0),R([V({type:String,reflect:!0})],Xd.prototype,`iconStyle`,void 0),R([V({type:String,reflect:!0})],Xd.prototype,`variant`,void 0);var Zd=class extends bd{static{this.styles=O`

        :host {
        
            display: flex;
            flex-direction: column;
            gap: 5px;

        }

        button.default {
            font-size: calc( var(--thermal-fs) * .8 );
            color: var(--thermal-foreground);
            border-color: var(--thermal-slate);
            border-style: solid;
            border-width: 1px;
            border-radius: var( --thermal-radius );
            background-color: var(--thermal-slate-light);
            white-space: preserve nowrap;
            &:hover {
                cursor: pointer;
                background: var(--thermal-background);
            }
        }
    
    `}render(){let e=this.configController?.settings.export.png,t=this.configController?.settings.export.group;return k`
        
                <button class="default" @click=${()=>this.groupObject.files.downloadAllFiles()}>${N(L.downloadoriginalfiles)}</button>
            
                <button class="default" @click=${()=>this.groupObject.forEveryInstance(e=>e.export.downloadPng())}>${N(L.pngofindividualimages)}</button>
            
            
                <button class="default" @click=${()=>this.groupObject.analysisSync.png.downloadPng({columns:t?.columns,showAnalysis:e?.analyses,showFileDate:e?.fileDate,showFileName:e?.fileName,showThermalScale:e?.thermalScale,showGroupName:t?.groupName,label:this.label,fontSize:e?.fontSize})}>${N(L.pngofentiregroup)}</button>
            
                <button class="default" @click=${()=>{this.groupObject.analysisSync.csv.downloadAsCsv()}}>${N(L.csvofanalysisdata)}</button>
        
        `}};R([V({type:String})],Zd.prototype,`label`,void 0),R([H(),I({context:$c,subscribe:!0})],Zd.prototype,`configController`,void 0);var Qd=class extends Error{constructor(e){super(`Could not get the public IP address`,e),this.name=`IpNotFoundError`}},$d=(e,t)=>{if(!e||typeof e!=`string`)return!1;if(t===`v6`)return/^[\da-f:]+$/i.test(e)&&e.includes(`:`);let n=e.split(`.`);return n.length===4&&n.every(e=>{let t=Number(e);return!Number.isNaN(t)&&t>=0&&t<=255})},ef=(e,t)=>{if(t&&t.throwIfAborted(),!e&&!t)return;let n=[];return e&&n.push(AbortSignal.timeout(e)),t&&n.push(t),n.length===1?n[0]:AbortSignal.any(n)},tf=async(e,t)=>{if(!t)return e;t.throwIfAborted();let n=new Promise((e,n)=>{t.addEventListener(`abort`,()=>n(t.reason),{once:!0})});return Promise.race([e,n])},nf=async(e,t,n={})=>{let r=[...t,...n.fallbackUrls??[]].map(async t=>{let n=await fetch(t);if(!n.ok)throw Error(`HTTP ${n.status}: ${n.statusText}`);let r=(await n.text()).trim();if($d(r,e))return r;throw Error(`Invalid IP`)});try{return await Promise.any(r)}catch(e){throw new Qd({cause:(e.errors??[]).at?.(-1)??e})}},rf=(e,t,n)=>{let r=ef(n.timeout,n.signal);return tf(t(),r)},af={timeout:5e3,onlyHttps:!1},of={v4:[`https://ipv4.icanhazip.com/`,`https://api.ipify.org/`],v6:[`https://ipv6.icanhazip.com/`,`https://api6.ipify.org/`]},sf=((e,t)=>(n={})=>{let r={...af,...n};return rf(e,()=>t(e,r),r)})(`v4`,(e,t)=>nf(e,of[e],t)),cf=class extends bd{connectedCallback(){super.connectedCallback(),sf().then(e=>this.ip=e)}_getUserInfo(){return{ip:this.ip,userAgent:window.navigator.userAgent,windowWidth:window.innerWidth,windowHeight:window.innerHeight,time:new Date().getTime()}}emitMultipleUpload(e){let t=new CustomEvent(`multiple-upload`,{bubbles:!0,cancelable:!1,detail:{...this._getUserInfo(),fileNames:e}});this.dispatchEvent(t)}emitSingleUpload(e,t){let n=new CustomEvent(`uploaded`,{bubbles:!0,cancelable:!1,detail:{...this._getUserInfo(),fileName:e,fileSize:t}});this.dispatchEvent(n)}};R([H()],cf.prototype,`ip`,void 0),R([V({type:Function})],cf.prototype,`onDrop`,void 0);var lf=class extends cf{constructor(...e){super(...e),this.container=U(),this.hover=!1,this.uploading=!1}firstUpdated(e){if(super.firstUpdated(e),this.container.value!==void 0){let e=this.managerObject.service.handleDropzone(this.container.value,!0);e.onMouseEnter.add(this.UUID,()=>{console.log(`mouseenter`),this.hover=!0}),e.onMouseLeave.add(this.UUID,()=>{console.log(`mouseleave`),this.hover=!1}),e.onDrop.set(this.UUID,()=>{this.uploading=!0}),e.onProcessingEnd.add(this.UUID,async e=>{this.onDrop!==void 0&&await this.onDrop(e),this.uploading=!1})}}static{this.styles=O`

        .container {
            color: var(--thermal-foreground);
        }

        .dropin {
            width: 100%;
            aspect-ratio: 4 / 3;
            max-height: 700px;
            transition: background .5s ease-in-out;
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            cursor: pointer;
            background: var( --thermal-slate );
            position: relative;
            overflow: hidden;

        }

        .dropin-gradient {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, var(--thermal-slate-light) 0%, var(--thermal-slate) 100%);
            opacity: 0;
            transition: opacity .5s ease-in-out;
        }

        .hover,
        .dropin:hover {
            .dropin-gradient {
                opacity: .5;
            }
        }

        .dropin-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var( --thermal-gap );
            transition: all .3s ease-in-out;
        }

        @-webkit-keyframes action {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
        }

        @keyframes action {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
        }

        .dropin-uploading {
            transition: all .3s ease-in-out;
            position: absolute;
            
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            transform: translateY(100px);
            opacity: 0;

            color: var(--thermal-foreground);

            svg {
                width: 100px;
                -webkit-animation: action .5s infinite  alternate;
                animation: action .5s infinite  alternate;
            }

        }

        .dropin.uploading {
            .dropin-content {
                opacity: 0;
                transform: translateY( -100px );
            }
            .dropin-uploading {
                opacity: 1;
                transform: translateY(0);
            }
        }

    `}render(){let e={dropin:!0,hover:this.hover,uploading:this.uploading};return k`

            <div class="container">
            
                <div ${W(this.container)} class="${sd(e)}">

                    <div class="dropin-gradient"></div>

                    <div class="dropin-content">
                        <div>${N(L.dragorselectfile)}</div>
                        <thermal-btn 
                            variant="foreground"
                            icon="upload"
                            iconStyle="micro"
                        >${N(L.selectfile)}</thermal-btn>
                    </div>

                    <div class="dropin-uploading">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </div>
                
                </div>

            </div>
        
        `}};R([H()],lf.prototype,`container`,void 0),R([H()],lf.prototype,`hover`,void 0),R([H()],lf.prototype,`uploading`,void 0);var uf=class extends cf{constructor(...e){super(...e),this.container=U(),this.hover=!1,this.uploading=!1}static{this.styles=O`

        .container {
            display: none;
        }

        .dropin {
            background: var( --thermal-slate );
            width: 100%;
            aspect-ratio: 4 / 3;
        }

        .hover {
            background: var( --thermal-slate-light );
        }

        svg {
            width: 1em;
        }



.lds-ellipsis,
.lds-ellipsis div {
  box-sizing: border-box;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 21px;
  height: 1em;
}
.lds-ellipsis div {
  position: absolute;
  top: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 0px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 7px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 14px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 21px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0px, 0);
  }
}


    
    `}firstUpdated(e){super.firstUpdated(e),this.container.value!==void 0&&(this.listener=this.managerObject.service.handleDropzone(this.container.value,!0),this.listener.onMouseEnter.add(this.UUID,()=>{this.hover=!0}),this.listener.onMouseLeave.add(this.UUID,()=>{this.hover=!1}),this.listener.onDrop.set(this.UUID,()=>{this.uploading=!0}),this.listener.onProcessingEnd.add(this.UUID,async e=>{this.onDrop!==void 0&&await this.onDrop(e),this.uploading=!1}))}render(){let e=this.uploading===!1?N(L.uploadafile):k`<div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;return k`
            <thermal-btn 
              icon="${B(this.icon)}"
              iconStyle="${B(this.iconStyle)}"
              tooltip="${B(this.tooltip)}"
              variant="${B(this.variant)}"
            @click="${()=>{this.listener&&this.listener.openFileDialog(!0)}}"><slot>${e}</slot></thermal-btn>

            <div class="container">
            
                <div ${W(this.container)}></div>

            </div>
        
        `}};R([V({type:String,reflect:!0})],uf.prototype,`icon`,void 0),R([V({type:String,reflect:!0})],uf.prototype,`iconStyle`,void 0),R([V({type:String,reflect:!0})],uf.prototype,`tooltip`,void 0),R([V({type:String,reflect:!0})],uf.prototype,`variant`,void 0),R([H()],uf.prototype,`container`,void 0),R([H()],uf.prototype,`hover`,void 0),R([H()],uf.prototype,`uploading`,void 0);var df=class extends Td{constructor(...e){super(...e),this.size=`sm`,this.ref=U(),this.handleMouseOver=e=>{this.isWithinButton(e.relatedTarget)||this.enter()},this.handleMouseOut=e=>{this.isWithinButton(e.relatedTarget)||this.leave()},this.handleFocusIn=e=>{this.isWithinButton(e.relatedTarget)||this.enter()},this.handleFocusOut=e=>{this.isWithinButton(e.relatedTarget)||this.leave()}}onFailure(){}isWithinButton(e){return e instanceof Node&&(this.contains(e)||this.renderRoot.contains(e))}static{this.styles=O`
slot {
    display: content;
}`}render(){return k`<slot 
    @click=${this.action} 
    @mouseover=${this.handleMouseOver}
    @mouseout=${this.handleMouseOut}
    @focusin=${this.handleFocusIn}
    @focusout=${this.handleFocusOut}
    ${W(this.ref)}
>
    <thermal-btn 
        variant=${this.variant||`default`}
        size=${this.size||`sm`}
        plain="${this.plain||!1}"
        class="default"
        tooltip=${this.tooltip}
        icon=${B(this.icon)}
        iconStyle=${B(this.iconStyle)}
    >${this.getDefaultLabel()}</thermal-btn>
</slot>`}};R([V({type:String,reflect:!1})],df.prototype,`variant`,void 0),R([V({type:String,reflect:!0})],df.prototype,`size`,void 0),R([V({type:String})],df.prototype,`icon`,void 0),R([V({type:String})],df.prototype,`iconStyle`,void 0),R([V({type:Boolean})],df.prototype,`plain`,void 0);var ff=class extends bd{static{this.styles=df.styles}connectedCallback(){super.connectedCallback(),this.onmouseenter=()=>{this.groupObject&&this.groupObject.minmax.value&&this.registryController&&this.registryController.setHighlight({from:this.groupObject.minmax.value.min,to:this.groupObject.minmax.value.max})},this.onmouseleave=()=>{this.registryController&&this.registryController.setHighlight(void 0)},this.onclick=()=>{this.groupObject&&this.groupObject.minmax.value&&this.groupObject.registry.range.imposeRange({from:this.groupObject.minmax.value.min,to:this.groupObject.minmax.value.max})},this.groupObject.minmax.addListener(this.UUID,()=>this.setValue())}setValue(){let e=this.groupObject.minmax.value;this.value=e?`${e.min.toFixed(2)} — ${e.min.toFixed(2)} °C`:void 0}render(){return k`
            <slot>
                <thermal-btn 
                    class="default"
                    icon="range"
                    iconStyle="solid"
                    tooltip="${B(this.value)}"
                >${N(L.range).toLowerCase()}</thermal-btn>
            </slot>
        `}};R([H()],ff.prototype,`value`,void 0);var pf=(e,t,n)=>({ms:e,percent:e/t*100,type:n,label:Dt(e,`m:ss`)}),mf=(e,t,n,r)=>{let i=[],a=1,o=(t-e)/n;for(;a<n;){let t=e+a*o;t<r&&i.push(pf(t,r,`minor`)),a+=1}return t<r&&i.push(pf(t,r,`major`)),i},hf=6e4,gf=50,_f=3,vf=(e,t)=>{let n=Math.floor(e/gf)/Math.floor(t/6e4),r=2;n>=2&&(r=4),n>=6&&(r=6),n>=12&&(r=12),n>=30&&(r=30);let i=[],a=0,o=hf;for(;a<t;)mf(a,o,r,t).forEach(e=>i.push(e)),a+=hf,o+=hf;return i.push(pf(0,t,`bound`)),i.push(pf(t,t,`bound`)),i},yf=e=>k`<div
        class="tick tick-${e.type}"
        style="left: ${e.percent}%;"
    >
        <div class="tick-pointer"></div>
        <div class="tick-label">${e.label}</div>
    </div>`,bf=(e,t,n)=>k`<div 
        class="indicator-cursor indicator-cursor__${n}"
        style="left: ${e}%;"
        data-video-rerender
    >
        <div class="indicator-cursor-arrow"></div>
        <div class="indicator-cursor-label">${t}</div>
    </div>`,xf=(e,t,n,r)=>{let i=n/e*100,a=r===void 0?void 0:r/e*100;return k`<div class="ticks">
        
        ${t.map(yf)}

        ${bf(i,Dt(n,`m:ss:SSS`),`primary`)}

        ${r!==void 0&&a!==void 0?bf(a,Dt(r,`m:ss:SSS`),`pointer`):A}

    </div>`},Sf=O`

    :host {

            --tick-color: var( --thermal-slate );
            --tick-opacity: 1;

            --cursor-color: var( --thermal-primary );
            --cursor-bg: var( --thermal-background );

            --fs-sm: calc( var(--thermal-fs) * .7 );

    }

    .indicator-cursor {
        position: absolute;
        width: 0px;
        right: 0;
        font-size: var( --fs-sm );
        z-index: 11;        
    }

        .indicator-cursor__primary {
            --cursor-bg: var( --thermal-primary );
            --cursor-color: white;
        }

        .indicator-cursor__pointer {
            --cursor-bg: var( --thermal-foreground );
            --cursor-color: white;

            .indicator-cursor-arrow {
                position: absolute;
                top: calc( var( --thermal-fs ) * -1 - 6px);
            }

            .indicator-cursor-label {
                position: absolute;
                top: calc( var( --thermal-fs ) * -2 - 3px );
            }
        }

        .indicator-cursor-arrow {
            position: relative;
            width: 6px;
            height: 6px;
            content: "";
            background: var( --cursor-bg );
            left: -4px;
            rotate: 45deg;
        }

        .indicator-cursor-label {
            position: relative;
            top: -3px;
            width: ${gf}px;
            left: -${gf/2}px;
            background: var( --cursor-bg );
            color: var(--cursor-color);
            text-align: center;
        }

        .ticks {
            width: 100%;
            height: calc( var(--thermal-fs) + ${_f}px);
            position: relative;
        }


        .ticks-horizontal-indent {
            padding-left: ${gf/2}px;
            padding-right: ${gf/2}px;
            box-sizing: border-box;
            width: 100%;
        }

        .tick {
            position: absolute;
            width: 0;
            color: var( --tick-color );
            opacity: var( --tick-opacity );
            font-size: var( --fs-sm );
        }

        .tick-bound {

            --tick-color: var( --thermal-foreground );

            .tick-label {
                background: var(--thermal-slate-dark);
                color: var(--thermal-background);
                position: relative;
                top: -${_f}px;
            }

            .tick-pointer {
                width: ${6}px;
                height: ${6}px;
                background: var( --thermal-slate-dark );
                position: relative;
                left: -${_f}px;
                rotate: 45deg;
            }
            
        }

    .tick-major {
        --tick-color: var( --thermal-slate-dark );
    }

    .tick-minor {
        --tick-color: var( --thermal-slate );
    }


    .tick-pointer {
            height: ${_f}px;
            width: 1px;
            content: "";
            background-color: currentcolor;
    }

    .tick-label {
            width: ${gf}px;
            position: relative;
            left: -${gf/2}px;
            text-align: center;
            color: currentcolor;
    }

    

`,Cf=class extends bd{constructor(...e){super(...e),this.ms=0,this.playing=!1,this.instances=[],this.has=!1,this.ticks=[],this.timelineRef=U(),this.indicatorRef=U()}static{this.TICK_WIDTH=50}static{this.TICK_POINTER_HEIGHT=3}connectedCallback(){super.connectedCallback(),this.groupObject.registry.batch.onBatchComplete.set(this.UUID,this.onRegistryBatchEnded.bind(this)),this.groupObject.files.addListener(this.UUID,e=>{this.listener!==void 0&&clearTimeout(this.listener),this.listener=setTimeout(async()=>{this.onRegistryBatchEnded(e)},0)}),this.groupObject.playback.addListener(this.UUID,e=>this.ms=e),this.groupObject.playback.onPlayingStatusChange.set(this.UUID,e=>this.playing=e),this.groupObject.playback.onHasAnyCallback.set(this.UUID,e=>this.has=e)}updated(e){super.updated(e),e.has(`ms`)&&this.ms!==void 0&&(this.ms!==this.groupObject.playback.value&&this.groupObject.playback.setValueByRelativeMs(this.ms),this.indicatorRef.value&&(this.indicatorRef.value.style.width=this.msToPercent(this.ms)+`%`))}onRegistryBatchEnded(e){let t=0;this.instances=e.filter(e=>e instanceof pn?!1:e.group.id===this.groupObject.id),this.instances.forEach(e=>{e.timeline.duration>t&&(t=e.timeline.duration)}),this.longestDurationInMs=t,setTimeout(()=>{let e=this.getTimelineElement();e&&this.longestDurationInMs!==void 0&&(this.calculateTicks(e.clientWidth,this.longestDurationInMs),new ResizeObserver(e=>{let t=e[0];this.longestDurationInMs&&this.calculateTicks(t.contentRect.width,this.longestDurationInMs)}).observe(e))},0)}calculateTicks(e,t){this.ticks=vf(e,t)}forEveryAffectedInstance(e){this.instances.forEach(e)}percentToMs(e){if(this.longestDurationInMs!==void 0)return Math.floor(this.longestDurationInMs*(e/100))}msToPercent(e){if(this.longestDurationInMs!==void 0)return e/this.longestDurationInMs*100}getValueFromEvent(e){let t=e.layerX/e.target.clientWidth*100;return{percent:t,ms:this.percentToMs(t)}}handlePlayButtonClick(){this.groupObject.playback.playing?this.groupObject.playback.stop():this.groupObject.playback.play()}handleTimelineClick(e){let t=e.layerX/e.target.clientWidth*100,n=this.percentToMs(t);n&&(this.ms=n)}handleTimelineEnter(e){let{ms:t}=this.getValueFromEvent(e);this.pointerMs=t}handleTimelineMove(e){let{ms:t}=this.getValueFromEvent(e);this.pointerMs=t}handleTimelineLeave(){this.pointerMs=void 0}static{this.styles=O`


        :host {

            --tick-color: var( --thermal-slate );
            --tick-opacity: 1;

            --cursor-color: var( --thermal-primary );
            --cursor-bg: var( --thermal-background );

            --fs-sm: calc( var(--thermal-fs) * .7 );

        }

        .container {

            padding-top: calc( var(--thermal-fs) + 6px);

        }

        .timeline {
            width: 100%;
            height: var( --thermal-fs );
            position: relative;
            cursor: pointer;
            box-sizing: border-box;
        }

        .background {
            width: 100%;
            height: 100%;
            background-color: var( --thermal-slate );
            pointer-events: none;
        }

        .indicator {
            height: 100%;
            position: absolute;
            content:"";
            top: 0;
            left: 0;
            background-color: var( --thermal-primary );
            pointer-events: none;
        }


        ${Sf}
    
    `}getTimelineElement(){return this.renderRoot.querySelector(`.timeline`)}render(){return this.has===!1?A:k`<div class="container ticks-horizontal-indent">

            <div 
                class="timeline" 
                ${W(this.timelineRef)}
                @click=${e=>this.handleTimelineClick(e)}
                @mouseenter=${this.handleTimelineEnter}
                @mouseleave=${this.handleTimelineLeave}
                @mousemove=${this.handleTimelineMove}
            >
                <div class="background"></div>
                <div class="indicator" ${W(this.indicatorRef)}></div>
            </div>

            ${this.longestDurationInMs===void 0?A:xf(this.longestDurationInMs,this.ticks,this.ms,this.pointerMs)}

        </div>`}};R([H()],Cf.prototype,`longestDurationInMs`,void 0),R([H()],Cf.prototype,`ms`,void 0),R([H()],Cf.prototype,`pointerMs`,void 0),R([H()],Cf.prototype,`playing`,void 0),R([H()],Cf.prototype,`instances`,void 0),R([H()],Cf.prototype,`has`,void 0),R([H()],Cf.prototype,`ticks`,void 0),R([H()],Cf.prototype,`listener`,void 0);var wf=class extends Td{constructor(...e){super(...e),this.container=U(),this.prefersGpu=!0}onInstanceCreated(){this.requestUpdate()}onFailure(){}connectedCallback(){super.connectedCallback(),this.requestUpdate()}updated(e){super.updated(e),this.isConnected&&this.container.value&&(this.mountedInstance===this.file?e.has(`prefersGpu`)&&this.mountedInstance&&(this.mountedInstance.setPreferWebGl(this.prefersGpu),this.mountedInstance.draw()):(this.unmountInstance(),this.file&&(this.file.setPreferWebGl(this.prefersGpu),this.file.mountToDom(this.container.value),this.mountedInstance=this.file,this.file.draw())))}unmountInstance(){this.mountedInstance?.unmountFromDom(),this.mountedInstance=void 0}disconnectedCallback(){this.unmountInstance(),super.disconnectedCallback()}static{this.styles=O`

        :host {
            display: block;
            width: 100%;
            font-size: var( --thermal-fs );
        }

        :host,
        .canvas-container {
            box-sizing: border-box;
        }

        .canvas-container {

            width: 100%;

            background-color: var( --thermal-slate );
            color: var( --thermal-background );

            transition: color .3s ease-in-out, background-color .3s ease-in-out;

            &.is-loading {

                aspect-ratio: 4 / 3;
                display: flex;
                align-items: center;
                justify-content: center;

            }

            &.is-loaded {
        
            }

            &.is-success {

            }

            &.is-error {

                display: flex;
                align-items: center;
                justify-content: center;
                padding: var( --thermal-gap );
                box-sizing: border-box;
            }

        }

        

        .error-wrapper {

            display: flex;
            gap: calc( var( --thermal-gap ) * 0.5 );
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            box-sizing: border-box;
            width: 100%;
            height: 100%;

            border: 2px dashed currentcolor;
            border-radius: var( --thermal-radius );

            padding: var( --thermal-gap );

            thermal-icon {
                width: 2em;
                height: 2em;
            }

            .error-message {
                font-size: small;
                opacity: .5;
            }

        }
    `}renderPlaceholder(){return this.fileIsLoading===!1?A:k`<div class="file-canvas-loading">
    <thermal-spinner color="var(--thermal-background)"></thermal-spinner>
</div>`}renderError(){return this.failure===void 0?A:k`<div class="error-wrapper">
    <thermal-icon 
        icon="warning"
        variant="outline"
    ></thermal-icon>

    <div class="error-title">
        ${N(L.fileloadingerror)}
    </div>
    <div class="error-url">
        ${this.failure?.thermalUrl}
    </div>
    <div class="error-message">
        ${this.failure?.message}
    </div>
</div>`}render(){let e=this.fileIsLoading===!1&&this.failure!==void 0,t=this.fileIsLoading===!1&&this.file!==void 0;return k`<div class=${sd({"canvas-container":!0,"is-loading":this.fileIsLoading,"is-loaded":this.fileIsLoading===!1,"is-success":t,"is-error":e})} part="file-canvas-container">
    <div ${W(this.container)}></div>
    ${this.renderPlaceholder()}
    ${this.renderError()}
</div>`}};R([V({type:Boolean,attribute:`prefers-gpu`})],wf.prototype,`prefersGpu`,void 0);function Tf(e,t,n){return e?t(e):n?.(e)}var Ef=class extends Td{constructor(...e){super(...e),this.size=`md`,this.label=`Exportovat video`,this.dialogRef=U(),this.panelRef=U(),this.slug=this.UUID+`__file-export`,this.isOpen=!1}onInstanceCreated(){}onFailure(){}renderDialog(){let e=Tf(this.isOpen,()=>k`<file-video-export-panel ${W(this.panelRef)}></file-video-export-panel>`,()=>A);return k`<thermal-dialog
            ${W(this.dialogRef)}
            label="${this.t(`export`)}"
            is-fullscreen="true"
            .onCloseEveryTime=${()=>(this.isOpen=!1,!0)}
        >

            <div slot="content" style="height: 100%;">
                ${e}
            </div>

            ${this.renderCurrentFrameExportButton()}

            ${this.renderVideoExportButton()}
        
        </thermal-dialog>`}renderVideoExportButton(){return!this.file||this.file&&this.file.timeline.isSequence===!1?A:k`<thermal-btn
                variant="primary"
                slot="button"
                icon="download"
                iconStyle="micro"
                @click=${()=>{this.panelRef?.value&&(this.panelRef?.value).record()}}
            >${this.t(L.exportvideo)} (MP4)</thermal-btn>`}renderCurrentFrameExportButton(){return this.file?k`<thermal-btn
                variant="primary"
                slot="button"
                icon="download"
                iconStyle="micro"
                @click=${()=>{this.panelRef?.value&&(this.panelRef?.value).currentFrame()}}
            >${this.file.timeline.isSequence?`Současný snímek`:this.t(L.exportpng)} (PNG)</thermal-btn>`:A}renderTriggerButton(){return k`<thermal-btn
            @click=${()=>{this.dialogRef.value?.setOpen(),this.isOpen=!0}}
            variant=${this.variant||`default`}
            size=${this.size||`md`}
            plain="${this.plain||!1}"
            icon=${B(this.icon)}
            iconStyle=${B(this.iconStyle)}
            tooltip=${B(this.tooltip)}
            pre=${B(this.pre)}
            style="width: 100%; justify-content: flex-start;"
        >
            ${this.label}
        </thermal-btn>`}render(){return k`
            ${this.renderDialog()}
            ${this.renderTriggerButton()}
        `}};R([V({type:String,reflect:!0})],Ef.prototype,`variant`,void 0),R([V({type:String,reflect:!0})],Ef.prototype,`size`,void 0),R([V({type:String})],Ef.prototype,`icon`,void 0),R([V({type:String})],Ef.prototype,`iconStyle`,void 0),R([V({type:Boolean})],Ef.prototype,`plain`,void 0),R([V({type:String,reflect:!0})],Ef.prototype,`tooltip`,void 0),R([V({type:String,reflect:!0})],Ef.prototype,`label`,void 0),R([V({type:String,reflect:!0})],Ef.prototype,`pre`,void 0),R([H()],Ef.prototype,`isOpen`,void 0);var Df=class extends Td{constructor(...e){super(...e),this.enabled=`on`,this.playbackSpeed=1}onInstanceCreated(){}onFailure(){}handleEntryClick(e,t){this.file&&(this.file.timeline.playbackSpeed=parseFloat(t));let n=e.target;n&&n.parentElement&&n.parentElement instanceof cd&&n.parentElement.setClose()}renderEntry(e){return k`<thermal-btn
            style="width: 100%;"
            slot="option"
            variant="${this.playbackSpeed.toString()===e?`background`:`default`}"
            @click="${t=>this.handleEntryClick(t,e)}"
        >
            ${e}x
        </thermal-btn>`}render(){return this.file===void 0?A:k`<thermal-dropdown 
            interactive="${this.enabled}" 
            .tooltip=${N(L.playbackspeed)}
        >

            <div slot="invoker" class="button">
                ${this.playbackSpeed}x
            </div>

            ${Object.entries(Rn).map(([e])=>this.renderEntry(e))}
            
        </thermal-dropdown>`}};R([V({type:String,reflect:!0})],Df.prototype,`enabled`,void 0),R([H(),I({context:uc,subscribe:!0})],Df.prototype,`playbackSpeed`,void 0);var Of=class extends Td{constructor(...e){super(...e),this.hasGraphs=!1,this.recordingGraphRef=U(),this.dropdownRef=U()}onInstanceCreated(e){e.analysisData.onGraphsPresence.set(this.UUID,e=>{this.hasGraphs=e}),this.hasGraphs=e.analysisData.hasActiveGraphs}onFailure(){}render(){return this.file===void 0?A:k`

            <thermal-dropdown ${W(this.dropdownRef)} class="download"
                icon=${B(this.icon)}
                iconStyle=${B(this.iconStyle)}
                variant=${B(this.variant)}
            >

                <slot name="invoker" slot="invoker">
                    <div class="button">
                        ${this.file?N(L.download):`...`}
                    </div>
                </slot>

                <thermal-btn 
                    slot="option"
                    @click="${()=>window.open(this.file.thermalUrl)}"
                    pre="LRC"
                    align="left"
                >
                    ${N(L.downloadoriginalfile,{type:this.file.reader.parser.extensions[0].extension.toUpperCase()})}
                </thermal-btn>

                <thermal-btn 
                    slot="option"
                    @click=${()=>this.file.export.downloadPng({width:this.configController?.settings.export.png.width??1350,fontSize:this.configController?.settings.export.png.fontSize,showAnalysis:this.configController?.settings.export.png.analyses,showThermalScale:this.configController?.settings.export.png.thermalScale,showFileDate:this.configController?.settings.export.png.fileDate,showFileName:this.configController?.settings.export.png.fileName})}
                    pre="PNG"
                    align="left"
                >
                    ${N(L.exportcurrentframeaspng)}
                </thermal-btn>

                <file-video-export-button 
                    pre="${this.file.timeline.isSequence?`MP4 / PNG`:`PNG`}" 
                    label="Pokročilý export" 
                    slot="option"
                    style="width: 100%"
                ></file-video-export-button>



                    ${this.hasGraphs===!0?k`<thermal-btn 
                            slot="option"
                            @click=${()=>this.file?.analysisData.downloadData()}
                            pre="CSV"
                            align="left"
                    >
                        ${N(L.csvofanalysisdata)}
                    </thermal-btn>`:A}
            
            </thermal-dropdown>

            <thermal-dialog 
                ${W(this.recordingGraphRef)}
                label="Export souboru do videa"
                button="Začít nahrávat"
                .beforeClose=${async()=>(this.file?.recording.recordEntireFile(),!0)}
            >

                <div slot="content">

                    <p>Export probíhá tak, že sekvenci ve Vašem prohlížeči přehrajeme a zaznamenáme do video souboru.</p>

                    <p>Součástí exportu <i>nejsou analýzy ani teplotní škála</i>.</p>

                    <p><strong>Při nahrávání bude použito aktuální nastavení:</strong></p>

                    <table>

                        <tr>
                            <td>Barevná paleta</td>
                            <td>
                                <manager-palette-dropdown></manager-palette-dropdown>
                            </td>
                        </tr>

                        <tr>
                            <td>Teplotní rozsah</td>
                            <td>
                                <registry-range-form></registry-range-form>
                            </td>
                        </tr>

                        <tr>
                            <td>Rychlost přehrávání</td>
                            <td>
                                <file-playback-speed-dropdown></file-playback-speed-dropdown>
                            </td>
                        </tr>

                    </table>

                    <p>Chcete zahájit nahrávání?</p>


                </div>

                <thermal-btn slot="button" @click=${()=>this.dropdownRef.value?.setClose()}>
                    Zrušit
                </thermal-btn>

            </thermal-dialog>

        
        `}};R([H(),I({context:$c,subscribe:!0})],Of.prototype,`configController`,void 0),R([H()],Of.prototype,`hasGraphs`,void 0),R([V({type:String,reflect:!0})],Of.prototype,`variant`,void 0),R([V({type:String,reflect:!0})],Of.prototype,`icon`,void 0),R([V({type:String,reflect:!0})],Of.prototype,`iconStyle`,void 0);var kf=class extends df{constructor(...e){super(...e),this.tooltip=void 0}onInstanceCreated(){}enter(){this.onEnter&&this.file&&this.onEnter(this.file)}leave(){this.onLeave&&this.file&&this.onLeave(this.file)}action(){this.onAction&&this.file&&this.onAction(this.file)}getDefaultLabel(){return this.label}};R([V({type:String})],kf.prototype,`label`,void 0),R([V({type:Object})],kf.prototype,`onEnter`,void 0),R([V({type:Object})],kf.prototype,`onLeave`,void 0),R([V({type:Object})],kf.prototype,`onAction`,void 0);var Af=class extends z{constructor(...e){super(...e),this.expanded=!1}toggle(){this.expanded=!this.expanded}expand(){this.expanded=!0}collapse(){this.expanded=!1}updated(e){super.updated(e),e.has(`expanded`)&&(this.expanded===!0?this.classList.add(`expanded`):this.classList.remove(`expanded`))}static{this.styles=O`
        :host {
            
        }

        .container {
            display: block;
            position: relative;
        }

        .dropdown {

            z-index: 999;

            position: absolute;
            right: 0px;
            
            box-sizing: border-box;
            
            overflow: hidden;
            max-height: 0px;

            > div {
                padding: 5px; 
                background-color: var(--thermal-background);
                border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                border-radius: var(--thermal-radius);

                display: flex;
                flex-direction: column;
                gap: 5px;
                align-items: flex-end;
                justify-content: flex-end;

            }

        }


        .backdrop {
            display: none;
            cursor: pointer;
        }


        button.default {
            font-size: calc( var(--thermal-fs) * .8 );
            color: var(--thermal-foreground);
            border-color: var(--thermal-slate);
            border-style: solid;
            border-width: 1px;
            border-radius: var( --thermal-radius );
            background-color: var(--thermal-slate-light);
            &:hover {
                cursor: pointer;
                background: var(--thermal-background);
            }
        }


        :host(.expanded) .dropdown {

            max-height: 500px;

        }

        :host(.expanded) .backdrop {

            display: block;
            position: fixed;
            top: -100vh;
            left: -100vw;
            height: 200vh;
            width: 200vw;
            z-index: 998;

        }



    `}render(){return k`
            <div class="backdrop" @click=${()=>this.collapse()}></div>
            <div class="container">
                <thermal-btn variant="default" size="sm" icon="ellipsis" iconStyle="micro" @click=${()=>{this.toggle()}}>${this.label??A}</thermal-btn>
                <nav class="dropdown">
                    <div>
                        <slot></slot>
                    </div>
                </nav>
            </div>
        `}};R([V({type:String,reflect:!0})],Af.prototype,`label`,void 0),R([H()],Af.prototype,`expanded`,void 0);var jf=class extends df{constructor(...e){super(...e),this.tooltip=void 0}onInstanceCreated(){}enter(){}leave(){}action(){if(this.file){let e=document.createElement(`a`);e.href=this.file.thermalUrl,e.download=this.file.fileName,e.click()}}getDefaultLabel(){return`lrc`}},Mf=class extends df{constructor(...e){super(...e),this.tooltip=void 0}onInstanceCreated(){}enter(){}leave(){}action(){if(this.file){let e=this.configController?.settings.export.png;this.file.export.downloadPng({width:e?.width,fontSize:e?.fontSize,showAnalysis:e?.analyses,showThermalScale:e?.thermalScale,showFileName:e?.fileName,showFileDate:e?.fileDate})}}getDefaultLabel(){return`png`}};R([H(),I({context:$c,subscribe:!0})],Mf.prototype,`configController`,void 0);var Nf=class extends df{constructor(...e){super(...e),this.tooltip=N(L.range),this.hideLabel=!1}onInstanceCreated(e){this.tooltip=[e.min.toFixed(2),`—`,e.max.toFixed(2),`°C`].join(` `)}enter(){this.registryController&&this.file&&this.registryController.setHighlight({from:this.file.min,to:this.file.max})}leave(){this.registryController&&this.registryController.setHighlight(void 0)}action(){this.file&&this.file.group.registry.range.imposeRange({from:this.file.min,to:this.file.max})}getDefaultLabel(){return this.hideLabel?``:N(L.range).toLowerCase()}};R([V({type:String,converter:l(!1)})],Nf.prototype,`hideLabel`,void 0);var Pf=class extends Td{constructor(...e){super(...e),this.tableMode=`full`,this.forceinteractiveanalysis=!1,this.graphActivationEnabled=!0,this.mayHaveGraph=!1,this.hasAnalysis=!1,this.isDrawingAnalysis=!1,this.hasGraph=!1,this.graphRef=U(),this.graphWidth=0,this.graphHeight=0,this.watchedAnalyses=new Set,this.showhint=!0,this.pointerUpListener=()=>{this.isDrawingAnalysis=!1}}connectedCallback(){super.connectedCallback(),this.refreshFileState(),this.hydrate(),this.requestUpdate()}disconnectedCallback(){this.dehydrate(),this.disconnectObserver(),super.disconnectedCallback()}onInstanceCreated(){this.requestUpdate()}onFailure(){}refreshFileState(){this.mayHaveGraph=this.file?.timeline.isSequence??!1,this.hasAnalysis=(this.file?.analysis.value.length??0)>0,this.hasGraph=this.file?.analysis.value.some(e=>{let{MIN:t,MAX:n,AVG:r}=e.graph.state;return t||n||r})??!1,this.hasAnalysis||(this.isDrawingAnalysis=!1)}hydrate(){let e=this.file;this.isConnected&&this.boundFile!==e&&(this.dehydrate(),this.boundFile=e,e&&(e.analysis.addListener(this.UUID,e=>{this.syncAnalyses(e),this.refreshFileState()}),this.syncAnalyses(e.analysis.value)))}syncAnalyses(e){for(let t of this.watchedAnalyses)e.includes(t)||(t.graph.onGraphActivation.delete(this.UUID),this.watchedAnalyses.delete(t));e.forEach(e=>this.watchAnalysis(e));let t=e.length>0?this.boundFile?.dom?.listenerLayer?.getLayerRoot():void 0;t!==this.listenerLayer&&(this.listenerLayer?.removeEventListener(`pointerup`,this.pointerUpListener),this.listenerLayer=t,this.listenerLayer?.addEventListener(`pointerup`,this.pointerUpListener))}watchAnalysis(e){this.watchedAnalyses.has(e)||(this.watchedAnalyses.add(e),e.graph.onGraphActivation.set(this.UUID,()=>{this.refreshFileState()}))}dehydrate(){this.boundFile?.analysis.removeListener(this.UUID);for(let e of this.watchedAnalyses)e.graph.onGraphActivation.delete(this.UUID);this.watchedAnalyses.clear(),this.listenerLayer?.removeEventListener(`pointerup`,this.pointerUpListener),this.listenerLayer=void 0,this.boundFile=void 0}willUpdate(e){super.willUpdate(e),e.has(`file`)&&(this.isDrawingAnalysis=!1,this.refreshFileState())}updated(e){super.updated(e),e.has(`file`)&&this.hydrate(),this.observeGraph()}observeGraph(){let e=this.isConnected?this.graphRef.value:void 0;e!==this.observedGraph&&(this.disconnectObserver(),e&&(this.observedGraph=e,this.observer=new ResizeObserver(t=>{if(this.observedGraph!==e||!this.isConnected)return;let n=t.find(t=>t.target===e);n&&(this.graphWidth=n.contentRect.width,this.graphHeight=n.contentRect.height)}),this.observer.observe(e)))}disconnectObserver(){this.observer?.disconnect(),this.observer=void 0,this.observedGraph=void 0}renderButtons(){return k`
            <div class="buttons">
                ${(this.file===void 0?[]:Object.values(this.file.group.tool.tools).filter(e=>e instanceof ei)).map(e=>k`<thermal-btn @click=${()=>{this.isDrawingAnalysis=!0,this.file?.group.tool.selectTool(e)}}>
                    <div style="display: flex; align-items: center; gap: 10px">
                        <div style="width: 1.5em; display: inline-block;">
                            ${Ps(e.icon)}
                        </div>
                        <div>
                            ${N(L[e.name])}
                        </div>
                    </div>
                </thermal-btn>`)}
            </div>

            <slot></slot>
        
        `}renderCurrentTooltip(){return k`${N(L[this.managerObject.tool.value.description])}`}renderAddAnalysis(){return k`<div class="addanalysis">

            ${this.showhint?k`<div>
                    <strong>${N(L.analysis)}</strong>
                </div>

                <div>${N(L.analysishint)}</div>`:A}


            ${this.isDrawingAnalysis===!0?this.renderCurrentTooltip():this.renderButtons()}
        </div>`}renderGraph(){return this.mayHaveGraph?this.hasGraph===!0?k`
            
            <div class="graph" ${W(this.graphRef)}>
                <file-analysis-graph graphWidth=${this.graphWidth} graphHeight=${this.graphHeight}></file-analysis-graph>
            </div>`:this.hasAnalysis===!0?k`<div class="graph graph-prompt">
                    <div>
                        <strong>${N(L.graph)}</strong>
                    </div>
                    <div class="hint">${Ps(N(L.graphhint2))}</div>
                </div>`:k`<div class="graph graph-prompt">
                    <div>
                        <strong>${N(L.graph)}</strong>
                    </div>
                    <div class="hint">${N(L.graphhint1)}</div>
                </div>`:A}static{this.styles=O`

        :host {
            display: block;
            min-width: 0;
            max-width: 100%;
        }

        .container {
            height: 100%;
            width: 100%;
            color: var(--thermal-foreground);
        }

        .container.may {
            display: flex;
            flex-direction: column;
            gap: var(--thermal-gap);

            > * {
                width: 100%;
            }

            .analysis {
                height: calc( 50% - var(--thermal-gap));
            }

        }

        .container.may-not {
            .analysis {
                height: 100%;
            }
        }

        .analysis {
            min-width: 0;
        }
    
        .addanalysis {
            padding: var(--thermal-gap);
            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--thermal-gap);
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        .graph {
            height: 50%;
        }

        .graph-prompt {
            padding: var(--thermal-gap);
            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--thermal-gap);
        }

        .hint {
            thermal-btn {
                display: inline-block;
                cursor: help;
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 5px;
        }

        file-analysis-table {
        }
    
    `}render(){return k`
            <div class="container ${this.mayHaveGraph===!0?`may`:`may-not`}">

            <div class="analysis">
                ${this.hasAnalysis===!1||this.isDrawingAnalysis===!0?this.renderAddAnalysis():k`<file-analysis-table
                    .tableMode=${this.tableMode}
                    .forceinteractiveanalysis=${this.forceinteractiveanalysis}
                    .graphActivationEnabled=${this.graphActivationEnabled}
                ></file-analysis-table>`}
            </div>
            ${this.renderGraph()}

            </div>

        `}};R([V({attribute:`table-mode`})],Pf.prototype,`tableMode`,void 0),R([V({type:Boolean})],Pf.prototype,`forceinteractiveanalysis`,void 0),R([V({type:Boolean,attribute:`graph-activation-enabled`})],Pf.prototype,`graphActivationEnabled`,void 0),R([H()],Pf.prototype,`mayHaveGraph`,void 0),R([H()],Pf.prototype,`hasAnalysis`,void 0),R([H()],Pf.prototype,`isDrawingAnalysis`,void 0),R([H()],Pf.prototype,`hasGraph`,void 0),R([H()],Pf.prototype,`graphWidth`,void 0),R([H()],Pf.prototype,`graphHeight`,void 0),R([V({type:Boolean,reflect:!0,converter:l(!0)})],Pf.prototype,`showhint`,void 0);var Ff=class extends Td{constructor(...e){super(...e),this.container=U(),this.analysis=[]}onFailure(){}onInstanceCreated(){this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.file&&(this.analysis=this.file.analysis.value),this.bindFile()}disconnectedCallback(){this.unbindFile(),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),e.has(`file`)&&(this.analysis=this.file?.analysis.value??[])}updated(e){super.updated(e),e.has(`file`)&&this.bindFile()}bindFile(){if(!this.isConnected||this.boundFile===this.file)return;this.unbindFile(),this.boundFile=this.file;let e=this.boundFile;e&&(e.analysis.addListener(this.UUID,e=>{this.analysis=e}),e.timeline.onFrame.add(this.UUID,()=>{this.requestUpdate()}))}unbindFile(){this.boundFile?.analysis.removeListener(this.UUID),this.boundFile?.timeline.onFrame.delete(this.UUID),this.boundFile=void 0}static{this.styles=O`
    
        .overflow {
            overflow-x:auto;
            width: 100%;
        }

        table {
            display: table;
            min-width: 100%;
            border-collapse: collapse;
            color: var( --thermal-foreground );
            td, th {
                padding: calc( var( --thermal-fs ) * .5 )
            }

            td {
                border-top: var(--thermal-slate-light ) 1px solid;
            }
        }

        th {
            text-align: left;
        }

        th, td, button, thermal-btn {
            font-size: var( --thermal-fs-sm );
            font-size: 14px;
        }

        caption {
            display: none !important;
        }

        file-analysis-table-row {
            color: var( --thermal-foreground );
            transition: background-color .2s ease-in-out;
        }

        file-analysis-table-row:not(:last-child) {
            border-bottom: var(--thermal-border-width) dotted var( --thermal-foreground );
        }

        file-analysis-table-row[selected] {
            background-color: var( --thermal-background );
        }

        .all {

            &.interactive {
                cursor: pointer;
            }

            &.interactive:hover {
                color: var( --thermal-primary );
            }

            u, b, span {
                display: inline-block;
            }

            u {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            }

            &.yes u {
                background-color: var( --thermal-slate-dark );
            }

            button {
                margin: 0;
                padding: 0;
                border: 0;
                background: transparent;
                color: var( --thermal-primary );
                text-transform: lowercase;
                cursor: pointer;

                &:hover,
                &:focus {
                    color: var( --thermal-primary-dark );
                }
            }

        }

        .analysis-name {
            display: flex;
            align-items: center;
            gap: .5em;
            strong,
            span {
                display: inline-block;
            }

            strong {
                width: 1.5em;
                height: 2px;
            }
        }



    `}render(){return this.analysis.length===0||this.file===void 0?A:k`

        <div class="overflow" ${W(this.container)}>

            <table>

                <caption data-video-ignore>Table of analysis currently set on the file ${this.file.fileName}.</caption>

                <thead>

                    <tr>
                        <th></th>
                        <th>${N(L.avg)}</th>
                        <th>${N(L.min)}</th>
                        <th>${N(L.max)}</th>
                        <th>${N(L.size)}</th>
                    </tr>
                
                </thead>

                <tbody>

                    ${this.analysis.map(e=>this.renderAnalysisRow(e))}
                
                </tbody>

                </table>

            </div>
            
        `}renderAnalysisRow(e){let{MIN:t,MAX:n,AVG:r}=e.graph.state;return k`<tr>
            <td class="analysis-name">
                <strong style="background: ${e.color};"></strong>
                <span>${e.name}</span>
            </td>
            ${this.renderAnalysisRowTemperatureCell(e.color,r,e.avg)}
            ${this.renderAnalysisRowTemperatureCell(e.color,t,e.min)}
            ${this.renderAnalysisRowTemperatureCell(e.color,n,e.max)}
            <td>${e.width} x ${e.height} px</td>
        </tr>`}renderAnalysisRowTemperatureCell(e,t,n){let r={padding:`4px 0px`};t&&(r.borderColor=e,r.borderStyle=`solid`,r.borderWidth=`2px`,r.padding=`2px 6px`);let i=`-`;return n!==void 0&&(i=n.toFixed(2)+` °C`),k`
            <td>
                <span style=${Tc(r)} data-video-dynamic>
                    ${i}
                </span>
            </td>
        `}};R([H()],Ff.prototype,`analysis`,void 0);var If=class extends z{willUpdate(e){super.willUpdate(e),e.has(`analysis`)&&(this.name=this.analysis.name,this.type=this.analysis.getType())}updated(e){if(super.updated(e),e.has(`analysis`)){let t=e.get(`analysis`);t&&t.onSetName.delete(this.UUID),this.analysis.onSetName.set(this.UUID,e=>{this.name=e})}}static{this.styles=O`
    
        :host {
        
            display: inline-block;

        }

    `}render(){return k`

            <thermal-dialog label="${N(L.editsth,{what:N(L[this.type])})}">
                <slot name="invoker" slot="invoker">
                    <thermal-btn 
                        icon="settings" 
                        iconStyle="solid" 
                        size="md" 
                        tooltip="${N(L.editsth,{what:this.analysis.name})}"
                    >
                    </thermal-btn>
                </slot>

                <div slot="content">
                    ${this.analysis instanceof vn?k`<edit-point .analysis=${this.analysis}></edit-point>`:k`<edit-area .analysis=${this.analysis}></edit-area>`}
                </div>

            </thermal-dialog>
        
        `}};R([V()],If.prototype,`analysis`,void 0),R([H()],If.prototype,`name`,void 0),R([H()],If.prototype,`type`,void 0);var Lf={},Rf=zo(class extends Bo{constructor(){super(...arguments),this.ot=Lf}render(e,t){return t()}update(e,[t,n]){if(Array.isArray(t)){if(Array.isArray(this.ot)&&this.ot.length===t.length&&t.every((e,t)=>e===this.ot[t]))return oa}else if(this.ot===t)return oa;return this.ot=Array.isArray(t)?Array.from(t):t,this.render(t,n)}}),zf=class extends Td{constructor(...e){super(...e),this.hydrated=!1,this.graphWidth=0,this.graphHeight=0,this.hasDownloads=!0,this.standalone=!1,this.container=U(),this.graphRef=U(),this.graphs={values:[[]],colors:[]},this.receiveGraphData=e=>{this.graphs=e},this.shadowLeft=0,this.shadowTop=0,this.shadowWidth=0,this.shadowHeight=0,this.graphSmooth=!1,this.syncChartArea=()=>{let e=this.graphRef.value;e&&(this.shadowLeft=e.left,this.shadowTop=e.top,this.shadowWidth=e.w,this.shadowHeight=e.h)},this.downloadSVG=(e,t)=>{e.getAttribute(`xmlns`)||e.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`);let n=e.outerHTML,r=new Blob([n],{type:`image/svg+xml;charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)},this.downloadPNG=(e,t)=>{e.getAttribute(`xmlns`)||e.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`);let n=e.outerHTML,r=new Blob([n],{type:`image/svg+xml;charset=utf-8`}),i=URL.createObjectURL(r),a=new Image;a.onload=()=>{let e=document.createElement(`canvas`);e.width=a.width,e.height=a.height,e.getContext(`2d`)?.drawImage(a,0,0);let n=e.toDataURL(`image/png`),r=document.createElement(`a`);r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)},a.src=i},this.handleGraphClick=e=>{let t=this.file;t?.timeline.isSequence&&t.timeline.setRelativeTime(e)},this.handleGraphHover=e=>{this.fileController.setTimeCursorPercentage(e)}}onInstanceCreated(e){this.graphs=e.analysisData.value,this.hydrated=!0,this.requestUpdate()}connectedCallback(){super.connectedCallback(),this.file&&(this.graphs=this.file.analysisData.value,this.hydrated=!0),this.requestUpdate()}disconnectedCallback(){this.unbindFile(),this.disconnectObserver(),super.disconnectedCallback()}onFailure(){this.unbindFile(),this.disconnectObserver()}willUpdate(e){super.willUpdate(e),e.has(`file`)&&(this.graphs=this.file?.analysisData.value??{values:[[]],colors:[]},this.hydrated=this.file!==void 0)}updated(e){super.updated(e),this.bindFile(),this.toggleAttribute(`data-has-graphs`,!!this.file?.timeline.isSequence&&this.graphs.colors.length>0),this.observeContainer()}bindFile(){this.isConnected&&this.boundFile!==this.file&&(this.unbindFile(),this.boundFile=this.file,this.boundFile?.analysisData.addListener(this.UUID,this.receiveGraphData))}unbindFile(){this.boundFile?.analysisData.removeListener(this.UUID),this.boundFile=void 0}observeContainer(){let e=this.isConnected&&this.standalone?this.container.value:void 0;e!==this.observedContainer&&(this.disconnectObserver(),e&&(this.observedContainer=e,this.observer=new ResizeObserver(t=>{if(!this.isConnected||this.observedContainer!==e)return;let n=t.find(t=>t.target===e);n&&(this.graphWidth=n.contentRect.width,this.graphHeight=n.contentRect.height)}),this.observer.observe(e)))}disconnectObserver(){this.observer?.disconnect(),this.observer=void 0,this.observedContainer=void 0}getChartData(){if(this.chartDataSource===this.graphs&&this.chartDataCache)return this.chartDataCache;let[e,...t]=this.graphs.values;return this.chartDataSource=this.graphs,this.chartDataCache=[[{label:e[0],type:`number`},...e.slice(1).flatMap(e=>[{label:e,type:`number`},{type:`string`,role:`tooltip`,p:{html:!0}}])],...t.map(t=>{let n=t[0].getTime();return[n,...t.slice(1).flatMap((t,r)=>[t,`<div style="padding: 6px 8px"><div>${this.escapeHtml(N(L.time))}: <strong>${tr.duration(n)}</strong></div><div>${this.escapeHtml(e[r+1])}: <strong>${this.escapeHtml(String(t))} °C</strong></div></div>`])]})],this.chartDataCache}getChartOptions(){let e=this.file?.duration??0,t=N(L.time),n=`${N(L.temperature)} °C`,r=JSON.stringify([this.graphs.colors,this.graphSmooth,this.graphWidth,this.graphHeight,e,t,n]);return this.chartOptionsCache&&this.chartOptionsCacheKey===r||(this.chartOptionsCacheKey=r,this.chartOptionsCache={colors:this.graphs.colors,curveType:this.graphSmooth?`function`:`default`,legend:{position:`bottom`},hAxis:{title:t,ticks:this.getDurationAxisTicks(),viewWindow:{min:0,max:e}},vAxis:{title:n},tooltip:{isHtml:!0},width:this.graphWidth,height:this.graphHeight,chartArea:{width:`80%`},backgroundColor:{fill:`transparent`}}),this.chartOptionsCache}getDurationAxisTicks(){let e=this.file?.duration??0;if(e<=0)return[];let t=e/5,n=10**Math.floor(Math.log10(t)),r=t/n,i=(r<=1?1:r<=2?2:r<=5?5:10)*n,a=[];for(let t=0;t<=e;t+=i)a.push({v:t,f:tr.duration(t)});return a[a.length-1]?.v!==e&&a.push({v:e,f:tr.duration(e)}),a}escapeHtml(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]??e)}static{this.styles=O`

        :host {
            position: relative;
        }

        :host([standalone="true"]) {
            display: block;
            height: var(--thermal-analysis-graph-height, 12rem);
            min-width: 0;
            margin-top: .5em;
        }

        :host([standalone="true"]:not([data-has-graphs])) {
            display: none;
        }

        :host([standalone="true"]) .chart-container {
            height: 100%;
            width: 100%;
        }
    
        google-chart {
            width: 100%;
            height: 100%;
        }

        .download {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            gap: 0.25em;
        }

        thermal-icon {
            width: .8em;
            height: .8em;
            vertical-align: middle;
            margin-top: 1px;
        }
    `}render(){return this.file?.timeline.isSequence===!1||this.standalone&&(!this.file||this.graphs.colors.length===0)?A:k`

            <div style="position: relative; background-color: white; border-radius: var(--thermal-radius); height: 100%;">

            

            <div data-video-style style="position: absolute; top:${this.shadowTop}px; left: ${this.shadowLeft}px; width: ${this.shadowWidth}px; height: ${this.shadowHeight}px; pointer-events: none;">
            ${this.currentFrame&&k`
                <div data-video-style style="position: absolute; height: 100%; background-color: #eee; left: 0px; width: ${this.currentFrame.percentage}%"></div>
            `}

                ${this.cursor===void 0?A:k`
                    <div data-video-style style="position: absolute; height: 100%; width: 1px; background-color: black; left: ${this.cursor}%"></div>
                `}
            </div>
        
            <div class="chart-container" ${W(this.container)}>
                ${this.graphs.colors.length>0?k`<thermal-chart 
                        ${W(this.graphRef)}
                        data-video-svg
                        type="line" 
                        .data=${Rf([this.graphs],()=>this.getChartData())}
                        .onGraphClick=${this.handleGraphClick}
                        .onGraphHover=${this.handleGraphHover}
                        @google-chart-ready=${this.syncChartArea}
                        .options=${Rf([this.graphs.colors,this.graphSmooth,this.graphWidth,this.graphHeight,this.file?.duration,N(L.time),N(L.temperature)],()=>this.getChartOptions())}
                        ></thermal-chart>`:A}
            </div>

            ${this.renderDownloads()}
            

            

            </div>
        
        `}renderDownloads(){return this.hasDownloads?k`<div class="download">
                <thermal-icon icon="download" variant="micro"></thermal-icon>
                <thermal-btn
                    size="sm"
                    @click=${()=>{if(this.graphRef.value){let e=this.graphRef.value.getRef()?.querySelector(`svg`);e&&this.downloadSVG(e,`graph.svg`)}}}
                    variant="background"
                    plain="true"
                    tooltip="Stáhnout graf jako obrázek SVG"
                >SVG</thermal-btn>
                <thermal-btn
                    size="sm"
                    @click=${()=>{if(this.graphRef.value){let e=this.graphRef.value.getRef()?.querySelector(`svg`);e&&this.downloadPNG(e,`graph.png`)}}}
                    variant="background"
                    plain="true"
                    tooltip="Stáhnout graf jako obrázek PNG"
                >PNG</thermal-btn>
                <thermal-btn
                    size="sm"
                    @click=${()=>this.file?.analysisData.downloadData()}
                    variant="background"
                    plain="true"
                    tooltip="${N(L.downloadgraphdataascsv)}"
                >CSV</thermal-btn>
            </div>`:A}};R([H()],zf.prototype,`hydrated`,void 0),R([V({reflect:!0})],zf.prototype,`graphWidth`,void 0),R([V({reflect:!0})],zf.prototype,`graphHeight`,void 0),R([V({type:Boolean,reflect:!0})],zf.prototype,`hasDownloads`,void 0),R([V({reflect:!0,converter:l(!1)})],zf.prototype,`standalone`,void 0),R([H()],zf.prototype,`graphs`,void 0),R([I({context:sc,subscribe:!0})],zf.prototype,`currentFrame`,void 0),R([I({context:oc,subscribe:!0})],zf.prototype,`cursor`,void 0),R([H()],zf.prototype,`shadowLeft`,void 0),R([H()],zf.prototype,`shadowTop`,void 0),R([H()],zf.prototype,`shadowWidth`,void 0),R([H()],zf.prototype,`shadowHeight`,void 0),R([I({context:Yc,subscribe:!0})],zf.prototype,`graphSmooth`,void 0);var Bf={fromAttribute:e=>e===null?void 0:l(!0).fromAttribute(e)},Vf=class extends z{constructor(...e){super(...e),this.tableMode=`full`,this.interactiveanalysis=!0,this.graphActivationEnabled=!0,this.showRangePropagator=!0,this.selected=!1,this.hovered=!1,this.focused=!1,this.refresh=()=>{this.selected=this.analysis?.selected??!1,this.requestUpdate(),(this.hovered||this.focused)&&this.highlightAnalysis()},this.handleMouseOver=e=>{e instanceof MouseEvent&&!this.isWithinRow(e.relatedTarget)&&(this.hovered=!0,this.highlightAnalysis())},this.handleMouseOut=e=>{e instanceof MouseEvent&&!this.isWithinRow(e.relatedTarget)&&(this.hovered=!1,this.focused||this.registryController.setHighlight(void 0))},this.handleFocusIn=e=>{e instanceof FocusEvent&&!this.isWithinRow(e.relatedTarget)&&(this.focused=!0,this.highlightAnalysis())},this.handleFocusOut=e=>{e instanceof FocusEvent&&!this.isWithinRow(e.relatedTarget)&&(this.focused=!1,this.hovered||this.registryController.setHighlight(void 0))}}get allowsEdit(){return this.editEnabled??this.interactiveanalysis}willUpdate(e){super.willUpdate(e),e.has(`analysis`)&&(this.selected=this.analysis?.selected??!1,this.bindAnalysis())}connectedCallback(){super.connectedCallback(),this.selected=this.analysis?.selected??!1,this.bindAnalysis(),this.renderRoot.addEventListener(`mouseover`,this.handleMouseOver),this.renderRoot.addEventListener(`mouseout`,this.handleMouseOut),this.renderRoot.addEventListener(`focusin`,this.handleFocusIn),this.renderRoot.addEventListener(`focusout`,this.handleFocusOut)}disconnectedCallback(){this.unbindAnalysis(),(this.hovered||this.focused)&&this.registryController.setHighlight(void 0),this.hovered=!1,this.focused=!1,this.renderRoot.removeEventListener(`mouseover`,this.handleMouseOver),this.renderRoot.removeEventListener(`mouseout`,this.handleMouseOut),this.renderRoot.removeEventListener(`focusin`,this.handleFocusIn),this.renderRoot.removeEventListener(`focusout`,this.handleFocusOut),super.disconnectedCallback()}bindAnalysis(){if(this.boundAnalysis===this.analysis||!this.isConnected)return;this.unbindAnalysis(),this.boundAnalysis=this.analysis;let e=this.boundAnalysis;e&&(e.onSelected.set(this.UUID,this.refresh),e.onDeselected.set(this.UUID,this.refresh),e.onValues.set(this.UUID,this.refresh),e.onSerializableChange.set(this.UUID,this.refresh),e.onMoveOrResize.set(this.UUID,this.refresh),e.onSetInitialColor.set(this.UUID,this.refresh),e.onSetName.set(this.UUID,this.refresh),e.graph.onGraphActivation.set(this.UUID,this.refresh)),this.refresh()}unbindAnalysis(){let e=this.boundAnalysis;e&&(e.onSelected.delete(this.UUID),e.onDeselected.delete(this.UUID),e.onValues.delete(this.UUID),e.onSerializableChange.delete(this.UUID),e.onMoveOrResize.delete(this.UUID),e.onSetInitialColor.delete(this.UUID),e.onSetName.delete(this.UUID),e.graph.onGraphActivation.delete(this.UUID)),this.boundAnalysis=void 0}isWithinRow(e){return e instanceof Node&&this.renderRoot.contains(e)}get range(){let e=this.analysis?.min,t=this.analysis?.max;if(e!==void 0&&t!==void 0&&Number.isFinite(e)&&Number.isFinite(t)&&e<=t)return{from:e,to:t}}highlightAnalysis(){this.registryController.setHighlight(this.range)}static{this.styles=O`
        :host {
            display: table-row;
            white-space: nowrap;
        }

        td {
            padding: .25em .5em;
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs-sm);
        }

        td.compact {
            padding: .25em;
        }

        .identity, .name, .actions {
            display: inline-flex;
            align-items: center;
            gap: .5em;
        }

        .identity {
            width: max-content;
            min-width: 100%;
            justify-content: space-between;
        }

        .name, .actions {
            flex-shrink: 0;
        }

        .name {
            min-width: 0;
            color: inherit;
            font: inherit;
        }

        button.name {
            padding: 0;
            border: 0;
            background: transparent;
            cursor: pointer;
        }

        button.name:hover {
            color: var(--thermal-primary);
        }

        .color {
            display: inline-block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
        }

        .selection-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
        }

        :host([selected]) .selection-indicator {
            background: var(--thermal-slate-dark);
        }
    `}renderActions(){let e=this.analysis;if(!e)return A;let t=this.tableMode===`compact`?`sm`:`md`;return k`<span class="actions">
            ${this.allowsEdit?k`
                <file-analysis-edit .analysis=${e}>
                    <thermal-btn
                        slot="invoker"
                        size=${t}
                        icon="settings"
                        iconStyle="solid"
                        tooltip=${N(L.editsth,{what:e.name})}
                    ></thermal-btn>
                </file-analysis-edit>
                <thermal-btn
                    size=${t}
                    icon="trash"
                    iconStyle="micro"
                    tooltip="${N(L.delete)} ${e.name}"
                    @click=${()=>e.file.analysis.layers.removeAnalysis(e.key)}
                ></thermal-btn>
            `:A}
            ${this.showRangePropagator&&!(e instanceof vn)?k`
                <thermal-btn
                    size=${t}
                    icon="range"
                    iconStyle="outline"
                    tooltip="${N(L.range)}: ${e.name}"
                    disabled=${this.range===void 0}
                    @click=${()=>{let t=this.range;t&&e.file.group.registry.range.imposeRange(t)}}
                ></thermal-btn>
            `:A}
        </span>`}renderName(){let e=this.analysis;if(!e)return A;let t=k`
            <span class="color" aria-hidden="true" style="background-color: ${e.initialColor}"></span>
            <span>${e.name}</span>
        `;return this.interactiveanalysis?k`
            <button
                type="button"
                class="name"
                aria-pressed=${e.selected}
                @click=${()=>{e.selected?e.setDeselected(!0):e.setSelected(!1,!0)}}
            >
                <span class="selection-indicator" aria-hidden="true"></span>
                ${t}
            </button>
        `:k`<span class="name">${t}</span>`}renderValue(e){let t=this.analysis;if(!t)return A;let n=t[e],r=n===void 0?`-`:`${n.toFixed(2)} \u00b0C`,i=t.graph.state[e===`avg`?`AVG`:e===`min`?`MIN`:`MAX`],a=this.graphActivationEnabled&&t.file.timeline.isSequence&&(e===`avg`||t instanceof Sn),o=i?t.initialColor:`transparent`,s=i?hi(t.initialColor):`var(--thermal-foreground)`;return k`<td class=${this.tableMode===`compact`?`compact`:``}>
            ${a?k`
                <thermal-btn
                    size=${this.tableMode===`compact`?`sm`:`md`}
                    aria-pressed=${i}
                    tooltip="${N(L.graph)}: ${N(L[e])}"
                    style="background-color: ${o}; color: ${s}; --bg: ${o}; --bg-hover: ${o}; --color: ${s}; --color-hover: ${s};"
                    @click=${()=>{e===`avg`?t.graph.setAvgActivation(!i):e===`min`?t.graph.setMinActivation(!i):t.graph.setMaxActivation(!i)}}
                >${r}</thermal-btn>
            `:r}
        </td>`}render(){let e=this.analysis;if(!e)return A;let t=this.tableMode===`compact`,n=this.allowsEdit||this.showRangePropagator,r=e instanceof Sn?`${e.width}x${e.height}`:`1x1`;return k`
            <td class=${t?`compact`:``}>
                <span class="identity">
                    ${this.renderName()}
                    ${t&&n?this.renderActions():A}
                </span>
            </td>
            ${this.renderValue(`avg`)}
            ${this.renderValue(`min`)}
            ${this.renderValue(`max`)}
            ${t?A:k`<td>${r}</td>`}
            ${!t&&n?k`<td>${this.renderActions()}</td>`:A}
        `}};R([V({attribute:!1})],Vf.prototype,`analysis`,void 0),R([V({attribute:`table-mode`})],Vf.prototype,`tableMode`,void 0),R([V({converter:l(!0)})],Vf.prototype,`interactiveanalysis`,void 0),R([V({attribute:`edit-enabled`,converter:Bf})],Vf.prototype,`editEnabled`,void 0),R([V({attribute:`graph-activation-enabled`,converter:l(!0)})],Vf.prototype,`graphActivationEnabled`,void 0),R([V({attribute:`show-range-propagator`,converter:l(!0)})],Vf.prototype,`showRangePropagator`,void 0),R([V({type:Boolean,reflect:!0})],Vf.prototype,`selected`,void 0),R([I({context:jc,subscribe:!0})],Vf.prototype,`registryController`,void 0);var Hf=class extends Td{constructor(...e){super(...e),this.tableMode=`full`,this.graphActivationEnabled=!0,this.interactiveanalysis=!1,this.forceinteractiveanalysis=!1,this.analysis=[],this.selectionChanged=()=>this.requestUpdate()}get interactive(){return this.interactiveanalysis||this.forceinteractiveanalysis}get allowsSelection(){return this.selectionEnabled??this.interactive}get allowsEdit(){return this.editEnabled??this.interactive}get showsRangePropagator(){return this.showRangePropagator??this.interactive}get allSelected(){return this.analysis.length>0&&this.analysis.every(e=>e.selected)}onInstanceCreated(){this.requestUpdate()}onFailure(){}connectedCallback(){super.connectedCallback(),this.bindFile()}disconnectedCallback(){this.unbindFile(),super.disconnectedCallback()}updated(e){super.updated(e),e.has(`file`)&&this.bindFile()}bindFile(){this.boundFile!==this.file&&this.isConnected&&(this.unbindFile(),this.boundFile=this.file,this.boundFile?.analysis.layers.onSelectionChange.set(this.UUID,this.selectionChanged))}unbindFile(){this.boundFile?.analysis.layers.onSelectionChange.delete(this.UUID),this.boundFile=void 0}static{this.styles=O`
        :host {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            contain: inline-size;
            box-sizing: border-box;
            color: var(--thermal-foreground);
        }

        .overflow {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
            overflow-x: auto;
            overflow-y: hidden;
        }

        table {
            width: max-content;
            min-width: 100%;
            margin: 0;
            table-layout: auto;
            box-sizing: border-box;
            border-collapse: collapse;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            font-size: var(--thermal-fs-sm);
        }

        th {
            text-align: left;
            white-space: nowrap;
            padding: .5em;
        }

        table.compact th {
            padding: .25em;
        }

        file-analysis-table-row:not(:last-child) {
            border-bottom: var(--thermal-border-width) dotted var(--thermal-slate);
        }

        file-analysis-table-row[selected] {
            background-color: var(--thermal-background);
        }

        .selection {
            display: inline-flex;
            align-items: center;
            gap: .5em;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: pointer;
        }

        .selection:hover {
            color: var(--thermal-primary);
        }

        .selection-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
        }

        .selection[aria-pressed="true"] .selection-indicator {
            background: var(--thermal-slate-dark);
        }
    `}render(){if(this.file===void 0||this.analysis.length===0)return A;let e=this.tableMode===`compact`;return k`
            <div class="overflow" tabindex="0" role="region" aria-label=${N(L.analysis)}>
                <table class=${e?`compact`:`full`} aria-label=${N(L.analysis)}>
                    <thead>
                        <tr>
                            <th scope="col">
                                ${this.allowsSelection?k`
                                    <button
                                        type="button"
                                        class="selection"
                                        aria-pressed=${this.allSelected}
                                        @click=${()=>{this.allSelected?this.file?.analysis.layers.deselectAll():this.file?.analysis.layers.selectAll()}}
                                    >
                                        <span class="selection-indicator" aria-hidden="true"></span>
                                        ${N(L.analysis)}
                                    </button>
                                `:N(L.analysis)}
                            </th>
                            <th scope="col">${N(L.avg)}</th>
                            <th scope="col">${N(L.min)}</th>
                            <th scope="col">${N(L.max)}</th>
                            ${e?A:k`<th scope="col">${N(L.size)}</th>`}
                            ${!e&&(this.allowsEdit||this.showsRangePropagator)?k`<th scope="col"></th>`:A}
                        </tr>
                    </thead>
                    <tbody>
                        ${Sc(this.analysis,e=>e.key,e=>k`
                            <file-analysis-table-row
                                .analysis=${e}
                                .tableMode=${this.tableMode}
                                .interactiveanalysis=${this.allowsSelection}
                                .editEnabled=${this.allowsEdit}
                                .graphActivationEnabled=${this.graphActivationEnabled}
                                .showRangePropagator=${this.showsRangePropagator}
                            ></file-analysis-table-row>
                        `)}
                    </tbody>
                </table>
            </div>
        `}};R([V({attribute:`table-mode`})],Hf.prototype,`tableMode`,void 0),R([V({attribute:`show-range-propagator`,converter:Bf})],Hf.prototype,`showRangePropagator`,void 0),R([V({attribute:`selection-enabled`,converter:Bf})],Hf.prototype,`selectionEnabled`,void 0),R([V({attribute:`edit-enabled`,converter:Bf})],Hf.prototype,`editEnabled`,void 0),R([V({attribute:`graph-activation-enabled`,converter:l(!0)})],Hf.prototype,`graphActivationEnabled`,void 0),R([I({context:Zc,subscribe:!0}),V({converter:l(!1)})],Hf.prototype,`interactiveanalysis`,void 0),R([V({converter:l(!1)})],Hf.prototype,`forceinteractiveanalysis`,void 0),R([I({context:pc,subscribe:!0}),H()],Hf.prototype,`analysis`,void 0);var Uf=class extends z{willUpdate(e){super.willUpdate(e),e.has(`analysis`)&&(this.color=this.analysis.initialColor)}updated(e){if(super.updated(e),e.has(`analysis`)){let t=e.get(`analysis`);t&&t.onSetInitialColor.delete(this.UUID),this.analysis.onSetInitialColor.set(this.UUID,e=>{this.color=e})}}static{this.styles=O`

        thermal-dropdown div {
            display: flex;
            gap: 0.5em;
            border-radius: var( --thermal-radius );
            cursor: pointer;
            align-items: center;
        }

        thermal-dropdown .option {
            margin-bottom: 0px;
            padding: 5px;
        }

        thermal-dropdown div i {
            width: 1em;
            height: 1em;
            border-radius: 50%;
        }

        thermal-dropdown .option:hover {
            background-color: var( --thermal-slate );
        }
    
    `}renderColor(e){return k`<i style="background-color: ${e};" aria-hidden></i><span>${e}</span>`}render(){return this.color===void 0?A:k`

            <thermal-dropdown>
                <div slot="invoker">
                    ${this.renderColor(this.color)}
                </div>

                ${cl(On,e=>k`
                    <div class="option" slot="option" @click=${()=>{this.analysis.setInitialColor(e)}}>
                        ${this.renderColor(e)}
                    </div>
                `)}
                    
            </thermal-dropdown>

        `}};R([V()],Uf.prototype,`analysis`,void 0),R([H()],Uf.prototype,`color`,void 0);var Wf=class extends z{willUpdate(e){super.willUpdate(e),e.has(`analysis`)&&(this.name=this.analysis.name)}updated(e){super.updated(e),e.has(`analysis`)&&(e.get(`analysis`)?.onSetName.delete(this.UUID),this.analysis.onSetName.set(this.UUID,e=>{this.name=e}))}static{this.styles=O`

    
    `}render(){return k`

            <input 
                type="text"
                value="${this.name}" 
                @change=${e=>{let t=e.target,n=t.value===``?this.analysis.nameInitial:t.value;this.analysis.setName(n)}}
            />

        `}};R([V()],Wf.prototype,`analysis`,void 0),R([H()],Wf.prototype,`name`,void 0);var Gf=class extends z{willUpdate(e){if(super.willUpdate(e),e.has(`analysis`)){let e=this.analysis;this.top=e.top,this.left=e.left,this.width=e.width,this.height=e.height,this.right=e.left+e.width,this.bottom=e.top+e.height,this.maxX=e.file.width,this.maxY=e.file.height}}updated(e){if(super.updated(e),e.has(`analysis`)){let t=e.get(`analysis`);t&&t.onSerializableChange.delete(this.UUID),this.analysis.onSerializableChange.set(this.UUID,e=>{this.top=e.top,this.left=e.left,this.width=e.width,this.height=e.height,this.right=e.left+e.width,this.bottom=e.top+e.height})}}handleInput(e,t){let n=e.target,r=parseInt(n.value);isNaN(r)||(t(r),this.analysis.onMoveOrResize.call(this.analysis))}static{this.styles=O`
    
        .table {

            display: table;
            width: 100%;
        
        }
    
    `}render(){return k`

            <div class="table">

                <thermal-field label=${N(L.name)}>
                    <analysis-name .analysis=${this.analysis}></analysis-name>
                </thermal-field>

                <thermal-field label=${N(L.color)}>
                    <analysis-color .analysis=${this.analysis}></analysis-color>
                </thermal-field>

                <thermal-field label=${N(L.left)}>
                    <input 
                        name="left" 
                        value=${this.left} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.right===void 0?this.maxX:this.right-1}
                        @change=${e=>this.handleInput(e,e=>{this.analysis.setLeft(e)})}
                    />
                </thermal-field>

                <thermal-field label=${N(L.right)}>
                    <input 
                        name="right" 
                        value=${this.right} 
                        type="number" 
                        step="1" 
                        min=${this.left===void 0?0:this.left+1} 
                        max=${this.maxX}
                        @change=${e=>this.handleInput(e,e=>{this.analysis.setRight(e)})}
                    />
                </thermal-field>

                <thermal-field label=${N(L.top)}>
                    <input 
                        name="top" 
                        value=${this.top} 
                        type="number" 
                        step="1" 
                        min="0"
                        max=${this.bottom===void 0?this.maxY:this.bottom-1}
                        @change=${e=>this.handleInput(e,e=>{this.analysis.setTop(e)})}
                    />
                </thermal-field>

                <thermal-field label=${N(L.bottom)}>
                    <input 
                        name="bottom" 
                        value=${this.bottom} 
                        type="number" 
                        step="1" 
                        min=${this.top===void 0?0:this.top+1}
                        max=${this.maxY}
                        @change=${e=>this.handleInput(e,e=>{this.analysis.setBottom(e)})}
                    />
                </thermal-field>
                

            </div>
    
        
        `}};R([V()],Gf.prototype,`analysis`,void 0),R([H()],Gf.prototype,`color`,void 0),R([H()],Gf.prototype,`top`,void 0),R([H()],Gf.prototype,`left`,void 0),R([H()],Gf.prototype,`width`,void 0),R([H()],Gf.prototype,`height`,void 0),R([H()],Gf.prototype,`type`,void 0),R([H()],Gf.prototype,`right`,void 0),R([H()],Gf.prototype,`bottom`,void 0),R([H()],Gf.prototype,`maxX`,void 0),R([H()],Gf.prototype,`maxY`,void 0);var Kf=class extends z{constructor(...e){super(...e),this.topInputRef=U(),this.leftInputRef=U()}willUpdate(e){if(super.willUpdate(e),e.has(`analysis`)){let e=this.analysis;this.top=e.top,this.left=e.left,this.maxX=e.file.width,this.maxY=e.file.height}}updated(e){if(super.updated(e),e.has(`analysis`)){let t=e.get(`analysis`);t&&t.onSerializableChange.delete(this.UUID),this.analysis.onSerializableChange.set(this.UUID,e=>{this.top=e.top,this.left=e.left})}}handleInput(e,t){let n=e.target,r=parseInt(n.value);isNaN(r)||(t(r),this.analysis.onMoveOrResize.call(this.analysis))}static{this.styles=O`
    
        .table {

            display: table;
            width: 100%;
        
        }
    
    `}render(){return k`

            <div class="table">

                <thermal-field label=${N(L.name)}>
                    <analysis-name .analysis=${this.analysis}></analysis-name>
                </thermal-field>

                <thermal-field label=${N(L.color)}>
                    <analysis-color .analysis=${this.analysis}></analysis-color>
                </thermal-field>

                <thermal-field label=${N(L.top)} hint=${N(L.fromto,{from:0,to:this.maxX})}>
                    <input 
                        name="top" 
                        value=${this.top} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.maxY}
                        @change=${e=>this.handleInput(e,e=>{this.analysis.setTop(e)})}
                    />
                </thermal-field>

                <thermal-field label=${N(L.left)} hint=${N(L.fromto,{from:0,to:this.maxX})}>
                    <input
                        name="left" 
                        value=${this.left} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.maxX}
                        @change=${e=>this.handleInput(e,e=>{this.analysis.setLeft(e)})}
                    />
                </thermal-field>

            </div>
        
        `}};R([V()],Kf.prototype,`analysis`,void 0),R([H()],Kf.prototype,`top`,void 0),R([H()],Kf.prototype,`left`,void 0),R([H()],Kf.prototype,`maxX`,void 0),R([H()],Kf.prototype,`maxY`,void 0);var qf=new Promise((e,t)=>{if(typeof google<`u`&&google.charts&&typeof google.charts.load==`function`)e();else{let n=document.querySelector(`script[src="https://www.gstatic.com/charts/loader.js"]`);n||(n=document.createElement(`script`),n.src=`https://www.gstatic.com/charts/loader.js`,document.head.appendChild(n)),n.addEventListener(`load`,e),n.addEventListener(`error`,t)}});async function Jf(e={}){await qf;let{version:t=`current`,packages:n=[`corechart`],language:r=document.documentElement.lang||`en`,mapsApiKey:i}=e;return google.charts.load(t,{packages:n,language:r,mapsApiKey:i})}async function Yf(e){if(await Jf(),e==null)return new google.visualization.DataTable;if(e.getNumberOfRows)return e;if(e.cols)return new google.visualization.DataTable(e);if(e.length>0)return google.visualization.arrayToDataTable(e);throw e.length===0?Error(`Data was empty.`):Error(`Data format was not recognized.`)}async function Xf(e){return await Jf(),new google.visualization.ChartWrapper({container:e})}var Zf=[`ready`,`select`],Qf={area:`AreaChart`,bar:`BarChart`,"md-bar":`google.charts.Bar`,bubble:`BubbleChart`,calendar:`Calendar`,candlestick:`CandlestickChart`,column:`ColumnChart`,combo:`ComboChart`,gantt:`Gantt`,gauge:`Gauge`,geo:`GeoChart`,histogram:`Histogram`,line:`LineChart`,"md-line":`google.charts.Line`,org:`OrgChart`,pie:`PieChart`,sankey:`Sankey`,scatter:`ScatterChart`,"md-scatter":`google.charts.Scatter`,"stepped-area":`SteppedAreaChart`,table:`Table`,timeline:`Timeline`,treemap:`TreeMap`,wordtree:`WordTree`},$f=class extends wa{constructor(...e){super(...e),this.type=`column`,this.events=[],this.options=void 0,this.cols=void 0,this.rows=void 0,this.data=void 0,this.view=void 0,this.selection=void 0,this.drawn=!1,this._data=void 0,this.chartWrapper=null,this.redrawTimeoutId=void 0,this.chartRef=U(),this.handleGraphPointerMove=e=>{let t=this.chartRef.value,n=this.onGraphClick||this.onGraphHover?this.getGraphLayout():void 0,r=n?.getChartAreaBoundingBox();if(!t||!n||!r){t&&(t.style.cursor=``),this.onGraphHover?.(void 0);return}let i=t.getBoundingClientRect(),a=e.clientX-i.left,o=e.clientY-i.top,s=this.isGraphVisualizationPoint(a,o,n);t.style.cursor=s&&this.onGraphClick?`pointer`:``,this.onGraphHover?.(s?Math.max(0,Math.min(100,(a-r.left)/r.width*100)):void 0)},this.handleGraphClickEvent=e=>{let t=this.chartRef.value,n=this.getGraphLayout();if(!t||!n||!this.onGraphClick)return;let r=t.getBoundingClientRect(),i=e.clientX-r.left,a=e.clientY-r.top,o=n.getChartAreaBoundingBox();if(o.width<=0||!this.isGraphVisualizationPoint(i,a,n)||i<o.left||i>o.left+o.width)return;let s=n.getHAxisValue?.(i);typeof s==`number`&&Number.isFinite(s)&&this.onGraphClick(s)},this.handleGraphPointerLeave=()=>{this.chartRef.value&&(this.chartRef.value.style.cursor=``),this.onGraphHover?.(void 0)},this.onWrapper=new D,this.left=0,this.top=0,this.w=0,this.h=0}static{this.styles=O`
    :host {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      margin: 0;
      padding: 0;
      width: 400px;
      height: 300px;
    }

    :host([hidden]) {
      display: none;
    }

    :host([type="gauge"]) {
      width: 300px;
      height: 300px;
    }

    #chartdiv {
      width: 100%;
    }

    /* Workaround for slow initial ready event for tables. */
    .google-visualization-table-loadtest {
      padding-left: 6px;
    }
  `}render(){return k`
      <div id="styles"></div>
      <div
        ${W(this.chartRef)}
        id="chartdiv"
        @pointermove=${this.handleGraphPointerMove}
        @pointerleave=${this.handleGraphPointerLeave}
        @click=${this.handleGraphClickEvent}
      ></div>
    `}getGraphLayout(){return(this.chartWrapper?.getChart())?.getChartLayoutInterface?.()}isGraphVisualizationPoint(e,t,n){let r=n.getChartAreaBoundingBox(),i=r.width>0&&r.height>0&&e>=r.left&&e<=r.left+r.width&&t>=r.top&&t<=r.top+r.height,a=n.getBoundingBox?.(`hAxis#0#labels`),o=Math.max(r.top+r.height,a?a.top+a.height:0),s=e>=r.left&&e<=r.left+r.width&&t>=r.top&&t<=o;return i||s}getRef(){return this.chartRef.value}firstUpdated(){Xf(this.shadowRoot.getElementById(`chartdiv`)).then(e=>{this.chartWrapper=e,this.onWrapper.call(e),this.typeChanged(),google.visualization.events.addListener(e,`ready`,()=>{this.drawn=!0,this.selection&&this.selectionChanged()}),google.visualization.events.addListener(e,`select`,()=>{let t=e.getChart()?.getSelection()??[];this.selection=t}),this.propagateEvents(Zf,e)})}updated(e){e.has(`type`)&&this.typeChanged(),(e.has(`rows`)||e.has(`cols`))&&this.rowsOrColumnsChanged(),e.has(`data`)&&this.dataChanged(),e.has(`view`)&&this.viewChanged(),(e.has(`_data`)||e.has(`options`))&&this.redraw(),e.has(`selection`)&&this.selectionChanged()}typeChanged(){if(this.chartWrapper==null)return;this.chartWrapper.setChartType(Qf[this.type]||this.type);let e=this.chartWrapper.getChart();google.visualization.events.addOneTimeListener(this.chartWrapper,`ready`,()=>{let t=this.chartWrapper.getChart();t!==e&&this.propagateEvents(this.events.filter(e=>!Zf.includes(e)),t);let n=this.shadowRoot.getElementById(`styles`);n.children.length||this.localizeGlobalStylesheets(n)}),this.redraw()}propagateEvents(e,t){for(let n of e)google.visualization.events.addListener(t,n,e=>{this.dispatchEvent(new CustomEvent(`google-chart-${n}`,{bubbles:!0,composed:!0,detail:{chart:this.chartWrapper.getChart(),data:e}}))})}selectionChanged(){if(this.chartWrapper==null)return;let e=this.chartWrapper.getChart();if(e!=null&&e.setSelection){if(this.type===`timeline`){let t=JSON.stringify(e.getSelection());if(JSON.stringify(this.selection)===t)return}e.setSelection(this.selection)}}redraw(){this.chartWrapper!=null&&this._data!=null&&(this.chartWrapper.setDataTable(this._data),this.chartWrapper.setOptions(this.options||{}),this.drawn=!1,this.redrawTimeoutId!==void 0&&clearTimeout(this.redrawTimeoutId),this.redrawTimeoutId=window.setTimeout(()=>{this.chartWrapper.draw();let e=this.chartWrapper.visualization.ha.O;this.left=e.left,this.top=e.top,this.w=e.width,this.h=e.height},5))}get imageURI(){if(this.chartWrapper==null)return null;let e=this.chartWrapper.getChart();return e&&e.getImageURI()}viewChanged(){this.view&&(this._data=this.view)}async rowsOrColumnsChanged(){let{rows:e,cols:t}=this;if(e&&t)try{let n=await Yf({cols:t});n.addRows(e),this._data=n}catch(e){this.shadowRoot.getElementById(`chartdiv`).textContent=String(e)}}dataChanged(){let e=this.data,t;if(!e)return;let n=!1;try{e=JSON.parse(e)}catch(t){console.error(t),n=typeof e==`string`||e instanceof String}t=n?fetch(e).then(e=>e.json()):Promise.resolve(e),t.then(Yf).then(e=>{this._data=e})}localizeGlobalStylesheets(e){let t=Array.from(document.head.querySelectorAll(`link[rel="stylesheet"][type="text/css"][id^="load-css-"]`));for(let n of t){let t=document.createElement(`link`);t.setAttribute(`rel`,`stylesheet`),t.setAttribute(`type`,`text/css`),t.setAttribute(`href`,n.getAttribute(`href`)),e.appendChild(t)}}};R([V({type:String,reflect:!0})],$f.prototype,`type`,void 0),R([V({type:Array})],$f.prototype,`events`,void 0),R([V({type:Object,hasChanged:()=>!0})],$f.prototype,`options`,void 0),R([V({type:Array})],$f.prototype,`cols`,void 0),R([V({type:Array})],$f.prototype,`rows`,void 0),R([V({type:String})],$f.prototype,`data`,void 0),R([V({type:Object})],$f.prototype,`view`,void 0),R([V({type:Array})],$f.prototype,`selection`,void 0),R([V({attribute:!1})],$f.prototype,`onGraphClick`,void 0),R([V({attribute:!1})],$f.prototype,`onGraphHover`,void 0),R([V({type:Object})],$f.prototype,`_data`,void 0),R([V({type:Number,reflect:!0})],$f.prototype,`left`,void 0),R([V({type:Number,reflect:!0})],$f.prototype,`top`,void 0),R([V({type:Number,reflect:!0})],$f.prototype,`w`,void 0),R([V({type:Number,reflect:!0})],$f.prototype,`h`,void 0);var ep={fromAttribute(e){if(typeof e==`string`){let t=e.trim();return t.length>0?parseFloat(t):void 0}},toAttribute(e){if(e!==void 0)return e.toString()}},tp=class extends z{constructor(...e){super(...e),this.tRef=U(),this.vRef=U(),this.vunitsRef=U(),this.haRef=U(),this.vunits=`mps`}kphToMps(e){return e*.2778}calculateE(e,t){return 6.105/100*e*Math.exp(17.27*t/(237.7+t))}calculateTa(e,t,n){return e+.33*t-.7*n-4}firstUpdated(e){super.firstUpdated(e),zs(this),this.tRef.value&&this.tRef.value.addEventListener(`change`,e=>{let t=e.target,n=parseFloat(t.value);isNaN(n)||(this.temperature=Math.min(100,Math.max(-275.4,n)))}),this.haRef.value&&this.haRef.value.addEventListener(`change`,e=>{let t=e.target,n=parseFloat(t.value);isNaN(n)||(this.ha=Math.min(100,Math.max(0,n)))}),this.vRef.value&&this.vRef.value.addEventListener(`change`,e=>{let t=e.target,n=parseFloat(t.value);isNaN(n)||(this.v=Math.max(0,n))})}processValueChange(e,t){if(e.has(t)){let e=this[t],n=this[`${t}Ref`];n.value&&(e==null?n.value.value=``:n.value.value=e.toString()),this.recalculateVa()}}recalculateVa(){if(this.temperature!==void 0&&this.ha!==void 0&&this.v!==void 0){let e=this.vunits===`mps`?this.v:this.kphToMps(this.v),t=this.calculateE(this.ha,this.temperature),n=this.calculateTa(this.temperature,t,e);this.ta=n}else this.ta=void 0}shouldUpdate(e){return super.shouldUpdate(e),this.ha&&(this.ha<0&&(this.ha=0,this.haRef.value&&(this.haRef.value.value=`0`)),this.ha>100&&(this.ha=100,this.haRef.value&&(this.haRef.value.value=`100`))),!0}willUpdate(e){super.willUpdate(e),this.processValueChange(e,`temperature`),this.processValueChange(e,`v`),this.processValueChange(e,`ha`),e.has(`vunits`)&&this.vunitsRef.value&&(this.vunitsRef.value.value=this.vunits,this.recalculateVa())}static{this.styles=O`

        .table {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
    
        .field {

            width: 100%;
            display: table-row;

        }

        .column {
            display: table-cell;
            padding: calc( var(--thermal-gap) * .5 );
        }

        .column__label {
            text-align: right;
        }

        .column__value {
        
        }

        .input_wrapper {

            background: var( --thermal-background );

            width: 200px;
            padding: calc( var( --thermal-gap ) / 2 );

            border-radius: var( --thermal-radius );
        
        }

        input {

            font-size: var(--thermal-fs);
            width: 120px;
            text-align: right;
            border: 0;
            border-bottom: 1px var(--thermal-border-style)var( --thermal-slate-light );
            background: transparent;
            color: var( --thermal-foreground );

            -moz-appearance: textfield;

            &:focus {
                outline: 0;
                border-bottom: 1px var(--thermal-border-style)var( --thermal-primary );
            }
        
        }

        select, option, input {
            font-size: var(--thermal-fs);
            color: var( --thermal-foreground );
            background: var( --thermal-background );
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate-light );
            border-radius: var( --thermal-radius );
        }



        .result {

            padding: calc(var(--thermal-gap) * .7);
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            text-align: center;

            & > p {
                margin: 0;
                padding: calc( var( --thermal-gap ) * .25 );
            }

        }

        .result_value {
            font-weight: bold;
            font-size: calc( var(--thermal-fs) * 1.2 )
        }

        .result_label {
        }

        .result_comment {
            font-size: calc( var(--thermal-fs) * .8 )
        }

        .tabindex {
            border-radius: var( --thermal-radius );
            &:focus {
                outline: 3px var(--thermal-border-style)var(--thermal-primary);
            }
        }


    `}renderNumberField(e,t,n,r,i,a,o,s,c){let l=typeof r==`string`?Ps(r):r;return k`
            <div class="field">

                <div class="column column__label">
                    <label for=${t}>
                        ${n}
                    </label>
                </div>
                <div class="column column__value">

                    <div class="input_wrapper">
                        <input 
                            ${W(e)} 
                            id=${t}
                            name=${t}
                            value=${B(i)}
                            min=${B(a)}
                            max=${B(o)}
                            step=${B(s)}
                            type="number"
                            @blur=${e=>{let n=e.target,r=n.value.trim();this[t]=r===``||r==null?void 0:parseFloat(n.value)}}
                        ></input>
                        <span>${l}</span>
                    </div>

                    ${c?k`<label for=${t}>${c}</label>`:A}

                </div>

            </div>

            
        `}renderResult(e,t){let n=e-t,r={diff:Math.abs(n).toFixed(2),app:e.toFixed(2),t},i=N(L.apparenttemperatureverbose,r),a=N(n<0?L.youfeelcolder:L.youfeelwarmer,r),o=e.toFixed(2);return k`<div class="result">

            <p class="result_label">${N(L.apparenttemperature)}</p>

            <p class="result_value">
                ${o} °C
            </p>

            <p class="result_comment">${i}</p>

            <p class="result_comment">${a}</p>
        
        </div>`}render(){return k`
            <thermal-app 
                label=${N(L.apparenttemperature)} 
                author="LabIR Edu" 
                license="CC BY-SA 4.0"
            >

                <thermal-dialog label=${N(L.info)} slot="bar-pre">
                    <thermal-btn slot="invoker">${N(L.info)}</thermal-btn>
                    <div slot="content">
                        ${Ps(N(L.apparenttemperaturehint,{href:`https://en.wikipedia.org/wiki/Wind_chill#Australian_apparent_temperature`}))}
                    </div>
                </thermal-dialog>

                ${this.t!==void 0||this.v!==void 0||this.ha!==void 0?k`<thermal-btn 
                slot="bar-pre"
                @click=${()=>{this.temperature=void 0,this.ha=void 0,this.ta=void 0,this.v=void 0}}>Reset</thermal-btn>`:A}


                <section class="table">

                ${this.renderNumberField(this.tRef,`temperature`,N(L.airtemperature),`°C`,this.temperature,-273.15,100,.1)}

                ${this.renderNumberField(this.vRef,`v`,N(L.windspeed),k`<select 
                    @change=${e=>{let t=e.target.value;this.vunits=t}} 
                    value=${this.vunits}
                    ${W(this.vunitsRef)}
                >
                    <option value="mps">m/s</option>
                    <option value="kph">km/h</option>
                </select>`,this.v,0,void 0,.1)}

                ${this.renderNumberField(this.haRef,`ha`,N(L.relativeairhumidity),`%`,this.ha,0,100,.1)}

                </section>
                <div  class="tabindex" tabindex="0">
                ${this.ta!==void 0&&this.temperature!==void 0?this.renderResult(this.ta,this.temperature):A}
                </div>
                

            </thermal-app>
        `}};R([V({type:String,reflect:!0,attribute:`t`,converter:ep})],tp.prototype,`temperature`,void 0),R([V({type:String,reflect:!0,attribute:!0,converter:ep})],tp.prototype,`v`,void 0),R([V({type:String,reflect:!0,attribute:!0,converter:ep})],tp.prototype,`ha`,void 0),R([H()],tp.prototype,`ta`,void 0),R([V({type:String,reflect:!0,attribute:!0})],tp.prototype,`vunits`,void 0),R([Ms({context:Rs}),V({reflect:!0,converter:Vs})],tp.prototype,`locale`,void 0);var np=class extends al{constructor(...e){super(...e),this.palette=`jet`,this.advancedPalettes=!1,this.smoothThermograms=!1,this.smoothGraph=!1,this.tool=`inspect`,this.managerController=new Qc(this),this.opacity=1,this.loading=!1,this.registryController=new Bc(this),this.autoclearGroup=!1,this.groupController=new yc(this),this.ms=0,this.playbackSpeed=1,this.autoHighlight=!1,this.fileController=new hc(this),this.orderby=Ec.DATE,this.ordering=Dc.ASC,this.groupListingController=new Oc(this),this.displayMode=`input`,this.toDisplay=[]}static{this.properties={...Qc.HOST_PROPERTIES,...Bc.HOST_PROPERTIES,...yc.HOST_PROPERTIES,...hc.HOST_PROPERTIES,...Oc.HOST_PROPERTIES}}get manager(){return this.managerObject}connectedCallback(){super.connectedCallback();try{sf().then(e=>this.ip=e)}catch(e){console.error(`Failed to get public IPv4 address:`,e)}let e=async e=>{this.log(`Files received in listener:`,e),this.onValueChangeTimeout!==void 0&&clearTimeout(this.onValueChangeTimeout),this.onValueChangeTimeout=setTimeout(async()=>{this.toDisplay=e},0)};this.groupObject?.files.addListener(this.UUID,e.bind(this)),this.groupController.onInternalObject.set(this.UUID,t=>{t.files.addListener(this.UUID,e.bind(this))})}willUpdate(e){super.willUpdate(e),e.has(`toDisplay`)&&(this.toDisplay.length===0?this.displayMode=`input`:this.toDisplay.length===1?(this.displayMode=`detail`,this.fileController.receiveInstance(this.toDisplay[0]),this.postLoadedProcessingAndApplyMinmax()):this.toDisplay.length>1&&(this.displayMode=`list`,this.postLoadedProcessingAndApplyMinmax()))}async postLoadedProcessingAndApplyMinmax(){await this.registryObject.postLoadedProcessing(),this.registryObject.range.applyMinmax()}handleClear(){this.groupObject!==void 0&&(this.fileController.removeInstance(),this.groupObject.files.removeAllInstances(),this.file=void 0,this.requestUpdate(),this.analysis1=void 0,this.analysis2=void 0,this.analysis3=void 0,this.analysis4=void 0,this.analysis5=void 0,this.analysis6=void 0,this.analysis7=void 0)}static{this.styles=O`
        ${Oc.styles}
    
        .layout {
        
            width: 100%;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1em;
        
        }

        .layout-content {
            min-width: 0;
        }

        manager-tool-bar {
            height: 2em;
        }

    `}async handleDropAndClear(e){this.log(e);let t=e.filter(e=>e instanceof ir);this.groupListingController.backupReaders(t),this.groupListingController.restoreTheEntireBackup()}renderIntroScene(){return k`
            <group-dropin-element .onDrop=${this.handleDropAndClear.bind(this)}></group-dropin-element>
        `}renderLayout(e){return k`
        <div class="layout">
            <div style="width: 2em;"></div>
            <div class="layout-content">${e}</div>
        </div>
        `}renderHeader(){let e=[];return this.displayMode===`input`&&e.push(k`<group-dropin-input 
                slot="bar-pre"
                variant="background"
                icon="upload"
                iconStyle="micro"
                tooltip="Vyberte soubory z disku"
                .onDrop=${this.handleDropAndClear.bind(this)}
            ></group-dropin-input>`),this.displayMode!==`input`&&e.push(k`
            <manager-tool-bar slot="pre-bar"></manager-tool-bar>
            <manager-palette-dropdown slot="pre-bar"></manager-palette-dropdown>
            <registry-range-form slot="pre-bar"></registry-range-form>
            
            `),this.displayMode===`list`&&e.push(k`${this.groupListingController.renderListHeader(`bar-header`)}`),this.displayMode===`detail`&&e.push(k`${this.groupListingController.renderDetailHeader(this.groupObject.files.value[0],`bar-pre`)}`),this.displayMode!==`input`&&(e.push(k`<thermal-dialog label="${N(L.config)}" slot="bar-pre">
                <thermal-btn slot="invoker" tooltip="${N(L.config)}" icon="settings" iconStyle="solid"></thermal-btn>
                <div slot="content">
                    <table>
                        <manager-export-panel></manager-export-panel>
                        <display-panel></display-panel>
                    </table>
                </div>
            </thermal-dialog>`),e.push(k`
                <div slot="pre-bar" style="flex-grow: 1; padding-left: 1em;">
            <registry-histogram height="15px" .expandable=${!0}></registry-histogram>
            <registry-range-slider height="10px"></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
                </div>
            `)),e}renderDetail(){return this.renderLayout(this.groupListingController.renderDetailBody())}renderList(){let e=Sc(this.toDisplay,e=>e.id,e=>this.groupListingController.renderThumbnail(e));return this.renderLayout(this.groupListingController.renderListContainer(e))}renderAuto(){switch(this.displayMode){case`input`:return this.renderIntroScene();case`list`:return this.renderList();case`detail`:return this.renderDetail()}}render(){try{return k`<thermal-app 
                label="${this.label??`LabIR Web Analyser`}"
                ?show-fullscreen=${!0}
            >

                ${this.renderHeader()}

                <slot name="bar-pre" slot="bar-pre"></slot>

                ${this.renderAuto()}

            </thermal-app>

        `}catch(e){return console.error(e),k`Stala se chyba`}}};R([V({type:String,reflect:!0})],np.prototype,`displayMode`,void 0),R([H()],np.prototype,`ip`,void 0),R([H()],np.prototype,`toDisplay`,void 0),R([Ms({context:Rs}),V({reflect:!0,converter:Vs})],np.prototype,`locale`,void 0);var rp=class extends al{constructor(...e){super(...e),this.interactiveanalysis=!0,this.managerController=new Qc(this),this.palette=`jet`,this.advancedPalettes=!1,this.smoothThermograms=!1,this.smoothGraph=!1,this.tool=`inspect`,this.registryController=new Bc(this),this.opacity=1,this.loading=!1,this.groupController=new yc(this),this.autoclearGroup=!0,this.fileController=new hc(this),this.ms=0,this.playbackSpeed=1,this.autoHighlight=!1,this.fileLoadController=new gc(this)}static{this.properties={...al.properties,...Qc.HOST_PROPERTIES,...Bc.HOST_PROPERTIES,...yc.HOST_PROPERTIES,...hc.HOST_PROPERTIES,...gc.HOST_PROPERTIES}}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.observeLayout()}firstUpdated(e){super.firstUpdated(e),this.observeLayout()}disconnectedCallback(){this.layoutObserver?.disconnect(),this.layoutObserver=void 0,super.disconnectedCallback()}observeLayout(){let e=this.shadowRoot?.querySelector(`.layout`);if(!e||this.layoutObserver)return;let t=new ResizeObserver(n=>{if(!this.isConnected||this.layoutObserver!==t)return;let r=n.find(t=>t.target===e);r&&(e.classList.toggle(`layout--stacked`,r.contentRect.width<700),e.classList.toggle(`layout--compact`,r.contentRect.width<500))});this.layoutObserver=t,t.observe(e)}static{this.styles=O`
    
        .layout {
            display: grid;
            grid-template-columns: min-content minmax(0, 1fr) minmax(0, 1fr);
            grid-template-areas: "tools viewer analysis";
            gap: 1em;
            margin-top: 1em;
        }

        .layout > * {
            min-width: 0;
        }

        manager-tool-bar {
            grid-area: tools;
            align-self: start;
        }

        .viewer {
            grid-area: viewer;
        }

        file-analysis-complex {
            grid-area: analysis;
        }

        .layout--stacked {
            grid-template-columns: min-content minmax(0, 1fr);
            grid-template-areas:
                "tools viewer"
                "tools analysis";
        }

        .layout--compact {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas:
                "tools"
                "viewer"
                "analysis";
        }

        .layout--compact manager-tool-bar {
            flex-direction: row;
            flex-wrap: wrap;
        }
    
    `}render(){return k`<thermal-app 
            label="${B(this.label)}" 
            author="${B(this.author)}" 
            license="${B(this.license)}" 
            .showfullscreen=${this.showFullscreen}
        >

            <file-download-dropdown slot="bar-pre"></file-download-dropdown>
            <file-info-button slot="bar-pre"></file-info-button>

            <manager-palette-dropdown slot="bar-pre"></manager-palette-dropdown>
            <registry-range-form slot="bar-pre"></registry-range-form>
            <registry-opacity-slider slot="bar-pre"></registry-opacity-slider>

            <registry-histogram slot="pre" ?expandable=${!0}></registry-histogram>
            <registry-range-slider slot="pre"></registry-range-slider>
            <registry-ticks-bar slot="pre"></registry-ticks-bar>

            
            <div class="layout">
                <manager-tool-bar></manager-tool-bar>
                <div class="viewer">
                    <file-canvas></file-canvas>
                    <file-timeline></file-timeline>
                </div>
                <file-analysis-complex></file-analysis-complex>
            </div>
            
        </thermal-app>`}};R([Ms({context:Zc}),V({type:String,reflect:!0,converter:l(!0)})],rp.prototype,`interactiveanalysis`,void 0);var ip=class extends al{constructor(...e){super(...e),this.managerController=new Qc(this),this.palette=`jet`,this.advancedPalettes=!1,this.smoothThermograms=!1,this.smoothGraph=!1,this.tool=`inspect`,this.registryController=new Bc(this),this.opacity=1,this.loading=!1,this.groupController=new yc(this),this.autoclearGroup=!0,this.fileController=new hc(this),this.ms=0,this.playbackSpeed=1,this.autoHighlight=!1,this.groupListingController=new Oc(this),this.orderby=Ec.DATE,this.ordering=Dc.ASC,this.groupLoadController=new bc(this)}static{this.properties={...al.properties,...Qc.HOST_PROPERTIES,...Bc.HOST_PROPERTIES,...yc.HOST_PROPERTIES,...hc.HOST_PROPERTIES,...bc.HOST_PROPERTIES}}connectedCallback(){super.connectedCallback(),this.subscribedGroup=this.groupObject,this.subscribedGroup.files.addListener(this.UUID,()=>{this.file&&!this.groupObject.files.value.includes(this.file)&&this.fileController.removeInstance(),this.requestUpdate()})}disconnectedCallback(){this.subscribedGroup?.files.removeListener(this.UUID),this.subscribedGroup=void 0,super.disconnectedCallback()}openDetail(e){this.registryController.setHighlight(void 0),this.ms=e.timeline.currentMs,this.playbackSpeed=e.timeline.playbackSpeed,[`analysis1`,`analysis2`,`analysis3`,`analysis4`,`analysis5`,`analysis6`,`analysis7`].forEach((t,n)=>{this[t]=e.slots.getSlot(n+1)?.serialized}),this.fileController.receiveInstance(e)}closeDetail(){this.registryController.setHighlight(void 0),this.fileController.removeInstance()}static{this.styles=O`
        ${Oc.styles}

        .layout {
            width: 100%;
            display: grid;
            grid-template-columns: 2em minmax(0, 1fr);
            gap: 1em;
        }

        .layout-content {
            min-width: 0;
        }

        manager-tool-bar {
            height: 2em;
        }
    `}render(){let e={allowFileChanges:!1,onOpenDetail:e=>this.openDetail(e),onCloseDetail:()=>this.closeDetail()},t=this.groupObject?.files.value.length>0;return k`<thermal-app
            label=${this.label??`LabIR Web Analyser`}
            show-fullscreen=${String(this.showFullscreen)}
        >
            ${t?k`
                <manager-tool-bar slot="pre-bar"></manager-tool-bar>
                <manager-palette-dropdown slot="pre-bar"></manager-palette-dropdown>
                <registry-range-form slot="pre-bar"></registry-range-form>
                ${this.file?this.groupListingController.renderDetailHeader(this.file,`bar-header`,e):this.groupListingController.renderListHeader(`bar-header`,e)}
                <thermal-dialog label=${this.t(`config`)} slot="bar-pre">
                    <thermal-btn slot="invoker" tooltip=${this.t(`config`)} icon="settings" iconStyle="solid"></thermal-btn>
                    <div slot="content">
                        <table>
                            <manager-export-panel></manager-export-panel>
                            <display-panel></display-panel>
                        </table>
                    </div>
                </thermal-dialog>
                <div slot="pre-bar" style="flex-grow: 1; padding-left: 1em;">
                    <registry-histogram height="15px" expandable="true"></registry-histogram>
                    <registry-range-slider height="10px"></registry-range-slider>
                    <registry-ticks-bar></registry-ticks-bar>
                </div>
            `:void 0}
            <slot name="bar-pre" slot="bar-pre"></slot>
            ${this.groupLoadController.errors.map(e=>k`<p role="alert">${e}</p>`)}
            <div class="layout">
                <div></div>
                <div class="layout-content">
                    ${this.loading?k`<p role="status">${this.t(`loading`)}</p>`:void 0}
                    ${t?this.file?this.groupListingController.renderDetailBody():this.groupListingController.renderListContainer(this.groupListingController.renderList(t=>this.groupListingController.renderThumbnail(t,e))):this.loading?void 0:k`<p>Ve skupině nejsou žádné soubory.</p>`}
                </div>
            </div>
        </thermal-app>`}},ap=class extends Td{onFileLoaded(){}onInstanceCreated(){}onFailure(){}static{this.styles=O`

        table {
            width: 100%;
        }



        td {
            padding: calc( var( --thermal-gap ) * .5 ) 0;
        }


        tr:not(:last-child) {
            td {
                border-bottom: var(--thermal-border-width) solid var( --thermal-slate );
            }
        }

        .small,
        small {
            font-size: calc( var( --thermal-fs-sm ) * .8 );
        }

        .opaque {
            opacity: .5;
        }

        h2 {
            font-size: calc( var( --thermal-fs ) * 1.4 );
        }

        h3 {
            font-size: var( --thermal-fs-small );
            margin: .2rem 0 .1rem 0;
            padding: 0;
            font-weight: normal;    
        }

        ul {
            margin: 0;
            padding: 0;
            padding-left: var( --thermal-fs-small );
        }

        a {
            color: var( --thermal-primary );
        }

        .download {
            width: var( --thermal-fs );
            display: inline-block;
            margin-left: var( --thermal-gap );
            transition: color .2s ease-in-out;

            &:hover {
                color: var( --thermal-foreground );
            }
        }
    
    `}renderRow(e,t){return`<tr>
            <td style="width: 110px">${e}</td>
            <td>${t}</td>
        </tr>`}renderNumericalRow(e,t,n=4,r){let i=t.toFixed(n),a=r===void 0?i:i+` `+r;return this.renderRow(e,a)}renderDownloadRow(e,t,n,r){return this.renderRow(e,`<span>${t}</span>
            <a href=${n} target="_blank" title="${r}" class="download">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
            </a>`)}render(){return this.file?k`
            <thermal-dialog label=${N(L.fileinfo)}>
                <slot name="invoker" slot="invoker">
                    <thermal-btn
                        tooltip=${N(L.fileinfo)}
                        icon="info"
                        iconStyle="mini"
                    >
                    </thermal-btn>
                </slot>
                <div slot="content">

                    <table>

                        ${Ps(this.renderRow(N(L.thermalfilename),this.file.fileName))}

                        ${Ps(this.renderDownloadRow(N(L.thermalfileurl),this.file.thermalUrl,this.file.thermalUrl,N(L.thermalfiledownload)))}

                        ${this.file.visibleUrl?Ps(this.renderDownloadRow(N(L.visiblefileurl),this.file.visibleUrl,this.file.visibleUrl,N(L.visiblefiledownload))):A}

                        ${Ps(this.renderRow(N(L.time),tr.human(this.file.timestamp)))}

                        ${Ps(this.renderNumericalRow(N(L.duration),this.file.duration,0,`ms`))}

                        ${Ps(this.renderRow(N(L.resolution),`${this.file.width} x ${this.file.height}<small class="opaque">${this.file.pixels.length} pixels</small>`))}

                        ${Ps(this.renderNumericalRow(N(L.bytesize),this.file.bytesize,0))}
                        
                        ${Ps(this.renderNumericalRow(N(L.minimaltemperature),this.file.min,10,`°C`))}

                        ${Ps(this.renderNumericalRow(N(L.maximaltemperature),this.file.max,10,`°C`))}

                        

                    </table>

                    <h2>${N(L.filetype)}</h2>
                    <table>
                    ${Ps(this.renderRow(N(L.type),this.file.reader.parser.name))}
                    ${Ps(this.renderRow(N(L.description),this.file.reader.parser.description))}

                    <tr>
                        <td>${N(L.supporteddevices)}</td>
                        <td><ul>${this.file.reader.parser.devices.map(e=>k`<li>
                            <h3><a href="${e.deviceUrl}" target="_blank">${e.deviceName}</a></h3>
                            <div class="small">${e.deviceDescription}</div>
                            <div class="small">Manufactured by <a href="${e.manufacturerUrl}" target="_blank">${e.manufacturer}</a></div>
                        </li>`)}</ul></td>
                    </tr>
                    </table>
                </div>
            </thermal-dialog>
        `:A}},op=class extends Td{onInstanceCreated(){}onFailure(){}static{this.styles=O`
        :host {
            display: contents;
        }

    `}render(){return this.file?this.file.fileName:A}};R([V({type:String})],op.prototype,`label`,void 0);var sp=class e extends Td{constructor(...e){super(...e),this.playing=!1,this.mayStop=!0,this.timelineRef=U(),this.barRef=U(),this.containerRef=U(),this.hasPlayButton=!0,this.hasInfo=!0,this.interactive=!0,this.collapsed=!1,this.ticks=[]}static{this.collapseWidth=500}onInstanceCreated(e){this.containerRef.value&&(this.ticks=vf(this.containerRef.value.clientWidth,e.duration))}onFailure(){this.file?.timeline.removeListener(this.UUID)}update(t){super.update(t),this.observer===void 0&&this.containerRef.value instanceof Element&&(this.observer=new ResizeObserver(t=>{let n=t[0];this.file&&(this.ticks=vf(n.contentRect.width,this.file.duration)),n.contentRect.width<e.collapseWidth?this.collapsed===!1&&(this.collapsed=!0):this.collapsed===!0&&(this.collapsed=!1)}),this.observer.observe(this.containerRef.value))}handlePlayButtonClick(){(this.playing!==!0||this.mayStop!==!1)&&(this.playing?this.file?.timeline.stop():this.file?.timeline.play())}handleBarClick(e){if(e.preventDefault(),this.mayStop===!1)return;let t=this.getValueFromEvent(e);t&&this.file&&this.file.timeline.setValueByPercent(t.percent)}getValueFromEvent(e){if(this.timelineRef.value&&this.file){let t=this.timelineRef.value.getBoundingClientRect();if(t.width===0)return;let n=e.clientX-t.left,r=Math.max(0,Math.min(100,n/t.width*100));return{percent:r,ms:this.file.duration*(r/100)}}}handleBarEnter(e){let t=this.getValueFromEvent(e);t&&(this.pointerMs=t.ms),t&&this.fileController.setTimeCursorPercentage(t.percent)}handleBarHover(e){e.preventDefault();let t=this.getValueFromEvent(e);t&&(this.pointerMs=t.ms),t&&this.fileController.setTimeCursorPercentage(t.percent)}handleBarMouseLeave(){this.fileController.setTimeCursorPercentage(void 0),this.pointerMs=void 0}static{this.styles=O`
    
        .container {

            padding-top: calc( var( --thermal-gap ) * .2 );

            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: calc( var( --thermal-gap ) * .5 );

            color: var( --thermal-foreground );

        }

        .cursor {
            width: 70px;
        }

        .duration {
        
        }

        .small {
            font-size: calc( var( --thermal-fs ) * .7 );
            color: var( --thermal-foreground );
        }

        .real {
            display: flex;
            gap: var( --thermal-fs-small );
            align-items: center;
            padding-top: 5px;
            justify-content: space-between;
            width: 100%;

            .label { opacity: .5; }
        }

        .inline {
            white-space: nowrap;
        }

        .timeline {
            flex-grow: 1;
            cursor: pointer;
        }

        .timeline-bar {
            width: 100%;
            height: var( --thermal-fs );
            background: var( --thermal-slate );
            transition: background-color .2s ease-in-out;
            position: relative;
        }

        .timeline-marks {
            width: 100%;
        }

        .mark {
            background: red;
            height: 5px;
            position: relative;
        }

        .bar {
            height: 100%;
            background: var( --thermal-primary-dark );
            content: "";
            border-right: 1px solid var( --thermal-foreground );
            transition: background-color .3s ease-in-out;
            &:hover {
                background: var(--thermal-primary);
            }
        }

        .mayNot {
            opacity: .5;
            cursor: not-allowed;
        }

        .pointer {
            position: absolute;
            width: 1px;
            background: var( --thermal-background );
            height: 100%;
            top: 0;
        }

        ${Sf}


        .controls {

            display: flex;
            align-items: stretch;
            justify-content: center;
            gap: 5px;

            padding-top: 5px;

        }

        .chrome {
            width: 1em;
            color: var(--thermal-primary-dark);
            transition: all .3s ease-in-out;
            cursor: pointer;
            &:hover {
                color: var(--thermal-primary);
            }
        }
    
    `}renderControls(e,t,n){return k`<nav class="controls">

    <thermal-btn 
        disabled="${t}"
        @click=${()=>{e.timeline.prev()}}
    >${N(L.prev)}</thermal-btn>


    <thermal-btn 
        class="${sd(n)}" 
        @click=${this.handlePlayButtonClick.bind(this)}
        icon="${this.playing?`pause`:`play`}"
        iconStyle="solid"
        disabled="${t}"
    ></thermal-btn>

    <thermal-btn 
        @click=${()=>e.timeline.next()}
        disabled="${t}"
    >${N(L.next)}</thermal-btn>

    <thermal-btn 
        @click=${()=>e.timeline.setRelativeTime(0)}
        disabled="${t}"
    >${N(L.back)}</thermal-btn>

    <file-playback-speed-dropdown enabled="${this.mayStop?`on`:`off`}" class="item"></file-playback-speed-dropdown>

</nav>`}render(){let e=this.file;if(e===void 0||e.duration===0)return A;let t={container:!0,collapsed:this.collapsed},n={may:this.mayStop===!0,mayNot:this.mayStop===!1},r={item:!0,button:!0,playback:!0,...n},i={item:!0,timeline:!0,...n},a=this.mayStop?`false`:`true`;return k`
<section class="${sd(t)}" ${W(this.containerRef)}>

    <aside class="ticks-horizontal-indent">

        <notation-timeline></notation-timeline>

        <div class="${sd(i)}"  ${W(this.timelineRef)}>

            <div 
                class="timeline-bar" 
                @click=${this.handleBarClick}
                @mouseenter=${this.handleBarEnter.bind(this)}
                @mousemove=${this.handleBarHover} 
                @mouseleave=${this.handleBarMouseLeave.bind(this)}
            >
                <div class="bar" data-video-rerender style="width: ${this.currentFrame?this.currentFrame.percentage:0}%" ${W(this.barRef)}></div>
                    ${this.cursor===void 0?``:k`<div class="pointer" style="left: ${this.cursor}%"></div>`}
                </div>

            </div>


${this.currentFrame?xf(e.duration,this.ticks,this.currentFrame.ms,this.pointerMs):A}


${this.hasPlayButton===!0?this.renderControls(e,a,r):A}

        </div>

    </aside>

</section>



${this.currentFrame!==void 0&&this.hasInfo===!0?k`<div class="small real ${this.collapsed?`collapsed`:``}">
        <div>
            <span class="label">${N(L.date)}:</span> 
            <span class="inline" data-video-dynamic>${Dt(this.currentFrame.absolute,`d. L. y`)}</span>
        </div>
        <div>
            <span class="label">${N(L.time)}:</span> 
            <span class="inline" data-video-dynamic>${Dt(this.currentFrame.absolute,`H'h' mm'm' ss:SSS`)}</span>
        </div>
        <div>
            <span class="label">${N(L.frame)}:</span> 
            <span class="inline" data-video-dynamic>${this.currentFrame.index+1} / ${this.file?.frameCount}</span>
        </div>
    </div>`:A}
    `}};R([I({context:lc,subscribe:!0}),H()],sp.prototype,`playing`,void 0),R([I({context:sc,subscribe:!0}),H()],sp.prototype,`currentFrame`,void 0),R([I({context:cc,subscribe:!0}),H()],sp.prototype,`duration`,void 0),R([I({context:fc,subscribe:!0}),H()],sp.prototype,`mayStop`,void 0),R([I({context:oc,subscribe:!0})],sp.prototype,`cursor`,void 0),R([V({type:String,reflect:!0})],sp.prototype,`hasPlayButton`,void 0),R([V({type:String,reflect:!0})],sp.prototype,`hasInfo`,void 0),R([V({type:String,reflect:!0})],sp.prototype,`interactive`,void 0),R([H()],sp.prototype,`collapsed`,void 0),R([H()],sp.prototype,`ticks`,void 0),R([H()],sp.prototype,`pointerMs`,void 0);function G(e){if(!e)throw Error(`Assertion failed.`)}var cp=Math.PI/180,lp=e=>{let t=(e%360+360)%360;if(t===0||t===90||t===180||t===270)return t;throw Error(`Invalid rotation ${e}.`)},up=[1,0,0,0,1,0,0,0,1],dp=(e,t,n)=>{let[r,i,,a,o]=e,s=Math.abs(r)*t+Math.abs(a)*n,c=Math.abs(i)*t+Math.abs(o)*n;return hp(hp(pp(-t/2,-n/2),e),pp(s/2,c/2))},fp=e=>{let t=e*cp,n=Math.round(Math.cos(t)),r=Math.round(Math.sin(t));return[n,r,0,-r,n,0,0,0,1]},pp=(e,t)=>[1,0,0,0,1,0,e,t,1],mp=(e,t)=>[e,0,0,0,t,0,0,0,1],hp=(e,t)=>{let n=Array(9);for(let r=0;r<3;r++)for(let i=0;i<3;i++)n[3*r+i]=e[3*r]*t[i]+e[3*r+1]*t[3+i]+e[3*r+2]*t[6+i];return n},gp=(e,t,n,r)=>({rotation:lp(e+(t?-n:n)),flip:t!==r}),_p=e=>e&&e[e.length-1],vp=e=>e>=0&&e<2**32,yp=e=>e>=-(2**31)&&e<2**31,K=e=>{let t=0;for(;e.readBits(1)===0&&t<32;)t++;if(t>=32)throw Error(`Invalid exponential-Golomb code.`);return(1<<t)-1+e.readBits(t)},bp=e=>{let t=K(e);return t&1?t+1>>1:-(t>>1)},xp=e=>e.constructor===Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),Sp=e=>e.constructor===DataView?e:ArrayBuffer.isView(e)?new DataView(e.buffer,e.byteOffset,e.byteLength):new DataView(e),Cp=globalThis.TextEncoder===void 0?class{constructor(){this.encoding=`utf-8`}encode(e=``){let t=new Uint8Array(3*e.length),n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);if(i<128)t[n++]=i;else if(i<2048)t[n++]=192|i>>6,t[n++]=128|i&63;else if(i<55296||i>57343)t[n++]=224|i>>12,t[n++]=128|i>>6&63,t[n++]=128|i&63;else{let a=r+1<e.length?e.charCodeAt(r+1):0;i<56320&&a>=56320&&a<=57343?(i=65536+(i-55296<<10)+(a-56320),r++,t[n++]=240|i>>18,t[n++]=128|i>>12&63,t[n++]=128|i>>6&63,t[n++]=128|i&63):(t[n++]=239,t[n++]=191,t[n++]=189)}}return t.slice(0,n)}}:globalThis.TextEncoder;globalThis.TextDecoder===void 0||globalThis.TextDecoder;var wp=new Cp,Tp={bt709:1,bt470bg:5,smpte170m:6,bt2020:9,smpte432:12},Ep={bt709:1,smpte170m:6,linear:8,"iec61966-2-1":13,pq:16,hlg:18},Dp={rgb:0,bt709:1,bt470bg:5,smpte170m:6,"bt2020-ncl":9},Op=e=>!e||e.primaries==null&&e.transfer==null&&e.matrix==null&&e.fullRange==null,kp=e=>e instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&e instanceof SharedArrayBuffer||ArrayBuffer.isView(e),Ap=class{constructor(){this.currentPromise=Promise.resolve(),this.pending=0}async acquire(){let e,t=new Promise(t=>{let n=!1;e=()=>{n||=(t(),this.pending--,!0)}}),n=this.currentPromise;return this.currentPromise=t,this.pending++,await n,e}},jp=e=>[...e].map(e=>e.toString(16).padStart(2,`0`)).join(``),Mp=e=>(e=e>>1&1431655765|(e&1431655765)<<1,e=e>>2&858993459|(e&858993459)<<2,e=e>>4&252645135|(e&252645135)<<4,e=e>>8&16711935|(e&16711935)<<8,e=e>>16&65535|(e&65535)<<16,e>>>0),Np=(e,t,n)=>{let r=0,i=e.length-1,a=-1;for(;r<=i;){let o=r+(i-r+1)/2|0;n(e[o])<=t?(a=o,r=o+1):i=o-1}return a},Pp=()=>{let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}},Fp=e=>{throw Error(`Unexpected value: ${e}`)},Ip=(e,t,n)=>{let r=e.getUint8(t),i=e.getUint8(t+1),a=e.getUint8(t+2);return n?r|i<<8|a<<16:r<<16|i<<8|a},Lp=(e,t,n,r)=>{n>>>=0,n&=16777215,r?(e.setUint8(t,n&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n>>>16&255)):(e.setUint8(t,n>>>16&255),e.setUint8(t+1,n>>>8&255),e.setUint8(t+2,n&255))},Rp=(e,t,n)=>Math.max(t,Math.min(n,e)),zp=(e,t,n)=>e+(t-e)*n,Bp=(e,t)=>Math.round(e/t)*t,Vp=(e,t)=>Math.floor(e*t)/t,Hp=e=>{let t=0;for(;e!==0;)e&=e-1,t++;return t},Up=/^[a-z]{3}$/,Wp=e=>Up.test(e),Gp=1e6*(1+2**-52),Kp=(e,t)=>{let n=e<0?-1:1;e=Math.abs(e);let r=0,i=1,a=1,o=0,s=e;for(;;){let e=Math.floor(s),c=e*a+r,l=e*o+i;if(l>t)return{num:n*a,den:o};if(r=a,i=o,a=c,o=l,s=1/(s-e),!isFinite(s))break}return{num:n*a,den:o}},qp=class{constructor(){this.currentPromise=Promise.resolve()}call(e){return this.currentPromise=this.currentPromise.then(e)}},Jp=null,Yp=()=>Jp===null?Jp=typeof navigator<`u`&&navigator.userAgent?.includes(`Firefox`):Jp,Xp=null,Zp=()=>Xp===null?Xp=!(typeof navigator>`u`||!navigator.vendor?.includes(`Google Inc`)&&!/Chrome/.test(navigator.userAgent)):Xp,Qp=e=>globalThis.isSecureContext!==void 0&&!globalThis.isSecureContext?`${e} is not available in this environment; this may be because this page is running in an insecure context. Try serving your page over HTTPS or use localhost.`:`${e} is not available in this environment.`,$p=e=>e instanceof DOMException&&e.name===`QuotaExceededError`&&/reclaimed/i.test(e.message),em=(async()=>{})().constructor,tm=e=>e instanceof em||e instanceof Promise||typeof e?.then==`function`,nm=function*(e){for(let t in e){let n=e[t];n!==void 0&&(yield{key:t,value:n})}},rm=()=>{Symbol.dispose??=Symbol(`Symbol.dispose`)},im=e=>typeof e==`number`&&!Number.isNaN(e),am=(e,t)=>{let n=-1,r=1/0;for(let i=0;i<e.length;i++){let a=t(e[i]);a<r&&(r=a,n=i)}return n},om=e=>{G(Number.isInteger(e.num)),G(Number.isInteger(e.den)),G(e.den!==0);let t=Math.abs(e.num),n=Math.abs(e.den);for(;n!==0;){let e=t%n;t=n,n=e}let r=t||1;return{num:e.num/r,den:e.den/r}},sm=(e,t)=>{if(typeof e!=`object`||!e)throw TypeError(`${t} must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(`${t}.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(`${t}.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(`${t}.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(`${t}.height must be a non-negative integer.`)},cm=e=>new Promise(t=>setTimeout(t,e)),lm=e=>Array.isArray(e)?e:[e],um=class{constructor(){this._listeners=new Map}on(e,t,n){this._listeners.has(e)||this._listeners.set(e,new Set);let r={fn:t,once:n?.once??!1};return this._listeners.get(e).add(r),()=>{this._listeners.get(e)?.delete(r)}}_emit(...e){let[t,n]=e,r=this._listeners.get(t);if(r)for(let e of r){try{e.fn(n)}catch(e){console.error(e)}e.once&&r.delete(e)}}},dm=e=>typeof e==`object`&&!!e&&Object.getPrototypeOf(e)===Object.prototype&&Object.values(e).every(e=>typeof e==`string`),fm;(function(e){e[e.Silent=0]=`Silent`,e[e.Errors=1]=`Errors`,e[e.Warnings=2]=`Warnings`,e[e.Info=3]=`Info`})(fm||={});var pm=class e{constructor(){}static get level(){return e._level}static set level(t){if(t!==fm.Silent&&t!==fm.Errors&&t!==fm.Warnings&&t!==fm.Info)throw TypeError(`Invalid log level. Use one of the values of the LogLevel enum.`);e._level=t}static get _emitter(){return e._emitterInstance??=new um}static on(t,n,r){return e._emitter.on(t,n,r)}static _error(...t){e._emitter._emit(`error`,t),e._level>=fm.Errors&&console.error(...t)}static _warn(...t){e._emitter._emit(`warn`,t),e._level>=fm.Warnings&&console.warn(...t)}static _info(...t){e._emitter._emit(`info`,t),e._level>=fm.Info&&console.info(...t)}};pm._level=fm.Info,pm._emitterInstance=null;var mm=class{constructor(e,t){if(this.data=e,this.mimeType=t,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(typeof t!=`string`)throw TypeError(`mimeType must be a string.`)}},hm=class{constructor(e,t,n,r){if(this.data=e,this.mimeType=t,this.name=n,this.description=r,!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==void 0&&typeof t!=`string`)throw TypeError(`mimeType, when provided, must be a string.`);if(n!==void 0&&typeof n!=`string`)throw TypeError(`name, when provided, must be a string.`);if(r!==void 0&&typeof r!=`string`)throw TypeError(`description, when provided, must be a string.`)}},gm=e=>{if(!e||typeof e!=`object`)throw TypeError(`tags must be an object.`);if(e.title!==void 0&&typeof e.title!=`string`)throw TypeError(`tags.title, when provided, must be a string.`);if(e.description!==void 0&&typeof e.description!=`string`)throw TypeError(`tags.description, when provided, must be a string.`);if(e.artist!==void 0&&typeof e.artist!=`string`)throw TypeError(`tags.artist, when provided, must be a string.`);if(e.album!==void 0&&typeof e.album!=`string`)throw TypeError(`tags.album, when provided, must be a string.`);if(e.albumArtist!==void 0&&typeof e.albumArtist!=`string`)throw TypeError(`tags.albumArtist, when provided, must be a string.`);if(e.trackNumber!==void 0&&(!Number.isInteger(e.trackNumber)||e.trackNumber<=0))throw TypeError(`tags.trackNumber, when provided, must be a positive integer.`);if(e.tracksTotal!==void 0&&(!Number.isInteger(e.tracksTotal)||e.tracksTotal<=0))throw TypeError(`tags.tracksTotal, when provided, must be a positive integer.`);if(e.discNumber!==void 0&&(!Number.isInteger(e.discNumber)||e.discNumber<=0))throw TypeError(`tags.discNumber, when provided, must be a positive integer.`);if(e.discsTotal!==void 0&&(!Number.isInteger(e.discsTotal)||e.discsTotal<=0))throw TypeError(`tags.discsTotal, when provided, must be a positive integer.`);if(e.genre!==void 0&&typeof e.genre!=`string`)throw TypeError(`tags.genre, when provided, must be a string.`);if(e.date!==void 0&&(!(e.date instanceof Date)||Number.isNaN(e.date.getTime())))throw TypeError(`tags.date, when provided, must be a valid Date.`);if(e.beatsPerMinute!==void 0&&(!Number.isInteger(e.beatsPerMinute)||e.beatsPerMinute<=0))throw TypeError(`tags.beatsPerMinute, when provided, must be a positive integer.`);if(e.lyrics!==void 0&&typeof e.lyrics!=`string`)throw TypeError(`tags.lyrics, when provided, must be a string.`);if(e.images!==void 0){if(!Array.isArray(e.images))throw TypeError(`tags.images, when provided, must be an array.`);for(let t of e.images){if(!t||typeof t!=`object`)throw TypeError(`Each image in tags.images must be an object.`);if(!(t.data instanceof Uint8Array))throw TypeError(`Each image.data must be a Uint8Array.`);if(typeof t.mimeType!=`string`)throw TypeError(`Each image.mimeType must be a string.`);if(![`coverFront`,`coverBack`,`unknown`].includes(t.kind))throw TypeError(`Each image.kind must be 'coverFront', 'coverBack', or 'unknown'.`)}}if(e.comment!==void 0&&typeof e.comment!=`string`)throw TypeError(`tags.comment, when provided, must be a string.`);if(e.raw!==void 0){if(!e.raw||typeof e.raw!=`object`)throw TypeError(`tags.raw, when provided, must be an object.`);for(let t of Object.values(e.raw))if(t!==null&&typeof t!=`string`&&!(Array.isArray(t)&&t.every(e=>typeof e==`string`))&&!(t instanceof Uint8Array)&&!(t instanceof mm)&&!(t instanceof hm)&&!dm(t))throw TypeError(`Each value in tags.raw must be a string, string array, Uint8Array, RichImageData, AttachedFile, Record<string, string>, or null.`)}},_m=e=>{if(!e||typeof e!=`object`)throw TypeError(`disposition must be an object.`);if(e.default!==void 0&&typeof e.default!=`boolean`)throw TypeError(`disposition.default must be a boolean.`);if(e.primary!==void 0&&typeof e.primary!=`boolean`)throw TypeError(`disposition.primary must be a boolean.`);if(e.forced!==void 0&&typeof e.forced!=`boolean`)throw TypeError(`disposition.forced must be a boolean.`);if(e.original!==void 0&&typeof e.original!=`boolean`)throw TypeError(`disposition.original must be a boolean.`);if(e.commentary!==void 0&&typeof e.commentary!=`boolean`)throw TypeError(`disposition.commentary must be a boolean.`);if(e.hearingImpaired!==void 0&&typeof e.hearingImpaired!=`boolean`)throw TypeError(`disposition.hearingImpaired must be a boolean.`);if(e.visuallyImpaired!==void 0&&typeof e.visuallyImpaired!=`boolean`)throw TypeError(`disposition.visuallyImpaired must be a boolean.`)},vm=class e{constructor(e){this.bytes=e,this.pos=0}seekToByte(e){this.pos=8*e}readBit(){let e=Math.floor(this.pos/8),t=this.bytes[e]??0,n=7-(this.pos&7),r=(t&1<<n)>>n;return this.pos++,r}readBits(e){if(e===1)return this.readBit();let t=0;for(let n=0;n<e;n++)t<<=1,t|=this.readBit();return t}writeBits(e,t){let n=this.pos+e;for(let e=this.pos;e<n;e++){let r=Math.floor(e/8),i=this.bytes[r],a=7-(e&7);i&=~(1<<a),i|=(t&1<<n-e-1)>>n-e-1<<a,this.bytes[r]=i}this.pos=n}copyBits(e,t){let n=0;for(;n<e-7;n+=8)this.writeBits(8,t.readBits(8));let r=e-n;r>0&&this.writeBits(r,t.readBits(r))}readAlignedByte(){if(this.pos%8!=0)throw Error(`Bitstream is not byte-aligned.`);let e=this.pos/8,t=this.bytes[e]??0;return this.pos+=8,t}skipBits(e){this.pos+=e}getBitsLeft(){return this.bytes.length*8-this.pos}clone(){let t=new e(this.bytes);return t.pos=this.pos,t}},ym=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350],bm=[-1,1,2,3,4,5,6,8],xm=e=>{let t=e.objectType===5||e.objectType===29,n=e.objectType===29,r=t?e.outputSampleRate/2:e.outputSampleRate,i=n?1:e.outputNumberOfChannels,a=bm.indexOf(i);if(a===-1)throw TypeError(`Unsupported number of channels: ${e.outputNumberOfChannels}`);let o=16;e.objectType>=32&&(o+=6),wm(r)===15&&(o+=24),t&&(o+=9,wm(e.outputSampleRate)===15&&(o+=24));let s=Math.ceil(o/8),c=new Uint8Array(s),l=new vm(c);return Sm(l,e.objectType),Cm(l,r),l.writeBits(4,a),t&&(Cm(l,e.outputSampleRate),Sm(l,2)),l.writeBits(3,0),c},Sm=(e,t)=>{t<32?e.writeBits(5,t):(e.writeBits(5,31),e.writeBits(6,t-32))},Cm=(e,t)=>{let n=wm(t);e.writeBits(4,n),n===15&&e.writeBits(24,t)},wm=e=>{let t=ym.indexOf(e);return t===-1?15:t},Tm=[48e3,44100,32e3],Em=[24e3,22050,16e3],Dm=`Mediabunny v1.61.4`,Om;(function(e){e[e.NON_IDR_SLICE=1]=`NON_IDR_SLICE`,e[e.SLICE_DPA=2]=`SLICE_DPA`,e[e.SLICE_DPB=3]=`SLICE_DPB`,e[e.SLICE_DPC=4]=`SLICE_DPC`,e[e.IDR=5]=`IDR`,e[e.SEI=6]=`SEI`,e[e.SPS=7]=`SPS`,e[e.PPS=8]=`PPS`,e[e.AUD=9]=`AUD`,e[e.SPS_EXT=13]=`SPS_EXT`})(Om||={});var km;(function(e){e[e.RASL_N=8]=`RASL_N`,e[e.RASL_R=9]=`RASL_R`,e[e.BLA_W_LP=16]=`BLA_W_LP`,e[e.RSV_IRAP_VCL23=23]=`RSV_IRAP_VCL23`,e[e.VPS_NUT=32]=`VPS_NUT`,e[e.SPS_NUT=33]=`SPS_NUT`,e[e.PPS_NUT=34]=`PPS_NUT`,e[e.AUD_NUT=35]=`AUD_NUT`,e[e.PREFIX_SEI_NUT=39]=`PREFIX_SEI_NUT`,e[e.SUFFIX_SEI_NUT=40]=`SUFFIX_SEI_NUT`})(km||={});var Am=function*(e){let t=0,n=-1;for(;t<e.length-2;){let r=e.indexOf(0,t);if(r===-1||r>=e.length-2)break;t=r;let i=0;t+3<e.length&&e[t+1]===0&&e[t+2]===0&&e[t+3]===1?i=4:e[t+1]===0&&e[t+2]===1&&(i=3),i===0?t++:(n!==-1&&t>n&&(yield{offset:n,length:t-n}),n=t+i,t=n)}n!==-1&&n<e.length&&(yield{offset:n,length:e.length-n})},jm=function*(e,t){let n=0,r=new DataView(e.buffer,e.byteOffset,e.byteLength);for(;n+t<=e.length;){let e;t===1?e=r.getUint8(n):t===2?e=r.getUint16(n,!1):t===3?e=Ip(r,n,!1):(G(t===4),e=r.getUint32(n,!1)),n+=t,yield{offset:n,length:e},n+=e}},Mm=(e,t)=>t.description?jm(e,(xp(t.description)[4]&3)+1):Am(e),Nm=e=>e&31,Pm=e=>{let t=[],n=e.length;for(let r=0;r<n;r++)r+2<n&&e[r]===0&&e[r+1]===0&&e[r+2]===3?(t.push(0,0),r+=2):t.push(e[r]);return new Uint8Array(t)};new Uint8Array([0,0,0,1]);var Fm=(e,t)=>{let n=e.reduce((e,n)=>e+t+n.byteLength,0),r=new Uint8Array(n),i=0;for(let n of e){let e=new DataView(r.buffer,r.byteOffset,r.byteLength);switch(t){case 1:e.setUint8(i,n.byteLength);break;case 2:e.setUint16(i,n.byteLength,!1);break;case 3:Lp(e,i,n.byteLength,!1);break;case 4:e.setUint32(i,n.byteLength,!1)}i+=t,r.set(n,i),i+=n.byteLength}return r},Im=e=>{try{let t=[],n=[],r=[];for(let i of Am(e)){let a=e.subarray(i.offset,i.offset+i.length),o=Nm(a[0]);o===Om.SPS?t.push(a):o===Om.PPS?n.push(a):o===Om.SPS_EXT&&r.push(a)}if(t.length===0||n.length===0)return null;let i=t[0],a=zm(i);G(a!==null);let o=a.profileIdc===100||a.profileIdc===110||a.profileIdc===122||a.profileIdc===144;return{configurationVersion:1,avcProfileIndication:a.profileIdc,profileCompatibility:a.constraintFlags,avcLevelIndication:a.levelIdc,lengthSizeMinusOne:3,sequenceParameterSets:t,pictureParameterSets:n,chromaFormat:o?a.chromaFormatIdc:null,bitDepthLumaMinus8:o?a.bitDepthLumaMinus8:null,bitDepthChromaMinus8:o?a.bitDepthChromaMinus8:null,sequenceParameterSetExt:o?r:null}}catch(e){return pm._error(`Error building AVC Decoder Configuration Record:`,e),null}},Lm=e=>{let t=[];t.push(e.configurationVersion),t.push(e.avcProfileIndication),t.push(e.profileCompatibility),t.push(e.avcLevelIndication),t.push(252|e.lengthSizeMinusOne&3),t.push(224|e.sequenceParameterSets.length&31);for(let n of e.sequenceParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}t.push(e.pictureParameterSets.length);for(let n of e.pictureParameterSets){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}if((e.avcProfileIndication===100||e.avcProfileIndication===110||e.avcProfileIndication===122||e.avcProfileIndication===144)&&e.chromaFormat!==null){G(e.bitDepthLumaMinus8!==null),G(e.bitDepthChromaMinus8!==null),G(e.sequenceParameterSetExt!==null),t.push(252|e.chromaFormat&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.sequenceParameterSetExt.length);for(let n of e.sequenceParameterSetExt){let e=n.byteLength;t.push(e>>8),t.push(e&255);for(let r=0;r<e;r++)t.push(n[r])}}return new Uint8Array(t)},Rm={1:{num:1,den:1},2:{num:12,den:11},3:{num:10,den:11},4:{num:16,den:11},5:{num:40,den:33},6:{num:24,den:11},7:{num:20,den:11},8:{num:32,den:11},9:{num:80,den:33},10:{num:18,den:11},11:{num:15,den:11},12:{num:64,den:33},13:{num:160,den:99},14:{num:4,den:3},15:{num:3,den:2},16:{num:2,den:1}},zm=e=>{try{let t=Pm(e),n=new vm(t);if(n.skipBits(1),n.skipBits(2),n.readBits(5)!==7)return null;let r=n.readAlignedByte(),i=n.readAlignedByte(),a=n.readAlignedByte();K(n);let o=1,s=0,c=0,l=0;if((r===100||r===110||r===122||r===244||r===44||r===83||r===86||r===118||r===128)&&(o=K(n),o===3&&(l=n.readBits(1)),s=K(n),c=K(n),n.skipBits(1),n.readBits(1))){for(let e=0;e<(o===3?12:8);e++)if(n.readBits(1)){let t=e<6?16:64,r=8,i=8;for(let e=0;e<t;e++){if(i!==0){let e=bp(n);i=(r+e+256)%256}r=i===0?r:i}}}K(n);let u=K(n);if(u===0)K(n);else if(u===1){n.skipBits(1),bp(n),bp(n);let e=K(n);for(let t=0;t<e;t++)bp(n)}K(n),n.skipBits(1);let d=K(n),f=K(n),p=16*(d+1),m=16*(f+1),h=p,g=m,_=n.readBits(1);if(_||n.skipBits(1),n.skipBits(1),n.readBits(1)){let e=K(n),t=K(n),r=K(n),i=K(n),a,s;if((l===0?o:0)===0)a=1,s=2-_;else{let e=o===3?1:2,t=o===1?2:1;a=e,s=t*(2-_)}h-=a*(e+t),g-=s*(r+i)}let v=2,y=2,b=2,x=0,S={num:1,den:1},C=null,ee=null,w=null,T=null,te=n.pos;if(n.readBits(1)){if(n.readBits(1)){let e=n.readBits(8);if(e===255)S={num:n.readBits(16),den:n.readBits(16)};else{let t=Rm[e];t&&(S=t)}}n.readBits(1)&&n.skipBits(1),n.readBits(1)&&(n.skipBits(3),x=n.readBits(1),n.readBits(1)&&(v=n.readBits(8),y=n.readBits(8),b=n.readBits(8))),n.readBits(1)&&(K(n),K(n)),n.readBits(1)&&(n.skipBits(32),n.skipBits(32),n.skipBits(1));let e=n.readBits(1);e&&Bm(n);let t=n.readBits(1);t&&Bm(n),(e||t)&&n.skipBits(1),n.skipBits(1),w=n.pos,T=n.readBits(1),T&&(n.skipBits(1),K(n),K(n),K(n),K(n),C=K(n),ee=K(n))}if(C===null){G(ee===null);let e=i&16;if((r===44||r===86||r===100||r===110||r===122||r===244)&&e)C=0,ee=0;else{let e=d+1,t=f+1,n=(2-_)*t,r=Ah.find(e=>e.level>=a)??_p(Ah),i=Math.min(Math.floor(r.maxDpbMbs/(e*n)),16);C=i,ee=i}}return G(ee!==null),{emulationUnpreventedBytes:t,profileIdc:r,constraintFlags:i,levelIdc:a,frameMbsOnlyFlag:_,chromaFormatIdc:o,bitDepthLumaMinus8:s,bitDepthChromaMinus8:c,codedWidth:p,codedHeight:m,displayWidth:h,displayHeight:g,pixelAspectRatio:S,colourPrimaries:v,matrixCoefficients:b,transferCharacteristics:y,fullRangeFlag:x,numReorderFrames:C,maxDecFrameBuffering:ee,vuiParametersFlagBitOffset:te,bitstreamRestrictionFlagBitOffset:w,bitstreamRestrictionFlag:T}}catch(e){return pm._error(`Error parsing AVC SPS:`,e),null}},Bm=e=>{let t=K(e);e.skipBits(4),e.skipBits(4);for(let n=0;n<=t;n++)K(e),K(e),e.skipBits(1);e.skipBits(5),e.skipBits(5),e.skipBits(5),e.skipBits(5)},Vm=(e,t)=>t.description?jm(e,(xp(t.description)[21]&3)+1):Am(e),Hm=e=>e>>1&63,Um=e=>{try{let t=new vm(Pm(e));t.skipBits(16),t.readBits(4);let n=t.readBits(3),r=t.readBits(1),{general_profile_space:i,general_tier_flag:a,general_profile_idc:o,general_profile_compatibility_flags:s,general_constraint_indicator_flags:c,general_level_idc:l}=Gm(t,n);K(t);let u=K(t),d=0;u===3&&(d=t.readBits(1));let f=K(t),p=K(t),m=f,h=p;if(t.readBits(1)){let e=K(t),n=K(t),r=K(t),i=K(t),a=1,o=1,s=d===0?u:0;s===1?(a=2,o=2):s===2&&(a=2,o=1),m-=(e+n)*a,h-=(r+i)*o}let g=K(t),_=K(t);K(t);let v=t.readBits(1)?0:n,y=0;for(let e=v;e<=n;e++)K(t),y=K(t),K(t);if(K(t),K(t),K(t),K(t),K(t),K(t),t.readBits(1)&&t.readBits(1)&&Km(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&(t.skipBits(4),t.skipBits(4),K(t),K(t),t.skipBits(1)),qm(t,K(t)),t.readBits(1)){let e=K(t);for(let n=0;n<e;n++)K(t),t.skipBits(1)}t.skipBits(1),t.skipBits(1);let b=2,x=2,S=2,C=0,ee=0,w={num:1,den:1};if(t.readBits(1)){let e=Ym(t,n);w=e.pixelAspectRatio,b=e.colourPrimaries,x=e.transferCharacteristics,S=e.matrixCoefficients,C=e.fullRangeFlag,ee=e.minSpatialSegmentationIdc}return{displayWidth:m,displayHeight:h,pixelAspectRatio:w,colourPrimaries:b,transferCharacteristics:x,matrixCoefficients:S,fullRangeFlag:C,maxDecFrameBuffering:y+1,spsMaxSubLayersMinus1:n,spsTemporalIdNestingFlag:r,generalProfileSpace:i,generalTierFlag:a,generalProfileIdc:o,generalProfileCompatibilityFlags:s,generalConstraintIndicatorFlags:c,generalLevelIdc:l,chromaFormatIdc:u,bitDepthLumaMinus8:g,bitDepthChromaMinus8:_,minSpatialSegmentationIdc:ee}}catch(e){return pm._error(`Error parsing HEVC SPS:`,e),null}},Wm=e=>{try{let t=[],n=[],r=[],i=[];for(let a of Am(e)){let o=e.subarray(a.offset,a.offset+a.length),s=Hm(o[0]);s===km.VPS_NUT?t.push(o):s===km.SPS_NUT?n.push(o):s===km.PPS_NUT?r.push(o):(s===km.PREFIX_SEI_NUT||s===km.SUFFIX_SEI_NUT)&&i.push(o)}if(n.length===0||r.length===0)return null;let a=Um(n[0]);if(!a)return null;let o=0;if(r.length>0){let e=r[0],t=new vm(Pm(e));t.skipBits(16),K(t),K(t),t.skipBits(1),t.skipBits(1),t.skipBits(3),t.skipBits(1),t.skipBits(1),K(t),K(t),bp(t),t.skipBits(1),t.skipBits(1),t.readBits(1)&&K(t),bp(t),bp(t),t.skipBits(1),t.skipBits(1),t.skipBits(1),t.skipBits(1);let n=t.readBits(1),i=t.readBits(1);o=!n&&!i?0:n&&!i?2:!n&&i?3:0}let s=[...t.length?[{arrayCompleteness:1,nalUnitType:km.VPS_NUT,nalUnits:t}]:[],...n.length?[{arrayCompleteness:1,nalUnitType:km.SPS_NUT,nalUnits:n}]:[],...r.length?[{arrayCompleteness:1,nalUnitType:km.PPS_NUT,nalUnits:r}]:[],...i.length?[{arrayCompleteness:1,nalUnitType:Hm(i[0][0]),nalUnits:i}]:[]];return{configurationVersion:1,generalProfileSpace:a.generalProfileSpace,generalTierFlag:a.generalTierFlag,generalProfileIdc:a.generalProfileIdc,generalProfileCompatibilityFlags:a.generalProfileCompatibilityFlags,generalConstraintIndicatorFlags:a.generalConstraintIndicatorFlags,generalLevelIdc:a.generalLevelIdc,minSpatialSegmentationIdc:a.minSpatialSegmentationIdc,parallelismType:o,chromaFormatIdc:a.chromaFormatIdc,bitDepthLumaMinus8:a.bitDepthLumaMinus8,bitDepthChromaMinus8:a.bitDepthChromaMinus8,avgFrameRate:0,constantFrameRate:0,numTemporalLayers:a.spsMaxSubLayersMinus1+1,temporalIdNested:a.spsTemporalIdNestingFlag,lengthSizeMinusOne:3,arrays:s}}catch(e){return pm._error(`Error building HEVC Decoder Configuration Record:`,e),null}},Gm=(e,t)=>{let n=e.readBits(2),r=e.readBits(1),i=e.readBits(5),a=0;for(let t=0;t<32;t++)a=a<<1|e.readBits(1);let o=new Uint8Array(6);for(let t=0;t<6;t++)o[t]=e.readBits(8);let s=e.readBits(8),c=[],l=[];for(let n=0;n<t;n++)c.push(e.readBits(1)),l.push(e.readBits(1));if(t>0)for(let n=t;n<8;n++)e.skipBits(2);for(let n=0;n<t;n++)c[n]&&e.skipBits(88),l[n]&&e.skipBits(8);return{general_profile_space:n,general_tier_flag:r,general_profile_idc:i,general_profile_compatibility_flags:a,general_constraint_indicator_flags:o,general_level_idc:s}},Km=e=>{for(let t=0;t<4;t++)for(let n=0;n<(t===3?2:6);n++)if(!e.readBits(1))K(e);else{let n=Math.min(64,1<<4+(t<<1));t>1&&bp(e);for(let t=0;t<n;t++)bp(e)}},qm=(e,t)=>{let n=[];for(let r=0;r<t;r++)n[r]=Jm(e,r,t,n)},Jm=(e,t,n,r)=>{let i=0,a=0,o=0;if(t!==0&&(a=e.readBits(1)),a){o=t===n?t-(K(e)+1):t-1,e.readBits(1),K(e);let a=r[o]??0;for(let t=0;t<=a;t++)e.readBits(1)||e.readBits(1);i=r[o]}else{let t=K(e),n=K(e);for(let n=0;n<t;n++)K(e),e.readBits(1);for(let t=0;t<n;t++)K(e),e.readBits(1);i=t+n}return i},Ym=(e,t)=>{let n=2,r=2,i=2,a=0,o=0,s={num:1,den:1};if(e.readBits(1)){let t=e.readBits(8);if(t===255)s={num:e.readBits(16),den:e.readBits(16)};else{let e=Rm[t];e&&(s=e)}}return e.readBits(1)&&e.readBits(1),e.readBits(1)&&(e.readBits(3),a=e.readBits(1),e.readBits(1)&&(n=e.readBits(8),r=e.readBits(8),i=e.readBits(8))),e.readBits(1)&&(K(e),K(e)),e.readBits(1),e.readBits(1),e.readBits(1),e.readBits(1)&&(K(e),K(e),K(e),K(e)),e.readBits(1)&&(e.readBits(32),e.readBits(32),e.readBits(1)&&K(e),e.readBits(1)&&Xm(e,!0,t)),e.readBits(1)&&(e.readBits(1),e.readBits(1),e.readBits(1),o=K(e),K(e),K(e),K(e),K(e)),{pixelAspectRatio:s,colourPrimaries:n,transferCharacteristics:r,matrixCoefficients:i,fullRangeFlag:a,minSpatialSegmentationIdc:o}},Xm=(e,t,n)=>{let r=!1,i=!1,a=!1;t&&(r=e.readBits(1)===1,i=e.readBits(1)===1,(r||i)&&(a=e.readBits(1)===1,a&&(e.readBits(8),e.readBits(5),e.readBits(1),e.readBits(5)),e.readBits(4),e.readBits(4),a&&e.readBits(4),e.readBits(5),e.readBits(5),e.readBits(5)));for(let t=0;t<=n;t++){let t=e.readBits(1)===1,n=!0;t||(n=e.readBits(1)===1);let o=!1;n?K(e):o=e.readBits(1)===1;let s=1;o||(s=K(e)+1),r&&Zm(e,s,a),i&&Zm(e,s,a)}},Zm=(e,t,n)=>{for(let r=0;r<t;r++)K(e),K(e),n&&(K(e),K(e)),e.readBits(1)},Qm=e=>{let t=[];t.push(e.configurationVersion),t.push((e.generalProfileSpace&3)<<6|(e.generalTierFlag&1)<<5|e.generalProfileIdc&31),t.push(e.generalProfileCompatibilityFlags>>>24&255),t.push(e.generalProfileCompatibilityFlags>>>16&255),t.push(e.generalProfileCompatibilityFlags>>>8&255),t.push(e.generalProfileCompatibilityFlags&255),t.push(...e.generalConstraintIndicatorFlags),t.push(e.generalLevelIdc&255),t.push(240|e.minSpatialSegmentationIdc>>8&15),t.push(e.minSpatialSegmentationIdc&255),t.push(252|e.parallelismType&3),t.push(252|e.chromaFormatIdc&3),t.push(248|e.bitDepthLumaMinus8&7),t.push(248|e.bitDepthChromaMinus8&7),t.push(e.avgFrameRate>>8&255),t.push(e.avgFrameRate&255),t.push((e.constantFrameRate&3)<<6|(e.numTemporalLayers&7)<<3|(e.temporalIdNested&1)<<2|e.lengthSizeMinusOne&3),t.push(e.arrays.length&255);for(let n of e.arrays){t.push((n.arrayCompleteness&1)<<7|n.nalUnitType&63),t.push(n.nalUnits.length>>8&255),t.push(n.nalUnits.length&255);for(let e of n.nalUnits){t.push(e.length>>8&255),t.push(e.length&255);for(let n=0;n<e.length;n++)t.push(e[n])}}return new Uint8Array(t)},$m;(function(e){e[e.audAllowed=0]=`audAllowed`,e[e.beforeFirstVcl=1]=`beforeFirstVcl`,e[e.afterFirstVcl=2]=`afterFirstVcl`,e[e.eoBitstreamAllowed=3]=`eoBitstreamAllowed`,e[e.noMoreDataAllowed=4]=`noMoreDataAllowed`})($m||={});var eh={1:{colourPrimaries:5,transferCharacteristics:6,matrixCoefficients:5},2:{colourPrimaries:1,transferCharacteristics:1,matrixCoefficients:1},3:{colourPrimaries:6,transferCharacteristics:6,matrixCoefficients:6},4:{colourPrimaries:7,transferCharacteristics:7,matrixCoefficients:7},5:{colourPrimaries:9,transferCharacteristics:14,matrixCoefficients:9},7:{colourPrimaries:1,transferCharacteristics:13,matrixCoefficients:0}},th=e=>{let t=new vm(e);if(t.readBits(2)!==2)return null;let n=t.readBits(1),r=(t.readBits(1)<<1)+n;if(r===3&&t.skipBits(1),t.readBits(1)===1||t.readBits(1)!==0||(t.skipBits(2),t.readBits(24)!==4817730))return null;let i=8;r>=2&&(i=t.readBits(1)?12:10);let a=t.readBits(3),o=0,s=0;if(a!==7){if(s=t.readBits(1),r===1||r===3){let e=t.readBits(1),n=t.readBits(1);o=!e&&!n?3:e&&!n?2:1,t.skipBits(1)}else o=1}else o=3,s=1;let c=t.readBits(16),l=t.readBits(16),u=(c+1)*(l+1),d=_p(Mh).level;for(let e of Mh)if(u<=e.maxPictureSize){d=e.level;break}let f=eh[a],p=f?.colourPrimaries??2,m=f?.transferCharacteristics??2,h=f?.matrixCoefficients??2;return{profile:r,level:d,bitDepth:i,chromaSubsampling:o,videoFullRangeFlag:s,colourPrimaries:p,transferCharacteristics:m,matrixCoefficients:h}},nh=function*(e){let t=new vm(e),n=()=>{let e=0;for(let n=0;n<8;n++){let r=t.readAlignedByte();if(e+=(r&127)*2**(n*7),!(r&128))break;if(n===7&&r&128)return null}return e>2**32-1?null:e};for(;t.getBitsLeft()>=8;){t.skipBits(1);let r=t.readBits(4),i=t.readBits(1),a=t.readBits(1);t.skipBits(1),i&&t.skipBits(8);let o;if(a){let e=n();if(e===null)return;o=e}else o=Math.floor(t.getBitsLeft()/8);G(t.pos%8==0),yield{type:r,data:e.subarray(t.pos/8,t.pos/8+o)},t.skipBits(o*8)}},rh=e=>{for(let{type:t,data:n}of nh(e)){if(t!==1)continue;let e=new vm(n),r=e.readBits(3);e.readBits(1);let i=e.readBits(1),a=0,o=0,s=0;if(i)a=e.readBits(5);else{let t=e.readBits(1),n=0;if(t){if(e.skipBits(32),e.skipBits(32),e.readBits(1)){let t=0;for(;t<32&&!e.readBits(1);)t++;t<32&&e.skipBits(t)}n=e.readBits(1),n&&(s=e.readBits(5),e.skipBits(32),e.skipBits(5),e.skipBits(5))}let r=e.readBits(1),i=e.readBits(5);for(let t=0;t<=i;t++){e.skipBits(12);let i=e.readBits(5);if(t===0&&(a=i),i>7){let n=e.readBits(1);t===0&&(o=n)}if(n&&e.readBits(1)){let t=s+1;e.skipBits(t),e.skipBits(t),e.skipBits(1)}r&&e.readBits(1)&&e.skipBits(4)}}let c=e.readBits(4),l=e.readBits(4),u=c+1;e.skipBits(u);let d=l+1;e.skipBits(d);let f=0;if(f=i?0:e.readBits(1),f&&(e.skipBits(4),e.skipBits(3)),e.skipBits(1),e.skipBits(1),e.skipBits(1),!i){e.skipBits(1),e.skipBits(1),e.skipBits(1),e.skipBits(1);let t=e.readBits(1);t&&(e.skipBits(1),e.skipBits(1));let n=e.readBits(1),r=0;r=n?2:e.readBits(1),r>0&&(e.readBits(1)||e.skipBits(1)),t&&e.skipBits(3)}e.skipBits(1),e.skipBits(1),e.skipBits(1);let p=e.readBits(1),m=8;r===2&&p?m=e.readBits(1)?12:10:r<=2&&(m=p?10:8);let h=0;r!==1&&(h=e.readBits(1));let g=2,_=2,v=2;e.readBits(1)&&(g=e.readBits(8),_=e.readBits(8),v=e.readBits(8));let y=0,b=1,x=1,S=0;return h?y=e.readBits(1):g===1&&_===13&&v===0?(y=1,b=0,x=0):(y=e.readBits(1),r===0?(b=1,x=1):r===1?(b=0,x=0):m===12?(b=e.readBits(1),x=b?e.readBits(1):0):(b=1,x=0),b&&x&&(S=e.readBits(2))),{profile:r,level:a,tier:o,bitDepth:m,monochrome:h,chromaSubsamplingX:b,chromaSubsamplingY:x,chromaSamplePosition:S,videoFullRangeFlag:y,colourPrimaries:g,transferCharacteristics:_,matrixCoefficients:v}}return null},ih=e=>e.colourPrimaries!==2||e.transferCharacteristics!==2||e.matrixCoefficients!==2,ah=e=>{let t=Sp(e),n=t.getUint8(9),r=t.getUint16(10,!0),i=t.getUint32(12,!0),a=t.getInt16(16,!0),o=t.getUint8(18),s=null;return o&&(s=e.subarray(19,21+n)),{outputChannelCount:n,preSkip:r,inputSampleRate:i,outputGain:a,channelMappingFamily:o,channelMappingTable:s}},oh=(e,t,n)=>{switch(e){case`avc`:for(let e of Mm(n,t)){let t=n[e.offset],r=Nm(t);if(r>=Om.NON_IDR_SLICE&&r<=Om.SLICE_DPC)return`delta`;if(r===Om.IDR)return`key`;if(r===Om.SEI&&!Zp()){let t=Pm(n.subarray(e.offset,e.offset+e.length)),r=1;do{let e=0;for(;;){let n=t[r++];if(n===void 0||(e+=n,n<255))break}let n=0;for(;;){let e=t[r++];if(e===void 0||(n+=e,e<255))break}if(e===6){let e=new vm(t);e.pos=8*r;let n=K(e),i=e.readBits(1);if(n===0&&i===1)return`key`}r+=n}while(r<t.length-1)}}return`delta`;case`hevc`:for(let e of Vm(n,t)){let t=Hm(n[e.offset]);if(t<km.BLA_W_LP)return`delta`;if(t<=km.RSV_IRAP_VCL23)return`key`}return`delta`;case`vp8`:return n[0]&1?`delta`:`key`;case`vp9`:{let e=new vm(n);if(e.readBits(2)!==2)return null;let t=e.readBits(1);return(e.readBits(1)<<1)+t===3&&e.skipBits(1),e.readBits(1)?null:e.readBits(1)===0?`key`:`delta`}case`av1`:{let e=!1;for(let{type:t,data:r}of nh(n))if(t===1){let t=new vm(r);t.skipBits(4),e=!!t.readBits(1)}else if(t===3||t===6||t===7){if(e)return`key`;let t=new vm(r);return t.readBits(1)?null:t.readBits(2)===0?`key`:`delta`}return null}case`prores`:return`key`;default:Fp(e),G(!1)}},sh;(function(e){e[e.STREAMINFO=0]=`STREAMINFO`,e[e.VORBIS_COMMENT=4]=`VORBIS_COMMENT`,e[e.PICTURE=6]=`PICTURE`})(sh||={});var ch=e=>{if(e.length<7||e[0]!==11||e[1]!==119)return null;let t=new vm(e);t.skipBits(16),t.skipBits(16);let n=t.readBits(2);if(n===3)return null;let r=t.readBits(6),i=t.readBits(5);if(i>8)return null;let a=t.readBits(3),o=t.readBits(3);return o&1&&o!==1&&t.skipBits(2),o&4&&t.skipBits(2),o===2&&t.skipBits(2),{fscod:n,bsid:i,bsmod:a,acmod:o,lfeon:t.readBits(1),bitRateCode:Math.floor(r/2)}};new Uint8Array([5,4,65,67,45,51]),new Uint8Array([5,4,69,65,67,51]);var lh=[1,2,3,6],uh=e=>{if(e.length<6||e[0]!==11||e[1]!==119)return null;let t=new vm(e);t.skipBits(16);let n=t.readBits(2);if(t.skipBits(3),n!==0&&n!==2)return null;let r=t.readBits(11),i=t.readBits(2),a=0,o;i===3?(a=t.readBits(2),o=3):o=t.readBits(2);let s=t.readBits(3),c=t.readBits(1),l=t.readBits(5);if(l<11||l>16)return null;let u=lh[o],d;return d=i<3?Tm[i]/1e3:Em[a]/1e3,{dataRate:Math.round((r+1)*d/(u*16)),substreams:[{fscod:i,fscod2:a,bsid:l,bsmod:0,acmod:s,lfeon:c,numDepSub:0,chanLoc:0}]}},dh=8,fh=[0,8e3,16e3,32e3,0,0,11025,22050,44100,0,0,12e3,24e3,48e3,96e3,192e3],ph=[32e3,56e3,64e3,96e3,112e3,128e3,192e3,224e3,256e3,32e4,384e3,448e3,512e3,576e3,64e4,768e3,96e4,1024e3,1152e3,128e4,1344e3,1408e3,1411200,1472e3,1536e3,192e4,2048e3,3072e3,384e4,0,0,0],mh=[16,16,20,20,0,24,24,0],hh=[1,2,2,2,2,3,3,4,4,5,6,6,6,7,8,8],gh=[1,2,2,2,2,3,18,19,6,7,518,323,83,519,582,535],_h=8,vh=[32e3,44100,48e3,0],yh=[8e3,16e3,32e3,64e3,128e3,22050,44100,88200,176400,352800,12e3,24e3,48e3,96e3,192e3,384e3],bh=[512,1024,2048,4096],xh=e=>{let t=Sh(e),n=Sp(e),r=t?Math.ceil(t.frameSize/4)*4:0,i=null;for(;r+4<=e.length&&n.getUint32(r)===1683496997;){let t=Ch(e.subarray(r));if(!t)break;i??=t,r+=t.frameSize}if(t)return{frameSize:i?r:t.frameSize,sampleRate:t.sampleRate,numberOfChannels:t.numberOfChannels,sampleCount:t.sampleCount,channelLayout:t.channelLayout,pcmResolution:t.pcmResolution,bitRate:t.bitRate,core:t,hasExtensions:i!==null};if(!i?.asset)return null;let{asset:a}=i;return{frameSize:r,sampleRate:a.sampleRate,numberOfChannels:a.numberOfChannels,sampleCount:a.sampleCount,channelLayout:a.channelLayout,pcmResolution:a.pcmResolution,bitRate:0,core:null,hasExtensions:!0}},Sh=e=>{if(e.length<18||e[0]!==127||e[1]!==254||e[2]!==128||e[3]!==1)return null;let t=new vm(e);if(t.skipBits(32),t.skipBits(1),t.readBits(5)!==31)return null;let n=t.readBits(1),r=t.readBits(7)+1;if(r%dh!==0)return null;let i=t.readBits(14)+1;if(i<96)return null;let a=t.readBits(6);if(a>=hh.length)return null;let o=fh[t.readBits(4)];if(o===0)return null;let s=ph[t.readBits(5)];if(t.readBits(1)!==0)return null;t.skipBits(4),t.skipBits(5);let c=t.readBits(2);if(c===3)return null;t.skipBits(1),n&&t.skipBits(16),t.skipBits(7);let l=mh[t.readBits(3)];if(l===0)return null;let u=c!==0;return{frameSize:i,sampleRate:o,numberOfChannels:hh[a]+ +!!u,sampleCount:r*32,channelLayout:gh[a]|(u?_h:0),amode:a,lfePresent:u,bitRate:s,pcmResolution:l}},Ch=e=>{if(e.length<10||e[0]!==100||e[1]!==88||e[2]!==32||e[3]!==37)return null;let t=new vm(e);t.skipBits(32),t.skipBits(8);let n=t.readBits(2),r=t.readBits(1),i=8+4*r,a=16+4*r;t.skipBits(i);let o=t.readBits(a)+1,s={frameSize:o,asset:null};if(!t.readBits(1))return s;let c=vh[t.readBits(2)],l=512*(t.readBits(3)+1);t.readBits(1)&&t.skipBits(36);let u=t.readBits(3)+1,d=t.readBits(3)+1,f=[];for(let e=0;e<u;e++)f.push(t.readBits(n+1));for(let e of f)t.skipBits(8*Hp(e));if(t.readBits(1)){t.skipBits(2);let e=t.readBits(2)+1<<2,n=t.readBits(2)+1;t.skipBits(n*e)}for(let e=0;e<d;e++)t.skipBits(a);t.skipBits(9),t.skipBits(3),t.readBits(1)&&t.skipBits(4),t.readBits(1)&&t.skipBits(24),t.readBits(1)&&t.skipBits(8*(t.readBits(10)+1));let p=t.readBits(5)+1,m=yh[t.readBits(4)],h=t.readBits(8)+1,g=0;if(t.readBits(1)&&(h>2&&t.skipBits(1),h>6&&t.skipBits(1),t.readBits(1))){let e=t.readBits(2)+1<<2;g=t.readBits(e)}return c===0||t.getBitsLeft()<0?s:{frameSize:o,asset:{sampleRate:m,numberOfChannels:h,sampleCount:Math.round(l*m/c),channelLayout:g,pcmResolution:p}}},wh=e=>{let t=new Uint8Array(20),n=Sp(t);n.setUint32(0,e.sampleRate),n.setUint32(4,e.bitRate),n.setUint32(8,e.bitRate),t[12]=e.pcmResolution;let r=e.core&&!e.hasExtensions?1:0,i=new vm(t);return i.seekToByte(13),i.writeBits(2,Math.max(bh.indexOf(e.sampleCount),0)),i.writeBits(5,r),i.writeBits(1,+!!e.core?.lfePresent),i.writeBits(6,e.core?.amode??0),i.writeBits(14,e.core?e.core.frameSize-1:0),i.writeBits(1,0),i.writeBits(3,0),i.writeBits(16,e.channelLayout),i.writeBits(1,0),i.writeBits(1,0),i.writeBits(1,0),i.writeBits(5,0),t},Th=[`avc`,`hevc`,`vp9`,`av1`,`vp8`,`prores`],Eh=[`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,`pcm-u8`,`pcm-s8`,`ulaw`,`alaw`],Dh=[`aac`,`opus`,`mp3`,`vorbis`,`flac`,`ac3`,`eac3`,`dts`],Oh=[...Dh,...Eh],kh=[`webvtt`],Ah=[{maxMacroblocks:99,maxBitrate:64e3,maxDpbMbs:396,level:10},{maxMacroblocks:396,maxBitrate:192e3,maxDpbMbs:900,level:11},{maxMacroblocks:396,maxBitrate:384e3,maxDpbMbs:2376,level:12},{maxMacroblocks:396,maxBitrate:768e3,maxDpbMbs:2376,level:13},{maxMacroblocks:396,maxBitrate:2e6,maxDpbMbs:2376,level:20},{maxMacroblocks:792,maxBitrate:4e6,maxDpbMbs:4752,level:21},{maxMacroblocks:1620,maxBitrate:4e6,maxDpbMbs:8100,level:22},{maxMacroblocks:1620,maxBitrate:1e7,maxDpbMbs:8100,level:30},{maxMacroblocks:3600,maxBitrate:14e6,maxDpbMbs:18e3,level:31},{maxMacroblocks:5120,maxBitrate:2e7,maxDpbMbs:20480,level:32},{maxMacroblocks:8192,maxBitrate:2e7,maxDpbMbs:32768,level:40},{maxMacroblocks:8192,maxBitrate:5e7,maxDpbMbs:32768,level:41},{maxMacroblocks:8704,maxBitrate:5e7,maxDpbMbs:34816,level:42},{maxMacroblocks:22080,maxBitrate:135e6,maxDpbMbs:110400,level:50},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:51},{maxMacroblocks:36864,maxBitrate:24e7,maxDpbMbs:184320,level:52},{maxMacroblocks:139264,maxBitrate:24e7,maxDpbMbs:696320,level:60},{maxMacroblocks:139264,maxBitrate:48e7,maxDpbMbs:696320,level:61},{maxMacroblocks:139264,maxBitrate:8e8,maxDpbMbs:696320,level:62}],jh=[{maxPictureSize:36864,maxBitrate:128e3,tier:`L`,level:30},{maxPictureSize:122880,maxBitrate:15e5,tier:`L`,level:60},{maxPictureSize:245760,maxBitrate:3e6,tier:`L`,level:63},{maxPictureSize:552960,maxBitrate:6e6,tier:`L`,level:90},{maxPictureSize:983040,maxBitrate:1e7,tier:`L`,level:93},{maxPictureSize:2228224,maxBitrate:12e6,tier:`L`,level:120},{maxPictureSize:2228224,maxBitrate:3e7,tier:`H`,level:120},{maxPictureSize:2228224,maxBitrate:2e7,tier:`L`,level:123},{maxPictureSize:2228224,maxBitrate:5e7,tier:`H`,level:123},{maxPictureSize:8912896,maxBitrate:25e6,tier:`L`,level:150},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:150},{maxPictureSize:8912896,maxBitrate:4e7,tier:`L`,level:153},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:153},{maxPictureSize:8912896,maxBitrate:6e7,tier:`L`,level:156},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:156},{maxPictureSize:35651584,maxBitrate:6e7,tier:`L`,level:180},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:180},{maxPictureSize:35651584,maxBitrate:12e7,tier:`L`,level:183},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:183},{maxPictureSize:35651584,maxBitrate:24e7,tier:`L`,level:186},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:186}],Mh=[{maxPictureSize:36864,maxBitrate:2e5,level:10},{maxPictureSize:73728,maxBitrate:8e5,level:11},{maxPictureSize:122880,maxBitrate:18e5,level:20},{maxPictureSize:245760,maxBitrate:36e5,level:21},{maxPictureSize:552960,maxBitrate:72e5,level:30},{maxPictureSize:983040,maxBitrate:12e6,level:31},{maxPictureSize:2228224,maxBitrate:18e6,level:40},{maxPictureSize:2228224,maxBitrate:3e7,level:41},{maxPictureSize:8912896,maxBitrate:6e7,level:50},{maxPictureSize:8912896,maxBitrate:12e7,level:51},{maxPictureSize:8912896,maxBitrate:18e7,level:52},{maxPictureSize:35651584,maxBitrate:18e7,level:60},{maxPictureSize:35651584,maxBitrate:24e7,level:61},{maxPictureSize:35651584,maxBitrate:48e7,level:62}],Nh=[{maxPictureSize:147456,maxBitrate:15e5,tier:`M`,level:0},{maxPictureSize:278784,maxBitrate:3e6,tier:`M`,level:1},{maxPictureSize:665856,maxBitrate:6e6,tier:`M`,level:4},{maxPictureSize:1065024,maxBitrate:1e7,tier:`M`,level:5},{maxPictureSize:2359296,maxBitrate:12e6,tier:`M`,level:8},{maxPictureSize:2359296,maxBitrate:3e7,tier:`H`,level:8},{maxPictureSize:2359296,maxBitrate:2e7,tier:`M`,level:9},{maxPictureSize:2359296,maxBitrate:5e7,tier:`H`,level:9},{maxPictureSize:8912896,maxBitrate:3e7,tier:`M`,level:12},{maxPictureSize:8912896,maxBitrate:1e8,tier:`H`,level:12},{maxPictureSize:8912896,maxBitrate:4e7,tier:`M`,level:13},{maxPictureSize:8912896,maxBitrate:16e7,tier:`H`,level:13},{maxPictureSize:8912896,maxBitrate:6e7,tier:`M`,level:14},{maxPictureSize:8912896,maxBitrate:24e7,tier:`H`,level:14},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:15},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:15},{maxPictureSize:35651584,maxBitrate:6e7,tier:`M`,level:16},{maxPictureSize:35651584,maxBitrate:24e7,tier:`H`,level:16},{maxPictureSize:35651584,maxBitrate:1e8,tier:`M`,level:17},{maxPictureSize:35651584,maxBitrate:48e7,tier:`H`,level:17},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:18},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:18},{maxPictureSize:35651584,maxBitrate:16e7,tier:`M`,level:19},{maxPictureSize:35651584,maxBitrate:8e8,tier:`H`,level:19}],Ph=`.01.01.01.01.00`,Fh=`.0.110.01.01.01.0`,Ih=[`ap4x`,`ap4h`,`apch`,`apcn`,`apcs`,`apco`],Lh=[`dtsc`,`dtsh`,`dtsl`,`dtse`],Rh=[{fourCc:`apco`,bitrate:45e6,alpha:!1},{fourCc:`apcs`,bitrate:102e6,alpha:!1},{fourCc:`apcn`,bitrate:147e6,alpha:!1},{fourCc:`apch`,bitrate:22e7,alpha:!1},{fourCc:`ap4h`,bitrate:33e7,alpha:!0},{fourCc:`ap4x`,bitrate:5e8,alpha:!0}],zh=(e,t,n,r,i)=>{if(e===`avc`){let e=Math.ceil(t/16)*Math.ceil(n/16),i=Ah.find(t=>e<=t.maxMacroblocks&&r<=t.maxBitrate)??_p(Ah),a=i?i.level:0;return`avc1.${`64`.padStart(2,`0`)}00${a.toString(16).padStart(2,`0`)}`}if(e===`hevc`){let e=t*n,i=jh.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??_p(jh);return`hev1.1.6.${i.tier}${i.level}.B0`}if(e===`vp8`)return`vp8`;if(e===`vp9`){let e=t*n;return`vp09.00.${(Mh.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??_p(Mh)).level.toString().padStart(2,`0`)}.08`}if(e===`av1`){let e=t*n,i=Nh.find(t=>e<=t.maxPictureSize&&r<=t.maxBitrate)??_p(Nh);return`av01.0.${i.level.toString().padStart(2,`0`)}${i.tier}.08`}if(e===`prores`){let e=(t*n/2073600)**.95,a=Rh.filter(e=>e.alpha===i),o=a[0].fourCc,s=1/0;for(let{fourCc:t,bitrate:n}of a){let i=Math.abs(n*e-r);i<s&&(s=i,o=t)}return o}throw Fp(e),TypeError(`Unhandled codec '${String(e)}'.`)},Bh=e=>{let t=e.split(`.`),n=Number(t[1]),r=t[2],i=Number(r.slice(0,-1)),a=(n<<5)+i,o=+(r.slice(-1)===`H`),s=Number(t[3]),c=s===8?0:1,l=+(s===12),u=t[4]?Number(t[4]):0,d=t[5]?Number(t[5][0]):1,f=t[5]?Number(t[5][1]):1,p=t[5]?Number(t[5][2]):0;return[129,a,(o<<7)+(c<<6)+(l<<5)+(u<<4)+(d<<3)+(f<<2)+p,0]},Vh=e=>{let{codec:t,codecDescription:n,colorSpace:r,avcCodecInfo:i,hevcCodecInfo:a,vp9CodecInfo:o,av1CodecInfo:s,proresFormat:c}=e;if(t===`avc`){if(G(e.avcType!==null),i){let t=new Uint8Array([i.avcProfileIndication,i.profileCompatibility,i.avcLevelIndication]);return`avc${e.avcType}.${jp(t)}`}if(!n||n.byteLength<4)throw TypeError(`AVC decoder description is not provided or is not at least 4 bytes long.`);return`avc${e.avcType}.${jp(n.subarray(1,4))}`}if(t===`hevc`){let e,t,r,i,o,s;if(a)e=a.generalProfileSpace,t=a.generalProfileIdc,r=Mp(a.generalProfileCompatibilityFlags),i=a.generalTierFlag,o=a.generalLevelIdc,s=[...a.generalConstraintIndicatorFlags];else{if(!n||n.byteLength<23)throw TypeError(`HEVC decoder description is not provided or is not at least 23 bytes long.`);let a=Sp(n),c=a.getUint8(1);e=c>>6&3,t=c&31,r=Mp(a.getUint32(2)),i=c>>5&1,o=a.getUint8(12),s=[];for(let e=0;e<6;e++)s.push(a.getUint8(6+e))}let c=`hev1.`;for(c+=[``,`A`,`B`,`C`][e]+t,c+=`.`,c+=r.toString(16).toUpperCase(),c+=`.`,c+=i===0?`L`:`H`,c+=o;s.length>0&&s[s.length-1]===0;)s.pop();return s.length>0&&(c+=`.`,c+=s.map(e=>e.toString(16).toUpperCase()).join(`.`)),c}if(t===`vp8`)return`vp8`;if(t===`vp9`){if(!o){let t=e.width*e.height,n=_p(Mh).level;for(let e of Mh)if(t<=e.maxPictureSize){n=e.level;break}return`vp09.00.${n.toString().padStart(2,`0`)}.08`}let t=o.profile.toString().padStart(2,`0`),n=o.level.toString().padStart(2,`0`),r=o.bitDepth.toString().padStart(2,`0`),i=o.chromaSubsampling.toString().padStart(2,`0`),a=o.colourPrimaries.toString().padStart(2,`0`),s=o.transferCharacteristics.toString().padStart(2,`0`),c=o.matrixCoefficients.toString().padStart(2,`0`),l=o.videoFullRangeFlag.toString().padStart(2,`0`),u=`vp09.${t}.${n}.${r}.${i}`;return u+=`.${a}.${s}.${c}.${l}`,u.endsWith(Ph)&&(u=u.slice(0,-15)),u}if(t===`av1`){if(!s){let t=e.width*e.height,n=_p(Mh).level;for(let e of Mh)if(t<=e.maxPictureSize){n=e.level;break}return`av01.0.${n.toString().padStart(2,`0`)}M.08`}let t=s.profile,n=s.level.toString().padStart(2,`0`),i=s.tier?`H`:`M`,a=s.bitDepth.toString().padStart(2,`0`),o=s.monochrome?`1`:`0`,c=100*s.chromaSubsamplingX+10*s.chromaSubsamplingY+1*(s.chromaSubsamplingX&&s.chromaSubsamplingY?s.chromaSamplePosition:0),l,u,d,f;ih(s)?(l=s.colourPrimaries,u=s.transferCharacteristics,d=s.matrixCoefficients,f=s.videoFullRangeFlag):(l=r?.primaries?Tp[r.primaries]:1,u=r?.transfer?Ep[r.transfer]:1,d=r?.matrix?Dp[r.matrix]:1,f=+!!r?.fullRange);let p=`av01.${t}.${n}${i}.${a}`;return p+=`.${o}.${c.toString().padStart(3,`0`)}`,p+=`.${l.toString().padStart(2,`0`)}`,p+=`.${u.toString().padStart(2,`0`)}`,p+=`.${d.toString().padStart(2,`0`)}`,p+=`.${f}`,p.endsWith(Fh)&&(p=p.slice(0,-17)),p}if(t===`prores`)return c??`apch`;throw t!==null&&Fp(t),TypeError(`Unhandled codec '${t}'.`)},Hh=/^pcm-([usf])(\d+)(be)?$/,Uh=e=>{if(G(Eh.includes(e)),e===`ulaw`)return{dataType:`ulaw`,sampleSize:1,littleEndian:!0,silentValue:255};if(e===`alaw`)return{dataType:`alaw`,sampleSize:1,littleEndian:!0,silentValue:213};let t=Hh.exec(e);G(t);let n;n=t[1]===`u`?`unsigned`:t[1]===`s`?`signed`:`float`;let r=Number(t[2])/8,i=t[3]!==`be`;return{dataType:n,sampleSize:r,littleEndian:i,silentValue:e===`pcm-u8`?128:0}},Wh=e=>e.startsWith(`avc1`)||e.startsWith(`avc3`)?`avc`:e.startsWith(`hev1`)||e.startsWith(`hvc1`)?`hevc`:e===`vp8`?`vp8`:e.startsWith(`vp09`)?`vp9`:e.startsWith(`av01`)?`av1`:Ih.includes(e)?`prores`:e===`mp3`||e===`mp4a.69`||e===`mp4a.6B`||e===`mp4a.6b`||e===`mp4a.40.34`?`mp3`:e.startsWith(`mp4a.40.`)||e===`mp4a.67`?`aac`:e===`opus`||e===`Opus`?`opus`:e===`vorbis`?`vorbis`:e===`flac`?`flac`:e===`ac-3`||e===`ac3`?`ac3`:e===`ec-3`||e===`eac3`?`eac3`:Lh.includes(e)?`dts`:e===`ulaw`?`ulaw`:e===`alaw`?`alaw`:Hh.test(e)?e:e===`webvtt`?`webvtt`:null,Gh=e=>e===`avc`?{avc:{format:`avc`}}:e===`hevc`?{hevc:{format:`hevc`}}:{},Kh=[`avc1`,`avc3`,`hev1`,`hvc1`,`vp8`,`vp09`,`av01`,...Ih],qh=/^(avc1|avc3)\.[0-9a-fA-F]{6}$/,Jh=/^(hev1|hvc1)\.(?:[ABC]?\d+)\.[0-9a-fA-F]{1,8}\.[LH]\d+(?:\.[0-9a-fA-F]{1,2}){0,6}$/,Yh=/^vp09(?:\.\d{2}){3}(?:(?:\.\d{2}){5})?$/,Xh=/^av01\.\d\.\d{2}[MH]\.\d{2}(?:\.\d\.\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d)?$/,Zh=(e,t)=>{if(!e)throw TypeError(`Video chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Video chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Video chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Video chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Video chunk metadata decoder configuration must specify a codec string.`);if(!Kh.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Video chunk metadata decoder configuration codec string must be a valid video codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.codedWidth)||e.decoderConfig.codedWidth<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedWidth (positive integer).`);if(!Number.isInteger(e.decoderConfig.codedHeight)||e.decoderConfig.codedHeight<=0)throw TypeError(`Video chunk metadata decoder configuration must specify a valid codedHeight (positive integer).`);if(e.decoderConfig.displayAspectWidth!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectWidth)||e.decoderConfig.displayAspectWidth<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectWidth, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectHeight!==void 0&&(!Number.isInteger(e.decoderConfig.displayAspectHeight)||e.decoderConfig.displayAspectHeight<=0))throw TypeError(`Video chunk metadata decoder configuration displayAspectHeight, when defined, must be a positive integer.`);if(e.decoderConfig.displayAspectWidth!==void 0!=(e.decoderConfig.displayAspectHeight!==void 0))throw TypeError(`Video chunk metadata decoder configuration must specify both displayAspectWidth and displayAspectHeight, or neither.`);if(e.decoderConfig.description!==void 0&&!kp(e.decoderConfig.description))throw TypeError(`Video chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.colorSpace!==void 0){let{colorSpace:t}=e.decoderConfig;if(typeof t!=`object`)throw TypeError(`Video chunk metadata decoder configuration colorSpace, when provided, must be an object.`);let n=Object.keys(Tp);if(t.primaries!=null&&!n.includes(t.primaries))throw TypeError(`Video chunk metadata decoder configuration colorSpace primaries, when defined, must be one of ${n.join(`, `)}.`);let r=Object.keys(Ep);if(t.transfer!=null&&!r.includes(t.transfer))throw TypeError(`Video chunk metadata decoder configuration colorSpace transfer, when defined, must be one of ${r.join(`, `)}.`);let i=Object.keys(Dp);if(t.matrix!=null&&!i.includes(t.matrix))throw TypeError(`Video chunk metadata decoder configuration colorSpace matrix, when defined, must be one of ${i.join(`, `)}.`);if(t.fullRange!=null&&typeof t.fullRange!=`boolean`)throw TypeError(`Video chunk metadata decoder configuration colorSpace fullRange, when defined, must be a boolean.`)}if(e.decoderConfig.codec.startsWith(`avc1`)||e.decoderConfig.codec.startsWith(`avc3`)){if(!qh.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AVC must be a valid AVC codec string as specified in Section 3.4 of RFC 6381.`)}else if(e.decoderConfig.codec.startsWith(`hev1`)||e.decoderConfig.codec.startsWith(`hvc1`)){if(!Jh.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for HEVC must be a valid HEVC codec string as specified in Section E.3 of ISO 14496-15.`)}else if(e.decoderConfig.codec.startsWith(`vp8`)){if(e.decoderConfig.codec!==`vp8`)throw TypeError(`Video chunk metadata decoder configuration codec string for VP8 must be "vp8".`)}else if(e.decoderConfig.codec.startsWith(`vp09`)){if(!Yh.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for VP9 must be a valid VP9 codec string as specified in Section "Codecs Parameter String" of https://www.webmproject.org/vp9/mp4/.`)}else if(e.decoderConfig.codec.startsWith(`av01`)){if(!Xh.test(e.decoderConfig.codec))throw TypeError(`Video chunk metadata decoder configuration codec string for AV1 must be a valid AV1 codec string as specified in Section "Codecs Parameter String" of https://aomediacodec.github.io/av1-isobmff/.`)}else if(Ih.some(t=>e.decoderConfig.codec.startsWith(t))&&!Ih.some(t=>e.decoderConfig.codec===t))throw TypeError(`Video chunk metadata decoder configuration codec string for ProRes must be one of the valid ProRes four-character codes: ${Ih.join(`, `)}.`);if(t!==null&&Wh(e.decoderConfig.codec)!==t)throw TypeError(`Video chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},Qh=[`mp4a`,`mp3`,`opus`,`vorbis`,`flac`,`ulaw`,`alaw`,`pcm`,`ac-3`,`ec-3`,`dts`],$h=(e,t)=>{if(!e)throw TypeError(`Audio chunk metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Audio chunk metadata must be an object.`);if(!e.decoderConfig)throw TypeError(`Audio chunk metadata must include a decoder configuration.`);if(typeof e.decoderConfig!=`object`)throw TypeError(`Audio chunk metadata decoder configuration must be an object.`);if(typeof e.decoderConfig.codec!=`string`)throw TypeError(`Audio chunk metadata decoder configuration must specify a codec string.`);if(!Qh.some(t=>e.decoderConfig.codec.startsWith(t)))throw TypeError(`Audio chunk metadata decoder configuration codec string must be a valid audio codec string as specified in the Mediabunny Codec Registry.`);if(!Number.isInteger(e.decoderConfig.sampleRate)||e.decoderConfig.sampleRate<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid sampleRate (positive integer).`);if(!Number.isInteger(e.decoderConfig.numberOfChannels)||e.decoderConfig.numberOfChannels<=0)throw TypeError(`Audio chunk metadata decoder configuration must specify a valid numberOfChannels (positive integer).`);if(e.decoderConfig.description!==void 0&&!kp(e.decoderConfig.description))throw TypeError(`Audio chunk metadata decoder configuration description, when defined, must be an ArrayBuffer or an ArrayBuffer view.`);if(e.decoderConfig.codec.startsWith(`mp4a`)&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`){if(![`mp4a.40.2`,`mp4a.40.02`,`mp4a.40.5`,`mp4a.40.05`,`mp4a.40.29`,`mp4a.67`].includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for AAC must be a valid AAC codec string as specified in https://www.w3.org/TR/webcodecs-aac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`mp3`)||e.decoderConfig.codec.startsWith(`mp4a`)){if(e.decoderConfig.codec!==`mp3`&&e.decoderConfig.codec!==`mp4a.69`&&e.decoderConfig.codec!==`mp4a.6B`&&e.decoderConfig.codec!==`mp4a.6b`)throw TypeError(`Audio chunk metadata decoder configuration codec string for MP3 must be "mp3", "mp4a.69" or "mp4a.6B".`)}else if(e.decoderConfig.codec.startsWith(`opus`)){if(e.decoderConfig.codec!==`opus`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Opus must be "opus".`);if(e.decoderConfig.description&&e.decoderConfig.description.byteLength<18)throw TypeError(`Audio chunk metadata decoder configuration description, when specified, is expected to be an Identification Header as specified in Section 5.1 of RFC 7845.`)}else if(e.decoderConfig.codec.startsWith(`vorbis`)){if(e.decoderConfig.codec!==`vorbis`)throw TypeError(`Audio chunk metadata decoder configuration codec string for Vorbis must be "vorbis".`);if(!e.decoderConfig.description)throw TypeError(`Audio chunk metadata decoder configuration for Vorbis must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-vorbis-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`flac`)){if(e.decoderConfig.codec!==`flac`)throw TypeError(`Audio chunk metadata decoder configuration codec string for FLAC must be "flac".`);if(!e.decoderConfig.description||e.decoderConfig.description.byteLength<42)throw TypeError(`Audio chunk metadata decoder configuration for FLAC must include a description, which is expected to adhere to the format described in https://www.w3.org/TR/webcodecs-flac-codec-registration/.`)}else if(e.decoderConfig.codec.startsWith(`ac-3`)||e.decoderConfig.codec.startsWith(`ac3`)){if(e.decoderConfig.codec!==`ac-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for AC-3 must be "ac-3".`)}else if(e.decoderConfig.codec.startsWith(`ec-3`)||e.decoderConfig.codec.startsWith(`eac3`)){if(e.decoderConfig.codec!==`ec-3`)throw TypeError(`Audio chunk metadata decoder configuration codec string for EC-3 must be "ec-3".`)}else if(e.decoderConfig.codec.startsWith(`dts`)){if(!Lh.includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for DTS must be one of the following four-character codes: ${Lh.join(`, `)}.`)}else if((e.decoderConfig.codec.startsWith(`pcm`)||e.decoderConfig.codec.startsWith(`ulaw`)||e.decoderConfig.codec.startsWith(`alaw`))&&!Eh.includes(e.decoderConfig.codec))throw TypeError(`Audio chunk metadata decoder configuration codec string for PCM must be one of the supported PCM codecs (${Eh.join(`, `)}).`);if(t!==null&&Wh(e.decoderConfig.codec)!==t)throw TypeError(`Audio chunk metadata decoder configuration codec string '${e.decoderConfig.codec}' does not fit to the track codec '${t}'.`)},eg=e=>{if(!e)throw TypeError(`Subtitle metadata must be provided.`);if(typeof e!=`object`)throw TypeError(`Subtitle metadata must be an object.`);if(!e.config)throw TypeError(`Subtitle metadata must include a config object.`);if(typeof e.config!=`object`)throw TypeError(`Subtitle metadata config must be an object.`);if(typeof e.config.description!=`string`)throw TypeError(`Subtitle metadata config description must be a string.`)},tg=new Uint8Array,ng=class e{constructor(e,t,n,r,i=-1,a,o){if(this.data=e,this.type=t,this.timestamp=n,this.duration=r,this.sequenceNumber=i,e===tg&&a===void 0)throw Error(`Internal error: byteLength must be explicitly provided when constructing metadata-only packets.`);if(a===void 0&&(a=e.byteLength),!(e instanceof Uint8Array))throw TypeError(`data must be a Uint8Array.`);if(t!==`key`&&t!==`delta`)throw TypeError(`type must be either "key" or "delta".`);if(!Number.isFinite(n))throw TypeError(`timestamp must be a number.`);if(!Number.isFinite(r)||r<0)throw TypeError(`duration must be a non-negative number.`);if(!Number.isFinite(i))throw TypeError(`sequenceNumber must be a number.`);if(!Number.isInteger(a)||a<0)throw TypeError(`byteLength must be a non-negative integer.`);if(o!==void 0&&(typeof o!=`object`||!o))throw TypeError(`sideData, when provided, must be an object.`);if(o?.alpha!==void 0&&!(o.alpha instanceof Uint8Array))throw TypeError(`sideData.alpha, when provided, must be a Uint8Array.`);if(o?.alphaByteLength!==void 0&&(!Number.isInteger(o.alphaByteLength)||o.alphaByteLength<0))throw TypeError(`sideData.alphaByteLength, when provided, must be a non-negative integer.`);this.byteLength=a,this.sideData=o??{},this.sideData.alpha&&this.sideData.alphaByteLength===void 0&&(this.sideData.alphaByteLength=this.sideData.alpha.byteLength)}get isMetadataOnly(){return this.data===tg}get microsecondTimestamp(){return Math.trunc(Gp*this.timestamp)}get microsecondDuration(){return Math.trunc(Gp*this.duration)}toEncodedVideoChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`EncodedVideoChunk is not available in this environment.`);return new EncodedVideoChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}alphaToEncodedVideoChunk(e=this.type){if(!this.sideData.alpha)throw TypeError(`This packet does not contain alpha side data.`);if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to a video chunk.`);if(typeof EncodedVideoChunk>`u`)throw Error(`EncodedVideoChunk is not available in this environment.`);return new EncodedVideoChunk({data:this.sideData.alpha,type:e,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}toEncodedAudioChunk(){if(this.isMetadataOnly)throw TypeError(`Metadata-only packets cannot be converted to an audio chunk.`);if(typeof EncodedAudioChunk>`u`)throw Error(`EncodedAudioChunk is not available in this environment.`);return new EncodedAudioChunk({data:this.data,type:this.type,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration})}static fromEncodedChunk(t,n){if(!(t instanceof EncodedVideoChunk||t instanceof EncodedAudioChunk))throw TypeError(`chunk must be an EncodedVideoChunk or EncodedAudioChunk.`);let r=new Uint8Array(t.byteLength);return t.copyTo(r),new e(r,t.type,t.timestamp/1e6,(t.duration??0)/1e6,void 0,void 0,n)}clone(t){if(t!==void 0&&(typeof t!=`object`||!t))throw TypeError(`options, when provided, must be an object.`);if(t?.data!==void 0&&!(t.data instanceof Uint8Array))throw TypeError(`options.data, when provided, must be a Uint8Array.`);if(t?.type!==void 0&&t.type!==`key`&&t.type!==`delta`)throw TypeError(`options.type, when provided, must be either "key" or "delta".`);if(t?.timestamp!==void 0&&!Number.isFinite(t.timestamp))throw TypeError(`options.timestamp, when provided, must be a number.`);if(t?.duration!==void 0&&!Number.isFinite(t.duration))throw TypeError(`options.duration, when provided, must be a number.`);if(t?.sequenceNumber!==void 0&&!Number.isFinite(t.sequenceNumber))throw TypeError(`options.sequenceNumber, when provided, must be a number.`);if(t?.sideData!==void 0&&(typeof t.sideData!=`object`||t.sideData===null))throw TypeError(`options.sideData, when provided, must be an object.`);return new e(t?.data??this.data,t?.type??this.type,t?.timestamp??this.timestamp,t?.duration??this.duration,t?.sequenceNumber??this.sequenceNumber,this.byteLength,t?.sideData??this.sideData)}},rg=e=>{let t=(e.hasVideo?`video/`:e.hasAudio?`audio/`:`application/`)+(e.isQuickTime?`quicktime`:`mp4`);if(e.codecStrings.length>0){let n=[...new Set(e.codecStrings)];t+=`; codecs="${n.join(`, `)}"`}return t},ig=e=>{let t=e.filePos,n=new vm(Jg(e,9));if(n.readBits(12)!==4095||(n.skipBits(1),n.readBits(2)!==0))return null;let r=n.readBits(1),i=n.readBits(2)+1,a=n.readBits(4);if(a===15)return null;n.skipBits(1);let o=n.readBits(3);if(o===0)throw Error(`ADTS frames with channel configuration 0 are not supported.`);n.skipBits(1),n.skipBits(1),n.skipBits(1),n.skipBits(1);let s=n.readBits(13);n.skipBits(11);let c=n.readBits(2)+1;if(c!==1)throw Error(`ADTS frames with more than one AAC frame are not supported.`);let l=null;return r===1?e.filePos-=2:l=n.readBits(16),{objectType:i,samplingFrequencyIndex:a,channelConfiguration:o,frameLength:s,numberOfAacFrames:c,crcCheck:l,startPos:t}},ag=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},og=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r});rm();var sg=-1/0,cg=-1/0,lg=null;typeof FinalizationRegistry<`u`&&(lg=new FinalizationRegistry(e=>{let t=performance.now();e.type===`video`?(t-sg>=1e3&&(pm._error(`A VideoSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your VideoSamples as soon as you're done using them.`),sg=t),typeof VideoFrame<`u`&&e.data instanceof VideoFrame&&e.data.close()):(t-cg>=1e3&&(pm._error(`An AudioSample was garbage collected without first being closed. For proper resource management, make sure to call close() on all your AudioSamples as soon as you're done using them.`),cg=t),typeof AudioData<`u`&&e.data instanceof AudioData&&e.data.close())}));var ug=class{constructor(){this._referenceCount=0,this._lastAllocationBuffer=null}},dg=[`I420`,`I420P10`,`I420P12`,`I420A`,`I420AP10`,`I420AP12`,`I422`,`I422P10`,`I422P12`,`I422A`,`I422AP10`,`I422AP12`,`I444`,`I444P10`,`I444P12`,`I444A`,`I444AP10`,`I444AP12`,`NV12`,`RGBA`,`RGBX`,`BGRA`,`BGRX`],fg=new Set(dg),pg=class e{get codedWidth(){return this.visibleRect.width}get codedHeight(){return this.visibleRect.height}get displayWidth(){return this.rotation%180==0?this.squarePixelWidth:this.squarePixelHeight}get displayHeight(){return this.rotation%180==0?this.squarePixelHeight:this.squarePixelWidth}get microsecondTimestamp(){return Math.trunc(Gp*this.timestamp)}get microsecondDuration(){return Math.trunc(Gp*this.duration)}get hasAlpha(){return this.format&&this.format.includes(`A`)}constructor(t,n){if(this._closed=!1,t instanceof ArrayBuffer||typeof SharedArrayBuffer<`u`&&t instanceof SharedArrayBuffer||ArrayBuffer.isView(t)){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.format===void 0||!fg.has(n.format))throw TypeError(`init.format must be one of: `+dg.join(`, `));if(!Number.isInteger(n.codedWidth)||n.codedWidth<=0)throw TypeError(`init.codedWidth must be a positive integer.`);if(!Number.isInteger(n.codedHeight)||n.codedHeight<=0)throw TypeError(`init.codedHeight must be a positive integer.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n.flip!==void 0&&typeof n.flip!=`boolean`)throw TypeError(`init.flip, when provided, must be a boolean.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.layout!==void 0){if(!Array.isArray(n.layout))throw TypeError(`init.layout, when provided, must be an array.`);for(let e of n.layout){if(!e||typeof e!=`object`||Array.isArray(e))throw TypeError(`Each entry in init.layout must be an object.`);if(!Number.isInteger(e.offset)||e.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(e.stride)||e.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(n.visibleRect!==void 0&&sm(n.visibleRect,`init.visibleRect`),n.displayWidth!==void 0&&(!Number.isInteger(n.displayWidth)||n.displayWidth<=0))throw TypeError(`init.displayWidth, when provided, must be a positive integer.`);if(n.displayHeight!==void 0&&(!Number.isInteger(n.displayHeight)||n.displayHeight<=0))throw TypeError(`init.displayHeight, when provided, must be a positive integer.`);if(n.displayWidth!==void 0!=(n.displayHeight!==void 0))throw TypeError(`init.displayWidth and init.displayHeight must be either both provided or both omitted.`);this.format=n.format,this.rotation=n.rotation??0,this.flip=n.flip??!1,this.timestamp=n.timestamp,this.duration=n.duration??0;let e=n.layout??wg(n.format,n.codedWidth,n.codedHeight),r=n.colorSpace??null;r===null&&(r=this.format===`RGBA`||this.format===`RGBX`||this.format===`BGRA`||this.format===`BGRX`?{primaries:`bt709`,transfer:`iec61966-2-1`,matrix:`rgb`,fullRange:!0}:{primaries:`bt709`,transfer:`bt709`,matrix:`bt709`,fullRange:!1}),this.visibleRect={left:n.visibleRect?.left??0,top:n.visibleRect?.top??0,width:n.visibleRect?.width??n.codedWidth,height:n.visibleRect?.height??n.codedHeight},n.displayWidth===void 0?(this.squarePixelWidth=this.visibleRect.width,this.squarePixelHeight=this.visibleRect.height):(this.squarePixelWidth=this.rotation%180==0?n.displayWidth:n.displayHeight,this.squarePixelHeight=this.rotation%180==0?n.displayHeight:n.displayWidth),this._data=n._doNotCopy?xp(t):xp(t).slice(),this._layout=e,this.colorSpace=new yg(r)}else if(typeof VideoFrame<`u`&&t instanceof VideoFrame){if(n?.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n?.flip!==void 0&&typeof n.flip!=`boolean`)throw TypeError(`init.flip, when provided, must be a boolean.`);if(n?.timestamp!==void 0&&!Number.isFinite(n?.timestamp))throw TypeError(`init.timestamp, when provided, must be a number.`);if(n?.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);n?.visibleRect!==void 0&&sm(n.visibleRect,`init.visibleRect`),this._data=t,this._layout=null,this.format=t.format,this.visibleRect={left:t.visibleRect?.x??0,top:t.visibleRect?.y??0,width:t.visibleRect?.width??t.codedWidth,height:t.visibleRect?.height??t.codedHeight},this.rotation=n?.rotation??0,this.flip=n?.flip??!1,this.squarePixelWidth=t.displayWidth,this.squarePixelHeight=t.displayHeight,this.timestamp=n?.timestamp??t.timestamp/1e6,this.duration=n?.duration??(t.duration??0)/1e6,this.colorSpace=new yg(t.colorSpace)}else if(typeof HTMLImageElement<`u`&&t instanceof HTMLImageElement||typeof SVGImageElement<`u`&&t instanceof SVGImageElement||typeof ImageBitmap<`u`&&t instanceof ImageBitmap||typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement||typeof HTMLCanvasElement<`u`&&t instanceof HTMLCanvasElement||typeof OffscreenCanvas<`u`&&t instanceof OffscreenCanvas){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n.flip!==void 0&&typeof n.flip!=`boolean`)throw TypeError(`init.flip, when provided, must be a boolean.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(n.visibleRect!==void 0&&sm(n.visibleRect,`init.visibleRect`),typeof VideoFrame<`u`)return new e(new VideoFrame(t,{timestamp:Math.trunc(n.timestamp*Gp),duration:Math.trunc((n.duration??0)*Gp)||void 0,visibleRect:n.visibleRect&&{x:n.visibleRect.left,y:n.visibleRect.top,width:n.visibleRect.width,height:n.visibleRect.height}}),n);let r=0,i=0;if(`naturalWidth`in t?(r=t.naturalWidth,i=t.naturalHeight):`videoWidth`in t?(r=t.videoWidth,i=t.videoHeight):`width`in t&&(r=Number(t.width),i=Number(t.height)),!r||!i)throw TypeError(`Could not determine dimensions.`);let a=n.visibleRect??{left:0,top:0,width:r,height:i},o=new OffscreenCanvas(a.width,a.height),s=o.getContext(`2d`,{alpha:Yp(),willReadFrequently:!0});if(!s)throw Error(`OffscreenCanvas must have support for the '2d' context in order to create a VideoSample from this data.`);s.drawImage(t,-a.left,-a.top),this._data=o,this._layout=null,this.format=`RGBX`,this.visibleRect={left:0,top:0,width:a.width,height:a.height},this.squarePixelWidth=a.width,this.squarePixelHeight=a.height,this.rotation=n.rotation??0,this.flip=n.flip??!1,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=new yg({matrix:`rgb`,primaries:`bt709`,transfer:`iec61966-2-1`,fullRange:!0})}else if(t instanceof ug){if(!n||typeof n!=`object`)throw TypeError(`init must be an object.`);if(n.rotation!==void 0&&![0,90,180,270].includes(n.rotation))throw TypeError(`init.rotation, when provided, must be 0, 90, 180, or 270.`);if(n.flip!==void 0&&typeof n.flip!=`boolean`)throw TypeError(`init.flip, when provided, must be a boolean.`);if(!Number.isFinite(n.timestamp))throw TypeError(`init.timestamp must be a number.`);if(n.duration!==void 0&&(!Number.isFinite(n.duration)||n.duration<0))throw TypeError(`init.duration, when provided, must be a non-negative number.`);if(this._data=t,t._referenceCount++,this.format=t.getFormat(),this.format!==null&&!dg.includes(this.format))throw TypeError(`getFormat() must return a VideoSamplePixelFormat or null.`);if(this.visibleRect={left:0,top:0,width:t.getCodedWidth(),height:t.getCodedHeight()},!Number.isInteger(this.visibleRect.width)||this.visibleRect.width<=0)throw TypeError(`getCodedWidth() must return a positive integer.`);if(!Number.isInteger(this.visibleRect.height)||this.visibleRect.height<=0)throw TypeError(`getCodedHeight() must return a positive integer.`);if(this.squarePixelWidth=t.getSquarePixelWidth(),!Number.isInteger(this.squarePixelWidth)||this.squarePixelWidth<=0)throw TypeError(`getSquarePixelWidth() must return a positive integer.`);if(this.squarePixelHeight=t.getSquarePixelHeight(),!Number.isInteger(this.squarePixelHeight)||this.squarePixelHeight<=0)throw TypeError(`getSquarePixelHeight() must return a positive integer.`);this.rotation=n.rotation??0,this.flip=n.flip??!1,this.timestamp=n.timestamp,this.duration=n.duration??0,this.colorSpace=t.getColorSpace()}else throw TypeError(`Invalid data type: Must be a BufferSource, CanvasImageSource, or VideoSampleResource.`);this.encodeOptions=n?.encodeOptions??{},this.pixelAspectRatio=om({num:this.squarePixelWidth*this.codedHeight,den:this.squarePixelHeight*this.codedWidth}),lg?.register(this,{type:`video`,data:this._data},this)}clone(){if(this._closed)throw Error(`VideoSample is closed.`);return G(this._data!==null),this._data instanceof ug?new e(this._data,{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip,encodeOptions:this.encodeOptions}):bg(this._data)?new e(this._data.clone(),{timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip,encodeOptions:this.encodeOptions}):this._data instanceof Uint8Array?(G(this._layout),new e(this._data,{format:this.format,layout:this._layout,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,flip:this.flip,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions,_doNotCopy:!0})):new e(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.timestamp,duration:this.duration,colorSpace:this.colorSpace,rotation:this.rotation,flip:this.flip,visibleRect:this.visibleRect,displayWidth:this.displayWidth,displayHeight:this.displayHeight,encodeOptions:this.encodeOptions})}close(){this._closed||=(lg?.unregister(this),this._data instanceof ug?(this._data._referenceCount--,this._data._referenceCount===0&&this._data.close()):bg(this._data)?this._data.close():this._data=null,!0)}allocationSize(e={}){if(Cg(e),this._closed)throw Error(`VideoSample is closed.`);if((e.format??this.format)==null)throw Error(`Cannot get allocation size when format is null.`);return bg(this._data)?this._data.allocationSize(e):Eg(this,e).allocationSize}async copyTo(t,n={}){if(!kp(t))throw TypeError(`destination must be an ArrayBuffer or an ArrayBuffer view.`);if(Cg(n),this._closed)throw Error(`VideoSample is closed.`);if((n.format??this.format)==null)throw Error(`Cannot copy video sample data when format is null.`);if(G(this._data!==null),bg(this._data))return this._data.copyTo(t,n);if(n.format&&![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(this.format)&&[`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(n.format)){if(this._data instanceof ug){let r={stack:[],error:void 0,hasError:!1};try{let i=ag(r,await this._data.toRgbSample({timestamp:this.timestamp,duration:this.duration,rotation:this.rotation,flip:this.flip},n.colorSpace??`srgb`),!1);if(!(i instanceof e))throw TypeError(`toRgbSample() must return a VideoSample.`);if(![`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(i.format))throw Error(`Sample returned by toRgbSample was expected to have an RGB format, got '${i.format}' instead.`);return await i.copyTo(t,n)}catch(e){r.error=e,r.hasError=!0}finally{og(r)}}else{if(typeof VideoFrame>`u`)throw Error(`For this sample, converting from a non-RGB to an RGB format requires VideoFrame to be defined.`);let e=this.toVideoFrame(),r=await e.copyTo(t,n);return e.close(),r}}let r=Eg(this,n);G(this.format);let i=xp(t);if(i.byteLength<r.allocationSize)throw TypeError(`Destination buffer too small. Required: ${r.allocationSize}, Available: ${i.byteLength}`);let a=Tg(this.format),o;if(this._data instanceof ug){let e=this._data.getDataPlanes();if(tm(e)&&(e=await e),!Array.isArray(e)||e.some(e=>!(e.data instanceof Uint8Array)||!Number.isInteger(e.stride)||e.stride<0))throw TypeError(`getDataPlanes() must return an array of objects with a Uint8Array "data" property and a non-negative integer "stride" property.`);o=e}else if(this._data instanceof Uint8Array)G(this._layout),G(this._layout.length===a.length),o=this._layout.map((e,t)=>{let n=Math.ceil(this.codedHeight/a[t].heightDivisor);return{data:this._data.subarray(e.offset,e.offset+e.stride*n),stride:e.stride}});else{let e=this._data.getContext(`2d`);G(e),o=[{data:xp(e.getImageData(0,0,this.codedWidth,this.codedHeight).data),stride:4*this.codedWidth}]}let s=[],c=a.length;for(let e=0;e<c;e++){let t=r.computedLayouts[e],n=o[e].stride,a=o[e].data,c=t.sourceTop*n;c+=t.sourceLeftBytes;let l=t.destinationOffset,u=t.sourceWidthBytes,d={offset:l,stride:t.destinationStride};for(let e=0;e<t.sourceHeight;e++){if(c+u>a.byteLength)throw Error(`Source buffer OOB read.`);if(l+u>i.byteLength)throw Error(`Destination buffer OOB write.`);let e=a.subarray(c,c+u);i.set(e,l),c+=n,l+=t.destinationStride}s.push(d)}if(n.format!==void 0){let e=this.format.startsWith(`RGB`)!==n.format.startsWith(`RGB`),t=this.format.includes(`X`)&&n.format.includes(`A`);if(e||t)for(let n=0;n<r.allocationSize;n+=4){if(e){let e=i[n],t=i[n+2];i[n]=t,i[n+2]=e}t&&(i[n+3]=255)}}return s}toVideoFrame(){if(this._closed)throw Error(`VideoSample is closed.`);if(G(this._data!==null),this._data instanceof ug){if(this.format===null)throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if format is null.`);let e=this._data.getDataPlanes();if(tm(e))throw Error(`Cannot convert a VideoSampleResource-backed VideoSample to VideoFrame if getDataPlanes() returns a promise.`);let t=e.reduce((e,t)=>e+t.data.byteLength,0),n=new Uint8Array(t),r=0,i=[];for(let t of e)n.set(t.data,r),i.push(r),r+=t.data.byteLength;return new VideoFrame(n,{format:this.format,layout:e.map((e,t)=>({offset:i[t],stride:e.stride})),codedWidth:this.codedWidth,codedHeight:this.codedHeight,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})}return bg(this._data)?new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0}):this._data instanceof Uint8Array?(G(this._layout),new VideoFrame(this._data,{format:this.format,codedWidth:this.codedWidth,codedHeight:this.codedHeight,layout:this._layout,timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0,colorSpace:this.colorSpace,visibleRect:this.visibleRect,displayWidth:this.squarePixelWidth,displayHeight:this.squarePixelHeight})):new VideoFrame(this._data,{timestamp:this.microsecondTimestamp,duration:this.microsecondDuration||void 0})}draw(e,t,n,r,i,a,o,s,c){let l=0,u=0,d=this.displayWidth,f=this.displayHeight,p=0,m=0,h=this.displayWidth,g=this.displayHeight;if(a===void 0?(p=t,m=n,r!==void 0&&(h=r,g=i)):(l=t,u=n,d=r,f=i,p=a,m=o,s===void 0?(h=d,g=f):(h=s,g=c)),!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!Number.isFinite(l))throw TypeError(`sx must be a number.`);if(!Number.isFinite(u))throw TypeError(`sy must be a number.`);if(!Number.isFinite(d)||d<0)throw TypeError(`sWidth must be a non-negative number.`);if(!Number.isFinite(f)||f<0)throw TypeError(`sHeight must be a non-negative number.`);if(!Number.isFinite(p))throw TypeError(`dx must be a number.`);if(!Number.isFinite(m))throw TypeError(`dy must be a number.`);if(!Number.isFinite(h)||h<0)throw TypeError(`dWidth must be a non-negative number.`);if(!Number.isFinite(g)||g<0)throw TypeError(`dHeight must be a non-negative number.`);if(this._closed)throw Error(`VideoSample is closed.`);({sx:l,sy:u,sWidth:d,sHeight:f}=this._unmapSourceRegion(l,u,d,f,this.rotation,this.flip));let _=this.toCanvasImageSource();e.save();let v=p+h/2,y=m+g/2;e.translate(v,y),this.flip&&e.scale(-1,1),e.rotate(this.rotation*Math.PI/180);let b=this.rotation%180==0?1:h/g;e.scale(1/b,b),e.drawImage(_,l,u,d,f,-h/2,-g/2,h,g),e.restore()}drawWithFit(e,t){if(!(typeof CanvasRenderingContext2D<`u`&&e instanceof CanvasRenderingContext2D||typeof OffscreenCanvasRenderingContext2D<`u`&&e instanceof OffscreenCanvasRenderingContext2D))throw TypeError(`context must be a CanvasRenderingContext2D or OffscreenCanvasRenderingContext2D.`);if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit must be 'fill', 'contain', or 'cover'.`);if(t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`options.rotation, when provided, must be 0, 90, 180, or 270.`);if(t.flip!==void 0&&typeof t.flip!=`boolean`)throw TypeError(`options.flip, when provided, must be a boolean.`);t.crop!==void 0&&Sg(t.crop,`options.`);let n=e.canvas.width,r=e.canvas.height,i=t.rotation??this.rotation,a=t.flip??this.flip,[o,s]=i%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],c=t.crop;c&&=xg(c,o,s);let l,u,d,f,{sx:p,sy:m,sWidth:h,sHeight:g}=this._unmapSourceRegion(t.crop?.left??0,t.crop?.top??0,t.crop?.width??o,t.crop?.height??s,i,a);if(t.fit===`fill`)l=0,u=0,d=n,f=r;else{let[e,i]=t.crop?[t.crop.width,t.crop.height]:[o,s],a=t.fit===`contain`?Math.min(n/e,r/i):Math.max(n/e,r/i);d=e*a,f=i*a,l=(n-d)/2,u=(r-f)/2}e.save();let _=i%180==0?1:d/f;e.translate(n/2,r/2),a&&e.scale(-1,1),e.rotate(i*Math.PI/180),e.scale(1/_,_),e.translate(-n/2,-r/2),e.drawImage(this.toCanvasImageSource(),p,m,h,g,l,u,d,f),e.restore()}_unmapSourceRegion(e,t,n,r,i,a){return a&&(e=(i%180==0?this.squarePixelWidth:this.squarePixelHeight)-e-n),i===90?[e,t,n,r]=[t,this.squarePixelHeight-e-n,r,n]:i===180?[e,t]=[this.squarePixelWidth-e-n,this.squarePixelHeight-t-r]:i===270&&([e,t,n,r]=[this.squarePixelWidth-t-r,e,r,n]),{sx:e,sy:t,sWidth:n,sHeight:r}}_drawWithFitAndMipmapping(e,t,n){let r=e.width,i=e.height,[a,o]=n.rotation%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],s=n.crop?n.crop.width:a,c=n.crop?n.crop.height:o,l=0;2*r<s&&2*i<c&&(l=Math.floor(Math.log2(Math.min(s/r,c/i))));let u=r*2**l,d=i*2**l,{canvas:f,context:p,isNew:m}=l>0?vg(u,d):{canvas:e,context:t,isNew:n.targetIsFresh};p.imageSmoothingQuality=`high`,n.fillBlack?(p.fillStyle=`black`,p.fillRect(0,0,u,d)):m||p.clearRect(0,0,u,d),this.drawWithFit(p,{fit:n.fit,rotation:n.rotation,flip:n.flip,crop:n.crop}),p.globalCompositeOperation=`copy`;for(let e=l;e>1;e--){let t=r*2**e,n=i*2**e;p.drawImage(f,0,0,t,n,0,0,t/2,n/2)}p.globalCompositeOperation=`source-over`,l>0&&(t.imageSmoothingQuality=`high`,t.globalCompositeOperation=`copy`,t.drawImage(f,0,0,2*r,2*i,0,0,r,i),t.globalCompositeOperation=`source-over`)}toCanvasImageSource(){if(this._closed)throw Error(`VideoSample is closed.`);if(G(this._data!==null),this._data instanceof ug||this._data instanceof Uint8Array){let e=this.toVideoFrame();return queueMicrotask(()=>e.close()),e}return this._data}async transform(t){if(!t||typeof t!=`object`)throw TypeError(`options must be an object.`);if(t.width!==void 0&&(!Number.isInteger(t.width)||t.width<=0))throw TypeError(`options.width, when provided, must be a positive integer.`);if(t.height!==void 0&&(!Number.isInteger(t.height)||t.height<=0))throw TypeError(`options.height, when provided, must be a positive integer.`);if(t.roundDimensionsTo!==void 0&&(!Number.isInteger(t.roundDimensionsTo)||t.roundDimensionsTo<=0))throw TypeError(`options.roundDimensionsTo, when provided, must be a positive integer.`);if(t.fit!==void 0&&![`fill`,`contain`,`cover`].includes(t.fit))throw TypeError(`options.fit, when provided, must be one of "fill", "contain", or "cover".`);if(t.width!==void 0&&t.height!==void 0&&t.fit===void 0)throw TypeError(`When both options.width and options.height are provided, options.fit must also be provided.`);if(t.rotate!==void 0&&![0,90,180,270].includes(t.rotate))throw TypeError(`options.rotate, when provided, must be 0, 90, 180 or 270.`);if(t.flip!==void 0&&typeof t.flip!=`boolean`)throw TypeError(`options.flip, when provided, must be a boolean.`);if(t.crop!==void 0&&Sg(t.crop,`options.`),t.alpha!==void 0&&![`keep`,`discard`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'keep' or 'discard'.`);let{rotation:n,flip:r}=gp(this.rotation,this.flip,t.rotate??0,t.flip??!1),[i,a]=n%180==0?[this.squarePixelWidth,this.squarePixelHeight]:[this.squarePixelHeight,this.squarePixelWidth],o=t.crop;o&&=xg(o,i,a);let s=o?o.width:i,c=o?o.height:a,l=s/c,u,d;t.width!==void 0&&t.height===void 0?(u=t.width,d=u/l):t.width===void 0&&t.height!==void 0?(d=t.height,u=d*l):t.width!==void 0&&t.height!==void 0?(u=t.width,d=t.height):(u=s,d=c),u=Bp(u,t.roundDimensionsTo??1),d=Bp(d,t.roundDimensionsTo??1);let f={width:u,height:d,fit:t.fit??`fill`,rotation:n,flip:r,crop:o??{left:0,top:0,width:i,height:a},alpha:t.alpha??`keep`};for(let e of mg){let t=e(this,f);if(tm(t)&&(t=await t),t!==null)return t}let{canvas:p,context:m,isNew:h}=vg(f.width,f.height);return this._drawWithFitAndMipmapping(p,m,{fit:f.fit,rotation:f.rotation,flip:f.flip,crop:f.crop,targetIsFresh:h,fillBlack:f.alpha===`discard`}),new e(p,{timestamp:this.timestamp,duration:this.duration,rotation:0,flip:!1})}setRotation(e){if(![0,90,180,270].includes(e))throw TypeError(`newRotation must be 0, 90, 180, or 270.`);this.rotation=e}setFlip(e){if(typeof e!=`boolean`)throw TypeError(`newFlip must be a boolean.`);this.flip=e}setTimestamp(e){if(!Number.isFinite(e))throw TypeError(`newTimestamp must be a number.`);this.timestamp=e}setDuration(e){if(!Number.isFinite(e)||e<0)throw TypeError(`newDuration must be a non-negative number.`);this.duration=e}setEncodeOptions(e){if(!e||typeof e!=`object`)throw TypeError(`newEncodeOptions must be an object.`);this.encodeOptions=e}[Symbol.dispose](){this.close()}},mg=[],hg=3,gg=[],_g=0,vg=(e,t)=>{for(let n of gg)if(n.canvas.width===e&&n.canvas.height===t)return n.age=_g++,{canvas:n.canvas,context:n.context,isNew:!1};let n;if(typeof OffscreenCanvas<`u`)n=new OffscreenCanvas(e,t);else{if(typeof window>`u`||typeof document>`u`)throw Error(`Cannot transform VideoSamples in this environment. Either run in an environment with OffscreenCanvas or HTMLCanvasElement, or supply a custom VideoSample transformer using registerVideoSampleTransformer().`);n=document.createElement(`canvas`),n.width=e,n.height=t}let r=n.getContext(`2d`,{alpha:!0,willReadFrequently:!1});if(!r)throw Error(`The '2d' canvas context is required to transform VideoSamples. Register a custom transformer using registerVideoSampleTransformer to work around this limitation.`);return gg.length>=hg&&gg.splice(am(gg,e=>e.age),1),gg.push({canvas:n,context:r,age:_g++}),{canvas:n,context:r,isNew:!0}},yg=class{constructor(e){if(e!==void 0){if(!e||typeof e!=`object`)throw TypeError(`init.colorSpace, when provided, must be an object.`);let t=Object.keys(Tp);if(e.primaries!=null&&!t.includes(e.primaries))throw TypeError(`init.colorSpace.primaries, when provided, must be one of ${t.join(`, `)}.`);let n=Object.keys(Ep);if(e.transfer!=null&&!n.includes(e.transfer))throw TypeError(`init.colorSpace.transfer, when provided, must be one of ${n.join(`, `)}.`);let r=Object.keys(Dp);if(e.matrix!=null&&!r.includes(e.matrix))throw TypeError(`init.colorSpace.matrix, when provided, must be one of ${r.join(`, `)}.`);if(e.fullRange!=null&&typeof e.fullRange!=`boolean`)throw TypeError(`init.colorSpace.fullRange, when provided, must be a boolean.`)}this.primaries=e?.primaries??null,this.transfer=e?.transfer??null,this.matrix=e?.matrix??null,this.fullRange=e?.fullRange??null}toJSON(){return{primaries:this.primaries,transfer:this.transfer,matrix:this.matrix,fullRange:this.fullRange}}},bg=e=>typeof VideoFrame<`u`&&e instanceof VideoFrame,xg=(e,t,n)=>{let r=Math.min(e.left,t),i=Math.min(e.top,n),a=Math.min(e.width,t-r),o=Math.min(e.height,n-i);return G(a>=0),G(o>=0),{left:r,top:i,width:a,height:o}},Sg=(e,t)=>{if(!e||typeof e!=`object`)throw TypeError(t+`crop, when provided, must be an object.`);if(!Number.isInteger(e.left)||e.left<0)throw TypeError(t+`crop.left must be a non-negative integer.`);if(!Number.isInteger(e.top)||e.top<0)throw TypeError(t+`crop.top must be a non-negative integer.`);if(!Number.isInteger(e.width)||e.width<0)throw TypeError(t+`crop.width must be a non-negative integer.`);if(!Number.isInteger(e.height)||e.height<0)throw TypeError(t+`crop.height must be a non-negative integer.`)},Cg=e=>{if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.colorSpace!==void 0&&![`display-p3`,`srgb`].includes(e.colorSpace))throw TypeError(`options.colorSpace, when provided, must be 'display-p3' or 'srgb'.`);if(e.format!==void 0&&typeof e.format!=`string`)throw TypeError(`options.format, when provided, must be a string.`);if(e.layout!==void 0){if(!Array.isArray(e.layout))throw TypeError(`options.layout, when provided, must be an array.`);for(let t of e.layout){if(!t||typeof t!=`object`)throw TypeError(`Each entry in options.layout must be an object.`);if(!Number.isInteger(t.offset)||t.offset<0)throw TypeError(`plane.offset must be a non-negative integer.`);if(!Number.isInteger(t.stride)||t.stride<0)throw TypeError(`plane.stride must be a non-negative integer.`)}}if(e.rect!==void 0){if(!e.rect||typeof e.rect!=`object`)throw TypeError(`options.rect, when provided, must be an object.`);if(e.rect.x!==void 0&&(!Number.isInteger(e.rect.x)||e.rect.x<0))throw TypeError(`options.rect.x, when provided, must be a non-negative integer.`);if(e.rect.y!==void 0&&(!Number.isInteger(e.rect.y)||e.rect.y<0))throw TypeError(`options.rect.y, when provided, must be a non-negative integer.`);if(e.rect.width!==void 0&&(!Number.isInteger(e.rect.width)||e.rect.width<0))throw TypeError(`options.rect.width, when provided, must be a non-negative integer.`);if(e.rect.height!==void 0&&(!Number.isInteger(e.rect.height)||e.rect.height<0))throw TypeError(`options.rect.height, when provided, must be a non-negative integer.`)}},wg=(e,t,n)=>{let r=Tg(e),i=[],a=0;for(let e of r){let r=Math.ceil(t/e.widthDivisor),o=Math.ceil(n/e.heightDivisor),s=r*e.sampleBytes,c=s*o;i.push({offset:a,stride:s}),a+=c}return i},Tg=e=>{let t=(e,t,n,r,i)=>{let a=[{sampleBytes:e,widthDivisor:1,heightDivisor:1},{sampleBytes:t,widthDivisor:n,heightDivisor:r},{sampleBytes:t,widthDivisor:n,heightDivisor:r}];return i&&a.push({sampleBytes:e,widthDivisor:1,heightDivisor:1}),a};switch(e){case`I420`:return t(1,1,2,2,!1);case`I420P10`:case`I420P12`:return t(2,2,2,2,!1);case`I420A`:return t(1,1,2,2,!0);case`I420AP10`:case`I420AP12`:return t(2,2,2,2,!0);case`I422`:return t(1,1,2,1,!1);case`I422P10`:case`I422P12`:return t(2,2,2,1,!1);case`I422A`:return t(1,1,2,1,!0);case`I422AP10`:case`I422AP12`:return t(2,2,2,1,!0);case`I444`:return t(1,1,1,1,!1);case`I444P10`:case`I444P12`:return t(2,2,1,1,!1);case`I444A`:return t(1,1,1,1,!0);case`I444AP10`:case`I444AP12`:return t(2,2,1,1,!0);case`NV12`:return[{sampleBytes:1,widthDivisor:1,heightDivisor:1},{sampleBytes:2,widthDivisor:2,heightDivisor:2}];case`RGBA`:case`RGBX`:case`BGRA`:case`BGRX`:return[{sampleBytes:4,widthDivisor:1,heightDivisor:1}];default:Fp(e),G(!1)}},Eg=(e,t)=>{let n={left:0,top:0,width:e.codedWidth,height:e.codedHeight},r=t.rect,i=Dg(n,r,e.codedWidth,e.codedHeight,e.format),a=t.layout,o;if(!t.format||t.format===e.format)o=e.format;else if([`RGBA`,`RGBX`,`BGRA`,`BGRX`].includes(t.format))o=t.format;else throw Error(`NotSupportedError: Invalid destination format.`);return kg(i,o,a)},Dg=(e,t,n,r,i)=>{let a={...e};if(t!==void 0){if(t.width===0||t.height===0)throw TypeError(`visibleRect dimensions cannot be zero.`);if((t.x||0)+(t.width||0)>n)throw TypeError(`visibleRect exceeds codedWidth.`);if((t.y||0)+(t.height||0)>r)throw TypeError(`visibleRect exceeds codedHeight.`);a.x=t.x||0,a.y=t.y||0,a.width=t.width||0,a.height=t.height||0}if(!Og(i,a))throw TypeError(`visibleRect alignment is invalid for the format.`);return a},Og=(e,t)=>{if(e===null)return!0;let n=Tg(e);for(let e=0;e<n.length;e++){let r=n[e],i=r.widthDivisor,a=r.heightDivisor;if((t.x||0)%i!==0||(t.y||0)%a!==0)return!1}return!0},kg=(e,t,n)=>{let r=Tg(t),i=r.length;if(n!==void 0&&n.length!==i)throw TypeError(`Layout must have ${i} planes.`);let a=0,o=[],s=[];for(let t=0;t<i;t++){let i=r[t],c=i.sampleBytes,l=i.widthDivisor,u=i.heightDivisor,d={destinationOffset:0,destinationStride:0,sourceTop:0,sourceHeight:0,sourceLeftBytes:0,sourceWidthBytes:0};if(d.sourceTop=Math.ceil(Math.trunc(e.y||0)/u),d.sourceHeight=Math.ceil(Math.trunc(e.height||0)/u),d.sourceLeftBytes=Math.floor(Math.trunc(e.x||0)/l)*c,d.sourceWidthBytes=Math.floor(Math.trunc(e.width||0)/l)*c,n!==void 0){let e=n[t];if(e.stride<d.sourceWidthBytes)throw TypeError(`Stride for plane ${t} is too small.`);d.destinationOffset=e.offset,d.destinationStride=e.stride}else d.destinationOffset=a,d.destinationStride=d.sourceWidthBytes;let f=d.destinationStride*d.sourceHeight+d.destinationOffset;if(f>4294967295)throw TypeError(`Allocation size exceeds limit.`);s.push(f),a=Math.max(a,f);for(let e=0;e<t;e++){let n=o[e];if(!(s[t]<=n.destinationOffset||s[e]<=d.destinationOffset))throw TypeError(`Planes overlap.`)}o.push(d)}return{allocationSize:a,computedLayouts:o}},Ag=e=>{if(!e||typeof e!=`object`)throw TypeError(`Encoding config must be an object.`);if(!Th.includes(e.codec))throw TypeError(`Invalid video codec '${e.codec}'. Must be one of: ${Th.join(`, `)}.`);let t=e.bitrate;if(e.quality===void 0&&t===void 0)throw TypeError(`config.quality must be provided.`);if(e.quality!==void 0&&t!==void 0)throw TypeError(`config.quality and config.bitrate cannot both be provided.`);if(e.quality!==void 0&&!(e.quality instanceof Ng))throw TypeError(`config.quality, when provided, must be a Quality.`);if(t!==void 0&&!(t instanceof Ng)&&(!Number.isInteger(t)||t<=0))throw TypeError(`config.bitrate, when provided, must be a positive integer or a quality.`);if(e.keyFrameInterval!==void 0&&(!Number.isFinite(e.keyFrameInterval)||e.keyFrameInterval<0))throw TypeError(`config.keyFrameInterval, when provided, must be a non-negative number.`);if(e.sizeChangeBehavior!==void 0&&![`deny`,`passThrough`,`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`config.sizeChangeBehavior, when provided, must be 'deny', 'passThrough', 'fill', 'contain' or 'cover'.`);if(e.transform!==void 0){if(typeof e.transform!=`object`||!e.transform)throw TypeError(`config.transform, when provided, must be an object.`);if(e.transform.width!==void 0&&(!Number.isInteger(e.transform.width)||e.transform.width<=0))throw TypeError(`config.transform.width, when provided, must be a positive integer.`);if(e.transform.height!==void 0&&(!Number.isInteger(e.transform.height)||e.transform.height<=0))throw TypeError(`config.transform.height, when provided, must be a positive integer.`);if(e.transform.fit!==void 0&&![`fill`,`contain`,`cover`].includes(e.transform.fit))throw TypeError(`config.transform.fit, when provided, must be one of "fill", "contain", or "cover".`);if(e.transform.width!==void 0&&e.transform.height!==void 0&&e.transform.fit===void 0&&![`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior))throw TypeError(`When both config.transform.width and config.transform.height are provided, config.transform.fit must also be provided.`);if(e.transform.fit!==void 0&&[`fill`,`contain`,`cover`].includes(e.sizeChangeBehavior)&&e.transform.fit!==e.sizeChangeBehavior)throw TypeError(`config.transform.fit, when provided, cannot differ from config.sizeChangeBehavior when config.sizeChangeBehavior is 'fill', 'contain' or 'cover', as sizeChangeBehavior already determines the fitting algorithm.`);if(e.transform.rotate!==void 0&&![0,90,180,270].includes(e.transform.rotate))throw TypeError(`config.transform.rotate, when provided, must be 0, 90, 180 or 270.`);if(e.transform.flip!==void 0&&typeof e.transform.flip!=`boolean`)throw TypeError(`config.transform.flip, when provided, must be a boolean.`);if(e.transform.crop!==void 0&&Sg(e.transform.crop,`config.transform.`),e.transform.process!==void 0&&typeof e.transform.process!=`function`)throw TypeError(`config.transform.process, when provided, must be a function.`);if(e.transform.frameRate!==void 0&&(!Number.isFinite(e.transform.frameRate)||e.transform.frameRate<=0))throw TypeError(`config.transform.frameRate, when provided, must be a finite positive number.`);if(e.transform.force!==void 0&&typeof e.transform.force!=`boolean`)throw TypeError(`config.transform.force, when provided, must be a boolean.`)}if(e.onEncodedPacket!==void 0&&typeof e.onEncodedPacket!=`function`)throw TypeError(`config.onEncodedPacket, when provided, must be a function.`);if(e.onEncoderConfig!==void 0&&typeof e.onEncoderConfig!=`function`)throw TypeError(`config.onEncoderConfig, when provided, must be a function.`);if(e.onEncodedSample!==void 0&&typeof e.onEncodedSample!=`function`)throw TypeError(`config.onEncodedSample, when provided, must be a function.`);jg(e.codec,e)},jg=(e,t)=>{if(!t||typeof t!=`object`)throw TypeError(`Encoding options must be an object.`);if(t.alpha!==void 0&&![`discard`,`keep`].includes(t.alpha))throw TypeError(`options.alpha, when provided, must be 'discard' or 'keep'.`);let n=t.bitrateMode;if(n!==void 0&&![`constant`,`variable`].includes(n))throw TypeError(`bitrateMode, when provided, must be 'constant' or 'variable'.`);if(t.latencyMode!==void 0&&![`quality`,`realtime`].includes(t.latencyMode))throw TypeError(`latencyMode, when provided, must be 'quality' or 'realtime'.`);if(t.fullCodecString!==void 0&&typeof t.fullCodecString!=`string`)throw TypeError(`fullCodecString, when provided, must be a string.`);if(t.fullCodecString!==void 0&&Wh(t.fullCodecString)!==e)throw TypeError(`fullCodecString, when provided, must be a string that matches the specified codec (${e}).`);if(t.hardwareAcceleration!==void 0&&![`no-preference`,`prefer-hardware`,`prefer-software`].includes(t.hardwareAcceleration))throw TypeError(`hardwareAcceleration, when provided, must be 'no-preference', 'prefer-hardware' or 'prefer-software'.`);if(t.scalabilityMode!==void 0&&typeof t.scalabilityMode!=`string`)throw TypeError(`scalabilityMode, when provided, must be a string.`);if(t.contentHint!==void 0&&typeof t.contentHint!=`string`)throw TypeError(`contentHint, when provided, must be a string.`)},Mg=e=>{let t=e.bitrateMode,n=e.quality._toVideoRateControl(e.codec,e.width,e.height,t),r=(t,n,r)=>({codec:e.fullCodecString??zh(e.codec,e.width,e.height,r,e.alpha===`keep`),width:e.width,height:e.height,displayWidth:e.squarePixelWidth,displayHeight:e.squarePixelHeight,bitrate:t,bitrateMode:n,alpha:e.alpha??`discard`,framerate:e.framerate,latencyMode:e.latencyMode,hardwareAcceleration:e.hardwareAcceleration,scalabilityMode:e.scalabilityMode,contentHint:e.contentHint,...Gh(e.codec)}),i=[];return n.quantizer!==null&&i.push({config:r(void 0,`quantizer`,n.bitrate),quantizer:n.quantizer}),n.bitrateMode!==`quantizer`&&i.push({config:r(n.bitrate,n.bitrateMode,n.bitrate),quantizer:null}),G(i.length>0),i},Ng=class{constructor(e){if((typeof e==`number`||typeof e==`string`)&&(e={quality:e}),!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.bitrateMode!==void 0&&![`constant`,`variable`].includes(e.bitrateMode))throw TypeError(`options.bitrateMode, when provided, must be 'constant' or 'variable'.`);if(`quality`in e){if(typeof e.quality==`string`?!(e.quality in Pg):typeof e.quality!=`number`||Number.isNaN(e.quality))throw TypeError(`options.quality must be a number, or one of 'very-low', 'low', 'medium', 'high' or 'very-high'.`);if(e.preferBitrate!==void 0&&typeof e.preferBitrate!=`boolean`)throw TypeError(`options.preferBitrate, when provided, must be a boolean.`);if(`bitrate`in e||`quantizer`in e)throw TypeError(`options.quality cannot be combined with options.bitrate or options.quantizer.`);this._quality=typeof e.quality==`string`?Pg[e.quality]:e.quality,this._preferBitrate=e.preferBitrate??!1,this._bitrate=void 0,this._quantizer=void 0}else{if(e.bitrate!==void 0&&(!Number.isInteger(e.bitrate)||e.bitrate<=0))throw TypeError(`options.bitrate, when provided, must be a positive integer.`);if(e.quantizer!==void 0&&(!Number.isInteger(e.quantizer)||e.quantizer<0))throw TypeError(`options.quantizer, when provided, must be a non-negative integer.`);if(e.bitrate===void 0&&e.quantizer===void 0)throw TypeError(`At least one of options.bitrate or options.quantizer must be set.`);if(`preferBitrate`in e)throw TypeError(`options.preferBitrate can only be combined with options.quality.`);this._quality=void 0,this._preferBitrate=!1,this._bitrate=e.bitrate,this._quantizer=e.quantizer}this._bitrateMode=e.bitrateMode}_toVideoRateControl(e,t,n,r){let i=Fg[e],a=null,o=this._bitrateMode??r??`variable`;if(this._quantizer!==void 0){if(!i){if(this._bitrate===void 0)throw Error(`Codec '${e}' does not support quantizer-based encoding. Provide a bitrate in the Quality to define a fallback.`)}else if(this._quantizer<i.min||this._quantizer>i.max){if(this._bitrate===void 0)throw Error(`Quantizer ${this._quantizer} is out of range for codec '${e}'; must be between ${i.min} and ${i.max}.`)}else a=this._quantizer,this._bitrate===void 0&&(o=`quantizer`)}else this._bitrate===void 0&&i&&!this._preferBitrate&&(G(this._quality!==void 0),a=Rp(Math.round(zp(i.worst,i.best,this._quality)),i.min,i.max));let s;if(this._bitrate!==void 0)s=this._bitrate;else{let r=this._quality;r===void 0&&(G(a!==null&&i),r=Rp((a-i.worst)/(i.best-i.worst),0,1)),s=Lg(e,t,n,Ig(r))}return{quantizer:a,bitrate:s,bitrateMode:o}}_toVideoBitrate(e,t,n){return this._bitrate===void 0?(G(this._quality!==void 0),Lg(e,t,n,Ig(this._quality))):this._bitrate}_toAudioBitrate(e){if(Eh.includes(e)||e===`flac`)return;if(this._bitrate!==void 0)return this._bitrate;if(this._quality===void 0)throw Error(`This Quality defines neither a quality level nor a bitrate and therefore cannot be used for audio encoding.`);let t=Ig(this._quality),n={aac:128e3,opus:64e3,mp3:16e4,vorbis:64e3,ac3:384e3,eac3:192e3,dts:768e3}[e];if(!n)throw Error(`Unhandled codec: ${e}`);let r=n*t;return e===`aac`?r=[96e3,128e3,16e4,192e3].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e):e===`opus`||e===`vorbis`?r=Math.max(6e3,r):e===`mp3`&&(r=[8e3,16e3,24e3,32e3,4e4,48e3,64e3,8e4,96e3,112e3,128e3,16e4,192e3,224e3,256e3,32e4].reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e)),Math.round(r/1e3)*1e3}},Pg={"very-low":0,low:.25,medium:.5,high:.75,"very-high":1},Fg={avc:{min:0,max:51,worst:41,best:16},hevc:{min:0,max:51,worst:41,best:16},vp9:{min:0,max:63,worst:52,best:20},av1:{min:0,max:255,worst:208,best:80}},Ig=e=>.3*Math.exp(2.5538*e),Lg=(e,t,n,r)=>{let i=t*n,a=3e6,o=a*(i/2073600)**.95*{avc:1,hevc:.6,vp9:.6,av1:.4,vp8:1.2,prores:22e7/a}[e]*r;return Math.ceil(o/1e3)*1e3},Rg=(e,t)=>{if(e===`avc`)return{avc:{quantizer:t}};if(e===`hevc`)return{hevc:{quantizer:t}};if(e===`vp9`)return{vp9:{quantizer:t}};if(e===`av1`)return{av1:{quantizer:t}};G(!1)},zg=new Ng(`very-low`),Bg=new Ng(`low`),Vg=new Ng(`medium`),Hg=new Ng(`high`),Ug=new Ng(`very-high`),Wg=(e,t)=>{if(e!==void 0)return e;if(t!==void 0)return t instanceof Ng?t:new Ng({bitrate:t})},Gg=[],Kg=class e{constructor(e,t,n,r,i){this.bytes=e,this.view=t,this.offset=n,this.start=r,this.end=i,this.bufferPos=r-n}static tempFromBytes(t){return new e(t,Sp(t),0,0,t.length)}get length(){return this.end-this.start}get filePos(){return this.offset+this.bufferPos}set filePos(e){this.bufferPos=e-this.offset}get remainingLength(){return Math.max(this.end-this.filePos,0)}skip(e){this.bufferPos+=e}slice(t,n=this.end-t){if(t<this.start||t+n>this.end)throw RangeError(`Slicing outside of original slice.`);return new e(this.bytes,this.view,this.offset,t,t+n)}},qg=(e,t)=>{if(e.filePos<e.start||e.filePos+t>e.end)throw RangeError(`Tried reading [${e.filePos}, ${e.filePos+t}), but slice is [${e.start}, ${e.end}). This is likely an internal error, please report it alongside the file that caused it.`)},Jg=(e,t)=>{qg(e,t);let n=e.bytes.subarray(e.bufferPos,e.bufferPos+t);return e.bufferPos+=t,n},Yg=class{constructor(e){this.mutex=new Ap,this.trackTimestampInfo=new WeakMap,this.output=e}onTrackClose(e){}validateTimestamp(e,t,n){let r=this.trackTimestampInfo.get(e);if(r){if(n&&(r.maxTimestampBeforeLastKeyPacket=r.maxTimestamp),r.maxTimestampBeforeLastKeyPacket!==null&&t<r.maxTimestampBeforeLastKeyPacket)throw Error(`Timestamps cannot be smaller than the largest timestamp of the previous GOP (a GOP begins with a key packet and ends right before the next key packet). Got ${t}s, but largest timestamp is ${r.maxTimestampBeforeLastKeyPacket}s.`);r.maxTimestamp=Math.max(r.maxTimestamp,t)}else{if(!n)throw Error(`First packet must be a key packet.`);r={maxTimestamp:t,maxTimestampBeforeLastKeyPacket:null},this.trackTimestampInfo.set(e,r)}}},Xg=/<(?:(\d{2}):)?(\d{2}):(\d{2}).(\d{3})>/g,Zg=e=>{let t=Math.floor(e/36e5),n=Math.floor(e%36e5/6e4),r=Math.floor(e%6e4/1e3),i=e%1e3;return t.toString().padStart(2,`0`)+`:`+n.toString().padStart(2,`0`)+`:`+r.toString().padStart(2,`0`)+`.`+i.toString().padStart(3,`0`)},Qg=class{constructor(e){this.writer=e,this.helper=new Uint8Array(8),this.helperView=new DataView(this.helper.buffer),this.offsets=new WeakMap}writeU32(e){this.helperView.setUint32(0,e,!1),this.writer.write(this.helper.subarray(0,4))}writeU64(e){this.helperView.setUint32(0,Math.floor(e/2**32),!1),this.helperView.setUint32(4,e,!1),this.writer.write(this.helper.subarray(0,8))}writeAscii(e){for(let t=0;t<e.length;t++)this.helperView.setUint8(t%8,e.charCodeAt(t)),t%8==7&&this.writer.write(this.helper);e.length%8!=0&&this.writer.write(this.helper.subarray(0,e.length%8))}writeBox(e){if(this.offsets.set(e,this.writer.getPos()),e.contents&&!e.children)this.writeBoxHeader(e,e.size??e.contents.byteLength+8),this.writer.write(e.contents);else{let t=this.writer.getPos();if(this.writeBoxHeader(e,0),e.contents&&this.writer.write(e.contents),e.children)for(let t of e.children)t&&this.writeBox(t);let n=this.writer.getPos(),r=e.size??n-t;this.writer.seek(t),this.writeBoxHeader(e,r),this.writer.seek(n)}}writeBoxHeader(e,t){this.writeU32(e.largeSize?1:t),this.writeAscii(e.type),e.largeSize&&this.writeU64(t)}measureBoxHeader(e){return 8+(e.largeSize?8:0)}patchBox(e){let t=this.offsets.get(e);G(t!==void 0);let n=this.writer.getPos();this.writer.seek(t),this.writeBox(e),this.writer.seek(n)}measureBox(e){if(e.contents&&!e.children)return this.measureBoxHeader(e)+e.contents.byteLength;{let t=this.measureBoxHeader(e);if(e.contents&&(t+=e.contents.byteLength),e.children)for(let n of e.children)n&&(t+=this.measureBox(n));return t}}},q=new Uint8Array(8),$g=new DataView(q.buffer),e_=e=>[(e%256+256)%256],J=e=>($g.setUint16(0,e,!1),[q[0],q[1]]),t_=e=>($g.setInt16(0,e,!1),[q[0],q[1]]),n_=e=>($g.setUint32(0,e,!1),[q[1],q[2],q[3]]),Y=e=>($g.setUint32(0,e,!1),[q[0],q[1],q[2],q[3]]),r_=e=>($g.setInt32(0,e,!1),[q[0],q[1],q[2],q[3]]),i_=e=>($g.setUint32(0,Math.floor(e/2**32),!1),$g.setUint32(4,e,!1),[q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7]]),a_=e=>($g.setInt32(0,Math.floor(e/2**32),!1),$g.setUint32(4,e,!1),[q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7]]),o_=e=>($g.setInt16(0,256*e,!1),[q[0],q[1]]),s_=e=>($g.setInt32(0,2**16*e,!1),[q[0],q[1],q[2],q[3]]),c_=e=>($g.setInt32(0,2**30*e,!1),[q[0],q[1],q[2],q[3]]),l_=(e,t)=>{let n=[],r=e;do{let e=r&127;r>>=7,n.length>0&&(e|=128),n.push(e),t!==void 0&&t--}while(r>0||t);return n.reverse()},X=(e,t=!1)=>{let n=Array(e.length).fill(null).map((t,n)=>e.charCodeAt(n));return t&&n.push(0),n},u_=e=>[s_(e[0]),s_(e[1]),c_(e[2]),s_(e[3]),s_(e[4]),c_(e[5]),s_(e[6]),s_(e[7]),c_(e[8])],Z=(e,t,n)=>({type:e,contents:t&&new Uint8Array(t.flat(10)),children:n}),Q=(e,t,n,r,i)=>Z(e,[e_(t),n_(n),r??[]],i),d_=e=>e.isQuickTime?Z(`ftyp`,[X(`qt  `),Y(512),X(`qt  `)]):e.fragmented?e.cmaf?Z(`ftyp`,[X(`iso5`),Y(512),X(`iso5`),X(`iso6`),X(`mp41`),X(`cmfc`),X(`dash`)]):Z(`ftyp`,[X(`iso5`),Y(512),X(`iso5`),X(`iso6`),X(`mp41`)]):Z(`ftyp`,[X(`isom`),Y(512),X(`isom`),e.holdsAvc?X(`avc1`):[],X(`mp41`)]),f_=()=>Z(`styp`,[X(`iso5`),Y(0),X(`iso5`),X(`iso6`),X(`mp41`),X(`cmfc`),X(`dash`)]),p_=(e,t)=>{let n=Math.max(0,e.minWrittenTimestamp),r=Math.max(0,e.maxWrittenEndTimestamp-n);return Number.isFinite(r)||(r=0),Q(`sidx`,1,0,[Y(1),Y(Wv),i_($(n,Wv)),i_(0),J(0),J(1),Y(t&2147483647),Y($(r,Wv)),Y(0)])},m_=e=>({type:`mdat`,largeSize:e}),h_=e=>({type:`free`,size:e}),g_=e=>Z(`moov`,void 0,[__(e.creationTime,e.trackDatas),...e.trackDatas.map(t=>v_(t,e.creationTime)),e.isFragmented?sv(e.trackDatas):null,Sv(e)]),__=(e,t)=>{let n=Math.max(0,...t.map(e=>Math.max(0,$(qv(e),Wv)+$(e.startTimestampOffset??0,Wv)))),r=Math.max(0,...t.map(e=>e.track.id))+1,i=!vp(e)||!vp(n),a=i?i_:Y;return Q(`mvhd`,+i,0,[a(e),a(e),Y(Wv),a(n),s_(1),o_(1),Array(10).fill(0),u_(up),Array(24).fill(0),Y(r)])},v_=(e,t)=>{let n=Kv(e),r=e.startTimestampOffset!==null&&e.startTimestampOffset!==0;return Z(`trak`,void 0,[y_(e,t),r?b_(e):null,x_(e,t),n.name===void 0?null:Z(`udta`,void 0,[Z(`name`,[...wp.encode(n.name)])])])},y_=(e,t)=>{let n=Math.max(0,$(qv(e),Wv)+$(e.startTimestampOffset??0,Wv)),r=!vp(t)||!vp(n),i=r?i_:Y,a;if(e.type===`video`&&e.track.metadata.transformationMatrix)a=e.track.metadata.transformationMatrix;else if(e.type===`video`){let{rotation:t,flip:n}=e.track.metadata;a=dp(hp(fp(t??0),mp(n?-1:1,1)),e.info.width,e.info.height)}else a=up;let o=2;e.track.metadata.disposition?.default!==!1&&(o|=1);let s=e.type===`video`?0:e.type===`audio`?1:e.type===`subtitle`?2:Fp(e);return Q(`tkhd`,+r,o,[i(t),i(t),Y(e.track.id),Y(0),i(n),Array(8).fill(0),J(0),J(s),o_(+(e.type===`audio`)),J(0),u_(a),s_(e.type===`video`?e.info.width:0),s_(e.type===`video`?e.info.height:0)])},b_=e=>{let t=e.startTimestampOffset;if(G(t!==null),t>0){let n=$(t,Wv),r=$(qv(e),Wv),i=!vp(n)||!vp(r),a=i?i_:Y,o=i?a_:r_;return Z(`edts`,void 0,[Q(`elst`,+!!i,0,[Y(2),a(n),o(-1),s_(1),a(r),o(0),s_(1)])])}{let n=$(-t,e.timescale),r=Math.max(0,$(qv(e),Wv)+$(t,Wv)),i=!yp(n)||!vp(r),a=i?i_:Y,o=i?a_:r_;return Z(`edts`,void 0,[Q(`elst`,+!!i,0,[Y(1),a(r),o(n),s_(1)])])}},x_=(e,t)=>Z(`mdia`,void 0,[S_(e,t),T_(!0,C_[e.type],w_[e.type]),E_(e)]),S_=(e,t)=>{let n=$(qv(e),e.timescale),r=!vp(t)||!vp(n),i=r?i_:Y;return Q(`mdhd`,+r,0,[i(t),i(t),Y(e.timescale),i(n),J(Iv(e.track.metadata.languageCode??`und`)),J(0)])},C_={video:`vide`,audio:`soun`,subtitle:`text`},w_={video:`MediabunnyVideoHandler`,audio:`MediabunnySoundHandler`,subtitle:`MediabunnyTextHandler`},T_=(e,t,n,r=`\0\0\0\0`)=>Q(`hdlr`,0,0,[e?X(`mhlr`):Y(0),X(t),X(r),Y(0),Y(0),X(n,!0)]),E_=e=>Z(`minf`,void 0,[D_[e.type](),O_(),j_(e)]),D_={video:()=>Q(`vmhd`,0,1,[J(0),J(0),J(0),J(0)]),audio:()=>Q(`smhd`,0,0,[J(0),J(0)]),subtitle:()=>Q(`nmhd`,0,0)},O_=()=>Z(`dinf`,void 0,[k_()]),k_=()=>Q(`dref`,0,0,[Y(1)],[A_()]),A_=()=>Q(`url `,0,1),j_=e=>{let t=e.compositionTimeOffsetTable.length>1||e.compositionTimeOffsetTable.some(e=>e.sampleCompositionTimeOffset!==0);return Z(`stbl`,void 0,[M_(e),ev(e),t?av(e):null,t?ov(e):null,nv(e),rv(e),iv(e),tv(e)])},M_=e=>{let t;if(e.type===`video`)t=N_(Av(e.track.source._codec,e.info.decoderConfig.codec),e);else if(e.type===`audio`){let n=Mv(e.track.source._codec,e.info.decoderConfig.codec,e.muxer.isQuickTime);G(n),t=V_(n,e)}else e.type===`subtitle`&&(t=Q_(Pv[e.track.source._codec],e));return G(t),Q(`stsd`,0,0,[Y(1)],[t])},N_=(e,t)=>Z(e,[[,,,,,,].fill(0),J(1),J(0),J(0),Array(12).fill(0),J(t.info.width),J(t.info.height),Y(4718592),Y(4718592),Y(0),J(1),e_(Dm.length),X(Dm),Array(31-Dm.length).fill(0),J(t.info.hasAlphaChannel?32:24),t_(65535)],[jv[t.track.source._codec]?.(t)??null,F_(t),Op(t.info.decoderConfig.colorSpace)?null:I_(t),P_(t)]),P_=e=>e.avgBitrate===0&&e.maxBitrate===0?null:Z(`btrt`,[Y(0),Y(e.maxBitrate),Y(e.avgBitrate)]),F_=e=>e.info.pixelAspectRatio.num===e.info.pixelAspectRatio.den?null:Z(`pasp`,[Y(e.info.pixelAspectRatio.num),Y(e.info.pixelAspectRatio.den)]),I_=e=>{let t=e.info.decoderConfig.colorSpace;return Z(`colr`,[X(e.muxer.isQuickTime?`nclc`:`nclx`),J(t?.primaries==null?2:Tp[t.primaries]),J(t?.transfer==null?2:Ep[t.transfer]),J(t?.matrix==null?2:Dp[t.matrix]),e.muxer.isQuickTime?[]:e_(!!t?.fullRange<<7)])},L_=e=>e.info.decoderConfig&&Z(`avcC`,[...xp(e.info.decoderConfig.description)]),R_=e=>e.info.decoderConfig&&Z(`hvcC`,[...xp(e.info.decoderConfig.description)]),z_=e=>{if(!e.info.decoderConfig)return null;let t=e.info.decoderConfig,n=t.codec.split(`.`),r=Number(n[1]),i=Number(n[2]),a=Number(n[3]),o=n[4]?Number(n[4]):1,s=n[8]?Number(n[8]):Number(t.colorSpace?.fullRange??0),c=(a<<4)+(o<<1)+s,l=n[5]?Number(n[5]):t.colorSpace?.primaries?Tp[t.colorSpace.primaries]:1,u=n[6]?Number(n[6]):t.colorSpace?.transfer?Ep[t.colorSpace.transfer]:1,d=n[7]?Number(n[7]):t.colorSpace?.matrix?Dp[t.colorSpace.matrix]:1;return Q(`vpcC`,1,0,[e_(r),e_(i),e_(c),e_(l),e_(u),e_(d),J(0)])},B_=e=>Z(`av1C`,Bh(e.info.decoderConfig.codec)),V_=(e,t)=>{let n=0,r,i=16,a=Eh.includes(t.track.source._codec);if(a){let e=t.track.source._codec,{sampleSize:r}=Uh(e);i=8*r,i>16&&(n=1)}if(t.muxer.isQuickTime&&(n=1),n===0)r=[[,,,,,,].fill(0),J(1),J(n),J(0),Y(0),J(t.info.numberOfChannels),J(i),J(0),J(0),J(t.info.sampleRate<2**16?t.info.sampleRate:0),J(0)];else{let e=a?0:-2;r=[[,,,,,,].fill(0),J(1),J(n),J(0),Y(0),J(t.info.numberOfChannels),J(Math.min(i,16)),t_(e),J(0),J(t.info.sampleRate<2**16?t.info.sampleRate:0),J(0),a?[Y(1),Y(i/8),Y(t.info.numberOfChannels*i/8)]:[Y(0),Y(0),Y(0)],Y(2)]}return Z(e,r,[Nv(t.track.source._codec,t.muxer.isQuickTime)?.(t)??null,P_(t)])},H_=e=>{let t;switch(e.track.source._codec){case`aac`:t=64;break;case`mp3`:t=107;break;case`vorbis`:t=221;break;default:throw Error(`Unhandled audio codec: ${e.track.source._codec}`)}let n=[...e_(t),...e_(21),...n_(0),...Y(e.maxBitrate),...Y(e.avgBitrate)];if(e.info.decoderConfig.description){let t=xp(e.info.decoderConfig.description);n=[...n,...e_(5),...l_(t.byteLength),...t]}return n=[...J(1),...e_(0),...e_(4),...l_(n.length),...n,...e_(6),...e_(1),...e_(2)],n=[...e_(3),...l_(n.length),...n],Q(`esds`,0,0,n)},U_=e=>Z(`wave`,void 0,[W_(e),G_(e),Z(`\0\0\0\0`)]),W_=e=>Z(`frma`,[X(Mv(e.track.source._codec,e.info.decoderConfig.codec,e.muxer.isQuickTime))]),G_=e=>{let{littleEndian:t}=Uh(e.track.source._codec);return Z(`enda`,[J(+t)])},K_=e=>{let t=e.info.numberOfChannels,n=3840,r=e.info.sampleRate,i=0,a=0,o=new Uint8Array,s=e.info.decoderConfig?.description;if(s){G(s.byteLength>=18);let e=ah(xp(s));t=e.outputChannelCount,n=e.preSkip,r=e.inputSampleRate,i=e.outputGain,a=e.channelMappingFamily,e.channelMappingTable&&(o=e.channelMappingTable)}return Z(`dOps`,[e_(0),e_(t),J(n),Y(r),t_(i),e_(a),...o])},q_=e=>{let t=e.info.decoderConfig?.description;return G(t),Q(`dfLa`,0,0,[...xp(t).subarray(4)])},J_=e=>{let{littleEndian:t,sampleSize:n}=Uh(e.track.source._codec);return Q(`pcmC`,0,0,[e_(+t),e_(8*n)])},Y_=e=>{G(e.info.primingPacket);let t=ch(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract AC-3 frame info from the audio packet. Ensure the packets contain valid AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=new Uint8Array(3),r=new vm(n);return r.writeBits(2,t.fscod),r.writeBits(5,t.bsid),r.writeBits(3,t.bsmod),r.writeBits(3,t.acmod),r.writeBits(1,t.lfeon),r.writeBits(5,t.bitRateCode),r.writeBits(5,0),Z(`dac3`,[...n])},X_=e=>{G(e.info.primingPacket);let t=uh(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract E-AC-3 frame info from the audio packet. Ensure the packets contain valid E-AC-3 sync frames (as specified in ETSI TS 102 366).`);let n=16;for(let e of t.substreams)n+=23,e.numDepSub>0?n+=9:n+=1;let r=Math.ceil(n/8),i=new Uint8Array(r),a=new vm(i);a.writeBits(13,t.dataRate),a.writeBits(3,t.substreams.length-1);for(let e of t.substreams)a.writeBits(2,e.fscod),a.writeBits(5,e.bsid),a.writeBits(1,0),a.writeBits(1,0),a.writeBits(3,e.bsmod),a.writeBits(3,e.acmod),a.writeBits(1,e.lfeon),a.writeBits(3,0),a.writeBits(4,e.numDepSub),e.numDepSub>0?a.writeBits(9,e.chanLoc):a.writeBits(1,0);return Z(`dec3`,[...i])},Z_=e=>{G(e.info.primingPacket);let t=xh(e.info.primingPacket.data);if(!t)throw Error(`Couldn't extract DTS frame info from the audio packet. Ensure the packets contain valid DTS frames as specified in ETSI TS 102 114.`);return Z(`ddts`,[...wh(t)])},Q_=(e,t)=>Z(e,[[,,,,,,].fill(0),J(1)],[Fv[t.track.source._codec](t),P_(t)]),$_=e=>Z(`vttC`,[...wp.encode(e.info.config.description)]),ev=e=>Q(`stts`,0,0,[Y(e.timeToSampleTable.length),e.timeToSampleTable.map(e=>[Y(e.sampleCount),Y(e.sampleDelta)])]),tv=e=>{if(e.samples.every(e=>e.type===`key`))return null;let t=[...e.samples.entries()].filter(([,e])=>e.type===`key`);return Q(`stss`,0,0,[Y(t.length),t.map(([e])=>Y(e+1))])},nv=e=>Q(`stsc`,0,0,[Y(e.compactlyCodedChunkTable.length),e.compactlyCodedChunkTable.map(e=>[Y(e.firstChunk),Y(e.samplesPerChunk),Y(1)])]),rv=e=>{if(e.type===`audio`&&e.info.requiresPcmTransformation){let{sampleSize:t}=Uh(e.track.source._codec);return Q(`stsz`,0,0,[Y(t*e.info.numberOfChannels),Y(e.samples.reduce((t,n)=>t+$(n.duration,e.timescale),0))])}return Q(`stsz`,0,0,[Y(0),Y(e.samples.length),e.samples.map(e=>Y(e.size))])},iv=e=>e.finalizedChunks.length>0&&_p(e.finalizedChunks).offset>=2**32?Q(`co64`,0,0,[Y(e.finalizedChunks.length),e.finalizedChunks.map(e=>i_(e.offset))]):Q(`stco`,0,0,[Y(e.finalizedChunks.length),e.finalizedChunks.map(e=>Y(e.offset))]),av=e=>Q(`ctts`,1,0,[Y(e.compositionTimeOffsetTable.length),e.compositionTimeOffsetTable.map(e=>[Y(e.sampleCount),r_(e.sampleCompositionTimeOffset)])]),ov=e=>{let t=1/0,n=-1/0,r=1/0,i=-1/0;G(e.compositionTimeOffsetTable.length>0),G(e.samples.length>0);for(let r=0;r<e.compositionTimeOffsetTable.length;r++){let i=e.compositionTimeOffsetTable[r];t=Math.min(t,i.sampleCompositionTimeOffset),n=Math.max(n,i.sampleCompositionTimeOffset)}for(let t=0;t<e.samples.length;t++){let n=e.samples[t];r=Math.min(r,$(n.timestamp,e.timescale)),i=Math.max(i,$(n.timestamp+n.duration,e.timescale))}let a=Math.max(-t,0);return i>=2**31?null:Q(`cslg`,0,0,[r_(a),r_(t),r_(n),r_(r),r_(i)])},sv=e=>Z(`mvex`,void 0,e.map(cv)),cv=e=>Q(`trex`,0,0,[Y(e.track.id),Y(1),Y(0),Y(0),Y(0)]),lv=(e,t)=>Z(`moof`,void 0,[uv(e),...t.map(fv)]),uv=e=>Q(`mfhd`,0,0,[Y(e)]),dv=e=>{let t=0,n=0,r=e.type===`delta`;return n|=+r,t|=r?1:2,t<<24|n<<16},fv=e=>Z(`traf`,void 0,[pv(e),mv(e),hv(e)]),pv=e=>{G(e.currentChunk);let t=0;t|=8,t|=16,t|=32,t|=131072;let n=e.currentChunk.samples[1]??e.currentChunk.samples[0],r={duration:n.timescaleUnitsToNextSample,size:n.size,flags:dv(n)};return Q(`tfhd`,0,t,[Y(e.track.id),Y(r.duration),Y(r.size),Y(r.flags)])},mv=e=>(G(e.currentChunk),Q(`tfdt`,1,0,[i_($(e.currentChunk.startTimestamp,e.timescale))])),hv=e=>{G(e.currentChunk);let t=e.currentChunk.samples.map(e=>e.timescaleUnitsToNextSample),n=e.currentChunk.samples.map(e=>e.size),r=e.currentChunk.samples.map(dv),i=e.currentChunk.samples.map(t=>$(t.timestamp-t.decodeTimestamp,e.timescale)),a=new Set(t),o=new Set(n),s=new Set(r),c=new Set(i),l=s.size===2&&r[0]!==r[1],u=a.size>1,d=o.size>1,f=!l&&s.size>1,p=c.size>1||[...c].some(e=>e!==0),m=0;return m|=1,m|=4*l,m|=256*u,m|=512*d,m|=1024*f,m|=2048*p,Q(`trun`,1,m,[Y(e.currentChunk.samples.length),Y(e.currentChunk.offset-e.currentChunk.moofOffset||0),l?Y(r[0]):[],e.currentChunk.samples.map((e,a)=>[u?Y(t[a]):[],d?Y(n[a]):[],f?Y(r[a]):[],p?r_(i[a]):[]])])},gv=e=>Z(`mfra`,void 0,[...e.map(_v),vv()]),_v=e=>Q(`tfra`,1,0,[Y(e.track.id),Y(63),Y(e.finalizedChunks.length),e.finalizedChunks.map(t=>[i_($(t.samples[0].timestamp,e.timescale)),i_(t.moofOffset),Y(t.trafIndex+1),Y(1),Y(1)])]),vv=()=>Q(`mfro`,0,0,[Y(0)]),yv=()=>Z(`vtte`),bv=(e,t,n,r,i)=>Z(`vttc`,void 0,[i===null?null:Z(`vsid`,[r_(i)]),n===null?null:Z(`iden`,[...wp.encode(n)]),t===null?null:Z(`ctim`,[...wp.encode(Zg(t))]),r===null?null:Z(`sttg`,[...wp.encode(r)]),Z(`payl`,[...wp.encode(e)])]),xv=e=>Z(`vtta`,[...wp.encode(e)]),Sv=e=>{let t=[],n=e.format._options.metadataFormat??`auto`,r=e.output._metadataTags;if(n===`mdir`||n===`auto`&&!e.isQuickTime){let e=Dv(r);e&&t.push(e)}else if(n===`mdta`){let e=Ov(r);e&&t.push(e)}else(n===`udta`||n===`auto`&&e.isQuickTime)&&Cv(t,e.output._metadataTags);return t.length===0?null:Z(`udta`,void 0,t)},Cv=(e,t)=>{for(let{key:n,value:r}of nm(t))switch(n){case`title`:e.push(wv(`©nam`,r));break;case`description`:e.push(wv(`©des`,r));break;case`artist`:e.push(wv(`©ART`,r));break;case`album`:e.push(wv(`©alb`,r));break;case`albumArtist`:e.push(wv(`albr`,r));break;case`genre`:e.push(wv(`©gen`,r));break;case`date`:e.push(wv(`©day`,r.toISOString().slice(0,10)));break;case`comment`:e.push(wv(`©cmt`,r));break;case`lyrics`:e.push(wv(`©lyr`,r));break;case`raw`:break;case`discNumber`:case`discsTotal`:case`trackNumber`:case`tracksTotal`:case`beatsPerMinute`:case`images`:break;default:Fp(n)}if(t.raw)for(let n in t.raw){let r=t.raw[n];r==null||n.length!==4||e.some(e=>e.type===n)||(typeof r==`string`?e.push(wv(n,r)):r instanceof Uint8Array&&e.push(Z(n,Array.from(r))))}},wv=(e,t)=>{let n=wp.encode(t);return Z(e,[J(n.length),J(Iv(`und`)),Array.from(n)])},Tv={"image/jpeg":13,"image/png":14,"image/bmp":27},Ev=(e,t)=>{let n=[];for(let{key:r,value:i}of nm(e))switch(r){case`title`:n.push({key:t?`title`:`©nam`,value:kv(i)});break;case`description`:n.push({key:t?`description`:`©des`,value:kv(i)});break;case`artist`:n.push({key:t?`artist`:`©ART`,value:kv(i)});break;case`album`:n.push({key:t?`album`:`©alb`,value:kv(i)});break;case`albumArtist`:n.push({key:t?`album_artist`:`aART`,value:kv(i)});break;case`comment`:n.push({key:t?`comment`:`©cmt`,value:kv(i)});break;case`genre`:n.push({key:t?`genre`:`©gen`,value:kv(i)});break;case`beatsPerMinute`:t||n.push({key:`tmpo`,value:Z(`data`,[Y(21),Y(0),J(i)])});break;case`lyrics`:n.push({key:t?`lyrics`:`©lyr`,value:kv(i)});break;case`date`:n.push({key:t?`date`:`©day`,value:kv(i.toISOString().slice(0,10))});break;case`images`:for(let e of i)e.kind===`coverFront`&&n.push({key:`covr`,value:Z(`data`,[Y(Tv[e.mimeType]??0),Y(0),Array.from(e.data)])});break;case`trackNumber`:if(t){let t=e.tracksTotal===void 0?i.toString():`${i}/${e.tracksTotal}`;n.push({key:`track`,value:kv(t)})}else n.push({key:`trkn`,value:Z(`data`,[Y(0),Y(0),J(0),J(i),J(e.tracksTotal??0),J(0)])});break;case`discNumber`:t||n.push({key:`disc`,value:Z(`data`,[Y(0),Y(0),J(0),J(i),J(e.discsTotal??0),J(0)])});break;case`tracksTotal`:case`discsTotal`:break;case`raw`:break;default:Fp(r)}if(e.raw)for(let r in e.raw){let i=e.raw[r];i==null||!t&&r.length!==4||n.some(e=>e.key===r)||(typeof i==`string`?n.push({key:r,value:kv(i)}):i instanceof Uint8Array?n.push({key:r,value:Z(`data`,[Y(0),Y(0),Array.from(i)])}):i instanceof mm&&n.push({key:r,value:Z(`data`,[Y(Tv[i.mimeType]??0),Y(0),Array.from(i.data)])}))}return n},Dv=e=>{let t=Ev(e,!1);return t.length===0?null:Q(`meta`,0,0,void 0,[T_(!1,`mdir`,``,`appl`),Z(`ilst`,void 0,t.map(e=>Z(e.key,void 0,[e.value])))])},Ov=e=>{let t=Ev(e,!0);return t.length===0?null:Z(`meta`,void 0,[T_(!1,`mdta`,``),Q(`keys`,0,0,[Y(t.length)],t.map(e=>Z(`mdta`,[...wp.encode(e.key)]))),Z(`ilst`,void 0,t.map((e,t)=>Z(String.fromCharCode(...Y(t+1)),void 0,[e.value])))])},kv=e=>Z(`data`,[Y(1),Y(0),...wp.encode(e)]),Av=(e,t)=>{switch(e){case`avc`:return t.startsWith(`avc3`)?`avc3`:`avc1`;case`hevc`:return`hvc1`;case`vp8`:return`vp08`;case`vp9`:return`vp09`;case`av1`:return`av01`;case`prores`:return t}},jv={avc:L_,hevc:R_,vp8:z_,vp9:z_,av1:B_,prores:null},Mv=(e,t,n)=>{switch(e){case`aac`:return`mp4a`;case`mp3`:return`mp4a`;case`opus`:return`Opus`;case`vorbis`:return`mp4a`;case`flac`:return`fLaC`;case`ulaw`:return`ulaw`;case`alaw`:return`alaw`;case`pcm-u8`:return`raw `;case`pcm-s8`:return`sowt`;case`ac3`:return`ac-3`;case`eac3`:return`ec-3`;case`dts`:return t}if(n)switch(e){case`pcm-s16`:return`sowt`;case`pcm-s16be`:return`twos`;case`pcm-s24`:return`in24`;case`pcm-s24be`:return`in24`;case`pcm-s32`:return`in32`;case`pcm-s32be`:return`in32`;case`pcm-f32`:return`fl32`;case`pcm-f32be`:return`fl32`;case`pcm-f64`:return`fl64`;case`pcm-f64be`:return`fl64`}else switch(e){case`pcm-s16`:return`ipcm`;case`pcm-s16be`:return`ipcm`;case`pcm-s24`:return`ipcm`;case`pcm-s24be`:return`ipcm`;case`pcm-s32`:return`ipcm`;case`pcm-s32be`:return`ipcm`;case`pcm-f32`:return`fpcm`;case`pcm-f32be`:return`fpcm`;case`pcm-f64`:return`fpcm`;case`pcm-f64be`:return`fpcm`}},Nv=(e,t)=>{switch(e){case`aac`:return H_;case`mp3`:return H_;case`opus`:return K_;case`vorbis`:return H_;case`flac`:return q_;case`ac3`:return Y_;case`eac3`:return X_;case`dts`:return Z_}if(t)switch(e){case`pcm-s24`:return U_;case`pcm-s24be`:return U_;case`pcm-s32`:return U_;case`pcm-s32be`:return U_;case`pcm-f32`:return U_;case`pcm-f32be`:return U_;case`pcm-f64`:return U_;case`pcm-f64be`:return U_}else switch(e){case`pcm-s16`:return J_;case`pcm-s16be`:return J_;case`pcm-s24`:return J_;case`pcm-s24be`:return J_;case`pcm-s32`:return J_;case`pcm-s32be`:return J_;case`pcm-f32`:return J_;case`pcm-f32be`:return J_;case`pcm-f64`:return J_;case`pcm-f64be`:return J_}return null},Pv={webvtt:`wvtt`},Fv={webvtt:$_},Iv=e=>{G(e.length===3);let t=0;for(let n=0;n<3;n++)t<<=5,t+=e.charCodeAt(n)-96;return t},Lv=class{constructor(e,t){if(this.finalized=!1,this.started=!1,this.pos=0,this.trackedWrites=null,this.trackedStart=-1,this.trackedEnd=-1,e._writerAcquired)throw Error(`Can't have multiple Writers for the same Target.`);this.target=e,e._setMonotonicity(t),e._writerAcquired=!0}start(){G(!this.started),this.target._start(),this.started=!0}write(e){G(this.started&&!this.finalized),this.maybeTrackWrites(e),this.target._write(e,this.pos),this.pos+=e.byteLength}seek(e){this.pos=e}getPos(){return this.pos}async flush(){return G(this.started&&!this.finalized),this.target._flush()}async finalize(){G(this.started&&!this.finalized),await this.target._finalize(),this.finalized=!0}maybeTrackWrites(e){if(!this.trackedWrites)return;let t=this.getPos();if(t<this.trackedStart){if(t+e.byteLength<=this.trackedStart)return;e=e.subarray(this.trackedStart-t),t=0}let n=t+e.byteLength-this.trackedStart,r=this.trackedWrites.byteLength;for(;r<n;)r*=2;if(r!==this.trackedWrites.byteLength){let e=new Uint8Array(r);e.set(this.trackedWrites,0),this.trackedWrites=e}this.trackedWrites.set(e,t-this.trackedStart),this.trackedEnd=Math.max(this.trackedEnd,t+e.byteLength)}startTrackingWrites(){this.trackedWrites=new Uint8Array(1024),this.trackedStart=this.getPos(),this.trackedEnd=this.trackedStart}stopTrackingWrites(){if(!this.trackedWrites)throw Error(`Internal error: Can't get tracked writes since nothing was tracked.`);let e={data:this.trackedWrites.subarray(0,this.trackedEnd-this.trackedStart),start:this.trackedStart,end:this.trackedEnd};return this.trackedWrites=null,e}};u();var Rv=class extends um{constructor(){super(...arguments),this._writerAcquired=!1,this._monotonicity=null,this.onwrite=null}_setMonotonicity(e){this._monotonicity!==!1&&(this._monotonicity=e)}_dispatchWrite(e,t){this.onwrite?.(e,t),this._emit(`write`,{start:e,end:t})}slice(e){if(!Number.isInteger(e)||e<0)throw TypeError(`offset must be a non-negative integer.`);return new Hv(this,e)}},zv=2**16,Bv=2**32,Vv=class extends Rv{constructor(e={}){if(super(),this.buffer=null,this._maxPos=0,!e||typeof e!=`object`)throw TypeError(`BufferTarget options, when provided, must be an object.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);if(this._options=e,this._supportsResize=`resize`in new ArrayBuffer(0),this._supportsResize)try{this._buffer=new ArrayBuffer(zv,{maxByteLength:Bv})}catch{this._buffer=new ArrayBuffer(zv),this._supportsResize=!1}else this._buffer=new ArrayBuffer(zv);this._bytes=new Uint8Array(this._buffer)}_ensureSize(e){let t=this._buffer.byteLength;for(;t<e;)t*=2;if(t!==this._buffer.byteLength){if(t>Bv)throw Error(`ArrayBuffer exceeded maximum size of ${Bv} bytes. Please consider using another target.`);if(this._supportsResize)this._buffer.resize(t);else{let e=new ArrayBuffer(t),n=new Uint8Array(e);n.set(this._bytes,0),this._buffer=e,this._bytes=n}}}_start(){}_write(e,t){this._ensureSize(t+e.byteLength),this._bytes.set(e,t),this._maxPos=Math.max(this._maxPos,t+e.byteLength),this._dispatchWrite(t,t+e.byteLength)}async _flush(){}async _finalize(){this.buffer=this._buffer.slice(0,this._maxPos),this._options.onFinalize&&await this._options.onFinalize(this.buffer),this._emit(`finalized`)}async _close(){}_getSlice(e,t){return this._bytes.slice(e,t)}},Hv=class extends Rv{constructor(e,t){super(),this._baseTarget=e,this._offset=t}_start(){}_write(e,t){this._baseTarget._write(e,this._offset+t),this._dispatchWrite(t,t+e.byteLength)}_flush(){return this._baseTarget._flush()}async _finalize(){this._emit(`finalized`)}async _close(){}_setMonotonicity(e){super._setMonotonicity(e),this._baseTarget._setMonotonicity(e)}},Uv=class{constructor(e,t){if(this.rootPath=e,this.getTarget=t,typeof e!=`string`)throw TypeError(`rootPath must be a string.`);if(typeof t!=`function`)throw TypeError(`getTarget must be a function.`)}},Wv=57600,Gv=2082844800,Kv=e=>{let t={},n=e.track;return n.metadata.name!==void 0&&(t.name=n.metadata.name),t},$=(e,t,n=!0)=>{let r=e*t;return n?Math.round(r):r},qv=e=>{if(e.samples.length===0)return 0;let t=1/0,n=-1/0;for(let r=0;r<e.samples.length;r++){let i=e.samples[r];i.timestamp<t&&(t=i.timestamp),i.timestamp+i.duration>n&&(n=i.timestamp+i.duration)}return t===1/0?0:n-t},Jv=class extends Yg{constructor(e,t){super(e),this.writer=null,this.boxWriter=null,this.initWriter=null,this.initBoxWriter=null,this.auxTarget=new Vv,this.auxWriter=new Lv(this.auxTarget,!1),this.auxBoxWriter=new Qg(this.auxWriter),this.mdat=null,this.ftypSize=null,this.trackDatas=[],this.allTracksKnown=Pp(),this.creationTime=Math.floor(Date.now()/1e3)+Gv,this.finalizedChunks=[],this.wroteFragmentedHeader=!1,this.nextFragmentNumber=1,this.maxWrittenTimestamp=-1/0,this.minWrittenTimestamp=1/0,this.maxWrittenEndTimestamp=-1/0,this.segmentHeaderSize=null,this.format=t,this.formatOptions={...t._options},this.isQuickTime=t instanceof dy,this.isCmaf=t instanceof uy,this.minimumFragmentDuration=this.formatOptions.minimumFragmentDuration??(t instanceof uy?1/0:1),this.auxWriter.start()}async start(){let e=await this.mutex.acquire();if(this.isCmaf?(this.fastStart=`fragmented`,this.isFragmented=!0):(this.writer=await this.output._getRootWriter(e=>this.formatOptions.fastStart===void 0?e instanceof Vv:this.formatOptions.fastStart===`fragmented`),this.boxWriter=new Qg(this.writer),this.fastStart=this.formatOptions.fastStart??(this.writer.target instanceof Vv&&`in-memory`),this.isFragmented=this.fastStart===`fragmented`),this.isCmaf){if(!this.output._hasInitTarget())throw Error(`CMAF outputs require the initTarget field in OutputOptions to be set; the init segment will be written to it.`);let e=new Lv(await this.output._getInitTarget(),!0);e.start(),this.initWriter=e,this.initBoxWriter=new Qg(e)}let t=this.output.tracks.some(e=>e.isVideoTrack()&&e.source._codec===`avc`);{let e=this.initBoxWriter??this.boxWriter;if(G(e),this.formatOptions.onFtyp&&e.writer.startTrackingWrites(),e.writeBox(d_({isQuickTime:this.isQuickTime,holdsAvc:t,fragmented:this.isFragmented,cmaf:this.isCmaf})),this.formatOptions.onFtyp){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onFtyp(t,n)}this.ftypSize=e.writer.getPos(),this.isCmaf&&await this.initWriter.flush()}if(this.fastStart!==`in-memory`){if(this.fastStart===`reserve`){for(let e of this.output.tracks)if(e.metadata.maximumPacketCount===void 0)throw Error(`All tracks must specify maximumPacketCount in their metadata when using fastStart: 'reserve'.`)}else this.isFragmented||(G(this.writer),G(this.boxWriter),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=m_(!0),this.boxWriter.writeBox(this.mdat))}await this.writer?.flush();for(let e of this.output.tracks)e.isVideoTrack()&&e.metadata.decoderConfig?this.getVideoTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig}):e.isAudioTrack()&&e.metadata.decoderConfig&&this.getAudioTrackData(e,e.metadata.primingPacket??null,{decoderConfig:e.metadata.decoderConfig});e()}allTracksAreKnown(){for(let e of this.output.tracks)if(!e.source._closed&&!this.trackDatas.some(t=>t.track===e))return!1;return!0}async getMimeType(){await this.allTracksKnown.promise;let e=this.trackDatas.map(e=>e.type===`video`||e.type===`audio`?e.info.decoderConfig.codec:{webvtt:`wvtt`}[e.track.source._codec]);return rg({isQuickTime:this.isQuickTime,hasVideo:this.trackDatas.some(e=>e.type===`video`),hasAudio:this.trackDatas.some(e=>e.type===`audio`),codecStrings:e})}getVideoTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;Zh(n,e.source._codec),G(n),G(n.decoderConfig);let i={...n.decoderConfig};G(i.codedWidth!==void 0),G(i.codedHeight!==void 0);let a=!1;if(e.source._codec===`avc`&&!i.description){if(!t)throw Error(`No AVC description provided; you must therefore provide a priming packet.`);let e=Im(t.data);if(!e)throw Error(`Couldn't extract an AVCDecoderConfigurationRecord from the AVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.264) when not providing a description, or provide a description (must be an AVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in AVCC format.`);i.description=Lm(e),a=!0}else if(e.source._codec===`hevc`&&!i.description){if(!t)throw Error(`No HEVC description provided; you must therefore provide a priming packet.`);let e=Wm(t.data);if(!e)throw Error(`Couldn't extract an HEVCDecoderConfigurationRecord from the HEVC packet. Make sure the packets are in Annex B format (as specified in ITU-T-REC-H.265) when not providing a description, or provide a description (must be an HEVCDecoderConfigurationRecord as specified in ISO 14496-15) and ensure the packets are in HEVC format.`);i.description=Qm(e),a=!0}let o=Kp(1/(e.metadata.frameRate??57600),1e6).den,s=i.displayAspectWidth,c=i.displayAspectHeight,l=s===void 0||c===void 0?{num:1,den:1}:om({num:s*i.codedHeight,den:c*i.codedWidth}),u=i.codec===`ap4h`||i.codec===`ap4x`,d={muxer:this,track:e,type:`video`,info:{width:i.codedWidth,height:i.codedHeight,pixelAspectRatio:l,decoderConfig:i,requiresAnnexBTransformation:a,hasAlphaChannel:u},timescale:o,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0};return this.trackDatas.push(d),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),d}getAudioTrackData(e,t,n){let r=this.trackDatas.find(t=>t.track===e);if(r)return r;$h(n,e.source._codec),G(n),G(n.decoderConfig);let i={...n.decoderConfig},a=!1;if(e.source._codec===`aac`&&!i.description){if(!t)throw Error(`No AAC description provided; you must therefore provide a priming packet.`);let e=ig(Kg.tempFromBytes(t.data));if(!e)throw Error(`Couldn't parse ADTS header from the AAC packet. Make sure the packets are in ADTS format (as specified in ISO 13818-7) when not providing a description, or provide a description (must be an AudioSpecificConfig as specified in ISO 14496-3) and ensure the packets are raw AAC data.`);let n=ym[e.samplingFrequencyIndex],r=bm[e.channelConfiguration];if(n===void 0||r===void 0)throw Error(`Invalid ADTS frame header.`);i.description=xm({objectType:e.objectType,outputSampleRate:n,outputNumberOfChannels:r}),a=!0}if(!t){if(e.source._codec===`ac3`||e.source._codec===`eac3`)throw Error(`AC-3/E-AC-3 require a priming packet.`);if(e.source._codec===`dts`)throw Error(`DTS requires a priming packet.`)}let o={muxer:this,track:e,type:`audio`,info:{numberOfChannels:n.decoderConfig.numberOfChannels,sampleRate:n.decoderConfig.sampleRate,decoderConfig:i,requiresPcmTransformation:!this.isFragmented&&Eh.includes(e.source._codec),expectedNextPcmPacketTimestamp:null,requiresAdtsStripping:a,primingPacket:t},timescale:i.sampleRate,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0};return this.trackDatas.push(o),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),o}getSubtitleTrackData(e,t){let n=this.trackDatas.find(t=>t.track===e);if(n)return n;eg(t),G(t),G(t.config);let r={muxer:this,track:e,type:`subtitle`,info:{config:t.config},timescale:1e3,samples:[],sampleQueue:[],timestampProcessingQueue:[],timeToSampleTable:[],compositionTimeOffsetTable:[],lastTimescaleUnits:null,lastSample:null,startTimestampOffset:null,finalizedChunks:[],currentChunk:null,compactlyCodedChunkTable:[],closed:!1,avgBitrate:e.source._nominalBitrate??e.metadata.averageBitrate??0,maxBitrate:e.source._nominalBitrate??e.metadata.bitrate??0,lastCueEndTimestamp:null,cueQueue:[],nextSourceId:0,cueToSourceId:new WeakMap};return this.trackDatas.push(r),this.trackDatas.sort((e,t)=>e.track.id-t.track.id),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),r}async addEncodedVideoPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getVideoTrackData(e,t,n),i=t.data;if(r.info.requiresAnnexBTransformation){let e=[...Am(i)].map(e=>i.subarray(e.offset,e.offset+e.length));if(e.length===0)throw Error(`Failed to transform packet data. Make sure all packets are provided in Annex B format, as specified in ITU-T-REC-H.264 and ITU-T-REC-H.265.`);i=Fm(e,4)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=this.createSampleForTrack(r,i,t.timestamp,t.duration,t.type);await this.registerSample(r,a)}finally{r()}}async addEncodedAudioPacket(e,t,n){let r=await this.mutex.acquire();try{let r=this.getAudioTrackData(e,t,n),i=t.data;if(r.info.requiresAdtsStripping){let e=ig(Kg.tempFromBytes(i));if(!e)throw Error(`Expected ADTS frame, didn't get one.`);let t=e.crcCheck===null?7:9;i=i.subarray(t)}this.validateTimestamp(r.track,t.timestamp,t.type===`key`);let a=t.timestamp,o=t.duration;if(r.info.requiresPcmTransformation){let e=Uh(r.info.decoderConfig.codec).sampleSize*r.info.numberOfChannels;if(o=i.byteLength/e/r.info.sampleRate,r.info.expectedNextPcmPacketTimestamp!==null){let e=a-r.info.expectedNextPcmPacketTimestamp;if(e<.01)a=r.info.expectedNextPcmPacketTimestamp;else{let t=await this.padWithSilence(r,r.info.expectedNextPcmPacketTimestamp,e);a=r.info.expectedNextPcmPacketTimestamp+t}}r.info.expectedNextPcmPacketTimestamp=a+o}let s=this.createSampleForTrack(r,i,a,o,t.type);await this.registerSample(r,s)}finally{r()}}async padWithSilence(e,t,n){let r=$(n,e.timescale);if(n=r/e.timescale,r>0){let{sampleSize:i,silentValue:a}=Uh(e.info.decoderConfig.codec),o=r*e.info.numberOfChannels,s=new Uint8Array(i*o).fill(a),c=this.createSampleForTrack(e,new Uint8Array(s.buffer),t,n,`key`);await this.registerSample(e,c)}return n}async addSubtitleCue(e,t,n){let r=await this.mutex.acquire();try{let r=this.getSubtitleTrackData(e,n);this.validateTimestamp(r.track,t.timestamp,!0),e.source._codec===`webvtt`&&(r.cueQueue.push(t),await this.processWebVTTCues(r,t.timestamp))}finally{r()}}async processWebVTTCues(e,t){for(;e.cueQueue.length>0;){e.lastCueEndTimestamp??=Math.min(0,e.cueQueue[0].timestamp);let n=new Set([]);for(let r of e.cueQueue)G(r.timestamp<=t),G(e.lastCueEndTimestamp<=r.timestamp+r.duration),n.add(Math.max(r.timestamp,e.lastCueEndTimestamp)),n.add(r.timestamp+r.duration);let r=[...n].sort((e,t)=>e-t),i=r[0],a=r[1]??i;if(t<a)break;if(e.lastCueEndTimestamp<i){this.auxWriter.seek(0);let t=yv();this.auxBoxWriter.writeBox(t);let n=this.auxTarget._getSlice(0,this.auxWriter.getPos()),r=this.createSampleForTrack(e,n,e.lastCueEndTimestamp,i-e.lastCueEndTimestamp,`key`);await this.registerSample(e,r),e.lastCueEndTimestamp=i}this.auxWriter.seek(0);for(let t=0;t<e.cueQueue.length;t++){let n=e.cueQueue[t];if(n.timestamp>=a)break;Xg.lastIndex=0;let r=Xg.test(n.text),o=n.timestamp+n.duration,s=e.cueToSourceId.get(n);if(s===void 0&&a<o&&(s=e.nextSourceId++,e.cueToSourceId.set(n,s)),n.notes){let e=xv(n.notes);this.auxBoxWriter.writeBox(e)}let c=bv(n.text,r?i:null,n.identifier??null,n.settings??null,s??null);this.auxBoxWriter.writeBox(c),o===a&&e.cueQueue.splice(t--,1)}let o=this.auxTarget._getSlice(0,this.auxWriter.getPos()),s=this.createSampleForTrack(e,o,i,a-i,`key`);await this.registerSample(e,s),e.lastCueEndTimestamp=a}}createSampleForTrack(e,t,n,r,i){return{timestamp:n,decodeTimestamp:n,duration:r,data:t,size:t.byteLength,type:i,timescaleUnitsToNextSample:$(r,e.timescale)}}processTimestamps(e,t){if(e.timestampProcessingQueue.length===0)return;if(e.type===`audio`&&e.info.requiresPcmTransformation){G(!this.isFragmented),e.startTimestampOffset??=e.timestampProcessingQueue[0].timestamp;let t=0;for(let n=0;n<e.timestampProcessingQueue.length;n++){let r=e.timestampProcessingQueue[n],i=$(r.duration,e.timescale);t+=i}if(e.timeToSampleTable.length===0)e.timeToSampleTable.push({sampleCount:t,sampleDelta:1});else{let n=_p(e.timeToSampleTable);n.sampleCount+=t}e.timestampProcessingQueue.length=0;return}let n=e.timestampProcessingQueue.map(e=>e.timestamp).sort((e,t)=>e-t);this.isFragmented?e.startTimestampOffset??=Math.min(n[0],0):e.startTimestampOffset??=n[0];for(let t=0;t<e.timestampProcessingQueue.length;t++){let r=e.timestampProcessingQueue[t];r.decodeTimestamp=n[t];let i=$(r.timestamp-r.decodeTimestamp,e.timescale),a=$(r.duration,e.timescale);if(e.lastTimescaleUnits!==null){G(e.lastSample);let t=$(r.decodeTimestamp,e.timescale,!1),n=Math.round(t-e.lastTimescaleUnits);if(G(n>=0),e.lastTimescaleUnits+=n,e.lastSample.timescaleUnitsToNextSample=n,!this.isFragmented){let t=_p(e.timeToSampleTable);if(G(t),t.sampleCount===1){t.sampleDelta=n;let r=e.timeToSampleTable[e.timeToSampleTable.length-2];r&&r.sampleDelta===n&&(r.sampleCount++,e.timeToSampleTable.pop(),t=r)}else t.sampleDelta!==n&&(t.sampleCount--,e.timeToSampleTable.push(t={sampleCount:1,sampleDelta:n}));t.sampleDelta===a?t.sampleCount++:e.timeToSampleTable.push({sampleCount:1,sampleDelta:a});let r=_p(e.compositionTimeOffsetTable);G(r),r.sampleCompositionTimeOffset===i?r.sampleCount++:e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i})}}else e.lastTimescaleUnits=$(r.decodeTimestamp,e.timescale,!1),this.isFragmented||(e.timeToSampleTable.push({sampleCount:1,sampleDelta:a}),e.compositionTimeOffsetTable.push({sampleCount:1,sampleCompositionTimeOffset:i}));e.lastSample=r}if(e.timestampProcessingQueue.length=0,G(e.lastSample),G(e.lastTimescaleUnits!==null),t!==void 0&&e.lastSample.timescaleUnitsToNextSample===0){G(t.type===`key`);let n=$(t.timestamp,e.timescale,!1),r=Math.round(n-e.lastTimescaleUnits);e.lastSample.timescaleUnitsToNextSample=r}}async registerSample(e,t){t.type===`key`&&this.processTimestamps(e,t),e.timestampProcessingQueue.push(t),this.isFragmented?(e.sampleQueue.push(t),await this.interleaveSamples()):this.fastStart===`reserve`?await this.registerSampleFastStartReserve(e,t):await this.addSampleToTrack(e,t)}async addSampleToTrack(e,t){if(!this.isFragmented&&(e.samples.push(t),this.fastStart===`reserve`)){let t=e.track.metadata.maximumPacketCount;if(G(t!==void 0),e.samples.length>t)throw Error(`Track #${e.track.id} has already reached the maximum packet count (${t}). Either add less packets or increase the maximum packet count.`)}let n=!1;if(!e.currentChunk)n=!0;else{e.currentChunk.startTimestamp=Math.min(e.currentChunk.startTimestamp,t.timestamp);let r=t.timestamp-e.currentChunk.startTimestamp;if(this.isFragmented){let i=this.trackDatas.every(n=>{if(e===n)return t.type===`key`;let r=n.sampleQueue[0];return r?r.type===`key`:n.closed});r>=this.minimumFragmentDuration&&i&&t.timestamp>this.maxWrittenTimestamp&&(n=!0,await this.finalizeFragment())}else n=r>=.5}n&&(e.currentChunk&&await this.finalizeCurrentChunk(e),e.currentChunk={startTimestamp:t.timestamp,samples:[],offset:null,moofOffset:null,trafIndex:null}),G(e.currentChunk),e.currentChunk.samples.push(t),this.isFragmented&&(this.maxWrittenTimestamp=Math.max(this.maxWrittenTimestamp,t.timestamp),this.maxWrittenEndTimestamp=Math.max(this.maxWrittenEndTimestamp,t.timestamp+t.duration),this.minWrittenTimestamp=Math.min(this.minWrittenTimestamp,t.timestamp))}async finalizeCurrentChunk(e){if(G(!this.isFragmented),G(this.writer),!e.currentChunk)return;e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk);let t=e.currentChunk.samples.length;if(e.type===`audio`&&e.info.requiresPcmTransformation&&(t=e.currentChunk.samples.reduce((t,n)=>t+$(n.duration,e.timescale),0)),(e.compactlyCodedChunkTable.length===0||_p(e.compactlyCodedChunkTable).samplesPerChunk!==t)&&e.compactlyCodedChunkTable.push({firstChunk:e.finalizedChunks.length,samplesPerChunk:t}),this.fastStart===`in-memory`)e.currentChunk.offset=0;else{e.currentChunk.offset=this.writer.getPos();for(let t of e.currentChunk.samples)G(t.data),this.writer.write(t.data),t.data=null;await this.writer.flush()}}async interleaveSamples(e=!1){if(G(this.isFragmented),e||this.allTracksAreKnown())outer:for(;;){let t=null,n=1/0;for(let r of this.trackDatas){if(!e&&r.sampleQueue.length===0&&!r.closed)break outer;r.sampleQueue.length>0&&r.sampleQueue[0].timestamp<n&&(t=r,n=r.sampleQueue[0].timestamp)}if(!t)break;let r=t.sampleQueue.shift();await this.addSampleToTrack(t,r)}}async finalizeFragment(e=!this.isCmaf){if(G(this.isFragmented),!this.wroteFragmentedHeader){this.wroteFragmentedHeader=!0;let e=this.initBoxWriter??this.boxWriter;G(e),this.formatOptions.onMoov&&e.writer.startTrackingWrites(),this.ensureOneEnabledTrack();let t=g_(this);if(e.writeBox(t),this.formatOptions.onMoov){let{data:t,start:n}=e.writer.stopTrackingWrites();this.formatOptions.onMoov(t,n)}if(this.isCmaf){G(this.initWriter),await this.initWriter.flush(),await this.initWriter.finalize(),this.writer=await this.output._getRootWriter(!0),this.boxWriter=new Qg(this.writer);let e=this.boxWriter.measureBox(f_()),t=this.boxWriter.measureBox(p_(this,0));this.segmentHeaderSize=e+t,this.writer.seek(this.segmentHeaderSize)}}G(this.writer),G(this.boxWriter);let t=this.trackDatas.filter(e=>e.currentChunk);if(t.length===0){e&&await this.writer.flush();return}let n=this.nextFragmentNumber++,r=lv(n,t),i=this.writer.getPos(),a=i+this.boxWriter.measureBox(r),o=a+8,s=1/0;for(let e=0;e<t.length;e++){let n=t[e];G(n.currentChunk),G(n.startTimestampOffset!==null),n.currentChunk.offset=o,n.currentChunk.moofOffset=i,n.currentChunk.trafIndex=e,n.currentChunk.startTimestamp-=n.startTimestampOffset;for(let e of n.currentChunk.samples)o+=e.size,e.timestamp-=n.startTimestampOffset,e.decodeTimestamp-=n.startTimestampOffset;s=Math.min(s,n.currentChunk.startTimestamp)}let c=o-a,l=c>=2**32;if(l)for(let e of t)e.currentChunk.offset+=8;this.formatOptions.onMoof&&this.writer.startTrackingWrites();let u=lv(n,t);if(this.boxWriter.writeBox(u),this.formatOptions.onMoof){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoof(e,t,s)}G(this.writer.getPos()===a),this.formatOptions.onMdat&&this.writer.startTrackingWrites();let d=m_(l);d.size=c,this.boxWriter.writeBox(d),this.writer.seek(a+(l?16:8));for(let e of t)for(let t of e.currentChunk.samples)this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}for(let e of t)e.finalizedChunks.push(e.currentChunk),this.finalizedChunks.push(e.currentChunk),e.currentChunk=null;e&&await this.writer.flush()}async registerSampleFastStartReserve(e,t){this.allTracksAreKnown()?(this.mdat||await this.createFastStartReserveMdat(),await this.addSampleToTrack(e,t)):e.sampleQueue.push(t)}async createFastStartReserveMdat(){G(this.writer),G(this.boxWriter),this.ensureOneEnabledTrack();let e=g_(this),t=this.boxWriter.measureBox(e)+this.computeSampleTableSizeUpperBound()+4096;G(this.ftypSize!==null),this.writer.seek(this.ftypSize+t),this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat=m_(!0),this.boxWriter.writeBox(this.mdat);for(let e of this.trackDatas){for(let t of e.sampleQueue)await this.addSampleToTrack(e,t);e.sampleQueue.length=0}}computeSampleTableSizeUpperBound(){G(this.fastStart===`reserve`);let e=0;for(let t of this.trackDatas){let n=t.track.metadata.maximumPacketCount;G(n!==void 0),e+=8*Math.ceil(2/3*n),e+=4*n,e+=8*Math.ceil(2/3*n),e+=12*Math.ceil(2/3*n),e+=4*n,e+=8*n}return e}async onTrackClose(e){let t=await this.mutex.acquire(),n=this.trackDatas.find(t=>t.track===e);n&&(n.closed=!0,n.type===`subtitle`&&e.source._codec===`webvtt`&&await this.processWebVTTCues(n,1/0),this.processTimestamps(n)),this.allTracksAreKnown()&&this.allTracksKnown.resolve(),this.isFragmented&&await this.interleaveSamples(),t()}ensureOneEnabledTrack(){for(let e of[`video`,`audio`,`subtitle`]){let t=this.trackDatas.filter(t=>t.type===e);if(t.length!==0&&!t.some(e=>e.track.metadata.disposition?.default!==!1)){let e=t[0];e.track.metadata.disposition={...e.track.metadata.disposition,default:!0}}}}async forceFragmentFinalization(){G(this.isFragmented);let e=await this.mutex.acquire();try{for(let e of this.trackDatas)e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);await this.interleaveSamples(!0),await this.finalizeFragment()}finally{e()}}async finalize(){let e=await this.mutex.acquire();this.allTracksKnown.resolve(),this.ensureOneEnabledTrack(),!this.mdat&&this.fastStart===`reserve`&&await this.createFastStartReserveMdat();for(let e of this.trackDatas)e.closed=!0,e.type===`subtitle`&&e.track.source._codec===`webvtt`&&await this.processWebVTTCues(e,1/0),this.processTimestamps(e);if(this.isFragmented)await this.interleaveSamples(!0),await this.finalizeFragment(!1);else for(let e of this.trackDatas){await this.finalizeCurrentChunk(e);let t=qv(e);if(t>0){let n=0;for(let t of e.samples)n+=t.size;e.avgBitrate=Math.round(8*n/t)}else e.avgBitrate=0;let n=0,r=0,i=0;for(let t=0;t<e.samples.length;t++){let a=e.samples[t];for(r+=a.size;a.decodeTimestamp-e.samples[n].decodeTimestamp>=1;)r-=e.samples[n].size,n++;i=Math.max(i,r)}if(e.maxBitrate=8*i,e.startTimestampOffset!==null)for(let t=0;t<e.samples.length;t++){let n=e.samples[t];n.timestamp-=e.startTimestampOffset,n.decodeTimestamp-=e.startTimestampOffset}}if(G(this.writer),G(this.boxWriter),this.fastStart===`in-memory`){this.mdat=m_(!1);let e;for(let t=0;t<2;t++){let t=g_(this),n=this.boxWriter.measureBox(t);e=this.boxWriter.measureBox(this.mdat);let r=this.writer.getPos()+n+e;for(let t of this.finalizedChunks){t.offset=r;for(let{data:n}of t.samples)G(n),r+=n.byteLength,e+=n.byteLength}if(r<2**32)break;e>=2**32&&(this.mdat.largeSize=!0)}this.formatOptions.onMoov&&this.writer.startTrackingWrites();let t=g_(this);if(this.boxWriter.writeBox(t),this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}this.formatOptions.onMdat&&this.writer.startTrackingWrites(),this.mdat.size=e,this.boxWriter.writeBox(this.mdat);for(let e of this.finalizedChunks)for(let t of e.samples)G(t.data),this.writer.write(t.data),t.data=null;if(this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}}else if(this.isFragmented){if(this.isCmaf){let e=this.segmentHeaderSize===null?0:this.writer.getPos()-this.segmentHeaderSize;this.writer.seek(0),this.boxWriter.writeBox(f_()),this.boxWriter.writeBox(p_(this,e))}else{let e=this.writer.getPos(),t=gv(this.trackDatas);this.boxWriter.writeBox(t);let n=this.writer.getPos()-e;this.writer.seek(this.writer.getPos()-4),this.boxWriter.writeU32(n)}}else{G(this.mdat);let e=this.boxWriter.offsets.get(this.mdat);G(e!==void 0);let t=this.writer.getPos()-e;if(this.mdat.size=t,this.mdat.largeSize=t>=2**32,this.boxWriter.patchBox(this.mdat),this.formatOptions.onMdat){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMdat(e,t)}let n=g_(this);if(this.fastStart===`reserve`){G(this.ftypSize!==null),this.writer.seek(this.ftypSize),this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);let e=this.boxWriter.offsets.get(this.mdat)-this.writer.getPos();this.boxWriter.writeBox(h_(e))}else this.formatOptions.onMoov&&this.writer.startTrackingWrites(),this.boxWriter.writeBox(n);if(this.formatOptions.onMoov){let{data:e,start:t}=this.writer.stopTrackingWrites();this.formatOptions.onMoov(e,t)}}e()}},Yv=function(e,t,n){if(t!=null){if(typeof t!=`object`&&typeof t!=`function`)throw TypeError(`Object expected.`);var r,i;if(n){if(!Symbol.asyncDispose)throw TypeError(`Symbol.asyncDispose is not defined.`);r=t[Symbol.asyncDispose]}if(r===void 0){if(!Symbol.dispose)throw TypeError(`Symbol.dispose is not defined.`);r=t[Symbol.dispose],n&&(i=r)}if(typeof r!=`function`)throw TypeError(`Object not disposable.`);i&&(r=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:r,async:n})}else n&&e.stack.push({async:!0});return t},Xv=(function(e){return function(t){function n(n){t.error=t.hasError?new e(n,t.error,`An error was suppressed during disposal.`):n,t.hasError=!0}var r,i=0;function a(){for(;r=t.stack.pop();)try{if(!r.async&&i===1)return i=0,t.stack.push(r),Promise.resolve().then(a);if(r.dispose){var e=r.dispose.call(r.value);if(r.async)return i|=2,Promise.resolve(e).then(a,function(e){return n(e),a()})}else i|=1}catch(e){n(e)}if(i===1)return t.hasError?Promise.reject(t.error):Promise.resolve();if(t.hasError)throw t.error}return a()}})(typeof SuppressedError==`function`?SuppressedError:function(e,t,n){var r=Error(n);return r.name=`SuppressedError`,r.error=e,r.suppressed=t,r}),Zv=class{constructor(){this._connectedTrack=null,this._closingPromise=null,this._closed=!1,this._nominalBitrate=null}_ensureValidAdd(){if(!this._connectedTrack)throw Error(`Source is not connected to an output track.`);if(this._connectedTrack.output.state===`canceled`)throw Error(`Output has been canceled.`);if(this._connectedTrack.output.state===`finalizing`||this._connectedTrack.output.state===`finalized`)throw Error(`Output has been finalized.`);if(this._connectedTrack.output.state===`pending`)throw Error(`Output has not started.`);if(this._closed)throw Error(`Source is closed.`)}async _start(){}async _flushAndClose(e){}close(){if(this._closingPromise)return;let e=this._connectedTrack;if(!e)throw Error(`Cannot call close without connecting the source to an output track.`);if(e.output.state===`pending`)throw Error(`Cannot call close before output has been started.`);this._closingPromise=(async()=>{await this._flushAndClose(!1),this._closed=!0,e.output.state!==`finalizing`&&e.output.state!==`finalized`&&e.output._muxer.onTrackClose(e)})()}async _flushOrWaitForOngoingClose(e){return this._closingPromise??=(async()=>{await this._flushAndClose(e),this._closed=!0})()}},Qv=class extends Zv{constructor(e){if(super(),!Th.includes(e))throw TypeError(`Invalid video codec '${e}'. Must be one of: ${Th.join(`, `)}.`);this._codec=e}},$v=(e,t)=>{if(e.metadata.hasOnlyKeyPackets&&t.type!==`key`)throw Error(`Cannot add non-key packets to a hasOnlyKeyPackets video track.`)},ey=class{setError(e){this.errorSet||=(this.error=e,!0)}constructor(e,t){this.source=e,this.encodingConfig=t,this.ensureEncoderPromise=null,this.encoderInitialized=!1,this.encoder=null,this.encoderConfig=null,this.encodersReclaimed=!1,this.muxer=null,this.lastMultipleOfKeyFrameInterval=-1,this.emittedEncoderPackets=0,this.codedWidth=null,this.codedHeight=null,this.outputWidth=null,this.outputHeight=null,this.frameRateLastSample=null,this.frameRateLastTimestamp=null,this.frameRateLastEndTimestamp=null,this.preciseTimings=[],this.customEncoder=null,this.customEncoderCallSerializer=new qp,this.customEncoderQueueSize=0,this.defaultEncodeOptions={},this.alphaEncoder=null,this.splitter=null,this.splitterCreationFailed=!1,this.alphaFrameQueue=[],this.error=null,this.errorSet=!1,this.lastMuxerPromise=Promise.resolve(),this.closed=!1}async add(e,t,n){let r=e;try{this.checkForEncoderError(),this.source._ensureValidAdd();let i=this.encodingConfig,a=i.sizeChangeBehavior??`deny`,o=!1;if(this.codedWidth!==null&&this.codedHeight!==null){if((e.codedWidth!==this.codedWidth||e.codedHeight!==this.codedHeight)&&(o=!0,a===`deny`))throw Error(`Video sample size must remain constant. Expected ${this.codedWidth}x${this.codedHeight}, got ${e.codedWidth}x${e.codedHeight}. To allow the sample size to change over time, set \`sizeChangeBehavior\` to a value other than 'deny' in the encoding options.`)}else this.codedWidth=e.codedWidth,this.codedHeight=e.codedHeight;if(i.transform?.width!==void 0||i.transform?.height!==void 0||i.transform?.rotate!==void 0||i.transform?.flip!==void 0||i.transform?.crop!==void 0||i.transform?.force===!0||o&&a!==`passThrough`){let n=i.transform?.width,r=i.transform?.height,s=i.transform?.fit??`fill`;o&&a!==`passThrough`&&(G(this.outputWidth),G(this.outputHeight),G(a!==`deny`),n=this.outputWidth,r=this.outputHeight,s=a);let c=await e.transform({width:n,height:r,roundDimensionsTo:2,crop:i.transform?.crop,rotate:i.transform?.rotate,flip:i.transform?.flip,fit:s,alpha:i.alpha});(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=c.displayWidth,this.outputHeight=c.displayHeight),t&&e.close(),e=c,t=!0}else(this.outputWidth===null||this.outputHeight===null)&&(this.outputWidth=e.codedWidth,this.outputHeight=e.codedHeight);let s=i.transform?.frameRate;if(s!==void 0){let i=e.timestamp+e.duration,a=Vp(e.timestamp,s);if(this.frameRateLastSample!==null){if(a<=this.frameRateLastTimestamp){this.frameRateLastSample.close(),this.frameRateLastSample=e.clone(),this.frameRateLastEndTimestamp=i;return}await this.padFrameRate(a,n)}e===r&&(e=e.clone(),t=!0),e.setTimestamp(a),e.setDuration(1/s),this.frameRateLastSample?.close(),this.frameRateLastSample=e.clone(),this.frameRateLastTimestamp=a,this.frameRateLastEndTimestamp=i}await this.processAndEncode(e,n)}finally{t&&e.close()}}async processAndEncode(e,t){let n=this.encodingConfig,r;if(n.transform?.process){let t=n.transform.process(e);if(tm(t)&&(t=await t),t===null)return;Array.isArray(t)||(t=[t]);let i=[];try{for(let n of t)n instanceof pg?i.push(n):typeof VideoFrame<`u`&&n instanceof VideoFrame?i.push(new pg(n)):i.push(new pg(n,{timestamp:e.timestamp,duration:e.duration}))}catch(n){for(let t of i)t!==e&&t.close();for(let n of t)(n instanceof pg&&n!==e||typeof VideoFrame<`u`&&n instanceof VideoFrame)&&n.close();throw n}r=i}else r=[e];try{for(let e of r){if(this.encoderInitialized||(this.ensureEncoderPromise||this.ensureEncoder(e),this.encoderInitialized||await this.ensureEncoderPromise),G(this.encoderInitialized),this.closed)break;this.encodersReclaimed&&this.recreateWebCodecsEncoders();let n=this.encodingConfig.keyFrameInterval??2,r=Math.floor(e.timestamp/n),i={...this.defaultEncodeOptions,...e.encodeOptions,...t},a={...i,keyFrame:i.keyFrame===void 0?n===0||r!==this.lastMultipleOfKeyFrameInterval:i.keyFrame};if(this.lastMultipleOfKeyFrameInterval=r,this.encodingConfig.onEncodedSample?.(e),this.customEncoder){this.customEncoderQueueSize++;let t=e.clone(),n=this.customEncoderCallSerializer.call(()=>this.customEncoder.encode(t,a)).catch(e=>this.setError(e)).finally(()=>{this.customEncoderQueueSize--,t.close()});this.customEncoderQueueSize>=4&&await n}else{G(this.encoder);let t=e.toVideoFrame(),n=Np(this.preciseTimings,t.timestamp,e=>e.microsecondTimestamp),r=n===-1?null:this.preciseTimings[n];if(r&&r.microsecondTimestamp===t.timestamp?(r.timestamp!==e.timestamp&&(r.timestampIsValid=!1),r.duration!==e.duration&&(r.durationIsValid=!1)):(this.preciseTimings.splice(n+1,0,{microsecondTimestamp:t.timestamp,timestamp:e.timestamp,duration:e.duration,timestampIsValid:!0,durationIsValid:!0}),this.preciseTimings.length>128&&this.preciseTimings.shift()),!this.alphaEncoder)try{this.encoder.encode(t,a)}finally{t.close()}else if(t.format&&!t.format.includes(`A`)||this.splitterCreationFailed){this.alphaFrameQueue.push(null);try{this.encoder.encode(t,a)}finally{t.close()}}else{this.splitter||=new ny;let{colorFrame:e,alphaFrame:n}=await this.splitter.split(t);this.alphaFrameQueue.push(n);try{this.encoder.encode(e,a)}finally{e.close()}}this.encoder.encodeQueueSize>=4&&await new Promise(e=>this.encoder.addEventListener(`dequeue`,e,{once:!0}))}await this.lastMuxerPromise}}finally{for(let t of r)t!==e&&t.close()}}async padFrameRate(e,t){let n=this.encodingConfig.transform.frameRate;G(this.frameRateLastSample);let r=Math.round((e-this.frameRateLastTimestamp)*n);for(let e=1;e<r;e++){let r={stack:[],error:void 0,hasError:!1};try{let i=Yv(r,this.frameRateLastSample.clone(),!1);i.setTimestamp(this.frameRateLastTimestamp+e/n),i.setDuration(1/n),await this.processAndEncode(i,t)}catch(e){r.error=e,r.hasError=!0}finally{Xv(r)}}}ensureEncoder(e){this.ensureEncoderPromise=(async()=>{let t=Wg(this.encodingConfig.quality,this.encodingConfig.bitrate);G(t!==void 0);let n=Mg({...this.encodingConfig,quality:t,width:e.codedWidth,height:e.codedHeight,squarePixelWidth:e.squarePixelWidth,squarePixelHeight:e.squarePixelHeight,framerate:this.source._connectedTrack?.metadata.frameRate}),r=null,i;for(let e of n){let t=e.config;if(this.encodingConfig.onEncoderConfig?.(t),i=Gg.find(e=>e.supports(this.encodingConfig.codec,t)),i){r=e;break}if(typeof VideoEncoder<`u`){if(t.alpha=`discard`,this.encodingConfig.alpha===`keep`&&(t.latencyMode=`quality`),(t.width%2==1||t.height%2==1)&&(this.encodingConfig.codec===`avc`||this.encodingConfig.codec===`hevc`))throw Error(`The dimensions ${t.width}x${t.height} are not supported for codec '${this.encodingConfig.codec}'; both width and height must be even numbers. Make sure to round your dimensions to the nearest even number.`);try{if((await VideoEncoder.isConfigSupported(t)).supported){r=e;break}}catch{}}}if(!r){if(typeof VideoEncoder>`u`)throw Error(Qp(`VideoEncoder`));let e=n[0].config,t=n.map(({config:e,quantizer:t})=>t===null?`${e.bitrate} bps`:`quantizer ${t}`);throw Error(`This specific encoder configuration (${e.codec}, ${t.join(` / `)}, ${e.width}x${e.height}, hardware acceleration: ${e.hardwareAcceleration??`no-preference`}) is not supported in this environment. Consider using another codec or changing your video parameters.`)}let a=r.config;r.quantizer===null?this.source._nominalBitrate=a.bitrate??null:this.defaultEncodeOptions=Rg(this.encodingConfig.codec,r.quantizer),i?(this.customEncoder=new i,this.customEncoder.codec=this.encodingConfig.codec,this.customEncoder.config=a,this.customEncoder.onPacket=(e,t)=>{if(!(e instanceof ng))throw TypeError(`The first argument passed to onPacket must be an EncodedPacket.`);if(t!==void 0&&(!t||typeof t!=`object`))throw TypeError(`The second argument passed to onPacket must be an object or undefined.`);$v(this.source._connectedTrack,e),this.encodingConfig.onEncodedPacket?.(e,t),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,e,t).catch(e=>{this.setError(e)})},this.customEncoder.onError=e=>{this.setError(e)},await this.customEncoder.init()):(this.encoderConfig=a,this.createWebCodecsEncoders()),G(this.source._connectedTrack),this.muxer=this.source._connectedTrack.output._muxer,this.encoderInitialized=!0})()}createWebCodecsEncoders(){let e=this.encoderConfig;G(e);let t=[],n=[],r=0,i=0,a=(e,t)=>{$p(e)?this.encodersReclaimed=!0:(e.stack=t,this.setError(e))},o=Error(`Encoding error`).stack;if(this.encoder=new VideoEncoder({output:(e,a)=>{if(!this.alphaEncoder){this.addPacket(e,null,a);return}let o=this.alphaFrameQueue.shift();G(o!==void 0),o?(this.alphaEncoder.encode(o,{...this.defaultEncodeOptions,keyFrame:e.type===`key`}),i++,o.close(),t.push({chunk:e,meta:a})):i===0?this.addPacket(e,null,a):(n.push(r+i),t.push({chunk:e,meta:a}))},error:e=>a(e,o)}),this.encoder.configure(e),this.encodingConfig.alpha===`keep`){let o=Error(`Encoding error`).stack;this.alphaEncoder=new VideoEncoder({output:(e,a)=>{i--;let o=t.shift();for(G(o!==void 0),this.addPacket(o.chunk,e,o.meta),r++;n.length>0&&n[0]===r;){n.shift();let e=t.shift();G(e!==void 0),this.addPacket(e.chunk,null,e.meta)}},error:e=>a(e,o)}),this.alphaEncoder.configure(e)}}addPacket(e,t,n){let r={};if(t){let e=new Uint8Array(t.byteLength);t.copyTo(e),r.alpha=e}let i=ng.fromEncodedChunk(e,r),a=this.encoderConfig;G(a),n?.decoderConfig&&(n.decoderConfig.codec=Vh({width:a.width,height:a.height,codec:this.encodingConfig.codec,codecDescription:n.decoderConfig.description?xp(n.decoderConfig.description):null,colorSpace:n.decoderConfig.colorSpace??null,avcType:a.codec.includes(`avc1.`)?1:a.codec.includes(`avc3.`)?3:null,avcCodecInfo:this.encodingConfig.codec===`avc`&&!n.decoderConfig.description?Im(i.data):null,hevcCodecInfo:this.encodingConfig.codec===`hevc`&&!n.decoderConfig.description?Wm(i.data):null,vp9CodecInfo:this.encodingConfig.codec===`vp9`?th(i.data):null,av1CodecInfo:this.encodingConfig.codec===`av1`?rh(i.data):null,proresFormat:null}));let o=Np(this.preciseTimings,e.timestamp,e=>e.microsecondTimestamp),s=o===-1?null:this.preciseTimings[o],c=null;this.emittedEncoderPackets===0&&i.type===`delta`&&n?.decoderConfig&&(c=oh(this.encodingConfig.codec,n.decoderConfig,i.data)),(s&&s.microsecondTimestamp===e.timestamp||c!==null)&&(i=i.clone({timestamp:s?.timestampIsValid?s.timestamp:void 0,duration:s?.durationIsValid?s.duration:void 0,type:c??void 0})),$v(this.source._connectedTrack,i),this.encodingConfig.onEncodedPacket?.(i,n),this.lastMuxerPromise=this.muxer.addEncodedVideoPacket(this.source._connectedTrack,i,n).catch(e=>{this.setError(e)}),this.emittedEncoderPackets++}recreateWebCodecsEncoders(){G(this.encoder),this.encoder.state!==`closed`&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!==`closed`&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.encodersReclaimed=!1,this.lastMultipleOfKeyFrameInterval=-1,this.createWebCodecsEncoders()}async flushAndClose(e){try{if(!e&&(this.checkForEncoderError(),this.frameRateLastSample)){let e=this.encodingConfig.transform.frameRate,t=Vp(this.frameRateLastEndTimestamp,e);await this.padFrameRate(t)}this.closed=!0,e||(this.customEncoder?this.customEncoderCallSerializer.call(()=>this.customEncoder.flush()):this.encoder&&!this.encodersReclaimed&&(await this.encoder.flush(),await this.alphaEncoder?.flush(),await cm(25)))}finally{this.closed=!0,this.frameRateLastSample?.close(),this.frameRateLastSample=null,this.customEncoder?await this.customEncoderCallSerializer.call(()=>this.customEncoder.close()).catch(e=>this.setError(e)):this.encoder&&(this.encoder.state!==`closed`&&this.encoder.close(),this.alphaEncoder&&this.alphaEncoder.state!==`closed`&&this.alphaEncoder.close(),this.alphaFrameQueue.forEach(e=>e?.close()),this.alphaFrameQueue.length=0,this.splitter?.close())}e||this.checkForEncoderError()}getQueueSize(){return this.customEncoder?this.customEncoderQueueSize:this.encoder?.encodeQueueSize??0}checkForEncoderError(){if(this.errorSet)throw this.error}},ty=null,ny=class{constructor(){this.worker=null,this.pendingRequests=new Map,this.nextRequestId=0}split(e){if(!this.worker){if(!ty){let e=new Blob([`(${ry.toString()})()`],{type:`application/javascript`});ty=URL.createObjectURL(e)}this.worker=new Worker(ty),this.worker.addEventListener(`message`,e=>{let t=e.data,n=this.pendingRequests.get(t.id);n&&(this.pendingRequests.delete(t.id),`error`in t?n.reject(Error(t.error)):n.resolve({colorFrame:t.colorFrame,alphaFrame:t.alphaFrame}))}),this.worker.addEventListener(`error`,e=>{let t=Error(e.message||`Color/alpha splitter worker error.`);for(let e of this.pendingRequests.values())e.reject(t);this.pendingRequests.clear()})}let t=this.nextRequestId++,n=Pp();return this.pendingRequests.set(t,n),this.worker.postMessage({id:t,sourceFrame:e},{transfer:[e]}),n.promise}close(){this.worker?.terminate(),this.worker=null;let e=Error(`Color/alpha splitter closed.`);for(let t of this.pendingRequests.values())t.reject(e);this.pendingRequests.clear()}},ry=()=>{let e=null,t=Promise.resolve();self.addEventListener(`message`,e=>{let{id:r,sourceFrame:i}=e.data;t=t.then(async()=>{try{let{colorFrame:e,alphaFrame:t}=await n(i);self.postMessage({id:r,colorFrame:e,alphaFrame:t},{transfer:[e,t]})}catch(e){self.postMessage({id:r,error:e.message})}finally{i.close()}})});let n=async t=>{let n=t.format;if(!n)throw Error(`CPU color/alpha splitting requires a known VideoFrame format.`);let a=t.allocationSize();if((!e||e.byteLength!==a)&&(e=new Uint8Array(a)),await t.copyTo(e),n===`RGBA`||n===`BGRA`)return r(e,n,t);if(n===`I420A`||n===`I420AP10`||n===`I420AP12`||n===`I422A`||n===`I422AP10`||n===`I422AP12`||n===`I444A`||n===`I444AP10`||n===`I444AP12`)return i(e,n,t);throw Error(`CPU color/alpha splitting does not support format '${n}'.`)},r=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=r*i,o=a+Math.ceil(r/2)*Math.ceil(i/2)*2,s=new Uint8Array(o);for(let t=0,n=3;t<a;t++,n+=4)s[t]=e[n];s.fill(128,a);let c=new VideoFrame(e,{format:t===`RGBA`?`RGBX`:`BGRX`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),l={format:`I420`,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,colorSpace:{fullRange:!0,matrix:`bt709`,primaries:`bt709`,transfer:`bt709`},transfer:[s.buffer]};return{colorFrame:c,alphaFrame:new VideoFrame(s,l)}},i=(e,t,n)=>{let r=n.visibleRect?.width??n.codedWidth,i=n.visibleRect?.height??n.codedHeight,a=t.includes(`P10`),o=t.includes(`P12`),s=a||o?2:1,c,l;t.startsWith(`I420`)?(c=Math.ceil(r/2),l=Math.ceil(i/2)):t.startsWith(`I422`)?(c=Math.ceil(r/2),l=i):(c=r,l=i);let u=r*i,d=c*l,f=u*s,p=d*s,m=u*s,h=f+p*2,g=t.replace(`A`,``),_=Math.ceil(r/2)*Math.ceil(i/2),v=m+_*s*2,y=new Uint8Array(v),b=h;y.set(e.subarray(b,b+m),0);let x=m,S=a?512:o?2048:128;s===1?y.fill(S,x):new Uint16Array(y.buffer,x,2*_).fill(S);let C=a?`I420P10`:o?`I420P12`:`I420`,ee=new VideoFrame(e.subarray(0,h),{format:g,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0}),w={format:C,codedWidth:r,codedHeight:i,timestamp:n.timestamp,duration:n.duration??void 0,colorSpace:{fullRange:!0,matrix:`bt709`,primaries:`bt709`,transfer:`bt709`},transfer:[y.buffer]};return{colorFrame:ee,alphaFrame:new VideoFrame(y,w)}}},iy=class extends Qv{constructor(e){Ag(e),super(e.codec),this._encoder=new ey(this,e)}add(e,t){if(!(e instanceof pg))throw TypeError(`videoSample must be a VideoSample.`);return this._encoder.add(e,!1,t)}_flushAndClose(e){return this._encoder.flushAndClose(e)}},ay=class extends Zv{constructor(e){if(super(),!Oh.includes(e))throw TypeError(`Invalid audio codec '${e}'. Must be one of: ${Oh.join(`, `)}.`);this._codec=e}},oy=class extends Zv{constructor(e){if(super(),!kh.includes(e))throw TypeError(`Invalid subtitle codec '${e}'. Must be one of: ${kh.join(`, `)}.`);this._codec=e}},sy=class{get supportsVideoRotationMetadata(){return this.supportsVideoTransformationMetadata}getSupportedVideoCodecs(){return this.getSupportedCodecs().filter(e=>Th.includes(e))}getSupportedAudioCodecs(){return this.getSupportedCodecs().filter(e=>Oh.includes(e))}getSupportedSubtitleCodecs(){return this.getSupportedCodecs().filter(e=>kh.includes(e))}_codecUnsupportedHint(e){return``}_isFragmentedIsobmff(){return!1}},cy=class extends sy{constructor(e={}){if(!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(e.fastStart!==void 0&&![!1,`in-memory`,`reserve`,`fragmented`].includes(e.fastStart))throw TypeError(`options.fastStart, when provided, must be false, 'in-memory', 'reserve', or 'fragmented'.`);if(e.minimumFragmentDuration!==void 0&&(!im(e.minimumFragmentDuration)||e.minimumFragmentDuration<0))throw TypeError(`options.minimumFragmentDuration, when provided, must be a non-negative number.`);if(e.onFtyp!==void 0&&typeof e.onFtyp!=`function`)throw TypeError(`options.onFtyp, when provided, must be a function.`);if(e.onMoov!==void 0&&typeof e.onMoov!=`function`)throw TypeError(`options.onMoov, when provided, must be a function.`);if(e.onMdat!==void 0&&typeof e.onMdat!=`function`)throw TypeError(`options.onMdat, when provided, must be a function.`);if(e.onMoof!==void 0&&typeof e.onMoof!=`function`)throw TypeError(`options.onMoof, when provided, must be a function.`);if(e.metadataFormat!==void 0&&![`mdir`,`mdta`,`udta`,`auto`].includes(e.metadataFormat))throw TypeError(`options.metadataFormat, when provided, must be either 'auto', 'mdir', 'mdta', or 'udta'.`);super(),this._options=e}getSupportedTrackCounts(){let e=2**32-1;return{video:{min:0,max:e},audio:{min:0,max:e},subtitle:{min:0,max:e},total:{min:0,max:e}}}get supportsVideoTransformationMetadata(){return!0}get supportsTimestampedMediaData(){return!0}get negativeTimestampSupport(){return`full`}_createMuxer(e){return new Jv(e,this)}_isFragmentedIsobmff(){return this._options.fastStart===`fragmented`}},ly=class extends cy{constructor(e){super(e)}get _name(){return`MP4`}get fileExtension(){return`.mp4`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...Th,...Dh,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...kh]}_codecUnsupportedHint(e){return new dy().getSupportedCodecs().includes(e)?` Switching to MOV will grant support for this codec.`:``}},uy=class extends cy{constructor(e){super(e)}get _name(){return`CMAF`}get fileExtension(){return`.m4s`}get mimeType(){return`video/mp4`}getSupportedCodecs(){return[...Th,...Dh,`pcm-s16`,`pcm-s16be`,`pcm-s24`,`pcm-s24be`,`pcm-s32`,`pcm-s32be`,`pcm-f32`,`pcm-f32be`,`pcm-f64`,`pcm-f64be`,...kh]}},dy=class extends cy{constructor(e){super(e)}get _name(){return`MOV`}get fileExtension(){return`.mov`}get mimeType(){return`video/quicktime`}getSupportedCodecs(){return[...Th,...Oh]}_codecUnsupportedHint(e){return new ly().getSupportedCodecs().includes(e)?` Switching to MP4 will grant support for this codec.`:``}},fy=[`video`,`audio`,`subtitle`],py=class e{constructor(e,t,n,r,i){this.id=e,this.output=t,this.type=n,this.source=r,this.metadata=i}isVideoTrack(){return this.type===`video`}isAudioTrack(){return this.type===`audio`}isSubtitleTrack(){return this.type===`subtitle`}canBePairedWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrack.`);if(this===t)return!1;let n=lm(this.metadata.group),r=lm(t.metadata.group);for(let e of n)if(this.type!==t.type&&r.some(t=>e===t)||r.some(t=>e._pairedGroups.has(t)))return!0;return!1}},my=class extends py{constructor(e,t,n,r){super(e,t,`video`,n,r)}},hy=class extends py{constructor(e,t,n,r){super(e,t,`audio`,n,r)}},gy=class extends py{constructor(e,t,n,r){super(e,t,`subtitle`,n,r)}},_y=class e{constructor(){this._pairedGroups=new Set}pairWith(t){if(!(t instanceof e))throw TypeError(`other must be an OutputTrackGroup.`);if(this===t)throw TypeError(`Cannot pair a group with itself.`);this._pairedGroups.add(t),t._pairedGroups.add(this)}},vy=e=>{if(!e||typeof e!=`object`)throw TypeError(`metadata must be an object.`);if(e.languageCode!==void 0&&!Wp(e.languageCode))throw TypeError(`metadata.languageCode, when provided, must be a three-letter, ISO 639-2/T language code.`);if(e.name!==void 0&&typeof e.name!=`string`)throw TypeError(`metadata.name, when provided, must be a string.`);if(e.disposition!==void 0&&_m(e.disposition),e.maximumPacketCount!==void 0&&(!Number.isInteger(e.maximumPacketCount)||e.maximumPacketCount<0))throw TypeError(`metadata.maximumPacketCount, when provided, must be a non-negative integer.`);if(e.bitrate!==void 0&&(!Number.isFinite(e.bitrate)||e.bitrate<0))throw TypeError(`metadata.bitrate, when provided, must be a non-negative number.`);if(e.averageBitrate!==void 0&&(!Number.isFinite(e.averageBitrate)||e.averageBitrate<0))throw TypeError(`metadata.averageBitrate, when provided, must be a non-negative number.`);if(e.group!==void 0&&!(e.group instanceof _y)&&(!Array.isArray(e.group)||e.group.some(e=>!(e instanceof _y))))throw TypeError(`metadata.group, when provided, must be an OutputTrackGroup instance or an array of OutputTrackGroup instances.`)},yy=class extends um{get target(){let e=`Output.target cannot be used when using PathedTarget with an async callback. Use the 'target' event instead.`;if(this._rootTargetPromise)throw TypeError(e);let t=this._getRootTarget();if(tm(t))throw TypeError(e);return t}constructor(e){if(super(),this.state=`pending`,this.defaultTrackGroup=new _y,this.tracks=[],this._onFinalize=null,this._unfinalizedTargets=new Set,this._rootWriterPromise=null,this._startPromise=null,this._cancelPromise=null,this._finalizePromise=null,this._mutex=new Ap,this._metadataTags={},this._rootTarget=null,this._rootTargetPromise=null,this._firstMediaStreamTimestamp=null,!e||typeof e!=`object`)throw TypeError(`options must be an object.`);if(!(e.format instanceof sy))throw TypeError(`options.format must be an OutputFormat.`);if(!(e.target instanceof Rv||e.target instanceof Uv))throw TypeError(`options.target must be a Target or a PathedTarget.`);if(e.target instanceof Rv&&this._rememberTarget(e.target),e.initTarget!==void 0&&!(e.initTarget instanceof Rv)&&typeof e.initTarget!=`function`)throw Error(`options.initTarget, when provided, must be a Target or a function that returns or resolves to a Target.`);if(e.onFinalize!==void 0&&typeof e.onFinalize!=`function`)throw TypeError(`options.onFinalize, when provided, must be a function.`);this.format=e.format,this._target=e.target,this._onFinalize=e.onFinalize??null,this._initTarget=e.initTarget??null,this._initTarget instanceof Rv&&this._rememberTarget(this._initTarget),this._muxer=e.format._createMuxer(this)}_getTargetValidated(e){G(this._target instanceof Uv);let t=this._target.getTarget(e),n=e=>{if(!(e instanceof Rv))throw TypeError(`getTarget must return a Target.`);return e};return tm(t)?t.then(n):n(t)}async _getTarget(e){G(this._target instanceof Uv);let t=await this._getTargetValidated(e);return this._emit(`target`,{target:t,request:e,isRoot:e.isRoot}),this.state===`canceled`?await t._close():this._rememberTarget(t),t}_rememberTarget(e){this._unfinalizedTargets.add(e),e.on(`finalized`,()=>this._unfinalizedTargets.delete(e),{once:!0})}async _getInitTarget(){if(G(this._initTarget!==null),this._initTarget instanceof Rv)return this._initTarget;let e=await this._initTarget();return this.state===`canceled`?await e._close():this._rememberTarget(e),e}_hasInitTarget(){return this._initTarget!==null}_getRootTarget(){if(this._rootTarget)return this._rootTarget;if(this._rootTargetPromise)return this._rootTargetPromise;if(this._target instanceof Rv)return this._emit(`target`,{target:this._target,request:null,isRoot:!0}),this._rootTarget=this._target,this._target;let e={path:this._target.rootPath,isRoot:!0,mimeType:this.format.mimeType},t=this._getTargetValidated(e),n=t=>(this.state===`canceled`?t._close():this._rememberTarget(t),this._emit(`target`,{target:t,request:e,isRoot:!0}),this._rootTarget=t,t);return tm(t)?this._rootTargetPromise=t.then(n):n(t)}_getRootWriter(e){return this._rootWriterPromise??=(async()=>{let t=await this._getRootTarget(),n=new Lv(t,typeof e==`boolean`?e:e(t));return n.start(),n})()}addVideoTrack(e,t={}){if(!(e instanceof Qv))throw TypeError(`source must be a VideoSource.`);if(vy(t),t.rotation!==void 0&&![0,90,180,270].includes(t.rotation))throw TypeError(`Invalid video rotation: ${t.rotation}. Has to be 0, 90, 180 or 270.`);if(t.flip!==void 0&&typeof t.flip!=`boolean`)throw TypeError(`metadata.flip, when provided, must be a boolean.`);if(t.transformationMatrix!==void 0&&(!Array.isArray(t.transformationMatrix)||t.transformationMatrix.length!==9||!t.transformationMatrix.every(e=>Number.isFinite(e))))throw TypeError(`metadata.transformationMatrix, when provided, must be an array of 9 finite numbers.`);if(t.frameRate!==void 0&&(!Number.isFinite(t.frameRate)||t.frameRate<=0))throw TypeError(`Invalid video frame rate: ${t.frameRate}. Must be a positive number.`);if(t.hasOnlyKeyPackets!==void 0&&typeof t.hasOnlyKeyPackets!=`boolean`)throw TypeError(`metadata.hasOnlyKeyPackets, when provided, must be a boolean.`);if(t.canBeTransparent!==void 0&&typeof t.canBeTransparent!=`boolean`)throw TypeError(`metadata.canBeTransparent, when provided, must be a boolean.`);if(t.decoderConfig!==void 0&&Zh({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof ng))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new my(this.tracks.length+1,this,e,n))}addAudioTrack(e,t={}){if(!(e instanceof ay))throw TypeError(`source must be an AudioSource.`);if(vy(t),t.decoderConfig!==void 0&&$h({decoderConfig:t.decoderConfig},e._codec),t.primingPacket!==void 0){if(!(t.primingPacket instanceof ng))throw TypeError(`metadata.primingPacket, when provided, must be an EncodedPacket.`);if(t.decoderConfig===void 0)throw TypeError(`metadata.primingPacket can only be provided alongside metadata.decoderConfig.`)}let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new hy(this.tracks.length+1,this,e,n))}addSubtitleTrack(e,t={}){if(!(e instanceof oy))throw TypeError(`source must be a SubtitleSource.`);vy(t);let n={...t};return n.group??=this.defaultTrackGroup,this._addTrack(new gy(this.tracks.length+1,this,e,n))}setMetadataTags(e){if(gm(e),this.state!==`pending`)throw Error(`Cannot set metadata tags after output has been started or canceled.`);this._metadataTags=e}_addTrack(e){if(this.state!==`pending`)throw Error(`Cannot add track after output has been started or canceled.`);if(e.source._connectedTrack)throw Error(`Source is already used for a track.`);let t=this.format.getSupportedTrackCounts(),n=this.tracks.reduce((t,n)=>t+ +(n.type===e.type),0),r=t[e.type].max;if(n===r)throw Error(r===0?`${this.format._name} does not support ${e.type} tracks.`:`${this.format._name} does not support more than ${r} ${e.type} track${r===1?``:`s`}.`);let i=t.total.max;if(this.tracks.length===i)throw Error(`${this.format._name} does not support more than ${i} tracks${i===1?``:`s`} in total.`);if(e.isVideoTrack()){let t=this.format.getSupportedVideoCodecs();if(t.length===0)throw Error(`${this.format._name} does not support video tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported video codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isAudioTrack()){let t=this.format.getSupportedAudioCodecs();if(t.length===0)throw Error(`${this.format._name} does not support audio tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported audio codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}else if(e.isSubtitleTrack()){let t=this.format.getSupportedSubtitleCodecs();if(t.length===0)throw Error(`${this.format._name} does not support subtitle tracks.`+this.format._codecUnsupportedHint(e.source._codec));if(!t.includes(e.source._codec))throw Error(`Codec '${e.source._codec}' cannot be contained within ${this.format._name}. Supported subtitle codecs are: ${t.map(e=>`'${e}'`).join(`, `)}.`+this.format._codecUnsupportedHint(e.source._codec))}return this.tracks.push(e),e.source._connectedTrack=e,e}hasEnoughTracks(){let e=this.format.getSupportedTrackCounts();for(let t of fy)if(this.tracks.reduce((e,n)=>e+ +(n.type===t),0)<e[t].min)return!1;let t=e.total.min;return!(this.tracks.length<t)}async start(){let e=this.format.getSupportedTrackCounts();for(let t of fy){let n=this.tracks.reduce((e,n)=>e+ +(n.type===t),0),r=e[t].min;if(n<r)throw Error(r===e[t].max?`${this.format._name} requires exactly ${r} ${t} track${r===1?``:`s`}.`:`${this.format._name} requires at least ${r} ${t} track${r===1?``:`s`}.`)}let t=e.total.min;if(this.tracks.length<t)throw Error(t===e.total.max?`${this.format._name} requires exactly ${t} track${t===1?``:`s`}.`:`${this.format._name} requires at least ${t} track${t===1?``:`s`}.`);if(this.state===`canceled`)throw Error(`Output has been canceled.`);return this._startPromise?(pm._warn(`Output has already been started.`),this._startPromise):this._startPromise=(async()=>{this.state=`started`;let e=this._mutex.acquire();try{await this._muxer.start();let e=this.tracks.map(e=>e.source._start());await Promise.all(e)}finally{(await e)()}})()}getMimeType(){return this._muxer.getMimeType()}async cancel(){if(this.state===`canceled`)return this._cancelPromise??void 0;if(this.state===`finalizing`||this.state===`finalized`)this.state===`finalized`&&pm._warn(`Output has already been finalized.`);else return this._cancelPromise=(async()=>{this.state=`canceled`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!0));await Promise.all(e),await Promise.all([...this._unfinalizedTargets].map(e=>e._close())),this._unfinalizedTargets.clear()}finally{e()}})()}async finalize(){if(this.state===`pending`)throw Error(`Cannot finalize before starting.`);if(this.state===`canceled`)throw Error(`Cannot finalize after canceling.`);return this._finalizePromise?(pm._warn(`Output has already been finalized.`),this._finalizePromise):this._finalizePromise=(async()=>{this.state=`finalizing`;let e=await this._mutex.acquire();try{let e=this.tracks.map(e=>e.source._flushOrWaitForOngoingClose(!1));if(await Promise.all(e),await this._muxer.finalize(),this._rootWriterPromise){let e=await this._rootWriterPromise;e.finalized||(await e.flush(),await e.finalize())}this._onFinalize&&await this._onFinalize(),this.state=`finalized`}catch(e){throw this.state=`canceled`,e}finally{await Promise.all([...this._unfinalizedTargets].map(e=>e._close().catch(()=>{}))),this._unfinalizedTargets.clear(),e()}})()}},by=function(e){return e.LIGHT=`light`,e.DARK=`dark`,e.SOLARIZED=`solarized`,e}({}),xy=function(e){return e[e.IDLE=0]=`IDLE`,e[e.RECORDING=1]=`RECORDING`,e[e.ENCODING=2]=`ENCODING`,e[e.CLEANUP=3]=`CLEANUP`,e}({}),Sy=`data-video-dynamic`,Cy=`data-video-svg`,wy=`data-video-style`,Ty=`data-video-rerender`,Ey=`data-video-ignore`,Dy=class{constructor(e){this.app=e,this.exportWidth=0,this.exportHeight=0,this.canvasToImageMap=new Map,this.dynamicElementMap=new Map,this.dynamicSvgMap=new Map,this.rerenderMap=new Map,this.dynamicStyleMap=new Map,this.file=e.innerFile,this.exportedElement=e.exportedElement}getMuxingCanvas(){if(this.muxingCanvas)return this.muxingCanvas;let e=this.exportedElement.getBoundingClientRect(),t=new OffscreenCanvas(e.width,e.height);return this.muxingCanvas=t,this.muxingCanvas}getMuxingContext(){return this.muxingContext||(this.muxingCanvas===void 0&&this.getMuxingCanvas(),this.muxingContext=this.muxingCanvas.getContext(`2d`,{alpha:!1}),this.muxingContext.imageSmoothingEnabled=!1),this.muxingContext}async prepareExport(){let e=this.exportedElement;this.exportWidth=e.clientWidth,this.exportHeight=e.clientHeight,console.log(`[VideoRecorder] Preparing export...`,this.exportWidth,`x`,this.exportHeight);let t=e.cloneNode(!0);console.log(`[VideoRecorder] Inlining styles...`),this.inlineStylesRecursive(e,t),console.log(`[VideoRecorder] Flattening custom elements...`),this.flattenCustomElements(e,t),console.log(`[VideoRecorder] Removing ignored elements...`),this.removeIgnoredElements(t),console.log(`[VideoRecorder] Embedding images...`),await this.embedImages(t),console.log(`[VideoRecorder] Cleaning up clone...`),this.removeLitComments(t),this.ensureXmlnsAttributes(t),console.log(`[VideoRecorder] Mapping canvases...`),this.createCanvasMap(e,t),console.log(`[VideoRecorder] Mapping dynamic elements...`),this.createDynamicElementMap(e,t),console.log(`[VideoRecorder] Mapping dynamic SVGs...`),this.createDynamicSvgMap(e,t),console.log(`[VideoRecorder] Mapping dynamic style elements...`),this.createDynamicStyleMap(e,t),console.log(`[VideoRecorder] Mapping rerender elements...`),this.createRerenderMap(e,t),console.log(`[VideoRecorder] Creating SVG wrapper...`);let n=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);n.setAttribute(`xmlns`,`http://www.w3.org/2000/svg`),n.setAttribute(`width`,String(this.exportWidth)),n.setAttribute(`height`,String(this.exportHeight));let r=document.createElementNS(`http://www.w3.org/2000/svg`,`foreignObject`);r.setAttribute(`width`,`100%`),r.setAttribute(`height`,`100%`),r.setAttribute(`x`,`0`),r.setAttribute(`y`,`0`),t.setAttribute(`xmlns`,`http://www.w3.org/1999/xhtml`),r.appendChild(t),n.appendChild(r),this.preparedSvgWrapper=n,this.preparedClone=t,console.log(`[VideoRecorder] Export prepared. Canvas count:`,this.canvasToImageMap.size,`Dynamic elements:`,this.dynamicElementMap.size,`Rerender elements:`,this.rerenderMap.size)}removeIgnoredElements(e){let t=e.querySelectorAll(`[${Ey}]`);console.log(`[VideoRecorder] Removing ignored elements:`,t.length);for(let e of t)e.parentNode?.removeChild(e)}inlineStylesRecursive(e,t){if(!(e instanceof HTMLElement)||!(t instanceof HTMLElement))return;let n=getComputedStyle(e);for(let e of`display.position.top.left.right.bottom.width.height.min-width.min-height.max-width.max-height.margin.margin-top.margin-right.margin-bottom.margin-left.padding.padding-top.padding-right.padding-bottom.padding-left.box-sizing.overflow.overflow-x.overflow-y.flex.flex-direction.flex-wrap.justify-content.align-items.align-content.flex-grow.flex-shrink.flex-basis.order.gap.grid.grid-template-columns.grid-template-rows.grid-gap.grid-column.grid-row.background.background-color.background-image.background-size.background-position.border.border-width.border-style.border-color.border-radius.border-top.border-right.border-bottom.border-left.color.font.font-family.font-size.font-weight.font-style.line-height.text-align.text-decoration.text-transform.white-space.letter-spacing.word-spacing.opacity.visibility.z-index.transform.box-shadow.text-shadow.table-layout.border-collapse.border-spacing`.split(`.`)){let r=n.getPropertyValue(e);r&&r!==`none`&&r!==`normal`&&r!==`auto`&&t.style.setProperty(e,r)}let r=Array.from(e.children),i=Array.from(t.children);for(let e=0;e<r.length&&e<i.length;e++)this.inlineStylesRecursive(r[e],i[e])}flattenCustomElements(e,t){let n=this.querySelectorAllDeep(e,`canvas`);n.forEach((e,t)=>{e.setAttribute(`data-canvas-index`,String(t))}),console.log(`[VideoRecorder] Marked canvases with index (including shadow DOM):`,n.length);let r=Array.from(e.querySelectorAll(`*`)),i=Array.from(t.querySelectorAll(`*`));for(let e=r.length-1;e>=0;e--){let t=r[e],n=i[e];if(n&&t.tagName.includes(`-`)&&t instanceof HTMLElement){let e=document.createElement(`div`);e.setAttribute(`data-flattened-from`,t.tagName.toLowerCase());let r=getComputedStyle(t);if(e.style.display=r.display,e.style.width=r.width,e.style.height=r.height,e.style.position=r.position,e.style.margin=r.margin,e.style.padding=r.padding,e.style.boxSizing=r.boxSizing,e.style.background=r.background,e.style.backgroundColor=r.backgroundColor,t.shadowRoot){for(let n of t.shadowRoot.children)if(n.tagName!==`STYLE`){let t=n.cloneNode(!0);this.inlineStylesRecursive(n,t),e.appendChild(t)}}else for(let n of t.children){let t=n.cloneNode(!0);this.inlineStylesRecursive(n,t),e.appendChild(t)}let i=e.querySelectorAll(`*`);for(let e of i)if(e.tagName.includes(`-`)){let n=t.shadowRoot?.querySelector(e.tagName.toLowerCase())||t.querySelector(e.tagName.toLowerCase());n&&this.flattenSingleElement(n,e)}n.parentNode?.replaceChild(e,n),console.log(`[VideoRecorder] Flattened: <${t.tagName.toLowerCase()}>`)}}}flattenSingleElement(e,t){let n=document.createElement(`div`);n.setAttribute(`data-flattened-from`,e.tagName.toLowerCase());let r=getComputedStyle(e);if(n.style.display=r.display,n.style.width=r.width,n.style.height=r.height,e.shadowRoot){for(let t of e.shadowRoot.children)if(t.tagName!==`STYLE`){let e=t.cloneNode(!0);this.inlineStylesRecursive(t,e),n.appendChild(e)}}t.parentNode?.replaceChild(n,t)}async embedImages(e){let t=e.querySelectorAll(`img`),n=[];for(let e of t)e.src&&!e.src.startsWith(`data:`)&&n.push(this.fetchAsDataUri(e.src).then(t=>{e.src=t}).catch(t=>console.warn(`[VideoRecorder] Failed to embed image:`,e.src,t)));let r=e.querySelectorAll(`*`);for(let e of r){let t=e.style.background||``,r=e.style.backgroundImage||``,i=[t,r].filter(Boolean).join(` `);if(!i.includes(`url(`))continue;let a=Array.from(i.matchAll(/url\((['"]?)(.*?)\1\)/g)).map(e=>e[2]).filter(e=>e&&!e.startsWith(`data:`));a.length!==0&&n.push((async()=>{let n=t,i=r;for(let e of a){let t=await this.fetchAsDataUri(e);n=n.replaceAll(e,t),i=i.replaceAll(e,t)}t&&(e.style.background=n),r&&(e.style.backgroundImage=i)})().catch(e=>console.warn(`[VideoRecorder] Failed to embed background:`,e)))}await Promise.all(n)}async fetchAsDataUri(e){let t=await(await fetch(e)).blob();return new Promise((e,n)=>{let r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=n,r.readAsDataURL(t)})}createCanvasMap(e,t){this.canvasToImageMap.clear();let n=this.querySelectorAllDeep(e,`canvas`),r=t.querySelectorAll(`canvas`);console.log(`[VideoRecorder] Found canvases in original:`,n.length),console.log(`[VideoRecorder] Found canvases in clone:`,r.length);for(let e of n){let n=e.getAttribute(`data-canvas-index`);if(n===null)continue;let r=t.querySelector(`canvas[data-canvas-index="${n}"]`);if(!r){console.warn(`[VideoRecorder] Canvas with index ${n} not found in clone`);continue}let i=e,a=document.createElement(`img`);a.width=i.width,a.height=i.height,a.style.width=r.style.width||`${i.width}px`,a.style.height=r.style.height||`${i.height}px`,a.style.display=`block`,a.style.imageRendering=`pixelated`,a.setAttribute(`data-canvas-index`,n);try{let e=this.getCanvasDataUrl(i);e?(a.src=e,console.log(`[VideoRecorder] Canvas ${n} converted to data URL (${e.length} chars)`)):console.warn(`[VideoRecorder][taint] Canvas ${n} returned null dataURL - possibly tainted!`,i)}catch(e){console.warn(`[VideoRecorder][taint] Canvas ${n} TAINTED - cannot get dataURL:`,e,i)}r.parentNode?.replaceChild(a,r),this.canvasToImageMap.set(i,a),console.log(`[VideoRecorder] Mapped canvas ${n}: ${i.width}x${i.height}`)}console.log(`[VideoRecorder] Total canvas mappings:`,this.canvasToImageMap.size)}createDynamicElementMap(e,t){this.dynamicElementMap.clear();let n=this.querySelectorAllDeep(e,`[${Sy}]`),r=t.querySelectorAll(`[${Sy}]`);console.log(`[VideoRecorder] Found dynamic elements (including shadow DOM):`,n.length),console.log(`[VideoRecorder] Found dynamic elements in clone:`,r.length),n.forEach((e,t)=>{e.setAttribute(`data-dynamic-index`,String(t))});for(let e=0;e<n.length&&e<r.length;e++)this.dynamicElementMap.set(n[e],r[e])}createDynamicSvgMap(e,t){this.dynamicSvgMap.clear();let n=this.querySelectorAllDeep(e,`svg[${Cy}]`),r=t.querySelectorAll(`svg[${Cy}]`);console.log(`[VideoRecorder] Found dynamic SVGs (including shadow DOM):`,n.length);for(let e=0;e<n.length&&e<r.length;e++)this.dynamicSvgMap.set(n[e],r[e])}createDynamicStyleMap(e,t){this.dynamicStyleMap.clear();let n=this.querySelectorAllDeep(e,`[${wy}]`),r=t.querySelectorAll(`[${wy}]`);console.log(`[VideoRecorder] Found dynamic style elements (including shadow DOM):`,n.length);for(let e=0;e<n.length&&e<r.length;e++)this.dynamicStyleMap.set(n[e],r[e])}createRerenderMap(e,t){this.rerenderMap.clear();let n=this.querySelectorAllDeep(e,`[${Ty}]`),r=t.querySelectorAll(`[${Ty}]`);console.log(`[VideoRecorder] Found rerender elements (including shadow DOM):`,n.length);for(let e=0;e<n.length&&e<r.length;e++)this.rerenderMap.set(n[e],r[e])}querySelectorAllDeep(e,t){let n=[],r=e.querySelectorAll(t);n.push(...Array.from(r));let i=e.querySelectorAll(`*`);for(let e of i)if(e.shadowRoot){let r=e.shadowRoot.querySelectorAll(t);n.push(...Array.from(r));let i=this.querySelectorAllDeepInShadow(e.shadowRoot,t);n.push(...i)}return n}querySelectorAllDeepInShadow(e,t){let n=[],r=e.querySelectorAll(`*`);for(let e of r)if(e.shadowRoot){let r=e.shadowRoot.querySelectorAll(t);n.push(...Array.from(r));let i=this.querySelectorAllDeepInShadow(e.shadowRoot,t);n.push(...i)}return n}updateDynamicContent(){for(let[e,t]of this.canvasToImageMap)try{let n=this.getCanvasDataUrl(e);n&&(t.src=n)}catch(e){console.warn(`[VideoRecorder] Failed to update canvas image:`,e)}for(let[e,t]of this.dynamicElementMap)t.textContent!==e.textContent&&(t.textContent=e.textContent);for(let[e,t]of this.dynamicSvgMap)t.innerHTML!==e.innerHTML&&(t.innerHTML=e.innerHTML);for(let[e,t]of this.dynamicStyleMap){let n=e.getAttribute(`style`)||``;(t.getAttribute(`style`)||``)!==n&&t.setAttribute(`style`,n)}for(let[e,t]of this.rerenderMap)this.rerenderElement(e,t)}rerenderElement(e,t){if(e instanceof HTMLElement&&e.tagName.includes(`-`)){if(e.shadowRoot){for(;t.firstChild;)t.removeChild(t.firstChild);for(let n of e.shadowRoot.children)if(n.tagName!==`STYLE`){let e=n.cloneNode(!0);this.inlineStylesRecursive(n,e),t.appendChild(e)}}}else if(t.innerHTML!==e.innerHTML&&(t.innerHTML=e.innerHTML),e instanceof HTMLElement&&t instanceof HTMLElement){let n=e.getAttribute(`style`)||``;t.setAttribute(`style`,n),this.inlineStylesRecursive(e,t)}}removeLitComments(e){let t=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT,null),n=[],r;for(;r=t.nextNode();)n.push(r);for(let e of n)e.parentNode?.removeChild(e)}ensureXmlnsAttributes(e){let t=`http://www.w3.org/1999/xhtml`,n=e=>{if(e instanceof HTMLElement){let n=e.getAttribute(`xmlns`);(!n||n!==t)&&e.setAttribute(`xmlns`,t)}for(let t of e.children)n(t)};n(e)}getCanvasDataUrl(e){let t=e.getContext(`webgl2`),n=e.getContext(`webgl`),r=e.getContext(`2d`);if(t||n)try{return this.webglCanvasToDataUrl(e,t||n)}catch(e){return console.warn(`[VideoRecorder] WebGL canvas unreadable:`,e),null}if(r)try{return e.toDataURL(`image/png`)}catch(e){return console.warn(`[VideoRecorder] 2D canvas unreadable:`,e),null}try{return e.toDataURL(`image/png`)}catch(e){return console.warn(`[VideoRecorder] Canvas unreadable:`,e),null}}webglCanvasToDataUrl(e,t){let n=e.width,r=e.height,i=new Uint8Array(n*r*4);t.readPixels(0,0,n,r,t.RGBA,t.UNSIGNED_BYTE,i);let a=document.createElement(`canvas`);a.width=n,a.height=r;let o=a.getContext(`2d`),s=o.createImageData(n,r);for(let e=0;e<r;e++)for(let t=0;t<n;t++){let a=((r-e-1)*n+t)*4,o=(e*n+t)*4;s.data[o]=i[a],s.data[o+1]=i[a+1],s.data[o+2]=i[a+2],s.data[o+3]=i[a+3]}return o.putImageData(s,0,0),a.toDataURL(`image/png`)}async recordAndEncode(){this.app.setRecordingPhase(xy.RECORDING),await this.prepareExport();let e=new yy({target:new Vv,format:new ly});console.log(`[VideoRecorder] Supported video codecs:`,e.format.getSupportedVideoCodecs());let t=new iy({codec:`vp9`,bitrate:this.app.renderProps.mp4Quality});e.addVideoTrack(t),e.start();let n=this.file.timeline.frames.length;console.log(`[VideoRecorder] Starting recording & encoding. Total frames:`,n);let r=0;for(let e of this.file.timeline.frames){if(await this.file.timeline.setRelativeTime(e.relative),await this.file.draw(),this.updateDynamicContent(),!await this.rasterizeToCanvas()){console.warn(`[VideoRecorder] Failed to rasterize frame:`,e.index);continue}let i=new VideoFrame(this.getMuxingCanvas(),{timestamp:e.relative*1e3}),a=new pg(i);await t.add(a,{keyFrame:r%30==0}),i.close(),a.close(),r++,r%10==0&&console.log(`[VideoRecorder] Progress: ${r}/${n} frames`);let o=r/n*100;this.app.setRecordingPhaseProgress(o)}return this.app.setRecordingPhase(xy.ENCODING),console.log(`[VideoRecorder] Recording & encoding complete.`),t.close(),await e.finalize(),this.app.setRecordingPhase(xy.IDLE),new Blob([e.target.buffer],{type:`video/mp4`})}async rasterizeToCanvas(){if(!this.preparedSvgWrapper)return console.error(`[VideoRecorder] SVG wrapper not prepared!`),!1;let e=new XMLSerializer().serializeToString(this.preparedSvgWrapper),t=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`;try{let e=await new Promise((e,n)=>{let r=new Image;r.width=this.exportWidth,r.height=this.exportHeight,r.onload=()=>e(r),r.onerror=e=>{console.error(`[VideoRecorder] Image load error:`,e),n(Error(`Failed to load SVG image`))},r.src=t}),n=this.getMuxingCanvas();n.width=this.exportWidth,n.height=this.exportHeight;let r=this.getMuxingContext();return r.clearRect(0,0,this.exportWidth,this.exportHeight),r.drawImage(e,0,0),!0}catch(e){return console.error(`[VideoRecorder] Rasterization error:`,e),!1}}cleanup(){for(let e of this.canvasToImageMap.keys())e.removeAttribute(`data-canvas-index`);for(let e of this.dynamicElementMap.keys())e.removeAttribute(`data-dynamic-index`);this.canvasToImageMap.clear(),this.dynamicElementMap.clear(),this.dynamicSvgMap.clear(),this.dynamicStyleMap.clear(),this.rerenderMap.clear(),this.preparedSvgWrapper=void 0,this.preparedClone=void 0,this.muxingCanvas=void 0,this.muxingContext=void 0,this.exportWidth=0,this.exportHeight=0,console.log(`[VideoRecorder] Cleanup complete.`)}async captureVideo(){let e=this.app.renderProps.previewScale;this.app.setPreviewScale(1),await Promise.resolve();let t=performance.now();try{let e=await this.recordAndEncode(),n=performance.now();console.log(`[VideoRecorder] Total export time:`,n-t,`ms`);let r=URL.createObjectURL(e),i=document.createElement(`a`);i.href=r;let a=this.app.renderProps.fileName||`exported-video`;i.download=a.endsWith(`.mp4`)?a:`${a}.mp4`,i.click(),i.remove(),setTimeout(()=>{URL.revokeObjectURL(r),console.log(`[VideoRecorder] Video blob URL revoked.`)},1e3)}finally{this.cleanup(),this.app.setPreviewScale(e)}}async captureCurrentFrameAsPng(){let e=this.app.renderProps.previewScale;await Promise.resolve();try{await this.prepareExport(),await this.file.draw(),this.updateDynamicContent(),await this.rasterizeToCanvas();let e=await this.getMuxingCanvas().convertToBlob({type:`image/png`});if(e){let t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t;let r=this.app.renderProps.fileName||`exported-frame`,i=[r,`frame`,this.file.timeline.currentFrameIndex+1].join(`_`);n.download=i.endsWith(`.png`)?r:`${i}.png`,n.click(),n.remove(),setTimeout(()=>{URL.revokeObjectURL(t),console.log(`[VideoRecorder] PNG blob URL revoked.`)},1e3)}}finally{this.cleanup(),this.app.setPreviewScale(e)}}},Oy=class extends Td{constructor(...e){super(...e),this.fileCopyElementRef=U(),this.exportedDivRef=U(),this.parentHasAnalyses=!1,this.recordingPhase=xy.IDLE,this.recordingPhaseProgress=0,this.renderProps={hasHistogram:!0,hasThermalScale:!0,hasAnalysis:!1,hasTimeline:!1,isVertical:!1,exportFrameWidth:1200,exportFramePadding:15,exportFrameGap:30,exportGraphHeight:300,fileName:`exported-video`,mp4Quality:Ug,skin:by.LIGHT,previewScale:.45,autoScale:!0}}get slug(){return[`single-video-export`,this.file?.fileName??`no-file`,this.UUID].join(`__`)}get outerFile(){return this.file}get innerFile(){return this.fileCopyElementRef.value?.file}get exportedElement(){return this.exportedDivRef.value}setRecordingPhase(e){this.recordingPhase=e}setRecordingPhaseProgress(e){this.recordingPhaseProgress=e}onLayoutAffectingPropertyChanged(){}setHasHistogram(e){this.renderProps.hasHistogram=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setHasThermalScale(e){this.renderProps.hasThermalScale=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setPreviewScale(e){this.renderProps.previewScale=e,this.requestUpdate()}setAutoScale(e){this.renderProps.autoScale=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setHasAnalysis(e){this.renderProps.hasAnalysis=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setHasTimeline(e){this.renderProps.hasTimeline=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setIsVertical(e){this.renderProps.isVertical=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setExportFramePadding(e){this.renderProps.exportFramePadding=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setExportFrameGap(e){this.renderProps.exportFrameGap=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setExportFrameWidth(e){this.renderProps.exportFrameWidth=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setExportGraphHeight(e){this.renderProps.exportGraphHeight=e,this.requestUpdate(),this.onLayoutAffectingPropertyChanged()}setFileName(e){this.renderProps.fileName=e,this.requestUpdate()}setMp4Quality(e){this.renderProps.mp4Quality=e,this.requestUpdate()}setSkin(e){this.renderProps.skin=e,this.requestUpdate()}updated(e){if(super.updated(e),e.has(`file`)&&this.file){this.parentHasAnalyses=this.file.analysis.value.length>0;let e=this.file.fileName.replace(/\.lrc$/i,``);this.renderProps.fileName=e,this.requestUpdate()}}async record(){await new Dy(this).captureVideo()}async currentFrame(){await new Dy(this).captureCurrentFrameAsPng()}};R([V({type:Boolean,reflect:!0})],Oy.prototype,`parentHasAnalyses`,void 0),R([H()],Oy.prototype,`recordingPhase`,void 0),R([H()],Oy.prototype,`recordingPhaseProgress`,void 0),R([H()],Oy.prototype,`renderProps`,void 0);var ky=class{static unknownContainsSomething(e){return!(e===A||e==null||typeof e==`string`&&e.trim().length===0||Array.isArray(e)&&(e.length===0||!e.some(e=>this.unknownContainsSomething(e))))}},Ay=class extends Bo{t(e){return N(L[e])}update(e,t){return this.render(...t)}unknownContainsSomething(e){return ky.unknownContainsSomething(e)}renderDef(...e){let t=[],n=e.shift();return n&&t.push(k`<dt>${n}</dt>`),e.forEach(e=>{t.push(k`<dd>${e}</dd>`)}),t}},jy=zo(class extends Ay{render(e,t){return this.unknownContainsSomething(t)?k`<thermal-slot
            label=${N(L[e])}
        >${t}</thermal-slot>`:A}}),My=class extends Bo{renderRadio(e,t,n){return k`<thermal-radio
            .checked=${t}
            .onChange=${n}
        >${e}</thermal-radio>`}renderText(e,t,n,r){return k`<div class="export-config-field export-config-field--text">

            <div class="export-config-field--label">
                <label>${e}</label>
            </div>

            <div class="export-config-field--value">

                <div class="">
                    <input
                        type="text"
                        .value=${n}
                        @input=${e=>{let t=e.target;r(t.value)}}
                    />
                    <span class="unit">${t}</span>
                </div>

            </div>

        </div>`}renderDropdown(e,t,n){return k`<thermal-dropdown>
            <span slot="invoker">${e}</span>
            ${t.map(e=>k`<thermal-btn
            slot="option"
            @click=${()=>n(e)}
        >${e}</thermal-btn>`)}
        </thermal-dropdown>`}renderNumber(e,t,n,r,i,a,o){return k`<div class="export-config-field">

            <div class="export-config-field--label">
                <label>${e}</label>
            </div>

            <div class="export-config-field--value">

                <div class="">
                    <input
                        type="number"
                        .value=${n==null?``:String(n)}
                        min=${B(i)}
                        max=${B(a)}
                        step=${B(o)}
                        @input=${e=>{let t=e.target.value.trim();if(t===``){r(NaN);return}let n=parseFloat(t);i!==void 0&&!isNaN(n)&&n<i&&(n=i),a!==void 0&&!isNaN(n)&&n>a&&(n=a),r(n)}}
                    />
                    <span class="unit">${t}</span>
                </div>

            </div>

        </div>`}renderConfigHeader(e){let t=e.innerFile?.timeline.isSequence,n=e.parentHasAnalyses,r=[],i=[k`<manager-palette-dropdown ></manager-palette-dropdown>`,k`<registry-range-form></registry-range-form>`];r.push(jy(`thermalscale`,i));let a=[this.renderRadio(e.t(L.histogram),e.renderProps.hasHistogram,e.setHasHistogram.bind(e)),this.renderRadio(e.t(L.thermalscale),e.renderProps.hasThermalScale,e.setHasThermalScale.bind(e))];n&&a.push(this.renderRadio(e.t(L.analysis),e.renderProps.hasAnalysis,e.setHasAnalysis.bind(e))),t&&a.push(this.renderRadio(e.t(L.timeline),e.renderProps.hasTimeline,e.setHasTimeline.bind(e))),r.push(jy(`exportcontent`,a));let o=[];n&&e.renderProps.hasAnalysis&&o.push(this.renderRadio(`Is Vertical`,e.renderProps.isVertical,e.setIsVertical.bind(e))),o.push(this.renderDropdown(e.renderProps.skin,[`light`,`dark`,`solarized`],t=>e.setSkin(t))),r.push(jy(`display`,o)),r.push(this.renderNumber(e.t(L.exportwidth),`px`,e.renderProps.exportFrameWidth,e.setExportFrameWidth.bind(e),500,1920,10)),r.push(this.renderNumber(e.t(L.exportmargin),`px`,e.renderProps.exportFramePadding,e.setExportFramePadding.bind(e),0,100,1)),n&&e.renderProps.hasAnalysis&&(r.push(this.renderNumber(e.t(L.exportgap),`px`,e.renderProps.exportFrameGap,e.setExportFrameGap.bind(e),0,100,1)),r.push(this.renderNumber(e.t(L.exportgrahpheight),`px`,e.renderProps.exportGraphHeight,e.setExportGraphHeight.bind(e),200,700,1)));let s=t?`.mp4 / .png`:`.png`;if(r.push(this.renderText(e.t(L.name),s,e.renderProps.fileName,e.setFileName.bind(e))),t){let t=[{label:`VERY_HIGH`,value:Ug},{label:`HIGH`,value:Hg},{label:`MEDIUM`,value:Vg},{label:`LOW`,value:Bg},{label:`VERY_LOW`,value:zg}],n=t.map(e=>e.label),i=n=>{let r=t.find(e=>e.label===n);r&&(e.setMp4Quality(r.value),console.log(r.value))},a=t.find(t=>t.value===e.renderProps.mp4Quality)?.label??`UNKNOWN`,o=[this.renderDropdown(a,n,i.bind(this))];r.push(jy(L.videoquality,o))}return r}static{this.styles=O`
    
        .export-bar {

            width: 100%;

            .export-bar-part {
            }

            .export-bar-part--config {
                display: flex;
                flex-wrap: wrap;
                gap: 1em 2em;

                background: var( --thermal-background );
                padding: 1em;

                border-radius: var( --thermal-radius );

                thermal-slot {
                    box-sizing: border-box;
                }
            }

            .export-bar-part--actions {
            }
        

            .export-config-field {

                &:hover,
                &:focus-within {
                    .export-config-field--label {
                        color: var( --thermal-foreground );
                        &::after {
                            background: var( --thermal-foreground );
                        }
                    }
                }
                
                .export-config-field--label {

                    margin: 0px 0px 0.5em;
                    padding: 0px;
                    font-weight: normal;
                    font-size: 0.7em;
                    text-transform: uppercase;
                    color: var(--thermal-slate);
                    display: flex;
                    align-items: center;
                    gap: 0.5em;

                    &::after {
                        content: "";
                        flex-grow: 1;
                        height: 1px;
                        background: var( --thermal-slate-light );
                    }

                }

                .export-config-field--value {

                    input {
                        border: var( --thermal-slate-light ) solid 1px;
                        text-align: right;
                        font-family: var( --thermal-ff );
                        padding: .3em .1em .3em .3em;
                        width: 5em;
                        display: inline-block;
                    }

                    .unit {
                        font-size: 0.7em;
                    }

                }

                &.export-config-field--text {
                    .export-config-field--value input {
                        width: 200px;
                        text-align: left;
                    }
                }
            
            }

        
        }
    
    `}render(e){return k`<div class="export-bar">

            <div class="export-bar-part export-bar-part--config">
                ${this.renderConfigHeader(e)}
            </div>
        
        </div>`}},Ny=zo(My),Py=class extends Bo{constructor(...e){super(...e),this.innerHeight=0}renderHistogram(e){return k`<registry-histogram style="display: ${e.hasHistogram?`block`:`none`};"></registry-histogram>`}renderThermalScale(e){return k`<div style="display: ${e.hasThermalScale?`block`:`none`};">
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
        </div>`}renderAnalyses(e){if(!e.hasAnalysis)return A;let t=e.exportFrameWidth/2-e.exportFramePadding*2-e.exportFrameGap,n=e.exportGraphHeight;return k`<div class="export-element-content--analyses">
            <!-- Analysis content here -->
            <file-analysis-display></file-analysis-display>
            <file-analysis-graph 
                graphWidth=${t} 
                graphHeight=${n}
                .hasDownloads=${!1}
                style="height: ${n}px; width: ${t}px; display: block;"
            ></file-analysis-graph>
        </div>`}renderMainContent(e){let t=[k`<file-canvas
                .prefers-gpu=${!1}
            ></file-canvas>`];return e.hasTimeline&&t.push(k`<file-timeline hasplaybutton="false"></file-timeline>`),k`<div>
            ${t}
        </div>`}static{this.styles=O`
    
        .export-element {

            position: relative;


            --thermal-export-bg: white;
            --thermal-export-fg: black;

            --thermal-crop: 2em;

            padding: var( --thermal-crop );

            box-sizing: border-box;

            .crop {
                position: absolute;
                width: var( --thermal-crop );
                height: var( --thermal-crop );
                box-sizing: border-box;

                &.crop-t {
                    top: 0;
                }

                &.crop-b {
                    bottom: 0;
                }

                &.crop-l {
                    left: 0;
                }

                &.crop-r {
                    right: 0;
                }

                --thermal-export-crop-border-width: 3px;
                --thermal-export-border-color: var( --thermal-background );

                &.crop-t.crop-l {
                    border-bottom: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-right: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-t.crop-r {
                    border-bottom: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-left: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-b.crop-l {
                    border-top: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-right: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-b.crop-r {
                    border-top: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-left: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }
            }


            .export-overlay {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 99;
                cursor: help;

                box-sizing: border-box;
                padding: var( --thermal-crop );

                transition: all .3s ease;

                display: flex;
                align-items: stretch;
                justify-content: stretch;

                

                span {

                    font-size: 3em;
                    font-weight: normal !important;

                    width: 100%;
                    padding: 1em;
                
                    opacity: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    box-sizing: outline-box;

                    transition: opacity .3s ease;
                    
                    color: var( --thermal-export-bg );
                    
                }

                &:hover {
                    span {
                        background: color-mix(in srgb, var( --thermal-export-fg ) 50%, transparent);
                        opacity: 1;
                    }
                }
            }

            .export-element-content {
                display: grid;
                box-sizing: border-box;
                background-color: var( --thermal-export-bg );

                .export-element-content--analyses {

                    display: grid;
                    gap: 1em;
                    grid-template-columns: 100%;
                    grid-template-rows: 1fr auto;
                
                }

            }



            &.vertical {
                &.hasAnalysis {

                    .export-element-content {
                        grid-template-columns: auto;
                        grid-template-rows: auto auto;
                    }
        
                }
            }

            &.horizontal {
                &.hasAnalysis {

                    .export-element-content {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto;
                    }
                }
            }

            &.hasAnalysis {

            }

            &.hasTimeline {
            
            }

            &.hasHistogram {
            
            }

            &.hasThermalScale {
            
            }

            

            &.skin-light {
                --thermal-export-bg: white;
                --thermal-export-fg: black;
                --thermal-slate: var( --thermal-slate-base );
                --thermal-slate-dark: var( --thermal-slate-base-dark );
                --thermal-slate-light: var( --thermal-slate-base-light );
                --thermal-foreground: black;
                --thermal-background: white;
                --thermal-primary: var( --thermal-primary-base );
            }

            &.skin-dark {
                --thermal-export-bg: black;
                --thermal-export-fg: white;
                --thermal-background: black;
                --thermal-foreground: white;
                --thermal-slate: gray;
                --thermal-slate-dark: darkgray;
                --thermal-slate-light: lightgray;
            }

            &.skin-solarized {
                --thermal-export-bg: #1d5766ff;
                --thermal-export-fg: white;
                --thermal-background: #1d5766ff;
                --thermal-foreground: white;
                --thermal-slate: #27888bff;
                --thermal-slate-dark: #39aaa1ff;
                --thermal-slate-light: #073642;
            }

        
        }
    
    `}initObserver(e){if(this.observer)return;let t=e?.querySelector(`.export-element-content`);t&&(this.observer=new ResizeObserver(t=>{for(let n of t)this.innerHeight=n.borderBoxSize[0].blockSize,e.setAttribute(`height`,String(this.innerHeight))}),this.observer.observe(t))}render(e){let t=e.exportedDivRef,n=e.renderProps;t.value&&this.initObserver(t.value);let r={"export-element":!0,vertical:n.isVertical,horizontal:!n.isVertical,hasAnalysis:n.hasAnalysis,hasHistogram:n.hasHistogram,hasTimeline:n.hasTimeline,hasThermalScale:n.hasThermalScale,[`skin-`+n.skin]:!0},i=e.recordingPhase===xy.IDLE?n.previewScale:1,a={width:`calc( ${n.exportFrameWidth}px + var( --thermal-crop ) * 2 )`,scale:String(i)},o={width:n.exportFrameWidth+`px`,gap:n.exportFrameGap+`px`,padding:n.exportFramePadding+`px`},s=[this.renderHistogram(n),this.renderThermalScale(n),this.renderMainContent(n)],c=this.renderAnalyses(n);return k`<!-- The main content rendered through the SingleVideoExportLayoutDirective -->
        <main
            class=${sd(r)}
            style=${Tc(a)}
        >
            <b class="crop crop-t crop-l"></b>
            <b class="crop crop-t crop-r"></b>
            <b class="crop crop-b crop-l"></b>
            <b class="crop crop-b crop-r"></b>

            <section 
                ${W(t)}
                class="export-element-content" 
                style=${Tc(o)}
            >

                <div class="export-element-content--main">
                    ${s}
                </div>

                ${c}

            </section>

            <aside class="export-overlay">
                <span>
                    <strong>Náhled</strong>
                </span>
            </aside>

        </main>
        
        `}},Fy=zo(Py),Iy=zo(class extends Bo{renderWrappedWithNestedProviders(e,t){let n=e.registryObject,r=e.groupObject;return!n||!r?A:k`<registry-provider 
            slug="${e.slug}"
            style="display: contents;"
        >
            <group-provider 
                slug=${e.slug}
                style="display: contents;"
            >
                <file-copy 
                    .originalFile=${e.outerFile} 
                    .withAnalyses=${e.renderProps.hasAnalysis}
                    ${W(e.fileCopyElementRef)}
                >
                    ${t}
                </file-copy>
            </group-provider>
        </registry-provider>`}render(e,t){return this.renderWrappedWithNestedProviders(e,t)}}),Ly=class extends Oy{constructor(...e){super(...e),this.previewSectionRef=U(),this.exportRealWidth=0,this.exportRealHeight=0}onInstanceCreated(e){this.parentHasAnalyses=e.analysis.value.length>0}onFailure(){}connectedCallback(){super.connectedCallback(),this.setupResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this.previewResizeObserver?.disconnect(),this.exportSizeObserver?.disconnect()}updated(e){super.updated(e),this.setupResizeObserver(),this.setupExportSizeObserver()}setupResizeObserver(){!this.previewResizeObserver&&this.previewSectionRef.value&&(this.previewResizeObserver=new ResizeObserver(e=>{if(this.renderProps.autoScale)for(let t of e)this.calculateAutoScale(t.contentRect.height)}),this.previewResizeObserver.observe(this.previewSectionRef.value))}setupExportSizeObserver(){if(this.exportSizeObserver||!this.exportedDivRef.value)return;let e=this.exportedDivRef.value.parentElement;e&&(this.exportSizeObserver=new ResizeObserver(e=>{for(let t of e)this.exportRealWidth=Math.round(t.contentRect.width),this.exportRealHeight=Math.round(t.contentRect.height)}),this.exportSizeObserver.observe(e))}onLayoutAffectingPropertyChanged(){this.renderProps.autoScale&&this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.triggerAutoScaleRecalculation()})})}triggerAutoScaleRecalculation(){if(!this.previewSectionRef.value)return;let e=this.previewSectionRef.value.clientHeight;this.calculateAutoScale(e)}calculateAutoScale(e){let t=this.exportedDivRef.value;if(!t)return;let n=this.renderProps.previewScale,r=t.getBoundingClientRect().height/n;if(r<=0||e<=0)return;let i=Math.min(1,(e-20)/r),a=Math.max(.1,Math.min(1,i));Math.abs(a-this.renderProps.previewScale)>.01&&(this.renderProps.previewScale=a,this.requestUpdate())}static{this.styles=[Py.styles,My.styles,O`
            :host {
                font-size: var( --thermal-fs );
                color: var( --thermal-foreground );
                display: grid;
                grid-template-rows: auto 1fr auto;
                gap: 1em;
                height: 100%;
                min-height: 0;
                max-height: 100%;
            }

            .controls {
            }

            .preview {
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 0; /* klíčové - povolí zmenšení pod velikost obsahu */
                position: relative;

                background: var( --thermal-slate );

                border-radius: var( --thermal-radius );

                & > * {
                
                }


                .preview-size {
                
                    position: absolute;
                    bottom: 1em;
                    right: 1em;

                    z-index: 10000;

                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.5em;

                    

                    & > * {
                        background: var( --thermal-slate-light );
                        border-radius: var( --thermal-radius );
                        box-sizing: border-box;
                        padding: 0.5em 0.75em;
                        text-align: right;
                        font-size: .8em;

                        .preview-label {
                            text-transform: uppercase;
                            
                            font-weight: normal;
                            margin-bottom: .25em;
                            text-align: right;
                            opacity: .8;
                        }

                        .preview-value {
                            font-weight: bold;
                        }
                    }

                    .preview-size--preview {
                    }

                    .preview-size--export {
                        thermal-radio {
                            display: inline-block;
                        }
                    }

                }





            }

            .footer {
            }

            .progress-overlay {
            
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                z-index: 100000;

                display: flex;
                align-items: center;
                justify-content: center;

                text-align: center;

                background: color-mix(in srgb, var( --thermal-slate-light ) 90%, transparent);

                .progress-overlay-content {
                
                    display: flex;
                    flex-direction: column;
                    gap: 1em;

                    div {
                        color: var( --thermal-slate-dark );
                    }
                }
            
            }
        `]}renderHeader(){return k`<header class="controls">
            ${Ny(this)}
        </header>`}renderPreview(){let e=this.recordingPhase!==xy.IDLE;return k`<section class="preview" ${W(this.previewSectionRef)}>
            ${Fy(this)}

            ${e?k``:k`
                <div class="preview-size">
                    <div class="preview-size--export">
                        <div class="preview-label">Export</div>
                        <div class="preview-value">${this.exportRealWidth} × ${this.exportRealHeight} px</div>
                    </div>
                    <div class="preview-size--preview">
                        <div class="preview-label">Náhled</div>

                        <div class="preview-value">Zoom: ${(this.renderProps.previewScale*100).toFixed(0)}%</div>


                        ${this.renderProps.autoScale?A:k`
                            <input 
                                type="range" 
                                min="0.1" 
                                max="1" 
                                step="0.01" 
                                .value=${String(this.renderProps.previewScale)} 
                                @input=${e=>{let t=e.target,n=parseFloat(t.value);this.setPreviewScale(n)}}
                            />
                        `}

                        <thermal-radio
                            .checked=${this.renderProps.autoScale} 
                            .onChange=${e=>{this.setAutoScale(e)}}
                        >Automatické přiblížení</thermal-radio>
                        
                    </div>
                </div>
            `}

        </section>`}renderOverview(){if(this.recordingPhase===xy.IDLE)return A;let e=this.t(L.exportencodingfile);return this.recordingPhase===xy.RECORDING&&(e=`${this.t(L.exportrecordingframes)} ${this.recordingPhaseProgress.toFixed(2)}%`),k`<div
            class="progress-overlay"
        >

            <div class="progress-overlay-content">

                <thermal-spinner
                    .message=${e}
                ></thermal-spinner>

                <div>${this.t(L.exportdonotclosewindowhint)}</div>

            </div>
            
        </div>`}renderFooter(){return k`<footer class="footer">
            <file-timeline></file-timeline>
        </footer>`}render(){return Iy(this,[this.renderHeader(),this.renderPreview(),this.renderFooter(),this.renderOverview()])}};R([H()],Ly.prototype,`exportRealWidth`,void 0),R([H()],Ly.prototype,`exportRealHeight`,void 0);var Ry=class extends vd{render(){return k`<thermal-btn-group>
            <thermal-btn
                variant="${this.advancedPalettes?`default`:`foreground`}"
                @click=${()=>{this.managerController.setAdvancedPalettes(!1)}}
            >Základní palety</thermal-btn>
            <thermal-btn
                variant="${this.advancedPalettes?`foreground`:`default`}"
                @click=${()=>{this.managerController.setAdvancedPalettes(!0)}}
            >Všechny palety</thermal-btn>
        </thermal-btn-group>`}};R([I({context:qc,subscribe:!0})],Ry.prototype,`advancedPalettes`,void 0);var zy=class extends Td{constructor(...e){super(...e),this.norender=!1}onInstanceCreated(){}onFailure(){}static{this.styles=O`
    
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        main {
            display: grid;
            gap: var(--thermal-gap);
            grid-template-columns: 1fr;
            @media ( min-width: 900px ) {
                grid-template-columns: 2fr 1fr;
            }
            @media ( min-width: 1300px ) {
                grid-template-columns: 1fr 1fr;
            }
        }

        header {
            width: 100%;
            display: flex;
            gap: 5px;
            margin-bottom: var(--thermal-gap);
            align-items: stretch;
        }
    
    `}render(){return k`<header>
    <thermal-btn 
        variant="foreground" 
        @click=${()=>{this.onback&&this.onback()}}
        tooltip=${N(L.back)}
        icon="close"
        iconStyle="micro"
    ></thermal-btn>

    ${this.label===void 0?A:k`
    <thermal-btn variant="background" interactive="false">${this.label}</thermal-btn>`}

    <thermal-btn variant="background" interactive="false">
        <file-label></file-label>
    </thermal-btn>

    <file-info-button></file-info-button>
    <file-download-dropdown></file-download-dropdown>
</header>

<main>
    <section>
        <file-canvas norender="${this.norender}"></file-canvas>
        <file-timeline></file-timeline>
    </section>
    <section>
        <file-analysis-complex></file-analysis-complex>
    </section>
</main>`}};R([V({type:Object})],zy.prototype,`onback`,void 0),R([V({converter:l(!1)})],zy.prototype,`norender`,void 0),R([V({type:String})],zy.prototype,`label`,void 0),R([V({type:String})],zy.prototype,`grouping`,void 0);var By=class extends Td{constructor(...e){super(...e),this.norender=!1}onInstanceCreated(){}onFailure(){}static{this.styles=O`
    
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        header {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            padding-bottom: 5px;
            color: var(--thermal-foreground);
            
            h2 {
                margin: 0;
                padding: 0;
                flex-grow: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: var( --thermal-fs-sm );

                file-label {
                    white-space: preserve nowrap;
                }

                &:hover {
                    cursor: pointer;
                    color: var( --thermal-primary );
                }
            }

            & > div {
                display: flex;
                flex-wrap: nowrap;
                gap: 5px;
            }

        }

        main {

        }
    
    `}render(){return k`

            <header>
                <h2
                    @click=${()=>this.ondetail?.(this.file)}
                >
                    <file-label label="${B(this.label)}" grouping="${B(this.grouping)}"></file-label>
                </h2>
                <div>
                    <thermal-btn size="sm" variant="background" @click=${()=>this.ondetail?.(this.file)}>${N(L.detail).toLocaleLowerCase()}</thermal-btn>
                    <file-range-propagator></file-range-propagator>
                    <file-dropdown>
                        <file-info-button>
                            <file-button slot="invoker" label=${N(L.info).toLowerCase()}></file-button>
                        </file-info-button>
                        <file-download-lrc></file-download-lrc>
                        <file-download-png></file-download-png>
                    </file-dropdown>
                </div>
            </header>

            <main>
                <file-canvas norender="${this.norender}"></file-canvas>
                <file-timeline></file-timeline>
                <file-analysis-table mode="compact" show-range-propagator="false"></file-analysis-table>
            </main>
        
    `}};R([V({type:Object})],By.prototype,`ondetail`,void 0),R([V({converter:l(!1)})],By.prototype,`norender`,void 0),R([V({type:String})],By.prototype,`label`,void 0),R([V({type:String})],By.prototype,`grouping`,void 0);var Vy={"thermal-app":dl,"thermal-bar":fl,"thermal-btn":ad,"thermal-btn-group":class extends z{static{this.styles=O`
    
        :host {
            display: block;
        }

        .btn-group {
            display: flex;
            flex-wrap: no-wrap;
        }

        ::slotted(thermal-btn:first-child) {

            --custom-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            border-right: none !important;
        
        }

        ::slotted(thermal-btn:last-child) {
            --custom-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
        }

        ::slotted(thermal-btn:not(:first-child):not(:last-child)) {
            --custom-radius: 0;
            border-right: none !important;
        }
    
    `}render(){return k`<div class="btn-group"><slot></slot></div>`}},"thermal-dialog":od,"thermal-dropdown":cd,"thermal-dropin":ld,"thermal-expandable":ud,"thermal-field":dd,"thermal-icon":fd,"thermal-loading":pd,"thermal-radio":md,"thermal-slot":hd,"thermal-spinner":gd,"thermal-tip":_d},Hy={"manager-provider":Ad,"registry-provider":jd,"group-provider":kd,"file-provider":Od,"file-copy":Dd},Uy={"manager-image-smooth-switch":Pd,"manager-graph-smooth-switch":Nd,"manager-advanced-palette-switch":Ry,"manager-palette-dropdown":Ld,"manager-palette-buttons":Id,"manager-tool-bar":Rd,"manager-export-panel":Md},Wy={"registry-histogram":Hd,"registry-opacity-slider":qd,"registry-range-auto-button":Wd,"registry-range-full-button":Ud,"registry-range-display":Gd,"registry-range-form":zd,"registry-range-slider":Vd,"registry-ticks-bar":Bd},Gy={"group-analysis-sync-button":Yd,"group-chart":Jd,"group-download-buttons":Zd,"group-download-dropdown":Xd,"group-dropin-element":lf,"group-dropin-input":uf,"group-range-propagator":ff,"group-timeline":Cf},Ky={"file-canvas":wf,"file-download-dropdown":Of,"file-info-button":ap,"file-playback-speed-dropdown":Df,"file-timeline":sp,"file-video-export-button":Ef,"file-video-export-panel":Ly,"file-label":op,"file-button":kf,"file-dropdown-elt":Af,"file-download-lrc":jf,"file-download-png":Mf,"file-range-propagator":Nf,"file-analysis-complex":Pf,"file-analysis-display":Ff,"file-analysis-edit":If,"file-analysis-graph":zf,"file-analysis-table-row":Vf,"file-analysis-table":Hf,"analysis-color":Uf,"analysis-name":Wf,"edit-area":Gf,"edit-point":Kf,"thermal-chart":$f,"file-detail":zy,"file-thumbnail":By},qy={"apparent-temperature-aat":tp,"thermal-dropin-app":np,"thermal-file-app":rp,"thermal-group-app":ip};({...Vy,...Hy,...Uy,...Wy,...Gy,...Ky,...qy});