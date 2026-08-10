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
<style id="cristine-neon-photo-v4">
/* Only the profile-photo treatment is overridden. Existing hero layout/decorations remain intact. */
.visual{overflow:visible!important;position:relative!important;isolation:isolate}

.portrait-frame{
  position:relative!important;
  width:180px!important;height:180px!important;
  min-width:180px!important;min-height:180px!important;
  padding:0!important;margin:0!important;
  border:0!important;border-radius:50%!important;
  background:transparent!important;
  box-shadow:none!important;
  animation:csPhotoFloat 5s ease-in-out infinite!important;
  z-index:2!important;
  overflow:visible!important;
}

/* Middle soft glow + outer ambient glow in one halo layer. */
.portrait-frame:before{
  content:""!important;
  position:absolute!important;
  inset:-38px!important;
  width:256px!important;height:256px!important;
  margin:auto!important;
  border-radius:50%!important;
  pointer-events:none!important;
  z-index:-1!important;
  background:
    radial-gradient(circle at center,
      rgba(139,92,246,.40) 0%,
      rgba(168,85,247,.34) 37%,
      rgba(168,85,247,.18) 49%,
      rgba(59,130,246,.09) 61%,
      transparent 73%)!important;
  filter:blur(8px)!important;
  opacity:.80!important;
  transform:scale(.94)!important;
  animation:csHaloPulse 4s ease-in-out infinite,csOuterDrift 5s ease-in-out infinite!important;
}

/* Sharp 2px rotating neon ring. */
.portrait-frame:after{
  content:""!important;
  position:absolute!important;
  inset:-2px!important;
  width:184px!important;height:184px!important;
  box-sizing:border-box!important;
  border-radius:50%!important;
  padding:2px!important;
  pointer-events:none!important;
  z-index:10!important;
  background:conic-gradient(from 0deg,#a855f7 0deg,#3b82f6 120deg,#06b6d4 240deg,#a855f7 360deg)!important;
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)!important;
  -webkit-mask-composite:xor!important;
  mask-composite:exclude!important;
  filter:drop-shadow(0 0 4px rgba(168,85,247,.72)) drop-shadow(0 0 8px rgba(59,130,246,.30))!important;
  animation:csRingRotate 8s linear infinite,csRingPulse 3s ease-in-out infinite!important;
  transform-origin:50% 50%!important;
}

.portrait{
  position:relative!important;
  z-index:3!important;
  display:block!important;
  width:180px!important;height:180px!important;
  min-width:180px!important;min-height:180px!important;
  margin:0!important;padding:0!important;
  border:0!important;border-radius:50%!important;
  object-fit:cover!important;
  object-position:center 36%!important;
  background:#151b39!important;
  filter:saturate(1.02) contrast(1.01)!important;
  box-shadow:none!important;
}

/* Reflection: centered directly below the 180px photo with ~20px gap. */
.glow-floor{
  position:absolute!important;
  left:50%!important;
  top:calc(50% + 110px)!important;
  bottom:auto!important;
  width:170px!important;height:22px!important;
  margin:0!important;
  border-radius:50%!important;
  transform:translateX(-50%) scaleX(.90)!important;
  background:radial-gradient(ellipse at center,
    rgba(168,85,247,.50) 0%,
    rgba(168,85,247,.28) 34%,
    rgba(139,92,246,.14) 52%,
    transparent 78%)!important;
  filter:blur(11px)!important;
  opacity:.44!important;
  animation:csReflection 4s ease-in-out infinite!important;
  pointer-events:none!important;
  z-index:1!important;
}

