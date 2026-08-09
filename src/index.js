const SOURCE = "https://raw.githubusercontent.com/rictuazon17/cristine-saulon-portfolio/a4b01c5d2284d0cbf4a2560fce5086410cdbbf3/src/index.js";

function patch(html) {
  html = html.replaceAll("cristinesaulon@gmail.com", "cristinesaulon25@gmail.com");
  html = html.replaceAll("+63 912 345 6789", "+63 962 263 9475").replaceAll("+639123456789", "+639622639475");
  html = html.replaceAll("/resume.pdf", "/assets/resume/Mary_Cristine_Saulon_Resume.pdf");

  html = html.replace(/\.hero-photo-wrap\.animated\s*\{[^}]*photoFloat[^}]*\}/s,
` .hero-photo-wrap.animated { animation: photoEntrance .8s cubic-bezier(.4,0,.2,1) .1s forwards; }
  .hero-photo-wrap.animated .hero-photo { animation: photoFloat 5s ease-in-out 1s infinite; will-change: transform; }
  @keyframes photoFloat { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-6px,0)} }`);

  html = html.replace(/\.hero-scroll\.animated\s*\{[^}]*scrollBounce[^}]*\}[\s\S]*?@keyframes scrollBounce\s*\{[^}]*\}/s,
` .hero-scroll.animated { animation: heroFadeInScroll .7s cubic-bezier(.4,0,.2,1) 1.3s forwards; }
  @keyframes heroFadeInScroll { to { opacity:1; transform:translateX(-50%) translateY(0); } }
  .hero-scroll .chevron { animation: scrollChevronBounce 2.5s ease-in-out 2s infinite; }
  @keyframes scrollChevronBounce { 0%,100%{transform:translateY(0);opacity:.6} 50%{transform:translateY(6px);opacity:1} }`);

  if (!html.includes("@keyframes badgePulse")) html = html.replace(/(\.hero-badge\.animated\s*\{[^}]*\})/, `$1
  .hero-badge { position:relative; }
  .hero-badge.animated::after { content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;animation:badgePulse 3s ease-in-out 1.5s infinite; }
  @keyframes badgePulse { 0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.1)} 50%{box-shadow:0 0 18px 3px rgba(59,130,246,.08)} }`);

  html = html.replace("<div class=\"exp-company\">UBER</div>", "<div class=\"exp-company\">UBER · Milestone Technologies</div><div class=\"exp-date\">2024 – 2026</div>");
  html = html.replace("<div class=\"exp-company\">McKesson</div>", "<div class=\"exp-company\">McKesson · Tata Consultancy Services</div><div class=\"exp-date\">2022 – 2024</div>");
  html = html.replace("<div class=\"exp-company\">Mastercard (Voice / Non-Voice)</div>", "<div class=\"exp-company\">Mastercard (Voice / Non-Voice) · Stefanini</div><div class=\"exp-date\">2021 – 2022</div>");
  html = html.replace("<div class=\"exp-company\">Microsoft</div>", "<div class=\"exp-company\">Microsoft · Concentrix</div><div class=\"exp-date\">2016 – 2017</div>");
  html = html.replace("<div class=\"exp-company\">Microsoft</div>", "<div class=\"exp-company\">Microsoft · Convergys</div><div class=\"exp-date\">2013 – 2016</div>");

  if (!html.includes(".exp-date")) html = html.replace(/(\.exp-company\s*\{[^}]*\})/, `$1 .exp-date{font-size:.78rem;font-weight:600;color:var(--text-dim);margin-top:.2rem}`);

  if (!html.includes("transition-delay: 0s !important")) html = html.replace(/(\/\*\s*=+\s*RESPONSIVE)/, `.stat-card:hover,.exp-item:hover,.skill-item:hover,.contact-link:hover,.ref-card:hover{transition-delay:0s!important;}\n    $1`);

  const refs = /<div class="references-grid">[\s\S]*?<\/div>\s*<\/div>/;
  if (refs.test(html)) html = html.replace(refs, `<div class="references-grid"><article class="ref-card reveal"><p class="ref-quote">Professional reference</p><div class="ref-author">John Rey Esmama</div><div class="ref-role">Team Lead, Milestone Technologies</div><a class="ref-contact" href="tel:+639917818048">+63 991 781 8048</a></article><article class="ref-card reveal"><p class="ref-quote">Professional reference</p><div class="ref-author">Ricardo Rosal</div><div class="ref-role">Operations Manager, Milestone Technologies</div><a class="ref-contact" href="tel:+639762073364">+63 976 207 3364</a></article></div>`);

  html = html.replace(".ambient-bg { display: none; }", ".ambient-bg { display: none; } .hero-photo{animation:none!important;transform:none!important}.hero-badge.animated::after{animation:none!important}.hero-scroll .chevron{animation:none!important;transform:none!important}");
  return html;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const source = await fetch(SOURCE, { cf: { cacheTtl: 300 } });
    if (!source.ok) return new Response("Source unavailable", {status:502});
    const text = await source.text();

    if (url.pathname === "/assets/images/cristine-saulon.jpg") {
      const m = text.match(/(?:atob\([\'\"]|data:image\/jpeg;base64,)(\/9j\/[A-Za-z0-9+/=]{1000,})/);
      if (!m) return new Response("Profile photo unavailable", {status:404});
      const bytes = Uint8Array.from(atob(m[1]), c => c.charCodeAt(0));
      return new Response(bytes, {headers:{"Content-Type":"image/jpeg","Cache-Control":"public, max-age=31536000, immutable"}});
    }

    if (url.pathname === "/assets/resume/Mary_Cristine_Saulon_Resume.pdf" || url.pathname === "/resume.pdf") {
      const m = text.match(/atob\(['\"]([^'\"]+)['\"]\)/);
      if (!m) return new Response("Resume unavailable", {status:502});
      const bytes = Uint8Array.from(atob(m[1]), c => c.charCodeAt(0));
      return new Response(bytes, {headers:{"Content-Type":"application/pdf","Content-Disposition":"inline; filename=\"Mary_Cristine_Saulon_Resume.pdf\""}});
    }

    const start = text.search(/<!doctype html/i);
    const end = text.search(/<\/html>/i);
    if (start < 0 || end < 0) return new Response("HTML source unavailable", {status:502});
    const html = patch(text.slice(start, end + 7));
    return new Response(html, {headers:{"Content-Type":"text/html;charset=UTF-8","Cache-Control":"no-store"}});
  }
};
