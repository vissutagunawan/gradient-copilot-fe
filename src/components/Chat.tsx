'use client'

export default function Chat() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary-500 text-white p-4">
        <h1 className="text-xl font-bold">Gradient Copilot Chat</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {/* Chat messages will be rendered here */}
      </main>
      <footer className="bg-gray-100 p-4">
        {/* Input form for sending messages */}
      </footer>
    </div>
  )
}