# Houston Emergency Preparedness Chat

A hackathon project that provides Houston residents with emergency preparedness information through an AI chatbot. Features a realistic iPhone mockup with embedded Voiceflow chat integration.

## Features

- 📱 Realistic iPhone mockup with live time display
- 🤖 Embedded Voiceflow chatbot for emergency guidance
- 🚨 Emergency contact information (911/311)
- 🌙 Dark mobile-first design

## Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Voiceflow:**
   - The project is pre-configured with a working Voiceflow bot
   - Project ID: `68bdc519d1715034556f9461`
   - To use your own bot, replace the project ID in `app/page.tsx`

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open:** [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling  
- **Voiceflow** for AI chat functionality
- Responsive iPhone mockup design

## Project Structure

```
app/
├── page.tsx          # Main component with Voiceflow integration
├── layout.tsx        # Root layout
└── globals.css       # Global styles
```

## Customization

To use your own Voiceflow bot:
1. Create and publish your bot in Voiceflow
2. Get your project ID from Voiceflow → Settings → Integrations → Web Chat
3. Replace the project ID in `app/page.tsx` (line ~55)

## Development

```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run lint   # Run linter
```

---

🚨 **Disclaimer:** This is a demo for hackathon purposes. Always call 911 for life-threatening emergencies and 311 for non-emergency city services.
