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

      // Serve the repository's index.html exactly as authored.
      // The profile-photo neon design is already defined in index.html;
      // do not inject a second CSS implementation or duplicate .cs-outer.
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
