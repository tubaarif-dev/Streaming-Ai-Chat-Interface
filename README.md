# Streaming AI Chat Interface

A responsive, real-time AI chat application built with **Next.js 15**, **React 19**, **Tailwind CSS**, and the **Vercel AI SDK** powered by **Google Gemini 1.5 Flash**.

## 🌟 Features

- **Real-Time Streaming:** High-performance token-by-token streaming response handling via `@ai-sdk/react`.
- **Cancellation Control:** Mid-stream generation stopping using the `stop()` controller without breaking component state.
- **Markdown & Code Rendering:** Safe rendering of streamed responses using `react-markdown` and `@tailwindcss/typography`.
- **Dark/Light Mode:** Toggleable color themes.
- **Responsive Sidebar:** Collapsible navigation designed for mobile and desktop viewports.
- **Auto-Scroll Behavior:** Dynamic pinned scrolling with a "Jump to bottom" manual trigger.
- **Secure Server-Side API:** API keys and system prompts remain strictly on the server via Next.js Route Handlers.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS
- **AI SDK:** Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **LLM Model:** Gemini 1.5 Flash

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/tubaarif-dev/Streaming-Ai-Chat-Interface.git](https://github.com/tubaarif-dev/Streaming-Ai-Chat-Interface.git)
cd Streaming-Ai-Chat-Interface
2. Install Dependencies
Bash
npm install
3. Set Up Environment Variables
Create a .env.local file in the root directory:

Code snippet
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
SYSTEM_PROMPT="You are a helpful AI assistant."
4. Run the Development Server
Bash
npm run dev
Open http://localhost:3000 in your browser to test the chat interface.

📂 Project Structure
Plaintext
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts    # Server-side AI SDK route handler
│   │   ├── globals.css         # Global Tailwind styles
│   │   ├── layout.tsx          # Root layout configuration
│   │   └── page.tsx            # Main chat application component
├── .env.local                  # Environment variables (ignored by git)
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and project scripts
└── README.md                   # Project documentation
🌐 Deployment
This project is optimized for deployment on Vercel:

Push code to GitHub.

Import repository into Vercel.

Configure Environment Variables (GOOGLE_GENERATIVE_AI_API_KEY and SYSTEM_PROMPT).

Click Deploy.