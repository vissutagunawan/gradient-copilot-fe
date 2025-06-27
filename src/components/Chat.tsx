'use client';

export default function Chat() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Gradient Copilot</h1>
            <p className="text-sm text-gray-600">Asisten pembelajaran AI Anda</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
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
                <li>"Berikan saya materi terkait mata kuliah Ekonomi"</li>
                <li>"Jelaskan konsep machine learning"</li>
                <li>"Tutorial belajar React untuk pemula"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area Placeholder */}
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
          Input belum aktif - akan ditambahkan di commit berikutnya
        </div>
      </div>
    </div>
  );
}