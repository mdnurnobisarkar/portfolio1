require('dotenv').config();
const http = require('http');
const fs   = require('fs');
const path = require('path');

// ── Load portfolio data & build system prompt once at startup ──
const PORTFOLIO = JSON.parse(fs.readFileSync(path.join(__dirname, 'portfolio-info.json'), 'utf8'));

function buildSystemPrompt(info) {
  return `You are a helpful AI assistant on ${info.owner.name}'s personal portfolio website (brand: ${info.owner.brand}).
Your job is to answer visitor questions naturally, warmly, and concisely — as if you personally know ${info.owner.name} very well.

== OWNER INFO ==
Name: ${info.owner.name}
Brand: ${info.owner.brand}
Title: ${info.owner.title}
Location: ${info.owner.location}
Bio: ${info.owner.bio}
Languages: ${info.owner.languages.join(', ')}
Availability: ${info.owner.availability}
Response time: ${info.owner.response_time}

== CONTACT ==
Email: ${info.contact.email}
WhatsApp: ${info.contact.whatsapp}
Facebook: ${info.contact.facebook}

== SERVICES ==
${info.services.map(s => `• ${s.name}: ${s.description}\n  Tools: ${(s.tools || []).join(', ')}\n  Pricing: ${s.price_range}`).join('\n')}

== PROJECTS ==
${info.projects.map(p => `• ${p.name} (${p.type}): ${p.description}`).join('\n')}

== FAQ ==
${info.faq.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')}

== PERSONALITY RULES ==
Tone: ${info.personality.tone}
Avoid: ${info.personality.avoid.join('; ')}

Keep every reply to 2–4 sentences unless the visitor explicitly asks for more detail.
When relevant, naturally encourage the visitor to reach out via email (${info.contact.email}) or WhatsApp (${info.contact.whatsapp}) to take things forward.`;
}

const SYSTEM_PROMPT = buildSystemPrompt(PORTFOLIO);

// ── MIME types ──
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
};

const STATIC_DIR = path.resolve(__dirname);

// ── Server ──
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // ── POST /api/chat ──
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { messages } = JSON.parse(body);

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith('sk-your')) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ reply: "⚠️ API key not configured yet. Add your OpenAI key to the .env file to enable live AI replies." }));
          return;
        }

        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
            max_tokens: 200,
            temperature: 0.75,
          }),
        });

        const data = await openaiRes.json();

        if (!openaiRes.ok) {
          console.error('OpenAI error:', data);
          throw new Error(data.error?.message || 'OpenAI API error');
        }

        const reply = data.choices?.[0]?.message?.content?.trim()
          || "I'm not sure about that — feel free to reach out directly!";

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        console.error('Chat error:', err.message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply: "Sorry, I'm having a little trouble right now. Please email nurnobi.nurap@gmail.com directly — Nurap will get back to you within 24 hours!" }));
      }
    });
    return;
  }

  // ── Static files ──
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(STATIC_DIR, urlPath);

  // Prevent directory traversal
  if (!filePath.startsWith(STATIC_DIR)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('✅  Server running at http://localhost:3000/');
  console.log(process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith('sk-your')
    ? '🤖  OpenAI API key loaded — chat is live.'
    : '⚠️   No API key found. Add OPENAI_API_KEY to .env to enable AI chat.');
});
