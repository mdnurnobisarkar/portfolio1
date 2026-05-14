const fs = require('fs');
const path = require('path');

const PORTFOLIO = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'portfolio-info.json'), 'utf8'));

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).end(); return; }

  try {
    const { messages } = req.body;

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

    if (!openaiRes.ok) throw new Error(data.error?.message || 'OpenAI error');

    const reply = data.choices?.[0]?.message?.content?.trim()
      || "I'm not sure about that — feel free to reach out directly!";

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(200).json({ reply: "Sorry, I'm having a little trouble right now. Please email nurnobi.nurap@gmail.com directly — Nurap will get back to you within 24 hours!" });
  }
};
