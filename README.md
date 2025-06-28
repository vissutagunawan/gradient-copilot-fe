# Gradient Copilot Frontend

## 📋 Assignment Details
This project was built for **Gradient's Software Engineer Intern (Summer 2025)** take-home assignment - **Option 1: Copilot Learning Assistant Chatbot**.

## 🔗 Links
Github: https://github.com/vissutagunawan/gradient-copilot-fe \
Deployment: https://gradient-copilot-fe.vercel.app

## 🛠️ Tech Stack
- Framework: Next.js (React)
- Styling: Tailwind CSS
- Language: TypeScript
- Icons: Lucide React
- Deployment: Vercel

## 🛠️ Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/vissutagunawan/gradient-copilot-fe.git
cd gradient-copilot-fe

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your environment variables to .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# Run development server
npm run dev
```

## ✨ Features (Assignment Requirements Met)
- 💬 Chat with LLM functionality (text + image support)
- 📚 Material recommendations aligned with chat UI  
- 🚀 Deployed to free cloud service (Vercel)

## 🔮 Future Development
- Smoother rendering (two asterisks wrapped text become bold) -> \*\*abc\*\* (current) becomes **abc**
