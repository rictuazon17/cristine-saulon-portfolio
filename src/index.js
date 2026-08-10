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

      const photoFixCss = `
<style id="cristine-photo-fix">
/* Preserve the supplied portrait source; animate only the surrounding frame. */
.visual { overflow: visible !important; }
.portrait-frame {
  width: 430px !important;
  height: 430px !important;
  aspect-ratio: 1 / 1 !important;
  border-radius: 50% !important;
  padding: 2px !important;
  box-sizing: border-box !important;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
}
.portrait-frame::before {
  inset: 10px !important;
  border-radius: 50% !important;
}
.portrait {
  width: 100% !important;
  height: 100% !important;
  min-width: 0 !important;
  min-height: 0 !important;
  border-radius: 50% !important;
  object-fit: cover !important;
  object-position: center 36% !important;
  display: block !important;
  transform: none !important;
  -webkit-transform: none !important;
  backface-visibility: visible !important;
  -webkit-backface-visibility: visible !important;
  filter: saturate(1.02) contrast(1.01) !important;
  image-rendering: auto !important;
}
@media (max-width: 1050px) {
  .portrait-frame { width: 400px !important; height: 400px !important; }
}
@media (max-width: 800px) {
  .portrait-frame { width: 350px !important; height: 350px !important; }
}
@media (max-width: 520px) {
  .portrait-frame { width: 285px !important; height: 285px !important; }
}
</style>`;

      const neonPhotoCss = `
<style id="cristine-neon-photo">
/* Precision neon profile-photo treatment. The source photo is untouched. */
.visual{overflow:visible!important;isolation:isolate}
.visual:before{display:none!important}
.orbit{display:none!important}
.portrait-frame{
  position:relative!important;
  width:430px!important;height:430px!important;
  aspect-ratio:1/1!important;
  border-radius:50%!important;
  padding:2px!important;
  display:grid!important;place-items:center!important;
  background:linear-gradient(125deg,#d946ef 0%,#8b5cf6 34%,#4f46e5 60%,#22d3ee 100%)!important;
  box-shadow:0 0 10px rgba(139,92,246,.42),0 0 24px rgba(124,58,237,.22),0 0 48px rgba(34,211,238,.10),0 20px 60px rgba(0,0,0,.34)!important;
  animation:float 6s ease-in-out infinite!important;
  z-index:2!important;
}
.portrait-frame::before{
  content:""!important;position:absolute!important;inset:-10px!important;border-radius:50%!important;
  padding:8px!important;pointer-events:none!important;z-index:-1!important;
  background:conic-gradient(from 215deg,rgba(217,70,239,.76),rgba(139,92,246,.45),rgba(34,211,238,.62),rgba(59,130,246,.40),rgba(217,70,239,.76))!important;
  filter:blur(13px)!important;opacity:.34!important;transform:scale(.985)!important;
  animation:neonBreath 4.8s ease-in-out infinite!important;
}
.portrait-frame::after{
  content:""!important;position:absolute!important;inset:0!important;border-radius:50%!important;
  pointer-events:none!important;z-index:4!important;
  border:1.5px solid transparent!important;
  background:linear-gradient(125deg,#f0abfc,#a78bfa 38%,#60a5fa 72%,#67e8f9) border-box!important;
  -webkit-mask:linear-gradient(#000 0 0) padding-box,linear-gradient(#000 0 0)!important;
  -webkit-mask-composite:xor!important;mask-composite:exclude!important;
  opacity:.95!important;animation:ringPulse 3.8s ease-in-out infinite!important;
}
.portrait{
  width:100%!important;height:100%!important;border-radius:50%!important;
  object-fit:cover!important;object-position:center 36%!important;
  border:0!important;filter:saturate(1.02) contrast(1.01)!important;
  box-shadow:inset 0 0 22px rgba(0,0,0,.28)!important;
  position:relative!important;z-index:2!important;
}
.glow-floor{
  bottom:2%!important;width:280px!important;height:22px!important;border-radius:50%!important;
  background:linear-gradient(90deg,transparent,rgba(217,70,239,.72) 25%,rgba(139,92,246,.92) 50%,rgba(34,211,238,.45) 75%,transparent)!important;
  filter:blur(13px)!important;opacity:.48!important;transform:scaleX(.95)!important;
  animation:reflectionBreath 4.5s ease-in-out infinite!important;z-index:1!important;
}
.particle{width:3px!important;height:3px!important;opacity:.55!important}
@keyframes neonBreath{0%,100%{opacity:.25;transform:scale(.985)}50%{opacity:.42;transform:scale(1.02)}}
@keyframes ringPulse{0%,100%{opacity:.78;filter:brightness(.92)}50%{opacity:1;filter:brightness(1.18)}}
@keyframes reflectionBreath{0%,100%{opacity:.32;transform:scaleX(.86)}50%{opacity:.55;transform:scaleX(1.04)}}
@media(max-width:1050px){.portrait-frame{width:400px!important;height:400px!important}.glow-floor{width:250px!important}}
@media(max-width:800px){.portrait-frame{width:350px!important;height:350px!important}.glow-floor{width:220px!important}}
@media(max-width:520px){.portrait-frame{width:285px!important;height:285px!important}.glow-floor{width:185px!important;height:18px!important}}
</style>`;

      html = html.replace(/<\/head>/i, photoFixCss + neonPhotoCss + "</head>");
      html = html.replace(/assets\/images\/cristine-saulon\.jpg\?v=[^\"]*/g, "assets/images/cristine-saulon.jpg?v=20260810-neon-photo-v1");

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
