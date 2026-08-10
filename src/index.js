const REPO = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/";
const PHOTO_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/assets/images/cristine-saulon.jpg.b64";
function decodeBase64(value){const clean=value.replace(/\s+/g,"");const binary=atob(clean);return Uint8Array.from(binary,c=>c.charCodeAt(0));}
async function getText(url){const response=await fetch(url,{cf:{cacheTtl:0,cacheEverything:false}});if(!response.ok)throw new Error("source unavailable");return response.text();}
export default {async fetch(request){const url=new URL(request.url);try{
if(url.pathname==="/assets/images/cristine-saulon.jpg"){const photo=await getText(PHOTO_SOURCE);return new Response(decodeBase64(photo),{headers:{"Content-Type":"image/jpeg","Cache-Control":"no-store, no-cache, must-revalidate","X-Content-Type-Options":"nosniff"}});}
let html=await getText(REPO+"index.html");
const css=`<style id="cristine-profile-neon-v5">
/* Isolated profile-photo component: do not alter the surrounding hero design. */
.visual{position:relative!important;overflow:visible!important;isolation:isolate}
.portrait-frame{position:relative!important;width:180px!important;height:180px!important;min-width:180px!important;min-height:180px!important;padding:0!important;margin:0!important;border:0!important;border-radius:50%!important;background:transparent!important;box-shadow:none!important;overflow:visible!important;animation:csFloat 5s ease-in-out infinite!important;z-index:3!important}
/* Middle soft glow: violet dominant, ~8px blur, 30–50% visual opacity. */
.portrait-frame:before{content:""!important;position:absolute!important;left:50%!important;top:50%!important;width:204px!important;height:204px!important;transform:translate(-50%,-50%) scale(.94)!important;border-radius:50%!important;background:radial-gradient(circle,rgba(139,92,246,.35) 0%,rgba(139,92,246,.27) 43%,rgba(168,85,247,.12) 62%,transparent 76%)!important;filter:blur(8px)!important;opacity:.9!important;pointer-events:none!important;z-index:-1!important;animation:csMidGlow 4s ease-in-out infinite!important}
/* Outer ambient glow: separate 30–40px extension, deep violet/blue, 20px blur. */
.portrait-frame .cs-outer{position:absolute!important;left:50%!important;top:50%!important;width:256px!important;height:256px!important;transform:translate(-50%,-50%) scale(.96)!important;border-radius:50%!important;background:radial-gradient(circle,transparent 42%,rgba(168,85,247,.25) 56%,rgba(59,130,246,.12) 69%,transparent 80%)!important;filter:blur(21px)!important;opacity:.8!important;pointer-events:none!important;z-index:-2!important;animation:csOuter 5s ease-in-out infinite!important}
/* Sharp 2px concentric neon ring. */
.portrait-frame:after{content:""!important;position:absolute!important;left:50%!important;top:50%!important;width:184px!important;height:184px!important;transform:translate(-50%,-50%) rotate(0deg)!important;box-sizing:border-box!important;border-radius:50%!important;padding:2px!important;background:conic-gradient(from 0deg,#a855f7 0deg,#3b82f6 120deg,#06b6d4 240deg,#a855f7 360deg)!important;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)!important;-webkit-mask-composite:xor!important;mask-composite:exclude!important;filter:drop-shadow(0 0 5px rgba(168,85,247,.8)) drop-shadow(0 0 9px rgba(59,130,246,.4))!important;opacity:1!important;pointer-events:none!important;z-index:8!important;animation:csRing 8s linear infinite,csRingPulse 3s ease-in-out infinite!important}
.portrait{position:relative!important;z-index:4!important;display:block!important;width:180px!important;height:180px!important;min-width:180px!important;min-height:180px!important;margin:0!important;padding:0!important;border:0!important;border-radius:50%!important;object-fit:cover!important;object-position:center 36%!important;background:#151b39!important;box-shadow:none!important}
/* Reflection: approximately 20px below the 180px photo. */
.glow-floor{position:absolute!important;left:50%!important;top:calc(50% + 110px)!important;bottom:auto!important;width:170px!important;height:22px!important;transform:translateX(-50%) scaleX(.9)!important;border-radius:50%!important;background:radial-gradient(ellipse at center,rgba(168,85,247,.5) 0%,rgba(168,85,247,.25) 38%,transparent 76%)!important;filter:blur(11px)!important;opacity:.5!important;animation:csReflection 4s ease-in-out infinite!important;z-index:1!important;pointer-events:none!important}
/* 8 particles, all within roughly 60px of the photo edge. */
.particles{position:absolute!important;left:50%!important;top:50%!important;width:300px!important;height:300px!important;transform:translate(-50%,-50%)!important;pointer-events:none!important;z-index:7!important}
.particle{position:absolute!important;width:3px!important;height:3px!important;border-radius:50%!important;box-sizing:border-box!important;box-shadow:0 0 7px currentColor,0 0 13px currentColor!important;opacity:.8!important}
.p1{left:14%!important;top:28%!important;background:#a855f7!important;color:#a855f7!important;animation:csP1 9s ease-in-out infinite!important}
.p2{right:11%!important;top:22%!important;background:#3b82f6!important;color:#3b82f6!important;animation:csP2 11s ease-in-out infinite!important}
.p3{left:8%!important;top:58%!important;background:#06b6d4!important;color:#06b6d4!important;animation:csP3 13s ease-in-out infinite!important}
.p4{right:8%!important;top:61%!important;background:#8b5cf6!important;color:#8b5cf6!important;animation:csP4 8s ease-in-out infinite!important}
.p5{left:28%!important;bottom:7%!important;background:#3b82f6!important;color:#3b82f6!important;animation:csP5 12s ease-in-out infinite!important}
.p6{right:27%!important;bottom:6%!important;background:#06b6d4!important;color:#06b6d4!important;animation:csP6 10s ease-in-out infinite!important}
.p7{left:44%!important;top:3%!important;background:#a855f7!important;color:#a855f7!important;filter:blur(.5px)!important;animation:csP7 15s ease-in-out infinite!important}
.p8{right:42%!important;bottom:3%!important;background:#3b82f6!important;color:#3b82f6!important;filter:blur(.7px)!important;animation:csP8 14s ease-in-out infinite!important}
@keyframes csFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes csRing{to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes csRingPulse{0%,100%{filter:brightness(1) drop-shadow(0 0 5px rgba(168,85,247,.75))}50%{filter:brightness(1.2) drop-shadow(0 0 8px rgba(59,130,246,.85))}}
@keyframes csMidGlow{0%,100%{opacity:.65;transform:translate(-50%,-50%) scale(.92)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}
@keyframes csOuter{0%,100%{opacity:.45;transform:translate(-50%,-50%) scale(.94)}50%{opacity:.75;transform:translate(-50%,-50%) scale(1.04)}}
@keyframes csReflection{0%,100%{opacity:.3;transform:translateX(-50%) scaleX(.84)}50%{opacity:.55;transform:translateX(-50%) scaleX(1.1)}}
@keyframes csP1{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(12px,-10px);opacity:1}}
@keyframes csP2{0%,100%{transform:translate(0,0);opacity:.4}50%{transform:translate(-14px,10px);opacity:1}}
@keyframes csP3{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(10px,-13px);opacity:.95}}
@keyframes csP4{0%,100%{transform:translate(0,0);opacity:.4}50%{transform:translate(-12px,-12px);opacity:1}}
@keyframes csP5{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(13px,7px);opacity:.9}}
@keyframes csP6{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(-12px,8px);opacity:1}}
@keyframes csP7{0%,100%{transform:translate(0,0);opacity:.3}50%{transform:translate(-9px,12px);opacity:.9}}
@keyframes csP8{0%,100%{transform:translate(0,0);opacity:.3}50%{transform:translate(10px,-10px);opacity:.85}}
@media(max-width:800px){.portrait-frame,.portrait{width:170px!important;height:170px!important;min-width:170px!important;min-height:170px!important}.portrait-frame:after{width:174px!important;height:174px!important}.portrait-frame .cs-outer{width:246px!important;height:246px!important}.portrait-frame:before{width:194px!important;height:194px!important}.glow-floor{top:calc(50% + 104px)!important}.particles{width:280px!important;height:280px!important}}
@media(max-width:520px){.portrait-frame,.portrait{width:155px!important;height:155px!important;min-width:155px!important;min-height:155px!important}.portrait-frame:after{width:159px!important;height:159px!important}.portrait-frame .cs-outer{width:225px!important;height:225px!important}.portrait-frame:before{width:180px!important;height:180px!important}.glow-floor{top:calc(50% + 96px)!important;width:130px!important;height:18px!important}.particles{width:255px!important;height:255px!important}}
@media(prefers-reduced-motion:reduce){.portrait-frame,.portrait-frame:before,.portrait-frame:after,.portrait-frame .cs-outer,.glow-floor,.particle{animation:none!important}}
</style>`;
html=html.replace(/<\/head>/i,css+"</head>");
html=html.replace(/<div class="portrait-frame">/i,'<div class="portrait-frame"><span class="cs-outer" aria-hidden="true"></span>');
html=html.replace(/assets\/images\/cristine-saulon\.jpg\?v=[^\"]*/g,"assets/images/cristine-saulon.jpg?v=20260810-profile-v5");
return new Response(html,{headers:{"Content-Type":"text/html; charset=UTF-8","Cache-Control":"no-store, no-cache, must-revalidate"}});
}catch(error){return new Response("Portfolio temporarily unavailable",{status:502});}}};