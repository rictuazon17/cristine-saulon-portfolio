const REPO = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/";
const PHOTO_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/2f2f4398f2c86b707f1fe78efa8d8ee1464154dc/assets/images/cristine-saulon.jpg.b64";

function decodeBase64(value) {
  const binary = atob(value.trim());
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

async function getText(url) {
  const response = await fetch(url);
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
          headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" }
        });
      }
      const html = await getText(REPO + "index.html");
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=UTF-8", "Cache-Control": "no-store" }
      });
    } catch (error) {
      return new Response("Portfolio temporarily unavailable", { status: 502 });
    }
  }
};