/* Keep the existing orbital decoration, but particles are localized to the photo. */
.particles{position:absolute!important;left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;width:300px!important;height:300px!important;inset:auto!important;transform:translate(-50%,-50%)!important;pointer-events:none!important;z-index:7!important}
.particle{position:absolute!important;width:3px!important;height:3px!important;border-radius:50%!important;background:#a855f7!important;box-shadow:0 0 7px currentColor,0 0 13px currentColor!important;opacity:.72!important}
.p1{left:17%!important;top:25%!important;color:#a855f7!important;animation:csP1 9s ease-in-out infinite!important}
.p2{right:12%!important;top:23%!important;color:#3b82f6!important;animation:csP2 11s ease-in-out infinite!important}
.p3{left:10%!important;bottom:27%!important;color:#06b6d4!important;animation:csP3 13s ease-in-out infinite!important}
.p4{right:10%!important;bottom:23%!important;color:#8b5cf6!important;animation:csP4 8s ease-in-out infinite!important}
.p5{left:29%!important;bottom:8%!important;color:#3b82f6!important;animation:csP5 12s ease-in-out infinite!important}
.p6{right:28%!important;bottom:8%!important;color:#06b6d4!important;animation:csP6 10s ease-in-out infinite!important}
.p7{left:46%!important;top:5%!important;color:#a855f7!important;filter:blur(.5px)!important;animation:csP7 15s ease-in-out infinite!important}
.p8{right:44%!important;bottom:4%!important;color:#3b82f6!important;filter:blur(.7px)!important;animation:csP8 14s ease-in-out infinite!important}

@keyframes csPhotoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes csRingRotate{to{transform:rotate(360deg)}}
@keyframes csRingPulse{0%,100%{opacity:.82;filter:brightness(.95) drop-shadow(0 0 4px rgba(168,85,247,.65))}50%{opacity:1;filter:brightness(1.18) drop-shadow(0 0 7px rgba(59,130,246,.78))}}
@keyframes csHaloPulse{0%,100%{opacity:.55;transform:scale(.92)}50%{opacity:.86;transform:scale(1.04)}}
@keyframes csOuterDrift{0%,100%{filter:blur(8px)}50%{filter:blur(11px)}}
@keyframes csReflection{0%,100%{opacity:.30;transform:translateX(-50%) scaleX(.84)}50%{opacity:.55;transform:translateX(-50%) scaleX(1.08)}}
@keyframes csP1{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(12px,-10px);opacity:1}}
@keyframes csP2{0%,100%{transform:translate(0,0);opacity:.45}50%{transform:translate(-14px,10px);opacity:1}}
@keyframes csP3{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(10px,-13px);opacity:.95}}
@keyframes csP4{0%,100%{transform:translate(0,0);opacity:.4}50%{transform:translate(-12px,-12px);opacity:1}}
@keyframes csP5{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(13px,7px);opacity:.9}}
@keyframes csP6{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(-12px,8px);opacity:1}}
@keyframes csP7{0%,100%{transform:translate(0,0);opacity:.3}50%{transform:translate(-9px,12px);opacity:.9}}
@keyframes csP8{0%,100%{transform:translate(0,0);opacity:.3}50%{transform:translate(10px,-10px);opacity:.85}}

@media(max-width:1050px){.portrait-frame,.portrait{width:180px!important;height:180px!important;min-width:180px!important;min-height:180px!important}.portrait-frame:after{width:184px!important;height:184px!important}.portrait-frame:before{width:256px!important;height:256px!important}.glow-floor{top:calc(50% + 110px)!important}}
@media(max-width:800px){.portrait-frame,.portrait{width:170px!important;height:170px!important;min-width:170px!important;min-height:170px!important}.portrait-frame:after{width:174px!important;height:174px!important}.portrait-frame:before{width:246px!important;height:246px!important}.glow-floor{top:calc(50% + 104px)!important}.particles{width:280px!important;height:280px!important}}
@media(max-width:520px){.portrait-frame,.portrait{width:155px!important;height:155px!important;min-width:155px!important;min-height:155px!important}.portrait-frame:after{width:159px!important;height:159px!important}.portrait-frame:before{width:225px!important;height:225px!important}.glow-floor{top:calc(50% + 96px)!important;width:130px!important;height:18px!important}.particles{width:255px!important;height:255px!important}}
@media(prefers-reduced-motion:reduce){.portrait-frame,.portrait-frame:before,.portrait-frame:after,.glow-floor,.particle{animation:none!important}}
</style>`;

      html = html.replace(/<\/head>/i, neonPhotoCss + "</head>");
      html = html.replace(/assets\/images\/cristine-saulon\.jpg\?v=[^\"]*/g, "assets/images/cristine-saulon.jpg?v=20260810-neon-photo-v4");

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
