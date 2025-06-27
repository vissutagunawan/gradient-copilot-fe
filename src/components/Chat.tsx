'use client';

import { useState, useRef, useEffect } from 'react';
import { Message as MessageType, MaterialRecommendation } from '@/types';
import Message from './Message';
import ChatInput from './ChatInput';

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [materials, setMaterials] = useState<{ [messageId: string]: MaterialRecommendation[] }>({});
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

  // Demo materials for testing
  const getDemoMaterials = (query: string): MaterialRecommendation[] => {
    if (query.toLowerCase().includes('ekonomi')) {
      return [
        {
          title: "Pengantar Ekonomi Mikro",
          url: "https://example.com/ekonomi-mikro",
          description: "Dasar-dasar ekonomi mikro dan teori konsumen",
          source: "Khan Academy"
        },
        {
          title: "Ekonomi Makro untuk Pemula",
          url: "https://example.com/ekonomi-makro", 
          description: "Konsep GDP, inflasi, dan kebijakan moneter",
          source: "Coursera"
        }
      ];
    } else if (query.toLowerCase().includes('machine learning') || query.toLowerCase().includes('ml')) {
      return [
        {
          title: "Machine Learning Crash Course",
          url: "https://developers.google.com/machine-learning/crash-course",
          description: "Kursus gratis machine learning dari Google",
          source: "Google Developers"
        },
        {
          title: "Introduction to Statistical Learning",
          url: "https://www.statlearning.com/",
          description: "Buku gratis tentang statistical learning dengan R",
          source: "Stanford University"
        }
      ];
    }
    return [];
  };

  const handleSendMessage = async (content: string, image?: File) => {
    if ((!content.trim() && !image) || isLoading) return;

    let imagePreview: string | undefined;

    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(image);
      
      await new Promise(resolve => {
        reader.onload = (e) => {
          imagePreview = e.target?.result as string;
          resolve(null);
        };
      });
    }

    const userMessage: MessageType = {
      id: generateId(),
      content: content || '[Gambar dikirim]',
      role: 'user',
      timestamp: new Date(),
      image: imagePreview,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API response with materials
    setTimeout(() => {
      const assistantMessageId = generateId();
      let responseContent = '';
      
      if (image && content) {
        responseContent = `Terima kasih atas pertanyaan dan gambar: "${content}". Saya akan menganalisis gambar dan memberikan materi pembelajaran yang relevan. Integrasi API penuh akan ditambahkan di commit berikutnya.`;
      } else if (image) {
        responseContent = `Saya melihat gambar yang Anda upload. Analisis gambar dan rekomendasi materi akan tersedia dengan integrasi API lengkap.`;
      } else {
        responseContent = `Terima kasih atas pertanyaan: "${content}". Berdasarkan pertanyaan Anda, saya merekomendasikan beberapa materi pembelajaran di bawah ini.`;
      }

      const assistantMessage: MessageType = {
        id: assistantMessageId,
        content: responseContent,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Add demo materials if available
      const demoMaterials = getDemoMaterials(content);
      if (demoMaterials.length > 0) {
        setMaterials(prev => ({
          ...prev,
          [assistantMessageId]: demoMaterials
        }));
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([]);
    setMaterials({});
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
                Saya siap membantu Anda belajar berbagai topik. Kirim pertanyaan atau upload gambar untuk memulai.
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
              materials={materials[message.id]}
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