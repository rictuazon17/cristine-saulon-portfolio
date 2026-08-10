const REPO = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/";
const PHOTO_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/assets/images/cristine-saulon.jpg.b64";

function decodeBase64(value) {
  const clean = value.replace(/\s+/g, "");
  const binary = atob(clean);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

async function getText(url) {
  const response = await fetch(url, { cf: { cacheTtl: 0, cacheEverything: false } });
  if (!response.ok) throw new Error("source unavailable");
  return response.text();
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/assets/images/cristine-saulon.jpg") {
        const photo = await getText(PHOTO_SOURCE);
        return new Response(decodeBase64(photo), {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "X-Content-Type-Options": "nosniff"
          }
        });
      }

      let html = await getText(REPO + "index.html");

      const neonPhotoCss = `
<style id="cristine-neon-photo">
/* Refined neon profile-photo treatment: the supplied photo remains untouched. */
.visual{overflow:visible!important;isolation:isolate}
.visual:before{display:none!important}
.orbit{display:none!important}

.portrait-frame{
  position:relative!important;
  width:180px!important;height:180px!important;
  min-width:180px!important;min-height:180px!important;
  aspect-ratio:1/1!important;
  border-radius:50%!important;
  padding:0!important;
  display:grid!important;place-items:center!important;
  background:transparent!important;
  box-shadow:
    0 0 10px rgba(168,85,247,.34),
    0 0 26px rgba(59,130,246,.16),
    0 0 46px rgba(6,182,212,.08)!important;
  animation:profileFloat 5s ease-in-out infinite!important;
  z-index:3!important;
  will-change:transform,filter;
}

/* Middle soft violet halo + outer ambient halo. */
.portrait-frame::before{
  content:""!important;
  position:absolute!important;
  inset:-22px!important;
  border-radius:50%!important;
  pointer-events:none!important;
  z-index:-2!important;
  background:
    radial-gradient(circle,
      rgba(139,92,246,.42) 0%,
      rgba(168,85,247,.30) 31%,
      rgba(59,130,246,.15) 52%,
      rgba(168,85,247,.08) 64%,
      transparent 74%)!important;
  filter:blur(8px)!important;
  opacity:.72!important;
  transform:scale(.94)!important;
  animation:middleGlowPulse 4s ease-in-out infinite!important;
  box-shadow:
    0 0 26px rgba(139,92,246,.30),
    0 0 58px rgba(168,85,247,.20),
    0 0 88px rgba(59,130,246,.10)!important;
}

/* Sharp 2px rotating neon ring. */
.portrait-frame::after{
  content:""!important;
  position:absolute!important;
  inset:-1px!important;
  border-radius:50%!important;
  pointer-events:none!important;
  z-index:5!important;
  padding:2px!important;
  background:conic-gradient(
    from 0deg,
    #a855f7 0deg,
    #3b82f6 120deg,
    #06b6d4 240deg,
    #a855f7 360deg
  )!important;
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)!important;
  -webkit-mask-composite:xor!important;
  mask-composite:exclude!important;
  filter:drop-shadow(0 0 5px rgba(168,85,247,.72)) drop-shadow(0 0 10px rgba(59,130,246,.30))!important;
  animation:ringRotate 8s linear infinite,ringBrightness 3s ease-in-out infinite!important;
  transform-origin:center!important;
}

.portrait{
  width:180px!important;height:180px!important;
  min-width:180px!important;min-height:180px!important;
  border-radius:50%!important;
  object-fit:cover!important;
  object-position:center 36%!important;
  display:block!important;
  border:0!important;
  background:#151b39!important;
  filter:saturate(1.02) contrast(1.01)!important;
  box-shadow:inset 0 0 18px rgba(0,0,0,.24)!important;
  position:relative!important;
  z-index:2!important;
}

/* Horizontal violet ground reflection, centered ~20px below the photo. */
.glow-floor{
  position:absolute!important;
  bottom:calc(50% - 110px)!important;
  left:50%!important;
  width:210px!important;height:24px!important;
  transform:translateX(-50%) scaleX(.92)!important;
  border-radius:50%!important;
  background:radial-gradient(ellipse at center,
    rgba(168,85,247,.50) 0%,
    rgba(139,92,246,.30) 36%,
    rgba(59,130,246,.12) 58%,
    transparent 78%)!important;
  filter:blur(11px)!important;
  opacity:.42!important;
  animation:reflectionPulse 4s ease-in-out infinite!important;
  z-index:1!important;
}

/* Eight atmospheric particles distributed around the portrait. */
.particles{
  position:absolute!important;
  width:310px!important;height:310px!important;
  left:50%!important;top:50%!important;
  inset:auto!important;
  transform:translate(-50%,-50%)!important;
  pointer-events:none!important;
  z-index:4!important;
}
.particle{
  position:absolute!important;
  width:3px!important;height:3px!important;
  border-radius:50%!important;
  background:#a855f7!important;
  box-shadow:0 0 8px currentColor,0 0 14px rgba(168,85,247,.35)!important;
  opacity:.78!important;
  animation-timing-function:ease-in-out!important;
  animation-iteration-count:infinite!important;
}
.p1{left:18%;top:27%;color:#a855f7!important;animation:particleOne 9s ease-in-out infinite!important}
.p2{right:14%;top:22%;color:#3b82f6!important;animation:particleTwo 11s ease-in-out infinite!important}
.p3{left:10%;top:58%;color:#06b6d4!important;animation:particleThree 13s ease-in-out infinite!important}
.p4{right:11%;top:61%;color:#8b5cf6!important;animation:particleFour 8s ease-in-out infinite!important}
.p5{left:28%;bottom:9%;color:#3b82f6!important;animation:particleFive 12s ease-in-out infinite!important}
.p6{right:28%;bottom:7%;color:#06b6d4!important;animation:particleSix 10s ease-in-out infinite!important}
.p7{left:44%;top:4%;color:#a855f7!important;filter:blur(.5px)!important;animation:particleSeven 15s ease-in-out infinite!important}
.p8{right:43%;bottom:3%;color:#3b82f6!important;filter:blur(.7px)!important;animation:particleEight 14s ease-in-out infinite!important}

@keyframes profileFloat{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-6px)}
}
@keyframes ringRotate{to{transform:rotate(360deg)}}
@keyframes ringBrightness{
  0%,100%{filter:brightness(.92) drop-shadow(0 0 4px rgba(168,85,247,.60))}
  50%{filter:brightness(1.20) drop-shadow(0 0 8px rgba(59,130,246,.72)) drop-shadow(0 0 13px rgba(6,182,212,.25))}
}
@keyframes middleGlowPulse{
  0%,100%{opacity:.56;transform:scale(.92)}
  50%{opacity:.86;transform:scale(1.05)}
}
@keyframes reflectionPulse{
  0%,100%{opacity:.30;transform:translateX(-50%) scaleX(.86)}
  50%{opacity:.56;transform:translateX(-50%) scaleX(1.08)}
}
@keyframes particleOne{0%,100%{transform:translate(0,0);opacity:.45}50%{transform:translate(12px,-10px);opacity:1}}
@keyframes particleTwo{0%,100%{transform:translate(0,0);opacity:.55}50%{transform:translate(-15px,9px);opacity:1}}
@keyframes particleThree{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(10px,-14px);opacity:.9}}
@keyframes particleFour{0%,100%{transform:translate(0,0);opacity:.5}50%{transform:translate(-11px,-13px);opacity:1}}
@keyframes particleFive{0%,100%{transform:translate(0,0);opacity:.45}50%{transform:translate(14px,7px);opacity:.95}}
@keyframes particleSix{0%,100%{transform:translate(0,0);opacity:.42}50%{transform:translate(-13px,8px);opacity:1}}
@keyframes particleSeven{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(-9px,13px);opacity:.9}}
@keyframes particleEight{0%,100%{transform:translate(0,0);opacity:.3}50%{transform:translate(11px,-11px);opacity:.85}}

@media(max-width:1050px){
  .portrait-frame,.portrait{width:180px!important;height:180px!important;min-width:180px!important;min-height:180px!important}
  .glow-floor{width:205px!important}
}
@media(max-width:800px){
  .portrait-frame,.portrait{width:170px!important;height:170px!important;min-width:170px!important;min-height:170px!important}
  .particles{width:290px!important;height:290px!important}
  .glow-floor{width:195px!important}
}
@media(max-width:520px){
  .portrait-frame,.portrait{width:155px!important;height:155px!important;min-width:155px!important;min-height:155px!important}
  .particles{width:270px!important;height:270px!important}
  .glow-floor{width:180px!important;height:18px!important;bottom:calc(50% - 98px)!important}
}
@media(prefers-reduced-motion:reduce){
  .portrait-frame,.portrait-frame::before,.portrait-frame::after,.glow-floor,.particle{animation:none!important}
}
</style>`;

      html = html.replace(/<\/head>/i, neonPhotoCss + "</head>");
      html = html.replace(
        /<div class="particles">[\s\S]*?<\/div>/i,
        `<div class="particles"><i class="particle p1"></i><i class="particle p2"></i><i class="particle p3"></i><i class="particle p4"></i><i class="particle p5"></i><i class="particle p6"></i><i class="particle p7"></i><i class="particle p8"></i></div>`
      );
      html = html.replace(/assets\/images\/cristine-saulon\.jpg\?v=[^\"]*/g, "assets/images/cristine-saulon.jpg?v=20260810-neon-photo-v2");

      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "no-store, no-cache, must-revalidate"
        }
      });
    } catch (error) {
      return new Response("Portfolio temporarily unavailable", { status: 502 });
    }
  }
};
