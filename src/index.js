const VERSION = "20260810-profile-design-2";
const REPO = `https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/`;
const INDEX_SOURCE = `${REPO}index.html?v=${VERSION}`;
const PHOTO_SOURCE = `${REPO}assets/images/cristine-saulon.jpg.b64?v=${VERSION}`;

function decodeBase64(value) {
  const clean = value.replace(/\s+/g, "");
  const binary = atob(clean);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

async function getText(url) {
  const response = await fetch(url, {
    cf: { cacheTtl: 0, cacheEverything: false },
    headers: { "Cache-Control": "no-cache" }
  });
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
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            "Pragma": "no-cache",
            "X-Content-Type-Options": "nosniff"
          }
        });
      }

      const html = await getText(INDEX_SOURCE);

      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          "Pragma": "no-cache",
          "Expires": "0",
          "X-Content-Type-Options": "nosniff"
        }
      });
    } catch (error) {
      return new Response("Portfolio temporarily unavailable", { status: 502 });
    }
  }
};
