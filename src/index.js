const REPO = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/";
const PHOTO_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/4a99b7af084c58e849da0f8e1f8671323bbadb1f/assets/images/cristine-saulon-new.jpg.b64";

function decodeBase64(value) {
  const binary = atob(value.trim());
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
            "Cache-Control": "no-store, no-cache, must-revalidate"
          }
        });
      }
      const html = await getText(REPO + "index.html");
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
