'use client';

import { useState, useRef, useEffect } from 'react';
import { Message as MessageType } from '@/types';
import Message from './Message';
import ChatInput from './ChatInput';

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage: MessageType = {
      id: generateId(),
      content: content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: MessageType = {
        id: generateId(),
        content: `Terima kasih atas pertanyaan: "${content}". Ini adalah respons sementara.`,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Gradient Copilot</h1>
            <p className="text-sm text-gray-600">Asisten pembelajaran AI Anda</p>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              Hapus Chat
            </button>
          )}
        </div>
      </div>

      {/* Area Message */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="max-w-md mx-auto">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Selamat datang di Gradient Copilot!
              </h2>
              <p className="text-gray-600 mb-4">
                Saya siap membantu Anda belajar berbagai topik. Kirim pertanyaan untuk memulai.
              </p>
              <div className="text-sm text-gray-500">
                <p>Contoh pertanyaan:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>&quot;Berikan saya materi terkait mata kuliah Ekonomi&quot;</li>
                  <li>&quot;Jelaskan konsep machine learning&quot;</li>
                  <li>&quot;Tutorial belajar React untuk pemula&quot;</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
            />
          ))
        )}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
            <span className="text-sm">Gradient Copilot sedang mengetik...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Area Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}