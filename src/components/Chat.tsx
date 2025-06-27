'use client';

import { useState, useEffect, useRef } from 'react';
import { Message as MessageType, MaterialRecommendation } from '@/types';
import { ChatService } from '@/services/chatService';
import Message from './Message';
import ChatInput from './ChatInput';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [materials, setMaterials] = useState<{ [messageId: string]: MaterialRecommendation[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const healthy = await ChatService.checkHealth();
      setIsConnected(healthy);
    } catch (error) {
      setIsConnected(false);
    }
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSendMessage = async (content: string, image?: File) => {
    if ((!content.trim() && !image) || isLoading) return;

    const userMessageId = generateId();
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
      id: userMessageId,
      content: content || '[Gambar dikirim]',
      role: 'user',
      timestamp: new Date(),
      image: imagePreview,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await ChatService.sendMessage(content, messages, image);
      
      const assistantMessageId = generateId();
      const assistantMessage: MessageType = {
        id: assistantMessageId,
        content: response.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (response.has_materials && response.materials.length > 0) {
        setMaterials(prev => ({
          ...prev,
          [assistantMessageId]: response.materials
        }));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan yang tidak diketahui');
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setMaterials({});
    setError(null);
  };

  if (isConnected === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Tidak dapat terhubung ke server
          </h2>
          <p className="text-gray-600 mb-4">
            Pastikan backend server berjalan di localhost:8000
          </p>
          <button
            onClick={checkConnection}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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
        {messages.length === 0 && (
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
        )}
        
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            materials={materials[message.id]}
          />
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Gradient Copilot sedang mengetik...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Area Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}