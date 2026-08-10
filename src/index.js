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
            "Cache-Control": "public, max-age=3600, immutable",
            "X-Content-Type-Options": "nosniff"
          }
        });
      }

      let html = await getText(REPO + "index.html");

      const photoFixCss = `
<style id="cristine-photo-fix">
/* Keep the supplied portrait undistorted and fully visible. */
.visual { overflow: visible !important; }
.portrait-frame {
  width: 430px !important;
  height: 573px !important;
  aspect-ratio: 3 / 4 !important;
  border-radius: 50% / 42% !important;
  padding: 8px !important;
  overflow: hidden !important;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
}
.portrait-frame::before {
  inset: 14px !important;
  border-radius: 50% / 42% !important;
}
.portrait {
  width: 100% !important;
  height: 100% !important;
  min-width: 0 !important;
  min-height: 0 !important;
  border-radius: 50% / 42% !important;
  object-fit: cover !important;
  object-position: 50% 50% !important;
  display: block !important;
  transform: translateZ(0) !important;
  -webkit-transform: translateZ(0) !important;
  backface-visibility: hidden !important;
  -webkit-backface-visibility: hidden !important;
  image-rendering: auto !important;
}
@media (max-width: 1050px) {
  .portrait-frame { width: 360px !important; height: 480px !important; }
}
@media (max-width: 800px) {
  .portrait-frame { width: 300px !important; height: 400px !important; }
}
</style>`;

      html = html.replace(/<\/head>/i, photoFixCss + "</head>");
      html = html.replace(/assets\/images\/cristine-saulon\.jpg\?v=[^\"]*/g, "assets/images/cristine-saulon.jpg?v=20260810-image-fix-3");

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
