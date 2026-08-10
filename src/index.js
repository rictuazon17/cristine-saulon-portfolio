const VERSION = "20260810-profile-design-3";
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

function injectHeroVisual(html) {
  const script = `<script>(function(){function mount(){var grid=document.querySelector('.hero-grid');if(!grid)return;var copy=grid.querySelector('.hero-copy');Array.from(grid.children).forEach(function(el){if(el!==copy)el.remove()});var visual=document.createElement('div');visual.className='visual';visual.innerHTML='<div class="orbit" aria-hidden="true"></div><div class="portrait-frame"><span class="cs-outer" aria-hidden="true"></span><img class="portrait" src="/assets/images/cristine-saulon.jpg?v=${VERSION}" alt="Cristine Saulon IT Support Specialist" loading="eager" decoding="async"><div class="glow-floor" aria-hidden="true"></div><div class="particles" aria-hidden="true"><span class="particle p1"></span><span class="particle p2"></span><span class="particle p3"></span><span class="particle p4"></span><span class="particle p5"></span><span class="particle p6"></span><span class="particle p7"></span><span class="particle p8"></span></div></div>';grid.appendChild(visual)}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',mount)}else{mount()}})();</script>`;
  return html.includes('</body>') ? html.replace('</body>', script + '</body>') : html + script;
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

      const html = injectHeroVisual(await getText(INDEX_SOURCE));

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
