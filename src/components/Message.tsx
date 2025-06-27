import { Message as MessageType, MaterialRecommendation } from '@/types';
import { User, Bot, Image as ImageIcon } from 'lucide-react';
import MaterialRecommendations from './MaterialRecommendations';
import Image from 'next/image';

interface MessageProps {
  message: MessageType;
  materials?: MaterialRecommendation[];
}

export default function Message({ message, materials }: MessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} message-animation`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'order-first' : ''}`}>
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-primary-500 text-white rounded-br-sm'
              : 'bg-white border border-gray-200 rounded-bl-sm shadow-sm'
          }`}
        >
          {message.image && (
            <div className="mb-2">
              <div className="flex items-center gap-2 text-sm opacity-75 mb-1">
                <ImageIcon className="w-4 h-4" />
                <span>Gambar dikirim</span>
              </div>
              <Image
                src={message.image}
                alt="Uploaded image"
                width={500}
                height={300}
                className="max-w-full h-auto rounded border"
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
          
          <div className="whitespace-pre-wrap text-sm">
            {message.content}
          </div>
        </div>
        
        {materials && materials.length > 0 && (
          <MaterialRecommendations materials={materials} />
        )}
        
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
}