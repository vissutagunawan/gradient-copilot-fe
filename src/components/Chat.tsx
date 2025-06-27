'use client';

import { useState } from 'react';
import { Message as MessageType } from '@/types';
import Message from './Message';

export default function Chat() {
  // Dummy message data
  const [messages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'Halo! Bisakah kamu jelaskan tentang machine learning?',
      role: 'user',
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '2',
      content: 'Tentu! Machine Learning adalah cabang dari kecerdasan buatan (AI) yang memungkinkan komputer untuk belajar dan membuat keputusan tanpa diprogram secara eksplisit untuk setiap tugas. Sistem ML menggunakan algoritma untuk menganalisis data, mengidentifikasi pola, dan membuat prediksi atau keputusan berdasarkan data tersebut.',
      role: 'assistant',
      timestamp: new Date(Date.now() - 60000),
    }
  ]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Gradient Copilot</h1>
            <p className="text-sm text-gray-600">Asisten pembelajaran AI Anda</p>
          </div>
          
          <button
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            disabled
          >
            Hapus Chat
          </button>
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
      </div>

      {/* Area Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <textarea
              placeholder="Ketik pertanyaan Anda di sini..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              disabled
            />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Input fungsionalitas akan ditambahkan di commit berikutnya
        </div>
      </div>
    </div>
  );
}