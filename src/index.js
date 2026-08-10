const HTML_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/main/index.html";
const ASSET_SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/a4b01c5d2284d0cbf4a2560fce5086410cdbbf3/src/index.js";

let assetSourcePromise;
async function getAssetSource() {
  if (!assetSourcePromise) assetSourcePromise = fetch(ASSET_SOURCE, { cf: { cacheTtl: 86400 } }).then(r => {
    if (!r.ok) throw new Error("Asset source unavailable");
    return r.text();
  });
  return assetSourcePromise;
}

function decodeBase64(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    try {
      const assetSource = await getAssetSource();

      if (url.pathname === "/assets/images/cristine-saulon.jpg") {
        const match = assetSource.match(/(?:atob\(['\"]|data:image\/jpeg;base64,)(\/9j\/[A-Za-z0-9+/=]{1000,})/);
        if (!match) return new Response("Profile photo unavailable", { status: 404 });
        return new Response(decodeBase64(match[1]), { headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=31536000, immutable" } });
      }

      if (url.pathname === "/assets/resume/Mary_Cristine_Saulon_Resume.pdf" || url.pathname === "/resume.pdf") {
        const match = assetSource.match(/atob\(['\"]([^'\"]+)['\"]\)/);
        if (!match) return new Response("Resume unavailable", { status: 502 });
        return new Response(decodeBase64(match[1]), { headers: { "Content-Type": "application/pdf", "Content-Disposition": 'inline; filename="Mary_Cristine_Saulon_Resume.pdf"', "Cache-Control": "public, max-age=86400" } });
      }

      const htmlResponse = await fetch(HTML_SOURCE, { cf: { cacheTtl: 60 } });
      if (!htmlResponse.ok) return new Response("Portfolio HTML unavailable", { status: 502 });
      return new Response(await htmlResponse.text(), { headers: { "Content-Type": "text/html; charset=UTF-8", "Cache-Control": "no-store" } });
    } catch (error) {
      return new Response("Portfolio temporarily unavailable", { status: 502 });
    }
  }
};
