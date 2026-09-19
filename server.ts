import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(
    process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
      process.env.GEMINI_API_KEY.trim() !== ''
  );
  res.json({
    status: 'ok',
    aiEnabled: hasKey,
    model: 'gemini-3.8-flash',
    timestamp: new Date().toISOString(),
  });
});

// Travel Assistant Chat endpoint
app.post('/api/assistant', async (req, res) => {
  const { message, tripContext } = req.body || {};

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const ai = getGeminiClient();

  if (ai) {
    try {
      const destination = tripContext?.destination || 'the destination';
      const days = tripContext?.days || 5;
      const budget = tripContext?.budget || '$1,500';
      const travelType = tripContext?.travelType || 'Solo';
      const isStudent = tripContext?.studentMode ? 'Student Mode is active (focus on budget, discounts, and low-cost exploration)' : 'Standard travel mode';
      const interests = tripContext?.interests?.join(', ') || 'General sightseeing';

      const prompt = `You are the "Travel Assistant" for Smart AI Travel System.
Trip Details:
- Destination: ${destination}
- Duration: ${days} days
- Budget: ${budget}
- Travel Style: ${travelType}
- Interests: ${interests}
- Mode: ${isStudent}

User question: "${message}"

Provide a friendly, practical, concise, and structured travel response (maximum 3-4 short paragraphs or bullet points). If the user asked for a day plan, food, budget advice, or packing, tailor it specifically to ${destination}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const text = response.text || '';
      res.json({
        reply: text,
        source: 'gemini',
        model: 'gemini-3.8-flash',
        timestamp: Date.now(),
      });
      return;
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to curated intelligence:', err?.message);
    }
  }

  // Curated Intelligent Assistant Fallback
  const q = message.toLowerCase();
  const dest = tripContext?.destination || 'your destination';
  const isStudent = Boolean(tripContext?.studentMode);
  let reply = '';

  if (q.includes('day 2') || q.includes('day two')) {
    reply = `📍 **Highlights for Day 2 in ${dest}:**\n\n• **Morning**: Explore the iconic central landmarks and historic core before crowds arrive.\n• **Afternoon**: Check out local cultural hubs, scenic viewpoints, or nearby artisan markets.\n• **Evening**: Savor local street food or visit a popular waterfront/sunset promenade.\n\n💡 *Pro-tip*: Buy metro/transit passes in bulk or use pedestrian walking circuits to save both time and money!`;
  } else if (q.includes('reduce') || q.includes('budget') || q.includes('cheaper') || q.includes('save')) {
    reply = `💰 **Budget Optimization Tips for ${dest}:**\n\n1. **Transportation**: Swap private taxis for local metro/subway day-passes or regional multi-ride cards (saves 40–60%).\n2. **Dining**: Have your main feast at lunch when lunch set menus cost half the dinner prices, and explore local market stalls in the evening.\n3. **Attractions**: Take advantage of free museum days, public parks, and city walking tours.\n${isStudent ? '4. **Student Advantage**: Always flash an ISIC / university ID for 20% to 50% discounts on museum tickets and monument admissions!' : ''}`;
  } else if (q.includes('food') || q.includes('eat') || q.includes('try') || q.includes('dish')) {
    reply = `🍜 **Must-Try Culinary Picks in ${dest}:**\n\n• **Signature Local Specialty**: Seek out neighborhood family-run eateries away from the main tourist strip for authentic recipes.\n• **Street Food & Night Markets**: Perfect for budget-conscious foodies wanting high flavor and low cost.\n• **Dessert / Beverage**: Try the local tea, regional coffee roast, or iconic sweet pastry.\n\n🥦 *Dietary note*: Many modern cafes offer dedicated vegetarian/halal options—just look for the green leaf or dietary badges on menus.`;
  } else if (q.includes('one-day') || q.includes('1-day') || q.includes('one day')) {
    reply = `⚡ **Express 1-Day Itinerary for ${dest}:**\n\n• **8:30 AM**: Sunrise walk and coffee at the city's central square or iconic monument.\n• **11:00 AM**: Renowned museum, heritage site, or scenic observation deck.\n• **1:30 PM**: Authentic local lunch at a lively market.\n• **3:30 PM**: Neighborhood stroll through artistic alleys, shopping arcades, or botanic gardens.\n• **7:00 PM**: Atmospheric dinner followed by night illumination views.`;
  } else if (q.includes('pack') || q.includes('packing') || q.includes('bring')) {
    reply = `🎒 **Essential Packing Checklist for ${dest}:**\n\n1. **Footwear**: Ergonomic walking shoes (you'll easily log 12,000+ steps daily).\n2. **Tech**: Universal power adapter, portable power bank (10,000mAh+), offline map downloads.\n3. **Documents**: Passport, printed backup of your offline guide, student ID, digital insurance copy.\n4. **Weather**: Lightweight packable rain jacket and layered clothing for changing evening temperatures.\n5. **Finances**: Multi-currency debit card + small emergency cash stash for cash-only stalls.`;
  } else {
    reply = `Hello! I am your AI Travel Assistant for **${dest}**. Based on your ${tripContext?.days || 5}-day ${tripContext?.travelType || 'travel'} plan with a budget of ${tripContext?.budget || '$1,500'}, I can recommend scenic detours, affordable hidden gems, transit tips, packing checklists, and local etiquette. Ask me anything about Day 1–${tripContext?.days || 5}, local food, or cost-saving strategies!`;
  }

  res.json({
    reply,
    source: 'demo_curated',
    note: 'Running in built-in prototype mode. Add GEMINI_API_KEY in Secrets to enable live Gemini AI generation.',
    timestamp: Date.now(),
  });
});

// Configure Vite or Static serving
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart AI Travel System server listening on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
