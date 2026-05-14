# NURAP PORTFOLIO — Claude Design Prompt
# এই পুরো file-এর content copy করে claude.ai/design এ paste করুন

---

Build a complete **luxury dark portfolio website** as a single HTML file with embedded CSS and JavaScript. No external frameworks needed — pure HTML + CSS + Vanilla JS only (so it renders perfectly in Claude Design's preview).

---

## OWNER INFO
- **Name:** Md Nurnobi Sarkar
- **Brand:** Nurap
- **Title:** AI Automation & AI Web Design Expert
- **Email:** nurnobi.nurap@gmail.com
- **WhatsApp:** 01755111792
- **Facebook:** https://www.facebook.com/imnurap
- **Photo:** use a stylish dark placeholder with initials "NS" (rounded, glowing ring) since local file can't load in preview
- **Experience:** 1 Year
- **Services:** AI Automation · AI Web Design · AI Content Strategy

---

## DESIGN SYSTEM

### Colors
```
Background:   #0A0A0A
Surface:      #141414
Text:         #F0F0F0
Muted:        #878787
Border:       #1F1F1F
Accent Blue:  #89AACC
Accent Blue2: #4E85BF
```

### Fonts (load from Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Kanit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
```
- Headings: `'Instrument Serif', serif` (italic)
- Body/Nav/Labels: `'Kanit', sans-serif`
- Counters/Micro: `'Inter', sans-serif`

### Gradients
```css
/* Hero heading gradient text */
.hero-heading {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Accent line/border gradient */
.accent-gradient { background: linear-gradient(90deg, #89AACC 0%, #4E85BF 100%); }

/* CTA Button */
.cta-btn {
  background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%);
  box-shadow: 0 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1;
  outline: 2px solid white;
  outline-offset: -3px;
}
```

### CSS Animations (include all)
```css
@keyframes scrollDown {
  from { transform: translateY(-100%); }
  to   { transform: translateY(200%); }
}
@keyframes roleFade {
  from { opacity:0; transform:translateY(8px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes marqueeLeft  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes marqueeRight { from{transform:translateX(-50%)} to{transform:translateX(0)} }
@keyframes float {
  0%,100% { transform:translateY(0px); }
  50%      { transform:translateY(-18px); }
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
@keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@keyframes blurIn { from{opacity:0;filter:blur(10px);transform:translateY(20px)} to{opacity:1;filter:blur(0);transform:translateY(0)} }
@keyframes counterUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes gradientShift {
  0%,100%{background-position:0% 50%}
  50%    {background-position:100% 50%}
}
@keyframes loadingBar { from{transform:scaleX(0)} to{transform:scaleX(1)} }
@keyframes spin { to{transform:rotate(360deg)} }
```

---

## SECTION 1 — LOADING SCREEN

Full-screen `position:fixed; inset:0; z-index:9999; background:#0A0A0A` overlay.

**Layout:**
- Top-left: `"Portfolio"` — `font-size:11px; color:#878787; letter-spacing:0.3em; text-transform:uppercase; font-family:Inter` — animate `fadeUp 0.6s ease`
- Center: Cycling words `["Design","Create","Automate","Inspire"]` — `font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(2.5rem,8vw,6rem); color:rgba(240,240,240,0.8)` — swap every 900ms with fade+slide animation
- Bottom-right: Counter `000 → 100` — `font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(4rem,12vw,9rem); color:#F0F0F0; font-variant-numeric:tabular-nums`
- Bottom: Progress bar `height:3px; background:#1F1F1F` — inner div `.accent-gradient; transform-origin:left; animation:loadingBar 2.7s ease forwards` — `box-shadow:0 0 8px rgba(137,170,204,0.35)`

**JS logic:**
```javascript
let count = 0;
const duration = 2700;
const interval = duration / 100;
const timer = setInterval(() => {
  count++;
  counterEl.textContent = String(count).padStart(3,'0');
  if(count >= 100) {
    clearInterval(timer);
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease';
      setTimeout(() => loadingScreen.remove(), 500);
    }, 400);
  }
}, interval);

// Cycle words
const words = ['Design','Create','Automate','Inspire'];
let wi = 0;
setInterval(() => {
  wi = (wi+1) % words.length;
  wordEl.style.opacity='0'; wordEl.style.transform='translateY(20px)';
  setTimeout(()=>{ wordEl.textContent=words[wi]; wordEl.style.opacity='1'; wordEl.style.transform='translateY(0)'; wordEl.style.transition='all 0.4s ease'; },200);
}, 900);
```

---

## SECTION 2 — NAVBAR

`position:fixed; top:0; left:0; right:0; z-index:100; display:flex; justify-content:center; padding:16px`

Inner pill: `display:inline-flex; align-items:center; border-radius:999px; backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.08); background:#141414; padding:8px`

Add class `.scrolled` via JS on `window.scrollY > 100` → `box-shadow:0 8px 32px rgba(0,0,0,0.4)`

**Contents:**
1. **Logo** — `width:36px; height:36px; border-radius:50%; border:1.5px solid #89AACC; background:#0A0A0A; font-family:'Instrument Serif',serif; font-style:italic; font-size:13px; color:#F0F0F0` — text: `"NS"`
2. `width:1px; height:20px; background:#1F1F1F; margin:0 6px`
3. Nav links: `["Home","Work","Skills","Contact"]` — `font-family:Kanit; font-size:13px; border-radius:999px; padding:6px 14px; color:#878787; cursor:pointer; transition:all 0.2s` — active/hover: `color:#F0F0F0; background:rgba(255,255,255,0.06)`
4. Divider
5. `"Say hi ↗"` — same size as nav links — hover: accent gradient border

Smooth scroll on click.

---

## SECTION 3 — HERO SECTION

`min-height:100vh; display:flex; flex-direction:column; position:relative; overflow:hidden; background:#0A0A0A`

**Background radial glow:**
```css
background: radial-gradient(ellipse at 60% 40%, rgba(137,170,204,0.07) 0%, transparent 65%), #0A0A0A;
```

**Bottom fade:**
`position:absolute; bottom:0; left:0; right:0; height:200px; background:linear-gradient(to top, #0A0A0A, transparent); pointer-events:none`

**Eyebrow** (center, padding-top: 180px):
`"COLLECTION '26"` — `font-family:Inter; font-size:11px; color:#878787; letter-spacing:0.3em; text-transform:uppercase; animation:blurIn 1s ease 0.3s both`

**Name Headline:**
```
Md Nurnobi
Sarkar
```
`font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(3.5rem,9vw,8rem); line-height:0.9; letter-spacing:-0.02em; color:#F0F0F0; text-align:center; animation:fadeUp 1.2s ease 0.1s both`

**Role line** (below name, `margin-top:24px`):
`"An {role} in Dhaka."` — `font-family:Kanit; font-size:clamp(0.9rem,2vw,1.1rem); color:#878787`

Role word: `font-family:'Instrument Serif',serif; font-style:italic; color:#F0F0F0; animation:roleFade 0.4s ease`

Roles: `["AI Automator","Web Designer","AI Strategist","Innovator"]` — cycle every 2000ms

**Description** (`margin-top:20px; max-width:480px; margin-left:auto; margin-right:auto; text-align:center`):
`"Crafting intelligent digital experiences through AI automation and precision web design — turning complex ideas into seamless systems."`
`font-family:Kanit; font-size:clamp(0.85rem,1.5vw,1rem); color:#878787; line-height:1.7; animation:blurIn 1s ease 0.5s both`

**CTA Buttons** (`margin-top:40px; display:flex; gap:16px; justify-content:center; flex-wrap:wrap`):
- **"See My Work"** — `border-radius:999px; padding:14px 28px; font-family:Kanit; font-size:14px; font-weight:500; background:#F0F0F0; color:#0A0A0A; border:none; cursor:pointer; transition:transform 0.2s` — hover: `transform:scale(1.05)`, accent gradient border ring
- **"Contact Me"** — `.cta-btn; border-radius:999px; padding:14px 28px; font-family:Kanit; font-size:14px; font-weight:500; color:#fff; border:none; cursor:pointer; transition:transform 0.2s` — hover: `transform:scale(1.05)`

**Portrait** (NS monogram placeholder, centered absolute):
```css
position:absolute; left:50%; transform:translateX(-50%);
bottom:0; width:clamp(200px,30vw,420px);
/* Stylized dark card with "NS" monogram + glowing ring */
background:linear-gradient(160deg,#141414 0%,#0A0A0A 100%);
border:1.5px solid rgba(137,170,204,0.2);
border-radius:50% 50% 0 0;
box-shadow:0 0 60px rgba(137,170,204,0.08), 0 0 120px rgba(137,170,204,0.04);
display:flex; align-items:center; justify-content:center;
font-family:'Instrument Serif',serif; font-style:italic;
font-size:clamp(3rem,8vw,7rem); color:rgba(137,170,204,0.3);
```
Show: `"NS"` large italic — `aspect-ratio:1/1.3`

**Scroll Indicator** (bottom-center):
`"SCROLL"` — `font-family:Inter; font-size:10px; color:#878787; letter-spacing:0.2em; text-transform:uppercase`
Line: `width:1px; height:40px; background:#1F1F1F; margin:8px auto; overflow:hidden`
Inner: `width:100%; height:50%; background:linear-gradient(90deg,#89AACC,#4E85BF); animation:scrollDown 1.5s ease-in-out infinite`

---

## SECTION 4 — MARQUEE TICKER

`background:#0A0A0A; padding:80px 0; overflow:hidden`

**Row 1** (scroll LEFT, `animation:marqueeLeft 18s linear infinite`):
Pills: `["Custom AI Chatbot","Zapier Automation","Make.com Flows","SEO Automation","AI Web Design","Prompt Engineering","n8n Workflows","LangChain","OpenAI API","GPT-4o Integration"]`
Duplicate array for seamless loop.

**Row 2** (scroll RIGHT, `animation:marqueeRight 22s linear infinite`, `margin-top:12px`):
Pills: `["Responsive Layouts","Framer Sites","Webflow","Content Strategy","AI Copywriting","CRM Automation","Airtable","Notion AI","Meta Ads AI","Analytics Automation"]`
Duplicate array.

**Each pill:**
```css
border-radius:999px; border:1px solid #1F1F1F; background:rgba(20,20,20,0.6);
padding:10px 22px; font-family:Kanit; font-size:11px; color:#878787;
text-transform:uppercase; letter-spacing:0.15em; white-space:nowrap;
backdrop-filter:blur(8px); flex-shrink:0;
```

Row wrapper: `display:flex; gap:12px; width:max-content`

---

## SECTION 5 — ABOUT SECTION

`min-height:100vh; background:#0A0A0A; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; padding:100px 20px; overflow:hidden`

**4 Floating decorative images** (from existing URLs, `position:absolute`):
```
Top-left:    moon_icon    — top:4%;  left:3%;  width:clamp(80px,12vw,180px);  animation:float 6s ease-in-out infinite
Bottom-left: p59_1        — bottom:8%; left:6%;  width:clamp(70px,10vw,160px); animation:float 6s ease-in-out 0.4s infinite
Top-right:   lego_icon-1  — top:4%;  right:3%; width:clamp(80px,12vw,180px);  animation:float 6s ease-in-out 0.2s infinite
Bottom-right:Group_134-1  — bottom:8%; right:6%; width:clamp(90px,13vw,190px); animation:float 6s ease-in-out 0.6s infinite
```
Image URLs:
```
https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png
https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png
https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png
https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png
```

**Heading:** `"About Me"` — `.hero-heading; font-family:'Instrument Serif',serif; font-style:italic; font-weight:900; font-size:clamp(3rem,12vw,120px); text-transform:uppercase; line-height:1; text-align:center`

**Paragraph** (`max-width:580px; text-align:center; margin-top:40px`):
`"With over one year of focused experience in AI automation and web design, I help businesses build smarter systems, launch faster, and grow with confidence. I specialise in AI chatbots, automated workflows, and precision-designed digital experiences. Let's build something powerful together."`
`font-family:Kanit; font-size:clamp(1rem,1.8vw,1.2rem); color:#D7E2EA; line-height:1.8; font-weight:300`

Add scroll-driven opacity via IntersectionObserver: characters fade in as section enters viewport.

**Stats Row** (`margin-top:48px; display:flex; gap:16px; flex-wrap:wrap; justify-content:center`):
```
"1+ Year Experience"
"3 Core Services"
"100% Client Focus"
```
Each: `border-radius:999px; border:1px solid #1F1F1F; background:rgba(20,20,20,0.5); padding:12px 24px; font-family:Kanit; font-size:13px; color:#878787; text-align:center`

**Contact button** below stats (`margin-top:40px`): `.cta-btn; border-radius:999px; padding:14px 32px; font-family:Kanit; font-size:14px; font-weight:500; color:#fff; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer`

---

## SECTION 6 — SERVICES SECTION

`background:#FFFFFF; border-radius:60px 60px 0 0; margin-top:-40px; padding:120px 20px 140px; position:relative; z-index:2`

**Heading:** `"Services"` — `font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(3rem,12vw,130px); color:#0C0C0C; text-transform:uppercase; line-height:1; text-align:center; font-weight:900; margin-bottom:80px`

**Service List** (`max-width:900px; margin:0 auto`):

Each item: `display:flex; align-items:flex-start; gap:32px; padding:40px 0; border-bottom:1px solid rgba(12,12,12,0.1)` — animate in with staggered `fadeUp` on scroll

| # | Name | Description |
|---|---|---|
| 01 | AI Automation | Design and deploy end-to-end automated workflows using Zapier, Make, and n8n — eliminating repetitive tasks and freeing your team to focus on growth. |
| 02 | AI Web Design | Build responsive, conversion-focused websites powered by AI — from layout intelligence to dynamic content generation and real-time personalization. |
| 03 | AI Content Strategy | Create data-driven content pipelines using AI tools that research, write, schedule, and optimize content for maximum reach and SEO impact. |
| 04 | Custom AI Chatbot | Integrate intelligent, brand-trained chatbots into your website or app — handling customer queries, lead capture, and support 24/7. |
| 05 | Workflow Consulting | Audit your existing digital processes and design a custom AI-first automation roadmap tailored to your business goals and budget. |

Number: `font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(2.5rem,8vw,100px); color:#0C0C0C; font-weight:900; line-height:1; flex-shrink:0; min-width:120px`

Name: `font-family:Kanit; font-size:clamp(1rem,2vw,1.8rem); color:#0C0C0C; font-weight:600; text-transform:uppercase; margin-bottom:8px`

Description: `font-family:Kanit; font-size:clamp(0.85rem,1.4vw,1.1rem); color:rgba(12,12,12,0.55); line-height:1.7; font-weight:300; max-width:600px`

---

## SECTION 7 — PROJECTS SECTION

`background:#0A0A0A; border-radius:60px 60px 0 0; margin-top:-40px; padding:120px 20px; position:relative; z-index:3`

**Heading:** `"Projects"` — `.hero-heading; font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(3rem,12vw,130px); text-transform:uppercase; line-height:1; text-align:center; font-weight:900; margin-bottom:80px`

**3 Project Cards** (sticky stacking effect via `position:sticky; top:100px` inside `height:85vh` wrapper):

Card shell: `border-radius:50px; border:2px solid rgba(137,170,204,0.2); background:#141414; padding:32px; margin-bottom:20px`
Scale down on scroll: `transform:scale(calc(1 - (2 - INDEX) * 0.03))` via JS IntersectionObserver + scroll tracking.

**Card top row** (`display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:32px; flex-wrap:wrap; gap:16px`):
- Number: `font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(3rem,10vw,100px); color:rgba(240,240,240,0.3); line-height:1`
- Center: Category label (`font-family:Kanit; font-size:11px; color:#878787; text-transform:uppercase; letter-spacing:0.2em`) + Project name (`font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(1.5rem,4vw,3rem); color:#F0F0F0`)
- Right: `"View Project ↗"` — `border-radius:999px; border:2px solid rgba(215,226,234,0.5); color:#D7E2EA; padding:10px 24px; font-family:Kanit; font-size:13px; font-weight:500; text-transform:uppercase; letter-spacing:0.1em; background:transparent; cursor:pointer`

**Card image grid** (`display:grid; grid-template-columns:40% 60%; gap:16px`):
- Left col: 2 stacked images (`border-radius:40px; object-fit:cover; width:100%`)
  - Top: `height:clamp(130px,16vw,200px)`
  - Bottom: `height:clamp(160px,22vw,280px)`
- Right col: 1 tall image (`border-radius:40px; object-fit:cover; width:100%; height:100%`)

**Project Data (use colorful gradient placeholder divs with project name overlay since external images may not load):**

Project 01 — `"Nextlevel Studio"` / `"Client"` — placeholders: `background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)`

Project 02 — `"Aura Brand Identity"` / `"Personal"` — placeholders: `background:linear-gradient(135deg,#2d1b69,#11998e,#38ef7d)`

Project 03 — `"Solaris Digital"` / `"Client"` — placeholders: `background:linear-gradient(135deg,#8b5a00,#c0392b,#922b21)`

Each placeholder div: center text with project name, `font-family:'Instrument Serif',serif; font-style:italic; color:rgba(255,255,255,0.15); font-size:clamp(1rem,3vw,2rem)`

---

## SECTION 8 — STATS SECTION

`background:#0A0A0A; padding:100px 20px`

`display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:32px; max-width:900px; margin:0 auto; text-align:center`

| Number | Label |
|---|---|
| 1+ | Years Experience |
| 10+ | Projects Delivered |
| 100% | Client Satisfaction |

Number: `font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(4rem,10vw,7rem); color:#F0F0F0; line-height:1`

Label: `font-family:Inter; font-size:11px; color:#878787; letter-spacing:0.25em; text-transform:uppercase; margin-top:8px`

Animate numbers counting up via JS IntersectionObserver when section enters viewport.

Dividers: `1px solid #1F1F1F` between items on desktop.

---

## SECTION 9 — CONTACT & FOOTER

`background:#0A0A0A; padding:120px 20px 48px; overflow:hidden; position:relative`

**Scrolling Marquee Text** (behind, decorative):
`"BUILDING THE FUTURE WITH AI • "` repeated ×8
`font-family:'Instrument Serif',serif; font-style:italic; font-size:clamp(2.5rem,8vw,6rem); font-weight:900; text-transform:uppercase; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.05); white-space:nowrap`
`animation:marqueeLeft 35s linear infinite; display:flex; width:max-content`

**CTA Block** (centered, `position:relative; z-index:1`):

Subtext: `"Ready to automate your world?"` — `font-family:Inter; font-size:11px; color:#878787; letter-spacing:0.3em; text-transform:uppercase; text-align:center; margin-bottom:24px`

Email button: `<a href="mailto:nurnobi.nurap@gmail.com">` — `.cta-btn; border-radius:999px; padding:18px 48px; font-family:Kanit; font-size:15px; font-weight:500; color:#fff; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none; display:inline-block`

Below email: WhatsApp link — `<a href="https://wa.me/8801755111792">` — same ghost pill style but outlined.

**Footer Bar** (`margin-top:80px; border-top:1px solid #1F1F1F; padding-top:32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:24px`):

Left: `"NS"` monogram pill + `"© 2025 Nurap. All rights reserved."` — `font-family:Kanit; font-size:12px; color:#878787`

Center: Social icons row:
```
Facebook  → https://www.facebook.com/imnurap
WhatsApp  → https://wa.me/8801755111792
Email     → mailto:nurnobi.nurap@gmail.com
```
Each: `width:36px; height:36px; border-radius:50%; border:1px solid #1F1F1F; display:flex; align-items:center; justify-content:center; color:#878787; text-decoration:none; transition:all 0.2s` — hover: `color:#F0F0F0; border-color:rgba(255,255,255,0.2); background:rgba(255,255,255,0.05)`

Use Unicode icons: `ⓕ` `✆` `✉` or inline SVG for FB/WA/Email.

Right: `width:8px; height:8px; border-radius:50%; background:#22c55e; animation:pulse 2s ease-in-out infinite; display:inline-block; margin-right:8px` + `"Available for projects"` — `font-family:Kanit; font-size:12px; color:#878787`

---

## JAVASCRIPT BEHAVIORS

```javascript
// 1. Navbar scroll shadow
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// 2. Smooth scroll on nav click
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

// 3. Role cycling in hero
const roles = ["AI Automator","Web Designer","AI Strategist","Innovator"];
let roleIdx = 0;
setInterval(() => {
  roleIdx = (roleIdx+1) % roles.length;
  roleEl.style.opacity='0'; roleEl.style.transform='translateY(8px)';
  setTimeout(()=>{
    roleEl.textContent = roles[roleIdx];
    roleEl.style.opacity='1'; roleEl.style.transform='translateY(0)';
    roleEl.style.transition='all 0.35s ease';
  }, 200);
}, 2000);

// 4. Scroll-reveal with IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 5. Stats counter animation
function animateCounter(el, target, duration=1500) {
  let start = 0;
  const step = target / (duration/16);
  const timer = setInterval(()=>{
    start = Math.min(start+step, target);
    el.textContent = Math.floor(start) + (el.dataset.suffix||'');
    if(start>=target) clearInterval(timer);
  }, 16);
}

// 6. Project card scale on scroll (sticky stack)
window.addEventListener('scroll', () => {
  projectCards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (100 - rect.top) / 200));
    const scaleOffset = (2-i) * 0.03 * progress;
    card.style.transform = `scale(${1 - scaleOffset}) translateY(${i*28}px)`;
  });
});
```

---

## RESPONSIVE RULES

```css
@media (max-width: 768px) {
  .project-grid { grid-template-columns: 1fr; }
  .stats-grid   { grid-template-columns: 1fr; gap:48px; }
  .floating-img { width:clamp(60px,15vw,120px); }
  .service-item { flex-direction:column; gap:8px; }
  .service-num  { font-size:clamp(2rem,10vw,4rem); min-width:auto; }
  .footer-bar   { flex-direction:column; text-align:center; }
  .cta-buttons  { flex-direction:column; align-items:center; }
}
@media (max-width: 480px) {
  .marquee-pill { padding:8px 16px; font-size:10px; }
  .project-card { padding:20px; border-radius:32px; }
  .project-img-grid { grid-template-columns:1fr; }
}
```

---

## SPECIAL EFFECTS

**Noise texture overlay** (entire page, `pointer-events:none; position:fixed; inset:0; z-index:9998; opacity:0.025`):
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
background-repeat:repeat; background-size:128px 128px;
```

**Gradient border on hover** (for buttons/cards):
```css
.grad-border {
  position:relative;
}
.grad-border::before {
  content:''; position:absolute; inset:-2px; border-radius:inherit;
  background:linear-gradient(90deg,#89AACC,#4E85BF);
  opacity:0; transition:opacity 0.3s; z-index:-1;
}
.grad-border:hover::before { opacity:1; }
```

**Custom scrollbar:**
```css
::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:#0A0A0A; }
::-webkit-scrollbar-thumb { background:#1F1F1F; border-radius:2px; }
::-webkit-scrollbar-thumb:hover { background:#89AACC; }
```

---

## FINAL INSTRUCTION TO CLAUDE DESIGN

> Build this as a **single self-contained HTML file** with all CSS in `<style>` and all JS in `<script>` tags. The file must be complete and render perfectly in the Artifacts preview panel without any build steps.
>
> Make every section **pixel-perfect dark luxury**: deep blacks, glacial whites, subtle blue accents, smooth cinematic transitions. All text uses the specified font families loaded from Google Fonts. All animations are smooth 60fps using CSS transforms and opacity (no layout-triggering properties).
>
> The page must be **fully responsive** from 375px mobile to 1920px desktop using `clamp()` for fluid typography and CSS Grid/Flexbox for layout.
>
> Owner name is **Md Nurnobi Sarkar**, brand is **Nurap**, title is **"AI Automation & AI Web Design Expert"**.
