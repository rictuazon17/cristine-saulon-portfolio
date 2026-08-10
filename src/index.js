const HTML_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/index.html";
const PHOTO_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/2f2f4398f2c86b707f1fe78efa8d8ee1464154dc/assets/images/cristine-saulon.jpg.b64";
const RESUME_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/a4b01c5d2284d0cbf4a2560fce5086410cdbbf3/src/index.js";

function decodeBase64(value) {
  const binary = atob(value.trim());
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

async function getText(url) {
  const response = await fetch(url, { cf: { cacheTtl: 60 } });
  if (!response.ok) throw new Error("Source unavailable");
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
            "Cache-Control": "no-store"
          }
        });
      }

      if (url.pathname === "/assets/resume/Mary_Cristine_Saulon_Resume.pdf" || url.pathname === "/resume.pdf") {
        const source = await getText(RESUME_SOURCE);
        const match = source.match(/atob\(['\"]([^'\"]+)['\"]\)/);
        if (!match) return new Response("Resume unavailable", { status: 502 });
        return new Response(decodeBase64(match[1]), {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'inline; filename="Mary_Cristine_Saulon_Resume.pdf"',
            "Cache-Control": "public, max-age=86400"
          }
        });
      }

      const html = await getText(HTML_SOURCE);
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
          "Cache-Control": "no-store"
        }
      });
    } catch (error) {
      return new Response("Portfolio temporarily unavailable", { status: 502 });
    }
  }
};
